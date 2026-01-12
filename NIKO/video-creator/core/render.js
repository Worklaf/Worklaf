import state from './state.js';
import { renderVisualizer } from '../visualizers/index.js';
import { renderEffect, initParticles } from '../effects/index.js';
import { renderLayers } from '../layers/layers.js';

let animationId = null;

export function startRenderLoop() {
  if (animationId) return;
  
  const targetFPS = state.fps;
  const frameTime = 1000 / targetFPS;
  let lastFrameTime = performance.now();
  
  function render(currentTime) {
    animationId = requestAnimationFrame(render);
    
    const elapsed = currentTime - lastFrameTime;
    if (elapsed < frameTime) return;
    
    lastFrameTime = currentTime - (elapsed % frameTime);
    
    renderFrame();
  }
  
  animationId = requestAnimationFrame(render);
}

export function stopRenderLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function renderFrame() {
  if (!state.ctx || !state.analyser) return;
  
  const ctx = state.ctx;
  const canvas = state.canvas;
  
  // Get audio data
  state.analyser.getByteFrequencyData(state.dataArray);
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Background
  renderBackground(ctx);
  
  // Particles
  if (state.partType !== 'none') {
    renderEffect(state.partType, ctx, state.particles, state.dataArray);
  }
  
  // Visualizer
  const centerX = canvas.width * 0.5;
  const centerY = canvas.height * state.vizY;
  
  ctx.save();
  ctx.scale(state.vizScale, state.vizScale);
  const scaledCenterX = centerX / state.vizScale;
  const scaledCenterY = centerY / state.vizScale;
  
  renderVisualizer(state.visualizerType, ctx, scaledCenterX, scaledCenterY, state.dataArray, state.rotation);
  ctx.restore();
  
  // Emblem
  if (state.emblemImage) {
    renderEmblem(ctx);
  }
  
  // Layers
  renderLayers(ctx);
  
  // Update rotation
  state.rotation += 0.01;
}

function renderBackground(ctx) {
  const canvas = ctx.canvas;
  
  // Solid color or reactive color
  if (state.bgReact > 0) {
    const avgValue = state.dataArray.reduce((a, b) => a + b, 0) / state.dataArray.length;
    const brightness = 1 + (avgValue / 255) * (state.bgReact / 100);
    
    ctx.fillStyle = adjustBrightness(state.bgColor, brightness);
  } else {
    ctx.fillStyle = state.bgColor;
  }
  
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Brightness overlay
  if (state.bgBright !== 100) {
    const alpha = (state.bgBright - 100) / 100;
    ctx.fillStyle = alpha > 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${-alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Blur effect (simulated with gradient)
  if (state.bgBlur > 0) {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(1, `rgba(0, 0, 0, ${state.bgBlur / 100})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function renderEmblem(ctx) {
  const img = state.emblemImage;
  const x = state.emblemX * state.width;
  const y = state.emblemY * state.height;
  const size = state.emblemSize * Math.min(state.width, state.height);
  
  ctx.save();
  
  if (state.emblemCircle) {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.clip();
  }
  
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  ctx.restore();
}

function adjustBrightness(color, factor) {
  const hex = color.replace('#', '');
  const r = Math.min(255, Math.floor(parseInt(hex.substr(0, 2), 16) * factor));
  const g = Math.min(255, Math.floor(parseInt(hex.substr(2, 2), 16) * factor));
  const b = Math.min(255, Math.floor(parseInt(hex.substr(4, 2), 16) * factor));
  return `rgb(${r}, ${g}, ${b})`;
}

export default { startRenderLoop, stopRenderLoop };
