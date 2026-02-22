// =====================================================
// ADMIN.JS - Управление проектами (добавление, редактирование, удаление)
// =====================================================

import { 
    projects, 
    currentUser, 
    isAdminMode,
    setIsAdminMode,
    setProjects,
    categories
} from './config.js';

import { db } from './firebase.js';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showToast, applyFilters } from './ui.js';

// ==========================================
// ADMIN MODE TOGGLE
// ==========================================

export function toggleAdminMode() {
    if (!currentUser) {
        showToast('Войдите, чтобы использовать админ-панель', 'warning');
        return;
    }
    
    const allowedEmails = ['admin@example.com', 'moderator@example.com']; // Замените на реальные
    if (!allowedEmails.includes(currentUser.email)) {
        showToast('У вас нет прав администратора', 'error');
        return;
    }
    
    setIsAdminMode(!isAdminMode);
    
    const panel = document.getElementById('adminPanel');
    const badge = document.getElementById('adminBadge');
    
    if (isAdminMode) {
        panel.classList.remove('hidden');
        if (badge) badge.classList.remove('hidden');
        showToast('Режим администратора активирован', 'success');
    } else {
        panel.classList.add('hidden');
        if (badge) badge.classList.add('hidden');
        showToast('Режим администратора деактивирован', 'info');
    }
    
    applyFilters();
}

// ==========================================
// ADD NEW PROJECT
// ==========================================

