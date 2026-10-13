// ===== DNA series library (Part C, seriebrief DNA) =====
// Basen: vier tinten paars; het paar is ook te zien aan de vorm van de paarrand (A punt / T inkeping, C nok / G sleuf) en aan de letter.
// RNA: teal. Eiwit en aminozuren: oker. Enzymen: grijsblauw met actief centrum in goud. Mutatie: koraal. Focus: goud.
const BC={A:'#C9BEEB',T:'#9F90D4',C:'#6C5BA8',G:'#4F3F86'};
const BCL={A:C.bgMicro,T:C.bgMicro,C:C.text,G:C.text};           // letter colour per base (contrast >= 4.5:1)
const RC={A:'#BFE0EF',U:'#8CC6E1',C:'#4E93B9',G:'#356F91'};      // RNA tints (teal), letters: A,U dark; C,G light
const RCL={A:C.bgMicro,U:C.bgMicro,C:C.text,G:C.text};
const COMP={A:'T',T:'A',C:'G',G:'C'}, RCOMP={A:'U',T:'A',C:'G',G:'C'};
const BB='#3E3366', BBR='#8C7BBF';      // DNA backbone (suiker-fosfaat): paars
const RBB='#24506A', RBBR='#5BA4C9';    // RNA backbone: teal
const ENZ='#7A8BA8';
const NOW=window; // namespace marker

function seeded(seed){ let s=seed>>>0||1; return ()=>{ s^=s<<13; s^=s>>>17; s^=s<<5; return ((s>>>0)%100000)/100000; }; }
function T(ctx,s,x,y,px,o={}){ // Tekst (or Titel when o.titel) with alpha
  const a=o.alpha==null?1:o.alpha; if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
  ctx.font=o.titel?fTitel(px):fTekst(px,o.w||400); ctx.fillStyle=o.color||C.text; ctx.textAlign=o.align||'left'; ctx.textBaseline=o.base||'alphabetic'; ctx.fillText(s,x,y); ctx.restore(); }
function M(ctx,s,x,y,o={}){ const a=o.alpha==null?1:o.alpha; if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; metaText(ctx,s,x,y,o.color||C.grain,o.align||'left',o.px||28); ctx.restore(); }
function term(ctx,s,x,y,o={}){ T(ctx,s,x,y,o.px||48,{w:700,align:o.align||'center',alpha:o.alpha,color:o.color||C.text}); }
function ln(ctx,x1,y1,x2,y2,col,lw,dash){ ctx.save(); ctx.beginPath(); ctx.setLineDash(dash||[]); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.stroke(); ctx.restore(); }
function arrow(ctx,x1,y1,x2,y2,col=C.line,lw=1.5,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  const a=Math.atan2(y2-y1,x2-x1), h=10+lw*3; ctx.beginPath(); ctx.moveTo(x2-h*Math.cos(a-0.45),y2-h*Math.sin(a-0.45)); ctx.lineTo(x2,y2); ctx.lineTo(x2-h*Math.cos(a+0.45),y2-h*Math.sin(a+0.45)); ctx.stroke(); ctx.restore(); }
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function box(ctx,x,y,w,h,r,fill,stroke,lw=1.5){ roundRect(ctx,x,y,w,h,r); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function panel(ctx,x,y,w,h,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; box(ctx,x,y,w,h,14,rgba(C.fill,0.92),rgba(C.line,0.6),1); ctx.restore(); }
// scale bar / speed label: Meta, bottom-left, just above the caption zone
function scale(ctx,w,lab,alpha=1,x=80,y=868){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y-34); ctx.lineTo(x+w,y-34); ctx.moveTo(x,y-44); ctx.lineTo(x,y-24); ctx.moveTo(x+w,y-44); ctx.lineTo(x+w,y-24); ctx.stroke(); metaText(ctx,lab,x,y,C.text2,'left',28); ctx.restore(); }
function speed(ctx,lab,alpha=1){ M(ctx,lab,W-80,868,{align:'right',color:C.text2,alpha}); }

