// ===== DNA 5 · Mutaties — scenes (Part C) =====
// signature: SCENES[name](ctx, li, lf, t, q)   li = line index, lf = 0..1 within the line
const SCENES={};
const PERSON_LOOK={skin:SKINS[0],hair:'#6B4A2B',shirt:'#C8663F',trousers:'#2E4A6A',hairStyle:'short'};
const P=(li,L,lf)=> li>L?1: li<L?0: ease(lf*2);          // progress of line L (0 before, fade during, 1 after)

// ---- small library for this film ----
function beachBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.water; ctx.beginPath(); ctx.moveTo(0,600); ctx.quadraticCurveTo(600,570,1100,600); ctx.quadraticCurveTo(1500,625,1920,590); ctx.lineTo(1920,760); ctx.lineTo(0,760); ctx.fill();
  ctx.fillStyle='#D9C48A'; ctx.beginPath(); ctx.moveTo(0,740); ctx.quadraticCurveTo(700,700,1200,740); ctx.quadraticCurveTo(1600,770,1920,730); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); }
function sun(ctx,x,y,r,alpha=1,t=0,rays=true){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,C.goud,lighten(C.goud,0.3),2);
  if(rays){ ctx.strokeStyle=rgba(C.goud,0.7); ctx.lineWidth=4; ctx.lineCap='round'; for(let k=0;k<12;k++){ const a=k/12*6.283+t*0.1; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*(r+16),y+Math.sin(a)*(r+16)); ctx.lineTo(x+Math.cos(a)*(r+44),y+Math.sin(a)*(r+44)); ctx.stroke(); } }
  ctx.restore(); }
// UV ray: dashed gold line with a small arrowhead, animated along its length
function uvRay(ctx,x1,y1,x2,y2,alpha=1,t=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash([14,10]); ctx.lineDashOffset=-t*60; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.setLineDash([]); arrow(ctx,x2-(x2-x1)*0.08,y2-(y2-y1)*0.08,x2,y2,C.goud,3,1); ctx.restore(); }
// dimer mark: two bases joined by a koraal clamp
function dimerMark(ctx,x1,x2,y,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.koraal; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke(); circ(ctx,x1,y,8,C.koraal); circ(ctx,x2,y,8,C.koraal); ctx.restore(); }
// X-shaped chromosome (Schema), paars; k = tint
function chromo(ctx,x,y,h,alpha=1,col=C.paars,lab=''){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=col; ctx.lineWidth=h*0.16; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x-h*0.22,y-h/2); ctx.lineTo(x+h*0.22,y+h/2); ctx.moveTo(x+h*0.22,y-h/2); ctx.lineTo(x-h*0.22,y+h/2); ctx.stroke(); circ(ctx,x,y,h*0.1,lighten(col,0.4)); if(lab) M(ctx,lab,x,y+h/2+34,{align:'center',color:C.text2}); ctx.restore(); }
// a simple cell (Schema): rounded blob with nucleus; mark = koraal dot in the nucleus (mutation)
function cellS(ctx,x,y,r,alpha=1,mark=false,col=C.fill){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,rgba(col,0.9),C.er,1.5); circ(ctx,x,y,r*0.42,rgba(C.kern,0.8),C.kernR,1); if(mark) circ(ctx,x+r*0.12,y-r*0.1,Math.max(4,r*0.12),C.koraal); ctx.restore(); }
// liver (Schema organ): simple lobed shape, with copper dots when filled
function liver(ctx,x,y,s=1,alpha=1,copper=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.moveTo(x-160*s,y-40*s); ctx.quadraticCurveTo(x-120*s,y-110*s,x+40*s,y-90*s); ctx.quadraticCurveTo(x+170*s,y-70*s,x+150*s,y+20*s); ctx.quadraticCurveTo(x+120*s,y+90*s,x-20*s,y+80*s); ctx.quadraticCurveTo(x-150*s,y+70*s,x-160*s,y-40*s); ctx.closePath(); ctx.fillStyle=rgba(C.bruin,0.85); ctx.fill(); ctx.strokeStyle=lighten(C.bruin,0.35); ctx.lineWidth=1.5; ctx.stroke();
  if(copper>0){ const R=seeded(7); for(let k=0;k<40;k++){ const px=x-140*s+R()*280*s, py=y-70*s+R()*130*s; if(k<copper*40) circ(ctx,px,py,5*s,C.oker); } } ctx.restore(); }
