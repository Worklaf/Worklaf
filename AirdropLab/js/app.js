// app.js - Основной файл приложения

// === Firebase Imports ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, addDoc, serverTimestamp, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// === Firebase Config ===
const firebaseConfig = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// === Initialize Firebase ===
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === Constants ===
const STORAGE_KEY = 'arc_tracker_v3';
const COMPLETED_KEY = 'arc_completed_v1';
const EXTERNAL_DATA_URL = './data/projects.json';

// === Global Variables ===
let projects = [];
let categories = ['DeFi', 'Gaming', 'Infra', 'L1/L2', 'NFT', 'Social', 'Other'];
let currentFilters = { statuses: [], categories: [] };
let editingId = null;
let isEditModalOpen = false;
let currentDetailId = null;
let isAdminMode = false;
let currentUser = null;
let userFavorites = [];
let userCompleted = [];
let arcData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let tempCustomCategories = [];
let adminClickCount = 0;
const ADMIN_CLICK_THRESHOLD = 5;

let notifications = [];
let unreadNotificationsCount = 0;
let notificationsUnsubscribe = null;
let currentImageIndex = 0;
let currentImages = [];
let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 10;
let currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;
let currentFilteredList = [];
let pendingLinkInsert = null;
let pendingImgInsert = null;
let adminFeedbacks = [];
let adminFeedbacksUnsubscribe = null;
let currentEditingActivities = [];
let editingActivityId = null;
let mainProjectCategories = [];
let currentSortType = 'latest';
let firstDataLoadComplete = false;

// === DOM Ready ===
document.addEventListener('DOMContentLoaded', function() {
    // Поиск в удаленных проектах
    const searchDeletedInput = document.getElementById('searchDeletedInput');
    if (searchDeletedInput) {
        let searchTimeout;
        searchDeletedInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                loadDeletedProjects(this.value);
            }, 300);
        });
    }
    
    const select = document.getElementById('itemsPerPageSelect');
    if(select) select.value = itemsPerPage;
    
    const promptInput = document.getElementById('promptInput');
    if(promptInput) {
        promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.confirmLinkInsert();
            }
        });
        
        promptInput.addEventListener('paste', function(e) {
            setTimeout(function() {
                if(promptInput.value.trim()) {
                    window.confirmLinkInsert();
                }
            }, 50);
        });
    }

    // Закрытие модалок по клику вне области
    const modalConfigs = [
        { id: 'detailModal', closeFn: window.closeDetailModal },
        { id: 'loginModal', closeFn: window.closeLoginModal },
        { id: 'addModal', closeFn: window.closeAddModal },
        { id: 'activityModal', closeFn: window.closeActivityModal },
        { id: 'notificationsModal', closeFn: window.closeNotificationsModal },
        { id: 'feedbackModal', closeFn: window.closeFeedbackModal },
        { id: 'feedbackListModal', closeFn: window.closeFeedbackListModal },
        { id: 'promptModal', closeFn: window.closePromptModal },
        { id: 'deletedProjectsModal', closeFn: window.closeDeletedProjectsModal },
        { id: 'imageModal', closeFn: window.closeImageModal }
    ];

    modalConfigs.forEach(config => {
        const modalElement = document.getElementById(config.id);
        if (modalElement) {
            modalElement.addEventListener('click', function(e) {
                if (e.target === this) {
                    config.closeFn();
                }
            });
        }
    });
    
    // Загрузка данных и поиска
    loadData();
    setupSearchListener();
    
    // Hero section
    initHeroState();
    
    // Инициализация всех компонентов
    initNavigation();
    initModals();
    initForms();
    initTabs();
    initDropdowns();
    initTooltips();
    initScrollEffects();
    initAnimations();
    
    // Инициализация функций
    setupThemeToggle();
    setupSearchFunctionality();
    setupContactForm();
    
    // Запуск анимаций
    startHeroAnimations();
    
    // Обработчики событий
    setupEventListeners();
    
    console.log('Сайт полностью загружен и инициализирован');
});

// === Load Data ===
window.loadData = async function() {
    try {
        const response = await fetch(EXTERNAL_DATA_URL);
        if (response.ok) {
            const data = await response.json();
            if(data.projects) projects = data.projects.map(normalizeData);
            if(data.categories) categories = data.categories;
        }
    } catch (e) { console.log('JSON load error', e); }
    
    onSnapshot(collection(db, "projects"), function(snapshot) {
        if (isEditModalOpen) return; 

        snapshot.forEach(function(docSnap) {
            const fireProject = docSnap.data();
            const idx = projects.findIndex(function(p) { return p.id === fireProject.id; });
            if (idx !== -1) projects[idx] = { ...projects[idx], ...fireProject };
            else projects.push(normalizeData(fireProject));
        });
        
        if (!firstDataLoadComplete) {
            firstDataLoadComplete = true;
            sortProjects('latest');
        } else {
            sortProjects(currentSortType);
        }
    });
};

function normalizeData(project) {
    if (!project.categories) project.categories = project.category ? [project.category] : ['Other'];
    if (!project.activities) project.activities = [];
    
    project.activities = project.activities.map((act, index) => {
        if (!act.id) {
            const safeTitle = act.title ? act.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') : 'act';
            act.id = 'act_' + safeTitle + '_' + (project.id || 'proj') + '_' + index;
        }
        return act;
    });
    
    if (project.deleted === undefined) project.deleted = false;
    return project;
}

// === Auth Functions ===
window.openLoginModal = function() { document.getElementById('loginModal').classList.add('active'); };
window.closeLoginModal = function() { document.getElementById('loginModal').classList.remove('active'); };
window.loginGoogle = async function() { 
    try { 
        await signInWithPopup(auth, new GoogleAuthProvider()); 
        closeLoginModal(); 
        showToast('Вход: Google'); 
    } catch(e) { showToast(e.message); } 
};
window.loginTwitter = async function() { 
    try { 
        await signInWithPopup(auth, new TwitterAuthProvider()); 
        closeLoginModal(); 
        showToast('Вход: Twitter'); 
    } catch(e) { showToast(e.message); } 
};
window.handleEmailAuth = async function(e) { 
    e.preventDefault(); 
    const email = document.getElementById('emailInput').value; 
    const pass = document.getElementById('passInput').value; 
    try { 
        await signInWithEmailAndPassword(auth, email, pass); 
        closeLoginModal(); 
        showToast('Вход выполнен'); 
    } catch(e) { showToast(e.message); } 
};
window.handleRegister = async function() { 
    const email = document.getElementById('emailInput').value; 
    const pass = document.getElementById('passInput').value; 
    try { 
        await createUserWithEmailAndPassword(auth, email, pass); 
        closeLoginModal(); 
        showToast('Аккаунт создан!'); 
    } catch(e) { showToast(e.message); } 
};
window.logout = function() { 
    signOut(auth).then(() => {
        showToast('Вы вышли из системы');
        localStorage.removeItem('favorites_backup');
        localStorage.removeItem(STORAGE_KEY);
        userFavorites = [];
        userCompleted = [];
        arcData = {};
    }); 
};

// === Feedback System ===
function initFeedbacksListener(uid) {
    if (adminFeedbacksUnsubscribe) {
        adminFeedbacksUnsubscribe();
        adminFeedbacksUnsubscribe = null;
    }
    
    let q;
    const isAdmin = uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";

    try {
        if (isAdmin) {
            q = query(collection(db, "feedbacks"));
        } else {
            q = query(collection(db, "feedbacks"), where("userId", "==", uid));
        }
        
        adminFeedbacksUnsubscribe = onSnapshot(q, (snapshot) => {
            adminFeedbacks = [];
            let unreadCount = 0;
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                
                if (isAdmin && data.deleted) return;
                if (!isAdmin && data.userDeleted) return;

                data.id = doc.id;
                
                if (isAdmin) {
                    if (!data.read) unreadCount++;
                } else {
                    if (!data.userRead) unreadCount++;
                }
                
                adminFeedbacks.push(data);
            });
            
            adminFeedbacks.sort((a, b) => {
                const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
                const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
                return dateB - dateA;
            });
            
            updateFeedbackBadgeUI(unreadCount);
            
            const listModal = document.getElementById('feedbackListModal');
            if (listModal && listModal.classList.contains('active')) {
                renderFeedbackList();
            }

        }, (error) => {
            console.error("Listener error:", error.message);
        });
    } catch (e) {
        console.error("Error init listener:", e);
    }
}

function updateFeedbackBadgeUI(unreadCount) {
    const badge = document.getElementById('feedbackBadge');
    if (!badge) return;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.remove('hidden');
        badge.classList.add('animate-pulse');
    } else {
        badge.classList.add('hidden');
        badge.classList.remove('animate-pulse');
        badge.textContent = '0';
    }
}

window.openFeedbackModal = function(projId, projName) {
    if (!currentUser) {
        showToast('Войдите, чтобы отправлять отзывы');
        openLoginModal();
        return;
    }

    const modal = document.getElementById('feedbackModal');
    document.getElementById('adminChatDeleteBtn').classList.add('hidden');
    document.getElementById('feedbackProjectId').value = projId;
    document.getElementById('feedbackProjectName').textContent = projName || 'Unknown';
    document.getElementById('feedbackChatHistory').innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-blue-400"></i></div>';

    const userFeedback = adminFeedbacks.find(fb => fb.userId === currentUser.uid && fb.projectId === projId);

    if (userFeedback) {
        document.getElementById('feedbackDocId').value = userFeedback.id;
        loadFeedbackChat(userFeedback.id, projId);
    } else {
        document.getElementById('feedbackDocId').value = '';
        showNewFeedbackForm();
    }

    modal.classList.add('active');
};

