import { state } from './core/state.js';
import { initCanvas, render } from './core/canvas.js';
import { loadAudio, togglePlay, seekTo } from './core/audio.js';
import { initAnalyzer } from './core/analyzer.js';
import { initTimeline, updateTimelinePlayhead } from './core/timeline.js';
import { addTextLayer, addImageLayer, initCanvasInteraction } from './layers/layers.js';
import { initParticles } from './effects/particles.js';
import { startRecording, stopRecording, exportFrame } from './utils/recorder.js';
import { loadFonts } from './utils/fonts.js';
import { CYBERPUNK_PRESETS, applyPreset } from './utils/presets.js';
import { initKeyboardShortcuts } from './utils/keyboard.js';
import { exportProject, importProject } from './utils/export.js';

// 🎨 INIT APPLICATION
async function init() {
  console.log('%c🎬 NIKO CYBERPUNK VIDEO EDITOR 🎬', 'color: #00ffff; font-size: 24px; font-weight: bold;');
  console.log('%cInitializing...', 'color: #ff00ff; font-size: 16px;');
  
  // Load fonts
  loadFonts();
  
  // Init canvas
  initCanvas();
  
  // Init modules
  initTimeline();
  initParticles();
  initCanvasInteraction();
  initKeyboardShortcuts();
  
  // Init UI controls
  initControls();
  initPresets();
  initExportButtons();
  
  // Start render loop
  requestAnimationFrame(renderLoop);
  
  console.log('%c✅ READY! Upload audio to begin', 'color: #00ff00; font-size: 18px; font-weight: bold;');
  
  // Show welcome message
  showWelcomeMessage();
}

// 🔄 RENDER LOOP
function renderLoop() {
  render();
  requestAnimationFrame(renderLoop);
}

// 🎛️ INIT CONTROLS
function initControls() {
  // Audio upload
  document.getElementById('audioUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const success = await loadAudio(file);
    if (success) {
      await initAnalyzer();
      updateUI();
    }
  });
  
  // Background image upload
  document.getElementById('bgUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        state.bgImage = img;
        console.log('✅ Background image loaded');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
  
  // Play/Pause button
  document.getElementById('playBtn').addEventListener('click', () => {
    togglePlay();
    updatePlayButton();
  });
  
  // Background controls
  document.getElementById('bgColor').addEventListener('input', (e) => {
    state.bgColor = e.target.value;
  });
  
  document.getElementById('bgBlur').addEventListener('input', (e) => {
    state.bgBlur = parseInt(e.target.value);
    document.getElementById('bgBlurValue').textContent = e.target.value;
  });
  
  document.getElementById('bgBright').addEventListener('input', (e) => {
    state.bgBright = parseInt(e.target.value);
    document.getElementById('bgBrightValue').textContent = e.target.value;
  });
  
  document.getElementById('bgZoom').addEventListener('input', (e) => {
    state.bgZoom = parseFloat(e.target.value);
    document.getElementById('bgZoomValue').textContent = e.target.value;
  });
  
  // Visualizer controls
  document.getElementById('vizType').addEventListener('change', (e) => {
    state.visualizerType = e.target.value;
  });
  
  document.getElementById('vizColor').addEventListener('input', (e) => {
    state.vizColor = e.target.value;
  });
  
  document.getElementById('vizGlow').addEventListener('input', (e) => {
    state.vizGlow = parseInt(e.target.value);
    document.getElementById('vizGlowValue').textContent = e.target.value;
  });
  
  document.getElementById('vizScale').addEventListener('input', (e) => {
    state.vizScale = parseFloat(e.target.value);
    document.getElementById('vizScaleValue').textContent = e.target.value;
  });
  
  document.getElementById('vizY').addEventListener('input', (e) => {
    state.vizY = parseInt(e.target.value);
    document.getElementById('vizYValue').textContent = e.target.value;
  });
  
  // Particle controls
  document.getElementById('particleType').addEventListener('change', (e) => {
    state.particleType = e.target.value;
  });
  
  document.getElementById('particleAmount').addEventListener('input', (e) => {
    state.particleAmount = parseInt(e.target.value);
    document.getElementById('particleAmountValue').textContent = e.target.value;
  });
  
  // Layer buttons
  document.getElementById('addTextBtn').addEventListener('click', () => {
    addTextLayer();
  });
  
  document.getElementById('addImageBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) addImageLayer(file);
    };
    input.click();
  });
  
  // Recording buttons
  document.getElementById('recordBtn').addEventListener('click', () => {
    if (state.isRecording) {
      stopRecording();
      document.getElementById('recordBtn').textContent = '⏺️ Record';
      document.getElementById('recordBtn').classList.remove('recording');
    } else {
      const success = startRecording();
      if (success) {
        document.getElementById('recordBtn').textContent = '⏹️ Stop';
        document.getElementById('recordBtn').classList.add('recording');
      }
    }
  });
  
  document.getElementById('exportFrameBtn').addEventListener('click', () => {
    exportFrame();
  });
  
  // Resolution selector
  document.getElementById('resolution').addEventListener('change', (e) => {
    const [width, height] = e.target.value.split('x').map(Number);
    state.width = width;
    state.height = height;
    state.canvas.width = width;
    state.canvas.height = height;
    console.log(`📐 Resolution changed to ${width}x${height}`);
  });
  
  // FPS selector
  document.getElementById('fps').addEventListener('change', (e) => {
    state.fps = parseInt(e.target.value);
    console.log(`🎬 FPS changed to ${state.fps}`);
  });
  
  // Timeline seek
  document.getElementById('timelineSeek').addEventListener('input', (e) => {
    const time = (parseFloat(e.target.value) / 100) * state.duration;
    seekTo(time);
  });
}

