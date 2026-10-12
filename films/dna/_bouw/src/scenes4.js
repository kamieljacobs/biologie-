// ===== DNA 4 · De genetische code lezen — scenes (Part C) =====
// signature: SCENES[name](ctx, li, lf, t, q)   li = line index, lf = 0..1 within the line
const SCENES={};
const ANTI=c=>c.split('').map(b=>({A:'U',U:'A',G:'C',C:'G'})[b]).join('');
// standard genetic code, three-letter names as in BiNaS
const CODE=(()=>{ const B='UCAG', aa='Phe Phe Leu Leu Ser Ser Ser Ser Tyr Tyr stop stop Cys Cys stop Trp Leu Leu Leu Leu Pro Pro Pro Pro His His Gln Gln Arg Arg Arg Arg Ile Ile Ile Met Thr Thr Thr Thr Asn Asn Lys Lys Ser Ser Arg Arg Val Val Val Val Ala Ala Ala Ala Asp Asp Glu Glu Gly Gly Gly Gly'.split(' ');
  const m={}; let k=0; for(const a of B) for(const b of B) for(const c of B){ m[a+b+c]=null; }
  // fill in order: first base, second base, third base — the string above is ordered first, then (second, third)
  k=0; for(const a of B) for(const b of B) for(const c of B){ m[a+b+c]=aa[B.indexOf(a)*16+B.indexOf(b)*4+B.indexOf(c)]; }
  return m; })();
const AANAAM={Met:'methionine',Phe:'fenylalanine',Val:'valine',Leu:'leucine',His:'histidine',Cys:'cysteïne',Ser:'serine',Ala:'alanine',Gly:'glycine'};
function macroBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,720); ctx.quadraticCurveTo(480,640,960,700); ctx.quadraticCurveTo(1440,760,1920,680); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,820,W,H-820); }
// insulin pen (Macro object, line-drawn like the syringe in film 3)
function insulinPen(ctx,x,y,rot,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot);
  box(ctx,0,-22,300,44,18,rgba(C.fill,0.95),'#AFC0D0',1.5); box(ctx,170,-14,90,28,6,rgba(C.teal,0.25),'#AFC0D0',1); box(ctx,-46,-16,46,32,8,'#AFC0D0'); ln(ctx,300,0,340,0,'#AFC0D0',3); M(ctx,'insuline',90,8,{color:C.text2,px:22}); ctx.restore(); }
// steel fermentation tank (Macro, schematic)
function tank(ctx,x,y,w,h,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; box(ctx,x,y,w,h,w/2.6,rgba('#3A4A66',0.9),'#AFC0D0',1.5); box(ctx,x+w*0.15,y+h*0.25,w*0.7,h*0.6,20,rgba(C.groen,0.14),null); ln(ctx,x+w/2,y-40,x+w/2,y,'#AFC0D0',6); ctx.restore(); }
// bacterium (Micro): rounded rod with a little DNA loop
function bacterium(ctx,x,y,s=1,rot=0,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot); box(ctx,-60*s,-26*s,120*s,52*s,26*s,rgba(C.groen,0.35),C.groen,1.5); ctx.beginPath(); ctx.ellipse(-8*s,0,26*s,12*s,0.3,0,6.283); ctx.strokeStyle=C.paars; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
// insulin: two short amino-acid chains linked (oker)
function insulin(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; for(let k=0;k<5;k++){ circ(ctx,x+k*14*s,y,7*s,AAT[k%5]); circ(ctx,x+k*14*s,y+18*s,7*s,AAT[(k+2)%5]); } ln(ctx,x+14*s,y,x+14*s,y+18*s,C.goud,2); ln(ctx,x+42*s,y,x+42*s,y+18*s,C.goud,2); ctx.restore(); }

// ---- big tRNA "two ends" diagram (key visual of chapter 1) ----
function bigTrna(ctx,x,y,anti,aaName,o={}){ // y = anticodon backbone; returns geometry
  const a=o.alpha==null?1:o.alpha; if(a<=0.01) return {}; const dx=130, bs=1.15; const g=trna(ctx,x,y,anti,{dx,bs,aa:false,alpha:a});
  if(aaName!==false) aa(ctx,x,g.top,60,o.k||0,aaName,a); return {top:g.top,dx}; }
// codon table (Schema card): rows = first base, columns = second base, lines = third base
function codonTable(ctx,x,y,o={}){ const B='UCAG', cw=o.cw||300, lh=o.lh||42, ph=lh*4+16, a=o.alpha==null?1:o.alpha; if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
  const hl=o.hl||{}; // codon -> colour
  M(ctx,'tweede base',x+60+cw*2,y-58,{align:'center',color:C.text2}); M(ctx,'eerste',x+24,y-58,{align:'center',color:C.text2}); M(ctx,'derde',x+60+cw*4+44,y-58,{align:'center',color:C.text2});
  for(let j=0;j<4;j++) T(ctx,B[j],x+60+cw*j+cw/2,y-14,40,{w:700,align:'center',color:RC[B[j]]});
  for(let i=0;i<4;i++){ const yy=y+i*ph; T(ctx,B[i],x+24,yy+ph/2+14,40,{w:700,align:'center',color:RC[B[i]]});
    for(let j=0;j<4;j++){ const xx=x+60+cw*j; box(ctx,xx+4,yy+4,cw-8,ph-8,10,rgba(C.fill,0.9),rgba(C.line,0.5),1);
      for(let k=0;k<4;k++){ const cod=B[i]+B[j]+B[k], aaN=CODE[cod], ly=yy+12+lh*k+lh*0.72; const h=hl[cod];
        if(h){ box(ctx,xx+10,yy+12+lh*k,cw-20,lh-4,8,rgba(h,0.25),h,2); }
        const dim=o.dimOthers&&!h&&!(o.keep&&o.keep.includes(aaN));
        T(ctx,cod,xx+22,ly,34,{w:700,color:dim?rgba(C.text2,0.5):C.text}); T(ctx,aaN,xx+cw-22,ly,34,{align:'right',color:aaN==='stop'?C.koraal:(dim?rgba(C.text2,0.5):C.text2)}); } }
    T(ctx,'',x,yy,10); }
  for(let i=0;i<4;i++) for(let k=0;k<4;k++) T(ctx,B[k],x+60+cw*4+44,y+i*ph+12+lh*k+lh*0.72,30,{align:'center',color:C.text2});
  ctx.restore(); }

