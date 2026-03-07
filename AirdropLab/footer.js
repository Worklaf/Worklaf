// ============ FOOTER MODULE ============
(function() {
    // Инициализация футера при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        createFooter();
        initializeFooterFunctions();
    });

    // Функция создания футера
    function createFooter() {
        // Проверяем, не создан ли футер уже
        if (document.getElementById('site-footer')) return;
        
        // Создаем футер
        const footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.className = 'bg-slate-950/80 border-t border-slate-800/50 backdrop-blur-sm relative overflow-hidden';
        
        // HTML-структура футера
        footer.innerHTML = `
            <!-- Background gradient & pattern -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-cyan-900/10"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgc3Ryb2tlPSJyZ2JhKDIyLDIxMCwyMzgsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30"></div>
            
            <!-- Main Footer Content -->
            <div class="max-w-[1600px] mx-auto px-4 py-16">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    <!-- Logo & Description -->
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="relative group">
                                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div class="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/30 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                                    <svg class="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6">
                                            <animate attributeName="cy" values="14;12;14" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                        <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8">
                                            <animate attributeName="cy" values="16;13;16" dur="2.5s" repeatCount="indefinite"/>
                                        </circle>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-xl font-black tracking-tight">
                                    <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span>
                                    <span class="text-white">Lab</span>
                                </h3>
                                <p class="text-xs text-slate-400 mt-1 tracking-wider uppercase">v2.0</p>
                            </div>
                        </div>
                        
                        <p class="text-sm text-slate-400 leading-relaxed max-w-xs" data-translate="footer_description">
                            Лаборатория крипто-возможностей. Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.
                        </p>
                        
                        <!-- Social Links -->
                        <div class="flex gap-3 pt-2">
                            <a href="https://twitter.com/yourhandle" target="_blank" class="group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" title="Twitter">
                                <i class="fab fa-twitter text-lg group-hover:animate-bounce"></i>
                            </a>
                            <a href="https://t.me/yourchannel" target="_blank" class="group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" title="Telegram">
                                <i class="fab fa-telegram-plane text-lg group-hover:animate-bounce"></i>
                            </a>
                            <a href="https://discord.gg/yourserver" target="_blank" class="group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" title="Discord">
                                <i class="fab fa-discord text-lg group-hover:animate-bounce"></i>
                            </a>
                            <a href="https://youtube.com/yourchannel" target="_blank" class="group p-2.5 text-slate-400 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30" title="YouTube">
                                <i class="fab fa-youtube text-lg group-hover:animate-bounce"></i>
                            </a>
                            <a href="mailto:hello@airdroplab.com" class="group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" title="Email">
                                <i class="fas fa-envelope text-lg group-hover:animate-bounce"></i>
                            </a>
                        </div>
                        
                        <!-- Status Indicators -->
                        <div class="flex items-center gap-4 pt-3">
                            <div class="flex items-center gap-1.5">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                                </span>
                                <span class="text-xs text-emerald-400 font-medium" data-translate="footer_live">Live</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-lg shadow-cyan-400/50"></span>
                                </span>
                                <span class="text-xs text-cyan-400 font-medium" data-translate="footer_updated">Обновлено</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-sm font-bold text-white mb-4 flex items-center gap-2" data-translate="footer_links">
                            <i class="fas fa-link text-cyan-400"></i> Быстрые ссылки
                        </h4>
                        <div class="space-y-2">
                            <a href="#heroSection" onclick="scrollToSection('heroSection')" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-home text-xs"></i>
                                <span class="text-sm">Главная</span>
                            </a>
                            <a href="#projects" onclick="scrollToSection('projects')" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-layer-group text-xs"></i>
                                <span class="text-sm" data-translate="footer_projects">Проекты</span>
                            </a>
                            <a href="#" onclick="openGuideFromDetail()" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-book-open text-xs"></i>
                                <span class="text-sm" data-translate="footer_guides">Гайды</span>
                            </a>
                            <a href="#" onclick="openFeedbackModal(null, 'General')" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-comment-dots text-xs"></i>
                                <span class="text-sm" data-translate="footer_support">Поддержка</span>
                            </a>
                            <a href="https://cryptorank.io" target="_blank" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-chart-line text-xs"></i>
                                <span class="text-sm">CryptoRank</span>
                            </a>
                            <a href="#" onclick="openStats()" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors hidden admin-only">
                                <i class="fas fa-chart-pie text-xs"></i>
                                <span class="text-sm" data-translate="footer_stats">Статистика</span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Support & Resources -->
                    <div>
                        <h4 class="text-sm font-bold text-white mb-4 flex items-center gap-2" data-translate="footer_support">
                            <i class="fas fa-life-ring text-emerald-400"></i> Поддержка
                        </h4>
                        <div class="space-y-2">
                            <a href="#" onclick="openFeedbackModal(null, 'FAQ')" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-question-circle text-xs"></i>
                                <span class="text-sm" data-translate="footer_faq">FAQ</span>
                            </a>
                            <a href="#" onclick="openFeedbackModal(null, 'HowTo')" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-play-circle text-xs"></i>
                                <span class="text-sm" data-translate="footer_tutorials">Туториалы</span>
                            </a>
                            <a href="#" onclick="openLoginModal()" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-user text-xs"></i>
                                <span class="text-sm" data-translate="footer_account">Аккаунт</span>
                            </a>
                            <a href="#" onclick="showNotifications()" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-bell text-xs"></i>
                                <span class="text-sm" data-translate="footer_notifications">Уведомления</span>
                            </a>
                            <a href="#" onclick="toggleLang()" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-globe text-xs"></i>
                                <span class="text-sm" data-translate="footer_language">Язык</span>
                            </a>
                            <div class="pt-2">
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <i class="fas fa-users text-emerald-400"></i>
                                    <span id="footerUserCount" class="font-medium">0</span> активных
                                </div>
                                <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                    <i class="fas fa-project-diagram text-cyan-400"></i>
                                    <span id="footerProjectCount" class="font-medium">0</span> проектов
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Legal & Contact -->
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="text-sm font-bold text-white mb-4 flex items-center gap-2" data-translate="footer_legal">
                            <i class="fas fa-gavel text-purple-400"></i> Юридическая информация
                        </h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <h5 class="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Документы</h5>
                                <div class="space-y-1 text-sm">
                                    <a href="#" onclick="showComingSoon('terms')" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block" data-translate="footer_terms">Условия использования</a>
                                    <a href="#" onclick="showComingSoon('privacy')" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block" data-translate="footer_privacy">Политика конфиденциальности</a>
                                    <a href="#" onclick="showComingSoon('cookie')" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block" data-translate="footer_cookie">Политика cookies</a>
                                    <a href="#" onclick="showComingSoon('disclaimer')" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block" data-translate="footer_disclaimer">Отказ от ответственности</a>
                                </div>
                            </div>
                            <div>
                                <h5 class="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Контакты</h5>
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                                        <i class="fas fa-envelope text-cyan-400"></i>
                                        <a href="mailto:support@airdroplab.com" class="hover:underline">support@airdroplab.com</a>
                                    </div>
                                    <div class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                                        <i class="fas fa-map-marker-alt text-orange-400"></i>
                                        <span>Worldwide (Remote)</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                                        <i class="fas fa-clock text-blue-400"></i>
                                        <span data-translate="footer_support_hours">24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Newsletter Signup -->
                        <div class="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                            <h5 class="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2" data-translate="footer_newsletter">
                                <i class="fas fa-newspaper text-yellow-400"></i> Подписаться на обновления
                            </h5>
                            <p class="text-xs text-slate-500 mb-3" data-translate="footer_newsletter_desc">
                                Получайте уведомления о новых аирдропах и тестнетах
                            </p>
                            <div class="flex gap-2">
                                <input type="email" id="footerEmailInput" placeholder="Ваш email" class="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors" data-translate-placeholder="footer_email_placeholder">
                                <button onclick="subscribeNewsletter()" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                                    <span data-translate="footer_subscribe">Подписаться</span>
                                </button>
                            </div>
                            <p class="text-xs text-slate-500 mt-2 text-center">
                                <i class="fas fa-lock text-emerald-400 mr-1"></i>
                                <span data-translate="footer_privacy_note">Мы уважаем вашу конфиденциальность</span>
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="border-t border-slate-800/50">
                <div class="max-w-[1600px] mx-auto px-4 py-6">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        
                        <!-- Copyright -->
                        <div class="text-sm text-slate-500">
                            <span data-translate="footer_copyright">
                                © 2025-2026 AirdropLab. Все права защищены.
                            </span>
                            <span class="hidden md:inline mx-2">•</span>
                            <a href="#" class="text-slate-400 hover:text-white transition-colors" data-translate="footer_made_with">Сделано с</a>
                            <i class="fas fa-heart text-red-400 ml-1"></i>
                            <span class="text-slate-400">любовью к крипте</span>
                        </div>
                        
                        <!-- Credits & Tech Stack -->
                        <div class="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-slate-500">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-database text-cyan-400"></i>
                                <span>Firebase</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fab fa-css3-alt text-blue-400"></i>
                                <span>Tailwind CSS</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-font text-purple-400"></i>
                                <span>Font Awesome</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-code text-emerald-400"></i>
                                <span>JavaScript</span>
                            </div>
                            
                            <!-- Language Toggle in Footer (Mobile) -->
                            <div class="md:hidden flex items-center gap-2 ml-4 pl-4 border-l border-slate-700">
                                <button onclick="toggleLang()" id="footerLangBtn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg border border-slate-700/50 text-xs transition-all">
                                    <span class="lang-flag-footer"></span>
                                    <span class="lang-text-footer text-slate-400">ENG</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Additional Legal Links (Mobile) -->
                    <div class="md:hidden pt-4 border-t border-slate-800/50 mt-4">
                        <div class="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
                            <a href="#" onclick="showComingSoon('terms')" class="hover:text-white transition-colors" data-translate="footer_terms_mobile">Условия</a>
                            <a href="#" onclick="showComingSoon('privacy')" class="hover:text-white transition-colors" data-translate="footer_privacy_mobile">Приватность</a>
                            <a href="#" onclick="openFeedbackModal(null, 'General')" class="hover:text-white transition-colors" data-translate="footer_support_mobile">Поддержка</a>
                            <span class="text-slate-600">•</span>
                            <a href="https://cryptorank.io" target="_blank" class="hover:text-cyan-400 transition-colors">CryptoRank</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Back to Top Button -->
            <button onclick="scrollToTop()" id="backToTop" class="fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-40" title="Наверх">
                <i class="fas fa-chevron-up"></i>
            </button>
        </footer>
        
        <!-- Newsletter Modal (Hidden by default) -->
        <div id="newsletterModal" class="modal hidden">
            <div class="modal-content modal-sm p-6">
                <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
                <div class="text-center">
                    <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                        <i class="fas fa-check text-2xl text-emerald-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2" data-translate="newsletter_success_title">Подписка оформлена!</h3>
                    <p class="text-slate-400 mb-4" data-translate="newsletter_success_text">
                        Вы будете получать уведомления о новых аирдропах и важных обновлениях.
                    </p>
                    <div class="flex gap-3">
                        <button onclick="closeNewsletterModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm" data-translate="newsletter_close">Закрыть</button>
                        <button onclick="openFeedbackModal(null, 'Newsletter')" class="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-bold" data-translate="newsletter_manage">Управление</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Добавляем стили для футера -->
        <style>
            /* Footer Styles */
            footer {
                font-family: 'Inter', sans-serif;
            }

            .footer-link {
                display: block;
                transition: all 0.2s ease-in-out;
            }

            .footer-link:hover {
                transform: translateX(4px);
                padding-left: 8px;
            }

            .footer-link i {
                transition: transform 0.2s ease;
            }

            .footer-link:hover i {
                transform: scale(1.1);
            }

            /* Newsletter Input Focus */
            footer input:focus {
                ring: 2px ring-cyan-500/30;
                box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
            }

            /* Back to Top Button */
            #backToTop {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            #backToTop:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 25px rgba(34, 211, 238, 0.3);
            }

            /* Footer Language Button */
            #langBtn, #footerLangBtn {
                position: relative;
            }

            .lang-flag-footer, .lang-text-footer {
                transition: all 0.2s;
            }

            #langBtn.lang-active .lang-text-footer,
            #footerLangBtn.lang-active .lang-text-footer {
                color: white;
                font-weight: bold;
            }

            /* Responsive Footer */
            @media (max-width: 768px) {
                footer .grid {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                footer [class*="col-span"] {
                    grid-column: 1 / -1 !important;
                }
                
                .footer-link {
                    padding: 0.375rem 0;
                }
                
                #backToTop {
                    bottom: 4rem;
                    right: 1rem;
                    width: 48px;
                    height: 48px;
                }
            }

            /* Scroll to Section Animation */
            html {
                scroll-behavior: smooth;
            }

            /* Newsletter Modal */
            #newsletterModal .modal-content {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            /* Active Admin Links */
            .admin-only {
                display: none;
            }

            .admin-mode .admin-only {
                display: flex !important;
            }

            /* Footer Stats Update Animation */
            #footerUserCount, #footerProjectCount {
                transition: all 0.3s;
            }

            .stats-updated {
                animation: pulse 1s;
                color: #22d3ee !important;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
        </style>
        
        <!-- Добавляем футер в конец body -->
        `;
        
        document.body.appendChild(footer);
    }

    // Инициализация функций футера
    function initializeFooterFunctions() {
        // Кнопка "Наверх"
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.remove('hidden');
                } else {
                    backToTopBtn.classList.add('hidden');
                }
            });
        }

        // Обновление статистики
        updateFooterStats();
        
        // Инициализация кнопки языка в футере
        updateFooterLanguageButton();
        
        // Добавляем обработчики для ссылок
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Плавная прокрутка к секциям
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Функции футера
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showToast('Наверх');
    };

    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    window.subscribeNewsletter = function() {
        const emailInput = document.getElementById('footerEmailInput');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            showToast('Введите корректный email');
            emailInput.focus();
            emailInput.classList.add('ring-2', 'ring-red-500/50');
            setTimeout(() => emailInput.classList.remove('ring-2', 'ring-red-500/50'), 2000);
            return;
        }
        
        // Симуляция подписки (в реальности здесь будет API вызов)
        emailInput.value = '';
        emailInput.placeholder = 'Спасибо за подписку!';
        emailInput.classList.add('bg-emerald-500/20', 'border-emerald-500/50', 'text-emerald-400');
        
        setTimeout(() => {
            const modal = document.getElementById('newsletterModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('active');
            }
        }, 800);
        
        // Аналитика события (если используете)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_subscribe', {
                'email': email,
                'method': 'footer'
            });
        }
        
        showToast('Подписка оформлена!');
    };

    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.classList.remove('active');
        }
    };

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Обновление статистики в футере
    function updateFooterStats() {
        const userCount = window.currentUser ? 1 : 0;
        const projectCount = window.projects ? window.projects.length : 0;
        
        const userEl = document.getElementById('footerUserCount');
        const projectEl = document.getElementById('footerProjectCount');
        
        if (userEl) {
            userEl.textContent = userCount;
            if (userCount > 0) userEl.classList.add('stats-updated');
            setTimeout(() => userEl.classList.remove('stats-updated'), 1000);
        }
        
        if (projectEl) {
            projectEl.textContent = projectCount;
            if (projectCount > 0) projectEl.classList.add('stats-updated');
            setTimeout(() => projectEl.classList.remove('stats-updated'), 1000);
        }
    }

    // Обновление кнопки языка в футере
    function updateFooterLanguageButton() {
        const footerLangBtn = document.getElementById('footerLangBtn');
        const langFlag = document.querySelector('.lang-flag-footer');
        const langText = document.querySelector('.lang-text-footer');
        
        if (footerLangBtn && langFlag && langText && window.currentLang) {
            const langConfig = window.currentLang === 'en' ? 
                { flag: '🇺🇸', text: 'ENG' } : 
                { flag: '🇷🇺', text: 'РУС' };
            
            langFlag.textContent = langConfig.flag;
            langText.textContent = langConfig.text;
            
            footerLangBtn.classList.toggle('lang-active', window.currentLang === 'en');
        }
    }

    // Показываем уведомление о скором появлении страниц
    window.showComingSoon = function(page) {
        const pageNames = {
            'terms': 'Условия использования',
            'privacy': 'Политика конфиденциальности',
            'cookie': 'Политика cookies',
            'disclaimer': 'Отказ от ответственности',
            'guides': 'Гайды'
        };
        const pageName = pageNames[page] || page;
        showToast('Страница "' + pageName + '" в разработке');
    };

    // Обновляем статистику при изменении данных
    if (window.updateAllTranslations) {
        const originalUpdateTranslations = window.updateAllTranslations;
        window.updateAllTranslations = function() {
            originalUpdateTranslations();
            updateFooterLanguageButton();
        };
    }

    // Обновляем статистику при загрузке данных
    if (window.loadData) {
        const originalLoadData = window.loadData;
        window.loadData = async function() {
            await originalLoadData();
            setTimeout(updateFooterStats, 500);
        };
    }

    // Обновляем статистику в режиме администратора
    if (window.activateAdminMode) {
        const originalActivateAdminMode = window.activateAdminMode;
        window.activateAdminMode = function() {
            originalActivateAdminMode();
            document.body.classList.add('admin-mode');
            updateFooterStats();
        };
    }
})();
