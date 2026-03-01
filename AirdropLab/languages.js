// language.js - Полный языковой файл с автопереводом

// === ОСНОВНЫЕ ПЕРЕВОДЫ ИНТЕРФЕЙСА ===
window.translations = {
    ru: {
        'loading': 'ЗАГРУЗКА ЛАБОРАТОРИИ...',
        'experimental_zone': 'Экспериментальная зона',
        'edit_mode': 'Режим редактирования',
        'active': 'Активных',
        'new': 'Новых',
        'in_work': 'В работе',
        'done': 'Готово',
        'filters': 'Фильтры',
        'all_projects': 'Все проекты',
        'unvisited': 'Не посещённые',
        'today': 'Сегодня',
        'active_filter': 'Активные',
        'daily': 'Ежедневные',
        'favorites': 'Избранное',
        'completed': 'Завершённые',
        'archive': 'Архив',
        'categories': 'Категории',
        'all': 'Все',
        'search_placeholder': 'Поиск проектов...',
        'per_page': 'На странице:',
        'newest_first': 'Сначала новые',
        'by_priority': 'По приоритету',
        'by_name': 'По названию',
        'info_click_project': 'Нажмите на название проекта для подробной информации или на "Гайд" для выполнения.',
        'guest_warning': 'Вы не вошли в аккаунт. Избранное и выполненные задания сохраняются только в этом браузере.',
        'guide': 'Гайд',
        'website': 'Website',
        'twitter': 'Twitter',
        'cr': 'CR',
        'status_active': 'Active',
        'status_soon': 'Soon',
        'status_ended': 'Ended',
        'daily_badge': 'Daily',
        'high_priority': 'High',
        'no_description': 'Нет описания',
        'new_badge': 'NEW',
        'about_project': 'О проекте',
        'activities': 'Активности',
        'no_description_detail': 'Описание отсутствует',
        'added': 'Добавлено:',
        'start': 'Начать',
        'click': 'Клик',
        'complete': 'Завершить',
        'mark': 'Отметить',
        'mark_incomplete': 'Отметить как незавершённое',
        'task_completed': 'Задача завершена!',
        'task_credited': 'Задание засчитано!',
        'login': 'Вход',
        'new_test': 'Новый тест',
        'view_stats': 'Посмотреть статистику',
        'upload_firebase': 'Загрузить данные в базу Firebase',
        'export_json': 'Экспортировать все данные в JSON файл',
        'view_deleted': 'Просмотреть удаленные проекты',
        'admin': 'Admin',
        'add_project': 'Добавить проект',
        'edit_project': 'Редактировать проект',
        'project_name': 'Название проекта *',
        'project_name_eng': 'Название (английский) *',
        'project_categories': 'Категории проекта',
        'logo_url': 'URL Логотипа',
        'guide_link': 'Ссылка на гайд',
        'cryptorank_link': 'Ссылка на CryptoRank',
        'project_twitter': 'Twitter проекта',
        'referral_link': 'Реферальная ссылка',
        'short_description': 'Краткое описание',
        'full_description': 'Полное описание',
        'full_description_eng': 'Полное описание (английский)',
        'status': 'Статус',
        'last_update': 'Дата обновления',
        'has_daily_quests': 'Есть ежедневные квесты',
        'high_priority_check': 'Высокий приоритет',
        'project_activities': 'Активности проекта',
        'add_activity': 'Добавить активность',
        'save_project': 'Сохранить проект',
        'cancel': 'Отмена',
        'delete_project': 'Удалить проект',
        'new_activity': 'Новая активность',
        'edit_activity': 'Редактировать активность',
        'activity_name': 'Название активности *',
        'activity_name_eng': 'Название (английский)',
        'activity_date': 'Дата активности (начало)',
        'end_date': 'Дата окончания (автозавершение)',
        'detailed_description': 'Подробное описание',
        'detailed_description_eng': 'Подробное описание (английский)',
        'insert_image': 'Вставить картинку',
        'insert_link': 'Вставить ссылку',
        'h3': 'Заголовок 3 уровня',
        'bullet_list': 'Маркированный список',
        'quote': 'Цитата',
        'hr': 'Горизонтальная линия',
        'enter_url': 'Вставьте ссылку',
        'enter_image_url': 'Вставьте ссылку на картинку...',
        'login_btn': 'Войти',
        'google': 'Google',
        'twitter_auth': 'Twitter',
        'or_email': 'ИЛИ EMAIL',
        'email': 'Email',
        'password': 'Пароль',
        'register': 'Регистрация',
        'edit': 'Редактировать',
        'notifications': 'Уведомления',
        'no_notifications': 'Нет уведомлений',
        'mark_read': 'Отметить',
        'feedback': 'Обратная связь',
        'feedback_title': 'Отзывы и предложения',
        'project_colon': 'Проект: ',
        'subject': 'Тема обращения',
        'message': 'Сообщение',
        'suggestion': 'Предложение',
        'bug': 'Ошибка',
        'question': 'Вопрос',
        'other': 'Другое',
        'send': 'Отправить',
        'close': 'Закрыть',
        'start_new': 'Начните новое обращение',
        'no_messages': 'Нет сообщений',
        'your_reply': 'Ваш ответ',
        'write_reply': 'Напишите ответ...',
        'chat_support': 'Чат с поддержкой',
        'chat_user': 'Чат с пользователем',
        'all_requests': 'Все обращения',
        'my_messages': 'Мои сообщения',
        'delete': 'Удалить',
        'delete_conversation': 'Удалить переписку?',
        'deleted': 'Удалено',
        'reply_placeholder': 'Ответ пользователю...',
        'deleted_projects': 'Удаленные проекты',
        'search': 'Поиск...',
        'no_deleted': 'Нет удаленных проектов',
        'restore': 'Восстановить',
        'view': 'Просмотр',
        'action_completed': 'Действие выполнено',
        'added_exclaim': 'Добавлено!',
        'removed': 'Удалено',
        'saved': 'Сохранено!',
        'error': 'Ошибка',
        'please_login': 'Войдите',
        'sent': 'Отправлено!',
        'login_success': 'Вход выполнен',
        'login_google': 'Вход: Google',
        'login_twitter': 'Вход: Twitter',
        'logged_out': 'Выход',
        'account_created': 'Аккаунт создан!',
        'uploaded': 'Загружено',
        'exported': 'Экспортировано',
        'no_data': 'Нет данных',
        'exporting': 'Экспорт...',
        'enter_message': 'Введите сообщение',
        'enter_reply': 'Введите ответ',
        'enter_url_toast': 'Введите ссылку',
        'resumed': 'Возобновлена',
        'completed_status': 'Завершена',
        'moved_to_archive': 'Перемещено в архив',
        'restored': 'Восстановлен!',
        'move_to_archive': 'Переместить в архив?',
        'complete_activity': 'Завершить эту активность?',
        'resume_activity': 'Возобновить эту активность?',
        'delete_activity': 'Удалить эту активность?',
        'restore_project': 'Восстановить проект?',
        'upload_to_db': 'Загрузить в базу?',
        'export_all': 'Экспортировать все проекты?',
        'delete_confirm': 'Удалить?',
        'active_research': 'Активные исследования',
        'go_to_guide': 'Перейти к гайду',
        'hero_title': 'Лаборатория Крипто-Возможностей',
        'hero_subtitle': 'AirdropLab - это ваш центр для исследования, тестирования и участия в самых перспективных аирдропах.',
        'start_research': 'Начать исследование',
        'collapse_welcome': 'Свернуть приветствие',
        'expand_welcome': 'Развернуть приветствие',
        'nothing_found': 'Ничего не найдено',
        'reset_filters': 'Сбросить фильтры',
        'in_system': 'В системе',
        'researcher': 'Researcher',
        'today_date': 'сегодня',
        'yesterday': 'вчера',
        'auto_translating': 'Перевод на английский...',
        'auto_translated': 'Автоперевод выполнен',
        'enter_project_name': 'Введите название проекта',
        'enter_activity_name': 'Введите название активности'
    },
    en: {
        'loading': 'LOADING LABORATORY...',
        'experimental_zone': 'Experimental Zone',
        'edit_mode': 'Edit Mode',
        'active': 'Active',
        'new': 'New',
        'in_work': 'In Work',
        'done': 'Done',
        'filters': 'Filters',
        'all_projects': 'All Projects',
        'unvisited': 'Unvisited',
        'today': 'Today',
        'active_filter': 'Active',
        'daily': 'Daily',
        'favorites': 'Favorites',
        'completed': 'Completed',
        'archive': 'Archive',
        'categories': 'Categories',
        'all': 'All',
        'search_placeholder': 'Search projects...',
        'per_page': 'Per page:',
        'newest_first': 'Newest first',
        'by_priority': 'By priority',
        'by_name': 'By name',
        'info_click_project': 'Click on project name for details or on "Guide" to complete tasks.',
        'guest_warning': 'You are not logged in. Favorites and completed tasks are saved only in this browser.',
        'guide': 'Guide',
        'website': 'Website',
        'twitter': 'Twitter',
        'cr': 'CR',
        'status_active': 'Active',
        'status_soon': 'Soon',
        'status_ended': 'Ended',
        'daily_badge': 'Daily',
        'high_priority': 'High',
        'no_description': 'No description',
        'new_badge': 'NEW',
        'about_project': 'About Project',
        'activities': 'Activities',
        'no_description_detail': 'No description',
        'added': 'Added:',
        'start': 'Start',
        'click': 'Click',
        'complete': 'Complete',
        'mark': 'Mark',
        'mark_incomplete': 'Mark as incomplete',
        'task_completed': 'Task completed!',
        'task_credited': 'Task credited!',
        'login': 'Login',
        'new_test': 'New Test',
        'view_stats': 'View Statistics',
        'upload_firebase': 'Upload to Firebase',
        'export_json': 'Export All Data to JSON',
        'view_deleted': 'View Deleted Projects',
        'admin': 'Admin',
        'add_project': 'Add Project',
        'edit_project': 'Edit Project',
        'project_name': 'Project Name *',
        'project_name_eng': 'Name (English) *',
        'project_categories': 'Project Categories',
        'logo_url': 'Logo URL',
        'guide_link': 'Guide Link',
        'cryptorank_link': 'CryptoRank Link',
        'project_twitter': 'Project Twitter',
        'referral_link': 'Referral Link',
        'short_description': 'Short Description',
        'full_description': 'Full Description',
        'full_description_eng': 'Full Description (English)',
        'status': 'Status',
        'last_update': 'Last Update Date',
        'has_daily_quests': 'Has daily quests',
        'high_priority_check': 'High Priority',
        'project_activities': 'Project Activities',
        'add_activity': 'Add Activity',
        'save_project': 'Save Project',
        'cancel': 'Cancel',
        'delete_project': 'Delete Project',
        'new_activity': 'New Activity',
        'edit_activity': 'Edit Activity',
        'activity_name': 'Activity Name *',
        'activity_name_eng': 'Name (English)',
        'activity_date': 'Activity Date (start)',
        'end_date': 'End Date (auto-complete)',
        'detailed_description': 'Detailed Description',
        'detailed_description_eng': 'Detailed Description (English)',
        'insert_image': 'Insert Image',
        'insert_link': 'Insert Link',
        'h3': 'Heading level 3',
        'bullet_list': 'Bulleted list',
        'quote': 'Quote',
        'hr': 'Horizontal line',
        'enter_url': 'Insert URL',
        'enter_image_url': 'Insert image URL...',
        'login_btn': 'Login',
        'google': 'Google',
        'twitter_auth': 'Twitter',
        'or_email': 'OR EMAIL',
        'email': 'Email',
        'password': 'Password',
        'register': 'Register',
        'edit': 'Edit',
        'notifications': 'Notifications',
        'no_notifications': 'No notifications',
        'mark_read': 'Mark as read',
        'feedback': 'Feedback',
        'feedback_title': 'Feedback & Suggestions',
        'project_colon': 'Project: ',
        'subject': 'Subject',
        'message': 'Message',
        'suggestion': 'Suggestion',
        'bug': 'Bug',
        'question': 'Question',
        'other': 'Other',
        'send': 'Send',
        'close': 'Close',
        'start_new': 'Start new request',
        'no_messages': 'No messages',
        'your_reply': 'Your reply',
        'write_reply': 'Write a reply...',
        'chat_support': 'Chat with Support',
        'chat_user': 'Chat with User',
        'all_requests': 'All Requests',
        'my_messages': 'My Messages',
        'delete': 'Delete',
        'delete_conversation': 'Delete conversation?',
        'deleted': 'Deleted',
        'reply_placeholder': 'Reply to user...',
        'deleted_projects': 'Deleted Projects',
        'search': 'Search...',
        'no_deleted': 'No deleted projects',
        'restore': 'Restore',
        'view': 'View',
        'action_completed': 'Action completed',
        'added_exclaim': 'Added!',
        'removed': 'Removed',
        'saved': 'Saved!',
        'error': 'Error',
        'please_login': 'Please login',
        'sent': 'Sent!',
        'login_success': 'Login successful',
        'login_google': 'Login: Google',
        'login_twitter': 'Login: Twitter',
        'logged_out': 'Logged out',
        'account_created': 'Account created!',
        'uploaded': 'Uploaded',
        'exported': 'Exported',
        'no_data': 'No data',
        'exporting': 'Exporting...',
        'enter_message': 'Enter message',
        'enter_reply': 'Enter reply',
        'enter_url_toast': 'Enter URL',
        'resumed': 'Resumed',
        'completed_status': 'Completed',
        'moved_to_archive': 'Moved to archive',
        'restored': 'Restored!',
        'move_to_archive': 'Move to archive?',
        'complete_activity': 'Complete this activity?',
        'resume_activity': 'Resume this activity?',
        'delete_activity': 'Delete this activity?',
        'restore_project': 'Restore project?',
        'upload_to_db': 'Upload to database?',
        'export_all': 'Export all projects?',
        'delete_confirm': 'Delete?',
        'active_research': 'Active Research',
        'go_to_guide': 'Go to Guide',
        'hero_title': 'Crypto Opportunities Laboratory',
        'hero_subtitle': 'AirdropLab is your center for researching, testing and participating in the most promising airdrops.',
        'start_research': 'Start Research',
        'collapse_welcome': 'Collapse Welcome',
        'expand_welcome': 'Expand Welcome',
        'nothing_found': 'Nothing found',
        'reset_filters': 'Reset Filters',
        'in_system': 'In system',
        'researcher': 'Researcher',
        'today_date': 'today',
        'yesterday': 'yesterday',
        'auto_translating': 'Translating to English...',
        'auto_translated': 'Auto-translated',
        'enter_project_name': 'Enter project name',
        'enter_activity_name': 'Enter activity name'
    }
};