SCENES.__title=(ctx,t)=>{ ctx.save(); ctx.translate(1330,140); ctx.scale(0.62,0.62); bigTrna(ctx,300,560,'CAC','Val',{k:1}); mrna(ctx,170,560+28+244*1.15,'GUG',{dx:130,dir:-1,s:1.15}); ctx.restore(); };

// ---- cold open: Macro person with insulin pen → zoomcirkel → tank with bacteria ----
SCENES.open=(ctx,li,lf,t)=>{ macroBg(ctx); const pa=li===0?ease(lf*2):1;
  personReal(ctx,420,880,600,1,{skin:SKINS[1],hair:'#3A2A20',shirt:'#5A7FA0',armR:{a1:0.35,a2:-2.0,hold:(c,hx,hy)=>insulinPen(c,hx-30,hy+10,-0.9,pa)}});
  if(li>=1){ const p=li===1?ease(lf*1.6):1; tank(ctx,900,330,200,420,p); M(ctx,'fabriekstank',1000,790,{align:'center',color:C.text2,alpha:p});
    zoomCircle(ctx,1420,420,290,1000,560,'bacteriën · vergroot',p,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1120,120,600,600); grain(ctx);
      const R=seeded(5); for(let k=0;k<9;k++){ const bx=1230+R()*380, by=240+R()*360; bacterium(ctx,bx+Math.sin(t*0.6+k)*8,by,1,R()*3,1); if(li>=3) insulin(ctx,bx+50,by+30,1,li===3?ease(lf*2):1); } }); }
  if(li>=2) label(ctx,'menselijk insulinegen','in de bacterie',1330,420,1120,110,li===2?ease(lf*2):1,C.text,'left');
  if(li>=3) label(ctx,'insuline','keten van aminozuren',1500,500,1230,800,li===3?ease(lf*2):1,C.text,'left');
  if(li>=4) T(ctx,'Hoe leest een bacterie',100,110,52,{titel:true,alpha:ease(lf*2)}), T(ctx,'het recept van een mens?',100,172,52,{titel:true,alpha:ease(lf*2)});
};

