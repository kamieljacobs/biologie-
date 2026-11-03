// ===== Zenuw- en hormoonstelsel — scènes (kerndoelen onderbouw, film 7) =====
// Kleuren (Part C): zenuwsignaal teal, hormoon en hormoonklieren paars, spieren koraal, goud = focus.
// Lichaam: eigen schema (silhouet `human` + overlays), niet bodyOrgans: daar staat het zenuwstelsel paars.

// ---------- algemene hulpjes film 7 ----------
// Lichaam (versie 1.1, 22 okt 2026): het realistische lichaam uit lib_anatomie.js (zelfde als film 2b), organen op hun echte plek.
// 'Jij' is Lotte uit het castboek (vaste 'jij' in de onderbouwreeks, 22 okt 2026; Sam en Noor zijn klasgenoten) (cold open, plein, inzetjes). Kleuren film 7: zenuwen neutraal, zenuwsignaal teal, hormoonklieren en adrenaline paars, spieren rood.
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
function z7Lijn(pts,col,w,glow=0){ ctx.save(); if(glow){ ctx.shadowColor=col; ctx.shadowBlur=0*14*glow; } anLine(pts,col,w); ctx.restore(); }
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
    anBrain(1,G('brein')?0.5:0); if(G('brein')){ ctx.save(); ctx.shadowColor=C.goud; ctx.shadowBlur=0*18; anPath(ctx,APs(BREIN_VORM)); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }
    // gehoorzenuw van het oor naar de hersenen
    z7Lijn(Z7.oor,G('oorzenuw')||G('zenuw')?C.goud:NEU,0.03*HH,G('oorzenuw')?1:0);
    if(G('oor')){ const [ex,ey]=AP(0.385,0.53); ctx.save(); ctx.shadowColor=C.goud; ctx.shadowBlur=0*16; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(ex,ey,0.11*HH,0.17*HH,0,0,6.283); ctx.stroke(); ctx.restore(); }
  }); }
// beenspieren (dijbeen en kuit), kort 0..1 = de spier trekt samen (korter en dikker)
function beenSpieren(a=1,kort=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ for(const s of [-1,1]){ const M=p=>anMir(p,s);
  [[[0.34,3.75],[0.72,3.8],[0.7,4.4],[0.56,5.05],[0.38,5.1],[0.3,4.5]],[[0.42,5.35],[0.56,5.45],[0.6,5.9],[0.52,6.35],[0.44,6.1]]].forEach((pts,j)=>{
    const y0=pts[0][1], cxm=pts.reduce((q,p)=>q+p[0],0)/pts.length; const ky=1-0.16*kort, kx=1+0.12*kort;
    const P=M(pts.map(p=>[cxm+(p[0]-cxm)*kx,y0+(p[1]-y0)*ky]));
    ctx.save(); if(kort>0.05){ ctx.shadowColor=C.koraal; ctx.shadowBlur=0*22*kort; } anShape(P,ANA.spier,ANA.spierL,1.5); ctx.restore();
    ctx.save(); ctx.globalAlpha*=0.45; const f=M([[cxm+0.05,y0+0.12*ky],[cxm+0.07,y0+(j?0.8:1.2)*ky]].map(p=>[cxm+(p[0]-cxm)*kx,p[1]])); anLine(f,ANA.spierL,1.2); ctx.restore(); }); } }); }
// puls: teal stip langs een pad (lijst punten in px), u = 0..1
function padPunt(pad,u){ const L=[]; let tot=0; for(let i=1;i<pad.length;i++){ const d=Math.hypot(pad[i][0]-pad[i-1][0],pad[i][1]-pad[i-1][1]); L.push(d); tot+=d; }
  let r=clamp(u,0,1)*tot; for(let i=0;i<L.length;i++){ if(r<=L[i]) { const f=L[i]?r/L[i]:0; return [lerp(pad[i][0],pad[i+1][0],f),lerp(pad[i][1],pad[i+1][1],f)]; } r-=L[i]; } return pad[pad.length-1]; }
