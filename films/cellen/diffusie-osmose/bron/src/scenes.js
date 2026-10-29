// Scenes (versie 2.0, beeld-remake 29 okt 2026): one per narrated segment. draw(ctx, t, q, st): t = seconds into the take,
// q.at('woord', n) = start of the n-th word containing 'woord'. Cue-woorden en timing gelijk aan 1.2; het beeld is opnieuw
// getekend met de beeldbank (membraanBoog, celRond, plantencel, rodeBloedcel, bloedvat, longblaasje, wortelHaren,
// eiwitVouw) en de moleculen uit scenes_mol.js (h2o, kleurstof, ionMol, glucoseMol, o2, co2, dragerEiwit, pompEiwit).

// shared simulations (ongewijzigd: de deeltjesbeweging is de kern van de film)
const BOX=[180,150,1740,610];           // H2 diffusion box (Micro)
const MID=(BOX[0]+BOX[2])/2;
const SIM_DIFF=()=>sim('diff',{n:150,box:BOX,dur:80,sigma:6,seed:11,init:(i,r)=>[BOX[0]+8+r()*(MID-BOX[0]-16), BOX[1]+8+r()*(BOX[3]-BOX[1]-16)]});
const SIM_FREE=()=>sim('free',{n:34,box:[90,110,1830,870],dur:40,sigma:6,seed:3,init:(i,r)=>[200+r()*1520,180+r()*620]});
const SIM_COLD=()=>sim('cold',{n:22,box:[110,200,930,800],dur:40,sigma:2.2,seed:5,init:(i,r)=>[160+r()*720,240+r()*520]});
const SIM_WARM=()=>sim('warm',{n:22,box:[990,200,1810,800],dur:40,sigma:7.5,seed:6,init:(i,r)=>[1040+r()*720,240+r()*520]});
function countSides(S,t){ let L=0; for(let i=0;i<S.n;i++){ if(S.pos(i,t)[0]<MID) L++; } return [L,S.n-L]; }
// draaiing van een gesimuleerd kleurstofmolecuul: volgt zijn eigen beweging een beetje
const draai=(i,t)=>hash(i*13+3)*6.283+t*(hash(i*7+1)-0.5)*1.4;

function drawDiffBox(ctx,S,tt,t,opts={}){
  const {followA=0, trailLen=6, showLine=1, arrows=0, counts=0}=opts;
  roundRect(ctx,BOX[0]-18,BOX[1]-18,BOX[2]-BOX[0]+36,BOX[3]-BOX[1]+36,22); ctx.strokeStyle=rgba(C.line,0.45); ctx.lineWidth=1.5; ctx.stroke();
  waterField(ctx,BOX[0],BOX[1],BOX[2],BOX[3],230,t,1.4,0.45,40,2.8);
  if(showLine>0){ ctx.save(); ctx.globalAlpha=showLine; ctx.setLineDash([10,10]); ctx.strokeStyle=C.text2; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(MID,BOX[1]-30); ctx.lineTo(MID,BOX[3]+30); ctx.stroke(); ctx.restore(); }
  if(followA>0) trail(ctx,S,0,tt,trailLen,C.text,2.5,followA*0.8);
  for(let i=0;i<S.n;i++){ const p=S.pos(i,tt); kleurstof(ctx,p[0],p[1],0.95,draai(i,tt),1,i===0&&followA>0.5); }
  const [L,R]=countSides(S,tt);
  if(arrows>0){ const wL=3+18*L/S.n, wR=3+18*R/S.n; arrow(ctx,MID-110,BOX[3]+75,MID+110,BOX[3]+75,C.goud,wL,22+wL,arrows); arrow(ctx,MID+110,BOX[3]+140,MID-110,BOX[3]+140,C.goud,wR,22+wR,arrows);
    ctx.save(); ctx.globalAlpha*=arrows; metaText(ctx,'naar rechts',MID-140,BOX[3]+84,C.grain,'right',26); metaText(ctx,'terug',MID-140,BOX[3]+149,C.grain,'right',26); ctx.restore(); }
  if(counts>0){ ctx.save(); ctx.globalAlpha=counts; text(ctx,String(L),BOX[0]+40,BOX[3]+110,fTitel(64),C.goud,'left'); metaText(ctx,'deeltjes links',BOX[0]+40,BOX[3]+150,C.grain,'left',26);
    text(ctx,String(R),BOX[2]-40,BOX[3]+110,fTitel(64),C.goud,'right'); metaText(ctx,'deeltjes rechts',BOX[2]-40,BOX[3]+150,C.grain,'right',26); ctx.restore(); }
  return [L,R];
}

// watermoleculen die door de waterkanalen in een verticaal membraan gaan (nR naar rechts, nL naar links); ys = hoogtes van de kanalen
function oversteek(ctx,mx,ys,t,nR,nL,a=1,sp0=0.28){ if(a<=0.01) return; const go=(k,dir)=>{ const sp=sp0+0.14*hash(k*7+900), u=((t*sp+hash(k*7+901))%1), y=ys[k%ys.length]+Math.sin(t*3+k)*2; const x=dir>0?lerp(mx-150,mx+150,u):lerp(mx+150,mx-150,u); const f=Math.min(1,u*5,(1-u)*5); h2o(ctx,x,y,5,t*2+k,a*f); }; for(let k=0;k<nR;k++) go(k,1); for(let k=0;k<nL;k++) go(k+50,-1); }
// membraan met overgangen: tekent de varianten (met/zonder eiwit of gat) met hun gewicht, zodat een eiwit rustig verschijnt
function memMix(ctx,y,x0,x1,t,opties){ // opties: [{gaten, kanalen, w}]
  opties.forEach(o=>{ if(o.w>0.01) memH(ctx,y,x0,x1,{t,gaten:o.gaten||[],kanalen:o.kanalen||[],a:o.w}); }); }
function cyclus(c){ // drager/pomp: 0..0.35 binden buiten, 0.35..0.55 omklappen, daarna loslaten binnen
  return c<0.35?0: c<0.55? ease((c-0.35)/0.2):1; }

