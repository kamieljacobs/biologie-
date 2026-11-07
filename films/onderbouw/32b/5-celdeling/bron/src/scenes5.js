// ===== 32B film 5 — Celdeling =====
// Rode draad: Sams geschaafde knie. Micro voor de cel (BEELDAFSPRAKEN: rond membraan, rustige textuur, chromatine als zachte draden).
// Chromosomen paars; van moeder paars, van vader oker (uitdaging). Mitose = teal-accent, meiose = koraal-accent.
const CHR=[ [-60,-40,0.4,64],[40,-60,-0.6,54],[-20,40,1.2,70],[70,30,0.2,46],[-80,10,-1.0,40],[10,-10,0.8,58] ];
function chromosoom(x,y,len,rot,dub=1,a=1,kleur=C.paars){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); const w=Math.max(8,len*0.2), off=dub*w*0.55;
  [-1,1].forEach(d=>{ if(dub<0.05&&d>0) return; roundRect(ctx,-len/2,-w/2+d*off*(dub>0.05?1:0),len,w,w/2); shape(ctx,rgba(kleur,0.75),lighten(kleur,0.35),1.2); });
  if(dub>0.05){ dot(ctx,0,0,w*0.45,lighten(kleur,0.2)); } ctx.restore(); }); }
function draden(cx,cy,r,t,a=1){ alpha(ctx,a,()=>{ ctx.lineCap='round'; for(let k=0;k<6;k++){ ctx.strokeStyle=rgba('#C9BCF0',0.7); ctx.lineWidth=3; ctx.beginPath(); for(let j=0;j<=20;j++){ const u=j/20, an=hash(k*7)*6.283+u*3, rr=r*0.7*(0.2+0.8*hash(k*3+j*0.05)); const px=cx+Math.cos(an+Math.sin(u*8+k+t*0.3)*0.4)*rr*u, py=cy+Math.sin(an+Math.cos(u*6+k)*0.4)*rr*u; j?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); } }); }
function celMembraan(cx,cy,rx,ry,knijp=0){ // rond membraan, knijp 0..1 snoert in het midden in
  ctx.beginPath(); for(let i=0;i<=80;i++){ const a=i/80*6.283; const pinch=1-knijp*0.9*Math.pow(Math.abs(Math.sin(a)),6)*0+0; let x=cx+Math.cos(a)*rx, y=cy+Math.sin(a)*ry; const m=Math.exp(-Math.pow(Math.cos(a)/0.35,2)); y=cy+Math.sin(a)*ry*(1-knijp*0.95*m); i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath();
  ctx.fillStyle=rgba('#AFC0D0',0.06); ctx.fill(); ctx.strokeStyle=C.er; ctx.lineWidth=2; ctx.stroke(); }
function cytoDots(cx,cy,rx,ry,n=40){ for(let i=0;i<n;i++){ const a=hash(i*17)*6.283, d=Math.sqrt(hash(i*17+1))*0.9; dot(ctx,cx+Math.cos(a)*d*rx,cy+Math.sin(a)*d*ry,1.8,rgba(C.grain,0.35)); } }
// volledige mitose als functie van fase p 0..1 : 0 kern+draden, 0.15 kopie (X), 0.35 kern open, 0.5 rij in midden, 0.65 uit elkaar, 0.8 nieuwe kernen, 1 twee cellen
function mitose(cx,cy,R,p,t,o={}){ const N=o.n||6, sx=1+0.5*ramp(p,0.6,0.35), rx=R*sx, ry=R*0.82; const knijp=ramp(p,0.82,0.18);
  if(knijp<0.98) { celMembraan(cx,cy,rx,ry,knijp); cytoDots(cx,cy,rx*0.9,ry*0.9,50); }
  else { [-1,1].forEach(d=>{ celMembraan(cx+d*rx*0.5,cy,rx*0.48,ry*0.78,0); cytoDots(cx+d*rx*0.5,cy,rx*0.4,ry*0.7,25); }); }
  const kernA=1-ramp(p,0.3,0.12), nieuwA=ramp(p,0.78,0.12);
  if(kernA>0.01){ nucleus(ctx,cx,cy,R*0.45,kernA*0.9,t); }
  if(p<0.12) draden(cx,cy,R*0.45,t,1-ramp(p,0.08,0.06));
  if(p>=0.08){ const dub=ramp(p,0.1,0.12); const rij=ramp(p,0.38,0.14), split=ramp(p,0.55,0.2);
    for(let i=0;i<N;i++){ const c=CHR[i%6]; const bx=cx+c[0]*R/160*0.9, by=cy+c[1]*R/160*0.9, len=c[3]*R/160; const rx0=cx, ry0=cy-R*0.5+i*(R/(N-1)), x=lerp(bx,rx0,rij), y=lerp(by,ry0,rij), rot=lerp(c[2],Math.PI/2,rij);
      const kl=o.kleuren?o.kleuren[i]:C.paars;
      if(split<0.02) chromosoom(x,y,len,rot,dub,1,kl);
      else [-1,1].forEach(d=>chromosoom(x+d*split*rx*0.5,y,len,rot,0,1,kl)); } }
  if(nieuwA>0.01) [-1,1].forEach(d=>{ ctx.save(); ctx.globalAlpha*=nieuwA; ctx.beginPath(); ctx.arc(cx+d*rx*0.5,cy,R*0.36,0,6.283); ctx.strokeStyle=C.kernR; ctx.lineWidth=2; ctx.setLineDash([10,6]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); });
}
function knie(x,y,s,heel,a=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.ellipse(0,0,220,150,0,0,6.283); shape(ctx,'#7A5440',_licht('#7A5440',0.2),2);
  const w=1-heel; if(w>0.02){ ctx.beginPath(); ctx.ellipse(10,-10,110*w+10,50*w+6,0.2,0,6.283); ctx.fillStyle=_mixHex('#C9503C','#7A5440',heel); ctx.fill(); for(let k=0;k<8;k++){ ctx.strokeStyle=rgba('#E07A5F',0.6*w); ctx.lineWidth=3; ctx.beginPath(); const xx=-80+k*22; ctx.moveTo(xx,-30); ctx.lineTo(xx+30,20); ctx.stroke(); } } ctx.restore(); }); }
