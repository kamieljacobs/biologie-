/* beeldbank.js: GEBOUWD met bouw_beeldbank.py, niet met de hand aanpassen */
(function () {

// ---- films/voeding/1-wat-zit-er-in-je-eten/bron/src/lib.js
// ===== Part C tokens =====
var C = {
  bgMicro:'#121A26', bgMacroSky:'#1E2E4A', bgMacroHill:'#2F4A3A', bgMacroFront:'#3A5540', bgSchema:'#1A2740',
  goud:'#E0B64A', koraal:'#E07A5F', groen:'#7FC48F', teal:'#5BA4C9', paars:'#8C7BBF', oker:'#C9A35C',
  text:'#F2F2EE', text2:'#9AA3B2', line:'#8FA0B5', grain:'#C9B896', fill:'#2A3A58', kast:'#0D1420',
  mito:'#D88E7A', mitoR:'#F0B8A6', golgi:'#C98A3E', er:'#AFC0D0', lyso:'#3E9A78', ves:'#D4A83C', vesR:'#F0CC7A',
  kern:'#6E5A9E', kernR:'#A392D6', chloro:'#5FA86E', ribo:'#C9B896', enzym:'#7A8BA8', mens:'#9AA3B2',
  berg:'#4B5878', bergTop:'#B8C0D0', water:'#2E6FBF', bruin:'#8C5A3A', okerD:'#B08A5C'
};
var F = { titel:'"Fraunces","Playfair Display",Georgia,serif', tekst:'"Source Sans 3","Inter",system-ui,sans-serif', meta:'"IBM Plex Mono","JetBrains Mono",ui-monospace,monospace' };
var W = 1920, H = 1080, CAPTION_Y = 900; // nothing below CAPTION_Y except captions

// ===== deterministic helpers =====
function hash(n){ let x = Math.sin(n*127.1+311.7)*43758.5453; return x - Math.floor(x); }
// smooth pseudo-random wander for particle i at time t (deterministic for any t)
function wander(i, t, amp, speed){
  const a = hash(i*3+1)*6.283, b = hash(i*3+2)*6.283, c = hash(i*3+3)*6.283;
  const s = speed*(0.7+0.6*hash(i*7+5));
  return { x: amp*(Math.sin(t*s+a)*0.6+Math.sin(t*s*2.3+b)*0.3+Math.sin(t*s*5.1+c)*0.1),
           y: amp*(Math.cos(t*s*1.1+b)*0.6+Math.cos(t*s*2.7+c)*0.3+Math.cos(t*s*4.3+a)*0.1) };
}
var clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
var lerp=(a,b,u)=>a+(b-a)*clamp(u,0,1);
var ease=(u)=>{u=clamp(u,0,1);return u*u*(3-2*u);};
// ramp: 0→1 between t0 and t0+d
var ramp=(t,t0,d=0.6)=>ease((t-t0)/d);
function lighten(hex, k){ const n=parseInt(hex.slice(1),16); let r=n>>16,g=(n>>8)&255,b=n&255; r=Math.round(r+(255-r)*k); g=Math.round(g+(255-g)*k); b=Math.round(b+(255-b)*k); return `rgb(${r},${g},${b})`; }
function rgba(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`; }

// ===== grain texture (cached once) =====
var grainCanvas=null;
function grain(ctx){
  if(!grainCanvas){
    grainCanvas=document.createElement('canvas'); grainCanvas.width=W; grainCanvas.height=H;
    const g=grainCanvas.getContext('2d');
    for(let i=0;i<1400;i++){ const x=hash(i*2)*W, y=hash(i*2+1)*H; if(y>CAPTION_Y-20) continue;
      g.fillStyle=rgba(C.grain,0.06+0.08*hash(i*5)); g.beginPath(); g.arc(x,y,0.8+1.2*hash(i*9),0,6.283); g.fill(); }
  }
  ctx.drawImage(grainCanvas,0,0);
}
function bg(ctx, look){
  ctx.fillStyle = look==='micro'?C.bgMicro: look==='macro'?C.bgMacroSky : C.bgSchema;
  ctx.fillRect(0,0,W,H);
  // korrel weg (Kamiel 15 okt 2026 / prompt v8): egale achtergrond; textuur alleen binnen een cel
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
var fTitel=(px)=>`700 ${px}px ${F.titel}`, fTekst=(px,w=400)=>`${w} ${px}px ${F.tekst}`, fMeta=(px)=>`500 ${px}px ${F.meta}`;
function metaText(ctx,s,x,y,color=C.grain,align='left',px=28){ ctx.save(); ctx.font=fMeta(px); ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline='alphabetic'; ctx.letterSpacing='3px'; ctx.fillText(s.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')),x,y); ctx.restore(); }

// ===== UI layer =====
// naam bij een onderdeel, zonder wijslijn (15 okt 2026); alpha for fade
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
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x1,y+14); ctx.lineTo(x2,y+14); ctx.lineTo(x2,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo((x1+x2)/2,y+14); ctx.lineTo((x1+x2)/2,y+26); ctx.stroke();
  text(ctx,msg,(x1+x2)/2,y+66,fTekst(36,600),color,'center'); ctx.restore();
}
function zoomCircle(ctx, x, y, r, sx, sy, caption, alpha=1, drawInside){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  ctx.strokeStyle=C.goud; ctx.lineWidth=1.5;
  // two straight leader lines from source to circle tangents
  const ang=Math.atan2(y-sy,x-sx); for(const d of [-1,1]){ const a=ang+d*Math.PI/2; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.clip(); drawInside&&drawInside(); ctx.restore();
  ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.stroke();
  if(caption) metaText(ctx,caption,x,y+r+40,C.grain,'center',28);
  ctx.restore();
}
function dim(ctx, fn, a=0.35){ ctx.save(); ctx.globalAlpha*=a; fn(); ctx.restore(); }
function scaleBar(ctx, txt='schematisch · niet op schaal'){ metaText(ctx,txt,W-40,H-22,C.text2,'right',28); }

// ===== organelle library (Part C2) =====
function membrane(ctx, x, y, rx, ry, color=C.er, wob=0.04, seed=1, t=0){
  blob(ctx,x,y,rx,ry,wob,seed,t); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.stroke();
  blob(ctx,x,y,rx-7,ry-7,wob,seed,t); ctx.lineWidth=1.2; ctx.stroke();
  // phospholipid heads as regular dots
  ctx.fillStyle=color; const n=Math.round((rx+ry)/9);
  for(let i=0;i<n;i++){ const a=i/n*6.283; const r=1+wob*(Math.sin(a*3+seed)*0.5+Math.sin(a*5+seed*2+t*0.3)*0.3);
    ctx.beginPath(); ctx.arc(x+Math.cos(a)*(rx-3.5)*r, y+Math.sin(a)*(ry-3.5)*r, 1.6,0,6.283); ctx.fill(); }
}
var _nucCache={};
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
var KENMERKEN=['stoffen omzetten','groeien','zich voortplanten','bewegen','reageren op de omgeving','in evenwicht houden'];
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

// ===== shared helpers (from Celorganellen) =====
function human(ctx,x,y,h,alpha=1,color=C.mens){ // simple flat figure with a plain face (Part C)
  ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=color; const u=h/8;
  ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9,0,6.283); ctx.fill();
  roundRect(ctx,x-u*1.3,y-h+u*2.1,u*2.6,u*3.6,u*0.8); ctx.fill();
  roundRect(ctx,x-u*1.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill(); roundRect(ctx,x+u*0.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x-u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.arc(x+u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.fill();
  ctx.strokeStyle=C.bgSchema; ctx.lineWidth=u*0.08; ctx.beginPath(); ctx.arc(x,y-h+u*1.1,u*0.3,0.3,2.84); ctx.stroke();
  ctx.restore();
}
function particleFlow(ctx, path, n, t, speed, color, r=5, seedOff=0, alpha=1){ // particles along polyline path [[x,y],...] looping
  const segs=[]; let total=0; for(let i=1;i<path.length;i++){ const d=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]); segs.push(d); total+=d; }
  ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=color;
  for(let k=0;k<n;k++){ let d=((t*speed + hash(k+seedOff)*total) % total); let i=0; while(d>segs[i]){ d-=segs[i]; i++; } const u=d/segs[i];
    const x=lerp(path[i][0],path[i+1][0],u), y=lerp(path[i][1],path[i+1][1],u); const w=wander(k+seedOff,t,4,2);
    ctx.beginPath(); ctx.arc(x+w.x,y+w.y,r,0,6.283); ctx.fill(); }
  ctx.restore();
}
function card(ctx, x, y, w, h, title, body, alpha=1, accent=C.goud){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; roundRect(ctx,x,y,w,h,12); shape(ctx,rgba(C.bgSchema,0.94),C.line,1);
  if(title) text(ctx,title,x+28,y+52,fTekst(36,600),accent);
  if(body){ ctx.font=fTekst(36); ctx.fillStyle=C.text; wrap(ctx,body,x+28,y+(title?100:52),w-56,42); }
  ctx.restore();
}
function wrap(ctx, s, x, y, maxW, lh){ const words=s.split(' '); let line=''; for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; } if(line) ctx.fillText(line,x,y); return y; }

// ---- films/voeding/1-wat-zit-er-in-je-eten/bron/src/lib_voeding.js
// ===== Reeks Voeding: seriebibliotheek (vastgelegd in film 1) =====
// Kleuren: voedsel en voedingsstoffen oker, drie tinten (koolhydraat licht, eiwit midden, vet donker) + eigen vorm.
var V = {
  kh: '#DCC07F',      // koolhydraat: lichte oker, zeshoek
  ew: '#C9A35C',      // eiwit: oker, kraal
  vt: '#9C7A3C',      // vet: donkere oker, E-vorm
  vtR: '#C9A35C',
  vezel: '#7FC48F',   // cellulose/vezel: groen (plant)
  neutraal: '#AFC0D0',// mineralen, vitaminen, gal, glas, darmwand
  melk: '#E6E1D3',    // melk als vlak (neutraal licht)
  essentieel: '#E0B64A'
};

// --- moleculen (Micro) ---
function hexagon(ctx, x, y, r, fill, stroke, lw = 1.3, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) { const a = rot + Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, fill, stroke, lw);
}
// keten van suikers langs x; cut = array van indices waarachter de keten geknipt is (spreidt de stukken), sep = 0..1
function sugarChain(ctx, x, y, n, r = 14, opts = {}) {
  const { fill = V.kh, alpha = 1, cut = null, sep = 0, angle = 0, wobble = 0, t = 0, seed = 0 } = opts;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(angle);
  const step = r * 2.25; const pos = [];
  let off = 0;
  for (let i = 0; i < n; i++) {
    if (cut && cut.includes(i - 1)) off += sep * r * 3;
    const w = wobble ? wander(i + seed * 31, t, wobble, 0.7) : { x: 0, y: 0 };
    pos.push([i * step + off + w.x * (cut ? sep : 1), w.y * (cut ? sep : 1) + Math.sin(i * 0.9 + seed) * r * 0.25]);
  }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  for (let i = 1; i < n; i++) { if (cut && cut.includes(i - 1) && sep > 0.05) continue; ctx.beginPath(); ctx.moveTo(pos[i - 1][0] + r * 0.8, pos[i - 1][1]); ctx.lineTo(pos[i][0] - r * 0.8, pos[i][1]); ctx.stroke(); }
  pos.forEach(p => hexagon(ctx, p[0], p[1], r, fill, lighten(fill, 0.35)));
  ctx.restore();
  return pos.map(p => [x + p[0] * Math.cos(angle) - p[1] * Math.sin(angle), y + p[0] * Math.sin(angle) + p[1] * Math.cos(angle)]);
}
// vertakte keten (glycogeen): boom van zeshoeken
function glycogen(ctx, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; const r = 9 * s;
  const branches = [[0, 0, 0, 7], [3, 0, -0.6, 5], [5, 0, 0.6, 4], [2, 1, -0.7, 3], [3, 2, 0.7, 3]];
  const pts = [];
  // trunk
  let tr = []; for (let i = 0; i < 7; i++) tr.push([x + i * r * 2.2, y]); pts.push(tr);
  const b1 = []; for (let i = 1; i <= 5; i++) b1.push([x + 3 * r * 2.2 + i * r * 1.6, y - i * r * 1.6]); pts.push(b1);
  const b2 = []; for (let i = 1; i <= 4; i++) b2.push([x + 5 * r * 2.2 + i * r * 1.6, y + i * r * 1.6]); pts.push(b2);
  const b3 = []; for (let i = 1; i <= 3; i++) b3.push([b1[1][0] + i * r * 2, b1[1][1] - i * r * 0.1 - r * 0.3]); pts.push(b3);
  const b4 = []; for (let i = 1; i <= 3; i++) b4.push([x + r * 2.2 + i * r * 1.5, y + i * r * 1.6]); pts.push(b4);
  ctx.strokeStyle = lighten(V.kh, 0.3); ctx.lineWidth = 1.6;
  pts.forEach(br => { ctx.beginPath(); br.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); });
  pts.forEach(br => br.forEach(p => hexagon(ctx, p[0], p[1], r, V.kh, lighten(V.kh, 0.35), 1.1)));
  ctx.restore();
}
// 20 aminozuren: kralen in oker-tinten met vier vormen; essentieel = gouden rand (alleen waar het verteld wordt)
var AA_ESS = [0, 2, 4, 6, 9, 11, 13, 15, 18]; // negen soorten die het verhaal "essentieel" noemt (schematisch)
function bead(ctx, x, y, r, kind, opts = {}) {
  const { alpha = 1, ess = false, dimNonEss = false, lab = null } = opts;
  ctx.save(); ctx.globalAlpha *= alpha * (dimNonEss && !AA_ESS.includes(kind) ? 0.35 : 1);
  const tint = [0.0, 0.18, 0.36, -0.12][kind % 4]; const fill = tint >= 0 ? lighten(V.ew, tint) : '#A8854A';
  const form = Math.floor(kind / 4) % 5; const stroke = ess && AA_ESS.includes(kind) ? C.goud : lighten(V.ew, 0.45); const lw = ess && AA_ESS.includes(kind) ? 2.4 : 1.2;
  ctx.beginPath();
  if (form === 0) ctx.arc(x, y, r, 0, 6.283);
  else if (form === 1) roundRect(ctx, x - r * 0.9, y - r * 0.9, r * 1.8, r * 1.8, r * 0.45);
  else if (form === 2) { ctx.moveTo(x, y - r * 1.05); ctx.lineTo(x + r, y + r * 0.8); ctx.lineTo(x - r, y + r * 0.8); ctx.closePath(); }
  else if (form === 3) { ctx.moveTo(x, y - r * 1.1); ctx.lineTo(x + r * 1.05, y); ctx.lineTo(x, y + r * 1.1); ctx.lineTo(x - r * 1.05, y); ctx.closePath(); }
  else { ctx.ellipse(x, y, r * 1.2, r * 0.8, 0, 0, 6.283); }
  shape(ctx, fill, stroke, lw);
  if (lab) text(ctx, lab, x, y + 6, fMeta(28), C.bgMicro, 'center');
  ctx.restore();
}
// eiwitketen langs een pad van punten; kinds per kraal
function proteinChain(ctx, pts, kinds, r = 12, opts = {}) {
  const { alpha = 1, ess = false, upto = pts.length } = opts;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2;
  ctx.beginPath(); for (let i = 0; i < Math.min(upto, pts.length); i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke();
  for (let i = 0; i < Math.min(upto, pts.length); i++) bead(ctx, pts[i][0], pts[i][1], r, kinds[i % kinds.length], { ess });
  ctx.restore();
}
function coilPath(x, y, n, step = 26, amp = 40, freq = 0.55) { const p = []; for (let i = 0; i < n; i++) p.push([x + i * step, y + Math.sin(i * freq) * amp + Math.sin(i * freq * 2.3) * amp * 0.3]); return p; }
// vetzuur: zigzag-staart
function fattyAcid(ctx, x, y, len, s = 1, alpha = 1, color = V.vt) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = lighten(color, 0.35); ctx.lineWidth = 5 * s; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); const n = Math.round(len / (12 * s)); for (let i = 0; i <= n; i++) { const px = x + i * 12 * s, py = y + (i % 2 ? 6 : -6) * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = 2.5 * s; ctx.stroke(); ctx.restore();
}
// triglyceride: glycerol (staafje met drie knoppen) + drie vetzuren; spread 0..1 laat de vetzuren loskomen (lipase, film 3)
function triglyceride(ctx, x, y, s = 1, alpha = 1, spread = 0) {
  ctx.save(); ctx.globalAlpha *= alpha;
  roundRect(ctx, x - 9 * s, y - 34 * s, 18 * s, 68 * s, 8 * s); shape(ctx, V.vt, lighten(V.vt, 0.4), 1.3);
  [-24, 0, 24].forEach((dy, i) => { const sx = spread * 30 * s * (1 + i * 0.4), sy = spread * (i - 1) * 20 * s; fattyAcid(ctx, x + 12 * s + sx, y + dy * s + sy, 120 * s, s); });
  ctx.restore();
}
function waterMol(ctx, x, y, r = 7, alpha = 1) { // O met twee H, teal
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.fillStyle = lighten(C.teal, 0.45); ctx.beginPath(); ctx.arc(x - r * 0.9, y + r * 0.7, r * 0.55, 0, 6.283); ctx.arc(x + r * 0.9, y + r * 0.7, r * 0.55, 0, 6.283); ctx.fill(); ctx.restore();
}
function mineral(ctx, x, y, r = 8, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 2); shape(ctx, rgba(V.neutraal, 0.8), lighten(V.neutraal, 0.4), 1); ctx.restore(); }
function vitamin(ctx, x, y, r = 9, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 1.2566; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(V.neutraal, 0.25), V.neutraal, 1.4); ctx.restore(); }
function fiber(ctx, x, y, n = 8, r = 11, alpha = 1, angle = 0) { // cellulose: rechte keten, groen
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(angle);
  ctx.strokeStyle = lighten(V.vezel, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo((n - 1) * r * 2.2, 0); ctx.stroke();
  for (let i = 0; i < n; i++) hexagon(ctx, i * r * 2.2, (i % 2 ? 2 : -2), r, rgba(V.vezel, 0.75), lighten(V.vezel, 0.3), 1.1, i % 2 ? 0.5 : 0);
  ctx.restore();
}

// --- Schema: de maaltijd (rode draad) ---
function broodje(ctx, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha;
  // onderste helft
  roundRect(ctx, x - 120 * s, y - 6 * s, 240 * s, 46 * s, 22 * s); shape(ctx, '#B98F4E', lighten('#B98F4E', 0.35), 1.2);
  // kaas (lichter, gaatjes)
  ctx.beginPath(); ctx.moveTo(x - 132 * s, y - 8 * s); ctx.lineTo(x + 132 * s, y - 8 * s); ctx.lineTo(x + 118 * s, y + 10 * s); ctx.lineTo(x - 118 * s, y + 10 * s); ctx.closePath(); shape(ctx, V.kh, lighten(V.kh, 0.35), 1.2);
  // bovenste helft
  ctx.beginPath(); ctx.moveTo(x - 124 * s, y - 10 * s); ctx.bezierCurveTo(x - 120 * s, y - 92 * s, x + 120 * s, y - 92 * s, x + 124 * s, y - 10 * s); ctx.closePath(); shape(ctx, '#C9A35C', lighten('#C9A35C', 0.35), 1.2);
  ctx.fillStyle = rgba(C.bgSchema, 0.35); [[-50, -50], [10, -62], [60, -44], [-10, -36]].forEach(p => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 6 * s, 3 * s, 0.3, 0, 6.283); ctx.fill(); });
  ctx.restore();
}
function glasMelk(ctx, x, y, s = 1, alpha = 1, level = 0.8) {
  ctx.save(); ctx.globalAlpha *= alpha; const w = 90 * s, h = 150 * s;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w * 0.4, y); ctx.lineTo(x + w * 0.4, y); ctx.lineTo(x + w / 2, y - h);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(V.melk, 0.9); ctx.fillRect(x - w, y - h * level, 2 * w, h * level); ctx.restore();
  ctx.strokeStyle = V.neutraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}
function plateLine(ctx, x0, x1, y, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// voedingsmiddel-iconen (Schema, oker met lichte rand)
function foodIcon(ctx, kind, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; const st = (c) => lighten(c, 0.35);
  if (kind === 'vlees') { blob(ctx, x, y, 50 * s, 30 * s, 0.12, 3); shape(ctx, '#B07A4E', st('#B07A4E'), 1.2); ctx.strokeStyle = rgba(V.melk, 0.5); ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x - 10 * s, y, 14 * s, 0.5, 4); ctx.stroke(); }
  else if (kind === 'kaas') { ctx.beginPath(); ctx.moveTo(x - 50 * s, y + 26 * s); ctx.lineTo(x + 50 * s, y + 26 * s); ctx.lineTo(x + 50 * s, y - 6 * s); ctx.lineTo(x - 50 * s, y - 30 * s); ctx.closePath(); shape(ctx, V.kh, st(V.kh), 1.2); ctx.fillStyle = rgba(C.bgSchema, 0.35); [[-20, 4], [14, 10], [30, -2]].forEach(p => { ctx.beginPath(); ctx.arc(x + p[0] * s, y + p[1] * s, 6 * s, 0, 6.283); ctx.fill(); }); }
  else if (kind === 'melk') { glasMelk(ctx, x, y + 40 * s, 0.55 * s); }
  else if (kind === 'brood') { roundRect(ctx, x - 50 * s, y - 34 * s, 100 * s, 64 * s, 26 * s); shape(ctx, '#B98F4E', st('#B98F4E'), 1.2); ctx.strokeStyle = rgba(C.bgSchema, 0.4); ctx.lineWidth = 2; [-20, 0, 20].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d * s - 8 * s, y - 24 * s); ctx.lineTo(x + d * s + 8 * s, y - 12 * s); ctx.stroke(); }); }
  else if (kind === 'bonen') { [[-24, 6], [0, -8], [22, 8], [-6, 18], [16, -14]].forEach((p, i) => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 15 * s, 10 * s, i * 0.7, 0, 6.283); shape(ctx, '#B98A5A', st('#B98A5A'), 1); }); }
  else if (kind === 'tofu') { roundRect(ctx, x - 40 * s, y - 26 * s, 80 * s, 52 * s, 6 * s); shape(ctx, '#E2D6B4', st('#E2D6B4'), 1.2); }
  else if (kind === 'blikje') { roundRect(ctx, x - 22 * s, y - 40 * s, 44 * s, 80 * s, 8 * s); shape(ctx, C.fill, V.neutraal, 1.5); ctx.strokeStyle = V.neutraal; ctx.beginPath(); ctx.moveTo(x - 22 * s, y - 28 * s); ctx.lineTo(x + 22 * s, y - 28 * s); ctx.stroke(); }
  ctx.restore();
}
// het melketiket (per 100 ml halfvolle melk); hl = index van oplichtende rij
var ETIKET = [['Energie', '195 kJ / 46 kcal'], ['Vet', '1,5 g'], ['Koolhydraten', '4,7 g'], ['Eiwit', '3,5 g'], ['Zout', '0,1 g'], ['Calcium', '120 mg']];
function etiket(ctx, x, y, w, alpha = 1, hl = [], title = 'Voedingswaarde per 100 ml') {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const rh = 56, h = 80 + ETIKET.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.2);
  text(ctx, title, x + 24, y + 50, fTekst(36, 600), C.text);
  ETIKET.forEach((r, i) => { const yy = y + 80 + i * rh; const on = hl.includes(i);
    if (on) { roundRect(ctx, x + 10, yy + 4, w - 20, rh - 8, 8); ctx.fillStyle = rgba(C.goud, 0.14); ctx.fill(); }
    ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 16, yy); ctx.lineTo(x + w - 16, yy); ctx.stroke();
    text(ctx, r[0], x + 24, yy + 38, fTekst(36, on ? 600 : 400), on ? C.text : C.text2); text(ctx, r[1], x + w - 24, yy + 38, fTekst(36, on ? 600 : 400), on ? C.goud : C.text, 'right'); });
  ctx.restore(); return h;
}

// --- zes groepen + vier taken (Schema-bord, vaste vorm) ---
var GROEPEN = ['koolhydraten', 'eiwitten', 'vetten', 'water', 'mineralen', 'vitaminen'];
function groepIcon(ctx, i, x, y, s = 1) {
  if (i === 0) sugarChain(ctx, x - 26 * s, y, 3, 11 * s);
  else if (i === 1) proteinChain(ctx, [[x - 30 * s, y], [x - 10 * s, y - 8 * s], [x + 10 * s, y], [x + 30 * s, y - 8 * s]], [0, 5, 9, 14], 9 * s);
  else if (i === 2) triglyceride(ctx, x - 26 * s, y, 0.45 * s);
  else if (i === 3) { waterMol(ctx, x - 12 * s, y, 8 * s); waterMol(ctx, x + 14 * s, y - 6 * s, 8 * s); }
  else if (i === 4) { mineral(ctx, x - 12 * s, y, 8 * s); mineral(ctx, x + 12 * s, y - 4 * s, 7 * s); }
  else { vitamin(ctx, x - 10 * s, y, 10 * s); vitamin(ctx, x + 14 * s, y - 6 * s, 8 * s); }
}
function groepenBord(ctx, x, y, w, lit, alpha = 1) { // lit: array 0..1 per groep
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const cw = (w - 5 * 14) / 6, ch = 150;
  GROEPEN.forEach((g, i) => { const xx = x + i * (cw + 14); const u = lit[i] || 0;
    roundRect(ctx, xx, y, cw, ch, 12); ctx.fillStyle = rgba(C.fill, 0.55 + 0.35 * u); ctx.fill(); ctx.strokeStyle = u > 0.5 ? C.goud : rgba(C.line, 0.5); ctx.lineWidth = u > 0.5 ? 1.8 : 1; ctx.stroke();
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * u; groepIcon(ctx, i, xx + cw / 2, y + 58, 1); ctx.restore();
    text(ctx, g, xx + cw / 2, y + 126, fTekst(36, u > 0.5 ? 600 : 400), u > 0.5 ? C.text : C.text2, 'center'); });
  ctx.restore();
}
var TAKEN = [['bouwstof', 'maken, herstellen'], ['brandstof', 'energie leveren'], ['reservestof', 'energie bewaren'], ['regelstof', 'processen regelen']];
var TAAK_KLEUR = [V.neutraal, C.koraal, C.oker, C.teal];
function taakIcon(ctx, i, x, y, s = 1, col) {
  ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = rgba(col, 0.25); ctx.lineWidth = 2;
  if (i === 0) { for (let r = 0; r < 3; r++) for (let c = 0; c < 3 - (r % 2); c++) { roundRect(ctx, x - 30 * s + c * 22 * s + (r % 2) * 11 * s, y + 10 * s - r * 13 * s, 20 * s, 11 * s, 2); ctx.fill(); ctx.stroke(); } }
  else if (i === 1) { ctx.beginPath(); ctx.moveTo(x, y - 26 * s); ctx.bezierCurveTo(x + 22 * s, y - 6 * s, x + 18 * s, y + 18 * s, x, y + 20 * s); ctx.bezierCurveTo(x - 18 * s, y + 18 * s, x - 22 * s, y - 2 * s, x - 6 * s, y - 10 * s); ctx.bezierCurveTo(x - 4 * s, y - 2 * s, x + 2 * s, y - 14 * s, x, y - 26 * s); ctx.fill(); ctx.stroke(); }
  else if (i === 2) { roundRect(ctx, x - 26 * s, y - 16 * s, 48 * s, 32 * s, 5); ctx.stroke(); roundRect(ctx, x + 22 * s, y - 7 * s, 6 * s, 14 * s, 2); ctx.stroke(); roundRect(ctx, x - 22 * s, y - 12 * s, 28 * s, 24 * s, 3); ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(x, y, 22 * s, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 14 * s, y - 12 * s); ctx.stroke(); for (let k = 0; k < 5; k++) { const a = Math.PI + k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 16 * s, y + Math.sin(a) * 16 * s); ctx.lineTo(x + Math.cos(a) * 21 * s, y + Math.sin(a) * 21 * s); ctx.stroke(); } }
  ctx.restore();
}
function takenRij(ctx, x, y, w, lit, alpha = 1) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const cw = (w - 3 * 18) / 4, ch = 128;
  TAKEN.forEach((tk, i) => { const xx = x + i * (cw + 18); const u = lit[i] || 0; const col = TAAK_KLEUR[i];
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * u;
    roundRect(ctx, xx, y, cw, ch, 12); shape(ctx, rgba(C.fill, 0.7), u > 0.5 ? col : rgba(C.line, 0.5), u > 0.5 ? 1.8 : 1);
    taakIcon(ctx, i, xx + 46, y + 46, 0.8, col);
    text(ctx, tk[0], xx + 86, y + 58, fTekst(36, 600), C.text); metaText(ctx, tk[1], xx + 22, y + 104, C.grain, 'left', 28);
    ctx.restore(); });
  ctx.restore();
}
// verbindingslijn tussen twee punten met pijlpunt (Schema)
function arrow(ctx, x0, y0, x1, y1, color = C.line, alpha = 1, lw = 1.5) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const a = Math.atan2(y1 - y0, x1 - x0);
  ctx.beginPath(); ctx.moveTo(x1 - Math.cos(a - 0.45) * 14, y1 - Math.sin(a - 0.45) * 14); ctx.lineTo(x1, y1); ctx.lineTo(x1 - Math.cos(a + 0.45) * 14, y1 - Math.sin(a + 0.45) * 14); ctx.stroke(); ctx.restore();
}
// staaf (Schema-grafiek) — waarde v op schaal max, hoogte hmax
function bar(ctx, x, yBase, w, hmax, v, max, color, label, valLabel, u = 1, alpha = 1) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; const h = hmax * v / max * clamp(u, 0, 1);
  roundRect(ctx, x, yBase - h, w, Math.max(h, 1), 6); shape(ctx, rgba(color, 0.55), color, 1.5);
  if (label) text(ctx, label, x + w / 2, yBase + 44, fTekst(36, 600), C.text, 'center');
  if (valLabel && u > 0.6) text(ctx, valLabel, x + w / 2, yBase - h - 16, fTekst(36, 600), color, 'center');
  ctx.restore();
}
function axisBase(ctx, x0, x1, y, alpha = 1) { plateLine(ctx, x0, x1, y, alpha); }

// --- darmbuis (Schema): wand met kringspieren; squeeze(x) 0..1 = vernauwing op positie x ---
function darmBuis(ctx, x0, x1, yc, r, squeeze = () => 0, alpha = 1, label = null) {
  ctx.save(); ctx.globalAlpha *= alpha; const n = 120;
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; const k = 1 - 0.55 * squeeze(x); top.push([x, yc - r * k]); bot.push([x, yc + r * k]); }
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  ctx.fillStyle = rgba(C.fill, 0.5); ctx.fill();
  ctx.strokeStyle = V.neutraal; ctx.lineWidth = 3; ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.beginPath(); bot.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  // kringspieren als korte dwarsstreepjes in de wand
  ctx.strokeStyle = rgba(C.koraal, 0.6); ctx.lineWidth = 2;
  for (let i = 2; i < n; i += 4) { const k = squeeze(top[i][0]); ctx.globalAlpha = alpha * (0.35 + 0.65 * k); ctx.beginPath(); ctx.moveTo(top[i][0], top[i][1] - 4); ctx.lineTo(top[i][0], top[i][1] - 14); ctx.moveTo(bot[i][0], bot[i][1] + 4); ctx.lineTo(bot[i][0], bot[i][1] + 14); ctx.stroke(); }
  ctx.restore();
  if (label) metaText(ctx, label, x0, yc - r - 30, C.grain, 'left', 28);
}
// trekvogel als Schema-silhouet (geen oog-wit)
function birdIcon(ctx, x, y, s = 1, flap = 0, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = C.mens; ctx.strokeStyle = lighten(C.mens, 0.3); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(x, y, 46 * s, 16 * s, -0.08, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 44 * s, y - 10 * s, 12 * s, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + 54 * s, y - 10 * s); ctx.lineTo(x + 72 * s, y - 6 * s); ctx.lineTo(x + 54 * s, y - 4 * s); ctx.fill();
  const wy = -60 * s * Math.cos(flap); ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 6 * s); ctx.quadraticCurveTo(x - 10 * s, y + wy, x + 22 * s, y + wy * 0.9); ctx.lineTo(x + 14 * s, y - 6 * s); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 44 * s, y - 2 * s); ctx.lineTo(x - 70 * s, y - 14 * s); ctx.lineTo(x - 66 * s, y + 6 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(x + 48 * s, y - 12 * s, 2.2 * s, 0, 6.283); ctx.fill();
  ctx.restore();
}
// gewichtsblok voor vergelijking (Schema)
function weightBlock(ctx, x, yBase, w, h, color, label, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x, yBase - h, w, h, 10); shape(ctx, rgba(color, 0.4), color, 1.5); if (label) text(ctx, label, x + w / 2, yBase - h / 2 + 12, fTekst(36, 600), C.text, 'center'); ctx.restore(); }

// ---- bibliotheek/lib_bio.js
// =====================================================================================
// lib_bio.js — gedeelde tekenbibliotheek voor de films (prompt v8, C7 + C9 Tekenrecepten)
// Eerst gebruikt: Geslachtsorganen en puberteit 1.1 en Wat zit er in je eten? 1.1 (22 okt 2026).
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease, shape, roundRect, text.
// Elk object: recept (verhoudingen, bron) + bekende fouten in het commentaar erboven.
// Een film kopieert dit bestand naar bron/src/ en plakt het na lib_cast.js in de pagina.
// =====================================================================================

var BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
var _bioPolyCache = {};

// ---------- kleine helpers ----------
function bioPad(ctx, pts, closed = false) { // Catmull-Rom door punten
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]);
  const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}
function bioPunt(pts, u) { // punt + richting op fractie u (0..1) van een polylijn
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function bioDicht(pts, n = 80) { // gladde, gelijk verdeelde punten langs een pad
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  out.push(pts[m - 1]); return out;
}

// =====================================================================================
// HOOFD MET HERSENEN, zijaanzicht (mediane doorsnede), kijkt naar rechts.
// Recept: hoofdlengte ≈ 1,2× hersenlengte; grote hersenen ≈ 2/3 van de schedel; kleine hersenen achter-onder,
// ≈ 1/8 van het volume; hypothalamus onder de thalamus, vóór de hersenstam; hypofyse (± 1 cm, erwt) hangt aan
// een steeltje in het Turkse zadel (botkuiltje) recht boven de neusholte; hersenbalk als C-band boven de thalamus.
// Bron: Gray's Anatomy (mediaan sagittaal), Kenhub 'Hypothalamus'. Bekende fouten: hypofyse los zwevend of
// náást de hersenen; hersenen als ovaal zonder kleine hersenen en hersenstam; hypothalamus achterin.
// Ontwerpcoördinaten: hoofd ± 470 breed × 600 hoog, oorsprong = hypothalamus.
// =====================================================================================
function hoofdHersenen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, hthCol = BIO.klier, hypCol = BIO.klier, huid = BIO.huid, gloed = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  if (a <= 0.01) return { hth: P(0, 0), hyp: P(8, 64), steel: P(4, 34) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hoofd + hals (profiel naar rechts: voorhoofd, neus, lippen, kin)
  const HOOFD = [[-60, 330], [-70, 250], [-120, 190], [-205, 120], [-245, 10], [-240, -110], [-190, -215], [-90, -280], [30, -290], [140, -250], [205, -170],
    [225, -90], [228, -30], [244, 10], [272, 60], [262, 78], [246, 84], [252, 106], [244, 122], [252, 138], [240, 160], [222, 182], [196, 196], [150, 200], [120, 240], [110, 330]];
  ctx.beginPath(); bioPad(ctx, HOOFD, false); ctx.lineTo(-60, 330); ctx.closePath();
  shape(ctx, rgba(huid, 0.22), rgba(huid, 0.85), 2.5);
  // schedel (binnenrand) als dunne botlijn
  ctx.beginPath(); bioPad(ctx, [[-200, 110], [-225, 0], [-218, -110], [-170, -200], [-80, -258], [30, -266], [130, -228], [190, -150], [204, -70], [190, -10], [150, 30]], false);
  ctx.strokeStyle = rgba(BIO.bot, 0.55); ctx.lineWidth = 8; ctx.stroke();
  // Turks zadel (botkuiltje voor de hypofyse) en neusholte erboven/ervoor
  ctx.beginPath(); ctx.moveTo(-30, 70); ctx.quadraticCurveTo(-18, 100, 10, 98); ctx.quadraticCurveTo(36, 96, 44, 66); ctx.strokeStyle = rgba(BIO.bot, 0.75); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[60, 50], [140, 40], [215, 50], [232, 90], [200, 120], [120, 118], [70, 100]], true); ctx.fillStyle = rgba('#0D1420', 0.35); ctx.fill();
  // grote hersenen
  const GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
  ctx.beginPath(); bioPad(ctx, GROOT, true); shape(ctx, rgba(BIO.brein, 0.9), BIO.breinS, 2);
  // windingen (gyri) als zachte groeven, binnen de grote hersenen
  ctx.save(); ctx.beginPath(); bioPad(ctx, GROOT, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = 3;
  const GROEF = [[[-190, -60], [-150, -80], [-170, -130]], [[-120, -210], [-100, -160], [-60, -175], [-40, -130]], [[0, -235], [10, -190], [50, -200], [60, -150]],
    [[110, -215], [100, -170], [130, -150]], [[165, -110], [130, -100], [140, -60]], [[-170, 30], [-140, 0], [-100, 20]], [[-70, -110], [-30, -90], [10, -110], [50, -95], [90, -120]],
    [[-185, -150], [-150, -150]], [[150, -40], [120, -30]]];
  GROEF.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
  ctx.restore();
  // hersenbalk (C-vormige band)
  ctx.beginPath(); bioPad(ctx, [[-120, -10], [-130, -60], [-80, -95], [20, -100], [100, -80], [125, -45], [105, -30], [70, -55], [10, -68], [-70, -62], [-100, -35], [-95, -5]], true);
  shape(ctx, rgba(BIO.wit, 0.9), rgba(BIO.breinS, 0.8), 1.5);
  // thalamus
  ctx.beginPath(); ctx.ellipse(-10, -28, 46, 26, -0.1, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.75), BIO.breinD, 1.5);
  // kleine hersenen met boompje (arbor vitae)
  const KLEIN = [[-110, 60], [-150, 70], [-200, 80], [-210, 130], [-170, 175], [-110, 170], [-80, 130], [-85, 85]];
  ctx.beginPath(); bioPad(ctx, KLEIN, true); shape(ctx, rgba(BIO.brein, 0.95), BIO.breinS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KLEIN, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.wit, 0.8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-88, 112); ctx.lineTo(-130, 118); ctx.stroke(); for (let k = 0; k < 5; k++) { const an = 2.35 + k * 0.38; const bx = -112 - k * 4, by = 116; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.cos(an) * 40, by + Math.sin(an) * 28, bx + Math.cos(an) * 78, by + Math.sin(an) * 52); ctx.stroke(); ctx.lineWidth = 1.6; for (const sd of [-0.3, 0.3]) { ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * 45, by + Math.sin(an) * 30); ctx.lineTo(bx + Math.cos(an + sd) * 74, by + Math.sin(an + sd) * 50); ctx.stroke(); } }
  ctx.restore();
  // hersenstam (middenhersenen, brug, verlengde merg) naar het ruggenmerg
  ctx.beginPath(); bioPad(ctx, [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]], true);
  shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  // hypothalamus (onder de thalamus, vóór de hersenstam) + gloed
  if (hth > 0.01 && gloed) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90); g.addColorStop(0, rgba(hthCol, 0.5 * hth)); g.addColorStop(1, rgba(hthCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); bioPad(ctx, [[-26, -6], [10, -14], [36, -2], [30, 18], [4, 22], [-20, 14]], true); shape(ctx, rgba(hthCol, 0.35 + 0.6 * Math.max(hth, 0.25)), lighten(hthCol, 0.25), 2);
  // steeltje (infundibulum) en hypofyse in het Turkse zadel
  ctx.strokeStyle = lighten(hthCol, 0.15); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(10, 18); ctx.quadraticCurveTo(12, 40, 6, 58); ctx.stroke();
  if (hyp > 0.01 && gloed) { const g = ctx.createRadialGradient(8, 72, 0, 8, 72, 60); g.addColorStop(0, rgba(hypCol, 0.5 * hyp)); g.addColorStop(1, rgba(hypCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(8, 72, 60, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(8, 74, 24, 17, 0, 0, 6.283); shape(ctx, rgba(hypCol, 0.35 + 0.6 * Math.max(hyp, 0.25)), lighten(hypCol, 0.25), 2);
  ctx.strokeStyle = rgba('#0D1420', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4, 58); ctx.lineTo(6, 90); ctx.stroke(); // voor- en achterkwab
  // oog (in profiel) voor herkenning
  ctx.beginPath(); ctx.ellipse(204, 22, 13, 8, 0, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fill(); ctx.beginPath(); ctx.arc(212, 22, 5, 0, 6.283); ctx.fillStyle = '#2A1E18'; ctx.fill();
  ctx.restore();
  return { hth: P(0, 0), hyp: P(8, 74), steel: P(8, 40) };
}

// =====================================================================================
// BLOEDVAT met stroom. Recept: rode bloedcel = ingedeukte schijf, 7–8 µm breed, ± 2 µm dik; van opzij een
// halter, van boven een schijf met lichter midden; ze kantelen in de stroom en vervormen in een haarvat
// (± 5–8 µm, één voor één). Hormonen veel kleiner: stipjes die meestromen. Bekende fouten: bloedcellen als
// bollen; stroom met constante snelheid zonder spreiding.
// pts = pad (ontwerpcoördinaten op het scherm), r = halve binnendiameter.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-r * 0.9, -r * 0.85); ctx.quadraticCurveTo(r * 1.3, 0, -r * 0.9, r * 0.85); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.9, -r * 0.85); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}

// =====================================================================================
// ZENUWCEL (neuron). Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die
// zich als een boom vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon
// vanuit een kegeltje, lang en overal even dik, eindigt in vertakkingen met knopjes (synaps).
// Bron: Kandel, Principles of Neural Science, fig. 2-1. Bekende fouten: ster met gelijke armen; axon dat
// dunner wordt; geen kern.
// =====================================================================================
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6 } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 18 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    if (puls >= 0 && puls <= 1) { const [qx, qy] = bioPunt(pts, puls); const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 26 * s); g.addColorStop(0, rgba(pulsCol, 0.9)); g.addColorStop(1, rgba(pulsCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 26 * s, 0, 6.283); ctx.fill(); }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
}

// =====================================================================================
// VETCEL en VETWEEFSEL. Recept: witte vetcel 50–150 µm; één grote vetdruppel vult ± 90 % van de cel;
// cytoplasma als dun randje; kern platgedrukt (sikkel) tegen de rand. In weefsel drukken de cellen tegen
// elkaar tot veelhoeken met afgeronde hoeken (Voronoi-patroon, 80–120 % grootteverschil), haarvaten ertussen.
// Bron: Junqueira's Basic Histology, h. 6. Bekende fouten: raster van gelijke rondjes; kern in het midden.
// =====================================================================================
function _bioCellen(key, w, h, d, seed) { // Voronoi-cellen in een rechthoek (gecachet)
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const cs = []; const cols = Math.max(2, Math.round(w / d)), rows = Math.max(2, Math.round(h / (d * 0.87)));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cs.push([(c + 0.5 + (r % 2 ? 0.5 : 0) - 0.5 * (cols > 1 ? 0 : 0)) * w / cols - w / 2 + (hash(seed + r * 31 + c * 7) - 0.5) * d * 0.45, (r + 0.5) * h / rows - h / 2 + (hash(seed + r * 17 + c * 13) - 0.5) * d * 0.4]);
  const polys = cs.map((p, i) => { const pts = []; for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.75;
      cs.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); const proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); });
      best = Math.max(0, best - 3); pts.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts }; });
  _bioPolyCache[key] = polys; return polys;
}
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.55), rgba(BIO.cyto, 0.9), 1.5);
  // vetdruppel: dezelfde vorm iets kleiner
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  const druppel = omtrek.map(p => [cx + (p[0] - cx) * 0.86, cy + (p[1] - cy) * 0.86]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.85), rgba(BIO.vetS, 0.9), 1.2);
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(cx, cy); ctx.restore(); }
  // kern: sikkel tegen de rand (op de punt van de omtrek rechtsonder)
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * rr * 0.93, cy + Math.sin(an) * rr * 0.93, Math.max(4, rr * 0.18), Math.max(2, rr * 0.06), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.9), BIO.kernL, 1);
  ctx.restore();
}
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  if (haarvat) bloedvat(ctx, [[x - w / 2 - 20, y + h * 0.1], [x - w * 0.15, y - h * 0.05], [x + w * 0.2, y + h * 0.08], [x + w / 2 + 20, y - h * 0.02]], 5, t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' });
  ctx.restore();
  ctx.restore();
}

// =====================================================================================
// ZAADCEL. Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat (peddel); acrosoomkap over 40–70 % van de
// kop; middenstuk ± 5 µm, iets dikker; staart ± 45 µm → hele cel ± 55 µm, staart ± 10× de koplengte. Een golf
// loopt van kop naar staart (golflengte ± 0,4 staart, uitslag groeit naar het eind), de kop draait om zijn as
// (wordt afwisselend smal en breed). Slag ± 10–15 per seconde; in films vertraagd. Bron: WHO-laborhandboek
// sperma 2021, fig. 2.x. Bekende fouten: kikkervisje met korte staart; staart die alleen achteraan zwaait.
// Oorsprong = midden van de kop; ang = zwemrichting.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s; // px per µm
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = 4.6 * U, kopB = 3 * U * (0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)));
  const midL = 5 * U, staartL = 45 * U, golf = 0.42 * staartL;
  const ph = t * slag * 6.283;
  const pts = []; for (let i = 0; i <= 60; i++) { const d = (i / 60) * (midL + staartL); const amp = (0.4 + 3.2 * Math.pow(d / (midL + staartL), 1.2)) * U;
    pts.push([-kopL * 0.5 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  // staart (eind dunner), middenstuk dikker
  for (let i = 1; i < pts.length; i++) { const d = i / 60 * (midL + staartL); ctx.strokeStyle = col; ctx.lineWidth = d < midL ? 1.25 * U : Math.max(0.6, lerp(0.75 * U, 0.25 * U, (d - midL) / staartL));
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }
  // kop (peddel) + acrosoomkap
  ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.12, 0, kopL * 0.42, kopB * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.65); ctx.fill(); ctx.restore();
  ctx.restore();
}

// =====================================================================================
// EICEL (in de follikel) en EIERSTOK in doorsnede. Recept: eierstok ± 3 × 2 × 1 cm (amandel); schors (buitenste
// derde) vol primordiale follikels (eicel met één laag platte cellen), merg in het midden met bloedvaten die
// via de hilus binnenkomen. Rijping: primaire follikel (één laag kubische cellen) → secundaire (meerdere lagen)
// → follikel met holte (antrum), eicel op een heuveltje (cumulus) → Graafse follikel 18–25 mm (zo groot dat hij
// uitpuilt). Eisprong: wand scheurt aan het oppervlak, eicel met stralenkrans komt vrij, wat overblijft wordt
// het gele lichaam (gele, geplooide wand). Groottes niet op schaal (follikels vergroot). Bron: Junqueira h. 22;
// Sadler, Langman's Embryology h. 2. Bekende fouten: eicellen als losse stipjes; eisprong als puntje dat wegvliegt.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (krans) for (let k = 0; k < 18; k++) { const an = k / 18 * 6.283; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5, r * 0.24, 0, 6.283); shape(ctx, rgba('#E6C9A8', 0.65), rgba('#B88A60', 0.6), 1); }
  ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.35), rgba('#F6EEDC', 0.8), 1.5); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill();
  ctx.restore();
}
function follikel(ctx, x, y, f, o = {}) { // f: 0 primordiaal → 1 Graaf; schaalgrootte via o.R (straal bij f=1)
  const { a = 1, R = 120, scheur = 0, seed = 0, eicel = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = lerp(o.klein ? 7.5 : 9, R, Math.pow(f, 1.6)); const ei = lerp(4, Math.max(10, R * 0.12), Math.min(1, f * 2.2));
  // theca (buitenste ring) vanaf secundair
  if (f > 0.3) { ctx.beginPath(); ctx.arc(x, y, r + 6 + 4 * f, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.25 * f), rgba('#C98A6A', 0.5 * f), 1.5); }
  // granulosacellen
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.75), rgba('#C9966A', 0.9), 1.2);
  // celkorrels in de granulosa (één laag plat → meerdere lagen)
  const nRing = o.klein ? 6 : Math.round(lerp(8, 34, Math.min(1, f * 1.4))); const lagen = f < 0.15 ? 1 : f < 0.4 ? 2 : 3;
  for (let L = 0; L < lagen; L++) for (let k = 0; k < nRing; k++) { const an = k / nRing * 6.283 + L * 0.3 + seed; const rr = r * (0.88 - L * 0.1); const cr = Math.max(1.4, r * 0.06);
    ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (f < 0.1 ? 1.6 : 1), cr * (f < 0.1 ? 0.6 : 1), an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.55); ctx.fill(); }
  // antrum (vochtholte) vanaf f > 0.45, eicel op de cumulus aan één kant
  let ex = x, ey = y;
  if (f > 0.45) { const af = clamp((f - 0.45) / 0.55, 0, 1); const ar = r * lerp(0.2, 0.8, af);
    ctx.beginPath(); ctx.arc(x + r * 0.08 * af, y - r * 0.05 * af, ar, 0, 6.283); shape(ctx, rgba('#E9F0F4', 0.55), rgba('#BFD0DA', 0.7), 1);
    ex = x - r * 0.55 * af; ey = y + r * 0.35 * af;
    ctx.beginPath(); ctx.arc(ex, ey, ei * 2.2, 0, 6.283); ctx.fillStyle = rgba('#E2B88E', 0.85); ctx.fill(); }
  if (eicel && scheur < 0.5) eicelEcht(ctx, ex, ey, ei, 1, f > 0.6);
  ctx.restore(); return [ex, ey, ei];
}
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 160, groei = 0, eis = 0, geel = 0, t = 0, winnaar = 3 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; const w = 1 + 0.03 * Math.sin(an * 3 + 1) + 0.02 * Math.sin(an * 7); return [x + Math.cos(an) * rx * w, y + Math.sin(an) * ry * w]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.32), lighten('#C98A6A', 0.25), 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  // merg: lichter, met bloedvaten vanaf de hilus (onderkant)
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.08, rx * 0.5, ry * 0.42, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.35); ctx.fill();
  const vat = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  [[-0.05, 1], [0.05, 1]].forEach(([dx], i) => { const c = i ? rgba(BIO.ader, 0.7) : rgba(BIO.bloed, 0.75);
    vat([[x + dx * rx, y + ry * 1.05], [x + dx * rx * 1.4, y + ry * 0.5], [x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.5 * rx, y - ry * 0.1]], c, 5);
    vat([[x + dx * rx * 1.4, y + ry * 0.5], [x + 0.3 * rx + i * 20, y + ry * 0.1], [x + 0.55 * rx, y - ry * 0.15]], c, 4);
    vat([[x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.1 * rx, y - ry * 0.35]], c, 3); });
  ctx.restore();
  // primordiale follikels in de schors (buitenste derde), niet in het merg
  for (let i = 0; i < n; i++) { const an = hash(i * 3 + 1) * 6.283, rr = lerp(0.68, 0.93, hash(i * 3 + 2)); follikel(ctx, x + Math.cos(an) * rx * rr, y + Math.sin(an) * ry * rr, 0, { R: ry * 0.5, seed: i, a: 0.8, klein: true }); }
  // groepje dat rijpt; één wint, de rest gaat te gronde
  const grp = [[-0.45, -0.38], [-0.2, 0.48], [0.18, -0.52], [0.5, -0.12], [-0.6, 0.22]];
  let uit = null;
  grp.forEach(([gx, gy], i) => { const win = i === winnaar; const g = groei * (win ? 1 : 0.5) * (win ? 1 : 1 - eis); if (g <= 0.01 || (win && geel > 0.5)) return;
    const px = x + gx * rx * (win ? 0.95 : 1), py = y + gy * ry * (win ? 0.95 : 1);
    const p = follikel(ctx, px, py, win ? g : g * 0.55, { R: ry * 0.42, seed: i, a: win ? 1 : 1 - eis * 0.7, scheur: win ? eis : 0 });
    if (win) uit = { x: px, y: py, ei: p }; });
  // eisprong: wand scheurt aan de rand, eicel met stralenkrans + vocht komt vrij
  if (uit && eis > 0.01) { const an = Math.atan2(uit.y - y, uit.x - x); const sx = x + Math.cos(an) * rx * 1.02, sy = y + Math.sin(an) * ry * 1.02;
    ctx.save(); ctx.globalAlpha *= clamp(eis * 3, 0, 1); ctx.strokeStyle = rgba('#E9F0F4', 0.6); ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { const sp = an + (k - 2) * 0.25; const d = eis * 90; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(sp) * d, sy + Math.sin(sp) * d); ctx.stroke(); } ctx.restore();
    const e = ease(eis); eicelEcht(ctx, lerp(uit.ei[0], sx + Math.cos(an) * 110, e), lerp(uit.ei[1], sy + Math.sin(an) * 110, e), uit.ei[2] * 1.4, 1, true); }
  if (geel > 0.01) { const [gx, gy] = grp[winnaar]; const px = x + gx * rx * 0.95, py = y + gy * ry * 0.95; ctx.save(); ctx.globalAlpha *= geel;
    ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const rr = ry * 0.32 * (1 + 0.08 * Math.sin(an * 9)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba('#E8C25A', 0.75), '#C99A3A', 2); ctx.restore(); }
  ctx.restore(); return uit;
}

// =====================================================================================
// BAARMOEDERWAND met slijmvlies (uitsnede, holte boven). Recept: spierlaag (myometrium) 1–2 cm, glad spierweefsel;
// slijmvlies 1 mm na de menstruatie → 5–7 mm (soms tot 10) rond de eisprong en daarna; basale laag blijft, de
// functionele laag erboven groeit en laat los. Klieren: rechte buisjes die later kronkelen (zaagtand); spiraal-
// slagaders lopen kronkelend omhoog. Bij de menstruatie knijpen de spiraalslagaders dicht, de functionele laag
// laat in stukjes los met bloed. Bron: Junqueira h. 22; Guyton h. 82. Bekende fouten: slijmvlies als vlak blokje;
// eicel in het menstruatiebloed.
// dikte 0..1 (0,15 ≈ 1 mm, 1 ≈ 7 mm), los 0..1 (afstoten).
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const spierH = h * 0.42, basaal = h * 0.06, fmax = h * 0.5; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH; // ys = top spier, yf = oppervlak
  const golf = (xx, amp, k) => amp * Math.sin(xx / w * 6.283 * k + seed);
  // spierlaag: spoelvormige vezels in banen
  roundRect(ctx, x - w / 2, ys, w, spierH, 10); shape(ctx, rgba(BIO.spier, 0.55), rgba(BIO.spierL, 0.6), 1.5);
  ctx.save(); roundRect(ctx, x - w / 2, ys, w, spierH, 10); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.55); ctx.lineWidth = 2;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 14; c++) { const cx = x - w / 2 + (c + (r % 2) * 0.5) * w / 13, cy = ys + 14 + r * (spierH - 20) / 6; ctx.beginPath(); ctx.ellipse(cx, cy, w / 32, 3.2, 0.08 * Math.sin(c + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // basale laag
  ctx.fillStyle = rgba(BIO.slijmD, 0.75); ctx.fillRect(x - w / 2, yba, w, basaal);
  // functionele laag (met golvend oppervlak), losraken = brokken die omhoog drijven
  const opp = []; for (let i = 0; i <= 40; i++) { const xx = x - w / 2 + i / 40 * w; opp.push([xx, yf + golf(xx, 6 * dikte, 3)]); }
  const vastFrac = 1 - clamp(los, 0, 1);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, yba); for (const p of opp) ctx.lineTo(p[0], lerp(yba, p[1], vastFrac)); ctx.lineTo(x + w / 2, yba); ctx.closePath();
  ctx.fillStyle = rgba(BIO.slijm, 0.7); ctx.fill(); ctx.clip();
  // klieren: rechte buisjes → kronkelend
  const nk = 9; for (let k = 0; k < nk; k++) { const kx = x - w / 2 + (k + 0.5) * w / nk; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const u = i / 20; const yy = lerp(yba, yf - 10, u); const zx = Math.sin(u * 14 + k) * 7 * kronkel * dikte; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke();
    ctx.strokeStyle = rgba(BIO.slijmD, 0.6); ctx.lineWidth = 2; ctx.stroke(); }
  // spiraalslagaders
  for (let k = 0; k < 5; k++) { const kx = x - w / 2 + (k + 1) * w / 6 + 20; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - los * 0.5)); ctx.lineWidth = 3.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys + 10, yf + 10, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
  ctx.restore();
  // oppervlakte-epitheel
  ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 3; ctx.beginPath(); opp.forEach((p, i) => { const yy = lerp(yba, p[1], vastFrac); i ? ctx.lineTo(p[0], yy) : ctx.moveTo(p[0], yy); }); ctx.stroke();
  // afstoten: brokken functionele laag + bloed drijven de holte in (omhoog)
  if (los > 0.01) { for (let k = 0; k < 12; k++) { const bx = x - w / 2 + (k + 0.5) * w / 12 + (hash(k + 5) - 0.5) * 30; const lift = los * (40 + 80 * hash(k + 9)); const bw = w / 14, bh = fH * 0.6 * (0.6 + 0.4 * hash(k));
      ctx.save(); ctx.globalAlpha *= clamp(1.3 - los, 0, 1); ctx.beginPath(); ctx.ellipse(bx, yba - bh / 2 - lift, bw / 2, bh / 2, (hash(k) - 0.5) * 0.6, 0, 6.283); shape(ctx, rgba(BIO.slijm, 0.75), rgba(BIO.bloed, 0.7), 1.5); ctx.restore();
      ctx.beginPath(); ctx.arc(bx + 12, yba - lift * 0.7, 5, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.8 * los); ctx.fill(); } }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}

// =====================================================================================
// MOLECULEN (voeding). Kleurtaal van de reeks: koolhydraat V.kh (zeshoek), eiwit V.ew (kraal), vet V.vt.
// ZETMEEL: amylose = keten van glucoseringen die een spiraal vormt, ± 6 glucose per winding (helix, linksdraaiend
// gezien langs de as, in 2D: een golf met diepte; ringen achteraan kleiner en donkerder). Bij vertering wikkelt
// de keten zich af en knippen enzymen hem in losse glucose. Bron: Berg, Biochemistry h. 11. Bekende fout: een rechte
// rij zeshoeken (dat is eerder cellulose).
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; /* spreid: hoe ver de losse glucose uit elkaar gaat (1 = 3,7 r per stuk) */ ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: (p[2] + pos[i - 1][2]) / 2 - 0.01, lijn: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { const lf = 1 - clamp(los / 0.6, 0, 1);
    if (it.lijn) { if (lf <= 0.01) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.save(); ctx.globalAlpha *= lf * (0.55 + 0.45 * (it.z + 1) / 2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); return; }
    const p = pos[it.ring]; const k = 0.66 + 0.4 * (p[2] + 1) / 2; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * (p[2] + 1) / 2; hexagon(ctx, p[0], p[1], r * k, p[2] < -0.3 ? lighten(fill, -0.18) : fill, lighten(fill, 0.35)); ctx.restore(); });
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
// CELLULOSE: rechte ketens van glucose, elke volgende ring omgekeerd (β-1,4); ketens liggen evenwijdig en zijn
// met waterstofbruggen (stippellijntjes) tot een vezeltje gebonden. Bekende fout: losse groene bolletjes.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, col = (typeof V !== 'undefined' ? V.vezel : C.groen) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const dy = r * 2.1;
  for (let k = 0; k < ketens - 1; k++) { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(i * r * 2.2, k * dy + r * 0.6); ctx.lineTo(i * r * 2.2 + r * 0.4, (k + 1) * dy - r * 0.6); ctx.stroke(); } ctx.setLineDash([]); }
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.6; ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(off, k * dy); ctx.lineTo(off + (n - 1) * r * 2.2, k * dy); ctx.stroke();
    for (let i = 0; i < n; i++) hexagon(ctx, off + i * r * 2.2, k * dy + (i % 2 ? 1.5 : -1.5), r, rgba(col, 0.8), lighten(col, 0.3), 1.1, i % 2 ? Math.PI / 6 : 0); }
  ctx.restore();
}
// EIWIT dat vouwt. Recept: keten van aminozuren (kralen) vouwt in stukken: eerst α-helices (strakke spiraal,
// 3,6 aminozuren per winding) en β-strengen (zigzag, naast elkaar met waterstofbruggen), daarna de hele keten
// tot een compacte kluwen (tertiaire structuur). Vouwen is een morph, geen wissel. Bekende fout: een bol.
function _eiwitVorm(n, s) { // doelvorm: helix – lus – streng ⇄ streng (haarspeld) – lus – helix – staart; ± 320 × 200 bij s=1
  // Eén doorlopende gids; elk stuk heeft een soort. Helix: kleine as-stap + zijwaartse golf (3,6 per winding); streng: gestrekt.
  const G = [['h', [[-150, -86], [-84, -10]]], ['l', [[-84, -10], [-70, 34], [-30, 62]]], ['s', [[-30, 62], [100, 62]]], ['l', [[100, 62], [136, 40], [100, 16]]],
    ['s', [[100, 16], [-10, 16]]], ['l', [[-10, 16], [-44, -10], [-20, -50]]], ['h', [[-20, -50], [110, -86]]], ['l', [[110, -86], [156, -64], [164, -20], [150, 20]]]];
  const dense = []; G.forEach(([tp, pts]) => bioDicht(pts, 60).forEach(q => dense.push([q[0], q[1], tp])));
  const out = []; let acc = 1e9, hp = 0, prev = null;
  for (let i = 1; i < dense.length && out.length < n; i++) { const a2 = dense[i - 1], b = dense[i]; acc += Math.hypot(b[0] - a2[0], b[1] - a2[1]);
    const stap = b[2] === 'h' ? 9 : 26; if (acc < stap) continue; acc = 0; const an = Math.atan2(b[1] - a2[1], b[0] - a2[0]);
    let w = 0, z = 0, ax = 0; if (b[2] === 'h') { const ph = hp / 3.6 * 6.283; w = Math.sin(ph) * 20; z = Math.cos(ph); ax = z * 12; hp++; } else hp = 0;
    out.push([(b[0] + Math.cos(an) * ax - Math.sin(an) * w) * s, (b[1] + Math.sin(an) * ax + Math.cos(an) * w) * s, z]); }
  while (out.length < n) { const q = out[out.length - 1]; out.push([q[0] - 18 * s, q[1] + 18 * s, 0]); }
  return out;
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0 } = o; if (a <= 0.01) return; const n = kinds.length;
  const doel = _eiwitVorm(n, s); const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const pts = doel.map((d, i) => { const seg = (i < 10 || (i > 22 && i < 34)) ? 0 : 0.3; const f = ease(clamp((fold - seg) / (1 - seg), 0, 1)); const w = wander(i + 900, t, r * 0.15, 0.6); return [cx + lerp(begin[i][0], d[0], f) + w.x, cy + lerp(begin[i][1], d[1], f) + w.y, (d[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a;
  if (fold > 0.85) { ctx.save(); ctx.globalAlpha *= (fold - 0.85) / 0.15; ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]); for (let i = 0; i < 6; i++) { const p = pts[13 + i], q2 = pts[25 - i]; if (p && q2) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); } } ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2.2; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]).forEach(i => { const p = pts[i]; ctx.save(); ctx.globalAlpha *= 0.75 + 0.25 * (p[2] + 1) / 2; bead(ctx, p[0], p[1], r * (0.82 + 0.18 * (p[2] + 1) / 2), kinds[i], { ess }); ctx.restore(); });
  ctx.restore(); return pts;
}
// MEMBRAAN: dubbele laag fosfolipiden langs een boog (een cel is rond). Kop (rond) + twee staarten ± 2× de kop-
// diameter, staarten naar binnen; een eiwit steekt aan beide kanten uit. Staarten in vetkleur: het is vet.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const blad = (Rk, naarBinnen) => { for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); if (eiwitten.some(e => Math.abs(an - e) * R < kr * 3.2)) continue;
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = naarBinnen ? -1 : 1; const tx = -uy, ty = ux;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * sd * kr * 0.6, hy + uy * d * sl * 0.5 + ty * sd * kr * 0.6, hx + ux * d * sl + tx * sd * kr * 0.35, hy + uy * d * sl + ty * sd * kr * 0.35); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, lighten(kop, 0.3), 1); } };
  blad(R + sl + gap, true); blad(R - sl - gap, false);
  eiwitten.forEach(e => { const ux = Math.cos(e), uy = Math.sin(e); ctx.save(); ctx.translate(cx + ux * R, cy + uy * R); ctx.rotate(e); ctx.beginPath(); bioPad(ctx, [[-sl * 1.6, -kr * 2.2], [0, -kr * 2.8], [sl * 1.6, -kr * 2.2], [sl * 1.7, kr * 1.8], [0, kr * 2.6], [-sl * 1.7, kr * 1.8]], true); shape(ctx, rgba(eiwitCol, 0.95), lighten(eiwitCol, 0.3), 1.5); ctx.restore(); });
  ctx.restore();
}
// CEL (rond) met membraan, kern (± 1/3 van de diameter, niet in het midden), mitochondriën en rustige textuur.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, s = 1, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.55); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14 * s, 0, 6.283); ctx.clip();
  for (let i = 0; i < 90; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)) * r; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 1.6 * s, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (organellen) { const kx = cx + r * 0.18, ky = cy - r * 0.12; nucleus(ctx, kx, ky, r * 0.33, 1, t);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.9, rr = r * 0.65; mitochondrion(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(36, r * 0.26), an + 1.2, 1, 4, t); } }
  ctx.restore();
  membraanBoog(ctx, cx, cy, r - 7 * s, a0, a1, { s: s * 0.7, eiwitten });
  ctx.restore();
}

// =====================================================================================
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten steken in vlucht
// voorbij de staart uit; bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const rug = '#7E6248', buik = '#E9DCC6', vlek = '#4E3A28';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  vleugel(true);
  // poten steken voorbij de staart uit
  ctx.strokeStyle = '#2E2E2E'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-34, 9); ctx.lineTo(-96, 15); ctx.moveTo(-34, 11); ctx.lineTo(-94, 20); ctx.stroke();
  // staart
  ctx.beginPath(); ctx.moveTo(-60, -5); ctx.lineTo(-86, -7); ctx.lineTo(-88, 5); ctx.lineTo(-60, 7); ctx.closePath(); shape(ctx, '#CDB898', '#7E6248', 1);
  ctx.strokeStyle = rgba(vlek, 0.6); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-70 - k * 6, -6); ctx.lineTo(-70 - k * 6, 6); ctx.stroke(); }
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(vlek, 0.7); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, '#B89A78', '#D9C2A4', 1);
  ctx.strokeStyle = '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  ctx.strokeStyle = '#2E2A26'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(82, -5); ctx.quadraticCurveTo(116, -3, 144, -12); ctx.stroke();
  ctx.strokeStyle = '#D99A90'; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(82, -5); ctx.lineTo(100, -4); ctx.stroke();
  vleugel(false);
  ctx.restore();
}

// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, streep = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, streep * 0.45, h);
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3 }); }

// =====================================================================================
// LEVER (vooraanzicht). Recept: grootste klier (± 1,5 kg); grote rechterkwab (links op het scherm), smallere
// linkerkwab die over de maag reikt; scherpe onderrand, bolle bovenkant tegen het middenrif; sikkelvormig band
// tussen de kwabben; galblaas als groen peertje onder de rechterkwab. Rood-bruin. Bron: Gray's Anatomy.
// Bekende fout: bruine vlek.
// =====================================================================================
function leverVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, gloed = 0, gal = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const V0 = [[-190, -40], [-150, -95], [-60, -115], [40, -105], [130, -80], [195, -55], [210, -40], [170, -20], [90, 5], [20, 30], [-40, 70], [-110, 95], [-170, 80], [-200, 30]];
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = BIO.leverL; ctx.shadowBlur = 40 * gloed; }
  ctx.beginPath(); bioPad(ctx, V0, true); shape(ctx, BIO.lever, BIO.leverL, 2.5); if (gloed > 0.01) ctx.restore();
  ctx.strokeStyle = rgba(BIO.leverL, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(5, -108); ctx.quadraticCurveTo(0, -40, -15, 40); ctx.stroke(); // sikkelband
  ctx.fillStyle = rgba('#F2C0A8', 0.12); ctx.beginPath(); ctx.ellipse(-90, -50, 70, 26, -0.2, 0, 6.283); ctx.fill(); // glans
  if (gal) { ctx.beginPath(); bioPad(ctx, [[-70, 60], [-58, 82], [-62, 110], [-80, 118], [-94, 104], [-88, 78]], true); shape(ctx, BIO.gal, lighten(BIO.gal, 0.3), 1.5); }
  ctx.restore();
}

// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const N = 120; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(xx => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)));
  const dk = xs.map((xx, i) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1)));
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.32, rgba('#C98A86', 0.8));           // slijmvlies
    band(0.32, 0.45, rgba('#8A6A6A', 0.6));        // bindweefsel
    band(0.45, 0.78, rgba(BIO.spier, 0.75));       // kringspier
    band(0.78, 0.96, rgba(BIO.spierL, 0.55));      // lengtespier
    band(0.96, 1.0, rgba('#E6D0C8', 0.7));         // buitenvlies
    // slijmvlies-oppervlak: plooien met kliergaatjes (of vlokken)
    ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
    xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - (vlokken ? Math.max(0, Math.sin(xx * 0.12)) * 9 : Math.abs(Math.sin(xx * 0.06)) * 4)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.strokeStyle = rgba('#7A4A4A', 0.6); ctx.lineWidth = 2; for (let i = 3; i < N; i += 4) { const yy = yc + kant * ri[i]; ctx.beginPath(); ctx.moveTo(xs[i], yy); ctx.lineTo(xs[i], yy + kant * dk[i] * 0.24); ctx.stroke(); } // klieren
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#5A2A26', 0.5); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.615); ctx.beginPath(); ctx.ellipse(xs[i], yy, 3.5, dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.83, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  }
  ctx.restore(); return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
}
// ENZYM met actieve plek (goud). Recept: eiwit-kluwen met een holte die precies past bij één substraat; bij
// binden sluit de holte een beetje (induced fit). Een substraat dat niet past (cellulose voor amylase) glijdt eraf.
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, sluit = 0, col = C.enzym, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const pts = []; for (let k = 0; k < 28; k++) { const u = k / 28 * 6.283; let rr = r * (1 + 0.08 * Math.sin(u * 5 + seed) + 0.05 * Math.sin(u * 9));
      const d = Math.abs(((u + Math.PI) % 6.283) - Math.PI); if (d < 0.5) rr *= lerp(0.45, 0.62, sluit) + (d / 0.5) * lerp(0.55, 0.38, sluit); pts.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, col, lighten(col, 0.3), 1.5);
  ctx.strokeStyle = rgba(lighten(col, 0.35), 0.55); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, [[-r * 0.6, -r * 0.2], [-r * 0.2, -r * 0.55], [r * 0.1, -r * 0.2], [-r * 0.25, r * 0.15], [-r * 0.1, r * 0.5]], false); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.28, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  ctx.restore();
}

// =====================================================================================
// ===== Toegevoegd 22 okt 2026 voor Sekse, gender en diversiteit 1.1 =====
// ==============================================================================
// ECHO van ± 20 weken (2D, sagittaal profiel). Recept: waaiervormig beeld (sector ± 70°), zwart = vocht
// (vruchtwater), grijs korrelig = weke delen, helder wit = bot en grensvlakken. Bij 20 weken: schedel als heldere
// ring, profiel (voorhoofd, neusbotje, lippen, kin), wervelkolom als dubbele rij heldere kraaltjes langs de rug,
// ribben als korte heldere streepjes, hart in de borst (± 2 cm) dat zichtbaar klopt (± 140/min), armpje met
// handje vaak bij het gezicht. Baarmoederwand als heldere band aan de rand. Bron: ISUOG-richtlijn 20-wekenecho;
// RIVM 'Het 20 wekenonderzoek'. Bekende fouten: losse ellipsen; kind 'getekend' met lijnen i.p.v. echo-korrel.
// (x, y) = top van de waaier (transducer); R = diepte; o.hl = {hoofd, armen, hart} 0..1 oplichten; t = tijd.
function _echoKorrel(ctx, pts, n, seed, helder, r = 1.6) { for (let i = 0; i < n; i++) { const p = pts(hash(seed + i * 3), hash(seed + i * 3 + 1)); if (!p) continue; const v = hash(seed + i * 3 + 2); ctx.fillStyle = `rgba(${helder},${helder},${helder + 6},${0.18 + 0.5 * v})`; ctx.fillRect(p[0], p[1], r + v * 1.6, r * 0.7 + v); } }
function echoBeeld(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, hl = {}, s = 1, open = 1.22 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const a0 = Math.PI / 2 - open / 2, a1 = Math.PI / 2 + open / 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.fillStyle = '#050608'; ctx.fill(); ctx.save(); ctx.clip();
  // baarmoederwand: heldere korrelige band onderaan en bovenaan
  const band = (r0, r1, n, sd) => _echoKorrel(ctx, (u, v) => { const an = lerp(a0, a1, u), rr = lerp(r0, r1, v); return [x + Math.cos(an) * rr, y + Math.sin(an) * rr]; }, n, sd, 150);
  band(R * 0.06, R * 0.16, 500, 11); band(R * 0.86, R * 0.99, 700, 17);
  // kind: lokaal stelsel, midden (cx, cy), schaal k; hoofd links, rug boven, gezicht naar links-onder
  const cx = x + R * 0.04, cy = y + R * 0.52, k = R / 520 * s; const P = (px, py) => [cx + px * k, cy + py * k];
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const romp = [[-40, -62], [60, -74], [170, -60], [250, -20], [262, 40], [215, 88], [120, 98], [20, 92], [-40, 70]];
  const hoofd = [[-100, -100], [-30, -86], [-10, -30], [-30, 40], [-80, 78], [-128, 84], [-150, 70], [-170, 52], [-176, 34], [-196, 22], [-188, 4], [-200, -6], [-206, -30], [-196, -66], [-160, -96]];
  for (const [vorm, dicht] of [[romp, 900], [hoofd, 800]]) { ctx.beginPath(); bioPad(ctx, vorm, true); ctx.fillStyle = 'rgba(70,74,80,0.55)'; ctx.fill(); ctx.save(); ctx.clip(); const xs = vorm.map(p => p[0]), ys = vorm.map(p => p[1]), mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
    _echoKorrel(ctx, (u, v) => [lerp(mx, Mx, u), lerp(my, My, v)], dicht, vorm === romp ? 31 : 37, 120, 2.2); ctx.restore(); }
  const bot = (pts, w, al) => { ctx.strokeStyle = `rgba(236,238,242,${al})`; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const lh = (n) => 0.75 + 0.25 * (hl[n] || 0);
  // schedel (heldere ring) + profiel
  ctx.save(); ctx.globalAlpha *= lh('hoofd'); bot([[-196, -66], [-160, -96], [-100, -100], [-40, -80], [-18, -30], [-34, 30], [-80, 70]], 7, 0.9);
  bot([[-206, -30], [-200, -8], [-188, 4], [-196, 22], [-176, 34], [-170, 52], [-150, 70]], 4, 0.75); bot([[-196, 12], [-186, 6]], 5, 0.95); // neusbotje
  ctx.beginPath(); ctx.ellipse(-150, -20, 13, 10, 0, 0, 6.283); ctx.fillStyle = 'rgba(10,10,12,0.9)'; ctx.fill(); bot([[-118, 40], [-90, 60], [-60, 66]], 5, 0.7); // oogkas, kaak
  if ((hl.hoofd || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.hoofd * 0.45; ctx.beginPath(); bioPad(ctx, hoofd, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } ctx.restore();
  // wervelkolom en ribben
  for (let i = 0; i < 20; i++) { const u = i / 19, px = lerp(-24, 236, u), py = -58 - 16 * Math.sin(u * 3) + u * 40; for (const d of [0, 12]) { ctx.fillStyle = 'rgba(236,238,242,0.85)'; ctx.fillRect(px - 4, py + d, 8, 6); } }
  for (let i = 0; i < 6; i++) bot([[20 + i * 22, -48], [12 + i * 22, 0], [22 + i * 22, 50]], 3, 0.35);
  // hart: kloppende vierkamer-vorm in de borst
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.3)) ** 2, hh = 1 + 0.12 * slag;
  ctx.save(); ctx.translate(70, 22); ctx.scale(hh, hh); ctx.globalAlpha *= lh('hart'); ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, -0.4, 0, 6.283); ctx.fillStyle = 'rgba(8,8,10,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,222,228,0.9)'; ctx.lineWidth = 4; ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 4); ctx.lineTo(26, -6); ctx.moveTo(0, -22); ctx.lineTo(4, 22); ctx.stroke();
  if ((hl.hart || 0) > 0.01) { ctx.globalAlpha *= hl.hart; ctx.beginPath(); ctx.ellipse(0, 0, 40, 34, -0.4, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore();
  // armpje met handje bij het gezicht
  ctx.save(); ctx.globalAlpha *= lh('armen'); const arm = [[-20, 46], [-60, 104], [-120, 108], [-160, 92]]; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = 'rgba(80,84,92,0.9)'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.stroke();
  bot([[-22, 50], [-58, 100]], 5, 0.85); bot([[-64, 104], [-118, 106]], 4, 0.8); for (let f = 0; f < 4; f++) bot([[-156, 86 + f * 5], [-176, 80 + f * 7]], 3, 0.7);
  if ((hl.armen || 0) > 0.01) { ctx.globalAlpha *= hl.armen * 0.6; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = C.goud; ctx.lineWidth = 36; ctx.globalAlpha *= 0.35; ctx.stroke(); } ctx.restore();
  bot([[200, 70], [270, 110], [300, 90]], 5, 0.6); // dijbeen/been aan de rand
  ctx.restore();
  // schaduw en diepteverloop
  const g = ctx.createRadialGradient(x, y, R * 0.2, x, y, R); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(x - R, y, 2 * R, R);
  ctx.restore(); ctx.strokeStyle = 'rgba(120,128,140,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.stroke();
  ctx.restore(); return { hart: P(70, 22), hoofd: P(-110, -10), arm: P(-120, 106) };
}

// EMBRYO van ± 6 weken na de bevruchting (Carnegie-stadium 15–17, kop-romplengte ± 7–12 mm), zijaanzicht.
// Recept: C-vormig; groot hoofd (± de helft van de lengte) met voorhersenblaas; oog als donker pigmentringetje met
// lens; oorputje achter de kieuwbogen; 3 kieuwboogjes onder het hoofd; grote hartbult en daaronder de leverbult;
// armknop (al een peddel) ter hoogte van het hart, kleinere beenknop lager; rij somieten (blokjes) langs de rug;
// staartje dat naar binnen krult. Huid doorzichtig, roze. De aanleg van de geslachtsklieren ligt binnenin tegen de
// achterwand van de buikholte (genitale lijst, naast de oernier). Bron: Sadler, Langman's Embryology h. 6 en 16;
// Virtual Human Embryo (Carnegie 16). Bekende fouten: kommavorm met een stip; ledematen als vingers; aanleg buiten op het lijf.
// Oorsprong = midden; ± 300 × 400 bij s = 1. o.glow = aanleg laten oplichten.
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#C9877A', diep = '#D69A8A';
  const lijf = [[-70, -170], [20, -208], [104, -182], [150, -112], [160, -24], [150, 58], [118, 124], [72, 166], [28, 182], [-8, 166], [-34, 128], [-52, 78], [-70, 30], [-98, -14], [-90, -52], [-108, -72], [-124, -112], [-112, -152]];
  // staart
  ctx.strokeStyle = huid; ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, [[30, 176], [-14, 196], [-44, 182], [-50, 156]], false); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, [[-44, 182], [-56, 156], [-46, 136]], false); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, rgba(huid, 0.96), rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  // voorhersenblaas en hersenblazen als zachtere vlakken
  ctx.fillStyle = rgba('#F6CDBC', 0.8); ctx.beginPath(); ctx.ellipse(-30, -150, 70, 50, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -150, 52, 44, 0.4, 0, 6.283); ctx.fill();
  // hart (klopt) en lever door de huid
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2; ctx.fillStyle = rgba('#C8463C', 0.55 + 0.2 * slag); ctx.beginPath(); ctx.ellipse(-62, -18, 34 + 3 * slag, 30 + 3 * slag, 0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = rgba('#9A3E36', 0.4); ctx.beginPath(); ctx.ellipse(-44, 46, 34, 36, 0, 0, 6.283); ctx.fill();
  // somieten langs de rug
  const rug = bioDicht([[96, -150], [138, -80], [146, 0], [132, 74], [100, 136], [56, 168]], 26); rug.forEach((p, i) => { if (i % 1) return; const q = rug[Math.min(rug.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an) * 14, p[1] + Math.cos(an) * 14); ctx.rotate(an); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.6), null); ctx.restore(); });
  // aanleg geslachtsklier: langwerpige lijst tegen de achterwand van de buik
  const gp = [[86, 30], [96, 70], [90, 108]]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 10; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwboogjes
  ctx.strokeStyle = rand; ctx.lineWidth = 3; [[-112, -96, 26], [-104, -74, 22], [-94, -56, 17]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx + 24, by, r, 2.4, 3.9); ctx.stroke(); });
  // oog en oorputje
  _bioCirc(ctx, -66, -128, 15, rgba('#5A3A34', 0.85)); _bioCirc(ctx, -66, -128, 7, rgba('#F6E6DC', 0.9)); ctx.beginPath(); ctx.arc(-6, -96, 7, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke();
  // armknop (peddel) en beenknop
  ctx.save(); ctx.translate(14, 12); ctx.rotate(1.9); ctx.beginPath(); ctx.ellipse(28, 0, 40, 22, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.save(); ctx.translate(58, 128); ctx.rotate(2.3); ctx.beginPath(); ctx.ellipse(22, 0, 30, 17, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.restore();
}

// ZAADBAL in doorsnede. Recept: stevig kapsel (tunica albuginea); vanuit het mediastinum (één zijde) lopen tussen-
// schotten naar binnen die ± 250 lobjes maken; elk lobje vol opgerolde zaadbuisjes, in doorsnede ronde buisjes
// (± 0,2 mm) met een wand van Sertolicellen en zaadcellen in wording (rijper naar het midden) en staartjes in de
// holte; daartussen bindweefsel met groepjes Leydigcellen (maken testosteron) bij haarvaten. Bron: Junqueira h. 21.
// Bekende fouten: golflijnen of blokjes; buisjes als lege ringen.
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0, col = C.teal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), lighten(col, 0.2), Math.max(2.5, rx * 0.035)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const bx = x + px, by = y + py, r = rb * (0.92 + 0.12 * hash(i + 3));
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#1A2232', 0.75); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283; _bioCirc(ctx, x + px + Math.cos(an) * rb * 1.08, y + py + Math.sin(an) * rb * 1.08, Math.max(1.5, rb * 0.16), rgba(C.goud, 0.85 * leydig)); });
  ctx.restore(); ctx.restore();
}

// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // bloedvaten en urineleider bij de hilus (rechts)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(60, -16); ctx.lineTo(150, -24); ctx.stroke(); ctx.strokeStyle = '#4A6CA8'; ctx.beginPath(); ctx.moveTo(60, 8); ctx.lineTo(150, 6); ctx.stroke();
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(56, 30); ctx.quadraticCurveTo(80, 90, 70, 190); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#9E4A3E', '#D88E7A', 3); ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.9); for (let k = 0; k < 8; k++) { const an = Math.PI * 0.62 + k * 0.32; const bx = 66 + Math.cos(an) * 38, by = Math.sin(an) * 64 * 1.1; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(44, 0); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = rgba('#E8D9A0', 0.85); ctx.beginPath(); ctx.ellipse(46, 4, 16, 30, 0, 0, 6.283); ctx.fill(); ctx.restore();
  // bijnier op de bovenpool
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const g = glow * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, rgba('#E2B64A', 0.75 + 0.25 * g), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); ctx.fillStyle = rgba('#8A4A3A', 0.85); ctx.fill();
  if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * 0.6; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { bijnier: [x + 4 * s, y - 140 * s] };
}

// KIP (leghen), zijaanzicht naar rechts. Recept: romp eivormig en schuin (achter hoger), ± 2,5× de koplengte; staart-
// veren steil omhoog; hals met halsveren die over de schouder vallen; kleine kop; enkelvoudige kam met 5 punten, lellen
// onder de snavel, oorlel; gele, korte snavel; vleugel tegen de romp; poten geel geschubd, 3 tenen naar voren, 1 naar
// achter. Kleur: roodbruin met donkerdere vleugel en staart. Bron: foto's leghen (ISA Brown). Bekende fouten: bolletje
// met cirkelkop; kam als twee rondjes.
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A', pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6;
  ctx.strokeStyle = poot; ctx.lineWidth = 7; [[-6, 52], [22, 52]].forEach(([px, py], i) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2, py + 54); ctx.stroke(); ctx.lineWidth = 4; [[-22, 6], [0, 10], [20, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px + 2 + dx, py + 54 + dy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px - 12, py + 50); ctx.stroke(); ctx.lineWidth = 7; });
  ctx.beginPath(); bioPad(ctx, [[-120, -78], [-104, -128], [-78, -150], [-64, -112], [-56, -60]], true); shape(ctx, _bioDonker(kleur, 0.45), null); // staart
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null); // romp
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null); // vleugel
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76, -64); ctx.rotate(pik * 0.02);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null); // hals
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null); // kop
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null); // snavel
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill(); // kam
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); // lel + oorlel
  _bioCirc(ctx, 30, -70, 4.2, '#E8A040'); _bioCirc(ctx, 31, -70, 2.2, '#121A26');
  ctx.restore(); ctx.restore();
}
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }

// ZEESCHILDPAD (onechte karetschildpad), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig, ± 1 m;
// 5 middelste schilden (vertebraal), 5 paar ribschilden, rand van kleine schilden; voorvinnen lang en sikkel-
// vormig (± 1/2 van de schildlengte), achtervinnen kort en rond; kop groot met snavel en schubben. Roodbruin.
// Legt ± 100 eieren (pingpongbal, ± 4 cm) in een kuil in het zand; temperatuur van het nest bepaalt de sekse
// (warmer dan ± 29 °C vooral vrouwtjes). Bron: NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met
// pootjes en een bolle koepel. o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A';
  for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(-0.25 + vin * 0.35); ctx.beginPath(); bioPad(ctx, [[40, -40], [120, -66], [178, -40], [190, -6], [140, -10], [60, -6]], true); shape(ctx, huid, schub, 2); ctx.restore();
    ctx.save(); ctx.scale(sx, 1); ctx.beginPath(); bioPad(ctx, [[40, 80], [80, 96], [92, 124], [64, 128], [30, 104]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, [[-22, -96], [-30, -128], [-16, -158], [16, -158], [30, -128], [22, -96]], true); shape(ctx, huid, schub, 2); _bioCirc(ctx, -16, -136, 4, '#2A1C16'); _bioCirc(ctx, 16, -136, 4, '#2A1C16');
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-96, -54, -12, 32, 76, 120];
  for (let i = 0; i < 5; i++) { ctx.beginPath(); bioPad(ctx, [[-22, vy[i]], [22, vy[i]], [26, (vy[i] + vy[i + 1]) / 2], [22, vy[i + 1]], [-22, vy[i + 1]], [-26, (vy[i] + vy[i + 1]) / 2]], true); ctx.stroke(); }
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx * 26, vy[i] + 20); ctx.lineTo(sx * 92, vy[i] + 20 + i * 4); ctx.stroke(); }
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); const [px, py] = p; ctx.lineTo(px * 0.86, py * 0.86); } ctx.stroke();
  ctx.restore(); ctx.restore();
}
// eieren in een nestkuil in het zand (pingpongbal-groot, wit, iets ingedeukt)
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
  for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
  ctx.restore(); }

// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]];
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [224, 6], [246, 4], [266, 2], [284, 1]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(tx - 3, ty); ctx.lineTo(tx, ty + (i % 2 ? -8 : 9)); ctx.lineTo(tx + 3, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(170, 8); ctx.quadraticCurveTo(240, 6, 298, -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, -30, 13, 9, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 160, -30, 6, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(159, -35, 2, 10);
  _bioCirc(ctx, 292, -14, 3.5, '#1A1410');
  ctx.restore();
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: zaadbalweefsel, T-helpercel, hiv, bacterie
// =====================================================================================
// =====================================================================================
// obj_man_afweer.js — objecten voor lib_bio.js: zaadbalweefsel, T-helpercel, hiv-deeltje, staafbacterie.
// Vereist: lib_bio.js (BIO, bioPad, bloedvat) en lib.js-hulpjes (C, rgba, lighten, hash, clamp, lerp, ease,
// shape, roundRect). Stijl: vlakke vullingen, rand 1–2 px lichter, geen tekst, alles deterministisch via hash(),
// animatie alleen via t (seconden).
// =====================================================================================

// =====================================================================================
// ZAADBALWEEFSEL (doorsnede testis, lichtmicroscoop). Recept (mens): zaadbuisjes rond, diameter 180–200 µm;
// wand = basale membraan + 1–2 lagen platte peritubulaire (myoïde) cellen, samen ± 4–6 µm; kiemepitheel 60–80 µm
// dik, lumen ± 40–60 µm. Sertolicellen ± 1 per 25–30 µm omtrek: hoge zuil van basale membraan tot lumen, bleek
// cytoplasma, kern bij de basis (± 9 × 6 µm, bleek, ovaal/peervormig, groot kernlichaampje), lange as radiaal.
// Van buiten naar binnen: spermatogonia op de basale membraan (kern ± 6–7 µm, donker), primaire spermatocyten
// in de middenlaag (cel 15–18 µm, grootste kernen ± 10 µm, chromatine als draden), ronde spermatiden (cel ± 8 µm,
// kern ± 5 µm, bleek), langgerekte spermatiden aan het lumen (kop ± 5 × 2,5 µm, kop naar de basis), staarten in
// het lumen. Interstitium smal; Leydigcellen (15–20 µm, veelhoekig, eosinofiel = warm/oker, ronde kern ± 6 µm,
// excentrisch) in groepjes bij een haarvat (Ø 6–8 µm, rode bloedcellen 7,5 µm). Schaal hier ± 1,5 px/µm bij
// w = 720, h = 420. Weinig productie: kiemepitheel dunner, minder spermatiden en staarten, lumen wijder.
// Bron: Junqueira's Basic Histology h. 21 (fig. 21-3/21-5); Ross & Pawlina, Histology h. 22.
// Bekende fouten: buisje als ring met stipjes; Sertolicellen als losse bolletjes; spermatocyten even groot als
// spermatogonia; Leydigcellen ín het buisje; zaadcellen met kop naar het lumen; honingraat van buisjes.
// =====================================================================================
var _ZB_BUIS = [ // [x, y, R] in ontwerpcoördinaten (frame 720 × 420, oorsprong = midden)
  [-240, 10, 140], [80, -122, 138], [62, 192, 136], [372, 48, 140], [-330, -252, 120], [-272, 288, 115], [332, -255, 110]
];
var _ZB_CAP = [[-120, -250], [-96, -92], [-62, 12], [-80, 138], [-112, 250]]; // haarvat tussen buisje 0, 1 en 2
function _zbBuis(ctx, cx, cy, R, p, t, sd, hlS, info) {
  const rb = R - 6, rl = R * lerp(0.56, 0.32, p), dik = rb - rl; // basale membraan → lumen
  const ring = u => rb - u * dik;
  // wand: basale membraan + platte peritubulaire cellen
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); shape(ctx, rgba('#B07A68', 0.45), rgba('#D9A894', 0.8), 1.5);
  ctx.beginPath(); ctx.arc(cx, cy, rb, 0, 6.283); shape(ctx, rgba('#D8C9A8', 0.16), rgba('#E8D8C0', 0.55), 1);
  for (let k = 0; k < 11; k++) { const an = (k + hash(sd + k * 3.1)) / 11 * 6.283;
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * (R - 3), cy + Math.sin(an) * (R - 3), 7, 1.8, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.95); ctx.fill(); }
  // lumen
  ctx.beginPath(); ctx.arc(cx, cy, rl, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.55); ctx.fill();
  // Sertolicellen: zuilen van basis tot lumen
  const nS = Math.max(9, Math.round(6.283 * R / 70)); const sAng = [];
  for (let k = 0; k < nS; k++) sAng.push((k + 0.25 * (hash(sd + k * 7.7) - 0.5)) / nS * 6.283 + hash(sd) * 6.283);
  const col = rgba('#EFE3C4', 0.24 + 0.32 * hlS), colE = rgba('#F6ECD2', 0.4 + 0.45 * hlS);
  sAng.forEach((th, k) => {
    const L = [], Rr = [];
    for (let i = 0; i <= 7; i++) { const u = i / 7, r = lerp(rb, rl - 2, u); const half = lerp(8, 3.2, u);
      const w1 = half + 1.8 * Math.sin(u * 9 + k), w2 = half + 1.8 * Math.sin(u * 8 + k * 2.3 + 1);
      L.push([cx + Math.cos(th - w1 / r) * r, cy + Math.sin(th - w1 / r) * r]); Rr.unshift([cx + Math.cos(th + w2 / r) * r, cy + Math.sin(th + w2 / r) * r]); }
    if (hlS > 0.01) { ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); ctx.strokeStyle = rgba('#F6ECD2', 0.22 * hlS); ctx.lineWidth = 6; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); shape(ctx, col, colE, 1);
  });
  // kiemcellen (tussen de zuilen); ringen met vaste plaatsen, productie dunt uit
  const vrij = (an, r, half) => sAng.every(th => { let d = Math.abs(((an - th) % 6.283 + 9.425) % 6.283 - 3.1416); return d * r > 8 + half; });
  const cel = (x, y, cr, kr, kf, ke) => { ctx.beginPath(); ctx.arc(x, y, cr, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1); ctx.beginPath(); ctx.arc(x, y, kr, 0, 6.283); shape(ctx, kf, ke, 1); };
  // spermatogonia op de basale membraan
  { const r = rb - 6.5, n = Math.floor(6.283 * r / 15);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 1.3)) / n * 6.283; if (!vrij(an, r, 2)) continue; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
      ctx.beginPath(); ctx.ellipse(x, y, 7.5, 6, an, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1);
      ctx.beginPath(); ctx.ellipse(x, y, 5, 4, an + Math.PI / 2, 0, 6.283); shape(ctx, '#5A4888', (C.nucEdge || '#A392D6'), 1); } }
  // primaire spermatocyten: grootste kernen, chromatinedraden
  { const r = ring(0.31), n = Math.floor(6.283 * r / 24);
    for (let i = 0; i < n; i++) { const an = (i + 0.5 + 0.3 * hash(sd + i * 2.9)) / n * 6.283; if (!vrij(an, r, 6) || hash(sd + i * 5.3 + 1) > 0.45 + 0.55 * p) continue;
      const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r; cel(x, y, 11, 7.5, rgba((C.nucFill || '#6E5A9E'), 0.95), (C.nucEdge || '#A392D6'));
      ctx.strokeStyle = rgba('#D4C8F0', 0.75); ctx.lineWidth = 1.1; ctx.lineCap = 'round';
      for (let d = 0; d < 3; d++) { const h = k => hash(sd + i * 11 + d * 3 + k) - 0.5; ctx.beginPath(); ctx.moveTo(x + h(1) * 9, y + h(2) * 9); ctx.quadraticCurveTo(x + h(3) * 12, y + h(4) * 12, x + h(5) * 9, y + h(6) * 9); ctx.stroke(); } } }
  // ronde spermatiden (twee rijen)
  [[0.6, 12], [0.76, 11.5]].forEach(([u, sp], ri) => { const r = ring(u), n = Math.floor(6.283 * r / sp);
    for (let i = 0; i < n; i++) { const an = (i + ri * 0.5 + 0.25 * hash(sd + i * 3.7 + ri)) / n * 6.283; if (!vrij(an, r, 1) || hash(sd + i * 4.1 + ri * 9 + 2) > Math.pow(p, 1.4)) continue;
      cel(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 5.8, 3.4, rgba((C.purpleL || '#BBAFE0'), 0.9), lighten((C.purpleL || '#BBAFE0'), 0.3)); } });
  // langgerekte spermatiden: kop naar de basis, staart het lumen in
  { const r = rl + 6, n = Math.floor(6.283 * r / 7.5);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 6.1)) / n * 6.283; if (hash(sd + i * 8.3 + 3) > Math.pow(p, 1.6)) continue;
      const ri = r + (hash(sd + i * 2.2) - 0.5) * 6, x = cx + Math.cos(an) * ri, y = cy + Math.sin(an) * ri;
      const sw = (hash(sd + i) - 0.5) * 2, tl = rl * (0.4 + 0.3 * hash(sd + i * 9.9)), pts = [];
      for (let k = 0; k <= 6; k++) { const rr = ri - 3 - k * tl / 6; const aa = an + sw * k * 0.035 + Math.sin(t * 2.4 + k * 1.3 + i) * 0.006 * k * k / 3; pts.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); }
      ctx.beginPath(); bioPad(ctx, pts); ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.42); ctx.lineWidth = 0.9; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, y, 4, 1.7, an + (hash(sd + i * 3.3) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#4A3A78', (C.nucEdge || '#A392D6'), 0.8); } }
  // Sertolikernen bovenop (bleek, groot kernlichaampje)
  sAng.forEach(th => { const r = rb - 13, x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r;
    ctx.beginPath(); ctx.ellipse(x, y, 7, 4.3, th, 0, 6.283); shape(ctx, rgba('#CFC3E6', 0.85 + 0.15 * hlS), '#E6DCF5', 1);
    ctx.beginPath(); ctx.arc(x - Math.cos(th) * 1.2, y - Math.sin(th) * 1.2, 1.7, 0, 6.283); ctx.fillStyle = (C.nucFill || '#6E5A9E'); ctx.fill();
    info.sertoli.push([x, y, th]); });
}
function zaadbalWeefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, t = 0, leydig = 0, sertoli = 0, testo = 0, inhibine = 0, productie = 1, seed = 0 } = o;
  const s = Math.min(w / 720, h / 420); const S = (px, py) => [x + px * s, y + py * s];
  const BUIS = _ZB_BUIS, CAP = _ZB_CAP;
  // Leydigcellen: twee groepjes in de driehoeken tussen de buisjes, veelhoekig tegen elkaar gedrukt
  const kandidaat = [];
  [[-22, 32, 9], [182, 40, 6]].forEach(([gx, gy, n], g) => { for (let i = 0; i < n + 6; i++) { const rr = 13 * Math.sqrt(i + 0.5), an = i * 2.39996 + seed + g;
    const px = gx + Math.cos(an) * rr, py = gy + Math.sin(an) * rr * 1.1;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 9)) continue;
    if (CAP.some(c => Math.hypot(px - c[0], py - c[1]) < 17) || Math.hypot(px - 205, py - 62) < 22) continue;
    if (kandidaat.filter(k => k.g === g).length < n) kandidaat.push({ x: px, y: py, g, m: 12.5 * (0.88 + 0.24 * hash(seed + i * 3 + g * 50)) }); } });
  const leyd = kandidaat.map((c, i) => { const pts = [];
    for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = c.m;
      kandidaat.forEach((q, j) => { if (j === i) return; const dx = q.x - c.x, dy = q.y - c.y, dd = Math.hypot(dx, dy), pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr - 1.5); });
      BUIS.forEach(([bx, by, bR]) => { const fx = c.x - bx, fy = c.y - by, B = fx * ux + fy * uy, Cq = fx * fx + fy * fy - (bR + 3) * (bR + 3), D = B * B - Cq; if (D > 0) { const tt = -B - Math.sqrt(D); if (tt > 0) best = Math.min(best, tt); } });
      pts.push([c.x + ux * Math.max(4, best), c.y + uy * Math.max(4, best)]); }
    return { c, pts }; });
  const ret = { leydig: S(-22, 32), sertoli: S(0, 0), haarvat: S(CAP[2][0], CAP[2][1]), buisjes: BUIS.map(([bx, by, bR]) => [x + bx * s, y + by * s, bR * s]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 28 * s); ctx.clip();
  ctx.translate(x, y); ctx.scale(s, s); const W = w / s, H = h / s;
  // interstitium: los bindweefsel met een paar fibroblastkernen en vezels
  ctx.fillStyle = rgba('#7A4A3A', 0.3); ctx.fillRect(-W / 2, -H / 2, W, H);
  ctx.strokeStyle = rgba('#E8C8B0', 0.1); ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) { const px = (hash(seed + i * 9.1) - 0.5) * W, py = (hash(seed + i * 4.7) - 0.5) * H;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 8)) continue; const an = hash(seed + i * 2.2) * 3.14;
    ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 14, py - Math.sin(an) * 14); ctx.quadraticCurveTo(px + 4, py - 4, px + Math.cos(an) * 14, py + Math.sin(an) * 14); ctx.stroke();
    if (i % 3 === 0) { ctx.beginPath(); ctx.ellipse(px, py, 5.5, 1.6, an, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); } }
  // zaadbuisjes
  const info = { sertoli: [] }; const sPerBuis = [];
  BUIS.forEach(([bx, by, bR], i) => { const st = info.sertoli.length; _zbBuis(ctx, bx, by, bR, clamp(productie, 0, 1), t, seed * 97 + i * 31 + 5, sertoli, info); sPerBuis.push(info.sertoli.slice(st)); });
  // haarvat (lengtedoorsnede) + klein haarvat in doorsnede bij groepje 2
  bloedvat(ctx, CAP, 6, t, { n: 5, speed: 0.05, haarvat: true });
  ctx.beginPath(); ctx.arc(205, 62, 9, 0, 6.283); shape(ctx, '#3A1A22', rgba(BIO.vaatwand, 0.9), 3); rodeBloedcel(ctx, 205, 62, 5.5, 0.4, 0, 0.95);
  // Leydigcellen
  leyd.forEach(({ c, pts }, i) => {
    if (leydig > 0.01) { ctx.beginPath(); bioPad(ctx, pts, true); ctx.strokeStyle = rgba((C.gold || '#E0B64A'), 0.28 * leydig); ctx.lineWidth = 7; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, lighten('#B8894A', 0.18 * leydig), lighten((C.ochre || '#C9A35C'), 0.35 + 0.3 * leydig), 1.3);
    for (let k = 0; k < 2; k++) { const an = hash(seed + i * 5 + k) * 6.283; ctx.beginPath(); ctx.arc(c.x + Math.cos(an) * 6, c.y + Math.sin(an) * 6, 1.6, 0, 6.283); ctx.fillStyle = rgba('#F6E2B0', 0.55); ctx.fill(); } // vetdruppeltjes
    const kx = c.x + (hash(seed + i * 7) - 0.5) * 4, ky = c.y + (hash(seed + i * 8) - 0.5) * 4;
    ctx.beginPath(); ctx.arc(kx, ky, 4.6, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1);
    ctx.beginPath(); ctx.arc(kx + 1, ky - 0.8, 1.2, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); });
  // anker Sertoli: zuil van buisje 0 die naar het interstitium kijkt
  { let best = null, bd = 1e9; sPerBuis[0].forEach(q => { const d = Math.hypot(q[0] + 22, q[1] - 32); if (d < bd) { bd = d; best = q; } }); if (best) ret.sertoli = S(best[0], best[1]); }
  // deeltjes
  const capPts = bioDicht(CAP, 12);
  const naCap = (px, py) => { let b = capPts[0], bd = 1e9; capPts.forEach(q => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < bd) { bd = d; b = q; } }); return b; };
  const deeltje = (sx, sy, tx, ty, u, col, i) => { const e = ease(u), al = Math.sin(Math.PI * u);
    const px = lerp(sx, tx, e) + Math.sin(u * 6 + i) * 3, py = lerp(sy, ty, e) + Math.cos(u * 5 + i) * 3;
    ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.globalAlpha *= al; shape(ctx, col, lighten(col, 0.4), 1); ctx.globalAlpha /= al || 1; };
  if (testo > 0.01 && leyd.length) { const n = Math.round(40 * testo); ctx.save(); ctx.globalAlpha *= Math.min(1, testo * 2);
    for (let i = 0; i < n; i++) { const L = leyd[Math.floor(hash(seed + i * 1.7) * leyd.length)].c; const u = ((t * 0.22 * (0.8 + 0.4 * hash(i * 3.3)) + hash(i * 5.9)) % 1 + 1) % 1;
      let tx, ty; if (hash(i * 7.1 + 2) < 0.62) { let bb = BUIS[0], bd = 1e9; BUIS.forEach(B => { const d = Math.hypot(L.x - B[0], L.y - B[1]) - B[2]; if (d < bd) { bd = d; bb = B; } });
        const an = Math.atan2(L.y - bb[1], L.x - bb[0]) + (hash(i * 2.3) - 0.5) * 0.5; tx = bb[0] + Math.cos(an) * (bb[2] - 30); ty = bb[1] + Math.sin(an) * (bb[2] - 30); }
      else { const q = naCap(L.x, L.y); tx = q[0] + (hash(i) - 0.5) * 30; ty = q[1] + (hash(i + 1) - 0.5) * 30; }
      deeltje(L.x, L.y, tx, ty, u, (C.purple || '#8C7BBF'), i); } ctx.restore(); }
  if (inhibine > 0.01) { const n = Math.round(18 * inhibine); ctx.save(); ctx.globalAlpha *= Math.min(1, inhibine * 2);
    const bron = []; [0, 1, 2].forEach(b => { const [bx, by] = BUIS[b]; const q = naCap(bx, by); const dir = Math.atan2(q[1] - by, q[0] - bx);
      sPerBuis[b].forEach(sv => { let d = Math.abs(((sv[2] - dir) % 6.283 + 9.425) % 6.283 - 3.1416); if (d < 0.5) bron.push(sv); }); });
    for (let i = 0; i < n && bron.length; i++) { const sv = bron[Math.floor(hash(seed + i * 2.9 + 40) * bron.length)]; const u = ((t * 0.2 * (0.8 + 0.4 * hash(i * 4.4 + 9)) + hash(i * 6.6 + 3)) % 1 + 1) % 1;
      const q = naCap(sv[0], sv[1]); deeltje(sv[0], sv[1], q[0], q[1], u, (C.purpleD || '#675694'), i + 100); } ctx.restore(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// T-HELPERCEL (CD4+-lymfocyt). Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets
// excentrisch, donker (veel heterochromatine); smalle cytoplasmarand (dikste kant ± 20 % van de straal) met
// 2–3 mitochondriën. CD4 = transmembraaneiwit, steekt in het echt ± 7 nm uit (veel te klein om te zien):
// hier sterk vergroot als knopje op een steeltje (± 13 % van de straal), loodrecht op het membraan, gelijkmatig
// verdeeld (± elke 28 px omtrek). Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12 (lymfocyt).
// Bekende fouten: kleine kern in het midden met veel cytoplasma (dat is een monocyt); receptoren als
// losse stipjes naast de cel; receptoren schuin of ongelijk verdeeld.
// Oorsprong = midden van de cel, r = straal in px.
// =====================================================================================
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0 } = o;
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.28, 0, 6.283); ctx.strokeStyle = rgba((C.tealL || '#9ED0EA'), 0.11 * hl); ctx.lineWidth = r * 0.22; ctx.stroke(); }
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = lighten((C.green || '#7FC48F'), 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + ux * (r + st + kn * 0.7), y + uy * (r + st + kn * 0.7), kn * 1.15, kn * 0.9, an, 0, 6.283); shape(ctx, (C.green || '#7FC48F'), lighten((C.green || '#7FC48F'), 0.4), 1); }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, lighten('#2F5E78', 0.12 * hl), lighten((C.tealL || '#9ED0EA'), 0.2 * hl), Math.max(1.5, r * 0.022));
  // mitochondriën in de dikste kant van de rand
  for (let k = 0; k < 3; k++) { const an = Math.PI * 0.82 + (k - 1) * 0.42, rr = r * 0.88, L = r * 0.17, B = r * 0.065;
    ctx.save(); ctx.translate(x + Math.cos(an) * rr, y + Math.sin(an) * rr); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, (C.mitoFill || '#D88E7A'), (C.mitoEdge || '#F0B8A6'), 1);
    ctx.beginPath(); ctx.moveTo(-L * 0.28, 0); ctx.lineTo(L * 0.28, 0); ctx.strokeStyle = rgba((C.mitoEdge || '#F0B8A6'), 0.8); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); }
  // kern: groot, rond, donkere chromatinevlekken
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), Math.max(1.2, r * 0.018));
  ctx.fillStyle = rgba('#3E2E66', 0.45);
  for (let i = 0; i < 9; i++) { const an = hash(i * 2.1 + 5) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.72;
    ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// HIV-DEELTJE. Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel (twee lijnen);
// 8–14 envelopspikes (gp41-steel in de membraan + gp120-trimeer als knop), ± 10–14 nm hoog = ± 20 % van de
// straal, loodrecht en gelijkmatig verspreid; binnenin kegelvormig capside (p24) ± 100 nm lang, breed eind
// ± 50 nm, smal eind ± 20 nm (≈ 1,3 r lang), met twee RNA-strengen (enkelstrengs, ± 9,7 kb elk) vooral in het
// brede eind. Fusie: na binding aan CD4 + corecepor versmelt de envelop met het celmembraan; het deeltje opent
// aan de onderkant, wordt een koepel en loopt over in de membraan; capside zakt naar de opening.
// Bron: Briggs & Kräusslich 2011 (J Mol Biol, cryo-ET HIV); Zhu e.a. 2006 (Nature, spikes per virion ± 14).
// Bekende fouten: stekelbol met tientallen lange spikes; rond capside; spikes zonder steel die los zweven;
// DNA in plaats van RNA.
// Oorsprong = midden; r = straal envelop in px; fuseer-membraan ligt op y + r (raaklijn onderkant).
// =====================================================================================
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12 } = o; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba((C.coral || '#E07A5F'), 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    ctx.beginPath(); ctx.moveTo(px - nx * r * 0.05, py - ny * r * 0.05); ctx.lineTo(px + nx * r * 0.14, py + ny * r * 0.14); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.2); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h]) => { ctx.beginPath(); ctx.arc(px + nx * r * h + tx * sd * ks * 0.95, py + ny * r * h + ty * sd * ks * 0.95, ks, 0, 6.283); shape(ctx, (C.coralL || '#F0A88F'), lighten((C.coralL || '#F0A88F'), 0.35), 1); });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = (C.ink || '#F2F2EE'); ctx.lineWidth = Math.max(1, r * 0.022);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// STAAFBACTERIE (bacil, doorsnede-aanzicht). Recept: ± 1 µm breed × 2–3 µm lang (hier breedte = L / 2,5),
// uiteinden halfrond. Celwand (peptidoglycaan; Gram-positief 20–80 nm = 2–8 % van de breedte) hier vergroot tot
// ± 8 % zodat hij als dikke laag leest, buiten het dunne celmembraan met een smalle spleet ertussen (twee
// duidelijke lagen). Nucleoïde = één ringvormig DNA-molecuul, sterk opgekruld, als kluwen in het midden zonder
// kernmembraan. Ribosomen 20 nm, ± 10 000–20 000 per cel: hier veel kleine stipjes, buiten de nucleoïde.
// Flagel ± 20 nm dik, 5–10 µm lang (2–4 × de cel), schroefvormig, verankerd in wand + membraan (basaal
// lichaam) aan een pool. Antibiotica (bijv. penicilline) remmen de opbouw van de wand: gaten in de wand, het
// membraan puilt door een gat naar buiten (blaasje) en scheurt door de osmotische druk → inhoud lekt weg.
// Bron: Brock Biology of Microorganisms h. 2; Madigan e.a. fig. 2.x (penicilline-lysis).
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; ribosomen als grote bollen; flagel als
// los haartje naast de cel.
// Oorsprong = midden; L = lengte in px; o.rot = draaiing.
// =====================================================================================
function bacterieCel(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, hlRibo = 0, flagel = false } = o; const ab = clamp(antibiotica, 0, 1);
  const hw = L / 5, ww = hw * 0.16, half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  // omtrek (capsule) met normalen, gelijk verdeeld
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  // blaasje: membraan puilt door een wandgat bovenaan (x0)
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.1, ky = 0;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - 3).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // flagel aan de linkerpool (achter de cel getekend)
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 80; i++) { const u = i / 80, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.75); ctx.lineWidth = Math.max(1.4, hw * 0.05); ctx.stroke(); }
  // cytoplasma
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba((C.green || '#7FC48F'), 0.16); ctx.fill();
  // ribosomen
  const nr = Math.round(L * L / 900 + 40); const rr = Math.max(1.3, hw * 0.045);
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + 1) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4;
    if (Math.pow((px - kx) / (half * 0.85 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.5), 2) < 1) continue;
    if (hlRibo > 0.01) { ctx.beginPath(); ctx.arc(px, py, rr * 2.4, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 0.18 * hlRibo); ctx.fill(); }
    ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fillStyle = lighten((C.gold || '#E0B64A'), 0.3 * hlRibo); ctx.fill(); }
  ctx.restore();
  // nucleoïde: opgekruld ring-DNA
  ctx.beginPath(); const nl = 220; for (let i = 0; i <= nl; i++) { const u = i / nl * 6.283; const bx = Math.cos(u) * half * 0.7, by = Math.sin(u) * hw * 0.3; const cr = hw * (0.13 + 0.05 * Math.sin(u * 3));
    const px = kx + bx + Math.cos(u * 23) * cr, py = ky + by + Math.sin(u * 23) * cr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.strokeStyle = rgba((C.purpleL || '#BBAFE0'), 0.95); ctx.lineWidth = Math.max(1.1, hw * 0.035); ctx.stroke();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = (C.mem || '#AFC0D0'); ctx.lineWidth = Math.max(1.3, hw * 0.04);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    // inhoud lekt weg
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 1 - u); ctx.fill(); } }
  // celwand: dikke band, met gaten bij antibiotica
  const wand = omtrek(hw - ww / 2, 96); const wc = lighten('#6FA27C', 0.25 * hlWand);
  if (hlWand > 0.01) { ctx.beginPath(); bioPad(ctx, wand.map(q => q.p), true); ctx.strokeStyle = rgba((C.greenL || '#B4DFBB'), 0.22 * hlWand); ctx.lineWidth = ww + 10; ctx.stroke(); }
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  ctx.lineCap = 'round';
  for (const pass of [[lighten(wc, 0.45), ww + 2.4], [wc, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  // basaal lichaam van de flagel
  if (flagel) { ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.ink2, (C.ink || '#F2F2EE'), 1); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: aanleg geslachtsorganen, eileider, zwangerschapstest
// =====================================================================================
// =====================================================================================
// obj_aanleg_eileider_test.js — nieuwe objecten voor lib_bio.js (aanleg geslachtsorganen, eileider, zwangerschapstest)
// Zelfde stijl als lib_bio.js: recept + bron + bekende fouten boven elk object; (ctx, x, y, ..., o = {});
// deterministisch (alleen hash), animatie via t (s), geeft ankerpunten in schermcoördinaten terug.
// =====================================================================================

function _bioMix(c1, c2, f) { // twee #hex-kleuren mengen → 'rgb()'
  const p = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(c1), B = p(c2); f = clamp(f, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], f))},${Math.round(lerp(A[1], B[1], f))},${Math.round(lerp(A[2], B[2], f))})`;
}
function _bioMixA(c1, c2, f, al) { const s = _bioMix(c1, c2, f); return s.replace('rgb(', 'rgba(').replace(')', `,${al})`); }

// =====================================================================================
// AANLEG GESLACHTSORGANEN (inwendig), embryo week 6–7, ongedifferentieerd stadium, vooraanzicht, symmetrisch.
// Recept (Sadler, Langman's Medical Embryology h. 16, fig. 16.24–16.32; Moore, The Developing Human h. 12):
// - Gonade = genitale lijst: langgerekte richel mediaal van de oernier (mesonephros), lengte ± 3–4× de breedte,
//   hoog in de buik (ter hoogte van de onderste borst-/bovenste lendenwervels). Hier 44 × 140 px.
// - Wolff-buis (ductus mesonephricus) loopt lateraal in de oernier omlaag en mondt uit in de sinus urogenitalis.
// - Müller-buis (ductus paramesonephricus) ontstaat als instulping van het coeloomepitheel LATERAAL van de
//   Wolff-buis, opent boven met een trechter in de buikholte, loopt omlaag, kruist dan VENTRAAL (vóór) de Wolff-buis
//   naar mediaal; beide Müller-buizen versmelten in de middellijn (uterovaginaal kanaal) en raken de achterwand van
//   de sinus (Müller-heuveltje) tussen de twee Wolff-uitmondingen.
// - Man (SRY → testis, AMH, testosteron): testis ronder (± 4 × 3 cm volwassen, verhouding 1,3 : 1), zakt iets;
//   bovenste oerniertubuli + Wolff-buis → ductuli efferentes + bijbal (sterk gekronkelde buis tegen de laterale/
//   achterkant van de testis, kop boven, staart onder); rest van de Wolff-buis → zaadleider (dikke spierwand);
//   zaadblaasje = knop uit de zaadleider vlak boven de sinus (week 10); Müller-buizen verdwijnen door AMH.
// - Vrouw (geen AMH, geen testosteron): eierstok amandelvormig (± 3 × 1,5 cm volwassen, 2 : 1) met follikels;
//   bovenste Müller-deel → eileider met trechter en fimbriae; versmolten onderste deel → baarmoeder + bovenste deel
//   vagina (peervorm in de middellijn, fundus boven); Wolff-buizen verdwijnen (resten: Gartner).
// Ontwerpcoördinaten: ± 360 × 440, oorsprong in het midden; sinus onderaan in het midden.
// Bekende fouten: gonaden onderaan naast de sinus; Müller-buis mediaal van de Wolff-buis over de hele lengte;
// Müller-buizen die gescheiden in de sinus uitkomen; bijbal als losse bol; baarmoeder als driehoek los van de buizen;
// beide buizenparen tegelijk volgroeid laten (in elk geslacht verdwijnt er één).
// =====================================================================================
function aanlegGeslacht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, man = 0, vrouw = 0, hlWolff = 0, hlMuller = 0, hlGonade = 0 } = o;
  const m = ease(clamp(man, 0, 1)), v = ease(clamp(vrouw, 0, 1));
  const P = (px, py) => [x + px * s, y + py * s];
  const mix3 = (i, mm, ff) => i + (mm - i) * m + (ff - i) * v;
  const mixPts = (I, Mm, F) => I.map((p, k) => [mix3(p[0], Mm[k][0], F[k][0]), mix3(p[1], Mm[k][1], F[k][1])]);
  const COL_W = (C.purple || '#8C7BBF'), COL_M = '#D9868A', COL_G = '#C98A6A', COL_S = '#8FA6B8';
  // gonade
  const g = { cx: mix3(82, 80, 88), cy: mix3(-112, -62, -100), rx: mix3(22, 38, 24), ry: mix3(70, 50, 50), rot: mix3(0.06, 0.1, 0.32) };
  const gM = { cx: 80, cy: -62, rx: 38, ry: 50, rot: 0.1 }; // eindstand testis (voor de bijbal)
  const opT = (G, th, dr = 0) => { const lx = Math.cos(th) * (G.rx + dr), ly = Math.sin(th) * (G.ry + dr * 0.8); const c = Math.cos(G.rot), sn = Math.sin(G.rot); return [G.cx + lx * c - ly * sn, G.cy + lx * sn + ly * c]; };
  // Wolff (rechts): ongedifferentieerd / man (bijbal + zaadleider) / vrouw (= ongedifferentieerd, verdwijnt)
  const W_I = [[124, -206], [132, -150], [134, -80], [132, -10], [124, 50], [100, 105], [60, 150], [26, 184], [16, 202]];
  const W_M = [opT(gM, -1.2, 8), opT(gM, -0.6, 9), opT(gM, 0, 9), opT(gM, 0.9, 8), [124, 40], [106, 100], [62, 148], [26, 184], [16, 202]];
  const wolff = mixPts(W_I, W_M, W_I);
  // Müller (rechts): trechter boven lateraal, kruist ventraal naar mediaal
  const M_I = [[162, -202], [164, -140], [162, -70], [156, 0], [144, 55], [112, 96], [66, 132], [24, 156], [6, 166]];
  const M_F = [[116, -160], [148, -164], [170, -128], [174, -62], [156, 0], [122, 34], [88, 46], [62, 52], [44, 52]]; // eileider boogt over de eierstok
  const muller = mixPts(M_I, M_I, M_F);
  // middellijn: versmolten Müller-deel (rechterhelft) → peervormige baarmoeder + bovenste vagina
  const U_I = [[0, 156], [6, 157], [9, 161], [9, 168], [9, 175], [9, 182], [9, 188], [9, 195], [9, 202]];
  const U_F = [[0, 24], [32, 28], [52, 46], [55, 82], [44, 118], [26, 142], [18, 158], [16, 180], [16, 202]];
  const uterus = mixPts(U_I, U_I, U_F);
  const ret = { gonade: P(g.cx, g.cy), wolff: (() => { const q = bioPunt(bioDicht(wolff, 12), 0.5); return P(q[0], q[1]); })(),
    muller: (() => { const q = bioPunt(bioDicht(muller, 12), 0.5); return P(q[0], q[1]); })(), sinus: P(0, 214) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const both = (fn) => { fn(1); ctx.save(); ctx.scale(-1, 1); fn(-1); ctx.restore(); };
  const lijn = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const buisVul = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const rand = (pts, col, lw, al) => { ctx.strokeStyle = lighten(col, 0.4); ctx.globalAlpha *= al; ctx.lineWidth = lw + 2.4; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.globalAlpha /= al; };

  // sinus urogenitalis (onder, midden)
  ctx.beginPath(); bioPad(ctx, [[-56, 212], [-40, 198], [0, 194], [40, 198], [56, 212], [40, 230], [0, 236], [-40, 230]], true); shape(ctx, rgba(COL_S, 0.55), lighten(COL_S, 0.35), 2);
  // oernier (mesonephros): vaag, verdwijnt in beide richtingen grotendeels
  const meso = 1 - 0.85 * Math.max(m, v);
  both(() => { ctx.beginPath(); ctx.ellipse(128, -98, 30, 104, 0.02, 0, 6.283); shape(ctx, rgba('#B9A6C9', 0.14 * meso), rgba('#B9A6C9', 0.3 * meso), 1.5);
    ctx.strokeStyle = rgba('#B9A6C9', 0.35 * meso); ctx.lineWidth = 2; // oerniertubuli
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 26; ctx.beginPath(); ctx.moveTo(131, yy); ctx.bezierCurveTo(118, yy - 6, 122, yy + 10, 108, yy + 6); ctx.stroke(); } });

  // gonaden
  both(() => {
    const p = Math.max(0.6, 1 + 0.7 * v); // amandel: puntiger uiteinden
    const omtrek = []; for (let k = 0; k < 40; k++) { const th = k / 40 * 6.283; const cx = Math.cos(th), sy = Math.sin(th);
      const lx = Math.sign(cx) * Math.pow(Math.abs(cx), p) * g.rx, ly = sy * g.ry; const c = Math.cos(g.rot), sn = Math.sin(g.rot); omtrek.push([g.cx + lx * c - ly * sn, g.cy + lx * sn + ly * c]); }
    if (hlGonade > 0.01) { ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.strokeStyle = rgba('#E8C2AE', 0.28 * hlGonade); ctx.lineWidth = 16; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(COL_G, 0.85), lighten(COL_G, 0.3), 2 + 1.5 * m);
    // testis: zaadstrengen (kronkelende strengen naar het rete aan de achter-bovenkant)
    if (m > 0.02) { ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip(); ctx.strokeStyle = rgba('#8E5A44', 0.55 * m); ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) { const th = 1.9 + k * 0.42; const A = opT(g, th, -4), B = opT(g, -0.9, -g.rx * 0.6); ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        ctx.bezierCurveTo(lerp(A[0], B[0], 0.3) + 6, lerp(A[1], B[1], 0.3) - 6, lerp(A[0], B[0], 0.7) - 6, lerp(A[1], B[1], 0.7) + 6, B[0], B[1]); ctx.stroke(); }
      ctx.restore(); }
    // eierstok: follikels (stipjes in de schors)
    if (v > 0.02) { for (let k = 0; k < 13; k++) { const th = hash(k * 7 + 1) * 6.283, rr = lerp(0.45, 0.78, hash(k * 7 + 2)); const q = [Math.cos(th) * g.rx * rr, Math.sin(th) * g.ry * rr];
        const c = Math.cos(g.rot), sn = Math.sin(g.rot); const fx = g.cx + q[0] * c - q[1] * sn, fy = g.cy + q[0] * sn + q[1] * c; const fr = 2.2 + 2.4 * hash(k * 7 + 3);
        ctx.beginPath(); ctx.arc(fx, fy, fr * v, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.8 * v), rgba('#E2B88E', 0.9 * v), 1); } }
  });

  // Wolff-buizen (achter de Müller-buizen)
  const wAl = 1 - 0.85 * v, wLw = 5 + 2.5 * m - 2.5 * v;
  both(() => {
    if (hlWolff > 0.01) lijn(wolff, '#BBAFE0', wLw + 14, 0.28 * hlWolff * wAl);
    rand(wolff, COL_W, wLw, wAl); buisVul(wolff, COL_W, wLw, wAl);
    if (m > 0.02) { // bijbal: band + kronkelende buis tegen de laterale kant van de testis
      const B = [], K = []; for (let i = 0; i <= 60; i++) { const th = lerp(-1.25, 0.95, i / 60); const p0 = opT(g, th, 8), p1 = opT(g, th, 9 + 5.5 * Math.sin(i * 1.9)); B.push(p0); K.push(p1); }
      ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = lighten(COL_W, 0.4); ctx.lineWidth = 17; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba(COL_W, 1); ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba('#5E4E8C', 0.9); ctx.lineWidth = 2; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // ductuli efferentes van testis naar bijbalkop
      ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { const th = -1.15 + k * 0.17; const A = opT(g, th, -6), Bq = opT(g, th, 4); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bq[0], Bq[1]); ctx.stroke(); }
      // zaadblaasje: knop uit de zaadleider vlak boven de sinus
      const q = bioPunt(bioDicht(wolff, 12), 0.88); ctx.translate(q[0], q[1]); ctx.rotate(q[2] + 2.2); const sz = m;
      ctx.beginPath(); bioPad(ctx, [[0, -4 * sz], [10 * sz, -7 * sz], [20 * sz, -4 * sz], [26 * sz, 0], [20 * sz, 5 * sz], [10 * sz, 7 * sz], [0, 4 * sz]], true); shape(ctx, rgba('#A797D4', 0.95), lighten(COL_W, 0.45), 1.5);
      ctx.restore(); }
  });

  // Müller-buizen (vóór de Wolff-buizen) + trechter/fimbriae + baarmoeder
  const mAl = 1 - 0.9 * m, mLw = 5 - 2.6 * m + 1.2 * v;
  ctx.save(); ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  both(() => {
    if (hlMuller > 0.01) lijn(muller, '#F0B8BA', mLw + 14, 0.28 * hlMuller * mAl);
    rand(muller, COL_M, mLw, mAl); buisVul(muller, COL_M, mLw, mAl);
  });
  ctx.restore();
  both((sd) => { // trechter met (bij de vrouw) fimbriae
    const p0 = muller[0], p1 = muller[1]; let ex = p0[0] - p1[0], ey = p0[1] - p1[1]; const d = Math.hypot(ex, ey); ex /= d; ey /= d;
    if (v > 0.02) { const an = Math.atan2(ey, ex) + 0.6; ex = lerp(ex, Math.cos(an), v); ey = lerp(ey, Math.sin(an), v); const dd = Math.hypot(ex, ey); ex /= dd; ey /= dd; } // trechter naar de eierstok
    const qx = -ey, qy = ex; const rw = 8 + 6 * v, bw = mLw / 2;
    ctx.save(); ctx.globalAlpha *= mAl;
    const bx = p0[0] - ex * 12, by = p0[1] - ey * 12, rx0 = p0[0] + ex * 4, ry0 = p0[1] + ey * 4;
    // fimbriae (vingers rond de rand, wiegen zacht)
    if (v > 0.02) { const nf = 9; for (let k = 0; k < nf; k++) { const f = k / (nf - 1) - 0.5; const sx = rx0 + qx * rw * f * 2, sy = ry0 + qy * rw * f * 2;
        const an = Math.atan2(ey, ex) + f * 2.4 + 0.12 * Math.sin(t * 1.3 + k * 0.9) * sd; const len = (11 + 7 * hash(k + 11)) * v;
        const mx = sx + Math.cos(an) * len * 0.55 + Math.cos(an + 1.57) * 2, my = sy + Math.sin(an) * len * 0.55 + Math.sin(an + 1.57) * 2;
        for (const [col, lw] of [[lighten(COL_M, 0.4), 5.4], [COL_M, 3.2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, sx + Math.cos(an) * len, sy + Math.sin(an) * len); ctx.stroke(); } } }
    ctx.beginPath(); ctx.moveTo(bx + qx * bw, by + qy * bw); ctx.quadraticCurveTo(p0[0] + qx * bw * 1.2, p0[1] + qy * bw * 1.2, rx0 + qx * rw, ry0 + qy * rw);
    ctx.lineTo(rx0 - qx * rw, ry0 - qy * rw); ctx.quadraticCurveTo(p0[0] - qx * bw * 1.2, p0[1] - qy * bw * 1.2, bx - qx * bw, by - qy * bw); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 1.5);
    ctx.beginPath(); ctx.ellipse(rx0, ry0, rw * 0.85, 3, Math.atan2(qy, qx), 0, 6.283); ctx.fillStyle = rgba('#5A2E36', 0.7); ctx.fill(); // opening naar de buikholte
    ctx.restore();
  });
  // versmolten middendeel: uterovaginaal kanaal → baarmoeder (peer) + bovenste vagina
  const UO = uterus.concat(uterus.slice(1).reverse().map(p => [-p[0], p[1]])).slice(0, -1);
  const full = uterus.slice().reverse().map(p => [-p[0], p[1]]).concat(uterus.slice(1));
  ctx.save(); ctx.globalAlpha *= mAl; ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  if (hlMuller > 0.01) { ctx.beginPath(); bioPad(ctx, full, false); ctx.strokeStyle = rgba('#F0B8BA', 0.28 * hlMuller); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, full, false); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 2);
  ctx.setLineDash([]);
  if (v > 0.02) { // baarmoederholte (driehoek) + baarmoederhalskanaal
    ctx.beginPath(); bioPad(ctx, [[0, lerp(150, 44, v)], [lerp(4, 30, v), lerp(152, 46, v)], [lerp(3, 10, v), lerp(160, 104, v)], [0, lerp(165, 130, v)], [lerp(-3, -10, v), lerp(160, 104, v)], [lerp(-4, -30, v), lerp(152, 46, v)]], true);
    ctx.fillStyle = rgba('#7A3A44', 0.55 * v); ctx.fill();
    ctx.strokeStyle = rgba('#7A3A44', 0.55 * v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, lerp(165, 128, v)); ctx.lineTo(0, 200); ctx.stroke(); }
  else { ctx.strokeStyle = rgba('#7A3A44', 0.45); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(0, 200); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// EILEIDER, lengtedoorsnede, horizontaal: links (x0) trechter met fimbriae open naar de eierstok, rechts (x1) de
// smalle isthmus naar de baarmoeder.
// Recept (Junqueira, Basic Histology h. 22; Sadler h. 2–3; Wheater's Functional Histology):
// - Lengte 10–12 cm: trechter (infundibulum) met fimbriae ± 1–2 cm (hier 0–9 %), ampulla ± 2/3 (hier tot ± 70 %),
//   isthmus ± 2–3 cm (laatste 30 %), dan het intramurale deel in de baarmoederwand (niet getekend).
// - Buitendiameter ampulla ± 1 cm, isthmus ± 2–4 mm (hier 0,42×); trechter loopt wijd uit (hier 1,3×).
// - Wand: slijmvlies (eenlagig cilinderepitheel met trilhaarcellen + secretoire 'peg'-cellen, losse lamina
//   propria), spierlaag (binnen circulair, buiten longitudinaal glad spierweefsel; in de ampulla dun, ± 13 % van de
//   straal; in de isthmus dik, ± 40 %), sereus vlies buiten.
// - Slijmvliesplooien: lange, sterk vertakte lengteplooien die een doolhof vormen; in de ampulla veel en hoog
//   (± 55 % van de binnenstraal), in de isthmus weinig en laag, het lumen daar nauw.
// - Trilharen slaan richting baarmoeder (effectieve slag snel, terugslag langzaam), metachrone golf; meeste
//   trilhaarcellen in trechter en ampulla. Bevruchting in de ampulla.
// - Ontsteking (salpingitis, vaak chlamydia): wand en plooien zwellen (oedeem), roder (hyperemie), ontstekingscellen.
//   Litteken: bindweefsel (collageen) vervangt het slijmvlies, plooien verkleven, lumen vernauwt tot bijna dicht →
//   zaadcellen komen er nog net door, het (grotere) embryo niet: buitenbaarmoederlijke zwangerschap/onvruchtbaarheid.
// Bekende fouten: eileider als glad buisje zonder plooien; trilharen die alle kanten op of richting eierstok slaan;
// trechter dicht; isthmus even wijd als de ampulla; litteken als losse bal in het lumen.
// Geeft lumen(u) → [x, y, halve vrije breedte] (tussen de plooitoppen; met litteken).
// =====================================================================================
function eileiderLangs(ctx, x0, x1, y, h, o = {}) {
  const { a = 1, t = 0, ontsteking = 0, litteken = 0, plek = 0.55, trilharen = 1 } = o;
  const L = x1 - x0, H = h / 2, k = H / 90; // k: schaal t.o.v. h = 180
  const X = (u) => x0 + u * L;
  const prof = (u) => {
    const s = ease((u - 0.6) / 0.18); const fl = Math.max(0, 1 - u / 0.09), flare = fl * fl;
    const b = clamp(ontsteking, 0, 1) * Math.exp(-Math.pow((u - 0.5) / 0.12, 2));
    const c = clamp(litteken, 0, 1) * Math.exp(-Math.pow((u - plek) / 0.028, 2));
    const Ho = H * (lerp(1, 0.42, s) + 0.3 * flare + 0.16 * b);
    const mt = Ho * lerp(0.13, 0.56, s) * lerp(1, 0.3, flare) * (1 + 0.25 * b);
    const Hm = Ho - mt; const mu = H * (0.07 + 0.06 * b) * lerp(1, 0.8, s); const He = Hm - mu;
    const fh = Math.min(He - 3 * k, He * lerp(0.64, 0.36, s) * lerp(1, 0.55, flare) * (1 + 0.35 * b)) * (1 - 0.8 * c);
    const Hsc = lerp(He, 1.4 * k, c); // binnenrand littekenweefsel
    return { s, b, c, flare, Ho, Hm, He, fh, Hsc, Hf: Math.min(He - fh, Hsc) };
  };
  const lumen = (u) => { const p = prof(clamp(u, 0, 1)); return [X(clamp(u, 0, 1)), y, p.Hf]; };
  if (a <= 0.01) return { lumen };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const N = 160, U = Array.from({ length: N + 1 }, (_, i) => i / N), PR = U.map(prof);
  const SP = BIO.spier, SPL = BIO.spierL, SL = BIO.slijm, RED = '#C2453E';
  const band = (sd, kA, kB) => { ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i][kA]; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); });
    for (let i = N; i >= 0; i--) ctx.lineTo(X(U[i]), y + sd * PR[i][kB]); ctx.closePath(); };
  // lumen (vocht) iets donkerder dan de achtergrond
  const i0 = Math.round(0.09 * N); // trechter open: geen vocht-vlak vóór de trechter
  ctx.beginPath(); for (let i = i0; i <= N; i++) { const yy = y - PR[i].He; i > i0 ? ctx.lineTo(X(U[i]), yy) : ctx.moveTo(X(U[i]), yy); } for (let i = N; i >= i0; i--) ctx.lineTo(X(U[i]), y + PR[i].He); ctx.closePath();
  ctx.fillStyle = rgba('#0D1420', 0.32); ctx.fill();
  for (const sd of [-1, 1]) {
    // spierlaag
    band(sd, 'Ho', 'Hm'); shape(ctx, rgba(SP, 0.62), rgba(SPL, 0.7), 1.5);
    ctx.save(); band(sd, 'Ho', 'Hm'); ctx.clip();
    ctx.strokeStyle = rgba(SPL, 0.5); ctx.lineWidth = 1.6 * k; // buiten longitudinaal: lange spoelvormige vezels
    for (let xx = x0 + 6; xx < x1; xx += 30 * k) { const u = (xx - x0) / L, p = prof(u); const yy = y + sd * lerp(p.Ho, p.Hm, 0.22); ctx.beginPath(); ctx.ellipse(xx + (hash(xx) - 0.5) * 8, yy, 13 * k, 1.8 * k, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = rgba(SPL, 0.45); // binnen circulair: dwars getroffen vezels (puntjes), meer rijen waar de laag dik is
    for (let xx = x0 + 4; xx < x1; xx += 9 * k) { const u = (xx - x0) / L, p = prof(u); const mt = p.Ho - p.Hm; const rows = Math.max(1, Math.floor(mt * 0.55 / (6 * k)));
      for (let r = 0; r < rows; r++) { const f = 0.5 + (r + 0.5) / rows * 0.42; ctx.beginPath(); ctx.ellipse(xx + (r % 2) * 4 * k, y + sd * lerp(p.Ho, p.Hm, f), 2.2 * k, 1.5 * k, 0, 0, 6.283); ctx.fill(); } }
    ctx.restore();
    // sereus vlies
    ctx.strokeStyle = rgba('#E8D8DE', 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * (PR[i].Ho + 1.5); i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke();
    // slijmvlies (basis)
    band(sd, 'Hm', 'He'); ctx.fillStyle = rgba(SL, 0.8); ctx.fill();
    // ontsteking: wand roder (vlakke stroken, geen verloop)
    if (ontsteking > 0.01) { ctx.save(); band(sd, 'Ho', 'He'); ctx.clip(); for (let xx = Math.floor(x0); xx < x1; xx += 3) { const p = prof((xx - x0) / L); if (p.b < 0.01) continue; ctx.fillStyle = rgba(RED, 0.42 * p.b); ctx.fillRect(xx, y - H * 2, 3, H * 4); } ctx.restore(); }
  }
  // plooien: veel, hoog en vertakt in de ampulla; weinig en laag in de isthmus
  const plooien = [];
  for (const sd of [-1, 1]) { let xx = X(0.03) + (sd > 0 ? 9 * k : 0), i = 0;
    while (xx < x1 - 6) { const u = (xx - x0) / L, p = prof(u); const hh = p.fh * (0.72 + 0.28 * hash(i * 13 + sd * 7));
      if (hh > 2) { const by = y + sd * (p.He + 2), ty = by - sd * hh; const lean = (hash(i * 5 + sd) - 0.5) * hh * 0.35;
        const trunk = [[xx, by], [xx + lean * 0.3, lerp(by, ty, 0.35)], [xx + lean * 0.7 + (hash(i + 3) - 0.5) * 4 * k, lerp(by, ty, 0.7)], [xx + lean, ty]];
        const tak = []; const nt = p.s < 0.5 ? (hash(i * 3 + 1) < 0.75 ? 1 + (hash(i * 3 + 2) < 0.5 ? 1 : 0) : 0) : (hash(i * 3 + 1) < 0.25 ? 1 : 0);
        for (let j = 0; j < nt; j++) { const f = 0.35 + 0.25 * j + 0.1 * hash(i * 9 + j); const r0 = [lerp(trunk[0][0], trunk[3][0], f), lerp(by, ty, f)]; const dir = (j % 2 ? 1 : -1) * (hash(i + j * 17) < 0.5 ? 1 : -1);
          const ln = hh * (0.32 + 0.15 * hash(i * 7 + j)); const an = 0.75; const e = [r0[0] + dir * Math.sin(an) * ln, r0[1] - sd * Math.cos(an) * ln];
          tak.push([r0, [lerp(r0[0], e[0], 0.5) + dir * 2, lerp(r0[1], e[1], 0.5) + sd * 2], e]); }
        plooien.push({ trunk, tak, w: lerp(9, 7, p.s) * k * (1 + 0.55 * p.b), col: _bioMix(SL, '#C8504A', p.b * 0.75), sd, u }); }
      xx += H * lerp(0.27, 0.85, p.s) * (0.8 + 0.4 * hash(i * 11 + sd * 3)); i++; } }
  const strokeP = (pts, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  plooien.forEach(pl => { const e = lighten(pl.col.replace(/rgb\((\d+),(\d+),(\d+)\)/, (q, r, g, b) => '#' + [r, g, b].map(n => (+n).toString(16).padStart(2, '0')).join('')), 0.35); strokeP(pl.trunk, pl.w + 2.4, e); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75 + 2.4, e)); });
  plooien.forEach(pl => { strokeP(pl.trunk.slice(0, 2), pl.w * 1.7 + 2.4, lighten('#D58A8A', 0.35)); });
  plooien.forEach(pl => { strokeP(pl.trunk, pl.w, pl.col); strokeP(pl.trunk.slice(0, 2), pl.w * 1.7, pl.col); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75, pl.col)); }); // plooi breder aan de voet
  plooien.forEach(pl => { const cc = rgba('#9E4A44', 0.45); strokeP(pl.trunk.slice(0, 3).concat([[lerp(pl.trunk[2][0], pl.trunk[3][0], 0.5), lerp(pl.trunk[2][1], pl.trunk[3][1], 0.5)]]), pl.w * 0.28, cc); pl.tak.forEach(tk => strokeP(tk.slice(0, 2), pl.w * 0.22, cc)); });
  // epitheelrand van de basis
  for (const sd of [-1, 1]) { ctx.strokeStyle = rgba('#F2C4BC', 0.75); ctx.lineWidth = 2; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i].He; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke(); }
  // fimbriae aan de trechterrand (vingers die zacht wiegen)
  const fim = [];
  for (const sd of [-1, 1]) { const p0 = prof(0); for (let j = 0; j < 6; j++) { const u0 = 0.004 + 0.012 * j; const pj = prof(u0); const bx = X(u0), by = y + sd * lerp(pj.He, pj.Hm, 0.4);
      const len = (38 + 22 * hash(j * 3 + (sd > 0 ? 50 : 0))) * k; const an0 = Math.PI - sd * (0.1 + 0.13 * j) * (j % 2 ? 1 : 0.7);
      const pts = []; for (let q = 0; q <= 6; q++) { const f = q / 6; const an = an0 + sd * 0.35 * f * f + 0.12 * Math.sin(t * 0.9 + j * 1.3 + f * 2) * f; const prev = q ? pts[q - 1] : [bx, by]; pts.push(q ? [prev[0] + Math.cos(an) * len / 6, prev[1] + Math.sin(an) * len / 6] : [bx, by]); }
      fim.push({ pts, w0: (11 - j * 0.6) * k, sd }); } }
  const fimPoly = (f) => { const l = [], r = []; f.pts.forEach((p, q) => { const nx = f.pts[Math.min(q + 1, 6)], pv = f.pts[Math.max(q - 1, 0)]; let dx = nx[0] - pv[0], dy = nx[1] - pv[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const w = f.w0 * lerp(1, 0.35, q / 6) / 2; l.push([p[0] - dy * w, p[1] + dx * w]); r.push([p[0] + dy * w, p[1] - dx * w]); }); return l.concat(r.reverse()); };
  fim.forEach(f => { ctx.beginPath(); bioPad(ctx, fimPoly(f), true); shape(ctx, rgba(SL, 0.92), lighten(SL, 0.35), 1.6); strokeP(f.pts.slice(0, 5), f.w0 * 0.22, rgba('#9E4A44', 0.4)); });
  // trilharen: effectieve slag snel richting baarmoeder (+x), terugslag langzaam; golf loopt naar rechts
  if (trilharen > 0.01) {
    const cl = 5.5 * Math.max(0.7, k); const beat = (xx) => { let ph = ((xx * 0.05 - t * 5.5) / 6.283) % 1; if (ph < 0) ph += 1; return ph < 0.3 ? lerp(-0.55, 0.75, ease(ph / 0.3)) : lerp(0.75, -0.55, ease((ph - 0.3) / 0.7)); };
    ctx.save(); ctx.globalAlpha *= clamp(trilharen, 0, 1); ctx.strokeStyle = rgba('#F6E8E2', 0.7); ctx.lineWidth = 1.1; ctx.beginPath();
    const tril = (rx, ry, nx, ny, axis) => { let tx = -ny, ty = nx; if (tx < 0 || (Math.abs(tx) < 0.2 && (axis - ry) * ty < 0)) { tx = -tx; ty = -ty; } const th = beat(rx);
      const dx = nx * Math.cos(th) + tx * Math.sin(th), dy = ny * Math.cos(th) + tx * 0 + ty * Math.sin(th);
      ctx.moveTo(rx, ry); ctx.quadraticCurveTo(rx + nx * cl * 0.6, ry + ny * cl * 0.6, rx + dx * cl, ry + dy * cl); };
    const langs = (pts, w, sd, stap) => { const D = bioDicht(pts, 6); let acc = 0; for (let q = 1; q < D.length; q++) { const dx = D[q][0] - D[q - 1][0], dy = D[q][1] - D[q - 1][1], d = Math.hypot(dx, dy); acc += d; if (acc < stap || d < 1e-6) continue; acc = 0;
        if (hash(Math.round(D[q][0] * 3 + D[q][1])) < 0.22) continue; // secretoire cel zonder trilharen
        for (const zz of [-1, 1]) { const nx = -dy / d * zz, ny = dx / d * zz; tril(D[q][0] + nx * (w / 2 + 1), D[q][1] + ny * (w / 2 + 1), nx, ny, y); } } };
    for (const sd of [-1, 1]) for (let xx = x0 + 3; xx < x1; xx += 5 * Math.max(0.8, k)) { const p = prof((xx - x0) / L); if (hash(Math.round(xx) * 7 + sd) < 0.25 + 0.15 * p.s) continue; tril(xx, y + sd * (p.He + 1), 0, -sd, y); }
    plooien.forEach(pl => { langs(pl.trunk, pl.w, pl.sd, 5.5 * k); pl.tak.forEach(tk => langs(tk, pl.w * 0.75, pl.sd, 6 * k)); });
    fim.forEach(f => langs(f.pts.slice(2), f.w0 * 0.55, f.sd, 9 * k));
    ctx.stroke(); ctx.restore();
  }
  // ontsteking: wijde vaatjes in het slijmvlies + ontstekingscellen in het lumen
  if (ontsteking > 0.01) { for (let j = 0; j < 14; j++) { const u = 0.36 + 0.28 * hash(j * 3 + 1), p = prof(u); if (p.b < 0.05) continue; const sd = j % 2 ? 1 : -1;
      ctx.strokeStyle = rgba(RED, 0.8 * p.b); ctx.lineWidth = 2.6 * k; ctx.beginPath(); const xx = X(u), yy = y + sd * lerp(p.He, p.Hm, 0.5); ctx.moveTo(xx - 14 * k, yy); ctx.bezierCurveTo(xx - 5 * k, yy - 4 * k, xx + 5 * k, yy + 4 * k, xx + 14 * k, yy); ctx.stroke(); }
    for (let j = 0; j < 9; j++) { const u = 0.4 + 0.2 * hash(j * 5 + 2), p = prof(u); if (p.b < 0.1) continue; const xx = X(u), yy = y + (hash(j * 5 + 3) - 0.5) * 1.4 * p.Hf; const r = 4.5 * k;
      ctx.save(); ctx.globalAlpha *= p.b; ctx.beginPath(); ctx.arc(xx, yy, r, 0, 6.283); shape(ctx, rgba('#E8ECF0', 0.85), '#FFFFFF', 1); ctx.fillStyle = rgba((C.purple || '#8C7BBF'), 0.85);
      for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(xx + Math.cos(q * 2.1 + j) * r * 0.4, yy + Math.sin(q * 2.1 + j) * r * 0.4, r * 0.3, 0, 6.283); ctx.fill(); } ctx.restore(); } }
  // litteken: bindweefsel vanuit de wand dat het lumen vernauwt
  if (litteken > 0.01) { const ua = clamp(plek - 0.08, 0, 1), ub = clamp(plek + 0.08, 0, 1); const M = 60;
    for (const sd of [-1, 1]) { const outer = [], inner = []; for (let i = 0; i <= M; i++) { const u = lerp(ua, ub, i / M), p = prof(u); outer.push([X(u), y + sd * (p.Hm - 1)]); inner.push([X(u), y + sd * lerp(p.Hm - 1, 1.4 * k, p.c)]); } // dikte → 0 aan de randen
      ctx.beginPath(); outer.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let i = M; i >= 0; i--) ctx.lineTo(inner[i][0], inner[i][1]); ctx.closePath();
      shape(ctx, rgba('#D9CFC2', 0.95), null); ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#A8988A', 0.55); ctx.lineWidth = 1.4; // collageenvezels
      for (let r = 1; r < 7; r++) { ctx.beginPath(); for (let i = 0; i <= M; i++) { const f = r / 7; const yy = lerp(outer[i][1], inner[i][1], f) + Math.sin(i * 0.9 + r * 2) * 1.5; i ? ctx.lineTo(outer[i][0], yy) : ctx.moveTo(outer[i][0], yy); } ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = rgba('#F2ECE4', 0.85); ctx.lineWidth = 1.6; ctx.beginPath(); inner.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); } }
  // snijvlak rechts (naar de baarmoeder)
  const pe = prof(1); ctx.strokeStyle = rgba('#E8D8DE', 0.5); ctx.lineWidth = 1.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x1, y + sd * pe.Ho); ctx.lineTo(x1, y + sd * pe.He); ctx.stroke(); }
  ctx.restore();
  return { lumen };
}

// =====================================================================================
// ZWANGERSCHAPSTEST (lateral-flow test), horizontaal: zuigstaafje links, plastic behuizing, ovaal uitleesvenster,
// duimgreep rechts. Recept: echte test ± 13–15 cm × 2 cm (hier 640 × 120 px, verhouding ± 5,3 : 1); zuiggedeelte
// ± 3–4 cm, iets smaller dan de behuizing; venster ± 1/4 van de lengte, in het midden; daarin een witte strook
// (nitrocellulose) met eerst de testlijn T (antistoffen tegen hCG) en daarna de controlelijn C (vangt de losse
// gekleurde antistof). Urine trekt door capillaire werking van links naar rechts: zuigstaaf → strook → zuigkussen
// achter het venster. Een roze/paarse waas (gekleurde antistof-goudkorrels) trekt over de strook; lijnen verschijnen
// pas als het vochtfront ze voorbij is. Lijnkleur roze-paars (colloïdaal goud). Bron: FDA 'Pregnancy tests';
// Koczula & Gallotta 2016 (Lateral flow assays). Bekende fouten: lijnen al zichtbaar vóór de urine er is;
// C-lijn vóór de T-lijn (C ligt verst van de urine); venster aan de duimkant.
// Ontwerpcoördinaten ± 640 × 120, oorsprong in het midden.
// =====================================================================================
function zwangerschapstest(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, urine = 0, T = 0, Cl = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const VX0 = -70, VX1 = 120, VH = 22, XT = 2, XC = 62, STR = 13;
  const ret = { tip: P(-320, 0), venster: [...P(VX0, -VH), ...P(VX1, VH)], T: P(XT, 0), C: P(XC, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const u = clamp(urine, 0, 1); // vochtfront: 0–0,35 zuigstaaf, 0,35–0,45 onder de behuizing, 0,45–1 door het venster
  const xf = u < 0.35 ? lerp(-326, -190, u / 0.35) : u < 0.45 ? lerp(-190, VX0, (u - 0.35) / 0.1) : lerp(VX0, VX1 + 30, (u - 0.45) / 0.55);
  const front = (yy) => xf + 3 * Math.sin(yy * 0.25 + t * 2.0) + 2 * Math.sin(yy * 0.6 - t * 1.3);
  const nat = (pathFn, y0, y1, col, al) => { if (u <= 0.001) return; ctx.save(); pathFn(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-340, y0); for (let yy = y0; yy <= y1; yy += 2) ctx.lineTo(front(yy), yy); ctx.lineTo(-340, y1); ctx.closePath(); ctx.fillStyle = rgba(col, al); ctx.fill(); ctx.restore(); };
  // zuigstaafje (steekt links uit)
  const wick = () => { ctx.beginPath(); roundRect(ctx, -320, -32, 130, 64, 14); };
  wick(); shape(ctx, '#E6E2EC', '#FFFFFF', 1.5);
  ctx.save(); wick(); ctx.clip(); ctx.strokeStyle = rgba('#B8B2C4', 0.45); ctx.lineWidth = 1.2; for (let k = 0; k < 7; k++) { const yy = -26 + k * 8.6; ctx.beginPath(); ctx.moveTo(-318, yy); ctx.bezierCurveTo(-280, yy + 2, -240, yy - 2, -190, yy + 1); ctx.stroke(); } ctx.restore();
  nat(wick, -34, 34, '#D8C25A', 0.38);
  // behuizing
  const HUIS = [[-212, -40], [-160, -50], [-60, -56], [120, -57], [250, -55], [300, -48], [318, -26], [320, 0], [318, 26], [300, 48], [250, 55], [120, 57], [-60, 56], [-160, 50], [-212, 40], [-222, 0]];
  ctx.beginPath(); bioPad(ctx, HUIS, true); shape(ctx, '#D9DFE7', '#F4F7FA', 2);
  ctx.beginPath(); bioPad(ctx, HUIS.map(([px, py]) => [px * 0.97 + 4, py * 0.8]), true); ctx.strokeStyle = rgba('#AEB8C6', 0.6); ctx.lineWidth = 1.5; ctx.stroke(); // naad
  // venster: verdiepte rand, witte strook, lijnen
  const venster = (r = 0) => { ctx.beginPath(); roundRect(ctx, VX0 - r, -VH - r, VX1 - VX0 + 2 * r, 2 * VH + 2 * r, VH + r); };
  venster(6); shape(ctx, '#C3CBD6', '#EEF2F6', 1.5);
  venster(); ctx.fillStyle = '#5E6878'; ctx.fill();
  const strook = () => { ctx.beginPath(); ctx.rect(VX0, -STR, VX1 - VX0, 2 * STR); };
  ctx.save(); venster(); ctx.clip(); strook(); ctx.fillStyle = '#F4F2EE'; ctx.fill();
  nat(strook, -STR, STR, '#C9C4BA', 0.35); // natte strook iets grijzer
  if (u > 0.001) { ctx.save(); strook(); ctx.clip(); const wb = 46; // roze waas vlak achter het front
    for (let yy = -STR; yy < STR; yy += 2) { const fx = front(yy); const fade = clamp((VX1 + 30 - xf) / 40, 0, 1); ctx.fillStyle = rgba('#D88AB4', 0.32 * fade); ctx.fillRect(fx - wb, yy, wb, 2); } ctx.restore(); }
  const lijn = (lx, k) => { const zicht = clamp((xf - lx - 4) / 22, 0, 1) * clamp(k, 0, 1); if (zicht <= 0.01) return; ctx.fillStyle = rgba('#B4407E', 0.92 * zicht); ctx.fillRect(lx - 3.5, -STR, 7, 2 * STR); };
  lijn(XT, T); lijn(XC, Cl);
  ctx.restore();
  venster(); ctx.strokeStyle = rgba('#3E4858', 0.7); ctx.lineWidth = 2; ctx.stroke();
  // duimgreep: ovale holte met ribbels
  ctx.beginPath(); ctx.ellipse(238, 0, 54, 34, 0, 0, 6.283); shape(ctx, '#CDD4DE', '#EEF2F6', 1.5);
  ctx.strokeStyle = rgba('#9EA9B8', 0.75); ctx.lineWidth = 2.4; for (let k = -3; k <= 3; k++) { const xx = 238 + k * 13; const hh = 30 * Math.sqrt(Math.max(0, 1 - Math.pow((xx - 238) / 54, 2))) - 5; ctx.beginPath(); ctx.moveTo(xx, -hh); ctx.quadraticCurveTo(xx + 3, 0, xx, hh); ctx.stroke(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: placenta in doorsnede, vlok vergroot
// =====================================================================================
// =====================================================================================
// obj_placenta.js — placenta (doorsnede) en één vlok vergroot, voor lib_bio.js (prompt v8, C9 Tekenrecepten)
// Vereist: lib_bio.js (BIO, bioDicht, bioPunt, bioPad) en de globale hulpjes C, rgba, lighten, hash, clamp, lerp,
// ease, shape, roundRect. Kleurtaal zuurstof: zuurstofrijk bloed rood (BIO.bloed), zuurstofarm FOETAAL bloed
// blauwpaars (PLAC.arm), zuurstofarm MOEDERLIJK bloed in de aders blauw (BIO.ader).
// =====================================================================================

var PLAC = {
  arm: '#7E5EA8',      // zuurstofarm foetaal bloed (navelstrengslagaders, chorionslagaders, begin haarvatlus)
  vlok: '#D7A596',     // vlokweefsel (bindweefselkern), lichtroze-beige
  syn: '#E8C27E',      // syncytiotrofoblast: goudgetinte buitenlaag
  synD: '#B8924E',
  chorion: '#CDB4BC',  // chorionplaat (bindweefsel)
  amnion: '#E9DDE4',
  streng: '#D8CDD6',   // navelstreng (gelei van Wharton)
  meer: '#C2453E',     // moederbloed in de intervilleuze ruimte (met lage dekking)
  lumen: '#3A1A22'
};
function _plMix(h1, h2, u) { // twee hex-kleuren mengen, vlakke kleur (geen verloop)
  const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(h1), B = p(h2); u = clamp(u, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], u))},${Math.round(lerp(A[1], B[1], u))},${Math.round(lerp(A[2], B[2], u))})`;
}
function _plCel(ctx, x, y, r, an, kant, col) { // rode bloedcel (ingedeukte schijf) met eigen kleur
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const ry = r * lerp(1, 0.34, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, col, lighten(col[0] === '#' ? col : '#C2453E', 0.25), Math.max(0.8, r * 0.09));
  ctx.beginPath(); ctx.ellipse(0, 0, r * (kant > 0.8 ? 0.3 : 0.45), ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#3A0E1E', 0.3); ctx.fill();
  ctx.restore();
}
function _plLijn(ctx, P, off, lw, col, g = 1) { // polylijn met zijwaartse verschuiving (off, in px) tot fractie g
  const n = Math.max(2, Math.ceil(P.length * clamp(g, 0, 1))); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; const an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const q = [P[i][0] - Math.sin(an) * off, P[i][1] + Math.cos(an) * off]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
  ctx.stroke();
}

// =====================================================================================
// PLACENTA, DOORSNEDE (stuk uit het midden, foetale kant boven, baarmoederwand onder).
// Recept (Sadler, Langman's Medical Embryology h. 8 'Placenta'; Junqueira h. 22; Benirschke 'Pathology of the
// Human Placenta'): voldragen placenta schijf van 15–25 cm doorsnede en 2–3 cm dik, 500–600 g. Lagen van boven
// naar onder: amnion (dun vlies) – chorionplaat (± 1 mm, met de chorionvaten) – intervilleuze ruimte met de
// vlokkenbomen (± 2 cm) – basale plaat / decidua basalis (± 1 mm) – spierlaag. Septa (placentasepta) steken
// vanuit de basale plaat omhoog maar bereiken de chorionplaat NIET; ze verdelen de placenta in 15–20 kwabben
// (cotyledonen). Per kwab één (of enkele) stamvlok uit de chorionplaat, die zich 3–4× vertakt (stamvlok ± 150 µm,
// intermediaire vlok ± 80 µm, eindvlokjes 40–80 µm, elk met een haarvatlus); enkele hechtvlokken lopen door tot
// in de basale plaat. De vlokkenboom vormt een klok met een vlokarm midden (centrale holte) recht boven de
// opening van een spiraalslagader. Ongeveer 80–100 spiraalslagaders (verbreed, trechtervormige monding) spuiten
// moederbloed omhoog tot tegen de chorionplaat; het zakt langs de vlokken terug en loopt via aderopeningen in de
// basale plaat (bij de septa) weg. Intervilleuze ruimte ± 150 ml, 2–3× per minuut ververst. Navelstreng: 2
// slagaders (zuurstofarm, van het kind naar de placenta) die spiraalsgewijs om 1 ader (zuurstofrijk, naar het
// kind) draaien, in gelei van Wharton; meestal iets uit het midden aangehecht. Moederbloed en kindbloed mengen
// niet: er ligt altijd vlokweefsel tussen.
// Hier: 5 kwabben van elk 260 breed in een stuk van 1300 × 560 (ontwerpcoördinaten, oorsprong = midden).
// Lagen verticaal ± 2,5× overdreven t.o.v. de breedte (anders is de vlokkenboom onleesbaar). Rode bloedcellen in
// het overzicht ± 2× te groot (r 3,5) zodat de stroom zichtbaar is; vlokdiktes onderling wel in verhouding.
// Bekende fouten: moederbloed dat in de vlokvaten stroomt (mengen); vlokken als losse vingers zonder boom;
// septa die tot de chorionplaat lopen; navelstrengslagaders rood getekend in een zuurstofverhaal (ze voeren
// zuurstofarm bloed); vlokken die nergens vastzitten (geen hechtvlokken); aders zonder afvoer; spiraalslagader
// als rechte buis zonder trechter.
// =====================================================================================
var _PL = { yAm: -188, yCh0: -184, yCh1: -150, yBas: 170, yMy: 232, yOnder: 280, kw: 260, nKw: 5 };
function _plBomen() {
  if (_bioPolyCache.placentaBomen) return _bioPolyCache.placentaBomen;
  const segs = [], toppen = [], stammen = [];
  const binnen = (x, y, cx) => [clamp(x, cx - 112, cx + 112), clamp(y, _PL.yCh1 + 14, _PL.yBas - 6)];
  const seg = (x0, y0, ang, len, w, d, sd, cx, extra = {}) => {
    const bend = (hash(sd * 3.1 + 7) - 0.5) * 0.5;
    let [x1, y1] = binnen(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len, cx);
    const mx = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * len * bend * 0.3, my = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * len * bend * 0.3;
    const P = []; for (let i = 0; i <= 10; i++) { const u = i / 10; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); }
    const s = Object.assign({ P, w, d, leaf: false, cx }, extra); segs.push(s); return s;
  };
  // zijtakken (intermediaire vlokken → eindvlokjes) aan een segment
  const takken = (s, sd, n, maxD) => {
    for (let k = 0; k < n; k++) { const f = 0.35 + 0.5 * (k + hash(sd + k * 5)) / n; const [px, py, an] = bioPunt(s.P, f);
      const kant = (k + Math.floor(hash(sd * 2 + 1) * 2)) % 2 ? 1 : -1; const ang = an + kant * (0.7 + 0.5 * hash(sd + k * 11));
      const d = s.d + 1; const len = (d === 2 ? 52 : 30) * (0.8 + 0.4 * hash(sd + k * 13)); const w = Math.max(7, s.w * 0.64);
      const c = seg(px, py, ang, len, w, d, sd * 7 + k, s.cx, { pw: s.w });
      if (d < maxD) takken(c, sd * 7 + k + 3, 2, maxD); else { c.leaf = true; const e = c.P[10]; toppen.push([e[0], e[1], w * 0.85]); } }
  };
  for (let k = 0; k < _PL.nKw; k++) {
    const cx = (k - (_PL.nKw - 1) / 2) * _PL.kw; const sx = cx + (hash(k * 9 + 1) - 0.5) * 30, sd = 100 + k * 37;
    // stamvlok uit de chorionplaat naar beneden, splitst in twee armen (klokvorm rond de centrale holte)
    const stam = seg(sx, _PL.yCh1 - 4, Math.PI / 2 + (hash(sd) - 0.5) * 0.15, 92, 24, 0, sd, cx); stammen.push([sx, cx]);
    takken(stam, sd + 1, 2, 3);
    for (const z of [-1, 1]) {
      const e = stam.P[10]; const arm = seg(e[0], e[1], Math.PI / 2 - z * 0.62, 118, 17, 1, sd + z * 5, cx, { pw: 10 });
      takken(arm, sd + z * 13, 3, 3);
      // hechtvlok: loopt door tot in de basale plaat (verankering)
      const a2 = arm.P[10]; const tx = cx + z * (88 + 14 * hash(sd + z)); const hecht = seg(a2[0], a2[1], Math.atan2(_PL.yBas + 8 - a2[1], tx - a2[0]), Math.hypot(_PL.yBas + 8 - a2[1], tx - a2[0]), 13, 2, sd + z * 17, cx, { anker: true, pw: 10 });
      hecht.P[10] = [tx, _PL.yBas + 8];
      takken(hecht, sd + z * 19, 2, 3);
    }
  }
  segs.sort((A, B) => A.d - B.d);
  return (_bioPolyCache.placentaBomen = { segs, toppen, stammen });
}

function placentaDoorsnede(ctx, x, y, w = 1300, h = 560, o = {}) {
  const { a = 1, t = 0, vlokken = 1, moederbloed = 1, navel = 1, focus = -1, kind = null, kleurO2 = true } = o;
  const S = w / 1300, Sy = h / 560, P = (lx, ly) => [x + lx * S, y + ly * Sy];
  const B = _plBomen(); const midTop = B.toppen.reduce((best, p) => (Math.hypot(p[0] - 40, p[1] + 10) < Math.hypot(best[0] - 40, best[1] + 10) ? p : best), B.toppen[0]);
  const NAV = [-70, _PL.yAm];
  const ret = { navel: P(NAV[0], NAV[1]), vlokTop: P(midTop[0], midTop[1]), moederbloed: P(-30, 60), slagader: P(0, _PL.yBas), wand: P(0, (_PL.yBas + _PL.yOnder) / 2),
    toppen: B.toppen.map(p => P(p[0], p[1])) };
  if (a <= 0.01) return ret;
  const ARM = kleurO2 ? PLAC.arm : BIO.bloed, RIJK = kleurO2 ? BIO.bloed : BIO.ader; // kleurO2 false = anatomisch (slagader rood, ader blauw), zoals castNavelstreng // navelstreng: slagaders ARM, ader RIJK
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -650, R = 650; const kws = Array.from({ length: _PL.nKw }, (_, k) => (k - (_PL.nKw - 1) / 2) * _PL.kw);

  // ---- 1. intervilleuze ruimte (leeg = donker) en moederbloed dat van onder vult --------------------
  ctx.fillStyle = rgba('#0F1724', 0.55); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
  const mb = clamp(moederbloed, 0, 1), peil = lerp(_PL.yBas, _PL.yCh1, ease(mb));
  ctx.save(); ctx.beginPath(); ctx.rect(L, peil, R - L, _PL.yBas - peil); ctx.clip();
  if (mb > 0.01) {
    ctx.fillStyle = rgba(PLAC.meer, 0.3); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
    // straal: vlakke, iets lichtere fontein boven elke slagadermonding (zelfde vorm als de stroombanen)
    kws.forEach(cx => { ctx.beginPath(); ctx.moveTo(cx - 12, _PL.yBas); ctx.bezierCurveTo(cx - 10, 40, cx - 30, -100, cx - 90, -138); ctx.lineTo(cx + 90, -138); ctx.bezierCurveTo(cx + 30, -100, cx + 10, 40, cx + 12, _PL.yBas); ctx.closePath(); ctx.fillStyle = rgba('#E07A6A', 0.16 * mb); ctx.fill(); });
    // stroom per kwab: straal omhoog uit de spiraalslagader, langs de chorionplaat opzij, langs de vlokken terug naar de aderopening
    kws.forEach((cx, k) => { for (const z of [-1, 1]) {
      const pad = bioDicht([[cx, _PL.yBas + 2], [cx + z * 4, 40], [cx + z * 12, -80], [cx + z * 55, -132], [cx + z * 112, -110], [cx + z * 120, 0], [cx + z * 116, 100], [cx + z * 108, _PL.yBas + 2]], 12);
      const n = Math.round(14 * mb); for (let i = 0; i < n; i++) { const sd = k * 97 + (z + 1) * 31 + i * 3.7;
        const u0 = ((t * 0.07 * (0.8 + 0.4 * hash(sd)) + hash(sd + 1)) % 1 + 1) % 1; const u = 1 - Math.pow(1 - u0, 1.8); // snel uit de monding, daarna trager
        const [px, py, an] = bioPunt(pad, u); const sp = (hash(sd + 2) - 0.5) * lerp(6, 46, Math.min(1, u * 3));
        _plCel(ctx, px - Math.sin(an) * sp, py + Math.cos(an) * sp, 3.5, an + t * (0.5 + hash(sd + 3)), 0.5 + 0.5 * Math.sin(t * 1.5 + i), BIO.bloed); } } });
    // rustig drijvende cellen in de meren
    for (let i = 0; i < Math.round(60 * mb); i++) { const bx = L + 10 + hash(i * 5.3 + 2) * (R - L - 20), by = _PL.yCh1 + 14 + hash(i * 5.3 + 3) * (_PL.yBas - _PL.yCh1 - 28);
      _plCel(ctx, bx + Math.sin(t * 0.4 + i) * 6, by + ((t * 4 * (0.5 + hash(i + 9))) % 20) - 10, 3.5, i + t * 0.3, 0.5 + 0.5 * Math.sin(t + i * 2), BIO.bloed); }
  }
  ctx.restore();

  // ---- 2. basale plaat (decidua basalis) met septa, en spierlaag ----------------------------------
  // spierlaag (context, halve detailmaat)
  ctx.fillStyle = rgba(BIO.spier, 0.5); ctx.fillRect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy);
  ctx.save(); ctx.beginPath(); ctx.rect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.4); ctx.lineWidth = 1.5;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) { ctx.beginPath(); ctx.ellipse(L + (c + (r % 2) * 0.5) * 62, _PL.yMy + 10 + r * 15, 26, 3, 0.05 * Math.sin(c * 3 + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // decidua basalis + septa (wiggen omhoog tot ± 2/3 van de hoogte, niet tot de chorionplaat)
  const basPad = () => { ctx.beginPath(); ctx.moveTo(L, _PL.yMy); ctx.lineTo(L, _PL.yBas);
    for (let k = 0; k < _PL.nKw - 1; k++) { const sx = (kws[k] + kws[k + 1]) / 2, top = -10 - 30 * hash(k * 3 + 5);
      ctx.lineTo(sx - 34, _PL.yBas); ctx.bezierCurveTo(sx - 16, _PL.yBas - 30, sx - 16, top + 30, sx - 9, top + 6); ctx.quadraticCurveTo(sx, top - 8, sx + 9, top + 6); ctx.bezierCurveTo(sx + 16, top + 30, sx + 16, _PL.yBas - 30, sx + 34, _PL.yBas); }
    ctx.lineTo(R, _PL.yBas); ctx.lineTo(R, _PL.yMy); ctx.closePath(); };
  basPad(); shape(ctx, _plMix('#1A2740', BIO.slijm, 0.72), null);
  // deciduacellen (grote bleke cellen), rustig
  ctx.save(); basPad(); ctx.clip(); ctx.strokeStyle = rgba('#F6E2D6', 0.22); ctx.lineWidth = 1.2;
  for (let i = 0; i < 70; i++) { const cx2 = L + hash(i * 3.3) * (R - L), cy2 = _PL.yBas + 6 + hash(i * 3.3 + 1) * (_PL.yMy - _PL.yBas - 10); ctx.beginPath(); ctx.ellipse(cx2, cy2, 9, 6, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // bovenrand basale plaat lichter
  ctx.save(); basPad(); ctx.clip(); basPad(); ctx.strokeStyle = rgba('#F6E2D6', 0.7); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();

  // moederlijke aders: twee openingen aan weerszijden van elk septum (en aan de randen), die onder het septum samenkomen
  // en schuin door de spierlaag weglopen (blauw, zuurstofarm moederbloed). Dunner dan de spiraalslagaders.
  const septX = [L - 0, ...kws.slice(0, -1).map((c, k) => (c + kws[k + 1]) / 2), R];
  septX.forEach((sx, k) => { const opn = [sx - 40, sx + 40].filter(ox => ox > L + 6 && ox < R - 6); const vx = clamp(sx, L + 14, R - 14), vy = _PL.yMy - 6;
    opn.forEach(ox => { ctx.beginPath(); bioPad(ctx, [[ox, _PL.yBas - 1], [lerp(ox, vx, 0.35), _PL.yBas + 26], [vx, vy]], false); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 7; ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(vx, vy); ctx.quadraticCurveTo(vx + 4, _PL.yMy + 24, vx + 14, _PL.yOnder + 4); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 12; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 9; ctx.stroke();
    opn.forEach(ox => { ctx.beginPath(); ctx.ellipse(ox, _PL.yBas, 7, 2.5, 0, 0, 6.283); ctx.fillStyle = rgba(PLAC.lumen, 0.9); ctx.fill(); }); });
  // spiraalslagaders: kronkelend omhoog door spierlaag en decidua, trechtervormige monding midden onder elke kwab
  kws.forEach((cx, k) => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(_PL.yOnder + 4, _PL.yBas + 4, u); pts.push([cx + Math.sin(u * 6.283 * 2.2 + k) * 11 * (1 - u * 0.8), yy]); }
    for (const [lw, col] of [[12, lighten(BIO.bloed, 0.3)], [9, BIO.bloed]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(cx - 6, _PL.yBas + 18); ctx.quadraticCurveTo(cx - 7, _PL.yBas + 4, cx - 15, _PL.yBas - 1); ctx.lineTo(cx + 15, _PL.yBas - 1); ctx.quadraticCurveTo(cx + 7, _PL.yBas + 4, cx + 6, _PL.yBas + 18); ctx.closePath();
    shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.3), 1.5);
    // bloed in de slagader stroomt omhoog (alleen als moederbloed aan staat)
    if (mb > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4 + k * 0.13) % 1); const [px, py] = bioPunt(pts, u); ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.fillStyle = rgba('#F2C0B4', 0.75 * mb); ctx.fill(); } });

  // ---- 3. vlokkenbomen (groeien uit de chorionplaat) ------------------------------------------------
  const vk = clamp(vlokken, 0, 1); const gD = d => clamp(vk * 4.2 - d, 0, 1);
  const zicht = B.segs.filter(s => gD(s.d) > 0.01);
  const deel = (s) => { const g = gD(s.d); const n = Math.max(2, Math.round(s.P.length * g)); const Q = s.P.slice(0, n); if (g < 1) { const [px, py] = bioPunt(s.P, g); Q[Q.length - 1] = [px, py]; } return Q; };
  const streep = (Q, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
  // rand (goudgetinte syncytiotrofoblast) en dan het weefsel
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w + 3.5, PLAC.syn); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85 + 1.75, 0, 6.283); ctx.fillStyle = PLAC.syn; ctx.fill(); }
    if (s.anker && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.moveTo(e[0] - 18, _PL.yBas + 2); ctx.quadraticCurveTo(e[0] - 6, e[1] - 16, e[0], e[1] - 22); ctx.quadraticCurveTo(e[0] + 6, e[1] - 16, e[0] + 18, _PL.yBas + 2); ctx.closePath(); shape(ctx, PLAC.vlok, PLAC.syn, 1.75); } });
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w, PLAC.vlok); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85, 0, 6.283); ctx.fillStyle = PLAC.vlok; ctx.fill(); } });
  // foetale vaten in de vlokken: slagader (zuurstofarm) en ader (zuurstofrijk) naast elkaar, eindvlokjes met een haarvatlus
  zicht.forEach(s => { let Q = deel(s); const lw = Math.max(1.4, s.w * 0.17); const pw = (s.pw || 0) * 0.5; if (pw) { const q0 = Q[0]; const k0 = Q.findIndex(p => Math.hypot(p[0] - q0[0], p[1] - q0[1]) >= pw); Q = k0 > 0 ? Q.slice(k0 - 1) : Q.slice(-2); } // vaten van een zijtak beginnen aan de rand van de moedertak
    if (Q.length < 2) return; _plLijn(ctx, Q, -s.w * 0.2, lw, ARM); _plLijn(ctx, Q, s.w * 0.2, lw, RIJK);
    if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1], q = Q[Q.length - 2]; const an = Math.atan2(e[1] - q[1], e[0] - q[0]); const rr = s.w * 0.42;
      ctx.lineWidth = lw; ctx.strokeStyle = ARM; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an + Math.PI / 2, an + Math.PI * 1.5, true); ctx.stroke();
      ctx.strokeStyle = RIJK; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an - Math.PI / 2, an + Math.PI / 2, false); ctx.stroke(); } });
  if (focus >= 0 && focus < B.toppen.length && vk > 0.95) { const [fx, fy, fr] = B.toppen[focus]; ctx.beginPath(); ctx.arc(fx, fy, fr + 7, 0, 6.283); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3 / S; ctx.stroke(); }

  // ---- 4. chorionplaat met amnion en chorionvaten ---------------------------------------------------
  ctx.fillStyle = PLAC.chorion; ctx.fillRect(L, _PL.yCh0, R - L, _PL.yCh1 - _PL.yCh0);
  ctx.strokeStyle = lighten(PLAC.chorion, 0.3); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(L, _PL.yCh1); ctx.lineTo(R, _PL.yCh1); ctx.stroke();
  ctx.fillStyle = PLAC.amnion; ctx.fillRect(L, _PL.yAm, R - L, 5);
  // chorionvaten: vanaf de navelstrengaanhechting naar links en rechts, dunner naar buiten, met een tak omlaag in elke stamvlok
  const vatW = dx => Math.max(2.5, 9 - Math.abs(dx) / 85);
  for (const [vy, col] of [[-176, ARM], [-160, RIJK]]) {
    for (const z of [-1, 1]) { const xEnd = z < 0 ? L : R; const n = 30;
      for (let i = 0; i < n; i++) { const xa = lerp(NAV[0], xEnd, i / n), xb = lerp(NAV[0], xEnd, (i + 1) / n); ctx.strokeStyle = col; ctx.lineWidth = vatW(xa - NAV[0]); ctx.beginPath(); ctx.moveTo(xa, vy + Math.sin(xa / 70) * 2); ctx.lineTo(xb, vy + Math.sin(xb / 70) * 2); ctx.stroke(); } }
    if (vk > 0.01) B.stammen.forEach(([sx]) => { ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, vatW(sx - NAV[0]) * 0.8); const off = col === ARM ? -5 : 5; ctx.beginPath(); ctx.moveTo(sx + off * 2.2, vy + Math.sin(sx / 70) * 2); ctx.quadraticCurveTo(sx + off, vy + 8, sx + off * 0.95, _PL.yCh1 + 2); ctx.stroke(); });
  }

  // ---- 5. navelstreng: van de aanhechting naar boven (kind buiten beeld) of naar o.kind --------------
  // Navelstreng ± 1,5–2 cm dik (hier 34 = op de schaal van de lagen), 2 slagaders draaien spiraalsgewijs om 1 ader.
  const nv = clamp(navel, 0, 1);
  if (nv > 0.01) { const eind = kind ? [(kind[0] - x) / S, (kind[1] - y) / Sy] : [NAV[0] - 120, -420]; const sw = 34;
    const ex = lerp(NAV[0], eind[0], nv), ey = lerp(NAV[1] - 20, eind[1], nv);
    ctx.save(); ctx.globalAlpha *= clamp(nv * 4, 0, 1);
    // aanhechting: verbreed voetje op het amnion
    ctx.beginPath(); ctx.moveTo(NAV[0] - 42, _PL.yAm + 1); ctx.bezierCurveTo(NAV[0] - 22, _PL.yAm - 2, NAV[0] - 17, _PL.yAm - 10, NAV[0] - 17, _PL.yAm - 26); ctx.lineTo(NAV[0] + 17, _PL.yAm - 26); ctx.bezierCurveTo(NAV[0] + 17, _PL.yAm - 10, NAV[0] + 22, _PL.yAm - 2, NAV[0] + 42, _PL.yAm + 1); ctx.closePath(); shape(ctx, PLAC.streng, null);
    if (!kleurO2) { castNavelstreng(ctx, NAV[0], NAV[1] - 20, ex, ey, t, 1, sw); }
    else { const d = Math.hypot(ex - NAV[0], ey - NAV[1] + 20) || 1, nx = -(ey - NAV[1] + 20) / d, ny = (ex - NAV[0]) / d; const N = 60;
      const pts = []; for (let i = 0; i <= N; i++) { const u = i / N, wv = Math.sin(u * 5 + t * 0.8) * 14 * Math.sin(u * Math.PI); pts.push([lerp(NAV[0], ex, u) + nx * wv, lerp(NAV[1] - 20, ey, u) + ny * wv]); }
      pts.unshift([NAV[0], NAV[1] - 2]);
      streep(pts, sw + 3, lighten(PLAC.streng, 0.35)); streep(pts, sw, PLAC.streng);
      const draai = d / 70; // ± één winding per 70 px
      const spiraal = (ph, voor) => { ctx.strokeStyle = ARM; ctx.lineWidth = sw * 0.2;
        for (let i = 1; i < pts.length - 1; i++) { const u = i / (pts.length - 1), u2 = (i + 1) / (pts.length - 1); const c1 = Math.cos(u * draai * 6.283 + ph); if ((c1 >= 0) !== voor) continue;
          const p = pts[i], q = pts[i + 1]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const o1 = Math.sin(u * draai * 6.283 + ph) * sw * 0.3, o2 = Math.sin(u2 * draai * 6.283 + ph) * sw * 0.3;
          ctx.beginPath(); ctx.moveTo(p[0] - Math.sin(an) * o1, p[1] + Math.cos(an) * o1); ctx.lineTo(q[0] - Math.sin(an) * o2, q[1] + Math.cos(an) * o2); ctx.stroke(); } };
      ctx.save(); ctx.globalAlpha *= 0.55; spiraal(0, false); spiraal(Math.PI, false); ctx.restore();
      _plLijn(ctx, pts, 0, sw * 0.3, RIJK);
      spiraal(0, true); spiraal(Math.PI, true); }
    ctx.restore();
  }
  ctx.restore(); return ret;
}

// =====================================================================================
// EÉN VLOK VERGROOT (eindvlokje, voldragen placenta), moederbloed links, vlok rechts met het oppervlak naar links.
// Recept (Junqueira h. 22; Sadler h. 8; Benirschke h. 7 'Terminal villi'): eindvlokje 40–80 µm dik. Van buiten
// naar binnen: microvilli (borstelzoom, ± 1 µm lang) – syncytiotrofoblast: één doorlopende laag zonder celgrenzen
// met veel kernen, 2–10 µm dik; boven een haarvat dunner (± 1–2 µm) en daar zonder kernen (vasculosyncytiale
// membraan), de kernen liggen in groepjes elders (syncytiële knopen) – enkele cytotrofoblastcellen (bij voldragen
// placenta schaars) – basaalmembraan – bindweefselkern (stroma) met fibroblasten – foetaal haarvat (sinusoïdaal
// verwijd, 10–30 µm) met dun endotheel (± 0,5 µm) dat tegen de trofoblast aandrukt. Totale barrière moederbloed →
// kindbloed aan het eind van de zwangerschap ± 2–4 µm (vroeg 20–30 µm). Rode bloedcel 7,5 µm.
// Hier: schaal ± 3 px/µm (rode bloedcel r 11 = 7,5 µm); barrière over het haarvat 9 + 3 + 3 = 15 px (± 5 µm,
// iets ruimer dan 2–4 µm zodat de lagen zichtbaar blijven), dus dunner dan één rode bloedcel. Haarvatlumen 44 px
// (± 15 µm). Foetaal bloed komt blauwpaars binnen (boven) en verlaat de lus rood (onder).
// Bekende fouten: dikke barrière (dikker dan een bloedcel); losse trofoblastcellen met celgrenzen aan de buitenkant
// (het syncytium is één laag); haarvat midden in de vlok in plaats van vlak onder het oppervlak; moeder- en
// kindbloed die elkaar raken; kernen in het dunne deel boven het haarvat.
// =====================================================================================
function vlokVergroot(ctx, x, y, w = 900, h = 520, o = {}) {
  const { a = 1, t = 0, laag = 0 } = o;
  const S = w / 900, Sy = h / 520;
  const X0 = -160, HV = 212, SYN_D = 9, SYN_K = 22, GAP = 3, ENDO = 3, LUM = 22;
  const opp = yy => X0 + 150 * Math.pow(Math.min(1, Math.abs(yy) / HV), 6);        // buitenoppervlak (ontwerpcoörd.)
  const dik = yy => lerp(SYN_D, SYN_K, clamp((Math.abs(yy) - 120) / 50, 0, 1));     // syncytium dun boven het haarvat
  const kapC = yy => opp(yy) + dik(yy) + GAP + ENDO + LUM;                          // haarvat-middellijn
  const ret = { barriereX: yy => x + (opp((yy - y) / Sy) + (SYN_D + GAP + ENDO) / 2) * S, moederX: x + (X0 - 170) * S, kindX: yy => x + kapC((yy - y) / Sy) * S,
    y0: y - 115 * Sy, y1: y + 115 * Sy };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -450, R = 450, T = -260, Bn = 260;
  ctx.save(); roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.clip();
  // moederbloed (vult alles buiten de vlok)
  ctx.fillStyle = _plMix('#1A2740', PLAC.meer, 0.34); ctx.fillRect(L, T, R - L, Bn - T);
  // vlokomtrek
  const omtrek = (inset) => { const pts = []; for (let i = 0; i <= 60; i++) { const yy = lerp(-HV + inset, HV - inset, i / 60); pts.push([opp(yy) + inset, yy]); } return pts; };
  const vlokPad = (inset) => { const O = omtrek(inset); ctx.beginPath(); ctx.moveTo(R + 10, -HV + inset); O.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(R + 10, HV - inset); ctx.closePath(); };
  // moederlijke rode bloedcellen: drijven langzaam langs het oppervlak omlaag (achter de microvilli, vóór de vlok niet)
  for (let i = 0; i < 26; i++) { const sp = 14 + 10 * hash(i * 3 + 1); const yy = ((hash(i * 3 + 2) * 620 + t * sp) % 620) - 310;
    let xx = L + 20 + hash(i * 3 + 3) * 300 + Math.sin(t * 0.5 + i) * 8; if (Math.abs(yy) < HV + 14) xx = Math.min(xx, opp(yy) - 26); else xx = L + 20 + hash(i * 3 + 3) * 840;
    _plCel(ctx, xx, yy, 11, i * 1.3 + t * 0.25 * (hash(i) - 0.5), 0.5 + 0.5 * Math.sin(t * 0.8 + i * 1.9), BIO.bloed); }
  // microvilli (borstelzoom, ± 1 µm) langs het hele oppervlak naar het moederbloed
  { const O = omtrek(0); const full = [[R + 10, -HV], ...O.slice().reverse().map(p => [p[0], -p[1]]).reverse(), [R + 10, HV]]; // linkerkant
    const top = []; for (let xx = R; xx > opp(-HV + 1); xx -= 7) top.push([xx, -HV, 0, -1]); const bot = []; for (let xx = opp(HV - 1); xx < R; xx += 7) bot.push([xx, HV, 0, 1]);
    const zij = []; const D = bioDicht(O, 6); let acc = 0; for (let i = 1; i < D.length; i++) { acc += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); if (acc < 4.5) continue; acc = 0; const dx = D[i][0] - D[i - 1][0], dy = D[i][1] - D[i - 1][1], nn = Math.hypot(dx, dy) || 1; zij.push([D[i][0], D[i][1], -dy / nn, dx / nn]); }
    ctx.strokeStyle = rgba(PLAC.syn, 0.85); ctx.lineWidth = 2; [...top, ...zij, ...bot].forEach((m, i) => { const lm = 6 + 2 * hash(i); ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.lineTo(m[0] + m[2] * lm, m[1] + m[3] * lm); ctx.stroke(); }); }
  // syncytiotrofoblast (goudgetint, doorlopend)
  vlokPad(0); shape(ctx, PLAC.syn, lighten(PLAC.syn, 0.35), 2);
  // bindweefselkern (stroma)
  const binnenPad = () => { ctx.beginPath(); ctx.moveTo(R + 10, -HV + SYN_K); for (let i = 0; i <= 80; i++) { const yy = lerp(-HV + SYN_K, HV - SYN_K, i / 80); ctx.lineTo(opp(yy) + dik(yy) + (Math.abs(yy) > HV - 40 ? (Math.abs(yy) - HV + 40) * 0.0 : 0), yy); } ctx.lineTo(R + 10, HV - SYN_K); ctx.closePath(); };
  binnenPad(); shape(ctx, _plMix('#1A2740', PLAC.vlok, 0.62), rgba('#F2E6DA', 0.5), 1.5); // lichte lijn = basaalmembraan
  // kernen van het syncytium: alleen in het dikke deel, in groepjes (syncytiële knopen)
  const kernen = [[-198, 4], [-184, 2], [-172, 3], [-150, 1], [150, 2], [168, 4], [190, 3], [-130, 1], [132, 1]];
  kernen.forEach(([yy0, n], g) => { for (let k = 0; k < n; k++) { const yy = yy0 + (k - (n - 1) / 2) * 11 * Math.sign(yy0); const xx = opp(yy) + dik(yy) * 0.5;
    ctx.beginPath(); ctx.ellipse(xx, yy, 6.5, 4, Math.atan2(1, (opp(yy + 1) - opp(yy - 1)) / 2) , 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); } });
  // twee cytotrofoblastcellen onder het syncytium (schaars bij voldragen placenta)
  for (const yy of [-150, 148]) { const xx = opp(yy) + dik(yy) + 9; ctx.beginPath(); ctx.ellipse(xx, yy, 9, 14, 0.15 * Math.sign(yy), 0, 6.283); shape(ctx, _plMix('#1A2740', PLAC.syn, 0.6), rgba(PLAC.syn, 0.8), 1.2);
    ctx.beginPath(); ctx.arc(xx + 1, yy, 4.5, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // fibroblasten in de kern (langgerekte kernen), rustig
  ctx.save(); binnenPad(); ctx.clip();
  [[110, -60, 0.4], [250, 20, -0.3], [330, -120, 0.2], [180, 100, -0.5], [390, 90, 0.6], [60, -10, 1.2], [300, 190, 0.1], [240, -190, -0.2]].forEach(([fx, fy, fa]) => {
    ctx.beginPath(); ctx.ellipse(fx, fy, 16, 4.5, fa, 0, 6.283); shape(ctx, rgba((C.nucFill || '#6E5A9E'), 0.75), rgba((C.nucEdge || '#A392D6'), 0.6), 1);
    ctx.strokeStyle = rgba('#F2E6DA', 0.25); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx - Math.cos(fa) * 34, fy - Math.sin(fa) * 34); ctx.lineTo(fx + Math.cos(fa) * 34, fy + Math.sin(fa) * 34); ctx.stroke(); });
  // foetale haarvatlus: binnen rechtsboven, langs het oppervlak omlaag, rechtsonder weer weg
  const rv = [[R + 20, -148], [120, -150], [-40, -152], [kapC(-110) + 22, -128]]; for (let yy = -100; yy <= 100; yy += 25) rv.push([kapC(yy), yy]); rv.push([kapC(110) + 22, 128], [-40, 152], [120, 150], [R + 20, 148]);
  const K = bioDicht(rv, 14);
  const pad = () => { ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  pad(); ctx.strokeStyle = rgba('#F2D8D0', 0.9); ctx.lineWidth = 2 * (LUM + ENDO); ctx.stroke();      // endotheel (dunne wand)
  pad(); ctx.strokeStyle = PLAC.lumen; ctx.lineWidth = 2 * LUM; ctx.stroke();                         // lumen
  // lumen getint naar zuurstofgehalte: blauwpaars binnen, rood bij het verlaten (vlakke stukken, kleurwissel halverwege de barrière)
  const kN = K.length - 1, stuk = (u0, u1, col) => { ctx.beginPath(); for (let i = Math.round(u0 * kN); i <= Math.round(u1 * kN); i++) i === Math.round(u0 * kN) ? ctx.moveTo(K[i][0], K[i][1]) : ctx.lineTo(K[i][0], K[i][1]); ctx.strokeStyle = col; ctx.lineWidth = 2 * LUM; ctx.lineCap = 'butt'; ctx.stroke(); ctx.lineCap = 'round'; };
  stuk(0, 0.42, _plMix(PLAC.lumen, PLAC.arm, 0.4)); stuk(0.42, 0.58, _plMix(PLAC.lumen, '#A0517A', 0.4)); stuk(0.58, 1, _plMix(PLAC.lumen, BIO.bloed, 0.4));
  // endotheelkernen (afgeplat) in het diepe deel
  for (const [u, sd] of [[0.12, 1], [0.88, -1]]) { const [ex, ey, an] = bioPunt(K, u); ctx.beginPath(); ctx.ellipse(ex - Math.sin(an) * (LUM + 1) * sd, ey + Math.cos(an) * (LUM + 1) * sd, 9, 3, an, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // foetale rode bloedcellen in de lus, kleur paars → rood terwijl ze langs de barrière gaan
  for (let i = 0; i < 16; i++) { const u = ((t * 0.045 * (0.85 + 0.3 * hash(i + 40)) + i / 16) % 1 + 1) % 1; const [px, py, an] = bioPunt(K, u); const off = (hash(i + 41) - 0.5) * LUM * 0.7;
    const m = clamp((u - 0.32) / 0.4, 0, 1); _plCel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, 11, an + Math.PI / 2 + 0.5 * Math.sin(t + i), 0.55 + 0.4 * Math.sin(t * 0.9 + i), _plMix(PLAC.arm, BIO.bloed, m)); }
  ctx.restore();
  // dunne barrière markeren (goud): van het oppervlak tot het haarvatlumen, over het rechte stuk
  if (laag > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(laag, 0, 1); const ys = [], n = 50; for (let i = 0; i <= n; i++) ys.push(lerp(-118, 118, i / n));
    ctx.beginPath(); ys.forEach((yy, i) => i ? ctx.lineTo(opp(yy) - 2, yy) : ctx.moveTo(opp(yy) - 2, yy)); for (let i = n; i >= 0; i--) ctx.lineTo(kapC(ys[i]) - LUM + 1, ys[i]); ctx.closePath();
    ctx.fillStyle = rgba(C.goldL || '#F0D58A', 0.75); ctx.fill(); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke();
    for (const yy of [-118, 118]) { ctx.beginPath(); ctx.moveTo(opp(yy) - 14, yy); ctx.lineTo(kapC(yy) - LUM + 12, yy); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: hersenen vooraanzicht, vrouwelijke organen (ook zwanger), geel lichaam
// =====================================================================================
// =====================================================================================
// obj_vrouw_brein.js — nieuwe objecten voor lib_bio.js (22 okt 2026): hersenen vooraanzicht + kijkje in het hoofd,
// vrouwelijke geslachtsorganen vooraanzicht (ook zwanger) + kijkje in de buik, geel lichaam (corpus luteum).
// Zelfde regels als lib_bio.js: vlakke vullingen met iets lichtere rand, geen tekst, deterministisch (hash),
// animatie via t, ankerpunten terug in schermcoördinaten.
// =====================================================================================

function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbTab(tab, u) { if (u <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) { const [u0, v0] = tab[i - 1], [u1, v1] = tab[i]; return lerp(v0, v1, (u - u0) / (u1 - u0)); } return tab[tab.length - 1][1]; }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function _vbVenster(ctx, x, y, rx, ry, a = 0.72) { // zacht donker venster: gestapelde vlakke ellipsen (geen verloop)
  const n = 7; for (let i = 0; i < n; i++) { const f = 1 + (n - 1 - i) * 0.035; ctx.beginPath(); ctx.ellipse(x, y, rx * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a / n * 1.6); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a * 0.55); ctx.fill();
}

// =====================================================================================
// HERSENEN VOORAANZICHT (zoals ze in een hoofd van voren liggen; 'röntgenblik' op de middellijn).
// Recept (1 cm ≈ 8,6 px bij s = 1): breedte ± 14 cm → 120 px; kruin tot hypothalamus ± 8 cm → 68 px;
// hypothalamus → hypofyse ± 1,2 cm (steeltje); hypofyse ± 1,2 × 0,8 cm (erwt, iets vergroot getekend: 12 × 9 px);
// twee hersenhelften met diepe lengtegroeve (fissura longitudinalis) tot de hersenbalk; voorhoofdskwabben rusten
// op de oogkasdaken (onderrand ± 0,7 cm boven de hypothalamus); slaapkwabben hangen lager aan de zijkant (onderrand
// ± 2 cm onder de hypothalamus, in de middelste schedelgroeve), gescheiden door de Sylvius-groeve; hypothalamus
// tussen de slaapkwabben, onder/achter de voorhoofdskwabben; hersenstam (brug ± 2,5 cm breed, verlengde merg
// ± 1,5 cm) loopt in het midden omlaag; kleine hersenen gluren naast het verlengde merg onder de slaapkwabben.
// Bron: Gray's Anatomy fig. 'brain, anterior view' / coronaal; Sobotta deel 3. Bekende fouten: hypofyse los onder
// het hele brein of in de keel; slaapkwabben even hoog als de voorhoofdskwabben; brein als twee ovalen zonder
// hersenstam. Ontwerpcoördinaten: oorsprong = hypothalamus; o.rek rekt verticaal (stripfiguren hebben een hoger hoofd).
// =====================================================================================
function breinVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, rek = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s * rek];
  const uit = { hth: P(0, 0), hyp: P(0, 12) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * rek); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s; // lijndikte in schermpixels
  // kleine hersenen (achter, naast het verlengde merg)
  for (const d of [-1, 1]) { ctx.beginPath(); bioPad(ctx, [[d * 8, 22], [d * 22, 16], [d * 44, 22], [d * 48, 32], [d * 36, 41], [d * 16, 40], [d * 7, 32]], true); shape(ctx, _vbMix(BIO.brein, '#1A2740', 0.35), _vbMix(BIO.breinS, '#1A2740', 0.2), L(1.3));
    ctx.strokeStyle = rgba(BIO.breinD, 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(d * 12, 25 + k * 5); ctx.quadraticCurveTo(d * 30, 22 + k * 6, d * 44, 27 + k * 4); ctx.stroke(); } }
  // hersenstam: middenhersenen → brug (breder) → verlengde merg → ruggenmerg
  const STAM = [[-8, -2], [-11, 6], [-12, 14], [-10, 22], [-7, 30], [-6, 40], [-5, 52], [5, 52], [6, 40], [7, 30], [10, 22], [12, 14], [11, 6], [8, -2]];
  ctx.beginPath(); bioPad(ctx, STAM, true); shape(ctx, _vbMix(BIO.breinS, '#1A2740', 0.1), BIO.breinS, L(1.3));
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = L(1); ctx.beginPath(); ctx.moveTo(-10, 21); ctx.quadraticCurveTo(0, 24, 10, 21); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 23); ctx.lineTo(0, 50); ctx.stroke();
  // grote hersenen: rechter helft (x > 0) ontworpen, links gespiegeld
  const HELFT = [[1.5, -67], [18, -68], [36, -62], [50, -50], [58, -33], [60, -14], [58, 2], [52, 13], [43, 19], [34, 17], [29, 9], [30, 1], [37, -5], [28, -8], [15, -8], [5, -7], [1.5, -10]];
  const GROEVEN = [[[8, -60], [20, -55], [16, -46], [28, -40]], [[34, -58], [40, -48], [50, -44]], [[10, -36], [22, -30], [18, -20], [30, -16]], [[38, -34], [48, -26], [44, -16], [54, -10]],
    [[6, -20], [12, -14], [22, -12]], [[40, 4], [48, 8], [50, -2]], [[33, -2], [44, -8], [56, -6]]]; // laatste = Sylvius-groeve
  for (const d of [-1, 1]) {
    const pts = HELFT.map(([px, py]) => [d * px, py]);
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, BIO.brein, lighten(BIO.brein, 0.22), L(1.6));
    ctx.save(); ctx.beginPath(); bioPad(ctx, pts, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = L(1.4);
    GROEVEN.forEach((g, i) => { ctx.lineWidth = L(i === GROEVEN.length - 1 ? 2 : 1.4); ctx.beginPath(); bioPad(ctx, g.map(([px, py]) => [d * px, py]), false); ctx.stroke(); });
    ctx.restore();
  }
  // lengtegroeve tussen de helften
  ctx.strokeStyle = rgba(BIO.breinD, 0.9); ctx.lineWidth = L(1.6); ctx.beginPath(); ctx.moveTo(0, -66); ctx.lineTo(0, -10); ctx.stroke();
  // hypothalamus (middellijn, tussen de slaapkwabben) + steeltje + hypofyse
  _vbGloed(ctx, 0, 0, 22, BIO.klier, hth);
  ctx.beginPath(); bioPad(ctx, [[-7, -3], [0, -5], [7, -3], [6, 3], [0, 5], [-6, 3]], true); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.25 + 0.75 * hth), lighten(hth > 0.3 ? BIO.klier : BIO.breinS, 0.25), L(1.2));
  ctx.strokeStyle = _vbMix(BIO.breinS, BIO.klier, 0.3 + 0.7 * Math.max(hth, hyp)); ctx.lineWidth = Math.max(2.2, 3 * s) / s; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0.5, 8); ctx.stroke();
  _vbGloed(ctx, 0, 12, 18, BIO.klier, hyp);
  ctx.beginPath(); ctx.ellipse(0, 12, 6, 4.5, 0, 0, 6.283); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.35 + 0.65 * hyp), lighten(BIO.klier, 0.2), L(1.2));
  ctx.restore();
  return uit;
}

// KIJKJE IN HET HOOFD van een castpersonage (vooraanzicht). hoofd = { x, y, r } uit persoon(...).hoofd.
// Plaatsing: hypofyse op ooghoogte (achter de neuswortel), kruin net onder de schedeldak/haarlijn (± 0,65 hh boven
// de ogen), brein ± 0,8 hh breed (net binnen het gezicht). Stripkoppen zijn smaller dan echt: rek = 1,18 (verticaal).
function hoofdKijkje(ctx, hoofd, o = {}) {
  const { a = 1 } = o; const hh = hoofd.r / 0.55; const s = 0.8 * hh / 120, rek = 1.18;
  const eyeY = hoofd.y + hh * 0.02; const hy = eyeY - 12 * s * rek;
  if (a <= 0.01) return { hth: [hoofd.x, hy], hyp: [hoofd.x, eyeY] };
  ctx.save(); ctx.globalAlpha *= a;
  _vbVenster(ctx, hoofd.x, hoofd.y - hh * 0.24, hh * 0.5, hh * 0.52, 0.8);
  const r = breinVoor(ctx, hoofd.x, hy, s, Object.assign({}, o, { a: 1, rek }));
  ctx.restore(); return r;
}

// =====================================================================================
// BAARMOEDER MET EILEIDERS EN EIERSTOKKEN, vooraanzicht (frontale doorsnede van de baarmoeder).
// Recept (1 cm ≈ 21 px bij s = 1): niet zwanger peervormig, ± 7,5 cm lang (± 160 px incl. baarmoederhals) en
// ± 5 cm breed (110 px); hals ± 3 cm lang, 2,5 cm breed met nauw kanaal; wand (spier) ± 1,5 cm dik; holte in
// vooraanzicht een driehoekige spleet met slijmvlies; eierstokken amandelvormig ± 3 × 1,5 cm, ± 2 cm naast de
// baarmoeder, met eierstokband aan de baarmoeder net onder de eileider; eileiders ± 10 cm, vanuit de bovenhoeken
// eerst smal (isthmus), dan wijder (ampulla), boog over de eierstok, trechter met franjes (fimbriae) over de
// buitenpool van de eierstok. Zwanger (z = maand/9): lengte 12 cm (3 mnd, net boven het schaambeen), 22 cm
// (5 mnd, fundus bij de navel), 35 cm (9 mnd, tot de ribben); breedte tot ± 25 cm; wand dunner (± 0,5–1 cm);
// eierstokken en eileiders schuiven mee omhoog en naar opzij. Vrucht (CRL): 6 wk 0,4 cm, 12 wk 5,4, 20 wk 16,
// 28 wk 25, 40 wk 36 cm; vruchtwater in de holte; moederkoek bovenaan in de wand.
// Bron: Gray's Anatomy (female pelvis); Sobotta deel 2; Williams Obstetrics (fundushoogte). Bekende fouten:
// eileiders recht als armpjes; eierstokken aan de eileiders vast; baarmoeder hoog in de buik als niet zwanger;
// zwangere baarmoeder als ballon zonder hals; kind dat zweeft zonder navelstreng.
// Oorsprong (x, y) = uitwendige baarmoedermond (onderkant hals): de baarmoeder groeit vanuit het bekken omhoog.
// =====================================================================================
var _VB_LEN = [[0, 7.5], [0.15, 8.5], [0.33, 12], [0.55, 22], [0.8, 30], [1, 35]];
var _VB_BR = [[0, 5], [0.15, 5.8], [0.33, 9.5], [0.55, 15], [0.8, 21], [1, 25]];
var _VB_CRL = [[0, 0], [0.13, 0], [0.15, 0.4], [0.2, 1.6], [0.3, 5.4], [0.4, 11.6], [0.5, 16], [0.6, 21], [0.7, 25], [0.8, 29], [0.9, 32], [1, 36]];
function _vbBaarmoederVorm(z, bk = 1) { // geeft buiten- en binnencontour (ontwerpeenheden, oorsprong = baarmoedermond)
  const cm = 21, Lc = 3 * cm, Wc = 2.5 * cm; const Lt = _vbTab(_VB_LEN, z) * cm, W = _vbTab(_VB_BR, z) * cm * bk;
  const yb0 = -Lc + 6, yT = -Lt, yc = (yb0 + yT) / 2, ry = (yb0 - yT) / 2, rx = W / 2; const kz = clamp(z / 0.6, 0, 1);
  const wand = lerp(1.5 * cm, 0.75 * cm, clamp(z / 0.5, 0, 1));
  const taper = (u) => lerp(lerp(0.5, 0.93, kz), 1, Math.sin(Math.min(1, u * 1.35) * 1.5708)); // peer → ei
  const rand = (rxx, ryy, ycc, minX) => { const R = [], N = 26; for (let i = 0; i <= N; i++) { const f = i / N * Math.PI; const u = (1 - Math.cos(f)) / 2;
      let px = Math.sin(f) * rxx * taper(u); if (minX && u < 0.5) px = Math.max(px, minX * (1 - u * 0.4)); R.push([px, ycc + Math.cos(f) * ryy]); } return R; };
  const rechts = rand(rx, ry, yc, Wc / 2 + 4); const buiten = [[Wc * 0.38, 0], [Wc * 0.5, -Lc * 0.5], ...rechts.slice(1), ...rechts.slice(1, -1).reverse().map(([px, py]) => [-px, py]), [-Wc * 0.5, -Lc * 0.5], [-Wc * 0.38, 0]];
  // binnen: holte (ovaal bij zwangerschap, driehoekige spleet als niet zwanger)
  const rxi = Math.max(4, rx - wand), ryi = Math.max(4, ry - wand), yci = yc - wand * 0.15; const ovaal = [];
  const N = 40; for (let i = 0; i < N; i++) { const f = i / N * 6.283; const u = (1 - Math.cos(f)) / 2; ovaal.push([Math.sin(f) * rxi * taper(u), yci + Math.cos(f) * ryi]); }
  const tri = []; const cx0 = rx * 0.7, cyT = yT + wand * 0.9, apY = yb0 - 4; // hoeken: links-boven, rechts-boven, punt onder
  for (let i = 0; i < N; i++) { const f = i / N; let px, py; // zelfde volgorde als ovaal: start onder, rechtsom via rechts omhoog
    if (f < 0.4) { const u = f / 0.4; px = lerp(0, cx0, u) - Math.sin(u * Math.PI) * 4; py = lerp(apY, cyT, u); }
    else if (f < 0.6) { const u = (f - 0.4) / 0.2; px = lerp(cx0, -cx0, u); py = cyT + Math.sin(u * Math.PI) * 6; }
    else { const u = (f - 0.6) / 0.4; px = lerp(-cx0, 0, u) + Math.sin(u * Math.PI) * 4; py = lerp(cyT, apY, u); } tri.push([px, py]); }
  const kh = clamp((z - 0.08) / 0.1, 0, 1); const holte = tri.map((p, i) => [lerp(p[0] * 0.5 + p[0] * 0.5 * (1 - kh), ovaal[i][0], kh), lerp(p[1], ovaal[i][1], kh)]);
  const hoek = rand(rx, ry, yc, 0)[19]; // bovenhoek (u ≈ 0,8): oorsprong eileider
  return { buiten, holte, rx, ry, yc, yT, Lc, Wc, rxi, ryi, yci, wand, hoek, cm, kh, maxX: Math.max(...rechts.map(p => p[0])) };
}
function vrouwOrganenVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, zwanger = 0, foetus = 0, hlEierstok = 0, hlBaarmoeder = 0, placenta = true, breed = 1 } = o;
  const z = clamp(zwanger, 0, 1); const V = _vbBaarmoederVorm(z, breed); const S = (px, py) => [x + px * s, y + py * s];
  // eierstok-plaats: naast de baarmoeder, schuift mee omhoog en naar buiten
  const H = V.hoek; const ox = Math.max(H[0] + lerp(95, 60, z), V.maxX + 48), oy = H[1] + lerp(48, 80, z);
  const fs0 = _vbTab(_VB_CRL, z) * V.cm / 286; const fs = Math.min(fs0, V.ryi * 2 * 0.86 / 300, V.rxi * 2 * 0.86 / 145);
  const frot = Math.PI + lerp(0.5, 0.08, clamp((z - 0.3) / 0.4, 0, 1)); const fx = -(5 * Math.cos(frot) + 10 * Math.sin(frot)) * fs, fy = V.yci - (5 * Math.sin(frot) - 10 * Math.cos(frot)) * fs;
  const uit = { baarmoeder: { x: x, y: y + V.yc * s, rx: V.rx * s, ry: V.ry * s }, eierstokL: S(-ox, oy), eierstokR: S(ox, oy), cervix: S(0, 0), foetus: S(fx, fy) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s;
  const SPIER = '#C98088', SPIERL = '#E3A6AC', SLIJM = '#E7AAB0', EI = '#E3BBA2', EIL = '#F2D6C4';
  // schede (bovenste stuk), achter de hals
  ctx.beginPath(); bioPad(ctx, [[-26, -14], [-30, 30], [-27, 70], [27, 70], [30, 30], [26, -14]], false); ctx.fillStyle = rgba(SPIER, 0.45); ctx.fill();
  ctx.strokeStyle = rgba(SPIERL, 0.5); ctx.lineWidth = L(1.2); ctx.beginPath(); ctx.moveTo(-28, 20); ctx.lineTo(-27, 70); ctx.moveTo(28, 20); ctx.lineTo(27, 70); ctx.stroke();
  ctx.fillStyle = rgba('#5A2A36', 0.5); ctx.beginPath(); ctx.ellipse(0, 40, 9, 30, 0, 0, 6.283); ctx.fill();
  // eierstokken + eierstokbanden + eileiders (beide kanten)
  for (const d of [-1, 1]) {
    const cx0 = d * H[0], cy0 = H[1];
    ctx.strokeStyle = rgba(SPIERL, 0.7); ctx.lineWidth = L(3); ctx.beginPath(); ctx.moveTo(d * (H[0] - 6), H[1] + 14); ctx.quadraticCurveTo(d * (H[0] + ox) / 2, oy - 6, d * (ox - 28), oy); ctx.stroke(); // eierstokband
    _vbGloed(ctx, d * ox, oy, 70, BIO.klier, hlEierstok);
    ctx.save(); ctx.translate(d * ox, oy); ctx.rotate(d * lerp(0.35, 0.9, z));
    ctx.beginPath(); bioPad(ctx, [[-32, 0], [-22, -14], [4, -17], [28, -10], [33, 2], [22, 14], [-4, 16], [-26, 11]], true); shape(ctx, EI, hlEierstok > 0.3 ? lighten(BIO.klier, 0.2) : EIL, L(1.5));
    ctx.fillStyle = rgba('#F6EBDD', 0.7); [[-14, -4, 4], [6, 5, 5.5], [18, -5, 3], [-4, -8, 2.5], [-20, 6, 2.5]].forEach(([fx2, fy2, fr]) => { ctx.beginPath(); ctx.arc(fx2, fy2, fr, 0, 6.283); ctx.fill(); }); // follikeltjes
    ctx.restore();
    // eileider: isthmus → ampulla → trechter met franjes over de buitenpool
    const dx = ox - H[0]; const pad = [[H[0] - 4, H[1] + 2], [H[0] + dx * 0.4, H[1] - 6], [H[0] + dx * 0.9, H[1] - 14], [ox + 35, H[1] - 6 + (oy - H[1]) * 0.05], [ox + 60, oy - 22], [ox + 54, oy + 4]];
    const P2 = bioDicht(pad, 12).map(([px, py]) => [d * px, py]);
    for (let i = 1; i < P2.length; i++) { const u = i / P2.length; ctx.strokeStyle = SPIER; ctx.lineWidth = lerp(5, 11, Math.pow(u, 1.3)); ctx.beginPath(); ctx.moveTo(P2[i - 1][0], P2[i - 1][1]); ctx.lineTo(P2[i][0], P2[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(SPIERL, 0.85); ctx.lineWidth = L(1.2); ctx.beginPath(); P2.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
    const [ex, ey] = P2[P2.length - 1];
    for (let k = 0; k < 7; k++) { const an = lerp(1.45, 3.3, k / 6) + Math.sin(t * 1.5 + k) * 0.06; const an2 = d > 0 ? an : Math.PI - an; const len = 18 + 6 * hash(k + 3);
      ctx.strokeStyle = SPIER; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + Math.cos(an2) * len * 0.6 + d * 3, ey + Math.sin(an2) * len * 0.6, ex + Math.cos(an2) * len, ey + Math.sin(an2) * len); ctx.stroke();
      ctx.fillStyle = SPIERL; ctx.beginPath(); ctx.arc(ex + Math.cos(an2) * len, ey + Math.sin(an2) * len, 1.8, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#5A2A36', 0.6); ctx.beginPath(); ctx.ellipse(ex, ey + 2, 5, 3, 0, 0, 6.283); ctx.fill(); // trechteropening
  }
  // baarmoeder (spierwand)
  if (hlBaarmoeder > 0.01) { ctx.save(); ctx.shadowColor = rgba(BIO.klier, 0.8 * hlBaarmoeder); ctx.shadowBlur = 40 * hlBaarmoeder; ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.fillStyle = SPIER; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, V.buiten, true); shape(ctx, SPIER, hlBaarmoeder > 0.3 ? lighten(BIO.klier, 0.2) : SPIERL, L(2));
  // spiervezel-tekening (rustig, enkele bogen in de wand)
  ctx.save(); ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.clip(); ctx.strokeStyle = rgba('#A9606A', 0.45); ctx.lineWidth = L(1.2);
  for (let k = 1; k <= 3; k++) { const f = k / 4; ctx.beginPath(); ctx.ellipse(0, V.yci, V.rxi + V.wand * f, V.ryi + V.wand * f, 0, 3.6, 5.8); ctx.stroke(); } ctx.restore();
  // halskanaal
  ctx.strokeStyle = '#6A3240'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, -V.Lc + 4); ctx.stroke();
  ctx.fillStyle = '#6A3240'; ctx.beginPath(); ctx.ellipse(0, -V.Lc * 0.5, 4.5, V.Lc * 0.3, 0, 0, 6.283); ctx.fill();
  // holte: slijmvlies + (bij zwangerschap) vruchtwater
  ctx.beginPath(); bioPad(ctx, V.holte, true); shape(ctx, V.kh > 0.3 ? '#6E8C92' : '#6A3240', SLIJM, Math.max(3, V.wand * 0.18));
  if (V.kh > 0.3) { ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.fillStyle = rgba('#CFE6E2', 0.18); ctx.fill(); }
  if (z > 0.25 && placenta) { // moederkoek tegen de bovenwand (rechtsboven), met navelstreng
    const pk = clamp((z - 0.25) / 0.15, 0, 1); ctx.save(); ctx.globalAlpha *= pk; ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const pcx = V.rxi * 0.62, pcy = V.yci - V.ryi * 0.72; ctx.beginPath(); ctx.ellipse(pcx, pcy, V.rxi * 0.5, V.ryi * 0.3, -0.75, 0, 6.283); shape(ctx, '#A8464E', '#C9666C', L(1.5));
    ctx.strokeStyle = rgba('#7A2A36', 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(pcx - V.rxi * 0.05, pcy + V.ryi * 0.05, V.rxi * (0.22 + k * 0.05), 3.2, 4.0); ctx.stroke(); }
    ctx.restore(); }
  // vrucht
  if (foetus > 0.01 && fs > 0.0005 && V.kh > 0.3) {
    ctx.save(); ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const f = castFoetus(ctx, fx, fy, fs, { alpha: foetus, rot: frot });
    if (z > 0.25 && placenta) castNavelstreng(ctx, V.rxi * 0.48, V.yci - V.ryi * 0.55, f.navel.x, f.navel.y, t, foetus * clamp((z - 0.25) / 0.15, 0, 1), Math.max(3, fs * 22));
    ctx.restore(); }
  ctx.restore();
  return uit;
}

// KIJKJE IN DE BUIK van een castpersonage getekend met persoon(ctx, id, x, y, h, { outfit: 'zwanger', zwanger }).
// Plaatsing (stripmaten van lib_cast.js, hh = kophoogte): baarmoedermond achter het schaambeen (heupY + 0,22 hh,
// waar de benen beginnen); niet zwanger blijft de baarmoeder in het bekken (± 0,25 hh hoog). Schaal zó dat de
// voldragen baarmoeder (35 cm) tot de bovenrand van de stripbuik reikt (onder de ribbenboog); bij 5 mnd staat de
// fundus dan rond de taille/navel. De stripbuik is breder dan echt: o.breed rekt alléén de baarmoederwand in de
// breedte mee (tot ± 80 % van de buikbreedte), het kind en de eierstokken blijven op echte verhouding.
function buikKijkje(ctx, id, x, y, h, zwanger = 0, o = {}) {
  const { a = 1, kijk = 1 } = o; const P = CAST[id] || {}; const hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45;
  const z = clamp(zwanger, 0, 1); const b = castBuik(id, x, y, h, z, kijk); const cx = x + (P.krom ? hh * 0.15 : 0);
  const ux = lerp(cx, b.x, 0.6), uy = heupY + hh * 0.22; const s = 1.36 * hh / 735;
  const V0 = _vbBaarmoederVorm(z); const wil = Math.min(2 * b.rx * 0.8, (-V0.yT - V0.Lc) * s * 0.82), heeft = 2 * V0.maxX * s; const breed = lerp(1, Math.max(1, wil / heeft), ease(clamp((z - 0.2) / 0.5, 0, 1)));
  const V = _vbBaarmoederVorm(z, breed); const opt = Object.assign({}, o, { a: 1, zwanger: z, breed });
  if (a <= 0.01) return vrouwOrganenVoor(ctx, ux, uy, s, Object.assign(opt, { a: 0 }));
  ctx.save(); ctx.globalAlpha *= a;
  const half = Math.max(V.maxX + 120, V.hoek[0] + 200) * s; const yTop = uy + V.yT * s - hh * 0.08, yBot = uy + hh * 0.12;
  _vbVenster(ctx, ux, (yTop + yBot) / 2, Math.max(half, hh * 0.42), (yBot - yTop) / 2 + hh * 0.05, 0.78);
  const r = vrouwOrganenVoor(ctx, ux, uy, s, opt);
  ctx.restore(); return r;
}

// =====================================================================================
// GEEL LICHAAM (corpus luteum) in doorsnede, en zijn verval tot wit lichaam (corpus albicans).
// Recept: 1,5–2,5 cm groot (kan tot 3 cm); sterk geplooide, dikke gele wand van grote veelhoekige luteïnecellen
// (granulosa-luteïnecellen ± 30–50 µm, ronde kern, lichtgeel vetrijk cytoplasma) met tussen de plooien schotten
// van theca-weefsel (kleinere theca-luteïnecellen) waarlangs haarvaten naar binnen groeien; in het midden het
// bloedstolsel/de holte van de gesprongen follikel (rood-bruin, fibrinedraden, later bindweefsel); dun kapsel
// erbuiten. Zonder hCG na ± 10–14 dagen verval: krimpt, verliest kleur, wordt een klein wit hyalien litteken
// (corpus albicans, enkele mm) met golvende rand. LH-receptoren (G-eiwitgekoppeld) op het celmembraan van de
// luteïnecellen. Bron: Junqueira h. 22 'Corpus luteum'; Ross & Pawlina h. 23. Bekende fouten: geel lichaam als
// egale gele bol of ring zonder plooien; cellen als kleine stipjes; litteken dat geel blijft.
// Ontwerpeenheden: straal 100 (r = straal op het scherm).
// =====================================================================================
var _VB_SEP = 7, _VB_F0 = 0.45; // aantal plooien; fase zodat het midden van een kwab rechts ligt (θ = 0)
function _vbRo(th) { const ph = _VB_SEP * (th - _VB_F0); return 90 - 24 * Math.pow((1 + Math.cos(ph)) / 2, 8) + 1.5 * Math.sin(th * 3); }
function _vbRi(th) { const ph = _VB_SEP * (th - _VB_F0); return 48 + 13 * Math.pow((1 + Math.cos(ph)) / 2, 2) + 2 * Math.sin(th * 5 + 1); }
function _vbLuteine() { // Voronoi-cellen in de wand (gecachet)
  if (_bioPolyCache.vbLuteine) return _bioPolyCache.vbLuteine;
  const seeds = []; const d = 9;
  for (let rho = 50; rho < 92; rho += d * 0.86) { const n = Math.round(6.283 * rho / d); for (let k = 0; k < n; k++) { const th = (k + (Math.round(rho) % 2) * 0.5) / n * 6.283 + (hash(rho * 7 + k) - 0.5) * 0.4 * d / rho; const rr = rho + (hash(rho * 3 + k * 11) - 0.5) * d * 0.4;
      if (rr > _vbRi(th) + 2 && rr < _vbRo(th) - 2) seeds.push([Math.cos(th) * rr, Math.sin(th) * rr]); } }
  const polys = seeds.map((p, i) => { const pts = []; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.8;
      seeds.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); if (dd > d * 2.5) return; const pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr); });
      best = Math.max(0, best - 0.9); pts.push([p[0] + ux * best, p[1] + uy * best]); } return { c: p, pts }; });
  let hi = 0, bx = -1e9; polys.forEach((c, i) => { const th = Math.atan2(c.c[1], c.c[0]); if (Math.abs(th) < 0.2 && c.c[0] > bx) { bx = c.c[0]; hi = i; } });
  return (_bioPolyCache.vbLuteine = { polys, hi });
}
function geelLichaam(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, leef = 1, hl = 0, receptoren = 0 } = o;
  const lv = clamp(leef, 0, 1), sc = lerp(0.32, 1, ease(lv)), k = r / 100 * sc; const L = (px) => px / k;
  const { polys, hi } = _vbLuteine(); const H = polys[hi];
  const omtrek = (f, n = 120) => { const R = []; for (let i = 0; i < n; i++) { const th = i / n * 6.283; R.push([Math.cos(th) * f(th), Math.sin(th) * f(th)]); } return R; };
  // buitenste membraanpunt van de gemarkeerde cel (meest rechtse punt van de gladde omtrek)
  const celPad = bioDicht([...H.pts, H.pts[0], H.pts[1]], 6).slice(6); let mp = celPad[0]; celPad.forEach(p => { if (p[0] > mp[0]) mp = p; });
  const uit = { cel: [x + mp[0] * k, y + mp[1] * k], r: r * sc };
  if (a <= 0.01) return uit;
  const geel = lv, ka = clamp((lv - 0.12) / 0.55, 0, 1), alb = clamp((0.6 - lv) / 0.5, 0, 1);
  const kl = (h1, wit = '#E4DED2') => _vbMix(h1, wit, 1 - geel);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  _vbGloed(ctx, 0, 0, 125, BIO.klier, hl);
  const KAPSEL = omtrek(th => 96 + 1.2 * Math.sin(th * 4 + 0.5)), WAND_O = omtrek(_vbRo), WAND_I = omtrek(_vbRi);
  if (ka > 0.01) {
    ctx.save(); ctx.globalAlpha *= ka;
    // kapsel + theca (schotten tussen de plooien)
    ctx.beginPath(); bioPad(ctx, KAPSEL, true); shape(ctx, kl('#C98A6A'), lighten(kl('#D9A080'), 0.15), L(1.6));
    ctx.fillStyle = rgba(kl('#9C6A4A'), 0.35); for (let i = 0; i < 110; i++) { const th = hash(i * 3 + 7) * 6.283, rr = lerp(_vbRo(th) + 2, 94, hash(i * 3 + 8)); ctx.beginPath(); ctx.ellipse(Math.cos(th) * rr, Math.sin(th) * rr, 1.5, 1, th, 0, 6.283); ctx.fill(); }
    // centrale holte met stolsel
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.fillStyle = kl('#7E3236', '#D8D0C4'); ctx.fill();
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.clip();
    ctx.strokeStyle = rgba(kl('#E0A0A0'), 0.45); ctx.lineWidth = L(1); for (let i = 0; i < 14; i++) { const a0 = hash(i + 40) * 6.283, a1 = a0 + 1 + hash(i + 41) * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a0) * 50, Math.sin(a0) * 50); ctx.quadraticCurveTo((hash(i + 42) - 0.5) * 40, (hash(i + 43) - 0.5) * 40, Math.cos(a1) * 50, Math.sin(a1) * 50); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const an = hash(i * 5 + 60) * 6.283, rr = Math.sqrt(hash(i * 5 + 61)) * 42; ctx.beginPath(); ctx.ellipse(Math.cos(an) * rr, Math.sin(an) * rr, 2.2, 1.4, an, 0, 6.283); ctx.fillStyle = rgba(kl('#C2453E'), 0.7); ctx.fill(); }
    ctx.restore();
    // gele wand: luteïnecellen
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_O, true); bioPad(ctx, WAND_I.slice().reverse(), true); ctx.clip('evenodd');
    ctx.fillStyle = kl('#D9A84A'); ctx.fillRect(-100, -100, 200, 200);
    polys.forEach((c, i) => { if (i === hi && receptoren > 0.01) return; ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, kl('#EDCB6A'), kl('#F6E2A0'), L(0.8));
      ctx.beginPath(); ctx.arc(c.c[0] + (hash(i) - 0.5) * 1.5, c.c[1] + (hash(i + 1) - 0.5) * 1.5, 1.7, 0, 6.283); ctx.fillStyle = rgba(_vbMix('#6E5A9E', '#BDB4A8', 1 - geel), 0.85); ctx.fill(); });
    ctx.restore();
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.strokeStyle = kl('#C9963A'); ctx.lineWidth = L(1.4); ctx.stroke();
    // haarvaten: vanuit het kapsel langs de schotten naar binnen, met zijtakjes de kwabben in
    ctx.strokeStyle = rgba(kl('#C2453E'), 0.9); for (let sp = 0; sp < _VB_SEP; sp++) { const th = _VB_F0 + sp * 6.283 / _VB_SEP; const r0 = 95, r1 = _vbRi(th) + 1;
      ctx.lineWidth = L(1.6); ctx.beginPath(); bioPad(ctx, [[Math.cos(th) * r0, Math.sin(th) * r0], [Math.cos(th + 0.03) * lerp(r0, r1, 0.5), Math.sin(th + 0.03) * lerp(r0, r1, 0.5)], [Math.cos(th) * r1, Math.sin(th) * r1]], false); ctx.stroke();
      ctx.lineWidth = L(1); for (const sd of [-1, 1]) for (let b = 0; b < 2; b++) { const t0 = th + sd * (0.12 + b * 0.16), rr0 = _vbRo(t0) - 1, rr1 = lerp(rr0, _vbRi(t0), 0.55 + 0.3 * hash(sp * 4 + b + (sd > 0 ? 2 : 0)));
        ctx.beginPath(); ctx.moveTo(Math.cos(t0) * (rr0 + 3), Math.sin(t0) * (rr0 + 3)); ctx.quadraticCurveTo(Math.cos(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.sin(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.cos(t0 + sd * 0.02) * rr1, Math.sin(t0 + sd * 0.02) * rr1); ctx.stroke(); } }
    // gemarkeerde cel met LH-receptoren
    if (receptoren > 0.01) {
      ctx.beginPath(); bioPad(ctx, H.pts, true); shape(ctx, kl('#F2D27A'), (C.teal || '#5BA4C9'), L(1.6));
      ctx.beginPath(); ctx.arc(H.c[0], H.c[1], 1.9, 0, 6.283); ctx.fillStyle = '#6E5A9E'; ctx.fill();
      const celRing = [...celPad, celPad[0]], nr = 12; ctx.lineWidth = L(1);
      for (let j = 0; j < nr; j++) { const vis = clamp(receptoren * nr * 1.2 - j * 0.9, 0, 1); if (vis <= 0) continue; const q = bioPunt(celRing, (j + 0.5) / nr); const p1 = [q[0], q[1]];
        let nx = Math.sin(q[2]), ny = -Math.cos(q[2]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl; if (nx * (p1[0] - H.c[0]) + ny * (p1[1] - H.c[1]) < 0) { nx = -nx; ny = -ny; }
        const len = 2.8 * vis + 0.15 * Math.sin(t * 3 + j); ctx.strokeStyle = (C.tealL || '#9ED0EA'); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p1[0] + nx * len, p1[1] + ny * len); ctx.stroke();
        ctx.beginPath(); ctx.arc(p1[0] + nx * (len + 0.6), p1[1] + ny * (len + 0.6), 0.95 * vis, 0, 6.283); shape(ctx, (C.teal || '#5BA4C9'), (C.tealL || '#9ED0EA'), L(0.8)); }
    }
    ctx.restore();
  }
  // wit lichaam (litteken): golvend, wit, vezelig
  if (alb > 0.01) {
    ctx.save(); ctx.globalAlpha *= alb; const AL = omtrek(th => 86 * (1 + 0.1 * Math.sin(th * 7 + 0.4) + 0.05 * Math.sin(th * 13 + 1)));
    ctx.beginPath(); bioPad(ctx, AL, true); shape(ctx, '#E4DED2', '#F4F0E8', L(1.6));
    ctx.strokeStyle = rgba('#B8AE9E', 0.6); ctx.lineWidth = L(1.1);
    for (let k2 = 1; k2 <= 3; k2++) { const R2 = omtrek(th => 86 * (1 - k2 * 0.22) * (1 + 0.14 * Math.sin(th * 7 + 0.4 + k2) + 0.05 * Math.sin(th * 11)), 60); ctx.beginPath(); bioPad(ctx, R2, true); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  return uit;
}
// =====================================================================================
// EILEIDER in lengtedoorsnede, variant met as en lumen-functie (22 okt 2026, Anticonceptie, soa's en voortplantings-
// techniek). Naast eileiderLangs (Van bevruchting tot baby); gebruik bij nieuwe films bij voorkeur één van de twee. Recept: ± 10–12 cm lang; vanaf de baarmoeder isthmus (smal, lumen ± 1 mm, dikke spierwand) → ampulla
// (wijd, ± 1 cm, dunne wand, sterk geplooid slijmvlies; hier vindt de bevruchting plaats) → trechter met franjes
// (fimbriae) die over de eierstok liggen. Slijmvlies met trilhaarcellen die naar de baarmoeder slaan, plus
// spiercontracties. Ontsteking (salpingitis, vooral chlamydia/gonorroe): wand rood en gezwollen, plooien plakken
// aan elkaar, daarna littekens (fibrose) die het lumen vernauwen of afsluiten → eicel/embryo blijft steken
// (buitenbaarmoederlijke zwangerschap of onvruchtbaarheid). Bron: Junqueira h. 22; Sadler h. 2; RIVM chlamydia.
// Bekende fouten: een rechte buis van gelijke dikte; franjes als losse streepjes zonder trechter.
// x0 = baarmoederkant (links), x1 = trechterkant (rechts), yc = as. o: ontst 0..1, litteken 0..1, t, eicel (0..1 = plek
// langs de buis van rechts naar links), dicht 0..1 (volledig afgesloten), trilhaar (toon trilharen).
// Geeft { lumen(u) → [x, y, straal] } terug (u = 0 baarmoeder … 1 trechter).
// =====================================================================================
function eileiderDoorsnede(ctx, x0, x1, yc, o = {}) {
  const { a = 1, t = 0, ontst = 0, litteken = 0, trilhaar = 1, s = 1, franjes = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = x1 - x0; const zw = 1 + 0.18 * ontst;
  const buiten = (u) => lerp(46, 120, Math.pow(u, 1.25)) * s * zw; // halve dikte buitenwand
  const lumen = (u) => Math.max(4 * s, lerp(8, 82, Math.pow(u, 1.4)) * s * (1 - 0.25 * ontst)); // halve wijdte lumen
  const yAs = (u) => yc + Math.sin(u * 5.2) * 10 * s;
  const N = 80; const top = [], bot = [], lt = [], lb = [];
  for (let i = 0; i <= N; i++) { const u = i / N, x = x0 + u * L, y = yAs(u); top.push([x, y - buiten(u)]); bot.push([x, y + buiten(u)]); lt.push([x, y - lumen(u)]); lb.push([x, y + lumen(u)]); }
  const wandCol = ontst > 0.01 ? _mixHex(BIO.spier, '#D2453A', 0.45 * ontst) : BIO.spier;
  // spierwand
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  shape(ctx, rgba(wandCol, 0.7), rgba(BIO.spierL, 0.8), 2);
  // kringspiervezels (dwars) in de wand
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.45); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const u = k / 70, x = x0 + u * L, y = yAs(u); ctx.beginPath(); ctx.moveTo(x, y - buiten(u) + 4); ctx.lineTo(x + 6, y - lumen(u) - 6); ctx.moveTo(x, y + buiten(u) - 4); ctx.lineTo(x + 6, y + lumen(u) + 6); ctx.stroke(); } ctx.restore();
  // slijmvlies met plooien (vingers het lumen in), sterker geplooid in de ampulla
  const slijmCol = ontst > 0.01 ? _mixHex(BIO.slijm, '#E0503F', 0.6 * ontst) : BIO.slijm;
  ctx.beginPath(); lt.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(lb[i][0], lb[i][1]); ctx.closePath(); ctx.fillStyle = rgba('#2E1E2A', 0.9); ctx.fill();
  const plooi = (sd) => { const nP = 30; for (let k = 0; k < nP; k++) { const u = 0.03 + (k + 0.5) / nP * 0.94, x = x0 + u * L, y = yAs(u); const lr = lumen(u); const lenF = lerp(0.35, 0.78, u) * (0.75 + 0.5 * hash(k * 5 + (sd > 0 ? 1 : 2))) * (1 + 0.2 * ontst); const w = (L / nP) * 0.62;
      const by = y + sd * (lr + 2 * s), ty = y + sd * lr * (1 - lenF), lean = (hash(k * 3 + 7) - 0.5) * w * 0.8;
      const pts = [[x - w, by], [x - w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x - w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x + w, by]];
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.closePath(); shape(ctx, rgba(slijmCol, 0.9), rgba(BIO.slijmD, 0.75), 1.2);
      if (u > 0.55 && lenF > 0.5) { ctx.beginPath(); ctx.ellipse(x + lean * 0.4, lerp(by, ty, 0.6), w * 0.18, lr * lenF * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.slijmD, 0.25); ctx.fill(); }
      if (trilhaar > 0.01) { ctx.save(); ctx.globalAlpha *= trilhaar; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 1.3; for (let c = 0; c < 4; c++) { const v = (c + 0.5) / 4; const p = bioPunt(pts, v); const sl = Math.sin(t * 9 + k * 0.7 + c) * 0.5 + 0.5; const nx = -sd * 0.0, dx = -(5 + 5 * sl) * s, dy = -sd * (4 + 3 * (1 - sl)) * s;
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[0] + dx * 0.3, p[1] + dy, p[0] + dx, p[1] + dy * 0.7); ctx.stroke(); } ctx.restore(); } } };
  plooi(-1); plooi(1);
  // trechter met franjes
  if (franjes > 0.01) { const ue = 1, xe = x1, ye = yAs(ue), R = buiten(ue); ctx.save(); ctx.globalAlpha *= franjes; for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31; const len = (70 + 22 * Math.sin(k * 1.7)) * s; const wob = Math.sin(t * 1.4 + k) * 6 * s;
      const sx = xe - 6 * s, sy = ye + Math.sin(an) * R * 0.9; const ex = sx + Math.cos(an) * len + 20 * s, ey = sy + Math.sin(an) * len * 0.8 + wob;
      ctx.strokeStyle = rgba(wandCol, 0.8); ctx.lineWidth = 15 * s; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + 10 * s, (sy + ey) / 2 - wob, ex, ey); ctx.stroke();
      ctx.strokeStyle = rgba(slijmCol, 0.9); ctx.lineWidth = 7 * s; ctx.stroke(); } ctx.restore(); }
  // littekens: lichte vezelbanden die het lumen dichtknijpen
  if (litteken > 0.01) { const plekken = [0.28, 0.5, 0.66]; plekken.forEach((u0, i) => { const g = clamp(litteken * 1.6 - i * 0.3, 0, 1); if (g <= 0.01) return; const x = x0 + u0 * L, y = yAs(u0), lr = lumen(u0);
      ctx.save(); ctx.globalAlpha *= g; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 34 * s, y + sd * (lr + 10 * s)); ctx.quadraticCurveTo(x, y + sd * lr * (1 - 1.05 * g), x + 34 * s, y + sd * (lr + 10 * s)); ctx.lineTo(x + 34 * s, y + sd * buiten(u0) * 0.9); ctx.lineTo(x - 34 * s, y + sd * buiten(u0) * 0.9); ctx.closePath(); shape(ctx, rgba('#EDE2DA', 0.92), '#C9B8AE', 1.5);
          ctx.strokeStyle = rgba('#B8A498', 0.8); ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const yy = y + sd * (lr * (1 - g * 0.9) + 8 * s + k * 9 * s); ctx.beginPath(); ctx.moveTo(x - 26 * s, yy); ctx.bezierCurveTo(x - 8 * s, yy - 5 * s, x + 8 * s, yy + 5 * s, x + 26 * s, yy); ctx.stroke(); } } ctx.restore(); }); }
  ctx.restore();
  return { lumen: (u) => [x0 + u * L, yAs(u), lumen(u)], buiten: (u) => buiten(u) };
}
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }

// =====================================================================================
// BACTERIËN VAN SOA'S (22 okt 2026). Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten naar
//   elkaar, samen ± 1,5 × 0,8 µm; vaak ín witte bloedcellen in pus. Bron: CDC; Murray, Medical Microbiology h. 22.
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; insluitsel (inclusion) naast de kern vol kleine
//   deeltjes (elementaire lichaampjes ± 0,3 µm, grotere reticulaire lichaampjes); de cel barst en de deeltjes
//   besmetten nieuwe cellen. Bron: idem h. 34.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen, draait als
//   een kurkentrekker. Bron: idem h. 35.
// BACTERIE GROOT: celwand + celmembraan, cytoplasma met ribosomen, DNA als één lus (nucleoïd) en een plasmide;
//   aangrijpingspunten van antibiotica: celwand (penicillines/ceftriaxon) en ribosomen (azitromycine, doxycycline).
// Bekende fouten: alle bacteriën als dezelfde staafjes; bacterie als leeg ovaal.
// =====================================================================================
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) { // lichaamscel met een chlamydia-insluitsel; barst = 0..1 (deeltjes komen vrij)
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BIO.cyto, 0.22), rgba(BIO.cyto, 0.75), 2.5);
  ctx.beginPath(); ctx.ellipse(x + r * 0.35, y - r * 0.2, r * 0.3, r * 0.26, 0.3, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.55), BIO.kernL, 1.5);
  const ir = r * lerp(0.15, 0.5, groei); const ix = x - r * 0.22, iy = y + r * 0.12;
  ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); shape(ctx, rgba('#E8D9A0', 0.18), rgba('#E8D9A0', 0.7), 1.5);
  const n = Math.round(lerp(4, 46, groei)); for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, rr = Math.sqrt(hash(k * 7 + 2)) * ir * 0.85; const out = barst * (40 + 60 * hash(k)) ; const px = ix + Math.cos(an) * (rr + out), py = iy + Math.sin(an) * (rr + out);
    ctx.beginPath(); ctx.arc(px, py, k % 5 === 0 ? 4 : 2.6, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = dood > 0.5 ? '#6A7488' : col; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.beginPath(); const ph = dood > 0.5 ? 0 : t * 6;
  for (let i = 0; i <= 120; i++) { const u = i / 120, xx = (u - 0.5) * len, yy = Math.sin(u * n * 6.283 - ph) * len * 0.045; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
}
function bacterieGroot(ctx, x, y, w, h, o = {}) { // staafbacterie in doorsnede; wandKapot 0..1 (antibioticum op de celwand), riboHl 0..1
  const { a = 1, t = 0, wandKapot = 0, riboHl = 0, col = C.koraal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = (inset) => { roundRect(ctx, x - w / 2 + inset, y - h / 2 + inset, w - 2 * inset, h - 2 * inset, h / 2 - inset); };
  // celwand (dik), met gaten als het antibioticum werkt
  pad(0); ctx.lineWidth = 9; ctx.strokeStyle = rgba(col, 0.9); if (wandKapot > 0.01) ctx.setLineDash([lerp(400, 26, wandKapot), lerp(0, 18, wandKapot)]); ctx.stroke(); ctx.setLineDash([]);
  pad(9); ctx.fillStyle = rgba(col, 0.16); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = rgba('#F2E6C8', 0.7); ctx.stroke(); // celmembraan
  // DNA-lus (nucleoïd): één gesloten, kronkelende lus
  ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 90; i++) { const an = i / 90 * 6.283; const rr = 1 + 0.18 * Math.sin(an * 7 + 1) + 0.1 * Math.sin(an * 13); const px = x - w * 0.05 + Math.cos(an) * w * 0.18 * rr, py = y + Math.sin(an) * h * 0.26 * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // plasmide
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.12, w * 0.045, h * 0.09, 0.4, 0, 6.283); ctx.stroke();
  // ribosomen
  for (let k = 0; k < 34; k++) { const px = x - w * 0.42 + hash(k * 3 + 1) * w * 0.84, py = y - h * 0.32 + hash(k * 3 + 2) * h * 0.64; if (Math.abs(px - (x - w * 0.05)) < w * 0.2 && Math.abs(py - y) < h * 0.3) continue;
    ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex('#C9B896', '#E0B64A', riboHl) : rgba('#C9B896', 0.85); ctx.fill(); }
  ctx.restore(); return { wand: (an) => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] };
}

// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom (wordt de placenta); binnenste celmassa (embryoblast) als klompje ronde cellen aan één
// kant (wordt het kind); holte vol vocht (blastocoel). Bij PGT haalt de arts 5–10 cellen uit de trofoblast aan de
// kant tegenover de binnenste celmassa. Bron: Sadler h. 3; ESHRE PGT-consortium. Bekende fout: ring van gelijke
// rondjes zonder verschil tussen buitenlaag en celmassa.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (zona > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.12 * zona), rgba('#F6EEDC', 0.75 * zona), Math.max(2, r * 0.05)); }
  ctx.beginPath(); ctx.arc(x, y, r * 0.95, 0, 6.283); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  // trofoblast: platte cellen langs de rand
  const n = 22; for (let k = 0; k < n; k++) { const an = k / n * 6.283; const d = Math.abs(Math.atan2(Math.sin(an - (icm + Math.PI)), Math.cos(an - (icm + Math.PI)))); if (gat > 0.01 && d < 0.35 * gat) continue;
    const cx = x + Math.cos(an) * r * 0.88, cy = y + Math.sin(an) * r * 0.88; ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.16, r * 0.065, an + Math.PI / 2, 0, 6.283);
    shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', 1.2); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.05, r * 0.03, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); }
  // binnenste celmassa
  const ix = x + Math.cos(icm) * r * 0.55, iy = y + Math.sin(icm) * r * 0.55; const P = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  P.forEach(([u, v], i) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', 1.2); ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); });
  ctx.restore(); return { icm: [ix, iy], tegenover: [x + Math.cos(icm + Math.PI) * r * 0.9, y + Math.sin(icm + Math.PI) * r * 0.9] };
}

// =====================================================================================
// ===== Chromosomen (Erfelijkheid 1, herbouw 25 okt 2026) · GEKEURD door Kamiel 25 okt 2026 (ronde 1), eerst gebruikt in Chromosomen v2 =====
// Lessen en registratie: bibliotheek/lessen_chromosomen.md
// Vier recepten: huidDoorsnede, kernChromatine (+ chromatideX), nucleosoomDraad, onderarm.
// DNA altijd via dnaDraad (lib_micro_evo.js, C10.4: één DNA-functie overal); die moet vóór het tekenen geladen zijn.
// =====================================================================================

// ---------- Voronoi op willekeurige zaadpunten (gecachet), zoals _bioCellen maar met eigen punten ----------
// pts = [[x,y],…]; rmax(i) = grootste straal per cel. Geeft [{c, pts}] terug; gaatje van 'gap' px tussen de cellen.
function _bioVoronoi(key, pts, rmax, gap = 2, N = 36) {
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const out = pts.map((p, i) => { const R = typeof rmax === 'function' ? rmax(i) : rmax, P = [];
    const buren = pts.filter((q, j) => j !== i && Math.abs(q[0] - p[0]) < R * 2.2 && Math.abs(q[1] - p[1]) < R * 2.2);
    for (let k = 0; k < N; k++) { const an = k / N * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = R;
      for (const q of buren) { const dx = q[0] - p[0], dy = q[1] - p[1], dd = Math.hypot(dx, dy), proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); }
      best = Math.max(0, best - gap / 2); P.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts: P }; });
  _bioPolyCache[key] = out; return out;
}

// =====================================================================================
// HUID IN DOORSNEDE (dunne huid, onderarm). Recept (bron: OpenStax Anatomy & Physiology § 5.1; Barrandon & Green
// 1985 PNAS; Sun e.a. 2021 Int J Dermatol Venereol):
//  - opperhuid ± 75–100 µm dik, in lagen van boven naar onder: hoornlaag (10–15 lagen dode, platte cellen zonder
//    kern, ± 1 µm dik en 25–40 µm breed, bovenaan schilferend), korrellaag (2–3 lagen platte cellen met donkere
//    korrels, kern verdwijnt), stekelcellaag (4–6 lagen veelhoekige cellen met ronde kern, naar boven platter),
//    basale laag (één rij kubische tot cilindrische cellen ± 8–10 µm, kern ovaal, af en toe een delende cel).
//  - pigmentcel (melanocyt) in de basale laag, ± 1 op 7 basale cellen, licht cytoplasma, 3–4 uitlopers die tussen
//    de cellen omhoog lopen; melaninekorrels gaan naar de cellen erboven en liggen als 'kapje' boven de kern.
//    Bij albinisme zijn de pigmentcellen er wél, maar zonder melanine (o.mel = 0).
//  - basaalmembraan golvend: lederhuidpapillen steken omhoog (afstand ± 100–150 µm); in elke papil een haarvatlus.
//  - lederhuid: bindweefsel met collageenbundels en spoelvormige kernen (fibroblasten).
//  Bekende fouten: honingraat of raster van gelijke cellen; kern in de dode hoornlaag; pigmentcel bovenin;
//  een vlakke rechte basaalmembraan; melanine als vlakke bruine kleur in plaats van korrels.
// x, y = linksboven; w × h in px; o.um = breedte in micrometer (bepaalt de celgrootte); o.mel 0..1.6 (0 albinisme,
// 1 gewoon, 1,6 na zon); o.deling 0..1 = één basale cel in deling; o.hl = 'hoorn'|'levend'|'basaal'|'pigment'.
// Geeft { s (px per µm), yHoorn, yBasaal(x), pig:[[x,y]], deel:[x,y] } terug voor labels en zoom.
// =====================================================================================
function huidDoorsnede(ctx, X0, Y0, w, h, o = {}) {
  const x = 0, y = 0; // alles in lokale coördinaten (cache blijft geldig als de plaat verschuift)
  const { a = 1, um = 260, mel = 1, deling = 0, hl = null, t = 0, seed = 5, huidTint = '#D9B8A0' } = o; if (a <= 0.01) return {};
  const s = w / um, key = 'huid' + w + 'x' + h + 'u' + um + 's' + seed;
  const yTop = y + 6 * s;                                  // bovenkant hoornlaag
  const corneum = 16 * s, korrel = 9 * s;
  const lam = 115, A = 22;                                 // papilafstand en hoogte (µm)
  const bm = (xx) => { const u = (xx - x) / s; const b = Math.pow(0.5 + 0.5 * Math.cos((u - 40) / lam * 6.283), 2.2); return y + (6 + 16 + 9 + 82) * s - A * s * b + Math.sin(u * 0.05 + seed) * 1.5 * s; };
  const yLevend = yTop + corneum;                          // grens hoornlaag / korrellaag
  const yKorrel = yLevend + korrel;                        // grens korrellaag / stekelcellaag
  ctx.save(); ctx.translate(X0, Y0); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  // ---- lederhuid (alleen onder de basaalmembraan) ----
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) - 2); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#5E4652'; ctx.fill(); ctx.clip();
  // papillaire laag iets lichter langs de basaalmembraan
  ctx.fillStyle = '#6E5260'; ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) + 34 * s); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#56404C'; ctx.fill();
  // collageenbundels: lange golvende banden
  for (let i = 0; i < 26; i++) { const yy = y + (i / 26) * h * 1.2, ph = hash(i * 7.1 + seed) * 6.28, th = (1.4 + hash(i * 3.3) * 2.2) * s;
    ctx.strokeStyle = rgba('#B88A92', 0.32 + 0.2 * hash(i * 1.9)); ctx.lineWidth = th; ctx.lineCap = 'round'; ctx.beginPath();
    for (let xx = x - 10; xx <= x + w + 10; xx += 8) { const py = yy + Math.sin((xx - x) / (38 * s) + ph) * 5 * s + Math.sin((xx - x) / (11 * s) + ph * 2) * 1.2 * s; xx === x - 10 ? ctx.moveTo(xx, py) : ctx.lineTo(xx, py); } ctx.stroke(); }
  // fibroblasten: spoelvormige kernen
  for (let i = 0; i < Math.round(w / (30 * s)); i++) { const fx = x + hash(i * 5.7 + seed) * w, fy = bm(fx) + (14 + hash(i * 2.3) * 60) * s;
    ctx.beginPath(); ctx.ellipse(fx, fy, 6 * s, 1.4 * s, (hash(i * 9.1) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#6E5A8E', '#8E7AAE', 1); }
  // haarvatlus in elke papil, met rode bloedcellen
  for (let k = -1; k < um / lam + 1; k++) { const px = x + (40 + k * lam) * s; if (px < x - 30 * s || px > x + w + 30 * s) continue; const top = bm(px) + 7 * s, r = 3.6 * s, dx = 5.5 * s;
    ctx.strokeStyle = '#A8564C'; ctx.lineWidth = 2 * r + 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - dx, y + h + 10); ctx.lineTo(px - dx, top + dx); ctx.arc(px, top + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, y + h + 10); ctx.stroke();
    ctx.strokeStyle = '#7A3A36'; ctx.lineWidth = 2 * r - 2.4; ctx.stroke();
    for (let j = 0; j < 9; j++) { const u = ((j / 9 + t * 0.05) % 1); const L1 = (y + h - top), Ltot = 2 * L1 + Math.PI * dx; let d = u * Ltot, cx2, cy2;
      if (d < L1) { cx2 = px - dx; cy2 = y + h - d; } else if (d < L1 + Math.PI * dx) { const an = Math.PI + (d - L1) / dx; cx2 = px + Math.cos(an) * dx; cy2 = top + dx + Math.sin(an) * dx; } else { cx2 = px + dx; cy2 = top + dx + (d - L1 - Math.PI * dx); }
      ctx.beginPath(); ctx.ellipse(cx2, cy2, r * 0.95, r * 0.55, 0.3, 0, 6.283); shape(ctx, '#C2453E', '#E07A6A', 1); } }
  ctx.restore();
  // ---- basaalmembraan ----
  ctx.strokeStyle = '#E8D6C4'; ctx.lineWidth = Math.max(1.5, 0.6 * s); ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 3) xx === x ? ctx.moveTo(xx, bm(xx)) : ctx.lineTo(xx, bm(xx)); ctx.stroke();
  // ---- levende opperhuid: Voronoi-cellen in rijen (rijafstand en celbreedte groeien naar boven: cellen worden platter) ----
  const seeds = [], soort = []; const rijen = [[5, 8.5, 'b'], [15, 10, 's'], [25, 11.5, 's'], [35, 13, 's'], [45, 14, 's'], [55, 16, 's'], [65, 18, 's'], [74, 22, 'k'], [80, 26, 'k'], [86, 30, 'k']];
  rijen.forEach(([z, dxu, sr], r) => { for (let u = -dxu + hash(r * 3.7 + seed) * dxu; u < um + dxu; u += dxu * (0.85 + 0.3 * hash(r * 13 + u))) {
      const xx = x + u * s; let yy = bm(xx) - z * s * (1 + 0.0) ; if (sr !== 'b') { const yb = bm(xx) - 5 * s; yy = lerp(yb, yKorrel, (z - 5) / (65 - 5)); if (sr === 'k') yy = lerp(yKorrel, yLevend, (z - 72) / 16); }
      seeds.push([xx + (hash(u * 1.3 + r) - 0.5) * dxu * 0.25 * s, yy + (hash(u * 2.1 + r * 5) - 0.5) * 2 * s]); soort.push(sr); } });
  // pigmentcellen: elke ± 7e basale cel
  let nb = 0; const pigIdx = []; soort.forEach((sr, i) => { if (sr === 'b') { if (nb % 7 === 3) pigIdx.push(i); nb++; } });
  const delIdx = soort.findIndex((sr, i) => sr === 'b' && seeds[i][0] > x + w * 0.62);
  const cel = _bioVoronoi(key, seeds, (i) => soort[i] === 'b' ? 9 * s : soort[i] === 'k' ? 16 * s : 12 * s, Math.max(1.5, 0.5 * s));
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yLevend); ctx.lineTo(x + w, yLevend); for (let xx = x + w; xx >= x; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.fillStyle = '#3E2E36'; ctx.fill(); ctx.clip();
  const melF = clamp(mel, 0, 2.5), melK = 0.75 + 0.25 * melF; // meer melanine = meer én grotere korrels
  cel.forEach((c, i) => { const sr = soort[i], isPig = pigIdx.includes(i); if (isPig) return;
    const vul = sr === 'b' ? _mixHex(huidTint, '#B8927E', 0.25) : sr === 'k' ? _mixHex(huidTint, '#E6CDB4', 0.45) : huidTint;
    ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, vul, _mixHex(vul, '#FFFFFF', 0.25), 1);
    const [cx, cy] = c.c;
    if (sr === 'k') { // korrellaag: platte, vervagende kern + donkere keratohyaline-korrels
      ctx.beginPath(); ctx.ellipse(cx, cy, 4 * s, 1.1 * s, 0, 0, 6.283); shape(ctx, rgba('#6E5A8E', 0.4), null);
      for (let k = 0; k < 10; k++) _bioCirc(ctx, cx + (hash(i * 11 + k) - 0.5) * 16 * s, cy + (hash(i * 7 + k * 3) - 0.5) * 2.6 * s, 0.45 * s, '#4A3A54'); return; }
    if (i === delIdx && deling > 0.01) { // delende cel (metafase): chromosomen op een rij in het midden, spoelfiguur, geen kernmembraan
      ctx.beginPath(); ctx.ellipse(cx, cy - 1 * s, 6.5 * s, 6 * s, 0, 0, 6.283); shape(ctx, _mixHex(huidTint, '#FFFFFF', 0.15), _mixHex(huidTint, '#FFFFFF', 0.4), 1);
      ctx.save(); ctx.globalAlpha *= deling; ctx.strokeStyle = rgba('#8FA0B5', 0.8); ctx.lineWidth = Math.max(0.8, 0.25 * s);
      for (let k = 0; k < 7; k++) { const yy = cy - 3.6 * s + k * 1.2 * s; ctx.beginPath(); ctx.moveTo(cx - 6 * s, cy); ctx.quadraticCurveTo(cx - 3 * s, yy, cx, yy); ctx.quadraticCurveTo(cx + 3 * s, yy, cx + 6 * s, cy); ctx.stroke(); }
      for (let k = 0; k < 6; k++) { const yy = cy - 3 * s + k * 1.2 * s; chromatideX(ctx, cx + (hash(k + i) - 0.5) * 0.6 * s, yy, 2.8 * s, Math.PI / 2 + (hash(k * 3) - 0.5) * 0.5, { w: 0.8 * s, coils: 0 }); }
      ctx.restore(); return; }
    const ry = sr === 'b' ? 3.4 * s : 3 * s * (1 - 0.35 * clamp((bm(cx) - cy) / (70 * s), 0, 1)), rx = sr === 'b' ? 2.5 * s : 3.2 * s;
    ctx.beginPath(); ctx.ellipse(cx, cy + (sr === 'b' ? 0.8 * s : 0), rx, ry, 0, 0, 6.283); shape(ctx, '#7A6098', '#9A84B8', 1);
    _bioCirc(ctx, cx + 0.6 * s, cy - 0.4 * s, 0.7 * s, '#4E3A6A');
    // melaninekapje boven de kern (alleen in de onderste lagen veel)
    const hoogte = clamp((bm(cx) - cy) / (55 * s), 0, 1), n = Math.round(melF * (sr === 'b' ? 10 : 8) * (1 - 0.7 * hoogte));
    for (let k = 0; k < n; k++) { const an = Math.PI * (1.2 + 0.6 * hash(i * 5 + k)), rr = rx * (0.95 + 0.45 * hash(k * 3 + i)); _bioCirc(ctx, cx + Math.cos(an) * rr, cy + (sr === 'b' ? 0.8 * s : 0) + Math.sin(an) * (ry + 0.5 * s) * (0.95 + 0.4 * hash(k * 7 + i)), 0.55 * s * melK, k % 3 ? '#5A3420' : '#3E2216'); } });
  // pigmentcellen: licht lichaam, donkere kern, uitlopers tussen de cellen omhoog, korrels
  const pig = [];
  pigIdx.forEach((i, j) => { const [cx, cy] = cel[i].c; pig.push([cx, cy]);
    const uit = [[-1.0, -0.55, 20], [-0.35, -1.0, 24], [0.4, -1.0, 22], [1.0, -0.45, 18]];
    uit.forEach(([dx, dy, L], k) => { const P = [[cx, cy - 1.5 * s]]; for (let q = 1; q <= 4; q++) { const u = q / 4; P.push([cx + dx * L * u * s + Math.sin(q * 2.1 + k + j) * 2.2 * s, cy - 1.5 * s + dy * L * u * s]); }
      ctx.strokeStyle = melF > 0.05 ? '#6A4430' : '#D8C8B6'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.5 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
      ctx.lineWidth = 0.8 * s; ctx.beginPath(); bioPad(ctx, P.slice(2), false); ctx.stroke();
      if (melF > 0.05) for (let q = 1; q < 7; q++) { const pp = bioPunt(P, q / 7); if (hash(j * 17 + k * 5 + q) < 0.7 * Math.min(1, melF)) _bioCirc(ctx, pp[0], pp[1], 0.6 * s, '#3E2216'); } });
    ctx.beginPath(); bioPad(ctx, cel[i].pts.map(p => [cx + (p[0] - cx) * 0.92, cy + (p[1] - cy) * 0.92]), true); shape(ctx, '#E9DCCB', _mixHex('#E9DCCB', '#B8927E', 0.4), 1);
    ctx.beginPath(); ctx.ellipse(cx, cy + 0.5 * s, 2.3 * s, 2.8 * s, 0, 0, 6.283); shape(ctx, '#5A4478', '#7A6098', 1);
    for (let k = 0; k < Math.round(melF * 16); k++) { const an = hash(j * 31 + k) * 6.283, rr = (3.2 + hash(k * 7 + j) * 2.2) * s; _bioCirc(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.8, 0.7 * s, k % 2 ? '#5A3420' : '#3E2216'); } });
  ctx.restore();
  // ---- hoornlaag: gestapelde platte plaatjes zonder kern, bovenaan los ----
  ctx.save(); ctx.beginPath(); ctx.rect(x, yTop - 8 * s, w, yLevend - yTop + 8 * s); ctx.clip();
  const nl = 10, dz = corneum / nl; ctx.fillStyle = '#B8A088'; ctx.fillRect(x, yTop, w, yLevend - yTop);
  for (let l = 0; l < nl; l++) { const yy = yLevend - (l + 0.5) * dz, br = 34 * s; let u0 = -hash(l * 3.1 + seed) * br;
    for (let xx = x + u0; xx < x + w; xx += br * (0.9 + 0.25 * hash(l * 7 + xx))) { const lift = l >= nl - 2 ? (hash(xx * 0.01 + l) < 0.35 ? (l - nl + 3) * 1.6 * s : 0) : 0;
      roundRect(ctx, xx + 1, yy - dz * 0.36 - lift, br * 0.97, dz * 0.72, Math.min(dz * 0.36, 4)); shape(ctx, l > nl - 4 ? '#E4D4BA' : '#D8C2A4', null); } }
  ctx.restore();
  // ---- markering ----
  if (hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    if (hl === 'hoorn') { ctx.strokeRect(x + 3, yTop - 4 * s, w - 6, yLevend - yTop + 4 * s); }
    if (hl === 'levend') { ctx.beginPath(); ctx.moveTo(x + 3, yLevend); ctx.lineTo(x + w - 3, yLevend); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.stroke(); }
    if (hl === 'basaal') { ctx.beginPath(); for (let xx = x + 3; xx <= x + w - 3; xx += 3) xx === x + 3 ? ctx.moveTo(xx, bm(xx) - 12 * s) : ctx.lineTo(xx, bm(xx) - 12 * s); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx) + 1); ctx.closePath(); ctx.stroke(); }
    if (hl === 'pigment') pig.forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py - 6 * s, 14 * s, 0, 6.283); ctx.stroke(); }); }
  ctx.restore();
  return { s, yTop: yTop + Y0, yLevend: yLevend + Y0, yKorrel: yKorrel + Y0, yBasaal: (xx) => bm(xx - X0) + Y0, pig: pig.map(p => [p[0] + X0, p[1] + Y0]), basaal: cel.filter((c, i) => soort[i] === 'b' && !pigIdx.includes(i) && i !== delIdx).map(c => [c.c[0] + X0, c.c[1] + Y0]), deel: delIdx >= 0 ? [cel[delIdx].c[0] + X0, cel[delIdx].c[1] + Y0] : null };
}

// =====================================================================================
// CELKERN MET CHROMATINE die condenseert tot chromosomen. Recept (bron: OpenStax Biology 2e § 10.1; Genetic Science
// Learning Center Utah; BioNumbers 109953):
//  - kern 5–10 µm, omhuld door een dubbel kernmembraan met poriën; kernlichaampje als donkerdere vlek.
//  - in de interfase ligt het DNA als lange, zacht kronkelende draden (chromatine); elk chromosoom houdt zijn eigen
//    gebied in de kern (chromosoomterritorium), dus geen één grote warboel maar 46 losse kluwens die in elkaar grijpen.
//  - vlak voor de deling (DNA al gekopieerd) trekken DEZELFDE draden samen tot X-vormige chromosomen: twee
//    zusterchromatiden vast bij het centromeer. De lengtes volgen het aantal baseparen (chr 1 ± 249 Mb … chr 21 ± 47 Mb).
//  - de condensatie is een morph langs de draad (C8), geen overvloeier: elk punt van de draad schuift naar een punt
//    op de opgerolde chromatide; op het eind blijft de oprolling als lichte windingen in de chromatide zichtbaar.
//  Bekende fouten: zigzag- of veerpatroon (Kamiel 15 okt); krabbels die naar staafjes faden; alle chromosomen even lang.
// cx, cy, r = kern; o.c = 0 (interfase) … 1 (gecondenseerd); o.n = aantal chromosomen (46); o.seed; o.kleuren =
// functie (i) → kleur (bv. vader/moeder); o.membraan 0..1. Geeft de posities van de chromosomen terug.
// =====================================================================================
var CHROM_MB = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156, 57]; // 1–22, X, Y (GRCh38, Mb)
function _chromLayout(n, r, seed) { // plekken voor n chromosomen in een kern met straal r (gecachet)
  const key = 'cl' + n + 'r' + r + 's' + seed; if (_bioPolyCache[key]) return _bioPolyCache[key];
  const L = []; for (let i = 0; i < n; i++) { const nr = i < 44 ? Math.floor(i / 2) : (i === 44 ? 22 : 22); L.push({ nr, len: CHROM_MB[nr] }); }
  const pos = []; let tries = 0;
  L.forEach((c, i) => { const ln = r * 0.26 * c.len / 249 + r * 0.05; let best = null, bd = -Infinity;
    for (let k = 0; k < 60; k++) { const an = hash(seed * 13 + i * 31 + k * 7) * 6.283, rr = Math.sqrt(hash(seed * 7 + i * 17 + k * 3)) * (r * 0.78 - ln * 0.5), px = Math.cos(an) * rr, py = Math.sin(an) * rr, rot = (hash(i * 5 + k + seed) - 0.5) * 2.4;
      let dmin = 1e9; for (const q of pos) dmin = Math.min(dmin, Math.hypot(q.x - px, q.y - py) - (q.ln + ln) * 0.32); if (dmin > bd) { bd = dmin; best = { x: px, y: py, rot, ln, nr: c.nr }; } }
    pos.push(best); tries++; });
  _bioPolyCache[key] = pos; return pos;
}
function _chromDraad(i, P, r, seed, N) { // lange kronkelende draad in het territorium van chromosoom i (lokale coördinaten)
  const pts = []; let px = P.x, py = P.y, an = hash(i * 7 + seed) * 6.283; const terr = P.ln * 0.65 + r * 0.06;
  for (let k = 0; k < N; k++) { an += (hash(i * 131 + k * 17 + seed) - 0.5) * 0.9 + Math.sin(k * 0.37 + i) * 0.18; const st = r * 0.03;
    let nx = px + Math.cos(an) * st, ny = py + Math.sin(an) * st; const dx = nx - P.x, dy = ny - P.y, d = Math.hypot(dx, dy);
    if (d > terr) { an = Math.atan2(-dy, -dx) + (hash(k + i) - 0.5); nx = px + Math.cos(an) * st; ny = py + Math.sin(an) * st; }
    const dk = Math.hypot(nx, ny); if (dk > r * 0.86) { nx *= r * 0.86 / dk; ny *= r * 0.86 / dk; an += Math.PI * 0.6; }
    px = nx; py = ny; pts.push([px, py]); }
  return pts;
}
function _chromDoel(P, s, w, coils) { // punt op de opgerolde X: s 0..0.5 = chromatide 1 (boven → onder), 0.5..1 = chromatide 2 (onder → boven)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2; // u: 0 = boven, 1 = onder
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42, cy = yy + Math.cos(ph) * w * 0.12;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
function chromatideX(ctx, x, y, len, rot, o = {}) { // losse X (twee zusterchromatiden + centromeer) in de stijl van kernChromatine
  const { a = 1, w = len * 0.16, kleur = C.kernR, donker = C.kern, cen = 0.38, uiteen = 0, coils = 9 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + uiteen * w * 1.2);
    ctx.beginPath(); ctx.moveTo(off + k * w * 0.5, -len * cen); ctx.quadraticCurveTo(off, -len * cen * 0.4, off * 0.75, 0); ctx.quadraticCurveTo(off, len * (1 - cen) * 0.4, off + k * w * 0.5, len * (1 - cen));
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1); // windingen van de oprolling
    for (let q = 0; q < coils * 2; q++) { const u = q / (coils * 2), yy = -len * cen + u * len, b = Math.abs(yy) / len, cx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * b * w * 0.5;
      ctx.beginPath(); ctx.ellipse(cx, yy, w * 0.42, w * 0.13, 0.25, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); } });
  if (uiteen < 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * (1 - uiteen / 0.3), donker);
  ctx.restore();
}
function kernChromatine(ctx, cx, cy, r, o = {}) {
  const { a = 1, c = 0, n = 46, seed = 4, membraan = 1, kleuren = null, t = 0, dw = Math.max(1.6, r * 0.009) } = o; if (a <= 0.01) return [];
  const e = ease(c), pos = _chromLayout(n, r, seed);
  ctx.save(); ctx.globalAlpha *= a;
  // kern: nucleoplasma + dubbel kernmembraan met poriën
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.94, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.28); ctx.fill();
  if (membraan > 0.01) { ctx.save(); ctx.globalAlpha *= membraan; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.008);
    [1, 0.975].forEach(f => { ctx.beginPath(); ctx.ellipse(cx, cy, r * f, r * 0.94 * f, 0, 0, 6.283); ctx.stroke(); });
    for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + 0.04; _bioCirc(ctx, cx + Math.cos(an) * r * 0.988, cy + Math.sin(an) * r * 0.94 * 0.988, Math.max(1.4, r * 0.01), C.bgMicro || '#121A26'); } ctx.restore(); }
  // kernlichaampje verdwijnt bij de condensatie
  if (e < 0.95) { ctx.beginPath(); ctx.ellipse(cx + r * 0.22, cy - r * 0.12, r * 0.17, r * 0.14, 0.4, 0, 6.283); shape(ctx, rgba('#4E3A6A', 0.75 * (1 - e)), null); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.965, r * 0.9, 0, 0, 6.283); ctx.clip();
  const N = 90, out = [];
  pos.forEach((P, i) => { const kl = kleuren ? kleuren(i) : C.kernR, dk = kleuren ? _mixHex(kl, '#000000', 0.35) : C.kern; const w = P.ln * 0.17;
    const D = _chromDraad(i, P, r, seed, N); const pts = D.map((p, k) => { const q = _chromDoel(P, k / (N - 1), w, 7 + Math.round(P.ln / r * 12)); return [cx + lerp(p[0], q[0], e), cy + lerp(p[1], q[1], e)]; });
    if (e > 0.6) chromatideX(ctx, cx + P.x, cy + P.y, P.ln, P.rot, { a: (e - 0.6) / 0.4, w, kleur: kl, donker: dk });
    dnaDraad(ctx, pts, { w: lerp(dw, w * 0.34, e * e), kleur: kl, donker: dk, a: 1 - 0.75 * clamp((e - 0.75) / 0.25, 0, 1), helix: false });
    out.push({ x: cx + P.x, y: cy + P.y, len: P.ln, rot: P.rot, nr: P.nr }); });
  ctx.restore(); ctx.restore(); return out;
}

// =====================================================================================
// DNA ROND EIWITTEN (nucleosomen). Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e § 10.1):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (146 baseparen) om een kern van acht histon-eiwitten
//    (een schijf van ± 11 nm breed, ± 6 nm hoog); tussen twee nucleosomen ligt een stukje 'linker'-DNA (± 20–60 bp).
//  - eiwitten zijn grijsblauw (#7A8BA8, C9), DNA paars; de helix is rechtsdraaiend met ongelijke groeven (dnaDraad).
//  - de wikkeling is 3D: het deel achter de schijf is donkerder en wordt eerst getekend.
//  Bekende fouten: een golflijn met losse bolletjes; DNA dat door de schijf heen loopt; linker-DNA dat recht is.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt: R × 2/11).
// =====================================================================================
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const centra = []; for (let i = 0; i < n; i++) centra.push([L * (i + 0.5) / n, (i % 2 ? 1 : -1) * R * 0.45]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283; const rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const th = lerp(th0, th1, k / 160), z = (k / 160 - 0.5) * H * 1.05;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(D); } return { P, Z }; };
  const W = centra.map(wikkel);
  // linker-DNA: van het eind van de ene wikkeling naar het begin van de volgende (licht gebogen)
  const linkers = []; const start = [[-30, centra[0][1] + R * 0.8], W[0].P[0]]; linkers.push(start);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [L + 30, centra[n - 1][1] - R * 0.8]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  // 1) achterkant van de wikkelingen
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  // 2) histon-kern: cilinder (zijkant + bovenvlak) met vier zichtbare bolletjes
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * R * 0.42, c[1] - hz / 2 + Math.sin(an) * ry * 0.42, R * 0.34, ry * 0.34, 0, 0, 6.283); shape(ctx, '#8696B2', '#A4B2CA', 1.2); } });
  // 3) linker-DNA en voorkant van de wikkelingen
  linkers.forEach(pl => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  ctx.restore(); return centra;
}

// =====================================================================================
// ONDERARM VAN EEN CASTPERSONAGE (van boven gezien, hand plat met de handrug naar boven). Recept (antropometrie
// volwassene, DINED/ergonomietabellen: onderarm elleboog–pols ± 26 cm; hand ± 19 cm lang en ± 8,5 cm breed over de
// knokkels; pols ± 5,5–6 cm breed van boven; vingers: middelvinger ± 8 cm, wijs- en ringvinger ± 7,3–7,5 cm, pink ± 6 cm;
// duim staat schuin naar buiten vanaf de pols):
//  - één silhouet (onderarm + handrug + vingers + duim) in dezelfde vulkleur; 3 tinten: huid, schaduw langs één
//    rand, lichte strook; knokkels en nagels als lichte/donkere vlakjes; geen omlijning (Part C).
//  - huidkleur = CAST[id].huid (dezelfde persoon als in de scène); 'bruin' mengt naar een donkerder tint (zon) met een
//    bruiningsgrens bij de mouw; 'rood' = verbranding (bij albinisme in de zon: wel rood, geen bruin).
//  Bekende fouten: arm als stok zonder pols; hand even breed als de onderarm; vingers als worstjes van gelijke lengte.
// x, y = elleboog (midden); s = px per cm; o.kijk 1 = hand naar rechts. Geeft pols- en handpositie terug.
// =====================================================================================
function onderarm(ctx, x, y, s, o = {}) {
  const { a = 1, id = 'noor', outfit = null, bruin = 0, rood = 0, kijk = 1, mouw = true, mouwOp = 0 } = o; if (a <= 0.01) return {};
  const P0 = (typeof CAST !== 'undefined' && CAST[id]) || { huid: BIO.huid, topKleur: '#4D6E9C' }, Pg = (outfit && P0.garderobe && P0.garderobe[outfit]) ? Object.assign({}, P0, P0.garderobe[outfit]) : P0;
  const huid = Pg.huid, bruinKl = _mixHex(_mixHex(huid, '#5A3420', 0.38), '#8A5A3A', 0.15);
  const zon = rood > 0 ? _mixHex(huid, '#E58A80', 0.45 * clamp(rood, 0, 1)) : _mixHex(huid, bruinKl, clamp(bruin, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s); // vanaf hier in cm
  const arm = [[0, -3.7], [8, -3.6], [16, -3.3], [22, -3.0], [25.5, -2.85], [28, -3.4], [31, -4.0], [34, -4.25], [36.2, -4.1], [36.6, 0], [36.2, 4.0], [34, 4.15], [31, 3.8], [28, 3.2], [25.5, 2.8], [22, 3.0], [16, 3.4], [8, 3.8], [0, 3.9]];
  const vingers = [[-2.95, 7.2, 1.85, -0.07], [-0.95, 8.0, 1.95, -0.015], [1.05, 7.5, 1.85, 0.04], [2.9, 6.0, 1.6, 0.1]]; // y, lengte, breedte, hoek
  const vorm = (fill) => { ctx.fillStyle = fill; ctx.beginPath(); bioPad(ctx, arm, true); ctx.fill();
    vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an); roundRect(ctx, 0, -b / 2, L, b, b / 2); ctx.fill(); ctx.restore(); });
    ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); roundRect(ctx, 0, -1.1, 6.4, 2.2, 1.1); ctx.fill(); ctx.restore(); };
  vorm(zon);
  if ((bruin > 0.01 || rood > 0.01) && mouw) { ctx.save(); ctx.beginPath(); ctx.rect(-1, -6, 1 + mouwOp + 1.2, 12); ctx.clip(); vorm(huid); ctx.restore(); }
  // schaduw langs de onderrand, lichte strook boven het midden (vlakke tinten, binnen het silhouet)
  ctx.save(); ctx.beginPath(); bioPad(ctx, arm, true); ctx.clip();
  ctx.fillStyle = _mixHex(zon, '#000000', 0.14); ctx.beginPath(); ctx.moveTo(0, 2.4); ctx.bezierCurveTo(12, 2.2, 24, 1.8, 37, 2.7); ctx.lineTo(37, 6); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.1); ctx.beginPath(); ctx.moveTo(0, -1.6); ctx.bezierCurveTo(10, -1.5, 20, -1.2, 26, -0.9); ctx.bezierCurveTo(20, -0.2, 10, -0.5, 0, -0.4); ctx.closePath(); ctx.fill();
  ctx.restore();
  // pezen op de handrug (heel licht), knokkels en nagels
  ctx.strokeStyle = _mixHex(zon, '#FFFFFF', 0.06); ctx.lineWidth = 0.25; ctx.lineCap = 'round';
  vingers.forEach(([vy]) => { ctx.beginPath(); ctx.moveTo(28.5, vy * 0.45); ctx.lineTo(35, vy * 0.95); ctx.stroke(); });
  vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an);
    ctx.fillStyle = _mixHex(zon, '#000000', 0.08); ctx.beginPath(); ctx.ellipse(0.3, 0, 0.55, b * 0.36, 0, 0, 6.283); ctx.fill(); // knokkel
    ctx.fillStyle = _mixHex(zon, '#000000', 0.1); ctx.fillRect(L * 0.5, -b * 0.42, 0.18, b * 0.84);                        // middelste vingerkootje
    ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, L - 1.5, -b * 0.3, 1.2, b * 0.6, b * 0.25); ctx.fill(); ctx.restore(); }); // nagel
  ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, 4.8, -0.65, 1.3, 1.3, 0.5); ctx.fill(); ctx.restore();
  // mouw bij de elleboog
  if (mouw) { const mk = Pg.topKleur || '#4D6E9C'; roundRect(ctx, -6, -4.9, 6 + mouwOp + 1.2, 9.8, 1.5); ctx.fillStyle = mk; ctx.fill();
    ctx.fillStyle = Pg.topAccent || _mixHex(mk, '#000000', 0.2); ctx.fillRect(mouwOp - 0.2, -4.9, 1.4, 9.8); }
  ctx.restore(); return { pols: [x + kijk * 26 * s, y], hand: [x + kijk * 34 * s, y] };
}

// =====================================================================================
// DNA-REEKS · BASEVORM (puzzelstaaf sinds 27 okt 2026; ringvorm afgekeurd). Eerder: ringvorm gekeurd 25 okt 2026 (remake DNA 1, twijfel t2/t3): dé basevorm van de hele
// DNA-reeks (DNA 1–8). Eerst gebruikt in Wat is DNA? 3.0. Registratie: lessen_dna.md.
// Aanroep:  baseRing(ctx, x, y, 'A', dir, {s, a, rot, rand, bindA, plekA})
//           baseBruggen(ctx, x, y1, y2, 'A', s, a)            // waterstofbruggen tussen de paarranden
//           nucleotideRing(ctx, x, y, 'G', {s, a, explode, nummers, hl, dir, plekA})  → {p, su, b, c3, c5}
//           dnaLadderHelix(ctx, x0, y, dx, 'ATGC…', {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a}) → {klein(m), groot(m), top}
// =====================================================================================
// Vaste DNA-kleuren (C1: DNA paars). Zelfde tinten als de DNA-reeks (dnalib BC), zodat oude en nieuwe films samengaan.
var DNA_BASE = {
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' },
  rug: '#3E3366', rugR: '#8C7BBF', fosfaat: '#5E4E96', suiker: '#7A68B8',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  plek: { A: [0.33, 0.67], T: [0.33, 0.67], G: [0.2, 0.5, 0.8], C: [0.2, 0.5, 0.8] },
  // puzzelstaaf (27 okt 2026): lengte tot de paarlijn en hoogte van de letter, in eenheden van s
  len: 80, letterY: 40
};

// -------------------------------------------------------------------------------------
// BASE ALS STAAFJE MET PUZZELRAND (besluit Kamiel 27 okt 2026: geen ringen meer, overal simpele nucleotiden;
// dezelfde vorm als DNA 3–8, dnalib basePath). Recept: één staafje per base, alle basen even lang; de paarrand laat
// zien wie bij wie past (model): A punt ↔ T inkeping, C nok ↔ G sleuf. Daardoor is elke sport even lang (helix 2 nm breed).
// Bindingsplekken (stippen op de paarrand) en waterstofbruggen: A–T twee, G–C drie (goud als ze verbonden zijn).
// (x, y) = aanhechting aan de suiker; dir = +1 (base wijst omlaag) of −1 (omhoog); s = schaal (sport = 184·s, twee basen
// van DNA_BASE.len·s met een spleet ertussen). De naam baseRing blijft voor bestaande aanroepen.
// Bekende fouten: ringen (afgekeurd 27 okt 2026); basen van ongelijke lengte; randen die niet op elkaar passen.
// -------------------------------------------------------------------------------------
function _baseRand(b, px, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, f = 1 - Math.min(Math.abs(px) / hw, 1);
  if (b === 'A') return L - d + 2 * d * f; if (b === 'T' || b === 'U') return L + d - 2 * d * f;
  if (b === 'C') return Math.abs(px) <= tw ? L + d : L - d; return Math.abs(px) <= tw ? L - d : L + d; }
function basePuzzelPad(ctx, b, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, y0 = 8 * s;
  ctx.beginPath(); ctx.moveTo(-hw, y0); ctx.lineTo(hw, y0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); }
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke(); // steeltje naar de suiker
  basePuzzelPad(ctx, b, s); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); // letter rechtop
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 0.9; _bioCirc(ctx, px, _baseRand(b, px, s), 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, -4 * s, w * 1.4, L + 11 * s + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen tussen twee basen van een sport: y1 = paarlijn van base b (attach + DNA_BASE.len·s), y2 = paarlijn van de partner
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L), yb = y2 - sg * (_baseRand(c, px, s) - L); ctx.beginPath(); ctx.moveTo(x + px, ya + sg * 4 * s); ctx.lineTo(x + px, yb - sg * 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) { // v2 (26 okt 2026, frisse review DNA 1): base aan C1', C5' als knooppunt naar het fosfaat, optioneel OH aan C3'
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); } // 0 = ring-O, 1 = C1', 2 = C2', 3 = C3', 4 = C4'
  const c5 = [pt[4][0] - R * 0.75, pt[4][1] - R * 0.7]; // C5' (buiten de ring, aan C4')
  const px = c5[0] - R * 0.9 - e * 60 * s, py = c5[1] - R * 0.2 - e * 20 * s; // fosfaat aan C5'
  const bx = pt[1][0] + 16 * s + e * 30 * s, by = pt[1][1] + 6 * s + e * 50 * s; // base aan C1'
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(bx, by + 4 * s); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); _bioCirc(ctx, c5[0], c5[1], 4.5 * s, lighten(DNA_BASE.suiker, 0.2)); // ring-O, C5'
  baseRing(ctx, bx, by, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - R * 0.35, oy = pt[3][1] + R * 1.35; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 8 * s, oy - 8 * s); ctx.stroke(); text(ctx, 'OH', ox - 6 * s, oy + 12 * s, fTekst(24 * s, 700), hl === "3'" ? C.goud : C.text, 'center'); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    [[1, "1'"], [2, "2'"], [3, "3'"], [4, "4'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy), off = k === 1 ? -22 : 26; text(ctx, l, pt[k][0] + dx / d * 26 * s - (k === 2 ? 22 * s : 0), pt[k][1] + dy / d * 26 * s + 9 * s + (k === 1 ? off * s * 0.6 : 0), fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    text(ctx, "5'", c5[0] + 4 * s, c5[1] - 16 * s, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by + 60 * s], c3: pt[3], c5, c1: pt[1] };
}

// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX (één functie, morph met o.draai 0..1).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 baseparen per winding (0,34 nm per paar, 3,4 nm per winding),
// rechtsdraaiend, grote en kleine groef ongelijk (hier: de tweede streng loopt 140° i.p.v. 180° achter de eerste).
// Ruggengraat (suiker-fosfaat) buiten, basen binnen. Bij draai = 0 een platte ladder met de echte ringvormen.
// x0,y = begin van de as; dx = afstand per basepaar langs de as; seq = volgorde van de bovenste streng.
// o.open (array per sport 0..1) trekt sporten los; o.hl = index die goud omrand wordt. Achterkant donkerder (diepte).
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184; // sport = purine + pyrimidine vult precies de afstand tussen de ruggen
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e; // rechtsdraaiend: as naar rechts, bovenkant draait naar je toe
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? DNA_BASE.rugR : _mixHex(DNA_BASE.rugR, '#121A26', 0.5); ctx.lineWidth = voor ? 16 * s : 13 * s; ctx.stroke(); ctx.strokeStyle = voor ? DNA_BASE.rug : _mixHex(DNA_BASE.rug, '#121A26', 0.4); ctx.lineWidth = voor ? 9 * s : 7 * s; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen * (e > 0.05 ? (0.55 + 0.45 * (depth + 1) / 2) : 1);
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + DNA_BASE.len * k), B.y - dirAB * (8 * s + DNA_BASE.len * k), b, k, bruggenA * (1 - e * 2)); }
    else { const mid = A.y + (B.y - A.y) * 0.5; ctx.lineWidth = 11 * s; ctx.strokeStyle = DNA_BASE.base[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = DNA_BASE.base[c]; ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  // plekken van de groeven langs de bovenrand (voor labels): kleine groef tussen de toppen die 140° uit elkaar liggen
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}


// =====================================================================================
// ===== Toegevoegd 26 okt 2026 voor DNA 2 DNA kopiëren 2.0 (lichte remake; keuring twijfelscènes 25 okt 2026) =====
// DNA-replicatie: vorkmodel + vork (simulatie), DNA-polymerase (hand + klem), helicase-ring, primase, ligase,
// vrije nucleotide, baseRingRNA (U in ringvorm, teal), d2Base/d2Rug (basen in de ringvorm langs een gebogen streng),
// schaafwond op onderarm(). Lessen en registratie: lessen_dna.md (sectie DNA 2). Vereist dnaDraad niet; wel baseRing.
// =====================================================================================
// Vereist lib.js (C, rgba, lighten, ease, clamp, lerp, roundRect, shape, text, fTekst, metaText), lib_bio.js (_mixHex, _bioCirc,
// bioPad, enzymKluwen, huidDoorsnede, kernChromatine, onderarm), lib_micro_evo.js (dnaDraad), lib_cast.js (CAST, persoon).
//
// RECEPT DNA-REPLICATIE (bronnen: OpenStax-afgeleid 'DNA Replication in Prokaryotes' (Principles of Biology, CC BY); Leman & Noguchi
// 2013 Genes 4:1; Meselson & Stahl 1958 PNAS 44:671; BioNumbers 108756, 111200, 112260; zie bron/remake-2026-10/bronnen.md):
//  - DNA 2 nm breed, 0,34 nm per basenpaar (dx = 0,17 × breedte), rechtsdraaiend, ±10 bp per winding; vóór de vork blijft het DNA een
//    helix die meedraait als de helicase afwikkelt; achter de vork twee enkele strengen waarvan de basen naar elkaar toe wijzen.
//  - Nieuwe nucleotiden komen altijd aan het 3'-uiteinde: de nieuwe streng groeit 5' → 3', antiparallel aan de matrijs.
//  - Leidende streng: één primer bij het startpunt, daarna continu mét de vork mee. Volgende streng: per fragment een RNA-primer
//    (±10 nt, teal) van primase vlak achter de helicase, polymerase bouwt van de vork af tot het vorige fragment, vervangt die
//    primer door DNA, ligase sluit de knip. Okazaki-fragmenten bij eukaryoten 100–200 nt (hier korter getekend: 'niet op schaal').
//  - Helicase (eukaryoot: CMG) is een ring van zes eiwitten om de matrijs van de leidende streng en schuift 3' → 5' over die streng.
//  - Kleurbetekenis in deze film: oude (zware) streng = donker paars C.kern, nieuwe (lichte) streng = licht paars; RNA-primer teal;
//    enzymen grijsblauw #7A8BA8 met actief centrum goud (C9). Basen: de vier paarse reekstinten (A licht … G donker).
//  Bekende fouten: polymerase die 3' → 5' bouwt; Okazaki-fragmenten die naar de vork toe groeien; vork zonder primers;
//  een platte ladder vóór de vork; nucleotiden die al op de matrijs 'vastzitten' voordat het enzym er is.

var D2 = {
  oud: '#6E5A9E', oudR: '#A392D6', nieuw: '#B9ACE6', nieuwR: '#DCD4F5',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  rbase: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE', U: '#121A26' },
};
var D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
var d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];

// ---------- basen: de ringvorm van de DNA-reeks (baseRing uit lib_bio.js, besluit DNA 1 t2, 25 okt 2026) ----------
// RNA-base in dezelfde vorm (U = pyrimidine, zoals T), in de teal RNA-tinten (C1: RNA teal). Kandidaat voor lib_bio.js.
var RNA_BASE = { base: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, letter: { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' } };
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = o.geenLetter ? 'rgba(0,0,0,0)' : b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U' && !o.geenLetter) { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
// d2Base: base met voet op (x, y), wijst in richting ang; L = halve sport. Schaal zo dat purine + pyrimidine = 2L (één sport).
// Kleine basen (breedte < 9 px) als staafje in dezelfde tint (lessen_dna: ringen bij verkorting niet leesbaar).
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = DNA_BASE.len * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    ctx.beginPath(); ctx.rect(-hw, 0, hw * 2, len); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0; // wijst omhoog: dir −1
  // letter niet met de ring meedraaien: ring zonder letter tekenen, letter daarna rechtop in beeldcoördinaten (frisse review DNA 2, MOET 4)
  const k = (rna && b === 'U') ? 'T' : b, LB = rna ? RNA_BASE.letter : DNA_BASE.letter, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore();
  if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos;
  const m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), LB[b] || '#121A26', 'center'); ctx.restore(); }

// suiker-fosfaatruggengraat langs punten P (array [x,y]); o.kleur, o.bw, o.dots = indices waar een fosfaat staat
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }

// ---------- ENZYMEN ----------
// DNA-polymerase, zijaanzicht langs het DNA (recept: 'rechterhand' met handpalm, vingers en duim rond matrijs en nieuwe streng;
// vingers sluiten om een nucleotide die past; ringvormige klem (sliding clamp) houdt het enzym op het DNA). (x, y) = het actieve
// centrum (3'-uiteinde van de nieuwe streng), g = DNA-breedte in px, dir = +1 bouwt naar rechts / -1 naar links, up = +1 nieuwe streng
// boven de matrijs / -1 eronder. Twee lagen: polymeraseAchter vóór het DNA tekenen, polymeraseVoor erna.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  // lokaal: nieuwe streng op y = +0.5g? -> we werken met de nieuwe streng op y = -0.5g*(-1)... eenvoud: DNA-as op y = 0, nieuwe streng op +0.5g (na scale = boven bij up=1)
  // handpalm (achter het DNA, donker): grote vorm rond het basenpaar in het actieve centrum
  ctx.beginPath(); bioPad(ctx, [[-1.15 * g, -0.2 * g], [-0.95 * g, 0.95 * g], [-0.1 * g, 1.25 * g], [0.85 * g, 1.05 * g], [1.2 * g, 0.2 * g], [0.95 * g, -0.95 * g], [0.0, -1.2 * g], [-0.9 * g, -0.95 * g]], true);
  shape(ctx, D2.enzDD, _mixHex(D2.enzDD, '#FFFFFF', 0.25), 1.5);
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = '#8796B0'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = D2.enz, rand = hl > 0.01 ? _mixHex(D2.enzR, C.goud, hl) : D2.enzR, lw = hl > 0.01 ? 3 : 1.5;
  // duim: grijpt het nieuwe dubbelstrengs stuk achter het actieve centrum (boven de nieuwe streng)
  ctx.beginPath(); bioPad(ctx, [[-1.05 * g, 0.75 * g], [-0.75 * g, 1.22 * g], [-0.2 * g, 1.28 * g], [0.05 * g, 1.0 * g], [-0.35 * g, 0.78 * g], [-0.8 * g, 0.68 * g]], true); shape(ctx, vul, rand, lw);
  // vingers: boven de inkomende nucleotide; draaien omlaag als hij past (sluit 0 → 1)
  ctx.save(); ctx.translate(0.3 * g, 1.0 * g); ctx.rotate(lerp(0.62, -0.06, ease(sluit)));
  ctx.beginPath(); bioPad(ctx, [[0.0, 0.0], [0.2 * g, 0.32 * g], [0.75 * g, 0.3 * g], [1.0 * g, 0.0], [0.85 * g, -0.22 * g], [0.35 * g, -0.12 * g]], true); shape(ctx, vul, rand, lw);
  ctx.strokeStyle = rgba(_mixHex(vul, '#FFFFFF', 0.35), 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0.25 * g, 0.12 * g); ctx.lineTo(0.8 * g, 0.08 * g); ctx.stroke(); ctx.restore();
  // onderkaak onder de matrijs
  ctx.beginPath(); bioPad(ctx, [[-0.9 * g, -0.72 * g], [-0.6 * g, -1.18 * g], [0.3 * g, -1.22 * g], [0.95 * g, -0.95 * g], [1.05 * g, -0.68 * g], [0.2 * g, -0.74 * g]], true); shape(ctx, vul, rand, lw);
  // actief centrum (goud): de holte boven het volgende matrijsbasisje
  const pk = lerp(0.3, 0.18, ease(sluit)); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.5 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, pk * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#A4B2CA'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }

// helicase: ring van zes eiwitten (scheef gezien) om één streng; (x, y) = midden van de ring op die streng; r = straal; fase = draaien
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kralen = []; for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + fase; kralen.push([x + Math.sin(an) * r * 0.42, y + Math.cos(an) * r, Math.sin(an + 1.57) /*diepte*/, an]); }
  kralen.sort((p, q) => p[2] - q[2]);
  kralen.forEach(([kx, ky, z]) => { const voor = z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const vul = voor ? '#8E9CB8' : D2.enzD; ctx.beginPath(); ctx.ellipse(kx, ky, r * 0.4, r * 0.36, 0, 0, 6.283); shape(ctx, vul, hl > 0.01 && voor ? _mixHex(D2.enzR, C.goud, hl) : _mixHex(vul, '#FFFFFF', 0.3), hl > 0.01 && voor ? 3 : 1.5); });
  ctx.restore(); }
// primase en ligase: kleinere enzymen (kluwen met goud actief centrum, lib_bio enzymKluwen)
function primase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#6F86A0', seed: 2 }, o)); }
function ligase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#8392AE', seed: 7 }, o)); }

// vrije DNA-nucleotide: fosfaat + suiker (vijfhoek) + base; vereenvoudigd (in het kernplasma eigenlijk met drie fosfaatgroepen)
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links, base wijst omhoog (-y)
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, D2.oud, rand || D2.oudR, rand ? 3 : 1.5);
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-24 * s, 8 * s); ctx.stroke();
  _bioCirc(ctx, -30 * s, 9 * s, 9 * s, D2.oudR, rand || '#D8CFF2', rand ? 3 : 1.2);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }

// ---------- REPLICATIEVORK ----------
// st = { f: vorkpositie (bp), i0, i1: zichtbaar bereik (bp), X0: x van bp i0, cy, g: breedte (px), dx (px per bp; standaard 0,17 g),
//        Dmax: halve afstand tussen de dochters, Lsplit (bp), Ltw (bp), Lf: lengte Okazaki-fragment (bp), pl: primerlengte (bp),
//        p1: eerste primer van de volgende streng (bp), vlag: snelheid lagging-polymerase t.o.v. de vork, t: tijd (rustige beweging),
//        toon: {helicase, poly, primase, ligase, nieuw}, letters: bool, startLead: bp van de leidende primer }
// Geeft posities terug voor labels.
function vorkModel(st) { const S = Object.assign({ i0: 0, i1: 120, X0: 80, cy: 450, g: 56, Dmax: 210, Lsplit: 14, Ltw: 12, Lf: 30, pl: 4, p1: 12, vlag: 1.35, startLead: 0, lead: 3 }, st);
  S.dx = S.dx || S.g * 0.17; const X = (i) => S.X0 + (i - S.i0) * S.dx;
  const D = (i) => i >= S.f ? S.g / 2 : S.g / 2 + (S.Dmax - S.g / 2) * ease((S.f - i) / S.Lsplit);
  const yT = (i) => S.cy - D(i), yB = (i) => S.cy + D(i);
  // Okazaki-fragmenten
  const frags = []; for (let k = 1; ; k++) { const p = S.p1 + (k - 1) * S.Lf; if (p - S.pl > S.f + 2) break;
    const a = p + 2, e = a + S.pl * 0.5; const primN = clamp((S.f - a) / (S.pl * 0.5), 0, 1) * S.pl; // aantal primerbasen
    const ondergrens = k === 1 ? S.startLead : S.p1 + (k - 2) * S.Lf - S.pl + 1;     // tot waar de polymerase doorbouwt (incl. vervangen primer vorige)
    const q = Math.max(ondergrens, p - S.pl + 1 - Math.max(0, S.f - e) * S.vlag);     // 3'-uiteinde (linkerkant)
    const klaar = q <= ondergrens + 0.01, fKlaar = e + (p - S.pl + 1 - ondergrens) / S.vlag;
    frags.push({ k, p, a, e, primN, q, klaar, fKlaar, ondergrens }); }
  // per bp: wat zit er op de nieuwe onderstreng? 0 = niets, 1 = DNA, 2 = RNA-primer
  const onder = (i) => { for (const F of frags) { const lo = F.p - S.pl + 1; if (i <= F.p && i >= F.p - F.primN + 1 && i >= lo) { // primerdeel van dit fragment
        const vervangen = frags.some(G => G.k === F.k + 1 && G.q <= i); return vervangen ? 1 : 2; }
      if (i < lo && i >= F.q) return 1; } return 0; };
  // ligase-knippen: na het vervangen van een primer wordt de knip bij (p_vorige - pl + 0.5) gedicht
  const knips = frags.filter(F => F.k >= 2).map(F => { const prev = frags[F.k - 2]; const xN = prev.p - S.pl + 0.5; const tKl = F.fKlaar; return { i: xN, s: clamp((S.f - tKl) / 4, 0, 1), k: F.k }; });
  return Object.assign(S, { X, D, yT, yB, frags, onder, knips }); }

function vorkTeken(ctx, st) { const M = vorkModel(st); const { g, dx, cy, f, i0, i1, X, yT, yB } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, nieuw: 1, lead: 1, lag: 1 }, M.toon || {});
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1.6, dx * 0.34), vorm = dx >= 22, letters = !!M.letters && dx >= 30;
  const iA = Math.floor(i0), iB = Math.ceil(i1);
  // --- vóór de vork: helix die meedraait (fase volgt f) ---
  const tw = (i) => ease((i - f) / M.Ltw), fase = (i) => (i / 10) * 6.283 - f * 0.628 + 0.6;
  const Ytop = (i) => i <= f ? yT(i) : cy + lerp(-g / 2, -g / 2 * Math.cos(fase(i)), tw(i)), Ybot = (i) => i <= f ? yB(i) : cy + lerp(g / 2, g / 2 * Math.cos(fase(i) + 2.3), tw(i));
  const Ztop = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i)), tw(i)), Zbot = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i) + 2.3), tw(i));
  const pts = (fy, a, b) => { const P = []; for (let i = a; i <= b + 1e-6; i += 0.25) P.push([X(i), fy(i)]); return P; };
  // achterkant van de helix eerst
  const helixDeel = (fy, fz, kleur, voor) => { let cur = []; const segs = []; for (let i = Math.max(f, iA); i <= iB; i += 0.25) { const z = fz(i) >= 0; if (z === voor) cur.push([X(i), fy(i)]); else { if (cur.length > 1) segs.push(cur); cur = []; } } if (cur.length > 1) segs.push(cur);
    segs.forEach(P => d2Rug(ctx, P, { kleur: voor ? kleur : _mixHex(kleur, '#000000', 0.35), bw })); };
  helixDeel(Ytop, Ztop, D2.oud, false); helixDeel(Ybot, Zbot, D2.oud, false);
  // sporten vóór de vork
  for (let i = Math.max(Math.ceil(f), iA); i <= iB; i++) { const xa = X(i), ya = Ytop(i), yb = Ybot(i), mid = (ya + yb) / 2, b = d2seq(i); const z = (Ztop(i) + Zbot(i)) / 2; const dk = z < 0 ? 0.3 : 0;
    const Lh = Math.abs(yb - ya) / 2 - bw * 0.4; if (Lh < 2) continue; ctx.save(); ctx.globalAlpha *= z < 0 ? 0.8 : 1;
    d2Base(ctx, xa, ya + Math.sign(yb - ya) * bw * 0.4, yb > ya ? Math.PI / 2 : -Math.PI / 2, b, Lh, hw, { vorm: false }); d2Base(ctx, xa, yb - Math.sign(yb - ya) * bw * 0.4, yb > ya ? -Math.PI / 2 : Math.PI / 2, D2.comp[b], Lh, hw, { vorm: false }); ctx.restore(); }
  helixDeel(Ytop, Ztop, D2.oud, true); helixDeel(Ybot, Zbot, D2.oud, true);
  // --- achter de vork: twee matrijzen + nieuwe strengen ---
  const iF = Math.min(f, iB);
  if (iF > iA) {
    // helling per bp (voor schuine basen)
    const ang = (fy, i, sgn) => { const d = (fy(i + 0.3) - fy(i - 0.3)) / (0.6 * dx); return Math.atan2(1, -d) * sgn; };
    // nieuwe strengen: leidende (boven, onder de bovenmatrijs) en volgende (onder)
    const leadEind = Math.min(iF - M.lead, iB), leadStart = Math.max(M.startLead, iA);
    const yTn = (i) => yT(i) + g, yBn = (i) => yB(i) - g;
    // matrijs-basen + nieuwe basen per bp
    for (let i = iA; i <= iF; i++) { const b = d2seq(i), xa = X(i);
      const nT = toon.nieuw && toon.lead && i >= leadStart && i <= leadEind; const nB = toon.nieuw && toon.lag ? M.onder(i) : 0;
      const aT = Math.atan2(yT(i + 0.3) - yT(i - 0.3), 0.6 * dx), aB = Math.atan2(yB(i + 0.3) - yB(i - 0.3), 0.6 * dx);
      const primLead = i < M.startLead + M.pl;
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, letter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, letter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, letter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, letter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      const knip = (i) => M.knips.some(K => K.s < 1 && Math.abs(K.i - i) < 0.01);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - (knip(R.a - 0.5) ? 0.12 : 0.45), R.b + (knip(R.b + 0.5) ? 0.12 : 0.45)), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }

// enzymen op de vork (na vorkTeken: polymerase heeft een achterlaag; daarom tekent vorkEnzymen het DNA niet opnieuw maar legt de voorkant erover)
function vorkEnzymen(ctx, M, o = {}) { const { g, f, X, yT, yB, dx } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, lead: 1, lag: 1 }, M.toon || {}); const hl = o.hl || {}; const out = {};
  const gp = g * 0.55; // grootte enzym t.o.v. DNA (vereenvoudigd: in het echt groter)
  // helicase op de bovenste streng (matrijs van de leidende streng), net vóór de vork
  if (toon.helicase) { const hx = X(f + 0.6), hy = yT(f) ; helicaseRing(ctx, hx, hy, g * 0.62, { fase: t * 2.4 + f * 0.5, laag: 'voor', hl: hl.helicase || 0 }); out.helicase = [hx, hy]; }
  // leidende polymerase
  if (toon.poly && toon.lead && M.leadEind > M.startLead) { const i = M.leadEind + 0.5, x = X(i), yc = (yT(i) + M.yTn(i)) / 2; const rot = Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx);
    polymeraseVoor(ctx, x, yc, gp, { dir: 1, up: -1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6), hl: hl.poly || 0 }); out.polyLead = [x, yc]; }
  // volgende streng: polymerase op het actieve fragment (of in de sprong naar de volgende primer)
  if (toon.poly && toon.lag && M.frags.length) { let F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); let x, y, rot = 0;
    if (F) { const i = F.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; rot = Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx); }
    else { const done = [...M.frags].reverse().find(F => F.klaar), nxt = M.frags.find(G => !G.klaar && (!done || G.k > done.k));
      if (done && nxt) { const u = clamp((f - done.fKlaar) / Math.max(0.5, nxt.e - done.fKlaar), 0, 1), i0 = done.q - 0.5, i1 = nxt.p - M.pl + 0.5; const ii = lerp(i0, i1, ease(u));
        x = X(ii); y = (yB(ii) + M.yBn(ii)) / 2 + Math.sin(Math.PI * ease(u)) * g * 1.6; } else if (done) { const i = done.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; } }
    if (x != null && (M.lagA == null ? 1 : M.lagA) > 0.01) { polymeraseVoor(ctx, x, y, gp, { dir: -1, up: 1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6 + 1), hl: hl.poly || 0, a: M.lagA == null ? 1 : M.lagA }); out.polyLag = [x, y]; } }
  // primase: bij de nieuwste primer, vlak achter de helicase
  if (toon.primase) { const F = [...M.frags].reverse().find(F => F.primN > 0.01); if (F && (F.primN < M.pl - 0.01 || f - F.e < 1.8)) { const i = F.p - F.primN + 0.5, x = X(i), y = M.yBn(i) + g * 0.55; primase(ctx, x, y, g * 0.42, { an: 0.4, hl: hl.primase || 0 }); out.primase = [x, y]; } }
  // ligase bij een knip die gedicht wordt
  if (toon.ligase) { const K = M.knips.find(K => K.s > 0 && K.s < 1); if (K) { const x = X(K.i), y = M.yBn(K.i) + g * 0.48; ligase(ctx, x, y, g * 0.55, { an: -1.2, sluit: K.s, hl: hl.ligase || 0 });
      if (K.s > 0.6) { ctx.save(); ctx.globalAlpha *= (1 - K.s) * 2.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, M.yBn(K.i), g * 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } out.ligase = [x, y]; } }
  return out; }
// achterlagen van de polymerasen (vóór vorkTeken aanroepen met hetzelfde model; vorkModel is goedkoop)
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + 0.6), yT(f), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx), a: st.lagA == null ? 1 : st.lagA }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }

// ---------- SCHAAFWOND op een onderarm (zelfde transformatie als onderarm: elleboog (x, y), s px per cm, kijk) ----------
// heel 0 = vers (rauw, rood, puntjes), 0,35 = korst, 0,7 = roze nieuwe huid, 1 = genezen. Recept (wondgenezing: stolsel/korst binnen
// uren, nieuwe opperhuid groeit vanaf de randen onder de korst in ±1 week): vlakke vormen, geen bloed dat druppelt.
function schaafwond(ctx, x, y, s, o = {}) { const { heel = 0, kijk = 1, a = 1, cx = 13, cyy = 0.6, rx = 2.6, ry = 1.25, seed = 3 } = o; if (a <= 0.01 || heel >= 0.999) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s);
  const rand = (k) => { const P = []; for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283; const w = 1 + 0.13 * Math.sin(an * 3 + seed) + 0.08 * Math.sin(an * 7 + seed * 2); P.push([cx + Math.cos(an) * rx * w * k, cyy + Math.sin(an) * ry * w * k]); } return P; };
  const huid = (CAST && CAST.noor && CAST.noor.huid) || '#D9A982';
  const vers = 1 - ease(heel / 0.35), korst = ease(heel / 0.35) * (1 - ease((heel - 0.55) / 0.2)), roze = ease((heel - 0.55) / 0.2) * (1 - ease((heel - 0.8) / 0.2));
  if (vers > 0.01) { ctx.save(); ctx.globalAlpha *= vers; ctx.beginPath(); bioPad(ctx, rand(1.12), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.35); ctx.fill();
    ctx.beginPath(); bioPad(ctx, rand(0.95), true); ctx.fillStyle = '#B84A44'; ctx.fill();
    for (let i = 0; i < 22; i++) { const u = hash(seed + i), v = hash(seed + i * 7); _bioCirc(ctx, cx + (u - 0.5) * rx * 1.6, cyy + (v - 0.5) * ry * 1.4, 0.07 + 0.05 * hash(i), '#7E2A2A'); }
    ctx.strokeStyle = rgba('#F0C8B8', 0.6); ctx.lineWidth = 0.06; for (let i = 0; i < 7; i++) { const yy = cyy - ry * 0.7 + i * ry * 0.23; ctx.beginPath(); ctx.moveTo(cx - rx * 0.7, yy); ctx.lineTo(cx + rx * 0.6, yy + 0.1); ctx.stroke(); } ctx.restore(); }
  if (korst > 0.01) { ctx.save(); ctx.globalAlpha *= korst; ctx.beginPath(); bioPad(ctx, rand(1.08), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.25); ctx.fill();
    const kk = 0.95 - 0.35 * ease((heel - 0.35) / 0.3); ctx.beginPath(); bioPad(ctx, rand(kk), true); ctx.fillStyle = '#6A3428'; ctx.fill(); ctx.strokeStyle = '#4E241C'; ctx.lineWidth = 0.08; ctx.stroke();
    ctx.strokeStyle = rgba('#8E4A38', 0.8); ctx.lineWidth = 0.05; for (let i = 0; i < 9; i++) { const u = hash(seed * 3 + i) - 0.5, v = hash(seed * 5 + i) - 0.5; ctx.beginPath(); ctx.moveTo(cx + u * rx * kk, cyy + v * ry * kk); ctx.lineTo(cx + u * rx * kk + 0.3, cyy + v * ry * kk + 0.12); ctx.stroke(); } ctx.restore(); }
  if (roze > 0.01) { ctx.save(); ctx.globalAlpha *= roze; ctx.beginPath(); bioPad(ctx, rand(1.0), true); ctx.fillStyle = _mixHex(huid, '#E89A9A', 0.4); ctx.fill(); ctx.restore(); }
  ctx.restore(); }


// =====================================================================================
// GESLACHTSORGANEN EN PUBERTEIT 2.0 (26 okt 2026): hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema,
// schaalStreep. Vereist ook hormoonVorm (lib_hormonen.js). Status: in de film, wacht op Kamiels keuring.
// =====================================================================================
// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 2 (gebruikt in de film 26 okt 2026; nog niet door Kamiel gekeurd als bibliotheekobject). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
var HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, vorm, k] = HORM[soort];
  hormoonVorm(ctx, x, y, r * k, vorm, a, col);
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); } // C8: één deeltje volgen, goud omlijnd (geen gloed)
}

// =====================================================================================
// HYPOTHALAMUS EN HYPOFYSE MET HET POORTADERSYSTEEM (mediaan, voorkant = rechts).
// Recept: GnRH-cellen liggen in de hypothalamus; hun axonen eindigen in de eminentia mediana bovenaan het steeltje,
// waar ze GnRH afgeven aan een eerste haarvatnet. Poortaders lopen langs het steeltje naar een tweede haarvatnet in de
// VOORkwab; daar maken dezelfde cellen (gonadotrofe cellen) FSH en LH, die via een ader het lichaam in gaan. De
// achterkwab (zenuwweefsel) is de voortzetting van het steeltje. Hypofyse ± 1 cm (erwt), in het Turkse zadel.
// Bron: Kenhub 'Pituitary gland' (portaalsysteem naar de voorkwab, gonadotrofe cellen maken FSH en LH);
// StatPearls 'Physiology, Puberty' (GnRH in stoten). Bekende fouten: GnRH dat 'door de lucht' naar de hypofyse
// zweeft; FSH/LH uit de achterkwab; hypofyse los onder de hersenen.
// Ontwerpeenheden: ± 900 × 760, oorsprong = onderkant van de hypothalamus (bovenkant steeltje).
// o: puls 0..1 (stoot GnRH loopt door de poortaders: 0 = net afgegeven, 1 = in de voorkwab), aan 0..1 (cellen
// voorkwab maken FSH/LH), uit 0..1 (FSH/LH in de uitgaande ader), stoten 0..1 (hoe vaak: kindertijd → puberteit), t.
// =====================================================================================
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hypothalamusweefsel (boven) als zachte band, met de derde hersenkamer als spleet in het midden
  ctx.beginPath(); bioPad(ctx, [P(-430, -330), P(-200, -360), P(200, -360), P(430, -330), P(430, -70), P(150, -40), P(60, 0), P(-60, 0), P(-150, -40), P(-430, -70)], true);
  shape(ctx, rgba(BIO.brein, 0.32), rgba(BIO.breinS, 0.7), 2);
  ctx.beginPath(); bioPad(ctx, [P(-14, -360), P(-10, -200), P(0, -90), P(10, -200), P(14, -360)], true); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill();
  // Turks zadel (bot) onder de hypofyse
  ctx.beginPath(); bioPad(ctx, [P(-300, 210), P(-250, 330), P(-60, 420), P(140, 420), P(300, 340), P(350, 220)], false); ctx.strokeStyle = rgba(BIO.bot, 0.7); ctx.lineWidth = 16 * s; ctx.stroke();
  // achterkwab (zenuwweefsel, links) en voorkwab (klierweefsel, rechts)
  const ACHTER = [P(-40, 150), P(-170, 170), P(-215, 250), P(-170, 330), P(-60, 340), P(-10, 280), P(0, 190)];
  ctx.beginPath(); bioPad(ctx, ACHTER, true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  const VOOR = [P(10, 140), P(140, 120), P(270, 170), P(300, 260), P(240, 345), P(90, 370), P(0, 330), P(-10, 240)];
  ctx.beginPath(); bioPad(ctx, VOOR, true); shape(ctx, rgba('#C98A6A', 0.38), rgba('#E0A88A', 0.85), 2.5);
  // cellen in de voorkwab (Voronoi), de gonadotrofe cellen lichten op bij 'aan'
  const pts = []; for (let i = 0; i < 46; i++) { const rr = 16 * Math.sqrt(i + 0.6), an = i * 2.39996; pts.push([150 + Math.cos(an) * rr * 1.25, 250 + Math.sin(an) * rr * 0.95]); }
  const cellen = _bioVoronoi('hypVoor', pts, 20, 3, 20);
  ctx.save(); ctx.beginPath(); bioPad(ctx, VOOR, true); ctx.clip();
  cellen.forEach((c, i) => { const gon = i % 3 === 0; const g = gon ? aan : 0;
    ctx.beginPath(); c.pts.forEach((p, k) => { const q = P(p[0], p[1]); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    shape(ctx, gon ? _mixHex('#D9A48F', '#8FD0E8', g * 0.6) : rgba('#D9A48F', 0.55), rgba('#F2D6C4', 0.5), 1);
    const q = P(c.c[0], c.c[1]); ctx.beginPath(); ctx.arc(q[0], q[1], 4.5 * s, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); });
  ctx.restore();
  // steeltje
  ctx.beginPath(); bioPad(ctx, [P(-60, 0), P(-40, 80), P(-40, 160), P(30, 160), P(40, 80), P(60, 0)], true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  // GnRH-cellen in de hypothalamus met axonen naar de eminentia mediana
  const cel = [[-260, -250], [-120, -290], [210, -270]]; const eind = [];
  cel.forEach(([cx, cy], i) => { const [qx, qy] = P(cx, cy); const e = zenuwcel(ctx, qx, qy, { s: s * 0.9, col: '#B79AE6', naar: P(-16 + i * 16, -20), seed: i + 2, takken: 5, axonDik: 4, puls: puls >= 0 && puls < 0.25 ? puls * 4 : -1 }); eind.push(e); });
  // eerste haarvatnet (bovenaan het steeltje) → poortaders → tweede haarvatnet in de voorkwab
  const PA = [[[-10, -10], [-4, 60], [30, 120], [90, 170], [140, 220]], [[20, -10], [36, 60], [80, 110], [170, 160], [230, 230]]];
  PA.forEach((pa, i) => bloedvat(ctx, pa.map(p => P(p[0], p[1])), 8 * s, t + i * 0.3, { n: 4, cel: 5 * s, speed: 0.12, haarvat: true }));
  ctx.strokeStyle = rgba(BIO.bloed, 0.8); ctx.lineWidth = 3 * s; for (let k = -2; k <= 2; k++) { ctx.beginPath(); bioPad(ctx, [P(-40 + k * 8, -6), P(-20 + k * 12, -30), P(10 + k * 10, -8), P(40 + k * 6, -24)], false); ctx.stroke(); }
  // GnRH-stoot: deeltjes van de axoneinden langs de poortaders naar de voorkwab
  if (puls >= 0) { const u = clamp(puls, 0, 1); for (let i = 0; i < 12; i++) { const pa = PA[i % 2]; const f = clamp(u * 1.25 - (i / 12) * 0.25, 0, 1); if (f <= 0.001 || f >= 0.999) continue;
      const D = bioDicht(pa.map(p => P(p[0], p[1])), 12); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i) - 0.5) * 6 * s, py, 'gnrh', 7 * s, Math.min(1, (1 - f) * 6)); } }
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (naar rechtsonder)
  const UIT = [P(250, 300), P(330, 350), P(420, 420), P(520, 470)];
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}

// =====================================================================================
// MANNELIJKE GESLACHTSORGANEN, mediane doorsnede (zijaanzicht, buik = rechts), OP SCHAAL (1 cm = 14 px bij s = 1).
// Recept (cm): zaadbal 4–5 lang, bijbal 4–5 langs de achterkant; zaadleider ± 30 cm: vanaf de staart van de bijbal
// omhoog in de zaadstreng, door het lieskanaal de buik in, met een boog óver de urineleider naar de ACHTERkant van de
// blaas, verwijdt tot ampulla; zaadblaasje 4–5 × 1,5–2,5 tegen de achterkant van de blaas, boven de prostaat; samen
// vormen ze de spuitbuis die DOOR de prostaat in de urinebuis uitkomt; prostaat 3 × 4 × 5 (walnoot) onder de blaashals
// rond de urinebuis; schaambeen vóór de blaas, endeldarm achter prostaat en zaadblaasjes. Penis in rust ± 9 cm.
// Bron: OpenStax A&P 27.1 (maten zaadbal, route, aandelen sperma); Semmelweis anatomie (zaadleider ± 30 cm, over de
// urineleider, zaadblaasje, prostaat 3 × 4 × 5); Yale Guided Anatomy (zaadleider naar de achterkant van de blaas).
// Bekende fouten: zaadleider die rechtstreeks vanaf de zaadbal naar de prostaat loopt; zaadblaasje vóór de blaas;
// prostaat boven de blaas; zaadleider die in de blaas uitkomt.
// Oorsprong = bovenkant schaambeenvoeg. o.hl = { zaadbal, bijbal, leider, blaasjes, prostaat, blaas, buis, lies } 0..1,
// o.kring 0..1 (kringspier blaashals dicht), o.zw 0..1 (zwellichamen vol), o.dim = lijst van delen die 35 % krijgen.
// Geeft { P(cmX, cmY), route: [...px], naam: {deel: [x,y]} } terug.
// =====================================================================================
var MD = { k: 14 };
var MD_VAS = [[-0.3, 13.6], [-0.75, 11.4], [-0.2, 8.6], [1.3, 5.4], [1.7, 2.2], [1.4, -0.6], [0.4, -2.6], [-1.6, -3.7], [-4.2, -3.6], [-6.6, -2.4], [-7.6, -0.4], [-7.3, 1.6], [-6.5, 3.1], [-5.3, 4.2], [-3.9, 4.9]];
var MD_URE = [[-3.4, 3.1], [-3.4, 4.6], [-3.1, 6.2], [-2.4, 7.3], [-0.9, 7.7], [0.9, 7.2], [2.1, 6.9], [2.6, 8.2], [2.72, 10.5], [2.8, 13.4], [3.0, 14.75]]; // urinebuis langs de onderkant (kant van de balzak) in het kleine zwellichaam
var MD_BIJ = [[0.25, 9.95], [-0.45, 10.6], [-0.75, 12.0], [-0.55, 13.2], [-0.3, 13.6]];
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5), ureter: P(-10.3, -4.2) };
  if (a <= 0.01) return { P, route, naam };
  const al = d => (dim.includes(d) ? 0.35 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); shape(ctx, rgba(BIO.huid, 0.13), rgba(BIO.huid, 0.6), 2);
  // endeldarm (achter)
  ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.55); ctx.lineWidth = 3.0 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore();
  // schaambeen(voeg)
  ctx.save(); ctx.globalAlpha *= al('bot'); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.6), BIO.botS, 2); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas; de zaadleider kruist er in een boog óverheen) — eigen tint (urine), dunner
  const UL = Ps([[-11.4, -9.0], [-10.4, -4.4], [-8.9, -1.3], [-7.3, 0.1], [-6.3, 0.9]]);
  ctx.save(); ctx.globalAlpha *= al('ureter'); ctx.strokeStyle = '#7FB8C4'; ctx.lineWidth = 0.22 * k; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(C.teal, 0.22), C.teal, 2.5);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.strokeStyle = rgba(C.teal, 0.45); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.5), lighten(C.groen, 0.3), 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba(C.paars, 0.55), lighten(C.paars, 0.3), 2); ctx.restore();
  // zwellichamen + penis (rust ± 9 cm; zw maakt ze iets voller)
  ctx.save(); ctx.globalAlpha *= al('penis'); const zb = 1 + 0.12 * zw;
  ctx.beginPath(); bioPad(ctx, Ps([[0.9, 6.0], [2.6, 6.2], [3.9 * zb, 8.6], [4.05 * zb, 13.0], [3.7, 14.6], [3.1, 14.9], [2.55, 13.8], [2.45, 9.4], [2.0, 7.6], [0.7, 7.0]]), true); shape(ctx, rgba(BIO.huid, 0.22), rgba(BIO.huid, 0.75), 2);
  ctx.beginPath(); bioPad(ctx, Ps([[1.6, 6.3], [2.9, 6.5], [3.8 * zb, 8.8], [3.85 * zb, 12.9], [3.5, 13.6], [3.05, 12.8], [3.0, 9.0], [2.6, 7.2]]), true); shape(ctx, _mixHex('#8A4A48', '#B5302C', zw), rgba('#C97A70', 0.8), 1.2);
  ctx.restore();
  // zaadbal (in de balzak) met kronkelige zaadbuisjes en bijbal langs de achterkant
  ctx.save(); ctx.globalAlpha *= al('balzak'); ctx.beginPath(); bioPad(ctx, Ps([[-0.9, 10.2], [-1.5, 12.4], [-0.9, 14.6], [1.0, 15.3], [2.5, 14.4], [2.6, 12.0], [2.2, 9.9], [0.7, 9.4]]), true); shape(ctx, rgba(BIO.huid, 0.2), rgba(BIO.huid, 0.7), 2); ctx.restore();
  gl(P(1.0, 12.0), 3.0, '#D9A48F', hl.zaadbal || 0);
  ctx.save(); ctx.globalAlpha *= al('zaadbal'); const [zx, zy] = P(1.0, 12.0); ctx.translate(zx, zy); ctx.rotate(0.22); ctx.beginPath(); ctx.ellipse(0, 0, 1.3 * k, 2.2 * k, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.8), lighten('#D9A48F', 0.3), 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A4438', 0.6); ctx.lineWidth = 1.6; for (let r = 0; r < 6; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = (-1 + 2 * u) * 1.2 * k, py = (-1.8 + r * 0.7) * k + Math.sin(u * 22 + r) * 0.22 * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); ctx.restore();
  gl(P(-0.5, 11.8), 1.8, C.oker, hl.bijbal || 0);
  ctx.save(); ctx.globalAlpha *= al('bijbal'); ctx.strokeStyle = C.oker; ctx.lineWidth = 0.75 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_BIJ), false); ctx.stroke(); ctx.restore();
  // zaadleider
  { const [gx, gy] = P(-7.5, -0.1); ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, 0.8 * k, 0, 6.283); ctx.clip(); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 0.64 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke(); ctx.restore(); } // uitsparing: zaadleider ligt óver de urineleider
  const leid = hl.leider || 0; ctx.save(); ctx.globalAlpha *= al('leider'); ctx.strokeStyle = C.goud; ctx.lineWidth = (0.3 + 0.12 * leid) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke();
  const [ax, ay] = P(-7.25, 1.4); ctx.beginPath(); ctx.ellipse(ax, ay, 0.35 * k, 0.8 * k, 0.3, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); // ampulla
  // lieskanaal (schuine opening in de buikwand)
  if ((hl.lies || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.lies; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; const [lx, ly] = P(1.0, -1.6); ctx.beginPath(); ctx.ellipse(lx, ly, 0.9 * k, 1.8 * k, 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // urinebuis
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = (0.22 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE. Recept: twee zwellichamen (corpora cavernosa) naast elkaar aan de bovenkant, elk met een
// slagader in het midden, samen in een stevig vlies; één kleiner zwellichaam (corpus spongiosum) onderaan met de
// urinebuis erin; huid erom. Bij een erectie lopen de holten van de bovenste zwellichamen vol met bloed: ze worden
// groter en ronder, het vlies spant en drukt de afvoerende aders dicht. Bron: OpenStax A&P 27.1; MSD Manual 'Structure
// of the male reproductive system'. Bekende fouten: één buis; urinebuis in de bovenste zwellichamen.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = r * (1 + 0.22 * vul);
  ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), rgba(BIO.huid, 0.9), 2);
  const cr = R * (0.42 + 0.04 * vul);
  for (const d of [-1, 1]) { const cx = x + d * R * 0.44, cy = y - R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.283); shape(ctx, _mixHex('#7A3E44', '#B02A2A', vul), '#E8D8DE', 2.5 + 1.5 * vul);
    for (let i = 0; i < 22; i++) { const an = i * 2.39996, rr = cr * 0.85 * Math.sqrt((i + 0.5) / 22); const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
      ctx.beginPath(); ctx.arc(px, py, cr * (0.06 + 0.08 * vul), 0, 6.283); ctx.fillStyle = rgba(vul > 0.5 ? '#E05A4A' : '#3A1A22', 0.8); ctx.fill(); }
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.12, 0, 6.283); shape(ctx, '#C2453E', '#F0B0A0', 1.2); }
  const sx = x, sy = y + R * 0.52; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3, R * 0.26, 0, 0, 6.283); shape(ctx, rgba('#9A5A5A', 0.8), '#E8D8DE', 1.5);
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12, R * 0.03, 0, 0, 6.283); ctx.fillStyle = '#C9CED6'; ctx.fill();
  ctx.restore(); return { cav: [x - R * 0.44, y - R * 0.18], spons: [sx, sy], R };
}

// =====================================================================================
// BUITENKANT VROUW (vulva), vooraanzicht, vlak schema. Recept: van boven naar onder in de middellijn: venusheuvel,
// clitoris (eikel met voorhuid) waar de kleine schaamlippen vooraan samenkomen, opening van de urinebuis, opening van
// de vagina, dan het perineum en de anus; grote schaamlippen aan de buitenkant, kleine schaamlippen erbinnen.
// Bron: OpenStax A&P 27.2 ('clitoris waar de kleine schaamlippen vooraan samenkomen'; vaginaopening tussen
// urinebuisopening en anus). Bekende fouten: urinebuis in de vagina; clitoris onder de urinebuis.
// Ontwerpeenheden: ± 260 × 460, oorsprong = vaginaopening. o.hl = { cli, buis, vag, lip } 0..1.
// =====================================================================================
function vulvaSchema(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const naam = { cli: P(0, -128), buis: P(0, -66), vag: P(0, 0), groot: P(-102, -10), klein: P(-44, -40), anus: P(0, 150) };
  if (a <= 0.01) return naam; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const HUID = BIO.huid, D = _bioDonker(HUID, 0.25);
  ctx.beginPath(); ctx.ellipse(...P(0, -168), 105 * s, 40 * s, 0, 0, 6.283); ctx.fillStyle = rgba(HUID, 0.1); ctx.fill(); // venusheuvel
  for (const d of [-1, 1]) { // grote schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 14, -170), P(d * 86, -130), P(d * 108, -10), P(d * 70, 100), P(d * 12, 118), P(d * 28, 40), P(d * 40, -60), P(d * 26, -150)], true);
    shape(ctx, rgba(HUID, 0.5 + 0.2 * (hl.lip || 0)), rgba(D, 0.9), 2); }
  for (const d of [-1, 1]) { // kleine schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 4, -126), P(d * 34, -96), P(d * 44, -20), P(d * 30, 60), P(d * 6, 84), P(d * 14, 10), P(d * 16, -70)], true);
    shape(ctx, rgba('#C98A8A', 0.75), rgba('#A8646A', 0.9), 1.8); }
  ctx.beginPath(); bioPad(ctx, [P(-20, -150), P(0, -158), P(20, -150), P(14, -128), P(-14, -128)], true); shape(ctx, rgba('#C98A8A', 0.85), '#A8646A', 1.5); // voorhuid clitoris
  ctx.beginPath(); ctx.ellipse(...P(0, -128), 9 * s, 8 * s, 0, 0, 6.283); shape(ctx, _mixHex('#E0A08C', '#F2C0B0', hl.cli || 0), '#B86A68', 1.5);
  ctx.beginPath(); ctx.ellipse(...P(0, -66), 4.5 * s, 3 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#5BA4C9', hl.buis || 0), 1.5 + 1.5 * (hl.buis || 0));
  ctx.beginPath(); ctx.ellipse(...P(0, 0), 13 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#E0A08C', hl.vag || 0), 1.5 + 1.5 * (hl.vag || 0));
  ctx.beginPath(); ctx.arc(...P(0, 150), 8 * s, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.6), rgba(D, 0.8), 1.5);
  ctx.restore(); return naam;
}

// ---------- klein: schaalstreep met eenheid voluit ----------
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }

// ===== CELDELING 2.0 (lichte remake, 26 okt 2026): chromosomen met armen, delende cel, spoelfiguur. Vereist _mixHex en _bioPolyCache (hierboven) en dnaDraad (lib_micro_evo.js) voor cdKluwen. Gebruik: films/voortplanting/celdeling/bron/src/scenes_cd2.js
// CELDELING · nieuwe tekenobjecten (lichte remake, fase 1, 25 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape), _mixHex (lib_cast.js).
//
// CHROMATIDE MET ARMEN. Recept (bron: OpenStax Biology 2e § 10.2 en 11.1; Pierce, Genetics Essentials § 2.x):
//  - een chromatide = één DNA-molecuul, opgerold; twee zusterchromatiden vast bij het centromeer (cohesine).
//  - centromeer niet in het midden (cen ≈ 0,38 bij het lange paar, 0,30 bij het korte); de kinetochoor zit aan de
//    buitenkant van het centromeer, naar de pool gericht.
//  - in de anafase gaat het centromeer vóórop en slepen de armen erachteraan (V-vorm): de trekdraad hangt aan het
//    kinetochoor, niet aan de armen. Dat is een morph van dezelfde chromatide, geen nieuwe tekening.
//  - crossing-over: twee niet-zusterchromatiden (de binnenste van een paar) wisselen het stuk voorbij het chiasma;
//    daarna bestaat één chromatide uit een stuk teal (vaderskant) en een stuk oker (moederskant). De zuster ernaast
//    blijft ongewijzigd. Kleuren zoals Chromosomen 2.1: vaderskant C.teal, moederskant C.oker.
//  Bekende fouten: X die als één staaf beweegt; chromatiden die in de anafase met de armen vóórop gaan; crossing-over
//  tussen zusterchromatiden; alle vier de chromatiden gemengd.
// =====================================================================================
var CD = { vader: C.teal, moeder: C.oker, draad: '#8FA0B5', pool: '#B8C4D6' };
var _cdk = (h, k = 0.4) => _mixHex(h, '#000000', k);

// pad van één chromatide: centromeer (cx, cy); armen omhoog (len*cen) en omlaag (len*(1-cen)) langs richting rot;
// zwaai = 0..1 hoe ver de armen naar achteren slepen; kant = +1 (beweegt naar links, armen slepen naar rechts) of -1
function cdPad(cx, cy, len, rot, o = {}) {
  const { cen = 0.38, zwaai = 0, kant = 1, bol = 0.10, n = 22 } = o; const P = [];
  const arm = (L, sgn, nn) => { const pts = []; const ang = rot + (sgn < 0 ? -Math.PI / 2 : Math.PI / 2) + sgn * -kant * zwaai * 1.15;
    for (let i = 0; i <= nn; i++) { const u = i / nn, d = u * L; const bend = Math.sin(u * Math.PI) * L * bol * (1 + zwaai); const dx = Math.cos(ang), dy = Math.sin(ang);
      pts.push([cx + dx * d + (-dy) * bend * kant * 0.6, cy + dy * d + dx * bend * kant * 0.6]); } return pts; };
  const up = arm(len * cen, -1, Math.round(n * cen)).reverse(), lo = arm(len * (1 - cen), 1, Math.round(n * (1 - cen)));
  return up.concat(lo.slice(1)); // van boven-tip (u=0) via centromeer naar onder-tip (u=1)
}
// teken een chromatide langs pad P met kleursegmenten segs = [[u0, u1, kleur], …]
function cdChromatide(ctx, P, w, segs, o = {}) {
  const { a = 1, coils = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = P.length - 1, at = (u) => Math.round(clamp(u, 0, 1) * N);
  const lijn = (i0, i1) => { ctx.beginPath(); ctx.moveTo(P[i0][0], P[i0][1]); for (let i = i0 + 1; i <= i1; i++) ctx.lineTo(P[i][0], P[i][1]); };
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = _cdk(kl); ctx.lineWidth = w + 3; ctx.stroke(); });
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke(); });
  if (coils && w >= 9) { ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = Math.max(1, w * 0.09);
    for (let i = 1; i < N; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i + 1]; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; const [x, y] = P[i];
      ctx.beginPath(); ctx.moveTo(x - nx * w * 0.38 - dx / L * w * 0.12, y - ny * w * 0.38 - dy / L * w * 0.12); ctx.quadraticCurveTo(x + dx / L * w * 0.18, y + dy / L * w * 0.18, x + nx * w * 0.38 - dx / L * w * 0.12, y + ny * w * 0.38 - dy / L * w * 0.12); ctx.stroke(); } }
  ctx.restore();
}
// een heel chromosoom (X): twee zusterchromatiden; uiteen 0 = vast, 1 = los; kin = kinetochoren tonen;
// ringen = cohesine (goud-grijze ringen (Kamiel 25 okt 2026: niet oker, dat is moederskant)) 0..1; segsL / segsR = kleuren per zuster; zwaaiL/R en dxL/R voor de anafase
function cdChromosoom(ctx, x, y, len, o = {}) {
  const { w = 18, cen = 0.38, kl = CD.vader, segsL = null, segsR = null, uiteen = 0, a = 1, kin = false, ringen = 0, dxL = 0, dxR = 0, zwaai = 0, rot = 0, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  // xv > 0: X-vorm, de armen van elke zuster wijken licht naar buiten (vast bij het centromeer)
  const gap = w * 0.52 + uiteen * w * 0.6;
  const PL = cdPad(x - gap + dxL, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen, zwaai, kant: 1 }), PR = cdPad(x + gap + dxR, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen, zwaai, kant: -1 });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x + (dxL + dxR) / 2, y + len * (0.5 - cen), w * 3.1 + Math.abs(dxR - dxL) / 2, len * 0.62, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  cdChromatide(ctx, PL, w, segsL || [[0, 1, kl]], { a }); cdChromatide(ctx, PR, w, segsR || [[0, 1, kl]], { a });
  ctx.save(); ctx.globalAlpha *= a;
  if (uiteen < 0.25) { ctx.beginPath(); ctx.arc(x + (dxL + dxR) / 2, y, w * 0.5 * (1 - uiteen * 4), 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); }
  if (kin) [[PL, -1], [PR, 1]].forEach(([P, s]) => { const c = P[Math.round(cen * (P.length - 1))]; roundRect(ctx, c[0] + s * w * 0.45 - (s < 0 ? w * 0.32 : 0), c[1] - w * 0.55, w * 0.32, w * 1.1, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); });
  if (ringen > 0.01) { ctx.globalAlpha *= ringen; for (const u of [0.12, 0.25, 0.52, 0.7, 0.86]) { const i = Math.round(u * (PL.length - 1)); const p = PL[i], q = PR[i]; ctx.beginPath(); ctx.ellipse((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.abs(q[0] - p[0]) / 2 + w * 0.62, w * 0.22, 0, 0, 6.283); ctx.strokeStyle = C.grain; ctx.lineWidth = 2.2; ctx.stroke(); } }
  ctx.restore(); return { PL, PR };
}
// delende cel (Micro): rond/ovaal membraan dat in het midden insnoert; spoelfiguur met polen; rustige textuur
function cdCel(ctx, cx, cy, rx, ry, o = {}) {
  const { insnoer = 0, a = 1, polen = 0, kern = 0, seed = 3, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, c = Math.cos(an), s = Math.sin(an); const pinch = 1 - insnoer * 0.92 * Math.exp(-Math.pow(c / 0.32, 2)); const wob = 1 + 0.008 * Math.sin(an * 5 + t * 0.7 + seed);
    const X = cx + c * rx * wob, Y = cy + s * ry * pinch * wob; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); };
  pad(); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  ctx.save(); pad(); ctx.clip(); for (let i = 0; i < 160; i++) { const X = cx + (hash(i * 3 + seed) - 0.5) * rx * 2, Y = cy + (hash(i * 7 + seed) - 0.5) * ry * 2; ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); } ctx.restore();
  pad(); ctx.strokeStyle = C.er; ctx.lineWidth = 2.2; ctx.stroke(); ctx.save(); ctx.translate(cx, cy); ctx.scale(0.985, 0.975); ctx.translate(-cx, -cy); pad(); ctx.strokeStyle = rgba(C.er, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  ctx.restore();
}
function cdPool(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(CD.draad, 0.5); ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 10, y + Math.sin(an) * 10); ctx.lineTo(x + Math.cos(an) * 34, y + Math.sin(an) * 34); ctx.stroke(); }
  // centrosoom: twee centriolen haaks op elkaar
  roundRect(ctx, x - 9, y - 4, 18, 8, 3); shape(ctx, '#C9B896', '#E6D9B8', 1); roundRect(ctx, x - 4, y - 12, 8, 18, 3); shape(ctx, '#B8A57E', '#E6D9B8', 1); ctx.restore(); }
// trekdraad van pool naar een punt (licht gebogen)
function cdDraad(ctx, px, py, x, y, a = 1, kl = CD.draad, lw = 1.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + x) / 2, (py + y) / 2 + (y - py) * 0.12, x, y); ctx.stroke(); ctx.restore(); }

// MODELCEL 2n = 4: lang paar (len 1) en kort paar (len 0.62); per chromosoom: paar, kant (vader/moeder)
var MODEL4 = [{ p: 'L', k: 'vader' }, { p: 'L', k: 'moeder' }, { p: 'K', k: 'vader' }, { p: 'K', k: 'moeder' }];
var cdLen = (p, L) => (p === 'L' ? L : L * 0.62), cdCen = (p) => (p === 'L' ? 0.38 : 0.30);

// ÉÉN CHROMATIDE los (na de anafase, of in een geslachtscel): pad + kinetochoor aan de kant van de pool
function cdEen(ctx, x, y, len, o = {}) {
  const { w = 14, cen = 0.38, rot = 0, zwaai = 0, kant = 1, segs = null, kl = CD.vader, a = 1, kin = false } = o; if (a <= 0.01) return;
  const P = cdPad(x, y, len, rot, { cen, zwaai, kant }); cdChromatide(ctx, P, w, segs || [[0, 1, kl]], { a });
  if (kin) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - kant * w * 0.62 - w * 0.16, y - w * 0.5, w * 0.32, w, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); ctx.restore(); }
  return P;
}
// CONDENSEREN ALS MORPH (C8): dezelfde draad gaat van een losse kronkel (c = 0, chromatine) naar een opgerolde chromatide
// (c = 1). dubbel = twee zusterdraden naast elkaar (na de S-fase). Elk punt van de draad schuift naar een punt op de chromatide.
function _cdKronkel(n, seed, R) { const key = 'kr' + n + '_' + seed + '_' + Math.round(R); if (_bioPolyCache[key]) return _bioPolyCache[key];
  const P = []; let x = 0, y = -R * 0.6, an = hash(seed) * 6.283; for (let k = 0; k < n; k++) { an += (hash(seed * 31 + k * 7) - 0.5) * 1.6 + Math.sin(k * 0.5 + seed) * 0.25; const st = R * 0.11;
    let nx = x + Math.cos(an) * st, ny = y + Math.sin(an) * st; const d = Math.hypot(nx, ny); if (d > R) { an += Math.PI * 0.7; nx = x + Math.cos(an) * st; ny = y + Math.sin(an) * st; } x = nx; y = ny; P.push([x, y]); }
  _bioPolyCache[key] = P; return P; }
function cdKluwen(ctx, x, y, len, o = {}) {
  const { c = 0, dubbel = true, w = 16, cen = 0.38, rot = 0, kl = CD.vader, segsL = null, segsR = null, a = 1, seed = 1, R = len * 0.55, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  const e = ease(c), gap = w * 0.52;
  const doel = [cdPad(x - (dubbel ? gap : 0), y, len, rot, xv > 0 && dubbel ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen }), cdPad(x + gap, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen })];
  const n = doel[0].length, K = _cdKronkel(n, seed, R);
  const strengen = dubbel ? [0, 1] : [0];
  strengen.forEach(s => { const P = doel[s].map((q, k) => { const kx = x + K[k][0] + s * 5, ky = y + K[k][1] + s * 6; return [lerp(kx, q[0], e), lerp(ky, q[1], e)]; });
    const segs = (s ? segsR : segsL) || [[0, 1, kl]];
    if (e < 0.5) { ctx.save(); ctx.globalAlpha *= a; segs.forEach(([u0, u1, k2]) => { const i0 = Math.round(u0 * (n - 1)), i1 = Math.round(u1 * (n - 1)); dnaDraad(ctx, P.slice(i0, i1 + 1), { w: lerp(3, w * 0.5, e * 2), kleur: k2, donker: _cdk(k2) }); }); ctx.restore(); }
    else cdChromatide(ctx, P, lerp(w * 0.5, w, (e - 0.5) * 2), segs, { a, coils: e > 0.85 }); });
  if (e > 0.7 && dubbel) { ctx.save(); ctx.globalAlpha *= a * (e - 0.7) / 0.3; ctx.beginPath(); ctx.arc(x, y, w * 0.48, 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y + len * (0.5 - cen) * e, lerp(R * 1.05, w * 2.4, e), lerp(R * 1.05, len * 0.62, e), 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
// kernmembraan dat in blaasjes uiteenvalt (v 0 = heel, 1 = weg) of weer terugkomt
function cdKernmembraan(ctx, x, y, r, v = 0, a = 1) { if (a <= 0.01 || v >= 0.99) return; ctx.save(); ctx.globalAlpha *= a * (1 - v * 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.18 * (1 - v)); ctx.fill();
  const n = 26; for (const f of [1, 0.965]) for (let k = 0; k < n; k++) { const a0 = k / n * 6.283, len = (6.283 / n) * (1 - 0.15 - v * 0.7); const dr = v * 22 * (hash(k * 3) - 0.3);
    ctx.beginPath(); ctx.arc(x, y, r * f + dr, a0, a0 + len); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); }
  ctx.restore(); }
// teller rechtsboven: model en mens naast elkaar
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
// maximale zwaai zodat de armen van een losse chromatide de middellijn niet kruisen (afstand = centromeer tot middellijn)
function cdZwaaiMax(afstand, armLen, w) { return Math.asin(clamp((afstand - w * 0.75) / Math.max(1, armLen), 0, 1)) / 1.15; }

function _huidCirc(ctx, x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = fill; ctx.fill(); }
// ===================================================================================================
// HUID IN DOORSNEDE als blok (opperhuid, lederhuid, onderhuids bindweefsel), schematisch, niet op schaal.
// Eerst gebruikt: Uitscheiding en evenwicht 1.1, hoofdstuk De huid (26 okt 2026), door Kamiel gekeurd op het twijfelblad.
// Gebruik: huidBlok(ctx, X, Y, breedte, { t, vat, zweet, kip, focus, volg, isoleer, rood, bleek }) — hoogte = 0,875 × breedte.
// Vereist ook blob() uit lib.js.
// Recept (bronnen in bron/bronnen.md): opperhuid dun (dunne huid ± 0,1 mm), lederhuid 1–2 mm, onderhuids
// bindweefsel wisselend dik; hier vereenvoudigd tot ± 1 : 4 : 3,5 zodat de opperhuid zichtbaar blijft.
//  - opperhuid: hoornlaag = platte dode cellen zonder kern (bovenaan schilferend); daaronder levende lagen die
//    naar boven platter worden; kiemlaag = één rij cellen met kern op een golvende grens (lederhuidpapillen).
//    De opperhuid heeft geen bloedvaten: haarvatlussen stoppen in de papillen.
//  - lederhuid: bindweefsel (collageen golvend), oppervlakkig en diep vaatnet met haarvatlussen in de papillen;
//    haarzakje schuin, met talgklier aan de kant van het haarspiertje; haarspiertje van het haarzakje naar de
//    papillaire laag; zweetklier = kluwen diep in de lederhuid, buis kronkelt naar een porie; zintuigen:
//    vrije zenuwuiteinden (pijn, warmte, koude) tot in de opperhuid, tastlichaampje in een papil, druklichaampje diep.
//  - onderhuids bindweefsel: vetcellen als veelhoeken van wisselende grootte (geen raster van gelijke rondjes).
//  Bekende fouten: bloedvaten in de opperhuid; zweetklier die in het vet 'zwemt' zonder buis; talgklier los
//  van het haarzakje; haar dat recht omhoog uit een recht gat steekt; vet als effen gele laag.
// Ontwerpmaat 800 × 700; o.vat −1 (nauw) … 0 … 1 (wijd), o.zweet 0..1, o.kip 0..1 (kippenvel),
// o.focus = 'hoorn'|'kiem'|'opper'|'leder'|'vat'|'zweet'|'talg'|'haar'|'zin'|'vet'|null (de rest gaat naar 35 %).
// Geeft ankerpunten terug (schermcoördinaten) voor namen.
// ===================================================================================================
var HUIDK = { hoorn: '#E6CDB4', levend: '#C99A80', levendR: '#DDB59C', leder: '#5E4652', lederL: '#6E5260', collageen: '#B88A92',
  vet: '#CDBB86', vetR: '#DCCB9A', vetGrond: '#6B4B3E', slag: '#D9483E', ader: '#8E3A40', haar: '#3A2418', haarZak: '#A07862',
  talg: '#D9C27A', spier: '#B36A5E', buis: '#AFC0D0', zenuw: '#C9D2DE' };
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
var _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function huidBlok(ctx, X, Y, w, o = {}) {
  const { a = 1, t = 0, vat = 0, zweet = 0, kip = 0, focus = null, rood = 0, bleek = 0, deel = 1, volg = 0, isoleer = 0 } = o; if (a <= 0.01) return {};
  const s = w / 800, D = (k) => (focus && focus !== k ? 0.35 : 1);
  ctx.save(); ctx.translate(X, Y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const bump = (x) => kip * 9 * Math.exp(-Math.pow((x - 262) / 34, 2));            // kippenvel: bultje rond de haaropening
  const top = (x) => 60 + Math.sin(x * 0.02) * 2 - bump(x);
  const bm = (x) => 150 - 16 * Math.pow(0.5 + 0.5 * Math.cos((x - 70) / 110 * 6.283), 2);   // grens opperhuid/lederhuid (papillen)
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 800, 700); ctx.clip();
  // ---- onderhuids bindweefsel met vet ----
  ctx.save(); ctx.globalAlpha *= D('vet'); ctx.fillStyle = HUIDK.vetGrond; ctx.fillRect(0, 470, 800, 230);
  for (const [cx, cy, r] of _huidVet) { blob(ctx, cx, cy, r * 1.1, r * 0.82, 0.08, cx * 0.1, 0); shape(ctx, HUIDK.vet, HUIDK.vetR, 2); }
  if (isoleer > 0.01) { ctx.globalAlpha *= isoleer; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(3, 472, 794, 225); }
  ctx.restore();
  // ---- lederhuid ----
  ctx.save(); ctx.globalAlpha *= D('leder') === 1 || ['vat', 'zweet', 'talg', 'haar', 'zin'].includes(focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, 470); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 470); ctx.closePath(); ctx.fillStyle = HUIDK.leder; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = HUIDK.lederL; ctx.beginPath(); ctx.moveTo(0, 230); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 230); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 12; i++) { const yy = 190 + i * 24, ph = hash(i * 7.1) * 6.28; ctx.strokeStyle = rgba(HUIDK.collageen, 0.22); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = -10; x <= 810; x += 10) { const py = yy + Math.sin(x / 40 + ph) * 6; x === -10 ? ctx.moveTo(x, py) : ctx.lineTo(x, py); } ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // bloedvaten: diep vaatnet (y 430), oppervlakkig vaatnet (y 205) en haarvatlussen in elke papil
  const vr = vat >= 0 ? 1 + 1.3 * vat : 1 - 0.65 * -vat, flow = vat >= 0 ? 1 + vat : 1 + 0.7 * vat;
  ctx.save(); ctx.globalAlpha *= D('vat');
  const buis = (pts, r, col, n, sp) => { ctx.strokeStyle = col; ctx.lineWidth = 2 * r; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = Math.max(1, 2 * r - 5); ctx.stroke();
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    for (let j = 0; j < n; j++) { let u = ((j / n + t * sp / L * 60) % 1) * L, i = 0; while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++; } const f = u / seg[i], px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f);
      ctx.beginPath(); ctx.ellipse(px, py, Math.min(r * 0.8, 6), Math.min(r * 0.5, 4), 0.4, 0, 6.283); ctx.fillStyle = '#E07A6A'; ctx.fill(); } };
  buis([[-10, 432], [800 + 10, 438]], 11, HUIDK.slag, 14, 1.2); buis([[810, 452], [-10, 455]], 13, HUIDK.ader, 12, 0.8);
  buis([[150, 440], [158, 330], [150, 212]], 6 * Math.sqrt(vr), HUIDK.slag, 4, 1.2 * flow); buis([[690, 212], [702, 330], [694, 448]], 7 * Math.sqrt(vr), HUIDK.ader, 4, 0.9 * flow);
  buis([[-10, 205], [810, 210]], 6 * vr, HUIDK.slag, Math.round(10 * Math.max(0.4, flow)), 1.3 * flow);
  for (let k = 0; k < 8; k++) { const px = 70 + k * 110; if (px > 800) break; const tp = bm(px) + 10, dx = 6; ctx.strokeStyle = huidMix(HUIDK.ader, HUIDK.slag, 0.5); ctx.lineWidth = 2 * Math.max(1.6, 3.4 * vr); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(px - dx, 210); ctx.lineTo(px - dx, tp + dx); ctx.arc(px, tp + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, 210); ctx.stroke(); }
  ctx.restore();
  // zweetklier: kluwen diep in de lederhuid, buis kronkelt naar een porie
  ctx.save(); ctx.globalAlpha *= D('zweet');
  const kluwen = []; for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 6.283 * 3.2; kluwen.push([600 + Math.cos(an) * (16 + 12 * Math.sin(u * 9)), 452 + Math.sin(an) * (12 + 6 * Math.cos(u * 7)) - u * 6]); }
  const gang = [[600, 440], [592, 380], [606, 320], [596, 260], [608, 200], [600, bm(600) + 4]]; for (let yy = bm(600); yy >= top(612); yy -= 10) gang.push([606 + Math.sin(yy * 0.25) * 7, yy]); gang.push([610, top(610)]);
  const pad = kluwen.concat(gang); ctx.strokeStyle = HUIDK.buis; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.25 + 0.6 * zweet); ctx.lineWidth = 4; ctx.stroke();
  if (zweet > 0.01) { for (let j = 0; j < 7; j++) { const u = (j / 7 + t * 0.12) % 1, i = Math.floor(u * (pad.length - 1)); _huidCirc(ctx, pad[i][0], pad[i][1], 3.2, rgba(C.teal, zweet)); }
    const dr = 4 + 10 * zweet; ctx.beginPath(); ctx.ellipse(610, top(610) - dr * 0.55, dr, dr * 0.65, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.75), lighten(C.teal, 0.3), 1.5); }
  ctx.restore();
  // haarzakje met haar, talgklier en haarspiertje
  const oX = 262, oY = top(262), bX = 340, bY = 468; const ang = lerp(0.42, 1.25, kip);   // hoek van het haar boven de huid t.o.v. het oppervlak
  ctx.save(); ctx.globalAlpha *= D('haar');
  ctx.strokeStyle = HUIDK.haarZak; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(oX + 4, oY + 14); ctx.lineTo(bX, bY - 14); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(bX + 2, bY - 4, 22, 18, 0.2, 0, 6.283); ctx.fillStyle = HUIDK.haarZak; ctx.fill();
  ctx.strokeStyle = HUIDK.haar; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bX, bY - 8); ctx.lineTo(oX, oY); ctx.lineTo(oX - Math.cos(ang) * 120, oY - Math.sin(ang) * 120); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('talg'); for (const [dx, dy, r] of [[34, 150, 17], [44, 172, 15], [30, 190, 13]]) { blob(ctx, oX + dx + 10, oY + dy - 40, r, r * 0.8, 0.1, dx, 0); shape(ctx, HUIDK.talg, lighten(HUIDK.talg, 0.25), 1.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('haar'); const mA = [lerp(oX, bX, 0.55) + 10, lerp(oY, bY, 0.55)], mB = [372, bm(372) + 6];
  ctx.strokeStyle = huidMix(HUIDK.spier, '#E8A090', kip); ctx.lineWidth = 11 + 9 * kip; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mA[0], mA[1]); ctx.quadraticCurveTo(lerp(mA[0], mB[0], 0.5) + 12 * (1 - kip), lerp(mA[1], mB[1], 0.5), mB[0], mB[1]); ctx.stroke(); ctx.restore();
  // zintuigen: vrije zenuwuiteinden, tastlichaampje (papil), druklichaampje (diep)
  const zc = focus === 'zin' ? C.teal : HUIDK.zenuw;
  ctx.save(); ctx.globalAlpha *= D('zin'); ctx.strokeStyle = zc; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(470, 470); ctx.bezierCurveTo(480, 360, 460, 260, 476, 170); ctx.stroke();
  for (const [ex, ey] of [[452, 112], [478, 104], [500, 118]]) { ctx.beginPath(); ctx.moveTo(476, 170); ctx.quadraticCurveTo((476 + ex) / 2 + 6, (170 + ey) / 2, ex, ey); ctx.stroke(); }
  const mx = 510, my = bm(510) + 12; ctx.beginPath(); ctx.moveTo(476, 230); ctx.quadraticCurveTo(500, 200, mx, my + 10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(mx, my, 7, 13, 0, 0, 6.283); shape(ctx, rgba(zc, 0.35), zc, 2); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(mx - 6, my + k * 6); ctx.lineTo(mx + 6, my + k * 6); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(470, 450); ctx.quadraticCurveTo(640, 470, 720, 420); ctx.stroke();
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(738, 410, 26 - k * 6, 15 - k * 3.4, -0.4, 0, 6.283); shape(ctx, k === 0 ? rgba(zc, 0.18) : 'rgba(0,0,0,0)', zc, 2); }
  ctx.restore();
  // ---- opperhuid ----
  ctx.save(); const fo = (focus === 'opper' || focus === 'hoorn' || focus === 'kiem' || !focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, top(0)); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, top(x)); for (let x = 800; x >= 0; x -= 4) ctx.lineTo(x, bm(x)); ctx.closePath();
  ctx.save(); ctx.globalAlpha *= fo; ctx.fillStyle = huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek); ctx.fill(); ctx.clip();
  // levende lagen: cellen in rijen, naar boven platter; kiemlaag = onderste rij met kern
  const kiemF = focus === 'kiem' ? 1 : (focus === 'hoorn' ? 0.35 : 1), hoornF = focus === 'kiem' ? 0.35 : 1;
  for (let r = 0; r < 5; r++) { const hgt = [13, 12, 11, 9, 7][r], wid = [15, 18, 21, 25, 30][r];
    ctx.save(); ctx.globalAlpha *= r === 0 ? kiemF : (focus === 'hoorn' || focus === 'kiem' ? 0.5 : 1);
    for (let x = -10 + (r % 2) * wid / 2; x < 810; x += wid) { const yb = bm(x) - 8 - r * (hgt + 4) * lerp(1, 0.75, r / 4); if (yb < top(x) + 26) continue;
      roundRect(ctx, x - wid / 2 + 1.5, yb - hgt / 2, wid - 3, hgt, 4); shape(ctx, huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek), HUIDK.levendR, 1.2);
      if (r < 3) { ctx.beginPath(); ctx.ellipse(x, yb, Math.min(4.5, wid * 0.22), Math.min(4, hgt * 0.3), 0, 0, 6.283); ctx.fillStyle = r === 0 ? C.kern : rgba(C.kern, 0.6); ctx.fill(); } }
    ctx.restore(); }
  // één cel volgen (goud): ontstaat in de kiemlaag door deling, schuift omhoog, wordt plat en verliest de kern
  if (volg > 0.01) { const vx = 400, u = (t * 0.07) % 1, y0 = bm(vx) - 8, y1 = top(vx) + 8, yy = lerp(y0, y1, ease(u)); const fl = lerp(1, 0.25, u), wd = lerp(16, 34, u);
    ctx.save(); ctx.globalAlpha *= volg; roundRect(ctx, vx - wd / 2, yy - 7 * fl - 2, wd, 14 * fl + 4, 4); shape(ctx, u > 0.8 ? HUIDK.hoorn : HUIDK.levend, C.goud, 2.5);
    if (u < 0.65) { ctx.beginPath(); ctx.ellipse(vx, yy, 4.5, 4 * fl + 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 1 - u / 0.65); ctx.fill(); }
    const dv = clamp((u - 0.0) / 0.12, 0, 1); if (dv < 1) { ctx.globalAlpha *= 1 - dv; roundRect(ctx, vx - 8 + dv * 16, y0 - 7, 16, 14, 4); shape(ctx, HUIDK.levend, C.goud, 2); ctx.beginPath(); ctx.ellipse(vx + dv * 16, y0, 4.5, 4, 0, 0, 6.283); ctx.fillStyle = C.kern; ctx.fill(); }
    ctx.restore(); }
  ctx.restore();
  // hoornlaag: platte dode cellen zonder kern, bovenste schilferen af
  ctx.save(); ctx.globalAlpha *= fo * hoornF; for (let r = 0; r < 4; r++) for (let x = -20 + r * 13; x < 820; x += 46) { const yy = top(x) + 3 + r * 5.5; roundRect(ctx, x, yy, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, lighten(HUIDK.hoorn, 0.2), 1); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k / 3) % 1, fx = 120 + k * 250 + u * 30, fy = top(fx) + 2 - u * 34; ctx.save(); ctx.globalAlpha *= (1 - u) * 0.9; ctx.translate(fx, fy); ctx.rotate(-0.3 * u); roundRect(ctx, -20, -2, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, null); ctx.restore(); }
  ctx.restore();
  ctx.restore();
  ctx.restore();
  // rand van het blok
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5 / s; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 700); ctx.lineTo(800, 700); ctx.lineTo(800, 60); ctx.stroke();
  ctx.restore();
  const P = (x, y) => [X + x * s, Y + y * s];
  return { X, Y, P, s, oppTop: Y + 60 * s, oppBot: Y + 150 * s, lederBot: Y + 470 * s, bot: Y + 700 * s, right: X + w, hoorn: P(40, 66), kiem: P(40, 140), vat: P(150, 330), vatOpp: P(20, 205), zweet: P(600, 452), porie: P(610, 50),
    talg: P(305, 170), haar: P(338, 470), haarTop: P(262, 40), spier: P(372, 220), tast: P(510, 140), vrij: P(478, 104), druk: P(738, 410), vet: P(400, 590) };
}
// ===================== Zenuwstelsel 9 · Spieren en beweging (26 okt 2026, prompt v10) =====================
// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — nieuwe tekeningen (ronde 1, 26 okt 2026), kandidaat voor bibliotheek/lib_bio.js
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape, circ), lib_bio.js (BIO, _mixHex).
// Maten in cm (arm) of µm (sarcomeer) met een schaal s = px per eenheid. Bronnen: OpenStax A&P 2e h. 6, 9, 10, 11; Gray's (via StatPearls).
// =====================================================================================
var Z9 = { bot: '#E6DCC6', botS: '#B8AC92', botR: '#CFC3A8', kraak: '#BFD8E4', kraakR: '#E4F0F6', pees: '#E9E3D2', peesR: '#C9C0A8',
  spier: '#B55A50', spierL: '#D98A7E', spierD: '#8E3F38', smeer: '#5BA4C9', kapsel: '#9AA3B2', merg: '#C2453E', mergG: '#D9BC6A',
  actine: '#5BA4C9', myosine: '#C9A35C', zlijn: '#F2F2EE', zenuw: '#B79AE6', ca: '#E0B64A' };

// --- hulpjes: lokaal botframe → wereld. Lokale y langs de botas (van proximaal naar distaal), lokale x naar voren (anterieur).
function z9Frame(ox, oy, ang, s) { const c = Math.cos(ang), n = Math.sin(ang);
  return (lx, ly) => [ox + s * (lx * c + ly * n), oy + s * (-lx * n + ly * c)]; }
function z9Pad(ctx, pts, dicht = true) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (dicht) ctx.closePath(); }
function z9Glad(ctx, pts, dicht = true) { // Catmull-Rom door de punten
  const n = pts.length; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  const g = (i) => pts[dicht ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < (dicht ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
// spoelvormige spierbuik tussen A en B (wereld), dikte w (px), bol naar kant 'zij' (+1/-1 t.o.v. de richting A→B), met vezellijnen
function z9Buik(ctx, A, B, w, zij, o = {}) { const { a = 1, kleur = Z9.spier, rand = Z9.spierL, vezels = 4, bol = 0.35 } = o; if (a <= 0.01) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = uy * zij, py = -ux * zij, N = 24, l = [], r = [];
  for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof;
    const hw = w / 2 * prof + 1.5; l.push([mx + px * hw, my + py * hw]); r.push([mx - px * hw, my - py * hw]); }
  ctx.save(); ctx.globalAlpha *= a; z9Glad(ctx, l.concat(r.reverse()), true); shape(ctx, kleur, rand, 1.5);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5A2A26', 0.35); ctx.lineWidth = 1.5;
  for (let k = 1; k < vezels; k++) { const f = k / vezels - 0.5; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof, hw = w * prof * f;
      i ? ctx.lineTo(mx + px * hw, my + py * hw) : ctx.moveTo(mx + px * hw, my + py * hw); } ctx.stroke(); }
  ctx.restore(); ctx.restore(); }
function z9Pees(ctx, pts, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#7E7462'; ctx.lineWidth = w + 3.5; z9Glad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = '#FAF7EE'; ctx.lineWidth = w; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }

// =====================================================================================
// ARM VAN OPZIJ (rechterarm, kijkt naar +x): schouderblad, opperarmbeen, ellepijp, spaakbeen, biceps, triceps met pezen.
// Recept (bronnen B: OpenStax A&P 2e 8.2 en 11.5; StatPearls Biceps/Triceps): opperarmbeen ± 31 cm, ellepijp ± 26 cm,
// spaakbeen ± 24 cm. Biceps: twee koppen vanaf het schouderblad (lange kop over de kop van het opperarmbeen, korte kop vanaf
// het ravenbekuitsteeksel), pees op de knobbel van het spaakbeen ± 3 cm onder het elleboogscharnier, vóór het scharnier.
// Triceps: lange kop vanaf het schouderblad onder de kom, twee koppen langs de achterkant van het opperarmbeen, pees op het
// olecranon (uitsteeksel van de ellepijp), achter het scharnier. Vereenvoudigd: geen deltaspier, geen m. brachialis.
// Bekende fouten: biceps-pees op de ellepijp; triceps vóór het scharnier; spieren die bij buigen even lang blijven.
// u = hoek opperarm vanaf recht omlaag (naar voren +), e = buighoek elleboog (0 = gestrekt). c = spanning biceps 0..1, ct = triceps.
// =====================================================================================
function armAnatomie(ctx, sx, sy, s, o = {}) {
  const { u = 0, e = 0, a = 1, c = null, ct = null, hl = {}, dim = [], skelet = 1, spieren = 1, hand = 1, t = 0 } = o; if (a <= 0.01) return {};
  const cb = c == null ? clamp(e / 1.6, 0, 1) : c, ctr = ct == null ? clamp(1 - e / 1.2, 0, 1) * 0.6 : ct;
  const Up = z9Frame(sx, sy, u, s), E = Up(0, 30), Fo = z9Frame(E[0], E[1], u + e, s);
  const D = (k) => (dim.includes(k) ? 0.3 : 1) * (hl[k] != null ? 1 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (o.huid) { ctx.save(); ctx.globalAlpha *= o.huid; const sk = [Up(-4.6, 2), Up(-5.2, 12), Up(-4.4, 24), Up(-3.6, 29), Fo(-3.0, 1.5), Fo(-2.4, 8), Fo(-1.6, 22), Fo(-1.3, 25.5), Fo(2.6, 25.5), Fo(3.0, 18), Fo(3.4, 6), Up(4.4, 29), Up(5.2, 18), Up(4.4, 6), Up(3.6, -2), Up(-2.0, -4.5)]; z9Glad(ctx, sk, true); shape(ctx, rgba(BIO.huid, 0.16), rgba(BIO.huid, 0.75), 2); ctx.restore(); }
  // schouderblad (staat stil; vereenvoudigd vlak van opzij met kom, acromion en ravenbek)
  ctx.save(); ctx.globalAlpha *= 0.85 * skelet * D('schouderblad');
  const S = (x, y) => [sx + x * s, sy + y * s];
  z9Glad(ctx, [S(-2.2, -3.2), S(-6.5, -4.6), S(-11, -2.5), S(-13, 4), S(-11.5, 11), S(-8, 13.5), S(-4.5, 7), S(-2.6, 2.4), S(-1.8, -1.2)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [S(-3, -4.4), S(0.6, -5.4), S(2.8, -4.6), S(1.6, -3.4), S(-1.8, -3.3)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // acromion
  z9Glad(ctx, [S(-1.2, -2.9), S(1.8, -2.6), S(2.6, -1.6), S(1.6, -1.2), S(-0.8, -1.9)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // ravenbekuitsteeksel
  ctx.restore();
  // opperarmbeen
  ctx.save(); ctx.globalAlpha *= skelet * D('opperarm');
  z9Glad(ctx, [Up(-1.6, 1.8), Up(-1.25, 8), Up(-1.1, 18), Up(-1.5, 25), Up(-2.1, 28.4), Up(-1.6, 30.8), Up(0, 31.6), Up(1.5, 30.8), Up(1.9, 28.3), Up(1.2, 25), Up(0.95, 18), Up(1.05, 8), Up(1.6, 1.6)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  const K = Up(-0.2, -0.1); circ(ctx, K[0], K[1], 2.35 * s, Z9.bot, Z9.botS, 1.5); // kop
  ctx.restore();
  // onderarm: ellepijp (achter, met olecranon) en spaakbeen (voor)
  ctx.save(); ctx.globalAlpha *= skelet * D('onderarm');
  z9Glad(ctx, [Fo(-1.3, -2.6), Fo(-2.1, -1.4), Fo(-1.7, 1.2), Fo(-1.0, 6), Fo(-0.8, 15), Fo(-0.75, 24.5), Fo(-0.1, 25.4), Fo(0.1, 24.3), Fo(-0.05, 15), Fo(0.1, 6), Fo(0.4, 1.5), Fo(0.1, -0.6), Fo(-0.6, -1.4)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [Fo(0.25, 0.9), Fo(1.25, 0.8), Fo(1.4, 2.4), Fo(1.65, 3.3), Fo(1.25, 6), Fo(1.2, 14), Fo(1.7, 22), Fo(1.9, 24.6), Fo(0.4, 24.9), Fo(0.35, 22), Fo(0.45, 14), Fo(0.45, 6), Fo(0.3, 2.4)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore();
  // hand (vereenvoudigd: middenhand en vingers als vlak in huidkleur, half doorzichtig)
  if (hand > 0.01) { ctx.save(); ctx.globalAlpha *= 0.85 * hand; z9Glad(ctx, [Fo(-0.9, 24.8), Fo(2.2, 24.8), Fo(2.6, 29), Fo(2.1, 34.5), Fo(0.8, 37), Fo(-0.3, 35.5), Fo(-1.2, 31), Fo(-1.4, 27.5)], true); shape(ctx, _mixHex(BIO.huid, '#1A2740', 0.25), BIO.huidS, 1.2); z9Glad(ctx, [Fo(1.6, 25.2), Fo(3.4, 27.2), Fo(3.9, 30.2), Fo(3.0, 30.6), Fo(1.9, 28.4)], true); shape(ctx, _mixHex(BIO.huid, '#1A2740', 0.25), BIO.huidS, 1.2); ctx.strokeStyle = BIO.huidS; ctx.lineWidth = 1; for (const k of [0.2, 0.9, 1.6]) { const p1 = Fo(k - 0.4, 31.5), p2 = Fo(k - 0.2, 35.5); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); } ctx.restore(); }
  // spieren
  const R = {}; ctx.save(); ctx.globalAlpha *= spieren;
  // triceps (achter): buik van y 4 tot ± 25, pees naar het olecranon; lange kop naar onder de schouderkom
  { const aT = D('triceps'), wT = (4.2 + 1.0 * ctr) * s, A = Up(-1.3, 3.5), B = Up(-1.6, 25.5 - 1.5 * ctr);
    z9Pees(ctx, [Up(-1.1, -1.7), Up(-1.8, 0.8), Up(-2.0, 3.8)], 0.4 * s, aT);
    z9Buik(ctx, A, B, wT, -1, { a: aT, bol: 0.55 }); z9Pees(ctx, [B, Up(-2.7, 28.0), Up(-2.9, 30.2), Fo(-1.6, -2.3)], 0.75 * s, aT);
    if (hl.triceps) { ctx.save(); ctx.globalAlpha *= hl.triceps; ctx.setLineDash([]); z9Buik(ctx, A, B, wT, -1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.45 }); ctx.restore(); }
    R.triceps = Up(-1.5 - 0.75 * wT / s, 14); }
  // biceps (voor): buik van y 9 tot ± 23, korter en dikker bij spanning; pees naar de knobbel van het spaakbeen
  { const aB = D('biceps'), wB = (3.4 + 1.8 * cb) * s, A = Up(1.25, 7.5 + 1.2 * cb), B = Up(1.8, 25.0 - 2.4 * cb);
    z9Pees(ctx, [Up(0.6, -2.3), Up(1.6, -1.4), Up(2.0, 3), Up(1.9, 7.8 + 1.2 * cb)], 0.32 * s, aB); // lange kop over de kop van het opperarmbeen
    z9Pees(ctx, [Up(2.2, -1.8), Up(2.5, 2.5), Up(2.0, 7.8 + 1.2 * cb)], 0.32 * s, aB * 0.8); // korte kop vanaf het ravenbekuitsteeksel
    z9Buik(ctx, A, B, wB, 1, { a: aB, bol: 0.6 }); const T = Fo(1.5, 3.2); z9Pees(ctx, [B, Up(2.5, 27.4 - cb), Up(2.7, 29.6), T], 0.75 * s, aB);
    if (hl.biceps) { ctx.save(); ctx.globalAlpha *= hl.biceps; z9Buik(ctx, A, B, wB, 1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.5 }); ctx.restore(); }
    R.biceps = Up(1.3 + 0.85 * wB / s, 16); R.bicepsPees = T; }
  ctx.restore();
  ctx.restore();
  R.schouder = [sx, sy]; R.elleboog = E; R.hand = Fo(0.6, 31); R.olecranon = Fo(-1.7, -2.2); R.opperarm = Up(0, 15); R.onderarm = Fo(0.4, 13); R.Up = Up; R.Fo = Fo;
  return R;
}

// =====================================================================================
// GEWRICHT IN DOORSNEDE (schouder, kogelgewricht; van voren in een frontale snede). Recept (OpenStax A&P 9.4):
// gewrichtskop en -kom bekleed met kraakbeen (glad, zonder bloedvaten), gewrichtsholte met een dun laagje gewrichtssmeer,
// gewrichtskapsel als mouw van bindweefsel van bot naar bot, gewrichtsbanden als verdikkingen buiten het kapsel.
// Bekende fouten: kraakbeen als losse schijf; holte als grote lege ruimte; kapsel dat niet aan het bot vastzit.
// draai = hoek van het opperarmbeen (rad), hl = { kop, kom, kraakbeen, kapsel, smeer, banden }.
// =====================================================================================
function gewrichtDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, draai = 0, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.3 + 0.7 * (hl[k] == null ? 1 : hl[k]);
  const R = 2.4 * s, gap = 0.07 * R, kb = 0.1 * R, cup = 0.95; // straal kop (± 2,4 cm), spleet, kraakbeendikte, halve openingshoek kom
  const spons = (cx, cy, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = hash(i + seed) * 6.283, rr = Math.sqrt(hash(i * 3 + seed)); circ(ctx, cx + Math.cos(an) * rr * rx, cy + Math.sin(an) * rr * ry, 1.4 + hash(i + 7 + seed) * 2.6, rgba(Z9.botS, 0.55)); } };
  // schouderblad met kom (links)
  const r2 = R + gap + kb; ctx.save(); ctx.globalAlpha *= L('kom');
  ctx.beginPath(); ctx.moveTo(Math.cos(Math.PI - cup) * r2 - 0.25 * R, -Math.sin(Math.PI - cup) * r2 - 0.25 * R); ctx.lineTo(-2.6 * R, -1.6 * R); ctx.lineTo(-2.9 * R, 1.9 * R); ctx.lineTo(Math.cos(Math.PI + cup) * r2 - 0.25 * R, -Math.sin(Math.PI + cup) * r2 + 0.25 * R);
  ctx.lineTo(Math.cos(Math.PI + cup) * r2, -Math.sin(Math.PI + cup) * r2); ctx.arc(0, 0, r2, Math.PI - cup, Math.PI + cup, false); ctx.closePath(); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.save(); ctx.clip(); spons(-1.9 * R, 0, 0.9 * R, 1.5 * R, 90, 3); ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R + gap + kb, Math.PI - cup, Math.PI + cup, false); ctx.arc(0, 0, R + gap, Math.PI + cup, Math.PI - cup, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // gewrichtssmeer: dun laagje in de spleet, met twee zakjes binnen het kapsel
  ctx.save(); ctx.globalAlpha *= L('smeer'); ctx.beginPath(); ctx.arc(0, 0, R + gap, Math.PI - cup - 0.15, Math.PI + cup + 0.15, false); ctx.arc(0, 0, R, Math.PI + cup + 0.15, Math.PI - cup - 0.15, true); ctx.closePath(); ctx.fillStyle = rgba(Z9.smeer, 0.9); ctx.fill();
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-0.42 * R, sg * 1.02 * R, 0.3 * R, 0.1 * R, sg * 0.5, 0, 6.283); ctx.fillStyle = rgba(Z9.smeer, 0.75); ctx.fill(); } ctx.restore();
  // opperarmbeen: kop + hals + schacht, draait om het middelpunt van de kop
  ctx.save(); ctx.rotate(draai); ctx.globalAlpha *= L('kop'); const sa = 1.05, sw = 0.55 * R; // schachtrichting (rad onder de horizontaal), halve breedte
  const ux = Math.cos(sa), uy = Math.sin(sa), nx = -uy, ny = ux, b0 = [0.35 * R * ux, 0.35 * R * uy], b1 = [b0[0] + 3.6 * R * ux, b0[1] + 3.6 * R * uy];
  const hum = () => { ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.moveTo(b0[0] - nx * sw * 1.45, b0[1] - ny * sw * 1.45); ctx.lineTo(b1[0] - nx * sw, b1[1] - ny * sw); ctx.lineTo(b1[0] + nx * sw, b1[1] + ny * sw); ctx.lineTo(b0[0] + nx * sw * 1.7, b0[1] + ny * sw * 1.7); ctx.closePath(); };
  hum(); ctx.strokeStyle = Z9.botS; ctx.lineWidth = 3; ctx.stroke(); hum(); ctx.fillStyle = Z9.bot; ctx.fill('nonzero');
  hum(); ctx.save(); ctx.clip(); spons(0.15 * R, 0.15 * R, 0.85 * R, 0.85 * R, 110, 9); ctx.beginPath(); ctx.moveTo(b0[0] + ux * R * 0.9, b0[1] + uy * R * 0.9); ctx.lineTo(b1[0], b1[1]); ctx.strokeStyle = rgba(Z9.mergG, 0.9); ctx.lineWidth = sw * 0.9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  ctx.globalAlpha /= L('kop'); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R, Math.PI - cup - 0.35, Math.PI + cup + 0.35, false); ctx.arc(0, 0, R - kb, Math.PI + cup + 0.35, Math.PI - cup - 0.35, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1);
  ctx.restore();
  // kapsel: mouw van de rand van de kom naar de hals (boven en onder)
  const rot = (px, py) => [px * Math.cos(draai) - py * Math.sin(draai), px * Math.sin(draai) + py * Math.cos(draai)];
  ctx.save(); ctx.globalAlpha *= L('kapsel'); ctx.strokeStyle = Z9.kapsel; ctx.lineWidth = 0.13 * R; ctx.lineCap = 'round';
  const kb1 = [Math.cos(Math.PI - cup) * r2 - 0.1 * R, -Math.sin(Math.PI - cup) * r2 - 0.12 * R], ke1 = rot(0.55 * R, -1.18 * R), kb2 = [Math.cos(Math.PI + cup) * r2 - 0.1 * R, -Math.sin(Math.PI + cup) * r2 + 0.12 * R], ke2 = rot(-0.15 * R, 1.35 * R);
  ctx.beginPath(); ctx.moveTo(kb1[0], kb1[1]); ctx.bezierCurveTo(-0.5 * R, -1.45 * R, 0.1 * R, -1.5 * R, ke1[0], ke1[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kb2[0], kb2[1]); ctx.bezierCurveTo(-0.6 * R, 1.45 * R, -0.35 * R, 1.6 * R, ke2[0], ke2[1]); ctx.stroke(); ctx.restore();
  // banden: verdikkingen aan de buitenkant van het kapsel
  ctx.save(); ctx.globalAlpha *= L('banden'); ctx.strokeStyle = Z9.pees; ctx.lineWidth = 0.07 * R; ctx.lineCap = 'round';
  for (const d of [0.12, 0.24]) { ctx.beginPath(); ctx.moveTo(kb1[0] - 0.1 * R, kb1[1] - d * R); ctx.bezierCurveTo(-0.5 * R, -(1.45 + d) * R, 0.1 * R, -(1.5 + d) * R, ke1[0] + 0.1 * R, ke1[1] - d * R); ctx.stroke(); } ctx.restore();
  ctx.restore();
  return { kop: [x + 0.35 * R, y], kom: [x - 1.9 * R, y + 0.2 * R], kraakbeen: [x - 1.1 * R, y - 0.75 * R], smeer: [x - 0.42 * R, y + 1.02 * R], kapsel: [x - 0.3 * R, y - 1.45 * R], banden: [x - 0.1 * R, y - 1.85 * R], R };
}
// =====================================================================================
// BOT IN LENGTEDOORSNEDE (pijpbeen, bv. opperarmbeen). Recept (OpenStax A&P 6.3): wand van compact bot, uiteinden met
// sponsachtig bot en rood beenmerg, holte in de schacht met (bij volwassenen) geel beenmerg, beenvlies om de buitenkant,
// bloedvat dat door een gaatje naar binnen gaat, kraakbeen op de gewrichtsvlakken.
// =====================================================================================
function botDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, hl = {}, len = 30, rood = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.35 + 0.65 * (hl[k] == null ? 1 : hl[k]);
  const w = 1.25 * s, k1 = 2.6 * s, H = len * s / 2; // halve schachtbreedte, straal uiteinde
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(-w, -H + k1 * 1.4); ctx.bezierCurveTo(-w * 1.4, -H + k1 * 0.8, -k1, -H + k1 * 0.6, -k1, -H); ctx.arc(0, -H, k1, Math.PI, 0); ctx.bezierCurveTo(k1, -H + k1 * 0.6, w * 1.4, -H + k1 * 0.8, w, -H + k1 * 1.4);
    ctx.lineTo(w, H - k1 * 1.4); ctx.bezierCurveTo(w * 1.4, H - k1 * 0.8, k1 * 1.1, H - k1 * 0.5, k1 * 1.05, H); ctx.arc(0, H, k1 * 1.05, 0, Math.PI); ctx.bezierCurveTo(-k1 * 1.1, H - k1 * 0.5, -w * 1.4, H - k1 * 0.8, -w, H - k1 * 1.4); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= L('bot'); omtrek(); shape(ctx, Z9.bot, Z9.botS, 1.5); ctx.restore();
  ctx.save(); omtrek(); ctx.clip();
  // sponsachtig bot met rood beenmerg in de uiteinden
  ctx.save(); ctx.globalAlpha *= L('rood'); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * (H - 0.15 * s), k1 * 0.86, k1 * 1.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(Z9.merg, '#E6DCC6', 1 - 0.75 * rood); ctx.fill();
    for (let i = 0; i < 90; i++) { const px = (hash(i + sg * 7) - 0.5) * k1 * 1.6, py = sg * (H - 0.15 * s) + (hash(i * 3 + sg) - 0.5) * k1 * 2.8; circ(ctx, px, py, 2 + hash(i + 11) * 3, Z9.botR); } } ctx.restore();
  // mergholte met geel beenmerg in de schacht
  ctx.save(); ctx.globalAlpha *= L('geel'); roundRect(ctx, -w * 0.62, -H + k1 * 1.3, w * 1.24, 2 * H - k1 * 2.6, w * 0.5); ctx.fillStyle = Z9.mergG; ctx.fill(); ctx.restore();
  ctx.restore();
  // kraakbeen op het gewrichtsvlak
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, -H, k1, Math.PI + 0.25, -0.25); ctx.arc(0, -H, k1 - 0.3 * s, -0.25, Math.PI + 0.25, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // beenvlies + bloedvat dat naar binnen gaat
  ctx.save(); ctx.globalAlpha *= L('vlies'); ctx.strokeStyle = rgba('#C9B896', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w - 2.5, -H + k1 * 1.5); ctx.lineTo(-w - 2.5, H - k1 * 1.5); ctx.moveTo(w + 2.5, -H + k1 * 1.5); ctx.lineTo(w + 2.5, H - k1 * 1.5); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('bloedvat'); ctx.strokeStyle = BIO.bloed; ctx.lineWidth = 0.28 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(w + 2.2 * s, -0.2 * H); ctx.quadraticCurveTo(w + 0.6 * s, -0.1 * H, w - 0.2 * s, 0); ctx.quadraticCurveTo(0, 0.12 * H, -0.3 * s, 0.6 * H); ctx.moveTo(-0.1 * s, 0.05 * H); ctx.quadraticCurveTo(0.2 * s, -0.3 * H, 0, -0.7 * H); ctx.stroke(); ctx.restore();
  ctx.restore();
  return { rood: [x, y - H], geel: [x, y + 0.1 * H], kraakbeen: [x, y - H - k1], bloedvat: [x + w + 1.4 * s, y - 0.18 * H], vlies: [x - w - 3, y + 0.4 * H], wand: [x + w, y + 0.35 * H] };
}
// botcellen in kalk (zoomcirkel): ringen van kalk rond een kanaaltje met bloedvat, botcellen met uitlopers in de ringen
function botWeefsel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#D9CFB6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const centra = [[-0.35, -0.3], [0.42, -0.2], [0, 0.45], [-0.6, 0.5], [0.75, 0.55], [-0.05, -0.85], [0.8, -0.8]];
  centra.forEach(([cx0, cy0], j) => { const cx = x + cx0 * r, cy = y + cy0 * r, R0 = r * 0.36;
    for (let k = 5; k >= 1; k--) { ctx.beginPath(); ctx.arc(cx, cy, R0 * k / 5, 0, 6.283); ctx.strokeStyle = rgba('#A89A7A', 0.7); ctx.lineWidth = 1.2; ctx.stroke(); }
    circ(ctx, cx, cy, R0 * 0.16, '#3A2A2A'); circ(ctx, cx, cy, R0 * 0.07, rgba(BIO.bloed, levend)); // kanaal met bloedvat
    for (let i = 0; i < 9; i++) { const an = i * 0.7 + j, rr = R0 * (0.4 + 0.5 * hash(i + j * 9)), bx = cx + Math.cos(an) * rr, by = cy + Math.sin(an) * rr;
      ctx.save(); ctx.globalAlpha *= levend; ctx.strokeStyle = rgba(BIO.kern, 0.7); ctx.lineWidth = 1; for (let q = 0; q < 4; q++) { const aq = an + q * 1.57 + 0.4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(aq) * R0 * 0.12, by + Math.sin(aq) * R0 * 0.12); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(bx, by, R0 * 0.07, R0 * 0.04, an + 1.57, 0, 6.283); shape(ctx, BIO.kern, BIO.kernL, 1); ctx.restore(); } });
  ctx.restore(); }

// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// =====================================================================================
function sarcomeer(ctx, x, y, s, o = {}) { const { L = 2.5, a = 1, rijen = 4, kop = 0, hl = {}, volg = false, tropo = 0, t = 0, dz = 0.42 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hz = L / 2 * s, act = 1.0 * s, myo = 0.8 * s, gapY = dz * s, top = y - (rijen - 0.5) * gapY / 2 * 2 / 2 * 1;
  const ys = [...Array(rijen)].map((_, i) => y + (i - (rijen - 1) / 2) * gapY);
  // Z-lijnen
  for (const sg of [-1, 1]) { ctx.strokeStyle = Z9.zlijn; ctx.lineWidth = Math.max(2, 0.03 * s); ctx.beginPath(); const zx = x + sg * hz;
    for (let k = 0; k <= 8; k++) { const yy = ys[0] - gapY * 0.6 + k * (ys[ys.length - 1] - ys[0] + gapY * 1.2) / 8; k ? ctx.lineTo(zx + (k % 2 ? 4 : -4), yy) : ctx.moveTo(zx, yy); } ctx.stroke(); }
  // actine: van elke Z-lijn naar binnen, tussen de myosinerijen (boven en onder elke rij)
  const actYs = []; for (let i = 0; i <= rijen; i++) actYs.push(ys[0] - gapY / 2 + i * gapY);
  ctx.save(); ctx.globalAlpha *= hl.actine != null ? 0.35 + 0.65 * hl.actine : 1;
  for (const ay of actYs) for (const sg of [-1, 1]) { const x0 = x + sg * hz, x1 = x0 - sg * act;
    ctx.strokeStyle = Z9.actine; ctx.lineWidth = Math.max(3, 0.035 * s); ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = lighten(Z9.actine, 0.25); for (let k = 0; k < act / (0.055 * s); k++) { const xx = x0 - sg * (k + 0.5) * 0.055 * s; circ(ctx, xx, ay + (k % 2 ? 1.5 : -1.5), Math.max(1.6, 0.018 * s), lighten(Z9.actine, 0.25)); }
    if (tropo > 0.01) { ctx.save(); ctx.globalAlpha *= tropo; ctx.strokeStyle = C.paars; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 - sg * act * k / 20; k ? ctx.lineTo(xx, ay + Math.sin(k * 1.6) * 3) : ctx.moveTo(xx, ay); } ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // myosine: dikke draad in het midden, koppen op beide helften behalve de kale zone
  ctx.save(); ctx.globalAlpha *= hl.myosine != null ? 0.35 + 0.65 * hl.myosine : 1; const kale = 0.15 * s;
  for (const my of ys) { roundRect(ctx, x - myo, my - Math.max(3, 0.05 * s), 2 * myo, Math.max(6, 0.1 * s), Math.max(3, 0.05 * s)); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1);
    for (const sg of [-1, 1]) for (let k = 0; k < 9; k++) { const kx = x + sg * (kale + (k + 0.5) * (myo - kale) / 9);
      for (const up of [-1, 1]) { const fase = (kop + k * 0.13 + (up > 0 ? 0.07 : 0)) % 1, hoek = fase < 0.5 ? lerp(0.9, 0.35, fase * 2) : lerp(0.35, 0.9, (fase - 0.5) * 2);
        const lx = kx + sg * Math.cos(hoek) * 0.07 * s * 0.5, ly = my + up * (Math.max(3, 0.05 * s) + Math.sin(hoek) * 0.12 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.018 * s); ctx.beginPath(); ctx.moveTo(kx, my + up * Math.max(3, 0.05 * s)); ctx.lineTo(lx, ly); ctx.stroke(); circ(ctx, lx, ly, Math.max(2.2, 0.025 * s), lighten(Z9.myosine, 0.15)); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}
// myofibril: een buis met banden (lichte en donkere banden, Z-lijnen) als herhaling van sarcomeren
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.55), BIO.spierL, 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s; let i = 0; for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2; ctx.fillStyle = rgba('#5A2A26', 0.6); ctx.fillRect(mid - 0.8 * s, y - h / 2, 1.6 * s, h);
    ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(xx - 1, y - h / 2, 2, h); if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIER IN DWARSDOORSNEDE MET MOTORISCHE EENHEDEN. Recept (OpenStax A&P 10.5; Purves 4e h. 16): spiervezels als veelhoeken
// (± 50 µm), in bundels met bindweefsel; de vezels van één motorische eenheid liggen verspreid door de spier, niet in een groepje.
// Een eenheid trekt alles-of-niets samen; kleine eenheden eerst, daarna grotere (groottebeginsel).
// aan = aantal actieve eenheden (0..n, kommagetal = de volgende komt op), eenheden = [{n: vezels, kleur}].
// =====================================================================================
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.25), Z9.peesR, 2);
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  let start = 0; eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  V.forEach((v, i) => { const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, v.pts); const base = rgba(BIO.spier, 0.55);
    ctx.fillStyle = act > 0.01 ? _mixHex(BIO.spier, kl, 0.75 * act) : base; ctx.fill(); ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba(BIO.spierL, 0.6); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    circ(ctx, v.pts[(i * 5) % v.pts.length][0] * 0.82 + v.c[0] * 0.18, v.pts[(i * 5) % v.pts.length][1] * 0.82 + v.c[1] * 0.18, 2.2, rgba(BIO.kern, 0.85)); });
  ctx.restore();
  return { V, eig, punten: (j) => V.filter((_, i) => eig[i] === j).map(v => v.c) };
}
// motorische zenuwcel die zich vertakt naar de vezels van één eenheid (bovenop spierDwars getekend; 'vanuit' = beginpunt axon)
function eenheidZenuw(ctx, vanuit, punten, kleur, o = {}) { const { a = 1, puls = -1, dik = 4 } = o; if (a <= 0.01 || !punten.length) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const mx = punten.reduce((s2, p) => s2 + p[0], 0) / punten.length, my = punten.reduce((s2, p) => s2 + p[1], 0) / punten.length, tak = [lerp(vanuit[0], mx, 0.62), lerp(vanuit[1], my, 0.62)];
  ctx.strokeStyle = kleur; ctx.lineWidth = dik; ctx.beginPath(); ctx.moveTo(vanuit[0], vanuit[1]); ctx.quadraticCurveTo(lerp(vanuit[0], tak[0], 0.5), vanuit[1], tak[0], tak[1]); ctx.stroke();
  ctx.lineWidth = Math.max(1.2, dik * 0.4); for (const p of punten) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.quadraticCurveTo((tak[0] + p[0]) / 2 + (hash(p[0]) - 0.5) * 30, (tak[1] + p[1]) / 2, p[0], p[1]); ctx.stroke(); circ(ctx, p[0], p[1], 3.2, kleur); }
  if (puls >= 0 && puls <= 1) { const px = lerp(vanuit[0], tak[0], puls), py = lerp(vanuit[1], tak[1], puls); circ(ctx, px, py, dik * 1.6, C.goud); }
  ctx.restore(); }

// =====================================================================================
// EMG-SPOOR (plakkers op de huid): som van de piekjes van veel eenheden. Vereenvoudigd: we tekenen het ruwe signaal, dat
// groter en dichter wordt naarmate er meer eenheden meedoen en sneller vuren (Purves h. 16; De Luca 1997, oppervlakte-EMG).
// niveau 0..1 = hoeveel kracht; t schuift het spoor. Deterministisch (hash).
// =====================================================================================
function emgSpoor(ctx, x, y, w, h, o = {}) { const { a = 1, niveau = 0.1, t = 0, kleur = C.teal, rooster = true, geschiedenis = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0D1420', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  if (rooster) { ctx.strokeStyle = rgba('#FFFFFF', 0.05); ctx.lineWidth = 1; for (let gx = x; gx < x + w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); } }
  ctx.strokeStyle = kleur; ctx.lineWidth = 1.6; ctx.beginPath(); const N = Math.floor(w / 1.5), my = y + h / 2;
  for (let i = 0; i <= N; i++) { const xx = x + i * 1.5, tt = t * 300 + i, lev = geschiedenis ? geschiedenis(i / N) : niveau; let v = 0;
    const eenh = Math.floor(2 + lev * 40); for (let j = 0; j < eenh; j++) { const per = Math.max(6, 40 - lev * 22 - j * 0.15), ph = Math.floor(hash(j * 13.1) * per), q = (Math.floor(tt) + ph) % Math.floor(per); if (q < 3) v += (q === 1 ? 1 : -0.6) * (0.25 + 0.75 * hash(j * 3.3)) * (0.4 + j / 40); }
    v += (hash(tt * 0.37) - 0.5) * 0.08; const yy = my - clamp(v * h * 0.22, -h * 0.46, h * 0.46); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.stroke(); ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.18), Z9.peesR, 1.5);
  for (const dy of [-0.45, 0, 0.45]) { roundRect(ctx, x - L * 0.42, y + dy * h - h * 0.14, L * 0.84, h * 0.28, h * 0.14); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1); }
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }

// =====================================================================================
// PRACTICUMLOKAAL: tafel, laptop met EMG-spoor, plakkers. Noor zit (zijaanzicht, outfit zomer = korte mouw), onderarm vooruit.
// =====================================================================================
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function plakker(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 1.5); circ(ctx, x, y, r * 0.35, '#C9CED6'); ctx.restore(); }
function draad(ctx, pts, kleur = '#C9CED6', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }
function schooltas(ctx, x, y, s, o = {}) { const { a = 1, kleur = '#2E5C6E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // hangt aan het handvat (x,y), s = px per cm (± 40 × 30 cm)
  ctx.strokeStyle = _mixHex(kleur, '#000000', 0.3); ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 4 * s, y + 5 * s); ctx.quadraticCurveTo(x, y - 2 * s, x + 4 * s, y + 5 * s); ctx.stroke();
  roundRect(ctx, x - 16 * s, y + 4 * s, 32 * s, 30 * s, 4 * s); shape(ctx, kleur, _mixHex(kleur, '#FFFFFF', 0.25), 2); roundRect(ctx, x - 12 * s, y + 18 * s, 24 * s, 12 * s, 3 * s); shape(ctx, _mixHex(kleur, '#000000', 0.15), null); ctx.restore(); }
function veertje(ctx, x, y, s, o = {}) { const { a = 1, rot = -0.4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(2 * s, -1.6 * s, 7 * s, -1.4 * s, 9 * s, 0); ctx.bezierCurveTo(7 * s, 1.2 * s, 2 * s, 1.0 * s, 0, 0); shape(ctx, '#F2F2EE', '#C9CED6', 1);
  ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-1.5 * s, 0.3 * s); ctx.lineTo(9 * s, 0); ctx.stroke(); ctx.restore(); }
// Practicumscène (castpersonages): Mevrouw Visser, Noor zittend met plakkers en een last in de hand, Sam, tafel met laptop.
// o: last ('veer'|'boek'|'tas'|null), emg 0..1 (niveau op het scherm), armE (elleboog), zak 0..1 (arm zakt bij vallen), visser, sam
// vingertoppen met nitrilhandschoen (practicum), punt = waar ze knijpen
// reflexboog (vwo): sensorisch neuron van het spoeltje naar het ruggenmerg, direct over op het motorisch neuron terug naar de spier

// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — tekeningen ronde 2 (na keuring 26 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// =====================================================================================

// ARMMODEL (practicum, Kamiel 26 okt 2026 in plaats van de kippenvleugel). Twee latjes met een scharnier, twee touwtjes als spieren.
// Bovenste latje staat vast op een voetje; onderste latje scharniert eronder en steekt een stukje achter het scharnier uit
// (zoals het uitsteeksel van de ellepijp). Touwtje voor zit vóór het scharnier vast, touwtje achter aan het stompje.
// Elk touwtje loopt door een oogje bovenaan en eindigt in een ringetje. e = hoek onderste latje (0 = recht naar beneden,
// 1.57 = horizontaal naar voren). knikV / knikA 0..1 = touwtje voor/achter geduwd (knikt), trekV / trekA = trekpijl.
// s = px per cm (latjes ± 30 cm). Voorkant = +x.
function armModel(ctx, x, y, s, o = {}) { const { a = 1, e = 0.2, knikV = 0, knikA = 0, trekV = 0, trekA = 0, hlV = 0, hlA = 0, dimV = 0, dimA = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hout = '#C9A36A', houtS = '#9A7A4A', H = [x, y], top = [x, y - 30 * s];
  // statief (staat op tafel op hoogte o.statief) met een klem bovenaan
  if (o.statief != null) { ctx.fillStyle = '#8A94A6'; ctx.fillRect(x - 15 * s, y - 34 * s, 1.4 * s, o.statief - (y - 34 * s)); roundRect(ctx, x - 22 * s, o.statief - 1.6 * s, 16 * s, 1.6 * s, 0.5 * s); shape(ctx, '#5A6478', null); }
  roundRect(ctx, x - 16 * s, y - 34 * s, 22 * s, 3 * s, 1 * s); shape(ctx, _mixHex(hout, '#000000', 0.15), houtS, 1.5);
  // bovenste latje (opperarm)
  roundRect(ctx, x - 1.4 * s, y - 31 * s, 2.8 * s, 31 * s, 1 * s); shape(ctx, hout, houtS, 1.5);
  // onderste latje (onderarm) met stompje achter het scharnier
  const ux = Math.sin(e), uy = Math.cos(e), F = (d, n = 0) => [x + ux * d * s + uy * n * s, y + uy * d * s - ux * n * s];
  ctx.save(); ctx.translate(x, y); ctx.rotate(-e); roundRect(ctx, -1.3 * s, -4 * s, 2.6 * s, 32 * s, 1 * s); shape(ctx, _mixHex(hout, '#FFFFFF', 0.08), houtS, 1.5); ctx.restore();
  // scharnier
  circ(ctx, x, y, 1.5 * s, '#8A94A6', '#5A6478', 1.5); circ(ctx, x, y, 0.5 * s, '#3A4458');
  // oogjes bovenaan (voor en achter)
  const oogV = [x + 2.6 * s, y - 27 * s], oogA = [x - 2.6 * s, y - 27 * s];
  for (const p of [oogV, oogA]) { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 * s, 0, 6.283); ctx.stroke(); }
  // aanhechtingen
  const hV = F(5, 1.3), hA = F(-3.2, -0.6);
  const touw = (oog, h, knik, hl, dimK, kleur) => { ctx.save(); ctx.globalAlpha *= dimK ? 0.35 : 1; const d = Math.hypot(h[0] - oog[0], h[1] - oog[1]);
    ctx.strokeStyle = hl > 0.01 ? _mixHex('#E9E3D2', C.goud, hl) : '#E9E3D2'; ctx.lineWidth = 4 + 2 * hl;
    ctx.beginPath(); ctx.moveTo(h[0], h[1]);
    if (knik > 0.01) { // te veel touw: het knikt opzij
      const mx = (h[0] + oog[0]) / 2, my = (h[1] + oog[1]) / 2, nx = (oog[1] - h[1]) / d, ny = -(oog[0] - h[0]) / d, sg = oog[0] > x ? 1 : -1, b = knik * 5 * s * sg;
      ctx.bezierCurveTo(h[0] + nx * b * 0.4, h[1] + ny * b * 0.4, mx + nx * b * 1.4, my + ny * b * 1.4 + 2 * s, mx + nx * b, my + ny * b);
      ctx.bezierCurveTo(mx + nx * b * 0.6 - 2 * s * sg, my - 3 * s, oog[0] + nx * b * 0.3, oog[1] + ny * b * 0.3 + 3 * s, oog[0], oog[1]);
    } else ctx.lineTo(oog[0], oog[1]);
    ctx.stroke(); circ(ctx, h[0], h[1], 0.8 * s, '#8A94A6');
    // vrij eind boven het oogje met ringetje (langer naarmate er minder touw onder het oogje zit)
    const vrij = Math.max(2, 22 - d / s + (knik > 0 ? -knik * 4 : 0)), ex = oog[0] + (oog[0] > x ? 0.6 : -0.6) * s, ey = oog[1] - vrij * s;
    ctx.beginPath(); ctx.moveTo(oog[0], oog[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey - 1.1 * s, 1.1 * s, 0, 6.283); ctx.strokeStyle = kleur; ctx.stroke();
    ctx.restore(); return [ex, ey - 1.1 * s]; };
  const rV = touw(oogV, hV, knikV, hlV, dimV, C.goud), rA = touw(oogA, hA, knikA, hlA, dimA, C.teal);
  if (trekV > 0.01) pijl(ctx, rV[0], rV[1] - 1.5 * s, rV[0], rV[1] - 1.5 * s - 7 * s * trekV, C.goud, 1, 5, 18);
  if (trekA > 0.01) pijl(ctx, rA[0], rA[1] - 1.5 * s, rA[0], rA[1] - 1.5 * s - 7 * s * trekA, C.teal, 1, 5, 18);
  ctx.restore();
  return { scharnier: H, top, hand: F(27), onder: F(14), boven: [x, y - 15 * s], hechtV: hV, hechtA: hA, ringV: rV, ringA: rA, oogV, oogA };
}

// EÉN MYOSINEKOP OP DE ACTINE (groot schema; lengterichting). Recept (Alberts h. 16; OpenStax A&P 10.3): de kop zit met een
// hals aan de dikke draad; gespannen staat hij ± loodrecht, na de krachtslag gekanteld naar het midden van de sarcomeer
// (hier: naar links = midden); de actine schuift dan mee naar links. hoek 0 = gespannen (± 85°), 1 = gekanteld (± 40°).
// vast 0..1 = gebonden aan de actine; actX = verschuiving actine (px); chip = 'ATP'|'ADP'|'ADP+P'|null op de kop.
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true, tropo = 0, rijen = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  // dikke draad (myosine) onder
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1.5);
  // actine boven: kralensnoer, schuift met actX; bindplekken donker
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip();
  for (let k = -14; k < 30; k++) { const bx = x - 10 * s + k * 0.62 * s + (actX % (0.62 * s * 6)), by = ay + (k % 2 ? 0.22 : -0.22) * s;
    circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (plekken && ((k % 6) + 6) % 6 === 0) circ(ctx, bx, by + 0.3 * s, 0.13 * s, '#1A2A3A'); }
  ctx.restore();
  // hals + kop
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.35 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(kx, kopY + 0.4 * s); ctx.stroke();
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.85 * s, 0, 0, 6.283); shape(ctx, lighten(Z9.myosine, 0.15), hl > 0.5 ? C.goud : Z9.myosine, hl > 0.5 ? 3 : 1.5); ctx.restore();
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; tag(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, 1, 'left', Math.round(0.42 * s)); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}

// ACTINE MET TROPOMYOSINE EN TROPONINE (vwo, schema). Recept (OpenStax A&P 10.3; Alberts h. 16): tropomyosine ligt als een
// draad over de bindplekken; troponine zit eraan vast; Ca²⁺ bindt aan troponine → tropomyosine schuift opzij → plekken vrij.
// schuif 0..1, ca 0..1 (calcium gebonden).
function actineDetail(ctx, x, y, w, s, o = {}) { const { a = 1, schuif = 0, ca = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.floor(w / (0.62 * s)); for (let k = 0; k < n; k++) { const bx = x + k * 0.62 * s, by = y + (k % 2 ? 0.22 : -0.22) * s; circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (k % 6 === 3) circ(ctx, bx, by + 0.3 * s, 0.14 * s, '#1A2A3A'); }
  const ty = y + lerp(0.3, -0.75, schuif) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 0.22 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x + k * (n * 0.62 * s) / 60; k ? ctx.lineTo(xx, ty + Math.sin(k * 0.9) * 0.08 * s) : ctx.moveTo(xx, ty); } ctx.stroke();
  const tp = []; for (let k = 3; k < n; k += 6) { const bx = x + (k + 1.5) * 0.62 * s; circ(ctx, bx, ty - 0.1 * s, 0.32 * s, lighten(C.paars, 0.35), C.paars, 1.5); tp.push([bx, ty - 0.1 * s]); if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; circ(ctx, bx + 0.25 * s, ty - 0.45 * s, 0.17 * s, Z9.ca); ctx.restore(); } }
  ctx.restore(); return { tropo: [x + w * 0.5, ty], troponine: tp[0] || [x, y], plek: [x + 3 * 0.62 * s, y + 0.3 * s] }; }

// SARCOPLASMATISCH RETICULUM (vwo): netwerk van buisjes en zakjes om een myofibril; ca 0..1 = calcium dat eruit is.
function reticulum(ctx, x, y, w, h, o = {}) { const { a = 1, ca = 0, t = 0, terug = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.5), BIO.spierL, 1.2);
  for (let xx = x + 20; xx < x + w - 20; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx, y - h / 2 - 8); ctx.bezierCurveTo(xx + 30, y - h / 2 - 22, xx + 60, y - h / 2 - 2, xx + 80, y - h / 2 - 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xx, y + h / 2 + 8); ctx.bezierCurveTo(xx + 30, y + h / 2 + 22, xx + 60, y + h / 2 + 2, xx + 80, y + h / 2 + 12); ctx.stroke(); }
  for (let xx = x + 60; xx < x + w - 40; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.75); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx + 40, y - h / 2 - 12); ctx.bezierCurveTo(xx + 62, y - h / 4, xx + 62, y + h / 4, xx + 40, y + h / 2 + 12); ctx.stroke(); circ(ctx, xx + 40, y - h / 2 - 12, 7, rgba('#7FB7D6', 0.9)); circ(ctx, xx + 40, y + h / 2 + 12, 7, rgba('#7FB7D6', 0.9)); }
  for (let i = 0; i < 26; i++) { const bx = x + 30 + hash(i * 3.1) * (w - 60), up = i % 2 ? -1 : 1, by0 = y + up * (h / 2 + 12), by1 = y + (hash(i * 7.7) - 0.5) * h * 0.7, u = clamp(ca - terug, 0, 1) * clamp(1.2 - hash(i) * 0.4, 0, 1);
    if (u > 0.01) circ(ctx, lerp(bx, bx + (hash(i * 5) - 0.5) * 30, u), lerp(by0, by1, u) + Math.sin(t * 3 + i) * 2, 5, Z9.ca); }
  ctx.restore(); }

// TREKKINGEN TELLEN OP (vwo, grafiek): kracht tegen tijd voor impulsen met een gegeven tussentijd. sneller = 0 (los), 1 (opgeteld)
function trekGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, tussen = 0.5, prog = 1, kleur = C.goud, impulsen = 4, label = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  assen(ctx, x, y, w, h, 'tijd', 'kracht'); const tw = (tt) => tt <= 0 ? 0 : (tt / 0.12) * Math.exp(1 - tt / 0.12);
  const imp = [...Array(impulsen)].map((_, i) => 0.05 + i * tussen); ctx.strokeStyle = kleur; ctx.lineWidth = 3.5; ctx.beginPath();
  const N = 200; for (let i = 0; i <= N * prog; i++) { const tt = i / N * 1.2; let v = 0; for (const t0 of imp) v += tw(tt - t0); const xx = x + i / N * w, yy = y + h - Math.min(v, 2.6) / 2.6 * h * 0.92; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (const t0 of imp) { const xx = x + t0 / 1.2 * w; if (t0 / 1.2 <= prog) { ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y + h + 8); ctx.lineTo(xx, y + h + 30); ctx.stroke(); } }
  if (label) metaText(ctx, label, x + w / 2, y + h + 64, C.text2, 'center', 20);
  ctx.restore(); }

// OOG met oogspier (van opzij, schema) en een stand 0..1 (kijkrichting)
function oogSchema(ctx, x, y, r, o = {}) { const { a = 1, stand = 0.5, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 2); const an = lerp(-0.45, 0.45, stand); const px = x + Math.cos(an) * r * 0.78, py = y + Math.sin(an) * r * 0.78;
  circ(ctx, px, py, r * 0.3, '#5B7FA6'); circ(ctx, px, py, r * 0.15, '#121A26');
  ctx.beginPath(); ctx.moveTo(x - r * 0.2, y - r * 0.98); ctx.bezierCurveTo(x - r * 0.9, y - r * 1.35, x - r * 1.7, y - r * 0.9, x - r * 2.2, y - r * 0.6); ctx.lineWidth = r * 0.22; ctx.strokeStyle = hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.4) : Z9.spier; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r * 2.5, y - r * 1.1); ctx.lineTo(x - r * 2.15, y - r * 0.2); ctx.lineTo(x - r * 2.6, y + r * 0.6); ctx.lineTo(x - r * 2.9, y - r * 0.3); ctx.closePath(); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore(); return { spier: [x - r * 1.2, y - r * 1.15] }; }
// KUIT (onderbeen van opzij, schema) met voet in stand 0..1
function kuitSchema(ctx, x, y, s, o = {}) { const { a = 1, stand = 0, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  z9Glad(ctx, [[x - 1.6 * s, y - 40 * s], [x - 4.8 * s, y - 28 * s], [x - 3.6 * s, y - 14 * s], [x - 2.2 * s, y - 4 * s], [x + 1.8 * s, y - 4 * s], [x + 2.4 * s, y - 20 * s], [x + 2.6 * s, y - 40 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2);
  z9Glad(ctx, [[x - 1.8 * s, y - 37 * s], [x - 4.3 * s, y - 27 * s], [x - 3.0 * s, y - 15 * s], [x - 1.2 * s, y - 15 * s], [x - 0.6 * s, y - 27 * s]], true); shape(ctx, hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.35) : Z9.spier, Z9.spierL, 1.5);
  z9Pees(ctx, [[x - 2.1 * s, y - 15 * s], [x - 2.0 * s, y - 6 * s], [x - 2.4 * s, y - 1.5 * s]], 0.7 * s, 1);
  ctx.save(); ctx.translate(x, y - 3 * s); ctx.rotate(lerp(0, 0.6, stand)); z9Glad(ctx, [[-3 * s, -1 * s], [-3.2 * s, 2.2 * s], [10 * s, 3.2 * s], [11 * s, 1.2 * s], [3 * s, -1.6 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2); ctx.restore();
  ctx.restore(); return { spier: [x - 3.6 * s, y - 26 * s] }; }

// EMG-PANEEL: twee kanalen (biceps, triceps) met optionele staplabels en verborgen sporen
function emgPaneel(ctx, x, y, w, o = {}) { const { a = 1, t = 0, bic = 0.05, tri = 0.02, hisB = null, hisT = null, triA = 1, stappen = null, verbergB = 0, verbergT = 0, hlB = 0, hlT = 0, vraagA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = triA > 0.01 ? 430 : 250; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.kast, 0.92), C.line, 1.5);
  metaText(ctx, 'BICEPS', x + 25, y + 40, hlB > 0.5 ? C.goud : C.teal, 'left', 22); emgSpoor(ctx, x + 20, y + 55, w - 40, 150, { t, rooster: false, niveau: bic, geschiedenis: hisB, kleur: hlB > 0.5 ? C.goud : C.teal });
  if (verbergB > 0.01) { ctx.save(); ctx.globalAlpha *= verbergB; roundRect(ctx, x + 20, y + 55, w - 40, 150, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 160, vraagA, 80); ctx.restore(); }
  if (triA > 0.01) { ctx.save(); ctx.globalAlpha *= triA; metaText(ctx, 'TRICEPS', x + 25, y + 250, hlT > 0.5 ? C.goud : C.text2, 'left', 22); emgSpoor(ctx, x + 20, y + 265, w - 40, 120, { t: t + 3, rooster: false, niveau: tri, geschiedenis: hisT, kleur: hlT > 0.5 ? C.goud : C.teal });
    if (verbergT > 0.01) { ctx.save(); ctx.globalAlpha *= verbergT; roundRect(ctx, x + 20, y + 265, w - 40, 120, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 355, vraagA, 70); ctx.restore(); } ctx.restore(); }
  if (stappen) stappen.forEach((s2, i) => text(ctx, s2[0], x + 20 + (w - 40) * s2[1], y + h - 12, fTekst(22, 600), s2[2] ? C.text : C.text2, 'center'));
  ctx.restore(); }

// PRACTICUMLOKAAL (film): Noor zit aan tafel met plakkers op biceps en triceps; laptop op tafel; Sam en mevrouw Visser staan.
// o.last 'veer'|'boek'|'boeken'|'tas'|null, o.armE elleboog (rad), o.opTafel = arm ligt op tafel, o.uitN gezicht Noor
// stuk huid met een plakker erop en spiervezels eronder (H4)
function huidPlakker(ctx, x, y, w, o = {}) { const { a = 1, t = 0, vuur = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 50, 10); shape(ctx, rgba(BIO.huid, 0.55), BIO.huidS, 1.5);
  for (let k = 0; k < 5; k++) spierVezel(ctx, x + 10, y + 90 + k * 42, w - 20, 32, { seed: k + 4, a: 1 });
  circ(ctx, x + w / 2, y - 6, 40, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x + w / 2, y - 6, 14, '#C9CED6');
  if (vuur > 0.01) for (let k = 0; k < 5; k++) { const u = (t * 1.3 + k * 0.21) % 1; ctx.save(); ctx.globalAlpha *= vuur * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + w * (0.2 + 0.15 * k), y + 90 + (k % 5) * 42, 10 + u * 60, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }


// ---- bibliotheek/dieren/lib_micro_evo.js
// Evolutie v2 · tekenronde 2 (23 okt 2026) — Micro-objecten opnieuw getekend volgens Part C2 en C9 (Moleculen, Cellen).
// Wordt NA teken_evo1..8 geladen en overschrijft daar: bacterie, plasmideRing, pilus, antibioticum, griepVirus (evo4),
// chromosoom (evo6), chromosoom1, chromosoomPaar, geslachtscel (evo1), sikkelcel (evo5) en rodeBloedcel (lib_bio).
// Nieuw en herbruikbaar: dnaDraad (DNA als touw of dubbele helix langs een pad) en nucleoide (bacterie-DNA als rozet van lussen).
// Functienamen en parameters zijn gelijk aan de oude, zodat alle keyframes vanzelf de nieuwe tekening gebruiken.

// ---------- hulpjes ----------
// Let op: lib_cast.js herdefinieert _mix (geeft rgb()), dus _lt/_dk leveren geen hex meer en rgba(_lt(..)) wordt zwart. Daarom eigen hex-mengers.
var _mvL = (h, k = 0.25) => _mixHex(h, "#FFFFFF", k), _mvD = (h, k = 0.25) => _mixHex(h, "#000000", k);
function _mvCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _mvGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }
function _mvPad(ctx, P, closed = true) { ctx.beginPath(); bioPad(ctx, P, closed); }

// =====================================================================================
// DNA-DRAAD. Recept (Part C9 Moleculen): rechtsdraaiende dubbele helix, 2 nm breed, één winding per ±10 bp (3,4 nm),
// grote en kleine groef ongelijk; kleur paars. Op een kleine schaal (w < 6 px) is de helix niet meer te zien: dan een
// touw met een lichte rand en een donkere kern die om de halve winding onderbreekt (suggereert de draaiing).
// Bekende fouten: platte ladder; linksdraaiend; een te dun lijntje dat in de achtergrond verdwijnt (Kamiel: 'ietsje dikker').
// P = punten van het pad; o.w = breedte in px; o.dicht = ring (plasmide, bacteriechromosoom).
// =====================================================================================
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = C.kernR, donker = C.kern, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = glad ? _mvCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _mvGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _mvL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }

// =====================================================================================
// NUCLEOÏDE. Recept: het bacteriechromosoom is één ringvormig DNA-molecuul (E. coli 4,6 Mbp, ±1,5 mm lang) zonder
// kernmembraan, opgevouwen in ±400 superspiraal-lussen van 10–20 kb rond een kern (rozet). Bron: BioNumbers 103792;
// Postow e.a. 2004 (Genes Dev 18:1766). Getekend: één gesloten draad die 10–16 lussen uitstulpt, een deel getwist
// (plectoneem: de armen kruisen elkaar), samen een onregelmatige kluwen in het midden van de cel.
// Bekende fouten: losse krul zonder einde (het is een ring); DNA in een kern met membraan.
// (cx, cy) = midden; rx, ry = halve maten; o.T = puntafbeelding (bv. voor een gebogen bacterie).
// =====================================================================================
function nucleoide(ctx, cx, cy, rx, ry, o = {}) {
  const { w = 3, lussen = 13, seed = 1, a = 1, kleur = C.kernR, donker = C.kern, rot = 0, T = null, helix = 'auto', fase = 0 } = o; if (a <= 0.01) return;
  const P = [], rc = 0.2, n = lussen, cs = Math.cos(rot), sn = Math.sin(rot);
  const kaart = (u, v) => { const px = u * rx, py = v * ry; const q = [cx + px * cs - py * sn, cy + px * sn + py * cs]; return T ? T(q[0], q[1]) : q; };
  for (let k = 0; k < n; k++) {
    const h1 = hash(k * 7.3 + seed * 3.1), h2 = hash(k * 2.9 + seed * 5.7), h3 = hash(k * 4.1 + seed * 1.3);
    const th = (k + 0.6 * (h1 - 0.5)) / n * 6.283, L = 0.38 + 0.55 * h2, buig = (h3 - 0.5) * 2.4, wt = 0.05 + 0.08 * hash(k * 9.7 + seed), m = 1 + Math.floor(hash(k * 3.7 + seed * 2.3) * 3), scheef = (hash(k * 1.7 + seed) - 0.5) * 0.9;
    const rk = rc * (0.5 + 0.9 * hash(k * 5.5 + seed)); const as = (t) => { const an = th + scheef + buig * t * t; return [Math.cos(th) * rk + Math.cos(an) * L * t, Math.sin(th) * rk + Math.sin(an) * L * t, an]; };
    const hwf = (t) => wt * (0.3 + 0.7 * Math.pow(t, 0.7)) * Math.cos(Math.PI * m * t);
    // kern-stukje tussen de lussen
    const thV = (k - 0.5) / n * 6.283, rv = rc * (0.3 + 0.7 * hash(k * 8.1 + seed)); P.push([Math.cos(thV) * rv, Math.sin(thV) * rv]);
    const N = 7; for (let i = 0; i <= N; i++) { const t = i / N, [ax, ay, an] = as(t), h = hwf(t); P.push([ax - Math.sin(an) * h, ay + Math.cos(an) * h]); }
    { const [ax, ay, an] = as(1), h = hwf(1), r0 = Math.abs(wt); const s0 = h >= 0 ? an + Math.PI / 2 : an - Math.PI / 2, dir = h >= 0 ? -1 : 1; // lustop: halve cirkel naar buiten
      for (let i = 1; i < 4; i++) { const b = s0 + dir * Math.PI * i / 4; P.push([ax + Math.cos(b) * r0, ay + Math.sin(b) * r0]); } }
    for (let i = N; i >= 0; i--) { const t = i / N, [ax, ay, an] = as(t), h = hwf(t); P.push([ax + Math.sin(an) * h, ay - Math.cos(an) * h]); }
  }
  const Q = P.map(([u, v]) => kaart(u, v));
  dnaDraad(ctx, Q, { w, kleur, donker, a, dicht: true, helix, fase });
}

// =====================================================================================
// BACTERIE (E. coli). Recept: staafje 2–4 µm lang, 0,7–1 µm breed (BioNumbers 104113: K-12 2,6–4,0 × 0,68–1,04 µm),
// getekend als 1 : 0,28; ronde polen, soms licht gebogen. Gramnegatief: buitenmembraan + dunne celwand (peptidoglycaan)
// als één lichte band, periplasma als smalle donkere spleet, celmembraan als tweede lichte lijn → dubbele rand.
// Binnen: nucleoïde (paarse kluwen, zonder membraan), ribosomen als dichte kleine stippen (±20 nm, tienduizenden),
// een paar polysomen (kralensnoertjes). Buiten: 4–6 flagellen, 5–10 µm lang (2–4× de cel), helix met spoed ±2,3 µm
// (BioNumbers 100095), bij zwemmen gebundeld achter de cel; honderden fimbriae, kort en fijn, loodrecht op de wand.
// Kleur van de cel = allel (teal gevoelig, oker resistent). Gedood: 40%, wand open, inhoud lekt.
// Bekende fouten: kern met membraan; wand en membraan als één lijn; flagel als kort haartje; plasmide even groot als het chromosoom.
// Parameters gelijk aan de oude versie; extra: o.t (fase van de flagelgolf), o.flagel (lengte flagel × cel, standaard 1,25),
// o.fimbriae (standaard: aan vanaf 150 px).
// =====================================================================================
function _bacOmtrek(L, r, d, bend, N = 40) {
  const half = L / 2, top = [], bot = [];
  const rad = (x) => { let q = r; const e = Math.abs(x) - (half - r); if (e > 0) q = r * Math.sqrt(Math.max(0, 1 - (e / r) * (e / r))); if (d > 0) q *= 1 - d * 0.88 * Math.exp(-Math.pow(x / (r * 0.95), 2)); return q; };
  for (let i = 0; i <= N; i++) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); top.push([x, b - rad(x)]); }
  for (let i = N - 1; i >= 1; i--) { const x = -half * Math.cos(Math.PI * i / N); const b = bend(x); bot.push([x, b + rad(x)]); }
  return top.concat(bot); }
function bacterie(ctx, x, y, len, rot = 0, o = {}) {
  const { type = 'gevoelig', plasmide = 0, dood = 0, deling = 0, a = 1, focus = false, seed = 1, zweep = true, t = 0, flagel = 1.25 } = o;
  const fimb = o.fimbriae !== undefined ? o.fimbriae : len >= 150;
  const kl = type === 'resistent' ? EVO.a2 : EVO.a1, L = len, r = len * 0.14, half = L / 2;
  const bendA = (hash(seed * 3.7 + 0.3) - 0.5) * 0.36 * r, bend = (px) => bendA * (1 - Math.pow(px / half, 2)), B = (px, py) => [px, py + bend(px)];
  ctx.save(); ctx.globalAlpha *= a * (dood ? 0.4 : 1); ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = L > 200 ? 48 : 28;
  const buiten = _bacOmtrek(L, r, deling, bend, N);
  // flagellen (achter de cel), gebundeld achter de linkerpool
  if (zweep && !dood) {
    const nf = L < 100 ? 2 : 4 + Math.floor(hash(seed * 1.9) * 3), lf = L * flagel, lam = L * 1.12, amp = L * 0.085;
    ctx.strokeStyle = rgba('#C9D4E0', 0.55); ctx.lineWidth = Math.max(1, r * 0.05);
    for (let i = 0; i < nf; i++) { const h = hash(i * 5.1 + seed), zij = i % 2 ? 1 : -1; const sx = lerp(-half * 0.8, -half * 0.05, h); const sy = bend(sx) + zij * r;
      const bx = -half - L * 0.22, by = bend(-half) + (h - 0.5) * r * 0.5, ph = t * 6.283 + i * 0.8;
      // vanaf de wand eerst naar buiten (haak), dan in een ruime boog naar achteren de bundel in
      const mx = lerp(sx, -half, 0.5); const Pf = [[sx, sy], [sx - L * 0.012, sy + zij * r * 0.3], [mx, bend(mx) + zij * r * (1.2 + 0.15 * h)], [-half - L * 0.06, lerp(bend(-half) + zij * r * 0.8, by, 0.5)]];
      const nst = 26; for (let k = 0; k <= nst; k++) { const dd = k / nst * lf, ramp = Math.min(1, dd / (lam * 0.35)); Pf.push([bx - dd, by + Math.sin(dd / lam * 6.283 - ph) * amp * ramp + (h - 0.5) * r * 0.25 * (1 - dd / lf)]); }
      ctx.beginPath(); bioPad(ctx, Pf, false); ctx.stroke(); } }
  // fimbriae: kort, fijn, loodrecht op de wand
  if (fimb && !dood) { ctx.strokeStyle = rgba('#C9D4E0', 0.32); ctx.lineWidth = 1; ctx.beginPath(); const dichte = _mvGelijk(buiten, Math.max(5, L / 70), true);
    for (let i = 0; i < dichte.length - 1; i++) { const q = dichte[i], h = hash(i * 3.3 + seed); const fl = r * (0.16 + 0.14 * h), tilt = (h - 0.5) * 0.6;
      const nx = -q.nx, ny = -q.ny; const ex = q.x + (nx * Math.cos(tilt) - ny * Math.sin(tilt)) * fl, ey = q.y + (nx * Math.sin(tilt) + ny * Math.cos(tilt)) * fl; ctx.moveTo(q.x, q.y); ctx.lineTo(ex, ey); } ctx.stroke(); }
  // lagen: buitenmembraan + celwand (band), periplasma, celmembraan, cytoplasma
  const ww = Math.max(1.4, r * 0.1), gp = Math.max(1.2, r * 0.07), lwM = Math.max(1, r * 0.035);
  const wand = _bacOmtrek(L - 2 * ww, r - ww, deling, bend, N), mem = _bacOmtrek(L - 2 * (ww + gp), r - ww - gp, deling, bend, N);
  _mvPad(ctx, buiten); ctx.fillStyle = _mvL(kl, 0.15); ctx.fill();
  _mvPad(ctx, wand); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.14); ctx.fill();
  _mvPad(ctx, mem); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.fillStyle = rgba(kl, 0.24); ctx.fill();
  if (L > 40) { // binnenkant
    ctx.save(); _mvPad(ctx, mem); ctx.clip();
    const nc = deling > 0.5 ? [-L * 0.24, L * 0.24] : [-L * 0.06 + (hash(seed * 2.2) - 0.5) * L * 0.04];
    const nrx = deling > 0.5 ? L * 0.15 : L * 0.22, nry = r * 0.6;
    // ribosomen
    const nr = Math.min(1100, Math.round(L * r * 2 / (L < 150 ? 210 : 300))), rr = Math.max(0.9, r * 0.024);
    ctx.fillStyle = rgba(C.ribo, 0.42);
    for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * L * 0.96, py = (hash(i * 3.9 + seed * 1.7) - 0.5) * r * 1.8;
      if (nc.some(cx => Math.pow((px - cx) / (nrx * 1.05), 2) + Math.pow(py / (nry * 1.1), 2) < 1)) continue; const [qx, qy] = B(px, py); ctx.beginPath(); ctx.arc(qx, qy, rr, 0, 6.283); ctx.fill(); }
    if (L >= 300) { ctx.fillStyle = rgba(_mvL(C.ribo, 0.2), 0.75); // polysomen: kralensnoertjes van ribosomen op één mRNA
      for (let p = 0; p < 7; p++) { const h = hash(p * 9.1 + seed); const px0 = (h - 0.5) * L * 0.8, py0 = (hash(p * 4.3 + seed) - 0.5) * r * 1.3; if (nc.some(cx => Math.abs(px0 - cx) < nrx * 1.1 && Math.abs(py0) < nry * 1.1)) continue;
        const an = hash(p * 6.7) * 6.283; for (let k = 0; k < 5; k++) { const [qx, qy] = B(px0 + Math.cos(an + k * 0.25) * k * rr * 3.2, py0 + Math.sin(an + k * 0.25) * k * rr * 3.2); ctx.beginPath(); ctx.arc(qx, qy, rr * 1.15, 0, 6.283); ctx.fill(); } } }
    // nucleoïde(n)
    const dw = clamp(L / 110, 1.5, 6);
    nc.forEach((cx, j) => nucleoide(ctx, cx, 0, nrx, nry, { w: dw, lussen: L < 120 ? 7 : L < 300 ? 11 : 15, seed: seed + j * 11, T: B, fase: t, helix: false }));
    // plasmiden: kleine ringen dubbelstrengs DNA, buiten de nucleoïde, richting de polen; altijd helemaal binnen het celmembraan (Kamiel 23 okt 2026)
    if (plasmide) { const ri = r - ww - gp - lwM, rp = Math.max(4, Math.min(L * 0.065, ri * 0.34)), PL = [[0.33, -1], [-0.36, 1], [0.4, 1], [-0.22, -1]];
      for (let i = 0; i < plasmide; i++) { const [u, zij] = PL[i % 4]; const vy = zij * Math.max(0, ri - rp * 1.25 - 1) * 0.85; const [qx, qy] = B(u / 0.4 * (half - ri - rp) * 0.8, vy);
        plasmideRing(ctx, qx, qy, rp, { gen: true, seed: seed + i }); } }
    ctx.restore();
  }
  // randen: buitenmembraan (licht), binnenrand van de wand, celmembraan als dubbele lijn bij grote cellen
  ctx.strokeStyle = _mvL(kl, 0.45); ctx.lineWidth = Math.max(1.2, r * 0.035);
  if (dood) { const per = Math.max(10, L * 0.09); ctx.setLineDash([per, per * 0.45]); }
  _mvPad(ctx, buiten); ctx.stroke();
  ctx.strokeStyle = rgba(_mvL(kl, 0.3), 0.7); ctx.lineWidth = Math.max(0.8, lwM * 0.7); _mvPad(ctx, wand); ctx.stroke();
  ctx.strokeStyle = _mvL(kl, 0.4); ctx.lineWidth = lwM; _mvPad(ctx, mem); ctx.stroke();
  if (L >= 300) { const mem2 = _bacOmtrek(L - 2 * (ww + gp) - lwM * 5, r - ww - gp - lwM * 2.5, deling, bend, N); ctx.strokeStyle = rgba(_mvL(kl, 0.4), 0.6); ctx.lineWidth = lwM * 0.7; _mvPad(ctx, mem2); ctx.stroke(); }
  ctx.setLineDash([]);
  if (dood && L > 40) { // inhoud lekt door een gat in de wand
    const gx = (hash(seed * 4.4) - 0.5) * L * 0.5; ctx.fillStyle = rgba(C.ribo, 0.7);
    for (let i = 0; i < 12; i++) { const h = hash(i * 3.1 + seed); const [qx, qy] = B(gx + (h - 0.5) * r * 1.2, -r - hash(i * 5.3) * r * 0.9); ctx.beginPath(); ctx.arc(qx, qy, Math.max(1, r * 0.035), 0, 6.283); ctx.fill(); } }
  if (focus) { const f = _bacOmtrek(L + 18, r + 9, deling, bend, N); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; _mvPad(ctx, f); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// PLASMIDE. Recept: klein ringvormig dubbelstrengs DNA (E. coli-plasmiden 2–200 kb tegen 4600 kb chromosoom), vaak
// meerdere kopieën; in de cel licht superspiraal, hier als golvende ring. Resistentiegen = stuk van de ring in oker (allel 2).
// =====================================================================================
function plasmideRing(ctx, x, y, r, o = {}) {
  const { gen = true, a = 1, seed = 1, fase = 0 } = o; if (a <= 0.01) return; const w = Math.max(1.8, r * 0.2);
  const ring = (a0, a1, n) => { const P = []; for (let i = 0; i <= n; i++) { const th = a0 + (a1 - a0) * i / n; const rr = r * (1 + 0.07 * Math.sin(th * 3 + seed) + 0.04 * Math.sin(th * 5 + seed * 2)); P.push([x + Math.cos(th) * rr, y + Math.sin(th) * rr]); } return P; };
  ctx.save(); ctx.globalAlpha *= a;
  const P = ring(0, 6.283, 36); P.pop(); dnaDraad(ctx, P, { w, dicht: true, fase });
  if (gen) dnaDraad(ctx, ring(-0.7, 0.9, 10), { w: w * 1.35, kleur: EVO.a2, donker: _mvD(EVO.a2, 0.35), fase });
  ctx.restore(); }

// =====================================================================================
// F-PILUS (geslachtsdraad). Recept: holle buis van pilineiwit, ±8 nm dik, 1–20 µm lang; trekt de cellen naar elkaar toe.
// Getekend als dunne buis (twee lichte lijnen, fijne schuine streepjes = de helix van pilinesubunits), vergroot zodat
// het kopie-plasmide (u = 0..1 onderweg) erlangs past. (In het echt gaat één streng over en wordt die in de ontvanger
// weer dubbel; de ring onderweg is een vereenvoudiging.)
// =====================================================================================
function pilus(ctx, x1, y1, x2, y2, u = -1, r = 10) {
  ctx.save(); ctx.lineCap = 'round'; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 18, bw = 7;
  const P = []; for (let i = 0; i <= 40; i++) { const t = i / 40; P.push([(1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t * t * x2, (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t * t * y2]); }
  const S = _mvGelijk(P, 2, false);
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); ctx.strokeStyle = _mvL(C.er, 0.1); ctx.lineWidth = bw; ctx.stroke(); ctx.strokeStyle = '#2E3A4E'; ctx.lineWidth = bw - 3; ctx.stroke();
  ctx.strokeStyle = rgba(C.er, 0.7); ctx.lineWidth = 1; ctx.beginPath(); let volg = 0;
  for (const q of S) { if (q.s < volg) continue; volg = q.s + 5; ctx.moveTo(q.x + q.nx * (bw / 2 - 1) - q.ny * 1.5, q.y + q.ny * (bw / 2 - 1) + q.nx * 1.5); ctx.lineTo(q.x - q.nx * (bw / 2 - 1) + q.ny * 1.5, q.y - q.ny * (bw / 2 - 1) - q.nx * 1.5); } ctx.stroke();
  if (u >= 0) { const t = u; const px = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * mx + t * t * x2, py = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * my + t * t * y2; plasmideRing(ctx, px, py, r, { seed: 3 }); }
  ctx.restore(); }

// =====================================================================================
// ANTIBIOTICUM (bètalactam, bv. penicilline). Recept: vierring (bètalactam) die een zijde (N–C) deelt met een vijfring
// (thiazolidine, met zwavel); aan de vierring een C=O en een zijketen (amide), aan de vijfring een carboxylgroep.
// Het molecuul is ±1 nm: in beeld altijd 'vergroot'. Getekend als afgeronde vormen in koraal (geen atomen, Part C:
// alleen in vwo-blokken), met de zwavel als okerkleurige stip. r ≈ halve breedte.
// =====================================================================================
function antibioticum(ctx, x, y, r = 10, rot = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const s = r * 0.78, lw = Math.max(1.4, r * 0.13), rand = _mvL(C.koraal, 0.35), vulK = rgba(C.koraal, 0.55);
  const N = [0, s / 2], C5 = [0, -s / 2], C6 = [-s, -s / 2], C7 = [-s, s / 2];
  const pc = s / (2 * Math.tan(Math.PI / 5)), R5 = s / (2 * Math.sin(Math.PI / 5)); const vijf = []; for (let i = 0; i < 5; i++) { const an = Math.PI + Math.PI / 5 + i * 2 * Math.PI / 5; vijf.push([pc + Math.cos(an) * R5, Math.sin(an) * R5]); }
  // vijf[0] = C5-hoek? zorg dat de gedeelde zijde op x=0 ligt: hoeken met x≈0 zijn C5 en N
  const Sx = vijf.reduce((b, p) => (p[1] < b[1] && p[0] > 1e-3 ? p : b), [0, 1e9]);
  const stok = (p, an, l, knop) => { const e = [p[0] + Math.cos(an) * l, p[1] + Math.sin(an) * l]; ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); if (knop) circ(ctx, e[0], e[1], knop, vulK, rand, lw * 0.8); return e; };
  // zijketen aan C6 (amide → ring), C=O aan C7, carboxyl aan de vijfring
  const e1 = stok(C6, -2.4, s * 0.55, 0); const e2 = stok(e1, -3.0, s * 0.5, 0); circ(ctx, e2[0] - s * 0.3, e2[1], s * 0.32, vulK, rand, lw * 0.8); circ(ctx, e1[0], e1[1] - s * 0.32, s * 0.13, vulK, rand, lw * 0.7);
  const o1 = [C7[0] - s * 0.38, C7[1] + s * 0.38]; ctx.strokeStyle = rand; ctx.lineWidth = lw * 0.7; ctx.beginPath(); ctx.moveTo(C7[0] - lw * 0.6, C7[1] + lw * 0.2); ctx.lineTo(o1[0] - lw * 0.6, o1[1] + lw * 0.2); ctx.moveTo(C7[0] + lw * 0.2, C7[1] + lw * 0.6); ctx.lineTo(o1[0] + lw * 0.2, o1[1] + lw * 0.6); ctx.stroke(); circ(ctx, o1[0], o1[1], s * 0.13, vulK, rand, lw * 0.7);
  const vC3 = vijf.reduce((b, p) => (p[1] > b[1] && p[0] > 1e-3 ? p : b), [0, -1e9]); stok(vC3, 1.0, s * 0.45, s * 0.14);
  ctx.beginPath(); ctx.moveTo(N[0], N[1]); ctx.lineTo(C5[0], C5[1]); ctx.lineTo(C6[0], C6[1]); ctx.lineTo(C7[0], C7[1]); ctx.closePath(); shape(ctx, vulK, rand, lw);
  ctx.beginPath(); vijf.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, vulK, rand, lw);
  circ(ctx, Sx[0], Sx[1], Math.max(1.6, s * 0.16), C.oker, _mvL(C.oker, 0.3), Math.max(0.8, lw * 0.6)); // zwavel
  ctx.restore(); }

// =====================================================================================
// GRIEPVIRUS (influenza A). Recept: bol of ei, 80–120 nm; envelop = lipidendubbellaag uit de gastheercel; daaronder een
// laag matrixeiwit (M1); ±300–400 uitsteeksels: hemagglutinine (HA, staafje ±13 nm met verdikte kop) en ±1 op 7
// neuraminidase (NA, dun steeltje met vierkante kop), NA vaak in groepjes; binnenin 8 RNA-segmenten (RNP's: staafjes
// 12–15 nm breed, 30–130 nm lang) in een '7 + 1'-bundel aan één pool. Bron: Harris e.a. 2006 PNAS 103:19123; Noda e.a. 2006 Nature 439:490.
// Bekende fouten: virus als bolletje met speldjes; DNA in plaats van RNA; virus zo groot als een bacterie (100 nm tegen 2 µm).
// =====================================================================================
function griepVirus(ctx, x, y, r, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((hash(x * 0.37 + y * 0.11) - 0.5) * 1.6); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; // elk virus iets anders gedraaid
  const HA = '#C9B896', NA = '#AFC0D0', ns = 34, lw = Math.max(1, r * 0.035);
  const naPlek = (i) => (i >= 21 && i <= 24) || i === 8 || i === 30;
  for (let i = 0; i < ns; i++) { const an = (i + 0.3 * (hash(i * 3.3) - 0.5)) / ns * 6.283 - Math.PI / 2, c = Math.cos(an), s = Math.sin(an);
    ctx.save(); ctx.rotate(an); const l = r * 0.27 * (0.92 + 0.16 * hash(i * 7.7));
    if (naPlek(i)) { ctx.strokeStyle = NA; ctx.lineWidth = Math.max(1, r * 0.03); ctx.beginPath(); ctx.moveTo(r * 0.98, 0); ctx.lineTo(r + l * 0.62, 0); ctx.stroke();
      roundRect(ctx, r + l * 0.6, -r * 0.065, r * 0.13, r * 0.13, r * 0.025); shape(ctx, rgba(NA, 0.75), _mvL(NA, 0.3), lw); }
    else { ctx.beginPath(); ctx.moveTo(r * 0.98, -r * 0.03); ctx.lineTo(r + l * 0.6, -r * 0.035); ctx.quadraticCurveTo(r + l, -r * 0.06, r + l, 0); ctx.quadraticCurveTo(r + l, r * 0.06, r + l * 0.6, r * 0.035); ctx.lineTo(r * 0.98, r * 0.03); ctx.closePath();
      shape(ctx, rgba(HA, 0.8), _mvL(HA, 0.3), lw); }
    ctx.restore(); }
  // envelop (dubbellaag) en M1-laag
  circ(ctx, 0, 0, r, C.bgMicro); circ(ctx, 0, 0, r, rgba(HA, 0.12), _mvL(HA, 0.2), Math.max(1.4, r * 0.04)); circ(ctx, 0, 0, r * 0.93, null, rgba(HA, 0.7), Math.max(1, r * 0.025));
  ctx.fillStyle = rgba('#9AA3B2', 0.6); const nm = Math.max(18, Math.round(r * 0.9)); for (let i = 0; i < nm; i++) { const an = i / nm * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, Math.max(0.8, r * 0.025), 0, 6.283); ctx.fill(); }
  // 8 RNP's in een 7+1-bundel, hangend aan de bovenpool; het middelste staafje vooraan
  const L = [0.95, 0.7, 0.9, 0.58, 0.82, 0.5, 0.66, 0.42], X = [-0.33, 0.33, -0.22, 0.22, -0.11, 0.11, 0.0, 0.0], bw = r * 0.1, yT = -r * 0.7;
  [0, 1, 2, 3, 4, 5, 7, 6].forEach((k) => { const xx = X[k] * r + (k === 7 ? r * 0.05 : 0), ll = L[k] * r * 0.95; const yt = yT + Math.abs(X[k]) * r * 0.35;
    ctx.save(); ctx.translate(xx, yt); ctx.rotate(-X[k] * 0.45 + (hash(k * 3.1) - 0.5) * 0.12); // bundel: staafjes lopen naar de pool toe samen
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); shape(ctx, k === 6 ? rgba(C.kernR, 0.55) : rgba(C.kernR, 0.32), C.kernR, Math.max(0.8, r * 0.02));
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); ctx.clip(); ctx.strokeStyle = rgba(_mvL(C.kernR, 0.3), 0.8); ctx.lineWidth = Math.max(0.7, r * 0.015); ctx.beginPath();
    for (let d = 0; d < ll + bw; d += bw * 0.7) { ctx.moveTo(-bw / 2, d); ctx.lineTo(bw / 2, d - bw * 0.5); } ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// =====================================================================================
// CHROMOSOOM. Recept: een chromosoom is één DNA-molecuul, om eiwitten gewonden en opgevouwen in lussen. Niet verdubbeld
// (G1, of in een geslachtscel) = één staafje; vorm: ronde uiteinden (telomeren), een duidelijke insnoering (centromeer,
// ±55–60 % van de breedte), licht golvende randen. Bandenpatroon (G-banden) als afwisselend donkere en lichte banden van
// ongelijke breedte. Een gen = een band op een vaste plek (locus) in de allelkleur. Kleur paars (Part C: DNA).
// Bekende fouten: rechthoekig staafje; centromeer als zwart blokje; gen als los kader naast het chromosoom.
// =====================================================================================
function _chromPad(ctx, cx, top, h, breed, cen, seed = 0) {
  const R = breed / 2, rc = R * 0.95, N = 44, Lz = [], Rz = [];
  const hw = (t, ph) => { const dE = Math.min(t, 1 - t) * h; const cap = dE >= rc ? 1 : Math.sqrt(Math.max(0, 1 - Math.pow((rc - dE) / rc, 2)));
    const con = 1 - 0.4 * Math.exp(-Math.pow((t - cen) * h / (breed * 0.34), 2)); const wob = 1 + 0.035 * Math.sin(t * h / (breed * 0.5) + ph); return R * cap * con * wob; };
  for (let i = 0; i <= N; i++) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Lz.push([cx - hw(t, seed), top + t * h]); }
  for (let i = N - 1; i >= 1; i--) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Rz.push([cx + hw(t, seed + 1.7), top + t * h]); }
  ctx.beginPath(); bioPad(ctx, Lz.concat(Rz), true); }
var _GBAND = [[0.07, 0.03, 1], [0.15, 0.05, 1], [0.22, 0.025, 0], [0.4, 0.04, 1], [0.47, 0.025, 0], [0.66, 0.05, 1], [0.73, 0.03, 0], [0.8, 0.055, 1], [0.9, 0.03, 1]];
function _chromTekening(ctx, cx, top, h, breed, cen, vul, rand, gen, seed) {
  _chromPad(ctx, cx, top, h, breed, cen, seed); shape(ctx, vul, rand, Math.max(1.2, breed * 0.06));
  ctx.save(); _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.clip();
  const zak = breed * 0.12; // banden licht gebogen (het chromosoom is rond)
  for (const [p, d, donker] of _GBAND) { if (gen && Math.abs(p - gen.band) < gen.halfT + d) continue; if (Math.abs(p - cen) < 0.05) continue;
    const y0 = top + p * h, hh = Math.max(2, d * h); ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + hh); ctx.quadraticCurveTo(cx, y0 + hh + zak, cx - breed, y0 + hh); ctx.closePath();
    ctx.fillStyle = donker ? rgba(_mvD(vul, 0.35), 0.75) : rgba(rand, 0.35); ctx.fill(); }
  // chromatine: fijne lichte lusjes langs de randen (opgevouwen DNA-draad), heel rustig
  if (breed >= 18) { ctx.strokeStyle = rgba(rand, 0.22); ctx.lineWidth = Math.max(0.8, breed * 0.035); for (const zij of [-1, 1]) { ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const t = i / 60, yy = top + t * h; const xx = cx + zij * breed * (0.3 + 0.08 * Math.sin(t * h / (breed * 0.22) + zij)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
  if (gen) { const y0 = top + gen.band * h - gen.hh / 2; ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + gen.hh); ctx.quadraticCurveTo(cx, y0 + gen.hh + zak, cx - breed, y0 + gen.hh); ctx.closePath();
    ctx.fillStyle = gen.kleur; ctx.fill(); ctx.strokeStyle = _mvL(gen.kleur, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore();
  _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.2, breed * 0.06); ctx.stroke();
  if (gen && gen.nieuw) { const y0 = top + gen.band * h - gen.hh / 2; roundRect(ctx, cx - breed / 2 - 6, y0 - 5, breed + 12, gen.hh + 10 + zak, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
}
function _bandH(h) { return clamp(h * 0.11, 10, 24); }
function chromosoomPaar(ctx, x, y, h, o = {}) {
  const { allelen = [EVO.a1, EVO.a2], band = 0.32, a = 1, breed = 34, gap = 30, cen = 0.58, nieuw = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  for (let k = 0; k < 2; k++) { const cx = x + (k ? 1 : -1) * (gap / 2 + breed / 2); const isN = nieuw && nieuw[0] === k; const kl = isN ? nieuw[1] : allelen[k];
    _chromTekening(ctx, cx, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur: kl, nieuw: isN }, k * 2.3); }
  ctx.restore(); }
function chromosoom1(ctx, x, y, h, kleur, o = {}) {
  const { band = 0.32, breed = 34, cen = 0.58, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  _chromTekening(ctx, x, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur }, 0.9); ctx.restore(); }
// chromosoom (muilezel-meiose, film 6): staafje 14 px breed, centromeer op 38 % van boven, eigen kleur per set
function chromosoom(ctx, x, y, l, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _chromTekening(ctx, x, y - l / 2, l, 14, 0.38, kleur, _mvL(kleur, 0.35), null, l * 0.01); ctx.restore(); }

// =====================================================================================
// GESLACHTSCEL als schema met één chromosoom. Eicel: ±120 µm, zona pellucida als brede lichte band, smalle ruimte met
// het eerste poollichaampje, cytoplasma met dooierkorrels; de eicel staat stil in metafase II, dus het chromosoom ligt
// vrij (geen kernmembraan). Zaadcel: platte ovale kop (4–5 × 3 µm) met acrosoomkap over de voorste helft (teal, zoals
// zaadcelEcht in lib_bio), kern vult de kop; middenstuk met mitochondriën als spiraal; staart dunner wordend en golvend.
// Schema: de kop is vergroot (het chromosoom moet erin passen) en de staart ingekort (echt ±10× de kop).
// =====================================================================================
function geslachtscel(ctx, x, y, soort, kleur, s = 1, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const wit = '#F2F2EE', ivoor = '#F2E6C8';
  if (soort === 'ei') {
    circ(ctx, x, y, 78 * s, rgba('#F6EEDC', 0.16), rgba('#F6EEDC', 0.85), 2.5); // zona pellucida (buitenrand)
    circ(ctx, x, y, 69 * s, C.bgSchema, rgba('#F6EEDC', 0.45), 1.5); circ(ctx, x, y, 69 * s, rgba('#F6EEDC', 0.05));
    circ(ctx, x + Math.cos(-0.75) * 64.5 * s, y + Math.sin(-0.75) * 64.5 * s, 5.5 * s, rgba(ivoor, 0.3), rgba(ivoor, 0.8), 1.5); // poollichaampje
    circ(ctx, x, y, 61 * s, rgba(ivoor, 0.16), rgba(ivoor, 0.8), 2);
    ctx.fillStyle = rgba(ivoor, 0.28); for (let i = 0; i < 46; i++) { const an = hash(i * 2.3) * 6.283, d = Math.sqrt(hash(i * 5.9)) * 56 * s; if (Math.abs(Math.cos(an) * d) < 18 * s && Math.abs(Math.sin(an) * d) < 52 * s) continue; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, (1.2 + hash(i) * 1.3) * s, 0, 6.283); ctx.fill(); }
    chromosoom1(ctx, x, y, 92 * s, kleur, { breed: 24 * s });
  } else {
    const hx = x, kr = 44 * s, kb = 30 * s; // kop: ovaal, achteraan smaller (peddel)
    const kop = []; for (let i = 0; i < 40; i++) { const th = i / 40 * 6.283; const ry = kb * (0.86 + 0.14 * Math.cos(th)); kop.push([hx + Math.cos(th) * kr, y + Math.sin(th) * ry]); }
    // staart: middenstuk dikker met mitochondriënspiraal, dan dunner wordende golf
    const x0 = hx - kr * 0.97, mid = 34 * s, st = 98 * s, P = []; for (let i = 0; i <= 50; i++) { const d = i / 50 * (mid + st); const amp = d < mid ? 0 : (3 + 11 * Math.pow((d - mid) / st, 1.1)) * s; P.push([x0 - d, y + Math.sin((d - mid) / (st * 0.62) * 6.283) * amp]); }
    for (let i = 1; i < P.length; i++) { const d = i / 50 * (mid + st); ctx.strokeStyle = rgba(wit, 0.85); ctx.lineWidth = d < mid ? 6.5 * s : Math.max(1, lerp(3.2, 1, (d - mid) / st) * s); ctx.beginPath(); ctx.moveTo(P[i - 1][0], P[i - 1][1]); ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(C.mito, 0.9); ctx.lineWidth = Math.max(1, 1.4 * s); ctx.beginPath(); for (let d = 4 * s; d < mid - 2 * s; d += 4.5 * s) { ctx.moveTo(x0 - d + 1.5 * s, y - 3 * s); ctx.lineTo(x0 - d - 1.5 * s, y + 3 * s); } ctx.stroke();
    vul(ctx, kop, rgba(wit, 0.16), rgba(wit, 0.85), 2.5);
    ctx.save(); zacht(ctx, kop, true); ctx.clip(); ctx.beginPath(); ctx.ellipse(hx + kr * 0.42, y, kr * 0.72, kb * 1.1, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.3); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); // acrosoom
    chromosoom1(ctx, hx - 8 * s, y, 44 * s, kleur, { breed: 16 * s, band: 0.3 });
  }
  ctx.restore(); }

// =====================================================================================
// RODE BLOEDCEL (overschrijft lib_bio, zelfde parameters). Recept: ingedeukte schijf, 7,8 µm breed, rand ±2,5 µm dik,
// midden ±1 µm (Evans & Fung 1972: dikte T(ρ) = R·√(1−ρ²)·(0,207 + 2,003ρ² − 1,123ρ⁴)). Van boven: schijf met een
// dikke rand en een ondiepe deuk in het midden (twee tinten: deuk donkerder, lichte boog op de rand). Van opzij: een
// halter (dikke uiteinden, dun midden). kant 0 = van boven, 1 = van opzij; ertussen kantelt hij.
// Bekende fouten: bol; van opzij een ovaal; deuk als gat.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const kl = BIO.bloed, ry = r * lerp(1, 0.3, kant), wd = clamp((kant - 0.55) / 0.45, 0, 1);
  const halfT = (p) => r * Math.sqrt(Math.max(0, 1 - p * p)) * (0.207 + 2.003 * p * p - 1.123 * p ** 4) / 2;
  const P = [], N = 36; for (let i = 0; i <= N; i++) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, -lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  for (let i = N - 1; i >= 1; i--) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, kl, lighten(kl, 0.3), Math.max(1, r * 0.04));
  const dk = 1 - wd; if (dk > 0.02) { // deuk: twee tinten, iets verschoven door het kantelen
    ctx.beginPath(); ctx.ellipse(0, ry * 0.06 * kant, r * 0.55, ry * 0.55, 0, 0, 6.283); ctx.fillStyle = rgba('#8E2A2A', 0.35 * dk); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, ry * 0.1 * kant, r * 0.36, ry * 0.36, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * dk); ctx.fill();
    ctx.strokeStyle = rgba(_mvL(kl, 0.45), 0.6 * dk); ctx.lineWidth = Math.max(1, r * 0.06); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.8, ry * 0.8, 0, 3.6, 4.9); ctx.stroke(); }
  if (wd > 0.02) { ctx.strokeStyle = rgba('#7A1E1E', 0.4 * wd); ctx.lineWidth = Math.max(1, r * 0.05); ctx.beginPath(); ctx.moveTo(-r * 0.45, 0); ctx.quadraticCurveTo(0, r * 0.02, r * 0.45, 0); ctx.stroke(); }
  ctx.restore(); }

// =====================================================================================
// SIKKELCEL (HbSS, zuurstofarm). Recept: HbS-moleculen klonteren tot lange vezels (bundels van 14-strengs vezels) die
// zich langs de lengteas richten en de cel uitrekken tot een stijve halve maan met spitse punten, ±1,5–2× zo lang als
// een normale cel; geen deuk meer; kleur iets donkerder en doffer (zuurstofarm). Bron: Christoph e.a. 2005 (vezels in
// de cel); Part C: 'toestand verandert de verzadiging, niet de vorm' geldt hier niet: de vorm IS het verschijnsel.
// Getekend: halve maan met spitse uiteinden en 3 fijne vezellijnen langs de boog.
// =====================================================================================
function sikkelcel(ctx, x, y, r, an = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kl = '#A8403A', Rc = r * 1.65, span = 1.05, yc = Rc * 0.82;
  const dik = (u) => Math.pow(Math.sin(Math.PI * u), 0.75) * r * 0.42 * (1 + 0.06 * Math.sin(u * 17)); // spitse punten, licht hobbelig
  const pt = (u, d) => { const ph = -span + 2 * span * u, R = Rc + d; return [Math.sin(ph) * R, yc - Math.cos(ph) * R]; };
  const P = [], N = 28; for (let i = 0; i <= N; i++) P.push(pt(i / N, dik(i / N) * 0.55)); for (let i = N - 1; i >= 1; i--) P.push(pt(i / N, -dik(i / N) * 0.45));
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); ctx.closePath(); shape(ctx, kl, lighten(kl, 0.25), Math.max(1, r * 0.04));
  ctx.strokeStyle = rgba('#6E1E1E', 0.55); ctx.lineWidth = Math.max(0.8, r * 0.035); // HbS-vezels langs de lengteas
  for (const f of [-0.3, 0.05, 0.38]) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = 0.1 + 0.8 * i / 20; const p = pt(u, dik(u) * f); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); }
  ctx.restore(); }

function circ(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.2832); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }  // zoals in de proefvellen
// ---- genregulatie/uvSchade/C.js
// =====================================================================================
// UV-SCHADE EN HERSTEL (basenniveau). Recept (Lodish 8e § 5.6 'Nucleotide excision repair' (fig. 5-38); OpenStax Biology 2e
// § 14.6; LibreTexts Microbiology (Liu e.a.) § 13.2):
//  - UV-licht laat twee T's die naast elkaar op dezelfde streng liggen aan elkaar vastgaan (thymine-dimeer, koraal klem);
//    de helix vervormt (knik), daardoor kunnen replicatie en transcriptie er niet langs.
//  - herstel door uitsnijden: een enzymcomplex herkent de vervorming, knipt de beschadigde streng aan beide kanten van de
//    dimeer (bij de mens komt een stuk van ± 24–32 nucleotiden vrij; hier korter: 'schematisch'), het stuk gaat weg,
//    DNA-polymerase vult het gat met de juiste nucleotiden (de andere streng is de mal) en DNA-ligase sluit de laatste naad.
//  - o.f 0..1: 0–0.15 UV-straal · 0.15–0.3 dimeer + knik · 0.3–0.5 enzym knipt · 0.5–0.65 stuk eruit · 0.65–0.85 aanvullen ·
//    0.85–1 ligase sluit.
// Bekende fouten: T's op tegenover elkaar liggende strengen die vastgaan; alleen de twee T's eruit; beide strengen geknipt;
// gat dat zonder mal wordt gevuld.
// (x, y) = midden; s = schaal (± 900 × 420 px bij s = 1). o.f, o.t. Plaatshouders voor de enzymen (kluwen). Geeft {dimeer, knip:[[x,y],[x,y]], enzym, gat} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function uvSchade(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0, seq = 'GCAGCTTACGAGC' } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.15, 0, 1)), p2 = ease(clamp((f - 0.15) / 0.15, 0, 1)), p3 = ease(clamp((f - 0.3) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.5) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.65) / 0.2, 0, 1)), p6 = ease(clamp((f - 0.85) / 0.15, 0, 1));
  const n = seq.length, dx = 64 * s, k = 0.74 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, i1 = seq.indexOf('TT'), i2 = i1 + 1, c0 = i1 - 3, c1 = i2 + 3, uit = {};
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, knik = p2 * (1 - p4);
  ctx.save(); ctx.globalAlpha *= a;
  // knik: de bovenstreng buigt rond de dimeer omhoog (vervorming die het enzym herkent)
  const yT = (i) => y - H - knik * 26 * s * Math.exp(-Math.pow((i - (i1 + 0.5)) / 1.3, 2)), yB = () => y + H;
  for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yB() - 8 * s, comp[seq[i]], -1, { s: k, plekA: 0 }); }
  ctx.save(); ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yB()); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yB()); ctx.stroke(); ctx.strokeStyle = DNA_BASE.rug; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore();
  // bovenstreng: oud deel, weggeknipt stuk (gaat omhoog weg), nieuw deel (licht) dat de polymerase aanvult
  const weg = p4 * 140 * s, nieuwTot = c0 + (c1 - c0 + 1) * p5; // index tot waar het nieuwe stuk is aangevuld
  const tekenBoven = (i, dy, alpha, nieuw) => { const xx = x0 + i * dx, tilt = (i === i1 ? 1 : i === i2 ? -1 : 0) * 0.32 * knik; baseRing(ctx, xx, yT(i) + 8 * s - dy, seq[i], 1, { s: k, plekA: 0, a: alpha, rot: tilt });
    if (nieuw) { roundRect(ctx, xx - 26 * k, yT(i) + 4 * s, 52 * k, 6 * s, 3 * s); ctx.fillStyle = '#DCD4F5'; ctx.fill(); } };
  for (let i = 0; i < n; i++) { const inStuk = i >= c0 && i <= c1; if (!inStuk) tekenBoven(i, 0, 1, false); else { if (p4 < 1) tekenBoven(i, weg, 1 - p4, false); if (p5 > 0.01 && i < nieuwTot) tekenBoven(i, 0, clamp(nieuwTot - i, 0, 1), true); } }
  const rail = (ia, ib, dy, kl1, kl2, al) => { if (al <= 0.01 || ib < ia) return; const P = []; for (let q = ia; q <= ib; q += 0.25) P.push([x0 + q * dx, yT(q) - dy]); ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = kl1; ctx.lineWidth = 15 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = kl2; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
  rail(-0.35, c0 - 0.5, 0, DNA_BASE.rugR, DNA_BASE.rug, 1); rail(c1 + 0.5, n - 0.65, 0, DNA_BASE.rugR, DNA_BASE.rug, 1);
  rail(c0 - 0.5, c1 + 0.5, weg, DNA_BASE.rugR, DNA_BASE.rug, 1 - p4); if (p5 > 0.01) rail(c0 - 0.5, Math.min(c1 + 0.5, nieuwTot - 0.5), 0, '#DCD4F5', '#B9ACE6', 1);
  // dimeer: koraal klem tussen de twee T's
  if (p2 > 0.01 && p4 < 1) { const xa = x0 + i1 * dx, xb = x0 + i2 * dx, yy = (yT(i1) + yT(i2)) / 2 + DNA_BASE.len * k * 0.45 - weg; ctx.save(); ctx.globalAlpha *= p2 * (1 - p4); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xa + 12 * s, yy); ctx.lineTo(xb - 12 * s, yy); ctx.stroke(); _bioCirc(ctx, xa + 12 * s, yy, 6 * s, C.koraal); _bioCirc(ctx, xb - 12 * s, yy, 6 * s, C.koraal); ctx.restore(); uit.dimeer = [(xa + xb) / 2, yy]; }
  // UV-straal
  if (f < 0.35) _uvGolf(ctx, x0 + i1 * dx + 260 * s, y - H - 260 * s, x0 + (i1 + 0.5) * dx + 14 * s, y - H - 30 * s, s, Math.min(p1 * 3, 1) * (1 - ease(clamp((f - 0.22) / 0.1, 0, 1))), t * 6 + f * 40);
  // herstelenzym (plaatshouder): komt aan, knipt links en rechts, neemt het stuk mee
  const ex = x0 + (i1 + 0.5) * dx, ey = lerp(y - H - 260 * s, y - H - 62 * s, p3) - weg; const binE = (qx, qy) => { const e1 = qx / 110, e2 = qy / 55; return e1 * e1 + e2 * e2 < 1; };
  if (p3 > 0.01 && p4 < 1) { _grKluwen(ctx, ex, ey, binE, { r: 6, sc: s, col: '#7A8BA8', seed: 29, bbox: [-112, -56, 112, 56], key: 'uvE', a: Math.min(1, p3 * 2) * (1 - p4) }); uit.enzym = [ex, ey - 60 * s]; }
  uit.knip = [[x0 + (c0 - 0.5) * dx, yT(c0 - 0.5)], [x0 + (c1 + 0.5) * dx, yT(c1 + 0.5)]];
  if (p3 > 0.7 && p4 < 0.6) { ctx.save(); ctx.globalAlpha *= (p3 - 0.7) / 0.3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; uit.knip.forEach(([kx, ky]) => { ctx.beginPath(); ctx.moveTo(kx - 10 * s, ky - 12 * s); ctx.lineTo(kx + 10 * s, ky + 12 * s); ctx.moveTo(kx + 10 * s, ky - 12 * s); ctx.lineTo(kx - 10 * s, ky + 12 * s); ctx.stroke(); }); ctx.restore(); }
  // polymerase (plaatshouder) loopt over het gat; ligase sluit de laatste naad (gouden flits)
  if (p5 > 0.01 && p6 < 1) { const px = x0 + Math.min(nieuwTot, c1 + 0.5) * dx, py = y - H - 70 * s; enzymKluwen(ctx, px, py, 48 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2, a: 1 - p6 }); }
  if (p6 > 0.01) { const lx = x0 + (c1 + 0.5) * dx, ly = yT(c1 + 0.5); ctx.save(); ctx.globalAlpha *= Math.sin(p6 * Math.PI); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let q = 0; q < 8; q++) { const an = q / 8 * 6.283; ctx.moveTo(lx + Math.cos(an) * 12 * s, ly + Math.sin(an) * 12 * s); ctx.lineTo(lx + Math.cos(an) * 24 * s, ly + Math.sin(an) * 24 * s); } ctx.stroke(); ctx.restore(); }
  uit.gat = [x0 + (c0 + c1) / 2 * dx, y - H]; ctx.restore(); return uit;
}

// ---- genregulatie/transcriptiefactor/C.js
// =====================================================================================
// TRANSCRIPTIEFACTOR (eiwitkluwen met pasvorm, monomeer; ronde 2: kluwen als gevouwen lint, herkenningshelix als spiraaltje). Recept (OpenStax Biology 2e § 16.4; Lodish 8e § 9.2):
//  - een transcriptiefactor is een eiwit (gevouwen keten, geen bol) dat een korte, vaste basenvolgorde in de promotor of een
//    enhancer herkent; de herkenning gebeurt met een α-helix die in de grote groef van het DNA past (pasvorm). Gebonden
//    trekt een activator RNA-polymerase (en andere factoren) naar de promotor; een remmer (repressor) bindt ook, maar blokkeert.
//  - maat: DNA 2 nm breed, een transcriptiefactor ± 5–10 nm (hier ± 4,5× de DNA-breedte); RNA-polymerase groter dan de factor.
//  - hormoon-receptorcomplex (o.hormoon): oestradiol (steroïd: drie zesringen + vijfring) ligt in een afgesloten holte van het
//    eiwit (Ruff e.a. 2000, Breast Cancer Res 2:353); pas mét hormoon bindt de receptor het DNA en werkt als transcriptiefactor.
//  - kleur: grijsblauwe kluwen (C2); activator met groene zweem, remmer met koraal zweem; herkenningshelix goud als hij past.
// Bekende fouten: een bol of druppel; factor die op willekeurige plek op het DNA ligt; activator en remmer met dezelfde vorm
// en hetzelfde effect; hormoon dat los naast de receptor ligt.
// (x, y) = bindplek op de DNA-as; s = schaal (factor ± 220 × 160 px bij s = 1). o.dna (standaard uit) tekent een stukje DNA met
// promotor; o.gebonden 0..1 (0 = zweeft erboven, 1 = zit vast); o.soort 'activator' | 'remmer' | 'neutraal'; o.polymerase 0..1;
// o.hormoon 0..1; o.fold 0..1 (vouwen); o.t. Geeft {tf, helix, pol, hormoon} (plekken voor namen) terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function _tfSteroid(ctx, x, y, r, a = 1) { // oestradiol: drie zesringen en een vijfring, met OH aan beide uiteinden (paars: hormoon, C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B9ACE6'; ctx.fillStyle = rgba('#8C7BBF', 0.45); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.lineJoin = 'round';
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let k = 0; k < n; k++) { const an = k / n * 6.283 + (n === 6 ? Math.PI / 6 : -Math.PI / 2 + 0.3); const X = cx + Math.cos(an) * rr, Y = cy + Math.sin(an) * rr; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  const d = r * 1.73; ring(x - d, y + r * 0.5, 6, r); ring(x, y, 6, r); ring(x + d, y + r * 0.5, 6, r); ring(x + d * 1.82, y - r * 0.15, 5, r * 0.86);
  ctx.beginPath(); ctx.moveTo(x - d * 1.85, y + r * 1.0); ctx.lineTo(x - d * 2.3, y + r * 1.3); ctx.moveTo(x + d * 2.3, y - r * 0.6); ctx.lineTo(x + d * 2.6, y - r * 1.1); ctx.stroke(); ctx.restore(); }
function _tfDNA(ctx, x, y, s, t, breed = 300) { // stukje DNA met de promotor als gouden mouw en het startpunt als pijltje
  roundRect(ctx, x - 150 * s, y - 34 * s, 230 * s, 68 * s, 20 * s); shape(ctx, rgba(C.goud, 0.22), rgba(C.goud, 0.7), 1.5);
  dnaDraad(ctx, [[x - breed * s, y], [x + breed * s, y]], { w: 44 * s, helix: true, glad: false, fase: t * 0.05 });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; const xs = x + 90 * s; ctx.beginPath(); ctx.moveTo(xs, y + 26 * s); ctx.lineTo(xs, y + 62 * s); ctx.lineTo(xs + 40 * s, y + 62 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 48 * s, y + 62 * s); ctx.lineTo(xs + 36 * s, y + 54 * s); ctx.lineTo(xs + 36 * s, y + 70 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); }
function _tfPolymerase(ctx, x, y, s, a = 1) { // plaatshouder RNA-polymerase (eigen bibliotheekobject volgt: rnaPolymerase)
  if (a <= 0.01) return; enzymKluwen(ctx, x, y, 78 * s, { a, col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); }
var TF_KLEUR = { activator: '#6F9A86', remmer: '#A57F7A', neutraal: '#7A8BA8' };
function transcriptiefactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, dna = false, gebonden = 1, soort = 'activator', polymerase = 0, hormoon = 0, fold = 1, t = 0 } = o; if (a <= 0.01) return {};
  const g = ease(gebonden), col = TF_KLEUR[soort] || TF_KLEUR.neutraal, uit = {}, r = 7 * s;
  ctx.save(); ctx.globalAlpha *= a; if (dna) _tfDNA(ctx, x, y, s, t);
  // RNA-polymerase: activator → op het startpunt; remmer → blijft weg (komt niet bij het DNA)
  if (polymerase > 0.01) { const p = ease(polymerase); const doelX = soort === 'remmer' ? x + 300 * s : x + 215 * s, doelY = soort === 'remmer' ? y - 190 * s : y - 70 * s;
    const px = lerp(x + 420 * s, doelX, p), py = lerp(y - 260 * s, doelY, p) + (soort === 'remmer' ? Math.sin(t * 2) * 6 * s * p : 0); _tfPolymerase(ctx, px, py, s, Math.min(1, polymerase * 2)); uit.pol = [px, py]; }
  const ox = x - 10 * s * (1 - g), oy = y - 160 * s * (1 - g) + Math.sin(t * 1.3) * 4 * s * (1 - g), rot = 0.35 * (1 - g);
  const binnen = (px, py) => { const ex = px / 112, ey = (py + 86) / 74; if (ex * ex + ey * ey > 1) return false; return Math.hypot(px, py + 2) > 40; };
  // herkenningshelix: spiraaltje (lint) dat vanuit de kluwen in de grote groef zakt; goud zodra hij past
  const cs = Math.cos(rot), sn = Math.sin(rot), W = (p) => [ox + p[0] * cs - p[1] * sn, oy + p[0] * sn + p[1] * cs, p[2]];
  const pts = _grKluwen(ctx, ox, oy, binnen, { r: 7, sc: s, col, seed: soort === 'remmer' ? 4 : 2, rot, bbox: [-115, -162, 115, -8], fold, key: 'tfC' });
  const HA = W([-34 * s, -58 * s, 0]), HB = W([2 * s, 4 * s, 0]), hdx = HB[0] - HA[0], hdy = HB[1] - HA[1], hL = Math.hypot(hdx, hdy), H = [];
  for (let i = 0; i <= 60; i++) { const u = i / 60, ph = u * 3 * 6.283, q = Math.sin(ph) * 11 * s; H.push([HA[0] + hdx * u - hdy / hL * q, HA[1] + hdy * u + hdx / hL * q, Math.cos(ph)]); }
  const hk = g > 0.9 ? C.goud : col, wB = 7 * s * 1.05;
  const hlBuis = (Q, kl, ww) => { if (Q.length < 2) return; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = lighten(kl, 0.38); ctx.lineWidth = ww + 2.4 * Math.max(0.5, s); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  hlBuis([pts[pts.length - 1], H[0]], col, wB);
  [false, true].forEach(voor => { let sg = []; const kl = voor ? lighten(hk, 0.1) : _mixHex(g > 0.9 ? C.goud : col, '#000000', 0.3); H.forEach(p => { if ((p[2] >= 0) === voor) sg.push(p); else { hlBuis(sg, kl, wB * (voor ? 1.25 : 1)); sg = []; } }); hlBuis(sg, kl, wB * (voor ? 1.25 : 1)); });
  uit.helix = H[H.length - 1]; uit.tf = [ox + 0 * s, oy - 90 * s];
  // activator: losse activatiestaart (ongevouwen stuk keten) die naar de polymerase reikt
  if (soort === 'activator') { const reik = ease(polymerase), st = W([100 * s, -110 * s]), P = [st]; for (let i = 1; i <= 9; i++) { const u = i / 9; P.push([st[0] + u * lerp(40, 85, reik) * s, st[1] + Math.sin(u * 5 + t) * 10 * s - u * lerp(30, -10, reik) * s]); }
    hlBuis(P, col, wB * 0.8); }
  if (hormoon > 0.01) { const hp = W([-46 * s, -96 * s]), h = ease(hormoon); _bioCirc(ctx, hp[0], hp[1], 34 * s, rgba('#121A26', 0.55 * h), rgba(lighten(col, 0.4), 0.6 * h), 1); _tfSteroid(ctx, lerp(hp[0] - 200 * s, hp[0] - 4 * s, h), lerp(hp[1] - 120 * s, hp[1], h), 7.5 * s, Math.min(1, hormoon * 2)); uit.hormoon = hp; }
  ctx.restore(); return uit;
}

// ---- genregulatie/lacOperon/C.js
// =====================================================================================
// LAC-OPERON (rij op het DNA, repressor op de operator). Recept (OpenStax Biology 2e § 16.2; Lodish 8e § 7.2;
// BioNumbers 102070: lacZ = 3075 bp):
//  - volgorde: regulatorgen lacI (maakt de repressor, ligt los ervoor) … promotor → operator → lacZ → lacY → lacA. Eén
//    promotor voor drie genen: één mRNA voor alle drie. lacZ is het langste gen; lacY en lacA korter (verhouding bij benadering).
//  - zonder lactose zit de lac-repressor op de operator en houdt RNA-polymerase tegen. De repressor is een eiwit (tetrameer =
//    twee paren; hier één paar zichtbaar op de operator), gevouwen keten, geen bol.
//  - met lactose bindt het omzettingsproduct allolactose aan de repressor; die verandert van vorm, laat de operator los, en
//    RNA-polymerase schrijft de drie genen over tot één mRNA (dunne teal sliert).
//  - o.lactose 0..1: 0–0.3 suiker komt aan en bindt · 0.3–0.5 repressor laat los · 0.5–1 polymerase loopt, mRNA groeit.
// Bekende fouten: operator vóór de promotor; drie aparte promotors; repressor die op een gen zit; lactose die op het DNA bindt.
// Vereist dnaDraad (lib_micro_evo.js). (x0, y) = begin van lacI op de DNA-as; w = lengte t/m lacA (± w × 0,4 hoog met
// repressor). o.lactose 0..1, o.lacI (standaard aan), o.t. Plaatshouder voor RNA-polymerase (eigen object: rnaPolymerase).
// Geeft {lacI, promotor, operator, genen: [[x, y] ×3], repressor, polymerase, mrna} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function _lacSuiker(ctx, x, y, r, a = 1) { // (allo)lactose: twee zesringen (galactose + glucose) met een brug; oker = voedingsmolecuul (C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(C.oker, 0.35); ctx.fillStyle = rgba(C.oker, 0.55); ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineJoin = 'round';
  const ring = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + Math.PI / 6, X = cx + Math.cos(an) * r, Y = cy + Math.sin(an) * r * 0.62; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  ring(x - r * 1.25, y); ring(x + r * 1.25, y + r * 0.35); ctx.beginPath(); ctx.moveTo(x - r * 0.3, y + r * 0.2); ctx.lineTo(x + r * 0.3, y + r * 0.3); ctx.stroke(); ctx.restore(); }
function _lacMRNA(ctx, x0, x1, y, s, t = 0) { if (x1 - x0 < 3) return; ctx.strokeStyle = C.teal; ctx.lineWidth = 2.6 * s; ctx.lineCap = 'round'; ctx.beginPath(); // dunne sliert (C9: ± half zo dik als DNA)
  for (let u = x0; u <= x1; u += 5 * s) { const Y = y + Math.sin(u / (30 * s) + t) * 8 * s + Math.sin(u / (83 * s)) * 5 * s; u === x0 ? ctx.moveTo(u, Y) : ctx.lineTo(u, Y); } ctx.stroke(); }
function _lacMouw(ctx, x0, x1, y, h, fill, rand, s) { roundRect(ctx, x0, y - h / 2, x1 - x0, h, h * 0.3); shape(ctx, fill, rand, 1.5 * Math.max(0.6, s)); }
function lacOperon(ctx, x0, y, w, o = {}) {
  const { a = 1, lactose = 0, lacI = true, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1600, dw = Math.max(5, 26 * s), mh = 62 * s, uit = { genen: [] };
  const X = (bp) => x0 + bp * s; // indeling in 'beeldeenheden' (lacZ 3075 bp → 560, lacY → 240, lacA → 130; rest schematisch)
  const R = { I: [0, 230], p: [330, 470], o: [478, 540], Z: [552, 1112], Y: [1124, 1364], A: [1376, 1506] };
  const kom = ease(clamp(lactose / 0.3, 0, 1)), los = ease(clamp((lactose - 0.3) / 0.2, 0, 1)), loop = ease(clamp((lactose - 0.5) / 0.5, 0, 1));
  ctx.save(); ctx.globalAlpha *= a;
  if (lacI) _lacMouw(ctx, X(R.I[0]), X(R.I[1]), y, mh, rgba(C.paars, 0.3), rgba(C.paars, 0.8), s);
  _lacMouw(ctx, X(R.p[0]), X(R.p[1]), y, mh, rgba(C.goud, 0.28), rgba(C.goud, 0.8), s);
  _lacMouw(ctx, X(R.o[0]), X(R.o[1]), y, mh, rgba(C.koraal, 0.3), rgba(C.koraal, 0.85), s);
  ['Z', 'Y', 'A'].forEach(g => { _lacMouw(ctx, X(R[g][0]), X(R[g][1]), y, mh, rgba(C.kernR, 0.3 + 0.25 * loop), C.kernR, s); uit.genen.push([(X(R[g][0]) + X(R[g][1])) / 2, y]); });
  dnaDraad(ctx, [[X(-40), y], [X(1560), y]], { w: dw, helix: true, glad: false, fase: t * 0.05 });
  const xs = X(R.p[1]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s * 1.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs, y + mh / 2); ctx.lineTo(xs, y + mh * 1.05); ctx.lineTo(xs + 46 * s, y + mh * 1.05); ctx.stroke();
  uit.lacI = [(X(R.I[0]) + X(R.I[1])) / 2, y]; uit.promotor = [(X(R.p[0]) + X(R.p[1])) / 2, y]; uit.operator = [(X(R.o[0]) + X(R.o[1])) / 2, y];
  // RNA-polymerase (plaatshouder): wacht bij de promotor, loopt na het loslaten over de genen; mRNA erachter
  const px = lerp(X(R.p[0] + 40), X(R.A[1] - 30), loop), py = y - 66 * s; if (loop > 0.01) _lacMRNA(ctx, X(R.Z[0]), px - 40 * s, y - 150 * s, s, t);
  enzymKluwen(ctx, px, py, 70 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); uit.polymerase = [px, py]; if (loop > 0.01) uit.mrna = [(X(R.Z[0]) + px) / 2, y - 150 * s];
  // repressor: paar kluwens op de operator; met allolactose kantelt het en gaat omhoog weg
  const ox = uit.operator[0], ry = y - 70 * s - los * 210 * s, rx = ox + los * 120 * s, rot = los * 0.5;
  [-1, 1].forEach(k => { const binnen = (px2, py2) => { const ex = px2 / 74, ey = (py2 + 4) / 64; return ex * ex + ey * ey < 1 && Math.hypot(px2, py2 - 66) > 30 && px2 * k > 3; };
    _grKluwen(ctx, rx, ry, binnen, { r: 6.5, sc: s * 1.6, col: k < 0 ? '#A57F7A' : '#B08A84', seed: k < 0 ? 8 : 11, rot, bbox: [-76, -66, 76, 60], key: 'lacA' + k }); });
  uit.repressor = [rx, ry - 70 * s];
  // allolactose: twee moleculen drijven aan en zakken in de holtes van de repressor
  [-1, 1].forEach(k => { const doelX = rx + k * 46 * s * 1.6 * Math.cos(rot), doelY = ry - 10 * s * 1.6 + k * 46 * s * 1.6 * Math.sin(rot); const sx0 = ox + k * 360 * s + 200 * s, sy0 = y - 330 * s + k * 30 * s;
    if (lactose > 0.01) _lacSuiker(ctx, lerp(sx0, doelX, kom), lerp(sy0, doelY, kom), 13 * s * 1.6, Math.min(1, lactose * 6)); });
  ctx.restore(); return uit;
}

// ---- genregulatie/methylgroep/C.js
// =====================================================================================
// METHYLGROEP op de promotor (basenniveau; ronde 2: gouden promotorvak om het stuk DNA). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 7):
//  - DNA-methylering = een methylgroep (CH3: één koolstof met drie waterstofatomen) op de C van een CG-paar (CpG) in de
//    promotor; CpG's liggen gespiegeld, dus op beide strengen zit een C die gemethyleerd wordt. Het CH3 steekt uit in de grote
//    groef; hier als bolletje aan de zijkant van de C-base (koraal; C1: rem/uit) met drie witte H's.
//  - een gemethyleerde promotor wordt meestal niet afgelezen: de transcriptiefactor kan niet binden (o.tf: hij komt aan, stuit
//    op de methylgroepen en drijft weg; zonder methylering landt hij). Slotje (o.slot) is een optionele metafoor.
//  - bij de deling (o.deling 0..1) gaan de strengen uit elkaar; elke dochter heeft één oude streng mét methylgroepen en één nieuwe
//    zonder (half gemethyleerd); een enzym zet daarna op de nieuwe streng tegenover elke oude CH3 ook een CH3 (beide dochters
//    gemethyleerd; 'persist through multiple rounds of cell division', OpenStax).
// Bekende fouten: CH3 op een A of T; methylgroepen die bij de deling verdwijnen; methyl als losse stip zonder binding.
// (x, y) = midden van het stuk promotor; s = schaal (± 820 × 260 px bij s = 1, met deling ± 820 × 640). o.m 0..1 (groepen
// verschijnen één voor één), o.tf 0..1, o.deling 0..1, o.slot, o.t. Geeft {sites: [[x, y] …], tf, dochters} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function methylCH3(ctx, x, y, r, an = -Math.PI / 2, a = 1) { // CH3: koolstof (koraal) met drie waterstofjes, aan een steeltje vanaf (x, y) in richting an
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.koraal, 0.25); ctx.lineWidth = Math.max(1.2, r * 0.32); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * 1.5, 0); [-1.1, 0, 1.1].forEach(q => { ctx.moveTo(r * 1.5, 0); ctx.lineTo(r * 1.5 + Math.cos(q) * r * 1.25, Math.sin(q) * r * 1.25); }); ctx.stroke();
  [-1.1, 0, 1.1].forEach(q => _bioCirc(ctx, r * 1.5 + Math.cos(q) * r * 1.3, Math.sin(q) * r * 1.3, r * 0.42, '#E4E6EA', null)); _bioCirc(ctx, r * 1.5, 0, r * 0.75, C.koraal, lighten(C.koraal, 0.35), 1); ctx.restore(); }
function _mgSlot(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5 * s; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - 14 * s, 12 * s, Math.PI, 0); ctx.lineTo(x + 12 * s, y - 4 * s); ctx.moveTo(x - 12 * s, y - 14 * s); ctx.lineTo(x - 12 * s, y - 4 * s); ctx.stroke();
  roundRect(ctx, x - 18 * s, y - 6 * s, 36 * s, 28 * s, 6 * s); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 1); _bioCirc(ctx, x, y + 8 * s, 3.5 * s, '#121A26'); ctx.restore(); }
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, slot = false, t = 0, seq = 'ACGGTCGACGTA' } = o; if (a <= 0.01) return {};
  const n = seq.length, dx = 68 * s, k = 0.78 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, uit = { sites: [], dochters: [] };
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, cpg = []; for (let i = 0; i < n - 1; i++) if (seq[i] === 'C' && seq[i + 1] === 'G') cpg.push(i);
  const plekken = []; cpg.forEach(i => { plekken.push([i, 0]); plekken.push([i + 1, 1]); }); // [index, streng]: boven de C, onder de C tegenover de G
  ctx.save(); ctx.globalAlpha *= a;
  const ladder = (cy, sterkte, oudBoven, oudOnder, nieuwA, mOud, mNieuw) => { // sterkte = afstand tussen de rails / 2
    roundRect(ctx, x0 - 46 * s, cy - sterkte - 22 * s, (n - 1) * dx + 92 * s, sterkte * 2 + 44 * s, 18 * s); shape(ctx, rgba(C.goud, 0.12), rgba(C.goud, 0.75), 1.5 * Math.max(0.6, s)); // gouden promotorvak (ronde 2)
    const yT = cy - sterkte, yB = cy + sterkte, rail = (yy, oud, al) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = oud ? DNA_BASE.rugR : '#DCD4F5'; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yy); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yy); ctx.stroke(); ctx.strokeStyle = oud ? DNA_BASE.rug : '#B9ACE6'; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
    for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yT + 8 * s, seq[i], 1, { s: k, a: oudBoven ? 1 : nieuwA, plekA: 0 }); baseRing(ctx, xx, yB - 8 * s, comp[seq[i]], -1, { s: k, a: oudOnder ? 1 : nieuwA, plekA: 0 }); }
    rail(yT, oudBoven, oudBoven ? 1 : nieuwA); rail(yB, oudOnder, oudOnder ? 1 : nieuwA);
    plekken.forEach(([i, str], q) => { const xx = x0 + i * dx + 22 * k, yy = str === 0 ? yT + 8 * s + DNA_BASE.len * k * 0.5 : yB - 8 * s - DNA_BASE.len * k * 0.5; const oud = str === 0 ? oudBoven : oudOnder;
      const mm = oud ? mOud(q) : mNieuw; if (mm > 0.01) { methylCH3(ctx, xx, yy + (1 - ease(mm)) * (str === 0 ? -60 : 60) * s, 8 * s, 0, Math.min(1, mm * 1.5)); } uit.sites.push([xx + 24 * s, yy]); }); };
  const mq = (q) => ease(clamp(m * plekken.length - q, 0, 1));
  if (deling < 0.01) { ladder(y, H, true, true, 1, mq, 0);
    if (slot && m > 0.5) _mgSlot(ctx, x0 - 70 * s, y - H - 30 * s, s, (m - 0.5) * 2);
    if (tf > 0.01) { const geblokt = m > 0.5, p = ease(tf), ty = geblokt ? y - H - 130 * s + Math.sin(p * Math.PI) * 50 * s - p * 30 * s : lerp(y - H - 220 * s, y - H - 46 * s, p), tx = x + (geblokt ? p * 60 * s : 0);
      _grKluwen(ctx, tx, ty, (qx, qy) => { const ex = qx / 70, ey = qy / 52; return ex * ex + ey * ey < 1 && !(qy > 30 && Math.abs(qx) < 24); }, { r: 6.5, sc: s, col: '#7A8BA8', seed: 3, bbox: [-72, -54, 72, 54], key: 'mgTF', a: Math.min(1, tf * 2) }); uit.tf = [tx, ty]; } }
  else { const d = ease(clamp(deling / 0.45, 0, 1)), nieuw = ease(clamp((deling - 0.4) / 0.25, 0, 1)), herstel = ease(clamp((deling - 0.7) / 0.3, 0, 1)), off = d * (H * 2 + 70 * s);
    // dochter 1: oude bovenstreng + nieuwe onderstreng; dochter 2: nieuwe bovenstreng + oude onderstreng
    ladder(y - off / 2 * 1.0 - 0, H, true, false, nieuw, mq, herstel); ladder(y + off / 2, H, false, true, nieuw, mq, herstel); uit.dochters = [[x, y - off / 2], [x, y + off / 2]]; }
  ctx.restore(); return uit;
}

// ---- genregulatie/nucleosoomAcetyl/C.js
// =====================================================================================
// NUCLEOSOMEN DICHT ↔ OPEN, vooraanzicht met ladingen (vezel ↔ kralensnoer); ronde 2: histonkern als gekantelde schijf met twee lagen van vier histonen (acht), DNA voor en achter de schijf. Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 4):
//  - elk nucleosoom = kern van acht histonen (schijf ± 11 nm) met het DNA (2 nm) er ± 1,65 keer omheen; recht van voren
//    gezien een schijf met een ring DNA langs de rand, linker-DNA naar de volgende.
//  - histonstaarten zijn positief geladen (+), het DNA negatief (−): ze trekken elkaar aan. Dicht (o.open 0): nucleosomen
//    pakken zich in een zigzag-vezel tegen elkaar, de promotor zit ertussen verstopt, een transcriptiefactor kan er niet bij.
//  - acetylgroepen (groen) op de staarten maken ze minder positief ('the charge becomes less positive, and the binding of DNA
//    to the histones is relaxed', OpenStax): de + verdwijnen, de vezel valt open tot een kralensnoer, de promotor (goud)
//    ligt vrij en een transcriptiefactor kan binden (o.tf).
// Bekende fouten: open = minder nucleosomen; lading op de verkeerde plek; DNA dat door de schijf loopt.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de zijaanzichtversie: van (x0,y0) naar (x1,y1); o.n, o.R (straal
// van de schijf), o.open 0..1, o.tf 0..1, o.t. Geeft {promotor, centra, tf} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function _naAcetyl(ctx, x, y, rr, an, a = 1) { // acetylgroep: C=O en CH3 (drie bolletjes), groen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = rr * 0.4;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, -rr * 0.9); ctx.moveTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, rr * 0.9); ctx.stroke();
  _bioCirc(ctx, rr * 1.6, 0, rr * 0.75, C.groen, lighten(C.groen, 0.35), 1); _bioCirc(ctx, rr * 2.7, -rr * 0.95, rr * 0.6, '#D8DCE2', null); _bioCirc(ctx, rr * 2.7, rr * 0.95, rr * 0.6, C.groen, null); ctx.restore(); }
function nucleosoomAcetyl(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, open = 0, tf = 0, t = 0 } = o; if (a <= 0.01) return {};
  const ac = ease(clamp(open / 0.35, 0, 1)), schuif = ease(clamp((open - 0.3) / 0.7, 0, 1));
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), cs = Math.cos(ang), sn = Math.sin(ang), Wd = (p) => [x0 + p[0] * cs - p[1] * sn, y0 + p[0] * sn + p[1] * cs];
  const dw = Math.max(5, R * 0.36), Rs = R * 0.78, uit = { centra: [] }, half = n / 2;
  // plekken: dicht = zigzag (twee rijen, overlappend), open = één rij met in het midden een vrij stuk (promotor)
  const C2 = []; for (let i = 0; i < n; i++) { const zx = L / 2 + (i - (n - 1) / 2) * R * 1.15, zy = (i % 2 ? 1 : -1) * R * 0.62;
    const ox = i < half ? R * 0.95 + i * R * 2.3 : L - R * 0.95 - (n - 1 - i) * R * 2.3;
    C2.push([lerp(zx, ox, schuif), lerp(zy, (i % 2 ? 1 : -1) * R * 0.12, schuif)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const pm = [(C2[half - 1][0] + C2[half][0]) / 2, (C2[half - 1][1] + C2[half][1]) / 2 + R * 0.25 * schuif];
  if (schuif > 0.05) { ctx.save(); ctx.globalAlpha *= schuif; roundRect(ctx, pm[0] - R * 0.95, pm[1] - dw * 1.3, R * 1.9, dw * 2.6, dw); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  // DNA-pad: binnenkomen links onder elke schijf, rondje langs de rand, eruit rechts onder → naar de volgende
  const KZ = 0.62, TH = Rs * 0.42; // schijf iets gekanteld: bovenvlak als ellips (ry = KZ·R), zijkant TH dik (twee lagen van vier histonen)
  const ring = (c, i) => { const P = [], Z = [], a0 = Math.PI * 0.75, tot = 1.65 * 6.283; for (let k = 0; k <= 80; k++) { const u = k / 80, an = a0 + u * tot, rr = Rs + dw * 0.55; P.push([c[0] + Math.cos(an) * rr, c[1] + Math.sin(an) * rr * KZ + lerp(-TH * 0.45, TH * 0.45, u)]); Z.push(Math.sin(an)); } P.Z = Z; return P; };
  const R2 = C2.map(ring);
  const linkers = [[[0, 0], [C2[0][0] - R * 0.8, C2[0][1] + R * 0.3], R2[0][0]]];
  for (let i = 0; i < n - 1; i++) { const A = R2[i][R2[i].length - 1], B = R2[i + 1][0]; linkers.push(i === half - 1 ? [A, [pm[0] - R * 0.5, pm[1]], [pm[0] + R * 0.5, pm[1]], B] : [A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + R * 0.35], B]); }
  linkers.push([R2[n - 1][R2[n - 1].length - 1], [C2[n - 1][0] + R * 0.9, C2[n - 1][1] - R * 0.2], [L, 0]]);
  linkers.forEach(P => dnaDraad(ctx, P, { w: dw, helix: true, fase: t * 0.2 }));
  // schijven met DNA-ring (achterste rij eerst)
  const volg = [...C2.keys()].sort((i, j) => C2[i][1] - C2[j][1]);
  const deelR = (P, voor) => { const out = []; let cur = null; P.forEach((p, k) => { if ((P.Z[k] >= 0) === voor) { if (!cur) { cur = []; out.push(cur); } cur.push(p); } else cur = null; }); return out.filter(q => q.length > 2); };
  volg.forEach(i => { const c = C2[i]; deelR(R2[i], false).forEach(q => dnaDraad(ctx, q, { w: dw, helix: true, glad: false, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), fase: t * 0.2 }));
    // histonkern als schijf: zijkant (onderste laag van vier histonen als bulten) + bovenvlak (bovenste laag van vier)
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + TH / 2, Rs, Rs * KZ, 0, 0, Math.PI); ctx.lineTo(c[0] - Rs, c[1] - TH / 2); ctx.ellipse(c[0], c[1] - TH / 2, Rs, Rs * KZ, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#56667F', '#8E9EBA', 1.5);
    for (let k = 0; k < 4; k++) { const an = Math.PI * (0.18 + k * 0.21); ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * Rs * 0.78, c[1] + TH * 0.15 + Math.sin(an) * Rs * KZ * 0.78, Rs * 0.24, TH * 0.42, 0, 0, 6.283); shape(ctx, '#66779A', '#8E9EBA', 1); }
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - TH / 2, Rs, Rs * KZ, 0, 0, 6.283); shape(ctx, '#6E7F9C', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.8; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * Rs * 0.44, c[1] - TH / 2 + Math.sin(an) * Rs * KZ * 0.44, Rs * 0.36, Rs * KZ * 0.36, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#A4B2CA', 1); }
    deelR(R2[i], true).forEach(q => dnaDraad(ctx, q, { w: dw, helix: true, glad: false, fase: t * 0.2 }));
    // staarten: dicht = tegen het DNA van de buren met +; open = naar buiten met acetylgroepen
    const rr = R * 0.075; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.4 + i, P = [];
      for (let q = 0; q < 6; q++) { const u = q / 5, len = lerp(0.55, 0.95, schuif) * R, krul = lerp(1.4, 0.3, schuif); P.push([c[0] + Math.cos(an) * Rs * 0.7 + Math.cos(an + u * krul) * u * len, c[1] + Math.sin(an) * Rs * 0.7 + Math.sin(an + u * krul) * u * len]); }
      ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.strokeStyle = '#C4CEDC'; ctx.lineWidth = rr * 1.5 + 2; ctx.stroke(); ctx.strokeStyle = '#9AAAC4'; ctx.lineWidth = rr * 1.5; ctx.stroke(); // staart = stukje eiwitketen (buis, geen kralen)
      const q = P[3]; if (ac < 0.5 && R >= 24) { ctx.save(); ctx.globalAlpha *= 1 - ac * 2; text(ctx, '+', q[0] + rr * 2.2, q[1] - rr * 1.2, fTekst(Math.max(10, R * 0.32), 700), C.text, 'center'); ctx.restore(); }
      _naAcetyl(ctx, P[5][0], P[5][1], rr * 1.1, an + 0.3, ac); } uit.centra.push(Wd(c)); });
  if (tf > 0.01 && schuif > 0.6) { const p = ease(tf), tx = pm[0], ty = lerp(pm[1] - R * 2.6, pm[1] - dw * 1.7, p); _grKluwen(ctx, tx, ty, (qx, qy) => { const ex = qx / 70, ey = qy / 52; return ex * ex + ey * ey < 1 && !(qy > 30 && Math.abs(qx) < 24); }, { r: 6.5, sc: R / 100, col: '#7A8BA8', seed: 3, bbox: [-72, -54, 72, 54], key: 'naTF', a: Math.min(1, tf * 2) }); uit.tf = Wd([tx, ty]); }
  uit.promotor = Wd(pm); ctx.restore(); return uit;
}

// ---- dna/mrnaSliert/C.js
// =====================================================================================
// mRNA ALS SLIERT — variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) + de streng kronkelt echt (lussen, wisselende bochten),
// duidelijker poly-A-staart en cap.
// Recept (OpenStax Biology 2e § 15.2–15.5; Alberts MBoC 4e 'From RNA to Protein'; prompt C9 'mRNA: a thin, slack single strand, about half as
// thick as DNA, gently curved, never a straight bar; bases as short spikes on one side'; Beeldafspraak: dun en sliertig):
//  - één enkele streng, teal (RNA), ± half zo dik als DNA (dnaDraad/d2Rug), slap en zacht kronkelend; beweegt rustig (t).
//  - basen als korte stekels aan één kant; ingezoomd (o.basen → 1) de puzzelvorm van baseRingRNA (U heeft de rand van T).
//  - leesrichting 5' → 3' (ribosoom leest 5' → 3', OpenStax § 15.5); codons = drietallen, gemarkeerd met een lichte boog per drie.
//  - vwo: 5'-cap (gemodificeerde G) als knopje aan het 5'-uiteinde, poly-A-staart (hier 14 A; cap en staart: OpenStax § 15.4, nog niet geopend in deze ronde) aan 3'.
//  - afbreken (o.afbraak 0 → 1): de staart wordt korter, dan breekt de streng vanaf het 5'-uiteinde in losse nucleotiden.
//  Bekende fouten: staafje of blokje (Beeldafspraak); dubbele streng; basen aan beide kanten; even dik als DNA.
// mrnaSliert(ctx, x, y, len, {rot, seq, t, slap 0..1, rek 0..1, basen 0..1, codons 0..1, cap 0..1, polyA 0..1, afbraak 0..1, dikte, a})
// (x, y) = 5'-uiteinde; len = lengte in px langs de as. Geeft {p5, p3, punt(u) → [x, y, hoek], codon(k) → [x, y]} terug.
// =====================================================================================
var MRNA_SEQ = 'AUGGCCAAGUUCGGAUCCUGGAAACUGGUCAAUGCGUACGAUCUGGCAAGCUGA';
function _mrnaPad(x, y, len, o) { // kronkelende sliert: richting = som van sinussen (integreren) → echte bochten en af en toe een lus;
  // daarna zo gedraaid en geschaald dat 5' → 3' van (x, y) naar (x + len, y) loopt (langs rot). o.kronkel 0 = rustige golf.
  const { rot = 0, t = 0, slap = 1, rek = 0, seed = 1, kronkel = 1 } = o; const k = kronkel * slap * (1 - rek), n = 160, Q = [[0, 0]]; let px = 0, py = 0;
  for (let i = 1; i <= n; i++) { const u = i / n, th = k * (0.7 * Math.sin(u * 6.283 * 2.1 + seed + t * 0.2) + 1.5 * Math.sin(u * 6.283 * 5.3 + seed * 2.3 - t * 0.15) + 0.6 * Math.sin(u * 6.283 * 9.1 + seed * 0.7));
    px += Math.cos(th); py += Math.sin(th); Q.push([px, py]); }
  const E = Q[n], d = Math.hypot(E[0], E[1]) || 1, ca = E[0] / d, sa = E[1] / d, f = len / d, cr = Math.cos(rot), sr = Math.sin(rot);
  const L0 = Q.map(([qx, qy]) => [(qx * ca + qy * sa) * f, (-qx * sa + qy * ca) * f]), my = Math.max(1, ...L0.map(p => Math.abs(p[1]))), sy = Math.min(1, len * 0.16 / my); // hoogte begrenzen (± 16 % van de lengte)
  return L0.map(([X, Y0]) => { const Y = Y0 * sy; return [x + X * cr - Y * sr, y + X * sr + Y * cr]; }); }
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
function mrnaSliert(ctx, x, y, len, o = {}) {
  const { a = 1, seq = MRNA_SEQ, basen = 0, codons = 0, cap = 0, polyA = 0, afbraak = 0, dikte = Math.max(2.2, len * 0.0045) } = o; if (a <= 0.01) return {};
  const P = _mrnaPad(x, y, len, o), kl = '#5BA4C9', kd = '#2E6F92';
  const nB = seq.length, nA = Math.round(18 * polyA), tot = nB + nA, stap = 1 / tot, sp = len * stap;
  const af = ease(clamp(afbraak, 0, 1)), staart = nA * (1 - clamp(af * 2, 0, 1)), u0 = clamp((af - 0.4) / 0.6, 0, 1) * 0.85, u1 = (nB + staart) / tot;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // basen (stekels aan één kant, of puzzelvorm als ingezoomd)
  const vorm = basen > 0.5 && sp >= 18;
  for (let i = 0; i < nB + Math.floor(staart); i++) { const u = (i + 0.5) * stap; if (u < u0) continue; const [px, py, an] = _mrnaPunt(P, u), b = i < nB ? seq[i] : 'A', staartA = i >= nB, nx = Math.cos(an + Math.PI / 2), ny = Math.sin(an + Math.PI / 2);
    if (vorm) { ctx.save(); ctx.globalAlpha *= clamp((basen - 0.5) * 2, 0, 1); d2Base(ctx, px + nx * dikte, py + ny * dikte, an + Math.PI / 2, b, sp * 0.9, sp * 0.3, { rna: true, letter: sp >= 34 }); ctx.restore(); }
    const kort = (vorm ? 0 : 1) * lerp(dikte * 2.2, Math.min(sp * 0.9, dikte * 5), basen); if (kort > 0.5) { ctx.strokeStyle = staartA ? '#D8EEF7' : RNA_BASE.base[b]; ctx.lineWidth = Math.max(1.6, Math.min(sp * 0.45, dikte * 1.1)); ctx.beginPath(); ctx.moveTo(px + nx * dikte * 0.5, py + ny * dikte * 0.5); ctx.lineTo(px + nx * (dikte * 0.5 + kort), py + ny * (dikte * 0.5 + kort)); ctx.stroke(); } }
  // ruggengraat
  const Q = P.filter((p, i) => { const u = i / (P.length - 1); return u >= u0 && u <= u1 + stap * 0.5; });
  if (Q.length > 1) { ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kd; ctx.lineWidth = dikte + 2; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dikte; ctx.stroke(); }
  // codons: lichte boog onder elk drietal (aan de kant zonder basen)
  if (codons > 0.01) { ctx.save(); ctx.globalAlpha *= codons * 0.85; for (let k = 0; k * 3 < nB; k++) { const ua = k * 3 * stap + stap * 0.15, ub = (k * 3 + 3) * stap - stap * 0.15; if (ua < u0) continue; ctx.beginPath();
      for (let q = 0; q <= 8; q++) { const [px, py, an] = _mrnaPunt(P, lerp(ua, ub, q / 8)), nx = Math.cos(an - Math.PI / 2), ny = Math.sin(an - Math.PI / 2), d = dikte * 2.4 + Math.sin(q / 8 * Math.PI) * dikte * 1.2; q ? ctx.lineTo(px + nx * d, py + ny * d) : ctx.moveTo(px + nx * d, py + ny * d); }
      ctx.strokeStyle = k % 2 ? rgba(C.goud, 0.55) : rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, dikte * 0.6); ctx.stroke(); } ctx.restore(); }
  // cap aan 5'
  if (cap > 0.01 && u0 < 0.01) { const [px, py] = P[0]; ctx.save(); ctx.globalAlpha *= cap; _bioCirc(ctx, px - dikte * 2.2, py, dikte * 2.8, '#356F91', '#BFE0EF', 2); _bioCirc(ctx, px - dikte * 2.2, py, dikte * 1.1, '#BFE0EF', null); ctx.restore(); }
  // losse nucleotiden van de afbraak
  if (af > 0.4) { const nLos = Math.round(u0 * nB); for (let i = 0; i < nLos; i++) { const [px, py] = _mrnaPunt(P, (i + 0.5) * stap), dr = (af - 0.4) * 60 + 10; _bioCirc(ctx, px + (hash(i * 3.1) - 0.5) * dr, py + (hash(i * 7.7) - 0.3) * dr, Math.max(1.5, dikte * 0.8), rgba(RNA_BASE.base[seq[i]], 0.8)); } }
  ctx.restore();
  return { p5: P[0], p3: _mrnaPunt(P, u1), punt: (u) => _mrnaPunt(P, u), codon: (k) => _mrnaPunt(P, (k * 3 + 1.5) * stap) };
}

// ---- dna/rnaPolymerase/C.js
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
// punt-in-veelhoek (ontwerpeenheden) als 'binnen'-functie voor _grKluwen; bbox erbij
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }
// =====================================================================================
// RNA-POLYMERASE MET TRANSCRIPTIEBEL — variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) + kaken en klep als gevouwen
// eiwitlint (_grKluwen), en het DNA-RNA-hybride duidelijk: RNA-basen in puzzelvorm tegenover de matrijs met gouden paarstreepjes.
// Recept (OpenStax Biology 2e § 15.2: 'the DNA unwinds ahead of the polymerase and then rewinds behind it', RNA 5' → 3' met
// ± 40 nt/s, promotor stroomopwaarts, terminator laat los; Barnes e.a. 2015 Mol Cell 59:258: transcriptiebel ± 8–22 nt open,
// kort DNA-RNA-hybride ± 8–9 bp):
//  - de polymerase (grijsblauw eiwit, actief centrum goud) zit óp het DNA en opent het alleen lokaal (bel ± 14 bp); vóór en
//    achter de bel blijft het een rechtsdraaiende dubbele helix (dnaLadderHelix) — duidelijk anders dan replicatie: geen vork,
//    geen twee nieuwe strengen, maar één dunne teal mRNA-sliert die uit het enzym komt.
//  - de matrijsstreng (onder) wordt 3' → 5' gelezen; het mRNA groeit 5' → 3' met U tegenover A; ± 8 basen vormen een hybride
//    met de matrijs, daarna laat het mRNA los en verlaat het enzym schuin naar boven.
//  - standen: 'bind' (op de promotor, DNA nog dicht), 'open' (bel open, nog geen RNA), 'lees' (bel + mRNA van o.mrna px),
//    'los' (terminator: enzym en mRNA laten los, DNA sluit). Animeer de beweging door x te verschuiven (DNA ligt stil).
//  Bekende fouten: replicatievork; RNA dat aan beide strengen ontstaat; DNA dat open blijft achter de polymerase; dik mRNA.
// rnaPolymerase(ctx, x, y, s, {stand, mrna, x0, x1, seq, t, a}); (x, y) = actief centrum op de DNA-as; s = schaal (1 ≈ 240 px breed).
// Geeft {actief, p5 (mRNA-uiteinde), bel: [xa, xb]} terug.
// =====================================================================================
function _rnapDNA(ctx, x, y, u, o) { const { x0 = x - 6 * u, x1 = x + 6 * u, open = 1, seq = 'TACGGATCCATGAAGTTCGGACTGATCCGTAGCTTAG' } = o;
  const dx = 0.1 * u, R = 0.27 * u, xa = x - 1.0 * u, xb = x + 0.4 * u, s = R / 110 * 0.62 * 1.6;
  const helix = (xs, xe, fase) => { if (xe - xs < dx * 2) return; const n = Math.floor((xe - xs) / dx) + 1; dnaLadderHelix(ctx, xs, y, dx, seq.repeat(4).slice(0, n), { draai: 1, R, s: Math.max(0.05, s), fase, toonBasen: 1 }); };
  if (open < 0.01) { helix(x0, x1, 0); return { xa, xb, dx, R, dicht: true }; }
  helix(x0, xa, 0); helix(xb, x1, (xb - x0) / dx * 0.628);
  // bel: codestreng boog omhoog, matrijs boog omlaag, met losse basen naar binnen
  const H = (X) => Math.sin(clamp((X - xa) / (xb - xa), 0, 1) * Math.PI) * open;
  const rug = D2.oud, bw = Math.max(3, R * 0.2), Ltop = [], Lbot = [];
  for (let X = xa; X <= xb + 0.01; X += dx * 0.5) { Ltop.push([X, y - R - H(X) * 0.35 * u]); Lbot.push([X, y + R + H(X) * 0.25 * u]); }
  const tB = [], cB = []; for (let X = xa + dx * 0.5, i = 0; X < xb; X += dx, i++) { const b = seq[i % seq.length]; tB.push([X, b]); cB.push([X, D2.comp[b]]); }
  return { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug }; }
function _rnapStrengen(ctx, D, y, u, mrna, t) { if (D.dicht) return null; const { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug } = D; const L = Math.max(4, R * 0.75);
  cB.forEach(([X, b]) => d2Base(ctx, X, y - R - H(X) * 0.35 * u + bw * 0.4, Math.PI / 2, b, L * (1 - 0.35 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  tB.forEach(([X, b]) => d2Base(ctx, X, y + R + H(X) * 0.25 * u - bw * 0.4, -Math.PI / 2, D2.comp[b], L, Math.max(1.5, dx * 0.32), { vorm: dx >= 22, letter: dx >= 30 }));
  d2Rug(ctx, Ltop, { kleur: rug, bw }); d2Rug(ctx, Lbot, { kleur: rug, bw });
  // RNA: hybride over de laatste 8 nt vóór het actieve centrum, daarna los en schuin omhoog naar achteren
  if (mrna > 0) { const xs = xb - dx * 1.5, yh = (X) => y + R + H(X) * 0.25 * u - L * 1.9; const P = [];
    for (let k = 0; k <= 8 && k * dx <= mrna; k++) P.push([xs - k * dx, yh(xs - k * dx)]);
    const rest = mrna - 8 * dx; if (rest > 0) { const [px, py] = P[P.length - 1]; for (let q = 1; q <= 40; q++) { const f = q / 40, d = rest * f; P.push([px - d * 0.55 + Math.sin(f * 7 + t) * u * 0.05, py - d * 0.75 + Math.sin(f * 5 - t * 0.7) * u * 0.06]); } }
    // basen van het hybride (U tegenover A)
    for (let k = 0; k < 8 && k * dx <= mrna; k++) { const X = xs - k * dx, tb = tB.find(q => Math.abs(q[0] - X) < dx * 0.6); if (!tb) continue; const rb = D2.rcomp[D2.comp[tb[1]]] ; const rbb = rb === 'T' ? 'U' : rb, Lr = L * 0.85; d2Base(ctx, X, yh(X), Math.PI / 2, rbb, Lr, Math.max(1.5, dx * 0.32), { vorm: dx >= 22, rna: true, letter: dx >= 30 });
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.2, dx * 0.05); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X, yh(X) + Lr * 0.98); ctx.lineTo(X, y + R + H(X) * 0.25 * u - L * 0.98); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = Math.max(2.5, bw * 0.55) + 2; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, bw * 0.55); ctx.stroke(); ctx.restore();
    return P[P.length - 1]; } return null; }
function rnaPolymerase(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'lees', mrna = 0, t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s;
  const open = stand === 'bind' || stand === 'los' ? 0 : 1, los = stand === 'los' ? 1 : 0, rL = stand === 'lees' || stand === 'los' ? mrna : 0;
  ctx.save(); ctx.globalAlpha *= a;
  const ex = x - 0.3 * u, ey = y - los * 0.75 * u; // enzymmidden (tilt omhoog bij loslaten)
  // achterkant van het enzym (achter het DNA): grote kluwen met een kanaal
  ctx.beginPath(); bioPad(ctx, [[ex - 1.25 * u, ey + 0.1 * u], [ex - 1.05 * u, ey - 0.85 * u], [ex - 0.2 * u, ey - 1.15 * u], [ex + 0.8 * u, ey - 0.95 * u], [ex + 1.25 * u, ey - 0.25 * u], [ex + 1.15 * u, ey + 0.7 * u], [ex + 0.3 * u, ey + 1.0 * u], [ex - 0.8 * u, ey + 0.85 * u]], true); shape(ctx, '#3E4B60', '#6F7E98', 1.5);
  if (u >= 60) { ctx.save(); ctx.beginPath(); ctx.rect(ex - 2 * u, ey - 2 * u, 4 * u, 4 * u); ctx.ellipse(x - 0.3 * u, y, 0.95 * u, 0.62 * u, 0, 0, 6.283); ctx.clip('evenodd'); const pts = [[-1.25, 0.1], [-1.05, -0.85], [-0.2, -1.15], [0.8, -0.95], [1.25, -0.25], [1.15, 0.7], [0.3, 1.0], [-0.8, 0.85]], V = _lintVorm(pts.map(([px, py]) => [px * 92, py * 92])); _grKluwen(ctx, ex, ey, V.binnen, { bbox: V.bbox, sc: u / 100, r: 8, col: '#4A5870', seed: 9, key: 'rnapRug' }); ctx.restore(); } // achterkant als donker lint, niet in de bel
  const D = _rnapDNA(ctx, x, y, u, Object.assign({}, o, { open }));
  let p5 = null; if (los < 1) p5 = _rnapStrengen(ctx, D, y, u, rL, t); else { // los: DNA dicht, mRNA drijft weg
    const P = []; for (let q = 0; q <= 40; q++) { const f = q / 40; P.push([x - 0.6 * u - f * rL * 0.8, y - 0.9 * u - f * rL * 0.3 + Math.sin(f * 6 + t) * u * 0.08]); } ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, u * 0.04); ctx.stroke(); ctx.restore(); p5 = P[P.length - 1]; }
  // voorkant: onderkaak onder de matrijs en klep boven de codestreng, elk als gevouwen lint met silhouet (de bel blijft vrij)
  const deel = (pts, col, seed, naam) => { const P = pts.map(([px, py]) => [ex + px * u, ey + py * u]); ctx.beginPath(); bioPad(ctx, P, true);
    if (u < 60) { shape(ctx, col, lighten(col, 0.3), 1.5); return; } ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.4), 0.85); ctx.fill();
    const V = _lintVorm(pts.map(([px, py]) => [px * 100, py * 100])); _grKluwen(ctx, ex, ey, V.binnen, { bbox: V.bbox, sc: u / 100, r: 7, col, seed, key: 'rnap' + naam }); };
  deel([[-1.1, 0.55], [-0.4, 0.65], [0.5, 0.6], [1.05, 0.55], [0.9, 0.98], [-0.7, 1.02]], '#7A8BA8', 3, 'kaak');
  deel([[0.2, -0.98], [0.95, -0.88], [1.28, -0.35], [0.95, -0.42], [0.45, -0.62]], '#8796B0', 6, 'klep');
  const act = [D.xb - D.dx * 1.5, y + D.R + 0.25 * u * open - D.R * 0.75 * 1.0]; if (open && !los) _bioCirc(ctx, act[0], act[1], Math.max(2.5, u * 0.05), rgba(C.goud, 0.85), C.goud, 1.5);
  ctx.restore(); return { actief: act, p5, bel: [D.xa, D.xb] };
}

// ---- lab/thermocycler/C.js
// =====================================================================================
// THERMOCYCLER als gekoppeld schema: apparaat (schuin, deksel open met blok en buisjes) + temperatuurprofiel met lopende stip + wat de
// DNA-strengen bij die temperatuur doen + teller van het aantal kopieën (1 → 2 → 4 → 8).
// Recept: drie stappen per cyclus (OpenStax Biology 2e § 17.1; PCR-collegeslides KSU): ± 95 °C (20–30 s) de twee
//  strengen gaan los; 50–65 °C (hier 55, ± 30 s) korte primers binden aan het 3′-uiteinde van elke streng; 72 °C
//  (± 60 s) Taq-polymerase bouwt vanaf de primer een nieuwe streng (5′ → 3′). Elke cyclus verdubbelt het aantal
//  kopieën (n cycli → 2ⁿ); 25–35 cycli. De opwarm- en afkoelflanken zijn kort maar zichtbaar (geen sprong).
//  Kleuren: oude streng paars, nieuwe streng lichtpaars, primer goud; lijn van het profiel koraal bij opwarmen,
//  teal bij afkoelen. Apparaat ± 25 cm breed (≈).
//  Bekende fouten: primers binden bij 95 °C; nieuwe streng groeit in beide richtingen tegelijk vanaf het midden;
//  na één cyclus vier kopieën.
// x, y = linksonder van het hele schema; s = schaal (1 ≈ 1 px per mm voor het apparaat; schema ± 860 × 520 px).
// o.fase = cycli als kommagetal (2,4 = derde cyclus, primers binden); o.toon 'alles' | 'apparaat'; o.open (deksel,
// standaard 0,55); o.a.
// Geeft { apparaat, profiel, strengen, teller, temp } terug.
// =====================================================================================
function _tcTemp(f) { const c = Math.floor(f), u = f - c, voor = c === 0 ? 25 : 72;
  if (u < 0.05) return lerp(voor, 95, u / 0.05); if (u < 0.25) return 95; if (u < 0.32) return lerp(95, 55, (u - 0.25) / 0.07); if (u < 0.5) return 55; if (u < 0.55) return lerp(55, 72, (u - 0.5) / 0.05); return 72; }
function _tcKast(ctx, x, y, s, o = {}) {
  const { a = 1, open = 0, temp = 95, cyclus = 1, van = 30, stap = null, buisjes = 0, hl = 0 } = o;
  const W = 250, H = 150, D = 400, kx = 0.42, ky = 0.3;
  const pr = (X, Y, Z) => [x + (X + Z * kx) * s, y - (Y + Z * ky) * s];
  const ret = { display: pr(70, 90, 0), blok: pr(125, H, 96), deksel: pr(125, H + 60, 200), lamp: pr(210, 95, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const lw = Math.max(1, s * 0.5);
  const vlak = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach((p, i) => { const q = pr(...p); i ? ctx.lineTo(...q) : ctx.moveTo(...q); }); ctx.closePath(); shape(ctx, fill, stroke || lighten(fill, 0.18), lw); };
  const kast = '#3A4A66', kastL = '#4B5D7E', kastD = '#2B384F';
  // voetjes, zijkant, voorkant, bovenkant
  vlak([[W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]], kastD);
  vlak([[0, 0, 0], [W, 0, 0], [W, H, 0], [0, H, 0]], kast);
  vlak([[0, H, 0], [W, H, 0], [W, H, D], [0, H, D]], kastL);
  // ventilatiesleuven op de zijkant
  ctx.strokeStyle = rgba('#121A26', 0.6); ctx.lineWidth = lw; for (let k = 0; k < 9; k++) { const z = 120 + k * 22; const p0 = pr(W, 25, z), p1 = pr(W, 70, z); ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  // display + lampje + knopjes op de voorkant
  vlak([[18, 55, 0], [128, 55, 0], [128, 125, 0], [18, 125, 0]], '#0F1828', '#5A6B88');
  const dp = pr(73, 102, 0), fs = 22 * s;
  if (s > 0.6) { text(ctx, Math.round(temp) + ' °C', dp[0], dp[1], fMeta(Math.max(8, fs)), stap === 'op' ? C.koraal : stap === 'af' ? C.teal : C.text, 'center');
    const dp2 = pr(73, 72, 0); text(ctx, cyclus + ' / ' + van, dp2[0], dp2[1], fMeta(Math.max(7, fs * 0.65)), C.text2, 'center'); }
  const lp = pr(205, 100, 0); circ(ctx, lp[0], lp[1], 6 * s, stap === 'op' ? C.koraal : stap === 'af' ? C.teal : stap === 'klaar' ? C.groen : '#55657F');
  for (let k = 0; k < 3; k++) { const q = pr(160 + k * 22, 70, 0); circ(ctx, q[0], q[1], 6 * s, '#55657F'); }
  // blok met 12 × 8 gaatjes (bovenop, onder het deksel)
  const bx0 = 71, bz0 = 60; vlak([[bx0 - 8, H, bz0 - 8], [bx0 + 116, H, bz0 - 8], [bx0 + 116, H, bz0 + 80], [bx0 - 8, H, bz0 + 80]], '#8C96A6', '#B8C0CC');
  if (s > 0.9) for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const q = pr(bx0 + c * 9 + 4.5, H, bz0 + r * 9 + 4.5); ctx.beginPath(); ctx.ellipse(q[0], q[1], 3.0 * s, 2.0 * s, 0, 0, 6.283); ctx.fillStyle = '#4C5566'; ctx.fill(); }
  for (let c = 0; c < buisjes; c++) { const q0 = pr(bx0 + c * 9 + 4.5, H, bz0 + 4.5), q1 = pr(bx0 + c * 9 + 4.5, H + 9, bz0 + 4.5); ctx.fillStyle = rgba(C.er, 0.8); ctx.fillRect(q0[0] - 3 * s, q1[1], 6 * s, q0[1] - q1[1]); ctx.beginPath(); ctx.ellipse(q1[0], q1[1], 3.2 * s, 1.6 * s, 0, 0, 6.283); ctx.fillStyle = '#DDE4EC'; ctx.fill(); }
  // deksel: doos die om de achterrand (Z = D) draait
  const phi = clamp(open, 0, 1) * 1.25, Lz = D - 20, h = 55;
  const hoek = (X, yr, zr) => { const Z = zr * Math.cos(phi) + yr * Math.sin(phi), Y = -zr * Math.sin(phi) + yr * Math.cos(phi); return [X, H + 2 + Y, D + Z]; };
  const c = (X, top, voor) => hoek(X, top ? h : 0, voor ? -Lz : 0);
  const vlakken = [
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 0, 0), c(0, 0, 0)], f: '#262F40', z: 0 },   // onderkant (verwarmd deksel)
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 1, 1), c(0, 1, 1)], f: kast, z: 1 },        // voorkant
    { p: [c(W, 0, 1), c(W, 0, 0), c(W, 1, 0), c(W, 1, 1)], f: kastD, z: 1 },       // zijkant
    { p: [c(0, 1, 1), c(W, 1, 1), c(W, 1, 0), c(0, 1, 0)], f: kastL, z: 2 }];      // bovenkant
  const zichtbaar = (q) => { const P0 = pr(...q[0]), P1 = pr(...q[1]), P2 = pr(...q[2]); return (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P1[1] - P0[1]) * (P2[0] - P0[0]); };
  vlakken.forEach(v => { if (v.z === 0 ? phi > 0.05 : true) { const z = zichtbaar(v.p); if (v.z === 0 || z < 0 || v.z === 2 || v.z === 1) vlak(v.p, v.f); } });
  if (s > 0.6) { const g = pr(W / 2, H + h + 2, 30); const g2 = c(W / 2 - 40, 1, 1), g3 = c(W / 2 + 40, 1, 1); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(...pr(...g2)); ctx.lineTo(...pr(...g3)); ctx.stroke(); }
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = lw * 2.5; ctx.beginPath(); const q = [pr(0, 0, 0), pr(W, 0, 0), pr(W, 0, D), pr(W, H, D)]; ctx.strokeRect(q[0][0] - 6, pr(0, H + h, 0)[1] - 6, q[1][0] - q[0][0] + 12, q[0][1] - pr(0, H + h, 0)[1] + 12); }
  ctx.restore(); return ret;
}
function thermocycler(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0, toon = 'alles' } = o; const f = Math.max(0, fase), c = Math.floor(f), u = f - c, T = _tcTemp(f);
  const stap = u < 0.05 || (u >= 0.5 && u < 0.55) ? 'op' : (u >= 0.25 && u < 0.32) ? 'af' : u < 0.25 ? 'los' : u < 0.5 ? 'binden' : 'bouwen';
  const ret = { apparaat: [x + 150 * s, y - 130 * s], profiel: [x + 560 * s, y - 380 * s], strengen: [x + 560 * s, y - 150 * s], teller: [x + 125 * s, y - 20 * s], temp: T };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // --- apparaat schuin van voren, deksel open met het blok (12 × 8 gaatjes) en een strip buisjes erin
  _tcKast(ctx, x, y, 0.72 * s, { open: o.open == null ? 0.55 : o.open, temp: T, cyclus: c + 1, van: 30, stap: stap === 'op' ? 'op' : stap === 'af' ? 'af' : null, buisjes: 8 });
  if (toon !== 'alles') { ctx.restore(); return ret; }
  // --- temperatuurprofiel: 3 cycli zichtbaar rond de huidige
  const gx = x + 400 * s, gy = y - 260 * s, gw = 470 * s, gh = 230 * s, c0 = Math.max(0, c - 1), nC = 3;
  const tx = (ff) => gx + (ff - c0) / nC * gw, ty = (TT) => gy - (Math.max(TT, 40) - 40) / 60 * gh;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10 * s); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw + 10 * s, gy); ctx.stroke();
  for (const TT of [55, 72, 95]) { ctx.strokeStyle = rgba(C.line, 0.25); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(gx, ty(TT)); ctx.lineTo(gx + gw, ty(TT)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, TT + ' °C', gx - 10 * s, ty(TT) + 9 * s, fMeta(Math.max(10, 26 * s)), C.text2, 'right'); }
  const seg = (f0, f1, kleur, w) => { ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); for (let ff = f0; ff <= f1 + 1e-6; ff += 0.004) { const p = [tx(ff), ty(_tcTemp(ff))]; ff === f0 ? ctx.moveTo(...p) : ctx.lineTo(...p); } ctx.stroke(); };
  seg(c0, c0 + nC - 0.001, rgba(C.line, 0.45), 2.5 * s); // hele profiel vaag
  for (let ff = c0; ff < f; ff += 0.01) { const g = ff - Math.floor(ff); const k = (g < 0.05 || (g >= 0.5 && g < 0.55)) ? C.koraal : (g >= 0.25 && g < 0.32) ? C.teal : C.text; seg(ff, Math.min(f, ff + 0.01), k, 4 * s); }
  circ(ctx, tx(f), ty(T), 9 * s, C.goud);
  // --- de strengen bij deze stap (één molecuul, 20 sporten)
  const sx = gx + 40 * s, sw = gw - 80 * s, sy = y - 120 * s, N = 20, st = sw / N, open = stap === 'los' ? clamp(u / 0.2, 0, 1) : stap === 'af' || stap === 'binden' || stap === 'bouwen' ? 1 : (u >= 0.5 ? 1 : 0);
  const gap = lerp(28, 90, open) * s, yT = sy - gap / 2, yB = sy + gap / 2, rung = 13 * s;
  const streng = (yy, kl, i0, i1, dir) => { ctx.strokeStyle = kl; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(sx + i0 * st, yy); ctx.lineTo(sx + i1 * st, yy); ctx.stroke(); ctx.lineWidth = 5 * s; for (let i = i0; i < i1; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yy); ctx.lineTo(sx + (i + 0.5) * st, yy + dir * rung); ctx.stroke(); } };
  streng(yT, C.paars, 0, N, 1); streng(yB, C.paars, 0, N, -1);
  if (open < 0.3) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 3 * s; for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yT + rung); ctx.lineTo(sx + (i + 0.5) * st, yB - rung); ctx.stroke(); } }
  const prim = (stap === 'binden' && u > 0.36) || stap === 'bouwen' || (u >= 0.5); const pa = stap === 'binden' ? clamp((u - 0.36) / 0.1, 0, 1) : 1;
  if (prim && open > 0.9) { ctx.save(); ctx.globalAlpha *= pa; streng(yT + 2 * rung + 4 * s, C.goud, N - 3, N, -1); streng(yB - 2 * rung - 4 * s, C.goud, 0, 3, 1); ctx.restore();
    if (stap === 'bouwen') { const g = clamp((u - 0.55) / 0.4, 0, 1), n = Math.round(g * (N - 3)); streng(yT + 2 * rung + 4 * s, D2.nieuw, N - 3 - n, N - 3, -1); streng(yB - 2 * rung - 4 * s, D2.nieuw, 3, 3 + n, 1); } }
  text(ctx, "5′", sx - 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'right'); text(ctx, "3′", sx + sw + 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'left');
  // --- teller: aantal kopieën als kleine dubbelstrengen
  const n = Math.pow(2, c) * (stap === 'bouwen' && u > 0.97 ? 2 : 1), toonN = Math.min(n, 16);
  for (let i = 0; i < toonN; i++) { const px = x + (10 + (i % 8) * 30) * s, py = y + (40 + Math.floor(i / 8) * 26) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22 * s, py); ctx.moveTo(px, py + 9 * s); ctx.lineTo(px + 22 * s, py + 9 * s); ctx.stroke(); }
  text(ctx, '× ' + n, x + 260 * s, y + 56 * s, fMeta(Math.max(10, 28 * s)), C.text, 'left');
  ctx.restore(); return ret;
}

// ---- lab/primerStuk/C.js
// =====================================================================================
// PRIMER MET POLYMERASE: kort enkelstrengs stukje DNA (20 nt, goud) gebonden op de matrijs; DNA-polymerase
// (gevouwen keten in het gedeelde lintmodel _grKluwen: handpalm achter het DNA, duim vóór het DNA langs, actief
// centrum goud) gaat op het 3′-uiteinde zitten en bouwt de nieuwe streng (lichtpaars).
// Recept: OpenStax Biology 2e § 17.1 (PCR: primers zijn korte stukjes DNA die complementair zijn aan de uiteinden
//  van het doelstuk) en § 14.3 (polymerase kan alleen verlengen aan een vrij 3′-uiteinde, dus het heeft een
//  primer nodig). Een PCR-primer is ± 18–25 nt; hij ligt antiparallel op de matrijs, met zijn 3′-kant naar het
//  doelstuk toe. Basen in de puzzelvorm van de DNA-reeks (d2Base: A punt ↔ T inkeping, C nok ↔ G sleuf), alle sporten
//  even lang; ruggengraat van de primer goud, van de matrijs paars.
//  Stand o.bouw 0..1: de polymerase klemt zich op het 3′-uiteinde van de primer en voegt nucleotiden toe die passen
//  bij de matrijs, alleen in de richting 5′ → 3′ (naar rechts); de primer blijft het begin van de nieuwe streng.
//  Los (o.bind < 1) ritst de primer eerst vast zoals in de basisversie.
//  Bekende fouten: primer zo lang als het gen; primer parallel (5′ op 5′); basen die niet passen; primer als staafje.
// x, y = 5′-uiteinde van de primer als hij gebonden is (voet van de eerste base); s = schaal (1 = 34 px per base).
// o.bind 0..1, o.bouw 0..1 (± 7 nieuwe nucleotiden), o.seq, o.t, o.a. Geeft { vijf, drie, matrijs3, polymerase } terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}

function primerStuk(ctx, x, y, s, o = {}) {
  const { a = 1, bind = 1, matrijs = true, t = 0, bouw = 0 } = o;
  const seq = (o.seq || 'GACCTGAAGTCCATGGCTAC').slice(0, 30), n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const bp = 34 * s, L = 30 * s, hw = bp * 0.32, yM = y + 2 * L; // matrijs onder de primer
  const voor = 3, na = 7; // matrijsbasen links en rechts van de bindplek
  const ret = { vijf: [x, y], drie: [x + (n - 1) * bp, y], matrijs3: [x - voor * bp, yM] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const nNieuw = bind >= 1 ? Math.floor(clamp(bouw, 0, 1) * 7.999) : 0, xA = x + (n - 1 + nNieuw) * bp + bp * 0.5; ret.polymerase = [xA, y + L];
  const pk = L / 10; if (bind >= 1 && bouw > 0.001) _grKluwen(ctx, xA + 6 * pk, y + L, (px, py) => (px / 26) ** 2 + (py / 30) ** 2 < 1, { r: 2.6, sc: pk, col: D2.enz || C.enzym, seed: 2, bbox: [-26, -30, 26, 30], key: 'prPol', a: 0.95 }); // handpalm achter het DNA
  if (matrijs) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; const P = [];
    for (let i = -voor; i < n + na; i++) P.push([x + i * bp, yM]);
    ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(P[0][0] - bp * 0.4, yM); ctx.lineTo(P[P.length - 1][0] + bp * 0.4, yM); ctx.stroke();
    for (let i = -voor; i < n + na; i++) d2Base(ctx, x + i * bp, yM, -Math.PI / 2, mseq[i + voor], L, hw);
    if (s > 0.5) { text(ctx, "3′", x - (voor + 0.9) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'right'); text(ctx, "5′", x + (n + na - 0.1) * bp, yM + 40 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'left'); } }
  // primer: elke base heeft een eigen moment van binden (rits van 3′ naar 5′)
  const pts = []; for (let i = 0; i < n; i++) { const k = clamp(bind * 1.6 - (n - 1 - i) / n * 0.6, 0, 1), e = ease(k);
    const losX = x + (n - 1) * bp * 0.5 + (i - (n - 1) / 2) * bp * 0.92, losY = y - 2.4 * L + Math.sin(i * 0.7 + t * 1.5) * L * 0.35 + Math.cos(i * 0.31) * L * 0.4;
    pts.push([lerp(losX, x + i * bp, e), lerp(losY, y, e), e]); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0], p[1]]), false); ctx.stroke();
  pts.forEach((p, i) => { const vrij = 1 - p[2]; const ang = Math.PI / 2 + vrij * (Math.sin(i * 1.3 + t) * 0.5); d2Base(ctx, p[0], p[1], ang, seq[i], L, hw, { plekA: 0 }); });
  if (nNieuw > 0) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(x + (n - 1) * bp, y); ctx.lineTo(x + (n - 1 + nNieuw) * bp + bp * 0.3, y); ctx.stroke();
    for (let j = 0; j < nNieuw; j++) d2Base(ctx, x + (n + j) * bp, y, Math.PI / 2, comp[mseq[voor + n + j]], L, hw); }
  if (bind >= 1 && bouw > 0.001) { _grKluwen(ctx, xA + 20 * pk, y + L, (px, py) => (px / 7) ** 2 + (py / 27) ** 2 < 1, { r: 2.6, sc: pk, col: D2.enzR || '#A4B2CA', seed: 8, bbox: [-7, -27, 7, 27], key: 'prDuim', a: 0.9 }); circ(ctx, xA - bp * 0.5, y + L * 0.2, 3.2 * pk, C.goud); } // duim vóór het DNA, actief centrum bij het 3′-uiteinde
  if (s > 0.5) { const e0 = pts[0], e1 = pts[n - 1]; text(ctx, "5′", e0[0] - bp * 0.8, e0[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'right'); const xe = e1[0] + nNieuw * bp; if (!(bouw > 0.001)) text(ctx, "3′", xe + bp * 0.8, e1[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'left'); }
  ctx.restore(); return ret;
}

// ---- lab/gelElektroforese/C.js
// =====================================================================================
// GELELEKTROFORESE als apparaat in drie-kwart-aanzicht (horizontale bak met deksel, kabels naar de voeding) én,
// na het kleuren, de gel in het UV-kastje (o.foto), op ware maat (bak ± 1,3 × een hand).
// Recept (OpenStax Biology 2e § 17.1): DNA is negatief geladen en loopt naar de pluspool; korte stukken komen
//  verder (afstand lineair met −log lengte); markerladder in laan 1; DNA is onzichtbaar tot het gekleurd is, alleen
//  de paarse laadkleurstof is tijdens het lopen te zien. Foto: donkere gel, banden die oplichten onder UV
//  (wit-oranje), lichte uitstrijk ('smear') onder de banden, putjes als donkere streepjes bovenaan; zo ziet een
//  echte gelfoto eruit en zo lees je een DNA-profiel als streepjescode.
//  Maten (≈, minigel): bak ± 25 × 12 × 7 cm, gel ± 7 × 10 cm, putjes 5 mm, ± 8 mm uit elkaar; zwarte kabel = min
//  aan de kant van de putjes, rode kabel = plus.
//  Bekende fouten: DNA naar de min; grootste stukken het verst; banden al zichtbaar vóór het kleuren.
// x, y = midden van de gel (bovenvlak); s = px per mm. o.loop 0..1, o.kleur 0..1, o.foto (bool), o.deksel 0..1,
// o.laantjes (lijsten bp, eerste = marker), o.a. Geeft { putjes, min, plus, banden } terug.
// =====================================================================================
function gelElektroforese(ctx, x, y, s, o = {}) {
  const { a = 1, loop = 0.7, kleur = 0, foto = false, deksel = 0 } = o;
  const lanes = o.laantjes || [[10000, 6000, 4000, 3000, 2000, 1500, 1000, 700, 500, 300], [3000, 1200, 400], [3000, 800, 400], [5000, 1200], [3000, 1200, 400], [2000, 800]];
  const n = lanes.length, gw = 70, gh = 100, pitch = Math.min(9, (gw - 8) / n), putY = -gh / 2 + 10, loopMax = 72, logMin = Math.log10(200), logMax = Math.log10(12000);
  const afst = (bp) => clamp((logMax - Math.log10(bp)) / (logMax - logMin), 0, 1.05) * loopMax * loop;
  const lx = (i) => -((n - 1) / 2) * pitch + i * pitch;
  // schuine projectie: diepte (y in de bak) loopt omhoog-naar-achter
  const pr = (X, Yd, Z) => foto ? [x + X * s, y + Yd * s] : [x + Yd * s, y + (X * 0.45 - Z * 0.9) * s]; // apparaat: lange as horizontaal (min links), diepte schuin naar achter
  const ret = { putjes: lanes.map((_, i) => pr(lx(i), putY, 0)), min: pr(0, -120, 0), plus: pr(0, 120, 0), banden: lanes.map((L, i) => L.map(bp => [...pr(lx(i), putY + afst(bp), 0), bp])) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const poly = (pts, fill, stroke, lw = 1.5) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...pr(...p)) : ctx.moveTo(...pr(...p))); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  if (foto) { // gel in het UV-kastje (transilluminator): kast met UV-plaat (paars), daarop de gekleurde gel met lichtende banden
    { const k0 = pr(-gw / 2 - 22, -gh / 2 - 22, 0), k1 = pr(gw / 2 + 22, gh / 2 + 34, 0); roundRect(ctx, k0[0], k0[1], k1[0] - k0[0], k1[1] - k0[1], 6 * s); shape(ctx, '#2B2F38', '#4A505C', Math.max(1, 0.6 * s));
      const u0 = pr(-gw / 2 - 12, -gh / 2 - 12, 0), u1 = pr(gw / 2 + 12, gh / 2 + 12, 0); ctx.fillStyle = rgba(C.paars, 0.45); ctx.fillRect(u0[0], u0[1], u1[0] - u0[0], u1[1] - u0[1]);
      const kn = pr(gw / 2 + 8, gh / 2 + 24, 0); circ(ctx, kn[0], kn[1], 3 * s, C.paars); }
    poly([[-gw / 2 - 4, -gh / 2 - 4, 0], [gw / 2 + 4, -gh / 2 - 4, 0], [gw / 2 + 4, gh / 2 + 4, 0], [-gw / 2 - 4, gh / 2 + 4, 0]], '#07090C', null);
    poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], '#14171C', null);
    lanes.forEach((L, i) => { const p = pr(lx(i), putY, 0); ctx.fillStyle = '#2A2E35'; ctx.fillRect(p[0] - 2.5 * s, p[1] - 0.6 * s, 5 * s, 1.2 * s);
      L.forEach((bp, j) => { const q = pr(lx(i), putY + afst(bp), 0); const sterk = i === 0 ? (bp === 3000 || bp === 1000 ? 1 : 0.7) : 1;
        ctx.fillStyle = `rgba(255,225,190,${0.12 * sterk})`; ctx.fillRect(q[0] - 2.4 * s, q[1], 4.8 * s, 3.5 * s); // uitstrijk
        ctx.fillStyle = `rgba(255,236,210,${0.55 + 0.4 * sterk})`; roundRect(ctx, q[0] - 2.4 * s, q[1] - 0.6 * s, 4.8 * s, 1.2 * s, 0.6 * s); ctx.fill();
        ctx.fillStyle = `rgba(255,200,150,${0.25 * sterk})`; roundRect(ctx, q[0] - 2.8 * s, q[1] - 1.1 * s, 5.6 * s, 2.2 * s, 1.1 * s); ctx.fill(); }); });
    ctx.restore(); return ret; }
  const BW = 120, BL = 250, BH = 70, kast = '#3A4A66';
  // bak: bodem, achterwand, buffer, gel, voorwand (doorzichtig)
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6]], '#1E2A40', null);
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.12), rgba(C.er, 0.6)); // achterwand
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.10), rgba(C.er, 0.6)); // kopse kant links
  poly([[-BW / 2, -BL / 2, 3], [BW / 2, -BL / 2, 3], [BW / 2, BL / 2, 3], [-BW / 2, BL / 2, 3]], rgba(C.teal, 0.16), null); // bufferoppervlak
  // gel (5 mm dik) met putjes
  poly([[gw / 2, -gh / 2, -5], [gw / 2, gh / 2, -5], [gw / 2, gh / 2, 0], [gw / 2, -gh / 2, 0]], rgba('#E8E4D8', 0.30), null);
  poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], rgba('#E8E4D8', 0.20), rgba('#E8E4D8', 0.55), 1);
  lanes.forEach((L, i) => { poly([[lx(i) - 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY + 0.6, 0], [lx(i) - 2.5, putY + 0.6, 0]], '#121A26', null);
    const band = (yy, d, fill) => poly([[lx(i) - 2.4, yy - d, 0], [lx(i) + 2.4, yy - d, 0], [lx(i) + 2.4, yy + d, 0], [lx(i) - 2.4, yy + d, 0]], fill, null);
    band(putY + afst(150), 1.2, rgba(C.paars, 0.85 * (1 - kleur * 0.6)));
    if (kleur > 0.01) L.forEach(bp => band(putY + afst(bp), 0.6, rgba('#FFD9A0', kleur))); });
  // elektroden (draad langs de korte kanten) + stekkers en kabels
  for (const [Yd, kl] of [[-BL / 2 + 10, '#2B2F38'], [BL / 2 - 10, C.koraal]]) { ctx.strokeStyle = '#C8D0DA'; ctx.lineWidth = Math.max(1, 0.8 * s); ctx.beginPath(); ctx.moveTo(...pr(-BW / 2 + 8, Yd, -BH * 0.5)); ctx.lineTo(...pr(BW / 2 - 8, Yd, -BH * 0.5)); ctx.stroke();
    const st = pr(-BW / 2 + 14, Yd, BH * 0.4 + 6); ctx.fillStyle = kl; ctx.fillRect(st[0] - 4 * s, st[1] - 8 * s, 8 * s, 10 * s); ctx.strokeStyle = kl; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(st[0], st[1] - 8 * s); ctx.bezierCurveTo(st[0] + (Yd < 0 ? -30 : 30) * s, st[1] - 50 * s, st[0] + (Yd < 0 ? -60 : 60) * s, st[1] - 40 * s, st[0] + (Yd < 0 ? -80 : 80) * s, st[1] - 70 * s); ctx.stroke();
    if (kl === '#2B2F38') { ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 0.7 * s; ctx.stroke(); } }
  poly([[-BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [-BW / 2, BL / 2, BH * 0.4]], rgba(C.er, 0.08), rgba(C.er, 0.7)); // kopse kant rechts
  poly([[BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.06), rgba(C.er, 0.7)); // voorwand (doorzichtig)
  if (deksel > 0.01) { ctx.save(); ctx.globalAlpha *= deksel; poly([[-BW / 2 - 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, BL / 2 + 3, BH * 0.4 + 2], [-BW / 2 - 3, BL / 2 + 3, BH * 0.4 + 2]], rgba(C.er, 0.18), C.er); ctx.restore(); }
  ctx.restore(); return ret;
}

// ---- lab/sequencer/C.js
// =====================================================================================
// SEQUENCER (Sanger-methode): kopieën van alle lengtes met een gekleurde stopbase, op lengte gesorteerd in een
// capillair, laser + detector lezen de kleur van de laatste base, het chromatogram groeit piek voor piek.
// Recept (Bio-OER CUNY 'Sanger sequencing of DNA'; OpenStax Biology 2e § 17.2–17.3): een beetje ddNTP (zonder
//  3′-OH) stopt de verlenging; elke ddNTP draagt een eigen fluorescente kleur; zo ontstaan kopieën van elke lengte;
//  capillaire elektroforese sorteert ze, de kortste komen eerst bij de detector; de laser laat de stopbase
//  oplichten; elke piek = één base, de hoogte = hoe zeker de aflezing is. Kleuren (vast in deze reeks, volgt de
//  gangbare kleurcode A groen, C blauw, G geel/zwart, T rood): A groen, C teal, G goud, T koraal.
//  Bekende fouten: alle kopieën even lang; de langste het eerst gelezen; de kleur zit op de eerste base;
//  een piekje per streng in plaats van per lengte.
//  Met o.soort 'ngs': tafelapparaat van de nieuwe generatie met stroomcel en een scherm vol korte reads op een
//  referentie; een variant = een kolom waar (bijna) alle reads dezelfde andere base hebben (boven de kolom de base),
//  een leesfout = één losse afwijking (OpenStax Biology 2e § 17.3 'whole-genome sequencing', ≈ voor de weergave).
// x, y = linksboven van het schema; s = schaal (1 ≈ 1500 × 560 px). o.fase 0..1 (0–0,3 kopieën verschijnen,
// 0,3–1 lopen en lezen), o.seq (gelezen volgorde), o.soort ('sanger' | 'ngs'; bij ngs: x, y = linksonder van het
// apparaat, s = px per cm, o.scherm), o.a. Geeft { kopieen, capillair, laser, chromatogram } (ngs: { apparaat, stroomcel, scherm, variant }) terug.
// =====================================================================================
var SEQ_KLEUR = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
function _seqNgs(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0.7, scherm = false } = o; const K = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
  const ref = 'ATGCCTGAGGTCATTACGGATCCAGT', vPos = 13, vB = 'G';
  const W = 60, H = 52; const P = (px, py) => [x + px * s, y - py * s];
  const sx = scherm ? x : x + 30 * s, sy = scherm ? y - 40 * s : y - 34 * s, sw = scherm ? 60 * s : 26 * s, sh = scherm ? 40 * s : 16 * s;
  const ret = { apparaat: P(W / 2, H / 2), stroomcel: P(12, 22), scherm: [sx + sw / 2, sy + sh / 2], variant: [sx + sw * (vPos + 0.5) / ref.length, sy + sh * 0.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (!scherm) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    roundRect(ctx, 0, -H, W, H, 3); shape(ctx, '#3A4A66', '#5E7194', 0.4); ctx.fillStyle = '#4B5D7E'; ctx.fillRect(0, -H, W, 4);
    roundRect(ctx, 4, -26, 18, 6, 1); shape(ctx, '#0F1828', '#7A8BA8', 0.3); // sleuf stroomcel
    ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(6, -24.5, 14, 3); // stroomcel half in de sleuf
    ctx.fillStyle = '#2B384F'; ctx.fillRect(3, -2, 8, 2); ctx.fillRect(W - 11, -2, 8, 2); ctx.restore(); }
  // scherm met referentie en reads
  roundRect(ctx, sx, sy, sw, sh, Math.max(2, sw * 0.02)); shape(ctx, '#0F1828', '#5A6B88', 1.5);
  const n = ref.length, cw = sw * 0.94 / n, ox = sx + sw * 0.03, refY = sy + sh * 0.88, fs = Math.max(6, cw * 0.8);
  if (cw > 7) ref.split('').forEach((b, i) => text(ctx, b, ox + (i + 0.5) * cw, refY + fs * 0.35, fMeta(fs), b === ref[vPos] && i === vPos ? C.text : C.text2, 'center'));
  else { ctx.fillStyle = C.text2; ctx.fillRect(ox, refY - 1, n * cw, 2); }
  const rows = 9, rh = (sh * 0.78) / rows, toon = Math.round(fase * rows * 3);
  for (let k = 0; k < toon; k++) { const r = k % rows, kol = Math.floor(k / rows); const len = 6 + Math.floor(hash(k * 7 + 1) * 4), st = Math.floor(hash(k * 7 + 2) * (n - len)) ; const yy = sy + sh * 0.06 + r * rh;
    for (let i = st; i < st + len; i++) { let b = ref[i]; if (i === vPos && hash(k * 7 + 3) < 0.85) b = vB; if (i !== vPos && hash(k * 7 + i) < 0.012) b = 'T'; // zeldzame leesfout
      ctx.fillStyle = rgba(K[b], b === ref[i] ? 0.35 : 0.95); ctx.fillRect(ox + i * cw + 0.5, yy + kol * rh * 0.0, cw - 1, rh * 0.7); } }
  if (fase > 0.6) { const fv = Math.max(8, cw * 0.95); text(ctx, vB, ox + (vPos + 0.5) * cw, sy - fv * 0.25, fMeta(fv), K[vB], 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, cw * 0.12); ctx.strokeRect(ox + vPos * cw - 1, sy + sh * 0.04, cw + 2, sh * 0.92); }
  ctx.restore(); return ret;
}
function sequencer(ctx, x, y, s, o = {}) {
  if (o.soort === 'ngs') return _seqNgs(ctx, x, y, s, o);
  const { a = 1, fase = 0.6 } = o; const seq = (o.seq || 'GATTACAGCTAG').slice(0, 14), n = seq.length;
  const maakF = clamp(fase / 0.3, 0, 1), loopF = clamp((fase - 0.3) / 0.7, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { kopieen: P(230, 280), capillair: P(760, 280), laser: P(760, 470), chromatogram: P(1200, 300) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  // 1. kopieën van elke lengte (matrijs paars, nieuwe streng lichtpaars, gekleurde stopbase)
  const nt = 26, y0 = 40;
  for (let i = 0; i < n; i++) { const al = clamp(maakF * n - i, 0, 1); if (al <= 0) continue; const yy = y0 + i * 36;
    ctx.save(); ctx.globalAlpha *= al * (1 - 0.7 * loopF); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(20, yy); ctx.lineTo(20 + (i + 1) * nt, yy); ctx.stroke();
    ctx.fillStyle = SEQ_KLEUR[seq[i]]; ctx.beginPath(); ctx.arc(20 + (i + 1) * nt + 6, yy, 9, 0, 6.283); ctx.fill(); ctx.restore(); }
  // 2. capillair (verticaal), fragmenten lopen naar beneden; kortste het verst
  const cx = 760, cTop = 30, cBot = 470; ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.strokeRect(cx - 14, cTop, 28, cBot - cTop + 60); ctx.fillStyle = rgba(C.er, 0.08); ctx.fillRect(cx - 14, cTop, 28, cBot - cTop + 60);
  ctx.fillStyle = '#2B2F38'; ctx.fillRect(cx - 40, cTop - 18, 80, 14); // min-kant
  let gelezen = 0;
  for (let i = 0; i < n; i++) { const snel = 1.9 - i * 0.07, pos = cTop + 20 + loopF * snel * 520; if (pos > cBot + 10) { gelezen = Math.max(gelezen, i + 1); continue; }
    if (loopF > 0) { ctx.fillStyle = rgba(SEQ_KLEUR[seq[i]], 0.9); roundRect(ctx, cx - 10, pos - 3, 20, 6, 3); ctx.fill(); } }
  // laser + detector
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx - 140, cBot); ctx.lineTo(cx + 30, cBot); ctx.stroke(); roundRect(ctx, cx - 230, cBot - 34, 90, 68, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx - 140, cBot, 7, C.koraal); // laser
  roundRect(ctx, cx + 30, cBot - 40, 100, 80, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx + 60, cBot, 20, '#0F1828', '#7A8BA8', 3); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 130, cBot); ctx.lineTo(cx + 200, cBot - 40); ctx.stroke(); // detector, signaal naar het chromatogram
  const nu = gelezen < n ? (cTop + 20 + loopF * (1.9 - gelezen * 0.07) * 520) : 0; if (gelezen < n && Math.abs(nu - cBot) < 22 && loopF > 0) circ(ctx, cx, cBot, 16, rgba(SEQ_KLEUR[seq[gelezen]], 0.6));
  // 3. chromatogram: piek per gelezen base
  const gx = 960, gw = 520, gy = 470, gh = 360; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  const dx = gw / (n + 1); for (const b of 'ACGT') { ctx.strokeStyle = SEQ_KLEUR[b]; ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= gw; px += 2) { let v = 0; for (let i = 0; i < gelezen; i++) if (seq[i] === b) { const h = 0.65 + 0.3 * hash(i * 3 + 1); v += h * Math.exp(-Math.pow((px - dx * (i + 1)) / (dx * 0.22), 2)); } const yy = gy - v * gh * 0.85; px ? ctx.lineTo(gx + px, yy) : ctx.moveTo(gx, yy); } ctx.stroke(); }
  for (let i = 0; i < gelezen; i++) text(ctx, seq[i], gx + dx * (i + 1), gy - gh - 8, fMeta(30), SEQ_KLEUR[seq[i]], 'center');
  ctx.restore(); return ret;
}

// ---- lab/plasmideKnipPlak/C.js
// =====================================================================================
// PLASMIDE KNIPPEN EN PLAKKEN (recombinant DNA), ringaanzicht. Uitbreiding van plasmideRing (lib_micro_evo.js):
// zelfde ring van dubbelstrengs DNA met een resistentiegen in oker, maar nu als proces in vier stappen.
// Recept (OpenStax Biology 2e § 17.1; EcoRI: herkenningsplek G↓AATTC, homodimeer, 5′-overhang AATT):
//  stap 0 → 1 knippen: het restrictie-enzym knipt beide strengen verspringend (zigzag), de ring gaat open; aan elk
//    uiteinde steekt één streng 4 basen uit (plakkerig uiteinde, AATT);
//  stap 1 → 2 plakken: het gen (goud, met dezelfde plakkerige uiteinden want met hetzelfde enzym geknipt) schuift
//    in de opening; de uitstekende basen passen op elkaar;
//  stap 2 → 3 ligase: twee kleine eiwitkluwens sluiten de naden in de ruggengraat (fosfodiësterbinding);
//  stap 3 → 4 terug in de bacterie: de ring krimpt tot ± 1/4 van de bacteriebreedte en ligt helemaal binnen het
//    membraan (Beeldafspraken: niets steekt buiten het celmembraan).
//  Het resistentiegen (oker) blijft op de ring: daarmee selecteer je de bacteriën die het plasmide opnamen.
//  Echte maat: plasmide 2–200 kb; een bacterie ± 2 µm lang. Altijd 'vergroot'.
//  Enzymen in het gedeelde lintmodel (_grKluwen): EcoRI als twee gelijke helften op de knipplek, ligase (groengrijs) op
//  elke naad; een vergrootcirkel toont dan de basen in puzzelvorm met de uitstekende AATT en TTAA (goud omrand).
//  Bekende fouten: recht knippen (stompe uiteinden) bij EcoRI; gen met andere uiteinden dan de opening;
//  plasmide dat buiten de bacterie uitsteekt; schaar-icoon in plaats van een enzym.
// x, y = midden; r = straal van de ring in px. o.stap 0..4, o.letters (AATT bij grote ring, standaard aan als r ≥ 110),
// o.a, o.t. Geeft { knip, gen, resistentie, naden:[[x,y],[x,y]], bacterie } terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}

function plasmideKnipPlak(ctx, x, y, r, o = {}) {
  const { a = 1, stap = 0, t = 0 } = o; const st = clamp(stap, 0, 4);
  const knip = clamp(st, 0, 1), plak = clamp(st - 1, 0, 1), lig = clamp(st - 2, 0, 1), terug = clamp(st - 3, 0, 1);
  const top = -Math.PI / 2, genHoek = 0.62; // opening die het gen vult (rad)
  const R = lerp(r, r * 0.42, ease(terug)), cy = y, w = Math.max(3, R * 0.11), stapR = Math.max(0.06, 9 / R); // sporten ± 9 px uit elkaar
  const ksc = R / 150;
  const halve = lerp(0.02, genHoek / 2, ease(knip)) * (st >= 1 ? 1 : 1), over = 4 * 0.055; // overhang = 4 basen (hoek)
  const ret = { knip: [x, cy - R], gen: [x, cy - R - (1 - ease(plak)) * R * 0.9], resistentie: [x + Math.cos(0.6) * R, cy + Math.sin(0.6) * R], naden: [], bacterie: [x, cy] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // bacterie (stap 3–4): staafvorm met wand en membraan; de ring ligt erbinnen
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= ease(terug); const bl = r * 2.6, bh = r * 1.25;
    const caps = (ww, hh) => { ctx.beginPath(); roundRect(ctx, x - ww / 2, cy - hh / 2, ww, hh, hh / 2); };
    caps(bl + 14, bh + 14); shape(ctx, rgba(C.oker, 0.22), rgba(C.oker, 0.8), 3); caps(bl, bh); shape(ctx, (C.bgSchema === '#FFFFFF' ? '#EEF2F7' : '#22314D'), rgba('#D8C9A8', 0.75), 2);
    ctx.strokeStyle = rgba(C.paars, 0.45); ctx.lineWidth = 2; const ch = []; for (let k = 0; k < 14; k++) { const u = k / 14 * 6.283; ch.push([x - bl * 0.28 + Math.cos(u) * bl * 0.12 + (hash(k + 5) - 0.5) * bl * 0.07, cy + Math.sin(u) * bh * 0.26 + (hash(k + 11) - 0.5) * bh * 0.12]); } ctx.beginPath(); bioPad(ctx, ch, true); ctx.stroke(); // chromosoom (losse lus, ingekort)
    ctx.restore(); }
  const strengArc = (rr, a0, a1, kleur, bw) => { if (a1 <= a0) return; ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.beginPath(); ctx.arc(x, cy, rr, a0, a1); ctx.stroke(); };
  const sporten = (a0, a1, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * (R - w * 1.2), cy + Math.sin(th) * (R - w * 1.2)); ctx.lineTo(x + Math.cos(th) * (R + w * 1.2), cy + Math.sin(th) * (R + w * 1.2)); ctx.stroke(); } };
  const halfSpoor = (a0, a1, buiten, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { const r0 = buiten ? R : R - w * 1.2, r1 = buiten ? R + w * 1.2 : R; ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * r0, cy + Math.sin(th) * r0); ctx.lineTo(x + Math.cos(th) * r1, cy + Math.sin(th) * r1); ctx.stroke(); } };
  // ring: van rechts van de opening rond tot links van de opening; buitenstreng loopt 4 basen verder dan de binnenstreng (zigzag)
  const aR = top + halve, aL = top - halve + Math.PI * 2, dO = knip > 0.02 ? over * 0.5 : 0;
  const binnen0 = aR + dO, binnen1 = aL + dO, buiten0 = aR - dO, buiten1 = aL - dO; // verspringend
  sporten(Math.max(binnen0, buiten0), Math.min(binnen1, buiten1), rgba(D2.oudR, 0.85));
  if (knip > 0.02) { halfSpoor(buiten0, binnen0, true, rgba(C.goud, 0.9)); halfSpoor(buiten1, binnen1, false, rgba(C.goud, 0.9)); }
  strengArc(R + w * 1.2, buiten0, buiten1, D2.oud, w); strengArc(R - w * 1.2, binnen0, binnen1, D2.oud, w);
  strengArc(R + w * 1.2, 0.0, 1.2, C.oker, w * 1.15); strengArc(R - w * 1.2, 0.0, 1.2, C.oker, w * 1.15); // resistentiegen
  // gen met dezelfde plakkerige uiteinden: daalt in de opening
  if (st > 1.0 || (st > 0.6)) { const ga = clamp((st - 0.6) / 0.4, 0, 1) * (st < 1 ? 1 : 1); const zak = (1 - ease(plak)) * R * 0.9;
    ctx.save(); ctx.globalAlpha *= st < 1 ? clamp((st - 0.6) / 0.4, 0, 1) : 1; ctx.translate(0, -zak);
    const g0 = top - genHoek / 2, g1 = top + genHoek / 2; const gb0 = g0 - dO, gb1 = g1 - dO, gi0 = g0 + dO, gi1 = g1 + dO; // past op de opening
    // gen-uiteinden: buitenstreng steekt links uit, binnenstreng rechts (complementair aan de ring)
    sporten(Math.max(gb0, gi0), Math.min(gb1, gi1), rgba(lighten(C.goud, 0.3), 0.7));
    strengArc(R + w * 1.2, g0 - dO, g1 - dO, C.goud, w); strengArc(R - w * 1.2, g0 + dO, g1 + dO, C.goud, w);
    halfSpoor(g0 - dO, g0 + dO, true, rgba(C.goud, 0.9)); halfSpoor(g1 - dO, g1 + dO, false, rgba(C.goud, 0.9));
    ctx.restore(); }
  // letters AATT op de overhang (alleen bij een grote ring en zolang het gen er nog niet in zit)
  const letters = o.letters != null ? o.letters : R >= 110; if (letters && knip > 0.6 && plak < 0.5) { const fs = Math.max(16, R * 0.13);
    'AATT'.split('').forEach((b, i) => { const th1 = buiten0 + stapR * (i + 0.5) * 0.98, th2 = buiten1 + stapR * (i + 0.5) * 1.7 - stapR * 1.2;
      text(ctx, b, x + Math.cos(th1) * (R + w * 2.6 + 46 * ksc), cy + Math.sin(th1) * (R + w * 2.6 + 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center');
      text(ctx, 'TTAA'[i], x + Math.cos(th2) * (R - w * 2.6 - 46 * ksc), cy + Math.sin(th2) * (R - w * 2.6 - 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center'); }); }
  // EcoRI (lintmodel, twee gelijke helften aan weerszijden van de dubbelstreng) op de knipplek tijdens het knippen
  const top0 = [x, cy - R];
  if (st > 0.02 && st < 1.25) { const ea = st < 1 ? 0.35 + 0.65 * Math.sin(Math.min(1, knip * 1.4) * Math.PI / 2) : 1 - (st - 1) / 0.25;
    [[1, C.enzym, 0], [-1, '#8A7FA8', Math.PI]].forEach(([sg, kl2, rot]) => _grKluwen(ctx, top0[0], top0[1] - sg * (w * 2.4 + 22 * ksc), (px, py) => (px / 40) ** 2 + (py / 17) ** 2 < 1, { r: 2.8, sc: ksc, col: kl2, seed: 4, bbox: [-40, -17, 40, 17], key: 'pkEco', rot, a: clamp(ea, 0, 1) })); }
  // ligase (lintmodel, eigen tint) komt bij het plakken op elk van de twee naden en sluit de ruggengraat
  if (st >= 1.7 && st < 3.4) { const la = st < 2 ? (st - 1.7) / 0.3 : st < 3 ? 1 : 1 - (st - 3) / 0.4; [top - genHoek / 2, top + genHoek / 2].forEach((th, i) => { const px = x + Math.cos(th) * (R + w * 2.6 + 20 * ksc), py = cy + Math.sin(th) * (R + w * 2.6 + 20 * ksc); ret.naden.push([px, py]);
      _grKluwen(ctx, px, py, (qx, qy) => (qx / 26) ** 2 + (qy / 19) ** 2 < 1, { r: 2.8, sc: ksc, col: '#6E9A8C', seed: 6 + i, bbox: [-26, -19, 26, 19], key: 'pkLig', rot: th + Math.PI / 2, a: clamp(la, 0, 1), fold: st < 2 ? 0.6 + 0.4 * clamp((st - 1.7) / 0.3, 0, 1) : 1 });
      if (lig > 0.05 && lig < 0.95) { ctx.save(); ctx.globalAlpha *= Math.sin(lig * Math.PI); circ(ctx, x + Math.cos(th) * R, cy + Math.sin(th) * R, w * 2.2, null, C.goud, 2); ctx.restore(); } }); }
  // vergrootcirkel met de basen in puzzelvorm op het moment dat de uitsteeksels zichtbaar zijn
  const zA = st < 0.6 ? 0 : st < 0.75 ? (st - 0.6) / 0.15 : st < 1.5 ? 1 : st < 1.7 ? (1.7 - st) / 0.2 : 0;
  if (zA > 0.01 && R >= 110) { const zx = x + R * 1.38, zy = cy - R * 0.72, zr = R * 0.66; ctx.save(); ctx.globalAlpha *= zA;
    ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x + R * 0.1, cy - R * 1.0); ctx.lineTo(zx - zr, zy); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); shape(ctx, C.bgMicro, C.goud, 2.5); ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr - 2, 0, 6.283); ctx.clip();
    const bpz = zr * 0.16, Lz = zr * 0.22, hwz = bpz * 0.34, comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, gapz = (st >= 1 ? lerp(1.6, 0.4, clamp(st - 1, 0, 0.5) * 2) : 1.6 * clamp((st - 0.6) / 0.3, 0, 1)) * bpz;
    const kx = (k) => zx + (k - 7.3) * bpz, yT2 = zy - Lz, yB2 = zy + Lz; const L1 = 'TCAG', R1 = 'AATTCG';
    const rug = (x0, x1, yy) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bpz * 0.3); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); };
    rug(kx(2) - bpz, kx(5) + bpz * 0.4, yT2); rug(kx(2) - bpz, kx(9) + bpz * 0.4, yB2); rug(kx(6) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yT2); rug(kx(10) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yB2);
    L1.split('').forEach((bb, i) => { d2Base(ctx, kx(2 + i), yT2, Math.PI / 2, bb, Lz, hwz); d2Base(ctx, kx(2 + i), yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    'TTAA'.split('').forEach((bb, i) => d2Base(ctx, kx(6 + i), yB2, -Math.PI / 2, bb, Lz, hwz, { rand: C.goud }));
    R1.split('').forEach((bb, i) => { d2Base(ctx, kx(6 + i) + gapz, yT2, Math.PI / 2, bb, Lz, hwz, { rand: i < 4 ? C.goud : null }); if (i >= 4) d2Base(ctx, kx(6 + i) + gapz, yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    ctx.restore(); ctx.restore(); }
  ctx.restore(); return ret;
}

// ---- lab/crisprCas9/C.js
// =====================================================================================
// CRISPR-CAS9 (lintmodel) met gids-RNA dat een doelplek in het DNA zoekt, opent en beide strengen knipt; daarna reparatie.
// Recept (RCSB PDB 4OO8: Cas9 van Streptococcus pyogenes, 1 372 aminozuren, 'bilobed architecture': een
//  herkenningslob en een nucleaselob; het gids-RNA–DNA-duplex ligt in een geladen groef tussen de twee lobben;
//  HNH knipt de streng die met de gids paart, RuvC de andere; een domein aan de C-kant herkent de PAM;
//  Jinek e.a. 2012: PAM = NGG, stompe knip 3 bp vóór de PAM). Maten: Cas9 ± 10 nm, DNA 2 nm breed, 0,34 nm per
//  basepaar, dus het eiwit omvat ± 30 bp; de spacer van het gids-RNA is 20 nt. Stappen: o.stap 0–1 zoeken (schuift
//  langs het DNA), 1–2 PAM (goud omrand), 2–3 openen (R-lus: gids paart vanaf de PAM met de doelstreng, de andere
//  streng buigt weg) en knippen (2,75–3), 3–4 Cas9 laat los, reparatie: 'uit' = kleine fout bij het plakken
//  (koraal, gen kapot) of 'nieuw' = een nieuw stuk (goud) ertussen.
//  Eiwit = één gevouwen keten in het gedeelde lintmodel (_grKluwen: buis, helices als spiraal, β-strengen als pijl).
//  Cas9 KLEMT om het DNA: de herkenningslob ligt achter/boven, de nucleaselob achter/onder, en het PAM-domein loopt
//  vóór het DNA langs naast de PAM (brug). Gids-RNA in teal: los als slap draadje in de herkenningslob; in de R-lus
//  liggen zijn 20 basen (puzzelvorm, U in plaats van T) precies op de doelstreng, de andere streng buigt omhoog weg.
//  Bekende fouten: Cas9 als schaar; één streng geknipt; knip in de PAM; gids-RNA dat paart met beide strengen.
// x, y = midden van de doelplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..4, o.reparatie,
// o.t, o.a. Geeft { cas9, pam, knip, gids, rec, nuc } terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}

function crisprCas9(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 0, t = 0, reparatie = 'uit' } = o; const st = clamp(stap, 0, 4);
  const zoek = clamp(st, 0, 1), pam = clamp(st - 1, 0, 1), open = clamp(st - 2, 0, 1), knip = clamp((st - 2.75) / 0.25, 0, 1), rep = clamp(st - 3, 0, 1);
  const bp = 3.4, L = 10, nTot = 44, i0 = -14; // basen −14 … 29; doelplek 0–19, PAM 20–22 (NGG op de bovenstreng)
  const X = (i) => x + (i - 10) * bp * s, yT = y - L * s, yB = y + L * s;
  const seqT = 'TTCAGGACTACCGAGTTCATGGTACAGCTTGGAGCCGATTCAGT', comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const casX = lerp(-150, 0, ease(zoek)) * s * (st < 1 ? 1 : 0) + x, casY = y - lerp(0, 50, ease(rep)) * s, casA = 1 - ease(rep) * 0.9;
  const knipI = 16.5; // knip 3 bp vóór de PAM: stompe knip in beide strengen (HNH: doelstreng, RuvC: andere streng)
  const uit = ease(rep) * 1.6 * bp * s; // na de knip wijken de uiteinden even uiteen
  const ret = { cas9: [casX, casY], pam: [X(21), yT - L * s * 1.4], knip: [X(knipI), y], gids: [X(6), yB + L * s * 1.6], rec: [casX, y - 75 * s], nuc: [casX, y + 72 * s] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // Cas9 achter het DNA: herkenningslob (boven) en nucleaselob (onder) als gevouwen keten; de groef ertussen blijft vrij
  const lob = (bb, ry, kl, seed, key) => _grKluwen(ctx, casX, casY, (px, py) => (px / 64) * (px / 64) + (py / ry) * (py / ry) < 1 && (py < -52 || py > 17), { r: 3.2, sc: s, col: kl, seed, bbox: bb, key, a: casA * 0.95 });
  lob([-64, -96, 64, -52], 96, '#8E9FBC', 3, 'casREC'); lob([-64, 17, 64, 58], 58, C.enzym, 5, 'casNUC');
  const hw = bp * s * 0.34, ruggW = Math.max(2.5, bp * s * 0.35);
  // DNA: bovenstreng (5′→3′, met PAM) en doelstreng. In de open stand buigt de bovenstreng omhoog weg (R-lus).
  const bol = (i) => (i >= 0 && i <= 19) ? Math.sin(clamp((i + 0.5) / 20, 0, 1) * Math.PI) * 0 + (open > 0 ? ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (1 - ease(rep)) : 0) : 0;
  const yTop = (i) => yT - bol(i) * L * s * 3.8 * Math.sin(clamp((i + 1) / 21, 0, 1) * Math.PI) ;
  const dx = (i) => (i > knipI ? uit : 0) * (rep > 0 ? 1 : 0);
  const ins = reparatie === 'nieuw' && rep > 0.5 ? 6 : 0; const insA = clamp((rep - 0.5) / 0.5, 0, 1);
  // ruggengraten
  const rug = (yfn, kl, from, to) => { ctx.strokeStyle = kl; ctx.lineWidth = ruggW; ctx.beginPath(); for (let i = from; i <= to; i += 0.25) { const xx = X(i) + dx(i), yy = yfn(i); i === from ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); };
  const brk = knip > 0.5 ? knipI : 99;
  rug(yTop, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(yTop, D2.oud, brk + 0.15, nTot + i0 - 1);
  rug(() => yB, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(() => yB, D2.oud, brk + 0.15, nTot + i0 - 1);
  for (let i = i0; i < i0 + nTot; i++) { const b = seqT[i - i0], xx = X(i) + dx(i), gepaard = bol(i) < 0.2;
    const isPam = i >= 20 && i <= 22; const rand = isPam && pam > 0.3 ? C.goud : null;
    d2Base(ctx, xx, yTop(i), gepaard ? Math.PI / 2 : -Math.PI / 2 * 0 + Math.PI / 2 - bol(i) * Math.PI, b, L * s, hw, { rand, letter: s >= 2.2 });
    d2Base(ctx, xx, yB, -Math.PI / 2, comp[b], L * s, hw, { letter: s >= 2.2 }); }
  // reparatie: 'uit' = kleine deletie (koraal merkteken op de naad), 'nieuw' = goud stuk ertussen
  if (rep > 0.5 && reparatie === 'nieuw') { ctx.save(); ctx.globalAlpha *= insA; ctx.strokeStyle = C.goud; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (rep > 0.5 && reparatie === 'uit') { ctx.save(); ctx.globalAlpha *= clamp((rep - 0.5) / 0.5, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (knip > 0.01 && rep < 0.6) { ctx.save(); ctx.globalAlpha *= Math.sin(knip * Math.PI) * 0.7 + (knip >= 1 ? 0.3 * (1 - rep / 0.6) : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const yy of [yT, yB]) { ctx.beginPath(); ctx.arc(X(knipI), yy, 7 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  // gids-RNA: vóór het openen een slap draadje in de herkenningslob; in de R-lus 20 RNA-basen op de doelstreng (paren)
  ctx.save(); ctx.globalAlpha *= casA; const gx0 = casX - 10 * bp * s, rnaK = D2.rna || C.teal, uB = (b) => b === 'T' ? 'U' : b;
  const gp = []; for (let i = 0; i <= 19; i++) { const gep = ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (rep > 0.2 ? 0 : 1); gp.push([gx0 + i * bp * s, lerp(casY - 62 * s + Math.sin(i * 0.8 + t) * 3 * s, yT, gep), gep]); }
  ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, gp.map(p => [p[0], p[1]]), false); ctx.stroke();
  gp.forEach((p, i) => { if (p[2] > 0.5) d2Base(ctx, p[0], p[1], Math.PI / 2, uB(seqT[i - i0]), L * s, hw, { rna: true, letter: s >= 2.2, a: (p[2] - 0.5) * 2 });
    else if (s >= 2) { ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0], p[1] + 5 * s); ctx.stroke(); } });
  const e = gp[19]; ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, [[e[0], e[1]], [e[0] + 10 * s, e[1] - 16 * s], [e[0] + 2 * s, casY - 66 * s], [e[0] - 20 * s, casY - 76 * s], [e[0] - 6 * s, casY - 88 * s], [e[0] + 18 * s, casY - 80 * s], [e[0] + 24 * s, casY - 60 * s]], false); ctx.stroke(); // steiger met haarspelden
  ctx.restore();
  // PAM-domein vóór het DNA langs (brug die de klem sluit), naast de PAM; actieve plekken HNH (onder) en RuvC (boven) goud
  _grKluwen(ctx, casX, casY, (px, py) => ((px - 57) / 13) ** 2 + ((py + 12) / 50) ** 2 < 1, { r: 3.2, sc: s, col: '#6E8FA8', seed: 7, bbox: [44, -62, 70, 38], key: 'casPI', a: casA * 0.9 });
  [[casX + (knipI - 10) * bp * s, casY + 22 * s], [casX + (knipI - 10) * bp * s, casY - 56 * s]].forEach(p => { ctx.save(); ctx.globalAlpha *= casA; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 3.5 * s, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.restore(); return ret;
}

// ---- lab/restrictieEnzym/C.js
// =====================================================================================
// RESTRICTIE-ENZYM (EcoRI), lintmodel: eiwit dat langs het DNA glijdt, de herkenningsplek GAATTC vindt, zich vastklemt en
// beide strengen verspringend knipt, zodat er plakkerige uiteinden (AATT) ontstaan.
// Recept (OpenStax Biology 2e § 17.1: restrictie-enzymen herkennen een vaste volgorde en knippen voorspelbaar, vaak
//  verspringend → plakkerige uiteinden die met complementaire uiteinden kunnen paren; EcoRI: G↓AATTC, homodimeer
//  van twee gelijke ketens van ± 31 kDa, 5′-overhang AATT). De plek is een palindroom: beide strengen lezen van
//  5′ naar 3′ GAATTC, daarom past één symmetrisch dimeer en knipt elke helft één streng op dezelfde plek in zijn
//  eigen leesrichting. Maten: elk eiwitdeel ± 5 nm, DNA 2 nm breed, 0,34 nm per basepaar.
//  Stappen: o.stap 0–1 glijden, 1–2 herkennen en klemmen (plek goud omrand), 2–2,5 knippen (zigzag),
//  2,5–3 loslaten, uiteinden wijken uiteen.
//  Eiwit = gevouwen keten in het gedeelde lintmodel (_grKluwen), géén schaar-icoon. Het dimeer KLEMT om het DNA: elke
//  helft ligt aan één kant van de dubbelstreng en steekt met een arm vóór het DNA langs naar de andere kant
//  (de armen grijpen pas als de plek herkend is). Na het knippen wijken de stukken ± 3 bp uiteen, zodat de
//  uitstekende AATT (boven, rechts) en TTAA (onder, links) als losse basen te zien zijn. Een DNA-schaar alleen als metafoor in tekst.
//  Bekende fouten: rechte knip; één streng geknipt; enzym als schaar; uitsteeksels die niet AATT/TTAA zijn.
// x, y = midden van de herkenningsplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..3,
// o.t, o.a. Geeft { enzym, site, knipBoven, knipOnder } terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
var _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}

function restrictieEnzym(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 1, t = 0 } = o; const st = clamp(stap, 0, 3);
  const glij = clamp(st, 0, 1), klem = clamp(st - 1, 0, 1), knip = clamp((st - 2) / 0.5, 0, 1), los = clamp((st - 2.5) / 0.5, 0, 1);
  const bp = 3.4, L = 10, seq = 'TACCTGCAGTCGAATTCTAGCCATGGTA', iSite = 10, n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const X = (i) => x + (i - iSite - 2.5) * bp * s, yT = y - L * s, yB = y + L * s;
  const ex = x + lerp(-110, 0, ease(glij)) * s + Math.sin(t * 3) * (glij < 1 ? 2 * s : 0), ey = y, weg = ease(los) * 16 * s, ea = 1 - ease(los) * 0.8, dicht = lerp(14, 0, ease(klem)) * s;
  const uit = ease(los) * 3.4 * bp * s; const dxT = (i) => (knip >= 1 && i >= iSite + 1 ? uit : 0), dxB = (i) => (knip >= 1 && i >= iSite + 5 ? uit : 0);
  const ret = { enzym: [ex, ey], site: [X(iSite + 2.5), y], knipBoven: [X(iSite + 0.5), yT], knipOnder: [X(iSite + 4.5), yB] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // twee gelijke helften achter het DNA (boven en, puntgespiegeld, onder)
  const D = dicht + weg, kleur = [C.enzym, '#8A7FA8'];
  [1, -1].forEach((sg, k) => _grKluwen(ctx, ex, y - sg * (33 * s + D), (px, py) => (px / 42) ** 2 + (py / 21) ** 2 < 1, { r: 3, sc: s, col: kleur[k], seed: 4, bbox: [-42, -21, 42, 21], key: 'reeSub', rot: sg > 0 ? 0 : Math.PI, a: ea }));
  const hw = bp * s * 0.34, rw = Math.max(2.5, bp * s * 0.35), herken = klem > 0.3;
  const rug = (yy, i0, i1, dxf) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = rw; ctx.beginPath(); ctx.moveTo(X(i0) - bp * s * 0.45 + dxf(i0), yy); ctx.lineTo(X(i1) + bp * s * 0.45 + dxf(i1), yy); ctx.stroke(); };
  if (knip >= 1) { rug(yT, 0, iSite, dxT); rug(yT, iSite + 1, n - 1, dxT); rug(yB, 0, iSite + 4, dxB); rug(yB, iSite + 5, n - 1, dxB); }
  else { rug(yT, 0, n - 1, dxT); rug(yB, 0, n - 1, dxB); }
  for (let i = 0; i < n; i++) { const inSite = i >= iSite && i < iSite + 6; const rand = inSite && herken ? C.goud : null;
    d2Base(ctx, X(i) + dxT(i), yT, Math.PI / 2, seq[i], L * s, hw, { rand, letter: s >= 2.5 }); d2Base(ctx, X(i) + dxB(i), yB, -Math.PI / 2, comp[seq[i]], L * s, hw, { rand, letter: s >= 2.5 }); }
  // de zigzag-knip oplichten
  if (knip > 0.01 && los < 0.7) { ctx.save(); ctx.globalAlpha *= (knip < 1 ? knip : 1 - los / 0.7); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 1.2 * s); ctx.setLineDash([4 * s, 3 * s]); ctx.beginPath(); ctx.moveTo(X(iSite + 0.5), yT - L * s * 0.6); ctx.lineTo(X(iSite + 0.5), y); ctx.lineTo(X(iSite + 4.5), y); ctx.lineTo(X(iSite + 4.5), yB + L * s * 0.6); ctx.stroke(); ctx.restore(); }
  // armen vóór het DNA langs (sluiten de klem zodra de plek herkend is) + actieve plekken (goud) bij de twee knipplekken
  const armA = ea * ease(clamp(klem * 1.5, 0, 1)) * (1 - ease(los));
  if (armA > 0.01) [1, -1].forEach((sg, k) => _grKluwen(ctx, ex - sg * 38 * s, y - sg * 6 * s, (px, py) => (px / 8) ** 2 + (py / 34) ** 2 < 1, { r: 3, sc: s, col: kleur[k], seed: 9, bbox: [-8, -34, 8, 34], key: 'reeArm', rot: sg > 0 ? 0 : Math.PI, a: armA }));
  if (herken) { ctx.save(); ctx.globalAlpha *= ea; ctx.fillStyle = C.goud; for (const [px, py] of [[X(iSite + 0.5), yT - 9 * s], [X(iSite + 4.5), yB + 9 * s]]) { ctx.beginPath(); ctx.arc(px + (ex - x), py + (py < y ? -1 : 1) * weg, 3.5 * s, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); return ret;
}


const _DONKER = Object.assign({}, C), _LICHT = Object.assign({}, C, {"bgMicro": "#F4F6FA", "bgSchema": "#FFFFFF", "fill": "#E9EDF3", "kast": "#DDE3EC", "text": "#121C2E", "text2": "#4E5A6C", "line": "#6B7687", "grain": "#8A7A5A", "goud": "#C9961F", "koraal": "#C0583A", "groen": "#2F8A47", "teal": "#25729C", "paars": "#6550AD", "oker": "#A8822E", "mens": "#6B7687"});
window.BB = { uvSchade, transcriptiefactor, lacOperon, methylgroep, nucleosoomAcetyl, mrnaSliert, rnaPolymerase, thermocycler, primerStuk, gelElektroforese, sequencer, plasmideKnipPlak, crisprCas9, restrictieEnzym, C,
  thema(licht) { Object.assign(C, licht ? _LICHT : _DONKER); } };
})();