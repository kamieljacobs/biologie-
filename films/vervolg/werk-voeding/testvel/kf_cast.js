const KF = {
 cast(c){ bg(c,'schema'); const v=[['hanneke','A'],['hanneke_b','B'],['hanneke_c','C']];
   v.forEach(([id,l],i)=>{ const x=260+i*330; persoon(c,id,x,820,520,{uit:'blij'}); text(c,'Voorstel '+l,x,880,fTekst(40,700),C.text,'center'); });
   persoon(c,'joost',1330,820,520,{uit:'neutraal'}); text(c,'Joost',1330,880,fTekst(40,700),C.text,'center');
   persoon(c,'joost',1640,820,520,{uit:'neutraal',outfit:'spreekuur'}); text(c,'Joost · spreekuur',1640,880,fTekst(40,700),C.text,'center'); },
 zit(c){ bg(c,'schema'); persoon(c,'hanneke',600,820,520,{pose:'zit',stoel:true,kijk:1,uit:'blij'}); persoon(c,'joost',1200,820,520,{pose:'zit',stoel:true,kijk:-1,outfit:'spreekuur'}); persoon(c,'noor',1650,820,470,{pose:'staan',kijk:-1}); }
};
