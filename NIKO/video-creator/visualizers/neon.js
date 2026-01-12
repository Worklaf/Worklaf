export default function neon(ctx, dataArray, state) {
  const canvas = ctx.canvas;
  const centerY = canvas.height * (state.vizY / 100);
  const barWidth = (canvas.width / dataArray.length) * state.vizScale;
  const maxHeight = canvas.height * 0.4;
  
  ctx.save();
  
  for (let i = 0; i < dataArray.length; i++) {
    const value = dataArray[i];
    const height = (value / 255) * maxHeight;
    const x = i * barWidth;
    
    // Gradient
    const gradient = ctx.createLinearGradient(x, centerY, x, centerY - height);
    gradient.addColorStop(0, state.vizColor + '00');
    gradient.addColorStop(0.5, state.vizColor);
    gradient.addColorStop(1, '#ffffff');
    
    ctx.fillStyle = gradient;
    ctx.shadowBlur = state.vizGlow;
    ctx.shadowColor = state.vizColor;
    ctx.fillRect(x, centerY, barWidth - 2, -height);
    
    // Mirror
    ctx.fillRect(x, centerY, barWidth - 2, height);
  }
  
  ctx.restore();
}