function telBord(x,y,n,kleur,label,a=1){ alpha(ctx,a,()=>{ kaart(x-150,y-80,300,170,kleur,1); text(ctx,String(n),x,y+20,fTitel(80),kleur,'center'); metaText(ctx,label,x,y+70,C.grain,'center',22); }); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tV=q.at('valt'), tK=q.at('knie'), tW=q.at('week'), tN=q.at('nieuwe',1), tWa=q.at('Waar');
  if(t<tK-0.2){ tuinDag({yb:820,zon:true,zx:1700}); ctx.fillStyle='#6A6A70'; ctx.fillRect(0,820,W,90); persoon(ctx,'sam',900,900,520,{outfit:'zomer',pose:'schouders',uit:'bezorgd',t}); ctx.strokeStyle='#2A2F3E'; ctx.lineWidth=8; ctx.beginPath(); ctx.arc(1200,860,60,0,6.283); ctx.arc(1360,860,60,0,6.283); ctx.stroke(); return; }
  bg(ctx,'schema'); const heel=ramp(t,tW,2.5); knie(W/2,470,1.5,heel); naamBij(ctx,'knie van Sam','vergroot',W/2-380,300,1,'center',C.text); pill(ctx,W/2,150,t<tW?'geschaafd':'een week later',C.grain,1,30);
  naamBij(ctx,'nieuwe huid','',W/2,760,ramp(t,tN-0.2,0.4),'center',C.groen); vraagteken(1500,420,ramp(t,tWa,0.4)); },
