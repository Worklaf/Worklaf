// Глобальное состояние приложения
export const state = {
  // Canvas
  canvas: null,
  ctx: null,
  width: 1920,
  height: 1080,
  
  // Audio
  audio: null,
  audioContext: null,
  analyser: null,
  dataArray: null,
  bufferLength: 0,
  source: null,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  
  // Background
  bgColor: '#1a0033',
  bgImage: null,
  bgImageOpacity: 1,
  bgBlur: 0,
  bgBright: 100,
  bgZoom: 1.0,
  
  // Visualizer
  visualizerType: 'circular',
  vizColor: '#ff00ff',
  vizGlow: 20,
  vizScale: 1.0,
  vizY: 50,
  audioSmoothing: 0.8,
  
  // Particles
  particleType: 'none',
  particleAmount: 50,
  particles: [],
  
  // Layers
  layers: [],
  selectedLayer: null,
  layerIdCounter: 1,
  
  // Timeline
  timelineScale: 100, // pixels per second
  timelineOffset: 0,
  isDraggingPlayhead: false,
  
  // Recording
  recorder: null,
  isRecording: false,
  recordedChunks: [],
  
  // FPS
  fps: 60,
  
  // Transform
  isDragging: false,
  isResizing: false,
  dragStartX: 0,
  dragStartY: 0,
  resizeHandle: null,
  initialBounds: null
};

export default state;
