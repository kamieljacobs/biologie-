// ===== 32C film 1 — Voeding en beweging: scènes =====
// Rode draad: drie vakken (brandstoffen koraal, bouwstoffen oker, beschermende stoffen groen) die in H1 gevuld worden en in H3 terugkomen;
// zeilschip (cold open) → citroenen (H1); astronaut met botdoorsnede (H2); Sam op de sportdag (H3).

const VAKKEN=[['brandstoffen','energie',C.koraal,180],['bouwstoffen','bouwen',C.oker,720],['beschermende stoffen','beschermen',C.groen,1260]];
function drieVakken(t,aB,aBo,aBe,y0=230,h=520){ const A=[aB,aBo,aBe]; VAKKEN.forEach(([n,sub,k,x],i)=>vak(x,y0,480,h,n,k,A[i],sub)); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tZ=q.at('Zeelui'), tV=q.at('voeren'), tE=q.at('eten'), tB=q.at('scheepsbeschuit'), tVl=q.at('vlees.'), tZi=q.at('ziek.'), tT=q.at('tandvlees'), tM=q.at('doodmoe.'), tW=q.at('ontbrak');
  if(t<tZ-0.2){ bg(ctx,'schema'); text(ctx,'Wat heeft je lichaam echt nodig?',W/2,380,fTitel(72),C.text,'center'); [brood,appel,vis,melk,broccoli].forEach((f,i)=>f(560+i*200,620,1.5,ramp(t,0.3+i*0.3,0.4))); return; }
  nachtZee(t); zeilschip(760,640,1,t);
  pill(ctx,1460,120,'maanden op zee',C.grain,fadeIO(t,tV,tE,0.4),28);
  // proviand aan dek (inzet)
  inset(1440,380,190,fadeIO(t,tE,tW+3,0.4),()=>{ ctx.fillStyle='#3A2E24'; ctx.fillRect(1250,190,380,380); vat(1350,430,1.1); for(let i=0;i<5;i++) beschuit(1470+(i%2)*60,360+i*36,0.9,ramp(t,tB+i*0.1,0.3)); vlees(1530,500,1.2,ramp(t,tVl,0.3)); });
  alpha(ctx,fadeIO(t,tE,tW+3,0.4),()=>metaText(ctx,'genoeg eten aan boord',1440,610,C.grain,'center',22));
  // zieke zeeman
  alpha(ctx,ramp(t,tZi,0.5),()=>{ persoon(ctx,'henk',360,1000,330,{uit:t>tM?'bezorgd':'neutraal',pose:'staan',kijk:1,t,a:1}); });
  pill(ctx,360,560,'bloedend tandvlees',C.koraal,ramp(t,tT,0.4),26); pill(ctx,360,610,'doodmoe',C.koraal,ramp(t,tM,0.4),26);
  alpha(ctx,ramp(t,tW,0.4),()=>text(ctx,'?',1100,330,fTitel(130),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Voeding en beweging',120,330,fTitel(96),C.text); text(ctx,'Wat heeft je lichaam echt nodig?',120,410,fTekst(44),C.text2); });
  [[brood,1280,560],[vis,1500,520],[sinaasappel,1700,570],[broccoli,1380,700],[ei,1600,700]].forEach(([f,x,y],i)=>f(x,y,1.6,ramp(t,0.4+i*0.2,0.5)));
  alpha(ctx,ramp(t,1.4,0.6),()=>persoon(ctx,'lotte',1150,860,300,{outfit:'sport',pose:'zwaai',uit:'blij',t,kijk:1}));
  metaText(ctx,'ONDERBOUW · KERNDOELEN · 32C · FILM 1',W-80,60,C.text2,'right',24); },
// ---- H1: drie taken ----
s04(ctx,t,q){ bg(ctx,'schema'); const tEn=q.at('energie.'), tBr=q.at('brandstoffen'), tBro=q.at('brood,'), tVe=q.at('vet,'), tBo=q.at('bouwen.'), tRe=q.at('repareert'), tBs=q.at('bouwstoffen'), tEi=q.at('eiwitten.'), tVi=q.at('vis,'), tBe=q.at('beschermen.'), tVit=q.at('Vitamines'), tGe=q.at('geen'), tWe=q.at('weinig'), tCa=q.at('Calcium'), tC=q.at('Vitamine',2);
  drieVakken(t,ramp(t,tEn-0.3,0.5),ramp(t,tBo-0.3,0.5),ramp(t,tBe-0.3,0.5));
  // energie: vlam/batterij-pictogram + voedsel
  alpha(ctx,ramp(t,tBr,0.4),()=>{ ctx.beginPath(); ctx.moveTo(430,330); ctx.lineTo(400,385); ctx.lineTo(425,385); ctx.lineTo(410,430); ctx.lineTo(450,370); ctx.lineTo(425,370); ctx.closePath(); shape(ctx,rgba(C.koraal,0.7),C.koraal,2); });
  [[brood,330],[rijst,450],[aardappel,570]].forEach(([f,x],i)=>f(x,480,1.3,ramp(t,tBro+i*0.25,0.3)));
  boter(380,600,1.4,ramp(t,tVe,0.3));
  alpha(ctx,ramp(t,tVe,0.3),()=>{ ctx.beginPath(); ctx.moveTo(520,560); ctx.quadraticCurveTo(500,600,520,640); ctx.quadraticCurveTo(540,600,520,560); shape(ctx,'#E8C860','#F4DE90',2); metaText(ctx,'olie',520,680,C.grain,'center',20); });
  // bouwen: een muurtje van blokjes dat groeit
  alpha(ctx,ramp(t,tBo,0.4),()=>{ const n=Math.floor(clamp((t-tBo)/2.5,0,1)*8); for(let i=0;i<8;i++){ if(i>=n && t<tRe) continue; const bx=820+(i%4)*68, by=420-Math.floor(i/4)*42; roundRect(ctx,bx,by,62,36,6); shape(ctx,rgba(C.oker,0.55),lighten(C.oker,0.3),1.5); } });
  naamBij(ctx,'eiwitten','',960,520,ramp(t,tEi,0.4),'center',C.oker);
  [[vis,830],[vlees,930],[ei,1030],[bonen,840],[noot,960],[melk,1070]].forEach(([f,x],i)=>f(x,i<3?620:700,1.1,ramp(t,tVi+i*0.25,0.3)));
  // beschermen: schild + vitamines/mineralen
  alpha(ctx,ramp(t,tVit,0.4),()=>{ ctx.beginPath(); ctx.moveTo(1500,350); ctx.lineTo(1580,380); ctx.lineTo(1570,470); ctx.quadraticCurveTo(1540,520,1500,540); ctx.quadraticCurveTo(1460,520,1430,470); ctx.lineTo(1420,380); ctx.closePath(); shape(ctx,rgba(C.groen,0.3),C.groen,2); text(ctx,'vitamines',1500,590,fTekst(32,600),C.text,'center'); text(ctx,'mineralen',1500,630,fTekst(32,600),C.text,'center'); });
  pill(ctx,1500,300,'geen energie',C.text2,fadeIO(t,tGe,tWe+1.2,0.3),24);
  alpha(ctx,ramp(t,tWe,0.4),()=>{ for(let i=0;i<5;i++) dot(ctx,1440+i*30,690,5,C.groen); metaText(ctx,'een heel klein beetje',1500,730,C.grain,'center',20); });
  alpha(ctx,ramp(t,tCa,0.4),()=>{ botDoorsnede(1360,640,32,1,1); metaText(ctx,'calcium',1360,700,C.grain,'center',20); });
  alpha(ctx,ramp(t,tC,0.4),()=>{ sinaasappel(1640,640,1.1); metaText(ctx,'vitamine C',1640,700,C.grain,'center',20); });
},
// ---- H1: de zeelui, water, vezels, Schijf van Vijf ----
s05(ctx,t,q){ const tVC=q.at('C.'), tVe=q.at('vers'), tJ=q.at('1747'), tCi=q.at('citroenen'), tWk=q.at('week'), tWa=q.at('water'), tVz=q.at('vezels.'), tDa=q.at('darmen'), tGe=q.at('Geen',2), tAf=q.at('afwisselend'), tSc=q.at('Schijf');
  if(t<tWa-0.3){ nachtZee(t); zeilschip(1250,640,0.75,t);
    alpha(ctx,1,()=>{ vak(120,180,620,560,'',C.groen,1); text(ctx,'beschermende stoffen',430,240,fTekst(36,700),C.groen,'center'); });
    alpha(ctx,ramp(t,0.3,0.4),()=>{ text(ctx,'energie ✓',220,330,fTekst(34,600),C.koraal,'left'); text(ctx,'vitamine C ✗',220,390,fTekst(34,600),C.text,'left'); });
    [[sinaasappel,260],[appel,370],[broccoli,480],[wortel,590]].forEach(([f,x],i)=>f(x,520,1.2,ramp(t,tVe+i*0.2,0.3)));
    pill(ctx,430,630,'het jaar 1747',C.grain,ramp(t,tJ,0.4),26);
    for(let i=0;i<4;i++){ const u=ramp(t,tCi+i*0.3,1.2); citroen(lerp(430,1150+i*50,u),lerp(680,520,u),1.2,ramp(t,tCi,0.3)); }
    alpha(ctx,ramp(t,tWk,0.4),()=>persoon(ctx,'henk',1600,1000,300,{uit:'blij',pose:'zwaai',t,kijk:-1}));
    pill(ctx,1600,610,'binnen een week beter',C.groen,ramp(t,tWk,0.4),26); return; }
  bg(ctx,'schema');
  if(t<tGe-0.3){ glasWater(560,500,2.2,ramp(t,tWa-0.2,0.4)); naamBij(ctx,'water','',560,640,ramp(t,tWa,0.4),'center',C.teal);
    [[wortel,1180],[appel,1320],[brood,1460]].forEach(([f,x],i)=>f(x,480,1.6,ramp(t,tVz+i*0.2,0.3))); naamBij(ctx,'vezels','groente · fruit · volkoren',1320,600,ramp(t,tVz,0.4),'center',C.groen);
    alpha(ctx,ramp(t,tDa,0.4),()=>{ ctx.strokeStyle=rgba(C.oker,0.8); ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath(); for(let i=0;i<=40;i++){ const x=1120+i*10, y=720+Math.sin(i*0.5+t*3)*16; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); metaText(ctx,'darmen in beweging',1320,790,C.grain,'center',22); });
    return; }
  schijf(820,500,240,ramp(t,tSc-0.4,0.6));
  alpha(ctx,ramp(t,tGe,0.4)*(1-ramp(t,tSc-0.4,0.4)),()=>{ [[brood,'geen vitamine C'],[sinaasappel,'weinig eiwit'],[vlees,'geen vezels']].forEach(([f,s],i)=>{ f(560+i*400,480,1.8,1); text(ctx,s,560+i*400,600,fTekst(32,600),C.text2,'center'); }); });
  naamBij(ctx,'Schijf van Vijf','vereenvoudigd',1500,300,ramp(t,tSc,0.4),'left',C.goud);
  pill(ctx,1600,800-80,'afwisselend eten',C.groen,ramp(t,tAf,0.4),28); },
// ---- H2: astronaut, vraag ----
s06(ctx,t,q){ ruimte(t); ruimtestation(960,330,0.9); const tZw=q.at('zweeft'), tBe=q.at('benen'), tBo=q.at('botten?');
  zwevend('daan',700+Math.sin(t*0.6)*20,560+Math.sin(t*0.8)*14,300,0.4+Math.sin(t*0.5)*0.15,{uit:'blij',pose:'zwaai',t,kijk:1});
  pill(ctx,960,120,'een half jaar',C.grain,ramp(t,0.6,0.4),28); pill(ctx,700,780,'zweeft',C.teal,fadeIO(t,tZw,tBo,0.4),26);
  alpha(ctx,ramp(t,tBo,0.4),()=>{ botDoorsnede(1420,580,110,0.85,1); text(ctx,'?',1420,420,fTitel(110),C.goud,'center'); }); },
// ---- H2: zwakker worden, trainen in de ruimte ----
s08(ctx,t,q){ const tM=q.at('maand'), tPr=q.at('procent'), tSp=q.at('spieren'), tBl=q.at('leeft.'), tHa=q.at('hard'), tWe=q.at('weinig,'), tDa=q.at('Daarom'), tLo=q.at('loopband,'), tAp=q.at('apparaat'), tTe=q.at('techniek');
  if(t<tDa-0.3){ bg(ctx,'schema'); const verlies=ramp(t,tM,4);
    botDoorsnede(560,450,170,1-0.55*verlies,1); text(ctx,'start',560,680,fTekst(32,600),C.text2,'center');
    alpha(ctx,ramp(t,tM,0.4),()=>{ for(let m=0;m<6;m++) balk(1040,280+m*58,360,34,1-0.01*(m+1)*ramp(t,tM+m*0.3,0.4),C.groen,1,`maand ${m+1}`); metaText(ctx,'botmassa · ± 1 % minder per maand',1220,250,C.grain,'center',22); });
    alpha(ctx,ramp(t,tSp,0.4),()=>{ spierBundel(1220,690,320,80-30*ramp(t,tSp,1.5),1); metaText(ctx,'spier wordt dunner',1220,760,C.grain,'center',22); });
    // regel: belasten → sterker, weinig → zwakker
    alpha(ctx,ramp(t,tBl,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); ctx.fillRect(0,0,W,CAPTION_Y-40); naamBij(ctx,'bot leeft','past zich aan',W/2,180,1,'center',C.goud);
      botDoorsnede(560,520,150,ramp(t,tHa,1.2)*0.4+0.6,ramp(t,tHa-0.3,0.4)); text(ctx,'vaak hard werken → sterker',560,730,fTekst(34,600),C.groen,'center');
      botDoorsnede(1360,520,150,0.6-0.4*ramp(t,tWe,1.2),ramp(t,tWe-0.3,0.4)); text(ctx,'weinig gebruiken → zwakker',1360,730,fTekst(34,600),C.koraal,'center'); });
    return; }
  ruimte(t); // trainen aan boord
  alpha(ctx,1,()=>{ roundRect(ctx,260,180,1400,640,40); shape(ctx,'#2A3442','#8FA0B5',2); ctx.fillStyle='#1E2633'; ctx.fillRect(300,700,1320,40); });
  // loopband met elastieken
  alpha(ctx,ramp(t,tLo-0.4,0.4),()=>{ roundRect(ctx,380,660,460,40,12); shape(ctx,'#3A3F48','#8FA0B5',2); for(let i=0;i<8;i++){ ctx.fillStyle='#5A6270'; ctx.fillRect(390+((i*60+t*120)%440),670,20,20); }
    const A=persoon(ctx,'daan',610,660,300,{outfit:'sport',pose:'staan',uit:'neutraal',t,kijk:1}); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(560,450); ctx.lineTo(400,660); ctx.moveTo(660,450); ctx.lineTo(820,660); ctx.stroke(); metaText(ctx,'elastieken trekken hem omlaag',610,770,C.grain,'center',22); });
  // apparaat dat gewicht nadoet
  alpha(ctx,ramp(t,tAp,0.4),()=>{ ctx.fillStyle='#3A3F48'; ctx.fillRect(1180,300,30,400); ctx.fillRect(1480,300,30,400); const up=Math.abs(Math.sin(t*1.6)); roundRect(ctx,1170,420+up*-60,350,26,10); shape(ctx,'#8FA0B5','#C9CED8',2); persoon(ctx,'lotte',1345,700,280,{outfit:'sport',pose:'wijsOmhoog',uit:'neutraal',t,kijk:-1}); metaText(ctx,'doet gewicht na',1345,770,C.grain,'center',22); });
  pill(ctx,960,130,'± 2 uur per dag',C.goud,ramp(t,tDa,0.4),30);
  naamBij(ctx,'techniek','houdt het lichaam sterk',W/2,880-60,ramp(t,tTe,0.4),'center',C.teal); },
// ---- H2: op aarde ----
s09(ctx,t,q){ schoolplein(); const tRe=q.at('Rennen,'), tHa=q.at('hart'), tSl=q.at('slaap'), tGr=q.at('Gezondheidsraad'), tUu=q.at('uur'), tFi=q.at('Fietsen');
  persoon(ctx,'sam',520,820,320,{outfit:'sport',pose:t>tRe?'wijsOmhoog':'staan',uit:'blij',t,kijk:1});
  persoon(ctx,'noor',820,820,300,{outfit:'sport',pose:'zwaai',uit:'lacht',t,kijk:-1,a:ramp(t,tRe+0.4,0.4)});
  alpha(ctx,ramp(t,tRe,0.4),()=>{ botDoorsnede(1130,200,60,0.95,1); naamBij(ctx,'sterkere botten','',1130,310,1,'center',C.text); });
  alpha(ctx,ramp(t,tHa,0.4),()=>{ hartje(1430,200,1.1,1,t*7); naamBij(ctx,'hart en longen','',1430,310,1,'center',C.text); });
  alpha(ctx,ramp(t,tSl,0.4),()=>{ text(ctx,'z z z',1730,220,fTitel(54),C.teal,'center'); naamBij(ctx,'beter slapen','',1730,310,1,'center',C.text); });
  alpha(ctx,ramp(t,tGr,0.4)*(1-ramp(t,tFi-0.2,0.4)),()=>{ roundRect(ctx,1080,430,640,190,18); shape(ctx,rgba(C.bgSchema,0.92),C.goud,2); text(ctx,'Gezondheidsraad:',1400,490,fTekst(32,600),C.text2,'center'); text(ctx,'elke dag minstens',1400,540,fTekst(36,700),C.text,'center'); text(ctx,'een uur bewegen',1400,590,fTekst(36,700),C.goud,'center'); });
  alpha(ctx,ramp(t,tFi,0.4),()=>{ fiets(1380,720,1.4,1,t); persoon(ctx,'lotte',1380,700,280,{outfit:'zomer',pose:'staan',uit:'blij',t,kijk:1}); pill(ctx,1400,470,'telt ook mee',C.groen,1,28); }); },
// ---- H2 uitdaging: getraind hart ----
s10(ctx,t,q){ bg(ctx,'schema'); const tSp=q.at('spier.'), tSt=q.at('sterker.'), tSl=q.at('slag.'), tRu=q.at('rust'), tVi=q.at('vijftig');
  hartje(520,440,3.2,1,t*6*(t<tRu?1:0.6)); naamBij(ctx,'hart','een spier',520,640,ramp(t,tSp,0.4),'center',C.koraal);
  alpha(ctx,ramp(t,tSl,0.4),()=>{ text(ctx,'per slag:',1000,330,fTekst(32,600),C.text2,'left'); [[0,'niet getraind',0.55],[1,'getraind',0.85]].forEach(([i,n,u])=>balk(1000,370+i*70,420,40,u*ramp(t,tSl+i*0.5,0.6),C.koraal,1,n)); });
  alpha(ctx,ramp(t,tRu,0.4),()=>{ text(ctx,'in rust:',1000,560,fTekst(32,600),C.text2,'left'); text(ctx,'± 70 slagen per minuut',1000,610,fTekst(36,600),C.text,'left'); });
  alpha(ctx,ramp(t,tVi,0.4),()=>text(ctx,'getrainde sporter: soms ± 50',1000,670,fTekst(36,700),C.goud,'left')); meta32('schematisch'); },
// ---- H3: Sam traint ----
s11(ctx,t,q){ bg(ctx,'schema'); const tBe=q.at('beenspieren'), tWa=q.at('Waar');
  persoon(ctx,'sam',560,860,420,{outfit:'sport',pose:'handenHeup',uit:'blij',t,kijk:1}); pill(ctx,560,330,'sportdag',C.goud,ramp(t,0.3,0.4),30);
  alpha(ctx,ramp(t,tBe,0.4),()=>{ spierBundel(1200,520,300,60+40*ramp(t,tBe,2),1); metaText(ctx,'beenspier',1200,600,C.grain,'center',22); });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1500,420,fTitel(120),C.goud,'center')); },
