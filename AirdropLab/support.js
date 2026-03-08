/* -------------------------------------------------
   3️⃣ Поддержка (Support) – основные функции
   ------------------------------------------------- */

/* ---------- 3.1 Переменные ---------- */
const SUPPORT_COLLECTION = "feedbacks";   // используем уже существующую коллекцию
let supportUnsubscribe = null;           // слушатель текущего пользователя
let supportMessages   = [];               // массив сообщений типа "support"
let unreadSupportCount = 0;               // количество новых (непрочитанных) обращений

/* ---------- 3.2 Открытие окна «Новое обращение» (футер) ----------
   Функция уже есть в footer.js (openSupportModal) – оставляем её без изменений. */

/* ---------- 3.3 Открытие списка «Мои обращения» (верхняя иконка) ---------- */
window.openSupportListModal = function () {
    if (!currentUser) {
        footerShowToast(t('login'));   // просим войти
        openLoginModal();
        return;
    }
    document.getElementById('supportListModal').classList.add('active');
    renderSupportList();               // отрисовка сразу
};

window.closeSupportListModal = function () {
    document.getElementById('supportListModal').classList.remove('active');
};

/* ---------- 3.4 Отправка обращения ----------
   Эта функция уже есть в footer.js (submitSupportTicket) – её оставляем, но
   убедимся, что в документ сохраняется поле type:"support". */
   // (см. ниже – в footer.js уже прописано)

/* ---------- 3.5 Слушатель сообщений типа support ----------
   Подписываемся на сообщения текущего пользователя. */
function initSupportListener(uid) {
    if (supportUnsubscribe) supportUnsubscribe();   // отписка от старого

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

        // если сейчас открыт список – перерисуем
        const listModal = document.getElementById('supportListModal');
        if (listModal && listModal.classList.contains('active')) renderSupportList();
    });
}

/* ---------- 3.6 Обновление бейджика ---------- */
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

/* ---------- 3.7 Рендер списка обращений ---------- */
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

        const avatar = `<img src="${msg.userId === 'guest'
                ? 'https://ui-avatars.com/api/?name=Гость'
                : (msg.userPhoto || 'https://ui-avatars.com/api/?name=' + (msg.name || 'U'))}"
                class="avatar">`;

        return `
            <div class="support-item ${isUnread ? 'unread' : ''}" data-id="${msg.id}">
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

/* ---------- 3.8 Формат «time ago» ----------
   (у вас уже есть аналогичная функция, но оставляем небольшую копию) */
function formatTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' мин назад';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' ч назад';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

/* ---------- 3.9 Админ‑режим – видеть все обращения ----------
   Админу нужен отдельный слушатель, который **не** фильтрует по userId. */
function initAdminSupportListener() {
    if (!currentUser || currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") return;

    const q = query(collection(db, SUPPORT_COLLECTION), where("type", "==", "support"));
    onSnapshot(q, snapshot => {
        supportMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }).sort((a, b) => (b.createdAt?.toDate() || new Date()) - (a.createdAt?.toDate() || new Date()));

        // для админа бейджик не нужен, но можно считать новые:
        unreadSupportCount = supportMessages.filter(m => !m.readByAdmin).length;
        updateSupportBadge();

        // если админ открыл список, сразу перерисуем
        const listModal = document.getElementById('supportListModal');
        if (listModal && listModal.classList.contains('active')) renderSupportList();
    });
}

/* ---------- 3.10 Отметка обращения как прочитанного админом ----------
   Внутри списка админ может кликнуть по элементу и вызвать эту функцию. */
window.markSupportAsRead = async function (msgId) {
    try {
        await updateDoc(doc(db, SUPPORT_COLLECTION, msgId), { readByAdmin: true });
        // Пересчитываем бейджик
        unreadSupportCount = Math.max(0, unreadSupportCount - 1);
        updateSupportBadge();
        // Перерисовать список (если открыт)
        const listModal = document.getElementById('supportListModal');
        if (listModal && listModal.classList.contains('active')) renderSupportList();
    } catch (e) {
        console.error('Mark support read error:', e);
    }
};

/* -------------------------------------------------
   4️⃣ Интеграция с auth‑состоянием
   ------------------------------------------------- */
onAuthStateChanged(auth, async user => {
    // ваш уже существующий код …
    if (user) {
        // подписка на свои обращения
        initSupportListener(user.uid);

        // если пользователь – админ, включаем админ‑слушатель
        if (user.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2") initAdminSupportListener();
    } else {
        // пользователь вышел – очистка
        if (supportUnsubscribe) supportUnsubscribe();
        supportMessages = [];
        unreadSupportCount = 0;
        updateSupportBadge();
    }
});

/* -------------------------------------------------
   
