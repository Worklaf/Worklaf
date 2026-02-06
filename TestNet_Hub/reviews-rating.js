// reviews-rating.js

// Настройки Firebase (те же, что и в основном файле)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, doc, setDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// Инициализация (проверяем, чтобы не инициализировать дважды)
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.log("Firebase already initialized or error:", e);
}

let currentProjectId = null;
let currentUser = null;

// Слушатель авторизации из родительского окна
window.addEventListener('DOMContentLoaded', () => {
    // Пытаемся получить доступ к переменной currentUser из основного скрипта
    // Если она недоступна (var/let не в глобале), подпишемся на изменения
    // Но так как у нас модули раздельные, нам нужно слушать Firebase Auth напрямую для отзывов,
    // либо надеяться, что родительский скрипт предоставит userId.
    
    // Для простоты реализуем свою минимальную авторизацию или берем из localStorage/User объекта, 
    // если он доступен глобально (что есть в твоем основном файле).
    
    // Проверка авторизации каждые 500мс (костыль для доступа к переменной из другого скрипта)
    setInterval(() => {
        if (window.currentUser) {
            currentUser = window.currentUser;
        }
    }, 1000);
});

// --- Рендеринг UI Отзывов ---
function renderReviewsSection(projectId) {
    currentProjectId = projectId;
    const container = document.getElementById('reviewsSectionContainer');
    if (!container) return;
    
    // Базовый HTML секции
    container.innerHTML = `
        <div class="h-px bg-slate-700/50 my-6"></div>
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <i class="fas fa-comments text-blue-400"></i> Отзывы и оценки
            </h3>
            <div id="ratingSummary" class="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-700">
                <!-- Рейтинг будет здесь -->
            </div>
        </div>

        <!-- Форма отзыва -->
        <div id="reviewForm" class="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-6 transition-all">
            <div class="flex items-center gap-3 mb-3">
                <div class="flex items-center gap-1" id="starInputContainer">
                    ${[1,2,3,4,5].map(n => `
                        <i class="fas fa-star text-slate-600 cursor-pointer hover:text-yellow-400 transition-colors text-xl star-btn" data-val="${n}"></i>
                    `).join('')}
                </div>
                <span class="text-xs text-slate-500 ml-2" id="ratingLabel">Поставьте оценку</span>
            </div>
            <textarea id="reviewText" class="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none resize-none" rows="3" placeholder="Напишите ваш отзыв или совет по прохождению..."></textarea>
            <div class="flex justify-between items-center mt-3">
                <span class="text-xs text-slate-500">Имя будет взято из вашего профиля</span>
                <button onclick="submitReview()" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                    <i class="fas fa-paper-plane"></i> Отправить
                </button>
            </div>
        </div>

        <!-- Список отзывов -->
        <div id="reviewsList" class="space-y-3">
            <div class="text-center py-4 text-slate-500 animate-pulse">Загрузка отзывов...</div>
        </div>
    `;

    // Вешаем события на звезды
    const stars = container.querySelectorAll('.star-btn');
    stars.forEach(star => {
        star.addEventListener('mouseover', (e) => highlightStars(e.target.dataset.val));
        star.addEventListener('mouseout', () => highlightStars(0));
        star.addEventListener('click', (e) => setRating(e.target.dataset.val));
    });

    // Подгружаем данные
    loadReviews(projectId);
    loadRating(projectId);
}

// --- Логика Рейтинга ---
let currentRatingValue = 0;

function highlightStars(val) {
    const stars = document.querySelectorAll('#starInputContainer .star-btn');
    stars.forEach(s => {
        if (parseInt(s.dataset.val) <= val) s.classList.add('text-yellow-400');
        else s.classList.remove('text-yellow-400');
    });
}

function setRating(val) {
    currentRatingValue = parseInt(val);
    document.getElementById('ratingLabel').textContent = `Вы поставили ${val} из 5`;
    highlightStars(val);
}

async function loadRating(projectId) {
    if (!db) return;
    const projRef = doc(db, "projects", projectId);
    
    // Простая заглушка для подсчета, в идеале нужна агрегация на сервере
    // Для демо просто берем поле rating если оно там есть
    onSnapshot(projRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Формат рейтинга: { userId: value }
            const ratings = data.ratings || {};
            const values = Object.values(ratings);
            const count = values.length;
            const avg = count ? (values.reduce((a, b) => a + b, 0) / count).toFixed(1) : "0.0";
            
            const summary = document.getElementById('ratingSummary');
            if(summary) {
                summary.innerHTML = `
                    <span class="text-yellow-400 font-bold text-lg">★ ${avg}</span>
                    <span class="text-slate-500 text-xs">(${count} голосов)</span>
                `;
            }
        }
    });
}

