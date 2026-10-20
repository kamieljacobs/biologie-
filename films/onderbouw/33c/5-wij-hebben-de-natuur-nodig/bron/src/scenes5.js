// ===== Wij hebben de natuur nodig — scènes (kerndoelen onderbouw, 33C film 5) =====
// Rode draad: de lunch van Lotte (appel, broodje, flesje kraanwater). Macro-dag voor het schoolplein, de boomgaard, de stad en de akker (een ecosysteem 'in werking'); Schema voor het duin, de diensten en de samenvatting.
// Kleuren: planten groen, water teal, voedsel en bodem oker, gif koraal, focus goud. Bijen oker met donkere strepen.

const DAG={lucht:'#6E8CA8', ver:'#8EA8BF', gras:'#5F8A50', grasV:'#4F7A42', zand:'#C9A86A', steen:'#8E9AA0'};
function meta5(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
function dagLand(horizon=560){ ctx.fillStyle=DAG.lucht; ctx.fillRect(0,0,W,H); ctx.fillStyle=DAG.ver; ctx.fillRect(0,horizon-140,W,140); ctx.fillStyle=DAG.gras; ctx.fillRect(0,horizon,W,H-horizon); }
function wolkje(x,y,s=1){ ctx.fillStyle=rgba('#F2F2EE',0.8); [[0,0,40],[36,-14,32],[70,0,36],[34,10,34]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,y+dy*s,r*s,0,6.283); ctx.fill(); }); }
function bij(x,y,s=1,t=0,a=1,stuif=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const fl=Math.sin(t*50)*0.35;
  ctx.fillStyle=rgba('#F2F2EE',0.7); ctx.beginPath(); ctx.ellipse(-4,-14,14,7,-0.6+fl,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(6,-14,12,6,0.5-fl,0,6.283); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0,0,18,11,0,0,6.283); shape(ctx,'#E0B64A','#F0CC7A',1.2); ctx.fillStyle='#3A2E24'; ctx.fillRect(-6,-10,4,20); ctx.fillRect(3,-10,4,20); dot(ctx,18,-2,7,'#3A2E24');
  if(stuif>0){ for(let k=0;k<6;k++) dot(ctx,-8+k*4,9+(k%2)*3,2.5*stuif,'#F2D27A'); } ctx.restore(); }); }
function hommel(x,y,s=1,t=0,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const fl=Math.sin(t*44)*0.35; ctx.fillStyle=rgba('#F2F2EE',0.6); ctx.beginPath(); ctx.ellipse(0,-16,14,7,-0.4+fl,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,0,20,14,0,0,6.283); shape(ctx,'#3A2E24','#5A4A3A',1.2); ctx.fillStyle='#E0B64A'; ctx.fillRect(-6,-13,8,26); ctx.fillStyle='#F2F2EE'; ctx.fillRect(-18,-8,6,16); ctx.restore(); }); }
function zweefvlieg(x,y,s=1,t=0,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle=rgba('#F2F2EE',0.6); ctx.beginPath(); ctx.ellipse(-2,-10,12,5,-0.3+Math.sin(t*60)*0.3,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,0,14,6,0,0,6.283); shape(ctx,'#3A2E24','#5A4A3A',1); ctx.fillStyle='#E0B64A'; ctx.fillRect(-6,-5,3,10); ctx.fillRect(1,-5,3,10); ctx.restore(); }); }
function bloesem(x,y,s=1,a=1,bestoven=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ for(let k=0;k<5;k++){ const an=k*1.2566; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*11*s,y+Math.sin(an)*11*s,9*s,7*s,an,0,6.283); shape(ctx,'#F4E4EA','#FFFFFF',1); } dot(ctx,x,y,5*s,bestoven?C.goud:'#F2D27A'); }); }
function appel(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,16*s,0,6.283); shape(ctx,'#D8574A','#F07A6A',1.2); ctx.strokeStyle='#5A4232'; ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(x,y-14*s); ctx.lineTo(x+3*s,y-22*s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x+9*s,y-20*s,6*s,3*s,-0.4,0,6.283); ctx.fillStyle=G2; ctx.fill(); }); }
function appelboom(x,yg,s=1,t=0,o={}){ const bl=o.bloesem||0, ap=o.appels||0, nAp=o.n==null?12:o.n;
  ctx.fillStyle='#6E5238'; ctx.fillRect(x-14*s,yg-200*s,28*s,200*s); ctx.strokeStyle='#6E5238'; ctx.lineWidth=10*s; ctx.beginPath(); ctx.moveTo(x,yg-170*s); ctx.lineTo(x-80*s,yg-240*s); ctx.moveTo(x,yg-150*s); ctx.lineTo(x+90*s,yg-230*s); ctx.stroke();
  [[0,-280,110],[-90,-240,80],[95,-235,85],[0,-210,90]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,yg+dy*s,r*s,0,6.283); shape(ctx,'#4F8A5E','#6FA87C',1.5); });
  for(let i=0;i<14;i++){ const px=x+(hash(i*3.3+x)-0.5)*260*s, py=yg-200*s-hash(i*5.1+x)*150*s; if(bl>0) bloesem(px,py,0.9*s,bl); if(ap>0&&i<nAp) appel(px,py+6*s,0.95*s,ap); } }