// ---- nucleotide pieces ----
// base bar: from (x,y) going dir=+1 (down) or -1 (up), length L; the far end carries the pairing edge
function basePath(ctx,x,y,b,dir,s){ const L=130*s, hw=26*s, d=16*s, tw=hw*0.48; const yb=y+dir*(L-d), yo=y+dir*L;
  ctx.beginPath(); ctx.moveTo(x-hw,y); ctx.lineTo(x+hw,y);
  if(b==='A'){ ctx.lineTo(x+hw,yb); ctx.lineTo(x,yo); ctx.lineTo(x-hw,yb); }
  else if(b==='T'||b==='U'){ ctx.lineTo(x+hw,yo); ctx.lineTo(x,yb); ctx.lineTo(x-hw,yo); }
  else if(b==='C'){ ctx.lineTo(x+hw,yb); ctx.lineTo(x+tw,yb); ctx.lineTo(x+tw,yo); ctx.lineTo(x-tw,yo); ctx.lineTo(x-tw,yb); ctx.lineTo(x-hw,yb); }
  else { ctx.lineTo(x+hw,yo); ctx.lineTo(x+tw,yo); ctx.lineTo(x+tw,yb); ctx.lineTo(x-tw,yb); ctx.lineTo(x-tw,yo); ctx.lineTo(x-hw,yo); }
  ctx.closePath(); }
function base(ctx,x,y,b,dir=1,o={}){ const s=o.s||1, a=o.alpha==null?1:o.alpha; if(a<=0.01) return; const rna=!!o.rna;
  const fill=(rna?RC:BC)[b], lc=(rna?RCL:BCL)[b];
  ctx.save(); ctx.globalAlpha*=a; basePath(ctx,x,y,b,dir,s); ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=o.mark||lighten(fill,0.35); ctx.lineWidth=o.mark?4:1.5; ctx.stroke();
  if(o.letter!==false){ const cy=y+dir*58*s; ctx.font=fTekst(Math.round(40*s),700); ctx.fillStyle=lc; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(b,x,cy+2*s); }
  ctx.restore(); }
function backbone(ctx,x,y,w,o={}){ const a=o.alpha==null?1:o.alpha; if(a<=0.01||w<=0) return; const rna=!!o.rna, h=(o.h||44);
  ctx.save(); ctx.globalAlpha*=a; box(ctx,x,y-h/2,w,h,h/2,rna?RBB:BB,o.mark||(rna?RBBR:BBR),o.mark?3:1.5);
  if(o.dx){ ctx.fillStyle=rgba(rna?RBBR:BBR,0.9); for(let px=x+o.dx/2;px<x+w-4;px+=o.dx){ ctx.beginPath(); ctx.arc(px-o.dx/2+ (o.off||0),y,4,0,6.283); ctx.fill(); } }
  ctx.restore(); }
function hbonds(ctx,x,y1,y2,n,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; for(let k=0;k<n;k++){ const xx=x-(n-1)*8+k*16; ln(ctx,xx,y1,xx,y2,C.line,2,[4,5]); } ctx.restore(); }
// ladder: top backbone at y, bottom backbone at y+gap
function ladder(ctx,x0,y,seq,o={}){ const dx=o.dx||120, gap=o.gap||300, n=seq.length, a=o.alpha==null?1:o.alpha, s=o.s||1; if(a<=0.01) return;
  backbone(ctx,x0-dx/2,y,n*dx,{alpha:a,dx});
  if(o.bottom!==false) backbone(ctx,x0-dx/2,y+gap,n*dx,{alpha:a,dx});
  for(let i=0;i<n;i++){ const x=x0+i*dx, b=seq[i]; const fa=(o.focus!=null&&o.focus!==i)?a*0.35:a;
    base(ctx,x,y+22,b,1,{alpha:fa,s});
    if(o.bottom!==false&&(!o.shown||o.shown[i])){ base(ctx,x,y+gap-22,COMP[b],-1,{alpha:fa,s,mark:o.markBottom&&o.markBottom[i]?C.koraal:null});
      if(o.bonds) hbonds(ctx,x,y+22+130*s+4,y+gap-22-130*s-4,(b==='A'||b==='T')?2:3,fa); } } }
