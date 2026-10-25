// ===== 32B film 7 — Stambomen en de grote stappen in de evolutie =====
// Rode draad: Daan in het natuurmuseum. Stamboom = Schema met takken (#8FA0B5), splitsing = voorouder (goud stip); kenmerken = groen vinkje; DNA = paars; tijdlijn met vier stappen.
function icoon(naam,x,y,s=1,a=1){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const B='#B08A5C', G='#9AA3B2';
  if(naam==='mens'){ ctx.restore(); persoon(ctx,'daan',x,y+60*s,130*s,{t:0}); return; }
  if(naam==='chimp'){ ctx.fillStyle='#4A3A2C'; ctx.beginPath(); ctx.ellipse(0,0,30,36,0,0,6.283); ctx.fill(); ctx.beginPath(); ctx.arc(0,-46,22,0,6.283); ctx.fill(); ctx.fillStyle='#C9A07A'; ctx.beginPath(); ctx.ellipse(0,-42,14,12,0,0,6.283); ctx.fill(); dot(ctx,-6,-48,2.5,'#1A1410'); dot(ctx,6,-48,2.5,'#1A1410'); ctx.strokeStyle='#4A3A2C'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-26,-10); ctx.lineTo(-40,40); ctx.moveTo(26,-10); ctx.lineTo(40,40); ctx.moveTo(-14,30); ctx.lineTo(-18,60); ctx.moveTo(14,30); ctx.lineTo(18,60); ctx.stroke(); }
  if(naam==='muis'){ ctx.beginPath(); ctx.ellipse(0,20,34,22,0,0,6.283); shape(ctx,G,'#C9CED8',1.2); ctx.beginPath(); ctx.ellipse(30,10,18,14,0,0,6.283); shape(ctx,G,'#C9CED8',1.2); dot(ctx,26,-4,9,'#B8BEC8'); dot(ctx,40,6,2.5,'#1A1410'); ctx.strokeStyle=G; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-34,20); ctx.quadraticCurveTo(-60,0,-66,26); ctx.stroke(); }
  if(naam==='kip'){ ctx.beginPath(); ctx.ellipse(0,10,36,28,0,0,6.283); shape(ctx,'#E8E2D4','#F2F2EE',1.2); ctx.beginPath(); ctx.arc(30,-20,15,0,6.283); shape(ctx,'#E8E2D4','#F2F2EE',1.2); ctx.fillStyle='#D8574A'; ctx.beginPath(); ctx.arc(30,-38,7,0,6.283); ctx.fill(); ctx.fillStyle='#E0B64A'; ctx.beginPath(); ctx.moveTo(44,-22); ctx.lineTo(56,-18); ctx.lineTo(44,-14); ctx.fill(); dot(ctx,34,-23,2.5,'#1A1410'); ctx.strokeStyle='#E0B64A'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-6,36); ctx.lineTo(-8,58); ctx.moveTo(8,36); ctx.lineTo(10,58); ctx.stroke(); }
  if(naam==='vleermuis'){ ctx.fillStyle='#5A4A40'; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-40,-40,-80,-10); ctx.quadraticCurveTo(-60,0,-50,14); ctx.quadraticCurveTo(-30,4,0,20); ctx.quadraticCurveTo(30,4,50,14); ctx.quadraticCurveTo(60,0,80,-10); ctx.quadraticCurveTo(40,-40,0,0); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,6,14,20,0,0,6.283); ctx.fillStyle='#7A6450'; ctx.fill(); dot(ctx,-4,-6,2,'#F2F2EE'); dot(ctx,4,-6,2,'#F2F2EE'); }
  if(naam==='vogel'){ ctx.beginPath(); ctx.ellipse(0,0,34,20,0,0,6.283); shape(ctx,'#5BA4C9','#8FC8E0',1.2); ctx.beginPath(); ctx.moveTo(-10,-6); ctx.lineTo(-40,-50); ctx.lineTo(16,-10); ctx.fillStyle='#4A8BB0'; ctx.fill(); dot(ctx,30,-10,12,'#5BA4C9'); dot(ctx,34,-12,2.5,'#1A1410'); ctx.fillStyle='#E0B64A'; ctx.beginPath(); ctx.moveTo(42,-10); ctx.lineTo(56,-6); ctx.lineTo(42,-2); ctx.fill(); }
  if(naam==='walvis'){ ctx.beginPath(); ctx.ellipse(0,0,90,32,0,0,6.283); shape(ctx,'#4E6A88','#7A96B4',1.5); ctx.fillStyle='#4E6A88'; ctx.beginPath(); ctx.moveTo(-84,0); ctx.lineTo(-120,-26); ctx.lineTo(-112,0); ctx.lineTo(-120,26); ctx.fill(); dot(ctx,60,-6,3,'#1A1410'); ctx.strokeStyle='#C9E0F0'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(20,-32); ctx.lineTo(16,-56); ctx.moveTo(20,-32); ctx.lineTo(28,-54); ctx.stroke(); }
  if(naam==='nijlpaard'){ ctx.beginPath(); ctx.ellipse(0,0,70,40,0,0,6.283); shape(ctx,'#8A7A88','#B0A0B0',1.5); ctx.beginPath(); ctx.ellipse(70,-6,34,26,0,0,6.283); shape(ctx,'#8A7A88','#B0A0B0',1.5); dot(ctx,72,-20,3,'#1A1410'); ctx.fillStyle='#8A7A88'; [-40,-14,20,44].forEach(dx=>ctx.fillRect(dx,30,16,26)); }
  if(naam==='vis'){ ctx.beginPath(); ctx.ellipse(0,0,50,22,0,0,6.283); shape(ctx,'#C9A35C','#E0C48A',1.5); ctx.beginPath(); ctx.moveTo(-46,0); ctx.lineTo(-74,-20); ctx.lineTo(-74,20); ctx.closePath(); ctx.fillStyle='#B08A5C'; ctx.fill(); dot(ctx,32,-6,3,'#1A1410'); }
  ctx.restore(); }); }
