// ===== lib32b.js — gedeelde tekeningen voor de 32B-films (voortbestaan van leven) =====
// Part C: erfelijkheid/DNA/genen = paars; planten groen; dieren oker/bruin; warmte koraal, koud/water teal; focus goud.
// Alles tekent op de globale ctx van de speler. Geen grain, labels met naamBij (geen wijslijnen).

const DAG = { lucht:'#6E8CA8', luchtL:'#8EA8BF', gras:'#5F8A50', grasD:'#4E7742', aarde:'#3A2E24', aardeL:'#5A4636', water:'#2A6E7E', zand:'#C9A86A' };
const BOON = { stengel:'#5FA86E', blad:'#6FB57C', bladR:'#9ACB8E', bleek:'#C8CC86', bleekR:'#E0E2B0', peul:'#7FB060' };

// ---------- achtergronden ----------
function tuinDag(o={}){ // Macro-dag tuin: lucht, achtergrond-heg, grasstrook, aarde-bed vanaf yb
  const yb=o.yb||760; ctx.fillStyle=DAG.lucht; ctx.fillRect(0,0,W,H); ctx.fillStyle=DAG.luchtL; ctx.fillRect(0,yb-330,W,140);
  ctx.fillStyle='#4E7A58'; ctx.beginPath(); ctx.moveTo(0,yb-190); for(let x=0;x<=W;x+=60){ ctx.lineTo(x,yb-200-18*Math.sin(x*0.013)-10*hash(x)); } ctx.lineTo(W,yb-120); ctx.lineTo(0,yb-120); ctx.fill();
  ctx.fillStyle=DAG.gras; ctx.fillRect(0,yb-130,W,130); ctx.fillStyle=DAG.aarde; ctx.fillRect(0,yb,W,H-yb);
  ctx.strokeStyle=DAG.aardeL; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,yb); ctx.lineTo(W,yb); ctx.stroke();
  if(o.zon!==false){ dot(ctx,o.zx||1700,o.zy||120,52,'#F2D27A','#F8E6A8',2); }
}
function schuur(x,yb,w=420,h=420,a=1){ alpha(ctx,a,()=>{ // houten schuurtje, zijaanzicht
  ctx.fillStyle='#6B5440'; ctx.fillRect(x,yb-h,w,h); ctx.strokeStyle='#8A6E52'; ctx.lineWidth=2; for(let i=1;i<9;i++){ ctx.beginPath(); ctx.moveTo(x+i*w/9,yb-h); ctx.lineTo(x+i*w/9,yb); ctx.stroke(); }
  ctx.fillStyle='#4A3A2C'; ctx.beginPath(); ctx.moveTo(x-30,yb-h); ctx.lineTo(x+w/2,yb-h-130); ctx.lineTo(x+w+30,yb-h); ctx.closePath(); ctx.fill();
  roundRect(ctx,x+w*0.35,yb-h*0.62,w*0.3,h*0.62,6); shape(ctx,'#58442F','#8A6E52',2); }); }
function schaduwVlak(x0,x1,yb,a=1){ alpha(ctx,a*0.35,()=>{ ctx.fillStyle='#0D1420'; ctx.beginPath(); ctx.moveTo(x0,yb-520); ctx.lineTo(x1,yb-520); ctx.lineTo(x1+60,yb); ctx.lineTo(x0,yb); ctx.closePath(); ctx.fill(); }); }
function sloot(x,y,w,h,warm=0,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x,y,w,h,30); shape(ctx,DAG.water,lighten(DAG.water,0.35),2); ctx.strokeStyle=rgba('#F2F2EE',0.25); ctx.lineWidth=2; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(x+40+k*90,y+30+k*18); ctx.lineTo(x+110+k*90,y+30+k*18); ctx.stroke(); }
  if(warm){ ctx.strokeStyle=rgba(C.koraal,0.6*warm); ctx.lineWidth=3; ctx.strokeRect(x-6,y-6,w+12,h+12); } }); }

