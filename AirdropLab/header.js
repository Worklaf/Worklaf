// ============================================================
// header.js — AirdropLab (Desktop unchanged + Mobile rows)
// ============================================================
(function () {

  function injectHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML = `
      <header class="relative overflow-hidden" style="max-width:100vw;">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900/20 to-slate-900"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgzNCwyMTEsMjM4LDAuMSkiLz48L3N2Zz4=')] opacity-50"></div>
        <div class="absolute inset-0 backdrop-blur-xl bg-slate-900/85 border-b border-cyan-500/20"></div>

        <div class="relative max-w-[1600px] mx-auto px-4 py-3">

          <!-- ══════════════════════════════════════════════
               DESKTOP (md+): ОРИГИНАЛЬНЫЙ LAYOUT БЕЗ ИЗМЕНЕНИЙ
               ══════════════════════════════════════════════ -->
          <div class="hidden md:flex flex-row justify-between items-center gap-4">

            <!-- Логотип -->
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

            <!-- Статистика -->
            <div class="flex gap-5 text-sm">
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

            <!-- Кнопки справа -->
            <div class="flex gap-2 items-center">
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

              <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtn"
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
                <span class="px-2.5 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-md text-[10px] font-black text-white uppercase">
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
                  </div>
                  <button onclick="typeof logout==='function'&&logout()"
                    class="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- КОНЕЦ DESKTOP СЕКЦИИ -->


          <!-- ══════════════════════════════════════════════
               MOBILE (<md): 3 строки
               ══════════════════════════════════════════════ -->

          <!-- Строка 1: Лого + Аутентификация -->
          <div class="flex md:hidden items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-shrink-0">
              <div class="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/50 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="#22d3ee" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                  <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                </svg>
              </div>
              <h1 style="font-size:17px;font-weight:900;line-height:1;margin:0;">
                <span style="background:linear-gradient(to right,#22d3ee,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Airdrop</span><span style="color:white;">Lab</span>
              </h1>
            </div>
            <!-- Мобильная авторизация -->
            <div class="flex items-center gap-1.5" id="mobAuthWrap">
              <div id="mobLoggedOutView">
                <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                  style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:10px;color:white;font-size:12px;font-weight:700;cursor:pointer;">
                  <i class="fas fa-sign-in-alt"></i>
                  <span data-translate="login">Вход</span>
                </button>
              </div>
              <div id="mobLoggedInView" style="display:none;align-items:center;gap:6px;" class="flex">
  <div 
    style="position:relative;flex-shrink:0;cursor:pointer;"
    onclick="var d=document.getElementById('userAvatarWrapper');if(d)d.click();"
    title="Профиль">
    <div style="position:absolute;inset:-2px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;filter:blur(4px);opacity:0.5;transition:opacity 0.2s;"
         onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='0.5'"></div>
    <img id="mobUserAvatar" src="" style="position:relative;width:30px;height:30px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(34,211,238,0.5);">
    <!-- Иконка-подсказка что можно кликнуть -->
    <div style="position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;
                background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;
                border:1.5px solid #0b0f19;display:flex;align-items:center;justify-content:center;">
      <i class="fas fa-pen" style="font-size:5px;color:white;"></i>
    </div>
  </div>
                <button onclick="typeof logout==='function'&&logout()"
                  style="padding:6px 7px;color:#64748b;background:transparent;border:1px solid rgba(71,85,105,0.3);border-radius:8px;cursor:pointer;font-size:13px;">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Строка 2: Статистика (scrollable) -->
          <div class="flex md:hidden mob-stats-row overflow-x-auto">
            <div class="mob-stat-item" data-filter="active" onclick="typeof filterProjects==='function'&&filterProjects('active')">
              <span class="mob-stat-num" style="color:#34d399;" id="mobStatActive">0</span>
              <span class="mob-stat-lbl" data-translate="active">Акт.</span>
            </div>
            <div class="mob-stat-item" data-filter="today" onclick="typeof filterProjects==='function'&&filterProjects('today')">
              <span class="mob-stat-num" style="color:#22d3ee;" id="mobStatToday">0</span>
              <span class="mob-stat-lbl" data-translate="new">Нов.</span>
            </div>
            <div class="mob-stat-item" data-filter="favorites" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
              <span class="mob-stat-num" style="color:#fb923c;" id="mobStatFavorites">0</span>
              <span class="mob-stat-lbl" data-translate="in_work">Раб.</span>
            </div>
            <div class="mob-stat-item" data-filter="completed" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
              <span class="mob-stat-num" style="color:#60a5fa;" id="mobStatCompleted">0</span>
              <span class="mob-stat-lbl" data-translate="done">Гот.</span>
            </div>
          </div>

          <!-- Строка 3: Клейм + Уведомления + Сообщения + Язык + Админ -->
          <div class="flex md:hidden flex-wrap gap-1.5 mob-actions-row items-center">

            <!-- Клейм -->
            <button id="mobClaimBtn" onclick="window.openClaimModal&&window.openClaimModal()"
  style="position:relative;display:flex;align-items:center;gap:4px;padding:5px 10px;
         background:rgba(8,145,178,0.2);border:1px solid rgba(34,211,238,0.3);
         border-radius:10px;color:#22d3ee;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;">
  🧪 <span id="mobClaimSpan" style="font-size:11px;" data-translate="claim_btn_label">Клейм</span>
</button>

            <!-- Уведомления -->
            <button onclick="typeof showNotifications==='function'&&showNotifications()"
              style="position:relative;padding:6px 9px;color:#94a3b8;
                     background:transparent;border:1px solid rgba(71,85,105,0.3);
                     border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-bell"></i>
              <span id="mobNotifBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#ef4444,#f97316);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;
                       align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <!-- Сообщения (скрыто до логина, синхронизируется) -->
            <button id="mobFeedbackBtn" onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
              style="display:none;position:relative;padding:6px 9px;color:#94a3b8;
                     background:transparent;border:1px solid rgba(71,85,105,0.3);
                     border-radius:10px;cursor:pointer;font-size:14px;">
              <i class="fas fa-comment-dots"></i>
              <span id="mobFeedbackBadge"
                style="display:none;position:absolute;top:-4px;right:-4px;min-width:15px;height:15px;
                       background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;
                       font-size:8px;font-weight:700;color:white;
                       align-items:center;justify-content:center;padding:0 2px;"></span>
            </button>

            <!-- Язык -->
            <button onclick="typeof toggleLang==='function'&&toggleLang()" id="mobLangBtn"
              style="display:flex;align-items:center;gap:5px;padding:5px 10px;
                     border-radius:10px;border:1px solid rgba(239,68,68,0.3);
                     background:rgba(239,68,68,0.1);cursor:pointer;
                     font-size:11px;font-weight:700;color:#fff;white-space:nowrap;">
              <span class="mob-lang-flag" style="font-size:1rem;"></span>
              <span class="mob-lang-text">ENG</span>
            </button>

            <!-- Кнопка добавления проекта (скрыта до admin) -->
            <button id="mobAddBtn" onclick="typeof openAddModal==='function'&&openAddModal()"
              style="display:none;align-items:center;gap:4px;padding:5px 10px;
                     background:linear-gradient(135deg,#0891b2,#2563eb);border:none;
                     border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;" class="flex">
              <i class="fas fa-flask"></i>
              <span data-translate="new_test">Добавить</span>
            </button>

            <!-- Остальные admin кнопки (скрыты до admin) -->
            <div id="mobAdminBtns" style="display:none;" class="flex gap-1 items-center flex-wrap">
              <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-chart-pie"></i>
              </button>
              <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-cloud-upload-alt"></i>
              </button>
              <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-file-export"></i>
              </button>
              <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red" style="padding:5px 8px;font-size:11px;">
                <i class="fas fa-trash-restore"></i>
              </button>
            </div>

          </div>
          <!-- КОНЕЦ MOBILE СЕКЦИИ -->

        </div>
      </header>

      <!-- CryptoRank Ticker -->
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);
                  backdrop-filter:blur(12px);overflow:hidden;max-width:100vw;box-sizing:border-box;">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:3px 16px;
                    overflow:hidden;box-sizing:border-box;">
          <div id="cr-widget-marquee"
               data-coins="bitcoin,ethereum,tether,ripple,cardano"
               data-theme="dark" data-show-symbol="true" data-show-icon="true"
               data-show-period-change="true" data-period-change="24H"
               data-api-url="https://api.cryptorank.io/v0"
               style="max-width:100%;overflow:hidden;box-sizing:border-box;">
            <a href="https://cryptorank.io" target="_blank">Coins by Cryptorank</a>
          </div>
        </div>
      </div>
    `;

    // CryptoRank
    const crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // ── MutationObserver синхронизации ──
    function setupObservers() {

      // 1. Статистика
      [['statActive','mobStatActive'],['statToday','mobStatToday'],
       ['statFavorites','mobStatFavorites'],['statCompleted','mobStatCompleted']
      ].forEach(function(p) {
        var from = document.getElementById(p[0]);
        var to   = document.getElementById(p[1]);
        if (!from || !to) return;
        to.textContent = from.textContent;
        new MutationObserver(function() { to.textContent = from.textContent; })
          .observe(from, { childList: true, characterData: true, subtree: true });
      });

      // 2. Auth state (loggedIn / loggedOut)
      var deskIn   = document.getElementById('loggedInView');
      var mobIn    = document.getElementById('mobLoggedInView');
      var mobOut   = document.getElementById('mobLoggedOutView');
      var deskAva  = document.getElementById('userAvatar');
      var mobAva   = document.getElementById('mobUserAvatar');

      function syncAuth() {
        var isIn = deskIn && !deskIn.classList.contains('hidden');
        if (mobIn)  mobIn.style.display  = isIn ? 'flex' : 'none';
        if (mobOut) mobOut.style.display = isIn ? 'none' : 'block';
        if (deskAva && mobAva && deskAva.src) mobAva.src = deskAva.src;
      }
      if (deskIn) new MutationObserver(syncAuth).observe(deskIn, { attributes: true, attributeFilter: ['class','style'] });
      if (deskAva) new MutationObserver(function(){ if (mobAva) mobAva.src = deskAva.src; })
        .observe(deskAva, { attributes: true, attributeFilter: ['src'] });
      syncAuth();

      // 3. Feedback panel (generalFeedbackPanel)
      var deskFP  = document.getElementById('generalFeedbackPanel');
      var mobFBtn = document.getElementById('mobFeedbackBtn');
      var deskFBadge = document.getElementById('feedbackBadge');
      var mobFBadge  = document.getElementById('mobFeedbackBadge');

      function syncFeedback() {
        var vis = deskFP && !deskFP.classList.contains('hidden');
        if (mobFBtn) mobFBtn.style.display = vis ? 'block' : 'none';
      }
      function syncFBadge() {
        if (!deskFBadge || !mobFBadge) return;
        var hidden = deskFBadge.classList.contains('hidden');
        mobFBadge.style.display = hidden ? 'none' : 'flex';
        if (!hidden) mobFBadge.textContent = deskFBadge.textContent;
      }
      if (deskFP) new MutationObserver(syncFeedback).observe(deskFP, { attributes: true, attributeFilter: ['class','style'] });
      if (deskFBadge) new MutationObserver(syncFBadge).observe(deskFBadge, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      syncFeedback(); syncFBadge();

      // 4. Notification badge
      var deskNBadge = document.getElementById('notificationBadge');
      var mobNBadge  = document.getElementById('mobNotifBadge');
      function syncNBadge() {
        if (!deskNBadge || !mobNBadge) return;
        var hidden = deskNBadge.classList.contains('hidden');
        mobNBadge.style.display = hidden ? 'none' : 'flex';
        if (!hidden) mobNBadge.textContent = deskNBadge.textContent;
      }
      if (deskNBadge) new MutationObserver(syncNBadge).observe(deskNBadge, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      syncNBadge();

      // 5. Admin panel
      var deskAdmin = document.getElementById('adminPanel');
      var mobAdd    = document.getElementById('mobAddBtn');
      var mobBtns   = document.getElementById('mobAdminBtns');
      function syncAdmin() {
        var vis = deskAdmin && deskAdmin.style.display !== 'none' && deskAdmin.style.display !== '';
        if (mobAdd)  mobAdd.style.display  = vis ? 'flex' : 'none';
        if (mobBtns) mobBtns.style.display = vis ? 'flex' : 'none';
      }
      if (deskAdmin) new MutationObserver(syncAdmin).observe(deskAdmin, { attributes: true, attributeFilter: ['style'] });
      syncAdmin();

      // 6. Lang button
      var deskLang    = document.getElementById('langBtn');
      var mobLangBtn  = document.getElementById('mobLangBtn');
      var mobLangFlag = document.querySelector('.mob-lang-flag');
      var mobLangText = document.querySelector('.mob-lang-text');
      function syncLang() {
        if (!deskLang) return;
        var flag = deskLang.querySelector('.lang-flag');
        var text = deskLang.querySelector('.lang-text');
        if (mobLangFlag && flag) mobLangFlag.textContent = flag.textContent;
        if (mobLangText && text) mobLangText.textContent = text.textContent;
        if (mobLangBtn) {
          var active = deskLang.classList.contains('lang-active');
          mobLangBtn.style.background = active ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.1)';
          mobLangBtn.style.borderColor = active ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.3)';
        }
      }
      if (deskLang) new MutationObserver(syncLang).observe(deskLang, { attributes: true, subtree: true, childList: true, characterData: true });
      setTimeout(syncLang, 200);
      setTimeout(syncLang, 600);
     // ── 7. Claim button — визуальный индикатор состояния ──
var deskClaim = document.getElementById('headerClaimBtn');
var mobClaim  = document.getElementById('mobClaimBtn');

function syncClaimBtn() {
    if (!deskClaim || !mobClaim) return;

    var txt = deskClaim.textContent || '';
    var isClaimed = deskClaim.disabled
        || /\d+:\d{2}/.test(txt)
        || txt.toLowerCase().includes('сброс')
        || txt.toLowerCase().includes('reset');

    if (isClaimed) {
        // ── СОСТОЯНИЕ: уже клеймил сегодня ──
        var lbl = (window.currentLang === 'en') ? 'Claimed' : 'Готово';
        mobClaim.innerHTML = '🔒 <span style="font-size:11px;">' + lbl + '</span>';
        mobClaim.style.cssText += [
            'background:rgba(71,85,105,0.2)',
            'border-color:rgba(71,85,105,0.35)',
            'color:#64748b',
            'cursor:pointer'
        ].join(';');
        mobClaim.onclick = function() {
            if (window.openClaimModal) window.openClaimModal();
        };

    } else {
        // ── СОСТОЯНИЕ: можно клеймить ──
        var lbl = (window.currentLang === 'en') ? 'Claim' : 'Клейм';
        mobClaim.innerHTML = '🧪 <span id="mobClaimSpan" style="font-size:11px;"'
            + ' data-translate="claim_btn_label">' + lbl + '</span>';
        mobClaim.style.cssText += [
            'background:rgba(8,145,178,0.2)',
            'border-color:rgba(34,211,238,0.3)',
            'color:#22d3ee',
            'cursor:pointer',
            'opacity:1'
        ].join(';');
        mobClaim.onclick = function() {
            if (window.openClaimModal) window.openClaimModal();
        };
    }
}

if (deskClaim) {
    new MutationObserver(syncClaimBtn).observe(deskClaim, {
        childList: true, subtree: true,
        attributes: true, characterData: true
    });
}

setInterval(syncClaimBtn, 5000); // достаточно раз в 5 сек — не нужна секунда
syncClaimBtn();
    }

    setTimeout(setupObservers, 200);

    // ── Header height CSS variable ──
    function syncHeaderHeight() {
      var h = document.getElementById('site-header');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      if (window.ResizeObserver) {
        new ResizeObserver(syncHeaderHeight).observe(headerEl);
      } else {
                [100, 500, 1500].forEach(function(t) { setTimeout(syncHeaderHeight, t); });
      }
    }
    window.addEventListener('resize', syncHeaderHeight);
    setTimeout(syncHeaderHeight, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }

})();