function chick(ctx,x,y,s=1,alpha=1,mark=false){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,40*s,C.goud,lighten(C.goud,0.3),1.5); circ(ctx,x+28*s,y-34*s,24*s,C.goud,lighten(C.goud,0.3),1.5); circ(ctx,x+36*s,y-38*s,3*s,C.kast); ctx.fillStyle=C.koraal; ctx.beginPath(); ctx.moveTo(x+50*s,y-30*s); ctx.lineTo(x+66*s,y-26*s); ctx.lineTo(x+50*s,y-20*s); ctx.closePath(); ctx.fill(); for(const d of [-1,1]) ln(ctx,x+d*12*s,y+40*s,x+d*14*s,y+58*s,C.koraal,3); if(mark) circ(ctx,x-8*s,y+4*s,6*s,C.koraal); ctx.restore(); }
function egg(ctx,x,y,s=1,alpha=1,mark=false){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.ellipse(x,y,34*s,44*s,0,0,6.283); ctx.fillStyle='#EDE4D0'; ctx.fill(); ctx.strokeStyle='#C9BBA0'; ctx.lineWidth=1.5; ctx.stroke(); if(mark) circ(ctx,x,y+4*s,7*s,C.koraal); ctx.restore(); }
function hen(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.ellipse(x,y,70*s,46*s,0,0,6.283); ctx.fillStyle='#E8E2D6'; ctx.fill(); ctx.strokeStyle='#C9BBA0'; ctx.lineWidth=1.5; ctx.stroke(); circ(ctx,x+62*s,y-44*s,24*s,'#E8E2D6','#C9BBA0',1.5); circ(ctx,x+70*s,y-48*s,3*s,C.kast); ctx.fillStyle=C.koraal; ctx.beginPath(); ctx.moveTo(x+84*s,y-42*s); ctx.lineTo(x+102*s,y-38*s); ctx.lineTo(x+84*s,y-32*s); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(x+52*s,y-66*s); ctx.quadraticCurveTo(x+62*s,y-84*s,x+74*s,y-66*s); ctx.fillStyle=C.koraal; ctx.fill(); for(const d of [-1,1]) ln(ctx,x+d*16*s,y+44*s,x+d*18*s,y+66*s,C.koraal,3); ctx.restore(); }
// gene ruler (Schema): promotor · exon · intron · exon, returns x-ranges
function geneBar(ctx,x,y,alpha=1){ if(alpha<=0.01) return {}; const parts=[['p','promotor',140,rgba(C.goud,0.35)],['e','exon',260,RBB],['i','intron',220,rgba('#8FA0B5',0.3)],['e','exon',300,RBB]]; let xx=x; const r={}; ctx.save(); ctx.globalAlpha*=alpha;
  for(const [k,n,w,col] of parts){ box(ctx,xx,y-24,w,48,12,col,k==='e'?RBBR:C.line,1.5); M(ctx,n,xx+w/2,y+60,{align:'center',color:C.text2}); (r[k]=r[k]||[]).push([xx,xx+w]); xx+=w+10; } ctx.restore(); return r; }
// pedal / brake icon pair (Schema)
function pedal(ctx,x,y,kind,alpha=1,stuck=false){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const col=kind==='gas'?C.groen:C.koraal; box(ctx,x-50,y-85,100,170,18,rgba(col,stuck?0.9:0.35),col,2); T(ctx,kind==='gas'?'gas':'rem',x,y+10,36,{w:700,align:'center',color:C.text}); if(stuck){ ctx.strokeStyle=C.text; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-70,y+100); ctx.lineTo(x+70,y+100); ctx.stroke(); } ctx.restore(); }

// ---- title inset: sun rays hitting a ladder, dimer marked ----
SCENES.__title=(ctx,t)=>{ ctx.save(); ctx.translate(1180,120); ctx.scale(0.58,0.58); sun(ctx,120,80,70,1,t); ladder(ctx,200,520,'GATTCA',{dx:120,gap:300,s:1,bonds:true}); uvRay(ctx,200,170,420,480,1,t); dimerMark(ctx,440,560,500,1); ctx.restore(); };

// ---- cold open: beach, sunburn, the spot, the number ----
SCENES.open=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1620,170,90,1,t);
  const red=P(li,1,lf); const skin=red>0.01? `rgb(${Math.round(232+(224-232)*red)},${Math.round(194+(122-194)*red)},${Math.round(164+(95-164)*red)})` : SKINS[0];
  personReal(ctx,520,880,600,1,{skin,hairStyle:'short',armR:{a1:0.5,a2:-0.6},armL:{a1:0.3,a2:0.2}});
  if(li===1) label(ctx,'rood en warm','zonnebrand',600,560,900,420,ease(lf*2),C.koraal,'left');
  if(li>=2){ const p=P(li,2,lf); circ(ctx,585,635,7,C.koraal); label(ctx,'een plekje','dat niet geneest',585,635,760,540,p,C.koraal,'left'); }
  if(li>=3){ const p=P(li,3,lf); panel(ctx,1040,240,760,220,p); T(ctx,'bijna 75 000',1080,330,72,{titel:true,color:C.goud,alpha:p}); T(ctx,'nieuwe huidkankerpatiënten per jaar in Nederland',1080,400,34,{alpha:p}); M(ctx,'iknl · meestal speelt zonlicht mee',1080,440,{alpha:p}); }
  if(li>=4){ const p=ease(lf*2); T(ctx,'Hoe verandert licht je DNA?',1040,620,46,{titel:true,alpha:p}); T(ctx,'En waarom erven je kinderen dat niet?',1040,680,46,{titel:true,alpha:p}); }
};

