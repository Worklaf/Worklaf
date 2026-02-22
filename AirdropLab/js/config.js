// =====================================================
// CONFIG.JS — Firebase, константы и глобальное состояние
// =====================================================

// 🔥 Firebase Configuration
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// 📦 Storage Keys
export const STORAGE_KEY = 'arc_tracker_v3';
export const COMPLETED_KEY = 'arc_completed_v1';

// 👤 Admin UID
export const ADMIN_UID = "SAkz4mdW9reDaIsvqigCNZhEKJR2";

// 🔗 External Data URL
export const EXTERNAL_DATA_URL = './data/projects.json';

// 🏷️ Categories
export const categories = ['DeFi', 'Gaming', 'Infra', 'L1/L2', 'NFT', 'Social', 'Other'];

// =====================================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ
// =====================================================

export let projects = [];
export let currentUser = null;
export let userFavorites = [];
export let userCompleted = [];
export let arcData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

export let isAdminMode = false;
export let currentDetailId = null;
export let editingId = null;
export let isEditModalOpen = false;

export let currentFilters = { statuses: [], categories: [] };
export let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 10;
export let currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;

export let currentFilteredList = [];
export let currentEditingActivities = [];
export let editingActivityId = null;

export let mainProjectCategories = [];
export let currentSortType = 'latest';

export let tempCustomCategories = [];
export let adminClickCount = 0;
export const ADMIN_CLICK_THRESHOLD = 5;

export let notifications = [];
export let unreadNotificationsCount = 0;
export let notificationsUnsubscribe = null;

export let adminFeedbacks = [];
export let adminFeedbacksUnsubscribe = null;

export let currentImageIndex = 0;
export let currentImages = [];

export let pendingLinkInsert = null;
export let pendingImgInsert = null;

export let firstDataLoadComplete = false;

export let isHeroCollapsed = false;

// =====================================================
// ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ СОСТОЯНИЯ
// =====================================================

export function setProjects(v) { projects = v; }
export function setCurrentUser(v) { currentUser = v; }
export function setUserFavorites(v) { userFavorites = v; }
export function setUserCompleted(v) { userCompleted = v; }
export function setArcData(v) { arcData = v; }
export function setIsAdminMode(v) { isAdminMode = v; }
export function setCurrentDetailId(v) { currentDetailId = v; }
export function setEditingId(v) { editingId = v; }
export function setIsEditModalOpen(v) { isEditModalOpen = v; }
export function setCurrentFilters(v) { currentFilters = v; }

export function setCurrentPage(v) {
    currentPage = v;
    localStorage.setItem('currentPage', v);
}

export function setCurrentFilteredList(v) { currentFilteredList = v; }
export function setCurrentEditingActivities(v) { currentEditingActivities = v; }
export function setEditingActivityId(v) { editingActivityId = v; }
export function setMainProjectCategories(v) { mainProjectCategories = v; }
export function setCurrentSortType(v) { currentSortType = v; }

export function setTempCustomCategories(v) { tempCustomCategories = v; }
export function setAdminClickCount(v) { adminClickCount = v; }

export function setNotifications(v) { notifications = v; }
export function setUnreadNotificationsCount(v) { unreadNotificationsCount = v; }
export function setAdminFeedbacks(v) { adminFeedbacks = v; }

export function setCurrentImages(v) { currentImages = v; }
export function setCurrentImageIndex(v) { currentImageIndex = v; }

export function setPendingLinkInsert(v) { pendingLinkInsert = v; }
export function setPendingImgInsert(v) { pendingImgInsert = v; }

export function setFirstDataLoadComplete(v) { firstDataLoadComplete = v; }
export function setIsHeroCollapsed(v) { isHeroCollapsed = v; }
