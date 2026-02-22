// =====================================================
// FIREBASE.JS - Вся работа с Firebase
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, addDoc, serverTimestamp, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { 
    FIREBASE_CONFIG, 
    ADMIN_UID, 
    STORAGE_KEY,
    setCurrentUser, 
    setUserFavorites, 
    setUserCompleted, 
    setArcData, 
    setIsAdminMode,
    arcData,
    currentUser
} from './config.js';

import { showToast } from './ui.js';

// Инициализация Firebase
const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ==========================================
// AUTH FUNCTIONS
// ==========================================

export function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

export function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

export async function loginGoogle() {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        closeLoginModal();
        showToast('Вход: Google');
    } catch (e) {
        showToast(e.message);
    }
}

export async function loginTwitter() {
    try {
        await signInWithPopup(auth, new TwitterAuthProvider());
        closeLoginModal();
        showToast('Вход: Twitter');
    } catch (e) {
        showToast(e.message);
    }
}

export async function handleEmailAuth(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const pass = document.getElementById('passInput').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        closeLoginModal();
        showToast('Вход выполнен');
    } catch (e) {
        showToast(e.message);
    }
}

export async function handleRegister() {
    const email = document.getElementById('emailInput').value;
    const pass = document.getElementById('passInput').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        closeLoginModal();
        showToast('Аккаунт создан!');
    } catch (e) {
        showToast(e.message);
    }
}

export function logout() {
    signOut(auth).then(() => {
        showToast('Вы вышли из системы');
        localStorage.removeItem('favorites_backup');
        localStorage.removeItem(STORAGE_KEY);
        setUserFavorites([]);
        setUserCompleted([]);
        setArcData({});
    });
}

// ==========================================
// USER DATA FUNCTIONS
// ==========================================

export async function saveUserData(user) {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            console.log('🆕 Создание нового пользователя:', user.email);
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
            const updates = {
                lastLogin: serverTimestamp()
            };
            
            if (!userData.firstLogin) {
                console.log('⚠️ Добавление firstLogin');
                updates.firstLogin = serverTimestamp();
            }
            
            if (!userData.provider && user.providerData[0]) {
                console.log('⚠️ Добавление provider:', user.providerData[0].providerId);
                updates.provider = user.providerData[0].providerId;
            }
            
            await updateDoc(userRef, updates);
        }
    } catch (e) {
        console.error('❌ Ошибка сохранения пользователя:', e);
    }
}

export async function syncLocalStorageToFirestore(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) return;
        
        const updates = {};
        
        const localFavorites = JSON.parse(localStorage.getItem('favorites_backup') || '[]');
        if (localFavorites.length > 0) {
            console.log('💾 Синхронизация избранного:', localFavorites.length);
            updates.favorites = localFavorites;
        }
        
        const localCompleted = JSON.parse(localStorage.getItem('arc_completed_v1') || '[]');
        if (localCompleted.length > 0) {
            console.log('💾 Синхронизация завершённых:', localCompleted.length);
            updates.completed = localCompleted;
        }
        
        const localGuideStats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (Object.keys(localGuideStats).length > 0) {
            console.log('💾 Синхронизация статистики гайдов:', Object.keys(localGuideStats).length);
            updates.arcGuideStats = localGuideStats;
        }
        
        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
            console.log('✅ Данные синхронизированы');
        }
    } catch (e) {
        console.error('❌ Ошибка синхронизации:', e);
    }
}

export async function loadHeroStateFromFirestore(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.heroCollapsed !== undefined) {
                localStorage.setItem('heroCollapsed', data.heroCollapsed);
                
                if (data.heroCollapsed) {
                    window.collapseHero(false);
                }
            }
        }
    } catch (e) {
        console.log('Ошибка загрузки Hero:', e);
    }
}

// ==========================================
// FIRESTORE OPERATIONS
// ==========================================

export async function saveProject(projectData) {
    try {
        const id = projectData.id;
        if (!id || id.trim() === '') {
            throw new Error('Неверный ID проекта');
        }
        await setDoc(doc(db, "projects", id), projectData, { merge: true });
        return true;
    } catch (err) {
        console.error('Ошибка сохранения:', err);
        throw err;
    }
}

export async function deleteProjectFromFirestore(id) {
    try {
        await deleteDoc(doc(db, "projects", id));
        return true;
    } catch (err) {
        console.error('Ошибка удаления:', err);
        throw err;
    }
}

export function loadProjectsFromFirestore(callback) {
    return onSnapshot(collection(db, "projects"), (snapshot) => {
        const projects = [];
        snapshot.forEach((docSnap) => {
            projects.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(projects);
    });
}

// ==========================================
// FEEDBACK SYSTEM
// ==========================================

export async function sendFeedback(projectId, projectName, projectLogo, category, message) {
    try {
        await addDoc(collection(db, "feedbacks"), {
            projectId: projectId,
            projectName: projectName,
            projectLogo: projectLogo,
            category: category,
            userId: auth.currentUser.uid,
            userName: auth.currentUser.displayName || auth.currentUser.email,
            userPhoto: auth.currentUser.photoURL || '',
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
        return true;
    } catch (e) {
        console.error('Ошибка отправки отзыва:', e);
        throw e;
    }
}

export function initFeedbacksListener(uid, callback) {
    const isAdmin = uid === ADMIN_UID;
    const q = isAdmin 
        ? query(collection(db, "feedbacks"))
        : query(collection(db, "feedbacks"), where("userId", "==", uid));
    
    return onSnapshot(q, (snapshot) => {
        const feedbacks = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (isAdmin && data.deleted) return;
            if (!isAdmin && data.userDeleted) return;
            feedbacks.push({ id: doc.id, ...data });
        });
        callback(feedbacks);
    });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

export function initNotificationsListener(uid, callback) {
    const notifQuery = query(collection(db, "notifications"), where("userId", "==", uid));
    return onSnapshot(notifQuery, (snapshot) => {
        const notifications = snapshot.docs.map((doc) => {
            return { 
                id: doc.id, 
                ...doc.data(), 
                createdAt: doc.data().createdAt && doc.data().createdAt.toDate ? doc.data().createdAt.toDate() : new Date() 
            };
        }).sort((a, b) => b.createdAt - a.createdAt);
        callback(notifications);
    });
}

export async function markNotificationAsRead(notifId) {
    try {
        await updateDoc(doc(db, "notifications", notifId), { read: true });
    } catch (e) {
        console.error('Ошибка:', e);
    }
}

// ==========================================
// AUTH STATE LISTENER
// ==========================================

export function initAuthListener(onUserChange) {
    onAuthStateChanged(auth, onUserChange);
}
