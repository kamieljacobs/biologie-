// ===== 32B film 3 — Waarom zoveel soorten? =====
// Rode draad: muizen in het bos en op het witte strand. Vacht = de eigenschap die telt (oker-tinten); mutatie = paars sterretje; selectie = 35% dimmen.
const YB3=800;
const VACHT=(l)=>_mixHex('#5A4030','#E6D5A8',l); // l 0 donker .. 1 licht
function muis(x,y,s,l,a=1,dir=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); const c=VACHT(l), cr=lighten(c,0.25);
  ctx.strokeStyle=_donker(c,0.15); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-30,4); ctx.quadraticCurveTo(-60,-4+Math.sin(t*3)*4,-72,12); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0,0,32,20,0,0,6.283); shape(ctx,c,cr,1.2); ctx.beginPath(); ctx.ellipse(28,-6,16,13,0.2,0,6.283); shape(ctx,c,cr,1.2);
  dot(ctx,22,-20,8,_mixHex(c,'#E8A0A0',0.3),cr,1); dot(ctx,36,-9,2.4,'#1A1410'); dot(ctx,44,-3,2.4,'#C9867A'); ctx.restore(); }); }
function uil(x,y,s=1,a=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const f=Math.sin(t*5)*0.25;
  ctx.fillStyle='#8C6A4A'; ctx.beginPath(); ctx.ellipse(-50,0,60,18,-0.3-f,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(50,0,60,18,0.3+f,0,6.283); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0,6,26,34,0,0,6.283); shape(ctx,'#B08A5C','#D0B080',1.5); dot(ctx,-9,-6,8,'#F2E6CC'); dot(ctx,9,-6,8,'#F2E6CC'); dot(ctx,-9,-6,3,'#1A1410'); dot(ctx,9,-6,3,'#1A1410'); ctx.restore(); }); }
function bosAchter(){ ctx.fillStyle=DAG.lucht; ctx.fillRect(0,0,W,H); ctx.fillStyle='#3E6A48'; ctx.fillRect(0,YB3-60,W,H); ctx.fillStyle='#2F4A3A'; ctx.fillRect(0,YB3,W,H-YB3);
  for(let i=0;i<11;i++){ const x=60+i*180+hash(i)*60, h=380+hash(i*3)*200; ctx.fillStyle='#5A4636'; ctx.fillRect(x-14,YB3-h*0.45,28,h*0.45); ctx.beginPath(); ctx.moveTo(x,YB3-h); ctx.lineTo(x-90,YB3-h*0.35); ctx.lineTo(x+90,YB3-h*0.35); ctx.closePath(); ctx.fillStyle=i%2?'#4E7A58':'#5F8A60'; ctx.fill(); }
  ctx.fillStyle='#4A3A2C'; for(let i=0;i<40;i++) dot(ctx,hash(i*5)*W,YB3+10+hash(i*7)*80,6+hash(i)*8,'#3A2E24'); }
function strandAchter(){ ctx.fillStyle='#8EA8BF'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#4E8AA8'; ctx.fillRect(0,330,W,90); ctx.fillStyle='#EDE6D2'; ctx.fillRect(0,420,W,H-420);
  ctx.fillStyle='#E2D8BE'; for(let i=0;i<6;i++){ ctx.beginPath(); ctx.ellipse(hash(i*3)*W,520+i*60,260,30,0,0,6.283); ctx.fill(); }
  ctx.strokeStyle='#9AB07A'; ctx.lineWidth=3; for(let i=0;i<30;i++){ const x=hash(i*11)*W, y=440+hash(i*13)*60; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-8,y-30); ctx.moveTo(x,y); ctx.lineTo(x+6,y-26); ctx.stroke(); } }
