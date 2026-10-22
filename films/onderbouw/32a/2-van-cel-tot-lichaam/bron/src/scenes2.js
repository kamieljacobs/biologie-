// ===== Van cel tot lichaam — scènes (kerndoelen onderbouw, film 2) =====
// Hulpjes uit film 1 staan hierboven (helpers1.js), plus het castboek (lib_cast.js: persoon) en de anatomie (anatomie.js: realistisch lichaam, bodyOrgans, anHeart, anLungs, …).
// Nieuwe tekeningen: gymzaal, spiercel, weefseltegels, kuitspier, bot, slaplant met organen, bladdoorsnede, gespecialiseerde cellen, trap.
// Versie 1.1 (21 okt 2026): grijze poppetjes vervangen. 'Jij' = Lotte uit het castboek (zoals in film 2b), rent in de gymles echt (zijaanzicht);
// 'een volwassen mens' = Mevrouw Visser; lichaam met organen = anatomie.js; losse organen (hart, long, maag, huid) en de kuitspier realistischer.

// ---------- film 2: nieuwe tekeningen ----------
function muscleCell(x,y,len,a=1,ry=24){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x-len/2,y); ctx.quadraticCurveTo(x-len/4,y-ry-2,x,y-ry); ctx.quadraticCurveTo(x+len/4,y-ry-2,x+len/2,y); ctx.quadraticCurveTo(x+len/4,y+ry+2,x,y+ry); ctx.quadraticCurveTo(x-len/4,y+ry+2,x-len/2,y); ctx.closePath(); shape(ctx,rgba(C.koraal,0.35),lighten(C.koraal,0.2),2);
  ctx.strokeStyle=rgba(C.koraal,0.6); ctx.lineWidth=1.5; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x-len/2+30,y+k*ry/3); ctx.lineTo(x+len/2-30,y+k*ry/3); ctx.stroke(); }
  nucleus(ctx,x-len*0.18,y-ry*0.25,Math.min(11,ry*0.45),1,0); nucleus(ctx,x+len*0.22,y+ry*0.2,Math.min(11,ry*0.45),1,0); ctx.restore(); }
function neuron(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.paars; ctx.lineCap='round';
  ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+420*s,y+10*s); ctx.stroke();
  [[-60,-70],[-80,10],[-50,80],[20,-85],[30,80]].forEach(([dx,dy])=>{ ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+dx*0.5*s,y+dy*0.7*s,x+dx*s,y+dy*s); ctx.stroke(); });
  [[-20,-30],[-20,30],[20,30]].forEach(([dx,dy])=>{ ctx.lineWidth=2.5*s; ctx.beginPath(); ctx.moveTo(x+420*s,y+10*s); ctx.lineTo(x+420*s+dx*s,y+10*s+dy*s); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(x,y,34*s,30*s,0,0,6.283); shape(ctx,rgba(C.paars,0.5),lighten(C.paars,0.3),2); nucleus(ctx,x,y,12*s,1,0); ctx.restore(); }
function rbc(x,y,r,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.95,0,0,6.283); shape(ctx,'#B85A5A','#D88080',2); ctx.beginPath(); ctx.ellipse(x,y,r*0.45,r*0.4,0,0,6.283); ctx.fillStyle=rgba('#7A3838',0.5); ctx.fill(); ctx.restore(); }
function bone(x,y,len,rot,a=1,s=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.rotate(rot); const w=26*s, k=30*s;
  roundRect(ctx,-len/2,-w/2,len,w,w/2); shape(ctx,'#E9E4D6','#B8B2A2',2);
  [[-len/2,-1],[len/2,1]].forEach(([ex])=>{ ctx.beginPath(); ctx.arc(ex,-k*0.55,k*0.6,0,6.283); ctx.arc(ex,k*0.55,k*0.6,0,6.283); shape(ctx,'#E9E4D6','#B8B2A2',2); });
  ctx.restore(); }
function boneCells(x,y,len,a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<14;i++){ const px=x-len/2+40+(i*(len-80)/13), py=y+(hash(i*3.3)-0.5)*16; ctx.beginPath(); ctx.ellipse(px,py,9,6,hash(i)*3,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); for(let k=0;k<5;k++){ const an=k*1.26+hash(i+k); ctx.strokeStyle=rgba(C.kern,0.6); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(px+Math.cos(an)*9,py+Math.sin(an)*6); ctx.lineTo(px+Math.cos(an)*20,py+Math.sin(an)*14); ctx.stroke(); } } ctx.restore(); }
// ---------- mensen: castboek (Lotte = jij) ----------
// tijdelijk het anatomie-assenstelsel verleggen: punt (ox,oy) in hoofdhoogtes komt op (x,y), HH px per hoofdhoogte
function opPlek(x,y,HH,ox,oy,fn){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; BODY.h=HH*AN_H; BODY.cx=x-ox*HH; BODY.yb=y-oy*HH+BODY.h; try{ fn(); } finally{ Object.assign(BODY,o); } }
function lijfOp(cx,yb,h,fn){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; Object.assign(BODY,{cx,yb,h}); try{ fn(); } finally{ Object.assign(BODY,o); } }
// grondsnelheid (px/s) bij een gang: exact uit het castboek (gangSnelheid), zodat de steunvoet niet over de vloer glijdt (v1.2, 22 okt 2026)
function grondV(h,gang='ren'){ return gangSnelheid('lotte',h,gang); }
// Lotte rent (of staat) van opzij; o.hart / o.adem (0..1) tekenen hart en longen in de borst, o.puf = ademwolkjes bij de mond
// o.gang = 'ren' (standaard) of 'sprint'; o.vooruit: x = startpunt, Lotte beweegt zelf met grondV (steunvoet staat stil op de vloer)
function renner(x,fy,h,t,o={}){ const kijk=o.kijk||1, ren=o.ren!==false, gang=o.gang||'ren';
  const A=persoon(ctx,'lotte',x,fy,h,{zij:true,kijk,gang:ren?gang:null,vooruit:ren&&!!o.vooruit,t,outfit:'sport',uit:o.uit||'blij',a:o.a==null?1:o.a});
  if(!A.hoofd) return A; const r=A.hoofd.r, hh=h*(CAST.lotte.lengte||1)/6.1;
  const bx=lerp(A.heup.x,A.hoofd.x,0.5)+kijk*0.12*hh, by=lerp(A.heup.y,A.hoofd.y,0.5)+0.05*hh; A.borst={x:bx,y:by};
  A.mond={x:A.hoofd.x+kijk*0.72*r, y:A.hoofd.y+0.45*r};
  const hart=o.hart||0, adem=o.adem||0;
  if(hart>0.01||adem>0.01){ ctx.save(); ctx.translate(bx,by); ctx.rotate(kijk*(ren?GANG[gang].leun*Math.PI/180:0.03)); ctx.translate(-bx,-by);
    opPlek(bx,by,0.155*hh*6.1/7.3*4.6,0.02,2.12,()=>{ anLungs(adem*0.95,o.breath||0,adem*0.5); anHeart(hart,o.beat||0,hart*0.6); }); ctx.restore(); }
  const pf=o.puf||0; if(pf>0.01) for(let i=0;i<3;i++){ const u=((t*1.7+i/3)%1); alpha(ctx,pf*(1-u)*0.75,()=>{ ctx.beginPath(); ctx.ellipse(A.mond.x+kijk*(10+u*18)-kijk*u*110,A.mond.y+6+u*14,7+u*16,5+u*11,0,0,6.283); ctx.fillStyle='#D8EEF2'; ctx.fill(); }); }
  return A; }
