function SCENE(){ return [
 {box:[40,124,700,432], fn:c=>schimmelGist(c,0,0,1,{soort:'schimmel',t:1})},
 {box:[780,40,220,170], fn:c=>schimmelGist(c,0,0,1,{soort:'gist',t:0.25})},
 {box:[1030,40,220,170], fn:c=>schimmelGist(c,0,0,1,{soort:'gist',t:0.95})},
 {box:[780,250,470,300], fn:c=>schimmelGist(c,0,0,1,{soort:'brood',t:1})},
 {box:[1150,610,110,80], fn:c=>schimmelGist(c,0,0,1,{soort:'gist',t:0.6})},
]; }
