// Scenes: one per narrated segment. draw(ctx, t, q) where t = seconds into the take and
// q = cue helper: q.at('woord', n) = start time of the n-th word containing 'woord'; q.on('woord', n, d) = ramp 0..1 from that time.
// st.board = lit fractions of the six levenskenmerken (computed by the player from global time).

const L0 = cellLayout();

function human(ctx,x,y,h,alpha=1,color=C.mens){ // simple flat figure with a plain face (Part C)
  ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=color; const u=h/8;
  ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9,0,6.283); ctx.fill();
  roundRect(ctx,x-u*1.3,y-h+u*2.1,u*2.6,u*3.6,u*0.8); ctx.fill();
  roundRect(ctx,x-u*1.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill(); roundRect(ctx,x+u*0.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x-u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.arc(x+u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.fill();
  ctx.strokeStyle=C.bgSchema; ctx.lineWidth=u*0.08; ctx.beginPath(); ctx.arc(x,y-h+u*1.1,u*0.3,0.3,2.84); ctx.stroke();
  ctx.restore();
}
function particleFlow(ctx, path, n, t, speed, color, r=5, seedOff=0, alpha=1){ // particles along polyline path [[x,y],...] looping
  const segs=[]; let total=0; for(let i=1;i<path.length;i++){ const d=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]); segs.push(d); total+=d; }
  ctx.save(); ctx.globalAlpha*=alpha; ctx.fillStyle=color;
  for(let k=0;k<n;k++){ let d=((t*speed + hash(k+seedOff)*total) % total); let i=0; while(d>segs[i]){ d-=segs[i]; i++; } const u=d/segs[i];
    const x=lerp(path[i][0],path[i+1][0],u), y=lerp(path[i][1],path[i+1][1],u); const w=wander(k+seedOff,t,4,2);
    ctx.beginPath(); ctx.arc(x+w.x,y+w.y,r,0,6.283); ctx.fill(); }
  ctx.restore();
}
function card(ctx, x, y, w, h, title, body, alpha=1, accent=C.goud){
  if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; roundRect(ctx,x,y,w,h,12); shape(ctx,rgba(C.bgSchema,0.94),C.line,1);
  if(title) text(ctx,title,x+28,y+52,fTekst(36,600),accent);
  if(body){ ctx.font=fTekst(32); ctx.fillStyle=C.text; wrap(ctx,body,x+28,y+(title?100:52),w-56,42); }
  ctx.restore();
}
function wrap(ctx, s, x, y, maxW, lh){ const words=s.split(' '); let line=''; for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; } if(line) ctx.fillText(line,x,y); return y; }