function showNewFeedbackForm() {
    document.getElementById('feedbackChatHistory').innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-500">
            <i class="fas fa-inbox text-4xl mb-3 opacity-50"></i>
            <p class="text-sm">Начните новое обращение</p>
            <p class="text-xs text-slate-600 mt-1">Мы ответим в ближайшее время</p>
        </div>`;
    document.getElementById('feedbackFormNew').classList.remove('hidden');
    document.getElementById('feedbackFormReply').classList.add('hidden');
    document.getElementById('feedbackSendBtn').classList.remove('hidden');
    document.getElementById('feedbackSendBtn').textContent = 'Отправить';
    document.getElementById('feedbackSendBtn').onclick = window.sendUserFeedback;
    document.getElementById('feedbackText').value = '';
}

function loadFeedbackChat(docId, projId) {
    const unsub = onSnapshot(doc(db, "feedbacks", docId), (snap) => {
        if (!snap.exists()) return showNewFeedbackForm();

        const d = snap.data();
        const messages = d.messages || [];
        messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));

        const html = messages.map((msg) => {
            const fromUser = msg.sender === 'user';
            const bubbleSide = fromUser ? 'user' : 'admin'; 
            const senderName = fromUser ? 'Вы' : 'Поддержка';
            
            const avatar = fromUser
                ? `<img src="${currentUser?.photoURL || 'https://ui-avatars.com/api/?name=U'}" class="chat-avatar" alt>` 
                : `<div class="chat-avatar"><i class="fas fa-user-shield"></i></div>`;

            const t = msg.timestamp ? formatTimeAgo(msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp)) : '';

            return `<div class="chat-bubble ${bubbleSide}">${avatar}<div class="chat-bubble-wrapper"><span class="chat-sender">${senderName}</span><div class="chat-content">${msg.text}</div><span class="chat-time">${t}</span></div></div>`;
        }).join('');

        const history = document.getElementById("feedbackChatHistory");
        history.innerHTML = html || `<p class="text-center text-slate-500 py-4">Нет сообщений</p>`;
        document.getElementById('feedbackFormNew').classList.add('hidden');
        document.getElementById('feedbackFormReply').classList.remove('hidden');
        enableUserEnterSend();
        document.getElementById('feedbackSendBtn').classList.add('hidden');
        history.scrollTop = history.scrollHeight;

        if (!d.userRead) updateDoc(doc(db, "feedbacks", docId), { userRead: true });
    });
    window.currentFeedbackUnsub = unsub;
}

window.sendUserFeedback = async function() {
    if (!currentUser) return showToast('Войдите в аккаунт');
    
    const projId = document.getElementById('feedbackProjectId').value;
    const category = document.getElementById('feedbackCategory').value;
    const message = document.getElementById('feedbackText').value.trim();

    if (!message) return showToast('Введите сообщение');

    try {
        const proj = projects.find(p => p.id === projId);

        await addDoc(collection(db, "feedbacks"), {
            projectId: projId,
            projectName: proj?.name || '',
            projectLogo: proj?.image || '',
            category: category,
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email,
            userPhoto: currentUser.photoURL || '',
            status: 'open',
            read: false,
            userRead: true,
            deleted: false,
            userDeleted: false,
            createdAt: serverTimestamp(),
            messages: [{
                sender: 'user',
                text: message,
                timestamp: new Date()
            }]
        });

        showToast('Сообщение отправлено!');
        document.getElementById('feedbackText').value = '';

    } catch (e) {
        console.error(e);
        showToast('Ошибка: ' + e.message);
    }
};

window.sendUserFeedbackReply = async function() {
    const docId = document.getElementById('feedbackDocId').value;
    const text = document.getElementById('feedbackUserReplyText').value.trim();

    if (!text || !docId) return;

    try {
        await updateDoc(doc(db, "feedbacks", docId), {
            messages: arrayUnion({
                sender: 'user',
                text: text,
                timestamp: new Date()
            }),
            userRead: true,
            read: false
        });
        document.getElementById('feedbackUserReplyText').value = '';
        showToast('Сообщение отправлено!');
    } catch (e) {
        console.error(e);
        showToast('Ошибка отправки: ' + e.message);
    }
};

window.closeFeedbackModal = function() {
    document.getElementById('feedbackModal').classList.remove('active');
    if (window.currentFeedbackUnsub) {
        window.currentFeedbackUnsub();
        window.currentFeedbackUnsub = null;
    }
};

window.renderFeedbackList = function() {
    const getProj = id => projects.find(p => p.id === id) || {};
    const container = document.getElementById('feedbacksContainer');
    const isAdmin = currentUser && currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
    
    if (!adminFeedbacks || adminFeedbacks.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-500"><div class="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><i class="fas fa-inbox text-2xl text-slate-600"></i></div><p>Нет сообщений</p></div>`;
        return;
    }

    container.innerHTML = adminFeedbacks.map((item) => {
        const messages = item.messages || [];
        const lastMsg = messages[messages.length - 1] || { text: '...', sender: 'unknown' };
        const date = item.createdAt && item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt || 0);
        const isUnread = isAdmin ? !item.read : !item.userRead;
        
        let titleHtml = '';
        if (isAdmin) {
            titleHtml = `<span class="font-bold text-white">${item.userName || 'User'}</span> <span class="text-xs text-slate-500 ml-1">(${item.projectId})</span>`;
        } else {
            const p = getProj(item.projectId);
            titleHtml = `<div class="flex items-center gap-2">${p.image ? `<img src="${p.image}" class="w-6 h-6 rounded" alt>` : ''}<span class="font-bold text-white text-sm">${p.name || item.projectId}</span></div>`;
        }

        let msgPreview = lastMsg.text || 'Нет сообщений';
        if (!isAdmin && lastMsg.sender === 'admin') {
            msgPreview = `<span class="text-purple-400 font-bold mr-1">🔔 Новый ответ:</span> ${lastMsg.text}`;
        } else if (isAdmin && lastMsg.sender === 'user') {
            msgPreview = `<span class="text-blue-400 font-bold mr-1">User:</span> ${lastMsg.text}`;
        } else {
            msgPreview = `<span class="text-slate-500 mr-1">Вы:</span> ${lastMsg.text}`;
        }

        return `<div onclick="${isAdmin ? `openAdminFeedbackChat('${item.id}')` : `openFeedbackFromList('${item.id}', '${item.projectId}', '${(getProj(item.projectId).name||'').replace(/'/g,"\\'")}')`}" class="cursor-pointer group relative bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 rounded-xl p-4 transition-all duration-200">
            ${isUnread ? `<div class="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse"></div>` : ''}
            <div class="flex justify-between items-start mb-2 pr-6">
                <div>${titleHtml}<span class="text-xs text-slate-500 mt-0.5 block">${formatTimeAgo(date)}</span></div>
                ${isUnread ? `<span class="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>` : ''}
            </div>
            <div class="text-sm text-slate-300 line-clamp-2 pr-8">${msgPreview}</div>
        </div>`;
    }).join('');
};

window.openFeedbackFromList = function (docId, projectId, projectName = '') {
    document.getElementById('feedbackProjectName').textContent = projectName || projectId;
    document.getElementById('adminChatDeleteBtn').classList.add('hidden');
    document.getElementById('feedbackListModal').classList.remove('active');

    const modal = document.getElementById('feedbackModal');
    document.getElementById('feedbackProjectId').value = projectId;
    document.getElementById('feedbackDocId').value = docId;
    document.getElementById('feedbackModalTitle').textContent = 'Чат с поддержкой';

    document.getElementById('feedbackFormNew').classList.add('hidden');
    document.getElementById('feedbackFormReply').classList.remove('hidden');
    document.getElementById('feedbackSendBtn').classList.add('hidden');

    loadFeedbackChat(docId, projectId);
    modal.classList.add('active');
};

window.openAdminFeedbackChat = function (feedbackId) {
    const fb = adminFeedbacks.find(f => f.id === feedbackId);
    if (!fb) return;

    const listModal = document.getElementById('feedbackListModal');
    if (listModal) listModal.classList.remove('active');

    const chatModal = document.getElementById('feedbackModal');
    
    document.getElementById('feedbackProjectId').value = fb.projectId;
    document.getElementById('feedbackProjectName').textContent = `${fb.projectId} (от ${fb.userName || 'Пользователь'})`;
    document.getElementById('feedbackDocId').value = fb.id;
    document.getElementById('feedbackModalTitle').textContent = 'Чат с пользователем';
    
    document.getElementById('feedbackFormNew').classList.add('hidden');
    document.getElementById('feedbackFormReply').classList.remove('hidden');
    document.getElementById('feedbackSendBtn').classList.add('hidden');

    if (window.currentFeedbackUnsub) {
        window.currentFeedbackUnsub();
        window.currentFeedbackUnsub = null;
    }

    const unsub = onSnapshot(doc(db, "feedbacks", feedbackId), (snap) => {
        if (!snap.exists()) return;

        const d = snap.data();
        const messages = d.messages || [];
        messages.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));

        const html = messages.map(msg => {
            const bubbleSide = msg.sender;
            const senderName = msg.sender === 'admin' ? 'Вы' : (d.userName || 'Пользователь');
            
            const avatar = msg.sender === 'admin'
                ? `<div class="chat-avatar"><i class="fas fa-user-shield"></i></div>`
                : `<img src="${d.userPhoto || 'https://ui-avatars.com/api/?name=P'}" class="chat-avatar" alt>`;

            let timeStr = '';
            if (msg.timestamp) {
                const dateObj = msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp);
                timeStr = formatTimeAgo(dateObj);
            }

            return `<div class="chat-bubble ${bubbleSide}">${avatar}<div class="chat-bubble-wrapper"><span class="chat-sender">${senderName}</span><div class="chat-content">${msg.text}</div><span class="chat-time">${timeStr}</span></div></div>`;
        }).join('');

        const hist = document.getElementById('feedbackChatHistory');
        hist.innerHTML = html || `<p class="text-center text-slate-500 py-4">Нет сообщений</p>`;
        hist.scrollTop = hist.scrollHeight;
    });
    
    window.currentFeedbackUnsub = unsub;

    const inp = document.getElementById('feedbackUserReplyText');
    inp.value = '';
    inp.placeholder = 'Ответ пользователю...';
    
    const replyBtn = inp.parentElement.querySelector('button');
    if (replyBtn) replyBtn.onclick = function() { sendAdminReply(feedbackId); };

    inp.onkeypress = e => { 
        if (e.key === 'Enter') { 
            e.preventDefault(); 
            sendAdminReply(feedbackId);
        } 
    };

    chatModal.classList.add('active');
    document.getElementById('adminChatDeleteBtn').classList.remove('hidden');
    markFeedbackRead(feedbackId);
};

window.sendAdminReply = async function(feedbackId) {
    const inp = document.getElementById('feedbackUserReplyText');
    const text = inp.value.trim();
    if (!text) return showToast('Введите ответ');

    try {
        await updateDoc(doc(db, "feedbacks", feedbackId), {
            messages: arrayUnion({
                sender: 'admin',
                text: text,
                timestamp: new Date()
            }),
            read: true,
            userRead: false
        });
        inp.value = '';
        showToast('Ответ отправлен!');
    } catch (e) {
        console.error(e);
        showToast('Ошибка: ' + e.message);
    }
};

window.markFeedbackRead = async function(id) {
    try {
        await updateDoc(doc(db, "feedbacks", id), { read: true });
    } catch (e) { console.error(e); }
};

window.deleteAdminFeedback = async function(id) {
    if (!confirm('Полностью удалить этот отзыв?')) return;
    try {
        await deleteDoc(doc(db, "feedbacks", id));
        showToast('Удалено');
        renderFeedbackList();
    } catch (e) { showToast('Ошибка: ' + e.message); }
};

// === Notifications ===
function initNotificationsListener(uid) {
    if (notificationsUnsubscribe) notificationsUnsubscribe();
    const notifQuery = query(collection(db, "notifications"), where("userId", "==", uid));
    notificationsUnsubscribe = onSnapshot(notifQuery, function(snapshot) {
        notifications = snapshot.docs.map(function(doc) {
            return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt && doc.data().createdAt.toDate ? doc.data().createdAt.toDate() : new Date() };
        }).sort(function(a, b) { return b.createdAt - a.createdAt; });
        unreadNotificationsCount = notifications.filter(function(n) { return !n.read; }).length;
        updateNotificationBadge();
    });
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (unreadNotificationsCount > 0) {
            badge.textContent = unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount;
            badge.classList.remove('hidden');
            badge.classList.add('notification-badge');
        } else {
            badge.classList.add('hidden');
        }
    }
}

window.showNotifications = function() {
    if (!currentUser) { showToast('Войдите для просмотра уведомлений'); return; }
    const modal = document.getElementById('notificationsModal');
    const list = document.getElementById('notificationsList');
    if (notifications.length === 0) {
        list.innerHTML = '<p class="text-slate-500 text-center py-8"><i class="fas fa-bell-slash text-4xl mb-3"></i><br>Нет уведомлений</p>';
    } else {
        list.innerHTML = notifications.map(function(notif) {
            const messageWithLinks = notif.message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-400 hover:underline break-all">$1</a>');
            const typeIcons = { info: 'fa-info-circle text-blue-400', success: 'fa-check-circle text-green-400', warning: 'fa-exclamation-triangle text-yellow-400', promo: 'fa-gift text-pink-400', referral: 'fa-link text-purple-400' };
            const typeIcon = typeIcons[notif.type] || 'fa-bell text-slate-400';
            const timeAgo = formatTimeAgo(notif.createdAt);
            const unreadClass = !notif.read ? 'unread' : '';
            return '<div class="notification-item p-3 bg-slate-800/50 rounded-lg ' + unreadClass + '" data-id="' + notif.id + '">' +
                '<div class="flex items-start gap-3"><div class="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0"><i class="fas ' + typeIcon + '"></i></div>' +
                '<div class="flex-1 min-w-0"><div class="text-sm text-slate-300">' + messageWithLinks + '</div>' +
                '<div class="flex items-center justify-between mt-2"><span class="text-xs text-slate-500">' + timeAgo + '</span>' +
                (!notif.read ? '<button onclick="markNotificationAsRead(\'' + notif.id + '\')" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">Отметить прочитанным</button>' : '') +
                '</div></div></div></div>';
        }).join('');
    }
    modal.classList.add('active');
};

window.closeNotificationsModal = function() { document.getElementById('notificationsModal').classList.remove('active'); };

window.openFeedbackListModal = function() {
    if (!currentUser) {
        showToast('Войдите в аккаунт');
        openLoginModal();
        return;
    }
    
    const isAdmin = currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2";
    const titleContainer = document.querySelector('#feedbackListModal h2');
    
    if(titleContainer) {
        if (isAdmin) {
            titleContainer.innerHTML = '<i class="fas fa-shield-alt text-purple-400 mr-2"></i>Все обращения (Админ)';
        } else {
            titleContainer.innerHTML = '<i class="fas fa-comments text-purple-400 mr-2"></i>Мои сообщения';
        }
    }

    document.getElementById('feedbackListModal').classList.add('active');
    
    setTimeout(() => {
        renderFeedbackList();
    }, 100);
};

window.closeFeedbackListModal = function() {
    document.getElementById('feedbackListModal').classList.remove('active');
};

window.markNotificationAsRead = async function(notifId) {
    try {
        await updateDoc(doc(db, "notifications", notifId), { read: true });
        const notif = notifications.find(function(n) { return n.id === notifId; });
        if (notif) {
            notif.read = true;
            unreadNotificationsCount = Math.max(0, unreadNotificationsCount - 1);
            updateNotificationBadge();
            const item = document.querySelector('[data-id="' + notifId + '"]');
            if (item) { item.classList.remove('unread'); const btn = item.querySelector('button'); if (btn) btn.remove(); }
        }
    } catch (e) { console.error('Ошибка:', e); }
};

function formatTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff/60000) + ' мин назад';
    if (diff < 86400000) return Math.floor(diff/3600000) + ' ч назад';
    if (diff < 604800000) return Math.floor(diff/86400000) + ' дн назад';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// === User Data ===
async function saveUserData(user) {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName || 'Аноним',
                photoURL: user.photoURL || null,
                firstLogin: serverTimestamp(),
                provider: user.providerData[0]?.providerId || 'unknown',
                lastLogin: serverTimestamp(),
                favorites: [],
                completed: [],
                arcGuideStats: {}
            });
        } else {
            const userData = userSnap.data();
            const updates = { lastLogin: serverTimestamp() };
            
            if (!userData.firstLogin) updates.firstLogin = serverTimestamp();
            if (!userData.provider && user.providerData[0]) updates.provider = user.providerData[0].providerId;
            
            await updateDoc(userRef, updates);
        }
    } catch (e) {
        console.error('Error saving user data:', e);
    }
}

async function syncLocalStorageToFirestore(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) return;
        
        const updates = {};
        const localFavorites = JSON.parse(localStorage.getItem('favorites_backup') || '[]');
        if (localFavorites.length > 0) updates.favorites = localFavorites;
        
        const localCompleted = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
        if (localCompleted.length > 0) updates.completed = localCompleted;
        
        const localGuideStats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (Object.keys(localGuideStats).length > 0) updates.arcGuideStats = localGuideStats;
        
        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
        }
    } catch (e) {
        console.error('Error syncing localStorage:', e);
    }
}

// === Auth State ===
onAuthStateChanged(auth, async function(user) {
    const now = new Date().toISOString();

    if (user) {
        currentUser = user;
        await saveUserData(user);
        await syncLocalStorageToFirestore(user.uid);
        
        document.getElementById('generalFeedbackPanel').classList.remove('hidden');
        initFeedbacksListener(user.uid);

        if (user.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2") {
            activateAdminMode();
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const userData = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                lastLogin: now
            };
            
            await loadHeroStateFromFirestore(user.uid);
            
            if (userSnap.exists()) {
                await updateDoc(userRef, userData);
            } else {
                await setDoc(userRef, { ...userData, firstLogin: now });
            }
        } catch (e) { console.error('Error:', e); }

        document.getElementById('loggedOutView').classList.add('hidden');
        document.getElementById('loggedInView').classList.remove('hidden');
        document.getElementById('guestWarning').classList.add('hidden');

        document.getElementById('userAvatar').src = user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.email || 'User') + '&background=random';
        document.getElementById('userName').textContent = user.displayName || user.email.split('@')[0];

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            userFavorites = data.favorites || [];
            userCompleted = data.completed || [];

            if (data.arcGuideStats) {
                arcData = { ...arcData, ...data.arcGuideStats };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData));
            }
        } else {
            await setDoc(userRef, { favorites: [], completed: [], arcGuideStats: {} });
        }

        applyFilters();
        initUserSync(user.uid);
        initNotificationsListener(user.uid);

    } else {
        currentUser = null;
        userFavorites = [];
        userCompleted = [];

        document.getElementById('generalFeedbackPanel').classList.add('hidden');

        if (notificationsUnsubscribe) notificationsUnsubscribe();
        if (adminFeedbacksUnsubscribe) adminFeedbacksUnsubscribe();

        notifications = [];
        unreadNotificationsCount = 0;
        updateNotificationBadge();

        document.getElementById('loggedOutView').classList.remove('hidden');
        document.getElementById('loggedInView').classList.add('hidden');
        document.getElementById('guestWarning').classList.remove('hidden');

        arcData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        userCompleted = JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

        applyFilters();
    }
});

function initUserSync(uid) {
    const userRef = doc(db, "users", uid);
    onSnapshot(userRef, function(docSnap) {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            let cloudFavorites = data.favorites || [];
            let localStorageFavorites = JSON.parse(localStorage.getItem('favorites_backup')) || [];
            let mergedFavorites = [...new Set([...cloudFavorites, ...localStorageFavorites])];
            
            if (JSON.stringify(cloudFavorites) !== JSON.stringify(mergedFavorites)) {
                localStorage.setItem('favorites_backup', JSON.stringify(mergedFavorites));
            }
            
            userFavorites = mergedFavorites;
            
            let cloudCompleted = data.completed || [];
            let localStorageCompleted = JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
            let mergedCompleted = [...new Set([...cloudCompleted, ...localStorageCompleted])];
            
            if (JSON.stringify(cloudCompleted) !== JSON.stringify(mergedCompleted)) {
                localStorage.setItem(COMPLETED_KEY, JSON.stringify(mergedCompleted));
            }
            
            userCompleted = mergedCompleted;
            
            if (data.arcGuideStats) {
                let cloudArcData = data.arcGuideStats;
                let localArcData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                let mergedArcData = { ...localArcData, ...cloudArcData };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedArcData));
                arcData = mergedArcData;
            }

            applyFilters();
        }
    });
}

// === Project Actions ===
window.toggleComplete = async function(uid, aid) {
    const uniqueId = uid + '_' + aid;
    const btn = event.currentTarget;
    const idx = userCompleted.indexOf(uniqueId);
    let newCompleted = [...userCompleted];
    
    if (idx > -1) {
        newCompleted.splice(idx, 1);
        btn.classList.remove('active');
        showToast('Отмечено как незавершённое', 'info');
    } else {
        newCompleted.push(uniqueId);
        btn.classList.add('active');
        createSuccessRipple(btn);
        showToast('Задача завершена!', 'success');
    }
    
    userCompleted = newCompleted;
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(newCompleted));
    if (currentDetailId === uid) openDetail(uid);
    applyFilters();
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, { favorites: userFavorites, completed: userCompleted }, { merge: true });
        } catch (error) {
            console.error('Error saving:', error);
        }
    }
};

function createHeartParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50 + Math.random() * 30;
        
        particle.style.cssText = `position: fixed; left: ${centerX}px; top: ${centerY}px; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); pointer-events: none; z-index: 10000; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);`;
        
        document.body.appendChild(particle);
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }).onfinish = () => particle.remove();
    }
}

function createSuccessRipple(button) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #10b981; transform: translate(-50%, -50%) scale(0); opacity: 1; pointer-events: none;`;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
    ], { duration: 600, easing: 'ease-out' }).onfinish = () => ripple.remove();
}

