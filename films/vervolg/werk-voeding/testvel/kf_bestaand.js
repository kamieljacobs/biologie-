const KF = {
 best(c){ bg(c,'schema');
   hoofdHersenen(c, 300, 330, 1.4, {hth:1}); text(c,'hoofdHersenen hth',300,600,fTekst(30),C.text2,'center');
   maagVorm(c, 760, 300, 1.2); text(c,'maagVorm',760,600,fTekst(30),C.text2,'center');
   vetcel(c, 1150, 330, 110, {}); text(c,'vetcel',1150,600,fTekst(30),C.text2,'center');
   fiets(c, 1550, 360, 1.6); text(c,'fiets',1550,600,fTekst(30),C.text2,'center');
   ['vlees','kaas','melk','brood','bonen','tofu','blikje'].forEach((k,i)=>{ foodIcon(c,k,180+i*230,800,0.9); text(c,k,180+i*230,900,fTekst(28),C.text2,'center'); });
 }
};
