// ===== EFFECTS.JS =====

import { hexToRgba } from './visualizers.js';

export class EffectsEngine {
  constructor() {
    this.particles = [];
  }

  initParticles(count, width, height) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        angle: Math.random() * Math.PI * 2,
        hue: Math.random() * 360,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        noteType: Math.floor(Math.random() * 3),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  drawParticles(ctx, type, amount, bass, time, width, height, vizGlow) {
    if (type === 'none' || amount === 0) return;
    
    const count = Math.min(amount, this.particles.length);

    switch(type) {
      case 'snow':
        this.drawSnow(ctx, count, bass, height, width);
        break;
      case 'stars':
        this.drawStars(ctx, count, time, height, width);
        break;
      case 'bubbles':
        this.drawBubbles(ctx, count, bass, height, width);
        break;
      case 'fireflies':
        this.drawFireflies(ctx, count, time, width, height);
        break;
      case 'matrix':
        this.drawMatrix(ctx, count, height, width);
        break;
      case 'hearts':
        this.drawHearts(ctx, count, height, width);
        break;
      case 'notes':
        this.drawNotes(ctx, count, time, height, width);
        break;
      case 'glitter':
        this.drawGlitter(ctx, count, bass, width, height);
        break;
      case 'plasma':
        this.drawPlasma(ctx, count, time, vizGlow, width, height);
        break;
      case 'roses':
        this.drawRoses(ctx, count, time, bass, height, width);
        break;
      case 'butterflies':
        this.drawButterflies(ctx, count, time, height, width);
        break;
    }
  }

