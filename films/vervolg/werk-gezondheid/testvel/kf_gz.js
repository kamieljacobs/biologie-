// Keyframes twijfelblad gz1 (26 okt 2026)
function blokje(c, x, y, w, h, col, a=1){ c.save(); c.globalAlpha*=a; roundRect(c,x,y,w,h,5); c.fillStyle=rgba(col,0.85); c.fill(); c.strokeStyle=col; c.lineWidth=2; c.stroke(); c.restore(); }
function sirRun(R0, gamma, dagen, i0){ let S=1-i0,I=i0,Rr=0; const beta=R0*gamma, out=[]; for(let d=0; d<dagen; d++){ let nieuw=0; for(let k=0;k<10;k++){ const inf=beta*S*I/10; S-=inf; I+=inf-gamma*I/10; Rr+=gamma*I/10; nieuw+=inf; } out.push({S,I,R:Rr,nieuw}); } return out; }
const KF = {
 cast(c){ bg(c,'schema');
   const v=[['farid','A'],['farid_b','B'],['farid_c','C']];
   v.forEach(([id,l],i)=>{ const x=330+i*400; persoon(c,id,x,820,540,{uit:'blij'}); text(c,'Voorstel '+l,x,890,fTekst(40,700),C.text,'center'); });
   persoon(c,'yasmin',1600,820,470,{uit:'blij',kijk:-1}); text(c,'Yasmin (16)',1600,890,fTekst(40,700),C.text,'center');
   metaText(c,'EPIDEMIOLOOG FARID · ± 38 · ALLEEN IN ZIJN EIGEN VAK',960,120,C.grain,'center'); },
 herinnering(c){ bg(c,'schema');
   c.save(); roundRect(c,330,150,1260,690,22); c.fillStyle='rgba(120,92,58,0.22)'; c.fill(); c.lineWidth=10; c.strokeStyle='#B89A6A'; c.stroke(); c.clip();
   c.fillStyle='rgba(60,44,28,0.35)'; c.fillRect(330,560,1260,280);
   persoon(c,'yasmin',730,790,430,{pose:'zit',stoel:true,tafel:640,kijk:1,uit:'neutraal'});
   persoon(c,'bilal',1190,790,450,{pose:'zit',stoel:true,tafel:640,kijk:-1,uit:'neutraal'});
   c.fillStyle='#8A6A44'; c.fillRect(520,640,880,22); c.fillStyle='#EDE6D6'; c.fillRect(660,618,120,22); c.fillRect(1120,618,120,22);
   c.restore(); metaText(c,'MAART 2020',380,210,'#D8BE8C','left',30);
   text(c,'Herinneringskader: huidige Yasmin en Bilal, sepia rand',960,930,fTekst(34,600),C.text2,'center'); },
 dossier(c){ bg(c,'schema'); metaText(c,'DOSSIER UITBRAAK · OEFENDOSSIER · RONDE GETALLEN',160,110,C.grain,'left');
   const pos=[[300,330],[520,250],[520,440],[760,200],[760,330],[760,470],[980,260],[980,400],[1200,330],[1200,470]];
   const uit=[[0,1],[0,2],[1,3],[1,4],[2,5],[3,6],[4,6],[4,7],[5,7],[7,8],[7,9]];
   uit.forEach(([a,b])=>pijl(c,pos[a][0]+30,pos[a][1]+20,pos[b][0]-6,pos[b][1]+20,C.oker,1,4,14));
   pos.forEach(([x,y])=>blokje(c,x,y,60,40,C.koraal));
   regel(c,'R = gemiddeld aantal mensen dat één zieke besmet',160,680,1,C.goud,40,'left',700);
   metaText(c,'BRON- EN CONTACTONDERZOEK',160,740,C.grain,'left');
   persoon(c,'farid',1640,840,520,{pose:'wijs',kijk:-1}); persoon(c,'yasmin',1330,840,450,{kijk:1,uit:'verbaasd'}); },
 drempel(c){ bg(c,'schema'); metaText(c,'MODEL · R₀ = 3 · GEEN MAATREGELEN',160,110,C.grain,'left');
   const run=sirRun(3,0.2,100,0.0005); const x0=160,y0=620,w=1400,h=420; const mx=Math.max(...run.map(r=>r.nieuw));
   let kruis=run.findIndex(r=>r.R+r.I>=2/3);
   run.forEach((r,d)=>{ const bh=r.nieuw/mx*h; blokje(c,x0+d*w/100,y0-bh,w/100-3,Math.max(bh,1),C.koraal,0.9); });
   const kx=x0+kruis*w/100; c.save(); c.strokeStyle=C.goud; c.lineWidth=4; c.setLineDash([12,10]); c.beginPath(); c.moveTo(kx,y0-h-30); c.lineTo(kx,y0+10); c.stroke(); c.restore();
   tag(c,'VANAF HIER MINDER NIEUWE ZIEKEN',kx+20,y0-h-50,C.goud,1,'left',26);
   // balk immuun (besmet geweest of nu besmet)
   const by=700, eind=run[99].R; c.save(); roundRect(c,x0,by,w,46,10); c.fillStyle=rgba(C.teal,0.35); c.fill(); roundRect(c,x0,by,w*eind,46,10); c.fillStyle=rgba(C.groen,0.85); c.fill(); c.restore();
   c.save(); c.fillStyle=C.goud; c.fillRect(x0+w*2/3-3,by-14,6,74); c.restore();
   text(c,'drempel 2/3',x0+w*2/3,by+92,fTekst(30,600),C.goud,'center');
   text(c,'eindstand ± '+Math.round(eind*100)+' %',x0+w*eind,by+92,fTekst(30,600),C.groen,'center');
   metaText(c,'OOIT BESMET (IMMUUN OF NU ZIEK)',x0,by-20,C.grain,'left');
   regel(c,'DOORSCHIETEN',x0+w*2/3+40,by+36,1,C.text,28,'left',700); }
};
