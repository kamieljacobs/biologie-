// ===== Wie woont waar — scènes (kerndoelen onderbouw, 33C film 2) =====
// Macro-nacht voor alle landschappen (poolgebied, woestijn, schooltuin, toendra); Schema voor de doorsnede van de ijsbeer en de samenvatting.
// Kleuren: abiotisch = teal (water, kou, ijs), biotisch = groen (leven), warmte = koraal, dieren in oker/bruin/grijs, focus = goud.

const IJS='#D8E2EC', IJSR='#F2F6FA', ZEE='#1F4F7A', BEER='#E6DFCC', BEERR='#F4EFE2';
function meta2(){ metaText(ctx,'schematisch · niet op schaal',W-40,CAPTION_Y-14,C.text2,'right',22); }
// ---- landschappen ----
function hemel(){ ctx.fillStyle=C.bgMacroSky; ctx.fillRect(0,0,W,H); }
function sterren(n=40){ for(let i=0;i<n;i++){ dot(ctx,hash(i*3.1)*W,40+hash(i*5.3)*300,1.2+hash(i)*1.4,rgba('#F2F2EE',0.35+0.3*hash(i*7))); } }
function poolgebied(ijs=1,t=0){ hemel(); sterren(30);
  // verre bergen met sneeuwtoppen
  ctx.fillStyle=C.berg; ctx.beginPath(); ctx.moveTo(0,520); [[160,400],[300,470],[470,360],[640,470],[820,410],[980,480],[1180,380],[1380,470],[1560,400],[1760,470],[1920,420],[1920,560],[0,560]].forEach(([x,y])=>ctx.lineTo(x,y)); ctx.closePath(); ctx.fill();
  ctx.fillStyle=C.bergTop; [[470,360,40],[1180,380,44],[160,400,34],[1560,400,36]].forEach(([x,y,w])=>{ ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+w,y+w*0.75); ctx.lineTo(x-w,y+w*0.75); ctx.closePath(); ctx.fill(); });
  // zee
  ctx.fillStyle=ZEE; ctx.fillRect(0,540,W,H-540);
  ctx.strokeStyle=rgba(C.teal,0.35); ctx.lineWidth=2; for(let k=0;k<6;k++){ const y=600+k*55; ctx.beginPath(); for(let x=0;x<=W;x+=40){ const yy=y+Math.sin(x*0.02+t*0.8+k)*3; x?ctx.lineTo(x,yy):ctx.moveTo(x,yy);} ctx.stroke(); }
  // ijsschotsen: krimpen met ijs (0..1)
  const SCH=[[960,700,820,90],[300,610,240,30],[1600,620,300,34],[420,820,260,40],[1550,830,320,44],[1180,590,200,22]];
  SCH.forEach(([x,y,w,h],i)=>{ const k=i===0?Math.max(0.12,ijs):clamp(ijs*1.3-0.25*(i%3),0,1); if(k<=0.02) return; const ww=w*k, hh=h*Math.max(0.5,k);
    ctx.beginPath(); ctx.moveTo(x-ww/2,y); ctx.lineTo(x-ww/2+18,y-hh*0.6); ctx.lineTo(x+ww/2-24,y-hh*0.7); ctx.lineTo(x+ww/2,y); ctx.lineTo(x+ww/2-10,y+hh*0.35); ctx.lineTo(x-ww/2+12,y+hh*0.35); ctx.closePath(); shape(ctx,IJS,IJSR,1.5);
    ctx.fillStyle=rgba('#9FB4C8',0.6); ctx.fillRect(x-ww/2+12,y+2,ww-24,hh*0.3); });
  return {schotY:700-63};
}
function woestijn(t=0){ hemel(); sterren(55); dot(ctx,1640,170,46,'#E8E2C8'); dot(ctx,1622,160,40,C.bgMacroSky);
  ctx.fillStyle='#6E5A3A'; ctx.beginPath(); ctx.moveTo(0,560); ctx.quadraticCurveTo(300,470,620,540); ctx.quadraticCurveTo(900,600,1240,500); ctx.quadraticCurveTo(1560,430,1920,520); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#8C7448'; ctx.beginPath(); ctx.moveTo(0,700); ctx.quadraticCurveTo(420,600,860,690); ctx.quadraticCurveTo(1300,770,1920,650); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#A88C58'; ctx.beginPath(); ctx.moveTo(0,820); ctx.quadraticCurveTo(700,760,1920,830); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  // cactusloze struikjes
  [[260,700],[1500,690],[1180,770]].forEach(([x,y],i)=>{ ctx.strokeStyle='#5F7A50'; ctx.lineWidth=4; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+k*14,y-30-hash(i*5+k)*20); ctx.stroke(); } });
}
function toendra(){ hemel(); sterren(30);
  ctx.fillStyle=C.berg; ctx.beginPath(); ctx.moveTo(0,560); ctx.lineTo(300,470); ctx.lineTo(560,540); ctx.lineTo(900,450); ctx.lineTo(1250,540); ctx.lineTo(1600,470); ctx.lineTo(1920,530); ctx.lineTo(1920,600); ctx.lineTo(0,600); ctx.closePath(); ctx.fill();
  ctx.fillStyle=C.bgMacroHill; ctx.fillRect(0,590,W,H-590); ctx.fillStyle='#D3DCE4'; for(let i=0;i<14;i++){ ctx.beginPath(); ctx.ellipse(hash(i*4.4)*W,640+hash(i*2.2)*220,60+hash(i)*90,10+hash(i*3)*8,0,0,6.283); ctx.fill(); }
  ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,860,W,H-860); }