// ---- titel ----
s03(ctx,t,q){ ctx.fillStyle=C.bgSchema; ctx.fillRect(0,0,W,H); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Celdeling',120,330,fTitel(100),C.text); text(ctx,'Hoe wordt één cel er twee?',120,410,fTekst(44),C.text2); });
  ctx.save(); ctx.beginPath(); ctx.arc(1440,520,330,0,6.283); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.clip(); mitose(1440,520,190,ramp(t,0.3,3.2),t); ctx.restore(); ctx.beginPath(); ctx.arc(1440,520,330,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.stroke();
  metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 5',W-80,60,C.text2,'right',24); },
// ---- H1: kopiëren ----
s04(ctx,t,q){ ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); const tD=q.at('delen'), tT=q.at('twee.'), tB=q.at('bouwtekening'), tK=q.at('celkern,'), tC=q.at('chromosomen.'), tKo=q.at('kopieert'), tX=q.at('X.');
  if(t<tB-0.4){ // huid als laag cellen, onderste delen
    for(let i=0;i<9;i++) for(let r=0;r<3;r++){ const x=200+i*190+(r%2)*95, y=300+r*170; const del=(r===2&&(i===3||i===5))?ramp(t,tD,1.6):0;
      if(del<0.5){ celMembraan(x,y,80*(1+del*0.4),70,del*1.4); nucleus(ctx,x,y,24,0.9,t); } else { celMembraan(x-40,y,60,60,0); celMembraan(x+40,y,60,60,0); nucleus(ctx,x-40,y,20,0.9,t); nucleus(ctx,x+40,y,20,0.9,t); } }
    naamBij(ctx,'huidcellen rond de wond','vergroot',W/2,140,1,'center',C.text); naamBij(ctx,'één wordt twee','',W/2,860-40,ramp(t,tT-0.6,0.4),'center',C.goud); return; }
  const p= t<tKo-0.2 ? 0 : 0.08+0.14*ramp(t,tKo,2.2);
  mitose(W/2,470,300,p,t);
  naamBij(ctx,'celkern','',W/2+170,250,ramp(t,tK-0.2,0.4)*(1-ramp(t,tKo,0.4)),'left',C.paars);
  naamBij(ctx,'chromosomen','lange draden met de bouwtekening',W/2+260,330,ramp(t,tC-0.6,0.4),'left',C.paars);
  naamBij(ctx,'gekopieerd: als een X','',W/2,860-40,ramp(t,tX-0.4,0.4),'center',C.goud); metaText(ctx,'vergroot · schematisch',60,CAPTION_Y-14,C.text2,'left',22); },
// ---- H1: de deling zelf ----
s05(ctx,t,q){ ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); const tO=q.at('open.'), tR=q.at('rij'), tU=q.at('getrokken.'), tN=q.at('nieuwe'), tS=q.at('snoert'), tTw=q.at('twee'), tP=q.at('Precies'), tM=q.at('mitose.'), tG=q.at('groei');
  const p = t<tO ? 0.22 : t<tR ? lerp(0.22,0.36,ramp(t,tO,1)) : t<tU-0.6 ? lerp(0.36,0.52,ramp(t,tR,1.2)) : t<tN ? lerp(0.52,0.72,ramp(t,tU-0.6,1.6)) : t<tS ? lerp(0.72,0.84,ramp(t,tN,1)) : lerp(0.84,1,ramp(t,tS,1.4));
  mitose(W/2,450,280,p,t);
  if(t>tP-0.3) alpha(ctx,ramp(t,tP-0.3,0.4)*(1-ramp(t,tM+1.5,0.4)),()=>{ naamBij(ctx,'dezelfde bouwtekening','6 = 6',W/2,820,1,'center',C.paars); });
  alpha(ctx,ramp(t,tM-0.4,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,W/2-200,90,400,100,18); ctx.fill(); ctx.strokeStyle=C.teal; ctx.lineWidth=2; ctx.stroke(); text(ctx,'mitose',W/2,160,fTitel(60),C.teal,'center'); });
  alpha(ctx,ramp(t,tG,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,60,700,420,80,14); ctx.fill(); text(ctx,'groeien en herstellen',270,752,fTekst(32,700),C.teal,'center'); });
  metaText(ctx,'vergroot · 6 van de 46 chromosomen getekend',W-40,CAPTION_Y-14,C.text2,'right',22); },
