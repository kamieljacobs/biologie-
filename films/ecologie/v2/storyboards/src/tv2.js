// Testvel film 2 Ecologie v2 — nieuwe tekeningen uit teken_eco2.js (vervangt de kopie uit de evolutiereeks)
const TV2 = {
  vel(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL ECOLOGIE 2 · NIEUWE TEKENINGEN', 80, 60, C.text2);
    e2Beek(ctx, 60, 100, 560, 360, { soort: 'snel' }); e2Beek(ctx, 660, 100, 560, 360, { soort: 'traag', seed: 3 });
    e2Forel(ctx, 1500, 220, 7, {}); metaText(ctx, 'beekforel ± 30 cm · 7 px/cm', 1260, 330, C.text2, 'left', 24);
    e2Eik(ctx, 1600, 1050, 0.55, {}); e2Nestkast(ctx, 1840, 760, 4, 28);
    e2Ton(ctx, 80, 1000, 420, 380, [['licht', 0.9], ['water', 0.85], ['kalium', 0.75], ['stikstof', 0.45], ['fosfaat', 0.65]]);
    e2Buis(ctx, 700, 980, 300, { soorten: [[8, '#C9B896', 'boven'], [6, C.okerD, 'onder']], titel: 'A + C', lijnen: [['#C9B896'], [C.okerD]] });
    e2Bak(ctx, 860, 560, 360, 220, 9, {}); e2Rups(ctx, 1300, 600, 50); e2Rups(ctx, 1300, 660, 28, '#9AB86A'); e2Spin(ctx, 1380, 640, 8);
    e2Glas(ctx, 1000, 1000, 140, 180, 18, 'koud'); e2Kieuwen(ctx, 1320, 900, 140); },
  vel2(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL ECOLOGIE 2 · SCHEMA EN MAAT', 80, 60, C.text2);
    e2Kromme(ctx, 120, 520, 700, 340, { min: 0.45, max: 0.98, opt: 0.75 }); e2Kromme(ctx, 120, 520, 700, 340, { min: 0.05, max: 0.98, opt: 0.6, kleur: C.koraal, vul2: false, piek: 0.8 });
    e2Meter(ctx, 1000, 200, 600, { naam: 'zuurstof', v: 0.7, waarde: '10 mg/l', band: [0.5, 1] });
    e2Tabel(ctx, 960, 340, ['larve', 'zuurstof (mg/l)', 'temperatuur (°C)'], [['steenvlieglarve', '7 – 14', '4 – 18'], ['eendagsvlieglarve', '5 – 14', '4 – 22'], ['rode muggenlarve', '1 – 14', '4 – 30']]);
    // ware grootte mezen naast elkaar bij 12 px/cm
    ecoPimpelmees(ctx, 300, 900, 12, { houding: 'staan' }); e2Koolmees(ctx, 600, 900, 12, {}); metaText(ctx, 'pimpelmees 11,5 cm · koolmees 14 cm · 12 px/cm', 120, 960, C.text2, 'left', 24);
    persoon(ctx, 'noor', 1100, 1000, 320, { outfit: 'zomer', uit: 'blij' }); }
};
