// Scenes: one per narrated segment. draw(ctx, t, q, st): t = seconds into the take,
// q.at('woord', n) = start of the n-th word containing 'woord'; q.on('woord', n, d) = ramp 0..1 from that moment.

// shared simulations
const BOX=[180,150,1740,610];           // H2 diffusion box (Micro)
const MID=(BOX[0]+BOX[2])/2;
const SIM_DIFF=()=>sim('diff',{n:150,box:BOX,dur:80,sigma:6,seed:11,init:(i,r)=>[BOX[0]+8+r()*(MID-BOX[0]-16), BOX[1]+8+r()*(BOX[3]-BOX[1]-16)]});
const SIM_FREE=()=>sim('free',{n:34,box:[90,110,1830,870],dur:40,sigma:6,seed:3,init:(i,r)=>[200+r()*1520,180+r()*620]});
const SIM_COLD=()=>sim('cold',{n:22,box:[110,200,930,800],dur:40,sigma:2.2,seed:5,init:(i,r)=>[160+r()*720,240+r()*520]});
const SIM_WARM=()=>sim('warm',{n:22,box:[990,200,1810,800],dur:40,sigma:7.5,seed:6,init:(i,r)=>[1040+r()*720,240+r()*520]});
function countSides(S,t){ let L=0; for(let i=0;i<S.n;i++){ if(S.pos(i,t)[0]<MID) L++; } return [L,S.n-L]; }

function drawDiffBox(ctx,S,tt,t,opts={}){
  const {followA=0, trailLen=6, showLine=1, arrows=0, counts=0, dimDye=1}=opts;
  // frame
  roundRect(ctx,BOX[0]-18,BOX[1]-18,BOX[2]-BOX[0]+36,BOX[3]-BOX[1]+36,18); ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=1.5; ctx.stroke();
  waterField(ctx,BOX[0],BOX[1],BOX[2],BOX[3],260,t,1.4,0.35,40,2.6);
  if(showLine>0){ ctx.save(); ctx.globalAlpha=showLine; ctx.setLineDash([10,10]); ctx.strokeStyle=C.text2; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(MID,BOX[1]-30); ctx.lineTo(MID,BOX[3]+30); ctx.stroke(); ctx.restore(); }
  if(followA>0) trail(ctx,S,0,tt,trailLen,C.text,2.5,followA*0.8);
  for(let i=0;i<S.n;i++){ const p=S.pos(i,tt); dot(ctx,p[0],p[1],9,i===0&&followA>0?C.text:rgba(C.goud,dimDye),i===0&&followA>0?C.goud:null,3); }
  if(followA>0){ const p=S.pos(0,tt); ctx.save(); ctx.globalAlpha=followA; ctx.strokeStyle=C.text; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(p[0],p[1],20,0,6.2832); ctx.stroke(); ctx.restore(); }
  const [L,R]=countSides(S,tt);
  if(arrows>0){ const wL=3+18*L/S.n, wR=3+18*R/S.n; arrow(ctx,MID-110,BOX[3]+75,MID+110,BOX[3]+75,C.goud,wL,22+wL,arrows); arrow(ctx,MID+110,BOX[3]+140,MID-110,BOX[3]+140,C.goud,wR,22+wR,arrows);
    metaText(ctx,'naar rechts',MID-140,BOX[3]+84,C.grain,'right',22,); metaText(ctx,'terug',MID-140,BOX[3]+149,C.grain,'right',22); }
  if(counts>0){ ctx.save(); ctx.globalAlpha=counts; text(ctx,String(L),BOX[0]+40,BOX[3]+110,fTitel(64),C.goud,'left'); metaText(ctx,'deeltjes links',BOX[0]+40,BOX[3]+150,C.grain,'left',22);
    text(ctx,String(R),BOX[2]-40,BOX[3]+110,fTitel(64),C.goud,'right'); metaText(ctx,'deeltjes rechts',BOX[2]-40,BOX[3]+150,C.grain,'right',22); ctx.restore(); }
  return [L,R];
}

