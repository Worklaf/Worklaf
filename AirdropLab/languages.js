// language.js - система перевода интерфейса
const translations = {
  ru: {
    loading: 'ЗАГРУЗКА ЛАБОРАТОРИИ...',
    experimental_zone: 'Экспериментальная зона',
    admin_mode: 'Режим редактирования',
    active: 'Активных',
    new: 'Новых',
    in_work: 'В работе',
    done: 'Готово',
    new_test: 'Новый тест',
    admin: 'Admin',
    login: 'Вход',
    login_btn: 'Войти',
    in_system: 'В системе',
    filters: 'Фильтры',
    all_projects: 'Все проекты',
    unvisited: 'Не посещённые',
    today: 'Сегодня',
    yesterday: 'Вчера',
    active_filter: 'Активные',
    daily_filter: 'Ежедневные',
    favorites: 'Избранное',
    completed: 'Завершённые',
    archive: 'Архив',
    categories: 'Категории',
    all: 'Все',
    all_categories: 'Все категории',
    search_placeholder: 'Поиск проектов...',
    per_page: 'На странице:',
    newest_first: 'Сначала новые',
    by_priority: 'По приоритету',
    by_name: 'По названию',
    info_click_project: 'Нажмите на название проекта для подробной информации или на "Гайд" для выполнения.',
    guest_warning: 'Вы не вошли в аккаунт. Избранное и выполненные задания сохраняются только в этом браузере.',
    loading_projects: 'Загрузка проектов...',
    nothing_found: 'Ничего не найдено',
    reset_filters: 'Сбросить фильтры',
    active_research: 'Активные исследования',
    go_to_guide: 'Перейти к гайду',
    guide: 'Гайд',
    website: 'Website',
    status_active: 'Active',
    status_soon: 'Soon',
    status_ended: 'Ended',
    daily: 'Daily',
    high_priority: 'High',
    completed_badge: 'Готово',
    last_click_today: 'сегодня',
    last_click_yesterday: 'вчера',
    about_project: 'О проекте',
    activities: 'Активности',
    activities_not_added: 'Активности не добавлены.',
    added: 'Добавлено:',
    start: 'Начать',
    click: 'Клик',
    end: 'Завершить',
    resume: 'Возобновить',
    new_activity: 'NEW',
    ended_activity: 'Ended',
    add_project: 'Добавить проект',
    edit_project: 'Редактировать проект',
    project_name: 'Название проекта *',
    project_categories: 'Категории проекта',
    new_category_placeholder: 'Новая категория...',
    logo_url: 'URL Логотипа',
    guide_url: 'Ссылка на гайд',
    cryptorank_url: 'Ссылка на CryptoRank',
    twitter_url: 'Twitter проекта',
    referral_link: 'Реферальная ссылка',
    short_desc: 'Краткое описание',
    status: 'Статус',
    last_updated: 'Дата обновления',
    has_daily_quests: 'Есть ежедневные квесты',
    high_priority: 'High Priority',
    project_activities: 'Активности проекта',
    add_activity: 'Добавить активность',
    no_activities: 'Активности еще не добавлены.',
    activity_name: 'Название активности *',
    activity_date: 'Дата активности (начало)',
    activity_end_date: 'Дата окончания (автозавершение)',
    detailed_desc: 'Подробное описание',
    instructions_placeholder: 'Инструкция по выполнению...',
    save: 'Сохранить',
    delete: 'Удалить',
    login_title: 'Вход',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'ИЛИ EMAIL',
    email: 'Email',
    password: 'Пароль',
    register: 'Регистрация',
    feedback: 'Отзыв',
    my_messages: 'Мои сообщения',
    all_requests: 'Все обращения',
    suggestion: '💡 Предложение',
    bug: '🐛 Ошибка',
    question: '❓ Вопрос',
    other: '💬 Другое',
    message_placeholder: 'Опишите суть обращения...',
    send: 'Отправить',
    close: 'Закрыть',
    no_messages: 'Нет сообщений',
    your_answer: 'Ваш ответ',
    reply_placeholder: 'Напишите ответ...',
    chat_support: 'Чат с поддержкой',
    chat_user: 'Чат с пользователем',
    notifications: 'Уведомления',
    no_notifications: 'Нет уведомлений',
    mark_read: 'Отметить',
    view_stats: 'Посмотреть статистику',
    upload_firebase: 'Загрузить данные в базу',
    export_json: 'Экспортировать все данные',
    view_deleted: 'Просмотреть удаленные',
    deleted_projects: 'Удаленные проекты',
    restore: 'Восстановить',
    delete_permanent: 'Удалить навсегда',
    task_completed: 'Задача завершена!',
    task_uncompleted: 'Отмечено как незавершённое',
    added_favorites: 'Добавлено!',
    removed_favorites: 'Удалено',
    login_required: 'Войдите',
    link_not_found: 'Ссылка не найдена',
    saved: 'Сохранено!',
    deleted: 'Удалено',
    restored: 'Восстановлен!',
    error_occurred: 'Ошибка',
    exported: 'Экспортировано',
    uploaded: 'Загружено',
    enter_message: 'Введите сообщение',
    enter_name: 'Введите название',
    confirm_delete: 'Переместить в архив?',
    confirm_restore: 'Восстановить проект?',
    enter_link: 'Вставьте ссылку',
    no_access: 'Нет доступа',
    only_admin: 'Только для админа',
    hero_title: 'Лаборатория Крипто-Возможностей',
    hero_subtitle: 'AirdropLab - это ваш центр для исследования, тестирования и участия в самых перспективных аирдропах.',
    start_research: 'Начать исследование',
    collapse_hero: 'Свернуть приветствие',
    expand_hero: 'Развернуть приветствие',
    yes: 'Да',
    no: 'Нет',
    ok: 'ОК',
    back: 'Назад',
    preview: 'Просмотр',
    view: 'Посмотреть',
    edit: 'Редактировать',
    copied: 'Скопировано!',
    no_description: 'Нет описания',
    leave_feedback: 'Оставить отзыв',
    last_activity_date: 'Дата последней активности',
    mark_complete: 'Отметить',
    add_favorites: 'Избранное',
    deleted_count: 'Удаленных',
    // Новые переводы для feedback
    chat_with_user: 'Чат с пользователем',
    chat_with_support: 'Чат с поддержкой',
    feedbacks_list: 'Отзывы и предложения',
    loading_chat: 'Загрузка переписки...',
    loading_feedbacks: 'Загрузка отзывов...',
    topic: 'Тема обращения',
    message: 'Сообщение',
    start_new_feedback: 'Начните новое обращение',
    confirm_delete_chat: 'Удалить переписку?',
    delete_feedback: 'Удалить',
    you: 'Вы',
    support: 'Поддержка',
    user: 'Пользователь',
    all_feedbacks: 'Все обращения',
    no_deleted_projects: 'Нет удаленных проектов',
    new_category: 'Новая категория...',
    project: 'Проект',
        // Поддержка
    support_title: 'Служба поддержки',
    my_support_requests: 'Мои обращения',
    all_support_requests: 'Все обращения в поддержку',
    no_support_requests: 'Нет обращений в поддержку',
    start_support_request: 'Опишите вашу проблему — мы ответим в течение 24 часов',
    support_message_placeholder: 'Опишите вашу проблему подробно...',
    cat_technical: 'Техническая проблема',
    cat_account: 'Проблема с аккаунтом',
        // ============ FOOTER TRANSLATIONS ============
    // Brand
    footer_tagline: 'Лаборатория крипто-возможностей',
    footer_tagline_desc: 'Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.',
    footer_live: 'Live',
    footer_updated: 'Обновлено',
    
    // Quick Links
    footer_quick_links: 'Быстрые ссылки',
    footer_home: 'Главная',
    footer_projects: 'Проекты',
    footer_guides: 'Гайды',
    footer_support: 'Поддержка',
    
    // Account section
    footer_account_title: 'Личный кабинет',
    footer_my_account: 'Мой аккаунт',
    footer_faq: 'FAQ',
    footer_language: 'Язык',
    footer_active_users: 'активных',
    footer_projects_count: 'проектов',
    
    // Legal
    footer_legal_title: 'Юридическая информация',
    footer_documents: 'Документы',
    footer_terms: 'Условия использования',
    footer_privacy: 'Политика конфиденциальности',
    footer_cookies: 'Политика cookies',
    footer_disclaimer: 'Отказ от ответственности',
    footer_contacts: 'Контакты',
    footer_worldwide: 'Worldwide (Remote)',
    
    // Newsletter
    footer_newsletter_title: 'Подписаться на обновления',
    footer_newsletter_desc: 'Получайте уведомления о новых аирдропах и тестнетах',
    footer_email_placeholder: 'Ваш email',
    footer_subscribe_btn: 'Подписаться',
    footer_privacy_note: 'Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.',
    footer_already_subscribed: 'Уже подписаны ✓',
    footer_thanks: 'Спасибо! ✓',
    footer_subscribed_toast: 'Подписка оформлена!',
    footer_already_toast: 'Этот email уже подписан!',
    footer_error_toast: 'Ошибка. Попробуйте позже.',
    footer_invalid_email: 'Введите корректный email',
    footer_sending: 'Отправка...',
    
    // Bottom bar
    footer_rights: 'Все права защищены.',
    footer_made_with: 'Сделано с',
    footer_love: 'любовью к крипте',
    footer_back_to_top: 'Наверх',
    
    // Mobile bottom links
    footer_mobile_terms: 'Условия',
    footer_mobile_privacy: 'Приватность',
    
    // Newsletter success modal
    newsletter_success_title: 'Подписка оформлена!',
    newsletter_success_desc: 'Вы будете получать уведомления о новых аирдропах и важных обновлениях.',
    
    // Support modal
    footer_support_title: 'Служба поддержки',
    footer_support_subtitle: 'Мы ответим на ваш вопрос в течение 24 часов',
    footer_support_category: 'Тема обращения *',
    footer_support_select: 'Выберите категорию',
    footer_support_technical: '🔧 Техническая проблема',
    footer_support_account: '👤 Проблема с аккаунтом',
    footer_support_project: '📋 Вопрос о проекте',
    footer_support_suggestion: '💡 Предложение',
    footer_support_partnership: '🤝 Партнёрство',
    footer_support_other: '💬 Другое',
    footer_support_name: 'Ваше имя',
    footer_support_email: 'Email *',
    footer_support_subject: 'Заголовок *',
    footer_support_subject_placeholder: 'Краткое описание проблемы',
    footer_support_message: 'Подробное описание *',
    footer_support_message_placeholder: 'Опишите вашу проблему подробно...',
    footer_support_submit: 'Отправить обращение',
    footer_support_sent: 'Обращение отправлено! Ответим в течение 24 часов.',
    footer_support_login: 'Войдите в аккаунт!',
    footer_support_error: 'Ошибка отправки',
    footer_support_sending: 'Отправка...',
    
    // FAQ modal
    footer_faq_title: 'Часто задаваемые вопросы',
    footer_faq_subtitle: 'Ответы на популярные вопросы о AirdropLab',
    footer_faq_not_found: 'Не нашли ответ?',
    footer_faq_contact: 'Свяжитесь с нашей службой поддержки',
    footer_faq_write: 'Написать в поддержку',
    
    // FAQ questions & answers
    faq_q1: 'Как начать участвовать в аирдропах?',
    faq_a1: 'Зарегистрируйтесь на AirdropLab, выберите интересующий проект из списка и следуйте инструкциям в гайде. Выполняйте задания и следите за обновлениями.',
    faq_q2: 'Что такое тестнет и зачем в нем участвовать?',
    faq_a2: 'Тестнет - это тестовая сеть блокчейна до его запуска в основной сети. Участие в тестнетах позволяет получить токены проекта бесплатно, которые могут стать ценными при запуске mainnet.',
    faq_q3: 'Как не попасть на скам-проект?',
    faq_a3: 'Мы проверяем все проекты перед добавлением, но всегда проводите собственное исследование. Не вводите приватные ключи, не отправляйте ETH на неизвестные адреса и не доверяйте проектам без аудита безопасности.',
    faq_q4: 'Почему проект не отображается в списке?',
    faq_a4: 'Проект может быть в архиве (завершен), находиться на модерации или быть удален. Также убедитесь, что вы используете правильные фильтры в боковой панели.',
    faq_q5: 'Как получить помощь по проекту?',
    faq_a5: 'Используйте раздел "Поддержка" в футере или оставьте отзыв на странице конкретного проекта. Наша команда отвечает в течение 24 часов.',
    faq_q6: 'Можно ли добавить свой проект?',
    faq_a6: 'Да, вы можете предложить проект через форму обратной связи или написав в Telegram. Мы рассмотрим все предложения.',
    
    // Guides modal
    footer_guides_title: 'Гайды',
    footer_guides_subtitle: 'Пошаговые инструкции по участию в тестнетах',
    footer_guide_active: 'Активен',
    footer_guide_go: 'Перейти к гайду',
    footer_guide_lock: 'Для доступа к гайдам необходимо выполнить задания на главной странице',
    
    // Account modal
    footer_account_manage: 'Управление профилем и настройками',
    footer_account_not_logged: 'Вход не выполнен',
    footer_account_login_desc: 'Войдите в аккаунт для управления профилем',
    footer_account_firstname: 'Имя',
    footer_account_lastname: 'Фамилия',
    footer_account_username: 'Никнейм',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Дата рождения',
    footer_account_gender: 'Пол',
    footer_account_male: 'Мужской',
    footer_account_female: 'Женский',
    footer_account_other_gender: 'Другое',
    footer_account_country: 'Страна',
    footer_account_bio: 'О себе',
    footer_account_bio_placeholder: 'Расскажите о себе...',
    footer_account_cancel: 'Отмена',
    footer_account_save: 'Сохранить',
    footer_account_saved: 'Профиль сохранён!',
    footer_account_saved_local: 'Профиль сохранён локально',
    footer_account_photo: 'Фото обновлено!',
    
    // Legal modals
    footer_legal_updated: 'Обновлено:',
    footer_legal_close: 'Закрыть',
    
    // Legal titles
    legal_terms_title: 'Условия использования',
    legal_privacy_title: 'Политика конфиденциальности',
    legal_cookie_title: 'Политика использования Cookies',
    legal_disclaimer_title: 'Отказ от ответственности',
    legal_updated_date: '07 марта 2026',
    // Guides data
guide_arc_desc: 'Тестнет от Circle — создателей USDC',
guide_tempo_desc: 'L2 решение от MetaStreet',
guide_robinhood_desc: 'Тестнет от Robinhood — известного брокера',
guide_difficulty_easy: 'Легко',
guide_difficulty_medium: 'Средне',
guide_difficulty_hard: 'Сложно',

// Account modal - country select
account_select_country: 'Выберите страну или введите...',
account_country_other_input: 'Введите название страны'
  },
  
  en: {
    loading: 'LOADING LABORATORY...',
    experimental_zone: 'Experimental Zone',
    admin_mode: 'Admin Mode',
    active: 'Active',
    new: 'New',
    in_work: 'In Progress',
    done: 'Done',
    new_test: 'New Test',
    admin: 'Admin',
    login: 'Login',
    login_btn: 'Login',
    in_system: 'Online',
    filters: 'Filters',
    all_projects: 'All Projects',
    unvisited: 'Unvisited',
    today: 'Today',
    yesterday: 'Yesterday',
    active_filter: 'Active',
    daily_filter: 'Daily',
    favorites: 'Favorites',
    completed: 'Completed',
    archive: 'Archive',
    all_categories: 'All categories',
    categories: 'Categories',
    all: 'All',
    search_placeholder: 'Search projects...',
    per_page: 'Per page:',
    newest_first: 'Newest first',
    by_priority: 'By priority',
    by_name: 'By name',
    info_click_project: 'Click on the project name for details or "Guide" to start.',
    guest_warning: 'You are not logged in. Favorites and completed tasks are saved only in this browser.',
    loading_projects: 'Loading projects...',
    nothing_found: 'Nothing found',
    reset_filters: 'Reset filters',
    active_research: 'Active Research',
    go_to_guide: 'Go to Guide',
    guide: 'Guide',
    website: 'Website',
    status_active: 'Active',
    status_soon: 'Soon',
    status_ended: 'Ended',
    daily: 'Daily',
    high_priority: 'High',
    completed_badge: 'Done',
    last_click_today: 'today',
    last_click_yesterday: 'yesterday',
    about_project: 'About',
    activities: 'Activities',
    activities_not_added: 'No activities added.',
    added: 'Added:',
    start: 'Start',
    click: 'Click',
    end: 'End',
    resume: 'Resume',
    new_activity: 'NEW',
    ended_activity: 'ENDED',
    add_project: 'Add Project',
    edit_project: 'Edit Project',
    project_name: 'Project Name *',
    project_categories: 'Project Categories',
    new_category_placeholder: 'New category...',
    logo_url: 'Logo URL',
    guide_url: 'Guide Link',
    cryptorank_url: 'CryptoRank Link',
    twitter_url: 'Project Twitter',
    referral_link: 'Referral Link',
    short_desc: 'Short Description',
    status: 'Status',
    last_updated: 'Update Date',
    has_daily_quests: 'Has daily quests',
    high_priority: 'High Priority',
    project_activities: 'Project Activities',
    add_activity: 'Add Activity',
    no_activities: 'No activities added yet.',
    activity_name: 'Activity Name *',
    activity_date: 'Activity Date (start)',
    activity_end_date: 'End Date (auto-complete)',
    detailed_desc: 'Detailed Description',
    instructions_placeholder: 'Instructions...',
    save: 'Save',
    delete: 'Delete',
    login_title: 'Login',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'OR EMAIL',
    email: 'Email',
    password: 'Password',
    register: 'Register',
    feedback: 'Feedback',
    my_messages: 'My Messages',
    all_requests: 'All Requests',
    suggestion: '💡 Suggestion',
    bug: '🐛 Bug',
    question: '❓ Question',
    other: '💬 Other',
    message_placeholder: 'Describe your issue...',
    send: 'Send',
    close: 'Close',
    no_messages: 'No messages',
    your_answer: 'Your Answer',
    reply_placeholder: 'Write a reply...',
    chat_support: 'Support Chat',
    chat_user: 'User Chat',
    notifications: 'Notifications',
    no_notifications: 'No notifications',
    mark_read: 'Mark as read',
    view_stats: 'View Statistics',
    upload_firebase: 'Upload to Database',
    export_json: 'Export All Data',
    view_deleted: 'View Deleted',
    deleted_projects: 'Deleted Projects',
    restore: 'Restore',
    delete_permanent: 'Delete Forever',
    task_completed: 'Task completed!',
    task_uncompleted: 'Marked as incomplete',
    added_favorites: 'Added!',
    removed_favorites: 'Removed',
    login_required: 'Please login',
    link_not_found: 'Link not found',
    saved: 'Saved!',
    deleted: 'Deleted',
    restored: 'Restored!',
    error_occurred: 'Error',
    exported: 'Exported',
    uploaded: 'Uploaded',
    enter_message: 'Enter message',
    enter_name: 'Enter name',
    confirm_delete: 'Move to archive?',
    confirm_restore: 'Restore project?',
    enter_link: 'Insert link',
    no_access: 'No access',
    only_admin: 'Admin only',
    hero_title: 'Crypto Opportunities Laboratory',
    hero_subtitle: 'AirdropLab is your hub for researching, testing, and participating in the most promising airdrops.',
    start_research: 'Start Research',
    collapse_hero: 'Collapse Welcome',
    expand_hero: 'Expand Welcome',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    back: 'Back',
    preview: 'Preview',
    view: 'View',
    edit: 'Edit',
    copied: 'Copied!',
    no_description: 'No description',
    leave_feedback: 'Leave feedback',
    last_activity_date: 'Last activity date',
    mark_complete: 'Mark complete',
    add_favorites: 'Add to favorites',
    deleted_count: 'Deleted',
    // Новые переводы для feedback
    chat_with_user: 'Chat with User',
    chat_with_support: 'Support Chat',
    feedbacks_list: 'Feedback & Suggestions',
    loading_chat: 'Loading chat...',
    loading_feedbacks: 'Loading feedbacks...',
    topic: 'Topic',
    message: 'Message',
    start_new_feedback: 'Start new conversation',
    confirm_delete_chat: 'Delete chat?',
    delete_feedback: 'Delete',
    you: 'You',
    support: 'Support',
    user: 'User',
    all_feedbacks: 'All Requests',
    no_deleted_projects: 'No deleted projects',
    new_category: 'New category...',
    project: 'Project',
        // Support
    support_title: 'Support Center',
    my_support_requests: 'My Requests',
    all_support_requests: 'All Support Requests',
    no_support_requests: 'No support requests',
    start_support_request: 'Describe your issue — we will respond within 24 hours',
    support_message_placeholder: 'Describe your issue in detail...',
    cat_technical: 'Technical Issue',
    cat_account: 'Account Problem',
        // ============ FOOTER TRANSLATIONS ============
    // Brand
    footer_tagline: 'Crypto Opportunities Laboratory',
    footer_tagline_desc: 'We research, test and help participate in the most promising airdrops and testnets.',
    footer_live: 'Live',
    footer_updated: 'Updated',
    
    // Quick Links
    footer_quick_links: 'Quick Links',
    footer_home: 'Home',
    footer_projects: 'Projects',
    footer_guides: 'Guides',
    footer_support: 'Support',
    
    // Account section
    footer_account_title: 'My Account',
    footer_my_account: 'My Account',
    footer_faq: 'FAQ',
    footer_language: 'Language',
    footer_active_users: 'active',
    footer_projects_count: 'projects',
    
    // Legal
    footer_legal_title: 'Legal Information',
    footer_documents: 'Documents',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',
    footer_cookies: 'Cookie Policy',
    footer_disclaimer: 'Disclaimer',
    footer_contacts: 'Contacts',
    footer_worldwide: 'Worldwide (Remote)',
    
    // Newsletter
    footer_newsletter_title: 'Subscribe to Updates',
    footer_newsletter_desc: 'Get notified about new airdrops and testnets',
    footer_email_placeholder: 'Your email',
    footer_subscribe_btn: 'Subscribe',
    footer_privacy_note: 'We respect your privacy. Unsubscribe at any time.',
    footer_already_subscribed: 'Already subscribed ✓',
    footer_thanks: 'Thank you! ✓',
    footer_subscribed_toast: 'Subscribed successfully!',
    footer_already_toast: 'This email is already subscribed!',
    footer_error_toast: 'Error. Please try again.',
    footer_invalid_email: 'Please enter a valid email',
    footer_sending: 'Sending...',
    
    // Bottom bar
    footer_rights: 'All rights reserved.',
    footer_made_with: 'Made with',
    footer_love: 'love for crypto',
    footer_back_to_top: 'Back to top',
    
    // Mobile bottom links
    footer_mobile_terms: 'Terms',
    footer_mobile_privacy: 'Privacy',
    
    // Newsletter success modal
    newsletter_success_title: 'Subscribed!',
    newsletter_success_desc: 'You will receive notifications about new airdrops and important updates.',
    
    // Support modal
    footer_support_title: 'Support Center',
    footer_support_subtitle: 'We will answer your question within 24 hours',
    footer_support_category: 'Subject *',
    footer_support_select: 'Select category',
    footer_support_technical: '🔧 Technical Issue',
    footer_support_account: '👤 Account Problem',
    footer_support_project: '📋 Project Question',
    footer_support_suggestion: '💡 Suggestion',
    footer_support_partnership: '🤝 Partnership',
    footer_support_other: '💬 Other',
    footer_support_name: 'Your Name',
    footer_support_email: 'Email *',
    footer_support_subject: 'Subject *',
    footer_support_subject_placeholder: 'Brief description of the issue',
    footer_support_message: 'Detailed Description *',
    footer_support_message_placeholder: 'Describe your issue in detail...',
    footer_support_submit: 'Submit Request',
    footer_support_sent: 'Request submitted! We will respond within 24 hours.',
    footer_support_login: 'Please log in!',
    footer_support_error: 'Submission error',
    footer_support_sending: 'Sending...',
    
    // FAQ modal
    footer_faq_title: 'Frequently Asked Questions',
    footer_faq_subtitle: 'Answers to popular questions about AirdropLab',
    footer_faq_not_found: "Didn't find an answer?",
    footer_faq_contact: 'Contact our support team',
    footer_faq_write: 'Write to Support',
    
    // FAQ questions & answers
    faq_q1: 'How to start participating in airdrops?',
    faq_a1: 'Register on AirdropLab, select a project from the list and follow the guide instructions. Complete tasks and track updates.',
    faq_q2: 'What is a testnet and why participate?',
    faq_a2: 'A testnet is a test blockchain network before its mainnet launch. Participating in testnets allows you to earn project tokens for free, which may become valuable at mainnet launch.',
    faq_q3: 'How to avoid scam projects?',
    faq_a3: 'We verify all projects before adding them, but always do your own research. Never enter private keys, never send ETH to unknown addresses, and never trust projects without a security audit.',
    faq_q4: 'Why is a project not showing in the list?',
    faq_a4: 'The project may be archived (completed), under moderation, or deleted. Also make sure you are using the correct filters in the sidebar.',
    faq_q5: 'How to get help with a project?',
    faq_a5: 'Use the "Support" section in the footer or leave feedback on the specific project page. Our team responds within 24 hours.',
    faq_q6: 'Can I add my own project?',
    faq_a6: 'Yes, you can suggest a project through the feedback form or by writing to Telegram. We will review all suggestions.',
    
    // Guides modal
    footer_guides_title: 'Guides',
    footer_guides_subtitle: 'Step-by-step instructions for participating in testnets',
    footer_guide_active: 'Active',
    footer_guide_go: 'Go to Guide',
    footer_guide_lock: 'Complete tasks on the main page to access guides',
    
    // Account modal
    footer_account_manage: 'Manage profile and settings',
    footer_account_not_logged: 'Not Logged In',
    footer_account_login_desc: 'Log in to manage your profile',
    footer_account_firstname: 'First Name',
    footer_account_lastname: 'Last Name',
    footer_account_username: 'Username',
    footer_account_telegram: 'Telegram',
    footer_account_birthdate: 'Date of Birth',
    footer_account_gender: 'Gender',
    footer_account_male: 'Male',
    footer_account_female: 'Female',
    footer_account_other_gender: 'Other',
    footer_account_country: 'Country',
    footer_account_bio: 'About Me',
    footer_account_bio_placeholder: 'Tell us about yourself...',
    footer_account_cancel: 'Cancel',
    footer_account_save: 'Save',
    footer_account_saved: 'Profile saved!',
    footer_account_saved_local: 'Profile saved locally',
    footer_account_photo: 'Photo updated!',
    
    // Legal modals
    footer_legal_updated: 'Updated:',
    footer_legal_close: 'Close',
    
    // Legal titles
    legal_terms_title: 'Terms of Service',
    legal_privacy_title: 'Privacy Policy',
    legal_cookie_title: 'Cookie Policy',
    legal_disclaimer_title: 'Disclaimer',
    legal_updated_date: 'March 07, 2026',
    // Guides data
guide_arc_desc: 'Testnet by Circle — creators of USDC',
guide_tempo_desc: 'L2 solution by MetaStreet',
guide_robinhood_desc: 'Testnet by Robinhood — well-known broker',
guide_difficulty_easy: 'Easy',
guide_difficulty_medium: 'Medium',
guide_difficulty_hard: 'Hard',

// Account modal - country select
account_select_country: 'Select or type country...',
account_country_other_input: 'Enter country name'
  }
};

