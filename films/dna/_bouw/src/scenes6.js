// ===== DNA 6 · Genen aan en uit — scenes (Part C) =====
// signature: SCENES[name](ctx, li, lf, t, q)   li = line index, lf = 0..1 within the line
const SCENES={};
const PERSON_LOOK={skin:SKINS[1],hair:'#3B2E28',shirt:'#7FC48F',trousers:'#34425A',hairStyle:'bun'};
const TWIN_A={skin:SKINS[1],hair:'#3B2E28',shirt:'#7FC48F',trousers:'#34425A',hairStyle:'bun'};   // de zus die hardloopt
const TWIN_B={skin:SKINS[1],hair:'#3B2E28',shirt:'#8FA0B5',trousers:'#34425A',hairStyle:'bun'};   // de zus die rookt
const P=(li,L,lf)=> li>L?1: li<L?0: ease(lf*2);

// ---- small library for this film ----
// padlock (Schema): koraal = locked, groen = open; s = size
function lock(ctx,x,y,s=1,alpha=1,open=false,col=null){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const c=col||(open?C.groen:C.koraal);
  ctx.strokeStyle=c; ctx.lineWidth=5*s; ctx.lineCap='round'; ctx.beginPath(); if(open){ ctx.arc(x-6*s,y-16*s,13*s,Math.PI,0); ctx.lineTo(x+7*s,y-6*s); } else { ctx.arc(x,y-14*s,13*s,Math.PI,0); ctx.lineTo(x+13*s,y-4*s); ctx.moveTo(x-13*s,y-14*s); ctx.lineTo(x-13*s,y-4*s); } ctx.stroke();
  box(ctx,x-20*s,y-6*s,40*s,32*s,6*s,c); circ(ctx,x,y+9*s,4*s,C.kast); ctx.restore(); }
// methyl group: small goud dot with CH3 tag, hanging on the DNA
function methyl(ctx,x,y,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ln(ctx,x,y,x,y-30,C.koraal,3); circ(ctx,x,y-40,12,C.koraal); ctx.restore(); }
// transcription factor (Schema): gold rounded blob with a notch that fits the promotor
function tf(ctx,x,y,s=1,alpha=1,col=C.goud,lab='transcriptiefactor'){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.moveTo(x-60*s,y); ctx.quadraticCurveTo(x-60*s,y-70*s,x,y-70*s); ctx.quadraticCurveTo(x+60*s,y-70*s,x+60*s,y); ctx.lineTo(x+40*s,y); ctx.lineTo(x+30*s,y-16*s); ctx.lineTo(x-30*s,y-16*s); ctx.lineTo(x-40*s,y); ctx.closePath(); ctx.fillStyle=rgba(col,0.9); ctx.fill(); ctx.strokeStyle=lighten(col,0.3); ctx.lineWidth=1.5; ctx.stroke(); if(lab) M(ctx,lab,x,y-90*s,{align:'center',color:col}); ctx.restore(); }
// gene on DNA (Schema): promotor box + gen box; returns positions
function geneRow(ctx,x,y,w=700,alpha=1,name='gen',onState=null,plab='promotor'){ if(alpha<=0.01) return {}; ctx.save(); ctx.globalAlpha*=alpha; ln(ctx,x-80,y,x+w+80,y,C.line,6); const pw=170; box(ctx,x,y-26,pw,52,10,rgba(C.goud,0.3),C.goud,1.5); M(ctx,plab,x+pw/2,y+62,{align:'center',color:C.text2}); box(ctx,x+pw+16,y-26,w-pw-16,52,10,RBB,RBBR,1.5); M(ctx,name,x+pw+16+(w-pw-16)/2,y+62,{align:'center',color:C.text2});
  if(onState!==null) T(ctx,onState?'aan':'uit',x+w+120,y+14,40,{w:700,color:onState?C.groen:C.koraal}); ctx.restore(); return {px:x+pw/2,gx:x+pw+16,gw:w-pw-16}; }
// strip of small gene boxes (the "kookboek"): on = goud, off = dim
function geneStrip(ctx,x,y,on,alpha=1,w=34){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; on.forEach((o,k)=>box(ctx,x+k*(w+8),y,w,46,6,o?C.goud:rgba(C.line,0.3))); ctx.restore(); }
// cell types (Schema)
function skinCell(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; box(ctx,x-110*s,y-60*s,220*s,120*s,30*s,rgba(C.fill,0.9),C.er,1.5); circ(ctx,x,y,34*s,rgba(C.kern,0.8),C.kernR,1); ctx.restore(); }
function liverCell(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); for(let k=0;k<6;k++){ const a=k/6*6.283-0.5; const X=x+Math.cos(a)*100*s, Y=y+Math.sin(a)*90*s; k?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.closePath(); ctx.fillStyle=rgba(C.bruin,0.7); ctx.fill(); ctx.strokeStyle=lighten(C.bruin,0.35); ctx.lineWidth=1.5; ctx.stroke(); circ(ctx,x,y,34*s,rgba(C.kern,0.8),C.kernR,1); ctx.restore(); }
function nerveCell(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.er; ctx.lineWidth=3*s; ctx.lineCap='round'; for(let k=0;k<5;k++){ const a=-2.2+k*0.5; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(a)*120*s,y+Math.sin(a)*120*s); ctx.lineTo(x+Math.cos(a+0.25)*170*s,y+Math.sin(a+0.25)*170*s); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+60*s,y+120*s,x+260*s,y+130*s); ctx.lineWidth=5*s; ctx.stroke(); circ(ctx,x,y,52*s,rgba(C.fill,0.95),C.er,1.5); circ(ctx,x,y,24*s,rgba(C.kern,0.8),C.kernR,1); ctx.restore(); }
function redCell(ctx,x,y,r,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,C.koraal,lighten(C.koraal,0.3),1.5); circ(ctx,x,y,r*0.45,rgba(C.kast,0.25)); ctx.restore(); }
function stemCell(ctx,x,y,r,alpha=1){ cellS(ctx,x,y,r,alpha,false,C.fill); }
function cellS(ctx,x,y,r,alpha=1,mark=false,col=C.fill){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,rgba(col,0.9),C.er,1.5); circ(ctx,x,y,r*0.42,rgba(C.kern,0.8),C.kernR,1); if(mark) circ(ctx,x+r*0.12,y-r*0.1,Math.max(4,r*0.12),C.koraal); ctx.restore(); }
function egg(ctx,x,y,r,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,rgba(C.fill,0.9),C.goud,2); circ(ctx,x,y,r*0.4,rgba(C.kern,0.8),C.kernR,1); ctx.restore(); }
// lamprey (beekprik): larva = blind worm shape in mud; adult = eel with eye and fin
function lamprey(ctx,x,y,s=1,alpha=1,adult=false){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.moveTo(x-200*s,y); ctx.quadraticCurveTo(x-100*s,y-50*s,x,y-20*s); ctx.quadraticCurveTo(x+120*s,y+20*s,x+220*s,y-10*s); ctx.quadraticCurveTo(x+120*s,y+60*s,x,y+40*s); ctx.quadraticCurveTo(x-100*s,y+30*s,x-200*s,y); ctx.closePath(); ctx.fillStyle=adult?'#6E7F96':'#8A7A62'; ctx.fill(); ctx.strokeStyle=lighten(adult?'#6E7F96':'#8A7A62',0.3); ctx.lineWidth=1.5; ctx.stroke();
  if(adult){ circ(ctx,x-150*s,y-6*s,8*s,C.kast,C.text,1); ctx.beginPath(); ctx.moveTo(x+40*s,y-22*s); ctx.quadraticCurveTo(x+120*s,y-70*s,x+200*s,y-20*s); ctx.fillStyle=rgba('#6E7F96',0.8); ctx.fill(); } ctx.restore(); }
