// ===== Zenuw- en hormoonstelsel — scènes (kerndoelen onderbouw, film 7) =====
// Kleuren (Part C): zenuwsignaal teal, hormoon en hormoonklieren paars, spieren koraal, goud = focus.
// Lichaam: eigen schema (silhouet `human` + overlays), niet bodyOrgans: daar staat het zenuwstelsel paars.

// ---------- algemene hulpjes film 7 ----------
// Lichaam (versie 1.1, 22 okt 2026): het realistische lichaam uit lib_anatomie.js (zelfde als film 2b), organen op hun echte plek.
// 'Jij' is Sam uit het castboek (cold open, plein, inzetjes). Kleuren film 7: zenuwen neutraal, zenuwsignaal teal, hormoonklieren en adrenaline paars, spieren rood.
BODY.cx=960; BODY.yb=880; BODY.h=740;
const LB=BODY; const LU=LB.h/8, LT=LB.yb-LB.h;
// tijdelijk een ander lichaam (positie/maat), bv. klein in s11 of groot voor de hersenen in s06/s13
function metLijf(cx,yb,h,fn){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; BODY.cx=cx; BODY.yb=yb; BODY.h=h; try{ fn(); } finally { Object.assign(BODY,o); } }
// ankerpunten (px) — let op: wordt opnieuw berekend binnen metLijf via P7f()
function P7f(){ return { oor:AP(0.39,0.56), brein:AP(0,0.3), hypo:AP(0,0.56), hals:AP(0,1.22),
  rugTop:AP(0,0.62), rugBot:AP(0,3.32), hart:AP(0.09,2.22), long:AP(0,2.0), lever:AP(-0.38,2.75), alv:AP(0.22,3.0),
  nierL:AP(-0.37,3.1), nierR:AP(0.37,3.04), bijL:AP(-0.37,2.9), bijR:AP(0.37,2.84), gesl:AP(0,3.65),
  beenL:AP(-0.5,4.45), beenR:AP(0.5,4.45), voetL:AP(-0.33,7.2), voetR:AP(0.33,7.2) }; }
const P7=P7f();
const XR=AP(1.52,0)[0], XL=AP(-1.52,0)[0]; // labelkolommen rechts en links van het lichaam (vrij van de armen)
const YB=v=>AP(0,v)[1];
function lijf(a=1,sil=0.3){ if(a<=0.01) return; alpha(ctx,a,()=>{ anFigure(Math.min(1,0.25+sil)); anCavity(0.21*Math.min(1,sil*3)); }); }
// zenuwbanen (lichaamscoördinaten)
const Z7={ oor:[[0.39,0.56],[0.31,0.61],[0.2,0.52],[0.08,0.38]], bij:s=>[[0,2.5],[s*0.12,2.66],[s*0.3,2.82]] };
function z7Lijn(pts,col,w,glow=0){ ctx.save(); if(glow){ ctx.shadowColor=col; ctx.shadowBlur=14*glow; } anLine(pts,col,w); ctx.restore(); }
const BREIN_VORM=anSym([[0,0.1],[0.17,0.1],[0.29,0.18],[0.33,0.32],[0.31,0.45],[0.22,0.5],[0.1,0.47],[0,0.44]]);
// zenuwnet: hersenen, ruggenmerg, zenuwen (neutraal), o.hl = lijst van onderdelen in goud, o.bij = zenuw naar de bijnieren
function zenuwnet(a=1,o={}){ if(a<=0.01) return; const hl=o.hl||[]; const G=k=>hl.includes(k); const HH=AHH(); const NEU='#C9D3E0';
  alpha(ctx,a,()=>{
    const arm=[AN_ZEN.arm(-1),AN_ZEN.arm(1)], been=[AN_ZEN.been(-1),AN_ZEN.been(1),AN_ZEN.been2(-1),AN_ZEN.been2(1)];
    arm.forEach(p=>z7Lijn(p,G('zenuw')?C.goud:NEU,0.026*HH,G('zenuw')?1:0));
    been.forEach(p=>z7Lijn(p,G('zenuw')||G('beenzenuw')?C.goud:NEU,0.026*HH,G('zenuw')||G('beenzenuw')?1:0));
    // kleine zijtakken (romp, handen, voeten)
    ctx.save(); ctx.globalAlpha*=0.3; for(let i=0;i<6;i++){ const y=1.72+i*0.2; for(const s of [-1,1]) anLine([[s*0.01,y],[s*0.3,y+0.02],[s*0.6,y+0.12]],NEU,1.2); }
      for(const s of [-1,1]){ for(let k=0;k<4;k++) anLine([[s*1.25,4.42],[s*(1.17+k*0.04),4.6]],NEU,1.1); for(let k=0;k<4;k++) anLine([[s*0.33,7.2],[s*(0.24+k*0.07),7.28]],NEU,1.1); } ctx.restore();
    if(o.bij) for(const s of [-1,1]) z7Lijn(Z7.bij(s),NEU,0.026*HH);
    // ruggenmerg
    z7Lijn(AN_ZEN.merg,G('rug')?C.goud:'#DCE3EC',0.055*HH,G('rug')?1:0);
    // hersenen (echte vorm, met windingen); goud = rand met gloed
    anBrain(1,G('brein')?0.5:0); if(G('brein')){ ctx.save(); ctx.shadowColor=C.goud; ctx.shadowBlur=18; anPath(ctx,APs(BREIN_VORM)); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }
    // gehoorzenuw van het oor naar de hersenen
    z7Lijn(Z7.oor,G('oorzenuw')||G('zenuw')?C.goud:NEU,0.03*HH,G('oorzenuw')?1:0);
    if(G('oor')){ const [ex,ey]=AP(0.385,0.53); ctx.save(); ctx.shadowColor=C.goud; ctx.shadowBlur=16; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(ex,ey,0.11*HH,0.17*HH,0,0,6.283); ctx.stroke(); ctx.restore(); }
  }); }
// beenspieren (dijbeen en kuit), kort 0..1 = de spier trekt samen (korter en dikker)
function beenSpieren(a=1,kort=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ for(const s of [-1,1]){ const M=p=>anMir(p,s);
  [[[0.34,3.75],[0.72,3.8],[0.7,4.4],[0.56,5.05],[0.38,5.1],[0.3,4.5]],[[0.42,5.35],[0.56,5.45],[0.6,5.9],[0.52,6.35],[0.44,6.1]]].forEach((pts,j)=>{
    const y0=pts[0][1], cxm=pts.reduce((q,p)=>q+p[0],0)/pts.length; const ky=1-0.16*kort, kx=1+0.12*kort;
    const P=M(pts.map(p=>[cxm+(p[0]-cxm)*kx,y0+(p[1]-y0)*ky]));
    ctx.save(); if(kort>0.05){ ctx.shadowColor=C.koraal; ctx.shadowBlur=22*kort; } anShape(P,ANA.spier,ANA.spierL,1.5); ctx.restore();
    ctx.save(); ctx.globalAlpha*=0.45; const f=M([[cxm+0.05,y0+0.12*ky],[cxm+0.07,y0+(j?0.8:1.2)*ky]].map(p=>[cxm+(p[0]-cxm)*kx,p[1]])); anLine(f,ANA.spierL,1.2); ctx.restore(); }); } }); }