// ---- H1: the tRNA as a tool ----
SCENES.h1b=(ctx,li,lf,t)=>{ bg(ctx,'micro');
  const cx=760, Ya=500, MY=Ya+28+244*1.15; // anticodon backbone; mRNA backbone so the bases interlock
  if(li<=6){ const g=bigTrna(ctx,cx,Ya,'CAC','Val',{k:1});
    if(li===2){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; circ(ctx,cx,g.top,82,null,C.goud,2.5); roundRect(ctx,cx-220,Ya-10,440,190,20); ctx.stroke(); ctx.restore(); M(ctx,'kant 1',cx+250,Ya+90,{color:C.goud,alpha:p}); M(ctx,'kant 2',cx+110,g.top+10,{color:C.goud,alpha:p}); }
    if(li>=1) M(ctx,'trna · rna als werktuig',cx,g.top-110,{align:'center',color:C.teal,alpha:li===1?ease(lf*2):1});
    if(li>=3){ const p=li===3?ease(lf*1.6):1; const drop=(1-p)*160; // the mRNA rises until the bases click into each other
      mrna(ctx,cx-130*2,MY+drop,'GGUGC',{dx:130,dir:-1,s:1.15,alpha:clamp(p*2,0,1),focus:[1,4]});
      if(li===3&&lf>0.55){ const q=ease((lf-0.55)*4); ctx.save(); ctx.globalAlpha*=q; for(let i=-1;i<=1;i++) roundRect(ctx,cx+i*130-36,Ya+120,72,64,12), ctx.strokeStyle=C.goud, ctx.lineWidth=3, ctx.stroke(); ctx.restore(); }
      if(li<=4) label(ctx,'drie basen','passen op één codon',cx+200,Ya+90,1300,Ya+20,p,C.text,'left'); if(li<=4) label(ctx,'codon','op het mrna',cx+200,MY-60,1300,MY-30,p,C.text,'left'); }
    // li 5–6: the anticodon decides which amino acid hangs on top — a fixed pair
    if(li>=5){ const p=li===5?ease(lf*1.6):1; ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.goud; ctx.lineWidth=3;
      roundRect(ctx,cx-200,Ya+4,400,170,18); ctx.stroke(); circ(ctx,cx,g.top,70,null,C.goud,3);
      ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(cx-200,Ya+90); ctx.bezierCurveTo(cx-420,Ya+40,cx-380,g.top,cx-72,g.top); ctx.stroke(); ctx.setLineDash([]); arrow(ctx,cx-110,g.top,cx-74,g.top,C.goud,3,1); ctx.restore();
      T(ctx,'vaste combinatie',120,Ya-120,40,{w:700,color:C.goud,alpha:p}); T(ctx,'anticodon C A C',120,Ya-70,36,{alpha:p}); T(ctx,'→ altijd valine',120,Ya-25,36,{alpha:p}); }
    if(li===4) label(ctx,'één soort aminozuur','valine',cx+60,g.top,1300,g.top-20,ease(lf*2),C.text,'left');
    if(li===6){ const p=ease(lf*1.3); M(ctx,'anticodon  →  aminozuur',1500,150,{align:'center',color:C.text2,alpha:p});
      [['CAC','Val',1],['CCA','Gly',3],['AAA','Phe',0],['UAC','Met',2]].forEach(([an,n,k],i)=>{ const a=clamp(p*4-i,0,1), y=250+i*150;
        tileRow(ctx,1260,y,an,{dx:72,w:62,h:72,px:40,alpha:a,mark:i===0?(()=>C.goud):null}); arrow(ctx,1470,y,1570,y,i===0?C.goud:C.line,2.5,a); aaBead(ctx,1640,y,n,k,a); });
      M(ctx,'eigen anticodon → eigen aminozuur',1460,820,{align:'center',color:C.goud,alpha:p}); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  // li 7..10: one tRNA goes round the cycle.  7 = picks up valine, 8 = travels to the ribosome and clicks onto GUG,
  // 9 = valine is linked to the chain, then the EMPTY tRNA leaves, 10 = back to the start, reused.
  const RX=960, MYc=720; ribosomeBig(ctx,RX,640,460,0.32); mrna(ctx,750,MYc,'AUGGUGGCU',{dx:56,dir:-1,s:0.5,focus:[3,6]});
  const S1={x:330,y:470,k:0.55}, S2={x:750+4*56,y:MYc-16-122-6,k:0.5}, S3={x:1560,y:470,k:0.55};
  const L=(P,Q,u)=>({x:P.x+(Q.x-P.x)*u,y:P.y+(Q.y-P.y)*u,k:P.k+(Q.k-P.k)*u});
  const st=li===7?0: li===8?1: li===9?(lf<0.5?1:2): 3;
  const drawT=(pos,withAA,alpha=1)=>{ ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(pos.x,pos.y); ctx.scale(pos.k,pos.k); trna(ctx,0,0,'CAC',{dx:112,bs:1.0,aa:withAA?'Val':false,k:1}); ctx.restore(); };
  const topOf=pos=>({x:pos.x,y:pos.y-220*pos.k});
  // the growing chain (Met-Ala-Gly…) hangs in the ribosome, its end next to the A-site
  const chain=[[RX-60,S2.y-150],[RX-110,S2.y-185],[RX-160,S2.y-215],[RX-210,S2.y-240]];
  ctx.save(); for(let k=chain.length-1;k>=0;k--){ if(k) ln(ctx,chain[k][0],chain[k][1],chain[k-1][0],chain[k-1][1],C.oker,4); aa(ctx,chain[k][0],chain[k][1],20,(k+2)%5,'',1); } ctx.restore();
  // where is our tRNA, and does it still carry valine?
  let pos, carry=true, linkP=0, valAt=null;
  if(li===7){ pos=S1; const u=ease(clamp(lf*1.8,0,1)); const free={x:180,y:250}, tp=topOf(S1); valAt={x:free.x+(tp.x-free.x)*u,y:free.y+(tp.y-free.y)*u}; carry=false; }
  else if(li===8){ pos=L(S1,S2,ease(clamp(lf*1.4,0,1))); }
  else if(li===9){ if(lf<0.5){ pos=S2; linkP=ease(clamp(lf*2.4,0,1)); } else { pos=L(S2,S3,ease(clamp((lf-0.5)*2.2,0,1))); carry=false; linkP=1; } }
  else { pos=S3; carry=false; linkP=1; }
  // valine already in the chain once linked
  const vTop=topOf(S2);
  if(linkP>0){ const c0=chain[0]; ln(ctx,c0[0],c0[1],c0[0]+(vTop.x-c0[0])*linkP,c0[1]+(vTop.y-c0[1])*linkP,C.goud,4); if(!(li===9&&lf<0.5)) aa(ctx,vTop.x,vTop.y,18,1,'',1), T(ctx,'Val',vTop.x,vTop.y-28,24,{w:700,align:'center',color:C.goud}); }
  drawT(pos,carry&&!(li===9&&lf>=0.5));
  if(valAt){ aa(ctx,valAt.x,valAt.y,20,1,'',1); T(ctx,'Val',valAt.x,valAt.y-30,24,{w:700,align:'center',color:C.goud}); }
  // empty tRNA: show the empty hook explicitly
  if(!carry&&li>=9&&!(li===9&&lf<0.5)){ const tp=topOf(pos); ctx.save(); ctx.setLineDash([6,6]); circ(ctx,tp.x,tp.y,18,null,C.text2,2); ctx.restore(); M(ctx,'leeg',tp.x+34,tp.y+8,{color:C.goud}); }
  if(li===10){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=0.35+0.65*p; drawT(S1,false); ctx.restore(); const tp=topOf(S1); aa(ctx,tp.x-110+110*p,tp.y-70+70*p,20,1,'',p); }
  arrow(ctx,470,420,760,520,C.line,2,1); arrow(ctx,1040,520,1440,440,C.line,2,1);
  ctx.save(); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(1560,250); ctx.quadraticCurveTo(960,40,360,250); ctx.stroke(); ctx.restore(); arrow(ctx,400,235,360,250,C.goud,2.5,1);
  M(ctx,'1 · pakt een aminozuur',330,600,{align:'center',color:st===0?C.goud:C.text2}); M(ctx,'2 · past op het codon',960,850,{align:'center',color:st===1?C.goud:C.text2});
  M(ctx,'3 · laat leeg los',1560,600,{align:'center',color:st===2?C.goud:C.text2}); M(ctx,'en wordt opnieuw gebruikt',960,120,{align:'center',color:C.goud,alpha:li>=9?(li===9?ease(lf*2-0.8):1):0.35});
  label(ctx,'keten','',chain[2][0],chain[2][1],chain[2][0]-150,chain[2][1]-90,1,C.text,'right');
  if(li===10){ panel(ctx,1380,690,460,150,ease(lf*2)); T(ctx,'recept: mRNA',1420,750,40,{w:700,color:C.teal,alpha:ease(lf*2)}); T(ctx,'werktuig: tRNA',1420,805,40,{w:700,color:C.goud,alpha:ease(lf*2)}); }
};

// ---- H2: the codon table ----
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); if(li===0){ const sq='GCAUGUUUGUGAAC'; for(let i=0;i<sq.length;i++) tile(ctx,300+i*96,420,sq[i],{w:80,h:92,px:52,alpha:clamp(ease(lf*2)*14-i,0,1)}); T(ctx,'welke aminozuren?',W/2,620,52,{titel:true,align:'center',alpha:ease(lf*2-0.4)}); return; }
  const hl={}; if(li>=3) hl.GUG=C.goud;
  codonTable(ctx,120,150,{cw:300,lh:40,hl,dimOthers:li>=3,keep:['Val']});
  if(li===4) T(ctx,'per drie',1540,700,48,{w:700,color:C.goud,alpha:ease(lf*2)});
  if(li>=2) T(ctx,'1 → 2 → 3',1540,180,44,{w:700,color:C.goud,alpha:li===2?ease(lf*2):1});
  if(li>=3){ const p=li===3?ease(lf*2):1; T(ctx,'G U G',1540,330,56,{w:700,alpha:p}); M(ctx,'1e base g',1540,385,{alpha:p}); M(ctx,'2e base u',1540,425,{alpha:p}); M(ctx,'3e base g',1540,465,{alpha:p}); T(ctx,'= valine',1540,550,48,{w:700,color:C.goud,alpha:p}); }
};