window.trackGuideClick = async function(id, url) {
    if(url) window.open(url, '_blank');
    else openDetail(id);
    
    const now = new Date().toISOString();
    if (!arcData[id]) arcData[id] = { totalClicks: 0, lastClick: null };
    arcData[id].totalClicks = (arcData[id].totalClicks || 0) + 1;
    arcData[id].lastClick = now;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData));
    
    showToast('Задание засчитано! ✅');
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                [`arcGuideStats.${id}.totalClicks`]: arcData[id].totalClicks,
                [`arcGuideStats.${id}.lastClick`]: now
            });
        } catch(e) { console.error('Error saving click:', e); }
    }
    applyFilters();
};

window.toggleFavorite = async function(id) {
    if (!currentUser) { 
        showToast('Войдите, чтобы сохранить', 'warning'); 
        return; 
    }
    
    const btn = event.currentTarget;
    const idx = userFavorites.indexOf(id);
    let newFavs = [...userFavorites];
    
    if (idx > -1) {
        newFavs.splice(idx, 1);
        btn.classList.remove('active');
        showToast('Удалено из избранного', 'info');
    } else {
        newFavs.push(id);
        btn.classList.add('active');
        createHeartParticles(btn);
        showToast('Добавлено в избранное!', 'success');
    }
    
    userFavorites = newFavs;
    applyFilters();
    localStorage.setItem('favorites_backup', JSON.stringify(newFavs));
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { favorites: newFavs });
        } catch (error) {
            console.error('Error saving:', error);
        }
    }
};

