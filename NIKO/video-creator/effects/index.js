import snow from './snow.js';
import stars from './stars.js';

export const effects = {
  snow,
  stars
};

export function renderEffect(type, ctx, particles, dataArray) {
  const effect = effects[type];
  if (effect && type !== 'none') {
    effect(ctx, particles, dataArray);
  }
}

export function initParticles(type, amount, width, height) {
  const particles = [];
  
  if (type === 'snow') {
    for (let i = 0; i < amount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  } else if (type === 'stars') {
    for (let i = 0; i < amount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.05 + 0.01
      });
    }
  }
  
  return particles;
}

export default { effects, renderEffect, initParticles };