// ---- H1a: copy errors recap → UV reaches the nucleus ----
SCENES.h1a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li<=1){ ladder(ctx,260,300,'GATTCAGC',{dx:150,gap:300,s:0.9,bonds:true}); enzyme(ctx,1500,330,1.1,1); M(ctx,'dna-polymerase',1500,560,{align:'center',color:C.text2});
    if(li>=1){ const p=ease(lf*2); base(ctx,260+4*150,300+300-22,'A',-1,{s:0.9,mark:C.koraal}); label(ctx,'één fout die blijft staan','mutatie',860,500,1000,720,p,C.koraal,'left'); }
    else label(ctx,'hooguit 1 fout per miljard','na herstel',1100,300,1300,160,ease(lf*2),C.text,'left');
    scale(ctx,165,'1 nm · vereenvoudigd'); return; }
  // li 2–3: skin cell, UV enters from above into the nucleus
  const L=microCell(ctx,960,560,300,1,t); sun(ctx,200,120,60,1,t,false); M(ctx,'huidcel',960,CAPTION_Y-60,{align:'center',color:C.text2});
  if(li>=3){ const p=ease(lf*1.6); for(let k=0;k<3;k++) uvRay(ctx,260+k*40,160,900+k*30-60,470+k*10,p,t); label(ctx,'UV','tot in de kern',900,480,1300,260,p,C.goud,'left'); }
  else label(ctx,'van buiten','straling, stoffen',700,330,520,220,ease(lf*2),C.text,'right');
  speed(ctx,'schematisch · niet op schaal');
};

// ---- H1b: dimer → repair → sunburn cells → replication error → mutation in daughters ----
SCENES.h1b=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const x0=300, dx=150, Y=300, seq='GATTCAGC';
  if(li<=1){ ladder(ctx,x0,Y,seq,{dx,gap:300,s:0.9,bonds:true}); const p=li===0?ease(lf*1.5):1; uvRay(ctx,200,120,x0+2.5*dx,Y+40,p,t); dimerMark(ctx,x0+2*dx,x0+3*dx,Y+60,p); label(ctx,'twee T’s aan elkaar','schade, nog geen mutatie',x0+2.5*dx,Y+60,x0+5.5*dx,180,p,C.koraal,'left'); scale(ctx,165,'1 nm · vereenvoudigd'); return; }
  if(li===2){ const p=ease(lf); ladder(ctx,x0,Y,seq,{dx,gap:300,s:0.9,bonds:true,shown:[1,1,1,1,1,1,1,1]}); // repair: segment lifted out, new one dropped in
    const lift=-120*ease(lf*2)*(1-ease((lf-0.5)*2));
    for(const [i,b] of [[2,'T'],[3,'T']]) base(ctx,x0+i*dx,Y+22+lift,b,1,{s:0.9,alpha:1-ease((lf-0.5)*2)}); dimerMark(ctx,x0+2*dx,x0+3*dx,Y+60+lift,1-ease((lf-0.5)*2));
    const drop=ease((lf-0.5)*2); for(const [i,b] of [[2,'T'],[3,'T']]) base(ctx,x0+i*dx,Y+22-120*(1-drop),b,1,{s:0.9,alpha:drop});
    enzyme(ctx,x0+2.5*dx,Y-210,0.9,1); label(ctx,'herstelenzym','knipt eruit, zet nieuw in',x0+2.5*dx-60,Y-150,x0+5.5*dx,120,1,C.text,'left'); scale(ctx,165,'1 nm · vereenvoudigd'); return; }
  if(li===3){ const p=ease(lf*1.5); // many dimers; damaged cells fade out (vervellen)
    for(let k=0;k<6;k++){ const cx=330+k*260, cy=430; const gone=k%2===0? ease((lf-0.4)*2):0; cellS(ctx,cx,cy,90,1-gone*0.85,false); const R=seeded(k+3); for(let m=0;m<5+k;m++) circ(ctx,cx-40+R()*80,cy-30+R()*60,5,rgba(C.koraal,(1-gone)*p)); }
    M(ctx,'te veel schade: de cel ruimt zichzelf op',960,700,{align:'center',color:C.koraal,alpha:p}); M(ctx,'vervellen',960,750,{align:'center',color:C.text2,alpha:ease((lf-0.4)*2)}); speed(ctx,'schematisch · niet op schaal'); return; }
  if(li<=5){ // replication passes the dimer; the new strand gets a wrong base opposite it
    const p=li===4?ease(lf):1, q2=li===5?ease(lf*1.5):0; ladder(ctx,x0,Y,seq,{dx,gap:300,s:0.9,bonds:true,bottom:false}); dimerMark(ctx,x0+2*dx,x0+3*dx,Y+60,1);
    const n=Math.round(p*8); for(let i=0;i<n;i++){ const wrong=(i===2&&q2>0); base(ctx,x0+i*dx,Y+300-22,wrong?'G':COMP[seq[i]],-1,{s:0.9,mark:wrong?C.koraal:null,alpha:1}); }
    backbone(ctx,x0-dx/2,Y+300,8*dx,{dx,alpha:1}); enzyme(ctx,x0+n*dx-40,Y+120,0.9,1);
    M(ctx,'nieuwe streng',x0+8*dx+30,Y+310,{color:C.text2}); if(li===5) label(ctx,'verkeerde base','tegenover de schade',x0+2*dx,Y+300-40,x0+4.5*dx,760,q2,C.koraal,'left'); scale(ctx,165,'1 nm · vereenvoudigd'); return; }
  // li 6: mutation fixed; two daughter cells carry it
  const p=ease(lf*1.5); const cx=960; cellS(ctx,cx,330,110,1-p*0.6,true); arrow(ctx,cx-60,450,cx-260,560,C.line,2,p); arrow(ctx,cx+60,450,cx+260,560,C.line,2,p); cellS(ctx,cx-300,660,100,p,true); cellS(ctx,cx+300,660,100,p,true); M(ctx,'mutatie',cx,330-150,{align:'center',color:C.koraal}); M(ctx,'elke dochtercel krijgt hem mee',cx,820,{align:'center',color:C.text2,alpha:p}); speed(ctx,'schematisch · niet op schaal');
};