// ---- H4: reasoning back (key visual): two columns of codons, the matching pair lights up ----
SCENES.h4b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2025, tijdvak 1',1800,80,{align:'right',color:C.text2});
  T(ctx,'leucine',420,180,48,{w:700,align:'center'}); T(ctx,'histidine',1240,180,48,{w:700,align:'center'});
  const leu=['UUA','UUG','CUU','CUC','CUA','CUG'], his=['CAU','CAC']; const pairs={CUU:'CAU',CUC:'CAC'};
  const showL=li>=2, act=li>=2?(li===2?ease(lf):1):0;
  his.forEach((c,i)=>{ for(let j=0;j<3;j++) tile(ctx,1140+j*100,300+i*120+120,c[j],{w:84,h:92,px:52,mark:li>=3&&j===1?C.goud:null}); });
  if(showL) leu.forEach((c,i)=>{ const ok=c in pairs; const a=clamp(act*6-i,0,1)*(li>=3&&!ok?0.35:1); for(let j=0;j<3;j++) tile(ctx,320+j*100,260+i*105,c[j],{w:84,h:92,px:52,alpha:a,mark:li>=3&&ok&&j===1?C.goud:null}); });
  if(li>=3){ const p=li===3?ease(lf*2):1; [[2,0],[3,1]].forEach(([i,k])=>arrow(ctx,600,260+i*105+0,1110,300+k*120+120,C.goud,2,p)); T(ctx,'tweede base: U werd A',760,820,44,{w:700,color:C.goud,alpha:p}); }
  if(li===4) T(ctx,'schrijf alle codons op · zoek het paar met één verschil',W/2,860,36,{align:'center',alpha:ease(lf*2)});
};

// ---- shared helpers for the reading chapters ----
function tileRow(ctx,x0,y,sq,o={}){ const dx=o.dx||96; for(let i=0;i<sq.length;i++){ const m=o.mark&&o.mark(i); tile(ctx,x0+i*dx,y,sq[i],{w:o.w||80,h:o.h||92,px:o.px||52,rna:o.rna!==false,alpha:(o.alpha==null?1:o.alpha)*(o.dim&&o.dim(i)?0.35:1),mark:m||null}); } }
function bracket(ctx,x1,x2,y,col,lab,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x1,y+14); ctx.lineTo(x2,y+14); ctx.lineTo(x2,y); ctx.stroke(); if(lab) M(ctx,lab,(x1+x2)/2,y+50,{align:'center',color:col}); ctx.restore(); }
function aaBead(ctx,x,y,name,k,alpha=1,col){ if(alpha<=0.01) return; aa(ctx,x,y,40,k,'',alpha); if(col){ ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,40,col,lighten(col,0.3),2); ctx.restore(); } T(ctx,name,x,y+13,34,{w:700,align:'center',color:C.bgMicro,alpha}); }