// stamboom: bladeren [{naam,x}], splitsingen [{x,y,kids:[i..]}] ; tekent takken van wortel omhoog
function boom(leaves,nodes,yTop,yRoot,a=1,hl=null,groei=1){ alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.lineCap='round';
  nodes.forEach((n,k)=>{ if(groei<(k+1)/nodes.length*0.9) return; n.kids.forEach(c=>{ const tx=c.leaf!=null?leaves[c.leaf].x:nodes[c.node].x, ty=c.leaf!=null?yTop:nodes[c.node].y; ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(tx,n.y); ctx.lineTo(tx,ty); ctx.stroke(); }); });
  if(nodes.length) { ctx.beginPath(); ctx.moveTo(nodes[0].x,yRoot); ctx.lineTo(nodes[0].x,nodes[0].y); ctx.stroke(); }
  nodes.forEach((n,k)=>{ if(groei<(k+1)/nodes.length*0.9) return; dot(ctx,n.x,n.y,hl===k?12:8,hl===k?C.goud:C.line,hl===k?'#F2D27A':null,2); }); }); }
function vink(x,y,ok,a=1){ alpha(ctx,a,()=>{ ctx.strokeStyle=ok?C.groen:C.koraal; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); if(ok){ ctx.moveTo(x-12,y); ctx.lineTo(x-3,y+10); ctx.lineTo(x+14,y-12); } else { ctx.moveTo(x-10,y-10); ctx.lineTo(x+10,y+10); ctx.moveTo(x+10,y-10); ctx.lineTo(x-10,y+10); } ctx.stroke(); }); }
function museum(){ bg(ctx,'schema'); ctx.fillStyle='#22324E'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#2A3A58'; ctx.fillRect(0,820,W,H-820); ctx.strokeStyle=rgba(C.line,0.35); ctx.lineWidth=2; for(let x=0;x<W;x+=320){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,820); ctx.stroke(); } }
const TL={x0:200,x1:1720,y:560}; const tx=(mrd)=>TL.x0+(TL.x1-TL.x0)*(1-mrd/4.0); // mrd = miljard jaar geleden
function tijdlijn(t,a=1,stappen=[]){ alpha(ctx,a,()=>{ ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(TL.x0,TL.y); ctx.lineTo(TL.x1,TL.y); ctx.stroke(); arrow(ctx,TL.x1-20,TL.y,TL.x1+20,TL.y,C.line,3,14);
  [4,3,2,1,0].forEach(m=>{ ctx.beginPath(); ctx.moveTo(tx(m),TL.y-10); ctx.lineTo(tx(m),TL.y+10); ctx.stroke(); metaText(ctx,m===0?'nu':`${m} mrd jaar`,tx(m),TL.y+50,C.grain,'center',22); });
  stappen.forEach(([m,lab,kleur,al,omhoog])=>{ if(al<=0.01) return; alpha(ctx,al,()=>{ dot(ctx,tx(m),TL.y,12,kleur,lighten(kleur,0.3),2); const yy=omhoog?TL.y-160:TL.y-90; ctx.strokeStyle=kleur; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(tx(m),TL.y-12); ctx.lineTo(tx(m),yy+20); ctx.stroke(); text(ctx,lab,tx(m),yy,fTekst(30,700),kleur,'center'); }); }); }); }
function prokaryoot(x,y,s,a=1){ alpha(ctx,a,()=>{ roundRect(ctx,x-50*s,y-24*s,100*s,48*s,24*s); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.35),1.6); ctx.strokeStyle=rgba(C.paars,0.8); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(x,y,22*s,10*s,0.3,0,6.283); ctx.stroke(); }); }
function eukaryoot(x,y,s,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.ellipse(x,y,70*s,54*s,0,0,6.283); shape(ctx,rgba('#AFC0D0',0.12),C.er,1.8); dot(ctx,x-10*s,y,22*s,rgba(C.paars,0.6),C.kernR,1.5); mitochondrion(ctx,x+36*s,y+18*s,34*s,0.4,1); }); }
function pantoffel(x,y,s,a=1,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(0.2); ctx.beginPath(); ctx.ellipse(0,0,70*s,28*s,0,0,6.283); shape(ctx,rgba(C.teal,0.3),lighten(C.teal,0.3),1.6); ctx.strokeStyle=lighten(C.teal,0.3); ctx.lineWidth=1; for(let k=0;k<22;k++){ const an=k/22*6.283; const w=Math.sin(t*10+k)*3; ctx.beginPath(); ctx.moveTo(Math.cos(an)*70*s,Math.sin(an)*28*s); ctx.lineTo(Math.cos(an)*(78*s+w),Math.sin(an)*(34*s+w)); ctx.stroke(); } dot(ctx,0,0,10*s,rgba(C.paars,0.6)); ctx.restore(); }); }

