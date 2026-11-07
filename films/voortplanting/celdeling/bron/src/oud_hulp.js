// Scenes Celdeling: one per narrated segment. draw(ctx, t, q): t = seconds into the take;
// q.at('woord', n) = start of the n-th word containing 'woord'; q.on('woord', n, d) = ramp 0..1 from that moment.

// helper: grid of dividing cells (1 → 2 → 4 → … ) driven by generation g (float)
function cellSwarm(ctx,cx,cy,g,maxR,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha;
  const gen=Math.floor(g), f=g-gen, n=Math.pow(2,gen); const cols=Math.ceil(Math.sqrt(n)), rows=Math.ceil(n/cols); const r=Math.max(5,maxR/Math.max(cols,rows));
  for(let i=0;i<n;i++){ const c=i%cols, rr=Math.floor(i/cols); const x=cx+(c-(cols-1)/2)*r*2.05, y=cy+(rr-(rows-1)/2)*r*2.05;
    if(f>0.5&&gen<9){ const s=ease((f-0.5)*2); for(const d of [-1,1]){ ctx.beginPath(); ctx.arc(x+d*r*0.45*s,y,r*(1-0.3*s),0,6.2832); shape(ctx,rgba(C.fill,0.9),C.er,1.2); } }
    else { ctx.beginPath(); ctx.arc(x,y,r*0.95,0,6.2832); shape(ctx,rgba(C.fill,0.9),C.er,1.2); if(r>14) dot0(ctx,x,y,r*0.3,rgba(C.kern,0.9)); } }
  ctx.restore(); }