// ---- H1a: the gap between codon and amino acid ----
SCENES.h1a=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const x0=330, dx=96, Ym=640;
  ribosomeBig(ctx,x0+dx*2.5,Ym-170,520,0.4); mrna(ctx,x0,Ym,'AUGGUGGCUUCA',{dx,dir:-1,s:0.8});
  label(ctx,'mRNA','het recept',x0+9*dx,Ym+20,x0+10*dx,Ym+150,li===0?ease(lf*2):1,C.text,'left');
  if(li>=1){ const p=li===1?ease(lf*2):1; bracket(ctx,x0+3*dx-40,x0+5*dx+40,Ym+40,C.goud,'codon · 3 nucleotiden',p); }
  if(li>=2){ const p=li===2?ease(lf*1.5):1; aaBead(ctx,1500,330,'Val',1,p); label(ctx,'aminozuur','een heel ander molecuul',1540,330,1620,200,p,C.text,'left'); }
  if(li>=3){ const p=ease(li===3?lf*2:1); ctx.save(); ctx.globalAlpha*=p; ctx.setLineDash([10,10]); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0+4*dx,Ym-150); ctx.quadraticCurveTo(1100,240,1450,320); ctx.stroke(); ctx.restore(); T(ctx,'?',1050,300,96,{titel:true,align:'center',color:C.goud,alpha:p}); }
  scale(ctx,165,'1 nm · vereenvoudigd');
};