// ---- H1c: mutagene factoren + chance ----
SCENES.h1c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Mutagene factoren',120,170,52,{w:700,alpha:P(li,2,lf)});
  const items=[['UV-licht',0,()=>sun(ctx,420,470,56,1,t)],['röntgen · radioactief',0,()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.lineCap='round'; for(let k=0;k<3;k++){ ctx.beginPath(); for(let i=0;i<=20;i++){ const u=i/20; const x=820+u*160, y=470+Math.sin(u*12+k*2)*18-30+k*30; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); } }],['stoffen in rook',1,()=>{ box(ctx,1300,440,200,24,12,'#EDE4D0'); box(ctx,1500,440,40,24,8,C.koraal); for(let k=0;k<4;k++) circ(ctx,1540+k*28+Math.sin(t*2+k)*6,430-k*26,10+k*2,rgba('#9AA3B2',0.5)); }]];
  items.forEach(([n,L,draw],i)=>{ const p=P(li,L,lf); ctx.save(); ctx.globalAlpha*=p; box(ctx,260+i*500,330,400,300,20,rgba(C.fill,0.9),rgba(C.line,0.5),1); draw(); T(ctx,n,460+i*500,590,36,{w:600,align:'center'}); ctx.restore(); });
  if(li>=2) M(ctx,'maken mutaties vaker · zonder deze factoren ontstaan ze ook, door kopieerfouten',960,700,{align:'center',color:C.text2,alpha:P(li,2,lf)});
  if(li===3){ const p=ease(lf*2); panel(ctx,560,740,800,110,p); T(ctx,'een mutatie ontstaat toevallig',960,808,40,{w:700,align:'center',color:C.goud,alpha:p}); }
};

// ---- H2a: three kinds of point mutation on a tile row ----
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const sq='AUGGUGGCU', x0=330, dx=96, y=250; M(ctx,'puntmutatie · één nucleotidepaar',960,y-90,{align:'center',color:C.text2,alpha:P(li,0,lf)});
  tileRow(ctx,x0,y,sq,{});
  const rows=[['substitutie','AUGGAGGCU',1,i=>i===4],['insertie','AUGGUAGGCU',2,i=>i===5],['deletie','AUGGGGCU',3,null]];
  rows.forEach(([n,s,L,mk],r)=>{ const p=P(li,L,lf); if(p<=0.01) return; const yy=y+140+r*140; ctx.save(); ctx.globalAlpha*=p; T(ctx,n,x0-60,yy+12,36,{w:600,align:'right',color:C.goud}); tileRow(ctx,x0,yy,s,{mark:mk?i=>mk(i)?C.koraal:null:null,dx}); if(n==='deletie'){ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0+4*dx-30,yy+62); ctx.lineTo(x0+4*dx+30,yy+62); ctx.stroke(); M(ctx,'weg',x0+4*dx+60,yy+72,{color:C.koraal}); } ctx.restore(); });
  if(li===4){ const p=ease(lf*2); M(ctx,'wat doet dat met het eiwit? → codontabel (aflevering 4)',960,820,{align:'center',color:C.goud,alpha:p}); }
};

// ---- H2b: silent / other amino acid / stop, in the codon table ----
SCENES.h2b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const hl={}; let keep=['Val'];
  if(li===0){ hl.GUG=C.goud; hl.GUA=C.goud; } else if(li===1){ hl.GUG=C.goud; hl.GAG=C.koraal; keep=['Val','Glu']; } else { hl.UGG=C.goud; hl.UAG=C.koraal; keep=['Trp']; }
  codonTable(ctx,120,150,{cw:300,lh:40,hl,dimOthers:true,keep});
  const p=ease(lf*2); const msgs=[['G U G → G U A','allebei valine','stille mutatie',C.goud],['G U G → G A G','valine → glutaminezuur','ander aminozuur',C.koraal],['U G G → U A G','tryptofaan → stop','eiwit te kort',C.koraal]][li]||['','','',C.goud];
  T(ctx,msgs[0],1540,300,48,{w:700,alpha:p}); T(ctx,msgs[1],1540,360,36,{alpha:p}); T(ctx,msgs[2],1540,440,44,{w:700,color:msgs[3],alpha:p});
};

