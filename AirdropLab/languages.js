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
    high_priority: 'Высокий приоритет',
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
    feedback: 'Обратная связь',
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
    project: 'Проект'
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
    project: 'Project'
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
    const response = await fetch('./english_projects.json');
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

function updateLanguageButton() {
  const langBtn = document.getElementById('langBtn');
  if (!langBtn) return;
  
  // Качественный SVG флаг Великобритании
  const ukFlagSVG = `
    <svg width="22" height="15" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="60" height="40" rx="3" fill="#012169"/>
  <path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="6"/>
  <path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="4"/>
  <path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="4"/>
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
  
  // Подсветка
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