function puls(pad,u,a=1,kleur=C.teal){ if(a<=0.01||u<=0||u>=1.02) return; const [x,y]=padPunt(pad,u); alpha(ctx,a,()=>{ ctx.save(); ctx.shadowColor=kleur; ctx.shadowBlur=0*16; ctx.strokeStyle=kleur; ctx.lineWidth=5; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); const u0=Math.max(0,u-0.1); for(let k=0;k<=8;k++){ const [px,py]=padPunt(pad,u0+(u-u0)*k/8); k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); dot(ctx,x,y,9,kleur,lighten(kleur,0.45),2); ctx.restore(); }); }
// paden van de pulsen (functies: ze volgen BODY, ook binnen metLijf)
const PAD={ oor:()=>anDense(Z7.oor,30),
  been:s=>anDense([[0,0.36],[0,0.62],[0,1.6],[0,2.6],[s*0.01,3.25],[s*0.2,3.7],[s*0.35,4.0],[s*0.38,4.5]],80),
  bij:()=>anDense([[0,0.36],[0,0.62],[0,1.6],[0,2.5],[0.12,2.66],[0.3,2.82]],60) };
// hormoonklieren (paars), op hun echte plek
function klierGlow(hl){ if(hl){ ctx.shadowColor=C.goud; ctx.shadowBlur=0*22; } else { ctx.shadowColor=C.paars; ctx.shadowBlur=0*10; } }
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
function lever(a=1,hl=false){ if(a<=0.01) return; liver(a,hl?0.7:0); if(hl){ ctx.save(); ctx.globalAlpha*=a; ctx.shadowColor=C.goud; ctx.shadowBlur=0*14; anPath(ctx,APs(AN_LEVER)); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); } }
// adrenaline: paarse deeltjes van de bijnieren naar doelen door het hele lichaam (deterministisch, lichaamscoördinaten)
const ADR_DOEL=[]; for(let i=0;i<46;i++){ const r=hash(i*3.7), h1=hash(i*1.3), h2=hash(i*2.9), sd=hash(i*5.1)<0.5?-1:1; let x,y;
  if(r<0.12){ x=(h1-0.5)*0.5; y=0.25+h2*0.5; } else if(r<0.55){ x=(h1-0.5)*1.05; y=1.55+h2*2.2; } else if(r<0.7){ x=sd*(0.92+h1*0.2); y=1.9+h2*2.2; } else { x=sd*(0.22+h1*0.26); y=4.2+h2*2.8; } ADR_DOEL.push([x,y]); }
