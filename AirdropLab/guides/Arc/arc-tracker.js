// ============================================================
// ARC TESTNET TRACKER - MAIN APPLICATION
// Multilingual (EN/UA) with auto-translation & Firebase sync
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== CONSTANTS =====
const ADMIN_UID = 'SAkz4mdW9reDaIsvqigCNZhEKJR2';
const STORAGE_KEY = 'arc_tracker_v3';
const BADGE_VISIBILITY_KEY = 'arc_tracker_badges_hidden';
const SECTION_COLLAPSE_KEY = 'arc_tracker_sections';
const THEME_KEY = 'arc_tracker_theme';
const LANGUAGE_KEY = 'arc_tracker_language';
const FAVORITES_KEY = 'arc_tracker_favorites_v1';
const FAVORITES_ORDER_KEY = 'arc_tracker_favorites_order_v1';
const FAVORITES_TIMESTAMP_KEY = 'arc_tracker_favorites_timestamp_v1';
const USER_ITEMS_KEY = 'arc_user_items_v1';
const EDITS_OVERRIDE_KEY = 'arc_tracker_edits_v1';
const NEW_INDICATORS_KEY = 'arc_tracker_new_indicators_v2';
const LEGEND_COLLAPSE_KEY = 'arc_tracker_legend_collapsed';
const CONFIG_COLLECTION = 'arc_config';
const NEW_INDICATORS_DOC = 'new_indicators_global';
const GITHUB_OWNER = 'Worklaf';
const GITHUB_REPO = 'Worklaf';
const GITHUB_BRANCH = 'main';
const GITHUB_ITEMS_PATH = 'AirdropLab/guides/Arc/arc_shared_items.json';
const GITHUB_EDITS_PATH = 'AirdropLab/guides/Arc/arc_shared_edits.json';

// ===== GLOBAL STATE =====
let currentLanguage = 'en';
let isAdmin = false;
let currentUser = null;
let arcData = {};
let favoritesState = {};
let favoritesOrder = [];
let userItemsData = { items: {}, collections: [], dappCategories: [] };
let editsOverride = {};
let editModeActive = false;
let currentEditTarget = null;
let currentAddContext = null;
let tooltipEl = null;
let activeTooltipTarget = null;
let favoritesSortable = null;
let newIndicatorsState = { globalNew: new Set(), clickedByUser: new Set(), lastSync: 0 };
let newIndicatorsUnsubscribe = null;
let isDataLoaded = false;

const favoriteControls = new Map();
const DYNAMIC_CLASS_SET = new Set(['daily-active', 'visited-once', 'has-new-flag']);
const ZONE_CONFIG = {
    nft_alze: { type:'nft-item', label:'NFT в Alze', trackType:'track-once' },
    nft_caset: { type:'nft-item', label:'NFT в Caset', trackType:'track-once' },
    nft_draze: { type:'nft-item', label:'NFT в Draze', trackType:'track-once' },
    nft_arkle: { type:'nft-item', label:'NFT в Arkle', trackType:'track-once' },
    nft_mintaura: { type:'nft-item', label:'NFT в MintAura', trackType:'track-once' },
    nft_oku: { type:'nft-item', label:'NFT в Oku', trackType:'track-once' },
    nft_clara: { type:'nft-item', label:'NFT в Clara', trackType:'track-once' },
    nft_morkie: { type:'nft-item', label:'NFT в Morkie', trackType:'track-once' },
    nft_other: { type:'nft-item', label:'NFT (Other)', trackType:'track-once' },
    deploy_basic: { type:'link-item', label:'Basic Deploy', trackType:'track-once track-once-info' },
    deploy_advanced: { type:'link-item', label:'Advanced Deploy', trackType:'track-once track-once-info' },
    dapp_bridges: { type:'link-item', label:'Bridges', trackType:'track-daily' },
    dapp_dex: { type:'link-item', label:'DEXs', trackType:'track-daily' },
    dapp_staking: { type:'link-item', label:'Staking', trackType:'track-daily' },
    dapp_domains: { type:'link-item', label:'Domains', trackType:'track-daily' },
    dapp_nft: { type:'link-item', label:'NFT dApps', trackType:'track-daily' },
    dapp_checkin: { type:'link-item', label:'Check-In', trackType:'track-daily' },
    dapp_games: { type:'link-item', label:'Games', trackType:'track-daily' },
    dapp_others: { type:'link-item', label:'Others', trackType:'track-daily' },
};

const SECTION_ZONE_CONFIG = {
    nfts: { type:'nft-collection', label:'new NFT collection' },
    deploy: { type:'deploy-group', label:'new deploy group' },
    dapps: { type:'dapp-category', label:'new dapp category' },
};

// ===== i18n SYSTEM =====
function t(key, defaultText = '') {
    if (window.i18nData && window.i18nData[currentLanguage] && window.i18nData[currentLanguage][key]) {
        return window.i18nData[currentLanguage][key];
    }
    return defaultText;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_KEY, lang);
    document.documentElement.lang = lang;
    updateAllTranslations();
}

function updateAllTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key, el.textContent);
    });
    updateLanguageToggleBtn();
}

function updateLanguageToggleBtn() {
    const btn = document.getElementById('languageToggleBtn');
    if (!btn) return;
    if (currentLanguage === 'en') {
        btn.innerHTML = '<i class="fas fa-language"></i> 🇺🇦 Українська';
    } else {
        btn.innerHTML = '<i class="fas fa-language"></i> 🇬🇧 English';
    }
}

function getDescForLanguage(el, lang) {
    if (lang === 'en') return el?.getAttribute('data-desc-en') || '';
    if (lang === 'ua') return el?.getAttribute('data-desc-ua') || '';
    return '';
}

// ===== AUTO TRANSLATION (Google Translate API Mock) =====
async function autoTranslate(text, targetLang) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang === 'ua' ? 'uk' : 'en'}`);
        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
    } catch (e) {
        console.error('Translation error:', e);
    }
    return text;
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const container = document.getElementById('arcToastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { 
        toast.style.opacity = '0'; 
        toast.style.transform = 'translateY(20px)'; 
        setTimeout(() => toast.remove(), 300); 
    }, 3000);
}

// ===== HELPER FUNCTIONS =====
function getBaseClasses(link) {
    if (!link) return ['link-inline'];
    return [...link.classList].filter(cls => !DYNAMIC_CLASS_SET.has(cls));
}

function getLinkTitle(link) {
    const clone = link.cloneNode(true);
    clone.querySelectorAll('.click-info, .new-flag').forEach(el => el.remove());
    return clone.textContent.trim();
}

function extractLinkInfo(link) {
    return { 
        id: link.dataset.id, 
        title: getLinkTitle(link), 
        url: link.href, 
        tooltip: link.getAttribute('data-tooltip') || '',
        descEn: link.getAttribute('data-desc-en') || '',
        descUa: link.getAttribute('data-desc-ua') || '',
        classes: getBaseClasses(link) 
    };
}

function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}`;
}

function isToday(iso) {
    if (!iso) return false;
    const d = new Date(iso), t = new Date();
    return d.getDate()===t.getDate() && d.getMonth()===t.getMonth() && d.getFullYear()===t.getFullYear();
}

function generateId() {
    return 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
}

// ===== THEME MANAGEMENT =====
function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') document.body.classList.add('light-theme');
    updateThemeBtn();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    updateThemeBtn();
    showToast(isLight ? t('light_theme_active', 'Light theme activated') : t('dark_theme_active', 'Dark theme activated'), 'info');
}

function updateThemeBtn() {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-theme');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i> ' + t('dark_theme', 'Dark Theme') : '<i class="fas fa-sun"></i> ' + t('light_theme', 'Light Theme');
}

