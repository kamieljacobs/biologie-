// ===== DNA series player (Part C UI layer; based on the Celorganellen player) =====
const DATA = window.FILMDATA, FILM = DATA.film;
const params = new URLSearchParams(location.search);
const state = {
  niveau: params.get('niveau')==='havo' ? 'havo' : 'vwo',
  modus: params.get('modus')==='klas' ? 'klas' : 'leerling',
  auto:false, captions:true, started:false,
  playing:false, items:[], idx:0, local:0, qPhase:null
};
const CARD_DUR=3.5, TITLE_DUR=5, END_DUR=8, COUNTDOWN=8;
const revealDur=seg=>seg.explain?6:2.5;

// ---- timeline ----
function buildTimeline(){
  const items=[]; let prevChapter=null;
  for(const seg of DATA.segments){
    if(state.niveau==='havo' && seg.level==='vwo') continue;
    if(seg.kind==='title'){ items.push({type:'title',seg,dur:TITLE_DUR,level:'basis',chapter:seg.chapter}); prevChapter=seg.chapter; continue; }
    if(seg.kind==='end'){ items.push({type:'end',seg,dur:END_DUR,level:'basis',chapter:seg.chapter}); continue; }
    if(seg.chapter!==prevChapter && seg.chapter!=='Opening'){ items.push({type:'card',chapter:seg.chapter,dur:CARD_DUR,level:seg.level}); prevChapter=seg.chapter; }
    if(seg.kind==='speech') items.push({type:'speech',seg,dur:seg.dur,level:seg.level,chapter:seg.chapter});
    else if(seg.kind==='question') items.push({type:'question',seg,dur:(seg.adur||0)+COUNTDOWN+revealDur(seg),level:seg.level,chapter:seg.chapter});
  }
  let t=0; for(const it of items){ it.start=t; t+=it.dur; } state.items=items; state.total=t;
}
function makeQ(seg){
  const words=seg.words||[]; const norm=s=>s.toLowerCase().replace(/[^a-zà-ÿ0-9]/g,''); const cache={};
  return { at(w,n=1){ const key=w+'|'+n; if(key in cache) return cache[key]; let c=0; const nw=norm(w); for(const x of words){ if(norm(x.t).includes(nw)){ c++; if(c===n){ cache[key]=x.s; return x.s; } } } cache[key]=Infinity; return Infinity; },
           on(w,n=1,d=0.6){ return ramp(this.localT,this.at(w,n),d); }, localT:0 };
}
// line index + fraction inside a speech segment, from the line bounds (word timestamps)
function lineAt(seg,t){ const b=[0,...(seg.bounds||[]),seg.dur]; let li=0; while(li<b.length-2 && t>=b[li+1]) li++; const lf=clamp((t-b[li])/Math.max(0.01,b[li+1]-b[li]),0,1); return {li,lf}; }

// ---- canvas ----
const canvas=document.getElementById('stage'); const ctx=canvas.getContext('2d'); canvas.width=W; canvas.height=H;
function render(){
  const it=state.items[state.idx]; if(!it) return; const t=state.local;
  ctx.save();
  if(it.type==='title') drawTitle(ctx,t);
  else if(it.type==='card') drawChapterCard(ctx,it,t);
  else if(it.type==='end') drawEnd(ctx,it,t);
  else if(it.type==='question') drawQuestion(ctx,it,t);
  else { const q=makeQ(it.seg); q.localT=t; const fn=SCENES[it.seg.scene]; const {li,lf}=lineAt(it.seg,t); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); if(fn) fn(ctx,li,lf,t,q); else bg(ctx,'schema'); ctx.restore(); }
  if(it.level==='vwo'){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); }
  else if(it.type!=='title') metaText(ctx,(state.niveau==='havo'?'havo':'havo · vwo')+' · '+FILM.meta,60,46,C.text2,'left',24);
  if(state.captions && it.type==='speech') drawCaption(ctx,it.seg,t);
  if(!state.started && state.idx===0){ ctx.save(); ctx.fillStyle=rgba(C.kast,0.55); ctx.fillRect(0,0,W,H); circ(ctx,W/2,H/2,90,rgba(C.goud,0.95)); ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.moveTo(W/2-28,H/2-44); ctx.lineTo(W/2+46,H/2); ctx.lineTo(W/2-28,H/2+44); ctx.closePath(); ctx.fill(); metaText(ctx,'start · spatie',W/2,H/2+150,C.text,'center',28); ctx.restore(); }
  ctx.restore();
}
function wrapText(ctx,s,x,y,maxW,lh){ const words=s.split(' '); let line='', yy=y; for(const w of words){ const tst=line?line+' '+w:w; if(ctx.measureText(tst).width>maxW&&line){ ctx.fillText(line,x,yy); line=w; yy+=lh; } else line=tst; } if(line) ctx.fillText(line,x,yy); return yy; }
function drawTitle(ctx,t){ bg(ctx,FILM.titleLook||'micro'); const a=ramp(t,0.2,0.8);
  ctx.save(); ctx.globalAlpha=a; text(ctx,FILM.title,120,350,fTitel(112),C.text); text(ctx,FILM.sub,120,430,fTekst(44),C.text2);
  ctx.font=fTekst(40,600); ctx.fillStyle=C.text; ctx.textAlign='left'; wrapText(ctx,FILM.puzzle,120,560,820,54);
  metaText(ctx,(state.niveau==='havo'?'havo':'havo · vwo')+' · '+FILM.meta,W-80,60,C.text2,'right',28); ctx.restore();
  if(SCENES.__title){ ctx.save(); ctx.globalAlpha=ramp(t,0.6,1); SCENES.__title(ctx,t); ctx.restore(); } }
