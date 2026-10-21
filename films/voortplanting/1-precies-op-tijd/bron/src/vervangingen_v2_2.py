R = [
# H0 fig-helper
("""  const fig = (g, x, y, name, a, o) => { E.person(g, x, y, 260, Object.assign({ alpha: a }, o)); g.text(name, x, y + 140, { size: 36, w: 600, align: 'center', alpha: a }); };""",
 """  // v2.2: castpersonages (jij = Noor, je moeder = Esra, je oma = Femke toen ze zwanger was van je moeder)
  const fig = (g, id, x, y, name, a, o) => { g.screen(); castFig(g, id, x, y + 92, 285, Object.assign({ alpha: a, t: g.__t || 0 }, o)); g.text(name, x, y + 140, { size: 36, w: 600, align: 'center', alpha: a }); };"""),
("fig(g, 420, 600, 'de moeder', a2 * E.vis(t, T.lukt, null), { belly: 0.2 + 0.8 * grow });",
 "g.__t = t; fig(g, 'esra', 420, 600, 'de moeder', a2 * E.vis(t, T.lukt, null), { zwanger: 0.15 + 0.85 * grow, uit: 'blij' });"),
("fig(g, 1460, 640, 'jij', aJ, {}); fig(g, 960, 640, 'je moeder', aMo, { belly: 0.6 }); fig(g, 460, 640, 'je oma', aOma, { belly: 0.6, hair: C.ink2 });",
 "g.__t = t; fig(g, 'noor', 1460, 640, 'jij', aJ, { uit: 'blij', pose: 'zwaai' }); fig(g, 'esra', 960, 640, 'je moeder', aMo, { zwanger: 0.6, uit: 'blij' }); fig(g, 'femke', 460, 640, 'je oma', aOma, { outfit: 'gewoon', zwanger: 0.6, uit: 'blij', kijk: 1 });"),
# H1 oma + ongeboren meisje
("""      E.person(g, 300, 600, 300, { alpha: aOma, belly: 0.8, hair: C.ink2 }); g.text('je oma, 5 maanden zwanger', 300, 760, { size: 36, w: 600, align: 'center', alpha: aOma });
      // ongeboren meisje in de buik: klein figuurtje; zoomcirkel naar de eierstokjes
      E.person(g, 318, 530, 56, { alpha: aOma * E.vis(t, T.oma + 1, null), color: C.ochreL });""",
 """      g.screen(); castFig(g, 'femke', 300, 700, 400, { alpha: aOma, outfit: 'gewoon', zwanger: 0.8, uit: 'blij', t }); g.text('je oma, 5 maanden zwanger', 300, 760, { size: 36, w: 600, align: 'center', alpha: aOma });
      // v2.2: kijkje in de buik: baarmoeder met vruchtwater en het ongeboren meisje (opgekruld); de zoomcirkel gaat naar haar eierstokjes
      const BU = castBuik('femke', 300, 700, 400, 0.8, 1), FB = castFoetus(g.ctx, BU.x - 4, BU.y + 2, BU.ry * 0.0058, { alpha: 0, rot: 0.25 });
      { const aIn = aOma * E.vis(t, T.oma + 1, null); if (aIn > 0.01) { const cc = g.ctx; cc.save(); cc.globalAlpha = aIn;
          cc.fillStyle = '#8C3E4A'; cc.beginPath(); cc.ellipse(BU.x, BU.y, BU.rx * 0.86, BU.ry * 0.86, 0, 0, 6.283); cc.fill(); cc.fillStyle = '#3E6E8A'; cc.beginPath(); cc.ellipse(BU.x, BU.y, BU.rx * 0.74, BU.ry * 0.74, 0, 0, 6.283); cc.fill(); cc.restore();
          castFoetus(cc, BU.x - 4, BU.y + 2, BU.ry * 0.0058, { alpha: aIn, rot: 0.25 }); } }"""),
("g.zoomCircle(1150, 450, 300, 318, 500, 14, 'micro', (gg) => {", "g.zoomCircle(1150, 450, 300, FB.bekken.x, FB.bekken.y - 4, 10, 'micro', (gg) => {"),
# H9 bevalling
("""    c.save(); c.translate(bx, ky); c.rotate(Math.PI); E.person(g, 0, -170, 190, { alpha: a * (1 - 0.8 * E.ep(t, T.eruit + 1.6, 0.6)), color: C.ink2 }); c.restore(); g.screen();""",
 """    // v2.2: vruchtwater, placenta en navelstreng; het kind opgekruld met het hoofd naar beneden (castboekstijl); na de geboorte de baby uit het castboek
    const aKind = a * (1 - E.ep(t, T.eruit + 0.9, 0.7));
    c.save(); c.globalAlpha = a * (1 - born); c.fillStyle = 'rgba(94,143,168,0.28)'; c.beginPath(); c.ellipse(bx, by, 200 * sq, 250, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#8C3E4A'; c.beginPath(); c.ellipse(bx - 118 * sq, by - 168, 66, 42, 0.75, 0, Math.PI * 2); c.fill(); c.fillStyle = '#A85060'; c.beginPath(); c.ellipse(bx - 110 * sq, by - 160, 44, 26, 0.75, 0, Math.PI * 2); c.fill(); c.restore();
    const FK = castFoetus(c, bx + 6, ky - 95, 0.92, { alpha: 0, rot: Math.PI });
    castNavelstreng(c, bx - 100 * sq, by - 150, FK.navel.x, FK.navel.y, t, aKind * (1 - born), 12);
    castFoetus(c, bx + 6, ky - 95, 0.92, { alpha: aKind, rot: Math.PI });
    g.screen(); castFig(g, 'baby', bx + 330, 900, 230, { alpha: a * E.vis(t, T.eruit + 1.0, null, 0.6), uit: t > T.stopt + 1 ? 'slaapt' : 'blij', t });"""),
("const ky = by + 30 + 30 * level + 420 * born;", "const ky = by + 30 + 30 * level + 300 * born;"),
# H11 oma en jij
("""      E.person(g, 300, 880, 180, { alpha: aO, belly: 0.6, hair: C.ink2 }); g.text('je oma', 300, 930, { size: 32, w: 600, align: 'center', alpha: aO });
      E.person(g, 1620, 880, 180, { alpha: aO * E.vis(t, T.jou, null) }); g.text('jij', 1620, 930, { size: 32, w: 600, align: 'center', alpha: aO * E.vis(t, T.jou, null) });""",
 """      g.screen(); castFig(g, 'femke', 300, 896, 220, { alpha: aO, outfit: 'gewoon', zwanger: 0.6, uit: 'blij', t }); g.text('je oma', 300, 934, { size: 32, w: 600, align: 'center', alpha: aO });
      castFig(g, 'noor', 1620, 896, 215, { alpha: aO * E.vis(t, T.jou, null), uit: 'blij', pose: 'zwaai', kijk: -1, t }); g.text('jij', 1620, 934, { size: 32, w: 600, align: 'center', alpha: aO * E.vis(t, T.jou, null) });"""),
]