window.toggleFavoriteFromDetail = async function() {
    if (!currentDetailId) return;
    await window.toggleFavorite(currentDetailId);
    updateDetailFavoriteIcon();
};

function updateDetailFavoriteIcon() {
    if (!currentDetailId) return;
    const btn = document.getElementById('detailFavoriteBtn');
    const isFav = userFavorites.includes(currentDetailId);
    if (btn) btn.classList.toggle('active', isFav);
}

// === Filters & Categories ===
window.toggleCategoriesDropdown = function() {
    const content = document.getElementById('categoriesAccordion');
    const icon = document.getElementById('catDropdownIcon');
    content.classList.toggle('open');
    icon.classList.toggle('rotate-180');
};

window.toggleCategoryFilter = function(catName) {
    if (currentFilters.categories.includes(catName)) {
        currentFilters.categories = currentFilters.categories.filter(function(c) { return c !== catName; });
    } else {
        currentFilters.categories.push(catName);
    }
    updateCategoryUI();
    applyFilters();
};

function updateCategoryUI() {
    const container = document.getElementById('categoryCheckboxesList');
    if (!container) return;
    const allCats = getAllCategoriesWithCounts(projects);
    container.innerHTML = allCats.map(function(item) {
        const cat = item[0];
        const count = item[1];
        const isChecked = currentFilters.categories.includes(cat) ? 'checked' : '';
        return '<label class="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800 cursor-pointer text-sm select-none group">' +
            '<div class="flex items-center gap-2">' +
            '<input type="checkbox" class="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0" ' + isChecked + ' onchange="toggleCategoryFilter(\'' + cat + '\')">' +
            '<span class="text-slate-300 group-hover:text-white">' + cat + '</span></div>' +
            '<span class="text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">' + count + '</span></label>';
    }).join('');

    const tagsContainer = document.getElementById('selectedCategoriesTags');
    if (currentFilters.categories.length === 0) {
        tagsContainer.innerHTML = '<span class="text-xs text-slate-500 italic">Все</span>';
    } else {
        tagsContainer.innerHTML = currentFilters.categories.map(function(cat) {
            return '<span class="px-2 py-0.5 bg-blue-600/20 border border-blue-500/50 text-blue-300 text-xs rounded-full flex items-center gap-1">' +
                cat + ' <i onclick="toggleCategoryFilter(\'' + cat + '\')" class="fas fa-times cursor-pointer hover:text-white"></i></span>';
        }).join('');
    }
}

window.changeItemsPerPage = function(val) {
    itemsPerPage = parseInt(val);
    localStorage.setItem('currentPage', currentPage);
    applyFilters(null, true);
};

window.applyFilters = function(search, resetPage = false) {
    if (!search) search = document.getElementById('searchInput').value;

    if (resetPage) {
        currentPage = 1;
        localStorage.removeItem('currentPage');
    }

    currentFilteredList = getFilteredProjects(search);
    updateCategoryUI();
    renderProjects(currentFilteredList);
    renderPaginationControls(currentFilteredList.length);
    updateSidebarActive();
    updateCounts(currentFilteredList);
    updateStats(currentFilteredList);
};

function getFilteredProjects(search) {
    return projects.filter(function(p) {
        if (p.deleted && !isAdminMode) return false;

        if (currentFilters.statuses.length > 0) {
            let matchesAllFilters = true;

            for (const status of currentFilters.statuses) {
                if (status === 'active') {
                    const projectCompleted = userCompleted.includes(p.id + '_project');
                    const hasActivities = p.activities && p.activities.length > 0;
                    const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
                    const userFinished = projectCompleted || allActivitiesCompleted;
                    if (userFinished || p.status === 'ended') matchesAllFilters = false;
                } else if (status === 'ended') {
                    if (p.status !== 'ended') matchesAllFilters = false;
                } else if (status === 'daily') {
                    if (!p.hasDaily || p.status !== 'active') matchesAllFilters = false;
                } else if (status === 'favorites') {
                    if (!userFavorites.includes(p.id)) matchesAllFilters = false;
                } else if (status === 'completed') {
                    const projectCompleted = userCompleted.includes(p.id + '_project');
                    const hasActivities = p.activities && p.activities.length > 0;
                    const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
                    if (!(projectCompleted || allActivitiesCompleted)) matchesAllFilters = false;
                } else if (status === 'unvisited') {
                    if (arcData[p.id]) matchesAllFilters = false;
                } else if (status === 'today') {
                    if (!isToday(p.createdAt)) matchesAllFilters = false;
                }
            }

            if (!matchesAllFilters) return false;
        }

        if (currentFilters.categories.length > 0) {
            if (!p.categories) return false;
            if (!p.categories.some(function(c) { return currentFilters.categories.includes(c); })) return false;
        }

        if (search) {
            if (!p.name.toLowerCase().includes(search.toLowerCase()) && !(p.description && p.description.toLowerCase().includes(search.toLowerCase()))) {
                return false;
            }
        }

        return true;
    });
}

function getLatestActivityDate(project) {
    if (!project.activities || project.activities.length === 0) {
        return project.lastUpdated || project.createdAt;
    }
    const latestActivity = project.activities.filter(a => a.date).sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return latestActivity && latestActivity.date ? latestActivity.date : (project.lastUpdated || project.createdAt);
}

function isNewProject(dateString) {
    if (!dateString) return false;
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
}

function formatClickDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateOnly = date.toDateString();
    const todayOnly = today.toDateString();
    const yesterdayOnly = yesterday.toDateString();
    
    if (dateOnly === todayOnly) return { text: 'сегодня', class: '' };
    if (dateOnly === yesterdayOnly) return { text: 'вчера', class: 'older' };
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return { text: day + '.' + month, class: 'older' };
}