function drawChapterCard(ctx,it,t){ bg(ctx,'schema'); const a=ramp(t,0.1,0.5)*(1-ramp(t,it.dur-0.5,0.5)); ctx.save(); ctx.globalAlpha=a;
  const m=it.chapter.match(/^(.+?)\s—\s(.*)$/); const num=m?m[1].trim():''; const title=m?m[2]:it.chapter;
  if(num) metaText(ctx,num+(it.level==='vwo'?' · vwo':''),W/2,430,it.level==='vwo'?C.paars:C.grain,'center',30); text(ctx,title,W/2,540,fTitel(72),C.text,'center');
  const mini=(FILM.mini||{})[it.chapter]; if(mini) text(ctx,mini,W/2,630,fTekst(40),C.text2,'center'); ctx.restore(); }
function drawEnd(ctx,it,t){ bg(ctx,'schema'); const lines=FILM.endLines||[]; lines.forEach((l,i)=>{ const a=ramp(t,0.3+i*1.0,0.6); ctx.save(); ctx.globalAlpha=a; text(ctx,l,W/2,330+i*110,fTekst(46,600),C.text,'center'); ctx.restore(); });
  haak(ctx,360,1560,330+lines.length*110-40,FILM.endHaak||'',C.groen,ramp(t,0.3+lines.length*1.0,0.6));
  if(FILM.next) text(ctx,FILM.next,W/2,800,fTekst(40),C.text2,'center');
  metaText(ctx,FILM.footer,W/2,CAPTION_Y-20+120,C.text2,'center',22); }