// populatie-simulatie (seeded, deterministisch): N muizen, allel 'licht' met kans p; selectie op wit zand
function pop(gen,N,start,s,seed){ // geeft lijst van vachtwaarden na 'gen' generaties
  let p=start; const L=[]; for(let g=0;g<gen;g++){ const w1=1, w0=1-s; p=p*w1/(p*w1+(1-p)*w0); }
  for(let i=0;i<N;i++) L.push(hash(seed+i*7.3)<p? 0.85+0.1*hash(i*3.1) : 0.15+0.15*hash(i*5.7)); return {L,p}; }
function cichlide(x,y,s,kleur,a=1,dir=1,vorm=0,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  ctx.beginPath(); ctx.moveTo(-40,0); ctx.lineTo(-62,-18+Math.sin(t*5)*3); ctx.lineTo(-62,18+Math.sin(t*5)*3); ctx.closePath(); ctx.fillStyle=_donker(kleur,0.1); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0,0,46,20+vorm*8,0,0,6.283); shape(ctx,kleur,lighten(kleur,0.35),1.5); ctx.strokeStyle=rgba('#1A1410',0.25); ctx.lineWidth=2; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(k*14,-18); ctx.lineTo(k*14,18); ctx.stroke(); } dot(ctx,30,-5,4,'#1A1410'); ctx.restore(); }); }
function tijdpijl(x0,x1,y,u,lab){ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(lerp(x0,x1,u),y); ctx.stroke(); if(u>0.95) arrow(ctx,x1-20,y,x1,y,C.line,2,12); if(lab) metaText(ctx,lab,(x0+x1)/2,y+40,C.grain,'center',22); }

function paard(x,y,s,kleur,o={}){ const a=o.a==null?1:o.a; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const c=kleur, cr=lighten(c,0.25), oor=o.oor||1;
  ctx.strokeStyle=c; ctx.lineCap='round'; ctx.lineWidth=14; [[-55,0],[-35,0],[45,0],[65,0]].forEach(([dx])=>{ ctx.beginPath(); ctx.moveTo(dx,-10); ctx.lineTo(dx,95); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0,-30,95,42,0,0,6.283); shape(ctx,c,cr,1.2);
  ctx.beginPath(); ctx.moveTo(60,-55); ctx.lineTo(105,-125); ctx.lineTo(130,-110); ctx.lineTo(90,-30); ctx.closePath(); ctx.fillStyle=c; ctx.fill();
  ctx.beginPath(); ctx.ellipse(130,-112,40,18,0.5,0,6.283); shape(ctx,c,cr,1.2);
  ctx.fillStyle=_donker(c,0.15); ctx.beginPath(); ctx.moveTo(100,-140); ctx.lineTo(104,-140-18*oor); ctx.lineTo(112,-138); ctx.closePath(); ctx.fill();
  if(o.manen!==false){ ctx.strokeStyle=_donker(c,0.35); ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(100,-135); ctx.lineTo(62,-60); ctx.stroke(); }
  ctx.strokeStyle=_donker(c,0.3); ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-95,-35); ctx.quadraticCurveTo(-120,-10,-115,30); ctx.stroke(); dot(ctx,128,-120,3,'#1A1410'); ctx.restore(); }); }