// Текущий язык
let currentLang = localStorage.getItem('airdropLabLang') || 'ru';

// Функция перевода
function t(key) {
  return translations[currentLang]?.[key] || translations['ru'][key] || key;
}

// Установить язык
function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('airdropLabLang', lang);
    updateAllTranslations();
    
    if (lang === 'en') {
      loadEnglishProjects();
    }
    
    updateLanguageButton();
    
    // Обновляем глобальную переменную
    window.currentLang = currentLang;

    // Обновляем переводы модального окна обратной связи
    updateFeedbackModalTranslations();

    return true;
  }
  return false;
}


// Загрузка английских проектов
async function loadEnglishProjects() {
  console.log('Loading English projects...');
  try {
    const response = await fetch('./data/english_projects.json');
    if (response.ok) {
      const data = await response.json();
      if (data.projects && window.setEnglishProjectsData) {
        window.setEnglishProjectsData(data.projects);
      }
    } else {
      console.log('English projects file not found');
    }
  } catch (e) {
    console.log('Error loading English projects:', e);
  }
}

// Обновление всех переводов на странице
function updateAllTranslations() {
  // Переводы для элементов с data-translate
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const translated = t(key);
    if (translated && translated !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else if (el.tagName === 'OPTION') {
        el.textContent = translated;
      } else {
        el.innerHTML = translated;
      }
    }
  });
  // Обновление "Проект:" в модальном окне feedback
