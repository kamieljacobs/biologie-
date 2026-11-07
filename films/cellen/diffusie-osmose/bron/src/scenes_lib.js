// Film: Diffusie, osmose en membraantransport (Cel 1/3). Scene helpers.
// Versie 2.0 (29 okt 2026): moleculen, membranen en transporteiwitten staan in scenes_mol.js en komen uit de beeldbank (lib_bio_deel.js).
// Colour meaning in this film: goud = kleurstof (focus), teal = water en zuurstof, koraal = energie/ATP,
// groen = conclusie/celwand, grijs (text2) = koolstofdioxide, oker = glucose/mineralen/Na⁺, grijsblauw = Cl⁻, groen = K⁺, paars alleen voor de vwo-balk.

C.bloed='#C2453E'; C.bloedR='#E07A6A'; // zelfde als BIO.bloed in de beeldbank
const DUR=(id)=>{ const s=(window.FILMDATA.segments||[]).find(x=>x.id===id); return s&&s.dur||0; };

// ===== deterministic particle simulation (precomputed once, seekable) =====
function rng(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)|0; let t=Math.imul(a^(a>>>15),1|a); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; }; }
function gauss(r){ const u=Math.max(1e-9,r()), v=r(); return Math.sqrt(-2*Math.log(u))*Math.cos(6.2832*v); }
const _sims={};
// box:[x0,y0,x1,y1]; init(i,r)->[x,y]; sigma: number or fn(t,i); keep: velocity persistence (smooth paths);
// wall: {x, pass(i,y)->bool} vertical wall that particles may only cross where pass() is true
function sim(key,o){
  if(_sims[key]) return _sims[key];
  const n=o.n, [x0,y0,x1,y1]=o.box, fps=o.fps||20, dur=o.dur||60, keep=o.keep==null?0.8:o.keep, F=Math.ceil(dur*fps)+2;
  const P=new Float32Array(n*F*2), r=rng(o.seed||7), vx=new Float32Array(n), vy=new Float32Array(n), px=new Float32Array(n), py=new Float32Array(n);
  for(let i=0;i<n;i++){ const p=o.init(i,r); px[i]=p[0]; py[i]=p[1]; }
  for(let f=0;f<F;f++){ const t=f/fps;
    for(let i=0;i<n;i++){ const k=(f*n+i)*2; P[k]=px[i]; P[k+1]=py[i];
      const s=typeof o.sigma==='function'? o.sigma(t,i): o.sigma;
      vx[i]=keep*vx[i]+s*gauss(r); vy[i]=keep*vy[i]+s*gauss(r);
      let nx=px[i]+vx[i], ny=py[i]+vy[i];
      if(nx<x0){ nx=2*x0-nx; vx[i]=-vx[i]; } if(nx>x1){ nx=2*x1-nx; vx[i]=-vx[i]; }
      if(ny<y0){ ny=2*y0-ny; vy[i]=-vy[i]; } if(ny>y1){ ny=2*y1-ny; vy[i]=-vy[i]; }
      nx=clamp(nx,x0,x1); ny=clamp(ny,y0,y1);
      if(o.wall){ const w=o.wall; if((px[i]-w.x)*(nx-w.x)<0 && !w.pass(i,(py[i]+ny)/2)){ nx=px[i]; vx[i]=-vx[i]; } }
      px[i]=nx; py[i]=ny; } }
  return _sims[key]={n,F,fps, pos(i,t){ const f=clamp(t*fps,0,F-1.001), f0=Math.floor(f), u=f-f0, a=(f0*n+i)*2, b=a+n*2; return [P[a]+(P[b]-P[a])*u, P[a+1]+(P[b+1]-P[a+1])*u]; } };
}
function trail(ctx,S,i,t,len,color,lw=2,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineJoin='round';
  const steps=Math.max(2,Math.round(len*S.fps)); ctx.beginPath(); for(let k=0;k<=steps;k++){ const tt=Math.max(0,t-len+len*k/steps); const p=S.pos(i,tt); k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); }
  ctx.stroke(); ctx.restore(); }

