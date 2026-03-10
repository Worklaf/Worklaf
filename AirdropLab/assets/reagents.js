/**
 * ============================================
 * AirdropLab Reagents System v1.0
 * Система ежедневного клейма
 * ============================================
 */

(function() {
'use strict';

// ─────────────────────────────────────────────────────────────────
// КОНФИГ НАГРАД
// ─────────────────────────────────────────────────────────────────
const REAGENTS_CONFIG = {
    dailyBase: 10,

    streakBonuses: [
        { days: 7,   bonus: 50,  labelKey: 'streak_week',     color: 'text-orange-400' },
        { days: 30,  bonus: 100, labelKey: 'streak_month',    color: 'text-yellow-400' },
        { days: 60,  bonus: 200, labelKey: 'streak_2months',  color: 'text-cyan-400'   },
        { days: 90,  bonus: 300, labelKey: 'streak_quarter',  color: 'text-purple-400' },
        { days: 120, bonus: 400, labelKey: 'streak_4months',  color: 'text-pink-400'   },
        { days: 150, bonus: 500, labelKey: 'streak_5months',  color: 'text-emerald-400'},
        { days: 180, bonus: 600, labelKey: 'streak_halfyear', color: 'text-amber-400'  },
    ],

    referralBonus:   50,
    referralNewUser: 25,
};

// ─────────────────────────────────────────────────────────────────
// УТИЛИТЫ
// ─────────────────────────────────────────────────────────────────

function lang(key) {
    return (typeof window.t === 'function') ? window.t(key) : key;
}

function getUTCDateString(date) {
    const d = date || new Date();
    return d.getUTCFullYear() + '-' +
           String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
           String(d.getUTCDate()).padStart(2, '0');
}

function calcReward(newStreak) {
    let bonus      = 0;
    let bonusLabel = '';
    let bonusKey   = '';

    for (let i = REAGENTS_CONFIG.streakBonuses.length - 1; i >= 0; i--) {
        const sb = REAGENTS_CONFIG.streakBonuses[i];
        if (newStreak % sb.days === 0) {
            bonus      = sb.bonus;
            bonusKey   = sb.labelKey;
            bonusLabel = lang(sb.labelKey);
            break;
        }
    }

    if (!bonus && newStreak > 60 && newStreak % 30 === 0) {
        const months = Math.floor(newStreak / 30);
        bonus      = 100 * months;
        bonusLabel = `🎯 ${months} ${lang('streak_months_suffix')}`;
        bonusKey   = '';
    }

    return {
        base:     REAGENTS_CONFIG.dailyBase,
        bonus:    bonus,
        total:    REAGENTS_CONFIG.dailyBase + bonus,
        label:    bonusLabel,
        labelKey: bonusKey
    };
}

function getNextMilestone(currentStreak) {
    const milestones = [7, 14, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    for (const m of milestones) {
        if (currentStreak < m) {
            return { days: m, daysLeft: m - currentStreak };
        }
    }
    const next = Math.ceil((currentStreak + 1) / 30) * 30;
    return { days: next, daysLeft: next - currentStreak };
}

// ─────────────────────────────────────────────────────────────────
// ОСНОВНАЯ ЛОГИКА КЛЕЙМА
// ─────────────────────────────────────────────────────────────────

async function getClaimStatus(user) {
    const db  = window.db;
    const exp = window.__firestoreExports;
    if (!db || !exp || !user) return null;

    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        if (!snap.exists()) return null;

        const data      = snap.data();
        const todayUTC  = getUTCDateString();
        const lastClaim = data.lastClaimDate || '';
        const streak    = data.streak        || 0;
        const reagents  = data.reagents      || 0;

        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        const yesterdayStr = getUTCDateString(yesterday);

        let canClaim     = false;
        let streakBroken = false;
        let newStreak    = streak;

        if (lastClaim === todayUTC) {
            canClaim = false;
        } else if (lastClaim === yesterdayStr || lastClaim === '') {
            canClaim  = true;
            newStreak = streak + 1;
        } else {
            canClaim     = true;
            newStreak    = 1;
            streakBroken = streak > 0;
        }

        const reward = calcReward(newStreak);

        return {
            canClaim,
            streak,
            newStreak,
            reagents,
            lastClaim,
            todayUTC,
            streakBroken,
            reward,
            nextMilestone: getNextMilestone(canClaim ? newStreak : streak)
        };

    } catch(err) {
        console.error('[Reagents] getClaimStatus error:', err);
        return null;
    }
}

async function performClaim(user) {
    const db  = window.db;
    const exp = window.__firestoreExports;
    if (!db || !exp || !user) throw new Error(lang('claim_firebase_error'));

    const status = await getClaimStatus(user);
    if (!status)          throw new Error(lang('claim_status_error'));
    if (!status.canClaim) throw new Error(lang('claim_already_title'));

    const todayUTC    = getUTCDateString();
    const newReagents = status.reagents + status.reward.total;

    await exp.setDoc(
        exp.doc(db, 'users', user.uid),
        {
            reagents:      newReagents,
            streak:        status.newStreak,
            lastClaimDate: todayUTC,
            lastClaimAt:   new Date().toISOString()
        },
        { merge: true }
    );

    return { ...status, newReagents };
}

// ─────────────────────────────────────────────────────────────────
// UI — МОДАЛКА КЛЕЙМА
// ─────────────────────────────────────────────────────────────────

window.openClaimModal = async function() {
    const user = (window.auth && window.auth.currentUser)
                 || window.currentUser
                 || null;

    if (!user) {
        if (typeof window.footerShowToast === 'function') {
            window.footerShowToast(lang('claim_login_required'), 'error');
        }
        return;
    }

    _ensureClaimModal();

    const modal = document.getElementById('claimModal');
    const body  = document.getElementById('claimModalBody');
    if (!modal || !body) return;

    body.innerHTML = _renderLoading();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const status = await getClaimStatus(user);

    if (!status) {
        body.innerHTML = _renderError(lang('claim_load_error'));
        return;
    }

    body.innerHTML = _renderClaimUI(status);
};

window.closeClaimModal = function() {
    const modal = document.getElementById('claimModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.doClaim = async function() {
    const user = (window.auth && window.auth.currentUser)
                 || window.currentUser
                 || null;
    if (!user) return;

    const btn = document.getElementById('claimBtn');
    if (btn) {
        btn.disabled  = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${lang('claim_claiming')}`;
    }

    try {
        const result = await performClaim(user);
        _showClaimSuccess(result);
        _applyClaimBtnVisual(false);

        // Обновляем баланс в профиле если открыт
        const balEl = document.getElementById('profileReagentBalance');
        if (balEl) {
            balEl.innerHTML = result.newReagents +
                ` <span class="text-sm font-normal text-slate-400 ml-1">${lang('reagents_rgt_unit')}</span>`;
        }
        const streakEl = document.getElementById('profileStreak');
        if (streakEl) {
            streakEl.innerHTML = result.newStreak +
                ` <span class="text-xs font-normal text-slate-400">${lang('account_days_short')}</span>`;
        }

        _updateHeaderReagents(result.newReagents);

    } catch(err) {
        const body = document.getElementById('claimModalBody');
        if (body) body.innerHTML = _renderError(err.message);
    }
};

// ─────────────────────────────────────────────────────────────────
// РЕНДЕР UI
// ─────────────────────────────────────────────────────────────────

function _renderLoading() {
    return `
        <div class="text-center py-12">
            <div class="text-4xl mb-3 animate-pulse">🧪</div>
            <p class="text-slate-400 text-sm">${lang('claim_loading')}</p>
        </div>
    `;
}

function _renderError(msg) {
    return `
        <div class="text-center py-10">
            <div class="text-4xl mb-3">⚠️</div>
            <p class="text-red-400 text-sm mb-4">${msg}</p>
            <button onclick="closeClaimModal()"
                class="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors">
                ${lang('claim_error_close')}
            </button>
        </div>
    `;
}

function _renderClaimUI(status) {
    const { canClaim, streak, newStreak, reagents, reward,
            streakBroken, nextMilestone } = status;

    const prevMilestone = nextMilestone.days - 30 < 0 ? 0 : nextMilestone.days - 30;
    const progressPct   = Math.round(
        ((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100
    );

    const weekDays = _buildWeekDays(status);

    return `
    <div class="p-6">

        <!-- Заголовок с балансом -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <div class="text-xs text-slate-500 mb-1">${lang('claim_balance_label')}</div>
                <div class="text-3xl font-black">
                    <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        ${reagents}
                    </span>
                    <span class="text-sm font-normal text-slate-400 ml-1">${lang('reagents_rgt_unit')}</span>
                </div>
            </div>
            <div class="text-right">
                <div class="text-xs text-slate-500 mb-1">${lang('claim_streak_label')}</div>
                <div class="text-3xl font-black text-orange-400">
                    ${streak}
                    <span class="text-sm font-normal text-slate-400">🔥</span>
                </div>
            </div>
        </div>

        ${streakBroken ? `
        <div class="mb-4 p-3 bg-red-900/30 border border-red-800/50 rounded-xl text-center">
            <div class="text-2xl mb-1">💔</div>
            <div class="text-red-400 text-sm font-medium">${lang('claim_streak_broken_title')}</div>
            <div class="text-slate-400 text-xs mt-1">${lang('claim_streak_broken_desc')}</div>
        </div>
        ` : ''}

        <!-- Дни недели -->
        <div class="mb-5">
            <div class="text-xs text-slate-500 mb-2 text-center">${lang('claim_week_progress')}</div>
            <div class="flex justify-center gap-1.5">
                ${weekDays}
            </div>
        </div>

        <!-- Прогресс до следующего бонуса -->
        <div class="mb-5 bg-slate-800/50 rounded-xl p-3">
            <div class="flex items-center justify-between text-xs mb-2">
                <span class="text-slate-400">
                    ${lang('claim_until_bonus').replace('{days}', nextMilestone.days)}
                </span>
                <span class="text-cyan-400 font-medium">
                    ${lang('claim_days_left').replace('{days}', nextMilestone.daysLeft)}
                </span>
            </div>
            <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                     style="width: ${Math.min(progressPct, 100)}%"></div>
            </div>
        </div>

        ${canClaim ? `
        <!-- Награда -->
        <div class="mb-4 text-center">
            <div class="text-xs text-slate-500 mb-1">${lang('claim_today_reward')}</div>
            <div class="flex items-center justify-center gap-2">
                <span class="text-2xl font-black text-cyan-400">+${reward.total}</span>
                <span class="text-slate-400">${lang('reagents_rgt_unit')}</span>
                ${reward.bonus > 0 ? `
                <span class="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                    +${reward.bonus} ${lang('claim_bonus_word')} ${reward.label}
                </span>` : ''}
            </div>
            ${newStreak > streak ? `
            <div class="text-xs text-slate-500 mt-1">
                ${lang('claim_streak_will_be')}
                <span class="text-orange-400 font-medium">${newStreak} 🔥</span>
            </div>` : ''}
        </div>

        <button id="claimBtn" onclick="window.doClaim()"
            class="w-full py-4 rounded-xl text-base font-bold transition-all
                   bg-gradient-to-r from-cyan-500 to-blue-600
                   hover:from-cyan-400 hover:to-blue-500
                   text-white shadow-lg shadow-cyan-500/25
                   hover:scale-[1.02] active:scale-[0.98]
                   flex items-center justify-center gap-3">
            <span class="text-xl">🧪</span>
            ${lang('claim_get_btn')}
        </button>
        ` : `
        <!-- Уже клеймил -->
        <div class="text-center py-4">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40
                        flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-check text-2xl text-emerald-400"></i>
            </div>
            <div class="text-emerald-400 font-bold text-lg mb-1">${lang('claim_already_title')}</div>
            <div class="text-slate-400 text-sm mb-4">
                ${lang('claim_next_at')}
                <span class="text-white font-medium">00:00 UTC</span>
            </div>
            <div class="text-xs text-slate-500">
                ${_getTimeToMidnightUTC()}
            </div>
        </div>
        `}

        <!-- Таблица наград -->
        <div class="mt-5 border-t border-slate-700/50 pt-4">
            <div class="text-xs text-slate-500 mb-3 text-center">${lang('claim_rewards_table')}</div>
            <div class="grid grid-cols-2 gap-1.5">
                ${REAGENTS_CONFIG.streakBonuses.map(sb => `
                <div class="flex items-center justify-between px-3 py-1.5 rounded-lg
                            ${streak >= sb.days
                                ? 'bg-emerald-900/20 border border-emerald-800/30'
                                : 'bg-slate-800/30'}
                            text-xs">
                    <span class="${streak >= sb.days ? 'text-emerald-400' : 'text-slate-400'}">
                        ${streak >= sb.days ? '✅' : '🔒'} ${sb.days} ${lang('claim_days_unit')}
                    </span>
                    <span class="${streak >= sb.days ? 'text-yellow-400' : 'text-slate-500'} font-medium">
                        +${sb.bonus} ${lang('reagents_rgt_unit')}
                    </span>
                </div>`).join('')}
            </div>
            <div class="mt-2 text-center text-xs text-slate-600">
                ${lang('claim_after_60')}
            </div>
        </div>

        <button onclick="closeClaimModal()"
            class="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl
                   text-sm text-slate-400 hover:text-white transition-colors">
            ${lang('claim_close_btn')}
        </button>
    </div>
    `;
}

function _showClaimSuccess(result) {
    const body = document.getElementById('claimModalBody');
    if (!body) return;

    body.innerHTML = `
    <div class="p-6 text-center">
        <!-- Анимация -->
        <div class="relative w-24 h-24 mx-auto mb-5">
            <div class="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
            <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30
                        border-2 border-cyan-400/50 flex items-center justify-center text-4xl">
                🧪
            </div>
        </div>

        <h3 class="text-2xl font-black text-white mb-1">${lang('claim_success_title')}</h3>

        ${result.streakBroken ? `
        <div class="text-sm text-red-400 mb-3">${lang('claim_streak_reset')}</div>
        ` : ''}

        <!-- Начислено -->
        <div class="bg-slate-800/50 rounded-xl p-4 mb-4">
            <div class="text-xs text-slate-500 mb-1">${lang('claim_credited')}</div>
            <div class="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                +${result.reward.total}
            </div>
            <div class="text-slate-400 text-sm">${lang('claim_reagents_unit')}</div>

            ${result.reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
                <i class="fas fa-star"></i>
                ${result.reward.label} — ${lang('claim_bonus_word')} +${result.reward.bonus} ${lang('reagents_rgt_unit')}!
            </div>` : ''}
        </div>

        <!-- Статистика -->
        <div class="grid grid-cols-3 gap-3 mb-5">
            <div class="bg-slate-800/30 rounded-lg p-3">
                <div class="text-lg font-bold text-cyan-400">${result.newReagents}</div>
                <div class="text-xs text-slate-500">${lang('claim_balance_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-lg p-3">
                <div class="text-lg font-bold text-orange-400">${result.newStreak}🔥</div>
                <div class="text-xs text-slate-500">${lang('claim_streak_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-lg p-3">
                <div class="text-lg font-bold text-emerald-400">${result.nextMilestone.daysLeft}</div>
                <div class="text-xs text-slate-500">${lang('claim_to_bonus_short')}</div>
            </div>
        </div>

        <div class="text-xs text-slate-500 mb-4">
            ${lang('claim_next_claim')}
            <span class="text-white">00:00 UTC</span>
            · ${_getTimeToMidnightUTC()}
        </div>

        <button onclick="closeClaimModal()"
            class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600
                   hover:from-cyan-500 hover:to-blue-500
                   rounded-xl text-sm font-bold text-white transition-all">
            ${lang('claim_great_btn')}
        </button>
    </div>
    `;
}

function _buildWeekDays(status) {
    const { streak, lastClaim } = status;

    const dayKeys = [
        'week_mon','week_tue','week_wed',
        'week_thu','week_fri','week_sat','week_sun'
    ];

    const todayUTCDay = new Date().getUTCDay();
    const todayIdx    = (todayUTCDay + 6) % 7;

    return dayKeys.map((key, i) => {
        const dayLabel = lang(key);

        let state = 'future';
        if (i < todayIdx)  state = streak > (todayIdx - i) ? 'done' : 'missed';
        if (i === todayIdx) state = lastClaim === getUTCDateString() ? 'today-done' : 'today';
        if (i > todayIdx)  state = 'future';

        const colors = {
            'done':       'bg-emerald-500/30 border-emerald-500/50 text-emerald-400',
            'today':      'bg-cyan-500/20 border-cyan-400 text-cyan-400 ring-2 ring-cyan-400/30',
            'today-done': 'bg-emerald-500/30 border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/30',
            'missed':     'bg-red-500/10 border-red-800/30 text-red-600',
            'future':     'bg-slate-800/30 border-slate-700/30 text-slate-600',
        };
        const icons = {
            'done':       '✓',
            'today':      '🧪',
            'today-done': '✓',
            'missed':     '✗',
            'future':     dayLabel.charAt(0),
        };

        return `
        <div class="flex flex-col items-center gap-1">
            <div class="w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-bold
                        ${colors[state]} transition-all">
                ${icons[state]}
            </div>
            <span class="text-[10px] text-slate-600">${dayLabel}</span>
        </div>`;
    }).join('');
}

function _getTimeToMidnightUTC() {
    const now      = new Date();
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);
    const diff = midnight - now;

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    return lang('claim_time_left')
        .replace('{h}', h)
        .replace('{m}', m);
}

function _updateHeaderReagents(amount) {
    const els = document.querySelectorAll('[data-reagents-balance]');
    els.forEach(el => { el.textContent = amount + ' ' + lang('reagents_rgt_unit'); });
}

// ─────────────────────────────────────────────────────────────────
// СОЗДАНИЕ МОДАЛКИ
// ─────────────────────────────────────────────────────────────────

function _ensureClaimModal() {
    if (document.getElementById('claimModal')) return;

    const modal = document.createElement('div');
    modal.id        = 'claimModal';
    modal.className = 'claim-modal-overlay';
    modal.innerHTML = `
        <div class="claim-modal-box">
            <div class="flex items-center justify-between px-6 pt-5 pb-0">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                                border border-cyan-500/30 flex items-center justify-center text-xl">
                        🧪
                    </div>
                    <div>
                        <h3 class="font-bold text-white" id="claimModalTitle">
                            ${lang('claim_title')}
                        </h3>
                       <p class="text-xs text-slate-500" id="claimModalSubtitle">${lang('claim_updated_utc')}</p>
                    </div>
                </div>
                <button onclick="closeClaimModal()"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
            <div id="claimModalBody"></div>
        </div>
    `;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) window.closeClaimModal();
    });

    document.body.appendChild(modal);
    _addClaimStyles();
}

function _addClaimStyles() {
    if (document.getElementById('claim-styles')) return;

    const style = document.createElement('style');
    style.id = 'claim-styles';
    style.textContent = `
        .claim-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(6px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .claim-modal-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        .claim-modal-box {
            background: linear-gradient(135deg, #1e2538 0%, #0f172a 100%);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            width: 92%;
            max-width: 420px;
            max-height: 92vh;
            overflow-y: auto;
            transform: translateY(20px) scale(0.97);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-modal-overlay.active .claim-modal-box {
            transform: translateY(0) scale(1);
        }
        .claim-modal-box::-webkit-scrollbar { width: 4px; }
        .claim-modal-box::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────
// КНОПКА В ХЕДЕРЕ
// ─────────────────────────────────────────────────────────────────

var _claimCountdownInterval = null;

function _applyClaimBtnVisual(canClaim) {
    var btn = document.getElementById('headerClaimBtn');
    if (!btn) return;
btn.setAttribute('data-claim-available', canClaim ? '1' : '0');
    if (_claimCountdownInterval) {
        clearInterval(_claimCountdownInterval);
        _claimCountdownInterval = null;
    }

    if (canClaim) {
        btn.className = [
            'relative flex items-center gap-2 px-3 py-2',
            'bg-gradient-to-r from-cyan-600/20 to-blue-600/20',
            'hover:from-cyan-600/40 hover:to-blue-600/40',
            'border border-cyan-500/30 hover:border-cyan-400/60',
            'rounded-xl text-sm text-cyan-400 hover:text-white',
            'transition-all duration-300 cursor-pointer'
        ].join(' ');
        btn.title     = lang('claim_btn_tooltip_available');
        btn.innerHTML =
            '<span class="text-base">🧪</span>' +
            '<span class="hidden sm:inline font-medium text-xs">' + lang('claim_btn_label') + '</span>' +
            '<span id="claimDot" class="absolute -top-1 -right-1 w-2.5 h-2.5 ' +
            'bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>';

    } else {
        function getMsToMidnightUTC() {
            var midnight = new Date();
            midnight.setUTCHours(24, 0, 0, 0);
            return midnight - new Date();
        }

        function formatTime(ms) {
            if (ms <= 0) return '00:00:00';
            var s   = Math.floor(ms / 1000);
            var h   = Math.floor(s / 3600);
            var m   = Math.floor((s % 3600) / 60);
            var sec = s % 60;
            return [h, m, sec].map(function(v) {
                return String(v).padStart(2, '0');
            }).join(':');
        }

        function renderCooldown() {
            var remaining = getMsToMidnightUTC();

            if (remaining <= 0) {
                clearInterval(_claimCountdownInterval);
                _claimCountdownInterval = null;
                _applyClaimBtnVisual(true);
                return;
            }

            var timeStr = formatTime(remaining);

            btn.className = [
                'relative flex items-center gap-2 px-3 py-2',
                'bg-slate-800/40 border border-slate-700/40',
                'rounded-xl text-sm',
                'transition-all duration-300 cursor-default'
            ].join(' ');
            btn.title     = lang('claim_btn_tooltip_cooldown');
            btn.innerHTML =
                '<span class="text-base" style="opacity:0.4">🧪</span>' +
                '<div class="hidden sm:flex flex-col items-start leading-none gap-0.5">' +
                    '<span style="font-size:9px;color:#64748b;text-transform:uppercase;' +
                           'letter-spacing:0.05em">' + lang('claim_reset_in') + '</span>' +
                    '<span style="font-size:11px;font-family:monospace;font-weight:700;' +
                           'color:#fb923c">' + timeStr + '</span>' +
                '</div>' +
                '<span style="font-size:11px;font-family:monospace;font-weight:700;' +
                       'color:#fb923c" class="sm:hidden">' + timeStr + '</span>';
        }

        renderCooldown();
        _claimCountdownInterval = setInterval(renderCooldown, 1000);
    }
}

window._applyClaimBtnVisual = _applyClaimBtnVisual;

// ─────────────────────────────────────────────────────────────────
// АВТОПРОВЕРКА ПРИ ЗАГРУЗКЕ
// ─────────────────────────────────────────────────────────────────

async function _checkClaimOnLoad() {
    var attempts = 0;
    while ((!window.auth || !window.auth.currentUser) && attempts < 20) {
        await new Promise(function(r) { setTimeout(r, 500); });
        attempts++;
    }

    var user = (window.auth && window.auth.currentUser) || window.currentUser;
    if (!user) return;

    var status = await getClaimStatus(user);
    if (!status) return;

    _applyClaimBtnVisual(status.canClaim);
}

// ─────────────────────────────────────────────────────────────────
// ЭКСПОРТ
// ─────────────────────────────────────────────────────────────────

window.ReagentsSystem = {
    getClaimStatus,
    performClaim,
    getUTCDateString,
    calcReward,
    getNextMilestone,
    CONFIG: REAGENTS_CONFIG
};

window.openClaimModal  = window.openClaimModal;
window.closeClaimModal = window.closeClaimModal;
window.doClaim         = window.doClaim;
// ─────────────────────────────────────────────────────────────────
// ОБНОВЛЕНИЕ ПЕРЕВОДОВ ПРИ СМЕНЕ ЯЗЫКА
// ─────────────────────────────────────────────────────────────────

function _updateClaimTranslations() {
    // Обновляем заголовок модалки
    const titleEl = document.getElementById('claimModalTitle');
    if (titleEl) {
        titleEl.textContent = lang('claim_title');
    }

    // Обновляем подзаголовок модалки
    // ищем по data-атрибуту чтобы не путать с другими .text-xs
    const subtitleEl = document.getElementById('claimModalSubtitle');
    if (subtitleEl) {
        subtitleEl.textContent = lang('claim_updated_utc');
    }

    // Обновляем кнопку хедера используя сохранённое состояние
    const btn = document.getElementById('headerClaimBtn');
    if (btn) {
        const isAvailable = btn.getAttribute('data-claim-available') === '1';
        _applyClaimBtnVisual(isAvailable);
    }
}

document.addEventListener('languageChanged', _updateClaimTranslations);
console.log('🧪 Reagents System v1.0 loaded');

setTimeout(_checkClaimOnLoad, 2000);
setTimeout(_checkClaimOnLoad, 5000);

})();