// ---- H2c: EEN KAT EET VIS ----
SCENES.h2c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const y0=260, s='EENKATEETVIS', s1='ENKATEETVIS', x0=360, dx=96;
  const row=(y,str,alpha,groups=3,mark=null)=>{ ctx.save(); ctx.globalAlpha*=alpha; for(let i=0;i<str.length;i++){ const g=Math.floor(i/groups); const x=x0+i*dx+g*28; box(ctx,x-40,y-44,80,88,10,rgba(C.fill,0.9),rgba(C.line,0.5),1); T(ctx,str[i],x,y+14,44,{w:700,align:'center',color:mark&&mark(i)?C.koraal:C.text}); } ctx.restore(); };
  M(ctx,'het ribosoom leest per drie, zonder spaties',960,120,{align:'center',color:C.text2});
  row(y0,s,1); M(ctx,'EEN · KAT · EET · VIS',x0-40,y0-70,{color:C.text2});
  if(li>=1){ const p=P(li,1,lf); ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x0-30,y0-60); ctx.lineTo(x0+30,y0+60); ctx.stroke(); ctx.restore(); row(y0+170,s1,p,3,i=>true); M(ctx,'ENK · ATE · ETV · IS',x0-40,y0+100,{color:C.koraal,alpha:p}); }
  if(li>=2){ const p=P(li,2,lf); const m='AUGGUGGCUUCA', m1='AUGGUGCUUCA'; ctx.save(); ctx.globalAlpha*=p; tileRow(ctx,x0,y0+360,m,{dx:80,w:68,h:76,px:40}); for(let g=0;g<4;g++) bracket(ctx,x0+g*3*80-34,x0+(g*3+2)*80+34,y0+408,C.line,'',1); tileRow(ctx,x0,y0+500,m1,{dx:80,w:68,h:76,px:40,mark:i=>i>=6?C.koraal:null}); for(let g=0;g<3;g++) bracket(ctx,x0+g*3*80-34,x0+(g*3+2)*80+34,y0+548,g>=2?C.koraal:C.line,'',1); M(ctx,'vanaf de deletie klopt geen codon meer',x0,y0+600,{color:C.koraal}); ctx.restore(); }
  if(li===3){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; ctx.fillStyle=rgba(C.bgSchema,0.92); ctx.fillRect(0,y0+120,W,620); row(y0+300,'KATEETVIS',1); M(ctx,'drie weg: EEN valt af, KAT · EET · VIS klopt nog',960,y0+420,{align:'center',color:C.groen}); ctx.restore(); }
};

// ---- H2v: reading frame; mutation outside an exon ----
SCENES.h2v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});
  if(li<=1){ const m='AUGGUGGCUUCA', x0=360; tileRow(ctx,x0,400,m,{dx:96,w:80,h:92,px:48}); for(let g=0;g<4;g++) bracket(ctx,x0+g*3*96-40,x0+(g*3+2)*96+40,460,C.goud,g===0?'leesraam':'',P(li,1,lf)); if(li===1) M(ctx,'één base erbij of eraf → alles erna verschuift: leesraamverschuiving',960,640,{align:'center',color:C.koraal,alpha:ease(lf*2)}); return; }
  const r=geneBar(ctx,330,520,1); if(li===2){ const p=ease(lf*2); const [px0,px1]=r.p[0], [ix0,ix1]=r.i[0]; circ(ctx,(px0+px1)/2,520,10,C.koraal); label(ctx,'in de promotor','meer of minder mRNA',(px0+px1)/2,510,px0,340,p,C.koraal,'left'); circ(ctx,(ix0+ix1)/2,520,10,C.koraal); label(ctx,'in een intron','meestal niets',(ix0+ix1)/2,530,ix0+40,720,p,C.text,'left'); }
};