function brood(x,y,s=1){ ctx.beginPath(); ctx.moveTo(x-60*s,y); ctx.quadraticCurveTo(x-64*s,y-70*s,x,y-72*s); ctx.quadraticCurveTo(x+64*s,y-70*s,x+60*s,y); ctx.closePath(); shape(ctx,'#C9924A','#E0B070',2); ctx.beginPath(); ctx.moveTo(x-48*s,y-6*s); ctx.quadraticCurveTo(x-50*s,y-56*s,x,y-58*s); ctx.quadraticCurveTo(x+50*s,y-56*s,x+48*s,y-6*s); ctx.closePath(); ctx.fillStyle='#F0DCB0'; ctx.fill(); }
function flesje(x,y,s=1){ roundRect(ctx,x-22*s,y-100*s,44*s,100*s,12*s); shape(ctx,rgba(C.teal,0.35),'#B8D8E4',2); ctx.fillStyle=rgba(C.teal,0.55); ctx.fillRect(x-20*s,y-60*s,40*s,58*s); roundRect(ctx,x-10*s,y-118*s,20*s,20*s,4*s); shape(ctx,'#5BA4C9','#8FC4E0',1.2); }
function graan(x,y,s=1){ ctx.strokeStyle='#C9A35C'; ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-90*s); ctx.stroke(); for(let k=0;k<6;k++){ ctx.beginPath(); ctx.ellipse(x+(k%2?6:-6)*s,y-90*s+k*8*s,5*s,9*s,(k%2?0.4:-0.4),0,6.283); ctx.fillStyle='#E0C080'; ctx.fill(); } }
function bijenhotel(x,y,s=1){ roundRect(ctx,x-50*s,y-90*s,100*s,90*s,6*s); shape(ctx,'#8C6A4A','#B08A5C',2); ctx.beginPath(); ctx.moveTo(x-60*s,y-86*s); ctx.lineTo(x,y-120*s); ctx.lineTo(x+60*s,y-86*s); ctx.closePath(); shape(ctx,'#6E5238','#8C6A4A',2); for(let r=0;r<3;r++) for(let c=0;c<4;c++) dot(ctx,x-30*s+c*20*s,y-70*s+r*24*s,6*s,'#3A2E24'); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: Lottes lunch ----
s01(ctx,t,q){ const tA=q.at('appel,'), tB=q.at('broodje'), tF=q.at('kraanwater.'), tWa=q.at('Wat',2);
  dagLand(600); wolkje(260,140); wolkje(1400,110,1.2); ctx.fillStyle=DAG.steen; ctx.fillRect(0,700,W,H-700);
  roundRect(ctx,860,640,700,30,8); shape(ctx,'#8C6A4A','#B08A5C',2); ctx.fillStyle='#6E5238'; ctx.fillRect(900,670,20,120); ctx.fillRect(1500,670,20,120);
  persoon(ctx,'lotte',640,880,400,{outfit:'zomer',pose:t<tF+0.5?'vasthouden':'denk',uit:t>tWa?'denkt':'blij',kijk:1,t});
  alpha(ctx,ramp(t,tA,0.4),()=>appel(1000,620,2.2)); alpha(ctx,ramp(t,tB,0.4),()=>brood(1200,640,1.1)); alpha(ctx,ramp(t,tF,0.4),()=>flesje(1420,640,1.1));
  pill(ctx,1210,300,'wat deed de natuur gratis?',C.goud,ramp(t,tWa,0.4),34); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Wij hebben de natuur nodig',120,330,fTitel(88),C.text); text(ctx,'Wat levert de natuur ons gratis?',120,410,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,0.6),()=>{ appel(1300,640,3); brood(1520,680,1.2); flesje(1720,680,1.2); }); bij(1460,520,2.2,t,ramp(t,1.0,0.5));
  metaText(ctx,'onderbouw · kerndoelen · ecosystemen 5',W-80,60,C.text2,'right',24); },
// ---- H1: bestuiving ----
s04(ctx,t,q){ const tG=q.at('graan'), tW=q.at('wormen'), tB=q.at('Begin'), tBl=q.at('bloeit'), tN=q.at('nectar'), tS=q.at('stuifmeel',1), tV=q.at('volgende'), tBe=q.at('bestuiving.'), tA=q.at('appel.',3), tZ=q.at('zonder'), tWa=q.at('Wat',1);
  if(t<tB-0.2){ bg(ctx,'schema'); ctx.fillStyle='#3A2E24'; ctx.fillRect(0,640,W,H-640); for(let i=0;i<14;i++) graan(200+i*110,640,1.4); for(let i=0;i<6;i++){ const x=260+i*260, y=720+(i%2)*60; ctx.strokeStyle='#C98A7A'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); for(let k=0;k<=8;k++){ const px=x+k*7, py=y+Math.sin(k+t*3+i)*5; k?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.stroke(); } for(let i=0;i<10;i++) dot(ctx,180+hash(i*3)*1600,700+hash(i*5)*150,4,C.teal);
    naamBij(ctx,'levende grond','wormen en bacteriën',W/2,780,ramp(t,tW,0.4),'center',C.oker); pill(ctx,W/2,200,'graan voor het brood',C.oker,ramp(t,tG,0.4),32); return; }
  dagLand(560); wolkje(300,140);
  if(t<tS-0.4){ appelboom(560,820,1.4,t,{bloesem:ramp(t,tBl,0.8)}); appelboom(1400,820,1.2,t,{bloesem:ramp(t,tBl+0.3,0.8)}); const bx=lerp(1900,900,ramp(t,tN-1,1.4)), by=420+Math.sin(t*3)*20; bij(bx,by,2,t,1); return; }
  // close-up: twee bloemen, bij met stuifmeel
  ctx.fillStyle=DAG.grasV; ctx.fillRect(0,0,W,H); ctx.fillStyle=rgba(DAG.lucht,0.5); ctx.fillRect(0,0,W,H);
  const F1=[560,480], F2=[1360,480]; bloesem(F1[0],F1[1],7,1,0); bloesem(F2[0],F2[1],7,1,ramp(t,tBe-0.3,0.4));
  const u=ramp(t,tV-0.3,1.6); const bx=lerp(F1[0]+20,F2[0]+20,u), by=F1[1]-70-Math.sin(u*Math.PI)*160;
  bij(bx,by,4,t,1,ramp(t,tS,0.5)*(1-ramp(t,tV+1.4,0.4)*0.5));
  alpha(ctx,ramp(t,tV+1.1,0.3),()=>{ for(let k=0;k<6;k++) dot(ctx,F2[0]-20+k*8,F2[1]-6+(k%2)*6,4,'#F2D27A'); });
  naamBij(ctx,'stuifmeel','plakt aan de haren',bx,by+120,fadeIO(t,tS,tV+0.5,0.4),'center',C.goud);
  naamBij(ctx,'bestuiving','',W/2,170,ramp(t,tBe,0.4),'center',C.goud);
  alpha(ctx,ramp(t,tA-0.4,0.5),()=>{ appel(F2[0],F2[1]+260,3); arrow(ctx,F2[0],F2[1]+100,F2[0],F2[1]+190,C.line,3,14); naamBij(ctx,'wordt een appel','',F2[0]+120,F2[1]+260,1,'left',C.text); });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',W/2,420,fTitel(110),C.goud,'center')); },
// ---- H1: zonder bijen, met de hand, driekwart ----
s06(ctx,t,q){ const tZ=q.at('Zonder'), tC=q.at('China'), tH=q.at('hand,'), tK=q.at('kwastje.'), tT=q.at('traag'), tBi=q.at('Bijen,'), tHo=q.at('hommels'), tZv=q.at('zweefvliegen'), tG=q.at('gratis.'), tD=q.at('driekwart');
  if(t<tBi-0.3){ dagLand(560); wolkje(300,140);
    if(t<tC-0.2){ appelboom(560,820,1.4,t,{appels:1,n:3}); appelboom(1400,820,1.2,t,{appels:1,n:2}); pill(ctx,W/2,220,'zonder bestuivers: veel minder appels',C.koraal,ramp(t,tZ,0.4),32); return; }
    appelboom(1300,840,1.5,t,{bloesem:1}); persoon(ctx,'kim',780,900,380,{pose:'wijsOmhoog',uit:'neutraal',kijk:1,t});
    const kx=lerp(900,1180,(Math.sin(t*2)+1)/2), ky=lerp(470,520,(Math.cos(t*2.3)+1)/2); alpha(ctx,ramp(t,tH,0.4),()=>{ ctx.strokeStyle='#8C6A4A'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(kx-50,ky+60); ctx.lineTo(kx,ky); ctx.stroke(); dot(ctx,kx,ky,9,'#F2D27A'); });
    pill(ctx,560,200,'met de hand, met een kwastje',C.text,ramp(t,tK-0.6,0.4),32); pill(ctx,560,290,'traag en duur',C.koraal,ramp(t,tT,0.4),30); metaText(ctx,'een streek in China',560,360,C.grain,'center',24); return; }
  bg(ctx,'schema');
  bij(400,330,3,t,ramp(t,tBi,0.4)); hommel(800,330,3,t,ramp(t,tHo,0.4)); zweefvlieg(1200,330,3.4,t,ramp(t,tZv,0.4));
  [[400,'bij',tBi],[800,'hommel',tHo],[1200,'zweefvlieg',tZv]].forEach(([x,n,tt])=>naamBij(ctx,n,'',x,450,ramp(t,tt,0.4),'center',C.text));
  pill(ctx,1600,330,'gratis',C.groen,ramp(t,tG,0.4),40);
  // driekwart: 4 vakjes, 3 gekleurd
  alpha(ctx,ramp(t,tD-0.4,0.5),()=>{ const items=[['appel',0],['aardbei',1],['tomaat',2],['tarwe',3]]; items.forEach(([n,i])=>{ const x=520+i*240; roundRect(ctx,x-100,560,200,170,14); shape(ctx,rgba(C.bgSchema,0.95),i<3?C.goud:C.line,i<3?2:1);
      if(i===0) appel(x,630,2); if(i===1){ ctx.beginPath(); ctx.moveTo(x-28,610); ctx.quadraticCurveTo(x,600,x+28,610); ctx.quadraticCurveTo(x+20,670,x,680); ctx.quadraticCurveTo(x-20,670,x-28,610); shape(ctx,'#D8574A','#F07A6A',1.2); } if(i===2){ ctx.beginPath(); ctx.arc(x,640,30,0,6.283); shape(ctx,'#E0503A','#F07A6A',1.2); } if(i===3) graan(x,690,1);
      text(ctx,n,x,715,fTekst(28,600),C.text,'center'); });
    naamBij(ctx,'± driekwart van de belangrijkste gewassen','heeft bestuivers nodig of groeit beter met hun hulp',W/2,800,1,'center',C.goud); }); },
// ---- H2: duinwater, zeewering, zuurstof, koelte, ecosysteemdiensten ----
s07(ctx,t,q){ const tN=q.at('water.',1), tR=q.at('Rivierwater'), tF=q.at('filter,'), tBa=q.at('bacteriën'), tS=q.at('schoon',1), tDu=q.at('duinen',2), tZe=q.at('zee'), tZo=q.at('Zonder'), tL=q.at('lucht?'), tP=q.at('Planten'), tBo=q.at('Bomen'), tHe=q.at('hete'), tAl=q.at('Alles'), tEc=q.at('ecosysteemdiensten.'), tV=q.at('Voedsel,');
  if(t<tL-0.3){ // Schema: duin in doorsnede
    bg(ctx,'schema'); const top=380, base=760;
    ctx.fillStyle=rgba(C.teal,0.55); ctx.fillRect(1560,560,360,200); text(ctx,'zee',1740,620,fTekst(32,600),C.text,'center');
    ctx.beginPath(); ctx.moveTo(200,base); ctx.quadraticCurveTo(500,top,800,top+40); ctx.quadraticCurveTo(1100,top-40,1350,top+20); ctx.quadraticCurveTo(1500,top+80,1600,base); ctx.closePath(); shape(ctx,DAG.zand,'#E0C890',2);
    for(let i=0;i<30;i++) dot(ctx,300+hash(i*2.7)*1200,500+hash(i*4.1)*240,3,'#B8964E');
    for(let i=0;i<10;i++){ ctx.strokeStyle=G1; ctx.lineWidth=2; const x=420+i*110, y=top+20+Math.abs(Math.sin(i))*30; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-6,y-30); ctx.moveTo(x,y); ctx.lineTo(x+6,y-34); ctx.stroke(); }
    // rivierwater erin, druppels zakken, schoon eruit
    alpha(ctx,ramp(t,tR,0.4),()=>{ ctx.fillStyle=rgba('#8C7A5A',0.7); roundRect(ctx,560,top+60,180,36,10); ctx.fill(); naamBij(ctx,'rivierwater','',650,top+30,1,'center',C.text); });
    for(let i=0;i<10;i++){ const u=((t-tR)*0.25+i/10)%1; if(t<tR) break; const y=lerp(top+110,base-40,u), x=620+i*16+Math.sin(u*12+i)*14; dot(ctx,x,y,7,u<0.5?rgba('#8C7A5A',0.9):rgba(C.teal,0.9)); }
    alpha(ctx,ramp(t,tBa,0.4),()=>{ for(let i=0;i<8;i++) { ctx.save(); ctx.translate(560+hash(i*3)*240,520+hash(i*7)*180); ctx.rotate(hash(i)*3); roundRect(ctx,-12,-5,24,10,5); shape(ctx,rgba(C.teal,0.5),lighten(C.teal,0.35),1.2); ctx.restore(); } naamBij(ctx,'bacteriën ruimen vuil op','',940,560,1-ramp(t,tDu-0.4,0.3),'left',C.teal); });
    naamBij(ctx,'zand = filter','',940,500,fadeIO(t,tF,tDu,0.4),'left',C.oker);
    alpha(ctx,ramp(t,tS,0.4),()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(700,base); ctx.lineTo(700,860); ctx.lineTo(400,860); ctx.stroke(); flesje(330,870,0.9); naamBij(ctx,'schoon water','',330,700,1,'center',C.teal); });
    alpha(ctx,ramp(t,tZe,0.4),()=>{ for(let k=0;k<3;k++){ const x=1840-((t*120+k*120)%300); ctx.strokeStyle=rgba('#F2F2EE',0.8); ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,560,30,Math.PI,0); ctx.stroke(); } arrow(ctx,1700,480,1560,480,C.teal,4,16); naamBij(ctx,'duinen houden de zee tegen','',1640,420,1,'center',C.teal); });
    alpha(ctx,ramp(t,tZo,0.4),()=>pill(ctx,W/2,200,'zonder duinen: het westen onder water',C.koraal,1,32)); meta5(); return; }
  if(t<tAl-0.3){ // Macro-dag: stad met en zonder bomen
    ctx.fillStyle=DAG.lucht; ctx.fillRect(0,0,W,H); dot(ctx,1700,140,60,C.goud); ctx.fillStyle=DAG.steen; ctx.fillRect(0,700,W,H-700);
    [[80,380,260],[400,300,240],[1500,340,280]].forEach(([x,y,w])=>{ ctx.fillStyle='#9AA3B2'; ctx.fillRect(x,y,w,700-y); ctx.fillStyle=rgba('#6E8CA8',0.7); for(let r=0;r<5;r++) for(let c=0;c<3;c++) ctx.fillRect(x+20+c*w/3.2,y+30+r*70,w/5,40); });
    for(let i=0;i<3;i++){ const x=800+i*230; ctx.fillStyle='#5A4232'; ctx.fillRect(x-10,520,20,180); ctx.beginPath(); ctx.arc(x,470,100,0,6.283); shape(ctx,'#4F8A5E','#6FA87C',1.5); ctx.fillStyle=rgba('#2A3A2A',0.35); ctx.beginPath(); ctx.ellipse(x+40,720,130,26,0,0,6.283); ctx.fill(); }
    alpha(ctx,ramp(t,tP,0.4)*(1-ramp(t,tBo,0.4)),()=>{ for(let k=0;k<6;k++){ const u=((t*0.4+k/6)%1); text(ctx,'O₂',800+k*90,470-u*300,fTekst(30,700),rgba(C.teal,1-u),'center'); } });
    alpha(ctx,ramp(t,tHe,0.4),()=>{ text(ctx,'heet',300,820,fTekst(44,700),C.koraal,'center'); text(ctx,'koeler',1030,820,fTekst(44,700),C.teal,'center'); });
    naamBij(ctx,'zuurstof','planten en algen',1030,250,fadeIO(t,tP,tHe,0.4),'center',C.teal); naamBij(ctx,'schaduw en koelte','',1030,250,ramp(t,tBo,0.4),'center',C.groen); return; }
  bg(ctx,'schema'); naamBij(ctx,'ecosysteemdiensten','wat de natuur gratis voor ons doet',W/2,200,ramp(t,tAl,0.5),'center',C.goud);
  const D=[['voedsel',C.oker,q.at('Voedsel,')],['schoon water',C.teal,q.at('water,',6)],['bestuiving',C.goud,q.at('bestuiving,')],['bescherming',C.teal,q.at('bescherming,')],['koelte',C.groen,q.at('koelte.',2)]];
  D.forEach(([n,kl,tt],i)=>{ const x=260+i*350; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x-150,340,300,300,16); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,n,x,600,fTekst(34,700),kl,'center');
    if(i===0){ appel(x-40,470,2); brood(x+50,500,0.7); } if(i===1) flesje(x,520,1.1); if(i===2) bij(x,470,2.5,t,1,1); if(i===3){ ctx.beginPath(); ctx.moveTo(x-90,520); ctx.quadraticCurveTo(x-20,410,x+40,440); ctx.quadraticCurveTo(x+80,460,x+90,520); ctx.closePath(); shape(ctx,DAG.zand,'#E0C890',1.5); } if(i===4){ ctx.fillStyle='#5A4232'; ctx.fillRect(x-8,450,16,80); ctx.beginPath(); ctx.arc(x,440,56,0,6.283); shape(ctx,'#4F8A5E','#6FA87C',1.5); } }); }); },
