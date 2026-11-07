function SCENE(){ return [
 {box:[40,124,820,432], fn:c=>grondvink(c,0,0,1.8,{houding:'staan'})},
 {box:[900,40,340,165], fn:c=>grondvink(c,0,0,1.8,{houding:'pikken',pik:1})},
 {box:[900,220,340,165], fn:c=>grondvink(c,0,0,1.8,{houding:'staan',kleed:'man'})},
 {box:[900,400,340,165], fn:c=>grondvink(c,0,0,1.8,{houding:'vliegen',t:0.3})},
 {box:[1150,610,110,80], fn:c=>grondvink(c,0,0,1.8,{houding:'staan'})},
]; }
