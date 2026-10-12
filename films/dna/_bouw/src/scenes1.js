// ===== DNA 1 · Wat is DNA? — scenes (Part C) =====
const SCENES={};
const PERSON_LOOK={skin:SKINS[3],hair:'#14100E',shirt:'#4E8A74',trousers:'#34425A',hairStyle:'curly'};
const HIST=C.oker; // histonen = eiwit (oker)
function macroBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,720); ctx.quadraticCurveTo(480,640,960,700); ctx.quadraticCurveTo(1440,760,1920,680); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,820,W,H-820); }
function cheekCells(ctx,cx,cy,t,hl=-1){ const R=seeded(5); for(let i=0;i<14;i++){ const a=R()*6.283, d=Math.sqrt(R())*230, x=cx+Math.cos(a)*d, y=cy+Math.sin(a)*d*0.8, rot=R()*3;
  ctx.save(); ctx.translate(x,y); ctx.rotate(rot); blob(ctx,0,0,62,44,0.12,i); shape(ctx,rgba('#3A4A66',0.9),i===hl?C.goud:C.er,i===hl?2.5:1.2); circ(ctx,0,0,12,C.kern,C.kernR,1); ctx.restore(); } }
function bigNucleus(ctx,x,y,r,count=46,alpha=1){ if(alpha<=0.01) return; const k=r/300; ctx.save(); ctx.translate(x,y); ctx.scale(k,k); nucleus(ctx,0,0,300,alpha); threads(ctx,0,0,285,count,alpha,11); ctx.restore(); }
function levels(ctx,stage,alpha=1,y=700){ const items=['base','nucleotide','streng','gen','chromosoom','genoom']; ctx.save(); ctx.globalAlpha*=alpha;
  items.forEach((s,i)=>{ const on=i<stage, x=110+i*290; box(ctx,x,y-40,250,80,12,on?C.fill:null,on?(i===stage-1?C.goud:C.line):rgba(C.line,0.35),1.5); T(ctx,s,x+125,y+12,36,{w:on?700:400,align:'center',color:on?C.text:C.text2}); if(i<5) arrow(ctx,x+252,y,x+288,y,on?C.line:rgba(C.line,0.35),1.5); });
  ctx.restore(); }

SCENES.__title=(ctx,t)=>{ bigNucleus(ctx,1430,520,300,46,1); M(ctx,'celkern · ≈ 6 µm',1430,880,{align:'center',color:C.text2}); };

// ---- Opening: Macro person with swab → zoomcirkel → Micro cheek cells ----
SCENES.open=(ctx,li,lf,t)=>{ macroBg(ctx);
  person(ctx,420,860,680,1,{open:true}); const sx=470, sy=270; swab(ctx,sx+40,sy+20,0.15,li===0?ease(lf*2):1);
  if(li>=1){ const p=li===1?ease(lf*1.6):1; zoomCircle(ctx,1250,430,300,sx+30,sy+20,'wangcellen · vergroot',p,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(950,130,600,600); grain(ctx); cheekCells(ctx,1250,430,t,li>=3?6:-1); }); }
  if(li>=2) label(ctx,'in elke cel','≈ twee meter dna',1450,380,1560,600,li===2?ease(lf*2):1,C.text,'left');
  if(li>=3) M(ctx,'celkern: ≈ 6 µm',1250,820,{align:'center',color:C.goud,alpha:li===3?ease(lf*2):1});
  if(li>=4){ T(ctx,'Hoe past dat?',120,180,64,{titel:true,alpha:ease(lf*2)}); }
};

