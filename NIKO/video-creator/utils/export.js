import { state } from '../core/state.js';

export function exportProject() {
  const project = {
    version: '1.0',
    width: state.width,
    height: state.height,
    bgColor: state.bgColor,
    bgBlur: state.bgBlur,
    bgBright: state.bgBright,
    bgZoom: state.bgZoom,
    visualizerType: state.visualizerType,
    vizColor: state.vizColor,
    vizGlow: state.vizGlow,
    vizScale: state.vizScale,
    vizY: state.vizY,
    particleType: state.particleType,
    particleAmount: state.particleAmount,
    layers: state.layers.map(l => ({
      ...l,
      image: l.image ? '[IMAGE_DATA]' : null // Can't serialize Image objects
    })),
    duration: state.duration
  };
  
  const json = JSON.stringify(project, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `niko-project-${Date.now()}.json`;
  a.click();
  
  console.log('💾 Project exported');
}

export function importProject(file) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const project = JSON.parse(e.target.result);
      
      // Apply settings
      state.width = project.width;
      state.height = project.height;
      state.bgColor = project.bgColor;
      state.bgBlur = project.bgBlur;
      state.bgBright = project.bgBright;
      state.bgZoom = project.bgZoom;
      state.visualizerType = project.visualizerType;
      state.vizColor = project.vizColor;
      state.vizGlow = project.vizGlow;
      state.vizScale = project.vizScale;
      state.vizY = project.vizY;
      state.particleType = project.particleType;
      state.particleAmount = project.particleAmount;
      
      // Note: Images won't be restored, user needs to re-add them
      state.layers = project.layers.filter(l => l.type === 'text');
      
      console.log('📂 Project imported');
      alert('Project loaded! (Note: images must be re-added)');
    } catch (error) {
      console.error('❌ Import error:', error);
      alert('Failed to import project file');
    }
  };
  
  reader.readAsText(file);
}

export default { exportProject, importProject };