// === СЛОВАРЬ АВТОПЕРЕВОДА ===
window.translationDict = {
    // Статусы
    'Active': 'Active',
    'Soon': 'Soon',
    'Ended': 'Ended',
    'Активный': 'Active',
    'Скоро': 'Soon',
    'Завершён': 'Ended',
    
    // Категории
    'DeFi': 'DeFi',
    'Гейминг': 'Gaming',
    'Gaming': 'Gaming',
    'Инфраструктура': 'Infrastructure',
    'Infra': 'Infrastructure',
    'Infrastructure': 'Infrastructure',
    'L1/L2': 'L1/L2',
    'NFT': 'NFT',
    'НФТ': 'NFT',
    'Social': 'Social',
    'Социальные': 'Social',
    'Other': 'Other',
    'Другое': 'Other',
    
    // Действия
    'Начать': 'Start',
    'Клик': 'Click',
    'Перейти': 'Go to',
    'Подписаться': 'Subscribe',
    'Подписка': 'Subscribe',
    'Зарегистрироваться': 'Register',
    'Выполнить': 'Complete',
    'Проверить': 'Check',
    'Сделать': 'Make',
    'Создать': 'Create',
    'Подключить': 'Connect',
    'Подключение': 'Connect',
    'Тестировать': 'Test',
    'Тест': 'Test',
    'Исследовать': 'Explore',
    'Стейкать': 'Stake',
    'Свап': 'Swap',
    'Минт': 'Mint',
    'Минтить': 'Mint',
    'Клейм': 'Claim',
    'Клеймить': 'Claim',
    'Транзакция': 'Transaction',
    'Вывод': 'Withdraw',
    'Депозит': 'Deposit',
    'Bridge': 'Bridge',
    'Мост': 'Bridge',
    
    // Описание проектов
    'проект': 'project',
    'платформа': 'platform',
    'косистемаэ': 'ecosystem',
    'токен': 'token',
    'криптовалюта': 'cryptocurrency',
    'децентрализованный': 'decentralized',
    'децентрализованная': 'decentralized',
    'блокчейн': 'blockchain',
    'DeFi': 'DeFi',
    'протокол': 'protocol',
    'приложение': 'application',
    ''app': 'app',
    'сайт': 'website',
    'официальный': 'official',
    'официальный сайт': 'official website',
    'работает': 'works',
    'позволяет': 'allows',
    'пользователям': 'users',
    'получить': 'get',
    'награда': 'reward',
    'награды': 'rewards',
    'аирдроп': 'airdrop',
    'токеномика': 'tokenomics',
    ' Roadmap': 'roadmap',
    'дорожная карта': 'roadmap',
    'команда': 'team',
    'инвесторы': 'investors',
    'партнёры': 'partners',
    
    // Общие слова
    'это': 'this is',
    'является': 'is',
    'для': 'for',
    'с': 'with',
    'по': 'by',
    'в': 'in',
    'на': 'on',
    'за': 'for',
    'от': 'from',
    'до': 'to',
    'или': 'or',
    'и': 'and',
    'не': 'not',
    'но': 'but',
    'также': 'also',
    'только': 'only',
    'нужно': 'need',
    'можно': 'can',
    'будет': 'will',
    'есть': 'has',
    'нет': 'no',
    'быть': 'to be',
    'быть будет': 'will be',
    'был': 'was',
    'будет': 'will be',
    'уже': 'already',
    'ещё': 'still',
    'еще': 'still',
    'тоже': 'also',
    'очень': 'very',
    'самый': 'most',
    'более': 'more',
    'менее': 'less',
    'много': 'many',
    'мало': 'few',
    'один': 'one',
    'два': 'two',
    'три': 'three',
    'первый': 'first',
    'второй': 'second',
    'третий': 'third',
    'новый': 'new',
    'новая': 'new',
    'новое': 'new',
    'старый': 'old',
    'большой': 'big',
    'маленький': 'small',
    'лёгкий': 'easy',
    'легкий': 'easy',
    'сложный': 'hard',
    'простой': 'simple',
    'быстрый': 'fast',
    'медленный': 'slow',
    'важный': 'important',
    'интересный': 'interesting',
    'полезный': 'useful',
    'бесплатный': 'free',
    'платный': 'paid',
    
    // Времена
    'сегодня': 'today',
    'завтра': 'tomorrow',
    'вчера': 'yesterday',
    'сейчас': 'now',
    'потом': 'later',
    'скоро': 'soon',
    'всегда': 'always',
    'никогда': 'never',
    'иногда': 'sometimes',
    'часто': 'often',
    'редко': 'rarely',
    
    // Числа и проценты
    '%': '%',
    'процент': 'percent',
    'процентов': 'percent',
    'доллар': 'dollar',
    'долларов': 'dollars',
    'доллара': 'dollars',
    'евро': 'euro',
    'рубль': 'ruble',
    'рублей': 'rubles',
    'ETH': 'ETH',
    'BTC': 'BTC',
    'USDT': 'USDT',
    'USDC': 'USDC',
    
    // Остальное
    'нет описания': 'No description',
    'описание отсутствует': 'No description available',
    'добавлено': 'Added',
    'обновлено': 'Updated',
    'завершено': 'Completed',
    'в работе': 'In progress',
    'в разработке': 'In development',
    'запущен': 'Launched',
    'запущена': 'Launched',
    'тестовая сеть': 'testnet',
    'Mainnet': 'mainnet',
    'тестнет': 'testnet'
};

