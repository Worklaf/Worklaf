export default function cyberTunnel(ctx, centerX, centerY, dataArray, rotation) {
  const canvas = ctx.canvas;
  const radius = Math.min(canvas.width, canvas.height) * 0.3;
  const bars = 90;
  const barWidth = 4;
  
  const neonColors = {
    pink: '#ff00e5',
    cyan: '#00e5ff'
  };
  
  
  // Внутренний круг с пульсацией
  const avgBass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  const pulseRadius = radius * 0.25 + (avgBass / 255) * 30;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
  ctx.fillStyle = neonColors.pink;
  ctx.shadowBlur = 30;
  ctx.shadowColor = neonColors.pink;
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Круговые полосы (туннель)
  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2 + rotation * -1;
    const freqIndex = Math.floor(i / bars * dataArray.length * 0.5);
    const value = dataArray[freqIndex] || 0;
    const barHeight = (value / 255) * (radius * 0.8);
    
    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
    const y2 = centerY + Math.sin(angle) * (radius + barHeight);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = barWidth;
    ctx.strokeStyle = neonColors.cyan;
    
    if (value > 150) {
      ctx.strokeStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fff';
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  // Концентрические кольца (эффект глубины)
  for (let ring = 1; ring <= 4; ring++) {
    const ringRadius = radius * (0.3 + ring * 0.15);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 - ring * 0.05})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  // Эффект "лучей" от центра
  const rayCount = 8;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + rotation * 2;
    const freqIndex = Math.floor(i / rayCount * dataArray.length * 0.3);
    const value = dataArray[freqIndex] / 255;
    
    if (value > 0.5) {
      const rayLength = radius * 1.5 * value;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * rayLength,
        centerY + Math.sin(angle) * rayLength
      );
      
      ctx.strokeStyle = `rgba(255, 0, 229, ${value * 0.5})`;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = neonColors.pink;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
}