// ---------- Voortplanting (16 okt 2026): organismen voor v01/v02 ----------
function metaA(ctx,s,x,y,col,a,px=22){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; metaText(ctx,s,x,y,col,'center',px); ctx.restore(); }
// eencellige die zich in tweeën deelt (p 0..1); beide helften dezelfde kleur = zelfde DNA
function vpEencellige(ctx,cx,cy,p,t){ const f=rgba(C.goud,0.22), d=ease(p)*92, rx=lerp(118,80,ease(p)), ry=lerp(70,62,ease(p)), w=p>0.15&&p<0.85?Math.sin((p-0.15)/0.7*Math.PI)*0.28:0;
  const one=(x,r)=>{ ctx.beginPath(); ctx.ellipse(x,cy,r,ry,0,0,6.2832); shape(ctx,f,C.goud,2.5); for(let k=0;k<12;k++){ const a=k/12*6.2832; ctx.save(); ctx.strokeStyle=rgba(C.goud,0.6); ctx.lineWidth=1.5; const ex=x+Math.cos(a)*r, ey=cy+Math.sin(a)*ry; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex+Math.cos(a)*10,ey+Math.sin(a)*10+Math.sin(t*6+k)*2); ctx.stroke(); ctx.restore(); } };
  if(p<0.05){ one(cx,rx); dot0(ctx,cx,cy,16,rgba(C.kern,0.95)); return; }
  if(d<rx){ // insnoeren: twee helften die nog vastzitten
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx-d/2,cy,rx*0.75,ry*(1-w),0,0,6.2832); ctx.ellipse(cx+d/2,cy,rx*0.75,ry*(1-w),0,0,6.2832); ctx.fillStyle=f; ctx.fill(); ctx.restore();
    for(const s of [-1,1]){ ctx.beginPath(); ctx.ellipse(cx+s*d/2,cy,rx*0.75,ry*(1-w),0,s<0?Math.PI*0.35:-Math.PI*0.65,s<0?Math.PI*1.65:Math.PI*0.65); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); }
    for(const s of [-1,1]) dot0(ctx,cx+s*d*0.6,cy,13,rgba(C.kern,0.95)); return; }
  for(const s of [-1,1]){ one(cx+s*d,rx*0.72); dot0(ctx,cx+s*d,cy,13,rgba(C.kern,0.95)); }
}
// gistcel met knop (g) en zoetwaterpoliep met zijknop (h)
function vpKnop(ctx,cx,cy,g,h,t){ // gist met knop (zonder poliep: de stem noemt alleen gist)
  const gx=cx-30, gy=cy-20, S=1.5; ctx.beginPath(); ctx.ellipse(gx,gy,62*S,48*S,0,0,6.2832); shape(ctx,rgba(C.goud,0.22),C.goud,2.5); dot0(ctx,gx-8*S,gy,11*S,rgba(C.kern,0.95));
  if(g>0){ const r=34*g*S; ctx.beginPath(); ctx.ellipse(gx+58*S+r*0.7,gy-26*S-r*0.3,r,r*0.85,0,0,6.2832); shape(ctx,rgba(C.goud,0.22),C.goud,2.5); if(g>0.6) dot0(ctx,gx+58*S+r*0.7,gy-26*S-r*0.3,7*S,rgba(C.kern,0.95)); }
  if(h>0){ const r=30*S; ctx.save(); ctx.globalAlpha*=h; ctx.beginPath(); ctx.ellipse(gx+40*S+h*60,gy+120*S,r,r*0.85,0,0,6.2832); shape(ctx,rgba(C.goud,0.22),C.goud,2.5); dot0(ctx,gx+40*S+h*60,gy+120*S,7*S,rgba(C.kern,0.95)); ctx.restore(); }
}
function vpBlad(ctx,x,y,a,s){ ctx.save(); ctx.translate(x,y); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0,-22*s,15*s,24*s,0,0,6.2832); shape(ctx,C.chloro,lighten(C.chloro,0.3),1.5); ctx.strokeStyle=rgba(C.bgSchema,0.6); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(0,-2*s); ctx.lineTo(0,-42*s); ctx.stroke(); ctx.restore(); }
function vpPlant(ctx,x,y,s){ if(s<=0.02) return; ctx.save(); ctx.strokeStyle=C.chloro; ctx.lineWidth=3; for(const a of [-0.5,0,0.5]){ const ex=x+Math.sin(a)*50*s, ey=y-Math.cos(a)*50*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(ex,ey); ctx.stroke(); for(const b of [-0.6,0,0.6]) vpBlad(ctx,ex,ey,a+b,s*0.85); } ctx.restore(); }
// aardbeiplant met uitloper (u) en nieuw plantje (p); stek in water (st)
function vpAardbei(ctx,cx,cy,u,p,st){
  const gy=cy+170; ctx.save(); ctx.strokeStyle=C.bruin; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(cx-190,gy); ctx.lineTo(cx+190,gy); ctx.stroke(); ctx.restore();
  const mx=cx-110; vpPlant(ctx,mx,gy,1.25);
  // aardbei
  ctx.save(); ctx.strokeStyle=C.chloro; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(mx+10,gy-30); ctx.quadraticCurveTo(mx+40,gy-30,mx+46,gy-6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx+34,gy-12); ctx.quadraticCurveTo(mx+60,gy-14,mx+46,gy+16); ctx.quadraticCurveTo(mx+32,gy-14,mx+46,gy-12); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.3),1.5); ctx.restore();
  // uitloper: boog over de grond
  if(u>0){ const x0=mx+20, x1=cx+120; ctx.save(); ctx.strokeStyle=C.chloro; ctx.lineWidth=3.5; ctx.beginPath(); for(let k=0;k<=30*u;k++){ const v=k/30, x=lerp(x0,x1,v), y=gy-60*Math.sin(Math.PI*v); k?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); ctx.restore();
    if(p>0){ vpPlant(ctx,x1,gy,0.9*p); ctx.save(); ctx.strokeStyle=C.okerD; ctx.lineWidth=2; for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(x1,gy); ctx.lineTo(x1-12+k*8,gy+18*p+hash(k)*8); ctx.stroke(); } ctx.restore(); } }
  if(st>0){ ctx.save(); ctx.globalAlpha*=st; const sx=cx+90, sy=cy-170; ctx.fillStyle=rgba(C.teal,0.25); ctx.fillRect(sx-36,sy+10,72,70); ctx.strokeStyle=C.line; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(sx-38,sy-40); ctx.lineTo(sx-38,sy+80); ctx.lineTo(sx+38,sy+80); ctx.lineTo(sx+38,sy-40); ctx.stroke();
    ctx.strokeStyle=C.chloro; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(sx,sy+50); ctx.lineTo(sx,sy-70); ctx.stroke(); vpBlad(ctx,sx,sy-50,-0.7,0.8); vpBlad(ctx,sx,sy-66,0.6,0.8);
    ctx.strokeStyle=C.okerD; ctx.lineWidth=1.8; for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(sx,sy+50); ctx.lineTo(sx-14+k*9,sy+50+22*st); ctx.stroke(); }
    metaText(ctx,'stek',sx-60,sy+30,C.grain,'right',18); ctx.restore(); }
}
// bladluis (s = schaal) en jongen (j 0..1, drie stuks na elkaar)
function vpLuis(ctx,x,y,s,t){ // bladluis van boven (C10.6): kop, borststuk, achterlijf; zes poten aan het borststuk; sprieten; twee buisjes (siphunculi) achterop
  ctx.save(); ctx.translate(x,y); ctx.lineCap='round'; const g=C.groen, d=_mixHex(C.groen,'#000000',0.35), l=lighten(C.groen,0.3);
  ctx.strokeStyle=d; ctx.lineWidth=2*s;
  for(const k of [-1,0,1]) for(const z of [-1,1]){ const bx=14*s+k*7*s, by=z*7*s; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx+k*9*s+z*0*s,by+z*16*s); ctx.lineTo(bx+k*15*s-4*s,by+z*26*s); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(30*s,-3*s); ctx.quadraticCurveTo(48*s,-22*s,70*s,-24*s+Math.sin(t*2)*2*s); ctx.moveTo(30*s,3*s); ctx.quadraticCurveTo(48*s,22*s,70*s,24*s); ctx.lineWidth=1.4*s; ctx.stroke();
  ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(-26*s,-8*s); ctx.lineTo(-38*s,-14*s); ctx.moveTo(-26*s,8*s); ctx.lineTo(-38*s,14*s); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-14*s,0,22*s,16*s,0,0,6.2832); shape(ctx,g,l,1.2);
  ctx.beginPath(); ctx.ellipse(14*s,0,10*s,9*s,0,0,6.2832); shape(ctx,_mixHex(C.groen,'#FFFFFF',0.1),l,1.2);
  ctx.beginPath(); ctx.ellipse(29*s,0,6*s,6*s,0,0,6.2832); shape(ctx,lighten(C.groen,0.15),l,1.2);
  dot0(ctx,31*s,-4*s,1.6*s,'#7A2A2A'); dot0(ctx,31*s,4*s,1.6*s,'#7A2A2A'); ctx.restore(); }
