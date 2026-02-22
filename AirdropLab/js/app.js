// =====================================================
// APP.JS - Главный файл приложения (инициализация)
// =====================================================

import { 
    projects, 
    currentUser, 
    setCurrentUser,
    userFavorites,
    userCompleted,
    setUserFavorites,
    setUserCompleted,
    arcData,
    setArcData,
    loadFromLocalStorage
} from './config.js';

import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    collection, 
    getDocs, 
    query, 
    where,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { applyFilters, updateCategoryUI, updateCounts, showToast } from './ui.js';
import { initAuth, logout } from './auth.js';

// ==========================================
// LOAD PROJECTS FROM FIRESTORE
// ==========================================

async function loadProjects() {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        projects.length = 0; // Clear array
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.deleted) { // Don't load archived projects
                projects.push({
                    id: doc.id,
                    ...data
                });
            }
        });
        
        console.log('✅ Загружено проектов:', projects.length);
    } catch (error) {
        console.error('❌ Ошибка загрузки проектов:', error);
        showToast('Ошибка загрузки проектов', 'error');
    }
}

// ==========================================
// LOAD USER DATA FROM FIRESTORE
// ==========================================

async function loadUserData(userId) {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            const data = userDoc.data();
            
            if (data.favorites) {
                userFavorites.length = 0;
                userFavorites.push(...data.favorites);
            }
            
            if (data.completed) {
                userCompleted.length = 0;
                userCompleted.push(...data.completed);
            }
            
            if (data.arcData) {
                Object.keys(arcData).forEach(k => delete arcData[k]);
                Object.assign(arcData, data.arcData);
            }
            
            console.log('✅ Данные пользователя загружены');
        } else {
            // Create new user document
            await setDoc(userDocRef, {
                favorites: [],
                completed: [],
                arcData: {},
                createdAt: new Date().toISOString()
            });
            console.log('✅ Создан новый документ пользователя');
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки данных пользователя:', error);
        // Fallback to localStorage
        loadFromLocalStorage();
    }
}

// ==========================================
// SYNC USER DATA TO FIRESTORE
// ==========================================

export async function syncUserData() {
    if (!currentUser) return;
    
    try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
            favorites: userFavorites,
            completed: userCompleted,
            arcData: arcData,
            lastSync: new Date().toISOString()
        }, { merge: true });
        
        console.log('✅ Данные синхронизированы с Firebase');
    } catch (error) {
        console.error('❌ Ошибка синхронизации:', error);
    }
}

// ==========================================
// AUTH STATE LISTENER
// ==========================================

onAuthStateChanged(auth, async (user) => {
    if (user) {
        setCurrentUser(user);
        console.log('👤 Пользователь вошёл:', user.email);
        
        // Update UI
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('userSection').classList.remove('hidden');
        document.getElementById('userName').textContent = user.displayName || user.email;
        
        if (user.photoURL) {
            document.getElementById('userAvatar').src = user.photoURL;
        }
        
        // Load user data from Firestore
        await loadUserData(user.uid);
        
        // Re-render projects with user data
        applyFilters();
        updateCounts();
        
    } else {
        setCurrentUser(null);
        console.log('👤 Пользователь вышел');
        
        // Update UI
        document.getElementById('authSection').classList.remove('hidden');
        document.getElementById('userSection').classList.add('hidden');
        
        // Clear user data
        userFavorites.length = 0;
        userCompleted.length = 0;
        Object.keys(arcData).forEach(k => delete arcData[k]);
        
        // Load from localStorage as fallback
        loadFromLocalStorage();
        
        // Re-render
        applyFilters();
        updateCounts();
    }
});

// ==========================================
// INIT APP
// ==========================================

async function initApp() {
    console.log('🚀 Инициализация приложения...');
    
    // Show loading
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('hidden');
    
    try {
        // Load projects from Firestore
        await loadProjects();
        
        // Initialize auth
        initAuth();
        
        // Update UI
        updateCategoryUI();
        applyFilters();
        updateCounts();
        
        // Hide loading
        if (loading) loading.classList.add('hidden');
        
        console.log('✅ Приложение инициализировано');
        
    } catch (error) {
        console.error('❌ Ошибка инициализации:', error);
        showToast('Ошибка загрузки приложения', 'error');
        
        if (loading) loading.classList.add('hidden');
    }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    // Escape - close modals
    if (e.key === 'Escape') {
        const detailModal = document.getElementById('detailModal');
        const projectModal = document.getElementById('projectModal');
        const feedbackModal = document.getElementById('feedbackModal');
        const lightbox = document.getElementById('lightbox');
        
        if (detailModal && !detailModal.classList.contains('hidden')) {
            window.closeDetailModal();
        }
        if (projectModal && !projectModal.classList.contains('hidden')) {
            window.closeProjectModal();
        }
        if (feedbackModal && !feedbackModal.classList.contains('hidden')) {
            window.closeFeedbackModal();
        }
        if (lightbox && !lightbox.classList.contains('hidden')) {
            window.closeLightbox();
        }
    }
    
    // Ctrl/Cmd + K - focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Arrow keys in lightbox
    if (!document.getElementById('lightbox').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') window.prevImage();
        if (e.key === 'ArrowRight') window.nextImage();
    }
});

// ==========================================
// AUTO-SAVE EVERY 5 MINUTES
// ==========================================

setInterval(() => {
    if (currentUser) {
        syncUserData();
    }
}, 5 * 60 * 1000); // 5 minutes

// ==========================================
// SAVE ON WINDOW UNLOAD
// ==========================================

window.addEventListener('beforeunload', () => {
    if (currentUser) {
        syncUserData();
    }
});

// ==========================================
// START APP
// ==========================================

document.addEventListener('DOMContentLoaded', initApp);

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

export { syncUserData, loadProjects, loadUserData };