// ---------- planten ----------
// boonPlant: x, grondlijn yg, schaal s, groei g (0 zaadje .. 1 volgroeid), etiol (0 normaal .. 1 lang/dun/bleek), extra: {bloem, peul}
function boonPlant(x,yg,s=1,g=1,etiol=0,o={}){ if(g<=0.01) return; const a=o.a==null?1:o.a; alpha(ctx,a,()=>{
  const hT=(130+290*g)*s*(1+0.5*etiol), lw=Math.max(2,(9-5*etiol)*s*Math.min(1,0.4+g));
  const sc=_mixHex(BOON.stengel,BOON.bleek,etiol), bc=_mixHex(BOON.blad,BOON.bleek,etiol), br=_mixHex('#9ACB8E',BOON.bleekR,etiol);
  if(o.zaad){ ctx.beginPath(); ctx.ellipse(x,yg+18*s,16*s,10*s,0.2,0,6.283); shape(ctx,'#C9A35C','#E0C48A',1.5); }
  ctx.strokeStyle=sc; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.quadraticCurveTo(x+10*s*Math.sin(x),yg-hT*0.5,x+4*s,yg-hT); ctx.stroke();
  const nb=Math.max(1,Math.round(1+5*g)), bs=(1-0.55*etiol)*s*(0.5+0.5*g);
  for(let k=0;k<nb;k++){ const d=k%2?1:-1, yy=yg-hT*(0.25+0.7*k/Math.max(1,nb)); ctx.save(); ctx.translate(x+2*s,yy); ctx.rotate(d*(0.55+0.15*etiol));
    ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(d*40*bs,-30*bs,d*92*bs,0); ctx.quadraticCurveTo(d*40*bs,30*bs,0,0); shape(ctx,bc,br,1.5);
    ctx.strokeStyle=rgba('#1E2E4A',0.25); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*80*bs,0); ctx.stroke(); ctx.restore(); }
  if(o.bloem>0.01) alpha(ctx,o.bloem,()=>{ for(let k=0;k<3;k++){ const yy=yg-hT*(0.45+0.17*k), xx=x+(k%2?34:-30)*s; ctx.beginPath(); ctx.ellipse(xx,yy,13*s,9*s,0.4,0,6.283); shape(ctx,'#F2F2EE','#D9DEE6',1.2); ctx.beginPath(); ctx.ellipse(xx+(k%2?8:-8)*s,yy-4*s,8*s,7*s,0,0,6.283); shape(ctx,'#E8B8C8','#F2D8E0',1); } });
  if(o.peul>0.01) alpha(ctx,o.peul,()=>{ for(let k=0;k<3;k++){ const yy=yg-hT*(0.4+0.17*k), xx=x+(k%2?28:-24)*s; ctx.save(); ctx.translate(xx,yy); ctx.rotate(k%2?0.25:-0.25); roundRect(ctx,-9*s,0,18*s,90*s*o.peul,9*s); shape(ctx,BOON.peul,'#A8D088',1.5); for(let j=0;j<4;j++) dot(ctx,0,14*s+j*20*s*o.peul,4*s,rgba('#2F4A3A',0.35)); ctx.restore(); } });
}); }
function zaadje(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,26*s,17*s,0.2,0,6.283); shape(ctx,'#C9A35C','#E0C48A',2); ctx.strokeStyle='#8C6A3A'; ctx.lineWidth=2*s; ctx.beginPath(); ctx.arc(x-4*s,y-2*s,6*s,0.5,2.6); ctx.stroke(); }); }
function kiemplant(x,y,s=1,a=1){ alpha(ctx,a,()=>{ zaadje(x,y+8*s,s*0.9); ctx.strokeStyle='#D9CFA8'; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x,y+18*s); ctx.quadraticCurveTo(x-6*s,y+50*s,x+4*s,y+70*s); ctx.stroke();
  ctx.strokeStyle=BOON.stengel; ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+10*s,y-40*s,x,y-70*s); ctx.stroke();
  [-1,1].forEach(d=>{ ctx.beginPath(); ctx.ellipse(x+d*22*s,y-74*s,24*s,12*s,d*0.4,0,6.283); shape(ctx,BOON.blad,'#9ACB8E',1.5); }); }); }
function peulOpen(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(-0.3); roundRect(ctx,-80*s,-18*s,160*s,36*s,18*s); shape(ctx,BOON.peul,'#A8D088',2); for(let j=0;j<4;j++){ ctx.beginPath(); ctx.ellipse(-54*s+j*36*s,0,14*s,10*s,0,0,6.283); shape(ctx,'#C9A35C','#E0C48A',1.2); } ctx.restore(); }); }
function bloeiendeTak(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.strokeStyle=BOON.stengel; ctx.lineWidth=6*s; ctx.beginPath(); ctx.moveTo(x,y+80*s); ctx.lineTo(x,y-60*s); ctx.stroke(); [[-1,20],[1,-10]].forEach(([d,yy])=>{ ctx.beginPath(); ctx.ellipse(x+d*40*s,y+yy*s,40*s,16*s,d*0.4,0,6.283); shape(ctx,BOON.blad,'#9ACB8E',1.5); });
  for(let k=0;k<3;k++){ const yy=y-60*s+k*22*s, xx=x+(k%2?20:-18)*s; ctx.beginPath(); ctx.ellipse(xx,yy,14*s,10*s,0.4,0,6.283); shape(ctx,'#F2F2EE','#D9DEE6',1.2); ctx.beginPath(); ctx.ellipse(xx+(k%2?9:-9)*s,yy-5*s,9*s,8*s,0,0,6.283); shape(ctx,'#E8B8C8','#F2D8E0',1); } }); }