// twisted ladder (helix), strands paars, rungs in base tints
function helix(ctx,xc,yc,len,twist,alpha=1,amp=150,n=28){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const dx=len/n; const seq='ATGCATGCAATGCCGTAGCTAGCATGCA';
  const P=(i,sgn)=>{ const ph=i/n*Math.PI*2*twist*1.6; return yc+sgn*amp*Math.cos(ph); };
  for(let i=0;i<n;i++){ const x=xc-len/2+i*dx, y1=P(i,-1), y2=P(i,1), b=seq[i%28]; ctx.lineCap='round';
    ln(ctx,x,y1,x,yc,BC[b],12); ln(ctx,x,yc,x,y2,BC[COMP[b]],12); }
  for(const sgn of [-1,1]){ ctx.beginPath(); for(let i=0;i<n;i++){ const x=xc-len/2+i*dx; const y=P(i,sgn); i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.strokeStyle=BBR; ctx.lineWidth=22; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.stroke(); ctx.strokeStyle=BB; ctx.lineWidth=18; ctx.stroke(); }
  ctx.restore(); }
// exploded nucleotide: fosfaat (circle) - suiker (pentagon) - base (bar)
function nucleotide(ctx,x,y,b,s=1,explode=1,alpha=1,o={}){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const e=explode;
  const px=x, sx=x+(80+60*e)*s, bx=x+(150+150*e)*s;
  if(e<1){ ctx.save(); ctx.globalAlpha*=1-e; ln(ctx,px+26*s,y,sx-36*s,y,BBR,3*s); ln(ctx,sx+36*s,y,bx,y,BBR,3*s); ctx.restore(); }
  circ(ctx,px,y,28*s,BBR,lighten(BBR,0.35),1.5); T(ctx,'P',px,y+12*s,Math.round(32*s),{w:700,align:'center',color:C.bgMicro});
  ctx.beginPath(); for(let k=0;k<5;k++){ const a=(-90+k*72)*Math.PI/180; const X=sx+38*s*Math.cos(a),Y=y+38*s*Math.sin(a); k?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.closePath(); ctx.fillStyle=o.rna?'#2F6E8E':'#5E4E96'; ctx.fill(); ctx.strokeStyle=lighten(o.rna?'#2F6E8E':'#5E4E96',0.35); ctx.lineWidth=1.5; ctx.stroke();
  ctx.save(); ctx.translate(bx,y); ctx.rotate(-Math.PI/2); base(ctx,0,0,b,1,{s:s*0.95,rna:o.rna,letter:false}); ctx.restore(); T(ctx,b,bx+58*s*0.95,y+14*s,Math.round(40*s*0.95),{w:700,align:'center',color:(o.rna?RCL:BCL)[b]});
  ctx.restore(); return {px,sx,bx:bx+65*s}; }
function enzyme(ctx,x,y,s=1,alpha=1,site=true){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  ctx.beginPath(); ctx.moveTo(x-110*s,y+60*s); ctx.quadraticCurveTo(x-80*s,y-40*s,x+20*s,y-20*s); ctx.quadraticCurveTo(x+110*s,y+5*s,x+100*s,y+90*s); ctx.quadraticCurveTo(x+85*s,y+180*s,x-10*s,y+170*s); ctx.quadraticCurveTo(x-120*s,y+160*s,x-110*s,y+60*s); ctx.closePath();
  ctx.fillStyle=rgba(ENZ,0.92); ctx.fill(); ctx.strokeStyle=lighten(ENZ,0.35); ctx.lineWidth=1.5; ctx.stroke();
  if(site){ ctx.strokeStyle=C.goud; ctx.lineWidth=Math.max(3,5*s); ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-104*s,y+30*s); ctx.quadraticCurveTo(x-120*s,y+75*s,x-98*s,y+120*s); ctx.stroke(); }
  ctx.restore(); }
// chromosome threads inside a nucleus (paars, thin), cached
const _thr={};
function threads(ctx,cx,cy,r,count=46,alpha=1,seed=11){ if(alpha<=0.01) return; const key=seed+'_'+Math.round(r)+'_'+count; let im=_thr[key];
  if(!im && count<46){ const rnd=seeded(seed); ctx.save(); ctx.globalAlpha*=alpha; for(let k=0;k<count;k++){ let a=rnd()*6.28, rr=r*0.1+rnd()*r*0.75; ctx.beginPath(); for(let t=0;t<26;t++){ a+=(rnd()-0.5)*0.8; rr+=(rnd()-0.5)*r*0.12; rr=clamp(rr,r*0.06,r*0.88); const X=cx+rr*Math.cos(a), Y=cy+rr*Math.sin(a); t?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.strokeStyle=rgba(C.kernR,0.55); ctx.lineWidth=Math.max(1,r/260); ctx.lineJoin='round'; ctx.stroke(); } ctx.restore(); return; }
  if(!im){ im=document.createElement('canvas'); const R=Math.round(r); im.width=2*R+8; im.height=2*R+8; const g=im.getContext('2d'); const rnd=seeded(seed);
    for(let k=0;k<count;k++){ let a=rnd()*6.28, rr=r*0.1+rnd()*r*0.75; g.beginPath(); for(let t=0;t<26;t++){ a+=(rnd()-0.5)*0.8; rr+=(rnd()-0.5)*r*0.12; rr=clamp(rr,r*0.06,r*0.88); const X=R+4+rr*Math.cos(a), Y=R+4+rr*Math.sin(a); t?g.lineTo(X,Y):g.moveTo(X,Y); }
      g.strokeStyle=rgba(C.kernR,0.55); g.lineWidth=Math.max(1,r/260); g.lineJoin='round'; g.stroke(); }
    _thr[key]=im; }
  ctx.save(); ctx.globalAlpha*=alpha; ctx.drawImage(im,cx-im.width/2,cy-im.height/2); ctx.restore(); }
// simple Macro person with a face (Part C: neutral #9AA3B2, eyes + mouth in a few lines)
function personFlat(ctx,x,y,h,alpha=1,o={}){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const c=C.mens;
  const hr=h*0.11, hy=y-h+hr; circ(ctx,x,hy,hr,c,lighten(c,0.3),1.5);
  // face: two eyes, a mouth
  ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(x-hr*0.35,hy-hr*0.1,hr*0.09,0,6.283); ctx.arc(x+hr*0.35,hy-hr*0.1,hr*0.09,0,6.283); ctx.fill();
  ctx.strokeStyle=C.bgMicro; ctx.lineWidth=Math.max(2,hr*0.08); ctx.beginPath(); if(o.open){ ctx.ellipse(x,hy+hr*0.38,hr*0.22,hr*0.16,0,0,6.283); ctx.fillStyle=C.koraal; ctx.fill(); } else { ctx.arc(x,hy+hr*0.2,hr*0.32,0.25,Math.PI-0.25); } ctx.stroke();
  box(ctx,x-h*0.13,y-h+2*hr+h*0.03,h*0.26,h*0.45,h*0.06,c,lighten(c,0.3),1.5);
  box(ctx,x-h*0.115,y-h*0.42,h*0.1,h*0.42,h*0.04,c); box(ctx,x+h*0.015,y-h*0.42,h*0.1,h*0.42,h*0.04,c);
  ctx.restore(); }
// cheek swab (Macro object): stick + cotton tip
function swab(ctx,x,y,rot,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.translate(x,y); ctx.rotate(rot);
  box(ctx,0,-10,360,20,10,'#3A4A66',C.line,1.5); ctx.beginPath(); ctx.ellipse(380,0,40,26,0,0,6.283); ctx.fillStyle='#D9DDE3'; ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
// thermometer (Schema lab library: line drawing, liquid koraal = warmte)
function thermometer(ctx,x,y,h,frac,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  box(ctx,x-16,y,32,h,16,null,'#AFC0D0',1.5); circ(ctx,x,y+h+14,28,null,'#AFC0D0',1.5);
  const fh=(h-24)*frac; box(ctx,x-8,y+h-8-fh,16,fh+14,8,C.koraal); circ(ctx,x,y+h+14,20,C.koraal);
  M(ctx,Math.round(20+frac*75)+' °C',x,y-22,{align:'center',color:C.text2}); ctx.restore(); }
// cell (Micro) with nucleus, using the Part C cell library
function microCell(ctx,cx,cy,r,alpha=1,t=0,o={}){ if(alpha<=0.01) return; const L=cellLayout(cx,cy,r*1.25,r*0.78); ctx.save(); ctx.globalAlpha*=alpha; drawCell(ctx,L,t,Object.assign({motion:0.15,showGolgi:r>140,showER:r>140,showLyso:r>140},o)); ctx.restore(); return L; }
// cell-cycle clock (Schema): G1, S, G2, M; S = DNA (paars), M = deling (goud = focus)
function clock(ctx,cx,cy,r,angle,hl,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  const segs=[['G1',0,0.4],['S',0.4,0.7],['G2',0.7,0.85],['M',0.85,1]];
  for(const [n,a,b] of segs){ ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,(a-0.25)*6.2832,(b-0.25)*6.2832); ctx.closePath();
    const on=hl===n; ctx.fillStyle= on? (n==='S'?rgba(C.paars,0.85):rgba(C.goud,0.75)) : (n==='S'?rgba(C.paars,0.25):C.fill); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke();
    const m=((a+b)/2-0.25)*6.2832; T(ctx,n,cx+r*0.66*Math.cos(m),cy+r*0.66*Math.sin(m)+16,48,{w:700,align:'center',color:on&&n==='M'?C.bgMicro:C.text}); }
  if(angle!=null){ const a=(angle-0.25)*6.2832; ctx.lineCap='round'; ln(ctx,cx,cy,cx+r*0.9*Math.cos(a),cy+r*0.9*Math.sin(a),C.goud,6); circ(ctx,cx,cy,12,C.goud); }
  ctx.restore(); }
// line-cue helper: progress p for line li (1 after the line)
const at=(li,L,lf)=> li>L?1: li<L?0: lf;

// ---- film 3 library: mRNA, ribosome, tRNA, amino-acid chain, lipid particle ----
// mRNA: single teal strand; bases point down (dir=+1) or up (dir=-1) from the backbone at y
function mrna(ctx,x0,y,seq,o={}){ const dx=o.dx||90, s=o.s||0.8, dir=o.dir||1, a=o.alpha==null?1:o.alpha; if(a<=0.01||!seq.length) return;
  backbone(ctx,x0-dx/2,y,seq.length*dx,{rna:true,dx,alpha:a,h:o.h||36});
  for(let i=0;i<seq.length;i++) base(ctx,x0+i*dx,y+dir*16,seq[i],dir,{rna:true,s,alpha:a*(o.focus!=null&&(i<o.focus[0]||i>=o.focus[1])?0.35:1),mark:o.marks&&o.marks[i]?o.marks[i]:null}); }
// ribosome (Part C ribosome colour, drawn enlarged): small and large subunit
function ribosomeBig(ctx,x,y,w=300,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const c='#C9B896', d=lighten(c,0.35);
  blob(ctx,x,y-w*0.18,w*0.55,w*0.36,0.04,3); shape(ctx,rgba(c,0.9),d,1.5);
  blob(ctx,x,y+w*0.30,w*0.5,w*0.2,0.04,7); shape(ctx,rgba(c,0.75),d,1.5);
  ctx.restore(); }
// amino acid bead (oker family); k picks a tint so neighbours differ
const AAT=['#C9A35C','#B08A5C','#D9B97A','#9C7A4A','#E0C98F'];
function aa(ctx,x,y,r,k,lab,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; const c=AAT[k%AAT.length]; circ(ctx,x,y,r,c,lighten(c,0.35),1.5); if(lab) T(ctx,lab,x,y+r*0.36,Math.round(r*0.9),{w:700,align:'center',color:C.bgMicro}); ctx.restore(); }
// trnaY: anticodon backbone y so the anticodon interlocks exactly with the codon of an mRNA (bases up, dir -1) at backbone y=mY; s = base scale of both
const trnaY=(mY,s)=>mY-28-244*s;
// tRNA: teal body (simplified L-shape seen as a T), anticodon of 3 bases at the bottom, amino acid on top
function trna(ctx,x,y,anti,o={}){ // y = backbone line of the anticodon; bases point down (dir +1) to meet the codon
  const a=o.alpha==null?1:o.alpha, dx=o.dx||96, bs=o.bs||0.8; if(a<=0.01) return {top:y-150-40-30}; ctx.save(); ctx.globalAlpha*=a;
  const w=3*dx-20, h=150, top=y-h;
  ctx.beginPath(); ctx.moveTo(x-w/2,y+14); ctx.lineTo(x-w/2,y-60); ctx.quadraticCurveTo(x-w/2,top+10,x-34,top); ctx.lineTo(x-22,top-40); ctx.lineTo(x+22,top-40); ctx.lineTo(x+34,top); ctx.quadraticCurveTo(x+w/2,top+10,x+w/2,y-60); ctx.lineTo(x+w/2,y+14); ctx.closePath();
  ctx.fillStyle=rgba(RBB,0.95); ctx.fill(); ctx.strokeStyle=RBBR; ctx.lineWidth=1.5; ctx.stroke();
  M(ctx,'trna',x,y-56,{align:'center',color:RC.A,px:24});
  for(let i=0;i<3;i++) base(ctx,x+(i-1)*dx,y+12,anti[i],1,{rna:true,s:bs});
  if(o.aa!==false) aa(ctx,x,top-40-30,36,o.k||0,o.aa||'',1);
  ctx.restore(); return {top:top-40-30}; }
// lipid nanoparticle with mRNA inside (vaccine): membrane ring in line colour, teal strand inside
function lnp(ctx,x,y,r,alpha=1,t=0){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,r,rgba(C.fill,0.9),C.er,2); circ(ctx,x,y,r-6,null,C.er,1);
  ctx.beginPath(); for(let k=0;k<=40;k++){ const u=k/40, ang=u*Math.PI*5+t*0.5; const rr=r*0.55*(0.4+0.6*Math.sin(u*Math.PI)); const X=x+Math.cos(ang)*rr, Y=y+Math.sin(ang)*rr; k?ctx.lineTo(X,Y):ctx.moveTo(X,Y); } ctx.strokeStyle=C.teal; ctx.lineWidth=Math.max(2,r/14); ctx.lineCap='round'; ctx.stroke(); ctx.restore(); }
// letter tile (Schema): one nucleotide as a letter in its colour (film 3, 4)
function tile(ctx,x,y,b,o={}){ const a=o.alpha==null?1:o.alpha; if(a<=0.01) return; const rna=o.rna!==false; const w=o.w||64, h=o.h||72; const c=(rna?RC:BC)[b]||C.fill; ctx.save(); ctx.globalAlpha*=a;
  box(ctx,x-w/2,y-h/2,w,h,10,c,o.mark||lighten(c,0.3),o.mark?4:1.2); ctx.font=fTekst(o.px||44,700); ctx.fillStyle=(rna?RCL:BCL)[b]||C.text; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(b,x,y+2); ctx.restore(); }
// friendly Macro person (12 Oct 2026, Kamiel: "veel echter", met huidskleur, minder hoekig, zachte vriendelijke uitstraling).
// Soft rounded shapes, head ≈ 1/6.6 of height, skin tone and hair per figure, clothing with one soft shadow side, friendly face.
// o: {skin, hair, shirt, trousers, shoes, hairStyle:'short'|'long'|'bun'|'curly', armR:{a1,a2,hold}, armL}; a = angle, 0 hanging, + outward
const SKINS=['#E8C2A4','#C99A78','#A3745A','#7A5440','#5A3C2E'];
function personReal(ctx,x,y,h,alpha=1,o={}){ if(alpha<=0.01) return {}; ctx.save(); ctx.globalAlpha*=alpha;
  const skin=o.skin||SKINS[1], hair=o.hair||'#3B2E28', shirt=o.shirt||'#5A7FA0', trous=o.trousers||'#34425A', shoe=o.shoes||'#262C3A';
  const dark=(hex,k)=>{ const n=parseInt(hex.slice(1),16); let r=n>>16,g=(n>>8)&255,b=n&255; return `rgb(${Math.round(r*(1-k))},${Math.round(g*(1-k))},${Math.round(b*(1-k))})`; };
  const top=y-h, hh=h/6.6, hw=hh*0.86, cx=x;
  const shY=top+hh*1.38, shW=hh*1.85, waistY=top+hh*3.1, hipY=top+hh*3.55, hipW=hh*1.5, footY=y;
  ctx.lineCap='round'; ctx.lineJoin='round';
  // legs: soft capsules, slightly tapered; shoes as rounded pebbles
  for(const s2 of [-1,1]){ const lx=cx+s2*hipW*0.24; ctx.strokeStyle=s2<0?trous:dark(trous,0.1); ctx.lineWidth=hh*0.62; ctx.beginPath(); ctx.moveTo(lx,hipY); ctx.lineTo(lx+s2*hh*0.04,footY-hh*0.35); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(lx+s2*hh*0.1,footY-hh*0.14,hh*0.4,hh*0.17,0,0,6.283); ctx.fillStyle=shoe; ctx.fill(); }
  // torso: one soft rounded shape
  ctx.beginPath(); ctx.moveTo(cx,shY-hh*0.12);
  ctx.bezierCurveTo(cx+shW*0.45,shY-hh*0.14,cx+shW*0.56,shY+hh*0.1,cx+shW*0.5,shY+hh*0.6);
  ctx.bezierCurveTo(cx+shW*0.44,waistY-hh*0.4,cx+hipW*0.5,hipY-hh*0.2,cx+hipW*0.52,hipY+hh*0.2);
  ctx.quadraticCurveTo(cx,hipY+hh*0.36,cx-hipW*0.52,hipY+hh*0.2);
  ctx.bezierCurveTo(cx-hipW*0.5,hipY-hh*0.2,cx-shW*0.44,waistY-hh*0.4,cx-shW*0.5,shY+hh*0.6);
  ctx.bezierCurveTo(cx-shW*0.56,shY+hh*0.1,cx-shW*0.45,shY-hh*0.14,cx,shY-hh*0.12); ctx.closePath();
  ctx.fillStyle=shirt; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle=dark(shirt,0.09); ctx.beginPath(); ctx.ellipse(cx+shW*0.62,waistY,shW*0.34,hh*2.6,0,0,6.283); ctx.fill(); ctx.restore();
  // arms: soft tapered sleeve + forearm + round hand
  const arm=(s2,cfg)=>{ const a1=(cfg&&cfg.a1!=null)?cfg.a1:0.12, a2=(cfg&&cfg.a2!=null)?cfg.a2:a1*0.5; const L1=hh*1.38, L2=hh*1.25; const sx=cx+s2*shW*0.4, sy=shY+hh*0.28;
    const ex=sx+s2*Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+s2*Math.sin(a2)*L2, hy=ey+Math.cos(a2)*L2;
    ctx.strokeStyle=skin; ctx.lineWidth=hh*0.3; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(hx,hy); ctx.stroke();
    ctx.strokeStyle=s2<0?shirt:dark(shirt,0.07); ctx.lineWidth=hh*0.44; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey); ctx.lineTo(ex+(hx-ex)*0.15,ey+(hy-ey)*0.15); ctx.stroke();
    const ang=Math.atan2(hy-ey,hx-ex); circ(ctx,hx+Math.cos(ang)*hh*0.06,hy+Math.sin(ang)*hh*0.06,hh*0.2,skin);
    return {hx:hx+Math.cos(ang)*hh*0.08,hy:hy+Math.sin(ang)*hh*0.08,a:ang,cfg}; };
  const rA=arm(1,o.armR), lA=arm(-1,o.armL); for(const A of [rA,lA]) if(A.cfg&&A.cfg.hold) A.cfg.hold(ctx,A.hx,A.hy,A.a);
  // neck + soft collar
  const hy=top+hh*0.56; ctx.fillStyle=dark(skin,0.1); box(ctx,cx-hh*0.17,hy+hh*0.3,hh*0.34,shY-hy-hh*0.25,hh*0.12,dark(skin,0.1));
  ctx.strokeStyle=dark(shirt,0.2); ctx.lineWidth=Math.max(2,hh*0.04); ctx.beginPath(); ctx.moveTo(cx-hh*0.26,shY-hh*0.1); ctx.quadraticCurveTo(cx,shY+hh*0.18,cx+hh*0.26,shY-hh*0.1); ctx.stroke();
  // hair behind
  const st=o.hairStyle||'short'; ctx.fillStyle=hair;
  if(st==='long'){ ctx.beginPath(); ctx.ellipse(cx,hy-hh*0.05,hw*0.62,hh*0.55,0,Math.PI,0); ctx.fill(); for(const s2 of [-1,1]) box(ctx,cx+s2*hw*0.48-hw*0.17,hy-hh*0.15,hw*0.34,hh*1.05,hw*0.17,hair); }
  if(st==='curly'){ for(let k=0;k<11;k++){ const a=Math.PI*(1.0+k/10); circ(ctx,cx+Math.cos(a)*hw*0.56,hy-hh*0.04+Math.sin(a)*hh*0.56,hh*0.2,hair); } }
  if(st==='bun') circ(ctx,cx,hy-hh*0.62,hh*0.22,hair);
  // ears + face (round)
  for(const s2 of [-1,1]) circ(ctx,cx+s2*hw*0.5,hy+hh*0.04,hh*0.11,dark(skin,0.05));
  ctx.beginPath(); ctx.ellipse(cx,hy,hw*0.5,hh*0.52,0,0,6.283); ctx.fillStyle=skin; ctx.fill();
  // hair front: soft cap
  ctx.fillStyle=hair; ctx.beginPath(); ctx.moveTo(cx-hw*0.52,hy-hh*0.02); ctx.bezierCurveTo(cx-hw*0.58,hy-hh*0.66,cx+hw*0.58,hy-hh*0.7,cx+hw*0.52,hy-hh*0.02);
  ctx.bezierCurveTo(cx+hw*0.44,hy-hh*0.26,cx+hw*0.2,hy-hh*0.32,cx-hw*0.05,hy-hh*0.3); ctx.bezierCurveTo(cx-hw*0.3,hy-hh*0.28,cx-hw*0.46,hy-hh*0.2,cx-hw*0.52,hy-hh*0.02); ctx.fill();
  // friendly face: soft brows, round dark eyes with a tiny highlight, small nose, smile, light cheeks
  const ink=dark(skin,0.62); ctx.strokeStyle=ink; ctx.fillStyle=ink;
  for(const s2 of [-1,1]){ ctx.lineWidth=Math.max(1.5,hh*0.035); ctx.beginPath(); ctx.moveTo(cx+s2*hw*0.11,hy-hh*0.13); ctx.quadraticCurveTo(cx+s2*hw*0.2,hy-hh*0.17,cx+s2*hw*0.3,hy-hh*0.13); ctx.stroke();
    circ(ctx,cx+s2*hw*0.2,hy+hh*0.01,hh*0.055,ink); circ(ctx,cx+s2*hw*0.2+hh*0.018,hy-hh*0.012,hh*0.016,rgba('#FFFFFF',0.7));
    circ(ctx,cx+s2*hw*0.3,hy+hh*0.17,hh*0.07,rgba('#E07A5F',0.18)); }
  ctx.lineWidth=Math.max(1.2,hh*0.028); ctx.beginPath(); ctx.moveTo(cx,hy+hh*0.06); ctx.quadraticCurveTo(cx+hw*0.05,hy+hh*0.14,cx-hw*0.01,hy+hh*0.16); ctx.stroke();
  if(o.open){ ctx.beginPath(); ctx.ellipse(cx,hy+hh*0.29,hw*0.11,hh*0.08,0,0,6.283); ctx.fillStyle=dark(skin,0.55); ctx.fill(); } else { ctx.lineWidth=Math.max(1.6,hh*0.034); ctx.beginPath(); ctx.moveTo(cx-hw*0.15,hy+hh*0.25); ctx.quadraticCurveTo(cx,hy+hh*0.35,cx+hw*0.15,hy+hh*0.25); ctx.stroke(); }
  ctx.restore(); return {rHand:{x:rA.hx,y:rA.hy},lHand:{x:lA.hx,y:lA.hy},head:{x:cx,y:hy,r:hh*0.5},hip:{x:cx,y:hipY},knee:{y:top+hh*4.9}}; }

