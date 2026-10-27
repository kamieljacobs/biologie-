function SCENE(){ const sn=zaadkraker===zaadkraker?{snavel:'groot'}:{}; const f=(h,e={})=>Object.assign({houding:h},sn,e); return [
 {box:[40,124,820,432], fn:c=>zaadkraker(c,0,0,1.7,f('staan'))},
 {box:[900,40,340,165], fn:c=>zaadkraker(c,0,0,1.7,f('vliegen',{t:0.15}))},
 {box:[900,220,340,165], fn:c=>zaadkraker(c,0,0,1.7,f('vliegen',{t:0.4}))},
 {box:[900,400,340,165], fn:c=>zaadkraker(c,0,0,1.7,f('pikken',{pik:1}))},
 {box:[1150,610,110,80], fn:c=>zaadkraker(c,0,0,1.7,f('staan'))},
]; }