function mud(ctx,y=640){ ctx.fillStyle='#4A3B2A'; ctx.fillRect(0,y,W,CAPTION_Y-y); }
// rat (Schema, side view)
function rat(ctx,x,y,s=1,alpha=1,col='#9AA3B2'){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.ellipse(x,y,90*s,46*s,0,0,6.283); ctx.fillStyle=col; ctx.fill(); circ(ctx,x+90*s,y-10*s,32*s,col); circ(ctx,x+84*s,y-38*s,12*s,col); circ(ctx,x+104*s,y-16*s,3*s,C.kast); ctx.strokeStyle=col; ctx.lineWidth=5*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y+10*s); ctx.quadraticCurveTo(x-150*s,y+20*s,x-180*s,y-30*s); ctx.stroke(); ctx.restore(); }
// cat (Schema, sitting, front): patches drawn by caller
function cat(ctx,x,y,s=1,alpha=1,patches=[]){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.ellipse(x,y+40*s,110*s,130*s,0,0,6.283); ctx.fillStyle='#E8E2D6'; ctx.fill(); circ(ctx,x,y-110*s,70*s,'#E8E2D6'); ctx.fillStyle='#E8E2D6'; for(const d of [-1,1]){ ctx.beginPath(); ctx.moveTo(x+d*30*s,y-160*s); ctx.lineTo(x+d*60*s,y-215*s); ctx.lineTo(x+d*70*s,y-140*s); ctx.closePath(); ctx.fill(); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(x,y+40*s,110*s,130*s,0,0,6.283); ctx.arc(x,y-110*s,70*s,0,6.283); ctx.clip(); for(const [px,py,pr,pc] of patches) circ(ctx,x+px*s,y+py*s,pr*s,pc); ctx.restore();
  circ(ctx,x-24*s,y-118*s,5*s,C.kast); circ(ctx,x+24*s,y-118*s,5*s,C.kast); circ(ctx,x,y-96*s,5*s,'#D08A7A'); ctx.restore(); }
// X-shaped chromosome (Schema), paars
function chromo(ctx,x,y,h,alpha=1,col=C.paars,lab=''){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=col; ctx.lineWidth=h*0.16; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x-h*0.22,y-h/2); ctx.lineTo(x+h*0.22,y+h/2); ctx.moveTo(x+h*0.22,y-h/2); ctx.lineTo(x-h*0.22,y+h/2); ctx.stroke(); circ(ctx,x,y,h*0.1,lighten(col,0.4)); if(lab) M(ctx,lab,x,y+h/2+34,{align:'center',color:C.text2}); ctx.restore(); }
// hand with webbing between the fingers (Schema)
function hand(ctx,x,y,s=1,alpha=1,web=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const sk=SKINS[1]; if(web>0.01){ ctx.globalAlpha*=web; ctx.beginPath(); ctx.moveTo(x-90*s,y); for(let k=0;k<5;k++){ const fx=x-90*s+k*45*s; ctx.lineTo(fx,y-150*s); ctx.lineTo(fx+22*s,y-110*s); } ctx.lineTo(x+90*s,y); ctx.closePath(); ctx.fillStyle=rgba(sk,0.8); ctx.fill(); ctx.globalAlpha=alpha; }
  box(ctx,x-100*s,y-40*s,200*s,120*s,30*s,sk); for(let k=0;k<5;k++){ const fx=x-90*s+k*45*s; box(ctx,fx-14*s,y-170*s,28*s,160*s,14*s,sk); } ctx.restore(); }
function cig(ctx,x,y,s=1,alpha=1,t=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; box(ctx,x,y-5*s,70*s,10*s,4*s,'#EDE4D0'); box(ctx,x+70*s,y-5*s,14*s,10*s,3*s,C.koraal); for(let k=0;k<3;k++) circ(ctx,x+86*s+k*12*s+Math.sin(t*2+k)*4,y-14*s-k*16*s,5*s+k*2*s,rgba('#9AA3B2',0.5)); ctx.restore(); }
function heartMark(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=C.koraal; ctx.beginPath(); ctx.moveTo(x,y+18*s); ctx.bezierCurveTo(x-30*s,y-8*s,x-14*s,y-26*s,x,y-12*s); ctx.bezierCurveTo(x+14*s,y-26*s,x+30*s,y-8*s,x,y+18*s); ctx.fill(); ctx.restore(); }

// ---- title inset: promotor with transcription factor and a lock ----
SCENES.__title=(ctx,t)=>{ ctx.save(); ctx.translate(1120,160); ctx.scale(0.62,0.62); const g=geneRow(ctx,100,300,760,1,'gen',true); tf(ctx,g.px,274,1,1,C.goud,''); enzyme(ctx,g.gx+120,170,0.8,1); geneRow(ctx,100,560,760,1,'gen',false); lock(ctx,100+85,560,1.4,1); ctx.restore(); };

// ---- cold open: twins as children, then fifty years later ----
SCENES.open=(ctx,li,lf,t)=>{ macroBg(ctx);
  if(li===0){ const p=ease(lf*1.5); personReal(ctx,760,860,420,p,Object.assign({},TWIN_A,{shirt:'#C8663F',armR:{a1:0.4,a2:-0.3}})); personReal(ctx,1160,860,420,p,Object.assign({},TWIN_B,{shirt:'#C8663F',armL:{a1:-0.4,a2:0.3}})); M(ctx,'eeneiige tweeling · kleuterschool',960,CAPTION_Y-40,{align:'center',color:C.text2,alpha:p}); return; }
  const hh=li>=2?540:620; personReal(ctx,620,870,hh,1,Object.assign({},TWIN_A,{armR:{a1:1.2,a2:-1.6},armL:{a1:-0.8,a2:1.2}})); personReal(ctx,1300,870,hh,1,Object.assign({},TWIN_B,{armR:{a1:0.3,a2:-2.2}}));
  const p1=P(li,1,lf); cig(ctx,1352,li>=2?570:540,1,p1,t); heartMark(ctx,1282,li>=2?590:560,1.2,p1); M(ctx,'loopt elke ochtend hard',620,CAPTION_Y-40,{align:'center',color:C.text2,alpha:p1}); M(ctx,'rookt · hart',1300,CAPTION_Y-40,{align:'center',color:C.text2,alpha:p1});
  if(li>=2){ const p=P(li,2,lf); panel(ctx,760,60,400,160,p); ladder(ctx,800,95,'GATTC',{dx:60,gap:90,s:0.42,bonds:true}); T(ctx,'zelfde DNA',960,205,36,{w:700,align:'center',color:C.goud,alpha:p}); }
  if(li>=3){ const p=ease(lf*2); T(ctx,'Hetzelfde kookboek, twee verschillende mensen?',960,290,44,{titel:true,align:'center',alpha:p}); }
};

// ---- H1a: three cell types from one egg ----
SCENES.h1a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const p0=ease(lf*1.5);
  const cells=[['huidcel',430,()=>skinCell(ctx,430,460,1.1,1)],['levercel',960,()=>liverCell(ctx,960,460,1.1,1)],['zenuwcel',1420,()=>nerveCell(ctx,1420,440,1,1)]];
  cells.forEach(([n,x,d],i)=>{ const p=li>0?1:clamp(p0*3-i,0,1); ctx.save(); ctx.globalAlpha*=p; d(); T(ctx,n,x,650,36,{w:700,align:'center'}); ctx.restore(); });
  if(li>=1){ const p=ease(lf*1.5); egg(ctx,960,160,46,p); M(ctx,'bevruchte eicel',960,80,{align:'center',color:C.text2,alpha:p}); cells.forEach(([n,x])=>arrow(ctx,960,215,x,330,C.line,2,p)); }
};

// ---- H1b: same DNA, different genes on; kookboek ----
SCENES.h1b=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li===0){ const p=ease(lf*1.5); [['huidcel',500,()=>skinCell(ctx,500,300,1,1)],['levercel',1420,()=>liverCell(ctx,1420,300,1,1)]].forEach(([n,x,d])=>{ d(); M(ctx,n,x,420,{align:'center',color:C.text2}); geneStrip(ctx,x-240,480,[1,1,1,1,1,1,1,1,1,1,1,1],p,32); }); T(ctx,'≈ 20 000 genen · in elke cel met een kern hetzelfde',960,640,40,{w:700,align:'center',color:C.goud,alpha:p}); return; }
  if(li===1){ const p=ease(lf*1.2); const g=geneRow(ctx,240,300,620,1,'gen'); arrow(ctx,g.gx+g.gw/2,345,g.gx+g.gw/2,440,C.line,2,p); mrna(ctx,g.gx+40,500,'AUGGCU',{dx:70,s:0.7,alpha:clamp(p*2,0,1)}); M(ctx,'mRNA · transcriptie',g.gx+g.gw+80,510,{color:C.teal,alpha:clamp(p*2,0,1)}); arrow(ctx,g.gx+g.gw/2,560,g.gx+g.gw/2,650,C.line,2,clamp(p*2-0.6,0,1)); for(let k=0;k<5;k++){ if(k) ln(ctx,g.gx+40+(k-1)*60,720,g.gx+40+k*60,720,C.oker,4); aaBead(ctx,g.gx+40+k*60,720,'',k,clamp(p*2-0.8,0,1)); } M(ctx,'eiwit · translatie',g.gx+g.gw+80,730,{color:C.oker,alpha:clamp(p*2-0.8,0,1)});
    T(ctx,'genexpressie',1180,320,52,{w:700,color:C.goud}); T(ctx,'gen → mRNA → eiwit: het gen staat aan',1180,380,32,{color:C.text2}); T(ctx,'gebeurt het niet: het gen staat uit',1180,430,32,{color:C.text2,alpha:clamp(p*2-1,0,1)}); return; }
  const p=li===2?ease(lf*1.5):1; const cols=[['huidcel',500,[1,0],()=>skinCell(ctx,500,300,1,1)],['levercel',1420,[0,1],()=>liverCell(ctx,1420,300,1,1)]];
  cols.forEach(([n,x,on,d])=>{ d(); M(ctx,n,x,420,{align:'center',color:C.text2}); [['keratine',0],['albumine',1]].forEach(([g,k])=>{ const a=on[k]; ctx.save(); ctx.globalAlpha*=clamp(p*2-k,0,1); box(ctx,x-200,480+k*90,400,60,12,a?rgba(C.goud,0.35):rgba(C.line,0.15),a?C.goud:rgba(C.line,0.4),1.5); T(ctx,'gen '+g,x-180,520+k*90,32,{w:600}); T(ctx,a?'aan':'uit',x+170,520+k*90,32,{w:700,align:'right',color:a?C.groen:C.koraal}); ctx.restore(); }); });
  if(li===3){ const q=ease(lf*2); T(ctx,'hetzelfde kookboek, andere pagina’s open',960,760,44,{titel:true,align:'center',color:C.goud,alpha:q}); }
};

