function scene(ctx){ const t=1.3;
  vak(ctx,40,40,1840,600); nucleosoomDraad(ctx,90,330,1830,330,{n:3,R:150,t});
  vak(ctx,40,670,600,380); nucleosoomDraad(ctx,80,860,600,860,{n:3,R:50,t,los:0.5});
  vak(ctx,660,670,600,380); nucleosoomDraad(ctx,700,860,1220,860,{n:3,R:50,t,los:1});
  vak(ctx,1280,670,600,380); nucleosoomDraad(ctx,1320,830,1840,830,{n:6,R:40,t,compact:1});
  nucleosoomDraad(ctx,1640,1000,1860,1000,{n:3,R:16,t});
}