function adrenaline(u,a=1,n=46,verval=0){ if(a<=0.01) return; const HH=AHH(); alpha(ctx,a*(1-0.75*verval),()=>{ for(let i=0;i<n;i++){ const src=AP(i%2?-0.37:0.37,i%2?2.9:2.84), d=AP(ADR_DOEL[i][0],ADR_DOEL[i][1]); const ui=ease(clamp(u*1.4-hash(i*7.7)*0.4,0,1)); if(ui<=0) continue; const w=wander(i,u*20,0.05*HH,1); dot(ctx,lerp(src[0],d[0],ui)+w.x,lerp(src[1],d[1],ui)+w.y,Math.max(3,0.055*HH),C.paars,lighten(C.paars,0.45),1.2); } }); }
// Lotte (= jij) in een rond inzetje: plein, springt op, hart bonkt
function samInzet(cx,cy,r,a,t,o={}){ inset(cx,cy,r,a,()=>{ const k=r/150; ctx.save(); ctx.translate(cx,cy); ctx.scale(k,k);
  ctx.fillStyle='#6E8CA8'; ctx.fillRect(-160,-160,320,320); ctx.fillStyle='#3E4A62'; ctx.fillRect(-160,-150,320,170); ctx.fillStyle='#55627C'; for(let c=0;c<4;c++) for(let r2=0;r2<2;r2++){ roundRect(ctx,-140+c*75,-130+r2*80,45,55,3); ctx.fill(); }
  ctx.fillStyle='#8A8F96'; ctx.fillRect(-160,95,320,70);
  const sp=o.spring||0; persoon(ctx,'lotte',0,128-70*Math.sin(Math.PI*clamp(sp,0,1)),245,{outfit:'school',uit:o.uit||'bezorgd',pose:sp>0&&sp<1?'schouders':'staan',kijk:1,t});
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
// Lotte aan het fornuis (reflex, s06): rechterarm reikt naar de pan en schiet terug; geeft ankers voor zenuwen en labels
// weg 0..1 = hand trekt terug. De arm wordt met een eigen houding (POSES.reflex7) getekend, zelfde rekenwerk als lib_cast.
const SAM7={x:430,y:880,h:620};
function samArm(weg){ const P=CAST.lotte, h=SAM7.h*(P.lengte||1), hh=h/6.1, top=SAM7.y-h, sw=hh*1.8, sy=top+hh*1.42+hh*0.25, sx=SAM7.x+sw*0.4;
  const e=ease(weg), a1=lerp(1.12,0.22,e), a2=lerp(1.32,-2.55,e); const L1=hh*1.32, L2=hh*1.2;
  const ex=sx+Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+Math.sin(a2)*L2, hy=ey+Math.cos(a2)*L2;
  return { a1, a2, sx, sy, ex, ey, hx, hy, hh, top, rug:[SAM7.x,sy+hh*0.35], nek:[SAM7.x,top+hh*1.25], hoofd:[SAM7.x,top+hh*0.55], heup:[SAM7.x,top+hh*3.45] }; }
function fornuis(t){ const X=760, Y=560; // aanrecht met kookplaat en pan
  ctx.fillStyle='#4A5266'; ctx.fillRect(X-20,Y,560,H-Y-180+0); roundRect(ctx,X-40,Y-14,600,30,6); shape(ctx,'#6A7388','#8A93A8',2);
  ctx.strokeStyle=rgba('#22293A',0.8); ctx.lineWidth=2; ctx.strokeRect(X+20,Y+50,230,200); ctx.strokeRect(X+280,Y+50,230,200); dot(ctx,X+230,Y+150,6,'#8A93A8'); dot(ctx,X+300,Y+150,6,'#8A93A8');
  // pit met gloed
  ctx.save(); ctx.shadowColor=C.koraal; ctx.shadowBlur=0*24; ctx.beginPath(); ctx.ellipse(X+250,Y-12,110,12,0,0,6.283); ctx.fillStyle=rgba(C.koraal,0.75+0.15*Math.sin(t*9)); ctx.fill(); ctx.restore();
  // pan (opzij gezien) met steel naar links
  roundRect(ctx,X+150,Y-90,200,76,14); shape(ctx,'#3A3F48','#5A606C',2); ctx.fillStyle='#2A2E36'; ctx.fillRect(X+150,Y-90,200,12);
  ctx.save(); ctx.lineCap='round'; ctx.strokeStyle='#2A2E36'; ctx.lineWidth=16; ctx.beginPath(); ctx.moveTo(X+152,Y-74); ctx.lineTo(X+70,Y-66); ctx.stroke(); ctx.restore();
  for(let k=0;k<3;k++){ const f=((t*0.6+k/3)%1); ctx.save(); ctx.globalAlpha*=0.7*(1-f); ctx.strokeStyle='#D8DEE8'; ctx.lineWidth=4; ctx.lineCap='round'; const x0=X+190+k*60; ctx.beginPath(); ctx.moveTo(x0,Y-100-f*20); ctx.bezierCurveTo(x0+18,Y-130-f*60,x0-18,Y-160-f*80,x0+6,Y-190-f*110); ctx.stroke(); ctx.restore(); }
  return [X+80,Y-68]; }
POSES.reflex7={R:[1.12,1.32],L:[0.14,0.06]};
// spier als spoel met pezen en vezels; k = samentrekking 0..1
function spierSpoel(x,y,k,t){ const L=150*(1-0.15*k), Wd=34*(1+0.25*k); ctx.save(); ctx.translate(x,y); ctx.rotate(Math.PI/2);
  ctx.strokeStyle='#E8DCC8'; ctx.lineWidth=7; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-L/2-34,0); ctx.lineTo(-L/2+6,0); ctx.moveTo(L/2-6,0); ctx.lineTo(L/2+34,0); ctx.stroke();
  if(k>0.05){ ctx.shadowColor=C.koraal; ctx.shadowBlur=0*24*k; } ctx.beginPath(); ctx.moveTo(-L/2,0); ctx.bezierCurveTo(-L/4,-Wd,L/4,-Wd,L/2,0); ctx.bezierCurveTo(L/4,Wd,-L/4,Wd,-L/2,0); shape(ctx,ANA.spier,ANA.spierL,2); ctx.shadowBlur=0*0;
  ctx.globalAlpha*=0.5; ctx.strokeStyle=ANA.spierL; ctx.lineWidth=1.5; for(const f of [-0.5,0,0.5]){ ctx.beginPath(); ctx.moveTo(-L/2+10,0); ctx.quadraticCurveTo(0,f*Wd*1.4,L/2-10,0); ctx.stroke(); } ctx.restore(); }
function samFornuis(weg,t,uit){ const A=samArm(weg); POSES.reflex7.R=[A.a1,A.a2]; persoon(ctx,'lotte',SAM7.x,SAM7.y,SAM7.h,{outfit:'school',pose:'reflex7',uit,kijk:1,t}); return A; }

// ================= SCÈNES =================