// ---- H1c: lamprey larva → adult; genotype same, expression changes ----
SCENES.h1c=(ctx,li,lf,t)=>{ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.water; ctx.fillRect(0,300,W,CAPTION_Y-300); mud(ctx,660);
  const adult=li>=1?1:ease((lf-0.5)*2); lamprey(ctx,520,700,1,1,false); M(ctx,'larve · zonder echte ogen · in de modder',520,CAPTION_Y-40,{align:'center',color:C.text2});
  lamprey(ctx,1400,480,1.1,adult,true); M(ctx,'volwassen · ogen, vinnen · geen darm meer',1400,CAPTION_Y-40,{align:'center',color:C.text2,alpha:adult}); arrow(ctx,780,640,1120,540,C.line,2,adult);
  if(li>=1){ const p=P(li,1,lf); panel(ctx,560,90,800,170,p); M(ctx,'genotype: hetzelfde',600,140,{color:C.text,alpha:p}); geneStrip(ctx,600,160,[1,0,1,1,0,0,1,0,1,1,0,1],p,26); M(ctx,'genexpressie: andere genen aan',1000,140,{color:C.goud,alpha:p}); geneStrip(ctx,1000,160,[0,1,1,0,1,1,0,1,0,1,1,0],p,26); M(ctx,'larve',600,240,{color:C.text2,alpha:p}); M(ctx,'volwassen',1000,240,{color:C.text2,alpha:p}); }
  if(li===2) T(ctx,'geen genen kwijt · een ander deel in gebruik',960,CAPTION_Y-110,44,{w:700,align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- H2a: promotor, transcription factor, polymerase; structuur- vs regulatorgenen ----
SCENES.h2a=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const y=460; const g=geneRow(ctx,360,y,900,1,'gen',li>=2?(li===2&&lf>0.5?false:true):null);
  if(li===0){ const p=ease(lf*1.5); enzyme(ctx,g.px,y-160,0.9,p); M(ctx,'rna-polymerase',g.px,y-230,{align:'center',color:C.text2,alpha:p}); naamBij(ctx,'promotor','stuk DNA vóór het gen',g.px,y+112,p,'center',C.goud); return; }
  if(li===1){ const p=ease(lf*1.5); tf(ctx,g.px,y-26,1,1,C.goud,''); label(ctx,'eiwit','transcriptiefactor',g.px+50,y-70,g.px+300,230,p,C.goud,'left'); naamBij(ctx,'DNA','promotor',g.px,y+112,p,'center',C.text); return; }
  if(li===2){ const on=lf<0.5; const p=ease(lf*3); tf(ctx,g.px,y-26,1,on?1:0.15,C.goud,''); enzyme(ctx,g.gx+300,y-170,0.9,on?p:0.15); mrna(ctx,g.gx+240,y-260,'AUGGC',{dx:60,s:0.6,alpha:on?p:0}); M(ctx,on?'transcriptiefactor aanwezig → polymerase bindt':'geen transcriptiefactor → polymerase bindt niet',960,700,{align:'center',color:on?C.groen:C.koraal}); return; }
  const p=ease(lf*1.5); tf(ctx,g.px,y-26,1,1); ctx.save(); ctx.globalAlpha*=p; box(ctx,240,620,700,150,20,rgba(C.fill,0.9),RBBR,1.5); T(ctx,'structuurgenen',270,670,36,{w:700}); T(ctx,'keratine, albumine: eiwitten die het werk doen',270,725,28,{color:C.text2}); box(ctx,980,620,700,150,20,rgba(C.fill,0.9),C.goud,1.5); T(ctx,'regulatorgenen',1010,670,36,{w:700,color:C.goud}); T(ctx,'de schakelaars, zoals transcriptiefactoren',1010,725,28,{color:C.text2}); ctx.restore();
};

// ---- H2b: hormone → receptor → nucleus → gene on → protein ----
SCENES.h2b=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const cx=720, cy=500; circ(ctx,cx,cy,360,rgba(C.fill,0.5),C.er,2); circ(ctx,cx+90,cy+10,250,rgba(C.kern,0.5),C.kernR,1.5); M(ctx,'borstcel',cx-260,cy-300,{color:C.text2}); M(ctx,'kern',cx+90,cy-270,{align:'center',color:C.text2});
  const p=ease(lf*1.5); const st=li===0?clamp(p*1.4,0,1):1; const hx=cx-520+st*220, hy=cy-70; M(ctx,'oestradiol',cx-560,hy+50,{color:C.goud}); tf(ctx,cx-300,cy-40,0.8,1,C.teal,'receptor');
  const mv=li===0?clamp((lf-0.6)*2.5,0,1):1; if(mv>0){ const kx=cx-300+mv*340, ky=cy-40+mv*20; tf(ctx,kx,ky,0.8,1,C.teal,''); circ(ctx,kx,ky-30,14,C.goud); } else circ(ctx,hx,hy,14,C.goud);
  const ga=li===0?clamp((lf-0.8)*5,0,1):1; const g=geneRow(ctx,cx-100,cy+60,400,ga,'gen',null,'regelgebied');
  if(li>=1){ const a=P(li,1,lf); enzyme(ctx,cx+230,cy-60,0.5,a); mrna(ctx,cx+120,cy-150,'AUGG',{dx:50,s:0.5,alpha:a}); arrow(ctx,cx+330,cy-150,cx+560,cy-150,C.teal,2,a); ribosomeBig(ctx,cx+700,cy-120,160,a); for(let k=0;k<4;k++){ if(k) ln(ctx,cx+640+(k-1)*40,cy+30,cx+640+k*40,cy+30,C.oker,3); aaBead(ctx,cx+640+k*40,cy+30,'',k,a); } M(ctx,'eiwit',cx+700,cy+125,{align:'center',color:C.oker,alpha:a}); }
  if(li>=2){ const a=P(li,2,lf); panel(ctx,1240,620,620,200,a); ['hormoon → receptor','→ kern → regelgebied','→ gen aan → eiwit'].forEach((s,i)=>T(ctx,s,1280,680+i*50,32,{w:600,alpha:a})); }
  if(li===3) T(ctx,'niet het DNA veranderen · genen aan en uit zetten',960,CAPTION_Y-60,40,{w:700,align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- H2v: activator / repressor / enhancer ----
SCENES.h2v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});
  if(li<=1){ const p=P(li,1,lf); const g1=geneRow(ctx,200,400,560,1,'gen',li>=1?true:null); tf(ctx,g1.px,374,1,p,C.groen,'activator'); enzyme(ctx,g1.gx+100,250,0.8,p);
    const g2=geneRow(ctx,1120,400,560,1,'gen',li>=1?false:null); tf(ctx,g2.px,374,1,p,C.koraal,'repressor'); enzyme(ctx,g2.gx+100,180,0.8,p*0.3); M(ctx,'zit in de weg',g2.px,640,{align:'center',color:C.koraal,alpha:p}); return; }
  if(li===2){ const p=ease(lf*1.5); const g=geneRow(ctx,700,560,900,1,'gen',true); box(ctx,200,534,200,52,10,rgba(C.groen,0.3),C.groen,1.5); M(ctx,'enhancer',300,620,{align:'center',color:C.groen}); ln(ctx,400,560,620,560,C.line,6); tf(ctx,300,534,0.9,p,C.groen,'oestradiol + receptor'); ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.groen; ctx.lineWidth=2; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.moveTo(300,470); ctx.quadraticCurveTo(600,250,g.px,430); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); M(ctx,'soms ver van het gen · versterkt de transcriptie',960,720,{align:'center',color:C.text2,alpha:p}); enzyme(ctx,g.gx+100,400,0.8,p); return; }
  const p=ease(lf*1.5); egg(ctx,960,460,70,p); M(ctx,'waar komen al die cellen vandaan?',960,620,{align:'center',color:C.goud,alpha:p});
};

