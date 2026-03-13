// language.js - система перевода интерфейса
const translations = {
  ru: {
    // ============ ОСНОВНОЙ ИНТЕРФЕЙС ============
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
    by_added_date:    '📅 По дате добавления',
    by_activity_date: '🔄 По дате активности',
    date_day:   'День',
    date_month: 'Мес.',
    date_year:  'Год',
    by_priority: '⭐ По приоритету',
    by_name: '🔤 По названию',
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

    // ============ ADMIN / PROJECT FORM ============
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

    // ============ AUTH ============
    login_title: 'Вход',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'ИЛИ EMAIL',
    email: 'Email',
    password: 'Пароль',
    register: 'Регистрация',

    // ============ FEEDBACK / MESSAGES ============
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

    // ============ NOTIFICATIONS ============
    notifications: 'Уведомления',
    no_notifications: 'Нет уведомлений',
    mark_read: 'Отметить',

    // ============ ADMIN TOOLS ============
    view_stats: 'Посмотреть статистику',
    upload_firebase: 'Загрузить данные в базу',
    export_json: 'Экспортировать все данные',
    view_deleted: 'Просмотреть удаленные',
    deleted_projects: 'Удаленные проекты',
    restore: 'Восстановить',
    delete_permanent: 'Удалить навсегда',

    // ============ TOAST MESSAGES ============
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
    copied: 'Скопировано!',

    // ============ HERO ============
    hero_title: 'Лаборатория Крипто-Возможностей',
    hero_subtitle: 'AirdropLab - это ваш центр для исследования, тестирования и участия в самых перспективных аирдропах.',
    start_research: 'Начать исследование',
    collapse_hero: 'Свернуть приветствие',
    expand_hero: 'Развернуть приветствие',

    // ============ COMMON ============
    yes: 'Да',
    no: 'Нет',
    ok: 'ОК',
    back: 'Назад',
    preview: 'Просмотр',
    view: 'Посмотреть',
    edit: 'Редактировать',
    no_description: 'Нет описания',
    leave_feedback: 'Оставить отзыв',
    last_activity_date: 'Дата последней активности',
    mark_complete: 'Отметить',
    add_favorites: 'Избранное',
    deleted_count: 'Удаленных',
    no_deleted_projects: 'Нет удаленных проектов',
    new_category: 'Новая категория...',
    project: 'Проект',
    account_not_specified: 'Не указано',

    // ============ SUPPORT ============
    support_title: 'Служба поддержки',
    my_support_requests: 'Мои обращения',
    all_support_requests: 'Все обращения в поддержку',
    no_support_requests: 'Нет обращений в поддержку',
    start_support_request: 'Опишите вашу проблему — мы ответим в течение 24 часов',
    support_message_placeholder: 'Опишите вашу проблему подробно...',
    cat_technical: 'Техническая проблема',
    cat_account: 'Проблема с аккаунтом',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Лаборатория крипто-возможностей',
    footer_tagline_desc: 'Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.',
    footer_live: 'Live',
    footer_updated: 'Обновлено',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Быстрые ссылки',
    footer_home: 'Главная',
    footer_projects: 'Проекты',
    footer_guides: 'Гайды',
    footer_support: 'Поддержка',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'Личный кабинет',
    footer_my_account: 'Мой аккаунт',
    footer_faq: 'FAQ',
    footer_language: 'Язык',
    footer_active_users: 'активных',
    footer_projects_count: 'проектов',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Юридическая информация',
    footer_documents: 'Документы',
    footer_terms: 'Условия использования',
    footer_privacy: 'Политика конфиденциальности',
    footer_cookies: 'Политика cookies',
    footer_disclaimer: 'Отказ от ответственности',
    footer_contacts: 'Контакты',
    footer_worldwide: 'Worldwide (Remote)',

    // ============ FOOTER — NEWSLETTER ============
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

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'Все права защищены.',
    footer_made_with: 'Сделано с',
    footer_love: 'любовью к крипте',
    footer_back_to_top: 'Наверх',
    footer_mobile_terms: 'Условия',
    footer_mobile_privacy: 'Приватность',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: 'Подписка оформлена!',
    newsletter_success_desc: 'Вы будете получать уведомления о новых аирдропах и важных обновлениях.',

    // ============ FOOTER — SUPPORT MODAL ============
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

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Часто задаваемые вопросы',
    footer_faq_subtitle: 'Ответы на популярные вопросы о AirdropLab',
    footer_faq_not_found: 'Не нашли ответ?',
    footer_faq_contact: 'Свяжитесь с нашей службой поддержки',
    footer_faq_write: 'Написать в поддержку',

    // ============ FAQ — QUESTIONS & ANSWERS ============
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

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Гайды',
    footer_guides_subtitle: 'Пошаговые инструкции по участию в тестнетах',
    footer_guide_active: 'Активен',
    footer_guide_go: 'Перейти к гайду',
    footer_guide_lock: 'Для доступа к гайдам необходимо выполнить задания на главной странице',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Тестнет от Circle — создателей USDC',
    guide_tempo_desc: 'L2 решение от MetaStreet',
    guide_robinhood_desc: 'Тестнет от Robinhood — известного брокера',
    guide_difficulty_easy: 'Легко',
    guide_difficulty_medium: 'Средне',
    guide_difficulty_hard: 'Сложно',

    // ============ FOOTER — ACCOUNT MODAL ============
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

footer_solana_placeholder: 'Ваш Solana адрес...',
footer_evm_hint: '(Ethereum, BSC, Polygon...)',
footer_evm_label: 'EVM адрес',
footer_solana_label: 'Solana адрес',
    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'адрес',
    footer_solana_placeholder: 'Ваш Solana адрес...',
    footer_crypto_wallets: 'Крипто-адреса',
    footer_social_networks: 'Социальные сети',
    account_select_country: 'Выберите страну или введите...',
    account_country_other_input: 'Введите название страны',
    account_crypto_addresses: 'Крипто-адреса',
    account_evm_address: 'EVM адрес',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Solana адрес',
    account_sol_placeholder: 'Ваш Solana адрес...',
    account_social_networks: 'Социальные сети',
    account_city: 'Город',
    account_city_placeholder: 'Ваш город',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Обновлено:',
    footer_legal_close: 'Закрыть',
    legal_terms_title: 'Условия использования',
    legal_privacy_title: 'Политика конфиденциальности',
    legal_cookie_title: 'Политика использования Cookies',
    legal_disclaimer_title: 'Отказ от ответственности',
    legal_updated_date: '07 марта 2026',
    legal_close_btn: 'Закрыть',

    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Реферальная программа',
    account_your_ref_code: 'Ваш реф. код',
    account_invited_count: 'Приглашено',
    account_people_short: 'чел.',
    account_invited_by: 'Вас пригласил:',
    account_enter_ref_code: 'Ввести реферальный код',
    account_apply: 'Применить',
    account_ref_bonus_text: 'За каждого приглашённого вы получите',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Генерация...',
    account_invited_label: 'чел.',
    invited_by_label: 'Вас пригласил:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: 'Реферальный код скопирован!',
    copy_failed: 'Не удалось скопировать',
    ref_wrong_format: 'Неверный формат кода (AL-XXXXXX)',
    ref_login_required: 'Войдите в аккаунт',
    ref_not_found: 'Код не найден',
    ref_own_code: 'Нельзя использовать свой код',
    ref_applied: '🧪 Код применён! +50 Reagents вам и +25 пригласившему!',
    ref_error: 'Ошибка: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Ваш баланс',
    account_streak_label: 'Стрик',
    account_days_short: 'дней',
    account_get_reagents: 'Получить Reagents',

    // ============ CLAIM MODAL ============
    claim_title: 'Ежедневные Reagents',
    claim_updated_utc: 'Обновляется в 00:00 UTC',
    claim_loading: 'Загрузка...',
    claim_error_close: 'Закрыть',
    claim_balance_label: 'Ваш баланс',
    claim_streak_label: 'Стрик',
    claim_streak_broken_title: 'Стрик сброшен!',
    claim_streak_broken_desc: 'Вы пропустили день. Начинаем заново!',
    claim_week_progress: 'Прогресс недели',
    claim_until_bonus: 'До бонуса за {days} дней',
    claim_days_left: '{days} дн.',
    claim_today_reward: 'Сегодня вы получите',
    claim_streak_will_be: 'Стрик станет:',
    claim_get_btn: 'Получить Reagents',
    claim_claiming: 'Получение...',
    claim_already_title: 'Уже получено!',
    claim_next_at: 'Следующий клейм откроется в',
    claim_rewards_table: 'Таблица наград за стрики',
    claim_after_60: 'После 60 дней: каждые 30 дней +100 RGT к бонусу',
    claim_close_btn: 'Закрыть',
    claim_success_title: 'Reagents получены!',
    claim_streak_reset: 'Стрик сброшен — начинаем заново!',
    claim_credited: 'Начислено',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Следующий клейм:',
    claim_great_btn: 'Отлично!',
    claim_time_left: 'Осталось: {h}ч {m}мин',
    claim_reset_in: 'сброс через',
    claim_balance_short: 'Баланс',
    claim_streak_short: 'Стрик',
    claim_to_bonus_short: 'До бонуса',
// ============ REAGENTS — ДОПОЛНИТЕЛЬНЫЕ КЛЮЧИ ============
claim_login_required: 'Войдите в аккаунт',
claim_load_error: 'Не удалось загрузить данные',
claim_firebase_error: 'Firebase не готов',
claim_status_error: 'Не удалось получить статус',
claim_bonus_word: 'бонус',
claim_days_unit: 'дн.',
streak_months_suffix: 'месяцев!',
claim_btn_label: 'Клейм',
claim_btn_tooltip_available: 'Получить ежедневные Reagents',
claim_btn_tooltip_cooldown: 'Следующий клейм в 00:00 UTC',
    // ============ WEEK DAYS ============
    week_mon: 'Пн',
    week_tue: 'Вт',
    week_wed: 'Ср',
    week_thu: 'Чт',
    week_fri: 'Пт',
    week_sat: 'Сб',
    week_sun: 'Вс',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 Неделя!',
    streak_month: '⚡ Месяц!',
    streak_2months: '💎 2 месяца!',
    streak_quarter: '👑 Квартал!',
    streak_4months: '🌟 4 месяца!',
    streak_5months: '🚀 5 месяцев!',
    streak_halfyear: '🏆 Полгода!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Служба поддержки',
    support_form_subtitle: 'Мы ответим в течение 24 часов',
    support_select_category: 'Выберите категорию',
    support_cat_technical: '🔧 Техническая проблема',
    support_cat_account: '👤 Проблема с аккаунтом',
    support_cat_project: '📋 Вопрос о проекте',
    support_cat_suggestion: '💡 Предложение',
    support_cat_partnership: '🤝 Партнёрство',
    support_cat_other: '💬 Другое',
    support_your_name: 'Ваше имя',
    support_subject_label: 'Заголовок',
    support_subject_placeholder: 'Краткое описание',
    support_desc_label: 'Описание',
    support_desc_placeholder: 'Опишите вашу проблему подробно...',
    support_cancel: 'Отмена',
    support_submit: 'Отправить',
    support_sending_text: 'Отправка...',
    support_sent_ok: 'Обращение отправлено! Ответим в течение 24 часов.',
    support_need_login: 'Войдите в аккаунт для отправки обращения',
    support_select_cat_warn: 'Выберите категорию обращения',
    support_send_error: 'Ошибка отправки. Попробуйте позже.',

    // ============ SUPPORT TICKET ============
    ticket_sending: 'Отправка...',
    ticket_sent: 'Обращение отправлено!',
    ticket_error: 'Ошибка отправки',
    ticket_submit_btn: 'Отправить обращение',

    // ============ NOTIFICATIONS PAGE ============
    notif_title: 'Уведомления',
    notif_clear_all: 'Очистить все',
    notif_empty_title: 'Нет уведомлений',
    notif_empty_desc: 'Уведомления о новых аирдропах появятся здесь',
    notif_mark_read: 'Прочитано',
    time_just_now: 'только что',
    time_min_ago: 'мин назад',
    time_hour_ago: 'ч назад',
    time_day_ago: 'дн назад',

    // ============ AVATAR UPLOAD ============
    avatar_too_large: 'Файл слишком большой (макс 2MB)',
    avatar_uploading: 'Загрузка фото...',
    avatar_local_only: 'Фото (только локально)',

    // ============ TUTORIALS ============
    tutorials_toast: 'Туториалы доступны в разделе проектов',

    // ============ FOOTER TOASTS ============
    footer_scroll_top_toast: 'Наверх',
    footer_language_changed: 'Язык изменён',

    // ============ COUNTRY PICKER ============
    country_manual_input: 'Введите название страны',
    // ============ MLM РЕФЕРАЛЬНАЯ СИСТЕМА ============
ref_already_used: 'Вы уже использовали реферальный код',
passive_income_title: 'Пассивный доход от рефералов',
passive_invited: 'Приглашено',
passive_total_earned: 'Заработано',
passive_pending: 'Ожидает',
passive_next_payout: 'Следующая выплата',
passive_paid_this_week: 'Выплачено на этой неделе',
passive_days_left: 'Через {days} дн. (пн UTC)',
passive_no_pending: 'Нет накопленного дохода',
passive_levels_title: 'Структура процентов',
passive_level: 'Уровень',
passive_payout_schedule: 'Выплата каждый понедельник в 00:00 UTC',
passive_payout_toast: 'Пассивный доход начислен',
passive_credited_to_upstream: 'Начислено вышестоящим по цепочке:',
  },

  en: {
    // ============ MAIN UI ============
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
    categories: 'Categories',
    all: 'All',
    all_categories: 'All categories',
    search_placeholder: 'Search projects...',
    per_page: 'Per page:',
    by_added_date:    '📅 By date added',
    by_activity_date: '🔄 By activity date',
    date_day:   'Day',
    date_month: 'Mo.',
    date_year:  'Year',
    by_priority: '⭐ By priority',
    by_name: '🔤 By name',
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

    // ============ ADMIN / PROJECT FORM ============
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

    // ============ AUTH ============
    login_title: 'Login',
    google: 'Google',
    twitter: 'Twitter',
    or_email: 'OR EMAIL',
    email: 'Email',
    password: 'Password',
    register: 'Register',

    // ============ FEEDBACK / MESSAGES ============
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

    // ============ NOTIFICATIONS ============
    notifications: 'Notifications',
    no_notifications: 'No notifications',
    mark_read: 'Mark as read',

    // ============ ADMIN TOOLS ============
    view_stats: 'View Statistics',
    upload_firebase: 'Upload to Database',
    export_json: 'Export All Data',
    view_deleted: 'View Deleted',
    deleted_projects: 'Deleted Projects',
    restore: 'Restore',
    delete_permanent: 'Delete Forever',

    // ============ TOAST MESSAGES ============
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
    copied: 'Copied!',

    // ============ HERO ============
    hero_title: 'Crypto Opportunities Laboratory',
    hero_subtitle: 'AirdropLab is your hub for researching, testing, and participating in the most promising airdrops.',
    start_research: 'Start Research',
    collapse_hero: 'Collapse Welcome',
    expand_hero: 'Expand Welcome',

    // ============ COMMON ============
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    back: 'Back',
    preview: 'Preview',
    view: 'View',
    edit: 'Edit',
    no_description: 'No description',
    leave_feedback: 'Leave feedback',
    last_activity_date: 'Last activity date',
    mark_complete: 'Mark complete',
    add_favorites: 'Add to favorites',
    deleted_count: 'Deleted',
    no_deleted_projects: 'No deleted projects',
    new_category: 'New category...',
    project: 'Project',
    account_not_specified: 'Not specified',

    // ============ SUPPORT ============
    support_title: 'Support Center',
    my_support_requests: 'My Requests',
    all_support_requests: 'All Support Requests',
    no_support_requests: 'No support requests',
    start_support_request: 'Describe your issue — we will respond within 24 hours',
    support_message_placeholder: 'Describe your issue in detail...',
    cat_technical: 'Technical Issue',
    cat_account: 'Account Problem',

    // ============ FOOTER — BRAND ============
    footer_tagline: 'Crypto Opportunities Laboratory',
    footer_tagline_desc: 'We research, test and help participate in the most promising airdrops and testnets.',
    footer_live: 'Live',
    footer_updated: 'Updated',

    // ============ FOOTER — QUICK LINKS ============
    footer_quick_links: 'Quick Links',
    footer_home: 'Home',
    footer_projects: 'Projects',
    footer_guides: 'Guides',
    footer_support: 'Support',

    // ============ FOOTER — ACCOUNT SECTION ============
    footer_account_title: 'My Account',
    footer_my_account: 'My Account',
    footer_faq: 'FAQ',
    footer_language: 'Language',
    footer_active_users: 'active',
    footer_projects_count: 'projects',

    // ============ FOOTER — LEGAL ============
    footer_legal_title: 'Legal Information',
    footer_documents: 'Documents',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',
    footer_cookies: 'Cookie Policy',
    footer_disclaimer: 'Disclaimer',
    footer_contacts: 'Contacts',
    footer_worldwide: 'Worldwide (Remote)',

    // ============ FOOTER — NEWSLETTER ============
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

    // ============ FOOTER — BOTTOM BAR ============
    footer_rights: 'All rights reserved.',
    footer_made_with: 'Made with',
    footer_love: 'love for crypto',
    footer_back_to_top: 'Back to top',
    footer_mobile_terms: 'Terms',
    footer_mobile_privacy: 'Privacy',

    // ============ FOOTER — NEWSLETTER MODAL ============
    newsletter_success_title: 'Subscribed!',
    newsletter_success_desc: 'You will receive notifications about new airdrops and important updates.',

    // ============ FOOTER — SUPPORT MODAL ============
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

    // ============ FOOTER — FAQ MODAL ============
    footer_faq_title: 'Frequently Asked Questions',
    footer_faq_subtitle: 'Answers to popular questions about AirdropLab',
    footer_faq_not_found: "Didn't find an answer?",
    footer_faq_contact: 'Contact our support team',
    footer_faq_write: 'Write to Support',

    // ============ FAQ — QUESTIONS & ANSWERS ============
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

    // ============ FOOTER — GUIDES MODAL ============
    footer_guides_title: 'Guides',
    footer_guides_subtitle: 'Step-by-step instructions for participating in testnets',
    footer_guide_active: 'Active',
    footer_guide_go: 'Go to Guide',
    footer_guide_lock: 'Complete tasks on the main page to access guides',

    // ============ FOOTER — GUIDES DATA ============
    guide_arc_desc: 'Testnet by Circle — creators of USDC',
    guide_tempo_desc: 'L2 solution by MetaStreet',
    guide_robinhood_desc: 'Testnet by Robinhood — well-known broker',
    guide_difficulty_easy: 'Easy',
    guide_difficulty_medium: 'Medium',
    guide_difficulty_hard: 'Hard',

    // ============ FOOTER — ACCOUNT MODAL ============
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

footer_solana_placeholder: 'Your Solana address...',
footer_evm_hint: '(Ethereum, BSC, Polygon...)',
footer_evm_label: 'EVM Address',
footer_solana_label: 'Solana Address',
    // ============ FOOTER — ACCOUNT EXTRA FIELDS ============
    footer_address: 'address',
    footer_solana_placeholder: 'Your Solana address...',
    footer_crypto_wallets: 'Crypto Addresses',
    footer_social_networks: 'Social Networks',
    account_select_country: 'Select or type country...',
    account_country_other_input: 'Enter country name',
    account_crypto_addresses: 'Crypto Addresses',
    account_evm_address: 'EVM Address',
    account_evm_hint: '(Ethereum, BSC, Polygon...)',
    account_sol_address: 'Solana Address',
    account_sol_placeholder: 'Your Solana address...',
    account_social_networks: 'Social Networks',
    account_city: 'City',
    account_city_placeholder: 'Your city',

    // ============ FOOTER — LEGAL MODALS ============
    footer_legal_updated: 'Updated:',
    footer_legal_close: 'Close',
    legal_terms_title: 'Terms of Service',
    legal_privacy_title: 'Privacy Policy',
    legal_cookie_title: 'Cookie Policy',
    legal_disclaimer_title: 'Disclaimer',
    legal_updated_date: 'March 07, 2026',
    legal_close_btn: 'Close',

    // ============ REFERRAL PROGRAM ============
    account_ref_program: 'Referral Program',
    account_your_ref_code: 'Your referral code',
    account_invited_count: 'Invited',
    account_people_short: 'people',
    account_invited_by: 'Invited by:',
    account_enter_ref_code: 'Enter referral code',
    account_apply: 'Apply',
    account_ref_bonus_text: 'You get',
    account_ref_bonus_amount: '+25 Reagents',
    account_generating: 'Generating...',
    account_invited_label: 'people',
    invited_by_label: 'Invited by:',
    ref_code_input_placeholder: 'AL-XXXXXX',
    ref_code_copied: 'Referral code copied!',
    copy_failed: 'Copy failed',
    ref_wrong_format: 'Invalid code format (AL-XXXXXX)',
    ref_login_required: 'Please log in',
    ref_not_found: 'Code not found',
    ref_own_code: 'Cannot use your own code',
    ref_applied: '🧪 Code applied! +50 Reagents for you and +25 for referrer!',
    ref_error: 'Error: ',

    // ============ REAGENTS ============
    reagents_title: 'Reagents',
    reagents_section_title: 'Reagents',
    reagents_rgt_unit: 'RGT',
    account_balance_label: 'Your balance',
    account_streak_label: 'Streak',
    account_days_short: 'days',
    account_get_reagents: 'Claim Reagents',

    // ============ CLAIM MODAL ============
    claim_title: 'Daily Reagents',
    claim_updated_utc: 'Resets at 00:00 UTC',
    claim_loading: 'Loading...',
    claim_error_close: 'Close',
    claim_balance_label: 'Your balance',
    claim_streak_label: 'Streak',
    claim_streak_broken_title: 'Streak reset!',
    claim_streak_broken_desc: 'You missed a day. Starting over!',
    claim_week_progress: 'Weekly progress',
    claim_until_bonus: 'Until {days}-day bonus',
    claim_days_left: '{days} days',
    claim_today_reward: 'Today you will receive',
    claim_streak_will_be: 'Streak will become:',
    claim_get_btn: 'Claim Reagents',
    claim_claiming: 'Claiming...',
    claim_already_title: 'Already claimed!',
    claim_next_at: 'Next claim opens at',
    claim_rewards_table: 'Streak reward table',
    claim_after_60: 'After 60 days: every 30 days +100 RGT bonus',
    claim_close_btn: 'Close',
    claim_success_title: 'Reagents claimed!',
    claim_streak_reset: 'Streak reset — starting over!',
    claim_credited: 'Credited',
    claim_reagents_unit: 'Reagents',
    claim_next_claim: 'Next claim:',
    claim_great_btn: 'Great!',
    claim_time_left: 'Left: {h}h {m}m',
    claim_reset_in: 'reset in',
    claim_balance_short: 'Balance',
    claim_streak_short: 'Streak',
    claim_to_bonus_short: 'To bonus',
// ============ REAGENTS — EXTRA KEYS ============
claim_login_required: 'Please log in',
claim_load_error: 'Failed to load data',
claim_firebase_error: 'Firebase not ready',
claim_status_error: 'Failed to get status',
claim_bonus_word: 'bonus',
claim_days_unit: 'd.',
streak_months_suffix: 'months!',
claim_btn_label: 'Claim',
claim_btn_tooltip_available: 'Claim daily Reagents',
claim_btn_tooltip_cooldown: 'Next claim at 00:00 UTC',
    // ============ WEEK DAYS ============
    week_mon: 'Mon',
    week_tue: 'Tue',
    week_wed: 'Wed',
    week_thu: 'Thu',
    week_fri: 'Fri',
    week_sat: 'Sat',
    week_sun: 'Sun',

    // ============ STREAK BONUS LABELS ============
    streak_week: '🔥 One Week!',
    streak_month: '⚡ One Month!',
    streak_2months: '💎 2 Months!',
    streak_quarter: '👑 Quarter!',
    streak_4months: '🌟 4 Months!',
    streak_5months: '🚀 5 Months!',
    streak_halfyear: '🏆 Half Year!',

    // ============ SUPPORT FORM (FOOTER) ============
    support_form_title: 'Support Center',
    support_form_subtitle: 'We will respond within 24 hours',
    support_select_category: 'Select category',
    support_cat_technical: '🔧 Technical Issue',
    support_cat_account: '👤 Account Problem',
    support_cat_project: '📋 Project Question',
    support_cat_suggestion: '💡 Suggestion',
    support_cat_partnership: '🤝 Partnership',
    support_cat_other: '💬 Other',
    support_your_name: 'Your Name',
    support_subject_label: 'Subject',
    support_subject_placeholder: 'Brief description',
    support_desc_label: 'Description',
    support_desc_placeholder: 'Describe your issue in detail...',
    support_cancel: 'Cancel',
    support_submit: 'Send',
    support_sending_text: 'Sending...',
    support_sent_ok: 'Request submitted! We will respond within 24 hours.',
    support_need_login: 'Please log in to submit a request',
    support_select_cat_warn: 'Please select a category',
    support_send_error: 'Submission error. Please try again.',

    // ============ SUPPORT TICKET ============
    ticket_sending: 'Sending...',
    ticket_sent: 'Request submitted!',
    ticket_error: 'Submission error',
    ticket_submit_btn: 'Submit Request',

    // ============ NOTIFICATIONS PAGE ============
    notif_title: 'Notifications',
    notif_clear_all: 'Clear all',
    notif_empty_title: 'No notifications',
    notif_empty_desc: 'Notifications about new airdrops will appear here',
    notif_mark_read: 'Mark as read',
    time_just_now: 'just now',
    time_min_ago: 'min ago',
    time_hour_ago: 'h ago',
    time_day_ago: 'd ago',

    // ============ AVATAR UPLOAD ============
    avatar_too_large: 'File too large (max 2MB)',
    avatar_uploading: 'Uploading photo...',
    avatar_local_only: 'Photo (local only)',

    // ============ TUTORIALS ============
    tutorials_toast: 'Tutorials are available in the projects section',

    // ============ FOOTER TOASTS ============
    footer_scroll_top_toast: 'Back to top',
    footer_language_changed: 'Language changed',

    // ============ COUNTRY PICKER ============
    country_manual_input: 'Enter country name',
    // ============ MLM REFERRAL SYSTEM ============
ref_already_used: 'You have already used a referral code',
passive_income_title: 'Passive referral income',
passive_invited: 'Invited',
passive_total_earned: 'Earned',
passive_pending: 'Pending',
passive_next_payout: 'Next payout',
passive_paid_this_week: 'Paid this week',
passive_days_left: 'In {days} d. (Mon UTC)',
passive_no_pending: 'No pending income',
passive_levels_title: 'Percent structure',
passive_level: 'Level',
passive_payout_schedule: 'Payout every Monday at 00:00 UTC',
passive_payout_toast: 'Passive income credited',
passive_credited_to_upstream: 'Credited to upstream chain:',
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
    document.documentElement.lang = lang;
    updateAllTranslations();
    
    if (lang === 'en') {
      loadEnglishProjects();
    }
    
    updateLanguageButton();
    
    // Обновляем глобальную переменную
    window.currentLang = currentLang;

    // Обновляем переводы модального окна обратной связи
    updateFeedbackModalTranslations();
document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
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
  updateDateFilterMonths();
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
  document.documentElement.lang = currentLang;
  updateLanguageButton();
  
  if (currentLang === 'en') {
    loadEnglishProjects();
  }
});
// Обновляем месяцы в фильтре дат без полной перестройки
function updateDateFilterMonths() {
  const monthEl = document.getElementById('dateFilterMonth');
  const dayEl   = document.getElementById('dateFilterDay');
  const yearEl  = document.getElementById('dateFilterYear');

  const monthsRu = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const months = currentLang === 'en' ? monthsEn : monthsRu;

  if (monthEl) {
    const saved = monthEl.value;
    // Обновляем только текст опций 1-12
    monthEl.querySelectorAll('option:not([value=""])').forEach((opt, i) => {
      if (months[i]) opt.textContent = months[i];
    });
    // Placeholder переведётся через data-translate, но обновим и здесь
    const placeholder = monthEl.querySelector('option[value=""]');
    if (placeholder) placeholder.textContent = t('date_month');
    monthEl.value = saved;
  }

  // Placeholder для дня и года
  if (dayEl) {
    const ph = dayEl.querySelector('option[value=""]');
    if (ph) ph.textContent = t('date_day');
  }
  if (yearEl) {
    const ph = yearEl.querySelector('option[value=""]');
    if (ph) ph.textContent = t('date_year');
  }
}
// Экспорт глобальных переменных
window.currentLang = currentLang;
window.translations = translations;
window.setLanguage = setLanguage;

