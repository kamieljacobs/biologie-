// ===== Wie eet wie — scènes (kerndoelen onderbouw, 33C film 3) =====
// Macro-nacht: een Nederlands bos met wolf, ree, edelhert, wild zwijn, muis, vos, uil, raaf. Schema: voedselketen en voedselweb (pijl van voedsel naar eter), kringloop.
// Kleuren: planten = groen, dieren = oker/bruin/grijs (wolf, raaf grijs), reducenten = teal, focus = goud, mineralen = oker stipjes.

function bacterie(x,y,s=1,soort='staaf',a=1,rot=0,kleur=C.teal){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); if(soort==='staaf'){ roundRect(ctx,-26*s,-10*s,52*s,20*s,10*s); } else { ctx.beginPath(); ctx.arc(-11*s,0,11*s,0,6.283); ctx.arc(11*s,0,11*s,0,6.283); } shape(ctx,rgba(kleur,0.45),lighten(kleur,0.35),1.8); ctx.restore(); }); }
function meta3(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
// ---- bos ----
function bos(t=0,o={}){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H);
  for(let i=0;i<25;i++) dot(ctx,hash(i*3.1)*W,30+hash(i*5.3)*200,1.2+hash(i)*1.2,rgba('#F2F2EE',0.35));
  ctx.fillStyle=C.bgMacroHill; leafPath(treeLine(0,W,520,120,90,70,4)); ctx.fill();
  ctx.fillStyle='#2A4232'; leafPath(treeLine(0,W,600,90,60,90,9)); ctx.fill();
  ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,720,W,H-720);
  ctx.fillStyle='#4A5A3E'; ctx.beginPath(); ctx.moveTo(0,720); ctx.quadraticCurveTo(960,690,1920,720); ctx.lineTo(1920,740); ctx.lineTo(0,740); ctx.closePath(); ctx.fill();
  // grote bomen (stammen + kruinen)
  const B=o.bomen||[[160,1.3],[560,1.1],[1380,1.2],[1780,1.35]];
  B.forEach(([x,s],i)=>{ ctx.fillStyle='#5A4232'; ctx.fillRect(x-16*s,400,32*s,330); [[0,-60,110],[-70,-10,80],[70,-20,85]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,380+dy*s,r*s,0,6.283); shape(ctx,'#3F6E4C','#5A8A66',1.5); }); });
  // jonge boompjes: aantal via o.jong (0..1)
  const J=o.jong==null?1:o.jong; for(let i=0;i<10;i++){ const x=300+i*140+hash(i*7)*60, h=40+hash(i*3)*40; const k=clamp(J*1.6-hash(i*11)*0.8,0,1); jongBoompje(x,760+hash(i)*30,h,k); }
}
function jongBoompje(x,y,h,k){ if(k<=0.01){ ctx.strokeStyle='#6E5238'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-h*0.25); ctx.stroke(); return; }
  ctx.strokeStyle='#6E5238'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-h); ctx.stroke();
  for(let j=0;j<3;j++){ ctx.beginPath(); ctx.ellipse(x+(j-1)*10,y-h+8+j*6,12*k,7*k,(j-1)*0.6,0,6.283); shape(ctx,G2,V1,1); } }
function kruid(x,y,s=1){ ctx.strokeStyle=G1; ctx.lineWidth=2; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+k*8*s,y-20*s,x+k*12*s,y-34*s); ctx.stroke(); dot(ctx,x+k*12*s,y-34*s,4*s,G3); } }
// ---- dieren (zijaanzicht, egale vlakken, stip als oog) ----
function viervoeter(x,y,s,t,o){ // generiek lijf: o = {lijf:[rx,ry], kleur, poot:[h,w], kop:fn, staart:fn, loop, dir, a}
  const a=o.a==null?1:o.a; if(a<=0.01) return; const kl=o.kleur, kr=lighten(kl,0.3), dir=o.dir||1, loop=o.loop||0;
  alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); const sw=Math.sin(t*7)*loop; const [rx,ry]=o.lijf, [ph,pw]=o.poot;
    [[-rx*0.65,sw],[-rx*0.4,-sw],[rx*0.45,-sw],[rx*0.7,sw]].forEach(([px,p])=>{ ctx.save(); ctx.translate(px,-ph); ctx.rotate(p*0.3); roundRect(ctx,-pw/2,0,pw,ph,pw/2); shape(ctx,kl,kr,1.2); ctx.restore(); });
    ctx.beginPath(); ctx.ellipse(0,-ph-ry*0.7,rx,ry,0,0,6.283); shape(ctx,kl,kr,1.5);
    if(o.buik){ ctx.beginPath(); ctx.ellipse(0,-ph-ry*0.35,rx*0.7,ry*0.35,0,0,Math.PI); ctx.fillStyle=o.buik; ctx.fill(); }
    o.staart&&o.staart(kl,kr,rx,ry,ph); o.kop&&o.kop(kl,kr,rx,ry,ph); ctx.restore(); }); }
