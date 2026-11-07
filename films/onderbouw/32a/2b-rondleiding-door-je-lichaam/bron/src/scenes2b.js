// ===== Een rondleiding door je lichaam — scènes (kerndoelen onderbouw, film 2b) =====
// Hulpjes uit film 1 (helpers1.js), film 2 (helpers2.js) en de anatomie (anatomie.js: realistisch lichaam, bodyOrgans, liver, pancreas, …) staan hierboven.
// Opbouw: links in een inzetcirkel het moment van de dag (met Lotte uit het castboek), in het midden het lichaam waarin organen oplichten, namen links en rechts.
// Versie 1.1 (21 okt 2026): realistisch lichaam en organen i.p.v. het poppetje; Lotte (castboek) in de dagscènes.

BODY.cx=1120; BODY.yb=895; BODY.h=750; Object.values(SYS).forEach(v=>{ if(v[3]===1400) v[3]=1500; if(v[3]===440) v[3]=900; }); SYS.hormoon[4]=170; SYS.hormoon[5]='regelen'; SYS.bloed[4]=250;
const CX=BODY.cx;
// orgaan → [midden x, y (hoofdhoogtes), kant van de naam, hoogte van de naam, ring rx, ry]
const ORG={
  hersenen:[0,0.3,'R',0.28,0.4,0.27], ogen:[-0.15,0.5,'L',0.5], ruggenmerg:[0,1.6,'R',1.5], zenuwen:[1.0,2.4,'R',2.6],
  mond:[0,0.82,'R',0.86], slokdarm:[0.01,1.5,'L',1.5], maag:[0.3,2.6,'R',2.5], 'dunne darm':[0,3.35,'R',3.85], 'dikke darm':[-0.5,3.2,'L',3.35], alvleesklier:[0.22,2.75,'R',3.15], lever:[-0.2,2.46,'L',2.4,0.6,0.32],
  spieren:[-1.0,2.4,'L',2.3], botten:[0.32,6.0,'R',5.9], schedel:[0,0.4,'R',0.3],
  neus:[0,0.62,'L',0.62], luchtpijp:[0,1.4,'L',1.3], longen:[-0.42,2.1,'L',2.05],
  hart:[0.1,2.22,'R',2.2], bloedvaten:[0.32,6.0,'R',5.6],
  nieren:[0.37,2.86,'R',2.8], urineleiders:[0.22,3.35,'R',3.45], blaas:[0,3.86,'R',4.12],
  huid:[-0.7,2.4,'L',2.4], lymfeklieren:[0.7,1.9,'R',1.9], 'witte bloedcellen':[0.6,3.0,'R',3.0],
  hypofyse:[0,0.55,'R',0.55], schildklier:[0,1.22,'R',1.22], eierstokken:[-0.27,3.62,'L',3.4], baarmoeder:[0,3.7,'L',4.05], zaadballen:[0.06,4.1,'R',4.15],
};
// namen staan buiten het lichaam op de hoogte van het orgaan (geen wijslijnen, 15 okt 2026); het orgaan zelf licht kort op
function orgLabelPos(k){ const o=ORG[k], HH=AHH(), y=o[3]; const d=(y<1.12?0.5:(y>4.7?0.78:1.45))*HH; return [CX+(o[2]==='R'?d:-d), AB().top+y*HH, o[2]==='R'?'left':'right']; }
function orgLabel(k,a,meta='',color=C.text){ if(a<=0.01) return; focus(k,3.2*a*(1-a)); const [x,y,al]=orgLabelPos(k); naamBij(ctx,k,meta,x,y+(meta?-2:12),a,al,color); }
function orgRing(k,a){ if(a<=0.01) return; const o=ORG[k], HH=AHH(); const [x,y]=AP(o[0],o[1]); ctx.save(); ctx.globalAlpha*=a; ctx.setLineDash([8,7]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(x,y,(o[4]||0.3)*HH,(o[5]||0.25)*HH,0,0,6.283); ctx.stroke(); ctx.restore(); }
// het genoemde orgaan nog eens tekenen met een gloed
function focus(k,g){ if(g<=0.02) return; const t=_T; ctx.save();
  ({ hersenen:()=>anBrain(1,g), maag:()=>anShape(AN_MAAG,ANA.maag,ANA.maagS,2,true,g), lever:()=>liver(1,g), alvleesklier:()=>pancreas(1,g), hart:()=>anHeart(1,t*8,g), longen:()=>anLungs(1,t*4,g),
     nieren:()=>{ anKidney(-1,1,g); anKidney(1,1,g); }, blaas:()=>anShape([[0,3.72],[0.14,3.76],[0.17,3.88],[0.08,3.97],[0,3.98],[-0.08,3.97],[-0.17,3.88],[-0.14,3.76]],ANA.blaas,'#C9A84E',1.8,true,g),
     urineleiders:()=>{ ctx.shadowColor=ANA.urine; ctx.shadowBlur=20*g; anLine(AN_URL(-1),'#E0C070',0.03*AHH()); anLine(AN_URL(1),'#E0C070',0.03*AHH()); },
     slokdarm:()=>{ halo(AN_SLOK,0.05,ANA.slok,g); anTube(AN_SLOK,0.05,ANA.slok,'#A8625A'); },
     'dunne darm':()=>{ halo(anDunPts(),0.065,ANA.darm,g); anTube(anDunPts(),0.065,ANA.darm,ANA.darmS,t,0.06); },
     'dikke darm':()=>{ halo(AN_DIK,0.12,ANA.dik,g); anTube(AN_DIK,0.12,ANA.dik,ANA.dikS,t,0.04); },
     lymfeklieren:()=>anLymph(1,t,g), hypofyse:()=>anGlands(1,g), schildklier:()=>anGlands(1,g), eierstokken:()=>anRepro(1,g), baarmoeder:()=>anRepro(1,g), zaadballen:()=>testes(1,g),
     huid:()=>skin(Math.min(1,g)), schedel:()=>anSkull(1,g), zenuwen:()=>anImpulses(t,Math.min(1,g*2)), ruggenmerg:()=>{ ctx.shadowColor=ANA.zenuw; ctx.shadowBlur=20*g; anLine(AN_ZEN.merg,ANA.zenuw,0.06*AHH()); } }[k]||(()=>{}))();
  ctx.restore(); }
let _T=0;
function halo(pts,w,col,g){ const HH=AHH(); ctx.save(); ctx.globalAlpha*=Math.min(1,g)*0.45; ctx.filter='blur(6px)'; anLine(pts,col,w*HH+18); ctx.restore(); }
// namen van de tien stelsels in twee kolommen naast het lichaam (s19)
Object.assign(SYSPOS,(()=>{ const HH=AHH(), top=AB().top, L=CX-1.45*HH, R=CX+1.45*HH, y=v=>top+v*HH;
  return { hormoon:[L,y(0.55),'right'], bloed:[L,y(1.3),'right'], adem:[L,y(2.05),'right'], spier:[L,y(2.8),'right'], voortpl:[L,y(3.55),'right'],
           zenuw:[R,y(0.4),'left'], afweer:[R,y(1.45),'left'], spijs:[R,y(2.4),'left'], uitsch:[R,y(3.2),'left'], skelet:[R,y(4.6),'left'] }; })());
function pulse(t){ return 0.5+0.5*Math.sin(t*2.2); }
// slapende Lotte in bed (ook groot in de cold open): voeten bij (fx,fy), lengte h
function slaper(fx,fy,h,t=0){ ctx.save(); ctx.translate(fx,fy); ctx.rotate(-Math.PI/2); persoon(ctx,'lotte',0,0,h,{uit:'slaapt',t}); ctx.restore(); }
// een sneetje brood (breedte w px), midden op (0,0): korst, kruim, beetje boter
function boterham(c,w){ const h=w*0.9; c.beginPath(); c.moveTo(-w/2,h/2); c.lineTo(-w/2,-h*0.15); c.arc(-w*0.22,-h*0.15,w*0.28,Math.PI,1.6*Math.PI); c.arc(w*0.22,-h*0.15,w*0.28,1.4*Math.PI,0); c.lineTo(w/2,h/2); c.closePath();
  c.fillStyle='#B07A3E'; c.fill(); c.save(); c.translate(0,h*0.06); c.scale(0.8,0.8); c.beginPath(); c.moveTo(-w/2,h/2); c.lineTo(-w/2,-h*0.15); c.arc(-w*0.22,-h*0.15,w*0.28,Math.PI,1.6*Math.PI); c.arc(w*0.22,-h*0.15,w*0.28,1.4*Math.PI,0); c.lineTo(w/2,h/2); c.closePath(); c.fillStyle='#EED9A8'; c.fill(); c.restore(); }
// inzet: moment van de dag (personage = Lotte uit het castboek)
function vignette(kind,cx,cy,r,a,t=0){ inset(cx,cy,r,a,()=>{ ctx.save(); ctx.translate(cx,cy); const k=r/170;
  ctx.scale(k,k); ctx.lineCap='round';
  if(kind==='nacht'||kind==='slapen'){ ctx.fillStyle='#0D1420'; ctx.fillRect(-200,-200,400,400); dot(ctx,70,-90,30,C.goud); dot(ctx,57,-99,27,'#0D1420');
    roundRect(ctx,-150,40,300,44,10); shape(ctx,'#5A4636',null); roundRect(ctx,-150,20,300,34,10); shape(ctx,'#E8E2D4',null); roundRect(ctx,-140,-10,64,36,14); shape(ctx,'#F4F1EA',null);
    slaper(110,32,215,t); roundRect(ctx,-58,-32,190,92,18); shape(ctx,'#6E7FA8',null); roundRect(ctx,-58,-32,26,92,14); shape(ctx,'#8293BA',null);
    if(kind==='nacht'){ for(let i=0;i<3;i++) text(ctx,'z',-30+i*18,-34-i*18,fTekst(22+i*6,600),C.text2,'center'); } }
  if(kind==='wekker'){ dot(ctx,0,10,80,C.fill,C.line,3); ctx.strokeStyle=C.text; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(0,-45); ctx.moveTo(0,10); ctx.lineTo(40,10); ctx.stroke(); dot(ctx,0,10,5,C.goud); ctx.lineWidth=6; ctx.strokeStyle=C.line; ctx.beginPath(); ctx.moveTo(-60,-50); ctx.lineTo(-80,-70); ctx.moveTo(60,-50); ctx.lineTo(80,-70); ctx.stroke(); const sh=Math.sin(t*25)*6; ctx.strokeStyle=C.goud; ctx.lineWidth=3; [-1,1].forEach(d=>{ ctx.beginPath(); ctx.arc(d*95+sh,-20,14,0,6.283); ctx.stroke(); }); text(ctx,'7:00',0,-100,fMeta(26),C.grain,'center'); }
  if(kind==='ontbijt'){ // boterham op ware grootte (Kamiel 22 okt 2026: brood was veel te groot): tafel op heuphoogte, bord, één sneetje in de hand
    roundRect(ctx,-10,52,190,10,3); shape(ctx,'#8A6A4E',null); ctx.fillStyle='#6E5440'; ctx.fillRect(10,62,8,108); ctx.fillRect(152,62,8,108);
    ctx.beginPath(); ctx.ellipse(95,49,34,7,0,0,6.283); shape(ctx,'#E8E2D4','#BDB49E',1.5); ctx.save(); ctx.translate(98,44); ctx.rotate(0.05); boterham(ctx,24); ctx.restore();
    persoon(ctx,'lotte',-70,170,250,{uit:'blij',pose:'vasthouden',kijk:1,t,hold:(c,x,y)=>{ c.save(); c.translate(x,y); c.rotate(-0.2); boterham(c,20); c.restore(); }}); }
  if(kind==='fiets'){ ctx.fillStyle=rgba('#22324D',0.9); ctx.fillRect(-200,88,400,120); persoon(ctx,'lotte',20,92,250,{uit:'lacht',pose:'zwaai',t});
    dot(ctx,-75,40,46,'rgba(0,0,0,0)','#2A2F3E',7); dot(ctx,85,40,46,'rgba(0,0,0,0)','#2A2F3E',7); ctx.strokeStyle='#C9503C'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(-75,40); ctx.lineTo(-20,-25); ctx.lineTo(60,-25); ctx.lineTo(85,40); ctx.moveTo(-20,-25); ctx.lineTo(10,40); ctx.lineTo(60,-25); ctx.moveTo(10,40); ctx.lineTo(-75,40); ctx.moveTo(60,-25); ctx.lineTo(52,-55); ctx.moveTo(-20,-25); ctx.lineTo(-28,-48); ctx.stroke(); ctx.lineWidth=8; ctx.strokeStyle='#2A2F3E'; ctx.beginPath(); ctx.moveTo(-44,-50); ctx.lineTo(-12,-50); ctx.moveTo(40,-58); ctx.lineTo(68,-58); ctx.stroke(); }
  if(kind==='wc'){ roundRect(ctx,-60,-110,120,220,8); shape(ctx,C.fill,C.line,2); dot(ctx,35,0,7,C.goud); text(ctx,'WC',0,-60,fTekst(34,700),C.text,'center'); }
  if(kind==='klas'){ roundRect(ctx,-200,60,400,16,4); shape(ctx,'#8A6A4E',null); persoon(ctx,'lotte',-60,150,230,{uit:'bezorgd',kijk:1,t}); persoon(ctx,'daan',65,150,225,{uit:'verbaasd',kijk:-1,t});
    for(let i=0;i<5;i++){ const u=((t*0.8+i/5)%1); dot(ctx,40-u*80,-45-u*20+Math.sin(u*9+i)*8,4+u*6,rgba(C.koraal,0.7*(1-u))); } }
  if(kind==='koud'){ persoon(ctx,'lotte',-20,150,250,{outfit:'winter',uit:'bezorgd',pose:'schouders',t}); ctx.strokeStyle='#D8E8F2'; ctx.lineWidth=3; for(let i=0;i<5;i++){ const x=-130+hash(i*3.3)*260, y=-150+((t*30+i*70)%300); ctx.beginPath(); for(let k=0;k<3;k++){ const a2=k*Math.PI/3; ctx.moveTo(x-Math.cos(a2)*12,y-Math.sin(a2)*12); ctx.lineTo(x+Math.cos(a2)*12,y+Math.sin(a2)*12); } ctx.stroke(); } }
  if(kind==='avond'){ ctx.fillStyle='#16203A'; ctx.fillRect(-200,-200,400,400); dot(ctx,90,-110,26,C.goud); dot(ctx,80,-118,23,'#16203A');
    roundRect(ctx,-170,20,340,70,18); shape(ctx,'#5A6E8C',null); roundRect(ctx,-170,-30,60,110,18); shape(ctx,'#4E6080',null); roundRect(ctx,110,-30,60,110,18); shape(ctx,'#4E6080',null);
    persoon(ctx,'lotte',0,160,250,{uit:'moe',pose:'denk',t}); }
  if(kind==='tuin'){ ctx.fillStyle='#2A2119'; ctx.fillRect(-200,40,400,200); dot(ctx,-90,-90,26,C.goud); krop(0,40,0.4,0); }
  ctx.restore(); }); }
function orgIcon(pts,fill,stroke,w){ const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]); const mx=(Math.min(...xs)+Math.max(...xs))/2, my=(Math.min(...ys)+Math.max(...ys))/2, k=w/(Math.max(...xs)-Math.min(...xs)); anPath(ctx,pts.map(p=>[(p[0]-mx)*k,(p[1]-my)*k])); shape(ctx,fill,stroke,2); }
const V={x:270,y:330,r:150};
function dagInzet(kind,a,t){ vignette(kind,V.x,V.y,V.r,a,t); }
function tijd(s,a){ pill(ctx,V.x,V.y+V.r+60,s,C.grain,a,26); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: nacht ----
s01(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle='#0D1420'; ctx.fillRect(0,0,W,H);
  dot(ctx,1500,200,70,C.goud); dot(ctx,1470,180,64,'#0D1420'); for(let i=0;i<30;i++) dot(ctx,hash(i*3.1)*W,hash(i*7.7)*500,1.5+hash(i)*1.5,rgba(C.text,0.6));
  roundRect(ctx,500,600,940,90,20); shape(ctx,'#5A4636',null); roundRect(ctx,470,440,44,250,14); shape(ctx,'#4A3828',null); roundRect(ctx,500,560,940,60,20); shape(ctx,'#E8E2D4',null); roundRect(ctx,530,468,210,96,36); shape(ctx,'#F4F1EA',null); slaper(1390,556,830,t); roundRect(ctx,790,392,660,330,44); shape(ctx,'#6E7FA8',null); roundRect(ctx,790,392,90,330,44); shape(ctx,'#8293BA',null); ctx.fillStyle=rgba('#2A2F3E',0.22); roundRect(ctx,880,620,570,102,34); ctx.fill();
  for(let i=0;i<3;i++) alpha(ctx,0.5+0.5*Math.sin(t*2-i),()=>text(ctx,'z',640+i*30,400-i*30,fTekst(30+i*8,600),C.text2,'center'));
  pill(ctx,960,150,'6:00',C.grain,ramp(t,0.2,0.4),34);
  pill(ctx,960,780,'hoeveel van je organen zijn nu aan het werk?',C.goud,ramp(t,q.at('Hoeveel'),0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Een rondleiding',120,340,fTitel(100),C.text); text(ctx,'door je lichaam',120,440,fTitel(100),C.text); text(ctx,'Een dag uit je leven, van binnen bekeken',120,520,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(1420,0); ctx.scale(0.72,0.72); ctx.translate(-960,120); bodyOrgans({sil:0.45,zenuw:1,spijs:1,adem:1,bloed:1,uitsch:1,skelet:0,hormoon:1,afweer:1,t,beat:t*5,breath:t*2.5}); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 2B',W-80,60,C.text2,'right',24); },
// ---- H1: wakker worden, zenuwstelsel ----
s04(ctx,t,q){ bg(ctx,'schema'); const tW=q.at('wekker');
  const intro=1-ramp(t,tW-0.3,0.6);
  alpha(ctx,intro,()=>{ bodyOrgans({sil:0.3,zenuw:0.6,spijs:0.6,adem:0.6,bloed:0.6,uitsch:0.6,hormoon:0.6,afweer:0.6,t,beat:t*3,breath:t*1.5}); pill(ctx,960,100,'bijna al je organen werken door, ook als je slaapt',C.goud,ramp(t,q.at('Bijna'),0.5),30); pill(ctx,960,870,'alle namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('wekker'),0.4),30); dagInzet('nacht',1,t); });
  alpha(ctx,1-intro,()=>{ const h=ramp(t,q.at('hersenen'),0.5), r=ramp(t,q.at('ruggenmerg'),0.5), z=ramp(t,q.at('zenuwen'),0.5), o=ramp(t,q.at('ogen'),0.5);
    bodyOrgans({sil:0.3,zenuw:Math.max(h,r,z),t}); eyes(o);
    dagInzet('wekker',1,t); tijd('7:00 · wakker worden',1);
    orgLabel('hersenen',h,'sturen alles aan',C.paars); orgRing('hersenen',h*(1-r),60,34);
    orgLabel('ruggenmerg',r,'',C.paars); orgLabel('zenuwen',z,'signalen heen en weer',C.paars); orgLabel('ogen',o,'vangen licht',C.teal);
    const sig=fadeIO(t,q.at('Signalen'),q.at('ogen'),0.4); anImpulses(t,sig);
    pill(ctx,960,100,'zenuwstelsel',C.goud,ramp(t,q.at('zenuwstelsel'),0.5),34); });
},
// ---- H1: ontbijt, spijsvertering, lever-vraag ----
s05(ctx,t,q){ bg(ctx,'schema'); const K=['mond','slokdarm','maag','dunne','dikke'];
  const m=ramp(t,q.at('mond'),0.5), sl=ramp(t,q.at('slokdarm'),0.5), ma=ramp(t,q.at('maag'),0.5), dd=ramp(t,q.at('dunne'),0.5), dk=ramp(t,q.at('dikke'),0.5), al=ramp(t,q.at('alvleesklier'),0.5), le=ramp(t,q.at('lever'),0.5);
  bodyOrgans({sil:0.3,spijs:ramp(t,q.at('spijsverteringsstelsel'),0.6),t}); mouth(m); liver(le);
  dagInzet('ontbijt',1,t); tijd('7:30 · ontbijt',1);
  orgLabel('mond',m,'tanden en speeksel',C.oker); orgLabel('slokdarm',sl,'duwt naar de maag',C.oker); orgLabel('maag',ma,'mengt met zuur',C.oker);
  orgLabel('dunne darm',dd,'voedingsstoffen → bloed',C.oker); orgLabel('dikke darm',dk,'haalt water eruit',C.oker);
  orgLabel('alvleesklier',al,'sap dat eten afbreekt',C.goud); orgLabel('lever',le,'rechts onder je ribben',C.koraal); orgRing('lever',ramp(t,q.at('groot'),0.4),90,50);
  const bol=fadeIO(t,q.at('ontbijten'),q.at('alvleesklier'),0.4); const GP=anDense(AN_GUT(),220); const st=[[q.at('mond'),0],[q.at('slokdarm'),0.04],[q.at('maag'),0.2],[q.at('dunne'),0.33],[q.at('dikke'),0.8],[q.at('alvleesklier'),0.95]]; let gu=0; for(let i=0;i<st.length-1;i++){ if(t>=st[i][0]) gu=lerp(st[i][1],st[i+1][1],clamp((t-st[i][0])/Math.max(0.5,st[i+1][0]-st[i][0]),0,1)); } const [bpx,bpy]=anAlong(GP,gu); alpha(ctx,bol*ramp(t,q.at('mond'),0.3),()=>{ ctx.save(); ctx.shadowColor=C.oker; ctx.shadowBlur=16; dot(ctx,bpx,bpy,0.05*AHH(),'#F2D08A','#B88A3A',1.5); ctx.restore(); });
  pill(ctx,960,100,'spijsverteringsstelsel',C.goud,fadeIO(t,q.at('spijsverteringsstelsel'),q.at('welk'),0.5),34);
  pill(ctx,960,100,'bij welk stelsel hoort de lever?',C.goud,ramp(t,q.at('welk'),0.5),34);
},
// ---- H2: lever; fietsen: spieren en botten ----
s07(ctx,t,q){ bg(ctx,'schema'); const tF=q.at('fietst');
  const a1=1-ramp(t,tF-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.6,t}); liver(1); orgLabel('lever',1,'bij je spijsvertering',C.koraal); dagInzet('ontbijt',1,t);
    pill(ctx,960,100,'maakt een sap voor het verteren van vet',C.koraal,fadeIO(t,q.at('sap'),q.at('bewaart'),0.4),30); pill(ctx,960,100,'bewaart voedingsstoffen voor later',C.koraal,ramp(t,q.at('bewaart'),0.4),30); });
  alpha(ctx,1-a1,()=>{ const sp=ramp(t,q.at('spieren'),0.5), bo=ramp(t,q.at('botten'),0.5), sc=ramp(t,q.at('schedel'),0.5);
    bodyOrgans({sil:0.3,skelet:bo,spier:sp,t}); skull(sc); dagInzet('fiets',1,t); tijd('8:15 · naar school',1);
    orgLabel('spieren',sp,'trekken aan je botten',C.koraal); orgLabel('botten',bo,'vorm en stevigheid','#E9E4D6'); orgLabel('schedel',sc,'beschermt je hersenen','#E9E4D6');
    pill(ctx,960,100,'spierstelsel',C.goud,fadeIO(t,q.at('spierstelsel'),q.at('skelet'),0.4),34); pill(ctx,960,100,'spierstelsel · skelet',C.goud,ramp(t,q.at('skelet'),0.4),34); });
},
// ---- H2: ademhaling en bloedvaten ----
s08(ctx,t,q){ bg(ctx,'schema'); const ne=ramp(t,q.at('neus'),0.5), lu=ramp(t,q.at('luchtpijp'),0.5), lo=ramp(t,q.at('longen'),0.5), ha=ramp(t,q.at('hart'),0.5), bv=ramp(t,q.at('bloedvaten'),0.5);
  bodyOrgans({sil:0.3,adem:Math.max(ne,lo),bloed:ha,t,beat:t*8,breath:t*4}); nose(Math.max(ne,lu)); dagInzet('fiets',1,t); tijd('8:30 · ademt dieper',1);
  orgLabel('neus',ne,'',C.teal); orgLabel('luchtpijp',lu,'',C.teal); orgLabel('longen',lo,'zuurstof erin',C.teal);
  const ox=fadeIO(t,q.at('zuurstof'),q.at('hart'),0.4); if(ox>0.01){ for(let i=0;i<8;i++){ const u=((t*0.45+i/8)%1), sd=i%2?1:-1; const [x,y]=anAlong(APs([[0.03,0.66],[0,1.0],[0,1.85],[sd*0.24,2.05],[sd*0.42,2.25],[sd*0.5,2.45]]),u); alpha(ctx,ox*(1-0.4*u),()=>dot(ctx,x,y,0.03*AHH(),'#8FE3E0')); } }
  orgLabel('hart',ha,'pompt het bloed rond',C.koraal); orgLabel('bloedvaten',bv,'tot in je tenen',C.koraal);
  pill(ctx,960,100,'ademhalingsstelsel',C.goud,fadeIO(t,q.at('ademhalingsstelsel'),q.at('hart'),0.4),34);
  pill(ctx,960,870,'100 000 keer per dag',C.koraal,fadeIO(t,q.at('Honderdduizend'),q.at('bloedvatenstelsel'),0.4),30);
  pill(ctx,960,100,'bloedvatenstelsel',C.goud,ramp(t,q.at('bloedvatenstelsel'),0.4),34);
},
// ---- H2: wc, uitscheiding ----
s09(ctx,t,q){ bg(ctx,'schema'); const ni=ramp(t,q.at('nieren'),0.5), ur=ramp(t,q.at('urineleiders'),0.5), bl=ramp(t,q.at('blaas'),0.5);
  const fl=fadeIO(t,q.at('Afvalstoffen'),q.at('uitscheidingsstelsel'),0.4); bodyOrgans({sil:0.3,uitsch:Math.max(ni,ur,bl),bloed:0.35,urine:Math.max(fl,0.5*bl),t}); dagInzet('wc',1,t); tijd('10:00 · op school',1);
  orgLabel('nieren',ni,'maken je bloed schoon','#C47070'); orgLabel('urineleiders',ur,'',C.teal); orgLabel('blaas',bl,'bewaart de urine',C.teal);
  
  pill(ctx,960,870,'de hele dag, ook vannacht',C.grain,fadeIO(t,q.at('hele'),q.at('Afvalstoffen'),0.4),28);
  pill(ctx,960,870,'afvalstoffen + te veel water = urine',C.teal,fadeIO(t,q.at('urine'),q.at('uitscheidingsstelsel'),0.4),28);
  pill(ctx,960,100,'uitscheidingsstelsel',C.goud,ramp(t,q.at('uitscheidingsstelsel'),0.4),34);
},
// ---- H2: afweer ----
s10(ctx,t,q){ bg(ctx,'schema'); const af=ramp(t,q.at('afweersysteem'),0.5), wb=ramp(t,q.at('witte'),0.5), ly=ramp(t,q.at('lymfeklieren'),0.5);
  bodyOrgans({sil:0.3,bloed:0.35,afweer:Math.max(af,ly),t}); dagInzet('klas',1,t); tijd('11:00 · in de les',1);
  inset(1640,620,140,wb,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1500,480,280,280); vessel(1640,470,180,300,t,1); const at=ramp(t,q.at('vallen'),0.5); if(at>0.01){ const ex=1640+40, ey=620+((t*55+200)%300)-150; for(let i=0;i<3;i++){ const a=i*2.1+t*3; alpha(ctx,at,()=>dot(ctx,ex+Math.cos(a)*30,ey+Math.sin(a)*30,5,C.groen)); } } });
  metaText(ctx,'witte bloedcellen vallen ziekteverwekkers aan',1580,800,C.grain,'center',22*clamp(wb,0.01,1));
  orgLabel('lymfeklieren',ly,'in hals en oksels',C.groen);
  pill(ctx,960,870,'meestal word je niet ziek',C.groen,fadeIO(t,q.at('Meestal'),q.at('witte'),0.4),30);
  pill(ctx,960,100,'afweersysteem',C.goud,af,34);
},
// ---- H2: buiten, huid-vraag ----
s11(ctx,t,q){ bg(ctx,'schema'); const hu=ramp(t,q.at('huid'),0.5); bodyOrgans({sil:0.3,t}); skin(hu); dagInzet('koud',1,t); tijd('12:30 · pauze, buiten',1);
  orgLabel('huid',hu,'voelt de kou','#E0BE9C'); pill(ctx,960,100,'is je huid een orgaan?',C.goud,ramp(t,q.at('orgaan'),0.5),36); },
