/**
 * ============================================
 * AirdropLab — Referral Modal v3
 * Вызывает applyReferralCodeFooter() из footer.js.
 * Нет дублирования логики. Поля как в футере.
 * ============================================
 */
(function () {
    'use strict';

    const AUTHOR_CODE = 'AL-SAKZ4M';
    const MODAL_ID    = 'alRefModal';
    let shown = false;

    /* ── Ждём footer.js + Firebase ─────────────── */
    function waitForReady(cb, limit = 15000) {
        const t0 = Date.now();
        const id = setInterval(() => {
            if (window.auth &&
                window.__authExports?.onAuthStateChanged &&
                window.__firestoreExports &&
                typeof window.applyReferralCodeFooter === 'function') {
                clearInterval(id); cb();
            } else if (Date.now() - t0 > limit) { clearInterval(id); }
        }, 300);
    }

    function bootstrap() {
        window.__authExports.onAuthStateChanged(window.auth, user => {
            if (user && !shown) setTimeout(() => checkUser(user), 2200);
        });
    }

    /* ── Проверка ──────────────────────────────── */
    async function checkUser(user) {
        if (shown) return;
        if (localStorage.getItem('rl_ref_done_' + user.uid)) return;

        const { doc, getDoc } = window.__firestoreExports;
        try {
            const snap = await getDoc(doc(window.db, 'users', user.uid));
            if (snap.exists()) {
                const d = snap.data();
                // Используем то же поле что и в footer.js
                if (d.invitedBy || d.refModalDismissed) {
                    localStorage.setItem('rl_ref_done_' + user.uid, '1');
                    return;
                }
            }
        } catch { return; }

        shown = true;
        injectStyles();
        renderModal();
    }

    /* ── Вызов footer-функции без дублирования ─
       1. Создаём temp #profileInviteCode input
       2. Вызываем applyReferralCodeFooter()
       3. Проверяем результат по полю invitedBy   */
    async function callFooterApply(code) {
        // Создаём временный input который читает applyReferralCodeFooter()
        let tempInp = document.getElementById('profileInviteCode');
        let created = false;
        if (!tempInp) {
            tempInp = document.createElement('input');
            tempInp.type = 'hidden';
            tempInp.id   = 'profileInviteCode';
            document.body.appendChild(tempInp);
            created = true;
        }
        const prevVal  = tempInp.value;
        tempInp.value  = code;

        return new Promise(resolve => {
            const origToast = window.showToast;
            let done = false;

            const cleanup = async () => {
                if (done) return;
                done = true;
                window.showToast = origToast;
                if (created && tempInp.parentNode) tempInp.remove();
                else if (!created) tempInp.value = prevVal;

                // Проверяем Firestore — поле invitedBy (как в footer.js)
                try {
                    const user = window.auth?.currentUser;
                    if (user) {
                        const { doc, getDoc } = window.__firestoreExports;
                        await delay(400); // даём время записи
                        const snap = await getDoc(doc(window.db, 'users', user.uid));
                        if (snap.exists() && snap.data().invitedBy) {
                            return resolve({ ok: true });
                        }
                    }
                } catch (_) {}
                resolve({ ok: false });
            };

            // Перехватываем showToast как сигнал завершения
            window.showToast = function (msg) {
                origToast?.call(this, msg);
                cleanup();
            };

            // Таймаут-страховка
            setTimeout(cleanup, 9000);

            // Вызываем функцию из footer.js — она сама пишет в Firestore
            window.applyReferralCodeFooter();
        });
    }

    const delay = ms => new Promise(r => setTimeout(r, ms));

    /* ── Рендер модалки ─────────────────────────── */
    function renderModal() {
        if (document.getElementById(MODAL_ID)) return;
        const el = document.createElement('div');
        el.id = MODAL_ID;
        el.className = 'alr-ov';
        el.innerHTML = `
        <canvas class="alr-cv" id="${MODAL_ID}_cv"></canvas>
        <div class="alr-card" id="${MODAL_ID}_card">
          <div class="alr-glow-border"></div>
          <div class="alr-inner">

            <!-- Иконка + заголовок -->
            <div class="alr-head">
              <div class="alr-icon-wrap">
                <div class="alr-ring r1"></div><div class="alr-ring r2"></div>
                <div class="alr-icon-core"><i class="fas fa-flask"></i></div>
              </div>
              <h2 class="alr-title">Добро пожаловать в<br><span class="alr-brand">AirdropLab</span>!</h2>
              <p class="alr-sub">Введите реферальный код того, кто вас пригласил,<br>или используйте код автора платформы</p>
            </div>

            <!-- Бонусы (50 новому / 25 другу — как в footer) -->
            <div class="alr-bonus">
              <div class="alr-bonus-chip">
                <i class="fas fa-vial"></i>
                <div><b>+50 RGT</b><span>вам</span></div>
              </div>
              <i class="fas fa-exchange-alt alr-bonus-arrow"></i>
              <div class="alr-bonus-chip alr-bonus-chip--b">
                <i class="fas fa-user-friends"></i>
                <div><b>+25 RGT</b><span>другу</span></div>
              </div>
            </div>

            <!-- Карточка автора -->
            <div class="alr-author" id="${MODAL_ID}_aut" onclick="window.__alrAuthor()">
              <div class="alr-aut-badge">⭐ Рекомендуется</div>
              <div class="alr-aut-left">
                <div class="alr-aut-ava"><i class="fas fa-user-astronaut"></i></div>
                <div>
                  <div class="alr-aut-lbl">Код автора платформы</div>
                  <div class="alr-aut-code">${AUTHOR_CODE}</div>
                </div>
              </div>
              <button class="alr-aut-btn" onclick="event.stopPropagation();window.__alrAuthor()">
                <i class="fas fa-check"></i> Использовать
              </button>
            </div>

            <!-- Разделитель -->
            <div class="alr-sep"><span>или введите свой</span></div>

            <!-- Поле ввода -->
            <div class="alr-inp-wrap" id="${MODAL_ID}_wrap">
              <i class="fas fa-key alr-inp-ico"></i>
              <input id="${MODAL_ID}_inp" type="text" class="alr-inp"
                placeholder="Реферальный код (AL-XXXXX)" maxlength="20" autocomplete="off"
                oninput="window.__alrInput(this)"
                onkeydown="if(event.key==='Enter')window.__alrSubmit()">
              <button class="alr-inp-x" id="${MODAL_ID}_x"
                onclick="window.__alrClear()" style="display:none">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <!-- Ошибка -->
            <div class="alr-err" id="${MODAL_ID}_err">
              <i class="fas fa-exclamation-circle"></i>
              <span id="${MODAL_ID}_errTxt"></span>
            </div>

            <!-- Кнопки -->
            <div class="alr-btns">
              <button class="alr-skip" onclick="window.__alrSkip()">Пропустить</button>
              <button class="alr-apply" id="${MODAL_ID}_apply" onclick="window.__alrSubmit()">
                <span>Применить код</span><i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <p class="alr-foot"><i class="fas fa-lock"></i> Реферальный код вводится только один раз</p>
          </div>
        </div>`;
        document.body.appendChild(el);
        initCanvas();
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('alr-ov--in')));
        el.addEventListener('mousedown', e => { if (e.target === el) shakeCard(); });
    }

    /* ── Canvas частицы ─────────────────────────── */
    function initCanvas() {
        const cv = document.getElementById(MODAL_ID + '_cv');
        if (!cv) return;
        const ctx = cv.getContext('2d');
        const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
        resize(); window.addEventListener('resize', resize);
        const dots = Array.from({ length: 20 }, () => ({
            x: Math.random() * innerWidth, y: innerHeight + Math.random() * 200,
            r: 1.5 + Math.random() * 3, s: .4 + Math.random() * .8,
            h: Math.random() > .5 ? 190 : 215, o: .1 + Math.random() * .3
        }));
        let raf;
        (function draw() {
            ctx.clearRect(0, 0, cv.width, cv.height);
            dots.forEach(d => {
                d.y -= d.s; d.x += Math.sin(d.y / 60) * .4;
                if (d.y < -10) { d.y = cv.height + 10; d.x = Math.random() * cv.width; }
                ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${d.h},90%,65%,${d.o})`; ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        })();
        setTimeout(() => cancelAnimationFrame(raf), 30000);
    }

    /* ── Хендлеры ───────────────────────────────── */
    window.__alrInput = el => {
        el.value = el.value.toUpperCase().replace(/[^A-Z0-9\-]/g, '');
        hideErr();
        const x = document.getElementById(MODAL_ID + '_x');
        if (x) x.style.display = el.value ? 'flex' : 'none';
    };

    window.__alrClear = () => {
        const inp = document.getElementById(MODAL_ID + '_inp');
        const x   = document.getElementById(MODAL_ID + '_x');
        if (inp) { inp.value = ''; inp.focus(); }
        if (x)   x.style.display = 'none';
        hideErr();
    };

    window.__alrAuthor = () => {
        const inp  = document.getElementById(MODAL_ID + '_inp');
        const x    = document.getElementById(MODAL_ID + '_x');
        const card = document.getElementById(MODAL_ID + '_aut');
        if (inp) inp.value = AUTHOR_CODE;
        if (x)   x.style.display = 'flex';
        if (card) { card.classList.add('alr-author--sel'); setTimeout(() => card.classList.remove('alr-author--sel'), 700); }
        hideErr();
    };

    window.__alrSubmit = async () => {
        const inp  = document.getElementById(MODAL_ID + '_inp');
        const code = inp?.value.trim().toUpperCase() || '';
        if (!code)             return showErr('Введите реферальный код');
        if (code.length < 4)   return showErr('Слишком короткий код');
        if (!code.startsWith('AL-')) return showErr('Код должен начинаться с AL-');

        const btn = document.getElementById(MODAL_ID + '_apply');
        if (!btn || btn.disabled) return;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Проверяем...</span>';

        const result = await callFooterApply(code);

        if (result.ok) {
            showSuccess(code);
        } else {
            btn.disabled = false;
            btn.innerHTML = '<span>Применить код</span><i class="fas fa-arrow-right"></i>';
            showErr('Код не найден или уже использован');
        }
    };

    window.__alrSkip = async () => {
        const user = window.auth?.currentUser;
        if (user) {
            localStorage.setItem('rl_ref_done_' + user.uid, '1');
            try {
                const { doc, setDoc } = window.__firestoreExports;
                await setDoc(doc(window.db, 'users', user.uid),
                    { refModalDismissed: true }, { merge: true });
            } catch (_) {}
        }
        closeModal();
    };

    window.__alrClose = closeModal;

    /* ── Экран успеха ───────────────────────────── */
    function showSuccess(code) {
        const user = window.auth?.currentUser;
        if (user) localStorage.setItem('rl_ref_done_' + user.uid, '1');

        const inner = document.querySelector(`#${MODAL_ID} .alr-inner`);
        if (!inner) return;
        inner.innerHTML = `
        <div class="alr-ok">
          <div class="alr-ok-ring">
            <div class="alr-ok-ico"><i class="fas fa-check"></i></div>
          </div>
          <h3>🎊 Код активирован!</h3>
          <p>Код <b style="color:#22d3ee">${code}</b> успешно применён</p>
          <div class="alr-ok-row"><i class="fas fa-vial"></i> +50 RGT начислено вам!</div>
          <div class="alr-ok-row alr-ok-row--b"><i class="fas fa-user-friends"></i> +25 RGT начислено другу</div>
          <button onclick="window.__alrClose()" class="alr-apply"
                  style="flex:none;width:100%;padding:15px;margin-top:12px">
            Начать исследование <i class="fas fa-rocket"></i>
          </button>
        </div>`;
        confetti();
        setTimeout(closeModal, 6000);
    }

    /* ── Конфетти ───────────────────────────────── */
    function confetti() {
        const colors = ['#22d3ee','#3b82f6','#10b981','#f59e0b','#8b5cf6'];
        for (let i = 0; i < 30; i++) setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'alr-conf';
            c.style.cssText = `left:${15+Math.random()*70}%;width:${5+Math.random()*6}px;height:${5+Math.random()*6}px;background:${colors[~~(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.4+Math.random()*1.4}s`;
            document.getElementById(MODAL_ID)?.appendChild(c);
            setTimeout(() => c.remove(), 3200);
        }, i * 65);
    }

    /* ── Утилиты ────────────────────────────────── */
    function showErr(msg) {
        const el  = document.getElementById(MODAL_ID + '_err');
        const txt = document.getElementById(MODAL_ID + '_errTxt');
        const wr  = document.getElementById(MODAL_ID + '_wrap');
        if (el && txt) { txt.textContent = msg; el.classList.add('alr-err--on'); }
        if (wr) { wr.classList.add('alr-wrap--err'); setTimeout(() => wr.classList.remove('alr-wrap--err'), 500); }
    }
    function hideErr() { document.getElementById(MODAL_ID + '_err')?.classList.remove('alr-err--on'); }
    function shakeCard() {
        const c = document.getElementById(MODAL_ID + '_card');
        if (!c || c.classList.contains('alr-shake')) return;
        c.classList.add('alr-shake'); setTimeout(() => c.classList.remove('alr-shake'), 500);
    }
    function closeModal() {
        const el = document.getElementById(MODAL_ID);
        if (!el) return;
        el.classList.add('alr-ov--out');
        setTimeout(() => el.remove(), 400);
    }

    /* ── Стили ──────────────────────────────────── */
    function injectStyles() {
        if (document.getElementById('alrCSS')) return;
        const s = document.createElement('style');
        s.id = 'alrCSS';
        s.textContent = `
.alr-ov{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0);backdrop-filter:blur(0px);transition:background .4s,backdrop-filter .4s}
.alr-ov--in{background:rgba(2,6,18,.93);backdrop-filter:blur(14px) saturate(1.3)}
.alr-ov--out{background:rgba(0,0,0,0)!important;backdrop-filter:none!important;pointer-events:none}
.alr-cv{position:absolute;inset:0;pointer-events:none}
.alr-card{position:relative;z-index:2;max-width:490px;width:100%;border-radius:28px;overflow:hidden;background:linear-gradient(150deg,#05090f,#0d1625 45%,#071018);transform:scale(.84) translateY(28px);opacity:0;transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .4s;box-shadow:0 0 0 1px rgba(34,211,238,.13),0 0 80px rgba(34,211,238,.06),0 50px 100px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.04)}
.alr-ov--in .alr-card{transform:scale(1) translateY(0);opacity:1}
.alr-ov--out .alr-card{transform:scale(.9) translateY(16px)!important;opacity:0!important}
.alr-glow-border{position:absolute;inset:-1px;border-radius:29px;z-index:0;overflow:hidden}
.alr-glow-border::before{content:'';position:absolute;inset:-60%;background:conic-gradient(transparent 0deg,transparent 30deg,rgba(34,211,238,.55) 70deg,rgba(59,130,246,.5) 110deg,transparent 150deg,transparent 200deg,rgba(16,185,129,.35) 240deg,transparent 280deg);animation:alrSpin 5s linear infinite}
.alr-glow-border::after{content:'';position:absolute;inset:1px;border-radius:28px;background:linear-gradient(150deg,#05090f,#0d1625 45%,#071018)}
@keyframes alrSpin{to{transform:rotate(360deg)}}
@keyframes alrShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(9px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
.alr-shake{animation:alrShake .5s ease}
.alr-inner{padding:36px 32px;position:relative;z-index:1}

/* Head */
.alr-head{text-align:center;margin-bottom:18px}
.alr-icon-wrap{position:relative;width:76px;height:76px;margin:0 auto 16px}
.alr-ring{position:absolute;inset:0;border-radius:50%;border:1.5px solid}
.r1{border-color:rgba(34,211,238,.25);animation:alrP 2.8s ease-in-out infinite}
.r2{inset:-9px;border-color:rgba(34,211,238,.1);animation:alrP 2.8s ease-in-out .45s infinite}
@keyframes alrP{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:.3;transform:scale(1.06)}}
.alr-icon-core{position:absolute;inset:9px;border-radius:50%;background:linear-gradient(135deg,rgba(34,211,238,.18),rgba(59,130,246,.22));border:1px solid rgba(34,211,238,.38);display:flex;align-items:center;justify-content:center;font-size:24px;color:#22d3ee;box-shadow:0 0 35px rgba(34,211,238,.18)}
.alr-title{font-size:1.45rem;font-weight:800;color:#f1f5f9;margin:0 0 8px;line-height:1.22;letter-spacing:-.02em}
.alr-brand{background:linear-gradient(90deg,#22d3ee,#60a5fa,#22d3ee);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:alrShimmer 3s linear infinite}
@keyframes alrShimmer{to{background-position:200% center}}
.alr-sub{color:#475569;font-size:.78rem;line-height:1.55;margin:0}

/* Bonus */
.alr-bonus{display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.18);border-radius:14px;padding:11px 16px;margin-bottom:16px}
.alr-bonus-chip{display:flex;align-items:center;gap:8px;flex:1;justify-content:center}
.alr-bonus-chip>i{font-size:17px;color:#10b981}
.alr-bonus-chip--b>i{color:#22d3ee}
.alr-bonus-chip b{display:block;font-size:.95rem;font-weight:800;color:#34d399;line-height:1}
.alr-bonus-chip--b b{color:#22d3ee}
.alr-bonus-chip span{display:block;font-size:.58rem;color:#6ee7b7;margin-top:2px}
.alr-bonus-arrow{color:#1e3040;font-size:10px}

/* Author */
.alr-author{background:linear-gradient(135deg,rgba(34,211,238,.07),rgba(59,130,246,.05));border:1px solid rgba(34,211,238,.2);border-radius:16px;padding:16px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;position:relative;cursor:pointer;flex-wrap:wrap;transition:all .25s}
.alr-author:hover{border-color:rgba(34,211,238,.42);background:linear-gradient(135deg,rgba(34,211,238,.11),rgba(59,130,246,.07));transform:translateY(-2px);box-shadow:0 8px 28px rgba(34,211,238,.1)}
.alr-author--sel{border-color:rgba(16,185,129,.55)!important;background:linear-gradient(135deg,rgba(16,185,129,.1),rgba(5,150,105,.07))!important}
.alr-aut-badge{position:absolute;top:-11px;left:14px;background:linear-gradient(90deg,#22d3ee,#3b82f6);color:#050c1a;font-size:.57rem;font-weight:900;padding:3px 11px;border-radius:20px;letter-spacing:.07em;text-transform:uppercase}
.alr-aut-left{display:flex;align-items:center;gap:12px}
.alr-aut-ava{width:44px;height:44px;flex-shrink:0;border-radius:12px;background:linear-gradient(135deg,rgba(34,211,238,.18),rgba(59,130,246,.18));border:1px solid rgba(34,211,238,.35);display:flex;align-items:center;justify-content:center;font-size:20px;color:#22d3ee}
.alr-aut-lbl{font-size:.65rem;color:#22d3ee;font-weight:700;margin-bottom:3px;letter-spacing:.04em}
.alr-aut-code{font-family:'Courier New',monospace;font-size:1.05rem;font-weight:900;color:#f1f5f9;letter-spacing:.1em}
.alr-aut-btn{background:linear-gradient(135deg,#22d3ee,#0891b2);color:#040c18;border:none;padding:9px 16px;border-radius:10px;font-size:.77rem;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 4px 16px rgba(34,211,238,.22);transition:transform .2s,box-shadow .2s}
.alr-aut-btn:hover{transform:translateY(-1px);box-shadow:0 7px 22px rgba(34,211,238,.38)}

/* Sep */
.alr-sep{display:flex;align-items:center;gap:10px;margin-bottom:13px}
.alr-sep::before,.alr-sep::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(51,65,85,.5),transparent)}
.alr-sep span{font-size:.67rem;color:#2d3f52;white-space:nowrap}

/* Input */
.alr-inp-wrap{position:relative;margin-bottom:6px}
.alr-inp-wrap::after{content:'';position:absolute;bottom:-1px;left:50%;right:50%;height:2px;background:linear-gradient(90deg,#22d3ee,#3b82f6);border-radius:2px;transition:left .3s,right .3s;pointer-events:none}
.alr-inp-wrap:focus-within::after{left:0;right:0}
.alr-wrap--err::after{background:linear-gradient(90deg,#ef4444,#f87171)!important;left:0!important;right:0!important}
@keyframes alrWS{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}
.alr-wrap--err{animation:alrWS .4s ease}
.alr-inp-ico{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#1e3040;font-size:12px;pointer-events:none;z-index:1;transition:color .25s}
.alr-inp-wrap:focus-within .alr-inp-ico{color:#22d3ee}
.alr-inp{width:100%;box-sizing:border-box;background:rgba(4,8,20,.95);border:1px solid rgba(30,48,64,.8);border-radius:13px;padding:14px 40px;color:#f1f5f9;font-size:.9rem;font-family:'Courier New',monospace;letter-spacing:.07em;outline:none;transition:border-color .2s}
.alr-inp:focus{border-color:rgba(34,211,238,.35)}
.alr-inp::placeholder{color:#0d1e2c;font-family:'Inter',sans-serif;letter-spacing:0;font-size:.78rem}
.alr-inp-x{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:rgba(51,65,85,.45);border:none;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;transition:all .2s}
.alr-inp-x:hover{background:rgba(239,68,68,.28);color:#f87171}

/* Err */
.alr-err{display:none;align-items:center;gap:6px;font-size:.73rem;color:#f87171;padding:0 4px;min-height:22px;margin-bottom:2px}
.alr-err--on{display:flex}

/* Buttons */
.alr-btns{display:flex;gap:10px;margin-top:16px}
.alr-skip{flex:1;padding:13px;background:rgba(4,8,20,.8);border:1px solid rgba(30,48,64,.7);border-radius:13px;color:#334155;font-size:.83rem;font-weight:600;cursor:pointer;transition:all .2s}
.alr-skip:hover{border-color:rgba(51,65,85,.9);color:#64748b}
.alr-apply{flex:2;padding:13px;border:none;border-radius:13px;background:linear-gradient(130deg,#22d3ee,#3b82f6);color:#040c18;font-size:.83rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 24px rgba(34,211,238,.22);transition:transform .2s,box-shadow .2s,filter .2s}
.alr-apply:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 9px 32px rgba(34,211,238,.38);filter:brightness(1.07)}
.alr-apply:disabled{opacity:.6;cursor:not-allowed}
.alr-foot{text-align:center;color:#1a2e40;font-size:.66rem;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:5px}

/* Success */
.alr-ok{text-align:center;padding:8px 0}
.alr-ok-ring{width:86px;height:86px;margin:0 auto 18px;position:relative;display:flex;align-items:center;justify-content:center}
.alr-ok-ring::before,.alr-ok-ring::after{content:'';position:absolute;border-radius:50%;border:1.5px solid rgba(16,185,129,.28);animation:alrP 2s ease-in-out infinite}
.alr-ok-ring::before{inset:0}
.alr-ok-ring::after{inset:-10px;border-color:rgba(16,185,129,.13);animation-delay:.35s}
.alr-ok-ico{width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,rgba(16,185,129,.22),rgba(5,150,105,.18));border:2px solid rgba(16,185,129,.45);display:flex;align-items:center;justify-content:center;font-size:26px;color:#10b981;box-shadow:0 0 45px rgba(16,185,129,.28);animation:alrPop .6s cubic-bezier(.34,1.56,.64,1)}
@keyframes alrPop{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1);opacity:1}}
.alr-ok h3{font-size:1.35rem;font-weight:800;color:#f1f5f9;margin:0 0 8px}
.alr-ok p{color:#475569;font-size:.83rem;margin:0 0 14px}
.alr-ok-row{background:rgba(16,185,129,.09);border:1px solid rgba(16,185,129,.22);border-radius:11px;padding:10px 16px;margin-bottom:8px;font-size:.79rem;font-weight:700;color:#34d399;display:flex;align-items:center;justify-content:center;gap:8px}
.alr-ok-row--b{background:rgba(34,211,238,.07);border-color:rgba(34,211,238,.2);color:#22d3ee}

/* Confetti */
@keyframes alrFly{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(-65vh) rotate(800deg) scale(0);opacity:0}}
.alr-conf{position:fixed;bottom:40%;z-index:100001;pointer-events:none;animation:alrFly ease-out forwards}

@media(max-width:480px){
  .alr-inner{padding:24px 18px}
  .alr-btns{flex-direction:column}
  .alr-apply,.alr-skip{flex:none;width:100%}
  .alr-author{flex-direction:column;align-items:flex-start}
}
        `;
        document.head.appendChild(s);
    }

    /* ── Entry ──────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForReady(bootstrap));
    } else {
        waitForReady(bootstrap);
    }
})();
