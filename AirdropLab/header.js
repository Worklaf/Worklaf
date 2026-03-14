// ============================================================
// header.js — Универсальный хедер AirdropLab
// Подключение:
//   1. В <head>: <script src="header.js"></script> (после languages.js)
//   2. В <body>: <div id="site-header"></div>
// ============================================================

(function () {

  function injectHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML = `
 <header class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900/20 to-slate-900"></div>
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgzNCwyMTEsMjM4LDAuMSkiLz48L3N2Zz4=')] opacity-50"></div>
    <div class="absolute inset-0 backdrop-blur-xl bg-slate-900/85 border-b border-cyan-500/20"></div>

    <div class="relative max-w-[1600px] mx-auto px-4 py-3">
      
      <!-- DESKTOP / ОБЩАЯ РАСКЛАДКА -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">

        <!-- ЛЕВО: логотип -->
        <div class="mobile-header-main flex items-center justify-between w-full md:w-auto md:justify-start md:gap-4">
          <div class="flex items-center gap-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              <div class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl shadow-cyan-500/30">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="url(#gradient1)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                  <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                  <circle cx="12" cy="15" r="0.5" fill="#22d3ee"><animate attributeName="cy" values="15;11;15" dur="1.8s" repeatCount="indefinite"/></circle>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#22d3ee"/>
                      <stop offset="100%" style="stop-color:#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-black tracking-tight">
                  <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span><span class="text-white">Lab</span>
                </h1>
                <span class="px-2 py-0.5 bg-cyan-500/20 border border-cyan-400/30 rounded-md text-[10px] font-bold text-cyan-300 uppercase tracking-wider">v2.0</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2 font-medium">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                </span>
                <span id="modeIndicator" data-translate="experimental_zone">Экспериментальная зона</span>
              </p>
            </div>
          </div>

          <!-- MOBILE TOP ACTIONS -->
          <div class="mobile-top-actions hidden md:hidden">
            <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtn"
              class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all">
              <span class="lang-flag"></span>
              <span class="lang-text">ENG</span>
            </button>

            <div id="authPanelMobile" class="flex items-center gap-2">
              <div id="loggedOutViewMobile">
                <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                  class="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm font-bold flex items-center gap-2">
                  <i class="fas fa-sign-in-alt"></i>
                </button>
              </div>
              <div id="loggedInViewMobile" class="hidden flex items-center gap-2">
                <div class="relative group cursor-pointer" id="userAvatarWrapperMobile">
                  <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img id="userAvatarMobile" src="" class="relative w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-all">
                </div>
                <button onclick="typeof logout==='function'&&logout()"
                  class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- СТАТИСТИКА ТОЛЬКО ДЛЯ ПК -->
        <div class="header-stats-desktop flex gap-5 text-sm">
          <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('active')">
            <div class="absolute inset-0 bg-emerald-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative px-3 py-1">
              <div class="text-2xl font-black bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent" id="statActive">0</div>
              <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-emerald-400 transition-colors" data-translate="active">Активных</div>
            </div>
          </div>
          <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('today')">
            <div class="absolute inset-0 bg-cyan-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative px-3 py-1">
              <div class="text-2xl font-black bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent" id="statToday">0</div>
              <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-cyan-400 transition-colors" data-translate="new">Новых</div>
            </div>
          </div>
          <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
            <div class="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative px-3 py-1">
              <div class="text-2xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent" id="statFavorites">0</div>
              <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-orange-400 transition-colors" data-translate="in_work">В работе</div>
            </div>
          </div>
          <div class="text-center group cursor-pointer relative" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
            <div class="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative px-3 py-1">
              <div class="text-2xl font-black bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent" id="statCompleted">0</div>
              <div class="text-slate-400 text-[10px] uppercase tracking-wider font-bold group-hover:text-blue-400 transition-colors" data-translate="done">Готово</div>
            </div>
          </div>
        </div>

        <!-- ПК: оригинальные кнопки справа -->
        <div class="hidden md:flex gap-2 items-center">

          <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtn"
            class="relative flex items-center gap-2 px-3 py-2
                   bg-gradient-to-r from-cyan-600/20 to-blue-600/20
                   hover:from-cyan-600/40 hover:to-blue-600/40
                   border border-cyan-500/30 hover:border-cyan-400/60
                   rounded-xl text-sm text-cyan-400 hover:text-white transition-all group">
            <span class="text-base">🧪</span>
            <span class="hidden sm:inline font-medium text-xs" data-translate="claim_btn_label">Клейм</span>
            <span id="claimDot" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 hidden animate-pulse"></span>
          </button>

          <div id="notificationPanel" class="relative">
            <button onclick="typeof showNotifications==='function'&&showNotifications()"
              class="relative p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 group border border-transparent hover:border-cyan-500/30">
              <i class="fas fa-bell text-lg group-hover:animate-bounce"></i>
              <span id="notificationBadge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-red-500/50 animate-pulse">0</span>
            </button>
          </div>

          <div id="generalFeedbackPanel" class="hidden">
            <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
              class="relative p-2.5 text-slate-400 hover:text-purple-400 transition-all rounded-xl hover:bg-purple-500/10 group border border-transparent hover:border-purple-500/30">
              <i class="fas fa-comment-dots text-lg group-hover:animate-bounce"></i>
              <span id="feedbackBadge" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-purple-500/50">0</span>
            </button>
          </div>

          <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtnDesktop"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all">
            <span class="lang-flag"></span>
            <span class="lang-text">ENG</span>
          </button>

          <div id="adminPanel" class="flex gap-2 items-center border-l border-slate-700/50 pl-3 ml-1" style="display:none;">
            <button onclick="typeof openAddModal==='function'&&openAddModal()"
              class="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30">
              <i class="fas fa-flask mr-1"></i>
              <span class="hidden sm:inline" data-translate="new_test">Новый тест</span>
            </button>
            <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" data-translate-title="view_stats"><i class="fas fa-chart-pie text-base"></i></button>
            <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" data-translate-title="upload_firebase"><i class="fas fa-cloud-upload-alt text-base"></i></button>
            <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" data-translate-title="export_json"><i class="fas fa-file-export text-base"></i></button>
            <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" data-translate-title="view_deleted"><i class="fas fa-trash-restore text-base"></i></button>
            <span class="mobile-hide-admin-badge px-2.5 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-md text-[10px] font-black text-white uppercase" data-translate="admin">
              <i class="fas fa-user-shield mr-1"></i>Admin
            </span>
          </div>

          <div id="authPanel" class="flex items-center gap-3 border-l border-slate-700/50 pl-3 ml-1">
            <div id="loggedOutView">
              <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm font-bold flex items-center gap-2">
                <i class="fas fa-sign-in-alt"></i>
                <span data-translate="login">Вход</span>
              </button>
            </div>
            <div id="loggedInView" class="hidden flex items-center gap-3">
              <div class="text-right hidden sm:block cursor-pointer" id="userNameWrapper">
                <div id="userName" class="text-xs font-bold text-white hover:text-cyan-400 transition-colors">Researcher</div>
                <div class="text-[10px] text-emerald-400 flex items-center justify-end gap-1.5">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  <span data-translate="in_system">В системе</span>
                </div>
              </div>
              <div class="relative group cursor-pointer" id="userAvatarWrapper">
                <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img id="userAvatar" src="" class="relative w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-all">
                <div class="absolute inset-0 rounded-full bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <i class="fas fa-pen text-white text-[9px]"></i>
                </div>
              </div>
              <button onclick="typeof logout==='function'&&logout()"
                class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- MOBILE SECOND ROW -->
      <div class="mobile-secondary-actions hidden md:hidden">
        <div id="adminPanelMobile" class="contents">
          <button onclick="typeof openAddModal==='function'&&openAddModal()"
            class="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold transition-all shadow-lg shadow-cyan-500/30">
            <i class="fas fa-flask mr-1"></i>
            <span data-translate="new_test">Новый тест</span>
          </button>
        </div>

        <div id="notificationPanelMobile" class="relative">
          <button onclick="typeof showNotifications==='function'&&showNotifications()"
            class="relative p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30">
            <i class="fas fa-bell text-lg"></i>
            <span id="notificationBadgeMobile" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-red-500/50">0</span>
          </button>
        </div>

        <div id="generalFeedbackPanelMobile" class="hidden">
          <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
            class="relative p-2.5 text-slate-400 hover:text-purple-400 transition-all rounded-xl hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30">
            <i class="fas fa-comment-dots text-lg"></i>
            <span id="feedbackBadgeMobile" class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs flex items-center justify-center hidden font-bold shadow-lg shadow-purple-500/50">0</span>
          </button>
        </div>

        <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtnMobile"
          class="relative flex items-center gap-2 px-3 py-2
                 bg-gradient-to-r from-cyan-600/20 to-blue-600/20
                 hover:from-cyan-600/40 hover:to-blue-600/40
                 border border-cyan-500/30 hover:border-cyan-400/60
                 rounded-xl text-sm text-cyan-400 hover:text-white transition-all">
          <span class="text-base">🧪</span>
          <span class="font-medium text-xs" data-translate="claim_btn_label">Клейм</span>
          <span id="claimDotMobile" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 hidden animate-pulse"></span>
        </button>
      </div>

    </div>
  </header>

  <div class="bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-700/50">
    <div class="max-w-[1600px] mx-auto px-4 py-1">
      <div id="cr-widget-marquee"
           data-coins="bitcoin,ethereum,tether,ripple,cardano"
           data-theme="dark"
           data-show-symbol="true"
           data-show-icon="true"
           data-show-period-change="true"
           data-period-change="24H"
           data-api-url="https://api.cryptorank.io/v0">
        <a href="https://cryptorank.io" target="_blank">Coins by Cryptorank</a>
      </div>
    </div>
  </div>
`;

    // Загружаем CryptoRank скрипт динамически (innerHTML не запускает <script>)
    const crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    // Обновляем кнопку языка сразу после вставки
    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // Синхронизация mobile auth / badges
setTimeout(function () {
  const avatar = document.getElementById('userAvatar');
  const avatarMobile = document.getElementById('userAvatarMobile');
  if (avatar && avatarMobile) {
    const syncAvatar = () => {
      avatarMobile.src = avatar.src || '';
    };
    syncAvatar();
    new MutationObserver(syncAvatar).observe(avatar, { attributes: true, attributeFilter: ['src'] });
  }

  const loggedOut = document.getElementById('loggedOutView');
  const loggedIn = document.getElementById('loggedInView');
  const loggedOutMobile = document.getElementById('loggedOutViewMobile');
  const loggedInMobile = document.getElementById('loggedInViewMobile');

  if (loggedOut && loggedIn && loggedOutMobile && loggedInMobile) {
    const syncAuthState = () => {
      const outVisible = !loggedOut.classList.contains('hidden');
      const inVisible = !loggedIn.classList.contains('hidden');

      loggedOutMobile.classList.toggle('hidden', !outVisible);
      loggedInMobile.classList.toggle('hidden', !inVisible);
    };
    syncAuthState();
    new MutationObserver(syncAuthState).observe(loggedOut, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(syncAuthState).observe(loggedIn, { attributes: true, attributeFilter: ['class'] });
  }

  const feedbackPanel = document.getElementById('generalFeedbackPanel');
  const feedbackPanelMobile = document.getElementById('generalFeedbackPanelMobile');
  if (feedbackPanel && feedbackPanelMobile) {
    const syncFeedback = () => {
      feedbackPanelMobile.classList.toggle('hidden', feedbackPanel.classList.contains('hidden'));
    };
    syncFeedback();
    new MutationObserver(syncFeedback).observe(feedbackPanel, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  const feedbackBadge = document.getElementById('feedbackBadge');
  const feedbackBadgeMobile = document.getElementById('feedbackBadgeMobile');
  if (feedbackBadge && feedbackBadgeMobile) {
    const syncFeedbackBadge = () => {
      feedbackBadgeMobile.textContent = feedbackBadge.textContent;
      feedbackBadgeMobile.className = feedbackBadge.className.replace('feedbackBadge', 'feedbackBadgeMobile');
    };
    syncFeedbackBadge();
    new MutationObserver(syncFeedbackBadge).observe(feedbackBadge, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  const notificationBadge = document.getElementById('notificationBadge');
  const notificationBadgeMobile = document.getElementById('notificationBadgeMobile');
  if (notificationBadge && notificationBadgeMobile) {
    const syncNotifBadge = () => {
      notificationBadgeMobile.textContent = notificationBadge.textContent;
      notificationBadgeMobile.className = notificationBadge.className.replace('notificationBadge', 'notificationBadgeMobile');
    };
    syncNotifBadge();
    new MutationObserver(syncNotifBadge).observe(notificationBadge, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  const claimDot = document.getElementById('claimDot');
  const claimDotMobile = document.getElementById('claimDotMobile');
  if (claimDot && claimDotMobile) {
    const syncClaimDot = () => {
      claimDotMobile.className = claimDot.className.replace('claimDot', 'claimDotMobile');
    };
    syncClaimDot();
    new MutationObserver(syncClaimDot).observe(claimDot, { attributes: true, attributeFilter: ['class'] });
  }

  const adminPanel = document.getElementById('adminPanel');
  const adminPanelMobile = document.getElementById('adminPanelMobile');
  if (adminPanel && adminPanelMobile) {
    const syncAdmin = () => {
      const visible = adminPanel.style.display !== 'none';
      adminPanelMobile.style.display = visible ? 'contents' : 'none';
    };
    syncAdmin();
    new MutationObserver(syncAdmin).observe(adminPanel, { attributes: true, attributeFilter: ['style'] });
  }
}, 50);
    // Синхронизируем CSS-переменную с реальной высотой хедера
function syncHeaderHeight() {
    const h = document.getElementById('site-header');
    if (h) {
        document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
}

const headerEl = document.getElementById('site-header');
if (headerEl) {
    if (window.ResizeObserver) {
        new ResizeObserver(syncHeaderHeight).observe(headerEl);
    } else {
        setTimeout(syncHeaderHeight, 100);
        setTimeout(syncHeaderHeight, 500);
        setTimeout(syncHeaderHeight, 1500);
    }
}
window.addEventListener('resize', syncHeaderHeight);

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }

})();
