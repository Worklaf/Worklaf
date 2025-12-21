// player.js
// Mini-player: switches tracks without navigation, increments plays on real start,
// syncs likes/dislikes between mini and top list, opens comments modal.

document.addEventListener('DOMContentLoaded', () => {
  const mini = document.getElementById('mini-player');
  const miniThumb = document.getElementById('mini-thumb');
  const miniTitle = document.getElementById('mini-title');
  const miniWaveContainer = document.getElementById('mini-wave');
  const miniPlay = document.getElementById('mini-play');
  const miniPrev = document.getElementById('mini-prev');
  const miniNext = document.getElementById('mini-next');
  const miniLike = document.getElementById('mini-like');
  const miniDislike = document.getElementById('mini-dislike');
  const miniComment = document.getElementById('mini-comment');
  const miniShare = document.getElementById('mini-share');
  const miniDownload = document.getElementById('mini-download');
  const miniVolume = document.getElementById('mini-volume');

  const commentsModal = document.getElementById('comments-modal');
  const commentsList = document.getElementById('comments-list');
  const commentInput = document.getElementById('comment-input');
  const commentSend = document.getElementById('comment-send');
  const commentCancel = document.getElementById('comment-cancel');

  const sidePanel = document.getElementById('side-panel');
  const sideTitle = document.getElementById('side-title');
  const sideContent = document.getElementById('side-content');
  const sideClose = document.getElementById('side-close');

  if (typeof WaveSurfer === 'undefined') console.error('WaveSurfer not loaded');

  function buildPlaylist() {
    return Array.from(document.querySelectorAll('.track')).map(n => ({
      src: n.dataset.src,
      title: n.dataset.title,
      thumb: n.querySelector('.thumb')?.src || '',
      lyrics: n.dataset.lyrics || ''
    }));
  }
  let playlist = buildPlaylist();

  const getCount = k => parseInt(localStorage.getItem(k) || '0', 10);
  const setCount = (k,v) => localStorage.setItem(k, String(v));
  const incCount = k => { const v = getCount(k)+1; setCount(k,v); return v; };

  let ws = null;
  let currentIndex = -1;
  const countedPlays = new Set();

  // expose current src/title for UI
  window.__CURRENT_SRC = null;
  window.__CURRENT_TITLE = null;

  function updateMiniUI(idx){
    if(idx < 0 || idx >= playlist.length) return;
    const item = playlist[idx];
    miniThumb.src = item.thumb || '';
    miniTitle.textContent = item.title || '';
    if(miniDownload) miniDownload.href = item.src || item.src || '#';
    window.__CURRENT_SRC = item.src;
    window.__CURRENT_TITLE = item.title;
    // sync like/dislike state
    if(window.__SITE_UI && typeof window.__SITE_UI.syncLikeFromTop === 'function') {
      try { window.__SITE_UI.syncLikeFromTop(item.src); } catch(e){}
    } else {
      const val = localStorage.getItem('like:user:' + item.src);
      if(miniLike) miniLike.classList.toggle('active', val === 'like');
      if(miniDislike) miniDislike.classList.toggle('active', val === 'dislike');
    }
  }

  function createWave(src, autoplay=false){
    if(!miniWaveContainer) { console.error('#mini-wave missing'); return; }
    if(ws){ try{ ws.destroy(); }catch(e){} ws = null; }
    ws = WaveSurfer.create({
      container: miniWaveContainer,
      waveColor: '#2b2b35',
      progressColor: '#ff4da6',
      cursorColor: '#fff',
      height: 48,
      responsive: true
    });
    ws.load(src);
    ws.on('ready', () => {
      if(miniVolume) ws.setVolume(parseFloat(miniVolume.value || 1));
      if(autoplay) ws.play();
    });
    ws.on('play', () => {
      setPlayIcon(true);
      const srcKey = playlist[currentIndex]?.src || null;
      if(srcKey && !countedPlays.has(srcKey)){
        countedPlays.add(srcKey);
        const total = incCount('plays:' + srcKey);
        // update top UI
        document.querySelectorAll('.play-count').forEach(el => { if(el.dataset.key === srcKey) el.querySelector('.num').textContent = total; });
        try { window.dispatchEvent(new CustomEvent('mini-play-started', { detail: { src: srcKey, total } })); } catch(e){}
      }
    });
    ws.on('pause', ()=> setPlayIcon(false));
    ws.on('finish', ()=> { setPlayIcon(false); playNext(); });
    ws.on('error', (err)=> console.error('WaveSurfer error', err));
  }

  function setPlayIcon(isPlaying){
    const svg = document.getElementById('mini-play-icon');
    if(!svg) return;
    if(isPlaying){ svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>'; miniPlay.classList.add('playing'); }
    else { svg.innerHTML = '<path d="M5 3v18l15-9L5 3z" fill="currentColor"/>'; miniPlay.classList.remove('playing'); }
  }

  function openMiniByIndex(idx, autoplay=false){
    if(idx < 0 || idx >= playlist.length) return;
    currentIndex = idx;
    updateMiniUI(idx);
    if(mini) mini.style.display = 'flex';
    countedPlays.delete(playlist[idx].src);
    createWave(playlist[idx].src, autoplay);
  }

  function playNext(){
    if(playlist.length === 0) return;
    const next = (currentIndex + 1) % playlist.length;
    openMiniByIndex(next, true);
  }
  function playPrev(){
    if(playlist.length === 0) return;
    const prev = (currentIndex - 1 + playlist.length) % playlist.length;
    openMiniByIndex(prev, true);
  }

  // Listen for UI track-play
  window.addEventListener('track-play', (e) => {
    const detail = e.detail || {};
    const idx = (typeof detail.index === 'number') ? detail.index : playlist.findIndex(p => p.src === detail.src);
    if(idx >= 0) openMiniByIndex(idx, true);
    else if(detail.src){
      playlist.push({ src: detail.src, title: detail.title || detail.src, thumb: detail.thumb || '' });
      openMiniByIndex(playlist.length - 1, true);
    }
  });

  // Controls
  if(miniPrev) miniPrev.addEventListener('click', (e)=> { e.preventDefault(); playPrev(); });
  if(miniNext) miniNext.addEventListener('click', (e)=> { e.preventDefault(); playNext(); });
  if(miniPlay) miniPlay.addEventListener('click', (e)=> { e.preventDefault(); if(ws) ws.playPause(); });

  if(miniVolume) miniVolume.addEventListener('input', (e)=> { if(ws) ws.setVolume(parseFloat(e.target.value)); });

  // Mini like/dislike toggle and sync top counts
  function updateTopCountsFromStorage(src){
    const likes = getCount('likes:' + src);
    const dislikes = getCount('dislikes:' + src);
    document.querySelectorAll('.likes-count').forEach(el => { if(el.dataset.key === src) el.querySelector('.num').textContent = likes; });
    document.querySelectorAll('.dislikes-count').forEach(el => { if(el.dataset.key === src) el.querySelector('.num').textContent = dislikes; });
  }

  if(miniLike){
    miniLike.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if(currentIndex < 0) return;
      const src = playlist[currentIndex].src;
      const userKey = 'like:user:' + src;
      const cur = localStorage.getItem(userKey);
      if(cur === 'like'){
        localStorage.removeItem(userKey);
        setCount('likes:' + src, Math.max(0, getCount('likes:' + src) - 1));
        miniLike.classList.remove('active');
      } else {
        if(cur === 'dislike') setCount('dislikes:' + src, Math.max(0, getCount('dislikes:' + src) - 1));
        localStorage.setItem(userKey, 'like');
        setCount('likes:' + src, getCount('likes:' + src) + 1);
        miniLike.classList.add('active');
        miniDislike.classList.remove('active');
      }
      updateTopCountsFromStorage(src);
      if(window.__SITE_UI && typeof window.__SITE_UI.syncLikeFromTop === 'function') window.__SITE_UI.syncLikeFromTop(src);
    });
  }

  if(miniDislike){
    miniDislike.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if(currentIndex < 0) return;
      const src = playlist[currentIndex].src;
      const userKey = 'like:user:' + src;
      const cur = localStorage.getItem(userKey);
      if(cur === 'dislike'){
        localStorage.removeItem(userKey);
        setCount('dislikes:' + src, Math.max(0, getCount('dislikes:' + src) - 1));
        miniDislike.classList.remove('active');
      } else {
        if(cur === 'like') setCount('likes:' + src, Math.max(0, getCount('likes:' + src) - 1));
        localStorage.setItem(userKey, 'dislike');
        setCount('dislikes:' + src, getCount('dislikes:' + src) + 1);
        miniDislike.classList.add('active');
        miniLike.classList.remove('active');
      }
      updateTopCountsFromStorage(src);
      if(window.__SITE_UI && typeof window.__SITE_UI.syncLikeFromTop === 'function') window.__SITE_UI.syncLikeFromTop(src);
    });
  }

  // Mini comment button opens comments modal for current track
  if(miniComment){
    miniComment.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const src = window.__CURRENT_SRC || playlist[currentIndex]?.src;
      const title = window.__CURRENT_TITLE || playlist[currentIndex]?.title || '';
      if(!src) return console.warn('No current track for comments');
      window.dispatchEvent(new CustomEvent('open-comments', { detail: { src, title } }));
    });
  }

  // Mini share button
  if(miniShare){
    miniShare.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const src = window.__CURRENT_SRC || playlist[currentIndex]?.src;
      const title = window.__CURRENT_TITLE || playlist[currentIndex]?.title || '';
      if(!src) return;
      const page = ''; // if you have per-track page, set it here
      const url = location.origin + '/' + page;
      if(navigator.share) navigator.share({ title: title || '', url }).catch(()=>{});
      else window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title||'')}`, '_blank');
    });
  }

  // Comments: open modal when UI dispatches open-comments
  window.addEventListener('open-comments', (e) => {
    const detail = e.detail || {};
    const src = detail.src;
    const title = detail.title || '';
    if(!src) return;
    if(!commentsModal) return;
    commentsModal.style.display = 'flex';
    commentsModal.setAttribute('aria-hidden','false');
    document.getElementById('comments-title').textContent = 'Comments — ' + title;
    renderComments(src);
    commentInput.value = '';
    commentInput.focus();

    commentSend.onclick = () => {
      const text = (commentInput.value || '').trim();
      if(!text) return;
      const arr = JSON.parse(localStorage.getItem('comments:' + src) || '[]');
      arr.unshift({ text, ts: Date.now() });
      localStorage.setItem('comments:' + src, JSON.stringify(arr));
      renderComments(src);
      commentInput.value = '';
    };
    commentCancel.onclick = () => {
      commentsModal.style.display = 'none';
      commentsModal.setAttribute('aria-hidden','true');
      commentSend.onclick = null;
      commentCancel.onclick = null;
    };
  });

  function renderComments(src){
    if(!commentsList) return;
    const arr = JSON.parse(localStorage.getItem('comments:' + src) || '[]');
    commentsList.innerHTML = arr.length ? arr.map(c => `<div style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.03)">${escapeHtml(c.text)}<div style="color:var(--muted);font-size:12px;margin-top:6px">${new Date(c.ts).toLocaleString()}</div></div>`).join('') : '<div style="color:var(--muted);padding:8px">No comments yet</div>';
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  // Rebuild playlist if DOM changed
  window.addEventListener('rebuild-playlist', () => { playlist = buildPlaylist(); });

  // Expose API for UI
  window.__SITE_UI = window.__SITE_UI || {};
  window.__SITE_UI.updatePlayCountUI = function(src, total){
    document.querySelectorAll('.play-count').forEach(el => { if(el.dataset.key === src) el.querySelector('.num').textContent = total; });
  };
  window.__SITE_UI.syncLikeFromTop = window.__SITE_UI.syncLikeFromTop || function(src){
    const val = localStorage.getItem('like:user:' + src);
    if(miniLike) miniLike.classList.toggle('active', val === 'like');
    if(miniDislike) miniDislike.classList.toggle('active', val === 'dislike');
  };

  console.log('player.js ready — playlist length:', playlist.length);
});
