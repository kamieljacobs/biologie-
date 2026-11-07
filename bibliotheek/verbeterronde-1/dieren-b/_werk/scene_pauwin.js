function SCENE(){ return [
 {box:[40,124,820,432], fn:c=>pauwin(c,0,0,1.1)},
 {box:[900,60,340,200], fn:c=>pauwin(c,0,0,1.1,{houding:'lopen',t:0.2})},
 {box:[900,300,340,200], fn:c=>{ pauw(c,-150,0,1.0,{houding:'staan'}); pauwin(c,150,0,1.0); }},
 {box:[1150,610,110,80], fn:c=>pauwin(c,0,0,1.1)},
]; }
