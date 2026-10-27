function SCENE(){ return [
 {box:[40,124,640,432], fn:c=>pauw(c,0,0,1.25,{waaier:1})},
 {box:[700,40,260,250], fn:c=>pauw(c,0,0,1.25,{waaier:0.55}), meet:c=>pauw(c,0,0,1.25,{waaier:1})},
 {box:[980,40,260,250], fn:c=>pauw(c,0,0,1.25,{waaier:0.75}), meet:c=>pauw(c,0,0,1.25,{waaier:1})},
 {box:[700,320,540,250], fn:c=>pauw(c,0,0,1.25,{houding:'staan'})},
 {box:[1150,610,110,80], fn:c=>pauw(c,0,0,1.25,{waaier:1})},
]; }