// gymzaal die meeschuift (camera volgt de renner): scroll in px
function gymHall(scroll=0){ bg(ctx,'schema'); const fy=800, P=2400, off=((scroll%P)+P)%P;
  // achterwand: lambrisering met naden, hoge ramen
  ctx.fillStyle='#1F2C45'; ctx.fillRect(0,fy-190,W,190); ctx.strokeStyle=rgba(C.line,0.22); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,fy-190); ctx.lineTo(W,fy-190); ctx.stroke();
  ctx.strokeStyle=rgba(C.line,0.1); ctx.lineWidth=2; for(let x=-(off%160);x<W;x+=160){ ctx.beginPath(); ctx.moveTo(x,fy-190); ctx.lineTo(x,fy); ctx.stroke(); }
  for(let k=-1;k<2;k++){ const b=k*P-off;
    for(let w=0;w<3;w++){ const wx=b+620+w*300; if(wx>W+40||wx<-260) continue; roundRect(ctx,wx,90,220,150,6); shape(ctx,rgba('#2E4466',0.55),rgba(C.line,0.3),2); ctx.strokeStyle=rgba(C.line,0.18); ctx.beginPath(); ctx.moveTo(wx+110,90); ctx.lineTo(wx+110,240); ctx.moveTo(wx,165); ctx.lineTo(wx+220,165); ctx.stroke(); }
    // wandrek
    const rx=b+120; if(rx<W+40&&rx>-300){ ctx.strokeStyle=rgba('#C9A27E',0.55); ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(rx,230); ctx.lineTo(rx,fy); ctx.moveTo(rx+220,230); ctx.lineTo(rx+220,fy); ctx.stroke(); ctx.lineWidth=4; for(let i=0;i<9;i++){ ctx.beginPath(); ctx.moveTo(rx,270+i*60); ctx.lineTo(rx+220,270+i*60); ctx.stroke(); } }
    // basketbalbord met ring en netje
    const hx=b+1750; if(hx<W+200&&hx>-200){ ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(hx+120,280); ctx.lineTo(hx+170,280); ctx.lineTo(hx+170,fy-190); ctx.stroke(); roundRect(ctx,hx-20,250,150,100,6); shape(ctx,rgba('#E9E4D6',0.12),rgba(C.line,0.55),3); ctx.strokeStyle=rgba('#E8833A',0.9); ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(hx+40,360,40,9,0,0,6.283); ctx.stroke(); ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; for(let i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(hx+i*16,362); ctx.lineTo(hx+12+i*12,410); ctx.stroke(); } }
    // bank langs de wand
    const bk=b+2050; if(bk<W+40&&bk>-420){ roundRect(ctx,bk,fy-70,380,22,6); shape(ctx,'#8A6A4E','#A8866A',1.5); ctx.fillStyle='#6E5440'; ctx.fillRect(bk+30,fy-48,14,48); ctx.fillRect(bk+336,fy-48,14,48); }
  }
  // vloer: houten sportvloer met lijnen
  ctx.fillStyle='#3A3550'; ctx.fillRect(0,fy,W,H-fy); ctx.fillStyle='#4A4258'; for(let y=fy;y<H;y+=26){ ctx.fillRect(0,y,W,2); }
  ctx.strokeStyle=rgba(C.goud,0.45); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,fy+60); ctx.lineTo(W,fy+60); ctx.stroke();
  ctx.strokeStyle=rgba('#E8833A',0.35); ctx.lineWidth=4; for(let x=-(off%640);x<W+640;x+=640){ ctx.beginPath(); ctx.moveTo(x,fy+8); ctx.lineTo(x-40,H); ctx.stroke(); }
  ctx.strokeStyle=rgba(C.line,0.35); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,fy); ctx.lineTo(W,fy); ctx.stroke();
  return fy; }
function heart(x,y,s,a=1,beat=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); const k=1+0.12*Math.max(0,Math.sin(beat)); ctx.scale(s*k,s*k); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.25),2); ctx.restore(); }
function lungs(x,y,s,a=1,breath=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const k=1+0.08*Math.max(0,Math.sin(breath)); [[-1,0],[1,0]].forEach(([d])=>{ ctx.beginPath(); ctx.ellipse(x+d*40*s,y,30*s*k,52*s*k,0,0,6.283); shape(ctx,rgba(C.teal,0.55),lighten(C.teal,0.2),2); }); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y-80*s); ctx.lineTo(x,y-20*s); ctx.stroke(); ctx.restore(); }
function kidney(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,14*s,24*s,0,0,6.283); shape(ctx,'#9A4A4A','#C47070',1.5); ctx.restore(); }
// lichaam met organen: anatomie.js (bodyOrgans, realistisch, vooraanzicht); BODY = midden, voeten, lengte
const BODY={cx:960,yb:895,h:730};
const SYS={ // naam, sleutel, aanwijspunt (relatief in u), labelpositie, taak
  spijs:['spijsverteringsstelsel',0.3,4.3,1400,470,'eten klein maken, opnemen'],
  adem:['ademhalingsstelsel',-0.9,3.1,440,600,'zuurstof erin, koolstofdioxide eruit'],
  bloed:['bloedvatenstelsel',-0.3,2.95,440,60,'alles rondbrengen'],
  zenuw:['zenuwstelsel',0,0.5,1400,120,'signalen doorgeven'],
  skelet:['skelet',0.7,6.6,1400,760,'stevigheid en bescherming'],
  spier:['spierstelsel',-1.55,3.1,440,600,'bewegen'],
  uitsch:['uitscheidingsstelsel',0.95,4.55,1400,600,'afval uit je bloed'],
  afweer:['afweersysteem',1.35,2.5,1400,300,'tegen ziekteverwekkers'],
  hormoon:['hormoonstelsel',0,0.85,440,110,'regelen met stoffen in je bloed'],
  voortpl:['voortplantingsstelsel',0.1,5.45,440,760,'nieuw leven'],
};
// namen in twee kolommen naast het lichaam, op de hoogte van het stelsel (geen wijslijnen; zoals film 2b)
function sysPos(k){ const HH=AHH(), top=AB().top, L=BODY.cx-1.45*HH, R=BODY.cx+1.45*HH, y=v=>top+v*HH;
  return ({ hormoon:[L,y(0.55),'right'], bloed:[L,y(1.3),'right'], adem:[L,y(2.05),'right'], spier:[L,y(2.8),'right'], voortpl:[L,y(3.55),'right'],
            zenuw:[R,y(0.4),'left'], afweer:[R,y(1.45),'left'], spijs:[R,y(2.4),'left'], uitsch:[R,y(3.2),'left'], skelet:[R,y(4.6),'left'] })[k]; }
function sysLabel(k,a,meta=true){ const s=SYS[k]; if(a<=0.01) return; const p=sysPos(k); naamBij(ctx,s[0],meta?s[5]:'',p[0],p[1],a,p[2]); }
// kuitspier als orgaan: twee spierkoppen, dikke buik, versmalt naar de achillespees
function calfPath(k=1){ ctx.beginPath(); ctx.moveTo(-74*k,-252*k); ctx.bezierCurveTo(-128*k,-205*k,-138*k,-40*k,-98*k,62*k); ctx.bezierCurveTo(-74*k,128*k,-34*k,176*k,-22*k,212*k); ctx.lineTo(22*k,212*k);
  ctx.bezierCurveTo(34*k,176*k,74*k,128*k,98*k,62*k); ctx.bezierCurveTo(138*k,-40*k,128*k,-205*k,74*k,-252*k); ctx.bezierCurveTo(40*k,-276*k,-40*k,-276*k,-74*k,-252*k); ctx.closePath(); }
