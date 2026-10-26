const T = (c,s,x,y,px=36,col=C.text,al='center')=>text(c,s,x,y,fTekst(px,600),col,al);
const KF = {
 k1(c){ bg(c,'schema'); metaText(c,'CASTVOORSTEL · DIËTIST HANNEKE (NIEUW) · JOOST (FIGURANT, OUTFIT SPREEKUUR)',960,110,C.grain,'center',26);
   [['hanneke','A · voorkeur','krullen, groen vest'],['hanneke_b','B','knot, bril, blouse'],['hanneke_c','C','staart, okergele trui']].forEach(([id,l,l2],i)=>{ const x=260+i*340; persoon(c,id,x,800,500,{uit:'blij'}); T(c,l,x,860,32); T(c,l2,x,904,26,C.text2); });
   persoon(c,'joost',1360,800,500,{uit:'neutraal'}); T(c,'Joost · gewoon',1360,860,30); persoon(c,'joost',1680,800,500,{uit:'neutraal',outfit:'spreekuur'}); T(c,'Joost · spreekuur',1680,860,30); },
 k2(c){ bg(c,'schema'); metaText(c,'FILM 1 · H1 · DE PRAKTIJK (HIER OP NAVY; MET DECOR ACHTER DE TAFEL)',960,110,C.grain,'center',26);
   persoon(c,'hanneke',640,880,470,{pose:'zit',stoel:true,kijk:1,uit:'blij'}); persoon(c,'joost',1280,880,480,{pose:'zit',stoel:true,kijk:-1,outfit:'spreekuur'}); tafel(c, 960, 700, 1000);
   eetdagboek(c,960,640,0.55,{iconen:1}); persoon(c,'noor',1720,880,440,{kijk:-1,uit:'neutraal'}); naamBij(c,'Diëtist Hanneke','diëtist',470,300,1); naamBij(c,'Joost','cliënt',1340,300,1); naamBij(c,'Noor','loopt een dag mee',1610,380,1); },
 k3(c){ bg(c,'schema'); metaText(c,'FILM 1 · H3 · ZIJN REDEN: FOTO OP DE TELEFOON',960,110,C.grain,'center',26);
   telefoonFoto(c, 640, 480, 1.6, {kind:'fleur'}); T(c,'A · kleindochter (castboek Fleur) bij haar fiets',640,820,30);
   telefoonFoto(c, 1280, 480, 1.6, {}); T(c,'B · alleen het fietsje',1280,820,30); },
 k4(c){ bg(c,'schema'); metaText(c,'FILM 1 · H2 · SCHIJF VAN VIJF ALS EIGEN SCHEMA (GEEN LOGO, GEEN NUMMERS)',960,110,C.grain,'center',26);
   schijf(c, 760, 500, 290, {namen:1, lit:[1,0,0,0,0], dim:0.4}); metaText(c,'VERNIEUWD · APRIL 2026 · VOEDINGSCENTRUM',1500,300,C.grain,'center',24);
   roundRect(c,1300,360,400,90,10); shape(c, rgba(C.fill,0.6), C.line, 1.2); T(c,'250 g groente + 2 stuks fruit',1500,418,32); metaText(c,'PER DAG · VOEDINGSCENTRUM',1500,488,C.text2,'center',22); },
 k5(c){ bg(c,'schema'); metaText(c,'FILM 2 · COLD OPEN · DE RIEM (GEEN WEEGSCHAAL, GEEN GETAL)',960,110,C.grain,'center',26);
   persoon(c,'joost',560,880,560,{outfit:'spreekuur',uit:'neutraal'}); zoomCircle(c, 1180, 470, 260, 560, 560, 'EEN GAATJE STRAKKER', 1, ()=>{ bg(c,'schema'); riem(c, 940, 470, 520, {gat:3}); });
   gewichtCurve(c, 1480, 640, 360, 200, {u:0.6}); },
 k6(c){ bg(c,'schema'); metaText(c,'FILM 2 · H2 · TWEE VOLWASSENEN, ALLEBEI INDEX 26 (FIGURANTEN DENNIS EN ERIK)',960,110,C.grain,'center',26);
   persoon(c,'dennis',420,860,520,{outfit:'sport',uit:'blij'}); chip(c,'26',420,250,C.goud,1,34); persoon(c,'erik',1240,860,520,{uit:'neutraal'}); chip(c,'26',1240,250,C.goud,1,34);
   zoomCircle(c, 760, 500, 170, 450, 520, 'SPIEREN', 1, ()=>{ bg(c,'schema'); spierBundel(c, 640, 420, 240, {n:6}); });
   zoomCircle(c, 1580, 500, 170, 1250, 600, 'VET ROND DE ORGANEN', 1, ()=>{ bg(c,'schema'); vetweefsel(c, 1430, 380, 300, 240, {}); }); },
 k7(c){ bg(c,'schema'); metaText(c,'FILM 2 · H3 · JOOST EN ZIJN BUURMAN (ERIK): ZELFDE GEWICHT, ANDER RUSTVERBRUIK · MODEL',960,110,C.grain,'center',26);
   persoon(c,'joost',560,860,520,{uit:'neutraal'}); persoon(c,'erik',960,860,520,{uit:'blij',kijk:-1});
   roundRect(c,1300,600-120,120,120,8); shape(c, rgba(C.koraal,0.6), C.koraal, 1.5); roundRect(c,1480,600-170,120,170,8); shape(c, rgba(C.koraal,0.6), C.koraal, 1.5);
   c.setLineDash([8,6]); c.strokeStyle=C.text2; c.strokeRect(1300,600-170,120,170); c.setLineDash([]); metaText(c,'JOOST',1360,640,C.text2,'center',22); metaText(c,'BUURMAN',1540,640,C.text2,'center',22); metaText(c,'RUSTVERBRUIK',1450,380,C.grain,'center',24); },
 k8(c){ bg(c,'schema'); metaText(c,'FILM 2 · H3 · HONGER: MAAG, VETCEL EN HERSENEN IN ZOOMCIRKELS NAAST HET LICHAAM',960,110,C.grain,'center',26);
   persoon(c,'joost',300,880,560,{uit:'neutraal',outfit:'spreekuur'});
   zoomCircle(c, 1440, 380, 230, 330, 380, 'HYPOTHALAMUS', 1, ()=>{ bg(c,'schema'); hersenenHth(c, 1400, 340, 0.5, {hth:1}); });
   zoomCircle(c, 760, 560, 190, 330, 600, 'MAAG · GHRELINE', 1, ()=>{ bg(c,'schema'); maagGhreline(c, 760, 560, 1.0, {ghreline:1, t:1}); });
   zoomCircle(c, 1080, 760, 120, 330, 690, 'VETCEL · LEPTINE', 1, ()=>{ bg(c,'schema'); vetcelLeptine(c, 1080, 760, 70, {leptine:1, t:1, n:8}); }); }
};
