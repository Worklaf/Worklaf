// ========== НАСТРОЙКИ ==========
const API_URL = 'http://localhost:5000';
const DATA_URL = 'twitter_results.json'; // Для GitHub Pages

// ========== ЭЛЕМЕНТЫ ==========
const checkBtn = document.getElementById('check-twitter');
const statusMsg = document.getElementById('status-message');
const resultsContainer = document.getElementById('twitter-results');
const lastUpdateElement = document.getElementById('last-update');

// ========== ЗАПУСК ПАРСИНГА ==========
checkBtn.addEventListener('click', async () => {
    checkBtn.disabled = true;
    checkBtn.textContent = '⏳ Запускаю парсинг...';
    
    try {
        // Пытаемся запустить через API
        const response = await fetch(`${API_URL}/start`);
        const data = await response.json();

        if (data.status === 'started') {
            showStatus('⏳ Парсинг идёт... Ожидай 2-3 минуты', 'loading');
            checkBtn.textContent = '⏳ Парсинг...';
            
            // Мониторим статус
            monitorParsingStatus();
        } else if (data.status === 'already_running') {
            showStatus('⏳ Парсинг уже выполняется...', 'loading');
            monitorParsingStatus();
        } else {
            showStatus(data.message, 'error');
            resetButton();
        }
        
    } catch (error) {
        // API не доступен - загружаем существующие данные
        showStatus('⚠️ API не запущен. Показываю последние данные...', 'error');
        await loadTwitterData();
        resetButton();
    }
});

// ========== МОНИТОРИНГ СТАТУСА ==========
async function monitorParsingStatus() {
    const interval = setInterval(async () => {
        try {
            const response = await fetch(`${API_URL}/status`);
            const data = await response.json();

            // Обновляем кнопку
            checkBtn.textContent = `⏳ ${data.progress || 0}%`;

            if (!data.running) {
                clearInterval(interval);
                
                // Парсинг завершён
                showStatus(data.message, data.message.includes('✅') ? 'success' : 'error');
                
                // Загружаем результаты
                setTimeout(async () => {
                    await loadTwitterData();
                    resetButton();
                }, 2000);
            }
            
        } catch (error) {
            clearInterval(interval);
            showStatus('❌ Ошибка соединения с API', 'error');
            resetButton();
        }
    }, 3000); // Проверяем каждые 3 секунды
}

// ========== ЗАГРУЗКА ДАННЫХ ==========
async function loadTwitterData() {
    try {
        // Добавляем случайный параметр для сброса кеша
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(DATA_URL + cacheBuster);
        
        if (!response.ok) {
            throw new Error('Данные не найдены');
        }
        
        const data = await response.json();
        
        // Обновляем время
        updateLastUpdate(data.last_update);
        
        // Показываем результаты
        displayTwitterResults(data);
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        resultsContainer.innerHTML = `
            <p class="no-results">
                ❌ Данные не найдены<br>
                💡 Запусти парсинг через кнопку "Проверить NFT"
            </p>
        `;
    }
}

// ========== ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ ==========
function displayTwitterResults(data) {
    if (!data.nfts || data.nfts.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Пока ничего не найдено</p>';
        return;
    }

    const nftsHTML = data.nfts.map(nft => {
        // Краткий текст (первые 120 символов)
        const shortText = nft.text.length > 120 
            ? nft.text.substring(0, 120) + '...' 
            : nft.text;
        
        return `
            <div class="nft-card">
                <div class="nft-header">
                    <strong>@${nft.project}</strong>
                    <span class="time">${nft.time_ago}</span>
                </div>
                <div class="nft-text">${shortText}</div>
                <div class="nft-stats">
                    <span>❤️ ${nft.likes}</span>
                    <span>🔁 ${nft.retweets}</span>
                </div>
                <a href="${nft.url}" target="_blank" class="nft-link">
                    Открыть твит →
                </a>
            </div>
        `;
    }).join('');

    resultsContainer.innerHTML = nftsHTML;
}

// ========== ОБНОВЛЕНИЕ ВРЕМЕНИ ==========
function updateLastUpdate(timestamp) {
    if (!timestamp) {
        lastUpdateElement.textContent = 'Нет данных';
        return;
    }
    
    const date = new Date(timestamp);
    const formatted = date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    lastUpdateElement.textContent = `Последнее обновление: ${formatted}`;
}

// ========== СТАТУС СООБЩЕНИЯ ==========
function showStatus(message, type) {
    statusMsg.textContent = message;
    statusMsg.className = `status-message ${type}`;
}

// ========== СБРОС КНОПКИ ==========
function resetButton() {
    setTimeout(() => {
        checkBtn.textContent = '🔍 Проверить NFT';
        checkBtn.disabled = false;
    }, 1000);
}

// ========== АВТОЗАГРУЗКА ПРИ СТАРТЕ ==========
window.addEventListener('DOMContentLoaded', () => {
    loadTwitterData();
});