const SCENES={
// ---- cold open: veel soorten ----
s01(ctx,t,q){ bg(ctx,'schema'); const tK=q.at('Kevers,'), tV=q.at('vissen,'), tB=q.at('bomen,'), tP=q.at('paddenstoelen.'), tC=q.at('cellen,'), tH=q.at('Hoe');
  const items=[[tK,(x,y)=>{ ctx.beginPath(); ctx.ellipse(x,y,30,40,0,0,6.283); shape(ctx,'#3E7A6A','#6AAA92',1.5); ctx.strokeStyle='#1A1410'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y-40); ctx.lineTo(x,y+40); ctx.stroke(); for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(x-30,y+k*20); ctx.lineTo(x-50,y+k*24); ctx.moveTo(x+30,y+k*20); ctx.lineTo(x+50,y+k*24); ctx.stroke(); } }],
    [tV,(x,y)=>cichlide(x,y,1.3,'#5BA4C9',1,1,0,t)],[tB,(x,y)=>oak(ctx,x,y+70,0.55)],[tP,(x,y)=>{ ctx.fillStyle='#E8E2D4'; ctx.fillRect(x-10,y,20,50); ctx.beginPath(); ctx.ellipse(x,y,50,30,0,Math.PI,0); shape(ctx,'#C9503C','#E07A5F',1.5); for(let k=0;k<4;k++) dot(ctx,x-30+k*20,y-14,5,'#F2F2EE'); }]];
  if(t<tC-0.4){ items.forEach(([tt,fn],i)=>{ alpha(ctx,ramp(t,tt-0.2,0.4),()=>fn(330+i*420,420)); }); naamBij(ctx,'miljoenen soorten','',W/2,180,ramp(t,0.2,0.4),'center',C.goud); }
  else { // boom van afstamming: één stip onderin waaiert uit
    const u=ramp(t,tC-0.3,2.4); ctx.strokeStyle=C.line; ctx.lineWidth=2;
    for(let i=0;i<16;i++){ const ex=200+i*100, ey=180; ctx.globalAlpha=u; ctx.beginPath(); ctx.moveTo(W/2,820); ctx.bezierCurveTo(W/2,600,ex,400,ex,ey); ctx.stroke(); ctx.globalAlpha=1; dot(ctx,ex,ey,8*u,[C.groen,C.oker,C.teal,C.koraal][i%4]); }
    dot(ctx,W/2,820,14,rgba(C.groen,0.6),C.groen,2); naamBij(ctx,'een paar eenvoudige cellen','heel lang geleden',W/2,880-20,1,'center',C.groen); }
  vraagteken(W/2,480,ramp(t,tH,0.4)*(t>tC?1:0)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Waarom zoveel soorten?',120,330,fTitel(90),C.text); text(ctx,'Hoe ontstaat een nieuwe soort?',120,410,fTekst(44),C.text2); });
  for(let i=0;i<5;i++) muis(1240+i*120,640+(i%2)*40,1.1,i/4,ramp(t,0.4+i*0.15,0.4),i%2?-1:1,t);
  metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 3',W-80,60,C.text2,'right',24); },
// ---- H1: variatie, mutatie ----
s04(ctx,t,q){ bosAchter(); const tV=q.at('variatie.'), tMi=q.at('mix'), tG=q.at('gen.'), tF=q.at('foutje'), tMu=q.at('mutatie.'), tN=q.at('niets.'), tSc=q.at('schadelijk.'), tH=q.at('handig.'), tL=q.at('licht,',2);
  const ls=[0.12,0.3,0.2,0.4,0.25,0.35,0.18,0.28];
  ls.forEach((l,i)=>{ const w=wander(i,t,30,0.4); muis(260+i*190+w.x,YB3+30+(i%3)*30,1.4,(t>tV-0.5&&t<tMi)?l:l,1,i%2?1:-1,t); });
  naamBij(ctx,'variatie','iets donkerder · iets lichter',W/2,160,ramp(t,tV-0.4,0.4),'center',C.goud);
  if(t>tG-0.6){ alpha(ctx,ramp(t,tG-0.6,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,520,230,880,300,18); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke();
      genStreep(620,300,680,40,1,4,ramp(t,tF,0.4)); const m=ramp(t,tF+0.3,0.4); if(m>0) alpha(ctx,m,()=>{ ctx.fillStyle=C.goud; ctx.font=fTitel(44); ctx.textAlign='center'; ctx.fillText('✶',620+680*4.5/9,290); });
      naamBij(ctx,'mutatie','klein foutje bij het kopiëren',W/2,420,ramp(t,tMu-0.3,0.4),'center',C.paars);
      const opts=[['doet niets',tN,C.text2],['schadelijk',tSc,C.koraal],['heel soms handig',tH,C.groen]];
      opts.forEach(([s,tt,c],i)=>pill(ctx,700+i*260,490,s,c,ramp(t,tt-0.2,0.3),24)); }); }
  if(t>tL-0.8){ alpha(ctx,ramp(t,tL-0.8,0.5),()=>{ muis(1500,YB3+40,2,0.95,1,-1,t); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(1500,YB3+30,110,0,6.283); ctx.stroke(); naamBij(ctx,'lichte vacht','door een mutatie',1500,YB3-110,1,'center',C.goud); }); } },
