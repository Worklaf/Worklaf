// Функции аутентификации

// Открыть модалку входа
window.openLoginModal = function() { 
    document.getElementById('loginModal').classList.add('active'); 
};

// Закрыть модалку входа
window.closeLoginModal = function() { 
    document.getElementById('loginModal').classList.remove('active'); 
};

// Вход через Google
window.loginGoogle = async function() { 
    try { 
        await signInWithPopup(auth, new GoogleAuthProvider()); 
        closeLoginModal(); 
        showToast('Вход: Google'); 
    } catch(e) { 
        showToast(e.message); 
    } 
};

// Вход через Twitter
window.loginTwitter = async function() { 
    try { 
        await signInWithPopup(auth, new TwitterAuthProvider()); 
        closeLoginModal(); 
        showToast('Вход: Twitter'); 
    } catch(e) { 
        showToast(e.message); 
    } 
};

// Вход по email/password
window.handleEmailAuth = async function(e) { 
    e.preventDefault(); 
    const email = document.getElementById('emailInput').value; 
    const pass = document.getElementById('passInput').value; 
    try { 
        await signInWithEmailAndPassword(auth, email, pass); 
        closeLoginModal(); 
        showToast('Вход выполнен'); 
    } catch(e) { 
        showToast(e.message); 
    } 
};

// Регистрация
window.handleRegister = async function() { 
    const email = document.getElementById('emailInput').value; 
    const pass = document.getElementById('passInput').value; 
    try { 
        await createUserWithEmailAndPassword(auth, email, pass); 
        closeLoginModal(); 
        showToast('Аккаунт создан!'); 
    } catch(e) { 
        showToast(e.message); 
    } 
};

// Выход
window.logout = function() { 
    signOut(auth).then(() => {
        showToast('Вы вышли из системы');
        localStorage.removeItem('favorites_backup');
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        userFavorites = [];
        userCompleted = [];
        arcData = {};
    }); 
};

// Сохранение данных пользователя
async function saveUserData(user) {
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
            const updates = { lastLogin: serverTimestamp() };
            
            if (!userData.firstLogin) {
                updates.firstLogin = serverTimestamp();
            }
            
            if (!userData.provider && user.providerData[0]) {
                updates.provider = user.providerData[0].providerId;
            }
            
            await updateDoc(userRef, updates);
        }
    } catch (e) {
        console.error('❌ Ошибка сохранения данных пользователя:', e);
    }
}

// Синхронизация localStorage с Firestore
async function syncLocalStorageToFirestore(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) return;
        
        const updates = {};
        
        const localFavorites = JSON.parse(localStorage.getItem(CONFIG.FAVORITES_KEY) || '[]');
        if (localFavorites.length > 0) {
            updates.favorites = localFavorites;
        }
        
        const localCompleted = JSON.parse(localStorage.getItem(CONFIG.COMPLETED_KEY) || '[]');
        if (localCompleted.length > 0) {
            updates.completed = localCompleted;
        }
        
        const localGuideStats = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '{}');
        if (Object.keys(localGuideStats).length > 0) {
            updates.arcGuideStats = localGuideStats;
        }
        
        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
        }
    } catch (e) {
        console.error('❌ Ошибка синхронизации localStorage:', e);
    }
}

// Обработчик состояния авторизации
function setupAuthListener() {
    onAuthStateChanged(auth, async function(user) {
        const now = new Date().toISOString();

        if (user) {
            currentUser = user;
            await saveUserData(user);
            await syncLocalStorageToFirestore(user.uid);
            
            document.getElementById('generalFeedbackPanel').classList.remove('hidden');
            initFeedbacksListener(user.uid);

            if (user.uid === CONFIG.ADMIN_UID) {
                activateAdminMode();
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                const userData = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    lastLogin: now
                };
                
                await loadHeroStateFromFirestore(user.uid);
                
                if (userDoc.exists()) {
                    await updateDoc(userRef, userData);
                } else {
                    await setDoc(userRef, { ...userData, firstLogin: now });
                }
            } catch (e) {
                console.error('Error:', e);
            }

            document.getElementById('loggedOutView').classList.add('hidden');
            document.getElementById('loggedInView').classList.remove('hidden');
            document.getElementById('guestWarning').classList.add('hidden');

            document.getElementById('userAvatar').src =
                user.photoURL ||
                'https://ui-avatars.com/api/?name=' + (user.email || 'User') + '&background=random';

            document.getElementById('userName').textContent =
                user.displayName || user.email.split('@')[0];

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                userFavorites = data.favorites || [];
                userCompleted = data.completed || [];

                if (data.arcGuideStats) {
                    arcData = { ...arcData, ...data.arcGuideStats };
                    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(arcData));
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

            if (notificationsUnsubscribe) {
                notificationsUnsubscribe();
                notificationsUnsubscribe = null;
            }
            if (adminFeedbacksUnsubscribe) {
                adminFeedbacksUnsubscribe();
                adminFeedbacksUnsubscribe = null;
            }

            notifications = [];
            unreadNotificationsCount = 0;
            updateNotificationBadge();

            document.getElementById('loggedOutView').classList.remove('hidden');
            document.getElementById('loggedInView').classList.add('hidden');
            document.getElementById('guestWarning').classList.remove('hidden');

            arcData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || [];
            userCompleted = JSON.parse(localStorage.getItem(CONFIG.COMPLETED_KEY) || []);

            applyFilters();
        }
    });
}
