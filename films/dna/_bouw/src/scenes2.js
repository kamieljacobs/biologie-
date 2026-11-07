// ===== DNA 2 · DNA kopiëren — scenes (Part C) =====
// signature: SCENES[name](ctx, li, lf, t, q)   li = line index, lf = 0..1 within the line
const SCENES={};
const PERSON_LOOK={skin:SKINS[0],hair:'#7A5236',shirt:'#8A6A9A',trousers:'#34425A',hairStyle:'long'};
// ---- shared pieces for this film ----
function macroBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,700); ctx.quadraticCurveTo(480,610,960,680); ctx.quadraticCurveTo(1440,750,1920,660); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,800,W,H-800); }
function leg(ctx,x,y,heal,alpha=1){ // Macro: bent leg seen from the side, neutral, wound in koraal
  ctx.save(); ctx.globalAlpha*=alpha; ctx.lineCap='round'; ctx.strokeStyle=C.mens; ctx.lineWidth=90;
  ctx.beginPath(); ctx.moveTo(x-330,y+120); ctx.lineTo(x,y); ctx.lineTo(x+250,y+260); ctx.stroke();
  box(ctx,x+200,y+240,170,60,26,C.mens); // foot
  const r=46*(1-heal*0.8); ctx.beginPath(); ctx.ellipse(x-6,y-14,r*1.25,r*0.75,-0.3,0,6.283); ctx.fillStyle=heal<0.6?C.koraal:rgba(C.koraal,0.45); ctx.fill();
  ctx.restore(); }
function skinCells(ctx,cx,cy,cols,rows,t,div=1,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; const w=118,h=96;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ const x=cx+(c-(cols-1)/2)*w+(r%2)*w/2, y=cy+(r-(rows-1)/2)*h; const k=r*cols+c; const dv=div&&(k%4===1);
    blob(ctx,x,y,52,40,0.05,k); shape(ctx,rgba('#3A4A66',0.9),C.er,1.2);
    if(dv){ const s=6+8*((Math.sin(t*1.3+k)+1)/2); circ(ctx,x-s,y,10,C.kern,C.kernR,1); circ(ctx,x+s,y,10,C.kern,C.kernR,1); } else circ(ctx,x,y,14,C.kern,C.kernR,1); }
  ctx.restore(); }
function dnaIcon(ctx,x,y,n=1,alpha=1){ ctx.save(); ctx.globalAlpha*=alpha; for(let k=0;k<n;k++){ const xx=x+k*60; for(const sgn of [1,-1]){ ctx.beginPath(); for(let i=0;i<=36;i++){ const yy=y-54+i*3; const dx=sgn*16*Math.sin(i*0.36); i?ctx.lineTo(xx+dx,yy):ctx.moveTo(xx+dx,yy);} ctx.strokeStyle=sgn>0?BBR:BC.A; ctx.lineWidth=6; ctx.stroke(); } } ctx.restore(); }
// replication: top old strand fixed at y; bottom old strand peels away from fork index f; new strand built up to index g
function replSim(ctx,x0,y,seq,f,g,o={}){ // opened for i<f (fork between f-1 and f); new strand built for i<g (g<=f)
  const dx=o.dx||120, n=seq.length, D=o.D||250;
  backbone(ctx,x0-dx/2,y,n*dx,{dx});
  for(let i=0;i<n;i++) base(ctx,x0+i*dx,y+22,seq[i],1);
  const drop=i=>i<f?clamp((f-i)/1.6,0,1)*D:0;
  for(let i=0;i<n;i++) base(ctx,x0+i*dx,y+278+drop(i),COMP[seq[i]],-1,{alpha:i<f?0.9:1});
  for(let i=f;i<n;i++) hbonds(ctx,x0+i*dx,y+156,y+148,(seq[i]==='A'||seq[i]==='T')?2:3);
  // old bottom strand backbone as one polyline
  ctx.save(); ctx.beginPath(); ctx.moveTo(x0-dx/2,y+300+drop(0)); for(let i=0;i<n;i++) ctx.lineTo(x0+i*dx,y+300+drop(i)); ctx.lineTo(x0+(n-0.5)*dx,y+300+(f>=n?drop(n-1):0));
  ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle=BBR; ctx.lineWidth=46; ctx.stroke(); ctx.strokeStyle=BB; ctx.lineWidth=43; ctx.stroke(); ctx.restore();
  for(let i=0;i<Math.min(g,f);i++){ base(ctx,x0+i*dx,y+282,COMP[seq[i]],-1,{mark:o.markNew?C.goud:null}); hbonds(ctx,x0+i*dx,y+156,y+148,(seq[i]==='A'||seq[i]==='T')?2:3); }
  if(g>0) backbone(ctx,x0-dx/2,y+304,Math.min(g,f)*dx,{dx,mark:o.markNew?C.goud:null});
  if(o.helicase&&f>0&&f<=n){ const hx=x0+(f-0.5)*dx; enzyme(ctx,hx+40,y+170,0.75,1); if(o.labels) label(ctx,'helicase','enzym · ritst open',hx+80,y+300,hx+260,y+560,o.labA==null?1:o.labA,C.text,'left'); }
  if(o.poly&&g<n){ const ex=x0+g*dx; enzyme(ctx,ex+10,y+230,0.8,0.95); if(o.labels) label(ctx,'DNA-polymerase','enzym · koppelt',ex+60,y+250,ex+40,y+600,o.labB==null?1:o.labB,C.text,'left'); }
}
function freeNucs(ctx,x0,y0,T,alpha=1){ const R=seeded(77); for(let k=0;k<5;k++){ const bx=x0+k*92+R()*20, by=y0+R()*60; const ph=R()*6.28, sp=0.6+R()*0.6; const xx=bx+Math.sin(T*sp+ph)*24, yy=by+Math.cos(T*sp*0.8+ph)*18;
  ctx.save(); ctx.translate(xx,yy); ctx.rotate(Math.sin(T*0.5+ph)*0.4); base(ctx,0,-60,'ACGTC'[k],1,{alpha:alpha*0.85,s:0.85}); circ(ctx,0,-70,9,BBR,null); ctx.restore(); } }
