function SCENE(){ return [
 {box:[60,140,800,400], fn:c=>bacterie(c,0,0,700,0,{plasmide:2,flagel:0.45})},
 {box:[920,60,320,150], fn:c=>bacterie(c,0,0,360,0,{seed:2,plasmide:1,t:0})},
 {box:[920,240,320,150], fn:c=>bacterie(c,0,0,360,0,{seed:2,plasmide:1,t:0.33})},
 {box:[920,420,320,150], fn:c=>bacterie(c,0,0,360,0,{seed:2,plasmide:1,t:0.66})},
 {box:[1130,615,130,70], fn:c=>bacterie(c,0,0,120,0.2,{seed:4,plasmide:1})},
]; }