const SCENES = {
// ---------- Cold open (Schema → Macro body → zoomcirkel Micro) ----------
s01(ctx,t,q,st){
  bg(ctx,'schema');
  const a1=q.on('boterham',1,0.5), a2=q.on('klier',1), a3=q.on('kliercellen',1), a4=q.on('binnenin',1);
  // boterham
  ctx.save(); ctx.globalAlpha=a1*(1-ramp(t,q.at('klier')+1.5,1)); roundRect(ctx,300,420,260,200,40); shape(ctx,C.oker,lighten(C.oker,0.3),1.5); roundRect(ctx,330,450,200,140,24); ctx.fillStyle=lighten(C.oker,0.25); ctx.fill(); ctx.restore();
  // human with pancreas marked
  const hx=960, hy=860; human(ctx,hx,hy,640,a2);
  if(a2>0){ ctx.save(); ctx.globalAlpha=a2; // stomach + pancreas
    ctx.fillStyle=rgba(C.koraal,0.5); blob(ctx,hx-10,hy-350,52,38,0.05,3); ctx.fill();
    ctx.fillStyle=C.goud; blob(ctx,hx+30,hy-300,70,22,0.08,7); ctx.fill(); ctx.strokeStyle=lighten(C.goud,0.3); ctx.lineWidth=1.5; ctx.stroke();
    label(ctx,'alvleesklier','ruim een liter sap per dag',hx+30,hy-300,hx-200,hy-420,a2*(1-ramp(t,q.at('kliercellen'),0.5))); ctx.restore(); }
  // zoom circle to a gland cell releasing enzymes
  const z=ramp(t,q.at('kliercellen'),0.8);
  zoomCircle(ctx,1430,440,230,hx+60,hy-300,'één kliercel',z,()=>{
    ctx.fillStyle=C.bgMicro; ctx.fillRect(1200,210,460,460); ctx.save(); ctx.globalAlpha=0.6; grain(ctx); ctx.restore();
    const Lc={cx:1430,cy:450,rx:170,ry:160}; membrane(ctx,Lc.cx,Lc.cy,Lc.rx,Lc.ry,C.er,0.04,2,t);
    nucleus(ctx,1370,450,55,1,t); roughER(ctx,1470,380,120,2); golgi(ctx,1500,490,80);
    // vesicles leaving at the right side ("naar buiten")
    const out=ramp(t,q.at('binnenin'),0.5); for(let k=0;k<8;k++){ const u=((t*0.25+hash(k+300))%1); const x=lerp(1500,1650,u), y=470+ (hash(k)*2-1)*40; vesicle(ctx,x,y,8,out*(u<0.85?1:(1-u)/0.15)); }
  });
  if(z>0) label(ctx,'enzymen','naar buiten, netjes verpakt',1640,470,1700,330,ramp(t,q.at('netjes'),0.6));
  scaleBar(ctx,'vereenvoudigd');
},
// ---------- H1: levenskenmerken, bacterie vs eukaryoot ----------
s04(ctx,t,q,st){
  bg(ctx,'schema'); board(ctx,st.board,ramp(t,q.at('lijst'),0.8));
  // small eukaryote cell (left) vs bacterium
  const aCell=ramp(t,q.at('onderdelen'),0.6), aBac=ramp(t,q.at('bacterie',1),0.6);
  ctx.save(); ctx.globalAlpha=aCell; const Ls=cellLayout(520,440,300,180); ctx.save(); ctx.beginPath(); blob(ctx,520,440,312,192,0.04,1,0); ctx.clip(); ctx.fillStyle=C.bgMicro; ctx.fillRect(150,200,760,500); ctx.globalAlpha*=0.7; grain(ctx); ctx.restore();
  drawCell(ctx,Ls,t,{motion:0.3}); ctx.restore();
  if(aCell>0) label(ctx,'jouw cel','eukaryoot · met kern en organellen',520+250,440-130,900,230,ramp(t,q.at('eukaryoot'),0.5));
  // bacterium
  const bx=520, by=760; ctx.save(); ctx.globalAlpha=aBac; ctx.translate(bx,by); roundRect(ctx,-60,-22,120,44,22); shape(ctx,rgba(C.teal,0.5),lighten(C.teal,0.3),1.5);
  for(let i=0;i<9;i++){ ctx.fillStyle=C.ribo; ctx.beginPath(); ctx.arc(-45+i*11+(hash(i)*6-3), (hash(i+3)*2-1)*12,2.6,0,6.283); ctx.fill(); }
  ctx.strokeStyle=lighten(C.teal,0.3); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(60,0); ctx.quadraticCurveTo(90,-15,110,5); ctx.quadraticCurveTo(125,15,140,-5); ctx.stroke(); ctx.restore();
  if(aBac>0) label(ctx,'bacterie','prokaryoot · één ruimte, losse ribosomen',bx+60,by-20,bx+300,by-60,aBac);
  // scale note at "tien keer"
  const sc=ramp(t,q.at('tien'),0.6); if(sc>0){ ctx.save(); ctx.globalAlpha=sc; ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(220,650); ctx.lineTo(820,650); ctx.stroke(); ctx.beginPath(); ctx.moveTo(460,805); ctx.lineTo(580,805); ctx.stroke(); metaText(ctx,'10 × zo lang en breed als een bacterie',520,690,C.goud,'center',22); ctx.restore(); }
  // "afdelingen" annotation
  haak(ctx,950,1650,470,'veel taken krijgen een eigen afdeling: een organel',C.groen,ramp(t,q.at('afdeling'),0.6)*(1-ramp(t,q.at('film'),0.5)));
  scaleBar(ctx);
},
// ---------- H1b: the pancreas cell up close ----------
s05(ctx,t,q,st){
  bg(ctx,'micro'); const L=cellLayout(700,540,480,300);
  // 'plat → blokje': brief pseudo-3D by drawing an offset back face
  const d3=ramp(t,q.at('blokje'),0.7)*(1-ramp(t,q.at('plat',2),0.7));
  if(d3>0){ ctx.save(); ctx.globalAlpha=d3*0.5; ctx.translate(70*d3,-50*d3); membrane(ctx,L.cx,L.cy,L.rx,L.ry,C.er,0.04,1,0); ctx.restore();
    ctx.save(); ctx.globalAlpha=d3*0.5; ctx.strokeStyle=C.er; ctx.lineWidth=1; for(const a of [0.6,2.5,3.7,5.6]){ ctx.beginPath(); ctx.moveTo(L.cx+Math.cos(a)*L.rx,L.cy+Math.sin(a)*L.ry); ctx.lineTo(L.cx+Math.cos(a)*L.rx+70*d3,L.cy+Math.sin(a)*L.ry-50*d3); ctx.stroke(); } ctx.restore(); }
  const focus = t<q.at('celmembraan')? null : t<q.at('cytoplasma')? 'membraan' : t<q.at('organellen',2)? 'cyto' : null;
  drawCell(ctx,L,t,{motion:0.2, focus: focus==='membraan'? ['none'] : null});
  if(focus==='membraan'){ ctx.save(); ctx.globalAlpha=0.9; blob(ctx,L.cx,L.cy,L.rx+4,L.ry+4,0.04,1,0); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); ctx.restore(); }
  label(ctx,'celmembraan','dun vlies om de cel',L.cx+L.rx*0.7,L.cy-L.ry*0.72,1150,260,ramp(t,q.at('celmembraan'),0.5));
  label(ctx,'cytoplasma','stroperige vulling',L.cx-330,L.cy+190,80,820,ramp(t,q.at('cytoplasma'),0.5),C.text,'left');
  label(ctx,'organellen','elk met eigen bouw en taak',L.golgi.x+20,L.golgi.y+10,1300,780,ramp(t,q.at('organellen',2),0.5));
  metaText(ctx,'ongeveer 0,01 mm',L.cx,L.cy+L.ry+60,C.grain,'center',24);
  scaleBar(ctx,'vereenvoudigd · niet op schaal · plat getekend');
},
// ---------- H2: kern ----------
s07(ctx,t,q,st){
  bg(ctx,'micro'); const K={x:560,y:540,r:210};
  nucleus(ctx,K.x,K.y,K.r,1,t);
  // chromatin: a few loose coiled threads (not a tangle)
  ctx.save(); ctx.strokeStyle=lighten(C.kernR,0.45); ctx.lineWidth=2.2;
  for(let th=0;th<4;th++){ ctx.beginPath(); const a0=th*1.6, r0=K.r*0.35+th*18; for(let i=0;i<=90;i++){ const a=a0+i/90*2.6; const r=r0+Math.sin(i*0.9+th)*9; const x=K.x+Math.cos(a)*r, y=K.y+Math.sin(a)*r*0.9; i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); }
  ctx.restore();
  // pores
  const ap=ramp(t,q.at('kernporiën'),0.5);
  const pores=[]; for(let i=0;i<10;i++){ const a=i/10*6.283; pores.push({x:K.x+Math.cos(a)*(K.r+7), y:K.y+Math.sin(a)*(K.r+7)*0.92, a}); ctx.save(); ctx.globalAlpha=ap; ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(pores[i].x,pores[i].y,8,0,6.283); ctx.stroke(); ctx.restore(); }
  label(ctx,'celkern','grootste losse organel',K.x-60,K.y-K.r+10,120,260,ramp(t,q.at('celkern'),0.5),C.text,'left');
  // ---- zoom circle: a piece of DNA as a double helix ----
  const az=ramp(t,q.at('dna',1),0.8); const Z={x:1300,y:520,r:230};
  const tm=q.at('werkkopieën'), tblijft=q.at('blijft'), trep=q.at('gekopieerd');
  const copy=ramp(t,tm,2.5)*(1-ramp(t,q.at('bestuurt'),0.6)); // mRNA being read off
  const rep=ramp(t,trep,2.2);
  zoomCircle(ctx,Z.x,Z.y,Z.r,K.x+40,K.y-20,'een stukje DNA · vereenvoudigd',az,()=>{
    ctx.fillStyle=C.bgMicro; ctx.fillRect(Z.x-Z.r,Z.y-Z.r,2*Z.r,2*Z.r); ctx.save(); ctx.globalAlpha=0.5; grain(ctx); ctx.restore();
    const x0=Z.x-Z.r+30, x1=Z.x+Z.r-30, n=60, amp=44;
    const strand=(sign,dy,col,lw)=>{ ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.beginPath(); for(let i=0;i<=n;i++){ const u=i/n; const x=lerp(x0,x1,u); const y=Z.y+dy+sign*amp*Math.sin(u*6.283*1.6); i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); };
    const rungs=(dy,alpha)=>{ ctx.save(); ctx.globalAlpha*=alpha; for(let i=1;i<n;i+=3){ const u=i/n; const x=lerp(x0,x1,u); const ya=Z.y+dy+amp*Math.sin(u*6.283*1.6), yb=Z.y+dy-amp*Math.sin(u*6.283*1.6); const col=[C.koraal,C.teal,C.groen,C.oker][i%4]; ctx.strokeStyle=col; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,ya); ctx.lineTo(x,(ya+yb)/2); ctx.stroke(); const col2=[C.teal,C.koraal,C.oker,C.groen][i%4]; ctx.strokeStyle=col2; ctx.beginPath(); ctx.moveTo(x,yb); ctx.lineTo(x,(ya+yb)/2); ctx.stroke(); } ctx.restore(); };
    if(rep<0.02){ rungs(0,1); strand(1,0,C.kernR,5); strand(-1,0,lighten(C.kernR,0.35),5);
      // mRNA copied along the lower strand, then slides right (out of the frame → toward a pore)
      if(copy>0){ const len=ramp(t,tm,2.6); const slide=ramp(t,tm+4.2,1.6)*(Z.r*2+120); const drop=ramp(t,tm+2.8,1.0)*26; ctx.save(); ctx.globalAlpha=copy; ctx.strokeStyle=C.teal; ctx.lineWidth=5; ctx.beginPath(); for(let i=0;i<=n*len;i++){ const u=i/n; const x=lerp(x0,x1,u)+slide; const y=Z.y+amp+34+drop+Math.sin(u*6.283*4)*7; i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); if(len<1){ const rx=lerp(x0,x1,len); ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(rx,Z.y-amp*Math.sin(len*6.283*1.6)); ctx.lineTo(rx,Z.y+amp+34); ctx.stroke(); ctx.fillStyle=C.goud; ctx.beginPath(); ctx.arc(rx,Z.y-amp*Math.sin(len*6.283*1.6),7,0,6.283); ctx.fill(); } ctx.restore(); metaText(ctx,'werkkopie (RNA)',Z.x,Z.y+Z.r-30,C.teal,'center',22); }
    } else { // replication: two helices drift apart, each gets a new partner strand
      const sep=ease(rep)*95; rungs(-sep,0.3+0.7*rep); rungs(sep,0.3+0.7*rep); strand(1,-sep,C.kernR,5); ctx.save(); ctx.globalAlpha*=rep; strand(-1,-sep,lighten(C.kernR,0.35),5); strand(1,sep,lighten(C.kernR,0.35),5); ctx.restore(); strand(-1,sep,C.kernR,5); }
  });
  if(az>0){ label(ctx,'DNA','dubbele helix · basenparen als sporten',Z.x-Z.r*0.6,Z.y-Z.r*0.8,1000,228,az,C.text,'left'); }
  // mRNA strands leaving through pores into the cytoplasm (single wavy teal threads)
  const am=ramp(t,tm+4.5,0.8)*(1-ramp(t,q.at('bestuurt'),0.8));
  if(am>0){ ctx.save(); ctx.globalAlpha=am; ctx.strokeStyle=C.teal; ctx.lineWidth=4; for(let k=0;k<5;k++){ const p=pores[(k*3)%10]; const u=((t*0.22+hash(k+40))%1); const d=lerp(-60,220,u); const x=p.x+Math.cos(p.a)*d, y=p.y+Math.sin(p.a)*d*0.92; ctx.beginPath(); for(let i=0;i<=14;i++){ const s=i/14; const px=x+Math.cos(p.a)*(s*64-32)-Math.sin(p.a)*Math.sin(s*12.6+t*4)*8, py=y+Math.sin(p.a)*(s*64-32)*0.92+Math.cos(p.a)*Math.sin(s*12.6+t*4)*8; i?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.stroke(); } ctx.restore(); }
  label(ctx,'kernporiën','werkkopieën (RNA) gaan de kern uit',K.x-K.r*0.75,K.y+K.r*0.6,120,830,ap,C.text,'left');
  const ab=ramp(t,tblijft,0.5)*(1-ramp(t,q.at('bestuurt'),0.6)); if(ab>0) haak(ctx,Z.x-Z.r,Z.x+Z.r,Z.y+Z.r+60,'het DNA zelf blijft in de kern',C.groen,ab);
  // misconception card
  const mc=ramp(t,q.at('bestuurt'),0.5)*(1-ramp(t,q.at('deelt'),0.6));
  card(ctx,1100,640,760,170,'"De kern bestuurt de cel"','Nee. Hij bewaart bouwtekeningen; welke kopieën uitgaan bepaalt wat de cel doet.',mc,C.koraal);
  if(rep>0) haak(ctx,Z.x-Z.r,Z.x+Z.r,Z.y+Z.r+60,'al het DNA gekopieerd → de cel kan delen',C.groen,rep);
  // rode bloedcel
  const rb=ramp(t,q.at('rode'),0.6); if(rb>0){ ctx.save(); ctx.globalAlpha=rb*0.85; ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,CAPTION_Y); ctx.restore(); ctx.save(); ctx.globalAlpha=rb; ctx.beginPath(); ctx.ellipse(1500,600,120,80,0,0,6.283); shape(ctx,C.koraal,lighten(C.koraal,0.3),1.5); ctx.beginPath(); ctx.ellipse(1500,600,60,30,0,0,6.283); ctx.fillStyle=rgba(C.bgMicro,0.5); ctx.fill(); ctx.restore(); label(ctx,'rode bloedcel','geen kern · leeft ongeveer 120 dagen',1400,560,1000,420,rb,C.text,'right'); board(ctx,st.board,rb*0.9); }
  scaleBar(ctx);
},
// ---------- H3: ribosomen, ER, golgisysteem ----------
s09(ctx,t,q,st){
  bg(ctx,'micro'); const K={x:380,y:560,r:150}; const ER={x:850,y:420,w:420}; const G={x:1250,y:620,w:200}; const MEM={x:1620};
  nucleus(ctx,K.x,K.y,K.r,0.8,t);
  // ribosomes everywhere
  const ar=ramp(t,q.at('ribosoom'),0.5), am2=ramp(t,q.at('miljoenen'),0.8); for(let i=0;i<160;i++){ const x=560+hash(i*3)*1000, y=220+hash(i*3+1)*580; if(x>1570) continue; const w=wander(i,t,2,0.6); ribosome(ctx,x+w.x,y+w.y,am2*0.85); }
  ctx.save(); ctx.globalAlpha=ar; ctx.fillStyle=C.ribo; ctx.beginPath(); ctx.arc(760,432,11,0,6.283); ctx.fill(); ctx.restore();
  // mRNA arriving
  const am=1-ramp(t,q.at('ribosoom'),1); if(am>0){ ctx.save(); ctx.globalAlpha=am; ctx.strokeStyle=C.teal; ctx.lineWidth=3; const u=clamp(t/Math.max(q.at('ribosoom'),0.1),0,1); ctx.beginPath(); ctx.moveTo(lerp(K.x+K.r,760,u)-10,lerp(K.y-40,430,u)); ctx.lineTo(lerp(K.x+K.r,760,u)+10,lerp(K.y-40,430,u)); ctx.stroke(); ctx.restore(); }
  label(ctx,'ribosoom','maakt eiwitten',760,432,560,300,ar);
  // ER
  const aer=ramp(t,q.at('netwerk'),0.6); roughER(ctx,ER.x,ER.y,ER.w,4,aer, t>q.at('ruw')-0.2);
  label(ctx,'ruw ER','met ribosomen erop',ER.x+ER.w/2,ER.y-20,1150,250,ramp(t,q.at('reticulum'),0.5));
  // vesicles ER -> golgi -> membrane (simulation of transport)
  const av=ramp(t,q.at('blaasjes',1),0.5);
  const path1=[[ER.x+120,ER.y+90],[G.x-60,G.y-40]]; const path2=[[G.x+40,G.y-70],[MEM.x-40,500]];
  if(av>0){ for(let k=0;k<6;k++){ const u=((t*0.22+hash(k+11))%1); const w=wander(k,t,5,2); vesicle(ctx,lerp(path1[0][0],path1[1][0],u)+w.x,lerp(path1[0][1],path1[1][1],u)+w.y,9,av); } }
  const ag=ramp(t,q.at('golgisysteem',1),0.6); golgi(ctx,G.x,G.y,G.w,ag); label(ctx,'golgisysteem','bewerkt, sorteert, verpakt',G.x-40,G.y+12,1060,720,ag,C.text,'left');
  const ao=ramp(t,q.at('nieuwe'),0.6); if(ao>0){ for(let k=0;k<6;k++){ const u=((t*0.22+hash(k+21))%1); const w=wander(k+5,t,5,2); vesicle(ctx,lerp(path2[0][0],path2[1][0],u)+w.x,lerp(path2[0][1],path2[1][1],u)+w.y,9,ao*(u<0.9?1:(1-u)*10)); } }
  // membrane at right, enzymes outside
  ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(MEM.x,120); ctx.lineTo(MEM.x,CAPTION_Y-40); ctx.stroke(); ctx.beginPath(); ctx.moveTo(MEM.x+9,120); ctx.lineTo(MEM.x+9,CAPTION_Y-40); ctx.stroke(); ctx.fillStyle=C.er; for(let y=130;y<CAPTION_Y-40;y+=12){ ctx.beginPath(); ctx.arc(MEM.x+4.5,y,1.6,0,6.283); ctx.fill(); } ctx.restore();
  const ab=ramp(t,q.at('versmelt'),0.6); if(ab>0){ for(let k=0;k<10;k++){ const u=((t*0.3+hash(k+31))%1); const x=lerp(MEM.x+20,MEM.x+260,u), y=380+hash(k)*260; ctx.save(); ctx.globalAlpha=ab*(1-u); ctx.fillStyle=C.oker; ctx.beginPath(); ctx.arc(x,y,5,0,6.283); ctx.fill(); ctx.restore(); } label(ctx,'enzymen','buiten de cel',MEM.x+140,420,1890,420,ab,C.text,'right'); }
  haak(ctx,560,1600,800,'stoffen omzetten tot iets nieuws: stofwisseling (opbouw)',C.groen,ramp(t,q.at('opbouwkant'),0.6));
  label(ctx,'celmembraan','',MEM.x+4,300,1640,260,0.9,C.text,'left');
  scaleBar(ctx);
},
// ---------- H3 vwo: de eiwitroute ----------
s11(ctx,t,q,st){
  bg(ctx,'micro');
  const ER={x:520,y:460}, G={x:1000,y:560}, MEM=1560, LY={x:1300,y:820};
  roughER(ctx,ER.x,ER.y,480,5,1,true); golgi(ctx,G.x,G.y+40,360); lysosome(ctx,LY.x,LY.y,30,ramp(t,q.at('opruimdienst',1),0.5)); label(ctx,'lysosoom','opruimdienst',LY.x-30,LY.y,LY.x-200,LY.y+10,ramp(t,q.at('opruimdienst',1),0.5),C.text,'right'); label(ctx,'golgisysteem','',G.x,G.y+70,G.x-60,G.y+170,0.8,C.text,'left'); label(ctx,'ruw ER','',ER.x-160,ER.y+120,ER.x-220,ER.y+210,0.8,C.text,'left');
  ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(MEM,120); ctx.lineTo(MEM,CAPTION_Y-40); ctx.stroke(); ctx.beginPath(); ctx.moveTo(MEM+9,120); ctx.lineTo(MEM+9,CAPTION_Y-40); ctx.stroke(); ctx.restore();
  // hero protein as a gold chain, timeline of stages
  const tk=q.at('kanaal'), tv=q.at('vouwt'), ts=q.at('snoert',1), tg=q.at('golgisysteem',1), tz=q.at('zakje',2), ts2=q.at('snoert',2), tm=q.at('celmembraan',1), te=q.at('exocytose'), tl=q.at('opruimdienst',1), ten=q.at('endocytose');
  // channel in ER membrane
  if(t>tk-0.3){ ctx.save(); ctx.globalAlpha=ramp(t,tk,0.4); roundRect(ctx,ER.x-82,ER.y-20,28,44,7); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.2); ctx.fillStyle=C.ribo; ctx.beginPath(); ctx.arc(ER.x-68,ER.y-32,7,0,6.283); ctx.fill(); label(ctx,'kanaal','in het ER-membraan',ER.x-68,ER.y-14,330,250,ramp(t,tk,0.4)*(1-ramp(t,ts,0.5))); ctx.restore(); }
  // protein position over time
  let px,py,inVes=false,lbl='';
  if(t<tv){ const u=ramp(t,tk,Math.max(tv-tk,0.1)); px=ER.x-68; py=ER.y-30+60*u; }
  else if(t<ts){ px=ER.x-20; py=ER.y+40; lbl='eerste suikerlabel'; }
  else if(t<tg){ const u=ramp(t,ts,Math.max(tg-ts,0.1)); px=lerp(ER.x+140,G.x-170,u); py=lerp(ER.y+70,G.y+30,u); inVes=true; }
  else if(t<ts2){ const u=ramp(t,tg,Math.max(ts2-tg,0.1)); px=G.x-100+200*u; py=G.y+40-14*Math.floor(u*4.99); lbl= t>tz?'suikers aangepast · adreslabel':''; }
  else if(t<te+1){ const u=ramp(t,ts2,Math.max(tm-ts2,0.1)); px=lerp(G.x+160,MEM-14,u); py=lerp(G.y-30,460,u); inVes=u<1; lbl='adreslabel: celmembraan'; }
  else { const u=ramp(t,te+1,1.2); px=MEM+20+200*u; py=460; lbl='buiten de cel'; }
  if(inVes) vesicle(ctx,px,py,22,1);
  ctx.save(); ctx.strokeStyle=C.goud; ctx.lineWidth=3.5; ctx.beginPath(); for(let i=0;i<=24;i++){ ctx.lineTo(px-16+i*1.4, py+Math.sin(i*0.9)*8); } ctx.stroke(); ctx.restore();
  if(lbl){ ctx.save(); roundRect(ctx,660,230,600,54,10); shape(ctx,rgba(C.bgSchema,0.9),C.goud,1); metaText(ctx,lbl,960,266,C.goud,'center',24); ctx.restore(); }
  // second vesicle to lysosome
  if(t>tl){ const u=ramp(t,tl,1.5); const x=lerp(G.x+160,LY.x,u), y=lerp(G.y-30,LY.y,u); vesicle(ctx,x,y,18,1-ramp(t,tl+1.5,0.4)); metaText(ctx,'adreslabel: lysosoom',x,y-30,C.grain,'center',22); }
  // endocytosis
  if(t>ten-2.5){ const u=ramp(t,ten-2.5,2.0); ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(MEM-70*u,700,60,-1.35,1.35,true); ctx.stroke(); ctx.restore(); if(u>0.95){ vesicle(ctx,MEM-150-(t-ten)*30,700,34,1,C.ves,C.vesR); } label(ctx,'endocytose','membraan stulpt in',MEM-60*u-60,650,MEM-200,560,ramp(t,ten-2.5,0.5),C.text,'right'); }
  label(ctx,'exocytose','blaasje versmelt met het celmembraan',MEM,440,1500,330,ramp(t,te,0.5),C.text,'right');
  scaleBar(ctx);
},
s13(ctx,t,q,st){ bg(ctx,'micro'); const steps=[['gemaakt','ribosoom'],['bewerkt','ER + golgisysteem'],['verpakt','blaasje'],['buiten','exocytose']];
  steps.forEach((s,i)=>{ const a=ramp(t,q.at(s[0]),0.4); const x=360+i*400; ctx.save(); ctx.globalAlpha=0.35+0.65*a; roundRect(ctx,x-150,420,300,120,14); shape(ctx,C.fill,a>0.5?C.goud:C.line,1); text(ctx,s[0],x,478,fTekst(40,600),C.text,'center'); metaText(ctx,s[1],x,515,C.grain,'center',22); ctx.restore(); if(i<3){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x+160,480); ctx.lineTo(x+230,480); ctx.lineTo(x+220,472); ctx.moveTo(x+230,480); ctx.lineTo(x+220,488); ctx.stroke(); } });
},
// ---------- H4: mitochondrium ----------
s14(ctx,t,q,st){
  bg(ctx,'micro'); const M={x:900,y:520,len:720};
  // tubes splitting/merging animation around 'buizen'
  const tub=ramp(t,q.at('buizen'),0.8)*(1-ramp(t,q.at('verbranding',1),0.8));
  if(tub>0){ ctx.save(); ctx.globalAlpha=tub*0.9; const s=Math.sin(t*0.8); mitochondrion(ctx,1500,250+ s*10,300,0.15,1,8); mitochondrion(ctx,1400+lerp(0,110,ramp(t,q.at('samensmelten'),1.0)),360,150,0.0,1,5); mitochondrion(ctx,1620-lerp(0,110,ramp(t,q.at('samensmelten'),1.0)),360,150,0,1,5); metaText(ctx,'levende cel: buizen splitsen en smelten samen',1500,450,C.grain,'center',20); ctx.restore(); }
  mitochondrion(ctx,M.x,M.y,M.len,0,1,6,t);
  label(ctx,'mitochondrium','energie komt hier vrij als ATP',M.x-200,M.y-150,420,210,ramp(t,q.at('mitochondriën'),0.5),C.text,'left');
  // inputs: glucose fragments (oker) + O2 (teal) in, ATP (koraal) out
  const ai=ramp(t,q.at('verbranding',1),0.5);
  if(ai>0){ particleFlow(ctx,[[300,700],[M.x-300,M.y+40]],6,t,70,C.oker,10,100,ai); particleFlow(ctx,[[300,520],[M.x-300,M.y-20]],6,t,80,C.teal,8,200,ai);
    label(ctx,'brokstukken van glucose','',330,700,330,790,ai); label(ctx,'zuurstof','',300,520,280,440,ai);
    particleFlow(ctx,[[M.x+280,M.y+90],[1650,760]],6,t,80,C.mens,8,350,ai); label(ctx,'koolstofdioxide','komt vrij bij de verbranding',1600,730,1380,820,ai,C.text,'left');
    const ao=ramp(t,q.at('atp'),0.5); particleFlow(ctx,[[M.x+300,M.y],[1600,330]],8,t,90,C.koraal,9,300,ao); label(ctx,'ATP','energiedrager van de cel',1560,345,1380,230,ao,C.text,'left'); }
  // cristae highlight
  const ac=ramp(t,q.at('cristae'),0.5); if(ac>0){ ctx.save(); ctx.globalAlpha=ac; ctx.strokeStyle=C.goud; ctx.lineWidth=3; const len=M.len,h=len*0.42,k=len/110,inset=6*k; for(let i=0;i<6;i++){ const px=M.x-len/2+inset+10*k+(len-2*inset-20*k)*(i+0.5)/6; const dir=i%2?1:-1; const y0=M.y+dir*(h/2-inset), depth=h*0.6, w=len/40; ctx.beginPath(); ctx.moveTo(px-w,y0); ctx.lineTo(px-w,y0-dir*depth); ctx.arc(px,y0-dir*depth,w,Math.PI,0,dir>0); ctx.lineTo(px+w,y0); ctx.stroke(); } ctx.restore(); label(ctx,'cristae','plooien van het binnenmembraan',M.x+60,M.y-100,1180,760,ac); }
  scaleBar(ctx);
},
s16(ctx,t,q,st){
  bg(ctx,'schema'); // two equal mitochondria: smooth vs folded; surface bars
  const y=480; const aa=ramp(t,0,0.5);
  mitochondrion(ctx,480,y,420,0,aa,0); mitochondrion(ctx,1150,y,420,0,aa,10);
  metaText(ctx,'glad',480,y+140,C.grain,'center',26); metaText(ctx,'geplooid',1150,y+140,C.grain,'center',26);
  const ab=ramp(t,q.at('vijf'),0.8); // surface bars
  if(ab>0){ ctx.save(); ctx.globalAlpha=ab; const base=680; ctx.fillStyle=C.fill; roundRect(ctx,380,base,200,30,6); ctx.fill(); roundRect(ctx,1050,base,200,30,6); ctx.fill(); ctx.fillStyle=C.goud; roundRect(ctx,380,base,200*0.2*ab,30,6); ctx.fill(); roundRect(ctx,1050,base,200*ab,30,6); ctx.fill(); metaText(ctx,'membraanoppervlak 1×',480,base+60,C.grain,'center',22); metaText(ctx,'membraanoppervlak ≈ 5× (levercel)',1150,base+60,C.grain,'center',22); ctx.restore(); }
  const ae=ramp(t,q.at('eiwitten',1),0.6); // ATP-making proteins as dots on inner membrane + ATP output
  if(ae>0){ ctx.save(); ctx.globalAlpha=ae; ctx.fillStyle=C.koraal; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(480-150+i*100,y-60,5,0,6.283); ctx.fill(); } for(let i=0;i<22;i++){ const px=1150-190+(i*18); const dir=i%2?1:-1; ctx.beginPath(); ctx.arc(px, y+dir*(30+ (i%3)*20),5,0,6.283); ctx.fill(); } ctx.restore();
    particleFlow(ctx,[[480,y-110],[480,250]],2,t,60,C.koraal,6,400,ae); particleFlow(ctx,[[1150,y-110],[1150,250]],10,t,60,C.koraal,6,500,ae); metaText(ctx,'ATP',480,230,C.koraal,'center',24); metaText(ctx,'ATP',1150,230,C.koraal,'center',24); }
  haak(ctx,280,1350,790,'meer plooien → meer oppervlak → meer ATP: de bouw maakt de functie mogelijk',C.groen,ramp(t,q.at('bouw'),0.6)*(1-ramp(t,q.at('hartspiercel'),0.5)));
  // hartspiercel vs huidcel
  const ah=ramp(t,q.at('hartspiercel'),0.6);
  if(ah>0){ ctx.save(); ctx.globalAlpha=ah; ctx.fillStyle=rgba(C.bgSchema,0.96); ctx.fillRect(0,0,W,CAPTION_Y);
    // two cells with mitochondria density
    for(const [cx,n,name,meta] of [[560,36,'hartspiercel','duizenden · een derde van het volume'],[1300,6,'huidcel','een paar honderd']]){ blob(ctx,cx,520,300,200,0.03,2); shape(ctx,C.bgMicro,C.er,1.5); for(let i=0;i<n;i++){ const a=hash(i*5+cx)*6.283, d=Math.sqrt(hash(i*5+1+cx)); mitochondrion(ctx,cx+Math.cos(a)*d*250,520+Math.sin(a)*d*160,46,hash(i)*3,1,3); } label(ctx,name,meta,cx,320,cx-200,250,1,C.text,'left'); metaText(ctx,'schematisch · aantallen niet op schaal',cx,760,C.text2,'center',22); }
    ctx.restore(); }
  const as=ramp(t,q.at('assimilatie'),0.5); if(as>0){ ctx.save(); ctx.globalAlpha=as; roundRect(ctx,560,800,800,80,12); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,'opbouw = assimilatie   ·   afbraak = dissimilatie',960,842,fTekst(34,600),C.text,'center'); ctx.restore(); }
},
s17(ctx,t,q,st){
  bg(ctx,'schema');
  const y=500; mitochondrion(ctx,560,y,520,0,1,16); mitochondrion(ctx,1360,y,520,0,1,3);
  label(ctx,'hartspiercel','dicht opeengepakte cristae',560,y-110,330,240,ramp(t,q.at('hartspiercel'),0.5),C.text,'left');
  label(ctx,'witte vetcel','maar een paar cristae',1360,y-110,1130,240,ramp(t,q.at('vetcel'),0.5),C.text,'left');
  const a2=ramp(t,q.at('twee'),0.5); if(a2>0){ metaText(ctx,'buitenmembraan · binnenmembraan (geplooid)',960,700,C.grain,'center',24); }
  haak(ctx,300,1620,760,'uit de bouw van één mitochondrium lees je af hoe hard de cel werkt',C.groen,ramp(t,q.at('raden'),0.5));
},
// ---------- H5: lysosomen en vacuole ----------
s18(ctx,t,q,st){
  bg(ctx,'micro'); // waste vesicle with old mitochondrion inside; lysosome approaches and fuses
  const tf=q.at('versmelt'), tb=q.at('bouwstenen'), tz=q.at('zuur');
  const wx=760, wy=520; const u=ramp(t,q.at('lysosomen'),Math.max(tf-q.at('lysosomen'),0.5));
  // waste blaasje
  const aw=ramp(t,q.at('afval',1),0.5); ctx.save(); ctx.globalAlpha=aw; ctx.beginPath(); ctx.arc(wx,wy,110,0,6.283); shape(ctx,rgba(C.ves,0.25),C.vesR,1.5); // old mitochondrion inside: grey-brown, dull
    const broken=ramp(t,tf+0.3,1.2); ctx.save(); ctx.globalAlpha*=1-broken; ctx.translate(wx,wy); ctx.rotate(0.3); const h=140*0.42; roundRect(ctx,-70,-h/2,140,h,h/2); shape(ctx,'#6E5A50','#8A7566',1.2); ctx.strokeStyle='#8A7566'; ctx.lineWidth=1.2; for(let i=0;i<4;i++){ const px=-50+i*32; ctx.beginPath(); ctx.moveTo(px,h/2-6); ctx.lineTo(px,-h*0.1); ctx.stroke(); } ctx.strokeStyle='#A08A7A'; ctx.lineWidth=2; ctx.beginPath(); for(let i=0;i<=10;i++) ctx.lineTo(-30+i*5,-50+Math.sin(i)*6); ctx.stroke(); ctx.beginPath(); for(let i=0;i<=10;i++) ctx.lineTo(10+i*5,55+Math.cos(i)*6); ctx.stroke(); ctx.restore();
    if(broken>0){ ctx.fillStyle=C.oker; for(let i=0;i<14;i++){ const a=hash(i*3)*6.283, d=hash(i*3+1)*80*broken; ctx.beginPath(); ctx.arc(wx+Math.cos(a)*d,wy+Math.sin(a)*d,4,0,6.283); ctx.fill(); } }
  ctx.restore();
  label(ctx,'afval in een blaasje','versleten mitochondrium',wx+80,wy-80,1080,250,aw*(1-broken));
  // lysosome
  const lx=lerp(300,wx-130,u), ly=lerp(640,wy+30,u); lysosome(ctx,lx,ly,40,aw);
  // enzymes inside lysosome as small marks
  ctx.save(); ctx.globalAlpha=aw; ctx.strokeStyle=lighten(C.lyso,0.5); ctx.lineWidth=2; for(let i=0;i<7;i++){ const a=hash(i*7)*6.283, d=hash(i*7+1)*22; const w=wander(i+600,t,3,3); ctx.beginPath(); ctx.moveTo(lx+Math.cos(a)*d+w.x-5,ly+Math.sin(a)*d+w.y); ctx.lineTo(lx+Math.cos(a)*d+w.x+5,ly+Math.sin(a)*d+w.y); ctx.stroke(); } ctx.restore();
  label(ctx,'lysosoom','blaasje vol afbraakenzymen',lx-20,ly+28,lx+40,ly+140,ramp(t,q.at('lysosomen'),0.5),C.text,'left');
  if(t>tb) haak(ctx,620,900,700,'de bouwstenen gebruikt de cel opnieuw',C.groen,ramp(t,tb,0.5));
  // pH gauge
  const az=ramp(t,tz,0.6); if(az>0){ ctx.save(); ctx.globalAlpha=az; roundRect(ctx,1250,380,520,260,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,'zuurgraad',1280,430,fTekst(32,600),C.text);
    const bx=1280,by=500,bw=460; ctx.fillStyle=C.fill; roundRect(ctx,bx,by,bw,22,11); ctx.fill(); for(const [ph,col,nm] of [[4.8,C.koraal,'lysosoom pH ≈ 4,8'],[7.2,C.teal,'cytoplasma pH ≈ 7,2']]){ const px=bx+bw*(ph-3)/6; ctx.fillStyle=col; ctx.beginPath(); ctx.arc(px,by+11,10,0,6.283); ctx.fill(); metaText(ctx,nm,px,by+(ph<6?62:-22),col,'center',24); }
    text(ctx,'de enzymen werken het best in zuur',1510,612,fTekst(30),C.text2,'center'); ctx.restore(); }
  scaleBar(ctx);
},
s20(ctx,t,q,st){
  bg(ctx,'micro'); // plant cell with large vacuole; water in; pressure arrows; wilt
  const cx=760, cy=520, rx=420, ry=300;
  const tw=q.at('water',1), tp=q.at('druk',1), tv=q.at('verliest'), th=q.at('homeostase');
  const back=ramp(t,th-2.0,1.0);
  const fill = t<tv ? lerp(0.65,0.92,ramp(t,tw,Math.max(tp-tw,0.5))) : lerp(lerp(0.92,0.5,ramp(t,tv,2.0)),0.92,back);
  const press = t<tv? ramp(t,tp,0.8) : lerp(1-ramp(t,tv,2.0),1,back);
  const shrink = t<tv?1:lerp(lerp(1,0.93,ramp(t,tv,2.0)),1,back);
  cellWall(ctx,cx,cy,rx+16,ry+16,1);
  membrane(ctx,cx,cy,rx*shrink,ry*shrink,C.er,0.02,3,0);
  vacuole(ctx,cx,cy,rx*0.8,ry*0.78,1,fill);
  chloroplast(ctx,cx-300,cy-180,90,1,0.4); chloroplast(ctx,cx+280,cy+170,90,1,-0.3); nucleus(ctx,cx+300,cy-150,60,1,t); mitochondrion(ctx,cx-320,cy+150,80,0.6); mitochondrion(ctx,cx+330,cy+20,70,-0.4);
  // water particles entering
  const aw=ramp(t,tw,0.5)*(t<tv?1:0); if(aw>0){ particleFlow(ctx,[[cx-rx-120,cy+60],[cx-rx*0.6,cy+40]],6,t,70,C.teal,5,700,aw); particleFlow(ctx,[[cx+rx+120,cy-60],[cx+rx*0.6,cy-40]],6,t,70,C.teal,5,800,aw); }
  // pressure arrows
  if(press>0){ ctx.save(); ctx.globalAlpha=press; ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; for(let i=0;i<8;i++){ const a=i/8*6.283; const x0=cx+Math.cos(a)*rx*0.5, y0=cy+Math.sin(a)*ry*0.5, x1=cx+Math.cos(a)*rx*0.82, y1=cy+Math.sin(a)*ry*0.82; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); const an=Math.atan2(y1-y0,x1-x0); ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x1-12*Math.cos(an-0.5),y1-12*Math.sin(an-0.5)); ctx.moveTo(x1,y1); ctx.lineTo(x1-12*Math.cos(an+0.5),y1-12*Math.sin(an+0.5)); ctx.stroke(); } ctx.restore(); }
  label(ctx,'vacuole','holte vol water',cx-150,cy-120,140,300,ramp(t,q.at('vacuole'),0.5),C.text,'left');
  label(ctx,'celwand','stevig · die zie je straks',cx+rx*0.7+10,cy+ry*0.72,1250,820,ramp(t,q.at('wand',1),0.5));
  // plant turgid / wilted pictogram (Schema icon) right
  const px=1500, py=620; ctx.save(); ctx.strokeStyle=C.groen; ctx.lineWidth=8; ctx.lineCap='round'; const droop=1-press; ctx.beginPath(); ctx.moveTo(px,py); ctx.quadraticCurveTo(px+40*droop,py-150+40*droop,px+120*droop,py-220+120*droop); ctx.stroke(); ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(px+10*droop,py-120+30*droop); ctx.quadraticCurveTo(px-60,py-170+60*droop,px-80+40*droop,py-130+90*droop); ctx.stroke(); ctx.restore(); metaText(ctx,press>0.5?'druk → stevig':'druk weg → slap',px,py+50,C.grain,'center',24);
  haak(ctx,300,1200,860,'afval opruimen en water vasthouden: zichzelf in evenwicht houden (homeostase)',C.groen,ramp(t,th-1.5,0.6));
  scaleBar(ctx);
},
// ---------- H6: membraan en cytoskelet ----------
s21(ctx,t,q,st){
  const tm=q.at('stilliggen');
  if(t<tm){ bg(ctx,'micro'); // membrane cross-section horizontal, selective passage, receptor + hormone
    const y=480; ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(200,y-16); ctx.lineTo(1700,y-16); ctx.moveTo(200,y+16); ctx.lineTo(1700,y+16); ctx.stroke(); ctx.fillStyle=C.er; for(let x=210;x<1700;x+=18){ ctx.beginPath(); ctx.arc(x,y-24,4,0,6.283); ctx.fill(); ctx.beginPath(); ctx.arc(x,y+24,4,0,6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(x,y-16); ctx.lineTo(x,y-4); ctx.moveTo(x,y+16); ctx.lineTo(x,y+4); ctx.lineWidth=1; ctx.stroke(); } ctx.restore();
    metaText(ctx,'buiten',220,y-60,C.grain,'left',24); metaText(ctx,'binnen',220,y+80,C.grain,'left',24);
    // particles: some pass (teal small), some bounce (oker big)
    const ap=ramp(t,q.at('sommige'),0.4); for(let k=0;k<10;k++){ const x=400+k*90; const ph=(t*0.5+hash(k))%1; const passes=k%3!=0; let py; if(passes){ py=lerp(y-200,y+200,ph); } else { py=y-30-Math.abs(Math.sin(ph*6.283))*170; } ctx.save(); ctx.globalAlpha=ap; ctx.fillStyle=passes?C.teal:C.oker; ctx.beginPath(); ctx.arc(x,py,passes?7:11,0,6.283); ctx.fill(); ctx.restore(); }
    // receptor + hormone
    const ah=ramp(t,q.at('hormoon'),0.5); if(ah>0){ ctx.save(); ctx.globalAlpha=ah; roundRect(ctx,1400,y-40,40,80,10); shape(ctx,C.mens,lighten(C.mens,0.3),1.2); ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.arc(1420,y-40,12,0,Math.PI,false); ctx.fill();
      const u=ramp(t,q.at('hormoon'),1.2); ctx.fillStyle=C.teal; ctx.beginPath(); ctx.arc(1420,lerp(y-220,y-44,u),12,0,6.283); ctx.fill(); ctx.restore(); label(ctx,'ontvanger-eiwit','past precies op één hormoon',1440,y+30,1300,600,ah,C.text,'right'); label(ctx,'hormoon','signaal van buiten',1420,y-200,1250,230,ah,C.text,'right');
      const ar=ramp(t,q.at('verandert'),0.5); if(ar>0){ ctx.save(); ctx.globalAlpha=ar; ctx.strokeStyle=C.goud; ctx.lineWidth=2; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.arc(1420,y+60,30+i*22+((t*40)%22),0.3,2.84); ctx.stroke(); } ctx.restore(); metaText(ctx,'de cel doet iets anders',1420,y+190,C.goud,'center',24); } }
    scaleBar(ctx);
  } else { // timelapse of the whole cell: everything moves
    bg(ctx,'micro'); const L=cellLayout(700,540,480,300); const mo=ramp(t,q.at('beweegt'),0.8);
    drawCell(ctx,L,t*(1+3*mo),{motion:mo, showSkel:t>q.at('netwerk')-0.3});
    const tl=ramp(t,q.at('beweegt'),0.5); if(tl>0){ ctx.save(); ctx.globalAlpha=tl; roundRect(ctx,1390,210,470,46,8); shape(ctx,rgba(C.bgSchema,0.9),C.line,1); metaText(ctx,'timelapse · ca. 100× versneld',1625,241,C.grain,'center',22); ctx.restore(); }
    label(ctx,'cytoskelet','netwerk van eiwitdraden',L.cx-200,L.cy-230,120,240,ramp(t,q.at('netwerk'),0.5),C.text,'left');
    // crawling cell + cilia pictograms
    const ak=ramp(t,q.at('kruipen'),0.5); if(ak>0){ ctx.save(); ctx.globalAlpha=ak; const s=Math.sin(t*2); blob(ctx,1650,300+s*4,70,42,0.12,5,t*3); shape(ctx,rgba(C.mens,0.5),C.er,1.2); ctx.strokeStyle=C.er; ctx.lineWidth=1.5; for(let i=0;i<9;i++){ const x=1580+i*17; ctx.beginPath(); ctx.moveTo(x,700); ctx.quadraticCurveTo(x+12*Math.sin(t*6+i),660,x+8*Math.sin(t*6+i+1),630); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(1560,700); ctx.lineTo(1740,700); ctx.stroke(); metaText(ctx,'kruipen',1650,380,C.grain,'center',22); metaText(ctx,'trilharen',1650,740,C.grain,'center',22); ctx.restore(); }
    scaleBar(ctx);
  }
},
s22(ctx,t,q,st){
  bg(ctx,'micro');
  // filament rail with motor protein walking a vesicle from ER (left) to golgi (right)
  roughER(ctx,330,440,260,3,0.8); golgi(ctx,1500,560,200,0.8);
  ctx.save(); ctx.strokeStyle=C.line; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(480,520); ctx.lineTo(1400,520); ctx.stroke(); ctx.lineWidth=2; for(let x=480;x<1400;x+=24){ ctx.beginPath(); ctx.moveTo(x,508); ctx.lineTo(x,532); ctx.stroke(); } ctx.restore();
  const drift=ramp(t,q.at('drijven'),0.5)*(1-ramp(t,q.at('motoreiwitten'),0.5)); if(drift>0){ const w=wander(1,t,40,1.5); vesicle(ctx,700+w.x,400+w.y,16,drift); metaText(ctx,'drijven: geen richting',700,330,C.grain,'center',22); }
  const am=ramp(t,q.at('motoreiwitten'),0.5); if(am>0){ const u=((t-q.at('motoreiwitten'))*0.12)%1; const x=lerp(520,1360,u); vesicle(ctx,x,470,16,am);
    ctx.save(); ctx.globalAlpha=am; ctx.strokeStyle=C.goud; ctx.lineWidth=3; const step=Math.sin(t*8); ctx.beginPath(); ctx.moveTo(x,486); ctx.lineTo(x,500); ctx.lineTo(x-10+6*step,518); ctx.moveTo(x,500); ctx.lineTo(x+10-6*step,518); ctx.stroke(); ctx.restore(); label(ctx,'motoreiwit','loopt over de draad',x,500,x+60,620,am,C.text,'left'); }
  label(ctx,'cytoskelet','rails door de cel',620,520,560,360,ramp(t,q.at('rails'),0.5),C.text,'left');
  scaleBar(ctx);
},
// ---------- H7: plantencel vs dierlijke cel (Schema comparison) ----------
s23(ctx,t,q,st){
  bg(ctx,'schema'); const base=800; ctx.strokeStyle=C.line; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(140,base); ctx.lineTo(1400,base); ctx.stroke();
  const A={cx:420,cy:520,rx:230,ry:230}, P={cx:1000,cy:520,rx:270,ry:260};
  const t3=q.at('extra'), tw=q.at('celwand'), tz=q.at('zeef'), tc=q.at('chloroplasten'), tv=q.at('vacuole',2);
  // animal cell
  membrane(ctx,A.cx,A.cy,A.rx,A.ry,C.er,0.05,2,0); nucleus(ctx,A.cx-50,A.cy-20,70,1,t); mitochondrion(ctx,A.cx+90,A.cy+90,80,0.4); mitochondrion(ctx,A.cx-110,A.cy+110,70,-0.4); roughER(ctx,A.cx+60,A.cy-120,140,2,1); golgi(ctx,A.cx+120,A.cy+10,80); lysosome(ctx,A.cx-150,A.cy+20,12);
  for(let i=0;i<25;i++){ const a=hash(i*5)*6.283,d=Math.sqrt(hash(i*5+1)); ribosome(ctx,A.cx+Math.cos(a)*d*200,A.cy+Math.sin(a)*d*200,0.8); }
  text(ctx,'dierlijke cel',A.cx,base+50,fTekst(34,600),C.text,'center');
  // plant cell (rectangular-ish)
  const aw=ramp(t,tw,0.6); cellWall(ctx,P.cx,P.cy,P.rx+16,P.ry+16,aw);
  membrane(ctx,P.cx,P.cy,P.rx,P.ry,C.er,0.02,3,0); const av=ramp(t,tv,0.6); vacuole(ctx,P.cx+20,P.cy+30,P.rx*0.55,P.ry*0.5,lerp(0.35,1,av),1);
  nucleus(ctx,P.cx-150,P.cy-110,60,1,t); mitochondrion(ctx,P.cx+150,P.cy-150,80,0.3); mitochondrion(ctx,P.cx-160,P.cy+130,70,-0.5); roughER(ctx,P.cx-60,P.cy-190,120,2,1); golgi(ctx,P.cx+170,P.cy+170,70);
  const ac=ramp(t,tc,0.6); chloroplast(ctx,P.cx-180,P.cy+20,90,ac,0.5); chloroplast(ctx,P.cx+190,P.cy-20,90,ac,-0.4); chloroplast(ctx,P.cx-20,P.cy+200,90,ac,0.1);
  for(let i=0;i<25;i++){ const a=hash(i*9)*6.283,d=Math.sqrt(hash(i*9+1)); ribosome(ctx,P.cx+Math.cos(a)*d*230,P.cy+Math.sin(a)*d*220,0.8); }
  text(ctx,'plantencel',P.cx,base+50,fTekst(34,600),C.text,'center');
  // extras labels
  label(ctx,'celwand','van cellulose',P.cx+P.rx+16,P.cy-120,1400,300,aw);
  label(ctx,'chloroplasten','bladgroenkorrels',P.cx+190,P.cy-20,1400,520,ac);
  label(ctx,'grote vacuole','holte vol water',P.cx+120,P.cy+120,1400,720,av);
  // sieve demo: particles stream through wall, membrane selects
  const az=ramp(t,tz,0.5)*(1-ramp(t,tc,0.5)); if(az>0){ ctx.save(); ctx.globalAlpha=az; for(let k=0;k<12;k++){ const u=((t*0.5+hash(k+900))%1); const x=lerp(P.cx-P.rx-140,P.cx-P.rx+60,u); const y=P.cy+ (hash(k)*2-1)*120; const stop = k%2 && u>0.78; ctx.fillStyle=k%2?C.oker:C.teal; ctx.beginPath(); ctx.arc(stop?P.cx-P.rx-6:x,y,k%2?12:8,0,6.283); ctx.fill(); } ctx.restore(); card(ctx,1300,560,560,170,'wand = zeef, membraan kiest','Alles stroomt door de celwand; alleen het membraan laat selectief door.',az,C.goud); }
  const aj=ramp(t,q.at('allebei',2),0.5)*(1-ramp(t,tc,0.5)); haak(ctx,P.cx-P.rx-30,P.cx+P.rx+30,base+70,'wand eromheen, membraan ertegenaan: allebei',C.groen,aj);
  const al=ramp(t,q.at('lysosomen'),0.5)*(1-ramp(t,t3,0.5)); if(al>0) label(ctx,'lysosoom','vooral in dierlijke cellen',A.cx-150,A.cy+20,140,330,al,C.text,'left');
  const ap=ramp(t,q.at('vast'),0.5)*(1-ramp(t,tw,0.5)); if(ap>0) card(ctx,1400,210,480,170,'een plant zit vast','en maakt zelf zijn voedsel. Dat zie je aan zijn cel: drie dingen extra.',ap,C.groen);
  const af=ramp(t,q.at('fotosynthese'),0.5)*(1-ramp(t,tv,0.4)); if(af>0) card(ctx,1300,560,560,150,'fotosynthese','lichtenergie + water + CO₂ → glucose',af,C.groen);
},
s25(ctx,t,q,st){
  bg(ctx,'schema');
  const night=ramp(t,q.at('donker'),1.0)*(1-ramp(t,q.at('mitochondrium'),0.8));
  // sun / moon
  ctx.save(); ctx.globalAlpha=1-night; ctx.fillStyle=C.goud; ctx.beginPath(); ctx.arc(960,290,60,0,6.283); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha=night; ctx.fillStyle=C.text2; ctx.beginPath(); ctx.arc(960,290,50,0,6.283); ctx.fill(); ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(985,275,45,0,6.283); ctx.fill(); ctx.restore();
  // chloroplast and mitochondrion with flows
  const hyp=1-ramp(t,q.at('mitochondrium'),0.8); chloroplast(ctx,760,520,260,1,0); mitochondrion(ctx,1260,520,260,0,lerp(1,0.3,hyp),6);
  const gl=1-night; particleFlow(ctx,[[900,520],[1120,520]],6,t,80,C.oker,9,1000,gl); metaText(ctx,'glucose',1010,480,C.oker,'center',24);
  particleFlow(ctx,[[1400,520],[1650,420]],8,t,90,C.koraal,8,1100,1-night*(hyp)); metaText(ctx,'ATP',1660,400,C.koraal,'center',24);
  if(night>0.3){ metaText(ctx,'geen licht → geen nieuwe glucose',760,680,C.koraal,'center',24); }
  label(ctx,'chloroplast','maakt glucose (alleen bij licht)',640,460,330,330,1,C.text,'left'); label(ctx,'mitochondrium','verbrandt glucose, dag en nacht',1380,460,1860,330,1,C.text,'right');
  haak(ctx,620,1420,720,'allebei nodig, in elke plantencel',C.groen,ramp(t,q.at('allebei'),0.5));
},
s26(ctx,t,q,st){
  bg(ctx,'micro');
  chloroplast(ctx,600,520,520,1,0);
  // grana zoom circle
  zoomCircle(ctx,1350,500,260,600,500,'granum: stapel schijfjes',ramp(t,q.at('grana'),0.6),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1090,240,520,520); for(let k=0;k<7;k++){ roundRect(ctx,1200,330+k*46,300,30,15); shape(ctx,C.chloro,lighten(C.chloro,0.3),1.5); }
    const ae=ramp(t,q.at('eiwitten'),0.5); if(ae>0){ ctx.fillStyle=C.goud; for(let k=0;k<7;k++){ for(let i=0;i<6;i++){ ctx.beginPath(); ctx.arc(1220+i*52,330+k*46,4,0,6.283); ctx.fill(); } } } });
  const al=ramp(t,q.at('licht',1),0.5); if(al>0){ particleFlow(ctx,[[900,150],[1250,320]],8,t,120,C.goud,4,1200,al); metaText(ctx,'licht',900,130,C.goud,'center',24); }
  haak(ctx,1120,1580,790,'veel oppervlak, veel licht · net als de cristae',C.groen,ramp(t,q.at('cristae'),0.5));
  scaleBar(ctx);
},
// ---------- Recap ----------
s27(ctx,t,q,st){
  bg(ctx,'schema');
  const rr=ramp(t,q.at('route'),0.6);
  // big board while recapping the kenmerken
  const bb=ramp(t,0.2,0.5)*(1-0.65*ramp(t,q.at('bacterie'),0.6))*(1-ramp(t,q.at('route'),0.6));
  if(bb>0){ ctx.save(); ctx.globalAlpha=bb; metaText(ctx,'levenskenmerken',W/2,200,C.grain,'center',26);
    KENMERKEN.forEach((k,i)=>{ const col=i%3,row=Math.floor(i/3); const x=300+col*460, y=260+row*150; const lit=ramp(t,q.at(['omzetten','Groeien','voortplanten','Bewegen','Reageren','evenwicht'][i]),0.4);
      roundRect(ctx,x,y,420,110,14); ctx.fillStyle=rgba(C.groen,0.08+0.18*lit); ctx.fill(); ctx.strokeStyle=rgba(C.groen,0.4+0.6*lit); ctx.lineWidth=1.5; ctx.stroke(); text(ctx,k,x+210,y+68,fTekst(34,600),lit>0.5?C.text:C.text2,'center'); }); ctx.restore(); }
  const ab=ramp(t,q.at('bacterie'),0.5)*(1-rr); if(ab>0){ card(ctx,300,600,1320,160,'één ruimte  →  afdelingen','Een bacterie doet alles in één ruimte. Jouw cel verdeelt het werk over organellen.',ab,C.teal); }
  const items=[['kern','bouwtekening'],['ribosomen','maken eiwit'],['ER','vouwen'],['golgisysteem','sorteert, verpakt'],['blaasjes','vervoer'],['membraan','poort']];
  items.forEach((it,i)=>{ const a=rr*ramp(t,q.at('route')+0.3*i,0.4); if(a<=0) return; const x=210+i*300; ctx.save(); ctx.globalAlpha=a; roundRect(ctx,x-125,440,250,110,14); shape(ctx,C.fill,C.goud,1); text(ctx,it[0],x,488,fTekst(32,600),C.text,'center'); metaText(ctx,it[1],x,524,C.grain,'center',18); if(i<5){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x+132,495); ctx.lineTo(x+168,495); ctx.lineTo(x+160,488); ctx.moveTo(x+168,495); ctx.lineTo(x+160,502); ctx.stroke(); } ctx.restore(); });
  haak(ctx,100,1800,640,'een fabriek die leeft',C.groen,ramp(t,q.at('fabriek'),0.5));
}
};
