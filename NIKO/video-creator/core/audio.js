import state from './state.js';

export function initAudio(file) {
  return new Promise((resolve, reject) => {
    if (!state.audioContext) {
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (state.source) {
      state.source.disconnect();
    }
    
    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.src = '';
    }
    
    state.audioElement = new Audio();
    state.audioElement.src = URL.createObjectURL(file);
    
    state.audioElement.onloadedmetadata = () => {
      state.analyser = state.audioContext.createAnalyser();
      state.analyser.fftSize = 512;
      state.analyser.smoothingTimeConstant = parseFloat(state.audioSmooth);
      
      const bufferLength = state.analyser.frequencyBinCount;
      state.dataArray = new Uint8Array(bufferLength);
      
      state.source = state.audioContext.createMediaElementSource(state.audioElement);
      state.source.connect(state.analyser);
      state.analyser.connect(state.audioContext.destination);
      
      resolve();
    };
    
    state.audioElement.onerror = reject;
  });
}

export function togglePlay() {
  if (!state.audioElement) return;
  
  if (state.isPlaying) {
    state.audioElement.pause();
    state.isPlaying = false;
  } else {
    state.audioElement.play();
    state.isPlaying = true;
    
    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }
  }
  
  return state.isPlaying;
}

export function updateSmoothing(value) {
  if (state.analyser) {
    state.analyser.smoothingTimeConstant = parseFloat(value);
  }
}

export default { initAudio, togglePlay, updateSmoothing };
