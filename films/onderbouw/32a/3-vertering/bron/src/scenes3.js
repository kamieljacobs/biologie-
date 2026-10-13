// ===== Vertering — scènes (kerndoelen onderbouw, film 3) =====
// Hulpjes uit film 1 (helpers1.js) en film 2 (helpers2.js) staan hierboven. Nieuw: de routekaart van het spijsverteringskanaal (`tractMap`), de hap die meereist (`hap`), mond, maag, darmvlokken, estafette, enzymschaartjes.

// ---------- routekaart: één buis van mond tot anus ----------
const ROUTE=[[250,300],[300,330],[330,400],[360,470],[430,520],[520,520],[560,470],[600,420],[660,400],[720,440],[760,500],[800,560],[860,600],[920,560],[960,500],[1000,440],[1060,400],[1120,440],[1160,500],[1200,560],[1260,600],[1320,560],[1360,500],[1400,440],[1460,400],[1500,440],[1520,520],[1520,620],[1480,700],[1380,730],[1260,730],[1160,730],[1160,660],[1300,640],[1440,640],[1560,660],[1620,720],[1660,800],[1700,860]];
const RL=(()=>{ let L=[0]; for(let i=1;i<ROUTE.length;i++) L.push(L[i-1]+Math.hypot(ROUTE[i][0]-ROUTE[i-1][0],ROUTE[i][1]-ROUTE[i-1][1])); return L; })();
function routePt(u){ const d=clamp(u,0,1)*RL[RL.length-1]; let i=1; while(i<RL.length-1&&RL[i]<d) i++; const a=ROUTE[i-1],b=ROUTE[i],k=(d-RL[i-1])/Math.max(1,RL[i]-RL[i-1]); return [lerp(a[0],b[0],k),lerp(a[1],b[1],k)]; }
// stations als route-parameter u
const ST={mond:0.0,slokdarm:0.05,maag:0.12,dunne:0.2,dunneEind:0.72,dikke:0.78,anus:1.0};
function routeStroke(u0,u1,color,lw){ ctx.beginPath(); const N=80; for(let i=0;i<=N;i++){ const p=routePt(lerp(u0,u1,i/N)); i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); } ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.stroke(); }
function stomachShape(x,y,s,a=1,k=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s*k,s/k); ctx.beginPath(); ctx.moveTo(-50,-70); ctx.bezierCurveTo(-10,-110,80,-80,70,0); ctx.bezierCurveTo(60,70,-20,90,-60,50); ctx.bezierCurveTo(-90,20,-80,-40,-50,-70); ctx.closePath(); shape(ctx,C.oker,lighten(C.oker,0.25),2.5); ctx.restore(); }
function tractMap(o={}){ const A=k=>o[k]===undefined?1:o[k];
  // buis
  routeStroke(0,1,rgba(C.okerD,0.35),30); routeStroke(0,1,rgba(C.bgSchema,0.6),22);
  // gekleurde delen
  alpha(ctx,A('slokdarm'),()=>routeStroke(ST.mond,ST.maag,C.oker,8)); alpha(ctx,A('dunne'),()=>routeStroke(ST.dunne,ST.dunneEind,C.okerD,8)); alpha(ctx,A('dikke'),()=>routeStroke(ST.dikke,1,lighten(C.okerD,0.15),14));
  // mond
  alpha(ctx,A('mond'),()=>{ ctx.beginPath(); ctx.arc(230,290,40,0,6.283); shape(ctx,C.fill,C.line,2); ctx.strokeStyle=C.text; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(230,290,24,0.2,2.94); ctx.stroke(); for(let k=0;k<5;k++){ ctx.fillStyle=C.text; ctx.fillRect(212+k*8,296,5,7); } });
  // maag
  alpha(ctx,A('maag'),()=>stomachShape(440,520,0.8,1,o.knead||1));
  // lever + gal, alvleesklier
  alpha(ctx,A('lever'),()=>{ ctx.beginPath(); ctx.moveTo(560,240); ctx.quadraticCurveTo(700,200,780,250); ctx.quadraticCurveTo(740,320,640,330); ctx.quadraticCurveTo(540,320,560,240); ctx.closePath(); shape(ctx,'#8E4A44','#B86A62',2); dot(ctx,700,330,16,C.groen,lighten(C.groen,0.3),1.5); });
  alpha(ctx,A('alvleesklier'),()=>{ ctx.beginPath(); ctx.ellipse(640,660,90,22,-0.1,0,6.283); shape(ctx,rgba(C.goud,0.7),lighten(C.goud,0.3),2); });
  alpha(ctx,A('speeksel'),()=>{ dot(ctx,300,250,14,C.teal,lighten(C.teal,0.3),1.5); });
  // anus
  alpha(ctx,A('anus'),()=>{ ctx.beginPath(); ctx.arc(1700,860,16,0,6.283); shape(ctx,C.fill,C.line,2); });
}
function tractLabels(o={}){ const L={mond:['mond',230,290,230,160,'left'],slokdarm:['slokdarm',345,440,120,600,'left'],maag:['maag',440,520,330,740,'right'],lever:['lever',680,260,940,160,'left'],gal:['gal',700,330,940,250,'left'],alvleesklier:['alvleesklier',640,660,940,760,'left'],dunne:['dunne darm',1060,400,1300,330,'left'],dikke:['dikke darm',1300,640,1120,860,'right'],anus:['anus',1700,860,1800,780,'left'],speeksel:['speekselklier',300,250,420,120,'left']};
  Object.entries(L).forEach(([k,v])=>{ const a=o[k]===undefined?0:o[k]; if(a>0.01) label(ctx,v[0],o[k+'Meta']||'',v[1],v[2],v[3],v[4],a,o[k+'Col']||C.text,v[5]); }); }