// ---- dieren (zijaanzicht, egale vlakken, stip als oog) ----
function ijsbeer(x,y,s=1,t=0,o={}){ const a=o.a==null?1:o.a; if(a<=0.01) return; const loop=o.loop||0, mager=o.mager||0, dir=o.dir||1;
  alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
    const sw=Math.sin(t*5)*loop; const bw=1-0.18*mager;
    // poten
    [[-95,sw],[-55,-sw],[60,-sw],[100,sw]].forEach(([px,ph],i)=>{ ctx.save(); ctx.translate(px,-70); ctx.rotate(ph*0.25); roundRect(ctx,-17,0,34,72,14); shape(ctx,i%2?lighten(BEER,0)+'':BEER,BEERR,1.5); ctx.restore(); });
    // lijf
    ctx.beginPath(); ctx.ellipse(0,-120,150,72*bw,0,0,6.283); shape(ctx,BEER,BEERR,1.5);
    ctx.beginPath(); ctx.ellipse(-30,-95,110,34*bw,0,0,Math.PI); ctx.fillStyle=rgba('#FFFFFF',0.25); ctx.fill();
    // nek + kop
    ctx.beginPath(); ctx.moveTo(110,-170); ctx.quadraticCurveTo(180,-170,200,-130); ctx.lineTo(160,-90); ctx.closePath(); shape(ctx,BEER,BEERR,1.5);
    ctx.beginPath(); ctx.ellipse(210,-128,52,34,0.15,0,6.283); shape(ctx,BEER,BEERR,1.5);
    ctx.beginPath(); ctx.ellipse(254,-118,22,16,0.2,0,6.283); shape(ctx,BEER,BEERR,1.5); dot(ctx,272,-118,6,'#2A2119');
    dot(ctx,186,-160,10,BEER,BEERR,1.5); dot(ctx,222,-140,4.5,'#2A2119');
    ctx.restore(); }); }
function zeehond(x,y,s=1,a=1,dir=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  ctx.beginPath(); ctx.moveTo(-90,0); ctx.quadraticCurveTo(-40,-50,40,-38); ctx.quadraticCurveTo(90,-34,96,-14); ctx.quadraticCurveTo(90,4,40,6); ctx.lineTo(-70,8); ctx.lineTo(-110,-10); ctx.lineTo(-104,10); ctx.closePath(); shape(ctx,'#8A919C','#B4BAC4',1.5);
  dot(ctx,72,-24,4,'#2A2119'); ctx.restore(); }); }
