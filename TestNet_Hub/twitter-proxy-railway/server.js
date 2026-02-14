const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const cors = require('cors'); // Для разрешения запросов из вашего HTML-файла

const app = express();
const PORT = process.env.PORT || 3000; // Порт для прослушивания, Railway предоставит свой

// Использование CORS для разрешения запросов с вашего домена
// В продакшене лучше указать конкретный домен, а не '*'
app.use(cors({
    origin: '*', // Или укажите ваш домен, например: 'http://localhost:8080' или 'https://your-frontend-domain.com'
    methods: ['GET']
}));

// Инициализация клиента Twitter API с использованием App-only аутентификации (Bearer Token)
// Ключи будут браться из переменных окружения Railway
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
const roClient = twitterClient.readOnly; // Клиент только для чтения

// Эндпоинт для получения твитов по имени пользователя
app.get('/tweets/:username', async (req, res) => {
    const username = req.params.username;
    console.log(`Fetching tweets for @${username}`);

    try {
        // Получаем ID пользователя по его имени
        const user = await roClient.v2.userByUsername(username);
        if (!user || !user.data) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = user.data.id;

        // Получаем последние твиты пользователя
        const userTimeline = await roClient.v2.userTimeline(userId, {
            'tweet.fields': ['created_at', 'text', 'id'],
            max_results: 10 // Можно настроить количество твитов
        });

        const tweets = userTimeline.data.data ? userTimeline.data.data.map(tweet => ({
            id: tweet.id,
            text: tweet.text,
            createdAt: tweet.created_at,
            link: `https://twitter.com/${username}/status/${tweet.id}` // Формируем прямую ссылку
        })) : [];

        res.json(tweets);

    } catch (e) {
        console.error('Error fetching tweets:', e.message);
        if (e.code === 401 || e.code === 403) {
            return res.status(e.code).json({ error: 'Twitter API authentication failed or permissions denied. Check your Bearer Token and App permissions.' });
        }
        res.status(500).json({ error: 'Failed to fetch tweets from Twitter API', details: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