// ---- H1 vwo: anticodon, loading enzymes, ribosomal RNA ----
SCENES.h1v=(ctx,li,lf,t)=>{ bg(ctx,'micro'); const cx=700, Ya=500, MY=Ya+28+244*1.15;
  if(li<=1){ bigTrna(ctx,cx,Ya,'CAC','Val',{k:1}); mrna(ctx,cx-130*2,MY,'GGUGC',{dx:130,dir:-1,s:1.15,focus:[1,4]});
    if(li===0) T(ctx,'Voor vwo: een stap verder',1200,200,48,{w:700,alpha:ease(lf*2)});
    if(li===1){ const p=ease(lf*2); label(ctx,'anticodon',"3′ → 5′ · complementair",cx+200,Ya+90,1200,Ya+20,p,C.goud,'left'); label(ctx,'codon',"5′ → 3′",cx+200,MY-60,1200,MY-30,p,C.text,'left'); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  if(li<=4){ const g=bigTrna(ctx,cx,Ya,'CAC',li===4?'Ala':'Val',{k:li===4?0:1});
    if(li===2){ const p=ease(lf); enzyme(ctx,cx+250-p*80,g.top-40,0.9,1); label(ctx,'enzym','koppelt het juiste aminozuur',cx+330,g.top+80,1250,g.top+170,ease(lf*2),C.text,'left'); M(ctx,'één enzym per aminozuur',1250,820,{color:C.text2}); }
    if(li===3){ const p=ease(lf*2); T(ctx,'✓',cx+260,Ya+120,72,{w:700,color:C.groen,alpha:p}); M(ctx,'ribosoom controleert het anticodon',cx+340,Ya+110,{color:C.groen,alpha:p}); T(ctx,'?',cx+120,g.top+20,72,{w:700,color:C.text2,alpha:p}); M(ctx,'maar niet het aminozuur',cx+200,g.top+10,{color:C.text2,alpha:p}); }
    if(li===4){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; circ(ctx,cx,g.top,62,null,C.koraal,4); ctx.restore(); label(ctx,'verkeerd aminozuur','komt gewoon in het eiwit',cx+60,g.top,1200,g.top-30,p,C.koraal,'left'); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  // li 5–6: the ribosome is largely RNA too
  ribosomeBig(ctx,960,500,640,0.85); ctx.save(); ctx.globalAlpha*=ease(li===5?lf*2:1); ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.lineCap='round'; for(let k=0;k<6;k++){ ctx.beginPath(); for(let i=0;i<=30;i++){ const u=i/30; const x=760+u*400, y=360+k*40+Math.sin(u*9+k)*14; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); } ctx.restore();
  label(ctx,'ribosomaal RNA','ook een werktuig',1150,420,1450,250,li===5?ease(lf*2):1,C.teal,'left'); M(ctx,'ribosoom · vergroot',960,820,{align:'center',color:C.text2}); speed(ctx,'schematisch · niet op schaal');
};

// ---- H2b: reading from AUG, stop, counting ----
SCENES.h2b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const sq='GCAUGUUUGUGUAA', x0=260, dx=96, y=300;
  if(li<=2){ tileRow(ctx,x0,y,sq,{mark:i=>(li>=0&&i>=2&&i<=4)?C.goud:null, dim:i=>i<2});
    bracket(ctx,x0+2*dx-40,x0+4*dx+40,y+56,C.goud,'start',1); aaBead(ctx,x0+3*dx,y+200,'Met',2,ease(li===0?lf*2:1));
    if(li>=1){ const p=li===1?ease(lf*2):1; bracket(ctx,x0+5*dx-40,x0+7*dx+40,y+56,C.line,'',p); aaBead(ctx,x0+6*dx,y+200,'Phe',0,p); bracket(ctx,x0+8*dx-40,x0+10*dx+40,y+56,C.line,'',clamp(p*2-1,0,1)); aaBead(ctx,x0+9*dx,y+200,'Val',1,clamp(p*2-1,0,1)); ln(ctx,x0+3*dx+40,y+200,x0+6*dx-40,y+200,C.oker,4); }
    if(li>=2){ const p=li===2?ease(lf*2):1; bracket(ctx,x0+11*dx-40,x0+13*dx+40,y+56,C.koraal,'stop',p); M(ctx,'uaa · uag · uga: geen aminozuur',x0+12*dx,y+300,{align:'center',color:C.koraal,alpha:p}); }
    M(ctx,'niet hier beginnen',x0+0.5*dx,y-80,{align:'center',color:C.text2}); return; }
  T(ctx,'Rekenen',120,170,52,{w:700}); const p3=li===3?ease(lf*2):1;
  T(ctx,'100 aminozuren × 3 = 300 nucleotiden',120,330,52,{w:700,alpha:p3});
  for(let k=0;k<20;k++) box(ctx,120+k*84,390,72,40,8,RC['AUGC'[k%4]],null,0); 
  if(li===4){ const p=ease(lf*2); box(ctx,120+20*84,390,72,40,8,rgba(C.koraal,0.6),C.koraal,2); T(ctx,'+ 3 (stopcodon) = 303 nucleotiden in het mRNA',120,540,48,{w:700,color:C.goud,alpha:p}); M(ctx,'het stopcodon zit wel in het mrna',120,600,{alpha:p}); }
};

// ---- H3a/b: start from the DNA ----
SCENES.h3a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const d='CATGGA', x0=560, dx=110;
  M(ctx,'afgelezen dna-streng',x0-80,300,{align:'right'}); tileRow(ctx,x0,300,d,{dx,rna:false});
  if(li===0) T(ctx,'Op het examen krijg je vaak het DNA',W/2,620,48,{titel:true,align:'center',alpha:ease(lf*2)});
  if(li>=1){ M(ctx,'mrna',x0-80,480,{align:'right',color:C.teal}); const n=li===1?Math.floor(ease(lf)*7):6; const r=d.split('').map(b=>RCOMP[b]).join('');
    for(let i=0;i<Math.min(6,n);i++){ ln(ctx,x0+i*dx,350,x0+i*dx,430,C.line,2,[4,5]); tile(ctx,x0+i*dx,480,r[i],{w:90,h:92,px:52,mark:li===2&&d[i]==='A'?C.goud:null}); } }
  if(li===2) M(ctx,'tegenover a: u, geen t',x0+2.5*dx,640,{align:'center',color:C.goud,alpha:ease(lf*2)});
};
SCENES.h3b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const d='TACAAA', r='AUGUUU', x0=560, dx=110;
  M(ctx,'dna',x0-80,260,{align:'right'}); tileRow(ctx,x0,260,d,{dx,rna:false}); M(ctx,'mrna',x0-80,420,{align:'right',color:C.teal}); tileRow(ctx,x0,420,r,{dx});
  bracket(ctx,x0-45,x0+2*dx+45,476,C.goud,'',1); bracket(ctx,x0+3*dx-45,x0+5*dx+45,476,C.goud,'',1);
  if(li>=1){ const p=li===1?ease(lf*2):1; aaBead(ctx,x0+dx,600,'Met',2,p); aaBead(ctx,x0+4*dx,600,'Phe',0,p); ln(ctx,x0+dx+40,600,x0+4*dx-40,600,C.oker,4); }
  if(li===2){ const p=ease(lf*2); tile(ctx,1500,420,'T',{rna:false,w:90,h:92,px:52,alpha:p}); ctx.save(); ctx.globalAlpha*=p; ln(ctx,1450,370,1550,470,C.koraal,6); ln(ctx,1550,370,1450,470,C.koraal,6); ctx.restore(); M(ctx,'geen t in de codontabel',1500,540,{align:'center',color:C.koraal,alpha:p}); }
};
// ---- H3 vwo: coding strand and template strand ----
SCENES.h3v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const cod='ATGTTT', tem='TACAAA', x0=620, dx=110;
  if(li===0){ T(ctx,'Voor vwo: een stap verder',W/2,470,52,{titel:true,align:'center',alpha:ease(lf*2)}); return; }
  const rev=li>=6; const a6=li===6?ease(lf):(li>6?1:0);
  M(ctx,'coderende streng',x0-90,230,{align:'right',color:li===2||li===3?C.goud:C.text}); tileRow(ctx,x0,230,cod,{dx,rna:false,alpha:1-a6*0.7});
  M(ctx,'matrijsstreng',x0-90,370,{align:'right'}); tileRow(ctx,x0,370,rev?tem.split('').reverse().join(''):tem,{dx,rna:false}); for(let i=0;i<6;i++) ln(ctx,x0+i*dx,280,x0+i*dx,320,C.line,2,[4,5]);
  if(li>=2){ const p=li===2?ease(lf*2):1; M(ctx,'mrna',x0-90,560,{align:'right',color:C.teal,alpha:p}); tileRow(ctx,x0,560,rev?'UUUGUA':'AUGUUU',{dx,alpha:p,mark:i=>li===3&&!rev&&cod[i]==='T'?C.goud:null}); }
  if(li===2) M(ctx,'zelfde volgorde als de coderende streng',x0+2.5*dx,660,{align:'center',color:C.goud,alpha:ease(lf*2)});
  if(li===3) M(ctx,'t → u',x0+2.5*dx,660,{align:'center',color:C.goud,alpha:ease(lf*2)});
  const ends=(y,l,r)=>{ M(ctx,l,x0-55,y+50,{align:'right',color:C.text2}); M(ctx,r,x0+5*dx+55,y+50,{color:C.text2}); };
  if(li>=4){ if(!rev){ ends(230,"5′","3′"); ends(370,"3′","5′"); ends(560,"5′","3′"); } else { ends(370,"5′","3′"); ends(560,"3′","5′"); }
    const p=li===4?ease(lf):1; arrow(ctx,rev?x0+5*dx:x0,700,rev?x0+5*dx-(5*dx)*p:x0+(5*dx)*p,700,C.goud,3,1); M(ctx,rev?'mrna nu van rechts naar links lezen':"mrna lezen: 5′ → 3′",x0+2.5*dx,760,{align:'center',color:C.goud}); }
  if(li===5) M(ctx,"matrijsstreng 3′ → 5′ getekend: mrna van links naar rechts",x0+2.5*dx,830,{align:'center',color:C.text2,alpha:ease(lf*2)});
};