function vpBladluis(ctx,cx,cy,j,t){ vpLuis(ctx,cx+40,cy-60,1.7,t);
  [[cx-110,cy+90],[cx-10,cy+130],[cx+100,cy+100]].forEach(([x,y],i)=>{ const a=clamp(j*3-i,0,1); if(a>0){ ctx.save(); ctx.globalAlpha*=a; vpLuis(ctx,x,y,0.55+0.25*a,t+i); ctx.restore(); } });
}

let BODY={cx:0,yb:0,h:1}; // voor lib_anatomie
// kijkje in de buik van een castpersonage: voortplantingsorganen uit lib_anatomie op de juiste plek (22 okt 2026)
function kijkjeRepro(ctx,id,x,y,h,a){ if(a<=0.01) return; const P=CAST[id]; const H=h*(P.lengte||1), hh=H/(P.kop||6.1), top=y-H;
  const man=id==='rachid'; const wy=top+hh*(man?3.62:3.2), wx=hh*(man?0.8:0.85), wyR=hh*(man?0.6:0.7);
  ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,wy,wx,wyR,0,0,6.283); ctx.fillStyle=rgba(C.bgMicro,0.88); ctx.fill(); ctx.strokeStyle=rgba(C.goud,0.85); ctx.lineWidth=3; ctx.stroke(); ctx.clip();
  const HA=hh*(man?3.2:2.4); BODY={cx:x, yb:0, h:HA*AN_H}; BODY.yb=(man? wy-0.08*hh-4.1*HA : wy-3.66*HA)+BODY.h;
  if(man) testes(1,1); else anRepro(1,1);
  ctx.restore(); return {x,y:wy,rx:wx}; }