const SCENES = {
// ---------- Cold open: glas stil water + druppel kleurstof ----------
s01(ctx,t,q){
  bg(ctx,'schema');
  const gx=760, gTop=230, gBot=800, gw=420;
  // glass
  ctx.fillStyle=rgba(C.teal,0.16); ctx.fillRect(gx-gw/2+4,gTop+60,gw-8,gBot-gTop-64);
  ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(gx-gw/2,gTop); ctx.lineTo(gx-gw/2+14,gBot); ctx.lineTo(gx+gw/2-14,gBot); ctx.lineTo(gx+gw/2,gTop); ctx.stroke();
  // drop
  const td=q.at('druppel'); const fall=clamp((t-td)/0.7,0,1);
  if(t>=td-0.2 && fall<1){ dot(ctx,gx,lerp(120,gTop+70,fall*fall),12,C.goud,lighten(C.goud,0.3),1.5); }
  // spreading cloud: stages "vers" -> "na een uur" -> "uiteindelijk"
  const s1=ramp(t,td+0.7,0.6), s2=ramp(t,q.at('uur'),1.2), s3=ramp(t,q.at('Uiteindelijk'),1.6);
  if(s1>0){ ctx.save(); ctx.beginPath(); ctx.rect(gx-gw/2+6,gTop+62,gw-12,gBot-gTop-68); ctx.clip();
    for(let i=0;i<420;i++){ const a=hash(i*3)*6.2832, d=Math.sqrt(hash(i*3+1));
      const cx0=gx, cy0=gTop+120, rx=lerp(lerp(26,150,s2),gw*0.62,s3), ry=lerp(lerp(30,190,s2),330,s3);
      const ux=gx+(hash(i*3+2)*2-1)*(gw/2-14), uy=gTop+70+hash(i*7+3)*(gBot-gTop-80);
      let x=cx0+Math.cos(a)*d*rx, y=cy0+lerp(0,150,s2)*0.4+Math.sin(a)*d*ry; x=lerp(x,ux,s3); y=lerp(y,uy,s3);
      const w=wander(i,t,3,0.6); dot(ctx,x+w.x,y+w.y,3.2,rgba(C.goud,0.75*s1)); }
    ctx.restore(); }
  const tl=(s,x,y,a)=>{ if(a>0) metaText(ctx,s,x,y,C.grain,'left',26); };
  ctx.save(); ctx.globalAlpha=fadeIO(t,q.at('uur')+0.2,q.at('Uiteindelijk'),0.5); tl('na een uur',gx+gw/2+50,gTop+160,1); ctx.restore();
  ctx.save(); ctx.globalAlpha=ramp(t,q.at('Uiteindelijk')+0.4,0.5)*(1-ramp(t,q.at('Hoe'),0.4)); tl('uiteindelijk',gx+gw/2+50,gTop+160,1); ctx.restore();
  // spoon crossed: nobody stirred
  const ns=fadeIO(t,q.at('Niemand'),q.at('Hoe')+0.2,0.4); if(ns>0){ ctx.save(); ctx.globalAlpha=ns; ctx.strokeStyle=C.text2; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(1310,300); ctx.lineTo(1440,560); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1455,592,26,40,-0.46,0,6.2832); ctx.fillStyle=C.text2; ctx.fill(); ctx.restore(); crossOut(ctx,1390,450,90,ns); metaText(ctx,'niemand heeft geroerd',1390,640,C.grain,'center',24); }
  // magnifier: tease the particles
  const z=ramp(t,q.at('Hoe'),0.7);
  zoomCircle(ctx,1430,440,230,gx+90,gTop+330,'zoom in: deeltjes',z,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1190,200,480,480); waterField(ctx,1200,210,1660,670,160,t,2.4,0.6,7,3.2);
    for(let i=0;i<14;i++){ const w=wander(i+200,t,60,1.8); dot(ctx,1430+(hash(i+9)*2-1)*150+w.x,440+(hash(i+19)*2-1)*150+w.y,9,C.goud); } });
},
// ---------- H1: Alles beweegt ----------
s04(ctx,t,q){
  micro(ctx);
  const S=SIM_FREE(); const split=ramp(t,q.at('warmer'),0.6);
  const open=ease((t-0.1)/1.4); // zoom-in reveal
  if(split<1){ ctx.save(); ctx.globalAlpha=1-split; ctx.beginPath(); ctx.arc(960,490,lerp(60,1200,open),0,6.2832); ctx.clip();
    waterField(ctx,90,110,1830,870,520,t,2.6,0.55,3,3.2);
    const fa=ramp(t,q.at('Volg'),0.5);
    if(fa>0) trail(ctx,S,0,t,Math.min(8,t-q.at('Volg')+0.5),C.text,2.5,fa*0.85);
    for(let i=0;i<S.n;i++){ const p=S.pos(i,t); dot(ctx,p[0],p[1],10,i===0&&fa>0?C.text:C.goud,i===0&&fa>0?C.goud:null,3); }
    // hits on the followed particle by water molecules
    const hit=fadeIO(t,q.at('gestoten'),q.at('Niemand')+0.3,0.4); if(hit>0){ const p=S.pos(0,t); for(let k=0;k<6;k++){ const ph=(t*1.7+k/6)%1; const a=hash(k*13+Math.floor(t*1.7+k/6))*6.2832; const d=lerp(70,24,ph);
        ctx.save(); ctx.globalAlpha=hit*(1-ph); dot(ctx,p[0]+Math.cos(a)*d,p[1]+Math.sin(a)*d,5,C.teal); ctx.restore(); } label(ctx,'watermoleculen','stoten van alle kanten',p[0]+40,p[1]-30,p[0]<960?p[0]+280:p[0]-280,p[1]-150,hit,C.text); }
    if(fa>0){ const p=S.pos(0,t); label(ctx,'één kleurstofdeeltje','zonder plan',p[0],p[1],p[0]<960?1500:420,700,fadeIO(t,q.at('Volg')+0.3,q.at('gestoten'),0.4)); }
    ctx.restore();
    const lb=fadeIO(t,q.at('deeltjes')+0.2,q.at('Volg'),0.5); if(lb>0){ pill(ctx,960,830,'alles beweegt, altijd',C.goud,lb); }
    const bil=fadeIO(t,q.at('Biljoenen'),q.at('Volg'),0.4); if(bil>0) pill(ctx,960,830,'biljoenen botsingen per seconde',C.grain,bil,28);
    const ns=fadeIO(t,q.at('duwen'),q.at('gestoten'),0.4); if(ns>0) pill(ctx,960,830,'kleurstofdeeltjes duwen elkaar niet weg',C.goud,ns);
    const st=fadeIO(t,q.at('stuurt'),q.at('warmer'),0.4); if(st>0) pill(ctx,960,830,'niemand stuurt ze ergens heen',C.groen,st);
    const wm=fadeIO(t,q.at('warmer'),q.at('koud'),0.4); if(wm>0) pill(ctx,960,830,'warmer = sneller',C.koraal,wm);
  }
  if(split>0){ ctx.save(); ctx.globalAlpha=split; const Sc=SIM_COLD(), Sw=SIM_WARM(); const tt=t-q.at('warmer');
    roundRect(ctx,100,190,840,620,16); ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=1.5; ctx.stroke(); roundRect(ctx,980,190,840,620,16); ctx.strokeStyle=rgba(C.koraal,0.7); ctx.stroke();
    waterField(ctx,110,200,930,800,200,t,0.8,0.4,61,3); waterField(ctx,990,200,1810,800,200,t,3.2,0.4,62,3);
    trail(ctx,Sc,0,Math.max(0,tt),3,C.text,2,0.6); trail(ctx,Sw,0,Math.max(0,tt),3,C.text,2,0.6);
    for(let i=0;i<Sc.n;i++){ const p=Sc.pos(i,Math.max(0,tt)); dot(ctx,p[0],p[1],10,C.goud); } for(let i=0;i<Sw.n;i++){ const p=Sw.pos(i,Math.max(0,tt)); dot(ctx,p[0],p[1],10,C.goud); }
    thermometer(ctx,160,760,140,0.25,C.teal,1); thermometer(ctx,1040,760,140,0.85,C.koraal,1); pill(ctx,960,850,'warmer = sneller',C.koraal,1,28);
    metaText(ctx,'koud',520,160,C.teal,'center',30); metaText(ctx,'warm',1400,160,C.koraal,'center',30);
    ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H2: Van veel naar weinig ----------
s05(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const cvA=ramp(t,q.at('verschil'),0.5);
  // particles start moving at 'willekeurig'; before that they are frozen in the left half
  const t0=q.at('dwaalt'); const tt=Math.max(0,t-t0);
  const followA=fadeIO(t,q.at('gevolgde'),q.at('Toch'),0.5);
  const [L,R]=drawDiffBox(ctx,S,tt,t,{followA,trailLen:5,showLine:ramp(t,q.at('streep'),0.5),arrows:ramp(t,q.at('veel',2),0.6)*(1-cvA),counts:ramp(t,q.at('Links'),0.5)});
  label(ctx,'veel kleurstof','',BOX[0]+200,BOX[1]+60,BOX[0]+120,BOX[1]-60,fadeIO(t,q.at('veel'),q.at('streep'),0.5),C.text);
  if(followA>0){ const p=S.pos(0,tt); pill(ctx,960,BOX[1]-70,'dit deeltje weet niet dat het rechts leger is',C.text,followA,28); }
  const df=ramp(t,q.at('Diffusie',2),0.6)*(1-ramp(t,q.at('verschil'),0.5));
  card(ctx,420,230,1080,200,'diffusie','de netto verplaatsing van deeltjes van een hoge naar een lage concentratie',df,C.goud);
  const nt=fadeIO(t,q.at('netto'),q.at('Diffusie',2),0.4); if(nt>0) pill(ctx,960,BOX[1]-70,'netto: meer naar rechts dan terug',C.goud,nt);
  const cv=ramp(t,q.at('verschil'),0.5); if(cv>0){ ctx.save(); ctx.globalAlpha=cv; // little concentration bars
    const bx=MID, by=BOX[3]+170; roundRect(ctx,bx-170,by-150*(L/S.n)-6,120,150*(L/S.n)+6,6); ctx.fillStyle=rgba(C.goud,0.7); ctx.fill(); roundRect(ctx,bx+50,by-150*(R/S.n)-6,120,150*(R/S.n)+6,6); ctx.fill();
    metaText(ctx,'links',bx-110,by+30,C.grain,'center',20); metaText(ctx,'rechts',bx+110,by+30,C.grain,'center',20); ctx.restore();
    pill(ctx,MID+440,BOX[3]+90,'concentratieverschil',C.goud,cv,28); metaText(ctx,'= concentratiegradiënt',MID+440,BOX[3]+200,C.grain,'center',22*ramp(t,q.at('gradiënt'),0.4)||0.0001); }
},
s06(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const off=DUR('s05')-0; const t0s05=6; // continue from s05 (movement began ~6 s in)
  const tt=Math.max(0,off-5.9+t);
  drawDiffBox(ctx,S,tt,t,{showLine:1,arrows:1,counts:0});
  // live graph
  const g=ramp(t,0.2,0.6); if(g>0){ ctx.save(); ctx.globalAlpha=g; const gx=BOX[0], gy=BOX[3]+40, gw=1000, gh=200; roundRect(ctx,gx+380,gy,gw,gh+30,12); shape(ctx,rgba(C.bgSchema,0.92),C.line,1);
    const X=(s)=>gx+430+s/(tt+0.001)*(gw-100), Y=(f)=>gy+gh-10-f*(gh-50);
    for(const side of [0,1]){ ctx.beginPath(); for(let k=0;k<=40;k++){ const s=tt*k/40; const [l,r]=countSides(S,s); const f=(side?r:l)/S.n; k?ctx.lineTo(X(s),Y(f)):ctx.moveTo(X(s),Y(f)); } ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash(side?[10,8]:[]); ctx.stroke(); ctx.setLineDash([]); }
    metaText(ctx,'— links',gx+430,gy+44,C.goud,'left',26); metaText(ctx,'- - rechts',gx+620,gy+44,C.goud,'left',26); metaText(ctx,'tijd →',gx+gw+340,gy+gh+16,C.grain,'right',24);
    ctx.restore(); }
  const ns=fadeIO(t,q.at('netto'),q.at('Tot'),0.4); if(ns>0) pill(ctx,960,BOX[1]-70,'het verschil wordt kleiner, de netto stroom ook',C.goud,ns,28);
  const ev=ramp(t,q.at('evenveel'),0.5); if(ev>0) pill(ctx,960,BOX[1]-70,'en als links en rechts evenveel hebben?',C.text,ev,28);
},
s08(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const tt=DUR('s05')-5.9+DUR('s06')+8+t;
  const fa=ramp(t,q.at('gevolgde'),0.5);
  drawDiffBox(ctx,S,tt,t,{followA:fa,trailLen:4,showLine:1,arrows:ramp(t,q.at('evenveel'),0.5),counts:ramp(t,q.at('evenveel'),0.5)});
  pill(ctx,960,BOX[1]-70,'ze bewegen gewoon door',C.text,fadeIO(t,0.1,q.at('evenveel'),0.4),28);
  haak(ctx,MID-200,MID+200,BOX[3]+170,'',C.groen,0);
  pill(ctx,960,BOX[1]-70,'de tellers schommelen: gemiddeld evenveel',C.text,fadeIO(t,q.at('evenveel')+0.3,q.at('Netto'),0.4),28);
  const nn=ramp(t,q.at('Netto'),0.5); if(nn>0) pill(ctx,960,BOX[1]-70,'netto nul',C.groen,nn*(1-ramp(t,q.at('evenwicht'),0.4)),30);
  const ew=ramp(t,q.at('evenwicht')+0.3,0.5); if(ew>0) pill(ctx,960,BOX[1]-70,'evenwicht: evenveel heen als terug',C.groen,ew,30);
},
// ---------- H3: Wat maakt het sneller? ----------
s09(ctx,t,q){
  bg(ctx,'schema');
  const cellQ=ramp(t,q.at('cel'),0.6); const grid=1-cellQ;
  const P=[[100,100,'temperatuur','temperatuur'],[980,100,'concentratieverschil','concentratieverschil'],[100,500,'oppervlak','oppervlak'],[980,500,'afstand','afstand']];
  const pw=840, ph=370;
  const hd=fadeIO(t,0.1,q.at('sneller',2)-0.2,0.5); if(hd>0) pill(ctx,960,470,'wat maakt diffusie sneller?',C.goud,hd,40);
  P.forEach((p,i)=>{ const a=ramp(t,i===0?q.at('sneller',2):q.at(p[3]),0.5)*grid; if(a<=0.01) return; ctx.save(); ctx.globalAlpha=a; const x=p[0], y=p[1];
    roundRect(ctx,x,y,pw,ph,14); shape(ctx,rgba(C.fill,0.55),C.line,1); text(ctx,['1  hogere temperatuur','2  groter concentratieverschil','3  groter oppervlak','4  kleinere afstand'][i],x+30,y+56,fTekst(36,600),C.text,'left');
    const ix=x+30, iy=y+90, iw=pw-60, ih=ph-120;
    if(i===0){ thermometer(ctx,ix+40,iy+ih-20,ih-60,0.85,C.koraal); for(let k=0;k<10;k++){ const w=wander(k+300,t,90,2.6); dot(ctx,ix+380+(hash(k)*2-1)*260+w.x*0.6,iy+ih/2+(hash(k+5)*2-1)*80+w.y*0.4,10,C.goud); } metaText(ctx,'deeltjes sneller',ix+iw-10,iy+ih-6,C.grain,'right',20); }
    if(i===1){ for(const [k,steep] of [[0,1],[1,0]]){ const bx=ix+k*400; const hL=steep?ih-40:ih*0.55, hR=steep?20:ih*0.35; roundRect(ctx,bx+20,iy+ih-hL,90,hL,6); ctx.fillStyle=rgba(C.goud,0.7); ctx.fill(); roundRect(ctx,bx+220,iy+ih-hR,90,hR,6); ctx.fill(); arrow(ctx,bx+120,iy+ih/2,bx+210,iy+ih/2,C.goud,steep?10:3,steep?30:16); metaText(ctx,steep?'groot verschil':'klein verschil',bx+165,iy+ih+16,C.grain,'center',18); } }
    if(i===2){ for(const [k,wide] of [[0,0],[1,1]]){ const bx=ix+k*400; ctx.strokeStyle=C.er; ctx.lineWidth=6; const gapW=wide?200:40; ctx.beginPath(); ctx.moveTo(bx+20,iy+ih/2); ctx.lineTo(bx+170-gapW/2,iy+ih/2); ctx.moveTo(bx+170+gapW/2,iy+ih/2); ctx.lineTo(bx+320,iy+ih/2); ctx.stroke();
        for(let m=0;m<(wide?5:1);m++){ const u=((t*0.7+m*0.2+k*0.1)%1); dot(ctx,bx+170+(m-(wide?2:0))*36,lerp(iy+20,iy+ih-20,u),8,C.goud); } metaText(ctx,wide?'veel plek':'weinig plek',bx+170,iy+ih+16,C.grain,'center',18); } }
    if(i===3){ for(const [k,long] of [[0,0],[1,1]]){ const by=iy+20+k*120, len=long?640:180; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(ix+20,by+30); ctx.lineTo(ix+20+len,by+30); ctx.stroke();
        const u=((t/(long?6:1.2))%1); dot(ctx,ix+20+len*u,by+30+Math.sin(t*9+k)*10,9,C.goud); metaText(ctx,long?'lang: traag':'kort: snel',ix+20+len,by+8,C.grain,'right',20); } }
    ctx.restore(); });
  if(cellQ>0){ ctx.save(); ctx.globalAlpha=cellQ;
    const c1=[620,470], c2=[1300,470]; for(const [c,r,lab] of [[c1,120,'cel'],[c2,240,'twee keer zo dik']]){ blob(ctx,c[0],c[1],r,r,0.03,2); shape(ctx,rgba(C.fill,0.8),C.er,2.5); dot(ctx,c[0],c[1],7,C.text2); metaText(ctx,lab,c[0],c[1]+r+50,C.grain,'center',24); }
    const oz=ramp(t,q.at('zuurstof'),0.5); if(oz>0){ for(const [c,r] of [[c1,120],[c2,240]]){ arrow(ctx,c[0]-r-110,c[1]-40,c[0]-14,c[1]-6,C.teal,4,18,oz); o2(ctx,c[0]-r-140,c[1]-46,1,oz); } metaText(ctx,'zuurstof naar het midden',960,170,C.teal,'center',26); }
    ctx.restore(); }
},
s11(ctx,t,q){
  bg(ctx,'schema');
  const lungs=ramp(t,q.at('longblaasjes'),0.6);
  // part 1: random walk explains x² and times table
  const p1=1-lungs; if(p1>0){ ctx.save(); ctx.globalAlpha=p1;
    pill(ctx,960,150,'2 × zo ver  →  ongeveer 4 × zo lang',C.goud,ramp(t,0.1,0.5),34);
    // zigzag walk
    const wa=ramp(t,q.at('dwaalt'),0.5); if(wa>0){ const r=rng(99); let x=300,y=480; ctx.save(); ctx.globalAlpha*=wa; ctx.strokeStyle=C.text; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y); const N=Math.floor(clamp((t-q.at('dwaalt'))/4,0,1)*160);
      for(let k=0;k<N;k++){ x+=gauss(r)*22+1.2; y+=gauss(r)*22; y=clamp(y,300,660); ctx.lineTo(x,y); } ctx.stroke(); dot(ctx,x,y,10,C.goud); dot(ctx,300,480,6,C.text2); metaText(ctx,'start',300,520,C.grain,'center',20); ctx.restore();
      metaText(ctx,'heen en weer: verder komen gaat steeds trager',300,720,C.grain,'left',24); }
    const rows=[['door een cel','0,01 mm','paar honderdste seconde','zuurstof'],['een centimeter','10 mm','uren','centimeter']];
    rows.forEach((r,i)=>{ const a=ramp(t,q.at(r[3],1),0.5); if(a<=0) return; ctx.save(); ctx.globalAlpha*=a; const y=330+i*170; roundRect(ctx,1080,y,720,130,12); shape(ctx,rgba(C.fill,0.7),C.line,1);
      text(ctx,r[0],1110,y+56,fTekst(34,600),C.text,'left'); metaText(ctx,r[1],1110,y+100,C.grain,'left',20); text(ctx,r[2],1770,y+78,fTekst(34,600),C.goud,'right'); ctx.restore(); });
    const kl=ramp(t,q.at('klein'),0.5); if(kl>0) haak(ctx,1080,1800,680,'daarom zijn cellen klein',C.groen,kl);
    ctx.restore(); }
  if(lungs>0){ ctx.save(); ctx.globalAlpha=lungs;
    // macro lungs (left)
    const lx=420, ly=520; ctx.strokeStyle=C.line; ctx.lineWidth=10; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(lx,200); ctx.lineTo(lx,330); ctx.moveTo(lx,330); ctx.lineTo(lx-80,400); ctx.moveTo(lx,330); ctx.lineTo(lx+80,400); ctx.stroke();
    for(const s of [-1,1]){ blob(ctx,lx+s*140,ly,120,230,0.06,s+3); shape(ctx,rgba(C.koraal,0.25),lighten(C.koraal,0.2),2); }
    ctx.save(); ctx.globalAlpha*=1-ramp(t,q.at('badmintonveld'),0.4); metaText(ctx,'longen',lx,800,C.grain,'center',24); ctx.restore();
    // zoom into an alveolus
    zoomCircle(ctx,1250,470,330,lx+150,ly-60,'longblaasje met haarvat',1,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(900,120,700,700);
      blob(ctx,1180,440,210,200,0.05,4); shape(ctx,rgba(C.teal,0.10),C.er,3); metaText(ctx,'lucht',1150,440,C.grain,'center',24);
      // capillary along right side
      roundRect(ctx,1380,180,110,600,55); shape(ctx,rgba(C.bloed,0.45),C.bloedR,2); for(let k=0;k<6;k++){ const y=180+((t*60+k*100)%600); rbc(ctx,1435,y,26,0,0,0,0.9); }
      const inA=ramp(t,q.at('Zuurstof',2),0.5), outA=ramp(t,q.at('koolstofdioxide'),0.5);
      for(let k=0;k<5;k++){ const u=((t*0.35+k/5)%1); o2(ctx,lerp(1250,1430,u),300+k*80,1.4,inA*(u<0.85?1:(1-u)/0.15)); co2(ctx,lerp(1430,1240,u),340+k*80,1.2,outA*(u<0.85?1:(1-u)/0.15)); }
    });
    const fl=ramp(t,q.at('flinterdunne'),0.5); if(fl>0) label(ctx,'flinterdunne wand','ongeveer 0,0005 mm',1440,250,1880,105,fl,C.text,'right');
    const bm=ramp(t,q.at('badmintonveld'),0.5); if(bm>0){ ctx.save(); ctx.globalAlpha=bm; roundRect(ctx,140,770,200,90,4); ctx.strokeStyle=C.groen; ctx.lineWidth=2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(240,770); ctx.lineTo(240,860); ctx.stroke(); text(ctx,'samen ongeveer 70 m²',370,828,fTekst(30,600),C.groen,'left'); ctx.restore(); }
    const zo=ramp(t,q.at('Zuurstof',2),0.5); if(zo>0){ label(ctx,'zuurstof','het bloed in',1300,300,1880,640,zo*(1-ramp(t,q.at('koolstofdioxide'),0.4)),C.teal,'right'); }
    const both=ramp(t,q.at('Allebei'),0.5); if(both>0) pill(ctx,1250,860,'allebei door diffusie',C.groen,both,28);
    ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H4: Het celmembraan ----------
s12(ctx,t,q){
  micro(ctx); const my=500;
  const zoom=ramp(t,q.at('celmembraan'),0.8);
  // start: a cell; then zoom to a strip of membrane
  if(zoom<1){ ctx.save(); ctx.globalAlpha=1-zoom; blob(ctx,960,480,380,300,0.04,2); shape(ctx,rgba(C.fill,0.6),C.er,3); nucleus(ctx,880,450,70,1,t); metaText(ctx,'cel',960,840,C.grain,'center',24); ctx.restore(); }
  if(zoom>0){ ctx.save(); ctx.globalAlpha=zoom; metaText(ctx,'buiten de cel',140,300,C.grain,'left',24); metaText(ctx,'in de cel',140,720,C.grain,'left',24);
    bilayerH(ctx,100,1820,my,[],1,110);
    label(ctx,'celmembraan','dubbele laag vetachtige moleculen',640,my-46,720,250,ramp(t,q.at('dubbele'),0.5)*(1-ramp(t,q.at('Welke'),0.4)));
    ctx.restore(); }
  const sel=ramp(t,q.at('sommige'),0.5);
  if(sel>0){ // one O2 passes, one ion bounces
    const u=((t-q.at('sommige'))*0.35)%1; o2(ctx,1250,lerp(300,700,u),1.1,sel); const v=((t-q.at('sommige'))*0.5)%1; const yb=v<0.5? lerp(260,my-80,v*2): lerp(my-80,260,(v-0.5)*2); ion(ctx,1500,yb,1.1,sel);
    arrow(ctx,1300,330,1300,680,C.teal,3,14,sel*0.6); }
  const sd=ramp(t,q.at('selectief'),0.5); if(sd>0) pill(ctx,960,150,'selectief doorlatend',C.goud,sd*(1-ramp(t,q.at('Welke'),0.4)),34);
  const pm=ramp(t,q.at('permeabel'),0.4); if(pm>0){ ctx.save(); ctx.globalAlpha=pm*(1-ramp(t,q.at('Welke'),0.4)); metaText(ctx,'in je boek: selectief permeabel',960,225,C.grain,'center',24); ctx.restore(); }
  const qq=ramp(t,q.at('Welke'),0.5); if(qq>0){ ctx.save(); ctx.globalAlpha=qq; o2(ctx,600,220,1.3); ion(ctx,960,220,1.3); glucose(ctx,1320,220,1.3); metaText(ctx,'zuurstof',600,290,C.grain,'center',22); metaText(ctx,'natriumion',960,290,C.grain,'center',22); metaText(ctx,'glucose',1320,290,C.grain,'center',22); ctx.restore(); }
  scaleBar(ctx);
},
s14(ctx,t,q){
  micro(ctx); const my=520; const chX=1400, carX=1680;
  const showCh=ramp(t,q.at('kanaaltjes'),0.6), showCar=ramp(t,q.at('doorgang'),0.6);
  bilayerH(ctx,60,1860,my,[[chX-70,chX+70],[carX-70,carX+70]].filter((g,i)=>i===0?showCh>0:showCar>0),1,110);
  channelH(ctx,chX,my,30,showCh,C.enzym,130);
  if(showCar>0){ ctx.save(); ctx.globalAlpha=showCar; blob(ctx,carX,my,62,72,0.06,5); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); ctx.fillStyle=C.bgMicro; ctx.beginPath(); ctx.ellipse(carX,my,16,40,0,0,6.2832); ctx.fill(); ctx.restore(); }
  metaText(ctx,'buiten',80,170,C.grain,'left',22); metaText(ctx,'binnen',80,860,C.grain,'left',22);
  const lane=(x,a,fn)=>{ if(a>0) fn(x,a); };
  // O2 and CO2 pass through the lipid layer
  const ao=ramp(t,q.at('Zuurstof'),0.4); lane(240,ao,(x,a)=>{ for(let k=0;k<3;k++){ const u=((t*0.3+k/3)%1); o2(ctx,x+k*40,lerp(220,820,u),1,a); } metaText(ctx,'zuurstof',x+40,180,C.teal,'center',22); });
  const ac=ramp(t,q.at('koolstofdioxide'),0.4); lane(470,ac,(x,a)=>{ for(let k=0;k<3;k++){ const u=((t*0.3+k/3+0.5)%1); co2(ctx,x+k*40,lerp(820,220,u),0.9,a); } metaText(ctx,'koolstofdioxide',x+40,180,C.text2,'center',22); });
  const lp=ramp(t,q.at('glippen'),0.4)*(1-ramp(t,q.at('natriumion'),0.4)); if(lp>0) label(ctx,'klein en lost op in vet','glipt door de vetlaag',300,my,560,330,lp);
  // Na+ bounces (charge + water mantle)
  const an=ramp(t,q.at('natriumion'),0.4); lane(760,an,(x,a)=>{ const v=((t*0.45)%1); const y=v<0.5? lerp(220,my-95,ease(v*2)): lerp(my-95,220,ease((v-0.5)*2)); ion(ctx,x,y,1.2,a); metaText(ctx,'natriumion',x,180,C.oker,'center',22); });
  const ld=fadeIO(t,q.at('lading'),q.at('Glucose',2),0.4); if(ld>0) label(ctx,'lading + watermantel','komt niet door de vetlaag',790,300,1040,250,ld);
  const ag=ramp(t,q.at('Glucose',2),0.4); lane(1060,ag,(x,a)=>{ const v=((t*0.4+0.3)%1); const y=v<0.5? lerp(220,my-90,ease(v*2)): lerp(my-90,220,ease((v-0.5)*2)); glucose(ctx,x,y,1.3,a,t*0.5); metaText(ctx,'glucose',x,180,C.oker,'center',22); });
  const gz=fadeIO(t,q.at('zeef'),q.at('Water'),0.5); if(gz>0){ pill(ctx,700,880-40,'geen zeef: ook lading en vet tellen',C.goud,gz,28); }
  // water: a little through the lipid layer, mostly through channels
  const aw=ramp(t,q.at('Water'),0.4); if(aw>0){ const u=((t*0.25)%1); dot(ctx,1230,lerp(240,800,u),6,C.teal); for(let k=0;k<9;k++){ const uu=((t*0.6+k/9)%1); dot(ctx,chX,lerp(240,800,uu),6,C.teal); } metaText(ctx,'water',1300,180,C.teal,'center',22); }
  if(showCh>0) label(ctx,'kanaaltje','voor water',chX+40,my-50,chX+150,320,showCh*(1-ramp(t,q.at('Ook',2),0.4)),C.text,'right');
  if(showCar>0){ const u=((t*0.3)%1); glucose(ctx,carX,lerp(220,820,u),1.1,showCar,t); metaText(ctx,'glucose',carX,180,C.oker,'center',22); label(ctx,'eigen doorgang','van hoog naar laag',carX-50,my+60,carX-220,760,ramp(t,q.at('hoog'),0.4),C.text,'left'); }
  scaleBar(ctx);
},
s15(ctx,t,q){
  micro(ctx); const my=520, chX=560, carX=1360;
  bilayerH(ctx,60,1860,my,[[chX-80,chX+80],[carX-90,carX+90]],1,110);
  const ae=ramp(t,q.at('eiwitten'),0.5);
  // channel protein with single-file water
  channelH(ctx,chX,my,34,1,C.enzym,150);
  const ach=ramp(t,q.at('Kanaaleiwitten'),0.5); for(let k=0;k<10;k++){ const u=((t*0.5+k/10)%1); dot(ctx,chX,lerp(220,820,u),7,C.teal,null); }
  label(ctx,'kanaaleiwit','tunnel voor één soort deeltje',chX+50,my-60,chX+90,200,ach,C.text,'left');
  const wk=ramp(t,q.at('waterkanalen'),0.4); if(wk>0) metaText(ctx,'waterkanaal',chX,880-20,C.teal,'center',24);
  // carrier protein: cycle open-out -> bind -> flip -> release-in
  const ad=ramp(t,q.at('Dragereiwitten'),0.5); const cyc=((t-q.at('Dragereiwitten'))/4)%1; const flip=ad>0? (cyc<0.35?0: cyc<0.55? ease((cyc-0.35)/0.2):1):0;
  ctx.save(); ctx.globalAlpha=Math.max(0.5,ad); // two lobes that open up or down
  for(const s of [-1,1]){ ctx.save(); ctx.translate(carX+s*44,my); ctx.rotate(s*lerp(-0.25,0.25,flip)); roundRect(ctx,-38,-80,76,160,30); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); ctx.restore(); }
  ctx.restore();
  // glucose many outside, few inside (high -> low)
  for(let k=0;k<9;k++){ const w=wander(k+500,t,24,1); glucose(ctx,carX-260+k*65+w.x,300+(k%3)*45+w.y,0.9,0.9,k); }
  for(let k=0;k<2;k++){ const w=wander(k+520,t,30,1); glucose(ctx,carX-120+k*260+w.x,780+w.y,0.9,0.9,k); }
  if(ad>0){ const gy= cyc<0.35? lerp(360,my-40,ease(cyc/0.35)) : cyc<0.55? lerp(my-40,my+40,flip) : lerp(my+40,700,ease((cyc-0.55)/0.45)); glucose(ctx,carX,gy,1.2,ad*(cyc>0.95?(1-cyc)/0.05:1),0); }
  label(ctx,'dragereiwit','pakt glucose vast, zet hem binnen af',carX-70,my+40,carX-160,720,ad,C.text,'right');
  const gd=ramp(t,q.at('gefaciliteerde'),0.5); if(gd>0) pill(ctx,960,850,'gefaciliteerde diffusie: via een eiwit, van hoog naar laag',C.paars,gd*(1-ramp(t,q.at('Kost'),0.4)),28);
  const ka=ramp(t,q.at('Kost'),0.5); if(ka>0){ atp(ctx,960,850,ka,1.4); text(ctx,'?',1030,865,fTitel(56),C.koraal,'left'); }
  scaleBar(ctx);
},
s17(ctx,t,q){
  micro(ctx); const my=520, carX=960;
  bilayerH(ctx,60,1860,my,[[carX-90,carX+90]],1,110);
  const cyc=(t/4)%1; const flip=cyc<0.35?0: cyc<0.55? ease((cyc-0.35)/0.2):1;
  for(const s of [-1,1]){ ctx.save(); ctx.translate(carX+s*44,my); ctx.rotate(s*lerp(-0.25,0.25,flip)); roundRect(ctx,-38,-80,76,160,30); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); ctx.restore(); }
  const gy= cyc<0.35? lerp(360,my-40,ease(cyc/0.35)) : cyc<0.55? lerp(my-40,my+40,flip) : lerp(my+40,700,ease((cyc-0.55)/0.45)); glucose(ctx,carX,gy,1.2,1,0);
  atp(ctx,1300,300,1,1.4); crossOut(ctx,1300,300,50,ramp(t,0.1,0.4)); metaText(ctx,'geen ATP nodig',1300,380,C.grain,'center',24);
  const dg=ramp(t,q.at('doorgang'),0.4); if(dg>0) label(ctx,'alleen een doorgang','',carX-80,my,560,330,dg);
  const wl=ramp(t,q.at('willekeurig'),0.4); if(wl>0) pill(ctx,960,150,'de beweging komt van het willekeurig rondschieten',C.paars,wl*(1-ramp(t,q.at('Terug'),0.4)),28);
  scaleBar(ctx);
},
// ---------- H5: Osmose ----------
s18(ctx,t,q){
  bg(ctx,'schema'); const x0=280,x1=1640,y0=220,y1=780,mx=960;
  ctx.fillStyle=rgba(C.teal,0.14); ctx.fillRect(x0,y0,x1-x0,y1-y0); ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.strokeRect(x0,y0,x1-x0,y1-y0);
  const mm=ramp(t,q.at('membraan'),0.5); ctx.save(); ctx.globalAlpha=mm; ctx.strokeStyle=C.er; ctx.lineWidth=8; ctx.setLineDash([26,14]); ctx.beginPath(); ctx.moveTo(mx,y0); ctx.lineTo(mx,y1); ctx.stroke(); ctx.restore();
  waterField(ctx,x0+10,y0+10,mx-14,y1-10,170,t,2,0.6,80,4); waterField(ctx,mx+14,y0+10,x1-10,y1-10,150,t,2,0.6,81,4);
  const sa=ramp(t,q.at('zout',2),0.5); if(sa>0){ for(let k=0;k<26;k++){ const bx=mx+60+hash(k*3+400)*(x1-mx-100), by=y0+40+hash(k*3+401)*(y1-y0-80); const w=wander(k+400,t,40,1.2); let x=bx+w.x; if(x<mx+26){ x=2*(mx+26)-x; } salt(ctx,x,by+w.y,13,sa); } }
  label(ctx,'semipermeabel membraan','water wel, zout niet',mx,y0+40,mx-60,140,ramp(t,q.at('semipermeabel'),0.5)*(1-ramp(t,q.at('gebeurt'),0.4)),C.text,'left');
  const lz=ramp(t,q.at('zuiver'),0.5); if(lz>0) metaText(ctx,'zuiver water',(x0+mx)/2,y1+50,C.teal,'center',28*1);
  const rz=ramp(t,q.at('zout',2),0.5); if(rz>0) metaText(ctx,'zout water',(mx+x1)/2,y1+50,C.goud,'center',28*1);
  const nd=ramp(t,q.at('door',2),0.4); if(nd>0) pill(ctx,(mx+x1)/2,y0+70,'zout kan er niet door',C.goud,nd*(1-ramp(t,q.at('gebeurt'),0.4)),26);
  const qw=ramp(t,q.at('gebeurt'),0.5); if(qw>0) pill(ctx,960,150,'wat doet het water?',C.text,qw,30);
},
s20(ctx,t,q){
  bg(ctx,'schema'); const x0=280,x1=1640,y0=260,y1=780,mx=960;
  // levels: right side rises
  const rise=ramp(t,0.2,3)*60; ctx.fillStyle=rgba(C.teal,0.14); ctx.fillRect(x0,y0+60+rise,mx-x0,y1-y0-60-rise); ctx.fillRect(mx,y0+60-rise,x1-mx,y1-y0-60+rise);
  ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.lineTo(x1,y1); ctx.lineTo(x1,y0); ctx.stroke();
  ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=8; ctx.setLineDash([26,14]); ctx.beginPath(); ctx.moveTo(mx,y0); ctx.lineTo(mx,y1); ctx.stroke(); ctx.restore();
  for(let k=0;k<22;k++){ const bx=mx+60+hash(k*3+400)*(x1-mx-100), by=y0+120+hash(k*3+401)*(y1-y0-160); const w=wander(k+400,t,40,1.2); salt(ctx,Math.max(mx+26,bx+w.x),by+w.y,13); }
  arrow(ctx,mx-150,560,mx+150,560,C.teal,10,34,ramp(t,0.2,0.5)*(1-ramp(t,q.at('hoort'),0.4)*0.6));
  const wr=fadeIO(t,q.at('waarom'),q.at('hoort'),0.4); if(wr>0) pill(ctx,960,150,'maar waarom?',C.text,wr,34);
  // myth 1: salt pulls water (magnet) -> crossed
  const m1=fadeIO(t,q.at('hoort'),q.at('Of'),0.4); if(m1>0){ ctx.save(); ctx.globalAlpha=m1; ctx.strokeStyle=C.goud; ctx.lineWidth=22; ctx.lineCap='butt'; ctx.beginPath(); ctx.arc(1300,170,52,Math.PI,0); ctx.stroke(); ctx.fillStyle=C.koraal; ctx.fillRect(1226,166,26,30); ctx.fillRect(1348,166,26,30); ctx.restore(); text(ctx,'"zout trekt water aan"',1100,190,fTekst(34,600),C.text,'right'); crossOut(ctx,1300,170,70,m1*ramp(t,q.at('niet'),0.3)); }
  // myth 2: less water on the right -> difference far too small
  const m2=ramp(t,q.at('Of'),0.4); if(m2>0){ ctx.save(); ctx.globalAlpha=m2; text(ctx,'"rechts is minder water"',960,150,fTekst(34,600),C.text,'center');
    const bw=ramp(t,q.at('Rechts',3),0.5); if(bw>0){ ctx.globalAlpha=m2*bw; const by=180; roundRect(ctx,520,by,380,34,8); ctx.fillStyle=C.teal; ctx.fill(); roundRect(ctx,1020,by,374,34,8); ctx.fill(); metaText(ctx,'water links',710,by+64,C.grain,'center',20); metaText(ctx,'water rechts: een fractie minder',1207,by+64,C.grain,'center',20); }
    ctx.restore(); const tk=ramp(t,q.at('klein'),0.4); if(tk>0) pill(ctx,960,880-20,'verschil veel te klein voor zo’n sterke stroom',C.koraal,tk,28); }
},
s21(ctx,t,q){
  micro(ctx);
  const mx=960, y0=120, y1=860, pore=[465,535];
  const card1=ramp(t,q.at('osmose'),0.6); const dimA=1-0.5*card1;
  ctx.save(); ctx.globalAlpha=dimA;
  // left: pure water; right: water + salt
  waterField(ctx,80,y0,mx-40,y1,340,t,2.2,0.7,90,6);
  waterField(ctx,mx+40,y0,1840,y1,280,t,2.2,0.7,91,6);
  bilayerV(ctx,mx,y0,y1,[pore],1,80);
  // pore lining (channel)
  for(const s of [-1,1]){ roundRect(ctx,mx-50,s<0?pore[0]-40:pore[1],100,40,14); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); }
  // salt particles: background + "bouncers" hitting the pore mouth on the right
  const hsalt=(x,y,a=1)=>{ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let m=0;m<7;m++){ const an=m/7*6.2832; dot(ctx,x+Math.cos(an)*30,y+Math.sin(an)*30,6,C.teal); } salt(ctx,x,y,18); ctx.restore(); };
  for(let k=0;k<14;k++){ const bx=1180+hash(k*5+700)*620, by=y0+60+hash(k*5+701)*(y1-y0-120); const w=wander(k+700,t,50,1); hsalt(bx+w.x,by+w.y); }
  const hitA=ramp(t,q.at('botsen'),0.5);
  for(let b=0;b<3;b++){ const per=2.4, ph=((t+b*0.8)/per)%1; const yy=500+(b-1)*95; // approach -> hit at ph=0.5 -> recede
    const x= ph<0.5? lerp(1250,mx+82,ease(ph*2)) : lerp(mx+82,1250,ease((ph-0.5)*2)); hsalt(x,yy,hitA);
    const kick=ramp(t,q.at('terugkaatsen'),0.5)*hitA; if(kick>0 && ph>0.5 && ph<0.8){ const u=(ph-0.5)/0.3; arrow(ctx,mx+120+90*u,yy-40,mx+240+120*u,yy-40,C.goud,4,16,kick*(1-u)); // water pushed away
        for(let m=0;m<4;m++){ dot(ctx,mx+60+u*150+m*10,yy-12+m*8,6,C.teal,C.text,1.5); } } }
  // low pressure zone at right pore mouth
  const lowP=ramp(t,q.at('druk'),0.6); if(lowP>0){ const g=ctx.createRadialGradient(mx+50,500,10,mx+50,500,190); g.addColorStop(0,rgba(C.bgMicro,0.97*lowP)); g.addColorStop(0.7,rgba(C.bgMicro,0.6*lowP)); g.addColorStop(1,rgba(C.bgMicro,0)); ctx.fillStyle=g; ctx.fillRect(mx+40,300,260,400); ctx.save(); ctx.globalAlpha=lowP; ctx.setLineDash([8,8]); ctx.strokeStyle=C.text2; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(mx+120,500,110,140,0,-1.4,1.4); ctx.stroke(); ctx.restore(); }
  // flow through the pore (bulk stream) once explained
  const flow=ramp(t,q.at('stroomt'),0.6);
  for(let k=0;k<8;k++){ const u=((t*0.55+k/8)%1); const px= flow>0? lerp(mx-90,mx+120,u): mx-40+Math.sin(t*3+k)*14; const py=pore[0]+20+(k%2)*30; dot(ctx,px,py,6,C.teal,null); }
  if(flow>0) arrow(ctx,mx-220,500,mx+240,500,C.teal,12,40,flow*0.85);
  ctx.restore();
  // UI on top
  const pz=fadeIO(t,0.1,q.at('druk'),0.5); if(pz>0) label(ctx,'gaatje in het membraan','',mx-40,535,mx-360,720,pz*dimA,C.text,'left');
  const kz=fadeIO(t,q.at('kaatsen'),q.at('druk'),0.4); if(kz>0) pill(ctx,1400,190,'zout kaatst terug',C.goud,kz*dimA,28);
  const mz=fadeIO(t,q.at('nemen'),q.at('druk'),0.4); if(mz>0) pill(ctx,1400,800,'en neemt water mee, weg van het gaatje',C.goud,mz*dimA,26);
  if(lowP>0){ gauge(ctx,mx-260,250,74,lerp(0.5,0.75,ramp(t,q.at('harder'),0.6)),'druk links',lowP*dimA,C.teal); gauge(ctx,mx+260,250,74,lerp(0.5,0.3,lowP),'druk in de opening',lowP*dimA,C.teal);
    ctx.save(); ctx.globalAlpha=lowP*dimA; ctx.strokeStyle=C.line; ctx.lineWidth=0.75; ctx.beginPath(); ctx.moveTo(mx-260,290); ctx.lineTo(mx-60,470); ctx.moveTo(mx+260,290); ctx.lineTo(mx+60,470); ctx.stroke(); ctx.restore();
    pill(ctx,mx+330,700,'lagere druk in de opening',C.text,lowP*dimA*(1-ramp(t,q.at('stroomt'),0.4)),26); }
  const rz=ramp(t,q.at('rietje'),0.5); if(rz>0) pill(ctx,960,800,'water stroomt erdoorheen, als door een rietje',C.teal,rz*dimA,28);
  // definition + book bridge cards
  card(ctx,360,95,1200,200,'osmose','water gaat door een semipermeabel membraan naar de kant met de hoogste concentratie opgeloste deeltjes die er niet door kunnen',card1*(1-ramp(t,q.at('boek'),0.5)),C.goud);
  const bk=ramp(t,q.at('boek'),0.5); card(ctx,360,95,1200,160,'in je boek','naar de kant met de hoogste osmotische waarde · vaak "diffusie van water"',bk*(1-ramp(t,q.at('toets'),0.5)*0.0),C.text);
  const ts=ramp(t,q.at('toets'),0.5); card(ctx,360,640,1200,160,'op een toets','water gaat naar de kant met de hoogste osmotische waarde',ts,C.groen);
  const ww=ramp(t,q.at('waarom'),0.5); if(ww>0) pill(ctx,960,850,'jij weet nu ook waarom: een drukverschil bij het gaatje',C.groen,ww,28);
  scaleBar(ctx);
},
s22(ctx,t,q){
  bg(ctx,'schema');
  const cx=960, base=760, armW=200, gap=200, top=180; const lx=cx-gap/2-armW/2, rx=cx+gap/2+armW/2;
  const h0=330; const rise=ramp(t,q.at('stijgt'),4.5); const extra=ramp(t,q.at('Hoe',3),1.2);
  const dh=lerp(0,190,rise); const hL=h0-dh/2, hR=h0+dh/2;
  // liquid
  ctx.fillStyle=rgba(C.teal,0.25); ctx.fillRect(lx-armW/2,base-hL,armW,hL); ctx.fillRect(rx-armW/2,base-hR,armW,hR); ctx.fillRect(lx-armW/2,base,rx-lx+armW,80);
  // salt on right
  for(let k=0;k<12;k++){ const w=wander(k+800,t,14,1); salt(ctx,rx-70+hash(k*3+800)*140+w.x,base+40-hash(k*3+801)*(hR-30)+w.y*0.5,10); }
  // tube outline
  ctx.strokeStyle=C.line; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(lx-armW/2,top); ctx.lineTo(lx-armW/2,base+80); ctx.lineTo(rx+armW/2,base+80); ctx.lineTo(rx+armW/2,top); ctx.moveTo(lx+armW/2,top); ctx.lineTo(lx+armW/2,base); ctx.lineTo(rx-armW/2,base); ctx.lineTo(rx-armW/2,top); ctx.stroke();
  // membrane at bottom middle
  ctx.save(); ctx.strokeStyle=C.er; ctx.lineWidth=8; ctx.setLineDash([12,8]); ctx.beginPath(); ctx.moveTo(cx,base); ctx.lineTo(cx,base+80); ctx.stroke(); ctx.restore();
  metaText(ctx,'zuiver water',lx,base+130,C.teal,'center',24); metaText(ctx,'zout water',rx,base+130,C.goud,'center',24); label(ctx,'membraan','',cx,base+40,cx+300,base+60,ramp(t,0.2,0.5)*(1-ramp(t,q.at('stijgt'),0.4)));
  // arrows: osmosis (through membrane) vs column pushing back
  const flowA=(1-ramp(t,q.at('precies'),1.2)); arrow(ctx,cx-90,base+40,cx+90,base+40,C.teal,6+8*flowA,26,ramp(t,q.at('stijgt'),0.4)*Math.max(0.15,flowA));
  const back=ramp(t,q.at('kolom'),0.6); arrow(ctx,rx+armW/2+60,base-hR+20,rx+armW/2+60,base-20,C.text2,lerp(3,12,rise),26,back); if(back>0) metaText(ctx,'gewicht van de kolom duwt terug',rx+armW/2+90,base-hR/2,C.grain,'left',22);
  // height difference bracket
  const hd=ramp(t,q.at('hoogte'),0.5); if(hd>0){ ctx.save(); ctx.globalAlpha=hd; ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.setLineDash([8,6]); ctx.beginPath(); ctx.moveTo(lx-armW/2-20,base-hL); ctx.lineTo(rx+armW/2+20,base-hL); ctx.moveTo(lx-armW/2-20,base-hR); ctx.lineTo(rx+armW/2+20,base-hR); ctx.stroke(); ctx.restore(); metaText(ctx,'hoogteverschil',lx-armW/2-40,base-(hL+hR)/2,C.goud,'right',22); }
  const nn=ramp(t,q.at('Netto'),0.5); if(nn>0) pill(ctx,960,130,'netto geen stroom meer: evenwicht',C.groen,nn*(1-ramp(t,q.at('Hoe',3),0.4)),30);
  if(extra>0){ ctx.save(); ctx.globalAlpha=extra; ctx.setLineDash([6,6]); ctx.strokeStyle=C.goud; ctx.lineWidth=3; const hR2=hR+120; ctx.strokeRect(rx-armW/2,base-hR2,armW,hR2-hR); ctx.restore(); pill(ctx,960,130,'meer opgeloste deeltjes → hogere kolom',C.goud,extra,30); }
},
s23(ctx,t,q){
  bg(ctx,'micro');
  const kom=ramp(t,q.at('Strooi'),0.7); const cellA=1-kom;
  if(cellA>0){ ctx.save(); ctx.globalAlpha=cellA;
    const toSalt=ramp(t,q.at('uit'),3.4), toPure=ramp(t,q.at('zuiver'),1.2), swell=ramp(t,q.at('zwelt'),1.5);
    const p=toSalt*(1-toPure), v=lerp(0.6,0.82,swell), bulge=swell;
    const saltEnv=ramp(t,q.at('zout'),0.5)*(1-toPure);
    // environment particles around the cell
    for(let k=0;k<60;k++){ const a=hash(k*7)*6.2832, d=360+hash(k*7+1)*260; const w=wander(k+900,t,16,1); const x=760+Math.cos(a)*d*1.25+w.x, y=470+Math.sin(a)*d*0.8+w.y; if(y>860||y<90||x<60||x>1450) continue; if(k%2) salt(ctx,x,y,9,saltEnv); dot(ctx,x+20,y+10,4,rgba(C.teal,0.7)); }
    plantCell(ctx,760,470,560,420,p,v,1,bulge);
    // water arrows out (salt) / in (pure)
    const out=fadeIO(t,q.at('uit'),q.at('zuiver'),0.4); const inn=fadeIO(t,q.at('zuiver')+0.6,q.at('turgor'),0.4);
    for(let k=0;k<6;k++){ const a=k/6*6.2832+0.5; const r0=230, r1=360; const cx=760+Math.cos(a)*r0*1.2, cy=470+Math.sin(a)*r0*0.9, ex=760+Math.cos(a)*r1*1.25, ey=470+Math.sin(a)*r1*0.95;
      arrow(ctx,cx,cy,ex,ey,C.teal,4,16,out); arrow(ctx,ex,ey,cx,cy,C.teal,4,16,inn); }
    // turgor arrows: from inside pushing on the wall
    const tg=ramp(t,q.at('drukt'),0.5); for(let k=0;k<8;k++){ const a=k/8*6.2832; arrow(ctx,760+Math.cos(a)*150,470+Math.sin(a)*110,760+Math.cos(a)*255,470+Math.sin(a)*190,C.goud,3,14,tg*(1-ramp(t,q.at('Strooi'),0.3))); }
    pill(ctx,1520,150,'in zout water',C.goud,ramp(t,q.at('zout'),0.4)*clamp(1-2*toPure,0,1),28);
    pill(ctx,1520,150,'in zuiver water',C.teal,clamp(2*toPure-1,0,1),28);
    label(ctx,'celmembraan','laat los van de celwand',760+190,470-150,1300,300,ramp(t,q.at('celmembraan'),0.5)*(1-toPure),C.text,'right');
    label(ctx,'vacuole','krimpt',780,470,1300,520,fadeIO(t,q.at('vacuole'),q.at('celmembraan'),0.4),C.text,'right');
    const pl=fadeIO(t,q.at('plasmolyse'),q.at('zuiver'),0.4); if(pl>0) pill(ctx,760,830,'plasmolyse',C.goud,pl,32);
    const tu=ramp(t,q.at('turgor'),0.5); if(tu>0) pill(ctx,760,830,'turgor: de druk in de cel',C.goud,tu,30);
    label(ctx,'celwand','stevig, blijft staan',760-292,470+120,250,700,ramp(t,q.at('wand'),0.5)*(1-tg),C.text,'left'); label(ctx,'celwand','duwt terug',760-292,470+120,250,700,tg,C.groen,'left');
    const nb=ramp(t,q.at('Barsten'),0.5); if(nb>0) pill(ctx,1520,260,'barst niet: de celwand houdt hem tegen',C.groen,nb,26);
    ctx.restore(); }
  if(kom>0){ ctx.save(); ctx.globalAlpha=kom; bg(ctx,'schema');
    const pud=ramp(t,q.at('plasje'),1.2);
    if(pud>0){ ctx.beginPath(); ctx.ellipse(960,640,520,90*pud+10,0,0,6.2832); ctx.fillStyle=rgba(C.teal,0.35*pud); ctx.fill(); }
    for(let k=0;k<3;k++){ const x=640+k*320, y=520; ctx.beginPath(); ctx.ellipse(x,y,140,120,0,0,6.2832); shape(ctx,'#3F7A4A',C.groen,6); ctx.beginPath(); ctx.ellipse(x,y,110,92,0,0,6.2832); ctx.fillStyle='#BFD9A8'; ctx.fill();
      for(let s=0;s<8;s++){ const a=s/8*6.2832; ctx.beginPath(); ctx.ellipse(x+Math.cos(a)*40,y+Math.sin(a)*34,7,12,a,0,6.2832); ctx.fillStyle='#E8F0D0'; ctx.fill(); }
      for(let c=0;c<14;c++){ const sx=x-70+hash(k*30+c)*140, sy=y-60+hash(k*30+c+7)*120; ctx.fillStyle=C.text; ctx.fillRect(sx,sy,7,7); } }
    metaText(ctx,'plakjes komkommer met zout',960,260,C.grain,'center',26);
    if(pud>0) metaText(ctx,'na tien minuten: een plasje',960,780,C.teal,'center',26*1);
    ctx.restore(); }
  scaleBar(ctx,'schematisch');
},
s25(ctx,t,q){
  bg(ctx,'schema'); const rb=ramp(t,q.at('bloedcel'),0.7); const k1=1-rb;
  if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    // a row of slice cells losing water
    const shr=ramp(t,0.3,3);
    for(let i=0;i<4;i++){ plantCell(ctx,330+i*420,470,330,250,0.25+0.6*shr,0.6,1,0); for(const d of [-1,1]) for(const dx of [-60,60]){ arrow(ctx,330+i*420+dx,470+d*140,330+i*420+dx,470+d*215,C.teal,3,14,fadeIO(t,0.2,q.at('slap'),0.5)); } }
    pill(ctx,960,150,'buiten: hogere osmotische waarde dan het celvocht',C.goud,ramp(t,q.at('Buiten'),0.5),28);
    pill(ctx,960,800,'water gaat de cellen uit: de plakjes worden slap',C.teal,ramp(t,q.at('slap'),0.5),28);
    ctx.restore(); }
  if(rb>0){ ctx.save(); ctx.globalAlpha=rb; beaker(ctx,960,520,520,520,0.78,rgba(C.teal,0.18),1,ramp(t,q.at('zuiver'),0.4)>0?'zuiver water':''); rbc(ctx,960,560,90,0,0,0,1); label(ctx,'rode bloedcel','geen celwand',1030,520,1400,330,1,C.text,'right'); ctx.restore(); }
},
s27(ctx,t,q){
  bg(ctx,'schema');
  const L=560, R=1360;
  beaker(ctx,L,500,480,500,0.8,rgba(C.teal,0.18),1,'zuiver water'); beaker(ctx,R,500,480,500,0.8,rgba(C.goud,0.24),ramp(t,q.at('zout'),0.5),'zout water');
  const sw=ramp(t,0.1,1.6), bu=ramp(t,q.at('wand'),0.9);
  if(bu<=0) rbc(ctx,L,540,80,sw,0,0,1); else rbc(ctx,L,540,80,1,0,bu,1);
  for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,L+Math.cos(a)*200,540+Math.sin(a)*170,L+Math.cos(a)*115,540+Math.sin(a)*100,C.teal,3,14,fadeIO(t,0,q.at('wand')+0.4,0.3)); }
  const hm=ramp(t,q.at('hemolyse'),0.5); if(hm>0) pill(ctx,L,150,'hemolyse',C.koraal,hm,32);
  const nw=fadeIO(t,q.at('wand'),q.at('hemolyse'),0.4); if(nw>0) pill(ctx,L,150,'geen wand die terugduwt',C.text,nw,28);
  const kr=ramp(t,q.at('krimpt'),0.9); const za=ramp(t,q.at('zout'),0.5);
  if(za>0){ for(let k=0;k<16;k++){ const w=wander(k+950,t,20,1); salt(ctx,R-180+hash(k*3+950)*360+w.x,320+hash(k*3+951)*340+w.y,8,za); } rbc(ctx,R,540,80,0,kr,0,za);
    for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,R+Math.cos(a)*110,540+Math.sin(a)*95,R+Math.cos(a)*200,540+Math.sin(a)*170,C.teal,3,14,za*fadeIO(t,q.at('krimpt'),100,0.4)); } }
  const gk=ramp(t,q.at('gekarteld'),0.5); if(gk>0) pill(ctx,R,150,'krimpt en wordt gekarteld',C.goud,gk,28);
},
s28(ctx,t,q){
  bg(ctx,'schema'); const inf=ramp(t,q.at('infuus'),0.7); const colA=1-0.8*inf;
  const cols=[[360,'isotonisch','zelfde osmotische waarde','isotonisch',0],[960,'hypotonisch','lagere osmotische waarde','hypotonisch',1],[1560,'hypertonisch','hogere osmotische waarde','hypertonisch',-1]];
  ctx.save(); ctx.globalAlpha=colA;
  cols.forEach(([x,name,sub,cue,dir],i)=>{ const a=ramp(t,q.at(cue)-(i?1.6:3.2),0.6); if(a<=0) return; ctx.save(); ctx.globalAlpha*=a;
    beaker(ctx,x,520,380,420,0.8,rgba(dir<0?C.goud:C.teal,dir<0?0.24:0.18),1);
    const s=ramp(t,q.at(cue)+0.6,1.5); rbc(ctx,x,560,70,dir>0?s*0.9:0,dir<0?s:0,0,1);
    if(dir<0){ for(let k=0;k<12;k++){ salt(ctx,x-150+hash(k*3+990+i)*300,380+hash(k*3+991)*280,7); } }
    if(dir===0){ for(let k=0;k<5;k++){ salt(ctx,x-140+hash(k*3+995)*280,400+hash(k*3+996)*260,7); } arrow(ctx,x-170,560,x-95,560,C.teal,3,14); arrow(ctx,x-95,600,x-170,600,C.teal,3,14); }
    else for(let k=0;k<5;k++){ const an=k/5*6.2832+0.3; const r0=105, r1=170; if(dir>0) arrow(ctx,x+Math.cos(an)*r1,560+Math.sin(an)*r1*0.85,x+Math.cos(an)*r0,560+Math.sin(an)*r0*0.85,C.teal,3,14); else arrow(ctx,x+Math.cos(an)*r0,560+Math.sin(an)*r0*0.85,x+Math.cos(an)*r1,560+Math.sin(an)*r1*0.85,C.teal,3,14); }
    text(ctx,name,x,220,fTekst(40,600),C.text,'center'); metaText(ctx,sub,x,262,C.grain,'center',20); metaText(ctx,dir===0?'netto geen water in of uit':dir>0?'water gaat de cel in':'water gaat de cel uit',x,800,dir===0?C.groen:C.teal,'center',20);
    ctx.restore(); });
  ctx.restore();
  if(inf>0){ ctx.save(); ctx.globalAlpha=inf; // infusion bag
    const bx=700, by=420; ctx.fillStyle=rgba(C.bgSchema,0.9); ctx.fillRect(0,90,W,800); roundRect(ctx,bx-150,by-220,300,380,40); shape(ctx,rgba(C.teal,0.2),C.line,3); ctx.strokeStyle=C.line; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(bx,by+160); ctx.lineTo(bx,by+300); ctx.quadraticCurveTo(bx,by+380,bx+160,by+400); ctx.stroke();
    text(ctx,'infuus',bx,by-140,fTekst(40,600),C.text,'center');
    const ng=ramp(t,q.at('negen'),0.5); if(ng>0){ ctx.save(); ctx.globalAlpha*=ng; text(ctx,'9 g zout',bx,by-40,fTitel(56),C.goud,'center'); metaText(ctx,'per liter',bx,by+4,C.grain,'center',22); ctx.restore(); }
    const eb=ramp(t,q.at('bloed'),0.5); if(eb>0) pill(ctx,1340,330,'isotonisch: ongeveer even zout als je bloed',C.groen,eb,28);
    const zw=ramp(t,q.at('Zuiver'),0.5); if(zw>0){ pill(ctx,1340,470,'zuiver water (hypotonisch): bloedcellen barsten',C.koraal,zw,26); rbc(ctx,1340,640,56,ramp(t,q.at('Zuiver'),0.6),0,ramp(t,q.at('barsten'),0.8),zw); }
    ctx.restore(); }
},
// ---------- H6: Actief transport ----------
s29(ctx,t,q,state){
  bg(ctx,'schema'); const root=ramp(t,q.at('wortelhaarcel')+0.8,0.7);
  const ps=fadeIO(t,q.at('passief'),q.at('wortelhaarcel')+0.8,0.5); if(ps>0){ ctx.save(); ctx.globalAlpha=ps; pill(ctx,960,300,'passief transport',C.groen,1,40); metaText(ctx,(state&&state.niveau==='havo')?'diffusie · osmose':'diffusie · gefaciliteerde diffusie · osmose',960,390,C.grain,'center',24); metaText(ctx,'vanzelf, zonder energie van de cel',960,440,C.grain,'center',24); ctx.restore(); }
  const pre=1-ramp(t,q.at('passief')-0.2,0.5); if(pre>0){ ctx.save(); ctx.globalAlpha=pre; for(let k=0;k<12;k++){ const w=wander(k+1100,t,30,1.4); dot(ctx,500+k*80+w.x,500+w.y,9,C.goud); } arrow(ctx,700,620,1220,620,C.goud,6,24); metaText(ctx,'vanzelf: van hoog naar laag',960,690,C.grain,'center',24); ctx.restore(); }
  if(root>0){ ctx.save(); ctx.globalAlpha=root;
    ctx.fillStyle=rgba(C.bruin,0.45); ctx.fillRect(0,330,W,560); // soil
    for(let k=0;k<40;k++){ ctx.fillStyle=rgba(C.okerD,0.5); ctx.beginPath(); ctx.ellipse(hash(k*3)*W,360+hash(k*3+1)*500,30+hash(k)*40,16+hash(k+1)*20,hash(k+2)*3,0,6.2832); ctx.fill(); }
    // root with root hair cell
    roundRect(ctx,-40,150,W+80,190,40); shape(ctx,'#D8CDA8',lighten('#D8CDA8',0.3),2); metaText(ctx,'wortel',100,250,C.bgSchema,'left',24);
    ctx.beginPath(); ctx.moveTo(760,330); ctx.lineTo(760,700); ctx.quadraticCurveTo(820,770,880,700); ctx.lineTo(880,330); ctx.closePath(); shape(ctx,'#E6DDBE',C.line,2);
    // minerals: many inside, few outside
    for(let k=0;k<22;k++){ const w=wander(k+1200,t,8,0.8); dot(ctx,780+hash(k*3+1200)*80+w.x,360+hash(k*3+1201)*330+w.y,7,C.oker); }
    for(let k=0;k<6;k++){ const w=wander(k+1250,t,30,0.8); dot(ctx,300+hash(k*3+1250)*1300+w.x*2,460+hash(k*3+1251)*360+w.y,7,C.oker); }
    label(ctx,'wortelhaarcel','',880,520,1100,430,1,C.text,'left');
    const mm=ramp(t,q.at('meer'),0.5); if(mm>0){ pill(ctx,820,880-20,'binnen: veel mineralen',C.oker,mm,26); pill(ctx,1450,880-20,'buiten: weinig',C.oker,mm,26); }
    ctx.restore(); }
},
s31(ctx,t,q){
  micro(ctx); const my=470, pX=960;
  const lkX=pX-420; const stop0=ramp(t,q.at('Zonder'),0.6);
  bilayerH(ctx,60,1860,my,stop0>0?[[pX-100,pX+100],[lkX-70,lkX+70]]:[[pX-100,pX+100]],1,110); channelH(ctx,lkX,my,30,stop0,C.enzym,130);
  metaText(ctx,'buiten: weinig',80,200,C.grain,'left',22); metaText(ctx,'binnen: veel',80,800,C.grain,'left',22);
  for(let k=0;k<5;k++){ const w=wander(k+1300,t,40,1); dot(ctx,240+hash(k*3+1300)*1400+w.x,200+hash(k*3+1301)*150+w.y,9,C.oker); }
  for(let k=0;k<26;k++){ const w=wander(k+1350,t,30,1); const x=160+hash(k*3+1350)*1600+w.x; if(Math.abs(x-pX)<120) continue; dot(ctx,x,600+hash(k*3+1351)*230+w.y,9,C.oker); }
  const stop=ramp(t,q.at('Zonder'),0.6);
  const run=ramp(t,q.at('eiwit'),0.5)*(1-stop); const cyc=((t)/3)%1; const flip=cyc<0.35?0: cyc<0.55? ease((cyc-0.35)/0.2):1;
  for(const s of [-1,1]){ ctx.save(); ctx.translate(pX+s*48,my); ctx.rotate(s*lerp(-0.25,0.25,flip*run)); roundRect(ctx,-42,-90,84,180,32); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); ctx.restore(); }
  if(run>0){ const y= cyc<0.35? lerp(260,my-40,ease(cyc/0.35)) : cyc<0.55? lerp(my-40,my+40,flip) : lerp(my+40,700,ease((cyc-0.55)/0.45)); dot(ctx,pX,y,10,C.oker,null);
    const ea=ramp(t,q.at('ATP'),0.5); if(ea>0){ const near=cyc>0.25&&cyc<0.55; atp(ctx,pX+150-(near?60:0),my+120,ea*run,1.2); if(near) metaText(ctx,'energie',pX+260,my+130,C.koraal,'left',22); } }
  const tg=ramp(t,q.at('tegen'),0.5)*(1-stop); if(tg>0){ ctx.save(); ctx.globalAlpha=tg; metaText(ctx,'van weinig (buiten) naar veel (binnen):',pX+140,300,C.oker,'left',22); metaText(ctx,'tegen het concentratieverschil in',pX+140,334,C.oker,'left',22); ctx.restore(); }
  pill(ctx,960,150,'actief transport: kost ATP',C.koraal,ramp(t,q.at('actief'),0.5)*(1-stop),30);
  label(ctx,'pomp','eiwit in het membraan',pX-90,my-60,pX-420,300,ramp(t,q.at('pomp'),0.5)*(1-stop));
  if(stop>0){ atp(ctx,pX+170,my+120,stop,1.2); crossOut(ctx,pX+170,my+120,46,stop); pill(ctx,960,150,'geen ATP: de pomp staat stil',C.koraal,stop,30);
    const lk=ramp(t,q.at('lekken'),0.5); if(lk>0){ for(let k=0;k<3;k++){ const u=((t*0.25+k/3)%1); dot(ctx,lkX,lerp(720,230,u),9,C.oker); } metaText(ctx,'lekt langzaam terug via een kanaal',lkX+80,300,C.grain,'left',22); } }
  scaleBar(ctx);
},
s32(ctx,t,q){
  micro(ctx); const my=470, pX=960; const KC=C.paars;
  bilayerH(ctx,60,1860,my,[[pX-110,pX+110]],1,110);
  metaText(ctx,'buiten',80,200,C.grain,'left',22); metaText(ctx,'binnen',80,800,C.grain,'left',22);
  const on=ramp(t,q.at('natrium',2),0.5);
  // cycle 4 s: 0-0.45 three Na+ from inside out; 0.5-0.95 two K+ from outside in
  const cyc=on>0? ((t-q.at('natrium',2))/4)%1 : 0; const openOut= cyc<0.25?0: cyc<0.4? ease((cyc-0.25)/0.15) : cyc<0.6?1: cyc<0.75? 1-ease((cyc-0.6)/0.15):0;
  for(const s of [-1,1]){ ctx.save(); ctx.translate(pX+s*52,my); ctx.rotate(s*lerp(0.22,-0.22,openOut)); roundRect(ctx,-46,-95,92,190,34); shape(ctx,C.enzym,lighten(C.enzym,0.3),1.5); ctx.restore(); }
  if(on>0){ ctx.save(); ctx.globalAlpha=on;
    for(let k=0;k<3;k++){ const xx=pX-36+k*36; const y= cyc<0.2? lerp(740,my+30,ease(cyc/0.2)) : cyc<0.4? my+30 - 60*ease((cyc-0.2)/0.2) : lerp(my-30,240,ease((cyc-0.4)/0.15)); const a=cyc<0.55?1:Math.max(0,1-(cyc-0.55)/0.1); ion(ctx,xx,y,1.5,a,false,C.oker,'Na⁺'); }
    for(let k=0;k<2;k++){ const xx=pX-22+k*44; const c2=(cyc+0.5)%1; const y= c2<0.2? lerp(220,my-30,ease(c2/0.2)) : c2<0.4? my-30+60*ease((c2-0.2)/0.2) : lerp(my+30,740,ease((c2-0.4)/0.15)); const a=c2<0.55?1:Math.max(0,1-(c2-0.55)/0.1); ion(ctx,xx,y,1.5,a,false,KC,'K⁺'); }
    // ATP bound at the inside of the pump while Na+ is carried out
    const useA=cyc>0.12&&cyc<0.42; atp(ctx,pX,my+150,useA?1:0.35,1.1); if(!useA) metaText(ctx,'ADP',pX,my+210,C.grain,'center',20);
    ctx.restore(); }
  label(ctx,'3 Na⁺','naar buiten',pX+60,my-110,pX+330,230,on,C.oker,'left'); label(ctx,'2 K⁺','naar binnen',pX+60,my+110,pX+330,760,on,KC,'left');
  label(ctx,'natrium-kaliumpomp','in al je cellen',pX-100,my,pX-380,320,ramp(t,q.at('kaliumpomp'),0.5),C.text,'left');
  const za=ramp(t,q.at('ATP'),0.5); if(za>0) label(ctx,'ATP','energie voor elke ronde',pX-40,my+150,pX-380,700,za,C.koraal,'left');
  const zi=ramp(t,q.at('zenuwimpulsen'),0.5); if(zi>0) pill(ctx,960,150,'zie je terug bij zenuwimpulsen',C.paars,zi,28);
  scaleBar(ctx);
},
// ---------- Recap ----------
s33(ctx,t,q){
  bg(ctx,'schema'); const boat=ramp(t,q.at('vraag'),0.8); const pa=1-boat;
  if(pa>0){ ctx.save(); ctx.globalAlpha=pa;
    const P=[['alles beweegt','niemand stuurt','beweegt'],['diffusie','van veel naar weinig','diffusie'],['membraan','selectief doorlatend','celmembraan'],['osmose','naar de hoogste osmotische waarde','kaatst'],['actief transport','bergop, met ATP','bergop']];
    P.forEach((p,i)=>{ const a=ramp(t,q.at(p[2]),0.5); if(a<=0) return; const x=110+i*345, y=200, w=320, h=470; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y,w,h,14); shape(ctx,rgba(C.fill,0.6),C.line,1);
      const cx=x+w/2, cy=y+200;
      if(i===0){ for(let k=0;k<9;k++){ const ww=wander(k+1400,t,40,2.2); dot(ctx,cx+(hash(k)*2-1)*80+ww.x,cy+(hash(k+3)*2-1)*80+ww.y,9,C.goud); } }
      if(i===1){ for(let k=0;k<10;k++){ dot(ctx,cx-100+(k%3)*22,cy-60+Math.floor(k/3)*36,8,C.goud); } dot(ctx,cx+70,cy,8,C.goud); arrow(ctx,cx-30,cy,cx+50,cy,C.goud,5,18); }
      if(i===2){ ctx.strokeStyle=C.er; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(x+20,cy); ctx.lineTo(x+w-20,cy); ctx.stroke(); o2(ctx,cx-60,cy-60+((t*40)%120),1); ion(ctx,cx+60,cy-70,0.9); }
      if(i===3){ ctx.strokeStyle=C.er; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(cx,cy-130); ctx.lineTo(cx,cy-20); ctx.moveTo(cx,cy+20); ctx.lineTo(cx,cy+130); ctx.stroke(); salt(ctx,cx+60,cy-50,13); salt(ctx,cx+90,cy+40,13); arrow(ctx,cx-110,cy,cx+70,cy,C.teal,8,26); }
      if(i===4){ ctx.strokeStyle=C.er; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(x+20,cy); ctx.lineTo(x+w-20,cy); ctx.stroke(); arrow(ctx,cx,cy+110,cx,cy-110,C.oker,6,22); atp(ctx,cx+80,cy+60,1,1); }
      text(ctx,p[0],cx,y+h-110,fTekst(34,600),C.text,'center'); ctx.font=fTekst(24); ctx.fillStyle=C.text2; ctx.textAlign='center'; wrap(ctx,p[1],cx,y+h-66,w-40,30);
      ctx.restore(); });
    ctx.restore(); }
  if(boat>0){ ctx.save(); ctx.globalAlpha=boat; bg(ctx,'macro');
    ctx.fillStyle='#24456E'; ctx.fillRect(0,560,W,340); for(let k=0;k<7;k++){ ctx.strokeStyle=rgba(C.teal,0.5); ctx.lineWidth=3; ctx.beginPath(); for(let x=0;x<=W;x+=20){ const y=600+k*40+Math.sin(x/90+t*1.5+k)*8; x?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); }
    const by=560+Math.sin(t*1.3)*6; ctx.beginPath(); ctx.moveTo(760,by); ctx.lineTo(1160,by); ctx.lineTo(1100,by+70); ctx.lineTo(820,by+70); ctx.closePath(); shape(ctx,C.bruin,lighten(C.bruin,0.3),2);
    human(ctx,960,by+4,260,1,C.mens);
    const zt=ramp(t,q.at('dorst'),0.5); if(zt>0) pill(ctx,960,170,'dorst, en overal zeewater',C.text,zt*(1-ramp(t,q.at('zeewater'),0.4)),30);
    const zw=ramp(t,q.at('zeewater'),0.5); if(zw>0) pill(ctx,960,170,'mag je zeewater drinken?',C.goud,zw,30);
    ctx.restore(); }
},
s35(ctx,t,q){
  bg(ctx,'schema'); const cellPart=ramp(t,q.at('zouter'),0.7);
  const k1=1-cellPart; if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    // salt bars
    const bars=[['zeewater',3.5,C.goud],['bloed',0.9,C.bloed]]; bars.forEach((b,i)=>{ const y=200+i*110; const w=b[1]/3.5*900; roundRect(ctx,420,y,w*ramp(t,0.2+i*0.3,0.8),70,10); ctx.fillStyle=rgba(b[2],0.75); ctx.fill(); text(ctx,b[0],390,y+48,fTekst(34,600),C.text,'right'); metaText(ctx,(b[1]+'').replace('.',',')+' % zout',440+w,y+46,C.grain,'left',22); });
    pill(ctx,700,440,'ongeveer 4 × zo zout',C.goud,ramp(t,q.at('vier'),0.5),28);
    // kidney
    const kd=ramp(t,q.at('nieren'),0.5); if(kd>0){ ctx.save(); ctx.globalAlpha*=kd; ctx.beginPath(); ctx.ellipse(700,620,110,150,0,0,6.2832); shape(ctx,'#9A4A4A',lighten('#9A4A4A',0.3),2); ctx.beginPath(); ctx.ellipse(815,620,48,58,0,0,6.2832); ctx.fillStyle=C.bgSchema; ctx.fill(); metaText(ctx,'nier',700,810,C.grain,'center',22); ctx.restore();
      pill(ctx,1180,560,'een plas kan niet zo zout worden als zeewater',C.text,kd*(1-ramp(t,q.at('kwijt'),0.4)),26); }
    const kw=ramp(t,q.at('kwijt'),0.5); if(kw>0){ arrow(ctx,820,700,1060,760,C.teal,8,26,kw); pill(ctx,1320,640,'om het zout kwijt te raken: extra water nodig',C.teal,kw,26); const mm=ramp(t,q.at('meer'),0.5); if(mm>0) pill(ctx,1320,760,'je plast meer water uit dan je dronk',C.koraal,mm,26); }
    ctx.restore(); }
  if(cellPart>0){ ctx.save(); ctx.globalAlpha=cellPart; beaker(ctx,960,520,640,500,0.8,rgba(C.goud,0.15),1,'zouter bloed');
    for(let k=0;k<20;k++){ const w=wander(k+1500,t,20,1); salt(ctx,700+hash(k*3+1500)*520+w.x,330+hash(k*3+1501)*360+w.y,8); }
    const s=ramp(t,q.at('cellen'),1.5); rbc(ctx,960,540,90,0,s,0,1);
    for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,960+Math.cos(a)*120,540+Math.sin(a)*100,960+Math.cos(a)*220,540+Math.sin(a)*180,C.teal,3,14,ramp(t,q.at('verliezen'),0.4)); }
    pill(ctx,960,160,'je cellen verliezen water door osmose',C.teal,ramp(t,q.at('osmose'),0.5),30);
    ctx.restore(); }
}
};
