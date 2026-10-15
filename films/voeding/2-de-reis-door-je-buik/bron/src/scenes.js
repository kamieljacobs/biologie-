// Film 2 · De reis door je buik — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

// ---------- gedeelde scènestukken ----------
function refCard(ctx, txt, x, y, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.font = fTekst(36, 600); const w = ctx.measureText(txt).width + 60; roundRect(ctx, x, y, w, 60, 30); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 1.2); text(ctx, txt, x + 30, y + 40, fTekst(36, 600), C.goud); ctx.restore(); }
function bigLine(ctx, s, x, y, a = 1, color = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, 600), color, align); ctx.restore(); }
function strike(ctx, x0, y, x1, color, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, a), y); ctx.stroke(); ctx.restore(); }
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 58, 29); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
const KLOK = [1760, 200, 62];
function hoekKlok(ctx, uren, tekst, a = 1) { klok(ctx, KLOK[0], KLOK[1], KLOK[2], uren, tekst, a); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }

// kaken met tanden (zijaanzicht, Schema); bite 0..1
function kaken(ctx, x, y, bite, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const gap = 70 * (1 - bite);
  for (const d of [-1, 1]) { const yy = y + d * (gap / 2 + 30);
    roundRect(ctx, x - 230, yy - 22, 460, 44, 20); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2);
    for (let i = 0; i < 7; i++) { const tx = x - 200 + i * 64; ctx.beginPath(); roundRect(ctx, tx, d < 0 ? yy + 18 : yy - 58, 48, 40, 10); shape(ctx, C.text, C.line, 1.5); } }
  ctx.restore();
}
// brokjes brood: n stukjes in een veld
function brokjes(ctx, cx, cy, n, size, a = 1, seed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const per = Math.ceil(Math.sqrt(n)); for (let i = 0; i < n; i++) { const r = Math.floor(i / per), c = i % per; const x = cx + (c - (per - 1) / 2) * size * 1.35 + (hash(i + seed) - 0.5) * size * 0.3, y = cy + (r - (per - 1) / 2) * size * 1.35 + (hash(i * 3 + seed) - 0.5) * size * 0.3;
    roundRect(ctx, x - size / 2, y - size / 2, size, size, size * 0.2); shape(ctx, rgba(V.kh, 0.55), V.kh, 1.5); } ctx.restore(); }
// schematische maagdoorsnede (groot), linksboven ingang op (x, y), schaal s
function maagGroot(ctx, x, y, s, t, o = {}) {
  const { kneed = 0, brij = 1, zuur = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const wob = kneed * 6 * Math.sin(t * 2.2);
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + wob / 400, 1 - wob / 400); ctx.translate(-x, -y);
  buisPad(ctx, [[x + 20 * s, y - 140], [x + 20 * s, y + 4]], 40 * s / 1.45); maagVorm(ctx, x, y, s, 3);
  if (brij > 0.01) { ctx.save(); maagPad(ctx, x, y, s); ctx.clip(); ctx.globalAlpha *= brij; ctx.fillStyle = rgba(V.kh, 0.32); ctx.fillRect(x - 100 * s, y + 80 * s, 460 * s, 200 * s);
    for (let i = 0; i < 26; i++) { const px = x + (-50 + hash(i) * 330) * s, py = y + (100 + hash(i + 50) * 130) * s; const w = wander(i + 400, t, 6, 0.4); ctx.beginPath(); ctx.arc(px + w.x, py + w.y, 7, 0, 6.283); ctx.fillStyle = i % 3 ? rgba(V.kh, 0.8) : rgba(V.ew, 0.9); ctx.fill(); }
    if (zuur > 0.01) { ctx.globalAlpha = a * zuur; for (let i = 0; i < 30; i++) { const px = x + (-60 + hash(i + 9) * 360) * s, py = y + (20 + hash(i + 90) * 220) * s; const w = wander(i + 900, t, 10, 0.6); text(ctx, 'H⁺', px + w.x, py + w.y, fMeta(28), C.koraal, 'center'); } }
    ctx.restore(); }
  ctx.restore(); ctx.restore();
}
const GIER = (ctx, x, y, s, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.mens;
  ctx.beginPath(); ctx.ellipse(x, y, 90 * s, 54 * s, 0.25, 0, 6.283); ctx.fill(); // romp
  ctx.beginPath(); ctx.moveTo(x - 70 * s, y - 20 * s); ctx.quadraticCurveTo(x - 10 * s, y - 120 * s, x + 110 * s, y - 40 * s); ctx.lineTo(x + 40 * s, y + 10 * s); ctx.closePath(); ctx.fillStyle = '#7F8898'; ctx.fill(); // vleugel
  ctx.strokeStyle = '#C8BFB0'; ctx.lineWidth = 10 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 60 * s, y - 30 * s); ctx.quadraticCurveTo(x + 110 * s, y - 80 * s, x + 130 * s, y - 60 * s); ctx.stroke(); // kale nek
  ctx.fillStyle = '#C8BFB0'; ctx.beginPath(); ctx.arc(x + 138 * s, y - 62 * s, 18 * s, 0, 6.283); ctx.fill();
  ctx.fillStyle = C.grain; ctx.beginPath(); ctx.moveTo(x + 152 * s, y - 70 * s); ctx.quadraticCurveTo(x + 180 * s, y - 64 * s, x + 168 * s, y - 44 * s); ctx.lineTo(x + 150 * s, y - 54 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(x + 142 * s, y - 68 * s, 3 * s, 0, 6.283); ctx.fill();
  ctx.strokeStyle = C.grain; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x - 10 * s, y + 50 * s); ctx.lineTo(x - 16 * s, y + 100 * s); ctx.moveTo(x + 20 * s, y + 50 * s); ctx.lineTo(x + 24 * s, y + 100 * s); ctx.stroke();
  ctx.restore(); };
