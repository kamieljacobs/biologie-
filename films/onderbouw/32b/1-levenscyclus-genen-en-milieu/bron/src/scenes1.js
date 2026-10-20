// ===== 32B film 1 — Levenscyclus: genen en milieu =====
// Rode draad: twee boontjes van Noor en opa Henk (zon / schaduw). Genen = paars, licht/zon = goud, water/koud = teal, warmte = koraal.
const YB1=780; // grondlijn tuin
function bonenTuin(t,gZon,gSch,o={}){ tuinDag({yb:YB1,zx:300,zy:130}); schuur(1360,YB1,460,430); schaduwVlak(1080,1360,YB1,1);
  boonPlant(620,YB1,1,gZon,0,{zaad:gZon<0.2}); boonPlant(1180,YB1,1,gSch,o.etiol==null?gSch:o.etiol,{zaad:gSch<0.2}); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tB=q.at('Twee'), tZ=q.at('zon,'), tS=q.at('schaduw'), tD=q.at('Drie'), tG=q.at('groen.'), tBl=q.at('bleek.'), tW=q.at('Waarom');
  const g=ramp(t,tD,2.2); bonenTuin(t,0.05+g,0.05+g,{etiol:g});
  const weg=ramp(t,tD-0.6,0.6);
  persoon(ctx,'noor',420,YB1+40,420,{outfit:'zomer',pose:t<tD?'wijs':'staan',uit:t>tBl?'verbaasd':'blij',kijk:1,t,a:1-weg*0.0});
  persoon(ctx,'henk',900,YB1+40,410,{pose:'staan',uit:'blij',kijk:-1,t,a:1-weg});
  pill(ctx,620,560,'in de zon',C.goud,fadeIO(t,tZ,tD,0.3),30); pill(ctx,1180,560,'in de schaduw',C.text2,fadeIO(t,tS,tD,0.3),30);
  pill(ctx,W/2,120,'3 weken later',C.grain,ramp(t,tD,0.4),30);
  naamBij(ctx,'stevig en groen','',560,330,ramp(t,tG-0.3,0.4),'right',C.groen); naamBij(ctx,'lang, dun en bleek','',1240,260,ramp(t,tBl-0.6,0.4),'left',C.text);
  vraagteken(900,560,ramp(t,tW,0.4)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Levenscyclus',120,330,fTitel(96),C.text); text(ctx,'genen en milieu',120,410,fTekst(48,600),C.paars); text(ctx,'Lijk je op je ouders, of op je omgeving?',120,480,fTekst(40),C.text2); });
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(1150,780); ctx.lineTo(1800,780); ctx.stroke();
  boonPlant(1330,780,1,ramp(t,0.3,1.2),0); boonPlant(1620,780,1,ramp(t,0.6,1.2),ramp(t,0.6,1.2));
  zonIcoon(1330,190,30,ramp(t,1,0.5)); metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 1',W-80,60,C.text2,'right',24); },
// ---- H1: levenscyclus boon ----
s04(ctx,t,q){ bg(ctx,'schema'); const tZ=q.at('zaadje'), tW=q.at('warmte'), tO=q.at('ontkiemt'), tP=q.at('plant'), tBl=q.at('bloemen.'), tPe=q.at('peulen,'), tN=q.at('nieuwe'), tZZ=q.at('Van'), tL=q.at('levenscyclus.');
  const items=[
    {naam:'zaadje', draw:(x,y)=>zaadje(x,y,1.6), kleur:C.oker},
    {naam:'kiemplant', draw:(x,y)=>kiemplant(x,y+20,1.1), kleur:C.groen},
    {naam:'bloemen', draw:(x,y)=>bloeiendeTak(x,y-10,1.1), ly:110},
    {naam:'peulen', draw:(x,y)=>peulOpen(x,y,1.1), kleur:C.groen},
    {naam:'nieuwe zaadjes', draw:(x,y)=>{ zaadje(x-30,y,1.1); zaadje(x+30,y+10,1.1); }, kleur:C.oker}];
  const tt=[tZ,tO,tBl,tPe,tN];
  cyclusRing(W/2,440,330,items,i=>ramp(t,tt[i]-0.2,0.5),{sluit:t>tZZ});
  // water + warmte bij het zaadje
  druppel(W/2-150,150,1,fadeIO(t,tW-0.5,tO+1.5,0.3)); thermo(W/2+150,190,90,0.5,fadeIO(t,tW,tO+1.5,0.3));
  alpha(ctx,ramp(t,tL,0.5),()=>{ text(ctx,'levenscyclus',W/2,470,fTitel(56),C.goud,'center'); metaText(ctx,'van zaad tot zaad',W/2,520,C.grain,'center',26); });
  meta32b(); },
// ---- H1: kikker en mens ----
s05(ctx,t,q){ bg(ctx,'schema'); const tE=q.at('eitje'), tV=q.at('kikkervisje'), tP=q.at('pootjes,'), tSt=q.at('verdwijnt.'), tK=q.at('kikker.'), tLe=q.at('legt'), tM=q.at('mensen'), tBa=q.at('Baby,'), tKi=q.at('kind,'), tTi=q.at('tiener,'), tVo=q.at('volwassene.'), tKr=q.at('kinderen');
  if(t<tM-0.3){ sloot(160,180,1600,560,0,0.35);
    const items=[{naam:'eitjes', draw:(x,y)=>kikkerEi(x,y,1.2)},{naam:'kikkervisje', draw:(x,y)=>kikkervisje(x,y,1.3,0,1,1,t)},{naam:'met pootjes', draw:(x,y)=>kikkervisje(x,y,1.3,1,1-0.8*ramp(t,tSt-0.6,1.2),1,t), ly:100},{naam:'kikker', draw:(x,y)=>kikker(x,y,1.2), kleur:C.groen, ly:100}];
    const tt=[tE,tV,tP,tK]; cyclusRing(W/2,460,300,items,i=>ramp(t,tt[i]-0.2,0.5),{sluit:t>tLe}); return; }
  // mens: baby, kind, tiener, volwassene op één grondlijn
  ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(140,780); ctx.lineTo(1780,780); ctx.stroke();
  persoon(ctx,'baby',330,780,190,{uit:'blij',t,a:ramp(t,tBa-0.2,0.4)}); naamBij(ctx,'baby','',330,840,ramp(t,tBa,0.4),'center');
  persoon(ctx,'kind',720,780,330,{uit:'blij',t,a:ramp(t,tKi-0.2,0.4)}); naamBij(ctx,'kind','',720,840,ramp(t,tKi,0.4),'center');
  persoon(ctx,'noor',1110,780,500,{uit:'blij',t,a:ramp(t,tTi-0.2,0.4)}); naamBij(ctx,'tiener','',1110,840,ramp(t,tTi,0.4),'center');
  persoon(ctx,'kim',1520,780,540,{uit:'blij',kijk:-1,t,a:ramp(t,tVo-0.2,0.4)}); naamBij(ctx,'volwassene','',1520,840,ramp(t,tVo,0.4),'center');
  for(let i=0;i<3;i++) arrow(ctx,440+i*390,500,600+i*390,500,C.line,3,14,ramp(t,[tKi,tTi,tVo][i]-0.3,0.4));
  alpha(ctx,ramp(t,tKr,0.5),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(1520,210); ctx.quadraticCurveTo(920,40,330,560); ctx.stroke(); ctx.setLineDash([]); arrow(ctx,345,530,330,575,C.goud,3,16); });
  metaText(ctx,'levenscyclus van de mens',W/2,140,C.grain,'center',26); },
// ---- H2: genen en milieu ----
s06(ctx,t,q){ bg(ctx,'schema'); const tN=q.at('Nooit'), tH=q.at('Hoe'), tC=q.at('celkern.'), tB=q.at('bouwtekening:'), tE=q.at('erfelijke'), tG=q.at('gen.',2), tO=q.at('ouders.'), tNo=q.at('Noor'), tM=q.at('Maar'), tMi=q.at('milieu.'), tLi=q.at('Licht,'), tWa=q.at('water,'), tVo=q.at('voedsel,'), tTe=q.at('temperatuur.'), tTw=q.at('twee'), tSc=q.at('schaduw'), tSt=q.at('stengel'), tBg=q.at('bladgroen.'), tBl=q.at('bleek.');
  if(t<tC-0.4){ // boon wordt boonplant, nooit zonnebloem
    ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(300,800); ctx.lineTo(1620,800); ctx.stroke();
    zaadje(420,760,1.6); arrow(ctx,500,740,640,700,C.line,3,14); boonPlant(800,800,1,ramp(t,0.2,1.2),0);
    alpha(ctx,ramp(t,tN,0.4),()=>{ ctx.strokeStyle=BOON.stengel; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(1350,800); ctx.lineTo(1350,420); ctx.stroke(); flower(1350,380,2.2,1); crossOut(ctx,1350,560,120,1); });
    vraagteken(1050,300,ramp(t,tH,0.4)); return; }
  if(t<tM-0.3){ // bouwtekening in de kern -> gen; Noor en Teun
    const zoom=1-ramp(t,tNo-0.6,0.6);
    alpha(ctx,zoom,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,CAPTION_Y); blob(ctx,700,450,430,330,0.03,2); shape(ctx,rgba('#AFC0D0',0.06),C.er,2);
      kernDraden(700,450,200,ramp(t,tC-0.4,0.5),t,ramp(t,tG-0.8,0.4)); naamBij(ctx,'celkern','',700,720,ramp(t,tC,0.4),'center',C.paars);
      naamBij(ctx,'erfelijke informatie','bouwtekening',1180,260,ramp(t,tE-0.3,0.4),'left',C.paars);
      genStreep(1180,380,560,40,ramp(t,tE,0.5),4,ramp(t,tG-0.6,0.4)); naamBij(ctx,'gen','voor één eigenschap',1180+560*4.5/9,500,ramp(t,tG-0.5,0.4),'center',C.goud);
      metaText(ctx,'vergroot · cel ± 1000×',60,CAPTION_Y-14,C.text2,'left',22); });
    alpha(ctx,1-zoom,()=>{ bg(ctx,'schema'); persoon(ctx,'noor',780,800,500,{uit:'blij',t,kijk:1}); persoon(ctx,'kind',1080,800,330,{uit:'blij',t,kijk:-1});
      genStreep(560,140,320,30,ramp(t,tNo,0.4)); genStreep(1000,140,320,30,ramp(t,tNo+0.3,0.4)); naamBij(ctx,'van hun ouders','donker haar',W/2,240,ramp(t,tNo+1.5,0.4),'center',C.paars); });
    return; }
  if(t<tTw-0.4){ // milieu: licht, water, voedsel, temperatuur rond een plant
    ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(660,760); ctx.lineTo(1260,760); ctx.stroke(); boonPlant(960,760,0.9,1,0);
    naamBij(ctx,'milieu','alles om je heen',W/2,150,ramp(t,tMi-0.3,0.4),'center',C.goud);
    alpha(ctx,ramp(t,tLi,0.4),()=>{ zonIcoon(420,300,40,1); text(ctx,'licht',420,420,fTekst(34,600),C.text,'center'); });
    alpha(ctx,ramp(t,tWa,0.4),()=>{ druppel(1500,300,1.6); text(ctx,'water',1500,420,fTekst(34,600),C.text,'center'); });
    alpha(ctx,ramp(t,tVo,0.4),()=>{ bordje(420,640,1.4); text(ctx,'voedsel',420,730,fTekst(34,600),C.text,'center'); });
    alpha(ctx,ramp(t,tTe,0.4),()=>{ thermo(1500,690,150,0.55,1); text(ctx,'temperatuur',1500,760,fTekst(34,600),C.text,'center'); });
    return; }
  // de twee boontjes: zon en schaduw
  bonenTuin(t,1,1,{etiol:ramp(t,tSt-0.5,1.5)});
  genStreep(470,120,300,30,1); genStreep(1030,120,300,30,1); naamBij(ctx,'bijna dezelfde genen','',W/2,220,fadeIO(t,tTw,tSc,0.4),'center',C.paars);
  naamBij(ctx,'te weinig licht','',1240,300,fadeIO(t,tSc,tBg-0.2,0.4),'left',C.text);
  naamBij(ctx,'lang, dun en bleek','weinig bladgroen',1240,300,ramp(t,tBg,0.4),'left',C.text); },
