// =====================================================
// UI.JS - Рендеринг интерфейса, модалки, фильтры
// =====================================================

import { 
    projects, 
    currentUser,
    userFavorites,
    userCompleted,
    arcData,
    isAdminMode,
    currentDetailId,
    currentFilters,
    itemsPerPage,
    currentPage,
    currentFilteredList,
    categories,
    STORAGE_KEY,
    COMPLETED_KEY,
    setCurrentDetailId,
    setCurrentPage,
    setCurrentFilteredList,
    setCurrentFilters,
    setUserFavorites,
    setUserCompleted,
    setArcData,
    setCurrentImages,
    setCurrentImageIndex,
    currentImages,
    currentImageIndex
} from './config.js';

import { db, auth } from './firebase.js';
import { updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

export function showToast(msg, type = 'info') {
    const t = document.getElementById('toast');
    const msgEl = document.getElementById('toastMessage');
    
    if (!t || !msgEl) return;
    
    msgEl.textContent = msg;
    
    // Меняем иконку в зависимости от типа
    const icon = t.querySelector('i');
    if (icon) {
        icon.className = type === 'success' ? 'fas fa-check-circle text-emerald-400' :
                         type === 'warning' ? 'fas fa-exclamation-triangle text-yellow-400' :
                         type === 'error' ? 'fas fa-times-circle text-red-400' :
                         'fas fa-info-circle text-blue-400';
    }
    
    t.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        t.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// ==========================================
// DATE FORMATTING
// ==========================================

export function formatClickDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateOnly = date.toDateString();
    const todayOnly = today.toDateString();
    const yesterdayOnly = yesterday.toDateString();
    
    if (dateOnly === todayOnly) {
        return { text: 'сегодня', class: '' };
    } else if (dateOnly === yesterdayOnly) {
        return { text: 'вчера', class: 'older' };
    } else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return { text: day + '.' + month, class: 'older' };
    }
}

export function formatDateForDisplay(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff/60000) + ' мин назад';
    if (diff < 86400000) return Math.floor(diff/3600000) + ' ч назад';
    if (diff < 604800000) return Math.floor(diff/86400000) + ' дн назад';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function isToday(dateString) {
    if (!dateString) return false;
    return new Date(dateString).toDateString() === new Date().toDateString();
}

// ==========================================
// PROJECT HELPERS
// ==========================================

export function isNewProject(dateString) {
    if (!dateString) return false;
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

export function getLatestActivityDate(project) {
    if (!project.activities || project.activities.length === 0) {
        return project.lastUpdated || project.createdAt;
    }
    const latestActivity = project.activities
        .filter(a => a.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return latestActivity && latestActivity.date ? latestActivity.date : (project.lastUpdated || project.createdAt);
}

export function isClickedToday(projectId) {
    const record = arcData[projectId];
    if (!record || !record.lastClick) return false;
    return new Date(record.lastClick).toDateString() === new Date().toDateString();
}

// ==========================================
// FAVORITES & COMPLETED
// ==========================================

export async function toggleFavorite(id) {
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
    
    setUserFavorites(newFavs);
    applyFilters();
    
    localStorage.setItem('favorites_backup', JSON.stringify(newFavs));
    try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { favorites: newFavs });
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
}

export async function toggleComplete(uid, aid) {
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
    
    setUserCompleted(newCompleted);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(newCompleted));
    if (currentDetailId === uid) openDetail(uid);
    applyFilters();
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, { 
                favorites: userFavorites, 
                completed: newCompleted 
            }, { merge: true });
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    }
}

// ==========================================
// VISUAL EFFECTS
// ==========================================

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

// ==========================================
// TRACK GUIDE CLICKS
// ==========================================

export async function trackGuideClick(id, url) {
    if (url) window.open(url, '_blank');
    else openDetail(id);
    
    const now = new Date().toISOString();
    const currentArcData = { ...arcData };
    
    if (!currentArcData[id]) currentArcData[id] = { totalClicks: 0, lastClick: null };
    currentArcData[id].totalClicks = (currentArcData[id].totalClicks || 0) + 1;
    currentArcData[id].lastClick = now;
    
    setArcData(currentArcData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentArcData));
    
    showToast('Задание засчитано! ✅');
    
    if (currentUser) {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                [`arcGuideStats.${id}.totalClicks`]: currentArcData[id].totalClicks,
                [`arcGuideStats.${id}.lastClick`]: now
            });
            console.log('📊 Статистика клика сохранена:', id, currentArcData[id].totalClicks);
        } catch (e) {
            console.error('❌ Ошибка сохранения клика:', e);
        }
    }
    applyFilters();
}

