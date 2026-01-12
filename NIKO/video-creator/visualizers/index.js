import circular from './circular.js';
import radial from './radial.js';
import neon from './neon.js';
import cyberTunnel from './cyberTunnel.js';

export const visualizers = {
  circular,
  radial,
  neon,
  tunnel: cyberTunnel
};

export function renderVisualizer(type, ctx, centerX, centerY, dataArray, rotation) {
  const visualizer = visualizers[type];
  if (visualizer) {
    visualizer(ctx, centerX, centerY, dataArray, rotation);
  }
}

export default { visualizers, renderVisualizer };