const LEAVES=[{naam:'kip',x:420},{naam:'muis',x:780},{naam:'chimp',x:1140},{naam:'mens',x:1500}];
const NODES=[{x:600,y:780,kids:[{leaf:0},{node:1}]},{x:960,y:640,kids:[{leaf:1},{node:2}]},{x:1320,y:480,kids:[{leaf:2},{leaf:3}]}];
function grootBoom(t,a=1,hl=null,groei=1,yTop=300){ boom(LEAVES,NODES,yTop,860,a,hl,groei); LEAVES.forEach(l=>icoon(l.naam,l.x,yTop-70,1,a)); }

const SCENES={
// ---- cold open ----
s01(ctx,t,q){ museum(); const tB=q.at('boom'), tM=q.at('mens,'), tW=q.at('Wie');
  alpha(ctx,ramp(t,tB-0.3,0.6),()=>{ ctx.fillStyle=rgba(C.bgSchema,0.9); roundRect(ctx,320,90,1300,700,20); ctx.fill(); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.stroke(); grootBoom(t,1,null,1,300); });
  persoon(ctx,'daan',190,980,560,{pose:'wijs',uit:'denkt',kijk:1,t}); vraagteken(1720,420,ramp(t,tW,0.4)); },
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); alpha(ctx,ramp(t,0.1,0.7),()=>{ text(ctx,'Stambomen',120,300,fTitel(92),C.text); text(ctx,'en de grote stappen in de evolutie',120,370,fTekst(44,600),C.text2); text(ctx,'Hoe lees je een stamboom?',120,440,fTekst(40),C.text2); });
  ctx.save(); ctx.translate(560,120); ctx.scale(0.65,0.65); boom(LEAVES,NODES,300,860,ramp(t,0.3,0.6),null,ramp(t,0.3,2)); ctx.restore();
  metaText(ctx,'ONDERBOUW · KERNDOEL 32B · FILM 7',W-80,60,C.text2,'right',24); },
