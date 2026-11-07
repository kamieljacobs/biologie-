// Testvel film 4 (Ecologie v2): bestaande poppen op schaal + nieuwe film-eigen tekeningen (teken_eco4.js)
const TV4 = {
  poppen(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 4 · STROOISEL OP SCHAAL (s = 20 PX/CM)', 80, 60, C.text2);
    const g = 600; ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(60, g); ctx.lineTo(1860, g); ctx.stroke();
    ecoEikenblad(ctx, 300, g - 40, 20, { stadium: 0, hoek: -0.2 }); ecoEikenblad(ctx, 650, g - 40, 20, { stadium: 0.35 }); ecoEikenblad(ctx, 1000, g - 40, 20, { stadium: 0.65 }); ecoEikenblad(ctx, 1350, g - 40, 20, { stadium: 0.9 });
    ecoPissebed(ctx, 1600, g, 20, {}); ecoRegenworm(ctx, 300, 900, 20, {});
    persoon(ctx, 'bas', 1500, 1000, 360, {}); persoon(ctx, 'noor', 1760, 1000, 330, {}); },
  nieuw(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 4 · NIEUWE TEKENINGEN', 80, 60, C.text2);
    e4Logboek(ctx, 80, 100, 900, [['11 nov', '1,0 g', 'eik liet los', null], ['mei', '0,7 g', 'pissebed, worm, schimmels', (c, x, y) => { e4CO2(c, x + 20, y - 12, 12); e4H2O(c, x + 80, y - 12, 10); e4Nitraat(c, x + 130, y - 12, 13); e4Fosfaat(c, x + 175, y - 12, 12); }]]);
    e4Weegschaal(ctx, 1200, 330, 260, '1,0 g'); e4Zakje(ctx, 1600, 250, 300, 200, 40, (c) => ecoEikenblad(c, 1600, 250, 14, {}));
    e4Keten(ctx, 100, 520, 5, 18); e4Kraal(ctx, 100, 600, 7, 12, C.groen); e4CO2(ctx, 420, 520); e4H2O(ctx, 520, 520); e4Nitraat(ctx, 600, 520, 18, true); e4Fosfaat(ctx, 680, 520, 16); e4Ammonium(ctx, 760, 520, 16); e4Warmte(ctx, 860, 560, 1.4);
    ctx.save(); ctx.beginPath(); ctx.arc(1100, 700, 200, 0, 6.283); ctx.clip(); e4BodemMicro(ctx, 1100, 700, 200); ctx.restore();
    e4Compost(ctx, 1500, 900, 400, 260, {}); e4Thermometer(ctx, 1760, 860, 220, 0.75, '60 °C');
    e4Compost(ctx, 400, 1000, 360, 240, { doorsnede: true, nat: true }); },
  veen(ctx) { e4Hoogveen(ctx); ctx.save(); ctx.globalAlpha = 1; e4VeenDoorsnede(ctx, 200, 760, 700, 300); ctx.restore(); e4Yde(ctx, 1300, 900, 1.6);
    ctx.save(); ctx.beginPath(); ctx.arc(1600, 400, 200, 0, 6.283); ctx.clip(); e4ZwarteRoker(ctx, 1600, 400, 200); ctx.restore(); },
  bos(ctx) { e4Bos(ctx); persoon(ctx, 'bas', 900, 880, 470, { pose: 'vasthouden' }); },
};
