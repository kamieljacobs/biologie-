function SCENE(){ return [
 {box:[40,124,820,432], fn:c=>ambulocetus(c,0,0,1.5)},
 {box:[900,40,340,165], fn:c=>ambulocetus(c,0,0,1.5,{houding:'zwemmen',t:0.1})},
 {box:[900,220,340,165], fn:c=>ambulocetus(c,0,0,1.5,{houding:'zwemmen',t:0.5})},
 {box:[900,400,340,165], fn:c=>ambulocetus(c,0,0,1.5,{houding:'lopen',t:0.3})},
 {box:[1150,610,110,80], fn:c=>ambulocetus(c,0,0,1.5)},
]; }