// ---- H4a: the exam case ----
SCENES.h4a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2025, tijdvak 1',1800,80,{align:'right',color:C.text2,alpha:li>=2?1:0});
  if(li<=1){ T(ctx,'aminozuur veranderd',560,420,48,{w:700,align:'center',alpha:ease(li===0?lf*2:1)}); arrow(ctx,860,400,1060,400,C.goud,3,li===1?ease(lf*2):0); T(ctx,'welke base?',1340,420,48,{w:700,align:'center',color:C.goud,alpha:li===1?ease(lf*2):0}); return; }
  // petri dish with fungus and a capsule
  circ(ctx,520,460,260,rgba(C.fill,0.9),'#AFC0D0',2); const R=seeded(9); ctx.save(); ctx.strokeStyle=rgba('#D9DDE3',0.8); ctx.lineWidth=2; for(let k=0;k<40;k++){ const a=R()*6.28, r=R()*150; ctx.beginPath(); ctx.moveTo(520+Math.cos(a)*r*0.3,460+Math.sin(a)*r*0.3); ctx.quadraticCurveTo(520+Math.cos(a+0.4)*r*0.8,460+Math.sin(a+0.4)*r*0.8,520+Math.cos(a)*r,460+Math.sin(a)*r); ctx.stroke(); } ctx.restore();
  box(ctx,840,430,140,60,30,rgba(C.teal,0.5),C.teal,2); M(ctx,'medicijn',910,540,{align:'center',color:C.text2}); M(ctx,'schimmel · groeit door',520,770,{align:'center',color:C.text2});
  if(li>=3){ const p=li===3?ease(lf):1; const names=['Gly','Phe','Leu','Thr','Ser'];
    for(let k=0;k<5;k++){ const x=1180+k*120; if(k) ln(ctx,x-120,460,x,460,C.oker,4); const ch=k===2; aaBead(ctx,x,460,ch&&p>0.5?'His':names[k],k,1,ch&&p>0.5?C.koraal:null); }
    M(ctx,'enzym van de schimmel',1420,560,{align:'center',color:C.text2}); M(ctx,'leucine → histidine',1420,380,{align:'center',color:C.koraal,alpha:p}); }
};
// ---- H4c: cysteine → serine, both possibilities; valine's free third base ----
SCENES.h4c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2024, tijdvak 2',1800,80,{align:'right',color:C.text2});
  if(li<=3){ T(ctx,'cysteïne',420,180,48,{w:700,align:'center'}); T(ctx,'serine',1240,180,48,{w:700,align:'center'});
    ['UGU','UGC'].forEach((c,i)=>{ for(let j=0;j<3;j++) tile(ctx,320+j*100,330+i*130,c[j],{w:84,h:92,px:52,mark:(li>=1&&li<=1&&j===1)||(li>=2&&i===0&&j===0)?C.goud:null}); });
    const ser=['UCU','UCC','UCA','UCG','AGU','AGC']; ser.forEach((c,i)=>{ const hot=(li<=1&&i<2)||(li>=2&&i===4); for(let j=0;j<3;j++) tile(ctx,1140+j*100,260+i*100,c[j],{w:84,h:88,px:50,alpha:hot?1:0.35,mark:hot&&((li<=1&&j===1)||(li>=2&&j===0))?C.goud:null}); });
    if(li<=1){ arrow(ctx,600,330,1110,260,C.goud,2,1); arrow(ctx,600,460,1110,360,C.goud,2,1); if(li===1) T(ctx,'G in het midden werd C',760,820,44,{w:700,color:C.goud,alpha:ease(lf*2)}); }
    if(li>=2){ arrow(ctx,600,330,1110,660,C.goud,2,1); T(ctx,'ook mogelijk: eerste U werd A',760,820,44,{w:700,color:C.goud,alpha:li===2?ease(lf*2):1}); M(ctx,'stond niet bij de antwoorden',760,862,{color:C.text2,alpha:li===2?ease(lf*2-0.8):1}); }
    if(li===3) T(ctx,'elke plek kan: zoek zelf het paar',120,740,40,{w:700,alpha:ease(lf*2)});
    return; }
  T(ctx,'valine',W/2,200,48,{w:700,align:'center'}); ['GUU','GUC','GUA','GUG'].forEach((c,i)=>{ for(let j=0;j<3;j++) tile(ctx,560+i*240+j*70,380,c[j],{w:60,h:76,px:42,mark:j===2?C.goud:null}); });
  T(ctx,'de derde base maakt niets uit',W/2,600,44,{w:700,align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- Recap ----
SCENES.recap=(ctx,li,lf,t)=>{
  if(li===0){ macroBg(ctx); tank(ctx,500,300,240,480,1); zoomCircle(ctx,1300,440,300,620,560,'bacterie · vergroot',ease(lf*2),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1000,140,600,600); grain(ctx); bacterium(ctx,1300,440,3.2,0,1); }); return; }
  bg(ctx,'micro');
  if(li<=2){ bacterium(ctx,560,460,5.2,0,1); const P=wavePts(520,470,820,560,30,8,t*2); mrnaSquiggle(ctx,partPts(P,li===1?0.2+0.8*ease(lf):1),1,7);
    label(ctx,'insulinegen','in de bacterie',470,450,250,200,1,C.text,'right'); if(li>=1) label(ctx,'mRNA','',800,560,900,760,li===1?ease(lf*2):1,C.text,'left');
    if(li===2){ const p=ease(lf*2); ribosomeBig(ctx,1350,560,300,p*0.7); ctx.save(); ctx.globalAlpha*=p; ctx.translate(1350,430); ctx.scale(0.42,0.42); trna(ctx,0,0,'CAC',{dx:130,bs:1.15,aa:'Val',k:1}); ctx.restore(); label(ctx,"tRNA's",'brengen aminozuren',1300,330,1240,200,p,C.text,'right'); }
    speed(ctx,'schematisch · niet op schaal'); return; }
  // li 3..5: same code in bacterium and human cell
  const cols=[[520,'bacterie'],[1400,'jouw cel']]; cols.forEach(([x,n],i)=>{ M(ctx,n,x,180,{align:'center',color:C.text2}); ctx.save(); ctx.translate(x,560); ctx.scale(0.6,0.6); trna(ctx,0,0,'CAC',{dx:130,bs:1.15,aa:'Val',k:1}); ctx.restore(); mrna(ctx,x-78,610,'GUG',{dx:78,dir:-1,s:0.7}); });
  T(ctx,'=',960,520,96,{titel:true,align:'center',color:C.goud,alpha:ease(li===3?lf*2:1)}); M(ctx,'bijna precies dezelfde code',960,600,{align:'center',color:C.goud,alpha:ease(li===3?lf*2:1)});
  if(li>=4){ const p=li===4?ease(lf*2):1; for(const [x] of cols){ for(let k=0;k<5;k++){ const bx=x-200+k*100; if(k) ln(ctx,bx-100,790,bx,790,C.oker,4); aa(ctx,bx,790,30,k,'',p); } } M(ctx,'zelfde volgorde van aminozuren',960,860,{align:'center',alpha:p}); }
  if(li===5){ const p=ease(lf*2); panel(ctx,700,260,520,170,p); T(ctx,'recept: mRNA',740,330,40,{w:700,color:C.teal,alpha:p}); T(ctx,'werktuig: tRNA',740,390,40,{w:700,color:C.goud,alpha:p}); }
};
SCENES.recapv=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,li===0?'Voor vwo: een stap verder':'Een gen zonder introns',120,170,48,{w:700});
  const row=(y,parts,lab)=>{ let x=300; M(ctx,lab,x-40,y+12,{align:'right'}); for(const [k,w] of parts){ box(ctx,x,y-24,w,48,24,k==='e'?RBB:rgba('#8FA0B5',0.4),k==='e'?RBBR:C.line,1.5); x+=w+8; } };
  row(400,[['e',220],['i',160],['e',200],['i',200],['e',180]],'mens'); M(ctx,'exons en introns',300,470,{color:C.text2});
  if(li>=1){ const p=li===1?ease(lf*2):1; ctx.save(); ctx.globalAlpha*=p; row(620,[['e',220],['e',200],['e',180]],'bacterie'); ctx.restore(); M(ctx,'alleen exons: de bacterie kan niet splicen',300,690,{color:C.goud,alpha:p}); }
};
SCENES.recap2=(ctx,li,lf,t)=>{ bg(ctx,'schema'); tileRow(ctx,620,420,'GUGCAU',{dx:110,mark:i=>i===4?C.koraal:null}); T(ctx,'één base anders?',W/2,620,52,{titel:true,align:'center',alpha:ease(lf*2)}); M(ctx,'→ aflevering 5: mutaties',W/2,700,{align:'center',color:C.goud,alpha:ease(lf*2-0.5)}); };
// small Micro helpers (same as film 3)
function mrnaSquiggle(ctx,pts,alpha=1,w=6){ if(alpha<=0.01||pts.length<2) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.strokeStyle=C.teal; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke(); ctx.restore(); }
function wavePts(x1,y1,x2,y2,n=40,amp=10,ph=0){ const P=[]; for(let i=0;i<=n;i++){ const u=i/n; const x=x1+(x2-x1)*u, y=y1+(y2-y1)*u; const nx=-(y2-y1), ny=(x2-x1), L=Math.hypot(nx,ny)||1; const o=amp*Math.sin(u*Math.PI*6+ph); P.push([x+nx/L*o,y+ny/L*o]); } return P; }
function partPts(P,u){ const k=Math.max(2,Math.round(P.length*clamp(u,0,1))); return P.slice(0,k); }
