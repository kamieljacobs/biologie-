// ===== Player =====
const DATA = window.FILMDATA;
const params = new URLSearchParams(location.search);
const state = {
  niveau: params.get('niveau')==='havo' ? 'havo' : 'vwo',
  modus: params.get('modus')==='klas' ? 'klas' : 'leerling',
  auto: false, captions: true,
  playing:false, t:0, items:[], idx:0, local:0,
  qPhase:null, // {phase:'countdown'|'wait'|'reveal', start, chosen}
  board:[0,0,0,0,0,0]
};
const CARD_DUR=3.5, TITLE_DUR=5, END_DUR=9, COUNTDOWN=8, REVEAL=6;

// ---- build timeline ----
function buildTimeline(){
  const items=[]; let prevChapter=null;
  for(const seg of DATA.segments){
    if(state.niveau==='havo' && seg.level==='vwo') continue;
    if(seg.kind==='title'){ items.push({type:'title',seg,dur:TITLE_DUR,level:'basis',chapter:seg.chapter}); prevChapter=seg.chapter; continue; }
    if(seg.kind==='card'){ items.push({type:'end',seg,dur:END_DUR,level:'basis',chapter:seg.chapter}); continue; }
    if(seg.chapter!==prevChapter && seg.chapter!=='Cold open'){ items.push({type:'card',chapter:seg.chapter,dur:CARD_DUR,level:'basis'}); prevChapter=seg.chapter; }
    if(seg.kind==='speech') items.push({type:'speech',seg,dur:seg.dur,level:seg.level,chapter:seg.chapter});
    else if(seg.kind==='question') items.push({type:'question',seg,dur:COUNTDOWN+REVEAL,level:seg.level,chapter:seg.chapter});
  }
  let t=0; for(const it of items){ it.start=t; t+=it.dur; } state.items=items; state.total=t;
  // board cue times (global): slot -> time
  const cue=(id,word,n=1)=>{ const it=items.find(i=>i.seg&&i.seg.id===id); if(!it) return Infinity; const q=makeQ(it.seg); return it.start+q.at(word,n); };
  state.boardTimes=[cue('s09','opbouwkant'), cue('s09','Groeien'), cue('s07','voortplanten'), cue('s21','Bewegen'), cue('s21','Reageren'), cue('s20','homeostase')];
}
function makeQ(seg){
  const words=seg.words||[]; const norm=s=>s.toLowerCase().replace(/[^a-zà-ÿ0-9]/g,'');
  const cache={};
  return { at(w,n=1){ const key=w+'|'+n; if(key in cache) return cache[key]; let c=0; const nw=norm(w); for(const x of words){ if(norm(x.t).includes(nw)){ c++; if(c===n){ cache[key]=x.s; return x.s; } } } cache[key]=Infinity; return Infinity; },
           on(w,n=1,d=0.6){ return ramp(this.localT, this.at(w,n), d); }, localT:0 };
}

// ---- canvas ----
const canvas=document.getElementById('stage'); const ctx=canvas.getContext('2d');
canvas.width=W; canvas.height=H;
function render(){
  const it=state.items[state.idx]; if(!it) return; const t=state.local; const gt=it.start+t;
  for(let i=0;i<6;i++) state.board[i]=ramp(gt,state.boardTimes[i],1.0);
  ctx.save();
  if(it.type==='title') drawTitle(ctx,t);
  else if(it.type==='card') drawChapterCard(ctx,it,t);
  else if(it.type==='end') drawEnd(ctx,it,t);
  else if(it.type==='question') drawQuestion(ctx,it,t);
  else { const q=makeQ(it.seg); q.localT=t; const fn=SCENES[it.seg.id]; if(fn) fn(ctx,t,q,state); else bg(ctx,'schema'); if(!['s01','s04','s11','s13','s17','s22','s26','s27'].includes(it.seg.id)) board(ctx,state.board,0.92); }
  // UI layer: vwo marker
  if(it.level==='vwo'){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',24); }
  // series/level meta top-left (non-vwo items)
  else if(it.type!=='title') metaText(ctx, (state.niveau==='havo'?'havo':'havo · vwo')+' · cel 2/3',60,46,C.text2,'left',20);
  // captions
  if(state.captions && it.type==='speech') drawCaption(ctx,it.seg,t);
  ctx.restore();
}
function drawTitle(ctx,t){ bg(ctx,'micro'); const a=ramp(t,0.2,0.8);
  ctx.save(); ctx.globalAlpha=a; text(ctx,'Celorganellen',120,360,fTitel(120),C.text); text(ctx,'Een fabriek die leeft',120,440,fTekst(44),C.text2);
  ctx.font=fTekst(34); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,'Hoe krijgt één cel het voor elkaar om enzymen te maken en netjes naar buiten te brengen?',120,540,760,44);
  metaText(ctx,(state.niveau==='havo'?'HAVO':'HAVO · VWO')+' · CEL 2/3',W-80,60,C.text2,'right',24); ctx.restore();
  const L=cellLayout(1420,540,400,250); ctx.save(); ctx.globalAlpha=ramp(t,0.6,1); drawCell(ctx,L,t,{motion:0.3}); ctx.restore(); }
