// ============================================================
// header.js — AirdropLab Header (Mobile-Fixed)
// ============================================================
(function () {

  function injectHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML = `
      <header style="position:relative;overflow:hidden;">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900/20 to-slate-900"></div>
        <div class="absolute inset-0 backdrop-blur-xl bg-slate-900/85 border-b border-cyan-500/20"></div>

        <div class="relative px-3 sm:px-4 py-2 sm:py-3" style="max-width:min(1600px,100%);margin:0 auto;">

          <!-- ── Строка 1: Лого + Кнопки ── -->
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;">

            <!-- Логотип -->
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
              <div style="position:relative;">
                <div style="position:absolute;inset:0;background:linear-gradient(to right,#06b6d4,#3b82f6);border-radius:14px;filter:blur(8px);opacity:0.5;"></div>
                <div style="position:relative;width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#1e293b,#0f172a);border:2px solid rgba(34,211,238,0.5);display:flex;align-items:center;justify-content:center;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="url(#hg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"><animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/></circle>
                    <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"><animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/></circle>
                    <defs>
                      <linearGradient id="hg" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#22d3ee"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <h1 style="font-size:clamp(14px,4vw,22px);font-weight:900;line-height:1;margin:0;">
                    <span style="background:linear-gradient(to right,#22d3ee,#60a5fa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Airdrop</span><span style="color:white;">Lab</span>
                  </h1>
                  <span style="display:none;" class="sm:inline px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-400/30 rounded text-[9px] font-bold text-cyan-300 uppercase">v2.0</span>
                </div>
                <p style="font-size:10px;color:#64748b;margin:1px 0 0;display:flex;align-items:center;gap:4px;" class="hidden sm:flex">
                  <span style="position:relative;display:inline-flex;width:7px;height:7px;">
                    <span style="position:absolute;inset:0;border-radius:50%;background:#34d399;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;opacity:0.75;"></span>
                    <span style="position:relative;width:7px;height:7px;border-radius:50%;background:#34d399;"></span>
                  </span>
                  <span id="modeIndicator" data-translate="experimental_zone">Экспериментальная зона</span>
                </p>
              </div>
            </div>

            <!-- Статистика — только desktop (md+) -->
            <div class="al-desk-stats hidden md:flex" style="gap:12px;">
              <div style="text-align:center;cursor:pointer;padding:4px 10px;border-radius:8px;transition:background 0.2s;" onclick="typeof filterProjects==='function'&&filterProjects('active')" onmouseover="this.style.background='rgba(16,185,129,0.1)'" onmouseout="this.style.background='transparent'">
                <div style="font-size:20px;font-weight:900;background:linear-gradient(135deg,#34d399,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statActive">0</div>
                <div style="font-size:9px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="active">Акт.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:4px 10px;border-radius:8px;transition:background 0.2s;" onclick="typeof filterProjects==='function'&&filterProjects('today')" onmouseover="this.style.background='rgba(34,211,238,0.1)'" onmouseout="this.style.background='transparent'">
                <div style="font-size:20px;font-weight:900;background:linear-gradient(135deg,#22d3ee,#0891b2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statToday">0</div>
                <div style="font-size:9px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="new">Нов.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:4px 10px;border-radius:8px;transition:background 0.2s;" onclick="typeof filterProjects==='function'&&filterProjects('favorites')" onmouseover="this.style.background='rgba(249,115,22,0.1)'" onmouseout="this.style.background='transparent'">
                <div style="font-size:20px;font-weight:900;background:linear-gradient(135deg,#fb923c,#ea580c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statFavorites">0</div>
                <div style="font-size:9px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="in_work">Раб.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:4px 10px;border-radius:8px;transition:background 0.2s;" onclick="typeof filterProjects==='function'&&filterProjects('completed')" onmouseover="this.style.background='rgba(59,130,246,0.1)'" onmouseout="this.style.background='transparent'">
                <div style="font-size:20px;font-weight:900;background:linear-gradient(135deg,#60a5fa,#2563eb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statCompleted">0</div>
                <div style="font-size:9px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="done">Гот.</div>
              </div>
            </div>

            <!-- Кнопки -->
            <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">

              <!-- Клейм -->
              <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtn"
                style="position:relative;display:flex;align-items:center;gap:4px;padding:6px 8px;background:linear-gradient(135deg,rgba(8,145,178,0.2),rgba(37,99,235,0.2));border:1px solid rgba(34,211,238,0.3);border-radius:10px;color:#22d3ee;cursor:pointer;transition:all 0.2s;font-size:13px;">
                <span>🧪</span>
                <span style="font-size:11px;font-weight:600;" class="hidden sm:inline" data-translate="claim_btn_label">Клейм</span>
                <span id="claimDot" style="display:none;position:absolute;top:-3px;right:-3px;width:8px;height:8px;background:#34d399;border-radius:50%;border:2px solid #0b0f19;"></span>
              </button>

              <!-- Уведомления -->
              <div id="notificationPanel" style="position:relative;">
                <button onclick="typeof showNotifications==='function'&&showNotifications()"
                  style="position:relative;padding:7px;color:#94a3b8;background:transparent;border:1px solid transparent;border-radius:10px;cursor:pointer;transition:all 0.2s;font-size:15px;"
                  onmouseover="this.style.color='#22d3ee';this.style.background='rgba(34,211,238,0.1)';this.style.borderColor='rgba(34,211,238,0.3)'"
                  onmouseout="this.style.color='#94a3b8';this.style.background='transparent';this.style.borderColor='transparent'">
                  <i class="fas fa-bell"></i>
                  <span id="notificationBadge" style="display:none;position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;background:linear-gradient(135deg,#ef4444,#f97316);border-radius:999px;font-size:9px;font-weight:700;color:white;display:none;align-items:center;justify-content:center;padding:0 3px;">0</span>
                </button>
              </div>

              <!-- Feedback -->
              <div id="generalFeedbackPanel" style="display:none;position:relative;">
                <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
                  style="position:relative;padding:7px;color:#94a3b8;background:transparent;border:1px solid transparent;border-radius:10px;cursor:pointer;transition:all 0.2s;font-size:15px;"
                  onmouseover="this.style.color='#c084fc';this.style.background='rgba(139,92,246,0.1)';this.style.borderColor='rgba(139,92,246,0.3)'"
                  onmouseout="this.style.color='#94a3b8';this.style.background='transparent';this.style.borderColor='transparent'">
                  <i class="fas fa-comment-dots"></i>
                  <span id="feedbackBadge" style="display:none;position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;font-size:9px;font-weight:700;color:white;align-items:center;justify-content:center;padding:0 3px;">0</span>
                </button>
              </div>

              <!-- Язык -->
              <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtn"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all">
                <span class="lang-flag"></span>
                <span class="lang-text">ENG</span>
              </button>

              <!-- Админ -->
              <div id="adminPanel" style="display:none;align-items:center;gap:4px;border-left:1px solid rgba(71,85,105,0.5);padding-left:8px;margin-left:2px;">
                <button onclick="typeof openAddModal==='function'&&openAddModal()"
                  style="display:flex;align-items:center;gap:4px;padding:5px 8px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;">
                  <i class="fas fa-flask"></i>
                  <span class="hidden lg:inline" data-translate="new_test">Новый тест</span>
                </button>
                <button onclick="typeof openStats==='function'&&openStats()" class="admin-action-btn admin-btn-orange" style="padding:5px 8px;"><i class="fas fa-chart-pie"></i></button>
                <button onclick="typeof exportAllData==='function'&&exportAllData()" class="admin-action-btn admin-btn-emerald" style="padding:5px 8px;"><i class="fas fa-file-export"></i></button>
                <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()" class="admin-action-btn admin-btn-purple hidden sm:flex" style="padding:5px 8px;"><i class="fas fa-cloud-upload-alt"></i></button>
                <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()" class="admin-action-btn admin-btn-red hidden sm:flex" style="padding:5px 8px;"><i class="fas fa-trash-restore"></i></button>
              </div>

              <!-- Аутентификация -->
              <div id="authPanel" style="display:flex;align-items:center;gap:4px;border-left:1px solid rgba(71,85,105,0.5);padding-left:8px;margin-left:2px;">
                <div id="loggedOutView">
                  <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                    style="display:flex;align-items:center;gap:5px;padding:6px 10px;background:linear-gradient(135deg,#0891b2,#2563eb);border:none;border-radius:10px;color:white;font-size:12px;font-weight:700;cursor:pointer;">
                    <i class="fas fa-sign-in-alt"></i>
                    <span class="hidden sm:inline" data-translate="login">Вход</span>
                  </button>
                </div>
                <div id="loggedInView" style="display:none;align-items:center;gap:6px;">
                  <div class="hidden md:block text-right cursor-pointer" id="userNameWrapper" style="line-height:1.2;">
                    <div id="userName" style="font-size:11px;font-weight:700;color:white;">Researcher</div>
                    <div style="font-size:9px;color:#34d399;display:flex;align-items:center;justify-content:flex-end;gap:3px;">
                      <span style="width:5px;height:5px;background:#34d399;border-radius:50%;display:inline-block;"></span>
                      <span data-translate="in_system">В системе</span>
                    </div>
                  </div>
                  <div style="position:relative;flex-shrink:0;" id="userAvatarWrapper">
                    <div style="position:absolute;inset:-2px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;filter:blur(4px);opacity:0.5;"></div>
                    <img id="userAvatar" src="" style="position:relative;width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid rgba(34,211,238,0.5);">
                  </div>
                  <button onclick="typeof logout==='function'&&logout()"
                    style="padding:6px;color:#64748b;background:transparent;border:none;border-radius:8px;cursor:pointer;font-size:13px;transition:all 0.2s;"
                    onmouseover="this.style.color='#ef4444';this.style.background='rgba(239,68,68,0.1)'"
                    onmouseout="this.style.color='#64748b';this.style.background='transparent'">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- ── Строка 2: Мобильная статистика (только < md) ── -->
          <div class="al-mob-stats">
            <div class="al-mob-stat" onclick="typeof filterProjects==='function'&&filterProjects('active')">
              <span class="al-mob-stat__num" style="color:#34d399;" id="mStatActive">0</span>
              <span class="al-mob-stat__lbl" data-translate="active">Акт.</span>
            </div>
            <div class="al-mob-stat" onclick="typeof filterProjects==='function'&&filterProjects('today')">
              <span class="al-mob-stat__num" style="color:#22d3ee;" id="mStatToday">0</span>
              <span class="al-mob-stat__lbl" data-translate="new">Нов.</span>
            </div>
            <div class="al-mob-stat" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
              <span class="al-mob-stat__num" style="color:#fb923c;" id="mStatFavorites">0</span>
              <span class="al-mob-stat__lbl" data-translate="in_work">Раб.</span>
            </div>
            <div class="al-mob-stat" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
              <span class="al-mob-stat__num" style="color:#60a5fa;" id="mStatCompleted">0</span>
              <span class="al-mob-stat__lbl" data-translate="done">Гот.</span>
            </div>
          </div>
        </div>
      </header>

      <!-- CryptoRank Ticker -->
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);backdrop-filter:blur(12px);max-width:100vw;overflow:hidden;">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:4px 12px;overflow:hidden;box-sizing:border-box;">
          <div id="cr-widget-marquee"
               data-coins="bitcoin,ethereum,tether,ripple,cardano"
               data-theme="dark"
               data-show-symbol="true"
               data-show-icon="true"
               data-show-period-change="true"
               data-period-change="24H"
               data-api-url="https://api.cryptorank.io/v0"
               style="max-width:100%;overflow:hidden;box-sizing:border-box;">
            <a href="https://cryptorank.io" target="_blank">Coins by Cryptorank</a>
          </div>
        </div>
      </div>
    `;

    // CryptoRank script
    const crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // Синхронизация мобильных статов
    function syncMobileStats() {
      [
        ['statActive',    'mStatActive'],
        ['statToday',     'mStatToday'],
        ['statFavorites', 'mStatFavorites'],
        ['statCompleted', 'mStatCompleted']
      ].forEach(function(pair) {
        const from = document.getElementById(pair[0]);
        const to   = document.getElementById(pair[1]);
        if (!from || !to) return;
        to.textContent = from.textContent;
        new MutationObserver(function() {
          to.textContent = from.textContent;
        }).observe(from, { childList: true, characterData: true, subtree: true });
      });
    }
    setTimeout(syncMobileStats, 400);

    // CSS-переменная высоты хедера
    function syncHeaderHeight() {
      var h = document.getElementById('site-header');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    var headerEl = document.getElementById('site-header');
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
    setTimeout(syncHeaderHeight, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