function wolf(x,y,s=1,t=0,o={}){ viervoeter(x,y,s,t,Object.assign({kleur:'#8C939E',lijf:[78,30],poot:[52,13],buik:'#B4BAC4',
  staart:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(-rx+6,-ph-ry); ctx.quadraticCurveTo(-rx-50,-ph-ry+10,-rx-60,-ph-ry+50); ctx.quadraticCurveTo(-rx-30,-ph-ry+30,-rx+10,-ph-ry*0.5); ctx.closePath(); shape(ctx,kl,kr,1.5); },
  kop:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(rx-14,-ph-ry*1.3); ctx.lineTo(rx+30,-ph-ry*2.0); ctx.lineTo(rx+76,-ph-ry*1.45); ctx.lineTo(rx+40,-ph-ry*0.8); ctx.closePath(); shape(ctx,kl,kr,1.5);
    ctx.beginPath(); ctx.moveTo(rx+20,-ph-ry*1.9); ctx.lineTo(rx+26,-ph-ry*2.7); ctx.lineTo(rx+40,-ph-ry*1.95); ctx.closePath(); shape(ctx,kl,kr,1.2); dot(ctx,rx+44,-ph-ry*1.7,3.5,'#2A2119'); dot(ctx,rx+76,-ph-ry*1.45,4,'#2A2119'); } },o)); }
function ree(x,y,s=1,t=0,o={}){ viervoeter(x,y,s,t,Object.assign({kleur:'#B08A5C',lijf:[62,26],poot:[64,9],buik:'#D0B08A',
  staart:(kl,kr,rx,ry,ph)=>{ dot(ctx,-rx+2,-ph-ry,9,'#F2F2EE'); },
  kop:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(rx-16,-ph-ry*1.1); ctx.lineTo(rx+6,-ph-ry*3.2); ctx.lineTo(rx+22,-ph-ry*3.0); ctx.lineTo(rx+8,-ph-ry*0.9); ctx.closePath(); shape(ctx,kl,kr,1.5);
    ctx.beginPath(); ctx.ellipse(rx+26,-ph-ry*3.1,24,13,0.35,0,6.283); shape(ctx,kl,kr,1.5); dot(ctx,rx+46,-ph-ry*2.95,4,'#2A2119'); dot(ctx,rx+24,-ph-ry*3.3,3,'#2A2119');
    ctx.beginPath(); ctx.ellipse(rx+6,-ph-ry*3.6,6,13,-0.4,0,6.283); shape(ctx,kl,kr,1.2); } },o)); }
function hert(x,y,s=1,t=0,o={}){ viervoeter(x,y,s,t,Object.assign({kleur:'#8C5A3A',lijf:[92,36],poot:[84,13],buik:'#B07A54',
  kop:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(rx-20,-ph-ry*1.1); ctx.lineTo(rx+8,-ph-ry*3.0); ctx.lineTo(rx+30,-ph-ry*2.8); ctx.lineTo(rx+10,-ph-ry*0.8); ctx.closePath(); shape(ctx,kl,kr,1.5);
    ctx.beginPath(); ctx.ellipse(rx+34,-ph-ry*2.9,30,16,0.35,0,6.283); shape(ctx,kl,kr,1.5); dot(ctx,rx+60,-ph-ry*2.75,4,'#2A2119'); dot(ctx,rx+32,-ph-ry*3.1,3.5,'#2A2119');
    ctx.strokeStyle='#D8C8A8'; ctx.lineWidth=5; ctx.lineCap='round'; const bx=rx+20, by=-ph-ry*3.3; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx-30,by-70); ctx.moveTo(bx-12,by-26); ctx.lineTo(bx+12,by-50); ctx.moveTo(bx-22,by-50); ctx.lineTo(bx-50,by-78); ctx.moveTo(bx-26,by-60); ctx.lineTo(bx-6,by-92); ctx.stroke(); } },o)); }
function zwijn(x,y,s=1,t=0,o={}){ viervoeter(x,y,s,t,Object.assign({kleur:'#5A4A3E',lijf:[70,34],poot:[30,13],
  kop:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(rx-20,-ph-ry*1.3); ctx.lineTo(rx+56,-ph-ry*0.6); ctx.lineTo(rx+56,-ph-ry*0.1); ctx.lineTo(rx-10,-ph-ry*0.1); ctx.closePath(); shape(ctx,kl,kr,1.5); dot(ctx,rx+18,-ph-ry*0.9,3.5,'#E8E2D4'); roundRect(ctx,rx+52,-ph-ry*0.65,8,22,3); ctx.fillStyle='#7A6656'; ctx.fill(); ctx.beginPath(); ctx.moveTo(rx-8,-ph-ry*1.4); ctx.lineTo(rx-2,-ph-ry*2.0); ctx.lineTo(rx+8,-ph-ry*1.3); ctx.closePath(); shape(ctx,kl,kr,1.2); } },o)); }