// === ТЕКУЩИЙ ЯЗЫК ===
window.currentLang = localStorage.getItem('lang') || 'ru';

// === ФУНКЦИЯ ПЕРЕВОДА ИНТЕРФЕЙСА ===
window.t = function(key) {
    if (window.translations[window.currentLang] && window.translations[window.currentLang][key]) {
        return window.translations[window.currentLang][key];
    }
    if (window.translations.ru[key]) {
        return window.translations.ru[key];
    }
    return key;
};

// === АВТОПЕРЕВОД ТЕКСТА ===
window.autoTranslate = async function(text) {
    if (!text || !text.trim()) return '';
    if (window.currentLang === 'en') return text;
    
    const original = text.trim();
    
    // Проверяем словарь
    if (window.translationDict[original]) {
        return window.translationDict[original];
    }
    
    // Проверяем каждое слово в словаре
    let result = original;
    let translated = false;
    
    // Сначала пробуем найти точное совпадение
    const dictKeys = Object.keys(window.translationDict).sort((a, b) => b.length - a.length);
    for (const key of dictKeys) {
        const regex = new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        if (regex.test(result)) {
            result = result.replace(regex, window.translationDict[key]);
            translated = true;
        }
    }
    
    if (translated) {
        return result;
    }
    
    // Если не найдено в словаре - используем Google Translate API (бесплатный)
    try {
        const translatedText = await window.translateWithGoogle(original);
        return translatedText;
    } catch (e) {
        console.log('Auto-translate failed, using original:', original);
        // Фоллбек: возвращаем исходный текст с заглавной первой буквой
        return original.charAt(0).toUpperCase() + original.slice(1);
    }
};

