/**
 * ============================================
 * AirdropLab Reagents System v2.2
 * ============================================
 */

(function() {
'use strict';

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
    referralInviter: 25,
    referralLevels: [
        { level: 1, percent: 20 },
        { level: 2, percent: 10 },
        { level: 3, percent: 5  },
    ],
    passivePayoutDay: 1,
};

// ─────────────────────────────────────────────────────────────────
// УТИЛИТЫ
// ─────────────────────────────────────────────────────────────────

function lang(key) {
    return (typeof window.t === 'function') ? window.t(key) : key;
}

// Определяем текущий язык
function getCurrentLang() {
    return (typeof window.currentLang === 'string') ? window.currentLang :
           (typeof window.i18n === 'object' && window.i18n.language) ? window.i18n.language :
           document.documentElement.lang || 'ru';
}

function getUTCDateString(date) {
    const d = date || new Date();
    return d.getUTCFullYear() + '-' +
           String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
           String(d.getUTCDate()).padStart(2, '0');
}

function roundReward(value) {
    return Math.round(value + 0.0001);
}

function calcReward(newStreak) {
    let bonus = 0, bonusLabel = '', bonusKey = '';
    for (let i = REAGENTS_CONFIG.streakBonuses.length - 1; i >= 0; i--) {
        const sb = REAGENTS_CONFIG.streakBonuses[i];
        if (newStreak % sb.days === 0) {
            bonus = sb.bonus; bonusKey = sb.labelKey; bonusLabel = lang(sb.labelKey);
            break;
        }
    }
    if (!bonus && newStreak > 60 && newStreak % 30 === 0) {
        const months = Math.floor(newStreak / 30);
        bonus = 100 * months;
        bonusLabel = `🎯 ${months} ${lang('streak_months_suffix')}`;
    }
    return { base: REAGENTS_CONFIG.dailyBase, bonus, total: REAGENTS_CONFIG.dailyBase + bonus, label: bonusLabel, labelKey: bonusKey };
}

function getNextMilestone(currentStreak) {
    const milestones = [7, 14, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    for (const m of milestones) {
        if (currentStreak < m) return { days: m, daysLeft: m - currentStreak };
    }
    const next = Math.ceil((currentStreak + 1) / 30) * 30;
    return { days: next, daysLeft: next - currentStreak };
}

// ─────────────────────────────────────────────────────────────────
// FAQ ТЕКСТЫ (ru + en)
// ─────────────────────────────────────────────────────────────────

function _getFaqStreak() {
    const isEn = getCurrentLang().startsWith('en');
    if (isEn) return `
        <div class="faq-title">❓ How does streak work?</div>
        <div class="faq-body">
            <div>• Claim every day before <span class="faq-hi-white">00:00 UTC</span> — streak grows</div>
            <div>• Miss a day — streak resets to 0</div>
            <div>• After 7, 30, 60... days in a row — bonus RGT awarded</div>
            <div>• Base reward: <span class="faq-hi-cyan">+${REAGENTS_CONFIG.dailyBase} RGT</span> every day</div>
            <div>• Your referral code gives <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralBonus} RGT</span> to new user and <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralInviter} RGT</span> to you</div>
        </div>`;
    return `
        <div class="faq-title">❓ Как работает стрик?</div>
        <div class="faq-body">
            <div>• Клеймите каждый день до <span class="faq-hi-white">00:00 UTC</span> — стрик растёт</div>
            <div>• Пропустили день — стрик сбросится до 0</div>
            <div>• За 7, 30, 60... дней подряд — бонусные RGT</div>
            <div>• База: <span class="faq-hi-cyan">+${REAGENTS_CONFIG.dailyBase} RGT</span> каждый день</div>
            <div>• Реферальный код даёт новому пользователю <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralBonus} RGT</span>, вам — <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralInviter} RGT</span></div>
        </div>`;
}

function _getFaqReferral() {
    const isEn = getCurrentLang().startsWith('en');
    if (isEn) return `
        <div class="faq-title">❓ How do referrals work?</div>
        <div class="faq-body">
            <div>• Share your referral code with friends</div>
            <div>• New user gets <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralBonus} RGT</span> instantly</div>
            <div>• You get <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralInviter} RGT</span> immediately</div>
            <div>• Every claim by referral earns you <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[0].percent}%</span> of their reward</div>
            <div>• Level 2: <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[1].percent}%</span> · Level 3: <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
            <div>• Accrual happens <span class="faq-hi-white">instantly</span> when you open this window</div>
        </div>`;
    return `
        <div class="faq-title">❓ Как работают рефералы?</div>
        <div class="faq-body">
            <div>• Поделитесь реферальным кодом с друзьями</div>
            <div>• Новый пользователь получит <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralBonus} RGT</span></div>
            <div>• Вы получите <span class="faq-hi-cyan">+${REAGENTS_CONFIG.referralInviter} RGT</span> сразу</div>
            <div>• Каждый клейм реферала приносит вам <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[0].percent}%</span></div>
            <div>• 2-й уровень: <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[1].percent}%</span> · 3-й: <span class="faq-hi-green">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
            <div>• Начисление происходит <span class="faq-hi-white">мгновенно</span> при открытии окна</div>
        </div>`;
}

// ─────────────────────────────────────────────────────────────────
// FIRESTORE ЛОГИКА
// ─────────────────────────────────────────────────────────────────

async function getClaimStatus(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return null;
    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        let data = {};
        if (!snap.exists()) {
            data = { reagents: 0, streak: 0, lastClaimDate: '', invitedBy: '',
                     invitedCount: 0, pendingPassive: 0, passiveLog: {},
                     referralEarnings: 0, bestStreak: 0,
                     referralCode: _generateCode(user.uid) };
        } else {
            data = snap.data();
        }

        const todayUTC   = getUTCDateString();
        const lastClaim  = data.lastClaimDate || '';
        const streak     = data.streak     || 0;
        const reagents   = data.reagents   || 0;
        const bestStreak = data.bestStreak || 0;
        const referralCode = data.referralCode || _generateCode(user.uid);

        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        const yesterdayStr = getUTCDateString(yesterday);

        let canClaim = false, streakBroken = false, newStreak = streak;
        if (lastClaim === todayUTC) {
            canClaim = false;
        } else if (lastClaim === yesterdayStr || lastClaim === '') {
            canClaim = true; newStreak = streak + 1;
        } else {
            canClaim = true; newStreak = 1; streakBroken = streak > 0;
        }

        const reward      = calcReward(newStreak);
        const passiveInfo = await getPassiveRewardInfo(user, data);

        return { canClaim, streak, newStreak, reagents, lastClaim, todayUTC,
                 streakBroken, reward, bestStreak, referralCode,
                 nextMilestone: getNextMilestone(canClaim ? newStreak : streak),
                 passiveInfo };
    } catch(err) {
        console.error('[Reagents] getClaimStatus error:', err);
        return null;
    }
}

async function performClaim(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) throw new Error(lang('claim_firebase_error'));
    const status = await getClaimStatus(user);
    if (!status)          throw new Error(lang('claim_status_error'));
    if (!status.canClaim) throw new Error(lang('claim_already_title'));

    const todayUTC      = getUTCDateString();
    const newReagents   = status.reagents + status.reward.total;
    const newBestStreak = Math.max(status.bestStreak || 0, status.newStreak);

    await exp.setDoc(exp.doc(db, 'users', user.uid), {
        reagents:      newReagents,
        streak:        status.newStreak,
        lastClaimDate: todayUTC,
        lastClaimAt:   new Date().toISOString(),
        bestStreak:    newBestStreak,
    }, { merge: true });

    await _creditPassiveToUpstream(user, status.reward.total, exp, db);
    return { ...status, newReagents, bestStreak: newBestStreak };
}