// ---- H2: mensen ----
s07(ctx,t,q){ bg(ctx,'schema'); const tL=q.at('lang'), tG=q.at('genen.'), tE=q.at('eet.'), tS=q.at('Sam'), tB=q.at('beenspieren.'), tK=q.at('Krijgt'), tW=q.at('Wat');
  if(t<tS-0.3){ ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(300,800); ctx.lineTo(1620,800); ctx.stroke();
    // meetlat
    ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(700,800); ctx.lineTo(700,200); ctx.stroke(); for(let k=0;k<=12;k++){ ctx.beginPath(); ctx.moveTo(700,800-k*50); ctx.lineTo(k%2?715:730,800-k*50); ctx.stroke(); }
    persoon(ctx,'daan',900,800,520,{uit:'blij',t,a:ramp(t,0.1,0.4)}); persoon(ctx,'lotte',1250,800,520,{uit:'blij',kijk:-1,t,a:ramp(t,0.3,0.4)});
    alpha(ctx,ramp(t,tG-0.4,0.4),()=>{ genStreep(380,300,260,30,1); text(ctx,'genen',510,380,fTekst(34,600),C.paars,'center'); });
    alpha(ctx,ramp(t,tE-0.6,0.4),()=>{ bordje(1560,330,1.4); text(ctx,'voedsel',1560,420,fTekst(34,600),C.text,'center'); }); return; }
  persoon(ctx,'sam',760,820,560,{outfit:'sport',pose:'handenHeup',uit:'blij',t});
  alpha(ctx,ramp(t,tB-0.3,0.4),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; [[730,700],[790,700]].forEach(([x,y])=>{ ctx.beginPath(); ctx.ellipse(x,y,26,44,0,0,6.283); ctx.stroke(); }); naamBij(ctx,'sterke beenspieren','door trainen',520,620,1,'right',C.koraal); });
  pill(ctx,760,170,'elke dag trainen',C.grain,ramp(t,tS,0.4),30);
  alpha(ctx,ramp(t,tK,0.5),()=>{ kaart(1180,300,520,380,C.paars,1); text(ctx,'zijn kind, later',1440,360,fTekst(34,600),C.text,'center'); persoon(ctx,'kind',1440,640,240,{uit:'neutraal',t}); vraagteken(1620,520,1,90); });
  vraagteken(1100,250,ramp(t,tW,0.4)*0); },