// puls: teal stip langs een pad (lijst punten in px), u = 0..1
function padPunt(pad,u){ const L=[]; let tot=0; for(let i=1;i<pad.length;i++){ const d=Math.hypot(pad[i][0]-pad[i-1][0],pad[i][1]-pad[i-1][1]); L.push(d); tot+=d; }
  let r=clamp(u,0,1)*tot; for(let i=0;i<L.length;i++){ if(r<=L[i]) { const f=L[i]?r/L[i]:0; return [lerp(pad[i][0],pad[i+1][0],f),lerp(pad[i][1],pad[i+1][1],f)]; } r-=L[i]; } return pad[pad.length-1]; }
function puls(pad,u,a=1,kleur=C.teal){ if(a<=0.01||u<=0||u>=1.02) return; const [x,y]=padPunt(pad,u); alpha(ctx,a,()=>{ ctx.save(); ctx.shadowColor=kleur; ctx.shadowBlur=16; ctx.strokeStyle=kleur; ctx.lineWidth=5; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); const u0=Math.max(0,u-0.1); for(let k=0;k<=8;k++){ const [px,py]=padPunt(pad,u0+(u-u0)*k/8); k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); dot(ctx,x,y,9,kleur,lighten(kleur,0.45),2); ctx.restore(); }); }
// paden van de pulsen (functies: ze volgen BODY, ook binnen metLijf)
const PAD={ oor:()=>anDense(Z7.oor,30),
  been:s=>anDense([[0,0.36],[0,0.62],[0,1.6],[0,2.6],[s*0.01,3.25],[s*0.2,3.7],[s*0.35,4.0],[s*0.38,4.5]],80),
  bij:()=>anDense([[0,0.36],[0,0.62],[0,1.6],[0,2.5],[0.12,2.66],[0.3,2.82]],60) };
// hormoonklieren (paars), op hun echte plek
function klierGlow(hl){ if(hl){ ctx.shadowColor=C.goud; ctx.shadowBlur=22; } else { ctx.shadowColor=C.paars; ctx.shadowBlur=10; } }
function klier(k,a=1,hl=false,t=0){ if(a<=0.01) return; const HH=AHH(); alpha(ctx,a,()=>{ const st=hl?C.goud:lighten(C.paars,0.35), lw=hl?3:1.5;
  ctx.save(); klierGlow(hl);
  if(k==='bij'){ for(const s of [-1,1]){ const cx=s*0.37, cy=(s<0?3.1:3.04); // kapje bovenop de nier
    anShape([[cx-0.11,cy-0.11],[cx-0.08,cy-0.2],[cx,cy-0.25],[cx+0.08,cy-0.2],[cx+0.11,cy-0.11],[cx+0.04,cy-0.14],[cx-0.04,cy-0.14]],C.paars,st,lw); } }
  if(k==='hypo'){ const [x,y]=AP(0,0.56); anLine([[0,0.47],[0,0.53]],lighten(C.paars,0.2),0.035*HH); dot(ctx,x,y,Math.max(6,0.075*HH),C.paars,st,lw); }
  if(k==='schild') anShape([[0,1.2],[0.07,1.11],[0.13,1.14],[0.14,1.3],[0.07,1.34],[0,1.27],[-0.07,1.34],[-0.14,1.3],[-0.13,1.14],[-0.07,1.11]],C.paars,st,lw);
  if(k==='alv') anShape(AN_ALV,C.paars,st,lw);
  if(k==='gesl'){ const w=0.5+0.5*Math.cos(t*1.6); // eierstokken en zaadballen wisselen elkaar af ("eierstokken of zaadballen")
    ctx.save(); ctx.globalAlpha*=w; for(const s of [-1,1]){ const [ox,oy]=AP(s*0.27,3.62); ctx.beginPath(); ctx.ellipse(ox,oy,0.065*HH,0.045*HH,0,0,6.283); shape(ctx,C.paars,st,lw); } ctx.restore();
    ctx.save(); ctx.globalAlpha*=1-w; for(const s of [-1,1]){ const [x,y]=AP(s*0.065,4.1); ctx.beginPath(); ctx.ellipse(x,y,0.045*HH,0.06*HH,0,0,6.283); shape(ctx,C.paars,st,lw); } ctx.restore(); }
  ctx.restore(); }); }
function nieren(a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ anKidney(-1,1,0); anKidney(1,1,0); }); }
function lever(a=1,hl=false){ if(a<=0.01) return; liver(a,hl?0.7:0); if(hl){ ctx.save(); ctx.globalAlpha*=a; ctx.shadowColor=C.goud; ctx.shadowBlur=14; anPath(ctx,APs(AN_LEVER)); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); } }
// adrenaline: paarse deeltjes van de bijnieren naar doelen door het hele lichaam (deterministisch, lichaamscoördinaten)
const ADR_DOEL=[]; for(let i=0;i<46;i++){ const r=hash(i*3.7), h1=hash(i*1.3), h2=hash(i*2.9), sd=hash(i*5.1)<0.5?-1:1; let x,y;
  if(r<0.12){ x=(h1-0.5)*0.5; y=0.25+h2*0.5; } else if(r<0.55){ x=(h1-0.5)*1.05; y=1.55+h2*2.2; } else if(r<0.7){ x=sd*(0.92+h1*0.2); y=1.9+h2*2.2; } else { x=sd*(0.22+h1*0.26); y=4.2+h2*2.8; } ADR_DOEL.push([x,y]); }
