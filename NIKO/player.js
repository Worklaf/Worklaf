// player.js - Updated for localStorage draft system
let wavesurfer;
let currentTrackIndex = -1;
let isPlaying = false;
let tracks = [];

// Initialize wavesurfer
function initWavesurfer() {
    wavesurfer = WaveSurfer.create({
        container: '#mini-wave',
        waveColor: '#bfc3d6',
        progressColor: '#ff4da6',
        cursorColor: '#00d1ff',
        barWidth: 2,
        barRadius: 3,
        barGap: 2,
        height: 48,
        normalize: true,
        partialRender: true,
        plugins: []
    });

    wavesurfer.on('ready', () => {
        document.getElementById('mini-play-icon').innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
    });

    wavesurfer.on('play', () => {
        isPlaying = true;
        document.getElementById('mini-play-icon').innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
    });

    wavesurfer.on('pause', () => {
        isPlaying = false;
        document.getElementById('mini-play-icon').innerHTML = '<path d="M5 3v18l15-9L5 3z"/>';
    });

    wavesurfer.on('finish', () => {
        playNext();
    });
}

// Play/pause toggle
function togglePlayPause() {
    if (wavesurfer && wavesurfer.getDuration() > 0) {
        wavesurfer.playPause();
    }
}

// Play specific track
function playTrack(index) {
    if (tracks.length === 0) return;
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    wavesurfer.load(track.audio);
    
    document.getElementById('mini-title').textContent = track.title;
    document.getElementById('mini-thumb').src = track.cover;
    document.getElementById('mini-download').href = track.audio;
    
    document.getElementById('mini-player').style.display = 'flex';
    
    // Update play count
    const playCount = localStorage.getItem(`plays:${track.audio}`) || 0;
    localStorage.setItem(`plays:${track.audio}`, parseInt(playCount) + 1);
    
    if (window.__SITE_UI && window.__SITE_UI.updatePlayCountUI) {
        window.__SITE_UI.updatePlayCountUI(track.audio, parseInt(playCount) + 1);
    }
}

// Play next track
function playNext() {
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
}

// Play previous track
function playPrev() {
    if (tracks.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initWavesurfer();
    
    // Load tracks from localStorage drafts
    try {
        const draftTracks = JSON.parse(localStorage.getItem('draftTracks') || '[]');
        tracks = draftTracks;
    } catch (e) {
        console.error('Error loading tracks:', e);
        tracks = [];
    }

    // Mini player controls
    document.getElementById('mini-play')?.addEventListener('click', togglePlayPause);
    document.getElementById('mini-next')?.addEventListener('click', playNext);
    document.getElementById('mini-prev')?.addEventListener('click', playPrev);

    // Volume control
    const volumeSlider = document.getElementById('mini-volume');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            if (wavesurfer) {
                wavesurfer.setVolume(parseFloat(e.target.value));
            }
        });
    }

    // Global play event listener
    window.addEventListener('track-play', (e) => {
        const trackIndex = e.detail.index;
        if (trackIndex >= 0 && trackIndex < tracks.length) {
            playTrack(trackIndex);
        }
    });

    // Like/dislike functionality for mini player
    document.getElementById('mini-like')?.addEventListener('click', () => {
        if (currentTrackIndex >= 0) {
            const track = tracks[currentTrackIndex];
            const userKey = `like:user:${track.audio}`;
            const current = localStorage.getItem(userKey);
            
            if (current === 'like') {
                localStorage.removeItem(userKey);
            } else {
                localStorage.setItem(userKey, 'like');
                if (current === 'dislike') {
                    // Remove dislike if switching to like
                    const dislikes = localStorage.getItem(`dislikes:${track.audio}`) || 0;
                    localStorage.setItem(`dislikes:${track.audio}`, Math.max(0, parseInt(dislikes) - 1));
                }
            }
            
            // Update UI
            if (window.__SITE_UI && window.__SITE_UI.syncLikeFromTop) {
                window.__SITE_UI.syncLikeFromTop(track.audio);
            }
        }
    });

    document.getElementById('mini-dislike')?.addEventListener('click', () => {
        if (currentTrackIndex >= 0) {
            const track = tracks[currentTrackIndex];
            const userKey = `like:user:${track.audio}`;
            const current = localStorage.getItem(userKey);
            
            if (current === 'dislike') {
                localStorage.removeItem(userKey);
            } else {
                localStorage.setItem(userKey, 'dislike');
                if (current === 'like') {
                    // Remove like if switching to dislike
                    const likes = localStorage.getItem(`likes:${track.audio}`) || 0;
                    localStorage.setItem(`likes:${track.audio}`, Math.max(0, parseInt(likes) - 1));
                }
            }
            
            // Update UI
            if (window.__SITE_UI && window.__SITE_UI.syncLikeFromTop) {
                window.__SITE_UI.syncLikeFromTop(track.audio);
            }
        }
    });
});

// Utility function to format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
