// UI функции

// Показать уведомление
window.showToast = function(msg) { 
    const t = document.getElementById('toast'); 
    document.getElementById('toastMessage').textContent = msg; 
    t.classList.remove('translate-y-20', 'opacity-0'); 
    setTimeout(function() { t.classList.add('translate-y-20', 'opacity-0'); }, 3000); 
};

// Открыть детальный просмотр
window.openDetail = function(id) {
    const project = projects.find(function(p) { return p.id === id; });
    if (!project) return;
    currentDetailId = id;
    
    document.getElementById('detailName').textContent = project.name;
    document.getElementById('detailDesc').textContent = project.description || 'Описание отсутствует';
    document.getElementById('detailCategory').innerHTML = (project.categories || ['Other']).map(function(cat) {
        return '<span class="tag cursor-pointer hover:bg-blue-600/20" onclick="closeDetailModal(); toggleCategoryFilter(\'' + cat + '\')">' + cat + '</span>';
    }).join('');
    
    const statusEl = document.getElementById('detailStatus');
    statusEl.textContent = project.status === 'active' ? 'Active' : project.status === 'soon' ? 'Soon' : 'Ended';
    statusEl.className = 'px-2 py-1 rounded-full text-xs font-medium status-' + project.status;
    
    const isNew = isNewProject(project.createdAt);
    document.getElementById('detailNewBadge').classList.toggle('hidden', !isNew);
    
    const img = document.getElementById('detailImage');
    img.src = project.image || '';
    img.onerror = function() { 
        img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#333"/><text x="32" y="32" fill="white" text-anchor="middle">' + (project.name[0] || '?') + '</text></svg>'; 
    };
    
    const created = project.createdAt || project.created_at;
    document.getElementById('detailCreated').innerHTML = 'Добавлено: <span class="text-slate-300">' + (created ? new Date(created).toLocaleDateString() : '—') + '</span>';
    
    const actsContainer = document.getElementById('detailActivitiesList');
    if (project.activities && project.activities.length > 0) {
        const sortedActivities = [...project.activities].sort(function(a, b) {
            const dateA = a.date ? new Date(a.date) : new Date(0);
            const dateB = b.date ? new Date(b.date) : new Date(0);
            return dateB - dateA;
        });

        actsContainer.innerHTML = sortedActivities.map(function(act) {
            const isActCompleted = userCompleted.includes(project.id + '_' + act.id);
            const isActEnded = act.status === 'ended';
            const actDate = act.date ? formatDateForDisplay(act.date) : '';
            const actCats = act.categories ? act.categories.map(c => '<span class="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">' + c + '</span>').join('') : '';
            const actDesc = parseRichContent(act.description);
            
            let actionsHtml = '';
            if (!isActEnded) {
                actionsHtml += '<button onclick="event.stopPropagation(); trackGuideClick(\'' + project.id + '\', \'\');" class="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-slate-800" title="Засчитать клик"><i class="fas fa-check mr-1"></i>Клик</button>';
                actionsHtml += '<button onclick="event.stopPropagation(); toggleComplete(\'' + project.id + '\', \'' + act.id + '\')" class="' + (isActCompleted ? 'text-emerald-500' : 'text-slate-500 hover:text-emerald-400') + ' transition-colors p-2" title="Завершить"><i class="fas ' + (isActCompleted ? 'fa-check-circle' : 'fa-circle') + ' text-lg"></i></button>';
            }
            
            if (isAdminMode) {
                if (!isActEnded) {
                    actionsHtml += '<button onclick="event.stopPropagation(); endActivity(\'' + project.id + '\', \'' + act.id + '\')" class="text-slate-500 hover:text-red-400 text-xs ml-2 px-2 py-1 rounded hover:bg-slate-800" title="Завершить фазу"><i class="fas fa-ban mr-1"></i>End</button>';
                } else {
                    actionsHtml += '<button onclick="event.stopPropagation(); resumeActivity(\'' + project.id + '\', \'' + act.id + '\')" class="text-emerald-500 hover:text-emerald-400 text-xs ml-2 px-2 py-1 rounded hover:bg-slate-800" title="Возобновить фазу"><i class="fas fa-redo mr-1"></i>Resume</button>';
                }
            }
            
            return '<div class="activity-block ' + (isActEnded ? 'activity-ended' : '') + '">' +
                '<div class="activity-header" onclick="toggleActivityDetail(\'' + act.id + '\')">' +
                '<div class="flex items-center gap-3 flex-1">' +
                '<i id="icon-' + act.id + '" class="fas fa-chevron-down text-slate-400 transition-transform"></i>' +
                '<div class="flex-1">' +
                '<div class="font-bold text-white flex items-center gap-2 flex-wrap">' + act.title + 
                (isActEnded ? ' <span class="text-[10px] bg-red-900/50 text-red-300 px-1.5 py-0.5 rounded uppercase">Ended</span>' : '') +
                '</div>' +
                '<div class="flex items-center gap-2 mt-1 text-xs text-slate-400 flex-wrap">' + 
                (actDate ? '<span class="text-blue-400"><i class="far fa-calendar-alt mr-1"></i>' + actDate + '</span>' : '') +
                (actCats ? '<span class="flex items-center gap-1">' + actCats + '</span>' : '') +
                '</div></div></div>' +
                '<div class="flex items-center gap-2 shrink-0">' + actionsHtml + '</div>' +
                '</div>' +
                '<div id="body-' + act.id + '" class="activity-body-container">' +
                '<div class="activity-body rich-content text-slate-300 text-sm">' + actDesc + '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    } else {
        actsContainer.innerHTML = '<p class="text-slate-500 text-sm italic text-center py-4">Активности не добавлены.</p>';
    }

    document.getElementById('detailEditBtn').classList.toggle('hidden', !isAdminMode);
    updateDetailFavoriteIcon();
    document.getElementById('detailModal').classList.add('active');
};

// Переключить детали активности
window.toggleActivityDetail = function(actId) {
    const body = document.getElementById('body-' + actId);
    const icon = document.getElementById('icon-' + actId);
    if (!body || !icon) return;
    
    if (event.target.closest('.flex.items-center.gap-2 button')) {
        return;
    }

    if (body.classList.contains('open')) {
        body.classList.remove('open');
        icon.classList.remove('rotate-180');
    } else {
        body.classList.add('open');
        icon.classList.add('rotate-180');
    }
};

// Закрыть детальную модалку
window.closeDetailModal = function() { 
    document.getElementById('detailModal').classList.remove('active'); 
    currentDetailId = null; 
};

// Открыть ссылку
window.openLink = function(url) { if(url) window.open(url, '_blank'); };

// Открыть ссылку из детальной
window.openDetailLink = function(type) {
    if (!currentDetailId) return;
    const project = projects.find(function(p) { return p.id === currentDetailId; });
    if(!project) return;
    
    let url = '';
    if (type === 'ref') url = project.referralLink || project.cryptoRankUrl;
    else if (type === 'twitter') url = project.twitterUrl;
    else if (type === 'cryptorank') url = project.cryptoRankUrl;
    
    if (url) {
        trackGuideClick(currentDetailId, url);
    } else {
        showToast('Ссылка не найдена');
    }
};

// Открыть гайд из детальной
window.openGuideFromDetail = function() { 
    if(currentDetailId) {
        const project = projects.find(function(p) { return p.id === currentDetailId; });
        window.trackGuideClick(currentDetailId, project ? project.guideUrl : ''); 
    }
};

// Обновить иконку избранного в детальной
function updateDetailFavoriteIcon() {
    if (!currentDetailId) return;
    const btn = document.getElementById('detailFavoriteBtn');
    const isFav = userFavorites.includes(currentDetailId);
    if (btn) btn.classList.toggle('active', isFav);
}

// Переключить категории dropdown
window.toggleCategoriesDropdown = function() {
    const content = document.getElementById('categoriesAccordion');
    const icon = document.getElementById('catDropdownIcon');
    content.classList.toggle('open');
    icon.classList.toggle('rotate-180');
};

// Переключить фильтр категорий
window.toggleCategoryFilter = function(catName) {
    if (currentFilters.categories.includes(catName)) {
        currentFilters.categories = currentFilters.categories.filter(function(c) { return c !== catName; });
    } else {
        currentFilters.categories.push(catName);
    }
    updateCategoryUI();
    applyFilters();
};

// Обновить UI категорий
function updateCategoryUI() {
    const container = document.getElementById('categoryCheckboxesList');
    if (!container) return;
    const allCats = getAllCategoriesWithCounts(projects);
    container.innerHTML = allCats.map(function(item) {
        const cat = item[0];
        const count = item[1];
        const isChecked = currentFilters.categories.includes(cat) ? 'checked' : '';
        return '<label class="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-800 cursor-pointer text-sm select-none group">' +
            '<div class="flex items-center gap-2">' +
            '<input type="checkbox" class="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0" ' + isChecked + ' onchange="toggleCategoryFilter(\'' + cat + '\')">' +
            '<span class="text-slate-300 group-hover:text-white">' + cat + '</span></div>' +
            '<span class="text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">' + count + '</span></label>';
    }).join('');

    const tagsContainer = document.getElementById('selectedCategoriesTags');
    if (currentFilters.categories.length === 0) {
        tagsContainer.innerHTML = '<span class="text-xs text-slate-500 italic">Все</span>';
    } else {
        tagsContainer.innerHTML = currentFilters.categories.map(function(cat) {
            return '<span class="px-2 py-0.5 bg-blue-600/20 border border-blue-500/50 text-blue-300 text-xs rounded-full flex items-center gap-1">' +
                cat + ' <i onclick="toggleCategoryFilter(\'' + cat + '\')" class="fas fa-times cursor-pointer hover:text-white"></i></span>';
        }).join('');
    }
}

// Обновить активный сайдбар
function updateSidebarActive() { 
    document.querySelectorAll('.sidebar-link').forEach(function(btn) { 
        const filter = btn.dataset.filter;
        btn.classList.remove('active');
        
        if (filter === 'all') {
            if (currentFilters.statuses.length === 0) {
                btn.classList.add('active');
            }
        } else {
            if (currentFilters.statuses.includes(filter)) {
                btn.classList.add('active');
            }
        }
    }); 
}

// Обновить счетчики
function updateCounts(filtered) {
    document.getElementById('countAll').textContent = filtered.length;
    document.getElementById('countToday').textContent = filtered.filter(function(p) { return isToday(p.createdAt); }).length;
    document.getElementById('countActive').textContent = filtered.filter(function(p) {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        const userFinished = projectCompleted || allActivitiesCompleted;
        return !userFinished;
    }).length;
    document.getElementById('countDaily').textContent = filtered.filter(function(p) { return p.hasDaily && p.status === 'active'; }).length;
    document.getElementById('countFavoritesSidebar').textContent = filtered.filter(function(p) { return userFavorites.includes(p.id); }).length;
    document.getElementById('countCompletedSidebar').textContent = filtered.filter(function(p) { 
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
    document.getElementById('countEnded').textContent = filtered.filter(function(p) { return p.status === 'ended'; }).length;
}

// Обновить статистику
function updateStats(filtered) {
    document.getElementById('statActive').textContent = filtered.filter(function(p) {
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        const userFinished = projectCompleted || allActivitiesCompleted;
        return !userFinished;
    }).length;
    document.getElementById('statToday').textContent = filtered.filter(function(p) { return isToday(p.createdAt); }).length;
    document.getElementById('statFavorites').textContent = filtered.filter(function(p) { return userFavorites.includes(p.id); }).length;
    document.getElementById('statCompleted').textContent = filtered.filter(function(p) { 
        const projectCompleted = userCompleted.includes(p.id + '_project');
        const hasActivities = p.activities && p.activities.length > 0;
        const allActivitiesCompleted = hasActivities && p.activities.every(a => userCompleted.includes(p.id + '_' + a.id));
        return projectCompleted || allActivitiesCompleted;
    }).length;
}

// Инициализация UI при загрузке
function initUI() {
    // Поиск
    setupSearchListener();
    
    // Модальные окна - закрытие по клику вне
    const modalConfigs = [
        { id: 'detailModal', closeFn: window.closeDetailModal },
        { id: 'loginModal', closeFn: window.closeLoginModal },
        { id: 'addModal', closeFn: window.closeAddModal },
        { id: 'activityModal', closeFn: window.closeActivityModal },
        { id: 'notificationsModal', closeFn: window.closeNotificationsModal },
        { id: 'feedbackModal', closeFn: window.closeFeedbackModal },
        { id: 'feedbackListModal', closeFn: window.closeFeedbackListModal },
        { id: 'promptModal', closeFn: window.closePromptModal },
        { id: 'deletedProjectsModal', closeFn: window.closeDeletedProjectsModal },
        { id: 'imageModal', closeFn: window.closeImageModal }
    ];

    modalConfigs.forEach(config => {
        const modalElement = document.getElementById(config.id);
        if (modalElement) {
            modalElement.addEventListener('click', function(e) {
                if (e.target === this) {
                    config.closeFn();
                }
            });
        }
    });
    
    // Поиск в удаленных проектах
    const searchDeletedInput = document.getElementById('searchDeletedInput');
    if (searchDeletedInput) {
        let searchTimeout;
        searchDeletedInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                loadDeletedProjects(this.value);
            }, 300);
        });
    }
    
    // Items per page select
    const select = document.getElementById('itemsPerPageSelect');
    if(select) select.value = itemsPerPage;
    
    // Prompt input
    const promptInput = document.getElementById('promptInput');
    if(promptInput) {
        promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.confirmLinkInsert();
            }
        });
        
        promptInput.addEventListener('paste', function(e) {
            setTimeout(function() {
                if(promptInput.value.trim()) {
                    window.confirmLinkInsert();
                }
            }, 50);
        });
    }
}

// Настройка поиска
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function() {
        applyFilters(null, true);
    });
}
