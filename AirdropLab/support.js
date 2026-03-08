/* -------------------------------------------------
   3️⃣ Поддержка (Support) – общие функции
   ------------------------------------------------- */

/* 3.1 Переменные */
const SUPPORT_COLLECTION = "feedbacks"; // используем ту же коллекцию, что и отзывы
let supportUnsubscribe = null;          // слушатель для текущего пользователя
let supportMessages   = [];            // массив сообщений типа "support"
let unreadSupportCount = 0;            // количество новых (непрочитанных) обращений

/* 3.2 Открытие окна нового обращения */
window.openSupportModal = function () {
    // Предзаполняем имя/почту, если пользователь авторизован
    if (typeof currentUser !== 'undefined' && currentUser) {
        document.getElementById('supportName').value  = currentUser.displayName || '';
        document.getElementById('supportEmail').value = currentUser.email || '';
    }
    document.getElementById('supportModal').classList.add('active');
};

window.closeSupportModal = function () {
    document.getElementById('supportModal').classList.remove('active');
};

/* 3.3 Отправка обращения */
window.submitSupportTicket = async function (e) {
    e.preventDefault();

    const btn = document.getElementById('supportSubmitBtn');
    const originalHTML = btn.innerHTML;
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
        readByUser: true          // пользователь уже «прочитал» своё сообщение
    };

    // ---------- 1️⃣ Сохраняем в Firestore ----------
    try {
        await addDoc(collection(db, SUPPORT_COLLECTION), ticket);
        footerShowToast('Обращение отправлено! Мы ответим в течение 24 ч.');
    } catch (err) {
        console.error('Support send error:', err);
        // На случай, если Firestore недоступен – сохраняем в localStorage как резерв
        const local = JSON.parse(localStorage.getItem('supportTickets') || '[]');
        local.push(ticket);
        localStorage.setItem('supportTickets', JSON.stringify(local));
        footerShowToast('Обращение сохранено локально. Мы свяжемся с вами!');
    }

    // ---------- 2️⃣ Очистка UI ----------
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    document.getElementById('supportForm').reset();
    closeSupportModal();
};

/* 3.4 Слушатель сообщений типа support (для текущего пользователя) */
function initSupportListener(uid) {
    if (supportUnsubscribe) supportUnsubscribe(); // отписываемся от старого

    const q = query(
        collection(db, SUPPORT_COLLECTION),
        where("type", "==", "support"),
        where("userId", "==", uid)
    );

    supportUnsubscribe = onSnapshot(q, snapshot => {
        supportMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }).sort((a, b) => (b.createdAt?.toDate() || new Date()) - (a.createdAt?.toDate() || new Date()));

        // считаем непрочитанные (admin ещё не прочитал)
        unreadSupportCount = supportMessages.filter(m => !m.readByAdmin).length;
        updateSupportBadge();
        renderSupportList(); // если открыто окно «Мои обращения», перерисуем
    });
}

/* 3.5 Обновление бейджика */
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

/* 3.6 Открытие списка «Мои обращения» */
window.openSupportListModal = function () {
    if (!currentUser) {
        footerShowToast('Войдите в аккаунт');
        openLoginModal();
        return;
    }
    document.getElementById('supportListModal').classList.add('active');
    renderSupportList(); // отрисуем сразу
};

window.closeSupportListModal = function () {
    document.getElementById('supportListModal').classList.remove('active');
};

/* 3.7 Рендер списка обращений */
function renderSupportList() {
    const container = document.getElementById('supportListContainer');
    if (!container) return;

    if (supportMessages.length === 0) {
        container.innerHTML = `<p class="text-slate-500 text-center py-8" data-translate="no_requests">У вас пока нет обращений.</p>`;
        return;
    }

    container.innerHTML = supportMessages.map(msg => {
        const isUnread = !msg.readByAdmin;
        const date = msg.createdAt?.toDate() || new Date();

        // Авто‑подсветка новых (непрочитанных) сообщений
        const avatar = `<img src="${msg.userId === 'guest' ? 'https://ui-avatars.com/api/?name=Гость' : (msg.userPhoto || 'https://ui-avatars.com/api/?name=' + (msg.name || 'U'))}"
                        class="support-avatar">`;

        return `
            <div class="support-item ${isUnread ? 'unread' : ''}" data-id="${msg.id}">
                <div class="support-header">
                    ${avatar}
                    <div class="support-content">
                        <div class="title">${msg.subject || 'Без темы'}</div>
                        <div class="msg">${msg.message}</div>
                        <div class="time">${formatTimeAgo(date)}</div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

/* 3.8 Отметка сообщения как прочитанного админом (для админа) */
window.markSupportAsRead = async function (msgId) {
    try {
        await updateDoc(doc(db, SUPPORT_COLLECTION, msgId), { readByAdmin: true });
        // Пересчитываем бейджик
        unreadSupportCount = Math.max(0, unreadSupportCount - 1);
        updateSupportBadge();
    } catch (e) {
        console.error('Mark support read error:', e);
    }
};

/* 3.9 Форматирование «time ago» – используем уже есть функцию */
function formatTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' мин назад';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' ч назад';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

/* -------------------------------------------------
   4️⃣ Интеграция с auth‑состоянием
   ------------------------------------------------- */
onAuthStateChanged(auth, async user => {
    // … ваш уже существующий код …
    if (user) {
        // подписка на свои обращения
        initSupportListener(user.uid);
    } else {
        // пользователь вышел – очищаем данные
        if (supportUnsubscribe) supportUnsubscribe();
        supportMessages = [];
        unreadSupportCount = 0;
        updateSupportBadge();
    }
});

/* -------------------------------------------------
   5️⃣ Админ‑режим – показываем все обращения
   ------------------------------------------------- */
function initAdminSupportListener() {
    // только для админа (UID фиксированный в вашем коде)
    if (!currentUser || currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") return;

    const q = query(collection(db, SUPPORT_COLLECTION), where("type", "==", "support"));
    onSnapshot(q, snapshot => {
        supportMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }).sort((a, b) => (b.createdAt?.toDate() || new Date()) - (a.createdAt?.toDate() || new Date()));
        // Для админа бейджик не нужен, но можно подсчитать новые:
        unreadSupportCount = supportMessages.filter(m => !m.readByAdmin).length;
        // Если админ открыл список, обновим UI
        renderSupportList();
    });
}

/* Вызов в onAuthStateChanged, когда пользователь админ */
onAuthStateChanged(auth, async user => {
    // … ваш код …
    if (user && user.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2") {
        initAdminSupportListener(); // админ видит все обращения
    }
});

/* -------------------------------------------------
   6️⃣ Переводы (languages.js) – добавьте новые ключи
   ------------------------------------------------- */
// ru
support: "Поддержка",
my_requests: "Мои обращения",
new_message: "Новое обращение",
send: "Отправить",
topic: "Тема обращения",
notify_me: "Уведомить по email",
no_requests: "У вас пока нет обращений",
// en
support: "Support",
my_requests: "My inquiries",
new_message: "New message",
send: "Send",
topic: "Subject",
notify_me: "Notify by email",
no_requests: "You have no inquiries yet"
