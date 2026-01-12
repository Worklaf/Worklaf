export default function stars(ctx, particles, dataArray) {
  const avgValue = dataArray ? dataArray.reduce((a, b) => a + b, 0) / dataArray.length : 0;
  const reactivity = avgValue / 255;
  
  particles.forEach(p => {
    // Мерцание
    p.opacity += p.twinkleSpeed;
    if (p.opacity > 1 || p.opacity < 0) {
      p.twinkleSpeed *= -1;
    }
    
    // Реакция на музыку
    const size = p.size * (1 + reactivity * 0.5);
    
    // Рисование звезды
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, p.opacity))})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#fff';
    ctx.fill();
    
    // Крестик (4 луча)
    const lineLength = size * 2;
    ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 5;
    
    ctx.beginPath();
    ctx.moveTo(p.x - lineLength, p.y);
    ctx.lineTo(p.x + lineLength, p.y);
    ctx.moveTo(p.x, p.y - lineLength);
    ctx.lineTo(p.x, p.y + lineLength);
    ctx.stroke();
  });
  
  ctx.shadowBlur = 0;
}
