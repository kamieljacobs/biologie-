// ===== 32B film 6 — DNA en overerving =====
// Rode draad: Yasmins cavia's. Zwart-gen = donker vakje met gouden rand? Nee: genen paars-familie: zwart-gen = donkerpaars (#3A2E5A), wit-gen = licht (#E6E1F2). Kans = goud (munt).
const GZ='#3A2E5A', GW='#E6E1F2';
function cavia(x,y,s,kleur='zwart',a=1,dir=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); const c=kleur==='zwart'?'#2E2A2A':'#F2EFE6', cr=kleur==='zwart'?'#5A5250':'#D8D2C4';
  ctx.beginPath(); ctx.ellipse(0,0,80,52,0,0,6.283); shape(ctx,c,cr,2); ctx.beginPath(); ctx.ellipse(70,-12,40,34,0.2,0,6.283); shape(ctx,c,cr,2);
  dot(ctx,62,-44,12,kleur==='zwart'?'#4A4240':'#E8C8C0',cr,1.2); dot(ctx,86,-20,5,kleur==='zwart'?'#C9A35C':'#C04848'); dot(ctx,106,-6,4,'#C9867A');
  ctx.fillStyle=kleur==='zwart'?'#4A4240':'#E8C8C0'; [-40,30].forEach(dx=>{ ctx.beginPath(); ctx.ellipse(dx,48,14,8,0,0,6.283); ctx.fill(); }); ctx.restore(); }); }
function genPaar(x,y,a1,a2,s=1,a=1,lab=false){ alpha(ctx,a,()=>{ [a1,a2].forEach((g,i)=>{ roundRect(ctx,x-30*s+i*32*s,y-40*s,28*s,80*s,8*s); shape(ctx,g==='z'?GZ:GW,g==='z'?'#8C7BBF':'#A392D6',1.6); if(lab) text(ctx,g==='z'?'A':'a',x-16*s+i*32*s,y+12*s,fTekst(28*s,700),g==='z'?C.text:C.bgSchema,'center'); }); }); }
function munt(x,y,r,t,kant,a=1){ alpha(ctx,a,()=>{ const sx=Math.abs(Math.cos(t*8)); ctx.save(); ctx.translate(x,y); ctx.scale(kant==null?Math.max(0.1,sx):1,1); ctx.beginPath(); ctx.arc(0,0,r,0,6.283); shape(ctx,C.goud,'#F2D27A',2); if(kant!=null){ roundRect(ctx,-r*0.4,-r*0.6,r*0.8,r*1.2,r*0.2); shape(ctx,kant==='z'?GZ:GW,'#8C7BBF',1.5); } ctx.restore(); }); }
function dnaLadder(x,y,w,h,t,a=1,hl=null){ alpha(ctx,a,()=>{ const n=22, L=['A','T','G','C']; for(let i=0;i<n;i++){ const xx=x+i*w/n, ph=i*0.5+t*0.6, y1=y+Math.sin(ph)*h*0.4, y2=y-Math.sin(ph)*h*0.4; const inGen=hl&&i>=hl[0]&&i<hl[1];
  ctx.strokeStyle=inGen?C.goud:rgba(C.paars,0.8); ctx.lineWidth=inGen?3:2; ctx.beginPath(); ctx.moveTo(xx,y1); ctx.lineTo(xx,y2); ctx.stroke(); dot(ctx,xx,y1,6,'#A392D6'); dot(ctx,xx,y2,6,'#A392D6');
  if(Math.cos(ph)>0.2) text(ctx,L[(i*7)%4],xx,y1-16,fMeta(20),C.grain,'center'); } }); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ bg(ctx,'schema'); const tY=q.at('Yasmin'), tJ=q.at('jongen.'), tZ=q.at('zwart.',2), tW=q.at('wit.'), tH=q.at('Hoe');
  ctx.fillStyle='#2A3A58'; roundRect(ctx,560,560,1100,260,30); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.stroke(); for(let i=0;i<30;i++) dot(ctx,600+hash(i)*1020,600+hash(i*3)*200,4,rgba(C.oker,0.5));
  persoon(ctx,'yasmin',330,900,540,{pose:'wijs',uit:t>tW?'verbaasd':'blij',kijk:1,t});
  cavia(800,660,1.1,'zwart',ramp(t,tY,0.4),1,t); cavia(1440,660,1.1,'zwart',ramp(t,tY+0.3,0.4),-1,t);
  cavia(1020,740,0.6,'zwart',ramp(t,tJ-0.2,0.4),1,t); cavia(1180,760,0.6,'zwart',ramp(t,tZ-0.3,0.4),-1,t); cavia(1110,690,0.6,'wit',ramp(t,tW-0.3,0.4),1,t);
  alpha(ctx,ramp(t,tW,0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(1120,680,70,0,6.283); ctx.stroke(); }); vraagteken(1120,420,ramp(t,tH,0.4)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'DNA en overerving',120,330,fTitel(92),C.text); text(ctx,'Hoe geef je een eigenschap door?',120,410,fTekst(44),C.text2); });
  dnaLadder(1100,560,700,140,t,ramp(t,0.3,0.6)); metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 6',W-80,60,C.text2,'right',24); },