function formatDateForDisplay(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// === Render Projects ===
function renderProjects(filteredProjects) {
    const grid = document.getElementById('projectsGrid');
    const empty = document.getElementById('emptyState');
    const pagination = document.getElementById('paginationControls');
    
    if (filteredProjects.length === 0) { 
        grid.innerHTML = ''; 
        empty.classList.remove('hidden');
        pagination.innerHTML = '';
        return; 
    }
    
    empty.classList.add('hidden');
    pagination.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const projectsToShow = filteredProjects.slice(start, end);

    const totalUnvisited = projects.filter(p => !arcData[p.id]).length;
    document.getElementById('countUnvisited').textContent = totalUnvisited;

    grid.innerHTML = projectsToShow.map(function(project) {
        const isFav = userFavorites.includes(project.id);
        const isCompleted = userCompleted.includes(project.id + '_project');

        const lastActivityDate = getLatestActivityDate(project);
        const isNew = isNewProject(lastActivityDate);

        const lastClickRecord = arcData[project.id];
        const lastClickDate = lastClickRecord && lastClickRecord.lastClick ? formatClickDate(lastClickRecord.lastClick) : null;
        const lastUpdatedDate = lastActivityDate ? formatDateForDisplay(lastActivityDate) : null;

        const categoriesHtml = (project.categories || ['Other']).map(cat =>
            `<span class="bg-slate-800 px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-colors" onclick="event.stopPropagation(); toggleCategoryFilter('${cat}')">${cat}</span>`
        ).join('');

        const completedTheme = 'theme-indigo';
        return `
  <div class="glass-card rounded-2xl p-4 relative group project-card-wrapper ${isNew ? 'border-pink-500/30' : ''} ${isCompleted ? 'completed ' + completedTheme : ''}">
${isCompleted ? `<div class="absolute -top-2 -left-2 z-20"><span class="completed-badge"><i class="fas fa-check mr-1"></i>Готово</span></div>` : ''}
${isNew ? `<div class="absolute -top-2 -right-2 z-20"><span class="new-badge"><i class="fas fa-star mr-1"></i>NEW</span></div>` : ''}
${project.deleted ? `<div class="absolute top-2 left-2"><span class="deleted-badge text-xs">Архив</span></div>` : ''}
            <button onclick="openFeedbackModal('${project.id}', '${project.name.replace(/'/g, "\\'")}'); event.stopPropagation();" class="feedback-trigger-btn text-slate-300 hover:text-blue-400 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg" title="Оставить отзыв">
                <i class="fas fa-comment-dots"></i> <span>Отзыв</span>
            </button>

            <div class="flex items-start gap-4 pt-2">
                <div class="shrink-0">
                    ${project.image ? `<img src="${project.image}" alt="${project.name}" class="w-12 h-12 rounded-lg object-cover border border-slate-700">` : `<div class="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">${project.name.charAt(0).toUpperCase()}</div>`}
                </div>

                <div class="flex-1 min-w-0 flex flex-col">
                    <div class="flex items-start justify-between gap-2">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <h3 class="font-bold text-lg leading-tight text-white cursor-pointer hover:text-blue-400" onclick="openDetail('${project.id}')">${project.name}</h3>
                                ${lastUpdatedDate ? `<span class="last-updated-date" title="Дата последней активности">🔄 ${lastUpdatedDate}</span>` : ''}
                                ${isAdminMode ? `<button onclick="event.stopPropagation(); editProject('${project.id}')" class="text-slate-500 hover:text-blue-400 text-xs edit-btn"><i class="fas fa-pencil-alt"></i></button>` : ''}
                            </div>

                            <div class="flex flex-wrap gap-2 items-center text-xs text-slate-400 mb-2">
                                <div class="flex flex-wrap gap-1">${categoriesHtml}</div>
                                <span class="status-${project.status} px-2 py-1 rounded font-medium">${project.status === 'active' ? 'Active' : project.status === 'soon' ? 'Soon' : 'Ended'}</span>
                                ${project.hasDaily ? '<span class="text-orange-400"><i class="fas fa-fire mr-1"></i>Daily</span>' : ''}
                                ${project.priority === 'high' ? '<span class="text-red-400"><i class="fas fa-star mr-1"></i>High</span>' : ''}
                            </div>
                        </div>

                        <div class="flex items-center gap-2 flex-wrap shrink-0">
                            ${lastClickDate ? `<span class="last-click-date ${lastClickDate.class}" title="Последний клик">${lastClickDate.text}</span>` : ''}
                            <button onclick="trackGuideClick('${project.id}', '${project.guideUrl || ''}')" class="guide-btn-small text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                <i class="fas fa-book-open"></i><span>Гайд</span>
                            </button>
                            <button onclick="event.stopPropagation(); toggleComplete('${project.id}', 'project')" class="lab-complete-btn ${isCompleted ? 'active' : ''}" title="Отметить как завершённое">
                                <svg width="24" height="24"><use href="#lab-check"/></svg>
                            </button>
                            <button onclick="event.stopPropagation(); toggleFavorite('${project.id}')" class="lab-favorite-btn ${isFav ? 'active' : ''}" title="Добавить в избранное">
                                <svg width="24" height="24"><use href="#lab-heart"/></svg>
                            </button>
                        </div>
                    </div>

                    <p class="text-slate-400 text-sm mt-2 line-clamp-2">${project.description || 'Нет описания'}</p>
                </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-700/50 flex gap-2">
                <button onclick="trackGuideClick('${project.id}', '${project.referralLink || project.cryptoRankUrl || ''}'); event.stopPropagation();" class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-globe"></i> Website
                </button>
                <button onclick="trackGuideClick('${project.id}', '${project.twitterUrl || ''}'); event.stopPropagation();" class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button onclick="trackGuideClick('${project.id}', '${project.cryptoRankUrl || ''}'); event.stopPropagation();" class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-chart-line"></i> CR
                </button>
            </div>
        </div>`;
    }).join('');
}

// === Pagination ===
function renderPaginationControls(totalItems) {
    const container = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    container.innerHTML = '';
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = function() { changePage(currentPage - 1); };
    container.appendChild(prevBtn);

    function createPageBtn(num) {
        const btn = document.createElement('button');
        btn.className = 'page-btn ' + (num === currentPage ? 'active' : '');
        btn.textContent = num;
        btn.onclick = function() { changePage(num); };
        return btn;
    }
    
    function createEllipsis() {
        const span = document.createElement('span');
        span.className = 'page-ellipsis';
        span.textContent = '...';
        return span;
    }

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) container.appendChild(createPageBtn(i));
    } else {
        container.appendChild(createPageBtn(1));
        if (currentPage > 3) container.appendChild(createEllipsis());
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        if (currentPage === 1 || currentPage === 2) end = 3;
        if (currentPage === totalPages || currentPage === totalPages - 1) start = totalPages - 2;
        for (let i = start; i <= end; i++) container.appendChild(createPageBtn(i));
        if (currentPage < totalPages - 2) container.appendChild(createEllipsis());
        container.appendChild(createPageBtn(totalPages));
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = function() { changePage(currentPage + 1); };
    container.appendChild(nextBtn);
}

window.changePage = function(page) {
    currentPage = page;
    renderProjects(currentFilteredList);
    renderPaginationControls(currentFilteredList.length);
    document.getElementById('projectsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.filterProjects = function(status) {
    if (status === 'all') {
        currentFilters.statuses = [];
    } else {
        const index = currentFilters.statuses.indexOf(status);
        if (index !== -1) currentFilters.statuses.splice(index, 1);
        else currentFilters.statuses.push(status);
    }
    applyFilters(null, true);
};

window.resetFilters = function() { currentFilters = { status: 'all', categories: [] }; document.getElementById('searchInput').value = ''; applyFilters(); };

window.sortProjects = function(by) {
    currentSortType = by;
    
    if (by === 'name') {
        projects.sort(function(a, b) { return a.name.localeCompare(b.name); });
    } else if (by === 'priority') {
        projects.sort(function(a, b) { return (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0); });
    } else if (by === 'latest') {
        projects.sort(function(a, b) {
            const aDate = getLatestActivityDate(a);
            const bDate = getLatestActivityDate(b);
            const aTime = aDate ? new Date(aDate).getTime() : 0;
            const bTime = bDate ? new Date(bDate).getTime() : 0;
            return bTime - aTime;
        });
    }
    
    applyFilters();
};

function parseRichContent(text) {
    if (!text) return '';
    let html = text;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, url) {
        return '<img src="' + url + '" alt="' + (alt || 'image') + '" onerror="this.style.display=\'none\'" onclick="window.openImageModal(this)" style="max-width: 300px; height: auto; border-radius: 8px; margin: 12px 0; border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">';
    });
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
    const lines = html.split('\n');
    let result = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.match(/^(<h3|<ul|<li|<blockquote|<img|<hr|<p)/)) {
            result += '<p>' + line + '</p>';
        } else {
            result += line;
        }
    }
    return result;
}