// ===== LANGUAGE MANAGEMENT =====
function loadLanguage() {
    const saved = localStorage.getItem(LANGUAGE_KEY) || 'en';
    setLanguage(saved);
}

// ===== ADMIN CHECK =====
function checkAdmin(user) {
    isAdmin = user && user.uid === ADMIN_UID;
    document.body.classList.toggle('is-admin', isAdmin);
    const badgeContainer = document.getElementById('adminBadgeContainer');
    if (badgeContainer) {
        badgeContainer.innerHTML = isAdmin ? '<span class="admin-badge"><i class="fas fa-crown"></i> ' + t('admin_badge', 'ADMIN') + '</span>' : '';
    }
}

// ===== AUTH FUNCTIONS =====
window.openLoginModal = function() {
    document.getElementById('arcLoginModal').style.display = 'flex';
};

window.closeLoginModal = function() {
    document.getElementById('arcLoginModal').style.display = 'none';
};

window.loginGoogle = async function() {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        closeLoginModal();
    } catch(e) { 
        alert('Error: ' + e.message); 
    }
};

window.loginTwitter = async function() {
    try {
        await signInWithPopup(auth, new TwitterAuthProvider());
        closeLoginModal();
    } catch(e) { 
        alert('Error: ' + e.message); 
    }
};

window.handleEmailLogin = async function() {
    const email = document.getElementById('emailInput').value;
    const pass = document.getElementById('passInput').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        closeLoginModal();
    } catch(e) { 
        alert('Error: ' + e.message); 
    }
};

window.handleRegister = async function() {
    const email = document.getElementById('emailInput').value;
    const pass = document.getElementById('passInput').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        closeLoginModal();
    } catch(e) { 
        alert('Error: ' + e.message); 
    }
};

window.logout = function() { 
    signOut(auth); 
};

// ===== DATA PERSISTENCE =====
async function loadAllData() {
    const localStats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const localFav = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
    const localOrder = JSON.parse(localStorage.getItem(FAVORITES_ORDER_KEY) || '[]');
    const localTimestamp = parseInt(localStorage.getItem(FAVORITES_TIMESTAMP_KEY) || '0', 10);
    
    arcData = localStats;
    favoritesState = localFav;
    favoritesOrder = localOrder;
    
    if (currentUser) {
        try {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const cloudData = docSnap.data();
                
                if (cloudData.arcGuideStats && Object.keys(cloudData.arcGuideStats).length > 0) {
                    arcData = cloudData.arcGuideStats;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData));
                }
                
                if (cloudData.arcFavoritesState) {
                    const cloudTs = parseInt(cloudData.arcFavoritesTimestamp || '0', 10);
                    if (cloudTs > localTimestamp) {
                        favoritesState = cloudData.arcFavoritesState;
                        favoritesOrder = cloudData.arcFavoritesOrder || [];
                        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState));
                        localStorage.setItem(FAVORITES_ORDER_KEY, JSON.stringify(favoritesOrder));
                        localStorage.setItem(FAVORITES_TIMESTAMP_KEY, String(cloudTs));
                    }
                } else if (Object.keys(localFav).length > 0) {
                    await saveToCloud({ 
                        arcFavoritesState: localFav, 
                        arcFavoritesOrder: localOrder, 
                        arcFavoritesTimestamp: localTimestamp 
                    });
                }
                
                if (cloudData.arcUserItems) {
                    const cloudItemsTs = parseInt(cloudData.arcUserItemsTimestamp || '0', 10);
                    const localItemsTs = parseInt(localStorage.getItem('arc_user_items_timestamp') || '0', 10);
                    
                    if (cloudItemsTs > localItemsTs) {
                        userItemsData = {
                            items: cloudData.arcUserItems.items || {},
                            collections: cloudData.arcUserItems.collections || [],
                            dappCategories: cloudData.arcUserItems.dappCategories || []
                        };
                        localStorage.setItem(USER_ITEMS_KEY, JSON.stringify(userItemsData));
                        localStorage.setItem('arc_user_items_timestamp', String(cloudItemsTs));
                    }
                }
                
                if (cloudData.arcEditsOverride) {
                    const cloudEditsTs = parseInt(cloudData.arcEditsTimestamp || '0', 10);
                    const localEditsTs = parseInt(localStorage.getItem('arc_edits_timestamp') || '0', 10);
                    
                    if (cloudEditsTs > localEditsTs) {
                        editsOverride = cloudData.arcEditsOverride;
                        localStorage.setItem(EDITS_OVERRIDE_KEY, JSON.stringify(editsOverride));
                        localStorage.setItem('arc_edits_timestamp', String(cloudEditsTs));
                    }
                }
            }
        } catch (e) {
            console.error("Cloud load error:", e);
            showToast('⚠️ ' + t('error_import', 'Failed to sync with cloud'), 'error');
        }
    }
    
    refreshAllVisuals();
    applyAllOverrides();
}

async function saveToCloud(data) {
    if (!currentUser) return;
    try { 
        await setDoc(doc(db, "users", currentUser.uid), data, { merge: true }); 
    } catch (e) { 
        console.error("Cloud save error:", e); 
    }
}

async function saveStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData));
    if (currentUser) await saveToCloud({ arcGuideStats: arcData });
}

async function saveFavorites() {
    const ts = Date.now();
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState));
    localStorage.setItem(FAVORITES_ORDER_KEY, JSON.stringify(favoritesOrder));
    localStorage.setItem(FAVORITES_TIMESTAMP_KEY, String(ts));
    
    if (currentUser) {
        await saveToCloud({ 
            arcFavoritesState: favoritesState, 
            arcFavoritesOrder: favoritesOrder, 
            arcFavoritesTimestamp: ts 
        });
    }
}

async function saveUserItems() {
    localStorage.setItem(USER_ITEMS_KEY, JSON.stringify(userItemsData));
    
    if (currentUser) {
        try {
            await saveToCloud({ 
                arcUserItems: userItemsData,
                arcUserItemsTimestamp: Date.now()
            });
        } catch (e) {
            console.error("Firebase auto-save error:", e);
            showToast('⚠️ ' + t('error_import', 'Failed to save to cloud'), 'error');
        }
    }
}

async function saveEditsOverride() {
    localStorage.setItem(EDITS_OVERRIDE_KEY, JSON.stringify(editsOverride));
    
    if (currentUser) {
        try {
            await saveToCloud({ 
                arcEditsOverride: editsOverride,
                arcEditsTimestamp: Date.now()
            });
        } catch (e) {
            console.error("Firebase edits save error:", e);
        }
    }
}

// ===== LOAD SHARED DATA =====
async function loadSharedData() {
    try {
        const itemsResp = await fetch('https://raw.githubusercontent.com/Worklaf/Worklaf/main/AirdropLab/guides/Arc/arc_shared_items.json?' + Date.now());
        if (itemsResp.ok) {
            const data = await itemsResp.json();
            userItemsData = {
                items: data.items || {},
                collections: data.collections || [],
                dappCategories: data.dappCategories || []
            };
            localStorage.setItem(USER_ITEMS_KEY, JSON.stringify(userItemsData));
        } else {
            loadUserItems();
        }
    } catch (e) {
        console.error("Load shared items error:", e);
        loadUserItems();
    }

    try {
      const editsResp = await fetch('https://raw.githubusercontent.com/Worklaf/Worklaf/main/AirdropLab/guides/Arc/arc_shared_edits.json?' + Date.now());
        if (editsResp.ok) {
            const data = await editsResp.json();
            editsOverride = data.editsOverride || {};
            localStorage.setItem(EDITS_OVERRIDE_KEY, JSON.stringify(editsOverride));
        } else {
            loadEditsOverride();
        }
    } catch (e) {
        console.error("Load shared edits error:", e);
        loadEditsOverride();
    }
}

