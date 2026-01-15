
import { visualizers2D, visualizers3D, vizList2D, vizList3D } from './visualizers.js';
import { EffectsEngine } from './effects.js';

// ============== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==============
let audioContext, analyser, audioSource, dataArray, bufferLength;
let canvas, ctx;
let animationId;
let currentTime = 0;
let isPlaying = false;
let audioElement = null;
let effectsEngine;

// Состояние приложения
const state = {
  // Визуализация
  currentViz: 'circular',
  vizMode: '2D',
  bgColor: '#000000',
  primaryColor: '#00ffff',
  secondaryColor: '#ff00ff',
  vizScale: 1,
  vizSpeed: 1,
  vizGlow: 10,
  
  // Эффекты
  particleType: 'none',
  particleAmount: 50,
  flickerEffect: false,
  vignetteEffect: false,
  
  // 3D параметры
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  depth3D: 500,
  perspective: 800,
  autoRotate: true,
  
  // Аудио
  smoothing: 0.8,
  fftSize: 2048,
  volume: 0.7
};

// ========== INITIALIZATION ==========

// Tab switching функция
window.switchTab = function(tabName) {
  console.log('📑 Переключение на вкладку:', tabName);
  
  // Деактивируем все табы
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Активируем выбранный таб
  const button = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
  const content = document.getElementById(tabName);
  
  if (button) button.classList.add('active');
  if (content) content.classList.add('active');
};

// Инициализация
function init() {
  console.log('🎵 Инициализация Audio Visualizer...');
  
  // Canvas setup
  canvas = document.getElementById('visualizer');
  if (!canvas) {
    console.error('❌ Canvas не найден!');
    return;
  }
  
  ctx = canvas.getContext('2d');
  canvas.style.zIndex = '0'; // На задний план
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Audio context (создается при первом взаимодействии)
  setupEventListeners();
  
  // Запуск рендера
  render();
  
  // Активируем первую вкладку
  switchTab('visualizer');
  
  console.log('✅ Инициализация завершена');
}

// Setup Event Listeners
function setupEventListeners() {
  console.log('🎧 Настройка обработчиков событий...');
  
  // File input
  const fileInput = document.getElementById('audioFile');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileSelect);
  }
  
  // Play/Pause button
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', togglePlayPause);
  }
  
  // Progress bar
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.addEventListener('input', (e) => {
      if (audio && audio.duration) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
      }
    });
  }
  
  // Visualizer selection
  document.querySelectorAll('.viz-option').forEach(option => {
    option.addEventListener('click', function() {
      const vizType = this.dataset.viz;
      if (vizType) {
        setVisualizerType(vizType);
      }
    });
  });
  
  // Color controls
  const colorInputs = {
    'color1': (value) => { vizSettings.color1 = value; },
    'color2': (value) => { vizSettings.color2 = value; },
    'bgColor': (value) => { vizSettings.backgroundColor = value; }
  };
  
  Object.keys(colorInputs).forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', (e) => colorInputs[id](e.target.value));
    }
  });
  
  // Range sliders with live updates
  const rangeInputs = {
    'barWidth': (value) => { 
      vizSettings.barWidth = parseFloat(value);
      document.getElementById('barWidthValue').textContent = value;
    },
    'barSpacing': (value) => { 
      vizSettings.barSpacing = parseFloat(value);
      document.getElementById('barSpacingValue').textContent = value;
    },
    'sensitivity': (value) => { 
      vizSettings.sensitivity = parseFloat(value);
      document.getElementById('sensitivityValue').textContent = value;
    },
    'smoothing': (value) => { 
      if (analyser) analyser.smoothingTimeConstant = parseFloat(value);
      document.getElementById('smoothingValue').textContent = value;
    },
    'rotationSpeed': (value) => { 
      vizSettings.rotationSpeed = parseFloat(value);
      document.getElementById('rotationSpeedValue').textContent = value;
    },
    'particleCount': (value) => { 
      vizSettings.particleCount = parseInt(value);
      document.getElementById('particleCountValue').textContent = value;
      initParticles();
    }
  };
  
  Object.keys(rangeInputs).forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', (e) => rangeInputs[id](e.target.value));
    }
  });
  
  // Checkboxes
  const checkboxes = {
    'mirrorEffect': (checked) => { vizSettings.mirrorEffect = checked; },
    'glowEffect': (checked) => { vizSettings.glowEffect = checked; }
  };
  
  Object.keys(checkboxes).forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('change', (e) => checkboxes[id](e.target.checked));
    }
  });
  
  // Background image
  const bgInput = document.getElementById('bgImage');
  if (bgInput) {
    bgInput.addEventListener('change', loadBackgroundImage);
  }
  
  // Preset buttons
  const presets = {
    'preset1': applyPreset1,
    'preset2': applyPreset2,
    'preset3': applyPreset3,
    'preset4': applyPreset4
  };
  
  Object.keys(presets).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', presets[id]);
    }
  });
  
  // Utils buttons
  const utilButtons = {
    'resetBtn': resetSettings,
    'fullscreenBtn': toggleFullscreen,
    'screenshotBtn': takeScreenshot
  };
  
  Object.keys(utilButtons).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', utilButtons[id]);
    }
  });
  
  console.log('✅ Обработчики событий настроены');
}