window.applyReferralCode = async function(currentUser, code) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !currentUser) throw new Error(lang('ref_login_required'));
    if (!/^AL-[A-Z0-9]{6}$/.test(code)) throw new Error(lang('ref_wrong_format'));

    const q         = exp.query(exp.collection(db,'users'), exp.where('referralCode','==',code));
    const querySnap = await exp.getDocs(q);
    if (querySnap.empty) throw new Error(lang('ref_not_found'));

    const inviterDoc  = querySnap.docs[0];
    const inviterUid  = inviterDoc.id;
    const inviterData = inviterDoc.data();
    if (inviterUid === currentUser.uid) throw new Error(lang('ref_own_code'));

    const mySnap = await exp.getDoc(exp.doc(db,'users',currentUser.uid));
    const myData = mySnap.exists() ? mySnap.data() : {};
    if (myData.referredBy) throw new Error(lang('ref_already_used'));

    const batch = exp.writeBatch(db);
    batch.set(exp.doc(db,'users',currentUser.uid), {
        invitedBy:        inviterUid,
        referralCode:     myData.referralCode || _generateCode(currentUser.uid),
        reagents:         (myData.reagents || 0) + REAGENTS_CONFIG.referralBonus,
        referralEarnings: myData.referralEarnings || 0,
        invitedAt:        new Date().toISOString(),
    }, { merge: true });
    batch.set(exp.doc(db,'users',inviterUid), {
        reagents:         (inviterData.reagents || 0) + REAGENTS_CONFIG.referralInviter,
        invitedCount:     (inviterData.invitedCount || 0) + 1,
        referralEarnings: (inviterData.referralEarnings || 0) + REAGENTS_CONFIG.referralInviter,
    }, { merge: true });
    await batch.commit();
    return { bonusForMe: REAGENTS_CONFIG.referralBonus, bonusForInviter: REAGENTS_CONFIG.referralInviter };
};

function _generateCode(uid) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AL-';
    for (let i = 0; i < 6; i++) code += chars[uid.charCodeAt(i % uid.length) % chars.length];
    return code;
}

async function _creditPassiveToUpstream(claimUser, claimedAmount, exp, db) {
    try {
        const mySnap = await exp.getDoc(exp.doc(db,'users',claimUser.uid), { source:'server' });
        if (!mySnap.exists()) return;
        let currentData = mySnap.data();

        for (const levelCfg of REAGENTS_CONFIG.referralLevels) {
            const upstreamUid = currentData.invitedBy;
            if (!upstreamUid) break;
            const upSnap = await exp.getDoc(exp.doc(db,'users',upstreamUid), { source:'server' });
            if (!upSnap.exists()) break;
            const upData        = upSnap.data();
            const roundedReward = roundReward(claimedAmount * (levelCfg.percent / 100));
            if (roundedReward > 0) {
                const existingLog      = upData.passiveLog || {};
                const existingFromUser = existingLog[claimUser.uid] || {};
                await exp.setDoc(exp.doc(db,'users',upstreamUid), {
                    pendingPassive: (upData.pendingPassive || 0) + roundedReward,
                    passiveLog: {
                        ...existingLog,
                        [claimUser.uid]: {
                            level:       levelCfg.level,
                            lastAmount:  roundedReward,
                            totalAmount: (existingFromUser.totalAmount || 0) + roundedReward,
                            percent:     levelCfg.percent,
                            lastClaimAt: new Date().toISOString(),
                        }
                    }
                }, { merge: true });
            }
            currentData = upData;
        }
    } catch(err) { console.error('[Reagents] _creditPassiveToUpstream error:', err); }
}

async function _tryPassivePayout(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return 0;
    try {
        const snap = await exp.getDoc(exp.doc(db,'users',user.uid));
        if (!snap.exists()) return 0;
        const data           = snap.data();
        const pendingPassive = data.pendingPassive || 0;
        if (pendingPassive <= 0) return 0;
        const payout = Math.ceil(pendingPassive);
        await exp.setDoc(exp.doc(db,'users',user.uid), {
            reagents:            (data.reagents || 0) + payout,
            pendingPassive:      0,
            referralEarnings:    (data.referralEarnings || 0) + payout,
            lastPassivePayoutAt: new Date().toISOString(),
            lastPassivePayout:   payout,
        }, { merge: true });
        return payout;
    } catch(err) { console.error('[Reagents] _tryPassivePayout error:', err); return 0; }
}

const _tryWeeklyPassivePayout = _tryPassivePayout;

async function getPassiveRewardInfo(user, userData) {
    try {
        let freshData = userData;
        if (user) {
            const db = window.db, exp = window.__firestoreExports;
            if (db && exp && exp.getDoc && exp.doc) {
                try {
                    const s = await exp.getDoc(exp.doc(db,'users',user.uid));
                    if (s.exists()) freshData = s.data();
                } catch(e) {}
            }
        }
        const passiveLog      = freshData.passiveLog || {};
        const sevenDaysAgo    = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const activeReferrals = Object.values(passiveLog).filter(info => {
            if (!info.lastClaimAt) return false;
            try { return new Date(info.lastClaimAt).getTime() > sevenDaysAgo; } catch(e) { return false; }
        }).length;
        const referralDetails = Object.entries(passiveLog).map(([uid, info]) => ({
            uid, level: info.level, lastAmount: info.lastAmount,
            totalAmount: info.totalAmount || info.lastAmount,
            percent: info.percent, lastClaimAt: info.lastClaimAt,
        }));
        return {
            pendingPassive:   Math.round((freshData.pendingPassive || 0) * 10) / 10,
            referralEarnings: freshData.referralEarnings || 0,
            invitedCount:     freshData.invitedCount     || 0,
            lastPayout:       freshData.lastPassivePayout   || 0,
            lastPayoutAt:     freshData.lastPassivePayoutAt || '',
            activeReferrals, referralDetails,
            canPayoutNow: (freshData.pendingPassive || 0) > 0,
        };
    } catch(err) {
        return { pendingPassive:0, referralEarnings:0, invitedCount:0, lastPayout:0,
                 lastPayoutAt:'', activeReferrals:0, referralDetails:[], canPayoutNow:false };
    }
}

// ─────────────────────────────────────────────────────────────────
// UI — открытие / закрытие / клейм
// ─────────────────────────────────────────────────────────────────

window.openClaimModal = async function() {
    const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
    if (!user) {
        if (typeof window.footerShowToast === 'function')
            window.footerShowToast(lang('claim_login_required'), 'error');
        return;
    }
    _ensureClaimModal();
    const modal = document.getElementById('claimModal');
    const body  = document.getElementById('claimModalBody');
    if (!modal || !body) return;

    body.innerHTML = _renderLoading();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const payout = await _tryPassivePayout(user);
    const status = await getClaimStatus(user);
    if (!status) { body.innerHTML = _renderError(lang('claim_load_error')); return; }
    if (payout > 0) status._payoutBanner = payout;

    body.innerHTML = _renderClaimUI(status);
};

