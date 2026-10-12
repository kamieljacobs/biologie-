// ===== DNA 3 · Van DNA naar eiwit — scenes (Part C) =====
// signature: SCENES[name](ctx, li, lf, t, q)   li = line index, lf = 0..1 within the line
const SCENES={};
const PERSON_LOOK={skin:SKINS[2],hair:'#1E1814',shirt:'#B07A5A',trousers:'#2E3A4E',hairStyle:'bun'};
function macroBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,720); ctx.quadraticCurveTo(480,640,960,700); ctx.quadraticCurveTo(1440,760,1920,680); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,820,W,H-820); }
function syringe(ctx,x,y,rot,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot);
  box(ctx,0,-18,200,36,8,rgba(C.fill,0.9),'#AFC0D0',1.5); box(ctx,8,-12,120,24,4,rgba(C.teal,0.35)); box(ctx,200,-6,40,12,3,null,'#AFC0D0',1.5); ln(ctx,240,0,300,0,'#AFC0D0',2); box(ctx,-60,-6,60,12,3,null,'#AFC0D0',1.5); box(ctx,-72,-26,14,52,4,'#AFC0D0'); ctx.restore(); }
function muscleCell(ctx,cx,cy,w,h){ // long Micro cell with striations, several nuclei at the edge
  box(ctx,cx-w/2,cy-h/2,w,h,h/2,rgba('#3A4A66',0.85),C.er,1.5); ctx.save(); ctx.globalAlpha*=0.35; for(let x=cx-w/2+40;x<cx+w/2-40;x+=26) ln(ctx,x,cy-h/2+12,x,cy+h/2-12,'#D88E7A',3); ctx.restore();
  for(const k of [-0.33,0.05,0.38]){ ctx.beginPath(); ctx.ellipse(cx+k*w,cy-h/2+30,38,18,0,0,6.283); ctx.fillStyle=C.kern; ctx.fill(); ctx.strokeStyle=C.kernR; ctx.lineWidth=1.2; ctx.stroke(); } }
function dnaIcon(ctx,x,y,alpha=1,sc=1){ ctx.save(); ctx.globalAlpha*=alpha; for(const sgn of [1,-1]){ ctx.beginPath(); for(let i=0;i<=36;i++){ const yy=y-54*sc+i*3*sc; const dx=sgn*16*sc*Math.sin(i*0.36); i?ctx.lineTo(x+dx,yy):ctx.moveTo(x+dx,yy);} ctx.strokeStyle=sgn>0?BBR:BC.A; ctx.lineWidth=6*sc; ctx.stroke(); } ctx.restore(); }
// teal squiggle = an mRNA molecule seen from afar (Micro overview)
function mrnaSquiggle(ctx,pts,alpha=1,w=6){ if(alpha<=0.01||pts.length<2) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.strokeStyle=C.teal; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke(); ctx.restore(); }
function wavePts(x1,y1,x2,y2,n=40,amp=10,ph=0){ const P=[]; for(let i=0;i<=n;i++){ const u=i/n; const x=x1+(x2-x1)*u, y=y1+(y2-y1)*u; const nx=-(y2-y1), ny=(x2-x1), L=Math.hypot(nx,ny)||1; const o=amp*Math.sin(u*Math.PI*6+ph); P.push([x+nx/L*o,y+ny/L*o]); } return P; }
function partPts(P,u){ const k=Math.max(2,Math.round(P.length*clamp(u,0,1))); return P.slice(0,k); }
// protein icon (oker): small folded blob
function eiwit(ctx,x,y,r,alpha=1,seed=3,col=C.oker){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; blob(ctx,x,y,r,r*0.8,0.18,seed); shape(ctx,rgba(col,0.9),lighten(col,0.35),1.5); ctx.restore(); }
// spike-protein icon (virus eiwit): stalk + head, oker
function spike(ctx,x,y,s=1,alpha=1,rot=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot); ln(ctx,0,0,0,-22*s,C.oker,5*s); circ(ctx,0,-30*s,11*s,C.oker,lighten(C.oker,0.35),1.2); ctx.restore(); }
// letter tile (Schema): one nucleotide as a letter in its colour
const ANTI=c=>c.split('').map(b=>({A:'U',U:'A',G:'C',C:'G'})[b]).join('');

SCENES.__title=(ctx,t)=>{ ctx.save(); ctx.translate(1180,300); ctx.scale(0.45,0.45); SCENES.h3a(ctx,9,0.45,0,true); ctx.restore(); };

// ---- cold open: Macro arm with syringe → zoomcirkel → Micro muscle cell ----
SCENES.open=(ctx,li,lf,t)=>{ macroBg(ctx); person(ctx,420,880,600,1); const ax=488, ay=880-600*0.66;
  syringe(ctx,ax+190,ay-110,2.45,li===0?ease(lf*2):1);
  if(li>=1){ const p=li===1?ease(lf*1.6):1; zoomCircle(ctx,1250,430,320,ax+30,ay,'spiercel · vergroot',p,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(930,110,640,640); grain(ctx); muscleCell(ctx,1250,470,560,300);
      lnp(ctx,1110,300,46,1,t); lnp(ctx,1380,560,40,1,t+1);
      if(li>=2){ const p=li===2?ease(lf):1; for(let k=0;k<8;k++){ const x=1050+k*55, y=440+Math.sin(k*1.7)*50; spike(ctx,x,y+14,1,p,Math.sin(k)*0.4); } } }); }
  if(li>=1) label(ctx,'vetbolletje','met mrna',1110,300,1560,160,li===1?ease(lf*2):1,C.text,'left');
  if(li>=2) label(ctx,'eiwit van het virus','in je eigen cel',1380,420,1560,700,li===2?ease(lf*2):1,C.text,'left');
  if(li===3) M(ctx,'nooit eerder gemaakt',1250,820,{align:'center',color:C.goud,alpha:ease(lf*2)});
  if(li>=4) T(ctx,'Hoe volgt een cel een recept',100,110,52,{titel:true,alpha:ease(lf*2)}), T(ctx,'dat niet in haar DNA staat?',100,172,52,{titel:true,alpha:ease(lf*2)});
};