function loadUserItems() {
    try {
        const raw = localStorage.getItem(USER_ITEMS_KEY);
        if (raw) { 
            const p = JSON.parse(raw); 
            userItemsData = { items: p.items || {}, collections: p.collections || [], dappCategories: p.dappCategories || [] }; 
        }
    } catch(e) { 
        console.error(e); 
    }
}

function loadEditsOverride() {
    try { 
        editsOverride = JSON.parse(localStorage.getItem(EDITS_OVERRIDE_KEY) || '{}'); 
    } catch(e) { 
        editsOverride = {}; 
    }
}

// ===== TRACKING =====
function updateBadge(el, count, time) {
    let badge = el.querySelector('.click-info');
    if (!badge) { 
        badge = document.createElement('span'); 
        badge.className = 'click-info'; 
        el.appendChild(badge); 
    }
    badge.textContent = `${count}р • ${formatDate(time)}`;
}

function updateUI() {
    document.querySelectorAll('.track-daily').forEach(btn => {
        const id = btn.getAttribute('data-id'); 
        const rec = arcData[id];
        btn.classList.remove('daily-active');
        if (rec) {
            if (isToday(rec.lastClick)) btn.classList.add('daily-active');
            if (rec.lastClick) updateBadge(btn, rec.totalClicks || 0, rec.lastClick);
        }
    });
    
    document.querySelectorAll('.track-once').forEach(btn => {
        const id = btn.getAttribute('data-id'); 
        const rec = arcData[id];
        if (rec && rec.visited) btn.classList.add('visited-once');
        else btn.classList.remove('visited-once');
        if (btn.classList.contains('track-once-info') && rec && rec.lastClick) updateBadge(btn, rec.totalClicks || 0, rec.lastClick);
    });
}

function bindTrackingHandler(el) {
    if (!el || el.dataset.trackingBound === 'true') return;
    if (!(el.classList.contains('track-daily') || el.classList.contains('track-once'))) return;
    el.addEventListener('click', handleClick); 
    el.dataset.trackingBound = 'true';
}

function bindTrackingHandlersToAll() { 
    document.querySelectorAll('.track-daily, .track-once').forEach(bindTrackingHandler); 
}

function handleClick(e) {
    const btn = e.currentTarget; 
    const id = btn.getAttribute('data-id');
    if (!id) return;
    
    if (newIndicatorsState.globalNew.has(id) && !newIndicatorsState.clickedByUser.has(id)) {
        clearNewLink(id);
    }
    
    const now = new Date().toISOString();
    if (!arcData[id]) arcData[id] = {};
    
    if (btn.classList.contains('track-daily')) {
        if (arcData[id].lastClick && isToday(arcData[id].lastClick)) return;
        arcData[id].totalClicks = (arcData[id].totalClicks || 0) + 1;
        arcData[id].lastClick = now;
    } else if (btn.classList.contains('track-once')) {
        arcData[id].visited = true;
        if (btn.classList.contains('track-once-info')) {
            arcData[id].totalClicks = (arcData[id].totalClicks || 0) + 1;
            arcData[id].lastClick = now;
        }
    }
    
    saveStats();
    updateUI();
}

window.resetArcAll = async function() {
    if (confirm(t('confirm_delete', 'Reset all progress?'))) {
        arcData = {}; 
        await saveStats();
        document.querySelectorAll('.click-info').forEach(el => el.remove());
        document.querySelectorAll('.link-inline').forEach(l => { l.classList.remove('daily-active', 'visited-once'); });
        updateUI(); 
        showToast(t('progress_reset', 'Progress reset'), 'info');
    }
};

// ===== BADGES =====
function getBadgeHiddenState() { 
    return localStorage.getItem(BADGE_VISIBILITY_KEY) === 'true'; 
}

function setBadgeHiddenState(h) { 
    localStorage.setItem(BADGE_VISIBILITY_KEY, h ? 'true' : 'false'); 
}

function updateBadgeVisibility() {
    const hidden = getBadgeHiddenState();
    document.body.classList.toggle('badges-hidden', hidden);
    const btn = document.getElementById('toggleBadgesBtn');
    if (btn) btn.innerHTML = hidden ? t('show_badges', 'Show Badges') : t('hide_badges', 'Hide Badges');
}

// ===== SECTIONS =====
function getSectionCollapseState() { 
    return JSON.parse(localStorage.getItem(SECTION_COLLAPSE_KEY) || '{}'); 
}

function saveSectionCollapseState(s) { 
    localStorage.setItem(SECTION_COLLAPSE_KEY, JSON.stringify(s)); 
}

function applySectionState(sec, collapsed) {
    sec.classList.toggle('collapsed', collapsed);
    const t_btn = sec.querySelector('.section-toggle');
    if (t_btn) { 
        t_btn.textContent = collapsed ? '▸' : '▾'; 
        t_btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true'); 
    }
}

// ===== LEGEND =====
function applyLegendState(collapsed) {
    const legend = document.getElementById('statusLegend');
    const toggle = document.getElementById('legendToggle');
    if (!legend || !toggle) return;
    const isMobile = window.matchMedia('(max-width:768px)').matches;
    const shouldCollapse = isMobile && collapsed;
    legend.classList.toggle('legend-collapsed', shouldCollapse);
    toggle.setAttribute('aria-expanded', shouldCollapse ? 'false' : 'true');
    toggle.textContent = shouldCollapse ? t('show_legend', 'Show Legend ▸') : t('hide_legend', 'Hide Legend ▾');
}

// ===== TOOLTIP =====
function ensureTooltipElement() {
    if (!tooltipEl) { 
        tooltipEl = document.createElement('div'); 
        tooltipEl.className = 'floating-tooltip'; 
        document.body.appendChild(tooltipEl); 
    }
}

function positionTooltip(target) {
    if (!tooltipEl || !target) return;
    const rect = target.getBoundingClientRect();
    const spacing = 15;
    tooltipEl.style.left = '0'; 
    tooltipEl.style.top = '0';
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const tooltipWidth = Math.min(tooltipRect.width, 320);
    const tooltipHeight = tooltipRect.height;
    
    let left = rect.left - tooltipWidth - spacing;
    if (left < spacing) left = rect.right + spacing;
    
    let top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
    if (top < spacing) top = spacing;
    if (top + tooltipHeight > window.innerHeight - spacing) top = window.innerHeight - tooltipHeight - spacing;
    if (left < spacing) left = spacing;
    if (left + tooltipWidth > window.innerWidth - spacing) left = window.innerWidth - tooltipWidth - spacing;
    
    tooltipEl.style.left = left + 'px'; 
    tooltipEl.style.top = top + 'px';
}

function showTooltip(e) {
    const target = e.target.closest('[data-tooltip]');
    if (!target) return;
    
    const text = target.getAttribute('data-tooltip');
    const imageUrl = target.getAttribute('data-image');
    const descEn = target.getAttribute('data-desc-en') || '';
    const descUa = target.getAttribute('data-desc-ua') || '';
    
    if (!text && !imageUrl && !descEn && !descUa) return;
    
    ensureTooltipElement();
    activeTooltipTarget = target;
    
    if (imageUrl) {
        tooltipEl.classList.add('has-image');
        const desc = currentLanguage === 'en' ? descEn : descUa;
        tooltipEl.innerHTML = `<div class="tooltip-image-container"><img src="${imageUrl}" alt="${text}" class="tooltip-image" loading="lazy" onerror="this.style.display='none'">${desc ? `<div class="tooltip-text">${desc}</div>` : ''}</div>`;
    } else {
        tooltipEl.classList.remove('has-image');
        const desc = currentLanguage === 'en' ? descEn : descUa;
        tooltipEl.textContent = desc || text;
    }
    
    positionTooltip(target);
    tooltipEl.classList.add('visible');
}