function tube(ctx,x,y,bands,lab,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; // Schema lab library: tube as line drawing
  ctx.strokeStyle='#AFC0D0'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+380); ctx.arc(x+60,y+380,60,Math.PI,0,true); ctx.lineTo(x+120,y); ctx.stroke();
  ctx.fillStyle=rgba(C.teal,0.12); ctx.fillRect(x+2,y+40,116,340);
  for(const [pos,col,lbl] of bands){ box(ctx,x+10,y+60+pos*300-9,100,18,6,col); }
  M(ctx,'licht',x+150,y+70,{color:C.text2}); M(ctx,'zwaar',x+150,y+370,{color:C.text2}); M(ctx,lab,x+60,y+500,{align:'center'}); ctx.restore(); }
const HEAVY='#4F3F86', LIGHT='#C9BEEB';

// ---- title image ----
SCENES.__title=(ctx,t)=>{ ctx.save(); ctx.translate(1000,230); ctx.scale(0.78,0.78); replSim(ctx,120,120,'ATGCATGC',5,3,{dx:120,D:240}); ctx.restore(); };

// ---- cold open: Macro knee → zoomcirkel → Micro skin cells ----
SCENES.open=(ctx,li,lf,t)=>{ macroBg(ctx);
  const heal=li===0?ease(lf):1; person(ctx,520,820,640,1); const kx=497, ky=820-640*0.2; const r=22*(1-heal*0.7); ctx.beginPath(); ctx.ellipse(kx,ky,r*1.3,r,0,0,6.283); ctx.fillStyle=heal<0.6?C.koraal:rgba(C.koraal,0.5); ctx.fill();
  M(ctx,li===0?('dag '+Math.round(heal*7)):'dag 7',kx-80,ky+10,{align:'right'});
  if(li>=1){ const p=li===1?ease(lf*1.6):1; zoomCircle(ctx,1300,420,300,kx+20,ky,'huidcellen · vergroot',p,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(980,100,700,700); grain(ctx); skinCells(ctx,1300,420,6,5,t,1,1); }); }
  if(li>=2) label(ctx,'elke nieuwe cel','twee meter dna',1450,500,1610,640,li===2?ease(lf*2):1,C.text,'left');
  if(li>=3) M(ctx,'foutloos · in een paar uur',1300,820,{align:'center',color:C.goud,alpha:li===3?ease(lf*2):1});
  if(li>=4) T(ctx,'Hoe doe je dat?',120,200,64,{titel:true,alpha:ease(lf*2)});
};

