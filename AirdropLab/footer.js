/**
 * ============================================
 * AirdropLab Footer Module v2.5
 * Исправлены: аккаунт, поддержка, юридическая информация
 * ============================================
 */

(function() {
    'use strict';

    const FOOTER_CONFIG = {
        company: {
            name: 'AirdropLab',
            version: 'v2.5',
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
                answer: 'Зарегистрируйтесь на AirdropLab, выберите интересующий проект из списка и следуйте инструкциям в гайде. Выполняйте все задания проекта и следите за обновлениями статуса. После завершения тестнета проекта, токены могут быть распределены среди участников.'
            },
            {
                question: 'Что такое тестнет и зачем в нем участвовать?',
                answer: 'Тестнет - это тестовая сеть блокчейна до его запуска в основной сети (mainnet). Участие в тестнетах позволяет: получить токены проекта бесплатно, изучить функционал доступа к сети, стать ранним пользователем и получить бонусы при запуске основной сети.'
            },
            {
                question: 'Как не попасть на скам-проект?',
                answer: 'Мы проверяем все проекты перед добавлением, но всегда проводите собственное исследование (DYOR). Никогда не вводите приватные ключи или сид-фразы. Не отправляйте ETH или другие токены на неизвестные адреса. Проверяйте аудиты безопасности проекта.'
            },
            {
                question: 'Почему проект не отображается в списке?',
                answer: 'Проект может быть в архиве (завершен), находиться на модерации или быть удален. Также убедитесь, что вы используете правильные фильтры в боковой панели. Проверьте раздел "Все проекты" для просмотра полного списка.'
            },
            {
                question: 'Как получить помощь по проекту?',
                answer: 'Используйте раздел "Поддержка" в футере или оставьте отзыв на странице конкретного проекта. Наша команда отвечает в течение 24 часов. Также вы можете написать в наш Telegram чат для быстрой помощи от сообщества.'
            },
            {
                question: 'Можно ли добавить свой проект?',
                answer: 'Да! Вы можете предложить проект через форму обратной связи в разделе Поддержка или написав в наш Telegram. Мы рассматриваем все предложения. Для рассмотрения проекта нам нужна информация: название, описание, ссылка на официальный сайт и социальные сети.'
            }
        ],
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
        ],
        legal: {
            terms: {
                title: 'Условия использования',
                lastUpdated: '08 марта 2026',
                content: `
                    <h3>1. Общие положения</h3>
                    <p>Настоящие Условия использования (далее - "Условия") регулируют отношения между вами (далее - "Пользователь") и AirdropLab (далее - "Сервис") при использовании веб-сайта airdroplab.com и всех связанных сервисов.</p>
                    <p>Используя Сервис, вы подтверждаете, что прочитали, поняли и согласны с настоящими Условиями. Если вы не согласны с какими-либо положениями Условий, пожалуйста, не используйте Сервис.</p>
                    
                    <h3>2. Описание сервиса</h3>
                    <p>AirdropLab предоставляет информационные услуги по мониторингу, отслеживанию и исследованию криптовалютных проектов, аирдропов и тестнетов. Сервис не является финансовым советником и не предоставляет инвестиционных рекомендаций.</p>
                    <p>Мы предоставляем:</p>
                    <ul>
                        <li>Базу данных криптовалютных проектов и аирдропов</li>
                        <li>Пошаговые инструкции (гайды) по участию в тестнетах</li>
                        <li>Инструменты для отслеживания прогресса участия</li>
                        <li>Уведомления о новых проектах и активностях</li>
                    </ul>
                    
                    <h3>3. Права и обязанности сторон</h3>
                    <p><strong>Права Пользователя:</strong></p>
                    <ul>
                        <li>Получать доступ к информации о проектах</li>
                        <li>Использовать гайды для участия в тестнетах</li>
                        <li>Сохранять свой прогресс и избранные проекты</li>
                        <li>Обращаться в службу поддержки</li>
                    </ul>
                    <p><strong>Обязанности Пользователя:</strong></p>
                    <ul>
                        <li>Не использовать Сервис для незаконных целей</li>
                        <li>Не пытаться взломать или нарушить работу Сервиса</li>
                        <li>Не распространять вредоносное ПО через Сервис</li>
                        <li>Нести ответственность за сохранность своих данных</li>
                    </ul>
                    
                    <h3>4. Ограничение ответственности</h3>
                    <p>Сервис предоставляется "как есть" (AS IS). Мы не гарантируем:</p>
                    <ul>
                        <li>Бесперебойную работу Сервиса</li>
                        <li>Точность и полноту информации о проектах</li>
                        <li>Получение токенов от проектов</li>
                        <li>Прибыль или доход от использования информации</li>
                    </ul>
                    <p>Мы не несем ответственности за любые финансовые потери, возникшие в результате использования информации с Сервиса.</p>
                    
                    <h3>5. Изменение условий</h3>
                    <p>Мы оставляем за собой право изменять настоящие Условия в любое время. Изменения вступают в силу с момента их публикации на Сервере. Продолжая использовать Сервис после изменений, вы соглашаетесь с новыми условиями.</p>
                    
                    <h3>6. Контакты</h3>
                    <p>По всем вопросам, связанным с настоящими Условиями, обращайтесь: support@airdroplab.com</p>
                `
            },
            privacy: {
                title: 'Политика конфиденциальности',
                lastUpdated: '08 марта 2026',
                content: `
                    <h3>1. Введение</h3>
                    <p>Политика конфиденциальности объясняет, как мы собираем, используем, храним и защищаем ваши персональные данные. Мы обязуемся защищать вашу приватность и следуем принципам прозрачности в обработке данных.</p>
                    <p>Используя AirdropLab, вы соглашаетесь на сбор и использование данных в соответствии с настоящей политикой.</p>
                    
                    <h3>2. Какие данные мы собираем</h3>
                    <p><strong>Данные, которые вы предоставляете:</strong></p>
                    <ul>
                        <li><strong>Данные аккаунта:</strong> имя, email, фотография профиля - при регистрации через Google или Twitter</li>
                        <li><strong>Профиль:</strong> имя, фамилия, никнейм, Telegram, дата рождения, пол, страна, биография - заполняется добровольно в личном кабинете</li>
                        <li><strong>Обращения:</strong> сообщения в службу поддержки, включая прикрепленные файлы</li>
                    </ul>
                    <p><strong>Автоматически собираемые данные:</strong></p>
                    <ul>
                        <li><strong>Технические данные:</strong> IP-адрес, тип устройства, браузер, операционная система</li>
                        <li><strong>Данные использования:</strong> просмотренные проекты, избранное, выполненные задания</li>
                        <li><strong>Cookies:</strong> для аутентификации и улучшения работы Сервиса</li>
                    </ul>
                    
                    <h3>3. Как мы используем данные</h3>
                    <p>Мы используем собранные данные для:</p>
                    <ul>
                        <li>Предоставления доступа к Сервису и его функциям</li>
                        <li>Хранения и синхронизации вашего прогресса между устройствами</li>
                        <li>Улучшения качества Сервиса и пользовательского опыта</li>
                        <li>Отправки уведомлений о новых проектах (при согласии)</li>
                        <li>Обработки обращений в службу поддержки</li>
                        <li>Анализа статистики использования для развития Сервиса</li>
                    </ul>
                    
                    <h3>4. Хранение и защита данных</h3>
                    <p>Ваши данные хранятся на защищенных серверах Firebase (Google Cloud Platform). Мы применяем следующие меры защиты:</p>
                    <ul>
                        <li>Шифрование данных при передаче (HTTPS/TLS)</li>
                        <li>Защита доступа к базам данных</li>
                        <li>Регулярное резервное копирование</li>
                        <li>Ограниченный доступ сотрудников к данным</li>
                    </ul>
                    
                    <h3>5. Передача данных третьим лицам</h3>
                    <p>Мы НЕ продаем и НЕ передаем ваши персональные данные третьим лицам, за исключением:</p>
                    <ul>
                        <li>Служб Firebase/Google - для хостинга и аутентификации</li>
                        <li>Правоохранительным органам - по запросу в соответствии с законом</li>
                    </ul>
                    
                    <h3>6. Ваши права</h3>
                    <p>Вы имеете право:</p>
                    <ul>
                        <li><strong>Доступ:</strong> запросить копию ваших персональных данных</li>
                        <li><strong>Исправление:</strong> потребовать исправления неточных данных</li>
                        <li><strong>Удаление:</strong> потребовать удаления ваших данных (право на забвение)</li>
                        <li><strong>Экспорт:</strong> получить ваши данные в читаемом формате</li>
                        <li><strong>Отказ:</strong> отказаться от сбора определенных данных</li>
                    </ul>
                    <p>Для реализации прав обращайтесь: support@airdroplab.com</p>
                    
                    <h3>7. Срок хранения</h3>
                    <p>Мы храним ваши данные:</p>
                    <ul>
                        <li>Данные аккаунта - пока вы не удалите аккаунт</li>
                        <li>Данные профиля - пока аккаунт активен</li>
                        <li>Обращения в поддержку - 2 года после закрытия обращения</li>
                        <li>Технические логи - 30 дней</li>
                    </ul>
                    
                    <h3>8. Изменения политики</h3>
                    <p>Мы можем обновлять политику конфиденциальности. Изменения будут опубликованы на этой странице. Мы уведомим вас о существенных изменениях через email или уведомление в Сервисе.</p>
                `
            },
            cookie: {
                title: 'Политика использования Cookies',
                lastUpdated: '08 марта 2026',
                content: `
                    <h3>1. Что такое Cookies</h3>
                    <p>Cookies (куки) - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов. Они содержат информацию о вашем посещении и помогают улучшить работу сайта.</p>
                    <p>Cookies не являются программами и не могут выполнять какие-либо действия на вашем устройстве. Они не содержат вирусов или вредоносного кода.</p>
                    
                    <h3>2. Какие cookies мы используем</h3>
                    <p><strong>Необходимые cookies (обязательные):</strong></p>
                    <ul>
                        <li><strong>auth_token:</strong> для аутентификации и поддержания сессии пользователя. Без него невозможен вход в аккаунт.</li>
                        <li><strong>session_id:</strong> уникальный идентификатор сессии для безопасной работы с Сервисом</li>
                        <li><strong>firebase-token:</strong> токен Firebase для авторизации</li>
                    </ul>
                    <p><strong>Функциональные cookies:</strong></p>
                    <ul>
                        <li><strong>heroCollapsed:</strong> сохранение состояния развернутого/свернутого раздела приветствия</li>
                        <li><strong>itemsPerPage:</strong> количество проектов на странице</li>
                        <li><strong>currentPage:</strong> текущая страница пагинации</li>
                        <li><strong>arc_tracker_v3:</strong> прогресс выполнения заданий (локально)</li>
                    </ul>
                    <p><strong>Аналитические cookies:</strong></p>
                    <ul>
                        <li><strong>_ga:</strong> Google Analytics - для анализа посещаемости и поведения пользователей</li>
                        <li><strong>_gid:</strong> Google Analytics - для различения пользователей</li>
                    </ul>
                    
                    <h3>3. Зачем нам cookies</h3>
                    <p>Cookies необходимы для:</p>
                    <ul>
                        <li>Аутентификации - чтобы вы оставались залогинены</li>
                        <li>Персонализации - запоминание ваших настроек</li>
                        <li>Аналитики - понимание как улучшить Сервис</li>
                        <li>Функциональности - корректной работы всех возможностей</li>
                    </ul>
                    
                    <h3>4. Управление cookies</h3>
                    <p><strong>Как изменить настройки:</strong></p>
                    <ul>
                        <li><strong>Браузер:</strong> большинство браузеров позволяют управлять cookies через настройки. Обычно это: Настройки → Конфиденциальность → Cookies</li>
                        <li><strong>Отключение:</strong> вы можете отключить cookies, но тогда некоторые функции Сервиса могут не работать</li>
                        <li><strong>Удаление:</strong> можно удалить все cookies после посещения сайта</li>
                    </ul>
                    <p><strong>Инструкции для популярных браузеров:</strong></p>
                    <ul>
                        <li>Chrome: Настройки → Конфиденциальность → Настройки контента → Cookies</li>
                        <li>Firefox: Настройки → Приватность → Cookies</li>
                        <li>Safari: Настройки → Конфиденциальность → Cookies и данные сайтов</li>
                        <li>Edge: Настройки → Cookies и разрешения сайтов</li>
                    </ul>
                    
                    <h3>5. Сторонние cookies</h3>
                    <p>Мы используем сторонние сервисы, которые также могут устанавливать cookies:</p>
                    <ul>
                        <li><strong>Google Analytics</strong> - для аналитики. Политика: privacy.google.com</li>
                        <li><strong>Firebase/Google</strong> - для аутентификации и хостинга. Политика: firebase.google.com/support/privacy</li>
                        <li><strong>CryptoRank</strong> - для виджета цен криптовалют. Политика: cryptorank.io/privacy</li>
                    </ul>
                    
                    <h3>6. Согласие</h3>
                    <p>При первом посещении Сервиса вы увидите баннер с информацией о cookies. Продолжая использовать Сервис, вы даете согласие на использование cookies в соответствии с настоящей политикой.</p>
                    <p>Вы можете отозвать согласие в любое время, удалив cookies в настройках браузера.</p>
                    
                    <h3>7. Обновления</h3>
                    <p>Мы можем обновлять список используемых cookies. Изменения будут отражены на этой странице с датой обновления.</p>
                `
            },
            disclaimer: {
                title: 'Отказ от ответственности',
                lastUpdated: '08 марта 2026',
                content: `
                    <h3>1. Информационная цель</h3>
                    <p>AirdropLab предоставляет исключительно информационные услуги. Мы не являемся:</p>
                    <ul>
                        <li>Финансовым советником или консультантом по инвестициям</li>
                        <li>Брокерской или дилерской компанией</li>
                        <li>Кастодианом или хранителем криптовалют</li>
                        <li>Эмитентом каких-либо токенов или криптовалют</li>
                    </ul>
                    <p>Вся информация на Сервисе носит ознакомительный характер и не является финансовым советом.</p>
                    
                    <h3>2. Риски криптовалют</h3>
                    <p>Криптовалюты и блокчейн-проекты сопряжены с высокими рисками:</p>
                    <ul>
                        <li><strong>Волатильность:</strong> цены могут изменяться на десятки процентов за короткое время</li>
                        <li><strong>Потеря средств:</strong> вы можете полностью потерять вложенные средства</li>
                        <li><strong>Мошенничество:</strong> существует множество скам-проектов, маскирующихся под легитимные</li>
                        <li><strong>Технические риски:</strong> взломы, эксплойты, ошибки в коде смарт-контрактов</li>
                        <li><strong>Регуляторные риски:</strong> криптовалюты могут быть запрещены в некоторых странах</li>
                        <li><strong>Ликвидность:</strong> не все токены можно легко продать</li>
                    </ul>
                    
                    <h3>3. Ответственность за проекты</h3>
                    <p>Мы не несем ответственности за:</p>
                    <ul>
                        <li>Надежность и безопасность проектов из нашей базы</li>
                        <li>Распределение токенов участникам</li>
                        <li>Действия или бездействие владельцев проектов</li>
                        <li>Убытки, понесенные в результате участия в проектах</li>
                        <li>Точность информации о проектах (мы не всегда можем проверить информацию)</li>
                    </ul>
                    
                    <h3>4. Информация не является рекомендацией</h3>
                    <p>Информация о проекте на AirdropLab:</p>
                    <ul>
                        <li>НЕ является рекомендацией к инвестированию</li>
                        <li>НЕ гарантирует получение токенов</li>
                        <li>НЕ подтверждает легитимность проекта</li>
                        <li>НЕ является юридическим или финансовым советом</li>
                    </ul>
                    
                    <h3>5. Ваша ответственность</h3>
                    <p>При использовании Сервиса вы подтверждаете, что:</p>
                    <ul>
                        <li>Понимаете риски, связанные с криптовалютами</li>
                        <li>Проводите собственное исследование (DYOR) перед участием в проектах</li>
                        <li>Несете полную ответственность за свои решения</li>
                        <li>Никогда не инвестируете больше, чем готовы потерять</li>
                        <li>Несете ответственность за сохранность своих ключей и сид-фраз</li>
                    </ul>
                    
                    <h3>6. Безопасность</h3>
                    <p>Правила безопасности, которые ВЫ ДОЛЖНЫ соблюдать:</p>
                    <ul>
                        <li>НИКОГДА не сообщайте никому свои приватные ключи</li>
                        <li>НИКОГДА не вводите сид-фразу на незнакомых сайтах</li>
                        <li>НИКОГДА не отправляйте ETH/токены по запросу "для верификации"</li>
                        <li>Всегда проверяйте URL сайта перед подключением кошелька</li>
                        <li>Используйте аппаратные кошельки для хранения крупных сумм</li>
                    </ul>
                    
                    <h3>7. Отсутствие гарантий</h3>
                    <p>Сервис предоставляется "как есть" без каких-либо гарантий:</p>
                    <ul>
                        <li>Мы не гарантируем бесперебойную работу</li>
                        <li>Мы не гарантируем точность информации</li>
                        <li>Мы не гарантируем, что проект не окажется скамом</li>
                        <li>Мы не несем ответственности за убытки</li>
                    </ul>
                    
                    <h3>8. Согласие с рисками</h3>
                    <p>Используя Сервис AirdropLab, вы:</p>
                    <ul>
                        <li>Подтверждаете, что прочитали и поняли настоящий отказ от ответственности</li>
                        <li>Принимаете на себя все риски, связанные с использованием информации с Сервиса</li>
                        <li>Соглашаетесь, что мы не несем ответственности за ваши решения</li>
                        <li>Обязуетесь соблюдать правила безопасности</li>
                    </ul>
                    
                    <h3>9. Контакты</h3>
                    <p>По вопросам отказа от ответственности: support@airdroplab.com</p>
                `
            }
        }
    };

    function DOMReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    function initFooter() {
        if (document.getElementById('site-footer')) return;
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
            <div class="footer-bg-pattern absolute inset-0 opacity-25" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyMiwyMTAsMjM4LDAuMDgpIi8+PC9zdmc+');"></div>
            
            <div class="footer-main max-w-[1600px] mx-auto px-4 py-16 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <!-- Logo -->
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
                        <p class="footer-description text-sm text-slate-400 leading-relaxed max-w-xs mb-6">${FOOTER_CONFIG.company.tagline}. Исследуем, тестируем и помогаем участвовать в самых перспективных аирдропах.</p>
                        <div class="footer-social flex gap-3 mb-6">
                            <a href="${FOOTER_CONFIG.social.twitter}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-cyan-400"><i class="fab fa-twitter text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.telegram}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-blue-400"><i class="fab fa-telegram-plane text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.discord}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-indigo-400"><i class="fab fa-discord text-lg"></i></a>
                            <a href="${FOOTER_CONFIG.social.youtube}" target="_blank" class="social-link group p-2.5 text-slate-400 hover:text-red-400"><i class="fab fa-youtube text-lg"></i></a>
                            <a href="mailto:${FOOTER_CONFIG.social.email}" class="social-link group p-2.5 text-slate-400 hover:text-emerald-400"><i class="fas fa-envelope text-lg"></i></a>
                        </div>
                        <div class="footer-status flex items-center gap-4">
                            <div class="flex items-center gap-1.5"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span></span><span class="text-xs text-emerald-400">Live</span></div>
                            <div class="flex items-center gap-1.5"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span></span><span class="text-xs text-cyan-400">Обновлено</span></div>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4"><i class="fas fa-link text-cyan-400 mr-2"></i>Быстрые ссылки</h4>
                        <nav class="footer-nav space-y-2">
                            <a href="#heroSection" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-home w-4"></i> Главная</a>
                            <a href="#projects" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-layer-group w-4"></i> Проекты</a>
                            <a href="#" onclick="openPageModal('guides'); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-book-open w-4"></i> Гайды</a>
                            <a href="#" onclick="openSupportModal(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-headset w-4"></i> Поддержка</a>
                            <a href="#" onclick="openMySupportTickets(); return false;" class="footer-link text-slate-400 hover:text-white">
    <i class="fas fa-life-ring w-4"></i> Мои обращения
</a>
                            <a href="https://cryptorank.io" target="_blank" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-chart-line w-4"></i> CryptoRank</a>
                        </nav>
                    </div>
                    
                    <!-- User -->
                    <div class="footer-section">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4"><i class="fas fa-user-cog text-emerald-400 mr-2"></i>Личный кабинет</h4>
                        <nav class="footer-nav space-y-2">
                            <a href="account.html" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-user w-4"></i> Мой аккаунт</a>
                            <a href="#" onclick="openNotificationsModal(); return false;" class="footer-link text-slate-400 hover:text-white relative">
                                <i class="fas fa-bell w-4"></i> Уведомления
                                <span id="footerNotificationBadge" class="hidden ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">0</span>
                            </a>
                            <a href="#" onclick="openPageModal('faq'); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-question-circle w-4"></i> FAQ</a>
                            <a href="#" onclick="footerToggleLang(); return false;" class="footer-link text-slate-400 hover:text-white"><i class="fas fa-globe w-4"></i> Язык</a>
                            <div class="pt-3 mt-2 border-t border-slate-800/50">
                                <div class="text-xs text-slate-500"><i class="fas fa-project-diagram text-cyan-400"></i> <span id="footerProjectCount">0</span> проектов</div>
                            </div>
                        </nav>
                    </div>
                    
                    <!-- Legal -->
                    <div class="lg:col-span-2 md:col-span-2">
                        <h4 class="footer-heading text-sm font-bold text-white mb-4"><i class="fas fa-gavel text-purple-400 mr-2"></i>Юридическая информация</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <nav class="space-y-1">
                                    <a href="#" onclick="openLegalModal('terms'); return false;" class="footer-link text-slate-400 hover:text-purple-400 block text-sm py-1"><i class="fas fa-file-contract w-4"></i> Условия использования</a>
                                    <a href="#" onclick="openLegalModal('privacy'); return false;" class="footer-link text-slate-400 hover:text-purple-400 block text-sm py-1"><i class="fas fa-shield-alt w-4"></i> Политика конфиденциальности</a>
                                    <a href="#" onclick="openLegalModal('cookie'); return false;" class="footer-link text-slate-400 hover:text-purple-400 block text-sm py-1"><i class="fas fa-cookie-bite w-4"></i> Политика cookies</a>
                                    <a href="#" onclick="openLegalModal('disclaimer'); return false;" class="footer-link text-slate-400 hover:text-purple-400 block text-sm py-1"><i class="fas fa-exclamation-triangle w-4"></i> Отказ от ответственности</a>
                                </nav>
                            </div>
                            <div>
                                <nav class="space-y-2 text-sm">
                                    <a href="mailto:${FOOTER_CONFIG.social.email}" class="flex items-center gap-2 text-slate-400 hover:text-white"><i class="fas fa-envelope text-cyan-400 w-4"></i>support@airdroplab.com</a>
                                    <div class="flex items-center gap-2 text-slate-400"><i class="fas fa-clock text-blue-400 w-4"></i>24/7</div>
                                </nav>
                            </div>
                        </div>
                        
                        <!-- Newsletter -->
                        <div class="footer-newsletter bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                            <div class="flex items-start gap-3 mb-3">
                                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center"><i class="fas fa-newspaper text-cyan-400"></i></div>
                                <div>
                                    <h5 class="text-sm font-semibold text-white">Подписаться на обновления</h5>
                                    <p class="text-xs text-slate-500">Получайте уведомления о новых аирдропах</p>
                                </div>
                            </div>
                            <form class="flex gap-2" onsubmit="return footerSubscribeNewsletter(event)">
                                <input type="email" id="footerEmailInput" placeholder="Ваш email" required class="flex-1 bg-slate-800/70 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500">
                                <button type="submit" class="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-bold text-white">Подписаться</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="footer-bottom border-t border-slate-800/50">
                <div class="max-w-[1600px] mx-auto px-4 py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div class="text-sm text-slate-500">© ${new Date().getFullYear()} ${FOOTER_CONFIG.company.name}. Все права защищены.</div>
                        <div class="flex gap-4 text-xs text-slate-500">
                            <span><i class="fas fa-database text-cyan-400"></i> Firebase</span>
                            <span><i class="fab fa-css3-alt text-blue-400"></i> Tailwind</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Back to Top -->
            <button onclick="footerScrollToTop()" id="backToTop" class="back-to-top fixed bottom-6 right-6 hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg text-white z-50">
                <i class="fas fa-chevron-up"></i>
            </button>
            
            <!-- Page Modal -->
            <div id="pageModal" class="modal">
                <div class="modal-content page-modal-content p-0 relative">
                    <button onclick="closePageModal()" class="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-800/80 rounded-full w-8 h-8 flex items-center justify-center"><i class="fas fa-times"></i></button>
                    <div id="pageModalContent"></div>
                </div>
            </div>
            
            <!-- Support Modal -->
            <div id="supportModal" class="modal">
                <div class="modal-content modal-md p-6 relative">
                    <button onclick="closeSupportModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center"><i class="fas fa-headset text-purple-400 text-xl"></i></div>
                        <div>
                            <h2 class="text-xl font-bold text-white">Служба поддержки</h2>
                            <p class="text-sm text-slate-400">Мы ответим в течение 24 часов</p>
                        </div>
                    </div>
                    <form id="supportForm" onsubmit="submitSupportTicket(event)" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Категория *</label>
                            <select id="supportCategory" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
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
                                <input type="text" id="supportName" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                                <input type="email" id="supportEmail" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Заголовок *</label>
                            <input type="text" id="supportSubject" required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Подробное описание *</label>
                            <textarea id="supportMessage" required rows="5" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white resize-none"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-2">Скриншот (необязательно)</label>
                            <div class="flex items-center gap-3">
                                <label for="supportImage" class="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500">
                                    <i class="fas fa-image text-slate-400"></i>
                                    <span class="text-sm text-slate-300">Выбрать файл</span>
                                </label>
                                <input type="file" id="supportImage" accept="image/*" class="hidden" onchange="handleSupportImageSelect(this)">
                                <span id="supportImageName" class="text-xs text-slate-500 hidden"></span>
                            </div>
                            <input type="hidden" id="supportImageData" value="">
                        </div>
                        <button type="submit" id="supportSubmitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-lg text-sm font-bold text-white">
                            <i class="fas fa-paper-plane mr-2"></i>Отправить обращение
                        </button>
                    </form>
                </div>
            </div>
            
            <!-- Newsletter Success Modal -->
            <div id="newsletterModal" class="modal">
                <div class="modal-content modal-sm p-6 relative">
                    <button onclick="closeNewsletterModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30"><i class="fas fa-check text-2xl text-emerald-400"></i></div>
                        <h3 class="text-lg font-bold text-white mb-2">Подписка оформлена!</h3>
                        <p class="text-slate-400 mb-4 text-sm">Вы будете получать уведомления о новых аирдропах.</p>
                        <button onclick="closeNewsletterModal()" class="bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm w-full">Закрыть</button>
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
        if (page === 'faq') {
            html = `
                <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                    <h2 class="text-2xl font-bold text-white"><i class="fas fa-question-circle text-cyan-400 mr-2"></i>Часто задаваемые вопросы</h2>
                </div>
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <div class="space-y-4">
                        ${FOOTER_CONFIG.faq.map((item, index) => `
                            <div class="border border-slate-700/50 rounded-xl overflow-hidden">
                                <button onclick="toggleFaqItem(${index})" class="w-full text-left p-4 flex items-center justify-between bg-slate-800/30 hover:bg-slate-800/50">
                                    <span class="font-medium text-white">${item.question}</span>
                                    <i class="fas fa-chevron-down text-slate-400" id="faq-icon-${index}"></i>
                                </button>
                                <div class="hidden p-4 pt-0 text-slate-300 text-sm" id="faq-answer-${index}">${item.answer}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (page === 'guides') {
            html = `
                <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                    <h2 class="text-2xl font-bold text-white"><i class="fas fa-book-open text-cyan-400 mr-2"></i>Гайды</h2>
                </div>
                <div class="p-6 max-h-[70vh] overflow-y-auto">
                    <div class="grid gap-4">
                        ${FOOTER_CONFIG.guides.map(guide => `
                            <div class="border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 bg-slate-800/30">
                                <h3 class="font-bold text-white">${guide.title}</h3>
                                <p class="text-sm text-slate-400 mb-2">${guide.description}</p>
                                <a href="${guide.link}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white">
                                    <i class="fas fa-external-link-alt"></i> Перейти к гайду
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        content.innerHTML = html;
        modal.classList.add('active');
    };

    window.toggleFaqItem = function(index) {
        const answer = document.getElementById('faq-answer-' + index);
        const icon = document.getElementById('faq-icon-' + index);
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    };

    window.closePageModal = function() {
        const modal = document.getElementById('pageModal');
        if (modal) modal.classList.remove('active');
    };

    // ============ SUPPORT MODAL ============

    window.openSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) {
            // Предзаполняем данные если авторизованы
            if (typeof currentUser !== 'undefined' && currentUser) {
                const nameInput = document.getElementById('supportName');
                const emailInput = document.getElementById('supportEmail');
                if (nameInput && currentUser.displayName) nameInput.value = currentUser.displayName;
                if (emailInput && currentUser.email) emailInput.value = currentUser.email;
            }
            document.getElementById('supportForm').reset();
            document.getElementById('supportImageData').value = '';
            document.getElementById('supportImageName').textContent = '';
            document.getElementById('supportImageName').classList.add('hidden');
            modal.classList.add('active');
        }
    };

    window.closeSupportModal = function() {
        const modal = document.getElementById('supportModal');
        if (modal) modal.classList.remove('active');
    };

    window.handleSupportImageSelect = function(input) {
        const file = input.files[0];
        if (!file) return;
        
        const nameSpan = document.getElementById('supportImageName');
        nameSpan.textContent = file.name;
        nameSpan.classList.remove('hidden');
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('supportImageData').value = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // В функции submitSupportTicket замени код на:

window.submitSupportTicket = async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('supportSubmitBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Отправка...';
    btn.disabled = true;
    
    const ticketData = {
        type: 'support',  // Тип: support - обращение в поддержку
        category: document.getElementById('supportCategory').value,
        name: document.getElementById('supportName').value,
        email: document.getElementById('supportEmail').value,
        subject: document.getElementById('supportSubject').value,
        message: document.getElementById('supportMessage').value,
        image: document.getElementById('supportImageData').value,
        userId: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.uid : 'guest',
        userEmail: (typeof currentUser !== 'undefined' && currentUser) ? currentUser.email : document.getElementById('supportEmail').value,
        status: 'open',
        read: false,
        userRead: false,
        deleted: false,
        userDeleted: false,
        createdAt: new Date().toISOString(),
        messages: [{
            sender: 'user',
            text: document.getElementById('supportMessage').value,
            timestamp: new Date().toISOString()
        }]
    };
    
    // Пробуем Firebase
    try {
        if (typeof db !== 'undefined') {
            await addDoc(collection(db, "feedbacks"), ticketData);
        }
    } catch(err) {
        console.log('Firebase error, saving locally');
    }
    
    // Всегда сохраняем локально
    const supportTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    supportTickets.push(ticketData);
    localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
    
    footerShowToast('Обращение отправлено!');
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('supportForm').reset();
    closeSupportModal();
};

    // ============ NOTIFICATIONS ============

    window.openNotificationsModal = function() {
        if (typeof showNotifications === 'function') {
            showNotifications();
            return;
        }
        
        const modal = document.getElementById('pageModal');
        const content = document.getElementById('pageModalContent');
        if (!modal || !content) return;
        
        let notificationsList = [];
        if (typeof window.notifications !== 'undefined') {
            notificationsList = window.notifications;
        } else {
            notificationsList = JSON.parse(localStorage.getItem('notifications') || '[]');
        }
        
        const html = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <h2 class="text-2xl font-bold text-white"><i class="fas fa-bell text-yellow-400 mr-2"></i>Уведомления</h2>
                <p class="text-slate-400 mt-2">${notificationsList.length} уведомлений</p>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                ${notificationsList.length > 0 ? notificationsList.map(notif => `
                    <div class="p-4 mb-3 rounded-xl ${notif.read ? 'bg-slate-800/30' : 'bg-slate-800/50 border border-slate-700'}">
                        <p class="text-sm text-white">${notif.message}</p>
                        <p class="text-xs text-slate-500 mt-1">${formatTimeAgo(notif.createdAt)}</p>
                    </div>
                `).join('') : `
                    <div class="text-center py-12 text-slate-500">
                        <i class="fas fa-bell-slash text-4xl mb-3"></i>
                        <p>Нет уведомлений</p>
                    </div>
                `}
            </div>
        `;
        
        content.innerHTML = html;
        modal.classList.add('active');
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
        
        const icons = { terms: 'fa-file-contract text-purple-400', privacy: 'fa-shield-alt text-blue-400', cookie: 'fa-cookie-bite text-orange-400', disclaimer: 'fa-exclamation-triangle text-red-400' };
        
        content.innerHTML = `
            <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center"><i class="fas ${icons[type]} text-xl"></i></div>
                    <div>
                        <h2 class="text-2xl font-bold text-white">${legalData.title}</h2>
                        <p class="text-sm text-slate-400">Обновлено: ${legalData.lastUpdated}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto legal-content">${legalData.content}</div>
            <div class="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <button onclick="closePageModal()" class="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg text-sm font-medium text-white">Закрыть</button>
            </div>
        `;
        
        modal.classList.add('active');
    };

    // ============ STYLES ============

    function addFooterStyles() {
        if (document.getElementById('footer-styles-v5')) return;

        const styles = document.createElement('style');
        styles.id = 'footer-styles-v5';
        styles.textContent = `
            .site-footer { font-family: 'Inter', sans-serif; color: #e2e8f0; }
            .footer-bg-gradient, .footer-bg-pattern { pointer-events: none; }
            .footer-link { display: flex; align-items: center; gap: 8px; padding: 4px 0; transition: all 0.2s; }
            .footer-link:hover { transform: translateX(6px); }
            .page-modal-content { max-width: 750px; width: 95%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; border-radius: 1rem; background: rgba(15, 23, 42, 0.98); border: 1px solid rgba(255,255,255,0.1); }
            .legal-content h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 2rem 0 1rem; }
            .legal-content h3:first-child { margin-top: 0; }
            .legal-content p { color: #cbd5e1; line-height: 1.8; margin-bottom: 1rem; }
            .legal-content ul { margin: 0.5rem 0 1.5rem 1.5rem; }
            .legal-content li { color: #cbd5e1; margin-bottom: 0.5rem; line-height: 1.6; }
            .back-to-top { opacity: 0; visibility: hidden; transition: all 0.3s; }
            .back-to-top.visible { opacity: 1; visibility: visible; }
            .back-to-top:hover { transform: scale(1.1); }
            @media (max-width: 768px) {
                .site-footer .grid { grid-template-columns: 1fr; gap: 2rem; }
                .page-modal-content { width: 98%; max-height: 95vh; }
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
        
        console.log('Footer v2.5 initialized');
    }

    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
    }

    window.footerScrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        const email = emailInput.value.trim();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            footerShowToast('Введите корректный email', 'error');
            return;
        }

        emailInput.value = '';
        emailInput.placeholder = 'Спасибо! ✓';
        
        setTimeout(() => {
            showNewsletterModal();
            emailInput.placeholder = 'Ваш email';
        }, 500);
        
        footerShowToast('Подписка оформлена!');
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

    function updateFooterStats() {
        let projectCount = 0;
        if (typeof window.projects !== 'undefined' && window.projects) {
            projectCount = window.projects.length;
        }

        const projectEl = document.getElementById('footerProjectCount');
        if (projectEl) {
            projectEl.textContent = projectCount;
            if (projectCount > 0) projectEl.classList.add('text-cyan-400');
        }
    }

    window.footerToggleLang = function() {
        if (typeof window.toggleLang === 'function') window.toggleLang();
    };

    function footerShowToast(message, type) {
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
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: white; padding: 14px 20px; border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                transform: translateY(100px); opacity: 0;
                transition: all 0.3s; z-index: 9999;
                display: flex; align-items: center; gap: 10px;
                font-size: 14px;
            `;
            document.body.appendChild(toast);
        }

        const icon = type === 'error' ? '<i class="fas fa-exclamation-circle text-red-400"></i>' : '<i class="fas fa-check-circle text-emerald-400"></i>';
        toast.innerHTML = icon + message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
        }, 3000);
    }

    // Initialize
    DOMReady(function() { setTimeout(initFooter, 100); });
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initFooter, 100);
    }

})();
window.openMySupportTickets = function() {
    if (!currentUser) {
        showToast('Войдите для просмотра');
        return;
    }
    
    const modal = document.getElementById('pageModal');
    const content = document.getElementById('pageModalContent');
    
    // Загружаем из Firebase
    let tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    
    // Фильтруем только обращения текущего пользователя
    tickets = tickets.filter(t => t.userId === currentUser.uid);
    
    content.innerHTML = `
        <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
            <h2 class="text-2xl font-bold text-white">
                <i class="fas fa-life-ring text-purple-400 mr-2"></i>Мои обращения в поддержку
            </h2>
        </div>
        <div class="p-6 max-h-[70vh] overflow-y-auto">
            ${tickets.length > 0 ? tickets.map(ticket => `
                <div class="border border-slate-700 rounded-xl p-4 mb-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <div class="font-bold text-white">${ticket.subject}</div>
                            <div class="text-xs text-slate-400">${ticket.category} • ${new Date(ticket.createdAt).toLocaleDateString('ru-RU')}</div>
                        </div>
                        <span class="px-2 py-1 rounded text-xs ${ticket.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}">
                            ${ticket.status === 'open' ? 'Открыт' : 'Закрыт'}
                        </span>
                    </div>
                    <div class="text-sm text-slate-300">${ticket.message}</div>
                </div>
            `).join('') : '<div class="text-center text-slate-500 py-8">Нет обращений</div>'}
        </div>
    `;
    
    modal.classList.add('active');
};
