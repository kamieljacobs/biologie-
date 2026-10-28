// Dihybride kruising en gekoppelde overerving 2.0 (Erfelijkheid 4/6) — scènes, één functie per gesproken alinea. 28 okt 2026.
// Let op cue-woorden: q.at zoekt een stukje van een woord (hoofdletterongevoelig) en negeert leestekens; nooit op losse letters cuen.
const vragenUit = () => (typeof state !== 'undefined' && state && state.vragen === 'uit');
const _ER = { GR: { kleur: 'geel', vorm: 'rond' }, Gr: { kleur: 'geel', vorm: 'gerimpeld' }, gR: { kleur: 'groen', vorm: 'rond' }, gr: { kleur: 'groen', vorm: 'gerimpeld' } };
const erFeno = (gt) => _ER[(/G/.test(gt) ? 'G' : 'g') + (/R/.test(gt) ? 'R' : 'r')];
const vlFeno = (gt) => ({ lijf: /G/.test(gt) ? 'grijs' : 'zwart', vleugel: /V/.test(gt) ? 'normaal' : 'stomp' });
const pr2 = (a, b) => (a <= b ? a + b : b + a);
function e4Schema(ctx) { bg(ctx, 'schema'); }
function e4Micro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
function e4Tuin(ctx, a = 0.6) { bg(ctx, 'schema'); if (E4_DECOR.complete && E4_DECOR.naturalWidth) { ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(E4_DECOR, 0, 0, W, H); ctx.restore(); } }
function e4Meta(ctx, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, 70, 851, C.text2, 'left', 28); ctx.restore(); }
function e4Pijl(ctx, x1, y1, x2, y2, a = 1, col = C.line, lw = 2.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(an - 0.45), y2 - 16 * Math.sin(an - 0.45)); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(an + 0.45), y2 - 16 * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }
function e4Tekst(ctx, s, x, y, a = 1, px = 40, col = C.text, al = 'center', w = 700) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, al); ctx.restore(); }
function e4Groot(ctx, s, x, y, a = 1, px = 72, col = C.goud, al = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, al); ctx.restore(); }
function e4Term(ctx, term, uitleg, x, y, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(44, 700); const w1 = ctx.measureText(term).width; ctx.font = fTekst(32, 500); const w2 = uitleg ? ctx.measureText(uitleg).width : 0;
  const bw = Math.max(w1, w2) + 64, bh = uitleg ? 128 : 84; roundRect(ctx, x - bw / 2, y, bw, bh, 14); shape(ctx, rgba(C.bgSchema, 0.95), kl, 2);
  text(ctx, term, x, y + 56, fTekst(44, 700), kl, 'center'); if (uitleg) text(ctx, uitleg, x, y + 104, fTekst(32, 500), C.text, 'center'); ctx.restore(); }
// allelchip met gekleurde letters: s = 'GgRr', kl = per letter een kleur
function e4Chip(ctx, s, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { px = 40, kl = null, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + px * 1.0, h = px * 1.45;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.95), hl > 0.01 ? C.goud : C.line, hl > 0.01 ? 3 : 1.5);
  let cx = x - ctx.measureText(s).width / 2; [...s].forEach((ch, i) => { ctx.fillStyle = kl && kl[i] ? kl[i] : C.text; ctx.textAlign = 'left'; ctx.fillText(ch, cx, y + px * 0.36); cx += ctx.measureText(ch).width; }); ctx.restore(); }
const KP1 = E4.p1, KP2 = E4.p2;
// twee chromosoomparen in een cel (staafjes met genband): kleurpaar lang, vormpaar kort
function e4Paren(ctx, cx, cy, s = 1, o = {}) { const { a = 1, hlK = 0, hlV = 0, lab = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  paarGenen(ctx, cx - 110 * s, cy, 220 * s, [[0.35, 'G']], [[0.35, 'g']], { gap: 50 * s, w: 26 * s, px: 40 * s });
  paarGenen(ctx, cx + 120 * s, cy + 30 * s, 150 * s, [[0.45, 'R']], [[0.45, 'r']], { gap: 50 * s, w: 26 * s, px: 40 * s });
  if (hlK > 0.01) { ctx.save(); ctx.globalAlpha *= hlK; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, cx - 110 * s - 90 * s, cy - 135 * s, 180 * s, 270 * s, 16); ctx.stroke(); ctx.restore(); }
  if (hlV > 0.01) { ctx.save(); ctx.globalAlpha *= hlV; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, cx + 120 * s - 90 * s, cy + 30 * s - 100 * s, 180 * s, 200 * s, 16); ctx.stroke(); ctx.restore(); }
  if (lab > 0.01) { naamBij(ctx, 'kleurgen', 'paar 1', cx - 110 * s, cy + 160 * s, lab, 'center'); naamBij(ctx, 'vormgen', 'paar 2', cx + 120 * s, cy + 150 * s, lab, 'center'); }
  ctx.restore(); }
// cel in metafase I met de twee paren in het equatorvlak; swap = vormpaar omgedraaid (0..1, morph)
function e4MetaCel(ctx, cx, cy, swap, a = 1, gl = null, glA = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(cx, cy, 300, 230, 0, 0, 6.283); shape(ctx, rgba('#2A3A58', 0.55), C.line, 1.5);
  ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.line, 0.5); ctx.beginPath(); ctx.moveTo(cx, cy - 210); ctx.lineTo(cx, cy + 210); ctx.stroke(); ctx.restore();
  const P = [[cy - 85, 'G', 'g', 150, 0], [cy + 95, 'R', 'r', 110, swap]];
  P.forEach(([y, A, al, len, sw]) => { const e = ease(sw), dx = 48 * Math.cos(e * Math.PI); // morph: het paar draait om de as door het equatorvlak
    cdChromosoom(ctx, cx - dx, y, len, { w: 16, kl: KP1, xv: 0.12 }); cdChromosoom(ctx, cx + dx, y, len, { w: 16, kl: KP2, xv: 0.12 });
    text(ctx, A, cx - dx * 2.5, y + 14, fTekst(40, 700), C.text, 'center'); text(ctx, al, cx + dx * 2.5, y + 14, fTekst(40, 700), C.text, 'center'); });
  e4Pijl(ctx, cx - 180, cy, cx - 260, cy); e4Pijl(ctx, cx + 180, cy, cx + 260, cy);
  if (gl && glA > 0.01) { gameetChip(ctx, gl[0], cx - 330, cy + 300, { px: 40, a: glA }); gameetChip(ctx, gl[1], cx + 330, cy + 300, { px: 40, a: glA }); e4Pijl(ctx, cx - 250, cy + 120, cx - 320, cy + 250, glA); e4Pijl(ctx, cx + 250, cy + 120, cx + 320, cy + 250, glA); }
  ctx.restore(); }