const projectLabel = document.getElementById('feedbackProjectLabel');
if (projectLabel) {
  projectLabel.textContent = t('project') + ': ';
}
  // Переводы для title атрибутов
  document.querySelectorAll('[data-translate-title]').forEach(el => {
    const key = el.getAttribute('data-translate-title');
    const translated = t(key);
    if (translated && translated !== key) el.setAttribute('title', translated);
  });
  
  updateLanguageButton();
  
  // Перерисовываем проекты с новыми переводами
  if (typeof window.applyFilters === 'function') {
    window.applyFilters();
  }
  // Обновляем переводы футера
if (typeof window.updateFooterTranslations === 'function') {
    window.updateFooterTranslations();
}
  // Обновляем динамические модальные окна
  updateFeedbackModalTranslations();
}

// Обновление переводов в модальных окнах feedback
function updateFeedbackModalTranslations() {
  // Обновляем форму нового обращения
  const feedbackTextPlaceholder = document.getElementById('feedbackText');
  if (feedbackTextPlaceholder) {
    feedbackTextPlaceholder.placeholder = t('message_placeholder');
  }
  
  const replyInput = document.getElementById('feedbackUserReplyText');
  if (replyInput) {
    replyInput.placeholder = t('reply_placeholder');
  }
}

// Обновляем отображение кнопки языка
function updateLanguageButton() {
  const langBtn = document.getElementById('langBtn');
  if (!langBtn) return;
  
  // Британский флаг - более реалистичный SVG
  const ukFlagSVG = `
    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" width="36" height="18" style="border-radius:2px;">
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
    </svg>
  `;
  
  const flagSpan = langBtn.querySelector('.lang-flag');
  const textSpan = langBtn.querySelector('.lang-text');
  
  if (flagSpan) {
    flagSpan.innerHTML = ukFlagSVG;
  }
  
  // Текст ON/OFF
  if (textSpan) {
    textSpan.textContent = currentLang === 'en' ? 'ON' : 'OFF';
  }
  
  // Цветовой индикатор
  if (currentLang === 'en') {
    langBtn.classList.add('lang-active');
  } else {
    langBtn.classList.remove('lang-active');
  }
}

// Переключение языка
window.toggleLang = function() {
  if (currentLang === 'ru') {
    setLanguage('en');
  } else {
    setLanguage('ru');
    if (window.resetToDefaultDataSource) {
      window.resetToDefaultDataSource();
    }
  }
};

// Функция для установки английских данных проектов
window.setEnglishProjectsData = function(englishProjects) {
  if (englishProjects && Array.isArray(englishProjects)) {
    window.englishProjectsData = englishProjects;
    console.log('English data saved:', englishProjects.length, 'projects');
  }
};

// Функция для сброса на источник по умолчанию
window.resetToDefaultDataSource = function() {
  if (window.resetToDefaultDataSourceInternal) {
    window.resetToDefaultDataSourceInternal();
  }
};

// Функция для перевода (доступна глобально)
window.t = t;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  updateLanguageButton();
  
  if (currentLang === 'en') {
    loadEnglishProjects();
  }
});

// Экспорт глобальных переменных
window.currentLang = currentLang;
window.translations = translations;


