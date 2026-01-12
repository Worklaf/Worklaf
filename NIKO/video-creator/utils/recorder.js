import { state } from '../core/state.js';

export function startRecording() {
  if (!state.canvas || state.isRecording) return false;
  
  try {
    const stream = state.canvas.captureStream(state.fps);
    
    // Add audio track if available
    if (state.audio && state.audioContext) {
      const audioDestination = state.audioContext.createMediaStreamDestination();
      state.source.connect(audioDestination);
      
      const audioTrack = audioDestination.stream.getAudioTracks()[0];
      if (audioTrack) {
        stream.addTrack(audioTrack);
      }
    }
    
    state.recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000 // 8 Mbps
    });
    
    state.recordedChunks = [];
    
    state.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        state.recordedChunks.push(e.data);
      }
    };
    
    state.recorder.onstop = () => {
      const blob = new Blob(state.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      
      // Download
      const a = document.createElement('a');
      a.href = url;
      a.download = `niko-video-${Date.now()}.webm`;
      a.click();
      
      state.recordedChunks = [];
      state.isRecording = false;
      
      console.log('✅ Recording saved!');
    };
    
    state.recorder.start();
    state.isRecording = true;
    
    console.log('🔴 Recording started...');
    return true;
  } catch (error) {
    console.error('❌ Recording error:', error);
    alert('Failed to start recording. Try a different browser.');
    return false;
  }
}

export function stopRecording() {
  if (state.recorder && state.isRecording) {
    state.recorder.stop();
    console.log('⏹️ Recording stopped');
    return true;
  }
  return false;
}

export function exportFrame() {
  if (!state.canvas) return;
  
  state.canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `niko-frame-${Date.now()}.png`;
    a.click();
  });
}

export default { startRecording, stopRecording, exportFrame };
