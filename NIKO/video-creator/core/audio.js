import { state } from './state.js';

export async function initAudio(file) {
  try {
    // Создаем audio element
    state.audio = new Audio();
    state.audio.src = URL.createObjectURL(file);
    
    // Загружаем метаданные
    await new Promise((resolve, reject) => {
      state.audio.addEventListener('loadedmetadata', resolve);
      state.audio.addEventListener('error', reject);
    });
    
    state.duration = state.audio.duration;
    
    // Создаем Audio Context
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 512;
    state.analyser.smoothingTimeConstant = state.audioSmoothing;
    
    state.bufferLength = state.analyser.frequencyBinCount;
    state.dataArray = new Uint8Array(state.bufferLength);
    
    // Подключаем audio к analyser
    state.source = state.audioContext.createMediaElementSource(state.audio);
    state.source.connect(state.analyser);
    state.analyser.connect(state.audioContext.destination);
    
    // Update timeline
    updateTimeline();
    
    // Time update listener
    state.audio.addEventListener('timeupdate', () => {
      state.currentTime = state.audio.currentTime;
      updatePlayhead();
      updateTimeDisplay();
    });
    
    // Ended listener
    state.audio.addEventListener('ended', () => {
      state.isPlaying = false;
      document.getElementById('togglePlay').textContent = '▶ PLAY';
    });
    
    console.log('✅ Audio loaded:', state.duration, 'seconds');
    return true;
  } catch (error) {
    console.error('❌ Audio load error:', error);
    alert('Error loading audio file!');
    return false;
  }
}

export function togglePlay() {
  if (!state.audio) return false;
  
  if (state.isPlaying) {
    state.audio.pause();
    state.isPlaying = false;
  } else {
    state.audio.play();
    state.isPlaying = true;
    
    // Resume audio context if suspended
    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }
  }
  
  return state.isPlaying;
}

export function seekTo(time) {
  if (state.audio) {
    state.audio.currentTime = Math.max(0, Math.min(time, state.duration));
    state.currentTime = state.audio.currentTime;
    updatePlayhead();
    updateTimeDisplay();
  }
}

function updateTimeline() {
  const ruler = document.getElementById('timelineRuler');
  const markers = document.getElementById('rulerMarkers');
  markers.innerHTML = '';
  
  const totalWidth = state.duration * state.timelineScale;
  ruler.style.width = totalWidth + 'px';
  
  // Создаем маркеры времени
  const interval = state.duration > 60 ? 10 : state.duration > 20 ? 5 : 1;
  for (let t = 0; t <= state.duration; t += interval) {
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.left = (t * state.timelineScale) + 'px';
    marker.style.width = '1px';
    marker.style.height = '100%';
    marker.style.background = 'rgba(0, 255, 255, 0.3)';
    marker.style.pointerEvents = 'none';
    
    const label = document.createElement('span');
    label.textContent = formatTime(t);
    label.style.position = 'absolute';
    label.style.top = '5px';
    label.style.left = '5px';
    label.style.fontSize = '10px';
    label.style.color = '#00ffff';
    marker.appendChild(label);
    
    markers.appendChild(marker);
  }
}

function updatePlayhead() {
  const playhead = document.getElementById('playhead');
  const position = state.currentTime * state.timelineScale;
  playhead.style.left = position + 'px';
}

function updateTimeDisplay() {
  document.getElementById('currentTime').textContent = formatTime(state.currentTime);
  document.getElementById('totalTime').textContent = formatTime(state.duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
}

export default { initAudio, togglePlay, seekTo };
