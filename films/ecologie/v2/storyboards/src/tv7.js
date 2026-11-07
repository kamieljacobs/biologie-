// tv7.js — testvel film 7 (Ecologie v2): alle nieuwe tekeningen en de gebruikte bibliotheekdieren/cast
const TV7 = {
  bakken(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL E7 · PROEFBAKKEN, STRIPS, KLOK', 80, 60, C.text2, 'left', 26);
    ctx.fillStyle = '#3A3A44'; ctx.fillRect(0, 760, W, 14);
    e7Bak(ctx, 230, 760, { plant: 'grasGeel', plantH: 50, label: 'bak 1', meta: 'GRAS · ARM ZAND' });
    e7Bak(ctx, 560, 760, { plant: 'klaver', plantH: 110, label: 'bak 2', meta: 'KLAVER · ARM ZAND', wortelKnol: 1.2 });
    e7Bak(ctx, 890, 760, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 28, label: 'bak 3', meta: 'MEST', opvang: 0.6 });
    e7Bak(ctx, 1220, 760, { lagen: [[E7.zand, 150]], mest: 20, water: 70, label: 'bak 4', meta: 'ONDER WATER', opvang: 0 });
    e7Bak(ctx, 1560, 760, { lagen: [[E7.klei, 150]], mest: 22, dicht: true, label: 'dicht', meta: 'LUCHTDICHT', druppels: 0 });
    e7Strip(ctx, 1780, 560, 'amm', 0.8); e7Strip(ctx, 1850, 560, 'nit', 0.3); e7Klok(ctx, 1810, 150, 4);
  },
  micro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL E7 · DEELTJES, BACTERIËN, KNOLLETJE', 80, 60, C.text2, 'left', 26);
    e7N2(ctx, 200, 220, 30); e7N2(ctx, 330, 260, 30, { rot: 0.8 }); e7Ion(ctx, 480, 240, 24, 'amm'); e7Ion(ctx, 580, 240, 24, 'nit'); e7Ion(ctx, 680, 240, 24, 'fos');
    naamBij(ctx, 'stikstofgas', null, 260, 330, 1, 'center'); naamBij(ctx, 'ammonium', null, 480, 310, 1, 'center'); naamBij(ctx, 'nitraat', null, 590, 360, 1, 'center'); naamBij(ctx, 'fosfaat', null, 700, 310, 1, 'center');
    e7Bacterie(ctx, 950, 240, 180); e7Bacterie(ctx, 1200, 240, 140, { rot: 0.4, nadruk: true }); e7Anammox(ctx, 1500, 240, 80);
    e7Knol(ctx, 600, 680, 240); e7Kleideeltje(ctx, 1400, 700, 600, 110);
  },
  schema(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e7Kringloop(ctx, {}); },
  balans(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e7Balans(ctx, 300, 800, { overschot: true }); },
  rwzi(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e7Rwzi(ctx, 120, 640, { focus: ['lucht', 'anox'] }); e7Kraan(ctx, 1700, 900, 1); e7Glas(ctx, 1500, 880); e7Toilet(ctx, 300, 960, 1); },
  land(ctx) { e7Weiland(ctx, { groen: 1 }); koe7(ctx, 700, 700, 0.9, { houding: 'grazen' }); koe7(ctx, 1100, 690, 0.8, {}); persoon(ctx, 'gerrit', 1500, 720, 300, { outfit: 'stal' }); },
  land2(ctx) { e7Doorsnede(ctx, {}); },
  cast(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); persoon(ctx, 'yasmin', 400, 900, 420, { outfit: 'practicum' }); persoon(ctx, 'bilal', 700, 900, 420, { outfit: 'practicum', pose: 'wijs' }); persoon(ctx, 'gerrit', 1000, 900, 420, { outfit: 'stal', pose: 'vasthouden' });
    ecoKlaver(ctx, 1450, 800, 22, {}); },
  stal(ctx) { e7Stal(ctx, {}); koe7(ctx, 900, 640, 1.3, {}); },
};