// gameten-simulatie: N cellen, elk toevallig ligging 1 of 2 en dan een gameet (deterministisch)
const E4SIM = (() => { let s = 7; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; const L = []; for (let i = 0; i < 400; i++) { const lig = r() < 0.5 ? 0 : 1, kant = r() < 0.5 ? 0 : 1; L.push(lig === 0 ? (kant ? 'GR' : 'gr') : (kant ? 'Gr' : 'gR')); } return L; })();
function e4Sim(ctx, n, x0, y0, a = 1) { if (a <= 0.01) return; const K = ['GR', 'Gr', 'gR', 'gr'], c = { GR: 0, Gr: 0, gR: 0, gr: 0 }; for (let i = 0; i < n; i++) c[E4SIM[i]]++;
  ctx.save(); ctx.globalAlpha *= a; const bw = 170, gap = 70, hmax = 420, tot = Math.max(1, n);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 20, y0); ctx.lineTo(x0 + 4 * (bw + gap), y0); ctx.stroke();
  const y25 = y0 - hmax * 0.25 / 0.4; ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.goud, 0.7); ctx.beginPath(); ctx.moveTo(x0 - 20, y25); ctx.lineTo(x0 + 4 * (bw + gap), y25); ctx.stroke(); ctx.restore();
  metaText(ctx, 'een kwart', x0 + 4 * (bw + gap) + 10, y25 + 10, C.goud, 'left', 26);
  K.forEach((k, i) => { const f = c[k] / tot, h = hmax * f / 0.4, x = x0 + i * (bw + gap); if (h > 1) { roundRect(ctx, x, y0 - h, bw, h, 8); shape(ctx, rgba(C.line, 0.45), C.line, 1.5); }
    gameetChip(ctx, k, x + bw / 2, y0 + 56, { px: 34 }); if (n > 0) text(ctx, Math.round(f * 100) + '%', x + bw / 2, y0 - h - 16, fTekst(32, 700), C.text, 'center'); });
  metaText(ctx, n + ' cellen', x0 - 20, y0 - hmax - 20, C.text2, 'left', 28); ctx.restore(); }
// kruisingsschema met erwten in de vakjes (G = 4 gameten boven en links)
function e4Schema16(ctx, x0, y0, c, rows, a = 1, hl = null) { if (a <= 0.01) return; const G = ['GR', 'Gr', 'gR', 'gr'];
  kruisSchema(ctx, x0, y0, 4, 4, c, { a, kopH: 110, zijW: 140, kop: (i, x, y) => gameetChip(ctx, G[i], x, y, { px: 32 }), zij: (j, x, y) => gameetChip(ctx, G[j], x, y, { px: 32, a: j < rows ? 1 : 0.25 }),
    cel: (i, j, x, y) => { if (j >= rows) return; const f = erFeno(G[j] + G[i]); const on = !hl || hl(f); ctx.save(); ctx.globalAlpha *= on ? 1 : 0.3; erwt(ctx, x, y - 14, c * 0.2, Object.assign({ seed: i * 4 + j }, f));
      text(ctx, pr2(G[j][0], G[i][0]) + pr2(G[j][1], G[i][1]), x, y + c * 0.33, fTekst(24, 600), C.text2, 'center'); ctx.restore(); } }); }
// schema met vliegjes: links gameten van de ene ouder, boven die van de andere
function e4VliegSchema(ctx, x0, y0, c, links, boven, a = 1, o = {}) { if (a <= 0.01) return; const { dimRij = [], rijen = links.length, smal = null } = o;
  kruisSchema(ctx, x0, y0, boven.length, links.length, c, { a, kopH: 100, zijW: 140, kop: (i, x, y) => gameetChip(ctx, boven[i], x, y, { px: 30 }),
    zij: (j, x, y) => gameetChip(ctx, links[j], x, y, { px: 30, a: dimRij.includes(j) ? 0.25 : (j < rijen ? 1 : 0.25) }),
    cel: (i, j, x, y) => { if (j >= rijen) return; if (dimRij.includes(j)) { text(ctx, '—', x, y + 14, fTekst(40, 600), rgba(C.text2, 0.6), 'center'); return; } fruitvlieg(ctx, x, y + 6, c * 0.72, vlFeno(links[j] + boven[i])); },
    rand: (i, j) => dimRij.includes(j) ? rgba(C.line, 0.25) : null }); }