function vis(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,26*s,10*s,0,0,6.283); shape(ctx,'#9AA3B2','#C9CED8',1.2); ctx.beginPath(); ctx.moveTo(x-24*s,y); ctx.lineTo(x-38*s,y-10*s); ctx.lineTo(x-38*s,y+10*s); ctx.closePath(); ctx.fill(); }); }
function vos(x,y,s=1,t=0,o={}){ const a=o.a==null?1:o.a; if(a<=0.01) return; const kl=o.kleur||'#C8703A', kr=lighten(kl,0.3), oor=o.oor||1, loop=o.loop||0, dir=o.dir||1;
  alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); const sw=Math.sin(t*8)*loop;
    [[-50,sw],[-30,-sw],[34,-sw],[52,sw]].forEach(([px,ph])=>{ ctx.save(); ctx.translate(px,-40); ctx.rotate(ph*0.35); roundRect(ctx,-6,0,12,42,6); shape(ctx,kl,kr,1.2); ctx.restore(); });
    ctx.beginPath(); ctx.ellipse(0,-58,70,28,0,0,6.283); shape(ctx,kl,kr,1.5);
    ctx.beginPath(); ctx.moveTo(-64,-62); ctx.quadraticCurveTo(-130,-80,-150,-40); ctx.quadraticCurveTo(-120,-46,-64,-46); ctx.closePath(); shape(ctx,kl,kr,1.5); dot(ctx,-146,-42,7,o.punt||'#F2F2EE');
    ctx.beginPath(); ctx.moveTo(52,-70); ctx.lineTo(92,-90); ctx.lineTo(126,-74); ctx.lineTo(92,-60); ctx.closePath(); shape(ctx,kl,kr,1.5);
    // oren (fennek: oor ≈ 2.4)
    [[78,-90],[96,-92]].forEach(([ox,oy],i)=>{ ctx.beginPath(); ctx.moveTo(ox-8,oy+4); ctx.lineTo(ox-2+i*6,oy-26*oor); ctx.lineTo(ox+10,oy+2); ctx.closePath(); shape(ctx,kl,kr,1.5); if(o.oorKleur){ ctx.beginPath(); ctx.moveTo(ox-3,oy+2); ctx.lineTo(ox+i*6,oy-20*oor); ctx.lineTo(ox+6,oy); ctx.closePath(); ctx.fillStyle=o.oorKleur; ctx.fill(); } });
    dot(ctx,98,-80,3.5,'#2A2119'); dot(ctx,127,-74,4,'#2A2119'); ctx.restore(); }); }
function pissebed(x,y,s=1,a=1,rot=0){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.scale(s,s); ctx.beginPath(); ctx.ellipse(0,0,22,12,0,0,6.283); shape(ctx,'#7E7A74','#A8A39A',1.2); ctx.strokeStyle='#A8A39A'; ctx.lineWidth=1; for(let k=-3;k<=3;k++){ ctx.beginPath(); ctx.moveTo(k*5.5,-11); ctx.lineTo(k*5.5,11); ctx.stroke(); } ctx.strokeStyle='#5A5650'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(20,-4); ctx.lineTo(32,-12); ctx.moveTo(20,4); ctx.lineTo(32,12); ctx.stroke(); ctx.restore(); }); }
function kever(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,14*s,9*s,0,0,6.283); shape(ctx,'#B07A4A','#D09A68',1.2); dot(ctx,x+14*s,y,5*s,'#8C5A3A'); }); }
function lemming(x,y,s=1,a=1){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,22*s,13*s,0,0,6.283); shape(ctx,'#B08A5C','#D0AA7C',1.2); dot(ctx,x+16*s,y-4*s,2.5*s,'#2A2119'); }); }
function boom(x,yg,s=1,a=1){ alpha(ctx,a,()=>{ ctx.fillStyle=C.bruin; ctx.fillRect(x-14*s,yg-200*s,28*s,200*s); [[0,-260,120],[-80,-210,90],[85,-215,95],[0,-180,100]].forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(x+dx*s,yg+dy*s,r*s,0,6.283); shape(ctx,'#4F8A5E','#6FA87C',1.5); }); }); }
function warmte(x,y,t,a=1,n=3){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=3; for(let k=0;k<n;k++){ const yy=y-((t*30+k*22)%60); ctx.beginPath(); ctx.moveTo(x+k*22-22,yy+30); ctx.quadraticCurveTo(x+k*22-12,yy+15,x+k*22-22,yy); ctx.quadraticCurveTo(x+k*22-32,yy-15,x+k*22-22,yy-30); ctx.stroke(); } }); }
function thermo(x,y,h,niveau,kleur,a=1,txt=''){ if(a<=0.01) return; alpha(ctx,a,()=>{ roundRect(ctx,x-12,y-h,24,h,12); shape(ctx,rgba(C.bgMicro,0.8),C.line,2); dot(ctx,x,y+12,20,kleur,lighten(kleur,0.3),2); roundRect(ctx,x-6,y-h*niveau,12,h*niveau+8,6); ctx.fillStyle=kleur; ctx.fill(); if(txt) text(ctx,txt,x+34,y-h*niveau+12,fTekst(36,700),kleur,'left'); }); }
function paneel(x,y,w,h,a,fn,rand=C.goud){ if(a<=0.01) return; alpha(ctx,a,()=>{ ctx.save(); roundRect(ctx,x,y,w,h,18); ctx.clip(); ctx.translate(x,y); ctx.scale(w/W,h/H); fn(); ctx.restore(); roundRect(ctx,x,y,w,h,18); ctx.strokeStyle=rand; ctx.lineWidth=2; ctx.stroke(); }); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open ----
s01(ctx,t,q){ const tW=q.at('woestijn.'), tM=q.at('mis.'), tWa=q.at('waarom');
  poolgebied(1,t); ijsbeer(lerp(700,860,ramp(t,0.3,4)),640,1.1,t,{loop:t<4.3?1:0});
  paneel(1080,120,760,430,ramp(t,tW-0.2,0.5),()=>{ woestijn(t); ijsbeer(900,760,1.6,t,{}); warmte(1200,420,t,1,4); },C.koraal);
  alpha(ctx,ramp(t,tW+0.4,0.4),()=>metaText(ctx,'in de woestijn?',1460,600,C.koraal,'center',26));
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',900,330,fTitel(120),C.goud,'center')); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Wie woont waar?',120,330,fTitel(96),C.text); text(ctx,'Waarom leeft een ijsbeer niet in de woestijn?',120,410,fTekst(44),C.text2); });
  ijsbeer(1360,760,1.25,t,{a:ramp(t,0.5,0.6)}); vos(1680,780,1.1,t,{a:ramp(t,1.0,0.6),kleur:'#D9B77A',oor:2.4,oorKleur:'#E8C9A0'});
  metaText(ctx,'onderbouw · kerndoelen · ecosystemen 2',W-80,60,C.text2,'right',24); },
