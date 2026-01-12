import { state } from '../core/state.js';
import { addLayerToTimeline, updateTimelineClip } from '../core/timeline.js';

export function addTextLayer() {
  const layer = {
    id: state.layerIdCounter++,
    type: 'text',
    name: 'Text ' + state.layerIdCounter,
    text: 'YOUR TEXT',
    x: state.width / 2,
    y: state.height / 2,
    width: 400,
    height: 100,
    fontSize: 48,
    fontFamily: 'Orbitron',
    color: '#00ffff',
    align: 'center',
    baseline: 'middle',
    shadowBlur: 20,
    shadowColor: '#00ffff',
    strokeWidth: 0,
    strokeColor: '#ff00ff',
    opacity: 1,
    rotation: 0,
    startTime: state.currentTime,
    endTime: state.currentTime + 5,
    visible: true,
    locked: false,
    animation: 'none',
    animationDuration: 1,
    animationEasing: 'easeInOut'
  };
  
  state.layers.push(layer);
  state.selectedLayer = layer;
  addLayerToTimeline(layer);
  updateLayersList();
  updatePropertiesPanel(layer);
  
  return layer;
}

export function addImageLayer(imageFile) {
  const img = new Image();
  img.src = URL.createObjectURL(imageFile);
  
  img.onload = () => {
    const maxWidth = state.width * 0.5;
    const maxHeight = state.height * 0.5;
    const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
    
    const layer = {
      id: state.layerIdCounter++,
      type: 'image',
      name: 'Image ' + state.layerIdCounter,
      image: img,
      x: state.width / 2,
      y: state.height / 2,
      width: img.width * scale,
      height: img.height * scale,
      opacity: 1,
      rotation: 0,
      startTime: state.currentTime,
      endTime: state.currentTime + 5,
      visible: true,
      locked: false,
      animation: 'none',
      animationDuration: 1,
      animationEasing: 'easeInOut',
      filters: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotate: 0
      }
    };
    
    state.layers.push(layer);
    state.selectedLayer = layer;
    addLayerToTimeline(layer);
    updateLayersList();
    updatePropertiesPanel(layer);
  };
}

export function renderLayers(ctx, currentTime) {
  state.layers.forEach(layer => {
    // Проверка видимости по времени
    if (currentTime < layer.startTime || currentTime > layer.endTime) return;
    if (!layer.visible) return;
    
    ctx.save();
    
    // Animation progress
    const animProgress = getAnimationProgress(layer, currentTime);
    
    // Apply animation transforms
    applyAnimation(ctx, layer, animProgress);
    
    // Render layer content
    if (layer.type === 'text') {
      renderTextLayer(ctx, layer);
    } else if (layer.type === 'image') {
      renderImageLayer(ctx, layer);
    }
    
    // Outline if selected
    if (layer === state.selectedLayer && !state.isPlaying) {
      renderSelection(ctx, layer);
    }
    
    ctx.restore();
  });
}

function renderTextLayer(ctx, layer) {
  ctx.globalAlpha = layer.opacity;
  ctx.translate(layer.x, layer.y);
  ctx.rotate(layer.rotation * Math.PI / 180);
  
  // Shadow
  ctx.shadowBlur = layer.shadowBlur;
  ctx.shadowColor = layer.shadowColor;
  
  // Text style
  ctx.font = `${layer.fontSize}px ${layer.fontFamily}`;
  ctx.textAlign = layer.align;
  ctx.textBaseline = layer.baseline;
  
  // Stroke
  if (layer.strokeWidth > 0) {
    ctx.strokeStyle = layer.strokeColor;
    ctx.lineWidth = layer.strokeWidth;
    ctx.strokeText(layer.text, 0, 0);
  }
  
  // Fill
  ctx.fillStyle = layer.color;
  ctx.fillText(layer.text, 0, 0);
}

function renderImageLayer(ctx, layer) {
  ctx.globalAlpha = layer.opacity;
  ctx.translate(layer.x, layer.y);
  ctx.rotate(layer.rotation * Math.PI / 180);
  
  // Filters
  const f = layer.filters;
  ctx.filter = `blur(${f.blur}px) brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) hue-rotate(${f.hueRotate}deg)`;
  
  ctx.drawImage(
    layer.image,
    -layer.width / 2,
    -layer.height / 2,
    layer.width,
    layer.height
  );
  
  ctx.filter = 'none';
}

