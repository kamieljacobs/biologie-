// Film: Celdeling (Cel 3/3). Chromosome kit.
// Kleurbetekenis in deze film: chromosoom van vader = teal-blauw, van moeder = roze; paars = kern/DNA en vwo;
// goud = focus (telling, pijlen), koraal = fout/te veel, groen = conclusie.
C.vader='#5BA4C9'; C.moeder='#D98BB0'; C.spoel='#8FA0B5';

// one chromatid as a thick rounded stroke, centromere at (x,y); arms up (len*cen) and down; seg = crossing-over piece {from,to,color} along the length (0 = top)
function chromatidPath(ctx,x,y,len,cen,bend,lean){ // lean: x-offset of the ends (for X shape)
  const top=-len*cen, bot=len*(1-cen);
  ctx.beginPath(); ctx.moveTo(x+lean,y+top); ctx.quadraticCurveTo(x+bend,y+top*0.5,x,y); ctx.quadraticCurveTo(x+bend,y+bot*0.5,x+lean,y+bot); }
function chromatid(ctx,x,y,len,color,{w=14,cen=0.38,lean=0,bend=0,seg=null,alpha=1}={}){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.strokeStyle=color; ctx.lineWidth=w; chromatidPath(ctx,x,y,len,cen,bend,lean); ctx.stroke();
  if(seg){ ctx.save(); const top=-len*cen; ctx.beginPath(); ctx.rect(x-60,y+top+len*seg.from,120,len*(seg.to-seg.from)); ctx.clip(); ctx.strokeStyle=seg.color; ctx.lineWidth=w; chromatidPath(ctx,x,y,len,cen,bend,lean); ctx.stroke(); ctx.restore(); }
  // light bands for texture
  ctx.strokeStyle=rgba('#FFFFFF',0.18); ctx.lineWidth=w*0.35; chromatidPath(ctx,x,y,len*0.86,cen,bend,lean*0.86); ctx.stroke();
  ctx.restore(); }
// duplicated chromosome (X): two sister chromatids side by side (left/right), joined at the centromere
function chromX(ctx,x,y,len,color,{w=14,cen=0.38,gap=1,seg=null,segSide=1,alpha=1,dot=true}={}){
  if(alpha<=0.01) return; const off=(w*0.55)*gap, lean=w*0.75*gap;
  chromatid(ctx,x-off,y,len,color,{w,cen,lean:-lean,bend:-off*0.2,seg:segSide<0?seg:null,alpha});
  chromatid(ctx,x+off,y,len,color,{w,cen,lean:lean,bend:off*0.2,seg:segSide>0?seg:null,alpha});
  if(dot){ ctx.save(); ctx.globalAlpha*=alpha; dot0(ctx,x,y,w*0.42,'#2A2140'); ctx.restore(); } }
function dot0(ctx,x,y,r,fill){ ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fillStyle=fill; ctx.fill(); }
// loose chromatin thread (interphase), deterministic squiggle
function chromatin(ctx,x,y,len,color,seed,t=0,alpha=1,w=3){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.lineWidth=w; ctx.lineCap='round';
  ctx.beginPath(); let px=x, py=y, a=hash(seed)*6.28; ctx.moveTo(px,py);
  for(let k=0;k<26;k++){ a+= (hash(seed*31+k)-0.5)*1.6 + Math.sin(t*0.6+k+seed)*0.05; px+=Math.cos(a)*len/26; py+=Math.sin(a)*len/26; ctx.lineTo(px,py); }
  ctx.stroke(); ctx.restore(); }
// morph from chromatin squiggle (c=0) to condensed chromosome (c=1): crossfade + scale
function condensing(ctx,x,y,len,color,c,seed,t,dup=true){ chromatin(ctx,x-len*0.4,y-len*0.3,len*2.2,color,seed,t,1-c,3); if(c>0){ ctx.save(); ctx.globalAlpha*=c; if(dup) chromX(ctx,x,y,len*(0.6+0.4*c),color); else chromatid(ctx,x,y,len*(0.6+0.4*c),color); ctx.restore(); } }
// a cell outline (Micro look); pinch = 0..1 splits it into two along x around cx
function cellBody(ctx,cx,cy,rx,ry,pinch=0,alpha=1,stroke=C.er,fill=rgba(C.fill,0.75)){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  if(pinch<=0.001){ blob(ctx,cx,cy,rx,ry,0.03,2); shape(ctx,fill,stroke,3); ctx.restore(); return; }
  const d=rx*0.52*pinch, r2x=rx*(1-0.45*pinch), r2y=ry*(1-0.12*pinch);
  for(const s of [-1,1]){ blob(ctx,cx+s*d,cy,r2x,r2y,0.03,s+5); ctx.strokeStyle=stroke; ctx.lineWidth=5; ctx.stroke(); }
  for(const s of [-1,1]){ blob(ctx,cx+s*d,cy,r2x,r2y,0.03,s+5); ctx.fillStyle=fill; ctx.fill(); }
  ctx.restore(); }