function drawChapterCard(ctx,it,t){ bg(ctx,'schema'); const a=ramp(t,0.1,0.5)*(1-ramp(t,it.dur-0.5,0.5)); ctx.save(); ctx.globalAlpha=a;
  const m=it.chapter.match(/^(Hoofdstuk [^—]+)—\s*(.*)$/); const num=m?m[1].trim():''; const title=m?m[2]:it.chapter;
  if(num) metaText(ctx,num,W/2,430,C.grain,'center',30); text(ctx,title,W/2,540,fTitel(72),C.text,'center');
  const mini={'Hoofdstuk 1':'Wat moet één cel allemaal kunnen?','Hoofdstuk 1b':'Hoe ziet een kliercel eruit?','Hoofdstuk 2':'Waar liggen de bouwtekeningen?','Hoofdstuk 3':'Hoe wordt een eiwit gemaakt en verpakt?','Hoofdstuk 4':'Waar komt de energie vandaan?','Hoofdstuk 5':'Hoe blijft een cel schoon en stevig?','Hoofdstuk 6':'Wat gaat erin, eruit, en wat beweegt?','Hoofdstuk 7':'Wat heeft een plantencel extra?','Recap':'Wat hebben we gezien?'}[num||it.chapter];
  if(mini) text(ctx,mini,W/2,620,fTekst(36),C.text2,'center'); ctx.restore(); }
function drawEnd(ctx,it,t){ bg(ctx,'schema'); const lines=it.seg.lines; lines.forEach((l,i)=>{ const a=ramp(t,0.3+i*1.2,0.6); ctx.save(); ctx.globalAlpha=a; text(ctx,l,W/2,380+i*120,fTekst(44,600),C.text,'center'); ctx.restore(); });
  haak(ctx,400,1520,740,'een fabriek die leeft',C.groen,ramp(t,4.2,0.6)); metaText(ctx,'biologie bij kamiel · voice: roos (elevenlabs) · versie 1.2 · oktober 2026',W/2,CAPTION_Y-20,C.text2,'center',22); }
function drawQuestion(ctx,it,t){
  bg(ctx,'schema'); const seg=it.seg; const ph=state.qPhase||{phase:'countdown',start:0};
  text(ctx,'Wat denk je?',120,200,fTitel(64),C.text); ctx.font=fTekst(40,600); ctx.fillStyle=C.text; wrap(ctx,seg.q,120,290,1680,52);
  const revealed = ph.phase==='reveal';
  seg.options.forEach((o,i)=>{ const y=430+i*112; const chosen=ph.chosen===i; const correct=i===seg.correct;
    roundRect(ctx,120,y,1680,96,14); let fill=C.fill, stroke=C.line;
    if(revealed){ if(correct){ fill=rgba(C.groen,0.25); stroke=C.groen; } else if(chosen){ fill=rgba(C.koraal,0.25); stroke=C.koraal; } }
    else if(chosen){ stroke=C.goud; }
    shape(ctx,fill,stroke,1.5); text(ctx,String.fromCharCode(97+i),160,y+62,fMeta(32),C.grain); text(ctx,o,220,y+62,fTekst(36),C.text);
    if(revealed&&correct){ ctx.fillStyle=C.groen; ctx.beginPath(); ctx.arc(1750,y+48,12,0,6.283); ctx.fill(); }
  });
  if(ph.phase==='countdown'){ const u=clamp((t-ph.start)/COUNTDOWN,0,1); ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(120,CAPTION_Y-40); ctx.lineTo(120+1680*(1-u),CAPTION_Y-40); ctx.stroke(); metaText(ctx,'denk na…',120,CAPTION_Y-60,C.grain,'left',24); }
  else if(ph.phase==='wait'){ metaText(ctx, state.modus==='klas'?'klas: druk op verder':'tik op een antwoord',120,CAPTION_Y-50,C.goud,'left',26); }
  else { ctx.save(); roundRect(ctx,120,H-150,1680,110,14); shape(ctx,rgba(C.groen,0.12),C.groen,1.5); ctx.font=fTekst(32); ctx.fillStyle=C.text; wrap(ctx,seg.explain,150,H-105,1620,40); ctx.restore(); }
  // option hit zones stored
  state.optionZones=seg.options.map((o,i)=>({x:120,y:430+i*112,w:1680,h:96,i}));
}
// captions: phrase chunks of ≤ 2 lines ≤ 44 chars
function chunks(seg){ if(seg._chunks) return seg._chunks; const out=[]; let cur=[]; let len=0;
  for(const w of seg.words){ const t=w.t.replace(/\b(ee-er)\b/gi,'ER').replace(/dee-en-aa/gi,'DNA'); cur.push({...w,t}); len+=t.length+1; const endS=/[.?!:]$/.test(t);
    if(len>80||(endS&&len>30)){ out.push(cur); cur=[]; len=0; } }
  if(cur.length) out.push(cur); seg._chunks=out; return out; }