// === Detail View ===
window.openDetail = function(id) {
    const project = projects.find(function(p) { return p.id === id; });
    if (!project) return;
    currentDetailId = id;
    
    document.getElementById('detailName').textContent = project.name;
    document.getElementById('detailDesc').textContent = project.description || 'Описание отсутствует';
    document.getElementById('detailCategory').innerHTML = (project.categories || ['Other']).map(function(cat) {
        return '<span class="tag cursor-pointer hover:bg-blue-600/20" onclick="closeDetailModal(); toggleCategoryFilter(\'' + cat + '\')">' + cat + '</span>';
    }).join('');
    
    const statusEl = document.getElementById('detailStatus');
    statusEl.textContent = project.status === 'active' ? 'Active' : project.status === 'soon' ? 'Soon' : 'Ended';
    statusEl.className = 'px-2 py-1 rounded-full text-xs font-medium status-' + project.status;
    
    const isNew = isNewProject(project.createdAt);
    document.getElementById('detailNewBadge').classList.toggle('hidden', !isNew);
    
    const img = document.getElementById('detailImage');
    img.src = project.image || '';
    img.onerror = function() { 
        img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#333"/><text x="32" y="32" fill="white" text-anchor="middle">' + (project.name[0] || '?') + '</text></svg>'; 
    };
    
    const created = project.createdAt || project.created_at;
    document.getElementById('detailCreated').innerHTML = 'Добавлено: <span class="text-slate-300">' + (created ? new Date(created).toLocaleDateString() : '—') + '</span>';
    
    const actsContainer = document.getElementById('detailActivitiesList');
    if (project.activities && project.activities.length > 0) {
        const sortedActivities = [...project.activities].sort(function(a, b) {
            const dateA = a.date ? new Date(a.date) : new Date(0);
            const dateB = b.date ? new Date(b.date) : new Date(0);
            return dateB - dateA;
        });

        actsContainer.innerHTML = sortedActivities.map(function(act) {
            const isActCompleted = userCompleted.includes(project.id + '_' + act.id);
            const isActEnded = act.status === 'ended';
            const actDate = act.date ? formatDateForDisplay(act.date) : '';
            const actCats = act.categories ? act.categories.map(c => '<span class="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">' + c + '</span>').join('') : '';
            const actDesc = parseRichContent(act.description);
            
            let actionsHtml = '';
            if (!isActEnded) {
                actionsHtml += '<button onclick="event.stopPropagation(); trackGuideClick(\'' + project.id + '\', \'\');" class="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-slate-800" title="Засчитать клик"><i class="fas fa-check mr-1"></i>Клик</button>';
                actionsHtml += '<button onclick="event.stopPropagation(); toggleComplete(\'' + project.id + '\', \'' + act.id + '\')" class="' + (isActCompleted ? 'text-emerald-500' : 'text-slate-500 hover:text-emerald-400') + ' transition-colors p-2" title="Завершить"><i class="fas ' + (isActCompleted ? 'fa-check-circle' : 'fa-circle') + ' text-lg"></i></button>';
            }
            
            if (isAdminMode) {
                if (!isActEnded) {
                    actionsHtml += '<button onclick="event.stopPropagation(); endActivity(\'' + project.id + '\', \'' + act.id + '\')" class="text-slate-500 hover:text-red-400 text-xs ml-2 px-2 py-1 rounded hover:bg-slate-800" title="Завершить фазу"><i class="fas fa-ban mr-1"></i>End</button>';
                } else {
                    actionsHtml += '<button onclick="event.stopPropagation(); resumeActivity(\'' + project.id + '\', \'' + act.id + '\')" class="text-emerald-500 hover:text-emerald-400 text-xs ml-2 px-2 py-1 rounded hover:bg-slate-800" title="Возобновить фазу"><i class="fas fa-redo mr-1"></i>Resume</button>';
                }
            }
            
            return '<div class="activity-block ' + (isActEnded ? 'activity-ended' : '') + '">' +
                '<div class="activity-header" onclick="toggleActivityDetail(\'' + act.id + '\')">' +
                '<div class="flex items-center gap-3 flex-1">' +
                '<i id="icon-' + act.id + '" class="fas fa-chevron-down text-slate-400 transition-transform"></i>' +
                '<div class="flex-1">' +
                '<div class="font-bold text-white flex items-center gap-2 flex-wrap">' + act.title + 
                (isActEnded ? ' <span class="text-[10px] bg-red-900/50 text-red-300 px-1.5 py-0.5 rounded uppercase">Ended</span>' : '') +
                '</div>' +
                '<div class="flex items-center gap-2 mt-1 text-xs text-slate-400 flex-wrap">' + 
                (actDate ? '<span class="text-blue-400"><i class="far fa-calendar-alt mr-1"></i>' + actDate + '</span>' : '') +
                (actCats ? '<span class="flex items-center gap-1">' + actCats + '</span>' : '') +
                '</div></div></div>' +
                '<div class="flex items-center gap-2 shrink-0">' + actionsHtml + '</div>' +
                '</div>' +
                '<div id="body-' + act.id + '" class="activity-body-container">' +
                '<div class="activity-body rich-content text-slate-300 text-sm">' + actDesc + '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    } else {
        actsContainer.innerHTML = '<p class="text-slate-500 text-sm italic text-center py-4">Активности не добавлены.</p>';
    }

    document.getElementById('detailEditBtn').classList.toggle('hidden', !isAdminMode);
    updateDetailFavoriteIcon();
    document.getElementById('detailModal').classList.add('active');
};

window.toggleActivityDetail = function(actId) {
    const body = document.getElementById('body-' + actId);
    const icon = document.getElementById('icon-' + actId);
    if (!body || !icon) return;
    
    if (event.target.closest('.flex.items-center.gap-2 button')) return;

    if (body.classList.contains('open')) {
        body.classList.remove('open');
        icon.classList.remove('rotate-180');
    } else {
        body.classList.add('open');
        icon.classList.add('rotate-180');
    }
};

window.closeDetailModal = function() { document.getElementById('detailModal').classList.remove('active'); currentDetailId = null; };

window.openDetailLink = function(type) {
    if (!currentDetailId) return;
    const project = projects.find(function(p) { return p.id === currentDetailId; });
    if(!project) return;
    
    let url = '';
    if (type === 'ref') url = project.referralLink || project.cryptoRankUrl;
    else if (type === 'twitter') url = project.twitterUrl;
    else if (type === 'cryptorank') url = project.cryptoRankUrl;
    
    if (url) {
        trackGuideClick(currentDetailId, url);
    } else {
        showToast('Ссылка не найдена');
    }
};

window.openGuideFromDetail = function() { 
    if(currentDetailId) {
        const project = projects.find(function(p) { return p.id === currentDetailId; });
        window.trackGuideClick(currentDetailId, project ? project.guideUrl : ''); 
    }
};

// === Admin Mode ===
function activateAdminMode() {
    if (!currentUser || currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") return;
    isAdminMode = true;
    document.getElementById('adminPanel').style.display = 'flex';
    document.getElementById('generalFeedbackPanel').classList.remove('hidden');
    
    const deletedCount = projects.filter(p => p.deleted).length;
    document.getElementById('publicInfo').innerHTML = `<i class="fas fa-shield-alt"></i><span>Режим редактирования • Удаленных: ${deletedCount}</span>`;
    
    document.getElementById('modeIndicator').textContent = 'Режим редактирования';
    document.getElementById('modeIndicator').classList.add('text-purple-400', 'font-bold');
    applyFilters();
}

function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function() {
        applyFilters(null, true);
    });
}

// === Activity Editor ===
window.openActivityEditor = function(actId = null) {
    editingActivityId = actId;
    document.getElementById('activityModalTitle').textContent = actId ? 'Редактировать активность' : 'Новая активность';
    document.getElementById('deleteActivityBtn').classList.toggle('hidden', !actId);
    
    document.getElementById('actName').value = '';
    document.getElementById('actDate').value = '';
    document.getElementById('actRichDesc').value = '';
    
    const actCatsContainer = document.getElementById('activityCategoryCheckboxes');
    mainProjectCategories = getSelectedCategories();
    actCatsContainer.innerHTML = mainProjectCategories.map(function(cat) {
        return '<label class="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"><input type="checkbox" value="' + cat + '" class="act-cat-checkbox rounded bg-slate-700"><span class="text-sm text-slate-300">' + cat + '</span></label>';
    }).join('');

    if (actId) {
        const act = currentEditingActivities.find(a => a.id === actId);
        if (act) {
            document.getElementById('actName').value = act.title;
            document.getElementById('actDate').value = act.date || '';
            document.getElementById('actRichDesc').value = act.description || '';
            if (act.categories) {
                document.querySelectorAll('.act-cat-checkbox').forEach(cb => {
                    cb.checked = act.categories.includes(cb.value);
                });
            }
        }
    }
    
    document.getElementById('activityModal').classList.add('active');
};

window.closeActivityModal = function() { document.getElementById('activityModal').classList.remove('active'); editingActivityId = null; };

window.saveActivityData = function() {
    const title = document.getElementById('actName').value;
    if (!title) { showToast('Введите название'); return; }
    
    const selectedCats = Array.from(document.querySelectorAll('.act-cat-checkbox:checked')).map(cb => cb.value);
    const actData = {
        id: editingActivityId || 'act_' + Date.now(),
        title: title,
        date: document.getElementById('actDate').value,
        categories: selectedCats.length > 0 ? selectedCats : mainProjectCategories,
        description: document.getElementById('actRichDesc').value,
        status: 'active'
    };

    if (editingActivityId) {
        const idx = currentEditingActivities.findIndex(a => a.id === editingActivityId);
        if (idx !== -1) currentEditingActivities[idx] = actData;
    } else {
        currentEditingActivities.push(actData);
    }
    
    const latestDate = getLatestActivityDate({ activities: currentEditingActivities });
    if (latestDate) {
        document.getElementById('projLastUpdated').value = latestDate.split('T')[0];
    }
    
    renderActivitiesAdminList();
    closeActivityModal();
    showToast('Активность сохранена');
};

window.deleteActivity = function() {
    if (editingActivityId && confirm('Удалить эту активность?')) {
        currentEditingActivities = currentEditingActivities.filter(a => a.id !== editingActivityId);
        
        const latestDate = getLatestActivityDate({ activities: currentEditingActivities });
        if (latestDate) {
            document.getElementById('projLastUpdated').value = latestDate.split('T')[0];
        } else {
            document.getElementById('projLastUpdated').value = '';
        }
        
        renderActivitiesAdminList();
        closeActivityModal();
        showToast('Активность удалена');
    }
};

function renderActivitiesAdminList() {
    const container = document.getElementById('activitiesListAdmin');
    if (currentEditingActivities.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-sm italic text-center py-4">Активности еще не добавлены.</p>';
        return;
    }
    container.innerHTML = currentEditingActivities.map(function(act) {
        const actDate = act.date ? formatDateForDisplay(act.date) : '';
        return '<div class="activity-item-admin">' +
            '<div><div class="font-bold text-white">' + act.title + '</div>' +
            '<div class="text-xs text-slate-400">' + (actDate ? actDate + ' • ' : '') + (act.categories ? act.categories.join(', ') : '') + '</div></div>' +
            '<div class="flex gap-2">' +
            '<button onclick="openActivityEditor(\'' + act.id + '\')" class="text-blue-400 hover:text-blue-300 p-1"><i class="fas fa-edit"></i></button>' +
            '<button onclick="currentEditingActivities = currentEditingActivities.filter(a => a.id !== \'' + act.id + '\'); renderActivitiesAdminList();" class="text-red-400 hover:text-red-300 p-1"><i class="fas fa-trash"></i></button>' +
            '</div></div>';
    }).join('');
}

window.endActivity = async function(projId, actId) {
    if (!confirm('Завершить эту активность?')) return;
    
    const project = projects.find(p => p.id === projId);
    if (project) {
        const actIdx = project.activities.findIndex(a => a.id === actId);
        if (actIdx !== -1) {
            project.activities[actIdx].status = 'ended';
            try {
                await setDoc(doc(db, "projects", projId), { activities: project.activities }, { merge: true });
                showToast('Активность завершена');
                if (currentDetailId === projId) openDetail(projId);
            } catch (e) { showToast('Ошибка сохранения'); }
        }
    }
};

window.resumeActivity = async function(projId, actId) {
    if (!confirm('Возобновить эту активность?')) return;
    
    const project = projects.find(p => p.id === projId);
    if (project) {
        const actIdx = project.activities.findIndex(a => a.id === actId);
        if (actIdx !== -1) {
            project.activities[actIdx].status = 'active';
            try {
                await setDoc(doc(db, "projects", projId), { activities: project.activities }, { merge: true });
                showToast('Активность возобновлена');
                if (currentDetailId === projId) openDetail(projId);
            } catch (e) { showToast('Ошибка сохранения'); }
        }
    }
};

window.insertActivityFormat = function(type) {
    const textarea = document.getElementById('actRichDesc');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (type === 'img') {
        pendingLinkInsert = { type: 'img', start, end, text: '' };
        document.getElementById('promptModal').classList.add('active');
        document.getElementById('promptInput').value = '';
        document.getElementById('promptInput').focus();
        document.getElementById('promptModal').querySelector('h2').textContent = 'Вставьте ссылку на картинку';
    } else if (type === 'link') {
        const linkText = selectedText.trim() ? selectedText : 'текст ссылки';
        pendingLinkInsert = { type: 'link', start, end, text: linkText };
        document.getElementById('promptModal').classList.add('active');
        document.getElementById('promptInput').value = '';
        document.getElementById('promptInput').focus();
        document.getElementById('promptModal').querySelector('h2').textContent = 'Вставьте ссылку';
    } else {
        if (type === 'h3') {
            textarea.value = textarea.value.substring(0, start) + '### ' + (selectedText || 'Заголовок') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 4 + (selectedText || 'Заголовок').length;
        } else if (type === 'ul') {
            textarea.value = textarea.value.substring(0, start) + '- ' + (selectedText || 'Пункт') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 2 + (selectedText || 'Пункт').length;
        } else if (type === 'quote') {
            textarea.value = textarea.value.substring(0, start) + '> ' + (selectedText || 'Цитата') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 2 + (selectedText || 'Цитата').length;
        } else if (type === 'hr') {
            textarea.value = textarea.value.substring(0, start) + '\n---\n' + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
    }
};

window.closePromptModal = function() {
    const modal = document.getElementById('promptModal');
    modal.classList.remove('active');
    document.getElementById('promptInput').value = '';
    pendingLinkInsert = null;
};

window.confirmLinkInsert = function() {
    const textarea = document.getElementById('actRichDesc');
    const url = document.getElementById('promptInput').value.trim();
    
    if (!url) { showToast('Введите ссылку'); return; }
    
    if (pendingLinkInsert && textarea) {
        const { start, end, type, text } = pendingLinkInsert;
        let insertion = '';
        
        if (type === 'img') {
            insertion = '![](' + url + ')';
        } else {
            insertion = '[' + text + '](' + url + ')';
        }
        
        textarea.value = textarea.value.substring(0, start) + insertion + textarea.value.substring(end);
        textarea.focus(); 
        textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
        showToast(type === 'img' ? 'Картинка добавлена' : 'Ссылка добавлена');
    }
    closePromptModal();
};

// === Project Management ===
window.openAddModal = function() {
    if (!isAdminMode) return;
    editingId = null;
    document.getElementById('addProjectForm').reset();
    document.getElementById('modalTitle').textContent = 'Добавить проект';
    document.getElementById('deleteBtn').classList.add('hidden');
    document.getElementById('projLastUpdated').valueAsDate = new Date();
    renderCategoryOptions();
    currentEditingActivities = [];
    renderActivitiesAdminList();
    isEditModalOpen = true;
    document.getElementById('addModal').classList.add('active');
};

window.closeAddModal = function() { 
    document.getElementById('addModal').classList.remove('active'); 
    isEditModalOpen = false;
};

window.editProject = function(id) {
    if (!isAdminMode) return;
    const project = projects.find(function(p) { return p.id === id; });
    if (!project) return;
    editingId = id;
    document.getElementById('projId').value = id;
    document.getElementById('projName').value = project.name;
    document.getElementById('projImage').value = project.image || '';
    document.getElementById('projGuideUrl').value = project.guideUrl || '';
    document.getElementById('projCryptoRank').value = project.cryptoRankUrl || '';
    document.getElementById('projTwitter').value = project.twitterUrl || '';
    document.getElementById('projRef').value = project.referralLink || '';
    document.getElementById('projDesc').value = project.description || '';
    document.getElementById('projStatus').value = project.status || 'active';
    
    const latestActivityDate = getLatestActivityDate(project);
    document.getElementById('projLastUpdated').value = latestActivityDate ? latestActivityDate.split('T')[0] : '';
    
    document.getElementById('projDaily').checked = project.hasDaily || false;
    document.getElementById('projPriority').checked = project.priority === 'high';
    
    renderCategoryOptions();
    setSelectedCategories(project.categories || []);
    
    currentEditingActivities = project.activities || [];
    renderActivitiesAdminList();

    document.getElementById('modalTitle').textContent = 'Редактировать проект';
    document.getElementById('deleteBtn').classList.remove('hidden');
    isEditModalOpen = true;
    document.getElementById('addModal').classList.add('active');
    window.closeDetailModal();
};

window.editCurrentProject = function() { if(currentDetailId) window.editProject(currentDetailId); };

window.saveProject = async function(e) {
    e.preventDefault();
    if (!isAdminMode) return;
    const now = new Date().toISOString();
    
    const projName = document.getElementById('projName').value.trim();
    if (!projName) { showToast('Введите название проекта'); return; }

    let id;
    if (editingId) {
        id = editingId;
    } else {
        id = projName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]+/g, '').substring(0, 50);
        id = id + '_' + Date.now().toString().slice(-6);
        
        const existingProject = projects.find(p => p.id === id);
        if (existingProject) id = id + '_' + Math.random().toString(36).substring(2, 5);
    }
    
    const selectedCats = getSelectedCategories();

    const projectData = {
        id: id,
        name: projName,
        categories: selectedCats,
        status: document.getElementById('projStatus').value,
        description: document.getElementById('projDesc').value,
        image: document.getElementById('projImage').value || '',
        guideUrl: document.getElementById('projGuideUrl').value || '',
        cryptoRankUrl: document.getElementById('projCryptoRank').value,
        twitterUrl: document.getElementById('projTwitter').value,
        referralLink: document.getElementById('projRef').value,
        hasDaily: document.getElementById('projDaily').checked,
        priority: document.getElementById('projPriority').checked ? 'high' : 'normal',
        lastUpdated: document.getElementById('projLastUpdated').value || now.split('T')[0],
        createdAt: editingId ? (projects.find(function(p) { return p.id === editingId; })?.createdAt || now) : now,
        activities: currentEditingActivities,
        deleted: false
    };
    
    try { 
        if (!id || id.trim() === '') throw new Error('Неверный ID проекта');
        
        await setDoc(doc(db, "projects", id), projectData, { merge: true }); 
        
        if (editingId) {
            const index = projects.findIndex(p => p.id === editingId);
            if (index !== -1) projects[index] = { ...projects[index], ...projectData };
        } else {
            projects.unshift(projectData);
        }
        
        sortProjects(currentSortType);
        applyFilters();
        
        showToast('Сохранено в облако!'); 
        window.closeAddModal(); 
    } catch (err) { 
        console.error('Error saving:', err); 
        showToast('Ошибка сохранения: ' + err.message); 
    }
};