function adrenaline(u,a=1,n=46,verval=0){ if(a<=0.01) return; const HH=AHH(); alpha(ctx,a*(1-0.75*verval),()=>{ for(let i=0;i<n;i++){ const src=AP(i%2?-0.37:0.37,i%2?2.9:2.84), d=AP(ADR_DOEL[i][0],ADR_DOEL[i][1]); const ui=ease(clamp(u*1.4-hash(i*7.7)*0.4,0,1)); if(ui<=0) continue; const w=wander(i,u*20,0.05*HH,1); dot(ctx,lerp(src[0],d[0],ui)+w.x,lerp(src[1],d[1],ui)+w.y,Math.max(3,0.055*HH),C.paars,lighten(C.paars,0.45),1.2); } }); }
// Sam (= jij) in een rond inzetje: plein, springt op, hart bonkt
function samInzet(cx,cy,r,a,t,o={}){ inset(cx,cy,r,a,()=>{ const k=r/150; ctx.save(); ctx.translate(cx,cy); ctx.scale(k,k);
  ctx.fillStyle='#6E8CA8'; ctx.fillRect(-160,-160,320,320); ctx.fillStyle='#3E4A62'; ctx.fillRect(-160,-150,320,170); ctx.fillStyle='#55627C'; for(let c=0;c<4;c++) for(let r2=0;r2<2;r2++){ roundRect(ctx,-140+c*75,-130+r2*80,45,55,3); ctx.fill(); }
  ctx.fillStyle='#8A8F96'; ctx.fillRect(-160,95,320,70);
  const sp=o.spring||0; persoon(ctx,'sam',0,128-70*Math.sin(Math.PI*clamp(sp,0,1)),245,{outfit:'school',uit:o.uit||'bezorgd',pose:sp>0&&sp<1?'schouders':'staan',kijk:1,t});
  if(o.bonk){ heart(52,-10,0.45,o.bonk,t*13); }
  ctx.restore(); }); }
// bel met geluidsringen
function alarmBel(x,y,s,t,aan){ ctx.save(); ctx.translate(x,y); ctx.rotate(aan?Math.sin(t*28)*0.12:0); ctx.beginPath(); ctx.arc(0,0,34*s,Math.PI,0); ctx.lineTo(40*s,22*s); ctx.lineTo(-40*s,22*s); ctx.closePath(); shape(ctx,C.fill,C.text,2.5); dot(ctx,0,30*s,7*s,C.text); ctx.restore();
  if(aan) for(let k=0;k<3;k++){ const f=((t*1.6+k/3)%1); ctx.save(); ctx.globalAlpha*=(1-f); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y,50*s+f*120*s,-0.8,0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(x,y,50*s+f*120*s,Math.PI-0.8,Math.PI+0.8); ctx.stroke(); ctx.restore(); } }
// klaslokaal (Schema-achtergrond met bord, raam, tafel)
function klas(t){ bg(ctx,'schema'); ctx.fillStyle='#22324D'; ctx.fillRect(0,780,W,H-780); ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,780); ctx.lineTo(W,780); ctx.stroke();
  roundRect(ctx,140,180,620,330,8); shape(ctx,'#2F4A3A',C.line,3); ctx.strokeStyle=rgba(C.text,0.45); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(190,260); ctx.lineTo(420,260); ctx.moveTo(190,320); ctx.lineTo(560,320); ctx.moveTo(190,380); ctx.lineTo(380,380); ctx.stroke();
  windowView(1300,150,460,340,0.4,0); }
function tafel(x,y,w){ ctx.fillStyle='#6E5238'; ctx.fillRect(x-w/2+10,y+20,w-20,780-y-20); ctx.strokeStyle='#8C6A4A'; ctx.lineWidth=2; ctx.strokeRect(x-w/2+10,y+20,w-20,780-y-20); roundRect(ctx,x-w/2,y,w,24,6); shape(ctx,'#8C6A4A','#B08A5C',2); }
// schoolplein (Macro-dag)
function plein(){ ctx.fillStyle='#6E8CA8'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#3E4A62'; ctx.fillRect(1100,220,820,520); ctx.fillStyle='#55627C'; for(let r=0;r<3;r++) for(let c=0;c<6;c++){ roundRect(ctx,1150+c*125,270+r*140,80,90,4); ctx.fill(); }
  roundRect(ctx,1460,610,110,130,4); shape(ctx,'#2A3A58',C.line,2); ctx.fillStyle='#8A8F96'; ctx.fillRect(0,740,W,H-740); ctx.strokeStyle=rgba('#FFFFFF',0.12); ctx.lineWidth=2; for(let x=0;x<W;x+=120){ ctx.beginPath(); ctx.moveTo(x,740); ctx.lineTo(x-60,H); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(0,820); ctx.lineTo(W,820); ctx.stroke();
  [[180,560,1],[420,600,0.8]].forEach(([x,y,s])=>{ ctx.fillStyle='#5A4636'; ctx.fillRect(x-8*s,y,16*s,180*s); ctx.beginPath(); ctx.arc(x,y,90*s,0,6.283); shape(ctx,'#5FA86E','#7FC48F',2); }); }
function hartPil(x,y,t,a=1,bpm=120){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x-150,y-44,300,88,44); shape(ctx,rgba(C.bgMicro,0.85),C.koraal,2); heart(x-90,y,0.75,1,t*bpm/60*6.283); text(ctx,'bonk bonk',x+30,y+12,fTekst(32,600),C.text,'center'); }); }
function meta7(t){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
// telefoon en luidspreker (H3)
function telefoon(x,y,s,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-48*s,y-90*s,96*s,180*s,14*s); shape(ctx,C.fill,C.text,2.5); roundRect(ctx,x-36*s,y-50*s,72*s,30*s,10*s); shape(ctx,rgba(C.teal,0.35),C.teal,1.5); dot(ctx,x,y+72*s,6*s,C.line); }); }
function luidspreker(x,y,s,t,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x-40*s,y-24*s); ctx.lineTo(x-10*s,y-24*s); ctx.lineTo(x+30*s,y-60*s); ctx.lineTo(x+30*s,y+60*s); ctx.lineTo(x-10*s,y+24*s); ctx.lineTo(x-40*s,y+24*s); ctx.closePath(); shape(ctx,C.fill,C.text,2.5);
  for(let k=0;k<3;k++){ const f=((t*0.9+k/3)%1); ctx.save(); ctx.globalAlpha*=(1-f); ctx.strokeStyle=C.paars; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x+30*s,y,(40+f*110)*s,-0.9,0.9); ctx.stroke(); ctx.restore(); } }); }
function voetbalveld(x,y,w,t,a=1){ if(a<=0.01) return; const h=w*0.6; alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.strokeRect(x,y,w,h); ctx.beginPath(); ctx.moveTo(x+w/2,y); ctx.lineTo(x+w/2,y+h); ctx.stroke(); ctx.beginPath(); ctx.arc(x+w/2,y+h/2,h*0.18,0,6.283); ctx.stroke(); ctx.strokeRect(x,y+h*0.25,w*0.14,h*0.5); ctx.strokeRect(x+w*0.86,y+h*0.25,w*0.14,h*0.5);
  const u=(t%1.6)/1.0; if(u<=1){ dot(ctx,x+w*u,y+h/2,10,C.teal,lighten(C.teal,0.4),2); } metaText(ctx,'± 100 m in 1 seconde',x+w/2,y+h+40,C.teal,'center',24); }); }