function drawCaption(ctx,seg,t){ const ch=chunks(seg).find(c=>t>=c[0].s-0.15 && t<=c[c.length-1].e+0.6); if(!ch) return;
  const s=ch.map(w=>w.t).join(' '); ctx.font=fTekst(44,700); const words=s.split(' '); const lines=[]; let line='';
  for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>1500&&line){ lines.push(line); line=w; } else line=test; } if(line) lines.push(line);
  const wmax=Math.max(...lines.map(l=>ctx.measureText(l).width)); const bh=lines.length*54+30, bw=wmax+60; const x=W/2-bw/2, y=H-40-bh;
  roundRect(ctx,x,y,bw,bh,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill();
  lines.forEach((l,i)=>text(ctx,l,W/2,y+54+i*54-8,fTekst(44,700),C.text,'center')); }

// ---- transport ----
const audio=document.getElementById('narration'); let clockStart=0, clockBase=0; let raf=0;
function gotoItem(i, local=0){ state.idx=clamp(i,0,state.items.length-1); state.local=local; const it=state.items[state.idx]; state.qPhase= it.type==='question'? {phase:'countdown',start:0,chosen:null}:null;
  if(it.type==='speech'){ if(audio.src.indexOf(it.seg.audio)<0){ audio.src=it.seg.audio; } audio.currentTime=local; if(state.playing) audio.play().catch(()=>{}); }
  else { audio.pause(); clockBase=local; clockStart=performance.now()/1000; }
  updateChapterUI(); }
function seekGlobal(g){ g=clamp(g,0,state.total-0.01); const i=state.items.findIndex(it=>g<it.start+it.dur); gotoItem(i, g-state.items[i].start); }
function play(){ state.playing=true; document.getElementById('play').textContent='❚❚'; const it=state.items[state.idx]; if(it.type==='speech'){ audio.play().catch(()=>{}); } else { clockBase=state.local; clockStart=performance.now()/1000; } }
function pause(){ state.playing=false; document.getElementById('play').textContent='▶'; audio.pause(); }
function tick(){
  const it=state.items[state.idx];
  if(state.playing && it){
    if(it.type==='speech'){ state.local=audio.currentTime; if(audio.ended || state.local>=it.dur-0.02){ next(); } }
    else if(it.type==='question'){ state.local=clockBase+(performance.now()/1000-clockStart); const ph=state.qPhase;
      if(ph.phase==='countdown' && state.local-ph.start>=COUNTDOWN){ if(state.auto){ ph.phase='reveal'; ph.start=state.local; } else { ph.phase='wait'; ph.start=state.local; } }
      else if(ph.phase==='reveal' && state.local-ph.start>=REVEAL){ next(); }
    } else { state.local=clockBase+(performance.now()/1000-clockStart); if(state.local>=it.dur) next(); }
  }
  render(); updateTimeUI(); raf=requestAnimationFrame(tick);
}
function next(){ if(state.idx>=state.items.length-1){ pause(); state.local=state.items[state.idx].dur-0.01; return; } gotoItem(state.idx+1,0); }
function answer(i){ const ph=state.qPhase; if(!ph||ph.phase==='reveal') return; ph.chosen=i; if(state.modus==='leerling'){ ph.phase='reveal'; ph.start=state.local; } }
function verder(){ const ph=state.qPhase; if(!ph) return; if(ph.phase!=='reveal'){ ph.phase='reveal'; ph.start=state.local; } else next(); }