window.deleteProject = async function() {
    if (!editingId || !confirm('Переместить проект в архив? Он будет скрыт от обычных пользователей.')) return;
    
    try {
        const deleteData = {
            deleted: true,
            deletedAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, "projects", editingId), deleteData, { merge: true });
        
        const project = projects.find(p => p.id === editingId);
        if (project) {
            project.deleted = true;
            project.deletedAt = deleteData.deletedAt;
        }
        
        applyFilters();
        closeAddModal();
        showToast('Проект перемещен в архив');
        
    } catch (err) {
        console.error('Error deleting:', err);
        showToast('Ошибка перемещения в архив');
    }
};

window.migrateToFirestore = async function() {
    if(!confirm('Внимание! Это перезапишет данные в базе текущими данными с экрана. Продолжить?')) return;
    let count = 0;
    for(const p of projects) { 
        await setDoc(doc(db, "projects", p.id), p, { merge: true }); 
        count++; 
    }
    showToast('Загружено ' + count + ' проектов в базу');
};

// === Categories ===
function getCategoriesWithCounts(allProjects) {
    const catCounts = {};
    allProjects.forEach(function(p) {
        if (p.categories) {
            p.categories.forEach(function(cat) {
                catCounts[cat] = (catCounts[cat] || 0) + 1;
            });
        }
    });
    return Object.entries(catCounts).sort(function(a, b) { return a[0].localeCompare(b[0]); });
}

function getAllCategoriesWithCounts(allProjects) {
    return getCategoriesWithCounts(allProjects);
}

function renderCategoryOptions() {
    const allCatsSet = new Set([...categories, ...getAllCategoriesFromProjects()]);
    const sortedCategories = Array.from(allCatsSet).sort();
    categories = sortedCategories;
    
    const container = document.getElementById('categoryCheckboxes');
    const selectedCats = editingId ? (projects.find(function(p) { return p.id === editingId; }).categories || []) : [];
    
    container.innerHTML = sortedCategories.map(function(cat) {
        const isSelected = selectedCats.includes(cat);
        return `<label class="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-all ${isSelected ? 'bg-blue-600/20 border-blue-500' : 'hover:bg-slate-700'}">
            <input type="checkbox" value="${cat}" class="category-checkbox rounded bg-slate-700 cursor-pointer" ${isSelected ? 'checked' : ''}>
            <span class="text-sm text-slate-300 flex-1">${cat}</span>
            ${isSelected ? '<i class="fas fa-check text-blue-400 text-xs"></i>' : ''}
        </label>`;
    }).join('');
    
    tempCustomCategories = [];
    renderTempCategories();
}

window.addCustomCategory = function() { 
    const val = document.getElementById('newCategoryInput').value.trim(); 
    if (!val) return; 
    val.split(',').map(function(c) { return c.trim(); }).forEach(function(cat) { 
        if(cat && tempCustomCategories.indexOf(cat) === -1 && categories.indexOf(cat) === -1) tempCustomCategories.push(cat); 
    }); 
    renderTempCategories(); 
    document.getElementById('newCategoryInput').value = ''; 
};

function renderTempCategories() { 
    document.getElementById('customCategories').innerHTML = tempCustomCategories.map(function(c, i) { 
        return '<span class="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">' + c + ' <i onclick="removeTempCat(' + i + ')" class="fas fa-times cursor-pointer ml-1"></i></span>'; 
    }).join(''); 
}

window.removeTempCat = function(i) { 
    tempCustomCategories.splice(i, 1); 
    renderTempCategories(); 
};

window.handleCategoryInput = function(e) { 
    if(e.key === 'Enter') window.addCustomCategory(); 
};

function getSelectedCategories() { 
    const selected = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(function(cb) { return cb.value; }); 
    const result = [...new Set([...selected, ...tempCustomCategories])];
    return result.length > 0 ? result : ['Other']; 
}

function setSelectedCategories(cats) { 
    tempCustomCategories = []; 
    renderTempCategories();
    
    document.querySelectorAll('.category-checkbox').forEach(function(cb) { 
        cb.checked = cats.includes(cb.value);
    }); 
    
    cats.forEach(function(cat) { 
        if(categories.indexOf(cat) === -1 && tempCustomCategories.indexOf(cat) === -1) {
            tempCustomCategories.push(cat); 
        }
    }); 
    renderTempCategories(); 
}

function updateSidebarActive() { 
    document.querySelectorAll('.sidebar-link').forEach(function(btn) { 
        const filter = btn.dataset.filter;
        btn.classList.remove('active');
        
        if (filter === 'all') {
            if (currentFilters.statuses.length === 0) btn.classList.add('active');
        } else {
            if (currentFilters.statuses.includes(filter)) btn.classList.add('active');
        }
    }); 
}