// Sam aan het fornuis (reflex, s06): rechterarm reikt naar de pan en schiet terug; geeft ankers voor zenuwen en labels
// weg 0..1 = hand trekt terug. De arm wordt met een eigen houding (POSES.reflex7) getekend, zelfde rekenwerk als lib_cast.
const SAM7={x:430,y:880,h:620};
function samArm(weg){ const P=CAST.sam, h=SAM7.h*(P.lengte||1), hh=h/6.1, top=SAM7.y-h, sw=hh*1.8, sy=top+hh*1.42+hh*0.25, sx=SAM7.x+sw*0.4;
  const e=ease(weg), a1=lerp(1.12,0.22,e), a2=lerp(1.32,-2.55,e); const L1=hh*1.32, L2=hh*1.2;
  const ex=sx+Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+Math.sin(a2)*L2, hy=ey+Math.cos(a2)*L2;
  return { a1, a2, sx, sy, ex, ey, hx, hy, hh, top, rug:[SAM7.x,sy+hh*0.35], nek:[SAM7.x,top+hh*1.25], hoofd:[SAM7.x,top+hh*0.55], heup:[SAM7.x,top+hh*3.45] }; }
function fornuis(t){ const X=760, Y=560; // aanrecht met kookplaat en pan
  ctx.fillStyle='#4A5266'; ctx.fillRect(X-20,Y,560,H-Y-180+0); roundRect(ctx,X-40,Y-14,600,30,6); shape(ctx,'#6A7388','#8A93A8',2);
  ctx.strokeStyle=rgba('#22293A',0.8); ctx.lineWidth=2; ctx.strokeRect(X+20,Y+50,230,200); ctx.strokeRect(X+280,Y+50,230,200); dot(ctx,X+230,Y+150,6,'#8A93A8'); dot(ctx,X+300,Y+150,6,'#8A93A8');
  // pit met gloed
  ctx.save(); ctx.shadowColor=C.koraal; ctx.shadowBlur=24; ctx.beginPath(); ctx.ellipse(X+250,Y-12,110,12,0,0,6.283); ctx.fillStyle=rgba(C.koraal,0.75+0.15*Math.sin(t*9)); ctx.fill(); ctx.restore();
  // pan (opzij gezien) met steel naar links
  roundRect(ctx,X+150,Y-90,200,76,14); shape(ctx,'#3A3F48','#5A606C',2); ctx.fillStyle='#2A2E36'; ctx.fillRect(X+150,Y-90,200,12);
  ctx.save(); ctx.lineCap='round'; ctx.strokeStyle='#2A2E36'; ctx.lineWidth=16; ctx.beginPath(); ctx.moveTo(X+152,Y-74); ctx.lineTo(X+70,Y-66); ctx.stroke(); ctx.restore();
  for(let k=0;k<3;k++){ const f=((t*0.6+k/3)%1); ctx.save(); ctx.globalAlpha*=0.7*(1-f); ctx.strokeStyle='#D8DEE8'; ctx.lineWidth=4; ctx.lineCap='round'; const x0=X+190+k*60; ctx.beginPath(); ctx.moveTo(x0,Y-100-f*20); ctx.bezierCurveTo(x0+18,Y-130-f*60,x0-18,Y-160-f*80,x0+6,Y-190-f*110); ctx.stroke(); ctx.restore(); }
  return [X+80,Y-68]; }
POSES.reflex7={R:[1.12,1.32],L:[0.14,0.06]};
// spier als spoel met pezen en vezels; k = samentrekking 0..1
function spierSpoel(x,y,k,t){ const L=150*(1-0.15*k), Wd=34*(1+0.25*k); ctx.save(); ctx.translate(x,y); ctx.rotate(Math.PI/2);
  ctx.strokeStyle='#E8DCC8'; ctx.lineWidth=7; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-L/2-34,0); ctx.lineTo(-L/2+6,0); ctx.moveTo(L/2-6,0); ctx.lineTo(L/2+34,0); ctx.stroke();
  if(k>0.05){ ctx.shadowColor=C.koraal; ctx.shadowBlur=24*k; } ctx.beginPath(); ctx.moveTo(-L/2,0); ctx.bezierCurveTo(-L/4,-Wd,L/4,-Wd,L/2,0); ctx.bezierCurveTo(L/4,Wd,-L/4,Wd,-L/2,0); shape(ctx,ANA.spier,ANA.spierL,2); ctx.shadowBlur=0;
  ctx.globalAlpha*=0.5; ctx.strokeStyle=ANA.spierL; ctx.lineWidth=1.5; for(const f of [-0.5,0,0.5]){ ctx.beginPath(); ctx.moveTo(-L/2+10,0); ctx.quadraticCurveTo(0,f*Wd*1.4,L/2-10,0); ctx.stroke(); } ctx.restore(); }
