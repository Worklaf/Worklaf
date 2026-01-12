export default function neon(ctx, centerX, centerY, dataArray, rotation) {
  const avgValue = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
  const baseRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.2;
  const radius = baseRadius + (avgValue / 255) * 100;
  
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(255, 0, 229, 1)');
  gradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.shadowBlur = 50;
  ctx.shadowColor = '#00e5ff';
  ctx.fill();
  
  ctx.shadowBlur = 0;
  
  const points = 64;
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2 + rotation;
    const freqIndex = Math.floor(i / points * dataArray.length);
    const value = dataArray[freqIndex] || 0;
    const r = radius + (value / 255) * 50;
    
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#fff';
  ctx.stroke();
  
  ctx.shadowBlur = 0;
}
