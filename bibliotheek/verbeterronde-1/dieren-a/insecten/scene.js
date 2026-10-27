SCENE = { nieuw: true, ijkOok: ['B'], s0: 1,
  f: (c, x, y, s, o) => { if (o.alle) { insect(c, 'mier', x - 330 * s, y, s, { houding: 'lopen', t: 0.2 }); insect(c, 'bij', x - 190 * s, y, s, { houding: 'lopen', t: 0.1 });
      insect(c, 'kever', x + 60 * s, y, s, { houding: 'lopen', t: 0.3 }); insect(c, 'vlinder', x + 470 * s, y - 150 * s, s, { houding: 'vliegen', t: 0.8 }); return; }
    insect(c, o.soort, x, y, s, o); },
  groot: { alle: 1 }, standen: [{ soort: 'bij', houding: 'lopen', t: 0 }, { soort: 'bij', houding: 'lopen', t: 0.5 }, { soort: 'vlinder', houding: 'rust' }], klein: { soort: 'bij', houding: 'bestuiven', t: 0.1 } };