function samFornuis(weg,t,uit){ const A=samArm(weg); POSES.reflex7.R=[A.a1,A.a2]; persoon(ctx,'sam',SAM7.x,SAM7.y,SAM7.h,{outfit:'school',pose:'reflex7',uit,kijk:1,t}); return A; }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: brandalarm in de klas, daarna het plein ----
s01(ctx,t,q){ const tB=q.at('buiten'), tAl=q.at('brandalarm'), tSp=q.at('springt');
  if(t<tB-0.3){ klas(t); const op=ramp(t,tSp,0.35);
    persoon(ctx,'sam',780,880-150*(1-op),440,{outfit:'school',uit:op>0.5?'verbaasd':'neutraal',kijk:1,t}); persoon(ctx,'noor',1100,880-150*(1-op),425,{outfit:'school',uit:op>0.5?'verbaasd':'denkt',kijk:-1,t});
    tafel(940,600,760); alarmBel(1000,110,1,t,t>tAl);
    pill(ctx,1000,250,'brandalarm!',C.teal,fadeIO(t,tAl,tB-0.6,0.3),32);
  } else { plein(); const s=t-tB;
    persoon(ctx,'sam',760,880,470,{outfit:'school',uit:'bezorgd',kijk:1,t}); persoon(ctx,'noor',980,880,450,{outfit:'school',uit:'praat',kijk:-1,t}); persoon(ctx,'lotte',540,880,455,{outfit:'school',uit:'verbaasd',kijk:1,t});
    hartPil(1500,140,t,ramp(t,q.at('bonkt'),0.4));
    alpha(ctx,ramp(t,q.at('Hoe'),0.5),()=>{ pill(ctx,760,150,'hoe wisten je benen en je hart het?',C.goud,1,40); }); }
},
// ---- titel ----
s02(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Zenuwen en hormonen',120,330,fTitel(104),C.text); text(ctx,'Hoe je organen met elkaar praten',120,410,fTekst(44),C.text2); });
  metLijf(1430,870,700,()=>{ lijf(ramp(t,0.4,1)); zenuwnet(ramp(t,0.6,1)); nieren(ramp(t,1,1)*0.8); klier('hypo',ramp(t,1,1)); klier('schild',ramp(t,1,1)); klier('bij',ramp(t,1,1)); puls(PAD.been(-1),(t*0.5)%1.3,ramp(t,1,1)); puls(PAD.been(1),(t*0.5+0.4)%1.3,ramp(t,1,1)); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 7',W-80,60,C.text2,'right',24); },
// ---- H1: zintuig, signaal, zenuw ----
s03(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zintuigen'), tSig=q.at('signaal'), tZen=q.at('zenuw.',2), tW=q.at('Welke');
  lijf(1); zenuwnet(ramp(t,0.3,0.8),{hl:t>tZ&&t<tSig+1?['oor']:t>tZen?['oorzenuw']:[]});
  pill(ctx,420,200,'1  zenuwen',C.teal,fadeIO(t,0.4,q.at('begint'),0.4),34); pill(ctx,420,290,'2  hormonen',C.paars,fadeIO(t,0.4,q.at('begint'),0.4)*0.45,34);
  naamBij(ctx,'zintuig','het oor vangt geluid op',P7.oor[0]+30,P7.oor[1]+8,ramp(t,tZ,0.4),'left',C.goud);
  // vier soorten prikkels
  const tG=q.at('Geluid'); [['geluid',0],['licht',1],['warmte',2],['aanraking',3]].forEach(([s,i])=>pill(ctx,330,300+i*90,s,C.text,fadeIO(t,tG+i*0.35,tSig,0.3),30));
  // signaal: puls bij het oor, dan over de zenuw tot halverwege
  const pu=t<tZen?0.02+0.1*ramp(t,tSig,0.5):0.12+0.4*ramp(t,tZen,1.2); puls(PAD.oor(),pu,ramp(t,tSig,0.3));
  naamBij(ctx,'elektrisch signaal','',1260,250,fadeIO(t,tSig,tZen+2,0.4),'left',C.teal);
  // zoomcirkel: doorsnede zenuw
  zoomCircle(ctx,1500,560,190,P7.oor[0]-30,P7.oor[1]+20,'doorsnede van een zenuw',ramp(t,q.at('bundel'),0.5),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1310,370,380,380); ctx.beginPath(); ctx.arc(1500,560,150,0,6.283); shape(ctx,rgba(C.grain,0.15),C.grain,4); for(let i=0;i<24;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*4.1))*120; dot(ctx,1500+Math.cos(an)*d,560+Math.sin(an)*d,13,rgba(C.teal,0.3),C.teal,1.5); } });
  naamBij(ctx,'zenuw','bundel draden van zenuwcellen',1500,330,ramp(t,q.at('bundel'),0.5),'center',C.goud);
  alpha(ctx,ramp(t,tW,0.4),()=>{ text(ctx,'?',XL-60,P7.beenL[1]+120,fTitel(90),C.goud,'center'); });
  meta7(t); },
// ---- H1: route via hersenen en ruggenmerg naar de beenspieren ----
s05(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('hersenen'), tA=q.at('alarm'), tR=q.at('ruggenmerg'), tSp=q.at('spieren'), tK=q.at('korter'), tS=q.at('samen'), tSn=q.at('snel.'), tV=q.at('voetbalveld');
  const vS=1-ramp(t,tSn-0.2,0.5);
  alpha(ctx,vS,()=>{ lijf(1); samInzet(290,560,150,fadeIO(t,tSp-1.2,tS+0.6,0.4),t,{spring:ramp(t,q.at('springt')-0.1,0.7),uit:'verbaasd'}); const hl=t>tS?['brein','rug','zenuw','oor']:t>tR&&t<tSp?['rug']:t>tH&&t<tR?['brein']:[];
    zenuwnet(1,{hl}); beenSpieren(ramp(t,tSp,0.4),ramp(t,tK,0.4)*(1-ramp(t,tK+1.4,0.4)));
    puls(PAD.oor(),ramp(t,0,1.1),1); pill(ctx,P7.brein[0],P7.brein[1]-120,'alarm!',C.goud,fadeIO(t,tA,tR,0.3),32);
    puls(PAD.been(-1),ramp(t,tA+0.6,(tSp-tA)+0.6),1); puls(PAD.been(1),ramp(t,tA+0.6,(tSp-tA)+0.6),1);
    naamBij(ctx,'hersenen','',P7.brein[0]+70,P7.brein[1]-40,fadeIO(t,tH,tS+3,0.4),'left',C.goud);
    naamBij(ctx,'ruggenmerg','in je rug',XR,YB(2.3),ramp(t,tR,0.4)*vS,'left',C.goud);
    naamBij(ctx,'beenspieren','worden korter',XR,P7.beenR[1],fadeIO(t,tSp,tS,0.4),'left',C.koraal);
    naamBij(ctx,'zenuwstelsel','zintuigen · zenuwen · ruggenmerg · hersenen',360,200,ramp(t,tS,0.5),'center',C.goud);
    naamBij(ctx,'spieren voeren uit','',1500,P7.beenR[1],ramp(t,q.at('uit.'),0.4),'center',C.koraal); });
  alpha(ctx,ramp(t,tSn,0.5),()=>{ text(ctx,'Zo snel gaat een zenuwsignaal',W/2,220,fTitel(64),C.text,'center'); voetbalveld(560,340,800,t-tSn,1); text(ctx,'tot wel 100 m per seconde',W/2,300,fTekst(40,600),C.teal,'center'); });
  meta7(t); },