// ---- H1 Een gen is een recept ----
SCENES.h1a=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const L=microCell(ctx,820,470,330,1,t,{showGolgi:true,showER:true}); const k=L.kern;
  dnaIcon(ctx,k.x,k.y+20,1,1);
  if(li===0){ const p=ease(lf*1.5); const P=[[1080,330],[1180,560],[960,640],[1260,420],[700,700],[1330,600]]; P.forEach((q,i)=>eiwit(ctx,q[0],q[1],22,clamp(p*3-i*0.4,0,1),i+2));
    label(ctx,'eiwitten','enzymen · receptoren · antistoffen',1260,420,1150,170,p,C.text,'left'); }
  if(li>=1){ const p=li===1?ease(lf*2):1; ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(k.x-16,k.y-8); ctx.lineTo(k.x+16,k.y-8); ctx.stroke(); ctx.restore();
    label(ctx,'gen','een recept voor één eiwit',k.x+18,k.y-8,k.x-60,140,p,C.goud,'right'); }
  if(li>=2){ const p=li===2?ease(lf*2):1; label(ctx,'kern','hier ligt het dna',k.x-k.r*0.7,k.y+k.r*0.7,470,730,p,C.text,'right');
    label(ctx,'ribosomen','in het cytoplasma',1150,500,1450,760,p,C.text,'left'); ctx.save(); ctx.globalAlpha*=p; circ(ctx,1150,500,30,null,C.goud,2); ctx.restore(); }
  if(li===3){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; ctx.setLineDash([10,8]); circ(ctx,k.x,k.y,k.r+20,null,C.koraal,3); ctx.restore(); M(ctx,'het dna blijft in de kern',820,860,{align:'center',color:C.koraal,alpha:p}); }
  scale(ctx,150,'10 µm');
};
SCENES.h1b=(ctx,li,lf,t)=>{
  if(li<=1){ bg(ctx,'micro'); const L=microCell(ctx,820,470,330,1,t,{showGolgi:true,showER:true}); const k=L.kern; dnaIcon(ctx,k.x,k.y+20,1,1);
    const P=wavePts(k.x+10,k.y-10,k.x+k.r+260,k.y-80,40,8,t*2); const u=li===0?ease(lf)*0.45:0.45+ease(lf)*0.55; mrnaSquiggle(ctx,partPts(P,u),1,6);
    label(ctx,'afschrift van één gen','rna',k.x+60,k.y-20,k.x+160,150,li===0?ease(lf*2):1,C.text,'left');
    if(li===1) M(ctx,'dna blijft · afschrift gaat naar buiten',820,850,{align:'center',color:C.goud,alpha:ease(lf*2)});
    scale(ctx,150,'10 µm'); return; }
  bg(ctx,'schema');
  if(li<=5){ T(ctx,'DNA en RNA: drie verschillen',120,150,52,{w:700}); const X1=760, X2=1360;
    T(ctx,'DNA',X1,250,56,{w:700,align:'center',color:C.paars}); T(ctx,'RNA',X2,250,56,{w:700,align:'center',color:C.teal});
    const rows=[['strengen','twee · ladder','één streng'],['suiker','desoxyribose','ribose'],['basen','A  T  C  G','A  U  C  G']];
    rows.forEach((r,i)=>{ const show=li>=3+i; if(!show) return; const a=li===3+i?ease(lf*2):1; const y=360+i*150; ctx.save(); ctx.globalAlpha*=a; box(ctx,120,y-70,1680,120,14,C.fill,rgba(C.line,0.6),1); ctx.restore();
      M(ctx,r[0],160,y,{alpha:a}); if(i<2){ T(ctx,r[1],X1,y+14,44,{align:'center',alpha:a}); T(ctx,r[2],X2,y+14,44,{w:700,align:'center',alpha:a}); } else { 'ATCG'.split('').forEach((b,j)=>T(ctx,b,X1+(j-1.5)*70,y+14,44,{align:'center',alpha:a})); 'AUCG'.split('').forEach((b,j)=>T(ctx,b,X2+(j-1.5)*70,y+14,44,{w:700,align:'center',alpha:a})); } });
    if(li>=5){ const a=li===5?ease(lf*2):1; ctx.save(); ctx.globalAlpha*=a; box(ctx,X2-35-30,660-46,60,64,8,null,C.goud,3); box(ctx,X1-35-30,660-46,60,64,8,null,C.goud,3); ctx.restore(); M(ctx,'u in plaats van t',X2,745,{align:'center',color:C.goud,alpha:a}); }
    return; }
  if(li===6){ const p=ease(lf*1.5); mrna(ctx,300,420,'AUGGCUUCAGGA',{dx:96,dir:1,s:0.8,alpha:p}); term(ctx,'messenger-RNA',960,720,{alpha:p}); M(ctx,'kort: mrna · boodschapper',960,780,{align:'center',alpha:p}); return; }
  // li 7: overview of protein synthesis in two steps
  const p=ease(lf*2); T(ctx,'eiwitsynthese',W/2,170,56,{w:700,align:'center'});
  panel(ctx,160,280,560,300,1); T(ctx,'gen',440,400,48,{w:700,align:'center',color:C.paars}); M(ctx,'dna · in de kern',440,460,{align:'center'});
  panel(ctx,1200,280,560,300,p); T(ctx,'eiwit',1480,400,48,{w:700,align:'center',color:C.oker,alpha:p}); M(ctx,'keten van aminozuren',1480,460,{align:'center',alpha:p});
  arrow(ctx,740,430,1180,430,C.line,2,1); T(ctx,'mRNA',960,400,44,{w:700,align:'center',color:C.teal});
  M(ctx,'stap 1',850,520,{align:'center',color:C.goud,alpha:p}); M(ctx,'stap 2',1070,520,{align:'center',color:C.goud,alpha:p});
};