// Запуск после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============== AUDIO SETUP ==============
function setupAudio(audio) {
  if (audioContext) {
    audioContext.close();
  }
  
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = state.fftSize;
  analyser.smoothingTimeConstant = state.smoothing;
  
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
  audioSource = audioContext.createMediaElementSource(audio);
  const gainNode = audioContext.createGain();
  gainNode.gain.value = state.volume;
  
  audioSource.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);
  
  console.log('🔊 Audio Context создан:', {
    fftSize: analyser.fftSize,
    bufferLength: bufferLength,
    sampleRate: audioContext.sampleRate
  });
}

// ============== FILE UPLOAD ==============
document.getElementById('audioFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  console.log('📁 Загружен файл:', file.name);
  
  // Удаляем предыдущий аудио элемент
  if (audioElement) {
    audioElement.pause();
    audioElement.remove();
  }
  
  // Создаем новый
  audioElement = new Audio();
  audioElement.src = URL.createObjectURL(file);
  audioElement.volume = state.volume;
  audioElement.loop = true;
  
  // Setup audio context
  setupAudio(audioElement);
  
  // Обновляем UI
  document.getElementById('fileName').textContent = file.name;
  document.getElementById('playBtn').disabled = false;
  
  // Автоплей
  audioElement.play().then(() => {
    isPlaying = true;
    updatePlayButton();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }).catch(err => {
    console.error('Ошибка автоплея:', err);
  });
  
  // События
  audioElement.addEventListener('timeupdate', updateProgress);
  audioElement.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
  });
  
  // Обновляем длительность
  audioElement.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audioElement.duration);
    document.getElementById('duration').textContent = duration;
  });
});

// ============== PLAYBACK CONTROLS ==============
document.getElementById('playBtn').addEventListener('click', togglePlayPause);

function togglePlayPause() {
  if (!audioElement) return;
  
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
  } else {
    audioElement.play().then(() => {
      isPlaying = true;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    });
  }
  
  updatePlayButton();
}

function updatePlayButton() {
  const btn = document.getElementById('playBtn');
  btn.textContent = isPlaying ? '⏸️ Пауза' : '▶️ Играть';
}