// ---- H3: antwoord, kikkervisjes, hortensia's ----
s09(ctx,t,q){ bg(ctx,'schema'); const tT=q.at('Trainen'), tKi=q.at('kind'), tMi=q.at('milieu'), tWa=q.at('warme'), tKo=q.at('koud'), tO=q.at('Opa'), tSt=q.at('stekjes'), tZe=q.at('dezelfde'), tBl=q.at('blauw,'), tRo=q.at('roze.'), tH=q.at('Hoe');
  if(t<tMi-0.3){ persoon(ctx,'sam',560,820,520,{outfit:'sport',pose:'handenHeup',uit:'neutraal',t});
    alpha(ctx,1,()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(560,700,60,44,0,0,6.283); ctx.stroke(); naamBij(ctx,'spieren: veranderd','',560,250,ramp(t,tT,0.4),'center',C.koraal); });
    genStreep(880,420,300,34,1); naamBij(ctx,'genen: hetzelfde','',1030,380,ramp(t,tT+1.2,0.4),'center',C.paars);
    arrow(ctx,1200,437,1360,437,C.paars,4,16,ramp(t,tKi,0.4)); alpha(ctx,ramp(t,tKi,0.4),()=>{ persoon(ctx,'kind',1500,700,260,{uit:'blij',t}); genStreep(1380,250,240,26,1); });
    return; }
  if(t<tO-0.3){ const w=ramp(t,tWa,4), k=ramp(t,tKo,4);
    sloot(140,240,780,460,1,1); sloot(1000,240,780,460,0,1); thermo(220,640,160,0.75,1,C.koraal); thermo(1080,640,160,0.2,1,C.teal);
    text(ctx,'warm',530,200,fTekst(36,700),C.koraal,'center'); text(ctx,'koud',1390,200,fTekst(36,700),C.teal,'center');
    for(let i=0;i<3;i++){ const ww=wander(i,t,30,0.6); if(w>0.7) kikker(400+i*170+ww.x,520+ww.y*0.3,0.8); else kikkervisje(400+i*170+ww.x,480+ww.y,1,w*1.4,1-w,1,t); }
    for(let i=0;i<3;i++){ const ww=wander(i+9,t,30,0.6); kikkervisje(1260+i*170+ww.x,480+ww.y,1,k*0.6,1,1,t); }
    naamBij(ctx,'sneller een kikker','',530,780,ramp(t,tWa+1,0.4),'center',C.koraal); naamBij(ctx,'duurt langer','',1390,780,ramp(t,tKo,0.4),'center',C.teal); return; }
  tuinDag({yb:YB1,zx:1700}); persoon(ctx,'henk',300,YB1+30,420,{pose:t<tZe?'wijs':'staan',uit:'blij',kijk:1,t});
  const k=ramp(t,tBl-0.4,0.6);
  bloempot(800,YB1+40,200,140); bloempot(1350,YB1+40,200,140);
  if(t<tZe){ stekje(800,YB1-100,1.4,ramp(t,tSt,0.4)); stekje(1350,YB1-100,1.4,ramp(t,tSt+0.3,0.4)); alpha(ctx,ramp(t,tSt-0.6,0.4),()=>{ hortensia(1075,520,0.7,'#B8B8D8',1); naamBij(ctx,'één plant','',1075,330,1,'center'); }); }
  else { hortensia(800,YB1-100,1,k?_mixHex('#9ACB8E','#6C8FD0',k):null); hortensia(1350,YB1-100,1,ramp(t,tRo-0.4,0.6)?_mixHex('#9ACB8E','#E8A0C0',ramp(t,tRo-0.4,0.6)):null);
    genStreep(680,150,240,26,ramp(t,tZe,0.4)); genStreep(1230,150,240,26,ramp(t,tZe,0.4)); naamBij(ctx,'dezelfde genen','',1075,240,ramp(t,tZe,0.4),'center',C.paars); }
  vraagteken(1075,420,ramp(t,tH,0.4)); },
