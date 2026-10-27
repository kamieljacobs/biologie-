function SCENE(){ return [
 {box:[60,100,500,500], fn:c=>chromosoomPaar(c,0,0,600,{})},
 {box:[560,100,360,500], fn:c=>chromosoomPaar(c,0,0,600,{verdubbeld:true})},
 {box:[960,60,280,240], fn:c=>chromosoomPaar(c,0,0,240,{nieuw:[1,'#C9A0E8']})},
 {box:[960,330,280,240], fn:c=>chromosoomPaar(c,0,0,240,{verdubbeld:true,spreid:0.4})},
 {box:[1150,610,110,80], fn:c=>chromosoomPaar(c,0,0,240,{})},
]; }