async function submitRating() {
    if (!currentUser) return alert("Войдите, чтобы голосовать");
    if (currentRatingValue === 0) return alert("Выберите оценку");

    try {
        const projRef = doc(db, "projects", currentProjectId);
        // Получаем текущие
        const docSnap = await getDoc(projRef);
        let ratings = {};
        if (docSnap.exists()) ratings = docSnap.data().ratings || {};
        
        // Обновляем
        ratings[currentUser.uid] = currentRatingValue;
        
        await setDoc(projRef, { ratings: ratings }, { merge: true });
        
        showToast("Спасибо за оценку!");
        loadRating(currentProjectId);
    } catch (e) {
        console.error(e);
    }
}

// --- Логика Отзывов ---
async function loadReviews(projectId) {
    if (!db) return;
    const q = query(collection(db, "reviews"), where("projectId", "==", projectId));
    
    onSnapshot(q, (snapshot) => {
        const list = document.getElementById('reviewsList');
        if (!list) return;

        if (snapshot.empty) {
            list.innerHTML = '<div class="text-center py-6 text-slate-500 bg-slate-800/30 rounded-lg border border-slate-700/50"><i class="far fa-comment-dots text-2xl mb-2"></i><br>Пока нет отзывов. Будьте первым!</div>';
            return;
        }

        list.innerHTML = snapshot.docs.map(doc => {
            const d = doc.data();
            const date = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate().toLocaleDateString() : 'Недавно';
            const userName = d.userName || 'Аноним';
            const userInitial = userName.charAt(0).toUpperCase();
            
            return `
                <div class="bg-[#1e2538] p-4 rounded-xl border border-slate-700 relative">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">${userInitial}</div>
                            <div>
                                <div class="text-sm font-bold text-slate-200">${userName}</div>
                                <div class="text-[10px] text-slate-500">${date}</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-sm text-slate-300 pl-10">${d.text}</div>
                    ${d.reply ? `
                        <div class="mt-3 ml-10 p-3 bg-slate-900/80 rounded-lg border-l-2 border-emerald-500">
                            <div class="text-xs text-emerald-400 font-bold mb-1"><i class="fas fa-reply mr-1"></i>Ответ Администратора:</div>
                            <div class="text-xs text-slate-300">${d.reply}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    });
}

window.submitReview = async function() {
    if (!currentUser) return alert("Войдите, чтобы написать отзыв");
    const text = document.getElementById('reviewText').value;
    if (!text) return alert("Введите текст отзыва");
    if (currentRatingValue === 0) {
        if (!confirm("Вы не поставили оценку. Отправить без оценки?")) return;
    }

    try {
        await addDoc(collection(db, "reviews"), {
            projectId: currentProjectId,
            projectName: projects.find(p => p.id === currentProjectId)?.name || 'Unknown', // projects должен быть доступен глобально из основного скрипта
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email.split('@')[0],
            text: text,
            createdAt: serverTimestamp(),
            reply: null
        });
        
        document.getElementById('reviewText').value = '';
        currentRatingValue = 0;
        highlightStars(0);
        document.getElementById('ratingLabel').textContent = "Поставьте оценку";
        showToast("Отзыв отправлен на модерацию!");
    } catch (e) {
        console.error(e);
        alert("Ошибка отправки: " + e.message);
    }
};

// Функция вызываемая извне для инициализации секции
window.initReviews = function(projectId) {
    renderReviewsSection(projectId);
};

// Для обновления состояния кнопок (войден/не войден)
window.updateReviewsAuthState = function(user) {
    currentUser = user;
    const form = document.getElementById('reviewForm');
    if (form) {
        if (user) {
            form.classList.remove('opacity-50', 'pointer-events-none');
        } else {
            // Можно оставить открытым, но при отправке выдаст alert
        }
    }
};

function showToast(msg) {
    // Используем toast из родительского окна или создаем свой
    if (window.showToast) window.showToast(msg);
    else {
        const t = document.createElement('div');
        t.textContent = msg;
        t.className = "fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-[200]";
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
}
