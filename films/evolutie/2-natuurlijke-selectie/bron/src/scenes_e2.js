// Film 2 · Natuurlijke selectie — geanimeerde scènes (FILMDATA-straat). Eén functie per gesproken alinea; keyframes uit sb2.js.
// Cuewoorden zijn substrings (hoofdletterongevoelig) van de echte woordtijden in words/.
const _E2 = {};
// tak van de merel in het struikdecor: schermhoogte van de bovenkant op x
function _merelTakTop(x) { const P = [[-40, 760], [380, 720], [620, 736], [762, 770]]; for (let i = 0; i < P.length - 1; i++) if (x <= P[i + 1][0]) return lerp(P[i][1], P[i + 1][1], (x - P[i][0]) / (P[i + 1][0] - P[i][0])) - 9; return 761; }
// snavelpunt van de merel (los canvas, alleen meten)
function _merelTip(x, o) { const k = JSON.stringify([x, o]); if (_E2[k]) return _E2[k]; const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  return (_E2[k] = _merelP(g, x, _merelTakTop(x), 2.6, Object.assign({ houding: 'tak', takY: _merelTakTop(x), takDik: 7 }, o))); }
// merel die over de tak hipt van x0 met sprongen van 156 px; u = sprongen (continu)
function _merelHip(ctx, x0, u, o = {}) { const L = 156, mx = o.max ?? 99, k = Math.min(Math.floor(u), mx), f = u >= mx ? 0 : u - Math.floor(u);
  const xa = x0 + k * L, ya = _merelTakTop(xa), yb = _merelTakTop(xa + L);
  if (f < 0.001) return _merelP(ctx, xa, ya, 2.6, Object.assign({}, o, { houding: 'tak', takY: ya, takDik: 7 }));
  return _merelP(ctx, xa, lerp(ya, yb, _sg(f, 0.3, 0.7)), 2.6, Object.assign({}, o, { houding: 'hippen', t: f })); }
// vink in vlucht van A naar B (u 0..1), t = vleugelfase
function _vliegLangs(ctx, A, B, u, s, t, o = {}) { const e = ease(u); const x = lerp(A[0], B[0], e), y = lerp(A[1], B[1], e) - Math.sin(Math.PI * u) * (o.boog || 0);
  grondvink(ctx, x, y, s, Object.assign({}, o, { houding: 'vliegen', t, kijk: B[0] >= A[0] ? 1 : -1 })); }
// gouden maatstreep aan de snavelbasis van een grondvink (houding staan, pik 0) op anker (x, y), schaal s
// echte snavelvlak van de pop (staan) gemeten op een los canvas: [xmin, xmax, ymin, ymax] in eenheden t.o.v. het anker
function _snavelBox(v) { const k = 'sb' + v; if (_E2[k]) return _E2[k]; const c = document.createElement('canvas'); c.width = 400; c.height = 300; const g = c.getContext('2d');
  grondvink(g, 200, 250, 1, { snavel: v, houding: 'staan', snavelKleur: '#ff0000' }); const d = g.getImageData(0, 0, 400, 300).data; let a = 999, b = -999, e = 999, f = -999;
  for (let i = 0; i < d.length; i += 4) if (d[i] > 200 && d[i + 1] < 80 && d[i + 2] < 80) { const q = i / 4, px = q % 400 - 200, py = Math.floor(q / 400) - 250; a = Math.min(a, px); b = Math.max(b, px); e = Math.min(e, py); f = Math.max(f, py); }
  return (_E2[k] = [a, b, e, f]); }
function _snavelMaat(ctx, x, y, s, v, a = 1) { const B = _snavelBox(v), bx = x + s * (B[0] + 2), top = y + s * B[2], bot = y + s * B[3]; if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, top); ctx.lineTo(bx, bot); ctx.moveTo(bx - 8, top); ctx.lineTo(bx + 8, top); ctx.moveTo(bx - 8, bot); ctx.lineTo(bx + 8, bot); ctx.stroke(); ctx.restore(); } return { bx, top, bot }; }
// kop van een grondvink vergroot in een cirkel (snavelhoogte goed zichtbaar), met gouden maatstreep; (cx, cy) = midden van de cirkel
function _kopCirkel(ctx, cx, cy, r, v, k = 5, a = 1, pik = 0) { if (a <= 0.01) return null; const B = _snavelBox(v), mx = (B[0] + 6), my = (B[2] + B[3]) / 2, ax = cx - k * mx + r * 0.15, ay = cy - k * my;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba(C.fill, 0.9); ctx.fill(); ctx.save(); ctx.clip(); grondvink(ctx, ax, ay, k, { snavel: v, houding: 'staan', pik }); ctx.restore();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore();
  const M = _snavelMaat(ctx, ax, ay, k, v, a); return M; }
const _fade = (ctx, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };

