// ===== Van cel tot lichaam — scènes (kerndoelen onderbouw, film 2) =====
// Hulpjes uit film 1 staan hierboven (helpers1.js). Nieuwe tekeningen: gymzaal, spiercel, weefseltegels, kuitspier, bot, lichaam met tien stelsels, slaplant met organen, bladdoorsnede, gespecialiseerde cellen, trap.

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
// gymzaal: vloer, lijnen, rennend poppetje
function runner(x,y,h,t,a=1,color=C.mens){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.fillStyle=color; ctx.strokeStyle=color; ctx.lineCap='round'; const u=h/8, ph=t*9;
  const by=y-h+u*2.2+Math.abs(Math.sin(ph))*u*0.15;
  ctx.beginPath(); ctx.arc(x+u*0.2,by-u*1.1,u*0.9,0,6.283); ctx.fill();
  ctx.save(); ctx.translate(x,by); ctx.rotate(0.18); roundRect(ctx,-u*1.3,0,u*2.6,u*3.4,u*0.8); ctx.fill(); ctx.restore();
  ctx.lineWidth=u*0.8; [[1,0],[-1,Math.PI]].forEach(([d,o])=>{ const sw=Math.sin(ph+o); const kx=x+sw*u*1.4, ky=by+u*3.2+u*1.6; const fx=kx+Math.max(0,sw)*u*0.6+u*0.3, fy=by+u*6.6-Math.max(0,-sw)*u*1.2; ctx.beginPath(); ctx.moveTo(x+u*0.2,by+u*3.2); ctx.lineTo(kx,ky); ctx.lineTo(fx,fy); ctx.stroke(); });
  ctx.lineWidth=u*0.6; [[1,Math.PI],[-1,0]].forEach(([d,o])=>{ const sw=Math.sin(ph+o); ctx.beginPath(); ctx.moveTo(x+u*0.3,by+u*0.8); ctx.lineTo(x+u*0.3+sw*u*1.4,by+u*2.2); ctx.lineTo(x+u*0.3+sw*u*1.6+u*0.8,by+u*1.6); ctx.stroke(); });
  ctx.restore(); }
function gymHall(t){ bg(ctx,'schema'); const fy=800;
  ctx.fillStyle='#22324D'; ctx.fillRect(0,fy,W,H-fy); ctx.strokeStyle=rgba(C.goud,0.35); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,fy); ctx.lineTo(W,fy); ctx.stroke();
  ctx.strokeStyle=rgba(C.text,0.12); ctx.lineWidth=2; for(let x=200;x<W;x+=380){ ctx.beginPath(); ctx.moveTo(x,fy+10); ctx.lineTo(x,H-10); ctx.stroke(); }
  // wandrek links, basket rechts
  ctx.strokeStyle=rgba(C.line,0.45); ctx.lineWidth=3; for(let k=0;k<7;k++){ ctx.beginPath(); ctx.moveTo(90,230+k*70); ctx.lineTo(290,230+k*70); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(90,200); ctx.lineTo(90,fy); ctx.moveTo(290,200); ctx.lineTo(290,fy); ctx.stroke();
  ctx.beginPath(); ctx.rect(1700,300,140,100); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1740,410,40,10,0,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1840,300); ctx.lineTo(1840,fy); ctx.stroke();
  return fy; }