function nucMembrane(ctx,cx,cy,r,alpha=1,dash=false){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.kernR; ctx.lineWidth=3; if(dash) ctx.setLineDash([14,12]); ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.9,0,0,6.2832); ctx.fillStyle=rgba(C.kern,0.25); ctx.fill(); ctx.stroke(); ctx.restore(); }
function spindle(ctx,pole,targets,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=rgba(C.spoel,0.7); ctx.lineWidth=1.4;
  for(const t of targets){ ctx.beginPath(); ctx.moveTo(pole[0],pole[1]); ctx.lineTo(t[0],t[1]); ctx.stroke(); }
  // astral rays
  for(let k=0;k<10;k++){ const a=k/10*6.2832; ctx.beginPath(); ctx.moveTo(pole[0],pole[1]); ctx.lineTo(pole[0]+Math.cos(a)*34,pole[1]+Math.sin(a)*34); ctx.stroke(); }
  dot0(ctx,pole[0],pole[1],7,C.goud); ctx.restore(); }

// The model cell 2n = 4: two pairs (long A, short B), one of each from vader and moeder
const MODEL=[ {id:'Av',len:130,color:C.vader,pair:0}, {id:'Am',len:130,color:C.moeder,pair:0}, {id:'Bv',len:82,color:C.vader,pair:1}, {id:'Bm',len:82,color:C.moeder,pair:1} ];

// Mitosis of the model cell. st: cond (0..1), nm (nuclear membrane 1..0), spindle (0..1), meta (0..1), ana (0..1), telo (0..1), cyto (0..1)
function mitosisCell(ctx,cx,cy,rx,ry,st,t,alpha=1){
  const {cond=0,nm=1,sp=0,meta=0,ana=0,telo=0,cyto=0}=st; if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  cellBody(ctx,cx,cy,rx,ry,cyto);
  const poleD=rx*0.82*(1-0.08*cyto); const PL=[cx-poleD,cy], PR=[cx+poleD,cy];
  const nucR=ry*0.62; nucMembrane(ctx,cx,cy,nucR,nm*(1-telo));
  // positions
  const scat=[[-70,-60],[60,40],[50,-70],[-40,60]];
  const rows=[-1.5,-0.5,0.5,1.5].map(k=>cy+k*ry*0.36);
  const sep=ana*poleD*0.72; const targets=[];
  MODEL.forEach((m,i)=>{ const sx=cx+scat[i][0]*(1-meta), sy=lerp(cy+scat[i][1],rows[i],meta);
    if(ana<=0.001){ condensing(ctx,sx,sy,m.len*0.62,m.color,cond,i+3,t,true); if(sp>0){ targets.push([sx-8,sy]); } }
    else { const tc=1-telo*0.9; for(const s of [-1,1]){ const x=sx+s*sep, y=sy*(1-0.25*ana)+cy*0.25*ana; if(telo>0) chromatin(ctx,x-30,y-20,m.len*1.4,m.color,i*7+(s>0?50:0),t,telo*0.9,3); chromatid(ctx,x,y,m.len*0.62,m.color,{lean:-s*10*ana,bend:-s*14*ana,alpha:tc}); dot0(ctx,x,y,5,'#2A2140'); if(sp>0) targets.push([x,y]); } } });
  if(sp>0){ const reach=1-0.75*clamp(nm,0,1); const part=(P,arr)=>arr.map(p=>[lerp(P[0],p[0],reach),lerp(P[1],p[1],reach)]); if(ana<=0.001){ spindle(ctx,PL,part(PL,targets.map(p=>[p[0]-6,p[1]])),sp*(1-telo)); spindle(ctx,PR,part(PR,targets.map(p=>[p[0]+6,p[1]])),sp*(1-telo)); } else { spindle(ctx,PL,targets.filter(p=>p[0]<cx),sp*(1-telo)); spindle(ctx,PR,targets.filter(p=>p[0]>cx),sp*(1-telo)); } }
  if(telo>0){ for(const s of [-1,1]) nucMembrane(ctx,cx+s*poleD*0.72,cy,ry*0.42,telo); }
  ctx.restore();
  return {PL,PR};
}
// generic small cell with a list of chromosomes drawn inside
function cellWith(ctx,cx,cy,r,chs,{alpha=1,nuc=false,label=null,lc=C.grain}={}){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; cellBody(ctx,cx,cy,r,r*0.9);
  if(nuc) nucMembrane(ctx,cx,cy,r*0.62,1);
  chs.forEach(c=>{ if(c.dup) chromX(ctx,cx+c.x,cy+c.y,c.len,c.color,{w:c.w||12,seg:c.seg,segSide:c.segSide||1}); else { chromatid(ctx,cx+c.x,cy+c.y,c.len,c.color,{w:c.w||12,seg:c.seg}); dot0(ctx,cx+c.x,cy+c.y,4.5,'#2A2140'); } });
  if(label) metaText(ctx,label,cx,cy+r+44,lc,'center',22); ctx.restore(); }