// ---- Aanvulling 16 okt 2026: lac-operon (h2op, basis) en RNA-interferentie (h2ri, vwo) ----
// eiwit als keten (kralenketting), fold 0 = gestrekt, 1 = kluwen
function protChain(ctx,x,y,s=1,col=C.koraal,alpha=1,fold=1,seed=3,n=13){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const r=seeded(seed); const pts=[];
  for(let k=0;k<n;k++){ const a=k*2.3+r()*0.7, rad=(14+(k%4)*9)*s; const fx=x+Math.cos(a)*rad, fy=y+Math.sin(a)*rad*0.85; const sx=x+(k-(n-1)/2)*17*s; pts.push([lerp(sx,fx,fold),lerp(y,fy,fold)]); }
  ctx.strokeStyle=lighten(col,0.25); ctx.lineWidth=3*s; ctx.lineJoin='round'; ctx.beginPath(); pts.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
  pts.forEach(p=>circ(ctx,p[0],p[1],8*s,col,lighten(col,0.35),1)); ctx.restore(); }
// mRNA: dunne, sliertige enkele streng
function slier(ctx,x0,y0,len,alpha=1,o={}){ if(alpha<=0.01||len<=2) return; const dir=o.dir||1, amp=o.amp==null?1:o.amp, ph=o.ph||0; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=o.col||C.teal; ctx.lineWidth=o.lw||3; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath();
  for(let u=0;u<=len;u+=5){ const X=x0+dir*u, Y=y0+amp*(Math.sin(u/34+ph)*9+Math.sin(u/91+ph)*6); u?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.stroke(); ctx.restore(); }
// kort dubbelstrengs RNA-stukje (twee teal strengen met baseparen)
function dsRNA(ctx,x,y,len,alpha=1,col=C.teal){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; for(let u=6;u<len;u+=12) ln(ctx,x+u,y-7,x+u,y+7,rgba(col,0.6),2); ln(ctx,x,y-8,x+len,y-8,col,3); ln(ctx,x,y+8,x+len,y+8,lighten(col,0.3),3); ctx.restore(); }
function hexRing(ctx,x,y,r,col){ ctx.beginPath(); for(let k=0;k<6;k++){ const a=k/6*6.283+0.52; const X=x+Math.cos(a)*r, Y=y+Math.sin(a)*r; k?ctx.lineTo(X,Y):ctx.moveTo(X,Y);} ctx.closePath(); ctx.fillStyle=rgba(col,0.22); ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=3; ctx.stroke(); }
// lactose: twee suikerringen aan elkaar (glucose + galactose)
function lactose(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const col='#EDE4D0'; hexRing(ctx,x-23*s,y,17*s,col); hexRing(ctx,x+23*s,y+6*s,17*s,col); ln(ctx,x-7*s,y+4*s,x+7*s,y+4*s,col,3); ctx.restore(); }
function bacterie(ctx,x,y,s=1,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.groen; ctx.lineWidth=2; for(let k=0;k<3;k++){ ctx.beginPath(); for(let u=0;u<=70;u+=4){ const X=x+90*s+u*s, Y=y+(k-1)*18*s+Math.sin(u/9)*5*s; u?ctx.lineTo(X,Y):ctx.moveTo(X,Y);} ctx.stroke(); }
  box(ctx,x-90*s,y-34*s,180*s,68*s,34*s,rgba(C.groen,0.22),C.groen,2.5); ctx.strokeStyle=C.paars; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(x,y,46*s,16*s,0.2,0,6.283); ctx.stroke(); ctx.restore(); }
// het lac-operon op een DNA-streep; geeft posities terug
const OP={y:470, reg:[140,360], pro:[440,620], opr:[628,760], genes:[[776,1086],[1102,1412],[1428,1738]]};
function operonRow(ctx,show){ const y=OP.y; ln(ctx,90,y,1830,y,C.line,6);
  const bx=(r,fill,stroke,a)=>{ if(a>0.01){ ctx.save(); ctx.globalAlpha*=a; box(ctx,r[0],y-26,r[1]-r[0],52,10,fill,stroke,1.5); ctx.restore(); } };
  bx(OP.reg,rgba(C.paars,0.35),C.paars,show.reg); M(ctx,'regulatorgen',(OP.reg[0]+OP.reg[1])/2,y+62,{align:'center',color:C.paars,alpha:show.reg});
  bx(OP.pro,rgba(C.goud,0.3),C.goud,show.pro); M(ctx,'promotor',(OP.pro[0]+OP.pro[1])/2,y+62,{align:'center',color:C.goud,alpha:show.pro});
  bx(OP.opr,rgba(C.koraal,0.3),C.koraal,show.opr); M(ctx,'operator',(OP.opr[0]+OP.opr[1])/2,y+104,{align:'center',color:C.koraal,alpha:show.opr});
  OP.genes.forEach((g,k)=>{ bx(g,RBB,RBBR,show.genes); T(ctx,'gen '+(k+1),(g[0]+g[1])/2,y+12,30,{align:'center',w:600,alpha:show.genes}); });
  M(ctx,'drie structuurgenen',(OP.genes[0][0]+OP.genes[2][1])/2,y+62,{align:'center',color:C.text2,alpha:show.genes});
  if(show.br>0.01){ bracket(ctx,OP.pro[0],OP.genes[2][1],y+128,C.groen,'',show.br); T(ctx,'operon · het lac-operon',(OP.pro[0]+OP.genes[2][1])/2,y+196,36,{w:700,align:'center',color:C.groen,alpha:show.br}); } }
SCENES.h2op=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const y=OP.y, pX=(OP.pro[0]+OP.pro[1])/2, oX=(OP.opr[0]+OP.opr[1])/2;
  if(li===0){ const p=ease(lf*1.5); const g=geneRow(ctx,560,y,800,1,'gen',false); enzyme(ctx,g.px-170,y-250,0.6,0.35); M(ctx,'rna-polymerase',g.px-250,y-270,{align:'right',color:C.text2,alpha:0.6}); protChain(ctx,g.px,y-70,1,C.koraal,p,1); T(ctx,'repressor',g.px+70,y-80,40,{w:700,color:C.koraal,alpha:p}); M(ctx,'een eiwit dat in de weg zit',g.px+70,y-36,{color:C.text2,alpha:p}); return; }
  T(ctx,'E. coli · lac-operon',120,140,46,{w:700}); bacterie(ctx,640,124,0.55,1);
  const s1=li===1?ease(lf*1.6):1, s2=li<2?0:li===2?ease(lf*1.6):1, s3=li<3?0:li===3?ease(lf*3):1;
  operonRow(ctx,{reg:s3,pro:s1,opr:s2,genes:s1,br:li===2?clamp(lf*2-0.8,0,1):li>2?0.5:0});
  if(li===1){ lactose(ctx,1500,300,1.2,s1); M(ctx,'opname en afbraak van lactose (melksuiker)',1257,330,{align:'center',color:C.text2,alpha:s1,px:26}); return; }
  if(li===2) return;
  if(li===3){ const m=clamp((lf-0.15)*2.2,0,1), mv=ease(clamp((lf-0.35)*2.4,0,1)); const rx=lerp((OP.reg[0]+OP.reg[1])/2,oX,mv), ry=y-70; protChain(ctx,rx,ry,1,C.koraal,m,clamp(m*1.5,0,1)); if(mv<1&&m>0) M(ctx,'repressor',rx,ry-64,{align:'center',color:C.koraal,alpha:m});
    const pb=clamp((lf-0.65)*3,0,1); enzyme(ctx,pX,y-134,0.6,pb); if(mv>=1){ M(ctx,'repressor',oX+14,y-150,{align:'left',color:C.koraal}); M(ctx,'rna-polymerase',pX-80,y-170,{align:'right',color:C.text2,alpha:pb}); }
    T(ctx,'uit',1257,330,48,{w:700,align:'center',color:C.koraal,alpha:pb}); M(ctx,'polymerase kan de genen niet overschrijven',1257,380,{align:'center',color:C.text2,alpha:pb}); return; }
  // li 4: lactose bindt, repressor laat los, polymerase loopt, mRNA; li 5: enzymen
  const a=li===4?lf:1; const inL=ease(clamp(a/0.3,0,1)), up=ease(clamp((a-0.32)/0.2,0,1)), run=ease(clamp((a-0.5)/0.45,0,1));
  const rx=oX, ry=lerp(y-70,y-200,up); protChain(ctx,rx,ry,1,C.koraal,1,1); lactose(ctx,lerp(1500,rx+14,inL),lerp(170,ry-58,inL),0.9,1);
  M(ctx,'lactose',lerp(1500,rx+14,inL)+ (inL<1?60:70),lerp(170,ry-58,inL)+10,{color:'#EDE4D0'}); if(up>0.5) M(ctx,'repressor laat los',rx-70,ry+8,{align:'right',color:C.koraal,alpha:up});
  const px=lerp(pX,OP.genes[2][1]-60,run); enzyme(ctx,px,y-134,0.6,1); if(run>0.02) slier(ctx,px-40,y-170,px-40-OP.genes[0][0],1,{dir:-1,ph:px/40});
  if(run>0.3) M(ctx,'mrna voor alle drie de genen',(OP.genes[0][0]+px)/2,y-215,{align:'center',color:C.teal,alpha:clamp(run*3-0.9,0,1)});
  T(ctx,run>0.05?'aan':'uit',1830,330,48,{w:700,align:'right',color:run>0.05?C.groen:C.koraal});
  if(li===5){ const p=ease(lf*1.6); [0,1,2].forEach(k=>{ const g=OP.genes[k]; protChain(ctx,(g[0]+g[1])/2+20,170,0.85,C.oker,p,clamp(p*1.3,0,1),k+5); }); M(ctx,'enzymen voor lactose',1257,100,{align:'center',color:C.oker,alpha:p});
    T(ctx,'alleen enzymen als er lactose is',960,820,40,{w:700,align:'center',color:C.goud,alpha:clamp(p*2-0.6,0,1)}); }
};
// RISC: eiwitcomplex (een paar ketens samen)
function risc(ctx,x,y,alpha=1){ if(alpha<=0.01) return; protChain(ctx,x-34,y,1,ENZ,alpha,1,21); protChain(ctx,x+30,y-10,1,ENZ,alpha,1,22); protChain(ctx,x,y+20,0.9,ENZ,alpha,1,23); }
SCENES.h2ri=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'RNA-interferentie',120,140,46,{w:700}); M(ctx,'een gen uitzetten ná de transcriptie',120,190,{color:C.text2});
  if(li===0){ const p=ease(lf*1.4), y=470; ln(ctx,180,y-10,520,y-10,BBR,5); ln(ctx,180,y+10,520,y+10,BBR,5); M(ctx,'gen (dna)',350,y+70,{align:'center',color:C.paars});
    arrow(ctx,560,y,720,y,C.line,3); M(ctx,'transcriptie',640,y-62,{align:'center',color:C.text2}); slier(ctx,760,y,340,1); M(ctx,'mrna',930,y+70,{align:'center',color:C.teal});
    arrow(ctx,1140,y,1300,y,C.line,3); M(ctx,'translatie',1220,y-62,{align:'center',color:C.text2}); protChain(ctx,1420,y,1,C.oker,1,1,7); M(ctx,'eiwit',1420,y+80,{align:'center',color:C.oker});
    ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.setLineDash([10,8]); roundRect(ctx,742,y-45,376,140,24); ctx.stroke(); ctx.restore();
    T(ctx,'hier grijpt RNA-interferentie in: op het mRNA',930,680,38,{w:700,align:'center',color:C.koraal,alpha:p}); return; }
  if(li===1){ const p=ease(lf*1.3); panel(ctx,140,250,780,560,1); panel(ctx,1000,250,780,560,p);
    T(ctx,'microRNA',180,310,40,{w:700,color:C.teal}); M(ctx,'door de cel zelf · eigen genen',180,350,{color:C.text2});
    ln(ctx,200,460,520,460,BBR,6); M(ctx,'eigen gen',360,510,{align:'center',color:C.paars}); arrow(ctx,540,460,610,460,C.line,2.5);
    ctx.save(); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(640,448); ctx.lineTo(820,448); ctx.arc(820,460,12,-1.57,1.57); ctx.lineTo(640,472); ctx.stroke(); for(let u=650;u<815;u+=12) ln(ctx,u,450,u,470,rgba(C.teal,0.6),2); ctx.restore(); M(ctx,'haarspeld',730,510,{align:'center',color:C.text2});
    arrow(ctx,730,540,730,610,C.line,2.5); dsRNA(ctx,640,660,180,1); M(ctx,'klein stukje',730,720,{align:'center',color:C.teal});
    T(ctx,'siRNA',1040,310,40,{w:700,color:C.teal,alpha:p}); M(ctx,'uit dubbelstrengs rna (virus, lab)',1040,350,{color:C.text2,alpha:p});
    dsRNA(ctx,1060,460,660,p); [1280,1500].forEach(x=>{ ln(ctx,x,430,x,490,C.koraal,3); }); ctx.save(); ctx.globalAlpha*=p; ctx.restore();
    const sp=clamp(lf*2-0.6,0,1); [0,1,2].forEach(k=>dsRNA(ctx,1060+k*240,640,180,sp)); M(ctx,'kleine stukjes',1390,720,{align:'center',color:C.teal,alpha:sp});
    M(ctx,'± 20 tot 25 nucleotiden',960,860,{align:'center',color:C.goud,alpha:p}); return; }
  if(li===2){ const y=600, mv=ease(clamp(lf/0.6,0,1)), bx=lerp(420,1100,mv), bound=clamp((lf-0.6)/0.25,0,1);
    slier(ctx,160,y,1600,1,{amp:0.25}); M(ctx,'mrna',160,y+60,{color:C.teal});
    // match zone
    ctx.save(); ctx.globalAlpha*=0.5; box(ctx,1000,y-30,200,60,10,null,rgba(C.goud,0.8),2); ctx.restore(); M(ctx,'passende basenvolgorde',1100,y+60,{align:'center',color:C.goud});
    const sy=lerp(y-120,y-22,bound); risc(ctx,bx,sy-70,1); ln(ctx,bx-90,sy,bx+90,sy,'#8CC6E1',3); M(ctx,'risc',bx+110,sy-110,{color:C.text,px:30});
    if(bound>0){ ctx.save(); ctx.globalAlpha*=bound; for(let u=-84;u<=84;u+=12) ln(ctx,bx+u,sy+2,bx+u,y-4,rgba(C.text,0.7),2); ctx.restore(); M(ctx,'klein rna · baseparing',bx,y+110,{align:'center',color:C.text,alpha:bound}); }
    M(ctx,'één streng van het kleine rna',bx,sy+44,{align:'center',color:'#8CC6E1',alpha:1-bound,px:24}); return; }
  if(li===3){ const p=ease(lf*1.3), y=520; panel(ctx,140,250,780,560,1); panel(ctx,1000,250,780,560,1);
    T(ctx,'past precies · siRNA',180,310,36,{w:700,color:C.teal}); const cut=clamp(lf*2.5-0.3,0,1);
    slier(ctx,180-cut*30,y,300,1-cut*0.6,{amp:0.25}); slier(ctx,540+cut*30,y,330,1-cut*0.6,{amp:0.25,ph:2}); risc(ctx,510,y-90,1); ln(ctx,440,y-22,600,y-22,'#8CC6E1',3);
    if(cut>0.5) for(let k=0;k<10;k++) ln(ctx,220+k*62+Math.sin(k)*8,y+120+(k%3)*22,236+k*62+Math.sin(k)*8,y+120+(k%3)*22,C.teal,3);
    M(ctx,'mrna doorgeknipt → afgebroken',530,740,{align:'center',color:C.koraal,alpha:cut});
    const q=clamp(lf*2-0.9,0,1); T(ctx,'past deels · microRNA',1040,310,36,{w:700,color:C.teal,alpha:q}); slier(ctx,1040,y,700,q,{amp:0.25}); ribosomeBig(ctx,1220,y-14,150,q); risc(ctx,1480,y-90,q); ctx.save(); ctx.globalAlpha*=q; ln(ctx,1410,y-22,1550,y-22,'#8CC6E1',3); for(let u=1416;u<1550;u+=24) ln(ctx,u,y-20,u,y-6,rgba(C.text,0.7),2); ctx.restore();
    M(ctx,'translatie geblokkeerd',1390,740,{align:'center',color:C.koraal,alpha:q}); return; }
  if(li===4){ const p=ease(lf*1.4), y=520; panel(ctx,140,250,780,560,1); panel(ctx,1000,250,780,560,p);
    T(ctx,'regeling van de transcriptie',180,310,36,{w:700}); M(ctx,'repressor · activator',180,350,{color:C.text2});
    ln(ctx,200,y,860,y,C.line,6); box(ctx,240,y-22,140,44,8,rgba(C.goud,0.3),C.goud,1.5); box(ctx,392,y-22,440,44,8,RBB,RBBR,1.5); protChain(ctx,310,y-62,0.8,C.koraal,1,1); enzyme(ctx,620,y-150,0.5,0.35);
    T(ctx,'wel of géén mRNA?',530,700,34,{w:700,align:'center',color:C.goud});
    ctx.save(); ctx.globalAlpha*=p; T(ctx,'RNA-interferentie',1040,310,36,{w:700,color:C.teal}); M(ctx,'werkt op het mrna',1040,350,{color:C.text2});
    ln(ctx,1060,y-120,1280,y-120,C.line,6); M(ctx,'gen',1170,y-80,{align:'center',color:C.text2}); arrow(ctx,1300,y-120,1370,y-120,C.line,2.5); slier(ctx,1390,y-120,300,1); M(ctx,'mrna wordt gemaakt',1540,y-70,{align:'center',color:C.teal}); risc(ctx,1540,y+20,1);
    protChain(ctx,1540,y+170,0.8,C.oker,0.5,1,7); ln(ctx,1480,y+120,1600,y+220,C.koraal,5); ln(ctx,1600,y+120,1480,y+220,C.koraal,5); ctx.restore();
    T(ctx,'mRNA wel, eiwit niet',1390,780,34,{w:700,align:'center',color:C.goud,alpha:p}); return; }
  if(li===5){ const p=ease(lf*1.4); panel(ctx,140,300,780,420,1); panel(ctx,1000,300,780,420,p);
    T(ctx,'onderzoek',180,370,40,{w:700}); T(ctx,'zet met siRNA één gen uit',180,430,32,{color:C.text2}); T(ctx,'en kijk wat er dan verandert',180,475,32,{color:C.text2});
    box(ctx,700,520,60,150,26,rgba(C.teal,0.3),C.teal,2); box(ctx,690,505,80,20,6,C.line); dsRNA(ctx,705,610,50,1);
    ctx.save(); ctx.globalAlpha*=p; T(ctx,'medicijn',1040,370,40,{w:700}); T(ctx,'siRNA in de lever: minder',1040,430,32,{color:C.text2}); T(ctx,'van een schadelijk eiwit',1040,475,32,{color:C.text2});
    ctx.beginPath(); ctx.moveTo(1420,560); ctx.quadraticCurveTo(1520,500,1700,540); ctx.quadraticCurveTo(1730,620,1600,670); ctx.quadraticCurveTo(1480,690,1420,640); ctx.closePath(); ctx.fillStyle=rgba(C.bruin,0.75); ctx.fill(); ctx.strokeStyle=lighten(C.bruin,0.35); ctx.lineWidth=2; ctx.stroke(); M(ctx,'lever',1560,710,{align:'center',color:C.text2}); ctx.restore(); return; }
  const p=ease(lf*1.5); egg(ctx,960,460,70,p); M(ctx,'waar komen al die cellen vandaan?',960,620,{align:'center',color:C.goud,alpha:p});
};