// ---- H3: de grond ----
s11(ctx,t,q){ tuinDag({yb:YB1,zx:1700}); const tZ=q.at('zure'), tK=q.at('kalkrijke'), tZe=q.at('Zelfde');
  bloempot(700,YB1+40,220,150,1,'#B0603A'); bloempot(1250,YB1+40,220,150,1,'#B0603A');
  hortensia(700,YB1-110,1.05,'#6C8FD0'); hortensia(1250,YB1-110,1.05,'#E8A0C0');
  alpha(ctx,ramp(t,tZ,0.4),()=>{ roundRect(ctx,590,YB1-100,220,40,8); shape(ctx,'#3A3A30','#5A5A48',1.5); naamBij(ctx,'zure grond','',700,YB1+110,1,'center',C.teal); });
  alpha(ctx,ramp(t,tK,0.4),()=>{ roundRect(ctx,1140,YB1-100,220,40,8); shape(ctx,'#8A7A60','#B0A080',1.5); for(let i=0;i<10;i++) dot(ctx,1150+hash(i)*200,YB1-90+hash(i*3)*20,3,'#F2F2EE'); naamBij(ctx,'kalkrijke grond','',1250,YB1+110,1,'center',C.text); });
  alpha(ctx,ramp(t,tZe,0.5),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,460,90,1000,90,16); ctx.fill(); text(ctx,'zelfde genen, ander milieu',W/2,150,fTekst(44,700),C.groen,'center'); }); },