// ---- H1 Wanneer en waarom ----
SCENES.h1a=(ctx,li,lf,t)=>{
  if(li<=1){ bg(ctx,'micro'); const L=microCell(ctx,700,470,300,1,t,{showGolgi:true,showER:true});
    dnaIcon(ctx,L.kern.x-30,L.kern.y,li===0&&lf<0.6?1:2,1);
    if(li===0) label(ctx,'DNA kopiëren','eerst, vóór de deling',L.kern.x,L.kern.y-60,L.kern.x-120,160,ease(lf*2),C.text,'right');
    if(li===1){ const p=ease(lf); arrow(ctx,1120,470,1260,470,C.line,1.5,p); const A=microCell(ctx,1520,290,130,p,t); const B=microCell(ctx,1520,650,130,p,t); dnaIcon(ctx,A.kern.x-8,A.kern.y,1,p); dnaIcon(ctx,B.kern.x-8,B.kern.y,1,p);
      M(ctx,'elke dochtercel een hele kopie',1520,840,{align:'center',alpha:p}); }
    return; }
  bg(ctx,'schema'); const ang=li===2?ease(lf)*0.4:li===3?0.4+ease(lf)*0.3:li===4?0.7+ease(lf)*0.3:1; const hl=li===3?'S':li===4?'M':li===5?'S':null;
  clock(ctx,560,470,330,ang,hl,1); term(ctx,'celcyclus',560,860);
  if(li===3){ panel(ctx,1080,250,760,280); T(ctx,'S-fase',1120,340,56,{w:700,color:C.paars}); T(ctx,'synthese: het DNA wordt gekopieerd',1120,410,38,{color:C.text}); dnaIcon(ctx,1150,480,lf<0.5?1:2); }
  if(li===4){ panel(ctx,1080,250,760,280); T(ctx,'M-fase',1120,340,56,{w:700,color:C.goud}); T(ctx,'deling: de kopieën worden verdeeld',1120,410,38); }
  if(li===5){ panel(ctx,1080,250,760,320); T(ctx,'DNA-replicatie',1120,340,56,{w:700}); M(ctx,'ook: dna-verdubbeling',1120,400); T(ctx,'in de S-fase van de celcyclus',1120,470,38,{color:C.text2}); }
};
SCENES.h1b=(ctx,li,lf)=>{ bg(ctx,'schema'); clock(ctx,560,470,330,0.85,'S',1); term(ctx,'celcyclus',560,860);
  panel(ctx,1080,300,760,260); T(ctx,'S-fase: vóór de deling',1120,390,48,{w:700}); T(ctx,'bij het begin van de M-fase',1120,450,38,{color:C.text2}); T(ctx,'is het DNA al dubbel',1120,500,38,{color:C.text2}); dnaIcon(ctx,1700,440,2); };