// Progress bar
document.getElementById('progress').addEventListener('input', function(e) {
  if (!audioElement) return;
  const seekTime = (e.target.value / 100) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

function updateProgress() {
  if (!audioElement) return;
  
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  document.getElementById('progress').value = progress;
  document.getElementById('currentTime').textContent = formatTime(audioElement.currentTime);
}

// Volume
document.getElementById('volume').addEventListener('input', function(e) {
  state.volume = e.target.value / 100;
  if (audioElement) {
    audioElement.volume = state.volume;
  }
  document.getElementById('volumeValue').textContent = e.target.value + '%';
});

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============== VISUALIZER SELECTION ==============
function populateVisualizerLists() {
  const list2D = document.getElementById('viz2DList');
  const list3D = document.getElementById('viz3DList');
  
  vizList2D.forEach(viz => {
    const btn = document.createElement('button');
    btn.className = 'viz-option';
    btn.innerHTML = `<span class="viz-icon">${viz.icon}</span><span>${viz.name}</span>`;
    btn.onclick = () => selectVisualizer(viz.id, '2D');
    list2D.appendChild(btn);
  });
  
  vizList3D.forEach(viz => {
    const btn = document.createElement('button');
    btn.className = 'viz-option';
    btn.innerHTML = `<span class="viz-icon">${viz.icon}</span><span>${viz.name}</span>`;
    btn.onclick = () => selectVisualizer(viz.id, '3D');
    list3D.appendChild(btn);
  });
}

function selectVisualizer(vizId, mode) {
  state.currentViz = vizId;
  state.vizMode = mode;
  
  // Обновляем активную кнопку
  document.querySelectorAll('.viz-option').forEach(btn => btn.classList.remove('active'));
  event.target.closest('.viz-option')?.classList.add('active');
  
  // Показываем/скрываем 3D контролы
  document.getElementById('rotation-controls').style.display = 
    mode === '3D' ? 'block' : 'none';
  
  console.log(`🎨 Визуализация изменена: ${vizId} (${mode})`);
}

// ============== UI CONTROLS ==============
function setupUIEvents() {
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tab = this.dataset.tab;
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });
  
  // Colors
  document.getElementById('bgColor').addEventListener('input', (e) => {
    state.bgColor = e.target.value;
  });
  
  document.getElementById('primaryColor').addEventListener('input', (e) => {
    state.primaryColor = e.target.value;
  });
  
  document.getElementById('secondaryColor').addEventListener('input', (e) => {
    state.secondaryColor = e.target.value;
  });
  
  // Visualization settings
  setupSlider('vizScale', (v) => state.vizScale = v, 0.5, 2, 0.1);
  setupSlider('vizSpeed', (v) => state.vizSpeed = v, 0.1, 3, 0.1);
  setupSlider('vizGlow', (v) => state.vizGlow = v, 0, 50, 1);
  
  // Effects
  document.getElementById('particleType').addEventListener('change', (e) => {
    state.particleType = e.target.value;
  });
  
  setupSlider('particleAmount', (v) => {
    state.particleAmount = v;
    effectsEngine.initParticles(v, canvas.width, canvas.height);
  }, 0, 200, 10);
  
  document.getElementById('flickerEffect').addEventListener('change', (e) => {
    state.flickerEffect = e.target.checked;
  });
  
  document.getElementById('vignetteEffect').addEventListener('change', (e) => {
    state.vignetteEffect = e.target.checked;
  });
  
  // 3D Rotation
  setupSlider('rotationX', (v) => state.rotationX = v, 0, 360, 1);
  setupSlider('rotationY', (v) => state.rotationY = v, 0, 360, 1);
  setupSlider('rotationZ', (v) => state.rotationZ = v, 0, 360, 1);
  setupSlider('depth3D', (v) => state.depth3D = v, 100, 2000, 50);
  setupSlider('perspective', (v) => state.perspective = v, 200, 2000, 50);
  
  document.getElementById('autoRotate').addEventListener('change', (e) => {
    state.autoRotate = e.target.checked;
  });
  
  // Audio settings
  setupSlider('smoothing', (v) => {
    state.smoothing = v;
    if (analyser) analyser.smoothingTimeConstant = v;
  }, 0, 0.99, 0.01);
  
  document.getElementById('fftSize').addEventListener('change', (e) => {
    state.fftSize = parseInt(e.target.value);
    if (audioElement && audioContext) {
      setupAudio(audioElement);
    }
  });
  
  // Preset buttons
  document.getElementById('randomPreset').addEventListener('click', randomizeSettings);
  document.getElementById('savePreset').addEventListener('click', saveSettings);
  document.getElementById('loadPreset').addEventListener('click', loadSettings);
  document.getElementById('resetPreset').addEventListener('click', resetSettings);
  
  // Screenshot
  document.getElementById('screenshot').addEventListener('click', takeScreenshot);
  
  // Fullscreen
  document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
}