// ---- uitdaging: Siamese kat ----
s12(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('gen'), tK=q.at('koel'), tO=q.at('Oren,',2), tS=q.at('samen,');
  const warm=fadeIO(t,tK-0.4,tS,0.6);
  siamees(820,560,1.4,1,warm,1,t);
  alpha(ctx,ramp(t,tG,0.4),()=>{ genStreep(1300,200,420,34,1,4,1); naamBij(ctx,'gen voor donkere haren','',1510,320,1,'center',C.paars); });
  alpha(ctx,warm,()=>{ naamBij(ctx,'warm: licht','',820,330,1,'center',C.koraal); naamBij(ctx,'koel: donker','oren · poten · staart · snuit',1300,520,1,'left',C.teal); });
  alpha(ctx,ramp(t,tS,0.5),()=>{ haak(ctx,400,1500,780,'genen + milieu samen',C.groen,1); }); },
// ---- samenvatting ----
s13(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('Van'), tE=q.at('eitje'), tB=q.at('baby'), tG=q.at('genen'), tM=q.at('milieu'), tL=q.at('Lijk'), tA=q.at('Allebei.');
  if(t<tG-0.3){ const xs=[400,960,1520];
    [[tV,(x)=>{ zaadje(x-60,420,1.3); arrow(ctx,x-20,420,x+20,420,C.line,3,12); boonPlant(x+90,520,0.45,1,0); },'zaad tot zaad'],[tE,(x)=>{ kikkerEi(x-70,430,0.9); arrow(ctx,x-20,430,x+20,430,C.line,3,12); kikker(x+90,440,0.9); },'eitje tot kikker'],[tB,(x)=>{ persoon(ctx,'baby',x-80,520,110,{t}); arrow(ctx,x-20,450,x+20,450,C.line,3,12); persoon(ctx,'kim',x+90,560,260,{t}); },'baby tot volwassene']]
    .forEach(([tt,fn,lab],i)=>{ alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ kaart(xs[i]-250,240,500,400,C.groen,1); fn(xs[i]); text(ctx,lab,xs[i],610,fTekst(32,600),C.text,'center'); }); });
    naamBij(ctx,'levenscyclus','',W/2,170,ramp(t,0.3,0.4),'center',C.goud); return; }
  ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(W/2,220); ctx.lineTo(W/2,720); ctx.stroke();
  alpha(ctx,ramp(t,tG-0.2,0.4),()=>{ text(ctx,'van je ouders',520,240,fTekst(40,700),C.paars,'center'); genStreep(330,330,380,40,1); persoon(ctx,'noor',440,760,320,{uit:'blij',t}); persoon(ctx,'kind',620,760,220,{uit:'blij',t}); });
  alpha(ctx,ramp(t,tM-0.2,0.4),()=>{ text(ctx,'van je omgeving',1400,240,fTekst(40,700),C.goud,'center'); zonIcoon(1220,360,30,1); druppel(1400,360,1.2); thermo(1580,410,90,0.5,1); boonPlant(1400,760,0.6,1,0); });
  alpha(ctx,ramp(t,tA-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.95); roundRect(ctx,W/2-180,440,360,100,20); ctx.fill(); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.stroke(); text(ctx,'allebei',W/2,508,fTitel(56),C.goud,'center'); }); },
// ---- eindkaart ----
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'levenscyclus · genen en milieu',120,260,C.grain,'left',26);
  const P=[['Licht of donker?','Zaai vier bonen in twee potjes. Eén potje in de vensterbank, één in een donkere kast. Meet en kijk elke twee dagen.'],['Levenscyclus-strip','Kies een dier of plant. Teken de levenscyclus als een kringloop in vier tot zes plaatjes.'],['Genen of milieu?','Maak een lijstje van tien eigenschappen van jezelf. Welke komen uit je genen, welke uit je milieu, welke uit allebei?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een plant in een donkere kast wordt lang en bleek. Komt dat door zijn genen of door zijn milieu? Leg uit.',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
