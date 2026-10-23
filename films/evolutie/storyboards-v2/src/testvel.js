const TV = {
  vel1(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL EVOLUTIE · REEKSBIBLIOTHEEK', 80, 70, C.text2);
    pot(ctx, 240, 520, 1, { p: 0.7, n: 70, label: 'genenpool', meta: 'pot met allelen' }); allelBalk(ctx, 110, 640, 260, 0.7, { namen: ['A', 'a'] });
    pot(ctx, 600, 520, 0.8, { p: 0.4, n: 40, seed: 5, extra: [[EVO.kracht.mutatie, 2]], label: 'na mutatie' });
    histogram(ctx, 880, 560, 460, 300, 0.6, 0.12, { oud: { mu: 0.45, sd: 0.12 }, as: ['klein', 'groot'], titel: 'snavelhoogte' });
    histogram(ctx, 1420, 560, 420, 300, 0.25, 0.08, { bimodaal: [0.75, 0.08, 0.5], kleur: C.oker, as: ['licht', 'donker'] });
    cladogram(ctx, 940, 1010, 760, 300, [['haai'], [['ichthyosaurus'], ['dolfijn', 'mens']]].flat ? ['haai', ['ichthyosaurus', ['dolfijn', 'mens']]] : 0, { markeer: ['dolfijn'] });
    lhb(ctx, 220, 860, 1.1, { vorm: 'succinea', stippen: 16 }); lhb(ctx, 420, 860, 1.1, { vorm: 'conspicua' }); lhb(ctx, 620, 860, 1.1, { vorm: 'spectabilis' }); lhb(ctx, 800, 870, 0.7, { vorm: 'succinea', stippen: 0 });
  },
};