window.closeClaimModal = function() {
    const modal = document.getElementById('claimModal');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
};

window.doClaim = async function() {
    const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
    if (!user) return;
    const btn = document.getElementById('claimBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${lang('claim_claiming')}`; }
    try {
        const result = await performClaim(user);
        _showClaimSuccess(result);
        _applyClaimBtnVisual(false);
        const balEl = document.getElementById('profileReagentBalance');
        if (balEl) balEl.innerHTML = result.newReagents +
            ` <span class="text-sm font-normal text-slate-400 ml-1">${lang('reagents_rgt_unit')}</span>`;
        const streakEl = document.getElementById('profileStreak');
        if (streakEl) streakEl.innerHTML = result.newStreak +
            ` <span class="text-xs font-normal text-slate-400">${lang('account_days_short')}</span>`;
        _updateHeaderReagents(result.newReagents);
    } catch(err) {
        const body = document.getElementById('claimModalBody');
        if (body) body.innerHTML = _renderError(err.message);
    }
};

// Копировать реферальный код
window._copyRefCode = function(code) {
    navigator.clipboard.writeText(code).then(() => {
        const el = document.getElementById('refCodeCopyBtn');
        if (el) {
            const orig = el.innerHTML;
            el.innerHTML = '<i class="fas fa-check"></i>';
            el.style.color = '#34d399';
            setTimeout(() => { el.innerHTML = orig; el.style.color = ''; }, 1500);
        }
    }).catch(() => {});
};

// Тоггл FAQ
window._toggleFaq = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const isHidden = el.style.display === 'none' || el.style.display === '';
    el.style.display = isHidden ? 'block' : 'none';
};

// Тоггл списка рефералов (показать всё / свернуть)
window._toggleRefList = function() {
    const full    = document.getElementById('refListFull');
    const preview = document.getElementById('refListPreview');
    const btn     = document.getElementById('refListToggleBtn');
    if (!full || !preview || !btn) return;
    const isEn = getCurrentLang().startsWith('en');
    if (full.style.display === 'none') {
        full.style.display    = 'block';
        preview.style.display = 'none';
        btn.textContent = isEn ? '▲ Collapse' : '▲ Свернуть';
    } else {
        full.style.display    = 'none';
        preview.style.display = 'block';
        btn.textContent = isEn ? '▼ Show all' : '▼ Показать всех';
    }
};

// ─────────────────────────────────────────────────────────────────
// РЕНДЕР — загрузка / ошибка
// ─────────────────────────────────────────────────────────────────

function _renderLoading() {
    return `<div class="text-center py-12">
        <div class="text-5xl mb-3 animate-pulse">🧪</div>
        <p class="text-slate-400 text-sm">${lang('claim_loading')}</p>
    </div>`;
}