// horizontale darm met inhoud die met snelheid v beweegt; out = waterpijltjes eruit 0..1
function dikkeDarmBuis(ctx, x0, x1, yc, r, t, v, o = {}) {
  const { water = 1, out = 1, a = 1, inn = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const wave = (x) => { const ph = (x - x0) / 140 - t * v * 1.4; const s = Math.sin(ph); return s > 0.6 ? (s - 0.6) / 0.4 : 0; };
  darmBuis(ctx, x0, x1, yc, r, wave, 1, null, { haustra: 1, meander: 0.08 });
  ctx.save(); ctx.beginPath(); ctx.rect(x0, yc - r, x1 - x0, 2 * r); ctx.clip();
  for (let i = 0; i < 26; i++) { const u = ((hash(i) + t * v * 0.08) % 1); const px = x0 + u * (x1 - x0), py = yc + (hash(i + 7) - 0.5) * r * 1.1; const ww = i % 3 === 0;
    if (ww) waterMol(ctx, px, py, 8, water * (1 - 0.7 * (u * out))); else { ctx.fillStyle = rgba(V.okerD || V.vt, 0.9); ctx.beginPath(); ctx.arc(px, py, 9, 0, 6.283); ctx.fillStyle = rgba(C.okerD, 0.85); ctx.fill(); } }
  ctx.restore();
  if (out > 0.01) for (let i = 0; i < 5; i++) { const x = x0 + 120 + i * (x1 - x0 - 240) / 4; arrow(ctx, x, yc + r + 20, x, yc + r + 90, C.teal, out, 3); }
  if (inn > 0.01) for (let i = 0; i < 4; i++) { const x = x0 + 190 + i * (x1 - x0 - 380) / 3; arrow(ctx, x, yc - r - 90, x, yc - r - 20, C.koraal, inn, 3); }
  ctx.restore();
}

const DD_PTS = [[260, 250], [520, 235], [760, 260], [830, 320], [760, 375], [520, 360], [330, 385], [270, 445], [340, 500], [560, 490], [790, 515], [850, 580], [780, 635], [540, 625], [320, 650], [260, 710], [330, 765], [600, 770], [800, 760]];
const SCENES = {
  title(ctx, t) { // rechts: kaartlijn verticaal met broodje
    ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1640, 300); ctx.bezierCurveTo(1640, 480, 1800, 480, 1800, 600); ctx.bezierCurveTo(1800, 740, 1580, 720, 1580, 840); ctx.stroke(); ctx.restore();
    [[1640, 300], [1690, 440], [1800, 600], [1640, 770]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 14, 0, 6.283); shape(ctx, C.bgSchema, C.text, 4); });
    broodje(ctx, 1640, 200, 0.9); klok(ctx, 1380, 680, 60, t * 0.6 + 2, null, 1);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const by = q.on('zakje', 1, 1.2), fu = q.on('meteen', 1, 0.3) * ((t - q.at('meteen')) * 0.18 % 1.1);
    bypassSchema(ctx, t, { by, foodU: q.at('meteen') < t ? fu : null, labels: ramp(t, 0.4, 0.6) });
    // eiwit: kraal-ketting die geknipt wordt, linksonder
    const e = q.on('eiwit'), knip = q.on('verteren', 1, 1.2);
    if (e > 0.01) { ctx.save(); ctx.globalAlpha *= e; const pts = coilPath(140, 800, 8, 34, 10); proteinChain(ctx, pts.map((p, i) => [p[0] + (i >= 4 ? 30 * knip : 0), p[1]]), [0, 5, 9, 14, 3, 18, 7, 11], 12); metaText(ctx, 'eiwit', 140, 750, C.grain, 'left', 28); ctx.restore(); }
    vraagteken(ctx, 1100, 620, q.on('Maar') * (0.8 + 0.2 * Math.sin(t * 3)));
    bigLine(ctx, 'Wie knipt het eiwit dan?', 120, 650, q.on('Hoe'), C.goud, 44, 'left');
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const k = q.on('kaart', 1, 0.6), d = q.on('kaart', 1, 4.0);
    broodje(ctx, 960, 470, 1.6, 1 - k); bigLine(ctx, '1 dag later?', 960, 300, q.on('dag') * (1 - k), C.goud, 48);
    kanaalKaart(ctx, { a: k, draw: d, glands: q.on('klieren', 1, 2.0), pos: 0, y: 500 });
    tag(ctx, 'spijsverteringskanaal', 960, 760, C.line, q.on('spijsverteringskanaal') * (1 - q.on('samen')));
    tag(ctx, 'kanaal + klieren = spijsverteringsstelsel', 960, 760, C.teal, q.on('samen'));
    hoekKlok(ctx, (t - q.at('klok')) * 1.2, null, q.on('klok'));
    { const a = q.on('seconden'); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, 'seconden … dagen', KLOK[0] - 20, KLOK[1] + KLOK[2] + 46, fTekst(36, 600), C.goud, 'center'); ctx.restore(); } }
  },
  s05(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 0, 0);
    const bite = Math.max(0, Math.sin(t * 4.5)) * (1 - q.on('mechanische', 1, 0.4));
    kaken(ctx, 400, 470, bite, 1 - q.on('moleculen') * 0.6);
    const fijn = q.on('malen', 1, 2.5); const n = Math.round(1 + fijn * 15);
    brokjes(ctx, 800, 470, n, lerp(110, 26, fijn), 1); arrow(ctx, 650, 470, 700, 470, C.line, 1, 2);
    tag(ctx, 'mechanische vertering', 560, 760, C.groen, q.on('mechanische'));
    // rechts: moleculen blijven gelijk
    const m = q.on('moleculen');
    if (m > 0.01) zoomCircle(ctx, 1380, 440, 230, 860, 470, 'moleculen · vergroot', m, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 210, 460, 460); sugarChain(ctx, 1240, 380, 6, 18); sugarChain(ctx, 1260, 500, 5, 18); });
    bigLine(ctx, 'blijven hetzelfde', 1380, 760, q.on('hetzelfde'), C.text, 36);
    // oppervlak: één blok vs veel blokjes, randen goud
    const o = q.on('oppervlak');
    if (o > 0.01) { ctx.save(); ctx.globalAlpha *= o; ctx.fillStyle = C.bgSchema; ctx.fillRect(1100, 180, 620, 620);
      roundRect(ctx, 1160, 360, 180, 180, 16); shape(ctx, rgba(V.kh, 0.5), C.goud, 4);
      for (let i = 0; i < 16; i++) { const x = 1420 + (i % 4) * 66, y = 330 + Math.floor(i / 4) * 66; roundRect(ctx, x, y, 48, 48, 8); shape(ctx, rgba(V.kh, 0.5), C.goud, 4); }
      text(ctx, 'meer oppervlak', 1450, 720, fTekst(36, 600), C.goud, 'center'); ctx.restore(); }
  },
  s06(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 0, 0);
    // speekselklier met buisje naar de mond (links)
    blob(ctx, 300, 300, 90, 60, 0.05, 2); shape(ctx, rgba(C.teal, 0.3), C.teal, 2);
    label(ctx, 'speekselklier', null, 300, 250, 300, 190, ramp(t, 0.3, 0.6));
    ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(360, 340); ctx.quadraticCurveTo(440, 440, 520, 450); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1); const p = [lerp(360, 520, u), lerp(340, 450, u) - Math.sin(u * 3.14) * 30]; waterMol(ctx, p[0], p[1], 7, ramp(t, 0.5, 0.6)); }
    brokjes(ctx, 640, 520, 9, 40, 1);
    // drie rijen: water+slijm, lysozymen, amylase
    const r1 = q.on('Water'), r2 = q.on('lysozymen'), r3 = q.on('amylase', 1);
    tag(ctx, 'water + slijm: hap glad', 860, 330, C.teal, r1, 'left');
    tag(ctx, 'lysozymen: doden bacteriën', 860, 480, C.koraal, r2, 'left');
    for (let i = 0; i < 4; i++) bacterie(ctx, 1560 + i * 60, 470 + (i % 2) * 30, 1, i * 0.7, r2, C.koraal, q.on('doden', 1, 0.8));
    tag(ctx, 'amylase: knipt zetmeel', 860, 630, C.enzym, r3, 'left');
    const kn = q.on('knipt', 1, 1.0);
    if (r3 > 0.01) { ctx.save(); ctx.globalAlpha *= r3; sugarChain(ctx, 1380, 620, 3, 16); sugarChain(ctx, 1500 + 40 * kn, 620, 3, 16); schaar(ctx, 1490 + 20 * kn, 570, 1.2, 0.5 + 0.5 * Math.sin(t * 6), C.text); ctx.restore(); }
    tag(ctx, 'moleculen knippen = chemische vertering', 960, 800, C.goud, q.on('chemische'));
    refCard(ctx, 'enzymen → film 3', 1440, 150, q.on('drie'));
  },
  s07(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 1, ramp(t, 0.5, 2) * 1.6);
    // slokdarm verticaal
    const x = 640;     ctx.save(); ctx.translate(x, 480); ctx.rotate(Math.PI / 2); ctx.translate(-x, -480);
    const u = clamp((t - q.at('hap')) / 2.5, 0, 1); const hx = lerp(x - 320, x + 320, u);
    darmBuis(ctx, x - 340, x + 340, 480, 46, (xx) => Math.max(0, 1 - Math.abs(xx - (hx - 70)) / 60), 1, null, { meander: 0.05 });
    ctx.beginPath(); ctx.arc(hx, 480, 30, 0, 6.283); shape(ctx, rgba(V.kh, 0.8), V.kh, 2); ctx.restore();
    label(ctx, 'slokdarm', null, x + 50, 300, x + 240, 260, ramp(t, 0.6, 0.6));
    hoekKlok(ctx, (t - q.at('seconden')) * 0.08, 'seconden', q.on('seconden'));
    // mens ondersteboven
    const h = q.on('hoofd'); if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; ctx.translate(1300, 470); ctx.rotate(Math.PI); human(ctx, 0, -170, 300); ctx.restore(); plateLine(ctx, 1150, 1450, 812, h); vraagteken(ctx, 1520, 400, h); }
  },
  s09(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 1, 1.4);
    const x0 = 200, x1 = 1720, yc = 470; const cyc = ((t - q.at('Zo')) * 0.18) % 1; const moving = q.on('Zo', 1, 0.4);
    const hx = moving > 0 ? lerp(x0 + 150, x1 - 150, cyc) : 760;
    darmBuis(ctx, x0, x1, yc, 70, (xx) => Math.max(0, 1 - Math.abs(xx - (hx - 110)) / 70) * Math.max(q.on('Achter'), moving), 1);
    ctx.beginPath(); ctx.arc(hx, darmMid(x0, yc, 70, hx), 42, 0, 6.283); shape(ctx, rgba(V.kh, 0.8), V.kh, 2);
    label(ctx, 'kringspieren', null, 400, yc - 86, 400, 230, q.on('kringspieren') * (1 - moving));
    tag(ctx, 'knijpen samen', hx - 150, yc + 180, C.koraal, q.on('knijpen') * (1 - moving));
    tag(ctx, 'ontspannen', hx + 210, yc + 180, C.groen, q.on('ontspannen') * (1 - moving));
    bigLine(ctx, 'peristaltiek', 960, 760, q.on('peristaltiek'), C.goud, 56);
    bigLine(ctx, 'geduwd, niet gevallen', 960, 220, q.on('geduwd') * (1 - q.on('kringspieren')), C.text, 44);
  },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 2, 2);
    maagGroot(ctx, 420, 320, 1.45, t, { kneed: q.on('kneedt'), brij: q.on('kneedt', 1, 1.2), zuur: q.on('zoutzuur') });
    label(ctx, 'maag', 'ruim 1 liter', 640, 520, 700, 800, q.on('liter') || ramp(t, 0.5, 0.6));
    tag(ctx, 'kneden = mechanische vertering', 1300, 420, C.groen, q.on('mechanische') * (1 - q.on('maagsap')));
    tag(ctx, 'maagsap met zoutzuur', 1300, 420, C.koraal, q.on('maagsap'));
    phSchaal(ctx, 1000, 600, 620, [{ v: 2, label: 'maag ≈ 2', col: C.koraal, a: q.on('ongeveer') }], q.on('zuur,') || q.on('zuur'));
    const am = q.on('amylase'); if (am > 0.01) { ctx.save(); ctx.globalAlpha *= am; schaar(ctx, 1100, 800, 1.4, 0.2, C.line); strike(ctx, 1060, 800, 1150, C.koraal, q.on('stopt')); text(ctx, 'amylase stopt', 1180, 812, fTekst(36, 600), C.text, 'left'); ctx.restore(); }
    refCard(ctx, 'waarom → film 3', 1440, 150, q.on('Waarom'));
  },
  s11(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 2, 2);
    const f1 = q.on('doodt'), f2 = q.on('pepsine', 1), sl = q.on('slijmlaag');
    const top = 1 - sl;
    bigLine(ctx, 'twee functies van zuur', 960, 240, ramp(t, 0.1, 0.6) * (1 - f1), C.koraal, 48);
    // kaart 1: bacteriën
    if (f1 * top > 0.01) { ctx.save(); ctx.globalAlpha *= f1 * top; roundRect(ctx, 160, 200, 760, 520, 20); shape(ctx, rgba(C.koraal, 0.08), C.koraal, 1.5); text(ctx, '1  doodt bacteriën', 200, 270, fTekst(44, 600), C.text);
      for (let i = 0; i < 9; i++) bacterie(ctx, 300 + (i % 3) * 200, 380 + Math.floor(i / 3) * 100, 1.6, i * 0.6, 1, C.koraal, ramp(t, q.at('doodt') + 0.8 + i * 0.12, 0.3)); ctx.restore(); }
    // kaart 2: pepsine knipt eiwit uit kaas
    if (f2 * top > 0.01) { ctx.save(); ctx.globalAlpha *= f2 * top; roundRect(ctx, 1000, 200, 760, 520, 20); shape(ctx, rgba(C.enzym, 0.12), C.enzym, 1.5); text(ctx, '2  laat pepsine werken', 1040, 270, fTekst(44, 600), C.text);
      const kn = q.on('knipt', 1, 1.2); const pts = coilPath(1070, 460, 14, 44, 30); proteinChain(ctx, pts.map((p, i) => [p[0] + (i >= 5 ? 26 * kn : 0) + (i >= 10 ? 26 * kn : 0), p[1]]), [0, 5, 9, 14, 3, 18, 7, 11, 2, 16, 4, 12, 8, 1], 13);
      schaar(ctx, 1290, 400, 1.3, 0.5 + 0.5 * Math.sin(t * 6), C.text, 1 - kn * 0.4); text(ctx, 'eiwit uit de kaas', 1040, 640, fTekst(36), C.text2); text(ctx, 'alleen in zuur', 1040, 690, fTekst(36, 600), C.koraal, 'left', 'alphabetic'); ctx.restore(); }
    // slijmlaag
    if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; text(ctx, 'maagwand', 300, 760, fTekst(36, 600), C.text, 'left');
      ctx.fillStyle = rgba(C.koraal, 0.35); ctx.fillRect(160, 620, 1600, 100); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.strokeRect(160, 620, 1600, 100);
      ctx.fillStyle = rgba(V.neutraal, 0.45); ctx.fillRect(160, 540, 1600, 80); text(ctx, 'slijmlaag', 300, 594, fTekst(36, 600), C.bgSchema, 'left');
      for (let i = 0; i < 24; i++) { const x = 200 + i * 66, y = 300 + (hash(i) * 180) - ((t * 30 + i * 13) % 40); text(ctx, 'H⁺', x, y, fMeta(28), C.koraal, 'center'); }
      ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    GIER(ctx, 620, 480, 1.8, ramp(t, 0.2, 0.8));
    const r = q.on('rotten'); for (let i = 0; i < 8; i++) bacterie(ctx, 420 + (i % 4) * 90, 720 + Math.floor(i / 4) * 50, 1, i, r);
    phSchaal(ctx, 1080, 520, 620, [{ v: 2, label: 'jij ≈ 2', col: C.text, a: q.on('zuurder') }, { v: 1, label: 'gier ≈ 1', col: C.koraal, a: q.on('zuurder', 1, 1.2), below: true }], q.on('maagzuur'));
    vraagteken(ctx, 1390, 300, q.on('handig'));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    for (let i = 0; i < 12; i++) bacterie(ctx, 480 + (i % 4) * 160, 320 + Math.floor(i / 4) * 130, 2, i * 0.5, 1, C.koraal, ramp(t, 0.6 + i * 0.12, 0.3));
    for (let i = 0; i < 40; i++) { const x = 380 + hash(i) * 700, y = 260 + hash(i + 3) * 420 + Math.sin(t + i) * 8; text(ctx, 'H⁺', x, y, fMeta(28), rgba(C.koraal, 0.7), 'center'); }
    tag(ctx, 'verdediging tegen ziekteverwekkers', 1420, 480, C.groen, q.on('verdediging'));
  },
  s15(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 2, 2);
    const byp = q.on('bypass', 1, 1.0);
    maagGroot(ctx, 420, 320, 1.45, t, { brij: 1 - byp * 0.8, zuur: q.on('meer', 1) * (1 - byp * 0.8) });
    // onderste deel (antrum) met cellen; bloedvat lus naar de maagwand bovenaan
    const cel = q.on('onderste'), hor = q.on('hormoon'), naar = q.on('bereikt', 1, 1.0);
    const cells = [[760, 640], [810, 625], [860, 600]];
    cells.forEach(([x, y]) => { ctx.save(); ctx.globalAlpha *= cel; ctx.beginPath(); ctx.arc(x, y, 14, 0, 6.283); shape(ctx, rgba(C.goud, 0.3), C.goud, 2); ctx.restore(); });
    naamBij(ctx, 'cellen die eiwit herkennen', null, 560, 765, cel * (1 - byp), 'center');
    const vat = [[810, 655], [1000, 740], [1080, 520], [1000, 240], [700, 230], [520, 330]];
    if (hor > 0.01) { ctx.save(); ctx.globalAlpha *= hor; ctx.strokeStyle = BLOED; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath(); vat.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      label(ctx, 'bloed', null, 1080, 520, 1180, 620, 1 - byp);
      const n = Math.round(10 * (1 - byp * 0.85)); for (let i = 0; i < n; i++) { const u = ((t * 0.12 + i / 10) % 1) * (0.3 + 0.7 * naar); const p = padPunt(vat, u); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 8, 0, 6.283); ctx.fill(); }
      ctx.restore(); }
    tag(ctx, 'gastrine (hormoon)', 1420, 380, C.goud, q.on('gastrine', 1));
    tag(ctx, 'klieren maken meer zoutzuur', 1420, 480, C.koraal, q.on('meer') * (1 - byp));
    // bypass-inzet
    if (byp > 0.01) { ctx.save(); ctx.globalAlpha *= byp; roundRect(ctx, 1200, 560, 560, 300, 20); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); text(ctx, 'na een gastric bypass', 1240, 616, fTekst(36, 600), C.goud);
      ctx.font = fTekst(36); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, 'geen eten onderin → weinig gastrine → weinig zuur', 1240, 676, 500, 46); ctx.restore(); }
    tag(ctx, 'onthoud dit', 1480, 220, C.goud, q.on('Onthoud'));
  },
  s16(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 2, 2 + ramp(t, 3, 4) * 0.5);
    const mis = q.on('Veel', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= 1 - mis * 0.85;
    maagGroot(ctx, 420, 320, 1.45, t, { brij: 1 - ramp(t, q.at('leeg') - 1, 2) * 0.7 });
    // maagportier: ring onderaan rechts (eind maag ≈ x+110..120*s, y+270*s)
    const px = 420 + 340 * 1.45, py = 320 + 170 * 1.45, open = Math.max(0, Math.sin(t * 1.8)) * q.on('kringspier');
    ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(px, py, 24 - 10 * open, 0, 6.283); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); if (open < 0.05 && u < 0.1) continue; const x = px + 30 + u * 360, y = py + u * 40; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); ctx.fillStyle = rgba(V.kh, 0.8 * q.on('porties')); ctx.fill(); }
    label(ctx, 'maagportier', 'kringspier', px + 10, py + 20, 1150, 760, q.on('maagportier'));
    ctx.restore();
    hoekKlok(ctx, (t - q.at('twee')) * 0.8, '2–4 uur', q.on('twee'));
    // misconceptie
    if (mis > 0.01) { ctx.save(); ctx.globalAlpha *= mis; text(ctx, 'eten in de maag → al in je bloed?', 960, 380, fTekst(48, 600), C.text, 'center'); strike(ctx, 560, 368, 1360, C.koraal, q.on('Maar', 1, 0.8));
      text(ctx, 'de maag neemt bijna niets op', 960, 520, fTekst(48, 600), C.groen, 'center'); ctx.globalAlpha = mis * q.on('Maar'); text(ctx, 'opname gebeurt pas verderop', 960, 610, fTekst(36), C.text2, 'center'); ctx.restore(); }
  },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 4, 3.5);
    // opgevouwen dunne darm (kronkel)
    const pts = DD_PTS; // [520, 235], [760, 260], [830, 320], [760, 375], [520, 360], [330, 385], [270, 445], [340, 500], [560, 490], [790, 515], [850, 580], [780, 635], [540, 625], [320, 650], [260, 710], [330, 765], [600, 770], [800, 760]];
    buisPad(ctx, padDeel(pts, ramp(t, 0.4, 3)), 30, 1, V.neutraal, C.fill, { glad: false });
    label(ctx, 'dunne darm', 'een paar meter', 820, 400, 1100, 330, q.on('meter'));
    vraagteken(ctx, 1400, 640, q.on('Waar'));
  },
  s19(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 4, 4);
    buisPad(ctx, DD_PTS, 30, 1, V.neutraal, C.fill);
    tag(ctx, 'dunne darm: hier gebeurt het meeste', 1390, 400, C.groen, ramp(t, 0.2, 0.6));
    ctx.save(); ctx.globalAlpha *= q.on('Niet'); text(ctx, 'maag', 1390, 560, fTekst(48, 600), C.text2, 'center'); ctx.restore(); strike(ctx, 1310, 548, 1470, C.koraal, q.on('Niet', 1, 0.8));
  },
  s20(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 3, 3);
    // twaalfvingerige darm horizontaal met twee afvoerbuizen van boven
    const yc = 600; darmBuis(ctx, 160, 1760, yc, 90, () => 0, 1);
    label(ctx, 'twaalfvingerige darm', null, 300, yc - 100, 300, 760, ramp(t, 0.3, 0.6), C.text);
    const alv = q.on('alvleesklier'), gal = q.on('gal.') || q.on('gal'), gb = q.on('galblaas'), dw = q.on('darmsap');
    // alvleesklier rechts boven
    if (alv > 0.01) { ctx.save(); ctx.globalAlpha *= alv; blob(ctx, 1280, 280, 170, 50, 0.05, 8); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); text(ctx, 'alvleesklier', 1470, 292, fTekst(36, 600), C.text, 'left');
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1180, 320); ctx.lineTo(1080, 500); ctx.stroke();
      const e = q.on('koolhydraten'), ew = q.on('eiwitten'), v = q.on('vetten');
      for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; const x = lerp(1180, 1080, u), y = lerp(320, 500, u); ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.283); ctx.fill(); }
      schaar(ctx, 1080, 790, 1.4, 0.5 + 0.4 * Math.sin(t * 5), C.text, e); hexagon(ctx, 1150, 790, 20, rgba(V.kh, 0.6), V.kh, 1.3, 0); ctx.globalAlpha = alv * e;
      ctx.globalAlpha = alv; schaar(ctx, 1290, 790, 1.4, 0.5 + 0.4 * Math.sin(t * 5 + 1), C.text, ew); bead(ctx, 1360, 790, 18, 5, { alpha: ew });
      schaar(ctx, 1500, 790, 1.4, 0.5 + 0.4 * Math.sin(t * 5 + 2), C.text, v); if (v > 0.01) { ctx.globalAlpha = alv * v; triglyceride(ctx, 1560, 790, 0.6); }
      ctx.globalAlpha = alv; [['koolhydraten', 1120, e], ['eiwitten', 1330, ew], ['vetten', 1540, v]].forEach(([n, x, aa]) => { if (aa > 0.01) { ctx.save(); ctx.globalAlpha *= aa; text(ctx, n, x, 862, fTekst(36), C.text2, 'center'); ctx.restore(); } });
      ctx.restore(); }
    // lever + galblaas links boven
    if (gal > 0.01) { ctx.save(); ctx.globalAlpha *= gal; blob(ctx, 560, 230, 200, 70, 0.04, 3); shape(ctx, rgba('#8C5A3A', 0.45), '#B07A5A', 2); text(ctx, 'lever', 560, 145, fTekst(36, 600), C.text, 'center');
      ctx.globalAlpha = gal * Math.max(gb, 0.4); blob(ctx, 720, 360, 40, 28, 0.05, 5); shape(ctx, rgba(V.neutraal, 0.5), V.neutraal, 2); ctx.globalAlpha = gal; if (gb > 0.01) label(ctx, 'galblaas', null, 690, 370, 420, 400, gb);
      ctx.strokeStyle = V.neutraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(620, 290); ctx.lineTo(760, 380); ctx.lineTo(880, 500); ctx.stroke();
      const sq = q.on('geknepen', 1, 0.6); for (let i = 0; i < 6; i++) { const u = (t * (0.15 + 0.35 * sq) + i / 6) % 1; ctx.fillStyle = V.neutraal; ctx.beginPath(); ctx.arc(lerp(760, 880, u), lerp(380, 500, u), 5, 0, 6.283); ctx.fill(); }
      text(ctx, 'gal', 900, 450, fTekst(36, 600), V.neutraal, 'left'); ctx.restore(); }
    // darmwand-enzymen onderaan de wand
    if (dw > 0.01) { for (let i = 0; i < 10; i++) schaar(ctx, 300 + i * 140, yc + 66, 0.7, 0.5 + 0.3 * Math.sin(t * 4 + i), C.text, dw); tag(ctx, 'darmsap (darmwand)', 660, 860, C.enzym, dw * (1 - q.on('knipwerk', 1, 1) * 0)); }
  },
  s21(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 3, 3);
    tag(ctx, 'gal is geen enzym', 960, 250, C.koraal, ramp(t, 0.1, 0.6));
    const em = q.on('druppeltjes', 1, 1.6);
    // grote druppel → veel kleine
    ctx.save(); if (em < 0.98) { ctx.globalAlpha *= 1 - em; ctx.beginPath(); ctx.arc(560, 500, 180, 0, 6.283); shape(ctx, rgba(V.vt, 0.55), V.vt, 2); ctx.restore(); ctx.save(); }
    ctx.globalAlpha *= em; for (let i = 0; i < 22; i++) { const a = i * 2.4, rr = 40 + (i % 5) * 34; const x = 560 + Math.cos(a) * rr * 1.3 * em, y = 500 + Math.sin(a) * rr * em; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); shape(ctx, rgba(V.vt, 0.55), V.vt, 2);
      ctx.strokeStyle = V.neutraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 32, 0, 6.283); ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]); } ctx.restore();
    label(ctx, 'vet uit kaas en melk', null, 680, 380, 900, 340, q.on('vet') * (1 - em));
    tag(ctx, 'emulgeren', 560, 800, C.goud, q.on('emulgeren'));
    // enzymen kunnen erbij
    const enz = q.on('beter'); for (let i = 0; i < 5; i++) schaar(ctx, 830 + (i % 2) * 50, 380 + i * 50, 0.9, 0.5 + 0.4 * Math.sin(t * 5 + i), C.text, enz);
    // vraag: mechanisch of chemisch
    const v = q.on('mechanische'); if (v > 0.01) { tag(ctx, 'mechanisch?', 1400, 420, C.groen, v); tag(ctx, 'chemisch?', 1400, 560, C.enzym, v); }
  },
  s23(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 3, 3);
    // inzoomen: druppels kleiner, molecuul heel
    for (let i = 0; i < 12; i++) { const x = 300 + (i % 4) * 110, y = 360 + Math.floor(i / 4) * 110; ctx.beginPath(); ctx.arc(x, y, 30, 0, 6.283); shape(ctx, rgba(V.vt, 0.55), V.vt, 2); }
    const z = q.on('vetmoleculen'); zoomCircle(ctx, 1150, 460, 230, 410, 470, 'vetmolecuul · vergroot', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(920, 230, 460, 460); triglyceride(ctx, 1060, 460, 1.2); });
    tag(ctx, 'mechanisch: moleculen blijven heel', 960, 800, C.groen, ramp(t, 0.2, 0.6));
    tag(ctx, 'knippen = enzymen', 1580, 300, C.enzym, q.on('knippen'));
  },
  s24(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 4, 4.4);
    const k = q.on('geknipt', 1, 1.5);
    // drie rijen: groot → klein
    const rows = [['zetmeel', 300], ['eiwit', 470], ['vet', 640]];
    rows.forEach(([n, y], r) => { const a = q.on(n === 'zetmeel' ? 'zetmeel' : n === 'eiwit' ? 'eiwit' : 'vet'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, n, 160, y + 12, fTekst(36, 600), C.text, 'left');
      if (r === 0) { for (let i = 0; i < 7; i++) hexagon(ctx, 420 + i * (40 + 60 * k), y, 18, rgba(V.kh, 0.6), V.kh, 1.3, 0); }
      else if (r === 1) { for (let i = 0; i < 7; i++) bead(ctx, 420 + i * (34 + 66 * k), y, 15, [0, 5, 9, 14, 3, 18, 7][i]); }
      else { if (k < 0.5) triglyceride(ctx, 420, y, 0.6, 1 - k * 2); if (k > 0.3) { ctx.globalAlpha *= (k - 0.3) / 0.7; roundRect(ctx, 404, y - 34, 12, 68, 5); shape(ctx, rgba(V.vt, 0.7), V.vt, 1.2); fattyAcid(ctx, 520, y - 20, 90); fattyAcid(ctx, 660, y, 90); fattyAcid(ctx, 800, y + 20, 90); } }
      ctx.restore(); });
    // opname door de wand (rechts)
    const op = q.on('opgenomen'); if (op > 0.01) { ctx.save(); ctx.globalAlpha *= op; ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(1260, 220, 60, 520); ctx.strokeStyle = C.koraal; ctx.strokeRect(1260, 220, 60, 520); metaText(ctx, 'darmwand', 1290, 790, C.grain, 'center', 28);
      for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1, x = lerp(1150, 1500, u), y = 270 + i * 85; if (i % 3 === 0) hexagon(ctx, x, y, 14, rgba(V.kh, 0.6), V.kh, 1.3, 0); else if (i % 3 === 1) bead(ctx, x, y, 12, [0, 5, 9, 14, 3, 18][i]); else fattyAcid(ctx, x - 40, y, 70); } text(ctx, 'je lichaam in', 1600, 480, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
    refCard(ctx, 'opname → film 4', 1360, 820, q.on('vier'));
    hoekKlok(ctx, 4 + (t - q.at('drie')) * 0.6, '3–5 uur', q.on('drie', 1));
  },
  s25(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 3, 3);
    phSchaal(ctx, 400, 460, 1120, [{ v: 2, label: 'brij uit de maag', col: C.koraal, a: q.on('zuur.') || q.on('zuur') }], ramp(t, 0.6, 0.6), q.on('zeven') > 0.01 ? [7, 8, 'darmenzymen werken best'] : null);
    const b = q.on('bicarbonaat');
    if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; for (let i = 0; i < 8; i++) { const x = 500 + i * 120 + Math.sin(t * 2 + i) * 10; text(ctx, 'HCO₃⁻', x, 300 + (i % 2) * 40, fMeta(28), C.teal, 'center'); } text(ctx, 'bicarbonaat: een base', 960, 220, fTekst(44, 600), C.teal, 'center'); ctx.restore(); }
    vraagteken(ctx, 1640, 340, q.on('doet'));
  },
  s27(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 3, 3);
    const u = q.on('omhoog', 1, 2.0) || ramp(t, 0.6, 2.4);
    phSchaal(ctx, 400, 460, 1120, [{ v: lerp(2, 7.5, u), label: 'brij', col: lerp(0, 1, u) > 0.7 ? C.groen : C.koraal }], 1, [7, 8, 'darmenzymen werken best']);
    for (let i = 0; i < 8; i++) { const x = 500 + i * 120; text(ctx, 'HCO₃⁻', x, 300 + (i % 2) * 40, fMeta(28), C.teal, 'center'); }
    tag(ctx, 'zuur geneutraliseerd', 960, 220, C.teal, ramp(t, 0.4, 0.6));
    for (let i = 0; i < 4; i++) schaar(ctx, 760 + i * 130, 700, 1.1, 0.5 + 0.4 * Math.sin(t * 6 + i), C.text, q.on('enzymen'));
  },
  s28(ctx, t, q) { bg(ctx, 'schema');
    const notes = { 0: 'zetmeel knippen', 2: 'eiwit knippen, bacteriën doden', 4: 'bijna alles knippen en opnemen' };
    const na = Math.max(q.on('Mond') * (q.on('Maag') < 0.5 ? 1 : 1), 0);
    kanaalKaart(ctx, { y: 380, pos: ramp(t, 0, 6) * 4.4, glands: 0, names: 1, dimOthers: 0, cur: q.on('Dunne') > 0.5 ? 4 : q.on('Maag') > 0.5 ? 2 : 0, notes: { 0: q.on('Mond') ? notes[0] : '', 2: q.on('Maag') > 0.01 ? notes[2] : '', 4: q.on('Dunne') > 0.01 ? notes[4] : '' }, notesA: na });
    hoekKlok(ctx, 7 + (t - q.at('klok')) * 0.4, '6–9 uur', q.on('klok'));
  },

  // ---------- H4 ----------
  s29(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 6, 5.5);
    // dikke darm als omgekeerde U; dunne darm komt links onder binnen; blinde darm + aanhangsel
    const P = [[520, 760], [520, 300], [1400, 300], [1400, 760], [1300, 820]];
    buisPad(ctx, padDeel(P, ramp(t, 0.3, 2.2)), 90, 1, V.neutraal, C.fill, { glad: false, haustra: 1 });
    buisPad(ctx, [[300, 700], [480, 700]], 34); // dunne darm in
    const bd = q.on('blinde');
    if (bd > 0.01) { ctx.save(); ctx.globalAlpha *= bd; ctx.beginPath(); ctx.ellipse(520, 790, 52, 36, 0, 0, 6.283); shape(ctx, C.fill, C.goud, 3);
      ctx.strokeStyle = C.goud; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540, 822); ctx.quadraticCurveTo(580, 870, 640, 860); ctx.stroke(); ctx.restore();
      label(ctx, 'blinde darm', null, 480, 800, 250, 830, bd); label(ctx, 'wormvormig aanhangsel', null, 640, 860, 760, 850, q.on('wormvormig')); }
    label(ctx, 'dunne darm', null, 360, 700, 250, 620, ramp(t, 0.8, 0.6));
    naamBij(ctx, 'dikke darm', null, 960, 182, ramp(t, 1.2, 0.6), 'center');
    // inhoud: water, vezels, rest
    const inh = q.on('aankomt');
    if (inh > 0.01) for (let i = 0; i < 18; i++) { const u = ((t * 0.04 + i / 18) % 1); const p = padPunt(P, u); const ty = i % 3; ctx.save(); ctx.globalAlpha *= inh;
      if (ty === 0) waterMol(ctx, p[0] + (hash(i) - 0.5) * 40, p[1] + (hash(i + 1) - 0.5) * 40, 9, 1 - q.on('waterresorptie') * u); else if (ty === 1) fiber(ctx, p[0] - 30, p[1], 4, 9); else { ctx.beginPath(); ctx.arc(p[0], p[1], 10, 0, 6.283); ctx.fillStyle = C.okerD; ctx.fill(); } ctx.restore(); }
    tag(ctx, 'verteert bijna niets', 960, 520, C.text2, q.on('verteert') * (1 - q.on('taak')));
    const wr = q.on('terugnemen'); if (wr > 0.01) { for (let i = 0; i < 5; i++) arrow(ctx, 700 + i * 130, 360, 700 + i * 130, 460, C.teal, wr, 3); tag(ctx, 'waterresorptie', 960, 560, C.teal, q.on('waterresorptie')); }
  },
  s30(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 6, 6);
    // 9 liter als blok van 9 vakjes; dunne darm neemt de meeste, dikke de rest
    const n = q.on('negen'); const dd = q.on('dunne', 1), dk = q.on('dikke', 1);
    for (let i = 0; i < 9; i++) { const x = 200 + (i % 3) * 120, y = 260 + Math.floor(i / 3) * 120; const weg = i < 7 ? dd : dk * (i === 7 ? 1 : 0.85);
      ctx.save(); ctx.globalAlpha *= n * (1 - 0.8 * weg); roundRect(ctx, x, y, 100, 100, 12); shape(ctx, rgba(C.teal, 0.35), C.teal, 2); ctx.restore(); }
    metaText(ctx, '≈ 9 liter per dag', 380, 680, C.teal, 'center', 28 * (n > 0.01 ? 1 : 1));
    const src = ['eten en drinken', 'speeksel', 'maagsap', 'gal', 'alvleessap', 'darmsap']; const sa = q.on('plus');
    ctx.save(); ctx.globalAlpha *= sa * (1 - dd); src.forEach((s, i) => text(ctx, s, 660, 290 + i * 60, fTekst(36), C.text, 'left')); ctx.restore();
    if (dd > 0.01) { tag(ctx, 'dunne darm: het meeste', 860, 320, C.teal, dd, 'left'); }
    if (dk > 0.01) { tag(ctx, 'dikke darm: de rest', 860, 440, C.teal, dk, 'left'); tag(ctx, 'ontlasting: een klein glas', 860, 560, C.grain, q.on('glas'), 'left'); }
    const kl = q.on('dagen'); hoekKlok(ctx, 8 + (t - q.at('klok')) * 6 * q.on('springt'), '1–2 dagen', kl);
    const b = q.on('bacteriën'); if (b > 0.01) { for (let i = 0; i < 6; i++) bacterie(ctx, 1500 + (i % 3) * 70, 640 + Math.floor(i / 3) * 50, 1, i, b, C.groen); refCard(ctx, 'darmbacteriën → film 6', 1380, 760, q.on('zes')); }
  },
  s31(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, 6, 6);
    const v = 1 + 2.5 * q.on('sneller');
    dikkeDarmBuis(ctx, 200, 1720, 470, 100, t, v, { out: 1 - 0.7 * q.on('sneller'), water: 1 });
    tag(ctx, 'darminfectie: peristaltiek sneller', 960, 230, C.koraal, q.on('darminfectie'));
    vraagteken(ctx, 960, 780, q.on('ontlasting'));
  },
  s33(ctx, t, q) { bg(ctx, 'schema'); miniKaart(ctx, q.on('laatste') > 0.5 ? 7 : 6, q.on('laatste') > 0.5 ? 7 : 6);
    const end = q.on('laatste');
    ctx.save(); ctx.globalAlpha *= 1 - end;
    dikkeDarmBuis(ctx, 200, 1720, 470, 100, t, 3.5, { out: 0.3, water: 1, inn: q.on('extra') });
    tag(ctx, 'te kort: weinig water terug', 960, 230, C.teal, q.on('kort'));
    tag(ctx, 'darmwand maakt extra vocht', 960, 720, C.koraal, q.on('extra'));
    bigLine(ctx, 'diarree', 960, 820, q.on('diarree'), C.goud, 56);
    ctx.restore();
    if (end > 0.01) { ctx.save(); ctx.globalAlpha *= end; buisPad(ctx, [[400, 300], [800, 290], [1100, 310], [1260, 400], [1300, 520], [1300, 640]], 90, 1, V.neutraal, C.fill, { haustra: 0.7 }); ctx.beginPath(); ctx.ellipse(1300, 690, 70, 50, 0, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.stroke();
      label(ctx, 'endeldarm', null, 1300, 560, 1520, 520, 1); label(ctx, 'anus', null, 1300, 740, 1520, 780, 1);
      const f = q.on('ontlasting', 1, 1.4); ctx.beginPath(); ctx.arc(lerp(700, 1300, f), f < 0.5 ? 300 : lerp(300, 560, (f - 0.5) * 2), 24, 0, 6.283); ctx.fillStyle = C.okerD; ctx.fill();
      tag(ctx, 'aandrang', 1600, 400, C.goud, q.on('voel')); ctx.restore(); }
  },

  // ---------- Recap ----------
  s34(ctx, t, q) { bg(ctx, 'schema');
    const sap = q.on('stromen', 1, 2.5), knip = q.on('knippen', 1, 1.2);
    bypassSchema(ctx, t, { by: 1, foodU: ((t * 0.12) % 1), sapU: sap, labels: ramp(t, 0.2, 0.6) * (1 - knip * 0.5) });
    const ov = q.on('slaat', 1, 0.8) * (1 - sap);
    if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.ellipse(1120, 470, 380, 230, 0.22, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    tag(ctx, 'blijven wel zitten', 400, 650, C.goud, q.on('blijven') * (1 - sap));
    if (knip > 0.01) { ctx.save(); ctx.globalAlpha *= knip; roundRect(ctx, 120, 640, 560, 220, 20); shape(ctx, rgba(C.bgSchema, 0.95), C.groen, 1.5);
      const pts = coilPath(160, 740, 8, 40, 10); proteinChain(ctx, pts.map((p, i) => [p[0] + Math.floor(i / 2) * 22 * knip, p[1]]), [0, 5, 9, 14, 3, 18, 7, 11], 12);
      for (let i = 0; i < 3; i++) schaar(ctx, 270 + i * 120, 690, 0.9, 0.5 + 0.4 * Math.sin(t * 6 + i), C.text, 1);
      text(ctx, 'alvleessap + darmsap', 400, 840, fTekst(36, 600), C.groen, 'center'); ctx.restore(); }
    if (sap > 0.01) { ctx.save(); ctx.globalAlpha *= sap * (1 - knip); [[C.koraal, 'alvleessap'], [V.neutraal, 'gal']].forEach(([c, n], i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(140, 560 + i * 54, 9, 0, 6.283); ctx.fill(); text(ctx, n, 164, 572 + i * 54, fTekst(36, 600), C.text, 'left'); }); ctx.restore(); }
    tag(ctx, 'antwoord b', 120, 330, C.groen, q.on('antwoord'), 'left');
    tag(ctx, 'meeste: dunne darm', 120, 430, C.goud, q.on('meeste'), 'left');
  },
  s35(ctx, t, q) { bg(ctx, 'schema');
    kanaalKaart(ctx, { y: 380, pos: Math.min(7, ramp(t, 0.2, 6) * 7), names: 1, cur: -1, notes: { 0: 'seconden', 2: '2–4 uur', 4: '3–5 uur', 6: '1–2 dagen' }, notesA: ramp(t, 0.6, 1.0) });
    refCard(ctx, 'film 3: de enzymen', 760, 760, q.on('volgende'));
  }
};