// ---- H3a: the Wilson example — liver, copper, one wrong amino acid ----
SCENES.h3a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2019, tijdvak 2',1800,80,{align:'right',color:C.text2});
  liver(ctx,520,480,1.3,1,li===0?ease(lf*1.5)*0.8:0.8); M(ctx,'lever · koper hoopt zich op',520,650,{align:'center',color:C.text2});
  const bx=1250, by=460; for(let k=0;k<7;k++){ if(k) ln(ctx,bx-240+(k-1)*80,by,bx-240+k*80,by,C.oker,4); aaBead(ctx,bx-240+k*80,by,'',k,1); }
  M(ctx,'eiwit voor koperuitscheiding',bx,by+90,{align:'center',color:C.text2});
  if(li>=1){ const p=ease(lf*2); aaBead(ctx,bx,by,'Gln',1,1,C.koraal); label(ctx,'glutamine','waar histidine hoort',bx,by-40,bx+80,250,p,C.koraal,'left'); }
};
// ---- H3b: histidine vs glutamine codons ----
SCENES.h3b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2019, tijdvak 2',1800,80,{align:'right',color:C.text2});
  if(li===0){ const p=ease(lf*1.5); const steps=[['DNA',BC,'GTA',false],['mRNA',RC,'CAU',true],['codon → aminozuur',null,'his',null]]; let x=320; steps.forEach(([n,_,s,rna],i)=>{ ctx.save(); ctx.globalAlpha*=clamp(p*3-i,0,1); M(ctx,n,x+100,300,{align:'center',color:C.text2}); if(rna!==null) tileRow(ctx,x,420,s,{dx:72,w:62,h:72,px:40,rna,mark:j=>j===2?C.koraal:null}); else aaBead(ctx,x+100,420,s==='his'?'His':'',4,1); if(i<2) arrow(ctx,x+230,420,x+330,420,C.line,2,1); ctx.restore(); x+=430; }); M(ctx,'één basenpaar anders → één base anders in het mRNA → één ander codon',960,600,{align:'center',color:C.text2,alpha:p}); return; }
  T(ctx,'histidine',520,220,48,{w:700,align:'center'}); T(ctx,'glutamine',1400,220,48,{w:700,align:'center'});
  const his=['CAU','CAC'], gln=['CAA','CAG']; his.forEach((c,i)=>tileRow(ctx,420,340+i*120,c,{dx:100,w:84,h:92,px:52,mark:li>=2?j=>j===2?C.goud:null:null})); gln.forEach((c,i)=>tileRow(ctx,1300,340+i*120,c,{dx:100,w:84,h:92,px:52,mark:li>=2?j=>j===2?C.koraal:null:null}));
  if(li>=2){ const p=ease(lf*2); arrow(ctx,680,340,1240,340,C.goud,2,p); arrow(ctx,680,460,1240,460,C.goud,2,p); T(ctx,'derde base: U of C werd A of G',960,640,44,{w:700,align:'center',color:C.goud,alpha:p}); }
};
// ---- H3c: four organisation levels ----
SCENES.h3c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const cols=[['molecuulniveau','ander eiwit'],['celniveau','houdt koper vast'],['orgaanniveau','lever beschadigd'],['organismeniveau','leverklachten']];
  cols.forEach(([n,s],i)=>{ const p=P(li,i,lf); const x=300+i*440; ctx.save(); ctx.globalAlpha*=0.25+0.75*p; box(ctx,x-170,230,340,440,20,rgba(C.fill,0.9),p>0.5?C.goud:rgba(C.line,0.5),p>0.5?2:1);
    if(i===0){ for(let k=0;k<5;k++){ if(k) ln(ctx,x-120+(k-1)*60,400,x-120+k*60,400,C.oker,4); aaBead(ctx,x-120+k*60,400,'',k,1,k===2?C.koraal:null); } }
    if(i===1){ cellS(ctx,x,400,90,1,false); for(let k=0;k<8;k++) circ(ctx,x-50+(k%4)*34,380+Math.floor(k/4)*40,6,C.oker); }
    if(i===2) liver(ctx,x,400,0.9,1,0.8);
    if(i===3) personReal(ctx,x,560,300,1,{skin:SKINS[2],hairStyle:'curly'});
    T(ctx,n,x,600,30,{w:700,align:'center',color:C.goud}); M(ctx,s,x,640,{align:'center',color:C.text2}); ctx.restore(); if(i<3) arrow(ctx,x+180,450,x+260,450,C.line,2,P(li,i+1,lf)); });
  if(li===4) M(ctx,'één mutatie · gevolgen van molecuul tot mens',960,820,{align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- H4a: non-disjunction → trisomy 21 → every cell ----
SCENES.h4a=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li===0){ const p=ease(lf); M(ctx,'meiose',960,170,{align:'center',color:C.text2}); circ(ctx,560,420,150,rgba(C.fill,0.6),C.er,1.5); chromo(ctx,520,420,110,1); chromo(ctx,600,420,110,1,lighten(C.paars,0.25)); arrow(ctx,740,420,900,420,C.line,2,1);
    circ(ctx,1150,300,110,rgba(C.fill,0.6),C.er,1.5); circ(ctx,1150,560,110,rgba(C.fill,0.6),C.er,1.5); chromo(ctx,1120,300,90,1); chromo(ctx,1180,300,90,1,lighten(C.paars,0.25)); M(ctx,'twee chromosomen in één cel',1150,440,{align:'center',color:C.koraal,alpha:p}); M(ctx,'geen',1150,570,{align:'center',color:C.text2,alpha:p}); label(ctx,'blijven bij elkaar','',1150,220,1400,180,p,C.koraal,'left'); return; }
  if(li===1){ const p=ease(lf*1.5); M(ctx,'syndroom van Down · drie chromosomen 21',960,170,{align:'center',color:C.text2,alpha:p}); for(let k=0;k<3;k++) chromo(ctx,760+k*200,450,170,clamp(p*3-k,0,1),C.paars,k===0?'21':''); T(ctx,'genoommutatie: het aantal chromosomen is veranderd',960,720,40,{w:700,align:'center',color:C.goud,alpha:p}); return; }
  const p=ease(lf*1.5); egg(ctx,400,460,1.6,1,true); M(ctx,'bevruchte eicel',400,580,{align:'center',color:C.text2}); arrow(ctx,500,460,680,460,C.line,2,p);
  const R=seeded(2); for(let k=0;k<40;k++){ const x=760+(k%10)*110, y=330+Math.floor(k/10)*90; cellS(ctx,x,y,34,clamp(p*2-k/40,0,1),true); } M(ctx,'elke cel van het kind',1255,720,{align:'center',color:C.koraal,alpha:p});
};
SCENES.h4v1=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: chromosoommutatie',120,170,48,{w:700}); const p=ease(li===0?lf*1.5:1);
  const kinds=[['weg',i=>i!==2],['verdubbeld',null],['verplaatst',null]]; kinds.forEach(([n,_],i)=>{ const x=420+i*520; ctx.save(); ctx.globalAlpha*=clamp(p*3-i,0,1); for(let s=0;s<5;s++){ const seg=i===0&&s===2; box(ctx,x-30,300+s*56,60,48,10,seg?rgba(C.koraal,0.2):C.paars,seg?C.koraal:null,seg?2:0); if(seg){ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-30,300+s*56); ctx.lineTo(x+30,348+s*56); ctx.stroke(); } }
    if(i===1) box(ctx,x-30,300+5*56,60,48,10,C.koraal); if(i===2){ box(ctx,x-30,300+2*56,60,48,10,rgba(C.koraal,0.2),C.koraal,2); box(ctx,x+150-30,300,60,200,10,lighten(C.paars,0.25)); box(ctx,x+150-30,300+3*56,60,48,10,C.koraal); arrow(ctx,x+40,324+2*56,x+110,324+3*56,C.koraal,2,1); }
    T(ctx,n,x,660,36,{w:600,align:'center',color:C.goud}); ctx.restore(); });
};

