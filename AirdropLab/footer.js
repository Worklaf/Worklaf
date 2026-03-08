/**
 * ============================================
 * AirdropLab Footer Module v2.3.2
 * Исправлены проблемы с Firebase и доступом к данным
 * ============================================
 */

(function() {
    'use strict';

    const FOOTER_CONFIG = {
        company: {
            name: 'AirdropLab',
            version: 'v2.3.2',
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

    // Получение ссылок на Firebase
    function getFirebaseRefs() {
        return {
            db: window.db,
            auth: window.auth,
            currentUser: window.currentUser,
            addDoc: window.addDoc,
            collection: window.collection,
            doc: window.doc,
            setDoc: window.setDoc,
            getDoc: window.getDoc,
            getDocs: window.getDocs,
            updateDoc: window.updateDoc,
            query: window.query,
            where: window.where,
            serverTimestamp: window.serverTimestamp,
            arrayUnion: window.arrayUnion,
            onSnapshot: window.onSnapshot
        };
    }

    // Получение всех обращений (feedbacks и support)
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
                            <a href="#" onclick="openSupportMessagesModal(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-comments w-4"></i><span class="text-sm">Мои обращения</span><span id="footerSupportBadge" class="hidden ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">0</span></a>
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
            
            <!-- My Support Messages Modal -->
            <div id="supportMessagesModal" class="modal">
                <div class="modal-content modal-lg p-0 relative">
                    <button onclick="closeSupportMessagesModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button>
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
                    </div>
                    <form onsubmit="submitDeleteAccountRequest(event)" class="space-y-4">
                        <div><label class="block text-sm font-medium text-slate-300 mb-2">Причина *</label><select id="deleteReason" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white"><option value="">Выберите причину</option><option value="no_interest">Больше не интересуют аирдропы</option><option value="privacy">Переживаю за приватность</option><option value="other">Другая причина</option></select></div>
                        <div class="flex gap-3"><button type="button" onclick="closeDeleteAccountModal()" class="flex-1 bg-slate-700 py-2.5 rounded-lg text-sm">Отмена</button><button type="submit" class="flex-1 bg-red-600 py-2.5 rounded-lg text-sm font-bold text-white">Отправить</button></div>
                    </form>
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

    window.closePageModal = function() {
        const modal = document.getElementById('pageModal');
        if (modal) modal.classList.remove('active');
    };

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
                        <div class="relative group">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500/50">
                                <img id="accountAvatar" src="${userData.avatar || user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'U')}" class="w-full h-full object-cover">
                            </div>
                            <button onclick="changeAvatar()" class="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white hover:bg-cyan-400 transition-colors shadow-lg">
                                <i class="fas fa-camera text-xs"></i>
                            </button>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white">${user.displayName || 'Пользователь'}</h3>
                            <p class="text-slate-400">${user.email}</p>
                        </div>
                    </div>
                    
                    <form id="accountForm" onsubmit="saveAccountProfile(event)" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Имя</label>
                                <input type="text" id="profileFirstName" value="${userData.firstName || ''}" placeholder="Иван" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Фамилия</label>
                                <input type="text" id="profileLastName" value="${userData.lastName || ''}" placeholder="Иванов" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Telegram</label>
                            <input type="text" id="profileTelegram" value="${userData.telegram || ''}" placeholder="@username" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                        </div>
                        <div class="flex gap-3 pt-4">
                            <button type="button" onclick="closePageModal()" class="flex-1 bg-slate-700 py-3 rounded-lg text-sm text-white">Отмена</button>
                            <button type="submit" class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-lg text-sm font-bold text-white">Сохранить</button>
                        </div>
                    </form>

                    <div class="mt-8 pt-6 border-t border-slate-700/50">
                        <button onclick="openDeleteAccountModal()" class="w-full bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-left text-red-400">
                            Удалить аккаунт
                        </button>
                    </div>
                ` : `
                    <div class="text-center py-8">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-lock text-4xl text-slate-500"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Вход не выполнен</h3>
                        <p class="text-slate-400 mb-6">Войдите для управления профилем</p>
                        <button onclick="closePageModal(); if(typeof openLoginModal==='function') openLoginModal();" class="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 rounded-lg text-sm font-bold text-white">
                            Войти
                        </button>
                    </div>
                `}
            </div>`;
    }

    function initAccountPage() {
        const refs = getFirebaseRefs();
        if (refs.currentUser) {
            loadUserProfileData(refs.currentUser);
            updateFooterSupportBadge();
        }
    }

    // ============ SUPPORT BADGE ============

    // Эта функция вызывается из основного скрипта
    window.updateFeedbackBadgeFromWindow = function() {
        updateFooterSupportBadge();
    };

    function updateFooterSupportBadge() {
        const refs = getFirebaseRefs();
        if (!refs.currentUser) return;
        
        const badge = document.getElementById('footerSupportBadge');
        if (!badge) return;
        
        // Получаем все обращения из глобальной переменной
        const allFeedbacks = getAllFeedbacks();
        
        // Фильтруем: только type === 'support' и для текущего пользователя
        const supportTickets = allFeedbacks.filter(fb => 
            fb && 
            fb.type === 'support' && 
            fb.userId === refs.currentUser.uid && 
            !fb.userRead
        );
        
        const count = supportTickets.length;
        
        if (count > 0) {
            badge.textContent = count > 9 ? '9+' : count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // ============ SUPPORT MODAL ============

    window.openSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) modal.classList.add('active');
    };

    window.closeSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) modal.classList.remove('active');
    };

    window.submitSupportTicket = async function(e) {
        e.preventDefault();
        
        const refs = getFirebaseRefs();
        if (!refs.currentUser) {
            footerShowToast('Войдите для отправки обращения');
            if (typeof openLoginModal === 'function') openLoginModal();
            return;
        }
        
        const btn = document.getElementById('supportSubmitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
        btn.disabled = true;
        
        const categoryText = document.getElementById('supportCategory').options[document.getElementById('supportCategory').selectedIndex].text;
        const subject = document.getElementById('supportSubject').value;
        const message = document.getElementById('supportMessage').value;
        
        // Создаем в коллекции feedbacks с type: 'support'
        const ticketData = {
            type: 'support',
            supportCategory: document.getElementById('supportCategory').value,
            supportCategoryText: categoryText,
            supportSubject: subject,
            projectId: 'support',
            projectName: 'Служба поддержки',
            subject: subject,
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
                text: message,
                timestamp: new Date().toISOString()
            }]
        };
        
        try {
            await refs.addDoc(refs.collection(refs.db, "feedbacks"), ticketData);
            footerShowToast('Обращение отправлено!');
            
            // Обновляем badge
            setTimeout(() => {
                if (window.updateFeedbackBadgeFromWindow) {
                    window.updateFeedbackBadgeFromWindow();
                }
            }, 500);
            
        } catch(err) {
            console.error('Error:', err);
            footerShowToast('Ошибка отправки: ' + err.message);
        }
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        document.getElementById('supportForm').reset();
        closeSupportModal();
    };

    // ============ MY SUPPORT MESSAGES ============

    window.openSupportMessagesModal = function() {
        const refs = getFirebaseRefs();
        if (!refs.currentUser) {
            footerShowToast('Войдите для просмотра обращений');
            if (typeof openLoginModal === 'function') openLoginModal();
            return;
        }
        
        const modal = document.getElementById('supportMessagesModal');
        const content = document.getElementById('supportMessagesContent');
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white">Мои обращения</h2>
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
        const refs = getFirebaseRefs();
        if (!refs.currentUser) return;
        
        const listContainer = document.getElementById('supportMessagesList');
        const countContainer = document.getElementById('supportMessagesCount');
        
        // Получаем все обращения из глобальной переменной
        const allFeedbacks = getAllFeedbacks();
        
        // Фильтруем: только type === 'support' для текущего пользователя
        let supportTickets = allFeedbacks.filter(fb => 
            fb && 
            fb.type === 'support' && 
            fb.userId === refs.currentUser.uid &&
            !fb.userDeleted
        );
        
        // Сортируем по дате (новые сверху)
        supportTickets.sort((a, b) => {
            const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt)) : new Date(0);
            const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt)) : new Date(0);
            return dateB - dateA;
        });
        
        countContainer.textContent = `${supportTickets.length} обращений`;
        
        if (supportTickets.length === 0) {
            listContainer.innerHTML = '<div class="text-center py-12"><p class="text-slate-400">Нет обращений в поддержку</p></div>';
            return;
        }
        
        listContainer.innerHTML = supportTickets.map(ticket => {
            const date = ticket.createdAt ? (ticket.createdAt.toDate ? ticket.createdAt.toDate() : new Date(ticket.createdAt)) : new Date();
            const dateStr = date.toLocaleDateString('ru-RU');
            
            const messages = ticket.messages || [];
            const hasNewReply = !ticket.userRead && messages.length > 1;
            const lastMessage = messages[messages.length - 1];
            const isLastFromAdmin = lastMessage && lastMessage.sender === 'admin';
            
            return `
                <div class="border border-slate-700/50 rounded-xl p-4 mb-4 ${hasNewReply ? 'bg-purple-500/10 border-purple-500/30' : 'bg-slate-800/30'}">
                    <div class="flex items-start justify-between mb-2">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded">Support</span>
                                <h4 class="font-bold text-white">${ticket.subject || 'Обращение в поддержку'}</h4>
                            </div>
                            <p class="text-xs text-slate-500 mt-1">${dateStr}</p>
                        </div>
                        <span class="px-2 py-1 rounded text-xs ${ticket.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}">${ticket.status === 'open' ? 'Открыт' : 'Закрыт'}</span>
                    </div>
                    <div class="text-sm text-slate-400 mb-3">
                        ${lastMessage ? (lastMessage.text ? lastMessage.text.substring(0, 100) + (lastMessage.text.length > 100 ? '...' : '') : '') : 'Нет сообщений'}
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs ${isLastFromAdmin && hasNewReply ? 'text-purple-400 font-medium' : 'text-slate-500'}">
                            ${isLastFromAdmin ? (hasNewReply ? 'Новый ответ' : 'Есть ответ') : 'Ожидает ответа'}
                        </span>
                        <button onclick="openSupportChatFromList('${ticket.id}')" class="text-cyan-400 text-sm hover:text-cyan-300">
                            ${hasNewReply ? 'Есть ответ' : 'Открыть чат'} →
                        </button>
                    </div>
                </div>`;
        }).join('');
    }

    // Открытие чата из списка обращений
    window.openSupportChatFromList = function(ticketId) {
        const refs = getFirebaseRefs();
        const chatModal = document.getElementById('feedbackModal');
        const listModal = document.getElementById('supportMessagesModal');
        
        if (listModal) listModal.classList.remove('active');
        
        if (!chatModal) {
            footerShowToast('Чат недоступен');
            return;
        }
        
        document.getElementById('feedbackProjectId').value = 'support';
        document.getElementById('feedbackDocId').value = ticketId;
        document.getElementById('feedbackProjectName').innerHTML = '<i class="fas fa-headset text-purple-400 mr-2"></i>Служба поддержки';
        document.getElementById('feedbackModalTitle').innerHTML = '<i class="fas fa-headset text-purple-400 mr-2"></i>Чат с поддержкой';
        
        document.getElementById('feedbackFormNew').classList.add('hidden');
        document.getElementById('feedbackFormReply').classList.remove('hidden');
        document.getElementById('feedbackSendBtn').classList.add('hidden');
        
        // Загружаем чат
        if (refs.onSnapshot && refs.db) {
            const unsub = refs.onSnapshot(refs.doc(refs.db, "feedbacks", ticketId), (snap) => {
                if (!snap.exists()) {
                    document.getElementById('feedbackChatHistory').innerHTML = '<p class="text-center text-red-400 py-8">Обращение не найдено</p>';
                    return;
                }
                
                const d = snap.data();
                const messages = (d.messages || []).sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
                
                const html = messages.map(msg => {
                    const bubbleSide = msg.sender === 'user' ? 'user' : 'admin';
                    const senderName = msg.sender === 'user' ? 'Вы' : 'Поддержка';
                    const avatar = msg.sender === 'user' 
                        ? `<img src="${refs.currentUser?.photoURL || 'https://ui-avatars.com/api/?name=U'}" class="chat-avatar">` 
                        : `<div class="chat-avatar"><i class="fas fa-user-shield"></i></div>`;
                    const time = msg.timestamp ? formatTimeAgo(new Date(msg.timestamp)) : '';
                    return `<div class="chat-bubble ${bubbleSide}">${avatar}<div class="chat-bubble-wrapper"><span class="chat-sender">${senderName}</span><div class="chat-content">${msg.text}</div><span class="chat-time">${time}</span></div></div>`;
                }).join('');
                
                const hist = document.getElementById('feedbackChatHistory');
                hist.innerHTML = html || '<p class="text-center text-slate-500 py-4">Нет сообщений</p>';
                hist.scrollTop = hist.scrollHeight;
                
                // Отмечаем как прочитанное
                if (!d.userRead) {
                    refs.updateDoc(refs.doc(refs.db, "feedbacks", ticketId), { userRead: true });
                }
            });
            
            window.currentFeedbackUnsub = unsub;
        }
        
        chatModal.classList.add('active');
    };

    function formatTimeAgo(date) {
        if (!date) return '';
        const now = new Date();
        const diff = now - date;
        if (diff < 60000) return 'только что';
        if (diff < 3600000) return Math.floor(diff/60000) + ' мин';
        if (diff < 86400000) return Math.floor(diff/3600000) + ' ч';
        if (diff < 604800000) return Math.floor(diff/86400000) + ' дн';
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }

    // ============ ACCOUNT ACTIONS ============

    window.openDeleteAccountModal = function() {
        document.getElementById('deleteAccountModal').classList.add('active');
    };

    window.closeDeleteAccountModal = function() {
        document.getElementById('deleteAccountModal').classList.remove('active');
    };

    window.submitDeleteAccountRequest = async function(e) {
        e.preventDefault();
        const refs = getFirebaseRefs();
        
        if (!refs.currentUser) {
            footerShowToast('Войдите для удаления аккаунта');
            return;
        }
        
        const reason = document.getElementById('deleteReason').value;
        if (!reason) {
            footerShowToast('Выберите причину');
            return;
        }
        
        const btn = document.querySelector('#deleteAccountModal button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        }
        
        try {
            const requestData = {
                type: 'account_deletion',
                userId: refs.currentUser.uid,
                userEmail: refs.currentUser.email,
                reason: reason,
                status: 'pending',
                createdAt: refs.serverTimestamp ? refs.serverTimestamp() : new Date().toISOString()
            };
            
            if (refs.db && refs.addDoc && refs.collection) {
                await refs.addDoc(refs.collection(refs.db, "feedbacks"), requestData);
                footerShowToast('Запрос отправлен');
            } else {
                footerShowToast('Firebase недоступен');
            }
            
            closeDeleteAccountModal();
            document.getElementById('deleteReason').value = '';
            
        } catch(err) {
            console.error('Error:', err);
            footerShowToast('Ошибка: ' + err.message);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Отправить';
            }
        }
    };

    // ============ PROFILE SAVE ============

    window.saveAccountProfile = async function(e) {
        e.preventDefault();
        
        const refs = getFirebaseRefs();
        const profileData = {
            firstName: document.getElementById('profileFirstName').value,
            lastName: document.getElementById('profileLastName').value,
            telegram: document.getElementById('profileTelegram').value,
            updatedAt: new Date().toISOString()
        };
        
        // Сохраняем локально
        window.userProfileData = { ...window.userProfileData, ...profileData };
        localStorage.setItem('userProfileData', JSON.stringify(window.userProfileData));
        
        if (refs.currentUser && refs.db && refs.setDoc && refs.doc) {
            try {
                const userRef = refs.doc(refs.db, "users", refs.currentUser.uid);
                await refs.setDoc(userRef, { profile: profileData }, { merge: true });
                
                const userNameEl = document.getElementById('userName');
                if (userNameEl && profileData.firstName) {
                    userNameEl.textContent = profileData.firstName + (profileData.lastName ? ' ' + profileData.lastName : '');
                }
                
                footerShowToast('Профиль сохранён!');
            } catch(err) {
                console.error('Error:', err);
                footerShowToast('Профиль сохранён локально');
            }
        } else {
            footerShowToast('Профиль сохранён локально');
        }
    };

    window.changeAvatar = async function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (file.size > 2 * 1024 * 1024) {
                footerShowToast('Слишком большой файл (макс 2MB)');
                return;
            }
            
            const refs = getFirebaseRefs();
            if (!refs.currentUser) {
                footerShowToast('Войдите для смены аватара');
                return;
            }
            
            try {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    const base64 = event.target.result;
                    
                    window.userProfileData = window.userProfileData || {};
                    window.userProfileData.avatar = base64;
                    localStorage.setItem('userProfileData', JSON.stringify(window.userProfileData));
                    
                    const accountAvatar = document.getElementById('accountAvatar');
                    const userAvatar = document.getElementById('userAvatar');
                    if (accountAvatar) accountAvatar.src = base64;
                    if (userAvatar) userAvatar.src = base64;
                    
                    if (refs.db && refs.setDoc && refs.doc) {
                        const userRef = refs.doc(refs.db, "users", refs.currentUser.uid);
                        await refs.setDoc(userRef, { 
                            profile: window.userProfileData,
                            photoURL: base64 
                        }, { merge: true });
                    }
                    
                    footerShowToast('Аватар обновлён!');
                };
                reader.readAsDataURL(file);
            } catch(err) {
                console.error('Error:', err);
                footerShowToast('Ошибка загрузки');
            }
        };
        
        input.click();
    };

    async function loadUserProfileData(user) {
        if (!user || !user.uid) return;
        
        const refs = getFirebaseRefs();
        try {
            if (refs.db && refs.getDoc && refs.doc) {
                const userDoc = await refs.getDoc(refs.doc(refs.db, "users", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.profile) {
                        window.userProfileData = data.profile;
                        localStorage.setItem('userProfileData', JSON.stringify(data.profile));
                    }
                }
            }
        } catch(err) {
            console.log('Profile load error:', err);
        }
    }

    // ============ LEGAL MODALS ============

    window.openLegalModal = function(type) {
        const legalData = FOOTER_CONFIG.legal ? FOOTER_CONFIG.legal[type] : null;
        if (!legalData) {
            footerShowToast('Раздел в разработке');
            return;
        }
        
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white">${legalData.title}</h2>
                <p class="text-sm text-slate-400">Обновлено: ${legalData.lastUpdated}</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">${legalData.content || 'Контент скоро появится'}</div>
            <div class="p-4 border-t border-slate-700/50"><button onclick="closePageModal()" class="w-full bg-slate-700 py-3 rounded-lg text-sm text-white">Закрыть</button></div>`;
        
        modal.classList.add('active');
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v332')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles-v332';
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
        
        // Периодически обновляем badge
        setInterval(() => {
            const refs = getFirebaseRefs();
            if (refs.currentUser) {
                updateFooterSupportBadge();
            }
        }, 5000);
        
        console.log('Footer v2.3.2 initialized');
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

        setTimeout(() => {
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
        
        const icons = { success: '✓', error: '✕', info: 'ℹ' };
        toast.innerHTML = (icons[type] || icons.success) + ' ' + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.transform = 'translateY(100px)'; toast.style.opacity = '0'; }, 3000);
    }

    // Initialize
    DOMReady(function() { setTimeout(initFooter, 100); });
    if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(initFooter, 100); }

})();
