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
function vpKnop(ctx,cx,cy,g,h,t){
  const gx=cx-60, gy=cy-150; ctx.beginPath(); ctx.ellipse(gx,gy,62,48,0,0,6.2832); shape(ctx,rgba(C.goud,0.22),C.goud,2.5); dot0(ctx,gx-8,gy,11,rgba(C.kern,0.95));
  if(g>0){ const r=34*g; ctx.beginPath(); ctx.ellipse(gx+58+r*0.7,gy-26-r*0.3,r,r*0.85,0,0,6.2832); shape(ctx,rgba(C.goud,0.22),C.goud,2.5); if(g>0.6) dot0(ctx,gx+58+r*0.7,gy-26-r*0.3,7,rgba(C.kern,0.95)); }
  metaText(ctx,'gist',gx,gy+82,C.grain,'center',20);
  // poliep: steel van voet (onder) naar mond (boven) met tentakels
  const px=cx+10, top=cy+30, base=cy+200, col=rgba(C.goud,0.30);
  ctx.beginPath(); ctx.moveTo(px-26,top); ctx.quadraticCurveTo(px-34,(top+base)/2,px-16,base); ctx.lineTo(px+16,base); ctx.quadraticCurveTo(px+34,(top+base)/2,px+26,top); ctx.closePath(); shape(ctx,col,C.goud,2.5);
  const tent=(x,y,n,len,sc)=>{ ctx.save(); ctx.strokeStyle=C.goud; ctx.lineWidth=4*sc; ctx.lineCap='round'; for(let k=0;k<n;k++){ const a=-Math.PI/2+(k-(n-1)/2)*0.42; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+Math.cos(a)*len*0.6+Math.sin(t*1.5+k)*8*sc,y+Math.sin(a)*len*0.6,x+Math.cos(a)*len,y+Math.sin(a)*len+Math.sin(t*1.2+k)*6*sc); ctx.stroke(); } ctx.restore(); };
  tent(px,top,5,90,1);
  if(h>0){ const sx=px+24, sy=cy+130, L=70*h, an=-0.75, bx=sx+Math.cos(an)*L, by=sy+Math.sin(an)*L; ctx.save(); ctx.translate(sx,sy); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0,-14*h-3); ctx.lineTo(L,-10*h-2); ctx.lineTo(L,10*h+2); ctx.lineTo(0,14*h+3); ctx.closePath(); shape(ctx,col,C.goud,2.5); ctx.restore(); if(h>0.4){ ctx.save(); ctx.translate(bx,by); ctx.rotate(an+Math.PI/2); tent(0,0,4,40*h,0.6); ctx.restore(); } }
  metaText(ctx,'zoetwaterpoliep',px,base+34,C.grain,'center',18);
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
function vpLuis(ctx,x,y,s,t){ ctx.save(); ctx.translate(x,y); ctx.strokeStyle=C.groen; ctx.lineWidth=2.2*s; ctx.lineCap='round';
  for(const k of [-1,0,1]) for(const d of [-1,1]){ ctx.beginPath(); ctx.moveTo(k*14*s,0); ctx.lineTo(k*20*s+d*4*s,d*30*s); ctx.lineTo(k*24*s+d*2*s,d*44*s); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(34*s,-4*s); ctx.quadraticCurveTo(60*s,-30*s,78*s,-26*s+Math.sin(t*2)*3*s); ctx.moveTo(34*s,4*s); ctx.quadraticCurveTo(60*s,30*s,78*s,26*s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-26*s,-12*s); ctx.lineTo(-40*s,-22*s); ctx.moveTo(-26*s,12*s); ctx.lineTo(-40*s,22*s); ctx.lineWidth=4*s; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-4*s,0,36*s,24*s,0,0,6.2832); shape(ctx,C.groen,lighten(C.groen,0.35),1.5); ctx.beginPath(); ctx.ellipse(34*s,0,11*s,10*s,0,0,6.2832); shape(ctx,lighten(C.groen,0.15),lighten(C.groen,0.35),1.2); dot0(ctx,40*s,-4*s,2.5*s,C.bgSchema); ctx.restore(); }
function vpBladluis(ctx,cx,cy,j,t){ vpLuis(ctx,cx+40,cy-60,1.7,t);
  [[cx-110,cy+90],[cx-10,cy+130],[cx+100,cy+100]].forEach(([x,y],i)=>{ const a=clamp(j*3-i,0,1); if(a>0){ ctx.save(); ctx.globalAlpha*=a; vpLuis(ctx,x,y,0.55+0.25*a,t+i); ctx.restore(); } });
}

