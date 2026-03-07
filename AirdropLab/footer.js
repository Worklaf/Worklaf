/**
 * ============================================
 * AirdropLab Footer Module v2.0
 * Универсальный футер для любого сайта
 * ============================================
 */

(function() {
    'use strict';

    // Конфигурация футера
    const FOOTER_CONFIG = {
        // Настройки компании
        company: {
            name: 'AirdropLab',
            version: 'v2.0',
            tagline: 'Лаборатория крипто-возможностей'
        },
        // Социальные сети
        social: {
            twitter: 'https://twitter.com/airdroplab',
            telegram: 'https://t.me/airdroplab',
            discord: 'https://discord.gg/airdroplab',
            youtube: 'https://youtube.com/@airdroplab',
            email: 'support@airdroplab.com'
        },
        // Ссылки
        links: {
            projects: '#projects',
            guides: '#',
            support: '#',
            stats: '#',
            faq: '#',
            tutorials: '#',
            account: '#',
            notifications: '#',
            terms: '#',
            privacy: '#',
            cookie: '#',
            disclaimer: '#'
        },
        // Внешние ресурсы
        external: {
            cryptoRank: 'https://cryptorank.io'
        }
    };

    // Проверка, загружена ли страница
    function DOMReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Основная функция инициализации
    function initFooter() {
        // Проверяем, не создан ли футер уже
        if (document.getElementById('site-footer')) {
            console.log('Footer already exists');
            return;
        }

        // Создаем футер
        createFooter();
        
        // Инициализируем функции после добавления в DOM
        setTimeout(initializeFooterFunctions, 150);
    }

    // Функция создания футера
    function createFooter() {
        const footer = document.createElement('footer');
        footer.id = 'site-footer';
        
        // Основные классы
        footer.className = 'site-footer bg-slate-950/95 border-t border-slate-800/50 backdrop-blur-sm relative overflow-hidden';
        
        // HTML-структура футера
        footer.innerHTML = getFooterHTML();
        
        document.body.appendChild(footer);
        
        // Добавляем стили
        addFooterStyles();
    }

    // Получение HTML-кода футера
    function getFooterHTML() {
        return `
            <!-- Background Effects -->
            <div class="footer-bg-gradient absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-cyan-900/15"></div>
            <div class="footer-bg-pattern absolute inset-0 opacity-25" 
                 style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyMiwyMTAsMjM4LDAuMDgpIiBzdHJva2U9InJnYmEoMjIsMjEwLDIzOCwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+');">
            </div>
            
            <!-- Main Content -->
            <div class="footer-main max-w-[1600px] mx-auto px-4 py-16 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    <!-- Logo & Description -->
                    <div class="footer-section footer-brand">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="footer-logo-wrapper relative group">
                                <div class="footer-logo-glow absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div class="footer-logo relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/30 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
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
                                <h3 class="footer-brand-title text-xl font-black tracking-tight">
                                    <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span>
                                    <span class="text-white">Lab</span>
                                </h3>
                                <p class="text-xs text-slate-400 mt-1 tracking-wider uppercase">${FOOTER_CONFIG.company.version}</p>
                            </div>
                        </div>
                        
                        <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6" data-translate="footer_description">
                            ${FOOTER_CONFIG.company.tagline}. Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.
                        </p>
                        
                        <!-- Social Links -->
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" 
                               title="Twitter">
                                <i class="fab fa-twitter text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" 
                               title="Telegram">
                                <i class="fab fa-telegram-plane text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" 
                               title="Discord">
                                <i class="fab fa-discord text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.youtube}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30" 
                               title="YouTube">
                                <i class="fab fa-youtube text-lg"></i>
                            </a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}" 
                               class="social-link group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" 
                               title="Email">
                                <i class="fas fa-envelope text-lg"></i>
                            </a>
                        </div>
                        
                        <!-- Status Indicators -->
                        <div class="footer-status flex items-center gap-4">
                            <div class="status-item flex items-center gap-1.5">
                                <span class="status-dot relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                                </span>
                                <span class="text-xs text-emerald-400 font-medium" data-translate="footer_live">Live</span>
                            </div>
                            <div class="status-item flex items-center gap-1.5">
                                <span class="status-dot relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-lg shadow-cyan-400/50"></span>
                                </span>
                                <span class="text-xs text-cyan-400 font-medium" data-translate="footer_updated">Обновлено</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-link text-cyan-400"></i> 
                            <span data-translate="footer_links">Быстрые ссылки</span>
                        </h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#heroSection" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-home text-xs w-4"></i>
                                <span class="text-sm">Главная</span>
                            </a>
                            <a href="#projects" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-layer-group text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_projects">Проекты</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="guides">
                                <i class="fas fa-book-open text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_guides">Гайды</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="support">
                                <i class="fas fa-headset text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_support">Поддержка</span>
                            </a>
                            <a href="${FOOTER_CONFIG.external.cryptoRank}" target="_blank" rel="noopener noreferrer" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-chart-line text-xs w-4"></i>
                                <span class="text-sm">CryptoRank</span>
                                <i class="fas fa-external-link-alt text-xs text-slate-500"></i>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors admin-only hidden" data-action="coming-soon" data-page="stats">
                                <i class="fas fa-chart-pie text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_stats">Статистика</span>
                            </a>
                        </nav>
                    </div>
                    
                    <!-- Support & Resources -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-life-ring text-emerald-400"></i> 
                            <span data-translate="footer_support">Поддержка</span>
                        </h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="faq">
                                <i class="fas fa-question-circle text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_faq">FAQ</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="tutorials">
                                <i class="fas fa-play-circle text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_tutorials">Туториалы</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="account">
                                <i class="fas fa-user text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_account">Аккаунт</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="notifications">
                                <i class="fas fa-bell text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_notifications">Уведомления</span>
                            </a>
                            <a href="#" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors" onclick="typeof toggleLang === 'function' ? toggleLang() : footerToggleLang()">
                                <i class="fas fa-globe text-xs w-4"></i>
                                <span class="text-sm" data-translate="footer_language">Язык</span>
                            </a>
                            <div class="pt-3 mt-2 border-t border-slate-800/50">
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <i class="fas fa-users text-emerald-400"></i>
                                    <span id="footerUserCount" class="font-medium text-slate-400">0</span> активных
                                </div>
                                <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                    <i class="fas fa-project-diagram text-cyan-400"></i>
                                    <span id="footerProjectCount" class="font-medium text-slate-400">0</span> проектов
                                </div>
                            </div>
                        </nav>
                    </div>
                    
                    <!-- Legal & Newsletter -->
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-gavel text-purple-400"></i> 
                            <span data-translate="footer_legal">Юридическая информация</span>
                        </h4>
                        
                        <!-- Legal Links Grid -->
                        <div class="footer-legal-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Документы</h5>
                                <nav class="space-y-1">
                                    <a href="#" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1" data-action="coming-soon" data-page="terms" data-translate="footer_terms">Условия использования</a>
                                    <a href="#" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1" data-action="coming-soon" data-page="privacy" data-translate="footer_privacy">Политика конфиденциальности</a>
                                    <a href="#" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1" data-action="coming-soon" data-page="cookie" data-translate="footer_cookie">Политика cookies</a>
                                    <a href="#" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1" data-action="coming-soon" data-page="disclaimer" data-translate="footer_disclaimer">Отказ от ответственности</a>
                                </nav>
                            </div>
                            <div>
                                <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Контакты</h5>
                                <nav class="space-y-2 text-sm">
                                    <a href="mailto:${FOOTER_CONFIG.social.email}" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                        <i class="fas fa-envelope text-cyan-400 w-4"></i>
                                        <span>support@airdroplab.com</span>
                                    </a>
                                    <div class="flex items-center gap-2 text-slate-400">
                                        <i class="fas fa-map-marker-alt text-orange-400 w-4"></i>
                                        <span>Worldwide (Remote)</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-slate-400">
                                        <i class="fas fa-clock text-blue-400 w-4"></i>
                                        <span data-translate="footer_support_hours">24/7</span>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        
                        <!-- Newsletter Signup -->
                        <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                            <div class="flex items-start gap-3 mb-3">
                                <div class="newsletter-icon w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-newspaper text-cyan-400"></i>
                                </div>
                                <div>
                                    <h5 class="text-sm font-semibold text-white flex items-center gap-2" data-translate="footer_newsletter">
                                        <i class="fas fa-paper-plane text-yellow-400"></i> 
                                        Подписаться на обновления
                                    </h5>
                                    <p class="text-xs text-slate-500 mt-1" data-translate="footer_newsletter_desc">
                                        Получайте уведомления о новых аирдропах и тестнетах
                                    </p>
                                </div>
                            </div>
                            
                            <form class="newsletter-form flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                                <div class="flex-1 relative">
                                    <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                    <input type="email" 
                                           id="footerEmailInput" 
                                           placeholder="Ваш email" 
                                           required
                                           class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg px-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                                           data-translate-placeholder="footer_email_placeholder">
                                </div>
                                <button type="submit" 
                                        id="subscribeBtn" 
                                        class="subscribe-btn px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-2">
                                    <span data-translate="footer_subscribe">Подписаться</span>
                                    <i class="fas fa-paper-plane text-xs"></i>
                                </button>
                            </form>
                            
                            <div class="footer-privacy-note flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                                <i class="fas fa-shield-alt text-emerald-400 text-xs"></i>
                                <span class="text-xs text-slate-500" data-translate="footer_privacy_note">Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="footer-bottom border-t border-slate-800/50 relative z-10">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        
                        <!-- Copyright -->
                        <div class="footer-copyright text-sm text-slate-500">
                            <span data-translate="footer_copyright">
                                © ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. Все права защищены.
                            </span>
                            <span class="hidden md:inline mx-2">•</span>
                            <a href="#" class="text-slate-400 hover:text-white transition-colors" data-action="coming-soon" data-page="made">Сделано с</a>
                            <i class="fas fa-heart text-red-400 mx-1"></i>
                            <span class="text-slate-400">любовью к крипте</span>
                        </div>
                        
                        <!-- Tech Stack & Language -->
                        <div class="footer-tech flex flex-wrap justify-center md:justify-end gap-4 text-xs text-slate-500">
                            <div class="tech-item flex items-center gap-2">
                                <i class="fas fa-database text-cyan-400"></i>
                                <span>Firebase</span>
                            </div>
                            <div class="tech-item flex items-center gap-2">
                                <i class="fab fa-css3-alt text-blue-400"></i>
                                <span>Tailwind CSS</span>
                            </div>
                            <div class="tech-item flex items-center gap-2">
                                <i class="fas fa-font text-purple-400"></i>
                                <span>Font Awesome</span>
                            </div>
                            <div class="tech-item flex items-center gap-2">
                                <i class="fas fa-code text-emerald-400"></i>
                                <span>JavaScript</span>
                            </div>
                            
                            <!-- Language Toggle (Mobile) -->
                            <div class="md:hidden flex items-center gap-2 ml-4 pl-4 border-l border-slate-700">
                                <button onclick="footerToggleLang()" id="footerLangBtn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg border border-slate-700/50 text-xs transition-all text-slate-300">
                                    <span class="lang-flag-footer">🇷🇺</span>
                                    <span class="lang-text-footer">РУС</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Legal Links -->
                    <div class="md:hidden pt-4 border-t border-slate-800/50 mt-4">
                        <div class="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
                            <a href="#" onclick="footerShowComingSoon('terms')" class="hover:text-white transition-colors" data-translate="footer_terms_mobile">Условия</a>
                            <a href="#" onclick="footerShowComingSoon('privacy')" class="hover:text-white transition-colors" data-translate="footer_privacy_mobile">Приватность</a>
                            <a href="#" onclick="footerShowComingSoon('support')" class="hover:text-white transition-colors" data-translate="footer_support_mobile">Поддержка</a>
                            <span class="text-slate-600">•</span>
                            <a href="${FOOTER_CONFIG.external.cryptoRank}" target="_blank" class="hover:text-cyan-400 transition-colors">CryptoRank</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Back to Top Button -->
            <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-50" title="Наверх">
                <i class="fas fa-chevron-up"></i>
            </button>
            
            <!-- Success Modal -->
            <div id="newsletterModal" class="newsletter-modal modal hidden" style="display: none;">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="text-center">
                        <div class="success-icon w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                            <i class="fas fa-check text-2xl text-emerald-400"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2" data-translate="newsletter_success_title">Подписка оформлена!</h3>
                        <p class="text-slate-400 mb-4 text-sm" data-translate="newsletter_success_text">
                            Вы будете получать уведомления о новых аирдропах и важных обновлениях.
                        </p>
                        <div class="flex gap-3">
                            <button onclick="closeNewsletterModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-colors" data-translate="newsletter_close">Закрыть</button>
                            <button onclick="footerShowComingSoon('newsletter')" class="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg text-sm font-bold transition-colors" data-translate="newsletter_manage">Управление</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Добавление стилей
    function addFooterStyles() {
        // Проверяем, не добавлены ли уже стили
        if (document.getElementById('footer-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles';
        styles.textContent = `
            /* Footer Base Styles */
            .site-footer {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: #e2e8f0;
            }

            /* Background Effects */
            .footer-bg-gradient {
                pointer-events: none;
            }
            
            .footer-bg-pattern {
                pointer-events: none;
            }

            /* Logo Animation */
            .footer-logo-wrapper {
                transform: perspective(1000px);
            }
            
            .footer-logo-wrapper:hover .footer-logo {
                rotate: Y 15deg;
            }

            /* Social Links */
            .social-link {
                position: relative;
                overflow: hidden;
            }
            
            .social-link::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at center, currentColor 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .social-link:hover::before {
                opacity: 0.1;
            }
            
            .social-link:active {
                transform: scale(0.95);
            }

            /* Footer Links */
            .footer-link {
                position: relative;
                padding: 4px 0;
                transition: all 0.2s ease;
            }
            
            .footer-link:hover {
                transform: translateX(6px);
            }
            
            .footer-link:hover i {
                transform: scale(1.2);
            }
            
            .footer-link i {
                transition: transform 0.2s ease;
            }

            /* Newsletter Form */
            .footer-email-input {
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .footer-email-input:focus {
                box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .footer-email-input.error {
                border-color: #ef4444 !important;
                animation: shake 0.5s;
            }
            
            .footer-email-input.success {
                border-color: #10b981 !important;
                background: rgba(16, 185, 129, 0.1) !important;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            .subscribe-btn {
                position: relative;
                overflow: hidden;
            }
            
            .subscribe-btn::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transform: translateX(-100%);
                transition: transform 0.5s;
            }
            
            .subscribe-btn:hover::before {
                transform: translateX(100%);
            }

            /* Back to Top */
            .back-to-top {
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                transform: translateY(-3px) scale(1.05) !important;
                box-shadow: 0 10px 30px rgba(34, 211, 238, 0.4) !important;
            }
            
            .back-to-top:active {
                transform: scale(0.95);
            }

            /* Status Indicators */
            .status-dot {
                animation: statusPulse 2s infinite;
            }
            
            @keyframes statusPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
            }

            /* Newsletter Modal */
            .newsletter-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(4px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .newsletter-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .newsletter-modal .modal-content {
                background: rgba(15, 23, 42, 0.98);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                max-width: 400px;
                width: 90%;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .newsletter-modal.active .modal-content {
                transform: scale(1);
            }

            .success-icon {
                animation: successPop 0.5s ease;
            }
            
            @keyframes successPop {
                0% { transform: scale(0); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            /* Admin Mode */
            .admin-mode .admin-only {
                display: flex !important;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .site-footer .grid {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .site-footer [class*="col-span"] {
                    grid-column: 1 / -1 !important;
                }
                
                .footer-link {
                    padding: 0.5rem 0;
                }
                
                .back-to-top {
                    bottom: 5rem;
                    right: 1rem;
                    width: 48px;
                    height: 48px;
                }
                
                .footer-newsletter {
                    padding: 1rem;
                }
                
                .newsletter-form {
                    flex-direction: column;
                }
                
                .subscribe-btn {
                    width: 100%;
                    justify-content: center;
                }
            }

            /* Smooth Scroll */
            html {
                scroll-behavior: smooth;
            }

            /* Loading Animation for Button */
            .subscribe-btn.loading {
                pointer-events: none;
                opacity: 0.7;
            }
            
            .subscribe-btn.loading::after {
                content: '';
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin-left: 8px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Focus States */
            .footer-link:focus,
            .social-link:focus {
                outline: 2px solid rgba(34, 211, 238, 0.5);
                outline-offset: 2px;
            }

            /* Hover Glow Effects */
            .footer-section:hover .footer-bg-gradient {
                opacity: 1;
            }
        `;

        document.head.appendChild(styles);
    }

    // Инициализация функций футера
    function initializeFooterFunctions() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        // Back to Top Button
        initBackToTop();

        // Newsletter Subscription
        initNewsletterForm();

        // Footer Links
        initFooterLinks();

        // Stats Update
        updateFooterStats();

        // Language Button
        updateFooterLanguageButton();

        // Smooth scroll for anchor links
        initSmoothScroll();

        console.log('Footer initialized successfully');
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        // Show/hide based on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Click handler
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Global function for scroll to top
    window.footerScrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        footerShowToast('Наверх');
    };

    // Newsletter Form
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubscription();
        });
    }

    // Handle Newsletter Subscription
    function handleNewsletterSubscription() {
        const emailInput = document.getElementById('footerEmailInput');
        const subscribeBtn = document.getElementById('subscribeBtn');
        
        if (!emailInput || !subscribeBtn) return;

        const email = emailInput.value.trim();
        
        // Validate email
        if (!email || !isValidEmail(email)) {
            emailInput.classList.add('error');
            footerShowToast('Введите корректный email', 'error');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
            emailInput.focus();
            return;
        }

        // Show loading state
        subscribeBtn.classList.add('loading');
        const originalText = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = '<span>Отправка...</span>';

        // Simulate API call (replace with actual API in production)
        setTimeout(() => {
            // Success
            subscribeBtn.classList.remove('loading');
            subscribeBtn.innerHTML = originalText;
            
            // Show success state on input
            emailInput.value = '';
            emailInput.placeholder = 'Спасибо! ✓';
            emailInput.classList.add('success');
            
            // Show modal
            setTimeout(() => {
                showNewsletterModal();
            }, 500);
            
            // Analytics (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_subscribe', {
                    'event_category': 'Engagement',
                    'event_label': 'Footer Subscribe'
                });
            }
            
            footerShowToast('Подписка оформлена!');
            
            // Reset input after 5 seconds
            setTimeout(() => {
                emailInput.placeholder = 'Ваш email';
                emailInput.classList.remove('success');
            }, 5000);
            
        }, 1500);
    }

    // Validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Global function for newsletter form
    window.footerSubscribeNewsletter = function(e) {
        e.preventDefault();
        handleNewsletterSubscription();
        return false;
    };

    // Show Newsletter Modal
    function showNewsletterModal() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }

    // Close Newsletter Modal
    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    // Footer Links
    function initFooterLinks() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        // Handle coming soon links
        footer.querySelectorAll('[data-action="coming-soon"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page || this.textContent.trim();
                footerShowComingSoon(page);
            });
        });

        // Handle smooth scroll for anchor links
        footer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Show Coming Soon Toast
    window.footerShowComingSoon = function(page) {
        const pageNames = {
            'terms': 'Условия использования',
            'privacy': 'Политика конфиденциальности',
            'cookie': 'Политика cookies',
            'disclaimer': 'Отказ от ответственности',
            'guides': 'Гайды',
            'support': 'Поддержка',
            'faq': 'FAQ',
            'tutorials': 'Туториалы',
            'account': 'Аккаунт',
            'notifications': 'Уведомления',
            'stats': 'Статистика',
            'newsletter': 'Управление подпиской',
            'made': 'Команда'
        };
        
        const pageName = pageNames[page] || page;
        footerShowToast(`Страница "${pageName}" скоро появится!`, 'info');
    };

    // Update Footer Stats
    function updateFooterStats() {
        // Get project count from global variable if available
        let projectCount = 0;
        if (typeof window.projects !== 'undefined' && window.projects) {
            projectCount = window.projects.length;
        }

        // Get user count (logged in user = 1, else 0)
        let userCount = 0;
        if (typeof window.currentUser !== 'undefined' && window.currentUser) {
            userCount = 1;
        }

        // Update elements
        const userEl = document.getElementById('footerUserCount');
        const projectEl = document.getElementById('footerProjectCount');
        
        if (userEl) {
            userEl.textContent = userCount;
            if (userCount > 0) {
                userEl.classList.add('text-emerald-400');
            }
        }
        
        if (projectEl) {
            projectEl.textContent = projectCount;
            if (projectCount > 0) {
                projectEl.classList.add('text-cyan-400');
            }
        }

        // Update periodically
        setTimeout(updateFooterStats, 30000);
    }

    // Update Language Button
    function updateFooterLanguageButton() {
        const footerLangBtn = document.getElementById('footerLangBtn');
        const langFlag = document.querySelector('.lang-flag-footer');
        const langText = document.querySelector('.lang-text-footer');
        
        if (footerLangBtn && langFlag && langText) {
            const currentLang = typeof window.currentLang !== 'undefined' ? window.currentLang : 'ru';
            const langConfig = currentLang === 'en' ? 
                { flag: '🇺🇸', text: 'ENG' } : 
                { flag: '🇷🇺', text: 'РУС' };
            
            langFlag.textContent = langConfig.flag;
            langText.textContent = langConfig.text;
        }
    }

    // Global toggle language function
    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') {
            window.toggleLang();
        } else if (typeof window.setLanguage === 'function') {
            const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
            window.setLanguage(newLang);
        } else {
            // Fallback: toggle with custom event
            const event = new CustomEvent('footerToggleLang');
            document.dispatchEvent(event);
        }
        
        // Update footer language button
        setTimeout(updateFooterLanguageButton, 100);
        
        footerShowToast('Язык изменён');
    };

    // Smooth Scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Toast Notification
    function footerShowToast(message, type = 'success') {
        // Check if main showToast exists
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }

        // Create custom toast
        let toast = document.getElementById('footer-toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'footer-toast';
            toast.className = 'footer-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: white;
                padding: 14px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-family: 'Inter', sans-serif;
            `;
            document.body.appendChild(toast);
        }

        // Set icon based on type
        const icons = {
            success: '<i class="fas fa-check-circle" style="color: #10b981;"></i>',
            error: '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>',
            info: '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>'
        };

        toast.innerHTML = icons[type] + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
        }, 3000);
    }

    // Admin Mode Support
    function initAdminMode() {
        if (typeof window.activateAdminMode === 'function') {
            const originalActivateAdminMode = window.activateAdminMode;
            window.activateAdminMode = function() {
                originalActivateAdminMode();
                document.body.classList.add('admin-mode');
                updateFooterStats();
            };
        }
    }

    // Initialize on DOM ready
    DOMReady(function() {
        // Small delay to ensure other scripts are loaded
        setTimeout(initFooter, 100);
    });

    // Also try to initialize immediately if DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initFooter, 100);
    }

})();