function hideTooltip() { 
    activeTooltipTarget = null; 
    if (tooltipEl) tooltipEl.classList.remove('visible'); 
}

function initializeTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        if (el.dataset.tooltipBound === 'true') return;
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('focus', showTooltip);
        el.addEventListener('blur', hideTooltip);
        el.dataset.tooltipBound = 'true';
    });
}

document.addEventListener('scroll', () => { 
    if (activeTooltipTarget) positionTooltip(activeTooltipTarget); 
}, true);

window.addEventListener('resize', () => { 
    if (activeTooltipTarget) positionTooltip(activeTooltipTarget); 
});

// ===== LIGHTBOX =====
function openLightbox(imageUrl, title, tooltip, linkUrl, linkLabel, linkIcon) {
    const overlay = document.getElementById('arcLightboxOverlay');
    const img = document.getElementById('lightboxImage');
    const titleEl = document.getElementById('lightboxTitle');
    const captionEl = document.getElementById('lightboxCaption');
    const linkEl = document.getElementById('lightboxLink');
    const toggle = document.getElementById('lightboxLangToggle');
    
    img.src = imageUrl;
    img.alt = title;
    titleEl.textContent = title;
    
    // Показуємо перемикач мов якщо є обидва описи
    const descEn = tooltip.split(' | ')[0] || tooltip;
    const descUa = tooltip.split(' | ')[1] || '';
    
    if (descEn && descUa) {
        toggle.style.display = 'flex';
        toggle.innerHTML = '<button class="lightbox-lang-btn active" data-lang="en">🇬🇧 EN</button><button class="lightbox-lang-btn" data-lang="ua">🇺🇦 UA</button>';
        captionEl.innerHTML = `<span data-lang-content="en">${descEn}</span><span data-lang-content="ua" style="display:none;">${descUa}</span>`;
        
        document.querySelectorAll('#lightboxLangToggle .lightbox-lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                document.querySelectorAll('#lightboxLangToggle .lightbox-lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('[data-lang-content]').forEach(el => {
                    el.style.display = el.getAttribute('data-lang-content') === lang ? 'block' : 'none';
                });
            });
        });
    } else {
        toggle.style.display = 'none';
        captionEl.textContent = descEn;
    }
    
    linkEl.href = linkUrl;
    linkEl.innerHTML = `<i class="fas fa-${linkIcon || 'external-link-alt'}"></i> ${linkLabel}`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const overlay = document.getElementById('arcLightboxOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    const lightboxContentEl = document.querySelector('.lightbox-content');
    let pointerDownInsideLightbox = false;

    document.addEventListener('pointerdown', (e) => {
        pointerDownInsideLightbox = !!e.target.closest('.lightbox-content');
    }, true);

    document.getElementById('arcLightboxOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget && !pointerDownInsideLightbox) {
            closeLightbox();
        }
    });

    if (lightboxContentEl) {
        lightboxContentEl.addEventListener('click', (e) => e.stopPropagation());
        lightboxContentEl.addEventListener('pointerdown', (e) => e.stopPropagation());
    }

    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') closeLightbox(); 
    });

    document.querySelectorAll('.link-inline[data-image]').forEach(link => {
        if (link.dataset.lightboxBound) return;
        link.addEventListener('contextmenu', (e) => {
            const imageUrl = link.getAttribute('data-image');
            if (!imageUrl) return;
            e.preventDefault();
            const title = getLinkTitle(link);
            const tooltip = link.getAttribute('data-tooltip') || '';
            const descEn = link.getAttribute('data-desc-en') || '';
            const descUa = link.getAttribute('data-desc-ua') || '';
            const fullTooltip = descEn || descUa ? `${descEn} | ${descUa}` : tooltip;
            const isNftMint = link.classList.contains('track-once') && !link.classList.contains('track-once-info') && !link.classList.contains('track-daily');
            const linkLabel = isNftMint ? t('go_to_mint', 'Go to Mint') : t('go_to_website', 'Go to Website');
            const linkIcon = isNftMint ? 'external-link-alt' : 'globe';
            openLightbox(imageUrl, title, fullTooltip, link.href, linkLabel, linkIcon);
        });
        link.dataset.lightboxBound = 'true';
    });
}

// ===== CARD ANIMATIONS =====
function initCardAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('anim-visible'); }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.resource-item').forEach(card => observer.observe(card));
}

// ===== EXPORT / IMPORT =====
function exportJSON() {
    const exportData = {
        version: '2026-02-14-v4',
        exportDate: new Date().toISOString(),
        arcData,
        favoritesState,
        favoritesOrder,
        userItems: JSON.parse(localStorage.getItem(USER_ITEMS_KEY) || '{}'),
        sections: JSON.parse(localStorage.getItem(SECTION_COLLAPSE_KEY) || '{}'),
        badgesHidden: localStorage.getItem(BADGE_VISIBILITY_KEY),
        theme: localStorage.getItem(THEME_KEY),
        language: currentLanguage
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arc-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('data_exported', 'Data exported!'), 'success');
}

function importJSON(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.arcData && !data.favoritesState) throw new Error(t('error_import', 'Invalid format'));
            
            if (data.arcData) { arcData = data.arcData; localStorage.setItem(STORAGE_KEY, JSON.stringify(arcData)); }
            if (data.favoritesState) { favoritesState = data.favoritesState; localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState)); }
            if (data.favoritesOrder) { favoritesOrder = data.favoritesOrder; localStorage.setItem(FAVORITES_ORDER_KEY, JSON.stringify(favoritesOrder)); }
            if (data.userItems) { localStorage.setItem(USER_ITEMS_KEY, JSON.stringify(data.userItems)); }
            if (data.sections) { localStorage.setItem(SECTION_COLLAPSE_KEY, JSON.stringify(data.sections)); }
            if (data.badgesHidden != null) localStorage.setItem(BADGE_VISIBILITY_KEY, data.badgesHidden);
            if (data.theme) { localStorage.setItem(THEME_KEY, data.theme); if (data.theme === 'light') document.body.classList.add('light-theme'); else document.body.classList.remove('light-theme'); updateThemeBtn(); }
            if (data.language) { setLanguage(data.language); }
            
            await saveStats();
            await saveFavorites();
            showToast(t('data_imported', 'Data imported! Page will refresh.'), 'success');
            setTimeout(() => location.reload(), 1500);
        } catch (err) { 
            showToast(t('error_import', 'Import error') + ': ' + err.message, 'error'); 
        }
    };
    reader.readAsText(file);
}

// ===== FAVORITES =====
function ensureLinkWrapper(link) {
    if (link.parentElement && link.parentElement.classList.contains('link-with-favorite')) return link.parentElement;
    const w = document.createElement('span');
    w.className = 'link-with-favorite';
    link.parentNode.insertBefore(w, link);
    w.appendChild(link);
    return w;
}

function createFavoriteToggle(id) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'favorite-toggle';
    btn.setAttribute('aria-label', t('add_item', 'Add item'));
    btn.title = t('add_item', 'Add item');
    btn.textContent = '☆';
    
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (favoritesState[id]) {
            delete favoritesState[id];
            favoritesOrder = favoritesOrder.filter(x => x !== id);
        } else {
            const ctrl = favoriteControls.get(id);
            if (ctrl) {
                favoritesState[id] = extractLinkInfo(ctrl.link);
                favoritesOrder.push(id);
            }
        }
        
        await saveFavorites();
        refreshAllVisuals();
    });
    
    return btn;
}

