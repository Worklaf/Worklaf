import { state } from '../core/state.js';
import { togglePlay, seekTo } from '../core/audio.js';

export function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    switch (e.key) {
      case ' ': // Space - Play/Pause
        e.preventDefault();
        togglePlay();
        break;
        
      case 'Delete':
      case 'Backspace':
        if (state.selectedLayer) {
          e.preventDefault();
          deleteSelectedLayer();
        }
        break;
        
      case 'ArrowLeft':
        if (e.shiftKey) {
          seekTo(state.currentTime - 0.1); // Frame backward
        } else {
          seekTo(state.currentTime - 1); // 1 sec backward
        }
        break;
        
      case 'ArrowRight':
        if (e.shiftKey) {
          seekTo(state.currentTime + 0.1); // Frame forward
        } else {
          seekTo(state.currentTime + 1); // 1 sec forward
        }
        break;
        
      case 'Home':
        seekTo(0);
        break;
        
      case 'End':
        seekTo(state.duration);
        break;
        
      case 'Escape':
        state.selectedLayer = null;
        break;
        
      // Arrow keys to move layer
      case 'w':
      case 'W':
        if (state.selectedLayer) {
          state.selectedLayer.y -= e.shiftKey ? 1 : 10;
        }
        break;
      case 's':
      case 'S':
        if (state.selectedLayer) {
          state.selectedLayer.y += e.shiftKey ? 1 : 10;
        }
        break;
      case 'a':
      case 'A':
        if (state.selectedLayer) {
          state.selectedLayer.x -= e.shiftKey ? 1 : 10;
        }
        break;
      case 'd':
      case 'D':
        if (state.selectedLayer) {
          state.selectedLayer.x += e.shiftKey ? 1 : 10;
        }
        break;
    }
  });
  
  console.log('⌨️ Keyboard shortcuts enabled');
}

function deleteSelectedLayer() {
  if (!state.selectedLayer) return;
  
  const index = state.layers.indexOf(state.selectedLayer);
  if (index > -1) {
    state.layers.splice(index, 1);
    state.selectedLayer = null;
  }
}

export default { initKeyboardShortcuts };
