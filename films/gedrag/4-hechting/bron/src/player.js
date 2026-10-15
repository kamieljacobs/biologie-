// ===== Player =====
const DATA = window.FILMDATA;
const params = new URLSearchParams(location.search);
const state = { reduce:false,
  niveau: params.get('niveau')==='havo' ? 'havo' : 'vwo',
  modus: params.get('modus')==='klas' ? 'klas' : 'leerling',
  auto: false, captions: true, snelheid: (()=>{ const p=parseFloat(params.get('snelheid')); if([0.75,1,1.25,1.5].includes(p)) return p; try{ const v=parseFloat(localStorage.getItem('bk-snelheid')); return [0.75,1,1.25,1.5].includes(v)?v:1; }catch(e){ return 1; } })(), vragen: params.get('vragen')==='uit' ? 'uit' : params.get('vragen')==='aan' ? 'aan' : (()=>{ try{ return localStorage.getItem('bk-vragen')==='uit'?'uit':'aan'; }catch(e){ return 'aan'; } })(),
  playing:false, t:0, items:[], idx:0, local:0,
  qPhase:null, // {phase:'countdown'|'wait'|'reveal', start, chosen}
  board:[0,0,0,0,0,0]
};
const CARD_DUR=3.5, TITLE_DUR=5, END_DUR=9, COUNTDOWN=8, REVEAL=6;

// ---- build timeline ----
// 'Voor vwo ...' niet uitspreken (de havo/vwo-keuze zit in de speler): losse aankondigingen helemaal, 'Voor vwo:' als voorzetsel weg
function vwoCuts(seg){ const w=seg.words||[], cuts=[]; let i=0;
  while(i<w.length){ let j=i; while(j<w.length&&!/[.?!]$/.test(w[j].t)) j++; const zin=w.slice(i,j+1), txt=zin.map(x=>x.t).join(' ');
    if(/^Voor vwo\b/.test(txt)){ const nxt=w[j+1];
      if(/^Voor vwo (gaan we )?(hier )?(nog )?(een |één |drie )?stap(pen)? verder(, de lever in)?\.$|^Voor vwo nog (een|één) stap( verder)?\.$|^Voor vwo volgen we die prikkel door het hart\.$|^Voor vwo kijken we preciezer naar [^.]*\.$/.test(txt)) cuts.push([zin[0].s-0.03, nxt?nxt.s-0.03:(seg.dur||zin[zin.length-1].e+0.3)]);
      else { let k=-1; const m=txt.match(/^(Voor vwo(, tot slot)?:|Voor vwo nog (een|één) stap( verder)?:|Voor vwo(?= een ))/i);
        if(m){ let n=0, acc=''; for(let q=0;q<zin.length;q++){ acc+=(q?' ':'')+zin[q].t; if(acc.length>=m[0].trim().length){ k=q; break; } }
          if(k>=0&&zin[k+1]){ if(/, tot slot:$/i.test(m[0])){ k=1; } cuts.push([zin[0].s-0.03, zin[k+1].s-0.03]); const r=zin[k+1]; if(!r._hoofd){ r.t=r.t.charAt(0).toUpperCase()+r.t.slice(1); r._hoofd=1; } } } } }
    i=j+1; }
  return cuts; }