// === ПЕРЕВОД ЧЕРЕЗ GOOGLE TRANSLATE ===
window.translateWithGoogle = async function(text) {
    return new Promise((resolve, reject) => {
        // Пробуем использовать Google Translate API
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data[0]) {
                    const translated = data[0].map(item => item[0]).join('');
                    resolve(translated);
                } else {
                    reject(new Error('No translation data'));
                }
            })
            .catch(err => {
                // Фоллбек: просто капитализируем первую букву
                resolve(text.charAt(0).toUpperCase() + text.slice(1));
            });
    });
};

// === ПЕРЕВОД КАТЕГОРИЙ ===
window.translateCategory = function(category) {
    if (!category) return category;
    
    const catMap = {
        'DeFi': 'DeFi',
        'Гейминг': 'Gaming',
        'Gaming': 'Gaming',
        'Инфраструктура': 'Infrastructure',
        'Infra': 'Infrastructure',
        'Infrastructure': 'Infrastructure',
        'L1/L2': 'L1/L2',
        'NFT': 'NFT',
        'НФТ': 'NFT',
        'Social': 'Social',
        'Социальные': 'Social',
        'Other': 'Другое',
        'Other (En)': 'Other',
        'Другое': 'Other'
    };
    
    return catMap[category] || category;
};