// ---- H1: wat een ijsbeer nodig heeft ----
s04(ctx,t,q){ const tA=q.at('antwoord'), tK=q.at('Kijk'), tKo=q.at('koud,'), tIj=q.at('ijs',2), tAb=q.at('abiotische'), tZh=q.at('zeehonden.'), tG=q.at('gat'), tZ2=q.at('Zeehonden,'), tBi=q.at('biotische',2);
  poolgebied(1,t);
  if(t<tK-0.2){ pill(ctx,560,300,'te warm',C.koraal,ramp(t,tA+0.6,0.4),40); pill(ctx,1360,300,'niets te eten',C.groen,ramp(t,tA+1.6,0.4),40); ijsbeer(900,640,1.1,t,{}); return; }
  const tWacht=tG-0.4; const bx=lerp(760,700,ramp(t,tWacht,1));
  // ademgat in de grote schots
  alpha(ctx,ramp(t,tG-0.6,0.5),()=>{ ctx.beginPath(); ctx.ellipse(1060,640,60,14,0,0,6.283); shape(ctx,ZEE,'#9FB4C8',2); });
  ijsbeer(bx,642,1.05,t,{loop:t>tWacht&&t<tWacht+1?1:0});
  thermo(220,420,220,0.12,C.teal,ramp(t,tKo,0.4),'tot −40 °C');
  if(t>tIj&&t<tAb+0.5) alpha(ctx,ramp(t,tIj,0.3)*(1-ramp(t,tAb,0.4)),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(960,700,440,70,0,0,6.283); ctx.stroke(); });
  const ab=fadeIO(t,tAb-0.2,tZh-0.2,0.4); if(ab>0.01) alpha(ctx,ab,()=>{ chips(ctx,[['kou',1,C.teal],['ijs',1,C.teal],['zout water',1,C.teal],['sneeuw',1,C.teal]],170); naamBij(ctx,'abiotische factoren','zonder leven',W/2,260,1,'center',C.teal); });
  // zeehond komt boven bij het gat
  const zu=ramp(t,tZh,1); zeehond(1060,lerp(760,640,zu),0.9,ramp(t,tZh-0.3,0.4)*(t>tZ2+1.5?1:1),-1);
  alpha(ctx,ramp(t,tZ2,0.5),()=>{ vis(1300,880,1.4); vis(1420,860,1.1); vis(500,880,1.2); ijsbeer(1650,630,0.55,t,{dir:-1}); });
  const bi=ramp(t,tBi-0.2,0.4); if(bi>0.01) alpha(ctx,bi,()=>{ chips(ctx,[['zeehonden',1,C.groen],['vissen',1,C.groen],['andere ijsberen',1,C.groen]],170); naamBij(ctx,'biotische factoren','levend',W/2,260,1,'center',C.groen); }); },
