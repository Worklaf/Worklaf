/* =========  FEEDBACK-MODULE  ========= */
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();
let feedbackUnsub = {};

/* показываем модал «оставить отзыв» */
window.openFeedbackModal = function(projectId){
  const uid = getAuth().currentUser?.uid;
  if(!uid){ showToast('Войдите, чтобы оставить отзыв'); return; }
  buildFeedbackModal(projectId);
}

/* показываем список отзывов по проекту */
window.openFeedbackList = function(projectId){
  const uid = getAuth().currentUser?.uid;
  buildFeedbackListModal(projectId, uid);
}

/* ----------  фильтр «Не заходил»  ---------- */
const missedFilter = {
  key:'missed',
  test: function(p){
     const rec = window.arcData?.[p.id];
     if(!rec || !rec.lastClick) return true;            // ещё не заходили
     const d = new Date(rec.lastClick);
     const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);
     return d < weekAgo;                                // последний клик старше недели
  }
};

/* инжект фильтра в глобальный список фильтров */
if(window.currentFilters){
  const originalGetFiltered = window.getFilteredProjects;
  window.getFilteredProjects = function(search){
     let list = originalGetFiltered.call(this,search);
     if(window.currentFilters.status === 'missed'){
       list = list.filter(missedFilter.test);
     }
     return list;
  };
}

/* при каждом рендере обновляем счётчик «Не заходил» */
const originalRender = window.renderProjects;
window.renderProjects = function(list){
  originalRender.call(this,list);
  const missed = list.filter(missedFilter.test).length;
  const el = document.getElementById('countMissed');
  if(el) el.textContent = missed;
}

/* ----------  новые проекты = неделя  ---------- */
const originalIsToday = window.isToday;
window.isToday = function(ds){
  if(!ds) return false;
  const d = new Date(ds);
  const week = new Date(); week.setDate(week.getDate()-7);
  return d>=week;
};

/* ----------  модал отзыва  ---------- */
function buildFeedbackModal(projectId){
  const uid = getAuth().currentUser.uid;
  const html = `
  <div id="fbModal" class="modal active">
   <div class="modal-content modal-sm p-6">
    <h2 class="text-lg font-bold mb-4">Отзыв / предложение</h2>
    <select id="fbTopic" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-3 text-sm">
     <option>Баг</option><option>Улучшение</option><option>Новый гайд</option><option>Другое</option>
    </select>
    <textarea id="fbText" rows="4" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Текст..."></textarea>
    <div class="flex gap-3 mt-4">
     <button onclick="closeFeedbackModal()" class="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm">Отмена</button>
     <button onclick="sendFeedback('${projectId}')" class="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm font-bold">Отправить</button>
    </div>
   </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

window.closeFeedbackModal = function(){
  document.getElementById('fbModal')?.remove();
}

window.sendFeedback = async function(projectId){
  const uid = getAuth().currentUser.uid;
  const topic = document.getElementById('fbTopic').value;
  const text  = document.getElementById('fbText').value.trim();
  if(!text){ showToast('Введите текст'); return; }
  try{
    await addDoc(collection(db,'feedback'),{
      projectId, uid, topic, text,
      createdAt: new Date(),
      read:false
    });
    showToast('Отзыв отправлен');
    closeFeedbackModal();
    updateFeedbackCounters(projectId);
  }catch(e){ showToast('Ошибка отправки'); }
}

/* ----------  список отзывов  ---------- */
function buildFeedbackListModal(projectId, uid){
  const html = `
  <div id="fbListModal" class="modal active">
   <div class="modal-content modal-sm p-6">
    <div class="flex justify-between items-center mb-4">
     <h2 class="text-lg font-bold">Отзывы</h2>
     <button onclick="closeFeedbackListModal()" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div id="fbList" class="space-y-3 max-h-[60vh] overflow-y-auto pr-2"></div>
   </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  loadFeedbackList(projectId, uid);
}

window.closeFeedbackListModal = function(){
  document.getElementById('fbListModal')?.remove();
}

function loadFeedbackList(projectId, uid){
  const q = query(collection(db,'feedback'), where('projectId','==',projectId), orderBy('createdAt','desc'));
  feedbackUnsub[projectId] = onSnapshot(q, snap=>{
    const list = document.getElementById('fbList');
    if(snap.empty){ list.innerHTML = '<p class="text-slate-500 text-center py-8">Пока нет отзывов</p>'; return; }
    let html = '';
    snap.forEach(doc=>{
      const d = doc.data();
      const mine = d.uid === uid;
      const unread = !d.read && window.isAdminMode;
      html += `
      <div class="p-3 rounded-lg bg-slate-800/50 border border-slate-700 ${unread?'border-l-4 border-l-red-500':''}">
        <div class="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span class="font-medium">${mine?'Я':(d.uid.slice(0,6)+'…')}</span>
          <span>${window.formatTimeAgo(d.createdAt)}</span>
        </div>
        <div class="text-sm text-slate-300 mb-1"><strong>${d.topic}:</strong> ${d.text}</div>
        ${unread?'<button onclick="markFeedbackRead(\''+doc.id+'\')" class="text-xs text-blue-400 hover:text-blue-300">Отметить прочитанным</button>':''}
      </div>`;
    });
    list.innerHTML = html;
    updateFeedbackCounters(projectId);
  });
}

window.markFeedbackRead = async function(docId){
  await updateDoc(doc(db,'feedback',docId),{read:true});
}

/* ----------  счётчики на кнопке  ---------- */
function updateFeedbackCounters(projectId){
  const q = query(collection(db,'feedback'), where('projectId','==',projectId));
  onSnapshot(q,snap=>{
    const total = snap.size;
    const unread = snap.docs.filter(d=>!d.data().read).length;
    const cnt = document.querySelector(`.feedback-counter[data-project="${projectId}"]`);
    if(cnt){
      cnt.textContent = total;
      cnt.classList.toggle('unread', unread>0);
      cnt.title = `Отзывы: ${total} | непрочитанных: ${unread}`;
    }
  });
}

/* при первой отрисовке ставим счётчики */
document.addEventListener('DOMContentLoaded',()=>{
  projects.forEach(p=>updateFeedbackCounters(p.id));
});
