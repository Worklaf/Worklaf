// Утилиты и вспомогательные функции

// Формат даты клика
function formatClickDate(dateString) {
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

// Формат даты для отображения
function formatDateForDisplay(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Проверка клика сегодня
function isClickedToday(projectId) {
    const record = arcData[projectId];
    if (!record || !record.lastClick) return false;
    return new Date(record.lastClick).toDateString() === new Date().toDateString();
}

// Формат времени назад
function formatTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff/60000) + ' мин назад';
    if (diff < 86400000) return Math.floor(diff/3600000) + ' ч назад';
    if (diff < 604800000) return Math.floor(diff/86400000) + ' дн назад';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// Проверка нового проекта
function isNewProject(dateString) {
    if (!dateString) return false;
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
}

// Получить дату последней активности
function getLatestActivityDate(project) {
    if (!project.activities || project.activities.length === 0) {
        return project.lastUpdated || project.createdAt;
    }
    const latestActivity = project.activities
        .filter(a => a.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return latestActivity && latestActivity.date ? latestActivity.date : (project.lastUpdated || project.createdAt);
}

// Проверка даты на сегодня
function isToday(dateString) { 
    if (!dateString) return false; 
    return new Date(dateString).toDateString() === new Date().toDateString(); 
}

// Формат даты
function formatDate(str) { 
    if (!str) return '—'; 
    return new Date(str).toLocaleDateString('ru-RU'); 
}

// Парсинг форматированного контента
function parseRichContent(text) {
    if (!text) return '';
    let html = text;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, url) {
        return '<img src="' + url + '" alt="' + (alt || 'image') + '" onerror="this.style.display=\'none\'" onclick="window.openImageModal(this)" style="max-width: 300px; height: auto; border-radius: 8px; margin: 12px 0; border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">';
    });
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
    const lines = html.split('\n');
    let result = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.match(/^(<h3|<ul|<li|<blockquote|<img|<hr|<p)/)) {
            result += '<p>' + line + '</p>';
        } else {
            result += line;
        }
    }
    return result;
}

// Получить все категории из проектов
function getAllCategoriesFromProjects() {
    const cats = new Set();
    projects.forEach(function(p) { 
        if(p.categories) p.categories.forEach(function(c) { cats.add(c); }); 
    });
    return Array.from(cats);
}

// Получить категории с количеством
function getCategoriesWithCounts(allProjects) {
    const catCounts = {};
    allProjects.forEach(function(p) {
        if (p.categories) {
            p.categories.forEach(function(cat) {
                catCounts[cat] = (catCounts[cat] || 0) + 1;
            });
        }
    });
    return Object.entries(catCounts).sort(function(a, b) { return a[0].localeCompare(b[0]); });
}

function getAllCategoriesWithCounts(allProjects) {
     return getCategoriesWithCounts(allProjects);
}

// Нормализация данных проекта
function normalizeData(project) {
    if (!project.categories) project.categories = project.category ? [project.category] : ['Other'];
    if (!project.activities) project.activities = [];
    
    project.activities = project.activities.map((act, index) => {
        if (!act.id) {
            const safeTitle = act.title ? act.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') : 'act';
            act.id = 'act_' + safeTitle + '_' + (project.id || 'proj') + '_' + index;
        }
        return act;
    });
    
    if (project.deleted === undefined) project.deleted = false;
    return project;
}