function knipSamen(c){ c=c.filter(x=>x[1]>x[0]).sort((a,b)=>a[0]-b[0]); const o=[]; for(const x of c){ const l=o[o.length-1]; if(l&&x[0]<=l[1]) l[1]=Math.max(l[1],x[1]); else o.push([Math.max(0,x[0]),x[1]]); } return o; }
function antwCuts(seg){ const w=seg.words||[], seg2=[], cuts=[]; let cur=[]; for(const x of w){ cur.push(x); if(/[.?!]$/.test(x.t)){ seg2.push(cur); cur=[]; } } if(cur.length) seg2.push(cur); seg2.forEach((z,i)=>{ const txt=z.map(x=>x.t).join(' '); const hit=(/\bantwoord\b/i.test(txt)&&!/begin/i.test(txt))||/^(dat (is|was) )?[abc]\.$/i.test(txt); if(hit){ const a=Math.max(0,z[0].s-0.05), b=seg2[i+1]?Math.max(a,seg2[i+1][0].s-0.05):(seg.dur||z[z.length-1].e+0.3); cuts.push([a,b]); } }); return cuts; } function aud2it(it,t){ let d=t; for(const c of (it.cuts||[])){ if(t>c[0]) d-=Math.min(t,c[1])-c[0]; } return d; } function it2aud(it,u){ let t=u; for(const c of (it.cuts||[])){ if(t>=c[0]) t+=c[1]-c[0]; } return t; } function buildTimeline(){
  const items=[]; let prevChapter=null, naQ=false;
  for(const seg of DATA.segments){
    if(state.niveau==='havo' && seg.level==='vwo') continue;
    if(seg.kind==='title'){ items.push({type:'title',seg,dur:TITLE_DUR,level:'basis',chapter:seg.chapter}); prevChapter=seg.chapter; continue; }
    if(seg.kind==='card'){ items.push({type:'end',seg,dur:END_DUR,level:'basis',chapter:seg.chapter}); continue; }
    if(seg.chapter!==prevChapter && seg.chapter!=='Cold open'){ items.push({type:'card',chapter:seg.chapter,dur:CARD_DUR,level:'basis'}); prevChapter=seg.chapter; }
    if(seg.kind==='speech'){ if(naQ&&(seg.chapter!==naQ||(seg.words||[]).some(w=>/^begin/i.test(w.t))||(window.ANTW_HOUD||[]).includes(seg.id))) naQ=false; const cuts=knipSamen((naQ?antwCuts(seg):[]).concat(vwoCuts(seg))); items.push({type:'speech',seg,dur:seg.dur-cuts.reduce((a,c)=>a+c[1]-c[0],0),cuts,level:seg.level,chapter:seg.chapter}); }
    else if(seg.kind==='question' && state.vragen==='uit' && seg.chapter!=='Cold open') naQ=seg.chapter; else if(seg.kind==='question') items.push({type:'question',seg,dur:COUNTDOWN+REVEAL,level:seg.level,chapter:seg.chapter});
  }
  let t=0; for(const it of items){ it.start=t; t+=it.dur; } state.items=items; state.total=t;
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
  ctx.save();
  if(it.type==='title') drawTitle(ctx,t);
  else if(it.type==='card') drawChapterCard(ctx,it,t);
  else if(it.type==='end') drawEnd(ctx,it,t);
  else if(it.type==='question') drawQuestion(ctx,it,t);
  else { const q=makeQ(it.seg); q.localT=t; const fn=SCENES[it.seg.id]; if(fn) fn(ctx,t,q,state); else bg(ctx,'schema'); if(it.seg.verdieping){ metaText(ctx,'verdieping',W-60,46,C.goud,'right',28); } }
  // UI layer: vwo marker
  if(it.level==='vwo'){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); }
  // series/level meta top-left (non-vwo items)
  else if(it.type!=='title') metaText(ctx, (DATA.film.alleen||(state.niveau==='havo'?'havo':'havo · vwo'))+' · '+DATA.film.meta,60,46,C.text2,'left',28);
  // captions
  const narrow=canvas.clientWidth<900; document.body.classList.toggle('narrow',narrow);
  if(state.captions && it.type==='speech'){ if(narrow){ const ch=chunks(it.seg).find(c=>t>=c[0].s-0.15 && t<=c[c.length-1].e+0.6); const txt=ch?ch.map(w=>w.t).join(' '):''; const cb=document.getElementById('capband'); if(cb.textContent!==txt) cb.textContent=txt; } else drawCaption(ctx,it.seg,t); }
  else if(narrow){ const cb=document.getElementById('capband'); if(cb.textContent) cb.textContent=''; }
  ctx.restore();
}
function drawTitle(ctx,t){ const f=DATA.film; bg(ctx,f.titleLook||'schema'); const a=ramp(t,0.2,0.8);
  if(SCENES.title){ ctx.save(); ctx.globalAlpha=ramp(t,0.6,1); SCENES.title(ctx,t); ctx.restore(); }
  ctx.save(); ctx.globalAlpha=a; text(ctx,f.title,120,360,fTitel(f.title.length>22?96:120),C.text); text(ctx,f.sub,120,440,fTekst(44),C.text2);
  ctx.font=fTekst(36); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,f.puzzle,120,540,820,48);
  metaText(ctx,(f.alleen?f.alleen.toUpperCase():(state.niveau==='havo'?'HAVO':'HAVO · VWO'))+' · '+f.meta.toUpperCase(),W-80,60,C.text2,'right',28); ctx.restore(); }