function refreshAllVisuals() {
    favoriteControls.forEach((ctrl, id) => {
        const isFav = Boolean(favoritesState[id]);
        ctrl.button.classList.toggle('is-favorite', isFav);
        ctrl.button.textContent = isFav ? '★' : '☆';
    });
    
    renderFavoritesList();
    updateUI();
}

function attachFavoriteControls() {
    favoriteControls.clear();
    document.querySelectorAll('a.link-inline[data-id]').forEach(link => {
        const id = link.dataset.id;
        if (!id) return;
        
        const wrapper = ensureLinkWrapper(link);
        let btn = wrapper.querySelector('.favorite-toggle');
        if (!btn) {
            btn = createFavoriteToggle(id);
            wrapper.appendChild(btn);
        }
        
        favoriteControls.set(id, { button: btn, link });
    });
    
    refreshAllVisuals();
}

function renderFavoritesList() {
    const listEl = document.getElementById('favoritesList');
    const emptyEl = document.getElementById('favoritesEmpty');
    const countEl = document.getElementById('favoritesCount');
    
    if (!listEl || !emptyEl || !countEl) return;
    
    listEl.innerHTML = '';
    favoritesOrder = favoritesOrder.filter(id => favoritesState[id]);
    Object.keys(favoritesState).forEach(id => { if (!favoritesOrder.includes(id)) favoritesOrder.push(id); });
    
    if (favoritesOrder.length === 0) {
        emptyEl.style.display = 'block';
        listEl.style.display = 'none';
        countEl.textContent = '0';
        return;
    }
    
    emptyEl.style.display = 'none';
    listEl.style.display = 'flex';
    
    favoritesOrder.forEach(id => {
        const info = favoritesState[id];
        if (!info) return;
        
        const linkEl = document.querySelector(`a[data-id="${id}"]`);
        const liveInfo = linkEl ? extractLinkInfo(linkEl) : info;
        
        if (linkEl && (info.title !== liveInfo.title || info.url !== liveInfo.url)) {
            favoritesState[id] = liveInfo;
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState));
        }
        
        const li = document.createElement('li');
        li.className = 'favorites-item';
        li.dataset.id = id;
        
        const handle = document.createElement('span');
        handle.className = 'drag-handle';
        handle.innerHTML = '⋮⋮';
        handle.title = 'Drag to reorder';
        li.appendChild(handle);
        
        const anchor = document.createElement('a');
        anchor.href = liveInfo.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        anchor.dataset.id = id;
        anchor.classList.add('favorite-link');
        liveInfo.classes.forEach(cls => anchor.classList.add(cls));
        if (liveInfo.tooltip) anchor.setAttribute('data-tooltip', liveInfo.tooltip);
        if (liveInfo.descEn) anchor.setAttribute('data-desc-en', liveInfo.descEn);
        if (liveInfo.descUa) anchor.setAttribute('data-desc-ua', liveInfo.descUa);
        if (liveInfo.image) anchor.setAttribute('data-image', liveInfo.image);
        
        const record = arcData[id];
        if (record) {
            if (record.visited) anchor.classList.add('visited-once');
            if (isToday(record.lastClick)) anchor.classList.add('daily-active');
            if (record.totalClicks > 0 || record.lastClick) {
                const badge = document.createElement('span');
                badge.className = 'click-info';
                badge.textContent = `${record.totalClicks || 0}р • ${formatDate(record.lastClick)}`;
                anchor.appendChild(badge);
            }
        }
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'favorite-title';
        titleSpan.textContent = liveInfo.title;
        anchor.appendChild(titleSpan);
        li.appendChild(anchor);
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-fav-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove from favorites';
        removeBtn.onclick = async (e) => {
            e.stopPropagation();
            delete favoritesState[id];
            favoritesOrder = favoritesOrder.filter(x => x !== id);
            await saveFavorites();
            refreshAllVisuals();
        };
        li.appendChild(removeBtn);
        listEl.appendChild(li);
        bindTrackingHandler(anchor);
    });
    
    countEl.textContent = String(favoritesOrder.length);
    initSortable();
    initializeTooltips();
    updateNewIndicators();
}

function initSortable() {
    const listEl = document.getElementById('favoritesList');
    if (!listEl || typeof Sortable === 'undefined') return;
    if (favoritesSortable) favoritesSortable.destroy();
    
    favoritesSortable = new Sortable(listEl, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        onEnd: async () => {
            favoritesOrder = Array.from(listEl.children).map(li => li.dataset.id);
            await saveFavorites();
        }
    });
}

// ===== NEW INDICATORS =====
async function loadNewIndicators() {
    const localData = JSON.parse(localStorage.getItem(NEW_INDICATORS_KEY) || '{}');
    
    newIndicatorsState = {
        globalNew: new Set(localData.globalNew || []),
        clickedByUser: new Set(localData.clickedByUser || []),
        lastSync: localData.lastSync || 0
    };
    
    if (currentUser) {
        try {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const cloudData = docSnap.data();
                
                if (cloudData.arcNewIndicators) {
                    const cloudTs = cloudData.arcNewIndicatorsTimestamp || 0;
                    
                    if (cloudTs > newIndicatorsState.lastSync) {
                        newIndicatorsState = {
                            globalNew: new Set(cloudData.arcNewIndicators.globalNew || []),
                            clickedByUser: new Set(cloudData.arcNewIndicators.clickedByUser || []),
                            lastSync: cloudTs
                        };
                        localStorage.setItem(NEW_INDICATORS_KEY, JSON.stringify({
                            globalNew: [...newIndicatorsState.globalNew],
                            clickedByUser: [...newIndicatorsState.clickedByUser],
                            lastSync: newIndicatorsState.lastSync
                        }));
                    }
                }
            }
        } catch (e) {
            console.error("NEW indicators sync error:", e);
        }
    }
    
    newIndicatorsState.lastSync = newIndicatorsState.lastSync || Date.now();
}

function initNewIndicatorsRealtime() {
    if (!currentUser) return;
    
    const newIndicatorsRef = doc(db, CONFIG_COLLECTION, NEW_INDICATORS_DOC);
    
    newIndicatorsUnsubscribe = onSnapshot(newIndicatorsRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            const globalNew = new Set(data.globalNew || []);
            
            if (newIndicatorsState.lastSync === 0) return;
            
            const hasRealChanges = [...globalNew].some(id => !newIndicatorsState.globalNew.has(id)) ||
                                  [...newIndicatorsState.globalNew].some(id => !globalNew.has(id));
            
            if (hasRealChanges) {
                newIndicatorsState.globalNew = globalNew;
                
                const saveData = {
                    globalNew: [...newIndicatorsState.globalNew],
                    clickedByUser: [...newIndicatorsState.clickedByUser],
                    lastSync: Date.now()
                };
                localStorage.setItem(NEW_INDICATORS_KEY, JSON.stringify(saveData));
                
                updateNewIndicators();
                showToast(t('new_elements_updated', 'New elements updated in real-time'), 'info');
            }
        }
    }, (error) => {
        console.error("NEW indicators realtime error:", error);
    });
}

function updateNewIndicators() {
    if (!newIndicatorsState || !newIndicatorsState.globalNew) return;
    
    document.querySelectorAll('[data-id]').forEach(el => {
        const id = el.dataset.id;
        
        const shouldShowNew = newIndicatorsState.globalNew.has(id) && 
                             !newIndicatorsState.clickedByUser.has(id);
        
        if (shouldShowNew) {
            el.setAttribute('data-new', 'true');
            el.classList.add('has-new-flag');
            if (!el.querySelector('.new-flag')) {
                const flag = document.createElement('span');
                flag.className = 'new-flag';
                flag.innerHTML = '<span class="new-flag-text">New!</span>';
                el.appendChild(flag);
            }
        } else {
            el.removeAttribute('data-new');
            el.classList.remove('has-new-flag');
            const f = el.querySelector('.new-flag');
            if (f) f.remove();
        }
    });
    
    updateSectionBadges();
}