function renderSelection(ctx, layer) {
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(
    -layer.width / 2,
    -layer.height / 2,
    layer.width,
    layer.height
  );
  ctx.setLineDash([]);
  
  // Resize handles
  const handles = [
    { x: -layer.width / 2, y: -layer.height / 2 }, // TL
    { x: layer.width / 2, y: -layer.height / 2 },  // TR
    { x: layer.width / 2, y: layer.height / 2 },   // BR
    { x: -layer.width / 2, y: layer.height / 2 }   // BL
  ];
  
  handles.forEach(h => {
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(h.x - 5, h.y - 5, 10, 10);
  });
  
  // Rotation handle
  ctx.beginPath();
  ctx.arc(0, -layer.height / 2 - 30, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#00ffff';
  ctx.beginPath();
  ctx.moveTo(0, -layer.height / 2);
  ctx.lineTo(0, -layer.height / 2 - 25);
  ctx.stroke();
}

function getAnimationProgress(layer, currentTime) {
  const elapsed = currentTime - layer.startTime;
  const duration = layer.animationDuration;
  const progress = Math.min(1, elapsed / duration);
  
  return easeProgress(progress, layer.animationEasing);
}

function easeProgress(t, easing) {
  switch (easing) {
    case 'linear':
      return t;
    case 'easeIn':
      return t * t;
    case 'easeOut':
      return 1 - Math.pow(1 - t, 2);
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    default:
      return t;
  }
}

function applyAnimation(ctx, layer, progress) {
  ctx.translate(layer.x, layer.y);
  ctx.rotate(layer.rotation * Math.PI / 180);
  ctx.translate(-layer.x, -layer.y);
  
  switch (layer.animation) {
    case 'fadeIn':
      ctx.globalAlpha *= progress;
      break;
    case 'fadeOut':
      ctx.globalAlpha *= (1 - progress);
      break;
    case 'slideFromLeft':
      ctx.translate(-(1 - progress) * state.width, 0);
      break;
    case 'slideFromRight':
      ctx.translate((1 - progress) * state.width, 0);
      break;
    case 'slideFromTop':
      ctx.translate(0, -(1 - progress) * state.height);
      break;
    case 'slideFromBottom':
      ctx.translate(0, (1 - progress) * state.height);
      break;
    case 'scaleIn':
      const scale = progress;
      ctx.translate(layer.x, layer.y);
      ctx.scale(scale, scale);
      ctx.translate(-layer.x, -layer.y);
      break;
    case 'rotateIn':
      ctx.translate(layer.x, layer.y);
      ctx.rotate((1 - progress) * Math.PI * 2);
      ctx.translate(-layer.x, -layer.y);
      break;
  }
}

export function initCanvasInteraction() {
  const canvas = state.canvas;
  
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
}

function handleMouseDown(e) {
  if (state.isPlaying) return;
  
  const rect = state.canvas.getBoundingClientRect();
  const scaleX = state.width / rect.width;
  const scaleY = state.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  
  // Check resize handles first
  if (state.selectedLayer && !state.selectedLayer.locked) {
    const handle = getResizeHandle(x, y, state.selectedLayer);
    if (handle) {
      state.isResizing = true;
      state.resizeHandle = handle;
      state.dragStartX = x;
      state.dragStartY = y;
      state.initialBounds = {
        x: state.selectedLayer.x,
        y: state.selectedLayer.y,
        width: state.selectedLayer.width,
        height: state.selectedLayer.height,
        rotation: state.selectedLayer.rotation
      };
      return;
    }
  }
  
  // Check layer selection
  for (let i = state.layers.length - 1; i >= 0; i--) {
    const layer = state.layers[i];
    if (isPointInLayer(x, y, layer)) {
      state.selectedLayer = layer;
      updateLayersList();
      updatePropertiesPanel(layer);
      
      if (!layer.locked) {
        state.isDragging = true;
        state.dragStartX = x;
        state.dragStartY = y;
      }
      return;
    }
  }
  
  // Deselect
  state.selectedLayer = null;
  updateLayersList();
}

function handleMouseMove(e) {
  if (state.isPlaying) return;
  
  const rect = state.canvas.getBoundingClientRect();
  const scaleX = state.width / rect.width;
  const scaleY = state.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  
  if (state.isDragging && state.selectedLayer) {
    const dx = x - state.dragStartX;
    const dy = y - state.dragStartY;
    
    state.selectedLayer.x += dx;
    state.selectedLayer.y += dy;
    
    state.dragStartX = x;
    state.dragStartY = y;
    
    updatePropertiesPanel(state.selectedLayer);
  }
  
  if (state.isResizing && state.selectedLayer) {
    const layer = state.selectedLayer;
    const dx = x - state.dragStartX;
    const dy = y - state.dragStartY;
    
    switch (state.resizeHandle) {
      case 'tl': // Top-left
        layer.width = state.initialBounds.width - dx;
        layer.height = state.initialBounds.height - dy;
        layer.x = state.initialBounds.x + dx / 2;
        layer.y = state.initialBounds.y + dy / 2;
        break;
      case 'tr': // Top-right
        layer.width = state.initialBounds.width + dx;
        layer.height = state.initialBounds.height - dy;
        layer.x = state.initialBounds.x + dx / 2;
        layer.y = state.initialBounds.y + dy / 2;
        break;
      case 'br': // Bottom-right
        layer.width = state.initialBounds.width + dx;
        layer.height = state.initialBounds.height + dy;
        layer.x = state.initialBounds.x + dx / 2;
        layer.y = state.initialBounds.y + dy / 2;
        break;
      case 'bl': // Bottom-left
        layer.width = state.initialBounds.width - dx;
        layer.height = state.initialBounds.height + dy;
        layer.x = state.initialBounds.x + dx / 2;
        layer.y = state.initialBounds.y + dy / 2;
        break;
      case 'rotate':
        const angle = Math.atan2(y - layer.y, x - layer.x) * 180 / Math.PI;
        layer.rotation = angle + 90;
        break;
    }
    
    // Clamp sizes
    layer.width = Math.max(20, layer.width);
    layer.height = Math.max(20, layer.height);
    
    updatePropertiesPanel(layer);
  }
}

function handleMouseUp(e) {
  state.isDragging = false;
  state.isResizing = false;
  state.resizeHandle = null;
  state.initialBounds = null;
}

function isPointInLayer(x, y, layer) {
  // Transform point to layer space
  const cos = Math.cos(-layer.rotation * Math.PI / 180);
  const sin = Math.sin(-layer.rotation * Math.PI / 180);
  
  const dx = x - layer.x;
  const dy = y - layer.y;
  
  const localX = dx * cos - dy * sin;
  const localY = dx * sin + dy * cos;
  
  return Math.abs(localX) <= layer.width / 2 && 
         Math.abs(localY) <= layer.height / 2;
}

function getResizeHandle(x, y, layer) {
  const handleSize = 15;
  const cos = Math.cos(-layer.rotation * Math.PI / 180);
  const sin = Math.sin(-layer.rotation * Math.PI / 180);
  
  const handles = {
    tl: { x: -layer.width / 2, y: -layer.height / 2 },
    tr: { x: layer.width / 2, y: -layer.height / 2 },
    br: { x: layer.width / 2, y: layer.height / 2 },
    bl: { x: -layer.width / 2, y: layer.height / 2 },
    rotate: { x: 0, y: -layer.height / 2 - 30 }
  };
  
  for (const [name, handle] of Object.entries(handles)) {
    const hx = layer.x + handle.x * cos - handle.y * sin;
    const hy = layer.y + handle.x * sin + handle.y * cos;
    
    if (Math.abs(x - hx) <= handleSize && Math.abs(y - hy) <= handleSize) {
      return name;
    }
  }
  
  return null;
}

function updateLayersList() {
  const list = document.getElementById('layersList');
  list.innerHTML = '';
  
  [...state.layers].reverse().forEach(layer => {
    const item = document.createElement('div');
    item.className = 'layer-item' + (layer === state.selectedLayer ? ' selected' : '');
    item.dataset.layerId = layer.id;
    
    item.innerHTML = `
      <span class="layer-icon">${layer.type === 'text' ? '📝' : '🖼️'}</span>
      <span class="layer-name">${layer.name}</span>
      <button class="layer-visibility" data-visible="${layer.visible}">
        ${layer.visible ? '👁️' : '🚫'}
      </button>
      <button class="layer-lock" data-locked="${layer.locked}">
        ${layer.locked ? '🔒' : '🔓'}
      </button>
      <button class="layer-delete">🗑️</button>
    `;
    
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('layer-delete')) {
        deleteLayer(layer);
      } else if (e.target.classList.contains('layer-visibility')) {
        layer.visible = !layer.visible;
        updateLayersList();
      } else if (e.target.classList.contains('layer-lock')) {
        layer.locked = !layer.locked;
        updateLayersList();
      } else {
        state.selectedLayer = layer;
        updateLayersList();
        updatePropertiesPanel(layer);
      }
    });
    
    list.appendChild(item);
  });
}

