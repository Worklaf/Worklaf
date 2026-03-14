/**
 * ============================================
 * AirdropLab — Referral Modal v2.5 (Fixed)
 * referral-modal.js
 * ============================================
 */
(function () {
    'use strict';

    const AUTHOR_CODE   = 'AL-SAKZ4M';
    const MODAL_ID      = 'alRefModal';
    let shown = false;

    // Ожидание готовности Firebase и функций футера
    function waitForDependencies(cb, limit = 15000) {
        const t0 = Date.now();
        const id = setInterval(() => {
            const hasFirebase = window.auth && window.db && window.__firestoreExports;
            const hasFooterFn = typeof window.applyReferralCodeFooter === 'function';
            
            if (hasFirebase && hasFooterFn) {
                clearInterval(id); cb();
            } else if (Date.now() - t0 > limit) {
                clearInterval(id);
            }
        }, 300);
    }

    function bootstrap() {
        const { onAuthStateChanged } = window.__authExports || {};
        if (!onAuthStateChanged) return;
        
        onAuthStateChanged(window.auth, user => {
            if (user && !shown) {
                // Проверка через 2.2 секунды после входа
                setTimeout(() => checkUser(user), 2200);
            }
        });
    }

    async function checkUser(user) {
        if (shown) return;
        if (localStorage.getItem('rl_ref_done_' + user.uid)) return;

        const { doc, getDoc } = window.__firestoreExports;
        try {
            const snap = await getDoc(doc(window.db, 'users', user.uid));
            if (!snap.exists()) return;
            const d = snap.data();
            
            // Проверяем именно твою переменную invitedBy
            if (d.invitedBy || d.refModalDismissed || d.referralCodeUsed) {
                localStorage.setItem('rl_ref_done_' + user.uid, '1');
                return;
            }
        } catch (e) { return; }

        shown = true;
        injectStyles();
        renderModal();
    }

    // ВЫЗОВ ОРИГИНАЛЬНОЙ ФУНКЦИИ ИЗ ФУТЕРА
    async function triggerFooterApply(code) {
        // Создаем временный скрытый элемент, который ожидает функция футера
        let hiddenInput = document.getElementById('profileInviteCode');
        let createdTmp = false;

        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.id = 'profileInviteCode';
            hiddenInput.style.display = 'none';
            document.body.appendChild(hiddenInput);
            createdTmp = true;
        }

        hiddenInput.value = code;

        try {
            // Вызываем твою функцию из footer.js
            await window.applyReferralCodeFooter();
            
            // Если всё ок, показываем успех в нашей модалке
            showSuccess(code);
        } catch (e) {
            throw e;
        } finally {
            if (createdTmp) hiddenInput.remove();
        }
    }

    /* ── Рендер модалки ─────────────────────────── */
    function renderModal() {
        const el = document.createElement('div');
        el.id = MODAL_ID;
        el.className = 'alr-overlay';
        el.innerHTML = `
        <canvas class="alr-canvas" id="${MODAL_ID}_cv"></canvas>
        <div class="alr-card" id="${MODAL_ID}_card">
          <div class="alr-glow-border"></div>
          <div class="alr-inner">
            <div class="alr-header">
              <div class="alr-icon-wrap">
                <div class="alr-ring alr-ring--1"></div>
                <div class="alr-ring alr-ring--2"></div>
                <div class="alr-icon-core"><i class="fas fa-user-plus"></i></div>
              </div>
              <h2 class="alr-title">Активация <span class="alr-brand">Бонуса</span></h2>
              <p class="alr-desc">Введите код приглашения для получения стартовых реагентов</p>
            </div>

            <div class="alr-bonus-grid">
              <div class="alr-bonus-card">
                 <div class="abc-val">+50</div>
                 <div class="abc-lbl">вам</div>
              </div>
              <div class="abc-sep"><i class="fas fa-plus"></i></div>
              <div class="alr-bonus-card">
                 <div class="abc-val">+25</div>
                 <div class="abc-lbl">другу</div>
              </div>
            </div>

            <div class="alr-author-box" onclick="window.__alrAuthor()">
              <div class="alr-author-info">
                <div class="alr-author-ava"><i class="fas fa-crown"></i></div>
                <div>
                  <div class="alr-author-title">Код автора (рекомендовано)</div>
                  <div class="alr-author-code">${AUTHOR_CODE}</div>
                </div>
              </div>
              <div class="alr-author-check"><i class="fas fa-magic"></i></div>
            </div>

            <div class="alr-inp-field">
              <input id="${MODAL_ID}_inp" type="text" class="alr-input-main" placeholder="Введите код (AL-XXXXX)" maxlength="20" oninput="this.value = this.value.toUpperCase()">
              <button class="alr-submit-btn" id="${MODAL_ID}_apply" onclick="window.__alrSubmit()">
                <i class="fas fa-check"></i>
              </button>
            </div>

            <div class="alr-err" id="${MODAL_ID}_err"></div>

            <div class="alr-footer-btns">
              <button class="alr-btn-skip" onclick="window.__alrSkip()">Мне не нужен бонус</button>
            </div>
          </div>
        </div>`;

        document.body.appendChild(el);
        initParticles();
        requestAnimationFrame(() => el.classList.add('alr-overlay--on'));
    }

    window.__alrAuthor = () => {
        const inp = document.getElementById(MODAL_ID + '_inp');
        if (inp) {
            inp.value = AUTHOR_CODE;
            inp.focus();
            // Подсвечиваем инпут
            inp.style.borderColor = '#10b981';
            setTimeout(() => inp.style.borderColor = '', 1000);
        }
    };

    window.__alrSubmit = async () => {
        const inp = document.getElementById(MODAL_ID + '_inp');
        const code = inp?.value.trim().toUpperCase() || '';
        const btn = document.getElementById(MODAL_ID + '_apply');
        const err = document.getElementById(MODAL_ID + '_err');

        if (!code.startsWith('AL-')) {
            err.textContent = 'Код должен начинаться с AL-';
            err.style.display = 'block';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            await triggerFooterApply(code);
        } catch (e) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            err.textContent = e.message || 'Ошибка активации';
            err.style.display = 'block';
        }
    };

    window.__alrSkip = async () => {
        const user = window.auth?.currentUser;
        if (user) {
            localStorage.setItem('rl_ref_done_' + user.uid, '1');
            try {
                const { doc, setDoc } = window.__firestoreExports;
                await setDoc(doc(window.db, 'users', user.uid), { refModalDismissed: true }, { merge: true });
            } catch (_) {}
        }
        closeModal();
    };

    function showSuccess(code) {
        const card = document.getElementById(MODAL_ID + '_card');
        card.innerHTML = `
            <div class="alr-success-screen">
                <div class="alr-success-icon"><i class="fas fa-check"></i></div>
                <h2 class="alr-title">Успешно!</h2>
                <p class="alr-desc">Код <b>${code}</b> активирован.<br>Реагенты начислены.</p>
                <button class="alr-apply-full" onclick="window.__alrClose()">Начать работу</button>
            </div>
        `;
        // Вызываем конфетти если есть
        setTimeout(closeModal, 4000);
    }

    window.__alrClose = closeModal;
    function closeModal() {
        const el = document.getElementById(MODAL_ID);
        if (el) {
            el.classList.remove('alr-overlay--on');
            setTimeout(() => el.remove(), 400);
        }
    }

    function initParticles() {
        const cv = document.getElementById(MODAL_ID + '_cv');
        const ctx = cv.getContext('2d');
        let w, h, dots = [];
        const resize = () => { w = cv.width = window.innerWidth; h = cv.height = window.innerHeight; };
        window.addEventListener('resize', resize); resize();
        for(let i=0; i<25; i++) dots.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+1, s:Math.random()*0.5+0.2});
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = 'rgba(34,211,238,0.3)';
            dots.forEach(d => {
                d.y -= d.s; if(d.y < -10) d.y = h+10;
                ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2); ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    function injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
        .alr-overlay { position:fixed; inset:0; z-index:99999; display:flex; align-items:center; justify-content:center; background:rgba(2,6,18,0); backdrop-filter:blur(0px); transition: 0.4s; }
        .alr-overlay--on { background:rgba(2,6,18,0.9); backdrop-filter:blur(12px); }
        .alr-canvas { position:absolute; inset:0; pointer-events:none; }
        .alr-card { position:relative; width:100%; max-width:420px; background:#0f172a; border-radius:24px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); transform:scale(0.9); opacity:0; transition:0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .alr-overlay--on .alr-card { transform:scale(1); opacity:1; }
        .alr-inner { padding:32px; text-align:center; }
        .alr-icon-wrap { position:relative; width:64px; height:64px; margin:0 auto 20px; background:linear-gradient(135deg,#22d3ee,#3b82f6); border-radius:18px; display:flex; align-items:center; justify-content:center; color:#0f172a; font-size:24px; }
        .alr-ring { position:absolute; inset:-8px; border:2px solid rgba(34,211,238,0.2); border-radius:24px; animation: alrPulse 2s infinite; }
        @keyframes alrPulse { 0% { transform:scale(1); opacity:1; } 100% { transform:scale(1.2); opacity:0; } }
        .alr-title { font-size:24px; font-weight:800; color:#fff; margin-bottom:8px; }
        .alr-brand { color:#22d3ee; }
        .alr-desc { font-size:14px; color:#94a3b8; margin-bottom:24px; }
        .alr-bonus-grid { display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:24px; }
        .alr-bonus-card { background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:12px; border-radius:16px; min-width:80px; }
        .abc-val { font-size:20px; font-weight:800; color:#10b981; }
        .abc-lbl { font-size:11px; color:#6ee7b7; text-transform:uppercase; }
        .abc-sep { color:#334155; }
        .alr-author-box { display:flex; align-items:center; justify-content:space-between; background:rgba(30,41,59,0.5); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:20px; cursor:pointer; margin-bottom:20px; transition:0.2s; }
        .alr-author-box:hover { background:rgba(30,41,59,0.8); border-color:#22d3ee; }
        .alr-author-info { display:flex; align-items:center; gap:12px; text-align:left; }
        .alr-author-ava { width:40px; height:40px; background:#1e293b; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#f59e0b; }
        .alr-author-title { font-size:11px; color:#64748b; }
        .alr-author-code { font-size:16px; font-weight:700; color:#fff; font-family:monospace; }
        .alr-author-check { color:#22d3ee; font-size:18px; }
        .alr-inp-field { position:relative; display:flex; gap:8px; }
        .alr-input-main { flex:1; background:#020617; border:1px solid #1e293b; border-radius:14px; padding:14px 18px; color:#fff; font-family:monospace; font-size:16px; outline:none; }
        .alr-input-main:focus { border-color:#22d3ee; }
        .alr-submit-btn { width:52px; background:#22d3ee; color:#0f172a; border-radius:14px; border:none; font-size:18px; cursor:pointer; }
        .alr-err { display:none; color:#ef4444; font-size:12px; margin-top:8px; }
        .alr-footer-btns { margin-top:20px; }
        .alr-btn-skip { background:none; border:none; color:#475569; font-size:13px; cursor:pointer; text-decoration:underline; }
        .alr-success-screen { padding:40px 20px; }
        .alr-success-icon { width:80px; height:80px; background:#10b981; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:40px; margin:0 auto 20px; }
        .alr-apply-full { width:100%; background:#10b981; color:#fff; padding:16px; border-radius:16px; border:none; font-weight:700; cursor:pointer; margin-top:20px; }
        `;
        document.head.appendChild(s);
    }

    waitForDependencies(bootstrap);
})();