// ---- H2 Eén streng is genoeg ----
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  const seq='ATGCATGCAT', x0=200, y=180;
  if(li<=3){ ladder(ctx,x0,y,seq,{dx:120,gap:300,bonds:true});
    if(li===1){ const p=ease(lf*2); T(ctx,'A–T  ·  C–G',W/2,620,56,{w:700,align:'center',alpha:p}); M(ctx,'de vorm van de paarrand past',W/2,680,{align:'center',alpha:p}); }
    if(li===2){ const p=ease(lf); ctx.save(); ctx.globalAlpha=1-p*0.75; ctx.fillStyle=C.bgMicro; ctx.restore(); dim(ctx,()=>{},1);
      ctx.save(); ctx.fillStyle=rgba(C.bgMicro,0.65*p); ctx.fillRect(100,y+150,1320,190); ctx.restore(); T(ctx,'ken je één streng, dan ken je de andere',W/2,680,44,{w:600,align:'center',alpha:p}); }
    if(li===3) T(ctx,'en precies dat gebruikt de cel',W/2,680,44,{w:600,align:'center',alpha:ease(lf*2)});
    scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  const T0=li-4+lf; let f,g;
  if(li===4){ f=Math.round(ease(lf)*6); g=0; } else if(li<=7){ f=6; g=0; } else if(li===8){ f=6; g=lf>0.95?1:0; } else if(li===9){ f=7; g=1; } else if(li===10){ f=8+Math.floor(ease(lf)*2); g=1+Math.floor(ease(lf)*5); } else if(li===11){ f=10; g=6+Math.floor(ease(lf)*4); } else { f=10; g=10; }
  replSim(ctx,x0,y,seq,f,g,{helicase:li>=4&&li<=11,poly:li>=9&&li<=11,labels:true,labA:li===4?ease(lf*2):li<=5?1:0,labB:li===9?ease(lf*2):1});
  if(li===5) M(ctx,'elke streng is een voorbeeld',x0,140,{color:C.goud,alpha:ease(lf*2)});
  if(li>=6&&li<=11){ freeNucs(ctx,1480,620,T0,1); if(li===6) label(ctx,'vrije nucleotiden','in het kernplasma',1580,560,1580,470,ease(lf*2),C.text,'left'); }
  if(li===7){ const x=x0; const p=lf; const gx=x-60+p*360, gy=y+560-Math.sin(p*Math.PI)*220; ctx.save(); ctx.translate(gx,gy); ctx.rotate((p-0.5)*1.2); base(ctx,0,0,'A',-1,{mark:C.koraal}); ctx.restore(); if(lf>0.4) M(ctx,'A tegenover A: past niet, stuitert weg',x0-40,y-40,{color:C.koraal}); }
  if(li===8){ const p=ease(lf); const x=x0; if(lf<=0.95) base(ctx,x,y+282+(1-p)*420,'T',-1,{mark:C.goud}); if(p>0.9) hbonds(ctx,x,y+156,y+148,2); if(lf>0.5) M(ctx,'T tegenover A: past, blijft hangen',x0-40,y-40,{color:C.goud}); }
  if(li===12){ const p=ease(lf*2); panel(ctx,1460,580,420,210,p); T(ctx,'het enzym kiest niet',1670,650,40,{w:700,align:'center',alpha:p}); T(ctx,'de basenparing',1670,705,36,{align:'center',color:C.text2,alpha:p}); T(ctx,'bepaalt wat past',1670,750,36,{align:'center',color:C.text2,alpha:p}); }
  scale(ctx,180,'1 nm · vereenvoudigd'); speed(ctx,'simulatie · 10 000× vertraagd');
};
SCENES.h2b=(ctx,li,lf)=>{ bg(ctx,'micro'); const seq='ACGT';
  M(ctx,'oude streng',380,330,{align:'right'}); M(ctx,'nieuwe streng',380,600,{align:'right'});
  backbone(ctx,450,230,4*220,{}); backbone(ctx,450,690,4*220,{});
  for(let i=0;i<4;i++){ const x=560+i*220; base(ctx,x,252,seq[i],1,{s:1.5});
    const show=li>0||lf*5>i; if(show){ base(ctx,x,668,COMP[seq[i]],-1,{s:1.5}); hbonds(ctx,x,252+195+6,668-195-6,(seq[i]==='A'||seq[i]==='T')?2:3); } }
  if(li===1){ const p=ease(lf*2); panel(ctx,1420,330,440,230,p); T(ctx,'U G C A',1640,420,56,{w:700,align:'center',color:C.koraal,alpha:p}); ln(ctx,1480,405,1800,405,C.koraal,3); M(ctx,'u hoort bij rna',1640,490,{align:'center',alpha:p}); M(ctx,'→ aflevering 3',1640,530,{align:'center',alpha:p,color:C.text2}); }
};