function _renderError(msg) {
    return `<div class="text-center py-10">
        <div class="text-4xl mb-3">⚠️</div>
        <p class="text-red-400 text-sm mb-4">${msg}</p>
        <button onclick="closeClaimModal()"
            class="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors">
            ${lang('claim_error_close')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ГЛАВНЫЙ РЕНДЕР
// ─────────────────────────────────────────────────────────────────

function _renderClaimUI(status) {
    const { canClaim, streak, newStreak, reagents, reward, streakBroken,
            nextMilestone, passiveInfo, bestStreak, referralCode, _payoutBanner } = status;

    const prevMilestone = Math.max(nextMilestone.days - 30, 0);
    const progressPct   = Math.min(
        Math.round(((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100), 100
    );
    const weekDays = _buildWeekDays(status);
    const isEn     = getCurrentLang().startsWith('en');

    // ── ЛЕВАЯ КОЛОНКА ────────────────────────────────────────────
    const leftCol = `
    <!-- Заголовок + FAQ -->
    <div class="col-header">
        <span style="font-size:18px">🧪</span>
        <div style="flex:1;min-width:0">
            <div class="ch-title">${lang('claim_title')}</div>
            <div class="ch-sub">${lang('claim_updated_utc')}</div>
        </div>
        <button class="faq-btn" onclick="_toggleFaq('faqStreak')" title="${isEn ? 'How it works?' : 'Как это работает?'}">i</button>
    </div>

    <!-- FAQ стрик -->
    <div id="faqStreak" class="faq-block" style="display:none">${_getFaqStreak()}</div>

    <!-- Баннер автовыплаты -->
    ${_payoutBanner ? `
    <div class="payout-banner">
        <span style="font-size:18px">✨</span>
        <div>
            <div class="pb-title">${isEn ? 'Referral income credited!' : 'Начислено от рефералов!'}</div>
            <div class="pb-sub">+${_payoutBanner} RGT ${isEn ? 'added to balance' : 'добавлено к балансу'}</div>
        </div>
    </div>` : ''}

    <!-- Баланс / Стрик / Рекорд -->
    <div class="stats-grid mb-3">
        <div class="mini-card">
            <div class="mc-label">${lang('claim_balance_label')}</div>
            <div class="mc-value" style="color:#22d3ee">${reagents}</div>
            <div class="mc-unit">${lang('reagents_rgt_unit')}</div>
        </div>
        <div class="mini-card">
            <div class="mc-label">${lang('claim_streak_label')}</div>
            <div class="mc-value" style="color:#fb923c">${streak}</div>
            <div class="mc-unit">🔥 ${isEn ? 'd.' : 'дн.'}</div>
        </div>
        <div class="mini-card" title="${isEn ? 'Best streak ever' : 'Лучший стрик за всё время'}">
            <div class="mc-label">${isEn ? 'Record 🏆' : 'Рекорд 🏆'}</div>
            <div class="mc-value" style="color:#fbbf24">${Math.max(bestStreak || 0, streak)}</div>
            <div class="mc-unit">${isEn ? 'd.' : 'дн.'}</div>
        </div>
    </div>

    ${streakBroken ? `
    <div class="alert-box alert-red mb-3">
        <div style="font-size:22px;margin-bottom:4px">💔</div>
        <div class="alert-title" style="color:#f87171">${lang('claim_streak_broken_title')}</div>
        <div class="alert-sub">${lang('claim_streak_broken_desc')}</div>
    </div>` : ''}

    <!-- Дни недели -->
    <div class="mb-3">
        <div class="section-label">${lang('claim_week_progress')}</div>
        <div class="week-row">${weekDays}</div>
    </div>

    <!-- Прогресс + счётчик -->
    <div class="progress-block mb-3">
        <div class="pb-row mb-2">
            <span class="text-xs text-slate-400">🎯 ${lang('claim_until_bonus').replace('{days}', nextMilestone.days)}</span>
            <span class="text-xs font-bold" style="color:#22d3ee">${lang('claim_days_left').replace('{days}', nextMilestone.daysLeft)}</span>
        </div>
        <div class="progress-track">
            <div class="progress-fill" style="width:${progressPct}%"></div>
        </div>
        <div class="pb-row mt-2">
            <span class="text-xs" style="color:#475569">${progressPct}% ${isEn ? 'done' : 'пройдено'}</span>
            <div style="display:flex;gap:6px">
                <div class="badge-cyan">
                    <span class="badge-big">${nextMilestone.daysLeft}</span>
                    <span class="badge-small">${isEn ? 'd. to bonus' : 'дн. до бонуса'}</span>
                </div>
                <div class="badge-yellow">
                    <span class="badge-big">+${calcReward(nextMilestone.days).bonus}</span>
                    <span class="badge-small">RGT ${isEn ? 'bonus' : 'бонус'}</span>
                </div>
            </div>
        </div>
    </div>

    ${canClaim ? `
    <!-- Награда -->
    <div class="reward-block mb-3">
        <div class="text-xs text-slate-400 mb-1">${lang('claim_today_reward')}</div>
        <div class="reward-amount">+${reward.total}</div>
        <div class="text-xs text-slate-400 mb-1">${lang('reagents_rgt_unit')}</div>
        ${reward.bonus > 0 ? `
        <div class="bonus-badge">⭐ +${reward.bonus} ${reward.label}</div>` : ''}
        ${newStreak > streak ? `
        <div class="text-xs text-slate-400 mt-1.5">
            ${lang('claim_streak_will_be')} <span style="color:#fb923c;font-weight:700">${newStreak} 🔥</span>
        </div>` : ''}
    </div>
    <button id="claimBtn" onclick="window.doClaim()" class="claim-btn">
        <span style="font-size:20px">🧪</span> ${lang('claim_get_btn')}
    </button>
    ` : `
    <!-- Уже клеймил -->
    <div class="alert-box alert-green mb-3">
        <div class="check-circle"><i class="fas fa-check" style="font-size:18px;color:#34d399"></i></div>
        <div class="alert-title" style="color:#34d399;font-size:15px">${lang('claim_already_title')}</div>
        <div class="alert-sub">${lang('claim_next_at')} <span style="color:#fff;font-weight:700">00:00 UTC</span></div>
        <div class="alert-sub" style="font-family:monospace;margin-top:2px">${_getTimeToMidnightUTC()}</div>
    </div>`}

    <!-- Таблица стрик бонусов -->
    <div class="mt-3 pt-3" style="border-top:1px solid rgba(255,255,255,0.05)">
        <div class="section-label">${lang('claim_rewards_table')}</div>
        <div class="bonus-grid">
            ${REAGENTS_CONFIG.streakBonuses.map(sb => `
            <div class="bonus-row ${streak >= sb.days ? 'bonus-done' : 'bonus-lock'}">
                <span>${streak >= sb.days ? '✅' : '🔒'} ${sb.days}${lang('claim_days_unit')}</span>
                <span style="font-weight:700">+${sb.bonus}</span>
            </div>`).join('')}
        </div>
        <div class="text-center mt-2" style="font-size:10px;color:#475569">${lang('claim_after_60')}</div>
    </div>`;

    // ── ПРАВАЯ КОЛОНКА ───────────────────────────────────────────
    const rightCol = _renderPassiveBlock(passiveInfo, referralCode, isEn);

    return `
    <div class="two-col-wrap">
        <div class="tcol-left">${leftCol}</div>
        <div class="tcol-divider"></div>
        <div class="tcol-right">${rightCol}</div>
    </div>
    <div style="padding:0 14px 12px">
        <button onclick="closeClaimModal()" class="close-btn">${lang('claim_close_btn')}</button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ПРАВАЯ КОЛОНКА
// ─────────────────────────────────────────────────────────────────

function _renderPassiveBlock(passiveInfo, referralCode, isEn) {
    if (!passiveInfo) return '<div style="padding:16px;color:#64748b;text-align:center">—</div>';

    const { referralEarnings, invitedCount, lastPayout, lastPayoutAt, referralDetails } = passiveInfo;
    const levels = REAGENTS_CONFIG.referralLevels;

    let lastPayoutStr = '—';
    if (lastPayoutAt) {
        try { lastPayoutStr = new Date(lastPayoutAt).toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric' }); }
        catch(e) { lastPayoutStr = lastPayoutAt.substring(0,10); }
    }

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentActive = (referralDetails || []).filter(ref => {
        if (!ref.lastClaimAt) return false;
        try { return new Date(ref.lastClaimAt).getTime() > sevenDaysAgo; } catch(e) { return false; }
    }).length;

    // Топ рефералов
    const topRefs = [...(referralDetails || [])]
        .sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
    const top3    = topRefs.slice(0, 3);
    const hasMore = topRefs.length > 3;

    function refRow(ref, idx) {
        let timeStr = '';
        if (ref.lastClaimAt) {
            try {
                const diff = Date.now() - new Date(ref.lastClaimAt).getTime();
                if (diff < 3600000)      timeStr = Math.floor(diff/60000)   + (isEn ? ' min' : ' мин');
                else if (diff < 86400000) timeStr = Math.floor(diff/3600000) + (isEn ? ' h'   : ' ч');
                else                       timeStr = Math.floor(diff/86400000)+ (isEn ? ' d'   : ' дн');
            } catch(e) {}
        }
        const medals = ['🥇','🥈','🥉'];
        return `
        <div class="ref-row">
            <div class="ref-left">
                <span style="font-size:13px">${medals[idx] !== undefined ? medals[idx] : '·'}</span>
                <span class="ref-level">Ур.${ref.level}</span>
                <span class="ref-uid">${ref.uid.substring(0,8)}…</span>
            </div>
            <div class="ref-right">
                ${timeStr ? `<span class="ref-time">${timeStr} ${isEn ? 'ago' : 'назад'}</span>` : ''}
                <span class="ref-amount">+${ref.totalAmount || ref.lastAmount}</span>
            </div>
        </div>`;
    }

    // График 7 дней
    const dayLabels  = [];
    const dayAmounts = [];
    const dayNamesRu = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
    const dayNamesEn = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setUTCDate(d.getUTCDate() - i);
        const dayStr = getUTCDateString(d);
        dayLabels.push((isEn ? dayNamesEn : dayNamesRu)[d.getUTCDay()]);
        let amount = 0;
        for (const ref of (referralDetails || [])) {
            if (!ref.lastClaimAt) continue;
            try { if (getUTCDateString(new Date(ref.lastClaimAt)) === dayStr) amount += (ref.lastAmount || 0); }
            catch(e) {}
        }
        dayAmounts.push(amount);
    }
    const maxAmt = Math.max(...dayAmounts, 1);
    const chartBars = dayLabels.map((label, i) => {
        const pct     = Math.round((dayAmounts[i] / maxAmt) * 100);
        const isToday = i === 6;
        return `
        <div class="chart-col">
            <div class="chart-val" style="color:${dayAmounts[i]>0?'#34d399':'#475569'}">
                ${dayAmounts[i] > 0 ? '+'+dayAmounts[i] : ''}
            </div>
            <div class="chart-bar-wrap">
                <div class="chart-bar" style="height:${Math.max(pct,4)}%;background:${isToday?'linear-gradient(180deg,#22d3ee,#3b82f6)':'rgba(52,211,153,0.35)'}"></div>
            </div>
            <div class="chart-label" style="color:${isToday?'#67e8f9':'#475569'}">${label}</div>
        </div>`;
    }).join('');

    return `
    <!-- Заголовок + FAQ -->
    <div class="col-header">
        <span style="font-size:18px">👥</span>
        <div style="flex:1;min-width:0">
            <div class="ch-title">${lang('passive_income_title')}</div>
            <div class="ch-sub">MLM · 3 ${isEn ? 'levels' : 'уровня'}</div>
        </div>
        <button class="faq-btn" onclick="_toggleFaq('faqReferral')" title="${isEn ? 'How referrals work?' : 'Как работают рефералы?'}">i</button>
    </div>

    <!-- FAQ рефералы -->
    <div id="faqReferral" class="faq-block" style="display:none">${_getFaqReferral()}</div>

    <!-- Реферальный код -->
    <div class="ref-code-block mb-3">
        <div class="rc-label">🔗 ${isEn ? 'Your referral code' : 'Ваш реферальный код'}</div>
        <div class="rc-row">
            <div class="rc-code">${referralCode || '—'}</div>
            <button id="refCodeCopyBtn" class="rc-copy-btn" onclick="_copyRefCode('${referralCode || ''}')" title="${isEn ? 'Copy' : 'Скопировать'}">
                <i class="fas fa-copy"></i>
            </button>
        </div>
        <div class="rc-hint">
            ${isEn
                ? `Invited gets +${REAGENTS_CONFIG.referralBonus} RGT, you get +${REAGENTS_CONFIG.referralInviter} RGT`
                : `Приглашённый получит +${REAGENTS_CONFIG.referralBonus} RGT, вы — +${REAGENTS_CONFIG.referralInviter} RGT`}
        </div>
    </div>

    <!-- 3 плитки статистики -->
    <div class="stats-grid mb-3">
        <div class="mini-card">
            <div class="mc-value" style="color:#22d3ee">${invitedCount}</div>
            <div class="mc-label">${lang('passive_invited')}</div>
        </div>
        <div class="mini-card">
            <div class="mc-value" style="color:#60a5fa">${recentActive}</div>
            <div class="mc-label">${isEn ? 'Active 7d.' : 'Активны 7дн.'}</div>
        </div>
        <div class="mini-card">
            <div class="mc-value" style="color:#34d399">${referralEarnings}</div>
            <div class="mc-label">${lang('passive_total_earned')}</div>
        </div>
    </div>

    <!-- Итого -->
    <div class="total-block mb-3">
        <div class="tb-row">
            <span class="text-xs" style="color:#cbd5e1;font-weight:500">💰 ${isEn ? 'Total from referrals' : 'Всего от рефералов'}</span>
            <span style="font-size:13px;font-weight:900;color:#34d399">+${referralEarnings} RGT</span>
        </div>
        ${lastPayout > 0 ? `
        <div class="tb-row" style="border-top:1px solid rgba(255,255,255,0.05);padding-top:6px;margin-top:6px">
            <span class="text-xs" style="color:#64748b">${isEn ? 'Last payout' : 'Посл. начисление'} ${lastPayoutStr}</span>
            <span class="text-xs" style="color:#6ee7b7;font-weight:600">+${lastPayout} RGT</span>
        </div>` : `
        <div style="text-align:center;font-size:10px;color:#475569">
            ${isEn ? 'Income appears when referrals claim' : 'Начисления появятся когда рефералы сделают клейм'}
        </div>`}
    </div>

    <!-- График 7 дней -->
    <div class="chart-block mb-3">
        <div class="section-label">📊 ${isEn ? 'Income last 7 days' : 'Доход за 7 дней'}</div>
        <div class="chart-wrap">${chartBars}</div>
    </div>

    <!-- Топ рефералов -->
    ${topRefs.length > 0 ? `
    <div class="mb-3">
        <div class="section-label">🏆 ${isEn ? 'Top referrals' : 'Топ рефералов'}</div>
        <!-- Превью: топ 3 -->
        <div id="refListPreview" class="refs-list">
            ${top3.map((ref, idx) => refRow(ref, idx)).join('')}
        </div>
        <!-- Все рефералы (скрыто) -->
        ${hasMore ? `
        <div id="refListFull" class="refs-list" style="display:none">
            ${topRefs.map((ref, idx) => refRow(ref, idx)).join('')}
        </div>
        <button id="refListToggleBtn" onclick="_toggleRefList()" class="toggle-refs-btn">
            ▼ ${isEn ? 'Show all' : 'Показать всех'} (${topRefs.length})
        </button>` : ''}
    </div>
    ` : `
    <div class="empty-refs mb-3">
        <div style="font-size:24px;margin-bottom:4px">🔗</div>
        <div style="font-size:11px;color:#64748b">
            ${isEn ? 'Invite referrals —<br>their claims bring you income' : 'Пригласи рефералов —<br>их клеймы приносят доход'}
        </div>
    </div>`}

    <!-- Таблица уровней -->
    <div class="section-label">${lang('passive_levels_title')}</div>
    <div class="levels-grid">
        ${levels.map(lv => `
        <div class="level-card">
            <div class="lc-pct">${lv.percent}%</div>
            <div class="lc-label">${lang('passive_level')} ${lv.level}</div>
        </div>`).join('')}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ЭКРАН УСПЕХА
// ─────────────────────────────────────────────────────────────────

function _showClaimSuccess(result) {
    const body  = document.getElementById('claimModalBody');
    if (!body) return;
    const isEn  = getCurrentLang().startsWith('en');
    body.innerHTML = `
    <div style="padding:24px;text-align:center;overflow-y:auto">
        <div style="position:relative;width:72px;height:72px;margin:0 auto 16px">
            <div style="position:absolute;inset:0;border-radius:50%;background:rgba(6,182,212,0.2);animation:ping 1s cubic-bezier(0,0,.2,1) infinite"></div>
            <div style="position:relative;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,rgba(6,182,212,0.3),rgba(59,130,246,0.3));border:2px solid rgba(6,182,212,0.5);display:flex;align-items:center;justify-content:center;font-size:28px">🧪</div>
        </div>
        <h3 style="font-size:22px;font-weight:900;color:#fff;margin-bottom:4px">${lang('claim_success_title')}</h3>
        ${result.streakBroken ? `<div style="font-size:13px;color:#f87171;margin-bottom:10px">${lang('claim_streak_reset')}</div>` : ''}

        <div style="background:rgba(30,41,59,0.5);border-radius:14px;padding:16px;margin-bottom:14px">
            <div style="font-size:11px;color:#64748b;margin-bottom:4px">${lang('claim_credited')}</div>
            <div style="font-size:38px;font-weight:900;background:linear-gradient(90deg,#22d3ee,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">+${result.reward.total}</div>
            <div style="font-size:13px;color:#94a3b8">${lang('claim_reagents_unit')}</div>
            ${result.reward.bonus > 0 ? `
            <div style="margin-top:8px;display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.3);color:#fbbf24;font-size:12px">
                <i class="fas fa-star"></i> ${result.reward.label} — +${result.reward.bonus} ${lang('reagents_rgt_unit')}!
            </div>` : ''}
        </div>

        <div style="background:rgba(30,41,59,0.3);border-radius:12px;padding:12px;margin-bottom:14px;text-align:left">
            <div style="font-size:11px;color:#64748b;margin-bottom:8px">${lang('passive_credited_to_upstream')}</div>
            ${REAGENTS_CONFIG.referralLevels.map(lv => {
                const r = roundReward(result.reward.total * lv.percent / 100);
                return `<div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
                    <span style="color:#94a3b8">${lang('passive_level')} ${lv.level} <span style="color:#475569">(${lv.percent}%)</span></span>
                    <span style="color:#6ee7b7;font-weight:600">+${r} ${lang('reagents_rgt_unit')}</span>
                </div>`;
            }).join('')}
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
            ${[
                { val: result.newReagents,               color:'#22d3ee', label: lang('claim_balance_short') },
                { val: result.newStreak+'🔥',             color:'#fb923c', label: lang('claim_streak_short')  },
                { val: (result.bestStreak||result.newStreak)+'🏆', color:'#fbbf24', label: isEn ? 'Record' : 'Рекорд' },
                { val: result.nextMilestone.daysLeft,    color:'#34d399', label: lang('claim_to_bonus_short') },
            ].map(it => `
            <div style="background:rgba(30,41,59,0.3);border-radius:12px;padding:10px 6px;text-align:center">
                <div style="font-size:15px;font-weight:900;color:${it.color}">${it.val}</div>
                <div style="font-size:10px;color:#64748b;margin-top:2px">${it.label}</div>
            </div>`).join('')}
        </div>

        <div style="font-size:11px;color:#64748b;margin-bottom:14px">
            ${lang('claim_next_claim')} <span style="color:#fff;font-weight:600">00:00 UTC</span> · ${_getTimeToMidnightUTC()}
        </div>

        <button onclick="closeClaimModal()"
            style="width:100%;padding:12px;border-radius:12px;background:linear-gradient(90deg,#0891b2,#2563eb);color:#fff;font-weight:700;font-size:14px;cursor:pointer;border:none;transition:opacity 0.2s"
            onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
            ${lang('claim_great_btn')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ─────────────────────────────────────────────────────────────────

function _buildWeekDays(status) {
    const { streak, lastClaim } = status;
    const dayKeys     = ['week_mon','week_tue','week_wed','week_thu','week_fri','week_sat','week_sun'];
    const todayUTCDay = new Date().getUTCDay();
    const todayIdx    = (todayUTCDay + 6) % 7;

    return dayKeys.map((key, i) => {
        const dayLabel = lang(key);
        let state = 'future';
        if (i < todayIdx)   state = streak > (todayIdx - i) ? 'done' : 'missed';
        if (i === todayIdx) state = lastClaim === getUTCDateString() ? 'today-done' : 'today';

        const bg = {
            'done':       'rgba(52,211,153,0.15)',
            'today':      'rgba(6,182,212,0.15)',
            'today-done': 'rgba(52,211,153,0.2)',
            'missed':     'rgba(239,68,68,0.1)',
            'future':     'rgba(30,41,59,0.4)',
        };
        const border = {
            'done':       '#34d399',
            'today':      '#22d3ee',
            'today-done': '#34d399',
            'missed':     'rgba(239,68,68,0.4)',
            'future':     'rgba(71,85,105,0.4)',
        };
        const color = {
            'done':       '#34d399',
            'today':      '#22d3ee',
            'today-done': '#34d399',
            'missed':     '#f87171',
            'future':     '#475569',
        };
        const icons = { 'done':'✓', 'today':'🧪', 'today-done':'✓', 'missed':'✗', 'future': dayLabel.charAt(0).toUpperCase() };
        const ring  = (state === 'today' || state === 'today-done') ? 'box-shadow:0 0 0 2px rgba(6,182,212,0.3)' : '';

        return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
            <div style="width:30px;height:30px;border-radius:8px;border:1.5px solid ${border[state]};background:${bg[state]};color:${color[state]};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;${ring}">
                ${icons[state]}
            </div>
            <span style="font-size:9px;color:#64748b">${dayLabel}</span>
        </div>`;
    }).join('');
}

function _getTimeToMidnightUTC() {
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);
    const diff = midnight - new Date();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return lang('claim_time_left').replace('{h}', h).replace('{m}', m);
}

function _updateHeaderReagents(amount) {
    document.querySelectorAll('[data-reagents-balance]').forEach(el => {
        el.textContent = amount + ' ' + lang('reagents_rgt_unit');
    });
}

// ─────────────────────────────────────────────────────────────────
// МОДАЛКА
// ─────────────────────────────────────────────────────────────────

function _ensureClaimModal() {
    if (document.getElementById('claimModal')) return;
    const modal = document.createElement('div');
    modal.id        = 'claimModal';
    modal.className = 'crm-overlay';
    modal.innerHTML = `
        <div class="crm-box">
            <div class="crm-header">
                <div style="display:flex;align-items:center;gap:10px">
                    <div class="crm-icon">🧪</div>
                    <div>
                        <div class="crm-title" id="claimModalTitle">${lang('claim_title')}</div>
                        <div class="crm-sub"   id="claimModalSubtitle">${lang('claim_updated_utc')}</div>
                    </div>
                </div>
                <button class="crm-close" onclick="closeClaimModal()"
                    onmouseover="this.style.background='rgba(51,65,85,0.9)';this.style.color='#fff'"
                    onmouseout ="this.style.background='rgba(30,41,59,0.8)';this.style.color='#94a3b8'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="claimModalBody" class="crm-body"></div>
        </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) window.closeClaimModal(); });
    document.body.appendChild(modal);
    _addClaimStyles();
}

function _addClaimStyles() {
    if (document.getElementById('claim-styles')) return;
    const s = document.createElement('style');
    s.id = 'claim-styles';
    s.textContent = `
    /* ── Оверлей ── */
    .crm-overlay {
        position:fixed;inset:0;
        background:rgba(0,0,0,0.88);
        backdrop-filter:blur(10px);
        z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:8px;
        opacity:0;pointer-events:none;
        transition:opacity .3s ease;
    }
    .crm-overlay.active { opacity:1; pointer-events:all; }

    /* ── Окно ── */
    .crm-box {
        background:linear-gradient(145deg,#161e2e,#0b1120);
        border:1px solid rgba(99,179,237,0.1);
        border-radius:18px;
        width:100%;
        max-width:860px;
        /* На десктопе высота по содержимому, но не больше 94vh */
        max-height:94vh;
        display:flex;flex-direction:column;
        transform:translateY(18px) scale(0.97);
        transition:transform .3s cubic-bezier(.4,0,.2,1);
        box-shadow:0 28px 70px rgba(0,0,0,0.75);
        overflow:hidden;
    }
    .crm-overlay.active .crm-box { transform:none; }

    /* ── Шапка ── */
    .crm-header {
        display:flex;align-items:center;justify-content:space-between;
        padding:14px 18px 12px;
        border-bottom:1px solid rgba(255,255,255,0.05);
        flex-shrink:0;
    }
    .crm-icon {
        width:34px;height:34px;border-radius:9px;
        background:linear-gradient(135deg,rgba(6,182,212,.2),rgba(59,130,246,.2));
        border:1px solid rgba(6,182,212,.3);
        display:flex;align-items:center;justify-content:center;font-size:17px;
    }
    .crm-title { font-size:13px;font-weight:700;color:#fff; }
    .crm-sub   { font-size:11px;color:#64748b; }
    .crm-close {
        width:30px;height:30px;border-radius:7px;
        background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.06);
        color:#94a3b8;cursor:pointer;
        display:flex;align-items:center;justify-content:center;
        font-size:12px;transition:all .2s;
    }

    /* ── Тело: скроллится целиком на мобиле ── */
    .crm-body {
        flex:1;
        overflow-y:auto;
        /* Важно: на мобиле всё в один поток */
        -webkit-overflow-scrolling:touch;
        overscroll-behavior:contain;
    }
    .crm-body::-webkit-scrollbar { width:3px; }
    .crm-body::-webkit-scrollbar-thumb { background:#334155;border-radius:2px; }

    /* ── Двухколоночная сетка (десктоп) ── */
    .two-col-wrap {
        display:grid;
        grid-template-columns:1fr 1px 1fr;
        min-height:0;
    }
    .tcol-left  { padding:14px 16px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
    .tcol-left::-webkit-scrollbar  { width:2px; }
    .tcol-left::-webkit-scrollbar-thumb  { background:#334155; }
    .tcol-divider { background:rgba(255,255,255,.05); }
    .tcol-right { padding:14px 16px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
    .tcol-right::-webkit-scrollbar { width:2px; }
    .tcol-right::-webkit-scrollbar-thumb { background:#334155; }

    /* ── Мобильные ── */
    @media(max-width:620px){
        .crm-box { border-radius:14px; max-height:92vh; }
        /* На телефоне — одна колонка, весь скролл через crm-body */
        .two-col-wrap {
            display:block;
        }
        .tcol-left, .tcol-right {
            overflow-y:visible;   /* скролл через родителя */
            padding:12px 14px;
        }
        .tcol-divider { display:block; height:1px; width:100%; }
    }

    /* ── Компоненты ── */
    .col-header {
        display:flex;align-items:center;gap:8px;
        margin-bottom:12px;padding-bottom:10px;
        border-bottom:1px solid rgba(255,255,255,.05);
    }
    .ch-title { font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
    .ch-sub   { font-size:10px;color:#64748b; }

    .faq-btn {
        width:21px;height:21px;border-radius:50%;
        background:rgba(99,179,237,.1);border:1px solid rgba(99,179,237,.25);
        color:#67e8f9;font-size:11px;font-weight:700;cursor:pointer;flex-shrink:0;transition:all .2s;
    }
    .faq-block {
        margin-bottom:10px;padding:10px 12px;
        background:rgba(30,58,138,.18);border:1px solid rgba(59,130,246,.25);border-radius:10px;
    }
    .faq-title { font-size:11px;font-weight:700;color:#93c5fd;margin-bottom:6px; }
    .faq-body  { font-size:11px;color:#94a3b8;line-height:1.6;display:flex;flex-direction:column;gap:2px; }
    .faq-hi-white { color:#fff; }
    .faq-hi-cyan  { color:#22d3ee; }
    .faq-hi-green { color:#34d399; }

    .payout-banner {
        display:flex;align-items:center;gap:10px;
        padding:10px 12px;margin-bottom:10px;
        background:rgba(6,78,59,.25);border:1px solid rgba(52,211,153,.35);border-radius:10px;
    }
    .pb-title { font-size:12px;font-weight:700;color:#34d399; }
    .pb-sub   { font-size:11px;color:#94a3b8; }

    .stats-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:6px; }
    .mini-card {
        background:rgba(28,38,58,.6);border:1px solid rgba(255,255,255,.05);
        border-radius:9px;padding:9px 6px;text-align:center;transition:border-color .2s;
    }
    .mini-card:hover { border-color:rgba(99,179,237,.2); }
    .mc-value { font-size:18px;font-weight:800;line-height:1;margin-bottom:3px; }
    .mc-label { font-size:10px;color:#64748b;line-height:1.3; }
    .mc-unit  { font-size:10px;color:#475569;margin-top:1px; }

    .alert-box { border-radius:10px;padding:12px;text-align:center; }
    .alert-red  { background:rgba(127,29,29,.2);border:1px solid rgba(239,68,68,.3); }
    .alert-green{ background:rgba(6,78,59,.15);border:1px solid rgba(52,211,153,.25); }
    .alert-title{ font-size:14px;font-weight:700;margin-bottom:2px; }
    .alert-sub  { font-size:12px;color:#94a3b8; }
    .check-circle {
        width:44px;height:44px;border-radius:50%;
        background:rgba(52,211,153,.15);border:2px solid rgba(52,211,153,.35);
        display:flex;align-items:center;justify-content:center;margin:0 auto 8px;
    }

    .section-label { font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px; }
    .week-row { display:flex;justify-content:space-between;gap:3px; }

    .progress-block {
        background:rgba(30,41,59,.5);border:1px solid rgba(255,255,255,.06);
        border-radius:10px;padding:10px 12px;
    }
    .pb-row { display:flex;align-items:center;justify-content:space-between; }
    .progress-track {
        height:6px;background:rgba(51,65,85,.8);border-radius:99px;overflow:hidden;
    }
    .progress-fill {
        height:100%;background:linear-gradient(90deg,#06b6d4,#3b82f6);border-radius:99px;transition:width .4s;
    }
    .badge-cyan, .badge-yellow {
        border-radius:7px;padding:3px 9px;text-align:center;
    }
    .badge-cyan   { background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.25); }
    .badge-yellow { background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.25); }
    .badge-big    { display:block;font-size:15px;font-weight:900;line-height:1; }
    .badge-cyan   .badge-big { color:#22d3ee; }
    .badge-yellow .badge-big { color:#fbbf24; }
    .badge-small  { display:block;font-size:9px;color:#64748b;margin-top:1px; }

    .reward-block {
        background:rgba(8,145,178,.1);border:1px solid rgba(6,182,212,.2);
        border-radius:10px;padding:12px;text-align:center;
    }
    .reward-amount { font-size:30px;font-weight:900;color:#22d3ee;line-height:1; }
    .bonus-badge {
        display:inline-flex;align-items:center;gap:5px;
        padding:4px 10px;border-radius:999px;
        background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.3);
        color:#fbbf24;font-size:11px;margin-top:6px;
    }
    .claim-btn {
        width:100%;padding:13px;border-radius:11px;
        background:linear-gradient(90deg,#06b6d4,#2563eb);
        color:#fff;font-size:15px;font-weight:900;
        border:none;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px;
        transition:opacity .2s, transform .15s;
    }
    .claim-btn:hover  { opacity:.9; transform:scale(1.015); }
    .claim-btn:active { transform:scale(0.98); }

    .bonus-grid { display:grid;grid-template-columns:1fr 1fr;gap:5px; }
    .bonus-row {
        display:flex;align-items:center;justify-content:space-between;
        padding:6px 9px;border-radius:7px;font-size:11px;
    }
    .bonus-done { background:rgba(6,78,59,.2);border:1px solid rgba(52,211,153,.3);color:#34d399; }
    .bonus-lock { background:rgba(30,41,59,.3);border:1px solid rgba(51,65,85,.3);color:#64748b; }

    .close-btn {
        width:100%;padding:10px;border-radius:10px;
        background:rgba(30,41,59,.8);border:1px solid rgba(255,255,255,.05);
        color:#64748b;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;
    }
    .close-btn:hover { background:rgba(51,65,85,.8);color:#fff; }

    /* Реф. код */
    .ref-code-block {
        background:rgba(30,41,59,.4);border:1px solid rgba(255,255,255,.06);
        border-radius:10px;padding:10px 12px;
    }
    .rc-label { font-size:10px;color:#94a3b8;margin-bottom:7px; }
    .rc-row   { display:flex;align-items:center;gap:7px; }
    .rc-code  {
        flex:1;min-width:0;
        background:rgba(10,15,28,.6);border:1px solid rgba(6,182,212,.2);
        border-radius:7px;padding:6px 10px;
        font-family:monospace;font-size:13px;font-weight:700;color:#22d3ee;letter-spacing:.06em;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    }
    .rc-copy-btn {
        width:32px;height:32px;flex-shrink:0;border-radius:7px;
        background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.28);
        color:#67e8f9;cursor:pointer;display:flex;align-items:center;justify-content:center;
        font-size:12px;transition:all .2s;
    }
    .rc-copy-btn:hover { background:rgba(6,182,212,.25); }
    .rc-hint { font-size:10px;color:#475569;margin-top:5px; }

    .total-block {
        background:rgba(30,41,59,.4);border:1px solid rgba(255,255,255,.06);
        border-radius:10px;padding:10px 12px;
    }
    .tb-row { display:flex;align-items:center;justify-content:space-between; }

    /* График */
    .chart-block {
        background:rgba(30,41,59,.3);border:1px solid rgba(255,255,255,.05);
        border-radius:10px;padding:10px 12px;
    }
    .chart-wrap { display:flex;gap:4px;align-items:flex-end;height:64px; }
    .chart-col  { display:flex;flex-direction:column;align-items:center;gap:2px;flex:1; }
    .chart-val  { font-size:9px;font-weight:600;min-height:12px;text-align:center; }
    .chart-bar-wrap {
        width:100%;background:rgba(30,41,59,.8);border-radius:4px;
        flex:1;display:flex;align-items:flex-end;overflow:hidden;
    }
    .chart-bar { width:100%;border-radius:3px;transition:height .3s; }
    .chart-label { font-size:9px; }

    /* Рефералы */
    .refs-list { display:flex;flex-direction:column;gap:4px; }
    .ref-row {
        display:flex;align-items:center;justify-content:space-between;
        padding:6px 9px;background:rgba(30,41,59,.5);border-radius:7px;
    }
    .ref-left  { display:flex;align-items:center;gap:5px; }
    .ref-right { display:flex;align-items:center;gap:6px; }
    .ref-level { font-size:10px;padding:1px 5px;border-radius:4px;background:rgba(6,182,212,.15);color:#22d3ee;font-weight:700; }
    .ref-uid   { font-size:10px;color:#64748b;font-family:monospace; }
    .ref-time  { font-size:10px;color:#475569; }
    .ref-amount{ font-size:11px;color:#34d399;font-weight:700; }

    .toggle-refs-btn {
        width:100%;margin-top:5px;padding:5px;border-radius:7px;
        background:rgba(30,41,59,.4);border:1px solid rgba(255,255,255,.06);
        color:#64748b;font-size:11px;cursor:pointer;transition:all .2s;
    }
    .toggle-refs-btn:hover { color:#94a3b8; }

    .empty-refs {
        padding:16px;background:rgba(30,41,59,.2);
        border:1px dashed rgba(71,85,105,.4);border-radius:10px;text-align:center;
    }

    /* Уровни */
    .levels-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:5px; }
    .level-card {
        padding:8px 4px;border-radius:9px;text-align:center;
        background:rgba(30,41,59,.4);border:1px solid rgba(51,65,85,.3);
    }
    .lc-pct   { font-size:15px;font-weight:900;color:#22d3ee; }
    .lc-label { font-size:10px;color:#64748b; }

    .mb-3 { margin-bottom:10px; }

    @keyframes ping {
        75%,100% { transform:scale(2); opacity:0; }
    }
    `;
    document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────────
// КНОПКА В ХЕДЕРЕ
// ─────────────────────────────────────────────────────────────────

var _claimCountdownInterval = null;

function _applyClaimBtnVisual(canClaim) {
    var btn = document.getElementById('headerClaimBtn');
    if (!btn) return;
    btn.setAttribute('data-claim-available', canClaim ? '1' : '0');
    if (_claimCountdownInterval) { clearInterval(_claimCountdownInterval); _claimCountdownInterval = null; }

    if (canClaim) {
        btn.className = 'relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/40 hover:to-blue-600/40 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl text-sm text-cyan-400 hover:text-white transition-all duration-300 cursor-pointer';
        btn.title     = lang('claim_btn_tooltip_available');
        btn.innerHTML =
            '<span class="text-base">🧪</span>' +
            '<span class="hidden sm:inline font-medium text-xs">' + lang('claim_btn_label') + '</span>' +
            '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>';
    } else {
        function msLeft() { var m = new Date(); m.setUTCHours(24,0,0,0); return m - new Date(); }
        function fmt(ms) {
            if (ms<=0) return '00:00:00';
            var s=Math.floor(ms/1000);
            return [Math.floor(s/3600),Math.floor((s%3600)/60),s%60].map(v=>String(v).padStart(2,'0')).join(':');
        }
        function render() {
            var rem = msLeft();
            if (rem<=0) { clearInterval(_claimCountdownInterval); _claimCountdownInterval=null; _applyClaimBtnVisual(true); return; }
            btn.className = 'relative flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/40 rounded-xl text-sm transition-all duration-300 cursor-default';
            btn.title     = lang('claim_btn_tooltip_cooldown');
            btn.innerHTML =
                '<span class="text-base" style="opacity:.4">🧪</span>'+
                '<div class="hidden sm:flex flex-col items-start leading-none gap-0.5">'+
                    '<span style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.05em">'+lang('claim_reset_in')+'</span>'+
                    '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c">'+fmt(rem)+'</span>'+
                '</div>'+
                '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c" class="sm:hidden">'+fmt(rem)+'</span>';
        }
        render();
        _claimCountdownInterval = setInterval(render, 1000);
    }
}
window._applyClaimBtnVisual = _applyClaimBtnVisual;

// ─────────────────────────────────────────────────────────────────
// ПЕРЕВОДЫ / АВТОПРОВЕРКА / ЭКСПОРТ
// ─────────────────────────────────────────────────────────────────

function _updateClaimTranslations() {
    const t = document.getElementById('claimModalTitle');
    if (t) t.textContent = lang('claim_title');
    const s = document.getElementById('claimModalSubtitle');
    if (s) s.textContent = lang('claim_updated_utc');
    const btn = document.getElementById('headerClaimBtn');
    if (btn) _applyClaimBtnVisual(btn.getAttribute('data-claim-available') === '1');
}
document.addEventListener('languageChanged', _updateClaimTranslations);

async function _checkClaimOnLoad() {
    var attempts = 0;
    while ((!window.auth || !window.auth.currentUser) && attempts < 20) {
        await new Promise(r => setTimeout(r, 500)); attempts++;
    }
    var user = (window.auth && window.auth.currentUser) || window.currentUser;
    if (!user) return;
    var status = await getClaimStatus(user);
    if (status) _applyClaimBtnVisual(status.canClaim);
}

window.ReagentsSystem = { getClaimStatus, performClaim, getUTCDateString, calcReward, getNextMilestone, getPassiveRewardInfo, CONFIG: REAGENTS_CONFIG };

console.log('🧪 Reagents System v2.2 loaded');
setTimeout(_checkClaimOnLoad, 2000);
setTimeout(_checkClaimOnLoad, 5000);

})();