// ===== cell-cycle ring (H2) =====
// ---- helpers extra uitdaging ----
// groot chromosoom in het equatorvlak; armen boven/onder, kinetochoren links en rechts van het centromeer
function bigChrom(ctx,cx,cy,{sep=0,kin=1,coh=0,cut=0,len=320,w=34,color=C.moeder}={}){
  const l0=w*0.55, off=l0+sep*14;
  chromatid(ctx,cx-off,cy,len,color,{w,lean:-l0+sep*14,bend:-off*0.1});
  chromatid(ctx,cx+off,cy,len,color,{w,lean:l0-sep*14,bend:off*0.1});
  // centromeer: verbinding tussen de zusterchromatiden (onder spanning uitgerekt)
  ctx.save(); ctx.fillStyle='#2A2140'; roundRect(ctx,cx-off,cy-7+sep*2,off*2,14-sep*4,5); ctx.fill(); ctx.restore();
  // cohesine-ringen langs de armen
  if(coh>0.01){ ctx.save(); ctx.globalAlpha*=coh*(1-0.85*cut); const top=-len*0.38, bot=len*0.62; for(const f of [0.2,0.64,0.85]){ const y=cy+top+(bot-top)*f; ctx.strokeStyle=C.oker; ctx.lineWidth=4; ctx.beginPath(); const a0=cut*0.9; ctx.ellipse(cx,y,l0+w*0.6,11,0,a0,6.2832-a0); ctx.stroke(); } ctx.restore(); }
  const kL=[cx-off-w*0.5-10,cy], kR=[cx+off+w*0.5+10,cy];
  if(kin>0.01){ ctx.save(); ctx.globalAlpha*=kin; roundRect(ctx,kL[0]-4,cy-28,12,56,5); shape(ctx,C.goud,null); roundRect(ctx,kR[0]-8,cy-28,12,56,5); shape(ctx,C.goud,null); ctx.restore(); }
  return {kL,kR,off:l0+w*0.6};
}
// bundel trekdraden van een pool naar een kinetochoor; att = 0..1 deel van de lengte vanaf de pool
function fibres(ctx,pole,k,att,{n=5,spread=10,curve=0,color=C.spoel,lw=2.2}={}){
  if(att<=0.01) return; ctx.save(); ctx.strokeStyle=color===C.spoel?rgba(C.spoel,0.9):color; ctx.lineWidth=lw; ctx.lineCap='round';
  for(let i=0;i<n;i++){ const dy=(i-(n-1)/2)*spread; const ex=k[0], ey=k[1]+dy;
    const mx=(pole[0]+ex)/2, my=(pole[1]+ey)/2+curve; const N=24; ctx.beginPath(); ctx.moveTo(pole[0],pole[1]);
    for(let s=1;s<=N;s++){ const u=s/N*att; const x=(1-u)*(1-u)*pole[0]+2*u*(1-u)*(curve?ex+140:mx)+u*u*ex; const y=(1-u)*(1-u)*pole[1]+2*u*(1-u)*(curve?my:my)+u*u*ey; ctx.lineTo(x,y); }
    ctx.stroke(); }
  ctx.restore(); }