// ---- H1 uitdaging: reflex ----
s06(ctx,t,q){ bg(ctx,'schema'); const tP=q.at('pan'), tR=q.at('ruggenmerg'), tT=q.at('terug'), tW=q.at('weg',2), tTe=q.at('Tegelijk'), tAu=q.at('au'), tRe=q.at('reflex');
  ctx.fillStyle='#22324D'; ctx.fillRect(0,880,W,H-880); ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,880); ctx.lineTo(W,880); ctx.stroke();
  const weg=ramp(t,tW-0.25,0.35); fornuis(t);
  const A=samFornuis(weg,t,t>tAu?'verbaasd':weg>0.5?'bezorgd':'neutraal');
  // kijkje in Sam: ruggenmerg, hersenen en de zenuw in de arm (doorschijnend over de kleding)
  const NEU='#E6ECF4', zArm=[[A.hx,A.hy],[A.ex,A.ey],[A.sx,A.sy],A.rug];
  alpha(ctx,ramp(t,0.2,0.6),()=>{ ctx.save(); ctx.globalAlpha*=0.85; ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.strokeStyle=rgba(NEU,0.9); ctx.lineWidth=9; ctx.beginPath(); ctx.moveTo(A.nek[0],A.nek[1]); ctx.lineTo(A.heup[0],A.heup[1]); ctx.stroke();
    ctx.lineWidth=3.5; ctx.beginPath(); zArm.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.restore();
    // hersenen in het hoofd
    // hersenen klein in de bovenkant van de schedel (boven de ogen), doorschijnend
    const r=A.hh*0.55, HHb=0.62*r/0.33, cyB=A.hoofd[1]-0.42*r; metLijf(A.hoofd[0],cyB-0.3*HHb+7.3*HHb,7.3*HHb,()=>{ ctx.save(); ctx.globalAlpha*=0.8; ctx.beginPath(); ctx.rect(A.hoofd[0]-r*1.2,cyB-r,r*2.4,r*1.2); ctx.clip(); anBrain(1,t>tAu?0.8:0); ctx.restore(); }); });
  naamBij(ctx,'ruggenmerg','',A.rug[0]-70,A.heup[1]-60,ramp(t,tR,0.4),'right',C.goud);
  naamBij(ctx,'zintuigen in je huid','voelen de hitte',1080,330,fadeIO(t,q.at('Zintuigen'),tT,0.4),'center',C.goud);
  if(fadeIO(t,q.at('Zintuigen'),tT,0.4)>0.01){ ctx.save(); ctx.globalAlpha*=fadeIO(t,q.at('Zintuigen'),tT,0.4); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.shadowColor=C.goud; ctx.shadowBlur=14; ctx.beginPath(); ctx.arc(A.hx,A.hy,34,0,6.283); ctx.stroke(); ctx.restore(); }
  // signaal hand -> ruggenmerg, dan meteen terug naar de armspier
  const tSg=q.at('signaal'); puls(zArm,ramp(t,tSg,tR-tSg+0.4),1-ramp(t,tR+0.5,0.3));
  const spier=[(A.sx+A.ex)/2,(A.sy+A.ey)/2]; puls([A.rug,[A.sx,A.sy],spier],ramp(t,tT-0.2,tW-tT+0.2),1-ramp(t,tW+0.4,0.3));
  alpha(ctx,fadeIO(t,tW-0.25,tTe+1,0.3),()=>{ ctx.save(); ctx.shadowColor=C.koraal; ctx.shadowBlur=24; ctx.strokeStyle=rgba(C.koraal,0.9); ctx.lineWidth=A.hh*0.36; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(A.sx+(A.ex-A.sx)*0.2,A.sy+(A.ey-A.sy)*0.2); ctx.lineTo(A.sx+(A.ex-A.sx)*0.8,A.sy+(A.ey-A.sy)*0.8); ctx.stroke(); ctx.restore(); });
  naamBij(ctx,'armspier','trekt je hand weg',spier[0]+70,spier[1]-30,fadeIO(t,tW-0.2,tTe+1,0.4),'left',C.koraal);
  // tegelijk: bericht omhoog naar de hersenen; pas daarna 'au!'
  puls([A.rug,A.nek,[A.hoofd[0],A.hoofd[1]-A.hh*0.3]],ramp(t,tTe,tAu-tTe+0.1),1-ramp(t,tAu+0.5,0.3));
  pill(ctx,A.hoofd[0],A.hoofd[1]-A.hh*1.05,'au!',C.koraal,ramp(t,tAu,0.25),40);
  naamBij(ctx,'hersenen','',A.hoofd[0]-A.hh*0.8,A.hoofd[1]-10,fadeIO(t,tTe,tRe+2,0.4),'right',C.goud);
  alpha(ctx,ramp(t,tAu+0.6,0.5),()=>{ metaText(ctx,'1. hand weg  →  2. au!',1500,250,C.grain,'center',26); });
  naamBij(ctx,'reflex','snel, zonder nadenken',1500,170,ramp(t,tRe,0.4),'center',C.goud);
},
// ---- H2: het plein, seintje naar de bijnieren, adrenaline ----
s07(ctx,t,q){ const tTw=q.at('tweede'), tSe=q.at('seintje'), tKa=q.at('kapjes'), tHk=q.at('hormoonklieren'), tAd=q.at('adrenaline'), tHo=q.at('hormoon.',3), tWa=q.at('Waar');
  if(t<tTw-0.2){ plein(); persoon(ctx,'sam',760,880,470,{outfit:'school',uit:'bezorgd',kijk:1,t}); persoon(ctx,'lotte',540,880,455,{outfit:'school',uit:'neutraal',kijk:1,t}); hartPil(1500,140,t,1); pill(ctx,760,150,'het alarm is uit',C.text,ramp(t,q.at('uit.'),0.4),30); return; }
  bg(ctx,'schema'); lijf(1); zenuwnet(0.45,{bij:true}); nieren(ramp(t,tKa-0.4,0.4)); anHeart(1,t*9,0.15);
  pill(ctx,420,200,'1  zenuwen',C.teal,0.4,34); pill(ctx,420,290,'2  hormonen',C.paars,ramp(t,tTw,0.4),34);
  puls(PAD.bij(),ramp(t,tSe,1.6),1); naamBij(ctx,'via een zenuw','',XR,YB(2.45),fadeIO(t,q.at('Via'),tKa,0.3),'left',C.teal);
  klier('bij',ramp(t,tKa,0.4),t>tKa&&t<tAd+1); naamBij(ctx,'bijnieren','op je nieren',XR,YB(3.0),ramp(t,tKa,0.4),'left',C.paars);
  naamBij(ctx,'hormoonklier','maakt een stof',300,520,fadeIO(t,tHk,tWa,0.4),'center',C.paars);
  adrenaline(0.12*ramp(t,tAd,1.5),ramp(t,tAd,0.4),46);
  naamBij(ctx,'adrenaline','',XL,YB(3.25),ramp(t,tAd,0.4),'right',C.paars);
  alpha(ctx,ramp(t,tHo,0.5),()=>{ roundRect(ctx,1370,420,520,190,14); shape(ctx,rgba(C.bgSchema,0.95),C.paars,1.5); text(ctx,'hormoon',1400,475,fTekst(40,700),C.paars); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,'een stof die een hormoonklier aan je bloed afgeeft',1400,525,470,38); });
  alpha(ctx,ramp(t,tWa,0.4),()=>{ text(ctx,'?',XL-60,P7.hart[1]+30,fTitel(90),C.goud,'center'); });
  meta7(t); },
