import circular from './circular.js';
import radial from './radial.js';
import neon from './neon.js';
import cyberTunnel from './cyberTunnel.js';

const visualizers = {
  circular,
  radial,
  neon,
  cyberTunnel
};

export function renderVisualizer(type, ctx, dataArray, state) {
  const visualizer = visualizers[type];
  if (visualizer) {
    visualizer(ctx, dataArray, state);
  }
}

export default { renderVisualizer };