// ---- H2: verspreid naar het strand ----
s05(ctx,t,q){ const tP=q.at('strand'), tU=q.at('uilen'), tW=q.at('Welke');
  if(t<tP-0.3){ bosAchter(); for(let i=0;i<6;i++){ const u=ramp(t,0.3+i*0.2,2.5); muis(lerp(400+i*120,1900+i*80,u*(i<3?1:0.15)),YB3+40+(i%2)*30,1.3,i===1?0.95:[0.2,0.3,0.15,0.35,0.25,0.2][i],1,1,t); } naamBij(ctx,'verspreid','',W/2,180,ramp(t,0.4,0.4),'center',C.text); return; }
  strandAchter(); const {L}=pop(0,10,0.2,0,3);
  L.forEach((l,i)=>{ const w=wander(i,t,20,0.4); muis(220+i*160+w.x,640+(i%3)*60+w.y*0.3,1.2,l,1,i%2?1:-1,t); });
  pill(ctx,W/2,500,'wit zand',C.text,ramp(t,tP,0.4),30);
  uil(lerp(-150,800,ramp(t,tU-0.3,3)),200+Math.sin(t*0.8)*20,1.3,ramp(t,tU-0.3,0.3),t); pill(ctx,lerp(-150,800,ramp(t,tU-0.3,3)),300,'uil',C.text,ramp(t,tU,0.3),26); alpha(ctx,ramp(t,tU+0.6,0.3),()=>{ ctx.save(); ctx.translate(lerp(2100,1350,ramp(t,tU+0.6,2.5)),300); ctx.strokeStyle='#5A6A78'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-60,20); ctx.moveTo(0,0); ctx.lineTo(0,-50); ctx.stroke(); ctx.beginPath(); ctx.ellipse(30,0,60,22,0.2,0,6.283); ctx.fillStyle='#9AA8B8'; ctx.fill(); ctx.beginPath(); ctx.moveTo(-10,-50); ctx.lineTo(-60,-46); ctx.lineTo(-10,-42); ctx.fill(); ctx.restore(); pill(ctx,1400,420,'reiger',C.text,1,26); });
  vraagteken(W/2,380,ramp(t,tW,0.4)); },
