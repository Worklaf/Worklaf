import { state } from './state.js';
import { renderVisualizer } from '../visualizers/index.js';
import { renderEffect } from '../effects/index.js';
import { renderLayers } from '../layers/layers.js';

let animationId = null;

export function startRender() {
  if (animationId) return;
  
  function render() {
    // Получаем audio data
    if (state.analyser) {
      state.analyser.getByteFrequencyData(state.dataArray);
    }
    
    const ctx = state.ctx;
    const canvas = state.canvas;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Background
    renderBackground(ctx);
    
    // 2. Visualizer
    if (state.dataArray && state.visualizerType !== 'none') {
      renderVisualizer(state.visualizerType, ctx, state.dataArray, state);
    }
    
    // 3. Layers
    renderLayers(ctx, state.currentTime);
    
    // 4. Particles
    if (state.particleType !== 'none') {
      renderEffect(state.particleType, ctx, state.particles, state.dataArray);
    }
    
    animationId = requestAnimationFrame(render);
  }
  
  render();
}

export function stopRender() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function renderBackground(ctx) {
  const canvas = ctx.canvas;
  
  // Цвет фона
  ctx.fillStyle = state.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Фоновое изображение
  if (state.bgImage) {
    ctx.save();
    
    // Применяем фильтры
    ctx.filter = `blur(${state.bgBlur}px) brightness(${state.bgBright}%)`;
    ctx.globalAlpha = state.bgImageOpacity;
    
    // Масштабирование и центрирование
    const scale = state.bgZoom;
    const imgWidth = state.bgImage.width;
    const imgHeight = state.bgImage.height;
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = imgWidth / imgHeight;
    
    let drawWidth, drawHeight;
    if (imgAspect > canvasAspect) {
      drawHeight = canvas.height * scale;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = canvas.width * scale;
      drawHeight = drawWidth / imgAspect;
    }
    
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;
    
    ctx.drawImage(state.bgImage, x, y, drawWidth, drawHeight);
    
    ctx.restore();
  }
}

export default { startRender, stopRender };
