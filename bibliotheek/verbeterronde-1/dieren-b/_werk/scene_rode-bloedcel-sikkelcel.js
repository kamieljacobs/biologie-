function SCENE(){ return [
 {box:[40,124,820,432], fn:c=>{ rodeBloedcel(c,-200,0,160); sikkelcel(c,240,0,160); }},
 {box:[920,40,320,170], fn:c=>rodeBloedcel(c,0,0,100,0,0)},
 {box:[920,220,320,170], fn:c=>rodeBloedcel(c,0,0,100,0,0.55)},
 {box:[920,400,320,170], fn:c=>rodeBloedcel(c,0,0,100,0,1)},
 {box:[1130,610,130,80], fn:c=>{ rodeBloedcel(c,-60,0,40); sikkelcel(c,50,0,40); }},
]; }