// ---- H2: overal; de schoolomroep; organen die het herkennen ----
s09(ctx,t,q){ const tOm=q.at('omroep'), tZo=q.at('Zo'), tHa=q.at('hart',1), tAd=q.at('ademt'), tLe=q.at('lever'), tMi=q.at('minuten');
  const inOmroep=t>tOm-0.2&&t<tZo-0.2;
  if(inOmroep){ bg(ctx,'schema'); ctx.fillStyle='#22324D'; ctx.fillRect(0,760,W,H-760); luidspreker(960,170,1,t,1);
    pill(ctx,960,330,'"Klas 1B naar de aula."',C.paars,ramp(t,q.at('aula'),0.3),36);
    const lp=ramp(t,q.at('lopen'),1.2);
    [['1A',360,['daan','yasmin']],['1B',960,['sam','noor']],['1C',1560,['bilal','lotte']]].forEach(([k,x,ids])=>{ const ik=k==='1B'; const a=ik||t<q.at('Alleen')?1:0.35;
      alpha(ctx,a,()=>{ ids.forEach((id,j)=>persoon(ctx,id,x-80+j*160+(ik?lp*260:0),780,340,{outfit:'school',kijk:ik?1:(j?-1:1),uit:ik&&lp>0?'blij':'neutraal',t})); metaText(ctx,'klas '+k,x+(ik?lp*260:0),820,ik?C.paars:C.text2,'center',26); }); });
    return; }
  bg(ctx,'schema'); lijf(1); zenuwnet(0.3); nieren(1); klier('bij',1);
  const u=0.12+0.88*ramp(t,0,2.2); const verval=t>tMi?ramp(t,tMi,3):0; adrenaline(u,1,46,verval);
  pill(ctx,1500,200,'± 1 minuut: bloed één keer rond',C.text,fadeIO(t,q.at('minuut'),tOm,0.4),28);
  // organen die het herkennen
  alpha(ctx,t>tZo?1:0.55,()=>{ const ad=t>tAd&&t>tZo, ha=t>tHa&&t>tZo; anLungs(ad?1:0.45,t*(ad?4.5:2.5),ad?0.5*fadeIO(t,tAd,tMi,0.5):0); anHeart(ha?1:0.5,t*(ha?14:7),ha?0.5*fadeIO(t,tHa,tMi,0.5):0); lever(t>tLe?1:0.45,t>tLe&&t<tMi); });
  naamBij(ctx,'hart','klopt sneller',XL,YB(2.0),ramp(t,tHa,0.4)*(t>tZo?1:0),'right',C.koraal);
  naamBij(ctx,'longen','dieper ademen',XR,YB(1.75),ramp(t,tAd,0.4),'left',C.teal);
  naamBij(ctx,'lever','geeft suiker af',XL,YB(2.85),ramp(t,tLe,0.4),'right',C.oker);
  // concentratiebalkje
  alpha(ctx,ramp(t,tMi,0.4),()=>{ metaText(ctx,'adrenaline in je bloed',1560,600,C.paars,'center',24); roundRect(ctx,1410,620,300,40,10); shape(ctx,rgba(C.bgMicro,0.8),C.line,1.5); const v=1-0.85*ramp(t,tMi+0.3,5); roundRect(ctx,1414,624,292*v,32,8); ctx.fillStyle=C.paars; ctx.fill(); metaText(ctx,'een paar minuten',1560,700,C.text2,'center',22); });
  meta7(t); },
// ---- H2: meer hormoonklieren ----
s10(ctx,t,q){ bg(ctx,'schema'); lijf(1,0.25);
  const K=[['hypo','hypofyse','onder andere groei',q.at('hypofyse'),[XR-AHH()*0.5,YB(0.5)],'left'],['schild','schildklier','hoe snel je lichaam werkt',q.at('schildklier'),[XR-AHH()*0.5,YB(1.3)],'left'],['bij','bijnieren','adrenaline',0,[XR,YB(2.95)],'left'],['alv','alvleesklier','suiker in je bloed',q.at('alvleesklier'),[XL,YB(3.05)],'right'],['gesl','eierstokken of zaadballen','puberteit',q.at('eierstokken'),[XR,YB(3.85)],'left']];
  nieren(0.6);
  K.forEach(([k,naam,taak,tk,[lx,ly],al])=>{ const a=k==='bij'?1:ramp(t,tk,0.4); klier(k,a,t>tk&&t<tk+2.5&&k!=='bij',t); naamBij(ctx,naam,taak,lx,ly,a,al,C.paars); });
  pill(ctx,400,180,'namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('hypofyse')+1.5,0.4),28);
  const tL=q.at('lang'); alpha(ctx,ramp(t,tL,0.5),()=>{ roundRect(ctx,100,600,520,230,14); shape(ctx,rgba(C.bgSchema,0.95),C.paars,1.5); text(ctx,'hormonen regelen',130,650,fTekst(34,700),C.paars); ['groeien','de puberteit','energie voor een hele dag'].forEach((s,i)=>{ alpha(ctx,ramp(t,q.at(['Groeien','puberteit','energie'][i],i===1?2:1),0.4),()=>text(ctx,'· '+s,140,705+i*42,fTekst(32),C.text)); }); });
  meta7(t); },
// ---- H3: vergelijking app en omroep ----
s11(ctx,t,q){ bg(ctx,'schema'); const tAp=q.at('appje'), tOm=q.at('omroep'), tW=q.at('Welk');
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,700); ctx.lineTo(1760,700); ctx.stroke();
  alpha(ctx,ramp(t,0.1,0.5),()=>{ text(ctx,'zenuwstelsel',560,170,fTitel(56),C.teal,'center'); });
  alpha(ctx,ramp(t,tOm-0.3,0.5),()=>{ text(ctx,'hormoonstelsel',1360,170,fTitel(56),C.paars,'center'); });
  alpha(ctx,ramp(t,tAp,0.4),()=>{ telefoon(400,380,1.1,1); arrow(ctx,470,380,640,380,C.teal,5,18,ramp(t,tAp+0.5,0.4)); spierSpoel(720,380,ramp(t,tAp+0.9,0.3)*(1-ramp(t,tAp+1.8,0.4)),t); metaText(ctx,'één spier',720,490,C.text2,'center',22); });
  alpha(ctx,ramp(t,tOm,0.4),()=>{ luidspreker(1150,380,1,t,1); metLijf(1560,600,340,()=>{ lijf(1); adrenaline(ramp(t,tOm+0.4,2.4),1,46); }); metaText(ctx,'het hele lichaam',1560,650,C.text2,'center',22); });
  const R=[['SNEL','LANGZAMER',q.at('Snel'),q.at('Langzamer')],['ÉÉN PLEK','OVERAL',q.at('plek'),q.at('overal')],['KORT','LANG',q.at('kort'),q.at('lang',2)]];
  R.forEach(([a,b,ta,tb],i)=>{ metaText(ctx,a,560,760+i*44,C.teal,'center',28); metaText(ctx,b,1360,760+i*44,C.paars,'center',28); ctx.save(); ctx.globalAlpha=0; ctx.restore(); });
  // rijen verschijnen op de woorden (overdekken met achtergrond tot het woord)
  R.forEach(([a,b,ta,tb],i)=>{ const y=760+i*44; ctx.save(); ctx.fillStyle=C.bgSchema; ctx.globalAlpha=1-ramp(t,ta,0.3); ctx.fillRect(360,y-32,400,42); ctx.globalAlpha=1-ramp(t,tb,0.3); ctx.fillRect(1160,y-32,400,42); ctx.restore(); });
  },
