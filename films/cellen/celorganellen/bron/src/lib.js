// ===== Part C tokens =====
const C = {
  bgMicro:'#121A26', bgMacroSky:'#1E2E4A', bgMacroHill:'#2F4A3A', bgMacroFront:'#3A5540', bgSchema:'#1A2740',
  goud:'#E0B64A', koraal:'#E07A5F', groen:'#7FC48F', teal:'#5BA4C9', paars:'#8C7BBF', oker:'#C9A35C',
  text:'#F2F2EE', text2:'#9AA3B2', line:'#8FA0B5', grain:'#C9B896', fill:'#2A3A58', kast:'#0D1420',
  mito:'#D88E7A', mitoR:'#F0B8A6', golgi:'#C98A3E', er:'#AFC0D0', lyso:'#3E9A78', ves:'#D4A83C', vesR:'#F0CC7A',
  kern:'#6E5A9E', kernR:'#A392D6', chloro:'#5FA86E', ribo:'#C9B896', enzym:'#7A8BA8', mens:'#9AA3B2',
  berg:'#4B5878', bergTop:'#B8C0D0', water:'#2E6FBF', bruin:'#8C5A3A', okerD:'#B08A5C'
};
const F = { titel:'"Fraunces","Playfair Display",Georgia,serif', tekst:'"Source Sans 3","Inter",system-ui,sans-serif', meta:'"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace' };
const W = 1920, H = 1080, CAPTION_Y = 900; // nothing below CAPTION_Y except captions

