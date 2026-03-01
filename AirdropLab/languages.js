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
    daily: 'Ежедневные',
    favorites: 'Избранное',
    completed: 'Завершённые',
    archive: 'Архив',
    categories: 'Категории',
    all: 'Все',
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
    new_category: 'Новая категория...',
    logo_url: 'URL Логотипа',
    guide_link: 'Ссылка на гайд',
    cryptorank_link: 'Ссылка на CryptoRank',
    twitter_link: 'Twitter проекта',
    referral_link: 'Реферальная ссылка',
    short_description: 'Краткое описание',
    status: 'Статус',
    update_date: 'Дата обновления',
    has_daily: 'Есть ежедневные квесты',
    high_priority_check: 'Высокий приоритет',
    project_activities: 'Активности проекта',
    add_activity: 'Добавить активность',
    no_activities: 'Активности еще не добавлены.',
    activity_name: 'Название активности *',
    activity_date: 'Дата активности (начало)',
    activity_end_date: 'Дата окончания (автозавершение)',
    activity_description: 'Подробное описание',
    activity_help: '![текст](ссылка) картинка, [текст](ссылка) ссылка',
    save_activity: 'Сохранить',
    delete_activity: 'Удалить',
    cancel: 'Отмена',
    save_project: 'Сохранить проект',
    delete_project: 'Удалить проект',
    login_title: 'Вход',
    google: 'Google',
    twitter_auth: 'Twitter',
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
    your_reply: 'Ваш ответ',
    chat_support: 'Чат с поддержкой',
    chat_user: 'Чат с пользователем',
    reply_placeholder: 'Ответ пользователю...',
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
    archive: 'Архив',
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
    confirm_end_activity: 'Завершить эту активность?',
    confirm_resume_activity: 'Возобновить эту активность?',
    img_added: 'Картинка добавлена',
    link_added: 'Ссылка добавлена',
    heading_added: 'Заголовок добавлен',
    list_added: 'Список добавлен',
    quote_added: 'Цитата добавлена',
    divider_added: 'Разделитель добавлен',
    enter_link: 'Вставьте ссылку',
    insert_image: 'Вставить картинку',
    insert_link: 'Вставить ссылку',
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
    copied: 'Скопировано!'
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
    daily: 'Daily',
    favorites: 'Favorites',
    completed: 'Completed',
    archive: 'Archive',
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
    new_category: 'New category...',
    logo_url: 'Logo URL',
    guide_link: 'Guide Link',
    cryptorank_link: 'CryptoRank Link',
    twitter_link: 'Project Twitter',
    referral_link: 'Referral Link',
    short_description: 'Short Description',
    status: 'Status',
    update_date: 'Update Date',
    has_daily: 'Has daily quests',
    high_priority_check: 'High Priority',
    project_activities: 'Project Activities',
    add_activity: 'Add Activity',
    no_activities: 'No activities added yet.',
    activity_name: 'Activity Name *',
    activity_date: 'Activity Date (start)',
    activity_end_date: 'End Date (auto-complete)',
    activity_description: 'Detailed Description',
    activity_help: '![text](url) image, [text](url) link',
    save_activity: 'Save',
    delete_activity: 'Delete',
    cancel: 'Cancel',
    save_project: 'Save Project',
    delete_project: 'Delete Project',
    login_title: 'Login',
    google: 'Google',
    twitter_auth: 'Twitter',
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
    your_reply: 'Your reply',
    chat_support: 'Support Chat',
    chat_user: 'User Chat',
    reply_placeholder: 'Reply to user...',
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
    archive: 'Archive',
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
    confirm_end_activity: 'End this activity?',
    confirm_resume_activity: 'Resume this activity?',
    img_added: 'Image added',
    link_added: 'Link added',
    heading_added: 'Heading added',
    list_added: 'List added',
    quote_added: 'Quote added',
    divider_added: 'Divider added',
    enter_link: 'Insert link',
    insert_image: 'Insert Image',
    insert_link: 'Insert Link',
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
    copied: 'Copied!'
  }
};

let currentLang = localStorage.getItem('airdropLabLang') || 'ru';

function t(key) {
  return translations[currentLang]?.[key] || translations['ru'][key] || key;
}

function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('airdropLabLang', lang);
    updateAllTranslations();
    
    if (lang === 'en') {
      loadEnglishProjects();
    }
    
    updateLanguageButton();
    return true;
  }
  return false;
}

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

function resetToRussian() {
  if (window.resetToDefaultDataSource) {
    window.resetToDefaultDataSource();
  }
}

function updateAllTranslations() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const translated = t(key);
    if (translated) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else {
        el.innerHTML = translated;
      }
    }
  });
  
  document.querySelectorAll('[data-translate-title]').forEach(el => {
    const key = el.getAttribute('data-translate-title');
    const translated = t(key);
    if (translated) el.textContent = translated;
  });
  
  updateLanguageButton();
  
  if (window.applyFilters) {
    window.applyFilters();
  }
}

function updateLanguageButton() {
  const langBtn = document.getElementById('langBtn');
  if (!langBtn) return;
  
  const flagSpan = langBtn.querySelector('.lang-flag');
  const textSpan = langBtn.querySelector('.lang-text');
  
  if (currentLang === 'en') {
    if (flagSpan) flagSpan.textContent = '🇬🇧';
    if (textSpan) {
      textSpan.textContent = 'ON';
      textSpan.classList.add('lang-on');
    }
    langBtn.classList.add('lang-active');
  } else {
    if (flagSpan) flagSpan.textContent = '🇷🇺';
    if (textSpan) {
      textSpan.textContent = 'OFF';
      textSpan.classList.remove('lang-on');
    }
    langBtn.classList.remove('lang-active');
  }
}

window.toggleLang = function() {
  if (currentLang === 'ru') {
    setLanguage('en');
  } else {
    setLanguage('ru');
    resetToRussian();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  updateLanguageButton();
  
  if (currentLang === 'en') {
    loadEnglishProjects();
  }
});

window.currentLang = currentLang;
window.translations = translations;