// ---- H3a: egg divides; stem cells; two abilities; the beenmerg division ----
SCENES.h3a=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li===0){ const p=ease(lf); egg(ctx,330,470,80,1); arrow(ctx,430,470,520,470,C.line,2,p); for(let k=0;k<2;k++) egg(ctx,620,400+k*140,60,clamp(p*2,0,1)); arrow(ctx,700,470,790,470,C.line,2,clamp(p*2-1,0,1)); for(let k=0;k<4;k++) egg(ctx,880,320+k*100,44,clamp(p*2-1,0,1)); arrow(ctx,940,470,1030,470,C.line,2,clamp(p*3-2,0,1)); const R=seeded(4); for(let k=0;k<24;k++) egg(ctx,1120+(k%6)*70,300+Math.floor(k/6)*80,28,clamp(p*3-2,0,1)); return; }
  if(li===1){ const p=ease(lf*1.5); for(let k=0;k<12;k++) stemCell(ctx,380+(k%4)*80,360+Math.floor(k/4)*80,34,1); M(ctx,'embryo · embryonale stamcellen',500,640,{align:'center',color:C.text2,alpha:p}); box(ctx,1100,320,520,300,40,rgba('#EDE4D0',0.25),'#C9BBA0',1.5); for(let k=0;k<6;k++) stemCell(ctx,1180+(k%3)*130,400+Math.floor(k/3)*120,40,p); M(ctx,'beenmerg · volwassen stamcellen',1360,680,{align:'center',color:C.text2,alpha:p}); return; }
  if(li===2){ const p=ease(lf*1.5); stemCell(ctx,960,330,90,1); M(ctx,'stamcel',960,200,{align:'center',color:C.text2}); arrow(ctx,900,420,560,560,C.line,2,p); arrow(ctx,1020,420,1360,560,C.line,2,clamp(p*2-0.5,0,1)); stemCell(ctx,480,640,70,p); stemCell(ctx,640,640,70,p); M(ctx,'zichzelf blijven delen',560,760,{align:'center',color:C.text2,alpha:p}); redCell(ctx,1360,640,60,clamp(p*2-0.5,0,1)); M(ctx,'ontwikkelen tot gespecialiseerde cel',1360,760,{align:'center',color:C.goud,alpha:clamp(p*2-0.5,0,1)}); M(ctx,'celdifferentiatie',1360,800,{align:'center',color:C.goud,alpha:clamp(p*2-0.5,0,1)}); return; }
  // li3: division → two equal daughters → different genes on → one stays stem, other after a series becomes red cell
  ctx.save(); ctx.translate(180,150); const p=ease(lf); stemCell(ctx,300,470,70,1); arrow(ctx,380,440,520,340,C.line,2,1); arrow(ctx,380,500,520,600,C.line,2,1); stemCell(ctx,600,320,56,1); stemCell(ctx,600,620,56,1); M(ctx,'vlak na de deling: gelijk',600,200,{align:'center',color:C.text2});
  const q=clamp(p*2-0.3,0,1); geneStrip(ctx,700,300,[1,0,1,1,0,0],q,28); geneStrip(ctx,700,600,[0,1,1,0,1,1],q,28); M(ctx,'blijft stamcel',960,330,{color:C.text2,alpha:q});
  const r=clamp(p*2-1,0,1); let x=960; for(let k=0;k<4;k++){ const f=k/3; const col=f<0.5?C.fill:C.koraal; arrow(ctx,x,620,x+90,620,C.line,2,clamp(r*4-k,0,1)); x+=120; cellS(ctx,x,620,40-f*8,clamp(r*4-k,0,1),false,k<2?C.fill:C.koraal); } redCell(ctx,x+120,620,40,clamp(r*4-3,0,1)); arrow(ctx,x+50,620,x+70,620,C.line,2,clamp(r*4-3,0,1)); M(ctx,'na een reeks delingen: rode bloedcel',1300,720,{align:'center',color:C.koraal,alpha:clamp(r*4-3,0,1)}); ctx.restore();
};

