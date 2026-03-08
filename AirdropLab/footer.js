/**
 * ============================================
 * AirdropLab Footer Module v2.3
 * ============================================
 */

(function() {
    'use strict';

    const FOOTER_CONFIG = {
        company: {
            name: 'AirdropLab',
            version: 'v2.3',
            tagline: 'Лаборатория крипто-возможностей'
        },
        social: {
            twitter: '',
            telegram: '',
            discord: '',
            youtube: '',
            email: 'support@airdroplab.com'
        },
        faq: [
            {
                question: 'Как начать участвовать в аирдропах?',
                answer: 'Зарегистрируйтесь на AirdropLab, выберите интересующий проект из списка и следуйте инструкциям в гайде. Выполняйте задания и следите за обновлениями.'
            },
            {
                question: 'Что такое тестнет и зачем в нем участвовать?',
                answer: 'Тестнет - это тестовая сеть блокчейна до его запуска в основной сети. Участие в тестнетах позволяет получить токены проекта бесплатно, которые могут стать ценными при запуске mainnet.'
            },
            {
                question: 'Как не попасть на скам-проект?',
                answer: 'Мы проверяем все проекты перед добавлением, но всегда проводите собственное исследование. Не вводите приватные ключи, не отправляйте ETH на неизвестные адреса и не доверяйте проектам без аудита безопасности.'
            },
            {
                question: 'Почему проект не отображается в списке?',
                answer: 'Проект может быть в архиве (завершен), находиться на модерации или быть удален. Также убедитесь, что вы используете правильные фильтры в боковой панели.'
            },
            {
                question: 'Как получить помощь по проекту?',
                answer: 'Используйте раздел "Поддержка" в футере или оставьте отзыв на странице конкретного проекта. Наша команда отвечает в течение 24 часов.'
            },
            {
                question: 'Можно ли добавить свой проект?',
                answer: 'Да, вы можете предложить проект через форму обратной связи или написав в Telegram. Мы рассмотрим все предложения.'
            }
        ],
        legal: {
            terms: {
                title: 'Условия использования',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Общие положения</h3>
                    <p>Настоящие Условия использования регулируют отношения между вами и AirdropLab при использовании сайта.</p>
                    <h3>2. Описание сервиса</h3>
                    <p>AirdropLab предоставляет информационные услуги по мониторингу криптовалютных проектов и аирдропов.</p>
                    <h3>3. Правила использования</h3>
                    <p>Запрещается нарушать работу сервиса, использовать его для незаконных целей, публиковать вредоносный контент.</p>
                    <h3>4. Отказ от ответственности</h3>
                    <p>Сервис предоставляется "как есть". Мы не гарантируем точность информации.</p>
                    <h3>5. Контакты</h3>
                    <p>По вопросам обращайтесь: support@airdroplab.com</p>
                `
            },
            privacy: {
                title: 'Политика конфиденциальности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Какие данные мы собираем</h3>
                    <p>Данные аккаунта, данные об использовании, технические данные.</p>
                    <h3>2. Как мы используем данные</h3>
                    <p>Для предоставления доступа к функциям, персонализации и улучшения сервиса.</p>
                    <h3>3. Защита данных</h3>
                    <p>Применяем шифрование SSL/TLS и регулярный аудит безопасности.</p>
                    <h3>4. Контакты</h3>
                    <p>По вопросам конфиденциальности: privacy@airdroplab.com</p>
                `
            },
            cookie: {
                title: 'Политика использования Cookies',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Что такое Cookies</h3>
                    <p>Небольшие текстовые файлы, сохраняемые на устройстве для запоминания настроек.</p>
                    <h3>2. Какие cookies мы используем</h3>
                    <p>Необходимые (auth_token, session_id) и аналитические (_ga, _gid).</p>
                    <h3>3. Управление cookies</h3>
                    <p>Вы можете отключить cookies в настройках браузера.</p>
                `
            },
            disclaimer: {
                title: 'Отказ от ответственности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Информационная цель</h3>
                    <p>AirdropLab предоставляет исключительно информационные услуги.</p>
                    <h3>2. Риски криптовалют</h3>
                    <p>Инвестиции в криптовалюту сопряжены с высокими рисками. Возможна полная потеря средств.</p>
                    <h3>3. Ответственность пользователя</h3>
                    <p>Вы несете полную ответственность за собственное исследование проектов и инвестиционные решения.</p>
                `
            }
        },
        guides: [
            {
                id: 'arc',
                title: 'Arc Testnet',
                description: 'Тестнет от Circle - создателей USDC',
                logo: 'https://givemebit.com/wp-content/uploads/2025/11/arc-testnet-logo-1024x235.jpg',
                link: '../AirdropLab/guides/Arc/Arc_Testnet_by_Circle.html',
                status: 'active',
                difficulty: 'Легко'
            },
            {
                id: 'tempo',
                title: 'Tempo Testnet',
                description: 'L2 решение от MetaStreet',
                logo: 'https://givemebit.com/wp-content/uploads/2025/12/tempo-testnet-logo-1024x235.jpg',
                link: '../AirdropLab/guides/Tempo/Tempo_Testnet.html',
                status: 'active',
                difficulty: 'Средне'
            },
            {
                id: 'robinhood',
                title: 'Robinhood Chain',
                description: 'Тестнет от Robinhood - известного брокера',
                logo: 'https://cryptocurrencyjobs.co/startups/assets/logos/robinhood.e4ca7c6b17d08763d0714e8a061cf5ba65950fe4d236e3c2db812421997fb743_hu_e366a75e4d388edb.jpg',
                link: '../AirdropLab/guides/Robinhood/robinhood-chain.html',
                status: 'new',
                difficulty: 'Легко'
            }
        ]
    };

    function DOMReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    function initFooter() {
        if (document.getElementById('site-footer')) return;
        createFooter();
        setTimeout(initializeFooterFunctions, 150);
    }

    function createFooter() {
        const footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.className = 'site-footer bg-slate-950/95 border-t border-slate-800/50 backdrop-blur-sm relative overflow-hidden';
        footer.innerHTML = getFooterHTML();
        document.body.appendChild(footer);
        addFooterStyles();
    }

    function getFooterHTML() {
        return `
            <div class="footer-bg-gradient absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-cyan-900/15"></div>
            <div class="footer-bg-pattern absolute inset-0 opacity-25"
                 style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyMiwyMTAsMjM4LDAuMDgpIiBzdHJva2U9InJnYmEoMjIsMjEwLDIzOCwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+');">
            </div>

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
                                        <circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"></circle>
                                        <circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"></circle>
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
                        <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
                            ${FOOTER_CONFIG.company.tagline}. Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.
                        </p>
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" rel="noopener noreferrer"
                               class="social-link p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" title="Twitter">
                                <i class="fab fa-twitter text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" rel="noopener noreferrer"
                               class="social-link p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" title="Telegram">
                                <i class="fab fa-telegram-plane text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" rel="noopener noreferrer"
                               class="social-link p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" title="Discord">
                                <i class="fab fa-discord text-lg"></i>
                            </a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}"
                               class="social-link p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" title="Email">
                                <i class="fas fa-envelope text-lg"></i>
                            </a>
                        </div>
                        <div class="footer-status flex items-center gap-4">
                            <div class="flex items-center gap-1.5">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span class="text-xs text-emerald-400 font-medium">Live</span>
                            </div>
                                                        <div class="flex items-center gap-1.5">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                                </span>
                                <span class="text-xs text-cyan-400 font-medium">Обновлено</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-link text-cyan-400"></i>
                            <span>Быстрые ссылки</span>
                        </h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#heroSection" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-home text-xs w-4"></i>
                                <span class="text-sm">Главная</span>
                            </a>
                            <a href="#projects" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-layer-group text-xs w-4"></i>
                                <span class="text-sm">Проекты</span>
                            </a>
                            <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-book-open text-xs w-4"></i>
                                <span class="text-sm">Гайды</span>
                            </a>
                            <a href="#" onclick="openSupportModal(); return false;" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-headset text-xs w-4"></i>
                                <span class="text-sm">Поддержка</span>
                            </a>
                            <a href="https://cryptorank.io" target="_blank" rel="noopener noreferrer" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-chart-line text-xs w-4"></i>
                                <span class="text-sm">CryptoRank</span>
                                <i class="fas fa-external-link-alt text-xs text-slate-500"></i>
                            </a>
                        </nav>
                    </div>

                    <!-- Personal Cabinet - БЕЗ уведомлений и туториалов -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-user-cog text-emerald-400"></i>
                            <span>Личный кабинет</span>
                        </h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#" onclick="openPageModal('account'); return false;" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-user text-xs w-4"></i>
                                <span class="text-sm">Мой аккаунт</span>
                            </a>
                            <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-question-circle text-xs w-4"></i>
                                <span class="text-sm">FAQ</span>
                            </a>
                            <a href="#" onclick="footerToggleLang(); return false;" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-globe text-xs w-4"></i>
                                <span class="text-sm">Язык / Language</span>
                            </a>
                        </nav>

                        <!-- Stats block - реальные данные -->
                        <div class="pt-4 mt-4 border-t border-slate-800/50">
                            <h5 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Статистика</h5>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2 text-xs text-slate-500">
                                        <i class="fas fa-project-diagram text-cyan-400"></i>
                                        <span>Проектов</span>
                                    </div>
                                    <span id="footerProjectCount" class="font-bold text-cyan-400 text-sm">—</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2 text-xs text-slate-500">
                                        <i class="fas fa-check-double text-emerald-400"></i>
                                        <span>Активных</span>
                                    </div>
                                    <span id="footerActiveCount" class="font-bold text-emerald-400 text-sm">—</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2 text-xs text-slate-500">
                                        <i class="fas fa-users text-purple-400"></i>
                                        <span>Статус</span>
                                    </div>
                                    <span id="footerUserStatus" class="font-bold text-slate-400 text-sm">Гость</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Legal -->
                    <div class="lg:col-span-1 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-gavel text-purple-400"></i>
                            <span>Юридическая информация</span>
                        </h4>
                        <div class="grid grid-cols-1 gap-4 mb-6">
                            <div>
                                <h5 class="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Документы</h5>
                                <nav class="space-y-1">
                                    <a href="#" onclick="openLegalModal('terms'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                        <i class="fas fa-file-contract w-4"></i> Условия использования
                                    </a>
                                    <a href="#" onclick="openLegalModal('privacy'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                        <i class="fas fa-shield-alt w-4"></i> Политика конфиденциальности
                                    </a>
                                    <a href="#" onclick="openLegalModal('cookie'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                        <i class="fas fa-cookie-bite w-4"></i> Политика cookies
                                    </a>
                                    <a href="#" onclick="openLegalModal('disclaimer'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                        <i class="fas fa-exclamation-triangle w-4"></i> Отказ от ответственности
                                    </a>
                                </nav>
                            </div>
                            <div>
                                <h5 class="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Контакты</h5>
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
                                        <span>24/7 Support</span>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <!-- Newsletter -->
                        <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-paper-plane text-cyan-400 text-sm"></i>
                                </div>
                                <div>
                                    <h5 class="text-sm font-semibold text-white">Подписаться на обновления</h5>
                                    <p class="text-xs text-slate-500">Новые аирдропы и тестнеты</p>
                                </div>
                            </div>
                            <form class="newsletter-form flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                                <div class="flex-1 relative">
                                    <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                                    <input type="email"
                                           id="footerEmailInput"
                                           placeholder="Ваш email"
                                           required
                                           class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all">
                                </div>
                                <button type="submit"
                                        id="subscribeBtn"
                                        class="subscribe-btn px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 whitespace-nowrap">
                                    <i class="fas fa-paper-plane text-xs"></i>
                                </button>
                            </form>
                            <p class="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                <i class="fas fa-shield-alt text-emerald-400"></i>
                                Отписаться можно в любой момент
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom border-t border-slate-800/50 relative z-10">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div class="text-sm text-slate-500">
                            <span>© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. Все права защищены.</span>
                            <span class="hidden md:inline mx-2">•</span>
                            <span>Сделано с <i class="fas fa-heart text-red-400 mx-1"></i> любовью к крипте</span>
                        </div>
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
                                <i class="fas fa-code text-emerald-400"></i>
                                <span>JavaScript</span>
                            </div>
                            <button onclick="footerToggleLang()" id="footerLangBtn"
                                    class="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg border border-slate-700/50 text-xs transition-all text-slate-300 ml-2">
                                <span class="lang-flag-footer">🇷🇺</span>
                                <span class="lang-text-footer">РУС</span>
                            </button>
                        </div>
                    </div>
                    <div class="md:hidden pt-4 border-t border-slate-800/50 mt-4">
                        <div class="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
                            <a href="#" onclick="openLegalModal('terms'); return false;" class="hover:text-white transition-colors">Условия</a>
                            <a href="#" onclick="openLegalModal('privacy'); return false;" class="hover:text-white transition-colors">Приватность</a>
                            <a href="#" onclick="openSupportModal(); return false;" class="hover:text-white transition-colors">Поддержка</a>
                            <span class="text-slate-600">•</span>
                            <a href="https://cryptorank.io" target="_blank" class="hover:text-cyan-400 transition-colors">CryptoRank</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back to Top -->
            <button onclick="footerScrollToTop()" id="backToTop"
                    class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-50">
                <i class="fas fa-chevron-up"></i>
            </button>

            <!-- Page Modal -->
            <div id="pageModal" class="modal">
                <div class="modal-content page-modal-content p-0 relative">
                    <button onclick="closePageModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center">
                        <i class="fas fa-times"></i>
                    </button>
                    <div id="pageModalContent"></div>
                </div>
            </div>

            <!-- Newsletter Success Modal -->
            <div id="newsletterModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                            <i class="fas fa-check text-2xl text-emerald-400"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Подписка оформлена!</h3>
                        <p class="text-slate-400 mb-4 text-sm">Вы будете получать уведомления о новых аирдропах.</p>
                        <button onclick="closeNewsletterModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-colors">Закрыть</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ============ MODAL FUNCTIONS ============

    window.openPageModal = function(page) {
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        let html = '';
        switch(page) {
            case 'faq':     html = getFAQContent(); break;
            case 'guides':  html = getGuidesContent(); break;
            case 'account': html = getAccountContent(); break;
            default:        html = '<p class="text-center text-slate-400 p-8">Страница в разработке</p>';
        }

        content.innerHTML = html;
        modal.classList.add('active');

        if (page === 'faq') initFAQ();
        if (page === 'account') initAccountPage();
    };

    window.closePageModal = function() {
        const modal = document.getElementById('pageModal');
        if (modal) modal.classList.remove('active');
    };

    // ============ FAQ ============

    function getFAQContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-question-circle text-cyan-400"></i>
                    Часто задаваемые вопросы
                </h2>
                <p class="text-slate-400 mt-2">Ответы на популярные вопросы о AirdropLab</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="space-y-3">
                    ${FOOTER_CONFIG.faq.map((item, index) => `
                        <div class="faq-item border border-slate-700/50 rounded-xl overflow-hidden">
                            <button onclick="toggleFaqItem(${index})" class="w-full text-left p-4 flex items-center justify-between gap-4 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                                <span class="font-medium text-white text-sm">${item.question}</span>
                                <i class="fas fa-chevron-down text-slate-400 transition-transform flex-shrink-0" id="faq-icon-${index}"></i>
                            </button>
                            <div class="hidden p-4 pt-0 text-slate-300 text-sm leading-relaxed" id="faq-answer-${index}">
                                <div class="pt-3 border-t border-slate-700/50">${item.answer}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
                    <h4 class="font-bold text-white mb-2 flex items-center gap-2">
                        <i class="fas fa-headset text-blue-400"></i> Не нашли ответ?
                    </h4>
                    <p class="text-sm text-slate-400 mb-3">Свяжитесь с нашей службой поддержки</p>
                    <button onclick="closePageModal(); setTimeout(() => openSupportModal(), 200);"
                            class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white">
                        Написать в поддержку
                    </button>
                </div>
            </div>
        `;
    }

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        if (!answer || !icon) return;
        const isHidden = answer.classList.contains('hidden');
        answer.classList.toggle('hidden', !isHidden);
        icon.classList.toggle('rotate-180', isHidden);
    };

    function initFAQ() {}

    // ============ GUIDES ============

    function getGuidesContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-book-open text-cyan-400"></i> Гайды
                </h2>
                <p class="text-slate-400 mt-2">Пошаговые инструкции по участию в тестнетах</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="grid gap-4">
                    ${FOOTER_CONFIG.guides.map(guide => `
                        <div class="border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-all bg-slate-800/30">
                            <div class="flex items-start gap-4">
                                <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                                    ${guide.logo
                                        ? `<img src="${guide.logo}" alt="${guide.title}" class="w-full h-full object-cover">`
                                        : `<div class="w-full h-full flex items-center justify-center text-xl font-bold text-cyan-400">${guide.title.charAt(0)}</div>`
                                    }
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 class="font-bold text-white">${guide.title}</h3>
                                        ${guide.status === 'new'    ? '<span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30">NEW</span>' : ''}
                                        ${guide.status === 'active' ? '<span class="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full border border-cyan-500/30">Активен</span>' : ''}
                                    </div>
                                    <p class="text-sm text-slate-400 mb-3">${guide.description}</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-slate-500 flex items-center gap-1">
                                            <i class="fas fa-signal text-green-400"></i> ${guide.difficulty}
                                        </span>
                                        <a href="${guide.link}" target="_blank"
                                           class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium text-white transition-colors">
                                            <i class="fas fa-external-link-alt text-xs"></i> Открыть гайд
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ============ ACCOUNT ============

    function getAccountContent() {
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
        const userData = JSON.parse(localStorage.getItem('userProfileData') || '{}');

        if (!user) {
            return `
                <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                    <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                        <i class="fas fa-user-cog text-emerald-400"></i> Личный кабинет
                    </h2>
                </div>
                <div class="p-8 text-center">
                    <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-user-lock text-4xl text-slate-500"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">Вход не выполнен</h3>
                    <p class="text-slate-400 mb-6">Войдите в аккаунт для управления профилем</p>
                    <button onclick="closePageModal(); setTimeout(() => { if(typeof openLoginModal==='function') openLoginModal(); }, 200);"
                            class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all">
                        <i class="fas fa-sign-in-alt mr-2"></i>Войти
                    </button>
                </div>
            `;
        }

        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-user-cog text-emerald-400"></i> Личный кабинет
                </h2>
                <p class="text-slate-400 mt-1">Управление профилем и настройками</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="flex items-center gap-5 mb-6 pb-6 border-b border-slate-700/50">
                    <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/40 flex-shrink-0">
                        <img src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'U') + '&background=0ea5e9&color=fff'}"
                             alt="Avatar" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">${user.displayName || 'Пользователь'}</h3>
                        <p class="text-slate-400 text-sm">${user.email || ''}</p>
                        <p class="text-xs text-slate-500 mt-1 font-mono">ID: ${user.uid ? user.uid.substring(0, 12) + '...' : '—'}</p>
                        <div class="flex items-center gap-1.5 mt-2">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            <span class="text-xs text-emerald-400">В системе</span>
                        </div>
                    </div>
                </div>
                <form id="accountForm" onsubmit="saveAccountProfile(event)" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">Имя</label>
                            <input type="text" id="profileFirstName" value="${userData.firstName || ''}" placeholder="Иван"
                                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">Фамилия</label>
                            <input type="text" id="profileLastName" value="${userData.lastName || ''}" placeholder="Иванов"
                                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">Никнейм</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">@</span>
                                <input type="text" id="profileUsername" value="${userData.username || ''}" placeholder="nickname"
                                       class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">Telegram</label>
                            <input type="text" id="profileTelegram" value="${userData.telegram || ''}" placeholder="@username"
                                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1.5">Страна</label>
                        <select id="profileCountry" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            <option value="">Выберите страну</option>
                            <option value="RU"    ${userData.country === 'RU'    ? 'selected' : ''}>🇷🇺 Россия</option>
                            <option value="UA"    ${userData.country === 'UA'    ? 'selected' : ''}>🇺🇦 Украина</option>
                            <option value="KZ"    ${userData.country === 'KZ'    ? 'selected' : ''}>🇰🇿 Казахстан</option>
                            <option value="BY"    ${userData.country === 'BY'    ? 'selected' : ''}>🇧🇾 Беларусь</option>
                            <option value="US"    ${userData.country === 'US'    ? 'selected' : ''}>🇺🇸 США</option>
                            <option value="OTHER" ${userData.country === 'OTHER' ? 'selected' : ''}>🌍 Другое</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1.5">О себе</label>
                        <textarea id="profileBio" rows="2" placeholder="Расскажите о себе..."
                                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none resize-none">${userData.bio || ''}</textarea>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="closePageModal()"
                                class="flex-1 bg-slate-700 hover:bg-slate-600 py-2.5 rounded-lg text-sm font-medium text-white transition-colors">
                            Отмена
                        </button>
                        <button type="submit"
                                class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-2.5 rounded-lg text-sm font-bold text-white transition-all">
                            <i class="fas fa-save mr-2"></i>Сохранить
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    function initAccountPage() {}

    window.saveAccountProfile = async function(e) {
        e.preventDefault();
        const profileData = {
            firstName:  document.getElementById('profileFirstName')?.value || '',
            lastName:   document.getElementById('profileLastName')?.value  || '',
            username:   document.getElementById('profileUsername')?.value  || '',
            telegram:   document.getElementById('profileTelegram')?.value  || '',
            country:    document.getElementById('profileCountry')?.value   || '',
            bio:        document.getElementById('profileBio')?.value       || '',
            updatedAt:  new Date().toISOString()
        };
        window.userProfileData = profileData;
        localStorage.setItem('userProfileData', JSON.stringify(profileData));
        if (typeof window.showToast === 'function') {
            window.showToast('Профиль сохранён!');
        }
        closePageModal();
    };

    // ============ SUPPORT — открывает встроенный feedback modal ============

    window.openSupportModal = function() {
        if (typeof window.openFeedbackModal === 'function') {
            window.openFeedbackModal('__support__', '🛡️ Support');
        } else {
            footerShowToast('Войдите в аккаунт для обращения в поддержку');
        }
    };

    // ============ LEGAL ============

    window.openLegalModal = function(type) {
        const legalData = FOOTER_CONFIG.legal[type];
        if (!legalData) return;

        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        const icons = {
            terms:      'fa-file-contract text-purple-400',
            privacy:    'fa-shield-alt text-blue-400',
            cookie:     'fa-cookie-bite text-orange-400',
            disclaimer: 'fa-exclamation-triangle text-red-400'
        };

        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <i class="fas ${icons[type]} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-white">${legalData.title}</h2>
                        <p class="text-sm text-slate-400">Обновлено: ${legalData.lastUpdated}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto legal-content">
                ${legalData.content}
            </div>
            <div class="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <button onclick="closePageModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-2.5 rounded-lg text-sm font-medium text-white transition-colors">
                    Закрыть
                </button>
            </div>
        `;
        modal.classList.add('active');
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v2')) return;
        const styles = document.createElement('style');
        styles.id = 'footer-styles-v2';
        styles.textContent = `
            .site-footer { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #e2e8f0; }
            .footer-bg-gradient, .footer-bg-pattern { pointer-events: none; }
            .social-link { transition: all 0.2s ease; }
            .social-link:active { transform: scale(0.95); }
            .footer-link { position: relative; padding: 4px 0; transition: all 0.2s ease; display: flex; align-items: center; }
            .footer-link:hover { transform: translateX(4px); color: #fff; }
            .footer-email-input:focus { box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15); }
            .footer-email-input.error  { border-color: #ef4444 !important; animation: shake 0.5s; }
            .footer-email-input.success{ border-color: #10b981 !important; background: rgba(16,185,129,0.08) !important; }
            @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
            .subscribe-btn { position: relative; overflow: hidden; }
            .back-to-top { opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
            .back-to-top.visible { opacity: 1; visibility: visible; }
            .back-to-top:hover { transform: translateY(-3px) scale(1.05) !important; }

            /* Page Modal */
            .page-modal-content {
                max-width: 680px; width: 95%; max-height: 90vh;
                overflow: hidden; display: flex; flex-direction: column;
                border-radius: 1rem;
                background: rgba(15,23,42,0.98);
                border: 1px solid rgba(255,255,255,0.08);
            }

            /* Legal */
            .legal-content h3 { font-size:1.05rem; font-weight:700; color:#fff; margin:1.25rem 0 0.5rem; }
            .legal-content h3:first-child { margin-top:0; }
            .legal-content p  { color:#cbd5e1; line-height:1.7; margin-bottom:0.5rem; }
            .legal-content ul { margin:0.5rem 0 1rem 1.5rem; }
            .legal-content li { color:#cbd5e1; margin-bottom:0.4rem; }
            .legal-content strong { color:#fff; }

            /* FAQ */
            .faq-item { transition: border-color 0.2s; }
            .faq-item:hover { border-color: rgba(34,211,238,0.3); }

            @media (max-width: 768px) {
                .page-modal-content { width: 98%; max-height: 95vh; }
                .back-to-top { bottom: 5rem; right: 1rem; }
            }
        `;
        document.head.appendChild(styles);
    }

    // ============ INIT ============

    function initializeFooterFunctions() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        initBackToTop();
        initNewsletterForm();
        initFooterLinks();
        startStatsUpdater();
        updateFooterLanguageButton();
    }

    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.pageYOffset > 400);
        });
    }

    window.footerScrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleNewsletterSubscription();
            });
        }
    }

    function handleNewsletterSubscription() {
        const emailInput  = document.getElementById('footerEmailInput');
        const subscribeBtn = document.getElementById('subscribeBtn');
        if (!emailInput || !subscribeBtn) return;

        const email = emailInput.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.classList.add('error');
            footerShowToast('Введите корректный email');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
            return;
        }

        const original = subscribeBtn.innerHTML;
        subscribeBtn.disabled = true;
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i>';

        setTimeout(() => {
            subscribeBtn.disabled = false;
            subscribeBtn.innerHTML = original;
            emailInput.value = '';
            emailInput.classList.add('success');
            setTimeout(() => emailInput.classList.remove('success'), 4000);
            showNewsletterModal();
            footerShowToast('Подписка оформлена!');
        }, 1200);
    }

    window.footerSubscribeNewsletter = function(e) {
        e.preventDefault();
        handleNewsletterSubscription();
        return false;
    };

    function showNewsletterModal() {
        const modal = document.getElementById('newsletterModal');
        if (modal) modal.classList.add('active');
    }

    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) modal.classList.remove('active');
    };

    function initFooterLinks() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;
        footer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.getElementById(href.substring(1));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
            });
        });

        // Закрытие pageModal по клику на фон
        const pageModal = document.getElementById('pageModal');
        if (pageModal) {
            pageModal.addEventListener('mousedown', function(e) {
                if (e.target === pageModal) pageModal.dataset.bgClick = 'true';
                else pageModal.dataset.bgClick = 'false';
            });
            pageModal.addEventListener('mouseup', function(e) {
                if (pageModal.dataset.bgClick === 'true' && e.target === pageModal) closePageModal();
                pageModal.dataset.bgClick = 'false';
            });
        }
    }

    // ============ STATS — реальные данные ============

    function startStatsUpdater() {
        updateFooterStats();
        // Обновляем каждые 10 секунд, пока данные не загружены
        const interval = setInterval(() => {
            const done = updateFooterStats();
            if (done) clearInterval(interval);
        }, 10000);
    }

    function updateFooterStats() {
        const projectEl = document.getElementById('footerProjectCount');
        const activeEl  = document.getElementById('footerActiveCount');
        const statusEl  = document.getElementById('footerUserStatus');

        // Проекты
        let projectCount = 0;
        if (typeof window.projects !== 'undefined' && Array.isArray(window.projects)) {
            projectCount = window.projects.filter(p => !p.deleted).length;
        }

        // Активные (не завершённые)
        let activeCount = 0;
        if (typeof window.projects !== 'undefined' && Array.isArray(window.projects)) {
            activeCount = window.projects.filter(p => !p.deleted && p.status === 'active').length;
        }

        // Статус пользователя
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
        const userStatus = user
            ? (user.displayName || user.email?.split('@')[0] || 'Пользователь')
            : 'Гость';

        if (projectEl) {
            projectEl.textContent = projectCount > 0 ? projectCount : '—';
            if (projectCount > 0) projectEl.classList.add('text-cyan-400');
        }
        if (activeEl) {
            activeEl.textContent = activeCount > 0 ? activeCount : '—';
            if (activeCount > 0) activeEl.classList.add('text-emerald-400');
        }
        if (statusEl) {
            statusEl.textContent = userStatus;
            if (user) {
                statusEl.classList.remove('text-slate-400');
                statusEl.classList.add('text-emerald-400');
            }
        }

        // Возвращаем true если данные уже получены
        return projectCount > 0;
    }

    // ============ LANGUAGE ============

    function updateFooterLanguageButton() {
        const langFlag = document.querySelector('.lang-flag-footer');
        const langText = document.querySelector('.lang-text-footer');
        if (!langFlag || !langText) return;
        const lang = typeof window.currentLang !== 'undefined' ? window.currentLang : 'ru';
        langFlag.textContent = lang === 'en' ? '🇺🇸' : '🇷🇺';
        langText.textContent  = lang === 'en' ? 'ENG'  : 'РУС';
    }

    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') {
            window.toggleLang();
        }
        setTimeout(updateFooterLanguageButton, 200);
    };

    // Слушаем изменение языка из основного скрипта
    document.addEventListener('langChanged', function() {
        updateFooterLanguageButton();
        updateFooterStats();
    });

    // ============ TOAST ============

    function footerShowToast(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }
        let toast = document.getElementById('footer-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'footer-toast';
            toast.style.cssText = `
                position:fixed; bottom:20px; right:20px;
                background:linear-gradient(135deg,#1e293b,#0f172a);
                border:1px solid rgba(255,255,255,0.1); color:#fff;
                padding:12px 18px; border-radius:12px;
                box-shadow:0 10px 40px rgba(0,0,0,0.4);
                transform:translateY(80px); opacity:0;
                transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
                z-index:9999; display:flex; align-items:center; gap:8px;
                font-size:14px;
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = '<i class="fas fa-check-circle" style="color:#10b981"></i>' + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.style.transform = 'translateY(80px)';
            toast.style.opacity = '0';
        }, 3000);
    }

    // ============ BOOT ============

    DOMReady(function() { setTimeout(initFooter, 150); });

})();