function cycleRing(ctx,t,q,{phase}){
  const cx=620, cy=480, R=270, th=70; const A0=-Math.PI/2; const ang=(f)=>A0+f*6.2832;
  const segs=[['interfase',0,0.92,C.teal],['mitose',0.92,0.96,C.goud],['cytokinese',0.96,1,C.groen]];
  const show=(cue)=> phase==='intro'? ramp(t,q.at(cue),0.5) : 1;
  const ringA=phase==='intro'? 0.5+0.5*ramp(t,q.at('celcyclus'),0.6):1;
  ctx.save(); ctx.globalAlpha=ringA; ctx.lineWidth=th; ctx.strokeStyle=rgba(C.line,0.25); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.2832); ctx.stroke(); ctx.restore();
  const cues={interfase:'interfase',mitose:'mitose',cytokinese:'cytokinese'};
  segs.forEach(([n,f0,f1,col])=>{ const a=show(cues[n]); if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.lineWidth=th; ctx.strokeStyle=rgba(col,0.75); ctx.beginPath(); ctx.arc(cx,cy,R,ang(f0)+0.01,ang(f1)-0.01); ctx.stroke();
    const fm=(f0+f1)/2, lx=cx+Math.cos(ang(fm))*(R+th/2+40), ly=cy+Math.sin(ang(fm))*(R+th/2+40); if(n==='interfase') text(ctx,'interfase',cx,cy-10,fTekst(44,600),C.text,'center'); else if(n==='cytokinese'){ const p=[cx+Math.cos(ang(fm))*(R+th/2),cy+Math.sin(ang(fm))*(R+th/2)]; text(ctx,n,p[0]+4,p[1]-24,fTekst(30,600),C.text,'center'); } else { const p=[cx+Math.cos(ang(fm))*(R-th/2-58),cy+Math.sin(ang(fm))*(R-th/2-58)]; text(ctx,n,p[0],p[1],fTekst(30,600),C.text,'center'); } ctx.restore(); });   // v2.2.1 (nacontrole 29 okt): cytokinese boven zijn stukje, mitose binnen de ring onder zijn stukje (lagen over elkaar)
  if(phase==='g1sg2'||phase==='check'){ const subs=[['G1',0,0.4,'G1'],['S',0.4,0.7,'S-fase'],['G2',0.7,0.92,'G2']];
    subs.forEach(([n,f0,f1,cue])=>{ const a=phase==='g1sg2'?ramp(t,q.at(cue),0.4):1; if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=C.bgSchema; ctx.lineWidth=6; for(const f of [f0,f1]){ ctx.beginPath(); ctx.moveTo(cx+Math.cos(ang(f))*(R-th/2),cy+Math.sin(ang(f))*(R-th/2)); ctx.lineTo(cx+Math.cos(ang(f))*(R+th/2),cy+Math.sin(ang(f))*(R+th/2)); ctx.stroke(); }
      const fm=(f0+f1)/2; text(ctx,n,cx+Math.cos(ang(fm))*R,cy+Math.sin(ang(fm))*R+12,fTekst(34,700),C.text,'center'); ctx.restore(); });
    const desc=[['G1: de cel groeit','G1'],['S: het DNA wordt gekopieerd','S-fase'],['G2: klaarmaken voor de deling','G2']];
    if(phase==='g1sg2') desc.forEach((d,i)=>{ const a=ramp(t,q.at(d[1]),0.4); if(a>0){ ctx.save(); ctx.globalAlpha=a; text(ctx,d[0],1060,330+i*110,fTekst(36,600),C.text,'left'); ctx.restore(); } }); }
  if(phase==='check'){ const lights=[[0.4,'groot'],[0.92,'gekopieerd']]; lights.forEach(([f,cue],i)=>{ const a=ramp(t,q.at(cue),0.4); const x=cx+Math.cos(ang(f))*(R+th/2+40), y=cy+Math.sin(ang(f))*(R+th/2+40); ctx.save(); ctx.globalAlpha=Math.max(0.25,a); roundRect(ctx,x-22,y-40,44,80,12); shape(ctx,rgba(C.bgSchema,0.95),C.line,1.2); dot0(ctx,x,y-17,12,a>0.5?C.groen:rgba(C.groen,0.3)); dot0(ctx,x,y+17,12,a>0.5?rgba(C.koraal,0.3):C.koraal); ctx.restore(); });
    const q1=[['is de cel groot genoeg?','groot'],['is het DNA goed gekopieerd?','gekopieerd'],['pas dan gaat hij verder','verder']]; q1.forEach((d,i)=>{ const a=ramp(t,q.at(d[1]),0.4); if(a>0){ ctx.save(); ctx.globalAlpha=a; text(ctx,d[0],1060,330+i*100,fTekst(34,600),C.text,'left'); ctx.restore(); } });
    pill(ctx,1350,700,'controlepunten',C.paars,ramp(t,q.at('controlepunten'),0.4),30); }
  // rotating marker
  if(phase==='intro'||phase==='copy'){ const f=(t*0.06)%1; dot0(ctx,cx+Math.cos(ang(f))*R,cy+Math.sin(ang(f))*R,12,C.text); }
  if(phase==='intro'){
    const rp=ramp(t,q.at('rustfase'),0.5); if(rp>0){ ctx.save(); ctx.globalAlpha=rp*(1-ramp(t,q.at('Daarna'),0.4)); text(ctx,'"rustfase"',1260,300,fTekst(40,600),C.text2,'center'); crossOut(ctx,1260,290,80,1); text(ctx,'de cel groeit, maakt eiwitten en organellen',1260,420,fTekst(30,600),C.text,'center'); ctx.restore(); }
    const kd=ramp(t,q.at('kerndeling'),0.4); if(kd>0){ ctx.save(); ctx.globalAlpha=kd*(1-ramp(t,q.at('Bij'),0.4)); text(ctx,'mitose = kerndeling',1060,320,fTekst(36,600),C.goud,'left'); text(ctx,'mitose + cytokinese = celdeling',1060,400,fTekst(36,600),C.groen,'left'); ctx.restore(); }
    const dg=ramp(t,q.at('dag'),0.4); if(dg>0){ ctx.save(); ctx.globalAlpha=dg*(1-ramp(t,q.at('zenuwcellen'),0.4)); text(ctx,'rondje: ± 1 dag',1060,320,fTekst(36,600),C.text,'left'); ctx.globalAlpha=ramp(t,q.at('uur'),0.4)*(1-ramp(t,q.at('zenuwcellen'),0.4)); text(ctx,'mitose: ± 1 uur',1060,400,fTekst(36,600),C.goud,'left'); ctx.restore(); }
    const zc=ramp(t,q.at('zenuwcellen'),0.5); if(zc>0){ ctx.save(); ctx.globalAlpha=zc*(1-ramp(t,q.at('twee'),0.4)); const x=cx+Math.cos(ang(0.2))*(R+th/2), y=cy+Math.sin(ang(0.2))*(R+th/2); arrow(ctx,x,y,x+260,y-60,C.text2,4,18); text(ctx,'zenuwcellen: stoppen met delen',x+280,y-50,fTekst(32,600),C.text2,'left'); ctx.restore(); }
    const qq=ramp(t,q.at('Wanneer'),0.5); if(qq>0){ ctx.save(); ctx.globalAlpha=qq; text(ctx,'DNA kopiëren: wanneer?',1060,400,fTekst(40,600),C.goud,'left'); ctx.restore(); }
    const al=ramp(t,q.at('allebei'),0.4); if(al>0){ ctx.save(); ctx.globalAlpha=al*(1-qq); text(ctx,'beide nieuwe cellen krijgen al het DNA',1060,320,fTekst(32,600),C.text,'left'); ctx.restore(); } }
  if(phase==='copy'){ const a=ramp(t,0.1,0.5); ctx.save(); ctx.globalAlpha=a; ctx.lineWidth=6; ctx.strokeStyle=C.goud; ctx.beginPath(); ctx.arc(cx,cy,R+th/2+12,ang(0)+0.01,ang(0.88)-0.01); ctx.stroke(); ctx.restore(); text(ctx,'in de interfase: DNA kopiëren',1500,300,fTekst(36,600),C.goud,'center'); }
}