// DNA amount graph: points [[x,yLevel],...] where yLevel in p units (0.5,1,2); progress 0..1 draws partial
function dnaGraph(ctx,x,y,w,h,pts,progress,{labels=[],alpha=1,title='DNA per kern'}={}){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  roundRect(ctx,x,y,w,h,14); shape(ctx,rgba(C.bgSchema,0.94),C.line,1);
  const gx=x+110, gy=y+h-70, gw=w-150, gh=h-130; const Y=(v)=>gy-v/2*gh;
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(gx,gy-gh-10); ctx.lineTo(gx,gy); ctx.lineTo(gx+gw,gy); ctx.stroke();
  for(const [v,l] of [[2,'2p'],[1,'p'],[0.5,'½p']]){ if(!pts.some(p=>Math.abs(p[1]-v)<0.01)) continue; ctx.save(); ctx.setLineDash([4,6]); ctx.strokeStyle=rgba(C.line,0.4); ctx.beginPath(); ctx.moveTo(gx,Y(v)); ctx.lineTo(gx+gw,Y(v)); ctx.stroke(); ctx.restore(); text(ctx,l,gx-16,Y(v)+10,fTekst(28,600),C.text,'right'); }
  metaText(ctx,title,x+24,y+40,C.grain,'left',22); metaText(ctx,'tijd →',gx+gw,gy+44,C.grain,'right',20);
  // path
  const total=pts.length-1; const upto=progress*total; ctx.strokeStyle=C.paars; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.beginPath();
  for(let k=0;k<=Math.floor(upto)&&k<pts.length;k++){ const P=pts[k]; const px=gx+P[0]*gw, py=Y(P[1]); k?ctx.lineTo(px,py):ctx.moveTo(px,py); }
  const k0=Math.floor(upto); if(k0<total){ const A=pts[k0], B=pts[k0+1], u=upto-k0; ctx.lineTo(gx+lerp(A[0],B[0],u)*gw, Y(lerp(A[1],B[1],u))); }
  ctx.stroke();
  labels.forEach(L=>{ if(L.a>0.01){ ctx.save(); ctx.globalAlpha*=L.a; metaText(ctx,L.s,gx+L.x*gw,gy+24,C.text2,'center',18); ctx.restore(); } });
  ctx.restore(); }
// tiny karyogram: 23 pairs as small bars; highlight set; sex pair XX or XY
function karyo(ctx,x,y,w,h,{alpha=1,hl=null,sex='XY',tris=null,count=23}={}){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  const cols=12, cw=w/cols, rh=h/2;
  for(let i=0;i<count;i++){ const col=i%cols, row=Math.floor(i/cols); const px=x+col*cw+cw/2, py=y+row*rh+rh*0.55; const L=(i<22? lerp(78,26,i/21) : (sex==='XY'?60:60));
    const dim=hl!=null && !hl.includes(i); ctx.save(); if(dim) ctx.globalAlpha*=0.3;
    const mk=(dx,col2,len)=>{ chromatid(ctx,px+dx,py,len,col2,{w:9,cen:0.4}); };
    if(i===22){ mk(-9,C.moeder,60); if(sex==='XY') mk(9,C.vader,26); else mk(9,C.vader,60); }
    else { mk(-9,C.moeder,L); mk(9,C.vader,L); if(tris===i) mk(25,C.moeder,L); }
    metaText(ctx,i===22?(sex==='XY'?'XY':'XX'):String(i+1),px,py+rh*0.48,C.text,'center',18); ctx.restore(); }
  ctx.restore(); }
function sperm(ctx,x,y,s=1,alpha=1,ang=0,t=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,14*s,10*s,0,0,6.2832); ctx.fillStyle=C.text; ctx.fill(); ctx.strokeStyle=C.text; ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(-14*s,0); for(let k=0;k<=20;k++){ ctx.lineTo(-14*s-k*4*s,Math.sin(k*0.7+t*10)*5*s); } ctx.stroke(); ctx.restore(); }
function egg(ctx,x,y,r,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.beginPath(); ctx.arc(x,y,r+10,0,6.2832); ctx.fillStyle=rgba(C.moeder,0.15); ctx.fill(); ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); shape(ctx,rgba(C.fill,0.9),C.moeder,3); nucMembrane(ctx,x,y,r*0.32,1); ctx.restore(); }
