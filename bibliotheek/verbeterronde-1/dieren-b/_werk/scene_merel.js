function SCENE(){ const sn=merel===zaadkraker?{snavel:'groot'}:{}; const f=(h,e={})=>Object.assign({houding:h},sn,e); return [
 {box:[40,124,820,432], fn:c=>merel(c,0,0,2.4,f('staan'))},
 {box:[900,40,340,165], fn:c=>merel(c,0,0,2.4,f('vliegen',{t:0.15}))},
 {box:[900,220,340,165], fn:c=>merel(c,0,0,2.4,f('vliegen',{t:0.4}))},
 {box:[900,400,340,165], fn:c=>merel(c,0,0,2.4,f('pikken',{pik:1}))},
 {box:[1150,610,110,80], fn:c=>merel(c,0,0,2.4,f('staan'))},
]; }