// 🎨 INIT PRESETS
function initPresets() {
  const container = document.getElementById('presets');
  container.innerHTML = '';
  
  Object.entries(CYBERPUNK_PRESETS).forEach(([key, preset]) => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    btn.textContent = preset.name;
    btn.addEventListener('click', () => {
      applyPreset(key, state);
      updateUI();
      console.log('✨ Preset applied:', preset.name);
    });
    container.appendChild(btn);
  });
}

// 💾 INIT EXPORT BUTTONS
function initExportButtons() {
  document.getElementById('exportProject').addEventListener('click', () => {
    exportProject();
  });
  
  document.getElementById('importProject').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) importProject(file);
    };
    input.click();
  });
}

// 🔄 UPDATE UI
function updateUI() {
  document.getElementById('bgColor').value = state.bgColor;
  document.getElementById('bgBlur').value = state.bgBlur;
  document.getElementById('bgBlurValue').textContent = state.bgBlur;
  document.getElementById('bgBright').value = state.bgBright;
  document.getElementById('bgBrightValue').textContent = state.bgBright;
  document.getElementById('bgZoom').value = state.bgZoom;
  document.getElementById('bgZoomValue').textContent = state.bgZoom;
  
  document.getElementById('vizType').value = state.visualizerType;
  document.getElementById('vizColor').value = state.vizColor;
  document.getElementById('vizGlow').value = state.vizGlow;
  document.getElementById('vizGlowValue').textContent = state.vizGlow;
  document.getElementById('vizScale').value = state.vizScale;
  document.getElementById('vizScaleValue').textContent = state.vizScale;
  document.getElementById('vizY').value = state.vizY;
  document.getElementById('vizYValue').textContent = state.vizY;
  
  document.getElementById('particleType').value = state.particleType;
  document.getElementById('particleAmount').value = state.particleAmount;
  document.getElementById('particleAmountValue').textContent = state.particleAmount;
}

// ▶️ UPDATE PLAY BUTTON
function updatePlayButton() {
  const btn = document.getElementById('playBtn');
  btn.textContent = state.isPlaying ? '⏸️' : '▶️';
}

// 📢 WELCOME MESSAGE
function showWelcomeMessage() {
  const welcome = document.createElement('div');
  welcome.className = 'welcome-overlay';
  welcome.innerHTML = `
    <div class="welcome-content">
      <h1>🎬 NIKO CYBERPUNK VIDEO EDITOR 🎬</h1>
      <p>🎵 Upload audio to start creating</p>
      <p>⌨️ Keyboard shortcuts:</p>
      <ul>
        <li><strong>SPACE</strong> - Play/Pause</li>
        <li><strong>←/→</strong> - Seek 1 sec</li>
        <li><strong>SHIFT + ←/→</strong> - Seek 1 frame</li>
        <li><strong>W/A/S/D</strong> - Move selected layer</li>
        <li><strong>DELETE</strong> - Delete layer</li>
        <li><strong>ESC</strong> - Deselect</li>
      </ul>
      <button onclick="this.parentElement.parentElement.remove()">🚀 LET'S GO!</button>
    </div>
  `;
  document.body.appendChild(welcome);
}

// 🎬 START APPLICATION
window.addEventListener('DOMContentLoaded', init);

// Export for console access
window.nikoEditor = {
  state,
  togglePlay,
  seekTo,
  addTextLayer,
  addImageLayer,
  startRecording,
  stopRecording,
  exportFrame,
  exportProject
};

console.log('%c💡 Access editor from console: window.nikoEditor', 'color: #ffff00;');