// ---- H1: vetlaag en ecosysteem ----
s05(ctx,t,q){ const tV=q.at('vet,'), tT=q.at('tien'), tW=q.at('warm',1), tWo=q.at('woestijn'), tA=q.at('Alles'), tE=q.at('ecosysteem.'), tO=q.at('elkaar');
  if(t<tA-0.2){ bg(ctx,'schema'); text(ctx,'Een ijsbeer van binnen',W/2,150,fTitel(56),C.text,'center');
    ctx.save(); ctx.translate(960,560);
    ctx.beginPath(); ctx.ellipse(0,0,520,230,0,0,6.283); shape(ctx,BEER,BEERR,2);
    const v=ramp(t,tV-0.3,0.6); ctx.beginPath(); ctx.ellipse(0,0,500,212,0,0,6.283); ctx.fillStyle=rgba(C.oker,0.85*v+0.0); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,0,500-90*v,212-80*v,0,0,6.283); shape(ctx,'#B8606A','#D88A92',1.5); ctx.restore();
    metaText(ctx,'doorsnede · vereenvoudigd',W/2,860-40,C.text2,'center',22);
    naamBij(ctx,'vacht','',960,300,ramp(t,0.4,0.4),'center',C.text); naamBij(ctx,'dikke laag vet','houdt warm',960,555,ramp(t,tV,0.4),'center',C.text);
    pill(ctx,1580,300,'± 10 cm',C.oker,ramp(t,tT,0.4),34);
    thermo(200,620,240,0.15,C.teal,fadeIO(t,tW-0.4,tWo-0.2,0.4),''); naamBij(ctx,'kou: fijn','',200,720,fadeIO(t,tW-0.4,tWo-0.2,0.4),'center',C.teal);
    alpha(ctx,ramp(t,tWo,0.4),()=>{ thermo(200,620,240,0.92,C.koraal,1,''); naamBij(ctx,'woestijn: te warm','',200,720,1,'center',C.koraal); warmte(1380,360,t,1,4); });
    return; }
  poolgebied(1,t); ijsbeer(700,642,1.05,t,{}); zeehond(1250,650,0.8,1,-1); vis(1300,880,1.3); vis(560,870,1.1); ijsbeer(1650,630,0.5,t,{dir:-1});
  const e=ramp(t,tE-0.3,0.5); if(e>0.01) alpha(ctx,e,()=>{ naamBij(ctx,'ecosysteem','alles op één plek, samen',W/2,250,1,'center',C.goud);
    const pts=[[760,520],[1250,600],[1300,860],[960,720],[300,170]]; ctx.strokeStyle=rgba(C.goud,0.7); ctx.lineWidth=2; ctx.setLineDash([8,8]);
    const k=ramp(t,tO,1); for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){ if((i+j)%2) continue; ctx.beginPath(); ctx.moveTo(pts[i][0],pts[i][1]); ctx.lineTo(lerp(pts[i][0],pts[j][0],k),lerp(pts[i][1],pts[j][1],k)); ctx.stroke(); } ctx.setLineDash([]); thermo(300,420,200,0.12,C.teal,1,''); }); },
// ---- H2: de fennek ----
s06(ctx,t,q){ const tF=q.at('fennek.'), tO=q.at('oren.'), tW=q.at('Wat');
  woestijn(t); vos(960,760,2.2,t,{kleur:'#D9B77A',oor:2.4,oorKleur:'#E8C9A0',loop:t<tF?1:0});
  naamBij(ctx,'fennek','woestijnvos',960,820,ramp(t,tF,0.4),'center',C.text);
  alpha(ctx,ramp(t,tO,0.4),()=>{ ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(960+92*2.2,760-130*2.2,80,0,6.283); ctx.stroke(); });
  alpha(ctx,ramp(t,tW,0.4),()=>text(ctx,'?',1450,360,fTitel(110),C.goud,'center')); },