// ---- H1: stamboom lezen ----
s04(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('Onderaan'), tB=q.at('Bovenaan'), tS=q.at('splitsing'), tD=q.at('dichter'), tMe=q.at('Mens'), tR=q.at('recente'), tK=q.at('kip');
  const hl = t>tK-0.3?0 : t>tMe-0.3?2 : t>tS-0.3?1 : null; grootBoom(t,1,hl,1,300);
  alpha(ctx,ramp(t,tO-0.2,0.4),()=>{ metaText(ctx,'lang geleden',160,860,C.grain,'left',24); arrow(ctx,140,860,140,260,C.line,2,12); }); alpha(ctx,ramp(t,tB-0.2,0.4),()=>metaText(ctx,'nu',160,240,C.grain,'left',24));
  alpha(ctx,ramp(t,tS-0.2,0.4)*(1-ramp(t,tMe-0.4,0.3)),()=>naamBij(ctx,'splitsing = voorouder','',960,700,1,'left',C.goud));
  alpha(ctx,ramp(t,tMe-0.2,0.4)*(1-ramp(t,tK-0.4,0.3)),()=>naamBij(ctx,'recente gezamenlijke voorouder','',1340,540,1,'left',C.goud));
  alpha(ctx,ramp(t,tK-0.2,0.4),()=>naamBij(ctx,'kip: splitst heel vroeg af','',620,820,1,'left',C.goud)); },
// ---- H1: niet van de chimpansee ----
s05(ctx,t,q){ bg(ctx,'schema'); const tN=q.at('niet'), tV=q.at('voorouder,');
  icoon('chimp',1140,360,1.4); persoon(ctx,'daan',1500,470,220,{t}); ctx.strokeStyle=C.line; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(1140,480); ctx.lineTo(1140,640); ctx.lineTo(1320,640); ctx.lineTo(1500,640); ctx.lineTo(1500,480); ctx.moveTo(1320,640); ctx.lineTo(1320,800); ctx.stroke();
  alpha(ctx,ramp(t,tN-0.2,0.4),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=4; ctx.setLineDash([12,8]); ctx.beginPath(); ctx.moveTo(1180,330); ctx.quadraticCurveTo(1320,220,1460,320); ctx.stroke(); ctx.setLineDash([]); crossOut(ctx,1320,250,30,1); text(ctx,'mens stamt af van chimpansee',520,300,fTekst(34,700),C.koraal,'center'); crossOut(ctx,520,290,0,0); ctx.strokeStyle=C.koraal; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(280,290); ctx.lineTo(760,290); ctx.stroke(); });
  alpha(ctx,ramp(t,tV-0.4,0.5),()=>{ dot(ctx,1320,640,14,C.goud,'#F2D27A',2); naamBij(ctx,'gezamenlijke voorouder','zag er anders uit',1320,720,1,'center',C.goud); text(ctx,'samen één voorouder',520,420,fTekst(34,700),C.groen,'center'); }); },