function setupSlider(id, callback, min, max, step) {
  const slider = document.getElementById(id);
  const display = document.getElementById(id + 'Value');
  
  slider.min = min;
  slider.max = max;
  slider.step = step;
  
  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    callback(value);
    if (display) {
      display.textContent = value.toFixed(step < 1 ? 2 : 0);
    }
  });
}

// ============== RENDER LOOP ==============
function renderFrame() {
  animationId = requestAnimationFrame(renderFrame);
  
  currentTime += 0.016 * state.vizSpeed;
  
  // Очистка
  ctx.fillStyle = state.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Получаем аудио данные
  if (analyser && isPlaying) {
    analyser.getByteFrequencyData(dataArray);
  } else {
    // Заполняем нулями если нет аудио
    dataArray = new Uint8Array(bufferLength || 1024).fill(0);
  }
  
  // Автоповорот для 3D
  if (state.vizMode === '3D' && state.autoRotate) {
    state.rotationY = (state.rotationY + 0.5) % 360;
    const slider = document.getElementById('rotationY');
    if (slider) {
      slider.value = state.rotationY;
      document.getElementById('rotationYValue').textContent = Math.floor(state.rotationY);
    }
  }
  
  // Рисуем визуализацию
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  const config = {
    primaryColor: state.primaryColor,
    secondaryColor: state.secondaryColor,
    bgColor: state.bgColor
  };
  
  try {
    if (state.vizMode === '2D') {
      const vizFunc = visualizers2D[state.currentViz];
      if (vizFunc) {
        vizFunc(ctx, centerX, centerY, dataArray, state, currentTime, config);
      }
    } else {
      const vizFunc = visualizers3D[state.currentViz];
      if (vizFunc) {
        vizFunc(ctx, centerX, centerY, dataArray, state, currentTime, config);
      }
    }
  } catch (err) {
    console.error('Ошибка рендера визуализации:', err);
  }
  
  // Эффекты
  const bassAvg = dataArray.slice(0, 50).reduce((a, b) => a + b, 0) / 50;
  
  effectsEngine.drawParticles(
    ctx, 
    state.particleType, 
    state.particleAmount, 
    bassAvg, 
    currentTime,
    canvas.width,
    canvas.height,
    state.vizGlow
  );
  
  effectsEngine.drawFlicker(ctx, state.flickerEffect, bassAvg, canvas.width, canvas.height);
  effectsEngine.drawVignette(ctx, state.vignetteEffect, canvas.width, canvas.height);
}

// ============== PRESETS ==============
function randomizeSettings() {
  // Случайная визуализация
  const allViz = [...vizList2D, ...vizList3D];
  const randomViz = allViz[Math.floor(Math.random() * allViz.length)];
  const mode = vizList2D.find(v => v.id === randomViz.id) ? '2D' : '3D';
  selectVisualizer(randomViz.id, mode);
  
  // Случайные цвета
  state.bgColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  state.primaryColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  state.secondaryColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  
  document.getElementById('bgColor').value = state.bgColor;
  document.getElementById('primaryColor').value = state.primaryColor;
  document.getElementById('secondaryColor').value = state.secondaryColor;
  
  // Случайные параметры
  state.vizScale = 0.5 + Math.random() * 1.5;
  state.vizSpeed = 0.5 + Math.random() * 2;
  state.vizGlow = Math.random() * 30;
  
  // Обновляем UI
  updateSlidersFromState();
  
  console.log('🎲 Настройки рандомизированы!');
}

