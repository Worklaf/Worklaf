/**
 * ============================================
 * AirdropLab Reagents System v2.0
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

function getUTCDateString(date) {
    const d = date || new Date();
    return d.getUTCFullYear() + '-' +
           String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
           String(d.getUTCDate()).padStart(2, '0');
}

function getUTCWeekString(date) {
    const d = date || new Date();
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getUTCDay() + 1) / 7);
    return d.getUTCFullYear() + '-W' + String(weekNum).padStart(2, '0');
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
        bonusKey = '';
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
// ОСНОВНАЯ ЛОГИКА КЛЕЙМА
// ─────────────────────────────────────────────────────────────────

async function getClaimStatus(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return null;
    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        let data = {};
        if (!snap.exists()) {
            data = { reagents: 0, streak: 0, lastClaimDate: '', invitedBy: '', invitedCount: 0, pendingPassive: 0, passiveLog: {}, referralEarnings: 0 };
        } else {
            data = snap.data();
        }

        console.log('[Reagents] getClaimStatus raw data:', { reagents: data.reagents, streak: data.streak, lastClaimDate: data.lastClaimDate, invitedBy: data.invitedBy, pendingPassive: data.pendingPassive, passiveLog: data.passiveLog });

        const todayUTC = getUTCDateString();
        const lastClaim = data.lastClaimDate || '';
        const streak = data.streak || 0;
        const reagents = data.reagents || 0;
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

        const reward = calcReward(newStreak);
        const passiveInfo = await getPassiveRewardInfo(user, data);

        return { canClaim, streak, newStreak, reagents, lastClaim, todayUTC, streakBroken, reward, nextMilestone: getNextMilestone(canClaim ? newStreak : streak), passiveInfo };
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
    let newReagents = status.reagents + status.reward.total;

    await exp.setDoc(exp.doc(db, 'users', user.uid), {
        reagents: newReagents, streak: status.newStreak,
        lastClaimDate: todayUTC, lastClaimAt: new Date().toISOString(),
    }, { merge: true });

    await _creditPassiveToUpstream(user, status.reward.total, exp, db);
    return { ...status, newReagents };
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
    return { bonusForMe: REAGENTS_CONFIG.referralBonus, bonusForInviter: REAGENTS_CONFIG.referralInviter };
};

function _generateCode(uid) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AL-';
    for (let i = 0; i < 6; i++) {
        code += chars[uid.charCodeAt(i % uid.length) % chars.length];
    }
    return code;
}

async function _creditPassiveToUpstream(claimUser, claimedAmount, exp, db) {
    try {
        const mySnap = await exp.getDoc(exp.doc(db, 'users', claimUser.uid), { source: 'server' });
        if (!mySnap.exists()) return;
        let currentData = mySnap.data();
        console.log('[Reagents] upstream start — invitedBy:', currentData.invitedBy, '| claimedAmount:', claimedAmount);

        for (const levelCfg of REAGENTS_CONFIG.referralLevels) {
            const upstreamUid = currentData.invitedBy;
            console.log(`[Reagents] Level ${levelCfg.level} — upstreamUid:`, upstreamUid);
            if (!upstreamUid) { console.log('[Reagents] Chain ended at level', levelCfg.level); break; }

            const upSnap = await exp.getDoc(exp.doc(db, 'users', upstreamUid), { source: 'server' });
            if (!upSnap.exists()) break;
            const upData = upSnap.data();

            const rawReward = claimedAmount * (levelCfg.percent / 100);
            const roundedReward = roundReward(rawReward);
            console.log(`[Reagents] Level ${levelCfg.level}: raw=${rawReward}, rounded=${roundedReward} → ${upstreamUid}`);

            if (roundedReward > 0) {
                const currentPending = upData.pendingPassive || 0;
                const existingLog = upData.passiveLog || {};
                const existingFromUser = existingLog[claimUser.uid] || {};
                await exp.setDoc(exp.doc(db, 'users', upstreamUid), {
                    pendingPassive: currentPending + roundedReward,
                    passiveLog: {
                        ...existingLog,
                        [claimUser.uid]: {
                            level: levelCfg.level, lastAmount: roundedReward,
                            totalAmount: (existingFromUser.totalAmount || 0) + roundedReward,
                            percent: levelCfg.percent, lastClaimAt: new Date().toISOString(),
                        }
                    }
                }, { merge: true });
                console.log(`[Reagents] ✅ Credited +${roundedReward} RGT to ${upstreamUid} (level ${levelCfg.level})`);
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
        console.log('[Reagents] _tryPassivePayout — pendingPassive:', pendingPassive);
        if (pendingPassive <= 0) return 0;
        const payout = Math.ceil(pendingPassive);
        await exp.setDoc(exp.doc(db, 'users', user.uid), {
            reagents: (data.reagents || 0) + payout,
            pendingPassive: 0,
            referralEarnings: (data.referralEarnings || 0) + payout,
            lastPassivePayoutAt: new Date().toISOString(),
            lastPassivePayout: payout,
        }, { merge: true });
        console.log(`[Reagents] ✅ Passive payout done: +${payout} RGT`);
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
                } catch(e) { console.warn('[Reagents] getPassiveRewardInfo freshSnap error:', e); }
            }
        }

        console.log('[Reagents] getPassiveRewardInfo freshData:', {
            pendingPassive: freshData.pendingPassive, referralEarnings: freshData.referralEarnings,
            invitedCount: freshData.invitedCount, lastPassivePayout: freshData.lastPassivePayout,
            lastPassivePayoutAt: freshData.lastPassivePayoutAt, passiveLog: freshData.passiveLog,
            invitedBy: freshData.invitedBy, referralCode: freshData.referralCode,
        });

        const pendingPassive = freshData.pendingPassive || 0;
        const referralEarnings = freshData.referralEarnings || 0;
        const invitedCount = freshData.invitedCount || 0;
        const lastPayout = freshData.lastPassivePayout || 0;
        const lastPayoutAt = freshData.lastPassivePayoutAt || '';
        const passiveLog = freshData.passiveLog || {};

        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const activeReferrals = Object.values(passiveLog).filter(info => {
            if (!info.lastClaimAt) return false;
            try { return new Date(info.lastClaimAt).getTime() > sevenDaysAgo; } catch(e) { return false; }
        }).length;

        const referralDetails = Object.entries(passiveLog).map(([uid, info]) => ({
            uid, level: info.level, lastAmount: info.lastAmount,
            totalAmount: info.totalAmount || info.lastAmount, percent: info.percent, lastClaimAt: info.lastClaimAt,
        }));

        console.log('[Reagents] passiveLog entries:', activeReferrals, referralDetails);

        return { pendingPassive: Math.round(pendingPassive * 10) / 10, referralEarnings, invitedCount, lastPayout, lastPayoutAt, activeReferrals, referralDetails, canPayoutNow: pendingPassive > 0 };
    } catch(err) {
        console.error('[Reagents] getPassiveRewardInfo error:', err);
        return { pendingPassive: 0, referralEarnings: 0, invitedCount: 0, lastPayout: 0, lastPayoutAt: '', activeReferrals: 0, referralDetails: [], canPayoutNow: false };
    }
}

// ─────────────────────────────────────────────────────────────────
// UI
// ─────────────────────────────────────────────────────────────────

window.openClaimModal = async function() {
    console.log('=== openClaimModal called ===');
    const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
    console.log('user:', user ? user.uid : 'NULL');

    if (!user) {
        if (typeof window.footerShowToast === 'function') window.footerShowToast(lang('claim_login_required'), 'error');
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
    console.log('payout result:', payout);

    const status = await getClaimStatus(user);
    console.log('status:', status);

    if (!status) { body.innerHTML = _renderError(lang('claim_load_error')); return; }

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
        if (balEl) balEl.innerHTML = result.newReagents + ` <span class="text-sm font-normal text-slate-400 ml-1">${lang('reagents_rgt_unit')}</span>`;
        const streakEl = document.getElementById('profileStreak');
        if (streakEl) streakEl.innerHTML = result.newStreak + ` <span class="text-xs font-normal text-slate-400">${lang('account_days_short')}</span>`;
        _updateHeaderReagents(result.newReagents);
    } catch(err) {
        const body = document.getElementById('claimModalBody');
        if (body) body.innerHTML = _renderError(err.message);
    }
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
    const { canClaim, streak, newStreak, reagents, reward, streakBroken, nextMilestone, passiveInfo } = status;

    const prevMilestone = nextMilestone.days - 30 < 0 ? 0 : nextMilestone.days - 30;
    const progressPct = Math.min(Math.round(((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100), 100);
    const weekDays = _buildWeekDays(status);

    // Левая колонка — клейм
    const leftCol = `
    <div class="claim-left-col">

        <!-- Заголовок левой колонки -->
        <div class="col-header">
            <span class="text-lg">🧪</span>
            <div>
                <div class="text-sm font-bold text-white">${lang('claim_title')}</div>
                <div class="text-xs text-slate-500">${lang('claim_updated_utc')}</div>
            </div>
        </div>

        <!-- Баланс и стрик -->
        <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_balance_label')}</div>
                <div class="mini-value text-cyan-400">${reagents}</div>
                <div class="mini-unit">${lang('reagents_rgt_unit')}</div>
            </div>
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_streak_label')}</div>
                <div class="mini-value text-orange-400">${streak}</div>
                <div class="mini-unit">🔥 ${lang('claim_days_unit')}</div>
            </div>
        </div>

        ${streakBroken ? `
        <div class="mb-3 p-3 bg-red-900/25 border border-red-700/40 rounded-xl text-center">
            <div class="text-2xl mb-1">💔</div>
            <div class="text-red-400 text-sm font-bold">${lang('claim_streak_broken_title')}</div>
            <div class="text-slate-400 text-xs mt-0.5">${lang('claim_streak_broken_desc')}</div>
        </div>
        ` : ''}

        <!-- Дни недели -->
        <div class="mb-4">
            <div class="text-xs text-slate-500 mb-2 uppercase tracking-wide text-center">${lang('claim_week_progress')}</div>
            <div class="flex justify-between gap-1">${weekDays}</div>
        </div>

        <!-- Прогресс до бонуса -->
        <div class="mb-4 p-3 bg-slate-800/50 border border-slate-700/30 rounded-xl">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-slate-400">🎯 ${lang('claim_until_bonus').replace('{days}', nextMilestone.days)}</span>
                <span class="text-xs font-bold text-cyan-400">${lang('claim_days_left').replace('{days}', nextMilestone.daysLeft)}</span>
            </div>
            <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style="width:${progressPct}%"></div>
            </div>
            <div class="text-right text-xs text-slate-600 mt-1">${progressPct}%</div>
        </div>

        ${canClaim ? `
        <!-- Награда -->
        <div class="mb-3 p-3 bg-cyan-900/15 border border-cyan-700/25 rounded-xl text-center">
            <div class="text-xs text-slate-400 mb-1">${lang('claim_today_reward')}</div>
            <div class="text-3xl font-black text-cyan-400">+${reward.total}</div>
            <div class="text-sm text-slate-400">${lang('reagents_rgt_unit')}</div>
            ${reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/15 text-yellow-400 rounded-full border border-yellow-500/30 text-xs">
                ⭐ +${reward.bonus} ${reward.label}
            </div>` : ''}
            ${newStreak > streak ? `
            <div class="text-xs text-slate-400 mt-1.5">${lang('claim_streak_will_be')} <span class="text-orange-400 font-bold">${newStreak} 🔥</span></div>
            ` : ''}
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
        <!-- Уже клеймил -->
        <div class="p-3 bg-emerald-900/15 border border-emerald-700/25 rounded-xl text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-check text-xl text-emerald-400"></i>
            </div>
            <div class="text-emerald-400 font-black text-base mb-1">${lang('claim_already_title')}</div>
            <div class="text-slate-400 text-sm mb-1">${lang('claim_next_at')} <span class="text-white font-bold">00:00 UTC</span></div>
            <div class="text-xs text-slate-500 font-mono">${_getTimeToMidnightUTC()}</div>
        </div>
        `}

        <!-- Таблица стрик бонусов -->
        <div class="mt-4 pt-4 border-t border-slate-700/40">
            <div class="text-xs font-semibold text-slate-400 mb-2 text-center">${lang('claim_rewards_table')}</div>
            <div class="grid grid-cols-2 gap-1.5">
                ${REAGENTS_CONFIG.streakBonuses.map(sb => `
                <div class="flex items-center justify-between px-2.5 py-2 rounded-lg
                            ${streak >= sb.days ? 'bg-emerald-900/20 border border-emerald-700/30' : 'bg-slate-800/30 border border-slate-700/20'}">
                    <span class="text-xs ${streak >= sb.days ? 'text-emerald-400' : 'text-slate-400'}">
                        ${streak >= sb.days ? '✅' : '🔒'} ${sb.days}${lang('claim_days_unit')}
                    </span>
                    <span class="text-xs font-bold ${streak >= sb.days ? 'text-yellow-400' : 'text-slate-500'}">+${sb.bonus}</span>
                </div>`).join('')}
            </div>
            <div class="mt-2 text-center text-xs text-slate-600">${lang('claim_after_60')}</div>
        </div>
    </div>`;

    // Правая колонка — рефералы
    const rightCol = _renderPassiveBlock(passiveInfo);

    return `
    <div class="claim-two-col">
        ${leftCol}
        <div class="claim-divider"></div>
        <div class="claim-right-col">
            ${rightCol}
        </div>
    </div>
    <div class="px-4 pb-4">
        <button onclick="closeClaimModal()"
            class="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-xl
                   text-slate-400 hover:text-white transition-colors text-sm font-medium">
            ${lang('claim_close_btn')}
        </button>
    </div>
    `;
}

function _renderPassiveBlock(passiveInfo) {
    if (!passiveInfo) return '<div class="p-4 text-slate-500 text-sm text-center">—</div>';

    const { referralEarnings, invitedCount, lastPayout, lastPayoutAt, activeReferrals, referralDetails } = passiveInfo;
    const levels = REAGENTS_CONFIG.referralLevels;

    let lastPayoutStr = '—';
    if (lastPayoutAt) {
        try {
            lastPayoutStr = new Date(lastPayoutAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch(e) { lastPayoutStr = lastPayoutAt.substring(0, 10); }
    }

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentActive = (referralDetails || []).filter(ref => {
        if (!ref.lastClaimAt) return false;
        try { return new Date(ref.lastClaimAt).getTime() > sevenDaysAgo; } catch(e) { return false; }
    }).length;

    return `
    <!-- Заголовок правой колонки -->
    <div class="col-header">
        <span class="text-lg">👥</span>
        <div>
            <div class="text-sm font-bold text-white">${lang('passive_income_title')}</div>
            <div class="text-xs text-slate-500">${lang('passive_levels_title')}</div>
        </div>
    </div>

    <!-- 3 плитки статистики -->
    <div class="grid grid-cols-3 gap-1.5 mb-3">
        <div class="claim-mini-card">
            <div class="mini-value text-cyan-400">${invitedCount}</div>
            <div class="mini-label">${lang('passive_invited')}</div>
        </div>
        <div class="claim-mini-card">
            <div class="mini-value text-blue-400">${recentActive}</div>
            <div class="mini-label">Активны<br>7 дн.</div>
        </div>
        <div class="claim-mini-card">
            <div class="mini-value text-emerald-400">${referralEarnings}</div>
            <div class="mini-label">${lang('passive_total_earned')}</div>
        </div>
    </div>

    <!-- Итого заработано -->
    <div class="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl mb-3">
        <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs text-slate-300 font-medium">💰 Всего от рефералов</span>
            <span class="text-sm font-black text-emerald-400">+${referralEarnings} RGT</span>
        </div>
        ${lastPayout > 0 ? `
        <div class="flex items-center justify-between pt-1.5 border-t border-slate-700/30">
            <span class="text-xs text-slate-500">Посл. начисление ${lastPayoutStr}</span>
            <span class="text-xs text-emerald-500 font-medium">+${lastPayout} RGT</span>
        </div>
        ` : `
        <div class="text-xs text-slate-600 text-center">Начисления появятся когда рефералы сделают клейм</div>
        `}
    </div>

    <!-- Список рефералов из лога -->
    ${referralDetails && referralDetails.length > 0 ? `
    <div class="mb-3">
        <div class="text-xs text-slate-500 mb-1.5">📋 Рефералы (принесли доход)</div>
        <div class="space-y-1 max-h-36 overflow-y-auto pr-0.5">
            ${referralDetails.map(ref => {
                let timeStr = '';
                if (ref.lastClaimAt) {
                    try {
                        const diff = Date.now() - new Date(ref.lastClaimAt).getTime();
                        if (diff < 3600000)      timeStr = Math.floor(diff/60000) + ' мин';
                        else if (diff < 86400000) timeStr = Math.floor(diff/3600000) + ' ч';
                        else                       timeStr = Math.floor(diff/86400000) + ' дн';
                    } catch(e) {}
                }
                return `
                <div class="flex items-center justify-between px-2.5 py-1.5 bg-slate-800/50 rounded-lg">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">Ур.${ref.level}</span>
                        <span class="text-xs text-slate-500 font-mono">${ref.uid.substring(0, 8)}…</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        ${timeStr ? `<span class="text-xs text-slate-600">${timeStr} назад</span>` : ''}
                        <span class="text-xs text-emerald-400 font-bold">+${ref.totalAmount || ref.lastAmount}</span>
                    </div>
                </div>`;
            }).join('')}
        </div>
    </div>
    ` : `
    <div class="mb-3 py-4 bg-slate-800/20 rounded-xl border border-dashed border-slate-700/40 text-center">
        <div class="text-2xl mb-1">🔗</div>
        <div class="text-xs text-slate-500">Пригласи рефералов —<br>их клеймы приносят доход</div>
    </div>
    `}

    <!-- Таблица процентов уровней -->
    <div class="text-xs text-slate-500 mb-2 text-center font-medium">${lang('passive_levels_title')}</div>
    <div class="grid grid-cols-3 gap-1.5">
        ${levels.map(lv => `
        <div class="p-2 rounded-xl bg-slate-800/40 border border-slate-700/30 text-center">
            <div class="text-base font-black text-cyan-400">${lv.percent}%</div>
            <div class="text-xs text-slate-500">${lang('passive_level')} ${lv.level}</div>
        </div>`).join('')}
    </div>
    `;
}

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

        <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-lg font-black text-cyan-400">${result.newReagents}</div>
                <div class="text-xs text-slate-500">${lang('claim_balance_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-lg font-black text-orange-400">${result.newStreak}🔥</div>
                <div class="text-xs text-slate-500">${lang('claim_streak_short')}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-lg font-black text-emerald-400">${result.nextMilestone.daysLeft}</div>
                <div class="text-xs text-slate-500">${lang('claim_to_bonus_short')}</div>
            </div>
        </div>

        <div class="text-xs text-slate-500 mb-4">
            ${lang('claim_next_claim')} <span class="text-white font-medium">00:00 UTC</span> · ${_getTimeToMidnightUTC()}
        </div>

        <button onclick="closeClaimModal()"
            class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500
                   rounded-xl font-bold text-white transition-all">
            ${lang('claim_great_btn')}
        </button>
    </div>
    `;
}

function _buildWeekDays(status) {
    const { streak, lastClaim } = status;
    const dayKeys = ['week_mon','week_tue','week_wed','week_thu','week_fri','week_sat','week_sun'];
    const todayUTCDay = new Date().getUTCDay();
    const todayIdx = (todayUTCDay + 6) % 7;

    return dayKeys.map((key, i) => {
        const dayLabel = lang(key);
        let state = 'future';
        if (i < todayIdx)   state = streak > (todayIdx - i) ? 'done' : 'missed';
        if (i === todayIdx) state = lastClaim === getUTCDateString() ? 'today-done' : 'today';

        const colors = {
            'done':       'bg-emerald-500/25 border-emerald-500/50 text-emerald-400',
            'today':      'bg-cyan-500/20 border-cyan-400 text-cyan-400 ring-2 ring-cyan-400/30',
            'today-done': 'bg-emerald-500/25 border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/30',
            'missed':     'bg-red-500/10 border-red-700/30 text-red-500',
            'future':     'bg-slate-800/40 border-slate-700/30 text-slate-600',
        };
        const icons = { 'done': '✓', 'today': '🧪', 'today-done': '✓', 'missed': '✗', 'future': dayLabel.charAt(0).toUpperCase() };

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
// МОДАЛКА
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
        </div>
    `;

    modal.addEventListener('click', function(e) { if (e.target === modal) window.closeClaimModal(); });
    document.body.appendChild(modal);
    _addClaimStyles();
}

function _addClaimStyles() {
    if (document.getElementById('claim-styles')) return;
    const style = document.createElement('style');
    style.id = 'claim-styles';
    style.textContent = `
        .claim-modal-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease;
            padding: 12px;
        }
        .claim-modal-overlay.active { opacity: 1; pointer-events: all; }

        .claim-modal-box {
            background: linear-gradient(145deg, #171f30 0%, #0c1220 100%);
            border: 1px solid rgba(99,179,237,0.1);
            border-radius: 20px;
            width: 100%;
            max-width: 860px;
            max-height: 95vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transform: translateY(20px) scale(0.97);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,179,237,0.04);
        }
        .claim-modal-overlay.active .claim-modal-box { transform: translateY(0) scale(1); }

        .claim-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            flex-shrink: 0;
        }

        /* Двухколоночная раскладка */
        .claim-two-col {
            display: grid;
            grid-template-columns: 1fr 1px 1fr;
            gap: 0;
            flex: 1;
            overflow: hidden;
            min-height: 0;
        }

        .claim-left-col {
            padding: 16px 18px 16px 18px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-left-col::-webkit-scrollbar { width: 3px; }
        .claim-left-col::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

        .claim-divider {
            background: rgba(255,255,255,0.05);
            width: 1px;
            flex-shrink: 0;
        }

        .claim-right-col {
            padding: 16px 18px 16px 18px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-right-col::-webkit-scrollbar { width: 3px; }
        .claim-right-col::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

        /* Карточки */
        .claim-mini-card {
            background: rgba(30,40,60,0.55);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 10px 8px;
            text-align: center;
            transition: border-color 0.2s;
        }
        .claim-mini-card:hover { border-color: rgba(99,179,237,0.2); }
        .mini-value { font-size: 20px; font-weight: 800; line-height: 1; margin-bottom: 3px; }
        .mini-label { font-size: 10px; color: #64748b; line-height: 1.3; }
        .mini-unit  { font-size: 10px; color: #475569; margin-top: 2px; }

        /* Заголовок колонки */
        .col-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* На мобильных — одна колонка */
        @media (max-width: 640px) {
            .claim-modal-box {
                max-width: 100%;
                border-radius: 16px;
                max-height: 96vh;
            }
            .claim-two-col {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto auto;
                overflow-y: auto;
            }
            .claim-divider {
                width: 100%;
                height: 1px;
            }
            .claim-left-col,
            .claim-right-col {
                overflow-y: visible;
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
    if (_claimCountdownInterval) { clearInterval(_claimCountdownInterval); _claimCountdownInterval = null; }

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
            var midnight = new Date(); midnight.setUTCHours(24, 0, 0, 0); return midnight - new Date();
        }
        function formatTime(ms) {
            if (ms <= 0) return '00:00:00';
            var s = Math.floor(ms / 1000);
            return [Math.floor(s/3600), Math.floor((s%3600)/60), s%60].map(function(v){ return String(v).padStart(2,'0'); }).join(':');
        }
        function renderCooldown() {
            var remaining = getMsToMidnightUTC();
            if (remaining <= 0) { clearInterval(_claimCountdownInterval); _claimCountdownInterval = null; _applyClaimBtnVisual(true); return; }
            var timeStr = formatTime(remaining);
            btn.className = ['relative flex items-center gap-2 px-3 py-2', 'bg-slate-800/40 border border-slate-700/40', 'rounded-xl text-sm transition-all duration-300 cursor-default'].join(' ');
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
// ПЕРЕВОДЫ
// ─────────────────────────────────────────────────────────────────

function _updateClaimTranslations() {
    const titleEl = document.getElementById('claimModalTitle');
    if (titleEl) titleEl.textContent = lang('claim_title');
    const subtitleEl = document.getElementById('claimModalSubtitle');
    if (subtitleEl) subtitleEl.textContent = lang('claim_updated_utc');
    const btn = document.getElementById('headerClaimBtn');
    if (btn) { const isAvailable = btn.getAttribute('data-claim-available') === '1'; _applyClaimBtnVisual(isAvailable); }
}

document.addEventListener('languageChanged', _updateClaimTranslations);

// ─────────────────────────────────────────────────────────────────
// АВТОПРОВЕРКА
// ─────────────────────────────────────────────────────────────────

async function _checkClaimOnLoad() {
    var attempts = 0;
    while ((!window.auth || !window.auth.currentUser) && attempts < 20) {
        await new Promise(function(r) { setTimeout(r, 500); }); attempts++;
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

window.ReagentsSystem = { getClaimStatus, performClaim, getUTCDateString, calcReward, getNextMilestone, getPassiveRewardInfo, CONFIG: REAGENTS_CONFIG };
window.openClaimModal  = window.openClaimModal;
window.closeClaimModal = window.closeClaimModal;
window.doClaim         = window.doClaim;

console.log('🧪 Reagents System v2.0 loaded (MLM referrals)');

setTimeout(_checkClaimOnLoad, 2000);
setTimeout(_checkClaimOnLoad, 5000);

})();
