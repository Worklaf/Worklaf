export const CYBERPUNK_FONTS = [
  'Orbitron',
  'Rajdhani',
  'Audiowide',
  'Electrolize',
  'Saira',
  'Michroma',
  'Iceland',
  'Aldrich',
  'Share Tech Mono',
  'Courier New',
  'Arial Black'
];

export function loadFonts() {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;700&family=Audiowide&family=Electrolize&family=Saira:wght@400;700&family=Michroma&family=Iceland&family=Aldrich&family=Share+Tech+Mono&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  
  console.log('✅ Fonts loaded');
}

export default { CYBERPUNK_FONTS, loadFonts };
