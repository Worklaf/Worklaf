// ============================================================
// referral-prompt.js — Модальное окно реферального кода
// Подключение: <script src="referral-prompt.js"></script> (после footer.js)
// ============================================================

(function () {
  'use strict';

  const AUTHOR_REF_CODE = 'AL-SAKZ4M';
  const REF_PROMPTED_KEY = 'airdroplab_ref_prompted';

  // Ждём Firebase auth
  function waitForAuth(cb) {
    const check = setInterval(function () {
      if (window.__authExports && window.auth) {
        clearInterval(check);
        const { onAuthStateChanged } = window.__authExports;
        onAuthStateChanged(window.auth, cb);
      }
    }, 300);
  }

  waitForAuth(async function (user) {
    if (!user) return;

    // Проверяем — уже вводил код?
    const prompted = localStorage.getItem(REF_PROMPTED_KEY + '_' + user.uid);
    if (prompted) return;

    // Проверяем в Firestore
    try {
      const { doc, getDoc } = window.__firestoreExports;
      const userRef = doc(window.db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        // Уже ввёл код или уже показывали
        if (data.referredBy || data.refPromptDismissed) {
          localStorage.setItem(REF_PROMPTED_KEY + '_' + user.uid, '1');
          return;
        }
      }
    } catch (e) {
      console.error('Referral check error:', e);
    }

    // Показываем окно с небольшой задержкой
    setTimeout(function () {
      showReferralModal(user.uid);
    }, 2000);
  });

  // ─── Показать модалку ───
  function showReferralModal(uid) {
    if (document.getElementById('referralPromptModal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'referralPromptModal';
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:10001;
      background:rgba(0,0,0,0.85); backdrop-filter:blur(8px);
      display:flex; align-items:center; justify-content:center;
      padding:16px; opacity:0; transition:opacity 0.4s ease;
    `;

    overlay.innerHTML = `
      <div id="refModalBox" style="
        background:linear-gradient(145deg,#1e2538,#151b2b);
        border:1px solid rgba(34,211,238,0.25);
        border-radius:24px; width:100%; max-width:480px;
        box-shadow:0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,211,238,0.08);
        transform:scale(0.9) translateY(20px);
        transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
        overflow:hidden;
      ">

        <!-- Шапка -->
        <div style="
          position:relative; padding:32px 28px 24px;
          background:linear-gradient(135deg,rgba(34,211,238,0.08),rgba(59,130,246,0.06));
          border-bottom:1px solid rgba(34,211,238,0.15);
          text-align:center;
        ">
          <!-- Иконка -->
          <div style="
            width:72px; height:72px; margin:0 auto 16px;
            background:linear-gradient(135deg,rgba(34,211,238,0.15),rgba(59,130,246,0.15));
            border:2px solid rgba(34,211,238,0.3);
            border-radius:20px; display:flex; align-items:center; justify-content:center;
            box-shadow:0 0 30px rgba(34,211,238,0.15);
          ">
            <i class="fas fa-user-plus" style="font-size:28px; color:#22d3ee;"></i>
          </div>

          <h2 style="
            font-size:1.35rem; font-weight:800; color:#f1f5f9;
            margin:0 0 6px;
          ">🎉 Добро пожаловать в AirdropLab!</h2>

          <p style="
            font-size:0.85rem; color:#94a3b8; margin:0;
            line-height:1.5;
          ">
            Если вас пригласил друг — введите его реферальный код
          </p>
        </div>

        <!-- Тело -->
        <div style="padding:24px 28px;">

          <!-- Поле ввода -->
          <div style="margin-bottom:16px;">
            <label style="
              display:block; font-size:0.8rem; font-weight:600;
              color:#94a3b8; margin-bottom:8px;
            ">Реферальный код</label>
            <div style="position:relative;">
              <i class="fas fa-ticket-alt" style="
                position:absolute; left:14px; top:50%; transform:translateY(-50%);
                color:#475569; font-size:14px;
              "></i>
              <input type="text" id="refCodeInput"
                placeholder="Например: AL-XXXXX"
                autocomplete="off"
                style="
                  width:100%; box-sizing:border-box;
                  background:rgba(15,23,42,0.8);
                  border:1px solid rgba(71,85,105,0.5);
                  border-radius:14px;
                  padding:14px 16px 14px 42px;
                  font-size:1rem; font-weight:600; font-family:'Courier New',monospace;
                  color:#f1f5f9; letter-spacing:2px; text-transform:uppercase;
                  outline:none; transition:border-color 0.3s;
                "
                onfocus="this.style.borderColor='rgba(34,211,238,0.5)'"
                onblur="this.style.borderColor='rgba(71,85,105,0.5)'"
              >
            </div>
            <p id="refCodeError" style="
              font-size:0.75rem; color:#ef4444; margin:6px 0 0; display:none;
            "></p>
          </div>

          <!-- Блок «Код автора» -->
          <div style="
            background:linear-gradient(135deg,rgba(34,211,238,0.06),rgba(59,130,246,0.04));
            border:1px solid rgba(34,211,238,0.2);
            border-radius:14px; padding:14px 16px;
            margin-bottom:20px;
          ">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
              <div>
                <div style="font-size:0.7rem; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">
                  Код автора AirdropLab
                </div>
                <code style="
                  font-size:1.1rem; font-weight:700; color:#22d3ee;
                  letter-spacing:2px; font-family:'Courier New',monospace;
                ">${AUTHOR_REF_CODE}</code>
              </div>
              <button type="button" id="useAuthorCodeBtn" style="
                background:linear-gradient(135deg,#0891b2,#0e7490);
                border:1px solid rgba(34,211,238,0.4);
                border-radius:10px; padding:8px 16px;
                font-size:0.8rem; font-weight:700; color:#fff;
                cursor:pointer; transition:all 0.3s; white-space:nowrap;
                box-shadow:0 4px 15px rgba(8,145,178,0.3);
              "
              onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(8,145,178,0.4)'"
              onmouseout="this.style.transform='';this.style.boxShadow='0 4px 15px rgba(8,145,178,0.3)'"
              >
                <i class="fas fa-magic" style="margin-right:6px;"></i>Использовать
              </button>
            </div>
          </div>

          <!-- Кнопки -->
          <div style="display:flex; gap:10px;">
            <button type="button" id="refSkipBtn" style="
              flex:1; background:rgba(30,41,59,0.8);
              border:1px solid rgba(71,85,105,0.5);
              border-radius:12px; padding:12px;
              font-size:0.85rem; font-weight:600; color:#94a3b8;
              cursor:pointer; transition:all 0.3s;
            "
            onmouseover="this.style.background='rgba(51,65,85,0.8)';this.style.color='#f1f5f9'"
            onmouseout="this.style.background='rgba(30,41,59,0.8)';this.style.color='#94a3b8'"
            >Пропустить</button>

            <button type="button" id="refSubmitBtn" style="
              flex:1;
              background:linear-gradient(135deg,#3b82f6,#2563eb);
              border:1px solid rgba(59,130,246,0.5);
              border-radius:12px; padding:12px;
              font-size:0.85rem; font-weight:700; color:#fff;
              cursor:pointer; transition:all 0.3s;
              box-shadow:0 4px 15px rgba(59,130,246,0.3);
            "
            onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(59,130,246,0.4)'"
            onmouseout="this.style.transform='';this.style.boxShadow='0 4px 15px rgba(59,130,246,0.3)'"
            >
              <i class="fas fa-check" style="margin-right:6px;"></i>Применить код
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Анимация появления
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
        document.getElementById('refModalBox').style.transform = 'scale(1) translateY(0)';
      });
    });

    // ─── Обработчики ───
    document.getElementById('useAuthorCodeBtn').onclick = function () {
      document.getElementById('refCodeInput').value = AUTHOR_REF_CODE;
      document.getElementById('refCodeInput').style.borderColor = 'rgba(34,211,238,0.5)';
      hideError();
    };

    document.getElementById('refSkipBtn').onclick = function () {
      dismissModal(uid);
    };

    document.getElementById('refSubmitBtn').onclick = function () {
      submitCode(uid);
    };

    document.getElementById('refCodeInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitCode(uid);
      }
    });
  }

  // ─── Применить код ───
  async function submitCode(uid) {
    const input = document.getElementById('refCodeInput');
    const code = input.value.trim().toUpperCase();
    const errorEl = document.getElementById('refCodeError');
    const btn = document.getElementById('refSubmitBtn');

    if (!code) {
      showError('Введите реферальный код');
      return;
    }

    if (code.length < 4) {
      showError('Код слишком короткий');
      return;
    }

    // Блокируем кнопку
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:6px;"></i>Проверяем...';

    try {
      const { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, increment } = window.__firestoreExports;

      // Ищем владельца кода
      const q = query(collection(window.db, 'users'), where('referralCode', '==', code));
      const snap = await getDocs(q);

      if (snap.empty) {
        showError('Код не найден. Проверьте и попробуйте ещё раз');
        resetBtn();
        return;
      }

      let referrerUid = null;
      snap.forEach(function (d) { referrerUid = d.id; });

      // Нельзя ввести свой код
      if (referrerUid === uid) {
        showError('Нельзя использовать свой собственный код');
        resetBtn();
        return;
      }

      // Сохраняем в профиль
      const userRef = doc(window.db, 'users', uid);
      await setDoc(userRef, {
        referredBy: code,
        referredByUid: referrerUid,
        referredAt: new Date()
      }, { merge: true });

      // Увеличиваем счётчик у реферера
      const referrerRef = doc(window.db, 'users', referrerUid);
      await updateDoc(referrerRef, {
        invitedCount: increment(1)
      });

      // Закрываем
      localStorage.setItem(REF_PROMPTED_KEY + '_' + uid, '1');
      showSuccess();

    } catch (e) {
      console.error('Referral submit error:', e);
      showError('Произошла ошибка. Попробуйте позже');
      resetBtn();
    }
  }

  function resetBtn() {
    const btn = document.getElementById('refSubmitBtn');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check" style="margin-right:6px;"></i>Применить код';
    }
  }

  function showError(msg) {
    const el = document.getElementById('refCodeError');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
    const input = document.getElementById('refCodeInput');
    if (input) input.style.borderColor = 'rgba(239,68,68,0.5)';
  }

  function hideError() {
    const el = document.getElementById('refCodeError');
    if (el) el.style.display = 'none';
  }

  // ─── Успех ───
  function showSuccess() {
    const box = document.getElementById('refModalBox');
    if (!box) return;

    box.innerHTML = `
      <div style="padding:48px 28px; text-align:center;">
        <div style="
          width:80px; height:80px; margin:0 auto 20px;
          background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.15));
          border:2px solid rgba(16,185,129,0.4);
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          animation:refSuccessPop 0.5s ease;
        ">
          <i class="fas fa-check" style="font-size:32px; color:#10b981;"></i>
        </div>
        <h3 style="font-size:1.3rem; font-weight:800; color:#f1f5f9; margin:0 0 8px;">
          Код принят! 🎉
        </h3>
        <p style="font-size:0.9rem; color:#94a3b8; margin:0 0 24px; line-height:1.5;">
          Реферальный код успешно привязан к вашему аккаунту
        </p>
        <button type="button" onclick="document.getElementById('referralPromptModal').remove()" style="
          background:linear-gradient(135deg,#10b981,#059669);
          border:none; border-radius:12px; padding:12px 32px;
          font-size:0.9rem; font-weight:700; color:#fff;
          cursor:pointer; transition:all 0.3s;
          box-shadow:0 4px 15px rgba(16,185,129,0.3);
        ">
          Отлично, начнём!
        </button>
      </div>
    `;

    if (typeof window.showToast === 'function') {
      window.showToast('Реферальный код привязан!');
    }
  }

  // ─── Пропустить ───
  async function dismissModal(uid) {
    localStorage.setItem(REF_PROMPTED_KEY + '_' + uid, '1');

    try {
      const { doc, setDoc } = window.__firestoreExports;
      await setDoc(doc(window.db, 'users', uid), {
        refPromptDismissed: true
      }, { merge: true });
    } catch (e) {
      console.error('Dismiss error:', e);
    }

    closeModal();
  }

  function closeModal() {
    const overlay = document.getElementById('referralPromptModal');
    if (!overlay) return;
    overlay.style.opacity = '0';
    const box = document.getElementById('refModalBox');
    if (box) box.style.transform = 'scale(0.9) translateY(20px)';
    setTimeout(function () { overlay.remove(); }, 400);
  }

  // ─── CSS анимация ───
  const style = document.createElement('style');
  style.textContent = `
    @keyframes refSuccessPop {
      0%   { transform: scale(0.5); opacity: 0; }
      60%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

})();
