// Основная конфигурация
const config = {
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    audio: new Audio(),
    audioCtx: null,
    analyser: null,
    source: null,
    dataArray: null,
    currentViz: 'deepSpace',
    isPlaying: false,
    autoCam: false
};

// Элементы UI
const ui = {
    playBtn: document.getElementById('playBtn'),
    timeline: document.getElementById('timeline'),
    currentTime: document.getElementById('currentTime'),
    duration: document.getElementById('duration'),
    fileInput: document.getElementById('audioFile'),
    vizSelect: document.getElementById('vizSelect'),
    fullScreen: document.getElementById('fullscreenBtn'),
    autoCam: document.getElementById('autoCamBtn')
};

// Инициализация Canvas
function resizeCanvas() {
    config.canvas.width = window.innerWidth;
    config.canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Настройка аудио (AudioContext разрешен только после жеста пользователя)
function initAudioContext() {
    if (!config.audioCtx) {
        config.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        config.analyser = config.audioCtx.createAnalyser();
        config.analyser.fftSize = 256; // 128 полос частот
        config.source = config.audioCtx.createMediaElementSource(config.audio);
        config.source.connect(config.analyser);
        config.analyser.connect(config.audioCtx.destination);
        config.dataArray = new Uint8Array(config.analyser.frequencyBinCount);
    }
    if (config.audioCtx.state === 'suspended') {
        config.audioCtx.resume();
    }
}

// Загрузка файла
ui.fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        config.audio.src = url;
        config.audio.load();
        ui.playBtn.textContent = "▶ Play";
        initAudioContext();
    }
});

// Управление воспроизведением
ui.playBtn.addEventListener('click', () => {
    if (!config.audio.src) return alert("Выберите файл!");
    initAudioContext();

    if (config.audio.paused) {
        config.audio.play();
        config.isPlaying = true;
        ui.playBtn.textContent = "⏸ Pause";
        ui.playBtn.classList.add('active');
        render(); // Запуск цикла
    } else {
        config.audio.pause();
        config.isPlaying = false;
        ui.playBtn.textContent = "▶ Play";
        ui.playBtn.classList.remove('active');
    }
});

// --- ЛОГИКА ТАЙМЛАЙНА ---

// Обновление длительности при загрузке метаданных
config.audio.addEventListener('loadedmetadata', () => {
    ui.timeline.max = config.audio.duration;
    ui.duration.textContent = formatTime(config.audio.duration);
});

// Обновление ползунка во время проигрывания
config.audio.addEventListener('timeupdate', () => {
    if (!ui.timeline.classList.contains('seeking')) { // Не обновлять, если пользователь тянет ползунок
        ui.timeline.value = config.audio.currentTime;
        ui.currentTime.textContent = formatTime(config.audio.currentTime);
    }
});

// Перемотка (Scrubbing)
ui.timeline.addEventListener('input', () => {
    ui.timeline.classList.add('seeking'); // Флаг, что мы тянем
    ui.currentTime.textContent = formatTime(ui.timeline.value);
});

ui.timeline.addEventListener('change', () => {
    config.audio.currentTime = ui.timeline.value;
    ui.timeline.classList.remove('seeking');
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Выбор визуализатора
ui.vizSelect.addEventListener('change', (e) => {
    config.currentViz = e.target.value;
    // Очистка при смене (если есть специфичные данные)
    if(Visualizers.stars) Visualizers.stars = null; 
});

// Auto Camera (медленное вращение)
let globalRotation = 0;
ui.autoCam.addEventListener('click', () => {
    config.autoCam = !config.autoCam;
    ui.autoCam.classList.toggle('active');
});

// Fullscreen
ui.fullScreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// --- ЦИКЛ ОТРИСОВКИ ---
function render() {
    if (!config.isPlaying) return;

    requestAnimationFrame(render);

    const ctx = config.ctx;
    const w = config.canvas.width;
    const h = config.canvas.height;
    
    // Получение данных частот
    config.analyser.getByteFrequencyData(config.dataArray);

    // Очистка с эффектом следа (motion blur)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const time = performance.now() * 0.001;

    // Глобальное вращение камеры (если включено)
    ctx.save();
    if (config.autoCam) {
        globalRotation += 0.002;
        // Простой трюк: сдвигаем и вращаем весь контекст 2D
        // Для настоящего 3D вращения нужно менять координаты в visualizers.js,
        // но для эффекта достаточно легкого покачивания
        ctx.translate(cx, cy);
        ctx.rotate(Math.sin(time * 0.5) * 0.05); 
        ctx.translate(-cx, -cy);
    }

    // Вызов выбранного визуализатора
    if (Visualizers[config.currentViz]) {
        ctx.save();
        // Включаем режим наложения для красивых цветов
        ctx.globalCompositeOperation = 'screen'; 
        Visualizers[config.currentViz](ctx, cx, cy, config.dataArray, time);
        ctx.restore();
    }

    ctx.restore();
}