// === ПОЛУЧИТЬ НАЗВАНИЕ ПРОЕКТА ===
window.getProjectName = function(project) {
    if (window.currentLang === 'en') {
        if (project['name.eng'] && project['name.eng'].trim()) {
            return project['name.eng'];
        }
        // Если нет английского имени - пробуем перевести
        if (project.name) {
            window.autoTranslate(project.name).then(translated => {
                // Можно сохранить перевод
            });
            return project.name;
        }
    }
    return project.name || '';
};

// === ПОЛУЧИТЬ ОПИСАНИЕ ПРОЕКТА ===
window.getProjectDescription = function(project) {
    if (window.currentLang === 'en') {
        if (project['description.eng'] && project['description.eng'].trim()) {
            return project['description.eng'];
        }
        // Если нет английского описания - возвращаем русское
        if (project.description) {
            return project.description;
        }
    }
    return project.description || '';
};

// === ПОЛУЧИТЬ КАТЕГОРИИ ПРОЕКТА ===
window.getProjectCategories = function(project) {
    if (window.currentLang === 'en') {
        if (project['categories.eng'] && project['categories.eng'].length > 0) {
            return project['categories.eng'];
        }
    }
    return project.categories || ['Other'];
};

// === ПОЛУЧИТЬ НАЗВАНИЕ АКТИВНОСТИ ===
window.getActivityTitle = function(activity) {
    if (window.currentLang === 'en') {
        if (activity['title.eng'] && activity['title.eng'].trim()) {
            return activity['title.eng'];
        }
    }
    return activity.title || '';
};