// ---- H2: tellen ----
s06(ctx,t,q){ bg(ctx,'schema'); const t46=q.at('zesenveertig',1), tNa=q.at('Na'), tG=q.at('geslachtscellen?'), tE=q.at('eicel'), tS=q.at('Stel:'), tH=q.at('Hoeveel');
  if(t<tE-0.3){ telBord(560,420,46,C.paars,'chromosomen per cel',ramp(t,t46-0.3,0.4)); alpha(ctx,ramp(t,tNa-0.2,0.4),()=>{ arrow(ctx,740,420,900,420,C.teal,3,14); telBord(1120,320,46,C.paars,'nieuwe cel',1); telBord(1120,560,46,C.paars,'nieuwe cel',1); metaText(ctx,'mitose',820,390,C.teal,'center',22); }); return; }
  eicel(600,440,110,ramp(t,tE-0.3,0.4)); zaadcel(1000,440,2.4,ramp(t,tE+0.3,0.4),Math.PI,t);
  alpha(ctx,ramp(t,tS-0.2,0.4),()=>{ text(ctx,'46?',600,620,fTitel(56),C.koraal,'center'); text(ctx,'46?',1000,620,fTitel(56),C.koraal,'center'); text(ctx,'+',800,450,fTekst(64,700),C.text,'center'); });
  alpha(ctx,ramp(t,tH-0.2,0.4),()=>{ arrow(ctx,1140,440,1300,440,C.line,3,14); persoon(ctx,'baby',1520,520,220,{t}); vraagteken(1520,320,1,90); }); },
// ---- H2: antwoord, meiose ----
s08(ctx,t,q){ bg(ctx,'schema'); const t23=q.at('drieëntwintig.'), tB=q.at('bevruchting'), tW=q.at('zesenveertig.'), tM=q.at('meiose.'), tGh=q.at('gehalveerd.');
  if(t<tM-0.5){ eicel(520,380,90,1); zaadcel(860,380,2,1,Math.PI,t); telBord(520,620,23,C.oker,'eicel',ramp(t,t23-0.3,0.4)); telBord(860,620,23,C.teal,'zaadcel',ramp(t,t23,0.4));
    alpha(ctx,ramp(t,tB,0.4),()=>{ arrow(ctx,1020,500,1180,500,C.line,3,14); }); telBord(1420,500,46,C.paars,'het kind',ramp(t,tW-0.4,0.4)); return; }
  // meiose: 46 -> 4 x 23
  kaart(160,260,380,300,C.koraal,1); text(ctx,'46',350,440,fTitel(90),C.paars,'center'); metaText(ctx,'cel in eierstok of zaadbal',350,520,C.grain,'center',20);
  const u=ramp(t,tM-0.3,1.6); for(let i=0;i<4;i++){ alpha(ctx,ramp(u,0.2+i*0.15,0.2),()=>{ const y=200+i*150; arrow(ctx,560,410,820,y+50,C.koraal,2,12); kaart(840,y,300,110,C.koraal,1); text(ctx,'23',990,y+78,fTitel(60),C.paars,'center'); }); }
  alpha(ctx,ramp(t,tM-0.3,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1260,330,520,160,18); ctx.fill(); ctx.strokeStyle=C.koraal; ctx.lineWidth=2; ctx.stroke(); text(ctx,'meiose',1520,400,fTitel(60),C.koraal,'center'); metaText(ctx,'aantal gehalveerd',1520,450,C.grain,'center',24); }); },
