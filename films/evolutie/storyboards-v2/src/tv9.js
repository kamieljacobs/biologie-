// Testvel film 9: elke nieuwe tekening los (C9). Laad: dieren_overig, pop_vogels, teken_evo9_data, teken_evo9, tv9
const TV9 = {
  dieren(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 9A · DIEREN (1 PX = 0,5 CM, BEHALVE AANGEGEVEN)', 60, 50, C.text2);
    const g = 860; ctx.strokeStyle = rgba(C.line, 0.4); ctx.beginPath(); ctx.moveTo(40, g); ctx.lineTo(W - 40, g); ctx.stroke(); ctx.beginPath(); ctx.moveTo(40, 470); ctx.lineTo(W - 40, 470); ctx.stroke();
    x9nandoe(ctx, 180, 470, 2); naamBij(ctx, 'grote nandoe', '1,5 m', 80, 130);
    x9nandoeKlein(ctx, 420, 470, 2); naamBij(ctx, 'kleine nandoe', '0,97 m', 360, 210);
    x9schildpad(ctx, 'koepel', 720, 470, 2); naamBij(ctx, 'koepelschild', '', 640, 260);
    x9schildpad(ctx, 'zadel', 1060, 470, 2); naamBij(ctx, 'zadelschild', '', 1000, 200);
    x9spotlijster(ctx, 1320, 470, 8); naamBij(ctx, 'spotlijster', '× 4', 1260, 290);
    grondvink(ctx, 1620, 470, 1.6, { snavel: 11 }); naamBij(ctx, 'grondvink (film 2)', '', 1540, 300);
    x9megatherium(ctx, 380, g, 0.62); naamBij(ctx, 'Megatherium', '6 m · 1 px = 1,6 cm', 120, 560);
    x9glyptodon(ctx, 960, g, 0.62); naamBij(ctx, 'Glyptodon', '3,8 m', 860, 660);
    x9gordeldier(ctx, 1300, g, 0.62 * 4); naamBij(ctx, 'gordeldier', '× 4', 1240, 760);
    x9luiaard(ctx, 1640, g, 0.62 * 3); naamBij(ctx, 'luiaard', '× 3', 1580, 600);
    x9duif(ctx, 1800, 800, 3); },
  mensen(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 9B · HISTORISCHE PERSONEN + OBJECTEN', 60, 50, C.text2);
    [['x9darwin', 'Darwin 1831'], ['x9darwinOud', 'Darwin 1858'], ['x9wallace', 'Wallace'], ['x9gould', 'Gould'], ['x9fitzroy', 'FitzRoy'], ['x9secretaris', 'secretaris'], ['x9martens', 'Martens']].forEach(([id, n], i) => { x9mens(ctx, id, 140 + i * 180, 560, 400, { uit: i % 2 ? 'praat' : 'neutraal' }); naamBij(ctx, n, '', 140 + i * 180, 600, 1, 'center'); });
    x9mens(ctx, 'x9darwin', 1500, 560, 400, { zij: true, gang: 'loop', t: 0.2 });
    x9boek(ctx, 1380, 640, 440, 400); x9ithink(ctx, 1600, 1000, 1.2);
    x9brief(ctx, 160, 800, 200, { rot: -0.1 }); x9origin(ctx, 420, 980, 300); x9zeepok(ctx, 640, 900, 1.6); x9bot(ctx, 'schedel', 840, 860, 1); x9bot(ctx, 'plaat', 960, 840, 1.2); x9bot(ctx, 'dijbeen', 1180, 900, 1); },
  kaarten(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 9C · KAARTEN, SCHIP, LANDSCHAP', 60, 50, C.text2);
    const P = x9kaart(ctx, 60, 80, 1000, 500, -180, 180, -70, 75); x9route(ctx, P, 1);
    const Q = x9kaart(ctx, 1100, 80, 420, 500, -78, -52, -56, -30); x9plek(ctx, Q, -62.3, -38.9, 'Punta Alta', '', {}); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); const [a0, b0] = Q(-70, -40.5), [a1, b1] = Q(-62, -40.8); ctx.moveTo(a0, b0); ctx.lineTo(a1, b1); ctx.stroke();
    const G = x9kaart(ctx, 1560, 80, 320, 300, -92, -89, -1.6, 0.8, { raster: false }); x9galapagos(ctx, G, { nadruk: { Charles: C.goud } });
    ctx.save(); ctx.beginPath(); ctx.rect(60, 620, 900, 440); ctx.clip(); ctx.translate(60, 620); ctx.scale(0.47, 0.41); x9zee(ctx); x9schip(ctx, 900, 640, 16); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(1000, 620, 900, 440); ctx.clip(); ctx.translate(1000, 620); ctx.scale(0.47, 0.41); x9lava(ctx); x9schip(ctx, 1200, 600, 10, { brand: 1 }); ctx.restore(); }
};