function calf(x,y,s,a=1,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  // achillespees (onder) en pezen van de koppen (boven)
  const pees=o.pees===undefined?1:o.pees; alpha(ctx,pees,()=>{ ctx.fillStyle='#E9E4D6'; ctx.beginPath(); ctx.moveTo(-24,200); ctx.bezierCurveTo(-20,260,-16,300,-20,336); ctx.lineTo(20,336); ctx.bezierCurveTo(16,300,20,260,24,200); ctx.closePath(); ctx.fill(); ctx.strokeStyle=rgba('#B8B2A2',0.7); ctx.lineWidth=1.5; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(k*9,215); ctx.lineTo(k*6,330); ctx.stroke(); }
    [-1,1].forEach(d=>{ ctx.beginPath(); ctx.moveTo(d*60,-262); ctx.quadraticCurveTo(d*70,-300,d*64,-322); ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.stroke(); }); });
  // spierbuik met schaduw rechts, glans links
  calfPath(); ctx.fillStyle='#B9524C'; ctx.fill(); ctx.save(); calfPath(); ctx.clip(); ctx.fillStyle='#9E423D'; ctx.beginPath(); ctx.ellipse(110,0,90,300,0,0,6.283); ctx.fill(); ctx.fillStyle=rgba('#E58E82',0.35); ctx.beginPath(); ctx.ellipse(-70,-60,30,150,0.1,0,6.283); ctx.fill();
    // spiervezelbundels die naar de pees lopen
    ctx.strokeStyle=rgba('#7E2E2A',0.55); ctx.lineWidth=2; for(let k=-5;k<=5;k++){ if(k===0) continue; ctx.beginPath(); ctx.moveTo(k*20,-262+Math.abs(k)*8); ctx.bezierCurveTo(k*30,-120,k*24,60,k*3.5,212); ctx.stroke(); }
    ctx.strokeStyle=rgba('#F0A89C',0.35); ctx.lineWidth=1.2; for(let k=-4;k<=4;k++){ ctx.beginPath(); ctx.moveTo(k*20+10,-250+Math.abs(k)*8); ctx.bezierCurveTo(k*30+10,-120,k*24+8,60,k*3.5+3,212); ctx.stroke(); }
    // naad tussen de twee koppen
    ctx.strokeStyle=rgba('#6E2622',0.8); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,-268); ctx.bezierCurveTo(6,-180,-4,-90,0,-10); ctx.stroke(); ctx.restore();
  calfPath(); ctx.strokeStyle='#D47A70'; ctx.lineWidth=2.5; ctx.stroke();
  if(o.zenuw){ ctx.save(); ctx.globalAlpha*=o.zenuw; ctx.strokeStyle='#B79AE6'; ctx.shadowColor='#B79AE6'; ctx.shadowBlur=8; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-22,-262); ctx.quadraticCurveTo(14,-60,-12,190); ctx.stroke(); [[-80,-60],[62,0],[-70,80],[50,120]].forEach(([dx,dy])=>{ ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo((dx<0?-6:-2),dy-60); ctx.quadraticCurveTo(dx*0.5,dy-20,dx,dy); ctx.stroke(); }); ctx.restore(); }
  if(o.vat){ ctx.save(); ctx.globalAlpha*=o.vat; ctx.lineCap='round'; ctx.strokeStyle='#D04A44'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(30,-258); ctx.quadraticCurveTo(-24,0,22,200); ctx.stroke(); ctx.strokeStyle='#5677C2'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(50,-252); ctx.quadraticCurveTo(4,20,40,196); ctx.stroke();
    ctx.lineWidth=2; [[-0.2,-1],[0.15,1],[0.45,-1],[0.7,1]].forEach(([u,d])=>{ const py=-250+u*450, px=34-58*Math.sin(u*Math.PI)*0.9+u*0; ctx.strokeStyle='#D04A44'; ctx.beginPath(); ctx.moveTo(px,py); ctx.quadraticCurveTo(px+d*40,py+20,px+d*70,py+50); ctx.stroke(); }); ctx.restore(); }
  if(o.bind){ ctx.save(); ctx.globalAlpha*=o.bind; ctx.save(); ctx.scale(1.07,1.04); calfPath(); ctx.restore(); ctx.strokeStyle=rgba('#E9E4D6',0.75); ctx.lineWidth=7; ctx.stroke(); ctx.save(); ctx.scale(1.07,1.04); calfPath(); ctx.restore(); ctx.strokeStyle=rgba('#FFFFFF',0.35); ctx.lineWidth=1.5; ctx.setLineDash([3,7]); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// losse organen, realistisch getekend met anatomie.js (voor de rij hart · long · maag · huid · bot)
function orgaanLos(k,x,y,s=1,t=0){
  if(k==='hart') opPlek(x,y,330*s,0.09,2.15,()=>anHeart(1,t*6,0.25));
  if(k==='long') opPlek(x,y,165*s,0,1.86,()=>{ anTrachea(1); anLungs(1,t*3,0.2); });
  if(k==='maag') opPlek(x,y,270*s,0.26,2.86,()=>{ anLine([[0.04,2.38],[0.08,2.52],[0.13,2.64]],ANA.slok,0.09*AHH()); anShape(AN_MAAG,ANA.maag,ANA.maagS,2.5); ctx.save(); ctx.globalAlpha*=0.55; anLine([[0.2,2.62],[0.38,2.7],[0.45,2.9]],ANA.maagS,2); anLine([[0.12,3.06],[0.3,3.05],[0.42,2.98]],ANA.maagS,2); anLine([[0.25,2.75],[0.4,2.82],[0.46,3.0]],ANA.maagS,1.5); ctx.restore(); anLine([[-0.06,3.04],[-0.17,3.1],[-0.2,3.2]],ANA.darm,0.07*AHH()); });
  if(k==='huid') huidBlok(x,y,s);
}
// stukje huid in doorsnede: opperhuid, lederhuid (haar, zweetklier, bloedvaatje), onderhuids vet
function huidBlok(x,y,s=1){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const w=190,h=150; roundRect(ctx,-w/2,-h/2,w,h,12); ctx.save(); ctx.clip();
  ctx.fillStyle='#EBD49A'; ctx.fillRect(-w/2,-h/2,w,h); for(let i=0;i<9;i++){ ctx.beginPath(); ctx.ellipse(-w/2+14+i*22,h/2-20+(i%2)*8,13,11,0,0,6.283); ctx.fillStyle='#F3E2AE'; ctx.fill(); ctx.strokeStyle='#CDB574'; ctx.lineWidth=1; ctx.stroke(); }
  ctx.fillStyle='#E6A99A'; ctx.beginPath(); ctx.moveTo(-w/2,-h/2); ctx.lineTo(w/2,-h/2); ctx.lineTo(w/2,h/2-40); ctx.bezierCurveTo(40,h/2-30,-40,h/2-46,-w/2,h/2-36); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=rgba('#C98577',0.6); ctx.lineWidth=1.2; for(let i=0;i<7;i++){ ctx.beginPath(); for(let k=0;k<=12;k++){ const px=-w/2+k*w/12, py=-h/2+42+i*9+Math.sin(k*1.3+i)*3; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); }
  ctx.strokeStyle='#D04A44'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-w/2,h/2-52); ctx.bezierCurveTo(-30,h/2-50,-20,-h/2+40,10,-h/2+38); ctx.bezierCurveTo(30,-h/2+40,30,h/2-56,w/2,h/2-50); ctx.stroke();
  ctx.strokeStyle='#8FB8D8'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(52,-h/2+14); ctx.lineTo(54,h/2-62); ctx.stroke(); ctx.beginPath(); for(let k=0;k<20;k++){ const an=k*0.9; ctx.lineTo(54+Math.cos(an)*9,h/2-58+Math.sin(an)*5+k*0.3); } ctx.stroke();
  ctx.fillStyle='#C98577'; ctx.beginPath(); ctx.ellipse(-46,h/2-58,10,16,0,0,6.283); ctx.fill(); ctx.strokeStyle='#3A2418'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-46,h/2-58); ctx.lineTo(-42,-h/2+14); ctx.quadraticCurveTo(-36,-h/2-10,-22,-h/2-30); ctx.stroke();
  ctx.fillStyle='#D9A982'; ctx.beginPath(); ctx.moveTo(-w/2,-h/2); ctx.lineTo(w/2,-h/2); ctx.lineTo(w/2,-h/2+14); for(let k=12;k>=0;k--){ ctx.lineTo(-w/2+k*w/12,-h/2+14+Math.sin(k*1.7)*3); } ctx.closePath(); ctx.fill(); ctx.fillStyle='#C08A62'; ctx.fillRect(-w/2,-h/2,w,4);
  ctx.restore(); roundRect(ctx,-w/2,-h/2,w,h,12); ctx.strokeStyle=rgba('#F0D6B8',0.7); ctx.lineWidth=2; ctx.stroke();
  ctx.strokeStyle='#3A2418'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-42,-h/2); ctx.quadraticCurveTo(-36,-h/2-10,-22,-h/2-30); ctx.stroke(); ctx.restore(); }