// ---- H2: natuurlijke selectie (simulatie) ----
s07(ctx,t,q){ strandAchter(); const tD=q.at('donkere.'), tLi=q.at('lichte',1), tO=q.at('overleven'), tE=q.at('erven'), tG=q.at('Generatie'), tN=q.at('natuurlijke'), tLe=q.at('Let'), tWi=q.at('wil.'), tT=q.at('toevallig');
  if(t<tG-0.3){ const {L}=pop(0,10,0.2,0,3);
    L.forEach((l,i)=>{ const gepakt = l<0.5 && (i%3!==1); const w=wander(i,t,20,0.4); muis(220+i*160+w.x,640+(i%3)*60,1.2,l,gepakt?1-0.65*ramp(t,tD+0.4+i*0.08,0.5):1,i%2?1:-1,t);
      if(l>0.5) alpha(ctx,ramp(t,tLi,0.4),()=>{ ctx.strokeStyle=C.groen; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(220+i*160+w.x,630+(i%3)*60,56,0,6.283); ctx.stroke(); }); });
    naamBij(ctx,'vallen op','',W/2,480,ramp(t,tD,0.4),'center',C.koraal);
    alpha(ctx,ramp(t,tE-0.3,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,560,90,800,90,16); ctx.fill(); text(ctx,'meer jongen · die erven de lichte vacht',W/2,148,fTekst(36,700),C.groen,'center'); }); return; }
  if(t<tLe-0.3){ // generaties: aandeel licht groeit (berekend)
    const g=Math.floor(lerp(0,12,ramp(t,tG,5))); const {L,p}=pop(g,20,0.2,0.3,3+g*0);
    L.forEach((l,i)=>{ const c=i%10, r=Math.floor(i/10); muis(200+c*170,600+r*110,1.0,l,1,1,t); });
    ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,60,70,560,170,16); ctx.fill();
    text(ctx,`generatie ${g}`,100,130,fTekst(40,700),C.text); text(ctx,`lichte muizen: ${Math.round(p*100)}%`,100,190,fTekst(36,600),C.goud);
    ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,1060,70,800,170,16); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(1100,210); ctx.lineTo(1820,210); ctx.moveTo(1100,210); ctx.lineTo(1100,90); ctx.stroke();
    ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); for(let k=0;k<=g;k++){ const pp=pop(k,1,0.2,0.3,0).p, x=1100+k*60, y=210-pp*110; k?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke();
    naamBij(ctx,'natuurlijke selectie','',W/2,340,ramp(t,tN-0.3,0.4),'center',C.goud); metaText(ctx,'model · uilen pakken donkere muizen vaker',60,CAPTION_Y-14,C.text2,'left',22); return; }
  // geen keuze
  muis(760,620,2.6,0.2,1,1,t); alpha(ctx,ramp(t,tWi-1,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,920,280,620,160,24); ctx.fill(); text(ctx,'"Ik word nu licht."',1230,375,fTekst(40,600),C.text,'center'); crossOut(ctx,1230,360,100,1); });
  alpha(ctx,ramp(t,tT,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,360,100,1200,90,16); ctx.fill(); text(ctx,'wie toevallig goed past, krijgt meer jongen',W/2,160,fTekst(38,700),C.groen,'center'); }); },
// ---- H3: gescheiden groepen, twee soorten, muilezel-vraag ----
s08(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('ver'), tE=q.at('eigen'), tGe=q.at('generaties'), tT=q.at('twee',1), tW=q.at('Wat'), tP=q.at('paard'), tMu=q.at('muilezel.'), tZ=q.at('Zijn');
  if(t<tW-0.3){ const u=ramp(t,tGe,3.5);
    kaart(140,200,760,520,C.line,1,rgba('#2F4A3A',0.6)); kaart(1020,200,760,520,C.line,1,rgba('#EDE6D2',0.18)); text(ctx,'bos',520,260,fTekst(36,700),C.groen,'center'); text(ctx,'strand',1400,260,fTekst(36,700),'#EDE6D2','center');
    alpha(ctx,ramp(t,tV,0.4),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.setLineDash([12,10]); ctx.beginPath(); ctx.moveTo(W/2,180); ctx.lineTo(W/2,740); ctx.stroke(); ctx.setLineDash([]); });
    for(let i=0;i<6;i++){ muis(260+i*110,420+(i%2)*90,1+0.3*u,0.2+0.05*(i%3),1,1,t); muis(1140+i*110,420+(i%2)*90,1-0.15*u,0.9,1,-1,t); }
    tijdpijl(300,1620,800,ramp(t,tGe,2.5),'heel veel generaties');
    alpha(ctx,ramp(t,tT-0.4,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,660,330,600,110,18); ctx.fill(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); text(ctx,'twee soorten',W/2,400,fTitel(52),C.goud,'center'); }); return; }
  // paard + ezel = muilezel
  const yy=620; alpha(ctx,ramp(t,tP-0.3,0.4),()=>{ paard(380,yy-40,1.3,'#8C5A3A'); text(ctx,'paard',380,yy+150,fTekst(34,600),C.text,'center'); });
  alpha(ctx,ramp(t,q.at('ezel')-0.3,0.4),()=>{ paard(820,yy-20,1.0,'#8A8A88',{oor:2.2,manen:false}); text(ctx,'ezel',820,yy+150,fTekst(34,600),C.text,'center'); text(ctx,'+',600,yy-40,fTekst(64,700),C.text,'center'); });
  alpha(ctx,ramp(t,tMu-0.3,0.4),()=>{ arrow(ctx,1000,yy-40,1180,yy-40,C.line,3,14); paard(1400,yy-30,1.15,'#7A6450',{oor:1.7}); text(ctx,'muilezel',1400,yy+150,fTekst(34,600),C.goud,'center'); });
  vraagteken(1700,380,ramp(t,tZ,0.4)); },
