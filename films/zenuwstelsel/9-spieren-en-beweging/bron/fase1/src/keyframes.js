const KF = {
 'test-arm'(ctx, t) { bg(ctx, 'schema');
  const r1 = armAnatomie(ctx, 330, 230, 13, { u: 0.05, e: 0.05, huid: 1 });
  const r2 = armAnatomie(ctx, 900, 230, 13, { u: 0.15, e: 1.55, hl: { biceps: 1 } });
  const r3 = armAnatomie(ctx, 1480, 230, 13, { u: 0.0, e: 0.5, c: 0.2, ct: 1, hl: { triceps: 1 } });
  naamBij(ctx, 'biceps', 'buigspier', r2.biceps[0] + 20, r2.biceps[1], 1, 'left'); naamBij(ctx, 'triceps', 'strekspier', r3.triceps[0] - 20, r3.triceps[1], 1, 'right');
  metaText(ctx, 'TESTVEL · ARM VAN OPZIJ · GESTREKT / GEBOGEN / STREKKEN', 70, 1050, C.text2, 'left', 24); },
 'test-gewricht'(ctx, t) { bg(ctx, 'schema');
  const g = gewrichtDoorsnede(ctx, 520, 470, 52, { draai: 0.2 }); for (const k of ['kop', 'kom', 'kraakbeen', 'smeer', 'kapsel', 'banden']) naamBij(ctx, k, null, g[k][0], g[k][1], 1, 'left');
  const b = botDoorsnede(ctx, 1300, 480, 22, {}); for (const k of ['rood', 'geel', 'kraakbeen', 'bloedvat', 'vlies']) naamBij(ctx, k, null, b[k][0] + 30, b[k][1], 1, 'left');
  botWeefsel(ctx, 1700, 300, 160, {}); }
};
Object.assign(KF, {
 'test-micro'(ctx, t) { bg(ctx, 'micro');
  const S1 = sarcomeer(ctx, 480, 300, 300, { L: 2.5, kop: 0.1 }); const S2 = sarcomeer(ctx, 1380, 300, 300, { L: 2.0, kop: 0.4 });
  naamBij(ctx, 'actine', null, S1.actine[0], S1.actine[1] - 16, 1, 'center', C.teal); naamBij(ctx, 'myosine', null, S1.myosine[0], S1.myosine[1] - 50, 1, 'center', C.oker);
  metaText(ctx, 'RUST · 2,5 µm', 480, 520, C.text2, 'center', 24); metaText(ctx, 'SAMENGETROKKEN · 2,0 µm', 1380, 520, C.text2, 'center', 24);
  myofibril(ctx, 160, 640, 1600, 70, 120, { hlIdx: 3 });
  const D = spierDwars(ctx, 380, 860, 160, { n: 120, eenheden: [{ n: 6, kleur: C.goud }, { n: 10, kleur: C.teal }, { n: 30, kleur: C.groen }], aan: 2.4 });
  eenheidZenuw(ctx, [80, 700], D.punten(0), C.goud, { dik: 3 });
  emgSpoor(ctx, 700, 760, 600, 200, { niveau: 0.6, t: 1 }); spierspoeltje(ctx, 1600, 880, 400, { rek: 0.6, vuur: 0.8, t: 0.3 }); }
});
Object.assign(KF, {
 'test-vleugel'(ctx, t) { bg(ctx, 'schema');
  roundRect(ctx, 200, 300, 1500, 560, 30); shape(ctx, '#C9A36A', '#9A7A4A', 2);
  const v1 = kippenvleugel(ctx, 300, 420, 50, { open: 0, buig: 1.2 }); const v2 = kippenvleugel(ctx, 1000, 420, 50, { open: 1, buig: 1.2, hlPees: 1, merg: 1 });
  pincet(ctx, v2.peesBuig[0], v2.peesBuig[1], 2.6, 40);
  for (const [k, p] of Object.entries(v2)) if (Array.isArray(p)) naamBij(ctx, k, null, p[0] + 20, p[1], 1, 'left'); }
});
Object.assign(KF, {
 'test-practicum'(ctx, t) { bg(ctx, 'schema'); practicum(ctx, t, { last: 'tas', emg: 0.75 }); metaText(ctx, 'TEST · PRACTICUM', 70, 1050, C.text2, 'left', 22); }
});
