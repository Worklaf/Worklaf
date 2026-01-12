import state from './state.js';

export function initTimeline() {
  state.timelineCanvas = document.getElementById('timeline');
  state.timelineCtx = state.timelineCanvas.getContext('2d');
  
  if (state.audioElement) {
    state.audioElement.addEventListener('timeupdate', drawTimeline);
  }
}

export function drawTimeline() {
  if (!state.timelineCtx || !state.audioElement) return;
  
  const ctx = state.timelineCtx;
  const canvas = state.timelineCanvas;
  const audio = state.audioElement;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Waveform (если есть dataArray)
  if (state.dataArray) {
    ctx.beginPath();
    const sliceWidth = canvas.width / state.dataArray.length;
    let x = 0;
    
    for (let i = 0; i < state.dataArray.length; i++) {
      const v = state.dataArray[i] / 255;
      const y = canvas.height / 2 + (v - 0.5) * canvas.height * 0.8;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.strokeStyle = '#00d1ff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  // Progress bar
  const progress = audio.currentTime / audio.duration;
  const progressX = progress * canvas.width;
  
  ctx.fillStyle = 'rgba(255, 77, 166, 0.3)';
  ctx.fillRect(0, 0, progressX, canvas.height);
  
  // Current time marker
  ctx.strokeStyle = '#ff4da6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(progressX, 0);
  ctx.lineTo(progressX, canvas.height);
  ctx.stroke();
  
  // Time labels
  ctx.fillStyle = '#fff';
  ctx.font = '10px monospace';
  ctx.fillText(formatTime(audio.currentTime), 5, 15);
  ctx.fillText(formatTime(audio.duration), canvas.width - 35, 15);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default { initTimeline, drawTimeline };