// ---- H3: de vraag over gif ----
s08(ctx,t,q){ const tN=q.at('niet'), tG=q.at('gif'), tWa=q.at('Wat',1);
  dagLand(520); ctx.fillStyle='#7A6A3A'; for(let r=0;r<6;r++) ctx.fillRect(0,560+r*60,W,22); for(let i=0;i<20;i++) graan(80+i*95,580+(i%3)*60,0.9);
  // trekker met spuit
  const tx=lerp(-300,820,ramp(t,tG-0.5,2)); ctx.save(); ctx.translate(tx,760); roundRect(ctx,0,-120,220,90,14); shape(ctx,'#4F8F6A','#6FA88A',2); roundRect(ctx,150,-200,90,90,10); shape(ctx,'#4F8F6A','#6FA88A',2); dot(ctx,50,-20,40,'#2A2F3E','#5A6070',2); dot(ctx,190,-10,30,'#2A2F3E','#5A6070',2); ctx.fillStyle='#9AA3B2'; ctx.fillRect(-260,-90,260,10); ctx.restore();
  alpha(ctx,ramp(t,tG,0.4),()=>{ for(let i=0;i<40;i++){ const x=tx-250+hash(i*2.3)*250, y=690+((t*90+hash(i)*120)%120); dot(ctx,x,y,4,rgba(C.koraal,0.6)); } naamBij(ctx,'gif tegen luizen','',tx-120,600,1,'center',C.koraal); });
  bij(1500,420,2,t,ramp(t,tN,0.4)); bij(1650,500,1.6,t,ramp(t,tN+0.2,0.4));
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1250,330,fTitel(110),C.goud,'center')); },
// ---- H3: gevolgen en wat je zelf kunt doen ----
s10(ctx,t,q){ const tG=q.at('Gif'), tBi=q.at('bijen'), tBe=q.at('bestuiving.'), tO=q.at('oogst.'), tBs=q.at('Beschadig'), tW=q.at('Wij',4), tZ=q.at('zelf'), tZa=q.at('Zaai'), tL=q.at('Laat'), tH=q.at('Hang',2);
  bg(ctx,'schema');
  if(t<tZ-0.3){ const K=[['gif',C.koraal,tG],['minder bijen',C.oker,tBi],['minder bestuiving',C.goud,tBe],['minder oogst',C.koraal,tO]];
    K.forEach(([n,kl,tt],i)=>{ const x=280+i*450; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x-180,330,360,220,16); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,n,x,510,fTekst(34,700),kl,'center');
      if(i===0){ for(let k=0;k<12;k++) dot(ctx,x-60+hash(k)*120,380+hash(k*3)*80,5,rgba(C.koraal,0.7)); } if(i===1){ bij(x-30,430,1.6,t,1); bij(x+40,410,1.2,t,0.35); crossOut(ctx,x+40,410,20,1); } if(i===2){ bloesem(x,430,3,1,0); crossOut(ctx,x,430,30,1); } if(i===3){ appel(x-30,440,1.6); appel(x+30,440,1.6,0.35); } });
      if(i<3) arrow(ctx,x+190,440,x+260,440,C.line,3,14,ramp(t,K[i+1][2]-0.3,0.4)); });
    haak(ctx,100,1820,580,'beschadig je een ecosysteem, dan verlies je zijn diensten',C.koraal,ramp(t,tBs,0.5));
    alpha(ctx,ramp(t,tW,0.4),()=>metaText(ctx,'wij hangen af van de natuur, zoals elke soort',W/2,760,C.grain,'center',26)); return; }
  dagLand(600); wolkje(260,140); ctx.fillStyle=DAG.grasV; ctx.fillRect(0,700,W,H-700);
  persoon(ctx,'noor',1500,900,380,{outfit:'zomer',pose:'zwaai',uit:'blij',kijk:-1,t});
  alpha(ctx,ramp(t,tZa,0.4),()=>{ for(let i=0;i<14;i++){ const x=200+i*60, y=760+(i%3)*30; ctx.strokeStyle=G1; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-70); ctx.stroke(); dot(ctx,x,y-74,12,['#C98AB8','#E0B64A','#8C7BBF','#E07A5F'][i%4]); } naamBij(ctx,'bloemen zaaien','',600,560,1,'center',C.groen); });
  alpha(ctx,ramp(t,tL,0.4),()=>{ for(let i=0;i<20;i++){ ctx.strokeStyle=G2; ctx.lineWidth=2; const x=900+hash(i)*220, y=820; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+10,y-60,x+(hash(i*3)-0.5)*40,y-110); ctx.stroke(); } naamBij(ctx,'een wild hoekje','',1010,620,1,'center',C.groen); });
  alpha(ctx,ramp(t,tH,0.4),()=>{ ctx.fillStyle='#6E5238'; ctx.fillRect(1240,600,14,220); bijenhotel(1247,610,1.2); naamBij(ctx,'bijenhotel','',1247,430,1,'center',C.oker); });
  for(let i=0;i<4;i++){ const w=wander(i,t,80,0.6); bij(600+i*180+w.x,460+w.y,1.4,t,ramp(t,tZa+0.5,0.5)); } },