// ==========================================
// FILTERS & SORTING
// ==========================================

export function applyFilters(search, resetPage = false) {
    if (!search) {
        search = document.getElementById('searchInput')?.value || '';
    }

    if (resetPage) {
        setCurrentPage(1);
        localStorage.removeItem('currentPage');
    }

    const filtered = getFilteredProjects(search);
    setCurrentFilteredList(filtered);

    updateCategoryUI();
    renderProjects(filtered);
    renderPaginationControls(filtered.length);
    updateSidebarActive();
    updateCounts(filtered);
    updateStats(filtered);
}

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

export function filterProjects(status) {
    if (status === 'all') {
        setCurrentFilters({ statuses: [], categories: currentFilters.categories });
    } else {
        const index = currentFilters.statuses.indexOf(status);
        const newStatuses = [...currentFilters.statuses];
        if (index !== -1) newStatuses.splice(index, 1);
        else newStatuses.push(status);
        setCurrentFilters({ ...currentFilters, statuses: newStatuses });
    }
    applyFilters(null, true);
}

export function resetFilters() {
    setCurrentFilters({ statuses: [], categories: [] });
    document.getElementById('searchInput').value = '';
    applyFilters();
}

export function sortProjects(by) {
    const sortedProjects = [...projects];
    
    if (by === 'name') {
        sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (by === 'priority') {
        sortedProjects.sort((a, b) => (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0));
    } else if (by === 'latest') {
        sortedProjects.sort((a, b) => {
            const aDate = getLatestActivityDate(a);
            const bDate = getLatestActivityDate(b);
            const aTime = aDate ? new Date(aDate).getTime() : 0;
            const bTime = bDate ? new Date(bDate).getTime() : 0;
            return bTime - aTime;
        });
    }
    
    // Обновляем глобальный массив
    projects.length = 0;
    projects.push(...sortedProjects);
    
    applyFilters();
}

export function changeItemsPerPage(val) {
    const newItemsPerPage = parseInt(val);
    localStorage.setItem('itemsPerPage', newItemsPerPage);
    window.location.reload(); // Перезагружаем для обновления
}

// ==========================================
// RENDER PROJECTS
// ==========================================

export function renderProjects(filteredProjects) {
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
    const countUnvisitedEl = document.getElementById('countUnvisited');
    if (countUnvisitedEl) countUnvisitedEl.textContent = totalUnvisited;

    grid.innerHTML = projectsToShow.map(function(project) {
        const isFav = userFavorites.includes(project.id);
        const isCompleted = userCompleted.includes(project.id + '_project');

        const lastActivityDate = getLatestActivityDate(project);
        const isNew = isNewProject(lastActivityDate);

        const lastClickRecord = arcData[project.id];
        const lastClickDate = lastClickRecord && lastClickRecord.lastClick
            ? formatClickDate(lastClickRecord.lastClick)
            : null;

        const lastUpdatedDate = lastActivityDate
            ? formatDateForDisplay(lastActivityDate)
            : null;

        const categoriesHtml = (project.categories || ['Other'])
            .map(cat =>
                `<span class="bg-slate-800 px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-colors"
                    onclick="event.stopPropagation(); window.toggleCategoryFilter('${cat}')">${cat}</span>`
            )
            .join('');

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

            <button onclick="window.openFeedbackModal('${project.id}', '${project.name.replace(/'/g, "\\'")}'); event.stopPropagation();"
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
                                    onclick="window.openDetail('${project.id}')">
                                    ${project.name}
                                </h3>

                                ${lastUpdatedDate
                                    ? `<span class="last-updated-date" title="Дата последней активности">🔄 ${lastUpdatedDate}</span>`
                                    : ''}

                                ${isAdminMode
                                    ? `<button onclick="event.stopPropagation(); window.editProject('${project.id}')"
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

                            <button onclick="window.trackGuideClick('${project.id}', '${project.guideUrl || ''}')"
                                class="guide-btn-small text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                <i class="fas fa-book-open"></i><span>Гайд</span>
                            </button>

                            <button 
                                onclick="event.stopPropagation(); window.toggleComplete('${project.id}', 'project')"
                                class="lab-complete-btn ${isCompleted ? 'active' : ''}"
                                title="Отметить как завершённое">
                                <svg width="24" height="24">
                                    <use href="#lab-check"/>
                                </svg>
                            </button>

                            <button 
                                onclick="event.stopPropagation(); window.toggleFavorite('${project.id}')"
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
                <button onclick="window.trackGuideClick('${project.id}', '${project.referralLink || project.cryptoRankUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-globe"></i> Website
                </button>

                <button onclick="window.trackGuideClick('${project.id}', '${project.twitterUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fab fa-twitter"></i> Twitter
                </button>

                <button onclick="window.trackGuideClick('${project.id}', '${project.cryptoRankUrl || ''}'); event.stopPropagation();"
                    class="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-chart-line"></i> CR
                </button>
            </div>
        </div>`;
    }).join('');
}

// ==========================================
// PAGINATION
// ==========================================

export function renderPaginationControls(totalItems) {
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

export function changePage(page) {
    setCurrentPage(page);
    renderProjects(currentFilteredList);
    renderPaginationControls(currentFilteredList.length);
    document.getElementById('projectsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// DETAIL MODAL
// ==========================================

export function openDetail(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    setCurrentDetailId(id);
    
    document.getElementById('detailName').textContent = project.name;
    document.getElementById('detailDesc').textContent = project.description || 'Описание отсутствует';
    document.getElementById('detailCategory').innerHTML = (project.categories || ['Other']).map(function(cat) {
        return '<span class="tag cursor-pointer hover:bg-blue-600/20" onclick="window.closeDetailModal(); window.toggleCategoryFilter(\'' + cat + '\')">' + cat + '</span>';
    }).join('');
    
      const statusEl = document.getElementById('detailStatus');
    statusEl.textContent = project.status === 'active' ? 'Active' : project.status === 'soon' ? 'Soon' : 'Ended';
    statusEl.className = 'status-' + project.status;
    
    const featuresEl = document.getElementById('detailFeatures');
    if (project.features && project.features.length > 0) {
        featuresEl.innerHTML = project.features.map(f => '<li class="flex items-start gap-2"><i class="fas fa-check-circle text-green-400 mt-1"></i><span>' + f + '</span></li>').join('');
    } else {
        featuresEl.innerHTML = '<li class="text-slate-500">Нет информации</li>';
    }
    
    const linksEl = document.getElementById('detailLinks');
    linksEl.innerHTML = '';
    if (project.guideUrl) {
        linksEl.innerHTML += '<a href="' + project.guideUrl + '" target="_blank" class="link-btn"><i class="fas fa-book-open"></i> Гайд</a>';
    }
    if (project.referralLink || project.cryptoRankUrl) {
        linksEl.innerHTML += '<a href="' + (project.referralLink || project.cryptoRankUrl) + '" target="_blank" class="link-btn"><i class="fas fa-globe"></i> Website</a>';
    }
    if (project.twitterUrl) {
        linksEl.innerHTML += '<a href="' + project.twitterUrl + '" target="_blank" class="link-btn"><i class="fab fa-twitter"></i> Twitter</a>';
    }
    if (project.discordUrl) {
        linksEl.innerHTML += '<a href="' + project.discordUrl + '" target="_blank" class="link-btn"><i class="fab fa-discord"></i> Discord</a>';
    }
    if (project.cryptoRankUrl) {
        linksEl.innerHTML += '<a href="' + project.cryptoRankUrl + '" target="_blank" class="link-btn"><i class="fas fa-chart-line"></i> CryptoRank</a>';
    }
    
    // ACTIVITIES
    renderActivities(project);
    
    // SCREENSHOTS
    if (project.screenshots && project.screenshots.length > 0) {
        document.getElementById('detailScreenshots').classList.remove('hidden');
        const screenshotsGrid = document.getElementById('screenshotsGrid');
        screenshotsGrid.innerHTML = project.screenshots.map((url, idx) =>
            '<img src="' + url + '" alt="Screenshot" class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" onclick="window.openLightbox(' + idx + ', ' + JSON.stringify(project.screenshots) + ')">'
        ).join('');
    } else {
        document.getElementById('detailScreenshots').classList.add('hidden');
    }
    
    document.getElementById('detailModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeDetailModal() {
    document.getElementById('detailModal').classList.add('hidden');
    document.body.style.overflow = '';
    setCurrentDetailId(null);
}

function renderActivities(project) {
    const container = document.getElementById('detailActivities');
    if (!project.activities || project.activities.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-center py-4">Нет активностей</p>';
        return;
    }
    
    container.innerHTML = project.activities.map(function(act) {
        const uniqueId = project.id + '_' + act.id;
        const isCompleted = userCompleted.includes(uniqueId);
        const formattedDate = act.date ? formatDateForDisplay(act.date) : '';
        
        return `
            <div class="activity-card ${isCompleted ? 'completed' : ''} ${act.priority === 'high' ? 'priority-high' : ''}">
                <div class="flex items-start justify-between gap-3">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <h4 class="font-semibold text-white">${act.title}</h4>
                            ${act.priority === 'high' ? '<span class="text-red-400 text-xs"><i class="fas fa-star"></i> High</span>' : ''}
                            ${formattedDate ? '<span class="text-xs text-slate-500">' + formattedDate + '</span>' : ''}
                        </div>
                        <p class="text-sm text-slate-400">${act.description || ''}</p>
                        ${act.reward ? '<div class="mt-2 flex items-center gap-2 text-sm text-green-400"><i class="fas fa-gift"></i> <span>' + act.reward + '</span></div>' : ''}
                    </div>
                    
                    <div class="flex items-center gap-2 shrink-0">
                        ${act.url ? '<a href="' + act.url + '" target="_blank" class="text-blue-400 hover:text-blue-300"><i class="fas fa-external-link-alt"></i></a>' : ''}
                        <button onclick="window.toggleComplete('${project.id}', '${act.id}')" 
                            class="lab-complete-btn ${isCompleted ? 'active' : ''}" 
                            title="Отметить выполненным">
                            <svg width="24" height="24"><use href="#lab-check"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// LIGHTBOX FOR SCREENSHOTS
// ==========================================

export function openLightbox(index, images) {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    showLightboxImage();
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
    setCurrentImages([]);
    setCurrentImageIndex(0);
}

export function nextImage() {
    if (currentImageIndex < currentImages.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
        showLightboxImage();
    }
}

export function prevImage() {
    if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
        showLightboxImage();
    }
}

function showLightboxImage() {
    const img = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    img.src = currentImages[currentImageIndex];
    counter.textContent = (currentImageIndex + 1) + ' / ' + currentImages.length;
    
    document.getElementById('lightboxPrev').disabled = currentImageIndex === 0;
    document.getElementById('lightboxNext').disabled = currentImageIndex === currentImages.length - 1;
}

// ==========================================
// FEEDBACK MODAL
// ==========================================

export function openFeedbackModal(projectId, projectName) {
    const modal = document.getElementById('feedbackModal');
    const form = document.getElementById('feedbackForm');
    
    document.getElementById('feedbackProjectName').textContent = projectName;
    form.dataset.projectId = projectId;
    
    // Reset form
    form.reset();
    document.querySelectorAll('.rating-star').forEach(s => s.classList.remove('active'));
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeFeedbackModal() {
    document.getElementById('feedbackModal').classList.add('hidden');
    document.body.style.overflow = '';
}

export function setFeedbackRating(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, idx) => {
        if (idx < rating) star.classList.add('active');
        else star.classList.remove('active');
    });
    document.getElementById('feedbackForm').dataset.rating = rating;
}

export async function submitFeedback() {
    const form = document.getElementById('feedbackForm');
    const projectId = form.dataset.projectId;
    const rating = parseInt(form.dataset.rating || 0);
    const comment = document.getElementById('feedbackComment').value.trim();
    
    if (rating === 0) {
        showToast('Пожалуйста, поставьте оценку', 'warning');
        return;
    }
    
    if (!currentUser) {
        showToast('Войдите, чтобы оставить отзыв', 'warning');
        return;
    }
    
    const feedback = {
        projectId: projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        rating: rating,
        comment: comment,
        createdAt: new Date().toISOString()
    };
    
    try {
        const feedbackRef = doc(db, "feedbacks", Date.now().toString());
        await setDoc(feedbackRef, feedback);
        showToast('✨ Спасибо за отзыв!', 'success');
        closeFeedbackModal();
    } catch (error) {
        console.error('Ошибка отправки отзыва:', error);
        showToast('Ошибка отправки. Попробуйте позже', 'error');
    }
}

// ==========================================
// STATS & COUNTS
// ==========================================

export function updateStats(filteredProjects) {
    const totalEl = document.getElementById('totalProjects');
    const activeEl = document.getElementById('activeProjects');
    const completedEl = document.getElementById('completedProjects');
    
    if (!totalEl || !activeEl || !completedEl) return;
    
    totalEl.textContent = filteredProjects.length;
    
    const activeCount = filteredProjects.filter(p => p.status === 'active').length;
    activeEl.textContent = activeCount;
    
    const completedCount = filteredProjects.filter(p => {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
    completedEl.textContent = completedCount;
}

export function updateCounts(filteredProjects) {
    const activeCount = projects.filter(p => {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        const userFinished = projectCompleted || allActivitiesCompleted;
        return !userFinished && p.status !== 'ended';
    }).length;
    
    const endedCount = projects.filter(p => p.status === 'ended').length;
    const dailyCount = projects.filter(p => p.hasDaily && p.status === 'active').length;
    const favCount = userFavorites.length;
    
    const completedCount = projects.filter(p => {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
    
    const unvisitedCount = projects.filter(p => !arcData[p.id]).length;
    const todayCount = projects.filter(p => isToday(p.createdAt)).length;
    
    const countEls = {
        'countActive': activeCount,
        'countEnded': endedCount,
        'countDaily': dailyCount,
        'countFavorites': favCount,
        'countCompleted': completedCount,
        'countUnvisited': unvisitedCount,
        'countToday': todayCount
    };
    
    Object.keys(countEls).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = countEls[id];
    });
}

export function updateSidebarActive() {
    document.querySelectorAll('.status-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    if (currentFilters.statuses.length === 0) {
        const allBtn = document.querySelector('[data-status="all"]');
        if (allBtn) allBtn.classList.add('active');
    } else {
        currentFilters.statuses.forEach(function(status) {
            const btn = document.querySelector('[data-status="' + status + '"]');
            if (btn) btn.classList.add('active');
        });
    }
}

// ==========================================
// CATEGORY FILTERS
// ==========================================

export function toggleCategoryFilter(cat) {
    const idx = currentFilters.categories.indexOf(cat);
    const newCats = [...currentFilters.categories];
    if (idx !== -1) newCats.splice(idx, 1);
    else newCats.push(cat);
    setCurrentFilters({ ...currentFilters, categories: newCats });
    applyFilters(null, true);
}

export function updateCategoryUI() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    
    container.innerHTML = categories.map(cat => {
        const count = projects.filter(p => p.categories && p.categories.includes(cat)).length;
        const isActive = currentFilters.categories.includes(cat);
        return `
            <button onclick="window.toggleCategoryFilter('${cat}')" 
                class="category-pill ${isActive ? 'active' : ''}">
                ${cat} <span class="count">${count}</span>
            </button>
        `;
    }).join('');
}

// ==========================================
// MOBILE SIDEBAR
// ==========================================

export function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

export function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.add('hidden');
}

// ==========================================
// ADMIN PANEL TOGGLE
// ==========================================

export function toggleAdminPanel() {
    document.getElementById('adminPanel').classList.toggle('hidden');
}

// ==========================================
// EXPORT ALL FUNCTIONS TO WINDOW
// ==========================================

window.showToast = showToast;
window.toggleFavorite = toggleFavorite;
window.toggleComplete = toggleComplete;
window.trackGuideClick = trackGuideClick;
window.filterProjects = filterProjects;
window.resetFilters = resetFilters;
window.sortProjects = sortProjects;
window.changeItemsPerPage = changeItemsPerPage;
window.changePage = changePage;
window.openDetail = openDetail;
window.closeDetailModal = closeDetailModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.nextImage = nextImage;
window.prevImage = prevImage;
window.openFeedbackModal = openFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.setFeedbackRating = setFeedbackRating;
window.submitFeedback = submitFeedback;
window.toggleCategoryFilter = toggleCategoryFilter;
window.toggleMobileSidebar = toggleMobileSidebar;
window.closeMobileSidebar = closeMobileSidebar;
window.toggleAdminPanel = toggleAdminPanel;
window.applyFilters = applyFilters;