async function clearNewLink(id) {
    newIndicatorsState.clickedByUser.add(id);
    newIndicatorsState.lastSync = Date.now();
    
    const saveData = {
        globalNew: [...newIndicatorsState.globalNew],
        clickedByUser: [...newIndicatorsState.clickedByUser],
        lastSync: newIndicatorsState.lastSync
    };
    localStorage.setItem(NEW_INDICATORS_KEY, JSON.stringify(saveData));
    
    if (currentUser) {
        try {
            await saveToCloud({ 
                arcNewIndicators: {
                    globalNew: [...newIndicatorsState.globalNew],
                    clickedByUser: [...newIndicatorsState.clickedByUser]
                },
                arcNewIndicatorsTimestamp: newIndicatorsState.lastSync
            });
        } catch (e) {
            console.error("NEW click sync error:", e);
        }
    }
    
    updateNewIndicators();
    showToast(t('new_indicator_synced', '🔄 NEW indicator synced'), 'info');
}

function updateSectionBadges() {
    document.querySelectorAll('.collapsible-section').forEach(sec => {
        const st = sec.querySelector('.section-status');
        if (!st) return;
        
        const items = sec.querySelectorAll('[data-id][data-new="true"]');
        if (items.length > 0) {
            sec.classList.add('has-new');
            st.innerHTML = `<span class="status-dot">${items.length}</span><span class="status-text">${t('new_indicator', 'NEW!')}</span>`;
        } else {
            sec.classList.remove('has-new');
            st.innerHTML = '';
        }
    });
}

// ===== EDIT MODE =====
function toggleEditMode() {
    editModeActive = !editModeActive;
    document.body.classList.toggle('edit-mode', editModeActive);
    const btn = document.getElementById('editModeBtn');
    if (btn) {
        btn.classList.toggle('active', editModeActive);
        btn.innerHTML = editModeActive ? '<i class="fas fa-check"></i> ' + t('finish_editing', 'Finish Editing') : '<i class="fas fa-pen"></i> ' + t('edit_mode', 'Edit Mode');
    }
    if (editModeActive) {
        injectEditButtons();
        showToast(t('edit_mode_activated', 'Edit Mode activated'), 'info');
    } else {
        removeEditButtons();
        showToast(t('edit_mode_finished', 'Edit Mode finished'), 'info');
    }
}

function injectEditButtons() {
    document.querySelectorAll('a.link-inline[data-id]').forEach(link => {
        if (link.dataset.editBtnBound) return;
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'edit-item-btn';
        editBtn.title = t('edit', 'Edit');
        editBtn.innerHTML = '<i class="fas fa-pen"></i>';
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openEditModal(link);
        });
        
        const wrapper = link.closest('.link-with-favorite') || link.closest('.user-item-wrapper');
        if (wrapper) wrapper.appendChild(editBtn);
        else link.parentNode.insertBefore(editBtn, link.nextSibling);
        
        link.dataset.editBtnBound = 'true';
    });
}

function removeEditButtons() {
    document.querySelectorAll('.edit-item-btn').forEach(btn => btn.remove());
    document.querySelectorAll('[data-edit-btn-bound]').forEach(el => delete el.dataset.editBtnBound);
}

function applyOverrideToLink(link, ov) {
    if (!link || !ov) return;
    if (ov.title) {
        Array.from(link.childNodes).forEach(n => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
        link.insertBefore(document.createTextNode(ov.title), link.firstChild);
    }
    if (ov.url) link.href = ov.url;
    if (ov.tooltip !== undefined) {
        if (ov.tooltip) link.setAttribute('data-tooltip', ov.tooltip);
        else link.removeAttribute('data-tooltip');
    }
    if (ov.image !== undefined) {
        if (ov.image) link.setAttribute('data-image', ov.image);
        else link.removeAttribute('data-image');
    }
}

function applyAllOverrides() {
    loadEditsOverride();
    Object.keys(editsOverride).forEach(id => {
        const link = document.querySelector(`a.link-inline[data-id="${id}"]`);
        if (link) applyOverrideToLink(link, editsOverride[id]);
    });
}

// ===== MODAL MANAGEMENT =====
const overlayEl = () => document.getElementById('arcAddModalOverlay');

function showFields(fields) {
    ['fieldTitle', 'fieldUrl', 'fieldImage', 'fieldWebsite', 'fieldTwitter'].forEach(f => {
        const el = document.getElementById(f);
        if (el) el.classList.toggle('field-hidden', !fields.includes(f));
    });
}

function openModal(title, fields, currentLang = 'en') {
    document.getElementById('addModalTitle').textContent = title;
    showFields(fields);
    
    // Встановлюємо активну мову
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.lang === currentLang);
    });
    
    // Показуємо поля для активної мови
    document.getElementById('descFieldEn').classList.toggle('field-hidden', currentLang !== 'en');
    document.getElementById('descFieldUa').classList.toggle('field-hidden', currentLang !== 'ua');
    
    ['addFieldTitle', 'addFieldUrl', 'addFieldImage', 'addFieldWebsite', 'addFieldTwitter', 'addFieldTooltipEn', 'addFieldTooltipUa'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    overlayEl().classList.add('open');
}

function closeModal() {
    overlayEl().classList.remove('open');
    currentAddContext = null;
    currentEditTarget = null;
    const saveBtn = document.getElementById('addModalSave');
    saveBtn.textContent = t('add', 'Add');
    delete saveBtn.dataset.editMode;
}

document.getElementById('addModalCancel').addEventListener('click', closeModal);

// Закриття при кліку на фон
const addModalEl = document.getElementById('addModal');
let pointerDownInsideModal = false;

document.addEventListener('pointerdown', (e) => {
    pointerDownInsideModal = !!e.target.closest('#addModal');
}, true);

overlayEl().addEventListener('click', (e) => {
    if (e.target === overlayEl() && !pointerDownInsideModal) {
        closeModal();
    }
});

addModalEl.addEventListener('click', (e) => e.stopPropagation());
addModalEl.addEventListener('pointerdown', (e) => e.stopPropagation());

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
});

// Мовні табу в модалі
document.querySelectorAll('.lang-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const lang = this.dataset.lang;
        
        document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        document.getElementById('descFieldEn').classList.toggle('field-hidden', lang !== 'en');
        document.getElementById('descFieldUa').classList.toggle('field-hidden', lang !== 'ua');
    });
});

// ===== USER ITEMS MANAGEMENT =====
function createUserLink(item, zone) {
    const wrapper = document.createElement('span');
    wrapper.className = 'user-item-wrapper';
    wrapper.dataset.userItemId = item.id;
    wrapper.dataset.userItemZone = zone;
    
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.className = `link-inline link-compact ${item.trackType}`;
    link.dataset.id = item.id;
    if (item.tooltip) link.setAttribute('data-tooltip', item.tooltip);
    if (item.descEn) link.setAttribute('data-desc-en', item.descEn);
    if (item.descUa) link.setAttribute('data-desc-ua', item.descUa);
    if (item.image) link.setAttribute('data-image', item.image);
    link.textContent = item.title;
    wrapper.appendChild(link);
    
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'user-item-delete admin-only';
    delBtn.title = t('delete_item', 'Delete item');
    delBtn.innerHTML = '×';
    
    delBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!confirm(t('confirm_delete', 'Delete this item?'))) return;
        
        delBtn.disabled = true;
        delBtn.innerHTML = '⏳';
        
        try {
            if (userItemsData.items[zone]) {
                userItemsData.items[zone] = userItemsData.items[zone].filter(i => i.id !== item.id);
            }
            
            await saveUserItems();
            wrapper.remove();
            
            if (favoritesState[item.id]) {
                delete favoritesState[item.id];
                favoritesOrder = favoritesOrder.filter(x => x !== item.id);
                await saveFavorites();
                refreshAllVisuals();
            }
            
            showToast(`✅ ${t('removed', 'Removed')}: ${item.title}`, 'info');
        } catch (error) {
            console.error('Delete error:', error);
            showToast(t('error_import', 'Error') + ': ' + error.message, 'error');
            delBtn.disabled = false;
            delBtn.innerHTML = '×';
        }
    });
    
    wrapper.appendChild(delBtn);
    return wrapper;
}