// ---- H1 Van wang tot molecuul ----
SCENES.h1a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li===0){ const z=ease(lf); microCell(ctx,960,460,lerp(150,330,z),1,t); scale(ctx,lerp(75,165,z),'10 µm'); return; }
  if(li===1){ const z=ease(lf); microCell(ctx,960+lerp(0,500,z),460,lerp(330,1200,z),1-z,t); bigNucleus(ctx,960,460,lerp(90,330,z),46,z); speed(ctx,'inzoomen'); return; }
  const count=li===2?Math.max(1,Math.floor(ease(lf)*46)):46; bigNucleus(ctx,760,450,330,count,1);
  if(li===2) T(ctx,count+' chromosomen',1240,300,48,{w:700});
  if(li>=3&&li<=4) label(ctx,'chromosoom','één lang dna-molecuul',900,350,1240,260,li===3?ease(lf*2):1,C.text,'left');
  if(li===4) M(ctx,'uitgerold · door elkaar',1240,420,{alpha:ease(lf*2)});
  if(li===5){ const p=ease(lf); ctx.save(); ctx.lineCap='round'; ln(ctx,1120,600,1120+680*p,600,C.goud,6); ctx.restore(); label(ctx,'chromosoom 1','uitgerold ≈ 8 cm · vergroot',1120,600,1240,470,p,C.text,'left'); }
  scale(ctx,220,'2 µm');
};
SCENES.h1b=(ctx,li,lf,t)=>{
  if(li===0){ bg(ctx,'schema'); person(ctx,700,800,560,1); const p=ease(lf); box(ctx,900,800-560*1.17*p,26,560*1.17*p,8,C.goud); M(ctx,'2 m dna',940,800-560*1.17-10,{alpha:p}); M(ctx,'jij · ≈ 1,7 m',700,850,{align:'center',color:C.text2});
    T(ctx,'C: twee meter',1240,420,56,{w:700,alpha:p}); M(ctx,'46 chromosomen achter elkaar',1240,480,{alpha:p}); return; }
  bg(ctx,'micro');
  if(li===1){ bigNucleus(ctx,960,450,300,46,1); scale(ctx,200,'2 µm'); T(ctx,'zes micrometer',1360,400,48,{w:700}); M(ctx,'zes duizendste millimeter',1360,450); return; }
  const z=ease(lf); bigNucleus(ctx,960,450,lerp(300,1400,z),46,1-z); M(ctx,'verder inzoomen · tot op het molecuul',960,840,{align:'center',alpha:1-z*0.5}); if(z<0.3) scale(ctx,200,'2 µm'); else speed(ctx,'inzoomen');
};

