// ============================================================
// header.js — AirdropLab Header (Mobile-Fixed + Admin Row)
// ============================================================
(function () {

  function injectHeader() {
    const container = document.getElementById('site-header');
    if (!container) return;

    container.innerHTML = `
      <header style="position:relative;overflow:hidden;width:100%;max-width:100vw;box-sizing:border-box;">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-cyan-900/20 to-slate-900"></div>
        <div class="absolute inset-0 backdrop-blur-xl bg-slate-900/85 border-b border-cyan-500/20"></div>

        <div class="relative" style="max-width:min(1600px,100%);margin:0 auto;padding:7px 6px 5px;box-sizing:border-box;">

          <!-- ── СТРОКА 1: Основная ── -->
          <div style="display:flex;align-items:center;justify-content:space-between;gap:5px;min-width:0;">

            <!-- Логотип -->
            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
              <div style="position:relative;">
                <div style="position:absolute;inset:0;background:linear-gradient(to right,#06b6d4,#3b82f6);border-radius:11px;filter:blur(7px);opacity:0.5;"></div>
                <div style="position:relative;width:33px;height:33px;border-radius:10px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1.5px solid rgba(34,211,238,0.5);display:flex;align-items:center;justify-content:center;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8"
                      stroke="url(#hg2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6">
                      <animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8">
                      <animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <defs>
                      <linearGradient id="hg2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#22d3ee"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div>
                <h1 style="font-size:clamp(13px,3.8vw,20px);font-weight:900;line-height:1;margin:0;white-space:nowrap;">
                  <span style="background:linear-gradient(to right,#22d3ee,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Airdrop</span><span style="color:white;">Lab</span>
                </h1>
                <p style="font-size:9px;color:#64748b;margin:1px 0 0;display:flex;align-items:center;gap:3px;">
                  <span style="width:5px;height:5px;background:#34d399;border-radius:50%;flex-shrink:0;"></span>
                  <span id="modeIndicator" data-translate="experimental_zone" style="white-space:nowrap;">Экспериментальная зона</span>
                </p>
              </div>
            </div>

            <!-- Статистика (только desktop) -->
            <div class="al-desk-stats" style="gap:6px;flex-shrink:0;">
              <div style="text-align:center;cursor:pointer;padding:3px 7px;border-radius:7px;" onclick="typeof filterProjects==='function'&&filterProjects('active')">
                <div style="font-size:17px;font-weight:900;background:linear-gradient(135deg,#34d399,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statActive">0</div>
                <div style="font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="active">Акт.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:3px 7px;border-radius:7px;" onclick="typeof filterProjects==='function'&&filterProjects('today')">
                <div style="font-size:17px;font-weight:900;background:linear-gradient(135deg,#22d3ee,#0891b2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statToday">0</div>
                <div style="font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="new">Нов.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:3px 7px;border-radius:7px;" onclick="typeof filterProjects==='function'&&filterProjects('favorites')">
                <div style="font-size:17px;font-weight:900;background:linear-gradient(135deg,#fb923c,#ea580c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statFavorites">0</div>
                <div style="font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="in_work">Раб.</div>
              </div>
              <div style="text-align:center;cursor:pointer;padding:3px 7px;border-radius:7px;" onclick="typeof filterProjects==='function'&&filterProjects('completed')">
                <div style="font-size:17px;font-weight:900;background:linear-gradient(135deg,#60a5fa,#2563eb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;" id="statCompleted">0</div>
                <div style="font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;" data-translate="done">Гот.</div>
              </div>
            </div>

            <!-- Кнопки -->
            <div style="display:flex;align-items:center;gap:3px;flex-shrink:0;min-width:0;">

              <!-- Claim -->
              <button onclick="window.openClaimModal&&window.openClaimModal()" id="headerClaimBtn"
                style="position:relative;display:flex;align-items:center;gap:3px;padding:5px 7px;
                       background:rgba(8,145,178,0.2);border:1px solid rgba(34,211,238,0.3);
                       border-radius:9px;color:#22d3ee;cursor:pointer;font-size:14px;white-space:nowrap;">
                🧪
                <span id="claimDot" style="display:none;position:absolute;top:-2px;right:-2px;
                  width:7px;height:7px;background:#34d399;border-radius:50%;border:1.5px solid #0b0f19;"></span>
              </button>

              <!-- Уведомления -->
              <div id="notificationPanel" style="position:relative;flex-shrink:0;">
                <button onclick="typeof showNotifications==='function'&&showNotifications()"
                  style="position:relative;padding:6px 7px;color:#94a3b8;background:transparent;
                         border:1px solid transparent;border-radius:9px;cursor:pointer;font-size:14px;">
                  <i class="fas fa-bell"></i>
                  <span id="notificationBadge" style="display:none;position:absolute;top:-3px;right:-3px;
                    min-width:14px;height:14px;background:linear-gradient(135deg,#ef4444,#f97316);
                    border-radius:999px;font-size:8px;font-weight:700;color:white;
                    align-items:center;justify-content:center;padding:0 2px;">0</span>
                </button>
              </div>

              <!-- Feedback -->
              <div id="generalFeedbackPanel" style="display:none;position:relative;flex-shrink:0;">
                <button onclick="typeof openFeedbackListModal==='function'&&openFeedbackListModal()"
                  style="position:relative;padding:6px 7px;color:#94a3b8;background:transparent;
                         border:1px solid transparent;border-radius:9px;cursor:pointer;font-size:14px;">
                  <i class="fas fa-comment-dots"></i>
                  <span id="feedbackBadge" style="display:none;position:absolute;top:-3px;right:-3px;
                    min-width:14px;height:14px;background:linear-gradient(135deg,#8b5cf6,#ec4899);
                    border-radius:999px;font-size:8px;font-weight:700;color:white;
                    align-items:center;justify-content:center;padding:0 2px;">0</span>
                </button>
              </div>

              <!-- Язык -->
              <button onclick="typeof toggleLang==='function'&&toggleLang()" id="langBtn"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all">
                <span class="lang-flag"></span>
                <span class="lang-text">ENG</span>
              </button>

              <!-- Admin (inline: только кнопка добавить + badge) -->
              <div id="adminPanel" style="display:none;align-items:center;gap:3px;
                border-left:1px solid rgba(71,85,105,0.4);padding-left:5px;margin-left:2px;flex-shrink:0;">
                <button onclick="typeof openAddModal==='function'&&openAddModal()"
                  style="display:flex;align-items:center;gap:3px;padding:5px 8px;
                         background:linear-gradient(135deg,#0891b2,#2563eb);border:none;
                         border-radius:8px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">
                  <i class="fas fa-flask" style="font-size:10px;"></i>
                  <span class="hidden sm:inline" data-translate="new_test">Новый тест</span>
                </button>
                <span style="padding:3px 5px;background:linear-gradient(135deg,#0891b2,#06b6d4);
                  border-radius:6px;font-size:8px;font-weight:900;color:white;
                  text-transform:uppercase;white-space:nowrap;flex-shrink:0;">
                  <i class="fas fa-user-shield"></i> Admin
                </span>
              </div>

              <!-- Auth -->
              <div id="authPanel" style="display:flex;align-items:center;gap:3px;
                border-left:1px solid rgba(71,85,105,0.4);padding-left:5px;margin-left:2px;flex-shrink:0;">
                <div id="loggedOutView">
                  <button onclick="typeof openLoginModal==='function'&&openLoginModal()"
                    style="display:flex;align-items:center;gap:3px;padding:5px 8px;
                           background:linear-gradient(135deg,#0891b2,#2563eb);border:none;
                           border-radius:9px;color:white;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">
                    <i class="fas fa-sign-in-alt"></i>
                    <span class="hidden sm:inline" data-translate="login">Вход</span>
                  </button>
                </div>
                <div id="loggedInView" style="display:none;align-items:center;gap:4px;">
                  <div class="hidden md:block" id="userNameWrapper" style="text-align:right;cursor:pointer;line-height:1.2;">
                    <div id="userName" style="font-size:10px;font-weight:700;color:white;white-space:nowrap;">Researcher</div>
                    <div style="font-size:8px;color:#34d399;display:flex;align-items:center;justify-content:flex-end;gap:2px;">
                      <span style="width:4px;height:4px;background:#34d399;border-radius:50%;display:inline-block;"></span>
                      <span data-translate="in_system">В системе</span>
                    </div>
                  </div>
                  <div style="position:relative;flex-shrink:0;" id="userAvatarWrapper">
                    <div style="position:absolute;inset:-1px;background:linear-gradient(135deg,#22d3ee,#3b82f6);border-radius:50%;opacity:0.5;pointer-events:none;"></div>
                    <img id="userAvatar" src=""
                      style="position:relative;width:27px;height:27px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(34,211,238,0.5);">
                  </div>
                  <button onclick="typeof logout==='function'&&logout()"
                    style="padding:5px;color:#64748b;background:transparent;border:none;border-radius:7px;cursor:pointer;font-size:12px;">
                    <i class="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- ── СТРОКА 2: Admin Actions (показывается только для админа) ── -->
          <div id="adminActionsRow">
            <button onclick="typeof openStats==='function'&&openStats()"
              class="admin-action-btn admin-btn-orange" style="padding:4px 10px;font-size:11px;gap:4px;">
              <i class="fas fa-chart-pie"></i>
              <span data-translate="view_stats">Статистика</span>
            </button>
            <button onclick="typeof migrateToFirestore==='function'&&migrateToFirestore()"
              class="admin-action-btn admin-btn-purple" style="padding:4px 10px;font-size:11px;gap:4px;">
              <i class="fas fa-cloud-upload-alt"></i>
              <span data-translate="upload_firebase">В Firebase</span>
            </button>
            <button onclick="typeof exportAllData==='function'&&exportAllData()"
              class="admin-action-btn admin-btn-emerald" style="padding:4px 10px;font-size:11px;gap:4px;">
              <i class="fas fa-file-export"></i>
              <span data-translate="export_json">Экспорт JSON</span>
            </button>
            <button onclick="typeof openDeletedProjects==='function'&&openDeletedProjects()"
              class="admin-action-btn admin-btn-red" style="padding:4px 10px;font-size:11px;gap:4px;">
              <i class="fas fa-trash-restore"></i>
              <span data-translate="view_deleted">Удалённые</span>
            </button>
          </div>

          <!-- ── СТРОКА 3: Мобильная статистика (только < md) ── -->
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
      <div style="background:rgba(11,15,25,0.95);border-bottom:1px solid rgba(51,65,85,0.5);
                  width:100%;max-width:100vw;overflow:hidden;box-sizing:border-box;">
        <div style="max-width:min(1600px,100%);margin:0 auto;padding:3px 6px;
                    overflow:hidden;box-sizing:border-box;">
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

    // CryptoRank
    const crScript = document.createElement('script');
    crScript.src = 'https://cryptorank.io/widget/marquee.js';
    document.body.appendChild(crScript);

    setTimeout(function () {
      if (typeof updateLanguageButton === 'function') updateLanguageButton();
      if (typeof updateAllTranslations === 'function') updateAllTranslations();
    }, 0);

    // ── MutationObserver: показываем adminActionsRow когда admin активен ──
    // activateAdminMode() делает adminPanel.style.display = 'flex' — ловим это
    const adminPanel = document.getElementById('adminPanel');
    const adminActionsRow = document.getElementById('adminActionsRow');
    if (adminPanel && adminActionsRow) {
      new MutationObserver(function () {
        var shown = adminPanel.style.display !== 'none' && adminPanel.style.display !== '';
        adminActionsRow.style.display = shown ? 'flex' : 'none';
      }).observe(adminPanel, { attributes: true, attributeFilter: ['style'] });
    }

    // ── Синхронизируем мобильные статы с десктопными ──
    function syncMobileStats() {
      [
        ['statActive',    'mStatActive'],
        ['statToday',     'mStatToday'],
        ['statFavorites', 'mStatFavorites'],
        ['statCompleted', 'mStatCompleted']
      ].forEach(function (pair) {
        var from = document.getElementById(pair[0]);
        var to   = document.getElementById(pair[1]);
        if (!from || !to) return;
        to.textContent = from.textContent;
        new MutationObserver(function () {
          to.textContent = from.textContent;
        }).observe(from, { childList: true, characterData: true, subtree: true });
      });
    }
    setTimeout(syncMobileStats, 400);

    // ── CSS-переменная высоты хедера ──
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