// ---- UI wiring ----
function fmt(s){ s=Math.max(0,Math.floor(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function updateTimeUI(){ const it=state.items[state.idx]; if(!it) return; const g=it.start+state.local; document.getElementById('time').textContent=fmt(g)+' / '+fmt(state.total); const sl=document.getElementById('seek'); if(!sl.matches(':active')) sl.value=g/state.total*1000; }
function updateChapterUI(){ const it=state.items[state.idx]; document.querySelectorAll('#chapters li').forEach(li=>li.classList.toggle('on', li.dataset.ch===it.chapter)); }
function buildChapterList(){ const ul=document.getElementById('chapters'); ul.innerHTML=''; const seen=new Set();
  for(const it of state.items){ if(seen.has(it.chapter)) continue; seen.add(it.chapter); const li=document.createElement('li'); li.dataset.ch=it.chapter; const hasV=DATA.segments.some(s=>s.chapter===it.chapter&&s.level==='vwo');
    li.innerHTML=`<span>${it.chapter.replace(' — ',' · ')}</span>${hasV&&state.niveau==='vwo'?'<em>vwo-blok</em>':''}<small>${fmt(it.start)}</small>`; li.onclick=()=>{ gotoItem(state.items.indexOf(it),0); }; ul.appendChild(li); } }
function init(){
  buildTimeline(); buildChapterList(); gotoItem(0,0);
  document.getElementById('play').onclick=()=>state.playing?pause():play();
  document.getElementById('seek').oninput=e=>seekGlobal(e.target.value/1000*state.total);
  document.getElementById('verder').onclick=verder;
  document.getElementById('cc').onclick=e=>{ state.captions=!state.captions; e.target.classList.toggle('off',!state.captions); };
  document.getElementById('fs').onclick=()=>{ const el=document.getElementById('playerwrap'); if(document.fullscreenElement){ document.exitFullscreen(); } else if(el.requestFullscreen){ el.requestFullscreen(); } else { el.classList.toggle('pseudo-fs'); } };
  const setToggle=(id,key,vals)=>{ const el=document.getElementById(id); el.querySelectorAll('button').forEach(b=>{ b.classList.toggle('on',b.dataset.v===state[key]); b.onclick=()=>{ const was=state.items[state.idx]; const g=was.start+state.local; state[key]=b.dataset.v; el.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); if(key==='niveau'){ buildTimeline(); buildChapterList(); // re-seek to same chapter
        const ch=was.chapter; const i=Math.max(0,state.items.findIndex(it=>it.chapter===ch)); gotoItem(i,0); document.body.classList.toggle('havo',state.niveau==='havo'); } }; }); };
  setToggle('niveau','niveau'); setToggle('modus','modus'); document.body.classList.toggle('havo',state.niveau==='havo');
  document.getElementById('auto').onchange=e=>state.auto=e.target.checked;
  canvas.addEventListener('pointerdown',e=>{ const it=state.items[state.idx]; if(!it||it.type!=='question') return; const r=canvas.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width*W, y=(e.clientY-r.top)/r.height*H; const z=(state.optionZones||[]).find(z=>x>=z.x&&x<=z.x+z.w&&y>=z.y&&y<=z.y+z.h); if(z) answer(z.i); });
  document.addEventListener('keydown',e=>{ if(e.code==='Space'){ e.preventDefault(); state.playing?pause():play(); } if(e.code==='ArrowRight') seekGlobal(state.items[state.idx].start+state.local+5); if(e.code==='ArrowLeft') seekGlobal(state.items[state.idx].start+state.local-5); });
  // glossary + transcript
  const gl=document.getElementById('glossary'); GLOSSARY.forEach(g=>{ const d=document.createElement('div'); d.className='term'+(g.vwo?' vwo':''); d.innerHTML=`<b>${g.t}</b>${g.vwo?' <i>vwo</i>':''}<p>${g.d}</p>`; gl.appendChild(d); });
  const tr=document.getElementById('transcript'); DATA.segments.filter(s=>s.kind==='speech').forEach(s=>{ const p=document.createElement('p'); p.className=s.level; p.innerHTML=(s.level==='vwo'?'<i>vwo</i> ':'')+s.words.map(w=>w.t).join(' ').replace(/ee-er/g,'ER').replace(/dee-en-aa/g,'DNA'); tr.appendChild(p); });
  tick();
}
window.addEventListener('load',init);