const SCENES = {
// ---------- Cold open ----------
s01(ctx,t,q){
  bg(ctx,'schema');
  const human1=ramp(t,q.at('zevenendertig'),0.8);
  const g=clamp((t-q.at('Nu'))/2.2,0,1)*6; // one cell until 'Nu besta', then 1 -> 64
  cellSwarm(ctx,600,470,g,180,1-human1);
  if(t<q.at('bevruchte')+2) pill(ctx,600,820,'een bevruchte eicel',C.grain,fadeIO(t,q.at('bevruchte'),q.at('Nu'),0.4),26);
  if(human1>0){ ctx.save(); ctx.globalAlpha=human1; human(ctx,600,830,600,1,C.mens); ctx.restore(); pill(ctx,600,170,'± 37 biljoen cellen',C.goud,human1*(1-ramp(t,q.at('Elke',2),0.4)),32); }
  // zoom into one cell: nucleus with a long thread of DNA
  const z=ramp(t,q.at('bijna'),0.7);
  zoomCircle(ctx,1360,440,300,640,520,'één cel, één kern',z,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1060,140,600,600); ctx.save(); ctx.globalAlpha=0.6; grain(ctx); ctx.restore();
    nucMembrane(ctx,1360,440,190,1);
    const dl=ramp(t,q.at('draad'),1.2); for(let i=0;i<8;i++) chromatin(ctx,1260+hash(i)*180,350+hash(i+9)*170,220,i%2?C.vader:C.moeder,i+20,t,0.5+0.5*dl,2.5); });
  if(z>0){ pill(ctx,1360,845,'2 meter DNA in een kern van een paar µm',C.paars,ramp(t,q.at('meter'),0.5)*(1-ramp(t,q.at('Elke',2),0.5)),26); }
  // dividing with a question: how to share it fairly?
  const dv=ramp(t,q.at('Elke',2),0.6); if(dv>0){ ctx.save(); ctx.globalAlpha=dv; ctx.fillStyle=C.bgSchema; ctx.fillRect(1000,120,800,760); ctx.restore();
    cellBody(ctx,1360,470,330,230,ramp(t,q.at('Elke',2)+0.3,1.6),dv); for(const s of [-1,1]){ ctx.save(); ctx.globalAlpha=dv; text(ctx,'?',1360+s*150,500,fTitel(90),C.goud,'center'); ctx.restore(); }
    pill(ctx,1360,800,'geen stukje te veel, geen stukje te weinig',C.goud,ramp(t,q.at('Geen'),0.4),26); }
},
// ---------- H1 Waarom delen? ----------
s04(ctx,t,q){
  bg(ctx,'schema');
  const P=[[110,'groeien','groeien'],[700,'herstellen','herstellen'],[1290,'vervangen','vervangen']];
  pill(ctx,960,150,'eerst kopiëren, dan verdelen',C.goud,fadeIO(t,0,q.at('waarom'),0.4),32);
  P.forEach((p,i)=>{ const a=ramp(t,q.at(p[2]),0.5); if(a<=0) return; const x=p[0], y=240, w=520, h=560; ctx.save(); ctx.globalAlpha=a; roundRect(ctx,x,y,w,h,16); shape(ctx,rgba(C.fill,0.55),C.line,1); text(ctx,p[1],x+w/2,y+60,fTekst(40,600),C.text,'center');
    const tt=t-q.at(p[2]);
    if(i===0){ cellSwarm(ctx,x+w/2,y+300,clamp(tt/3,0,1)*5,150,1); metaText(ctx,'van één cel naar een mens',x+w/2,y+h-30,C.grain,'center',20); }
    if(i===1){ // skin layer with a wound closing
      const close=clamp(tt/3.5,0,1); for(let k=0;k<9;k++){ const cx=x+40+k*52; const inGap=k>=3&&k<=5; if(inGap && (k-3)/3>=close) continue; roundRect(ctx,cx,y+270,46,56,10); shape(ctx,inGap?rgba(C.groen,0.35):rgba(C.koraal,0.25),inGap?C.groen:C.koraal,1.5); }
      for(let k=0;k<9;k++){ roundRect(ctx,x+40+k*52,y+332,46,56,10); shape(ctx,rgba(C.koraal,0.18),rgba(C.koraal,0.6),1.2); }
      metaText(ctx,'cellen rond de wond delen',x+w/2,y+h-30,C.grain,'center',20); }
    if(i===2){ // intestinal villus: cells move up and are shed
      ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+170,y+480); ctx.quadraticCurveTo(x+170,y+170,x+260,y+160); ctx.quadraticCurveTo(x+350,y+170,x+350,y+480); ctx.stroke();
      for(let k=0;k<10;k++){ const u=((tt*0.12+k/10)%1); const side=k%2?1:-1; const py=lerp(y+470,y+190,u), px=x+260+side*lerp(90,70,u); dot0(ctx,px,py,11,rgba(C.koraal,0.6*(1-Math.max(0,(u-0.85)/0.15)))); }
      const bm=ramp(t,q.at('beenmerg'),0.4); ctx.save(); ctx.globalAlpha*=1-bm; metaText(ctx,'darmvlok: om de paar dagen nieuw',x+w/2,y+h-30,C.grain,'center',18); ctx.restore();
      if(bm>0){ ctx.save(); ctx.globalAlpha*=bm; ctx.fillStyle=rgba(C.bgSchema,0.92); ctx.fillRect(x+2,y+90,w-4,h-92); text(ctx,'2 miljoen',x+w/2,y+300,fTitel(60),C.bloed,'center'); metaText(ctx,'rode bloedcellen per seconde',x+w/2,y+350,C.bloedR,'center',20); metaText(ctx,'in je beenmerg',x+w/2,y+385,C.grain,'center',20); ctx.restore(); } }
    ctx.restore(); });
},
s05(ctx,t,q){
  bg(ctx,'micro');
  const bac=1-ramp(t,q.at('Waarom'),0.5);
  if(bac>0){ ctx.save(); ctx.globalAlpha=bac; const s=ramp(t,q.at('bacterie',2),1.4);
    for(const d of (s<0.05?[0]:[-1,1])){ const cx=960+d*95*s; ctx.save(); ctx.translate(cx,470); roundRect(ctx,-(130-60*s),-48,(260-120*s),96,48); shape(ctx,rgba(C.teal,0.45),lighten(C.teal,0.3),2); ctx.restore(); chromatin(ctx,cx-30,450,90,C.paars,d+7,t,1,3); }
    pill(ctx,960,780,'bacterie: één cel wordt er twee',C.teal,ramp(t,q.at('bacterie'),0.4),28); ctx.restore(); }
  const big=ramp(t,q.at('Waarom'),0.5)*(1-ramp(t,q.at('Daarom'),0.6));
  if(big>0){ ctx.save(); ctx.globalAlpha=big; const r=lerp(140,320,ramp(t,q.at('groter'),2.5));
    blob(ctx,960,480,r,r*0.95,0.03,2); shape(ctx,rgba(C.fill,0.7),C.er,3); dot0(ctx,960,480,8,C.text2);
    const ox=ramp(t,q.at('weg'),0.5); if(ox>0){ for(let k=0;k<6;k++){ const a=k/6*6.2832; const u=((t*0.25+k/6)%1); o2(ctx,960+Math.cos(a)*lerp(r+60,r*0.35,u),480+Math.sin(a)*lerp(r+60,r*0.35,u)*0.95,1,ox*(1-u*0.6)); } }
    const mid=ramp(t,q.at('midden'),0.5); if(mid>0){ ctx.save(); ctx.globalAlpha*=mid; ctx.beginPath(); ctx.arc(960,480,r*0.3,0,6.2832); ctx.fillStyle=rgba(C.koraal,0.25); ctx.fill(); ctx.restore(); naamBij(ctx,'het midden','krijgt te laat zuurstof',960,605,mid,'center',C.koraal); }
    pill(ctx,960,130,'hoe groter de cel, hoe verder de weg voor diffusie',C.teal,ramp(t,q.at('Hoe'),0.4)*(1-ramp(t,q.at('midden'),0.3)),26); ctx.restore(); }
  const two=ramp(t,q.at('Daarom'),0.6); if(two>0){ ctx.save(); ctx.globalAlpha=two; cellBody(ctx,960,480,300,210,ramp(t,q.at('Daarom')+0.6,1.4)); ctx.restore(); pill(ctx,960,800,'liever twee kleine cellen',C.groen,ramp(t,q.at('liever'),0.4),28); }
  scaleBar(ctx);
},
// ---------- H2 Celcyclus ----------
s06(ctx,t,q){
  bg(ctx,'schema'); cycleRing(ctx,t,q,{phase:'intro'});
},
s08(ctx,t,q){
  bg(ctx,'schema'); cycleRing(ctx,t,q,{phase:'copy'});
  const a=ramp(t,q.at('dubbel'),0.5); if(a>0){ ctx.save(); ctx.globalAlpha=a; for(const [x,dup] of [[1380,false],[1620,true]]){ if(dup) chromX(ctx,x,480,120,C.paars,{w:16}); else { chromatid(ctx,x,480,120,C.paars,{w:16}); dot0(ctx,x,480,6,'#2A2140'); } } arrow(ctx,1440,480,1550,480,C.goud,4,16); metaText(ctx,'na het kopiëren: dubbel',1500,620,C.grain,'center',22); ctx.restore(); }
  pill(ctx,1500,760,'zie de film DNA kopiëren',C.paars,ramp(t,q.at('film'),0.4),26);
},
s09(ctx,t,q){ bg(ctx,'schema'); cycleRing(ctx,t,q,{phase:'g1sg2'}); },
s10(ctx,t,q){ bg(ctx,'schema'); cycleRing(ctx,t,q,{phase:'check'}); },
// ---------- H3 Chromosomen tellen ----------
s11(ctx,t,q){
  micro(ctx);
  const kar=ramp(t,q.at('zesenveertig'),0.8);
  const nA=1-kar;
  if(nA>0){ ctx.save(); ctx.globalAlpha=nA; nucMembrane(ctx,960,470,330,1); ctx.beginPath(); ctx.ellipse(960,470,320,288,0,0,6.2832); ctx.clip();
    const hl=ramp(t,q.at('draad'),0.5);
    for(let i=0;i<12;i++){ const col=i%2?C.vader:C.moeder; ctx.save(); if(hl>0&&i!==3) ctx.globalAlpha*=1-0.65*hl; chromatin(ctx,760+hash(i*3)*380,330+hash(i*3+1)*260,360,col,i+40,t,1,i===3?3+3*hl:3); ctx.restore(); }
    ctx.restore();
    label(ctx,'chromatine','DNA los in de kern',1200,330,1500,200,fadeIO(t,q.at('chromatine'),q.at('draad'),0.4)*nA);
    label(ctx,'één draad = één chromosoom','',1000,470,1300,700,hl*nA); }
  if(kar>0){ karyo(ctx,280,220,1360,420,{alpha:kar,hl:ramp(t,q.at('homologe'),0.4)>0?[2]:null,sex:'XX'});
    pill(ctx,960,150,'46 chromosomen = 23 paren',C.goud,kar*(1-ramp(t,q.at('moeder'),0.4)),32);
    const mv=ramp(t,q.at('moeder'),0.4); if(mv>0){ ctx.save(); ctx.globalAlpha=mv*(1-ramp(t,q.at('homologe'),0.4)); dot0(ctx,720,150,12,C.moeder); text(ctx,'van je moeder',744,160,fTekst(30,600),C.text,'left'); dot0(ctx,1040,150,12,C.vader); text(ctx,'van je vader',1064,160,fTekst(30,600),C.text,'left'); ctx.restore(); }
    const ho=ramp(t,q.at('homologe'),0.4); if(ho>0){ pill(ctx,960,150,'homologe chromosomen: een paar met dezelfde soort genen',C.goud,ho,28); } }
  scaleBar(ctx);
},
s12(ctx,t,q){
  micro(ctx); const xy=ramp(t,q.at('XY'),0.6);
  karyo(ctx,280,220,1360,420,{alpha:1,hl:ramp(t,q.at('geslachtschromosomen'),0.4)>0?[22]:null,sex:xy>0.5?'XY':'XX'});
  pill(ctx,960,150,'22 paren gewone chromosomen',C.grain,fadeIO(t,0,q.at('drieëntwintigste'),0.4),28);
  const g=ramp(t,q.at('geslachtschromosomen'),0.5); if(g>0){ ctx.save(); ctx.globalAlpha=g; const x0=1180,y0=760;
    text(ctx,'vrouw: XX',x0-380,y0,fTekst(34,600),xy>0.5?C.text2:C.text,'left'); text(ctx,'man: XY',x0,y0,fTekst(34,600),xy>0.5?C.text:C.text2,'left'); ctx.restore(); }
  pill(ctx,960,150,'X en Y: het enige paar dat echt verschilt',C.goud,ramp(t,q.at('verschillen'),0.4),28);
  scaleBar(ctx);
},
s13(ctx,t,q){
  micro(ctx);
  const part2=ramp(t,q.at('Let'),0.6), part3=ramp(t,q.at('Deze'),0.6);
  const p1=1-part2;
  if(p1>0){ ctx.save(); ctx.globalAlpha=p1; const c=ramp(t,q.at('rolt'),2.5), dup=ramp(t,q.at('gekopieerd'),1.0);
    const x=960,y=470;
    chromatin(ctx,x-110,y-80,560,C.paars,9,t,1-c,3); chromatin(ctx,x-100,y-72,560,lighten(C.paars,0.25),9,t,1-c,3);
    if(c>0) chromX(ctx,x,y,260*(0.6+0.4*c),C.paars,{w:30,gap:0.7+0.3*dup,alpha:c});
    label(ctx,'chromatide','',x-24,y-90,600,230,ramp(t,q.at('chromatiden'),0.5),C.text,'right'); label(ctx,'chromatide','',x+24,y-90,1320,230,ramp(t,q.at('chromatiden'),0.5),C.text,'left');
    label(ctx,'centromeer','',x,y,1320,640,ramp(t,q.at('centromeer'),0.5),C.text,'left');
    pill(ctx,960,800,'twee gelijke kopieën van hetzelfde DNA',C.goud,fadeIO(t,q.at('kopieën'),q.at('vorm'),0.4),28);
    pill(ctx,960,800,'X-vorm: één chromosoom met twee chromatiden',C.goud,ramp(t,q.at('vorm'),0.4),28);
    metaText(ctx,'onder de microscoop zichtbaar',960,150,C.grain,'center',24*1); ctx.restore(); }
  if(part2>0 && part3<1){ ctx.save(); ctx.globalAlpha=part2*(1-part3);
    pill(ctx,960,150,'twee soorten twee',C.goud,1,34);
    const pa=ramp(t,q.at('paar'),0.5), xa=ramp(t,q.at('X',2),0.5);
    ctx.save(); ctx.globalAlpha*=pa; roundRect(ctx,180,240,700,520,16); shape(ctx,rgba(C.fill,0.55),C.line,1); chromX(ctx,440,480,220,C.moeder,{w:24}); chromX(ctx,620,480,220,C.vader,{w:24}); text(ctx,'een paar = 2 chromosomen',530,700,fTekst(32,600),C.text,'center'); metaText(ctx,'één van moeder, één van vader',530,735,C.grain,'center',20); ctx.restore();
    ctx.save(); ctx.globalAlpha*=xa; roundRect(ctx,1040,240,700,520,16); shape(ctx,rgba(C.fill,0.55),C.line,1); chromX(ctx,1390,480,220,C.vader,{w:24}); text(ctx,'een X-vorm = 1 chromosoom',1390,700,fTekst(32,600),C.text,'center'); metaText(ctx,'met 2 gelijke chromatiden',1390,735,C.grain,'center',20); ctx.restore();
    ctx.restore(); }
  if(part3>0){ ctx.save(); ctx.globalAlpha=part3; cellBody(ctx,960,480,420,300); const pos=[[-170,-60],[-40,70],[90,-80],[190,60]]; MODEL.forEach((m,i)=>chromX(ctx,960+pos[i][0],480+pos[i][1],m.len,m.color,{w:16})); ctx.restore(); }
  scaleBar(ctx);
},
s15(ctx,t,q){
  micro(ctx); const hum=ramp(t,q.at('mens'),0.6);
  const pos=[[-170,-60],[-40,70],[90,-80],[190,60]];
  ctx.save(); ctx.globalAlpha=1-hum; cellBody(ctx,960,480,420,300); MODEL.forEach((m,i)=>chromX(ctx,960+pos[i][0],480+pos[i][1],m.len,m.color,{w:16}));
  const tc=q.at('centromeren'); pos.forEach((p,i)=>{ const a=ramp(t,tc+0.3+i*0.35,0.25); if(a>0){ ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(960+p[0],480+p[1],16,0,6.2832); ctx.stroke(); text(ctx,String(i+1),960+p[0]+26,480+p[1]-18,fTekst(34,700),C.goud,'left'); ctx.restore(); } });
  pill(ctx,960,820,'4 centromeren = 4 chromosomen (8 chromatiden)',C.goud,ramp(t,q.at('centromeren'),0.4),28); ctx.restore();
  if(hum>0){ ctx.save(); ctx.globalAlpha=hum; text(ctx,'46',720,470,fTitel(150),C.goud,'center'); metaText(ctx,'chromosomen',720,540,C.grain,'center',28); text(ctx,'92',1200,470,fTitel(150),C.paars,'center'); metaText(ctx,'chromatiden',1200,540,C.grain,'center',28); metaText(ctx,'een menselijke cel, begin van de mitose',960,700,C.text2,'center',24); ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H4 Mitose ----------
s16(ctx,t,q){
  micro(ctx);
  const st={cond:ramp(t,q.at('rollen'),2.0), sp:ramp(t,q.at('trekdraden'),1.5), nm:1-ramp(t,q.at('kernmembraan'),1.2), meta:ramp(t,q.at('trekken'),2.2)};
  mitosisCell(ctx,960,470,560,330,st,t);
  const ph=(name,cue)=>ramp(t,q.at(cue),0.4);
  const pro=ph('profase','Profase')*(1-ramp(t,q.at('Metafase'),0.3)), met=ph('metafase','Metafase');
  pill(ctx,960,100,'profase',C.goud,pro,34); pill(ctx,960,100,'metafase',C.goud,met,34);
  naamBij(ctx,'spoelfiguur','trekdraden vanuit de twee polen',960,850,ramp(t,q.at('spoelfiguur'),0.5)*(1-met),'center',C.text);
  label(ctx,'pool','',960-460,470,330,250,ramp(t,q.at('polen'),0.5)*(1-ramp(t,q.at('spoelfiguur'),0.4)));
  label(ctx,'kernmembraan','valt uit elkaar',960+190,470-180,1500,250,fadeIO(t,q.at('kernmembraan'),q.at('Metafase'),0.4));
  const eq=ramp(t,q.at('equatorvlak'),0.5); if(eq>0){ ctx.save(); ctx.globalAlpha=eq; ctx.setLineDash([10,10]); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(960,150); ctx.lineTo(960,800); ctx.stroke(); ctx.restore(); metaText(ctx,'equatorvlak',990,800,C.goud,'left',24*1); }
  pill(ctx,960,860,'aan elk centromeer trekdraden van beide polen',C.text,ramp(t,q.at('centromeer'),0.4),26);
  scaleBar(ctx);
},
// ---------- H4 Extra uitdaging (spanning, wachtsignaal, cohesine, krimpende trekdraden) ----------
e01(ctx,t,q){
  micro(ctx);
  const PL=[250,470], PR=[1670,470];
  const tTD=q.at('trekdraden'), tTg=q.at('tegen'), tH=q.at('Hangen'), tEnz=q.at('enzym'), tLos=q.at('loslaten'), tNw=q.at('nieuwe'), tL2=q.at('los',2);
  const tWs=q.at('wachtsignaal'), tAna=q.at('anafase'), tKn=q.at('knipt'), tDoor=q.at('door'), tHeet=q.at('heet'), tGif=q.at('gif');
  const close=1-ramp(t,tWs+0.6,0.6)+ramp(t,tKn-0.4,0.6);
  const over=1-close;
  if(close>0.01){ ctx.save(); ctx.globalAlpha*=clamp(close,0,1);
    let leftAtt, rightAtt, curveAtt, tens, shift=0, cut=0, ez=0, kn=0, gif=0;
    if(t<tKn){
      leftAtt=ramp(t,tTD,1.4);
      rightAtt=ramp(t,tTD+0.6,1.4)*(1-ramp(t,tH,0.6)) + 0.55*ramp(t,tNw,1.0)*(1-ramp(t,tWs,0.6));
      curveAtt=ramp(t,tH+0.3,1.0)*(1-ramp(t,tLos,1.2));
      tens=ramp(t,tTg,1.0)*(1-ramp(t,tH,0.6));
      shift=-150*ramp(t,tH+0.3,1.0);
      ez=fadeIO(t,tEnz,tNw,0.5);
    } else {
      gif=ramp(t,tGif,0.8);
      leftAtt=1-gif; rightAtt=1-gif; curveAtt=0; tens=1-gif;
      cut=ramp(t,tDoor,0.8)*(1-gif); kn=fadeIO(t,tKn,tHeet,0.4);
    }
    const cx=960+shift, cy=470;
    const poles=ramp(t,tTD-0.2,0.6);
    spindle(ctx,PL,[],poles); spindle(ctx,PR,[],poles);
    const g=bigChrom(ctx,cx,cy,{sep:clamp(tens,0,1),kin:ramp(t,q.at('eiwitplaatjes'),0.6),coh:1,cut});
    fibres(ctx,PL,g.kL,clamp(leftAtt,0,1),{});
    fibres(ctx,PR,g.kR,clamp(rightAtt,0,1),{});
    fibres(ctx,PL,g.kR,clamp(curveAtt,0,1),{curve:-230,color:C.koraal});
    const pa=fadeIO(t,tTg,tH,0.4); arrow(ctx,g.kL[0]-30,cy+150,g.kL[0]-150,cy+150,C.goud,5,18,pa); arrow(ctx,g.kR[0]+30,cy+150,g.kR[0]+150,cy+150,C.goud,5,18,pa);
    label(ctx,'kinetochoor','eiwitplaatje, één per chromatide',g.kL[0],cy-30,g.kL[0]-120,240,fadeIO(t,q.at('plaatjes',2),q.at('goed'),0.5));
    label(ctx,'kinetochoor','',g.kR[0],cy-30,g.kR[0]+120,240,fadeIO(t,q.at('plaatjes',2),q.at('goed'),0.5));
    naamBij(ctx,'centromeer onder spanning','',cx+70,cy+50,fadeIO(t,q.at('spanning')-0.4,tH,0.4),'left',C.groen);
    if(ez>0.01){ ctx.save(); ctx.globalAlpha*=ez; const pr=1+0.12*Math.sin(t*6); dot0(ctx,cx,cy,22*pr,rgba(C.paars,0.35)); dot0(ctx,cx,cy,13,C.paars); ctx.restore();
      naamBij(ctx,'enzym','maakt foute trekdraden los',cx+70,cy+70,ez,'left',C.paars); }
    // los kinetochoor knippert rood
    const lk=t<tKn?fadeIO(t,tL2-0.3,tWs+0.8,0.3):0; if(lk>0.01){ const w=(t*1.6)%1; ctx.save(); ctx.globalAlpha*=lk; ctx.strokeStyle=rgba(C.koraal,1-w); ctx.lineWidth=4; ctx.beginPath(); ctx.arc(g.kR[0],cy,20+w*80,0,6.2832); ctx.stroke(); ctx.restore(); }
    // knip-enzym (ander enzym) bij de cohesine
    if(kn>0.01){ ctx.save(); ctx.globalAlpha*=kn; for(const yy of [cy-58,cy+83,cy+150]){ const x0=cx+g.off+30; ctx.beginPath(); ctx.moveTo(x0,yy); ctx.arc(x0,yy,14,0.5,5.8); ctx.closePath(); ctx.fillStyle=C.groen; ctx.fill(); } ctx.restore();
      label(ctx,'ander enzym','knipt de ringen door',cx+g.off+44,cy+90,cx+260,cy+250,kn,C.groen,'left'); }
    pill(ctx,960,820,'spanning: goed vast',C.groen,t<tKn?fadeIO(t,tTg+0.6,tH,0.4):0,28);
    pill(ctx,960,820,'geen spanning: fout',C.koraal,t<tKn?fadeIO(t,tH+0.4,tL2-0.3,0.4):0,28);
    pill(ctx,960,820,'los kinetochoor: wachtsignaal',C.koraal,t<tKn?fadeIO(t,tL2-0.3,tWs+0.8,0.4):0,28);
    pill(ctx,960,820,'cohesine: eiwitringen tussen de chromatiden',C.oker,t>=tKn?fadeIO(t,tHeet,tGif,0.4):0,28);
    label(ctx,'cohesine','eiwitring',cx+g.off+20,cy-58,cx+260,cy-220,t>=tKn?fadeIO(t,tHeet,tGif,0.5):0,C.oker,'left');
    if(gif>0.01){ ctx.save(); ctx.globalAlpha*=gif; const r=rng(5); for(let k=0;k<26;k++){ const a=r()*6.2832, d=60+r()*80; for(const P of [PL,PR]) dot0(ctx,P[0]+Math.cos(a+t*0.3)*d,P[1]+Math.sin(a+t*0.3)*d,4,C.koraal); } ctx.restore();
      pill(ctx,960,820,'gif: trekdraden kunnen niet aanhaken',C.koraal,gif,28);
      const qa=ramp(t,tGif+2.5,0.5); if(qa>0) text(ctx,'?',1250,360,fTitel(160),rgba(C.goud,qa),'center'); }
    ctx.restore(); }
  if(over>0.01){ ctx.save(); ctx.globalAlpha*=clamp(over,0,1);
    cellBody(ctx,960,470,620,340); const P1=[430,470],P2=[1490,470]; spindle(ctx,P1,[],1); spindle(ctx,P2,[],1);
    const ys=[250,390,550,690]; const late=2; const fix=ramp(t,tAna-0.6,1.0);
    MODEL.forEach((m,i)=>{ const y=ys[i], x=960; const ok=i!==late||fix>0.5;
      chromX(ctx,x,y,m.len*0.62,m.color,{w:11,gap:ok?1.15:1});
      const kl=[x-16,y], kr=[x+16,y];
      fibres(ctx,P1,kl,1,{n:3,spread:5,lw:1.6});
      fibres(ctx,P2,kr,i===late?fix:1,{n:3,spread:5,lw:1.6});
      const lx=x+120, ly=y-26; const red=i===late && fix<0.5;
      if(red){ const w=(t*1.6)%1; ctx.save(); ctx.strokeStyle=rgba(C.koraal,1-w); ctx.lineWidth=3; ctx.beginPath(); ctx.arc(kr[0],kr[1],14+w*60,0,6.2832); ctx.stroke(); ctx.restore(); }
      dot0(ctx,lx,ly,13,red?C.koraal:C.groen); });
    label(ctx,'los kinetochoor','geeft een wachtsignaal',976,ys[late],1180,800,fadeIO(t,tWs+0.8,tAna-0.6,0.4),C.koraal,'left');
    pill(ctx,960,110,'de cel wacht',C.koraal,fadeIO(t,q.at('wacht',2),tAna-0.4,0.4),30);
    pill(ctx,960,110,'alles vast en onder spanning → anafase',C.groen,ramp(t,tAna+0.4,0.5),30);
    ctx.restore(); }
  scaleBar(ctx);
},
e03(ctx,t,q){
  micro(ctx);
  const tTr=q.at('trekken'), tKo=q.at('korter'), tAf=q.at('afgebroken'), tHo=q.at('houdt'), tMe=q.at('meegetrokken'), tTe=q.at('Terug');
  const close=1-ramp(t,tTr,0.7);
  if(close>0.01){ ctx.save(); ctx.globalAlpha*=close;
    cellBody(ctx,960,470,620,340); const P1=[430,470],P2=[1490,470]; spindle(ctx,P1,[],1); spindle(ctx,P2,[],1);
    const sc=[[-90,-170],[110,-60],[-60,90],[80,200]];
    MODEL.forEach((m,i)=>{ const x=960+sc[i][0], y=470+sc[i][1]; chromX(ctx,x,y,m.len*0.62,m.color,{w:11});
      const w=((t*1.4)+i*0.25)%1; ctx.save(); ctx.strokeStyle=rgba(C.koraal,1-w); ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y,14+w*50,0,6.2832); ctx.stroke(); ctx.restore();
      dot0(ctx,x+70,y-26,12,C.koraal); });
    pill(ctx,960,110,'de cel blijft wachten',C.koraal,1,30);
    pill(ctx,960,830,'middelen tegen kanker: de deling stopt',C.paars,ramp(t,q.at('kanker'),0.5),28);
    ctx.restore(); }
  const ana=ramp(t,tTr,0.7);
  if(ana>0.01){ ctx.save(); ctx.globalAlpha*=ana*(1-ramp(t,tTe+0.2,0.6));
    const P=[220,470]; spindle(ctx,P,[],1); metaText(ctx,'pool',220,560,C.grain,'center',24);
    const x0=1180, x1=560, T0=tKo, T1=tTe; const u=clamp((t-T0)/(T1-T0),0,1); const xk=x0+(x1-x0)*u;
    chromatid(ctx,xk+30,470,300,C.moeder,{w:30,lean:120,bend:30});
    roundRect(ctx,xk+2,470-30,12,60,5); shape(ctx,C.goud,null);
    const B=24; const ys=[452,470,488];
    ys.forEach((y,j)=>{ const n=Math.floor((xk-P[0]-10)/B); for(let i=0;i<n;i++){ const bx=P[0]+12+i*B; roundRect(ctx,bx,y-6,B-4,12,4); shape(ctx,rgba(C.spoel,0.9),null); }
      const nMax=Math.floor((x0-P[0]-10)/B); for(let i=n;i<nMax;i++){ const xr=P[0]+10+(i+1)*B; const ur=(xr-x0)/(x1-x0); const tr=T0+ur*(T1-T0); const age=t-tr; if(age<0||age>1.6) continue;
        const r=rng(i*7+j*101); const dx=(r()-0.3)*60*age, dy=(r()-0.5)*90*age; dot0(ctx,P[0]+12+i*B+dx+8,y+dy,5,rgba(C.spoel,0.8*(1-age/1.6))); } });
    const goldEnd=fadeIO(t,tAf-0.6,tHo+1.0,0.4); if(goldEnd>0){ ctx.save(); ctx.globalAlpha*=goldEnd; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(xk-12,470,44,0,6.2832); ctx.stroke(); ctx.restore(); }
    label(ctx,'trekdraad','rijtje eiwitblokjes',600,452,600,250,fadeIO(t,tTr+0.4,tAf-0.6,0.4)*(xk>700?1:0));
    naamBij(ctx,'afbreken','vooral bij het kinetochoor',xk-60,600,fadeIO(t,tAf-0.6,tHo,0.4),'right',C.goud);
    naamBij(ctx,'kinetochoor','houdt het uiteinde vast',xk-20,440,fadeIO(t,tHo,tTe,0.4),'right',C.goud);
    arrow(ctx,xk+200,640,xk+40,640,C.goud,5,18,fadeIO(t,tMe,tTe+0.6,0.4));
    pill(ctx,960,110,'draad wordt korter → chromatide gaat mee naar de pool',C.text,fadeIO(t,tKo,tTe,0.5),28);
    ctx.restore(); }
  pill(ctx,960,470,'terug naar de hoofdlijn',C.goud,ramp(t,tTe+0.4,0.5),34);
  scaleBar(ctx);
},
s17(ctx,t,q){
  micro(ctx);
  const plant=ramp(t,q.at('plantencel'),0.6);
  const st={cond:1,sp:1,nm:0,meta:1,ana:ramp(t,q.at('trekken'),2.5),telo:ramp(t,q.at('kernmembraan'),2.0),cyto:ramp(t,q.at('snoert'),2.5)};
  ctx.save(); ctx.globalAlpha=1-0.85*plant; mitosisCell(ctx,960,470,560,330,st,t); ctx.restore();
  pill(ctx,960,100,'anafase',C.goud,fadeIO(t,0,q.at('Telofase'),0.3),34);
  pill(ctx,960,100,'telofase',C.goud,fadeIO(t,q.at('Telofase'),q.at('Ondertussen'),0.3),34);
  pill(ctx,960,100,'cytokinese',C.goud,fadeIO(t,q.at('Ondertussen'),q.at('plantencel'),0.3),34);
  pill(ctx,960,860,'centromeren splitsen',C.text,fadeIO(t,q.at('splitsen'),q.at('chromatide'),0.4),26);
  pill(ctx,960,860,'elke chromatide heet nu een chromosoom',C.text,fadeIO(t,q.at('chromatide')+0.4,q.at('Even'),0.4),26);
  pill(ctx,960,860,'even 92 chromosomen in één cel (mens)',C.goud,fadeIO(t,q.at('Even')+0.4,q.at('Telofase'),0.4),26);
  pill(ctx,960,860,'twee dochtercellen',C.groen,fadeIO(t,q.at('dochtercellen'),q.at('plantencel'),0.4),28);
  if(plant>0){ ctx.save(); ctx.globalAlpha=plant; const x0=960,y0=470; roundRect(ctx,x0-420,y0-240,840,480,22); ctx.fillStyle=rgba(C.fill,0.8); ctx.fill(); ctx.strokeStyle=C.groen; ctx.lineWidth=14; ctx.stroke();
    for(const s of [-1,1]) nucMembrane(ctx,x0+s*220,y0,90,1);
    const cp=ramp(t,q.at('celplaat'),1.4); ctx.strokeStyle=C.groen; ctx.lineWidth=10; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x0,y0-200*cp); ctx.lineTo(x0,y0+200*cp); ctx.stroke();
    for(let k=0;k<8;k++){ const yy=y0-180+k*52; if(Math.abs(yy-y0)<200*cp) continue; dot0(ctx,x0+(hash(k)*2-1)*14,yy,7,rgba(C.groen,0.8)); }
    naamBij(ctx,'celplaat','wordt een nieuwe celwand',x0,190,ramp(t,q.at('celplaat'),0.5),'center',C.groen); metaText(ctx,'plantencel',x0,y0+290,C.grain,'center',24); ctx.restore(); }
  scaleBar(ctx);
},
s19(ctx,t,q){
  micro(ctx);
  const sp=[[-60,-55],[-20,40],[30,-50],[60,45]];
  [-1,1].forEach(s=>cellWith(ctx,960+s*330,460,230,MODEL.map((m,i)=>({x:sp[i][0],y:sp[i][1],len:m.len*0.62,color:m.color,dup:false})),{nuc:true,label:'dochtercel: 4 chromosomen'}));
  pill(ctx,960,130,'mens: 46 → twee cellen met elk 46',C.goud,ramp(t,0.2,0.5),30);
  pill(ctx,960,820,'van elk chromosoom één chromatide',C.text,ramp(t,q.at('chromatide'),0.4),28); metaText(ctx,'opgerold getekend om te kunnen tellen',960,185,C.text2,'center',20);
  scaleBar(ctx);
},
s20(ctx,t,q){
  bg(ctx,'schema');
  const pts=[[0,1],[0.22,1],[0.42,2],[0.72,2],[0.74,1],[1,1]];
  const pr=clamp((t-q.at('Noem'))/ (q.at('weer')+0.6-q.at('Noem')),0,1);
  dnaGraph(ctx,260,180,1400,520,pts,pr,{labels:[{s:'G1',x:0.11,a:ramp(t,q.at('Noem'),0.4)},{s:'S: kopiëren',x:0.32,a:ramp(t,q.at('verdubbelt'),0.4)},{s:'G2',x:0.57,a:ramp(t,q.at('verdubbelt'),0.4)},{s:'mitose',x:0.73,a:ramp(t,q.at('mitose'),0.4)},{s:'G1',x:0.87,a:ramp(t,q.at('mitose'),0.4)}]});
  pill(ctx,960,800,'niet gehalveerd: eerst verdubbeld, dan eerlijk verdeeld',C.groen,ramp(t,q.at('gehalveerd'),0.4),28);
  pill(ctx,960,800,'twee genetisch gelijke dochtercellen',C.groen,ramp(t,q.at('genetisch'),0.4),28);
},
// ---------- H5 Meiose ----------
s21(ctx,t,q){
  bg(ctx,'schema');
  const dip=ramp(t,q.at('lichaamscel'),0.6); const a1=1-dip;
  if(a1>0){ ctx.save(); ctx.globalAlpha=a1; const meet=ramp(t,q.at('versmelten'),1.6);
    egg(ctx,1100,470,150,1); sperm(ctx,lerp(500,930,meet),470,2,1,0,t);
    text(ctx,'46',lerp(500,930,meet),400,fTekst(36,700),C.text,'center'); text(ctx,'46',1100,330,fTekst(36,700),C.text,'center');
    const k=ramp(t,q.at('kind'),0.5); if(k>0){ ctx.save(); ctx.globalAlpha*=k; text(ctx,'= 92 ?',1400,490,fTitel(70),C.koraal,'left'); crossOut(ctx,1500,470,70,ramp(t,q.at('tweeënnegentig'),0.3)); ctx.restore(); }
    ctx.restore(); }
  if(dip>0){ ctx.save(); ctx.globalAlpha=dip; const hap=ramp(t,q.at('geslachtscel'),0.6);
    cellWith(ctx,560,470,220,[{x:-70,y:-40,len:85,color:C.vader,dup:false},{x:-40,y:-40,len:85,color:C.moeder,dup:false},{x:40,y:40,len:55,color:C.vader,dup:false},{x:70,y:40,len:55,color:C.moeder,dup:false}],{nuc:true});
    text(ctx,'diploïd',560,190,fTekst(40,600),C.text,'center'); text(ctx,'2n = 46',560,800,fTitel(48),C.goud,'center');
    ctx.save(); ctx.globalAlpha*=hap; cellWith(ctx,1360,470,170,[{x:-30,y:-30,len:85,color:C.moeder,dup:false},{x:35,y:35,len:55,color:C.vader,dup:false}],{nuc:true}); text(ctx,'haploïd',1360,190,fTekst(40,600),C.text,'center'); text(ctx,'n = 23',1360,800,fTitel(48),C.goud,'center'); metaText(ctx,'van elk paar één',1360,700,C.grain,'center',22); ctx.restore();
    metaText(ctx,'paren chromosomen',560,710,C.grain,'center',22); ctx.restore(); }
},
s22(ctx,t,q){
  micro(ctx);
  const cellA=ramp(t,q.at('meiose',3),0.6); // 'In meiose I'
  const intro=1-cellA;
  if(intro>0){ ctx.save(); ctx.globalAlpha=intro; human(ctx,560,830,560,1,C.mens);
    const org=ramp(t,q.at('teelballen'),0.4); if(org>0){ ctx.save(); ctx.globalAlpha*=org; ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(560,600,46,0,6.2832); ctx.stroke(); ctx.restore(); naamBij(ctx,'teelballen / eierstokken','hier vindt meiose plaats',690,620,org,'left',C.goud); }
    pill(ctx,1240,300,'meiose: in teelballen en eierstokken',C.paars,org,28);
    pill(ctx,1240,420,'reductiedeling: 46 → 23',C.goud,ramp(t,q.at('reductiedeling'),0.4),28);
    pill(ctx,1240,540,'twee delingen, één keer kopiëren',C.text,ramp(t,q.at('delingen'),0.4),28); ctx.restore(); }
  if(cellA>0){ ctx.save(); ctx.globalAlpha=cellA; const pair=ramp(t,q.at('zoeken'),2.0), sep=ramp(t,q.at('uit'),2.0)*0; cellBody(ctx,960,470,560,330);
    const scat=[[-160,-90],[120,60],[60,-110],[-120,90]]; const rowsY=[400,560];
    MODEL.forEach((m,i)=>{ const tx=960+((m.color===C.vader)===(m.pair===0)?-34:34), ty=rowsY[m.pair]; const x=lerp(960+scat[i][0],tx,pair), y=lerp(470+scat[i][1],ty,pair); chromX(ctx,x,y,m.len*0.9,m.color,{w:16}); });
    if(pair>0.5){ spindle(ctx,[960-470,470],[[960-50,400],[960-50,560]],pair); spindle(ctx,[960+470,470],[[960+50,400],[960+50,560]],pair); }
    const eq=ramp(t,q.at('equatorvlak'),0.5); if(eq>0){ ctx.save(); ctx.globalAlpha*=eq; ctx.setLineDash([10,10]); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(960,170); ctx.lineTo(960,780); ctx.stroke(); ctx.restore(); }
    pill(ctx,960,100,'meiose I: homologe chromosomen als paren',C.goud,ramp(t,q.at('zoeken'),0.4),30);
    ctx.restore(); }
  scaleBar(ctx);
},
s24(ctx,t,q){
  micro(ctx);
  const m2=ramp(t,q.at('meiose',2),0.6); // 'In meiose II'
  const gam=ramp(t,q.at('man')+0.1,0.5);
  if(m2<1){ ctx.save(); ctx.globalAlpha=1-m2; const sep=ramp(t,0.2,2.0), cy=ramp(t,1.6,1.6);
    cellBody(ctx,960,470,560,330,cy);
    MODEL.forEach(m=>{ const side=(m.id==='Av'||m.id==='Bm')?-1:1; const y=m.pair?560:400; chromX(ctx,960+side*lerp(34,300,sep),y,m.len*0.9,m.color,{w:16}); });
    pill(ctx,960,100,'na meiose I: elke cel 2 chromosomen (mens: 23), elk met 2 chromatiden',C.goud,ramp(t,0.3,0.5),26); ctx.restore(); }
  if(m2>0 && gam<1){ ctx.save(); ctx.globalAlpha=m2*(1-ramp(t,q.at('man')-0.3,0.3)); const sp=ramp(t,q.at('chromatiden',2),1.8);
    const cells=[[-1,['Av','Bm']],[1,['Am','Bv']]];
    cells.forEach(([s,ids])=>{ const cx=960+s*400; cellBody(ctx,cx,470,300,250,ramp(t,q.at('mitose'),1.2));
      ids.forEach((id,j)=>{ const m=MODEL.find(z=>z.id===id); const y=j?560:390; if(sp<0.05) chromX(ctx,cx,y,m.len*0.85,m.color,{w:14}); else for(const d of [-1,1]){ chromatid(ctx,cx+d*lerp(10,150,sp),y,m.len*0.85,m.color,{w:14}); dot0(ctx,cx+d*lerp(10,150,sp),y,5,'#2A2140'); } }); });
    pill(ctx,960,100,'meiose II: de chromatiden gaan uit elkaar',C.goud,1,30); ctx.restore(); }
  if(gam>0){ ctx.save(); ctx.globalAlpha=gam; const vrouw=ramp(t,q.at('vrouw'),0.6);
    const G=[['Av','Bm'],['Av','Bm'],['Am','Bv'],['Am','Bv']];
    G.forEach((ids,i)=>{ const cx=330+i*420, cy=330; ctx.save(); ctx.globalAlpha*=1; cellWith(ctx,cx,cy,95,ids.map((id,j)=>{ const m=MODEL.find(z=>z.id===id); return {x:j?25:-25,y:0,len:m.len*0.55,color:m.color,dup:false,w:10}; })); ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(cx+95,cy); for(let k=0;k<=24;k++) ctx.lineTo(cx+95+k*5,cy+Math.sin(k*0.7+t*8)*6); ctx.stroke(); ctx.restore(); });
    metaText(ctx,'man: vier zaadcellen',960,470,C.grain,'center',24);
    if(vrouw>0){ ctx.save(); ctx.globalAlpha*=vrouw; egg(ctx,620,700,120,1); chromatid(ctx,600,700,40,C.vader,{w:8}); chromatid(ctx,640,700,26,C.moeder,{w:8}); for(let k=0;k<3;k++){ ctx.beginPath(); ctx.arc(900+k*110,720,30,0,6.2832); shape(ctx,rgba(C.fill,0.7),C.er,2); } metaText(ctx,'vrouw: één eicel',620,860,C.grain,'center',22); metaText(ctx,'kleine cellen sterven af',1010,800,C.grain,'center',20); ctx.restore(); } ctx.restore(); }
  scaleBar(ctx);
},
s25(ctx,t,q){
  bg(ctx,'schema');
  const pts=[[0,1],[0.15,1],[0.32,2],[0.45,2],[0.47,1],[0.7,1],[0.72,0.5],[1,0.5]];
  const pr=clamp((t-q.at('van'))/(q.at('half')+0.8-q.at('van')),0,1);
  dnaGraph(ctx,260,180,1400,560,pts,pr,{labels:[{s:'kopiëren',x:0.24,a:ramp(t,q.at('van'),0.3)},{s:'meiose I',x:0.46,a:ramp(t,q.at('meiose'),0.3)},{s:'meiose II',x:0.71,a:ramp(t,q.at('meiose',2),0.3)}],title:'DNA per kern bij de meiose'});
},
s26(ctx,t,q){
  micro(ctx);
  const co=ramp(t,q.at('variatie'),0.6); const fert=ramp(t,q.at('bevruchting'),0.6);
  const ia=1-co;
  if(ia>0){ ctx.save(); ctx.globalAlpha=ia; // two orientations of the pairs -> 4 combinations
    for(const [k,flip] of [[0,false],[1,true]]){ const cx=520+k*880, cy=420; cellBody(ctx,cx,cy,300,240);
      const L=flip?C.moeder:C.vader, R=flip?C.vader:C.moeder; chromX(ctx,cx-30,cy-60,110,L,{w:14}); chromX(ctx,cx+30,cy-60,110,R,{w:14}); chromX(ctx,cx-30,cy+70,70,C.vader,{w:14}); chromX(ctx,cx+30,cy+70,70,C.moeder,{w:14});
      metaText(ctx,k?'of zo':'zo',cx,cy+290,C.grain,'center',24); }
    pill(ctx,960,100,'welk chromosoom naar welke kant: toeval',C.goud,ramp(t,q.at('toeval'),0.4),30);
    const n=ramp(t,q.at('macht'),0.5); if(n>0){ ctx.save(); ctx.globalAlpha*=n; text(ctx,'2²³ ≈ 8 miljoen combinaties',960,820,fTitel(52),C.goud,'center'); ctx.restore(); }
    ctx.restore(); }
  if(co>0 && fert<1){ ctx.save(); ctx.globalAlpha=co*(1-fert); const close=ramp(t,q.at('dicht'),1.0), swap=ramp(t,q.at('wisselen'),1.4), out=ramp(t,q.at('Daardoor'),1.2);
    const cx=960, cy=460, gapX=lerp(90,30,close)+lerp(0,140,out);
    chromX(ctx,cx-gapX,cy,300,C.vader,{w:28,seg:swap>0?{from:0.62,to:1,color:C.moeder}:null,segSide:1,alpha:1});
    chromX(ctx,cx+gapX,cy,300,C.moeder,{w:28,seg:swap>0?{from:0.62,to:1,color:C.vader}:null,segSide:-1,alpha:1});
    if(swap>0&&out<0.5){ ctx.save(); ctx.globalAlpha*=swap*(1-out*2); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(cx,cy+70,40,0,6.2832); ctx.stroke(); ctx.restore(); }
    pill(ctx,960,100,'crossing-over: stukken uitwisselen',C.goud,ramp(t,q.at('crossing'),0.4),30);
    pill(ctx,960,830,'nieuwe mengeling van vader en moeder',C.groen,ramp(t,q.at('mengeling'),0.4)*(1-ramp(t,q.at('verschilt'),0.3)),28);
    pill(ctx,960,830,'bijna elke geslachtscel is anders',C.groen,ramp(t,q.at('verschilt'),0.4),28);
    ctx.restore(); }
  if(fert>0){ ctx.save(); ctx.globalAlpha=fert; const m=ramp(t,q.at('samen'),1.2); egg(ctx,1120,470,150,1); sperm(ctx,lerp(520,960,m),470,2,1,0,t);
    text(ctx,'n',lerp(520,960,m),400,fTekst(40,700),C.text,'center'); text(ctx,'n',1120,330,fTekst(40,700),C.text,'center');
    const r=ramp(t,q.at('weer'),0.5); if(r>0){ ctx.save(); ctx.globalAlpha*=r; text(ctx,'= 2n = 46',1320,490,fTitel(64),C.goud,'left'); ctx.restore(); } ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H6 Vergelijking ----------
// ---------- Voortplanting (16 okt 2026): v01 na s20, v02 na s26 ----------
v01(ctx,t,q){
  bg(ctx,'schema');
  const tB=q.at('eencellige')-0.3, tC=q.at('geslachtelijke',2)-0.2;
  const A=1-ramp(t,tB,0.6), B=ramp(t,tB,0.6)*(1-0.9*ramp(t,tC,0.6));
  pill(ctx,960,92,'ongeslachtelijke voortplanting: één ouder, geen bevruchting',C.goud,ramp(t,q.at('ongeslachtelijke'),0.5)*(1-ramp(t,tC,0.5)),30);
  if(A>0.01){ ctx.save(); ctx.globalAlpha*=A;
    const chs=(s)=>MODEL.map((m,i)=>({x:[-40,-12,16,44][i]*s,y:(m.pair?24:-22)*s,len:m.len*0.42*s,color:m.color,dup:false,w:9*s}));
    cellWith(ctx,520,470,150,chs(1.25),{nuc:true});
    naamBij(ctx,'ouder','één organisme',520,262,1,'center');
    const d=ramp(t,q.at('mitose',2),1.4);
    arrow(ctx,710,470,980,470,C.goud,5,18,ramp(t,q.at('mitose',2),0.4)); metaA(ctx,'mitose',845,440,C.goud,ramp(t,q.at('mitose',2),0.4),22);
    if(d>0){ for(const [x,y] of [[1240,330],[1560,600]]){ ctx.save(); ctx.globalAlpha*=d; cellWith(ctx,x,y,lerp(60,120,d),chs(lerp(0.5,1,d)),{nuc:true}); ctx.restore(); } }
    naamBij(ctx,'nakomelingen','',1400,170,ramp(t,q.at('Daardoor'),0.5),'center');
    pill(ctx,960,820,'genetisch gelijk aan de ouder: klonen',C.groen,ramp(t,q.at('klonen'),0.5),30);
    ctx.restore(); }
  if(B>0.01){ ctx.save(); ctx.globalAlpha*=B;
    const P=[[270,'eencellige','deelt in tweeën','eencellige'],[730,'knopvorming','gist · zoetwaterpoliep','Gist'],[1190,'uitlopers en stekken','aardbeiplant','aardbeiplant'],[1650,'bladluis','jongen zonder bevruchting','bladluis']];
    P.forEach(([cx,naam,meta,cue],k)=>{ const on=ramp(t,q.at(cue)-0.2,0.5); const nx=k<3?q.at(P[k+1][3])-0.2:tC; const foc=on*(1-0.5*ramp(t,nx,0.5));
      ctx.save(); ctx.globalAlpha*=0.35+0.65*on; roundRect(ctx,cx-205,170,410,640,18); shape(ctx,rgba(C.fill,0.55),foc>0.6?C.goud:C.line,foc>0.6?3:1.2);
      const cy=430, u=t-q.at(cue);
      if(k===0) vpEencellige(ctx,cx,cy,ramp(u,0.4,2.2),t);
      if(k===1) vpKnop(ctx,cx,cy,ramp(u,0.3,2.5),ramp(t,q.at('knop'),2.5),t);
      if(k===2) vpAardbei(ctx,cx,cy,ramp(t,q.at('uitlopers'),1.6),ramp(t,q.at('plantjes'),1.6),ramp(t,q.at('stek'),1.4));
      if(k===3) vpBladluis(ctx,cx,cy,ramp(t,q.at('jongen'),2.2),t);
      naamBij(ctx,naam,meta,cx,730,1,'center',foc>0.6?C.goud:C.text); ctx.restore(); });
    metaText(ctx,'nakomelingen zijn klonen van de ouder',960,862,C.grain,'center',22);
    ctx.restore(); }
  const cC=ramp(t,tC,0.6); if(cC>0){ pill(ctx,960,470,'geslachtelijke voortplanting: twee ouders, een andere deling',C.paars,cC,34); }
  scaleBar(ctx);
},
v02(ctx,t,q){
  bg(ctx,'schema');
  const tB=q.at('manier')-0.2; const A=1-ramp(t,tB,0.6), B=ramp(t,tB,0.6);
  pill(ctx,960,92,'geslachtelijke voortplanting',C.paars,A*ramp(t,0.2,0.5),30);
  if(A>0.01){ ctx.save(); ctx.globalAlpha*=A;
    const P1=[C.vader,'#2F6F94'], P2=[C.moeder,'#A8577F'];
    const ch=(La,Sa,s=1)=>[{x:-22*s,y:0,len:70*s,color:La,dup:false,w:10*s},{x:22*s,y:0,len:44*s,color:Sa,dup:false,w:10*s}];
    const ch4=(L1,L2,S1,S2,s=1)=>[{x:-36*s,y:-14*s,len:70*s,color:L1,dup:false,w:10*s},{x:-12*s,y:-14*s,len:70*s,color:L2,dup:false,w:10*s},{x:14*s,y:18*s,len:44*s,color:S1,dup:false,w:10*s},{x:38*s,y:18*s,len:44*s,color:S2,dup:false,w:10*s}];
    const par=ramp(t,q.at('geslachtelijke')+0.4,0.6);
    ctx.save(); ctx.globalAlpha*=par;
    cellWith(ctx,420,255,105,ch4(P1[0],P1[1],P1[0],P1[1],1.1),{nuc:true}); cellWith(ctx,1500,255,105,ch4(P2[0],P2[1],P2[0],P2[1],1.1),{nuc:true});
    naamBij(ctx,'ouder 1','2n',290,250,1,'right'); naamBij(ctx,'ouder 2','2n',1630,250,1,'left'); ctx.restore();
    const mei=ramp(t,q.at('meiose'),0.8); const fus=ramp(t,q.at('versmelten'),1.6); const zy=ramp(t,q.at('zygote')-0.3,0.5);
    const G1=[[300,ch(P1[0],P1[1],0.8)],[540,ch(P1[1],P1[0],0.8)]], G2=[[1380,ch(P2[0],P2[0],0.8)],[1620,ch(P2[1],P2[1],0.8)]];
    if(mei>0){ ctx.save(); ctx.globalAlpha*=mei;
      for(const [x] of G1) arrow(ctx,420,370,x,430,C.line,2.5,12,1); for(const [x] of G2) arrow(ctx,1500,370,x,430,C.line,2.5,12,1);
      G1.forEach(([x,c],i)=>{ const mv=i===1?fus:0; const gx=lerp(x,880,mv); ctx.save(); ctx.globalAlpha*=(1-zy*(i===1?1:0)); cellWith(ctx,gx,500,58,c); ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(gx-58,500); for(let k=0;k<=16;k++) ctx.lineTo(gx-58-k*5,500+Math.sin(k*0.8+t*8)*5); ctx.stroke(); ctx.restore(); });
      G2.forEach(([x,c],i)=>{ const mv=i===0?fus:0; const gx=lerp(x,1040,mv); ctx.save(); ctx.globalAlpha*=(1-zy*(i===0?1:0)); cellWith(ctx,gx,500,64,c); ctx.restore(); });
      metaText(ctx,'zaadcellen · n',420,610,C.grain,'center',20); metaText(ctx,'eicellen · n',1500,610,C.grain,'center',20);
      pill(ctx,960,385,'meiose → haploïde geslachtscellen',C.goud,ramp(t,q.at('haploïde'),0.4)*(1-ramp(t,q.at('bevruchting'),0.4)),26);
      ctx.restore(); }
    if(zy>0){ ctx.save(); ctx.globalAlpha*=zy; cellWith(ctx,960,500,88,ch4(P1[1],P2[0],P1[0],P2[0],1.05),{nuc:true}); ctx.restore();
      naamBij(ctx,'zygote','bevruchte eicel',960,370,zy,'center'); metaA(ctx,'weer diploïd · 2n',960,622,C.goud,ramp(t,q.at('diploïd'),0.3),20); }
    const kids=ramp(t,q.at('nakomelingen'),0.6);
    if(kids>0){ const K=[[P1[0],P2[1],P1[1],P2[0]],[P1[1],P2[0],P1[0],P2[0]],[P1[0],P2[0],P1[0],P2[1]],[P1[1],P2[1],P1[1],P2[1]]];
      K.forEach((c,i)=>{ ctx.save(); ctx.globalAlpha*=ramp(t,q.at('nakomelingen')+i*0.25,0.4); cellWith(ctx,600+i*240,765,56,ch4(c[0],c[1],c[2],c[3],0.7)); ctx.restore(); });
      metaA(ctx,'nakomelingen: allemaal anders',960,862,C.grain,kids,22); }
    pill(ctx,960,680,'variatie: door meiose en door toeval bij de bevruchting',C.groen,ramp(t,q.at('meiose',2),0.4),24);
    ctx.restore(); }
  if(B>0.01){ ctx.save(); ctx.globalAlpha*=B;
    const L=ramp(t,q.at('geslachtelijke',2)-0.2,0.5), R=ramp(t,q.at('geslachtelijke',3)-0.2,0.5);
    const ziek=ramp(t,q.at('ziekte'),1.6), dood=ramp(t,q.at('sterven'),0.6), ziekR=ramp(t,q.at('omgeving')-0.6,1.4), doodR=ramp(t,q.at('verandert'),0.6);
    const kols=[[500,'ongeslachtelijk',L],[1420,'geslachtelijk',R]];
    const VAR=[[C.vader,C.moeder],[C.moeder,'#2F6F94'],['#A8577F',C.vader],[C.goud,C.moeder],[C.vader,C.groen],[C.groen,'#A8577F']];
    const blijft=[1,4];
    kols.forEach(([cx,naam,a],side)=>{ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
      roundRect(ctx,cx-420,150,840,700,18); shape(ctx,rgba(C.fill,0.45),C.line,1.2);
      text(ctx,naam,cx,225,fTekst(44,600),side?C.paars:C.goud,'center');
      for(let i=0;i<6;i++){ const x=cx-300+i*120, y=390; const c=side?VAR[i]:[C.goud,C.goud];
        const sterf=side?(blijft.includes(i)?0:doodR):dood; ctx.save(); ctx.globalAlpha*=1-0.75*sterf;
        cellWith(ctx,x,y,46,[{x:-11,y:0,len:46,color:c[0],dup:false,w:9},{x:11,y:0,len:46,color:c[1],dup:false,w:9}]); ctx.restore();
        if(sterf>0.05) crossOut(ctx,x,y,24,sterf);
        if(side&&blijft.includes(i)&&doodR>0){ ctx.save(); ctx.globalAlpha*=doodR; ctx.strokeStyle=C.groen; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y,58,0,6.2832); ctx.stroke(); ctx.restore(); } }
      const z=side?ziekR:ziek; if(z>0&&z<1){ for(let k=0;k<5;k++){ const x=cx-380+z*760, y=320+k*36; ctx.save(); ctx.globalAlpha*=Math.sin(z*Math.PI); dot0(ctx,x+Math.sin(k*2.1+t*3)*14,y,9,C.koraal); for(let s=0;s<6;s++){ const an=s/6*6.2832; ctx.strokeStyle=C.koraal; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+Math.sin(k*2.1+t*3)*14+Math.cos(an)*9,y+Math.sin(an)*9); ctx.lineTo(x+Math.sin(k*2.1+t*3)*14+Math.cos(an)*15,y+Math.sin(an)*15); ctx.stroke(); } ctx.restore(); } }
      const pros=side?[['− trager',C.koraal,'trager'],['+ variatie',C.groen,'variatie'],['meer kans dat sommige overleven',C.groen,'overleven']]:[['+ snel',C.groen,'snel'],['+ geen partner nodig',C.groen,'partner'],['− geen variatie',C.koraal,'gelijk']];
      pros.forEach(([s,col,cue],j)=>pill(ctx,cx,560+j*95,s,col,ramp(t,q.at(cue),0.4),30));
      if(!side) metaA(ctx,'nieuwe ziekte: allemaal tegelijk weg',cx,820,C.koraal,ramp(t,q.at('sterven'),0.4),20);
      if(side) metaA(ctx,'omgeving verandert: een paar overleven',cx,820,C.groen,ramp(t,q.at('verandert'),0.4),20);
      ctx.restore(); });
    ctx.restore(); }
  scaleBar(ctx);
},
s27(ctx,t,q){ bg(ctx,'schema'); comparePanels(ctx,t,0,ramp(t,0.2,0.5)); },
s29(ctx,t,q){
  bg(ctx,'schema'); const tab=ramp(t,q.at('Mitose:',2),0.6);
  comparePanels(ctx,t,1,1-tab, ramp(t,0.1,0.5));
  if(tab>0){ ctx.save(); ctx.globalAlpha=tab;
    const rows=[['','mitose','meiose'],['delingen','1','2'],['dochtercellen','2','4 zaadcellen / 1 eicel'],['chromosomen','2n (diploïd)','n (haploïd)'],['genetisch','gelijk','verschillend'],['doel','groei, herstel, vervanging','voortplanting']];
    const cues=[null,'deling','dochtercellen','diploïd','genetisch','groei'];
    rows.forEach((r,i)=>{ const a=i===0?1:Math.max(ramp(t,q.at(cues[i]),0.4), ramp(t,q.at('Meiose:',3),0.4)*0.0); const am=i===0?1:ramp(t,q.at('Meiose:',3),0.4); const y=180+i*95;
      if(i>0){ ctx.save(); ctx.strokeStyle=rgba(C.line,0.3); ctx.beginPath(); ctx.moveTo(220,y-60); ctx.lineTo(1700,y-60); ctx.stroke(); ctx.restore(); }
      text(ctx,r[0],240,y,fTekst(32,600),C.text2,'left');
      ctx.save(); ctx.globalAlpha*=a; text(ctx,r[1],820,y,fTekst(i?32:38,600),i?C.text:C.teal,'left'); ctx.restore();
      ctx.save(); ctx.globalAlpha*=am; text(ctx,r[2],1280,y,fTekst(i?32:38,600),i?C.text:C.moeder,'left'); ctx.restore(); });
    pill(ctx,960,820,'meiose is niet twee keer mitose',C.koraal,ramp(t,q.at('gewoon'),0.4),30);
    ctx.restore(); }
},
// ---------- vwo: als het misgaat ----------
s30(ctx,t,q){
  micro(ctx); const nd=ramp(t,q.at('meiose'),0.6); const k1=1-nd;
  if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    const brk=ramp(t,q.at('Raken'),0.6), tum=ramp(t,q.at('tumor'),2.0), inv=ramp(t,q.at('kanker'),1.5);
    // tissue: neat row of cells
    for(let k=0;k<12;k++){ roundRect(ctx,180+k*130,620,120,90,14); shape(ctx,rgba(C.koraal,0.2),rgba(C.koraal,0.6),1.5); }
    if(tum>0){ const n=Math.floor(4+tum*40); for(let k=0;k<n;k++){ const a=hash(k*3)*6.28, d=Math.sqrt(hash(k*3+1))*lerp(40,200,tum); dot0(ctx,900+Math.cos(a)*d*1.3,430+Math.sin(a)*d*0.8,22,rgba(C.koraal,0.55)); } }
    if(inv>0){ for(let k=0;k<6;k++){ const u=clamp(inv*1.2-k*0.1,0,1); dot0(ctx,900+(k-2.5)*70,lerp(560,680,u),18,rgba(C.koraal,0.75)); } }
    // brake light
    const gx=1500, gy=250; roundRect(ctx,gx-50,gy-110,100,220,20); shape(ctx,rgba(C.bgSchema,0.9),C.line,1.5); dot0(ctx,gx,gy-50,30,C.groen); dot0(ctx,gx,gy+50,30,rgba(C.koraal,0.25)); if(brk>0.5) crossOut(ctx,gx,gy+50,26,brk); metaText(ctx,brk>0.5?'rem kapot: altijd groen':'controlepunt',gx,gy+150,C.grain,'center',22);
    pill(ctx,700,150,'normaal: alleen delen als het nodig is',C.groen,fadeIO(t,q.at('Normaal'),q.at('Raken'),0.4),28);
    pill(ctx,700,150,'fouten in het DNA: de rem gaat kapot',C.koraal,fadeIO(t,q.at('Raken'),q.at('tumor'),0.4),28);
    pill(ctx,700,150,'tumor: cellen blijven delen',C.koraal,fadeIO(t,q.at('tumor'),q.at('kanker'),0.4),28);
    pill(ctx,700,150,'kanker: cellen dringen andere weefsels binnen',C.koraal,ramp(t,q.at('kanker'),0.4),28); ctx.restore(); }
  if(nd>0){ ctx.save(); ctx.globalAlpha=nd; const sep=ramp(t,q.at('Soms'),2.5), res=ramp(t,q.at('ene'),0.6);
    cellBody(ctx,960,430,520,280,ramp(t,q.at('ene'),1.0));
    // pair A fails to separate (both go left), pair B separates normally
    const y1=360, y2=520; chromX(ctx,960-34-sep*300,y1,110,C.vader,{w:16}); chromX(ctx,960+34-sep*240,y1,110,C.moeder,{w:16}); chromX(ctx,960-34-sep*300,y2,70,C.vader,{w:16}); chromX(ctx,960+34+sep*300,y2,70,C.moeder,{w:16});
    pill(ctx,960,100,'non-disjunctie: een paar gaat niet uit elkaar',C.koraal,ramp(t,q.at('disjunctie'),0.4),28);
    if(res>0){ ctx.save(); ctx.globalAlpha*=res; text(ctx,'één te veel',640,780,fTekst(34,700),C.koraal,'center'); text(ctx,'één te weinig',1280,780,fTekst(34,700),C.koraal,'center'); ctx.restore(); }
    const e=ramp(t,q.at('eicel'),0.5); if(e>0){ ctx.save(); ctx.globalAlpha*=e; bg(ctx,'micro'); egg(ctx,1100,470,150,1); text(ctx,'24',1100,330,fTekst(40,700),C.koraal,'center'); sperm(ctx,560,470,2,ramp(t,q.at('zaadcel'),0.4),0,t); ctx.save(); ctx.globalAlpha*=ramp(t,q.at('zaadcel'),0.4); text(ctx,'23',560,400,fTekst(40,700),C.text,'center'); ctx.restore(); text(ctx,'?',1400,500,fTitel(90),C.goud,'center'); ctx.restore(); } ctx.restore(); }
  scaleBar(ctx);
},
s32(ctx,t,q){
  micro(ctx);
  text(ctx,'24 + 23 = 47',960,200,fTitel(70),C.goud,'center');
  karyo(ctx,280,300,1360,420,{alpha:ramp(t,q.at('nummer'),0.6),hl:[20],sex:'XX',tris:20});
  pill(ctx,960,800,'trisomie 21: het syndroom van Down',C.paars,ramp(t,q.at('trisomie'),0.4),30);
  scaleBar(ctx);
},
// ---------- Recap ----------
s33(ctx,t,q){
  bg(ctx,'schema'); const quiz=ramp(t,q.at('vraag'),0.6); const pa=1-quiz;
  if(pa>0){ ctx.save(); ctx.globalAlpha=pa;
    const P=[['groeien · herstellen · vervangen','groeien'],['eerst kopiëren','kopieert'],['mitose: 2 × 46, gelijk','mitose'],['meiose: n = 23, verschillend','meiose']];
    P.forEach((p,i)=>{ const a=i===0?ramp(t,0.1,0.5):ramp(t,q.at(p[1]),0.5); if(a<=0) return; const x=110+i*430, y=220, w=400, h=480; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y,w,h,14); shape(ctx,rgba(C.fill,0.55),C.line,1); const cx=x+w/2, cy=y+200;
      if(i===0) cellSwarm(ctx,cx,cy,3+((t*0.5)%2),110,1);
      if(i===1){ chromatid(ctx,cx-70,cy,120,C.paars,{w:18}); arrow(ctx,cx-30,cy,cx+20,cy,C.goud,4,14); chromX(ctx,cx+80,cy,120,C.paars,{w:18}); }
      if(i===2){ for(const s of [-1,1]) cellWith(ctx,cx+s*90,cy,75,MODEL.map((m,j)=>({x:-30+j*20,y:0,len:m.len*0.4,color:m.color,dup:false,w:8}))); }
      if(i===3){ for(let k=0;k<4;k++){ const ids=k<2?['Av','Bm']:['Am','Bv']; cellWith(ctx,cx-120+k*80,cy,36,ids.map((id,j)=>{ const m=MODEL.find(z=>z.id===id); return {x:j?8:-8,y:0,len:m.len*0.3,color:m.color,dup:false,w:6}; })); } }
      ctx.font=fTekst(28,600); ctx.fillStyle=C.text; ctx.textAlign='center'; wrap(ctx,p[0],cx,y+h-90,w-40,34); ctx.restore(); });
    ctx.restore(); }
  if(quiz>0){ ctx.save(); ctx.globalAlpha=quiz; const hc=ramp(t,q.at('huidcel'),0.5), zc=ramp(t,q.at('zaadcel'),0.5);
    ctx.save(); ctx.globalAlpha*=hc; roundRect(ctx,420,320,280,240,30); shape(ctx,rgba(C.koraal,0.25),C.koraal,2); nucMembrane(ctx,560,440,70,1); metaText(ctx,'huidcel (deelt niet)',560,620,C.grain,'center',22); ctx.restore();
    ctx.save(); ctx.globalAlpha*=zc; sperm(ctx,1360,440,3,1,0,t); metaText(ctx,'zaadcel',1300,620,C.grain,'center',22); ctx.restore();
    text(ctx,'meer DNA in de kern?',960,200,fTekst(44,600),C.text,'center'); ctx.restore(); }
},
s35(ctx,t,q){
  bg(ctx,'schema');
  const bars=[['huidcel',46,C.paars,'46 chromosomen (2n)'],['zaadcel',23,C.text2,'23 chromosomen (n)']];
  bars.forEach((b,i)=>{ const y=320+i*170; const w=b[1]/46*1000*ramp(t,0.3+i*0.6,0.8); roundRect(ctx,520,y,Math.max(4,w),90,12); ctx.fillStyle=rgba(b[2],0.75); ctx.fill(); text(ctx,b[0],490,y+60,fTekst(38,600),C.text,'right'); metaText(ctx,b[3],540+w,y+56,C.grain,'left',22); });
  pill(ctx,960,800,'ongeveer twee keer zoveel DNA in de kern',C.goud,ramp(t,q.at('Ongeveer'),0.4),30);
}
};

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
  const segs=[['interfase',0,0.88,C.paars],['mitose',0.88,0.96,C.goud],['cytokinese',0.96,1,C.groen]];
  const show=(cue)=> phase==='intro'? ramp(t,q.at(cue),0.5) : 1;
  const ringA=phase==='intro'? ramp(t,q.at('celcyclus'),0.6):1;
  ctx.save(); ctx.globalAlpha=ringA; ctx.lineWidth=th; ctx.strokeStyle=rgba(C.line,0.25); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.2832); ctx.stroke(); ctx.restore();
  const cues={interfase:'interfase',mitose:'mitose',cytokinese:'cytokinese'};
  segs.forEach(([n,f0,f1,col])=>{ const a=show(cues[n]); if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.lineWidth=th; ctx.strokeStyle=rgba(col,0.75); ctx.beginPath(); ctx.arc(cx,cy,R,ang(f0)+0.01,ang(f1)-0.01); ctx.stroke();
    const fm=(f0+f1)/2, lx=cx+Math.cos(ang(fm))*(R+th/2+40), ly=cy+Math.sin(ang(fm))*(R+th/2+40); if(n==='interfase') text(ctx,'interfase',cx,cy-10,fTekst(44,600),C.text,'center'); else text(ctx,n,lx,ly,fTekst(30,600),C.text,lx<cx?'right':'left'); ctx.restore(); });
  if(phase==='g1sg2'||phase==='check'){ const subs=[['G1',0,0.4,'G1'],['S',0.4,0.7,'S-fase'],['G2',0.7,0.88,'G2']];
    subs.forEach(([n,f0,f1,cue])=>{ const a=phase==='g1sg2'?ramp(t,q.at(cue),0.4):1; if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=C.bgSchema; ctx.lineWidth=6; for(const f of [f0,f1]){ ctx.beginPath(); ctx.moveTo(cx+Math.cos(ang(f))*(R-th/2),cy+Math.sin(ang(f))*(R-th/2)); ctx.lineTo(cx+Math.cos(ang(f))*(R+th/2),cy+Math.sin(ang(f))*(R+th/2)); ctx.stroke(); }
      const fm=(f0+f1)/2; text(ctx,n,cx+Math.cos(ang(fm))*R,cy+Math.sin(ang(fm))*R+12,fTekst(34,700),C.text,'center'); ctx.restore(); });
    const desc=[['G1: de cel groeit','G1'],['S: het DNA wordt gekopieerd','S-fase'],['G2: klaarmaken voor de deling','G2']];
    if(phase==='g1sg2') desc.forEach((d,i)=>{ const a=ramp(t,q.at(d[1]),0.4); if(a>0){ ctx.save(); ctx.globalAlpha=a; text(ctx,d[0],1060,330+i*110,fTekst(36,600),C.text,'left'); ctx.restore(); } }); }
  if(phase==='check'){ const lights=[[0.4,'groot'],[0.88,'gekopieerd']]; lights.forEach(([f,cue],i)=>{ const a=ramp(t,q.at(cue),0.4); const x=cx+Math.cos(ang(f))*(R+th/2+40), y=cy+Math.sin(ang(f))*(R+th/2+40); ctx.save(); ctx.globalAlpha=Math.max(0.25,a); roundRect(ctx,x-22,y-40,44,80,12); shape(ctx,rgba(C.bgSchema,0.95),C.line,1.2); dot0(ctx,x,y-17,12,a>0.5?C.groen:rgba(C.groen,0.3)); dot0(ctx,x,y+17,12,a>0.5?rgba(C.koraal,0.3):C.koraal); ctx.restore(); });
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