// ---- H1: DNA, gen ----
s04(ctx,t,q){ ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); const tK=q.at('celkern.'), tC=q.at('chromosomen.'), tD=q.at('DNA.'), tL=q.at('letters.',1), tV=q.at('vier'), tM=q.at('miljarden'), tG=q.at('gen.',2), tR=q.at('recept'), tKl=q.at('kleur'), tLe=q.at('lezen'), tKs=q.at('kleurstof');
  if(t<tD-0.3){ const z=ramp(t,tC-0.4,1); kernDraden(W/2,450,200+80*z,1,t,0); naamBij(ctx,'celkern','',W/2,760,ramp(t,tK-0.2,0.4),'center',C.paars); naamBij(ctx,'chromosomen','',W/2+330,280,ramp(t,tC-0.2,0.4),'left',C.paars); metaText(ctx,'vergroot',60,CAPTION_Y-14,C.text2,'left',22); return; }
  if(t<tG-0.3){ dnaLadder(160,430,1600,180,t,1); naamBij(ctx,'DNA','een lange rij letters',W/2,200,1,'center',C.paars);
    alpha(ctx,ramp(t,tV-0.2,0.4),()=>{ ['A','T','G','C'].forEach((L,i)=>pill(ctx,720+i*160,700,L,C.text,1,40)); metaText(ctx,'maar vier letters',W/2,780,C.grain,'center',24); });
    alpha(ctx,ramp(t,tM-0.2,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); roundRect(ctx,1380,90,440,80,14); ctx.fill(); text(ctx,'miljarden letters lang',1600,142,fTekst(32,700),C.goud,'center'); }); return; }
  dnaLadder(160,330,1600,160,t,1,[8,14]); naamBij(ctx,'gen','recept voor één eigenschap',160+11*1600/22,170,ramp(t,tG-0.3,0.4),'center',C.goud);
  alpha(ctx,ramp(t,tKl-0.3,0.4),()=>{ cavia(700,700,1.2,'zwart',1,1,t); text(ctx,'vachtkleur',700,820,fTekst(32,600),C.text,'center'); });
  alpha(ctx,ramp(t,tLe-0.3,0.4),()=>{ arrow(ctx,1000,500,1000,600,C.goud,3,14); });
  alpha(ctx,ramp(t,tKs-0.3,0.4),()=>{ for(let i=0;i<14;i++) dot(ctx,1140+hash(i)*300,620+hash(i*3)*160,10,'#2E2A2A','#5A5250',1); naamBij(ctx,'kleurstof voor zwart haar','',1290,860-40,1,'center',C.text); }); },
// ---- H2: twee van elk ----
s05(ctx,t,q){ bg(ctx,'schema'); const tT=q.at('twee'), tMo=q.at('moeder.'), tVa=q.at('vader.'), tZw=q.at('zwart-gen'), tWi=q.at('wit-gen.'), tZZ=q.at('zwart-genen'), tWW=q.at('wit-genen'), tMa=q.at('Maar');
  alpha(ctx,ramp(t,tT-0.2,0.4),()=>{ genPaar(W/2,300,'z','w',2); });
  alpha(ctx,ramp(t,tMo-0.3,0.4),()=>{ text(ctx,'van moeder',W/2-150,210,fTekst(30,700),C.text2,'right'); }); alpha(ctx,ramp(t,tVa-0.3,0.4),()=>{ text(ctx,'van vader',W/2+150,210,fTekst(30,700),C.text2,'left'); });
  alpha(ctx,ramp(t,tZw-0.2,0.4),()=>{ roundRect(ctx,560,440,60,100,10); shape(ctx,GZ,'#8C7BBF',2); text(ctx,'zwart-gen',590,580,fTekst(30,600),C.text,'center'); });
  alpha(ctx,ramp(t,tWi-0.3,0.4),()=>{ roundRect(ctx,1300,440,60,100,10); shape(ctx,GW,'#A392D6',2); text(ctx,'wit-gen',1330,580,fTekst(30,600),C.text,'center'); });
  if(t>tZZ-0.4){ alpha(ctx,ramp(t,tZZ-0.4,0.4),()=>{ genPaar(420,700,'z','z',1); cavia(620,700,0.8,'zwart',1,1,t); }); alpha(ctx,ramp(t,tWW-0.4,0.4),()=>{ genPaar(1180,700,'w','w',1); cavia(1380,700,0.8,'wit',1,1,t); }); }
  alpha(ctx,ramp(t,tMa,0.4),()=>{ genPaar(W/2,700,'z','w',1); vraagteken(W/2,610,1,70); }); },