// ---- H3: waar mitose, waar meiose ----
s09(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('huid,'), tBo=q.at('botten,'), tDa=q.at('darmen.'), tMi=q.at('miljarden'), tS=q.at('slijten'), tMe=q.at('Meiose'), tV=q.at('vier');
  ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(W/2,170); ctx.lineTo(W/2,760); ctx.stroke();
  text(ctx,'mitose',480,220,fTitel(56),C.teal,'center'); alpha(ctx,ramp(t,tMe-0.2,0.4),()=>text(ctx,'meiose',1440,220,fTitel(56),C.koraal,'center'));
  [['huid',tH],['botten',tBo],['darmen',tDa]].forEach(([s,tt],i)=>pill(ctx,480,330+i*100,s,C.teal,ramp(t,tt-0.2,0.3),32));
  alpha(ctx,ramp(t,tMi-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,200,640,560,90,14); ctx.fill(); text(ctx,'elke dag miljarden nieuwe cellen',480,698,fTekst(30,700),C.text,'center'); });
  alpha(ctx,ramp(t,tMe,0.4),()=>{ pill(ctx,1440,330,'eierstokken',C.koraal,1,32); pill(ctx,1440,430,'zaadballen',C.koraal,1,32); });
  alpha(ctx,ramp(t,tV-0.3,0.4),()=>{ for(let i=0;i<4;i++){ eicel(1290+i*100,600,30,1,true); } text(ctx,'1 cel → 4 geslachtscellen',1440,700,fTekst(30,700),C.text,'center'); }); },
// ---- H3: vraag blad ----
s10(ctx,t,q){ tuinDag({yb:780,zx:300}); boonPlant(960,780,1.3,0.7,0); const g=ramp(t,0.3,2.5);
  ctx.save(); ctx.translate(1080,420); ctx.rotate(-0.6); ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(40*g,-30*g,92*g,0); ctx.quadraticCurveTo(40*g,30*g,0,0); shape(ctx,'#9ACB8E','#C8E8C0',2); ctx.restore();
  naamBij(ctx,'nieuw blad','',1200,320,ramp(t,0.5,0.4),'left',C.groen); vraagteken(1400,500,ramp(t,q.at('Welke'),0.4)); },
// ---- H3: antwoord blad ----
s12(ctx,t,q){ bg(ctx,'schema'); const tM=q.at('Mitose.'), tG=q.at('groei:'), tMe=q.at('Meiose'), tB=q.at('bloem.');
  ctx.save(); ctx.beginPath(); ctx.arc(640,450,300,0,6.283); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.clip();
  for(let i=0;i<4;i++) for(let r=0;r<3;r++){ const x=420+i*150, y=330+r*120; ctx.beginPath(); roundRect(ctx,x-65,y-50,130,100,8); ctx.strokeStyle=C.groen; ctx.lineWidth=6; ctx.stroke(); dot(ctx,x,y,14,rgba(C.paars,0.7)); }
  const p=ramp(t,tG-0.2,2.4); ctx.restore(); ctx.beginPath(); ctx.arc(640,450,300,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.stroke(); metaText(ctx,'blad · vergroot',640,790,C.grain,'center',22);
  alpha(ctx,ramp(t,tM-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1060,250,640,120,18); ctx.fill(); ctx.strokeStyle=C.teal; ctx.lineWidth=2; ctx.stroke(); text(ctx,'mitose: groei',1380,330,fTitel(54),C.teal,'center'); });
  alpha(ctx,ramp(t,tMe-0.2,0.4),()=>{ bloemZij5(1380,560,1.3); text(ctx,'meiose: in de bloem',1380,760,fTekst(34,700),C.koraal,'center'); }); },
// ---- uitdaging: paren ----
s13(ctx,t,q){ bg(ctx,'schema'); const tP=q.at('paren.'), tMo=q.at('moeder'), tVa=q.at('vader.'), tU=q.at('uit'), tT=q.at('toeval.'), tA=q.at('anders.');
  const pairs=3; for(let i=0;i<pairs;i++){ const y=280+i*150; const sep=ramp(t,tU,1.2);
    chromosoom(560-sep*60,y,[110,90,70][i],0,0,ramp(t,0.2,0.4),t>tMo-0.3?C.paars:'#9AA3B2'); chromosoom(560+sep*60,y+40,[110,90,70][i],0,0,ramp(t,0.2,0.4),t>tVa-0.3?C.oker:'#9AA3B2'); }
  alpha(ctx,ramp(t,tMo-0.3,0.4),()=>text(ctx,'van moeder',440,200,fTekst(32,700),C.paars,'center')); alpha(ctx,ramp(t,tVa-0.3,0.4),()=>text(ctx,'van vader',700,200,fTekst(32,700),C.oker,'center'));
  // vier mogelijke geslachtscellen
  const combos=[[0,0,1],[1,0,0],[0,1,1],[1,1,0]];
  combos.forEach((cb,k)=>{ alpha(ctx,ramp(t,tT-0.6+k*0.25,0.4),()=>{ const x=1020+(k%2)*380, y=270+Math.floor(k/2)*260; kaart(x,y,320,220,C.line,1); eicel(x+160,y+110,80,1,false); cb.forEach((c,i)=>chromosoom(x+110+i*50,y+110,[70,58,46][i],Math.PI/2,0,1,c?C.oker:C.paars)); }); });
  naamBij(ctx,'elke geslachtscel een andere mix','',1400,820,ramp(t,tA-0.4,0.4),'center',C.goud); },