// ---- H3: huid = orgaan; avond, hormonen-vraag ----
s13(ctx,t,q){ bg(ctx,'schema'); const tA=q.at('Avonds');
  const a1=1-ramp(t,tA-0.3,0.6); alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,t}); skin(1); dagInzet('koud',1,t); orgLabel('huid',1,'je grootste orgaan','#E0BE9C');
    // doorsnede huid
    const cs=ramp(t,q.at('laag'),0.5); alpha(ctx,cs,()=>{ const x=1400,y=420,w=420; roundRect(ctx,x,y,w,60,6); shape(ctx,'#E0BE9C','#F0D6B8',1.5); roundRect(ctx,x,y+60,w,170,6); shape(ctx,rgba(C.grain,0.35),C.grain,1.5); ctx.strokeStyle=C.paars; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x+80,y+230); ctx.quadraticCurveTo(x+100,y+120,x+140,y+70); ctx.moveTo(x+300,y+230); ctx.quadraticCurveTo(x+320,y+140,x+360,y+75); ctx.stroke(); ctx.strokeStyle='#C47070'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+200,y+230); ctx.quadraticCurveTo(x+210,y+120,x+250,y+80); ctx.stroke();
      metaText(ctx,'dekweefsel',x,y-14,'#E0BE9C','left',22); metaText(ctx,'bindweefsel, zenuwen, bloedvaten',x,y+260,C.grain,'left',22); });
    pill(ctx,960,100,'taak: beschermen en je temperatuur regelen',C.goud,ramp(t,q.at('Taak'),0.4),30); });
  alpha(ctx,1-a1,()=>{ bodyOrgans({sil:0.3,bloed:0.5,hormoon:ramp(t,q.at('hormonen'),0.5),t}); dagInzet('avond',1,t); tijd('20:00 · moe',1);
    const hm=ramp(t,q.at('stoffen'),0.5); if(hm>0.01){ anVesselList().A.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<2;i++){ const [x,y]=anAlong(P,(t*0.3+i/2+j*0.19)%1); alpha(ctx,hm,()=>{ ctx.save(); ctx.shadowColor=C.goud; ctx.shadowBlur=10; dot(ctx,x,y,0.028*AHH(),C.goud); ctx.restore(); }); } }); }
    pill(ctx,960,870,'hormonen: stoffen die in je bloed reizen',C.goud,hm,28);
    pill(ctx,960,100,'je groeit, vooral als je slaapt',C.text,fadeIO(t,q.at('groeit'),q.at('zijn'),0.4),30);
    pill(ctx,960,100,'hormonen: alleen in de puberteit?',C.goud,ramp(t,q.at('zijn'),0.5),34); });
},
// ---- H3: hormoonklieren en voortplanting ----
s15(ctx,t,q){ bg(ctx,'schema'); const hy=ramp(t,q.at('hypofyse'),0.5), sk=ramp(t,q.at('schildklier'),0.5), vp=ramp(t,q.at('voortplantingsorganen'),0.5), ei=ramp(t,q.at('Eierstokken'),0.5), ba=ramp(t,q.at('baarmoeder'),0.5), za=ramp(t,q.at('zaadballen'),0.5);
  bodyOrgans({sil:0.3,hormoon:Math.max(hy,sk),voortpl:vp,t}); dagInzet('avond',1,t); tijd('20:00 · groeien',1);
  testes(za);
  pill(ctx,960,870,'je hele leven, van baby tot oud',C.goud,fadeIO(t,q.at('leven'),q.at('hypofyse'),0.4),30);
  orgLabel('hypofyse',hy,'regelt je groei',C.goud); orgLabel('schildklier',sk,'hoe snel je lichaam werkt',C.goud);
  orgLabel('eierstokken',ei,'',C.koraal); orgLabel('baarmoeder',ba,'',C.koraal); orgLabel('zaadballen',za,'',C.koraal);
  pill(ctx,960,100,'hormoonstelsel',C.goud,fadeIO(t,q.at('hormoonstelsel'),q.at('voortplantingsstelsel'),0.4),34);
  pill(ctx,960,870,'in de puberteit: eicellen of zaadcellen',C.koraal,fadeIO(t,q.at('puberteit'),q.at('voortplantingsstelsel'),0.4),28);
  pill(ctx,960,100,'voortplantingsstelsel',C.goud,ramp(t,q.at('voortplantingsstelsel'),0.4),34);
},
// ---- H3 havo/vwo: organen bij twee stelsels ----
s16(ctx,t,q){ bg(ctx,'schema'); const cards=[['alvleesklier',q.at('alvleesklier'),['spijsverteringsstelsel','hormoonstelsel'],q.at('Spijsvertering'),()=>orgIcon(AN_ALV,ANA.alv,'#C99E58',220),'sap voor je darm · insuline'],
  ['lever',q.at('lever'),['spijsverteringsstelsel','uitscheidingsstelsel'],q.at('Spijsvertering',2),()=>orgIcon(AN_LEVER,ANA.lever,ANA.leverL,220),'verteert · breekt gif af'],
  ['huid',q.at('huid'),['afweer en bescherming','uitscheidingsstelsel'],q.at('zweet'),()=>{ roundRect(ctx,-90,-40,180,80,10); shape(ctx,'#C9A27E','#E0BE9C',2); roundRect(ctx,-90,-40,180,22,8); shape(ctx,'#E0BE9C','#F0D6B8',1.5); },'beschermt · zweet = afval eruit']];
  cards.forEach(([n,tt,sys,tt2,fn,meta],i)=>{ const x=330+i*630, a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ roundRect(ctx,x-280,230,560,520,16); shape(ctx,rgba(C.fill,0.6),C.line,1); ctx.save(); ctx.translate(x,360); fn(); ctx.restore(); text(ctx,n,x,470,fTekst(40,600),C.text,'center'); metaText(ctx,meta,x,515,C.grain,'center',22);
      const c2=ramp(t,tt2,0.4); pill(ctx,x,600,sys[0],C.oker,1,26); alpha(ctx,c2,()=>{ text(ctx,'én',x,665,fTekst(30,600),C.goud,'center'); }); pill(ctx,x,720,sys[1],C.teal,c2,26); }); });
  // chips() centreert over W; per kaart zelf tekenen
  pill(ctx,960,120,'sommige organen horen bij twee stelsels',C.goud,ramp(t,q.at('Sommige'),0.5),32);
  pill(ctx,960,850,'antwoord c was dus niet zo gek',C.text2,fadeIO(t,q.at('Antwoord'),q.at('huid'),0.4),26);
  pill(ctx,960,850,'geen losse hokjes: ze werken de hele dag samen',C.goud,ramp(t,q.at('hokjes'),0.5),30);
},
// ---- H3: slapen; hond en muis ----
s17(ctx,t,q){ bg(ctx,'schema'); ctx.fillStyle=rgba('#0D1420',0.5); ctx.fillRect(0,0,W,H); const tH=q.at('hond');
  const a1=1-ramp(t,tH-0.3,0.6); alpha(ctx,a1,()=>{ const p=pulse(t);
    bodyOrgans({sil:0.3,zenuw:0.4+0.4*ramp(t,q.at('hersenen'),0.4),bloed:0.3+0.5*ramp(t,q.at('hart'),0.4),adem:0.3+0.5*ramp(t,q.at('longen'),0.4),uitsch:0.3+0.5*ramp(t,q.at('nieren'),0.4),impuls:0.6*ramp(t,q.at('hersenen'),0.4),urine:0.6*ramp(t,q.at('nieren'),0.4),t,beat:t*4,breath:t*2});
    dagInzet('slapen',1,t); tijd('23:00 · slapen',1);
    orgLabel('hersenen',ramp(t,q.at('hersenen'),0.4),'stoppen niet',C.paars); orgLabel('hart',ramp(t,q.at('hart'),0.4),'klopt door',C.koraal); orgLabel('longen',ramp(t,q.at('longen'),0.4),'ademen door',C.teal); orgLabel('nieren',ramp(t,q.at('nieren'),0.4),'maken bloed schoon','#C47070');
    pill(ctx,960,100,'dag en nacht',C.goud,ramp(t,q.at('Dag'),0.5),34); });
  alpha(ctx,1-a1,()=>{ const gy=760; ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(160,gy); ctx.lineTo(1760,gy); ctx.stroke();
    // hond (als kat, met hangoren) en muis
    alpha(ctx,ramp(t,tH,0.5),()=>{ const x=520,y=gy,s=1.3,c=C.okerD; ctx.beginPath(); ctx.ellipse(x,y-55*s,95*s,48*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+92*s,y-110*s,40*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); [[64,-120],[122,-120]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.ellipse(x+dx*s,y+dy*s+22*s,12*s,26*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); }); [[-60],[-30],[40],[70]].forEach(([dx])=>{ roundRect(ctx,x+dx*s-9*s,y-30*s,18*s,30*s,8*s); shape(ctx,c,lighten(c,0.3),1.5); }); ctx.strokeStyle=c; ctx.lineWidth=12*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y-70*s); ctx.quadraticCurveTo(x-130*s,y-60*s,x-140*s,y-120*s); ctx.stroke(); ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x+80*s,y-116*s,4*s,0,6.283); ctx.arc(x+106*s,y-116*s,4*s,0,6.283); ctx.fill(); dot(ctx,x+130*s,y-100*s,6*s,C.bgSchema); text(ctx,'hond',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('muis'),0.5),()=>{ const x=1000,y=gy,s=0.9,c=C.mens; ctx.beginPath(); ctx.ellipse(x,y-28*s,60*s,28*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2); ctx.beginPath(); ctx.arc(x+50*s,y-40*s,20*s,0,6.283); shape(ctx,c,lighten(c,0.3),2); dot(ctx,x+48*s,y-62*s,9*s,c,lighten(c,0.3),1.5); ctx.strokeStyle=c; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x-58*s,y-26*s); ctx.quadraticCurveTo(x-110*s,y-10*s,x-130*s,y-50*s); ctx.stroke(); dot(ctx,x+58*s,y-42*s,2.5*s,C.bgSchema); text(ctx,'muis',x,gy+60,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,q.at('Dezelfde'),0.5),()=>{ persoon(ctx,'lotte',1450,gy,300,{uit:'blij',pose:'zwaai',t}); text(ctx,'jij',1450,gy+60,fTekst(32,600),C.text,'center'); });
    pill(ctx,960,150,'dezelfde organen, dezelfde stelsels, dezelfde dag',C.goud,ramp(t,q.at('Dezelfde'),0.5),32); });
},
// ---- H3: een dag van de plant ----
s18(ctx,t,q){ bg(ctx,'macro'); const tN=q.at('Nachts'); const night=ramp(t,tN-0.3,1.2); const sunU=clamp((t-q.at('Ochtends'))/Math.max(1,tN-q.at('Ochtends')),0,1);
  // lucht + zon/maan
  ctx.fillStyle=rgba('#0D1420',0.55*night); ctx.fillRect(0,0,W,H); const sx=lerp(200,1720,sunU), sy=560-Math.sin(sunU*Math.PI)*420; alpha(ctx,1-night,()=>dot(ctx,sx,sy,46,C.goud)); alpha(ctx,night,()=>{ dot(ctx,1600,160,50,C.goud); dot(ctx,1580,145,46,'#1A2436'); });
  groundLine(700); slaPlant(760,700,1.0,{});
  const wa=fadeIO(t,q.at('halen'),q.at('stengel'),0.4)+ramp(t,q.at('wortels',2),0.5); for(let i=0;i<6;i++){ const u=((t*0.5+i/6)%1); alpha(ctx,clamp(wa,0,1),()=>dot(ctx,lerp(760+(hash(i)-0.5)*300,760,u),lerp(900,720,u),7,C.teal)); }
  const up=fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4); for(let i=0;i<4;i++){ const u=((t*0.5+i/4)%1); alpha(ctx,up,()=>dot(ctx,760+4,lerp(700,260,u),6,C.teal)); }
  const li=fadeIO(t,q.at('Overdag'),tN,0.4)*(1-night); for(let k=0;k<4;k++) arrow(ctx,sx+(k-1.5)*30,sy+70,760+(k-1.5)*70,420,C.goud,3,14,li*0.7);
  label(ctx,'wortels','halen water, houden vast',760,820,1250,840,fadeIO(t,q.at('halen'),q.at('Overdag'),0.4),C.grain); label(ctx,'stengel','brengt het water omhoog',760,470,1250,560,fadeIO(t,q.at('stengel'),q.at('Overdag'),0.4),C.groen);
  label(ctx,'bladeren','vangen licht, maken voedsel',855,560,1250,380,fadeIO(t,q.at('bladeren'),tN,0.4),C.groen); label(ctx,'bloem','maakt zaden',754,210,1250,200,fadeIO(t,q.at('bloem'),tN,0.4),C.goud);
  pill(ctx,760,100,'ook de plant heeft een dag',C.goud,fadeIO(t,q.at('dag'),q.at('Ochtends'),0.4),32);
  pill(ctx,1300,100,"'s nachts: geen licht, maar de wortels werken door",C.text,ramp(t,tN,0.5),28); pill(ctx,1300,170,'net als jij',C.goud,ramp(t,q.at('Net'),0.5),30);
},
// ---- samenvatting: tien stelsels ----
s19(ctx,t,q){ bg(ctx,'schema'); const K=[['zenuw','Zenuwstelsel'],['spijs','Spijsverteringsstelsel'],['spier','Spierstelsel'],['skelet','skelet'],['adem','Ademhalingsstelsel'],['bloed','Bloedvatenstelsel'],['uitsch','Uitscheidingsstelsel'],['afweer','Afweersysteem'],['hormoon','Hormoonstelsel'],['voortpl','Voortplantingsstelsel']];
  const o={sil:0.3,t,beat:t*5,breath:t*2.5}; K.forEach(([k,w])=>o[k]=0.35+0.65*ramp(t,q.at(w),0.5)); bodyOrgans(o); skin(ramp(t,q.at('huid'),0.5));
  K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
  naamBij(ctx,'huid','beschermt alles',CX-1.45*AHH(),AB().top+4.3*AHH(),ramp(t,q.at('huid'),0.5),'right','#E0BE9C');
  pill(ctx,960,100,'tien orgaanstelsels, één dag',C.goud,ramp(t,q.at('Tien'),0.5),34);
  pill(ctx,960,870,'elk orgaan: eigen plek, eigen taak · samen zijn ze jij',C.goud,ramp(t,q.at('Elk'),0.5),30);
},
// ---- eindkaart ----
s20(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Je lichaam heeft tien orgaanstelsels, elk met een eigen taak.','Elk orgaan heeft zijn eigen plek in je lichaam.','Samen houden ze jou de hele dag in leven.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.2 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};

// tijd van de huidige scène voor de oplichtende organen
Object.keys(SCENES).forEach(k=>{ const f=SCENES[k]; SCENES[k]=function(ctx,t,q){ _T=t; return f.call(this,ctx,t,q); }; });
