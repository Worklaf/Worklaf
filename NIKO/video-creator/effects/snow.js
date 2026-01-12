export default function snow(ctx, particles, dataArray) {
  const canvas = ctx.canvas;
  const avgValue = dataArray ? dataArray.reduce((a, b) => a + b, 0) / dataArray.length : 0;
  const reactivity = avgValue / 255;
  
  particles.forEach(p => {
    // Обновление позиции
    p.y += p.speedY * (1 + reactivity * 0.5);
    p.x += p.speedX;
    
    // Wrap around
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    
    // Рисование снежинки
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  });
  
  ctx.shadowBlur = 0;
}