const SCENES = {
// ---------- Cold open: glas stil water + druppel kleurstof ----------
s01(ctx,t,q){
  bg(ctx,'schema');
  const gx=760, gTop=230, gBot=800, gw=420;
  ctx.fillStyle=rgba(C.teal,0.16); ctx.beginPath(); ctx.moveTo(gx-gw/2+4,gTop+60); ctx.lineTo(gx-gw/2+16,gBot-4); ctx.lineTo(gx+gw/2-16,gBot-4); ctx.lineTo(gx+gw/2-4,gTop+60); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(gx-gw/2,gTop); ctx.lineTo(gx-gw/2+14,gBot); ctx.lineTo(gx+gw/2-14,gBot); ctx.lineTo(gx+gw/2,gTop); ctx.stroke();
  const td=q.at('druppel'); const fall=clamp((t-td)/0.7,0,1);
  if(t>=td-0.2 && fall<1){ ctx.beginPath(); ctx.ellipse(gx,lerp(120,gTop+70,fall*fall),10,13,0,0,6.283); shape(ctx,C.goud,lighten(C.goud,0.3),1.5); }
  const s1=ramp(t,td+0.7,0.6), s2=ramp(t,q.at('uur'),1.2), s3=ramp(t,q.at('Uiteindelijk'),1.6);
  if(s1>0){ ctx.save(); ctx.beginPath(); ctx.rect(gx-gw/2+8,gTop+62,gw-16,gBot-gTop-68); ctx.clip();
    for(let i=0;i<420;i++){ const a=hash(i*3)*6.2832, d=Math.sqrt(hash(i*3+1));
      const cx0=gx, cy0=gTop+120, rx=lerp(lerp(26,150,s2),gw*0.62,s3), ry=lerp(lerp(30,190,s2),330,s3);
      const ux=gx+(hash(i*3+2)*2-1)*(gw/2-14), uy=gTop+70+hash(i*7+3)*(gBot-gTop-80);
      let x=cx0+Math.cos(a)*d*rx, y=cy0+lerp(0,150,s2)*0.4+Math.sin(a)*d*ry; x=lerp(x,ux,s3); y=lerp(y,uy,s3);
      const w=wander(i,t,3,0.6); dot(ctx,x+w.x,y+w.y,3,rgba(C.goud,0.7*s1)); }
    ctx.restore(); }
  const tl=(s,x,y)=>metaText(ctx,s,x,y,C.grain,'left',26);
  ctx.save(); ctx.globalAlpha=fadeIO(t,q.at('uur')+0.2,q.at('Uiteindelijk'),0.5); tl('na een uur',gx+gw/2+50,gTop+160); ctx.restore();
  ctx.save(); ctx.globalAlpha=ramp(t,q.at('Uiteindelijk')+0.4,0.5)*(1-ramp(t,q.at('Hoe'),0.4)); tl('uiteindelijk',gx+gw/2+50,gTop+160); ctx.restore();
  const ns=fadeIO(t,q.at('Niemand'),q.at('Hoe')+0.2,0.4); if(ns>0){ ctx.save(); ctx.globalAlpha=ns; ctx.strokeStyle=C.text2; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(1310,300); ctx.lineTo(1440,560); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1455,592,26,40,-0.46,0,6.2832); ctx.fillStyle=C.text2; ctx.fill(); ctx.restore(); crossOut(ctx,1390,450,90,ns); ctx.save(); ctx.globalAlpha=ns; metaText(ctx,'niemand heeft geroerd',1390,670,C.grain,'center',26); ctx.restore(); }
  // zoomcirkel: de deeltjes zelf (kleurstofmoleculen tussen watermoleculen)
  const z=ramp(t,q.at('Hoe'),0.7);
  zoomCircle(ctx,1430,440,230,gx+90,gTop+330,'ingezoomd: moleculen',z,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1190,200,480,480); waterField(ctx,1200,210,1660,670,150,t,2.4,0.75,7,4.2);
    for(let i=0;i<12;i++){ const w=wander(i+200,t,60,1.8); kleurstof(ctx,1430+(hash(i+9)*2-1)*150+w.x,440+(hash(i+19)*2-1)*150+w.y,1.3,t*0.6+i); } });
},
// ---------- H1: Alles beweegt ----------
s04(ctx,t,q){
  micro(ctx);
  const S=SIM_FREE(); const split=ramp(t,q.at('warmer'),0.6);
  const open=ease((t-0.1)/1.4);
  if(split<1){ ctx.save(); ctx.globalAlpha=1-split; ctx.beginPath(); ctx.arc(960,490,lerp(60,1200,open),0,6.2832); ctx.clip();
    waterField(ctx,90,110,1830,870,380,t,2.6,0.6,3,3.6);
    const fa=ramp(t,q.at('Volg'),0.5);
    if(fa>0) trail(ctx,S,0,t,Math.min(8,t-q.at('Volg')+0.5),C.text,2.5,fa*0.85);
    for(let i=0;i<S.n;i++){ const p=S.pos(i,t); kleurstof(ctx,p[0],p[1],1.25,draai(i,t),1,i===0&&fa>0.5); }
    // watermoleculen die het gevolgde deeltje van alle kanten raken
    const hit=fadeIO(t,q.at('gestoten'),q.at('Niemand')+0.3,0.4); if(hit>0){ const p=S.pos(0,t); for(let k=0;k<6;k++){ const ph=(t*1.7+k/6)%1; const a=hash(k*13+Math.floor(t*1.7+k/6))*6.2832; const d=lerp(80,26,ph);
        h2o(ctx,p[0]+Math.cos(a)*d,p[1]+Math.sin(a)*d,6.5,a+Math.PI/2,hit*(1-ph)); } label(ctx,'watermoleculen','stoten van alle kanten',p[0]+40,p[1]-30,p[0]<960?p[0]+280:p[0]-280,p[1]-150,hit,C.text); }
    if(fa>0){ const p=S.pos(0,t); label(ctx,'één kleurstofdeeltje','zonder plan',p[0],p[1],p[0]<960?1500:420,700,fadeIO(t,q.at('Volg')+0.3,q.at('gestoten'),0.4)); }
    ctx.restore();
    const lb=fadeIO(t,q.at('deeltjes')+0.2,q.at('Volg'),0.5); if(lb>0){ pill(ctx,960,830,'alles beweegt, altijd',C.goud,lb); }
    const bil=fadeIO(t,q.at('Biljoenen'),q.at('Volg'),0.4); if(bil>0) pill(ctx,960,830,'biljoenen botsingen per seconde',C.grain,bil,28);
    const ns=fadeIO(t,q.at('duwen'),q.at('gestoten'),0.4); if(ns>0) pill(ctx,960,830,'kleurstofdeeltjes duwen elkaar niet weg',C.goud,ns);
    const st=fadeIO(t,q.at('stuurt'),q.at('warmer'),0.4); if(st>0) pill(ctx,960,830,'niemand stuurt ze ergens heen',C.groen,st);
    const wm=fadeIO(t,q.at('warmer'),q.at('koud'),0.4); if(wm>0) pill(ctx,960,830,'warmer = sneller',C.koraal,wm);
  }
  if(split>0){ ctx.save(); ctx.globalAlpha=split; const Sc=SIM_COLD(), Sw=SIM_WARM(); const tt=Math.max(0,t-q.at('warmer'));
    roundRect(ctx,100,190,840,620,22); ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=1.5; ctx.stroke(); roundRect(ctx,980,190,840,620,22); ctx.strokeStyle=rgba(C.koraal,0.7); ctx.stroke();
    waterField(ctx,120,210,920,790,150,t,0.8,0.5,61,3.4); waterField(ctx,1000,210,1800,790,150,t,3.2,0.5,62,3.4);
    trail(ctx,Sc,0,tt,3,C.text,2,0.6); trail(ctx,Sw,0,tt,3,C.text,2,0.6);
    for(let i=0;i<Sc.n;i++){ const p=Sc.pos(i,tt); kleurstof(ctx,p[0],p[1],1.25,draai(i,tt*0.4)); } for(let i=0;i<Sw.n;i++){ const p=Sw.pos(i,tt); kleurstof(ctx,p[0],p[1],1.25,draai(i,tt*1.6)); }
    thermometer(ctx,160,760,140,0.25,C.teal,1); thermometer(ctx,1040,760,140,0.85,C.koraal,1); pill(ctx,960,850,'warmer = sneller',C.koraal,1,28);
    metaText(ctx,'koud',520,160,C.teal,'center',30); metaText(ctx,'warm',1400,160,C.koraal,'center',30);
    ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H2: Van veel naar weinig ----------
s05(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const cvA=ramp(t,q.at('verschil'),0.5);
  const t0=q.at('dwaalt'); const tt=Math.max(0,t-t0);
  const followA=fadeIO(t,q.at('gevolgde'),q.at('Toch'),0.5);
  const [L,R]=drawDiffBox(ctx,S,tt,t,{followA,trailLen:5,showLine:ramp(t,q.at('streep'),0.5),arrows:ramp(t,q.at('veel',2),0.6)*(1-cvA),counts:ramp(t,q.at('Links'),0.5)});
  naamBij(ctx,'veel kleurstof','',BOX[0]+10,BOX[1]-30,fadeIO(t,q.at('veel'),q.at('streep'),0.5),'left',C.text);
  if(followA>0) pill(ctx,960,BOX[1]-70,'dit deeltje weet niet dat het rechts leger is',C.text,followA,28);
  const df=ramp(t,q.at('Diffusie',2),0.6)*(1-ramp(t,q.at('verschil'),0.5));
  card(ctx,420,230,1080,200,'diffusie','de netto verplaatsing van deeltjes van een hoge naar een lage concentratie',df,C.goud);
  const nt=fadeIO(t,q.at('netto'),q.at('Diffusie',2),0.4); if(nt>0) pill(ctx,960,BOX[1]-70,'netto: meer naar rechts dan terug',C.goud,nt);
  const cv=ramp(t,q.at('verschil'),0.5); if(cv>0){ ctx.save(); ctx.globalAlpha=cv;
    const bx=MID, by=BOX[3]+170; roundRect(ctx,bx-170,by-150*(L/S.n)-6,120,150*(L/S.n)+6,6); ctx.fillStyle=rgba(C.goud,0.7); ctx.fill(); roundRect(ctx,bx+50,by-150*(R/S.n)-6,120,150*(R/S.n)+6,6); ctx.fill();
    metaText(ctx,'links',bx-110,by+34,C.grain,'center',26); metaText(ctx,'rechts',bx+110,by+34,C.grain,'center',26); ctx.restore();
    pill(ctx,MID+440,BOX[3]+90,'concentratieverschil',C.goud,cv,28); const gr=ramp(t,q.at('gradiënt'),0.4); if(gr>0){ ctx.save(); ctx.globalAlpha=gr; metaText(ctx,'= concentratiegradiënt',MID+440,BOX[3]+205,C.grain,'center',26); ctx.restore(); } }
},
s06(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const off=DUR('s05');
  const tt=Math.max(0,off-5.9+t);
  drawDiffBox(ctx,S,tt,t,{showLine:1,arrows:1-ramp(t,0,0.35),counts:0});
  const g=ramp(t,0.35,0.6); if(g>0){ ctx.save(); ctx.globalAlpha=g; const gx=BOX[0], gy=BOX[3]+40, gw=1000, gh=200; roundRect(ctx,gx+380,gy,gw,gh+30,12); shape(ctx,rgba(C.bgSchema,0.92),C.line,1);
    const X=(s)=>gx+430+s/(tt+0.001)*(gw-100), Y=(f)=>gy+gh-10-f*(gh-50);
    for(const side of [0,1]){ ctx.beginPath(); for(let k=0;k<=40;k++){ const s=tt*k/40; const [l,r]=countSides(S,s); const f=(side?r:l)/S.n; k?ctx.lineTo(X(s),Y(f)):ctx.moveTo(X(s),Y(f)); } ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash(side?[10,8]:[]); ctx.stroke(); ctx.setLineDash([]); }
    metaText(ctx,'— links',gx+430,gy+44,C.goud,'left',26); metaText(ctx,'- - rechts',gx+620,gy+44,C.goud,'left',26); metaText(ctx,'tijd →',gx+gw+340,gy+gh+16,C.grain,'right',26);
    ctx.restore(); }
  const ns=fadeIO(t,q.at('netto'),q.at('Tot'),0.4); if(ns>0) pill(ctx,960,BOX[1]-70,'het verschil wordt kleiner, de netto stroom ook',C.goud,ns,28);
  const ev=ramp(t,q.at('evenveel'),0.5); if(ev>0) pill(ctx,960,BOX[1]-70,'en als links en rechts evenveel hebben?',C.text,ev,28);
},
s08(ctx,t,q){
  micro(ctx); const S=SIM_DIFF(); const tt=DUR('s05')-5.9+DUR('s06')+8+t;
  const fa=ramp(t,q.at('gevolgde'),0.5);
  drawDiffBox(ctx,S,tt,t,{followA:fa,trailLen:4,showLine:1,arrows:ramp(t,q.at('evenveel'),0.5),counts:ramp(t,q.at('evenveel'),0.5)});
  pill(ctx,960,BOX[1]-70,'ze bewegen gewoon door',C.text,fadeIO(t,0.1,q.at('evenveel'),0.4),28);
  pill(ctx,960,BOX[1]-70,'de tellers schommelen: gemiddeld evenveel',C.text,fadeIO(t,q.at('evenveel')+0.3,q.at('Netto'),0.4),28);
  const nn=ramp(t,q.at('Netto'),0.5); if(nn>0) pill(ctx,960,BOX[1]-70,'netto nul',C.groen,nn*(1-ramp(t,q.at('evenwicht'),0.4)),30);
  const ew=ramp(t,q.at('evenwicht')+0.3,0.5); if(ew>0) pill(ctx,960,BOX[1]-70,'evenwicht: evenveel heen als terug',C.groen,ew,30);
},
// ---------- H3: Wat maakt het sneller? ----------
s09(ctx,t,q){
  bg(ctx,'schema');
  const cellQ=ramp(t,q.at('cel'),0.6); const grid=1-cellQ;
  const P=[[100,100,'temperatuur','sneller'],[980,100,'concentratieverschil','concentratieverschil'],[100,500,'oppervlak','oppervlak'],[980,500,'afstand','afstand']];
  const pw=840, ph=370;
  const hd=fadeIO(t,0.1,q.at('sneller',2)-0.2,0.5); if(hd>0) pill(ctx,960,470,'wat maakt diffusie sneller?',C.goud,hd,40);
  P.forEach((p,i)=>{ const a=ramp(t,i===0?q.at('sneller',2):q.at(p[3]),0.5)*grid; if(a<=0.01) return; ctx.save(); ctx.globalAlpha=a; const x=p[0], y=p[1];
    roundRect(ctx,x,y,pw,ph,14); shape(ctx,rgba(C.fill,0.55),C.line,1); text(ctx,['1  hogere temperatuur','2  groter concentratieverschil','3  groter oppervlak','4  kleinere afstand'][i],x+30,y+56,fTekst(36,600),C.text,'left');
    const ix=x+30, iy=y+90, iw=pw-60, ih=ph-120;
    if(i===0){ thermometer(ctx,ix+40,iy+ih-20,ih-60,0.85,C.koraal); for(let k=0;k<9;k++){ const w=wander(k+300,t,90,2.6); kleurstof(ctx,ix+380+(hash(k)*2-1)*250+w.x*0.6,iy+ih/2+(hash(k+5)*2-1)*70+w.y*0.4,1.1,t*2+k); } metaText(ctx,'deeltjes sneller',ix+iw-10,iy+ih+4,C.grain,'right',26); }
    if(i===1){ for(const [k,steep] of [[0,1],[1,0]]){ const bx=ix+k*400; const hL=steep?ih-40:ih*0.55, hR=steep?20:ih*0.35; roundRect(ctx,bx+20,iy+ih-hL,90,hL,6); ctx.fillStyle=rgba(C.goud,0.7); ctx.fill(); roundRect(ctx,bx+220,iy+ih-hR,90,hR,6); ctx.fill(); arrow(ctx,bx+120,iy+ih/2,bx+210,iy+ih/2,C.goud,steep?10:3,steep?30:16); metaText(ctx,steep?'groot verschil':'klein verschil',bx+165,iy+ih+30,C.grain,'center',26); } }
    if(i===2){ // klein en groot stuk membraan: hoe langer het membraan, hoe meer plekken om over te steken
      for(const [k,wide] of [[0,0],[1,1]]){ const bx=ix+k*400+170, L=wide?320:90, R=900, my=iy+ih/2; const a0=-Math.PI/2-L/2/R, a1=-Math.PI/2+L/2/R;
        membraanBoog(ctx,bx,my+R,R,a0,a1,{s:0.75,t,golf:0.5});
        const nl=wide?5:1; for(let m=0;m<nl;m++){ const u=((t*0.55+m*0.37+k*0.2)%1); const xx=bx+(nl>1?(m/(nl-1)-0.5)*(L-40):0); kleurstof(ctx,xx,lerp(iy+6,iy+ih-6,u),0.95,t+m,Math.min(1,u*6,(1-u)*6)); }
        metaText(ctx,wide?'groot oppervlak':'klein oppervlak',bx,iy+ih+30,C.grain,'center',26); } }
    if(i===3){ for(const [k,long] of [[0,0],[1,1]]){ const by=iy+20+k*120, len=long?640:180; ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(ix+20,by+30); ctx.lineTo(ix+20+len,by+30); ctx.stroke();
        const u=((t/(long?6:1.2))%1); kleurstof(ctx,ix+20+len*u,by+30+Math.sin(t*9+k)*10,1.1,t*3); metaText(ctx,long?'lang: traag':'kort: snel',ix+20+len,by+4,C.grain,'right',26); } }
    ctx.restore(); });
  if(cellQ>0){ ctx.save(); ctx.globalAlpha=cellQ;
    const c1=[620,480], c2=[1300,480]; for(const [c,r,lab] of [[c1,120,'cel'],[c2,240,'twee keer zo dik']]){ celRond(ctx,c[0],c[1],r,{t,organellen:false,seed:r}); ctx.beginPath(); ctx.arc(c[0],c[1],8,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); metaText(ctx,lab,c[0],c[1]+r+50,C.grain,'center',26); }
    const oz=ramp(t,q.at('zuurstof'),0.5); if(oz>0){ for(const [c,r] of [[c1,120],[c2,240]]){ arrow(ctx,c[0]-r-110,c[1]-40,c[0]-14,c[1]-6,C.teal,4,18,oz); o2(ctx,c[0]-r-140,c[1]-46,1.2,oz); } ctx.save(); ctx.globalAlpha=oz; metaText(ctx,'zuurstof naar het midden',960,170,C.teal,'center',28); ctx.restore(); }
    ctx.restore(); }
},
s11(ctx,t,q){
  bg(ctx,'schema');
  const lungs=ramp(t,q.at('longblaasjes'),0.6);
  const p1=1-lungs; if(p1>0){ ctx.save(); ctx.globalAlpha=p1;
    pill(ctx,960,150,'2 × zo ver  →  ongeveer 4 × zo lang',C.goud,ramp(t,0.1,0.5),34);
    const wa=ramp(t,q.at('dwaalt'),0.5); if(wa>0){ const r=rng(99); let x=300,y=480; ctx.save(); ctx.globalAlpha*=wa; ctx.strokeStyle=C.text; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y); const N=Math.floor(clamp((t-q.at('dwaalt'))/4,0,1)*160);
      for(let k=0;k<N;k++){ x+=gauss(r)*22+1.2; y+=gauss(r)*22; y=clamp(y,300,660); ctx.lineTo(x,y); } ctx.stroke(); kleurstof(ctx,x,y,1.3,t); ctx.beginPath(); ctx.arc(300,480,6,0,6.283); ctx.fillStyle=C.text2; ctx.fill(); metaText(ctx,'start',300,524,C.grain,'center',26); ctx.restore();
      ctx.save(); ctx.globalAlpha*=wa; metaText(ctx,'heen en weer: verder komen gaat steeds trager',300,730,C.grain,'left',26); ctx.restore(); }
    const rows=[['door een cel','0,01 mm','paar honderdste seconde','zuurstof'],['een centimeter','10 mm','uren','centimeter']];
    rows.forEach((r,i)=>{ const a=ramp(t,q.at(r[3],1),0.5); if(a<=0) return; ctx.save(); ctx.globalAlpha*=a; const y=330+i*170; roundRect(ctx,1080,y,720,130,12); shape(ctx,rgba(C.fill,0.7),C.line,1);
      text(ctx,r[0],1110,y+56,fTekst(34,600),C.text,'left'); metaText(ctx,r[1],1110,y+102,C.grain,'left',26); text(ctx,r[2],1770,y+78,fTekst(34,600),C.goud,'right'); ctx.restore(); });
    const kl=ramp(t,q.at('klein'),0.5); if(kl>0) haak(ctx,1080,1800,680,'daarom zijn cellen klein',C.groen,kl*p1);
    ctx.restore(); }
  if(lungs>0){ ctx.save(); ctx.globalAlpha=lungs;
    // trosje longblaasjes met haarvatennet (beeldbank), dan zoomcirkel op één blaasjeswand met haarvat
    const LB=longblaasje(ctx,400,470,0.95,{t,adem:0.5+0.5*Math.sin(t*1.2),gas:0});
    ctx.save(); ctx.globalAlpha*=1-ramp(t,q.at('badmintonveld'),0.4); naamBij(ctx,'longblaasjes','',400,800,1,'center'); ctx.restore();
    zoomCircle(ctx,1250,470,330,LB.blaasje[0]+30,LB.blaasje[1],'wand van een longblaasje met haarvat',1,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(900,120,700,700);
      // lucht in het blaasje (links), flinterdunne wand, haarvat (rechts) met rode bloedcellen één voor één
      ctx.fillStyle=rgba(C.teal,0.08); ctx.fillRect(900,120,460,700);
      ctx.strokeStyle='#E8B8B0'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(1362,120); ctx.quadraticCurveTo(1350,470,1362,820); ctx.stroke();
      bloedvat(ctx,[[1440,110],[1432,470],[1440,830]],52,t,{haarvat:true,n:5,speed:0.08});
      metaText(ctx,'lucht',1130,470,C.grain,'center',28);
      const inA=ramp(t,q.at('Zuurstof',2),0.5), outA=ramp(t,q.at('koolstofdioxide'),0.5);
      for(let k=0;k<5;k++){ const u=((t*0.35+k/5)%1); const f=u<0.85?1:(1-u)/0.15; o2(ctx,lerp(1180,1430,u),300+k*80,1.5,inA*f); co2(ctx,lerp(1430,1170,u),340+k*80,1.25,outA*f); }
    });
    const fl=ramp(t,q.at('flinterdunne'),0.5); if(fl>0) naamBij(ctx,'flinterdunne wand','ongeveer 0,0005 mm',1600,170,fl,'left',C.text);
    const bm=ramp(t,q.at('badmintonveld'),0.5); if(bm>0){ ctx.save(); ctx.globalAlpha=bm; roundRect(ctx,140,770,200,90,4); ctx.strokeStyle=C.groen; ctx.lineWidth=2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(240,770); ctx.lineTo(240,860); ctx.stroke(); text(ctx,'samen ongeveer 70 m²',370,828,fTekst(30,600),C.groen,'left'); ctx.restore(); }
    const zo=ramp(t,q.at('Zuurstof',2),0.5); if(zo>0){ naamBij(ctx,'zuurstof','het bloed in',1160,250,zo*(1-ramp(t,q.at('koolstofdioxide'),0.4)),'center',C.teal); }
    const both=ramp(t,q.at('Allebei'),0.5); if(both>0) pill(ctx,1250,860,'allebei door diffusie',C.groen,both,28);
    ctx.restore(); }
  scaleBar(ctx);
},
// ---------- H4: Het celmembraan ----------
s12(ctx,t,q){
  micro(ctx); const my=520;
  const zoom=ramp(t,q.at('celmembraan'),1.6);
  const bouw=fadeIO(t,q.at('bouw'),q.at('sommige'),0.6);
  const mem=1-bouw;
  // doorlopende zoom: van de hele cel naar een stukje membraan bovenaan
  const cz=1-ramp(zoom,0.55,0.45);
  if(cz>0){ const k=lerp(1,7,ease(zoom)); const ax=960, ay=480-300; ctx.save(); ctx.globalAlpha=cz; ctx.translate(ax,lerp(ay,my-60,ease(zoom))); ctx.scale(k,k); ctx.translate(-ax,-ay); celRond(ctx,960,480,300,{t,seed:3}); ctx.restore();
    ctx.save(); ctx.globalAlpha=cz*(1-zoom); metaText(ctx,'cel',960,840,C.grain,'center',26); ctx.restore(); }
  const za=ramp(zoom,0.5,0.5);
  if(za>0){ ctx.save(); ctx.globalAlpha=za*mem; metaText(ctx,'buiten de cel',140,300,C.grain,'left',26); metaText(ctx,'in de cel',140,780,C.grain,'left',26);
    memH(ctx,my,60,1860,{t});
    naamBij(ctx,'celmembraan','dubbele laag vetachtige moleculen',560,mY(560,my)-110,ramp(t,q.at('dubbele'),0.5)*(1-ramp(t,q.at('bouw'),0.4)),'center');
    ctx.restore(); }
  if(bouw>0){ ctx.save(); ctx.globalAlpha=bouw;
    const f1=ramp(t,q.at('fosfolipiden'),0.5); fosfolipideGroot(ctx,420,340,2.0,1,f1);
    const kp=ramp(t,q.at('kop'),0.4); if(kp>0){ ctx.save(); ctx.globalAlpha*=kp; ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.setLineDash([6,6]); ctx.beginPath(); ctx.arc(420,340,62,0,6.2832); ctx.stroke(); ctx.restore();
      naamBij(ctx,'kop: hydrofiel','houdt van water',500,330,kp*ramp(t,q.at('hydrofiel'),0.4),'left',C.teal); }
    const st=ramp(t,q.at('vetstaarten'),0.4); if(st>0){ naamBij(ctx,'staarten: hydrofoob','stoten water af',480,530,st*ramp(t,q.at('hydrofoob'),0.4),'left',C.oker); }
    naamBij(ctx,'fosfolipide','',420,240,f1,'center');
    // rechts: de dubbellaag, groot, gebogen; koppen naar het water, staarten naar binnen
    const dl=ramp(t,q.at('koppen'),0.6); if(dl>0){ ctx.save(); ctx.globalAlpha*=dl;
      const cx=1350, cy=520, R=2600, an=(x)=>-Math.PI/2+Math.asin((x-cx)/R), yb=(x)=>cy+R-Math.sqrt(R*R-(x-cx)*(x-cx));
      waterField(ctx,960,180,1840,360,70,t,1.4,0.75,61,5.5); waterField(ctx,960,700,1840,870,70,t,1.4,0.75,62,5.5);
      membraanBoog(ctx,cx,cy+R,R,an(930),an(1860),{s:2.6,t});
      metaText(ctx,'water (buiten)',cx,200,C.teal,'center',26); metaText(ctx,'water (binnen)',cx,870,C.teal,'center',26);
      const vt=ramp(t,q.at('midden'),0.5); if(vt>0){ ctx.save(); ctx.globalAlpha*=vt; ctx.strokeStyle=C.oker; ctx.lineWidth=3; ctx.setLineDash([10,8]); for(const d of [-34,34]){ ctx.beginPath(); ctx.arc(cx,cy+R,R+d,an(960),an(1830)); ctx.stroke(); } ctx.restore(); pill(ctx,cx,cy+190,'midden: een laag vet',C.oker,vt,28); }
      ctx.restore(); }
    ctx.restore(); }
  const sel=ramp(t,q.at('sommige'),0.5)*mem;
  if(sel>0){ // zuurstof glipt erdoor, een natriumion met watermantel kaatst terug
    const u=((t-q.at('sommige'))*0.35)%1; o2(ctx,1250,lerp(300,760,u),1.4,sel*Math.min(1,u*8,(1-u)*8)); const v=((t-q.at('sommige'))*0.5)%1; const yb=v<0.5? lerp(250,mY(1500,my)-95,ease(v*2)): lerp(mY(1500,my)-95,250,ease((v-0.5)*2)); ionMol(ctx,1500,yb,'na',1.4,sel,true,t);
    arrow(ctx,1300,330,1300,730,C.teal,3,14,sel*0.6); }
  const sd=ramp(t,q.at('selectief'),0.5); if(sd>0) pill(ctx,960,150,'selectief doorlatend',C.goud,sd*(1-ramp(t,q.at('Welke'),0.4)),34);
  const pm=ramp(t,q.at('permeabel'),0.4); if(pm>0){ ctx.save(); ctx.globalAlpha=pm*(1-ramp(t,q.at('Welke'),0.4)); metaText(ctx,'in je boek: selectief permeabel',960,228,C.grain,'center',26); ctx.restore(); }
  const qq=ramp(t,q.at('Welke'),0.5); if(qq>0){ ctx.save(); ctx.globalAlpha=qq; o2(ctx,600,190,1.6); ionMol(ctx,960,190,'na',1.5,1,true,t); glucoseMol(ctx,1320,192,1.5); metaText(ctx,'zuurstof',600,276,C.grain,'center',26); metaText(ctx,'natriumion',960,276,C.grain,'center',26); metaText(ctx,'glucose',1320,276,C.grain,'center',26); ctx.restore(); }
  scaleBar(ctx);
},
s14(ctx,t,q){
  micro(ctx); const my=520; const chX=1400, carX=1680;
  const sc=ramp(t,q.at('kanaaltjes'),0.6), sd=ramp(t,q.at('doorgang'),0.6);
  const K=[{x:chX}], G=[[carX-70,carX+70]];
  memMix(ctx,my,60,1860,t,[{w:(1-sc)*(1-sd)},{kanalen:K,w:sc*(1-sd)},{gaten:G,w:(1-sc)*sd},{kanalen:K,gaten:G,w:sc*sd}]);
  if(sd>0) dragerEiwit(ctx,carX,mY(carX,my),memRot(carX),1.6,cyclus(((t-q.at('doorgang'))/4)%1),{a:sd,t});
  metaText(ctx,'buiten',80,170,C.grain,'left',26); metaText(ctx,'binnen',80,860,C.grain,'left',26);
  const lane=(x,a,fn)=>{ if(a>0) fn(x,a); };
  const ao=ramp(t,q.at('Zuurstof'),0.4); lane(240,ao,(x,a)=>{ for(let k=0;k<3;k++){ const u=((t*0.3+k/3)%1); o2(ctx,x+k*40,lerp(230,820,u),1.2,a*Math.min(1,u*8,(1-u)*8)); } ctx.save(); ctx.globalAlpha=a; metaText(ctx,'zuurstof',x+40,180,C.teal,'center',26); ctx.restore(); });
  const ac=ramp(t,q.at('koolstofdioxide'),0.4); lane(480,ac,(x,a)=>{ for(let k=0;k<3;k++){ const u=((t*0.3+k/3+0.5)%1); co2(ctx,x+k*40,lerp(820,230,u),1.1,a*Math.min(1,u*8,(1-u)*8)); } ctx.save(); ctx.globalAlpha=a; metaText(ctx,'koolstofdioxide',x+40,220,C.text2,'center',26); ctx.restore(); });
  const lp=ramp(t,q.at('glippen'),0.4)*(1-ramp(t,q.at('natriumion'),0.4)); if(lp>0) naamBij(ctx,'klein en lost op in vet','glipt door de vetlaag',330,my-120,lp,'left');
  const an=ramp(t,q.at('natriumion'),0.4); lane(780,an,(x,a)=>{ const v=((t*0.45)%1); const y=v<0.5? lerp(250,mY(x,my)-100,ease(v*2)): lerp(mY(x,my)-100,250,ease((v-0.5)*2)); ionMol(ctx,x,y,'na',1.5,a,true,t); ctx.save(); ctx.globalAlpha=a; metaText(ctx,'natriumion',x,180,C.oker,'center',26); ctx.restore(); });
  const ld=fadeIO(t,q.at('lading'),q.at('Glucose',2),0.4); if(ld>0) naamBij(ctx,'lading + watermantel','komt niet door de vetlaag',840,300,ld,'left');
  const ag=ramp(t,q.at('Glucose',2),0.4); lane(1080,ag,(x,a)=>{ const v=((t*0.4+0.3)%1); const y=v<0.5? lerp(250,mY(x,my)-90,ease(v*2)): lerp(mY(x,my)-90,250,ease((v-0.5)*2)); glucoseMol(ctx,x,y,1.4,a,t*0.5); ctx.save(); ctx.globalAlpha=a; metaText(ctx,'glucose',x,180,C.oker,'center',26); ctx.restore(); });
  const gz=fadeIO(t,q.at('zeef'),q.at('Water'),0.5); if(gz>0){ pill(ctx,700,840,'geen zeef: ook lading en vet tellen',C.goud,gz,28); }
  // water: een beetje door de vetlaag, vooral door de kanaaltjes
  const aw=ramp(t,q.at('Water'),0.4); if(aw>0){ const u=((t*0.25)%1); h2o(ctx,1240,lerp(240,800,u),5.5,t,aw*Math.min(1,u*8,(1-u)*8)); for(let k=0;k<9;k++){ const uu=((t*0.6+k/9)%1); h2o(ctx,chX,lerp(240,800,uu),5.5,t*2+k,aw*sc*Math.min(1,uu*8,(1-uu)*8)); } ctx.save(); ctx.globalAlpha=aw; metaText(ctx,'water',1300,180,C.teal,'center',26); ctx.restore(); }
  if(sc>0) naamBij(ctx,'kanaaltje','voor water',chX-50,mY(chX,my)+140,sc*(1-ramp(t,q.at('Ook',2),0.4)),'right',C.text);
  if(sd>0){ const cyc=((t-q.at('doorgang'))/4)%1, fl=cyclus(cyc); const gy= cyc<0.35? lerp(260,my-30,ease(cyc/0.35)) : cyc<0.55? lerp(my-30,my+30,fl) : lerp(my+30,800,ease((cyc-0.55)/0.45)); glucoseMol(ctx,carX,gy,1.2,sd*(cyc>0.95?(1-cyc)/0.05:1),0);
    ctx.save(); ctx.globalAlpha=sd; metaText(ctx,'glucose',carX,180,C.oker,'center',26); ctx.restore(); naamBij(ctx,'eigen doorgang','van hoog naar laag',carX-100,mY(carX,my)+150,ramp(t,q.at('hoog'),0.4)*(1-ramp(t,q.at('Dus',2),0.4)),'right',C.text); }
  const cz=ramp(t,q.at('Dus',2),0.6); if(cz>0){ ctx.save(); ctx.globalAlpha=cz; ctx.fillStyle=rgba(C.bgMicro,0.85); ctx.fillRect(0,0,W,CAPTION_Y-10); ctx.restore();
    const c1=cz, c2=ramp(t,q.at('Stoffen',3),0.6);
    card(ctx,130,190,800,470,'lost op in vet','gaat zelf door de vetlaag van het membraan',c1,C.teal);
    o2(ctx,370,520,2.2,c1); co2(ctx,640,520,1.9,c1); if(c1>0){ ctx.save(); ctx.globalAlpha=c1; metaText(ctx,'zuurstof',370,600,C.teal,'center',26); metaText(ctx,'koolstofdioxide',640,600,C.text2,'center',26); ctx.restore(); }
    card(ctx,990,190,800,470,'lost op in water, of een ion','heeft een eiwit in het membraan nodig',c2,C.oker);
    glucoseMol(ctx,1250,515,2.0,c2,0); ionMol(ctx,1530,515,'na',1.8,c2,true,t); if(c2>0){ ctx.save(); ctx.globalAlpha=c2; metaText(ctx,'glucose',1250,600,C.oker,'center',26); metaText(ctx,'natriumion',1530,600,C.oker,'center',26); ctx.restore(); } }
  scaleBar(ctx);
},
s15(ctx,t,q){
  micro(ctx); const my=520, chX=560, carX=1360;
  memH(ctx,my,60,1860,{t,gaten:[[carX-80,carX+80]],kanalen:[{x:chX}]});
  const ach=ramp(t,q.at('Kanaaleiwitten'),0.5);
  for(let k=0;k<10;k++){ const u=((t*0.5+k/10)%1); h2o(ctx,chX,lerp(220,820,u),5.5,t*2+k,Math.min(1,u*8,(1-u)*8)); }
  naamBij(ctx,'kanaaleiwit','tunnel voor één soort deeltje',chX+80,mY(chX,my)-100,ach,'left',C.text);
  const wk=ramp(t,q.at('waterkanalen'),0.4); if(wk>0){ ctx.save(); ctx.globalAlpha=wk; metaText(ctx,'waterkanaal',chX,860,C.teal,'center',26); ctx.restore(); }
  const ad=ramp(t,q.at('Dragereiwitten'),0.5); const cyc=((t-q.at('Dragereiwitten'))/4)%1; const flip=ad>0? cyclus(cyc):0;
  dragerEiwit(ctx,carX,mY(carX,my),memRot(carX),1.6,flip,{a:Math.max(0.5,ad),t});
  for(let k=0;k<9;k++){ const w=wander(k+500,t,24,1); glucoseMol(ctx,carX-260+k*65+w.x,300+(k%3)*45+w.y,1.0,0.9,k); }
  for(let k=0;k<2;k++){ const w=wander(k+520,t,30,1); glucoseMol(ctx,carX-130+k*270+w.x,780+w.y,1.0,0.9,k); }
  if(ad>0){ const gy= cyc<0.35? lerp(360,my-30,ease(cyc/0.35)) : cyc<0.55? lerp(my-30,my+30,flip) : lerp(my+30,700,ease((cyc-0.55)/0.45)); glucoseMol(ctx,carX,gy,1.3,ad*(cyc>0.95?(1-cyc)/0.05:1),0); }
  naamBij(ctx,'dragereiwit','pakt glucose vast, zet hem binnen af',carX+110,mY(carX,my)+150,ad,'left',C.text);
  const gd=ramp(t,q.at('gefaciliteerde'),0.5); if(gd>0) pill(ctx,960,150,'gefaciliteerde diffusie: via een eiwit, van hoog naar laag',C.goud,gd*(1-ramp(t,q.at('Kost'),0.4)),28);
  const ka=ramp(t,q.at('Kost'),0.5); if(ka>0){ atp(ctx,940,800,ka,1.3,0,''); ctx.save(); ctx.globalAlpha=ka; text(ctx,'?',1060,830,fTitel(64),C.koraal,'left'); ctx.restore(); }
  scaleBar(ctx);
},
s17(ctx,t,q){
  micro(ctx); const my=520, carX=960;
  memH(ctx,my,60,1860,{t,gaten:[[carX-80,carX+80]]});
  const cyc=(t/4)%1; const flip=cyclus(cyc);
  dragerEiwit(ctx,carX,mY(carX,my),memRot(carX),1.6,flip,{t});
  const gy= cyc<0.35? lerp(360,my-30,ease(cyc/0.35)) : cyc<0.55? lerp(my-30,my+30,flip) : lerp(my+30,700,ease((cyc-0.55)/0.45)); glucoseMol(ctx,carX,gy,1.3,1,0);
  atp(ctx,1300,290,1,1.4,0,''); crossOut(ctx,1300,290,60,ramp(t,0.1,0.4)); metaText(ctx,'geen ATP nodig',1300,390,C.grain,'center',26);
  const dg=ramp(t,q.at('doorgang'),0.4); if(dg>0) naamBij(ctx,'alleen een doorgang','',carX-100,my-90,dg,'right');
  const wl=ramp(t,q.at('willekeurig'),0.4); if(wl>0) pill(ctx,960,150,'de beweging komt van het willekeurig rondschieten',C.goud,wl*(1-ramp(t,q.at('Terug'),0.4)),28);
  scaleBar(ctx);
},
// ---------- H5: Osmose ----------
s18(ctx,t,q){
  bg(ctx,'schema'); const x0=280,x1=1640,y0=220,y1=780,mx=960; const KY=[340,500,660];
  roundRect(ctx,x0,y0,x1-x0,y1-y0,10); ctx.fillStyle=rgba(C.teal,0.10); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.stroke();
  const mm=ramp(t,q.at('membraan'),0.5);
  memV(ctx,mx,y0+4,y1-4,{t,s:1.0,R:2200,kanalen:KY.map(y=>({y})),a:mm});
  waterField(ctx,x0+14,y0+14,mx-60,y1-14,150,t,2,0.75,80,4.2); waterField(ctx,mx+60,y0+14,x1-14,y1-14,130,t,2,0.75,81,4.2);
  oversteek(ctx,mx,KY,t,7,7,mm);
  const sa=ramp(t,q.at('zout',2),0.5); if(sa>0){ for(let k=0;k<24;k++){ const bx=mx+90+hash(k*3+400)*(x1-mx-130), by=y0+40+hash(k*3+401)*(y1-y0-80); const w=wander(k+400,t,40,1.2); let x=bx+w.x; if(x<mx+70){ x=2*(mx+70)-x; } ionMol(ctx,x,by+w.y,k%2?'cl':'na',1.05,sa); } }
  naamBij(ctx,'semipermeabel membraan','water wel, zout niet',mx,y0-50,ramp(t,q.at('semipermeabel'),0.5)*(1-ramp(t,q.at('gebeurt'),0.4)),'center',C.text);
  const lz=ramp(t,q.at('zuiver'),0.5); if(lz>0){ ctx.save(); ctx.globalAlpha=lz; metaText(ctx,'zuiver water',(x0+mx)/2,y1+50,C.teal,'center',28); ctx.restore(); }
  const rz=ramp(t,q.at('zout',2),0.5); if(rz>0){ ctx.save(); ctx.globalAlpha=rz; metaText(ctx,'zout water',(mx+x1)/2,y1+50,C.goud,'center',28); ctx.restore(); }
  const nd=ramp(t,q.at('door',2),0.4); if(nd>0) pill(ctx,(mx+x1)/2,y0+70,'zout kan er niet door',C.goud,nd*(1-ramp(t,q.at('gebeurt'),0.4)),26);
  const qw=ramp(t,q.at('gebeurt'),0.5); if(qw>0) pill(ctx,960,150,'wat doet het water?',C.text,qw,30);
},
s20(ctx,t,q){
  bg(ctx,'schema'); const x0=280,x1=1640,y0=260,y1=780,mx=960; const KY=[420,560,700];
  const rise=ramp(t,0.2,3)*60; ctx.fillStyle=rgba(C.teal,0.10); ctx.fillRect(x0,y0+60+rise,mx-x0,y1-y0-60-rise); ctx.fillRect(mx,y0+60-rise,x1-mx,y1-y0-60+rise);
  ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.lineTo(x1,y1); ctx.lineTo(x1,y0); ctx.stroke();
  memV(ctx,mx,y0+4,y1-4,{t,s:1.0,R:2200,kanalen:KY.map(y=>({y}))});
  for(let k=0;k<20;k++){ const bx=mx+90+hash(k*3+400)*(x1-mx-130), by=y0+120+hash(k*3+401)*(y1-y0-160); const w=wander(k+400,t,40,1.2); ionMol(ctx,Math.max(mx+70,bx+w.x),by+w.y,k%2?'cl':'na',1.05); }
  waterField(ctx,x0+14,y0+74+rise,mx-60,y1-14,120,t,2,0.75,82,4.2); waterField(ctx,mx+60,y0+74-rise,x1-14,y1-14,120,t,2,0.75,83,4.2);
  const bulk=ramp(t,q.at('stroomt'),0.6);
  oversteek(ctx,mx,KY,t,14,5,1-bulk);
  // als één geheel: water in een rij snel door elk kanaal, plus een brede pijl
  if(bulk>0){ for(const ky of KY) for(let k=0;k<6;k++){ const u=((t*0.9+k/6)%1); h2o(ctx,lerp(mx-150,mx+150,u),ky,5,t*3+k,bulk*Math.min(1,u*6,(1-u)*6)); } arrow(ctx,mx-200,y0+110,mx+200,y0+110,C.teal,14,40,bulk); }
  arrow(ctx,mx-160,y0+110,mx+160,y0+110,C.teal,10,34,ramp(t,0.2,0.5)*(1-ramp(t,q.at('hoort'),0.4)*0.6)*(1-bulk));
  const wr=fadeIO(t,q.at('waarom'),q.at('hoort'),0.4); if(wr>0) pill(ctx,960,150,'maar waarom?',C.text,wr,34);
  const m1=fadeIO(t,q.at('hoort'),q.at('Of'),0.4); if(m1>0){ ctx.save(); ctx.globalAlpha=m1; ctx.strokeStyle=C.goud; ctx.lineWidth=22; ctx.lineCap='butt'; ctx.beginPath(); ctx.arc(1300,170,52,Math.PI,0); ctx.stroke(); ctx.fillStyle=lighten(C.koraal,0.15); ctx.fillRect(1226,166,26,30); ctx.fillRect(1348,166,26,30); ctx.restore(); ctx.save(); ctx.globalAlpha=m1; text(ctx,'"zout trekt water aan"',1180,190,fTekst(34,600),C.text,'right'); ctx.restore(); crossOut(ctx,1300,170,70,m1*ramp(t,q.at('niet'),0.3)); }
  const m2=fadeIO(t,q.at('Of'),q.at('klopt'),0.4); if(m2>0){ ctx.save(); ctx.globalAlpha=m2; text(ctx,'"rechts is minder water"',960,150,fTekst(34,600),C.text,'center'); ctx.restore(); }
  const ok=fadeIO(t,q.at('klopt'),q.at('molecuul'),0.4); if(ok>0){ pill(ctx,960,140,'klopt: dat kleine verschil in water is de oorzaak',C.groen,ok,30);
    const bw=ramp(t,q.at('verschil'),0.5)*ok; if(bw>0){ ctx.save(); ctx.globalAlpha=bw; const by=192; roundRect(ctx,520,by,380,30,8); ctx.fillStyle=C.teal; ctx.fill(); roundRect(ctx,1020,by,372,30,8); ctx.fill(); metaText(ctx,'water links',710,by+60,C.grain,'center',26); metaText(ctx,'water rechts: iets minder',1206,by+60,C.grain,'center',26); ctx.restore(); } }
  const mm=fadeIO(t,q.at('molecuul'),q.at('stroomt'),0.4); if(mm>0) pill(ctx,960,140,'maar niet molecuul voor molecuul',C.koraal,mm,30);
  const st=ramp(t,q.at('stroomt'),0.4); if(st>0) pill(ctx,960,140,'het stroomt door het gaatje, als één geheel',C.teal,st*(1-ramp(t,q.at('Kijk'),0.4)),30);
  const kk=ramp(t,q.at('Kijk'),0.4); if(kk>0) pill(ctx,960,140,'kijk hoe dat komt',C.text,kk,30);
},
s21(ctx,t,q){
  micro(ctx);
  const mx=960, y0=270, y1=860, pc=560;
  const card1=ramp(t,q.at('osmose'),0.6); const dimA=1-0.55*card1;
  const strook=ramp(t,q.at('druk'),0.6); if(strook>0){ ctx.fillStyle=rgba(C.bgSchema,strook); ctx.fillRect(0,40,W,y0-50); }
  ctx.save(); ctx.globalAlpha=dimA;
  const lowP=ramp(t,q.at('druk'),0.6);
  // lagere druk in de opening aan de zoute kant: daar duwt er minder water (de watermoleculen zijn weggeduwd)
  const leeg=(x,y)=> x>mx+40 ? lowP*0.85*clamp(1-Math.hypot(x-(mx+70),(y-pc)*1.3)/170,0,1) : 0;
  waterField(ctx,80,y0,mx-70,y1,240,t,2.2,0.85,90,5.2);
  waterField(ctx,mx+70,y0,1840,y1,190,t,2.2,0.85,91,5.2,leeg);
  memV(ctx,mx,y0,y1,{t,s:1.8,R:1300,cy:pc,kanalen:[{y:pc}]});
  // opgeloste zoutdeeltjes (Na⁺ en Cl⁻) met hun watermantel
  for(let k=0;k<12;k++){ const bx=1220+hash(k*5+700)*580, by=y0+60+hash(k*5+701)*(y1-y0-120); const w=wander(k+700,t,40,1); ionMol(ctx,bx+w.x,by+w.y,k%2?'cl':'na',1.35,1,true,t); }
  const hitA=ramp(t,q.at('botsen'),0.5);
  for(let b=0;b<3;b++){ const per=2.4, ph=((t+b*0.8)/per)%1; const yy=pc+(b-1)*105;
    const xb=memVX(mx,yy,1300,pc)+105; const x= ph<0.5? lerp(1260,xb,ease(ph*2)) : lerp(xb,1260,ease((ph-0.5)*2)); ionMol(ctx,x,yy,b%2?'cl':'na',1.35,hitA,true,t);
    const kick=ramp(t,q.at('terugkaatsen'),0.5)*hitA; if(kick>0 && ph>0.5 && ph<0.8){ const u=(ph-0.5)/0.3; arrow(ctx,xb+30+90*u,yy-50,xb+150+120*u,yy-50,C.goud,4,16,kick*(1-u));
        for(let m=0;m<3;m++) h2o(ctx,xb-10+u*150+m*14,yy-14+m*12,6,m,kick*(1-u)); } }
  // ringen op de meetplekken
  if(lowP>0){ ctx.save(); ctx.globalAlpha*=lowP; ctx.lineWidth=4; ctx.strokeStyle=C.goud; ctx.beginPath(); ctx.arc(mx+110,pc,62,0,6.2832); ctx.stroke(); ctx.strokeStyle=C.teal; ctx.beginPath(); ctx.arc(mx-170,pc,62,0,6.2832); ctx.stroke(); ctx.restore(); }
  // water door het kanaal: eerst heen en weer, dan stroomt het naar rechts
  const flow=ramp(t,q.at('stroomt'),0.6);
  for(let k=0;k<8;k++){ const u=((t*0.55+k/8)%1); const px= flow>0? lerp(mx-120,mx+150,u): mx-20+Math.sin(t*3+k)*22; h2o(ctx,px,pc+Math.sin(k*1.7)*3,5.5,t*2+k,flow>0?Math.min(1,u*6,(1-u)*6):(k<3?1:0)); }
  if(flow>0) arrow(ctx,mx-260,pc+120,mx+260,pc+120,C.teal,12,40,flow*0.85);
  ctx.restore();
  const pz=fadeIO(t,0.1,q.at('druk'),0.5); if(pz>0) naamBij(ctx,'gaatje in het membraan','een waterkanaal',mx-90,pc+120,pz*dimA,'right');
  const kz=fadeIO(t,q.at('kaatsen'),q.at('druk'),0.4); if(kz>0) pill(ctx,1460,330,'zout kaatst terug',C.goud,kz*dimA,30);
  const mz=fadeIO(t,q.at('duw'),q.at('druk'),0.4); if(mz>0) pill(ctx,1440,820,'en duwt het water weg van het gaatje',C.goud,mz*dimA,28);
  const gA=ramp(t,q.at('druk'),0.6); if(gA>0){ gauge(ctx,mx-330,190,74,lerp(0.5,0.75,ramp(t,q.at('harder'),0.6)),'',gA,C.teal); gauge(ctx,mx+330,190,74,lerp(0.5,0.3,lowP),'',gA,C.goud);
    naamBij(ctx,'druk links','',mx-430,180,gA,'right',C.teal); naamBij(ctx,'druk in de opening','zoute kant',mx+430,170,gA,'left',C.goud); }
  const lp=fadeIO(t,q.at('druk'),q.at('stroomt'),0.4); if(lp>0) pill(ctx,mx+380,760,'lagere druk in de opening',C.goud,lp*dimA,28);
  const rz=fadeIO(t,q.at('rietje'),q.at('osmose'),0.4); if(rz>0) pill(ctx,960,820,'water stroomt erdoorheen, als door een rietje',C.teal,rz,28);
  card(ctx,330,600,1260,210,'osmose','water gaat door een semipermeabel membraan naar de kant met de hoogste concentratie opgeloste deeltjes die er niet door kunnen',card1*(1-ramp(t,q.at('boek'),0.5)),C.goud);
  const bk=ramp(t,q.at('boek'),0.5)*(1-ramp(t,q.at('waarom'),0.5)); card(ctx,330,580,1260,140,'in je boek','naar de kant met de hoogste osmotische waarde · vaak "diffusie van water"',bk,C.text);
  const ts=ramp(t,q.at('toets'),0.5); card(ctx,330,735,1260,140,'op een toets','water gaat naar de kant met de hoogste osmotische waarde',ts,C.groen);
  const ww=ramp(t,q.at('waarom'),0.5); if(ww>0) pill(ctx,960,650,'jij weet nu ook waarom: een drukverschil bij het gaatje',C.groen,ww,30);
  scaleBar(ctx);
},
s22(ctx,t,q){
  bg(ctx,'schema'); const tel=ramp(t,q.at('Tel'),0.7); if(tel<1){ ctx.save(); ctx.globalAlpha=1-tel;
  const cx=960, base=760, armW=200, gap=200, top=180; const lx=cx-gap/2-armW/2, rx=cx+gap/2+armW/2;
  const h0=330; const rise=ramp(t,q.at('stijgt'),4.5); const extra=ramp(t,q.at('Hoe',3),1.2);
  const dh=lerp(0,190,rise); const hL=h0-dh/2, hR=h0+dh/2;
  ctx.fillStyle=rgba(C.teal,0.22); ctx.fillRect(lx-armW/2,base-hL,armW,hL); ctx.fillRect(rx-armW/2,base-hR,armW,hR); ctx.fillRect(lx-armW/2,base,rx-lx+armW,80);
  for(let k=0;k<12;k++){ const w=wander(k+800,t,14,1); ionMol(ctx,rx-70+hash(k*3+800)*140+w.x,base+40-hash(k*3+801)*(hR-30)+w.y*0.5,k%2?'cl':'na',0.85); }
  ctx.strokeStyle=C.line; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(lx-armW/2,top); ctx.lineTo(lx-armW/2,base+80); ctx.lineTo(rx+armW/2,base+80); ctx.lineTo(rx+armW/2,top); ctx.moveTo(lx+armW/2,top); ctx.lineTo(lx+armW/2,base); ctx.lineTo(rx-armW/2,base); ctx.lineTo(rx-armW/2,top); ctx.stroke();
  memV(ctx,cx,base+2,base+78,{t,s:0.5,R:400,cy:base+40});
  metaText(ctx,'zuiver water',lx,base+130,C.teal,'center',26); metaText(ctx,'zout water',rx,base+130,C.goud,'center',26); naamBij(ctx,'membraan','',cx,base-30,ramp(t,0.2,0.5)*(1-ramp(t,q.at('stijgt'),0.4)),'center');
  const flowA=(1-ramp(t,q.at('precies'),1.2)); arrow(ctx,cx-90,base+40,cx+90,base+40,C.teal,6+8*flowA,26,ramp(t,q.at('stijgt'),0.4)*Math.max(0.15,flowA));
  const back=ramp(t,q.at('kolom'),0.6); arrow(ctx,rx+armW/2+60,base-hR+20,rx+armW/2+60,base-20,C.text2,lerp(3,12,rise),26,back); if(back>0){ ctx.save(); ctx.globalAlpha=back; metaText(ctx,'gewicht van de kolom duwt terug',rx+armW/2+90,base-hR/2,C.grain,'left',26); ctx.restore(); }
  const hd=ramp(t,q.at('hoogte'),0.5); if(hd>0){ ctx.save(); ctx.globalAlpha=hd; ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.setLineDash([8,6]); ctx.beginPath(); ctx.moveTo(lx-armW/2-20,base-hL); ctx.lineTo(rx+armW/2+20,base-hL); ctx.moveTo(lx-armW/2-20,base-hR); ctx.lineTo(rx+armW/2+20,base-hR); ctx.stroke(); ctx.setLineDash([]); metaText(ctx,'hoogteverschil',lx-armW/2-40,base-(hL+hR)/2,C.goud,'right',26); ctx.restore(); }
  const nn=ramp(t,q.at('Netto'),0.5); if(nn>0) pill(ctx,960,130,'netto geen stroom meer: evenwicht',C.groen,nn*(1-ramp(t,q.at('Hoe',3),0.4)),30);
  if(extra>0){ ctx.save(); ctx.globalAlpha=extra; ctx.setLineDash([6,6]); ctx.strokeStyle=C.goud; ctx.lineWidth=3; const hR2=hR+120; ctx.strokeRect(rx-armW/2,base-hR2,armW,hR2-hR); ctx.restore(); pill(ctx,960,130,'hogere concentratie opgeloste deeltjes → hogere kolom',C.goud,extra*(1-ramp(t,q.at('Tel'),0.4)),30); }
  ctx.restore(); }
  if(tel>0){ ctx.save(); ctx.globalAlpha=tel;
    pill(ctx,960,130,'tel deeltjes, geen moleculen',C.text,1-ramp(t,q.at('zoutoplossing'),0.4),32);
    const split=ramp(t,q.at('uiteen'),1.2);
    beaker(ctx,600,500,520,440,0.8,rgba(C.teal,0.14),1); beaker(ctx,1320,500,520,440,0.8,rgba(C.teal,0.14),1);
    metaText(ctx,'1 mol NaCl per liter',600,770,C.goud,'center',26); metaText(ctx,'1 mol glucose per liter',1320,770,C.oker,'center',26);
    for(let k=0;k<4;k++){ const bx=480+(k%2)*240, by=430+Math.floor(k/2)*150; const w=wander(k+830,t,10,1); const d=lerp(14,52,ease(split));
      ionMol(ctx,bx-d+w.x,by+w.y,'na',1.9,1,false); ionMol(ctx,bx+d+w.x,by+18*split+w.y,'cl',1.9,1,false); }
    for(let k=0;k<4;k++){ const bx=1200+(k%2)*240, by=430+Math.floor(k/2)*150; const w=wander(k+840,t,10,1); glucoseMol(ctx,bx+w.x,by+w.y,1.8,1,t*0.3+k); }
    const nz=ramp(t,q.at('natrium'),0.4); if(nz>0){ ctx.save(); ctx.globalAlpha*=nz; text(ctx,'Na⁺ + Cl⁻: twee ionen',600,262,fTekst(34,600),C.goud,'center'); ctx.restore(); }
    const gh=ramp(t,q.at('heel'),0.4); if(gh>0){ ctx.save(); ctx.globalAlpha*=gh; text(ctx,'glucose blijft heel',1320,262,fTekst(34,600),C.oker,'center'); ctx.restore(); }
    const c1=ramp(t,q.at('mol',3),0.4); if(c1>0){ ctx.save(); ctx.globalAlpha*=c1; text(ctx,'2 mol deeltjes',600,835,fTekst(40,700),C.goud,'center'); ctx.restore(); }
    const c2=ramp(t,q.at('glucose',2),0.4); if(c2>0){ ctx.save(); ctx.globalAlpha*=c2; text(ctx,'1 mol deeltjes',1320,835,fTekst(40,700),C.oker,'center'); ctx.restore(); }
    const zo=ramp(t,q.at('zoutoplossing'),0.5); if(zo>0) pill(ctx,960,130,'zoutoplossing: 2 × zo hoge osmotische waarde',C.goud,zo,32);
    ctx.restore(); }
},
s23(ctx,t,q){
  bg(ctx,'micro');
  const kom=ramp(t,q.at('Strooi'),0.7); const cellA=1-kom;
  if(cellA>0){ ctx.save(); ctx.globalAlpha=cellA;
    const toSalt=ramp(t,q.at('uit'),3.4), toPure=ramp(t,q.at('zuiver'),1.4);
    const p=toSalt*(1-toPure);
    const saltEnv=ramp(t,q.at('zout'),0.5)*(1-toPure);
    const CX=720, CY=470, CS=1.0;
    // buitenoplossing rond de cel: water, en in zout water ook Na⁺ en Cl⁻
    for(let k=0;k<70;k++){ const a=hash(k*7)*6.2832, d=380+hash(k*7+1)*300; const w=wander(k+900,t,16,1); const x=CX+Math.cos(a)*d*1.2+w.x, y=CY+Math.sin(a)*d*0.85+w.y; if(y>860||y<90||x<60||x>1380) continue; if(k%2) ionMol(ctx,x,y,k%4===1?'na':'cl',0.85,saltEnv); h2o(ctx,x+22,y+12,4.5,k+t); }
    const A=plantencel(ctx,CX,CY,CS,{t,plasmolyse:p});
    // water de cel uit (zout) of in (zuiver)
    const out=fadeIO(t,q.at('uit'),q.at('zuiver'),0.4); const inn=fadeIO(t,q.at('zuiver')+0.6,q.at('turgor'),0.4);
    for(let k=0;k<6;k++){ const a=k/6*6.2832+0.5; const cx=CX+Math.cos(a)*330, cy=CY+Math.sin(a)*240, ex=CX+Math.cos(a)*440, ey=CY+Math.sin(a)*320;
      arrow(ctx,cx,cy,ex,ey,C.teal,4,16,out); arrow(ctx,ex,ey,cx,cy,C.teal,4,16,inn); }
    // turgor: de inhoud duwt tegen de wand
    const tg=ramp(t,q.at('drukt'),0.5)*(1-ramp(t,q.at('Strooi'),0.3)); for(let k=0;k<8;k++){ const a=k/8*6.2832+0.2; arrow(ctx,CX+Math.cos(a)*170,CY+Math.sin(a)*110,CX+Math.cos(a)*270,CY+Math.sin(a)*175,C.goud,3.5,16,tg); }
    pill(ctx,1580,150,'in zout water',C.goud,ramp(t,q.at('zout'),0.4)*clamp(1-2*toPure,0,1),28);
    pill(ctx,1580,150,'in zuiver water',C.teal,clamp(2*toPure-1,0,1),28);
    naamBij(ctx,'celmembraan','laat los van de celwand',1120,560,ramp(t,q.at('celmembraan'),0.5)*(1-toPure),'left',C.text);
    naamBij(ctx,'vacuole','krimpt',1120,440,fadeIO(t,q.at('vacuole'),q.at('celmembraan'),0.4),'left',C.text);
    const pl=fadeIO(t,q.at('plasmolyse'),q.at('zuiver'),0.4); if(pl>0){ pill(ctx,1240,830,'plasmolyse',C.goud,pl,32); naamBij(ctx,'zout water','tussen wand en membraan',1120,330,pl,'left',C.teal); }
    const tu=ramp(t,q.at('turgor'),0.5); if(tu>0) pill(ctx,1240,830,'turgor: de druk in de cel',C.goud,tu,30);
    naamBij(ctx,'celwand','stevig, laat alles door',330,190,ramp(t,q.at('wand'),0.5)*(1-tg),'right',C.text); naamBij(ctx,'celwand','duwt terug',330,190,tg,'right',C.groen);
    const nb=ramp(t,q.at('Barsten'),0.5); if(nb>0) pill(ctx,1580,250,'barst niet: de celwand houdt hem tegen',C.groen,nb,26);
    ctx.restore(); }
  if(kom>0){ ctx.save(); ctx.globalAlpha=kom; bg(ctx,'schema');
    const pud=ramp(t,q.at('plasje'),1.2);
    if(pud>0){ ctx.beginPath(); ctx.ellipse(960,640,520,90*pud+10,0,0,6.2832); ctx.fillStyle=rgba(C.teal,0.35*pud); ctx.fill(); }
    for(let k=0;k<3;k++){ const x=640+k*320, y=520; ctx.beginPath(); ctx.ellipse(x,y,140,120,0,0,6.2832); shape(ctx,'#3F7A4A',C.groen,6); ctx.beginPath(); ctx.ellipse(x,y,110,92,0,0,6.2832); ctx.fillStyle='#BFD9A8'; ctx.fill();
      for(let s=0;s<8;s++){ const a=s/8*6.2832; ctx.beginPath(); ctx.ellipse(x+Math.cos(a)*40,y+Math.sin(a)*34,7,12,a,0,6.2832); ctx.fillStyle='#E8F0D0'; ctx.fill(); }
      for(let c=0;c<14;c++){ const sx=x-70+hash(k*30+c)*140, sy=y-60+hash(k*30+c+7)*120; ctx.fillStyle=C.text; ctx.fillRect(sx,sy,6,6); } }
    metaText(ctx,'plakjes komkommer met zout',960,260,C.grain,'center',26);
    if(pud>0){ ctx.save(); ctx.globalAlpha=pud; metaText(ctx,'na tien minuten: een plasje',960,780,C.teal,'center',26); ctx.restore(); }
    ctx.restore(); }
  scaleBar(ctx,'schematisch');
},
s25(ctx,t,q){
  bg(ctx,'micro'); const rb=ramp(t,q.at('bloedcel'),0.7); const k1=1-rb;
  if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    const shr=ramp(t,0.3,3);
    for(let i=0;i<4;i++){ const x=300+i*440; plantencel(ctx,x,480,0.6,{t,plasmolyse:0.35+0.6*shr,stroom:false}); for(const d of [-1,1]) for(const dx of [-70,70]){ arrow(ctx,x+dx,480+d*150,x+dx,480+d*225,C.teal,3,14,fadeIO(t,0.2,q.at('slap'),0.5)); } }
    pill(ctx,960,150,'buiten: hogere osmotische waarde dan het celvocht',C.goud,ramp(t,q.at('Buiten'),0.5),28);
    pill(ctx,960,800,'water gaat de cellen uit: de plakjes worden slap',C.teal,ramp(t,q.at('slap'),0.5),28);
    ctx.restore(); }
  if(rb>0){ ctx.save(); ctx.globalAlpha=rb; bg(ctx,'schema'); beaker(ctx,960,520,520,520,0.78,rgba(C.teal,0.16),1,ramp(t,q.at('zuiver'),0.4)>0?'zuiver water':''); waterField(ctx,720,300,1200,760,40,t,1.2,0.6,77,4.5); bloedcelOsmose(ctx,960,560,90); naamBij(ctx,'rode bloedcel','geen celwand',1090,400,1,'left',C.text); ctx.restore(); }
},
s27(ctx,t,q){
  bg(ctx,'schema');
  const L=560, R=1360;
  beaker(ctx,L,500,480,500,0.8,rgba(C.teal,0.16),1,'zuiver water'); beaker(ctx,R,500,480,500,0.8,rgba(C.teal,0.16),ramp(t,q.at('zout'),0.5),'zout water');
  const sw=ramp(t,0.1,1.6), bu=ramp(t,q.at('wand'),0.9);
  bloedcelOsmose(ctx,L,540,80,sw,0,bu,1);
  for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,L+Math.cos(a)*200,540+Math.sin(a)*170,L+Math.cos(a)*120,540+Math.sin(a)*105,C.teal,3,14,fadeIO(t,0,q.at('wand')+0.4,0.3)); }
  const hm=ramp(t,q.at('hemolyse'),0.5); if(hm>0) pill(ctx,L,150,'hemolyse',C.koraal,hm,32);
  const nw=fadeIO(t,q.at('wand'),q.at('hemolyse'),0.4); if(nw>0) pill(ctx,L,150,'geen wand die terugduwt',C.text,nw,28);
  const kr=ramp(t,q.at('krimpt'),0.9); const za=ramp(t,q.at('zout'),0.5);
  if(za>0){ for(let k=0;k<16;k++){ const w=wander(k+950,t,20,1); ionMol(ctx,R-180+hash(k*3+950)*360+w.x,320+hash(k*3+951)*340+w.y,k%2?'cl':'na',0.75,za); } bloedcelOsmose(ctx,R,540,80,0,kr,0,za);
    for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,R+Math.cos(a)*110,540+Math.sin(a)*95,R+Math.cos(a)*200,540+Math.sin(a)*170,C.teal,3,14,za*fadeIO(t,q.at('krimpt'),100,0.4)); } }
  const gk=ramp(t,q.at('gekarteld'),0.5); if(gk>0) pill(ctx,R,150,'krimpt en wordt gekarteld',C.goud,gk,28);
},
s28(ctx,t,q){
  bg(ctx,'schema'); const inf=ramp(t,q.at('infuus'),0.7); const colA=1-0.8*inf;
  const cols=[[360,'isotonisch','zelfde osmotische waarde','isotonisch',0],[960,'hypotonisch','lagere osmotische waarde','hypotonisch',1],[1560,'hypertonisch','hogere osmotische waarde','hypertonisch',-1]];
  ctx.save(); ctx.globalAlpha=colA;
  cols.forEach(([x,name,sub,cue,dir],i)=>{ const a=ramp(t,q.at(cue)-(i?1.6:3.2),0.6); if(a<=0) return; ctx.save(); ctx.globalAlpha*=a;
    beaker(ctx,x,520,380,420,0.8,rgba(C.teal,0.16),1);
    const s=ramp(t,q.at(cue)+0.6,1.5); bloedcelOsmose(ctx,x,560,70,dir>0?s*0.9:0,dir<0?s:0,0,1);
    if(dir<0){ for(let k=0;k<12;k++){ ionMol(ctx,x-150+hash(k*3+990+i)*300,380+hash(k*3+991)*280,k%2?'cl':'na',0.6); } }
    if(dir===0){ for(let k=0;k<5;k++){ ionMol(ctx,x-140+hash(k*3+995)*280,400+hash(k*3+996)*260,k%2?'cl':'na',0.6); } arrow(ctx,x-170,560,x-100,560,C.teal,3,14); arrow(ctx,x-100,600,x-170,600,C.teal,3,14); }
    else for(let k=0;k<5;k++){ const an=k/5*6.2832+0.3; const r0=105, r1=170; if(dir>0) arrow(ctx,x+Math.cos(an)*r1,560+Math.sin(an)*r1*0.85,x+Math.cos(an)*r0,560+Math.sin(an)*r0*0.85,C.teal,3,14); else arrow(ctx,x+Math.cos(an)*r0,560+Math.sin(an)*r0*0.85,x+Math.cos(an)*r1,560+Math.sin(an)*r1*0.85,C.teal,3,14); }
    text(ctx,name,x,220,fTekst(40,600),C.text,'center'); metaText(ctx,sub,x,262,C.grain,'center',26); metaText(ctx,dir===0?'netto geen water in of uit':dir>0?'water gaat de cel in':'water gaat de cel uit',x,800,dir===0?C.groen:C.teal,'center',26);
    ctx.restore(); });
  ctx.restore();
  if(inf>0){ ctx.save(); ctx.globalAlpha=inf;
    const bx=700, by=420; ctx.fillStyle=rgba(C.bgSchema,0.9); ctx.fillRect(0,90,W,800); roundRect(ctx,bx-150,by-220,300,380,40); shape(ctx,rgba(C.teal,0.2),C.line,3); ctx.strokeStyle=C.line; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(bx,by+160); ctx.lineTo(bx,by+300); ctx.quadraticCurveTo(bx,by+380,bx+160,by+400); ctx.stroke();
    text(ctx,'infuus',bx,by-140,fTekst(40,600),C.text,'center');
    const ng=ramp(t,q.at('negen'),0.5); if(ng>0){ ctx.save(); ctx.globalAlpha*=ng; text(ctx,'9 g zout',bx,by-40,fTitel(56),C.goud,'center'); metaText(ctx,'per liter',bx,by+6,C.grain,'center',26); ctx.restore(); }
    const eb=ramp(t,q.at('bloed'),0.5); if(eb>0) pill(ctx,1340,330,'isotonisch: ongeveer even zout als je bloed',C.groen,eb,28);
    const zw=ramp(t,q.at('Zuiver'),0.5); if(zw>0){ pill(ctx,1340,470,'zuiver water (hypotonisch): bloedcellen barsten',C.koraal,zw,26); bloedcelOsmose(ctx,1340,650,56,ramp(t,q.at('Zuiver'),0.6),0,ramp(t,q.at('barsten'),0.8),zw); }
    ctx.restore(); }
},
// ---------- H6: Actief transport ----------
s29(ctx,t,q,state){
  bg(ctx,'schema'); const root=ramp(t,q.at('wortelhaarcel')+0.8,0.7);
  const ps=fadeIO(t,q.at('passief'),q.at('wortelhaarcel')+0.8,0.5); if(ps>0){ ctx.save(); ctx.globalAlpha=ps; pill(ctx,960,300,'passief transport',C.groen,1,40); metaText(ctx,(state&&state.niveau==='havo')?'diffusie · osmose':'diffusie · gefaciliteerde diffusie · osmose',960,390,C.grain,'center',26); metaText(ctx,'vanzelf, zonder energie van de cel',960,440,C.grain,'center',26); ctx.restore(); }
  const pre=1-ramp(t,q.at('passief')-0.2,0.5); if(pre>0){ ctx.save(); ctx.globalAlpha=pre; for(let k=0;k<12;k++){ const w=wander(k+1100,t,30,1.4); kleurstof(ctx,500+k*80+w.x,500+w.y,1.2,t+k); } arrow(ctx,700,620,1220,620,C.goud,6,24); metaText(ctx,'vanzelf: van hoog naar laag',960,690,C.grain,'center',26); ctx.restore(); }
  if(root>0){ ctx.save(); ctx.globalAlpha=root;
    const WX=600, WY=470, WS=1.3; const A=wortelHaren(ctx,WX,WY,WS,{t,zoom:1,water:0});
    // mineralen in de zoomcirkel: veel in de wortelhaarcel, weinig in de bodem eromheen
    const ZX=WX+180*WS, ZY=WY+110*WS, ZR=150*WS; ctx.save(); ctx.beginPath(); ctx.arc(ZX,ZY,ZR-3,0,6.283); ctx.clip();
    const HAAR=[[-52,0],[-10,-6],[40,-18],[60,-30],[160,-40]].map(p=>[ZX+p[0]*WS,ZY+p[1]*WS]);
    for(let k=0;k<16;k++){ const u=hash(k*3+1200); const i=Math.min(3,Math.floor(u*4)), f=u*4-i; const px=lerp(HAAR[i][0],HAAR[i+1][0],f), py=lerp(HAAR[i][1],HAAR[i+1][1],f); const w=wander(k+1200,t,3,0.8); mineraalIon(ctx,px+w.x,py+w.y+(hash(k*3+1201)-0.5)*8,1.05); }
    for(let k=0;k<8;k++){ const w=wander(k+1220,t,3,0.8); mineraalIon(ctx,ZX-ZR+40+hash(k*3+1221)*70+w.x,ZY-60+hash(k*3+1222)*120+w.y,1.05); }
    for(let k=0;k<4;k++){ const w=wander(k+1250,t,10,0.8); mineraalIon(ctx,ZX+20+hash(k*3+1250)*150+w.x,ZY-120+hash(k*3+1251)*240+w.y,1.05); }
    ctx.restore();
    naamBij(ctx,'wortelhaarcel','',ZX+ZR+24,ZY+10,1,'left',C.text);
    const mm=ramp(t,q.at('meer'),0.5); if(mm>0){ pill(ctx,1560,470,'binnen: veel mineralen',C.oker,mm,28); pill(ctx,1560,570,'buiten: weinig',C.oker,mm,28); }
    ctx.restore(); }
},
s31(ctx,t,q){
  micro(ctx); const my=470, pX=960;
  const lkX=pX-420; const stop=ramp(t,q.at('Zonder'),0.6);
  memMix(ctx,my,60,1860,t,[{gaten:[[pX-110,pX+110]],w:1-stop},{gaten:[[pX-110,pX+110]],kanalen:[{x:lkX}],w:stop}]);
  metaText(ctx,'buiten: weinig',80,200,C.grain,'left',26); metaText(ctx,'binnen: veel',80,840,C.grain,'left',26);
  for(let k=0;k<5;k++){ const w=wander(k+1300,t,40,1); mineraalIon(ctx,240+hash(k*3+1300)*1400+w.x,200+hash(k*3+1301)*150+w.y,1.3); }
  for(let k=0;k<26;k++){ const w=wander(k+1350,t,30,1); const x=160+hash(k*3+1350)*1600+w.x; if(Math.abs(x-pX)<150) continue; mineraalIon(ctx,x,640+hash(k*3+1351)*200+w.y,1.3); }
  const run=ramp(t,q.at('eiwit'),0.5)*(1-stop); const cyc=(t/3)%1; const flip=cyclus(cyc)*run;
  pompEiwit(ctx,pX,mY(pX,my),memRot(pX),1.6,flip,{t});
  if(run>0){ const y= cyc<0.35? lerp(250,my-30,ease(cyc/0.35)) : cyc<0.55? lerp(my-30,my+30,cyclus(cyc)) : lerp(my+30,720,ease((cyc-0.55)/0.45)); mineraalIon(ctx,pX+6,y,1.4,run);
    const ea=ramp(t,q.at('ATP'),0.5); if(ea>0){ const pop=cyc<0.3?0: cyc<0.55? (cyc-0.3)/0.25 : 1; atp(ctx,pX+200,my+170,ea*run,1.5,pop); if(cyc>0.3&&cyc<0.7){ ctx.save(); ctx.globalAlpha=ea*run; metaText(ctx,'energie',pX+200,my+270,C.koraal,'center',26); ctx.restore(); } } }
  const tg=ramp(t,q.at('tegen'),0.5)*(1-stop); if(tg>0){ ctx.save(); ctx.globalAlpha=tg; metaText(ctx,'van weinig (buiten) naar veel (binnen):',pX+170,250,C.oker,'left',26); metaText(ctx,'tegen het concentratieverschil in',pX+170,290,C.oker,'left',26); ctx.restore(); }
  pill(ctx,960,150,'actief transport: kost ATP',C.koraal,ramp(t,q.at('actief'),0.5)*(1-ramp(t,q.at('Zonder')-0.35,0.3)),30);
  naamBij(ctx,'pomp','eiwit in het membraan',pX-125,my-100,ramp(t,q.at('pomp'),0.5)*(1-stop),'right');
  if(stop>0){ atp(ctx,pX+200,my+170,stop,1.5,0,''); crossOut(ctx,pX+200,my+170,60,stop); pill(ctx,960,150,'geen ATP: de pomp staat stil',C.koraal,stop,30);
    const lk=ramp(t,q.at('lekken'),0.5); if(lk>0){ for(let k=0;k<3;k++){ const u=((t*0.25+k/3)%1); mineraalIon(ctx,lkX,lerp(720,230,u),1.3,lk*Math.min(1,u*6,(1-u)*6)); } ctx.save(); ctx.globalAlpha=lk; metaText(ctx,'lekt langzaam terug via een kanaal',lkX+80,300,C.grain,'left',26); ctx.restore(); } }
  scaleBar(ctx);
},
s32(ctx,t,q){
  micro(ctx); const my=470, pX=960; const KC=ION.k; const NA=ION.na;
  memH(ctx,my,60,1860,{t,gaten:[[pX-120,pX+120]]});
  metaText(ctx,'buiten',80,200,C.grain,'left',26); metaText(ctx,'binnen',80,840,C.grain,'left',26);
  const t0=q.at('natrium',2); const on=ramp(t,t0,0.5);
  const P=6.5; const n=on>0? Math.max(0,(t-t0)/P) : 0; const rnd=Math.floor(n), c=n-rnd;
  const openOut= c<0.22?0 : c<0.34? ease((c-0.22)/0.12) : c<0.62?1 : c<0.74? 1-ease((c-0.62)/0.12) : 0;
  pompEiwit(ctx,pX,mY(pX,my),memRot(pX),1.7,1-openOut*on,{t});
  const done=on>0? rnd + (c>0.46?1:0) : 0, doneK=on>0? rnd + (c>0.9?1:0) : 0;
  const nNa=Math.min(14,5+3*done), nK=Math.min(12,4+2*doneK);
  for(let k=0;k<nNa;k++){ const w=wander(k+1600,t,14,0.8); ionMol(ctx,1220+(k%7)*80+w.x,230+Math.floor(k/7)*80+w.y,'na',1.4); }
  for(let k=0;k<nK;k++){ const w=wander(k+1650,t,14,0.8); ionMol(ctx,1220+(k%6)*90+w.x,700+Math.floor(k/6)*80+w.y,'k',1.4); }
  if(on>0){ ctx.save(); ctx.globalAlpha=on;
    for(let k=0;k<3;k++){ const bx=pX-30+k*30; let x,y,a=1;
      if(c<0.16){ x=lerp(620+k*70,bx,ease(c/0.16)); y=lerp(800,my+40,ease(c/0.16)); }
      else if(c<0.22){ x=bx; y=my+40; }
      else if(c<0.34){ x=bx; y=lerp(my+40,my-40,ease((c-0.22)/0.12)); }
      else if(c<0.46){ const u=ease((c-0.34)/0.12); x=lerp(bx,1220+((nNa-3+k)%7)*80,u); y=lerp(my-40,230+Math.floor((nNa-3+k)/7)*80,u); }
      else { a=0; x=bx; y=my; }
      ionMol(ctx,x,y,'na',1.5,a); }
    for(let k=0;k<2;k++){ const bx=pX-18+k*36; let x,y,a=1;
      if(c<0.46){ a=0; x=bx; y=200; }
      else if(c<0.62){ const u=ease((c-0.46)/0.16); x=lerp(700+k*90,bx,u); y=lerp(210,my-40,u); }
      else if(c<0.74){ x=bx; y=lerp(my-40,my+40,ease((c-0.62)/0.12)); }
      else if(c<0.9){ const u=ease((c-0.74)/0.16); x=lerp(bx,1220+((nK+k)%6)*90,u); y=lerp(my+40,700+Math.floor((nK+k)/6)*80,u); }
      else { a=0; x=bx; y=my; }
      ionMol(ctx,x,y,'k',1.5,a); }
    const pop= c<0.16?0 : c<0.3? (c-0.16)/0.14 : 1; const aA= c<0.8?1:Math.max(0,1-(c-0.8)/0.1);
    atp(ctx,pX-150,my+210,aA,1.4,pop);
    ctx.restore(); }
  naamBij(ctx,'natrium-kaliumpomp','',pX-135,my-120,ramp(t,q.at('kaliumpomp'),0.5),'right',C.text);
  if(on>0){ const st= c<0.22?1 : c<0.46?2 : 3; const txt=['1 · 3 Na⁺ binden binnen · ATP → ADP + P','2 · pomp klapt om · 3 Na⁺ los buiten','3 · 2 K⁺ binden buiten · pomp klapt terug · K⁺ los binnen'][st-1];
    pill(ctx,640,130,txt,st===3?KC:(st===2?NA:C.koraal),on*(1-ramp(t,q.at('zenuwimpulsen'),0.4)),28); }
  ctx.save(); ctx.globalAlpha=on; text(ctx,'3 Na⁺ naar buiten',1200,170,fTekst(36,600),NA,'left'); text(ctx,'2 K⁺ naar binnen',1200,650,fTekst(36,600),KC,'left'); ctx.restore();
  const zi=ramp(t,q.at('zenuwimpulsen'),0.5); if(zi>0) pill(ctx,560,880,'zie je terug bij zenuwimpulsen',C.text,zi,30);
  scaleBar(ctx);
},
// ---------- Recap ----------
s33(ctx,t,q){
  bg(ctx,'schema'); const boat=ramp(t,q.at('vraag'),0.8); const pa=1-boat;
  if(pa>0){ ctx.save(); ctx.globalAlpha=pa;
    const P=[['alles beweegt','niemand stuurt','beweegt'],['diffusie','van veel naar weinig','diffusie'],['membraan','selectief doorlatend','celmembraan'],['osmose','naar de hoogste osmotische waarde','kaatst'],['actief transport','bergop, met ATP','bergop']];
    P.forEach((p,i)=>{ const a=ramp(t,q.at(p[2]),0.5); if(a<=0) return; const x=110+i*345, y=200, w=320, h=470; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y,w,h,14); shape(ctx,rgba(C.bgMicro,0.9),C.line,1);
      const cx=x+w/2, cy=y+200; ctx.save(); roundRect(ctx,x+2,y+2,w-4,h-150,12); ctx.clip();
      const mini=(cy0,eiw)=>{ const R=520; membraanBoog(ctx,cx,cy0+R,R,-Math.PI/2-0.27,-Math.PI/2+0.27,{s:0.62,t,golf:0.4,eiwitten:eiw||[]}); };
      if(i===0){ waterField(ctx,x+20,y+40,x+w-20,y+300,30,t,2,0.7,i*50,4); for(let k=0;k<7;k++){ const ww=wander(k+1400,t,40,2.2); kleurstof(ctx,cx+(hash(k)*2-1)*80+ww.x,cy+(hash(k+3)*2-1)*80+ww.y,1.1,t+k); } }
      if(i===1){ for(let k=0;k<10;k++){ kleurstof(ctx,cx-100+(k%3)*24,cy-60+Math.floor(k/3)*36,0.9,k); } kleurstof(ctx,cx+80,cy,0.9,1); arrow(ctx,cx-30,cy,cx+50,cy,C.goud,5,18); }
      if(i===2){ mini(cy-10); o2(ctx,cx-60,cy-90+((t*40)%140),1.1); ionMol(ctx,cx+60,cy-80,'na',0.9,1,true,t); }
      if(i===3){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(Math.PI/2); ctx.translate(-cx,-cy); mini(cy,[{an:-Math.PI/2,soort:'kanaal',open:1}]); ctx.restore(); ionMol(ctx,cx+75,cy-70,'na',0.9,1,true,t); ionMol(ctx,cx+90,cy+60,'cl',0.9,1,true,t); for(let k=0;k<3;k++){ const u=((t*0.6+k/3)%1); h2o(ctx,lerp(cx-110,cx+80,u),cy,5,k,Math.min(1,u*6,(1-u)*6)); } arrow(ctx,cx-110,cy+120,cx+70,cy+120,C.teal,6,22); }
      if(i===4){ mini(cy-10); arrow(ctx,cx-50,cy+110,cx-50,cy-110,C.oker,6,22); atp(ctx,cx+60,cy+90,1,0.9,0,'ATP'); }
      ctx.restore();
      text(ctx,p[0],cx,y+h-110,fTekst(34,600),C.text,'center'); ctx.font=fTekst(26); ctx.fillStyle=C.text2; ctx.textAlign='center'; wrap(ctx,p[1],cx,y+h-66,w-40,30);
      ctx.restore(); });
    ctx.restore(); }
  if(boat>0){ ctx.save(); ctx.globalAlpha=boat; bg(ctx,'macro');
    ctx.fillStyle='#24456E'; ctx.fillRect(0,560,W,340); for(let k=0;k<7;k++){ ctx.strokeStyle=rgba(C.teal,0.5); ctx.lineWidth=3; ctx.beginPath(); for(let x=0;x<=W;x+=20){ const y=600+k*40+Math.sin(x/90+t*1.5+k)*8; x?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); }
    // zon (vlak, zonder gloed): warm, je hebt dorst
    ctx.strokeStyle='#F7D27A'; ctx.lineWidth=5; ctx.lineCap='round'; for(let k=0;k<10;k++){ const a=k/10*6.283+t*0.05; ctx.beginPath(); ctx.moveTo(1560+Math.cos(a)*72,190+Math.sin(a)*72); ctx.lineTo(1560+Math.cos(a)*100,190+Math.sin(a)*100); ctx.stroke(); }
    ctx.fillStyle='#F7D27A'; ctx.beginPath(); ctx.arc(1560,190,56,0,6.283); ctx.fill();
    const by=566+Math.sin(t*1.3)*6, rot=Math.sin(t*1.3+0.8)*0.018; ctx.save(); ctx.translate(960,by); ctx.rotate(rot); ctx.translate(-960,-by);
    const hout=C.bruin, houtD=_donker(hout,0.25), houtL=lighten(hout,0.18);
    ctx.beginPath(); ctx.moveTo(740,by-6); ctx.quadraticCurveTo(960,by-34,1180,by-6); ctx.lineTo(1180,by+6); ctx.quadraticCurveTo(960,by-14,740,by+6); ctx.closePath(); ctx.fillStyle=houtD; ctx.fill();
    ctx.beginPath(); ctx.moveTo(748,by); ctx.quadraticCurveTo(960,by-22,1172,by); ctx.lineTo(1150,by+30); ctx.lineTo(770,by+30); ctx.closePath(); ctx.fillStyle=_donker(hout,0.45); ctx.fill();
    const ux=ramp(t,q.at('dorst'),0.6), uz=ramp(t,q.at('zeewater'),0.6), ud=ramp(t,q.at('denk'),0.5);
    const uit= ud>0.5 ? 'denkt' : uz>0.5 ? 'bezorgd' : ux>0.5 ? 'moe' : 'neutraal';
    ctx.save(); ctx.beginPath(); ctx.rect(600,0,720,by+12); ctx.clip();
    persoon(ctx,'noor',960,by+174,400,{ outfit:'zomer', uit, t });
    ctx.restore();
    ctx.strokeStyle=houtL; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(1120,by-40); ctx.lineTo(1290,by+70); ctx.stroke(); ctx.fillStyle=houtL; ctx.beginPath(); ctx.ellipse(1300,by+78,30,11,0.58,0,6.283); ctx.fill();
    ctx.beginPath(); ctx.moveTo(730,by); ctx.quadraticCurveTo(960,by+14,1190,by); ctx.quadraticCurveTo(1150,by+92,1080,by+100); ctx.lineTo(840,by+100); ctx.quadraticCurveTo(770,by+92,730,by); ctx.closePath(); ctx.fillStyle=hout; ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle=houtD; ctx.lineWidth=2.5; for(let k=1;k<4;k++){ const yy=by+k*25; ctx.beginPath(); ctx.moveTo(700,yy); ctx.quadraticCurveTo(960,yy+10,1220,yy); ctx.stroke(); }
      ctx.fillStyle='rgba(0,0,0,0.18)'; ctx.fillRect(700,by+70,520,40); ctx.restore();
    ctx.strokeStyle=houtL; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(730,by); ctx.quadraticCurveTo(960,by+14,1190,by); ctx.stroke();
    ctx.restore();
    ctx.strokeStyle=rgba(C.teal,0.55); ctx.lineWidth=3; ctx.beginPath(); for(let x=700;x<=1220;x+=16){ const y=by+92+Math.sin(x/60+t*2)*5; x>700?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke();
    const zt=ramp(t,q.at('dorst'),0.5); if(zt>0) pill(ctx,960,170,'dorst, en overal zeewater',C.text,zt*(1-ramp(t,q.at('zeewater'),0.4)),30);
    const zw=ramp(t,q.at('zeewater'),0.5); if(zw>0) pill(ctx,960,170,'mag je zeewater drinken?',C.goud,zw,30);
    ctx.restore(); }
},
s35(ctx,t,q){
  bg(ctx,'schema'); const cellPart=ramp(t,q.at('zouter'),0.7);
  const k1=1-cellPart; if(k1>0){ ctx.save(); ctx.globalAlpha=k1;
    const bars=[['zeewater',3.5,C.goud],['bloed',0.9,C.bloed]]; bars.forEach((b,i)=>{ const y=200+i*110; const w=b[1]/3.5*900; roundRect(ctx,420,y,w*ramp(t,0.2+i*0.3,0.8),70,10); ctx.fillStyle=rgba(b[2],0.75); ctx.fill(); text(ctx,b[0],390,y+48,fTekst(34,600),C.text,'right'); metaText(ctx,(b[1]+'').replace('.',',')+' % zout',440+w,y+46,C.grain,'left',26); });
    pill(ctx,700,440,'ongeveer 4 × zo zout',C.goud,ramp(t,q.at('vier'),0.5),28);
    const kd=ramp(t,q.at('nieren'),0.5); if(kd>0){ ctx.save(); ctx.globalAlpha*=kd; ctx.beginPath(); ctx.ellipse(700,620,110,150,0,0,6.2832); shape(ctx,'#9A4A4A',lighten('#9A4A4A',0.3),2); ctx.beginPath(); ctx.ellipse(815,620,48,58,0,0,6.2832); ctx.fillStyle=C.bgSchema; ctx.fill(); metaText(ctx,'nier',700,815,C.grain,'center',26); ctx.restore();
      pill(ctx,1180,560,'een plas kan niet zo zout worden als zeewater',C.text,kd*(1-ramp(t,q.at('kwijt'),0.4)),26); }
    const kw=ramp(t,q.at('kwijt'),0.5); if(kw>0){ arrow(ctx,820,700,1060,760,C.teal,8,26,kw); pill(ctx,1320,640,'om het zout kwijt te raken: extra water nodig',C.teal,kw,26); const mm=ramp(t,q.at('meer'),0.5); if(mm>0) pill(ctx,1320,760,'je plast meer water uit dan je dronk',C.koraal,mm,26); }
    ctx.restore(); }
  if(cellPart>0){ ctx.save(); ctx.globalAlpha=cellPart; beaker(ctx,960,520,640,500,0.8,rgba(C.teal,0.14),1,'zouter bloed');
    for(let k=0;k<20;k++){ const w=wander(k+1500,t,20,1); ionMol(ctx,700+hash(k*3+1500)*520+w.x,330+hash(k*3+1501)*360+w.y,k%2?'cl':'na',0.75); }
    const s=ramp(t,q.at('cellen'),1.5); bloedcelOsmose(ctx,960,540,90,0,s,0,1);
    for(let k=0;k<6;k++){ const a=k/6*6.2832; arrow(ctx,960+Math.cos(a)*120,540+Math.sin(a)*100,960+Math.cos(a)*220,540+Math.sin(a)*180,C.teal,3,14,ramp(t,q.at('verliezen'),0.4)); }
    pill(ctx,960,160,'je cellen verliezen water door osmose',C.teal,ramp(t,q.at('osmose'),0.5),30);
    ctx.restore(); }
}
};