function heart(x,y,s,a=1,beat=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); const k=1+0.12*Math.max(0,Math.sin(beat)); ctx.scale(s*k,s*k); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.25),2); ctx.restore(); }
function lungs(x,y,s,a=1,breath=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const k=1+0.08*Math.max(0,Math.sin(breath)); [[-1,0],[1,0]].forEach(([d])=>{ ctx.beginPath(); ctx.ellipse(x+d*40*s,y,30*s*k,52*s*k,0,0,6.283); shape(ctx,rgba(C.teal,0.55),lighten(C.teal,0.2),2); }); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y-80*s); ctx.lineTo(x,y-20*s); ctx.stroke(); ctx.restore(); }
function kidney(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,14*s,24*s,0,0,6.283); shape(ctx,'#9A4A4A','#C47070',1.5); ctx.restore(); }
// lichaam-schema: silhouet + organen per stelsel; o = {zenuw, spijs, adem, bloed, uitsch, skelet, spier, afweer, hormoon, voortpl, hl:'naam', t, labels}
const BODY={cx:960,yb:920,h:760};
function bodyOrgans(o={}){ const {cx,yb,h}=BODY, u=h/8, top=yb-h, t=o.t||0; const A=k=>o[k]===undefined?0:o[k];
  ctx.save(); ctx.globalAlpha*=(o.sil===undefined?0.3:o.sil); human(ctx,cx,yb,h,1,C.mens); ctx.restore();
  const hl=n=>o.hl===n?1:0;
  // skelet: wervelkolom, ribben, benen
  alpha(ctx,A('skelet'),()=>{ ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx,top+u*1.9); ctx.lineTo(cx,top+u*5.5); ctx.stroke(); ctx.lineWidth=2.5; for(let k=0;k<5;k++){ const y=top+u*2.5+k*u*0.35; ctx.beginPath(); ctx.moveTo(cx-10,y); ctx.quadraticCurveTo(cx-70,y+6,cx-95,y+22); ctx.moveTo(cx+10,y); ctx.quadraticCurveTo(cx+70,y+6,cx+95,y+22); ctx.stroke(); }
    bone(cx-u*0.7,top+u*6.6,u*1.9,Math.PI/2,1,0.55); bone(cx+u*0.7,top+u*6.6,u*1.9,Math.PI/2,1,0.55); });
  // spieren: op de benen en bovenarmen
  alpha(ctx,A('spier'),()=>{ [[cx-u*0.75,top+u*6.5,0],[cx+u*0.75,top+u*6.5,0],[cx-u*1.55,top+u*3.1,0.25],[cx+u*1.55,top+u*3.1,-0.25]].forEach(([x,y,r])=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0,0,22,u*0.75,0,0,6.283); shape(ctx,rgba(C.koraal,0.55),lighten(C.koraal,0.2),2); ctx.restore(); }); });
  // spijsvertering: mond, slokdarm, maag, darm
  alpha(ctx,A('spijs'),()=>{ ctx.strokeStyle=C.oker; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx+6,top+u*1.3); ctx.lineTo(cx+10,top+u*4.0); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx+20,top+u*4.3,48,34,-0.3,0,6.283); shape(ctx,C.oker,lighten(C.oker,0.25),2);
    ctx.strokeStyle=C.okerD; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(cx-60,top+u*4.9); ctx.quadraticCurveTo(cx+60,top+u*4.9,cx+50,top+u*5.2); ctx.quadraticCurveTo(cx-70,top+u*5.2,cx-50,top+u*5.5); ctx.stroke();
    ctx.strokeStyle=lighten(C.okerD,0.15); ctx.lineWidth=12; ctx.beginPath(); ctx.moveTo(cx-85,top+u*5.5); ctx.lineTo(cx-85,top+u*4.75); ctx.lineTo(cx+90,top+u*4.75); ctx.lineTo(cx+90,top+u*5.6); ctx.stroke(); });
  // ademhaling: neus/luchtpijp + longen
  alpha(ctx,A('adem'),()=>{ lungs(cx-10,top+u*3.1,1.25,1,o.breath||0); });
  // bloedvaten: hart + vaten
  alpha(ctx,A('bloed'),()=>{ ctx.strokeStyle=rgba('#C47070',0.8); ctx.lineWidth=3; [[cx-30,top+u*2.9,cx-u*1.6,top+u*4.4],[cx-30,top+u*2.9,cx+u*1.6,top+u*4.4],[cx-30,top+u*2.9,cx-u*0.7,top+u*7.6],[cx-30,top+u*2.9,cx+u*0.7,top+u*7.6],[cx-30,top+u*2.9,cx,top+u*0.6]].forEach(([a,b,c,d])=>{ ctx.beginPath(); ctx.moveTo(a,b); ctx.quadraticCurveTo((a+c)/2-20,(b+d)/2,c,d); ctx.stroke(); }); heart(cx-30,top+u*2.95,1.1,1,o.beat||0); });
  // zenuwstelsel: hersenen + zenuwen
  alpha(ctx,A('zenuw'),()=>{ ctx.strokeStyle=C.paars; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,top+u*1.6); ctx.lineTo(cx,top+u*5.4); ctx.moveTo(cx,top+u*2.4); ctx.lineTo(cx-u*1.6,top+u*4.6); ctx.moveTo(cx,top+u*2.4); ctx.lineTo(cx+u*1.6,top+u*4.6); ctx.moveTo(cx,top+u*5.4); ctx.lineTo(cx-u*0.7,top+u*7.7); ctx.moveTo(cx,top+u*5.4); ctx.lineTo(cx+u*0.7,top+u*7.7); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,top+u*0.5,u*0.55,u*0.3,0,0,6.283); shape(ctx,rgba(C.paars,0.65),lighten(C.paars,0.3),1.5); });
  // uitscheiding: nieren + blaas
  alpha(ctx,A('uitsch'),()=>{ kidney(cx-60,top+u*4.55,1); kidney(cx+90,top+u*4.55,1); ctx.strokeStyle='#C47070'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-55,top+u*4.8); ctx.lineTo(cx+5,top+u*5.75); ctx.moveTo(cx+85,top+u*4.8); ctx.lineTo(cx+25,top+u*5.75); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx+15,top+u*5.85,26,18,0,0,6.283); shape(ctx,rgba(C.teal,0.5),lighten(C.teal,0.2),1.5); });
  // afweer: lymfeklieren
  alpha(ctx,A('afweer'),()=>{ [[cx-40,top+u*1.5],[cx+40,top+u*1.5],[cx-u*1.35,top+u*2.5],[cx+u*1.35,top+u*2.5],[cx-u*0.5,top+u*5.9],[cx+u*0.6,top+u*5.9]].forEach(([x,y])=>dot(ctx,x,y,7,C.groen,lighten(C.groen,0.3),1.5)); });
  // hormoon: hypofyse, schildklier, bijnieren
  alpha(ctx,A('hormoon'),()=>{ dot(ctx,cx,top+u*0.85,8,C.goud,lighten(C.goud,0.3),1.5); ctx.beginPath(); ctx.ellipse(cx-10,top+u*1.65,18,9,0,0,6.283); ctx.ellipse(cx+10,top+u*1.65,18,9,0,0,6.283); shape(ctx,rgba(C.goud,0.7),lighten(C.goud,0.3),1.5); dot(ctx,cx-60,top+u*4.2,7,C.goud,lighten(C.goud,0.3),1.5); dot(ctx,cx+90,top+u*4.2,7,C.goud,lighten(C.goud,0.3),1.5); });
  // voortplanting
  alpha(ctx,A('voortpl'),()=>{ ctx.beginPath(); ctx.ellipse(cx+10,top+u*5.45,30,22,0,0,6.283); shape(ctx,rgba(C.koraal,0.4),lighten(C.koraal,0.2),1.5); dot(ctx,cx-30,top+u*5.4,7,C.koraal); dot(ctx,cx+50,top+u*5.4,7,C.koraal); });
}
const SYS={ // naam, sleutel, aanwijspunt (relatief in u), labelpositie, taak
  spijs:['spijsverteringsstelsel',0.3,4.3,1400,470,'eten klein maken, opnemen'],
  adem:['ademhalingsstelsel',-0.9,3.1,440,330,'zuurstof erin, koolstofdioxide eruit'],
  bloed:['bloedvatenstelsel',-0.3,2.95,440,210,'alles rondbrengen'],
  zenuw:['zenuwstelsel',0,0.5,1400,120,'signalen doorgeven'],
  skelet:['skelet',0.7,6.6,1400,760,'stevigheid en bescherming'],
  spier:['spierstelsel',-1.55,3.1,440,600,'bewegen'],
  uitsch:['uitscheidingsstelsel',0.95,4.55,1400,600,'afval uit je bloed'],
  afweer:['afweersysteem',1.35,2.5,1400,300,'tegen ziekteverwekkers'],
  hormoon:['hormoonstelsel',0,0.85,440,110,'regelen met stoffen in je bloed'],
  voortpl:['voortplantingsstelsel',0.1,5.45,440,760,'nieuw leven'],
};
function sysLabel(k,a,meta=true){ const s=SYS[k]; if(a<=0.01) return; const u=BODY.h/8, top=BODY.yb-BODY.h; label(ctx,s[0],meta?s[5]:'',BODY.cx+s[1]*u,top+s[2]*u,s[3],s[4],a); }
// kuitspier als orgaan (doorsnede-achtig, vlak)
function calf(x,y,s,a=1,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  ctx.beginPath(); ctx.ellipse(0,0,120,250,0,0,6.283); shape(ctx,rgba(C.koraal,0.5),lighten(C.koraal,0.2),2);
  ctx.strokeStyle=rgba(C.koraal,0.7); ctx.lineWidth=1.5; for(let k=-4;k<=4;k++){ ctx.beginPath(); ctx.moveTo(k*22,-230+Math.abs(k)*12); ctx.lineTo(k*22,230-Math.abs(k)*12); ctx.stroke(); }
  if(o.zenuw){ ctx.save(); ctx.globalAlpha*=o.zenuw; ctx.strokeStyle=C.paars; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-20,-250); ctx.quadraticCurveTo(20,-60,-10,200); ctx.stroke(); [[-80,-60],[60,0],[-70,80],[50,120]].forEach(([dx,dy])=>{ ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,dy-60); ctx.quadraticCurveTo(dx*0.5,dy-20,dx,dy); ctx.stroke(); }); ctx.restore(); }
  if(o.vat){ ctx.save(); ctx.globalAlpha*=o.vat; ctx.strokeStyle='#C47070'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(30,-250); ctx.quadraticCurveTo(-30,0,20,230); ctx.stroke(); ctx.strokeStyle=C.teal; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(50,-245); ctx.quadraticCurveTo(0,20,40,225); ctx.stroke(); ctx.restore(); }
  if(o.bind){ ctx.save(); ctx.globalAlpha*=o.bind; ctx.beginPath(); ctx.ellipse(0,0,134,262,0,0,6.283); ctx.strokeStyle=C.grain; ctx.lineWidth=10; ctx.stroke(); ctx.restore(); }
  if(o.pees){ ctx.save(); ctx.globalAlpha*=o.pees; ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,-250); ctx.lineTo(0,-320); ctx.moveTo(0,250); ctx.lineTo(0,330); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
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
  alpha(ctx,al[3],()=>{ ctx.save(); ctx.globalAlpha*=0.35; human(ctx,1275,420,300,1,C.mens); ctx.restore(); heart(1268,262,0.5,1,t*5); ctx.strokeStyle='#C47070'; ctx.lineWidth=3; ctx.lineCap='round'; [[1268,282,1250,400],[1268,282,1290,400],[1268,244,1268,160],[1262,250,1232,300],[1274,250,1304,300]].forEach(([a,b,c,d])=>{ ctx.beginPath(); ctx.moveTo(a,b); ctx.quadraticCurveTo((a+c)/2+6,(b+d)/2,c,d); ctx.stroke(); }); });
  alpha(ctx,al[4],()=>human(ctx,1600,300,300,1,C.mens)); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: gymles ----