function renderUserItemInZone(zone, item) {
    const container = document.querySelector(`[data-zone="${zone}"]`);
    if (!container) return;
    
    const existingItem = container.querySelector(`[data-user-item-id="${item.id}"]`);
    if (existingItem) return;
    
    let target;
    if (container.tagName === 'TR') target = container.querySelector('.dapp-links');
    else target = container.querySelector('.link-collection') || container.querySelector('.link-row');
    if (!target) return;
    
    const wrapper = createUserLink(item, zone);
    const addBtn = target.querySelector('.add-item-btn');
    if (addBtn) target.insertBefore(wrapper, addBtn);
    else target.appendChild(wrapper);
}

function renderAllUserItems() {
    loadUserItems();
    clearAllUserItems();
    
    userItemsData.collections.forEach(coll => {
        if (!ZONE_CONFIG[coll.id]) {
            const isNft = coll.parentZone === 'nfts';
            ZONE_CONFIG[coll.id] = {
                type: isNft ? 'nft-item' : 'link-item',
                label: coll.title,
                trackType: isNft ? 'track-once' : 'track-once track-once-info'
            };
        }
    });
    
    userItemsData.dappCategories.forEach(cat => {
        if (!ZONE_CONFIG[cat.id]) {
            ZONE_CONFIG[cat.id] = { type: 'link-item', label: cat.title, trackType: 'track-daily' };
        }
    });
    
    Object.keys(userItemsData.items).forEach(zone => {
        const items = userItemsData.items[zone];
        if (!items || !items.length) return;
        items.forEach(item => renderUserItemInZone(zone, item));
    });
    
    injectAddButtons();
    bindTrackingHandlersToAll();
    attachFavoriteControls();
    initializeTooltips();
    initLightbox();
    updateUI();
    updateNewIndicators();
}

function clearAllUserItems() {
    document.querySelectorAll('.user-item-wrapper').forEach(el => el.remove());
}

function injectAddButtons() {
    document.querySelectorAll('[data-zone]').forEach(container => {
        const zone = container.dataset.zone;
        const config = ZONE_CONFIG[zone];
        if (!config) return;
        if (container.querySelector('.add-item-btn')) return;
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'add-item-btn admin-only';
        btn.title = `Add to ${config.label}`;
        btn.innerHTML = '<span class="btn-plus">+</span>';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentAddContext = { zone, config };
            openModal(`Add: ${config.label}`, ['fieldTitle', 'fieldUrl', 'fieldImage'], currentLanguage);
        });
        
        if (container.tagName === 'TR') {
            const linksCell = container.querySelector('.dapp-links');
            if (linksCell) linksCell.appendChild(btn);
        } else {
            const header = container.querySelector('.resource-header');
            if (header) header.appendChild(btn);
            else {
                const lc = container.querySelector('.link-collection,.link-row');
                if (lc) lc.appendChild(btn);
            }
        }
    });
}

function openEditModal(link) {
    const id = link.dataset.id;
    const title = getLinkTitle(link);
    currentEditTarget = { id, link };
    
    const descEn = link.getAttribute('data-desc-en') || '';
    const descUa = link.getAttribute('data-desc-ua') || '';
    
    document.getElementById('addModalTitle').textContent = `Edit: ${title}`;
    showFields(['fieldTitle', 'fieldUrl', 'fieldImage']);
    
    document.getElementById('addFieldTitle').value = title;
    document.getElementById('addFieldUrl').value = link.href;
    document.getElementById('addFieldImage').value = link.getAttribute('data-image') || '';
    document.getElementById('addFieldTooltipEn').value = descEn;
    document.getElementById('addFieldTooltipUa').value = descUa;
    
    const saveBtn = document.getElementById('addModalSave');
    saveBtn.textContent = t('save', 'Save');
    saveBtn.dataset.editMode = 'true';
    
    overlayEl().classList.add('open');
}

document.getElementById('addModalSave').addEventListener('click', async () => {
    const saveBtn = document.getElementById('addModalSave');
    const isEdit = saveBtn.dataset.editMode === 'true';
    
    const originalText = saveBtn.textContent;
    saveBtn.disabled = true;
    saveBtn.textContent = isEdit ? '💾 ' + t('save', 'Saving...') : '💾 ' + t('add', 'Adding...');

    try {
        if (isEdit && currentEditTarget) {
            const id = currentEditTarget.id;
            const link = currentEditTarget.link;
            const newTitle = document.getElementById('addFieldTitle').value.trim();
            const newUrl = document.getElementById('addFieldUrl').value.trim();
            const newDescEn = document.getElementById('addFieldTooltipEn').value.trim();
            const newDescUa = document.getElementById('addFieldTooltipUa').value.trim();
            const newImage = document.getElementById('addFieldImage').value.trim();
            
            if (!newTitle || !newUrl) {
                alert(t('url_label', 'Title and URL are required'));
                return;
            }

            let isUserItem = false;
            for (const zone in userItemsData.items) {
                const items = userItemsData.items[zone];
                if (!items) continue;
                const found = items.find(i => i.id === id);
                if (found) {
                    found.title = newTitle;
                    found.url = newUrl;
                    found.descEn = newDescEn;
                    found.descUa = newDescUa;
                    found.image = newImage;
                    isUserItem = true;
                    await saveUserItems();
                    break;
                }
            }

            if (!isUserItem) {
                editsOverride[id] = {
                    title: newTitle,
                    url: newUrl,
                    descEn: newDescEn,
                    descUa: newDescUa,
                    image: newImage
                };
                await saveEditsOverride();
            }

            link.href = newUrl;
            if (newImage) link.setAttribute('data-image', newImage);
            link.setAttribute('data-desc-en', newDescEn);
            link.setAttribute('data-desc-ua', newDescUa);
            
            Array.from(link.childNodes).forEach(n => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
            link.insertBefore(document.createTextNode(newTitle), link.firstChild);
            
            if (favoritesState[id]) {
                favoritesState[id].title = newTitle;
                favoritesState[id].url = newUrl;
                favoritesState[id].descEn = newDescEn;
                favoritesState[id].descUa = newDescUa;
                await saveFavorites();
                renderFavoritesList();
            }

            showToast('✅ ' + t('element_updated', 'Element updated and synced'), 'success');
            closeModal();
            initializeTooltips();
            initLightbox();
            return;
        }

        if (!currentAddContext) return;
        
        const title = document.getElementById('addFieldTitle').value.trim();
        const url = document.getElementById('addFieldUrl').value.trim();
        const descEn = document.getElementById('addFieldTooltipEn').value.trim();
        const descUa = document.getElementById('addFieldTooltipUa').value.trim();
        const image = document.getElementById('addFieldImage').value.trim();

        if (currentAddContext.zone) {
            if (!title || !url) {
                alert(t('url_label', 'Title and URL are required'));
                return;
            }
            
            const config = currentAddContext.config;
            const id = generateId();
            const item = {
                id,
                title,
                url,
                descEn,
                descUa,
                image,
                trackType: config.trackType,
                addedAt: Date.now()
            };
            
            if (!userItemsData.items[currentAddContext.zone]) {
                userItemsData.items[currentAddContext.zone] = [];
            }
            userItemsData.items[currentAddContext.zone].push(item);
            
            await saveUserItems();
            renderUserItemInZone(currentAddContext.zone, item);
            showToast('✅ ' + t('element_added', 'Element added and synced'), 'success');
        }

        closeModal();
        bindTrackingHandlersToAll();
        attachFavoriteControls();
        initializeTooltips();
        initLightbox();
        updateUI();
        updateNewIndicators();
        
    } catch (error) {
        console.error('Save error:', error);
        showToast('❌ ' + t('error_import', 'Save error') + ': ' + error.message, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = originalText;
    }
});

// ===== GITHUB SYNC =====
async function githubGetFileSha(path, token) {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
    const resp = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json'
        }
    });

    if (resp.status === 404) {
        return null;
    }

    if (!resp.ok) {
        throw new Error(`GitHub GET ${path} failed: ${resp.status}`);
    }

    const data = await resp.json();
    return data.sha || null;
}

