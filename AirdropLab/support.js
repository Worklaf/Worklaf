/* -------------------------------------------------
   support.js – поддержка (Support)
   ------------------------------------------------- */
'use strict';

/* ---------- 0️⃣ Константы и переменные ---------- */
const SUPPORT_COLLECTION = "feedbacks";          // одна и та же коллекция, что и у отзывов
let supportUnsubscribe = null;                  // слушатель текущего пользователя
let supportMessages   = [];                     // массив сообщений типа "support"
let unreadSupportCount = 0;                     // количество новых (непрочитанных) обращений

/* ---------- 1️⃣ Открытие списка (верхняя иконка) ---------- */
window.openSupportListModal = function () {
    // Если пользователь не авторизован – попросим войти
    if (!currentUser) {
        footerShowToast(t('login'));   // сообщение «Войдите»
        openLoginModal();              // ваш уже существующий модал входа
        return;
    }

    document.getElementById('supportListModal').classList.add('active');
    renderSupportList();               // отрисуем, если уже есть сообщения
};

window.closeSupportListModal = function () {
    document.getElementById('supportListModal').classList.remove('active');
};

/* ---------- 2️⃣ Слушатель сообщений (для текущего пользователя) ---------- */
function initSupportListener(uid) {
    if (supportUnsubscribe) supportUnsubscribe();   // отписываемся от старого

    const q = query(
        collection(db, SUPPORT_COLLECTION),
        where("type", "==", "support"),
        where("userId", "==", uid)
    );

    supportUnsubscribe = onSnapshot(q, snap => {
        supportMessages = snap.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }).sort((a, b) => (b.createdAt?.toDate() || new Date()) -
                         (a.createdAt?.toDate() || new Date()));

        // считаем непрочитанные (admin ещё не прочитал)
        unreadSupportCount = supportMessages.filter(m => !m.readByAdmin).length;
        updateSupportBadge();

        // если сейчас открыт список – перерисуем UI
        const list = document.getElementById('supportListModal');
        if (list && list.classList.contains('active')) renderSupportList();
    });
}