// ---- samenvatting ----
s14(ctx,t,q){ bg(ctx,'schema'); const tMi=q.at('mitose:'), tMe=q.at('meiose:'), tS=q.at('Sams'), tD=q.at('dicht');
  if(t<tS-0.3){ alpha(ctx,ramp(t,tMi-0.2,0.4),()=>{ kaart(160,200,760,520,C.teal,1); text(ctx,'mitose',540,270,fTitel(52),C.teal,'center'); ctx.save(); ctx.beginPath(); ctx.rect(170,300,740,300); ctx.clip(); mitose(540,450,110,0.7+0.3*ramp(t,tMi,2),t); ctx.restore(); text(ctx,'46 → 46 + 46 · groei en herstel',540,660,fTekst(30,700),C.text,'center'); });
    alpha(ctx,ramp(t,tMe-0.2,0.4),()=>{ kaart(1000,200,760,520,C.koraal,1); text(ctx,'meiose',1380,270,fTitel(52),C.koraal,'center'); text(ctx,'46',1180,470,fTitel(70),C.paars,'center'); arrow(ctx,1250,450,1340,450,C.koraal,3,12); for(let i=0;i<4;i++) text(ctx,'23',1430+(i%2)*110,420+Math.floor(i/2)*90,fTitel(44),C.paars,'center'); text(ctx,'geslachtscellen met de helft',1380,660,fTekst(30,700),C.text,'center'); }); return; }
  knie(W/2,450,1.5,1); alpha(ctx,ramp(t,tD-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,W/2-330,120,660,100,18); ctx.fill(); ctx.strokeStyle=C.teal; ctx.lineWidth=2; ctx.stroke(); text(ctx,'dicht door mitose',W/2,188,fTitel(52),C.teal,'center'); }); },
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Bij mitose ontstaan twee gelijke cellen, voor groei en herstel.','Bij meiose ontstaan geslachtscellen met de helft van de chromosomen.','Een wond gaat dicht door mitose.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
function eicel(x,y,r,a=1,kern=true){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.oker,0.35),lighten(C.oker,0.35),2); if(kern) dot(ctx,x-r*0.15,y-r*0.1,r*0.28,rgba(C.paars,0.7),C.kernR,1.2); }); }
function zaadcel(x,y,s=1,a=1,ang=0,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,14*s,9*s,0,0,6.283); shape(ctx,rgba(C.teal,0.6),lighten(C.teal,0.35),1.5); dot(ctx,2*s,0,4*s,rgba(C.paars,0.8)); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(-14*s,0); for(let k=1;k<=10;k++) ctx.lineTo(-14*s-k*6*s,Math.sin(t*14+k*0.9)*5*s*(k/10)); ctx.stroke(); ctx.restore(); }); }
function bloemZij5(x,y,s){ ctx.strokeStyle=BOON.stengel; ctx.lineWidth=6*s; ctx.beginPath(); ctx.moveTo(x,y+120*s); ctx.lineTo(x,y+20*s); ctx.stroke(); for(let k=0;k<6;k++){ const an=k*1.047; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*30*s,y+Math.sin(an)*30*s,24*s,14*s,an,0,6.283); shape(ctx,'#F2F2EE','#D9DEE6',1.2); } dot(ctx,x,y,16*s,'#F2D27A','#F8E6A8',1.5); }