function vos3(x,y,s=1,t=0,o={}){ viervoeter(x,y,s,t,Object.assign({kleur:'#C8703A',lijf:[56,20],poot:[34,9],buik:'#E8C9A0',
  staart:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(-rx+4,-ph-ry); ctx.quadraticCurveTo(-rx-70,-ph-ry-10,-rx-80,-ph+10); ctx.quadraticCurveTo(-rx-40,-ph-ry*0.2,-rx+6,-ph-ry*0.4); ctx.closePath(); shape(ctx,kl,kr,1.5); dot(ctx,-rx-76,-ph+6,7,'#F2F2EE'); },
  kop:(kl,kr,rx,ry,ph)=>{ ctx.beginPath(); ctx.moveTo(rx-10,-ph-ry*1.4); ctx.lineTo(rx+22,-ph-ry*2.3); ctx.lineTo(rx+58,-ph-ry*1.6); ctx.lineTo(rx+26,-ph-ry*0.8); ctx.closePath(); shape(ctx,kl,kr,1.5); ctx.beginPath(); ctx.moveTo(rx+10,-ph-ry*2.1); ctx.lineTo(rx+16,-ph-ry*3.1); ctx.lineTo(rx+28,-ph-ry*2.2); ctx.closePath(); shape(ctx,kl,kr,1.2); dot(ctx,rx+32,-ph-ry*1.9,3,'#2A2119'); dot(ctx,rx+58,-ph-ry*1.6,3.5,'#2A2119'); } },o)); }
function muis(x,y,s=1,a=1,dir=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); ctx.beginPath(); ctx.ellipse(0,-12,24,13,0,0,6.283); shape(ctx,'#9A8A78','#BCAE9C',1.2); dot(ctx,14,-22,7,'#9A8A78','#BCAE9C',1); dot(ctx,26,-14,2.5,'#2A2119'); ctx.strokeStyle='#9A8A78'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-24,-10); ctx.quadraticCurveTo(-46,-2,-56,-16); ctx.stroke(); ctx.restore(); }); }
function uil(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.ellipse(0,-40,30,42,0,0,6.283); shape(ctx,'#A0845C','#C0A47C',1.5); ctx.beginPath(); ctx.ellipse(0,-58,24,20,0,0,6.283); shape(ctx,'#C0A47C','#D8C49C',1.2); dot(ctx,-9,-60,4,'#2A2119'); dot(ctx,9,-60,4,'#2A2119'); ctx.restore(); }); }
function raaf(x,y,s=1,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.beginPath(); ctx.ellipse(0,-24,34,16,-0.15,0,6.283); shape(ctx,'#3A3F4E','#5A6070',1.5); ctx.beginPath(); ctx.arc(30,-38,12,0,6.283); shape(ctx,'#3A3F4E','#5A6070',1.2); ctx.beginPath(); ctx.moveTo(40,-40); ctx.lineTo(58,-34); ctx.lineTo(40,-32); ctx.closePath(); ctx.fillStyle='#2A2F3E'; ctx.fill(); dot(ctx,32,-41,2.5,'#E8E2D4'); ctx.beginPath(); ctx.moveTo(-32,-22); ctx.lineTo(-56,-14); ctx.lineTo(-32,-14); ctx.closePath(); shape(ctx,'#3A3F4E','#5A6070',1.2); ctx.strokeStyle='#2A2F3E'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-4,-10); ctx.lineTo(-6,0); ctx.moveTo(8,-10); ctx.lineTo(8,0); ctx.stroke(); ctx.restore(); }); }
function aaskever(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,16*s,10*s,0,0,6.283); shape(ctx,'#2A2F3E','#5A6070',1.2); ctx.fillStyle=C.koraal; ctx.fillRect(x-8*s,y-4*s,6*s,8*s); ctx.fillRect(x+2*s,y-4*s,6*s,8*s); dot(ctx,x+16*s,y,5*s,'#2A2F3E'); }); }
function worm(x,y,s=1,a=1,t=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.strokeStyle='#C98A7A'; ctx.lineWidth=7*s; ctx.lineCap='round'; ctx.beginPath(); for(let i=0;i<=10;i++){ const px=x+i*6*s, py=y+Math.sin(i*0.9+t*3)*5*s; i?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); }); }
function pissebed3(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,20*s,11*s,0,0,6.283); shape(ctx,'#7E7A74','#A8A39A',1.2); ctx.strokeStyle='#A8A39A'; ctx.lineWidth=1; for(let k=-3;k<=3;k++){ ctx.beginPath(); ctx.moveTo(x+k*5*s,y-10*s); ctx.lineTo(x+k*5*s,y+10*s); ctx.stroke(); } }); }
function blad(x,y,r,s=1,kl='#C9A35C'){ ctx.save(); ctx.translate(x,y); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0,0,16*s,8*s,0,0,6.283); shape(ctx,kl,lighten(kl,0.3),1); ctx.strokeStyle=rgba('#2A2119',0.4); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(-14*s,0); ctx.lineTo(14*s,0); ctx.stroke(); ctx.restore(); }
function schimmel(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.strokeStyle=rgba(C.teal,0.8); ctx.lineWidth=1.5; for(let i=0;i<7;i++){ const an=-Math.PI*0.9+i*0.3; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+Math.cos(an)*30*s,y+Math.sin(an)*10*s+20*s,x+Math.cos(an)*60*s,y+30*s); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x-14*s,y); ctx.quadraticCurveTo(x,y-26*s,x+14*s,y); ctx.closePath(); shape(ctx,'#8FB8C8','#B8D8E4',1.2); ctx.fillStyle='#8FB8C8'; ctx.fillRect(x-3*s,y,6*s,14*s); }); }
// ---- schema: knooppunt met icoon ----
const ICOON={ plant:(x,y)=>{ kruid(x,y+30,1.3); }, ree:(x,y)=>ree(x-10,y+40,0.55,0,{}), wolf:(x,y)=>wolf(x-18,y+42,0.5,0,{}), hert:(x,y)=>hert(x-18,y+46,0.38,0,{}), zwijn:(x,y)=>zwijn(x-14,y+36,0.55,0,{}),
  muis:(x,y)=>muis(x,y+26,1.1), vos:(x,y)=>vos3(x-6,y+36,0.6,0,{}), uil:(x,y)=>uil(x,y+44,0.8), eikel:(x,y)=>{ ctx.beginPath(); ctx.ellipse(x,y+10,16,22,0,0,6.283); shape(ctx,'#B08A5C','#D0AA7C',1.2); ctx.beginPath(); ctx.ellipse(x,y-8,20,10,0,Math.PI,0); shape(ctx,'#8C6A4A','#B08A5C',1.2); },
  reducent:(x,y)=>{ schimmel(x-20,y+6,0.8); bacterie(x+26,y+8,0.8,'staaf',1,0.3); }, bodem:(x,y)=>{ for(let i=0;i<7;i++) dot(ctx,x-24+hash(i)*48,y-6+hash(i*3)*28,5,C.oker); }, dood:(x,y)=>{ blad(x-14,y+10,0.4,1.2,'#8C6A3A'); blad(x+14,y+4,-0.6,1.2,'#B08A5C'); } };
