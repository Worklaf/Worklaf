export default function circular(ctx, dataArray, state) {
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height * (state.vizY / 100);
  
  const radius = Math.min(canvas.width, canvas.height) * 0.15 * state.vizScale;
  const barCount = 128;
  const barWidth = (Math.PI * 2 * radius) / barCount;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  
  for (let i = 0; i < barCount; i++) {
    const value = dataArray[Math.floor(i * dataArray.length / barCount)];
    const height = (value / 255) * radius * 1.5;
    const angle = (i / barCount) * Math.PI * 2;
    
    ctx.save();
    ctx.rotate(angle);
    
    // Bar
    ctx.fillStyle = state.vizColor;
    ctx.shadowBlur = state.vizGlow;
    ctx.shadowColor = state.vizColor;
    ctx.fillRect(radius, -barWidth / 2, height, barWidth);
    
    ctx.restore();
  }
  
  ctx.restore();
}