// ---- H2: oren, water uit eten, ieder zijn plek ----
s08(ctx,t,q){ const tB=q.at('bloed.'), tWa=q.at('warmte'), tI=q.at('insecten'), tD=q.at('drinken.'), tE=q.at('eten.'), tZo=q.at('Zo'), tN=q.at('niet',1), tVo=q.at('voedsel.');
  if(t<tZo-0.2){ woestijn(t); const fx=900, fy=760;
    vos(fx,fy,2.2,t,{kleur:'#D9B77A',oor:2.4,oorKleur:ramp(t,tB,0.6)>0.5?'#E0907A':'#E8C9A0'});
    warmte(fx+200,fy-330,t,ramp(t,tWa,0.4),3); naamBij(ctx,'warmte eruit','',fx+330,fy-360,ramp(t,tWa,0.4),'left',C.koraal);
    // kever onder het zand, geluidsringen
    alpha(ctx,ramp(t,tI,0.4)*(1-ramp(t,tD-0.3,0.4)),()=>{ kever(1420,900,1.4); for(let k=0;k<3;k++){ const r=20+((t*40+k*30)%90); ctx.strokeStyle=rgba(C.teal,1-r/110); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(1420,900,r,Math.PI*1.1,Math.PI*1.9); ctx.stroke(); } naamBij(ctx,'insect onder het zand','',1420,960-110,1,'center',C.text); });
    alpha(ctx,ramp(t,tD,0.4),()=>{ ctx.beginPath(); ctx.moveTo(1500,300); ctx.quadraticCurveTo(1540,360,1500,380); ctx.quadraticCurveTo(1460,360,1500,300); shape(ctx,rgba(C.teal,0.6),C.teal,2); crossOut(ctx,1500,345,40,1-ramp(t,tE-0.4,0.3)); });
    alpha(ctx,ramp(t,tE-0.3,0.4),()=>{ kever(1640,360,1.6); arrow(ctx,1600,360,1540,360,C.teal,3,12); naamBij(ctx,'water uit zijn eten','',1560,450,1,'center',C.teal); });
    return; }
  bg(ctx,'schema'); text(ctx,'Elke soort zijn eigen plek',W/2,150,fTitel(56),C.text,'center');
  paneel(140,230,780,440,ramp(t,tZo,0.4),()=>{ poolgebied(1,0); ijsbeer(900,642,1.4,0,{}); },C.teal);
  paneel(1000,230,780,440,ramp(t,tZo+0.3,0.4),()=>{ woestijn(0); vos(960,760,2.6,0,{kleur:'#D9B77A',oor:2.4,oorKleur:'#E8C9A0'}); },C.koraal);
  alpha(ctx,ramp(t,tN,0.4),()=>{ text(ctx,'koud genoeg',530,730,fTekst(36,700),C.teal,'center'); text(ctx,'warm genoeg',1390,730,fTekst(36,700),C.koraal,'center'); });
  alpha(ctx,ramp(t,tVo,0.4),()=>{ text(ctx,'+ zeehonden',530,790,fTekst(34,600),C.groen,'center'); text(ctx,'+ insecten',1390,790,fTekst(34,600),C.groen,'center'); }); },
// ---- H2: schooltuin, steen, boom ----
s09(ctx,t,q){ const tS=q.at('steen'), tP=q.at('pissebedden.'), tV=q.at('vochtig.'), tDr=q.at('droge'), tLe=q.at('Levend'), tB=q.at('boom'), tK=q.at('koel'), tBl=q.at('bladeren'), tR=q.at('rijk.'), tZo=q.at('Zo');
  hemel(); sterren(15); ctx.fillStyle=C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0,560); ctx.quadraticCurveTo(800,500,1920,560); ctx.lineTo(1920,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  ctx.fillStyle=C.bgMacroFront; ctx.fillRect(0,720,W,H-720);
  // zandpad rechts
  ctx.fillStyle='#A88C58'; ctx.beginPath(); ctx.moveTo(1300,720); ctx.lineTo(1920,720); ctx.lineTo(1920,H); ctx.lineTo(1150,H); ctx.closePath(); ctx.fill();
  const sch=ramp(t,tB,0.6); boom(420,720,1.3,1);
  alpha(ctx,sch,()=>{ ctx.fillStyle=rgba('#0D1420',0.35); ctx.beginPath(); ctx.ellipse(470,760,340,50,0,0,6.283); ctx.fill(); naamBij(ctx,'schaduw','koel en nat',470,860-20,ramp(t,tK,0.4),'center',C.teal); });
  // vallende bladeren -> rijke bodem
  for(let i=0;i<8;i++){ const u=ramp(t,tBl+i*0.15,1.6); if(u<=0) continue; const lx=300+hash(i*3)*260, ly=lerp(380,740+hash(i)*20,u); ctx.beginPath(); ctx.ellipse(lx+Math.sin(t*2+i)*10*(1-u),ly,12,6,i,0,6.283); shape(ctx,u<1?'#C9A35C':'#8C6A3A','#E0C080',1); }
  alpha(ctx,ramp(t,tR,0.6),()=>{ ctx.fillStyle=rgba('#3A2E24',0.85); ctx.fillRect(160,760,560,26); naamBij(ctx,'rijke bodem','',440,830,1,'center',C.oker); });
  // de steen: Lotte tilt hem op
  const op=ramp(t,tS,0.8);
  persoon(ctx,'lotte',800,860,380,{outfit:'zomer',pose:op>0.5?'vasthouden':'staan',uit:t>tP?'verbaasd':'neutraal',kijk:1,t});
  ctx.beginPath(); ctx.ellipse(1000,780,30,10,0,0,6.283); ctx.fillStyle=rgba('#2A2119',0.7*op); ctx.fill();
  alpha(ctx,op,()=>{ ctx.beginPath(); ctx.ellipse(1000,790,120,26,0,0,6.283); ctx.fillStyle='#2E3A2A'; ctx.fill(); });
  ctx.save(); ctx.translate(1000,770-op*130); ctx.rotate(op*0.3); ctx.beginPath(); ctx.ellipse(0,0,130,44,0,0,6.283); shape(ctx,'#8A8C90','#B0B4BA',2); ctx.restore();
  for(let i=0;i<4;i++){ const w=wander(i,t,8,0.8); pissebed(940+i*40+w.x,790+(i%2)*8,1,ramp(t,tP-0.2,0.4),hash(i)); }
  alpha(ctx,ramp(t,tV,0.4)*(1-ramp(t,tLe-0.5,0.4)),()=>{ for(let k=0;k<5;k++) dot(ctx,910+k*40,770-(k%2)*12,5,rgba(C.teal,0.8)); naamBij(ctx,'donker en vochtig','',1040,600,1,'center',C.teal); });
  // pissebed op het droge zand
  alpha(ctx,ramp(t,tDr-0.2,0.4),()=>{ pissebed(1560,820,1.4,1-0.65*ramp(t,tDr+1,1),0); thermo(1720,640,160,0.85,C.koraal,1,''); naamBij(ctx,'droog zand','droogt uit',1560,900-30,1,'center',C.koraal); });
  haak(ctx,160,720,560,'levend maakt de omgeving voor anderen',C.groen,ramp(t,tZo,0.5)); },
