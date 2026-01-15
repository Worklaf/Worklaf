// ===== VISUALIZERS.JS =====
// Экспортируем все визуализаторы

// Утилита для конвертации цвета
export function hexToRgba(hex, alpha) {
  if (!hex) return `rgba(255,255,255,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

// Класс для 3D точки с перспективой
class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  project(width, height, depth, perspective) {
    const scale = perspective / (perspective + this.z + depth);
    return {
      x: this.x * scale + width / 2,
      y: this.y * scale + height / 2,
      scale: scale
    };
  }

  rotateX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = this.y * cos - this.z * sin;
    const z = this.y * sin + this.z * cos;
    this.y = y;
    this.z = z;
  }

  rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x * cos + this.z * sin;
    const z = -this.x * sin + this.z * cos;
    this.x = x;
    this.z = z;
  }

  rotateZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x * cos - this.y * sin;
    const y = this.x * sin + this.y * cos;
    this.x = x;
    this.y = y;
  }
}

// ===== 2D КЛАССИЧЕСКИЕ ВИЗУАЛИЗАТОРЫ =====
export const visualizers2D = {
  circular(ctx, centerX, centerY, dataArray, state, rotation, time, config) {
    const radius = Math.min(config.width, config.height) * 0.25 * state.vizScale;
    const bars = 180;
    const barWidth = 3;

    const avgBass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
    const pulseRadius = radius * 0.25 + (avgBass / 255) * 20;

    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();

    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2;
      const freqIndex = Math.floor(i / bars * dataArray.length * 0.8);
      const value = dataArray[freqIndex] || 0;
      const barHeight = (value / 255) * (radius * 0.7);
      const hue = (i / bars) * 360;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = barWidth;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  },

  radial(ctx, centerX, centerY, dataArray, state, rotation) {
    const outerRadius = Math.min(config.width, config.height) * 0.35 * state.vizScale;
    const innerRadius = outerRadius * 0.2;
    const bars = 240;

    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2 + rotation;
      const freqIndex = Math.floor((i / bars) * dataArray.length * 0.8);
      const value = dataArray[freqIndex] || 0;
      const lineLength = innerRadius + (value / 255) * (outerRadius - innerRadius);

      const x1 = centerX + Math.cos(angle) * innerRadius;
      const y1 = centerY + Math.sin(angle) * innerRadius;
      const x2 = centerX + Math.cos(angle) * lineLength;
      const y2 = centerY + Math.sin(angle) * lineLength;

      const hue = (i / bars) * 360;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.shadowBlur = state.vizGlow * 0.3;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  },

  neon(ctx, centerX, centerY, dataArray, state, rotation, time) {
    const radius = Math.min(config.width, config.height) * 0.25 * state.vizScale;
    const segments = 360;
    const bass = dataArray[2] || 0;

    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, '#00E5FF');
    gradient.addColorStop(0.5, '#9D00FF');
    gradient.addColorStop(1, '#FF00E5');

    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 + rotation * 1.5;
      const idx = Math.floor(t * dataArray.length);
      const v = dataArray[idx] || 0;
      const offset = (v / 255) * radius * 0.6;
      const r = radius + offset;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = state.vizGlow + (bass / 255) * 30;
    ctx.shadowColor = '#00E5FF';
    ctx.stroke();

    const innerRadius = radius * 0.4 + (bass / 255) * 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = state.vizGlow;
    ctx.shadowColor = '#9D00FF';
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
  },

  tunnel(ctx, centerX, centerY, dataArray, state, rotation, time, config) {
    const radius = Math.min(config.width, config.height) * 0.3 * state.vizScale;
    const bars = 90;
    const barWidth = 4;

    const palette = (state.tunnelColors && state.tunnelColors.length)
      ? state.tunnelColors
      : ['#00E5FF', '#FF00E5', '#00FFAA'];

    const avgBass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
    const pulseRadius = radius * 0.25 + (avgBass / 255) * 30;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = palette[1] || '#FF00E5';
    ctx.shadowBlur = 30 + state.vizGlow;
    ctx.shadowColor = palette[1] || '#FF00E5';
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;

    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2 + rotation * -1.5;
      const freqIndex = Math.floor(i / bars * dataArray.length * 0.7);
      const value = dataArray[freqIndex] || 0;
      const barHeight = (value / 255) * (radius * 0.9) + 10;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      const colorIndex = Math.floor((i / bars) * palette.length);
      const barColor = palette[colorIndex] || palette[0];

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = barWidth;
      ctx.strokeStyle = barColor;
      ctx.shadowBlur = state.vizGlow * 0.7;
      ctx.shadowColor = barColor;

      if (value > 190) {
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ffffff';
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    for (let ring = 1; ring <= 4; ring++) {
      const ringRadius = radius * (0.4 + ring * 0.18);
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius + Math.sin(time * 2 + ring) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRgba(palette[0], 0.35 - ring * 0.06);
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const rayCount = 10;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2 + rotation * 2.5;
      const freqIndex = Math.floor(i / rayCount * dataArray.length * 0.4);
      const value = (dataArray[freqIndex] || 0) / 255;
      if (value < 0.45) continue;

      const rayLength = radius * 1.8 * (0.4 + value);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * rayLength,
        centerY + Math.sin(angle) * rayLength
      );
      const rayColor = palette[2] || palette[0];
      ctx.strokeStyle = hexToRgba(rayColor, 0.2 + value * 0.6);
      ctx.lineWidth = 3;
      ctx.shadowBlur = 30;
      ctx.shadowColor = rayColor;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  },

  ringWave(ctx, centerX, centerY, dataArray, state, config) {
    const radius = Math.min(config.width, config.height) * 0.23 * state.vizScale;
    const bass = dataArray[1] || 0;

    const gradient = ctx.createLinearGradient(centerX - radius * 2, centerY, centerX + radius * 2, centerY);
    gradient.addColorStop(0, '#ff4da6');
    gradient.addColorStop(0.5, '#00e5ff');
    gradient.addColorStop(1, '#7cff00');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.shadowBlur = state.vizGlow + bass / 2;
    ctx.shadowColor = '#ff4da6';
    ctx.stroke();
    ctx.shadowBlur = 0;

    const samples = 128;
    const width = radius * 2.4;
    const startX = centerX - width / 2;

    ctx.beginPath();
    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      const idx = Math.floor(t * dataArray.length * 0.7);
      const v = dataArray[idx] || 0;
      const amp = (v / 255) * radius * 0.8;
      const x = startX + t * width;
      const y = centerY - amp;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      const idx = Math.floor(t * dataArray.length * 0.7);
      const v = dataArray[idx] || 0;
      const amp = (v / 255) * radius * 0.8;
      const x = startX + t * width;
      const y = centerY + amp;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba('#00e5ff', 0.7);
    ctx.lineWidth = 2;
    ctx.stroke();
  },

  mirrorWave(ctx, centerX, centerY, dataArray, state, config) {
    const baseY = centerY;
    const width = config.width;
    const height = config.height * 0.25;
    const samples = 200;

    const gradientTop = ctx.createLinearGradient(0, baseY - height, 0, baseY);
    gradientTop.addColorStop(0, hexToRgba(state.vizColor, 0.0));
    gradientTop.addColorStop(1, hexToRgba(state.vizColor, 0.9));

    const gradientBottom = ctx.createLinearGradient(0, baseY, 0, baseY + height);
    gradientBottom.addColorStop(0, hexToRgba(state.vizColor, 0.7));
    gradientBottom.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const idx = Math.floor(t * dataArray.length * 0.9);
      const v = dataArray[idx] || 0;
      const amp = (v / 255) * height * 1.2;
      const x = t * width;
      const y = baseY - amp;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, baseY);
    ctx.closePath();
    ctx.fillStyle = gradientTop;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const idx = Math.floor(t * dataArray.length * 0.9);
      const v = dataArray[idx] || 0;
      const amp = (v / 255) * height * 0.9;
      const x = t * width;
      const y = baseY + amp;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, baseY);
    ctx.closePath();
    ctx.fillStyle = gradientBottom;
    ctx.fill();
  },

  hudTech(ctx, centerX, centerY, dataArray, state, rotation, time, config) {
    const mainR = Math.min(config.width, config.height) * 0.2 * state.vizScale;
    const sideR = mainR * 0.6;

    const drawDial = (cx, cy, r, offset, freqOffset = 0) => {
      const ticks = 60;
      for (let i = 0; i < ticks; i++) {
        const t = i / ticks;
        const angle = t * Math.PI * 2 + rotation * 2 + offset;
        const idx = Math.floor((t + freqOffset) * dataArray.length) % dataArray.length;
        const v = dataArray[idx] || 0;
        const inner = r * (0.75 + 0.1 * Math.sin(i / 5 + time));
        const outer = inner + (v / 255) * r * 0.6;

        const x1 = cx + Math.cos(angle) * inner;
        const y1 = cy + Math.sin(angle) * inner;
        const x2 = cx + Math.cos(angle) * outer;
        const y2 = cy + Math.sin(angle) * outer;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = hexToRgba(state.vizColor, 0.7 + 0.3 * t);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRgba('#ffffff', 0.2);
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    ctx.save();
    ctx.shadowBlur = state.vizGlow;
    ctx.shadowColor = state.vizColor;

    ctx.beginPath();
    ctx.arc(centerX, centerY, mainR, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(state.vizColor, 0.9);
    ctx.lineWidth = 3;
    ctx.stroke();

    drawDial(centerX, centerY, mainR * 1.1, 0);
    const offset = mainR * 1.8;
    drawDial(centerX - offset, centerY, sideR, Math.PI / 4, 0.2);
    drawDial(centerX + offset, centerY, sideR, -Math.PI / 4, 0.5);

    ctx.restore();
    ctx.shadowBlur = 0;
  },

  landscape3D(ctx, centerX, centerY, dataArray, state, config) {
    const barCount = 100;
    const maxBarHeight = config.height * 0.4 * state.vizScale;
    const baseLineY = centerY;
    const barWidth = config.width / barCount;
    const gradientColors = [
      '#4E00FF', '#9D00FF', '#FF00E5', '#FFAA00', '#FFFF00', '#00FF00', '#00FFFF'
    ];

    ctx.save();

    for (let i = 0; i < barCount; i++) {
      const freqIndex = Math.floor(i / barCount * dataArray.length);
      const value = dataArray[freqIndex] || 0;
      const barHeight = (value / 255) * maxBarHeight;

      const x = i * barWidth;
      const barActualWidth = barWidth * 0.9;

      const colorIdx = Math.floor((i / barCount) * gradientColors.length);
      const barColor = gradientColors[colorIdx] || gradientColors[0];

      ctx.beginPath();
      ctx.rect(x, baseLineY - barHeight, barActualWidth, barHeight);
      ctx.fillStyle = barColor;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = barColor;
      ctx.fill();

      ctx.beginPath();
      ctx.rect(x, baseLineY, barActualWidth, barHeight * 0.5);
      ctx.fillStyle = hexToRgba(barColor, 0.2);
      ctx.shadowBlur = state.vizGlow / 2;
      ctx.shadowColor = hexToRgba(barColor, 0.5);
      ctx.fill();
    }
    ctx.restore();
    ctx.shadowBlur = 0;
  },

  electricWave(ctx, centerX, centerY, dataArray, state, time, config) {
    const samples = 256;
    const width = config.width * 0.9;
    const startX = (config.width - width) / 2;
    const amplitude = config.height * 0.15 * state.vizScale;
    const waveCenterY = centerY;
    const glowColor = state.vizColor;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, waveCenterY);

    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      const freqIndex = Math.floor(t * dataArray.length * 0.7);
      const value = dataArray[freqIndex] || 0;
      const displacement = (value / 255) * amplitude * (Math.sin(t * Math.PI * 4 + time * 0.5) * 0.5 + 0.5);
      const x = startX + t * width;
      const y = waveCenterY + Math.sin(t * Math.PI * 8 + time * 2) * displacement;

      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 4;
    ctx.shadowBlur = state.vizGlow * 2;
    ctx.shadowColor = glowColor;
    ctx.stroke();

    for (let i = 0; i < 20; i++) {
      const randT = Math.random();
      const freqIndex = Math.floor(randT * dataArray.length * 0.7);
      const value = dataArray[freqIndex] || 0;
      if (value > 150) {
        const x = startX + randT * width;
        const y = waveCenterY + Math.sin(randT * Math.PI * 8 + time * 2) * (value / 255) * amplitude;
        ctx.beginPath();
        ctx.arc(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(glowColor, Math.random());
        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor;
        ctx.fill();
      }
    }

    ctx.restore();
    ctx.shadowBlur = 0;
  },

  // Остальные 2D визуализаторы из оригинала...
  soundPressure(ctx, centerX, centerY, dataArray, state, config) {
    const radius = Math.min(config.width, config.height) * 0.2 * state.vizScale;
    const bass = dataArray[2] || 0;
    
    ctx.save();
    
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
    bgGradient.addColorStop(0, 'rgba(0,200,255,0.1)');
    bgGradient.addColorStop(1, 'rgba(255,0,150,0.05)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, config.width, config.height);
    
    const knobRadius = radius * 0.3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, knobRadius, 0, Math.PI * 2);
    const knobGradient = ctx.createLinearGradient(centerX - knobRadius, centerY, centerX + knobRadius, centerY);
    knobGradient.addColorStop(0, '#1a1a2e');
    knobGradient.addColorStop(0.5, '#16213e');
    knobGradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = knobGradient;
    ctx.fill();
    
    const bars = 120;
    for (let i = 0; i < bars; i++) {
      const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
      const freqIndex = Math.floor(i / bars * dataArray.length * 0.6);
      const value = dataArray[freqIndex] || 0;
      const barHeight = (value / 255) * radius * 0.8;
      
      const hue = 180 + (i / bars) * 180;
      
      const x1 = centerX + Math.cos(angle) * (radius * 0.7);
      const y1 = centerY + Math.sin(angle) * (radius * 0.7);
      const x2 = centerX + Math.cos(angle) * (radius * 0.7 + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius * 0.7 + barHeight);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `hsl(${hue}, 100%, ${50 + value/10}%)`;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.stroke();
    }
    
    ctx.restore();
    ctx.shadowBlur = 0;
  },

  waveformCircle(ctx, centerX, centerY, dataArray, state, time, config) {
    const radius = Math.min(config.width, config.height) * 0.25 * state.vizScale;
    
    ctx.save();
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
    bgGradient.addColorStop(0, 'rgba(0,150,255,0.2)');
    bgGradient.addColorStop(0.5, 'rgba(0,255,255,0.1)');
    bgGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, config.width, config.height);
    
    const samples = 360;
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const angle = (i / samples) * Math.PI * 2;
      const freqIndex = Math.floor(i / samples * dataArray.length);
      const value = dataArray[freqIndex] || 0;
      const waveRadius = radius + (value / 255) * radius * 0.5 * Math.sin(angle * 4 + time * 2);
      
      const x = centerX + Math.cos(angle) * waveRadius;
      const y = centerY + Math.sin(angle) * waveRadius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(0.5, '#0099ff');
    gradient.addColorStop(1, '#00ffff');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = state.vizGlow * 2;
    ctx.shadowColor = '#00ffff';
    ctx.stroke();
    
    const bass = dataArray[2] || 0;
    const innerRadius = radius * 0.3 + (bass / 255) * 30;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,200,255,0.3)';
    ctx.fill();
    
    ctx.restore();
    ctx.shadowBlur = 0;
  },

  // Добавьте остальные из оригинала: purpleSpiral, eyeSpectrum, infinityBass, radialBurst, musicWave
};

// ===== 3D/5D ВИЗУАЛИЗАТОРЫ =====
export const visualizers3D = {
  // 1. 5D Гиперкуб
  hyperCube5D(ctx, centerX, centerY, dataArray, state, time, config) {
    const avgIntensity = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
    const bassIntensity = dataArray.slice(0, 20).reduce((a, b) => a + b, 0) / 20 / 255;
    
    const size = 100 * state.vizScale;
    const depth = state.depth3D || 500;
    const perspective = state.perspective || 800;
    
    const rotX = (state.rotationX || 0) * Math.PI / 180;
    const rotY = (state.rotationY || 0) * Math.PI / 180;
    const rotZ = (state.rotationZ || 0) * Math.PI / 180;
    const autoRot = (state.autoRotSpeed || 1) * time * 0.01;
    
    const vertices = [];
    for (let w = -1; w <= 1; w += 2) {
      for (let z = -1; z <= 1; z += 2) {
        for (let y = -1; y <= 1; y += 2) {
          for (let x = -1; x <= 1; x += 2) {
            const w4d = w * Math.cos(autoRot * 0.5);
            const point = new Point3D(
              x * size * (1 + w4d * 0.3),
              y * size * (1 + w4d * 0.3),
              z * size * (1 + w4d * 0.3)
            );
            
            point.rotateX(rotX + autoRot * 0.2);
            point.rotateY(rotY + autoRot * 0.3);
            point.rotateZ(rotZ + autoRot * 0.15);
            
            const intensity = dataArray[vertices.length % dataArray.length] / 255;
            point.x *= (1 + intensity * 0.5);
            point.y *= (1 + intensity * 0.5);
            point.z *= (1 + intensity * 0.5);
            
            vertices.push(point);
          }
        }
      }
    }
    
    const projected = vertices.map(v => v.project(centerX, centerY, depth, perspective));
    
    ctx.strokeStyle = `hsla(${time * 50 % 360}, 100%, 60%, 0.6)`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = state.vizGlow;
    ctx.shadowColor = `hsl(${time * 50 % 360}, 100%, 60%)`;
    
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = Math.abs(vertices[i].x - vertices[j].x);
        const dy = Math.abs(vertices[i].y - vertices[j].y);
        const dz = Math.abs(vertices[i].z - vertices[j].z);
        
        if ((dx < size * 2.5 && dy < 10 && dz < 10) ||
            (dy < size * 2.5 && dx < 10 && dz < 10) ||
            (dz < size * 2.5 && dx < 10 && dy < 10)) {
          
                   ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Вершины
    projected.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
      const hue = (i / vertices.length) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
  },

  // 2. Сфера с пульсирующими волнами
  pulsingSphere3D(ctx, centerX, centerY, dataArray, state, time, config) {
    const radius = 150 * state.vizScale;
    const rings = 20;
    const segments = 40;
    const depth = state.depth3D || 500;
    const perspective = state.perspective || 800;
    
    const rotX = (state.rotationX || 0) * Math.PI / 180 + time * 0.005;
    const rotY = (state.rotationY || 0) * Math.PI / 180 + time * 0.008;
    
    const points = [];
    
    for (let ring = 0; ring <= rings; ring++) {
      const phi = (ring / rings) * Math.PI;
      for (let seg = 0; seg < segments; seg++) {
        const theta = (seg / segments) * Math.PI * 2;
        
        const freqIndex = Math.floor((ring * segments + seg) / (rings * segments) * dataArray.length);
        const intensity = dataArray[freqIndex] / 255;
        
        const r = radius * (1 + intensity * 0.5);
        
        const point = new Point3D(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
        
        point.rotateX(rotX);
        point.rotateY(rotY);
        
        points.push({ point, intensity });
      }
    }
    
    points.sort((a, b) => a.point.z - b.point.z);
    
    points.forEach(({ point, intensity }) => {
      const proj = point.project(centerX, centerY, depth, perspective);
      
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 2 * proj.scale, 0, Math.PI * 2);
      
      const hue = intensity * 240;
      ctx.fillStyle = `hsla(${hue}, 100%, ${50 + intensity * 30}%, ${proj.scale})`;
      ctx.shadowBlur = state.vizGlow * intensity;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
  },

  // 3. Спиральная галактика в 3D
  spiralGalaxy3D(ctx, centerX, centerY, dataArray, state, time, config) {
    const arms = 5;
    const pointsPerArm = 100;
    const depth = state.depth3D || 800;
    const perspective = state.perspective || 800;
    
    const rotX = (state.rotationX || 0) * Math.PI / 180;
    const rotY = (state.rotationY || 0) * Math.PI / 180 + time * 0.003;
    const rotZ = (state.rotationZ || 0) * Math.PI / 180;
    
    const particles = [];
    
    for (let arm = 0; arm < arms; arm++) {
      const armAngle = (arm / arms) * Math.PI * 2;
      
      for (let i = 0; i < pointsPerArm; i++) {
        const t = i / pointsPerArm;
        const distance = t * 300 * state.vizScale;
        const angle = armAngle + t * Math.PI * 4;
        
        const freqIndex = Math.floor((arm * pointsPerArm + i) / (arms * pointsPerArm) * dataArray.length);
        const intensity = dataArray[freqIndex] / 255;
        
        const point = new Point3D(
          Math.cos(angle) * distance,
          (Math.random() - 0.5) * 50 * intensity,
          Math.sin(angle) * distance
        );
        
        point.rotateX(rotX);
        point.rotateY(rotY);
        point.rotateZ(rotZ);
        
        particles.push({ point, intensity, t });
      }
    }
    
    particles.sort((a, b) => a.point.z - b.point.z);
    
    particles.forEach(({ point, intensity, t }) => {
      const proj = point.project(centerX, centerY, depth, perspective);
      
      const size = (2 + intensity * 4) * proj.scale;
      
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      
      const hue = t * 360 + time * 10;
      ctx.fillStyle = `hsla(${hue}, 100%, ${60 + intensity * 20}%, ${0.5 + intensity * 0.5})`;
      ctx.shadowBlur = state.vizGlow * intensity * 2;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
  },

  // 4. Кубическая решетка с реактивностью
  reactiveLattice3D(ctx, centerX, centerY, dataArray, state, time, config) {
    const gridSize = 8;
    const spacing = 60 * state.vizScale;
    const depth = state.depth3D || 500;
    const perspective = state.perspective || 800;
    
    const rotX = (state.rotationX || 0) * Math.PI / 180 + time * 0.002;
    const rotY = (state.rotationY || 0) * Math.PI / 180 + time * 0.003;
    const rotZ = (state.rotationZ || 0) * Math.PI / 180;
    
    const points = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const index = x * gridSize * gridSize + y * gridSize + z;
          const freqIndex = Math.floor(index / (gridSize ** 3) * dataArray.length);
          const intensity = dataArray[freqIndex] / 255;
          
          const point = new Point3D(
            (x - gridSize / 2) * spacing,
            (y - gridSize / 2) * spacing * (1 + intensity),
            (z - gridSize / 2) * spacing
          );
          
          point.rotateX(rotX);
          point.rotateY(rotY);
          point.rotateZ(rotZ);
          
          points.push({ point, intensity });
        }
      }
    }
    
    points.sort((a, b) => a.point.z - b.point.z);
    
    ctx.strokeStyle = `hsla(180, 100%, 50%, 0.3)`;
    ctx.lineWidth = 1;
    
    // Рисуем соединения
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const proj1 = p1.point.project(centerX, centerY, depth, perspective);
      
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        
        const dist = Math.sqrt(
          (p1.point.x - p2.point.x) ** 2 +
          (p1.point.y - p2.point.y) ** 2 +
          (p1.point.z - p2.point.z) ** 2
        );
        
        if (dist < spacing * 1.5) {
          const proj2 = p2.point.project(centerX, centerY, depth, perspective);
          
          ctx.beginPath();
          ctx.moveTo(proj1.x, proj1.y);
          ctx.lineTo(proj2.x, proj2.y);
          
          const avgIntensity = (p1.intensity + p2.intensity) / 2;
          ctx.strokeStyle = `hsla(${avgIntensity * 120 + 180}, 100%, 50%, ${avgIntensity * 0.6})`;
          ctx.stroke();
        }
      }
      
      // Узлы
      ctx.beginPath();
      ctx.arc(proj1.x, proj1.y, 3 + p1.intensity * 5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p1.intensity * 120 + 200}, 100%, 60%, 0.8)`;
      ctx.shadowBlur = state.vizGlow * p1.intensity;
      ctx.shadowColor = `hsl(${p1.intensity * 120 + 200}, 100%, 50%)`;
      ctx.fill();
    }
    
    ctx.shadowBlur = 0;
  },

  // 5. Тоннель с глубиной (Love Tunnel)
  loveTunnel3D(ctx, centerX, centerY, dataArray, state, time, config) {
    const rings = 30;
    const segments = 24;
    const baseRadius = 50 * state.vizScale;
    const depth = state.depth3D || 1000;
    const perspective = state.perspective || 600;
    
    const rotZ = time * 0.02;
    
    for (let ring = 0; ring < rings; ring++) {
      const z = ring * 40 - 300;
      const freqIndex = Math.floor(ring / rings * dataArray.length * 0.5);
      const intensity = dataArray[freqIndex] / 255;
      
      const radius = baseRadius + intensity * 30;
      
      ctx.beginPath();
      for (let seg = 0; seg <= segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2 + rotZ;
        
        const point = new Point3D(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        );
        
        const proj = point.project(centerX, centerY, depth, perspective);
        
        if (seg === 0) {
          ctx.moveTo(proj.x, proj.y);
        } else {
          ctx.lineTo(proj.x, proj.y);
        }
      }
      
      const hue = (ring / rings) * 60 + 300; // От розового до фиолетового
      ctx.strokeStyle = `hsla(${hue}, 100%, ${50 + intensity * 30}%, ${0.3 + intensity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.shadowBlur = state.vizGlow * intensity;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.stroke();
      
      // Сердечки на кольцах
      if (ring % 3 === 0 && intensity > 0.5) {
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + rotZ;
          const heartPoint = new Point3D(
            Math.cos(angle) * (radius + 20),
            Math.sin(angle) * (radius + 20),
            z
          );
          
          const proj = heartPoint.project(centerX, centerY, depth, perspective);
          
          ctx.save();
          ctx.translate(proj.x, proj.y);
          ctx.scale(proj.scale * 0.5, proj.scale * 0.5);
          
          ctx.fillStyle = `hsla(340, 100%, 60%, ${intensity})`;
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('❤️', 0, 0);
          ctx.restore();
        }
      }
    }
    
    ctx.shadowBlur = 0;
  },

  // 6. Романтическая роза в 3D
  rose3D(ctx, centerX, centerY, dataArray, state, time, config) {
    const petals = 8;
    const layers = 15;
    const depth = state.depth3D || 400;
    const perspective = state.perspective || 800;
    
    const rotX = (state.rotationX || 0) * Math.PI / 180 + Math.PI / 6;
    const rotY = (state.rotationY || 0) * Math.PI / 180 + time * 0.01;
    
    const bassIntensity = dataArray.slice(0, 20).reduce((a, b) => a + b, 0) / 20 / 255;
    
    const allPoints = [];
    
    for (let layer = 0; layer < layers; layer++) {
      const layerRatio = layer / layers;
      const radius = 20 + layerRatio * 80 * state.vizScale;
      const height = -layer * 10;
      const segments = petals * 10;
      
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const petalIndex = Math.floor(angle / (Math.PI * 2 / petals));
        
        const freqIndex = Math.floor(petalIndex / petals * dataArray.length);
        const intensity = dataArray[freqIndex] / 255;
        
        const petalShape = Math.pow(Math.abs(Math.sin(angle * petals / 2)), 2);
        const r = radius * (0.6 + petalShape * 0.4) * (1 + intensity * 0.3);
        
        const point = new Point3D(
          Math.cos(angle) * r,
          height + Math.sin(angle * petals) * 15 * layerRatio,
          Math.sin(angle) * r
        );
        
        point.rotateX(rotX);
        point.rotateY(rotY);
        
        allPoints.push({ point, layerRatio, intensity });
      }
    }
    
    allPoints.sort((a, b) => a.point.z - b.point.z);
    
    allPoints.forEach(({ point, layerRatio, intensity }) => {
      const proj = point.project(centerX, centerY, depth, perspective);
      
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, (2 + intensity * 3) * proj.scale, 0, Math.PI * 2);
      
      const hue = 340 + layerRatio * 20;
      const lightness = 40 + intensity * 30 + bassIntensity * 20;
      ctx.fillStyle = `hsla(${hue}, 100%, ${lightness}%, ${0.6 + layerRatio * 0.4})`;
      ctx.shadowBlur = state.vizGlow * (0.5 + intensity * 0.5);
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
  }
};

// Экспорт карты всех визуализаторов
export const vizList2D = [
  { id: 'circular', name: 'Circular Bars', icon: '⭕' },
  { id: 'radial', name: 'Radial Lines', icon: '🌐' },
  { id: 'neon', name: 'Neon Ring', icon: '💡' },
  { id: 'tunnel', name: 'Cyber Tunnel', icon: '🚀' },
  { id: 'ringWave', name: 'Ring Wave', icon: '🌊' },
  { id: 'mirrorWave', name: 'Mirror Landscape', icon: '📡' },
  { id: 'hudTech', name: 'Tech HUD', icon: '🎯' },
  { id: 'landscape3D', name: '3D Landscape', icon: '🏞️' },
  { id: 'electricWave', name: 'Electric Wave', icon: '⚡' },
  { id: 'soundPressure', name: 'Sound Pressure', icon: '🎚️' },
  { id: 'waveformCircle', name: 'Waveform Circle', icon: '🎵' }
];

export const vizList3D = [
  { id: 'hyperCube5D', name: '5D HyperCube', icon: '🔷' },
  { id: 'pulsingSphere3D', name: 'Pulsing Sphere', icon: '🌍' },
  { id: 'spiralGalaxy3D', name: 'Spiral Galaxy', icon: '🌌' },
  { id: 'reactiveLattice3D', name: 'Reactive Lattice', icon: '🔬' },
  { id: 'loveTunnel3D', name: 'Love Tunnel', icon: '💖' },
  { id: 'rose3D', name: 'Rose 3D', icon: '🌹' }
];