function encodeContent(obj) {
    const json = JSON.stringify(obj, null, 2);
    return btoa(unescape(encodeURIComponent(json)));
}

async function uploadConfigToGithub() {
    try {
        saveUserItems();
        saveEditsOverride();

        const token = prompt('GitHub Personal Access Token (з правами repo)?\nТокен НЕ буде збережено.');
        if (!token) return;

        showToast(t('uploading', 'Uploading to GitHub...'), 'info');

        const itemsPayload = {
            items: userItemsData.items || {},
            collections: userItemsData.collections || [],
            dappCategories: userItemsData.dappCategories || []
        };
        const editsPayload = {
            editsOverride: editsOverride || {}
        };

        const [itemsSha, editsSha] = await Promise.all([
            githubGetFileSha(GITHUB_ITEMS_PATH, token),
            githubGetFileSha(GITHUB_EDITS_PATH, token)
        ]);

        const putItemsResp = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_ITEMS_PATH}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update arc_shared_items via Arc admin UI',
                    content: encodeContent(itemsPayload),
                    branch: GITHUB_BRANCH,
                    sha: itemsSha || undefined
                })
            }
        );

        if (!putItemsResp.ok) {
            const errText = await putItemsResp.text();
            throw new Error(`GitHub items update failed: ${putItemsResp.status}`);
        }

        const putEditsResp = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_EDITS_PATH}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update arc_shared_edits via Arc admin UI',
                    content: encodeContent(editsPayload),
                    branch: GITHUB_BRANCH,
                    sha: editsSha || undefined
                })
            }
        );

        if (!putEditsResp.ok) {
            throw new Error(`GitHub edits update failed: ${putEditsResp.status}`);
        }

        showToast(t('data_exported', 'Changes uploaded to GitHub!'), 'success');

        setTimeout(async () => {
            await loadSharedData();
            renderAllUserItems();
            showToast(t('data_imported', 'Data updated on page!'), 'info');
        }, 2000);

    } catch (e) {
        console.error(e);
        showToast(t('error_import', 'GitHub upload error') + ': ' + e.message, 'error');
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    loadLanguage();
    loadTheme();
    loadEditsOverride();
    applyAllOverrides();
    
    attachFavoriteControls();
    bindTrackingHandlersToAll();
    initLightbox();
    initCardAnimations();
    
    const localData = JSON.parse(localStorage.getItem(NEW_INDICATORS_KEY) || '{}');
    newIndicatorsState = {
        globalNew: new Set(localData.globalNew || []),
        clickedByUser: new Set(localData.clickedByUser || []),
        lastSync: localData.lastSync || 0
    };

    document.getElementById('languageToggleBtn').addEventListener('click', () => {
        setLanguage(currentLanguage === 'en' ? 'ua' : 'en');
    });

    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

    document.getElementById('toggleBadgesBtn').addEventListener('click', () => {
        const currentlyHidden = getBadgeHiddenState();
        setBadgeHiddenState(!currentlyHidden);
        updateBadgeVisibility();
        showToast(currentlyHidden ? t('badges_shown', 'Badges shown') : t('badges_hidden', 'Badges hidden'), 'info');
    });

    const editBtn = document.getElementById('editModeBtn');
    if (editBtn) editBtn.addEventListener('click', toggleEditMode);

    document.getElementById('exportBtn').addEventListener('click', exportJSON);
    document.getElementById('importBtn').addEventListener('click', () => document.getElementById('arcImportFileInput').click());

    const githubUploadBtn = document.getElementById('githubUploadBtn');
    if (githubUploadBtn) {
        githubUploadBtn.addEventListener('click', uploadConfigToGithub);
    }

    document.getElementById('arcImportFileInput').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            importJSON(e.target.files[0]);
            e.target.value = '';
        }
    });

    const sectionState = getSectionCollapseState();
    document.querySelectorAll('.collapsible-section').forEach(sec => {
        const sid = sec.getAttribute('data-section-id');
        const collapsed = sectionState[sid] === true;
        applySectionState(sec, collapsed);
        const toggle = sec.querySelector('.section-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const isCol = sec.classList.contains('collapsed');
                applySectionState(sec, !isCol);
                if (!isCol) sectionState[sid] = true; else delete sectionState[sid];
                saveSectionCollapseState(sectionState);
            });
        }
    });

    let isMobile = window.innerWidth <= 768;
    let storedLegend = localStorage.getItem(LEGEND_COLLAPSE_KEY);
    let isLegendCollapsed = storedLegend === 'true';
    if (storedLegend === null && isMobile) isLegendCollapsed = true;
    const legendToggle = document.getElementById('legendToggle');
    if (legendToggle) {
        legendToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                isLegendCollapsed = !isLegendCollapsed;
                localStorage.setItem(LEGEND_COLLAPSE_KEY, isLegendCollapsed ? 'true' : 'false');
                applyLegendState(isLegendCollapsed);
            }
        });
    }
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        if (isMobile && !wasMobile) {
            storedLegend = localStorage.getItem(LEGEND_COLLAPSE_KEY);
            isLegendCollapsed = storedLegend === 'true' || storedLegend === null;
        }
        if (!isMobile) isLegendCollapsed = false;
        applyLegendState(isLegendCollapsed);
    });
    applyLegendState(isLegendCollapsed);

    initializeTooltips();
    updateBadgeVisibility();
});

// ===== AUTH STATE LISTENER =====
onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    const loggedOut = document.getElementById('arcLoggedOutView');
    const loggedIn = document.getElementById('arcLoggedInView');
    const nameEl = document.getElementById('arcUserName');
    
    if (user) {
        loggedOut.style.display = 'none';
        loggedIn.style.display = '';
        nameEl.textContent = user.displayName || user.email?.split('@')[0] || 'User';
        checkAdmin(user);
        
        setTimeout(() => {
            initNewIndicatorsRealtime();
        }, 2000);
    } else {
        loggedOut.style.display = '';
        loggedIn.style.display = 'none';
        checkAdmin(null);
        
        if (newIndicatorsUnsubscribe) {
            newIndicatorsUnsubscribe();
            newIndicatorsUnsubscribe = null;
        }
    }
    
    if (!isDataLoaded) {
        await loadSharedData();
        await loadNewIndicators();
        await loadAllData();
        renderAllUserItems();
        
        setTimeout(() => {
            updateNewIndicators();
        }, 100);
        
        isDataLoaded = true;
    }
});