function deleteLayer(layer) {
  const index = state.layers.indexOf(layer);
  if (index > -1) {
    state.layers.splice(index, 1);
    if (state.selectedLayer === layer) {
      state.selectedLayer = null;
    }
    updateLayersList();
    
    // Remove from timeline
    const track = document.querySelector(`[data-layer-id="${layer.id}"]`);
    if (track) track.remove();
  }
}

function updatePropertiesPanel(layer) {
  if (!layer) {
    document.getElementById('propertiesPanel').innerHTML = '<p>No layer selected</p>';
    return;
  }
  
  let html = `<h3>${layer.name}</h3>`;
  
  if (layer.type === 'text') {
    html += `
      <div class="property-group">
        <label>Text:</label>
        <input type="text" id="layerText" value="${layer.text}">
      </div>
      <div class="property-group">
        <label>Font Size:</label>
        <input type="number" id="layerFontSize" value="${layer.fontSize}" min="8" max="200">
      </div>
      <div class="property-group">
        <label>Color:</label>
        <input type="color" id="layerColor" value="${layer.color}">
      </div>
      <div class="property-group">
        <label>Shadow Blur:</label>
        <input type="range" id="layerShadowBlur" value="${layer.shadowBlur}" min="0" max="50">
      </div>
    `;
  }
  
  html += `
    <div class="property-group">
      <label>X:</label>
      <input type="number" id="layerX" value="${Math.round(layer.x)}">
    </div>
    <div class="property-group">
      <label>Y:</label>
      <input type="number" id="layerY" value="${Math.round(layer.y)}">
    </div>
    <div class="property-group">
      <label>Opacity:</label>
      <input type="range" id="layerOpacity" value="${layer.opacity}" min="0" max="1" step="0.01">
    </div>
    <div class="property-group">
      <label>Rotation:</label>
      <input type="number" id="layerRotation" value="${Math.round(layer.rotation)}" min="-360" max="360">
    </div>
    <div class="property-group">
      <label>Animation:</label>
      <select id="layerAnimation">
        <option value="none">None</option>
        <option value="fadeIn">Fade In</option>
        <option value="fadeOut">Fade Out</option>
        <option value="slideFromLeft">Slide from Left</option>
        <option value="slideFromRight">Slide from Right</option>
        <option value="slideFromTop">Slide from Top</option>
        <option value="slideFromBottom">Slide from Bottom</option>
        <option value="scaleIn">Scale In</option>
        <option value="rotateIn">Rotate In</option>
      </select>
    </div>
  `;
  
  document.getElementById('propertiesPanel').innerHTML = html;
  
  // Set selected animation
  const animSelect = document.getElementById('layerAnimation');
  if (animSelect) animSelect.value = layer.animation;
  
  // Add event listeners
  bindPropertyControls(layer);
}

function bindPropertyControls(layer) {
  const controls = {
    layerText: (v) => layer.text = v,
    layerFontSize: (v) => layer.fontSize = parseFloat(v),
    layerColor: (v) => layer.color = v,
    layerShadowBlur: (v) => layer.shadowBlur = parseFloat(v),
    layerX: (v) => layer.x = parseFloat(v),
    layerY: (v) => layer.y = parseFloat(v),
    layerOpacity: (v) => layer.opacity = parseFloat(v),
    layerRotation: (v) => layer.rotation = parseFloat(v),
    layerAnimation: (v) => layer.animation = v
  };
  
  Object.entries(controls).forEach(([id, handler]) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => handler(e.target.value));
    }
  });
}

export default { 
  addTextLayer, 
  addImageLayer, 
  renderLayers, 
  initCanvasInteraction 
};
