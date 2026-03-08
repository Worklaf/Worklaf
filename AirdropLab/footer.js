/**
 * ============================================
 * AirdropLab Footer Module v2.3
 * Реальные страницы: FAQ, Поддержка, Аккаунт, Уведомления
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
            twitter: 'https://twitter.com/airdroplab',
            telegram: 'https://t.me/airdroplab',
            discord: 'https://discord.gg/airdroplab',
            youtube: 'https://youtube.com/@airdroplab',
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
                answer: 'Мы проверяем все проекты перед добавлением, но всегда проводите собственное исследование. Не вводите приватные ключи, не отправьте ETH на неизвестные адреса и не доверяйте проектам без аудита безопасности.'
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
                    <p>Настоящие Условия использования (далее - "Условия") регулируют отношения между вами и AirdropLab при использовании сайта airdroplab.com (далее - "Сервис").</p>
                    <p>Используя Сервис, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо положениями, пожалуйста, не используйте наш Сервис.</p>
                    <h3>2. Описание сервиса</h3>
                    <p>AirdropLab предоставляет информационные услуги по мониторингу криптовалютных проектов и аирдропов, предоставлению гайдов по участию в тестнетах, отслеживанию прогресса выполнения заданий и уведомлению о новых возможностях.</p>
                    <h3>3. Отказ от ответственности</h3>
                    <p>Сервис предоставляется "как есть". Мы не гарантируем точность информации и не несем ответственности за любые убытки, возникшие в результате использования Сервиса.</p>
                `
            },
            privacy: {
                title: 'Политика конфиденциальности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Введение</h3>
                    <p>Политика конфиденциальности AirdropLab объясняет, как мы собираем, используем и защищаем ваши персональные данные.</p>
                    <h3>2. Какие данные мы собираем</h3>
                    <ul><li><strong>Данные аккаунта:</strong> имя, email, фото профиля</li><li><strong>Данные об использовании:</strong> история посещений, избранные проекты</li><li><strong>Технические данные:</strong> IP-адрес, тип браузера, устройство</li></ul>
                    <h3>3. Защита данных</h3>
                    <p>Мы применяем шифрование данных при передаче (SSL/TLS), безопасное хранение паролей и регулярный аудит безопасности.</p>
                `
            },
            cookie: {
                title: 'Политика использования Cookies',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Что такое Cookies</h3>
                    <p>Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов.</p>
                    <h3>2. Какие cookies мы используем</h3>
                    <ul><li><strong>auth_token:</strong> для аутентификации</li><li><strong>session_id:</strong> для поддержки сессии</li><li><strong>_ga:</strong> Google Analytics</li></ul>
                `
            },
            disclaimer: {
                title: 'Отказ от ответственности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Информационная цель</h3>
                    <p>AirdropLab предоставляет исключительно информационные услуги. Мы не являемся финансовым консультантом или брокером.</p>
                    <h3>2. Риски криптовалют</h3>
                    <p>Инвестиции в криптовалюту сопряжены с высокими рисками: волатильность, потеря средств, мошенничество, технические и регуляторные риски.</p>
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
                description: 'Тестнет от Robinhood',
                logo: 'https://cryptocurrencyjobs.co/startups/assets/logos/robinhood.e4ca7c6b17d08763d0714e8a061cf5ba65950fe4d236e3c2db812421997fb743_hu_e366a75e4d388edb.jpg',
                link: '../AirdropLab/guides/Robinhood/robinhood-chain.html',
                status: 'new',
                difficulty: 'Легко'
            }
        ]
    };

    function DOMReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function initFooter() {
        if (document.getElementById('site-footer')) {
            console.log('Footer v2.3 already exists');
            return;
        }
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
            <div class="footer-bg-pattern absolute inset-0 opacity-25" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyMiwyMTAsMjM4LDAuMDgpIiBzdHJva2U9InJnYmEoMjIsMjEwLDIzOCwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+');"></div>
            
            <div class="footer-main max-w-[1600px] mx-auto px-4 py-16 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div class="footer-section footer-brand">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="footer-logo-wrapper relative group">
                                <div class="footer-logo-glow absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div class="footer-logo relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/30 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                                    <svg class="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"></circle><circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"></circle></svg>
                                </div>
                            </div>
                            <div>
                                <h3 class="footer-brand-title text-xl font-black tracking-tight"><span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span><span class="text-white">Lab</span></h3>
                                <p class="text-xs text-slate-400 mt-1 tracking-wider uppercase">${FOOTER_CONFIG.company.version}</p>
                            </div>
                        </div>
                        <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6">${FOOTER_CONFIG.company.tagline}. Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах и тестнетах.</p>
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" title="Twitter"><i class="fab fa-twitter text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" title="Telegram"><i class="fab fa-telegram-plane text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" title="Discord"><i class="fab fa-discord text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.youtube}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30" title="YouTube"><i class="fab fa-youtube text-lg"></i></a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}" class="social-link group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" title="Email"><i class="fas fa-envelope text-lg"></i></a>
                        </div>
                        <div class="footer-status flex items-center gap-4">
                            <div class="status-item flex items-center gap-1.5"><span class="status-dot relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span></span><span class="text-xs text-emerald-400 font-medium">Live</span></div>
                            <div class="status-item flex items-center gap-1.5"><span class="status-dot relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-lg shadow-cyan-400/50"></span></span><span class="text-xs text-cyan-400 font-medium">Обновлено</span></div>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-link text-cyan-400"></i> <span>Быстрые ссылки</span></h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#heroSection" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-home text-xs w-4"></i><span class="text-sm">Главная</span></a>
                            <a href="#projects" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-layer-group text-xs w-4"></i><span class="text-sm">Проекты</span></a>
                            <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-book-open text-xs w-4"></i><span class="text-sm">Гайды</span></a>
                            <a href="#" onclick="openSupportModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-headset text-xs w-4"></i><span class="text-sm">Поддержка</span></a>
                            <a href="https://cryptorank.io" target="_blank" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-chart-line text-xs w-4"></i><span class="text-sm">CryptoRank</span><i class="fas fa-external-link-alt text-xs text-slate-500"></i></a>
                        </nav>
                    </div>
                    
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-user-cog text-emerald-400"></i> <span>Личный кабинет</span></h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#" onclick="openPageModal('account'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-user text-xs w-4"></i><span class="text-sm">Мой аккаунт</span></a>
                            <a href="#" onclick="openSupportMessagesModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-comments text-xs w-4"></i><span class="text-sm">Мои обращения</span><span id="footerSupportBadge" class="hidden ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">0</span></a>
                            <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-question-circle text-xs w-4"></i><span class="text-sm">FAQ</span></a>
                            <a href="#" onclick="footerToggleLang(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-globe text-xs w-4"></i><span class="text-sm">Язык</span></a>
                            <div class="pt-3 mt-2 border-t border-slate-800/50">
                                <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-project-diagram text-cyan-400"></i><span id="footerProjectCount" class="font-medium text-slate-400">0</span> проектов</div>
                            </div>
                        </nav>
                    </div>
                    
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-gavel text-purple-400"></i> <span>Юридическая информация</span></h4>
                        <div class="footer-legal-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Документы</h5>
                                <nav class="space-y-1">
                                    <a href="#" onclick="openLegalModal('terms'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1"><i class="fas fa-file-contract w-4"></i> Условия использования</a>
                                    <a href="#" onclick="openLegalModal('privacy'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1"><i class="fas fa-shield-alt w-4"></i> Политика конфиденциальности</a>
                                    <a href="#" onclick="openLegalModal('cookie'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1"><i class="fas fa-cookie-bite w-4"></i> Политика cookies</a>
                                    <a href="#" onclick="openLegalModal('disclaimer'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1"><i class="fas fa-exclamation-triangle w-4"></i> Отказ от ответственности</a>
                                </nav>
                            </div>
                            <div>
                                <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Контакты</h5>
                                <nav class="space-y-2 text-sm">
                                    <a href="mailto:${FOOTER_CONFIG.social.email}" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><i class="fas fa-envelope text-cyan-400 w-4"></i><span>support@airdroplab.com</span></a>
                                    <div class="flex items-center gap-2 text-slate-400"><i class="fas fa-map-marker-alt text-orange-400 w-4"></i><span>Worldwide (Remote)</span></div>
                                    <div class="flex items-center gap-2 text-slate-400"><i class="fas fa-clock text-blue-400 w-4"></i><span>24/7</span></div>
                                </nav>
                            </div>
                        </div>
                        
                        <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                            <div class="flex items-start gap-3 mb-3">
                                <div class="newsletter-icon w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0"><i class="fas fa-newspaper text-cyan-400"></i></div>
                                <div>
                                    <h5 class="text-sm font-semibold text-white flex items-center gap-2"><i class="fas fa-paper-plane text-yellow-400"></i> Подписаться на обновления</h5>
                                    <p class="text-xs text-slate-500 mt-1">Получайте уведомления о новых аирдропах</p>
                                </div>
                            </div>
                            <form class="newsletter-form flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                                <div class="flex-1 relative"><i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i><input type="email" id="footerEmailInput" placeholder="Ваш email" required class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg px-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"></div>
                                <button type="submit" id="subscribeBtn" class="subscribe-btn px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-2"><span>Подписаться</span><i class="fas fa-paper-plane text-xs"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom border-t border-slate-800/50 relative z-10">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div class="footer-copyright text-sm text-slate-500"><span>© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. Все права защищены.</span><span class="text-slate-400">Сделано с</span><i class="fas fa-heart text-red-400 mx-1"></i><span class="text-slate-400">любовью к крипте</span></div>
                        <div class="footer-tech flex flex-wrap justify-center md:justify-end gap-4 text-xs text-slate-500">
                            <div class="tech-item flex items-center gap-2"><i class="fas fa-database text-cyan-400"></i><span>Firebase</span></div>
                            <div class="tech-item flex items-center gap-2"><i class="fab fa-css3-alt text-blue-400"></i><span>Tailwind CSS</span></div>
                            <div class="tech-item flex items-center gap-2"><i class="fas fa-code text-emerald-400"></i><span>JavaScript</span></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-50" title="Наверх"><i class="fas fa-chevron-up"></i></button>
            
            <!-- Page Modal -->
            <div id="pageModal" class="modal"><div class="modal-content page-modal-content p-0 relative"><button onclick="closePageModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button><div id="pageModalContent"></div></div></div>
            
            <!-- Support Modal -->
            <div id="supportModal" class="modal">
                <div class="modal-content modal-md p-6 relative">
                    <button onclick="closeSupportModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><i class="fas fa-times text-xl"></i></button>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center"><i class="fas fa-headset text-purple-400 text-xl"></i></div>
                        <div><h2 class="text-xl font-bold text-white">Служба поддержки</h2><p class="text-sm text-slate-400">Мы ответим на ваш вопрос в течение 24 часов</p></div>
                    </div>
                    <form id="supportForm" onsubmit="submitSupportTicket(event)" class="space-y-4">
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Тема обращения *</label><select id="supportCategory" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"><option value="">Выберите категорию</option><option value="technical">🔧 Техническая проблема</option><option value="account">👤 Проблема с аккаунтом</option><option value="project">📋 Вопрос о проекте</option><option value="suggestion">💡 Предложение</option><option value="partnership">🤝 Партнёрство</option><option value="other">💬 Другое</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Заголовок *</label><input type="text" id="supportSubject" required placeholder="Краткое описание проблемы" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Подробное описание *</label><textarea id="supportMessage" required rows="5" placeholder="Опишите вашу проблему подробно..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none resize-none"></textarea></div>
                        <button type="submit" id="supportSubmitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/20"><i class="fas fa-paper-plane mr-2"></i>Отправить обращение</button>
                    </form>
                </div>
            </div>
            
            <!-- My Support Messages Modal -->
            <div id="supportMessagesModal" class="modal">
                <div class="modal-content modal-lg p-0 relative">
                    <button onclick="closeSupportMessagesModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button>
                    <div id="supportMessagesContent"></div>
                </div>
            </div>

            <!-- Account Delete Modal -->
            <div id="deleteAccountModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeDeleteAccountModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500/30"><i class="fas fa-exclamation-triangle text-2xl text-red-400"></i></div>
                        <h3 class="text-lg font-bold text-white">Запрос на удаление аккаунта</h3>
                        <p class="text-sm text-slate-400 mt-2">Ваш аккаунт будет деактивирован. Администратор рассмотрит ваш запрос.</p>
                    </div>
                    <form onsubmit="submitDeleteAccountRequest(event)" class="space-y-4">
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Причина удаления *</label><select id="deleteReason" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"><option value="">Выберите причину</option><option value="no_interest">Больше не интересуют аирдропы</option><option value="too_many_emails">Слишком много уведомлений</option><option value="privacy">Переживаю за приватность</option><option value="other">Другая причина</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Комментарий (необязательно)</label><textarea id="deleteComment" rows="3" placeholder="Дополнительные пояснения..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none resize-none"></textarea></div>
                        <div class="flex gap-3"><button type="button" onclick="closeDeleteAccountModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2.5 rounded-lg text-sm">Отмена</button><button type="submit" class="flex-1 bg-red-600 hover:bg-red-500 py-2.5 rounded-lg text-sm font-bold text-white">Отправить запрос</button></div>
                    </form>
                </div>
            </div>

            <!-- Newsletter Success Modal -->
            <div id="newsletterModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
                    <div class="text-center">
                        <div class="success-icon w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30"><i class="fas fa-check text-2xl text-emerald-400"></i></div>
                        <h3 class="text-lg font-bold text-white mb-2">Подписка оформлена!</h3>
                        <p class="text-slate-400 mb-4 text-sm">Вы будете получать уведомления о новых аирдропах.</p>
                        <button onclick="closeNewsletterModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-colors w-full">Закрыть</button>
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
            case 'faq': html = getFAQContent(); break;
            case 'guides': html = getGuidesContent(); break;
            case 'account': html = getAccountContent(); break;
            default: html = '<p class="text-center text-slate-400 p-8">Страница в разработке</p>';
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

    function getFAQContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="fas fa-question-circle text-cyan-400"></i> Часто задаваемые вопросы</h2>
                <p class="text-slate-400 mt-2">Ответы на популярные вопросы о AirdropLab</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="space-y-4">${FOOTER_CONFIG.faq.map((item, index) => `<div class="faq-item border border-slate-700/50 rounded-xl overflow-hidden"><button onclick="toggleFaqItem(${index})" class="faq-question w-full text-left p-4 flex items-center justify-between gap-4 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"><span class="font-medium text-white">${item.question}</span><i class="fas fa-chevron-down text-slate-400 transition-transform" id="faq-icon-${index}"></i></button><div class="faq-answer hidden p-4 pt-0 text-slate-300 text-sm leading-relaxed" id="faq-answer-${index}">${item.answer}</div></div>`).join('')}</div>
                <div class="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl"><h4 class="font-bold text-white mb-2 flex items-center gap-2"><i class="fas fa-info-circle text-blue-400"></i> Не нашли ответ?</h4><p class="text-sm text-slate-400 mb-3">Свяжитесь с нашей службой поддержки</p><button onclick="closePageModal(); setTimeout(() => openSupportModal(), 300);" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium">Написать в поддержку</button></div>
            </div>`;
    }

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        if (answer.classList.contains('hidden')) { answer.classList.remove('hidden'); icon.classList.add('rotate-180'); }
        else { answer.classList.add('hidden'); icon.classList.remove('rotate-180'); }
    };

    function initFAQ() { console.log('FAQ initialized'); }

    function getGuidesContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="fas fa-book-open text-cyan-400"></i> Гайды</h2>
                <p class="text-slate-400 mt-2">Пошаговые инструкции по участию в тестнетах</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="grid gap-4">${FOOTER_CONFIG.guides.map(guide => `<div class="guide-card border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-colors bg-slate-800/30"><div class="flex items-start gap-4"><div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">${guide.logo ? `<img src="${guide.logo}" alt="${guide.title}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-2xl\\'>${guide.title.charAt(0)}</div>'">` : `<div class="w-full h-full flex items-center justify-center text-2xl font-bold text-cyan-400">${guide.title.charAt(0)}</div>`}</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap mb-1"><h3 class="font-bold text-white">${guide.title}</h3>${guide.status === 'new' ? '<span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">NEW</span>' : ''}${guide.status === 'active' ? '<span class="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full">Активен</span>' : ''}</div><p class="text-sm text-slate-400 mb-2">${guide.description}</p><a href="${guide.link}" target="_blank" class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium text-white"><i class="fas fa-external-link-alt"></i> Перейти к гайду</a></div></div></div>`).join('')}</div>
            </div>`;
    }

    function getAccountContent() {
        const user = typeof currentUser !== 'undefined' ? currentUser : null;
        const userData = typeof window.userProfileData !== 'undefined' ? window.userProfileData : {};
        
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="fas fa-user-cog text-emerald-400"></i> Личный кабинет</h2>
                <p class="text-slate-400 mt-2">Управление профилем и настройками</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${user ? `
                    <div class="flex items-center gap-6 mb-8 pb-6 border-b border-slate-700/50">
                        <div class="relative group">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500/50">
                                <img id="accountAvatar" src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'U') + '&background=random'}" alt="Avatar" class="w-full h-full object-cover">
                            </div>
                            <label for="avatarUpload" class="absolute bottom-0 right-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500 transition-colors shadow-lg"><i class="fas fa-camera text-white text-xs"></i></label>
                            <input type="file" id="avatarUpload" accept="image/*" class="hidden" onchange="uploadAvatar(event)">
                        </div>
                        <div><h3 class="text-xl font-bold text-white">${user.displayName || 'Пользователь'}</h3><p class="text-slate-400">${user.email}</p><p class="text-xs text-slate-500 mt-1">ID: ${user.uid.substring(0, 8)}...</p></div>
                    </div>
                    
                    <form id="accountForm" onsubmit="saveAccountProfile(event)" class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-sm font-medium text-slate-300 mb-2">Имя</label><input type="text" id="profileFirstName" value="${userData.firstName || ''}" placeholder="Иван" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"></div>
                            <div><label class="block text-sm font-medium text-slate-300 mb-2">Фамилия</label><input type="text" id="profileLastName" value="${userData.lastName || ''}" placeholder="Иванов" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"></div>
                        </div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Telegram</label><input type="text" id="profileTelegram" value="${userData.telegram || ''}" placeholder="@username" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Страна</label><select id="profileCountry" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"><option value="">Выберите страну</option><option value="RU" ${userData.country === 'RU' ? 'selected' : ''}>Россия</option><option value="UA" ${userData.country === 'UA' ? 'selected' : ''}>Украина</option><option value="KZ" ${userData.country === 'KZ' ? 'selected' : ''}>Казахстан</option><option value="BY" ${userData.country === 'BY' ? 'selected' : ''}>Беларусь</option><option value="US" ${userData.country === 'US' ? 'selected' : ''}>США</option><option value="OTHER" ${userData.country === 'OTHER' ? 'selected' : ''}>Другое</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">О себе</label><textarea id="profileBio" rows="3" placeholder="Расскажите о себе..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none resize-none">${userData.bio || ''}</textarea></div>
                        
                        <div class="flex gap-3 pt-4">
                            <button type="button" onclick="closePageModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">Отмена</button>
                            <button type="submit" class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all"><i class="fas fa-save mr-2"></i>Сохранить</button>
                        </div>
                    </form>
                    
                    <!-- Дополнительные настройки -->
                    <div class="mt-8 pt-6 border-t border-slate-700/50">
                        <h4 class="font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-cog text-slate-400"></i> Дополнительные настройки</h4>
                        
                        <div class="space-y-3">
                            <button onclick="openChangePasswordModal()" class="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors">
                                <div class="flex items-center gap-3"><i class="fas fa-key text-yellow-400"></i><span class="text-slate-300">Изменить пароль</span></div>
                                <i class="fas fa-chevron-right text-slate-500"></i>
                            </button>
                            
                            <button onclick="openDeleteAccountModal()" class="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors">
                                <div class="flex items-center gap-3"><i class="fas fa-trash-alt text-red-400"></i><span class="text-red-400">Удалить аккаунт</span></div>
                                <i class="fas fa-chevron-right text-slate-500"></i>
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="text-center py-8">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><i class="fas fa-user-lock text-4xl text-slate-500"></i></div>
                        <h3 class="text-xl font-bold text-white mb-2">Вход не выполнен</h3>
                        <p class="text-slate-400 mb-6">Войдите в аккаунт для управления профилем</p>
                        <button onclick="closePageModal(); setTimeout(() => { if(typeof openLoginModal==='function') openLoginModal(); }, 300);" class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all"><i class="fas fa-sign-in-alt mr-2"></i>Войти</button>
                    </div>
                `}
            </div>`;
    }

    function initAccountPage() {
        // Загружаем данные профиля из Firebase если авторизован
        if (typeof currentUser !== 'undefined' && currentUser && typeof db !== 'undefined') {
            loadUserProfileData(currentUser);
        }
        updateFooterSupportBadge();
    }

    // ============ SUPPORT MODAL ============

    window.openSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) {
            if (typeof currentUser !== 'undefined' && currentUser) {
                document.getElementById('supportSubject').value = '';
                document.getElementById('supportMessage').value = '';
            }
            modal.classList.add('active');
        }
    };

    window.closeSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) modal.classList.remove('active');
    };

    window.submitSupportTicket = async function(e) {
        e.preventDefault();
        
        const btn = document.getElementById('supportSubmitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        btn.disabled = true;
        
        const categoryText = document.getElementById('supportCategory').options[document.getElementById('supportCategory').selectedIndex].text;
        
        const ticketData = {
            type: 'support', // Это обращение в поддержку
            supportCategory: document.getElementById('supportCategory').value,
            supportCategoryText: categoryText,
            subject: document.getElementById('supportSubject').value,
            message: document.getElementById('supportMessage').value,
            userId: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.uid : 'guest',
            userName: (typeof currentUser !== 'undefined' && currentUser) ? (currentUser.displayName || currentUser.email) : 'Гость',
            userEmail: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.email : '',
            userPhoto: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.photoURL || '' : '',
            status: 'open',
            read: false,
            userRead: true,
            deleted: false,
            userDeleted: false,
            createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
            messages: [{
                sender: 'user',
                text: document.getElementById('supportMessage').value,
                timestamp: new Date().toISOString()
            }]
        };
        
        try {
            if (typeof db !== 'undefined' && typeof addDoc !== 'undefined') {
                await addDoc(collection(db, "feedbacks"), ticketData);
                footerShowToast('Обращение отправлено! Мы ответим в течение 24 часов.');
            } else {
                // Сохраняем локально если Firebase недоступен
                const supportTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
                ticketData.id = 'local_' + Date.now();
                ticketData.createdAt = new Date().toISOString();
                supportTickets.push(ticketData);
                localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
                footerShowToast('Обращение сохранено локально');
            }
        } catch(err) {
            console.error('Error submitting support ticket:', err);
            footerShowToast('Ошибка отправки. Попробуйте позже.');
        }
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        document.getElementById('supportForm').reset();
        closeSupportModal();
        
        // Обновляем бейдж
        updateFooterSupportBadge();
    };

    // ============ MY SUPPORT MESSAGES ============

    window.openSupportMessagesModal = function() {
        if (!currentUser) {
            footerShowToast('Войдите для просмотра обращений');
            if (typeof openLoginModal === 'function') openLoginModal();
            return;
        }
        
        const modal = document.getElementById('supportMessagesModal');
        const content = document.getElementById('supportMessagesContent');
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="fas fa-comments text-purple-400"></i> Мои обращения в поддержку</h2>
                <p class="text-slate-400 mt-2" id="supportMessagesCount">Загрузка...</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto" id="supportMessagesList">
                <div class="text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-cyan-400"></i></div>
            </div>`;
        
        modal.classList.add('active');
        
        loadSupportMessages();
    };

    window.closeSupportMessagesModal = function() {
        const modal = document.getElementById('supportMessagesModal');
        if (modal) modal.classList.remove('active');
    };

    async function loadSupportMessages() {
        if (!currentUser) return;
        
        const listContainer = document.getElementById('supportMessagesList');
        const countContainer = document.getElementById('supportMessagesCount');
        
        try {
            let supportTickets = [];
            
            if (typeof db !== 'undefined') {
                const q = query(
                    collection(db, "feedbacks"),
                    where("userId", "==", currentUser.uid),
                    where("type", "==", "support")
                );
                const snapshot = await getDocs(q);
                snapshot.forEach(doc => {
                    supportTickets.push({ id: doc.id, ...doc.data() });
                });
            } else {
                // Локальные данные
                const local = JSON.parse(localStorage.getItem('supportTickets') || '[]');
                supportTickets = local.filter(t => t.userId === currentUser.uid);
            }
            
            // Сортируем по дате
            supportTickets.sort((a, b) => {
                const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
                const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
                return dateB - dateA;
            });
            
            countContainer.textContent = `${supportTickets.length} обращений`;
            
            if (supportTickets.length === 0) {
                listContainer.innerHTML = `
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><i class="fas fa-inbox text-3xl text-slate-500"></i></div>
                        <h3 class="text-lg font-bold text-white mb-2">Нет обращений</h3>
                        <p class="text-slate-400 text-sm mb-4">Вы еще не обращались в поддержку</p>
                        <button onclick="closeSupportMessagesModal(); setTimeout(() => openSupportModal(), 300);" class="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm">Создать обращение</button>
                    </div>`;
                return;
            }
            
            listContainer.innerHTML = supportTickets.map(ticket => {
                const date = ticket.createdAt ? (ticket.createdAt.toDate ? ticket.createdAt.toDate() : new Date(ticket.createdAt)) : new Date();
                const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const lastMessage = ticket.messages && ticket.messages.length > 0 ? ticket.messages[ticket.messages.length - 1] : { text: ticket.message || 'Нет сообщений' };
                const hasNewReply = !ticket.userRead && ticket.messages && ticket.messages.length > 1;
                
                return `
                    <div class="support-ticket-card border border-slate-700/50 rounded-xl p-4 mb-4 hover:border-purple-500/50 transition-colors ${hasNewReply ? 'bg-purple-500/10' : 'bg-slate-800/30'}">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <h4 class="font-bold text-white">${ticket.subject || ticket.supportCategoryText || 'Обращение'}</h4>
                                    ${hasNewReply ? '<span class="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>' : ''}
                                </div>
                                <p class="text-xs text-slate-500 mt-1">${dateStr}</p>
                            </div>
                            <span class="px-2 py-1 rounded text-xs ${ticket.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}">${ticket.status === 'open' ? 'Открыт' : 'Закрыт'}</span>
                        </div>
                        <p class="text-sm text-slate-400 mb-3 line-clamp-2">${lastMessage.text}</p>
                        <button onclick="openSupportChat('${ticket.id}')" class="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2"><i class="fas fa-arrow-right"></i> ${hasNewReply ? 'Посмотреть ответ' : 'Открыть чат'}</button>
                    </div>`;
            }).join('');
            
        } catch(err) {
            console.error('Error loading support messages:', err);
            listContainer.innerHTML = '<p class="text-center text-red-400 py-8">Ошибка загрузки обращений</p>';
        }
    }

    window.openSupportChat = async function(ticketId) {
        // Используем существующую систему feedback для чата
        if (typeof openFeedbackFromList === 'function') {
            openFeedbackFromList(ticketId, 'support', 'Служба поддержки');
        }
    };

    function updateFooterSupportBadge() {
        if (!currentUser) return;
        
        const badge = document.getElementById('footerSupportBadge');
        if (!badge) return;
        
        // Подсчитываем непрочитанные обращения
        if (typeof db !== 'undefined') {
            getDocs(query(collection(db, "feedbacks"), where("userId", "==", currentUser.uid), where("type", "==", "support"), where("userRead", "==", false)))
                .then(snapshot => {
                    const count = snapshot.size;
                    if (count > 0) {
                        badge.textContent = count > 9 ? '9+' : count;
                        badge.classList.remove('hidden');
                    } else {
                        badge.classList.add('hidden');
                    }
                })
                .catch(() => {});
        }
    }

    // ============ ACCOUNT ACTIONS ============

    window.openChangePasswordModal = function() {
        if (!currentUser) {
            footerShowToast('Войдите для изменения пароля');
            return;
        }
        
        // Проверяем метод входа
        const provider = currentUser.providerData && currentUser.providerData[0] ? currentUser.providerData[0].providerId : '';
        
        if (provider === 'password') {
            footerShowToast('Функция смены пароля скоро будет доступна');
        } else if (provider === 'google.com' || provider === 'twitter.com') {
            footerShowToast('Пароль управляется через ' + (provider === 'google.com' ? 'Google' : 'Twitter'));
        } else {
            footerShowToast('Смена пароля недоступна для этого способа входа');
        }
    };

    window.openDeleteAccountModal = function() {
        if (!currentUser) {
            footerShowToast('Войдите для удаления аккаунта');
            return;
        }
        document.getElementById('deleteAccountModal').classList.add('active');
    };

    window.closeDeleteAccountModal = function() {
        document.getElementById('deleteAccountModal').classList.remove('active');
    };

    window.submitDeleteAccountRequest = async function(e) {
        e.preventDefault();
        
        if (!currentUser) {
            footerShowToast('Войдите для удаления аккаунта');
            return;
        }
        
        const reason = document.getElementById('deleteReason').value;
        const comment = document.getElementById('deleteComment').value;
        
        if (!reason) {
            footerShowToast('Выберите причину удаления');
            return;
        }
        
        try {
            const requestData = {
                type: 'account_deletion',
                userId: currentUser.uid,
                userEmail: currentUser.email,
                userName: currentUser.displayName || 'Пользователь',
                reason: reason,
                comment: comment,
                status: 'pending',
                createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString()
            };
            
            if (typeof db !== 'undefined') {
                await addDoc(collection(db, "accountDeletionRequests"), requestData);
                footerShowToast('Запрос на удаление отправлен администратору');
            } else {
                // Локально
                const requests = JSON.parse(localStorage.getItem('deletionRequests') || '[]');
                requests.push({ ...requestData, id: 'local_' + Date.now(), createdAt: new Date().toISOString() });
                localStorage.setItem('deletionRequests', JSON.stringify(requests));
                footerShowToast('Запрос сохранен локально');
            }
            
            closeDeleteAccountModal();
            document.getElementById('deleteReason').value = '';
            document.getElementById('deleteComment').value = '';
            
        } catch(err) {
            console.error('Error submitting deletion request:', err);
            footerShowToast('Ошибка отправки запроса');
        }
    };

    // ============ PROFILE SAVE ============

    window.saveAccountProfile = async function(e) {
        e.preventDefault();
        
        const profileData = {
            firstName: document.getElementById('profileFirstName').value,
            lastName: document.getElementById('profileLastName').value,
            telegram: document.getElementById('profileTelegram').value,
            country: document.getElementById('profileCountry').value,
            bio: document.getElementById('profileBio').value,
            updatedAt: new Date().toISOString()
        };
        
        // Сохраняем локально
        window.userProfileData = { ...window.userProfileData, ...profileData };
        localStorage.setItem('userProfileData', JSON.stringify(window.userProfileData));
        
        // Сохраняем в Firebase
        if (currentUser && typeof db !== 'undefined') {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await setDoc(userRef, { profile: profileData }, { merge: true });
                
                // Обновляем отображение на главной странице
                updateMainPageUserData(profileData);
                
                footerShowToast('Профиль сохранён!');
            } catch(err) {
                console.error('Error saving profile:', err);
                footerShowToast('Профиль сохранён локально');
            }
        } else {
            footerShowToast('Профиль сохранён локально');
        }
    };

    function updateMainPageUserData(profileData) {
        // Обновляем имя на главной странице
        const userNameEl = document.getElementById('userName');
        if (userNameEl && profileData.firstName) {
            const fullName = profileData.firstName + (profileData.lastName ? ' ' + profileData.lastName : '');
            userNameEl.textContent = fullName;
        }
    }

    async function loadUserProfileData(user) {
        if (!user || !user.uid) return;
        
        try {
            if (typeof db !== 'undefined') {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.profile) {
                        window.userProfileData = data.profile;
                        localStorage.setItem('userProfileData', JSON.stringify(data.profile));
                        
                        // Обновляем отображение на главной
                        updateMainPageUserData(data.profile);
                    }
                }
            }
        } catch(err) {
            console.log('Profile load error:', err);
        }
    }

    window.uploadAvatar = async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async function(event) {
            const img = document.getElementById('accountAvatar');
            img.src = event.target.result;
            
            // Обновляем на главной странице
            const mainAvatar = document.getElementById('userAvatar');
            if (mainAvatar) mainAvatar.src = event.target.result;
            
            if (currentUser && typeof db !== 'undefined') {
                try {
                    await updateDoc(doc(db, "users", currentUser.uid), {
                        photoURL: event.target.result
                    });
                    footerShowToast('Фото обновлено!');
                } catch(err) {
                    footerShowToast('Фото обновлено (локально)');
                }
            } else {
                footerShowToast('Фото обновлено');
            }
        };
        reader.readAsDataURL(file);
    };

    // ============ LEGAL MODALS ============

    window.openLegalModal = function(type) {
        const legalData = FOOTER_CONFIG.legal[type];
        if (!legalData) return;
        
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;
        
        const icons = { terms: 'fa-file-contract text-purple-400', privacy: 'fa-shield-alt text-blue-400', cookie: 'fa-cookie-bite text-orange-400', disclaimer: 'fa-exclamation-triangle text-red-400' };
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center"><i class="fas ${icons[type]} text-xl"></i></div>
                    <div><h2 class="text-2xl font-bold text-white">${legalData.title}</h2><p class="text-sm text-slate-400">Обновлено: ${legalData.lastUpdated}</p></div>
                </div>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto legal-content">${legalData.content}</div>
            <div class="p-4 border-t border-slate-700/50 bg-slate-900/50"><button onclick="closePageModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">Закрыть</button></div>`;
        
        modal.classList.add('active');
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v3')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles-v3';
        styles.textContent = `
            .site-footer { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; }
            .footer-bg-gradient, .footer-bg-pattern { pointer-events: none; }
            .footer-logo-wrapper { transform: perspective(1000px); }
            .footer-logo-wrapper:hover .footer-logo { rotate: Y 15deg; }
            .social-link { position: relative; overflow: hidden; }
            .social-link::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, currentColor 0%, transparent 70%); opacity: 0; transition: opacity 0.3s; }
            .social-link:hover::before { opacity: 0.1; }
            .social-link:active { transform: scale(0.95); }
            .footer-link { position: relative; padding: 4px 0; transition: all 0.2s ease; }
            .footer-link:hover { transform: translateX(6px); }
            .footer-link:hover i { transform: scale(1.2); }
            .footer-link i { transition: transform 0.2s ease; }
            .footer-email-input { box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); }
            .footer-email-input:focus { box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1); }
            .footer-email-input.error { border-color: #ef4444 !important; animation: shake 0.5s; }
            .footer-email-input.success { border-color: #10b981 !important; background: rgba(16, 185, 129, 0.1) !important; }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
            .subscribe-btn { position: relative; overflow: hidden; }
            .subscribe-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: translateX(-100%); transition: transform 0.5s; }
            .subscribe-btn:hover::before { transform: translateX(100%); }
            .back-to-top { opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .back-to-top.visible { opacity: 1; visibility: visible; }
            .back-to-top:hover { transform: translateY(-3px) scale(1.05) !important; box-shadow: 0 10px 30px rgba(34, 211, 238, 0.4) !important; }
            .status-dot { animation: statusPulse 2s infinite; }
            @keyframes statusPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
            .page-modal-content { max-width: 700px; width: 95%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 1rem; background: rgba(15, 23, 42, 0.98); border: 1px solid rgba(255,255,255,0.1); }
            .faq-question { border: none; background: none; width: 100%; cursor: pointer; }
            .faq-answer { border-top: none; }
            .guide-card:hover { transform: translateY(-2px); }
            .legal-content h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 1.5rem 0 0.75rem; }
            .legal-content h3:first-child { margin-top: 0; }
            .legal-content h4 { font-size: 1rem; font-weight: 600; color: #e2e8f0; margin: 1.25rem 0 0.5rem; }
            .legal-content p { color: #cbd5e1; line-height: 1.7; margin-bottom: 0.75rem; }
            .legal-content ul { margin: 0.5rem 0 1rem 1.5rem; }
            .legal-content li { color: #cbd5e1; margin-bottom: 0.5rem; }
            .legal-content strong { color: #fff; }
            .modal-md { max-width: 500px; }
            @media (max-width: 768px) {
                .site-footer .grid { grid-template-columns: 1fr; gap: 2rem; }
                .site-footer [class*="col-span"] { grid-column: 1 / -1 !important; }
                .footer-link { padding: 0.5rem 0; }
                .back-to-top { bottom: 5rem; right: 1rem; width: 48px; height: 48px; }
                .footer-newsletter { padding: 1rem; }
                .newsletter-form { flex-direction: column; }
                .subscribe-btn { width: 100%; justify-content: center; }
                .page-modal-content { width: 98%; max-height: 95vh; }
            }
            html { scroll-behavior: smooth; }
            .support-ticket-card { cursor: pointer; }
            .support-ticket-card:hover { transform: translateX(4px); }
        `;
        document.head.appendChild(styles);
    }

    // ============ FUNCTIONS ============

    function initializeFooterFunctions() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        initBackToTop();
        initNewsletterForm();
        initFooterLinks();
        updateFooterStats();
        updateFooterLanguageButton();
        
        // Обновляем бейдж поддержки
        if (currentUser) {
            updateFooterSupportBadge();
        }
        
        console.log('Footer v2.3 initialized successfully');
    }

    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
        backToTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    window.footerScrollToTop = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); footerShowToast('Наверх'); };

    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        form.addEventListener('submit', function(e) { e.preventDefault(); handleNewsletterSubscription(); });
    }

    function handleNewsletterSubscription() {
        const emailInput = document.getElementById('footerEmailInput');
        const subscribeBtn = document.getElementById('subscribeBtn');
        if (!emailInput || !subscribeBtn) return;

        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
            emailInput.classList.add('error');
            footerShowToast('Введите корректный email', 'error');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
            emailInput.focus();
            return;
        }

        subscribeBtn.classList.add('loading');
        const originalText = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = '<span>Отправка...</span>';

        setTimeout(() => {
            subscribeBtn.classList.remove('loading');
            subscribeBtn.innerHTML = originalText;
            emailInput.value = '';
            emailInput.placeholder = 'Спасибо! ✓';
            emailInput.classList.add('success');
            setTimeout(() => showNewsletterModal(), 500);
            footerShowToast('Подписка оформлена!');
            setTimeout(() => { emailInput.placeholder = 'Ваш email'; emailInput.classList.remove('success'); }, 5000);
        }, 1500);
    }

    function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    window.footerSubscribeNewsletter = function(e) { e.preventDefault(); handleNewsletterSubscription(); return false; };

    function showNewsletterModal() {
        const modal = document.getElementById('newsletterModal');
        if (modal) { modal.style.display = 'flex'; setTimeout(() => modal.classList.add('active'), 10); }
    }
    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) { modal.classList.remove('active'); setTimeout(() => modal.style.display = 'none', 300); }
    };

    function initFooterLinks() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;
        footer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) { e.preventDefault(); targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        });
    }

    function updateFooterStats() {
        let projectCount = 0;
        if (typeof window.projects !== 'undefined' && window.projects) projectCount = window.projects.length;
        const projectEl = document.getElementById('footerProjectCount');
        if (projectEl) { projectEl.textContent = projectCount; if (projectCount > 0) projectEl.classList.add('text-cyan-400'); }
        setTimeout(updateFooterStats, 30000);
    }

    function updateFooterLanguageButton() {
        const footerLangBtn = document.getElementById('footerLangBtn');
        const langFlag = document.querySelector('.lang-flag-footer');
        const langText = document.querySelector('.lang-text-footer');
        if (footerLangBtn && langFlag && langText) {
            const currentLang = typeof window.currentLang !== 'undefined' ? window.currentLang : 'ru';
            const langConfig = currentLang === 'en' ? { flag: '🇺🇸', text: 'ENG' } : { flag: '🇷🇺', text: 'РУС' };
            langFlag.textContent = langConfig.flag;
            langText.textContent = langConfig.text;
        }
    }

    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') window.toggleLang();
        else if (typeof window.setLanguage === 'function') {
            const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
            window.setLanguage(newLang);
        }
        setTimeout(updateFooterLanguageButton, 100);
        footerShowToast('Язык изменён');
    };

    function footerShowToast(message, type = 'success') {
        if (typeof window.showToast === 'function') { window.showToast(message); return; }
        let toast = document.getElementById('footer-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'footer-toast';
            toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 14px 20px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4); transform: translateY(100px); opacity: 0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 9999; display: flex; align-items: center; gap: 10px; font-size: 14px; font-family: 'Inter', sans-serif;`;
            document.body.appendChild(toast);
        }
        const icons = { success: '<i class="fas fa-check-circle" style="color: #10b981;"></i>', error: '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>', info: '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>' };
        toast.innerHTML = (icons[type] || icons.success) + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.transform = 'translateY(100px)'; toast.style.opacity = '0'; }, 3000);
    }

    // Initialize
    DOMReady(function() { setTimeout(initFooter, 100); });
    if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(initFooter, 100); }

})();