// ---- H2: kenmerken en DNA ----
s06(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('haren?'), tR=q.at('ruggengraat?'), tM=q.at('Melk'), tDN=q.at('DNA.'), tL=q.at('letters'), tV=q.at('vleermuis'), tIs=q.at('Is',2);
  if(t<tV-0.3){ const dieren=['kip','muis','chimp','mens'], ken=[['haren',[0,1,1,1],tH],['ruggengraat',[1,1,1,1],tR],['melk voor de jongen',[0,1,1,1],tM]];
    dieren.forEach((d,i)=>icoon(d,700+i*260,230,0.9)); ken.forEach(([k,v,tt],r)=>{ alpha(ctx,ramp(t,tt-0.2,0.4),()=>{ text(ctx,k,560,380+r*110,fTekst(32,700),C.text,'right'); v.forEach((ok,i)=>vink(700+i*260,370+r*110,ok,1)); }); });
    alpha(ctx,ramp(t,tDN-0.3,0.4),()=>{ text(ctx,'DNA',560,720,fTekst(32,700),C.paars,'right'); const seq=['ACGTTA','ATGTCA','ATGCCA','ATGCCA']; seq.forEach((s,i)=>{ const sx=640+i*260; s.split('').forEach((L,j)=>{ const same=L==='ATGCCA'[j]; roundRect(ctx,sx+j*28,690,24,40,5); shape(ctx,same&&t>tL?rgba(C.groen,0.35):rgba(C.paars,0.35),same&&t>tL?C.groen:'#A392D6',1.2); text(ctx,L,sx+j*28+12,718,fMeta(20),C.text,'center'); }); }); }); return; }
  icoon('vleermuis',W/2,420,2.2); icoon('vogel',420,420,1.6); icoon('muis',1500,440,1.6); text(ctx,'vogel',420,560,fTekst(32,600),C.text,'center'); text(ctx,'muis',1500,560,fTekst(32,600),C.text,'center'); text(ctx,'vleermuis',W/2,560,fTekst(32,600),C.text,'center');
  alpha(ctx,ramp(t,tIs-0.2,0.4),()=>{ arrow(ctx,800,420,560,420,C.line,2,12); arrow(ctx,1120,420,1360,420,C.line,2,12); vraagteken(W/2,250,1,90); }); },
// ---- H2: antwoord ----
s08(ctx,t,q){ bg(ctx,'schema'); const tH=q.at('haren'), tD=q.at('DNA'), tA=q.at('apart');
  const L2=[{naam:'vogel',x:520},{naam:'vleermuis',x:1080},{naam:'muis',x:1400}], N2=[{x:800,y:760,kids:[{leaf:0},{node:1}]},{x:1240,y:560,kids:[{leaf:1},{leaf:2}]}];
  boom(L2,N2,340,860,1,ramp(t,tH,0.4)>0.5?1:null,1); L2.forEach(l=>icoon(l.naam,l.x,250,l.naam==='vleermuis'?1.3:1.1));
  alpha(ctx,ramp(t,tH-0.2,0.4),()=>{ ctx.strokeStyle=C.groen; ctx.lineWidth=3; roundRect(ctx,940,150,580,260,20); ctx.stroke(); text(ctx,'zoogdieren: haren, melk',1230,450,fTekst(32,700),C.groen,'center'); });
  alpha(ctx,ramp(t,tD-0.2,0.4),()=>text(ctx,'DNA lijkt meer op de muis',1230,500,fTekst(30,600),C.paars,'center'));
  alpha(ctx,ramp(t,tA-0.4,0.5),()=>{ naamBij(ctx,'vleugels apart ontstaan','',800,170,1,'center',C.goud); }); },
// ---- uitdaging: walvis ----
s09(ctx,t,q){ bg(ctx,'schema'); const tV=q.at('vis.',2), tL=q.at('lucht'), tD=q.at('DNA',2), tN=q.at('naast');
  const opUiterlijk=1-ramp(t,tN-0.6,1.2);
  icoon('walvis',W/2,lerp(560,250,1-opUiterlijk),1.4); icoon('vis',lerp(560,420,1-opUiterlijk),560,1.4,1); icoon('nijlpaard',lerp(1380,1500,1-opUiterlijk),lerp(260,250,0),1.3);
  alpha(ctx,ramp(t,tV-0.3,0.4)*opUiterlijk,()=>{ text(ctx,'lijkt op een vis',W/2,720,fTekst(34,700),C.text2,'center'); });
  alpha(ctx,ramp(t,tL-0.3,0.4),()=>{ pill(ctx,320,200,'ademt lucht',C.groen,1,28); pill(ctx,320,280,'geeft melk',C.groen,1,28); });
  alpha(ctx,ramp(t,tD-0.3,0.4),()=>{ genStreep(1220,600,400,30,1,-1,0,[C.paars,'#A392D6',C.paars,'#6E5A9E',C.paars]); genStreep(1220,640,400,30,1,-1,0,[C.paars,'#A392D6',C.paars,'#6E5A9E','#A392D6']); text(ctx,'DNA walvis ≈ nijlpaard',1420,720,fTekst(30,700),C.paars,'center'); });
  alpha(ctx,ramp(t,tN-0.3,0.5),()=>{ haak(ctx,W/2-160,1640,800-500+40,'verwant aan het nijlpaard, niet aan de vis',C.groen,0); ctx.fillStyle=rgba(C.bgSchema,0.94); roundRect(ctx,560,120,800,80,14); ctx.fill(); text(ctx,'verwant aan het nijlpaard, niet aan de vis',W/2,172,fTekst(34,700),C.groen,'center'); }); },
