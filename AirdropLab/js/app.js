// Основная логика приложения

// Глобальные переменные
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
let arcData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || {};
let tempCustomCategories = [];
let adminClickCount = 0;
const ADMIN_CLICK_THRESHOLD = 5;

let notifications = [];
let unreadNotificationsCount = 0;
let notificationsUnsubscribe = null;

let currentImageIndex = 0;
let currentImages = [];

let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || CONFIG.DEFAULT_ITEMS_PER_PAGE;
let currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;

if (currentFilters.statuses.length === 0 && currentPage > 1) {
    currentPage = 1;
    localStorage.setItem('currentPage', 1);
}
let currentFilteredList = [];

let pendingLinkInsert = null;
let pendingImgInsert = null;

let adminFeedbacks = [];
let adminFeedbacksUnsubscribe = null;

let currentEditingActivities = [];
let editingActivityId = null;
let mainProjectCategories = [];
let currentSortType = 'latest';

// Инициализация приложения
function initApp() {
    // Инициализация Firebase
    initFirebase();
    
    // Настройка слушателя авторизации
    setupAuthListener();
    
    // Загрузка данных
    loadData();
    
    // Инициализация UI
    initUI();
    
    // Hero секция
    initHeroState();
}

// Загрузка данных
window.loadData = async function() {
    try {
        const response = await fetch(CONFIG.DATA_URL);
        if (response.ok) {
            const data = await response.json();
            if(data.projects) projects = data.projects.map(normalizeData);
            if(data.categories) categories = data.categories;
        }
    } catch (e) { 
        console.log('JSON load error', e); 
    }
    
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

let firstDataLoadComplete = false;

// Применить фильтры
window.applyFilters = function(search, resetPage = false) {
    if (!search) {
        search = document.getElementById('searchInput').value;
    }

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

// Получить отфильтрованные проекты
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

                    if (userFinished || p.status === 'ended') {
                        matchesAllFilters = false;
                    }
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
                    if (!(projectCompleted || allActivitiesCompleted)) {
                        matchesAllFilters = false;
                    }
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
            if (!p.name.toLowerCase().includes(search.toLowerCase()) && 
                !(p.description && p.description.toLowerCase().includes(search.toLowerCase()))) {
                return false;
            }
        }

        return true;
    });
}

// Рендер проектов
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
        const lastClickDate = lastClickRecord && lastClickRecord.lastClick
            ? formatClickDate(lastClickRecord.lastClick)
            : null;

        const lastUpdatedDate = lastActivityDate ? formatDateForDisplay(lastActivityDate) : null;

        const categoriesHtml = (project.categories || ['Other']).map(cat =>
            `<span class="bg-slate-800 px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-colors"
                onclick="event.stopPropagation(); toggleCategoryFilter('${cat}')">${cat}</span>`
        ).join('');

        const completedTheme = 'theme-indigo';

        return `
  <div class="glass-card rounded-2xl p-4 relative group project-card-wrapper
              ${isNew ? 'border-pink-500/30' : ''} ${isCompleted ? `completed ${completedTheme}` : ''}">
${isCompleted ? `
    <div class="absolute -top-2 -left-2 z-20">
        <span class="completed-badge"><i class="fas fa-check mr-1"></i>Готово</span>
    </div>` : ''}
            ${isNew ? `
                <div class="absolute -top-2 -right-2 z-20">
                    <span class="new-badge"><i class="fas fa-star mr-1"></i>NEW</span>
                </div>` : ''}

            ${project.deleted ? `
                <div class="absolute top-2 left-2">
                    <span class="deleted-badge text-xs">Архив</span>
                </div>` : ''}

            <button onclick="openFeedbackModal('${project.id}', '${project.name.replace(/'/g, "\\'")}'); event.stopPropagation();"
                class="feedback-trigger-btn text-slate-300 hover:text-blue-400 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg"
                title="Оставить отзыв">
                <i class="fas fa-comment-dots"></i> <span>Отзыв</span>
            </button>

            <div class="flex items-start gap-4 pt-2">
                <div class="shrink-0">
                    ${project.image
                        ? `<img src="${project.image}" alt="${project.name}" class="w-12 h-12 rounded-lg object-cover border border-slate-700">`
                        : `<div class="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                            ${project.name.charAt(0).toUpperCase()}
                           </div>`
                    }
                </div>

                <div class="flex-1 min-w-0 flex flex-col">

                    <div class="flex items-start justify-between gap-2">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <h3 class="font-bold text-lg leading-tight text-white cursor-pointer hover:text-blue-400"
                                    onclick="openDetail('${project.id}')">
                                    ${project.name}
                                </h3>

                                ${lastUpdatedDate
                                    ? `<span class="last-updated-date" title="Дата последней активности">🔄 ${lastUpdatedDate}</span>`
                                    : ''}

                                ${isAdminMode
                                    ? `<button onclick="event.stopPropagation(); editProject('${project.id}')"
                                        class="text-slate-500 hover:text-blue-400 text-xs edit-btn">
                                        <i class="fas fa-pencil-alt"></i>
                                       </button>`
                                    : ''}
                            </div>

                            <div class="flex flex-wrap gap-2 items-center text-xs text-slate-400 mb-2">
                                <div class="flex flex-wrap gap-1">${categoriesHtml}</div>

                                <span class="status-${project.status} px-2 py-1 rounded font-medium">
                                    ${project.status === 'active' ? 'Active' :
                                      project.status === 'soon' ? 'Soon' : 'Ended'}
                                </span>

                                ${project.hasDaily ? '<span class="text-orange-400"><i class="fas fa-fire mr-1"></i>Daily</span>' : ''}
                                ${project.priority === 'high' ? '<span class="text-red-400"><i class="fas fa-star mr-1"></i>High</span>' : ''}
                            </div>
                        </div>

                        <div class="flex items-center gap-2 flex-wrap shrink-0">
                            ${lastClickDate
                                ? `<span class="last-click-date ${lastClickDate.class}" title="Последний клик">${lastClickDate.text}</span>`
                                : ''}

                            <button onclick="trackGuideClick('${project.id}', '${project.guideUrl || ''}')"
                                class="guide-btn-small text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                <i class="fas fa-book-open"></i><span>Гайд</span>
                            </button>

                            <button 
                                onclick="event.stopPropagation(); toggleComplete('${project.id}', 'project')"
                                class="lab-complete-btn ${isCompleted ? 'active' : ''}"
                                title="Отметить как завершённое">
                                <svg width="24" height="24">
                                    <use href="#lab-check"/>
                                </svg>
                            </button>

                            <button 
                                onclick="event.stopPropagation(); toggleFavorite('${project.id}')"
                                class="lab-favorite-btn ${isFav ? 'active' : ''}"
                                title="Добавить в избранное">
                                <svg width="24" height="24">
                                    <use href="#lab-heart"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p class="text-slate-400 text-sm mt-2 line-clamp-2">
                        ${project.description || 'Нет описания'}
                    </p>
                </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-700/50 flex gap-2">
                <button onclick="trackGuideClick('${project.id}', '${project.referralLink || project.cryptoRankUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-globe"></i> Website
                </button>

                <button onclick="trackGuideClick('${project.id}', '${project.twitterUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fab fa-twitter"></i> Twitter
                </button>

                <button onclick="trackGuideClick('${project.id}', '${project.cryptoRankUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-chart-line"></i> CR
                </button>
            </div>
        </div>`;
    }).join('');
}

