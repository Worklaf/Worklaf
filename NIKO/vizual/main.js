// =============================================
// 🎯 CORE STATE & CONFIG
// =============================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let config = { width: 1920, height: 1080, fps: 30 };
let state = {
    visualizer: 'circular',
    bgColor: '#000000',
    bgBlur: 0, bgBright: 100,
    vizColor: '#00a2ff', vizGlow: 15, vizScale: 1, vizY: 0.5,
    partType: 'none', partAmount: 150,
    emblemSize: 0.3, emblemCircle: true
};

// Audio vars
let audioCtx, analyser, source, dataArray, audioBuffer;
let isPlaying = false, startTime = 0, pauseTime = 0, currentTime = 0, duration = 0;
let programmaticStop = false;

// Assets
let bgImage = null, emblemImage = null;
let time = 0;

// Recording
let mediaRecorder, recordedChunks = [], isRecording = false, recordDest = null;

// =============================================
// 🎵 AUDIO ENGINE
// =============================================
document.getElementById('audioFile').onchange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    if(audioCtx) audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    
    const arrayBuffer = await file.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    duration = audioBuffer.duration;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    currentTime = 0; pauseTime = 0;
    updateTimeDisplay();
};

function startPlayback() {
    if(!audioBuffer) return;
    if(audioCtx.state === 'suspended') audioCtx.resume();
    
    if(source) { programmaticStop = true; try{source.stop(0);}catch(e){} }
    
    source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    if(isRecording && recordDest) source.connect(recordDest);
    
    source.onended = () => {
        if(!programmaticStop) {
            isPlaying = false;
            document.getElementById('playBtn').textContent = '▶️';
            currentTime = 0; pauseTime = 0; updateTimeDisplay();
        }
        programmaticStop = false;
    };
    
    startTime = audioCtx.currentTime - pauseTime;
    source.start(0, pauseTime);
    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸️';
    animate();
}

function togglePlay() {
    if(!audioBuffer) return alert('Load audio first!');
    if(isPlaying) {
        isPlaying = false;
        document.getElementById('playBtn').textContent = '▶️';
        if(source) { programmaticStop = true; source.stop(0); }
        pauseTime = audioCtx.currentTime - startTime;
    } else {
        startPlayback();
    }
}

// =============================================
// 🎨 RENDER LOOP
// =============================================
function animate() {
    if(!isPlaying) return;
    requestAnimationFrame(animate);
    
    analyser.getByteFrequencyData(dataArray);
    currentTime = audioCtx.currentTime - startTime;
    updateTimeDisplay();
    time += 0.01;
    
    render();
}

function render() {
    const cx = config.width / 2;
    const cy = config.height * state.vizY;
    const bass = dataArray ? dataArray[2] : 0;
    
    // 1. BG
    ctx.fillStyle = state.bgColor;
    ctx.fillRect(0,0, config.width, config.height);
    
    if(bgImage) {
        ctx.save();
        const s = 1 + (bass/255)*0.05;
        ctx.filter = `blur(${state.bgBlur}px) brightness(${state.bgBright}%)`;
        ctx.translate(cx, config.height/2);
        ctx.scale(s, s);
        // Simple cover fit
        const aspect = bgImage.width/bgImage.height;
        let dw = config.width, dh = config.width/aspect;
        if(dh < config.height) { dh = config.height; dw = dh*aspect; }
        ctx.drawImage(bgImage, -dw/2, -dh/2, dw, dh);
        ctx.restore();
        ctx.filter = 'none';
    }

    // 2. Effects (Particles)
    Effects.draw(ctx, config.width, config.height, state.partType, state.partAmount, bass, time);

    // 3. Visualizer
    if(dataArray && Visualizers[state.visualizer]) {
        ctx.save();
        // Передаем time и state в визуализаторы
        Visualizers[state.visualizer](ctx, cx, cy, dataArray, state, time);
        ctx.restore();
    }

    // 4. Emblem
    if(emblemImage) {
        const sz = config.width * state.emblemSize * (1 + bass/1000);
        ctx.save();
        ctx.translate(config.width/2, config.height/2);
        if(state.emblemCircle) {
            ctx.beginPath(); ctx.arc(0,0,sz/2,0,Math.PI*2); ctx.clip();
        }
        ctx.drawImage(emblemImage, -sz/2, -sz/2, sz, sz);
        ctx.restore();
    }
}

// =============================================
// 🎞️ TIMELINE & RECORDING
// =============================================
function updateTimeDisplay() {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime % 60).toString().padStart(2,'0');
    document.getElementById('timeDisplay').textContent = `${min}:${sec} / ...`;
    const pct = duration ? (currentTime/duration)*100 : 0;
    document.getElementById('progress').style.width = pct + '%';
}

function seekTimeline(e) {
    if(!audioBuffer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    pauseTime = pct * duration;
    currentTime = pauseTime;
    updateTimeDisplay();
    if(isPlaying) startPlayback(); // Restart if playing
}

function toggleRecord() {
    if(isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        document.getElementById('recordBtn').textContent = '⏺️ Start Recording';
        document.getElementById('recIndicator').classList.remove('active');
    } else {
        if(!audioBuffer) return alert('Load audio!');
        recordedChunks = [];
        const stream = canvas.captureStream(config.fps);
        recordDest = audioCtx.createMediaStreamDestination();
        if(source) source.connect(recordDest); // Capture audio too
        stream.addTrack(recordDest.stream.getAudioTracks()[0]);
        
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {type:'video/webm'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'N1KO_Render.webm';
            a.click();
        };
        
        mediaRecorder.start();
        isRecording = true;
        document.getElementById('recordBtn').textContent = '⏹️ Stop & Save';
        document.getElementById('recIndicator').classList.add('active');
        pauseTime = 0; startPlayback(); // Start from beginning
    }
}

// =============================================
// ⚙️ UI EVENTS
// =============================================
function switchTab(t, el) {
    document.querySelectorAll('.tab, .tab-content').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-'+t).classList.add('active');
}
function selectViz(v, el) {
    state.visualizer = v;
    document.querySelectorAll('.viz-card').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
}
function updateResolution() {
    const [w,h] = document.getElementById('resolution').value.split(':').map(Number);
    config.width = w; config.height = h;
    canvas.width = w; canvas.height = h;
    Effects.init(w, h);
}

// Inputs
const ids = ['bgBlur','bgBright','vizColor','vizGlow','vizScale','vizY','partType','partAmount','emblemSize','emblemCircle','bgColor'];
ids.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener(el.type==='checkbox'?'change':'input', e => {
        state[id] = el.type==='checkbox' ? el.checked : el.value;
    });
});

// Images
['bgImage','emblemImage'].forEach(id => {
    document.getElementById(id).onchange = e => {
        const f = e.target.files[0];
        if(f) {
            const img = new Image();
            img.onload = () => { if(id==='bgImage') bgImage=img; else emblemImage=img; render(); };
            img.src = URL.createObjectURL(f);
        }
    };
});

// Init
canvas.width = config.width; canvas.height = config.height;
Effects.init(config.width, config.height);
// Initial render (black screen)
ctx.fillStyle='#000'; ctx.fillRect(0,0,config.width,config.height);