function updateCounts(filtered) {
    document.getElementById('countAll').textContent = filtered.length;
    document.getElementById('countToday').textContent = filtered.filter(function(p) { return isToday(p.createdAt); }).length;
    document.getElementById('countActive').textContent = filtered.filter(function(p) {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        const userFinished = projectCompleted || allActivitiesCompleted;
        return !userFinished;
    }).length;
    document.getElementById('countDaily').textContent = filtered.filter(function(p) { return p.hasDaily && p.status === 'active'; }).length;
    document.getElementById('countFavoritesSidebar').textContent = filtered.filter(function(p) { return userFavorites.includes(p.id); }).length;
    document.getElementById('countCompletedSidebar').textContent = filtered.filter(function(p) { 
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
    document.getElementById('countEnded').textContent = filtered.filter(function(p) { return p.status === 'ended'; }).length;
}

function updateStats(filtered) {
    document.getElementById('statActive').textContent = filtered.filter(function(p) {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        const userFinished = projectCompleted || allActivitiesCompleted;
        return !userFinished;
    }).length;
    document.getElementById('statToday').textContent = filtered.filter(function(p) { return isToday(p.createdAt); }).length;
    document.getElementById('statFavorites').textContent = filtered.filter(function(p) { return userFavorites.includes(p.id); }).length;
    document.getElementById('statCompleted').textContent = filtered.filter(function(p) { 
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
}

function isToday(dateString) { 
    if (!dateString) return false; 
    return new Date(dateString).toDateString() === new Date().toDateString(); 
}

function formatDate(str) { 
    if (!str) return '—'; 
    return new Date(str).toLocaleDateString('ru-RU'); 
}

window.showToast = function(msg) { 
    const t = document.getElementById('toast'); 
    document.getElementById('toastMessage').textContent = msg; 
    t.classList.remove('translate-y-20', 'opacity-0'); 
    setTimeout(function() { t.classList.add('translate-y-20', 'opacity-0'); }, 3000); 
};

function getAllCategoriesFromProjects() {
    const cats = new Set();
    projects.forEach(function(p) { 
        if(p.categories) p.categories.forEach(function(c) { cats.add(c); }); 
    });
    return Array.from(cats);
}

window.openStats = function() {
    if (!currentUser) { showToast('Войдите для просмотра статистики'); return; }
    if (currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") { showToast('Нет доступа к статистике'); return; }
    window.open('admin/stats.html', '_blank');
};

function enableUserEnterSend() {
    const inp = document.getElementById('feedbackUserReplyText');
    inp.onkeypress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserFeedbackReply();
        }
    };
}

// === Deleted Projects ===
window.openDeletedProjects = function() {
    if (!isAdminMode) { showToast('Только для администратора'); return; }
    loadDeletedProjects();
    document.getElementById('deletedProjectsModal').classList.add('active');
};

window.closeDeletedProjectsModal = function() {
    document.getElementById('deletedProjectsModal').classList.remove('active');
};

function loadDeletedProjects(search = '') {
    const deletedProjects = projects.filter(project => project.deleted === true);
    const filtered = deletedProjects.filter(project => 
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(search.toLowerCase()))
    );
    renderDeletedProjectsList(filtered);
}

function renderDeletedProjectsList(deletedProjects) {
    const container = document.getElementById('deletedProjectsList');
    const emptyState = document.getElementById('deletedEmptyState');
    
    if (deletedProjects.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    container.innerHTML = deletedProjects.map(project => {
        const deletedDate = project.deletedAt ? formatDateForDisplay(project.deletedAt) : 'Неизвестно';
        const categoriesHtml = (project.categories || ['Other']).map(cat => 
            `<span class="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">${cat}</span>`
        ).join('');
        
        return `<div class="deleted-project-card rounded-xl p-4">
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                    ${project.image ? `<img src="${project.image}" alt="${project.name}" class="w-10 h-10 rounded-lg object-cover border border-slate-700">` : `<div class="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">${project.name.charAt(0).toUpperCase()}</div>`}
                    <div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <h3 class="font-bold text-white">${project.name}</h3>
                            <span class="deleted-badge">Удален</span>
                        </div>
                        <div class="flex gap-2 mt-1 text-xs text-slate-400">${categoriesHtml}</div>
                    </div>
                </div>
                <div class="text-right text-xs text-slate-500">Удален: ${deletedDate}</div>
            </div>
            <p class="text-slate-400 text-sm mb-3 line-clamp-2">${project.description || 'Описание отсутствует'}</p>
            <div class="flex justify-between items-center">
                <div class="text-xs text-slate-500">Активностей: ${project.activities ? project.activities.length : 0}</div>
                <div class="flex gap-2">
                    <button onclick="previewDeletedProject('${project.id}')" class="text-slate-400 hover:text-blue-400 px-3 py-1 rounded border border-slate-600 hover:border-blue-400 text-sm transition-colors"><i class="fas fa-eye mr-1"></i> Просмотр</button>
                    <button onclick="restoreProject('${project.id}')" class="restore-btn flex items-center gap-1"><i class="fas fa-undo"></i> Восстановить</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

window.previewDeletedProject = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const originalDeleted = project.deleted;
    project.deleted = false;
    openDetail(projectId);
    const checkClosed = setInterval(() => {
        if (!document.getElementById('detailModal').classList.contains('active')) {
            project.deleted = originalDeleted;
            clearInterval(checkClosed);
        }
    }, 100);
};

window.restoreProject = async function(projectId) {
    if (!confirm('Восстановить этот проект?')) return;
    
    try {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        await setDoc(doc(db, "projects", projectId), {
            deleted: false,
            deletedAt: null
        }, { merge: true });
        
        project.deleted = false;
        project.deletedAt = null;
        
        showToast('Проект восстановлен!');
        loadDeletedProjects(document.getElementById('searchDeletedInput').value);
        applyFilters();
    } catch (error) {
        console.error('Error restoring:', error);
        showToast('Ошибка при восстановлении проекта');
    }
};

// === Image Modal ===
window.openImageModal = function(imgElement) {
    const activityBody = imgElement.closest('.activity-body');
    if (activityBody) {
        currentImages = Array.from(activityBody.querySelectorAll('img'));
        currentImageIndex = currentImages.indexOf(imgElement);
        
        if (currentImageIndex === -1) return;
        
        showImage(currentImageIndex);
        document.getElementById('imageModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showImage(index) {
    if (currentImages.length === 0) return;
    const imgElement = currentImages[index];
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgElement.src;
    currentImageIndex = index;
}

window.nextImage = function() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showImage(currentImageIndex);
}

window.prevImage = function() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentImageIndex);
}

window.closeImageModal = function() {
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = '';
    currentImages = [];
    currentImageIndex = 0;
}

document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) closeImageModal();
});

document.addEventListener('keydown', function(e) {
    const imageModal = document.getElementById('imageModal');
    if (!imageModal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape': closeImageModal(); break;
        case 'ArrowRight': nextImage(); break;
        case 'ArrowLeft': prevImage(); break;
    }
});

// === Export ===
window.exportAllData = async function() {
    if (!currentUser || currentUser.uid !== "SAkz4mdW9reDaIsvqigCNZhEKJR2") {
        showToast('Только администратор может экспортировать данные');
        return;
    }
    
    if (!confirm('Экспортировать все проекты в файл?')) return;
    
    const btn = event.target.closest('button') || document.querySelector('button[onclick="exportAllData()"]');
    const originalHtml = btn ? btn.innerHTML : '';
    if(btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Экспорт...';
    }
    
    try {
        showToast('Начинаю экспорт...');
        let allProjects = [];
        
        try {
            const snapshot = await getDocs(query(collection(db, "projects")));
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    allProjects.push({ id: doc.id, ...doc.data() });
                });
            }
        } catch (firestoreError) { console.error('Firestore error:', firestoreError); }
        
        if (allProjects.length === 0 && projects.length > 0) {
            allProjects = projects.map(p => ({ ...p }));
        }
        
        if (allProjects.length === 0) {
            try {
                const response = await fetch(EXTERNAL_DATA_URL);
                if (response.ok) {
                    const externalData = await response.json();
                    if (externalData.projects && externalData.projects.length > 0) {
                        allProjects = externalData.projects.map(normalizeData);
                    }
                }
            } catch (e) { console.error('GitHub error:', e); }
        }
        
        if (allProjects.length === 0) {
            alert('Не найдено проектов для экспорта!');
            showToast('Не найдено данных для экспорта');
        } else {
            const exportData = {
                exportDate: new Date().toISOString(),
                exportVersion: '1.0',
                totalProjects: allProjects.length,
                projects: allProjects,
                metadata: {
                    exportedBy: currentUser.email,
                    exportedByUid: currentUser.uid,
                    source: 'testnet-hub-firestore-export',
                    generatedAt: new Date().toISOString()
                }
            };
            
            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const date = new Date();
            const dateStr = date.toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `testnet-hub-backup-${dateStr}.json`;
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast(`Экспортировано ${allProjects.length} проектов`);
        }
    } catch (error) {
        console.error('Export error:', error);
        showToast('Ошибка экспорта: ' + error.message);
    } finally {
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = originalHtml || '<i class="fas fa-download"></i> Экспорт данных';
        }
    }
};

// === Local Backup ===
async function createLocalBackup() {
    try {
        let allProjects = [];
        if (projects.length > 0) {
            allProjects = projects.map(p => ({ ...p }));
        } else {
            const snapshot = await getDocs(collection(db, "projects"));
            snapshot.forEach((doc) => { allProjects.push({ id: doc.id, ...doc.data() }); });
        }
        
        if (allProjects.length > 0) {
            const backupData = { timestamp: new Date().toISOString(), totalProjects: allProjects.length, projects: allProjects };
            localStorage.setItem('testnet_hub_local_backup', JSON.stringify(backupData));
        }
    } catch (e) { console.error('Backup error:', e); }
}

const originalSaveProject = window.saveProject;
window.saveProject = async function(e) {
    await originalSaveProject(e);
    if (currentUser && currentUser.uid === "SAkz4mdW9reDaIsvqigCNZhEKJR2") {
        await createLocalBackup();
    }
};

// === Hero Section ===
let isHeroCollapsed = false;

function initHeroState() {
    const savedState = localStorage.getItem('heroCollapsed');
    if (savedState === 'true') collapseHero(false);
}

window.toggleHeroSection = function() {
    const heroSection = document.getElementById('heroSection');
    const expandBtn = document.getElementById('heroExpandBtn');
    const collapseText = document.getElementById('heroCollapseText');
    
    if (isHeroCollapsed) {
        heroSection.classList.remove('collapsed');
        expandBtn.classList.remove('visible');
        if (collapseText) collapseText.textContent = 'Свернуть приветствие';
        isHeroCollapsed = false;
        saveHeroState(false);
    } else {
        collapseHero(true);
    }
};

function collapseHero(withAnimation = true) {
    const heroSection = document.getElementById('heroSection');
    const expandBtn = document.getElementById('heroExpandBtn');
    const collapseText = document.getElementById('heroCollapseText');
    
    if (!withAnimation) heroSection.style.transition = 'none';
    
    heroSection.classList.add('collapsed');
    expandBtn.classList.add('visible');
    if (collapseText) collapseText.textContent = 'Развернуть приветствие';
    isHeroCollapsed = true;
    
    if (!withAnimation) setTimeout(() => { heroSection.style.transition = ''; }, 50);
    
    saveHeroState(true);
}

async function saveHeroState(collapsed) {
    localStorage.setItem('heroCollapsed', collapsed);
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { heroCollapsed: collapsed });
        } catch (error) { console.error('Error saving Hero:', error); }
    }
}

async function loadHeroStateFromFirestore(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.heroCollapsed !== undefined) {
                localStorage.setItem('heroCollapsed', data.heroCollapsed);
                if (data.heroCollapsed) collapseHero(false);
            }
        }
    } catch (e) { console.log('Error loading Hero state:', e); }
}

// === UI Helpers ===
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

function initModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

function initForms() {}
function initTabs() {}
function initDropdowns() {}
function initTooltips() {}

function initScrollEffects() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initAnimations() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count || counter.textContent);
        const duration = 2000;
        const start = Date.now();
        
        const updateCounter = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            counter.textContent = current;
            if (progress < 1) requestAnimationFrame(updateCounter);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { updateCounter(); observer.unobserve(entry.target); }
            });
        });
        observer.observe(counter);
    });
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function setupSearchFunctionality() {}
function setupContactForm() {}

function setupEventListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

function startHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }
}

// === Loading Screen ===
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }
});

console.log('app.js loaded successfully');