// ---- H3: tijdlijn deel 1 ----
s10(ctx,t,q){ bg(ctx,'schema'); const tE=q.at('eerste',1), tV=q.at('vier'), tR=q.at('RNA'), tDN=q.at('DNA',1), tS=q.at('steviger'), tB=q.at('bacterie-achtige'), tEu=q.at('eukaryoten.'), tO=q.at('Onze');
  const st=[[3.9,'eerste cellen',C.groen,ramp(t,tE-0.3,0.4),false],[3.6,'RNA → DNA',C.paars,ramp(t,tDN-0.3,0.4),true],[2.0,'cellen met een kern',C.goud,ramp(t,tEu-0.3,0.4),false]];
  tijdlijn(t,1,st); text(ctx,'de grote stappen',W/2,150,fTitel(52),C.text,'center');
  alpha(ctx,ramp(t,tR-0.2,0.4)*(1-ramp(t,tB-0.5,0.4)),()=>{ kaart(560,700,800,150,C.paars,1); text(ctx,'RNA',760,790,fTitel(48),'#A392D6','center'); arrow(ctx,850,775,1000,775,C.paars,3,14); text(ctx,'DNA',1120,790,fTitel(48),C.paars,'center'); alpha(ctx,ramp(t,tS,0.4),()=>metaText(ctx,'steviger',1240,790,C.grain,'left',22)); metaText(ctx,'waarschijnlijk',760,830,C.grain,'center',20); });
  alpha(ctx,ramp(t,tB-0.3,0.4),()=>{ prokaryoot(640,780,1.2); text(ctx,'zonder kern',640,860,fTekst(26,600),C.text,'center'); });
  alpha(ctx,ramp(t,tEu-0.3,0.4),()=>{ eukaryoot(1180,770,1.1); text(ctx,'eukaryoot: met kern',1180,860,fTekst(26,600),C.goud,'center'); });
  alpha(ctx,ramp(t,tO-0.2,0.4),()=>persoon(ctx,'daan',1540,880,240,{uit:'blij',t})); },
// ---- H3: tijdlijn deel 2 ----
s11(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('ongeslachtelijk'), tG=q.at('geslachtelijke'), tE=q.at('één'), tP=q.at('pantoffeldiertjes.'), tS=q.at('samenwerken.'), tM=q.at('meercellige'), tPl=q.at('Planten,');
  const st=[[3.9,'eerste cellen',C.groen,1,false],[3.6,'RNA → DNA',C.paars,1,true],[2.0,'cellen met een kern',C.goud,1,false],[1.2,'twee ouders',C.koraal,ramp(t,tG-0.3,0.4),true],[0.8,'meercellig',C.teal,ramp(t,tM-0.3,0.4),false]];
  tijdlijn(t,1,st); text(ctx,'de grote stappen',W/2,150,fTitel(52),C.text,'center');
  alpha(ctx,ramp(t,tO-0.3,0.4)*(1-ramp(t,tP-0.6,0.3)),()=>{ eicel(900,780,40,1); text(ctx,'+',980,795,fTekst(44,700),C.text,'center'); zaadcel(1050,780,1.8,1,Math.PI,t); });
  alpha(ctx,ramp(t,tP-0.4,0.4),()=>{ pantoffel(560,790,1.1,1,t); text(ctx,'pantoffeldiertje: één cel',560,870,fTekst(26,600),C.text,'center'); });
  alpha(ctx,ramp(t,tS-0.3,0.4),()=>{ for(let i=0;i<9;i++){ const c=i%3, r=Math.floor(i/3); ctx.beginPath(); ctx.arc(1080+c*36,740+r*36,17,0,6.283); shape(ctx,rgba(C.teal,0.3),lighten(C.teal,0.3),1.4); } });
  alpha(ctx,ramp(t,tPl-0.2,0.4),()=>{ icoon('vis',1440,790,0.9); oak(ctx,1620,860,0.25); }); },