Object.assign(SCENES, {
  // ---------------- titel: grondvink op een tak, rustig levend
  title(ctx, t) { lijn(ctx, [[1180, 760], [1800, 740]], '#5A4636', 12);
    const pik = Math.max(0, Math.sin(t * 0.9 - 1)) ** 6; tribulus(ctx, 1640, 724, 0.55, { rot: 0.3 });
    grondvink(ctx, 1480, 748, 2.4, { snavel: 10, pik: pik * 0.5 }); },

  // ---------------- Opening
  s01(ctx, t, q) { _struik(ctx); const B = _struik.bl;
    const kijk = 0.18 * Math.sin(t * 1.6) + 0.12 * q.on('blad', 1, 0.8);
    _merelP(ctx, 308, _merelTakTop(308), 2.6, { houding: 'tak', takY: _merelTakTop(308), takDik: 7, pik: Math.max(0, kijk) });
    rupsOpBlad(ctx, B[3], 0.4, { kleur: '#6BA872', houding: 'kruipen', t: t * 0.6, f: 0.46 + 0.01 * t });
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },
  s02(ctx, t, q) { _struik(ctx); const B = _struik.bl;
    const tip = _merelTip(620, { pik: 0.6 });
    const hip = clamp((t - 0.4) / 1.1, 0, 2), tT = q.at('Toch', 1), pak = tT + 0.5;
    const pik = t < tT ? 0 : t < pak ? 0.6 * _sg(t, tT, pak) : 0.6 * (1 - _sg(t, pak, pak + 0.7));
    if (t < pak) { ctx.save(); ctx.translate(tip[0] + 4, tip[1] + 8); ctx.rotate(0.5); rups(ctx, 0, 0, 0.4, { kleur: '#8C6A48', houding: 'kruipen', t: t * 0.6 }); ctx.restore(); }
    _merelHip(ctx, 308, hip, { max: 2, pik, prooi: t >= pak ? _bruineRups : null });
    const [rx, ry] = rupsOpBlad(ctx, B[3], 0.4, { kleur: '#6BA872', houding: 'kruipen', t: t * 0.6, f: 0.51 });
    focusRing(ctx, rx, ry, 100, 46, q.on('vindt', 1, 0.8));
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },

  // ---------------- H1 Te veel jongen
  s04(ctx, t, q) { macroNacht(ctx, { horizon: 900 });
    opuntiaBoom(ctx, 1380, 1180, 2.6, { t });
    const eieren = t < q.at('twee', 1) ? 0 : t < q.at('vijf', 1) ? 2 : t < q.at('eieren', 1) ? 3 : 4;
    nestje(ctx, 1380, 360, 1.8, eieren);
    const aan = q.at('grondvink', 1), u = clamp(t / aan, 0, 1);
    if (u < 1) _vliegLangs(ctx, [-120, 420], [1240, 352], u, 1.6, t * 1.4, { snavel: 9.3, boog: 120 });
    else grondvink(ctx, 1240, 352, 1.6, { snavel: 9.3, houding: 'staan', pik: 0.35 * Math.max(0, Math.sin((t - aan) * 1.3)) });
    naamBij(ctx, 'middelste grondvink', 'geospiza fortis · ± 12,5 cm', 1180, 100, q.on('grondvink', 1), 'center');
    naamBij(ctx, 'legsel', '2 tot 5 eieren', 1660, 100, q.on('eieren', 1), 'center');
    const cues = ['nat', 'meerdere', 'keren', 'achter'], leg = cues.filter(c => t >= q.at(c, 1)).length;
    _fade(ctx, q.on('nat', 1), () => { metaText(ctx, 'nat jaar · legsels', 110, 220, C.text2, 'left', 26);
      for (let i = 0; i < leg; i++) { ctx.save(); ctx.globalAlpha *= _sg(t, q.at(cues[i], 1), q.at(cues[i], 1) + 0.4); nestje(ctx, 170 + i * 150, 300, 0.9, 4); ctx.restore(); } });
    evoSchaal(ctx, 'galápagos'); },
  s05(ctx, t, q) { // vraag-alinea: jaar na jaar ongeveer evenveel vinken op het eiland
    macroNacht(ctx, { horizon: 900 });
    const jaar = 1 + Math.min(3, Math.floor(Math.max(0, t - q.at('jaren', 1) + 0.6) / 0.9));
    [8.6, 9.8, 9.1, 10.4, 8.9, 9.5].forEach((v, i) => grondvink(ctx, 210 + i * 300, 846, 1.05, { snavel: v, houding: 'staan', pik: Math.max(0, Math.sin(t * 1.1 + i * 1.7)) ** 4 * 0.8, kijk: i === 2 || i === 5 ? -1 : 1 }));
    _fade(ctx, q.on('jaren', 1), () => { text(ctx, 'jaar ' + jaar, 960, 260, fTitel(72), C.text, 'center'); metaText(ctx, 'aantal vinken', 960, 320, C.text2, 'center', 28); text(ctx, '± gelijk', 960, 390, fTekst(48, 700), C.text, 'center'); });
    vraagteken(ctx, 1640, 420, q.on('Hoe', 1), 150);
    evoSchaal(ctx, 'galápagos'); },
  s07(ctx, t, q) { _schemaBg(ctx);
    const x = 260, y = 800, w = 1100, h = 560;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaren', yLabel: 'aantal vinken', xt: [[0, '0'], [0.25, '2'], [0.5, '4'], [0.75, '6'], [1, '8']] });
    const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const v = 0.1 * Math.pow(2.6, u * 8 / 2); if (v > 1.05) break; P.push([x + u * w, y - v * h]); }
    lijnPad(ctx, _deelPad(P, _sg(t, q.at('overleven', 1), q.at('verdubbelen', 1) + 0.8)), C.goud, 5, [14, 10]);
    const fz = q.on('zaden', 1, 1); if (fz > 0.01) lijnPad(ctx, [[x, y - 0.42 * h], [x + w * fz, y - 0.42 * h]], C.line, 3, [6, 8]);
    const G = []; for (let i = 0; i <= 40; i++) { const u = i / 40; G.push([x + u * w, y - (0.1 + 0.08 * Math.sin(u * 9) * u + 0.22 * (1 - Math.exp(-u * 6))) * h]); }
    // het gat tussen 'als alle jongen overleven' en de echte populatie = jongen die sterven
    const gat = q.on('komen', 1, 0.8) * (1 - 0.6 * q.on('overproductie', 1)); _fade(ctx, gat * 0.5, () => { ctx.fillStyle = rgba(C.goud, 0.25); ctx.beginPath();
      P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); for (let i = P.length - 1; i >= 0; i--) ctx.lineTo(...G[i]); ctx.closePath(); ctx.fill(); });
    lijnPad(ctx, _deelPad(G, _sg(t, q.at('meeste', 1), q.at('broeden', 1) + 0.6)), C.groen, 6);
    naamBij(ctx, 'als alle jongen overleven', null, x + 0.43 * w, y - 0.97 * h, q.on('verdubbelen', 1), 'right', C.goud);
    naamBij(ctx, 'zoveel zaden', 'wat het eiland kan voeden', x + w + 20, y - 0.42 * h - 46, q.on('zaden', 1), 'left', C.text2);
    naamBij(ctx, 'echte populatie', null, x + w + 20, y - 0.33 * h + 30, q.on('broeden', 1), 'left', C.groen);
    _fade(ctx, q.on('overproductie', 1), () => { text(ctx, 'overproductie', 1420, 220, fTekst(56, 700), C.text, 'left'); metaText(ctx, 'meer jongen dan er', 1420, 266, C.grain, 'left', 26); metaText(ctx, 'kunnen overleven', 1420, 300, C.grain, 'left', 26); });
    evoSchaal(ctx, 'model · vereenvoudigd'); },
  s08(ctx, t, q) { macroNacht(ctx, { horizon: 900 });
    lijn(ctx, [[-40, 640], [700, 610], [1300, 620], [1960, 600]], '#5A4636', 16);
    [8.2, 9.6, 8.9, 11, 9.2, 10.3].forEach((v, i) => { const x = 210 + i * 300, y = 616 - i * 0.6, t0 = i * 0.18, t1 = t0 + 1.1;
      if (t < t1) _vliegLangs(ctx, [x + 360, 120 - i * 10], [x, y - 6], clamp((t - t0) / (t1 - t0), 0, 1), 1.25, t * 1.5 + i * 0.3, { snavel: v, boog: 40 });
      else grondvink(ctx, x, y, 1.25, { snavel: v, kijk: i % 3 === 2 ? -1 : 1, pik: 0.25 * Math.max(0, Math.sin(t * 1.2 + i * 2)) ** 3, snavelKleur: i === 3 && t > q.at('hetzelfde', 1) ? C.goud : null }); });
    naamBij(ctx, 'variatie', 'snavels verschillen', 1110, 720, q.on('Geen', 1), 'center');
    evoSchaal(ctx, 'grondvink ± 12,5 cm'); },

  // ---------------- H2 Droogte op Daphne Major
  s09(ctx, t, q) { const k = 1 + 0.12 * _sg(t, 0, 9.5);
    _zoom(ctx, 960, 620, k, () => { macroNacht(ctx, { horizon: 700, heuvel: false }); ctx.fillStyle = '#26507E'; ctx.fillRect(-200, 700, W + 400, H); daphneMajor(ctx, 960, 720, 1300);
      for (let i = 0; i < 5; i++) { const sp = 0.06 + 0.02 * hash(i), u = (t * sp + hash(i * 3)) % 1, dir = i % 2 ? -1 : 1; const x = dir > 0 ? lerp(300, 1650, u) : lerp(1650, 300, u), y = 300 + 90 * hash(i * 5) + 30 * Math.sin(u * 8);
        grondvink(ctx, x, y, 0.13, { snavel: 9.3, houding: 'vliegen', t: t * 1.4 + i * 0.27, kijk: dir }); } });
    naamBij(ctx, 'Daphne Major', 'galápagos', 960, 200, q.on('Daphne', 1), 'center');
    _fade(ctx, q.on('1973', 1), () => evoSchaal(ctx, 'metingen sinds het jaar 1973 · peter en rosemary grant')); },
  s10(ctx, t, q) { _schemaBg(ctx);
    const x = 420, y = 820, w = 1100, h = 300, mm = (v) => (v - 7) / 5;
    [[8, 'acht'], [9.3, 'negen'], [11, 'elf']].forEach(([v, cue], i) => { const a = q.on('snavelhoogte', 1, 0.4 + i * 0.25); if (a < 0.01) return; const fx = 640 + i * 400; _kopCirkel(ctx, fx, 330, 140, v, 5.5, a); const bxW = fx, top = 190;
      naamBij(ctx, String(v).replace('.', ',') + ' mm', null, bxW, top - 18, Math.max(q.on(cue, 1), q.on('variatie', 1)), 'center'); });
    const ha = q.on('histogram', 1); _hAs(ctx, x, y, w, h, ha);
    const g0 = q.at('histogram', 1), g1 = q.at('hebben', 1) + 0.4;
    const licht = (u) => { const v = 7 + u * 5; return q.on('negen', 1) * (1 - q.on('Sommige', 1)) * (Math.abs(v - 9.3) < 0.45 ? 1 : 0) + q.on('acht', 1) * (1 - q.on('variatie', 1)) * (Math.abs(v - 8) < 0.3 ? 1 : 0) + q.on('elf', 1) * (1 - q.on('variatie', 1)) * (Math.abs(v - 11) < 0.3 ? 1 : 0); };
    _histo(ctx, x, y, w, h, (u) => _gauss(u, mm(9.3), 0.17) * _sg(t, g0 + u * (g1 - g0) * 0.85, g0 + u * (g1 - g0) * 0.85 + 0.5), C.teal, ha, 22, licht);
    _mmAs(ctx, x, y, w, ha);
    _fade(ctx, q.on('variatie', 1), () => text(ctx, 'variatie', 120, 260, fTekst(48, 700), C.text));
    _fade(ctx, q.on('erfelijk', 1), () => metaText(ctx, 'grotendeels erfelijk', 120, 300, C.grain, 'left', 26)); },
  s11(ctx, t, q) { macroNacht(ctx, { horizon: 520, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 520, W, H);
    const dor = q.on('regen', 1, 2.5);
    for (let i = 0; i < 9; i++) { const px = 120 + i * 210 + hash(i) * 60; lijn(ctx, [[px, 560], [px - 30, 470], [px - 50, 430]], '#7A6A50', 5); lijn(ctx, [[px - 30, 470], [px + 10, 440]], '#7A6A50', 4);
      if (dor < 0.99) for (const [lx, ly] of [[px - 50, 426], [px + 12, 436], [px - 30, 466]]) { ctx.beginPath(); ctx.ellipse(lx, ly, 16, 9, 0.4, 0, 6.283); ctx.fillStyle = rgba('#6F9A5C', 1 - dor); ctx.fill(); } }
    const z0 = q.at('vinken', 1), z1 = q.at('op.', 1) + 0.4;
    for (let i = 0; i < 26; i++) { const px = 300 + hash(i * 2.7) * 1400, py = 640 + hash(i * 4.9) * 220; const weg = i < 20 ? _sg(t, z0 + (i / 20) * (z1 - z0), z0 + (i / 20) * (z1 - z0) + 0.3) : 0; zaadje(ctx, px, py, 1.6, { a: 1 - weg, rot: hash(i) * 3 }); }
    for (const [px, py, r] of [[520, 780, 0.3], [1480, 700, -0.4], [1180, 840, 0.9]]) tribulus(ctx, px, py, 0.9, { rot: r });
    const hp = clamp((t - 2.5) / 1.6, 0, 3), k = Math.floor(hp), f = hp - k, x0 = 740 + Math.min(k, 3) * 70 * 2.2;
    if (f > 0.001 && hp < 3) grondvink(ctx, x0, 780, 2.2, { snavel: 9.3, houding: 'hippen', t: f });
    else grondvink(ctx, x0, 780, 2.2, { snavel: 9.3, houding: 'staan', pik: Math.max(0, Math.sin(t * 3.2)) ** 2 });
    _fade(ctx, q.on('1977', 1), () => text(ctx, 'in het jaar 1977', 1300, 230, fTitel(64), C.text, 'left'));
    _fade(ctx, q.on('regen', 1), () => metaText(ctx, 'bijna geen regen', 1300, 280, C.grain, 'left', 28));
    evoSchaal(ctx, 'zaadjes vergroot · 1 vink = 12,5 cm'); },
  s12(ctx, t, q) { macroNacht(ctx, { horizon: 860, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 860, W, H);
    const k = lerp(0.8, 1, _sg(t, 0, 1.4)); _zoom(ctx, 900, 700, k, () => {
      const x = 560, y = 900, s = 5, ph = (t * 1.25) % 1, pik = 1 - 0.3 * Math.sin(Math.PI * clamp(ph / 0.55, 0, 1)), stoot = Math.max(0, 1 - Math.abs(ph - 0.62) / 0.12);
      grondvink(ctx, x, y, s, { snavel: 9.3, pik });
      tribulus(ctx, x + s * 64 + 6 * stoot, y - s * 64, 1.0, { rot: 0.5 + 0.18 * stoot }); });
    naamBij(ctx, 'Tribulus', '± 8 mm · hard, met stekels', 1000, 420, q.on('Tribulus', 1), 'left');
    metaText(ctx, 'op ware verhouding: snavel ± 9 mm', 1880, 880, C.text2, 'right', 26); },
  s13(ctx, t, q) { // vraag-alinea: drie vinken met verschillende snavels bij harde vruchtjes
    macroNacht(ctx, { horizon: 860, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 860, W, H);
    [[8, 330], [9.3, 930], [11, 1530]].forEach(([v, x], i) => { const pik = 0.45 * Math.max(0, Math.sin(t * 1.6 + i * 2.1)) ** 6, s = 2.0; grondvink(ctx, x, 860, s, { snavel: v, houding: 'staan', pik });
      tribulus(ctx, x + s * 120, 852, 0.5, { rot: 0.3 });
      _kopCirkel(ctx, x + 60, 380, 120, v, 4.6, 1); naamBij(ctx, String(v).replace('.', ',') + ' mm', null, x + 60, 238, 1, 'center'); });
    vraagteken(ctx, 1240, 400, q.on('overleven', 1), 120);
    },
  s15(ctx, t, q) { macroNacht(ctx, { horizon: 860, heuvel: false }); ctx.fillStyle = '#4A4036'; ctx.fillRect(0, 860, W, H);
    const s = 3.3, tip = (x, y, sn) => { const hS = sn * 2.2, lS = hS * 1.2; const lx = 22 + lS, ly = hS * 0.12, th = 0.6; return [x + s * (26 + lx * Math.cos(th) - ly * Math.sin(th)), y + s * (-104 + lx * Math.sin(th) + ly * Math.cos(th))]; };
    const ph = (t * 1.4) % 1, pikL = 1 - 0.35 * Math.sin(Math.PI * clamp(ph / 0.5, 0, 1)), glij = Math.max(0, 1 - Math.abs(ph - 0.55) / 0.15);
    grondvink(ctx, 520, 860, s, { snavel: 8, pik: pikL }); let [tx, ty] = tip(520, 860, 8); tribulus(ctx, tx + 22 + 10 * glij, ty + 6, 0.66, { rot: 0.3 - 0.3 * glij });
    const kr = q.at('kraakt', 1) + 0.3, open = _sg(t, kr, kr + 0.5);
    const pikH = t < kr ? 1 - 0.3 * Math.sin(Math.PI * clamp(((t * 1.4) % 1) / 0.5, 0, 1)) : 1;
    grondvink(ctx, 1300, 860, s, { snavel: 11, pik: pikH, snavelKleur: q.on('hoge', 1) > 0.5 ? C.goud : null }); [tx, ty] = tip(1300, 860, 11);
    if (open < 0.01) tribulus(ctx, tx + 28, ty + 2, 0.66, { rot: 0.4 });
    else { tribulus(ctx, tx + 28 - 14 * open, ty + 2 - 24 * open, 0.66, { rot: lerp(0.4, -0.7, open) }); tribulus(ctx, tx + 28 + 16 * open, ty + 2 + 24 * open, 0.66, { rot: lerp(0.4, 1.4, open) }); zaadje(ctx, tx + 30, ty + 2, 0.9, { kleur: '#E8DCC0', a: open }); }
    naamBij(ctx, 'hoge snavel', 'kraakt het vruchtje', 1290, 300, q.on('hoge', 1), 'center', C.goud);
    naamBij(ctx, 'lage snavel', 'krijgt het vruchtje niet open', 470, 300, q.on('lage', 1), 'center');
    metaText(ctx, 'snavel 8 mm tegenover 11 mm', 1880, 880, C.text2, 'right', 26); },
  s16(ctx, t, q) { _schemaBg(ctx);
    const a2 = q.on('later', 1);
    _fade(ctx, q.on('1977', 1), () => metaText(ctx, 'begin 1977', 200, 330, C.text2, 'left', 28));
    _fade(ctx, q.on('twaalfhonderd', 1), () => text(ctx, '± 1200', 200, 430, fTitel(110), rgba(C.text, lerp(1, 0.45, a2)), 'left'));
    const d0 = q.at('later', 1), d1 = q.at('honderdtachtig', 1) + 0.6, dd = _sg(t, d0, d1);
    _fade(ctx, a2, () => { metaText(ctx, 'begin 1978', 200, 590, C.text2, 'left', 28); pijl(ctx, 330, 470, 330, 540, C.line, 1, 4, 16);
      text(ctx, '± ' + Math.round(lerp(1200, 180, dd) / 10) * 10, 200, 690, fTitel(110), C.goud, 'left'); });
    // raster: 120 stippen (1 stip = 10 vinken); 102 dimmen één voor één, 18 blijven
    const kol = 15, d = 66, x = 900, y = 230; const idx = [...Array(120).keys()].sort((p, r) => hash(p * 7 + 3) - hash(r * 7 + 3)); const rang = {}; idx.forEach((v, i) => rang[v] = i);
    const op = q.on('leven', 1, 1.2), span = d1 - d0 - 0.4;
    for (let i = 0; i < 120; i++) { const r = rang[i]; const dim = r < 18 ? 0 : _sg(t, d0 + (r - 18) / 102 * span, d0 + (r - 18) / 102 * span + 0.4);
      const vs = _sg(op * 1.4, i / 120, i / 120 + 0.3); if (vs < 0.01) continue; populatieStip(ctx, x + (i % kol) * d, y + Math.floor(i / kol) * d, d * 0.34, C.oker, vs * lerp(1, 0.22, dim)); }
    naamBij(ctx, 'middelste grondvinken op Daphne Major', '1 stip = 10 vinken', 1360, 820, q.on('grondvinken', 1), 'center');
    evoSchaal(ctx, 'afgerond'); },
  s17(ctx, t, q) { _schemaBg(ctx);
    const x = 300, y = 800, w = 1200, h = 440, mm = (v) => (v - 7) / 5;
    histogram(ctx, x, y, w, h, mm(9.31), 0.17, { kleur: C.teal, a: 0.3 });
    const o0 = q.at('overlevers', 1), p = _sg(t, o0, o0 + 1.6);
    _histo(ctx, x, y, w, h, (u) => lerp(_gauss(u, mm(9.31), 0.17), 0.32 * _gauss(u, mm(9.84), 0.16), p));
    _mmAs(ctx, x, y, w);
    const mu = lerp(9.31, 9.84, _sg(t, q.at('gemiddeld', 1), q.at('millimeter', 1) + 0.6)), oa = q.on('vóór', 1), na = q.on('gemiddeld', 1);
    _fade(ctx, oa, () => _stip(ctx, x + mm(9.31) * w, y, x + mm(9.31) * w, y - h - 20, C.text2));
    _fade(ctx, na, () => _stip(ctx, x + mm(mu) * w, y, x + mm(mu) * w, y - h * 0.32 - 60, C.goud));
    naamBij(ctx, 'vóór de droogte', 'gemiddeld 9,3 mm', x + mm(9.31) * w - 20, y - h - 50, oa, 'right', C.text2);
    naamBij(ctx, 'overlevers', 'gemiddeld 9,8 mm', x + mm(11.2) * w, y - h * 0.32 - 60, _sg(t, o0 + 1, o0 + 1.6), 'left', C.goud);
    _fade(ctx, q.on('halve', 1), () => text(ctx, '+ ruim 0,5 mm', 1440, 300, fTekst(48, 700), C.goud, 'left'));
    tribulus(ctx, 1560, 400, 0.8, { rot: 0.3, a: q.on('vruchtje', 1) }); },
  s18(ctx, t, q) { // vraag-alinea: de overlevers krijgen jongen; hoe hoog zijn hun snavels?
    _schemaBg(ctx); const x = 200, y = 760, w = 680, h = 300, mm = (v) => (v - 7) / 5;
    _histo(ctx, x, y, w, h, (u) => _gauss(u, mm(9.84), 0.16)); _hAs(ctx, x, y, w, h);
    for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x + mm(v) * w, y + 44, C.text2, 'center', 26);
    naamBij(ctx, 'overlevers', 'ouders van 1978', x + w / 2, y - h - 60, 1, 'center', C.goud);
    const a = q.on('1978', 1), x2 = 1040; _hAs(ctx, x2, y, w, h, a);
    _fade(ctx, a, () => { for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x2 + mm(v) * w, y + 44, C.text2, 'center', 26); });
    naamBij(ctx, 'jongen van 1978', null, x2 + w / 2, y - h - 60, q.on('jongen', 1), 'center');
    pijl(ctx, 900, 560, 1010, 560, C.line, q.on('krijgen', 1), 4, 16);
    _fade(ctx, q.on('jongen', 1), () => nestje(ctx, x2 + w / 2, y - 110, 1.6, 4));
    vraagteken(ctx, x2 + w / 2, y - 190, q.on('snavels', 1), 130); },
  s20(ctx, t, q) { _schemaBg(ctx);
    const x = 300, y = 800, w = 1200, h = 420, mm = (v) => (v - 7) / 5;
    _hAs(ctx, x, y, w, h);
    ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const u = i / 80, v = _gauss(u, mm(9.31), 0.17); i ? ctx.lineTo(x + u * w, y - v * h) : ctx.moveTo(x + u * w, y - v * h); } ctx.stroke(); ctx.restore();
    const g = _sg(t, q.at('jongen', 1), q.at('snavel', 1) + 0.4);
    const licht = (u) => { const v = 7 + u * 5; return q.on('lage', 1) * (1 - q.on('gemiddelde', 1)) * (v < 9.1 ? 1 : 0) + q.on('gemiddelde', 1) * (1 - q.on('hoge', 1)) * (Math.abs(v - 9.7) < 0.35 ? 1 : 0) + q.on('hoge', 1) * (1 - q.on('hele', 1)) * (v > 10.3 ? 1 : 0); };
    _histo(ctx, x, y, w, h, (u) => _gauss(u, mm(9.70), 0.17) * g, C.teal, 1, 22, licht);
    _mmAs(ctx, x, y, w);
    naamBij(ctx, '1976', 'ouders vóór de droogte', x + mm(9.31) * w - 40, y - h - 60, 1, 'right', C.text2);
    naamBij(ctx, 'jongen van 1978', 'gemiddeld 9,7 mm', x + mm(10.6) * w, y - h * 0.75, q.on('gemiddeld', 1), 'left', C.teal);
    // pijl van het oude naar het nieuwe gemiddelde: groeit bij 'vier procent', licht op bij 'opgeschoven'
    const pa = q.on('procent', 1), pl = _sg(t, q.at('procent', 1), q.at('hoger', 1) + 0.4);
    if (pl > 0.02) pijl(ctx, x + mm(9.31) * w, y - h - 40, x + mm(lerp(9.31, 9.70, pl)) * w, y - h - 40, C.goud, pa, 4 + 2 * q.on('opgeschoven', 1), 14);
    _fade(ctx, pa, () => evoSchaal(ctx, 'ongeveer 4 % hoger')); },
  s21(ctx, t, q) { _schemaBg(ctx);
    const p2 = lerp(0.45, 0.6, _sg(t, q.at('vaker', 1), q.at('genenpool', 1) + 0.8)), a2 = q.on('allelen', 1);
    pot(ctx, 600, 640, 1.1, { p: 0.45, n: 70, seed: 3, label: 'genenpool 1976' }); allelBalk(ctx, 430, 760, 340, 0.45, { procent: true });
    pot(ctx, 1320, 640, 1.1, { p: p2, n: 70, seed: 3, label: 'genenpool 1978', a: a2 }); allelBalk(ctx, 1150, 760, 340, p2, { procent: true, a: a2 });
    _fade(ctx, q.on('allelfrequentie', 1) * (1 - q.on('evolutie', 1)), () => { for (const bx of [430, 1150]) { roundRect(ctx, bx - 6, 754, 352, 46, 23); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } });
    pijl(ctx, 800, 480, 1110, 480, C.line, a2, 4, 18); _fade(ctx, q.on('generatie', 1), () => metaText(ctx, 'één generatie', 955, 450, C.grain, 'center', 26));
    _fade(ctx, a2, () => { circ(ctx, 160, 210, 14, EVO.a1, EVO.a1R, 2); text(ctx, 'allel voor een hogere snavel', 190, 222, fTekst(36, 600), C.text, 'left');
      circ(ctx, 160, 266, 14, EVO.a2, EVO.a2R, 2); text(ctx, 'allel voor een lagere snavel', 190, 278, fTekst(36, 600), C.text, 'left'); });
    _fade(ctx, q.on('Vereenvoudigd', 1), () => evoSchaal(ctx, 'vereenvoudigd · snavelhoogte hangt af van veel genen')); },

  // ---------------- H3 Wie wint?
  s22(ctx, t, q) { _schemaBg(ctx);
    // eerst nog even het eiland (terugblik), dat wijkt voor de drie kaarten
    _fade(ctx, 0.55 * (1 - q.on('erfelijke', 1, 0.5)), () => { daphneMajor(ctx, 960, 640, 900); grondvink(ctx, 720 + 60 * Math.sin(t * 0.7), 380, 0.12, { houding: 'vliegen', t: t * 1.4, snavel: 9.3 }); naamBij(ctx, 'Daphne Major', null, 960, 300, q.on('Daphne', 1), 'center'); });
    const kaart = (x, titel, sub, cue, ic) => { const a = q.on(cue, 1, 0.5); if (a < 0.01) return; tekstKaart(ctx, x, 260 + 30 * (1 - a), 470, 440, titel, { sub, icoon: ic, a }); };
    kaart(170, 'erfelijke variatie', 'snavels verschillen', 'erfelijke', (c, cx, cy) => { [8, 9.3, 11].forEach((v, i) => grondvink(c, cx - 140 + i * 130, cy + 60, 0.7, { snavel: v, pik: 0.2 * Math.max(0, Math.sin(t * 1.4 + i * 2)) ** 4 })); });
    kaart(725, 'overproductie', 'te veel jongen', 'nakomelingen', (c, cx, cy) => nestje(c, cx, cy + 20, 2.2, 2 + Math.min(3, Math.floor(Math.max(0, t - q.at('nakomelingen', 1)) / 0.5))));
    kaart(1280, 'selectiedruk', 'droogte 1977', 'selectiedruk', (c, cx, cy) => { tribulus(c, cx - 40, cy + 30, 1.4, { rot: 0.2 }); tribulus(c, cx + 70, cy + 40, 1.1, { rot: -0.6 }); });
    const lf = q.on('dingen', 1, 1); if (lf > 0.01) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(150, 720); ctx.lineTo(150 + 1620 * lf, 720); ctx.stroke(); }
    _fade(ctx, q.on('droogte', 1), () => { roundRect(ctx, 1280, 260, 470, 440, 18); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }); },
  s23(ctx, t, q) { _schemaBg(ctx);
    const m = _sg(t, 0, 1.2), ky = lerp(260, 160, m), kh = lerp(440, 330, m);
    const k = (x, titel, ic) => tekstKaart(ctx, x, ky, 470, kh, titel, { icoon: ic });
    k(170, 'erfelijke variatie', (c, cx, cy) => { [8, 9.3, 11].forEach((v, i) => grondvink(c, cx - 140 + i * 130, cy + lerp(60, 50, m), lerp(0.7, 0.6, m), { snavel: v })); });
    k(725, 'overproductie', (c, cx, cy) => nestje(c, cx, cy + lerp(20, 10, m), lerp(2.2, 1.8, m), 5));
    k(1280, 'selectiedruk', (c, cx, cy) => { tribulus(c, cx - 30, cy + 20, 1.2, { rot: 0.2 }); tribulus(c, cx + 60, cy + 30, 0.9, { rot: -0.6 }); });
    haak(ctx, 170, 1750, 510, 'natuurlijke selectie', C.groen, q.on('natuurlijke', 1));
    grondvink(ctx, 820, 860, 1.3, { snavel: 11, a: q.on('Vinken', 1, 0.3), snavelKleur: q.on('selectievoordeel', 1) > 0.5 ? C.goud : null, pik: 0.25 * Math.max(0, Math.sin(t * 1.3)) ** 4 });
    naamBij(ctx, 'selectievoordeel', 'hoge snavel in een droog jaar', 1010, 770, q.on('selectievoordeel', 1), 'left', C.goud); },
  s24(ctx, t, q) { _schemaBg(ctx);
    _fade(ctx, q.on('fitness', 1), () => { text(ctx, 'fitness', 140, 240, fTekst(56, 700), C.text); metaText(ctx, 'nakomelingen die zelf jongen krijgen', 140, 286, C.grain, 'left', 26); });
    grondvink(ctx, 960, 420, 1.2, { snavel: 9.3, pik: 0.2 * Math.max(0, Math.sin(t * 1.2)) ** 4 });
    const j0 = q.at('nakomelingen', 1), dim = q.on('overleeft', 1);
    [[560, 1], [760, 0], [960, 1], [1160, 1], [1360, 0]].forEach(([jx, ok], i) => { const a = _sg(t, j0 + i * 0.18, j0 + i * 0.18 + 0.3); if (a < 0.01) return; const d = ok ? 1 : lerp(1, 0.35, dim);
      _fade(ctx, a, () => { ctx.strokeStyle = rgba(C.line, d); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 450); ctx.lineTo(jx, 560); ctx.stroke(); });
      if (d > 0.99) grondvink(ctx, jx, 680, 0.75, { snavel: 9, a }); else gedimd(ctx, d * a, (g) => grondvink(g, jx, 680, 0.75, { snavel: 9 }));
      if (ok) _fade(ctx, q.on('voortplant', 1), () => { for (let k = 0; k < 2; k++) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(jx, 700); ctx.lineTo(jx - 40 + k * 80, 760); ctx.stroke(); nestje(ctx, jx - 40 + k * 80, 800, 0.55, 3); } }); });
    _fade(ctx, q.on('voortplant', 1, 0.8), () => { text(ctx, 'fitness = 3', 140, 500, fTekst(48, 700), C.groen, 'left'); metaText(ctx, '2 jongen tellen niet mee', 140, 546, C.grain, 'left', 26); }); },
  s25(ctx, t, q) { // vraag-alinea: twee vinken naast elkaar
    _schemaBg(ctx); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 640); ctx.lineTo(1780, 640); ctx.stroke();
    grondvink(ctx, 560, 640, 1.9, { snavel: 10.5, a: q.on('Twee', 1, 0.3), pik: 0.2 * Math.max(0, Math.sin(t * 1.5)) ** 4 });
    grondvink(ctx, 1340, 640, 1.3, { snavel: 9, a: q.on('Twee', 1, 0.3), pik: 0.2 * Math.max(0, Math.sin(t * 1.5 + 2)) ** 4 });
    vraagteken(ctx, 960, 420, q.on('fitness', 1), 140); },
  s27(ctx, t, q) { _schemaBg(ctx);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 520); ctx.lineTo(1780, 520); ctx.stroke();
    grondvink(ctx, 520, 520, 1.7, { snavel: 10.5, a: q.on('sterke', 1, 0.3), pik: 0.2 * Math.max(0, Math.sin(t * 1.1)) ** 4 }); naamBij(ctx, 'groot en sterk', 'leeft 10 jaar', 520, 580, q.on('tien', 1), 'center');
    grondvink(ctx, 1340, 520, 1.2, { snavel: 9, a: q.on('vink', 1, 0.3), pik: 0.2 * Math.max(0, Math.sin(t * 1.3 + 2)) ** 4 }); naamBij(ctx, 'klein', 'leeft 4 jaar', 1340, 580, q.on('vier', 1), 'center');
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); if (t > q.at('twee', 1)) { ctx.moveTo(300, 820); ctx.lineTo(760, 820); } if (t > q.at('zes', 1)) { ctx.moveTo(980, 820); ctx.lineTo(1760, 820); } ctx.stroke();
    // jongen hippen één voor één binnen (één sprong, dan staan ze)
    const jonk = (x, i, t0, sn) => { const u = (t - t0 - i * 0.28) / 0.6; if (u < 0) return;
      if (u < 1) grondvink(ctx, x - 70 * 0.62, 820, 0.62, { snavel: sn, houding: 'hippen', t: u * 0.999, a: Math.min(1, u * 4) });
      else grondvink(ctx, x, 820, 0.62, { snavel: sn, pik: 0.3 * Math.max(0, Math.sin(t * 1.6 + i * 1.3)) ** 6 }); };
    for (let i = 0; i < 2; i++) jonk(420 + i * 200, i, q.at('twee', 1), 10);
    for (let i = 0; i < 6; i++) jonk(1060 + i * 116, i, q.at('zes', 1), 9);
    _fade(ctx, q.on('broedende', 1), () => metaText(ctx, '2 broedende jongen', 520, 870, C.text2, 'center', 26));
    _fade(ctx, q.on('broeden', 1), () => metaText(ctx, '6 broedende jongen', 1360, 870, C.groen, 'center', 26));
    // allelen doorgeven: boven elk jong een knikker
    const al = q.at('allelen', 1), reis = (ox, oy, jx, i) => { const u = _sg(t, al + i * 0.15, al + i * 0.15 + 0.7); if (t < al + i * 0.15) return; _knikker(ctx, lerp(ox, jx, u), lerp(oy, 740, u) - Math.sin(Math.PI * u) * 40, 13, 1, Math.min(1, u * 5)); };
    for (let i = 0; i < 2; i++) reis(560, 400, 420 + i * 200, i); for (let i = 0; i < 6; i++) reis(1360, 430, 1060 + i * 116, i);
    naamBij(ctx, 'allelen', 'doorgegeven aan de jongen', 960, 630, q.on('allelen', 1) * (1 - q.on('lang', 1)), 'center', EVO.a1R);
    naamBij(ctx, 'hoogste fitness', null, 1340, 270, q.on('meeste', 1), 'center', C.groen); },

  // ---------------- H4 Aangepast, zonder doel
  s28(ctx, t, q) { _struik(ctx); const B = _struik.bl;
    const tM = q.at('merel', 1), A0 = [308, _merelTakTop(308)];
    const rB = (b) => [b.x + Math.cos(b.hoek) * b.w, b.y + Math.sin(b.hoek) * b.w];
    const vt = [240, -230], r2 = rB(B[2]), r4 = rB(B[4]), P1 = [r2[0] - vt[0], r2[1] - vt[1]], P2 = [r4[0] - vt[0], r4[1] - vt[1]];
    const t1 = tM + 0.9, t2 = t1 + 0.8, t3 = t2 + 1.6;
    const groenA = q.on('groenere', 1) * (1 - q.on('bruinere', 1)), bruinA = q.on('bruinere', 1) * (1 - q.on('merel', 1));
    for (const i of [1, 3, 5]) { const [rx, ry] = rupsOpBlad(ctx, B[i], 0.4, { kleur: i === 1 ? '#78A86A' : '#6BA872', houding: 'kruipen', t: t * 0.6 + i, f: 0.5 }); focusRing(ctx, rx, ry, 90, 40, groenA * 0.8); }
    if (t < t1) { const [rx, ry] = rupsOpBlad(ctx, B[2], 0.4, { kleur: '#8C6A48', houding: 'kruipen', t: t * 0.6 + 2, f: 0.5 }); focusRing(ctx, rx, ry, 90, 40, bruinA * 0.8); }
    if (t < t2) { const [rx, ry] = rupsOpBlad(ctx, B[4], 0.4, { kleur: '#8C6A48', houding: 'kruipen', t: t * 0.6 + 4, f: 0.5 }); focusRing(ctx, rx, ry, 90, 40, bruinA * 0.8); }
    if (t < tM) _merelP(ctx, A0[0], A0[1], 2.6, { houding: 'tak', takY: A0[1], takDik: 7 });
    else if (t < t3) { let p, kijk = 1;
      if (t < t1) { const u = ease((t - tM) / (t1 - tM)); p = [lerp(A0[0], P1[0], u), lerp(A0[1], P1[1], u)]; }
      else if (t < t2) { const u = ease((t - t1) / (t2 - t1)); p = [lerp(P1[0], P2[0], u), lerp(P1[1], P2[1], u)]; }
      else { const u = ease((t - t2) / (t3 - t2)); p = [lerp(P2[0], A0[0], u), lerp(P2[1], A0[1], u) - Math.sin(Math.PI * u) * 80]; kijk = -1; }
      _merelP(ctx, p[0], p[1], 2.6, { houding: 'vliegen', t: t * 0.9, kijk, prooi: t > t1 ? _bruineRups : null }); }
    else _merelP(ctx, A0[0], A0[1], 2.6, { houding: 'tak', takY: A0[1], takDik: 7, prooi: t < t3 + 1.2 ? _bruineRups : null });
    // groene rupsen krijgen meer nakomelingen: kleine groene rupsjes op het onderste blad
    const na = q.on('nakomelingen', 1, 0.5); if (na > 0.01) for (let k = 0; k < 3; k++) rupsOpBlad(ctx, B[0], 0.16, { kleur: '#6BA872', f: 0.3 + k * 0.22, a: na });
    evoSchaal(ctx, 'merel ± 25 cm · rups ± 4 cm'); },
  s29(ctx, t, q) { _struik(ctx); const B = _struik.bl;
    const G = [1, 5, 10, 15, 20], g0 = q.at('generatie', 1), stap = (q.at('adaptatie', 1) - 0.6 - g0) / (G.length - 1), k = clamp(Math.floor((t - g0) / stap) + 1, 0, G.length - 1), g = t < g0 ? 1 : G[k];
    const puls = t < g0 || t > q.at('adaptatie', 1) ? 0 : 1 - _sg(((t - g0) / stap - Math.floor((t - g0) / stap)) * stap, 0.7, 1.1); // ring licht op bij elke nieuwe generatie en dooft dan uit
    const omslag = { 2: 5, 4: 10, 5: 15 }; let nBruin = 0; // vanaf deze generatie is die rups groen
    for (const i of [1, 2, 3, 4, 5]) { const bruin = omslag[i] && g < omslag[i]; if (bruin) nBruin++;
      const [rx, ry] = rupsOpBlad(ctx, B[i], 0.4, { kleur: bruin ? '#8C6A48' : (i === 1 ? '#78A86A' : '#6BA872'), houding: 'kruipen', t: t * 0.6 + i, f: 0.5 });
      if (puls > 0.01) { ctx.save(); ctx.globalAlpha *= puls; ctx.strokeStyle = bruin ? C.koraal : C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(rx, ry, 95, 44, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } }
    _fade(ctx, q.on('generatie', 1, 0.3) * (1 - q.on('adaptatie', 1, 0.4)), () => { text(ctx, 'bruin: ' + nBruin + ' van 5', 140, 240, fTekst(48, 700), '#C49A6C', 'left'); metaText(ctx, 'groen: ' + (5 - nBruin) + ' van 5', 140, 290, C.groen, 'left', 28); });
    _fade(ctx, q.on('adaptatie', 1), () => { text(ctx, 'adaptatie', 140, 240, fTekst(56, 700), C.text); metaText(ctx, 'erfelijk · door selectie algemeen geworden', 140, 286, C.grain, 'left', 26); });
    { const b = B[3], cx = b.x + Math.cos(b.hoek) * b.w, cy = b.y + Math.sin(b.hoek) * b.w; focusRing(ctx, cx, cy, 100, 46, q.on('deze', 1) * (1 - q.on('valt', 1, 1.2))); }
    naamBij(ctx, 'camouflage', 'valt weg tegen het blad', B[3].x + 120, B[3].y + 140, q.on('camouflage', 1), 'center');
    _fade(ctx, q.on('generatie', 1, 0.3), () => generatie(ctx, g, 80, 880)); },
  s30(ctx, t, q) { // vraag-alinea: een groene rups op een rood blad; wat erven zijn jongen?
    _schemaBg(ctx);
    blad(ctx, 520, 600, 420, { kleur: '#A85A44', rot: -0.12, a: clamp(t / 0.4, 0, 1) });
    rups(ctx, 860, 572, 0.9, { kleur: '#6BA872', rot: -0.12, houding: 'kruipen', t: t * 0.6, a: clamp(t / 0.4, 0, 1) });
    _fade(ctx, q.on('jongen', 1), () => { for (let k = 0; k < 4; k++) { const ex = 1260 + k * 34, ey = 520 - k * 4; ctx.beginPath(); ctx.ellipse(ex, ey, 11, 14, 0.2, 0, 6.283); ctx.fillStyle = '#D8E6C4'; ctx.fill(); ctx.strokeStyle = '#9AB08A'; ctx.lineWidth = 1.5; ctx.stroke(); } });
    vraagteken(ctx, 1320, 420, q.on('hem', 1), 130);
    evoSchaal(ctx, 'rups ± 4 cm'); },
  s32(ctx, t, q) { _schemaBg(ctx);
    blad(ctx, 160, 520, 230, { kleur: '#A85A44', rot: -0.15 }); rups(ctx, 330, 505, 0.6, { kleur: '#6BA872', rot: -0.15, houding: 'kruipen', t: t * 0.6 });
    // de jongen: groen zoals de ouder (zijn eigen allelen), niet rood
    const ja = q.on('jongen', 1, 0.5); if (ja > 0.01) for (let k = 0; k < 3; k++) rups(ctx, 230 + k * 150, 680 + k * 6, 0.34, { kleur: '#6BA872', a: ja, houding: 'kruipen', t: t * 0.6 + k });
    const kaart = (i, m, cue, cueN, weg, wegN) => { const a = q.on(cue, cueN, 0.4); if (a < 0.01) return; _fade(ctx, a, () => { roundRect(ctx, 820, 170 + i * 130, 960, 100, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, m, 860, 234 + i * 130, fTekst(40, 600), rgba(C.text, 0.85), 'left'); });
      const d = q.on(weg, wegN, 0.5); if (d > 0.01) doorstreep(ctx, 850, 222 + i * 130, 850 + 900 * d, 222 + i * 130); };
    kaart(0, 'Wat een ouder meemaakt, krijgen de jongen mee', 'meemaakt', 1, 'erven', 1);
    kaart(1, 'Selectie heeft een doel', 'Selectie', 1, 'doel', 1);
    kaart(2, 'Selectie maakt nieuwe allelen', 'maakt', 2, 'geen', 2);
    haak(ctx, 820, 1780, 580, 'Selectie kiest uit variatie die er al is', C.groen, q.on('variatie', 1));
    // mutatie: een rijtje DNA wordt letter voor letter gekopieerd, één letter gaat toevallig mis
    const ma = q.on('mutaties', 1), k0 = q.at('mutatie', 2), k1 = q.at('verandering', 1) + 0.3, fout = t > q.at('toevallige', 1);
    const rij = (y, L, f, n, a) => L.split('').forEach((l, i) => { if (i >= n) return; const x = 960 + i * 64, z = i === f; _fade(ctx, a, () => { roundRect(ctx, x, y, 54, 54, 8); shape(ctx, z ? rgba(C.goud, 0.25) : rgba(C.fill, 0.7), z ? C.goud : C.line, z ? 3 : 1.5); text(ctx, l, x + 27, y + 39, fTekst(34, 700), z ? C.goud : C.text, 'center'); }); });
    if (ma > 0.01) { _fade(ctx, ma, () => metaText(ctx, 'dna', 940, 732, C.text2, 'right', 26)); rij(700, 'ATGCCA', -1, 6, ma);
      const n = Math.floor(lerp(0, 6.99, _sg(t, k0, k1))); if (n > 0) { metaText(ctx, 'kopie', 940, 822, C.text2, 'right', 26); pijl(ctx, 1150, 760, 1150, 784, C.line, 1, 3, 10); rij(790, fout ? 'ATGTCA' : 'ATGCCA', fout ? 3 : -1, n, 1); } }
    naamBij(ctx, 'mutatie', 'toevallige verandering', 1370, 818, q.on('toevallige', 1), 'left', C.goud); },
  s33(ctx, t, q) { _schemaBg(ctx);
    const x = 300, y = 780, w = 1300, h = 440, X = (j) => (j - 1975) / 12, Y = (v) => (v - 9) / 1;
    grafiekAs(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'gemiddelde snavelhoogte (mm)', xt: [[X(1976), '1976'], [X(1978), '1978'], [X(1980), '1980'], [X(1982), '1982'], [X(1984), '1984'], [X(1986), '1986']], yt: [[Y(9.2), '9,2'], [Y(9.6), '9,6'], [Y(10), '10']] });
    const D = [[1975, 9.3], [1976, 9.31], [1977, 9.32], [1977.6, 9.62], [1978, 9.7], [1980, 9.68], [1982, 9.64], [1983, 9.6], [1984, 9.45], [1985, 9.33], [1987, 9.3]];
    // de lijn loopt mee met het verhaal: omhoog na de droogte, vlak tot 1983, omlaag na El Niño
    const f1 = _sg(t, q.at('droogte', 1), q.at('voordeel', 1) + 0.4), f2 = _sg(t, q.at('voordeel', 1) + 0.4, q.at('Niño', 1)), f3 = _sg(t, q.at('kleinere', 1) - 1, q.at('beter', 1) + 0.4);
    const jr = 1975 + 2 * _sg(t, 0, q.at('droogte', 1)) + 1 * f1 + 5 * f2 + 4 * f3, P = []; for (const [j, v] of D) { if (j <= jr) P.push([j, v]); else { const pv = P[P.length - 1]; if (pv && pv[0] < jr) P.push([jr, lerp(pv[1], v, (jr - pv[0]) / (j - pv[0]))]); break; } }
    if (P.length > 1) lijnPad(ctx, P.map(([j, v]) => [x + X(j) * w, y - Y(v) * h]), C.teal, 6);
    for (const [j, l, cue] of [[1977, 'droogte 1977', 'droogte'], [1983, 'El Niño 1983', 'Niño']]) _fade(ctx, q.on(cue, 1), () => { ctx.setLineDash([6, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + X(j) * w, y); ctx.lineTo(x + X(j) * w, y - h); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, l, x + X(j) * w + 12, y - h + 10, C.goud, 'left', 26); });
    // wat er te eten was: harde vruchtjes na de droogte, kleine zachte zaadjes na El Niño
    tribulus(ctx, x + X(1978.4) * w, y - 60, 0.6, { rot: 0.3, a: q.on('hoge', 1) });
    const za = q.on('zaadjes', 1); for (let i = 0; i < 5; i++) zaadje(ctx, x + X(1984.6) * w + i * 22, y - 50 - (i % 2) * 14, 1.2, { a: za, rot: i });
    evoSchaal(ctx, 'vereenvoudigd · naar gibbs & grant 1987'); },

  // ---------------- Samenvatting
  s34(ctx, t, q) { _schemaBg(ctx);
    // drie voorwaarden: direct in beeld, ze blijven staan; de genoemde licht goud op
    const kc = [['erfelijke variatie', 'erfelijke', 'overleven'], ['overproductie', 'meer', 'selectiedruk'], ['selectiedruk', 'selectiedruk', 'Tel']];
    kc.forEach(([s, aan, uit], i) => { tekstKaart(ctx, 170 + i * 555, 130, 470, 100, s, { a: clamp(t / 0.5, 0, 1), rand: q.on(aan, 1, 0.3) * (1 - q.on(uit, 1, 0.3)) > 0.5 ? C.goud : C.line }); });
    // fitness-boompje bij 'tel de jongen': ouder, vier jongen, alleen de jongen met eigen jongen tellen
    const fb = q.on('Tel', 1, 0.5) * (1 - q.on('Voor', 1, 0.5));
    if (fb > 0.01) { const px = 960, py = 380, J = [[780, 1], [900, 0], [1020, 1], [1140, 1]];
      grondvink(ctx, px, py, 0.8, { snavel: 9.3, a: fb });
      J.forEach(([jx, ok], i) => { const a = fb * _sg(t, q.at('jongen', 1) + i * 0.12, q.at('jongen', 1) + i * 0.12 + 0.3); if (a < 0.01) return; const d = ok ? 1 : lerp(1, 0.3, q.on('krijgen', 1));
        _fade(ctx, a, () => { ctx.strokeStyle = rgba(C.line, d); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py + 6); ctx.lineTo(jx, py + 60); ctx.stroke(); });
        gedimd(ctx, a * d, (g) => grondvink(g, jx, py + 130, 0.45, { snavel: 9 }));
        if (ok) _fade(ctx, a * q.on('krijgen', 1), () => nestje(ctx, jx, py + 170, 0.45, 3)); });
      _fade(ctx, fb * q.on('meeste', 1), () => text(ctx, 'telt: 3', 1240, py + 110, fTekst(40, 700), C.groen, 'left')); }
    _fade(ctx, q.on('Voor', 1, 0.6), () => text(ctx, 'Niet de sterkste: de meeste nakomelingen die zelf jongen krijgen.', 140, 330, fTekst(44, 600), C.text, 'left'));
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 700); ctx.lineTo(1780, 700); ctx.stroke();
    const pa = q.on('allelen', 1, 0.5); if (pa > 0.01) { const p = lerp(0.45, 0.6, _sg(t, q.at('allelen', 1), q.at('allelen', 1) + 1.6)); pot(ctx, 1520, 640, 0.95, { p, n: 60, seed: 3, a: pa }); allelBalk(ctx, 1380, 670, 280, p, { procent: false, a: pa }); naamBij(ctx, 'de genenpool verandert', null, 1520, 790, pa, 'center'); }
    const ra = q.on('rups', 1, 0.4); if (ra > 0.01) { blad(ctx, 200, 560, 170, { rot: -0.1, a: ra }); rups(ctx, 340, 548, 0.5, { kleur: '#6BA872', rot: -0.1, a: ra, houding: 'kruipen', t: t * 0.6 }); naamBij(ctx, 'rups: groen', 'camouflage', 370, 760, ra, 'center'); }
    const va = q.on('vink', 1, 0.3); if (va > 0.01) { grondvink(ctx, 960, 700, 1.6, { snavel: 11, a: va, snavelKleur: q.on('hoogste', 1) > 0.5 ? C.goud : null, pik: 0.2 * Math.max(0, Math.sin(t * 1.2)) ** 4 }); naamBij(ctx, 'vink: hoge snavel', 'in een droog jaar', 980, 760, va, 'center'); } },
});
