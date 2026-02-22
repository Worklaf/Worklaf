// ✅ Только константы и конфиг Firebase
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

export const STORAGE_KEY = 'arc_tracker_v3';
export const COMPLETED_KEY = 'arc_completed_v1';
export const ADMIN_UID = "SAkz4mdW9reDaIsvqigCNZhEKJR2";
export const EXTERNAL_DATA_URL = './data/projects.json';

export const categories = ['DeFi', 'Gaming', 'Infra', 'L1/L2', 'NFT', 'Social', 'Other'];

// Глобальные переменные состояния
export let projects = [];
export let currentUser = null;
export let userFavorites = [];
export let userCompleted = [];
export let arcData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
export let isAdminMode = false;
export let currentDetailId = null;
export let editingId = null;
export let currentFilters = { statuses: [], categories: [] };
export let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 10;
export let currentPage = 1;
export let currentFilteredList = [];

// Функции для обновления глобальных переменных
export function setProjects(value) { projects = value; }
export function setCurrentUser(value) { currentUser = value; }
export function setUserFavorites(value) { userFavorites = value; }
export function setUserCompleted(value) { userCompleted = value; }
export function setArcData(value) { arcData = value; }
export function setIsAdminMode(value) { isAdminMode = value; }
export function setCurrentDetailId(value) { currentDetailId = value; }
export function setEditingId(value) { editingId = value; }
export function setCurrentFilters(value) { currentFilters = value; }
export function setCurrentPage(value) { currentPage = value; }
export function setCurrentFilteredList(value) { currentFilteredList = value; }