  drawSnow(ctx, count, bass, height, width) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 + bass / 500), 0, Math.PI * 2);
      ctx.fill();
      p.y += p.speed * (1 + bass / 200);
      p.x += Math.sin(p.angle) * 0.5;
      p.angle += 0.01;
      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
    }
  }

  drawStars(ctx, count, time, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      const sparkle = Math.sin(time * 5 + i) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255,255,200,${p.opacity * sparkle})`;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
      p.angle += 0.02;
      p.y += p.speed * 0.3;
      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
    }
  }

  drawBubbles(ctx, count, bass, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2 + bass / 100, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      gradient.addColorStop(0, `rgba(255,255,255,${p.opacity * 0.3})`);
      gradient.addColorStop(0.7, `rgba(100,200,255,${p.opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(50,150,255,0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
      p.y -= p.speed;
      p.x += Math.sin(p.angle) * 2;
      p.angle += 0.05;
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
    }
  }

  drawFireflies(ctx, count, time, width, height) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      const glow = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,100,${glow})`;
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(255,255,0,${glow})`;
      ctx.fill();
      p.x += Math.cos(p.angle) * 2;
      p.y += Math.sin(p.angle) * 2;
      p.angle += (Math.random() - 0.5) * 0.2;
      if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.angle = Math.random() * Math.PI * 2;
      }
    }
    ctx.shadowBlur = 0;
  }

  drawMatrix(ctx, count, height, width) {
    ctx.font = '12px monospace';
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.fillStyle = `rgba(0,255,0,${p.opacity * (1 - p.y / height)})`;
      ctx.fillText(p.char, p.x, p.y);
      p.y += p.speed * 3;
      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
        p.char = String.fromCharCode(0x30A0 + Math.random() * 96);
      }
    }
  }

  drawHearts(ctx, count, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.size * 0.5, p.size * 0.5);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.bezierCurveTo(-5, -10, -10, -5, -10, 0);
      ctx.bezierCurveTo(-10, 5, -5, 10, 0, 15);
      ctx.bezierCurveTo(5, 10, 10, 5, 10, 0);
      ctx.bezierCurveTo(10, -5, 5, -10, 0, -5);
      ctx.fill();
      ctx.restore();
      p.y -= p.speed;
      p.x += Math.sin(p.angle) * 1;
      p.angle += 0.05;
      p.hue = (p.hue + 1) % 360;
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
    }
  }

  drawNotes(ctx, count, time, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(time + i) * 0.2);
      ctx.font = `${p.size * 10}px Arial`;
      ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
      const notes = ['♪', '♫', '♬'];
      ctx.fillText(notes[p.noteType], 0, 0);
      ctx.restore();
      p.y -= p.speed;
      p.x += Math.sin(p.angle) * 2;
      p.angle += 0.03;
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
    }
  }

  drawGlitter(ctx, count, bass, width, height) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      const sparkle = Math.random();
      if (sparkle > 0.95) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        const size = p.size * (1 + bass / 200);
        ctx.strokeStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.stroke();
        ctx.restore();
      }
      p.x = (p.x + p.speed * Math.cos(p.angle)) % width;
      p.y = (p.y + p.speed * Math.sin(p.angle)) % height;
      p.angle += (Math.random() - 0.5) * 0.1;
      p.hue = (p.hue + 2) % 360;
    }
  }

  drawPlasma(ctx, count, time, vizGlow, width, height) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      const plasma = Math.sin(time * 2 + i) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3 * plasma, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `hsla(${p.hue + plasma * 60}, 100%, 50%, ${p.opacity})`);
      gradient.addColorStop(0.5, `hsla(${p.hue + 30}, 100%, 40%, ${p.opacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 100%, 30%, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.angle += 0.1;
      p.hue = (p.hue + 1) % 360;
      if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
        p.x = width / 2 + (Math.random() - 0.5) * 100;
        p.y = height / 2 + (Math.random() - 0.5) * 100;
        p.angle = Math.random() * Math.PI * 2;
      }
    }
  }

  drawRoses(ctx, count, time, bass, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.size * 0.8, p.size * 0.8);
      
      // Рисуем розу
      for (let petal = 0; petal < 5; petal++) {
        ctx.save();
        ctx.rotate((petal / 5) * Math.PI * 2);
        ctx.fillStyle = `hsla(340, 100%, 50%, ${p.opacity * 0.8})`;
        ctx.beginPath();
        ctx.ellipse(0, -5, 4, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      // Центр
      ctx.fillStyle = `hsla(50, 100%, 60%, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      p.y -= p.speed * 0.5;
      p.x += Math.sin(p.angle) * 1;
      p.rotation += p.rotSpeed;
      p.angle += 0.03;
      
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
    }
  }

  drawButterflies(ctx, count, time, height, width) {
    for (let i = 0; i < count; i++) {
      let p = this.particles[i];
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
      const wingFlap = Math.sin(time * 10 + i) * 0.3 + 0.7;
      
      // Левое крыло
      ctx.save();
      ctx.scale(wingFlap, 1);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity * 0.7})`;
      ctx.beginPath();
      ctx.ellipse(-4, 0, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Правое крыло
      ctx.save();
      ctx.scale(-wingFlap, 1);
      ctx.fillStyle = `hsla(${p.hue + 30}, 100%, 50%, ${p.opacity * 0.7})`;
      ctx.beginPath();
      ctx.ellipse(-4, 0, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Тело
      ctx.fillStyle = `rgba(50,50,50,${p.opacity})`;
      ctx.fillRect(-1, -3, 2, 6);
      
      ctx.restore();
      
      p.x += Math.cos(p.angle) * p.speed * 2;
      p.y += Math.sin(p.angle) * p.speed * 2 - 0.5;
      p.angle += Math.sin(time * 2 + i) * 0.1;
      p.hue = (p.hue + 0.5) % 360;
      
      if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
        p.x = Math.random() * width;
        p.y = height + 20;
        p.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      }
    }
  }

  drawFlicker(ctx, enabled, bass, width, height) {
    if (enabled && bass > 200) {
      ctx.fillStyle = `rgba(255,255,255,${(bass - 200) / 500})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawVignette(ctx, enabled, width, height) {
    if (!enabled) return;
    
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 2
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}