function drawChapterCard(ctx,it,t){ bg(ctx,'schema'); const a=ramp(t,0.1,0.5)*(1-ramp(t,it.dur-0.5,0.5)); ctx.save(); ctx.globalAlpha=a;
  const m=it.chapter.match(/^(Hoofdstuk [^—]+)—\s*(.*)$/); const num=m?m[1].trim():''; const title=m?m[2]:it.chapter;
  if(num) metaText(ctx,num,W/2,430,C.grain,'center',30); text(ctx,title,W/2,540,fTitel(72),C.text,'center');
  const mini=(DATA.film.minis||{})[num||it.chapter];
  if(mini) text(ctx,mini,W/2,620,fTekst(36),C.text2,'center'); ctx.restore(); }
function drawEnd(ctx,it,t){ bg(ctx,'schema'); const lines=it.seg.lines; const y0=lines.length>3?300:380, st=lines.length>3?105:120; lines.forEach((l,i)=>{ const a=ramp(t,0.3+i*1.2,0.6); ctx.save(); ctx.globalAlpha=a; text(ctx,l,W/2,y0+i*st,fTekst(44,600),C.text,'center'); ctx.restore(); });
  haak(ctx,360,1560,lines.length>3?y0+(lines.length-1)*st+52:740,DATA.film.endHaak,C.groen,ramp(t,4.2,0.6)); metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie '+DATA.film.version,W/2,CAPTION_Y-20,C.text2,'center',28); }
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
  if(ph.phase==='countdown'){ const u=clamp((t-ph.start)/COUNTDOWN,0,1); ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(120,CAPTION_Y-40); ctx.lineTo(120+1680*(1-u),CAPTION_Y-40); ctx.stroke(); metaText(ctx,'denk na…',120,CAPTION_Y-60,C.grain,'left',28); }
  else if(ph.phase==='wait'){ metaText(ctx, state.modus==='klas'?'klas: druk op verder':'tik op een antwoord',120,CAPTION_Y-50,C.goud,'left',28); }
  else { ctx.save(); roundRect(ctx,120,H-150,1680,110,14); shape(ctx,rgba(C.groen,0.12),C.groen,1.5); ctx.font=fTekst(36); ctx.fillStyle=C.text; wrap(ctx,seg.explain,150,H-105,1620,40); ctx.restore(); }
  // option hit zones stored
  state.optionZones=seg.options.map((o,i)=>({x:120,y:430+i*112,w:1680,h:96,i}));
}
// captions: phrase chunks of ≤ 2 lines ≤ 44 chars
function chunks(seg){ const it=state.items[state.idx]; const cu=(it&&it.seg===seg&&it.cuts)||[]; const cs=chunks0(seg); return cu.length?cs.map(c=>c.filter(w=>!cu.some(k=>w.s>=k[0]-0.02&&w.s<k[1]-0.02))).filter(c=>c.length):cs; } function chunks0(seg){ if(seg._chunks) return seg._chunks; const out=[]; let cur=[]; let len=0;
  for(const w of seg.words){ const t=w.t.replace(/\b(ee-er)\b/gi,'ER').replace(/dee-en-aa/gi,'DNA'); cur.push({...w,t}); len+=t.length+1; const endS=/[.?!:]$/.test(t);
    const comma=/[,;]$/.test(t);
    if(len>88||(endS&&len>24)||(comma&&len>48)){ out.push(cur); cur=[]; len=0; } }
  if(cur.length) out.push(cur); seg._chunks=out; return out; }