function drawQuestion(ctx,it,t){
  bg(ctx,'schema'); const seg=it.seg; const ph=state.qPhase||{phase:'countdown',start:0};
  text(ctx,'Wat denk je?',120,190,fTitel(64),C.text); if(seg.source) metaText(ctx,seg.source,1800,190,C.text2,'right',28); ctx.font=fTekst(48,600); ctx.fillStyle=C.text; ctx.textAlign='left'; const yq=wrapText(ctx,seg.q,120,290,1680,60);
  const revealed=ph.phase==='reveal'; const y0=Math.max(400,yq+70); const n=seg.options.length; const hgt=n>3?86:96, gap=n>3?100:112;
  seg.options.forEach((o,i)=>{ const y=y0+i*gap; const chosen=ph.chosen===i; const correct=i===seg.correct;
    roundRect(ctx,120,y,1680,hgt,14); let fill=C.fill, stroke=C.line;
    if(revealed){ if(correct){ fill=rgba(C.groen,0.25); stroke=C.groen; } else if(chosen){ fill=rgba(C.koraal,0.25); stroke=C.koraal; } }
    else if(chosen){ stroke=C.goud; }
    shape(ctx,fill,stroke,1.5); text(ctx,'ABCD'[i],160,y+hgt/2+14,fMeta(36),C.grain); text(ctx,o,230,y+hgt/2+13,fTekst(38),C.text);
    if(revealed&&correct){ ctx.fillStyle=C.groen; ctx.beginPath(); ctx.arc(1750,y+hgt/2,12,0,6.283); ctx.fill(); }
    if(revealed&&chosen&&!correct){ ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(1740,y+hgt/2-10); ctx.lineTo(1760,y+hgt/2+10); ctx.moveTo(1760,y+hgt/2-10); ctx.lineTo(1740,y+hgt/2+10); ctx.stroke(); }
  });
  const yb=y0+n*gap+10;
  if(ph.phase==='ask'){ metaText(ctx,'luister…',120,yb+30,C.grain,'left',28); }
  else if(ph.phase==='countdown'){ const u=clamp((t-ph.start)/COUNTDOWN,0,1); ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(120,yb+40); ctx.lineTo(120+1680*(1-u),yb+40); ctx.stroke(); metaText(ctx,'denk na · tik of druk A, B, C',120,yb+20,C.grain,'left',28); }
  else if(ph.phase==='wait'){ metaText(ctx, state.modus==='klas'?'klas: druk op verder (enter)':'tik op een antwoord',120,yb+30,C.goud,'left',28); }
  else if(seg.explain){ roundRect(ctx,120,yb,1680,110,14); shape(ctx,rgba(C.groen,0.12),C.groen,1.5); ctx.font=fTekst(36); ctx.fillStyle=C.text; wrapText(ctx,seg.explain,150,yb+48,1620,44); }
  else { const mine=ph.chosen; metaText(ctx, mine==null?'het antwoord volgt':(mine===seg.correct?'goed!':'niet goed: het antwoord volgt'),120,yb+30,mine===seg.correct?C.groen:C.grain,'left',28); }
  state.optionZones=seg.options.map((o,i)=>({x:120,y:y0+i*gap,w:1680,h:hgt,i}));
}
// captions: phrase chunks, at most two lines, in the ondertitelkast
function chunks(seg){ if(seg._chunks) return seg._chunks; const out=[]; let cur=[], len=0;
  for(const w of seg.words){ cur.push(w); len+=w.t.length+1; const endS=/[.?!:]$/.test(w.t); if(len>78||(endS&&len>28)){ out.push(cur); cur=[]; len=0; } }
  if(cur.length) out.push(cur); seg._chunks=out; return out; }
