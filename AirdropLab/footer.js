/**
 * ============================================
 * AirdropLab Footer Module v2.2
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
            twitter: 'https://x.com/AirdropLabApp',
            telegram: '',
            discord: '',
            youtube: '',
            email: 'airdroplab.support@gmail.com'
        },
        legal: {
        terms: { title: 'Terms of Use', url: './legal/terms.html', lastUpdated: 'March 15, 2026' },
        privacy: { title: 'Privacy Policy', url: './legal/privacy.html', lastUpdated: 'March 15, 2026' },
        cookie: { title: 'Cookie Policy', url: './legal/cookies.html', lastUpdated: 'March 15, 2026' },
        disclaimer: { title: 'Disclaimer', url: './legal/disclaimer.html', lastUpdated: 'March 15, 2026' }
    },
        guides: [
            {
                id: 'arc',
                title: 'Arc Testnet',
                descKey: 'guide_arc_desc',
                logo: 'https://givemebit.com/wp-content/uploads/2025/11/arc-testnet-logo-1024x235.jpg',
                link: '../AirdropLab/guides/Arc/Arc_Testnet_by_Circle.html',
                status: 'active',
                difficultyKey: 'guide_difficulty_easy'
            },
            {
                id: 'tempo',
                title: 'Tempo Testnet',
                descKey: 'guide_tempo_desc',
                logo: 'https://givemebit.com/wp-content/uploads/2025/12/tempo-testnet-logo-1024x235.jpg',
                link: '../AirdropLab/guides/Tempo/Tempo_Testnet.html',
                status: 'active',
                difficultyKey: 'guide_difficulty_medium'
            },
            {
                id: 'robinhood',
                title: 'Robinhood Chain',
                descKey: 'guide_robinhood_desc',
                logo: 'https://cryptocurrencyjobs.co/startups/assets/logos/robinhood.e4ca7c6b17d08763d0714e8a061cf5ba65950fe4d236e3c2db812421997fb743_hu_e366a75e4d388edb.jpg',
                link: '../AirdropLab/guides/Robinhood/robinhood-chain.html',
                status: 'new',
                difficultyKey: 'guide_difficulty_easy'
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
        const lang = typeof window.t === 'function' ? window.t : (k) => k;

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

                    <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6" data-footer-translate="footer_tagline_desc">
                        ${lang('footer_tagline_desc')}
                    </p>

                    <div class="footer-social flex gap-3 mb-6">
                        <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-cyan-400 transition-all rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30" title="Twitter"><i class="fab fa-twitter text-lg"></i></a>
                        <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30" title="Telegram"><i class="fab fa-telegram-plane text-lg"></i></a>
                        <a href="${FOOTER_CONFIG.social.discord}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-indigo-400 transition-all rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/30" title="Discord"><i class="fab fa-discord text-lg"></i></a>
                        <a href="${FOOTER_CONFIG.social.youtube}" target="_blank" rel="noopener noreferrer" class="social-link group p-2.5 text-slate-400 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/30" title="YouTube"><i class="fab fa-youtube text-lg"></i></a>
                        <a href="mailto:${FOOTER_CONFIG.social.email}" class="social-link group p-2.5 text-slate-400 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30" title="Email"><i class="fas fa-envelope text-lg"></i></a>
                    </div>

                    <div class="footer-status flex items-center gap-4">
                        <div class="status-item flex items-center gap-1.5">
                            <span class="status-dot relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                            </span>
                            <span class="text-xs text-emerald-400 font-medium" data-footer-translate="footer_live">${lang('footer_live')}</span>
                        </div>
                        <div class="status-item flex items-center gap-1.5">
                            <span class="status-dot relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-lg shadow-cyan-400/50"></span>
                            </span>
                            <span class="text-xs text-cyan-400 font-medium" data-footer-translate="footer_updated">${lang('footer_updated')}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="footer-section">
                    <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <i class="fas fa-link text-cyan-400"></i>
                        <span data-footer-translate="footer_quick_links">${lang('footer_quick_links')}</span>
                    </h4>
                    <nav class="footer-nav space-y-2">
                        <a href="#heroSection" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-home text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_home">${lang('footer_home')}</span>
                        </a>
                        <a href="#projects" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-layer-group text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_projects">${lang('footer_projects')}</span>
                        </a>
                        <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-book-open text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_guides">${lang('footer_guides')}</span>
                        </a>
                        <a href="#" onclick="openSupportModal(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-headset text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_support">${lang('footer_support')}</span>
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
                        <span data-footer-translate="footer_account_title">${lang('footer_account_title')}</span>
                    </h4>
                    <nav class="footer-nav space-y-2">
                        <a href="#" onclick="openPageModal('account'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-user text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_my_account">${lang('footer_my_account')}</span>
                        </a>
                        <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-question-circle text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_faq">${lang('footer_faq')}</span>
                        </a>
                        <a href="#" onclick="footerToggleLang(); return false;" class="footer-link group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <i class="fas fa-globe text-xs w-4"></i>
                            <span class="text-sm" data-footer-translate="footer_language">${lang('footer_language')}</span>
                        </a>
                        <div class="pt-3 mt-2 border-t border-slate-800/50">
                            <div class="flex items-center gap-2 text-xs text-slate-500">
                                <i class="fas fa-users text-emerald-400"></i>
                                <span id="footerUserCount" class="font-medium text-slate-400">0</span>
                                <span data-footer-translate="footer_active_users">${lang('footer_active_users')}</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <i class="fas fa-project-diagram text-cyan-400"></i>
                                <span id="footerProjectCount" class="font-medium text-slate-400">0</span>
                                <span data-footer-translate="footer_projects_count">${lang('footer_projects_count')}</span>
                            </div>
                        </div>
                    </nav>
                </div>

                <!-- Legal -->
                <div class="lg:col-span-2 md:col-span-2">
                    <h4 class="footer-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <i class="fas fa-gavel text-purple-400"></i>
                        <span data-footer-translate="footer_legal_title">${lang('footer_legal_title')}</span>
                    </h4>

                    <div class="footer-legal-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider" data-footer-translate="footer_documents">${lang('footer_documents')}</h5>
                            <nav class="space-y-1">
                                <a href="#" onclick="openLegalModal('terms'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                    <i class="fas fa-file-contract w-4"></i> <span data-footer-translate="footer_terms">${lang('footer_terms')}</span>
                                </a>
                                <a href="#" onclick="openLegalModal('privacy'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                    <i class="fas fa-shield-alt w-4"></i> <span data-footer-translate="footer_privacy">${lang('footer_privacy')}</span>
                                </a>
                                <a href="#" onclick="openLegalModal('cookie'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                    <i class="fas fa-cookie-bite w-4"></i> <span data-footer-translate="footer_cookies">${lang('footer_cookies')}</span>
                                </a>
                                <a href="#" onclick="openLegalModal('disclaimer'); return false;" class="footer-link text-slate-400 hover:text-purple-400 transition-colors block text-sm py-1">
                                    <i class="fas fa-exclamation-triangle w-4"></i> <span data-footer-translate="footer_disclaimer">${lang('footer_disclaimer')}</span>
                                </a>
                            </nav>
                        </div>
                        <div>
                            <h5 class="legal-heading text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider" data-footer-translate="footer_contacts">${lang('footer_contacts')}</h5>
                            <nav class="space-y-2 text-sm">
                                <a href="mailto:${FOOTER_CONFIG.social.email}" class="footer-link flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                    <i class="fas fa-envelope text-cyan-400 w-4"></i>
                                    <span>${FOOTER_CONFIG.social.email}</span>
                                </a>
                                <div class="flex items-center gap-2 text-slate-400">
                                    <i class="fas fa-map-marker-alt text-orange-400 w-4"></i>
                                    <span data-footer-translate="footer_worldwide">${lang('footer_worldwide')}</span>
                                </div>
                                <div class="flex items-center gap-2 text-slate-400">
                                    <i class="fas fa-clock text-blue-400 w-4"></i>
                                    <span>24/7</span>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <!-- Newsletter -->
                    <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                        <div class="flex items-start gap-3 mb-3">
                            <div class="newsletter-icon w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-newspaper text-cyan-400"></i>
                            </div>
                            <div>
                                <h5 class="text-sm font-semibold text-white flex items-center gap-2">
                                    <i class="fas fa-paper-plane text-yellow-400"></i>
                                    <span data-footer-translate="footer_newsletter_title">${lang('footer_newsletter_title')}</span>
                                </h5>
                                <p class="text-xs text-slate-500 mt-1" data-footer-translate="footer_newsletter_desc">${lang('footer_newsletter_desc')}</p>
                            </div>
                        </div>

                        <form class="newsletter-form flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                            <div class="flex-1 relative">
                                <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                <input type="email"
                                       id="footerEmailInput"
                                       placeholder="${lang('footer_email_placeholder')}"
                                       data-footer-placeholder="footer_email_placeholder"
                                       required
                                       class="footer-email-input w-full bg-slate-800/70 border border-slate-600 rounded-lg px-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all">
                            </div>
                            <button type="submit"
                                    id="subscribeBtn"
                                    class="subscribe-btn px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-2">
                                <span data-footer-translate="footer_subscribe_btn">${lang('footer_subscribe_btn')}</span>
                                <i class="fas fa-paper-plane text-xs"></i>
                            </button>
                        </form>

                        <div class="footer-privacy-note flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                            <i class="fas fa-shield-alt text-emerald-400 text-xs"></i>
                            <span class="text-xs text-slate-500" data-footer-translate="footer_privacy_note">${lang('footer_privacy_note')}</span>
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
                        <span>© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. <span data-footer-translate="footer_rights">${lang('footer_rights')}</span></span>
                        <span class="hidden md:inline mx-2">•</span>
                        <span data-footer-translate="footer_made_with">${lang('footer_made_with')}</span>
                        <i class="fas fa-heart text-red-400 mx-1"></i>
                        <span class="text-slate-400" data-footer-translate="footer_love">${lang('footer_love')}</span>
                    </div>
                    <div class="footer-tech flex flex-wrap justify-center md:justify-end gap-4 text-xs text-slate-500">
                        <div class="tech-item flex items-center gap-2"><i class="fas fa-database text-cyan-400"></i><span>Firebase</span></div>
                        <div class="tech-item flex items-center gap-2"><i class="fab fa-css3-alt text-blue-400"></i><span>Tailwind CSS</span></div>
                        <div class="tech-item flex items-center gap-2"><i class="fas fa-font text-purple-400"></i><span>Font Awesome</span></div>
                        <div class="tech-item flex items-center gap-2"><i class="fas fa-code text-emerald-400"></i><span>JavaScript</span></div>
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
                        <a href="#" onclick="openLegalModal('terms'); return false;" class="hover:text-white transition-colors" data-footer-translate="footer_mobile_terms">${lang('footer_mobile_terms')}</a>
                        <a href="#" onclick="openLegalModal('privacy'); return false;" class="hover:text-white transition-colors" data-footer-translate="footer_mobile_privacy">${lang('footer_mobile_privacy')}</a>
                        <a href="#" onclick="openSupportModal(); return false;" class="hover:text-white transition-colors" data-footer-translate="footer_support">${lang('footer_support')}</a>
                        <span class="text-slate-600">•</span>
                        <a href="https://cryptorank.io" target="_blank" class="hover:text-cyan-400 transition-colors">CryptoRank</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Back to Top -->
        <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-500/30 text-white transition-all hover:scale-110 z-50">
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
                        <h2 class="text-xl font-bold text-white" data-footer-translate="footer_support_title">${lang('footer_support_title')}</h2>
                        <p class="text-sm text-slate-400" data-footer-translate="footer_support_subtitle">${lang('footer_support_subtitle')}</p>
                    </div>
                </div>
                <form id="supportForm" onsubmit="submitSupportTicket(event)" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2" data-footer-translate="footer_support_category">${lang('footer_support_category')}</label>
                        <select id="supportCategory" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                            <option value="" data-footer-translate="footer_support_select">${lang('footer_support_select')}</option>
                            <option value="technical" data-footer-translate="footer_support_technical">${lang('footer_support_technical')}</option>
                            <option value="account" data-footer-translate="footer_support_account">${lang('footer_support_account')}</option>
                            <option value="project" data-footer-translate="footer_support_project">${lang('footer_support_project')}</option>
                            <option value="suggestion" data-footer-translate="footer_support_suggestion">${lang('footer_support_suggestion')}</option>
                            <option value="partnership" data-footer-translate="footer_support_partnership">${lang('footer_support_partnership')}</option>
                            <option value="other" data-footer-translate="footer_support_other">${lang('footer_support_other')}</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2" data-footer-translate="footer_support_name">${lang('footer_support_name')}</label>
                            <input type="text" id="supportName" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2" data-footer-translate="footer_support_email">${lang('footer_support_email')}</label>
                            <input type="email" id="supportEmail" required placeholder="example@mail.com" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2" data-footer-translate="footer_support_subject">${lang('footer_support_subject')}</label>
                        <input type="text" id="supportSubject" required
                               placeholder="${lang('footer_support_subject_placeholder')}"
                               data-footer-placeholder="footer_support_subject_placeholder"
                               class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2" data-footer-translate="footer_support_message">${lang('footer_support_message')}</label>
                        <textarea id="supportMessage" required rows="5"
                                  placeholder="${lang('footer_support_message_placeholder')}"
                                  data-footer-placeholder="footer_support_message_placeholder"
                                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none resize-none"></textarea>
                    </div>
                    <button type="submit" id="supportSubmitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/20">
                        <i class="fas fa-paper-plane mr-2"></i>
                        <span data-footer-translate="footer_support_submit">${lang('footer_support_submit')}</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Newsletter Modal -->
        <div id="newsletterModal" class="modal">
            <div class="modal-content modal-sm p-6 relative">
                <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <i class="fas fa-times"></i>
                </button>
                <div class="text-center">
                    <div class="success-icon w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                        <i class="fas fa-check text-2xl text-emerald-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2" data-footer-translate="newsletter_success_title">${lang('newsletter_success_title')}</h3>
                    <p class="text-slate-400 mb-4 text-sm" data-footer-translate="newsletter_success_desc">${lang('newsletter_success_desc')}</p>
                    <button onclick="closeNewsletterModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-colors" data-footer-translate="close">${lang('close')}</button>
                </div>
            </div>
        </div>
        `;
    }

    // ============ ACCOUNT OVERLAY ============

    function _openAccountOverlay() {
        const old = document.getElementById('accountOverlayModal');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.id = 'accountOverlayModal';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            padding: 16px; opacity: 0; transition: opacity 0.2s ease;
        `;

        const box = document.createElement('div');
        box.style.cssText = `
            background: #1e2538; border: 1px solid rgba(71,85,105,0.5);
            border-radius: 20px; width: 100%; max-width: 680px; max-height: 90vh;
            overflow: hidden; display: flex; flex-direction: column;
            position: relative; transform: scale(0.95); transition: transform 0.2s ease;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute; top: 16px; right: 16px; z-index: 10;
            width: 32px; height: 32px; border-radius: 50%;
            background: rgba(71,85,105,0.5); border: none; color: #94a3b8;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            font-size: 14px; transition: all 0.2s;
        `;
        closeBtn.onmouseover = () => { closeBtn.style.background = 'rgba(239,68,68,0.3)'; closeBtn.style.color = '#f87171'; };
        closeBtn.onmouseout  = () => { closeBtn.style.background = 'rgba(71,85,105,0.5)';  closeBtn.style.color = '#94a3b8'; };

        function closeOverlay() {
            overlay.style.opacity = '0';
            box.style.transform = 'scale(0.95)';
            setTimeout(() => overlay.remove(), 200);
        }

        closeBtn.onclick = closeOverlay;
        overlay.addEventListener('mousedown', function(e) { if (e.target === overlay) closeOverlay(); });

        function onKeyDown(e) {
            if (e.key === 'Escape') { closeOverlay(); document.removeEventListener('keydown', onKeyDown); }
        }
        document.addEventListener('keydown', onKeyDown);

        const contentWrap = document.createElement('div');
        contentWrap.style.cssText = 'overflow-y: auto; flex: 1;';
        contentWrap.innerHTML = getAccountContent();

        box.appendChild(closeBtn);
        box.appendChild(contentWrap);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                box.style.transform = 'scale(1)';
            });
        });

        setTimeout(() => initAccountPage(), 100);
        window._closeAccountOverlay = closeOverlay;
    }

    // ============ COPY FUNCTIONS ============

    window.copyRefCode = function() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        const el = document.getElementById('profileRefCode');
        if (!el) return;

        const code = el.textContent.trim();
        if (!code || code === lang('account_generating')) return;

        const btn = document.querySelector('#profileRefCode + button');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(function() {
                _showCopySuccess(btn);
                footerShowToast(lang('ref_code_copied'), 'success');
            }).catch(function() {
                _copyFallback(code, btn);
            });
        } else {
            _copyFallback(code, btn);
        }
    };

    function _showCopySuccess(btn) {
        if (!btn) return;
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check text-xs"></i>';
        btn.style.background = 'rgba(16,185,129,0.3)';
        btn.style.color = '#10b981';
        setTimeout(function() {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }

    function _copyFallback(text, btn) {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(ta);
            _showCopySuccess(btn);
            footerShowToast(lang('ref_code_copied'), 'success');
        } catch(e) {
            footerShowToast(lang('copy_failed'), 'error');
        }
    }

    // ============ PAGE MODAL ============

    window.openPageModal = function(page) {
        if (page === 'account') {
            if (document.getElementById('claimModal')) {
    document.getElementById('claimModal').remove();
}
            _openAccountOverlay();
            return;
        }

        const modal   = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        let html = '';

        switch(page) {
            case 'faq':    html = getFAQContent();    break;
            case 'guides': html = getGuidesContent(); break;
            default:       html = `<p class="text-center text-slate-400 p-8">${lang('in_work') || 'В разработке'}</p>`;
        }

        content.innerHTML = html;
        modal.classList.add('active');
        if (page === 'faq') initFAQ();
    };

    window.closePageModal = function() {
        const modal = document.getElementById('pageModal');
        if (modal) modal.classList.remove('active');
    };

    window.closeAccountOverlay = function() {
        if (typeof window._closeAccountOverlay === 'function') window._closeAccountOverlay();
    };

    // ============ FAQ ============

    function getFAQContent() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;

        const faqData = [
            { q: lang('faq_q1'), a: lang('faq_a1') },
            { q: lang('faq_q2'), a: lang('faq_a2') },
            { q: lang('faq_q3'), a: lang('faq_a3') },
            { q: lang('faq_q4'), a: lang('faq_a4') },
            { q: lang('faq_q5'), a: lang('faq_a5') },
            { q: lang('faq_q6'), a: lang('faq_a6') }
        ];

        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-question-circle text-cyan-400"></i>
                    ${lang('footer_faq_title')}
                </h2>
                <p class="text-slate-400 mt-2">${lang('footer_faq_subtitle')}</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="space-y-4">
                    ${faqData.map((item, index) => `
                        <div class="faq-item border border-slate-700/50 rounded-xl overflow-hidden">
                            <button onclick="toggleFaqItem(${index})" class="faq-question w-full text-left p-4 flex items-center justify-between gap-4 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                                <span class="font-medium text-white">${item.q}</span>
                                <i class="fas fa-chevron-down text-slate-400 transition-transform" id="faq-icon-${index}"></i>
                            </button>
                            <div class="faq-answer hidden p-4 pt-2 text-slate-300 text-sm leading-relaxed" id="faq-answer-${index}">
                                ${item.a}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
                    <h4 class="font-bold text-white mb-2 flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-400"></i>
                        ${lang('footer_faq_not_found')}
                    </h4>
                    <p class="text-sm text-slate-400 mb-3">${lang('footer_faq_contact')}</p>
                    <button onclick="closePageModal(); setTimeout(() => openSupportModal(), 300);"
                            class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white">
                        ${lang('footer_faq_write')}
                    </button>
                </div>
            </div>
        `;
    }

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon   = document.getElementById(`faq-icon-${index}`);
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    };

    function initFAQ() { console.log('FAQ initialized'); }

    // ============ GUIDES ============

    function getGuidesContent() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;

        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-book-open text-cyan-400"></i>
                    ${lang('footer_guides_title')}
                </h2>
                <p class="text-slate-400 mt-2">${lang('footer_guides_subtitle')}</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <div class="grid gap-4">
                    ${FOOTER_CONFIG.guides.map(guide => `
                        <div class="guide-card border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition-colors bg-slate-800/30">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                                    ${guide.logo
                                        ? `<img src="${guide.logo}" alt="${guide.title}" class="w-full h-full object-cover">`
                                        : `<div class="w-full h-full flex items-center justify-center text-2xl font-bold text-cyan-400">${guide.title.charAt(0)}</div>`
                                    }
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 class="font-bold text-white">${guide.title}</h3>
                                        ${guide.status === 'new'
                                            ? '<span class="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">NEW</span>'
                                            : ''}
                                        ${guide.status === 'active'
                                            ? `<span class="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full">${lang('footer_guide_active')}</span>`
                                            : ''}
                                    </div>
                                    <p class="text-sm text-slate-400 mb-2">${lang(guide.descKey)}</p>
                                    <div class="flex items-center gap-4 text-xs text-slate-500">
                                        <span class="flex items-center gap-1">
                                            <i class="fas fa-signal text-green-400"></i>
                                            ${lang(guide.difficultyKey)}
                                        </span>
                                    </div>
                                    <a href="${guide.link}" target="_blank"
                                       class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium text-white transition-colors">
                                        <i class="fas fa-external-link-alt"></i>
                                        ${lang('footer_guide_go')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                    <p class="text-sm text-slate-400 text-center">
                        <i class="fas fa-lock text-slate-500 mr-2"></i>
                        ${lang('footer_guide_lock')}
                    </p>
                </div>
            </div>
        `;
    }

    // ============ ACCOUNT CONTENT ============

    function getAccountContent() {
        const lang      = typeof window.t === 'function' ? window.t : (k) => k;
        const user      = typeof currentUser !== 'undefined' ? currentUser : null;
        const userData  = typeof window.userProfileData !== 'undefined' ? window.userProfileData : {};

        const countries = [
            { code: 'AF', name: 'Afghanistan' }, { code: 'AL', name: 'Albania' },
            { code: 'DZ', name: 'Algeria' },     { code: 'AD', name: 'Andorra' },
            { code: 'AO', name: 'Angola' },      { code: 'AR', name: 'Argentina' },
            { code: 'AM', name: 'Armenia' },     { code: 'AU', name: 'Australia' },
            { code: 'AT', name: 'Austria' },     { code: 'AZ', name: 'Azerbaijan' },
            { code: 'BH', name: 'Bahrain' },     { code: 'BD', name: 'Bangladesh' },
            { code: 'BY', name: 'Belarus' },     { code: 'BE', name: 'Belgium' },
            { code: 'BZ', name: 'Belize' },      { code: 'BJ', name: 'Benin' },
            { code: 'BT', name: 'Bhutan' },      { code: 'BO', name: 'Bolivia' },
            { code: 'BA', name: 'Bosnia and Herzegovina' }, { code: 'BW', name: 'Botswana' },
            { code: 'BR', name: 'Brazil' },      { code: 'BN', name: 'Brunei' },
            { code: 'BG', name: 'Bulgaria' },    { code: 'BF', name: 'Burkina Faso' },
            { code: 'BI', name: 'Burundi' },     { code: 'KH', name: 'Cambodia' },
            { code: 'CM', name: 'Cameroon' },    { code: 'CA', name: 'Canada' },
            { code: 'CF', name: 'Central African Republic' }, { code: 'TD', name: 'Chad' },
            { code: 'CL', name: 'Chile' },       { code: 'CN', name: 'China' },
            { code: 'CO', name: 'Colombia' },    { code: 'KM', name: 'Comoros' },
            { code: 'CG', name: 'Congo' },       { code: 'CR', name: 'Costa Rica' },
            { code: 'HR', name: 'Croatia' },     { code: 'CU', name: 'Cuba' },
            { code: 'CY', name: 'Cyprus' },      { code: 'CZ', name: 'Czech Republic' },
            { code: 'DK', name: 'Denmark' },     { code: 'DJ', name: 'Djibouti' },
            { code: 'DO', name: 'Dominican Republic' }, { code: 'EC', name: 'Ecuador' },
            { code: 'EG', name: 'Egypt' },       { code: 'SV', name: 'El Salvador' },
            { code: 'EE', name: 'Estonia' },     { code: 'ET', name: 'Ethiopia' },
            { code: 'FJ', name: 'Fiji' },        { code: 'FI', name: 'Finland' },
            { code: 'FR', name: 'France' },      { code: 'GA', name: 'Gabon' },
            { code: 'GE', name: 'Georgia' },     { code: 'DE', name: 'Germany' },
            { code: 'GH', name: 'Ghana' },       { code: 'GR', name: 'Greece' },
            { code: 'GT', name: 'Guatemala' },   { code: 'GN', name: 'Guinea' },
            { code: 'HT', name: 'Haiti' },       { code: 'HN', name: 'Honduras' },
            { code: 'HK', name: 'Hong Kong' },   { code: 'HU', name: 'Hungary' },
            { code: 'IS', name: 'Iceland' },     { code: 'IN', name: 'India' },
            { code: 'ID', name: 'Indonesia' },   { code: 'IR', name: 'Iran' },
            { code: 'IQ', name: 'Iraq' },        { code: 'IE', name: 'Ireland' },
            { code: 'IL', name: 'Israel' },      { code: 'IT', name: 'Italy' },
            { code: 'JM', name: 'Jamaica' },     { code: 'JP', name: 'Japan' },
            { code: 'JO', name: 'Jordan' },      { code: 'KZ', name: 'Kazakhstan' },
            { code: 'KE', name: 'Kenya' },       { code: 'KW', name: 'Kuwait' },
            { code: 'KG', name: 'Kyrgyzstan' },  { code: 'LA', name: 'Laos' },
            { code: 'LV', name: 'Latvia' },      { code: 'LB', name: 'Lebanon' },
            { code: 'LY', name: 'Libya' },       { code: 'LI', name: 'Liechtenstein' },
            { code: 'LT', name: 'Lithuania' },   { code: 'LU', name: 'Luxembourg' },
            { code: 'MK', name: 'Macedonia' },   { code: 'MG', name: 'Madagascar' },
            { code: 'MY', name: 'Malaysia' },    { code: 'MV', name: 'Maldives' },
            { code: 'ML', name: 'Mali' },        { code: 'MT', name: 'Malta' },
            { code: 'MR', name: 'Mauritania' },  { code: 'MX', name: 'Mexico' },
            { code: 'MD', name: 'Moldova' },     { code: 'MC', name: 'Monaco' },
            { code: 'MN', name: 'Mongolia' },    { code: 'ME', name: 'Montenegro' },
            { code: 'MA', name: 'Morocco' },     { code: 'MZ', name: 'Mozambique' },
            { code: 'MM', name: 'Myanmar' },     { code: 'NA', name: 'Namibia' },
            { code: 'NP', name: 'Nepal' },       { code: 'NL', name: 'Netherlands' },
            { code: 'NZ', name: 'New Zealand' }, { code: 'NI', name: 'Nicaragua' },
            { code: 'NE', name: 'Niger' },       { code: 'NG', name: 'Nigeria' },
            { code: 'KP', name: 'North Korea' }, { code: 'NO', name: 'Norway' },
            { code: 'OM', name: 'Oman' },        { code: 'PK', name: 'Pakistan' },
            { code: 'PA', name: 'Panama' },      { code: 'PG', name: 'Papua New Guinea' },
            { code: 'PY', name: 'Paraguay' },    { code: 'PE', name: 'Peru' },
            { code: 'PH', name: 'Philippines' }, { code: 'PL', name: 'Poland' },
            { code: 'PT', name: 'Portugal' },    { code: 'QA', name: 'Qatar' },
            { code: 'RO', name: 'Romania' },     { code: 'RU', name: 'Russia' },
            { code: 'RW', name: 'Rwanda' },      { code: 'SA', name: 'Saudi Arabia' },
            { code: 'SN', name: 'Senegal' },     { code: 'RS', name: 'Serbia' },
            { code: 'SL', name: 'Sierra Leone' },{ code: 'SG', name: 'Singapore' },
            { code: 'SK', name: 'Slovakia' },    { code: 'SI', name: 'Slovenia' },
            { code: 'SO', name: 'Somalia' },     { code: 'ZA', name: 'South Africa' },
            { code: 'KR', name: 'South Korea' }, { code: 'SS', name: 'South Sudan' },
            { code: 'ES', name: 'Spain' },       { code: 'LK', name: 'Sri Lanka' },
            { code: 'SD', name: 'Sudan' },       { code: 'SE', name: 'Sweden' },
            { code: 'CH', name: 'Switzerland' }, { code: 'SY', name: 'Syria' },
            { code: 'TW', name: 'Taiwan' },      { code: 'TJ', name: 'Tajikistan' },
            { code: 'TZ', name: 'Tanzania' },    { code: 'TH', name: 'Thailand' },
            { code: 'TG', name: 'Togo' },        { code: 'TN', name: 'Tunisia' },
            { code: 'TR', name: 'Turkey' },      { code: 'TM', name: 'Turkmenistan' },
            { code: 'UG', name: 'Uganda' },      { code: 'UA', name: 'Ukraine' },
            { code: 'AE', name: 'United Arab Emirates' }, { code: 'GB', name: 'United Kingdom' },
            { code: 'US', name: 'United States' },{ code: 'UY', name: 'Uruguay' },
            { code: 'UZ', name: 'Uzbekistan' },  { code: 'VE', name: 'Venezuela' },
            { code: 'VN', name: 'Vietnam' },     { code: 'YE', name: 'Yemen' },
            { code: 'ZM', name: 'Zambia' },      { code: 'ZW', name: 'Zimbabwe' }
        ];

        const savedCountry = userData.country || '';

        return `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                    <i class="fas fa-user-cog text-emerald-400"></i>
                    ${lang('footer_account_title')}
                </h2>
                <p class="text-slate-400 mt-2">${lang('footer_account_manage')}</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${user ? `
                    <!-- Avatar Section -->
                    <div class="flex items-center gap-6 mb-8 pb-6 border-b border-slate-700/50">
                        <div class="relative group">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500/50">
                                <img id="accountAvatar"
                                     src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'U') + '&background=random'}"
                                     alt="Avatar" class="w-full h-full object-cover">
                            </div>
                            <label for="avatarUpload" class="absolute bottom-0 right-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500 transition-colors shadow-lg">
                                <i class="fas fa-camera text-white text-xs"></i>
                            </label>
                            <input type="file" id="avatarUpload" accept="image/*" class="hidden" onchange="uploadAvatar(event)">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-xl font-bold text-white" id="accountDisplayName">${user.displayName || lang('user')}</h3>
                            <p class="text-slate-400 text-sm">${user.email}</p>
                            <div class="mt-2 flex items-center gap-2">
                                <span class="text-xs text-slate-500">ID:</span>
                                <code id="accountUID" class="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded select-all break-all">${user.uid}</code>
                                <button onclick="copyAccountUID()" id="copyUIDBtn" title="${lang('copied')}"
                                        class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-cyan-600 text-slate-400 hover:text-white transition-all">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                            <p class="text-xs text-slate-600 mt-1">
                                <i class="fas fa-calendar-alt mr-1"></i>
                                ${user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : ''}
                            </p>
                        </div>
                    </div>

                    <!-- Profile Form -->
                    <form id="accountForm" onsubmit="saveAccountProfile(event)" class="space-y-6">

                        <!-- Name Row -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_firstname')}</label>
                                <input type="text" id="profileFirstName" value="${userData.firstName || ''}"
                                       placeholder="${lang('footer_account_firstname')}"
                                       class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_lastname')}</label>
                                <input type="text" id="profileLastName" value="${userData.lastName || ''}"
                                       placeholder="${lang('footer_account_lastname')}"
                                       class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>

                        <!-- Username + Birthdate -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_username')}</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
                                    <input type="text" id="profileUsername" value="${userData.username || ''}"
                                           placeholder="nickname"
                                           class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_birthdate')}</label>
                                <input type="date" id="profileBirthdate" value="${userData.birthdate || ''}"
                                       class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>

                        <!-- Gender -->
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_gender')}</label>
                            <div class="flex gap-4">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="male" ${userData.gender === 'male' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">${lang('footer_account_male')}</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="female" ${userData.gender === 'female' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">${lang('footer_account_female')}</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="gender" value="other" ${userData.gender === 'other' ? 'checked' : ''} class="text-cyan-500 bg-slate-800 border-slate-600">
                                    <span class="text-sm text-slate-300">${lang('footer_account_other_gender')}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Country + City -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_country')}</label>
                                <div class="relative" id="countryPickerWrapper">
                                    <div class="relative">
                                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                                        <input type="text" id="countrySearchInput"
                                               placeholder="${lang('account_select_country')}"
                                               autocomplete="off"
                                               class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                                               oninput="filterCountryList(this.value)"
                                               onfocus="showCountryDropdown()"
                                               value="${countries.find(c => c.code === savedCountry)?.name || savedCountry || ''}">
                                        <button type="button" onclick="clearCountryInput()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                                            <i class="fas fa-times text-xs"></i>
                                        </button>
                                    </div>
                                    <input type="hidden" id="profileCountry" value="${savedCountry}">
                                    <div id="countryDropdown" class="hidden absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                        ${countries.map(c => `
                                            <div class="country-option px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors"
                                                 data-code="${c.code}" data-name="${c.name}"
                                                 onclick="selectCountry('${c.code}', '${c.name}')">
                                                ${c.name}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">
                                    <i class="fas fa-city text-orange-400 mr-1"></i>${lang('account_city')}
                                </label>
                                <input type="text" id="profileCity" value="${userData.city || ''}"
                                       placeholder="${lang('account_city_placeholder')}"
                                       class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                            </div>
                        </div>

                        <!-- Bio -->
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">${lang('footer_account_bio')}</label>
                            <textarea id="profileBio" rows="3"
                                      placeholder="${lang('footer_account_bio_placeholder')}"
                                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none resize-none">${userData.bio || ''}</textarea>
                        </div>

                        <!-- Crypto Wallets -->
                        <div class="border-t border-slate-700/50 pt-5">
                            <h4 class="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                <i class="fas fa-wallet text-cyan-400"></i>
                                ${lang('footer_crypto_wallets')}
                            </h4>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                                        <span class="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">Ξ</span>
                                        EVM ${lang('footer_address')}
                                        <span class="text-slate-600">${lang('footer_evm_hint')}</span>
                                    </label>
                                    <input type="text" id="profileEvmAddress" value="${userData.evmAddress || ''}"
                                           placeholder="0x..."
                                           class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
                                        <span class="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">◎</span>
                                        ${lang('footer_solana_label')}
                                    </label>
                                    <input type="text" id="profileSolAddress" value="${userData.solAddress || ''}"
                                           placeholder="${lang('footer_solana_placeholder')}"
                                           class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none">
                                </div>
                            </div>
                        </div>

                        <!-- Social Networks -->
                        <div class="border-t border-slate-700/50 pt-5">
                            <h4 class="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                <i class="fas fa-share-alt text-pink-400"></i>
                                ${lang('footer_social_networks')}
                            </h4>
                            <div class="grid grid-cols-3 gap-3">
                                <div>
                                    <label class="block text-xs font-medium text-slate-400 mb-1.5">
                                        <i class="fab fa-twitter text-sky-400 mr-1"></i>Twitter / X
                                    </label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">@</span>
                                        <input type="text" id="profileTwitter" value="${(userData.twitter || '').replace('@','')}"
                                               placeholder="username"
                                               class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-slate-400 mb-1.5">
                                        <i class="fab fa-discord text-indigo-400 mr-1"></i>Discord
                                    </label>
                                    <input type="text" id="profileDiscord" value="${userData.discord || ''}"
                                           placeholder="username"
                                           class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-slate-400 mb-1.5">
                                        <i class="fas fa-telegram text-sky-500 mr-1"></i>${lang('footer_account_telegram')}
                                    </label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">@</span>
                                        <input type="text" id="profileTelegram" value="${userData.telegram || ''}"
                                               placeholder="username"
                                               class="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Referral Block -->
                        <div class="border-t border-slate-700/50 pt-5">
                            <h4 class="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                <i class="fas fa-user-plus text-emerald-400"></i>
                                ${lang('account_ref_program')}
                            </h4>
                            <div class="grid grid-cols-2 gap-3 mb-3">
                                <div class="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                    <div class="text-xs text-slate-500 mb-1.5">${lang('account_your_ref_code')}</div>
                                    <div class="flex items-center gap-2">
                                        <code id="profileRefCode" class="text-sm font-mono text-cyan-400 font-bold tracking-wider">
                                            ${userData.referralCode || lang('account_generating')}
                                        </code>
                                        <button type="button" onclick="copyRefCode()"
                                                class="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-cyan-600 text-slate-400 hover:text-white transition-all">
                                            <i class="fas fa-copy text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                    <div class="text-xs text-slate-500 mb-1.5">${lang('account_invited_count')}</div>
                                    <div class="text-lg font-bold text-emerald-400" id="profileInvitedCount">
                                        ${userData.invitedCount || 0}
                                        <span class="text-xs font-normal text-slate-500">${lang('account_people_short')}</span>
                                    </div>
                                </div>
                            </div>

                            ${userData.invitedBy ? `
                            <div class="mb-3 text-xs text-slate-500 flex items-center gap-1.5 bg-slate-800/30 rounded-lg px-3 py-2">
                                <i class="fas fa-user-check text-emerald-400"></i>
                                ${lang('account_invited_by')}
                                <span class="text-slate-300 font-medium">${userData.invitedByName || userData.invitedBy}</span>
                            </div>` : `
                            <div class="mb-3">
                                <label class="block text-xs font-medium text-slate-400 mb-1.5">
                                    <i class="fas fa-ticket-alt text-yellow-400 mr-1"></i>
                                    ${lang('account_enter_ref_code')}
                                </label>
                                <div class="flex gap-2">
                                    <input type="text" id="profileInviteCode"
                                           placeholder="${lang('ref_code_input_placeholder')}"
                                           class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-mono focus:border-yellow-500 focus:outline-none transition-colors">
                                    <button type="button" onclick="applyReferralCodeFooter()"
                                            class="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-sm font-medium text-white transition-colors whitespace-nowrap">
                                        ${lang('account_apply')}
                                    </button>
                                </div>
                            </div>`}

                            <div class="p-3 bg-emerald-900/20 border border-emerald-800/30 rounded-lg text-xs text-slate-400">
                                <i class="fas fa-flask text-emerald-400 mr-1.5"></i>
                                ${lang('account_ref_bonus_text')}
                                <span class="text-emerald-400 font-bold">${lang('account_ref_bonus_amount')}</span>!
                            </div>
                        </div>

                        <!-- Reagents Balance -->
        <div class="border-t border-slate-700/50 pt-5">
            <h4 class="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <span class="text-lg">🧪</span>
                ${lang('reagents_section_title')}
            </h4>
            <div class="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <div class="text-xs text-slate-400 mb-1">${lang('account_balance_label')}</div>
                        <div class="text-2xl font-black text-cyan-400" id="profileReagentBalance">
                            ${lang('account_loading')}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-slate-400 mb-1">${lang('account_streak_label')}</div>
                        <div class="text-xl font-bold text-orange-400" id="profileStreak">
                            ${lang('account_loading')}
                        </div>
                    </div>
                </div>
               <button type="button" onclick="window._closeAccountOverlay(); openClaimModal();" id="profileClaimBtn"
                        class="w-full py-2.5 rounded-lg text-sm font-bold transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
                    <i class="fas fa-flask mr-2"></i>${lang('account_get_reagents')}
                </button>
            </div>
        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-3 pt-4">
                            <button type="button"
                                    onclick="window._closeAccountOverlay ? window._closeAccountOverlay() : closePageModal()"
                                    class="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">
                                ${lang('footer_account_cancel')}
                            </button>
                            <button type="submit"
                                    class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all">
                                <i class="fas fa-save mr-2"></i>${lang('footer_account_save')}
                            </button>
                        </div>
                    </form>
                ` : `
                    <div class="text-center py-8">
                        <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-lock text-4xl text-slate-500"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">${lang('footer_account_not_logged')}</h3>
                        <p class="text-slate-400 mb-6">${lang('footer_account_login_desc')}</p>
                        <button onclick="(window._closeAccountOverlay ? window._closeAccountOverlay() : closePageModal()); setTimeout(() => { if(typeof openLoginModal==='function') openLoginModal(); }, 300);"
                                class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all">
                            <i class="fas fa-sign-in-alt mr-2"></i>${lang('login_btn')}
                        </button>
                    </div>
                `}
            </div>
        `;
    }

    // ============ INIT ACCOUNT PAGE ============

    // ============ INIT ACCOUNT PAGE ============

function initAccountPage() {
    const lang = typeof window.t === 'function' ? window.t : (k) => k;
    const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
    if (!user) return;

    const db  = window.db;
    const exp = window.__firestoreExports;

    if (db && exp && exp.doc && exp.getDoc && exp.setDoc) {
        exp.getDoc(exp.doc(db, 'users', user.uid)).then(async function(snap) {
            let rootData = {};
            let profile  = {};

            if (snap.exists()) {
                rootData = snap.data();
                profile  = rootData.profile || rootData || {};
            }

            const local  = JSON.parse(localStorage.getItem('userProfileData') || '{}');
            const merged = Object.assign({}, local, profile);

            if (!merged.referralCode && !rootData.referralCode) {
                const code = 'AL-' + user.uid.substring(0, 6).toUpperCase();
                merged.referralCode = code;
                try {
                    await exp.setDoc(exp.doc(db, 'users', user.uid), { referralCode: code }, { merge: true });
                } catch(e) { console.warn('Ref code save error:', e); }
            } else {
                merged.referralCode = merged.referralCode || rootData.referralCode;
            }

            merged.invitedCount  = rootData.invitedCount  || 0;
            merged.invitedBy     = rootData.invitedBy     || '';
            merged.invitedByName = rootData.invitedByName || '';
            
            // ✅ ДОБАВЛЯЕМ РЕАЛЬНЫЕ ДАННЫЕ ИЗ FIRESTORE
            merged.reagents = rootData.reagents || 0;
            merged.streak = rootData.streak || 0;

            window.userProfileData = merged;
            _fillAccountForm(merged);

            const refEl = document.getElementById('profileRefCode');
            if (refEl) refEl.textContent = merged.referralCode || 'AL-' + user.uid.substring(0,6).toUpperCase();

            const invEl = document.getElementById('profileInvitedCount');
            if (invEl) invEl.innerHTML = (merged.invitedCount || 0) + ' <span class="text-xs font-normal text-slate-500">' + lang('account_people_short') + '</span>';
            
            // ✅ ОБНОВЛЯЕМ РЕАГЕНТЫ И СТРИК
            const balEl = document.getElementById('profileReagentBalance');
            if (balEl) {
                balEl.innerHTML = merged.reagents + ' <span class="text-sm font-normal text-slate-400 ml-1">' + lang('reagents_rgt_unit') + '</span>';
            }

            const streakEl = document.getElementById('profileStreak');
            if (streakEl) {
                streakEl.innerHTML = merged.streak + ' <span class="text-xs font-normal text-slate-400">' + lang('account_days_short') + '</span>';
            }

        }).catch(function(err) {
            console.warn('Profile load error:', err);
            const local = JSON.parse(localStorage.getItem('userProfileData') || '{}');
            _fillAccountForm(local);
            
            // Если ошибка — показываем локальные данные
            const balEl = document.getElementById('profileReagentBalance');
            const streakEl = document.getElementById('profileStreak');
            if (balEl) balEl.innerHTML = (local.reagents || 0) + ' <span class="text-sm font-normal text-slate-400 ml-1">' + lang('reagents_rgt_unit') + '</span>';
            if (streakEl) streakEl.innerHTML = (local.streak || 0) + ' <span class="text-xs font-normal text-slate-400">' + lang('account_days_short') + '</span>';
        });
    }
}

    function _fillAccountForm(profile) {
    if (!profile) return;
    const lang = typeof window.t === 'function' ? window.t : (k) => k;

    const set = function(id, val) {
        const el = document.getElementById(id);
        if (el && val !== undefined && val !== null) el.value = val;
    };

    set('profileFirstName',  profile.firstName);
    set('profileLastName',   profile.lastName);
    set('profileUsername',   profile.username);
    set('profileTelegram',   profile.telegram);
    set('profileBirthdate',  profile.birthdate);
    set('profileBio',        profile.bio);
    set('profileEvmAddress', profile.evmAddress);
    set('profileSolAddress', profile.solAddress);
    set('profileDiscord',    profile.discord);
    set('profileCity',       profile.city);

    const twEl = document.getElementById('profileTwitter');
    if (twEl && profile.twitter) twEl.value = profile.twitter.replace('@', '');

    if (profile.gender) {
        const radio = document.querySelector(`input[name="gender"][value="${profile.gender}"]`);
        if (radio) radio.checked = true;
    }

    if (profile.countryName || profile.country) {
        const searchInput = document.getElementById('countrySearchInput');
        const hiddenInput = document.getElementById('profileCountry');
        if (searchInput) searchInput.value = profile.countryName || profile.country;
        if (hiddenInput) hiddenInput.value  = profile.country || '';
    }

    // ✅ ИСПОЛЬЗУЕМ РЕАЛЬНЫЕ ДАННЫЕ ИЗ FIRESTORE
    const balEl = document.getElementById('profileReagentBalance');
    if (balEl) {
        balEl.innerHTML = (profile.reagents || 0) + ' <span class="text-sm font-normal text-slate-400 ml-1">' + lang('reagents_rgt_unit') + '</span>';
    }

    const streakEl = document.getElementById('profileStreak');
    if (streakEl) {
        streakEl.innerHTML = (profile.streak || 0) + ' <span class="text-xs font-normal text-slate-400">' + lang('account_days_short') + '</span>';
    }
}

    // ============ REFERRAL CODE ============

    window.applyReferralCodeFooter = async function() {
    const lang  = typeof window.t === 'function' ? window.t : (k) => k;
    const input = document.getElementById('profileInviteCode');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (!code || !code.startsWith('AL-')) {
        footerShowToast(lang('ref_wrong_format'), 'error');
        return;
    }

    const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
    if (!user) {
        footerShowToast(lang('ref_login_required'), 'error');
        return;
    }

    const db  = window.db;
    const exp = window.__firestoreExports;
    if (!db || !exp) return;

    try {
        const snap = await exp.getDocs(
            exp.query(
                exp.collection(db, 'users'),
                exp.where('referralCode', '==', code)
            )
        );

        if (snap.empty) {
            footerShowToast(lang('ref_not_found'), 'error');
            return;
        }

        const inviterDoc  = snap.docs[0];
        const inviterId   = inviterDoc.id;
        const inviterData = inviterDoc.data();

        if (inviterId === user.uid) {
            footerShowToast(lang('ref_own_code'), 'error');
            return;
        }

        // Проверяем, есть ли уже приглашение от этого пригласившего
        const existingRef = await exp.getDocs(
            exp.query(
                exp.collection(db, 'referrals'),
                exp.where('userId', '==', user.uid),
                exp.where('invitedBy', '==', inviterId)
            )
        );

        if (!existingRef.empty) {
            footerShowToast(lang('ref_already_applied'), 'error');
            return;
        }

        // Обновляем документ пользователя
        await exp.setDoc(
            exp.doc(db, 'users', user.uid),
            {
                invitedBy:    inviterId,
                invitedByName: inviterData.displayName || inviterData.profile?.firstName || lang('user')
            },
            { merge: true }
        );

        // ✅ СОЗДАЕМ ЗАПИСЬ В КОЛЛЕКЦИИ referrals
        const now = new Date();
        await exp.addDoc(
            exp.collection(db, 'referrals'),
            {
                userId:        user.uid,
                userName:      user.displayName || user.email,
                userPhoto:     user.photoURL || '',
                invitedBy:     inviterId,
                invitedByName: inviterData.displayName || inviterData.profile?.firstName || lang('user'),
                createdAt:     now,
                timestamp:     now.toISOString(),
                status:        'active'
            }
        );

        // Обновляем счетчик приглашенных для пригласившего
        const currentInvited  = inviterData.invitedCount || 0;

        await exp.setDoc(
            exp.doc(db, 'users', inviterId),
            { invitedCount: currentInvited + 1 },
            { merge: true }
        );

        // Начисляем бонусы
        const mySnap     = await exp.getDoc(exp.doc(db, 'users', user.uid));
        const myData     = mySnap.exists() ? mySnap.data() : {};
        const myReagents = myData.reagents || 0;

        // Бонус приглашенному (50 reagents)
        await exp.setDoc(
            exp.doc(db, 'users', user.uid),
            { reagents: myReagents + 50 },
            { merge: true }
        );

        // Бонус пригласившему (25 reagents)
        const inviterReagents = inviterData.reagents || 0;
        await exp.setDoc(
            exp.doc(db, 'users', inviterId),
            { reagents: inviterReagents + 25 },
            { merge: true }
        );

        footerShowToast(lang('ref_applied'), 'success');
        input.style.display = 'none';
        setTimeout(function() { 
            initAccountPage(); 
        }, 500);

    } catch(err) {
        console.error('Referral error:', err);
        footerShowToast(lang('ref_error') + ' ' + err.message, 'error');
    }
};
    // ============ COUNTRY PICKER ============

    window.filterCountryList = function(query) {
        const lang     = typeof window.t === 'function' ? window.t : (k) => k;
        const dropdown = document.getElementById('countryDropdown');
        if (!dropdown) return;
        const options = dropdown.querySelectorAll('.country-option');
        const q = query.toLowerCase().trim();

        let hasVisible = false;
        options.forEach(function(opt) {
            const name = opt.getAttribute('data-name').toLowerCase();
            if (name.includes(q)) { opt.style.display = ''; hasVisible = true; }
            else                  { opt.style.display = 'none'; }
        });

        dropdown.classList.remove('hidden');

        let noResult = dropdown.querySelector('.no-country-result');
        if (!hasVisible) {
            if (!noResult) {
                noResult = document.createElement('div');
                noResult.className = 'no-country-result px-4 py-2.5 text-sm text-slate-500 italic';
                dropdown.appendChild(noResult);
            }
            noResult.textContent = lang('account_country_other_input');
            document.getElementById('profileCountry').value = query;
        } else {
            if (noResult) noResult.remove();
        }
    };

    window.showCountryDropdown = function() {
        const dropdown = document.getElementById('countryDropdown');
        if (dropdown) {
            dropdown.classList.remove('hidden');
            dropdown.querySelectorAll('.country-option').forEach(opt => opt.style.display = '');
        }
    };

    window.selectCountry = function(code, name) {
        const input    = document.getElementById('countrySearchInput');
        const hidden   = document.getElementById('profileCountry');
        const dropdown = document.getElementById('countryDropdown');
        if (input)    input.value = name;
        if (hidden)   hidden.value = code;
        if (dropdown) dropdown.classList.add('hidden');
    };

    window.clearCountryInput = function() {
        const input    = document.getElementById('countrySearchInput');
        const hidden   = document.getElementById('profileCountry');
        const dropdown = document.getElementById('countryDropdown');
        if (input)    { input.value = ''; input.focus(); }
        if (hidden)   hidden.value = '';
        if (dropdown) {
            dropdown.classList.remove('hidden');
            dropdown.querySelectorAll('.country-option').forEach(opt => opt.style.display = '');
        }
    };

    document.addEventListener('click', function(e) {
        const wrapper = document.getElementById('countryPickerWrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            const dropdown = document.getElementById('countryDropdown');
            if (dropdown) dropdown.classList.add('hidden');
        }
    });

    // ============ SAVE PROFILE ============

    window.saveAccountProfile = async function(e) {
        e.preventDefault();
        const lang = typeof window.t === 'function' ? window.t : (k) => k;

        const user = (window.auth && window.auth.currentUser) || window.currentUser || null;
        const db   = window.db;
        const exp  = window.__firestoreExports;

        if (!exp || !exp.setDoc) {
            footerShowToast(lang('error_occurred'), 'error');
            return;
        }
        if (!user) {
            footerShowToast(lang('footer_account_not_logged'), 'error');
            return;
        }

        const submitBtn   = e.target.querySelector('button[type="submit"]');
        const originalHTML = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>...';
        }

        const countryCode = document.getElementById('profileCountry')?.value || '';
        const countryName = document.getElementById('countrySearchInput')?.value || countryCode;

        const profileData = {
            firstName:   (document.getElementById('profileFirstName')?.value  || '').trim(),
            lastName:    (document.getElementById('profileLastName')?.value   || '').trim(),
            username:    (document.getElementById('profileUsername')?.value   || '').trim(),
            telegram:    (document.getElementById('profileTelegram')?.value   || '').trim(),
            birthdate:   document.getElementById('profileBirthdate')?.value  || '',
            gender:      document.querySelector('input[name="gender"]:checked')?.value || '',
            country:     countryCode,
            countryName: countryName,
            bio:         (document.getElementById('profileBio')?.value        || '').trim(),
            evmAddress:  (document.getElementById('profileEvmAddress')?.value || '').trim(),
            solAddress:  (document.getElementById('profileSolAddress')?.value || '').trim(),
            twitter:     (document.getElementById('profileTwitter')?.value    || '').replace('@','').trim(),
            discord:     (document.getElementById('profileDiscord')?.value    || '').trim(),
            city:        (document.getElementById('profileCity')?.value       || '').trim(),
            updatedAt:   new Date().toISOString()
        };

        window.userProfileData = profileData;
        localStorage.setItem('userProfileData', JSON.stringify(profileData));

        try {
            await exp.setDoc(
                exp.doc(db, 'users', user.uid),
                {
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') || user.displayName || '',
                    photoURL:    user.photoURL || '',
                    profile:     profileData,
                    lastSeen:    new Date().toISOString()
                },
                { merge: true }
            );

            const newName = [profileData.firstName, profileData.lastName].filter(Boolean).join(' ');
            if (newName && window.__authExports?.updateProfile) {
                try {
                    await window.__authExports.updateProfile(user, { displayName: newName });
                    const nameEl   = document.getElementById('accountDisplayName');
                    const headerEl = document.getElementById('userName');
                    if (nameEl)   nameEl.textContent   = newName;
                    if (headerEl) headerEl.textContent = newName;
                } catch(authErr) {
                    console.warn(lang('error_occurred') + ':', authErr);
                }
            }

            footerShowToast(lang('footer_account_saved'), 'success');

        } catch(err) {
            console.error('Save error:', err);
            footerShowToast(lang('footer_account_saved_local') + ' (' + err.message + ')', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }
        }
    };

    // ============ AVATAR UPLOAD ============

    window.uploadAvatar = async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;

        if (file.size > 2 * 1024 * 1024) {
            footerShowToast(lang('avatar_too_large'), 'error');
            return;
        }

        const img    = document.getElementById('accountAvatar');
        const reader = new FileReader();

        reader.onload = async function(event) {
            if (img) img.src = event.target.result;

            if (!user) {
                footerShowToast(lang('footer_account_photo'));
                return;
            }

            const storageExp = window.__storageExports;
            const storage    = window.storage;

            if (storageExp && storage && storageExp.ref && storageExp.uploadBytes && storageExp.getDownloadURL) {
                try {
                    footerShowToast(lang('avatar_uploading'), 'info');

                    const storageRef  = storageExp.ref(storage, `avatars/${user.uid}`);
                    const snapshot    = await storageExp.uploadBytes(storageRef, file);
                    const downloadURL = await storageExp.getDownloadURL(snapshot.ref);

                    const authExp = window.__authExports;
                    if (authExp && authExp.updateProfile && window.auth) {
                        await authExp.updateProfile(user, { photoURL: downloadURL });
                    }

                    const db  = window.db;
                    const exp = window.__firestoreExports;
                    if (db && exp && exp.doc && exp.setDoc) {
                        await exp.setDoc(exp.doc(db, 'users', user.uid), { photoURL: downloadURL }, { merge: true });
                    }

                    if (img) img.src = downloadURL;
                    footerShowToast(lang('footer_account_photo'));

                } catch(err) {
                    console.error('Avatar upload error:', err);
                    await _saveAvatarAsBase64(event.target.result, user, lang);
                }
            } else {
                await _saveAvatarAsBase64(event.target.result, user, lang);
            }
        };
        reader.readAsDataURL(file);
    };

    async function _saveAvatarAsBase64(base64, user, lang) {
        const db  = window.db;
        const exp = window.__firestoreExports;

        if (db && exp && exp.doc && exp.setDoc) {
            try {
                await exp.setDoc(exp.doc(db, 'users', user.uid), { photoURL: base64 }, { merge: true });
                footerShowToast(lang('footer_account_photo'));
            } catch(err) {
                console.error('Base64 save error:', err);
                footerShowToast(lang('avatar_local_only'));
            }
        } else {
            footerShowToast(lang('avatar_local_only'));
        }
    }

    // ============ COPY UID ============

    window.copyAccountUID = function() {
        const lang  = typeof window.t === 'function' ? window.t : (k) => k;
        const uidEl = document.getElementById('accountUID');
        if (!uidEl) return;

        const uid = uidEl.textContent;
        const btn = document.getElementById('copyUIDBtn');

        navigator.clipboard.writeText(uid).then(function() {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check text-xs"></i>';
                btn.classList.add('bg-emerald-600');
                btn.classList.remove('bg-slate-700');
                setTimeout(function() {
                    btn.innerHTML = '<i class="fas fa-copy text-xs"></i>';
                    btn.classList.remove('bg-emerald-600');
                    btn.classList.add('bg-slate-700');
                }, 2000);
            }
            footerShowToast(lang('copied'));
        }).catch(function() {
            const range = document.createRange();
            range.selectNode(uidEl);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            footerShowToast(lang('copied'));
        });
    };

    // ============ NOTIFICATIONS ============

    window.openNotificationsModal = function() {
        const lang    = typeof window.t === 'function' ? window.t : (k) => k;
        const modal   = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        const notificationsList = (typeof window.notifications !== 'undefined') ? window.notifications : [];

        const html = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                            <i class="fas fa-bell text-yellow-400"></i>
                            ${lang('notif_title')}
                        </h2>
                        <p class="text-slate-400 mt-2">${notificationsList.length} ${lang('notifications')}</p>
                    </div>
                    ${notificationsList.length > 0
                        ? `<button onclick="clearAllNotifications()" class="text-xs text-slate-400 hover:text-white transition-colors">${lang('notif_clear_all')}</button>`
                        : ''}
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
                            ${!notif.read
                                ? `<button onclick="markNotificationRead('${notif.id}')" class="text-xs text-cyan-400 hover:text-cyan-300">${lang('notif_mark_read')}</button>`
                                : ''}
                        </div>
                    </div>
                `).join('') : `
                    <div class="text-center py-12">
                        <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-bell-slash text-3xl text-slate-500"></i>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">${lang('notif_empty_title')}</h3>
                        <p class="text-slate-400 text-sm">${lang('notif_empty_desc')}</p>
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
        openNotificationsModal();
    };

    window.clearAllNotifications = function() {
        localStorage.setItem('notifications', '[]');
        window.notifications = [];
        openNotificationsModal();
    };

    function formatTimeAgo(date) {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        if (!date) return '';
        const now  = new Date();
        const diff = now - new Date(date);
        if (diff < 60000)    return lang('time_just_now');
        if (diff < 3600000)  return Math.floor(diff / 60000)    + ' ' + lang('time_min_ago');
        if (diff < 86400000) return Math.floor(diff / 3600000)  + ' ' + lang('time_hour_ago');
        return Math.floor(diff / 86400000) + ' ' + lang('time_day_ago');
    }

        // ============ LEGAL MODALS (FIXED) ============

    window.openLegalModal = async function(type) {
        const lang      = typeof window.t === 'function' ? window.t : (k) => k;
        const legalData = FOOTER_CONFIG.legal[type];
        if (!legalData) return;

        const modal   = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        const icons = {
            terms:      'fa-file-contract text-purple-400',
            privacy:    'fa-shield-alt text-blue-400',
            cookie:     'fa-cookie-bite text-orange-400',
            disclaimer: 'fa-exclamation-triangle text-red-400'
        };

        // 1. Сначала рисуем скелет модалки с индикатором загрузки
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                        <i class="fas ${icons[type]} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-white">${legalData.title}</h2>
                        <p class="text-sm text-slate-400">${lang('footer_legal_updated')} ${legalData.lastUpdated}</p>
                    </div>
                </div>
            </div>
            <div id="legalBody" class="p-6 max-h-[70vh] overflow-y-auto legal-content">
                <div class="flex flex-col items-center justify-center py-12 text-slate-500">
                    <i class="fas fa-circle-notch fa-spin text-3xl mb-4 text-cyan-500"></i>
                    <p>Loading document...</p>
                </div>
            </div>
            <div class="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <button onclick="closePageModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">
                    ${lang('legal_close_btn') || 'Close'}
                </button>
            </div>
        `;

        modal.classList.add('active');

        // 2. Загружаем содержимое файла
        try {
            const response = await fetch(legalData.url);
            if (!response.ok) throw new Error('File not found');
            
            const htmlText = await response.text();
            
            // Парсим полученный HTML, чтобы вытащить только нужную языковую секцию
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Определяем текущий язык (ru или en)
            const currentLang = (typeof window.currentLang !== 'undefined') ? window.currentLang : 'ru';
            
            // Ищем секцию с id="ru" или id="en" внутри скачанного файла
            const section = doc.getElementById(currentLang);
            const bodyContainer = document.getElementById('legalBody');
            
            if (section && bodyContainer) {
                bodyContainer.innerHTML = section.innerHTML;
            } else {
                // Если секция не найдена, вставляем весь текст (fallback)
                bodyContainer.innerHTML = htmlText; 
            }
        } catch (err) {
            console.error('Legal load error:', err);
            document.getElementById('legalBody').innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-exclamation-circle text-red-500 text-3xl mb-2"></i>
                    <p class="text-white">Failed to load document.</p>
                    <p class="text-sm text-slate-500 mt-2">Please try again later or contact support.</p>
                    <a href="${legalData.url}" target="_blank" class="text-cyan-400 underline mt-4 inline-block text-sm">Open direct link</a>
                </div>`;
        }
    };

    // ============ TUTORIALS ============

    window.openTutorialsPage = function() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        footerShowToast(lang('tutorials_toast'));
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        const btn  = document.getElementById('supportSubmitBtn');
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;

        if (!user) {
            footerShowToast(lang('footer_support_login'));
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + lang('ticket_sending');

        try {
            const { collection, addDoc } = window.__firestoreExports;
            const name    = document.getElementById('supportName').value    || user.displayName || lang('user');
            const email   = document.getElementById('supportEmail').value;
            const subject = document.getElementById('supportSubject').value;
            const message = document.getElementById('supportMessage').value;

            const contactInfo = '👤 ' + name + '  |  📧 ' + email;
            const fullText    = contactInfo + '\n' + '─'.repeat(30) + '\n'
                              + (subject ? '[' + subject + ']\n\n' : '')
                              + message;

            await addDoc(collection(window.db, 'feedbacks'), {
                projectId:   '__support__',
                projectName: 'Support',
                category:    document.getElementById('supportCategory').value,
                userId:      user.uid,
                userName:    name,
                userPhoto:   user.photoURL || '',
                status:      'open',
                read:        false,
                userRead:    true,
                createdAt:   new Date(),
                messages: [{
                    sender:    'user',
                    text:      fullText,
                    timestamp: new Date()
                }]
            });

            footerShowToast(lang('ticket_sent'), 'success');
            closeSupportModal();
            document.getElementById('supportForm').reset();

        } catch(err) {
            footerShowToast(lang('ticket_error'), 'error');
        } finally {
            btn.disabled  = false;
            btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>' + lang('ticket_submit_btn');
        }
    };

    // ============ FOOTER SUPPORT FORM (_showSupportForm) ============

    function _getSupportUserName() {
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
        return user ? (user.displayName || '') : '';
    }

    function _getSupportUserEmail() {
        const user = typeof window.currentUser !== 'undefined' ? window.currentUser : null;
        return user ? (user.email || '') : '';
    }

    function _showSupportForm() {
        const lang    = typeof window.t === 'function' ? window.t : (k) => k;
        const modal   = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;

        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                        <i class="fas fa-headset text-purple-400 text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-white">${lang('support_form_title')}</h2>
                        <p class="text-sm text-slate-400">${lang('support_form_subtitle')}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 max-h-[75vh] overflow-y-auto">
                <form id="footerSupportForm" onsubmit="footerSubmitSupport(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1.5">${lang('footer_support_category')}</label>
                        <select id="fsSupportCategory" required
                                class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                            <option value="">${lang('support_select_category')}</option>
                            <option value="technical">${lang('support_cat_technical')}</option>
                            <option value="account">${lang('support_cat_account')}</option>
                            <option value="project">${lang('support_cat_project')}</option>
                            <option value="suggestion">${lang('support_cat_suggestion')}</option>
                            <option value="partnership">${lang('support_cat_partnership')}</option>
                            <option value="other">${lang('support_cat_other')}</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">${lang('support_your_name')}</label>
                            <input type="text" id="fsSupportName"
                                   value="${_getSupportUserName()}"
                                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-slate-400 mb-1.5">${lang('footer_support_email')}</label>
                            <input type="email" id="fsSupportEmail" required
                                   value="${_getSupportUserEmail()}"
                                   placeholder="example@mail.com"
                                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1.5">${lang('support_subject_label')}</label>
                        <input type="text" id="fsSupportSubject" required
                               placeholder="${lang('support_subject_placeholder')}"
                               class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-400 mb-1.5">${lang('support_desc_label')}</label>
                        <textarea id="fsSupportMessage" required rows="5"
                                  placeholder="${lang('support_desc_placeholder')}"
                                  class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none resize-none"></textarea>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="closePageModal()"
                                class="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white transition-colors">
                            ${lang('support_cancel')}
                        </button>
                        <button type="submit" id="fsSupportSubmitBtn"
                                class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 rounded-lg text-sm font-bold text-white transition-all">
                            <i class="fas fa-paper-plane mr-2"></i>${lang('support_submit')}
                        </button>
                    </div>
                </form>
            </div>
        `;

        modal.classList.add('active');
    }

    window.footerSubmitSupport = async function(e) {
        e.preventDefault();
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        const btn  = document.getElementById('fsSupportSubmitBtn');
        if (!btn) return;

        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + lang('support_sending_text');
        btn.disabled  = true;

        const user = (typeof window.currentUser !== 'undefined') ? window.currentUser : null;

        if (!user) {
            btn.innerHTML = originalHTML;
            btn.disabled  = false;
            footerShowToast(lang('support_need_login'));
            closePageModal();
            if (typeof window.openLoginModal === 'function') {
                setTimeout(function() { window.openLoginModal(); }, 300);
            }
            return;
        }

        const category = document.getElementById('fsSupportCategory').value;
        const name     = document.getElementById('fsSupportName').value;
        const email    = document.getElementById('fsSupportEmail').value;
        const subject  = document.getElementById('fsSupportSubject').value;
        const message  = document.getElementById('fsSupportMessage').value;

        if (!category) {
            btn.innerHTML = originalHTML;
            btn.disabled  = false;
            footerShowToast(lang('support_select_cat_warn'));
            return;
        }

        const contactInfo = '👤 ' + (name || lang('account_not_specified')) + '  |  📧 ' + email;
        const fullMessage = contactInfo + '\n' + '─'.repeat(30) + '\n'
                          + (subject ? '[' + subject + ']\n\n' : '')
                          + message;

        try {
            const firestoreModule = window.__firestoreExports;

            if (firestoreModule && firestoreModule.addDoc && firestoreModule.collection && window.db) {
                await firestoreModule.addDoc(
                    firestoreModule.collection(window.db, 'feedbacks'),
                    {
                        projectId:   '__support__',
                        projectName: 'Support',
                        projectLogo: '',
                        type:        'support',
                        category:    category,
                        userId:      user.uid,
                        userName:    name || user.displayName || user.email,
                        userPhoto:   user.photoURL || '',
                        status:      'open',
                        read:        false,
                        userRead:    true,
                        deleted:     false,
                        userDeleted: false,
                        createdAt:   new Date(),
                        messages: [{
                            sender:    'user',
                            text:      fullMessage,
                            timestamp: new Date()
                        }]
                    }
                );

                btn.innerHTML = originalHTML;
                btn.disabled  = false;
                footerShowToast(lang('support_sent_ok'), 'success');
                setTimeout(function() { closePageModal(); }, 1200);

            } else {
                throw new Error('Firebase not available');
            }

        } catch(err) {
            console.error('Support submit error:', err);
            btn.innerHTML = originalHTML;
            btn.disabled  = false;
            footerShowToast(lang('support_send_error'), 'error');
        }
    };

    // ============ NEWSLETTER ============

    function handleNewsletterSubscription() {
        const lang         = typeof window.t === 'function' ? window.t : (k) => k;
        const emailInput   = document.getElementById('footerEmailInput');
        const subscribeBtn = document.getElementById('subscribeBtn');
        if (!emailInput || !subscribeBtn) return;

        const email = emailInput.value.trim();

        if (!email || !isValidEmail(email)) {
            emailInput.classList.add('error');
            footerShowToast(lang('footer_invalid_email'), 'error');
            setTimeout(() => emailInput.classList.remove('error'), 2000);
            emailInput.focus();
            return;
        }

        subscribeBtn.classList.add('loading');
        const originalHTML = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = `<span>${lang('footer_sending')}</span>`;

        const db  = window.db;
        const exp = window.__firestoreExports;

        if (db && exp && exp.addDoc && exp.collection && exp.getDocs && exp.query && exp.where) {

            exp.getDocs(
                exp.query(exp.collection(db, 'newsletter'), exp.where('email', '==', email))
            ).then(function(existing) {

                if (!existing.empty) {
                    subscribeBtn.classList.remove('loading');
                    subscribeBtn.innerHTML = originalHTML;
                    emailInput.value = '';
                    emailInput.classList.add('success');
                    emailInput.placeholder = lang('footer_already_subscribed');
                    footerShowToast(lang('footer_already_toast'));
                    setTimeout(() => {
                        emailInput.placeholder = lang('footer_email_placeholder');
                        emailInput.classList.remove('success');
                    }, 4000);
                    return;
                }

                return exp.addDoc(exp.collection(db, 'newsletter'), {
                    email:        email,
                    subscribedAt: new Date().toISOString(),
                    source:       'footer',
                    active:       true,
                    userAgent:    navigator.userAgent.substring(0, 100)
                });

            }).then(function(docRef) {
                if (!docRef) return;

                subscribeBtn.classList.remove('loading');
                subscribeBtn.innerHTML = originalHTML;
                emailInput.value = '';
                emailInput.classList.add('success');
                emailInput.placeholder = lang('footer_thanks');

                setTimeout(function() { showNewsletterModal(); }, 500);
                footerShowToast(lang('footer_subscribed_toast'));

                setTimeout(function() {
                    emailInput.placeholder = lang('footer_email_placeholder');
                    emailInput.classList.remove('success');
                }, 5000);

            }).catch(function(err) {
                console.error('Newsletter error:', err);
                subscribeBtn.classList.remove('loading');
                subscribeBtn.innerHTML = originalHTML;
                footerShowToast(lang('footer_error_toast'), 'error');
            });

        } else {
            setTimeout(function() {
                subscribeBtn.classList.remove('loading');
                subscribeBtn.innerHTML = originalHTML;
                emailInput.value = '';
                emailInput.placeholder = lang('footer_thanks');
                emailInput.classList.add('success');
                setTimeout(function() { showNewsletterModal(); }, 500);
                footerShowToast(lang('footer_subscribed_toast'));
                setTimeout(function() {
                    emailInput.placeholder = lang('footer_email_placeholder');
                    emailInput.classList.remove('success');
                }, 5000);
            }, 1000);
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
            setTimeout(() => modal.classList.add('active'), 10);
        }
    }

    window.closeNewsletterModal = function() {
        const modal = document.getElementById('newsletterModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    };

      // ============ FOOTER STATS ============

    let _statsUnsubscribe = null;

    function updateFooterStats() {
        const userEl    = document.getElementById('footerUserCount');
        const projectEl = document.getElementById('footerProjectCount');

        // 1. Обновление проектов
        if (projectEl && typeof window.projects !== 'undefined') {
            projectEl.textContent = Array.isArray(window.projects) 
                ? window.projects.filter(p => !p.deleted).length 
                : 0;
            projectEl.classList.add('text-cyan-400');
        }

        // 2. Обновление пользователей (Realtime)
        if (userEl) {
            const db  = window.db;
            const exp = window.__firestoreExports;

            if (db && exp && exp.doc && exp.onSnapshot) {
                if (_statsUnsubscribe) _statsUnsubscribe();

                _statsUnsubscribe = exp.onSnapshot(
                    exp.doc(db, 'config', 'stats'),
                    function(snap) {
                        if (snap.exists()) {
                            const count = snap.data().userCount || 0;
                            userEl.textContent = count;
                            userEl.classList.toggle('text-emerald-400', count > 0);
                            userEl.classList.toggle('text-slate-400',   count <= 0);
                        }
                    }
                );
            }
        }
    }   // ← ЕДИНСТВЕННАЯ закрывающая скобка функции

    // ============ LANGUAGE TOGGLE ============

    function updateFooterLanguageButton() {
        const langFlag = document.querySelector('.lang-flag-footer');
        const langText = document.querySelector('.lang-text-footer');
        if (langFlag && langText) {
            const currentLang = typeof window.currentLang !== 'undefined' ? window.currentLang : 'ru';
            langFlag.textContent = currentLang === 'en' ? '🇺🇸' : '🇷🇺';
            langText.textContent = currentLang === 'en' ? 'ENG' : 'РУС';
        }
    }

    window.footerToggleLang = function() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        if (typeof window.toggleLang === 'function') {
            window.toggleLang();
        } else if (typeof window.setLanguage === 'function') {
            const newLang = window.currentLang === 'ru' ? 'en' : 'ru';
            window.setLanguage(newLang);
        } else {
            document.dispatchEvent(new CustomEvent('footerToggleLang'));
        }
        setTimeout(updateFooterLanguageButton, 100);
        footerShowToast(lang('footer_language_changed'));
    };

    window.footerScrollToTop = function() {
        const lang = typeof window.t === 'function' ? window.t : (k) => k;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        footerShowToast(lang('footer_scroll_top_toast'));
    };

    // ============ TOAST ============

    function footerShowToast(message, type) {
        type = type || 'success';

        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }

        let toast = document.getElementById('footer-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'footer-toast';
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border: 1px solid rgba(255,255,255,0.1);
                color: white; padding: 14px 20px; border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.4);
                transform: translateY(100px); opacity: 0;
                transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                z-index: 9999; display: flex; align-items: center; gap: 10px;
                font-size: 14px; font-family: 'Inter', sans-serif;
            `;
            document.body.appendChild(toast);
        }

        const icons = {
            success: '<i class="fas fa-check-circle" style="color:#10b981;"></i>',
            error:   '<i class="fas fa-exclamation-circle" style="color:#ef4444;"></i>',
            info:    '<i class="fas fa-info-circle" style="color:#3b82f6;"></i>'
        };

        toast.innerHTML = (icons[type] || icons.success) + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity   = '1';

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity   = '0';
        }, 3000);
    }

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v2')) return;
        const styles = document.createElement('style');
        styles.id = 'footer-styles-v2';
        styles.textContent = `
            .site-footer { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; }
            .footer-bg-gradient, .footer-bg-pattern { pointer-events: none; }
            .social-link { position: relative; overflow: hidden; }
            .social-link:active { transform: scale(0.95); }
            .footer-link { position: relative; padding: 4px 0; transition: all 0.2s ease; }
            .footer-link:hover { transform: translateX(6px); }
            .footer-email-input { box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
            .footer-email-input:focus { box-shadow: 0 0 0 3px rgba(34,211,238,0.15), inset 0 2px 4px rgba(0,0,0,0.1); }
            .footer-email-input.error { border-color: #ef4444 !important; animation: shake 0.5s; }
            .footer-email-input.success { border-color: #10b981 !important; background: rgba(16,185,129,0.1) !important; }
            @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
            .back-to-top { opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
            .back-to-top.visible { opacity: 1; visibility: visible; }
            .back-to-top:hover { transform: translateY(-3px) scale(1.05) !important; box-shadow: 0 10px 30px rgba(34,211,238,0.4) !important; }
            .status-dot { animation: statusPulse 2s infinite; }
            @keyframes statusPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.2);opacity:0.7} }
            .page-modal-content { max-width: 700px; width: 95%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 1rem; background: rgba(15,23,42,0.98); border: 1px solid rgba(255,255,255,0.1); }
            .guide-card:hover { transform: translateY(-2px); }
            .legal-content h3 { font-size:1.1rem; font-weight:700; color:#fff; margin:1.5rem 0 0.75rem; }
            .legal-content h3:first-child { margin-top:0; }
            .legal-content h4 { font-size:1rem; font-weight:600; color:#e2e8f0; margin:1.25rem 0 0.5rem; }
            .legal-content p { color:#cbd5e1; line-height:1.7; margin-bottom:0.75rem; }
            .legal-content ul { margin:0.5rem 0 1rem 1.5rem; }
            .legal-content li { color:#cbd5e1; margin-bottom:0.5rem; }
            .legal-content strong { color:#fff; }
            .modal-md { max-width: 500px; }
            .subscribe-btn.loading { pointer-events:none; opacity:0.7; }
            @keyframes spin { to{transform:rotate(360deg)} }
            @media (max-width: 768px) {
                .site-footer .grid { grid-template-columns: 1fr; gap: 2rem; }
                .site-footer [class*="col-span"] { grid-column: 1 / -1 !important; }
                .back-to-top { bottom: 5rem; right: 1rem; }
                .newsletter-form { flex-direction: column; }
                .subscribe-btn { width: 100%; justify-content: center; }
                .page-modal-content { width: 98%; max-height: 95vh; }
            }
            html { scroll-behavior: smooth; }
        `;
        document.head.appendChild(styles);
    }

    // ============ INITIALIZE ============

    function initializeFooterFunctions() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    initBackToTop();
    initNewsletterForm();
    initFooterLinks();
    updateFooterLanguageButton();
    
    // ⭐️ Обязательно должен быть здесь
    updateFooterStats();
    
    document.addEventListener('projectsLoaded', function() {
        const projectEl = document.getElementById('footerProjectCount');
        if (projectEl && Array.isArray(window.projects)) {
            const count = window.projects.filter(p => !p.deleted).length;
            projectEl.textContent = count;
            projectEl.classList.add('text-cyan-400');
        }
    });

    document.addEventListener('userAuthChanged', function() {
        setTimeout(updateFooterStats, 1000);
    });

    _initHeaderAvatarClick();
    console.log('Footer v2.2 initialized');
}

    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            btn.classList.toggle('visible', window.pageYOffset > 400);
        });
    }

    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubscription();
        });
    }

    function initFooterLinks() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;
        footer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.getElementById(href.substring(1));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        });
    }

    // ============ TRANSLATION UPDATE ============

    function updateFooterTranslations() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;
        const lang = typeof window.t === 'function' ? window.t : (k) => k;

        footer.querySelectorAll('[data-footer-translate]').forEach(function(el) {
            const key        = el.getAttribute('data-footer-translate');
            const translated = lang(key);
            if (translated && translated !== key) el.textContent = translated;
        });

        footer.querySelectorAll('[data-footer-placeholder]').forEach(function(el) {
            const key        = el.getAttribute('data-footer-placeholder');
            const translated = lang(key);
            if (translated && translated !== key) el.placeholder = translated;
        });
    }

    document.addEventListener('languageChanged', updateFooterTranslations);
    document.addEventListener('DOMContentLoaded', function() { setTimeout(updateFooterTranslations, 500); });
    window.updateFooterTranslations = updateFooterTranslations;

    // ============ HEADER AVATAR CLICK ============

    function _initHeaderAvatarClick() {
        function openProfile() {
            if (typeof window.openPageModal === 'function') window.openPageModal('account');
        }

        function _attach() {
            const avatar        = document.getElementById('userAvatar');
            const avatarWrapper = document.getElementById('userAvatarWrapper');
            const nameEl        = document.getElementById('userName');
            const nameWrapper   = document.getElementById('userNameWrapper');

            if (avatar)        { avatar.style.cursor        = 'pointer'; avatar.onclick        = openProfile; }
            if (avatarWrapper) { avatarWrapper.style.cursor = 'pointer'; avatarWrapper.onclick = openProfile; }
            if (nameEl)        { nameEl.style.cursor        = 'pointer'; nameEl.onclick        = openProfile; }
            if (nameWrapper)   { nameWrapper.style.cursor   = 'pointer'; nameWrapper.onclick   = openProfile; }

            return !!(avatar || avatarWrapper || nameEl || nameWrapper);
        }

        if (!_attach()) {
            let tries    = 0;
            const interval = setInterval(function() {
                tries++;
                if (_attach() || tries >= 20) clearInterval(interval);
            }, 300);
        }

        document.addEventListener('userAuthChanged', function() { setTimeout(_attach, 500); });
    }

    window.openMyAccountModal = function() {
        if (typeof window.openPageModal === 'function') window.openPageModal('account');
    };

    // ============ INIT ============

    DOMReady(function() { setTimeout(initFooter, 100); });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initFooter, 100);
    }

})();
