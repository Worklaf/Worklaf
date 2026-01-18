// =============================================
// 🎨 БИБЛИОТЕКА ВИЗУАЛИЗАТОРОВ N1K∅
// =============================================

const VisualizerLibrary = {
  // =============================================
  // 🔧 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // =============================================
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

  visualizeSpeedTunnel: {
    name: 'SpeedTunnel',
    icon: '🚄',
    render(ctx, centerX, centerY, dataArray, state, time, rotation, config) {
     // Центр светится синим
    ctx.shadowBlur = 50;
    ctx.shadowColor = '#0066ff';
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Рисуем бары по спирали от центра к краям
    const count = 80;
    const layers = 5; // Слои глубины
    
    for(let l=0; l<layers; l++) {
        const depth = 1 - (l/layers); // 1 = близко, 0 = далеко
        const radius = (100 + l * 80) * state.vizScale; 
        
        for(let i=0; i<count; i++) {
            // Берем данные, смещаясь по спектру для разных слоев
            const idx = (i + l*10) % dataArray.length;
            const val = dataArray[idx] || 0;
            if(val < 50) continue;

            const angle = (i/count) * Math.PI * 2 + rotation * (l+1); // Слои вращаются с разной скоростью
            
            const barW = 10 * depth;
            const barH = (val/255) * 40 * depth;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Поворачиваем контекст чтобы бар смотрел из центра
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Цвета радуги по кругу
            const hue = (i/count)*360 + l*50;
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${depth})`;
            
            ctx.fillRect(0, -barW/2, barH, barW); // Рисуем прямоугольник
            ctx.restore();
        }
      ]
      ]
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

visualizeStarField: {
    name: 'StarField',
    icon: '✨',
    stars: null, // Храним звезды между кадрами
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
  }
};

// Экспорт для использования в index.html
if (typeof window !== 'undefined') {
  window.VisualizerLibrary = VisualizerLibrary;
}
