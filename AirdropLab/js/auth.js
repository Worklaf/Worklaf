// =====================================================
// AUTH.JS - Система авторизации
// =====================================================

import { auth, db } from './firebase.js';
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    doc, 
    setDoc, 
    getDoc,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showToast } from './ui.js';
import { currentUser, setCurrentUser } from './config.js';

// ==========================================
// GOOGLE SIGN IN
// ==========================================

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        console.log('✅ Google вход успешен:', user.email);
        
        // Создаем или обновляем профиль пользователя в Firestore
        await createOrUpdateUserProfile(user);
        
        showToast('Вход выполнен успешно!', 'success');
        return user;
        
    } catch (error) {
        console.error('❌ Ошибка Google входа:', error);
        
        let errorMessage = 'Ошибка входа через Google';
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Окно входа было закрыто';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Всплывающее окно заблокировано браузером';
        } else if (error.code === 'auth/cancelled-popup-request') {
            errorMessage = 'Запрос на вход был отменен';
        }
        
        showToast(errorMessage, 'error');
        throw error;
    }
}

// ==========================================
// EMAIL/PASSWORD SIGN IN
// ==========================================

export async function signInWithEmail(email, password) {
    if (!email || !password) {
        showToast('Заполните все поля', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Неверный формат email', 'error');
        return;
    }
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('✅ Email вход успешен:', user.email);
        showToast('Вход выполнен успешно!', 'success');
        
        return user;
        
    } catch (error) {
        console.error('❌ Ошибка Email входа:', error);
        
        let errorMessage = 'Ошибка входа';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Пользователь не найден';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Неверный пароль';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Неверный формат email';
        } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'Аккаунт заблокирован';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Слишком много попыток. Попробуйте позже';
        }
        
        showToast(errorMessage, 'error');
        throw error;
    }
}

// ==========================================
// EMAIL/PASSWORD SIGN UP
// ==========================================

export async function signUpWithEmail(email, password, displayName) {
    if (!email || !password) {
        showToast('Заполните все поля', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Неверный формат email', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Обновляем профиль с именем
        if (displayName) {
            await updateProfile(user, {
                displayName: displayName
            });
        }
        
        console.log('✅ Регистрация успешна:', user.email);
        
        // Создаем профиль в Firestore
        await createOrUpdateUserProfile(user, displayName);
        
        showToast('Регистрация успешна!', 'success');
        return user;
        
    } catch (error) {
        console.error('❌ Ошибка регистрации:', error);
        
        let errorMessage = 'Ошибка регистрации';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Email уже используется';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Неверный формат email';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Слишком слабый пароль';
        }
        
        showToast(errorMessage, 'error');
        throw error;
    }
}

// ==========================================
// PASSWORD RESET
// ==========================================

export async function resetPassword(email) {
    if (!email) {
        showToast('Введите email', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Неверный формат email', 'error');
        return;
    }
    
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('✅ Письмо для сброса пароля отправлено на:', email);
        showToast('Письмо для сброса пароля отправлено!', 'success');
        
    } catch (error) {
        console.error('❌ Ошибка сброса пароля:', error);
        
        let errorMessage = 'Ошибка отправки письма';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'Пользователь не найден';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Неверный формат email';
        }
        
        showToast(errorMessage, 'error');
        throw error;
    }
}

// ==========================================
// LOGOUT
// ==========================================

export async function logout() {
    try {
        await signOut(auth);
        console.log('✅ Выход выполнен');
        showToast('Вы вышли из аккаунта', 'info');
        
    } catch (error) {
        console.error('❌ Ошибка выхода:', error);
        showToast('Ошибка выхода', 'error');
        throw error;
    }
}

// ==========================================
// CREATE OR UPDATE USER PROFILE
// ==========================================

async function createOrUpdateUserProfile(user, displayName = null) {
    try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        const userData = {
            email: user.email,
            displayName: displayName || user.displayName || 'Anonymous',
            photoURL: user.photoURL || null,
            lastLogin: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        if (!userDoc.exists()) {
            // Новый пользователь
            userData.createdAt = serverTimestamp();
            userData.favorites = [];
            userData.completed = [];
            userData.arcData = {};
            userData.isAdmin = false;
            
            await setDoc(userDocRef, userData);
            console.log('✅ Создан новый профиль пользователя');
        } else {
            // Обновляем существующего
            await setDoc(userDocRef, userData, { merge: true });
            console.log('✅ Профиль пользователя обновлен');
        }
        
    } catch (error) {
        console.error('❌ Ошибка создания/обновления профиля:', error);
    }
}

// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// CHECK IF USER IS ADMIN
// ==========================================

export async function checkIfAdmin(userId) {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data.isAdmin === true;
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ Ошибка проверки прав админа:', error);
        return false;
    }
}

// ==========================================
// INIT AUTH UI
// ==========================================

export function initAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    
    // Google Login
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            try {
                await signInWithGoogle();
            } catch (error) {
                // Error handled in signInWithGoogle
            }
        });
    }
    
    // Email Login
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            try {
                await signInWithEmail(email, password);
            } catch (error) {
                // Error handled in signInWithEmail
            }
        });
    }
    
    // Email Signup
    if (signupBtn) {
        signupBtn.addEventListener('click', async () => {
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const displayName = document.getElementById('signupName').value.trim();
            
            try {
                await signUpWithEmail(email, password, displayName);
            } catch (error) {
                // Error handled in signUpWithEmail
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await logout();
            } catch (error) {
                // Error handled in logout
            }
        });
    }
    
    // Forgot Password
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value.trim();
            
            if (!email) {
                showToast('Введите email для сброса пароля', 'error');
                return;
            }
            
            try {
                await resetPassword(email);
            } catch (error) {
                // Error handled in resetPassword
            }
        });
    }
    
    // Enter key handlers
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
    }
    
    const signupPassword = document.getElementById('signupPassword');
    
    if (signupPassword) {
        signupPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                signupBtn.click();
            }
        });
    }
}

// ==========================================
// EXPORT
// ==========================================

export { 
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    logout,
    initAuth,
    checkIfAdmin
};
