let API_URL = 'http://localhost:5000';

// Кнопка "Проверить NFT" запускает парсинг
document.getElementById('check-twitter').addEventListener('click', async () => {
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '⏳ Запускаю парсинг...';

    try {
        // Запускаем парсинг через API
        const response = await fetch(`${API_URL}/start`);
        const data = await response.json();

        if (data.status === 'started') {
            btn.textContent = '⏳ Парсинг идёт...';
            
            // Проверяем статус каждые 5 секунд
            checkParsingStatus(btn);
        } else {
            btn.textContent = data.message;
            setTimeout(() => {
                btn.textContent = '🔍 Проверить NFT';
                btn.disabled = false;
            }, 2000);
        }
    } catch (error) {
        btn.textContent = '❌ Запусти API сервер!';
        setTimeout(() => {
            btn.textContent = '🔍 Проверить NFT';
            btn.disabled = false;
        }, 3000);
    }
});

// Проверяем статус парсинга
async function checkParsingStatus(btn) {
    const interval = setInterval(async () => {
        try {
            const response = await fetch(`${API_URL}/status`);
            const data = await response.json();

            if (!data.running) {
                clearInterval(interval);
                btn.textContent = data.message;
                
                // Загружаем результаты
                setTimeout(() => {
                    loadTwitterData();
                    btn.textContent = '🔍 Проверить NFT';
                    btn.disabled = false;
                }, 2000);
            }
        } catch (error) {
            clearInterval(interval);
            btn.textContent = '❌ Ошибка';
            btn.disabled = false;
        }
    }, 5000); // Проверяем каждые 5 секунд
}