// ---- H3: eiwitten, signaal, brandstof ----
s13(ctx,t,q){ bg(ctx,'schema'); const tSi=q.at('signaal:'), tEi=q.at('eiwitten',2), tBr=q.at('brandstoffen'), tVe=q.at('veel'), tHo=q.at('honger.'), tSa=q.at('samen.');
  persoon(ctx,'sam',300,860,340,{outfit:'sport',pose:'staan',uit:'blij',t,kijk:1});
  spierBundel(960,480,360,80+50*ramp(t,tEi,2),1);
  alpha(ctx,ramp(t,tSi,0.4),()=>{ arrow(ctx,420,420,760,470,C.goud,4,16); metaText(ctx,'trainen: signaal',590,400,C.goud,'center',22); });
  alpha(ctx,ramp(t,tEi,0.4),()=>{ vak(1260,200,420,250,'bouwstoffen',C.oker,1,'eiwitten'); for(let i=0;i<5;i++){ const u=ramp(t,tEi+0.4+i*0.25,1); roundRect(ctx,lerp(1380+i*30,920+i*20,u),lerp(380,470,u),40,24,6); shape(ctx,rgba(C.oker,0.6),lighten(C.oker,0.3),1.5); } });
  alpha(ctx,ramp(t,tBr,0.4),()=>{ vak(1260,500,420,250,'brandstoffen',C.koraal,1,'energie'); arrow(ctx,1260,620,1140,540,C.koraal,4,16); });
  haak(ctx,240,1700,800-20,'eten en bewegen werken samen',C.groen,ramp(t,tSa,0.5));
  pill(ctx,960,200,'meer bewegen → meer honger',C.text,fadeIO(t,tVe,tSa,0.4),28); },