// ---- H2 De bouwsteen en de ladder ----
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li<=1){ const z=li===0?ease(lf)*0.5:0.5+ease(lf)*0.5; const sep=clamp((z-0.5)*2,0,1)*130;
    ctx.save(); ctx.lineCap='round'; ln(ctx,180,450-sep,1740,450-sep,BB,lerp(60,40,z)); if(sep>2) ln(ctx,180,450+sep,1740,450+sep,BB,40); ctx.restore();
    if(sep>40){ const a=clamp((sep-40)/90,0,1); for(let i=0;i<13;i++){ const x=240+i*120, b='ATGCATGCAATGC'[i]; ctx.save(); ctx.globalAlpha*=a; ln(ctx,x,450-sep+20,x,450,BC[b],14); ln(ctx,x,450,x,450+sep-20,BC[COMP[b]],14); ctx.restore(); } }
    if(li===1) M(ctx,'twee strengen',960,700,{align:'center',alpha:ease(lf*2)});
    scale(ctx,240,z<0.5?'100 nm':'10 nm'); return; }
  if(li===2){ ladder(ctx,240,260,'ATGCATGCAATGC',{dx:120,bottom:false}); const p=ease(lf); for(let i=0;i<13;i++){ ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; roundRect(ctx,240+i*120-48,206,96,230,16); ctx.stroke(); ctx.restore(); }
    T(ctx,'nucleotiden',W/2,560,48,{w:700,align:'center',alpha:p}); M(ctx,'bouwstenen van een streng',W/2,610,{align:'center',alpha:p}); scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  // exploded nucleotide (li 3..7)
  dim(ctx,()=>ladder(ctx,240,130,'ATGCATGCAATGC',{dx:120,bottom:false}),0.35);
  const e=li===3?ease(lf):1; const pos=nucleotide(ctx,420,540,'G',2.0,e,1);
  T(ctx,'nucleotide',300,400,48,{w:700});
  const L=li===4?Math.min(3,Math.floor(lf*3.4)+1):li>4?3:0;
  label(ctx,'fosfaatgroep','',pos.px,600,pos.px+30,780,L>=1?1:0,C.text,'right');
  label(ctx,'desoxyribose','suiker',pos.sx,620,pos.sx+80,780,L>=2?1:0,C.text,'left');
  label(ctx,'stikstofbase','',pos.bx-80,600,pos.bx+40,780,L>=3?1:0,C.text,'left');
  if(li===5) haak(ctx,pos.px-40,pos.sx+50,640,'',C.goud,0)||M(ctx,'fosfaat + suiker = rug van de ketting',1300,420,{color:C.goud,alpha:ease(lf*2)});
  if(li===6) M(ctx,'de base steekt naar binnen',1300,420,{color:C.goud,alpha:ease(lf*2)});
  if(li===7){ const names=['adenine','thymine','cytosine','guanine']; for(let i=0;i<4;i++){ if(lf*7<i) continue; const L='ATCG'[i], y=360+i*105; box(ctx,1440,y-46,64,64,10,BC[L],lighten(BC[L],0.35),1.5); T(ctx,L,1472,y,40,{w:700,align:'center',color:BCL[L]}); T(ctx,names[i],1530,y,40); } }
  scale(ctx,180,'1 nm · vereenvoudigd');
};
SCENES.h2b=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const y=220, seq='ATGCATG', x0=340, dx=140;
  if(li<=1){ ladder(ctx,x0,y,seq,{dx,bottom:false}); const p=li===0?ease(lf):1; backbone(ctx,x0-dx/2,y+300+(1-p)*360,7*dx,{dx}); for(let i=0;i<7;i++) base(ctx,x0+i*dx,y+278+(1-p)*360,COMP[seq[i]],-1);
    if(li===1) M(ctx,'basen naar binnen',W/2,720,{align:'center',alpha:ease(lf*2)}); scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  if(li<=6){ ladder(ctx,x0,y,seq,{dx,bottom:false}); backbone(ctx,x0-dx/2,y+300,3*dx,{dx});
    for(let i=0;i<3;i++){ base(ctx,x0+i*dx,y+278,COMP[seq[i]],-1); hbonds(ctx,x0+i*dx,y+156,y+148,seq[i]==='A'||seq[i]==='T'?2:3); }
    const T0=li-2+lf, x5=x0+4*dx; // position 4 is A
    const R=seeded(77); for(let k=0;k<5;k++){ const bx=1420+k*92+R()*20, by=640+R()*50; const ph=R()*6.28, sp=0.6+R()*0.6; const xx=bx+Math.sin(T0*sp+ph)*24, yy=by+Math.cos(T0*sp*0.8+ph)*18; ctx.save(); ctx.translate(xx,yy); ctx.rotate(Math.sin(T0*0.5+ph)*0.4); base(ctx,0,0,'ACGTC'[k],-1,{alpha:0.85,s:0.85}); ctx.restore(); }
    if(li===3){ const p=ease(lf*2); T(ctx,'A – T  ·  C – G',W/2,680,48,{w:700,align:'center',alpha:p}); M(ctx,'alleen deze paren passen',W/2,730,{align:'center',alpha:p}); }
    if(li===4){ const p=lf; const gx=x5-220+p*440, gy=p<0.5?y+520-(p/0.5)*120:y+400+((p-0.5)/0.5)*200; ctx.save(); ctx.translate(gx,gy); ctx.rotate((p-0.5)*1.2); base(ctx,0,0,'G',-1,{mark:C.koraal}); ctx.restore(); if(lf>0.45) M(ctx,'G tegenover A: past niet, drijft door',x5-200,y-40,{color:C.koraal}); }
    if(li>=5){ const p=li===5?ease(lf):1; base(ctx,x5,y+278+(1-p)*360,'T',-1,{mark:li===5?C.goud:null}); if(p>0.95){ hbonds(ctx,x5,y+156,y+148,2); }
      if(li===5&&lf>0.6) M(ctx,'T tegenover A: past, blijft hangen',x5-200,y-40,{color:C.goud}); }
    if(li===6){ panel(ctx,1440,170,420,220); T(ctx,'basenparing',1650,235,44,{w:700,align:'center'}); T(ctx,'A met T · C met G',1650,295,38,{align:'center'}); M(ctx,'altijd',1650,345,{align:'center'}); }
    scale(ctx,180,'1 nm · vereenvoudigd'); speed(ctx,'simulatie · 10 000× vertraagd'); return; }
  if(li===7){ ladder(ctx,x0,y,seq,{dx,bonds:true}); T(ctx,'dubbelstrengs DNA',W/2,720,48,{w:700,align:'center',alpha:ease(lf*2)}); scale(ctx,180,'1 nm · vereenvoudigd'); return; }
  const tw=ease(lf), a=clamp(1-lf*3,0,1); if(a>0.02) ladder(ctx,x0,y,seq,{dx,alpha:a}); if(tw>0.02) helix(ctx,960,420,1400,tw,clamp(lf*3-0.5,0,1),150,28);
  T(ctx,'helixstructuur',W/2,720,48,{w:700,align:'center',alpha:ease((lf-0.5)*2)}); scale(ctx,180,'1 nm · vereenvoudigd');
};
SCENES.h2c=(ctx,li,lf)=>{ bg(ctx,'micro'); const seq='ATTGC';
  if(li<=1){ backbone(ctx,420,200,5*220,{}); backbone(ctx,420,640,5*220,{}); M(ctx,'gegeven',380,300,{align:'right'}); M(ctx,'andere streng',380,560,{align:'right'});
    for(let i=0;i<5;i++){ const x=530+i*220; base(ctx,x,222,seq[i],1,{s:1.4}); const show=li>0||lf*6>i; if(show){ base(ctx,x,618,COMP[seq[i]],-1,{s:1.4}); hbonds(ctx,x,222+182+6,618-182-6,(seq[i]==='A'||seq[i]==='T')?2:3); } }
    if(li===1) T(ctx,'ken je één streng, dan ken je de andere',W/2,780,44,{w:600,align:'center',alpha:ease(lf*2)}); return; }
  const pos=nucleotide(ctx,500,430,'A',1.6,1,1); T(ctx,'nucleotide',300,280,48,{w:700});
  if(li>=3){ const p=li===3?ease(lf*2):1; ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(pos.px,430,60,0,6.283); ctx.stroke(); roundRect(ctx,pos.bx-120,365,240,130,16); ctx.stroke(); ctx.restore();
    label(ctx,'P = fosfor','in het fosfaat',pos.px,490,pos.px+20,640,p,C.text,'left'); label(ctx,'N = stikstof','in de base',pos.bx,495,pos.bx+40,640,p,C.text,'left'); }
  if(li===4){ const p=ease(lf*2); panel(ctx,1300,300,560,190,p); T(ctx,'een plant haalt fosfaat',1580,375,38,{align:'center',alpha:p}); T(ctx,'en nitraat uit de bodem',1580,425,38,{align:'center',alpha:p}); }
};