// series person (12 Oct 2026): every film draws the friendly person; each scenes file may set PERSON_LOOK
function person(ctx,x,y,h,alpha=1,o={}){ const look=(typeof PERSON_LOOK!=='undefined')?PERSON_LOOK:{}; return personReal(ctx,x,y,h,alpha,Object.assign({},look,o)); }

// ---- shared with films 4+ (moved from scenes4.js on 13 Oct 2026) ----
const CODE=(()=>{ const B='UCAG', aa='Phe Phe Leu Leu Ser Ser Ser Ser Tyr Tyr stop stop Cys Cys stop Trp Leu Leu Leu Leu Pro Pro Pro Pro His His Gln Gln Arg Arg Arg Arg Ile Ile Ile Met Thr Thr Thr Thr Asn Asn Lys Lys Ser Ser Arg Arg Val Val Val Val Ala Ala Ala Ala Asp Asp Glu Glu Gly Gly Gly Gly'.split(' ');
  const m={}; let k=0; for(const a of B) for(const b of B) for(const c of B){ m[a+b+c]=null; }
  // fill in order: first base, second base, third base — the string above is ordered first, then (second, third)
  k=0; for(const a of B) for(const b of B) for(const c of B){ m[a+b+c]=aa[B.indexOf(a)*16+B.indexOf(b)*4+B.indexOf(c)]; }
  return m; })();