// ---- samenvatting ----
s14(ctx,t,q){ bg(ctx,'schema'); const tWa=q.at('water'), tBo=q.at('botten'), tZe=q.at('zeelui?');
  if(t<tBo-0.3){ drieVakken(t,ramp(t,0.1,0.4),ramp(t,0.8,0.4),ramp(t,1.5,0.4),200,460); brood(420,480,1.5); vis(960,480,1.5); sinaasappel(1500,480,1.5);
    alpha(ctx,ramp(t,tWa,0.4),()=>{ glasWater(760,760,1.2); text(ctx,'+ water en vezels',960,780,fTekst(36,600),C.teal,'center'); }); return; }
  if(t<tZe-0.3){ botDoorsnede(700,460,160,0.95,1); spierBundel(1220,460,340,110,1); haak(ctx,520,1420,680,'gebruiken maakt sterker',C.groen,ramp(t,tBo+0.6,0.5)); return; }
  nachtZee(t); zeilschip(1200,640,0.7,t); citroen(500,480,2.2); sinaasappel(680,520,2); naamBij(ctx,'vitamine C','',590,640,ramp(t,tZe+0.6,0.4),'center',C.groen); },
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'voeding en beweging',120,260,C.grain,'left',26);
  const P=[['Etiketspeurtocht','Kies drie producten uit de kast. Zoek op het etiket: hoeveel eiwit, vet en vezels? Welke stof springt eruit?'],['Beweegdagboek','Houd een week bij hoeveel minuten je beweegt, fietsen naar school telt mee. Wat valt je op? Wat maakt bewegen makkelijk of lastig?'],['Ruimtetraining','Ontwerp een trainingsdag voor een astronaut: welke oefeningen houden zijn botten, spieren en hart sterk? Leg bij elke oefening uit waarom.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,320,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een astronaut komt na een half jaar terug op aarde. Waarom moet hij weer leren lopen, en wat helpt hem daarbij?',120,730,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