// de hap (stukje appel, later papje) en de pit
function apple(x,y,r,a=1,bite=false){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,'#C94B4B','#E07070',2); if(bite){ ctx.beginPath(); ctx.arc(x+r*0.8,y-r*0.5,r*0.5,0,6.283); ctx.fillStyle=C.bgSchema; ctx.fill(); ctx.beginPath(); ctx.arc(x+r*0.8,y-r*0.5,r*0.5,0,6.283); ctx.fillStyle='#F2E8C8'; ctx.fill(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.strokeStyle='#E07070'; ctx.lineWidth=2; ctx.stroke(); } ctx.strokeStyle=C.bruin; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,y-r); ctx.lineTo(x+4,y-r-18); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x+16,y-r-14,14,7,-0.5,0,6.283); shape(ctx,C.groen,lighten(C.groen,0.3),1.5); ctx.restore(); }
function kaas(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.moveTo(-50,30); ctx.lineTo(50,30); ctx.lineTo(50,-10); ctx.lineTo(-50,-30); ctx.closePath(); shape(ctx,'#E9C85A','#F0DA8A',2); [[-20,5,7],[15,12,6],[25,-2,4],[-35,15,4]].forEach(([dx,dy,r])=>dot(ctx,dx,dy,r,'#D9B23A')); ctx.restore(); }
function pitje(x,y,s=1,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,9*s,14*s,0.3,0,6.283); shape(ctx,'#5A3A22','#8C5A3A',1.5); ctx.restore(); }
function hap(u,a=1,mush=0,t=0){ if(a<=0.01) return; const p=routePt(u); ctx.save(); ctx.globalAlpha*=a; if(mush<0.5){ ctx.beginPath(); ctx.arc(p[0],p[1],14,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3); } else { for(let i=0;i<5;i++){ const q=routePt(clamp(u-i*0.012,0,1)); dot(ctx,q[0]+(hash(i)-0.5)*8,q[1]+(hash(i*3)-0.5)*8,7,rgba(C.oker,0.9)); } } pitje(p[0]+6,p[1]-4,0.8); ctx.restore(); }
function clockPill(s,a){ pill(ctx,1700,120,'⏱ '+s,C.grain,a,28); }
// mond groot: tanden en speeksel
function bigMouth(x,y,s,a,t){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  ctx.beginPath(); ctx.ellipse(0,0,220,140,0,0,6.283); shape(ctx,'#7A3A4A','#A05868',2);
  const open=0.5+0.5*Math.sin(t*4); [[-1,-1],[1,1]].forEach(([d])=>{ for(let k=0;k<7;k++){ const tx=-120+k*40; roundRect(ctx,tx,d>0?30*open:-30*open-34,32,34,6); shape(ctx,'#F2EFE6','#D9D4C4',1.5); } });
  ctx.restore(); }
function dropsFrom(x,y,tx,ty,t,n,color,a){ if(a<=0.01) return; for(let i=0;i<n;i++){ const u=((t*0.5+i/n)%1); alpha(ctx,a*Math.sin(u*Math.PI),()=>dot(ctx,lerp(x,tx,u),lerp(y,ty,u),6,color)); } }
// darmwand met darmvlokken en bloedvaten
function villi(x,y,w,a,t,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const n=Math.floor(w/70);
  ctx.fillStyle=rgba(C.okerD,0.25); ctx.fillRect(x-w/2,y,w,200);
  for(let i=0;i<n;i++){ const vx=x-w/2+35+i*70; roundRect(ctx,vx-24,y-220,48,240,24); shape(ctx,rgba(C.oker,0.5),lighten(C.oker,0.2),2); ctx.strokeStyle='#C47070'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(vx-8,y+10); ctx.lineTo(vx-8,y-190); ctx.quadraticCurveTo(vx,y-205,vx+8,y-190); ctx.lineTo(vx+8,y+10); ctx.stroke(); }
  ctx.strokeStyle=lighten(C.oker,0.2); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-w/2,y); ctx.lineTo(x+w/2,y); ctx.stroke();
  if(o.flow){ for(let i=0;i<12;i++){ const u=((t*0.35+i/12)%1); const vx=x-w/2+35+(i%n)*70; const col=[C.oker,C.paars,C.koraal][i%3]; alpha(ctx,o.flow,()=>dot(ctx,vx+(hash(i)-0.5)*26*(1-u),lerp(y-300,y+60,u),6,col)); } }
  ctx.restore(); }
