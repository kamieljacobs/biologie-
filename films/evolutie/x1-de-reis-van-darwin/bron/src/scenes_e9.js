// Film 9 · De reis van Darwin (evolutie extra 1/4) — geanimeerde scènes; keyframes uit sb9.js als eindbeeld, opgebouwd in de maat van de stem.
// De speler tekent linksboven al 'havo · vwo · evolutie extra 1/4': de eigen hoofdstukregel van het storyboard valt weg.
x9tag = function () {};
const E9 = {
  ap: (ctx, a, fn) => { a = Math.min(1, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); },
  pose: (naam, R, L = [0.14, 0.06]) => { POSES[naam] = { R, L }; return naam; },
  // route van de Beagle tot fractie u (vloeiend, ook binnen een etappe)
  route(ctx, P, u, kleur = C.goud) { const R = X9_ROUTE, f = u * (R.length - 1), n = Math.floor(f); ctx.save(); ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.lineCap = 'round';
    for (let i = 0; i < Math.min(n + 1, R.length - 1); i++) { const v = i < n ? 1 : f - n; if (v <= 0) break; let [, l0, b0] = R[i], [, l1, b1] = R[i + 1]; if (Math.abs(l1 - l0) > 180) l1 -= 360 * Math.sign(l1 - l0);
      for (const off of [0, 360]) { const [ax, ay] = P(l0 + off, b0), [bx, by] = P(lerp(l0, l1, v) + off, lerp(b0, b1, v)); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); } }
    ctx.setLineDash([]); for (let i = 0; i <= Math.min(n, R.length - 1); i++) { const [px, py] = P(R[i][1], R[i][2]); circ(ctx, px, py, 5, C.bgSchema, kleur, 2.5); } ctx.restore(); },
  gloed(ctx, x, y, r, a, k = C.goud) { a = Math.min(1, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = k; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.globalAlpha *= 0.18; ctx.fillStyle = k; ctx.fill(); ctx.restore(); },
  // pikhouweel in de hand
  pik: (c, x, y, an) => { const dx = Math.cos(an), dy = Math.sin(an); lijn(c, [[x - dx * 20, y - dy * 20], [x + dx * 70, y + dy * 70]], '#7A5A3A', 6); const hx = x + dx * 70, hy = y + dy * 70; lijn(c, [[hx - dy * 34 + dx * 6, hy + dx * 34 + dy * 6], [hx, hy], [hx + dy * 26, hy - dx * 26]], '#8A8E96', 7); },
};