// ---- H3b: differentiation by expression; hemoglobin; apoptosis; locked; lab reset ----
SCENES.h3b=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li<=1){ const p=P(li,1,lf); stemCell(ctx,960,250,70,1); M(ctx,'DNA verandert niet',960,150,{align:'center',color:C.text2}); arrow(ctx,900,320,600,440,C.line,2,1); arrow(ctx,1020,320,1320,440,C.line,2,1); redCell(ctx,560,540,70,1); M(ctx,'rode bloedcel',560,660,{align:'center',color:C.text2}); cellS(ctx,1360,540,70,1,false,C.fill); M(ctx,'afweercel',1360,660,{align:'center',color:C.text2});
    [[560,true],[1360,false]].forEach(([x,on])=>{ ctx.save(); ctx.globalAlpha*=p; box(ctx,x-200,700,400,60,12,on?rgba(C.goud,0.35):rgba(C.line,0.15),on?C.goud:rgba(C.line,0.4),1.5); T(ctx,'gen hemoglobine',x-180,740,30,{w:600}); T(ctx,on?'aan':'uit',x+170,740,30,{w:700,align:'right',color:on?C.groen:C.koraal}); ctx.restore(); }); return; }
  if(li===2){ const p=ease(lf*1.3); hand(ctx,700,620,1.3,1,1-p); arrow(ctx,900,500,1060,500,C.line,2,p); hand(ctx,1260,620,1.3,p,0); M(ctx,'apoptose · cellen ruimen zichzelf op',960,CAPTION_Y-60,{align:'center',color:C.koraal}); return; }
  if(li===3){ const p=ease(lf*1.5); nerveCell(ctx,700,440,1.2,1); M(ctx,'zenuwcel',700,700,{align:'center',color:C.text2}); geneStrip(ctx,1200,300,[1,0,0,1,0,0,1,0],1,40); for(let k=0;k<8;k++) if(![0,3,6].includes(k)) lock(ctx,1220+k*48,380,0.6,p); M(ctx,'alle genen zitten er nog · de meeste op slot',1390,450,{align:'center',color:C.koraal,alpha:p}); return; }
  const p=ease(lf*1.5); skinCell(ctx,500,470,1.1,1); M(ctx,'huidcel',500,600,{align:'center',color:C.text2}); box(ctx,760,400,320,140,20,rgba(C.goud,0.2),C.goud,1.5); T(ctx,'regulatorgenen',920,450,30,{w:700,align:'center',color:C.goud}); T(ctx,'aan',920,505,36,{w:700,align:'center',color:C.groen}); arrow(ctx,650,470,740,470,C.line,2,p); arrow(ctx,1100,470,1220,470,C.line,2,p); stemCell(ctx,1340,470,80,p); M(ctx,'weer een stamcel',1340,600,{align:'center',color:C.goud,alpha:p}); M(ctx,'in het lab · reparatie van beschadigd weefsel',960,760,{align:'center',color:C.text2,alpha:p});
};

