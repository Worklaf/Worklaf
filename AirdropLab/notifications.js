// notifications.js
let currentAction = null;

function showNotification(options) {
    const overlay = document.getElementById('notification-overlay');
    const icon = document.getElementById('notif-icon');
    const title = document.getElementById('notif-title');
    const body = document.getElementById('notif-body');
    const actionBtn = document.getElementById('notif-action');
    
    icon.textContent = options.icon || 'ℹ️';
    title.textContent = options.title || 'Уведомление';
    body.innerHTML = options.message || '';
    currentAction = options.action || null;
    
    if (options.actionText) {
        actionBtn.textContent = options.actionText;
        actionBtn.style.display = 'block';
        actionBtn.onclick = () => {
            if (currentAction) currentAction();
            closeNotification();
        };
    } else {
        actionBtn.style.display = 'none';
    }
    
    overlay.classList.remove('hidden');
}

function closeNotification() {
    document.getElementById('notification-overlay').classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNotification();
});