// ---- H3: vraag laatste stap ----
s12(ctx,t,q){ bg(ctx,'schema'); const st=[[3.9,'?',C.text2,1,false],[3.6,'?',C.text2,1,true],[2.0,'?',C.text2,1,false],[1.2,'?',C.text2,1,true],[0.8,'?',C.text2,1,false]]; tijdlijn(t,1,st); vraagteken(W/2,300,ramp(t,q.at('Welke'),0.4)); },
s14(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('Organismen'), tE=q.at('Eerst'), tD=q.at('Dieren');
  const st=[[3.6,'DNA',C.paars,ramp(t,tE,0.3),true],[2.0,'celkern',C.goud,ramp(t,tE+1,0.3),false],[0.8,'meercellig',C.teal,ramp(t,tO-0.3,0.4),true]]; tijdlijn(t,1,st);
  alpha(ctx,ramp(t,tD-0.3,0.4),()=>{ ctx.fillStyle=rgba(C.goud,0.25); ctx.fillRect(tx(0.6),TL.y-30,tx(0)-tx(0.6),60); text(ctx,'dieren',(tx(0.6)+tx(0))/2,TL.y+110,fTekst(30,700),C.goud,'center'); metaText(ctx,'laatste ± 1/6 van de tijd',(tx(0.6)+tx(0))/2,TL.y+150,C.grain,'center',20); }); },
// ---- samenvatting ----
s15(ctx,t,q){ bg(ctx,'schema'); const tS=q.at('stamboom'), tB=q.at('bouwen'), tG=q.at('grote'), tD=q.at('Daan.');
  alpha(ctx,ramp(t,tS-0.2,0.4),()=>{ kaart(120,170,820,520,C.line,1); ctx.save(); ctx.translate(140,110); ctx.scale(0.5,0.5); grootBoom(t,1,2,1,300); ctx.restore(); text(ctx,'splitsing = gezamenlijke voorouder',530,640,fTekst(28,700),C.goud,'center'); });
  alpha(ctx,ramp(t,tB-0.2,0.4),()=>{ pill(ctx,370,760,'kenmerken',C.groen,1,28); pill(ctx,690,760,'DNA',C.paars,1,28); });
  alpha(ctx,ramp(t,tG-0.2,0.4),()=>{ kaart(1000,170,800,520,C.line,1); ['RNA → DNA','cellen met een kern','twee ouders','meer cellen samen'].forEach((s,i)=>{ const c=[C.paars,C.goud,C.koraal,C.teal][i]; dot(ctx,1080,260+i*100,12,c); text(ctx,s,1110,270+i*100,fTekst(32,700),c,'left'); }); });
  alpha(ctx,ramp(t,tD-0.6,0.4),()=>persoon(ctx,'daan',1660,690,300,{uit:'lacht',t})); },
// ---- eindkaart ----
s16(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Een stamboom laat zien wie met wie verwant is.','Elke splitsing is een gezamenlijke voorouder.','Het leven ging in grote stappen van één cel tot de mens.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.1 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
function eicel(x,y,r,a=1){ alpha(ctx,a,()=>{ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); shape(ctx,rgba(C.oker,0.35),lighten(C.oker,0.35),2); dot(ctx,x-r*0.15,y-r*0.1,r*0.28,rgba(C.paars,0.7),C.kernR,1.2); }); }
function zaadcel(x,y,s=1,a=1,ang=0,t=0){ alpha(ctx,a,()=>{ ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,14*s,9*s,0,0,6.283); shape(ctx,rgba(C.teal,0.6),lighten(C.teal,0.35),1.5); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=2*s; ctx.beginPath(); ctx.moveTo(-14*s,0); for(let k=1;k<=10;k++) ctx.lineTo(-14*s-k*6*s,Math.sin(t*14+k*0.9)*5*s*(k/10)); ctx.stroke(); ctx.restore(); }); }