// === ПОЛУЧИТЬ ОПИСАНИЕ АКТИВНОСТИ ===
window.getActivityDescription = function(activity) {
    if (window.currentLang === 'en') {
        if (activity['description.eng'] && activity['description.eng'].trim()) {
            return activity['description.eng'];
        }
    }
    return activity.description || '';
};

// === УСТАНОВИТЬ ЯЗЫК ===
window.setLang = function(lang) {
    window.currentLang = lang;
    localStorage.setItem('lang', lang);
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        if (lang === 'en') {
            langBtn.innerHTML = '<span class="text-lg">🇷🇺</span> <span class="text-sm font-bold">RU</span>';
        } else {
            langBtn.innerHTML = '<span class="text-lg">🇬🇧</span> <span class="text-sm font-bold">ENG</span>';
        }
    }
    
    window.updatePageTranslations();
    
    // Перерисовываем контент
    if (typeof applyFilters === 'function') {
        applyFilters();
    }
    if (typeof openDetail === 'function' && window.currentDetailId) {
        openDetail(window.currentDetailId);
    }
};

// === ПЕРЕКЛЮЧИТЬ ЯЗЫК ===
window.toggleLang = function() {
    const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
    window.setLang(newLang);
};

// === ОБНОВИТЬ ПЕРЕВОДЫ НА СТРАНИЦЕ ===
window.updatePageTranslations = function() {
    // Элементы с data-translate
    document.querySelectorAll('[data-translate]').forEach(function(el) {
        const key = el.getAttribute('data-translate');
        if (key) el.textContent = window.t(key);
    });
    
    // Placeholder для поиска
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = window.t('search_placeholder');
    
    // Боковое меню (фильтры)
    document.querySelectorAll('.sidebar-link').forEach(function(btn) {
        const filter = btn.dataset.filter;
        const span = btn.querySelector('span');
        if (!span) return;
        
        const icons = {
            'all': '<i class="fas fa-layer-group mr-2 w-5"></i>',
            'unvisited': '<i class="fas fa-eye-slash mr-2 w-5 text-red-400"></i>',
            'today': '<i class="fas fa-calendar-day mr-2 w-5 text-pink-400"></i>',
            'active': '<i class="fas fa-play mr-2 w-5 text-emerald-400"></i>',
            'daily': '<i class="fas fa-fire mr-2 w-5 text-orange-400"></i>',
            'favorites': '<i class="fas fa-heart mr-2 w-5 text-red-400"></i>',
            'completed': '<i class="fas fa-check-double mr-2 w-5 text-emerald-400"></i>',
            'ended': '<i class="fas fa-check-circle mr-2 w-5 text-slate-500"></i>'
        };
        
        const labels = {
            'all': window.t('all_projects'),
            'unvisited': window.t('unvisited'),
            'today': window.t('today'),
            'active': window.t('active_filter'),
            'daily': window.t('daily'),
            'favorites': window.t('favorites'),
            'completed': window.t('completed'),
            'ended': window.t('archive')
        };
        
        if (icons[filter] && labels[filter]) {
            span.innerHTML = icons[filter] + labels[filter];
        }
    });
    
    // Mode indicator
    const modeIndicator = document.getElementById('modeIndicator');
    if (modeIndicator) {
        let isAdmin = false;
        try { isAdmin = window.isAdminMode === true; } catch(e) {}
        modeIndicator.textContent = window.t(isAdmin ? 'edit_mode' : 'experimental_zone');
    }
    
    // Hero секция
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        heroTitle.innerHTML = '<span class="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">' + window.t('hero_title') + '</span>';
    }
    
    const heroSubtitle = document.querySelector('.hero-section .hero-content > p');
    if (heroSubtitle) heroSubtitle.textContent = window.t('hero_subtitle');
    
    const heroBtn = document.querySelector('.hero-section .hero-content a span');
    if (heroBtn) heroBtn.textContent = window.t('start_research');
    
    // Кнопка сворачивания
    const heroCollapseText = document.getElementById('heroCollapseText');
    if (heroCollapseText) {
        let isCollapsed = false;
        try { isCollapsed = window.isHeroCollapsed === true; } catch(e) {}
        heroCollapseText.textContent = isCollapsed ? window.t('expand_welcome') : window.t('collapse_welcome');
    }
    
    // Info сообщение
    const publicInfo = document.getElementById('publicInfo');
    if (publicInfo) {
        publicInfo.innerHTML = '<i class="fas fa-info-circle"></i><span>' + window.t('info_click_project') + '</span>';
    }
    
    // Guest warning
    const guestWarning = document.getElementById('guestWarning');
    if (guestWarning) {
        guestWarning.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + window.t('guest_warning') + '</span>';
    }
    
    // Сортировка
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const options = sortSelect.querySelectorAll('option');
        if (options[0]) options[0].textContent = window.t('newest_first');
        if (options[1]) options[1].textContent = window.t('by_priority');
        if (options[2]) options[2].textContent = window.t('by_name');
    }
    
    // Пагинация - пустое состояние
    const emptyStateTitle = document.querySelector('#emptyState h3');
    if (emptyStateTitle) emptyStateTitle.textContent = window.t('nothing_found');
    
    const resetBtn = document.querySelector('#emptyState button');
    if (resetBtn) resetBtn.textContent = window.t('reset_filters');
    
    // Категории
    const selectedCatsTags = document.getElementById('selectedCategoriesTags');
    if (selectedCatsTags) {
        let hasCategories = false;
        try { hasCategories = window.currentFilters && window.currentFilters.categories && window.currentFilters.categories.length > 0; } catch(e) {}
        if (!hasCategories) {
            selectedCatsTags.innerHTML = '<span class="text-xs text-slate-500 italic">' + window.t('all') + '</span>';
        }
    }
};

// === TOAST УВЕДОМЛЕНИЕ ===
window.showToast = function(msg) { 
    const translated = window.t(msg);
    const t = document.getElementById('toast'); 
    if (t) {
        const msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = translated; 
        t.classList.remove('translate-y-20', 'opacity-0'); 
        setTimeout(function() { t.classList.add('translate-y-20', 'opacity-0'); }, 3000); 
    }
};

// === ИНИЦИАЛИЗАЦИЯ ЯЗЫКА ПРИ ЗАГРУЗКЕ ===
window.initLanguage = function() {
    window.setLang(window.currentLang);
};
