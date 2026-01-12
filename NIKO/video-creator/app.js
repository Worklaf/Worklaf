import state from './core/state.js';
import { initAudio, togglePlay, updateSmoothing } from './core/audio.js';
import { startRenderLoop } from './core/render.js';
import { initTimeline } from './core/timeline.js';
import { initParticles } from './effects/index.js';
import { addTextLayer, addImageLayer, addEmojiLayer } from './layers/layers.js';

// Init canvas
state.canvas = document.getElementById('canvas');
state.ctx = state.canvas.getContext('2d', { willReadFrequently: true });

// Set initial resolution
updateResolution('1920x1080');

// ===== EVENT LISTENERS =====

// Audio file
document.getElementById('audioFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  try {
    await initAudio(file);
    document.getElementById('togglePlay').disabled = false;
    initTimeline();
    alert('✅ Аудио загружено!');
  } catch (error) {
    alert('❌ Ошибка загрузки аудио: ' + error);
  }
});

// Play/Pause
document.getElementById('togglePlay').addEventListener('click', () => {
  const isPlaying = togglePlay();
  document.getElementById('togglePlay').textContent = isPlaying ? '⏸️ Pause' : '▶️ Play';
  
  if (isPlaying && !state.analyser) {
    alert('Сначала загрузите аудио!');
    return;
  }
  
  if (isPlaying) {
    startRenderLoop();
  }
});

// Resolution
document.getElementById('resolution').addEventListener('change', (e) => {
  updateResolution(e.target.value);
});

function updateResolution(value) {
  const [w, h] = value.split('x').map(Number);
  state.width = w;
  state.height = h;
  state.canvas.width = w;
  state.canvas.height = h;
  
  // Reinit particles with new dimensions
  if (state.partType !== 'none') {
    state.particles = initParticles(state.partType, state.partAmount, w, h);
  }
}

// Visualizer type
document.getElementById('visualizerType').addEventListener('change', (e) => {
  state.visualizerType = e.target.value;
});

// Background controls
document.getElementById('bgColor').addEventListener('input', (e) => {
  state.bgColor = e.target.value;
});

document.getElementById('bgBlur').addEventListener('input', (e) => {
  state.bgBlur = parseInt(e.target.value);
  document.getElementById('blurVal').textContent = state.bgBlur;
});

document.getElementById('bgBright').addEventListener('input', (e) => {
  state.bgBright = parseInt(e.target.value);
  document.getElementById('brightVal').textContent = state.bgBright;
});

document.getElementById('bgReact').addEventListener('input', (e) => {
  state.bgReact = parseInt(e.target.value);
  document.getElementById('bgReactVal').textContent = state.bgReact;
});

// Visualizer settings
document.getElementById('vizColor').addEventListener('input', (e) => {
  state.vizColor = e.target.value;
});

document.getElementById('vizGlow').addEventListener('input', (e) => {
  state.vizGlow = parseInt(e.target.value);
  document.getElementById('glowVal').textContent = state.vizGlow;
});

document.getElementById('vizScale').addEventListener('input', (e) => {
  state.vizScale = parseFloat(e.target.value);
  document.getElementById('scaleVal').textContent = state.vizScale.toFixed(1);
});

document.getElementById('vizY').addEventListener('input', (e) => {
  state.vizY = parseFloat(e.target.value);
  document.getElementById('vizYVal').textContent = state.vizY.toFixed(2);
});

document.getElementById('audioSmooth').addEventListener('input', (e) => {
  state.audioSmooth = parseFloat(e.target.value);
  document.getElementById('smoothVal').textContent = state.audioSmooth;
  updateSmoothing(state.audioSmooth);
});

// Particles
document.getElementById('partType').addEventListener('change', (e) => {
  state.partType = e.target.value;
  state.particles = initParticles(state.partType, state.partAmount, state.width, state.height);
});

document.getElementById('partAmount').addEventListener('input', (e) => {
  state.partAmount = parseInt(e.target.value);
  document.getElementById('partAmountVal').textContent = state.partAmount;
  state.particles = initParticles(state.partType, state.partAmount, state.width, state.height);
});

// Emblem
document.getElementById('emblemFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const img = new Image();
  img.onload = () => {
    state.emblemImage = img;
  };
  img.src = URL.createObjectURL(file);
});

document.getElementById('emblemSize').addEventListener('input', (e) => {
  state.emblemSize = parseFloat(e.target.value);
  document.getElementById('emblemSizeVal').textContent = state.emblemSize.toFixed(2);
});

document.getElementById('emblemX').addEventListener('input', (e) => {
  state.emblemX = parseFloat(e.target.value);
  document.getElementById('emblemXVal').textContent = state.emblemX.toFixed(2);
});

document.getElementById('emblemY').addEventListener('input', (e) => {
  state.emblemY = parseFloat(e.target.value);
  document.getElementById('emblemYVal').textContent = state.emblemY.toFixed(2);
});

document.getElementById('emblemCircle').addEventListener('change', (e) => {
  state.emblemCircle = e.target.checked;
});

// FPS
document.getElementById('fps').addEventListener('change', (e) => {
  state.fps = parseInt(e.target.value);
});

// Layers
document.getElementById('addText').addEventListener('click', () => {
  addTextLayer();
});

document.getElementById('addImage').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) addImageLayer(file);
  };
  input.click();
});

document.getElementById('addEmoji').addEventListener('click', () => {
  addEmojiLayer();
});

// Recording
document.getElementById('startRecord').addEventListener('click', startRecording);
document.getElementById('stopRecord').addEventListener('click', stopRecording);

async function startRecording() {
  if (!state.canvas) return;
  
  const stream = state.canvas.captureStream(state.fps);
  
  // Add audio track if available
  if (state.audioElement && state.audioContext) {
    const dest = state.audioContext.createMediaStreamDestination();
    state.source.connect(dest);
    stream.addTrack(dest.stream.getAudioTracks()[0]);
  }
  
  state.mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 8000000
  });
  
  state.recordedChunks = [];
  
  state.mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      state.recordedChunks.push(e.data);
    }
  };
  
  state.mediaRecorder.onstop = () => {
    const blob = new Blob(state.recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video_${Date.now()}.webm`;
    a.click();
    
    document.getElementById('recordStatus').textContent = '✅ Видео сохранено!';
    setTimeout(() => {
      document.getElementById('recordStatus').textContent = '';
    }, 3000);
  };
  
  state.mediaRecorder.start();
  state.isRecording = true;
  
  document.getElementById('startRecord').disabled = true;
  document.getElementById('stopRecord').disabled = false;
  document.getElementById('recordStatus').textContent = '🔴 Идет запись...';
}

function stopRecording() {
  if (state.mediaRecorder && state.isRecording) {
    state.mediaRecorder.stop();
    state.isRecording = false;
    
    document.getElementById('startRecord').disabled = false;
    document.getElementById('stopRecord').disabled = true;
  }
}

// Start render loop on init (even without audio)
startRenderLoop();

console.log('🚀 N1K∅ Creator Pro загружен!');