function saveSettings() {
  localStorage.setItem('audioVisualizerSettings', JSON.stringify(state));
  alert('✅ Настройки сохранены!');
  console.log('💾 Настройки сохранены в localStorage');
}

function loadSettings() {
  const saved = localStorage.getItem('audioVisualizerSettings');
  if (saved) {
    const loaded = JSON.parse(saved);
    Object.assign(state, loaded);
    
    // Обновляем UI
    document.getElementById('bgColor').value = state.bgColor;
    document.getElementById('primaryColor').value = state.primaryColor;
    document.getElementById('secondaryColor').value = state.secondaryColor;
    document.getElementById('particleType').value = state.particleType;
    document.getElementById('flickerEffect').checked = state.flickerEffect;
    document.getElementById('vignetteEffect').checked = state.vignetteEffect;
    document.getElementById('autoRotate').checked = state.autoRotate;
    document.getElementById('fftSize').value = state.fftSize;
    
    updateSlidersFromState();
    
    console.log('📂 Настройки загружены из localStorage');
  }
}

function resetSettings() {
  if (confirm('Сбросить все настройки к значениям по умолчанию?')) {
    state.currentViz = 'circular';
    state.vizMode = '2D';
    state.bgColor = '#000000';
    state.primaryColor = '#00ffff';
    state.secondaryColor = '#ff00ff';
    state.vizScale = 1;
    state.vizSpeed = 1;
    state.vizGlow = 10;
    state.particleType = 'none';
    state.particleAmount = 50;
    state.flickerEffect = false;
    state.vignetteEffect = false;
    state.rotationX = 0;
    state.rotationY = 0;
    state.rotationZ = 0;
    state.depth3D = 500;
    state.perspective = 800;
    state.autoRotate = true;
    state.smoothing = 0.8;
    state.fftSize = 2048;
    state.volume = 0.7;
    
    // Обновляем UI
    document.getElementById('bgColor').value = state.bgColor;
    document.getElementById('primaryColor').value = state.primaryColor;
    document.getElementById('secondaryColor').value = state.secondaryColor;
    document.getElementById('particleType').value = state.particleType;
    document.getElementById('flickerEffect').checked = state.flickerEffect;
    document.getElementById('vignetteEffect').checked = state.vignetteEffect;
    document.getElementById('autoRotate').checked = state.autoRotate;
    document.getElementById('fftSize').value = state.fftSize;
    
    updateSlidersFromState();
    
    console.log('🔄 Настройки сброшены');
  }
}

function updateSlidersFromState() {
  const sliders = [
    'vizScale', 'vizSpeed', 'vizGlow', 'particleAmount',
    'rotationX', 'rotationY', 'rotationZ', 'depth3D', 'perspective',
    'smoothing', 'volume'
  ];
  
  sliders.forEach(id => {
    const slider = document.getElementById(id);
    const display = document.getElementById(id + 'Value');
    if (slider && state[id] !== undefined) {
      slider.value = state[id];
      if (display) {
        const decimals = parseFloat(slider.step) < 1 ? 2 : 0;
        display.textContent = state[id].toFixed(decimals);
      }
    }
  });
}

// ============== UTILITIES ==============
function takeScreenshot() {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visualizer_${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('📸 Скриншот сохранен');
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('Ошибка полноэкранного режима:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
    case 'f':
    case 'F':
      toggleFullscreen();
      break;
    case 'r':
    case 'R':
      randomizeSettings();
      break;
    case 's':
    case 'S':
      if (e.ctrlKey) {
        e.preventDefault();
        saveSettings();
      } else {
        takeScreenshot();
      }
      break;
  }
});

console.log(`
╔═══════════════════════════════════════╗
║   🎵 AUDIO VISUALIZER LOADED 🎵      ║
║                                       ║
║   Shortcuts:                          ║
║   SPACE - Play/Pause                  ║
║   F - Fullscreen                      ║
║   R - Random preset                   ║
║   S - Screenshot                      ║
║   Ctrl+S - Save settings              ║
╚═══════════════════════════════════════╝
`);
