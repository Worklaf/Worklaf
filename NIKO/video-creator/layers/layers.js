import state from '../core/state.js';

export function addTextLayer() {
  const text = prompt('Введите текст:', 'Sample Text');
  if (!text) return;
  
  const layer = {
    id: ++state.layerIdCounter,
    type: 'text',
    content: text,
    x: 0.5,
    y: 0.3,
    fontSize: 60,
    color: '#ffffff',
    fontFamily: 'Arial',
    visible: true,
    locked: false
  };
  
  state.layers.push(layer);
  updateLayersList();
  return layer;
}

export function addImageLayer(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const layer = {
        id: ++state.layerIdCounter,
        type: 'image',
        content: img,
        x: 0.5,
        y: 0.5,
        scale: 0.3,
        visible: true,
        locked: false
      };
      
      state.layers.push(layer);
      updateLayersList();
      resolve(layer);
    };
    img.src = URL.createObjectURL(file);
  });
}

export function addEmojiLayer() {
  const emoji = prompt('Введите эмодзи:', '😎');
  if (!emoji) return;
  
  const layer = {
    id: ++state.layerIdCounter,
    type: 'emoji',
    content: emoji,
    x: 0.5,
    y: 0.7,
    fontSize: 80,
    visible: true,
    locked: false
  };
  
  state.layers.push(layer);
  updateLayersList();
  return layer;
}

export function removeLayer(id) {
  state.layers = state.layers.filter(l => l.id !== id);
  if (state.selectedLayer?.id === id) {
    state.selectedLayer = null;
  }
  updateLayersList();
}

export function toggleLayerVisibility(id) {
  const layer = state.layers.find(l => l.id === id);
  if (layer) {
    layer.visible = !layer.visible;
    updateLayersList();
  }
}

export function selectLayer(id) {
  state.selectedLayer = state.layers.find(l => l.id === id);
  updateLayersList();
}

export function renderLayers(ctx) {
  state.layers.forEach(layer => {
    if (!layer.visible) return;
    
    const x = layer.x * state.width;
    const y = layer.y * state.height;
    
    ctx.save();
    
    if (layer.type === 'text') {
      ctx.font = `${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = layer.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.fillText(layer.content, x, y);
    } else if (layer.type === 'image') {
      const img = layer.content;
      const scale = layer.scale;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
    } else if (layer.type === 'emoji') {
      ctx.font = `${layer.fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(layer.content, x, y);
    }
    
    ctx.restore();
  });
}

function updateLayersList() {
  const list = document.getElementById('layersList');
  if (!list) return;
  
  list.innerHTML = '';
  
  state.layers.forEach((layer, index) => {
    const div = document.createElement('div');
    div.className = 'layer-item';
    if (state.selectedLayer?.id === layer.id) {
      div.classList.add('selected');
    }
    
    const icon = layer.type === 'text' ? '📝' : 
                 layer.type === 'image' ? '🖼️' : '😀';
    
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${icon} ${layer.content.toString().substring(0, 15)}</span>
        <div>
          <button onclick="window.toggleLayerVis(${layer.id})" style="width: auto; padding: 5px 10px; margin: 0 2px;">
            ${layer.visible ? '👁️' : '🚫'}
          </button>
          <button onclick="window.removeLayer(${layer.id})" style="width: auto; padding: 5px 10px; margin: 0 2px; background: #ff4444;">
            🗑️
          </button>
        </div>
      </div>
    `;
    
    div.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        selectLayer(layer.id);
      }
    });
    
    list.appendChild(div);
  });
}

// Expose to window for inline onclick handlers
if (typeof window !== 'undefined') {
  window.toggleLayerVis = toggleLayerVisibility;
  window.removeLayer = removeLayer;
}

export default {
  addTextLayer,
  addImageLayer,
  addEmojiLayer,
  removeLayer,
  toggleLayerVisibility,
  selectLayer,
  renderLayers
};