// ---- H2 transcription ----
// DNA: coding strand on top, template strand at the bottom; inside the bubble the coding strand lifts and mRNA pairs with the template
function txScene(ctx,prog,t,o={}){ const seq='GCATACTTAGGCTAAT', x0=150, dx=110, n=seq.length, s=0.85, Yb=640, Yt=376;
  const c0=o.c0||4; const b0=4, b1=Math.min(n,4+Math.round(prog*8)); // bubble from c0 to b1; mRNA built from b0 up to b1-1; DNA closes again before c0
  const lift=i=> (i>=c0&&i<b1)? 170 : (i===c0-1||i===b1)? 60 : 0;
  ctx.save(); ctx.globalAlpha*=0.55; ctx.beginPath(); ctx.moveTo(x0-dx/2,Yt-lift(0)); for(let i=0;i<n;i++) ctx.lineTo(x0+i*dx,Yt-lift(i)); ctx.lineTo(x0+(n-0.5)*dx,Yt); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle=BBR; ctx.lineWidth=40; ctx.stroke(); ctx.strokeStyle=BB; ctx.lineWidth=37; ctx.stroke();
  for(let i=0;i<n;i++) base(ctx,x0+i*dx,Yt-lift(i)+20,COMP[seq[i]],1,{s}); ctx.restore();
  backbone(ctx,x0-dx/2,Yb,n*dx,{dx}); for(let i=0;i<n;i++){ base(ctx,x0+i*dx,Yb-20,seq[i],-1,{s}); if(lift(i)===0) hbonds(ctx,x0+i*dx,Yb-20-111,Yt+20+111,(seq[i]==='A'||seq[i]==='T')?2:3); }
  const m0=Math.max(b0,c0), m=[]; for(let i=m0;i<b1;i++) m.push(RCOMP[seq[i]]);
  if(m.length){ mrna(ctx,x0+m0*dx,Yt,m.join(''),{dx,s,dir:1,marks:o.markU?m.map(c=>c==='U'?C.goud:null):null}); for(let i=m0;i<b1;i++) hbonds(ctx,x0+i*dx,Yt+16+111,Yb-20-111,(seq[i]==='A'||seq[i]==='T')?2:3); }
  const rel=[]; for(let i=b0;i<Math.min(c0,b1);i++) rel.push(RCOMP[seq[i]]); const YR=Yt-215;
  if(rel.length){ mrna(ctx,x0+b0*dx,YR,rel.join(''),{dx,s,dir:1}); ctx.save(); ctx.lineCap='round'; ln(ctx,x0+(b0+rel.length-0.5)*dx,YR,x0+(m0-0.5)*dx,Yt,RBBR,10); ctx.restore(); }
  if(b1>b0){ ctx.save(); ctx.lineCap='round'; const yy=rel.length?YR:Yt; ln(ctx,x0+(b0-0.5)*dx,yy,x0+(b0-1.4)*dx,yy-(rel.length?70:110),RBBR,10); ctx.restore(); }
  enzyme(ctx,x0+b1*dx+20,Yt+40,1.05,1); return {x0,dx,Yt,Yb,b0,b1};
}
function freeRna(ctx,x0,y0,T,alpha=1){ const R=seeded(91); for(let k=0;k<4;k++){ const bx=x0+k*100+R()*20, by=y0+R()*60; const ph=R()*6.28, sp=0.6+R()*0.6; const xx=bx+Math.sin(T*sp+ph)*22, yy=by+Math.cos(T*sp*0.8+ph)*16;
  ctx.save(); ctx.translate(xx,yy); ctx.rotate(Math.sin(T*0.5+ph)*0.4); base(ctx,0,-50,'AUCG'[k],1,{alpha:alpha*0.85,s:0.75,rna:true}); circ(ctx,0,-60,8,RBBR,null); ctx.restore(); } }
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  const prog=li<=3?0: li===4? ease(lf)*0.6 : li===5? 0.6+ease(lf)*0.3 : 1;
  const c0=li===6?4+Math.round(ease(lf)*5):4;
  const g=txScene(ctx,prog,t,{markU:li===5,c0});
  label(ctx,'RNA-polymerase','enzym',g.x0+g.b1*g.dx+60,g.Yt+60,g.x0+g.b1*g.dx+120,170,li===1?ease(lf*2):1,C.text,'left');
  if(li===2) M(ctx,'strengen uit elkaar',g.x0+4*g.dx,g.Yt-120,{align:'center',color:C.goud,alpha:ease(lf*2)});
  if(li>=4) label(ctx,'mRNA',li===6?'laat los':'u in plaats van t',g.x0+(g.b0+1)*g.dx,li===6&&c0>4?g.Yt-215:g.Yt,li===6?360:g.x0+(g.b0-1)*g.dx+40,li===6?210:150,li===4?ease(lf*2):1,C.text,'right');
  if(li>=3) label(ctx,'afgelezen streng','',g.x0+2*g.dx,g.Yb+24,g.x0+2*g.dx+40,820,li===3?ease(lf*2):1,C.text,'left');
  if(li===4){ freeRna(ctx,1520,190,t,ease(lf*2)); label(ctx,'vrije RNA-nucleotiden','',1640,170,1860,90,ease(lf*2),C.text,'right'); }
  if(li===5) M(ctx,'a in het dna → u in het mrna',1180,830,{color:C.goud});
  if(li===6) label(ctx,'DNA weer dicht','achter het enzym',g.x0+5*g.dx,g.Yb+24,g.x0+5*g.dx+60,820,ease(lf*2),C.goud,'left');
  scale(ctx,165,'1 nm · vereenvoudigd'); speed(ctx,'simulatie · vertraagd');
};
SCENES.h2b=(ctx,li,lf)=>{ bg(ctx,'micro'); const d='TAC', r='AUG', x0=700, dx=260;
  M(ctx,'dna',x0-200,730,{align:'right'}); M(ctx,'mrna',x0-200,260,{align:'right',color:C.teal});
  backbone(ctx,x0-dx/2,700,3*dx,{dx}); mrna(ctx,x0,240,'',{});
  const shown=li>0?3:Math.min(3,Math.floor(lf*4.2)+ (lf>0.2?1:0));
  for(let i=0;i<3;i++){ const x=x0+i*dx; base(ctx,x,680,d[i],-1,{s:1.4}); if(i<shown){ base(ctx,x,262,r[i],1,{s:1.4,rna:true,mark:li===1?C.goud:null}); hbonds(ctx,x,262+182+4,680-182-4,(d[i]==='A'||d[i]==='T')?2:3); } }
  if(shown>0) backbone(ctx,x0-dx/2,240,shown*dx,{rna:true,dx});
  if(li===1){ const p=ease(lf*2); T(ctx,'onthoud: AUG',1640,470,52,{w:700,align:'center',color:C.goud,alpha:p}); }
  if(li===2){ const p=ease(lf*2); panel(ctx,1420,330,440,240,p); T(ctx,'transcriptie',1640,430,48,{w:700,align:'center',alpha:p}); M(ctx,'dna → mrna',1640,490,{align:'center',alpha:p}); M(ctx,'in de kern',1640,530,{align:'center',alpha:p,color:C.text2}); }
  scale(ctx,180,'1 nm · vereenvoudigd');
};

