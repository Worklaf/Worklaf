export default function radial(ctx, dataArray, state) {
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height * (state.vizY / 100);
  
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4 * state.vizScale;
  const points = 256;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  
  // Outer wave
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const value = dataArray[Math.floor(i * dataArray.length / points)];
    const radius = maxRadius + (value / 255) * maxRadius * 0.5;
    const angle = (i / points) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  
  ctx.strokeStyle = state.vizColor;
  ctx.lineWidth = 3;
  ctx.shadowBlur = state.vizGlow;
  ctx.shadowColor = state.vizColor;
  ctx.stroke();
  
  // Inner fill
  ctx.fillStyle = state.vizColor + '33';
  ctx.fill();
  
  ctx.restore();
}