// estafette: organen als haltes op een rij
const EST=[['mond','klein maken'],['slokdarm','duwen'],['maag','kneden, zuur'],['alvleesklier','sap: afbreken'],['dunne darm','opnemen'],['dikke darm','water terug']];
function estafette(al,t,o={}){ const x0=200,y=470,dx=300; EST.forEach(([n,m],i)=>{ const a=al[i]===undefined?1:al[i]; if(a<=0.01) return; alpha(ctx,a,()=>{ const x=x0+i*dx; dot(ctx,x,y,52,C.fill,C.line,2); text(ctx,n,x,y+100,fTekst(30,600),C.text,'center'); metaText(ctx,m,x,y+136,C.grain,'center',22); if(i<EST.length-1) arrow(ctx,x+60,y,x+dx-60,y,rgba(C.goud,0.7),3,12,o.arrows===undefined?1:o.arrows); }); });
  if(o.baton!==undefined){ const u=o.baton; const i=Math.floor(u*(EST.length-1)), k=u*(EST.length-1)-i; const x=lerp(x0+i*dx,x0+Math.min(i+1,EST.length-1)*dx,k); hapDot(x,y-80); }
  if(o.cross!==undefined) crossOut(ctx,x0+o.cross*dx,y,40,1); }
function hapDot(x,y){ ctx.beginPath(); ctx.arc(x,y,14,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3); }
// enzymschaartje en kralenketting
function beads(x,y,n,color,a=1,gap=26){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<n;i++) dot(ctx,x+i*gap,y,11,color,lighten(color,0.3),1.5); if(n>1){ ctx.strokeStyle=lighten(color,0.3); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+(n-1)*gap,y); ctx.stroke(); } ctx.restore(); }
function scissors(x,y,s,a,open=0.5){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle=C.teal; ctx.lineWidth=4; ctx.lineCap='round'; [[1],[-1]].forEach(([d])=>{ ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-40,d*open*30); ctx.stroke(); ctx.beginPath(); ctx.arc(-52,d*open*36,10,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(34,-d*open*18); ctx.stroke(); }); ctx.restore(); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: appel, pit, wc ----
s01(ctx,t,q){ kitchenBase(0.3,0); const tD=q.at('dag'), tW=q.at('wc');
  const a1=1-ramp(t,tD-0.3,0.6); alpha(ctx,a1,()=>{ human(ctx,620,COUNTER,420,1,C.mens); const bite=ramp(t,q.at('Hap'),0.3); apple(700,520,46,1,bite>0.5);
    const sw=fadeIO(t,q.at('slik'),q.at('pit')+0.5,0.3); alpha(ctx,sw,()=>pitje(620,COUNTER-330+40*clamp((t-q.at('slik'))/1.2,0,1),1.2));
    label(ctx,'pit','per ongeluk doorgeslikt',628,COUNTER-300,900,300,fadeIO(t,q.at('pit'),tD,0.4),C.goud); });
  const a2=ramp(t,tD-0.3,0.6); alpha(ctx,a2,()=>{ pill(ctx,560,170,'een dag later',C.grain,1,30); human(ctx,520,COUNTER,420,1,C.mens);
    alpha(ctx,ramp(t,q.at('weg'),0.4),()=>{ apple(700,520,46,0.35); crossOut(ctx,700,520,40,1); metaText(ctx,'de appel: weg',700,620,C.grain,'center',24); });
    const wc=ramp(t,tW,0.5); alpha(ctx,wc,()=>{ roundRect(ctx,1180,560,160,230,10); shape(ctx,C.fill,C.line,2); text(ctx,'WC',1260,640,fTekst(34,700),C.text,'center'); pitje(1260,730,2.2); });
    label(ctx,'de pit','heel',1270,730,1480,600,ramp(t,q.at('Heel'),0.4),C.goud); });
  pill(ctx,960,870,'waarom de appel wel en de pit niet?',C.goud,ramp(t,q.at('Waarom'),0.5),34);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7); alpha(ctx,a,()=>{ text(ctx,'Vertering',120,330,fTitel(120),C.text); text(ctx,'De reis van een hap appel, van mond tot wc',120,410,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(0,300); ctx.scale(0.8,0.8); ctx.translate(140,60); tractMap({}); hap(((t*0.04)%1),1,0); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 3',W-80,60,C.text2,'right',24); },
// ---- H1: de buis; waarom verteren ----
s04(ctx,t,q){ bg(ctx,'schema'); const tWh=q.at('Waarom'), tBeg=q.at('Verteren');
  const a1=1-ramp(t,tWh-0.3,0.6); alpha(ctx,a1,()=>{ tractMap({}); tractLabels({mond:1,maag:ramp(t,q.at('organen'),0.3),lever:ramp(t,q.at('organen'),0.3),alvleesklier:ramp(t,q.at('organen'),0.3),dunne:ramp(t,q.at('buis'),0.3),dikke:ramp(t,q.at('buis'),0.3),anus:ramp(t,q.at('anus'),0.3)});
    const sp=ramp(t,q.at('spuiten'),0.5); dropsFrom(700,330,760,500,t,4,C.groen,sp); dropsFrom(640,640,720,560,t,4,C.goud,sp);
    pill(ctx,960,100,'spijsverteringsstelsel: de buis + de organen die sap spuiten',C.goud,ramp(t,q.at('Samen'),0.5),30); });
  const a2=ramp(t,tWh-0.3,0.6)*(1-ramp(t,tBeg-0.2,0.6)); alpha(ctx,a2,()=>{ bg(ctx,'micro'); animalCell(560,470,380,260,{t,kern:1,mitos:1,org:0}); apple(1000,470,60,1,true); crossOut(ctx,1000,470,56,ramp(t,q.at('niets'),0.4));
    const vs=ramp(t,q.at('voedingsstoffen'),0.5); alpha(ctx,vs,()=>{ chips(ctx,[['suikers',ramp(t,q.at('suikers'),0.3),C.oker],['eiwitten',ramp(t,q.at('eiwitten'),0.3),C.paars],['vetten',ramp(t,q.at('vetten'),0.3),C.koraal]],800); for(let i=0;i<9;i++){ const u=((t*0.3+i/9)%1); dot(ctx,lerp(1400,760,u),470+Math.sin(u*7+i)*40,7,[C.oker,C.paars,C.koraal][i%3]); } });
    const ap=ramp(t,q.at('appel',2),0.5); alpha(ctx,ap,()=>{ apple(1420,420,90,1); for(let i=0;i<12;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*64; dot(ctx,1420+Math.cos(an)*d,420+Math.sin(an)*d,6,C.oker); } metaText(ctx,'appel: vooral suiker',1420,560,C.grain,'center',22); });
    const ka=ramp(t,q.at('kaas'),0.5); alpha(ctx,ka,()=>{ kaas(1680,440,1.4); for(let i=0;i<10;i++){ const px=1640+hash(i*2.3)*80, py=410+hash(i*5.1)*50; dot(ctx,px,py,6,i%2?C.paars:C.koraal); } metaText(ctx,'kaas: eiwit en vet',1680,560,C.grain,'center',22); });
    alpha(ctx,ramp(t,q.at('Allemaal'),0.4),()=>metaText(ctx,'zitten vast in het eten',1550,640,C.goud,'center',24));
    pill(ctx,960,100,'je cellen hebben voedingsstoffen nodig, als piepkleine deeltjes',C.goud,vs,30); });
  const a3=ramp(t,tBeg-0.2,0.6); alpha(ctx,a3,()=>{ apple(400,470,120,1,true); arrow(ctx,560,470,700,470,C.goud,4,16,1); for(let i=0;i<6;i++){ const an=i*1.05; ctx.beginPath(); ctx.arc(820+Math.cos(an)*70,470+Math.sin(an)*60,28,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); } metaText(ctx,'klein maken',820,640,C.grain,'center',26);
    const af=ramp(t,q.at('afbreken'),0.5); alpha(ctx,af,()=>{ arrow(ctx,940,470,1080,470,C.goud,4,16,1); for(let i=0;i<24;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*110; dot(ctx,1240+Math.cos(an)*d,470+Math.sin(an)*d,7,[C.oker,C.paars,C.koraal][i%3]); } metaText(ctx,'afbreken: voedingsstoffen los',1240,640,C.grain,'center',26); });
    pill(ctx,960,100,'verteren = klein maken en afbreken, tot de voedingsstoffen los zijn',C.goud,ramp(t,q.at('Verteren'),0.5),28);
    const wv=ramp(t,q.at('Water'),0.5); alpha(ctx,wv,()=>{ chips(ctx,[['water',1,C.teal],['vitamines',1,C.groen]],800); metaText(ctx,'al klein genoeg: hoeven niet verteerd',960,850,C.grain,'center',24); }); });
},
// ---- H1: mond, slokdarm, op je kop ----
s05(ctx,t,q){ bg(ctx,'schema'); const tS=q.at('slikt'), tK=q.at('kop');
  const a1=1-ramp(t,tS-0.3,0.6); alpha(ctx,a1,()=>{ bigMouth(700,470,1,1,t*(ramp(t,q.at('tanden'),0.3))); const ch=ramp(t,q.at('tanden'),0.5); for(let i=0;i<6;i++){ const an=i*1.05; alpha(ctx,ch,()=>{ ctx.beginPath(); ctx.arc(700+Math.cos(an)*60*(1-0.3*ch),470+Math.sin(an)*30,16,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); }); }
    alpha(ctx,1-ch,()=>apple(700,470,50,1,true));
    const sp=ramp(t,q.at('Speeksel'),0.5); dropsFrom(520,330,640,440,t,5,C.teal,sp); dropsFrom(880,330,760,440,t,5,C.teal,sp);
    label(ctx,'tanden','snijden en malen',760,400,1100,250,ch,C.text); label(ctx,'speeksel','maakt nat en glad',540,350,440,180,sp,C.teal);
    pill(ctx,960,870,'zo kunnen de sappen er straks overal bij',C.goud,ramp(t,q.at('sappen'),0.5),30); });
  const a2=ramp(t,tS-0.3,0.6); alpha(ctx,a2,()=>{ tractMap({}); const u=lerp(ST.mond,ST.slokdarm+0.02,clamp((t-tS)/2,0,1)); hap(u,1,0,t); tractLabels({slokdarm:1});
    const kop=ramp(t,tK-0.5,0.6); alpha(ctx,kop,()=>{ ctx.save(); ctx.translate(1400,540); ctx.rotate(Math.PI); human(ctx,0,200,400,1,C.mens); ctx.restore(); apple(1400,760,30,1,true); arrow(ctx,1400,700,1400,620,C.goud,3,14,1); metaText(ctx,'op je kop slikken?',1400,840,C.grain,'center',26); });
    pill(ctx,960,100,'komt het eten dan in je maag?',C.goud,ramp(t,q.at('Komt'),0.5),34); });
},
// ---- H2: slokdarm duwt; maag ----
s07(ctx,t,q){ bg(ctx,'schema'); const tM=q.at('maag');
  const a1=1-ramp(t,tM-0.3,0.6); alpha(ctx,a1,()=>{ // slokdarm groot, knijpende spieren achter de hap
    const u=clamp((t-q.at('Spieren'))/3.5,0,1); const y=lerp(180,760,u); roundRect(ctx,860,120,200,720,100); shape(ctx,rgba(C.oker,0.25),C.oker,3);
    ctx.beginPath(); ctx.ellipse(960,y+60,70,40,0,0,6.283); shape(ctx,rgba(C.oker,0.6),lighten(C.oker,0.3),2); ctx.beginPath(); ctx.arc(960,y+150,38,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',3);
    [[-1],[1]].forEach(([d])=>arrow(ctx,960+d*160,y+60,960+d*95,y+60,C.koraal,4,14,ramp(t,q.at('knijpen'),0.4)));
    label(ctx,'spieren in de wand','knijpen achter de hap, duwen hem voort',1060,y+60,1300,y-40,ramp(t,q.at('knijpen'),0.4),C.koraal);
    alpha(ctx,ramp(t,q.at('kop'),0.4),()=>{ ctx.save(); ctx.translate(400,470); ctx.rotate(Math.PI); human(ctx,0,180,360,1,C.mens); ctx.restore(); pill(ctx,400,760,'ook op je kop',C.groen,1,28); }); });
  const a2=ramp(t,tM-0.3,0.6); alpha(ctx,a2,()=>{ const kn=ramp(t,q.at('kneedt'),0.5); stomachShape(760,470,2.6,1,1+0.08*kn*Math.sin(t*3));
    const sap=ramp(t,q.at('maagsap'),0.5); for(let i=0;i<14;i++){ const an=hash(i*2.1)*6.283, d=Math.sqrt(hash(i*4.3))*120; alpha(ctx,sap,()=>dot(ctx,740+Math.cos(an)*d,470+Math.sin(an)*d*0.8,6,C.teal)); }
    for(let i=0;i<4;i++){ const an=i*1.5+t*0.8; ctx.beginPath(); ctx.arc(740+Math.cos(an)*60,470+Math.sin(an)*50,22*(1-0.5*ramp(t,q.at('papje'),1)),0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); } kaas(760,430,0.5*(1-0.5*ramp(t,q.at('papje'),1)),ramp(t,q.at('eiwitten'),0.4)); label(ctx,'eiwit','bijvoorbeeld uit kaas',785,430,1200,330,fadeIO(t,q.at('eiwitten'),q.at('Twee'),0.4),C.paars);
    label(ctx,'maag','een gespierde zak: kneedt',700,300,440,180,ramp(t,q.at('gespierde'),0.4)); label(ctx,'maagsap','zuur: doodt bacteriën, begint met eiwitten',800,560,1200,760,sap,C.teal);
    const bac=fadeIO(t,q.at('bacteriën'),q.at('Twee'),0.4); for(let i=0;i<4;i++) alpha(ctx,bac,()=>{ roundRect(ctx,1300+i*50,330,30,12,6); shape(ctx,rgba(C.groen,0.7),C.groen,1.5); crossOut(ctx,1315+i*50,336,10,1); });
    clockPill('2 tot 4 uur in je maag',ramp(t,q.at('Twee'),0.5));
    alpha(ctx,ramp(t,q.at('papje'),0.5),()=>{ arrow(ctx,880,620,1120,760,C.goud,4,16,1); metaText(ctx,'beetje bij beetje naar de dunne darm',1300,800,C.grain,'center',26); }); });
},
// ---- H2: dunne darm, drie sappen, enzymen ----
s08(ctx,t,q){ bg(ctx,'schema'); tractMap({mond:0.5,lever:ramp(t,q.at('Gal'),0.4),alvleesklier:ramp(t,q.at('alvleesklier'),0.4)});
  const z=ramp(t,q.at('zes'),0.5); tractLabels({dunne:1,dunneMeta:z>0.5?'ongeveer zes meter, opgevouwen':'',alvleesklier:ramp(t,q.at('alvleesklier'),0.4),alvleesklierMeta:'sap: suikers, eiwitten én vetten',alvleesklierCol:C.goud,lever:ramp(t,q.at('Gal'),0.4),gal:ramp(t,q.at('Gal'),0.4),galMeta:'maakt van vet kleine druppels',galCol:C.groen});
  dropsFrom(640,640,760,540,t,5,C.goud,ramp(t,q.at('alvleesklier'),0.5)); dropsFrom(700,330,760,470,t,5,C.groen,ramp(t,q.at('Gal'),0.5));
  const dw=ramp(t,q.at('darmwand'),0.5); for(let i=0;i<8;i++){ const p=routePt(0.3+i*0.05); alpha(ctx,dw,()=>dot(ctx,p[0]+(i%2?14:-14),p[1]-14,5,C.teal)); } label(ctx,'darmwand','maakt zelf ook sap',routePt(0.5)[0],routePt(0.5)[1],1560,160,dw,C.teal);
  const vet=fadeIO(t,q.at('druppels'),q.at('darmwand'),0.4); alpha(ctx,vet,()=>{ dot(ctx,1700,520,30,C.koraal); arrow(ctx,1740,520,1790,520,C.groen,3,12,1); for(let i=0;i<6;i++) dot(ctx,1812+(i%3)*24,508+Math.floor(i/3)*24,8,C.koraal); metaText(ctx,'gal: als afwasmiddel',1780,580,C.grain,'center',22); });
  pill(ctx,960,100,'in al die sappen zitten enzymen: zij doen het afbreken',C.goud,fadeIO(t,q.at('enzymen'),q.at('piepklein'),0.4),30);
  const los=ramp(t,q.at('los'),0.5); for(let i=0;i<18;i++){ const p=routePt(0.35+(i/18)*0.35); alpha(ctx,los,()=>dot(ctx,p[0]+(hash(i)-0.5)*10,p[1]+(hash(i*3)-0.5)*10,6,[C.oker,C.paars,C.koraal][i%3])); }
  pill(ctx,960,100,'de voedingsstoffen zijn los en piepklein',C.goud,fadeIO(t,q.at('piepklein'),q.at('hoe'),0.4),30);
  pill(ctx,960,100,'hoe komen ze bij je cellen?',C.goud,ramp(t,q.at('hoe'),0.5),34);
},
// ---- H2: darmwand, darmvlokken, opnemen ----
s10(ctx,t,q){ bg(ctx,'micro'); const fl=ramp(t,q.at('gaan'),0.5);
  villi(960,560,1300,1,t,{flow:fl});
  label(ctx,'darmwand','dun, vol plooien',960,560,440,760,ramp(t,q.at('darmwand',2),0.4));
  label(ctx,'darmvlokken','piepkleine vingertjes',1065,380,1180,200,ramp(t,q.at('darmvlokken'),0.4),C.oker);
  label(ctx,'bloedvaten','in elke darmvlok',952,420,560,220,ramp(t,q.at('bloedvaten'),0.4),'#C47070');
  pill(ctx,960,100,'opnemen: door de darmwand het bloed in',C.goud,fadeIO(t,q.at('opnemen'),q.at('dertig'),0.4),32);
  pill(ctx,960,100,'binnenkant ≈ 30 m²: de vloer van een grote kamer',C.goud,fadeIO(t,q.at('dertig'),q.at('bloedvaten'),0.4),30);
  const cel=ramp(t,q.at('cellen'),0.5); inset(1640,300,150,cel,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1490,150,300,300); animalCell(1640,300,120,90,{t,kern:1,mitos:1}); }); metaText(ctx,'verbranden, of bouwen er mee',1640,480,C.grain,'center',22*clamp(ramp(t,q.at('verbranden'),0.4),0.01,1));
  pill(ctx,960,870,'je bloed brengt ze naar al je cellen',C.koraal,ramp(t,q.at('brengt'),0.5),30);
},
// ---- H2: de pit ----
s11(ctx,t,q){ bg(ctx,'micro'); pitje(700,470,9); const sp=fadeIO(t,q.at('sap'),q.at('groot'),0.4); for(let k=0;k<6;k++){ const an=k/6*6.283; const u=((t*0.6+k/6)%1); alpha(ctx,sp,()=>dot(ctx,700+Math.cos(an)*(240-u*110),470+Math.sin(an)*(240-u*110),7,[C.goud,C.groen,C.teal][k%3])); }
  label(ctx,'de pit','harde schil: geen sap komt erdoor',760,380,1100,220,ramp(t,q.at('schil'),0.4),C.goud);
  const gr=ramp(t,q.at('groot'),0.5); alpha(ctx,gr,()=>{ villi(1500,620,500,1,t,{}); pitje(1500,330,6); crossOut(ctx,1500,330,40,ramp(t,q.at('past'),0.4)); metaText(ctx,'te groot voor de darmwand',1500,820,C.grain,'center',24); });
  pill(ctx,960,870,'reist verder, met de vezels van de appel',C.text,ramp(t,q.at('reist'),0.5),30);
},
// ---- H3: dikke darm, bacteriën, ontlasting ----
s12(ctx,t,q){ bg(ctx,'schema'); tractMap({mond:0.5,maag:0.6,lever:0.4,alvleesklier:0.4,dikke:1}); tractLabels({dikke:1,dikkeMeta:ramp(t,q.at('anderhalve'),0.4)>0.5?'ongeveer anderhalve meter':'',anus:ramp(t,q.at('anus'),0.4)});
  const u=lerp(ST.dikke,0.98,clamp((t-q.at('dikke'))/Math.max(1,q.at('anus')-q.at('dikke')),0,1)); hap(u,1,1,t);
  const wa=fadeIO(t,q.at('water'),q.at('bacteriën'),0.4); for(let i=0;i<8;i++){ const p=routePt(0.8+i*0.025); const k=((t*0.5+i/8)%1); alpha(ctx,wa,()=>dot(ctx,p[0],p[1]-20-k*60,6,C.teal)); } label(ctx,'water','terug je lichaam in',routePt(0.86)[0],routePt(0.86)[1]-60,1500,330,wa,C.teal);
  const bac=ramp(t,q.at('bacteriën'),0.5); for(let i=0;i<14;i++){ const p=routePt(0.8+(i/14)*0.18); alpha(ctx,bac,()=>{ ctx.save(); ctx.translate(p[0]+(hash(i)-0.5)*10,p[1]+(hash(i*3)-0.5)*10); ctx.rotate(hash(i*7)*3); roundRect(ctx,-9,-4,18,8,4); shape(ctx,rgba(C.groen,0.8),lighten(C.groen,0.3),1); ctx.restore(); }); }
  label(ctx,'bacteriën','vezels afbreken, vitamines maken',routePt(0.9)[0],routePt(0.9)[1],1540,580,bac,C.groen);
  pill(ctx,960,100,'ontlasting: wat overblijft, steviger',C.text,fadeIO(t,q.at('ontlasting'),q.at('bacteriën'),0.4),30);
  pill(ctx,960,100,'niet vies, maar handig',C.groen,fadeIO(t,q.at('handig'),q.at('Na'),0.4),30);
  clockPill('1 tot 2 dagen',ramp(t,q.at('Na'),0.5));
  pill(ctx,960,100,'ontlasting = alles wat nooit in je bloed kwam',C.goud,ramp(t,q.at('nooit'),0.5),30);
  alpha(ctx,ramp(t,q.at('pit'),0.4),()=>pitje(1720,900,2));
},
// ---- H3: estafette, alvleesklier stopt? ----
s13(ctx,t,q){ bg(ctx,'schema'); const e=ramp(t,q.at('orgaan'),0.5); const al=EST.map((_,i)=>ramp(t,q.at('orgaan')+i*0.25,0.4));
  estafette(al,t,{baton:clamp((t-q.at('gaf'))/4,0,1),cross:t>=q.at('Stel')-0.2?3:undefined});
  pill(ctx,960,150,'een estafette: elk orgaan doet een stuk en geeft door',C.goud,fadeIO(t,q.at('estafette'),q.at('Stel'),0.4),30);
  pill(ctx,960,150,'stel: je alvleesklier stopt',C.koraal,ramp(t,q.at('Stel'),0.5),34);
  pill(ctx,960,870,'wat gebeurt er?',C.goud,ramp(t,q.at('gebeurt'),0.5),34);
},
// ---- H3: zonder alvleesklier; orgaanstelsel ----
s15(ctx,t,q){ bg(ctx,'schema'); estafette([1,1,1,1,1,1],t,{cross:3,baton:clamp((t-0.2)/Math.max(1,q.at('krijgt')-0.2),0,1)});
  const va=ramp(t,q.at('vastzitten'),0.5); alpha(ctx,va,()=>{ apple(1400,250,60,1); for(let i=0;i<10;i++){ const an=hash(i*2.3)*6.283, d=Math.sqrt(hash(i*5.1))*44; dot(ctx,1400+Math.cos(an)*d,250+Math.sin(an)*d,6,[C.oker,C.paars,C.koraal][i%3]); } metaText(ctx,'voedingsstoffen blijven vastzitten',1400,350,C.grain,'center',22); });
  pill(ctx,960,150,'het sap dat het meeste afbreekt, is er niet',C.koraal,fadeIO(t,q.at('sap'),q.at('wc'),0.4),30);
  pill(ctx,960,150,'de dikke darm in, de wc in: je lichaam krijgt bijna niets',C.koraal,fadeIO(t,q.at('wc'),q.at('orgaanstelsel'),0.4),28);
  pill(ctx,960,150,'orgaanstelsel: elk orgaan doet een stuk',C.goud,ramp(t,q.at('orgaanstelsel'),0.5),32);
  pill(ctx,960,870,'valt er één uit, dan loopt de estafette vast',C.goud,ramp(t,q.at('Valt'),0.5),30);
},
// ---- H3 havo/vwo: enzymen knippen ----
s16(ctx,t,q){ bg(ctx,'micro'); const rows=[['speeksel','zetmeel → kleine suikers',q.at('speeksel'),C.oker,6],['maagsap','eiwit → bouwstenen',q.at('maagsap'),C.paars,5],['alvleesklier','zetmeel, eiwit én vet',q.at('alvleesklier'),C.koraal,5]];
  pill(ctx,960,100,'elk enzym knipt één soort stof',C.goud,ramp(t,q.at('knipt'),0.5),32);
  rows.forEach(([n,m,tt,col,k],i)=>{ const a=ramp(t,tt,0.5); if(a<=0.01) return; const y=260+i*150; alpha(ctx,a,()=>{ text(ctx,n,120,y+8,fTekst(34,600),C.text); metaText(ctx,m,120,y+44,C.grain,'left',22);
      const cut=clamp((t-tt-0.8)/1.5,0,1); beads(560,y,k,col,1,32*(1+cut*0.8)); if(cut<1) scissors(560+32*Math.floor(k/2)-16,y-30,1,1,0.5+0.5*Math.sin(t*6)); }); });
  const gal=ramp(t,q.at('Gal'),0.5); alpha(ctx,gal,()=>{ text(ctx,'gal',120,718,fTekst(34,600),C.text); metaText(ctx,'geen enzym: alleen druppels',120,754,C.grain,'left',22); dot(ctx,560,710,26,C.koraal); arrow(ctx,600,710,650,710,C.groen,3,12,1); for(let i=0;i<5;i++) dot(ctx,680+i*26,710,8,C.koraal); });
  const ch=ramp(t,q.at('chemische'),0.5); alpha(ctx,ch,()=>{ roundRect(ctx,1180,230,640,300,16); shape(ctx,rgba(C.fill,0.6),C.line,1); text(ctx,'afbreken = chemische verandering',1500,290,fTekst(30,600),C.goud,'center'); metaText(ctx,'een geknipte stof is een andere stof',1500,330,C.grain,'center',22); beads(1300,420,5,C.oker,1,30); arrow(ctx,1450,420,1520,420,C.goud,3,12,1); for(let i=0;i<5;i++) dot(ctx,1560+i*40,420,11,C.goud,lighten(C.goud,0.3),1.5); metaText(ctx,'zetmeel is zoet geworden',1500,480,C.grain,'center',22); });
  const ka=ramp(t,q.at('Kauwen'),0.5); alpha(ctx,ka,()=>{ roundRect(ctx,1180,560,640,260,16); shape(ctx,rgba(C.fill,0.6),C.line,1); text(ctx,'kauwen: kleiner, dezelfde stof',1500,620,fTekst(30,600),C.text,'center'); apple(1340,720,40,1,true); arrow(ctx,1400,720,1460,720,C.goud,3,12,1); for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(1520+i*50,720,18,0,6.283); shape(ctx,'#F2E8C8','#C94B4B',2); } });
},
// ---- samenvatting ----
s17(ctx,t,q){ bg(ctx,'schema'); tractMap({}); const u=clamp((t-0.3)/Math.max(1,q.at('Drie')-0.3),0,1); hap(u,1,u>0.25?1:0,t);
  tractLabels({mond:ramp(t,q.at('Mond'),0.3),mondMeta:'klein maken, nat maken',slokdarm:ramp(t,q.at('Slokdarm'),0.3),slokdarmMeta:'duwen',maag:ramp(t,q.at('Maag'),0.3),maagMeta:'kneden, zuur maagsap',dunne:ramp(t,q.at('Dunne'),0.3),dunneMeta:'sappen; opnemen in het bloed',alvleesklier:ramp(t,q.at('alvleesklier'),0.3),lever:ramp(t,q.at('lever'),0.3),dikke:ramp(t,q.at('Dikke'),0.3),dikkeMeta:'water terug, bacteriën, ontlasting',anus:ramp(t,q.at('Dikke'),0.3)});
  const st=ramp(t,q.at('Drie'),0.5); chips(ctx,[['klein maken',ramp(t,q.at('klein',2),0.3),C.goud],['afbreken',ramp(t,q.at('afbreken'),0.3),C.goud],['opnemen',ramp(t,q.at('opnemen',2),0.3),C.goud]],100);
  pill(ctx,960,870,'samen, als estafette',C.goud,fadeIO(t,q.at('estafette'),q.at('pit'),0.4),30);
  alpha(ctx,ramp(t,q.at('pit'),0.5),()=>{ pitje(1720,900,2); pill(ctx,960,870,'de pit: te hard voor elk sap, te groot voor de darmwand',C.text,1,28); });
},
// ---- eindkaart ----
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'de reis van een hap',120,260,C.grain,'left',26);
  const P=[['Kauw op brood','Kauw een minuut op een stukje brood zonder te slikken. Wat proef je na een tijdje? Welk sap doet dat?'],['Teken de reis','Teken de buis van mond tot anus. Zet bij elk orgaan zijn taak en het sap dat erbij komt.'],['Rondleiding','Kijk nog eens de film Een rondleiding door je lichaam: welke organen van de rondleiding zag je nu van binnen?']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Iemand heeft geen gal meer. Welke voedingsstof wordt dan slechter verteerd, en waarom?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