// ---- H2: dominant en recessief ----
s07(ctx,t,q){ bg(ctx,'schema'); const tW=q.at('wint'), tD=q.at('dominant.'), tR=q.at('recessief.'), tA=q.at('alleen'), tV=q.at('verborgen'), tZi=q.at('niet.');
  genPaar(560,440,'z','w',2); arrow(ctx,700,440,860,440,C.line,3,14); cavia(1100,440,1.4,'zwart',1,1,t);
  alpha(ctx,ramp(t,tD-0.3,0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; roundRect(ctx,480,350,72,180,12); ctx.stroke(); naamBij(ctx,'dominant','wint het',380,300,1,'center',C.goud); });
  alpha(ctx,ramp(t,tR-0.3,0.4),()=>naamBij(ctx,'recessief','',640,620,1,'center',C.text2));
  alpha(ctx,ramp(t,tV-0.3,0.4),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,1300,620,520,90,14); ctx.fill(); text(ctx,'wit-gen zit verborgen',1560,678,fTekst(34,700),C.text,'center'); }); },
// ---- H3: doorgeven met muntjes ----
s08(ctx,t,q){ bg(ctx,'schema'); const tE=q.at('één',1), tEi=q.at('eicel'), tT=q.at('toeval.'), tMu=q.at('munt'), tY=q.at("Yasmins"), tVe=q.at('verborgen'), tMo=q.at('moeder'), tVa=q.at('vader'), tTw=q.at('twee'), tWi=q.at('wit.',5), tG=q.at('Gemiddeld'), tK=q.at('kans.'), tN=q.at('nest');
  if(t<tG-0.4){ cavia(420,300,1,'zwart',1,1,t); cavia(1500,300,1,'zwart',1,-1,t); genPaar(420,450,'z','w',1.2,ramp(t,tY-0.3,0.4)); genPaar(1500,450,'z','w',1.2,ramp(t,tY-0.3,0.4));
    text(ctx,'moeder',420,190,fTekst(30,700),C.text2,'center'); text(ctx,'vader',1500,190,fTekst(30,700),C.text2,'center');
    alpha(ctx,ramp(t,tMu-0.3,0.4),()=>{ munt(660,450,46,t,t>tMo?'w':null); munt(1260,450,46,t+0.3,t>tVa?'w':null); pill(ctx,W/2,200,'toeval: kop of munt',C.goud,1,30); });
    alpha(ctx,ramp(t,tTw-0.3,0.4),()=>{ arrow(ctx,700,520,900,640,C.line,3,12); arrow(ctx,1220,520,1020,640,C.line,3,12); genPaar(W/2,700,'w','w',1.2); cavia(W/2+180,720,0.8,'wit',ramp(t,tWi-0.3,0.4),1,t); }); return; }
  // 4 jongen, berekend met vaste trekking (seeded) + verwachting 1 op 4
  const kansKaart=ramp(t,tG-0.3,0.4); text(ctx,'kans',W/2,140,fTitel(52),C.goud,'center'); alpha(ctx,kansKaart,()=>{ kaart(160,200,700,500,C.goud,1); text(ctx,'gemiddeld',510,270,fTekst(34,700),C.goud,'center'); for(let i=0;i<4;i++) cavia(260+i*170,460,0.55,i===3?'wit':'zwart',1,1,t); text(ctx,'1 op de 4 wit',510,620,fTekst(36,700),C.text,'center'); });
  alpha(ctx,ramp(t,tK,0.4),()=>{ kaart(1060,200,700,500,C.line,1); text(ctx,'echte nestjes',1410,270,fTekst(34,700),C.text,'center');
    const nest=[[0,0,0],[1,0,1],[0,0,0,0]]; nest.forEach((n,r)=>n.forEach((w,i)=>cavia(1160+i*140,380+r*110,0.42,w?'wit':'zwart',1,1,t))); metaText(ctx,'vaker · nooit · het kan allebei',1410,660,C.grain,'center',22); }); },