/* ---------- 3️⃣ Обновление бейджика ---------- */
function updateSupportBadge() {
    const badge = document.getElementById('supportBadge');
    if (!badge) return;
    if (unreadSupportCount > 0) {
        badge.textContent = unreadSupportCount > 99 ? '99+' : unreadSupportCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

/* ---------- 4️⃣ Рендер списка обращений ---------- */
function renderSupportList() {
    const container = document.getElementById('supportListContainer');
    if (!container) return;

    if (supportMessages.length === 0) {
        container.innerHTML = `<p class="text-slate-500 text-center py-8" data-translate="no_requests">
                                   ${t('no_requests')}
                               </p>`;
        return;
    }

    container.innerHTML = supportMessages.map(msg => {
        const unread = !msg.readByAdmin;
        const date   = msg.createdAt?.toDate() || new Date();

        const avatar = `<img src="${msg.userId === 'guest'
            ? 'https://ui-avatars.com/api/?name=Гость'
            : (msg.userPhoto || 'https://ui-avatars.com/api/?name=' + (msg.name || 'U'))}"
            class="avatar">`;

        return `
            <div class="support-item ${unread ? 'unread' : ''}" data-id="${msg.id}">
                <div class="header">
                    ${avatar}
                    <div class="content">
                        <div class="title">${msg.subject || 'Без темы'}</div>
                        <div class="msg">${msg.message}</div>
                        <div class="time">${formatTimeAgo(date)}</div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

/* ---------- 5️⃣ Формат «time ago» (у вас уже есть аналог) ---------- */
function formatTimeAgo(date) {
    if (!date) return '';
    const now  = new Date();
    const diff = now - date;
    if (diff < 60000)      return 'только что';
    if (diff < 3600000)    return Math.floor(diff / 60000) + ' мин назад';
    if (diff < 86400000)   return Math.floor(diff / 3600000) + ' ч назад';
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/* ---------- 6️⃣ Админ‑режим (видит все обращения) ---------- */
function initAdminSupportListener() {
    if (!currentUser || currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") return;

    const q = query(collection(db, SUPPORT_COLLECTION), where("type", "==", "support"));
    onSnapshot(q, snap => {
        supportMessages = snap.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }).sort((a, b) => (b.createdAt?.toDate() || new Date()) -
                         (a.createdAt?.toDate() || new Date()));

        // для админа бейджик не нужен, но считаем новые:
        unreadSupportCount = supportMessages.filter(m => !m.readByAdmin).length;
        updateSupportBadge();

        const list = document.getElementById('supportListModal');
        if (list && list.classList.contains('active')) renderSupportList();
    });
}

/* ---------- 7️⃣ Отметка обращения как прочитанного админом ---------- */
window.markSupportAsRead = async function (msgId) {
    try {
        await updateDoc(doc(db, SUPPORT_COLLECTION, msgId), { readByAdmin: true });
        unreadSupportCount = Math.max(0, unreadSupportCount - 1);
        updateSupportBadge();

        const list = document.getElementById('supportListModal');
        if (list && list.classList.contains('active')) renderSupportList();
    } catch (e) {
        console.error('Mark support read error:', e);
    }
};

/* ---------- 8️⃣ Интеграция с auth‑состоянием ---------- */
onAuthStateChanged(auth, async user => {
    // ваш уже существующий код …
    if (user) {
        currentUser = user;
        initSupportListener(user.uid);            // <-- пользовательские сообщения
        if (user.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2") {
            initAdminSupportListener();          // <-- админ видит всё
        }
    } else {
        if (supportUnsubscribe) supportUnsubscribe();
        supportMessages   = [];
        unreadSupportCount = 0;
        updateSupportBadge();
    }
});

/* -------------------------------------------------
   9️⃣ ОСТАЛЬНЫЕ ФУНКЦИИ (из вашего footer.js)
   ------------------------------------------------- */

/* Форма отправки обращения уже есть в footer.js:
   <form id="supportForm" onsubmit="submitSupportTicket(event)">…
   Функция submitSupportTicket тоже объявлена в footer.js,
   но в ней **обязательно** указываем тип сообщения: */
window.submitSupportTicket = async function (e) {
    e.preventDefault();

    const btn = document.getElementById('supportSubmitBtn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
    btn.disabled = true;

    const ticket = {
        type: "support",                               // <-- важный флаг
        category: document.getElementById('supportCategory').value,
        name: document.getElementById('supportName').value.trim(),
        email: document.getElementById('supportEmail').value.trim(),
        subject: document.getElementById('supportSubject').value.trim(),
        message: document.getElementById('supportMessage').value.trim(),
        notify: document.getElementById('supportNotify').checked,
        userId: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.uid : 'guest',
        status: "new",
        createdAt: serverTimestamp(),
        readByAdmin: false,
        readByUser: true                               // пользователь уже «прочитал» своё сообщение
    };

    try {
        await addDoc(collection(db, SUPPORT_COLLECTION), ticket);
        footerShowToast(t('support_sent'));
    } catch (err) {
        console.error('Support error:', err);
        // fallback – сохраняем локально
        const local = JSON.parse(localStorage.getItem('supportTickets') || '[]');
        local.push(ticket);
        localStorage.setItem('supportTickets', JSON.stringify(local));
        footerShowToast(t('support_sent_offline'));
    }

    btn.innerHTML = orig;
    btn.disabled = false;
    document.getElementById('supportForm').reset();
    closeSupportModal();
};

/* -------------------------------------------------
   10️⃣ Экспорт функций в глобальный объект (на случай, если вы захотите вызвать их из консоли)
   ------------------------------------------------- */
window.initSupportListener        = initSupportListener;
window.initAdminSupportListener   = initAdminSupportListener;
window.updateSupportBadge         = updateSupportBadge;
window.renderSupportList          = renderSupportList;
window.formatTimeAgo              = formatTimeAgo;