export function openAddProjectModal() {
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');
    
    document.getElementById('modalTitle').textContent = 'Добавить проект';
    form.reset();
    form.dataset.editId = '';
    
    // Reset activities
    document.getElementById('activitiesList').innerHTML = '';
    
    // Reset screenshots
    document.getElementById('screenshotsList').innerHTML = '';
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeProjectModal() {
    document.getElementById('projectModal').classList.add('hidden');
    document.body.style.overflow = '';
}

// ==========================================
// ACTIVITIES MANAGEMENT
// ==========================================

export function addActivityField() {
    const container = document.getElementById('activitiesList');
    const id = 'act_' + Date.now();
    
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <input type="text" placeholder="Название активности" class="activity-title" data-id="${id}">
        <textarea placeholder="Описание" class="activity-desc" data-id="${id}"></textarea>
        <input type="text" placeholder="Награда (опционально)" class="activity-reward" data-id="${id}">
        <input type="url" placeholder="URL (опционально)" class="activity-url" data-id="${id}">
        <input type="date" class="activity-date" data-id="${id}">
        <select class="activity-priority" data-id="${id}">
            <option value="normal">Normal</option>
            <option value="high">High Priority</option>
        </select>
        <button type="button" onclick="window.removeActivityField(this)" class="text-red-400 hover:text-red-300">
            <i class="fas fa-trash"></i> Удалить
        </button>
    `;
    container.appendChild(div);
}

export function removeActivityField(btn) {
    btn.closest('.activity-item').remove();
}

// ==========================================
// SCREENSHOTS MANAGEMENT
// ==========================================

export function addScreenshotField() {
    const container = document.getElementById('screenshotsList');
    
    const div = document.createElement('div');
    div.className = 'flex gap-2';
    div.innerHTML = `
        <input type="url" placeholder="URL скриншота" class="screenshot-url flex-1">
        <button type="button" onclick="window.removeScreenshotField(this)" class="text-red-400 hover:text-red-300">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

export function removeScreenshotField(btn) {
    btn.closest('div').remove();
}

// ==========================================
// SAVE PROJECT
// ==========================================

export async function saveProject() {
    const form = document.getElementById('projectForm');
    const editId = form.dataset.editId;
    
    const name = document.getElementById('projectName').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const status = document.getElementById('projectStatus').value;
    const priority = document.getElementById('projectPriority').value;
    const image = document.getElementById('projectImage').value.trim();
    const guideUrl = document.getElementById('projectGuideUrl').value.trim();
    const referralLink = document.getElementById('projectReferralLink').value.trim();
    const twitterUrl = document.getElementById('projectTwitterUrl').value.trim();
    const discordUrl = document.getElementById('projectDiscordUrl').value.trim();
    const cryptoRankUrl = document.getElementById('projectCryptoRankUrl').value.trim();
    const hasDaily = document.getElementById('projectHasDaily').checked;
    
    // Categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(cb => cb.value);
    
    // Features
    const features = document.getElementById('projectFeatures').value.trim().split('\n').filter(f => f);
    
    // Activities
    const activities = Array.from(document.querySelectorAll('.activity-item')).map(item => {
        const id = item.querySelector('.activity-title').dataset.id;
        return {
            id: id,
            title: item.querySelector('.activity-title').value.trim(),
            description: item.querySelector('.activity-desc').value.trim(),
            reward: item.querySelector('.activity-reward').value.trim() || null,
            url: item.querySelector('.activity-url').value.trim() || null,
            date: item.querySelector('.activity-date').value || null,
            priority: item.querySelector('.activity-priority').value
        };
    }).filter(a => a.title);
    
    // Screenshots
    const screenshots = Array.from(document.querySelectorAll('.screenshot-url')).map(input => input.value.trim()).filter(url => url);
    
    if (!name) {
        showToast('Введите название проекта', 'warning');
        return;
    }
    
    const projectData = {
        name,
        description,
        status,
        priority,
        image: image || null,
        guideUrl: guideUrl || null,
        referralLink: referralLink || null,
        twitterUrl: twitterUrl || null,
        discordUrl: discordUrl || null,
        cryptoRankUrl: cryptoRankUrl || null,
        hasDaily,
        categories: selectedCategories.length > 0 ? selectedCategories : ['Other'],
        features,
        activities,
        screenshots,
        lastUpdated: new Date().toISOString()
    };
    
    try {
        if (editId) {
            // UPDATE
            const docRef = doc(db, "projects", editId);
            await updateDoc(docRef, projectData);
            
            const idx = projects.findIndex(p => p.id === editId);
            if (idx !== -1) {
                projects[idx] = { ...projects[idx], ...projectData };
            }
            
            showToast('✅ Проект обновлён!', 'success');
        } else {
            // CREATE
            projectData.createdAt = new Date().toISOString();
            projectData.deleted = false;
            
            const docRef = await addDoc(collection(db, "projects"), projectData);
            
            projects.push({ id: docRef.id, ...projectData });
            
            showToast('✨ Проект добавлен!', 'success');
        }
        
        closeProjectModal();
        applyFilters();
    } catch (error) {
        console.error('Ошибка сохранения проекта:', error);
        showToast('Ошибка сохранения. Попробуйте позже', 'error');
    }
}

// ==========================================
// EDIT PROJECT
// ==========================================

export function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    const form = document.getElementById('projectForm');
    const modal = document.getElementById('projectModal');
    
    document.getElementById('modalTitle').textContent = 'Редактировать проект';
    form.dataset.editId = id;
    
    document.getElementById('projectName').value = project.name || '';
    document.getElementById('projectDescription').value = project.description || '';
    document.getElementById('projectStatus').value = project.status || 'active';
    document.getElementById('projectPriority').value = project.priority || 'normal';
    document.getElementById('projectImage').value = project.image || '';
    document.getElementById('projectGuideUrl').value = project.guideUrl || '';
    document.getElementById('projectReferralLink').value = project.referralLink || '';
    document.getElementById('projectTwitterUrl').value = project.twitterUrl || '';
    document.getElementById('projectDiscordUrl').value = project.discordUrl || '';
    document.getElementById('projectCryptoRankUrl').value = project.cryptoRankUrl || '';
    document.getElementById('projectHasDaily').checked = project.hasDaily || false;
    
    // Categories
    document.querySelectorAll('input[name="categories"]').forEach(cb => {
        cb.checked = project.categories && project.categories.includes(cb.value);
    });
    
    // Features
    document.getElementById('projectFeatures').value = (project.features || []).join('\n');
    
    // Activities
    const activitiesContainer = document.getElementById('activitiesList');
    activitiesContainer.innerHTML = '';
    (project.activities || []).forEach(act => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <input type="text" placeholder="Название активности" class="activity-title" data-id="${act.id}" value="${act.title || ''}">
            <textarea placeholder="Описание" class="activity-desc" data-id="${act.id}">${act.description || ''}</textarea>
            <input type="text" placeholder="Награда" class="activity-reward" data-id="${act.id}" value="${act.reward || ''}">
            <input type="url" placeholder="URL" class="activity-url" data-id="${act.id}" value="${act.url || ''}">
            <input type="date" class="activity-date" data-id="${act.id}" value="${act.date || ''}">
            <select class="activity-priority" data-id="${act.id}">
                <option value="normal" ${act.priority === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="high" ${act.priority === 'high' ? 'selected' : ''}>High Priority</option>
            </select>
            <button type="button" onclick="window.removeActivityField(this)" class="text-red-400 hover:text-red-300">
                <i class="fas fa-trash"></i> Удалить
            </button>
        `;
        activitiesContainer.appendChild(div);
    });
    
    // Screenshots
    const screenshotsContainer = document.getElementById('screenshotsList');
    screenshotsContainer.innerHTML = '';
    (project.screenshots || []).forEach(url => {
        const div = document.createElement('div');
        div.className = 'flex gap-2';
        div.innerHTML = `
            <input type="url" placeholder="URL скриншота" class="screenshot-url flex-1" value="${url}">
            <button type="button" onclick="window.removeScreenshotField(this)" class="text-red-400 hover:text-red-300">
                <i class="fas fa-trash"></i>
            </button>
        `;
        screenshotsContainer.appendChild(div);
    });
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// ==========================================
// DELETE PROJECT
// ==========================================

export async function deleteProject(id) {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;
    
    try {
        const docRef = doc(db, "projects", id);
        await deleteDoc(docRef);
        
        const idx = projects.findIndex(p => p.id === id);
        if (idx !== -1) projects.splice(idx, 1);
        
        showToast('🗑️ Проект удалён', 'success');
        applyFilters();
    } catch (error) {
        console.error('Ошибка удаления:', error);
        showToast('Ошибка удаления. Попробуйте позже', 'error');
    }
}

// ==========================================
// ARCHIVE PROJECT (soft delete)
// ==========================================

export async function archiveProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    try {
        const docRef = doc(db, "projects", id);
        await updateDoc(docRef, { deleted: !project.deleted });
        
        project.deleted = !project.deleted;
        
        showToast(project.deleted ? '📦 Проект архивирован' : '📤 Проект восстановлен', 'success');
        applyFilters();
    } catch (error) {
        console.error('Ошибка архивирования:', error);
        showToast('Ошибка. Попробуйте позже', 'error');
    }
}

// ==========================================
// EXPORT TO WINDOW
// ==========================================

window.toggleAdminMode = toggleAdminMode;
window.openAddProjectModal = openAddProjectModal;
window.closeProjectModal = closeProjectModal;
window.addActivityField = addActivityField;
window.removeActivityField = removeActivityField;
window.addScreenshotField = addScreenshotField;
window.removeScreenshotField = removeScreenshotField;
window.saveProject = saveProject;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.archiveProject = archiveProject;
