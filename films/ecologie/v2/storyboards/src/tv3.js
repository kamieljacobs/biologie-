// Testvel film 3: bestaande poppen op ware grootte + nieuwe film-eigen tekeningen (teken_eco3.js)
const TV3 = {
  poppen(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 3 · POPPEN OP SCHAAL (s = 3 PX/CM)', 80, 60, C.text2);
    const s = 3, g = 520; ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(60, g); ctx.lineTo(1860, g); ctx.stroke();
    ecoVos(ctx, 220, g, s, { houding: 'staan' }); ecoVos(ctx, 520, g, s, { houding: 'sluipen', t: 0.2 }); ecoKonijn(ctx, 760, g, s, { houding: 'zitten' }); ecoKonijn(ctx, 900, g, s, { houding: 'grazen' });
    ecoLynx(ctx, 1150, g, s, { houding: 'staan' }); ecoSneeuwschoenhaas(ctx, 1450, g, s, { houding: 'zitten', vacht: 'winter' }); ecoSchaap(ctx, 1700, g, s, { houding: 'grazen' });
    const g2 = 960; ctx.beginPath(); ctx.moveTo(60, g2); ctx.lineTo(1860, g2); ctx.stroke();
    ecoGaai(ctx, 200, g2, s * 2, { houding: 'eikel' }); ecoGaai(ctx, 420, g2, s * 2, { houding: 'duwen', t: 0.4 }); ecoLeverbotslak(ctx, 650, g2, 30, {}); muis(ctx, 900, g2, s * 2, {});
    ecoZomereik(ctx, 1150, g2, 0.6, { groei: 0.25 }); ecoHelm(ctx, 1350, g2, 3, {}); persoon(ctx, 'gerrit', 1560, g2, 330, {}); persoon(ctx, 'mila', 1760, g2, 320, { pose: 'wijs' }); },
  nieuw(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL FILM 3 · NIEUWE TEKENINGEN', 80, 60, C.text2);
    e3Braam(ctx, 80, 330, 1.4); naamBij(ctx, 'braamtak', 'stekels · bramen', 160, 380);
    e3Leverbot(ctx, 640, 230, 0.9); naamBij(ctx, 'leverbot', '± 3 cm (hier vergroot)', 540, 330);
    e3Lever(ctx, 1050, 230, 0.8); naamBij(ctx, 'lever', 'galgangen geel', 980, 350);
    e3Ei(ctx, 1350, 200, 20); e3Trilhaarlarve(ctx, 1450, 200, 28); e3Cercarie(ctx, 1560, 200, 18); e3Cyste(ctx, 1680, 200, 16); e3Grasspriet(ctx, 1740, 260, 120); metaText(ctx, 'EI · LARVE · CERCARIE · CYSTE', 1350, 300, C.text2);
    ['+', '−', '0'].forEach((t, i) => e3Teken(ctx, 1400 + i * 100, 400, t));
    e3Web(ctx, { }); },
  grafiek(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e3Grafiek(ctx, { pieken: true }); },
  micro(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.beginPath(); ctx.arc(500, 540, 360, 0, 6.283); ctx.clip(); e3Darm(ctx, 500, 540, 360); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(1400, 540, 360, 0, 6.283); ctx.clip(); e3Mycorrhiza(ctx, 1400, 540, 360); ctx.restore(); },
  achter(ctx) { e3Duin(ctx); ecoVos(ctx, 700, 830, 3, { houding: 'sluipen' }); ecoKonijn(ctx, 1300, 820, 3, { houding: 'grazen' }); },
  sneeuw(ctx) { e3Sneeuwbos(ctx); ecoLynx(ctx, 1200, 820, 3, { houding: 'lopen', t: 0.3 }); ecoSneeuwschoenhaas(ctx, 600, 830, 3, { houding: 'zitten', vacht: 'winter' }); },
};