// ---- H3: groeien = hormoon; samenwerking; tijdlijn alarm ----
s13(ctx,t,q){ bg(ctx,'schema'); const tSa=q.at('samen'), tTe=q.at('Terug',2), tTw=q.at('Twee',2);
  if(t<tSa-0.3){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,700); ctx.lineTo(1760,700); ctx.stroke(); text(ctx,'zenuwen',560,200,fTitel(56),C.teal,'center'); text(ctx,'hormonen',1360,200,fTitel(56),C.paars,'center');
    const cards=[['groeien',1360,q.at('Groeien'),C.paars],['knipperen',560,q.at('Knipperen'),C.teal],['voet terugtrekken',560,q.at('terugtrekken'),C.teal]];
    cards.forEach(([s,x,tc,col],i)=>{ const u=ramp(t,tc,0.8); const y0=420, yy=lerp(y0,330+(i===2?160:i===1?20:80),u); const xx=lerp(960,x,u); pill(ctx,xx,yy,s,u>0.9?col:C.text,1,34); });
    return; }
  if(t<tTe-0.3){ // hersenen -> zenuwen en hypofyse -> klieren
    const a=ramp(t,tSa-0.3,0.4); alpha(ctx,a,()=>{ { const HHb=170/0.33; metLijf(960,220-0.3*HHb+7.3*HHb,7.3*HHb,()=>{ ctx.save(); anBrain(1,0.35); ctx.restore(); }); } naamBij(ctx,'hersenen','',760,200,1,'right',C.goud);
      arrow(ctx,860,310,560,500,C.teal,5,18,ramp(t,q.at('zenuwen'),0.4)); text(ctx,'zenuwen',520,560,fTekst(38,600),C.teal,'center');
      arrow(ctx,1060,310,1300,440,C.teal,5,18,ramp(t,q.at('hypofyse'),0.4)); dot(ctx,1340,470,22,C.paars,lighten(C.paars,0.4),2); alpha(ctx,ramp(t,q.at('hypofyse'),0.4),()=>text(ctx,'hypofyse',1340,540,fTekst(38,600),C.paars,'center'));
      [[1180,700],[1340,720],[1500,700]].forEach(([x,y],i)=>{ arrow(ctx,1340,560,x,y-30,C.paars,4,14,ramp(t,q.at('andere')+i*0.2,0.4)); dot(ctx,x,y,16,C.paars,lighten(C.paars,0.4),2); }); alpha(ctx,ramp(t,q.at('andere'),0.4),()=>metaText(ctx,'andere hormoonklieren',1340,790,C.text2,'center',24)); });
    return; }
  // tijdlijn
  const x0=220,x1=1700,y0=700; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y0); ctx.moveTo(x0,y0); ctx.lineTo(x0,300); ctx.stroke();
  metaText(ctx,'alarm',x0,y0+40,C.text2,'center',22); metaText(ctx,'1 s',x0+110,y0+40,C.text2,'center',22); metaText(ctx,'minuten',x0+900,y0+40,C.text2,'center',22);
  const u1=ramp(t,q.at('opspringen'),1.0), u2=ramp(t,q.at('adrenaline'),2.0);
  ctx.save(); ctx.beginPath(); ctx.rect(x0,250,(x1-x0)*Math.max(u1*0.1,u2),460); ctx.clip();
  ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0+20,340); ctx.lineTo(x0+60,y0); ctx.lineTo(x1,y0); ctx.stroke();
  if(u2>0){ ctx.strokeStyle=C.paars; ctx.beginPath(); ctx.moveTo(x0,y0); for(let i=0;i<=100;i++){ const x=x0+(x1-x0)*i/100, f=i/100; const y=y0-300*(1-Math.exp(-f*14))*Math.exp(-f*2.6); ctx.lineTo(x,y); } ctx.stroke(); }
  ctx.restore();
  naamBij(ctx,'zenuwen: opspringen','in minder dan een seconde',x0+80,330,u1,'left',C.teal);
  naamBij(ctx,'adrenaline: hart bonkt door','minutenlang',x0+520,420,u2,'left',C.paars);
  haak(ctx,x0+40,x1-40,y0+70,'twee orgaanstelsels, één reactie',C.groen,ramp(t,tTw,0.5));
},
// ---- samenvatting ----
s14(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zenuwstelsel'), tH=q.at('hormoonstelsel'), tD=q.at('Dus');
  if(t<tD-0.3){ text(ctx,'Je organen praten op twee manieren',W/2,150,fTitel(60),C.text,'center');
    [[480,'zenuwstelsel',C.teal,tZ,['zintuig → zenuw → hersenen','→ ruggenmerg → spier','snel · kort · één plek']],[1440,'hormoonstelsel',C.paars,tH,['hormoonklier → bloed','→ organen die het herkennen','langzamer · overal · lang']]].forEach(([x,ttl,col,tt,rg])=>{ alpha(ctx,ramp(t,tt-0.2,0.5),()=>{ roundRect(ctx,x-380,220,760,420,16); shape(ctx,rgba(C.bgSchema,0.95),col,2); text(ctx,ttl,x,300,fTitel(52),col,'center'); rg.forEach((s,i)=>text(ctx,s,x,390+i*72,fTekst(i===2?40:36,i===2?700:400),i===2?col:C.text,'center')); }); });
    return; }
  lijf(1); zenuwnet(0.5); nieren(0.7); beenSpieren(1,0); klier('bij',1); anHeart(1,t*12,0.4*ramp(t,q.at('hart'),0.4)); adrenaline(1,ramp(t,tD,0.4),30);
  puls(PAD.been(-1),(t*0.6)%1.2,ramp(t,q.at('benen'),0.4)); puls(PAD.been(1),(t*0.6+0.5)%1.2,ramp(t,q.at('benen'),0.4));
  naamBij(ctx,'benen','via je zenuwen',XR,P7.beenR[1],ramp(t,q.at('benen'),0.4),'left',C.teal);
  naamBij(ctx,'hart','via adrenaline in je bloed',XL,YB(2.25),ramp(t,q.at('hart'),0.4),'right',C.paars);
},
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'zenuwen en hormonen',120,260,C.grain,'left',26);
  const P=[['Liniaalproef','Laat een klasgenoot een liniaal vallen tussen je duim en vinger. Hoeveel cm valt hij voor je hem vangt? Welke weg neemt het bericht?'],['Zenuw of hormoon?','Sorteer: knipperen, groeien, puberteit, je hand van de kachel, trillen na een schrik, een bal vangen.'],['Rondleiding','Kijk nog eens Een rondleiding door je lichaam. Wijs de hormoonklieren en het zenuwstelsel aan.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Je hart bonkt nog minuten na de schrik, je benen trillen al niet meer. Hoe kan dat?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