const AANAAM={Met:'methionine',Phe:'fenylalanine',Val:'valine',Leu:'leucine',His:'histidine',Cys:'cysteïne',Ser:'serine',Ala:'alanine',Gly:'glycine'};
function macroBg(ctx){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,720); ctx.quadraticCurveTo(480,640,960,700); ctx.quadraticCurveTo(1440,760,1920,680); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.fill(); ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,820,W,H-820); }
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
// ---- shared helpers for the reading chapters ----
function tileRow(ctx,x0,y,sq,o={}){ const dx=o.dx||96; for(let i=0;i<sq.length;i++){ const m=o.mark&&o.mark(i); tile(ctx,x0+i*dx,y,sq[i],{w:o.w||80,h:o.h||92,px:o.px||52,rna:o.rna!==false,alpha:(o.alpha==null?1:o.alpha)*(o.dim&&o.dim(i)?0.35:1),mark:m||null}); } }
function bracket(ctx,x1,x2,y,col,lab,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x1,y+14); ctx.lineTo(x2,y+14); ctx.lineTo(x2,y); ctx.stroke(); if(lab) M(ctx,lab,(x1+x2)/2,y+50,{align:'center',color:col}); ctx.restore(); }
function aaBead(ctx,x,y,name,k,alpha=1,col){ if(alpha<=0.01) return; aa(ctx,x,y,40,k,'',alpha); if(col){ ctx.save(); ctx.globalAlpha*=alpha; circ(ctx,x,y,40,col,lighten(col,0.3),2); ctx.restore(); } T(ctx,name,x,y+13,34,{w:700,align:'center',color:C.bgMicro,alpha}); }