// ---- H3 Twee uit één ----
SCENES.h3a=(ctx,li,lf,t)=>{
  if(li<=2){ bg(ctx,'micro'); const p=li===0?ease(lf):1;
    for(let k=0;k<2;k++){ const yy=150+k*(330+20*p); const a=k===0?1:p;
      ladder(ctx,200,yy,'ATGCATGC',{dx:120,gap:280,bonds:true,alpha:a});
      if(li>=1){ const q=li===1?ease(lf):1; ctx.save(); ctx.globalAlpha*=q*a; ctx.setLineDash([10,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2; const oy=k===0?yy:yy+280; roundRect(ctx,120,oy-34,8*120+40,68,14); ctx.stroke(); ctx.restore(); } }
    if(li>=1) label(ctx,'oude streng','omlijnd · + nieuwe partner',1100,150,1300,250,li===1?ease(lf):1,C.text,'left');
    if(li>=1) label(ctx,'oude streng','',1100,760,1300,690,li===1?ease(lf):1,C.text,'left');
    if(li===2) T(ctx,'twee identieke moleculen',1560,470,48,{w:700,align:'center',alpha:ease(lf*2)});
    scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  if(li<=5){ bg(ctx,'schema'); const sp=li===3?Math.round(ease(lf)*50):50;
    T(ctx,'ongeveer '+sp+' nucleotiden per seconde',120,200,48,{w:700});
    const n=li===3?Math.floor(ease(lf)*30):30; for(let i=0;i<n;i++){ box(ctx,120+i*56,240,48,64,6,BC['ATCG'[i%4]],lighten(BC['ATCG'[i%4]],0.3),1); }
    if(li>=4){ const p=li===4?ease(lf):1; T(ctx,'3 miljard basenparen',120,420,44,{alpha:p}); ctx.save(); ctx.globalAlpha*=p; box(ctx,120,450,1680,40,8,C.fill,C.line,1); box(ctx,120,450,4,40,2,C.goud); ctx.restore(); T(ctx,'één enzym: bijna 2 jaar',120,560,44,{w:700,color:C.koraal,alpha:p}); }
    if(li===5){ const p=ease(lf); const k=Math.floor(p*40); for(let i=0;i<k;i++){ const x=125+i*42; box(ctx,x,452,36*Math.min(1,(p*40-i)),36,6,C.groen); } T(ctx,'duizenden startpunten tegelijk → een paar uur',120,680,44,{w:700,color:C.groen,alpha:p}); }
    return; }
  bg(ctx,'micro'); const p=li===6?ease(lf):1; // chromosome with telomeres
  box(ctx,300,430,1320,130,65,BB,BBR,1.5); circ(ctx,960,495,34,C.bgMicro,BBR,1.5);
  ctx.save(); ctx.globalAlpha*=p; box(ctx,300,430,140,130,65,rgba(C.goud,0.85)); box(ctx,1480,430,140,130,65,rgba(C.goud,0.85)); ctx.restore();
  label(ctx,'telomeer','niet-coderend uiteinde',370,430,420,300,p,C.text,'left'); label(ctx,'telomeer','',1550,430,1640,300,p,C.text,'left');
  M(ctx,'chromosoom · schematisch',960,640,{align:'center',color:C.text2});
  if(li===7){ const q=ease(lf); ctx.save(); ctx.globalAlpha*=q; ln(ctx,560,760,1360,760,C.oker,10); box(ctx,520,748,56,24,10,C.goud); box(ctx,1344,748,56,24,10,C.goud); ctx.restore(); M(ctx,'zoals het plastic uiteinde van een veter',960,830,{align:'center',alpha:q}); }
};
SCENES.h3b=(ctx,li,lf)=>{ bg(ctx,'micro'); const seq='ATGCATGC';
  ladder(ctx,280,200,seq,{dx:150,gap:300,bonds:true,shown:li>=2?[1,1,1,1,0,1,1,1]:null});
  const x=280+4*150;
  if(li===0) T(ctx,'duizenden startpunten tegelijk',W/2,720,44,{w:600,align:'center',color:C.groen});
  if(li===1) T(ctx,'gaat het altijd goed?',W/2,720,48,{w:700,align:'center',alpha:ease(lf*2)});
  if(li>=2){ const p=li===2?ease(lf):1; base(ctx,x,478,'G',-1,{alpha:p,mark:C.koraal}); ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.koraal; ctx.lineWidth=2; roundRect(ctx,x-48,190,96,320,16); ctx.stroke(); ctx.restore();
    label(ctx,'A tegenover G','past niet',x+40,330,x+280,120,p,C.koraal,'left'); }
  if(li>=3) T(ctx,'kopieerfout die blijft staan = mutatie',W/2,720,48,{w:700,align:'center',alpha:li===3?ease(lf*2):1});
  if(li===4) M(ctx,'→ aflevering 5',W/2,790,{align:'center',alpha:ease(lf*2)});
  scale(ctx,180,'1 nm · vereenvoudigd');
};

// ---- H4 Richting en halfnieuw (vwo) ----
SCENES.h4a=(ctx,li,lf)=>{
  if(li<=3){ bg(ctx,'micro'); const p=li<=1?0:li===2?ease(lf):1; // two molecules: old (dark backbone) + new (light backbone)
    for(let k=0;k<2;k++){ const yy=150+k*350; const seq='ATGCATG'; const x0=260;
      backbone(ctx,x0-60,yy,7*120,{dx:120,mark:k===0?null:null}); for(let i=0;i<7;i++){ base(ctx,x0+i*120,yy+22,seq[i],1); base(ctx,x0+i*120,yy+258,COMP[seq[i]],-1); }
      backbone(ctx,x0-60,yy+280,7*120,{dx:120}); // label which is old/new
      const oldTop=k===0; ctx.save(); ctx.globalAlpha*=Math.max(p,li>=2?0:0.0); ctx.restore();
      if(li>=2){ M(ctx,oldTop?'oud':'nieuw',x0-90,yy+10,{align:'right',color:oldTop?C.goud:C.text2,alpha:p}); M(ctx,oldTop?'nieuw':'oud',x0-90,yy+290,{align:'right',color:oldTop?C.text2:C.goud,alpha:p});
        ctx.save(); ctx.globalAlpha*=p; ctx.setLineDash([10,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2; roundRect(ctx,x0-80,(oldTop?yy:yy+280)-32,7*120+40,64,14); ctx.stroke(); ctx.restore(); } }
    if(li>=3) T(ctx,'semiconservatief',1560,470,52,{w:700,align:'center',alpha:li===3?ease(lf*2):1}); if(li>=3) M(ctx,'de helft wordt bewaard',1560,530,{align:'center',alpha:li===3?ease(lf*2):1});
    if(li===0) T(ctx,'Voor vwo: drie stappen verder',1560,470,40,{w:600,align:'center',alpha:ease(lf*2)});
    if(li===1) T(ctx,'wat zit er in de nieuwe moleculen?',1560,470,40,{w:600,align:'center',alpha:ease(lf*2)});
    scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  bg(ctx,'schema'); T(ctx,'Meselson en Stahl',120,170,52,{w:700}); M(ctx,'bacteriën · zware en lichte stikstof',120,220);
  tube(ctx,300,280,[[1,HEAVY]],'start: zwaar',1);
  if(li===5){ const p=ease(lf); tube(ctx,800,280,[],'na 1 ronde op licht',p); T(ctx,'?',860,520,72,{w:700,align:'center',alpha:p}); }
  ctx.save(); box(ctx,1300,330,26,90,6,HEAVY); box(ctx,1336,330,26,90,6,HEAVY); ctx.restore(); M(ctx,'zwaar + zwaar',1380,390);
};
SCENES.h4b=(ctx,li,lf,t)=>{
  if(li<=1){ bg(ctx,'schema'); T(ctx,'Meselson en Stahl',120,170,52,{w:700}); tube(ctx,300,280,[[1,HEAVY]],'start: zwaar',1);
    tube(ctx,800,280,[[0.5,'#8C7BBF']],'na 1 ronde',1);
    if(li===1){ const p=ease(lf); tube(ctx,1300,280,[[0.5,'#8C7BBF'],[0,LIGHT]],'na 2 rondes',p); }
    // strand legend
    box(ctx,1620,300,24,80,6,HEAVY); box(ctx,1652,300,24,80,6,LIGHT); M(ctx,'half-zwaar',1700,350);
    return; }
  bg(ctx,'micro');
  if(li<=6){ const seq='ATGCA', x0=360, y=170, dx=180, n=5;
    backbone(ctx,x0-90,y,n*dx,{dx}); for(let i=0;i<n;i++) base(ctx,x0+i*dx,y+22,seq[i],1);
    T(ctx,"5'",x0-150,y+14,40,{w:700,align:'right'}); T(ctx,"3'",x0+n*dx-50,y+14,40,{w:700});
    if(li<=2){ backbone(ctx,x0-90,y+360,n*dx,{dx}); for(let i=0;i<n;i++){ base(ctx,x0+i*dx,y+338,COMP[seq[i]],-1); hbonds(ctx,x0+i*dx,y+156,y+204,(seq[i]==='A'||seq[i]==='T')?2:3); }
      T(ctx,"3'",x0-150,y+374,40,{w:700,align:'right'}); T(ctx,"5'",x0+n*dx-50,y+374,40,{w:700});
      if(li>=2) T(ctx,'antiparallel',1500,370,48,{w:700,alpha:li===2?ease(lf*2):1}); scale(ctx,180,'1 nm · vereenvoudigd'); return; }
    // li 3..6: a new strand on the top template; antiparallel, so it starts at the right (5') and grows to the left (3')
    let k; if(li===3) k=1+Math.floor(ease(lf)*2); else if(li===4) k=3+Math.floor(ease(lf)*2); else k=2;
    const primer=li>=5, left=x0+(n-k)*dx;
    for(let i=n-k;i<n;i++){ const rna=primer; base(ctx,x0+i*dx,y+338,rna?RCOMP[seq[i]]:COMP[seq[i]],-1,{rna}); hbonds(ctx,x0+i*dx,y+156,y+204,(seq[i]==='A'||seq[i]==='T')?2:3); }
    backbone(ctx,left-90,y+360,k*dx,{dx,rna:primer});
    T(ctx,"5'",x0+n*dx-50,y+374,40,{w:700}); T(ctx,"3'",left-215,y+374,40,{w:700,align:'right',color:C.goud});
    T(ctx,'antiparallel',1500,370,40,{w:600,color:C.text2});
    enzyme(ctx,left-120,y+330,0.7,1); label(ctx,'DNA-polymerase',"plakt aan het 3'-uiteinde",left-150,y+460,left-110,y+640,li===3?ease(lf*2):1,C.text,'left');
    if(li===4){ const p=ease(lf); arrow(ctx,x0+n*dx-60,y+470,x0+n*dx-60-760*p,y+470,C.goud,3,1); M(ctx,"nieuwe streng: 5' → 3'",x0+n*dx-60,y+520,{align:'right',color:C.goud}); }
    if(li>=5){ const p=li===5?ease(lf*2):1; label(ctx,'primer','kort rna-startstukje',x0+(n-1)*dx,y+390,x0+(n-1)*dx+60,y+560,p,C.text,'left');
      if(li===6){ const q=ease(lf*2); enzyme(ctx,x0+n*dx+150,y+300,0.55,q); label(ctx,'primase','maakt de primer',x0+n*dx+170,y+400,x0+n*dx+200,y+520,q,C.text,'left'); } }
    scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  // replication fork: leading + lagging strand (li 7..10)
  const fx=1180, fy=440; const P=li===7?ease(lf):1;
  // parental strands open at the fork
  ctx.save(); ctx.lineCap='round'; ctx.strokeStyle=BB; ctx.lineWidth=26; ctx.beginPath(); ctx.moveTo(fx+520,fy-14); ctx.lineTo(fx,fy-14); ctx.quadraticCurveTo(fx-140,fy-20,fx-260,fy-200); ctx.lineTo(fx-1000,fy-200); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(fx+520,fy+14); ctx.lineTo(fx,fy+14); ctx.quadraticCurveTo(fx-140,fy+20,fx-260,fy+200); ctx.lineTo(fx-1000,fy+200); ctx.stroke(); ctx.restore();
  M(ctx,"3'",fx-1040,fy-190,{align:'right',color:C.text2}); M(ctx,"5'",fx-1040,fy+210,{align:'right',color:C.text2});
  enzyme(ctx,fx-40,fy-60,0.6,1); label(ctx,'helicase','',fx+20,fy-60,fx+120,fy-150,1,C.text,'left');
  M(ctx,'vork beweegt →',fx+200,fy-60,{color:C.goud});
  // leading strand: continuous, grows towards the fork (top template)
  if(li>=8){ const p=li===8?ease(lf):1; const x1=fx-980, x2=x1+(fx-300-x1)*p; ctx.save(); ctx.lineCap='round'; ctx.strokeStyle=BC.T; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(x1,fy-160); ctx.lineTo(x2,fy-160); ctx.stroke(); ctx.restore();
    box(ctx,x1-6,fy-170,34,20,6,RC.U); enzyme(ctx,x2+20,fy-210,0.45,1); label(ctx,'leidende streng','één lange keten, met de vork mee',x1+200,fy-160,x1+60,fy-300,p,C.text,'left'); }
  // lagging strand: Okazaki fragments, each built away from the fork
  if(li>=9){ const p=li===9?ease(lf):1; const frags=[[fx-960,fx-760],[fx-720,fx-520],[fx-480,fx-300]]; const nf=Math.ceil(p*3);
    frags.slice(0,nf).forEach(([a,b],k)=>{ const pp=k<nf-1?1:clamp(p*3-k,0,1); const s=b-(b-a)*pp; ctx.save(); ctx.lineCap='round'; box(ctx,b-34,fy+150,34,20,6,RC.U); ctx.strokeStyle=BC.T; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(b-36,fy+160); ctx.lineTo(Math.min(b-36,s),fy+160); ctx.stroke(); ctx.restore(); });
    arrow(ctx,fx-320,fy+215,fx-470,fy+215,C.goud,3,p); M(ctx,'steeds een stukje terug',fx-560,fy+260,{color:C.goud,alpha:p}); }
  if(li>=10){ const p=li===10?ease(lf):1; label(ctx,'Okazaki-fragmenten','',fx-520,fy+170,fx-400,fy+330,p,C.text,'left'); enzyme(ctx,fx-740,fy+120,0.4,p); label(ctx,'ligase','plakt de stukken',fx-740,fy+110,fx-820,fy+30,p,C.text,'left'); label(ctx,'volgende streng','in stukken, van de vork af',fx-950,fy+175,fx-1000,fy+330,p,C.text,'left');
    ctx.save(); ctx.globalAlpha*=p; ctx.restore(); }
  box(ctx,1460,700,26,18,6,RC.U); M(ctx,'primer (rna)',1500,716,{color:C.text2}); box(ctx,1460,750,40,10,5,BC.T); M(ctx,'nieuw dna',1520,764,{color:C.text2});
  speed(ctx,'schematisch · niet op schaal');
};
SCENES.h4c=(ctx,li,lf)=>{ bg(ctx,'schema'); T(ctx,'drie polymerasen',120,170,52,{w:700,alpha:ease(li===0?lf*2:1)});
  const rows=[['DNA-polymerase','DNA → DNA','replicatie · PCR (afl. 7)',BC.T,BC.T],['RNA-polymerase','DNA → RNA','transcriptie (afl. 3)',BC.T,RC.C],['reverse transcriptase','RNA → DNA','sommige virussen',RC.C,BC.T]];
  rows.forEach((r,i)=>{ const show=li>i||(li===i+1&&lf>0)||li>=i+1; if(!show) return; const y=240+i*130; const a=li===i+1?ease(lf*2):1; ctx.save(); ctx.globalAlpha*=a;
    box(ctx,120,y,1680,104,14,C.fill,C.line,1); enzyme(ctx,200,y+20,0.35,1); T(ctx,r[0],290,y+66,40,{w:700}); T(ctx,r[1],900,y+66,40,{w:700}); M(ctx,r[2],1240,y+64,{color:C.text2}); ctx.restore(); });
  if(li>=4){ const p=li===4?ease(lf):1; ctx.save(); ctx.globalAlpha*=p; box(ctx,120,670,1680,90,14,rgba(C.koraal,0.12),C.koraal,1.5); enzyme(ctx,190,686,0.3,1); T(ctx,'DNA-repair-enzymen vervangen verkeerde nucleotiden',290,730,38,{w:600}); ctx.restore(); }
  if(li>=5) M(ctx,'≈ 1 fout per miljard gekopieerde basenparen',120,815,{color:C.text,alpha:li===5?ease(lf*2):1});
  if(li===6) M(ctx,'vwo: semiconservatief · richting · polymerasen',1800,140,{align:'right',color:C.paars,alpha:ease(lf*2)});
};

// ---- Recap ----
SCENES.recap=(ctx,li,lf,t)=>{
  if(li===0){ macroBg(ctx); person(ctx,520,820,640,1); M(ctx,'dag 7 · dicht',420,700,{align:'right'}); zoomCircle(ctx,1300,420,300,517,692,'huidcellen · vergroot',ease(lf*2),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(980,100,700,700); grain(ctx); skinCells(ctx,1300,420,6,5,t,1,1); }); return; }
  bg(ctx,'micro'); const L=microCell(ctx,430,430,230,1,t); dnaIcon(ctx,L.kern.x-30,L.kern.y,2,1);
  const msgs=['','kopiëren vóór de deling: S-fase','helicase · voorbeeld · DNA-polymerase','twee moleculen, gelijk aan het origineel','fouten die blijven staan → aflevering 5','volgende: van DNA naar eiwit'];
  for(let k=1;k<=li;k++) T(ctx,msgs[k],900,170+k*100,40,{w:k===li?700:400,color:k===li?C.text:C.text2,alpha:k===li?ease(lf*2):1});
};
