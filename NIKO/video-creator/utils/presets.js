export const CYBERPUNK_PRESETS = {
  neonPurple: {
    name: '🟣 Neon Purple',
    bgColor: '#1a0033',
    vizColor: '#ff00ff',
    vizGlow: 30,
    particleType: 'stars'
  },
  cyberBlue: {
    name: '🔵 Cyber Blue',
    bgColor: '#001a33',
    vizColor: '#00ffff',
    vizGlow: 25,
    particleType: 'snow'
  },
  toxicGreen: {
    name: '🟢 Toxic Green',
    bgColor: '#0a1a0a',
    vizColor: '#00ff00',
    vizGlow: 35,
    particleType: 'none'
  },
  bloodRed: {
    name: '🔴 Blood Red',
    bgColor: '#1a0000',
    vizColor: '#ff0000',
    vizGlow: 40,
    particleType: 'none'
  },
  matrix: {
    name: '💚 Matrix',
    bgColor: '#000000',
    vizColor: '#00ff41',
    vizGlow: 20,
    particleType: 'stars'
  },
  synthwave: {
    name: '🌆 Synthwave',
    bgColor: '#2b1055',
    vizColor: '#ff00de',
    vizGlow: 35,
    particleType: 'stars'
  }
};

export function applyPreset(presetKey, state) {
  const preset = CYBERPUNK_PRESETS[presetKey];
  if (!preset) return;
  
  state.bgColor = preset.bgColor;
  state.vizColor = preset.vizColor;
  state.vizGlow = preset.vizGlow;
  state.particleType = preset.particleType;
  
  console.log('✅ Preset applied:', preset.name);
}

export default { CYBERPUNK_PRESETS, applyPreset };