// ---- H3 uitdaging: biodiversiteit ----
s11(ctx,t,q){ const tT=q.at('twintig'), tK=q.at('koud'), tH=q.at('hommels'), tM=q.at('Hoe'), tB=q.at('biodiversiteit.');
  bg(ctx,'schema'); const kou=ramp(t,tK,0.6);
  const N=[[bij,'honingbij'],[hommel,'hommel'],[zweefvlieg,'zweefvlieg'],[bij,'zandbij'],[hommel,'aardhommel']];
  N.forEach(([fn,n],i)=>{ const x=300+i*330, y=420; const weg=(n==='honingbij'||n==='zandbij')?kou:0; fn(x,y,2.4,t,ramp(t,tT+i*0.15,0.4)*(1-0.65*weg)); naamBij(ctx,n,weg>0.5?'te koud':'',x,520,ramp(t,tT+i*0.15,0.4),'center',weg>0.5?C.text2:C.text); });
  alpha(ctx,ramp(t,tK,0.4),()=>{ thermo5(140,700,200,0.15); naamBij(ctx,'koud voorjaar','',140,780,1,'center',C.teal); });
  alpha(ctx,ramp(t,tH,0.4),()=>pill(ctx,W/2,260,'de hommels vliegen nog',C.groen,1,32));
  alpha(ctx,ramp(t,tM,0.4),()=>{ roundRect(ctx,560,600,800,130,16); shape(ctx,rgba(C.bgSchema,0.95),C.goud,1.5); text(ctx,'meer soorten = dienst valt minder snel weg',960,680,fTekst(34,600),C.text,'center'); });
  naamBij(ctx,'biodiversiteit','veel verschillende soorten',W/2,170,ramp(t,tB,0.4),'center',C.goud); },