// ---- H3v: toti / pluri / multipotent ----
SCENES.h3v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});
  const rows=[['totipotent','bevruchte eicel · alles, ook placenta',1,0],['pluripotent','embryonale stamcel · alle lichaamscellen',2,2],['multipotent','bloedstamcellen · alleen bloedcellen',3,5]];
  rows.forEach(([n,s,L,locks],i)=>{ const p=P(li,L,lf); const y=300+i*150; ctx.save(); ctx.globalAlpha*=p; stemCell(ctx,420,y,50,1); T(ctx,n,520,y+2,40,{w:700,color:C.goud}); M(ctx,s,520,y+48,{color:C.text2}); geneStrip(ctx,1300,y-24,[1,1,1,1,1,1,1],1,32); for(let k=0;k<locks;k++) lock(ctx,1316+k*40,y+52,0.5,1); ctx.restore(); });
  if(li>=4) T(ctx,'verder gedifferentieerd · minder soorten cel mogelijk · meer genen op slot',960,780,36,{w:700,align:'center',color:C.koraal,alpha:P(li,4,lf)});
  if(li===5){ const p=ease(lf*2); ctx.save(); ctx.globalAlpha*=p; ctx.globalAlpha=1; ctx.fillStyle=rgba(C.bgSchema,p); ctx.fillRect(0,0,W,H); ctx.globalAlpha=p; personReal(ctx,760,820,480,1,TWIN_A); personReal(ctx,1160,820,480,1,TWIN_B); ctx.restore(); }
};

// ---- H4a: methyl lock on the promotor; inherited by daughters; no mutation ----
SCENES.h4a=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li===0){ const p=ease(lf*1.5); personReal(ctx,560,780,460,1,TWIN_A); personReal(ctx,1360,780,460,1,TWIN_B); M(ctx,'zelfde DNA',960,300,{align:'center',color:C.text}); geneStrip(ctx,380,820,[1,0,1,1,0,1,0,1,1],p,36); geneStrip(ctx,1180,820,[1,0,0,1,1,1,0,0,1],p,36); M(ctx,'andere genexpressie',960,845,{align:'center',color:C.goud,alpha:p}); return; }
  const y=430; const g=geneRow(ctx,420,y,900,1,'gen',li>=2?false:null);
  if(li>=1){ const p=P(li,1,lf); methyl(ctx,g.px,y-26,p); lock(ctx,g.px+120,y-80,1,p); if(li===1) naamBij(ctx,'methylgroep','chemisch slotje op het DNA',g.px-25,y-100,p,'right',C.koraal); }
  if(li===2){ const p=ease(lf*1.5); const tx=g.px-300+p*180; tf(ctx,tx,y-110,1,1,C.goud,''); ctx.save(); ctx.globalAlpha*=clamp(p*3-2,0,1); ctx.strokeStyle=C.koraal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(g.px-60,y-170); ctx.lineTo(g.px-20,y-130); ctx.moveTo(g.px-20,y-170); ctx.lineTo(g.px-60,y-130); ctx.stroke(); ctx.restore(); M(ctx,'kan er niet bij → gen blijft uit · dochtercellen krijgen het slotje mee',960,700,{align:'center',color:C.koraal,alpha:p}); cellS(ctx,560,790,50,p,false); lock(ctx,600,790,0.5,p); cellS(ctx,1360,790,50,p,false); lock(ctx,1400,790,0.5,p); }
  if(li===3){ const p=ease(lf*1.5); panel(ctx,360,620,1200,220,p); T(ctx,'basenvolgorde onveranderd → geen mutatie',420,690,36,{w:700,alpha:p}); T(ctx,'niet voorgoed: het slotje kan er weer af',420,745,36,{w:600,color:C.groen,alpha:p}); T(ctx,'epigenetisch: óp het DNA, niet ín het DNA',420,800,36,{w:700,color:C.goud,alpha:p}); }
};

// ---- H4b: locks set by the cell; environment changes some; the smoking twin; epigenetica ----
SCENES.h4b=(ctx,li,lf,t)=>{ bg(ctx,'schema');
  if(li===0){ const p=ease(lf*1.5); let x=300; for(let k=0;k<4;k++){ liverCell(ctx,x,470,0.8,clamp(p*4-k,0,1)); lock(ctx,x+60,400,0.6,clamp(p*4-k,0,1)); if(k<3) arrow(ctx,x+110,470,x+250,470,C.line,2,clamp(p*4-k-0.5,0,1)); x+=360; } M(ctx,'levercel blijft levercel · slotjes gaan mee bij elke deling',960,700,{align:'center',color:C.text2,alpha:p}); return; }
  if(li<=2){ const p=P(li,1,lf); const items=[['voeding',()=>{ circ(ctx,560,440,44,C.groen); circ(ctx,600,420,30,C.koraal); }],['stress',()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(900,400); ctx.lineTo(940,470); ctx.lineTo(980,410); ctx.lineTo(1020,480); ctx.stroke(); }],['roken',()=>cig(ctx,1300,440,1.3,1,t)]];
    items.forEach(([n,d],i)=>{ ctx.save(); ctx.globalAlpha*=clamp(p*3-i,0,1); d(); T(ctx,n,560+i*400,560,34,{w:600,align:'center'}); ctx.restore(); });
    geneStrip(ctx,540,640,[1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0],p,30); for(const k of [2,5,9,12]) lock(ctx,555+k*38,720,0.5,p); for(const k of [16,20]) lock(ctx,555+k*38,720,0.5,clamp(p*2-1,0,1),true);
    if(li===2) M(ctx,'roken: ook echte mutaties (aflevering 5) · én andere genen aan en uit',960,800,{align:'center',color:C.koraal,alpha:ease(lf*2)}); return; }
  if(li===3){ const p=ease(lf*1.5); personReal(ctx,480,780,460,1,TWIN_A); personReal(ctx,1440,780,460,1,TWIN_B); cig(ctx,1480,560,0.8,1,t); zoomCircle(ctx,960,470,220,1440,560,'',1,()=>{ ctx.fillStyle=C.bgSchema; ctx.fillRect(740,250,440,440); cellS(ctx,960,470,120,1,false); for(const [dx,dy] of [[-40,-30],[30,-50],[50,30],[-20,50]]) lock(ctx,960+dx,470+dy,0.5,p); }); M(ctx,'longcel · zelfde DNA, andere slotjes',960,CAPTION_Y-60,{align:'center',color:C.koraal}); return; }
  const p=ease(lf*1.5); panel(ctx,360,300,1200,300,p); T(ctx,'epigenetica',420,380,52,{titel:true,color:C.goud,alpha:p}); T(ctx,'alles wat genen aan of uit zet zonder de basenvolgorde te veranderen',420,450,32,{alpha:p}); T(ctx,'en hoe je omgeving daar invloed op heeft',420,500,32,{alpha:p}); geneStrip(ctx,420,530,[1,0,1,1,0,1,0,1,1,0,1,1],p,30); for(const k of [1,4,6,9]) lock(ctx,435+k*38,610,0.45,p);
};

