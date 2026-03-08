/**
 * ============================================
 * AirdropLab Footer Module v2.2
 * Реальные страницы: FAQ, Поддержка, Аккаунт, Уведомления
 * ============================================
 */

(function() {
    'use strict';

    const FOOTER_CONFIG = {
        company: {
            name: 'AirdropLab',
            version: 'v2.2',
            tagline: 'Лаборатория крипто-возможностей'
        },
        social: {
            twitter: '',
            telegram: '',
            discord: '',
            youtube: '',
            email: 'support@airdroplab.com'
        },
        // Данные для FAQ
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
        // Данные для юридических документов
        legal: {
            terms: {
                title: 'Условия использования',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Общие положения</h3>
                    <p>Настоящие Условия использования (далее - "Условия") регулируют отношения между вами и AirdropLab при использовании сайта airdroplab.com (далее - "Сервис").</p>
                    <p>Используя Сервис, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо положениями, пожалуйста, не используйте наш Сервис.</p>
                    
                    <h3>2. Описание сервиса</h3>
                    <p>AirdropLab предоставляет информационные услуги по:</p>
                    <ul>
                        <li>Мониторингу криптовалютных проектов и аирдропов</li>
                        <li>Предоставлению гайдов по участию в тестнетах</li>
                        <li>Отслеживанию прогресса выполнения заданий</li>
                        <li>Уведомлению о новых возможностях</li>
                    </ul>
                    
                    <h3>3. Регистрация и аккаунт</h3>
                    <p>При регистрации вы обязуетесь предоставить достоверную информацию и поддерживать её актуальность. Вы несете ответственность за сохранность своего аккаунта и пароля.</p>
                    
                    <h3>4. Правила использования</h3>
                    <p>При использовании Сервиса запрещается:</p>
                    <ul>
                        <li>Нарушать работу Сервиса или пытаться получить несанкционированный доступ</li>
                        <li>Использовать Сервис для незаконных целей</li>
                        <li>Публиковать вредоносный контент или спам</li>
                        <li>Присваивать себе авторство чужих материалов</li>
                    </ul>
                    
                    <h3>5. Интеллектуальная собственность</h3>
                    <p>Весь контент на Сервисе, включая тексты, графику, логотипы и код, принадлежит AirdropLab или соответствующим правообладателям. Копирование материалов без разрешения запрещено.</p>
                    
                    <h3>6. Отказ от ответственности</h3>
                    <p>Сервис предоставляется "как есть". Мы не гарантируем точность информации и не несем ответственности за любые убытки, возникшие в результате использования Сервиса.</p>
                    
                    <h3>7. Изменения в условиях</h3>
                    <p>Мы оставляем право изменять настоящие Условия в любое время. Продолжая использовать Сервис после изменений, вы соглашаетесь с новыми условиями.</p>
                    
                    <h3>8. Контакты</h3>
                    <p>По вопросам, связанным с настоящими Условиями, обращайтесь: support@airdroplab.com</p>
                `
            },
            privacy: {
                title: 'Политика конфиденциальности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Введение</h3>
                    <p>Политика конфиденциальности AirdropLab объясняет, как мы собираем, используем и защищаем ваши персональные данные.</p>
                    
                    <h3>2. Какие данные мы собираем</h3>
                    <ul>
                        <li><strong>Данные аккаунта:</strong> имя, email, фото профиля (при регистрации через соцсети)</li>
                        <li><strong>Данные об использовании:</strong> история посещений, выполненные задания, избранные проекты</li>
                        <li><strong>Технические данные:</strong> IP-адрес, тип браузера, устройство</li>
                    </ul>
                    
                    <h3>3. Как мы используем данные</h3>
                    <p>Ваши данные используются для:</p>
                    <ul>
                        <li>Предоставления доступа к функциям Сервиса</li>
                        <li>Персонализации вашего опыта</li>
                        <li>Улучшения качества Сервиса</li>
                        <li>Отправки уведомлений о новых аирдропах</li>
                        <li>Обеспечения безопасности аккаунта</li>
                    </ul>
                    
                    <h3>4. Защита данных</h3>
                    <p>Мы применяем современные методы защиты данных:</p>
                    <ul>
                        <li>Шифрование данных при передаче (SSL/TLS)</li>
                        <li>Безопасное хранение паролей (bcrypt)</li>
                        <li>Регулярный аудит безопасности</li>
                        <li>Ограниченный доступ к персональным данным</li>
                    </ul>
                    
                    <h3>5. Передача данных третьим лицам</h3>
                    <p>Мы не продаем ваши персональные данные. Передача возможна только:</p>
                    <ul>
                        <li>При вашем согласии</li>
                        <li>Для выполнения услуг (Firebase, хостинг)</li>
                        <li>По требованию закона</li>
                    </ul>
                    
                    <h3>6. Ваши права</h3>
                    <p>Вы имеете право:</p>
                    <ul>
                        <li>Получить доступ к своим данным</li>
                        <li>Исправить неточные данные</li>
                        <li>Удалить аккаунт и данные</li>
                        <li>Отказаться от обработки данных</li>
                        <li>Экспортировать свои данные</li>
                    </ul>
                    
                    <h3>7. Cookies</h3>
                    <p>Мы используем cookies для аутентификации, запоминания настроек и анализа посещаемости. Вы можете отключить cookies в браузере.</p>
                    
                    <h3>8. Контакты</h3>
                    <p>По вопросам конфиденциальности: privacy@airdroplab.com</p>
                `
            },
            cookie: {
                title: 'Политика использования Cookies',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Что такое Cookies</h3>
                    <p>Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов. Они помогают сайтам запоминать ваши действия и предпочтения.</p>
                    
                    <h3>2. Какие cookies мы используем</h3>
                    
                    <h4>Необходимые cookies</h4>
                    <p>Эти cookies необходимы для работы Сервиса:</p>
                    <ul>
                        <li><strong>auth_token:</strong> для аутентификации пользователя</li>
                        <li><strong>session_id:</strong> для поддержки сессии</li>
                        <li><strong>preferences:</strong> для сохранения настроек</li>
                    </ul>
                    
                    <h4>Аналитические cookies</h4>
                    <p>Помогают нам улучшать Сервис:</p>
                    <ul>
                        <li><strong>_ga:</strong> Google Analytics (2 года)</li>
                        <li><strong>_gid:</strong> Google Analytics (24 часа)</li>
                    </ul>
                    
                    <h3>3. Управление cookies</h3>
                    <p>Вы можете:</p>
                    <ul>
                        <li>Отключить cookies в настройках браузера</li>
                        <li>Удалить существующие cookies</li>
                        <li>Настроить уведомления о cookies</li>
                    </ul>
                    <p><strong>Внимание:</strong> Отключение cookies может повлиять на работу некоторых функций Сервиса.</p>
                    
                    <h3>4. Сторонние сервисы</h3>
                    <p>Мы используем сторонние сервисы, которые также могут устанавливать cookies:</p>
                    <ul>
                        <li>Firebase (аутентификация, база данных)</li>
                        <li>Google Analytics (аналитика)</li>
                        <li>CryptoRank (данные о криптовалютах)</li>
                    </ul>
                `
            },
            disclaimer: {
                title: 'Отказ от ответственности',
                lastUpdated: '07 марта 2026',
                content: `
                    <h3>1. Информационная цель</h3>
                    <p>AirdropLab предоставляет исключительно информационные услуги. Мы не являемся финансовым консультантом, брокером или инвестиционной компанией.</p>
                    
                    <h3>2. Информация не является советом</h3>
                    <p>Вся информация на Сервисе носит ознакомительный характер и не является:</p>
                    <ul>
                        <li>Финансовым или инвестиционным советом</li>
                        <li>Рекомендацией к покупке/продаже криптовалют</li>
                        <li>Гарантией прибыли или доходности</li>
                    </ul>
                    
                    <h3>3. Риски криптовалют</h3>
                    <p>Инвестиции в криптовалюту сопряжены с высокими рисками:</p>
                    <ul>
                        <li><strong>Волатильность:</strong> цены могут резко изменяться</li>
                        <li><strong>Потеря средств:</strong> возможна полная потеря инвестиций</li>
                        <li><strong>Мошенничество:</strong> существуют скамы и мошеннические проекты</li>
                        <li><strong>Технические риски:</strong> взломы, потеря ключей</li>
                        <li><strong>Регуляторные риски:</strong> запреты в разных странах</li>
                    </ul>
                    
                    <h3>4. Ответственность пользователя</h3>
                    <p>Вы несете полную ответственность за:</p>
                    <ul>
                        <li>Собственное исследование проектов</li>
                        <li>Принятие инвестиционных решений</li>
                        <li>Сохранность своих средств и ключей</li>
                        <li>Соблюдение законов вашей страны</li>
                    </ul>
                    
                    <h3>5. Внешние ссылки</h3>
                    <p>Сервис может содержать ссылки на внешние сайты. Мы не несем ответственности за содержание, политику или практики этих сайтов.</p>
                    
                    <h3>6. Ответственность AirdropLab</h3>
                    <p>AirdropLab не несет ответственности за:</p>
                    <ul>
                        <li>Убытки, возникшие в результате использования информации с Сервиса</li>
                        <li>Потерю средств пользователей</li>
                        <li>Действия третьих лиц</li>
                        <li>Технические сбои или перерывы в работе</li>
                    </ul>
                    
                    <h3>7. Тестнеты и аирдропы</h3>
                    <p>Участие в тестнетах и аирдропах:</p>
                    <ul>
                        <li>Не гарантирует получение токенов</li>
                        <li>Не гарантирует ценность токенов</li>
                        <li>Может потребовать выполнения сложных заданий</li>
                        <li>Проекты могут завершиться без распределения токенов</li>
                    </ul>
                    
                    <h3>8. Согласие с рисками</h3>
                    <p>Используя Сервис, вы подтверждаете, что понимаете и принимаете все риски, связанные с криптовалютами и блокчейн-проектами.</p>
                `
            }
        },
        // Гайды для страницы
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
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function initFooter() {
        if (document.getElementById('site-footer')) {
            console.log('Footer v2.2 already exists');
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
                        
                        <!-- Social Links -->
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" title="Twitter">
                                <i class="fab fa-twitter text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" title="Telegram">
                                <i class="fab fa-telegram-plane text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" title="Discord">
                                <i class="fab fa-discord text-lg"></i>
                            </a>
                            <a href="${FOOTER_CONFIG.social.youtube}" target="_blank" rel="noopener noreferrer" 
                               class="social-link group p-2.5 text-slate-400 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30" title="YouTube">
                                <i class="fab fa-youtube text-lg"></i>
                            </a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}" 
                               class="social-link group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" title="Email">
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
                                <span class="text-xs text-emerald-400 font-medium">Live</span>
                            </div>
                            <div class="status-item flex items-center gap-1.5">
                                <span class="status-dot relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-lg shadow-cyan-400/50"></span>
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
                            <a href="#heroSection" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-home text-xs w-4"></i>
                                <span class="text-sm">Главная</span>
                            </a>
                            <a href="#projects" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-layer-group text-xs w-4"></i>
                                <span class="text-sm">Проекты</span>
                            </a>
                            <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-book-open text-xs w-4"></i>
                                <span class="text-sm">Гайды</span>
                            </a>
                            <a href="#" onclick="openSupportModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
    <i class="fas fa-headset text-xs w-4"></i>
    <span class="text-sm">Поддержка</span>
</a>
<a href="#" onclick="openSupportListModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
    <i class="fas fa-inbox text-xs w-4"></i>
    <span class="text-sm">Мои обращения</span>
    <span id="supportListBadge" class="hidden ml-auto bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">0</span>
</a>
                            <a href="https://cryptorank.io" target="_blank" rel="noopener noreferrer" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-chart-line text-xs w-4"></i>
                                <span class="text-sm">CryptoRank</span>
                                <i class="fas fa-external-link-alt text-xs text-slate-500"></i>
                            </a>
                        </nav>
                    </div>
                    
                    <!-- User & Tools -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-user-cog text-emerald-400"></i> 
                            <span>Личный кабинет</span>
                        </h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#" onclick="openPageModal('account'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-user text-xs w-4"></i>
                                <span class="text-sm">Мой аккаунт</span>
                            </a>
                            <a href="#" onclick="openNotificationsModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-bell text-xs w-4"></i>
                                <span class="text-sm">Уведомления</span>
                                <span id="footerNotificationBadge" class="hidden ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">0</span>
                            </a>
                            <a href="#" onclick="openSupportListModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
    <i class="fas fa-life-ring text-xs w-4"></i>
    <span class="text-sm">Мои обращения</span>
</a>
                            <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-question-circle text-xs w-4"></i>
                                <span class="text-sm">FAQ</span>
                            </a>
                            <a href="#" onclick="openTutorialsPage(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-play-circle text-xs w-4"></i>
                                <span class="text-sm">Туториалы</span>
                            </a>
                            <a href="#" onclick="footerToggleLang(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <i class="fas fa-globe text-xs w-4"></i>
                                <span class="text-sm">Язык</span>
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
                    
                    <!-- Legal -->
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <i class="fas fa-gavel text-purple-400"></i> 
                            <span>Юридическая информация</span>
                        </h4>
                        
                        <!-- Legal Links Grid -->
                        <div class="footer-legal-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Документы</h5>
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
                                        <span>24/7</span>
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
                                    <h5 class="text-sm font-semibold text-white flex items-center gap-2">
                                        <i class="fas fa-paper-plane text-yellow-400"></i> 
                                        Подписаться на обновления
                                    </h5>
                                    <p class="text-xs text-slate-500 mt-1">
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
                                           class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg px-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all">
                                </div>
                                <button type="submit" 
                                        id="subscribeBtn" 
                                        class="subscribe-btn px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-2">
                                    <span>Подписаться</span>
                                    <i class="fas fa-paper-plane text-xs"></i>
                                </button>
                            </form>
                            
                            <div class="footer-privacy-note flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                                <i class="fas fa-shield-alt text-emerald-400 text-xs"></i>
                                <span class="text-xs text-slate-500">Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="footer-bottom border-t border-slate-800/50 relative z-10">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div class="footer-copyright text-sm text-slate-500">
                            <span>© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. Все права защищены.</span>
                            <span class="hidden md:inline mx-2">•</span>
                            <span>Сделано с</span>
                            <i class="fas fa-heart text-red-400 mx-1"></i>
                            <span class="text-slate-400">любовью к крипте</span>
                        </div>
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
                            <div class="md:hidden flex items-center gap-2 ml-4 pl-4 border-l border-slate-700">
                                <button onclick="footerToggleLang()" id="footerLangBtn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg border border-slate-700/50 text-xs transition-all text-slate-300">
                                    <span class="lang-flag-footer">🇷🇺</span>
                                    <span class="lang-text-footer">РУС</span>
                                </button>
                            </div>
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
            
            <!-- Back to Top Button -->
            <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-50" title="Наверх">
                <i class="fas fa-chevron-up"></i>
            </button>
            
            <!-- Page Modal Container -->
            <div id="pageModal" class="modal">
                <div class="modal-content page-modal-content p-0 relative">
                    <button onclick="closePageModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center">
                        <i class="fas fa-times"></i>
                    </button>
                    <div id="pageModalContent"></div>
                </div>
            </div>
            
            <!-- Support Modal -->
            <div id="supportModal" class="modal">
                <div class="modal-content modal-md p-6 relative">
                    <button onclick="closeSupportModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                            <i class="fas fa-headset text-purple-400 text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white">Служба поддержки</h2>
                            <p class="text-sm text-slate-400">Мы ответим на ваш вопрос в течение 24 часов</p>
                        </div>
                    </div>
                    
                    <form id="supportForm" onsubmit="submitSupportTicket(event)" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Тема обращения *</label>
                            <select id="supportCategory" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                                <option value="">Выберите категорию</option>
                                <option value="technical">🔧 Техническая проблема</option>
                                <option value="account">👤 Проблема с аккаунтом</option>
                                <option value="project">📋 Вопрос о проекте</option>
                                <option value="suggestion">💡 Предложение</option>
                                <option value="partnership">🤝 Партнёрство</option>
                                <option value="other">💬 Другое</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Ваше имя</label>
                                <input type="text" id="supportName" placeholder="Иван" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                                <input type="email" id="supportEmail" required placeholder="example@mail.com" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Заголовок *</label>
                            <input type="text" id="supportSubject" required placeholder="Краткое описание проблемы" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Подробное описание *</label>
                            <textarea id="supportMessage" required rows="5" placeholder="Опишите вашу проблему подробно..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none resize-none"></textarea>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="supportNotify" checked class="rounded bg-slate-800 border-slate-600 text-purple-500">
                            <label for="supportNotify" class="text-sm text-slate-400">Уведомить о статусе по email</label>
                        </div>
                        
                        <button type="submit" id="supportSubmitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/20">
                            <i class="fas fa-paper-plane mr-2"></i>Отправить обращение
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Success Modal -->
            <div id="newsletterModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="text-center">
                        <div class="success-icon w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                            <i class="fas fa-check text-2xl text-emerald-400"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Подписка оформлена!</h3>
                        <p class="text-slate-400 mb-4 text-sm">
                            Вы будете получать уведомления о новых аирдропах и важных обновлениях.
                        </p>
                        <div class="flex gap-3">
                            <button onclick="closeNewsletterModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-colors">Закрыть</button>
                        </div>
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
            case 'faq':
                html = getFAQContent();
                break;
            case 'guides':
                html = getGuidesContent();
                break;
            case 'account':
                html = getAccountContent();
                break;
            default:
                html = '<p class="text-center text-slate-400 p-8">Страница в разработке</p>';
        }
        
        content.innerHTML = html;
        modal.classList.add('active');
        
        // Инициализируем функционал страницы
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
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-question-circle text-cyan-400"></i>
                    Часто задаваемые вопросы
                </h2>
                <p class="text-slate-400 mt-2">Ответы на популярные вопросы о AirdropLab</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="space-y-4">
                    ${FOOTER_CONFIG.faq.map((item, index) => `
                        <div class="faq-item border border-slate-700/50 rounded-xl overflow-hidden">
                            <button onclick="toggleFaqItem(${index})" class="faq-question w-full text-left p-4 flex items-center justify-between gap-4 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                                <span class="font-medium text-white">${item.question}</span>
                                <i class="fas fa-chevron-down text-slate-400 transition-transform" id="faq-icon-${index}"></i>
                            </button>
                            <div class="faq-answer hidden p-4 pt-0 text-slate-300 text-sm leading-relaxed" id="faq-answer-${index}">
                                ${item.answer}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
                    <h4 class="font-bold text-white mb-2 flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-400"></i>
                        Не нашли ответ?
                    </h4>
                    <p class="text-sm text-slate-400 mb-3">Свяжитесь с нашей службой поддержки</p>
                    <button onclick="closePageModal(); setTimeout(() => openSupportModal(), 300);" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Написать в поддержку
                    </button>
                </div>
            </div>
        `;
    }

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    };

    function initFAQ() {
        console.log('FAQ initialized');
    }

    function getGuidesContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-book-open text-cyan-400"></i>
                    Гайды
                </h2>
                <p class="text-slate-400 mt-2">Пошаговые инструкции по участию в тестнетах</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="grid gap-4">
                    ${FOOTER_CONFIG.guides.map(guide => `
                        <div class="guide-card border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-colors bg-slate-800/30">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                                    ${guide.logo ? `<img src="${guide.logo}" alt="${guide.title}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-2xl\\'>${guide.title.charAt(0)}</div>'">` : `<div class="w-full h-full flex items-center justify-center text-2xl font-bold text-cyan-400">${guide.title.charAt(0)}</div>`}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 class="font-bold text-white">${guide.title}</h3>
                                        ${guide.status === 'new' ? '<span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">NEW</span>' : ''}
                                        ${guide.status === 'active' ? '<span class="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full">Активен</span>' : ''}
                                    </div>
                                    <p class="text-sm text-slate-400 mb-2">${guide.description}</p>
                                    <div class="flex items-center gap-4 text-xs text-slate-500">
                                        <span class="flex items-center gap-1">
                                            <i class="fas fa-signal text-green-400"></i>
                                            ${guide.difficulty}
                                        </span>
                                    </div>
                                    <a href="${guide.link}" target="_blank" class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium text-white transition-colors">
                                        <i class="fas fa-external-link-alt"></i>
                                        Перейти к гайду
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                    <p class="text-sm text-slate-400 text-center">
                        <i class="fas fa-lock text-slate-500 mr-2"></i>
                        Для доступа к гайдам необходимо выполнить задания на главной странице
                    </p>
                </div>
            </div>
        `;
    }

    function getAccountContent() {
        const user = typeof currentUser !== 'undefined' ? currentUser : null;
        const userData = typeof window.userProfileData !== 'undefined' ? window.userProfileData : {};
        
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-user-cog text-emerald-400"></i>
                    Личный кабинет
                </h2>
                <p class="text-slate-400 mt-2">Управление профилем и настройками</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${user ? `
                    <!-- Avatar Section -->
                    <div class="flex items-center gap-6 mb-8 pb-6 border-b border-slate-700/50">
                        <div class="relative group">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500/50">
                                <img id="accountAvatar" src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'U') + '&background=random'}" alt="Avatar" class="w-full h-full object-cover">
                            </div>
                            <label for="avatarUpload" class="absolute bottom-0 right-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500 transition-colors shadow-lg">
                                <i class="fas fa-camera text-white text-xs"></i>
                            </label>
                            <input type="file" id="avatarUpload" accept="image/*" class="hidden" onchange="uploadAvatar(event)">
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white">${user.displayName || 'Пользователь'}</h3>
                            <p class="text-slate-400">${user.email}</p>
                            <p class="text-xs text-slate-500 mt-1">ID: ${user.uid.substring(0, 8)}...</p>
                        </div>
                    </div>
                    
                    <!-- Profile Form -->
                    <form id="accountForm" onsubmit="saveAccountProfile(event)" class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Имя</label>
                                <input type="text" id="profileFirstName" value="${userData.firstName || ''}" placeholder="Иван" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Фамилия</label>
                                <input type="text" id="profileLastName" value="${userData.lastName || ''}" placeholder="Иванов" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Никнейм</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
                                    <input type="text" id="profileUsername" value="${userData.username || ''}" placeholder="nickname" class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Telegram</label>
                                <input type="text" id="profileTelegram" value="${userData.telegram || ''}" placeholder="@username" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Дата рождения</label>
                            <input type="date" id="profileBirthdate" value="${userData.birthdate || ''}" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Пол</label>
                            <div class="flex gap-4">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="male" ${userData.gender === 'male' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">Мужской</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="female" ${userData.gender === 'female' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">Женский</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="other" ${userData.gender === 'other' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">Другое</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Страна</label>
                            <select id="profileCountry" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                <option value="">Выберите страну</option>
                                <option value="RU" ${userData.country === 'RU' ? 'selected' : ''}>Россия</option>
                                <option value="UA" ${userData.country === 'UA' ? 'selected' : ''}>Украина</option>
                                <option value="KZ" ${userData.country === 'KZ' ? 'selected' : ''}>Казахстан</option>
                                <option value="BY" ${userData.country === 'BY' ? 'selected' : ''}>Беларусь</option>
                                <option value="US" ${userData.country === 'US' ? 'selected' : ''}>США</option>
                                <option value="OTHER" ${userData.country === 'OTHER' ? 'selected' : ''}>Другое</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">О себе</label>
                            <textarea id="profileBio" rows="3" placeholder="Расскажите о себе..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none resize-none">${userData.bio || ''}</textarea>
                        </div>
                        
                        <div class="flex gap-3 pt-4">
                            <button type="button" onclick="closePageModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">
                                Отмена
                            </button>
                            <button type="submit" class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all">
                                <i class="fas fa-save mr-2"></i>Сохранить
                            </button>
                        </div>
                    </form>
                ` : `
                    <div class="text-center py-8">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-lock text-4xl text-slate-500"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Вход не выполнен</h3>
                        <p class="text-slate-400 mb-6">Войдите в аккаунт для управления профилем</p>
                        <button onclick="closePageModal(); setTimeout(() => { if(typeof openLoginModal==='function') openLoginModal(); }, 300);" class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all">
                            <i class="fas fa-sign-in-alt mr-2"></i>Войти
                        </button>
                    </div>
                `}
            </div>
        `;
    }

    function initAccountPage() {
        console.log('Account page initialized');
    }

    window.saveAccountProfile = async function(e) {
        e.preventDefault();
        
        const profileData = {
            firstName: document.getElementById('profileFirstName').value,
            lastName: document.getElementById('profileLastName').value,
            username: document.getElementById('profileUsername').value,
            telegram: document.getElementById('profileTelegram').value,
            birthdate: document.getElementById('profileBirthdate').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            country: document.getElementById('profileCountry').value,
            bio: document.getElementById('profileBio').value,
            updatedAt: new Date().toISOString()
        };
        
        // Сохраняем в localStorage как резерв
        window.userProfileData = profileData;
        localStorage.setItem('userProfileData', JSON.stringify(profileData));
        
        // Если пользователь авторизован, сохраняем в Firebase
        if (typeof currentUser !== 'undefined' && currentUser && typeof db !== 'undefined') {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await setDoc(userRef, { profile: profileData }, { merge: true });
                footerShowToast('Профиль сохранён!');
            } catch(err) {
                console.error('Error saving profile:', err);
                footerShowToast('Профиль сохранён локально');
            }
        } else {
            footerShowToast('Профиль сохранён локально');
        }
    };

    window.uploadAvatar = async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async function(event) {
            const img = document.getElementById('accountAvatar');
            img.src = event.target.result;
            
            // Если авторизован, загружаем в Firebase
            if (typeof currentUser !== 'undefined' && currentUser) {
                footerShowToast('Фото обновлено!');
            }
        };
        reader.readAsDataURL(file);
    };

    // ============ SUPPORT MODAL ============

    window.openSupportModal = function() {
    // Проверяем авторизацию
    if (typeof currentUser === 'undefined' || !currentUser) {
        // Не авторизован - показываем простую форму
        const modal = document.getElementById('supportModal');
        if (modal) {
            modal.classList.add('active');
        }
        return;
    }
    
    // Авторизован - используем систему feedbacks с projectId = '__support__'
    if (typeof openFeedbackModal === 'function') {
        openFeedbackModal('__support__', 'Поддержка AirdropLab');
    } else {
        // Fallback если функция ещё не загружена
        const modal = document.getElementById('supportModal');
        if (modal) {
            if (currentUser) {
                const nameEl = document.getElementById('supportName');
                const emailEl = document.getElementById('supportEmail');
                if (nameEl) nameEl.value = currentUser.displayName || '';
                if (emailEl) emailEl.value = currentUser.email || '';
            }
            modal.classList.add('active');
        }
    }
};
    window.openSupportListModal = function() {
    // Берём currentUser из основного скрипта через window
    const user = window._currentUser || (typeof currentUser !== 'undefined' ? currentUser : null);
    
    if (!user) {
        footerShowToast('Войдите в аккаунт для просмотра обращений');
        if (typeof openLoginModal === 'function') openLoginModal();
        return;
    }
    
    if (typeof openFeedbackListModal === 'function') {
        openFeedbackListModal('support');
    }
};
    window.submitSupportTicket = async function(e) {
    e.preventDefault();
    
    // Если пользователь авторизован - используем систему feedbacks
    if (typeof currentUser !== 'undefined' && currentUser && typeof openFeedbackModal === 'function') {
        closeSupportModal();
        openFeedbackModal('__support__', 'Поддержка AirdropLab');
        return;
    }
    
    const btn = document.getElementById('supportSubmitBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
    btn.disabled = true;
    
    const ticketData = {
        type: 'support',
        projectId: '__support__',
        projectName: 'Поддержка AirdropLab',
        category: document.getElementById('supportCategory').value,
        name: document.getElementById('supportName').value,
        email: document.getElementById('supportEmail').value,
        subject: document.getElementById('supportSubject').value,
        message: document.getElementById('supportMessage').value,
        notify: document.getElementById('supportNotify').checked,
        userId: 'guest_' + Date.now(),
        userName: document.getElementById('supportName').value || 'Гость',
        userPhoto: '',
        status: 'open',
        read: false,
        userRead: true,
        deleted: false,
        userDeleted: false,
        createdAt: new Date().toISOString(),
        messages: [{
            sender: 'user',
            text: '[' + document.getElementById('supportCategory').value + '] ' + 
                  document.getElementById('supportSubject').value + '\n\n' + 
                  document.getElementById('supportMessage').value,
            timestamp: new Date()
        }]
    };
    
    // Сохраняем в localStorage
    const supportTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    supportTickets.push(ticketData);
    localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
    
    // Если Firebase доступен - сохраняем в feedbacks
    if (typeof db !== 'undefined' && typeof addDoc !== 'undefined' && typeof collection !== 'undefined') {
        try {
            await addDoc(collection(db, "feedbacks"), ticketData);
            footerShowToast('Обращение отправлено! Мы ответим в течение 24 часов.');
        } catch(err) {
            console.error('Error submitting ticket:', err);
            footerShowToast('Обращение сохранено локально.');
        }
    } else {
        footerShowToast('Обращение отправлено!');
    }
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('supportForm').reset();
    closeSupportModal();
};

    // ============ NOTIFICATIONS MODAL ============

    window.openNotificationsModal = function() {
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        
        if (!modal || !content) return;
        
        let notificationsList = [];
        
        // Получаем уведомления
        if (typeof window.notifications !== 'undefined') {
            notificationsList = window.notifications;
        }
        
        const html = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fas fa-bell text-yellow-400"></i>
                            Уведомления
                        </h2>
                        <p class="text-slate-400 mt-2">${notificationsList.length} уведомлений</p>
                    </div>
                    ${notificationsList.length > 0 ? '<button onclick="clearAllNotifications()" class="text-xs text-slate-400 hover:text-white transition-colors">Очистить все</button>' : ''}
                </div>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${notificationsList.length > 0 ? notificationsList.map(notif => `
                    <div class="notification-item p-4 mb-3 rounded-xl ${notif.read ? 'bg-slate-800/30' : 'bg-slate-800/50 border border-slate-700'}">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-slate-700' : 'bg-cyan-500/20'}">
                                <i class="fas ${notif.type === 'success' ? 'fa-check-circle text-green-400' : notif.type === 'warning' ? 'fa-exclamation-triangle text-yellow-400' : 'fa-info-circle text-blue-400'}"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-white">${notif.message}</p>
                                <p class="text-xs text-slate-500 mt-1">${formatTimeAgo(notif.createdAt)}</p>
                            </div>
                            ${!notif.read ? '<button onclick="markNotificationRead(\'' + notif.id + '\')" class="text-xs text-cyan-400 hover:text-cyan-300">Прочитано</button>' : ''}
                        </div>
                    </div>
                `).join('') : `
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-bell-slash text-3xl text-slate-500"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">Нет уведомлений</h3>
                        <p class="text-slate-400 text-sm">Уведомления о новых аирдропах появятся здесь</p>
                    </div>
                `}
            </div>
        `;
        
        content.innerHTML = html;
        modal.classList.add('active');
    };

    window.markNotificationRead = async function(notifId) {
        if (typeof window.markNotificationAsRead === 'function') {
            await window.markNotificationAsRead(notifId);
        }
        openNotificationsModal(); // Переоткрываем
    };

    window.clearAllNotifications = function() {
        localStorage.setItem('notifications', '[]');
        window.notifications = [];
        openNotificationsModal();
    };

    function formatTimeAgo(date) {
        if (!date) return '';
        const now = new Date();
        const diff = now - new Date(date);
        if (diff < 60000) return 'только что';
        if (diff < 3600000) return Math.floor(diff/60000) + ' мин назад';
        if (diff < 86400000) return Math.floor(diff/3600000) + ' ч назад';
        return Math.floor(diff/86400000) + ' дн назад';
    }

    // ============ LEGAL MODALS ============

    window.openLegalModal = function(type) {
        const legalData = FOOTER_CONFIG.legal[type];
        if (!legalData) return;
        
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        
        if (!modal || !content) return;
        
        const icons = {
            terms: 'fa-file-contract text-purple-400',
            privacy: 'fa-shield-alt text-blue-400',
            cookie: 'fa-cookie-bite text-orange-400',
            disclaimer: 'fa-exclamation-triangle text-red-400'
        };
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                        <i class="fas ${icons[type]} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-white">${legalData.title}</h2>
                        <p class="text-sm text-slate-400">Обновлено: ${legalData.lastUpdated}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto legal-content">
                ${legalData.content}
            </div>
            <div class="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <button onclick="closePageModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">
                    Закрыть
                </button>
            </div>
        `;
        
        modal.classList.add('active');
    };

    // ============ TUTORIALS ============

    window.openTutorialsPage = function() {
        footerShowToast('Туториалы доступны в разделе проектов');
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v2')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles-v2';
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
            .back-to-top:active { transform: scale(0.95); }
            .status-dot { animation: statusPulse 2s infinite; }
            @keyframes statusPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
            
            /* Page Modal */
            .page-modal-content { max-width: 700px; width: 95%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 1rem; background: rgba(15, 23, 42, 0.98); border: 1px solid rgba(255,255,255,0.1); }
            
            /* FAQ Styles */
            .faq-question { border: none; background: none; width: 100%; cursor: pointer; }
            .faq-answer { border-top: none; }
            
            /* Guide Card */
            .guide-card:hover { transform: translateY(-2px); }
            
            /* Legal Content */
            .legal-content h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 1.5rem 0 0.75rem; }
            .legal-content h3:first-child { margin-top: 0; }
            .legal-content h4 { font-size: 1rem; font-weight: 600; color: #e2e8f0; margin: 1.25rem 0 0.5rem; }
            .legal-content p { color: #cbd5e1; line-height: 1.7; margin-bottom: 0.75rem; }
            .legal-content ul { margin: 0.5rem 0 1rem 1.5rem; }
            .legal-content li { color: #cbd5e1; margin-bottom: 0.5rem; }
            .legal-content strong { color: #fff; }
            
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
            .subscribe-btn.loading { pointer-events: none; opacity: 0.7; }
            .subscribe-btn.loading::after { content: ''; width: 16px; height: 16px; border: 2px solid transparent; border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; margin-left: 8px; }
            @keyframes spin { to { transform: rotate(360deg); } }
            .footer-link:focus, .social-link:focus { outline: 2px solid rgba(34, 211, 238, 0.5); outline-offset: 2px; }
            
            /* Modal Styles Override */
            .modal-md { max-width: 500px; }
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
        
        console.log('Footer v2.2 initialized successfully');
    }

    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.footerScrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        footerShowToast('Наверх');
    };

    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubscription();
        });
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
            
            setTimeout(() => {
                showNewsletterModal();
            }, 500);
            
            footerShowToast('Подписка оформлена!');
            
            setTimeout(() => {
                emailInput.placeholder = 'Ваш email';
                emailInput.classList.remove('success');
            }, 5000);
            
        }, 1500);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    window.footerSubscribeNewsletter = function(e) {
        e.preventDefault();
        handleNewsletterSubscription();
        return false;
    };

    function showNewsletterModal() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    }

    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
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

    function updateFooterStats() {
        let projectCount = 0;
        if (typeof window.projects !== 'undefined' && window.projects) {
            projectCount = window.projects.length;
        }

        let userCount = 0;
        if (typeof window.currentUser !== 'undefined' && window.currentUser) {
            userCount = 1;
        }

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

        // Обновляем бейдж обращений в поддержку
if (typeof window.adminFeedbacks !== 'undefined') {
    const supportFeedbacks = window.adminFeedbacks.filter(fb => 
        fb.projectId === '__support__' && !fb.userRead
    );
    const badge = document.getElementById('supportListBadge');
    if (badge) {
        if (supportFeedbacks.length > 0) {
            badge.textContent = supportFeedbacks.length;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

setTimeout(updateFooterStats, 30000);
    }

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

    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') {
            window.toggleLang();
        } else if (typeof window.setLanguage === 'function') {
            const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
            window.setLanguage(newLang);
        } else {
            const event = new CustomEvent('footerToggleLang');
            document.dispatchEvent(event);
        }
        
        setTimeout(updateFooterLanguageButton, 100);
        footerShowToast('Язык изменён');
    };

    function footerShowToast(message, type = 'success') {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }

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

    // Initialize
    DOMReady(function() {
        setTimeout(initFooter, 100);
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initFooter, 100);
    }

})();