function hortensia(x,yg,s=1,kleur=null,a=1){ alpha(ctx,a,()=>{ // struik met bolle bloemschermen; kleur null = groen in knop
  ctx.fillStyle='#4E8A5C'; for(let k=0;k<9;k++){ const ax=x+(hash(k*3.1)-0.5)*220*s, ay=yg-60*s-hash(k*5.3)*160*s; ctx.beginPath(); ctx.ellipse(ax,ay,46*s,26*s,(hash(k)-0.5)*1.4,0,6.283); shape(ctx,'#5FA86E','#8FC49A',1.2); }
  const pos=[[-70,-200],[40,-235],[100,-150],[-20,-130],[-120,-120]];
  pos.forEach(([dx,dy],k)=>{ const cx=x+dx*s, cy=yg+dy*s, r=48*s; const c=kleur||'#9ACB8E';
    for(let j=0;j<16;j++){ const an=hash(k*20+j)*6.283, d=Math.sqrt(hash(k*20+j+7))*r; ctx.beginPath(); ctx.arc(cx+Math.cos(an)*d,cy+Math.sin(an)*d,11*s,0,6.283); shape(ctx,c,lighten(c,0.35),1); } }); }); }
function stekje(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.strokeStyle='#5FA86E'; ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-70*s); ctx.stroke(); [-1,1].forEach(d=>{ ctx.beginPath(); ctx.ellipse(x+d*24*s,y-60*s,26*s,12*s,d*0.5,0,6.283); shape(ctx,'#5FA86E','#8FC49A',1.2); }); }); }
function bloempot(x,yg,w=150,h=110,a=1,kleur='#B0603A'){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x-w/2,yg-h); ctx.lineTo(x+w/2,yg-h); ctx.lineTo(x+w*0.38,yg); ctx.lineTo(x-w*0.38,yg); ctx.closePath(); shape(ctx,kleur,lighten(kleur,0.3),2); ctx.fillStyle=DAG.aarde; ctx.fillRect(x-w/2+8,yg-h-6,w-16,12); }); }

// ---------- dieren ----------
function kikkerEi(x,y,s=1,a=1){ alpha(ctx,a,()=>{ for(let k=0;k<11;k++){ const dx=(hash(k*2.2)-0.5)*70*s, dy=(hash(k*3.3)-0.5)*50*s; dot(ctx,x+dx,y+dy,13*s,rgba('#DDE6EE',0.55),'#E6ECF2',1); dot(ctx,x+dx,y+dy,5*s,'#2A2119'); } }); }
// kikkervisje: pootjes 0..1, staart 1..0
function kikkervisje(x,y,s=1,poot=0,staart=1,a=1,t=0,dir=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1);
  if(staart>0.02){ const L=90*s*staart; ctx.fillStyle='#4A5A40'; ctx.beginPath(); ctx.moveTo(-20*s,-8*s); ctx.quadraticCurveTo(-20*s-L*0.6,-14*s+Math.sin(t*6)*8*s,-20*s-L,Math.sin(t*6)*12*s); ctx.quadraticCurveTo(-20*s-L*0.6,14*s+Math.sin(t*6)*8*s,-20*s,8*s); ctx.closePath(); ctx.fill(); }
  if(poot>0.02){ ctx.strokeStyle='#5A6A48'; ctx.lineWidth=6*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-10*s,14*s); ctx.lineTo(-28*s,14*s+26*s*poot); ctx.lineTo(-10*s,20*s+30*s*poot); ctx.stroke(); if(poot>0.5){ ctx.beginPath(); ctx.moveTo(18*s,14*s); ctx.lineTo(28*s,14*s+22*s*(poot-0.5)*2); ctx.stroke(); } }
  ctx.beginPath(); ctx.ellipse(0,0,32*s,24*s,0,0,6.283); shape(ctx,'#5A6A48','#7E8E6A',1.5); dot(ctx,16*s,-8*s,4*s,'#1A1410'); ctx.restore(); }); }