Object.assign(SCENES, {
  // ---------------- titel: de Beagle deint rustig (beeld rechts van de titelkaart)
  title(ctx, t) { ctx.save(); roundRect(ctx, 1060, 160, 760, 760, 20); ctx.clip(); ctx.save(); ctx.translate(1060, 160); ctx.scale(0.4, 0.7); x9zee(ctx, { hor: 700 }); ctx.restore();
    e9golf(ctx, 660, t, 0.8); e9schip(ctx, 1440, 700, 17, t); ctx.restore(); },

  // ---------------- Opening
  s01(ctx, t, q) { const hor = 640; x9zee(ctx, { hor }); e9golf(ctx, hor, t); const sx = lerp(180, 700, ease(clamp(t / 7, 0, 1)));
    e9schip(ctx, sx, 700, 20, t);
    naamBij(ctx, 'de Beagle', 'bark · ongeveer 27 meter lang', sx, 800, q.on('Beagle', 1, 0.5), 'center');
    const z = q.on('Charles', 1, 0.6);
    zoomCircle(ctx, 1460, 420, 290, sx + 260, 640, 'Darwin aan de reling', z, () => { ctx.fillStyle = '#243656'; ctx.fillRect(1160, 120, 600, 600); ctx.fillStyle = '#1F4466'; ctx.fillRect(1160, 500, 600, 300);
      e9golf(ctx, 480, t, 0.6); x9mens(ctx, 'x9darwin', 1460, 860 + Math.sin(t * 1.1) * 4, 560, { uit: t > q.at('tweeëntwintig') ? 'blij' : 'neutraal', kijk: -1 }); vul(ctx, [[1150, 600], [1780, 590], [1780, 760], [1150, 760]], '#5A4232'); lijn(ctx, [[1150, 600], [1780, 590]], '#7A5A44', 12); });
    naamBij(ctx, 'Charles Darwin', '22 jaar', 1460, 100, q.on('tweeëntwintig', 1, 0.5), 'center', C.goud); evoSchaal(ctx, 'Plymouth · december 1831'); },

  s02(ctx, t, q) { x9schema(ctx); const y = 640, X = x9tijdas(ctx, 160, y, 1600, 1830, 1860);
    E9.ap(ctx, lerp(0.3, 1, q.on('soorten', 1, 0.5)), () => text(ctx, 'Soorten veranderen nooit.', 160, 260, fTitel(64), C.text2, 'left'));
    const d = q.on('twijfels', 1, 0.8); if (d > 0.01) doorstreep(ctx, 150, 240, lerp(150, 900, d), 240);
    x9mijl(ctx, X, 1831, y, 'vertrek', C.text);
    E9.ap(ctx, q.on('terug', 1, 0.5), () => x9mijl(ctx, X, 1836, y, 'terug', C.text));
    const r = q.on('onderweg', 1, 0.8); if (r > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(1831), y); ctx.lineTo(lerp(X(1831), X(1836), r), y); ctx.stroke(); ctx.restore(); }
    E9.ap(ctx, q.on('1859', 1, 0.5), () => { x9mijl(ctx, X, 1859, y, 'boek', C.goud); x9origin(ctx, 1730, 560 - 20 * (1 - q.on('1859', 1, 0.5)), 180); });
    const g = q.on('twintig', 1, 0.8); if (g > 0.01) { ctx.save(); ctx.globalAlpha = g; ctx.setLineDash([10, 8]); roundRect(ctx, X(1838), y - 120, (X(1858) - X(1838)) * g, 100, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      E9.ap(ctx, ramp(t, q.at('twintig') + 0.5, 0.5), () => text(ctx, '?', (X(1838) + X(1858)) / 2, y - 48, fTitel(64), C.goud, 'center')); } },

  // ---------------- H1 Aan boord van de Beagle
  s04(ctx, t, q) { x9schema(ctx); const z = ease(clamp(t / 2.2, 0, 1));
    const P = x9kaart(ctx, 760, 130, 1080, 740, lerp(-160, -95, z), lerp(60, -25, z), lerp(-62, -58, z), lerp(72, 10, z));
    const kust = [[-35, -8], [-39, -15], [-41, -22], [-48, -26], [-53, -33], [-58, -38], [-62, -39], [-65, -42], [-66, -47], [-69, -51], [-68, -55], [-74, -50], [-74, -42], [-73, -37], [-72, -30], [-71, -20], [-77, -12], [-81, -5]];
    const t0 = q.at('kust'); kust.forEach(([lo, la], i) => { const a = ramp(t, t0 + i * 0.1, 0.3); if (a <= 0.01) return; const [px, py] = P(lo, la); circ(ctx, px, py, 7 + 5 * (1 - a), rgba(C.goud, a), _lt(C.goud, 0.4), 1.5); });
    naamBij(ctx, 'kust in kaart brengen', 'metingen langs de kust', 1300, 210, q.on('kaart', 1, 0.5), 'center', C.goud);
    const fz = q.on('FitzRoy', 1, 0.3); x9mens(ctx, 'x9fitzroy', 220, 880, 480, { uit: t > q.at('FitzRoy') && t < q.at('Dat') && Math.sin(t * 9) > 0 ? 'praat' : 'neutraal', pose: t > q.at('natuuronderzoeker') ? 'wijs' : 'staan', kijk: 1, a: fz });
    naamBij(ctx, 'kapitein FitzRoy', '26 jaar', 200, 300, fz, 'center');
    const dz = q.on('natuuronderzoeker', 1, 0.3); x9mens(ctx, 'x9darwin', 560, 880, 520, { uit: t > q.at('Darwin') ? 'blij' : 'neutraal', kijk: -1, a: dz }); naamBij(ctx, 'Darwin', 'natuuronderzoeker', 580, 230, q.on('Darwin', 1, 0.4), 'center'); },

  s05(ctx, t, q) { x9schema(ctx); const P = x9kaart(ctx, 100, 140, 1720, 640, -100, 260, -62, 72); const u = clamp((t - 0.3) / Math.max(1, q.at('verzamelt') - 0.3), 0, 1); ctx.save(); roundRect(ctx, 100, 140, 1720, 640, 12); ctx.clip(); E9.route(ctx, P, u); ctx.restore();
    x9plek(ctx, P, -4.1, 50.4, 'Plymouth', '27 dec 1831', { dy: -20 });
    E9.ap(ctx, ramp(u, 11 / 24, 0.02), () => x9plek(ctx, P, -90.5, -0.7, 'Galápagos', 'sep 1835', { align: 'right', dy: -16 }));
    E9.ap(ctx, ramp(u, 0.99, 0.01), () => x9plek(ctx, P, -5.1, 50.1, '', null));
    text(ctx, `1831 → ${Math.round(lerp(1831, 1836, u))}`, 1820, 850, fTitel(64), C.goud, 'right');
    E9.ap(ctx, q.on('land', 1, 0.5), () => metaText(ctx, 'ruim 3 jaar aan land · 1,5 jaar op zee', 100, 850, C.text2, 'left', 28));
    const v = q.on('verzamelt', 1, 0.6); [[-38.5, -13], [-43.2, -22.9], [-56.2, -34.9], [-62.3, -38.9], [-65.9, -47.75], [-71.6, -33], [-90.5, -0.7]].forEach(([lo, la], i) => { const [px, py] = P(lo, la); E9.gloed(ctx, px, py, 16, v * (0.6 + 0.4 * Math.sin(t * 3 + i))); }); },

  s06(ctx, t, q) { x9zee(ctx, { hor: 760 }); ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, 650); e9golf(ctx, 760, t, 0.5);
    e9schip(ctx, 1480, 860, 9, t);
    x9mens(ctx, 'x9darwin', 620, 880, 560, { pose: t > q.at('dacht') ? 'denk' : 'staan', kijk: 1 });
    vraagteken(ctx, 860, 360 + 6 * Math.sin(t * 2), q.on('soorten', 1, 0.5), 110); },

  s08(ctx, t, q) { x9schema(ctx); x9mens(ctx, 'x9darwin', 520, 880, 560, { pose: t > q.at('dacht') ? 'denk' : 'staan' });
    naamBij(ctx, 'soorten liggen vast', 'wat de meeste onderzoekers denken', 520, 230, q.on('vastliggen', 1, 0.5), 'center');
    const o = q.on('opa', 1, 0.5); E9.ap(ctx, o, () => { roundRect(ctx, 1000, 220, 300, 380, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); x9mens(ctx, 'x9erasmus', 1150, 590, 340, { uit: 'neutraal' }); metaText(ctx, 'Erasmus Darwin · 1794', 1150, 650, C.grain, 'center', 26); });
    naamBij(ctx, 'idee: soorten veranderen', 'zijn opa', 1150, 730, q.on('veranderende', 1, 0.5), 'center');
    const b = q.on('zonder', 1, 0.5); e9weegschaal(ctx, 1640, 640, b); E9.ap(ctx, b, () => metaText(ctx, 'bewijs', 1640, 700, C.grain, 'center', 28)); },

  // ---------------- H2 Reuzen en nandoes
  s09(ctx, t, q) { macroNacht(ctx, { horizon: 560, heuvel: false }); x9oever(ctx, 0, 600, W, 480);
    const sm = q.on('Megatherium', 1, 1.0); E9.ap(ctx, sm, () => { ctx.save(); ctx.setLineDash([10, 8]); x9dier(ctx, 'megatherium', 1240, 560, 0.62, { a: 0.35 }); ctx.restore(); metaText(ctx, 'reconstructie', 1240, 590, C.text2, 'center', 26); });
    const vrij = q.on('schedel', 1, 0.8); E9.ap(ctx, lerp(0.35, 1, q.on('graaft', 1, 1.2)), () => x9bot(ctx, 'schedel', 1160, 760, 1.8, { goud: vrij > 0.5, rot: 0.1 }));
    E9.ap(ctx, q.on('botten', 1, 0.8), () => x9bot(ctx, 'dijbeen', 1520, 820, 1.3, { rot: -0.2 }));
    E9.gloed(ctx, 1170, 760, 130, vrij * (1 - ramp(t, q.at('schedel') + 1.6, 0.8)));
    const hakt = t > q.at('graaft') - 0.2 && t < q.at('schedel'); const k = hakt ? 0.5 + 0.5 * Math.sin(t * 6) : 0;
    x9mens(ctx, 'x9darwin', 930, 860, 260, { pose: hakt ? E9.pose('_hak', [lerp(1.2, 2.5, k), lerp(1.4, 2.8, k)]) : 'wijs', kijk: 1, uit: t > q.at('schedel') ? 'verbaasd' : 'neutraal', hold: hakt ? E9.pik : null });
    naamBij(ctx, 'Megatherium', 'uitgestorven luiaard · tot ±4 ton', 1240, 330, q.on('luiaard', 1, 0.5), 'center', C.goud); naamBij(ctx, 'schedel', null, 1160, 612, vrij, 'center', C.goud);
    evoSchaal(ctx, 'Punta Alta, Argentinië · 1832 · botten vergroot'); },

  s10(ctx, t, q) { macroNacht(ctx, { horizon: 560 }); const g = q.on('Glyptodon', 1, 0.8), sv = ramp(t, q.at('pantser'), Math.max(0.8, q.at('Glyptodon') - q.at('pantser')));
    x9glyptodon(ctx, 1200, 860, 1.6, { a: g });
    for (let i = 0; i < 9; i++) { const sx = 480 + (i % 3) * 120 + hash(i) * 40, sy = 820 + Math.floor(i / 3) * 18, ex = 1040 + (i % 3) * 140, ey = 560 + Math.floor(i / 3) * 70;
      E9.ap(ctx, 1 - g, () => x9bot(ctx, 'plaat', lerp(sx, ex, ease(sv)), lerp(sy, ey, ease(sv)) - Math.sin(sv * Math.PI) * 120, 0.7)); }
    x9mens(ctx, 'x9darwin', 300, 860, 183 * 1.6 / 1.08, { uit: 'neutraal', kijk: 1, pose: t > q.at('pantser') && t < q.at('Glyptodon') + 1 ? 'wijs' : 'staan' });
    x9bot(ctx, 'plaat', 560, 800, 1.6, { goud: true }); naamBij(ctx, 'botplaatjes', 'pantser', 620, 740, q.on('botplaatjes', 1, 0.5), 'center');
    naamBij(ctx, 'Glyptodon', 'uitgestorven gordeldier · ongeveer 3 meter', 1200, 470, q.on('gordeldier', 1, 0.5), 'center', C.goud);
    E9.ap(ctx, g, () => evoSchaal(ctx, 'Darwin en Glyptodon op dezelfde schaal')); },

  s11(ctx, t, q) { macroNacht(ctx, { horizon: 520 }); const s = 0.62, gr = 860, tt = t * 1.6, gx = 1500 - 13 * s * tt;
    x9megatherium(ctx, 420, gr, s, { a: 0.5 }); x9glyptodon(ctx, 1180, gr, s, { a: 0.5 });
    naamBij(ctx, 'Megatherium', 'uitgestorven', 330, 560, 0.9, 'center'); naamBij(ctx, 'Glyptodon', 'uitgestorven', 1100, 640, 0.9, 'center');
    x9gordeldier(ctx, 1500, gr, s, { houding: 'lopen', t: tt, vooruit: true, kijk: -1 });
    const zg = q.on('gordeldieren', 1, 0.6);
    zoomCircle(ctx, 1560, 360, 170, gx, gr - 6, 'gordeldier nu · ±40 centimeter', zg, () => { ctx.fillStyle = '#2F4A3A'; ctx.fillRect(1390, 190, 340, 340); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(1390, 420, 340, 120);
      for (let i = 0; i < 10; i++) { const x = 1420 + ((hash(i) * 380 + t * 13 * 1.6 * 6) % 380), y = 432 + (i % 3) * 24; circ(ctx, x, y, 4 + (i % 3) * 2, '#4E6A52'); }
      x9gordeldier(ctx, 1560, 420, 6, { houding: 'lopen', t: tt, kijk: -1 }); });
    lijn(ctx, [[700, gr - 120], [760, gr - 128]], '#5A4A3A', 2); x9luiaard(ctx, 730, gr - 120 + 75 * s * 0.92, s);
    zoomCircle(ctx, 760, 300, 170, 730, gr - 110, 'luiaard · nu · 4 tot 8 kilo', q.on('luiaards', 1, 0.6), () => { lijn(ctx, [[600, 200], [920, 186]], '#5A4A3A', 12); x9luiaard(ctx, 760, 194 + 75 * 3.4 * 0.92, 3.4); });
    evoSchaal(ctx, 'alle vier op dezelfde schaal · cirkels vergroot'); },

  s12(ctx, t, q) { x9schema(ctx); const P = x9kaart(ctx, 100, 160, 1000, 640, -100, 0, -60, 15); const [ax, ay] = P(-62, -39);
    E9.gloed(ctx, ax, ay, 26, 0.5 + 0.3 * Math.sin(t * 3)); circ(ctx, ax, ay, 12, C.goud, _lt(C.goud, 0.4), 2); naamBij(ctx, 'Punta Alta', null, ax + 24, ay + 50, 1, 'left', C.goud);
    const r = q.on('reuzen', 1, 0.5), f = q.on('familie', 1, 0.5);
    E9.ap(ctx, r, () => { x9megatherium(ctx, 1380, 470, 0.28); x9glyptodon(ctx, 1380, 760, 0.42); metaText(ctx, 'uitgestorven', 1380, 820, C.grain, 'center', 24); });
    E9.ap(ctx, f, () => { lijn(ctx, [[1580, 300], [1700, 296]], '#5A4A3A', 6); x9luiaard(ctx, 1650, 298 + 75 * 1.6 * 0.92, 1.6); x9gordeldier(ctx, 1650, 760, 2.2, { kijk: -1 }); metaText(ctx, 'nu', 1650, 820, C.grain, 'center', 24); }); },

  s14(ctx, t, q) { x9schema(ctx); const P = x9wereld(ctx, 100, 140, 1200, 560); const ov = q.at('overal'), weg = q.on('juist', 1, 0.8);
    [[20, 0], [80, 30], [-100, 40], [130, -25], [10, 48], [100, 60]].forEach(([lo, la], i) => { const a = ramp(t, ov + i * 0.15, 0.3) * (1 - weg); if (a <= 0.01) return; const [px, py] = P(lo, la); circ(ctx, px, py, 10, rgba(C.line, 0.3 * a), rgba(C.line, a), 1.5); });
    naamBij(ctx, 'zou kunnen', 'als de plek niets zegt', 640, 200, q.on('overal', 1, 0.5) * (1 - weg), 'center');
    const [ax, ay] = P(-62, -39); circ(ctx, ax, ay, 14, C.goud, _lt(C.goud, 0.4), 2); E9.gloed(ctx, ax, ay, 30, weg * (0.6 + 0.4 * Math.sin(t * 3)));
    naamBij(ctx, 'hier gevonden', 'Punta Alta', ax + 24, ay + 50, 1, 'left', C.goud);
    const fam = q.on('familie', 1, 0.6);
    x9megatherium(ctx, 1460, 430, 0.24); E9.ap(ctx, fam, () => { lijn(ctx, [[1640, 290], [1780, 286]], '#5A4A3A', 6); x9luiaard(ctx, 1700, 288 + 75 * 1.6 * 0.92, 1.6); });
    x9glyptodon(ctx, 1460, 690, 0.38); E9.ap(ctx, fam, () => x9gordeldier(ctx, 1710, 690, 2.2, { kijk: -1 }));
    metaText(ctx, 'uitgestorven', 1460, 740, C.grain, 'center', 22); E9.ap(ctx, fam, () => metaText(ctx, 'nu', 1710, 740, C.grain, 'center', 22));
    haak(ctx, 1380, 1800, 770, 'familie, op dezelfde plek', C.groen, q.on('familie', 2, 0.6)); },

  s15(ctx, t, q) { x9vlakte(ctx, { hor: 560 }); const tt = t * 0.36, s = 3.6, nx = 1500 - 92 * s * tt;
    E9.ap(ctx, q.on('Gaucho', 1, 0.4), () => dim(ctx, () => { [[1660, 600], [1800, 606]].forEach(([gx, gy]) => { paard(ctx, gx, gy, 0.5, { kijk: -1 }); x9mens(ctx, 'x9martens', gx + 4, gy - 72, 90, { zij: true, kijk: -1 }); }); }, 0.8));
    naamBij(ctx, "gaucho's", 'ruiters van de pampa', 1720, 420, q.on('Gaucho', 1, 0.5), 'center');
    E9.ap(ctx, q.on('kleinere', 1, 0.6), () => { ctx.save(); ctx.setLineDash([8, 6]); x9nandoeKlein(ctx, 1460, 600, 0.6, { a: 0.6 }); ctx.restore(); vraagteken(ctx, 1460, 520, 1, 56); });
    x9nandoe(ctx, 1500, 860, s, { houding: 'lopen', t: tt, vooruit: true, kijk: -1 });
    naamBij(ctx, 'grote nandoe', 'ongeveer 1,5 meter', nx, 300, q.on('nandoes', 1, 0.5), 'center', C.goud); evoSchaal(ctx, 'Patagonië'); },

  s16(ctx, t, q) { x9vlakte(ctx, { hor: 520 }); const eet = q.on('opgegeten', 1, 0.5), ziet = q.on('ziet', 1, 0.5), terug = q.on('Gelukkig', 1, 0.8);
    const mart = q.on('scheepsschilder', 1, 0.3) * (1 - q.on('denkt', 1, 0.3)); x9mens(ctx, 'x9martens', 300, 830, 330, { kijk: 1, pose: 'wijs', a: Math.max(mart, t < 0.5 ? 1 : 0) }); naamBij(ctx, 'scheepsschilder', 'Conrad Martens', 300, 450, mart, 'center');
    const dw = q.on('denkt', 1, 0.3); x9mens(ctx, 'x9darwin', 300, 830, 330, { kijk: 1, uit: t > q.at('ziet') ? 'verbaasd' : 'neutraal', pose: t > q.at('Gelukkig') ? 'wijs' : 'staan', a: dw });
    E9.ap(ctx, (1 - eet) + terug * 0.7, () => { if (terug > 0.01) { ctx.save(); ctx.setLineDash([10, 8]); } x9nandoeKlein(ctx, 780, 860, 2.1, { goud: ziet > 0.5 }); if (terug > 0.01) ctx.restore(); });
    naamBij(ctx, 'een jonge grote nandoe?', null, 780, 560, q.on('jonge', 1, 0.4) * (1 - eet), 'center');
    e9pot(ctx, 780, 860, t, eet * (1 - ziet));
    naamBij(ctx, 'kleine nandoe', 'witte veerpunten · ongeveer 1 meter', 780, 520, ziet, 'center', C.goud);
    e9resten(ctx, ziet, q.on('huid', 1, 0.4), q.on('kop', 1, 0.4), q.on('poten', 1, 0.4));
    naamBij(ctx, 'kop, nek, poten, huid', 'bewaard', 1430, 590, q.on('huid', 1, 0.5), 'center'); evoSchaal(ctx, 'Port Desire · begin 1834'); },

  s17(ctx, t, q) { x9schema(ctx); const bx = 140, by = 130, bw = 760, bh = 760, kaart = (land) => x9kaart(ctx, bx, by, bw, bh, -76, -52, -56, -22, { raster: false, land, rand: _lt(land, 0.3) });
    const P = kaart('#33496B'); const [, yr] = P(0, -40.6), an = q.on('noorden', 1, 0.8), as = q.on('zuiden', 1, 0.8);
    E9.ap(ctx, an, () => { ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw, yr - by); ctx.clip(); kaart('#3E6E8A'); ctx.restore(); });
    E9.ap(ctx, as, () => { ctx.save(); ctx.beginPath(); ctx.rect(bx, yr, bw, by + bh - yr); ctx.clip(); kaart('#7A6A44'); ctx.restore(); });
    const rv = q.on('Negro', 1, 1.0), R = [[-70.5, -39.0], [-68, -39.4], [-66, -39.9], [-64, -40.5], [-62.8, -41.0]];
    if (rv > 0.01) { ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); const f = rv * (R.length - 1); for (let i = 0; i <= Math.ceil(f); i++) { const j = Math.min(i, f), k = Math.floor(j), u = j - k, p0 = R[k], p1 = R[Math.min(k + 1, R.length - 1)]; const [px, py] = P(lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'Río Negro', 'overgang', 960, 470, rv, 'left', C.teal); metaText(ctx, 'vereenvoudigd', bx + bw - 20, by + bh - 20, C.text2, 'right', 26);
    const sa = lerp(0.5, 1, q.on('soort', 1, 0.5)); x9nandoe(ctx, 1260, 560, 2.2, { a: sa }); x9nandoeKlein(ctx, 1580, 880, 2.2, { a: sa });
    naamBij(ctx, 'grote nandoe', 'vooral noorden', 1260, 190, an, 'center', C.teal); naamBij(ctx, 'kleine nandoe', 'vooral zuiden', 1580, 620, as, 'center', C.oker); },

  // ---------------- H3 De eilanden
  s18(ctx, t, q) { x9schema(ctx); const z = ease(clamp(t / 2.6, 0, 1)); const P = x9kaart(ctx, 100, 130, 1720, 700, lerp(-75, -100, z), lerp(25, 0, z), -30, 25);
    const g = q.on('Galápagos', 1, 0.5); E9.ap(ctx, g, () => x9plek(ctx, P, -90.5, -0.7, 'Galápagos', 'september 1835', { dy: -60, align: 'center' })); E9.gloed(ctx, ...P(-90.5, -0.7), 22, g * (1 - q.on('kust', 1, 0.6)));
    const m = q.on('kust', 1, 1.0); const [a, b] = P(-89.5, -1.5), [c] = P(-80.5, -1.5); if (m > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(c, b + 30); ctx.lineTo(lerp(c, a, m), b + 30); ctx.stroke(); }
    E9.ap(ctx, ramp(m, 0.9, 0.1), () => metaText(ctx, 'ongeveer 1000 kilometer', (a + c) / 2, b + 74, C.goud, 'center', 26));
    const k = q.on('Kaapverdische', 1, 0.5); E9.ap(ctx, k, () => x9plek(ctx, P, -23.6, 15.5, 'Kaapverdische eilanden', 'januari 1832', { kleur: C.text2, dy: -60, align: 'right', dx: -10 })); E9.gloed(ctx, ...P(-23.6, 15.5), 22, k * 0.8, C.text2); },

  s19(ctx, t, q) { x9lava(ctx, { hor: 520 }); vul(ctx, [[300, 820], [420, 740], [620, 760], [700, 830]], '#4A4A4C'); vul(ctx, [[1150, 820], [1260, 730], [1460, 750], [1560, 830]], '#4A4A4C');
    x9spotlijster(ctx, 500, 760, 14); naamBij(ctx, 'spotlijster', 'Charles-eiland', 500, 470, q.on('eiland', 1, 0.5), 'center', C.goud);
    const b2 = q.on('komen', 1, 0.5); x9spotlijster(ctx, 1350, 752, 14, { kijk: -1, pal: ['#4E463F', '#7C7268', '#E6DED0'], a: b2 }); naamBij(ctx, 'spotlijster', 'Chatham-eiland', 1350, 470, b2, 'center', C.goud);
    const h = q.on('anders', 1, 0.6); E9.gloed(ctx, 560, 640, 60, h * (0.7 + 0.3 * Math.sin(t * 3))); E9.gloed(ctx, 1290, 632, 60, h * (0.7 + 0.3 * Math.sin(t * 3 + 1)));
    evoSchaal(ctx, 'vogels vergroot · ongeveer 25 centimeter'); },

  s20(ctx, t, q) { x9lava(ctx, { hor: 520 }); x9schildpad(ctx, 'koepel', 560, 840, 3.6, { nek: -0.15 + 0.08 * Math.sin(t * 0.8) });
    const op = q.on('daar', 1, 1.6); x9schildpad(ctx, 'zadel', 1360, 840, 3.6, { nek: lerp(-0.3, 1, op) });
    naamBij(ctx, 'koepelschild', 'vochtig eiland, laag voedsel', 560, 400, q.on('koepelschild', 1, 0.5), 'center');
    naamBij(ctx, 'zadelschild', 'droog eiland, nek omhoog', 1360, 300, q.on('zadelschild', 1, 0.5), 'center', C.goud); evoSchaal(ctx, 'reuzenschildpadden · 1,4 tot 1,5 meter'); },

  s21(ctx, t, q) { x9schema(ctx); const P = x9kaart(ctx, 100, 130, 1720, 720, -100, 30, -40, 30);
    const g = q.on('Galápagos', 1, 0.5), k = q.on('Kaapverdische', 1, 0.5); const [g1, g2] = P(-90.5, -0.7), [k1, k2] = P(-23.6, 15.5);
    E9.ap(ctx, g, () => { circ(ctx, g1, g2, 12, C.text, null); naamBij(ctx, 'Galápagos', null, g1 + 10, g2 - 50, 1, 'left'); }); E9.ap(ctx, k, () => { circ(ctx, k1, k2, 12, C.text, null); naamBij(ctx, 'Kaapverdië', null, k1, k2 - 40, 1, 'center'); });
    const v = q.on('vulkanisch', 1, 0.6); E9.gloed(ctx, g1, g2, 34, v); E9.gloed(ctx, k1, k2, 34, v);
    E9.ap(ctx, v, () => { metaText(ctx, 'vulkanisch · droog', g1 + 10, g2 + 70, C.grain, 'left', 24); metaText(ctx, 'vulkanisch · droog', k1, k2 + 70, C.grain, 'center', 24); }); },

  s23(ctx, t, q) { x9schema(ctx); const P = x9kaart(ctx, 100, 130, 1720, 720, -100, 30, -40, 30);
    const [g1, g2] = P(-90.5, -0.7), [z1, z2] = P(-60, -12), [k1, k2] = P(-23.6, 15.5), [f1, f2] = P(5, 12); const a1 = q.on('Amerika', 1, 1.0), a2 = q.on('Afrika', 1, 1.0), pul = q.on('stempel', 1, 0.5);
    e9pijl(ctx, z1, z2, g1 + 30, g2 + 6, C.teal, a1, 6 + 2 * pul * Math.sin(t * 4) ** 2, 24); e9pijl(ctx, f1, f2, k1 + 26, k2, C.oker, a2, 6 + 2 * pul * Math.sin(t * 4) ** 2, 24);
    circ(ctx, g1, g2, 12, a1 > 0.5 ? C.teal : C.text); circ(ctx, k1, k2, 12, a2 > 0.5 ? C.oker : C.text);
    naamBij(ctx, 'Galápagos', a1 > 0.5 ? 'lijkt op Zuid-Amerika' : null, g1 + 10, g2 - 70, 1, 'left', a1 > 0.5 ? C.teal : C.text); naamBij(ctx, 'Kaapverdië', a2 > 0.5 ? 'lijkt op Afrika' : null, k1, k2 - 40, 1, 'center', a2 > 0.5 ? C.oker : C.text); },

  s24(ctx, t, q) { x9lava(ctx, { hor: 520 }); const v = q.on('vinken', 1, 0.5);
    [[560, 'groot', 15.5], [960, 'middel', 12.5], [1360, 'zanger', 10]].forEach(([x, sr, cm], i) => { vul(ctx, [[x - 150, 840], [x - 90, 790], [x + 90, 790], [x + 150, 840]], '#4A4A4C'); x9vink(ctx, sr, x, 795, cm, { s: 1.6, kijk: i % 2 ? -1 : 1, t: t * 0.3 + i }); });
    evoSchaal(ctx, 'Galápagos · vinken vergroot'); },

  s26(ctx, t, q) { x9schema(ctx); roundRect(ctx, 260, 380, 1400, 420, 18); shape(ctx, '#5A4030', '#7A5A44', 3); const lab = q.on('apart', 1, 0.5), geen = q.on('Sommige', 1, 0.6);
    [[480, 640, 'groot', 15.5], [800, 650, 'middel', 12.5], [1120, 640, 'zanger', 10], [1440, 650, 'middel', 12.5]].forEach(([x, y, sr, cm], i) => { x9vink(ctx, sr, x, y, cm, { s: 1.3, kijk: i % 2 ? -1 : 1, a: lerp(0.4, 1, ramp(t, i * 0.25, 0.4)) });
      E9.ap(ctx, lab, () => { roundRect(ctx, x - 60, y + 40, 120, 54, 8); shape(ctx, '#E6DCC4', '#C9BC9C', 1.5); text(ctx, '?', x, y + 82, fTekst(40, 800), '#7A6A5A', 'center'); }); });
    E9.gloed(ctx, 1120, 600, 90, geen * (0.7 + 0.3 * Math.sin(t * 3))); E9.ap(ctx, geen, () => metaText(ctx, 'geen vink?', 1120, 470, C.goud, 'center', 26));
    naamBij(ctx, 'vinken, slordig verzameld', 'eiland meestal niet genoteerd', 960, 300, q.on('weinig', 1, 0.5), 'center'); },

  s27(ctx, t, q) { x9schema(ctx); const gd = q.on('Gould', 1, 0.3), v = q.on('vinken', 1, 0.6), sp = q.on('spotlijsters', 1, 0.6);
    x9mens(ctx, 'x9gould', 300, 880, 540, { uit: t > q.at('Gould') && t < q.at('Later') && Math.sin(t * 8) > 0 ? 'praat' : 'neutraal', pose: t > q.at('vinken') ? 'wijs' : 'staan', a: gd }); naamBij(ctx, 'John Gould', 'vogelkenner · Londen, januari 1837', 320, 250, gd, 'center');
    [[800, 'groot', 15.5, 'grote grondvink'], [1120, 'middel', 12.5, 'middelste grondvink'], [1440, 'zanger', 10, 'zangervink']].forEach(([x, sr, cm, n]) => { x9vink(ctx, sr, x, 540, cm, { s: 1.4, houding: 'staan', a: lerp(0.45, 1, v) }); E9.ap(ctx, v, () => metaText(ctx, n, x, 590, C.grain, 'center', 24)); });
    naamBij(ctx, 'allemaal vinken', 'nauw verwante nieuwe soorten', 1120, 250, q.on('verwante', 1, 0.5), 'center', C.goud);
    [[800, 'Charles'], [1100, 'Albemarle'], [1400, 'Chatham en James']].forEach(([x, n], i) => E9.ap(ctx, ramp(sp, i * 0.25, 0.5), () => { x9spotlijster(ctx, x, 830, 6); metaText(ctx, n, x, 870, C.grain, 'center', 24); }));
    naamBij(ctx, 'spotlijsters: drie soorten', null, 1100, 700, q.on('soorten', 2, 0.5), 'center'); },

  // ---------------- H4 I think
  s28(ctx, t, q) { x9schema(ctx); const o = ease(clamp(t / 1.2, 0, 1));
    ctx.save(); ctx.translate(560, 0); ctx.scale(lerp(0.5, 1, o), 1); ctx.translate(-560, 0); x9boek(ctx, 560, 140, 800, 740); ctx.restore();
    if (o < 0.6) { ctx.save(); ctx.globalAlpha = 1 - o / 0.6; roundRect(ctx, 546, 130, 828, 760, 14); ctx.fillStyle = '#5A3E2E'; ctx.fill(); metaText(ctx, 'notitieboek B', 960, 520, C.grain, 'center', 30); ctx.restore(); }
    const gr = ramp(t, q.at('boom'), Math.max(1, q.at('Erboven') - q.at('boom')));
    x9ithink(ctx, 960, 780, 1.9, { groei: gr, ik: q.on('Erboven', 1, 0.6), a: o });
    E9.ap(ctx, o, () => metaText(ctx, 'notitieboek B · juli 1837 · vereenvoudigd', 960, 930, C.text2, 'center', 26)); },

  s29(ctx, t, q) { x9schema(ctx); x9boek(ctx, 120, 160, 700, 680, { a: 0.45 }); x9ithink(ctx, 470, 760, 1.6, { a: 0.6 });
    naamBij(ctx, 'soorten splitsen', null, 1360, 150, q.on('splitsen', 1, 0.5), 'center');
    const n = q.on('nandoes', 1, 0.6), s = q.on('eilandvogels', 1, 0.6), r = q.on('reuzen', 1, 0.6), y = 620;
    e9splits(ctx, 1040, y, ramp(t, q.at('nandoes'), 1.0), C.groen, 110, 130); E9.ap(ctx, n, () => { x9nandoe(ctx, 930, y - 140, 1.15); x9nandoeKlein(ctx, 1150, y - 140, 1.15); });
    e9splits(ctx, 1360, y, ramp(t, q.at('eilandvogels'), 1.0), C.groen, 110, 130); E9.ap(ctx, s, () => { x9spotlijster(ctx, 1250, y - 140, 4); x9spotlijster(ctx, 1470, y - 140, 4, { kijk: -1, pal: ['#4E463F', '#7C7268', '#E6DED0'] }); });
    e9splits(ctx, 1690, y, ramp(t, q.at('reuzen'), 1.0), C.groen, 110, 130); E9.ap(ctx, r, () => { x9glyptodon(ctx, 1580, y - 140, 0.36); x9gordeldier(ctx, 1800, y - 140, 2.0, { kijk: -1 }); });
    naamBij(ctx, 'gemeenschappelijke voorouder', 'van verwante soorten', 1010, y + 110, q.on('voorouder', 1, 0.5), 'left', C.groen);
    E9.gloed(ctx, 1040, y, 24, q.on('voorouder', 1, 0.4) * (1 - ramp(t, q.at('voorouder') + 1.5, 0.6)), C.groen); },

  s30(ctx, t, q) { x9schema(ctx); grafiekAs(ctx, 220, 800, 900, 560, { xLabel: 'tijd', yt: [] }); const bv = q.on('bevolking', 1, 1.4), vd = q.on('voedsel', 1, 1.2), gap = q.on('jongen', 1, 0.8);
    const yb = (u) => 800 - 60 * Math.pow(2, u * 3.1), yv = (u) => 740 - 220 * u;
    if (gap > 0.01) { ctx.save(); ctx.globalAlpha = 0.25 * gap; ctx.fillStyle = C.koraal; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(220 + u * 900, Math.min(yb(u), yv(u))); } for (let i = 40; i >= 0; i--) { const u = i / 40; ctx.lineTo(220 + u * 900, yv(u)); } ctx.closePath(); ctx.fill(); ctx.restore();
      E9.ap(ctx, gap, () => metaText(ctx, 'te weinig voedsel', 1000, 470, C.koraal, 'right', 24)); }
    if (bv > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 40 * bv; i++) { const u = i / 40; i ? ctx.lineTo(220 + u * 900, yb(u)) : ctx.moveTo(220, yb(u)); } ctx.stroke(); }
    if (vd > 0.01) { ctx.strokeStyle = C.oker; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(220, 740); ctx.lineTo(220 + 900 * vd, yv(vd)); ctx.stroke(); }
    naamBij(ctx, 'bevolking', null, 1000, 240, ramp(bv, 0.9, 0.1), 'left', C.koraal); naamBij(ctx, 'voedsel', null, 1140, 520, ramp(vd, 0.9, 0.1), 'left', C.oker);
    naamBij(ctx, 'Thomas Malthus', 'gelezen in 1838', 220, 190, q.on('Malthus', 1, 0.5), 'left');
    naamBij(ctx, 'Darwin', '1838 · 29 jaar', 1560, 540, 1, 'center'); x9mens(ctx, 'x9darwin', 1560, 880, 260, { pose: 'vasthouden', hold: (c, x, y) => { roundRect(c, x - 10, y - 50, 70, 90, 4); shape(c, '#6A4A3A', '#8A6A50', 2); } });
    const ns = q.on('selectie', 1, 0.6); E9.ap(ctx, ns, () => { roundRect(ctx, 1300, 340, 500, 140, 16); shape(ctx, rgba(C.groen, 0.15), C.groen, 2); text(ctx, 'natuurlijke selectie', 1550, 425, fTekst(48, 700), C.groen, 'center'); }); },

  s31(ctx, t, q) { x9schema(ctx); const y = 780, X = x9tijdas(ctx, 160, y, 1600, 1830, 1860); x9mijl(ctx, X, 1837, y, 'I think', C.text, { boven: false });
    const g = q.on('twintig', 1, 0.8); if (g > 0.01) { ctx.save(); ctx.globalAlpha = g; ctx.setLineDash([10, 8]); roundRect(ctx, X(1838), y - 120, (X(1858) - X(1838)) * g, 100, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); E9.ap(ctx, ramp(t, q.at('twintig') + 0.5, 0.5), () => text(ctx, '?', (X(1838) + X(1858)) / 2, y - 48, fTitel(64), C.goud, 'center')); }
    E9.ap(ctx, q.on('1844', 1, 0.5), () => x9mijl(ctx, X, 1844, y, '±230 blz.', C.goud, { boven: false }));
    const bl = q.on('bladzijden', 1, 1.2); e9stapel(ctx, 700, 470, Math.round(18 * bl), 1);
    E9.ap(ctx, q.on('sterft', 1, 0.5), () => { x9brief(ctx, 1000, 360, 260, { rot: -0.06 }); metaText(ctx, 'aan Emma: uitgeven als ik sterf', 1000, 500, C.grain, 'center', 26); });
    E9.ap(ctx, q.on('moord', 1, 0.6), () => { text(ctx, '“alsof ik een moord beken”', 1560, 300, fTekst(44, 600), C.text, 'center'); metaText(ctx, 'brief aan Hooker · 1844', 1560, 350, C.grain, 'center', 26); }); },

  s32(ctx, t, q) { x9schema(ctx); const y = 700, X = x9tijdas(ctx, 160, y, 1600, 1830, 1860); x9mijl(ctx, X, 1837, y, 'I think', C.text, { boven: false }); x9mijl(ctx, X, 1859, y, 'boek', C.goud, { boven: false });
    ctx.save(); ctx.setLineDash([10, 8]); roundRect(ctx, X(1838), y - 120, X(1858) - X(1838), 100, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, '?', (X(1838) + X(1858)) / 2, y - 48 + 5 * Math.sin(t * 2), fTitel(64), C.goud, 'center'); x9mens(ctx, 'x9darwin', 960, 470, 260, { pose: 'denk' }); naamBij(ctx, 'Darwin', null, 960, 170, 1, 'center'); },

  s34(ctx, t, q) { x9schema(ctx); const X = x9tijdas(ctx, 160, 760, 1600, 1830, 1860);
    const durf = q.on('durfde', 1, 0.5) * (1 - q.on('Vast', 1, 0.6)); E9.ap(ctx, Math.max(durf, t < 0.4 ? 1 : 0), () => { text(ctx, 'Darwin durfde niet?', 960, 200, fTitel(60), C.text2, 'center'); });
    E9.ap(ctx, q.on('Historici', 1, 0.5) * (1 - q.on('Vast', 1, 0.6)), () => doorstreep(ctx, 660, 180, 1260, 180));
    const balk = (j0, j1, tx, k, rij, a) => { if (a <= 0.01) return; const yy = 640 - rij * 110, w = (X(j1) - X(j0)) * a; roundRect(ctx, X(j0), yy, w, 64, 10); shape(ctx, rgba(k, 0.3), k, 2); E9.ap(ctx, ramp(a, 0.7, 0.3), () => text(ctx, tx, (X(j0) + X(j1)) / 2, yy + 45, fTekst(36, 600), C.text, 'center')); };
    balk(1838, 1846, 'boeken over de reis', C.teal, 0, q.on('boeken', 1, 1.0)); balk(1846, 1854, 'zeepokken', C.oker, 1, q.on('zeepokken', 1, 1.0)); balk(1854, 1858.5, 'groot boek', C.groen, 0, q.on('bewijs', 1, 1.0));
    E9.ap(ctx, q.on('zeepokken', 1, 0.6), () => x9zeepok(ctx, X(1850), 410, 1.4));
    naamBij(ctx, 'vaak ziek', 'de hele periode', X(1847), 290, q.on('ziek', 1, 0.5), 'center');
    x9mens(ctx, 'x9darwin', 1740, 420, 260, { uit: t > q.at('ziek') ? 'moe' : 'neutraal' }); naamBij(ctx, 'Darwin', null, 1740, 120, 1, 'center');
    E9.ap(ctx, q.on('Historici', 1, 0.5), () => metaText(ctx, 'historici zijn het oneens over "durfde niet"', 160, 880, C.text2, 'left', 26)); },

  // ---------------- H5 Wallace
  s35(ctx, t, q) { x9zee(ctx, { hor: 600 }); e9golf(ctx, 600, t); const br = q.on('brand', 1, 1.4);
    e9schip(ctx, 960, 680, 18, t, { masten: 2, brand: br * (0.88 + 0.12 * Math.sin(t * 9)) });
    if (br > 0.01) { ctx.save(); ctx.globalAlpha = br * 0.5; for (let i = 0; i < 6; i++) { const u = (t * 0.15 + i / 6) % 1; ctx.fillStyle = rgba('#6A6A72', 0.5 * (1 - u)); ctx.beginPath(); ctx.ellipse(940 + u * 200, 440 - u * 360, 50 + u * 90, 30 + u * 40, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
    const zm = q.on('Wallace', 1, 0.5) * (1 - q.on('brand', 1, 0.5));
    zoomCircle(ctx, 1500, 340, 220, 980, 610, null, zm, () => { ctx.fillStyle = '#2A3650'; ctx.fillRect(1280, 120, 440, 440); ctx.fillStyle = '#5A4232'; ctx.fillRect(1280, 470, 440, 100);
      x9mens(ctx, 'x9wallace', 1420, 480, 300, { uit: 'blij' }); [[1560, 470], [1650, 470], [1605, 404]].forEach(([x, y]) => { roundRect(ctx, x - 42, y - 64, 84, 64, 4); shape(ctx, '#7A5A3A', '#9A7A5A', 2); }); });
    const sl = q.on('Bijna', 1, 0.6); E9.ap(ctx, sl, () => { x9mens(ctx, 'x9wallace', 1560, 760 + Math.sin(t * 1.3) * 4, 200, { uit: 'verbaasd', kijk: -1 }); x9sloep(ctx, 1560, 770 + Math.sin(t * 1.3) * 4, 300); });
    naamBij(ctx, 'de Helen', 'augustus 1852 · verzameling verloren', 960, 160, br, 'center', C.koraal); naamBij(ctx, 'Alfred Russel Wallace', sl > 0.5 ? 'in de sloep' : 'aan boord: zijn verzameling', sl > 0.5 ? 1560 : 1500, sl > 0.5 ? 470 : 90, Math.max(zm, sl), 'center'); },

  s36(ctx, t, q) { x9schema(ctx); const P = x9kaart(ctx, 100, 130, 1300, 740, 95, 150, -15, 12);
    const fb = q.on('februari', 1, 0.5), tn = q.on('Ternate', 1, 0.5); const [hx, hy] = P(128.4, 0.5), [tx, ty] = P(127.4, 0.8);
    E9.gloed(ctx, hx, hy, 40, fb * (1 - tn)); naamBij(ctx, 'Halmahera', 'februari 1858, koorts', hx + 40, hy + 70, fb, 'left', C.goud);
    E9.ap(ctx, tn, () => x9plek(ctx, P, 127.35, 0.8, 'Ternate', 'stuurt het op', { dx: -24, align: 'right', dy: 10 }));
    const vl = ramp(t, q.at('stuurt'), 2.2); if (vl > 0.01) { const bz = (u) => [(1 - u) * (1 - u) * tx + 2 * u * (1 - u) * 1100 + u * u * 1500, (1 - u) * (1 - u) * ty + 2 * u * (1 - u) * 100 + u * u * 210];
      ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30 * vl; i++) { const [x, y] = bz(i / 30); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
      const [bx, by] = bz(vl); x9brief(ctx, lerp(bx, 1580, ramp(vl, 0.9, 0.1)), lerp(by, 220, ramp(vl, 0.9, 0.1)), lerp(80, 150, vl), { rot: 0.1 }); }
    E9.ap(ctx, q.on('Lyell', 1, 0.5), () => metaText(ctx, 'naar Darwin · voor Lyell', 1580, 330, C.grain, 'center', 26));
    x9mens(ctx, 'x9wallace', 1650, 880, 420, { uit: t > q.at('koorts') && t < q.at('Malthus') ? 'moe' : 'neutraal', pose: t > q.at('Malthus') && t < q.at('stuurt') ? 'denk' : 'staan' });
    tag(ctx, 'natuurlijke selectie', 1650, 432, C.groen, q.on('selectie', 1, 0.5) * (1 - q.on('stuurt', 1, 0.5)), 'center', 28); },

  s37(ctx, t, q) { x9schema(ctx); x9mens(ctx, 'x9darwinOud', 760, 880, 560, { uit: t > q.at('eigen') ? 'verbaasd' : 'neutraal', pose: 'vasthouden', hold: (c, x, y) => x9brief(c, x + 40, y - 10, 150, { rot: -0.15 }) });
    tag(ctx, 'natuurlijke selectie', 1240, 400, C.groen, q.on('idee', 1, 0.5), 'center', 34); },

  s39(ctx, t, q) { x9schema(ctx); x9mens(ctx, 'x9darwinOud', 340, 880, 560, { uit: t > q.at('originaliteit') ? 'moe' : 'neutraal', pose: 'vasthouden', hold: (c, x, y) => x9brief(c, x + 40, y - 10, 150, { rot: -0.15 }) });
    naamBij(ctx, 'Darwin, juni 1858', null, 120, 230, 1, 'left'); E9.ap(ctx, q.on('originaliteit', 1, 0.6), () => metaText(ctx, '“al mijn originaliteit wordt verpletterd”', 120, 270, C.grain, 'left', 26));
    const st = q.on('samen', 1, 1.0);
    [['Darwin 1844', C.text, q.on('teksten', 1, 0.5)], ['Darwin 1857', C.text, ramp(t, q.at('teksten') + 0.4, 0.5)], ['Wallace 1858', C.goud, q.on('Wallace', 2, 0.5)]].forEach(([tx, k, a], i) => {
      const x = lerp(980 + i * 280, 1260 + (i - 1) * 40, st), y = lerp(520, 520 - i * 14, st); E9.ap(ctx, a, () => { x9brief(ctx, x, y - 30 * (1 - a), 220, { zegel: false, rot: (i - 1) * 0.05 }); E9.ap(ctx, 1 - clamp(st * 3, 0, 1), () => text(ctx, tx, x, 680, fTekst(36, 600), k, 'center')); }); });
    E9.ap(ctx, ramp(st, 0.5, 0.5), () => { text(ctx, 'Darwin 1844 · Darwin 1857 · Wallace 1858', 1260, 680, fTekst(32, 600), C.text, 'center'); });
    haak(ctx, 960, 1560, 720, 'samen voorlezen · geregeld door Lyell en Hooker', C.groen, q.on('voorgelezen', 1, 0.6)); },

  s40(ctx, t, q) { ctx.fillStyle = '#2A2630'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3440'; ctx.fillRect(0, 760, W, 320);
    for (let i = 0; i < 5; i++) dim(ctx, () => x9stoel(ctx, 260 + i * 150, 900, 1), 0.5);
    const lw = q.on('beiden', 1, 0.5); x9stoel(ctx, 1080, 900, 1, t > q.at('Darwin') ? 'Darwin' : null); x9stoel(ctx, 1300, 900, 1, t > q.at('Wallace') ? 'Wallace' : null);
    E9.gloed(ctx, 1190, 780, 190, lw * (1 - q.on('secretaris', 1, 0.6)) * 0.8);
    const sc = q.on('secretaris', 1, 0.3); x9mens(ctx, 'x9secretaris', 1640, 880, 460, { uit: t > q.at('secretaris') && t < q.at('Er') && Math.sin(t * 9) > 0 ? 'praat' : 'neutraal', kijk: -1, a: sc });
    x9lessenaar(ctx, 1560, 900, 1.3); x9brief(ctx, 1560, 700, 110, { zegel: false, rot: -0.1 });
    naamBij(ctx, 'Linnean Society, Londen', '1 juli 1858', 160, 200, 1, 'left'); naamBij(ctx, 'twee lege stoelen', 'Wallace op reis · Darwin op een begrafenis', 1190, 620, q.on('zoontje', 1, 0.5), 'center', C.goud);
    naamBij(ctx, 'de secretaris leest voor', null, 1520, 340, sc, 'center'); E9.ap(ctx, q.on('discussie', 1, 0.5), () => metaText(ctx, 'geen discussie', 1640, 400, C.grain, 'center', 26)); },

  s41(ctx, t, q) { x9schema(ctx); const op = ease(clamp(t / 0.9, 0, 1)), dr = q.on('druk', 1, 0.8);
    for (let i = 5; i >= 1; i--) E9.ap(ctx, ramp(dr, (5 - i) * 0.12, 0.4), () => dim(ctx, () => x9origin(ctx, 1160 + i * 60, 800 - i * 14, 440), 0.5));
    x9origin(ctx, 1120, 820 + 60 * (1 - op), 500, { a: lerp(0.3, 1, op) });
    naamBij(ctx, 'On the Origin of Species', '24 november 1859', 160, 380, q.on('Origin', 1, 0.5), 'left', C.goud); naamBij(ctx, 'eerste druk: 1250 exemplaren', 'al vóór verschijnen besteld', 160, 520, dr, 'left');
    stempel(ctx, 1420, 560, 'uitverkocht', C.koraal, q.on('uitverkocht', 1, 0.4), -0.15); },

  // ---------------- Samenvatting
  s42(ctx, t, q) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H);
    const R = [['Onderweg: reuzen naast hun kleine familie, nandoes die elkaar', 0], ['aflossen, eilanddieren die lijken op het vasteland ernaast.', 0], ['Twintig jaar: reisboeken, zeepokken, ziekte en bewijs verzamelen.', q.on('Waarom', 1, 0.6)], ['In 1858 samen met Wallace bekend, in 1859 het boek.', q.on('Wallace', 1, 0.6)]];
    const a0 = lerp(0.4, 1, q.on('Reuzen', 1, 0.6)); R.forEach(([z, a], i) => E9.ap(ctx, i < 2 ? a0 : a, () => text(ctx, z, 160, 280 + i * 100, fTekst(46, 600), C.text, 'left')));
    const n = 1 + q.on('Waarom', 1, 0.6) + q.on('Wallace', 1, 0.6), yb = 230 + 100 * (n + 0.7);
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 230); ctx.lineTo(116, 230); ctx.lineTo(116, Math.min(600, yb)); ctx.lineTo(130, Math.min(600, yb)); ctx.stroke();
    E9.ap(ctx, q.on('film', 1, 0.6), () => { metaText(ctx, 'hoe het werkt', 160, 760, C.grain, 'left', 28); text(ctx, 'Natuurlijke selectie', 160, 840, fTitel(64), C.goud, 'left'); }); },
});