// ---- H3 Van volgorde tot gen tot genoom (Schema) ----
SCENES.h3a=(ctx,li,lf)=>{ bg(ctx,'schema'); const R=seeded(31); const seq=[]; for(let i=0;i<40;i++) seq.push('ATCG'[Math.floor(R()*4)]);
  const tile=(x,y,b,mark)=>{ box(ctx,x,y,36,56,6,BC[b],mark?C.goud:lighten(BC[b],0.3),mark?2.5:1); T(ctx,b,x+18,y+38,28,{w:700,align:'center',color:BCL[b]}); };
  const show=li===0?Math.floor(ease(lf)*40):40; for(let i=0;i<show;i++) tile(100+i*43,200,seq[i]);
  if(li===0) M(ctx,'vier letters: a · t · c · g',100,320,{alpha:ease(lf*2)});
  if(li===1||li===2){ const R2=seeded(32); for(let i=0;i<40;i++){ const diff=li===2&&lf>0.3&&(i%7===3); const b=diff?'ATCG'[(('ATCG'.indexOf(seq[i]))+1+Math.floor(R2()*3))%4]:seq[i]; tile(100+i*43,300,b,diff); }
    M(ctx,'jij',1840,180,{align:'right'}); M(ctx,'iemand anders',1840,390,{align:'right'}); if(li===2) T(ctx,'het verschil zit in de volgorde',100,470,44,{w:700,alpha:ease(lf*2)}); }
  if(li>=3&&li<=6) T(ctx,'nucleotidenvolgorde · DNA-sequentie',100,410,48,{w:700,alpha:li===3?ease(lf*2):1});
  if(li===4){ const n=Math.floor(ease(lf)*3200000000); T(ctx,n.toLocaleString('nl-NL')+' basenparen',100,520,48,{w:700}); M(ctx,'in één set van 23 chromosomen',100,570); }
  if(li>=5&&li<=6){ const p=li===5?ease(lf):1; ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.goud; ctx.lineWidth=2; roundRect(ctx,100+8*43-6,190,14*43+8,76,10); ctx.stroke(); ctx.restore(); T(ctx,'gen',100+15*43,170,44,{w:700,align:'center',color:C.goud,alpha:p}); M(ctx,'informatie voor één eiwit',100+15*43,300+0,{align:'center',alpha:p}); }
  if(li===6) M(ctx,'→ aflevering 3: van gen naar eiwit',100,520,{alpha:ease(lf*2)});
  if(li===7){ const p=ease(lf); box(ctx,100,330,1720,180,18,rgba(C.paars,0.12),C.paars,1.5); T(ctx,'genoom',960,435,56,{w:700,align:'center',alpha:p}); M(ctx,'alle dna in een cel samen',960,485,{align:'center',alpha:p}); }
  if(li>=7) levels(ctx,li===8?Math.min(6,1+Math.floor(ease(lf)*6)):0,li===8?1:0,700);
};
SCENES.h3b=(ctx,li,lf,t)=>{
  if(li<=3){ bg(ctx,'schema'); for(let i=0;i<50;i++){ const x=100+i*34, on=(i===0); box(ctx,x,280,30,120,4,on?C.goud:(li===3&&i===25?rgba(C.paars,0.95):C.fill),on?C.goud:(li===3&&i===25?C.paars:rgba(C.line,0.4)),1); }
    M(ctx,'1 blokje = 2 % van het dna',100,440,{color:C.text2});
    T(ctx,'coderend DNA ≈ 2 %',100,240,48,{w:700,color:C.goud,alpha:li===0?ease(lf):1});
    if(li>=1) T(ctx,'niet-coderend DNA',1820,470,44,{w:700,align:'right',alpha:li===1?ease(lf):1});
    if(li===2) M(ctx,'een deel regelt wanneer genen aan of uit staan → aflevering 6',100,560,{alpha:ease(lf*2)});
    if(li===3){ M(ctx,'een deel is uniek voor jou → aflevering 7',100,560,{color:C.paars,alpha:ease(lf*2)}); M(ctx,'(minder dan 1 blokje · niet op schaal)',100,605,{color:C.text2,alpha:ease(lf*2)}); } return; }
  bg(ctx,'micro'); const L=microCell(ctx,560,460,280,1,t);
  if(li===4) T(ctx,'zit al het DNA in de kern? bijna',1080,200,44,{w:600});
  if(li>=5){ const p=li===5?ease(lf):1; L.mitos.forEach(m=>{ ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.paars; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(m.x,m.y,9,0,6.283); ctx.stroke(); ctx.restore(); });
    label(ctx,'mitochondrium','eigen kleine ring-dna',L.mitos[0].x,L.mitos[0].y,L.mitos[0].x-40,820,p,C.text,'left'); }
  if(li>=6){ const p=ease(lf*(li===6?1:9)); ctx.save(); ctx.globalAlpha*=p; ctx.beginPath(); ctx.ellipse(1500,470,170,95,0.15,0,6.283); shape(ctx,rgba('#3A4A66',0.9),C.teal,1.5); ctx.restore();
    ctx.save(); ctx.globalAlpha*=p; ctx.beginPath(); for(let a=0;a<6.283;a+=0.1){ const r=62+Math.sin(a*5)*10; const X=1500+r*Math.cos(a)*1.2, Y=470+r*Math.sin(a)*0.55; a?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.closePath(); ctx.strokeStyle=C.paars; ctx.lineWidth=3; ctx.stroke();
    for(const [x,y] of [[1400,430],[1600,440],[1550,525]]){ ctx.beginPath(); ctx.arc(x,y,15,0,6.283); ctx.stroke(); } ctx.restore();
    label(ctx,'plasmiden','losse dna-ringetjes',1600,440,1380,700,p,C.text,'left'); M(ctx,'bacterie · niet op schaal',1500,340,{align:'center',alpha:p,color:C.text2}); }
};

// ---- H4 Richting, bruggen en verpakking (vwo) ----
SCENES.h4a=(ctx,li,lf)=>{ bg(ctx,'micro'); const seq='ATGCA', x0=330, y=200, dx=180, n=5;
  ladder(ctx,x0,y,seq,{dx,gap:340,bonds:true});
  if(li===0) T(ctx,'Voor vwo: drie stappen verder',1400,600,40,{w:600,align:'center',alpha:ease(lf*2)});
  if(li>=3){ const p=li===3?ease(lf):1; panel(ctx,1250,150,600,420,p); ctx.save(); ctx.globalAlpha*=p; T(ctx,'suiker',1290,210,36,{color:C.text2});
    const cx=1520, cy=370; ctx.beginPath(); for(let k=0;k<5;k++){ const a=(-90+k*72)*Math.PI/180; const X=cx+90*Math.cos(a),Y=cy+90*Math.sin(a); k?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.closePath(); ctx.fillStyle='#5E4E96'; ctx.fill(); ctx.strokeStyle=lighten('#5E4E96',0.35); ctx.lineWidth=1.5; ctx.stroke();
    const nums=["1'","2'","3'","4'","5'"]; for(let k=0;k<5;k++){ const a=(-90+k*72)*Math.PI/180; T(ctx,nums[k],cx+128*Math.cos(a),cy+128*Math.sin(a)+12,36,{w:700,align:'center',color:(li>=4&&k===4)||(li>=5&&k===2)?C.goud:C.text}); }
    if(li>=4) M(ctx,"5' → fosfaat",1290,530,{color:C.goud}); if(li>=5) M(ctx,"3' → oh",1600,530,{color:C.goud}); ctx.restore(); }
  if(li>=4) T(ctx,"5'",x0-150,y+14,40,{w:700,align:'right',alpha:li===4?ease(lf*2):1});
  if(li>=5){ T(ctx,"3'",x0+n*dx-60,y+14,40,{w:700}); T(ctx,"3'",x0-150,y+354,40,{w:700,align:'right',alpha:li===5?ease(lf*2):1}); T(ctx,"5'",x0+n*dx-60,y+354,40,{w:700}); }
  if(li>=6){ const p=li===6?ease(lf):1; arrow(ctx,x0-90,y-70,x0-90+n*dx*p,y-70,C.goud,3,1); arrow(ctx,x0+n*dx-90,y+420,x0+n*dx-90-n*dx*p,y+420,C.goud,3,1); }
  if(li>=7) T(ctx,'antiparallel',x0-90,y+510,48,{w:700,alpha:li===7?ease(lf*2):1});
  if(li===8) M(ctx,"volgorde altijd van 5' naar 3' opschrijven",x0-90,y+570,{color:C.goud,alpha:ease(lf*2)});
  scale(ctx,180,'1 nm · vereenvoudigd');
};
SCENES.h4b=(ctx,li,lf)=>{ bg(ctx,'micro'); const seq='ATGCA', x0=330, y=200, dx=200, n=5;
  let sep=0; if(li===3) sep=clamp((lf-0.4)*2,0,1); if(li===4) sep=1-ease(lf);
  const top=y-sep*90, bot=y+340+sep*150;
  backbone(ctx,x0-dx/2,top,n*dx,{dx}); backbone(ctx,x0-dx/2,bot,n*dx,{dx});
  for(let i=0;i<n;i++){ const x=x0+i*dx, b=seq[i]; base(ctx,x,top+22,b,1); base(ctx,x,bot-22,COMP[b],-1);
    if(li>=1&&sep<0.05) hbonds(ctx,x,top+156,bot-156,(b==='A'||b==='T')?2:3,li===1?ease(lf*2):1);
    if(li===2) T(ctx,String((b==='A'||b==='T')?2:3),x+44,y+184,40,{w:700,color:C.goud,alpha:ease(lf*2)}); }
  if(li>=1&&li<=2) label(ctx,'waterstofbruggen','zwak',x0+dx*2-8,y+170,1440,640,li===1?ease(lf*2):1,C.text,'left');
  if(li===2) M(ctx,'a = t: twee · c ≡ g: drie',1440,740,{color:C.goud});
  if(li===3){ thermometer(ctx,1700,180,420,ease(lf),1); M(ctx,lf>0.5?'de strengen laten los':'verwarmen tot ≈ 95 °c',1620,810,{align:'right',color:C.koraal}); }
  if(li===4){ thermometer(ctx,1700,180,420,1-ease(lf),1); M(ctx,'afkoelen: passende volgorden vinden elkaar terug',1620,810,{align:'right',color:C.text2}); }
  scale(ctx,180,'1 nm · vereenvoudigd');
};
SCENES.h4c=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li<=1){ const seqs=['ATATAT','GCGCGC'];
    for(let k=0;k<2;k++){ const x0=260, y=90+k*400, seq=seqs[k], G=250, s=0.75; const open=k===0?(li===0?ease(lf):1):(li===0?clamp(ease(lf)*2-1,0,1)*0.5:0.5); const o=open*45;
      backbone(ctx,x0-65,y-o,6*130,{dx:130}); backbone(ctx,x0-65,y+G+o,6*130,{dx:130});
      for(let i=0;i<6;i++){ const x=x0+i*130; base(ctx,x,y+22-o,seq[i],1,{s}); base(ctx,x,y+G-22+o,COMP[seq[i]],-1,{s}); if(open<0.05) hbonds(ctx,x,y+22+98+4,y+G-22-98-4,k?3:2); }
      M(ctx,k?'veel c en g · drie bruggen':'veel a en t · twee bruggen',1080,y+G/2+10,{color:k?C.text2:C.goud}); }
    thermometer(ctx,1760,200,440,0.75,1);
    if(li===1){ T(ctx,'hybridisatie',1400,800,48,{w:700,align:'center',alpha:ease(lf*2)}); M(ctx,'→ aflevering 7',1400,845,{align:'center',alpha:ease(lf*2)}); }
    return; }
  const nb=8; const p=li<=3?0:li===4?ease(lf):1;
  if(li<6){ ctx.save(); ctx.beginPath(); for(let x=160;x<=1760;x+=10){ const yy=440+Math.sin(x/90)*18; x===160?ctx.moveTo(x,yy):ctx.lineTo(x,yy); } ctx.strokeStyle=BBR; ctx.lineWidth=8; ctx.stroke(); ctx.restore();
    for(let k=0;k<nb;k++){ const x=240+k*200, y=440+Math.sin(x/90)*18; if(p>0){ ctx.save(); ctx.globalAlpha*=p; circ(ctx,x,y,46,HIST,lighten(HIST,0.35),1.5); ctx.beginPath(); for(let a=0;a<Math.PI*3.5;a+=0.1){ const r=58+Math.sin(a*2)*4; const X=x+r*Math.cos(a), Y=y+r*0.6*Math.sin(a)+(a/(Math.PI*3.5)-0.5)*40; a?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.strokeStyle=BBR; ctx.lineWidth=8; ctx.stroke(); ctx.restore(); } } }
  if(li===2) T(ctx,'terug naar de puzzel: twee meter in zes micrometer',W/2,720,44,{w:600,align:'center'});
  if(li===3) T(ctx,'alleen met opwikkelen',W/2,720,44,{w:600,align:'center'});
  if(li===4) label(ctx,'histonen','eiwitten',240,440,300,680,ease(lf*2),C.text,'left');
  if(li===5){ T(ctx,'nucleosoom',W/2,700,48,{w:700,align:'center',alpha:ease(lf*2)}); M(ctx,'dna om acht histonen',W/2,750,{align:'center',alpha:ease(lf*2)}); ctx.save(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(240,440,84,0,6.283); ctx.stroke(); ctx.restore(); }
  if(li>=6&&li<=7){ const q=li===6?ease(lf):1; const pts=[]; for(let k=0;k<nb;k++) pts.push([240+k*180,440+(k%2?-1:1)*110*q]);
    ctx.save(); ctx.beginPath(); pts.forEach(([x,y],k)=>k?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.strokeStyle=BBR; ctx.lineWidth=10; ctx.stroke(); ctx.restore(); pts.forEach(([x,y])=>circ(ctx,x,y,46,HIST,lighten(HIST,0.35),1.5));
    T(ctx,'chromatine',W/2,720,48,{w:700,align:'center'}); }
  if(li===7){ const q=ease(lf); ctx.save(); ctx.globalAlpha*=q; box(ctx,1700,200,110,500,55,BB,BBR,1.5); circ(ctx,1755,450,26,C.bgMicro,BBR,1.5); ctx.restore(); M(ctx,'vlak voor de deling',1755,760,{align:'center',alpha:q}); }
  if(li===8){ T(ctx,'antiparallel · waterstofbruggen · chromatine',W/2,450,44,{w:700,align:'center',color:C.paars}); }
};

// ---- Recap ----
SCENES.recap=(ctx,li,lf,t)=>{
  if(li===0){ macroBg(ctx); person(ctx,420,860,680,1,{open:true}); swab(ctx,510,290,0.15,1); return; }
  bg(ctx,'micro'); bigNucleus(ctx,420,450,250,46,1); scale(ctx,167,'2 µm');
  const msgs=['','strak opgewikkeld in de kern','basenparing: A–T, C–G','volgorde = informatie · gen · genoom','een paar stukjes zijn uniek voor jou','volgende: DNA kopiëren'];
  for(let k=1;k<=li;k++) T(ctx,msgs[k],800,170+k*100,40,{w:k===li?700:400,color:k===li?C.text:C.text2,alpha:k===li?ease(lf*2):1});
};