// weefseltegel: cirkel met een patroon
function tissueTile(x,y,r,kind,a,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.clip(); ctx.translate(x,y);
  if(kind==='spier'){ for(let k=-3;k<=3;k++) muscleCell(0,k*44,r*2.4,1,16); }
  if(kind==='zenuw'){ neuron(-110,-40,0.55); neuron(-60,70,0.45); neuron(-150,120,0.4); }
  if(kind==='bot'){ ctx.fillStyle='#E9E4D6'; ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<4;i++){ ctx.strokeStyle='#C9C3B3'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,0,30+i*32,0,6.283); ctx.stroke(); } for(let i=0;i<22;i++){ const an=hash(i*2.1)*6.283, d=35+hash(i*5.3)*(r-45); ctx.beginPath(); ctx.ellipse(Math.cos(an)*d,Math.sin(an)*d,7,4,an,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); } }
  if(kind==='bind'){ ctx.strokeStyle=C.grain; ctx.lineWidth=2.5; for(let i=0;i<16;i++){ const an=hash(i*1.7)*6.283, px=(hash(i*3.1)-0.5)*2*r, py=(hash(i*4.3)-0.5)*2*r; ctx.beginPath(); ctx.moveTo(px-Math.cos(an)*120,py-Math.sin(an)*120); ctx.lineTo(px+Math.cos(an)*120,py+Math.sin(an)*120); ctx.stroke(); } for(let i=0;i<9;i++){ const px=(hash(i*7.1)-0.5)*1.6*r, py=(hash(i*8.3)-0.5)*1.6*r; ctx.beginPath(); ctx.ellipse(px,py,16,9,hash(i)*3,0,6.283); shape(ctx,rgba(C.grain,0.35),C.grain,1.2); nucleus(ctx,px,py,5,1,0); } }
  if(kind==='dek'){ for(let row=-2;row<=2;row++) for(let c=-4;c<=4;c++){ const px=c*60+(row%2?30:0), py=row*34; ctx.beginPath(); ctx.ellipse(px,py,31,17,0,0,6.283); shape(ctx,'rgba(120,155,205,0.22)','rgba(55,85,145,0.6)',1.5); dot(ctx,px,py,6,'rgba(42,62,128,0.85)'); } }
  if(kind==='bloed'){ ctx.fillStyle=rgba('#E8D9A8',0.18); ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<14;i++){ const px=(hash(i*2.7)-0.5)*1.8*r, py=(hash(i*3.9)-0.5)*1.8*r+(t*20+i*13)%40-20; rbc(px,py,22); } dot(ctx,30,-40,18,'rgba(235,235,245,0.9)','#C9C3D6',1.5); dot(ctx,-70,60,16,'rgba(235,235,245,0.9)','#C9C3D6',1.5); }
  ctx.restore(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
// bloedvat (schematisch, verticaal) met bewegende cellen
function vessel(x,y,w,h,t,a=1,label=true){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-w/2,y,w,h,w/2); shape(ctx,rgba('#9A4A4A',0.35),'#C47070',2); ctx.save(); roundRect(ctx,x-w/2,y,w,h,w/2); ctx.clip(); for(let i=0;i<12;i++){ const py=y+((t*70+i*(h/9))%h), px=x+(hash(i*3.3)-0.5)*(w-70); rbc(px,py,20+hash(i)*6); } dot(ctx,x+10,y+((t*55+200)%h),17,'rgba(235,235,245,0.9)','#C9C3D6',1.5); ctx.restore(); ctx.restore(); }
// slaplant met organen (bloeiende sla: stengel, bloem), in de grond
function groundLine(y){ ctx.fillStyle='#2A2119'; ctx.fillRect(0,y,W,H-y); ctx.strokeStyle=lighten(C.bruin,0.2); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
function roots(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle='#D9CFA8'; ctx.lineCap='round'; [[0,0,-30,120,-60,250,5],[0,0,40,100,90,230,4.5],[0,0,-90,80,-180,170,3.5],[0,0,100,60,200,150,3.5],[0,0,-20,160,20,300,3],[-30,120,-110,140,-150,220,2],[40,100,120,150,150,260,2],[-60,250,-90,290,-100,340,1.5],[90,230,130,280,160,330,1.5]].forEach(([ax,ay,bx,by,cx2,cy2,w])=>{ ctx.lineWidth=w*s; ctx.beginPath(); ctx.moveTo(x+ax*s,y+ay*s); ctx.quadraticCurveTo(x+bx*s,y+by*s,x+cx2*s,y+cy2*s); ctx.stroke(); }); ctx.restore(); }
function flower(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let k=0;k<8;k++){ const an=k/8*6.283; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*22*s,y+Math.sin(an)*22*s,20*s,9*s,an,0,6.283); shape(ctx,C.goud,lighten(C.goud,0.3),1.5); } dot(ctx,x,y,12*s,C.oker,lighten(C.oker,0.3),1.5); ctx.restore(); }
function slaPlant(x,yg,s,o={}){ // x, grondlijn yg; o: {wortel,stengel,blad,bloem,hl}
  const A=k=>o[k]===undefined?1:o[k];
  roots(x,yg,s*0.9,A('wortel'));
  alpha(ctx,A('stengel'),()=>{ ctx.strokeStyle=G1; ctx.lineWidth=16*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.quadraticCurveTo(x+10*s,yg-250*s,x-6*s,yg-470*s); ctx.stroke(); ctx.strokeStyle=lighten(G1,0.3); ctx.lineWidth=2; ctx.stroke(); });
  alpha(ctx,A('blad'),()=>{ [[-90,-120,0.9,-0.9,1],[95,-140,0.9,0.9,2],[-80,-250,0.75,-1.0,3],[85,-270,0.75,1.0,4],[-60,-360,0.6,-1.1,5],[60,-380,0.6,1.1,6]].forEach(([dx,dy,sc,rot,seed])=>{ lettuceLeaf(x+dx*s,yg+dy*s,95*s*sc,55*s*sc,rot,seed,x,yg+dy*s+40*s,seed%2?G1:G2,V1,{amp:0.06}); }); });
  flower(x-6*s,yg-490*s,s*1.1,A('bloem'));
  if(o.hl){ const P={wortel:[x,yg+150*s,200*s],stengel:[x,yg-230*s,70*s],blad:[x+95*s,yg-140*s,110*s],bloem:[x-6*s,yg-490*s,60*s]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.arc(P[0],P[1],P[2],0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); } }
// bladdoorsnede: opperhuid boven en onder, bladmoes, vaatbundel
function leafCross(x,y,w,o={}){ const A=k=>o[k]===undefined?1:o[k]; const h=360;
  ctx.save(); ctx.beginPath(); ctx.rect(x-w/2,y-h/2,w,h); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.strokeStyle=rgba(C.line,0.3); ctx.lineWidth=1; ctx.stroke();
  alpha(ctx,A('moes'),()=>{ for(let r=0;r<4;r++) for(let c=0;c<Math.floor(w/70);c++){ const px=x-w/2+45+c*70+(r%2?20:0), py=y-110+r*72; if(Math.abs(px-x)<70&&r>=1&&r<=2) continue; ctx.beginPath(); ctx.ellipse(px,py,30,32,0,0,6.283); shape(ctx,rgba(C.teal,0.18),C.groen,3); for(let k=0;k<4;k++){ const an=k*1.6+hash(r*11+c); chloroplast(ctx,px+Math.cos(an)*14,py+Math.sin(an)*15,16,1,an); } } });
  alpha(ctx,A('opper'),()=>{ [y-h/2+22,y+h/2-22].forEach(py=>{ for(let c=0;c<Math.floor(w/60);c++){ const px=x-w/2+32+c*60; ctx.beginPath(); ctx.ellipse(px,py,29,19,0,0,6.283); shape(ctx,rgba('#C9D6E6',0.25),'#9FB3CC',2); dot(ctx,px,py,5,'rgba(42,62,128,0.85)'); } }); });
  alpha(ctx,A('vaat'),()=>{ ctx.beginPath(); ctx.ellipse(x,y+10,64,78,0,0,6.283); shape(ctx,rgba(C.oker,0.2),C.oker,3); [[-22,-30],[22,-30],[0,-5],[-24,22],[24,22],[0,45]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.arc(x+dx,y+10+dy,14,0,6.283); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.2),2); }); });
  if(o.hl){ const P={opper:[x,y-h/2+22,w,50],moes:[x,y-25,w,200],vaat:[x,y+10,150,180]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); roundRect(ctx,P[0]-P[2]/2,P[1]-P[3]/2,P[2],P[3],12); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// trap van vijf treden
const TRAP=[['cel','',C.koraal],['weefsel','dezelfde cellen, dezelfde taak'],['orgaan','verschillende weefsels samen'],['orgaanstelsel','organen die samenwerken'],['organisme','alles samen: één levend wezen']];
function trap(al,sub=true){ const x0=120,y0=780,sw=330,sh=118;
  TRAP.forEach((s,i)=>{ const a=al[i]; if(a<=0.01) return; alpha(ctx,a,()=>{ const x=x0+i*sw, y=y0-i*sh; ctx.beginPath(); ctx.rect(x,y,sw-6,H-y-200); shape(ctx,rgba(C.fill,0.9),C.line,1.5); text(ctx,s[0],x+24,y+52,fTekst(40,700),C.goud); if(sub&&s[1]){ ctx.font=fTekst(26); ctx.fillStyle=C.text2; ctx.textAlign='left'; wrap(ctx,s[1],x+24,y+92,sw-50,32); } }); }); }
function trapArt(al,t){ // tekeningen op de treden: mens
  alpha(ctx,al[0],()=>muscleCell(285,560,200));
  alpha(ctx,al[1],()=>{ for(let k=0;k<5;k++) muscleCell(615,470+k*20-40,210,0.9); });
  alpha(ctx,al[2],()=>calf(945,390,0.5,1,{zenuw:1,vat:1,bind:1}));
  alpha(ctx,al[3],()=>lijfOp(1275,420,290,()=>bodyOrgans({sil:0.55,bloed:1,t,beat:t*5})));
  alpha(ctx,al[4],()=>persoon(ctx,'lotte',1605,306,262,{uit:'blij',t})); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: gymles ----
s01(ctx,t,q){ const tS=q.at('sprint')-0.2, tH=q.at('hart'), tA=q.at('ademt'), tW=q.at('Waarom'), h=430;
  // v1.2: sprint uit het castboek; de camera volgt half (Lotte schuift van 380 naar 1220), de gymzaal schuift de rest, samen exact grondV → de steunvoet staat stil op de vloer
  const u=clamp((t-tS)/Math.max(1,tW-tS),0,1)*0.95, xs=lerp(380,1220,u), v=grondV(h,'sprint');
  const scroll=Math.max(0,v*(t-tS)-(xs-380)); const fy=gymHall(scroll);
  const hb=ramp(t,tH-0.6,0.5), br=ramp(t,tA-0.2,0.5);
  const A=renner(t>=tS?xs-v*(t-tS):xs,fy,h,t>=tS?t-tS:t,{ren:t>=tS,gang:'sprint',vooruit:true,hart:hb,adem:br,puf:br,beat:t*12,breath:t*7});
  // beenspieren oplichten
  const lg=fadeIO(t,q.at('beenspieren'),tH,0.4); if(lg>0.01){ ctx.save(); ctx.globalAlpha*=lg; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; const ry=(fy-A.heup.y)/2+28; ctx.beginPath(); ctx.ellipse(A.heup.x+6,A.heup.y+ry-28,150,ry,0,0,6.283); ctx.stroke(); ctx.restore(); }
  naamBij(ctx,'beenspieren','werken hard',A.heup.x-175,A.heup.y+10,lg,'right',C.goud);
  naamBij(ctx,'hart','bonkt',A.borst.x+175,A.borst.y+10,fadeIO(t,tH,tW+1,0.4),'left',C.koraal);
  naamBij(ctx,'ademt sneller','',A.mond.x+40,A.hoofd.y-A.hoofd.r-24,fadeIO(t,tA,tW+1,0.4),'left',C.teal);
  pill(ctx,960,150,'waarom doet de rest van je lichaam mee?',C.goud,ramp(t,tW,0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Van cel tot lichaam',120,380,fTitel(110),C.text); text(ctx,'Hoe dertigduizend miljard cellen samenwerken',120,460,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(1420,0); ctx.scale(0.72,0.72); ctx.translate(-960,120); bodyOrgans({sil:0.45,zenuw:1,spijs:1,adem:1,bloed:1,uitsch:1,skelet:0,t,beat:t*5,breath:t*2.5}); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 2',W-80,60,C.text2,'right',24); },
// ---- H1: 30 000 miljard, geordend; spiercel → spierweefsel ----
s04(ctx,t,q){ bg(ctx,'schema'); const tK=q.at('klein'), tM=q.at('miljoenen'), tG=q.at("Zo'n");
  const a1=1-ramp(t,tK-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ persoon(ctx,'visser',520,800,560,{uit:'blij',t}); pill(ctx,520,150,'≈ 30 000 miljard cellen',C.goud,ramp(t,q.at('dertigduizend'),0.5),34);
    // hoop cellen → geordend
    const ord=ramp(t,q.at('geordend'),1.2); for(let i=0;i<48;i++){ const hx=1100+hash(i*2.1)*600, hy=300+hash(i*3.7)*460; const gx=1000+(i%8)*95, gy=330+Math.floor(i/8)*80; ctx.beginPath(); ctx.ellipse(lerp(hx,gx,ord),lerp(hy,gy,ord),26,20,0,0,6.283); shape(ctx,rgba(C.koraal,0.3),lighten(C.koraal,0.2),1.5); dot(ctx,lerp(hx,gx,ord),lerp(hy,gy,ord),6,C.kern); }
    metaText(ctx,'niet zomaar op een hoop',1340,260,C.grain,'center',26*clamp(1-ord,0.01,1)); metaText(ctx,'geordend, in stappen',1340,260,C.goud,'center',26*clamp(ord,0.01,1)); });
  const a2=ramp(t,tK-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'micro');
    const one=1-ramp(t,tM-0.2,0.8); const sq=fadeIO(t,q.at('korter'),q.at('bijna'),0.4); const len=600*(1-0.18*Math.max(0,Math.sin((t-q.at('korter'))*3))*sq);
    alpha(ctx,one,()=>{ muscleCell(960,470,len,1,40); label(ctx,'spiercel','lang en dun',960,430,1340,220,ramp(t,q.at('spiercel'),0.5)); pill(ctx,960,720,'kan korter worden',C.koraal,fadeIO(t,q.at('korter'),q.at('bijna'),0.4),30); pill(ctx,960,150,'één spiercel kan bijna niets',C.text,fadeIO(t,q.at('bijna'),tM,0.4),30); });
    const many=ramp(t,tM-0.2,0.8); if(many>0.01) alpha(ctx,many,()=>{ for(let r=0;r<9;r++) for(let c=0;c<3;c++){ muscleCell(430+c*520+(r%2?30:0),200+r*62,500,1,24); }
      const pr=ramp(t,q.at('kracht'),0.5); arrow(ctx,300,470,120,470,C.goud,6,20,pr); arrow(ctx,1620,470,1800,470,C.goud,6,20,pr);
      pill(ctx,960,820,'miljoenen spiercellen naast elkaar: samen kracht zetten',C.goud,pr,30);
      const wf=ramp(t,tG,0.5); haak(ctx,120,1800,760,'',C.goud,0); naamBij(ctx,'spierweefsel','dezelfde cellen, dezelfde taak',960,748,ramp(t,q.at('spierweefsel'),0.5),'center',C.goud);
      pill(ctx,960,100,'weefsel = een groep dezelfde cellen met dezelfde taak',C.goud,wf,30); }); });
},
// ---- H1: meer soorten weefsel (tegels) ----
s05(ctx,t,q){ bg(ctx,'schema'); const T=[['spierweefsel','kracht zetten','spier',q.at('meer')],['zenuwweefsel','geeft signalen door','zenuw',q.at('Zenuwweefsel')],['botweefsel','hard','bot',q.at('Botweefsel')],['bindweefsel','houdt alles bij elkaar','bind',q.at('Bindweefsel')],['dekweefsel','bedekt, zoals je huid','dek',q.at('Dekweefsel')]];
  T.forEach((it,i)=>{ const x=240+i*360, y=420, a=ramp(t,it[3],0.5); tissueTile(x,y,140,it[2],a,t); alpha(ctx,a,()=>{ text(ctx,it[0],x,620,fTekst(34,600),C.text,'center'); metaText(ctx,it[1],x,660,C.grain,'center',24); }); });
  const dim2=ramp(t,q.at('namen'),0.5); alpha(ctx,dim2,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.55); ctx.fillRect(0,0,W,H); });
  pill(ctx,960,150,'die namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('Wel'),0.4),32);
  alpha(ctx,ramp(t,q.at('Wel'),0.5),()=>{ text(ctx,'elk weefsel',960,380,fTitel(64),C.goud,'center'); text(ctx,'bestaat uit cellen',960,470,fTekst(44),C.text,'center'); alpha(ctx,ramp(t,q.at('eigen'),0.4),()=>text(ctx,'en heeft een eigen taak',960,540,fTekst(44),C.text,'center')); });
},
// ---- H1: kuitspier = orgaan; hart, long, maag, huid, bot; bot vraag ----
s06(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('Verschillende'), tH=q.at('hart'), tB=q.at('bot');
  const a1=1-ramp(t,tH-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ const zo=ramp(t,0.2,1.2); const LH=560, hh=LH*CAST.lotte.lengte/6.1, top=860-LH*CAST.lotte.lengte, heupY=top+3.45*hh, kn=heupY+(860-heupY)*0.42;
    persoon(ctx,'lotte',420,860,LH,{outfit:'sport',uit:'blij',t});
    // kuit van het been aan de kant van de tekening; stippelring en twee zoomlijnen
    const kx=420+1.45*hh*0.24+hh*0.04, ky=kn+(860-0.3*hh-kn)*0.42, kry=(860-0.3*hh-kn)*0.42;
    ctx.save(); ctx.globalAlpha*=zo; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(kx,ky,hh*0.38,kry,0,0,6.283); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(kx+hh*0.2,ky-kry*0.9); ctx.lineTo(1062,206); ctx.moveTo(kx+hh*0.2,ky+kry*0.9); ctx.lineTo(1070,760); ctx.stroke(); ctx.restore();
    calf(1180,470,1.0,zo,{zenuw:ramp(t,q.at('zenuwweefsel'),0.5),vat:ramp(t,q.at('bloedvaten'),0.5),bind:ramp(t,q.at('bindweefsel'),0.5),pees:0.0});
    // namen rechts naast de spier, van boven naar beneden (geen wijslijnen)
    naamBij(ctx,'kuitspier','',1350,250,ramp(t,q.at('kuitspier'),0.5),'left');
    naamBij(ctx,'spierweefsel','',1350,370,ramp(t,q.at('spierweefsel'),0.4),'left',C.koraal);
    naamBij(ctx,'zenuwweefsel','geeft het signaal',1350,470,ramp(t,q.at('zenuwweefsel'),0.4),'left','#B79AE6');
    naamBij(ctx,'bloedvaten','',1350,590,ramp(t,q.at('bloedvaten'),0.4),'left','#E07A70');
    naamBij(ctx,'bindweefsel','eromheen',1350,690,ramp(t,q.at('bindweefsel'),0.4),'left','#E9E4D6');
    pill(ctx,960,100,'orgaan = verschillende weefsels samen, met een eigen taak',C.goud,ramp(t,tO,0.5),30);
    const tk=ramp(t,q.at('taak'),0.5); pill(ctx,420,150,'taak: korter worden',C.koraal,tk,30); });
  const a2=ramp(t,tH-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ const O=[['hart',q.at('hart'),400,380,()=>orgaanLos('hart',400,380,1,t)],['long',q.at('long'),700,380,()=>orgaanLos('long',700,380,1,t)],['maag',q.at('maag'),1000,380,()=>orgaanLos('maag',1000,380,1,t)],['huid',q.at('huid'),1300,380,()=>orgaanLos('huid',1300,380,1,t)],['bot',tB,1600,380,()=>bone(1600,380,200,0,1,1.2)]];
    const bq=ramp(t,q.at('hard'),0.6);
    alpha(ctx,1-bq,()=>{ O.forEach(([n,tt,x,y,fn])=>{ const a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ fn(); text(ctx,n,x,560,fTekst(36,600),C.text,'center'); }); });
      metaText(ctx,'allemaal organen',960,180,C.grain,'center',28*clamp(ramp(t,tH,0.5),0.01,1)); });
    if(bq>0.01) alpha(ctx,bq,()=>{ bone(960,470,560,0,1,2.2); pill(ctx,960,720,'zit daar nog leven in?',C.goud,ramp(t,q.at('leven'),0.5),36); }); });
},
// ---- H2: bot leeft; orgaanstelsels: spijsvertering, ademhaling, bloedvaten; bloed vraag ----
s08(ctx,t,q){ bg(ctx,'schema'); const tOrg=q.at('Organen'), tBl=q.at('stroomt');
  const a1=1-ramp(t,tOrg-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ bone(960,470,560,0,1,2.2); boneCells(960,470,560,ramp(t,q.at('botcellen'),0.6));
    naamBij(ctx,'botcellen','maken het harde spul, en zitten er nog in',960,560,ramp(t,q.at('botcellen'),0.5),'center',C.kern);
    const br=fadeIO(t,q.at('gebroken'),tOrg,0.5); if(br>0.01){ const heal=ramp(t,q.at('gebroken')+1.2,1.5); alpha(ctx,br*(1-heal),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(1000,440); ctx.lineTo(980,470); ctx.lineTo(1010,500); ctx.stroke(); }); pill(ctx,960,720,heal>0.5?'groeit weer aan elkaar':'gebroken',heal>0.5?C.groen:C.koraal,br,30); }
    pill(ctx,960,150,'een bot leeft',C.groen,ramp(t,q.at('leeft'),0.5),36); });
  const a2=ramp(t,tOrg-0.3,0.6)*(1-ramp(t,tBl-0.2,0.6)*0.85);
  if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('mond'),0.6),adem:ramp(t,q.at('neus'),0.6),bloed:ramp(t,q.at('hart'),0.6),t,beat:t*5,breath:t*2.5});
    pill(ctx,960,100,'orgaanstelsel = organen die samenwerken, met één grote taak',C.goud,fadeIO(t,q.at('orgaanstelsel'),q.at('mond'),0.4),30);
    sysLabel('spijs',ramp(t,q.at('spijsverteringsstelsel'),0.5)); sysLabel('adem',ramp(t,q.at('ademhalingsstelsel'),0.5)); sysLabel('bloed',ramp(t,q.at('bloedvatenstelsel'),0.5));
    const pS=sysPos('spijs'), pA=sysPos('adem'); mouth(fadeIO(t,q.at('mond'),q.at('slokdarm'),0.3)); nose(fadeIO(t,q.at('neus'),q.at('luchtpijp'),0.3));
    alpha(ctx,fadeIO(t,q.at('mond'),q.at('spijsverteringsstelsel'),0.3),()=>metaText(ctx,'mond · slokdarm · maag · darmen',pS[0],pS[1],C.grain,'left',24));
    alpha(ctx,fadeIO(t,q.at('neus'),q.at('ademhalingsstelsel'),0.3),()=>metaText(ctx,'neus · luchtpijp · longen',pA[0],pA[1],C.grain,'right',24)); });
  const a3=ramp(t,tBl-0.2,0.6); if(a3>0.01) alpha(ctx,a3,()=>{ bg(ctx,'micro'); vessel(960,80,320,760,t); pill(ctx,960,870-20,'is bloed ook een weefsel?',C.goud,ramp(t,q.at('weefsel'),0.5),36); });
},
// ---- H2: bloed = weefsel; de rest van de stelsels; tien ----
s10(ctx,t,q){ bg(ctx,'micro'); const tV=q.at('Verder');
  const a1=1-ramp(t,tV-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ vessel(960,80,320,760,t); label(ctx,'bloed','vol cellen met dezelfde taak: vervoeren',1180,400,1400,250,ramp(t,q.at('cellen'),0.5)); pill(ctx,960,870-20,'ook een weefsel, alleen zwemmen de cellen in vocht',C.goud,ramp(t,q.at('vocht'),0.5),30); });
  const a2=ramp(t,tV-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'schema');
    const K=[['zenuw','zenuwstelsel'],['skelet','skelet'],['spier','spierstelsel'],['uitsch','uitscheidingsstelsel'],['afweer','afweersysteem'],['hormoon','hormoonstelsel'],['voortpl','voortplantingsstelsel']];
    const o={sil:0.3,spijs:0.4,adem:0.4,bloed:0.4,t,beat:t*5,breath:t*2.5}; K.forEach(([k,w])=>o[k]=ramp(t,q.at(w),0.6)); o.impuls=0.6*o.zenuw; o.urine=0.6*o.uitsch; bodyOrgans(o);
    K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
    const ten=ramp(t,q.at('Tien'),0.5); pill(ctx,960,100,'tien orgaanstelsels',C.goud,ten,34); alpha(ctx,ramp(t,q.at('film'),0.4),()=>metaText(ctx,'elk later in een eigen film',960,150,C.grain,'center',24)); });
},
// ---- H2: organisme; terug naar de gymles: stelsels werken samen ----
s11(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('gymles'), tS=q.at('werken');
  const a1=1-ramp(t,tG-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.5,adem:0.5,bloed:0.5,zenuw:0.5,skelet:0.5,uitsch:0.5,afweer:0.5,hormoon:0.5,voortpl:0.5,t}); const org=ramp(t,q.at('organisme'),0.5); alpha(ctx,org,()=>{ ctx.save(); ctx.setLineDash([12,10]); ctx.beginPath(); ctx.ellipse(960,528,300,404,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }); naamBij(ctx,'organisme','één levend wezen: jij',1282,420,org,'left',C.goud); });
  const a2=ramp(t,tG-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('darmen'),0.5),adem:ramp(t,q.at('longen'),0.5),bloed:ramp(t,q.at('bloed'),0.5),spier:1,t,beat:t*9,breath:t*4});
    // mitochondriën in de kuitspier (inzet, met zoomlijnen vanaf de kuit)
    const mi=fadeIO(t,q.at('mitochondriën'),q.at('Daarom'),0.5), [kx,ky]=AP(-0.5,5.85);
    if(mi>0.01){ ctx.save(); ctx.globalAlpha*=mi; ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; const ang=Math.atan2(560-ky,380-kx); for(const d of [-1,1]){ const an=ang+d*Math.PI/2; ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(380+Math.cos(an)*150,560+Math.sin(an)*150); ctx.stroke(); } ctx.setLineDash([6,6]); ctx.beginPath(); ctx.ellipse(kx,ky,0.16*AHH(),0.5*AHH(),0,0,6.283); ctx.stroke(); ctx.restore(); }
    inset(380,560,150,mi,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(230,410,300,300); muscleCell(380,560,280,1,40); for(let i=0;i<6;i++) mitochondrion(ctx,300+i*32,545+(i%2)*30,30,0.1*i,1,3,t); });
    alpha(ctx,fadeIO(t,q.at('verbranden'),q.at('Daarom'),0.4),()=>{ metaText(ctx,'spiercel:',380,745,C.grain,'center',22); metaText(ctx,'verbrandt voedingsstoffen met zuurstof',380,778,C.grain,'center',22); });
    // stromen langs de bloedvaten: zuurstof longen → hart → slagader → been; voedingsstoffen darmen → slagader → ander been
    const zs=fadeIO(t,q.at('zuurstof',2),tS,0.5), vs=fadeIO(t,q.at('voedingsstoffen',2),tS,0.5);
    const PZ=anDense([[-0.4,2.1],[-0.15,2.12],[0.06,2.2],[0.05,2.9],[0.04,3.38],[-0.2,3.66],[-0.34,3.96],[-0.37,4.62],[-0.42,5.2],[-0.5,5.8]],80), PV=anDense([[0.1,3.5],[0.05,3.42],[0.2,3.66],[0.34,3.96],[0.37,4.62],[0.42,5.2],[0.5,5.8]],70);
    for(let i=0;i<8;i++){ const w=((t*0.3+i/8)%1); alpha(ctx,zs,()=>{ const [x,y]=anAlong(PZ,w); dot(ctx,x,y,7,C.teal,'#FFFFFF',1); }); alpha(ctx,vs,()=>{ const [x,y]=anAlong(PV,w); dot(ctx,x,y,7,C.oker,'#FFFFFF',1); }); }
    const HH=AHH(), top=AB().top, L=BODY.cx-1.45*HH, R=BODY.cx+1.45*HH;
    naamBij(ctx,'zuurstof','uit je longen',L,top+2.05*HH,zs,'right',C.teal); naamBij(ctx,'voedingsstoffen','uit je darmen',R,top+3.4*HH,vs,'left',C.oker); naamBij(ctx,'bloed','naar de spiercellen',R,top+2.2*HH,fadeIO(t,q.at('bloed'),tS,0.5),'left',C.koraal);
    pill(ctx,960,100,'ademt sneller · hart pompt harder: je spieren hebben meer nodig',C.goud,fadeIO(t,q.at('Daarom'),tS,0.4),28);
    pill(ctx,960,100,'je orgaanstelsels werken samen',C.goud,ramp(t,tS,0.5),34); });
},
// ---- H3: terug naar de sla — vraag ----
s12(ctx,t,q){ bg(ctx,'macro'); groundLine(700); krop(700,700,0.9,0); alpha(ctx,ramp(t,0.3,0.6),()=>roots(700,700,0.8,0.6)); pill(ctx,960,150,'heeft een plant ook organen?',C.goud,ramp(t,q.at('organen'),0.5),36); },
// ---- H3: organen van de plant ----
s14(ctx,t,q){ bg(ctx,'macro'); groundLine(700); const P=['wortels','stengel','bladeren','bloem'];
  const hl = t>=q.at('zorgt')?'bloem': t>=q.at('vangen')?'blad': t>=q.at('draagt')?'stengel': t>=q.at('halen')?'wortel':null;
  slaPlant(760,700,1.0,{wortel:ramp(t,q.at('wortels'),0.5),stengel:ramp(t,q.at('stengel'),0.5),blad:1,bloem:ramp(t,q.at('bloem'),0.5),hl});
  pill(ctx,760,100,'een slaplant is een organisme',C.goud,fadeIO(t,q.at('organisme'),q.at('organen'),0.4),32);
  label(ctx,'wortels','halen water uit de grond',760,820,1250,840,ramp(t,q.at('halen'),0.5),C.grain);
  label(ctx,'stengel','draagt en vervoert',760,470,1250,560,ramp(t,q.at('draagt'),0.5),C.groen);
  naamBij(ctx,'bladeren','vangen licht',950,600,ramp(t,q.at('vangen'),0.5),'left',C.groen);
  label(ctx,'bloem','zorgt voor zaden',754,210,1250,200,ramp(t,q.at('zorgt'),0.5),C.goud);
  alpha(ctx,ramp(t,q.at('Alle'),0.5),()=>{ ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.ellipse(760,870,240,160,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); });
  pill(ctx,760,100,'wortelstelsel: een orgaanstelsel van de plant',C.goud,ramp(t,q.at('wortelstelsel'),0.5),30);
},
// ---- H3: één blad: opperhuid, bladmoes, vaatbundels ----
s15(ctx,t,q){ bg(ctx,'micro'); const tO=q.at('opperhuid'), tM=q.at('bladmoes'), tVb=q.at('vaatbundels'), tB=q.at('dus');
  const hl = t>=tB?null: t>=tVb?'vaat': t>=tM?'moes': t>=tO?'opper':null;
  const intro=1-ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,intro,()=>{ bg(ctx,'macro'); groundLine(700); slaPlant(560,700,0.9,{}); zoomCircle(ctx,1300,420,280,655,560,'één blad, doorgesneden',ramp(t,q.at('zoomen'),0.6),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1000,120,600,600); leafCross(1300,420,560,{}); }); });
  const main=ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,main,()=>{ bg(ctx,'micro'); leafCross(960,470,1100,{opper:ramp(t,tO-0.5,0.5),moes:ramp(t,tM-0.5,0.5),vaat:ramp(t,tVb-0.5,0.5),hl});
    naamBij(ctx,'opperhuid','een laag platte cellen: beschermt',420,258,ramp(t,tO,0.5),'left','#C9D6E6');
    naamBij(ctx,'bladmoes','vol bladgroenkorrels:',385,450,ramp(t,tM,0.5),'right',C.groen); naamBij(ctx,'','maakt voedsel',385,478,ramp(t,tM,0.5),'right',C.groen);
    naamBij(ctx,'vaatbundel','in de nerf: vervoert water en voedsel',960,700,ramp(t,tVb,0.5),'center',C.oker);
    pill(ctx,960,100,'een blad is een orgaan: verschillende weefsels samen, met een eigen taak',C.goud,ramp(t,tB,0.5),28); });
},
// ---- H3 havo/vwo: gespecialiseerde cellen ----
s16(ctx,t,q){ bg(ctx,'micro'); const tP=q.at('plant');
  const a1=1-ramp(t,tP-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{
    const bt=ramp(t,q.at('bouwtekening'),0.5);
    const cells=[['spiercel',q.at('spiercel'),420,()=>muscleCell(420,470,440,1,34)],['zenuwcel',q.at('zenuwcel'),960,()=>neuron(820,470,0.9)],['rode bloedcel',q.at('rode'),1500,()=>rbc(1500,470,70)]];
    cells.forEach(([n,tt,x,fn])=>{ const a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ fn(); text(ctx,n,x,640,fTekst(36,600),C.text,'center'); }); });
    alpha(ctx,ramp(t,q.at('korter'),0.4),()=>metaText(ctx,'lang, kan korter worden',420,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('uitlopers'),0.4),()=>metaText(ctx,'lange uitlopers: signalen ver doorgeven',960,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('plat'),0.4),()=>metaText(ctx,'klein en plat, geen celkern',1500,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('dunste'),0.4),()=>{ roundRect(ctx,1380,720,240,40,20); shape(ctx,rgba('#9A4A4A',0.35),'#C47070',2); rbc(1400+((t*60)%200),740,16); });
    pill(ctx,960,100,'dezelfde bouwtekening in de celkern',C.goud,fadeIO(t,q.at('bouwtekening'),q.at('gespecialiseerd'),0.4),30);
    alpha(ctx,ramp(t,q.at('celkern',2),0.4),()=>crossOut(ctx,1500,470,18,0.9));
    pill(ctx,960,100,'gespecialiseerd: de bouw van de cel past bij zijn taak',C.goud,ramp(t,q.at('gespecialiseerd'),0.5),30); });
  const a2=ramp(t,tP-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'micro');
    plantCellV(520,470,380,280,{t,wall:1,chloro:1,vac:1,kern:1,mitos:1}); text(ctx,'cel in het bladmoes',520,820,fTekst(36,600),C.text,'center');
    alpha(ctx,ramp(t,q.at('wortel'),0.5),()=>{ plantCellV(1400,470,380,280,{t,wall:1,chloro:0,vac:1,kern:1,mitos:1}); text(ctx,'cel in de wortel',1400,820,fTekst(36,600),C.text,'center'); metaText(ctx,'geen bladgroenkorrels: daar is geen licht',1400,860,C.grain,'center',24); });
    pill(ctx,960,100,'ook bij de plant: de bouw past bij de taak',C.goud,ramp(t,tP,0.5),30); });
},
// ---- samenvatting: de trap ----
s17(ctx,t,q){ bg(ctx,'schema'); const al=[ramp(t,q.at('cel'),0.5),ramp(t,q.at('weefsel'),0.5),ramp(t,q.at('orgaan'),0.5),ramp(t,q.at('orgaanstelsel'),0.5),ramp(t,q.at('organisme'),0.5)];
  trap(al); trapArt(al,t);
  metaText(ctx,'van klein naar groot',120,120,C.grain,'left',26); text(ctx,'Van cel tot lichaam',120,190,fTitel(56),C.text);
  const sla=ramp(t,q.at('sla'),0.5); alpha(ctx,sla,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); ctx.fillRect(0,0,W,H); trap([1,1,1,1,1],false); metaText(ctx,'en de sla',120,120,C.groen,'left',26); text(ctx,'Van cel tot plant',120,190,fTitel(56),C.text); const R=[['bladmoescel',()=>plantCellV(285,560,70,52,{wall:1,chloro:1,vac:1,kern:1})],['bladmoes',()=>tissue(615,470,90,t)],['blad',()=>{ lettuceLeaf(945,420,120,70,0,3,945,500,G1,V1,{amp:0.06}); }],['wortelstelsel',()=>roots(1275,300,0.5)],['slaplant',()=>slaPlant(1600,400,0.45,{})]]; R.forEach(([n,fn],i)=>{ fn(); metaText(ctx,n,120+i*330+160,H-150,C.groen,'center',24); }); });
  const gym=ramp(t,q.at('gymles'),0.5); alpha(ctx,gym,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.95); ctx.fillRect(0,0,W,H); const vG=grondV(400,'ren'), sc=vG*t; /* v1.2: vloer schuift exact mee met de pas */ ctx.fillStyle=rgba('#3A3550',0.9); ctx.fillRect(0,800,W,100); ctx.strokeStyle=rgba(C.goud,0.45); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,840); ctx.lineTo(W,840); ctx.stroke(); ctx.strokeStyle=rgba('#E8833A',0.4); for(let x=-(sc%480);x<W+480;x+=480){ ctx.beginPath(); ctx.moveTo(x,806); ctx.lineTo(x-30,900); ctx.stroke(); } renner(900-vG*t,800,400,t,{vooruit:true,hart:1,adem:0.8,puf:0.8,beat:t*12,breath:t*7}); pill(ctx,960,150,'je spieren werken nooit alleen: je hele lichaam doet mee',C.goud,ramp(t,q.at('hele'),0.5),32); });
},
// ---- eindkaart: probeer het zelf (speelt 12 s) ----
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'zet op de trap: cel · weefsel · orgaan · orgaanstelsel · organisme',120,260,C.grain,'left',26);
  const P=[['Mens','rode bloedcel · bloed · hart · bloedvatenstelsel · jij'],['Plant','bladmoescel · bladmoes · blad · wortelstelsel · slaplant'],['Celbouwer en microscoop','Bekijk in de virtuele microscoop het uienvlies: één weefsel, allemaal dezelfde cellen.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(32); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,450,480,42); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Welke van de vijf is een weefsel? En waarom is een bot een orgaan en geen weefsel?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