Object.assign(SCENES, {
  // ---------------- titel
  title(ctx, t) { [['GR', 1520, 300], ['Gr', 1660, 270], ['gR', 1800, 310]].forEach(([g, x, y], i) => erwt(ctx, x, y, 52, Object.assign({ seed: i + 3 }, _ER[g])));
    paarGenen(ctx, 1660, 620, 260, [[0.3, 'G'], [0.66, 'V']], [[0.3, 'g'], [0.66, 'v']], { gap: 56, w: 30, px: 44 }); },

  // ---------------- Cold open (Macro: moestuin)
  s01(ctx, t, q) { e4Tuin(ctx); const pl = q.on('erwtenplant', 1, 0.6), zaad = q.on('groeide', 1, 0.5), ou = q.on('ouders', 1, 0.5), pe = q.on('peulen', 1, 1.0);
    erwtenplant(ctx, 300, 880, 480, { seed: 2, t }); erwtenplant(ctx, 470, 880, 440, { seed: 5, peulen: 2, t });
    if (pl > 0.01) { ctx.save(); ctx.globalAlpha *= pl * (1 - ou * 0.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(300, 885, 70, 14, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    erwt(ctx, 300, 900, 14, { kleur: 'geel', vorm: 'rond', a: zaad * (1 - pe) });
    // ouders (P) als twee kaartjes met een erwt, gedimd: de grootouders van de erwten in de peul
    [['GR', 1380], ['gr', 1620]].forEach(([g, x]) => { if (ou <= 0.01) return; ctx.save(); ctx.globalAlpha *= ou * (1 - pe * 0.5); roundRect(ctx, x - 100, 170, 200, 170, 14); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); erwt(ctx, x, 245, 40, _ER[g]); ctx.restore(); });
    if (ou > 0.01) { ctx.save(); ctx.globalAlpha *= ou * (1 - pe * 0.5); text(ctx, '×', 1500, 262, fTekst(48, 700), C.text2, 'center'); metaText(ctx, 'ouders van de plant', 1500, 380, C.grain, 'center', 26); ctx.restore(); }
    persoon(ctx, 'henk', 820, 900, 560, { uit: 'blij', pose: pe > 0.01 ? 'vasthouden' : 'staan', kijk: -1, t, hold: (c, hx, hy) => peul(c, hx - 40, hy - 10, 150, { open: pe, rot: 0.15, erwten: [_ER.GR, _ER.Gr, _ER.GR, _ER.gR, _ER.GR] }) }); },
  s02(ctx, t, q) { e4Tuin(ctx); erwtenplant(ctx, 300, 880, 480, { seed: 2, t }); erwtenplant(ctx, 470, 880, 440, { seed: 5, peulen: 2, t });
    let hand = [760, 600]; persoon(ctx, 'henk', 820, 900, 560, { uit: 'blij', pose: 'vasthouden', kijk: -1, t, hold: (c, hx, hy) => { hand = [hx - 40, hy - 10]; peul(c, hx - 40, hy - 10, 150, { open: 1, rot: 0.15, erwten: [_ER.GR, _ER.Gr, _ER.GR, _ER.gR, _ER.GR] }); } });
    const z = ramp(t, 0, 0.8), nw = q.on('ook', 1, 0.6), gp = q.on('grootouders', 1, 0.5);
    zoomCircle(ctx, 1380, 420, 300, hand[0], hand[1], 'erwten uit een paar peulen', z, () => { bg(ctx, 'schema');
      const L = ['GR', 'gr', 'GR', 'GR', 'gR', 'GR', 'Gr', 'GR', 'gr', 'Gr', 'GR', 'gR']; L.forEach((g, i) => { const c = i % 4, r = Math.floor(i / 4); const nieuw = g === 'Gr' || g === 'gR';
        erwt(ctx, 1200 + c * 120 + (r % 2) * 30, 290 + r * 115, 42, Object.assign({ seed: i + 1, hl: nieuw ? nw : 0, a: nieuw ? 1 : 1 - nw * 0.4 }, _ER[g])); }); });
    naamBij(ctx, 'nieuwe combinaties', 'geel-gerimpeld · groen-rond', 1050, 140, nw, 'right', C.goud);
    if (gp > 0.01) { ctx.save(); ctx.globalAlpha *= gp; metaText(ctx, 'grootouders: alleen geel-rond en groen-gerimpeld', 1380, 800, C.text2, 'center', 24); ctx.restore(); } },

  // ---------------- Hoofdstuk 1 (Schema)
  s04(ctx, t, q) { e4Schema(ctx); const xs = [380, 760, 1160, 1540], c = [q.on('geel', 1, 0.5), q.on('groen', 1, 0.5), q.on('Rond', 1, 0.5), q.on('gerimpeld', 1, 0.5)], dom = q.on('dominant', 1, 0.6);
    const F = [['geel', 'rond', 'G', 'geel'], ['groen', 'rond', 'g', 'groen'], ['geel', 'rond', 'R', 'rond'], ['geel', 'gerimpeld', 'r', 'gerimpeld']];
    metaText(ctx, 'kleur', 570, 210, C.text2, 'center', 28); metaText(ctx, 'vorm', 1350, 210, C.text2, 'center', 28);
    F.forEach(([k, v, l, s], i) => { const a = Math.max(0.3, c[i]); erwt(ctx, xs[i], 360, 70, { kleur: k, vorm: v, seed: i + 2, a });
      e4Chip(ctx, l, xs[i], 540, c[i], { px: 56, hl: (l === 'G' || l === 'R') ? dom : 0 }); naamBij(ctx, s, (l === 'G' || l === 'R') ? (dom > 0.5 ? 'dominant' : null) : null, xs[i], 640, c[i], 'center'); });
    ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(960, 230); ctx.lineTo(960, 700); ctx.stroke(); },
  s05(ctx, t, q) { e4Schema(ctx); const p = ramp(t, 0, 0.6), g = q.on('gele', 1, 0.5), gr = q.on('groene', 1, 0.5), f1 = q.on('erwtenplant', 1, 0.8), het = q.on('heterozygoot', 1, 0.6);
    metaText(ctx, 'ouders · raszuiver', 960, 150, C.text2, 'center', 28);
    erwt(ctx, 600, 270, 60, { kleur: 'geel', vorm: 'rond', a: p, hl: g * (1 - f1) }); e4Chip(ctx, 'GGRR', 600, 400, p, { kl: [KP1, KP1, KP1, KP1] });
    erwt(ctx, 1320, 270, 60, { kleur: 'groen', vorm: 'gerimpeld', a: p, seed: 5, hl: gr * (1 - f1) }); e4Chip(ctx, 'ggrr', 1320, 400, p, { kl: [KP2, KP2, KP2, KP2] });
    e4Tekst(ctx, '×', 960, 290, p, 56, C.text2);
    e4Chip(ctx, 'GR', 600, 500, g, { px: 34, kl: [KP1, KP1] }); e4Chip(ctx, 'gr', 1320, 500, gr, { px: 34, kl: [KP2, KP2] });
    e4Pijl(ctx, 640, 530, 900, 640, f1); e4Pijl(ctx, 1280, 530, 1020, 640, f1);
    erwt(ctx, 960, 700, 60, { kleur: 'geel', vorm: 'rond', a: f1, seed: 9 }); e4Chip(ctx, 'GgRr', 960, 820, f1, { kl: [KP1, KP2, KP1, KP2], hl: het });
    naamBij(ctx, 'heterozygoot', 'voor beide genen', 1130, 830, het, 'left', C.goud); },
  s06(ctx, t, q) { e4Micro(ctx); const z = ramp(t, 0, 1.2), k = q.on('kleur', 1, 0.5), v = q.on('vorm', 1, 0.5), lab = q.on('kleurgen', 1, 0.5);
    // cel met kern (rond), de kern zoomt in; staafjes alleen zichtbaar in de kern
    const r = lerp(260, 380, z); ctx.beginPath(); ctx.arc(960, 470, r + 60, 0, 6.283); shape(ctx, rgba('#24324A', 0.7), rgba(C.line, 0.6), 2);
    ctx.beginPath(); ctx.arc(960, 470, r, 0, 6.283); shape(ctx, rgba(C.kern, 0.22), rgba(C.kernR, 0.6), 2);
    ctx.save(); ctx.beginPath(); ctx.arc(960, 470, r - 6, 0, 6.283); ctx.clip(); e4Paren(ctx, 960, 450, lerp(0.8, 1.15, z), { hlK: k * (1 - v), hlV: v, lab }); ctx.restore();
    naamBij(ctx, 'celkern', 'erwtenplant · vergroot', 960 + r + 90, 470, 1, 'left'); e4Meta(ctx, 'vereenvoudigd · twee van de zeven paren'); },
  s07(ctx, t, q) { e4Schema(ctx); e4Paren(ctx, 700, 460, 1.1, { lab: 1 }); [0, 1, 2, 3].forEach(i => gameetCel(ctx, 1260 + (i % 2) * 220, 330 + Math.floor(i / 2) * 240, 80, null, { a: 0.5 }));
    metaText(ctx, 'gameten', 1370, 640, C.text2, 'center', 28); },
  s09(ctx, t, q) { e4Schema(ctx); const l2 = q.on('andersom', 1, 0.5), g1 = q.on('Ligt', 1, 0.5), mid = q.on('midden', 1, 0.5);
    e4MetaCel(ctx, 520, 420, 0, Math.max(mid, ramp(t, 0, 0.5) * 0.6), ['GR', 'gr'], g1); e4MetaCel(ctx, 1400, 420, ramp(t, q.at('andersom'), 1.2), l2, ['Gr', 'gR'], ramp(t, q.at('andersom') + 1.2, 0.5));
    metaText(ctx, 'ligging 1', 520, 165, C.grain, 'center', 28); if (l2 > 0.01) { ctx.save(); ctx.globalAlpha *= l2; metaText(ctx, 'ligging 2 · het vormpaar andersom', 1400, 165, C.grain, 'center', 28); ctx.restore(); }
    naamBij(ctx, 'toeval', null, 960, 300, q.on('toeval', 1, 0.5), 'center', C.goud); e4Meta(ctx, 'meiose I · vereenvoudigd'); },
  s10(ctx, t, q) { e4Schema(ctx); const t0 = q.at('honderden'), n = isFinite(t0) ? Math.floor(400 * clamp((t - t0 + 0.3) / 6, 0, 1) ** 1.6) : 0; const ev = q.on('Beide', 1, 0.5);
    e4Tekst(ctx, 'ligging 1 en ligging 2: elk de helft', 960, 140, ev * (1 - q.on('honderden', 1, 0.5)), 40, C.text2);
    e4Sim(ctx, Math.max(n, 0), 420, 590, q.on('honderden', 1, 0.5)); e4Term(ctx, 'onafhankelijke overerving', 'kleur en vorm los van elkaar verdeeld', 960, 712, q.on('onafhankelijke', 1, 0.6)); },
  s11(ctx, t, q) { e4Schema(ctx); const G = ['GR', 'Gr', 'gR', 'gr'], nw = q.on('Gameten', 1, 0.5), z = q.on('ontstaan', 1, 1.0);
    G.forEach((g, i) => gameetChip(ctx, g, 480 + i * 320, 230, { px: 44, hl: (g === 'Gr' || g === 'gR') ? nw : 0, a: (g === 'Gr' || g === 'gR') ? 1 : 1 - nw * 0.55 }));
    naamBij(ctx, 'nieuw', 'grootouders maakten ze niet', 960, 340, nw * (1 - z), 'center', C.goud);
    [['Gr', 640], ['gR', 1280]].forEach(([g, x]) => { if (z <= 0.01) return; const e = ease(z); gameetChip(ctx, g, x - lerp(140, 40, e), 470, { px: 40, a: 1 - e * 0.3 }); gameetChip(ctx, g, x + lerp(140, 40, e), 470, { px: 40, a: 1 - e * 0.3 });
      erwt(ctx, x, 680, 64, Object.assign({ seed: x, a: ramp(z, 0.6, 0.4) }, _ER[g])); e4Chip(ctx, g === 'Gr' ? 'GGrr' : 'ggRR', x, 800, ramp(z, 0.6, 0.4), { px: 34 }); }); },

  // ---------------- Hoofdstuk 2 (vwo)
  s12(ctx, t, q) { e4Schema(ctx); const G = ['GR', 'Gr', 'gR', 'gr'], st = q.on('stuifmeel', 1, 0.5), ei = q.on('eicellen', 1, 0.5);
    metaText(ctx, 'stuifmeel', 1040, 160, C.text2, 'center', 28); G.forEach((g, i) => gameetChip(ctx, g, 740 + i * 200, 230, { px: 36, a: st }));
    metaText(ctx, 'eicellen', 420, 560, C.text2, 'center', 28); G.forEach((g, i) => gameetChip(ctx, g, 560, 360 + i * 140, { px: 36, a: ei }));
    erwt(ctx, 260, 300, 46, { kleur: 'geel', vorm: 'rond', a: ramp(t, 0, 0.5) }); e4Chip(ctx, 'GgRr', 260, 400, ramp(t, 0, 0.5), { px: 34 }); },
  s14(ctx, t, q) { e4Schema(ctx); const rows = Math.floor(clamp((t - 0.2) / 2.4, 0, 1) * 4.999), c = 150;
    const k = [q.on('Negen', 1, 0.4), q.on('Drie', 1, 0.4), q.on('Drie', 2, 0.4), q.on('Eén', 1, 0.4)], tel = q.on('Tel', 1, 0.4);
    const welke = ['geel rond', 'geel gerimpeld', 'groen rond', 'groen gerimpeld']; let act = -1; k.forEach((v, i) => { if (v > 0.5) act = i; });
    e4Schema16(ctx, 300, 110, c, Math.max(rows, 0), 1, act < 0 ? null : (f) => (f.kleur + ' ' + f.vorm) === welke[act]);
    const X = 1340; [['GR', 9], ['Gr', 3], ['gR', 3], ['gr', 1]].forEach(([g, n], i) => { const a = k[i] * tel; if (a <= 0.01) return; erwt(ctx, X, 260 + i * 120, 36, Object.assign({ seed: i + 7, a }, _ER[g])); e4Groot(ctx, String(n), X + 80, 282 + i * 120, a, 64, C.text); e4Tekst(ctx, welke[i], X + 140, 272 + i * 120, a, 34, C.text, 'left', 600); });
    e4Meta(ctx, 'elk vakje dezelfde kans'); },
  s15(ctx, t, q) { e4Schema(ctx); const v = q.on('Negen', 1, 0.4), m = q.on('Mendel', 1, 0.5); e4Groot(ctx, '9 : 3 : 3 : 1', 960, 180, v, 80);
    const D = [['GR', 315, 9], ['Gr', 101, 3], ['gR', 108, 3], ['gr', 32, 1]], cue = ['driehonderdvijftien', 'honderdeen', 'honderdacht', 'tweeëndertig'], x0 = 380, by = 720, hpx = 380 / 315;
    D.forEach(([g, n, e], i) => { const x = x0 + i * 320, a = q.on(cue[i], 1, 0.6), h = n * hpx * ease(a), hv = 556 * e / 16 * hpx;
      if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 10, by - hv); ctx.lineTo(x + 190, by - hv); ctx.stroke(); ctx.restore(); }
      if (h > 1) { roundRect(ctx, x, by - h, 180, h, 8); shape(ctx, rgba(C.line, 0.45), C.line, 1.5); } e4Tekst(ctx, String(n), x + 90, by - h - 16, a, 36); erwt(ctx, x + 90, by + 50, 30, Object.assign({ seed: i + 4, a: m }, _ER[g])); });
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; metaText(ctx, 'stippellijn: verwachting', 1740, 250, C.goud, 'right', 24); ctx.restore(); }
    e4Meta(ctx, 'Mendel 1866 · 556 erwten van 15 planten', m); },
  s16(ctx, t, q) { e4Schema(ctx); const b0 = ramp(t, 0, 0.5) * 0.3, a1 = Math.max(b0, q.on('Geel', 1, 0.5)), a2 = Math.max(b0, q.on('rond', 1, 0.5)), a3 = q.on('keer', 1, 0.5), a4 = q.on('zestiende', 1, 0.5), pr = q.on('productregel', 1, 0.6);
    e4Tekst(ctx, 'kans op geel', 520, 330, a1, 36, C.text2); e4Groot(ctx, '¾', 520, 450, a1, 110, C.text); erwt(ctx, 520, 540, 34, { kleur: 'geel', vorm: 'rond', a: a1 });
    e4Groot(ctx, '×', 800, 440, a3, 80, C.text2); e4Tekst(ctx, 'kans op rond', 1080, 330, a2, 36, C.text2); e4Groot(ctx, '¾', 1080, 450, a2, 110, C.text);
    e4Groot(ctx, '=', 1310, 440, a4, 80, C.text2); e4Groot(ctx, '9/16', 1530, 450, a4, 110, C.goud);
    e4Term(ctx, 'productregel', 'kansen die allebei moeten gebeuren, vermenigvuldig je', 960, 640, pr, C.groen); e4Meta(ctx, 'mag alleen als de genen onafhankelijk zijn', ramp(t, 0, 0.5)); },
  s17(ctx, t, q) { e4Schema(ctx); const G = ['GR', 'Gr', 'gR', 'gr'], rows = q.on('terug', 1, 0.5), r = Math.floor(clamp((t - q.at('doorgeeft')) / 1.6, 0, 1) * 4.999), v = q.on('één', 1, 0.5);
    kruisSchema(ctx, 540, 120, 1, 4, 150, { a: rows, kopH: 110, zijW: 140, kop: (i, x, y) => gameetChip(ctx, 'gr', x, y, { px: 32 }), zij: (j, x, y) => gameetChip(ctx, G[j], x, y, { px: 32 }),
      cel: (i, j, x, y) => { if (j >= r) return; erwt(ctx, x, y - 10, 34, Object.assign({ seed: j + 2 }, erFeno(G[j]))); text(ctx, pr2(G[j][0], 'g') + pr2(G[j][1], 'r'), x, y + 50, fTekst(24, 600), C.text2, 'center'); } });
    e4Tekst(ctx, 'GgRr × ggrr', 760, 90, rows, 36, C.text2); e4Groot(ctx, '1 : 1 : 1 : 1', 1300, 500, v, 72); },

  // ---------------- Hoofdstuk 3 (basis)
  s18(ctx, t, q) { e4Schema(ctx); const a = ramp(t, 0, 0.6), k = q.on('kleur', 1, 0.5), vl = q.on('vleugels', 1, 0.5), mv = q.on('Hoe', 1, 0.5);
    fruitvlieg(ctx, 520, 470, 380, { lijf: 'grijs', vleugel: 'normaal', a, t }); ctx.fillStyle = C.text; ctx.fillRect(70, 840, 152, 5); metaText(ctx, '1 millimeter · vergroot', 242, 851, C.text2, 'left', 28);
    [['GV', 'grijs · normaal'], ['Gv', 'grijs · stomp'], ['gV', 'zwart · normaal'], ['gv', 'zwart · stomp']].forEach(([g, s], i) => { const x = 1030 + (i % 2) * 420, y = 300 + Math.floor(i / 2) * 330, aa = i === 0 ? k : (i === 2 ? k : vl);
      fruitvlieg(ctx, x, y, 170, Object.assign({ a: Math.max(aa, 0) }, vlFeno(g))); naamBij(ctx, s, null, x, y + 150, aa, 'center'); });
    if (mv > 0.01) { ctx.save(); ctx.globalAlpha *= mv; roundRect(ctx, 960, 760, 860, 70, 12); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 2); text(ctx, 'minder nieuwe combinaties dan bij de erwten', 1390, 806, fTekst(34, 600), C.goud, 'center'); ctx.restore(); } },
  s19(ctx, t, q) { e4Schema(ctx); const a = q.on('hetzelfde', 1, 0.6), g = q.on('grijs', 1, 0.5), z = q.on('zwart', 1, 0.5);
    fruitvlieg(ctx, 420, 460, 300, { lijf: 'grijs', vleugel: 'normaal' }); e4Tekst(ctx, 'GgVv', 420, 700, 1, 40);
    const x = 1220; staafGenen(ctx, x - 40, 470, 360, KP1, [[0.3, 'G'], [0.66, 'V']], { kant: -1, a: Math.max(a, 0.2), letterA: g, w: 32, px: 48 });
    staafGenen(ctx, x + 40, 470, 360, KP2, [[0.3, 'g'], [0.66, 'v']], { kant: 1, a: Math.max(a, 0.2), letterA: z, w: 32, px: 48 });
    naamBij(ctx, 'grijs naast normaal', null, x - 120, 760, g, 'right', KP1); naamBij(ctx, 'zwart naast stomp', null, x + 120, 760, z, 'left', KP2);
    naamBij(ctx, 'twee genen op één chromosoom', null, x, 230, a, 'center', C.goud); },
  s20(ctx, t, q) { e4Schema(ctx); const x = 760; staafGenen(ctx, x - 40, 470, 340, KP1, [[0.3, 'G'], [0.66, 'V']], { kant: -1, w: 30, px: 44 }); staafGenen(ctx, x + 40, 470, 340, KP2, [[0.3, 'g'], [0.66, 'v']], { kant: 1, w: 30, px: 44 });
    naamBij(ctx, 'in zijn geheel', 'elk chromosoom', x, 720, q.on('geheel', 1, 0.5), 'center', C.goud); [0, 1].forEach(i => gameetCel(ctx, 1300 + i * 260, 470, 100, null, { a: 0.5 })); },
  s22(ctx, t, q) { e4Schema(ctx); const sp = ramp(t, 0, 1.6), ge = q.on('gekoppelde', 1, 0.6), mm = q.on('meestal', 1, 0.5);
    const x = 760, y = 420, e = ease(sp), x1 = lerp(x - 40, 560, e), x2 = lerp(x + 40, 1360, e), y1 = lerp(y, 420, e);
    gameetCel(ctx, 560, 420, 130, null, { a: sp }); gameetCel(ctx, 1360, 420, 130, null, { a: sp });
    staafGenen(ctx, x1, y1, lerp(340, 200, e), KP1, [[0.3, 'G'], [0.66, 'V']], { kant: -1, w: lerp(30, 24, e), px: lerp(44, 36, e) }); staafGenen(ctx, x2, y1, lerp(340, 200, e), KP2, [[0.3, 'g'], [0.66, 'v']], { kant: 1, w: lerp(30, 24, e), px: lerp(44, 36, e) });
    naamBij(ctx, 'grijs en normaal', 'de helft', 560, 610, sp, 'center'); naamBij(ctx, 'zwart en stomp', 'de helft', 1360, 610, sp, 'center');
    e4Term(ctx, 'gekoppelde genen', 'liggen op hetzelfde chromosoom, gaan meestal samen mee', 960, 700, ge); },
  s23(ctx, t, q) { e4Schema(ctx); const ou = q.on('ouders', 1, 0.5), l = q.on('normaal', 1, 0.5), r = q.on('andersom', 1, 0.5), hg = q.on('genotype', 1, 0.5);
    const kol = (x, P1, P2, F1, kop, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, kop, x, 130, C.grain, 'center', 26);
      fruitvlieg(ctx, x - 150, 240, 130, vlFeno(P1)); fruitvlieg(ctx, x + 150, 240, 130, vlFeno(P2)); text(ctx, '×', x, 252, fTekst(48, 700), C.text2, 'center');
      paarGenen(ctx, x - 150, 450, 160, [[0.3, P1[0]], [0.66, P1[1]]], [[0.3, P1[0]], [0.66, P1[1]]], { k1: KP1, k2: KP1, gap: 40, px: 32 });
      paarGenen(ctx, x + 150, 450, 160, [[0.3, P2[0]], [0.66, P2[1]]], [[0.3, P2[0]], [0.66, P2[1]]], { k1: KP2, k2: KP2, gap: 40, px: 32 });
      e4Pijl(ctx, x, 560, x, 610); paarGenen(ctx, x, 710, 160, [[0.3, F1[0]], [0.66, F1[1]]], [[0.3, F1[2]], [0.66, F1[3]]], { gap: 46, px: 36 }); text(ctx, 'F1', x - 280, 720, fTekst(40, 700), C.text2, 'center'); ctx.restore(); };
    kol(500, 'GV', 'gv', 'GVgv', 'ouders: grijs-normaal × zwart-stomp', Math.max(ou, l)); kol(1420, 'Gv', 'gV', 'GvgV', 'ouders: grijs-stomp × zwart-normaal', r);
    naamBij(ctx, 'grijs naast normaal', null, 610, 840, l, 'left', C.goud); naamBij(ctx, 'grijs naast stomp', null, 1530, 840, r, 'left', C.goud);
    if (hg > 0.01) { ctx.save(); ctx.globalAlpha *= hg; roundRect(ctx, 760, 40, 400, 64, 12); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 2); text(ctx, 'allebei GgVv', 960, 84, fTekst(34, 700), C.goud, 'center'); ctx.restore(); } },
  s24(ctx, t, q) { e4Schema(ctx); const l = ramp(t, 0, 0.5), r = q.on('Gekoppelde', 1, 0.5), d = q.on('Daarom', 1, 0.5);
    metaText(ctx, 'verschillende chromosomen', 520, 200, C.text2, 'center', 26); ['GR', 'Gr', 'gR', 'gr'].forEach((g, i) => gameetChip(ctx, g, 280 + i * 160, 330, { px: 36, a: l })); e4Tekst(ctx, 'vier soorten · elk een kwart', 520, 450, l, 34, C.text);
    erwt(ctx, 520, 560, 40, { kleur: 'geel', vorm: 'gerimpeld', a: l, hl: d });
    metaText(ctx, 'gekoppelde genen', 1400, 200, C.text2, 'center', 26); ['GV', 'Gv', 'gV', 'gv'].forEach((g, i) => gameetChip(ctx, g, 1160 + i * 160, 330, { px: 36, a: r * ((i === 0 || i === 3) ? 1 : 0.25) }));
    e4Tekst(ctx, 'vooral de twee oude combinaties', 1400, 450, r, 34, C.text); fruitvlieg(ctx, 1400, 580, 120, { lijf: 'grijs', vleugel: 'normaal', a: r });
    ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(960, 180); ctx.lineTo(960, 720); ctx.stroke(); },

  // ---------------- Hoofdstuk 4 (vwo)
  s25(ctx, t, q) { e4Schema(ctx); const a = ramp(t, 0, 0.6), z = q.on('zwart', 1, 0.5), tw = q.on('twee', 1, 0.5), v = q.on('Eén', 1, 0.5);
    e4Tekst(ctx, 'GV/gv × gv/gv', 1270, 100, a, 36, C.text2);
    e4VliegSchema(ctx, 1060, 130, 140, ['GV', 'gv'], ['gv'], Math.max(z, 0.3), { rijen: tw > 0.5 ? 2 : 0 });
    fruitvlieg(ctx, 520, 360, 220, { lijf: 'grijs', vleugel: 'normaal', a }); e4Tekst(ctx, 'GV/gv', 520, 540, a, 36); e4Tekst(ctx, '×', 760, 380, z, 56, C.text2); fruitvlieg(ctx, 760, 560, 160, { lijf: 'zwart', vleugel: 'stomp', a: z, sekse: 'm' });
    e4Groot(ctx, '1 : 1', 1660, 480, v, 72); e4Meta(ctx, 'model · zonder crossing-over'); },
  s26(ctx, t, q) { e4Schema(ctx); const L = ramp(t, 0, 0.8), h = q.on('Twee', 1, 0.5);
    metaText(ctx, 'genen op twee chromosoomparen', 470, 110, C.text2, 'center', 26); metaText(ctx, 'gekoppelde genen · model zonder crossing-over', 1400, 110, C.text2, 'center', 26);
    e4VliegSchema(ctx, 300, 130, 140, ['GV', 'Gv', 'gV', 'gv'], ['gv'], L); e4Groot(ctx, '1 : 1 : 1 : 1', 820, 520, L, 52, C.text);
    e4VliegSchema(ctx, 1230, 130, 140, ['GV', 'Gv', 'gV', 'gv'], ['gv'], 1, { dimRij: [1, 2] }); e4Groot(ctx, '1 : 1', 1720, 520, 1, 56);
    naamBij(ctx, 'twee soorten in plaats van vier', null, 1400, 840, h, 'center', C.goud); },
  s27(ctx, t, q) { e4Schema(ctx); const G = ['GV', 'gv'], c = 220, x0 = 420, y0 = 170, a = ramp(t, 0, 0.6), vk = q.on('vier', 1, 0.5), d = q.on('Drie', 1, 0.5), pr = q.on('productregel', 1, 0.5);
    kruisSchema(ctx, x0, y0, 2, 2, c, { a, kopH: 140, zijW: 170, kop: (i, x, y) => staafGenen(ctx, x - 40, y, 110, i ? KP2 : KP1, [[0.3, G[i][0]], [0.66, G[i][1]]], { kant: 1, px: 30, w: 20 }),
      zij: (j, x, y) => staafGenen(ctx, x - 20, y, 110, j ? KP2 : KP1, [[0.3, G[j][0]], [0.66, G[j][1]]], { kant: 1, px: 30, w: 20 }),
      cel: (i, j, x, y) => { if (Math.max(vk, q.on('maakt', 1, 0.5)) < 0.5) return; fruitvlieg(ctx, x, y + 8, 140, vlFeno(G[i] + G[j])); } });
    e4Tekst(ctx, 'GV/gv × GV/gv', x0 + 170 + c, y0 - 30, a, 36, C.text2, 'center', 600);
    e4Groot(ctx, '3 : 1', 1340, 420, d, 80); e4Tekst(ctx, 'in plaats van 9 : 3 : 3 : 1', 1340, 490, d, 36, C.text2, 'left', 600);
    card(ctx, 1300, 580, 520, 170, 'Productregel per gen?', 'Werkt niet: de genen zijn niet onafhankelijk.', pr, C.koraal); e4Meta(ctx, 'model · zonder crossing-over'); },
  s28(ctx, t, q) { e4Schema(ctx); const x = 640; staafGenen(ctx, x - 40, 460, 330, KP1, [[0.3, 'G'], [0.66, 'v']], { kant: -1, w: 30, px: 44 }); staafGenen(ctx, x + 40, 460, 330, KP2, [[0.3, 'g'], [0.66, 'V']], { kant: 1, w: 30, px: 44 });
    naamBij(ctx, 'grijs naast stomp', null, x - 120, 720, 1, 'right', KP1); naamBij(ctx, 'zwart naast normaal', null, x + 120, 720, 1, 'left', KP2);
    e4Tekst(ctx, '×', 1040, 470, q.on('kruist', 1, 0.5), 56, C.text2); fruitvlieg(ctx, 1300, 460, 220, { lijf: 'zwart', vleugel: 'stomp', a: q.on('kruist', 1, 0.5), sekse: 'm' }); e4Tekst(ctx, 'gv/gv', 1300, 650, q.on('kruist', 1, 0.5), 36); },
  s30(ctx, t, q) { e4Schema(ctx); const a = ramp(t, 0, 0.6), k = q.on('kijk', 1, 0.5);
    e4Tekst(ctx, 'Gv/gV × gv/gv', 760, 100, a, 36, C.text2); e4VliegSchema(ctx, 540, 130, 160, ['Gv', 'gV'], ['gv'], a);
    naamBij(ctx, 'grijs · stompe vleugels', null, 1030, 335, a, 'left'); naamBij(ctx, 'zwart · normale vleugels', null, 1030, 495, a, 'left');
    e4Term(ctx, 'eerst: welke allelen liggen samen?', null, 960, 680, k, C.goud); },

  // ---------------- Hoofdstuk 5 (vwo, crossing-over)
  s31(ctx, t, q) { e4Schema(ctx); const F = [['GV', 0.415], ['gv', 0.41], ['Gv', 0.09], ['gV', 0.085]], bx = 300, by = 700, bw = 220, hmax = 380, kr = Math.max(ramp(t, 0, 0.5), q.on('vrouwtje', 1, 0.5)), m = q.on('meeste', 1, 0.6), p = q.on('paar', 1, 0.6);
    fruitvlieg(ctx, 1500, 260, 150, { lijf: 'grijs', vleugel: 'normaal', a: kr }); e4Tekst(ctx, 'GV/gv', 1500, 395, kr, 32); e4Tekst(ctx, '×', 1620, 270, kr, 44, C.text2); fruitvlieg(ctx, 1740, 270, 130, { lijf: 'zwart', vleugel: 'stomp', sekse: 'm', a: kr });
    naamBij(ctx, 'vrouwtje', null, 1500, 450, kr, 'center'); naamBij(ctx, 'mannetje', null, 1740, 450, kr, 'center');
    F.forEach(([g, f], i) => { const a = i < 2 ? m : p; if (a <= 0.01) return; const x = bx + i * 270, h = hmax * f / 0.415 * ease(a); ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, x, by - h, bw, h, 10); shape(ctx, i < 2 ? rgba(C.line, 0.55) : rgba(C.goud, 0.75), i < 2 ? C.line : C.goud, 1.5); fruitvlieg(ctx, x + bw / 2, by - h - 80, 120, vlFeno(g));
      metaText(ctx, i < 2 ? 'veel' : 'weinig', x + bw / 2, by + 40, i < 2 ? C.text2 : C.goud, 'center', 28); ctx.restore(); });
    e4Meta(ctx, 'terugkruising · verhouding naar Morgan, zonder getallen'); },
  s32(ctx, t, q) { e4Micro(ctx); const y = 460, len = 340, cx = 880, w = 24, u = 0.5, tg = q.on('tegen', 1, 0.8), ch = q.on('chromatiden', 1, 0.5), br = q.on('breken', 1, 0.5), ui = ramp(t, q.at('uitwisselen'), 1.0);
    const gap = lerp(140, 62, ease(tg));
    const L1 = [[0, 1, KP1]], R2 = [[0, 1, KP2]], L2 = ui > 0.5 ? [[0, u, KP1], [u, 1, KP2]] : [[0, 1, KP1]], R1 = ui > 0.5 ? [[0, u, KP2], [u, 1, KP1]] : [[0, 1, KP2]];
    cdChromosoom(ctx, cx - gap, y, len, { w, cen: 0.38, segsL: L1, segsR: L2 }); cdChromosoom(ctx, cx + gap, y, len, { w, cen: 0.38, segsL: R1, segsR: R2 });
    const y0 = y - len * 0.38; [[0.24, 'G', 'g'], [0.78, 'V', 'v']].forEach(([uu, A, a]) => { const by = y0 + uu * len; [cx - gap - 12, cx - gap + 12, cx + gap - 12, cx + gap + 12].forEach(xx => { roundRect(ctx, xx - w / 2 - 2, by - 6, w + 4, 12, 3); shape(ctx, E4.band, _e4d(E4.band, 0.5), 1.5); });
      text(ctx, A, cx - gap - 80, by + 14, fTekst(40, 700), C.text, 'center'); text(ctx, a, cx + gap + 80, by + 14, fTekst(40, 700), C.text, 'center'); });
    naamBij(ctx, 'twee chromatiden', 'per chromosoom', cx - gap - 140, y + 230, ch * (1 - br), 'right');
    if (br > 0.01) { ctx.save(); ctx.globalAlpha *= br; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(cx, y0 + u * len, 44, 26, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'crossing-over', 'tussen de twee genen', cx + 200, y0 + u * len + 4, ramp(t, q.at('crossing-over'), 0.5), 'left', C.goud);
    e4Meta(ctx, 'meiose I · vergroot · niet op schaal'); },
  s33(ctx, t, q) { e4Micro(ctx); const y = 420, len = 300, cx = 380, w = 22, u = 0.5, g4 = q.on('vier', 1, 0.6), rc = q.on('recombinanten', 1, 0.5), nw = q.on('nieuwe', 1, 0.5);
    const L1 = [[0, 1, KP1]], L2 = [[0, u, KP1], [u, 1, KP2]], R1 = [[0, u, KP2], [u, 1, KP1]], R2 = [[0, 1, KP2]];
    cdChromosoom(ctx, cx - 62, y, len, { w, cen: 0.38, segsL: L1, segsR: L2 }); cdChromosoom(ctx, cx + 62, y, len, { w, cen: 0.38, segsL: R1, segsR: R2 });
    const y0 = y - len * 0.38; [[0.24], [0.78]].forEach(([uu]) => { const by = y0 + uu * len; [cx - 74, cx - 50, cx + 50, cx + 74].forEach(xx => { roundRect(ctx, xx - w / 2 - 2, by - 6, w + 4, 12, 3); shape(ctx, E4.band, _e4d(E4.band, 0.5), 1.5); }); });
    naamBij(ctx, 'grijs naast stomp', null, cx, y + 240, nw * (1 - g4), 'center', C.goud);
    e4Pijl(ctx, 620, y, 700, y, g4); const gx = [840, 1100, 1360, 1620], st = [['G', 'V', L1, 'oud'], ['G', 'v', L2, 'nieuw'], ['g', 'V', R1, 'nieuw'], ['g', 'v', R2, 'oud']];
    st.forEach(([A, B, segs, s], i) => { const a = ramp(g4, i * 0.12, 0.4); gameetCel(ctx, gx[i], y, 100, (c, x, yy) => staafGenen(c, x - 16, yy, 140, KP1, [[0.18, A], [0.78, B]], { segs, kant: 1, px: 32, w: 20 }), { a, hl: s === 'nieuw' ? rc : 0 });
      naamBij(ctx, s, null, gx[i], y + 160, a, 'center', s === 'nieuw' ? C.goud : C.text2); });
    haak(ctx, gx[1] - 90, gx[2] + 90, y + 190, 'recombinanten', C.goud, rc); e4Meta(ctx, 'één cel met crossing-over tussen de genen · vergroot'); },
  s34(ctx, t, q) { e4Schema(ctx); const F = [['GV', 0.415], ['gv', 0.41], ['Gv', 0.09], ['gV', 0.085]], ni = ramp(t, 0, 0.6), sch = q.on('kruisingsschema', 1, 0.6), vb = q.on('verbreekt', 1, 0.6);
    // links: veel cellen, een paar met een gouden kruis (crossing-over tussen de genen)
    for (let i = 0; i < 24; i++) { const x = 160 + (i % 6) * 110, y = 220 + Math.floor(i / 6) * 120, co = [3, 10, 17, 21].includes(i); ctx.save(); ctx.globalAlpha *= ni; ctx.beginPath(); ctx.arc(x, y, 42, 0, 6.283); shape(ctx, rgba('#2A3A58', 0.8), co ? C.goud : C.line, co ? 3 : 1.5);
      ctx.strokeStyle = co ? C.goud : rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); if (co) { ctx.moveTo(x - 14, y - 14); ctx.lineTo(x + 14, y + 14); ctx.moveTo(x + 14, y - 14); ctx.lineTo(x - 14, y + 14); } else { ctx.moveTo(x - 8, y - 16); ctx.lineTo(x - 8, y + 16); ctx.moveTo(x + 8, y - 16); ctx.lineTo(x + 8, y + 16); } ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'een paar cellen', 'crossing-over tussen de genen', 480, 760, ni, 'center', C.goud);
    const x0 = 1180, y0 = 200; e4Tekst(ctx, 'gameten van het vrouwtje GV/gv', x0 + 260, y0 - 40, sch, 32, C.text2, 'center', 600); let yy = y0;
    F.forEach(([g, p]) => { const h = Math.max(64, 560 * p); if (sch > 0.01) { ctx.save(); ctx.globalAlpha *= sch; roundRect(ctx, x0, yy, 520, h - 8, 8); shape(ctx, rgba(C.fill, 0.9), (g === 'Gv' || g === 'gV') ? C.goud : C.line, 1.5);
      gameetChip(ctx, g, x0 + 60, yy + (h - 8) / 2, { px: 26 }); text(ctx, p > 0.2 ? 'grote kans' : 'kleine kans', x0 + 130, yy + (h - 8) / 2 + 12, fTekst(30, 600), p > 0.2 ? C.text : C.goud, 'left'); ctx.restore(); } yy += h; });
    e4Term(ctx, 'crossing-over verbreekt de koppeling af en toe', null, 960, 800, vb, C.goud); },

  // ---------------- Recap
  s35(ctx, t, q) { e4Tuin(ctx, 0.45); const k = q.on('verschillende', 1, 0.5), g = q.on('gekoppeld', 1, 0.5);
    persoon(ctx, 'henk', 260, 920, 420, { uit: 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, hx, hy) => peul(c, hx + 30, hy - 10, 110, { open: 1, rot: -0.15, erwten: [_ER.GR, _ER.Gr, _ER.gR, _ER.GR] }) });
    ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, 520, 150, 640, 560, 18); shape(ctx, rgba(C.bgSchema, 0.94), C.line, 1.5); metaText(ctx, 'verschillende chromosomen', 840, 210, C.text2, 'center', 26);
    ['GR', 'Gr', 'gR', 'gr'].forEach((gg, i) => gameetChip(ctx, gg, 620 + i * 145, 320, { px: 32 })); text(ctx, 'vier soorten gameten', 840, 430, fTekst(36, 700), C.text, 'center');
    [['Gr', 740], ['gR', 940]].forEach(([gg, x]) => erwt(ctx, x, 560, 52, Object.assign({ seed: x, hl: 1 }, _ER[gg]))); ctx.restore();
    ctx.save(); ctx.globalAlpha *= g; roundRect(ctx, 1200, 150, 640, 560, 18); shape(ctx, rgba(C.bgSchema, 0.94), C.line, 1.5); metaText(ctx, 'hetzelfde chromosoom', 1520, 210, C.text2, 'center', 26);
    ['GV', 'gv'].forEach((gg, i) => gameetChip(ctx, gg, 1420 + i * 200, 320, { px: 32 })); text(ctx, 'gekoppeld: meestal samen', 1520, 430, fTekst(36, 700), C.text, 'center');
    fruitvlieg(ctx, 1420, 570, 120, { lijf: 'grijs', vleugel: 'normaal' }); fruitvlieg(ctx, 1620, 570, 120, { lijf: 'zwart', vleugel: 'stomp' }); ctx.restore(); },
  s36(ctx, t, q) { e4Schema(ctx); const a = q.on('onafhankelijke', 1, 0.5), b = q.on('gekoppelde', 1, 0.5), c = q.on('crossing-over', 1, 0.5);
    [[a, 'onafhankelijk', '9 : 3 : 3 : 1', C.text], [b, 'gekoppeld', 'vooral de oude combinaties', C.text], [c, 'crossing-over', 'een paar nieuwe: recombinanten', C.goud]].forEach(([v, k, s, col], i) => {
      if (v <= 0.01) return; const x = 340 + i * 620; ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x - 270, 260, 540, 380, 18); shape(ctx, rgba(C.bgSchema, 0.94), i === 2 ? C.goud : C.line, 1.5);
      metaText(ctx, k, x, 330, C.text2, 'center', 28); text(ctx, s, x, 470, fTekst(i === 0 ? 56 : 36, 700), col, 'center');
      if (i === 0) { erwt(ctx, x - 60, 560, 30, _ER.Gr); erwt(ctx, x + 60, 560, 30, _ER.gR); } else fruitvlieg(ctx, x, 560, 90, i === 1 ? { lijf: 'grijs', vleugel: 'normaal' } : { lijf: 'grijs', vleugel: 'stomp' }); ctx.restore(); }); },
  s37(ctx, t, q) { e4Schema(ctx); const a = ramp(t, 0, 0.5); staafGenen(ctx, 960, 440, 380, C.kernR, [[0.4, '']], { a, w: 40, letterA: 0 }); naamBij(ctx, 'X-chromosoom', null, 1040, 450, a, 'left');
    naamBij(ctx, 'volgende film', 'overerving via het X-chromosoom', 960, 760, q.on('volgende', 1, 0.5), 'center', C.goud); }
});