s01(ctx,t,q){ const fy=gymHall(t); const tH=q.at('hart'), tA=q.at('ademt'), tW=q.at('Waarom');
  const run=ramp(t,q.at('sprint')-0.2,0.5); const x=lerp(420,1300,clamp((t-q.at('sprint'))/Math.max(1,tW-q.at('sprint')),0,1)*0.95);
  runner(x,fy,420,run?t:0,1);
  // beenspieren oplichten
  const lg=fadeIO(t,q.at('beenspieren'),tH,0.4); if(lg>0.01){ ctx.save(); ctx.globalAlpha*=lg; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(x+40,fy-150,110,170,0,0,6.283); ctx.stroke(); ctx.restore(); }
  label(ctx,'beenspieren','werken hard',x+40,fy-250,x-300,fy-520,lg,C.goud);
  const hb=ramp(t,tH,0.4); heart(x+70,fy-320,1.3,hb,t*12); label(ctx,'hart','bonkt',x+95,fy-330,x+340,fy-560,fadeIO(t,tH,tW+1,0.4),C.koraal);
  const br=ramp(t,tA,0.4); if(br>0.01) for(let i=0;i<3;i++){ const u=((t*0.9+i/3)%1); alpha(ctx,br*(1-u),()=>dot(ctx,x+110+u*80,fy-380-u*40-i*10,8+u*10,rgba(C.teal,0.7))); }
  label(ctx,'ademt sneller','',x+150,fy-400,x+340,fy-460,fadeIO(t,tA,tW+1,0.4),C.teal);
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
  if(a1>0.01) alpha(ctx,a1,()=>{ human(ctx,520,800,560,1,C.mens); pill(ctx,520,150,'≈ 30 000 miljard cellen',C.goud,ramp(t,q.at('dertigduizend'),0.5),34);
    // hoop cellen → geordend
    const ord=ramp(t,q.at('geordend'),1.2); for(let i=0;i<48;i++){ const hx=1100+hash(i*2.1)*600, hy=300+hash(i*3.7)*460; const gx=1000+(i%8)*95, gy=330+Math.floor(i/8)*80; ctx.beginPath(); ctx.ellipse(lerp(hx,gx,ord),lerp(hy,gy,ord),26,20,0,0,6.283); shape(ctx,rgba(C.koraal,0.3),lighten(C.koraal,0.2),1.5); dot(ctx,lerp(hx,gx,ord),lerp(hy,gy,ord),6,C.kern); }
    metaText(ctx,'niet zomaar op een hoop',1340,260,C.grain,'center',26*clamp(1-ord,0.01,1)); metaText(ctx,'geordend, in stappen',1340,260,C.goud,'center',26*clamp(ord,0.01,1)); });
  const a2=ramp(t,tK-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'micro');
    const one=1-ramp(t,tM-0.2,0.8); const sq=fadeIO(t,q.at('korter'),q.at('bijna'),0.4); const len=600*(1-0.18*Math.max(0,Math.sin((t-q.at('korter'))*3))*sq);
    alpha(ctx,one,()=>{ muscleCell(960,470,len,1,40); label(ctx,'spiercel','lang en dun',960,430,1340,220,ramp(t,q.at('spiercel'),0.5)); pill(ctx,960,720,'kan korter worden',C.koraal,fadeIO(t,q.at('korter'),q.at('bijna'),0.4),30); pill(ctx,960,150,'één spiercel kan bijna niets',C.text,fadeIO(t,q.at('bijna'),tM,0.4),30); });
    const many=ramp(t,tM-0.2,0.8); if(many>0.01) alpha(ctx,many,()=>{ for(let r=0;r<9;r++) for(let c=0;c<3;c++){ muscleCell(430+c*520+(r%2?30:0),200+r*62,500,1,24); }
      const pr=ramp(t,q.at('kracht'),0.5); arrow(ctx,300,470,120,470,C.goud,6,20,pr); arrow(ctx,1620,470,1800,470,C.goud,6,20,pr);
      pill(ctx,960,820,'miljoenen spiercellen naast elkaar: samen kracht zetten',C.goud,pr,30);
      const wf=ramp(t,tG,0.5); haak(ctx,120,1800,760,'',C.goud,0); label(ctx,'spierweefsel','dezelfde cellen, dezelfde taak',1400,690,1500,820,ramp(t,q.at('spierweefsel'),0.5),C.goud);
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
  if(a1>0.01) alpha(ctx,a1,()=>{ const zo=ramp(t,0.2,1.2); human(ctx,420,860,620,1,C.mens);
    ctx.save(); ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(468,790,26,56,0,0,6.283); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(494,740); ctx.lineTo(1050,220); ctx.moveTo(494,840); ctx.lineTo(1050,720); ctx.stroke(); ctx.restore();
    calf(1180,470,1.0,zo,{zenuw:ramp(t,q.at('zenuwweefsel'),0.5),vat:ramp(t,q.at('bloedvaten'),0.5),bind:ramp(t,q.at('bindweefsel'),0.5),pees:0.0});
    label(ctx,'kuitspier','',1180,230,1500,160,ramp(t,q.at('kuitspier'),0.5));
    label(ctx,'spierweefsel','',1130,560,1500,330,ramp(t,q.at('spierweefsel'),0.4),C.koraal);
    label(ctx,'zenuwweefsel','geeft het signaal',1160,300,1500,440,ramp(t,q.at('zenuwweefsel'),0.4),C.paars);
    label(ctx,'bloedvaten','',1210,620,1500,560,ramp(t,q.at('bloedvaten'),0.4),C.teal);
    label(ctx,'bindweefsel','eromheen',1310,400,1500,680,ramp(t,q.at('bindweefsel'),0.4),C.grain);
    pill(ctx,960,100,'orgaan = verschillende weefsels samen, met een eigen taak',C.goud,ramp(t,tO,0.5),30);
    const tk=ramp(t,q.at('taak'),0.5); pill(ctx,420,150,'taak: korter worden',C.koraal,tk,30); });
  const a2=ramp(t,tH-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ const O=[['hart',q.at('hart'),400,380,()=>heart(400,380,2.6,1,t*6)],['long',q.at('long'),700,380,()=>lungs(700,390,2.2,1,t*3)],['maag',q.at('maag'),1000,380,()=>{ ctx.beginPath(); ctx.ellipse(1000,380,72,52,-0.3,0,6.283); shape(ctx,C.oker,lighten(C.oker,0.25),2); }],['huid',q.at('huid'),1300,380,()=>{ roundRect(ctx,1230,330,150,110,10); shape(ctx,'#C9A27E','#E0BE9C',2); roundRect(ctx,1230,330,150,26,8); shape(ctx,'#E0BE9C','#F0D6B8',1.5); }],['bot',tB,1600,380,()=>bone(1600,380,200,0,1,1.2)]];
    const bq=ramp(t,q.at('hard'),0.6);
    alpha(ctx,1-bq,()=>{ O.forEach(([n,tt,x,y,fn])=>{ const a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ fn(); text(ctx,n,x,560,fTekst(36,600),C.text,'center'); }); });
      metaText(ctx,'allemaal organen',960,180,C.grain,'center',28*clamp(ramp(t,tH,0.5),0.01,1)); });
    if(bq>0.01) alpha(ctx,bq,()=>{ bone(960,470,560,0,1,2.2); pill(ctx,960,720,'zit daar nog leven in?',C.goud,ramp(t,q.at('leven'),0.5),36); }); });
},
// ---- H2: bot leeft; orgaanstelsels: spijsvertering, ademhaling, bloedvaten; bloed vraag ----
s08(ctx,t,q){ bg(ctx,'schema'); const tOrg=q.at('Organen'), tBl=q.at('stroomt');
  const a1=1-ramp(t,tOrg-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ bone(960,470,560,0,1,2.2); boneCells(960,470,560,ramp(t,q.at('botcellen'),0.6));
    label(ctx,'botcellen','maken het harde spul, en zitten er nog in',900,470,1400,250,ramp(t,q.at('botcellen'),0.5),C.kern);
    const br=fadeIO(t,q.at('gebroken'),tOrg,0.5); if(br>0.01){ const heal=ramp(t,q.at('gebroken')+1.2,1.5); alpha(ctx,br*(1-heal),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(1000,440); ctx.lineTo(980,470); ctx.lineTo(1010,500); ctx.stroke(); }); pill(ctx,960,720,heal>0.5?'groeit weer aan elkaar':'gebroken',heal>0.5?C.groen:C.koraal,br,30); }
    pill(ctx,960,150,'een bot leeft',C.groen,ramp(t,q.at('leeft'),0.5),36); });
  const a2=ramp(t,tOrg-0.3,0.6)*(1-ramp(t,tBl-0.2,0.6)*0.85);
  if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('mond'),0.6),adem:ramp(t,q.at('neus'),0.6),bloed:ramp(t,q.at('hart'),0.6),t,beat:t*5,breath:t*2.5});
    pill(ctx,960,100,'orgaanstelsel = organen die samenwerken, met één grote taak',C.goud,fadeIO(t,q.at('orgaanstelsel'),q.at('mond'),0.4),30);
    sysLabel('spijs',ramp(t,q.at('spijsverteringsstelsel'),0.5)); sysLabel('adem',ramp(t,q.at('ademhalingsstelsel'),0.5)); sysLabel('bloed',ramp(t,q.at('bloedvatenstelsel'),0.5));
    metaText(ctx,'mond · slokdarm · maag · darmen',1480,540,C.grain,'left',24*clamp(fadeIO(t,q.at('mond'),q.at('spijsverteringsstelsel'),0.3),0.01,1));
    metaText(ctx,'neus · luchtpijp · longen',440,400,C.grain,'left',24*clamp(fadeIO(t,q.at('neus'),q.at('ademhalingsstelsel'),0.3),0.01,1)); });
  const a3=ramp(t,tBl-0.2,0.6); if(a3>0.01) alpha(ctx,a3,()=>{ bg(ctx,'micro'); vessel(960,80,320,760,t); pill(ctx,960,870-20,'is bloed ook een weefsel?',C.goud,ramp(t,q.at('weefsel'),0.5),36); });
},
// ---- H2: bloed = weefsel; de rest van de stelsels; tien ----
s10(ctx,t,q){ bg(ctx,'micro'); const tV=q.at('Verder');
  const a1=1-ramp(t,tV-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ vessel(960,80,320,760,t); label(ctx,'bloed','vol cellen met dezelfde taak: vervoeren',1180,400,1400,250,ramp(t,q.at('cellen'),0.5)); pill(ctx,960,870-20,'ook een weefsel, alleen zwemmen de cellen in vocht',C.goud,ramp(t,q.at('vocht'),0.5),30); });
  const a2=ramp(t,tV-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'schema');
    const K=[['zenuw','zenuwstelsel'],['skelet','skelet'],['spier','spierstelsel'],['uitsch','uitscheidingsstelsel'],['afweer','afweersysteem'],['hormoon','hormoonstelsel'],['voortpl','voortplantingsstelsel']];
    const o={sil:0.3,spijs:0.4,adem:0.4,bloed:0.4,t}; K.forEach(([k,w])=>o[k]=ramp(t,q.at(w),0.6)); bodyOrgans(o);
    K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
    const ten=ramp(t,q.at('Tien'),0.5); pill(ctx,960,100,'tien orgaanstelsels',C.goud,ten,34); alpha(ctx,ramp(t,q.at('film'),0.4),()=>metaText(ctx,'elk later in een eigen film',960,150,C.grain,'center',24)); });
},
// ---- H2: organisme; terug naar de gymles: stelsels werken samen ----
s11(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('gymles'), tS=q.at('werken');
  const a1=1-ramp(t,tG-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.5,adem:0.5,bloed:0.5,zenuw:0.5,skelet:0.5,uitsch:0.5,afweer:0.5,hormoon:0.5,voortpl:0.5,t}); const org=ramp(t,q.at('organisme'),0.5); alpha(ctx,org,()=>{ ctx.save(); ctx.setLineDash([12,10]); ctx.beginPath(); ctx.ellipse(960,540,330,440,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }); label(ctx,'organisme','één levend wezen: jij',1290,540,1480,300,org,C.goud); });
  const a2=ramp(t,tG-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('darmen'),0.5),adem:ramp(t,q.at('longen'),0.5),bloed:ramp(t,q.at('bloed'),0.5),spier:1,t,beat:t*9,breath:t*4});
    const {cx,yb,h}=BODY, u=h/8, top=yb-h;
    // mitochondriën in de beenspier (inset)
    inset(380,560,150,fadeIO(t,q.at('mitochondriën'),q.at('Daarom'),0.5),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(230,410,300,300); muscleCell(380,560,280,1,40); for(let i=0;i<6;i++) mitochondrion(ctx,300+i*32,545+(i%2)*30,30,0.1*i,1,3,t); });
    metaText(ctx,'spiercel: verbrandt voedingsstoffen met zuurstof',380,740,C.grain,'center',22*clamp(fadeIO(t,q.at('verbranden'),q.at('Daarom'),0.4),0.01,1));
    // stromen: zuurstof longen → bloed → spier; voedingsstoffen darmen → bloed → spier
    const zs=fadeIO(t,q.at('zuurstof',2),tS,0.5), vs=fadeIO(t,q.at('voedingsstoffen',2),tS,0.5);
    for(let i=0;i<7;i++){ const w=((t*0.3+i/7)%1); alpha(ctx,zs,()=>dot(ctx,lerp(cx-60,cx-u*0.75,w),lerp(top+u*3.1,top+u*6.5,w)+Math.sin(w*9)*14,8,C.teal)); alpha(ctx,vs,()=>dot(ctx,lerp(cx+30,cx+u*0.75,w),lerp(top+u*5.0,top+u*6.5,w)+Math.sin(w*9)*14,8,C.oker)); }
    label(ctx,'zuurstof','uit je longen',cx-90,top+u*3.0,440,330,zs,C.teal); label(ctx,'voedingsstoffen','uit je darmen',cx+60,top+u*5.0,1470,560,vs,C.oker); label(ctx,'bloed','naar de spiercellen',cx-30,top+u*2.9,1470,300,fadeIO(t,q.at('bloed'),tS,0.5),C.koraal);
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
  label(ctx,'bladeren','vangen licht',855,560,1250,380,ramp(t,q.at('vangen'),0.5),C.groen);
  label(ctx,'bloem','zorgt voor zaden',754,210,1250,200,ramp(t,q.at('zorgt'),0.5),C.goud);
  alpha(ctx,ramp(t,q.at('Alle'),0.5),()=>{ ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.ellipse(760,870,240,160,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); });
  pill(ctx,760,100,'wortelstelsel: een orgaanstelsel van de plant',C.goud,ramp(t,q.at('wortelstelsel'),0.5),30);
},
// ---- H3: één blad: opperhuid, bladmoes, vaatbundels ----
s15(ctx,t,q){ bg(ctx,'micro'); const tO=q.at('opperhuid'), tM=q.at('bladmoes'), tVb=q.at('vaatbundels'), tB=q.at('dus');
  const hl = t>=tB?null: t>=tVb?'vaat': t>=tM?'moes': t>=tO?'opper':null;
  const intro=1-ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,intro,()=>{ bg(ctx,'macro'); groundLine(700); slaPlant(560,700,0.9,{}); zoomCircle(ctx,1300,420,280,655,560,'één blad, doorgesneden',ramp(t,q.at('zoomen'),0.6),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1000,120,600,600); leafCross(1300,420,560,{}); }); });
  const main=ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,main,()=>{ bg(ctx,'micro'); leafCross(960,470,1100,{opper:ramp(t,tO-0.5,0.5),moes:ramp(t,tM-0.5,0.5),vaat:ramp(t,tVb-0.5,0.5),hl});
    label(ctx,'opperhuid','een laag platte cellen: beschermt',700,312,200,180,ramp(t,tO,0.5),'#C9D6E6','left');
    label(ctx,'bladmoes','vol bladgroenkorrels: maakt voedsel',700,440,200,790,ramp(t,tM,0.5),C.groen,'left');
    label(ctx,'vaatbundel','in de nerf: vervoert water en voedsel',1020,480,1240,790,ramp(t,tVb,0.5),C.oker,'left');
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
  const gym=ramp(t,q.at('gymles'),0.5); alpha(ctx,gym,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.75); ctx.fillRect(0,0,W,H); runner(880,800,420,t,1); heart(950,480,1.3,1,t*12); pill(ctx,960,150,'je spieren werken nooit alleen: je hele lichaam doet mee',C.goud,ramp(t,q.at('hele'),0.5),32); });
},
// ---- eindkaart: probeer het zelf (speelt 12 s) ----
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'zet op de trap: cel · weefsel · orgaan · orgaanstelsel · organisme',120,260,C.grain,'left',26);
  const P=[['Mens','rode bloedcel · bloed · hart · bloedvatenstelsel · jij'],['Plant','bladmoescel · bladmoes · blad · wortelstelsel · slaplant'],['Celbouwer en microscoop','Bekijk in de virtuele microscoop het uienvlies: één weefsel, allemaal dezelfde cellen.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(32); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,450,480,42); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Welke van de vijf is een weefsel? En waarom is een bot een orgaan en geen weefsel?',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