// ===== deterministic helpers =====
function hash(n){ let x = Math.sin(n*127.1+311.7)*43758.5453; return x - Math.floor(x); }
// smooth pseudo-random wander for particle i at time t (deterministic for any t)
function wander(i, t, amp, speed){
  const a = hash(i*3+1)*6.283, b = hash(i*3+2)*6.283, c = hash(i*3+3)*6.283;
  const s = speed*(0.7+0.6*hash(i*7+5));
  return { x: amp*(Math.sin(t*s+a)*0.6+Math.sin(t*s*2.3+b)*0.3+Math.sin(t*s*5.1+c)*0.1),
           y: amp*(Math.cos(t*s*1.1+b)*0.6+Math.cos(t*s*2.7+c)*0.3+Math.cos(t*s*4.3+a)*0.1) };
}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,u)=>a+(b-a)*clamp(u,0,1);
const ease=(u)=>{u=clamp(u,0,1);return u*u*(3-2*u);};
// ramp: 0→1 between t0 and t0+d
const ramp=(t,t0,d=0.6)=>ease((t-t0)/d);
function lighten(hex, k){ const n=parseInt(hex.slice(1),16); let r=n>>16,g=(n>>8)&255,b=n&255; r=Math.round(r+(255-r)*k); g=Math.round(g+(255-g)*k); b=Math.round(b+(255-b)*k); return `rgb(${r},${g},${b})`; }
function rgba(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`; }

// ===== grain texture (cached once) =====
let grainCanvas=null;
function grain(ctx){
  if(!grainCanvas){
    grainCanvas=document.createElement('canvas'); grainCanvas.width=W; grainCanvas.height=H;
    const g=grainCanvas.getContext('2d');
    // rustige textuur (feedback Kamiel 15 okt 2026): weinig, kleine, zachte deeltjes
    for(let i=0;i<1400;i++){ const x=hash(i*2)*W, y=hash(i*2+1)*H; if(y>CAPTION_Y-20) continue;
      g.fillStyle=rgba(C.grain,0.06+0.08*hash(i*5)); g.beginPath(); g.arc(x,y,0.7+1.1*hash(i*9),0,6.283); g.fill(); }
  }
  ctx.drawImage(grainCanvas,0,0);
}
function bg(ctx, look){
  ctx.fillStyle = look==='micro'?C.bgMicro: look==='macro'?C.bgMacroSky : C.bgSchema;
  ctx.fillRect(0,0,W,H);
  // geen korrel buiten cellen (BEELDAFSPRAKEN, frisse beeldreview 30 okt 2026): textuur alleen binnen een cel (cytoGrond / celDier)
}

// ===== shape primitives =====
function shape(ctx, fill, stroke, lw=1.5){ ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
function blob(ctx, x, y, rx, ry, wob=0, seed=0, t=0){ // organic ellipse
  ctx.beginPath();
  for(let i=0;i<=40;i++){ const a=i/40*6.283; const r=1+wob*(Math.sin(a*3+seed)*0.5+Math.sin(a*5+seed*2+t*0.3)*0.3);
    const px=x+Math.cos(a)*rx*r, py=y+Math.sin(a)*ry*r; i?ctx.lineTo(px,py):ctx.moveTo(px,py); }
  ctx.closePath();
}
function roundRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function text(ctx, s, x, y, font, color, align='left', base='alphabetic'){ ctx.font=font; ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline=base; ctx.fillText(s,x,y); }
const fTitel=(px)=>`700 ${px}px ${F.titel}`, fTekst=(px,w=400)=>`${w} ${px}px ${F.tekst}`, fMeta=(px)=>`500 ${px}px ${F.meta}`;
function metaText(ctx,s,x,y,color=C.grain,align='left',px=28){ ctx.save(); ctx.font=fMeta(px); ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline='alphabetic'; ctx.letterSpacing='3px'; ctx.fillText(s.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')),x,y); ctx.restore(); }

// ===== UI layer =====
// two-line label with leader line ending in dot; alpha for fade
function naamBij(ctx, name, meta, x, y, alpha=1, align='left', color=C.text){
  // naam (+ korte toelichting) direct bij een onderdeel, met donkere rand voor leesbaarheid; geen wijslijn
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.textBaseline='alphabetic'; ctx.lineJoin='round';
  const regels=[[name,fTekst(36,600),color,0,'0px']]; if(meta) regels.push([meta.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')),fMeta(26),C.grain,28,'3px']);
  const maat=regels.map(([s,f,,,ls])=>{ ctx.font=f; ctx.letterSpacing=ls; return ctx.measureText(s).width; }); const w=Math.max(...maat);
  let bx = align==='left'?x:(align==='right'?x-w:x-w/2); bx=Math.max(24,Math.min(W-24-w,bx));
  regels.forEach(([s,f,col,dy,ls],i)=>{ ctx.font=f; ctx.letterSpacing=ls; ctx.textAlign='left'; const lx = align==='left'?bx:(align==='right'?bx+w-maat[i]:bx+(w-maat[i])/2); ctx.strokeStyle=rgba(C.bgMicro,0.85); ctx.lineWidth=7; ctx.strokeText(s,lx,y+dy); ctx.fillStyle=col; ctx.fillText(s,lx,y+dy); });
  ctx.letterSpacing='0px'; ctx.restore();
}
function label(ctx, name, meta, ax, ay, lx, ly, alpha=1, color=C.text, forceAlign=null){
  // naam direct bij het onderdeel, zonder wijslijn (15 okt 2026): de richting ax,ay -> lx,ly bepaalt aan welke kant de naam staat
  if(alpha<=0.01) return;
  const dx=lx-ax, dy=ly-ay, L=Math.hypot(dx,dy)||1, ux=dx/L, uy=dy/L, D=Math.min(L,34);
  const x=ax+ux*D, y=ay+uy*D;
  const align = L<1 ? 'center' : (Math.abs(ux)>0.5 ? (ux<0?'right':'left') : 'center');
  let ny = L<1 ? y-(meta?2:-12) : (uy<-0.5 ? y-(meta?34:6) : (uy>0.5 ? y+30 : y+(meta?-2:12)));
  ny=Math.max(48,Math.min(CAPTION_Y-(meta?44:16),ny));
  naamBij(ctx,name,meta,x,ny,alpha,align,color);
}
function haak(ctx, x1, x2, y, msg, color=C.groen, alpha=1){ // bracket under elements + sentence
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=color; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x1,y+14); ctx.lineTo(x2,y+14); ctx.lineTo(x2,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo((x1+x2)/2,y+14); ctx.lineTo((x1+x2)/2,y+26); ctx.stroke();
  text(ctx,msg,(x1+x2)/2,y+66,fTekst(36,600),color,'center'); ctx.restore();
}
function zoomCircle(ctx, x, y, r, sx, sy, caption, alpha=1, drawInside){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha=alpha;
  ctx.strokeStyle=C.goud; ctx.lineWidth=1.5;
  // two straight leader lines from source to circle tangents
  const ang=Math.atan2(y-sy,x-sx); for(const d of [-1,1]){ const a=ang+d*Math.PI/2; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.clip(); drawInside&&drawInside(); ctx.restore();
  ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.stroke();
  if(caption) metaText(ctx,caption,x,y+r+40,C.grain,'center',26);
  ctx.restore();
}
function dim(ctx, fn, a=0.35){ ctx.save(); ctx.globalAlpha*=a; fn(); ctx.restore(); }
function scaleBar(ctx, txt='schematisch · niet op schaal'){ metaText(ctx,txt,W-40,H-22,C.text2,'right',22); }

// ===== organelle library (Part C2) =====
function membrane(ctx, x, y, rx, ry, color=C.er, wob=0.04, seed=1, t=0){
  blob(ctx,x,y,rx,ry,wob,seed,t); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.stroke();
  blob(ctx,x,y,rx-7,ry-7,wob,seed,t); ctx.lineWidth=1.2; ctx.stroke();
  // phospholipid heads as regular dots
  ctx.fillStyle=color; const n=Math.round((rx+ry)/9);
  for(let i=0;i<n;i++){ const a=i/n*6.283; const r=1+wob*(Math.sin(a*3+seed)*0.5+Math.sin(a*5+seed*2+t*0.3)*0.3);
    ctx.beginPath(); ctx.arc(x+Math.cos(a)*(rx-3.5)*r, y+Math.sin(a)*(ry-3.5)*r, 1.6,0,6.283); ctx.fill(); }
}
const _nucCache={};
function nucleus(ctx,x,y,r,alpha=1,t=0){
  const key=Math.round(r); let c=_nucCache[key];
  if(!c){ c=document.createElement('canvas'); const pad=14; c.width=Math.ceil(2*(r+pad)); c.height=c.width; const g=c.getContext('2d'); const cx=r+pad, cy=r+pad;
    blob(g,cx,cy,r,r*0.92,0.03,4,0); shape(g,C.kern,C.kernR,1.5);
    for(let i=0;i<Math.round(r*1.2);i++){ const a=hash(i*11+3)*6.283, d=Math.sqrt(hash(i*11+7))*r*0.85; g.fillStyle=rgba(C.kernR,0.35); g.beginPath(); g.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d*0.92,1.4,0,6.283); g.fill(); }
    g.strokeStyle=C.kernR; g.lineWidth=1.2; const pores=10;
    for(let i=0;i<pores;i++){ const a0=i/pores*6.283+0.08, a1=(i+1)/pores*6.283-0.08; g.beginPath(); g.ellipse(cx,cy,r+7,(r+7)*0.92,0,a0,a1); g.stroke(); }
    _nucCache[key]=c; }
  ctx.save(); ctx.globalAlpha*=alpha; ctx.drawImage(c,x-c.width/2,y-c.height/2); ctx.restore();
}
function mitochondrion(ctx,x,y,len,rot=0,alpha=1,cristae=5,t=0){
  ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot);
  const h=len*0.42, k=Math.max(1,len/110);
  roundRect(ctx,-len/2,-h/2,len,h,h/2); shape(ctx,C.mito,C.mitoR,1.5*k);
  const inset=6*k; roundRect(ctx,-len/2+inset,-h/2+inset,len-2*inset,h-2*inset,(h-2*inset)/2); ctx.fillStyle=rgba(C.bgMicro,0.18); ctx.fill(); ctx.strokeStyle=C.mitoR; ctx.lineWidth=1.2*k; ctx.stroke();
  // cristae: folds of the inner membrane, drawn as narrow loops
  ctx.strokeStyle=lighten(C.mitoR,0.15); ctx.lineWidth=1.3*k; ctx.fillStyle=C.mito;
  for(let i=0;i<cristae;i++){ const px=-len/2+inset+10*k+(len-2*inset-20*k)*(i+0.5)/cristae; const dir=i%2?1:-1; const y0=dir*(h/2-inset), depth=h*0.6, w=Math.max(3,len/40);
    ctx.beginPath(); ctx.moveTo(px-w,y0); ctx.lineTo(px-w,y0-dir*depth); ctx.arc(px,y0-dir*depth,w,Math.PI,0,dir>0); ctx.lineTo(px+w,y0); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
function golgi(ctx,x,y,w,alpha=1){
  ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=lighten(C.golgi,0.25); ctx.fillStyle=C.golgi; const gap=Math.max(12,w*0.075), th=Math.max(8,w*0.05);
  for(let i=0;i<5;i++){ const ww=w*(1-i*0.12), yy=y-i*gap; ctx.beginPath(); ctx.moveTo(x-ww/2,yy); ctx.quadraticCurveTo(x,yy-th*2.2,x+ww/2,yy); ctx.quadraticCurveTo(x,yy-th*0.6,x-ww/2,yy); ctx.closePath(); ctx.fill(); ctx.lineWidth=1; ctx.stroke(); }
  ctx.restore();
}
function roughER(ctx,x,y,w,rows=3,alpha=1,ribos=true){
  ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.er; ctx.lineWidth=1.5;
  for(let r=0;r<rows;r++){ const yy=y+r*26;
    for(const off of [0,8]){ ctx.beginPath(); for(let i=0;i<=24;i++){ const px=x-w/2+w*i/24, py=yy+off+Math.sin(i/24*6.283*1.5+r)*7; i?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.stroke(); }
    if(ribos){ ctx.fillStyle=C.ribo; for(let i=0;i<14;i++){ const px=x-w/2+w*(i+0.5)/14, py=yy-5+Math.sin((i+0.5)/14*6.283*1.5+r)*7; ctx.beginPath(); ctx.arc(px,py,3,0,6.283); ctx.fill(); } }
  }
  ctx.restore();
}
function vesicle(ctx,x,y,r=9,alpha=1,fill=C.ves,ring=C.vesR){ ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,fill,ring,1.2); ctx.restore(); }
function lysosome(ctx,x,y,r=12,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,C.lyso,lighten(C.lyso,0.3),1.2); ctx.restore(); }
function ribosome(ctx,x,y,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=C.ribo; ctx.beginPath(); ctx.arc(x,y,3.2,0,6.283); ctx.fill(); ctx.restore(); }
function chloroplast(ctx,x,y,len,alpha=1,rot=0){
  ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot);
  ctx.beginPath(); ctx.ellipse(0,0,len/2,len*0.3,0,0,6.283); shape(ctx,C.chloro,lighten(C.chloro,0.3),1.5);
  ctx.fillStyle=lighten(C.chloro,0.4); ctx.strokeStyle=rgba(C.bgMicro,0.7); ctx.lineWidth=Math.max(0.8,len/120);
  for(let g=0;g<3;g++){ const gx=-len*0.28+g*len*0.28; for(let k=0;k<5;k++){ roundRect(ctx,gx-len*0.1,-len*0.11+k*len*0.045,len*0.2,len*0.035,len*0.012); ctx.fill(); ctx.stroke(); } }
  ctx.restore();
}
function vacuole(ctx,x,y,rx,ry,alpha=1,fill=0.9){ ctx.save(); ctx.globalAlpha*=alpha; blob(ctx,x,y,rx*fill,ry*fill,0.03,9); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.2),1.5); ctx.restore(); }
function cellWall(ctx,x,y,rx,ry,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; blob(ctx,x,y,rx,ry,0.0,0); ctx.strokeStyle=C.groen; ctx.lineWidth=14; ctx.stroke(); ctx.strokeStyle=lighten(C.groen,0.3); ctx.lineWidth=1; ctx.stroke(); ctx.restore(); }
function cytoskeleton(ctx,x,y,rx,ry,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.line; ctx.lineWidth=0.75;
  for(let i=0;i<14;i++){ const a=hash(i*13)*6.283, a2=a+2.2+hash(i*13+1)*1.5; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*rx*0.95,y+Math.sin(a)*ry*0.95); ctx.quadraticCurveTo(x+(hash(i)*2-1)*rx*0.4,y+(hash(i+9)*2-1)*ry*0.4,x+Math.cos(a2)*rx*0.95,y+Math.sin(a2)*ry*0.95); ctx.stroke(); }
  ctx.restore(); }

// ===== the standard cell (series library: fixed in film 2) =====
// returns organelle positions so scenes can reference them
function cellLayout(cx=960, cy=520, rx=560, ry=330){
  const sx=rx/560, sy=ry/330, s=Math.min(sx,sy);
  return { cx,cy,rx,ry,
    kern:{x:cx-180*sx,y:cy-30*sy,r:118*s},
    er:{x:cx+40*sx,y:cy-150*sy,w:420*sx},
    golgi:{x:cx+300*sx,y:cy+40*sy,w:170*s},
    mitos:[{x:cx-430*sx,y:cy+90*sy,len:120*s,rot:-0.5},{x:cx+120*sx,y:cy+190*sy,len:110*s,rot:0.3},{x:cx-120*sx,y:cy+200*sy,len:100*s,rot:0.1},{x:cx+420*sx,y:cy-170*sy,len:95*s,rot:0.9}],
    lysos:[{x:cx+230*sx,y:cy+220*sy},{x:cx+470*sx,y:cy+150*sy}],
    vesicles:[{x:cx+170*sx,y:cy-40*sy},{x:cx+200*sx,y:cy-10*sy},{x:cx+395*sx,y:cy+10*sy},{x:cx+440*sx,y:cy-60*sy}],
    s
  };
}
function drawCell(ctx, L, t, opts={}){
  const {alpha=1, focus=null, showER=true, showGolgi=true, showMito=true, showLyso=true, showVes=true, showKern=true, showRibo=true, showSkel=false, motion=0} = opts;
  const dimOthers = focus? 0.35 : 1;
  const A = (name)=> (focus===null||focus===name||(Array.isArray(focus)&&focus.includes(name)))?alpha:alpha*dimOthers;
  ctx.save();
  if(showSkel) cytoskeleton(ctx,L.cx,L.cy,L.rx,L.ry,A('skel'));
  if(showRibo){ for(let i=0;i<120;i++){ const a=hash(i*17)*6.283, d=Math.sqrt(hash(i*17+1)); const px=L.cx+Math.cos(a)*d*L.rx*0.9, py=L.cy+Math.sin(a)*d*L.ry*0.9; const dk=Math.hypot(px-L.kern.x,py-L.kern.y); if(dk<L.kern.r+20) continue; const w=wander(i,t,10*motion,0.8); ribosome(ctx,px+w.x,py+w.y,A('ribo')*0.8); } }
  if(showER) roughER(ctx,L.er.x,L.er.y,L.er.w,(L.s||1)<0.7?2:3,A('er'));
  if(showKern) nucleus(ctx,L.kern.x,L.kern.y,L.kern.r,A('kern'),t);
  if(showGolgi) golgi(ctx,L.golgi.x,L.golgi.y,L.golgi.w,A('golgi'));
  if(showMito) L.mitos.forEach((m,i)=>{ const w=wander(i+50,t,40*motion,0.5); mitochondrion(ctx,m.x+w.x,m.y+w.y,m.len,m.rot+ (motion?Math.sin(t*0.4+i)*0.1:0),A('mito')); });
  if(showLyso) L.lysos.forEach((l,i)=>{ const w=wander(i+70,t,50*motion,0.9); lysosome(ctx,l.x+w.x,l.y+w.y,12*(L.s||1),A('lyso')); });
  if(showVes) L.vesicles.forEach((v,i)=>{ const w=wander(i+90,t,90*motion,1.3); vesicle(ctx,v.x+w.x,v.y+w.y,9*(L.s||1),A('ves')); });
  membrane(ctx,L.cx,L.cy,L.rx,L.ry,C.er,0.04,1,t*motion);
  ctx.restore();
}

// ===== levenskenmerken bord (Schema card, top-right; six fixed slots) =====
const KENMERKEN=['stoffen omzetten','groeien','zich voortplanten','bewegen','reageren op de omgeving','in evenwicht houden'];
function board(ctx, lit, alpha=1, x=60, y=76, w=1800){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  const cw=(w-2*12)/3, ch=50;
  KENMERKEN.forEach((k,i)=>{ const col=i%3,row=Math.floor(i/3); const xx=x+col*(cw+12), yy=y+row*(ch+8); const u=lit[i]||0;
    roundRect(ctx,xx,yy,cw,ch,10); ctx.fillStyle = u>0? rgba(C.groen,0.16*u+0.06): rgba(C.bgSchema,0.85); ctx.fill(); ctx.strokeStyle = u>0? rgba(C.groen,0.45+0.55*u): rgba(C.line,0.45); ctx.lineWidth=1; ctx.stroke();
    text(ctx,k,xx+18,yy+34,fTekst(28,u>0?600:400),u>0?C.text:C.text2,'left');
    if(u>0){ ctx.save(); ctx.globalAlpha*=u; ctx.fillStyle=C.groen; ctx.beginPath(); ctx.arc(xx+cw-22,yy+25,6,0,6.283); ctx.fill(); ctx.restore(); }
  });
  ctx.restore();
}

// ===== naam zonder lijntje: direct bij het object (beeldafspraak) =====
function naam(ctx, name, meta, x, y, alpha=1, align='center', color=C.text){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  text(ctx,name,x,y,fTekst(34,600),color,align); if(meta) metaText(ctx,meta,x,y+30,C.grain,align,22); ctx.restore();
}
// DNA in de kern (chromatine): losse, zacht kronkelende draden met hier en daar een opgerold stukje, plus een kernlichaampje
function chromatine(ctx,x,y,r,t=0){ ctx.save(); ctx.beginPath(); ctx.ellipse(x,y,r*0.86,r*0.8,0,0,6.283); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x+r*0.22,y-r*0.12,r*0.16,r*0.14,0.3,0,6.283); ctx.fillStyle=rgba('#3E2E6A',0.75); ctx.fill();
  const cols=[lighten(C.kernR,0.55),lighten(C.kernR,0.35)];
  for(let d=0;d<6;d++){ const pts=[]; let a=hash(d*13+1)*6.283, rr=r*(0.25+0.45*hash(d*13+2)); for(let k=0;k<8;k++){ a+=0.7+hash(d*13+k*3+5)*0.9; rr=Math.max(r*0.12,Math.min(r*0.72,rr+(hash(d*13+k*3+6)-0.5)*r*0.35)); pts.push([x+Math.cos(a)*rr+Math.sin(t*0.4+d+k)*1.5,y+Math.sin(a)*rr*0.92+Math.cos(t*0.35+d*2+k)*1.5]); }
    ctx.strokeStyle=cols[d%2]; ctx.lineWidth=2.6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); for(let k=1;k<pts.length-1;k++){ const mx=(pts[k][0]+pts[k+1][0])/2, my=(pts[k][1]+pts[k+1][1])/2; ctx.quadraticCurveTo(pts[k][0],pts[k][1],mx,my); } ctx.stroke();
    // twee opgerolde stukjes per draad (zoals DNA rond eiwitten gewonden)
    for(const k of [2,5]){ const [px,py]=pts[k]; ctx.lineWidth=1.6; ctx.beginPath(); for(let i=0;i<=24;i++){ const s=i/24*6.283*2.2; const rx=px+Math.cos(s)*(5+i*0.25), ry=py+Math.sin(s)*(5+i*0.25)*0.8; i?ctx.lineTo(rx,ry):ctx.moveTo(rx,ry);} ctx.stroke(); } }
  ctx.restore(); }
// exocytose: blaasje versmelt met het celmembraan (membraan bij x=M, binnenkant links); f = 0..1
function instulp(ctx,mx,y,f,drift=0,ca=1){ // endocytose: membraan (binnenlijn x = mx(y), buiten = rechts) stulpt in rond deeltjes en snoert af tot een blaasje
  const e=ease(f), a=Math.min(e/0.8,1), R=44, op=lerp(2.95,0.06,a), M=mx(y)+4.5, cx0=M-R*Math.cos(op);
  const ves=e>0.8, k=ves?ramp(e,0.8,0.2):0, cx=ves?cx0-60*ease(k)-drift:cx0;
  const dbl=(path,fill)=>{ path(); if(fill){ ctx.fillStyle=fill; ctx.fill(); } ctx.strokeStyle=C.er; ctx.lineWidth=11; path(); ctx.stroke(); ctx.strokeStyle=C.bgMicro; ctx.lineWidth=7; path(); ctx.stroke(); };
  ctx.save(); ctx.lineCap='butt';
  if(!ves){ const gy=R*Math.sin(op)+38, L=26, Lm=30;
    ctx.strokeStyle=C.bgMicro; ctx.lineWidth=18; ctx.beginPath(); for(let yy=y-gy-1;yy<=y+gy+1;yy+=3){ const x=mx(yy)+4.5; yy===y-gy-1?ctx.moveTo(x,yy):ctx.lineTo(x,yy);} ctx.stroke();
    const Pt=[cx+R*Math.cos(op),y-R*Math.sin(op)], Pb=[cx+R*Math.cos(op),y+R*Math.sin(op)], s=Math.sin(op), c=Math.cos(op);
    const path=()=>{ ctx.beginPath(); ctx.moveTo(mx(y-gy)+4.5,y-gy); ctx.bezierCurveTo(mx(y-gy+Lm)+4.5,y-gy+Lm,Pt[0]+L*s,Pt[1]+L*c,Pt[0],Pt[1]); ctx.arc(cx,y,R,2*Math.PI-op,op,true); ctx.bezierCurveTo(Pb[0]+L*s,Pb[1]-L*c,mx(y+gy-Lm)+4.5,y+gy-Lm,mx(y+gy)+4.5,y+gy); };
    dbl(path,null);
    ctx.fillStyle=C.er; for(let i=0;i<16;i++){ const ang=op+0.12+(2*Math.PI-2*op-0.24)*i/15; ctx.beginPath(); ctx.arc(cx+R*Math.cos(ang),y+R*Math.sin(ang),1.6,0,6.283); ctx.fill(); }
  } else { dbl(()=>{ ctx.beginPath(); ctx.arc(cx,y,R,0,6.283); },rgba(C.ves,0.3));
    ctx.fillStyle=C.er; for(let i=0;i<18;i++){ const ang=i*Math.PI/9; ctx.beginPath(); ctx.arc(cx+R*Math.cos(ang),y+R*Math.sin(ang),1.6,0,6.283); ctx.fill(); } }
  ctx.globalAlpha*=ca; ctx.fillStyle=C.oker; for(const [dx,dy] of [[-12,-8],[10,-12],[2,12]]){ ctx.beginPath(); ctx.arc(Math.min(cx,M+30)+dx,y+dy,7,0,6.283); ctx.fill(); }
  ctx.restore(); return cx; }
function versmelt(ctx,M,y,f){ const e=ease(f), op=lerp(0.04,2.3,e), r=lerp(56,46,e), cx=M-r*Math.cos(op), gy=r*Math.sin(op), fade=1-ramp(f,0.85,0.15);
  ctx.save(); ctx.fillStyle=C.bgMicro; ctx.fillRect(M-2,y-gy,14,2*gy);
  ctx.globalAlpha*=0.75*fade+0.25; ctx.beginPath(); ctx.arc(cx,y,r,op,2*Math.PI-op,false); ctx.closePath(); ctx.fillStyle=C.ves; ctx.fill();
  ctx.globalAlpha=1; ctx.strokeStyle=C.er; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,y,r,op,2*Math.PI-op,false); ctx.stroke();
  for(const s of [-1,1]){ ctx.beginPath(); ctx.moveTo(cx+r*Math.cos(op),y+s*gy); ctx.quadraticCurveTo(M+4,y+s*(gy+3),M+9,y+s*(gy+6)); ctx.stroke(); }
  ctx.restore(); }
// ===== moleculen met een herkenbare vorm =====
function hexPath(ctx,x,y,r,rot=0){ ctx.beginPath(); for(let i=0;i<6;i++){ const a=rot+i*Math.PI/3+Math.PI/6; const px=x+Math.cos(a)*r, py=y+Math.sin(a)*r; i?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.closePath(); }
function glucoseMol(ctx,x,y,s=1,alpha=1,rot=0){ // zeshoekige ring
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; hexPath(ctx,x,y,11*s,rot); ctx.fillStyle=rgba(C.oker,0.35); ctx.fill(); ctx.strokeStyle=C.oker; ctx.lineWidth=2.2*s; ctx.stroke();
  ctx.fillStyle=C.oker; ctx.beginPath(); const a=rot+Math.PI/6; ctx.arc(x+Math.cos(a)*11*s+5*s,y+Math.sin(a)*11*s-4*s,2.4*s,0,6.283); ctx.fill(); ctx.restore(); }
function pyruvaatMol(ctx,x,y,s=1,alpha=1,rot=0){ // brokstuk: ketentje van drie C
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot); ctx.strokeStyle=C.oker; ctx.lineWidth=2.2*s;
  const P=[[-11,3],[0,-4],[11,3]]; ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0]*s,p[1]*s):ctx.moveTo(p[0]*s,p[1]*s)); ctx.stroke();
  ctx.fillStyle=C.oker; for(const p of P){ ctx.beginPath(); ctx.arc(p[0]*s,p[1]*s,3.4*s,0,6.283); ctx.fill(); } ctx.restore(); }
function o2Mol(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=C.teal; for(const d of [-1,1]){ ctx.beginPath(); ctx.arc(x+d*4.5*s,y,5.2*s,0,6.283); ctx.fill(); } ctx.restore(); }
function co2Mol(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=C.mens; ctx.beginPath(); ctx.arc(x,y,4.6*s,0,6.283); ctx.fill(); ctx.fillStyle=lighten(C.teal,0.2); for(const d of [-1,1]){ ctx.beginPath(); ctx.arc(x+d*8.5*s,y,4.4*s,0,6.283); ctx.fill(); } ctx.restore(); }
function atpMol(ctx,x,y,s=1,alpha=1,nP=3,pLos=0){ // base + suiker + staartje van fosfaatgroepen; pLos: laatste fosfaat schuift weg (0..1)
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y);
  ctx.fillStyle=rgba(C.paars,0.9); roundRect(ctx,-22*s,-12*s,12*s,12*s,3*s); ctx.fill(); // base
  ctx.strokeStyle=C.koraal; ctx.lineWidth=1.6*s; ctx.beginPath(); ctx.moveTo(-10*s,-6*s); ctx.lineTo(-6*s,-2*s); ctx.stroke();
  ctx.beginPath(); for(let i=0;i<5;i++){ const a=-Math.PI/2+i*2*Math.PI/5; const px=-2*s+Math.cos(a)*6*s, py=2*s+Math.sin(a)*6*s; i?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.closePath(); ctx.fillStyle=rgba(C.koraal,0.5); ctx.fill(); ctx.stroke(); // suiker
  for(let i=0;i<nP;i++){ const last=i===nP-1; const dx=(last?pLos*14:0), dy=(last?-pLos*10:0); const px=(8+i*9)*s+dx, py=2*s+dy;
    if(!(last&&pLos>0.3)){ ctx.beginPath(); ctx.moveTo(px-9*s,2*s); ctx.lineTo(px-3*s,py); ctx.stroke(); }
    ctx.fillStyle=C.koraal; ctx.beginPath(); ctx.arc(px,py,3.6*s,0,6.283); ctx.fill(); }
  ctx.restore(); }
function molFlow(ctx, path, n, t, speed, drawFn, seedOff=0, alpha=1){ // als particleFlow, maar met een eigen molecuulvorm
  const segs=[]; let total=0; for(let i=1;i<path.length;i++){ const d=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]); segs.push(d); total+=d; }
  for(let k=0;k<n;k++){ let d=((t*speed + hash(k+seedOff)*total) % total); let i=0; while(d>segs[i]){ d-=segs[i]; i++; } const u=d/segs[i];
    const x=lerp(path[i][0],path[i+1][0],u), y=lerp(path[i][1],path[i+1][1],u); const w=wander(k+seedOff,t,4,2);
    const fade=Math.min(1,(d+ (i?segs.slice(0,i).reduce((a,b)=>a+b,0):0))/40, (total-(d+(i?segs.slice(0,i).reduce((a,b)=>a+b,0):0)))/40);
    drawFn(x+w.x,y+w.y,alpha*clamp(fade,0,1),k,t); }
}
// ===== mRNA: dunne, kronkelende enkele streng met basen-streepjes =====
function mrnaStrand(ctx,x,y,len,ang,t,alpha=1,lw=2.4){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(ang);
  const n=Math.max(8,Math.round(len/5)); const pts=[]; for(let i=0;i<=n;i++){ const u=i/n; pts.push([u*len-len/2, Math.sin(u*len/11+t*3)*5+Math.sin(u*len/29+t*1.3)*7]); }
  const cols=[C.koraal,C.teal,C.groen,C.oker]; ctx.lineWidth=1.6;
  for(let i=1;i<n;i+=2){ const [px,py]=pts[i]; ctx.strokeStyle=cols[(i>>1)%4]; ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(px,py+7); ctx.stroke(); }
  ctx.strokeStyle=C.teal; ctx.lineWidth=lw; ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.restore(); }
// ===== eiwit: kralenketting die zich opvouwt; suikerketen (vertakt) groeit eraan =====
function eiwitKeten(ctx,x,y,s=1,fold=1,sug=0,alpha=1,shown=1,sugCol=C.groen,t=0){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const N=16, m=Math.max(1,Math.round(N*shown));
  const P=[]; for(let i=0;i<N;i++){ const lx=(i-N/2)*7, ly=Math.sin(i*0.9)*5; // uitgestrekt
    const a=i*0.95, r=4+ (i%5)*2.2; const fx=Math.cos(a)*r+Math.sin(i*1.7)*3, fy=Math.sin(a)*r*0.9+Math.cos(i*2.3)*3; // kluwen
    P.push([x+lerp(lx,fx,fold)*s, y+lerp(ly,fy,fold)*s]); }
  ctx.strokeStyle=lighten(C.goud,0.1); ctx.lineWidth=2*s; ctx.beginPath(); for(let i=0;i<m;i++){ i?ctx.lineTo(P[i][0],P[i][1]):ctx.moveTo(P[i][0],P[i][1]); } ctx.stroke();
  ctx.fillStyle=C.goud; for(let i=0;i<m;i++){ ctx.beginPath(); ctx.arc(P[i][0],P[i][1],2.6*s,0,6.283); ctx.fill(); }
  if(sug>0.01){ const b=P[Math.min(m-1,N-4)]; const g=[[0,0,0,-9],[0,-9,-6,-16],[0,-9,6,-16],[6,-16,6,-24],[-6,-16,-10,-23]];
    const k=Math.ceil(sug*g.length); ctx.strokeStyle=sugCol; ctx.lineWidth=1.6*s; ctx.fillStyle=sugCol;
    for(let j=0;j<k;j++){ const e=g[j]; const f=j<k-1?1:clamp(sug*g.length-j,0,1); const x2=lerp(e[0],e[2],f), y2=lerp(e[1],e[3],f);
      ctx.beginPath(); ctx.moveTo(b[0]+e[0]*s,b[1]+e[1]*s); ctx.lineTo(b[0]+x2*s,b[1]+y2*s); ctx.stroke(); hexPath(ctx,b[0]+x2*s,b[1]+y2*s,2.8*s); ctx.fill(); } }
  ctx.restore(); }
// ===== gebogen celmembraan (een cel is rond): stukje van een grote cirkel, binnenkant links =====
function memX(cx,cy,R,y){ return cx+Math.sqrt(Math.max(0,R*R-(y-cy)*(y-cy))); }
function membraanBoog(ctx,cx,cy,R,y0,y1,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.er;
  for(const [dr,lw] of [[0,2],[9,2]]){ ctx.lineWidth=lw; ctx.beginPath(); for(let y=y0;y<=y1;y+=6){ const x=memX(cx,cy,R+dr,y); y===y0?ctx.moveTo(x,y):ctx.lineTo(x,y);} ctx.stroke(); }
  ctx.fillStyle=C.er; for(let y=y0+10;y<y1;y+=12){ ctx.beginPath(); ctx.arc(memX(cx,cy,R+4.5,y),y,1.6,0,6.283); ctx.fill(); } ctx.restore(); }
