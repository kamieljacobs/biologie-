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
    for(let i=0;i<1400;i++){ const x=hash(i*2)*W, y=hash(i*2+1)*H; if(y>CAPTION_Y-20) continue;
      g.fillStyle=rgba(C.grain,0.06+0.08*hash(i*5)); g.beginPath(); g.arc(x,y,0.8+1.2*hash(i*9),0,6.283); g.fill(); }
  }
  ctx.drawImage(grainCanvas,0,0);
}
function bg(ctx, look){
  ctx.fillStyle = look==='micro'?C.bgMicro: look==='macro'?C.bgMacroSky : C.bgSchema;
  ctx.fillRect(0,0,W,H);
  if(look==='micro') grain(ctx);
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