// Пагинация
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

window.resetFilters = function() { 
    currentFilters = { status: 'all', categories: [] }; 
    document.getElementById('searchInput').value = ''; 
    applyFilters(); 
};

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

window.changeItemsPerPage = function(val) {
    itemsPerPage = parseInt(val);
    localStorage.setItem('currentPage', currentPage);
    applyFilters(null, true);
};

// Синхронизация пользователя
function initUserSync(uid) {
    const userRef = doc(db, "users", uid);
    onSnapshot(userRef, function(docSnap) {
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            let cloudFavorites = data.favorites || [];
            let localStorageFavorites = JSON.parse(localStorage.getItem(CONFIG.FAVORITES_KEY)) || [];
            let mergedFavorites = [...new Set([...cloudFavorites, ...localStorageFavorites])];
            
            if (JSON.stringify(cloudFavorites) !== JSON.stringify(mergedFavorites)) {
                localStorage.setItem(CONFIG.FAVORITES_KEY, JSON.stringify(mergedFavorites));
            }
            
            userFavorites = mergedFavorites;
            
            let cloudCompleted = data.completed || [];
            let localStorageCompleted = JSON.parse(localStorage.getItem(CONFIG.COMPLETED_KEY)) || [];
            let mergedCompleted = [...new Set([...cloudCompleted, ...localStorageCompleted])];
            
            if (JSON.stringify(cloudCompleted) !== JSON.stringify(mergedCompleted)) {
                localStorage.setItem(CONFIG.COMPLETED_KEY, JSON.stringify(mergedCompleted));
            }
            
            userCompleted = mergedCompleted;
            
            if (data.arcGuideStats) {
                let cloudArcData = data.arcGuideStats;
                let localArcData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || {};
                let mergedArcData = { ...localArcData, ...cloudArcData };
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(mergedArcData));
                arcData = mergedArcData;
            }

            applyFilters();
        }
    });
}

// Отслеживание клика по гайду
window.trackGuideClick = async function(id, url) {
    if(url) window.open(url, '_blank');
    else openDetail(id);
    
    const now = new Date().toISOString();
    if (!arcData[id]) arcData[id] = { totalClicks: 0, lastClick: null };
    arcData[id].totalClicks = (arcData[id].totalClicks || 0) + 1;
    arcData[id].lastClick = now;
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(arcData));
    
    showToast('Задание засчитано! ✅');
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                [`arcGuideStats.${id}.totalClicks`]: arcData[id].totalClicks,
                [`arcGuideStats.${id}.lastClick`]: now
            });
        } catch(e) { 
            console.error('❌ Ошибка сохранения клика:', e); 
        }
    }
    applyFilters();
};

// Переключить избранное
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
        showToast('💙 Добавлено в избранное!', 'success');
    }
    
    userFavorites = newFavs;
    applyFilters();
    
    localStorage.setItem(CONFIG.FAVORITES_KEY, JSON.stringify(newFavs));
    try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { favorites: newFavs });
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
};

window.toggleFavoriteFromDetail = async function() {
    if (!currentDetailId) return;
    await window.toggleFavorite(currentDetailId);
    updateDetailFavoriteIcon();
};

// Переключить завершенность
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
        showToast('✨ Задача завершена!', 'success');
    }
    
    userCompleted = newCompleted;
    localStorage.setItem(CONFIG.COMPLETED_KEY, JSON.stringify(newCompleted));
    if (currentDetailId === uid) openDetail(uid);
    applyFilters();
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, { favorites: userFavorites, completed: userCompleted }, { merge: true });
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    }
};

// Эффекты частиц
function createHeartParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 50 + Math.random() * 30;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
        `;
        
        document.body.appendChild(particle);
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

function createSuccessRipple(button) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #10b981;
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}