// ---- H4b: the sunburn mutation sits in a skin cell; daughters carry it ----
SCENES.h4b=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,1620,170,90,1,t); personReal(ctx,420,880,600,1,{hairStyle:'short',armR:{a1:0.5,a2:-0.6}});
  zoomCircle(ctx,1250,480,300,560,640,'',1,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(950,180,600,600); grain(ctx); const n=li===0?1: 1+Math.round(ease(lf)*8); const R=seeded(9); for(let k=0;k<9;k++){ const x=1250-180+(k%3)*180, y=480-180+Math.floor(k/3)*180; const on=k===4||k<n&&k!==4; cellS(ctx,x,y,70,1,k===4||(li>=1&&k<n),C.fill); } });
  M(ctx,li===0?'één huidcel met de mutatie':'een plukje huid met de mutatie',1250,CAPTION_Y-40,{align:'center',color:C.koraal});
};
// ---- H4c: chick: all cells vs hen in the sun ----
SCENES.h4c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2025, tijdvak 2',1800,80,{align:'right',color:C.text2});
  egg(ctx,330,400,1.6,1,true); arrow(ctx,420,400,560,400,C.line,2,1); for(let k=0;k<12;k++) cellS(ctx,640+(k%4)*70,330+Math.floor(k/4)*70,28,1,true); arrow(ctx,940,400,1060,400,C.line,2,1); chick(ctx,1180,420,1.4,1,true); M(ctx,'mutatie in de bevruchte eicel → in elke cel',760,600,{align:'center',color:C.koraal});
  if(li>=1){ const p=P(li,1,lf); ctx.save(); ctx.globalAlpha*=p; sun(ctx,1500,230,50,1,t); hen(ctx,1560,470,1.1,1); for(let k=0;k<5;k++) circ(ctx,1500+k*26,430,5,C.koraal); egg(ctx,1700,560,1,1,false); label(ctx,'huidcellen','niet de eicel',1600,440,1860,330,p,C.text,'right'); ctx.restore(); }
  if(li>=2){ const p=P(li,2,lf); panel(ctx,360,680,1200,150,p); T(ctx,'zaadcel of eicel: kan worden doorgegeven',420,740,36,{w:700,color:C.goud,alpha:p}); T(ctx,'huidcel, levercel, darmcel: blijft bij jou',420,795,36,{w:700,alpha:p}); }
};
// ---- H4d: mutations accumulate over years; brake broken → tumour ----
SCENES.h4d=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li<=1){ const yrs=['zomer 1','zomer 2','zomer 3','zomer 4']; yrs.forEach((y,i)=>{ const p=li===0?clamp(ease(lf*1.3)*4-i,0,1):1; ctx.save(); ctx.globalAlpha*=p; sun(ctx,330+i*420,250,40,1,t,false); cellS(ctx,330+i*420,480,90,1,false); const R=seeded(i+5); for(let k=0;k<=i*2;k++) circ(ctx,330+i*420-50+R()*100,440+R()*80,7,C.koraal); M(ctx,y,330+i*420,620,{align:'center',color:C.text2}); ctx.restore(); });
    if(li===1) M(ctx,'de meeste mutaties doen niets: buiten een gen, of stil',960,760,{align:'center',color:C.text2,alpha:ease(lf*2)}); return; }
  if(li===2){ const p=ease(lf*1.5); pedal(ctx,760,450,'gas',1); pedal(ctx,1160,450,'rem',p); M(ctx,'genen die de celdeling besturen',960,250,{align:'center',color:C.text2}); return; }
  // li 3–4: brake broken, clump grows
  const p=li===3?ease(lf):1; pedal(ctx,300,450,'rem',1,true); M(ctx,'rem kapot',300,620,{align:'center',color:C.koraal});
  const n=li===3?1+Math.round(p*11):12+Math.round(ease(lf)*18); const R=seeded(21); for(let k=0;k<n;k++){ const a=hash(k*5)*6.283, r=20+Math.sqrt(k)*42; cellS(ctx,1150+Math.cos(a)*r,430+Math.sin(a)*r,38,1,true); }
  M(ctx,'deelt door · een klomp cellen: tumor',1150,780,{align:'center',color:C.koraal,alpha:li===3?ease(lf*2):1}); if(li===4) M(ctx,'meerdere mutaties nodig in dezelfde cel · vaak jaren',1150,830,{align:'center',color:C.text2,alpha:ease(lf*2)});
};
// ---- H4v: proto-oncogen, tumorsuppressorgen, p53, inherited first hit ----
SCENES.h4v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});
  if(li<=2){ pedal(ctx,560,470,'gas',P(li,1,lf),li>=1); T(ctx,'proto-oncogen',560,640,36,{w:700,align:'center',color:C.groen,alpha:P(li,1,lf)}); M(ctx,'één kapot allel is genoeg',560,690,{align:'center',color:C.text2,alpha:P(li,1,lf)});
    pedal(ctx,1360,470,'rem',P(li,2,lf),li>=2); T(ctx,'tumorsuppressorgen',1360,640,36,{w:700,align:'center',color:C.koraal,alpha:P(li,2,lf)}); M(ctx,'beide allelen moeten uitvallen',1360,690,{align:'center',color:C.text2,alpha:P(li,2,lf)}); return; }
  if(li===3){ const p=ease(lf*1.5); cellS(ctx,700,470,130,1,true); box(ctx,1060,380,180,180,24,rgba(C.koraal,0.2),C.koraal,2); T(ctx,'p53',1150,485,52,{w:700,align:'center',color:C.koraal}); M(ctx,'stopt de cel · of laat haar zichzelf opruimen',1150,620,{align:'center',color:C.text2,alpha:p}); arrow(ctx,850,470,1040,470,C.koraal,2,p); return; }
  const p=ease(lf*1.5); for(let k=0;k<40;k++){ const x=360+(k%10)*130, y=330+Math.floor(k/10)*100; cellS(ctx,x,y,36,1,true); if(k===23) circ(ctx,x-10,y+8,8,C.koraal); } M(ctx,'erfelijk: het eerste kapotte allel in elke cel',960,720,{align:'center',color:C.text2}); label(ctx,'tweede allel valt uit','in één cel',360+3*130-10,330+2*100+8,1200,780,p,C.koraal,'left');
};

