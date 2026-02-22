// Функции администратора

// Активировать режим админа
function activateAdminMode() {
    if (!currentUser || currentUser.uid !== CONFIG.ADMIN_UID) return;
    isAdminMode = true;
    document.getElementById('adminPanel').style.display = 'flex';
    document.getElementById('generalFeedbackPanel').classList.remove('hidden');
    
    const deletedCount = projects.filter(p => p.deleted).length;
    document.getElementById('publicInfo').innerHTML = 
        `<i class="fas fa-shield-alt"></i>
         <span>Режим редактирования • Удаленных: ${deletedCount}</span>`;
    
    document.getElementById('modeIndicator').textContent = 'Режим редактирования';
    document.getElementById('modeIndicator').classList.add('text-purple-400', 'font-bold');
    applyFilters();
}

// Открыть статистику
window.openStats = function() {
    if (!currentUser) { showToast('Войдите для просмотра статистики'); return; }
    if (currentUser.uid !== CONFIG.ADMIN_UID) { showToast('Нет доступа к статистике'); return; }
    window.open('admin/stats.html', '_blank');
};

// Миграция в Firestore
window.migrateToFirestore = async function() {
    if(!confirm('Внимание! Это перезапишет данные в базе текущими данными с экрана. Продолжить?')) return;
    let count = 0;
    for(const p of projects) { 
        await setDoc(doc(db, "projects", p.id), p, { merge: true }); 
        count++; 
    }
    showToast('Загружено ' + count + ' проектов в базу');
};

// Экспорт всех данных
window.exportAllData = async function() {
    if (!currentUser || currentUser.uid !== CONFIG.ADMIN_UID) {
        showToast('Только администратор может экспортировать данные');
        return;
    }
    
    if (!confirm('Экспортировать все проекты в файл?')) return;
    
    const btn = event.target.closest('button') || document.querySelector('button[onclick="exportAllData()"]');
    const originalHtml = btn ? btn.innerHTML : '';
    if(btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Экспорт...';
    }
    
    try {
        showToast('Начинаю экспорт...');
        let allProjects = [];
        
        try {
            const snapshot = await getDocs(query(collection(db, "projects")));
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    allProjects.push({ id: doc.id, ...doc.data() });
                });
            }
        } catch (firestoreError) {
            console.error('❌ Ошибка Firestore:', firestoreError);
        }
        
        if (allProjects.length === 0 && projects.length > 0) {
            allProjects = projects.map(p => ({ id: p.id, ...p }));
        }
        
        if (allProjects.length === 0) {
            const storageData = localStorage.getItem('testnet_hub_local_backup');
            if (storageData) {
                const parsed = JSON.parse(storageData);
                if (parsed && parsed.projects) {
                    allProjects = parsed.projects;
                }
            }
        }
        
        if (allProjects.length === 0) {
            alert('Не найдено проектов для экспорта!');
        } else {
            const exportData = {
                exportDate: new Date().toISOString(),
                exportVersion: '1.0',
                totalProjects: allProjects.length,
                projects: allProjects,
                metadata: {
                    exportedBy: currentUser.email,
                    exportedByUid: currentUser.uid,
                    source: 'testnet-hub-firestore-export',
                    generatedAt: new Date().toISOString()
                }
            };
            
            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const date = new Date();
            const dateStr = date.toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `testnet-hub-backup-${dateStr}.json`;
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast(`✅ Экспортировано ${allProjects.length} проектов`);
        }
    } catch (error) {
        console.error('❌ Критическая ошибка экспорта:', error);
        showToast('Ошибка экспорта: ' + error.message);
    } finally {
        if(btn) {
            btn.disabled = false;
            btn.innerHTML = originalHtml || '<i class="fas fa-download"></i> Экспорт данных';
        }
    }
};

// Открыть удаленные проекты
window.openDeletedProjects = function() {
    if (!isAdminMode) {
        showToast('Только для администратора');
        return;
    }
    
    loadDeletedProjects();
    document.getElementById('deletedProjectsModal').classList.add('active');
};