// ===== drawing helpers =====
function dot(ctx,x,y,r,fill,stroke,lw=1.2){ ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
function arrow(ctx,x1,y1,x2,y2,color,lw=4,head=16,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw; ctx.lineCap='round';
  const a=Math.atan2(y2-y1,x2-x1), bx=x2-Math.cos(a)*head*0.8, by=y2-Math.sin(a)*head*0.8; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(bx,by); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-Math.cos(a-0.45)*head,y2-Math.sin(a-0.45)*head); ctx.lineTo(x2-Math.cos(a+0.45)*head,y2-Math.sin(a+0.45)*head); ctx.closePath(); ctx.fill(); ctx.restore(); }
function crossOut(ctx,x,y,s,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.koraal; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-s,y-s); ctx.lineTo(x+s,y+s); ctx.moveTo(x+s,y-s); ctx.lineTo(x-s,y+s); ctx.stroke(); ctx.restore(); }
function micro(ctx){ bg(ctx,'micro'); }
function fadeIO(t,a,b,d=0.5){ return ramp(t,a,d)*(1-ramp(t,b,d)); }
// water molecule field (decorative, deterministic wander) inside rect
// horizontal lipid bilayer from x0..x1 centred on y; gaps: [[xa,xb],...] left open for proteins
// celmembraan altijd gebogen (stukje van een cirkel, BEELDAFSPRAKEN): horizontaal membraan = boog met middelpunt (MEM_CX, y+MEM_R),
// bolle kant = buiten (boven). mY(x,y) = hoogte van de middellijn bij x, mA(x) = hoek van de raaklijn.
const MEM_R=4500, MEM_CX=960, MEMV_R=1300, MEMV_CY=560;
const mY=(x,y)=>y+MEM_R-Math.sqrt(MEM_R*MEM_R-(x-MEM_CX)*(x-MEM_CX));
const mA=(x)=>Math.asin(clamp((x-MEM_CX)/MEM_R,-1,1));
const mX=(x,y)=>x+MEMV_R-Math.sqrt(MEMV_R*MEMV_R-(y-MEMV_CY)*(y-MEMV_CY));
function opMem(ctx,x,y,fn){ ctx.save(); ctx.translate(x,mY(x,y)); ctx.rotate(mA(x)); fn(); ctx.restore(); }
// boog (stukje cirkel) voor kleine membraantjes in schema's: horizontaal van x0 tot x1, top op y, randen d lager
// één fosfolipide: kop (hydrofiel) en twee vetstaarten (hydrofoob); dir=1 staarten naar beneden
// channel protein (two halves) through a horizontal membrane at x, opening ow
function gauge(ctx,x,y,r,val,label,alpha=1,color=C.teal){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  ctx.beginPath(); ctx.arc(x,y,r,Math.PI,0); ctx.closePath(); shape(ctx,rgba(C.bgSchema,0.95),C.line,1.5);
  for(let k=0;k<=8;k++){ const a=Math.PI+k/8*Math.PI; ctx.strokeStyle=C.line; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*r*0.82,y+Math.sin(a)*r*0.82); ctx.lineTo(x+Math.cos(a)*r*0.95,y+Math.sin(a)*r*0.95); ctx.stroke(); }
  const a=Math.PI+clamp(val,0,1)*Math.PI; ctx.strokeStyle=color; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(a)*r*0.78,y+Math.sin(a)*r*0.78); ctx.stroke(); dot(ctx,x,y,6,color);
  if(label) metaText(ctx,label,x,y+34,C.grain,'center',22); ctx.restore(); }
function thermometer(ctx,x,y,h,level,color,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; roundRect(ctx,x-10,y-h,20,h,10); shape(ctx,rgba(C.bgSchema,0.9),C.line,1.5); dot(ctx,x,y+8,18,color,C.line,1.5);
  roundRect(ctx,x-5,y-h*level,10,h*level+6,5); ctx.fillStyle=color; ctx.fill(); ctx.restore(); }