function kikker(x,y,s=1,a=1,dir=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); const g='#6E9A50', gr='#9AC27A';
  ctx.strokeStyle=g; ctx.lineWidth=12*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-30*s,10*s); ctx.lineTo(-70*s,0); ctx.lineTo(-50*s,34*s); ctx.lineTo(-80*s,40*s); ctx.stroke(); ctx.lineWidth=8*s; ctx.beginPath(); ctx.moveTo(26*s,16*s); ctx.lineTo(36*s,40*s); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0,0,58*s,34*s,-0.15,0,6.283); shape(ctx,g,gr,1.5); ctx.beginPath(); ctx.ellipse(34*s,-14*s,28*s,22*s,0,0,6.283); shape(ctx,g,gr,1.5);
  dot(ctx,40*s,-34*s,11*s,g,gr,1.5); dot(ctx,42*s,-35*s,4*s,'#1A1410'); ctx.fillStyle=rgba('#E8E4C8',0.5); ctx.beginPath(); ctx.ellipse(6*s,14*s,36*s,12*s,0,0,3.14); ctx.fill(); ctx.restore(); }); }
// Siamese kat, zijaanzicht; punten = 0..1 hoe donker de koele delen zijn; warm = 0..1 warmtekaart (koraal lijf, teal uiteinden)
function siamees(x,y,s=1,punten=1,warm=0,a=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  const licht='#EFE4CC', donker=_mixHex('#EFE4CC','#4A3426',punten);
  const P=(c)=> warm>0.01? _mixHex(c==='d'?donker:licht, c==='d'?'#5BA4C9':'#E07A5F', 0.55*warm) : (c==='d'?donker:licht);
  // staart
  ctx.strokeStyle=P('d'); ctx.lineWidth=22; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-150,-40); ctx.quadraticCurveTo(-240,-60+Math.sin(t*1.5)*10,-230,-170); ctx.stroke();
  // poten
  [-110,-60,70,120].forEach((dx,i)=>{ ctx.strokeStyle=P('l'); ctx.lineWidth=30; ctx.beginPath(); ctx.moveTo(dx,0); ctx.lineTo(dx,70); ctx.stroke(); ctx.strokeStyle=P('d'); ctx.beginPath(); ctx.moveTo(dx,70); ctx.lineTo(dx,120); ctx.stroke(); });
  // lijf
  ctx.beginPath(); ctx.ellipse(0,-20,170,80,0,0,6.283); ctx.fillStyle=P('l'); ctx.fill();
  // kop
  ctx.beginPath(); ctx.ellipse(190,-90,70,62,0,0,6.283); ctx.fillStyle=P('l'); ctx.fill();
  ctx.fillStyle=P('d'); [[150,-140,1],[225,-145,-1]].forEach(([ox,oy,d])=>{ ctx.beginPath(); ctx.moveTo(ox-28,oy+10); ctx.lineTo(ox+d*4,oy-62); ctx.lineTo(ox+28,oy+14); ctx.closePath(); ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(225,-72,44,36,0,0,6.283); ctx.fill(); // snuitmasker
  dot(ctx,205,-100,7,'#5BA4C9'); dot(ctx,207,-101,3,'#1A1410'); dot(ctx,258,-70,6,'#3A2A20');
  ctx.restore(); }); }

// ---------- schema: cyclus, genen, milieu ----------
// ring van stappen; items: [{draw(x,y), naam, t}] ; lit(i)=0..1 ; pijlen tussen de stappen
function cyclusRing(cx,cy,R,items,lit,o={}){ const n=items.length;
  items.forEach((it,i)=>{ const an=-Math.PI/2+i*6.283/n, x=cx+Math.cos(an)*R, y=cy+Math.sin(an)*R*0.82, a=lit(i);
    if(a>0.01){ alpha(ctx,a,()=>{ it.draw(x,y); naamBij(ctx,it.naam,'',x,y+(it.ly||70),1,'center',it.kleur||C.text); }); }
    const a2=-Math.PI/2+(i+1)*6.283/n, nxt=lit((i+1)%n); const pa=Math.min(a,nxt);
    if(pa>0.01&&(i<n-1||o.sluit)){ const am=(an+a2)/2; ctx.save(); ctx.globalAlpha*=pa; ctx.strokeStyle=C.line; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(cx,cy,R,R*0.82,0,an+0.42,a2-0.42); ctx.stroke();
      const ex=cx+Math.cos(a2-0.42)*R, ey=cy+Math.sin(a2-0.42)*R*0.82, tx=-Math.sin(a2-0.42), ty=Math.cos(a2-0.42)*0.82, L=Math.hypot(tx,ty), ux=tx/L, uy=ty/L;
      ctx.fillStyle=C.line; ctx.beginPath(); ctx.moveTo(ex+ux*12,ey+uy*12); ctx.lineTo(ex-uy*9,ey+ux*9); ctx.lineTo(ex+uy*9,ey-ux*9); ctx.closePath(); ctx.fill(); ctx.restore(); }
  });
}
// genStreep: erfelijke informatie als een streep met vakjes (genen) in tinten paars; hl = index van het gemarkeerde gen
function genStreep(x,y,w,h=34,a=1,hl=-1,hlA=0,kleuren=null){ alpha(ctx,a,()=>{ const n=kleuren?kleuren.length:9;
  for(let i=0;i<n;i++){ const xx=x+i*w/n; roundRect(ctx,xx+2,y,w/n-4,h,6); const c=kleuren?kleuren[i]:[C.paars,'#A392D6','#6E5A9E'][i%3]; shape(ctx,rgba(c,0.55),lighten(c,0.35),1.2);
    if(i===hl&&hlA>0.01){ ctx.save(); ctx.globalAlpha*=hlA; roundRect(ctx,xx-2,y-6,w/n+4,h+12,8); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); } } }); }
