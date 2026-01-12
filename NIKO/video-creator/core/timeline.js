import { state } from './state.js';
import { seekTo } from './audio.js';

export function initTimelineInteraction() {
  const ruler = document.getElementById('timelineRuler');
  const playhead = document.getElementById('playhead');
  
  // Click to seek
  ruler.addEventListener('click', (e) => {
    const rect = ruler.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = x / state.timelineScale;
    seekTo(time);
  });
  
  // Drag playhead
  playhead.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    state.isDraggingPlayhead = true;
    
    const onMove = (e) => {
      if (!state.isDraggingPlayhead) return;
      
      const rect = ruler.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const time = Math.max(0, Math.min(x / state.timelineScale, state.duration));
      seekTo(time);
    };
    
    const onUp = () => {
      state.isDraggingPlayhead = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

export function addLayerToTimeline(layer) {
  const tracks = document.getElementById('timelineTracks');
  
  const track = document.createElement('div');
  track.className = 'timeline-track';
  track.dataset.layerId = layer.id;
  
  const clip = document.createElement('div');
  clip.className = 'timeline-clip';
  clip.style.left = (layer.startTime * state.timelineScale) + 'px';
  clip.style.width = ((layer.endTime - layer.startTime) * state.timelineScale) + 'px';
  clip.style.background = layer.type === 'text' ? 'rgba(255, 0, 255, 0.5)' : 'rgba(0, 255, 255, 0.5)';
  
  const label = document.createElement('div');
  label.className = 'timeline-clip-label';
  label.textContent = layer.name;
  clip.appendChild(label);
  
  // Handles for trimming
  const handleLeft = document.createElement('div');
  handleLeft.className = 'timeline-clip-handle left';
  clip.appendChild(handleLeft);
  
  const handleRight = document.createElement('div');
  handleRight.className = 'timeline-clip-handle right';
  clip.appendChild(handleRight);
  
  // Drag clip
  initClipDrag(clip, layer);
  
  // Trim handles
  initClipTrim(handleLeft, clip, layer, 'start');
  initClipTrim(handleRight, clip, layer, 'end');
  
  track.appendChild(clip);
  tracks.appendChild(track);
}

function initClipDrag(clip, layer) {
  clip.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('timeline-clip-handle')) return;
    
    e.stopPropagation();
    const startX = e.clientX;
    const startLeft = parseFloat(clip.style.left);
    
    const onMove = (e) => {
      const dx = e.clientX - startX;
      const newLeft = Math.max(0, startLeft + dx);
      const newTime = newLeft / state.timelineScale;
      
      if (newTime + (layer.endTime - layer.startTime) <= state.duration) {
        clip.style.left = newLeft + 'px';
        const duration = layer.endTime - layer.startTime;
        layer.startTime = newTime;
        layer.endTime = newTime + duration;
      }
    };
    
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function initClipTrim(handle, clip, layer, side) {
  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startLeft = parseFloat(clip.style.left);
    const startWidth = parseFloat(clip.style.width);
    
    const onMove = (e) => {
      const dx = e.clientX - startX;
      
      if (side === 'start') {
        const newLeft = Math.max(0, startLeft + dx);
        const newWidth = startWidth - dx;
        
        if (newWidth > 10) {
          clip.style.left = newLeft + 'px';
          clip.style.width = newWidth + 'px';
          layer.startTime = newLeft / state.timelineScale;
        }
      } else {
        const newWidth = Math.max(10, startWidth + dx);
        clip.style.width = newWidth + 'px';
        layer.endTime = layer.startTime + (newWidth / state.timelineScale);
      }
    };
    
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

export function updateTimelineClip(layer) {
  const tracks = document.getElementById('timelineTracks');
  const track = tracks.querySelector(`[data-layer-id="${layer.id}"]`);
  if (!track) return;
  
  const clip = track.querySelector('.timeline-clip');
  clip.style.left = (layer.startTime * state.timelineScale) + 'px';
  clip.style.width = ((layer.endTime - layer.startTime) * state.timelineScale) + 'px';
}

export default { initTimelineInteraction, addLayerToTimeline, updateTimelineClip };
