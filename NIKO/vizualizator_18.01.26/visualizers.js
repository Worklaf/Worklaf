// =============================================
// 🎨 БИБЛИОТЕКА ВИЗУАЛИЗАТОРОВ
// =============================================

const VisualizerLibrary = {
  // Вспомогательные функции
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
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.25 * state.vizScale;
      const bars = 180;
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
        ctx.lineWidth = 3;
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
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const outerRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.35 * state.vizScale;
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
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.25 * state.vizScale;
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
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.3 * state.vizScale;
      const bars = 90;
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
        const angle = (i / bars) * Math.PI * 2 + rotation * -1.5 * state.rotSpeed;
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
        ctx.lineWidth = 4;
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
    }
  },

  sphereCloud: {
    name: 'Sphere Cloud 3D',
    icon: '🫧',
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const points = 900;
      const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.22 * state.vizScale;
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

  waveformCircle: {
    name: 'Waveform Circle',
    icon: '🎵',
    render(ctx, centerX, centerY, dataArray, state, time, rotation) {
      const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.25 * state.vizScale;
      
      ctx.save();
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      bgGradient.addColorStop(0, 'rgba(0,150,255,0.2)');
      bgGradient.addColorStop(0.5, 'rgba(0,255,255,0.1)');
      bgGradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
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
      
      ctx.restore();
      ctx.shadowBlur = 0;
    }
  },

  // Добавьте остальные визуализаторы по аналогии...
};

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VisualizerLibrary;
}
