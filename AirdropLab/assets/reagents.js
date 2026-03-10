/**
 * ============================================
 * AirdropLab Reagents System v2.2
 * Система ежедневного клейма + MLM рефералы
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

function getCurrentUILang() {
    const raw =
        window.currentLang ||
        localStorage.getItem('language') ||
        document.documentElement.lang ||
        navigator.language ||
        'ru';
    return String(raw).toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

function faqText(type) {
    const ui = getCurrentUILang();

    if (type === 'streak') {
        if (ui === 'ru') {
            return `
                <div class="font-semibold text-blue-300 mb-1.5">❓ Как работает стрик?</div>
                <div class="text-slate-400 space-y-1">
                    <div>• Клеймите каждый день до <span class="text-white">00:00 UTC</span> — стрик растёт</div>
                    <div>• Пропустили день — стрик сбросится до 0</div>
                    <div>• За 7, 30, 60... дней подряд — получаете бонусные RGT</div>
                    <div>• Базовая награда: <span class="text-cyan-400">+${REAGENTS_CONFIG.dailyBase} RGT</span> в день</div>
                </div>
            `;
        }
        return `
            <div class="font-semibold text-blue-300 mb-1.5">❓ How does streak work?</div>
            <div class="text-slate-400 space-y-1">
                <div>• Claim every day before <span class="text-white">00:00 UTC</span> — your streak grows</div>
                <div>• Miss a day — the streak resets to 0</div>
                <div>• At 7, 30, 60... consecutive days you get bonus RGT</div>
                <div>• Base reward: <span class="text-cyan-400">+${REAGENTS_CONFIG.dailyBase} RGT</span> per day</div>
            </div>
        `;
    }

    if (ui === 'ru') {
        return `
            <div class="font-semibold text-blue-300 mb-1.5">❓ Как работают рефералы?</div>
            <div class="text-slate-400 space-y-1">
                <div>• Поделитесь своим реферальным кодом с друзьями</div>
                <div>• Новый пользователь получает <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span></div>
                <div>• Вы сразу получаете <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span></div>
                <div>• Каждый клейм реферала приносит вам <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[0].percent}%</span></div>
                <div>• 2-й уровень: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[1].percent}%</span> · 3-й: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
                <div>• Доход начисляется автоматически при открытии этого окна</div>
            </div>
        `;
    }

    return `
        <div class="font-semibold text-blue-300 mb-1.5">❓ How do referrals work?</div>
        <div class="text-slate-400 space-y-1">
            <div>• Share your referral code with friends</div>
            <div>• A new user gets <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span></div>
            <div>• You instantly get <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span></div>
            <div>• Every referral claim gives you <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[0].percent}%</span></div>
            <div>• Level 2: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[1].percent}%</span> · Level 3: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
            <div>• Income is auto-credited when you open this window</div>
        </div>
    `;
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
            bonus = sb.bonus;
            bonusKey = sb.labelKey;
            bonusLabel = lang(sb.labelKey);
            break;
        }
    }
    if (!bonus && newStreak > 60 && newStreak % 30 === 0) {
        const months = Math.floor(newStreak / 30);
        bonus = 100 * months;
        bonusLabel = `🎯 ${months} ${lang('streak_months_suffix')}`;
        bonusKey = '';
    }
    return {
        base: REAGENTS_CONFIG.dailyBase,
        bonus,
        total: REAGENTS_CONFIG.dailyBase + bonus,
        label: bonusLabel,
        labelKey: bonusKey
    };
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
// ОСНОВНАЯ ЛОГИКА КЛЕЙМА
// ─────────────────────────────────────────────────────────────────

async function getClaimStatus(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return null;

    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        let data = {};

        if (!snap.exists()) {
            data = {
                reagents: 0,
                streak: 0,
                lastClaimDate: '',
                invitedBy: '',
                invitedCount: 0,
                pendingPassive: 0,
                passiveLog: {},
                referralEarnings: 0,
                bestStreak: 0,
                referralCode: _generateCode(user.uid)
            };
        } else {
            data = snap.data();
        }

        const todayUTC = getUTCDateString();
        const lastClaim = data.lastClaimDate || '';
        const streak = data.streak || 0;
        const reagents = data.reagents || 0;
        const bestStreak = data.bestStreak || 0;
        const referralCode = data.referralCode || _generateCode(user.uid);

        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        const yesterdayStr = getUTCDateString(yesterday);

        let canClaim = false, streakBroken = false, newStreak = streak;
        if (lastClaim === todayUTC) {
            canClaim = false;
        } else if (lastClaim === yesterdayStr || lastClaim === '') {
            canClaim = true;
            newStreak = streak + 1;
        } else {
            canClaim = true;
            newStreak = 1;
            streakBroken = streak > 0;
        }

        const reward = calcReward(newStreak);
        const passiveInfo = await getPassiveRewardInfo(user, data);

        return {
            canClaim,
            streak,
            newStreak,
            reagents,
            lastClaim,
            todayUTC,
            streakBroken,
            reward,
            bestStreak,
            referralCode,
            nextMilestone: getNextMilestone(canClaim ? newStreak : streak),
            passiveInfo
        };
    } catch(err) {
        console.error('[Reagents] getClaimStatus error:', err);
        return null;
    }
}

async function performClaim(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) throw new Error(lang('claim_firebase_error'));

    const status = await getClaimStatus(user);
    if (!status) throw new Error(lang('claim_status_error'));
    if (!status.canClaim) throw new Error(lang('claim_already_title'));

    const todayUTC = getUTCDateString();
    const newReagents = status.reagents + status.reward.total;
    const newBestStreak = Math.max(status.bestStreak || 0, status.newStreak);

    await exp.setDoc(exp.doc(db, 'users', user.uid), {
        reagents: newReagents,
        streak: status.newStreak,
        lastClaimDate: todayUTC,
        lastClaimAt: new Date().toISOString(),
        bestStreak: newBestStreak,
    }, { merge: true });

    await _creditPassiveToUpstream(user, status.reward.total, exp, db);
    return { ...status, newReagents, bestStreak: newBestStreak };
}

// ─────────────────────────────────────────────────────────────────
// РЕФЕРАЛЬНАЯ СИСТЕМА
// ─────────────────────────────────────────────────────────────────

window.applyReferralCode = async function(currentUser, code) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !currentUser) throw new Error(lang('ref_login_required'));
    if (!/^AL-[A-Z0-9]{6}$/.test(code)) throw new Error(lang('ref_wrong_format'));

    const usersRef = exp.collection(db, 'users');
    const q = exp.query(usersRef, exp.where('referralCode', '==', code));
    const querySnap = await exp.getDocs(q);
    if (querySnap.empty) throw new Error(lang('ref_not_found'));

    const inviterDoc = querySnap.docs[0];
    const inviterUid = inviterDoc.id;
    const inviterData = inviterDoc.data();
    if (inviterUid === currentUser.uid) throw new Error(lang('ref_own_code'));

    const mySnap = await exp.getDoc(exp.doc(db, 'users', currentUser.uid));
    const myData = mySnap.exists() ? mySnap.data() : {};
    if (myData.referredBy) throw new Error(lang('ref_already_used'));

    const batch = exp.writeBatch(db);

    batch.set(exp.doc(db, 'users', currentUser.uid), {
        invitedBy: inviterUid,
        referralCode: myData.referralCode || _generateCode(currentUser.uid),
        reagents: (myData.reagents || 0) + REAGENTS_CONFIG.referralBonus,
        referralEarnings: myData.referralEarnings || 0,
        invitedAt: new Date().toISOString(),
    }, { merge: true });

    batch.set(exp.doc(db, 'users', inviterUid), {
        reagents: (inviterData.reagents || 0) + REAGENTS_CONFIG.referralInviter,
        invitedCount: (inviterData.invitedCount || 0) + 1,
        referralEarnings: (inviterData.referralEarnings || 0) + REAGENTS_CONFIG.referralInviter,
    }, { merge: true });

    await batch.commit();
    return {
        bonusForMe: REAGENTS_CONFIG.referralBonus,
        bonusForInviter: REAGENTS_CONFIG.referralInviter
    };
};

function _generateCode(uid) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AL-';
    for (let i = 0; i < 6; i++) code += chars[uid.charCodeAt(i % uid.length) % chars.length];
    return code;
}

async function _creditPassiveToUpstream(claimUser, claimedAmount, exp, db) {
    try {
        const mySnap = await exp.getDoc(exp.doc(db, 'users', claimUser.uid), { source: 'server' });
        if (!mySnap.exists()) return;
        let currentData = mySnap.data();

        for (const levelCfg of REAGENTS_CONFIG.referralLevels) {
            const upstreamUid = currentData.invitedBy;
            if (!upstreamUid) break;

            const upSnap = await exp.getDoc(exp.doc(db, 'users', upstreamUid), { source: 'server' });
            if (!upSnap.exists()) break;
            const upData = upSnap.data();

            const rawReward = claimedAmount * (levelCfg.percent / 100);
            const roundedReward = roundReward(rawReward);

            if (roundedReward > 0) {
                const existingLog = upData.passiveLog || {};
                const existingFromUser = existingLog[claimUser.uid] || {};

                await exp.setDoc(exp.doc(db, 'users', upstreamUid), {
                    pendingPassive: (upData.pendingPassive || 0) + roundedReward,
                    passiveLog: {
                        ...existingLog,
                        [claimUser.uid]: {
                            level: levelCfg.level,
                            lastAmount: roundedReward,
                            totalAmount: (existingFromUser.totalAmount || 0) + roundedReward,
                            percent: levelCfg.percent,
                            lastClaimAt: new Date().toISOString(),
                        }
                    }
                }, { merge: true });
            }

            currentData = upData;
        }
    } catch(err) {
        console.error('[Reagents] _creditPassiveToUpstream error:', err);
    }
}

async function _tryPassivePayout(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return 0;

    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        if (!snap.exists()) return 0;

        const data = snap.data();
        const pendingPassive = data.pendingPassive || 0;
        if (pendingPassive <= 0) return 0;

        const payout = Math.ceil(pendingPassive);

        await exp.setDoc(exp.doc(db, 'users', user.uid), {
            reagents: (data.reagents || 0) + payout,
            pendingPassive: 0,
            referralEarnings: (data.referralEarnings || 0) + payout,
            lastPassivePayoutAt: new Date().toISOString(),
            lastPassivePayout: payout,
        }, { merge: true });

        return payout;
    } catch(err) {
        console.error('[Reagents] _tryPassivePayout error:', err);
        return 0;
    }
}

const _tryWeeklyPassivePayout = _tryPassivePayout;

async function getPassiveRewardInfo(user, userData) {
    try {
        let freshData = userData;

        if (user) {
            const db = window.db, exp = window.__firestoreExports;
            if (db && exp && exp.getDoc && exp.doc) {
                try {
                    const freshSnap = await exp.getDoc(exp.doc(db, 'users', user.uid));
                    if (freshSnap.exists()) freshData = freshSnap.data();
                } catch(e) {}
            }
        }

        const pendingPassive = freshData.pendingPassive || 0;
        const referralEarnings = freshData.referralEarnings || 0;
        const invitedCount = freshData.invitedCount || 0;
        const lastPayout = freshData.lastPassivePayout || 0;
        const lastPayoutAt = freshData.lastPassivePayoutAt || '';
        const passiveLog = freshData.passiveLog || {};

        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const activeReferrals = Object.values(passiveLog).filter(info => {
            if (!info.lastClaimAt) return false;
            try { return new Date(info.lastClaimAt).getTime() > sevenDaysAgo; }
            catch(e) { return false; }
        }).length;

        const referralDetails = Object.entries(passiveLog).map(([uid, info]) => ({
            uid,
            level: info.level,
            lastAmount: info.lastAmount,
            totalAmount: info.totalAmount || info.lastAmount,
            percent: info.percent,
            lastClaimAt: info.lastClaimAt,
        }));

        return {
            pendingPassive: Math.round(pendingPassive * 10) / 10,
            referralEarnings,
            invitedCount,
            lastPayout,
            lastPayoutAt,
            activeReferrals,
            referralDetails,
            canPayoutNow: pendingPassive > 0
        };
    } catch(err) {
        return {
            pendingPassive: 0,
            referralEarnings: 0,
            invitedCount: 0,
            lastPayout: 0,
            lastPayoutAt: '',
            activeReferrals: 0,
            referralDetails: [],
            canPayoutNow: false
        };
    }
}

// ─────────────────────────────────────────────────────────────────
// UI
// ─────────────────────────────────────────────────────────────────

window.openClaimModal = async function() {
    const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
    if (!user) {
        if (typeof window.footerShowToast === 'function') {
            window.footerShowToast(lang('claim_login_required'), 'error');
        }
        return;
    }

    _ensureClaimModal();
    const modal = document.getElementById('claimModal');
    const body = document.getElementById('claimModalBody');
    if (!modal || !body) return;

    body.innerHTML = _renderLoading();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const payout = await _tryPassivePayout(user);
    const status = await getClaimStatus(user);

    if (!status) {
        body.innerHTML = _renderError(lang('claim_load_error'));
        return;
    }

    if (payout > 0) status._payoutBanner = payout;

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
    const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
    if (!user) return;

    const btn = document.getElementById('claimBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${lang('claim_claiming')}`;
    }

    try {
        const result = await performClaim(user);
        _showClaimSuccess(result);
        _applyClaimBtnVisual(false);

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

// Копировать реферальный код
window._copyRefCode = function(code) {
    navigator.clipboard.writeText(code).then(() => {
        const el = document.getElementById('refCodeCopyBtn');
        if (el) {
            const orig = el.innerHTML;
            el.innerHTML = '<i class="fas fa-check"></i>';
            el.style.color = '#34d399';
            setTimeout(() => {
                el.innerHTML = orig;
                el.style.color = '';
            }, 1500);
        }
    }).catch(() => {});
};

// FAQ
window._toggleFaq = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
};

// Показать/скрыть список топ-рефералов
window._toggleTopRefs = function() {
    const wrap = document.getElementById('topRefsWrap');
    const btn  = document.getElementById('topRefsToggleBtn');
    if (!wrap || !btn) return;

    const expanded = wrap.getAttribute('data-expanded') === '1';
    wrap.setAttribute('data-expanded', expanded ? '0' : '1');

    wrap.querySelectorAll('[data-top-ref-item]').forEach((el, idx) => {
        el.style.display = (!expanded || idx < 3) ? 'flex' : 'none';
    });

    btn.textContent = expanded
        ? (getCurrentUILang() === 'ru' ? 'Показать все' : 'Show all')
        : (getCurrentUILang() === 'ru' ? 'Свернуть' : 'Collapse');
};

// ─────────────────────────────────────────────────────────────────
// РЕНДЕР
// ─────────────────────────────────────────────────────────────────

function _renderLoading() {
    return `
        <div class="text-center py-16">
            <div class="text-5xl mb-4 animate-pulse">🧪</div>
            <p class="text-slate-400">${lang('claim_loading')}</p>
        </div>
    `;
}

function _renderError(msg) {
    return `
        <div class="text-center py-12">
            <div class="text-4xl mb-3">⚠️</div>
            <p class="text-red-400 mb-4">${msg}</p>
            <button onclick="closeClaimModal()" class="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                ${lang('claim_error_close')}
            </button>
        </div>
    `;
}

function _renderClaimUI(status) {
    const {
        canClaim, streak, newStreak, reagents, reward, streakBroken,
        nextMilestone, passiveInfo, bestStreak, referralCode, _payoutBanner
    } = status;

    const prevMilestone = nextMilestone.days - 30 < 0 ? 0 : nextMilestone.days - 30;
    const progressPct = Math.min(
        Math.round(((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100),
        100
    );

    const weekDays = _buildWeekDays(status);
    const nextBonusPreview = calcReward(nextMilestone.days).bonus;

    const leftCol = `
    <div class="claim-left-col">

        <div class="col-header">
            <span class="text-lg">🧪</span>
            <div style="flex:1">
                <div class="text-sm font-bold text-white">${lang('claim_title')}</div>
                <div class="text-xs text-slate-500">${lang('claim_updated_utc')}</div>
            </div>
            <button onclick="_toggleFaq('faqStreak')"
                class="claim-faq-btn"
                title="FAQ">i</button>
        </div>

        <div id="faqStreak" style="display:none" class="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl text-xs text-slate-300 leading-relaxed">
            ${faqText('streak')}
        </div>

        ${_payoutBanner ? `
        <div class="mb-3 p-3 bg-emerald-900/25 border border-emerald-600/40 rounded-xl flex items-center gap-2.5">
            <span class="text-xl">✨</span>
            <div>
                <div class="text-xs font-bold text-emerald-400">${getCurrentUILang() === 'ru' ? 'Начислено от рефералов!' : 'Referral payout received!'}</div>
                <div class="text-xs text-slate-400">+${_payoutBanner} RGT</div>
            </div>
        </div>` : ''}

        <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_balance_label')}</div>
                <div class="mini-value text-cyan-400">${reagents}</div>
                <div class="mini-unit">${lang('reagents_rgt_unit')}</div>
            </div>
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_streak_label')}</div>
                <div class="mini-value text-orange-400">${streak}</div>
                <div class="mini-unit">🔥 ${getCurrentUILang() === 'ru' ? 'дн.' : 'd.'}</div>
            </div>
            <div class="claim-mini-card" title="${getCurrentUILang() === 'ru' ? 'Лучший стрик за всё время' : 'Best streak ever'}">
                <div class="mini-label">${getCurrentUILang() === 'ru' ? 'Рекорд 🏆' : 'Record 🏆'}</div>
                <div class="mini-value text-yellow-400">${Math.max(bestStreak || 0, streak)}</div>
                <div class="mini-unit">${getCurrentUILang() === 'ru' ? 'дн.' : 'd.'}</div>
            </div>
        </div>

        ${streakBroken ? `
        <div class="mb-3 p-3 bg-red-900/25 border border-red-700/40 rounded-xl text-center">
            <div class="text-2xl mb-1">💔</div>
            <div class="text-red-400 text-sm font-bold">${lang('claim_streak_broken_title')}</div>
            <div class="text-slate-400 text-xs mt-0.5">${lang('claim_streak_broken_desc')}</div>
        </div>` : ''}

        <div class="mb-4">
            <div class="text-xs text-slate-500 mb-2 uppercase tracking-wide text-center">${lang('claim_week_progress')}</div>
            <div class="flex justify-between gap-1">${weekDays}</div>
        </div>

        <div class="mb-4 p-3 bg-slate-800/50 border border-slate-700/30 rounded-xl">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-slate-400">🎯 ${lang('claim_until_bonus').replace('{days}', nextMilestone.days)}</span>
                <span class="text-xs font-bold text-cyan-400">${lang('claim_days_left').replace('{days}', nextMilestone.daysLeft)}</span>
            </div>
            <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all" style="width:${progressPct}%"></div>
            </div>
            <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-slate-600">${progressPct}%</span>
                <div class="flex items-center gap-1.5">
                    <div class="claim-counter-box claim-counter-cyan">
                        <span class="claim-counter-num">${nextMilestone.daysLeft}</span>
                        <span class="claim-counter-label">${getCurrentUILang() === 'ru' ? 'дн. до бонуса' : 'days left'}</span>
                    </div>
                    <div class="claim-counter-box claim-counter-gold">
                        <span class="claim-counter-num-sm">+${nextBonusPreview}</span>
                        <span class="claim-counter-label">RGT bonus</span>
                    </div>
                </div>
            </div>
        </div>

        ${canClaim ? `
        <div class="mb-3 p-3 bg-cyan-900/15 border border-cyan-700/25 rounded-xl text-center">
            <div class="text-xs text-slate-400 mb-1">${lang('claim_today_reward')}</div>
            <div class="text-3xl font-black text-cyan-400">+${reward.total}</div>
            <div class="text-sm text-slate-400">${lang('reagents_rgt_unit')}</div>
            ${reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/15 text-yellow-400 rounded-full border border-yellow-500/30 text-xs">
                ⭐ +${reward.bonus} ${reward.label}
            </div>` : ''}
            ${newStreak > streak ? `
            <div class="text-xs text-slate-400 mt-1.5">
                ${lang('claim_streak_will_be')} <span class="text-orange-400 font-bold">${newStreak} 🔥</span>
            </div>` : ''}
        </div>
        <button id="claimBtn" onclick="window.doClaim()"
            class="w-full py-4 rounded-xl text-base font-black transition-all
                   bg-gradient-to-r from-cyan-500 to-blue-600
                   hover:from-cyan-400 hover:to-blue-500
                   text-white shadow-lg shadow-cyan-500/20
                   hover:scale-[1.02] active:scale-[0.98]
                   flex items-center justify-center gap-2">
            <span class="text-xl">🧪</span> ${lang('claim_get_btn')}
        </button>
        ` : `
        <div class="p-3 bg-emerald-900/15 border border-emerald-700/25 rounded-xl text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-check text-xl text-emerald-400"></i>
            </div>
            <div class="text-emerald-400 font-black text-base mb-1">${lang('claim_already_title')}</div>
            <div class="text-slate-400 text-sm mb-1">${lang('claim_next_at')} <span class="text-white font-bold">00:00 UTC</span></div>
            <div class="text-xs text-slate-500 font-mono">${_getTimeToMidnightUTC()}</div>
        </div>`}

        <div class="mt-4 pt-4 border-t border-slate-700/40">
            <div class="text-xs font-semibold text-slate-400 mb-2 text-center">${lang('claim_rewards_table')}</div>
            <div class="grid grid-cols-2 gap-1.5">
                ${REAGENTS_CONFIG.streakBonuses.map(sb => `
                <div class="flex items-center justify-between px-2.5 py-2 rounded-lg
                            ${streak >= sb.days ? 'bg-emerald-900/20 border border-emerald-700/30' : 'bg-slate-800/30 border border-slate-700/20'}">
                    <span class="text-xs ${streak >= sb.days ? 'text-emerald-400' : 'text-slate-400'}">
                        ${streak >= sb.days ? '✅' : '🔒'} ${sb.days}${getCurrentUILang() === 'ru' ? ' д.' : ' d.'}
                    </span>
                    <span class="text-xs font-bold ${streak >= sb.days ? 'text-yellow-400' : 'text-slate-500'}">+${sb.bonus}</span>
                </div>`).join('')}
            </div>
            <div class="mt-2 text-center text-xs text-slate-600">${lang('claim_after_60')}</div>
        </div>
    </div>`;

    const rightCol = _renderPassiveBlock(passiveInfo, referralCode);

    return `
    <div class="claim-scroll-area">
        <div class="claim-two-col">
            ${leftCol}
            <div class="claim-divider"></div>
            <div class="claim-right-col">${rightCol}</div>
        </div>
    </div>
    <div class="px-4 pb-4 pt-2 border-t border-white/5">
        <button onclick="closeClaimModal()"
            class="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-xl
                   text-slate-400 hover:text-white transition-colors text-sm font-medium">
            ${lang('claim_close_btn')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ПРАВАЯ КОЛОНКА
// ─────────────────────────────────────────────────────────────────

function _renderPassiveBlock(passiveInfo, referralCode) {
    if (!passiveInfo) return '<div class="p-4 text-slate-500 text-sm text-center">—</div>';

    const { referralEarnings, invitedCount, lastPayout, lastPayoutAt, referralDetails } = passiveInfo;
    const levels = REAGENTS_CONFIG.referralLevels;

    let lastPayoutStr = '—';
    if (lastPayoutAt) {
        try {
            lastPayoutStr = new Date(lastPayoutAt).toLocaleDateString('ru-RU', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        } catch(e) {
            lastPayoutStr = lastPayoutAt.substring(0, 10);
        }
    }

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentActive = (referralDetails || []).filter(ref => {
        if (!ref.lastClaimAt) return false;
        try { return new Date(ref.lastClaimAt).getTime() > sevenDaysAgo; }
        catch(e) { return false; }
    }).length;

    const topRefs = [...(referralDetails || [])]
        .sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0))
        .slice(0, 50);

    const dayLabels = [];
    const dayAmounts = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setUTCDate(d.getUTCDate() - i);
        const dayStr = getUTCDateString(d);
        dayLabels.push(['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getUTCDay()]);
        let amount = 0;
        for (const ref of (referralDetails || [])) {
            if (!ref.lastClaimAt) continue;
            try {
                const refDay = getUTCDateString(new Date(ref.lastClaimAt));
                if (refDay === dayStr) amount += (ref.lastAmount || 0);
            } catch(e) {}
        }
        dayAmounts.push(amount);
    }

    const maxAmount = Math.max(...dayAmounts, 1);

    const chartBars = dayLabels.map((label, i) => {
        const pct = Math.round((dayAmounts[i] / maxAmount) * 100);
        const isToday = i === 6;
        return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:0">
            <div style="font-size:9px;color:${dayAmounts[i] > 0 ? '#34d399' : '#475569'};font-weight:600;min-height:12px">
                ${dayAmounts[i] > 0 ? '+' + dayAmounts[i] : ''}
            </div>
            <div style="width:100%;background:rgba(30,41,59,0.8);border-radius:4px;height:44px;display:flex;align-items:flex-end;overflow:hidden">
                <div style="width:100%;height:${Math.max(pct, 4)}%;background:${isToday ? 'linear-gradient(180deg,#22d3ee,#3b82f6)' : 'rgba(52,211,153,0.4)'};border-radius:3px;transition:height 0.3s"></div>
            </div>
            <div style="font-size:9px;color:${isToday ? '#67e8f9' : '#475569'}">${label}</div>
        </div>`;
    }).join('');

    return `
    <div class="col-header">
        <span class="text-lg">👥</span>
        <div style="flex:1">
            <div class="text-sm font-bold text-white">${lang('passive_income_title')}</div>
            <div class="text-xs text-slate-500">MLM · 3 levels</div>
        </div>
        <button onclick="_toggleFaq('faqReferral')" class="claim-faq-btn" title="FAQ">i</button>
    </div>

    <div id="faqReferral" style="display:none" class="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl text-xs leading-relaxed">
        ${faqText('referral')}
    </div>

    <!-- Реферальный код перенесён вправо -->
    <div class="mb-3 p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl">
        <div class="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
            🔗 <span>${getCurrentUILang() === 'ru' ? 'Ваш реферальный код' : 'Your referral code'}</span>
        </div>
        <div class="flex items-center gap-2">
            <div style="flex:1;background:rgba(15,23,42,0.6);border:1px solid rgba(99,179,237,0.2);border-radius:8px;padding:7px 12px;font-family:monospace;font-size:14px;font-weight:700;color:#22d3ee;letter-spacing:0.05em;min-width:0;overflow:hidden;text-overflow:ellipsis">
                ${referralCode || '—'}
            </div>
            <button id="refCodeCopyBtn" onclick="_copyRefCode('${referralCode || ''}')"
                style="width:34px;height:34px;border-radius:8px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);color:#67e8f9;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all 0.2s;flex-shrink:0"
                title="${getCurrentUILang() === 'ru' ? 'Скопировать' : 'Copy'}">
                <i class="fas fa-copy"></i>
            </button>
        </div>
        <div class="text-xs text-slate-600 mt-1.5">
            ${getCurrentUILang() === 'ru'
                ? `Приглашённый получит +${REAGENTS_CONFIG.referralBonus} RGT, вы — +${REAGENTS_CONFIG.referralInviter} RGT`
                : `Invited user gets +${REAGENTS_CONFIG.referralBonus} RGT, you get +${REAGENTS_CONFIG.referralInviter} RGT`}
        </div>
    </div>

    <div class="grid grid-cols-3 gap-1.5 mb-3">
        <div class="claim-mini-card">
            <div class="mini-value text-cyan-400">${invitedCount}</div>
            <div class="mini-label">${lang('passive_invited')}</div>
        </div>
        <div class="claim-mini-card">
            <div class="mini-value text-blue-400">${recentActive}</div>
            <div class="mini-label">${getCurrentUILang() === 'ru' ? 'Активны<br>7 дн.' : 'Active<br>7 d.'}</div>
        </div>
        <div class="claim-mini-card">
            <div class="mini-value text-emerald-400">${referralEarnings}</div>
            <div class="mini-label">${lang('passive_total_earned')}</div>
        </div>
    </div>

    <div class="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl mb-3">
        <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs text-slate-300 font-medium">💰 ${getCurrentUILang() === 'ru' ? 'Всего от рефералов' : 'Total from referrals'}</span>
            <span class="text-sm font-black text-emerald-400">+${referralEarnings} RGT</span>
        </div>
        ${lastPayout > 0 ? `
        <div class="flex items-center justify-between pt-1.5 border-t border-slate-700/30">
            <span class="text-xs text-slate-500">${getCurrentUILang() === 'ru' ? 'Посл. начисление' : 'Last payout'} ${lastPayoutStr}</span>
            <span class="text-xs text-emerald-500 font-medium">+${lastPayout} RGT</span>
        </div>` : `
        <div class="text-xs text-slate-600 text-center">${getCurrentUILang() === 'ru' ? 'Начисления появятся когда рефералы сделают клейм' : 'Payouts will appear after referrals claim'}</div>`}
    </div>

    <div class="mb-3 p-3 bg-slate-800/30 border border-slate-700/25 rounded-xl">
        <div class="text-xs text-slate-400 font-medium mb-2">📊 ${getCurrentUILang() === 'ru' ? 'Доход за 7 дней' : 'Income for 7 days'}</div>
        <div style="display:flex;gap:4px;align-items:flex-end">
            ${chartBars}
        </div>
    </div>

    ${topRefs.length > 0 ? `
    <div class="mb-3">
        <div class="flex items-center justify-between mb-1.5 gap-2">
            <div class="text-xs text-slate-400 font-medium">🏆 ${getCurrentUILang() === 'ru' ? 'Топ рефералов' : 'Top referrals'}</div>
            ${topRefs.length > 3 ? `
            <button id="topRefsToggleBtn" onclick="_toggleTopRefs()" class="text-[11px] text-cyan-400 hover:text-white transition-colors">
                ${getCurrentUILang() === 'ru' ? 'Показать все' : 'Show all'}
            </button>` : ''}
        </div>

        <div class="space-y-1" id="topRefsWrap" data-expanded="0">
            ${topRefs.map((ref, idx) => {
                let timeStr = '';
                if (ref.lastClaimAt) {
                    try {
                        const diff = Date.now() - new Date(ref.lastClaimAt).getTime();
                        if (diff < 3600000) timeStr = Math.floor(diff / 60000) + (getCurrentUILang() === 'ru' ? ' мин' : ' min');
                        else if (diff < 86400000) timeStr = Math.floor(diff / 3600000) + (getCurrentUILang() === 'ru' ? ' ч' : ' h');
                        else timeStr = Math.floor(diff / 86400000) + (getCurrentUILang() === 'ru' ? ' дн' : ' d');
                    } catch(e) {}
                }

                const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];

                return `
                <div data-top-ref-item style="display:${idx < 3 ? 'flex' : 'none'}" class="items-center justify-between px-2.5 py-1.5 bg-slate-800/50 rounded-lg">
                    <div class="flex items-center gap-1.5 min-w-0">
                        <span style="font-size:13px;flex-shrink:0">${medals[idx] || '•'}</span>
                        <span class="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold flex-shrink-0">Ур.${ref.level}</span>
                        <span class="text-xs text-slate-500 font-mono truncate">${ref.uid.substring(0, 8)}…</span>
                    </div>
                    <div class="flex items-center gap-1.5 flex-shrink-0">
                        ${timeStr ? `<span class="text-xs text-slate-600">${timeStr}</span>` : ''}
                        <span class="text-xs text-emerald-400 font-bold">+${ref.totalAmount || ref.lastAmount}</span>
                    </div>
                </div>`;
            }).join('')}
        </div>
    </div>
    ` : `
    <div class="mb-3 py-4 bg-slate-800/20 rounded-xl border border-dashed border-slate-700/40 text-center">
        <div class="text-2xl mb-1">🔗</div>
        <div class="text-xs text-slate-500">
            ${getCurrentUILang() === 'ru'
                ? 'Пригласи рефералов —<br>их клеймы приносят доход'
                : 'Invite referrals —<br>their claims bring you income'}
        </div>
    </div>`}

    <div class="text-xs text-slate-500 mb-2 text-center font-medium">${lang('passive_levels_title')}</div>
    <div class="grid grid-cols-3 gap-1.5">
        ${levels.map(lv => `
        <div class="p-2 rounded-xl bg-slate-800/40 border border-slate-700/30 text-center">
            <div class="text-base font-black text-cyan-400">${lv.percent}%</div>
            <div class="text-xs text-slate-500">${lang('passive_level')} ${lv.level}</div>
        </div>`).join('')}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// УСПЕХ
// ─────────────────────────────────────────────────────────────────

function _showClaimSuccess(result) {
    const body = document.getElementById('claimModalBody');
    if (!body) return;

    body.innerHTML = `
    <div class="p-6 text-center">
        <div class="relative w-20 h-20 mx-auto mb-4">
            <div class="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
            <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30
                        border-2 border-cyan-400/50 flex items-center justify-center text-3xl">🧪</div>
        </div>

        <h3 class="text-2xl font-black text-white mb-1">${lang('claim_success_title')}</h3>
        ${result.streakBroken ? `<div class="text-sm text-red-400 mb-3">${lang('claim_streak_reset')}</div>` : ''}

        <div class="bg-slate-800/50 rounded-xl p-4 mb-4">
            <div class="text-xs text-slate-500 mb-1">${lang('claim_credited')}</div>
            <div class="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">+${result.reward.total}</div>
            <div class="text-slate-400 text-sm">${lang('claim_reagents_unit')}</div>
            ${result.reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
                <i class="fas fa-star"></i> ${result.reward.label} — +${result.reward.bonus} ${lang('reagents_rgt_unit')}!
            </div>` : ''}
        </div>

        <div class="bg-slate-800/30 rounded-xl p-3 mb-4 text-left">
            <div class="text-xs text-slate-500 mb-2">${lang('passive_credited_to_upstream')}</div>
            ${REAGENTS_CONFIG.referralLevels.map(lv => {
                const reward = roundReward(result.reward.total * lv.percent / 100);
                return `
                <div class="flex items-center justify-between text-xs py-1 border-b border-slate-700/30 last:border-0">
                    <span class="text-slate-400">${lang('passive_level')} ${lv.level} <span class="text-slate-600">(${lv.percent}%)</span></span>
                    <span class="text-emerald-400 font-medium">+${reward} ${lang('reagents_rgt_unit')}</span>
                </div>`;
            }).join('')}
        </div>

        <div class="grid grid-cols-4 gap-2 mb-4">
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-base font-black text-cyan-400">${result.newReagents}</div>
                <div class="text-xs text-slate-500">${lang('claim_balance_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-base font-black text-orange-400">${result.newStreak}🔥</div>
                <div class="text-xs text-slate-500">${lang('claim_streak_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-base font-black text-yellow-400">${result.bestStreak || result.newStreak}🏆</div>
                <div class="text-xs text-slate-500">${getCurrentUILang() === 'ru' ? 'Рекорд' : 'Record'}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-base font-black text-emerald-400">${result.nextMilestone.daysLeft}</div>
                <div class="text-xs text-slate-500">${lang('claim_to_bonus_short')}</div>
            </div>
        </div>

        <div class="text-xs text-slate-500 mb-4">
            ${lang('claim_next_claim')} <span class="text-white font-medium">00:00 UTC</span> · ${_getTimeToMidnightUTC()}
        </div>

        <button onclick="closeClaimModal()"
            class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white transition-all">
            ${lang('claim_great_btn')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ВСПОМОГАТЕЛЬНЫЕ UI
// ─────────────────────────────────────────────────────────────────

function _buildWeekDays(status) {
    const { streak, lastClaim } = status;
    const dayKeys = ['week_mon','week_tue','week_wed','week_thu','week_fri','week_sat','week_sun'];
    const todayUTCDay = new Date().getUTCDay();
    const todayIdx = (todayUTCDay + 6) % 7;

    return dayKeys.map((key, i) => {
        const dayLabel = lang(key);
        let state = 'future';

        if (i < todayIdx) state = streak > (todayIdx - i) ? 'done' : 'missed';
        if (i === todayIdx) state = lastClaim === getUTCDateString() ? 'today-done' : 'today';

        const colors = {
            'done':       'bg-emerald-500/25 border-emerald-500/50 text-emerald-400',
            'today':      'bg-cyan-500/20 border-cyan-400 text-cyan-400 ring-2 ring-cyan-400/30',
            'today-done': 'bg-emerald-500/25 border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/30',
            'missed':     'bg-red-500/10 border-red-700/30 text-red-500',
            'future':     'bg-slate-800/40 border-slate-700/30 text-slate-600',
        };

        const icons = {
            'done': '✓',
            'today': '🧪',
            'today-done': '✓',
            'missed': '✗',
            'future': dayLabel.charAt(0).toUpperCase()
        };

        return `
        <div class="flex flex-col items-center gap-1">
            <div class="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold ${colors[state]}">${icons[state]}</div>
            <span class="text-[10px] text-slate-500">${dayLabel}</span>
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
// МОДАЛКА + СТИЛИ
// ─────────────────────────────────────────────────────────────────

function _ensureClaimModal() {
    if (document.getElementById('claimModal')) return;

    const modal = document.createElement('div');
    modal.id = 'claimModal';
    modal.className = 'claim-modal-overlay';
    modal.innerHTML = `
        <div class="claim-modal-box">
            <div class="claim-modal-header">
                <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(59,130,246,0.2));border:1px solid rgba(6,182,212,0.3);display:flex;align-items:center;justify-content:center;font-size:18px">🧪</div>
                    <div>
                        <div class="font-bold text-white text-sm" id="claimModalTitle">${lang('claim_title')}</div>
                        <div class="text-xs text-slate-500" id="claimModalSubtitle">${lang('claim_updated_utc')}</div>
                    </div>
                </div>
                <button onclick="closeClaimModal()"
                    style="width:32px;height:32px;border-radius:8px;background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;transition:all 0.2s"
                    onmouseover="this.style.background='rgba(51,65,85,0.8)';this.style.color='white'"
                    onmouseout="this.style.background='rgba(30,41,59,0.8)';this.style.color='#94a3b8'">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>
            <div id="claimModalBody"></div>
        </div>`;
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
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            padding: 12px;
        }
        .claim-modal-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        .claim-modal-box {
            background: linear-gradient(145deg,#171f30 0%,#0c1220 100%);
            border: 1px solid rgba(99,179,237,0.1);
            border-radius: 20px;
            width: 100%;
            max-width: 860px;
            max-height: calc(100vh - 24px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px) scale(0.97);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,179,237,0.04);
        }
        .claim-modal-overlay.active .claim-modal-box {
            transform: translateY(0) scale(1);
        }

        .claim-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            flex-shrink: 0;
        }

        .claim-scroll-area {
            overflow-y: auto;
            overflow-x: hidden;
            min-height: 0;
            flex: 1;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-scroll-area::-webkit-scrollbar {
            width: 4px;
        }
        .claim-scroll-area::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 2px;
        }

        .claim-two-col {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
            gap: 0;
            min-height: 0;
        }

        .claim-left-col,
        .claim-right-col {
            padding: 16px 18px;
            min-width: 0;
        }

        .claim-divider {
            background: rgba(255,255,255,0.05);
            width: 1px;
            min-height: 100%;
        }

        .claim-mini-card {
            background: rgba(30,40,60,0.55);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 10px 8px;
            text-align: center;
            transition: border-color 0.2s;
            min-width: 0;
        }
        .claim-mini-card:hover {
            border-color: rgba(99,179,237,0.2);
        }

        .mini-value {
            font-size: 20px;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 3px;
        }
        .mini-label {
            font-size: 10px;
            color: #64748b;
            line-height: 1.3;
        }
        .mini-unit {
            font-size: 10px;
            color: #475569;
            margin-top: 2px;
        }

        .col-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .claim-faq-btn {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: rgba(99,179,237,0.1);
            border: 1px solid rgba(99,179,237,0.25);
            color: #67e8f9;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.2s;
        }

        .claim-counter-box {
            border-radius: 8px;
            padding: 3px 10px;
            text-align: center;
        }
        .claim-counter-cyan {
            background: rgba(6,182,212,0.12);
            border: 1px solid rgba(6,182,212,0.25);
        }
        .claim-counter-gold {
            background: rgba(251,191,36,0.12);
            border: 1px solid rgba(251,191,36,0.25);
        }
        .claim-counter-num {
            font-size: 16px;
            font-weight: 900;
            color: #22d3ee;
            line-height: 1;
            display: block;
        }
        .claim-counter-num-sm {
            font-size: 14px;
            font-weight: 900;
            color: #fbbf24;
            line-height: 1;
            display: block;
        }
        .claim-counter-label {
            font-size: 9px;
            color: #64748b;
            display: block;
            margin-top: 1px;
        }

        @media (max-width: 768px) {
            .claim-modal-box {
                max-width: 100%;
                max-height: calc(100vh - 16px);
                border-radius: 16px;
            }

            .claim-two-col {
                grid-template-columns: 1fr;
            }

            .claim-divider {
                width: 100%;
                height: 1px;
                min-height: 1px;
            }

            .claim-left-col,
            .claim-right-col {
                padding: 14px;
            }
        }

        @media (max-width: 480px) {
            .claim-modal-overlay {
                padding: 8px;
                align-items: stretch;
            }

            .claim-modal-box {
                max-height: calc(100vh - 16px);
                border-radius: 14px;
            }

            .claim-modal-header {
                padding: 14px 14px 12px;
            }

            .mini-value {
                font-size: 18px;
            }

            .claim-counter-num {
                font-size: 14px;
            }

            .claim-counter-num-sm {
                font-size: 13px;
            }
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
        btn.title = lang('claim_btn_tooltip_available');
        btn.innerHTML =
            '<span class="text-base">🧪</span>' +
            '<span class="hidden sm:inline font-medium text-xs">' + lang('claim_btn_label') + '</span>' +
            '<span id="claimDot" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>';
    } else {
        function getMsToMidnightUTC() {
            var midnight = new Date();
            midnight.setUTCHours(24,0,0,0);
            return midnight - new Date();
        }

        function formatTime(ms) {
            if (ms <= 0) return '00:00:00';
            var s = Math.floor(ms / 1000);
            return [
                Math.floor(s / 3600),
                Math.floor((s % 3600) / 60),
                s % 60
            ].map(function(v) {
                return String(v).padStart(2,'0');
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
                'rounded-xl text-sm transition-all duration-300 cursor-default'
            ].join(' ');
            btn.title = lang('claim_btn_tooltip_cooldown');
            btn.innerHTML =
                '<span class="text-base" style="opacity:0.4">🧪</span>' +
                '<div class="hidden sm:flex flex-col items-start leading-none gap-0.5">' +
                    '<span style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">' + lang('claim_reset_in') + '</span>' +
                    '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c">' + timeStr + '</span>' +
                '</div>' +
                '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c" class="sm:hidden">' + timeStr + '</span>';
        }

        renderCooldown();
        _claimCountdownInterval = setInterval(renderCooldown, 1000);
    }
}

window._applyClaimBtnVisual = _applyClaimBtnVisual;

// ─────────────────────────────────────────────────────────────────
// ПЕРЕВОДЫ / АВТОПРОВЕРКА / ЭКСПОРТ
// ─────────────────────────────────────────────────────────────────

function _updateClaimTranslations() {
    const titleEl = document.getElementById('claimModalTitle');
    if (titleEl) titleEl.textContent = lang('claim_title');

    const subtitleEl = document.getElementById('claimModalSubtitle');
    if (subtitleEl) subtitleEl.textContent = lang('claim_updated_utc');

    const btn = document.getElementById('headerClaimBtn');
    if (btn) {
        const isAvailable = btn.getAttribute('data-claim-available') === '1';
        _applyClaimBtnVisual(isAvailable);
    }
}

document.addEventListener('languageChanged', _updateClaimTranslations);

async function _checkClaimOnLoad() {
    var attempts = 0;
    while ((!window.auth || !window.auth.currentUser) && attempts < 20) {
        await new Promise(function(r){ setTimeout(r, 500); });
        attempts++;
    }

    var user = (window.auth && window.auth.currentUser) || window.currentUser;
    if (!user) return;

    var status = await getClaimStatus(user);
    if (!status) return;

    _applyClaimBtnVisual(status.canClaim);
}

window.ReagentsSystem = {
    getClaimStatus,
    performClaim,
    getUTCDateString,
    calcReward,
    getNextMilestone,
    getPassiveRewardInfo,
    CONFIG: REAGENTS_CONFIG
};

window.openClaimModal  = window.openClaimModal;
window.closeClaimModal = window.closeClaimModal;
window.doClaim         = window.doClaim;

console.log('🧪 Reagents System v2.2 loaded');

setTimeout(_checkClaimOnLoad, 2000);
setTimeout(_checkClaimOnLoad, 5000);

})();