function drawCaption(ctx,seg,t){ const ch=chunks(seg).find(c=>t>=c[0].s-0.15 && t<=c[c.length-1].e+0.6); if(!ch) return;
  const s=ch.map(w=>w.t).join(' '); ctx.font=fTekst(44,700); const words=s.split(' '); const lines=[]; let line='';
  for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>1500&&line){ lines.push(line); line=w; } else line=test; } if(line) lines.push(line);
  const wmax=Math.max(...lines.map(l=>ctx.measureText(l).width)); const bh=lines.length*54+30, bw=wmax+60; const x=W/2-bw/2, y=H-40-bh;
  roundRect(ctx,x,y,bw,bh,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill();
  lines.forEach((l,i)=>text(ctx,l,W/2,y+54+i*54-8,fTekst(44,700),C.text,'center')); }

// ---- transport ----
const audio=document.getElementById('narration'); function zetSnelheid(r){ if(state.items&&state.items[state.idx]&&state.items[state.idx].type!=='speech'){ clockBase=state.local; clockStart=performance.now()/1000; } state.snelheid=r; audio.defaultPlaybackRate=r; audio.playbackRate=r; try{ audio.preservesPitch=true; }catch(e){} document.querySelectorAll('#snelheid button').forEach(b=>b.classList.toggle('on',+b.dataset.v===r)); } let clockStart=0, clockBase=0; let raf=0;
function gotoItem(i, local=0){ state.idx=clamp(i,0,state.items.length-1); const it=state.items[state.idx]; local=it2aud(it,local); state.local=local; state.qPhase= it.type==='question'? {phase:'countdown',start:0,chosen:null}:null;
  if(it.type==='speech'){ if(audio.src.indexOf(it.seg.audio)<0){ audio.src=it.seg.audio; } audio.currentTime=local; if(state.playing) audio.play().catch(()=>{}); }
  else { audio.pause(); clockBase=local; clockStart=performance.now()/1000; }
  updateChapterUI(); }
function seekGlobal(g){ g=clamp(g,0,state.total-0.01); const i=state.items.findIndex(it=>g<it.start+it.dur); gotoItem(i, g-state.items[i].start); }
function play(){ state.playing=true; document.getElementById('play').textContent='❚❚'; const it=state.items[state.idx]; if(it.type==='speech'){ audio.play().catch(()=>{}); } else { clockBase=state.local; clockStart=performance.now()/1000; } }
function pause(){ state.playing=false; document.getElementById('play').textContent='▶'; audio.pause(); }
function tick(){
  const it=state.items[state.idx];
  if(state.playing && it){
    if(it.type==='speech'){ state.local=audio.currentTime; const cc=(it.cuts||[]).find(c=>state.local>=c[0]&&state.local<c[1]-0.03); if(cc){ audio.currentTime=cc[1]; state.local=cc[1]; } if(audio.ended || aud2it(it,state.local)>=it.dur-0.02){ next(); } }
    else if(it.type==='question'){ state.local=clockBase+(performance.now()/1000-clockStart)*state.snelheid; const ph=state.qPhase;
      if(ph.phase==='countdown' && state.local-ph.start>=COUNTDOWN){ if(state.auto){ ph.phase='reveal'; ph.start=state.local; } else { ph.phase='wait'; ph.start=state.local; } }
      else if(ph.phase==='reveal' && state.local-ph.start>=REVEAL){ next(); }
    } else { state.local=clockBase+(performance.now()/1000-clockStart)*state.snelheid; if(state.local>=it.dur) next(); }
  }
  render(); updateTimeUI(); raf=requestAnimationFrame(tick);
}
function next(){ if(state.idx>=state.items.length-1){ pause(); state.local=state.items[state.idx].dur-0.01; return; } gotoItem(state.idx+1,0); }
function answer(i){ const ph=state.qPhase; if(!ph||ph.phase==='reveal') return; ph.chosen=i; if(state.modus==='leerling'){ ph.phase='reveal'; ph.start=state.local; } }
function verder(){ const ph=state.qPhase; if(!ph) return; if(ph.phase!=='reveal'){ ph.phase='reveal'; ph.start=state.local; } else next(); }

