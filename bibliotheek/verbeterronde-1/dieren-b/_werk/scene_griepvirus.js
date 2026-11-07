function SCENE(){ return [
 {box:[120,104,600,472], fn:c=>griepVirus(c,0,0,220)},
 {box:[900,60,300,230], fn:c=>griepVirus(c,0,0,110)},
 {box:[900,330,300,230], fn:c=>{ griepVirus(c,-90,0,40); griepVirus(c,40,-20,40); griepVirus(c,100,60,30); }},
 {box:[1170,610,90,80], fn:c=>griepVirus(c,0,0,60)},
]; }
