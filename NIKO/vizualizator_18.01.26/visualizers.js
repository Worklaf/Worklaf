// =============================================
// 🎨 БИБЛИОТЕКА ВИЗУАЛИЗАТОВ N1K∅ (с панелью настроек)
// =============================================

const VisualizerLibrary = {
  // =============================================
  // 🔧 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  
  helpers: {
    rotate3D(p, ax, ay, az) {
      let {x, y, z} = p;
      let cy = Math.cos(ax), sy = Math.sin(ax);
      let y1 = y * cy - z * sy;
      let z1 = y * sy + z * cy;
      y = y1; z = z1;
      
      let cx = Math.cos(ay), sx = Math.sin(ay);
      let x1 = x * cx + z * sx;
      let z2 = -x * sx + z * cx;
      x = x1; z = z2;
      
      let cz = Math.cos(az), sz = Math.sin(az);
      let x2 = x * cz - y * sz;
      let y2 = x * sz + y * cz;
      return {x: x2, y: y2, z};
    },

    project3D(x, y, z, centerX, centerY, fov = 500) {
      const scale = fov / (fov + z);
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale: scale
      };
    },

    project4Dto3D(p4, wDist) {
      const scale = wDist / (wDist - p4.w);
      return { x: p4.x * scale, y: p4.y * scale, z: p4.z * scale };
    },

    hexToRgba(hex, alpha) {
      if (!hex) return `rgba(255,255,255,${alpha})`;
      let h = hex.replace('#', '');
      if (h.length === 3) h = h.split('').map(c => c + c).join('');
      const num = parseInt(h, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }
  },

  // =============================================
  // 📊 ВИЗУАЛИЗАТОРЫ
  // =============================================

  circular: {
    name: 'Circular Bars',
    icon: '⭕',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
    }
  },

  radial: {
    name: 'Radial Lines',
    icon: '🌐',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const outerRadius = Math.min(config.width, config.height) * 0.35 * state.vizScale;
      const innerRadius = outerRadius * 0.2;
      const bars = 240;

      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 + rotation * state.rotSpeed;
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
    }
  },

  neon: {
    name: 'Neon Ring',
    icon: '💡',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
        const angle = t * Math.PI * 2 + rotation * 1.5 * state.rotSpeed;
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
    }
  },

  tunnel: {
    name: 'Cyber Tunnel',
    icon: '🚀',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const radius = Math.min(config.width, config.height) * 0.3 * state.vizScale;
      const bars = 90;
      const barWidth = 4;

      const palette = (state.tunnelColors && state.tunnelColors.length)
        ? state.tunnelColors
        : ['#00E5FF', '#FF00E5', '#00FFAA'];

      const neonColors = {
        cyan: palette[0] || '#00E5FF',
        pink: palette[1] || palette[0] || '#FF00E5',
        accent: palette[2] || palette[1] || palette[0] || '#00FFAA'
      };

      const avgBass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const pulseRadius = radius * 0.25 + (avgBass / 255) * 30;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = neonColors.pink;
      ctx.shadowBlur = 30 + state.vizGlow;
      ctx.shadowColor = neonColors.pink;
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 + rotation * -1.5 * state.rotSpeed;
        const freqIndex = Math.floor(i / bars * dataArray.length * 0.7);
        const value = dataArray[freqIndex] || 0;
        const barHeight = (value / 255) * (radius * 0.9) + 10;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        const colorIndex = Math.floor((i / bars) * palette.length);
        const barColor = palette[colorIndex] || neonColors.cyan;

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
        ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba(neonColors.cyan, 0.35 - ring * 0.06);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const rayCount = 10;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + rotation * 2.5 * state.rotSpeed;
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
        const rayColor = neonColors.accent;
        ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba(rayColor, 0.2 + value * 0.6);
        ctx.lineWidth = 3;
        ctx.shadowBlur = 30;
        ctx.shadowColor = rayColor;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }
  },

  ringWave: {
    name: 'Ring Wave',
    icon: '🌊',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
      ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba('#00e5ff', 0.7);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  },

  mirrorWave: {
    name: 'Mirror Landscape',
    icon: '📡',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const baseY = centerY;
      const width = config.width;
      const height = config.height * 0.25;
      const samples = 200;

      const gradientTop = ctx.createLinearGradient(0, baseY - height, 0, baseY);
      gradientTop.addColorStop(0, VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.0));
      gradientTop.addColorStop(1, VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.9));

      const gradientBottom = ctx.createLinearGradient(0, baseY, 0, baseY + height);
      gradientBottom.addColorStop(0, VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.7));
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
    }
  },

  hudTech: {
    name: 'Tech HUD',
    icon: '🎯',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const mainR = Math.min(config.width, config.height) * 0.2 * state.vizScale;
      const sideR = mainR * 0.6;

      const drawDial = (cx, cy, r, offset, freqOffset = 0) => {
        const ticks = 60;
        for (let i = 0; i < ticks; i++) {
          const t = i / ticks;
          const angle = t * Math.PI * 2 + rotation * 2 * state.rotSpeed + offset;
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
          ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.7 + 0.3 * t);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba('#ffffff', 0.2);
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      ctx.save();
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      ctx.beginPath();
      ctx.arc(centerX, centerY, mainR, 0, Math.PI * 2);
      ctx.strokeStyle = VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.9);
      ctx.lineWidth = 3;
      ctx.stroke();

      drawDial(centerX, centerY, mainR * 1.1, 0);
      const offset = mainR * 1.8;
      drawDial(centerX - offset, centerY, sideR, Math.PI / 4, 0.2);
      drawDial(centerX + offset, centerY, sideR, -Math.PI / 4, 0.5);

      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  landscape3D: {
    name: '3D Landscape',
    icon: '🏞️',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
        ctx.fillStyle = VisualizerLibrary.helpers.hexToRgba(barColor, 0.2);
        ctx.shadowBlur = state.vizGlow / 2;
        ctx.shadowColor = VisualizerLibrary.helpers.hexToRgba(barColor, 0.5);
        ctx.fill();
      }
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  electricWave: {
    name: 'Electric Wave',
    icon: '⚡',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
          ctx.fillStyle = VisualizerLibrary.helpers.hexToRgba(glowColor, Math.random());
          ctx.shadowBlur = 10;
          ctx.shadowColor = glowColor;
          ctx.fill();
        }
      }

      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  soundPressure: {
    name: 'Sound Pressure',
    icon: '🎚️',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
      
      const panelY = centerY + radius * 1.8;
      const panelWidth = radius * 3;
      
      ctx.fillStyle = 'rgba(20,20,30,0.8)';
      ctx.fillRect(centerX - panelWidth/2, panelY, panelWidth, 40);
      
      for (let i = 0; i < 5; i++) {
        const x = centerX - panelWidth/2 + 20 + i * 60;
        const level = dataArray[i * 20] || 0;
        const height = (level / 255) * 30;
        
        ctx.fillStyle = level > 200 ? '#ff0000' : level > 150 ? '#ffaa00' : '#00ff00';
        ctx.fillRect(x, panelY + 35 - height, 40, height);
      }
      
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  waveformCircle: {
    name: 'Waveform Circle',
    icon: '🎵',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
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
      
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      for (let i = 0; i < dataArray.length / 2; i++) {
        const x = centerX - radius + (i / (dataArray.length/2)) * radius * 2;
        const y = centerY + (dataArray[i] / 255 - 0.5) * radius * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffff00';
      ctx.stroke();
      
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  musicWave: {
    name: 'Music Wave',
    icon: '〰️',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const width = config.width * 0.8;
      const amplitude = config.height * 0.2 * state.vizScale;
      const startX = (config.width - width) / 2;
      
      ctx.save();
      
      const circleRadius = Math.min(config.width, config.height) * 0.15 * state.vizScale;
      
      const segments = 90;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const freqIndex = Math.floor(i / segments * dataArray.length * 0.5);
        const value = dataArray[freqIndex] || 0;
        const barHeight = (value / 255) * circleRadius * 0.5;
        
        const x1 = centerX + Math.cos(angle) * circleRadius;
        const y1 = centerY + Math.sin(angle) * circleRadius;
        const x2 = centerX + Math.cos(angle) * (circleRadius + barHeight);
        const y2 = centerY + Math.sin(angle) * (circleRadius + barHeight);
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, '#00e5ff');
        gradient.addColorStop(0.5, '#ff00e5');
        gradient.addColorStop(1, '#ffaa00');
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fill();
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.font = `bold ${circleRadius * 0.3}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00e5ff';
      ctx.fillText('MUSIC', centerX, centerY);
      
      ctx.beginPath();
      for (let i = 0; i < dataArray.length / 2; i++) {
        const x = startX + (i / (dataArray.length / 2)) * width;
        const value = dataArray[i] || 0;
        const y = centerY - circleRadius * 1.5 - (value / 255) * amplitude;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      const waveGradient = ctx.createLinearGradient(startX, 0, startX + width, 0);
      waveGradient.addColorStop(0, '#00ffff');
      waveGradient.addColorStop(0.5, '#ff00ff');
      waveGradient.addColorStop(1, '#00ffff');
      
      ctx.strokeStyle = waveGradient;
      ctx.lineWidth = 3;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = '#00ffff';
      ctx.stroke();
      
      ctx.beginPath();
      for (let i = 0; i < dataArray.length / 2; i++) {
        const x = startX + (i / (dataArray.length / 2)) * width;
        const value = dataArray[i] || 0;
        const y = centerY + circleRadius * 1.5 + (value / 255) * amplitude;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = waveGradient;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  loveWave: {
    name: 'Love Wave',
    icon: '💕',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const width = config.width * 0.9;
      const startX = (config.width - width) / 2;
      const amplitude = config.height * 0.2 * state.vizScale;
      
      ctx.save();

      const bgGradient = ctx.createLinearGradient(0, 0, config.width, config.height);
      bgGradient.addColorStop(0, 'rgba(255,105,180,0.1)');
      bgGradient.addColorStop(0.5, 'rgba(255,20,147,0.15)');
      bgGradient.addColorStop(1, 'rgba(199,21,133,0.1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, config.width, config.height);

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const samples = 200;
        
        for (let i = 0; i <= samples; i++) {
          const t = i / samples;
          const x = startX + t * width;
          const freqIndex = Math.floor(t * dataArray.length * 0.7);
          const value = dataArray[freqIndex] || 0;
          
          const heartShape = Math.abs(Math.sin(t * Math.PI)) * Math.abs(Math.cos(t * Math.PI * 2));
          const y = centerY + (value / 255) * amplitude * heartShape * Math.sin(time + wave);
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const waveGradient = ctx.createLinearGradient(startX, 0, startX + width, 0);
        waveGradient.addColorStop(0, `hsla(330, 100%, ${60 + wave * 10}%, ${0.8 - wave * 0.2})`);
        waveGradient.addColorStop(0.5, `hsla(340, 100%, ${50 + wave * 10}%, ${0.8 - wave * 0.2})`);
        waveGradient.addColorStop(1, `hsla(350, 100%, ${60 + wave * 10}%, ${0.8 - wave * 0.2})`);
        
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 4 - wave;
        ctx.shadowBlur = state.vizGlow * (1.5 - wave * 0.3);
        ctx.shadowColor = '#ff1493';
        ctx.stroke();
      }

      const hearts = 15;
      for (let i = 0; i < hearts; i++) {
        const freqIndex = Math.floor((i / hearts) * dataArray.length);
        const value = dataArray[freqIndex] || 0;
        
        if (value > 100) {
          const x = startX + (i / hearts) * width;
          const y = centerY - amplitude * (value / 255) + Math.sin(time * 2 + i) * 30;
          const heartSize = 5 + (value / 255) * 10;
          
          ctx.fillStyle = `hsla(340, 100%, 60%, ${value / 255})`;
          ctx.font = `${heartSize}px Arial`;
          ctx.fillText('💕', x, y);
        }
      }

      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  matrixGrid: {
    name: 'Matrix Grid',
    icon: '🎛️',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const gridSize = 20;
      const cellSize = Math.min(config.width, config.height) / (gridSize * 1.5);
      const startX = centerX - (gridSize * cellSize) / 2;
      const startY = centerY - (gridSize * cellSize) / 2;
      
      ctx.save();
      
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const freqIndex = Math.floor(((y * gridSize + x) / (gridSize * gridSize)) * dataArray.length);
          const value = dataArray[freqIndex] || 0;
          
          const height = (value / 255) * 100;
          
          const perspective = 1 - (y / gridSize) * 0.5;
          const cellX = startX + x * cellSize * perspective;
          const cellY = startY + y * cellSize - height;
          const size = cellSize * perspective;
          
          ctx.beginPath();
          ctx.rect(cellX, cellY, size, size);
          
          const hue = ((x + y) / (gridSize * 2)) * 360 + time * 30;
          const brightness = 30 + (value / 255) * 70;
          
          const cellGradient = ctx.createLinearGradient(cellX, cellY, cellX + size, cellY + size);
          cellGradient.addColorStop(0, `hsl(${hue}, 100%, ${brightness}%)`);
          cellGradient.addColorStop(1, `hsl(${hue + 20}, 100%, ${brightness - 20}%)`);
          
          ctx.fillStyle = cellGradient;
          ctx.fill();
          
          if (value > 100) {
            ctx.strokeStyle = `hsl(${hue}, 100%, 80%)`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = state.vizGlow;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.stroke();
          }
          
          if (height > 20) {
            ctx.beginPath();
            ctx.moveTo(cellX + size / 2, cellY + size);
            ctx.lineTo(cellX + size / 2, cellY + size + height);
            ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.6)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      const scanY = (Math.sin(time * 2) * 0.5 + 0.5) * gridSize;
      ctx.beginPath();
      ctx.moveTo(startX, startY + scanY * cellSize);
      ctx.lineTo(startX + gridSize * cellSize, startY + scanY * cellSize);
      ctx.strokeStyle = 'rgba(0,255,255,0.8)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#00ffff';
      ctx.stroke();
      
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  depthTunnel: {
    name: 'Depth Tunnel',
    icon: '🌌',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const maxRadius = Math.min(config.width, config.height) * 0.4;
      
      ctx.save();

      const layers = 30;
      for (let layer = layers; layer >= 0; layer--) {
        const depth = layer / layers;
        const z = -500 + layer * 50;
        const scale = 600 / (600 + z);
        
        const segments = 60;
        ctx.beginPath();
        
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2 + rotation * state.rotSpeed * (1 - depth);
          const freqIndex = Math.floor((i / segments) * dataArray.length * 0.8);
          const value = dataArray[freqIndex] || 0;
          
          const baseRadius = maxRadius * state.vizScale * depth;
          const audioRadius = baseRadius + (value / 255) * baseRadius * 0.5;
          const radius = audioRadius * scale;
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        const hue = (layer / layers) * 360 + time * 100;
        const alpha = 0.3 + depth * 0.7;
        ctx.strokeStyle = `hsla(${hue}, 100%, ${40 + depth * 30}%, ${alpha})`;
        ctx.lineWidth = 1 + depth * 3;
        ctx.shadowBlur = state.vizGlow * depth;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.stroke();
      }

      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  Cloud: {
    name: 'Sphere Cloud 3D',
    icon: '🫧',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const points = 900;
      const radius = Math.min(config.width, config.height) * 0.22 * state.vizScale;
      const bass = (dataArray[2] || 0) / 255;
      const ax = time * 0.4 * state.rotSpeed;
      const ay = time * 0.6 * state.rotSpeed;
      const az = time * 0.2 * state.rotSpeed;

      ctx.save();
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      for (let i = 0; i < points; i++) {
        const t = i / points;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        let x = Math.cos(theta) * Math.sin(phi);
        let y = Math.sin(theta) * Math.sin(phi);
        let z = Math.cos(phi);

        const freqIndex = Math.floor(t * dataArray.length);
        const v = (dataArray[freqIndex] || 0) / 255;

        const r = radius * (0.8 + v * 0.8 + bass * 0.4);
        let p = VisualizerLibrary.helpers.rotate3D({x: x * r, y: y * r, z: z * r}, ax, ay, az);

        const proj = VisualizerLibrary.helpers.project3D(p.x, p.y, p.z + radius, centerX, centerY, 800);
        const alpha = 0.2 + v * 0.8;
        const size = 1 + v * 3;

        ctx.fillStyle = VisualizerLibrary.helpers.hexToRgba(state.vizColor, alpha);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  },

  helixRibbon: {
    name: 'Helix Ribbon 3D',
    icon: '🧬',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const turns = 6;
      const steps = 500;
      const radius = Math.min(config.width, config.height) * 0.18 * state.vizScale;
      const length = Math.min(config.width, config.height) * 0.9;
      const ax = time * 0.3 * state.rotSpeed;
      const ay = time * 0.5 * state.rotSpeed;

      ctx.save();
      ctx.lineWidth = 3;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      ctx.beginPath();
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const angle = t * Math.PI * 2 * turns + time * 1.2 * state.rotSpeed;
        const freqIndex = Math.floor(t * dataArray.length);
        const v = (dataArray[freqIndex] || 0) / 255;

        const x = Math.cos(angle) * (radius + v * 60);
        const y = Math.sin(angle) * (radius + v * 60);
        const z = (t - 0.5) * length;

        const p = VisualizerLibrary.helpers.rotate3D({x, y, z}, ax, ay, 0);
        const proj = VisualizerLibrary.helpers.project3D(p.x, p.y, p.z + 400, centerX, centerY, 700);

        if (i === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }

      ctx.strokeStyle = state.vizColor;
      ctx.stroke();
      ctx.restore();
    }
  },

  voxelField: {
    name: 'Voxel Field 3D',
    icon: '🧊',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const grid = 16;
      const spacing = Math.min(config.width, config.height) * 0.05 * state.vizScale;
      const baseZ = 300;
      const ax = -0.5 + Math.sin(time * 0.3) * 0.2;
      const ay = time * 0.4 * state.rotSpeed;

      ctx.save();
      ctx.shadowBlur = state.vizGlow * 0.6;
      ctx.shadowColor = state.vizColor;

      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const idx = Math.floor(((y * grid + x) / (grid * grid)) * dataArray.length);
          const v = (dataArray[idx] || 0) / 255;
          const h = 20 + v * 160;

          const px = (x - grid / 2) * spacing;
          const py = (y - grid / 2) * spacing;
          const p = VisualizerLibrary.helpers.rotate3D({x: px, y: py, z: -h}, ax, ay, 0);

          const proj = VisualizerLibrary.helpers.project3D(p.x, p.y, baseZ + p.z, centerX, centerY, 700);
          const size = spacing * 0.45 * proj.scale;

          ctx.fillStyle = VisualizerLibrary.helpers.hexToRgba(state.vizColor, 0.2 + v * 0.8);
          ctx.fillRect(proj.x - size / 2, proj.y - size / 2, size, size);
        }
      }
      ctx.restore();
    }
  },

  hyperSphere: {
    name: 'Hypersphere 4D',
    icon: '🔮',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const points = 700;
      const radius = Math.min(config.width, config.height) * 0.18 * state.vizScale;
      const bass = (dataArray[2] || 0) / 255;

      const ax = time * 0.3 * state.rotSpeed;
      const ay = time * 0.4 * state.rotSpeed;
      const wRot = time * 0.7 * state.rotSpeed;

      ctx.save();
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      for (let i = 0; i < points; i++) {
        const t = i / points;
        const phi = Math.acos(1 - 2 * t);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(phi);
        const w = Math.sin(theta * 0.7 + wRot);

        const freqIndex = Math.floor(t * dataArray.length);
        const v = (dataArray[freqIndex] || 0) / 255;
        const r = radius * (0.9 + v * 0.8 + bass * 0.3);

        const p4 = { x: x * r, y: y * r, z: z * r, w: w * r };
        let p3 = VisualizerLibrary.helpers.project4Dto3D(p4, 600);
        p3 = VisualizerLibrary.helpers.rotate3D(p3, ax, ay, 0);

        const proj = VisualizerLibrary.helpers.project3D(p3.x, p3.y, p3.z + radius, centerX, centerY, 800);
        const alpha = 0.2 + v * 0.8;

        ctx.fillStyle = VisualizerLibrary.helpers.hexToRgba(state.vizColor, alpha);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 1.5 * proj.scale + v * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  },

  visualizeCube: {
    name: 'Cube',
    icon: '📦',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const size = 150 * state.vizScale;
      const bass = (dataArray[2] || 0) / 255;
      const s = size + bass * 50;
      
      let vertices = [
        {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
        {x: -1, y: -1, z: 1},  {x: 1, y: -1, z: 1},  {x: 1, y: 1, z: 1},  {x: -1, y: 1, z: 1}
      ];

      const edges = [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7]
      ];

      const ax = time * 0.5 * state.rotSpeed;
      const ay = time * 0.8 * state.rotSpeed;

      ctx.save();
      ctx.strokeStyle = state.vizColor;
      ctx.lineWidth = 3;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      let projected = vertices.map(v => {
        let p = VisualizerLibrary.helpers.rotate3D({x: v.x * s, y: v.y * s, z: v.z * s}, ax, ay, 0);
        return VisualizerLibrary.helpers.project3D(p.x, p.y, p.z + 500, centerX, centerY, 600);
      });

      edges.forEach(e => {
        ctx.beginPath();
        ctx.moveTo(projected[e[0]].x, projected[e[0]].y);
        ctx.lineTo(projected[e[1]].x, projected[e[1]].y);
        ctx.stroke();
      });
      ctx.restore();
    }
  },

  visualizeWaveform: {
    name: 'Waveform',
    icon: '〰️',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const width = config.width * 0.8;
      const step = width / 128;
      const startX = centerX - width / 2;
      
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = state.vizColor;
      ctx.lineWidth = 4;
      ctx.shadowBlur = state.vizGlow;
      ctx.shadowColor = state.vizColor;

      for (let i = 0; i < 128; i++) {
        const v = (dataArray[i] || 0) / 255;
        const x = startX + i * step;
        const y = centerY + (v - 0.5) * 300 * state.vizScale;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }
  },

  visualizeSpeedTunnel: {
    name: 'SpeedTunnel',
    icon: '🚄',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      ctx.shadowBlur = 50;
      ctx.shadowColor = '#0066ff';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      const count = 80;
      const layers = 5;
      const rot = Number.isFinite(rotation) ? rotation : 0;

      for (let l = 0; l < layers; l++) {
        const depth = 1 - (l / layers);
        const radius = (100 + l * 80) * state.vizScale;

        for (let i = 0; i < count; i++) {
          const idx = (i + l * 10) % dataArray.length;
          const val = dataArray[idx] || 0;
          if (val < 50) continue;

          const angle = (i / count) * Math.PI * 2 + rot * (l + 1);
          const barW = 10 * depth;
          const barH = (val / 255) * 40 * depth;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          const hue = (i / count) * 360 + l * 50;
          ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${depth})`;

          ctx.fillRect(0, -barW / 2, barH, barW);
          ctx.restore();
        }
      }

      const bass = dataArray[2] || 0;
      const bassNormalized = bass / 255;
      
      const baseRadius = config.width * 0.1 * (state.vizScale || 1);
      const shellThickness = baseRadius * 0.25;
      
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      const segments = 128;
      
      const outerPoints = [];
      for (let s = 0; s < segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        
        const bassWave = Math.sin(angle * 3) * shellThickness * bassNormalized * 1.5;
        const fixedWave = Math.sin(angle * 4 + time * 0.05) * shellThickness * 0.4;
        
        const radius = baseRadius + shellThickness + bassWave + fixedWave;
        
        outerPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle
        });
      }
      
      const innerPoints = [];
      for (let s = 0; s < segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        
        const bassWave = Math.sin(angle * 3) * shellThickness * bassNormalized * 0.8;
        const fixedWave = Math.sin(angle * 4 + time * 0.05) * shellThickness * 0.2;
        
        const radius = baseRadius + bassWave + fixedWave;
        
        innerPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          angle
        });
      }
      
      ctx.beginPath();
      ctx.moveTo(outerPoints[0].x, outerPoints[0].y);
      for (let i = 1; i < outerPoints.length; i++) {
        ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
      }
      ctx.lineTo(outerPoints[0].x, outerPoints[0].y);
      
      for (let i = innerPoints.length - 1; i >= 0; i--) {
        ctx.lineTo(innerPoints[i].x, innerPoints[i].y);
      }
      ctx.closePath();
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, baseRadius - shellThickness,
        centerX, centerY, baseRadius + shellThickness * 2
      );
      gradient.addColorStop(0, `rgba(100, 220, 255, 0)`);
      gradient.addColorStop(0.3, `rgba(100, 220, 255, ${0.3 + bassNormalized * 0.3})`);
      gradient.addColorStop(0.7, `rgba(50, 150, 255, ${0.4 + bassNormalized * 0.2})`);
      gradient.addColorStop(1, `rgba(0, 100, 255, ${0.2})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = `rgba(150, 230, 255, ${0.6 + bassNormalized * 0.3})`;
      ctx.lineWidth = 2 + bassNormalized * 2;
      ctx.shadowBlur = 20 + bassNormalized * 30;
      ctx.shadowColor = `rgba(0, 200, 255, ${bassNormalized * 0.8})`;
      ctx.stroke();
      
      ctx.restore();
    }
  },

  // =============== Trap Nation Spectrum Ears (исправлен) ===============
 visualizeTrapLine: {
  name: 'Trap Nation: Stable Ring',
  icon: '〰️',
  config: {
    // Основные настройки
    baseRadius: { type: 'range', label: 'Радиус круга', min: 30, max: 200, step: 5, default: 90 },
    lineThickness: { type: 'range', label: 'Толщина линии', min: 1, max: 10, step: 0.5, default: 3 },
    lineColor: { type: 'color', label: 'Цвет линии', default: '#FFFFFF' },
    
    // Настройки волн
    waveHeight: { type: 'range', label: 'Высота волн', min: 5, max: 80, step: 2, default: 30 },
    waveWidth: { type: 'range', label: 'Ширина волновой зоны', min: 0.1, max: 1.0, step: 0.05, default: 0.3 },
    sensitivity: { type: 'range', label: 'Чувствительность', min: 0.5, max: 3.0, step: 0.1, default: 1.5 },
    smoothness: { type: 'range', label: 'Сглаживание', min: 0.1, max: 0.95, step: 0.05, default: 0.85 },
    
    // Позиция волн
    wavePosition: { 
      type: 'select', 
      label: 'Позиция волн', 
      options: [
        { value: 'sides', label: 'По бокам (лево/право)' },
        { value: 'bottom', label: 'Снизу' },
        { value: 'top', label: 'Сверху' },
        { value: 'all', label: 'Везде' }
      ], 
      default: 'sides' 
    },
    
    // Частотные настройки
    bassRange: { type: 'range', label: 'Диапазон частот (бас)', min: 1, max: 40, step: 1, default: 12 },
    
    // Логотип/изображение
    showCenter: { type: 'checkbox', label: 'Центральный элемент', default: true },
    centerPulse: { type: 'checkbox', label: 'Пульсация центра', default: true },
    centerScale: { type: 'range', label: 'Размер центра', min: 0.1, max: 1.0, step: 0.05, default: 0.6 },
  },

  // Буферы данных
  _waveData: null,
  _centerPulseData: 0,

  render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
    if (!config) return;

    const radius = config.baseRadius || 90;
    const waveH = config.waveHeight || 30;
    const waveW = config.waveWidth || 0.3;
    const sens = config.sensitivity || 1.5;
    const smooth = config.smoothness || 0.85;
    const bassRange = Math.min(config.bassRange || 12, dataArray.length - 1);

    // Инициализация буфера волн
    if (!this._waveData) {
      this._waveData = {
        left: new Float32Array(bassRange).fill(0),
        right: new Float32Array(bassRange).fill(0),
        bottom: new Float32Array(bassRange).fill(0),
        top: new Float32Array(bassRange).fill(0)
      };
    }

    // Обновление данных волн (только басы)
    for (let i = 0; i < bassRange; i++) {
      const rawValue = dataArray[i + 1] || 0; // Пропускаем DC компонент
      
      // Сглаживание для каждого направления
      this._waveData.left[i] = this._waveData.left[i] * smooth + rawValue * (1 - smooth);
      this._waveData.right[i] = this._waveData.right[i] * smooth + rawValue * (1 - smooth);
      this._waveData.bottom[i] = this._waveData.bottom[i] * smooth + rawValue * (1 - smooth);
      this._waveData.top[i] = this._waveData.top[i] * smooth + rawValue * (1 - smooth);
    }

    // Средний уровень для пульсации центра
    const avgLevel = this._waveData.left.reduce((a, b) => a + b, 0) / bassRange;
    this._centerPulseData = this._centerPulseData * 0.9 + (avgLevel / 255) * 0.1;

    ctx.save();
    
    // Стиль линии
    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = config.lineThickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = config.lineThickness * 1.5;
    ctx.shadowColor = config.lineColor;

    // Создаем путь кольца
    const points = [];
    const totalPoints = 360; // Высокая детализация для плавности
    
    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / totalPoints) * Math.PI * 2;
      let waveOffset = 0;
      
      // Определяем, в какой зоне мы находимся
      const normalizedAngle = ((angle + Math.PI * 2) % (Math.PI * 2));
      
      if (config.wavePosition === 'sides' || config.wavePosition === 'all') {
        // Левая сторона (π ± waveWidth)
        if (Math.abs(normalizedAngle - Math.PI) <= waveW * Math.PI) {
          const waveProgress = (waveW * Math.PI - Math.abs(normalizedAngle - Math.PI)) / (waveW * Math.PI);
          const dataIndex = Math.floor(waveProgress * (bassRange - 1));
          waveOffset = (this._waveData.left[dataIndex] / 255) * waveH * sens;
        }
        
        // Правая сторона (0 ± waveWidth)
        const rightDist = Math.min(normalizedAngle, Math.PI * 2 - normalizedAngle);
        if (rightDist <= waveW * Math.PI) {
          const waveProgress = (waveW * Math.PI - rightDist) / (waveW * Math.PI);
          const dataIndex = Math.floor(waveProgress * (bassRange - 1));
          waveOffset = (this._waveData.right[dataIndex] / 255) * waveH * sens;
        }
      }
      
      if (config.wavePosition === 'bottom' || config.wavePosition === 'all') {
        // Нижняя часть (π/2 ± waveWidth)
        if (Math.abs(normalizedAngle - Math.PI/2) <= waveW * Math.PI) {
          const waveProgress = (waveW * Math.PI - Math.abs(normalizedAngle - Math.PI/2)) / (waveW * Math.PI);
          const dataIndex = Math.floor(waveProgress * (bassRange - 1));
          waveOffset = (this._waveData.bottom[dataIndex] / 255) * waveH * sens;
        }
      }
      
      if (config.wavePosition === 'top' || config.wavePosition === 'all') {
        // Верхняя часть (3π/2 ± waveWidth)
        if (Math.abs(normalizedAngle - 3*Math.PI/2) <= waveW * Math.PI) {
          const waveProgress = (waveW * Math.PI - Math.abs(normalizedAngle - 3*Math.PI/2)) / (waveW * Math.PI);
          const dataIndex = Math.floor(waveProgress * (bassRange - 1));
          waveOffset = (this._waveData.top[dataIndex] / 255) * waveH * sens;
        }
      }
      
      const finalRadius = radius + waveOffset;
      
      points.push({
        x: centerX + Math.cos(angle) * finalRadius,
        y: centerY + Math.sin(angle) * finalRadius
      });
    }

    // Рисуем сглаженное кольцо
    ctx.beginPath();
    
    if (points.length > 2) {
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length];
        
        // Контрольная точка для сглаживания
        const cp1x = current.x;
        const cp1y = current.y;
        const endX = (current.x + next.x) / 2;
        const endY = (current.y + next.y) / 2;
        
        ctx.quadraticCurveTo(cp1x, cp1y, endX, endY);
      }
      
      ctx.closePath();
    }
    
    ctx.stroke();

    // Центральный элемент (для привязки изображения)
    if (config.showCenter) {
      const centerSize = radius * (config.centerScale || 0.6);
      const pulseOffset = config.centerPulse ? this._centerPulseData * 15 : 0;
      
      // Сохраняем масштаб и позицию для внешнего изображения
      state.centerX = centerX;
      state.centerY = centerY;
      state.centerScale = (centerSize + pulseOffset) / radius;
      state.pulseLevel = this._centerPulseData;
      
      // Рисуем placeholder (можно убрать, если используете изображение)
      ctx.fillStyle = config.lineColor;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerSize + pulseOffset, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }
},
visualizeSpectrumRings: {
  name: 'Trap Nation Rings',
  icon: '⭕',
  config: {
    vizScale: { type: 'range', label: 'Общий масштаб', min: 0.5, max: 2.5, step: 0.05, default: 1.0 },
    yOffset: { type: 'range', label: 'Смещение по Y', min: -150, max: 150, step: 5, default: -20 },
    baseRadius: { type: 'range', label: 'Базовый радиус', min: 30, max: 200, step: 5, default: 80 },
    waveHeight: { type: 'range', label: 'Высота волн', min: 10, max: 100, step: 2, default: 40 },
    
    segments: { type: 'range', label: 'Количество сегментов', min: 32, max: 256, step: 8, default: 128 },
    freqStart: { type: 'range', label: 'Частота начало', min: 0, max: 50, step: 1, default: 1 },
    freqEnd: { type: 'range', label: 'Частота конец', min: 20, max: 255, step: 1, default: 80 },
    sensitivity: { type: 'range', label: 'Чувствительность', min: 0.5, max: 3.0, step: 0.1, default: 1.5 },
    
    mirrorMode: { 
      type: 'select', 
      label: 'Режим симметрии', 
      options: [
        { value: 'none', label: 'Без зеркала' },
        { value: 'vertical', label: 'Вертикальное зеркало' },
        { value: 'horizontal', label: 'Горизонтальное зеркало' },
        { value: 'both', label: 'Полное зеркало' }
      ], 
      default: 'vertical' 
    },
    
    lineWidth: { type: 'range', label: 'Толщина линии', min: 0.5, max: 8, step: 0.5, default: 2 },
    lineColor: { type: 'color', label: 'Цвет линии', default: '#00FFFF' },
    glowIntensity: { type: 'range', label: 'Свечение', min: 0, max: 30, step: 1, default: 15 },
    
    showCenter: { type: 'checkbox', label: 'Центральная точка', default: true },
    centerSize: { type: 'range', label: 'Размер центра', min: 1, max: 10, step: 0.5, default: 3 },
    centerColor: { type: 'color', label: 'Цвет центра', default: '#FFFFFF' },
    
    smoothing: { type: 'range', label: 'Сглаживание', min: 0.1, max: 0.95, step: 0.05, default: 0.8 },
    beatPulse: { type: 'checkbox', label: 'Пульсация от бита', default: true },
  },

  render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
    if (!config) return;

    const vScale = config.vizScale || 1;
    const curY = centerY + (config.yOffset || 0) * vScale;
    const baseR = (config.baseRadius || 80) * vScale;
    const waveH = (config.waveHeight || 40) * vScale;
    const segments = config.segments || 128;

    // Инициализация
    if (!state.smoothedData || state.smoothedData.length !== segments) {
      state.smoothedData = new Float32Array(segments).fill(0);
    }

    ctx.save();
    ctx.translate(centerX, curY);

    // Пульсация от бита
    let pulseOffset = 0;
    if (config.beatPulse) {
      const bassSum = dataArray.slice(0, 8).reduce((a, b) => a + b, 0);
      const bassLevel = bassSum / (8 * 255);
      pulseOffset = bassLevel * baseR * 0.2;
    }

    // Подготовка данных
    const fStart = config.freqStart || 1;
    const fEnd = Math.min(config.freqEnd || 80, dataArray.length - 1);
    const freqRange = fEnd - fStart;
    
    // Заполнение данных с учетом зеркалирования
    for (let i = 0; i < segments; i++) {
      let dataValue = 0;
      
      if (config.mirrorMode === 'vertical') {
        // Вертикальное зеркало (левая половина = правая половина)
        const segmentPercent = (i / segments) * 2; // 0-2 диапазон
        let mappedPercent;
        
        if (segmentPercent <= 1) {
          // Первая половина (0-0.5 оборота)
          mappedPercent = segmentPercent;
        } else {
          // Вторая половина (0.5-1 оборота) - зеркалим
          mappedPercent = 2 - segmentPercent;
        }
        
        const freqIndex = Math.floor(fStart + mappedPercent * freqRange);
        dataValue = dataArray[Math.min(freqIndex, dataArray.length - 1)] || 0;
        
      } else if (config.mirrorMode === 'horizontal') {
        // Горизонтальное зеркало (верх = низ)
        const segmentPercent = i / segments;
        let mappedPercent;
        
        if (segmentPercent <= 0.5) {
          mappedPercent = segmentPercent * 2;
        } else {
          mappedPercent = (1 - segmentPercent) * 2;
        }
        
        const freqIndex = Math.floor(fStart + mappedPercent * freqRange);
        dataValue = dataArray[Math.min(freqIndex, dataArray.length - 1)] || 0;
        
      } else {
        // Обычный режим
        const segmentPercent = i / segments;
        const freqIndex = Math.floor(fStart + segmentPercent * freqRange);
        dataValue = dataArray[Math.min(freqIndex, dataArray.length - 1)] || 0;
      }
      
      // Сглаживание
      const smoothFactor = config.smoothing || 0.8;
      state.smoothedData[i] = 
        state.smoothedData[i] * smoothFactor + 
        dataValue * (1 - smoothFactor);
    }

    // Настройка рендеринга
    ctx.strokeStyle = config.lineColor || '#00FFFF';
    ctx.lineWidth = (config.lineWidth || 2) * vScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (config.glowIntensity > 0) {
      ctx.shadowColor = config.lineColor || '#00FFFF';
      ctx.shadowBlur = (config.glowIntensity || 0) * vScale;
    }

    // Рисуем волновое кольцо
    ctx.beginPath();
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2 - Math.PI / 2; // Начинаем сверху
      const dataIndex = i % segments;
      
      // Вычисляем высоту волны
      const amplitude = (state.smoothedData[dataIndex] / 255) * 
                       (config.sensitivity || 1.5);
      const waveOffset = amplitude * waveH;
      
      // Финальный радиус
      const radius = baseR + pulseOffset + waveOffset;
      
      // Координаты точки
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.stroke();

    // Центральная точка
    if (config.showCenter) {
      ctx.shadowBlur = (config.glowIntensity || 0) * 0.5 * vScale;
      ctx.fillStyle = config.centerColor || '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, (config.centerSize || 3) * vScale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
},
visualizeMultiRings: {
  name: 'Multi Spectrum Rings',
  icon: '🎯',
  config: {
    vizScale: { type: 'range', label: 'Масштаб', min: 0.5, max: 2, step: 0.05, default: 1.0 },
    yOffset: { type: 'range', label: 'Смещение Y', min: -100, max: 100, step: 5, default: 0 },
    
    ringCount: { type: 'range', label: 'Количество колец', min: 1, max: 8, step: 1, default: 3 },
    baseRadius: { type: 'range', label: 'Базовый радиус', min: 20, max: 150, step: 5, default: 60 },
    ringSpacing: { type: 'range', label: 'Расстояние между кольцами', min: 10, max: 80, step: 2, default: 25 },
    waveHeight: { type: 'range', label: 'Высота волн', min: 5, max: 60, step: 2, default: 20 },
    
    segments: { type: 'range', label: 'Детализация', min: 64, max: 360, step: 8, default: 180 },
    mirrorSymmetry: { type: 'checkbox', label: 'Зеркальная симметрия', default: true },
    
    lineWidth: { type: 'range', label: 'Толщина линий', min: 0.5, max: 6, step: 0.5, default: 1.5 },
    outerColor: { type: 'color', label: 'Цвет внешних колец', default: '#FF0080' },
    innerColor: { type: 'color', label: 'Цвет внутренних колец', default: '#00FFFF' },
    glowSize: { type: 'range', label: 'Размер свечения', min: 0, max: 20, step: 1, default: 8 },
  },

  render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
    if (!config) return;
    
    const vScale = config.vizScale || 1;
    const curY = centerY + (config.yOffset || 0) * vScale;
    const baseR = (config.baseRadius || 60) * vScale;
    const ringCount = config.ringCount || 3;
    const ringSpacing = (config.ringSpacing || 25) * vScale;
    const waveH = (config.waveHeight || 20) * vScale;
    const segments = config.segments || 180;
    
    if (!state.ringData) {
      state.ringData = Array.from({length: ringCount}, () => new Float32Array(segments).fill(0));
    }
    
    ctx.save();
    ctx.translate(centerX, curY);
    
    // Создаем градиент цветов для колец
    const colors = [];
    for (let ring = 0; ring < ringCount; ring++) {
      const t = ring / Math.max(1, ringCount - 1);
      colors.push(this.interpolateColor(config.innerColor, config.outerColor, t));
    }
    
    // Обрабатываем каждое кольцо
    for (let ring = 0; ring < ringCount; ring++) {
      const radius = baseR + ring * ringSpacing;
      const freqStart = Math.floor((ring / ringCount) * 40) + 1;
      const freqEnd = Math.min(freqStart + 30, dataArray.length - 1);
      
      // Обновляем данные для кольца
      for (let i = 0; i < segments; i++) {
        let segmentPercent = i / segments;
        
        if (config.mirrorSymmetry) {
          // Зеркальная симметрия
          if (segmentPercent > 0.5) {
            segmentPercent = 1 - segmentPercent;
          }
          segmentPercent *= 2; // Растягиваем на весь диапазон
        }
        
        const freqIdx = Math.floor(freqStart + segmentPercent * (freqEnd - freqStart));
        const rawValue = dataArray[Math.min(freqIdx, dataArray.length - 1)] || 0;
        
        // Сглаживание
        state.ringData[ring][i] = 
          state.ringData[ring][i] * 0.85 + rawValue * 0.15;
      }
      
      // Рисуем кольцо
      ctx.strokeStyle = colors[ring];
      ctx.lineWidth = (config.lineWidth || 1.5) * vScale;
      ctx.shadowColor = colors[ring];
      ctx.shadowBlur = (config.glowSize || 0) * vScale;
      
      ctx.beginPath();
      
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2 - Math.PI / 2;
        const dataIdx = i % segments;
        const amplitude = (state.ringData[ring][dataIdx] / 255) * 1.2;
        const finalRadius = radius + amplitude * waveH;
        
        const x = Math.cos(angle) * finalRadius;
        const y = Math.sin(angle) * finalRadius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
    }
    
    ctx.restore();
  },
  
  interpolateColor(color1, color2, t) {
    // Простая интерполяция цветов
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
},
  visualizeStarField: {
    name: 'StarField',
    icon: '✨',
    stars: null,
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
      const bass = (dataArray[2] || 0) / 255;
      
      if (!this.stars) {
        this.stars = Array(200).fill(0).map(() => ({
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 2000
        }));
      }

      ctx.save();
      ctx.fillStyle = "#fff";
      this.stars.forEach(s => {
        s.z -= 5 + bass * 20;
        if (s.z < 1) {
          s.z = 2000;
          s.x = (Math.random() - 0.5) * 2000;
          s.y = (Math.random() - 0.5) * 2000;
        }
        let proj = VisualizerLibrary.helpers.project3D(s.x, s.y, s.z, centerX, centerY, 600);
        const size = (1 - s.z / 2000) * 3 + bass * 2;
        ctx.globalAlpha = 1 - s.z / 2000;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }
  },

  // =============================================
  // 🧩 UI-ПАНЕЛЬ НАСТРОЕК (универсальная)
  // =============================================
  ui: {
    selectedKey: 'visualizeSpectrumEars',
    store: {}, // { key: configValues }
    init() {
      if (typeof document === 'undefined') return;
      if (document.getElementById('viz-panel')) return;

      // Кнопка-тогглер
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'viz-toggle';
      toggleBtn.textContent = '⚙ TrapNation UI';
      toggleBtn.style = `
        position: fixed; top: 12px; right: 12px; z-index: 9999;
        background:#20242a; color:#fff; border:1px solid #3a3f46; border-radius:8px;
        padding:8px 12px; cursor:pointer; font-family:system-ui, Arial; font-size:13px;
      `;
      document.body.appendChild(toggleBtn);

      const panel = document.createElement('div');
      panel.id = 'viz-panel';
      panel.style = `
        position: fixed; top: 48px; right: 12px; z-index: 9999;
        width: 300px; max-height: 70vh; overflow:auto;
        background: rgba(18,18,22,0.92); color: #eaeaea; border: 1px solid #3a3f46; border-radius: 10px;
        padding: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); display:none;
        font-family: system-ui, Arial; font-size: 13px;
      `;

      const header = document.createElement('div');
      header.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;">
        <strong>Visualizer Settings</strong>
        <button id="viz-close" style="background:#2a2f36;color:#fff;border:1px solid #3a3f46;border-radius:6px;padding:4px 8px;cursor:pointer;">Закрыть</button>
      </div>`;
      panel.appendChild(header);

      // Селектор визуализатора (показываем те, у кого есть config)
      const selectWrap = document.createElement('div');
      selectWrap.style.margin = '8px 0';
      const select = document.createElement('select');
      select.style = 'width:100%;background:#1b1f24;color:#fff;border:1px solid #3a3f46;border-radius:6px;padding:6px;';
      const keys = Object.keys(VisualizerLibrary).filter(k => {
        const v = VisualizerLibrary[k];
        return v && typeof v === 'object' && 'render' in v;
      });
      keys.forEach(k => {
        const option = document.createElement('option');
        option.value = k;
        option.textContent = `${VisualizerLibrary[k].icon || ''} ${VisualizerLibrary[k].name || k}`;
        if (k === this.selectedKey) option.selected = true;
        select.appendChild(option);
      });
      selectWrap.appendChild(select);
      panel.appendChild(selectWrap);

      const controls = document.createElement('div');
      controls.id = 'viz-controls';
      panel.appendChild(controls);

      document.body.appendChild(panel);

      // События
      toggleBtn.onclick = () => { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
      header.querySelector('#viz-close').onclick = () => { panel.style.display = 'none'; };
      select.onchange = (e) => {
        this.selectedKey = e.target.value;
        this._renderControls(controls);
      };

      // Инициализация контролов
      this._renderControls(controls);
    },

    _defaultsFor(key) {
      const v = VisualizerLibrary[key];
      const cfg = v && v.config ? v.config : null;
      const out = {};
      if (!cfg) return out;
      for (const prop in cfg) {
        const def = cfg[prop].default;
        out[prop] = def !== undefined ? def : null;
      }
      return out;
    },

    getConfigFor(key) {
      if (!this.store[key]) this.store[key] = this._defaultsFor(key);
      return this.store[key];
    },

    _renderControls(container) {
      container.innerHTML = '';
      const v = VisualizerLibrary[this.selectedKey];
      const cfg = v && v.config ? v.config : null;

      if (!cfg) {
        const p = document.createElement('div');
        p.textContent = 'Для выбранного визуализатора нет настраиваемых параметров.';
        container.appendChild(p);
        return;
      }

      const values = this.getConfigFor(this.selectedKey);

      const addControl = (label, node) => {
        const wrap = document.createElement('div');
        wrap.style = 'margin:8px 0;';
        const lbl = document.createElement('label');
        lbl.style = 'display:block;margin-bottom:4px;color:#cfd3da;';
        lbl.textContent = label;
        wrap.appendChild(lbl);
        wrap.appendChild(node);
        container.appendChild(wrap);
      };

      for (const key in cfg) {
        const c = cfg[key];
        let node;

        if (c.type === 'range') {
          const input = document.createElement('input');
          input.type = 'range';
          input.min = c.min; input.max = c.max; input.step = c.step;
          input.value = values[key];
          input.style = 'width:100%';
          const valOut = document.createElement('div');
          valOut.style = 'text-align:right;color:#9aa0a6;font-size:12px;';
          valOut.textContent = values[key];
          input.oninput = (e) => {
            const val = parseFloat(e.target.value);
            values[key] = val;
            valOut.textContent = val;
          };
          const wrap = document.createElement('div');
          wrap.appendChild(input);
          wrap.appendChild(valOut);
          node = wrap;
        } else if (c.type === 'color') {
          const input = document.createElement('input');
          input.type = 'color';
          input.value = values[key];
          input.style = 'width:100%;height:32px;background:#1b1f24;border:1px solid #3a3f46;border-radius:6px;';
          input.oninput = (e) => { values[key] = e.target.value; };
          node = input;
        } else if (c.type === 'text') {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = values[key];
          input.style = 'width:100%;background:#1b1f24;color:#fff;border:1px solid #3a3f46;border-radius:6px;padding:6px;';
          input.oninput = (e) => { values[key] = e.target.value; };
          node = input;
        } else {
          const span = document.createElement('span');
          span.textContent = '(неподдерживаемый тип)';
          node = span;
        }

        addControl(c.label || key, node);
      }

      const hint = document.createElement('div');
      hint.style = 'margin-top:10px;color:#8992a0;font-size:12px;';
      hint.textContent = 'Применение: в вашем рендер-цикле объединяйте baseConfig с VisualizerLibrary.getConfigFor(selectedKey).';
      container.appendChild(hint);
    }
  },

  // Возврат текущих значений конфига из UI
  getConfigFor(key) {
    return VisualizerLibrary.ui.getConfigFor(key);
  }
};

// Экспорт для использования в index.html и авто-монтаж UI
if (typeof window !== 'undefined') {
  window.VisualizerLibrary = VisualizerLibrary;
  // Автоматически добавить панель после загрузки DOM
  window.addEventListener('DOMContentLoaded', () => {
    try { VisualizerLibrary.ui.init(); } catch (e) { /* тихо игнорируем */ }
  });
}