// plant cell: wall (w,h), membrane pulled in by plasmolysis p (0..1), vacuole fraction v, bulge = turgor
// red blood cell: swell 0..1 (round, bigger), cren 0..1 (shrunk, spiky), burst 0..1
function beaker(ctx,x,y,w,h,fill=0.75,liquid=rgba(C.teal,0.18),alpha=1,label){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  ctx.fillStyle=liquid; ctx.fillRect(x-w/2+3,y+h/2-h*fill,w-6,h*fill-3);
  ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-w/2,y-h/2); ctx.lineTo(x-w/2,y+h/2); ctx.lineTo(x+w/2,y+h/2); ctx.lineTo(x+w/2,y-h/2); ctx.stroke();
  if(label) metaText(ctx,label,x,y+h/2+40,C.grain,'center',24); ctx.restore(); }
function pill(ctx,x,y,s,color=C.goud,alpha=1,size=30){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.font=fTekst(size,600); const w=ctx.measureText(s).width+44; roundRect(ctx,x-w/2,y-size*0.95,w,size*1.65,size*0.8); shape(ctx,rgba(C.bgSchema,0.94),color,1.5); text(ctx,s,x,y+size*0.32,fTekst(size,600),color,'center'); ctx.restore(); }
// ATP als molecuul (BEELDAFSPRAKEN): base (adenine, zes- + vijfring) + suiker (ribose) + drie fosfaatgroepen.
// pop 0..1: de laatste fosfaatgroep springt eraf (ATP -> ADP + P). naam: tekst eronder ('' = geen)
function atp(ctx,x,y,alpha=1,s=1,pop=0,naam=null){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.scale(s,s);
  const ring=(cx,cy,r,n,rot,fill)=>{ ctx.beginPath(); for(let k=0;k<n;k++){ const a=rot+k/n*6.2832; const px=cx+Math.cos(a)*r, py=cy+Math.sin(a)*r; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.closePath(); shape(ctx,fill,lighten(fill,0.4),1.5); };
  ring(-62,-4,15,6,Math.PI/6,'#B9604A'); ring(-38,-12,12,5,-0.3,'#B9604A');           // base (adenine)
  ring(-14,8,13,5,-Math.PI/2,C.oker);                                               // suiker (ribose)
  ctx.strokeStyle=lighten(C.koraal,0.3); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-26,-6); ctx.lineTo(-20,2); ctx.moveTo(-2,8); ctx.lineTo(60,8); ctx.stroke();
  const P=(px,py,a)=>{ ctx.save(); ctx.globalAlpha*=a; dot(ctx,px,py,11,C.koraal,lighten(C.koraal,0.4),1.5); text(ctx,'P',px,py+1,fTekst(14,700),C.bgMicro,'center','middle'); ctx.restore(); };
  P(14,8,1); P(38,8,1);
  const u=clamp(pop,0,1); if(u<1||true){ const px=62+u*46, py=8-Math.sin(u*Math.PI)*34+u*28; if(u>0.02&&u<0.98){ ctx.strokeStyle=rgba(C.koraal,0.7*(1-u)); ctx.lineWidth=2; for(let k=0;k<3;k++){ const a=-0.6+k*0.6; ctx.beginPath(); ctx.moveTo(px+Math.cos(a)*16,py+Math.sin(a)*16); ctx.lineTo(px+Math.cos(a)*26,py+Math.sin(a)*26); ctx.stroke(); } } P(px,py,1); }
  const lab = naam!==null ? naam : (u>0.5?'ADP + P':'ATP'); if(lab){ ctx.font=fMeta(20); ctx.letterSpacing='1px'; ctx.textAlign='center'; ctx.fillStyle=C.koraal; ctx.fillText(lab,0,48); ctx.letterSpacing='0px'; }
  ctx.restore(); }
function card(ctx, x, y, w, h, title, body, alpha=1, accent=C.goud){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; roundRect(ctx,x,y,w,h,12); shape(ctx,C.bgSchema,C.line,1);
  if(title) text(ctx,title,x+28,y+52,fTekst(36,600),accent);
  if(body){ ctx.font=fTekst(32); ctx.fillStyle=C.text; ctx.textAlign='left'; ctx.textBaseline='alphabetic'; wrap(ctx,body,x+28,y+(title?100:52),w-56,42); }
  ctx.restore();
}
function wrap(ctx, s, x, y, maxW, lh){ const words=s.split(' '); let line=''; for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; } if(line) ctx.fillText(line,x,y); return y; }
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} } // nodig voor lib_cast.js (22 okt 2026)
