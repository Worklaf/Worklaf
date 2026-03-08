/**
 * ============================================
 * AirdropLab Footer Module v2.3
 * Исправлены проблемы с авторизацией и сообщениями
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
            { question: 'Как начать участвовать в аирдропах?', answer: 'Зарегистрируйтесь на AirdropLab, выберите интересующий проект из списка и следуйте инструкциям в гайде.' },
            { question: 'Что такое тестнет и зачем в нем участвовать?', answer: 'Тестнет - это тестовая сеть блокчейна. Участие позволяет получить токены бесплатно.' },
            { question: 'Как не попасть на скам-проект?', answer: 'Проводите собственное исследование. Не вводите приватные ключи и не отправляйте ETH на неизвестные адреса.' },
            { question: 'Почему проект не отображается в списке?', answer: 'Проект может быть в архиве, на модерации или удален. Проверьте фильтры.' },
            { question: 'Как получить помощь по проекту?', answer: 'Используйте раздел "Поддержка" в футере. Мы отвечаем в течение 24 часов.' },
            { question: 'Можно ли добавить свой проект?', answer: 'Да, предложите проект через форму обратной связи или в Telegram.' }
        ],
        guides: [
            { id: 'arc', title: 'Arc Testnet', description: 'Тестнет от Circle', logo: '', link: '../AirdropLab/guides/Arc/Arc_Testnet_by_Circle.html', status: 'active', difficulty: 'Легко' },
            { id: 'tempo', title: 'Tempo Testnet', description: 'L2 решение', logo: '', link: '../AirdropLab/guides/Tempo/Tempo_Testnet.html', status: 'active', difficulty: 'Средне' },
            { id: 'robinhood', title: 'Robinhood Chain', description: 'Тестнет от Robinhood', logo: '', link: '../AirdropLab/guides/Robinhood/robinhood-chain.html', status: 'new', difficulty: 'Легко' }
        ]
    };

    // Получение ссылок на Firebase из window
    function getFirebaseRefs() {
    return {
        db: window.db,
        auth: window.auth,
        currentUser: window.currentUser,
        addDoc: window.addDoc || window.firebaseAddDoc,
        collection: window.collection || window.firebaseCollection,
        doc: window.doc || window.firebaseDoc,
        setDoc: window.setDoc || window.firebaseSetDoc,
        getDoc: window.getDoc || window.firebaseGetDoc,
        getDocs: window.getDocs || window.firebaseGetDocs,
        updateDoc: window.updateDoc || window.firebaseUpdateDoc,
        query: window.query || window.firebaseQuery,
        where: window.where || window.firebaseWhere,
        serverTimestamp: window.serverTimestamp || window.firebaseServerTimestamp,
        arrayUnion: window.arrayUnion || window.firebaseArrayUnion,
        onSnapshot: window.onSnapshot || window.firebaseOnSnapshot
    };
}

    // Получение всех обращений (feedbacks + support)
    function getAllFeedbacks() {
        return window.adminFeedbacks || [];
    }

    function checkAuth() {
        const refs = getFirebaseRefs();
        return refs.currentUser;
    }

    function DOMReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    function initFooter() {
        if (document.getElementById('site-footer')) {
            console.log('Footer already exists');
            return;
        }
        createFooter();
        setTimeout(initializeFooterFunctions, 200);
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
            <div class="footer-bg-pattern absolute inset-0 opacity-25" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAiIHN0cm9rZT0icmdiYSgyMiwyMTAsMjM4LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50 -z-10"></div>
            
            <div class="footer-main max-w-[1600px] mx-auto px-4 py-16 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div class="footer-section footer-brand">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="footer-logo-wrapper relative group">
                                <div class="footer-logo-glow absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div class="footer-logo relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/30 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                                    <svg class="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M12 3v5M8 8l-2 8c-.5 2 1 4 3 4h6c2 0 3.5-2 3-4l-2-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="14" r="1" fill="#22d3ee" opacity="0.6"></circle><circle cx="14" cy="16" r="1" fill="#06b6d4" opacity="0.8"></circle></svg>
                                </div>
                            </div>
                            <div>
                                <h3 class="footer-brand-title text-xl font-black tracking-tight"><span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Airdrop</span><span class="text-white">Lab</span></h3>
                                <p class="text-xs text-slate-400 mt-1 tracking-wider uppercase">${FOOTER_CONFIG.company.version}</p>
                            </div>
                        </div>
                        <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6">${FOOTER_CONFIG.company.tagline}.</p>
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10"><i class="fab fa-twitter text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10"><i class="fab fa-telegram-plane text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10"><i class="fab fa-discord text-lg"></i></a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}" class="social-link group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10"><i class="fas fa-envelope text-lg"></i></a>
                        </div>
                        <div class="footer-status flex items-center gap-4">
                            <div class="status-item flex items-center gap-1.5"><span class="status-dot relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span></span><span class="text-xs text-emerald-400 font-medium">Live</span></div>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-link text-cyan-400"></i> <span>Быстрые ссылки</span></h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#heroSection" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-home w-4"></i><span class="text-sm">Главная</span></a>
                            <a href="#projects" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-layer-group w-4"></i><span class="text-sm">Проекты</span></a>
                            <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-book-open w-4"></i><span class="text-sm">Гайды</span></a>
                            <a href="#" onclick="openSupportModal(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-headset w-4"></i><span class="text-sm">Поддержка</span></a>
                            <a href="https://cryptorank.io" target="_blank" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-chart-line w-4"></i><span class="text-sm">CryptoRank</span></a>
                        </nav>
                    </div>
                    
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-user-cog text-emerald-400"></i> <span>Личный кабинет</span></h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#" onclick="openPageModal('account'); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-user w-4"></i><span class="text-sm">Мой аккаунт</span></a>
                            <a href="#" onclick="openMyMessagesModal(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-comments w-4"></i><span class="text-sm">Мои обращения</span><span id="footerSupportBadge" class="hidden ml-auto bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">0</span></a>
                            <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-question-circle w-4"></i><span class="text-sm">FAQ</span></a>
                            <a href="#" onclick="footerToggleLang(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-globe w-4"></i><span class="text-sm">Язык</span></a>
                            <div class="pt-3 mt-2 border-t border-slate-800/50">
                                <div class="flex items-center gap-2 text-xs text-slate-500"><i class="fas fa-project-diagram text-cyan-400"></i><span id="footerProjectCount" class="font-medium text-slate-400">0</span> проектов</div>
                            </div>
                        </nav>
                    </div>
                    
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-gavel text-purple-400"></i> <span>Юридическая информация</span></h4>
                        <div class="footer-legal-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <nav class="space-y-1">
                                    <a href="#" onclick="openLegalModal('terms'); return false;" class="footer-link text-slate-400 hover:text-purple-400 text-sm py-1 block">Условия использования</a>
                                    <a href="#" onclick="openLegalModal('privacy'); return false;" class="footer-link text-slate-400 hover:text-purple-400 text-sm py-1 block">Политика конфиденциальности</a>
                                    <a href="#" onclick="openLegalModal('cookie'); return false;" class="footer-link text-slate-400 hover:text-purple-400 text-sm py-1 block">Политика cookies</a>
                                    <a href="#" onclick="openLegalModal('disclaimer'); return false;" class="footer-link text-slate-400 hover:text-purple-400 text-sm py-1 block">Отказ от ответственности</a>
                                </nav>
                            </div>
                            <div>
                                <nav class="space-y-2 text-sm">
                                    <a href="mailto:${FOOTER_CONFIG.social.email}" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white"><i class="fas fa-envelope text-cyan-400 w-4"></i><span>support@airdroplab.com</span></a>
                                    <div class="flex items-center gap-2 text-slate-400"><i class="fas fa-clock text-blue-400 w-4"></i><span>24/7</span></div>
                                </nav>
                            </div>
                        </div>
                        
                        <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                            <div class="flex items-start gap-3 mb-3">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center"><i class="fas fa-newspaper text-cyan-400"></i></div>
                                <div>
                                    <h5 class="text-sm font-semibold text-white">Подписаться на обновления</h5>
                                    <p class="text-xs text-slate-500 mt-1">Получайте уведомления о новых аирдропах</p>
                                </div>
                            </div>
                            <form class="newsletter-form flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                                <div class="flex-1 relative"><i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i><input type="email" id="footerEmailInput" placeholder="Ваш email" required class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg px-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"></div>
                                <button type="submit" id="subscribeBtn" class="subscribe-btn px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-bold text-white">Подписаться</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom border-t border-slate-800/50 relative z-10">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div class="footer-copyright text-sm text-slate-500"><span>© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}.</span><span class="text-slate-400 ml-2">Сделано с</span><i class="fas fa-heart text-red-400 mx-1"></i></div>
                    </div>
                </div>
            </div>
            
            <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg text-white transition-all hover:scale-110 z-50"><i class="fas fa-chevron-up"></i></button>
            
            <!-- Page Modal -->
            <div id="pageModal" class="modal"><div class="modal-content page-modal-content p-0 relative"><button onclick="closePageModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button><div id="pageModalContent"></div></div></div>
            
            <!-- Support Modal -->
            <div id="supportModal" class="modal">
                <div class="modal-content modal-md p-6 relative">
                    <button onclick="closeSupportModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center"><i class="fas fa-headset text-purple-400 text-xl"></i></div>
                        <div><h2 class="text-xl font-bold text-white">Служба поддержки</h2><p class="text-sm text-slate-400">Мы ответим в течение 24 часов</p></div>
                    </div>
                    <form id="supportForm" onsubmit="submitSupportTicket(event)" class="space-y-4">
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Тема обращения *</label><select id="supportCategory" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"><option value="">Выберите категорию</option><option value="technical">🔧 Техническая проблема</option><option value="account">👤 Проблема с аккаунтом</option><option value="project">📋 Вопрос о проекте</option><option value="suggestion">💡 Предложение</option><option value="partnership">🤝 Партнёрство</option><option value="other">💬 Другое</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Заголовок *</label><input type="text" id="supportSubject" required placeholder="Краткое описание" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"></div>
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Подробное описание *</label><textarea id="supportMessage" required rows="5" placeholder="Опишите вашу проблему..." class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white resize-none"></textarea></div>
                        <button type="submit" id="supportSubmitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-lg text-sm font-bold text-white"><i class="fas fa-paper-plane mr-2"></i>Отправить обращение</button>
                    </form>
                </div>
            </div>
            
            <!-- My Messages Modal (All messages: support + feedback) -->
            <div id="myMessagesModal" class="modal">
                <div class="modal-content modal-lg p-0 relative">
                    <button onclick="closeMyMessagesModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button>
                    <div id="myMessagesContent"></div>
                </div>
            </div>

            <!-- Newsletter Modal -->
            <div id="newsletterModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30"><i class="fas fa-check text-2xl text-emerald-400"></i></div>
                        <h3 class="text-lg font-bold text-white mb-2">Подписка оформлена!</h3>
                        <button onclick="closeNewsletterModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm">Закрыть</button>
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
        if (page === 'account') initAccountPage();
    };

    window.closePageModal = function() { document.getElementById('pageModal').classList.remove('active'); };

    function getFAQContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white">Часто задаваемые вопросы</h2>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="space-y-4">${FOOTER_CONFIG.faq.map((item, index) => `<div class="border border-slate-700/50 rounded-xl overflow-hidden"><button onclick="toggleFaqItem(${index})" class="w-full text-left p-4 flex items-center justify-between bg-slate-800/30 hover:bg-slate-800/50"><span class="font-medium text-white">${item.question}</span><i class="fas fa-chevron-down text-slate-400" id="faq-icon-${index}"></i></button><div class="hidden p-4 pt-0 text-slate-300 text-sm" id="faq-answer-${index}">${item.answer}</div></div>`).join('')}</div>
            </div>`;
    }

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        if (answer.classList.contains('hidden')) { answer.classList.remove('hidden'); icon.classList.add('rotate-180'); }
        else { answer.classList.add('hidden'); icon.classList.remove('rotate-180'); }
    };

    function getGuidesContent() {
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white">Гайды</h2>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="grid gap-4">${FOOTER_CONFIG.guides.map(guide => `<div class="border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 bg-slate-800/30"><h3 class="font-bold text-white">${guide.title}</h3><p class="text-sm text-slate-400 mb-2">${guide.description}</p><a href="${guide.link}" target="_blank" class="text-cyan-400 hover:text-cyan-300 text-sm">Перейти к гайду →</a></div>`).join('')}</div>
            </div>`;
    }

    function getAccountContent() {
        const refs = getFirebaseRefs();
        const user = refs.currentUser;
        const userData = window.userProfileData || {};
        
        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white">Личный кабинет</h2>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${user ? `
                    <div class="flex items-center gap-6 mb-8 pb-6 border-b border-slate-700/50">
                        <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/50">
                            <img src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'U')}" alt="Avatar" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white">${user.displayName || 'Пользователь'}</h3>
                            <p class="text-slate-400">${user.email}</p>
                        </div>
                    </div>
                    <div class="text-center py-8">
                        <p class="text-slate-400">Управление профилем доступно на главной странице</p>
                    </div>
                ` : `
                    <div class="text-center py-8">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-lock text-4xl text-slate-500"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Вход не выполнен</h3>
                        <p class="text-slate-400 mb-6">Войдите в аккаунт для управления профилем</p>
                        <button onclick="closePageModal(); if(typeof openLoginModal==='function') openLoginModal();" class="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 rounded-lg text-sm font-bold text-white">
                            Войти
                        </button>
                    </div>
                `}
            </div>`;
    }

    function initAccountPage() {
        // Initialization for account page
    }

    // ============ SUPPORT MODAL ============

    window.openSupportModal = function() {
        const refs = getFirebaseRefs();
        const modal = document.getElementById('supportModal');
        
        // Предзаполняем данные если авторизованы
        if (refs.currentUser) {
            document.getElementById('supportSubject').value = '';
            document.getElementById('supportMessage').value = '';
        }
        
        if (modal) modal.classList.add('active');
    };

    window.closeSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) modal.classList.remove('active');
    };

    window.submitSupportTicket = async function(e) {
        e.preventDefault();
        
        const refs = getFirebaseRefs();
        
        // Проверяем авторизацию через основное приложение
        if (!refs.currentUser) {
            // Перенаправляем на вход в основное приложение
            if (typeof openLoginModal === 'function') {
                footerShowToast('Для отправки обращения необходимо войти в аккаунт');
                setTimeout(() => {
                    closeSupportModal();
                    openLoginModal();
                }, 1000);
            } else {
                footerShowToast('Войдите в аккаунт');
            }
            return;
        }
        
        const btn = document.getElementById('supportSubmitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        btn.disabled = true;
        
        const categoryText = document.getElementById('supportCategory').options[document.getElementById('supportCategory').selectedIndex].text;
        
        const ticketData = {
            type: 'support',
            supportCategory: document.getElementById('supportCategory').value,
            supportCategoryText: categoryText,
            projectId: 'support',
            projectName: 'Служба поддержки',
            subject: document.getElementById('supportSubject').value,
            message: document.getElementById('supportMessage').value,
            userId: refs.currentUser.uid,
            userName: refs.currentUser.displayName || refs.currentUser.email,
            userEmail: refs.currentUser.email,
            userPhoto: refs.currentUser.photoURL || '',
            status: 'open',
            read: false,
            userRead: true,
            deleted: false,
            userDeleted: false,
            createdAt: refs.serverTimestamp ? refs.serverTimestamp() : new Date().toISOString(),
            messages: [{
                sender: 'user',
                text: document.getElementById('supportMessage').value,
                timestamp: new Date().toISOString()
            }]
        };
        
        try {
            await refs.addDoc(refs.collection(refs.db, "feedbacks"), ticketData);
            footerShowToast('Обращение отправлено!');
        } catch(err) {
            console.error('Error:', err);
            footerShowToast('Ошибка отправки: ' + err.message);
        }
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        document.getElementById('supportForm').reset();
        closeSupportModal();
    };

    // ============ MY MESSAGES MODAL (All messages: support + feedback) ============

    window.openMyMessagesModal = function() {
        const refs = getFirebaseRefs();
        
        // Проверяем авторизацию
        if (!refs.currentUser) {
            footerShowToast('Войдите для просмотра обращений');
            if (typeof openLoginModal === 'function') {
                setTimeout(() => openLoginModal(), 500);
            }
            return;
        }
        
        const modal = document.getElementById('myMessagesModal');
        const content = document.getElementById('myMessagesContent');
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-comments text-purple-400"></i>
                    Мои обращения
                </h2>
                <p class="text-slate-400 mt-2" id="myMessagesCount">Загрузка...</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto" id="myMessagesList">
                <div class="text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-cyan-400"></i></div>
            </div>`;
        
        modal.classList.add('active');
        loadMyMessages();
    };

    window.closeMyMessagesModal = function() {
        const modal = document.getElementById('myMessagesModal');
        if (modal) modal.classList.remove('active');
    };

    async function loadMyMessages() {
        const refs = getFirebaseRefs();
        if (!refs.currentUser) return;
        
        const listContainer = document.getElementById('myMessagesList');
        const countContainer = document.getElementById('myMessagesCount');
        
        // Получаем все обращения из глобальной переменной
        const allFeedbacks = getAllFeedbacks();
        
        // Фильтруем: все сообщения текущего пользователя
        let myMessages = allFeedbacks.filter(fb => 
            fb && 
            fb.userId === refs.currentUser.uid &&
            !fb.userDeleted
        );
        
        // Сортируем по дате (новые сверху)
        myMessages.sort((a, b) => {
            const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
            const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
            return dateB - dateA;
        });
        
        countContainer.textContent = `${myMessages.length} обращений`;
        
        if (myMessages.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-inbox text-3xl text-slate-500"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2">Нет обращений</h3>
                    <p class="text-slate-400 mb-4">У вас пока нет обращений в поддержку</p>
                    <button onclick="closeMyMessagesModal(); setTimeout(() => openSupportModal(), 300);" class="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm font-medium">
                        Создать обращение
                    </button>
                </div>`;
            return;
        }
        
        // Определяем тип проекта для отображения
        const getProjectInfo = (item) => {
            if (item.type === 'support') {
                return {
                    icon: '<i class="fas fa-headset text-purple-400"></i>',
                    badge: '<span class="px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded">Support</span>',
                    name: item.supportSubject || 'Служба поддержки',
                    logo: ''
                };
            } else {
                // Это feedback о проекте
                const project = window.projects ? window.projects.find(p => p.id === item.projectId) : null;
                return {
                    icon: '<i class="fas fa-comment-dots text-blue-400"></i>',
                    badge: '<span class="px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded">Feedback</span>',
                    name: project?.name || item.projectName || 'Проект',
                    logo: project?.image || ''
                };
            }
        };
        
        listContainer.innerHTML = myMessages.map(item => {
            const date = item.createdAt ? (item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt)) : new Date();
            const dateStr = date.toLocaleDateString('ru-RU');
            
            const messages = item.messages || [];
            const lastMessage = messages[messages.length - 1];
            const hasNewReply = !item.userRead && messages.length > 1;
            const isLastFromAdmin = lastMessage && lastMessage.sender === 'admin';
            
            const projInfo = getProjectInfo(item);
            
            return `
                <div class="border border-slate-700/50 rounded-xl p-4 mb-4 ${hasNewReply ? 'bg-purple-500/10 border-purple-500/30' : 'bg-slate-800/30'}">
                    <div class="flex items-start justify-between mb-2">
                        <div class="flex items-center gap-2">
                            ${projInfo.icon}
                            ${projInfo.badge}
                            ${projInfo.logo ? `<img src="${projInfo.logo}" class="w-5 h-5 rounded" alt="" onerror="this.style.display='none'">` : ''}
                            <span class="font-bold text-white">${projInfo.name}</span>
                        </div>
                        <span class="text-xs text-slate-500">${dateStr}</span>
                    </div>
                    <div class="text-sm text-slate-400 mb-3">
                        ${lastMessage ? (lastMessage.text ? lastMessage.text.substring(0, 100) + (lastMessage.text.length > 100 ? '...' : '') : '') : 'Нет сообщений'}
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs ${isLastFromAdmin && hasNewReply ? 'text-purple-400 font-medium' : 'text-slate-500'}">
                            ${isLastFromAdmin ? (hasNewReply ? 'Новый ответ' : 'Есть ответ') : 'Ожидает ответа'}
                        </span>
                        <button onclick="openMessageChatFromFooter('${item.id}', '${item.type}', '${item.projectId || 'support'}')" class="text-cyan-400 text-sm hover:text-cyan-300">
                            ${hasNewReply ? 'Есть ответ' : 'Открыть чат'} →
                        </button>
                    </div>
                </div>`;
        }).join('');
    }

    // Открыть чат из списка обращений в footer
    window.openMessageChatFromFooter = function(itemId, itemType, projectId) {
        const refs = getFirebaseRefs();
        
        // Используем функцию из основного приложения
        if (itemType === 'support') {
            // Это обращение в поддержку
            closeMyMessagesModal();
            if (typeof openSupportChatFromList === 'function') {
                openSupportChatFromList(itemId);
            }
        } else {
            // Это отзыв о проекте
            const project = window.projects ? window.projects.find(p => p.id === projectId) : null;
            const projectName = project?.name || projectId || 'Проект';
            
            closeMyMessagesModal();
            if (typeof openFeedbackFromList === 'function') {
                openFeedbackFromList(itemId, projectId, projectName);
            }
        }
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v33')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles-v33';
        styles.textContent = `
            .site-footer { font-family: 'Inter', sans-serif; color: #e2e8f0; }
            .footer-link { display: flex; align-items: center; gap: 8px; padding: 4px 0; transition: all 0.2s; }
            .footer-link:hover { transform: translateX(6px); }
            .back-to-top { opacity: 0; visibility: hidden; transition: all 0.3s; }
            .back-to-top.visible { opacity: 1; visibility: visible; }
            .page-modal-content { max-width: 700px; width: 95%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 1rem; background: rgba(15, 23, 42, 0.98); border: 1px solid rgba(255,255,255,0.1); }
            .footer-email-input { box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
            .footer-email-input:focus { box-shadow: 0 0 0 3px rgba(34,211,238,0.15); }
            .subscribe-btn.loading { pointer-events: none; opacity: 0.7; }
            @keyframes spin { to { transform: rotate(360deg); } }
            @media (max-width: 768px) {
                .site-footer .grid { grid-template-columns: 1fr; }
                .page-modal-content { width: 98%; }
            }
        `;
        document.head.appendChild(styles);
    }

    // ============ FUNCTIONS ============

    function initializeFooterFunctions() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        initBackToTop();
        initNewsletterForm();
        updateFooterStats();
        updateFooterSupportBadge();
        
        console.log('Footer v2.3 initialized');
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

    window.footerScrollToTop = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };

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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.classList.add('error');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
            return;
        }

        subscribeBtn.classList.add('loading');
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(function() {
            subscribeBtn.classList.remove('loading');
            subscribeBtn.innerHTML = 'Подписаться';
            emailInput.value = '';
            showNewsletterModal();
            footerShowToast('Подписка оформлена!');
        }, 1500);
    }

    window.footerSubscribeNewsletter = function(e) { e.preventDefault(); handleNewsletterSubscription(); return false; };

    function showNewsletterModal() {
        const modal = document.getElementById('newsletterModal');
        if (modal) modal.classList.add('active');
    }
    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) modal.classList.remove('active');
    };

    function updateFooterStats() {
        const projectCount = window.projects ? window.projects.length : 0;
        const projectEl = document.getElementById('footerProjectCount');
        if (projectEl) projectEl.textContent = projectCount;
        setTimeout(updateFooterStats, 30000);
    }

    function updateFooterSupportBadge() {
        const badge = document.getElementById('footerSupportBadge');
        if (!badge) return;
        
        const allFeedbacks = getAllFeedbacks();
        const refs = getFirebaseRefs();
        
        if (!refs.currentUser) {
            badge.classList.add('hidden');
            return;
        }
        
        // Считаем все непрочитанные сообщения пользователя
        const myMessages = allFeedbacks.filter(fb => 
            fb && 
            fb.userId === refs.currentUser.uid &&
            !fb.userRead
        );
        
        const count = myMessages.length;
        
        if (count > 0) {
            badge.textContent = count > 9 ? '9+' : count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') window.toggleLang();
        else if (typeof window.setLanguage === 'function') {
            const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
            window.setLanguage(newLang);
        }
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
            toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1e293b;border:1px solid rgba(255,255,255,0.1);color:white;padding:14px 20px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.4);transform:translateY(100px);opacity:0;transition:all 0.3s;z-index:9999;display:flex;align-items:center;gap:10px;font-size:14px;';
            document.body.appendChild(toast);
        }
        
        const icons = { success: '<i class="fas fa-check-circle" style="color: #10b981;"></i>', error: '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>', info: '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>' };
        toast.innerHTML = (icons[type] || icons.success) + ' ' + message;
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(function() { toast.classList.add('translate-y-20', 'opacity-0'); }, 3000);
    }

    // Initialize
    DOMReady(function() { setTimeout(initFooter, 100); });
    if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(initFooter, 100); }

    // Периодически обновляем badge
    setInterval(() => {
        updateFooterSupportBadge();
    }, 5000);

})();