// ---- H3: antwoord, soortvorming, biodiversiteit ----
s10(ctx,t,q){ bg(ctx,'schema'); const tB=q.at('bijna'), tV=q.at('vruchtbare'), tTw=q.at('twee'), tSo=q.at('soortvorming.'), tBi=q.at('biodiversiteit.'), tR=q.at('rijkdom');
  if(t<tSo-0.5){ paard(1400,520,1.15,'#7A6450',{oor:1.7}); text(ctx,'muilezel',1400,700,fTekst(34,600),C.goud,'center'); alpha(ctx,ramp(t,tB,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1220,250,360,90,16); ctx.fill(); text(ctx,'geen jongen',1400,310,fTekst(36,700),C.koraal,'center'); crossOut(ctx,1400,300,0,0); });
    alpha(ctx,ramp(t,tV-0.4,0.5),()=>{ kaart(140,240,860,360,C.groen,1); text(ctx,'één soort =',570,330,fTekst(40,700),C.groen,'center'); ctx.font=fTekst(36,600); ctx.fillStyle=C.text; ctx.textAlign='center'; wrap(ctx,'dieren die samen vruchtbare jongen kunnen krijgen',570,400,760,48); });
    alpha(ctx,ramp(t,tTw,0.4),()=>text(ctx,'paard en ezel: twee soorten',570,660,fTekst(36,700),C.text,'center')); return; }
  // boom van soortvorming groeit uit
  const u=ramp(t,tSo-0.4,3.5); const n=Math.floor(2+u*30);
  for(let i=0;i<n;i++){ const ex=160+(i*53)%1600, ey=200+((i*37)%140); ctx.strokeStyle=rgba(C.line,0.8); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(W/2,800); ctx.bezierCurveTo(W/2,620,ex,460,ex,ey); ctx.stroke(); dot(ctx,ex,ey,9,[C.groen,C.oker,C.teal,C.koraal,C.paars][i%5]); }
  naamBij(ctx,'soortvorming','een nieuwe soort ontstaat',W/2,880-30,ramp(t,tSo-0.4,0.4)*(1-ramp(t,tBi-0.8,0.4)),'center',C.goud);
  alpha(ctx,ramp(t,tBi-0.6,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,560,440,800,110,18); ctx.fill(); ctx.strokeStyle=C.groen; ctx.lineWidth=2; ctx.stroke(); text(ctx,'biodiversiteit',W/2,512,fTitel(56),C.groen,'center'); });
  metaText(ctx,'miljoenen jaren',60,CAPTION_Y-14,C.text2,'left',22); },
