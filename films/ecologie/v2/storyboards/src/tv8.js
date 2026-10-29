// tv8.js — testvel film 8 (Ecologie v2): nieuwe tekeningen + gebruikte bibliotheekplanten en cast
const TV8 = {
  land(ctx) { e8Zandvlakte(ctx, {}); e8Paaltje(ctx, 960, 760, '23', 1.4); _bas8(ctx, 1200, 800, 340, { pose: 'wijs', kijk: -1 }); _daan8(ctx, 720, 800, 300, { pose: 'vasthouden' }); },
  vierkanten(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); for (let i = 0; i <= 6; i++) { e8Vierkant(ctx, 160 + (i % 4) * 460, 420 + Math.floor(i / 4) * 440, 380, i, { seed: i + 1 }); metaText(ctx, 'STADIUM ' + i, 160 + (i % 4) * 460, 480 + Math.floor(i / 4) * 440, C.text2, 'center', 22); }
    e8Vierkant(ctx, 1540, 860, 380, 0, { brand: 1 }); },
  planten(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#C9A86A'; ctx.fillRect(0, 700, W, 200);
    e8Buntgras(ctx, 300, 700, 8, { wortels: true }); e8Korstmos(ctx, 620, 700, 4); e8Mos(ctx, 820, 700, 120, 2); ecoStruikheide(ctx, 1080, 700, 4, {}); ecoGroveDen(ctx, 1380, 700, 2.2, {}); ecoBerk(ctx, 1600, 700, 1.6, {}); ecoZomereik(ctx, 1800, 700, 2.2, {}); },
  dossier(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e8Dossier(ctx, 80, 160, { blad: 1, stadium: 0, humus: 0, meters: { hitte: 0.95, vocht: 0.1, licht: 1, stuiven: 0.9 } });
    e8Dossier(ctx, 680, 160, { blad: 3, stadium: 3, humus: 18, soorten: [['korstmos', 30], ['buntgras', 25], ['struikheide', 20], ['grove den', 5]], meters: { hitte: 0.6, vocht: 0.35, licht: 0.8, stuiven: 0.3 } });
    e8Dossier(ctx, 1280, 160, { blad: 1, titel: 'BRANDPLEK · BLAD 1', brand: 0, humus: 70, zaden: true, wortels: true, as: true, meters: { hitte: 0.7, vocht: 0.5, licht: 1, stuiven: 0.1 } }); },
  overig(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e8Balk(ctx, 160, 120, 1600, 2); e8Profiel(ctx, 200, 300, 200, 400, 120, { zaden: true, wortels: true }); for (let i = 0; i < 4; i++) e8Akker(ctx, 560 + i * 330, 700, 300, i); },
  brand(ctx) { e8Brand(ctx, { stap: 0 }); },
  brand2(ctx) { e8Brand(ctx, { stap: 1 }); },
};