function drawCaption(ctx,seg,t){ const cs=chunks(seg); let ch=null; for(const c of cs){ if(t>=c[0].s-0.15) ch=c; } if(!ch||t>ch[ch.length-1].e+0.8) return;
  const s=ch.map(w=>w.t).join(' '); ctx.font=fTekst(44,700); const words=s.split(' '); const lines=[]; let line='';
  for(const w of words){ const tst=line?line+' '+w:w; if(ctx.measureText(tst).width>1500&&line){ lines.push(line); line=w; } else line=tst; } if(line) lines.push(line);
  const wmax=Math.max(...lines.map(l=>ctx.measureText(l).width)); const bh=lines.length*54+26, bw=wmax+64; const x=W/2-bw/2, y=H-24-bh;
  roundRect(ctx,x,y,bw,bh,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill();
  lines.forEach((l,i)=>text(ctx,l,W/2,y+52+i*54-6,fTekst(44,700),C.text,'center')); }

// ---- transport ----
const audio=document.getElementById('narration'); let clockStart=0, clockBase=0, curAudio=null;
function setAudio(seg){ if(curAudio!==seg.id){ audio.src=seg.audio; curAudio=seg.id; } }
function qPhaseAt(seg,local){ const ad=seg.adur||0; if(local<ad) return {phase:'ask',start:0,chosen:null}; if(local<ad+COUNTDOWN) return {phase:'countdown',start:ad,chosen:null}; return {phase:'reveal',start:ad+COUNTDOWN,chosen:null}; }
function gotoItem(i,local=0){ state.idx=clamp(i,0,state.items.length-1); state.local=local; const it=state.items[state.idx];
  state.qPhase= it.type==='question'? qPhaseAt(it.seg,local):null;
  if(it.type==='speech' || (it.type==='question'&&it.seg.audio&&local<(it.seg.adur||0))){ setAudio(it.seg); try{ audio.currentTime=local; }catch(e){} if(state.playing) audio.play().catch(()=>{}); }
  else audio.pause();
  clockBase=local; clockStart=performance.now()/1000; updateChapterUI(); }
function seekGlobal(g){ g=clamp(g,0,state.total-0.01); const i=state.items.findIndex(it=>g<it.start+it.dur); gotoItem(i,g-state.items[i].start); }
function play(){ state.started=true; state.playing=true; document.getElementById('play').textContent='❚❚'; const it=state.items[state.idx];
  if(it.type==='speech'||(it.type==='question'&&state.qPhase&&state.qPhase.phase==='ask')){ setAudio(it.seg); audio.play().catch(()=>{}); } clockBase=state.local; clockStart=performance.now()/1000; }
function pause(){ state.playing=false; document.getElementById('play').textContent='▶'; audio.pause(); }
function tick(){
  const it=state.items[state.idx];
  if(state.playing && it){
    if(it.type==='speech'){ state.local=audio.currentTime; if(audio.ended || state.local>=it.dur-0.02) next(); }
    else if(it.type==='question'){ const ph=state.qPhase;
      if(ph.phase==='ask'){ state.local=audio.currentTime; if(audio.ended||state.local>=(it.seg.adur||0)-0.02){ ph.phase='countdown'; ph.start=it.seg.adur||0; state.local=ph.start; clockBase=state.local; clockStart=performance.now()/1000; } }
      else if(ph.phase==='wait'){ /* hold */ }
      else { state.local=clockBase+(performance.now()/1000-clockStart);
        if(ph.phase==='countdown' && state.local-ph.start>=COUNTDOWN){ if(state.auto){ ph.phase='reveal'; ph.start=state.local; } else { ph.phase='wait'; ph.start=state.local; } }
        else if(ph.phase==='reveal' && state.local-ph.start>=revealDur(it.seg)) next(); } }
    else { state.local=clockBase+(performance.now()/1000-clockStart); if(state.local>=it.dur) next(); }
  }
  render(); updateTimeUI(); requestAnimationFrame(tick);
}
function next(){ if(state.idx>=state.items.length-1){ pause(); state.local=state.items[state.idx].dur-0.01; return; } gotoItem(state.idx+1,0); }
function answer(i){ const it=state.items[state.idx]; const ph=state.qPhase; if(!ph||ph.phase==='reveal'||!it||i>=it.seg.options.length) return; ph.chosen=i; audio.pause();
  if(state.modus==='leerling'){ ph.phase='reveal'; ph.start=Math.max(state.local,it.seg.adur||0); state.local=ph.start; clockBase=state.local; clockStart=performance.now()/1000; } }
function verder(){ const ph=state.qPhase; if(!ph) return; const it=state.items[state.idx]; if(ph.phase!=='reveal'){ audio.pause(); ph.phase='reveal'; ph.start=Math.max(state.local,it.seg.adur||0); state.local=ph.start; clockBase=state.local; clockStart=performance.now()/1000; } else next(); }
function chapterJump(dir){ const it=state.items[state.idx]; const starts=[]; let prev=null; state.items.forEach((x,i)=>{ if(x.chapter!==prev){ starts.push(i); prev=x.chapter; } });
  let k=starts.filter(i=>i<=state.idx).length-1; const inFirst2=(it.start+state.local)-state.items[starts[k]].start<2;
  if(dir<0){ k = inFirst2? k-1 : k; } else k=k+1; k=clamp(k,0,starts.length-1); gotoItem(starts[k],0); }

// ---- UI ----
function fmt(s){ s=Math.max(0,Math.floor(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function updateTimeUI(){ const it=state.items[state.idx]; if(!it) return; const g=it.start+state.local; document.getElementById('time').textContent=fmt(g)+' / '+fmt(state.total); const sl=document.getElementById('seek'); if(!sl.matches(':active')) sl.value=g/state.total*1000; }
function updateChapterUI(){ const it=state.items[state.idx]; document.querySelectorAll('#chapters li').forEach(li=>li.classList.toggle('on',li.dataset.ch===it.chapter)); }
function buildChapterList(){ const ul=document.getElementById('chapters'); ul.innerHTML=''; const seen=new Set();
  for(const it of state.items){ if(seen.has(it.chapter)) continue; seen.add(it.chapter); const li=document.createElement('li'); li.dataset.ch=it.chapter; const allV=DATA.segments.filter(s=>s.chapter===it.chapter&&s.kind!=='title').every(s=>s.level==='vwo'); const hasV=DATA.segments.some(s=>s.chapter===it.chapter&&s.level==='vwo');
    li.innerHTML=`<span>${it.chapter.replace(' — ',' · ')}</span>${hasV&&state.niveau==='vwo'?'<em>'+(allV?'vwo':'vwo-blok')+'</em>':''}<small>${fmt(it.start)}</small>`; li.onclick=()=>{ state.started=true; gotoItem(state.items.indexOf(it),0); }; ul.appendChild(li); } }
function init(){
  buildTimeline(); buildChapterList(); gotoItem(0,0);
  document.getElementById('play').onclick=()=>state.playing?pause():play();
  document.getElementById('seek').oninput=e=>{ state.started=true; seekGlobal(e.target.value/1000*state.total); };
  document.getElementById('verder').onclick=verder;
  document.getElementById('cc').onclick=e=>{ state.captions=!state.captions; e.target.classList.toggle('off',!state.captions); };
  document.getElementById('fs').onclick=()=>{ const el=document.getElementById('playerwrap'); if(document.fullscreenElement){ document.exitFullscreen(); } else if(el.requestFullscreen && !/iPhone|iPod/.test(navigator.userAgent)){ el.requestFullscreen(); } else { el.classList.toggle('pseudo-fs'); } };
  const setToggle=(id,key)=>{ const el=document.getElementById(id); el.querySelectorAll('button').forEach(b=>{ b.classList.toggle('on',b.dataset.v===state[key]); b.onclick=()=>{ const was=state.items[state.idx]; state[key]=b.dataset.v; el.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
        if(key==='niveau'){ buildTimeline(); buildChapterList(); const i=Math.max(0,state.items.findIndex(it=>it.chapter===was.chapter)); gotoItem(i,0); document.body.classList.toggle('havo',state.niveau==='havo'); } }; }); };
  setToggle('niveau','niveau'); setToggle('modus','modus'); document.body.classList.toggle('havo',state.niveau==='havo');
  document.getElementById('auto').onchange=e=>state.auto=e.target.checked;
  canvas.addEventListener('pointerdown',e=>{ const it=state.items[state.idx]; if(!state.started){ play(); return; } if(!it||it.type!=='question') return; const r=canvas.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width*W, y=(e.clientY-r.top)/r.height*H; const z=(state.optionZones||[]).find(z=>x>=z.x&&x<=z.x+z.w&&y>=z.y&&y<=z.y+z.h); if(z) answer(z.i); });
  document.addEventListener('keydown',e=>{ const tag=(e.target&&e.target.tagName)||''; if(tag==='INPUT'&&e.target.type!=='range') return; const g=()=>state.items[state.idx].start+state.local;
    const startIfNeeded=()=>{ if(!state.started){ play(); return true; } return false; };
    if(e.code==='Space'){ e.preventDefault(); state.playing?pause():play(); }
    else if(e.code==='ArrowRight'){ e.preventDefault(); if(startIfNeeded()) return; seekGlobal(g()+(e.shiftKey?30:5)); }
    else if(e.code==='ArrowLeft'){ e.preventDefault(); if(startIfNeeded()) return; seekGlobal(g()-(e.shiftKey?30:5)); }
    else if(e.code==='ArrowUp'){ e.preventDefault(); if(startIfNeeded()) return; chapterJump(-1); }
    else if(e.code==='ArrowDown'){ e.preventDefault(); if(startIfNeeded()) return; chapterJump(1); }
    else if(e.code==='Enter'){ if(state.qPhase){ e.preventDefault(); verder(); } }
    else { const k=e.key.toLowerCase(); const i='abcd'.indexOf(k)>=0?'abcd'.indexOf(k):'1234'.indexOf(k); if(i>=0&&state.qPhase) answer(i); } });
  const gl=document.getElementById('glossary'); GLOSSARY.forEach(g=>{ const d=document.createElement('div'); d.className='term'+(g.vwo?' vwo':''); d.innerHTML=`<b>${g.t}</b>${g.vwo?' <i>vwo</i>':''}<p>${g.d}</p>`; gl.appendChild(d); });
  const tr=document.getElementById('transcript'); DATA.segments.filter(s=>s.kind==='speech'||s.kind==='question').forEach(s=>{ const p=document.createElement('p'); p.className=s.level; p.innerHTML=(s.level==='vwo'?'<i>vwo</i> ':'')+(s.kind==='question'?'<b>Vraag:</b> ':'')+s.words.map(w=>w.t).join(' '); tr.appendChild(p); });
  requestAnimationFrame(tick);
}
window.addEventListener('load',init);