// ===== three metaphases side by side (H6) =====
function comparePanels(ctx,t,reveal,alpha=1,labelsA=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha=alpha;
  const P=[['mitose',0],['meiose I',1],['meiose II',2]];
  P.forEach(([n,k],i)=>{ const x=110+i*580, y=170, w=540, h=600, cx=x+w/2, cy=y+300; roundRect(ctx,x,y,w,h,16); shape(ctx,rgba(C.fill,0.5),C.line,1); text(ctx,n,cx,y+60,fTekst(40,600),C.text,'center');
    cellBody(ctx,cx,cy,220,200); ctx.save(); ctx.setLineDash([8,8]); ctx.strokeStyle=rgba(C.goud,0.6); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy-180); ctx.lineTo(cx,cy+180); ctx.stroke(); ctx.restore();
    if(reveal<0.5){ text(ctx,'?',cx,cy+30,fTitel(100),C.goud,'center'); }
    else { ctx.save(); ctx.globalAlpha*=ramp(t,0.2,0.5);
      if(k===0) MODEL.forEach((m,j)=>chromX(ctx,cx,cy-120+j*80,m.len*0.55,m.color,{w:12}));
      if(k===1) MODEL.forEach((m)=>chromX(ctx,cx+(m.color===C.vader?-24:24),cy+(m.pair?60:-60),m.len*0.55,m.color,{w:12}));
      if(k===2) ['Av','Bm'].forEach((id,j)=>{ const m=MODEL.find(z=>z.id===id); chromX(ctx,cx,cy-50+j*100,m.len*0.55,m.color,{w:12}); });
      metaText(ctx,k===1?'paren in het equatorvlak':'losse chromosomen',cx,y+h-40,k===1?C.goud:C.grain,'center',20); ctx.restore(); } });
  ctx.restore(); }