// ---- H2 vwo: promotor, richting, pre-mRNA → splicing ----
SCENES.h2v=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li<=2){ const y=470; T(ctx,li===0?'Voor vwo: een stap verder':'Waar begint een gen?',120,110,48,{w:700,alpha:li===0?ease(lf*2):1});
    backbone(ctx,120,y-40,1680,{h:40}); backbone(ctx,120,y+40,1680,{h:40});
    if(li>=1){ const p=li===1?ease(lf*1.5):1; ctx.save(); ctx.globalAlpha*=p; box(ctx,260,y-70,420,140,16,null,C.line,2); box(ctx,760,y-70,980,140,16,null,C.paars,2); ctx.restore();
      label(ctx,'promotor','wordt niet overgeschreven',300,y-70,300,200,p,C.text,'left'); label(ctx,'gen','wordt overgeschreven',1250,y-70,1250,200,p,C.text,'left'); }
    if(li>=2){ const p=ease(li===2?lf*2:1); ctx.save(); ctx.globalAlpha*=p; box(ctx,420,y-60,140,120,12,rgba(C.goud,0.8)); ctx.restore(); T(ctx,'TATA',490,y+14,40,{w:700,align:'center',color:C.bgMicro,alpha:p});
      label(ctx,'TATA-box','hier bindt rna-polymerase',490,y+60,420,760,p,C.goud,'left'); enzyme(ctx,500,y-190,0.75,li===2?clamp(lf*2-0.6,0,1):1); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  if(li<=4){ const y=470, x1=200, x2=1700; T(ctx,'Leesrichting',120,170,48,{w:700});
    backbone(ctx,x1,y+120,x2-x1,{h:40}); T(ctx,"3'",x1-30,y+134,40,{w:700,align:'right'}); T(ctx,"5'",x2+30,y+134,40,{w:700}); M(ctx,'matrijsstreng',x1,y+210);
    const p=li===3?ease(lf):1, q4=li===4?ease(lf):0, fr=li===3?0.05+0.15*p:0.2+0.5*q4; enzyme(ctx,x1+(x2-x1)*fr+70,y-30,0.7,1); arrow(ctx,x1+40,y+60,x1+40+(x2-x1-80)*p,y+60,C.goud,3,1); M(ctx,"enzym leest 3' → 5'",x1,y+250,{color:C.goud});
    if(li===4){ backbone(ctx,x1,y-40,(x2-x1)*fr,{rna:true,h:36}); T(ctx,"5'",x1-30,y-26,40,{w:700,align:'right',color:C.teal}); T(ctx,"3'",x1+(x2-x1)*fr+12,y-80,40,{w:700,color:C.teal}); M(ctx,"mrna groeit 5' → 3'",x1,y-150,{color:C.teal}); M(ctx,'net als nieuw dna (aflevering 2)',x1,y+300,{color:C.text2}); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  if(li===9){ T(ctx,'mRNA klaar',120,170,48,{w:700}); const kx=600, ky=480; circ(ctx,kx,ky,300,rgba(C.kern,0.35),C.kernR,2); M(ctx,'kern',kx,ky+260,{align:'center'});
    const p=ease(lf); const P=wavePts(kx-120,ky,kx+500,ky-60,40,10,t*2); mrnaSquiggle(ctx,partPts(P,0.3+0.7*p),1,7); circ(ctx,kx+300,ky-30,16,C.bgMicro,C.kernR,1.5);
    label(ctx,'kernporie','',kx+300,ky-30,kx+380,ky-200,1,C.text,'left'); M(ctx,'→ cytoplasma',kx+520,ky+40,{color:C.goud}); speed(ctx,'schematisch · niet op schaal'); return; }
  const parts=[['E1',260,'exon'],['I1',180,'intron'],['E2',220,'exon'],['I2',240,'intron'],['E3',200,'exon']];
  const y=330; let x=200; const sp=li>=7?ease(li===7?lf:1):0; const lab=li>=6?(li===6?ease(lf*2):1):0;
  M(ctx,"5'",160,y+10,{align:'right',color:C.text2});
  parts.forEach(([id,w,k])=>{ const isI=k==='intron'; if(isI){ box(ctx,x,y-22,w,44,22,rgba('#8FA0B5',0.4),C.line,1.5); M(ctx,'intron',x+w/2,y+70,{align:'center',color:C.text2,alpha:lab}); }
    else { box(ctx,x,y-22,w,44,22,RBB,RBBR,1.5); T(ctx,id,x+w/2,y+12,32,{w:700,align:'center'}); M(ctx,'exon',x+w/2,y+70,{align:'center',alpha:lab}); } x+=w+8; });
  M(ctx,"3'",x+10,y+10,{color:C.text2}); T(ctx,'pre-mRNA',200,y-60,40,{w:700}); if(li===5) M(ctx,'nog niet af',520,y-68,{color:C.goud,alpha:ease(lf*2)});
  if(li===6) M(ctx,'bij eukaryoten: exons en introns',200,520,{color:C.goud,alpha:lab});
  if(li>=7){ const y2=560; let x2=200; parts.filter(p=>p[2]==='exon').forEach(([id,w])=>{ ctx.save(); ctx.globalAlpha*=sp; box(ctx,x2,y2-22,w,44,22,RBB,RBBR,1.5); T(ctx,id,x2+w/2,y2+12,32,{w:700,align:'center'}); ctx.restore(); x2+=w+4; });
    T(ctx,'mRNA',200,y2-60,40,{w:700,alpha:sp}); arrow(ctx,700,420,700,500,C.line,1.5,sp); label(ctx,'splicing','introns eruit',900,460,1300,470,sp,C.text,'left'); }
  if(li>=8){ const p=li===8?ease(lf):1; const y3=760; let x3=200; for(const [id,w] of [['E1',260],['E3',200]]){ ctx.save(); ctx.globalAlpha*=p; box(ctx,x3,y3-22,w,44,22,RBB,RBBR,1.5); T(ctx,id,x3+w/2,y3+12,32,{w:700,align:'center'}); ctx.restore(); x3+=w+4; }
    label(ctx,'alternatieve splicing','zelfde gen, ander eiwit',680,760,1000,740,p,C.text,'left'); }
  speed(ctx,'schematisch · niet op schaal');
};

// ---- H3 translation (key frame) ----
SCENES.h3a=(ctx,li,lf,t,inset)=>{ const label=inset===true?()=>{}:window.label, M=inset===true?()=>{}:window.M;
  if(li===0&&inset!==true){ bg(ctx,'micro'); const L=microCell(ctx,820,470,330,1,t,{showGolgi:true,showER:true}); const k=L.kern; dnaIcon(ctx,k.x,k.y+20,1,1);
    const P=wavePts(k.x+20,k.y-20,k.x+k.r+300,k.y+40,40,8,t*2); mrnaSquiggle(ctx,partPts(P,0.35+0.65*ease(lf)),1,6);
    label(ctx,'kernporie','opening in het kernmembraan',k.x+k.r,k.y-12,k.x+120,150,ease(lf*2),C.text,'left'); scale(ctx,150,'10 µm'); return; }
  if(inset!==true) bg(ctx,'micro'); const codons=['AUG','GCU','UCA','GGA','UAA']; const seq=codons.join(''); const x0=180, dx=96, Ym=700;
  // step = codon in the A site; tRNA arriving at step, chain on the tRNA at step-1
  let step=0, arr=0; if(li<=6){ step=0; arr=0; } else if(li===7){ step=0; arr=ease(lf); } else if(li===8){ step=1; arr=ease(lf); } else if(li===9){ const u=0.33+lf*2.67; step=1+Math.min(2,Math.floor(u)); arr=step===1?1:ease(Math.min(1,(u-Math.floor(u))*1.6)); } else { step=4; arr=0; }
  // ribosome position in codons: A site over codon 'pos'
  let pos; if(li<=1) pos=-2.5; else if(li===2) pos=-2.5+2.5*ease(lf); else if(li<=8) pos=0; else if(li===9) pos=step-1; else if(li===10) pos=2+ease(Math.min(1,lf*3)); else pos=3; // ribosome centred on codons pos and pos+1
  const rC=x0+(pos*3+1)*dx + dx*1.5;
  ribosomeBig(ctx,rC,Ym-170,560,li===1?0.55*ease(lf*2):0.55);
  mrna(ctx,x0,Ym,seq,{dx,dir:-1,s:0.8});
  M(ctx,"5'",x0-70,Ym+10,{align:'right',color:C.text2}); M(ctx,"3'",x0+14*dx+60,Ym+10,{color:C.text2});
  const nBr=li<3?0: li===3? Math.ceil(ease(lf)*5) : 5;
  for(let c=0;c<nBr;c++){ const cx=x0+c*3*dx; const hot=(li===6&&c===0)||(li>=7&&c===step)||(li===4&&c===4); ctx.save(); ctx.strokeStyle=hot?C.goud:rgba(C.line,0.7); ctx.lineWidth=hot?2.5:1.2; ctx.beginPath(); ctx.moveTo(cx-40,Ym+40); ctx.lineTo(cx-40,Ym+52); ctx.lineTo(cx+2*dx+40,Ym+52); ctx.lineTo(cx+2*dx+40,Ym+40); ctx.stroke(); ctx.restore();
    M(ctx,(li>=6&&c===0)?'start':(li>=4&&c===4)?'stop':'codon',cx+dx,Ym+90,{align:'center',color:hot?C.goud:C.text2}); }
  const names=['Met','Ala','Ser','Gly']; const TY=Ym-16-104-12-104-8;
  if(li===4) M(ctx,'1 codon → 1 aminozuur',x0+6*dx,Ym-560,{align:'center',color:C.goud,alpha:ease(lf*2)});
  if(li===5){ const p=ease(lf*2); panel(ctx,1340,90,480,330,p); M(ctx,'codontabel (deel)',1370,140,{alpha:p}); [['AUG','Met · start'],['GCU','Ala'],['UCA','Ser'],['GGA','Gly'],['UAA','stop']].forEach((r,i)=>{ T(ctx,r[0],1380,200+i*46,36,{w:700,color:C.teal,alpha:p}); T(ctx,r[1],1520,200+i*46,36,{alpha:p}); }); }
  if(li===6){ const p=ease(lf*2); T(ctx,'AUG = methionine (Met)',x0,170,48,{w:700,color:C.goud,alpha:p}); }
  // tRNAs and chain
  if(li>=8&&step>=1&&step<=4){ const pX=x0+((step-1)*3+1)*dx; const rel=li>=10?ease(li===10?lf:1):0; const tp=trna(ctx,pX,TY,ANTI(codons[step-1]),{dx,bs:0.8,aa:false,alpha:1-rel});
    const chainN=step; ctx.save(); ctx.translate(-rel*120,-rel*90); for(let k=chainN-1;k>=0;k--){ const bx=pX-(chainN-1-k)*76, by=tp.top-(chainN-1-k)*36; if(k<chainN-1) ln(ctx,bx,by,bx+76,by+36,C.oker,4); aa(ctx,bx,by,40,k,names[k]); } ctx.restore();
    if(li>=9) label(ctx,'keten van aminozuren',li>=10?'laat los':'groeit codon na codon',pX-76*(chainN-1)-rel*120,tp.top-36*(chainN-1)-40-rel*90,Math.max(440,pX-76*(chainN-1)-rel*120-40),110,li===9?ease(lf*3):1,C.text,'right'); }
  if(li>=7&&step<4){ const aX=x0+(step*3+1)*dx; trna(ctx,aX,TY-(1-arr)*220,ANTI(codons[step]),{dx,bs:0.8,aa:names[step],k:step,alpha:clamp(arr*1.5,0,1)});
    if(li<=8) label(ctx,'tRNA',li===8?'past op het codon':'brengt een aminozuur',aX+150,TY-60,aX+330,200,li>=7&&li<=8?ease(lf*2):1,C.text,'left'); }
  if(li===10) M(ctx,'stopcodon: geen trna · keten laat los',x0+12*dx+dx,Ym+150,{align:'center',color:C.goud,alpha:ease(lf*2)});
  if(li===11){ const p=ease(lf*2); panel(ctx,1300,110,540,220,p); T(ctx,'translatie',1570,200,48,{w:700,align:'center',alpha:p}); M(ctx,'mrna → aminozuren',1570,250,{align:'center',alpha:p}); M(ctx,'in het ribosoom',1570,290,{align:'center',alpha:p,color:C.text2}); }
  if(li>=1&&li<=7) label(ctx,'ribosoom','vergroot',Math.max(40,rC+250),Ym-300,Math.max(320,rC+420),li===5?470:420,li===1?ease(lf*2):1,C.text,'left');
  if(inset!==true) scale(ctx,165,'1 nm · vereenvoudigd');
};
SCENES.h3b=(ctx,li,lf)=>{ bg(ctx,'schema'); T(ctx,'17 aminozuren',120,160,52,{w:700}); const x0=120, y0=250, w=96, g=10;
  for(let k=0;k<18;k++){ const col=k%9, row=Math.floor(k/9); const x=x0+col*196, y=y0+row*200; const stop=k===17;
    for(let j=0;j<3;j++) box(ctx,x+j*58,y,52,64,8,stop?rgba(C.line,0.35):RC['AUGC'[(k+j)%4]],stop&&li===1?C.koraal:lighten(stop?C.line:RC['AUGC'[(k+j)%4]],0.3),stop&&li===1?3:1);
    if(!stop) aa(ctx,x+84,y+110,26,k,'',1); else M(ctx,'stop',x+84,y+130,{align:'center',color:li===1?C.koraal:C.text2}); }
  T(ctx,'3 × 17 = 51 nucleotiden',120,760,52,{w:700,color:C.goud});
  if(li===1) M(ctx,'het stopcodon telt niet mee: geen aminozuur',120,830,{color:C.koraal,alpha:ease(lf*2)});
};

// ---- H3 vwo: anticodon, 64 codons, wiebelbase ----
SCENES.h3v=(ctx,li,lf,t)=>{
  if(li===4){ bg(ctx,'schema'); const p=ease(lf*2); T(ctx,'64',560,480,200,{titel:true,align:'center',color:C.teal}); M(ctx,'codons',560,560,{align:'center'}); T(ctx,'20',1360,480,200,{titel:true,align:'center',color:C.oker,alpha:p}); M(ctx,'aminozuren',1360,560,{align:'center',alpha:p}); T(ctx,'≠',960,460,120,{align:'center',alpha:p}); return; }
  bg(ctx,'micro'); const x0=660, dx=150, Ym=650; T(ctx,'Codon en anticodon',120,96,48,{w:700,alpha:li===0?ease(lf*2):1});
  mrna(ctx,x0-3*dx,Ym,'GCAUGGCU',{dx,dir:-1,s:1.1,focus:li>=2?[2,5]:null});
  T(ctx,"5'",x0-3*dx-110,Ym+14,40,{w:700,align:'right'}); T(ctx,"3'",x0+5*dx-20,Ym+14,40,{w:700});
  if(li>=1){ const p=li===1?ease(lf):1; arrow(ctx,x0-3*dx,Ym+90,x0-3*dx+(8*dx-60)*p,Ym+90,C.goud,3,1); M(ctx,"ribosoom leest 5' → 3'",x0-3*dx,Ym+140,{color:C.goud}); }
  if(li>=2){ const p=li===2?ease(lf):1; const TY=Ym-16-143-12-143-8+40; trna(ctx,x0,TY-(1-p)*200,'UAC',{dx,bs:1.1,aa:'Met',k:0,alpha:clamp(p*1.5,0,1)});
    label(ctx,'anticodon','drie basen van het trna',x0+dx+40,TY+80,x0+3*dx+100,TY-40,p,C.text,'left'); label(ctx,'codon','',x0+dx+40,Ym-60,x0+3*dx+120,Ym-180,p,C.text,'left'); M(ctx,"anticodon 3' → 5'",x0-dx*1.6,TY+90,{align:'right',color:C.text2,alpha:p}); }
  if(li===3){ const p=ease(lf*2); T(ctx,'AUG ↔ UAC',1500,250,52,{w:700,color:C.goud,alpha:p,align:'center'}); }
  speed(ctx,'schematisch · niet op schaal');
};
SCENES.h3w=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li<=2){ const p0=li===0?ease(lf*2):1; T(ctx,'61 codons → 20 aminozuren',120,160,52,{w:700,alpha:p0}); M(ctx,'+ 3 stopcodons',120,215,{alpha:p0});
    if(li===0){ for(let k=0;k<64;k++){ const st=k===48||k===50||k===56; const x=1180+(k%8)*76, y=260+Math.floor(k/8)*66; ctx.save(); ctx.globalAlpha*=clamp(lf*4-k/40,0,1); box(ctx,x,y,62,52,8,st?rgba(C.koraal,0.6):rgba(C.teal,0.55),st?C.koraal:lighten(C.teal,0.2),1); ctx.restore(); } M(ctx,'64 codons · 3 stop',1180+300,840,{align:'center',alpha:p0}); }
    if(li>=1){ const p=li===1?ease(lf*2):1; ['GGU','GGC','GGA','GGG'].forEach((c,i)=>{ const y=330+i*125; for(let j=0;j<3;j++) tile(ctx,520+j*104,y,c[j],{alpha:p,w:88,h:100,px:56,mark:li===2&&j===2?C.goud:null}); arrow(ctx,860,y,1040,y,C.line,1.5,p); aa(ctx,1110,y,46,3,'Gly',p); });
      M(ctx,'vier codons · één aminozuur',1200,530,{alpha:p}); }
    if(li===2) M(ctx,'verschil: alleen de derde base',470,840,{color:C.goud,alpha:ease(lf*2)});
    return; }
  if(li===5){ const p=ease(lf*2); T(ctx,'terug naar de keten',120,160,52,{w:700,alpha:p}); for(let k=0;k<8;k++){ const x=300+k*150, y=470+Math.sin(k*0.9)*40; if(k){ ctx.save(); ctx.globalAlpha*=p; ln(ctx,x-150,470+Math.sin((k-1)*0.9)*40,x,y,C.oker,4); ctx.restore(); } aa(ctx,x,y,44,k,'',p); } return; }
  T(ctx,'De wiebelbase',120,160,52,{w:700}); M(ctx,"codon 5' → 3' · anticodon eronder",120,215);
  const cols=[['GGA','CCU'],['GGG','CCU']]; cols.forEach(([cod,anti],k)=>{ const x=380+k*700; const show=k===0||li>=4; const a=k===0?1:(li===4?ease(lf*2):1); if(!show) return;
    for(let j=0;j<3;j++){ tile(ctx,x+j*120,370,cod[j],{alpha:a,w:96,h:104,px:56,mark:j===2&&li>=3?C.goud:null}); tile(ctx,x+j*120,580,anti[j],{alpha:a,w:96,h:104,px:56}); if(j<2) ln(ctx,x+j*120,424,x+j*120,526,C.line,2); else ln(ctx,x+j*120,424,x+j*120,526,C.goud,3,[8,8]); }
    M(ctx,"codon 5'",x-70,380,{align:'right',alpha:a}); M(ctx,"anticodon 3'",x-70,590,{align:'right',alpha:a}); M(ctx,"3'",x+310,380,{alpha:a}); M(ctx,"5'",x+310,590,{alpha:a}); aa(ctx,x+120,740,46,3,'Gly',a); });
  if(li>=3) label(ctx,'wiebelbase',"derde base van het codon",668,400,760,800,li===3?ease(lf*2):1,C.goud,'left');
  if(li===4) M(ctx,'één trna · twee codons',1160,860,{align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- H4 van keten naar vorm ----
const FOLD=(()=>{ const P=[]; for(let k=0;k<12;k++){ const a=k*1.05, r=90+((k*37)%5)*34; P.push([960+Math.cos(a)*r*1.35,470+Math.sin(a)*r]); } return P; })();
function chainPos(k,f){ const sx=260+k*128, sy=470+Math.sin(k*0.8)*30; return [lerp(sx,FOLD[k][0],f),lerp(sy,FOLD[k][1],f)]; }
function chain(ctx,f,alpha=1,o={}){ const P=[]; for(let k=0;k<12;k++) P.push(chainPos(k,f)); ctx.save(); ctx.globalAlpha*=alpha;
  for(let k=1;k<12;k++) ln(ctx,P[k-1][0],P[k-1][1],P[k][0],P[k][1],C.oker,5); for(let k=0;k<12;k++) aa(ctx,P[k][0],P[k][1],36,k,'',1);
  if(o.mut!=null){ circ(ctx,P[o.mut][0],P[o.mut][1],36,C.koraal,lighten(C.koraal,0.3),2); } ctx.restore(); return P; }
SCENES.h4a=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  if(li<=1){ const f=li===0?0:ease(lf); chain(ctx,f,1); label(ctx,li===0?'keten van aminozuren':'opgevouwen eiwit',li===0?'nog geen werkend eiwit':'vaste vorm',li===0?260:FOLD[2][0],li===0?440:FOLD[2][1]-30,li===0?200:1300,200,1,C.text,'left');
    speed(ctx,'schematisch · niet op schaal'); return; }
  if(li===2){ const p=ease(lf*1.5); // enzyme with pocket + substrate; receptor with signal
    eiwit(ctx,640,480,200,1,5); ctx.save(); ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(640,300,70,0,Math.PI); ctx.fill(); ctx.restore();
    const sy=lerp(120,280,p); box(ctx,590,sy-40,100,70,14,C.line,lighten(C.line,0.3),1.5); label(ctx,'enzym','past op zijn substraat',540,560,300,780,1,C.text,'left'); label(ctx,'substraat','',690,sy,860,140,1,C.text,'left');
    const q=ease(lf*2-0.8); eiwit(ctx,1340,520,140,q,9); ctx.save(); ctx.globalAlpha*=q; ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.moveTo(1300,390); ctx.lineTo(1380,390); ctx.lineTo(1340,450); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha*=q; ctx.beginPath(); ctx.moveTo(1300,280+q*110); ctx.lineTo(1380,280+q*110); ctx.lineTo(1340,340+q*110); ctx.closePath(); ctx.fillStyle=C.teal; ctx.fill(); ctx.restore(); label(ctx,'receptor','past op zijn signaalstof',1400,600,1420,770,q,C.text,'left');
    speed(ctx,'schematisch · niet op schaal'); return; }
  if(li===3){ const p=ease(lf); ctx.save(); ctx.translate(-380,0); chain(ctx,1,1); ctx.restore(); M(ctx,'origineel',580,780,{align:'center'});
    ctx.save(); ctx.translate(420,0); const P=[]; for(let k=0;k<12;k++){ const b=chainPos(k,1); const d=k>=4&&k<=8?p*60:0; P.push([b[0]+d*Math.cos(k),b[1]+d*Math.sin(k*1.3)]); } for(let k=1;k<12;k++) ln(ctx,P[k-1][0],P[k-1][1],P[k][0],P[k][1],C.oker,5); for(let k=0;k<12;k++) aa(ctx,P[k][0],P[k][1],36,k,'',1); circ(ctx,P[6][0],P[6][1],36,C.koraal,lighten(C.koraal,0.3),2); ctx.restore();
    M(ctx,'één ander aminozuur',1380,780,{align:'center',color:C.koraal}); M(ctx,'→ aflevering 5',1380,830,{align:'center',color:C.text2,alpha:ease(lf*2-1)}); return; }
  // li 4: the chain of cause
  bg(ctx,'schema'); const items=[['volgorde nucleotiden',C.teal],['volgorde aminozuren',C.oker],['vorm van het eiwit',C.oker],['werking',C.goud]];
  items.forEach(([s,c],i)=>{ const a=ease(lf*4-i*0.8); const x=150+i*450; panel(ctx,x,380,380,140,a); T(ctx,s,x+190,462,36,{w:700,align:'center',color:c,alpha:a}); if(i) arrow(ctx,x-60,450,x-10,450,C.line,2,a); });
  T(ctx,'bepaalt',W/2,250,48,{titel:true,align:'center'});
};
SCENES.h4b=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const cx=960, cy=540; muscleCell(ctx,cx,cy,1500,480);
  const P=wavePts(500,560,980,600,40,10,t*1.5); mrnaSquiggle(ctx,P,li===3?1-ease(lf*1.2-0.2):1,7);
  label(ctx,'vaccin-mRNA','in het cytoplasma',620,560,420,830,li===0?ease(lf*2):1,C.text,'left');
  for(let k=0;k<4;k++){ const x=600+k*110, y=580+Math.sin(k*1.7)*14; ctx.save(); ctx.globalAlpha*=li===3?1-ease(lf):1; circ(ctx,x,y-26,20,rgba(C.ribo,0.9),lighten(C.ribo,0.3),1); ctx.restore(); }
  if(li===0) label(ctx,'ribosomen','',710,552,860,420,ease(lf*2),C.text,'left');
  label(ctx,'kern','',cx-0.33*1500,cy-210,cx-0.33*1500-60,cy-330,li===0?ease(lf*2):1,C.text,'right');
  if(li>=1){ const p=li===1?ease(lf):1; for(let k=0;k<7;k++){ const x=1000+k*70; spike(ctx,x,cy-240,1.3,clamp(p*3-k*0.3,0,1),0); }
    label(ctx,'eiwit van het virus','op het celmembraan',1420,cy-280,1520,150,li===1?ease(lf*2):1,C.text,'left'); }
  if(li>=2){ const p=li===2?ease(lf):1; ctx.save(); ctx.globalAlpha*=p; blob(ctx,1150,cy-380+p*20,100,60,0.12,4); shape(ctx,rgba(C.groen,0.85),lighten(C.groen,0.3),1.5); ctx.restore(); label(ctx,'afweercel','leert het eiwit herkennen',1060,cy-380,900,cy-420,p,C.text,'right'); }
  if(li===3){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; ctx.setLineDash([10,8]); ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(cx+0.05*1500,cy-210,60,36,0,0,6.283); ctx.stroke(); ctx.restore();
    M(ctx,'niet in de kern · wordt geen dna',cx+0.05*1500,cy-130,{align:'center',color:C.koraal,alpha:p}); M(ctx,'na een tijdje afgebroken',700,690,{color:C.text2,alpha:ease(lf*2-0.6)}); }
  speed(ctx,'schematisch · niet op schaal');
};

// ---- Recap ----
SCENES.recap=(ctx,li,lf,t)=>{
  if(li===0){ macroBg(ctx); person(ctx,420,880,600,1); const ax=488, ay=880-600*0.66; syringe(ctx,ax+190,ay-110,2.45,1); T(ctx,'Terug naar de prik',1000,300,64,{titel:true,alpha:ease(lf*2)}); return; }
  bg(ctx,'schema'); const a=k=>li>k?1: li===k? ease(lf*2):0;
  ctx.save(); ctx.globalAlpha*=a(2); box(ctx,100,240,760,420,24,rgba(C.kern,0.25),C.kernR,2); ctx.restore(); M(ctx,'kern',130,290,{alpha:a(2)});
  M(ctx,'cytoplasma',960,290,{alpha:a(3)});
  T(ctx,'DNA',230,470,52,{w:700,align:'center',color:C.paars,alpha:a(2)}); arrow(ctx,320,455,560,455,C.line,2,a(2)); M(ctx,'transcriptie',440,420,{align:'center',color:C.goud,alpha:a(2)});
  T(ctx,'mRNA',680,470,52,{w:700,align:'center',color:C.teal,alpha:Math.max(a(1),a(2))}); arrow(ctx,800,455,1040,455,C.line,2,a(3));
  ribosomeBig(ctx,1150,470,180,Math.max(a(1),a(3))); M(ctx,'ribosoom',1150,600,{align:'center',alpha:Math.max(a(1),a(3))}); arrow(ctx,1260,455,1460,455,C.line,2,a(3)); M(ctx,'translatie',1360,420,{align:'center',color:C.goud,alpha:a(3)});
  eiwit(ctx,1620,455,80,Math.max(a(1),a(3)),5); M(ctx,'eiwit',1620,600,{align:'center',alpha:Math.max(a(1),a(3))});
  if(li===1) M(ctx,'elk mrna · dezelfde manier',1150,700,{align:'center',color:C.goud,alpha:a(1)});
  if(li>=4){ const p=a(4); T(ctx,'één code voor bijna al het leven',W/2,760,44,{w:700,align:'center',alpha:p}); M(ctx,'bacterie · plant · mens',W/2,815,{align:'center',alpha:p}); }
  if(li===5) M(ctx,'→ aflevering 4: de codontabel',1800,180,{align:'right',color:C.goud,alpha:ease(lf*2)});
};
