/**
 * ============================================
 * AirdropLab Reagents System v2.4
 * Добавлено:
 * - Накопление пассива за весь период
 * - Уведомления о начислениях
 * - Точность 2 знака после запятой
 * - Дни без входа в статистике
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
    profileFields: [
        { key: 'firstName',  reward: 10 },
        { key: 'lastName',   reward: 10 },
        { key: 'birthdate',  reward: 10 },
        { key: 'gender',     reward: 10 },
        { key: 'bio',        reward: 10 },
        { key: 'city',       reward: 10 },
        { key: 'country',    reward: 10 },
        { key: 'username',   reward: 10 },
        { key: 'twitter',    reward: 10 },
        { key: 'discord',    reward: 10 },
        { key: 'telegram',   reward: 10 },
        { key: 'evmAddress', reward: 10 },
        { key: 'solAddress', reward: 10 },
    ],
};

// ─────────────────────────────────────────────────────────────────
// УТИЛИТЫ
// ─────────────────────────────────────────────────────────────────

function lang(key) {
    return (typeof window.t === 'function') ? window.t(key) : key;
}

function getCurrentLang() {
    return (typeof window.currentLang === 'string') ? window.currentLang :
           document.documentElement.lang || 'ru';
}

function isEn() {
    return getCurrentLang().startsWith('en');
}

function getUTCDateString(date) {
    const d = date || new Date();
    return d.getUTCFullYear() + '-' +
           String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
           String(d.getUTCDate()).padStart(2, '0');
}

// ✅ ИЗМЕНЕНО: точное округление с 2 знаками после запятой
function roundReward(value) {
    return Math.round(value * 100) / 100;
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

function calcProfileBonus(profileData) {
    if (!profileData) return 0;
    let bonus = 0;
    REAGENTS_CONFIG.profileFields.forEach(field => {
        const val = profileData[field.key];
        if (val && String(val).trim()) {
            bonus += field.reward;
        }
    });
    return bonus;
}

// ✅ НОВОЕ: подсчет дней без входа
function _calculateDaysOffline(lastProcessedDate) {
    if (!lastProcessedDate) return 0;
    
    try {
        const last = new Date(lastProcessedDate + 'T00:00:00Z');
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        
        const diff = today - last;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return Math.max(0, days);
    } catch(e) {
        return 0;
    }
}

// ─────────────────────────────────────────────────────────────────
// FAQ — RU + EN
// ─────────────────────────────────────────────────────────────────

function _faqStreakHtml() {
    const maxProfileBonus = REAGENTS_CONFIG.profileFields.length * 10;
    if (isEn()) return `
        <div class="font-semibold text-blue-300 mb-1.5">❓ How does the streak work?</div>
        <div class="text-slate-400 space-y-1">
            <div>• Claim every day before <span class="text-white">00:00 UTC</span> — streak grows</div>
            <div>• Miss a day — streak resets to 0</div>
            <div>• After 7, 30, 60… days in a row — bonus RGT</div>
            <div>• Base reward: <span class="text-cyan-400">+${REAGENTS_CONFIG.dailyBase} RGT</span> per day</div>
            <div>• Referral code gives new user <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span>,
                 you get <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span></div>
            <div>• Complete profile: <span class="text-emerald-400">+10 RGT</span> for each field (13 fields = up to <span class="text-emerald-400">+${maxProfileBonus} RGT</span>)</div>
            <div>• Passive income accumulates daily, credited when you visit</div>
        </div>`;
    return `
        <div class="font-semibold text-blue-300 mb-1.5">❓ Как работает стрик?</div>
        <div class="text-slate-400 space-y-1">
            <div>• Клеймите каждый день до <span class="text-white">00:00 UTC</span> — стрик растёт</div>
            <div>• Пропустили день — стрик сбросится до 0</div>
            <div>• За 7, 30, 60... дней подряд — бонусные RGT</div>
            <div>• База: <span class="text-cyan-400">+${REAGENTS_CONFIG.dailyBase} RGT</span> каждый день</div>
            <div>• Реф. код даёт новому: <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span>,
                 вам — <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span></div>
            <div>• Заполните профиль: <span class="text-emerald-400">+10 RGT</span> за каждое поле (13 полей = до <span class="text-emerald-400">+${maxProfileBonus} RGT</span>)</div>
            <div>• Пассивный доход накапливается ежедневно, начисляется при входе</div>
        </div>`;
}

function _faqReferralHtml() {
    if (isEn()) return `
        <div class="font-semibold text-blue-300 mb-1.5">❓ How do referrals work?</div>
        <div class="text-slate-400 space-y-1">
            <div>• Share your referral code with friends</div>
            <div>• New user gets <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span> instantly</div>
            <div>• You get <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span> right away</div>
            <div>• Every referral's claim earns you <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[0].percent}%</span></div>
            <div>• Level 2: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[1].percent}%</span>
                 · Level 3: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
            <div>• Income accumulates daily, credited when you visit</div>
        </div>`;
    return `
        <div class="font-semibold text-blue-300 mb-1.5">❓ Как работают рефералы?</div>
        <div class="text-slate-400 space-y-1">
            <div>• Поделитесь реферальным кодом с друзьями</div>
            <div>• Новый пользователь получит <span class="text-cyan-400">+${REAGENTS_CONFIG.referralBonus} RGT</span></div>
            <div>• Вы получите <span class="text-cyan-400">+${REAGENTS_CONFIG.referralInviter} RGT</span> сразу</div>
            <div>• Каждый клейм реферала приносит вам <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[0].percent}%</span></div>
            <div>• 2-й уровень: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[1].percent}%</span>
                 · 3-й: <span class="text-emerald-400">${REAGENTS_CONFIG.referralLevels[2].percent}%</span></div>
            <div>• Доход накапливается ежедневно, начисляется при входе</div>
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
            data = { reagents: 0, streak: 0, lastClaimDate: '', invitedBy: '', invitedCount: 0,
                     pendingPassive: 0, passiveLog: {}, referralEarnings: 0, bestStreak: 0,
                     referralCode: _generateCode(user.uid) };
        } else {
            data = snap.data();
        }

        const todayUTC     = getUTCDateString();
        const lastClaim    = data.lastClaimDate || '';
        const streak       = data.streak        || 0;
        const reagents     = data.reagents      || 0;
        const bestStreak   = data.bestStreak    || 0;
        const referralCode = data.referralCode  || _generateCode(user.uid);

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

        return { canClaim, streak, newStreak, reagents, lastClaim, todayUTC, streakBroken,
                 reward, bestStreak, referralCode,
                 nextMilestone: getNextMilestone(canClaim ? newStreak : streak), passiveInfo };
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

async function checkAndAwardProfileBonus(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return 0;

    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        if (!snap.exists()) return 0;

        const userData = snap.data();
        const profile = userData.profile || {};
        const awardedFields = userData.awardedProfileFields || [];
        let totalBonus = 0;
        let newAwardedFields = [...awardedFields];

        for (const field of REAGENTS_CONFIG.profileFields) {
            const val = profile[field.key];
            if (val && String(val).trim() && !awardedFields.includes(field.key)) {
                totalBonus += field.reward;
                newAwardedFields.push(field.key);
            }
        }

        if (totalBonus > 0) {
            const currentReagents = userData.reagents || 0;
            await exp.setDoc(exp.doc(db, 'users', user.uid), {
                reagents: currentReagents + totalBonus,
                awardedProfileFields: newAwardedFields,
                lastProfileCheck: new Date().toISOString(),
            }, { merge: true });
        }

        return totalBonus;
    } catch(err) {
        console.error('[Reagents] checkAndAwardProfileBonus error:', err);
        return 0;
    }
}

// ✅ НОВОЕ: проверка и обработка пассивного дохода за весь период
async function _checkAndProcessDailyPassiveRewards(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return null;

    try {
        const snap = await exp.getDoc(exp.doc(db, 'users', user.uid));
        if (!snap.exists()) return null;

        const userData = snap.data();
        const lastProcessedDate = userData.lastPassiveProcessDate || '';
        const todayUTC = getUTCDateString();

        // Если уже обработано сегодня — вернём уведомление
        if (lastProcessedDate === todayUTC) {
            return userData.passiveRewardNotification || null;
        }

        // ✅ Собираем ВСЕ накопления с момента последней обработки
        let totalPayout = userData.pendingPassive || 0;
        const passiveLog = userData.passiveLog || {};

        let notification = null;

        if (totalPayout > 0) {
            // ✅ Точное округление: 2 знака после запятой
            const payout = Math.round(totalPayout * 100) / 100;
            const referralsCount = Object.keys(passiveLog).length;
            const daysOffline = _calculateDaysOffline(lastProcessedDate);

            notification = {
                amount: payout,
                timestamp: new Date().toISOString(),
                read: false,
                referralsCount: referralsCount,
                daysOffline: daysOffline,
            };

            // ✅ Переводим ВСЕ pendingPassive в reagents
            await exp.setDoc(exp.doc(db, 'users', user.uid), {
                reagents: (userData.reagents || 0) + payout,
                pendingPassive: 0,
                referralEarnings: (userData.referralEarnings || 0) + payout,
                lastPassivePayoutAt: new Date().toISOString(),
                lastPassivePayout: payout,
                passiveRewardNotification: notification,
                lastPassiveProcessDate: todayUTC,
            }, { merge: true });
        } else {
            // Если нет pendingPassive, просто обновляем дату обработки
            await exp.setDoc(exp.doc(db, 'users', user.uid), {
                lastPassiveProcessDate: todayUTC,
            }, { merge: true });
        }

        return notification;

    } catch(err) {
        console.error('[Reagents] _checkAndProcessDailyPassiveRewards error:', err);
        return null;
    }
}

// Функция для отметки уведомления как прочитанного
async function _markPassiveNotificationRead(user) {
    const db = window.db, exp = window.__firestoreExports;
    if (!db || !exp || !user) return;

    try {
        await exp.setDoc(exp.doc(db, 'users', user.uid), {
            passiveRewardNotification: {
                read: true
            }
        }, { merge: true });
    } catch(err) {
        console.error('[Reagents] _markPassiveNotificationRead error:', err);
    }
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

// ✅ ИЗМЕНЕНО: используем точное округление
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
            const upData        = upSnap.data();
            // ✅ ТОЧНОЕ ВЫЧИСЛЕНИЕ: 10% от 10 = 1.00, 5% от 10 = 0.50
            const preciseReward = claimedAmount * (levelCfg.percent / 100);
            const roundedReward = roundReward(preciseReward);
            
            if (roundedReward > 0) {
                const existingLog      = upData.passiveLog || {};
                const existingFromUser = existingLog[claimUser.uid] || {};
                await exp.setDoc(exp.doc(db, 'users', upstreamUid), {
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

async function getPassiveRewardInfo(user, userData) {
    try {
        let freshData = userData;
        if (user) {
            const db = window.db, exp = window.__firestoreExports;
            if (db && exp && exp.getDoc && exp.doc) {
                try {
                    const s = await exp.getDoc(exp.doc(db, 'users', user.uid));
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

    // ✅ НОВОЕ: проверяем и обрабатываем пассивный доход за весь период
    const passiveNotification = await _checkAndProcessDailyPassiveRewards(user);
    
    const profileBonus = await checkAndAwardProfileBonus(user);
    const status = await getClaimStatus(user);
    
    if (!status) { body.innerHTML = _renderError(lang('claim_load_error')); return; }
    
    if (passiveNotification && passiveNotification.amount > 0) {
        status._passiveNotification = passiveNotification;
    }
    
    if (profileBonus > 0) status._profileBonus = profileBonus;

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

window._toggleFaq = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
};

window._toggleRefList = function() {
    const full    = document.getElementById('refListFull');
    const preview = document.getElementById('refListPreview');
    const btn     = document.getElementById('refListToggleBtn');
    if (!full || !preview || !btn) return;
    const total = btn.dataset.total || '';
    if (full.style.display === 'none' || full.style.display === '') {
        full.style.display    = 'block';
        preview.style.display = 'none';
        btn.textContent = isEn() ? '▲ Collapse' : '▲ Свернуть';
    } else {
        full.style.display    = 'none';
        preview.style.display = 'block';
        btn.textContent = isEn()
            ? `▼ Show all (${total})`
            : `▼ Показать всех (${total})`;
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
    </div>`;
}

function _renderError(msg) {
    return `
    <div class="text-center py-12">
        <div class="text-4xl mb-3">⚠️</div>
        <p class="text-red-400 mb-4">${msg}</p>
        <button onclick="closeClaimModal()"
            class="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ${lang('claim_error_close')}
        </button>
    </div>`;
}

function _renderClaimUI(status) {
    const { canClaim, streak, newStreak, reagents, reward, streakBroken,
            nextMilestone, passiveInfo, bestStreak, referralCode, _profileBonus, _passiveNotification } = status;

    const prevMilestone = nextMilestone.days - 30 < 0 ? 0 : nextMilestone.days - 30;
    const progressPct   = Math.min(
        Math.round(((streak - prevMilestone) / (nextMilestone.days - prevMilestone)) * 100), 100
    );
    const weekDays = _buildWeekDays(status);
    const en       = isEn();

    // ── ЛЕВАЯ КОЛОНКА ────────────────────────────────────────────
    const leftCol = `
        <!-- Заголовок + FAQ -->
        <div class="col-header">
            <span class="text-lg">🧪</span>
            <div style="flex:1">
                <div class="text-sm font-bold text-white">${lang('claim_title')}</div>
                <div class="text-xs text-slate-500">${lang('claim_updated_utc')}</div>
            </div>
            <button onclick="_toggleFaq('faqStreak')"
                style="width:22px;height:22px;border-radius:50%;background:rgba(99,179,237,0.1);
                       border:1px solid rgba(99,179,237,0.25);color:#67e8f9;font-size:11px;
                       font-weight:700;cursor:pointer;flex-shrink:0;transition:all 0.2s"
                title="${en ? 'How it works?' : 'Как это работает?'}">i</button>
        </div>

        <!-- FAQ стрик -->
        <div id="faqStreak" style="display:none"
             class="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl text-xs text-slate-300 leading-relaxed">
            ${_faqStreakHtml()}
        </div>

        <!-- ✅ НОВОЕ: Уведомление о пассивном доходе за весь период -->
        ${_passiveNotification ? `
        <div class="mb-3 p-3 bg-emerald-900/25 border border-emerald-600/40 rounded-xl flex items-center gap-2.5">
            <span class="text-xl">💰</span>
            <div>
                <div class="text-xs font-bold text-emerald-400">
                    ${en ? 'Passive income credited!' : 'Пассивный доход начислен!'}
                </div>
                <div class="text-xs text-slate-400">
                    +${_passiveNotification.amount.toFixed(2)} RGT
                    ${en 
                        ? `from ${_passiveNotification.referralsCount} referral${_passiveNotification.referralsCount !== 1 ? 's' : ''}`
                        : `от ${_passiveNotification.referralsCount} реферала`}
                </div>
                ${_passiveNotification.daysOffline > 1 ? `
                <div class="text-xs text-emerald-500 mt-1">
                    ${en 
                        ? `📅 Accumulated for ${_passiveNotification.daysOffline} days`
                        : `📅 Накоплено за ${_passiveNotification.daysOffline} дней`}
                </div>` : ''}
            </div>
        </div>` : ''}

        <!-- Баннер профиля -->
        ${_profileBonus ? `
        <div class="mb-3 p-3 bg-yellow-900/25 border border-yellow-600/40 rounded-xl flex items-center gap-2.5">
            <span class="text-xl">✓</span>
            <div>
                <div class="text-xs font-bold text-yellow-400">
                    ${en ? 'Profile fields completed!' : 'Поля профиля заполнены!'}
                </div>
                <div class="text-xs text-slate-400">+${_profileBonus} RGT
                    ${en ? 'profile bonus' : 'бонус профиля'}
                </div>
            </div>
        </div>` : ''}

        <!-- Баланс / Стрик / Рекорд -->
        <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_balance_label')}</div>
                <div class="mini-value text-cyan-400">${reagents}</div>
                <div class="mini-unit">${lang('reagents_rgt_unit')}</div>
            </div>
            <div class="claim-mini-card">
                <div class="mini-label">${lang('claim_streak_label')}</div>
                <div class="mini-value text-orange-400">${streak}</div>
                <div class="mini-unit">🔥 ${en ? 'd.' : 'дн.'}</div>
            </div>
            <div class="claim-mini-card" title="${en ? 'Best streak ever' : 'Лучший стрик за всё время'}">
                <div class="mini-label">${en ? 'Record' : 'Рекорд'} 🏆</div>
                <div class="mini-value text-yellow-400">${Math.max(bestStreak || 0, streak)}</div>
                <div class="mini-unit">${en ? 'd.' : 'дн.'}</div>
            </div>
        </div>

        ${streakBroken ? `
        <div class="mb-3 p-3 bg-red-900/25 border border-red-700/40 rounded-xl text-center">
            <div class="text-2xl mb-1">💔</div>
            <div class="text-red-400 text-sm font-bold">${lang('claim_streak_broken_title')}</div>
            <div class="text-slate-400 text-xs mt-0.5">${lang('claim_streak_broken_desc')}</div>
        </div>` : ''}

        <!-- Дни недели -->
        <div class="mb-4">
            <div class="text-xs text-slate-500 mb-2 uppercase tracking-wide text-center">
                ${lang('claim_week_progress')}
            </div>
            <div class="flex justify-between gap-1">${weekDays}</div>
        </div>

        <!-- Прогресс до бонуса -->
        <div class="mb-4 p-3 bg-slate-800/50 border border-slate-700/30 rounded-xl">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-slate-400">🎯 ${lang('claim_until_bonus').replace('{days}', nextMilestone.days)}</span>
                <span class="text-xs font-bold text-cyan-400">${lang('claim_days_left').replace('{days}', nextMilestone.daysLeft)}</span>
            </div>
            <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                     style="width:${progressPct}%"></div>
            </div>
            <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-slate-600">${progressPct}% ${en ? 'done' : 'пройдено'}</span>
                <div class="flex items-center gap-1.5">
                    <div style="background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.25);
                                border-radius:8px;padding:3px 10px;text-align:center">
                        <span style="font-size:16px;font-weight:900;color:#22d3ee;line-height:1">
                            ${nextMilestone.daysLeft}
                        </span>
                        <span style="font-size:9px;color:#64748b;display:block;margin-top:1px">
                            ${en ? 'd. to bonus' : 'дн. до бонуса'}
                        </span>
                    </div>
                    <div style="background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.25);
                                border-radius:8px;padding:3px 10px;text-align:center">
                        <span style="font-size:14px;font-weight:900;color:#fbbf24;line-height:1">
                            +${calcReward(nextMilestone.days).bonus}
                        </span>
                        <span style="font-size:9px;color:#64748b;display:block;margin-top:1px">
                            RGT ${en ? 'bonus' : 'бонус'}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        ${canClaim ? `
        <!-- Награда + кнопка -->
        <div class="mb-3 p-3 bg-cyan-900/15 border border-cyan-700/25 rounded-xl text-center">
            <div class="text-xs text-slate-400 mb-1">${lang('claim_today_reward')}</div>
            <div class="text-3xl font-black text-cyan-400">+${reward.total}</div>
            <div class="text-sm text-slate-400">${lang('reagents_rgt_unit')}</div>
            ${reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/15
                        text-yellow-400 rounded-full border border-yellow-500/30 text-xs">
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
        <!-- Уже клеймил -->
        <div class="p-3 bg-emerald-900/15 border border-emerald-700/25 rounded-xl text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40
                        flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-check text-xl text-emerald-400"></i>
            </div>
            <div class="text-emerald-400 font-black text-base mb-1">${lang('claim_already_title')}</div>
            <div class="text-slate-400 text-sm mb-1">
                ${lang('claim_next_at')} <span class="text-white font-bold">00:00 UTC</span>
            </div>
            <div class="text-xs text-slate-500 font-mono">${_getTimeToMidnightUTC()}</div>
        </div>`}

        <!-- Таблица стрик бонусов -->
        <div class="mt-4 pt-4 border-t border-slate-700/40">
            <div class="text-xs font-semibold text-slate-400 mb-2 text-center">
                ${lang('claim_rewards_table')}
            </div>
            <div class="grid grid-cols-2 gap-1.5">
                ${REAGENTS_CONFIG.streakBonuses.map(sb => `
                <div class="flex items-center justify-between px-2.5 py-2 rounded-lg
                            ${streak >= sb.days
                                ? 'bg-emerald-900/20 border border-emerald-700/30'
                                : 'bg-slate-800/30 border border-slate-700/20'}">
                    <span class="text-xs ${streak >= sb.days ? 'text-emerald-400' : 'text-slate-400'}">
                        ${streak >= sb.days ? '✅' : '🔒'} ${sb.days}${lang('claim_days_unit')}
                    </span>
                    <span class="text-xs font-bold ${streak >= sb.days ? 'text-yellow-400' : 'text-slate-500'}">
                        +${sb.bonus}
                    </span>
                </div>`).join('')}
            </div>
            <div class="mt-2 text-center text-xs text-slate-600">${lang('claim_after_60')}</div>
        </div>`;

    // ── ПРАВАЯ КОЛОНКА ───────────────────────────────────────────
    const rightCol = _renderPassiveBlock(passiveInfo, referralCode);

    return `
    <div class="claim-two-col">
        <div class="claim-left-col">${leftCol}</div>
        <div class="claim-divider"></div>
        <div class="claim-right-col">${rightCol}</div>
    </div>
    <div class="claim-footer">
        <button onclick="closeClaimModal()"
            class="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-xl
                   text-slate-400 hover:text-white transition-colors text-sm font-medium">
            ${lang('claim_close_btn')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ПРАВАЯ КОЛОНКА — РЕФЕРАЛЫ
// ─────────────────────────────────────────────────────────────────

function _renderPassiveBlock(passiveInfo, referralCode) {
    if (!passiveInfo) return '<div class="p-4 text-slate-500 text-sm text-center">—</div>';

    const { referralEarnings, invitedCount, lastPayout, lastPayoutAt,
            activeReferrals, referralDetails } = passiveInfo;
    const levels = REAGENTS_CONFIG.referralLevels;
    const en     = isEn();

    let lastPayoutStr = '—';
    if (lastPayoutAt) {
        try {
            lastPayoutStr = new Date(lastPayoutAt).toLocaleDateString('ru-RU',
                { day:'2-digit', month:'2-digit', year:'numeric' });
        } catch(e) { lastPayoutStr = lastPayoutAt.substring(0, 10); }
    }

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentActive = (referralDetails || []).filter(ref => {
        if (!ref.lastClaimAt) return false;
        try { return new Date(ref.lastClaimAt).getTime() > sevenDaysAgo; } catch(e) { return false; }
    }).length;

    // Топ рефералов
    const allRefs = [...(referralDetails || [])]
        .sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
    const top3    = allRefs.slice(0, 3);
    const hasMore = allRefs.length > 3;

    function _refRowHtml(ref, idx) {
        let timeStr = '';
        if (ref.lastClaimAt) {
            try {
                const diff = Date.now() - new Date(ref.lastClaimAt).getTime();
                if      (diff < 3600000)  timeStr = Math.floor(diff/60000)    + (en ? ' min' : ' мин');
                else if (diff < 86400000) timeStr = Math.floor(diff/3600000)  + (en ? ' h'   : ' ч');
                else                       timeStr = Math.floor(diff/86400000) + (en ? ' d'   : ' дн');
            } catch(e) {}
        }
        const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
        return `
        <div class="flex items-center justify-between px-2.5 py-1.5 bg-slate-800/50 rounded-lg">
            <div class="flex items-center gap-1.5">
                <span style="font-size:13px">${medals[idx] || '·'}</span>
                <span class="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">
                    ${en ? 'Lv.' : 'Ур.'}${ref.level}
                </span>
                <span class="text-xs text-slate-500 font-mono">${ref.uid.substring(0, 8)}…</span>
            </div>
            <div class="flex items-center gap-1.5">
                ${timeStr ? `<span class="text-xs text-slate-600">${timeStr} ${en ? 'ago' : 'назад'}</span>` : ''}
                <span class="text-xs text-emerald-400 font-bold">+${(ref.totalAmount || ref.lastAmount).toFixed(2)}</span>
            </div>
        </div>`;
    }

    // График 7 дней
    const dayLabelsRu = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
    const dayLabelsEn = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    const dayLabels   = [];
    const dayAmounts  = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setUTCDate(d.getUTCDate() - i);
        const dayStr = getUTCDateString(d);
        dayLabels.push((en ? dayLabelsEn : dayLabelsRu)[d.getUTCDay()]);
        let amount = 0;
        for (const ref of (referralDetails || [])) {
            if (!ref.lastClaimAt) continue;
            try {
                if (getUTCDateString(new Date(ref.lastClaimAt)) === dayStr)
                    amount += (ref.lastAmount || 0);
            } catch(e) {}
        }
        dayAmounts.push(amount);
    }
    const maxAmount = Math.max(...dayAmounts, 1);

    const chartBars = dayLabels.map((label, i) => {
        const pct     = Math.round((dayAmounts[i] / maxAmount) * 100);
        const isToday = i === 6;
        return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1">
            <div style="font-size:9px;color:${dayAmounts[i] > 0 ? '#34d399' : '#475569'};
                        font-weight:600;min-height:12px;text-align:center">
                ${dayAmounts[i] > 0 ? '+' + dayAmounts[i].toFixed(2) : ''}
            </div>
            <div style="width:100%;background:rgba(30,41,59,0.8);border-radius:4px;height:40px;
                        display:flex;align-items:flex-end;overflow:hidden">
                <div style="width:100%;height:${Math.max(pct, 4)}%;
                            background:${isToday
                                ? 'linear-gradient(180deg,#22d3ee,#3b82f6)'
                                : 'rgba(52,211,153,0.4)'};
                            border-radius:3px;transition:height 0.3s"></div>
            </div>
            <div style="font-size:9px;color:${isToday ? '#67e8f9' : '#475569'}">${label}</div>
        </div>`;
    }).join('');

    return `
    <!-- Заголовок + FAQ -->
    <div class="col-header">
        <span class="text-lg">👥</span>
        <div style="flex:1">
            <div class="text-sm font-bold text-white">${lang('passive_income_title')}</div>
            <div class="text-xs text-slate-500">MLM · 3 ${en ? 'levels' : 'уровня'}</div>
        </div>
        <button onclick="_toggleFaq('faqReferral')"
            style="width:22px;height:22px;border-radius:50%;background:rgba(99,179,237,0.1);
                   border:1px solid rgba(99,179,237,0.25);color:#67e8f9;font-size:11px;
                   font-weight:700;cursor:pointer;flex-shrink:0;transition:all 0.2s"
            title="${en ? 'How referrals work?' : 'Как работают рефералы?'}">i</button>
    </div>

    <!-- FAQ рефералы -->
    <div id="faqReferral" style="display:none"
         class="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl text-xs leading-relaxed">
        ${_faqReferralHtml()}
    </div>

    <!-- Реферальный код -->
    <div class="mb-3 p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl">
        <div class="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
            🔗 <span>${en ? 'Your referral code' : 'Ваш реферальный код'}</span>
        </div>
        <div class="flex items-center gap-2">
            <div style="flex:1;background:rgba(15,23,42,0.6);border:1px solid rgba(99,179,237,0.2);
                        border-radius:8px;padding:7px 12px;font-family:monospace;font-size:14px;
                        font-weight:700;color:#22d3ee;letter-spacing:0.05em;
                        overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                ${referralCode || '—'}
            </div>
            <button id="refCodeCopyBtn" onclick="_copyRefCode('${referralCode || ''}')"
                style="width:34px;height:34px;border-radius:8px;background:rgba(6,182,212,0.15);
                       border:1px solid rgba(6,182,212,0.3);color:#67e8f9;cursor:pointer;
                       display:flex;align-items:center;justify-content:center;font-size:13px;
                       transition:all 0.2s;flex-shrink:0"
                title="${en ? 'Copy' : 'Скопировать'}">
                <i class="fas fa-copy"></i>
            </button>
        </div>
        <div class="text-xs text-slate-600 mt-1.5">
            ${en
                ? `Invited gets +${REAGENTS_CONFIG.referralBonus} RGT · you get +${REAGENTS_CONFIG.referralInviter} RGT`
                : `Приглашённый получит +${REAGENTS_CONFIG.referralBonus} RGT · вы — +${REAGENTS_CONFIG.referralInviter} RGT`}
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
            <div class="mini-label">${en ? 'Active 7d.' : 'Активны<br>7 дн.'}</div>
        </div>
        <div class="claim-mini-card">
            <div class="mini-value text-emerald-400">${referralEarnings.toFixed(2)}</div>
            <div class="mini-label">${lang('passive_total_earned')}</div>
        </div>
    </div>

    <!-- Итого заработано -->
    <div class="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl mb-3">
        <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs text-slate-300 font-medium">
                💰 ${en ? 'Total from referrals' : 'Всего от рефералов'}
            </span>
            <span class="text-sm font-black text-emerald-400">+${referralEarnings.toFixed(2)} RGT</span>
        </div>
        ${lastPayout > 0 ? `
        <div class="flex items-center justify-between pt-1.5 border-t border-slate-700/30">
            <span class="text-xs text-slate-500">
                ${en ? 'Last payout' : 'Посл. начисление'} ${lastPayoutStr}
            </span>
                       <span class="text-xs text-emerald-500 font-medium">+${lastPayout.toFixed(2)} RGT</span>
        </div>` : `
        <div class="text-xs text-slate-600 text-center">
            ${en
                ? 'Income appears when referrals claim'
                : 'Начисления появятся когда рефералы сделают клейм'}
        </div>`}
    </div>

    <!-- График 7 дней -->
    <div class="mb-3 p-3 bg-slate-800/30 border border-slate-700/25 rounded-xl">
        <div class="text-xs text-slate-400 font-medium mb-2">
            📊 ${en ? 'Income last 7 days' : 'Доход за 7 дней'}
        </div>
        <div style="display:flex;gap:4px;align-items:flex-end">
            ${chartBars}
        </div>
    </div>

    <!-- Топ рефералов -->
    ${allRefs.length > 0 ? `
    <div class="mb-3">
        <div class="text-xs text-slate-400 font-medium mb-1.5">
            🏆 ${en ? 'Top referrals' : 'Топ рефералов'}
        </div>
        <div id="refListPreview" class="space-y-1">
            ${top3.map((ref, idx) => _refRowHtml(ref, idx)).join('')}
        </div>
        ${hasMore ? `
        <div id="refListFull" style="display:none" class="space-y-1 mt-1">
            ${allRefs.map((ref, idx) => _refRowHtml(ref, idx)).join('')}
        </div>
        <button id="refListToggleBtn"
            data-total="${allRefs.length}"
            onclick="_toggleRefList()"
            class="w-full mt-2 py-1.5 text-xs text-slate-500 hover:text-slate-300
                   bg-slate-800/40 hover:bg-slate-700/40 rounded-lg
                   border border-slate-700/30 transition-colors cursor-pointer">
            ▼ ${en ? `Show all (${allRefs.length})` : `Показать всех (${allRefs.length})`}
        </button>` : ''}
    </div>
    ` : `
    <div class="mb-3 py-4 bg-slate-800/20 rounded-xl border border-dashed border-slate-700/40 text-center">
        <div class="text-2xl mb-1">🔗</div>
        <div class="text-xs text-slate-500">
            ${en
                ? 'Invite referrals —<br>their claims bring you income'
                : 'Пригласи рефералов —<br>их клеймы приносят доход'}
        </div>
    </div>`}

    <!-- Таблица уровней -->
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
// ЭКРАН УСПЕХА
// ─────────────────────────────────────────────────────────────────

function _showClaimSuccess(result) {
    const body = document.getElementById('claimModalBody');
    if (!body) return;
    const en = isEn();
    
    // ✅ Отметить уведомление как прочитанное
    const user = (window.auth && window.auth.currentUser) || window.currentUser;
    if (user) {
        _markPassiveNotificationRead(user);
    }

    body.innerHTML = `
    <div class="p-6 text-center" style="overflow-y:auto">
        <div class="relative w-20 h-20 mx-auto mb-4">
            <div class="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
            <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30
                        border-2 border-cyan-400/50 flex items-center justify-center text-3xl">🧪</div>
        </div>
        <h3 class="text-2xl font-black text-white mb-1">${lang('claim_success_title')}</h3>
        ${result.streakBroken
            ? `<div class="text-sm text-red-400 mb-3">${lang('claim_streak_reset')}</div>` : ''}
        <div class="bg-slate-800/50 rounded-xl p-4 mb-4">
            <div class="text-xs text-slate-500 mb-1">${lang('claim_credited')}</div>
            <div class="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                +${result.reward.total}
            </div>
            <div class="text-slate-400 text-sm">${lang('claim_reagents_unit')}</div>
            ${result.reward.bonus > 0 ? `
            <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
                <i class="fas fa-star"></i> ${result.reward.label} — +${result.reward.bonus} ${lang('reagents_rgt_unit')}!
            </div>` : ''}
        </div>
        <div class="bg-slate-800/30 rounded-xl p-3 mb-4 text-left">
            <div class="text-xs text-slate-500 mb-2">${lang('passive_credited_to_upstream')}</div>
            ${REAGENTS_CONFIG.referralLevels.map(lv => {
                const r = roundReward(result.reward.total * lv.percent / 100);
                return `
                <div class="flex items-center justify-between text-xs py-1
                            border-b border-slate-700/30 last:border-0">
                    <span class="text-slate-400">
                        ${lang('passive_level')} ${lv.level}
                        <span class="text-slate-600">(${lv.percent}%)</span>
                    </span>
                    <span class="text-emerald-400 font-medium">+${r.toFixed(2)} ${lang('reagents_rgt_unit')}</span>
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
                <div class="text-xs text-slate-500">${en ? 'Record' : 'Рекорд'}</div>
            </div>
            <div class="bg-slate-800/30 rounded-xl p-3">
                <div class="text-base font-black text-emerald-400">${result.nextMilestone.daysLeft}</div>
                <div class="text-xs text-slate-500">${lang('claim_to_bonus_short')}</div>
            </div>
        </div>
        <div class="text-xs text-slate-500 mb-4">
            ${lang('claim_next_claim')}
            <span class="text-white font-medium">00:00 UTC</span> · ${_getTimeToMidnightUTC()}
        </div>
        <button onclick="closeClaimModal()"
            class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600
                   hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white transition-all">
            ${lang('claim_great_btn')}
        </button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// ВСПОМОГАТЕЛЬНЫЕ UI
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

        const colors = {
            'done':       'bg-emerald-500/25 border-emerald-500/50 text-emerald-400',
            'today':      'bg-cyan-500/20 border-cyan-400 text-cyan-400 ring-2 ring-cyan-400/30',
            'today-done': 'bg-emerald-500/25 border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/30',
            'missed':     'bg-red-500/10 border-red-700/30 text-red-500',
            'future':     'bg-slate-800/40 border-slate-700/30 text-slate-600',
        };
        const icons = {
            'done':'✓', 'today':'🧪', 'today-done':'✓', 'missed':'✗',
            'future': dayLabel.charAt(0).toUpperCase(),
        };
        return `
        <div class="flex flex-col items-center gap-1">
            <div class="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold ${colors[state]}">
                ${icons[state]}
            </div>
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
    modal.id        = 'claimModal';
    modal.className = 'claim-modal-overlay';
    modal.innerHTML = `
        <div class="claim-modal-box">
            <div class="claim-modal-header">
                <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:36px;height:36px;border-radius:10px;
                                background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(59,130,246,0.2));
                                border:1px solid rgba(6,182,212,0.3);
                                display:flex;align-items:center;justify-content:center;font-size:18px">🧪</div>
                    <div>
                        <div class="font-bold text-white text-sm" id="claimModalTitle">${lang('claim_title')}</div>
                        <div class="text-xs text-slate-500"        id="claimModalSubtitle">${lang('claim_updated_utc')}</div>
                    </div>
                </div>
                <button onclick="closeClaimModal()"
                    style="width:32px;height:32px;border-radius:8px;background:rgba(30,41,59,0.8);
                           border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;
                           justify-content:center;color:#94a3b8;cursor:pointer;transition:all 0.2s"
                    onmouseover="this.style.background='rgba(51,65,85,0.8)';this.style.color='white'"
                    onmouseout ="this.style.background='rgba(30,41,59,0.8)';this.style.color='#94a3b8'">
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

        /* ══════════════════════════════════════════════
           ОВЕРЛЕЙ
        ══════════════════════════════════════════════ */
        .claim-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .claim-modal-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        /* ══════════════════════════════════════════════
           ОКНО — flex-колонка, высота = 90vh (ПК)
        ══════════════════════════════════════════════ */
        .claim-modal-box {
            background: linear-gradient(145deg, #171f30 0%, #0c1220 100%);
            border: 1px solid rgba(99,179,237,0.1);
            border-radius: 20px;
            width: 100%;
            max-width: 860px;
            height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px) scale(0.97);
            transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
            box-shadow: 0 30px 80px rgba(0,0,0,0.7),
                        0 0 0 1px rgba(99,179,237,0.04);
        }
        .claim-modal-overlay.active .claim-modal-box {
            transform: translateY(0) scale(1);
        }

        /* ══════════════════════════════════════════════
           ШАПКА
        ══════════════════════════════════════════════ */
        .claim-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            flex-shrink: 0;
        }

        /* ══════════════════════════════════════════════
           ТЕЛО
        ══════════════════════════════════════════════ */
        #claimModalBody {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* ══════════════════════════════════════════════
           ДВУХКОЛОНОЧНАЯ СЕТКА
        ══════════════════════════════════════════════ */
        .claim-two-col {
            display: grid;
            grid-template-columns: 1fr 1px 1fr;
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        /* ══════════════════════════════════════════════
           КОЛОНКИ
        ══════════════════════════════════════════════ */
        .claim-left-col {
            padding: 16px 18px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-left-col::-webkit-scrollbar       { width: 3px; }
        .claim-left-col::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

        .claim-divider {
            background: rgba(255,255,255,0.05);
            width: 1px;
            flex-shrink: 0;
        }

        .claim-right-col {
            padding: 16px 18px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
        }
        .claim-right-col::-webkit-scrollbar       { width: 3px; }
        .claim-right-col::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

        /* ══════════════════════════════════════════════
           ФУТЕР
        ══════════════════════════════════════════════ */
        .claim-footer {
            padding: 10px 16px 14px;
            border-top: 1px solid rgba(255,255,255,0.04);
            flex-shrink: 0;
            background: linear-gradient(145deg, #171f30, #0c1220);
        }

        /* ══════════════════════════════════════════════
           КОМПОНЕНТЫ
        ══════════════════════════════════════════════ */
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

        .col-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ══════════════════════════════════════════════
           МОБИЛЬНЫЕ (≤ 640px)
        ══════════════════════════════════════════════ */
        @media (max-width: 640px) {
            .claim-modal-box {
                border-radius: 16px;
                height: auto;
                max-height: 92vh;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            #claimModalBody {
                display: block;
                overflow: visible;
            }
            .claim-two-col {
                display: block;
                overflow: visible;
            }
            .claim-left-col,
            .claim-right-col {
                overflow-y: visible;
                overflow-x: visible;
                padding: 14px 16px;
            }
            .claim-divider {
                width: 100%;
                height: 1px;
            }
            .claim-footer {
                position: sticky;
                bottom: 0;
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
            var m = new Date(); m.setUTCHours(24,0,0,0); return m - new Date();
        }
        function formatTime(ms) {
            if (ms <= 0) return '00:00:00';
            var s = Math.floor(ms / 1000);
            return [Math.floor(s/3600), Math.floor((s%3600)/60), s%60]
                .map(function(v){ return String(v).padStart(2,'0'); }).join(':');
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
                    '<span style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">' +
                        lang('claim_reset_in') +
                    '</span>' +
                    '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c">' +
                        timeStr +
                    '</span>' +
                '</div>' +
                '<span style="font-size:11px;font-family:monospace;font-weight:700;color:#fb923c" class="sm:hidden">' +
                    timeStr +
                '</span>';
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
        await new Promise(function(r){ setTimeout(r, 500); });
        attempts++;
    }
    var user = (window.auth && window.auth.currentUser) || window.currentUser;
    if (!user) return;
    var status = await getClaimStatus(user);
    if (!status) return;
    _applyClaimBtnVisual(status.canClaim);
}

window.ReagentsSystem  = { getClaimStatus, performClaim, getUTCDateString, calcReward,
                            getNextMilestone, getPassiveRewardInfo, checkAndAwardProfileBonus,
                            calcProfileBonus, CONFIG: REAGENTS_CONFIG };
window.openClaimModal  = window.openClaimModal;
window.closeClaimModal = window.closeClaimModal;
window.doClaim         = window.doClaim;

console.log('🧪 Reagents System v2.4 loaded (passive accumulation, 2-decimal precision)');
setTimeout(_checkClaimOnLoad, 2000);
setTimeout(_checkClaimOnLoad, 5000);

})();