// ---- UI wiring ----
function fmt(s){ s=Math.max(0,Math.floor(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function updateTimeUI(){ const it=state.items[state.idx]; if(!it) return; const g=it.start+aud2it(it,state.local); document.getElementById('time').textContent=fmt(g)+' / '+fmt(state.total); const sl=document.getElementById('seek'); if(!sl.matches(':active')) sl.value=g/state.total*1000; }
function updateChapterUI(){ const it=state.items[state.idx]; document.querySelectorAll('#chapters li').forEach(li=>li.classList.toggle('on', li.dataset.ch===it.chapter)); }
function buildChapterList(){ const ul=document.getElementById('chapters'); ul.innerHTML=''; const seen=new Set();
  for(const it of state.items){ if(seen.has(it.chapter)) continue; seen.add(it.chapter); const li=document.createElement('li'); li.dataset.ch=it.chapter; const hasV=DATA.segments.some(s=>s.chapter===it.chapter&&s.level==='vwo');
    li.innerHTML=`<span>${it.chapter.replace(' — ',' · ')}</span>${hasV&&state.niveau==='vwo'?'<em>vwo-blok</em>':''}<small>${fmt(it.start)}</small>`; li.onclick=()=>{ gotoItem(state.items.indexOf(it),0); }; ul.appendChild(li); } }
function init(){
  buildTimeline(); buildChapterList(); gotoItem(0,0);
  document.getElementById('play').onclick=()=>{ state.started=true; state.playing?pause():play(); };
  document.getElementById('seek').oninput=e=>seekGlobal(e.target.value/1000*state.total);
  document.getElementById('verder').onclick=verder;
  document.getElementById('cc').onclick=e=>{ state.captions=!state.captions; e.target.classList.toggle('off',!state.captions); };
  document.getElementById('fs').onclick=()=>{ const el=document.getElementById('playerwrap'); if(document.fullscreenElement){ document.exitFullscreen(); } else if(el.requestFullscreen){ el.requestFullscreen(); } else { el.classList.toggle('pseudo-fs'); } };
  const setToggle=(id,key,vals)=>{ const el=document.getElementById(id); el.querySelectorAll('button').forEach(b=>{ b.classList.toggle('on',b.dataset.v===state[key]); b.onclick=()=>{ const was=state.items[state.idx]; const g=was.start+state.local; state[key]=b.dataset.v; el.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); if(key==='vragen'){ try{ localStorage.setItem('bk-vragen',state.vragen); }catch(e){} buildTimeline(); buildChapterList(); let i=state.items.findIndex(it=>it.seg&&it.seg===was.seg); if(i<0) i=Math.max(0,state.items.findIndex(it=>it.chapter===was.chapter)); gotoItem(i,0); } if(key==='niveau'){ buildTimeline(); buildChapterList(); // re-seek to same chapter
        const ch=was.chapter; const i=Math.max(0,state.items.findIndex(it=>it.chapter===ch)); gotoItem(i,0); document.body.classList.toggle('havo',state.niveau==='havo'); } }; }); };
  setToggle('niveau','niveau'); if(DATA.film.alleen){ const nv=document.getElementById('niveau'); if(nv) nv.style.display='none'; } setToggle('modus','modus'); setToggle('vragen','vragen'); document.querySelectorAll('#snelheid button').forEach(b=>b.onclick=()=>{ zetSnelheid(+b.dataset.v); try{ localStorage.setItem('bk-snelheid',String(state.snelheid)); }catch(e){} }); zetSnelheid(state.snelheid); document.body.classList.toggle('havo',state.niveau==='havo');
  document.getElementById('auto').onchange=e=>state.auto=e.target.checked;
  canvas.addEventListener('pointerdown',e=>{ const it=state.items[state.idx]; if(!it||it.type!=='question') return; const r=canvas.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width*W, y=(e.clientY-r.top)/r.height*H; const z=(state.optionZones||[]).find(z=>x>=z.x&&x<=z.x+z.w&&y>=z.y&&y<=z.y+z.h); if(z) answer(z.i); });
  document.addEventListener('keydown',e=>{
    const tg=e.target; if(tg && (tg.tagName==='INPUT'&&tg.type!=='range' || tg.tagName==='TEXTAREA')) return;
    const g=state.items[state.idx].start+state.local; const k=e.key;
    const started=state.started;
    if(e.code==='Space'){ e.preventDefault(); state.started=true; state.playing?pause():play(); return; }
    if(k==='ArrowRight'||k==='ArrowLeft'){ e.preventDefault(); const d=(e.shiftKey?30:5)*(k==='ArrowRight'?1:-1); seekGlobal(g+d); if(!started){ state.started=true; play(); } return; }
    if(k==='ArrowUp'||k==='ArrowDown'){ e.preventDefault(); const chs=[]; state.items.forEach((it,i)=>{ if(!chs.length||chs[chs.length-1].ch!==it.chapter) chs.push({ch:it.chapter,i}); });
      let ci=chs.findIndex((c,j)=>j===chs.length-1||chs[j+1].i>state.idx); const inCh=g-state.items[chs[ci].i].start;
      if(k==='ArrowDown') ci=Math.min(chs.length-1,ci+1); else if(inCh<2) ci=Math.max(0,ci-1);
      gotoItem(chs[ci].i,0); if(!started){ state.started=true; play(); } return; }
    const it=state.items[state.idx];
    if(it&&it.type==='question'){ const m={a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3}[k.toLowerCase()]; if(m!==undefined&&m<it.seg.options.length){ answer(m); return; } if(k==='Enter'){ e.preventDefault(); verder(); return; } }
  });
  // glossary + transcript
  const gl=document.getElementById('glossary'); GLOSSARY.forEach(g=>{ const d=document.createElement('div'); d.className='term'+(g.vwo?' vwo':''); d.innerHTML=`<b>${g.t}</b>${g.vwo?' <i>vwo</i>':''}<p>${g.d}</p>`; gl.appendChild(d); });
  const tr=document.getElementById('transcript'); DATA.segments.filter(s=>s.kind==='speech').forEach(s=>{ const p=document.createElement('p'); p.className=s.level; p.innerHTML=(s.level==='vwo'?'<i>vwo</i> ':'')+s.words.map(w=>w.t).join(' ').replace(/ee-er/g,'ER').replace(/dee-en-aa/g,'DNA'); tr.appendChild(p); });
  tick();
}
window.addEventListener('load',init);
// test-haak voor stills en QA: __still('s05', 3.2) | __still('title',1) | __still('card:Hoofdstuk 2 — …',1) | __still('q08',2,'reveal')
window.__still=function(id,local,phase){ const i=state.items.findIndex(it=> (it.seg&&it.seg.id===id) || (id==='title'&&it.type==='title') || (id==='end'&&it.type==='end') || (id.startsWith('card:')&&it.type==='card'&&it.chapter===id.slice(5)));
  if(i<0) return false; state.idx=i; state.local=local; const it=state.items[i]; state.qPhase= it.type==='question'? {phase:phase||'countdown',start:0,chosen:phase==='reveal'?1:null}:null; state.playing=false; render(); return true; };
window.__items=()=>state.items.map(it=>({type:it.type,id:it.seg?it.seg.id:null,chapter:it.chapter,start:it.start,dur:it.dur,level:it.level}));
