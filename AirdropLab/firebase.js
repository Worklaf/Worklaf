import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, addDoc, serverTimestamp, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { FIREBASE_CONFIG, ADMIN_UID, setCurrentUser, setUserFavorites, setUserCompleted, setArcData, setIsAdminMode } from './config.js';

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ==================
// AUTH FUNCTIONS
// ==================
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

// ==================
// FIRESTORE FUNCTIONS
// ==================
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

export async function loadProjectsFromFirestore(callback) {
    return onSnapshot(collection(db, "projects"), (snapshot) => {
        const projects = [];
        snapshot.forEach((docSnap) => {
            projects.push({ id: docSnap.id, ...docSnap.data() });
        });
        callback(projects);
    });
}

export async function saveUserData(user) {
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
            await updateDoc(userRef, { lastLogin: serverTimestamp() });
        }
    } catch (e) {
        console.error('Ошибка сохранения пользователя:', e);
    }
}

export async function syncUserData(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const data = userSnap.data();
            setUserFavorites(data.favorites || []);
            setUserCompleted(data.completed || []);
            
            if (data.arcGuideStats) {
                setArcData({ ...arcData, ...data.arcGuideStats });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData));
            }
        }
    } catch (e) {
        console.error('Ошибка синхронизации:', e);
    }
}

export function initAuthListener(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setCurrentUser(user);
            await saveUserData(user);
            await syncUserData(user.uid);
            
            if (user.uid === ADMIN_UID) {
                setIsAdminMode(true);
            }
        } else {
            setCurrentUser(null);
            setUserFavorites([]);
            setUserCompleted([]);
        }
        
        callback(user);
    });
}

// ==================
// FEEDBACK SYSTEM
// ==================
export async function sendFeedback(projectId, projectName, category, message) {
    try {
        await addDoc(collection(db, "feedbacks"), {
            projectId: projectId,
            projectName: projectName,
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

// Экспортируем showToast (нужна для auth функций)
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    document.getElementById('toastMessage').textContent = msg;
    t.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => t.classList.add('translate-y-20', 'opacity-0'), 3000);
}