// ---- H3: het ijs smelt ----
s10(ctx,t,q){ const tW=q.at('warmer'), tSm=q.at('smelt'), tWa=q.at('Wat');
  const ijs=1-0.65*ramp(t,tSm,3); poolgebied(ijs,t); ijsbeer(900,642,1.05,t,{});
  thermo(220,420,220,lerp(0.12,0.35,ramp(t,tW,1.5)),C.koraal,ramp(t,tW,0.4),'warmer');
  pill(ctx,1460,250,'het ijs smelt eerder',C.teal,ramp(t,tSm,0.4),34);
  alpha(ctx,ramp(t,tWa,0.4),()=>text(ctx,'?',1250,420,fTitel(110),C.goud,'center')); },
// ---- H3: minder eten ----
s12(ctx,t,q){ const tL=q.at('land'), tM=q.at('maanden'), tA=q.at('aanpassen.'), tG=q.at('generaties,'), tE=q.at('Eén'), tB=q.at('biotisch:',2);
  poolgebied(0.3,t);
  // kust links
  ctx.fillStyle='#5A6450'; ctx.beginPath(); ctx.moveTo(0,560); ctx.quadraticCurveTo(300,540,520,600); ctx.lineTo(560,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
  ijsbeer(280,700,0.95,t,{mager:ramp(t,tM,2)});
  zeehond(1500,880,0.8,0.35,-1);
  naamBij(ctx,'op het land: bijna niets','',300,350,fadeIO(t,tL,tE,0.4),'center',C.text);
  pill(ctx,300,440,'maanden teren op zijn vet',C.oker,fadeIO(t,tM,tE,0.4),30);
  alpha(ctx,fadeIO(t,tA,tE,0.4),()=>{ pill(ctx,1300,300,'niet snel aanpassen',C.text,1,32); metaText(ctx,'pas over heel veel generaties',1300,380,C.grain,'center',24); });
  alpha(ctx,ramp(t,tE,0.5),()=>{ roundRect(ctx,780,160,440,110,16); shape(ctx,rgba(C.bgSchema,0.94),C.teal,2); text(ctx,'minder ijs',1000,212,fTekst(40,700),C.teal,'center'); metaText(ctx,'abiotisch',1000,250,C.text2,'center',22);
    arrow(ctx,1230,215,1360,215,C.line,4,16,ramp(t,tB-0.6,0.4));
    alpha(ctx,ramp(t,tB-0.4,0.4),()=>{ roundRect(ctx,1370,160,440,110,16); shape(ctx,rgba(C.bgSchema,0.94),C.groen,2); text(ctx,'minder eten',1590,212,fTekst(40,700),C.groen,'center'); metaText(ctx,'biotisch',1590,250,C.text2,'center',22); }); }); },
// ---- H3 uitdaging: rode vos en poolvos ----
s13(ctx,t,q){ const tP=q.at('poolvos.'), tR=q.at('rode',1), tE=q.at('eet'), tJ=q.at('jaagt'), tC=q.at('concurrentie.'), tBi=q.at('biotische');
  toendra(); const vlucht=ramp(t,tJ,2.5);
  vos(lerp(820,260,vlucht),800,1.4,t,{kleur:'#E4E8EC',a:ramp(t,0.2,0.5),loop:t>tJ&&t<tJ+2.5?1:0,dir:t>tJ?-1:1,punt:'#C9CED8'});
  naamBij(ctx,'poolvos','klein',lerp(820,260,vlucht),860-6,ramp(t,tP,0.4)*(1-ramp(t,tC-0.6,0.4)),'center',C.text);
  const rx=lerp(2100,1300,ramp(t,tR,2.5))-vlucht*240; vos(rx,800,1.9,t,{kleur:'#C8703A',loop:t>tR&&t<tR+2.5||(t>tJ&&t<tJ+2.5)?1:0,dir:-1});
  naamBij(ctx,'rode vos','groter · komt uit het zuiden',rx,860-6,ramp(t,tR+1,0.4)*(1-ramp(t,tC-0.6,0.4)),'center',C.koraal);
  alpha(ctx,ramp(t,tR,0.4)*(1-ramp(t,tE,0.4)),()=>{ arrow(ctx,1840,400,1560,400,C.koraal,4,16); metaText(ctx,'naar het noorden',1700,370,C.koraal,'center',22); });
  alpha(ctx,ramp(t,tE,0.4),()=>{ lemming(1180,540,1.6); lemming(1260,560,1.3); naamBij(ctx,'hetzelfde voedsel','lemmingen',1220,480,1-ramp(t,tC-0.6,0.4),'center',C.oker); });
  alpha(ctx,ramp(t,tC-0.3,0.5),()=>{ naamBij(ctx,'concurrentie','strijd om voedsel of plek',W/2,220,1,'center',C.goud); });
  alpha(ctx,ramp(t,tBi,0.4),()=>metaText(ctx,'ook een biotische factor',W/2,330,C.groen,'center',26)); },
// ---- samenvatting ----
s14(ctx,t,q){ const tR=q.at('redenen.'), tA=q.at('abiotisch.'), tB=q.at('biotisch.',2), tE=q.at('Elke'), tV=q.at('Verandert');
  bg(ctx,'schema'); ijsbeer(960,640,1.0,t,{a:1});
  alpha(ctx,ramp(t,tR-0.6,0.4),()=>{ roundRect(ctx,120,240,520,300,18); shape(ctx,rgba(C.bgSchema,0.95),C.teal,2); text(ctx,'abiotisch',380,300,fTekst(40,700),C.teal,'center'); thermo(250,480,140,0.9,C.koraal,1,''); text(ctx,'te warm voor',420,420,fTekst(32),C.text,'center'); text(ctx,'zijn vetlaag',420,462,fTekst(32),C.text,'center'); });
  alpha(ctx,ramp(t,tB-0.6,0.4),()=>{ roundRect(ctx,1280,240,520,300,18); shape(ctx,rgba(C.bgSchema,0.95),C.groen,2); text(ctx,'biotisch',1540,300,fTekst(40,700),C.groen,'center'); zeehond(1420,440,0.7,1,1); crossOut(ctx,1420,420,40,1); text(ctx,'geen',1640,420,fTekst(32),C.text,'center'); text(ctx,'zeehonden',1640,462,fTekst(32),C.text,'center'); });
  alpha(ctx,ramp(t,tA,0.3),()=>{});
  haak(ctx,120,1800,690,'elke soort leeft waar de factoren bij hem passen',C.groen,ramp(t,tE,0.5));
  alpha(ctx,ramp(t,tV,0.4),()=>metaText(ctx,'verandert er één, dan verandert er meer',W/2,830,C.grain,'center',26)); },
// ---- eindkaart ----
s15(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Probeer het zelf',120,200,fTitel(80),C.text); metaText(ctx,'wie woont waar',120,260,C.grain,'left',26);
  const P=[['Keuzebak','Doe tien pissebedden in een bak: één helft vochtig, één helft droog. Tel na tien minuten waar ze zitten. Doe het daarna met licht en donker.'],['Onder de steen','Til in de schooltuin een steen of plank op. Wat leeft eronder? Meet hoe vochtig en hoe warm het daar is, en ernaast.'],['Factorenjacht','Kies een plek op het schoolplein. Schrijf drie biotische en drie abiotische factoren op.']];
  P.forEach((p,i)=>{ const x=120+i*575; alpha(ctx,ramp(t,0.6+i*0.6,0.6),()=>{ roundRect(ctx,x,330,535,300,14); shape(ctx,rgba(C.bgSchema,0.95),C.line,1); text(ctx,p[0],x+28,392,fTekst(38,600),C.goud); ctx.font=fTekst(30); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,p[1],x+28,445,480,40); }); });
  alpha(ctx,ramp(t,2.6,0.6),()=>{ ctx.font=fTekst(36,600); ctx.fillStyle=C.goud; ctx.textAlign='left'; wrap(ctx,'Een kikker leeft bij een sloot. Noem twee abiotische en twee biotische factoren die voor hem belangrijk zijn.',120,720,1680,46); });
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.0 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
