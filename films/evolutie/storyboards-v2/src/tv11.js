// Testvel film 11: elke nieuwe tekening los (23 okt 2026)
const TV11 = {
  vel1(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 11 · 1', 60, 60, C.text2, 'left', 28);
    e11Klok(ctx, 330, 360, 250, { uur: e11Tijd(3480), merk: [{ u: e11Tijd(66), kleur: C.koraal, tekst: '66 Mj' }] });
    e11Klok(ctx, 330, 860, 140, { uur: 23.97, cijfers: false });
    e11Levensboom(ctx, 760, 520, 1000, 380, { stap: 3, markeer: 'schimmeldier', ster: ['dieren', 'schimmels', 'algen'] });
    e11Levensboom(ctx, 760, 1000, 600, 300, { stap: 2, iconen: false }); },
  vel2(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 11 · 2 · MICRO', 60, 60, C.text2, 'left', 28);
    e11Euk(ctx, 400, 360, 240); e11Euk(ctx, 400, 820, 180, { chloro: true, focus: 'chloro' });
    e11Prok(ctx, 800, 200, 120, 0.3); e11Prok(ctx, 800, 340, 80, 0, { kleur: '#A89878', bol: true }); e11Prok(ctx, 950, 200, 120, 0.3, { dood: true });
    e11Cyano(ctx, 720, 450, 9); e11Mito(ctx, 900, 560, 220, 0.2); e11Mito(ctx, 900, 760, 220, 0.2, { deling: 0.8 });
    e11Endo(ctx, 1450, 260, 170, 0); e11Endo(ctx, 1450, 560, 170, 0.5); e11Endo(ctx, 1450, 860, 170, 1); e11Endo(ctx, 1150, 900, 120, 1, { gast: 'cyano' }); },
  vel3(ctx) { macroNacht(ctx, { horizon: 520 }); metaText(ctx, 'TESTVEL 11 · 3 · MACRO', 60, 60, C.text2, 'left', 28);
    e11Stromatoliet(ctx, 200, 420, 1.2); e11Stromatoliet(ctx, 360, 420, 0.9, { seed: 4 });
    e11Frond(ctx, 560, 470, 300); e11Frond(ctx, 680, 470, 200, { buig: -0.05 }); e11Dickinsonia(ctx, 900, 430, 260);
    e11Cooksonia(ctx, 1150, 470, 160); e11Paddenstoel(ctx, 1350, 470, 1); e11Plantje(ctx, 1500, 470, 1);
    e11Trilobiet(ctx, 220, 700, 220, { rot: 0 }); e11Anomalocaris(ctx, 650, 720, 380, { t: 0.2 });
    e11Tiktaalik(ctx, 1120, 760, 520); e11Morganucodon(ctx, 1600, 760, 160); },
  vel4(ctx) { macroNacht(ctx, { horizon: 600 }); metaText(ctx, 'TESTVEL 11 · 4', 60, 60, C.text2, 'left', 28);
    e11TRex(ctx, 600, 900, 1000); e11TRex(ctx, 1500, 900, 600, { silhouet: true }); persoon(ctx, 'noor', 1180, 900, 82); e11Morganucodon(ctx, 1260, 900, 8);
    e11Soortenlijn(ctx, 200, 520, 1500, 300, { markeer: [252, 66] }); e11Aarde(ctx, 1700, 200, 120); }
};