// ---- Samenvatting ----
SCENES.recap=(ctx,li,lf,t)=>{ beachBg(ctx); sun(ctx,760,150,80,1,t); personReal(ctx,420,880,600,1,{hairStyle:'short',armR:{a1:0.5,a2:-0.6}});
  const rows=[['UV → schade → herstel → wat blijft: mutatie',C.koraal],['één base: niets · ander aminozuur · te vroeg stop',C.text],['huidcel: blijft bij jou · geslachtscel: erfelijk',C.text],['meestal onmerkbaar · soms iets nieuws: allelen',C.groen],['smeren = DNA-bescherming',C.goud]];
  panel(ctx,900,200,920,560,1); rows.forEach(([s,c],i)=>{ const p=P(li,i,lf); T(ctx,s,960,290+i*100,36,{w:600,color:c,alpha:0.3+0.7*p}); });
};
SCENES.recapv=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo, tot slot',120,170,48,{w:700}); const p=ease(lf*1.5); for(let k=0;k<5;k++){ chromo(ctx,500+k*230,460,150,clamp(p*5-k,0,1),k===2?C.koraal:C.paars); } T(ctx,'mutaties → nieuwe allelen → evolutie',960,720,44,{w:700,align:'center',color:C.goud,alpha:p}); };
SCENES.recap2=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const p=ease(lf*1.5); [['huidcel',560],['levercel',1360]].forEach(([n,x],i)=>{ cellS(ctx,x,440,140,1,false); M(ctx,n,x,640,{align:'center',color:C.text2}); for(let k=0;k<6;k++){ const on=(i===0?[1,1,0,1,0,0]:[0,1,1,0,1,1])[k]; box(ctx,x-96+k*34,680,26,40,6,on?C.goud:rgba(C.line,0.3)); } }); T(ctx,'zelfde DNA · andere genen aan',960,240,44,{w:700,align:'center',color:C.goud,alpha:p}); M(ctx,'aflevering zes',960,800,{align:'center',color:C.text2,alpha:p}); };
