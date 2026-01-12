// Глобальное состояние приложения
export const state = {
  // Audio
  audioContext: null,
  analyser: null,
  dataArray: null,
  source: null,
  audioElement: null,
  isPlaying: false,
  
  // Canvas
  canvas: null,
  ctx: null,
  
  // Config
  width: 1920,
  height: 1080,
  fps: 60,
  
  // Visualizer
  visualizerType: 'circular',
  vizColor: '#00d1ff',
  vizGlow: 20,
  vizScale: 1,
  vizY: 0.5,
  audioSmooth: 0.7,
  rotation: 0,
  
  // Background
  bgColor: '#000000',
  bgBlur: 0,
  bgBright: 100,
  bgReact: 0,
  bgImage: null,
  
  // Particles
  partType: 'none',
  partAmount: 50,
  particles: [],
  
  // Emblem
  emblemImage: null,
  emblemSize: 0.15,
  emblemX: 0.5,
  emblemY: 0.5,
  emblemCircle: false,
  
  // Layers
  layers: [],
  selectedLayer: null,
  layerIdCounter: 0,
  
  // Recording
  mediaRecorder: null,
  recordedChunks: [],
  isRecording: false,
  
  // Timeline
  timelineCanvas: null,
  timelineCtx: null
};

export default state;