// ---- H3: twee witte ----
s09(ctx,t,q){ bg(ctx,'schema'); cavia(620,480,1.2,'wit',1,1,t); cavia(1300,480,1.2,'wit',1,-1,t); genPaar(620,640,'w','w',1,ramp(t,0.4,0.4)); genPaar(1300,640,'w','w',1,ramp(t,0.4,0.4)); vraagteken(W/2,420,ramp(t,q.at('Welke'),0.4)); },
s11(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('Allemaal'), tW=q.at('wit-genen.'), tD=q.at('doorgeven.');
  cavia(520,300,0.9,'wit',1,1,t); cavia(1400,300,0.9,'wit',1,-1,t); genPaar(520,440,'w','w',1); genPaar(1400,440,'w','w',1);
  for(let i=0;i<4;i++) cavia(560+i*270,720,0.7,'wit',ramp(t,tA-0.2+i*0.15,0.3),i%2?-1:1,t);
  naamBij(ctx,'alleen wit-genen','',W/2,360,ramp(t,tW-0.4,0.4),'center',C.text); naamBij(ctx,'alleen wit doorgeven','',W/2,560,ramp(t,tD-0.6,0.4),'center',C.goud); },
// ---- uitdaging: kruisingsschema ----
s12(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('hoofdletter'), tK=q.at('kleine',1), tY=q.at("Yasmins"), tS=q.at('schema'), tA=q.at('Alleen');
  alpha(ctx,ramp(t,tH-0.2,0.4),()=>{ text(ctx,'A',300,320,fTitel(110),C.text,'center'); text(ctx,'= zwart (dominant)',360,300,fTekst(34,600),C.text,'left'); });
  alpha(ctx,ramp(t,tK-0.2,0.4),()=>{ text(ctx,'a',300,470,fTitel(110),C.text2,'center'); text(ctx,'= wit (recessief)',360,450,fTekst(34,600),C.text,'left'); });
  alpha(ctx,ramp(t,tY-0.2,0.4),()=>{ text(ctx,'ouders: Aa × Aa',300,620,fTekst(40,700),C.goud,'left'); });
  alpha(ctx,ramp(t,tS-0.3,0.4),()=>{ const x0=1100,y0=220,c=180; text(ctx,'A',x0+c*1.5,y0-20,fTekst(40,700),C.text,'center'); text(ctx,'a',x0+c*2.5,y0-20,fTekst(40,700),C.text,'center'); text(ctx,'A',x0+c*0.6,y0+c*0.6+14,fTekst(40,700),C.text,'center'); text(ctx,'a',x0+c*0.6,y0+c*1.6+14,fTekst(40,700),C.text,'center');
    const cel=[['AA','zwart'],['Aa','zwart'],['aA','zwart'],['aa','wit']]; cel.forEach(([g,k],i)=>{ const x=x0+c+(i%2)*c, y=y0+Math.floor(i/2)*c; roundRect(ctx,x+6,y+6,c-12,c-12,14); shape(ctx,k==='wit'?rgba(GW,0.25):rgba(GZ,0.6),k==='wit'&&t>tA?C.goud:C.line,k==='wit'&&t>tA?3:1.5); text(ctx,g,x+c/2,y+c/2-10,fTekst(40,700),k==='wit'?C.goud:C.text,'center'); metaText(ctx,k,x+c/2,y+c/2+40,C.grain,'center',20);  }); }); },
// ---- samenvatting ----
s13(ctx,t,q){ bg(ctx,'schema'); const tD=q.at('DNA'), tT=q.at('twee,'), tDo=q.at('dominant'), tR=q.at('recessief'), tTo=q.at('toeval.'), tZ=q.at('Zo');
  const K=[[tD,'DNA: genen = recepten',(x,y)=>dnaLadder(x-150,y,300,80,t,1,[4,8])],[tT,'twee van elk gen',(x,y)=>genPaar(x,y,'z','w',1.2)],[tDo,'dominant wint · recessief verborgen',(x,y)=>{ genPaar(x-60,y,'z','w',1); cavia(x+90,y,0.6,'zwart',1,1,t); }],[tTo,'één doorgeven, door toeval',(x,y)=>munt(x,y,46,t,'w')]];
  K.forEach(([tt,lab,fn],i)=>{ const x=300+i*440; alpha(ctx,ramp(t,tt-0.3,0.4),()=>{ kaart(x-200,220,400,400,C.paars,1); fn(x,400); ctx.font=fTekst(28,700); ctx.fillStyle=C.text; ctx.textAlign='center'; wrap(ctx,lab,x,540,340,36); }); });
  haak(ctx,100,1820,650,'zo kan een wit jong twee zwarte ouders hebben',C.groen,ramp(t,tZ-0.3,0.5)); },
// ---- eindkaart ----
s14(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Genen in je DNA zijn recepten voor eigenschappen.','Van elk gen heb je er twee, één van elke ouder.','Een recessief gen zie je alleen als het dubbel is.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
