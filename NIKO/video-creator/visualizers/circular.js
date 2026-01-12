export default function circular(ctx, centerX, centerY, dataArray, rotation) {
  const bars = 120;
  const radius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.25;
  
  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2 + rotation;
    const freqIndex = Math.floor(i / bars * dataArray.length);
    const value = dataArray[freqIndex] || 0;
    const barHeight = (value / 255) * (radius * 0.8);
    
    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
    const y2 = centerY + Math.sin(angle) * (radius + barHeight);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = `hsl(${(i / bars) * 360}, 100%, 60%)`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
}