// ---- H4c: father rat, sperm with locks → daughters; erasing; humans under study ----
SCENES.h4c=(ctx,li,lf,t)=>{ bg(ctx,'schema'); M(ctx,'naar cvte, examen biologie havo 2022, tijdvak 1',1800,80,{align:'right',color:C.text2});
  rat(ctx,400,400,1,1); M(ctx,'vader · vetrijk dieet',400,500,{align:'center',color:C.text2}); rat(ctx,400,660,0.8,1,'#B8C0D0'); M(ctx,'moeder · at gewoon',400,740,{align:'center',color:C.text2});
  if(li===0){ const p=ease(lf*1.5); ctx.save(); ctx.globalAlpha*=p; ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(620,620); ctx.lineTo(700,700); ctx.moveTo(700,620); ctx.lineTo(620,700); ctx.stroke(); M(ctx,'baarmoeder valt af',760,670,{color:C.koraal}); M(ctx,'mutatie: toeval · niet bij álle dochters',760,380,{color:C.koraal}); ctx.restore(); return; }
  const p=P(li,1,lf); for(let k=0;k<3;k++){ circ(ctx,760,330+k*60,16,C.fill,C.er,1.5); ln(ctx,776,330+k*60,840,330+k*60+10,C.er,3); lock(ctx,720,330+k*60,0.4,p); } M(ctx,'zaadcellen met slotjes',800,540,{align:'center',color:C.koraal,alpha:p}); arrow(ctx,900,420,1060,420,C.line,2,p);
  for(let k=0;k<3;k++){ rat(ctx,1240,300+k*120,0.6,p,'#B8C0D0'); lock(ctx,1330,270+k*120,0.4,p); } M(ctx,'dochters · andere genexpressie in de alvleesklier',1300,700,{align:'center',color:C.text2,alpha:p});
  if(li>=2){ const q=P(li,2,lf); panel(ctx,900,740,960,120,q); T(ctx,'de meeste slotjes gewist: bij vorming van zaad- en eicellen, en vlak na de bevruchting',930,785,26,{color:C.text2,alpha:q}); T(ctx,'sommige blijven zitten',930,830,28,{w:600,color:C.koraal,alpha:q}); }
  if(li===3) T(ctx,'bij ratten · bij mensen: nog onderzocht',960,180,36,{w:700,align:'center',color:C.goud,alpha:ease(lf*2)});
};

// ---- H4v: methylering, histones open/closed, X-inactivation, tortoiseshell cat ----
SCENES.h4v=(ctx,li,lf,t)=>{ bg(ctx,'schema'); T(ctx,'Voor vwo: een stap verder',120,170,48,{w:700,alpha:li===0?ease(lf*2):0.5});
  if(li===0){ const p=ease(lf*1.5); const g=geneRow(ctx,520,480,900,1,'gen',false); methyl(ctx,g.px-30,454,1); methyl(ctx,g.px+30,454,1); T(ctx,'methylering',g.px,620,40,{w:700,align:'center',color:C.koraal,alpha:p}); return; }
  if(li===1){ const p=ease(lf*1.2); const his=(x,y,open)=>{ for(let k=0;k<4;k++){ const hx=x+k*(open?130:70); circ(ctx,hx,y,28,rgba(C.kern,0.8),C.kernR,1); ctx.strokeStyle=BB; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(hx,y,36,0.3,5.9); ctx.stroke(); if(open){ for(const a of [-1.2,0.4]) { ln(ctx,hx+Math.cos(a)*28,y+Math.sin(a)*28,hx+Math.cos(a)*52,y+Math.sin(a)*52,C.groen,3); circ(ctx,hx+Math.cos(a)*58,y+Math.sin(a)*58,7,C.groen); } } } };
    his(420,430,true); M(ctx,'acetylgroepen · los · open',620,560,{align:'center',color:C.groen}); enzyme(ctx,620,250,0.6,p); his(1250,430,false); M(ctx,'geen acetylgroepen · strak · dicht',1360,560,{align:'center',color:C.koraal,alpha:p}); return; }
  if(li===2){ const p=ease(lf*1.5); chromo(ctx,760,420,170,1,C.paars,'X'); chromo(ctx,1160,420,170,1,C.paars,'X'); lock(ctx,1160,420,1.2,p); M(ctx,'poes · twee X · één willekeurig uit, vroeg in het embryo',960,620,{align:'center',color:C.text2,alpha:p}); M(ctx,'alle nakomelingen van die cel: hetzelfde X uit',960,670,{align:'center',color:C.koraal,alpha:clamp(p*2-1,0,1)}); return; }
  if(li===3){ const p=ease(lf*1.5); chromo(ctx,420,380,150,1,C.paars); box(ctx,398,300,44,30,6,'#E08A3C'); M(ctx,'oranje',420,500,{align:'center',color:'#E08A3C'}); chromo(ctx,620,380,150,1,C.paars); box(ctx,598,300,44,30,6,C.kast); M(ctx,'zwart',620,500,{align:'center',color:C.text2}); M(ctx,'gen vachtkleur op X · allelen oranje / zwart',520,220,{align:'center',color:C.text2});
    cat(ctx,1300,460,1,1,[[-60,-20,50,'#E08A3C'],[40,60,46,C.kast],[-30,110,40,C.kast],[60,-40,34,'#E08A3C'],[-20,-130,30,'#E08A3C']].slice(0,Math.round(p*5))); M(ctx,'elk plukje: een ander X aan',1300,CAPTION_Y-60,{align:'center',color:C.goud,alpha:p}); return; }
  if(li===4){ const p=ease(lf*1.5); chromo(ctx,520,400,150,1,C.paars,'X'); chromo(ctx,640,400,100,1,lighten(C.paars,0.3),'Y'); M(ctx,'kater · één X',580,540,{align:'center',color:C.text2}); cat(ctx,1100,460,0.9,1,[[0,0,200,'#E08A3C']]); M(ctx,'óf oranje',1100,CAPTION_Y-60,{align:'center',color:'#E08A3C'}); cat(ctx,1500,460,0.9,p,[[0,0,200,C.kast]]); M(ctx,'óf zwart',1500,CAPTION_Y-60,{align:'center',color:C.text2,alpha:p}); T(ctx,'lapjeskatten: bijna altijd vrouwtjes',960,740,40,{w:700,align:'center',color:C.goud,alpha:clamp(p*2-1,0,1)}); return; }
  const p=ease(lf*1.5); personReal(ctx,760,820,480,p,TWIN_A); personReal(ctx,1160,820,480,p,TWIN_B);
};

// ---- Samenvatting ----
SCENES.recap=(ctx,li,lf,t)=>{ macroBg(ctx); personReal(ctx,420,870,560,1,TWIN_A); personReal(ctx,760,870,560,1,TWIN_B);
  const rows=[['één DNA · elke cel gebruikt een deel: genexpressie',C.text],['transcriptiefactoren zetten genen aan en uit',C.goud],['uit één eicel huid, lever, zenuw: differentiatie',C.text],['slotjes op het DNA · omgeving telt mee: epigenetica',C.koraal],['welke pagina’s open liggen, dat maakt jou',C.groen]];
  panel(ctx,980,200,880,560,1); rows.forEach(([s,c],i)=>{ const p=P(li,Math.min(i,3),lf); T(ctx,s,1030,290+i*100,34,{w:600,color:c,alpha:0.3+0.7*p}); });
};
SCENES.recap2=(ctx,li,lf,t)=>{ bg(ctx,'schema'); const p=ease(lf*1.5); helix(ctx,760,470,900,2.2,1,120,24); ctx.save(); ctx.globalAlpha*=p; circ(ctx,1360,420,120,rgba(C.fill,0.3),C.goud,4); ln(ctx,1445,505,1560,620,C.goud,10); T(ctx,'A T G C',1360,435,44,{w:700,align:'center',color:C.goud}); ctx.restore(); T(ctx,'hoe lees je DNA?',960,760,44,{w:700,align:'center',color:C.goud,alpha:p}); M(ctx,'aflevering zeven',960,820,{align:'center',color:C.text2,alpha:p}); };