// ---- uitdaging: cichliden ----
s11(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('Victoriameer'), tH=q.at('honderden'), tP=q.at('paar'), tE=q.at('eigen'), tZ=q.at('snel');
  alpha(ctx,ramp(t,tV-0.2,0.5),()=>{ ctx.beginPath(); ctx.ellipse(W/2,500,700,300,0.1,0,6.283); shape(ctx,rgba(C.teal,0.25),C.teal,2); naamBij(ctx,'Victoriameer','Afrika',W/2,170,1,'center',C.teal); });
  const kl=['#E07A5F','#E0B64A','#5BA4C9','#7FC48F','#8C7BBF','#C9A35C','#D8574A','#4FB3A5','#F2D27A','#A392D6','#6C8FD0','#E8A0C0'];
  if(t<tE-0.3){ const n=t<tH?0:Math.floor(lerp(2,24,ramp(t,tH,1.5))); for(let i=0;i<n;i++){ const w=wander(i,t,30,0.3); cichlide(560+(i%8)*110+w.x,360+Math.floor(i/8)*120+w.y,0.9,kl[i%12],1,i%2?1:-1,hash(i),t); }
    alpha(ctx,ramp(t,tP-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,1380,640,440,80,14); ctx.fill(); text(ctx,'van een paar voorouders',1600,692,fTekst(30,600),C.text,'center'); }); return; }
  const plekken=[['rotsen',560,360],['zand',960,330],['open water',1360,380],['plankton',700,600],['slakken',1200,620]];
  plekken.forEach(([nm,x,y],i)=>{ alpha(ctx,ramp(t,tE-0.2+i*0.3,0.4),()=>{ cichlide(x,y,1.2,kl[i*2],1,1,i%3,t); text(ctx,nm,x,y+60,fTekst(26,600),C.text,'center'); }); });
  naamBij(ctx,'honderden soorten · snel','in ± 15.000 jaar',W/2,860-30,ramp(t,tZ,0.4),'center',C.goud); },
// ---- samenvatting ----
s12(ctx,t,q){ bg(ctx,'schema'); const tM=q.at('Mutaties'), tN=q.at('Natuurlijke'), tG=q.at('Groepen'), tL=q.at('lange'), tE=q.at('expres.');
  const S=[['mutatie','nieuw verschil',tM,C.paars,(x,y)=>{ genStreep(x-90,y-20,180,30,1,3,1); }],['selectie','wie past, krijgt meer jongen',tN,C.goud,(x,y)=>{ muis(x-40,y,1,0.9); muis(x+50,y,1,0.2,0.35); }],['gescheiden','elke groep eigen weg',tG,C.koraal,(x,y)=>{ ctx.strokeStyle=C.koraal; ctx.setLineDash([8,6]); ctx.beginPath(); ctx.moveTo(x,y-50); ctx.lineTo(x,y+40); ctx.stroke(); ctx.setLineDash([]); muis(x-60,y,0.8,0.2); muis(x+60,y,0.8,0.9,1,-1); }],['nieuwe soorten','na heel lange tijd',tL,C.groen,(x,y)=>{ ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y+50); ctx.lineTo(x,y); ctx.lineTo(x-60,y-50); ctx.moveTo(x,y); ctx.lineTo(x+60,y-50); ctx.stroke(); dot(ctx,x-60,y-50,10,C.groen); dot(ctx,x+60,y-50,10,C.oker); }]];
  S.forEach(([a,b,tt,c,fn],i)=>{ const x=300+i*440; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ kaart(x-190,220,380,420,c,1); fn(x,380); text(ctx,a,x,520,fTekst(36,700),c,'center'); ctx.font=fTekst(26); ctx.fillStyle=C.text; ctx.textAlign='center'; wrap(ctx,b,x,570,330,34); if(i<3) arrow(ctx,x+200,430,x+240,430,C.line,3,12); }); });
  haak(ctx,110,1810,670,'geen enkel dier doet het expres',C.groen,ramp(t,tE-0.6,0.5)); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'waarom zoveel soorten',120,260,C.grain,'left',26);
  const P=[['Verstoppertje','Knip 20 donkere en 20 lichte papiertjes. Strooi ze op een wit vel. Een klasgenoot pakt er in 10 seconden zoveel mogelijk. Welke blijven over?'],['Ronde 2','Laat elk overgebleven papiertje "een jong krijgen" (er één bij in dezelfde kleur). Speel drie rondes. Wat gebeurt er met de kleuren?'],['Zoek de soort','Zoek twee dieren die op elkaar lijken maar twee soorten zijn (zoals paard en ezel). Hoe weet je dat het twee soorten zijn?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Iemand zegt: "De muizen op het strand werden licht, omdat ze zich wilden verstoppen." Wat klopt hier niet?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