window.closeDeletedProjectsModal = function() {
    document.getElementById('deletedProjectsModal').classList.remove('active');
};

function loadDeletedProjects(search = '') {
    const deletedProjects = projects.filter(project => project.deleted === true);
    
    const filtered = deletedProjects.filter(project => 
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(search.toLowerCase()))
    );
    
    renderDeletedProjectsList(filtered);
}

function renderDeletedProjectsList(deletedProjects) {
    const container = document.getElementById('deletedProjectsList');
    const emptyState = document.getElementById('deletedEmptyState');
    
    if (deletedProjects.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    container.innerHTML = deletedProjects.map(project => {
        const deletedDate = project.deletedAt ? formatDateForDisplay(project.deletedAt) : 'Неизвестно';
        const categoriesHtml = (project.categories || ['Other']).map(cat => 
            `<span class="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">${cat}</span>`
        ).join('');
        
        return `
            <div class="deleted-project-card rounded-xl p-4">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                        ${project.image ? 
                            `<img src="${project.image}" alt="${project.name}" class="w-10 h-10 rounded-lg object-cover border border-slate-700">` : 
                            `<div class="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                                ${project.name.charAt(0).toUpperCase()}
                            </div>`
                        }
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <h3 class="font-bold text-white">${project.name}</h3>
                                <span class="deleted-badge">Удален</span>
                            </div>
                            <div class="flex gap-2 mt-1 text-xs text-slate-400">
                                ${categoriesHtml}
                            </div>
                        </div>
                    </div>
                    <div class="text-right text-xs text-slate-500">
                        Удален: ${deletedDate}
                    </div>
                </div>
                
                <p class="text-slate-400 text-sm mb-3 line-clamp-2">
                    ${project.description || 'Описание отсутствует'}
                </p>
                
                <div class="flex justify-between items-center">
                    <div class="text-xs text-slate-500">
                        Активностей: ${project.activities ? project.activities.length : 0}
                    </div>
                    <div class="flex gap-2">
                        <button onclick="previewDeletedProject('${project.id}')" 
                                class="text-slate-400 hover:text-blue-400 px-3 py-1 rounded border border-slate-600 hover:border-blue-400 text-sm transition-colors">
                            <i class="fas fa-eye mr-1"></i> Просмотр
                        </button>
                        <button onclick="restoreProject('${project.id}')" 
                                class="restore-btn flex items-center gap-1">
                            <i class="fas fa-undo"></i> Восстановить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.previewDeletedProject = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const originalDeleted = project.deleted;
    project.deleted = false;
    
    openDetail(projectId);
    
    const checkClosed = setInterval(() => {
        if (!document.getElementById('detailModal').classList.contains('active')) {
            project.deleted = originalDeleted;
            clearInterval(checkClosed);
        }
    }, 100);
};

window.restoreProject = async function(projectId) {
    if (!confirm('Восстановить этот проект?')) return;
    
    try {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        await setDoc(doc(db, "projects", projectId), {
            deleted: false,
            deletedAt: null
        }, { merge: true });
        
        project.deleted = false;
        project.deletedAt = null;
        
        showToast('Проект восстановлен!');
        loadDeletedProjects(document.getElementById('searchDeletedInput').value);
        applyFilters();
        
    } catch (error) {
        console.error('Ошибка восстановления:', error);
        showToast('Ошибка при восстановлении проекта');
    }
};

window.deleteProject = async function() {
    if (!editingId || !confirm('Переместить проект в архив?')) return;
    
    try {
        const deleteData = {
            deleted: true,
            deletedAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, "projects", editingId), deleteData, { merge: true });
        
        const project = projects.find(p => p.id === editingId);
        if (project) {
            project.deleted = true;
            project.deletedAt = deleteData.deletedAt;
        }
        
        applyFilters();
        closeAddModal();
        showToast('Проект перемещен в архив');
        
    } catch (err) {
        console.error('Ошибка удаления:', err);
        showToast('Ошибка перемещения в архив');
    }
};

// Создание локального бэкапа
async function createLocalBackup() {
    try {
        let allProjects = [];
        
        if (projects.length > 0) {
            allProjects = projects.map(p => ({ ...p }));
        } else {
            const snapshot = await getDocs(collection(db, "projects"));
            snapshot.forEach((doc) => {
                allProjects.push({ id: doc.id, ...doc.data() });
            });
        }
        
        if (allProjects.length > 0) {
            const backupData = {
                timestamp: new Date().toISOString(),
                totalProjects: allProjects.length,
                projects: allProjects
            };
            localStorage.setItem('testnet_hub_local_backup', JSON.stringify(backupData));
        }
    } catch (e) {
        console.error('Ошибка создания backup:', e);
    }
}

// Функции редактирования проекта
window.openAddModal = function() {
    if (!isAdminMode) return;
    editingId = null;
    document.getElementById('addProjectForm').reset();
    document.getElementById('modalTitle').textContent = 'Добавить проект';
    document.getElementById('deleteBtn').classList.add('hidden');
    document.getElementById('projLastUpdated').valueAsDate = new Date();
    renderCategoryOptions();
    currentEditingActivities = [];
    renderActivitiesAdminList();
    isEditModalOpen = true;
    document.getElementById('addModal').classList.add('active');
};

window.closeAddModal = function() { 
    document.getElementById('addModal').classList.remove('active'); 
    isEditModalOpen = false;
};

window.editProject = function(id) {
    if (!isAdminMode) return;
    const project = projects.find(function(p) { return p.id === id; });
    if (!project) return;
    editingId = id;
    document.getElementById('projId').value = id;
    document.getElementById('projName').value = project.name;
    document.getElementById('projImage').value = project.image || '';
    document.getElementById('projGuideUrl').value = project.guideUrl || '';
    document.getElementById('projCryptoRank').value = project.cryptoRankUrl || '';
    document.getElementById('projTwitter').value = project.twitterUrl || '';
    document.getElementById('projRef').value = project.referralLink || '';
    document.getElementById('projDesc').value = project.description || '';
    document.getElementById('projStatus').value = project.status || 'active';
    
    const latestActivityDate = getLatestActivityDate(project);
    document.getElementById('projLastUpdated').value = latestActivityDate ? latestActivityDate.split('T')[0] : '';
    
    document.getElementById('projDaily').checked = project.hasDaily || false;
    document.getElementById('projPriority').checked = project.priority === 'high';
    
    renderCategoryOptions();
    setSelectedCategories(project.categories || []);
    
    currentEditingActivities = project.activities || [];
    renderActivitiesAdminList();

    document.getElementById('modalTitle').textContent = 'Редактировать проект';
    document.getElementById('deleteBtn').classList.remove('hidden');
    isEditModalOpen = true;
    document.getElementById('addModal').classList.add('active');
    window.closeDetailModal();
};

window.editCurrentProject = function() { if(currentDetailId) window.editProject(currentDetailId); };

window.saveProject = async function(e) {
    e.preventDefault();
    if (!isAdminMode) return;
    const now = new Date().toISOString();
    
    const projName = document.getElementById('projName').value.trim();
    if (!projName) {
        showToast('Введите название проекта');
        return;
    }

    let id;
    if (editingId) {
        id = editingId;
    } else {
        id = projName
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]+/g, '')
            .substring(0, 50);
        
        id = id + '_' + Date.now().toString().slice(-6);
        
        const existingProject = projects.find(p => p.id === id);
        if (existingProject) {
            id = id + '_' + Math.random().toString(36).substring(2, 5);
        }
    }
    
    const selectedCats = getSelectedCategories();

    const projectData = {
        id: id,
        name: projName,
        categories: selectedCats,
        status: document.getElementById('projStatus').value,
        description: document.getElementById('projDesc').value,
        image: document.getElementById('projImage').value || '',
        guideUrl: document.getElementById('projGuideUrl').value || '',
        cryptoRankUrl: document.getElementById('projCryptoRank').value,
        twitterUrl: document.getElementById('projTwitter').value,
        referralLink: document.getElementById('projRef').value,
        hasDaily: document.getElementById('projDaily').checked,
        priority: document.getElementById('projPriority').checked ? 'high' : 'normal',
        lastUpdated: document.getElementById('projLastUpdated').value || now.split('T')[0],
        createdAt: editingId ? (projects.find(function(p) { return p.id === editingId; })?.createdAt || now) : now,
        activities: currentEditingActivities,
        deleted: false
    };
    
    try { 
        if (!id || id.trim() === '') {
            throw new Error('Неверный ID проекта');
        }
        
        await setDoc(doc(db, "projects", id), projectData, { merge: true }); 
        
        if (editingId) {
            const index = projects.findIndex(p => p.id === editingId);
            if (index !== -1) {
                projects[index] = { ...projects[index], ...projectData };
            }
        } else {
            projects.unshift(projectData);
        }
        
        sortProjects(currentSortType);
        applyFilters();
        
        showToast('Сохранено в облако!'); 
        
        // Создание backup после сохранения
        if (currentUser && currentUser.uid === CONFIG.ADMIN_UID) {
            await createLocalBackup();
        }
        
        window.closeAddModal(); 
    } catch (err) { 
        console.error('Ошибка сохранения:', err); 
        showToast('Ошибка сохранения: ' + err.message); 
    }
};

// Категории
function renderCategoryOptions() {
    const allCatsSet = new Set([...categories, ...getAllCategoriesFromProjects()]);
    const sortedCategories = Array.from(allCatsSet).sort();
    categories = sortedCategories;
    
    const container = document.getElementById('categoryCheckboxes');
    const selectedCats = editingId ? (projects.find(function(p) { return p.id === editingId; }).categories || []) : [];
    
    container.innerHTML = sortedCategories.map(function(cat) {
        const isSelected = selectedCats.includes(cat);
        return `<label class="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 transition-all ${isSelected ? 'bg-blue-600/20 border-blue-500' : 'hover:bg-slate-700'}">
            <input type="checkbox" value="${cat}" class="category-checkbox rounded bg-slate-700 cursor-pointer" ${isSelected ? 'checked' : ''}>
            <span class="text-sm text-slate-300 flex-1">${cat}</span>
            ${isSelected ? '<i class="fas fa-check text-blue-400 text-xs"></i>' : ''}
        </label>`;
    }).join('');
    
    tempCustomCategories = [];
    renderTempCategories();
}

window.addCustomCategory = function() { 
    const val = document.getElementById('newCategoryInput').value.trim(); 
    if (!val) return; 
    val.split(',').map(function(c) { return c.trim(); }).forEach(function(cat) { 
        if(cat && tempCustomCategories.indexOf(cat) === -1 && categories.indexOf(cat) === -1) tempCustomCategories.push(cat); 
    }); 
    renderTempCategories(); 
    document.getElementById('newCategoryInput').value = ''; 
};

function renderTempCategories() { 
    document.getElementById('customCategories').innerHTML = tempCustomCategories.map(function(c, i) { 
        return '<span class="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">' + c + ' <i onclick="removeTempCat(' + i + ')" class="fas fa-times cursor-pointer ml-1"></i></span>'; 
    }).join(''); 
}

window.removeTempCat = function(i) { 
    tempCustomCategories.splice(i, 1); 
    renderTempCategories(); 
};

window.handleCategoryInput = function(e) { 
    if(e.key === 'Enter') window.addCustomCategory(); 
};

function getSelectedCategories() { 
    const selected = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(function(cb) { return cb.value; }); 
    const result = [...new Set([...selected, ...tempCustomCategories])];
    return result.length > 0 ? result : ['Other']; 
}

function setSelectedCategories(cats) { 
    tempCustomCategories = []; 
    renderTempCategories();
    
    document.querySelectorAll('.category-checkbox').forEach(function(cb) { 
        cb.checked = cats.includes(cb.value);
    }); 
    
    cats.forEach(function(cat) { 
        if(categories.indexOf(cat) === -1 && tempCustomCategories.indexOf(cat) === -1) {
            tempCustomCategories.push(cat); 
        }
    }); 
    renderTempCategories(); 
}

// Активности
window.openActivityEditor = function(actId = null) {
    editingActivityId = actId;
    document.getElementById('activityModalTitle').textContent = actId ? 'Редактировать активность' : 'Новая активность';
    document.getElementById('deleteActivityBtn').classList.toggle('hidden', !actId);
    
    document.getElementById('actName').value = '';
    document.getElementById('actDate').value = '';
    document.getElementById('actRichDesc').value = '';
    
    const actCatsContainer = document.getElementById('activityCategoryCheckboxes');
    mainProjectCategories = getSelectedCategories();
    actCatsContainer.innerHTML = mainProjectCategories.map(function(cat) {
        return '<label class="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"><input type="checkbox" value="' + cat + '" class="act-cat-checkbox rounded bg-slate-700"><span class="text-sm text-slate-300">' + cat + '</span></label>';
    }).join('');

    if (actId) {
        const act = currentEditingActivities.find(a => a.id === actId);
        if (act) {
            document.getElementById('actName').value = act.title;
            document.getElementById('actDate').value = act.date || '';
            document.getElementById('actRichDesc').value = act.description || '';
            if (act.categories) {
                document.querySelectorAll('.act-cat-checkbox').forEach(cb => {
                    cb.checked = act.categories.includes(cb.value);
                });
            }
        }
    }
    
    document.getElementById('activityModal').classList.add('active');
};

window.closeActivityModal = function() { document.getElementById('activityModal').classList.remove('active'); editingActivityId = null; };

window.saveActivityData = function() {
    const title = document.getElementById('actName').value;
    if (!title) { showToast('Введите название'); return; }
    
    const selectedCats = Array.from(document.querySelectorAll('.act-cat-checkbox:checked')).map(cb => cb.value);
    const actData = {
        id: editingActivityId || 'act_' + Date.now(),
        title: title,
        date: document.getElementById('actDate').value,
        categories: selectedCats.length > 0 ? selectedCats : mainProjectCategories,
        description: document.getElementById('actRichDesc').value,
        status: 'active'
    };

    if (editingActivityId) {
        const idx = currentEditingActivities.findIndex(a => a.id === editingActivityId);
        if (idx !== -1) currentEditingActivities[idx] = actData;
    } else {
        currentEditingActivities.push(actData);
    }
    
    const latestDate = getLatestActivityDate({ activities: currentEditingActivities });
    if (latestDate) {
        document.getElementById('projLastUpdated').value = latestDate.split('T')[0];
    }
    
    renderActivitiesAdminList();
    closeActivityModal();
    showToast('Активность сохранена');
};

window.deleteActivity = function() {
    if (editingActivityId && confirm('Удалить эту активность?')) {
        currentEditingActivities = currentEditingActivities.filter(a => a.id !== editingActivityId);
        
        const latestDate = getLatestActivityDate({ activities: currentEditingActivities });
        if (latestDate) {
            document.getElementById('projLastUpdated').value = latestDate.split('T')[0];
        } else {
            document.getElementById('projLastUpdated').value = '';
        }
        
        renderActivitiesAdminList();
        closeActivityModal();
        showToast('Активность удалена');
    }
};

function renderActivitiesAdminList() {
    const container = document.getElementById('activitiesListAdmin');
    if (currentEditingActivities.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-sm italic text-center py-4">Активности еще не добавлены.</p>';
        return;
    }
    container.innerHTML = currentEditingActivities.map(function(act) {
        const actDate = act.date ? formatDateForDisplay(act.date) : '';
        return '<div class="activity-item-admin">' +
            '<div><div class="font-bold text-white">' + act.title + '</div>' +
            '<div class="text-xs text-slate-400">' + (actDate ? actDate + ' • ' : '') + (act.categories ? act.categories.join(', ') : '') + '</div></div>' +
            '<div class="flex gap-2">' +
            '<button onclick="openActivityEditor(\'' + act.id + '\')" class="text-blue-400 hover:text-blue-300 p-1"><i class="fas fa-edit"></i></button>' +
            '<button onclick="currentEditingActivities = currentEditingActivities.filter(a => a.id !== \'' + act.id + '\'); renderActivitiesAdminList();" class="text-red-400 hover:text-red-300 p-1"><i class="fas fa-trash"></i></button>' +
            '</div></div>';
    }).join('');
}

window.endActivity = async function(projId, actId) {
    if (!confirm('Завершить эту активность?')) return;
    
    const project = projects.find(p => p.id === projId);
    if (project) {
        const actIdx = project.activities.findIndex(a => a.id === actId);
        if (actIdx !== -1) {
            project.activities[actIdx].status = 'ended';
            try {
                await setDoc(doc(db, "projects", projId), { activities: project.activities }, { merge: true });
                showToast('Активность завершена');
                if (currentDetailId === projId) openDetail(projId);
            } catch (e) { showToast('Ошибка сохранения'); }
        }
    }
};

window.resumeActivity = async function(projId, actId) {
    if (!confirm('Возобновить эту активность?')) return;
    
    const project = projects.find(p => p.id === projId);
    if (project) {
        const actIdx = project.activities.findIndex(a => a.id === actId);
        if (actIdx !== -1) {
            project.activities[actIdx].status = 'active';
            try {
                await setDoc(doc(db, "projects", projId), { activities: project.activities }, { merge: true });
                showToast('Активность возобновлена');
                if (currentDetailId === projId) openDetail(projId);
            } catch (e) { showToast('Ошибка сохранения'); }
        }
    }
};

window.insertActivityFormat = function(type) {
    const textarea = document.getElementById('actRichDesc');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (type === 'img') {
        pendingLinkInsert = { type: 'img', start, end, text: '' };
        document.getElementById('promptModal').classList.add('active');
        document.getElementById('promptInput').value = '';
        document.getElementById('promptInput').focus();
        document.getElementById('promptModal').querySelector('h2').textContent = 'Вставьте ссылку на картинку';
    } else if (type === 'link') {
        const linkText = selectedText.trim() ? selectedText : 'текст ссылки';
        pendingLinkInsert = { type: 'link', start, end, text: linkText };
        document.getElementById('promptModal').classList.add('active');
        document.getElementById('promptInput').value = '';
        document.getElementById('promptInput').focus();
        document.getElementById('promptModal').querySelector('h2').textContent = 'Вставьте ссылку';
    } else {
        if (type === 'h3') {
            textarea.value = textarea.value.substring(0, start) + '### ' + (selectedText || 'Заголовок') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 4 + (selectedText || 'Заголовок').length;
        } else if (type === 'ul') {
            textarea.value = textarea.value.substring(0, start) + '- ' + (selectedText || 'Пункт') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 2 + (selectedText || 'Пункт').length;
        } else if (type === 'quote') {
            textarea.value = textarea.value.substring(0, start) + '> ' + (selectedText || 'Цитата') + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 2 + (selectedText || 'Цитата').length;
        } else if (type === 'hr') {
            textarea.value = textarea.value.substring(0, start) + '\n---\n' + textarea.value.substring(end);
            textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
    }
};

window.closePromptModal = function() {
    const modal = document.getElementById('promptModal');
    modal.classList.remove('active');
    document.getElementById('promptInput').value = '';
    pendingLinkInsert = null;
};

window.confirmLinkInsert = function() {
    const textarea = document.getElementById('actRichDesc');
    const url = document.getElementById('promptInput').value.trim();
    
    if (!url) { 
        showToast('Введите ссылку'); 
        return; 
    }
    
    if (pendingLinkInsert && textarea) {
        const { start, end, type, text } = pendingLinkInsert;
        let insertion = '';
        
        if (type === 'img') {
            insertion = '![](' + url + ')';
        } else {
            insertion = '[' + text + '](' + url + ')';
        }
        
        textarea.value = textarea.value.substring(0, start) + insertion + textarea.value.substring(end);
        textarea.focus(); 
        textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
        showToast(type === 'img' ? 'Картинка добавлена' : 'Ссылка добавлена');
    }
    closePromptModal();
};
