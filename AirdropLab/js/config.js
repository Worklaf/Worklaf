// =====================================================
// CONFIG.JS - Константы и Firebase конфигурация
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

// ==========================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ
// ==========================================

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

// ==========================================
// ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ СОСТОЯНИЯ
// ==========================================

export function setProjects(value) { projects = value; }
export function setCurrentUser(value) { currentUser = value; }
export function setUserFavorites(value) { userFavorites = value; }
export function setUserCompleted(value) { userCompleted = value; }
export function setArcData(value) { arcData = value; }
export function setIsAdminMode(value) { isAdminMode = value; }
export function setCurrentDetailId(value) { currentDetailId = value; }
export function setEditingId(value) { editingId = value; }
export function setIsEditModalOpen(value) { isEditModalOpen = value; }
export function setCurrentFilters(value) { currentFilters = value; }
export function setCurrentPage(value) { 
    currentPage = value;
    localStorage.setItem('currentPage', value);
}
export function setCurrentFilteredList(value) { currentFilteredList = value; }
export function setCurrentEditingActivities(value) { currentEditingActivities = value; }
export function setEditingActivityId(value) { editingActivityId = value; }
export function setMainProjectCategories(value) { mainProjectCategories = value; }
export function setCurrentSortType(value) { currentSortType = value; }
export function setTempCustomCategories(value) { tempCustomCategories = value; }
export function setNotifications(value) { notifications = value; }
export function setUnreadNotificationsCount(value) { unreadNotificationsCount = value; }
export function setAdminFeedbacks(value) { adminFeedbacks = value; }
export function setCurrentImages(value) { currentImages = value; }
export function setCurrentImageIndex(value) { currentImageIndex = value; }
export function setFirstDataLoadComplete(value) { firstDataLoadComplete = value; }