function zonIcoon(x,y,r=34,a=1){ alpha(ctx,a,()=>{ dot(ctx,x,y,r,'#F2D27A','#F8E6A8',2); ctx.strokeStyle='#F2D27A'; ctx.lineWidth=4; for(let k=0;k<8;k++){ const an=k*0.785; ctx.beginPath(); ctx.moveTo(x+Math.cos(an)*(r+10),y+Math.sin(an)*(r+10)); ctx.lineTo(x+Math.cos(an)*(r+24),y+Math.sin(an)*(r+24)); ctx.stroke(); } }); }
function druppel(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.moveTo(x,y-26*s); ctx.quadraticCurveTo(x+22*s,y,x+16*s,y+10*s); ctx.arc(x,y+8*s,17*s,0.1,3.04); ctx.quadraticCurveTo(x-22*s,y,x,y-26*s); shape(ctx,rgba(C.teal,0.6),lighten(C.teal,0.3),1.5); }); }
function bordje(x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,60*s,22*s,0,0,6.283); shape(ctx,'#E6E9EE','#9AA3B2',2); dot(ctx,x-18*s,y-6*s,12*s,C.oker); dot(ctx,x+16*s,y-4*s,10*s,'#7FC48F'); dot(ctx,x+2*s,y+6*s,9*s,'#E07A5F'); }); }
function thermo(x,y,h,niveau,a=1,kleur=C.koraal){ alpha(ctx,a,()=>{ roundRect(ctx,x-12,y-h,24,h,12); shape(ctx,rgba(C.bgMicro,0.8),C.line,2); dot(ctx,x,y+12,20,kleur,lighten(kleur,0.3),2); roundRect(ctx,x-6,y-h*niveau,12,h*niveau+8,6); ctx.fillStyle=kleur; ctx.fill(); }); }
function kaart(x,y,w,h,rand=C.line,a=1,vul=null){ alpha(ctx,a,()=>{ roundRect(ctx,x,y,w,h,16); shape(ctx,vul||rgba(C.bgSchema,0.95),rand,1.5); }); }
function vraagteken(x,y,a=1,px=110){ alpha(ctx,a,()=>text(ctx,'?',x,y,fTitel(px),C.goud,'center')); }
function meta32b(s='schematisch · niet op schaal'){ metaText(ctx,s,W-40,CAPTION_Y-14,C.text2,'right',22); }
// celkern met chromatine-draden (paars), voor 'bouwtekening'
function kernDraden(x,y,r,a=1,t=0,hlA=0){ alpha(ctx,a,()=>{ nucleus(ctx,x,y,r,1,t); ctx.lineCap='round';
  for(let k=0;k<6;k++){ ctx.strokeStyle=rgba('#C9BCF0',0.7); ctx.lineWidth=3; ctx.beginPath(); for(let j=0;j<=24;j++){ const u=j/24, an=hash(k*7)*6.283+u*2.6, rr=r*(0.15+0.6*hash(k*3+j*0.01)); const px=x+Math.cos(an+Math.sin(u*9+k)*0.4)*rr*u*1.1, py=y+Math.sin(an+Math.cos(u*7+k)*0.4)*rr*u*1.1; j?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); }
  if(hlA>0.01){ ctx.save(); ctx.globalAlpha*=hlA; ctx.strokeStyle=C.goud; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(x-r*0.25,y-r*0.1); ctx.quadraticCurveTo(x,y-r*0.3,x+r*0.25,y-r*0.05); ctx.stroke(); ctx.restore(); } }); }
