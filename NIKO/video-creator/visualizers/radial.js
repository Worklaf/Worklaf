export default function radial(ctx, centerX, centerY, dataArray, rotation) {
  const lines = 80;
  const maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4;
  
  for (let i = 0; i < lines; i++) {
    const angle = (i / lines) * Math.PI * 2 + rotation;
    const freqIndex = Math.floor(i / lines * dataArray.length);
    const value = dataArray[freqIndex] || 0;
    const lineLength = (value / 255) * maxRadius;
    
    const x = centerX + Math.cos(angle) * lineLength;
    const y = centerY + Math.sin(angle) * lineLength;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    
    const hue = (i / lines) * 360;
    ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
}