// ---- samenvatting ----
s12(ctx,t,q){ const tB=q.at('Bestuiving'), tS=q.at('Schoon'), tBe=q.at('Bescherming'), tZ=q.at('Zuurstof,'), tE=q.at('ecosysteemdiensten.'), tA=q.at('afhankelijk'), tWi=q.at('Wie');
  if(t<tA-0.3){ bg(ctx,'schema'); const L=[[tB,'bestuiving',C.goud],[tS,'schoon water',C.teal],[tBe,'bescherming tegen de zee',C.teal],[tZ,'zuurstof, schaduw, koelte',C.groen]];
    alpha(ctx,1,()=>{ appel(260,560,4); brood(470,620,1.4); flesje(660,620,1.4); }); metaText(ctx,'de lunch van lotte',460,700,C.grain,'center',24);
    L.forEach(([tt,n,kl],i)=>{ alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,900,200+i*120,820,96,14); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,n,1310,262+i*120,fTekst(36,600),C.text,'center'); }); });
    naamBij(ctx,'ecosysteemdiensten','',1310,720,ramp(t,tE,0.4),'center',C.goud); return; }
  dagLand(600); wolkje(260,140); ctx.fillStyle=DAG.grasV; ctx.fillRect(0,700,W,H-700); appelboom(500,820,1.3,t,{appels:1}); for(let i=0;i<3;i++){ const w=wander(i,t,60,0.6); bij(800+i*160+w.x,420+w.y,1.6,t,1); }
  persoon(ctx,'lotte',1300,900,380,{outfit:'zomer',pose:'vasthouden',uit:'blij',kijk:-1,t,hold:(c,x,y)=>{ appel(x,y,1.4); }});
  haak(ctx,200,1720,160,'wij zijn afhankelijk van ecosystemen',C.groen,ramp(t,tA,0.5)); pill(ctx,W/2,300,'wie de natuur beschadigt, raakt de diensten kwijt',C.koraal,ramp(t,tWi,0.4),28); },
// ---- eindkaart ----
s13(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'wij hebben de natuur nodig',120,260,C.grain,'left',26);
  const P=[['Bestuiverstelling','Kies een bloeiende struik op het schoolplein. Tel tien minuten lang de bezoekers: bijen, hommels, zweefvliegen. Doe het ook bij een kale plek.'],['Zandfilter','Maak een filter in een afgeknipte fles: grind, zand, watten. Giet er troebel water door. Wat komt eruit? (Niet drinken.)'],['Koele plek','Meet met een thermometer op een warme dag de temperatuur op de stenen en onder een boom.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Noem drie dingen die jij vandaag gebruikt hebt en die de natuur gratis voor je deed. Welk ecosysteem deed het werk?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
function thermo5(x,y,h,niveau){ roundRect(ctx,x-12,y-h,24,h,12); shape(ctx,rgba(C.bgMicro,0.8),C.line,2); dot(ctx,x,y+12,20,C.teal,lighten(C.teal,0.3),2); roundRect(ctx,x-6,y-h*niveau,12,h*niveau+8,6); ctx.fillStyle=C.teal; ctx.fill(); }