function knoop(x,y,naam,soort,a=1,kleur=C.line,dim=1){ if(a<=0.01) return; alpha(ctx,a*dim,()=>{ roundRect(ctx,x-100,y-70,200,140,16); shape(ctx,rgba(C.bgSchema,0.95),kleur,kleur===C.line?1:2); ctx.save(); ctx.beginPath(); roundRect(ctx,x-98,y-68,196,104,14); ctx.clip(); ICOON[soort]&&ICOON[soort](x,y-24); ctx.restore(); text(ctx,naam,x,y+58,fTekst(naam.length>12?28:32,600),C.text,'center'); }); }
function pijl(x1,y1,x2,y2,a=1,kl=C.line,lw=3){ if(a<=0.01) return; const ang=Math.atan2(y2-y1,x2-x1), d=Math.hypot(x2-x1,y2-y1); const u=clamp(a,0,1); arrow(ctx,x1+Math.cos(ang)*0,y1,x1+Math.cos(ang)*d*u,y1+Math.sin(ang)*d*u,kl,lw,14,1); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: Daan in het bos ----
s01(ctx,t,q){ const tB=q.at('bord'), tT=q.at('terug'), tS=q.at('Stel'), tWa=q.at('Wat'), tH=q.at('Hou');
  bos(t,{});
  // bord
  ctx.fillStyle='#6E5238'; ctx.fillRect(1236,560,12,170); roundRect(ctx,1120,470,250,110,10); shape(ctx,'#D8C8A0','#F2E6C8',2); text(ctx,'Hier leven',1245,515,fTekst(32,700),'#3A2E24','center'); text(ctx,'wolven',1245,555,fTekst(32,700),'#3A2E24','center');
  alpha(ctx,ramp(t,tB,0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; roundRect(ctx,1110,460,270,130,14); ctx.stroke(); });
  persoon(ctx,'daan',lerp(700,960,ramp(t,0,3)),800,330,{outfit:'school',pose:t>tB&&t<tS?'wijs':'staan',uit:t>tS?'denkt':'neutraal',kijk:1,t});
  const wa=ramp(t,tT,0.6)*(1-ramp(t,tS+0.5,0.6)); wolf(1650,760,0.95,t,{a:wa,dir:-1});
  alpha(ctx,ramp(t,tS+0.5,0.6),()=>{ ctx.save(); ctx.setLineDash([8,8]); ctx.strokeStyle=rgba(C.line,0.8); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(1640,700,120,80,0,0,6.283); ctx.stroke(); ctx.restore(); text(ctx,'?',1640,720,fTitel(90),C.goud,'center'); });
  pill(ctx,700,240,'wat gebeurt er met het bos?',C.goud,ramp(t,tWa,0.4),34); },
// ---- titel ----
s02(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Wie eet wie?',120,330,fTitel(96),C.text); text(ctx,'Wat gebeurt er als de wolf verdwijnt?',120,410,fTekst(44),C.text2); });
  wolf(1500,760,1.4,t,{a:ramp(t,0.5,0.6),dir:-1}); ree(1180,760,1.0,t,{a:ramp(t,0.9,0.6)}); kruid(980,760,1.6);
  metaText(ctx,'onderbouw · kerndoelen · ecosystemen 3',W-80,60,C.text2,'right',24); },
// ---- H1: wolf eet ree eet kruiden ----
s03(ctx,t,q){ const tR=q.at('ree.'), tK=q.at('kruiden'), tP=q.at('plant?'), tN=q.at('niets'), tWa=q.at('Waar');
  bos(t,{}); for(let i=0;i<6;i++) kruid(840+i*40,800,1.2);
  const rx=lerp(1000,920,ramp(t,tK,1)); ree(rx,800,1.15,t,{loop:t>tK&&t<tK+1?1:0,dir:-1});
  wolf(lerp(1800,1450,ramp(t,0.2,2)),800,1.05,t,{loop:t<2.2?1:0,dir:-1});
  naamBij(ctx,'wolf','',1500,880-40,ramp(t,0.6,0.4),'center',C.text); naamBij(ctx,'ree','',960,880-40,ramp(t,tR,0.4),'center',C.text); naamBij(ctx,'kruiden en jonge boompjes','',560,640,ramp(t,tK,0.4),'center',C.groen);
  alpha(ctx,ramp(t,tP,0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(940,790,120,50,0,0,6.283); ctx.stroke(); });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',W/2,320,fTitel(110),C.goud,'center')); },
// ---- H1: de voedselketen ----
s05(ctx,t,q){ const tPl=q.at('plant',1), tZ=q.at('zonlicht.'), tPr=q.at('producent.'), tD=q.at('Dieren'), tC=q.at('consumenten.'), tV=q.at('voedselketen.'), tPi=q.at('pijlen'), tWi=q.at('wijst'), tB=q.at('bovenaan.'), tE=q.at('edelhert'), tN=q.at('niemand');
  bg(ctx,'schema');
  // zon
  alpha(ctx,ramp(t,tZ,0.4),()=>{ dot(ctx,250,200,46,C.goud); for(let k=0;k<8;k++){ const an=k*Math.PI/4; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(250+Math.cos(an)*60,200+Math.sin(an)*60); ctx.lineTo(250+Math.cos(an)*80,200+Math.sin(an)*80); ctx.stroke(); } arrow(ctx,300,260,400,380,C.goud,3,14); });
  const X=[480,960,1440], Y=480, focusE=ramp(t,tE-0.3,0.4)*(1-ramp(t,tN+1,0.4));
  knoop(X[0],Y,'kruiden','plant',ramp(t,0.2,0.4),t>tPr?C.groen:C.line);
  knoop(X[1],Y,'ree','ree',ramp(t,0.4,0.4),t>tC?C.oker:C.line,1-0.6*focusE);
  knoop(X[2],Y,'wolf','wolf',ramp(t,0.6,0.4),t>tB?C.goud:(t>tC?C.oker:C.line),1);
  naamBij(ctx,'producent','maakt zelf voedsel',X[0],660,ramp(t,tPr,0.4),'center',C.groen);
  naamBij(ctx,'consumenten','eten iets anders op',(X[1]+X[2])/2,660,ramp(t,tC,0.4),'center',C.oker);
  const pa=ramp(t,tPi,0.8); pijl(X[0]+110,Y,X[1]-110,Y,pa,C.text,4); pijl(X[1]+110,Y,X[2]-110,Y,ramp(t,tPi+0.4,0.8),C.text,4);
  alpha(ctx,fadeIO(t,tWi,tB,0.4),()=>{ metaText(ctx,'van voedsel',X[0]+240,Y-30,C.grain,'center',22); metaText(ctx,'naar eter',X[1]+240,Y-30,C.grain,'center',22); });
  naamBij(ctx,'voedselketen','',W/2,280,ramp(t,tV,0.4),'center',C.goud);
  alpha(ctx,focusE,()=>{ roundRect(ctx,1420,90,440,200,16); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); hert(1530,270,0.42,0,{}); wolf(1760,270,0.55,0,{dir:-1}); metaText(ctx,'edelhert is groter',1640,125,C.text2,'center',22); });
  haak(ctx,X[2]-110,X[2]+110,Y+90,'niemand eet de wolf',C.goud,ramp(t,tN,0.4)*(1-focusE*0)); },
// ---- H2: het voedselweb ----
s06(ctx,t,q){ const tEd=q.at('edelherten'), tZw=q.at('zwijnen.'), tEi=q.at('eikels,'), tMu=q.at('muizen.'), tVo=q.at('vos'), tUi=q.at('uil.'), tT=q.at('Teken'), tVw=q.at('voedselweb.'), tDr=q.at('draden.'), tWeg=q.at('weg,');
  bg(ctx,'schema');
  const N={ wolf:[960,150,'wolf','wolf'], ree:[520,440,'ree','ree'], hert:[960,440,'edelhert','hert'], zwijn:[1380,440,'wild zwijn','zwijn'], vos:[1760,440,'vos','vos'], uil:[1760,150,'uil','uil'],
    kruid:[520,730,'kruiden','plant'], eikel:[1100,730,'eikels','eikel'], muis:[1540,730,'muis','muis'] };
  const A={wolf:0,ree:0,kruid:0,hert:tEd,zwijn:tZw,eikel:tEi,muis:tMu,vos:tVo,uil:tUi};
  const weg=ramp(t,tWeg,0.5);
  const E=[['kruid','ree',0],['ree','wolf',0],['kruid','hert',tEd],['hert','wolf',tEd],['zwijn','wolf',tZw],['eikel','zwijn',tEi],['muis','zwijn',tMu],['muis','vos',tVo],['muis','uil',tUi],['eikel','muis',tUi+0.4],['kruid','muis',tUi+0.6]];
  E.forEach(([a,b,tt])=>{ const p=N[a], r=N[b]; const ang=Math.atan2(r[1]-p[1],r[0]-p[0]); const off=(x,y,s)=>[x+Math.cos(ang)*s*86, y+Math.sin(ang)*s*66];
    const [x1,y1]=off(p[0],p[1],1), [x2,y2]=off(r[0],r[1],-1); const isWeg=(a==='ree'&&b==='wolf'); const kl=t>tVw&&t<tDr+1?C.goud:C.line; pijl(x1,y1,x2,y2,ramp(t,tt,0.7),isWeg&&weg>0?rgba(C.line,0.2):kl,2.5); });
  Object.entries(N).forEach(([k,[x,y,nm,ic]])=>{ const dimR=(k==='ree')?1-0.65*weg:1; const kl=k==='kruid'||k==='eikel'?C.groen:(k==='wolf'?C.goud:C.line); alpha(ctx,ramp(t,A[k],0.4),()=>{ knoop(x,y,nm,ic,1,kl,dimR); }); });
  naamBij(ctx,'voedselweb','alle ketens samen',230,190,ramp(t,tVw,0.4),'center',C.goud);
  alpha(ctx,weg,()=>{ crossOut(ctx,760,310,22,1); pill(ctx,960,330-30,'de wolf eet iets anders',C.groen,0,28); }); meta3(); },
// ---- H2: vraag over de bladeren ----
s07(ctx,t,q){ const tH=q.at('herfst'), tN=q.at('niet'), tWa=q.at('Waar');
  bos(t,{}); for(let i=0;i<60;i++){ const u=ramp(t,tH+hash(i)*2,2.4); if(u<=0) continue; const x=60+hash(i*2.7)*1800, y=lerp(300+hash(i*1.3)*200,760+hash(i*4.1)*120,u); blad(x+Math.sin(t*2+i)*14*(1-u),y,i,1.1,i%3?'#C9A35C':'#B07A4A'); }
  pill(ctx,W/2,240,'een paar jaar later: geen dikke laag',C.grain,ramp(t,tN,0.4),30);
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',W/2,420,fTitel(110),C.goud,'center')); },
// ---- H2: reducenten en de kringloop ----
s09(ctx,t,q){ const tP=q.at('Pissebedden'), tS=q.at('Schimmels'), tR=q.at('reducenten.'), tDi=q.at('dieren'), tRa=q.at('raven'), tBr=q.at('breken'), tM=q.at('mineralen.'), tPl=q.at('plant'), tG=q.at('groeit'), tRe=q.at('ree'), tRo=q.at('rond.'), tK=q.at('kringloop.');
  if(t<tBr-0.3){ // Macro: bosbodem
    bos(t,{jong:1}); ctx.fillStyle='#3A2E24'; ctx.fillRect(0,760,W,H-760);
    for(let i=0;i<40;i++){ const af=ramp(t,tS+hash(i)*3,2); blad(80+hash(i*2.7)*1760,790+hash(i*4.1)*90,i,1.1*(1-0.6*af),i%3?'#C9A35C':'#8C6A3A'); }
    for(let i=0;i<5;i++){ pissebed3(300+i*170+Math.sin(t+i)*10,820+(i%2)*30,1.2,ramp(t,tP,0.4)); } worm(1300,860,1.4,ramp(t,tP+0.5,0.4),t); worm(700,880,1.2,ramp(t,tP+0.7,0.4),t+1);
    for(let i=0;i<6;i++) schimmel(220+i*290,810,1.1,ramp(t,tS+0.2*i,0.4)); for(let i=0;i<8;i++) bacterie(260+i*200,860,0.7,'staaf',ramp(t,tS+0.5,0.4),hash(i)*3);
    naamBij(ctx,'reducenten','schimmels en bacteriën',W/2,660,ramp(t,tR,0.4),'center',C.teal);
    alpha(ctx,ramp(t,tDi,0.5),()=>{ ctx.beginPath(); ctx.ellipse(1500,760,90,26,0,0,6.283); shape(ctx,'#7A6A5A','#9A8A7A',1.5); raaf(1440,742,1.3,ramp(t,tRa,0.4)); aaskever(1560,770,1.2,ramp(t,tRa+0.4,0.4)); aaskever(1600,780,1.0,ramp(t,tRa+0.6,0.4)); naamBij(ctx,'dood dier','',1500,560,1,'center',C.text2); });
    return; }
  // Schema: de kringloop
  bg(ctx,'schema'); const cx=W/2, cy=470, R=270;
  const K=[['dode resten','dood',-90,tBr-0.3],['reducenten','reducent',-18,tBr],['mineralen in de bodem','bodem',54,tM],['plant','plant',126,tPl],['ree','ree',198,tRe]];
  K.forEach(([nm,ic,ang,tt],i)=>{ const a=ang*Math.PI/180; const x=cx+Math.cos(a)*R*1.35, y=cy+Math.sin(a)*R; const kl=ic==='reducent'?C.teal:(ic==='plant'?C.groen:(ic==='bodem'?C.oker:C.line)); knoop(x,y,nm,ic,ramp(t,tt,0.4),kl);
    const b=K[(i+1)%5]; const a2=b[2]*Math.PI/180; const x2=cx+Math.cos(a2)*R*1.35, y2=cy+Math.sin(a2)*R; const ang2=Math.atan2(y2-y,x2-x); pijl(x+Math.cos(ang2)*120,y+Math.sin(ang2)*80,x2-Math.cos(ang2)*120,y2-Math.sin(ang2)*80,ramp(t,i===4?tRo:K[(i+1)%5][3],0.6),t>tK?C.goud:C.line,3); });
  alpha(ctx,ramp(t,tK,0.4),()=>{ text(ctx,'kringloop',cx,cy+10,fTitel(64),C.goud,'center'); metaText(ctx,'stoffen gaan rond',cx,cy+60,C.grain,'center',24); });
  alpha(ctx,ramp(t,tG,0.4)*(1-ramp(t,tK,0.4)),()=>metaText(ctx,'opgenomen met de wortels',cx,cy+10,C.groen,'center',24)); meta3(); },
// ---- H3: de startvraag ----
s10(ctx,t,q){ const tW=q.at('wolf'), tJ=q.at('jonge'), tWa=q.at('Wat');
  bos(t,{}); wolf(1500,800,1.1,t,{a:1-ramp(t,tW+0.3,1),dir:-1}); ree(900,800,1.0,t,{dir:1});
  alpha(ctx,ramp(t,tJ,0.4),()=>{ for(let i=0;i<10;i++){ const x=300+i*140+hash(i*7)*60; ctx.strokeStyle=C.goud; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,740+hash(i)*30,28,0,6.283); ctx.stroke(); } });
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',W/2,330,fTitel(110),C.goud,'center')); },
// ---- H3: zonder wolf ----
s12(ctx,t,q){ const tM=q.at('meer'), tO=q.at('overal'), tMi=q.at('minder'), tE=q.at('echt'), tR=q.at('Ruim'), tJa=q.at('jagen.'), tEe=q.at('Eén'), tOo=q.at('Ook',1);
  if(t<tE-0.2){ const j=1-ramp(t,tO,2.5); bos(t,{jong:j});
    const n=Math.round(lerp(2,8,ramp(t,tM,2))); for(let i=0;i<n;i++){ const x=200+hash(i*3.3)*1500, d=hash(i*5.1)>0.5?1:-1; if(i%3===0) hert(x,820+(i%2)*30,0.75,t,{dir:d}); else ree(x,820+(i%2)*30,0.85,t,{dir:d}); }
    pill(ctx,520,220,'meer reeën en herten',C.oker,ramp(t,tM,0.4),32); pill(ctx,1400,220,'minder jonge bomen',C.groen,ramp(t,tMi,0.4),32);
    alpha(ctx,ramp(t,tMi,0.4),()=>{ text(ctx,'↓',1400,330,fTitel(70),C.groen,'center'); }); meta3(); return; }
  bg(ctx,'schema');
  if(t<tEe-0.2){ // tijdlijn
    ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(220,520); ctx.lineTo(1700,520); ctx.stroke();
    alpha(ctx,ramp(t,tR,0.4),()=>{ dot(ctx,420,520,10,C.line); text(ctx,'ruim 150 jaar geleden',420,600,fTekst(32,600),C.text,'center'); wolf(420,470,0.7,0,{}); crossOut(ctx,440,420,40,1); });
    alpha(ctx,ramp(t,tJa-1.2,0.4),()=>{ dot(ctx,1100,520,10,C.line); persoon(ctx,'henk',1100,500,200,{pose:'staan',uit:'neutraal',kijk:1,t,outfit:null}); text(ctx,'mensen jagen',1100,600,fTekst(32,600),C.text,'center'); });
    alpha(ctx,ramp(t,tJa,0.4),()=>{ dot(ctx,1600,520,10,C.goud); text(ctx,'nu',1600,600,fTekst(32,600),C.goud,'center'); wolf(1600,470,0.7,0,{dir:-1}); });
    return; }
  // het web trilt mee
  const N=[[960,250,'wolf','wolf'],[560,470,'ree','ree'],[960,470,'edelhert','hert'],[1360,470,'wild zwijn','zwijn'],[560,720,'jonge bomen','plant'],[1360,720,'muis','muis']];
  N.forEach(([x,y,nm,ic],i)=>{ const sh=i===0?0:Math.sin(t*12+i)*4*ramp(t,tEe+0.6+i*0.15,0.3)*(1-ramp(t,tEe+3,1)); ctx.save(); ctx.translate(sh,0); knoop(x,y,nm,ic,1,ic==='plant'?C.groen:C.line,i===0?1-0.65*ramp(t,tEe,0.5):1); ctx.restore(); });
  crossOut(ctx,960,250,50,ramp(t,tEe,0.4));
  haak(ctx,460,1460,820,'het hele web verandert mee',C.groen,ramp(t,tOo,0.5)); },
// ---- H3 uitdaging: wolf, vos en grondbroeders ----
s13(ctx,t,q){ const tV=q.at('vossen',1), tM=q.at('meer',2), tE=q.at('eieren'), tH=q.at('helpen');
  bg(ctx,'schema'); const X=[400,960,1520], Y=470;
  knoop(X[0],Y,'wolf','wolf',ramp(t,0.2,0.4),C.goud,1-0.65*ramp(t,tM-0.6,0.5));
  knoop(X[1],Y,'vos','vos',ramp(t,tV,0.4),C.koraal);
  alpha(ctx,ramp(t,tE-0.3,0.4),()=>{ roundRect(ctx,X[2]-100,Y-70,200,140,16); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); ctx.beginPath(); ctx.ellipse(X[2],Y-10,70,20,0,0,Math.PI); shape(ctx,'#6E5238','#8C6A4A',1.2); [-24,0,24].forEach(dx=>{ ctx.beginPath(); ctx.ellipse(X[2]+dx,Y-16,12,15,0,0,6.283); shape(ctx,'#E8E2D4','#F2F2EE',1); }); text(ctx,'grondbroeders',X[2],Y+56,fTekst(28,600),C.text,'center'); });
  pijl(X[0]+110,Y,X[1]-110,Y,ramp(t,tV+0.3,0.6),C.koraal,3); alpha(ctx,ramp(t,tV+0.3,0.4)*(1-ramp(t,tM-0.6,0.4)),()=>metaText(ctx,'jaagt weg',(X[0]+X[1])/2,Y-30,C.koraal,'center',22));
  alpha(ctx,ramp(t,tM,0.4),()=>{ for(let k=0;k<3;k++) vos3(X[1]-80+k*80,Y+250,0.55,t,{}); pill(ctx,X[1],Y-150,'meer vossen',C.koraal,1,30); });
  pijl(X[2]-110,Y,X[1]+110,Y,ramp(t,tE,0.6),C.line,3);
  alpha(ctx,ramp(t,tH,0.4),()=>{ ctx.save(); ctx.setLineDash([10,8]); ctx.strokeStyle=C.groen; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(X[0],Y-80); ctx.quadraticCurveTo(960,140,X[2],Y-80); ctx.stroke(); ctx.restore(); naamBij(ctx,'de wolf helpt de vogels','zonder ze te eten',960,210,1,'center',C.groen); }); meta3(); },
// ---- samenvatting ----
s14(ctx,t,q){ const tM=q.at('meer'), tE=q.at('Elke'), tA=q.at('Alle'), tR=q.at('Reducenten'), tH=q.at('Haal');
  if(t<tE-0.2){ bos(t,{jong:0.2}); for(let i=0;i<6;i++){ const x=300+i*260; if(i%2) hert(x,820,0.7,t,{dir:i%4?1:-1}); else ree(x,820,0.85,t,{dir:-1}); } pill(ctx,520,220,'meer reeën en herten',C.oker,ramp(t,tM,0.4),32); pill(ctx,1400,220,'minder jonge bomen',C.groen,ramp(t,tM+1.5,0.4),32); return; }
  bg(ctx,'schema'); const C3=[['voedselketen','begint bij een plant',tE,C.groen],['voedselweb','alle ketens samen',tA,C.goud],['kringloop','reducenten → mineralen → planten',tR,C.teal]];
  C3.forEach(([a,b,tt,kl],i)=>{ const x=340+i*620; alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ roundRect(ctx,x-260,240,520,300,18); shape(ctx,rgba(C.bgSchema,0.95),kl,2); text(ctx,a,x,320,fTekst(42,700),kl,'center'); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='center'; wrap(ctx,b,x,400,440,40);
    if(i===0){ kruid(x-120,520,1); pijl(x-90,490,x-30,490,1,C.line,2.5); ree(x+10,525,0.4,0,{}); pijl(x+60,490,x+110,490,1,C.line,2.5); wolf(x+150,525,0.35,0,{}); }
    if(i===2){ schimmel(x-60,480,0.8); for(let k=0;k<5;k++) dot(ctx,x+hash(k)*40,490+hash(k*3)*20,4,C.oker); kruid(x+110,520,0.9); } }); });
  haak(ctx,80,1840,600,'haal je één soort weg, dan verandert er meer',C.groen,ramp(t,tH,0.5)); },
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Elke voedselketen begint bij een plant.','Alle ketens samen vormen een voedselweb.','Reducenten maken van dode resten weer voedsel voor planten.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
