// scenes_e7.js — film 7 'Stikstof gaat rond' (Ecologie v2): geanimeerde scènes op de goedgekeurde keyframes uit sb7.js
const _7R = (t, t0, d = 0.6) => ramp(t, t0, d);
const _7P = (t) => ramp(t, 0, 0.3); // personen snel in
function _7koeien(ctx, t) { koe7(ctx, 640, 640, 0.75, { houding: 'grazen', t }); koe7(ctx, 1020, 630, 0.68, { t: t + 1 }); koe7(ctx, 1380, 636, 0.72, { houding: 'grazen', kijk: -1, t: t + 2 }); }
// deel van een lijngrafiek tot fractie f van de x-as
function _7deel(P, f) { if (f <= 0) return []; const n = P.length - 1, x = f * n, i = Math.floor(x), out = P.slice(0, Math.min(i, n) + 1); if (i < n) { const u = x - i; out.push([P[i][0] + (P[i + 1][0] - P[i][0]) * u, P[i][1] + (P[i + 1][1] - P[i][1]) * u]); } return out; }
function _7lijn(ctx, P, kl, lw) { if (P.length < 2) return; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _7deksel(ctx, x0, w, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0 - 8, y, w + 16, 18, 5); shape(ctx, '#5E6A80', '#97A3B6', 1.5); ctx.restore(); }
function _7druip(ctx, x, y0, y1, t, a = 1) { if (a <= 0.01) return; const u = (t * 1.3) % 1; a7.druppel(ctx, x, y0 + u * (y1 - y0), a * Math.min(1, (1 - u) * 5), 0.8); }

Object.assign(SCENES, {
  // titelkaart: alleen het beeld rechts (x ≥ 1200), de sloot in doorsnede met een lopende nitraatstroom
  title(ctx, t) {
    const X = 1230, Y = 180, BW = 610, BH = 640, s = 0.38;
    ctx.save(); ctx.beginPath(); ctx.rect(X, Y, BW, BH); ctx.clip(); ctx.translate(X, Y); ctx.scale(s, 0.6); ctx.translate(-300, -60); e7Doorsnede(ctx, { slootX: 1500, kroos: 0.4 + 0.6 * ease(t / 5) }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(X, Y, BW, BH); ctx.clip();
    for (let j = 0; j < 4; j++) { const x0 = 1230 + j * 80; a7.stroom(ctx, [[x0, 448], [x0 + 30, 520], [x0 + 70, 566], [1690, 560], [1740, 505]], t + j * 0.7, 3, (c, x, y) => e7Ion(c, x, y, 8, 'nit'), { snel: 0.12, seed: j * 7 }); }
    ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(X, Y, BW, BH);
  },

  // ================= Opening =================
  s01(ctx, t, q) {
    e7Weiland(ctx, { groen: 0, t });
    const bo = q.on('bodem', 1, 1); if (bo > 0.01) { ctx.save(); ctx.globalAlpha *= bo * 0.55; for (let i = 0; i < 46; i++) { ctx.fillStyle = i % 2 ? '#6E5A44' : '#5A4A38'; ctx.beginPath(); ctx.ellipse(hash(i * 2.3) * W, 800 + hash(i * 3.7) * 26, 6 + hash(i) * 8, 3 + hash(i * 5) * 3, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
    _7koeien(ctx, t);
    const wp = q.on('waterplanten', 1, 0.8); for (const x of [300, 820, 1500]) a7.waterplant(ctx, x, 830, 60 * (0.85 + 0.15 * wp), t, 0.7 + 0.3 * wp);
    naamBij(ctx, 'april', 'HELDER WATER', 160, 200, q.on('april'), 'left');
  },
  s02(ctx, t, q) {
    const g = q.on('juni', 1, 3.2); e7Weiland(ctx, { groen: g, t }); _7koeien(ctx, t);
    naamBij(ctx, 'april', 'HELDER WATER', 160, 200, 1 - q.on('juni', 1, 0.4), 'left'); naamBij(ctx, 'juni', 'GROENE LAAG', 160, 200, q.on('juni', 1, 0.6), 'left');
    const w = q.on('waarom', 1, 0.6); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; text(ctx, 'Waarom wordt een sloot', W / 2, 250, fTekst(56, 700), C.text, 'center'); text(ctx, 'naast een weiland groen?', W / 2, 320, fTekst(56, 700), C.text, 'center'); ctx.restore(); }
    const r = q.on('groen', 2, 0.8); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(960, 790, 520, 62, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * r); ctx.stroke(); ctx.restore(); }
  },

  // ================= H1 Stikstof uit de lucht =================
  s04(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx);
    const tb = q.at('bakken'), tg = q.at('grond');
    [620, 880, 1140, 1400].forEach((x, i) => { const a = _7R(t, Math.min(tb, 0.2) + i * 0.25, 0.5), g = _7R(t, tg + i * 0.25, 0.9);
      e7Bak(ctx, x, 800, { w: 200, h: 260, lagen: i === 3 ? [] : [[E7.zand, (110 + i * 10) * g]], label: 'bak ' + (i + 1), opvang: i === 0 ? 0.4 * _7R(t, q.at('zakt'), 3) : 0, a, seed: i + 1 }); });
    const zk = _7R(t, q.at('zakt'), 0.4); if (zk > 0.01) _7druip(ctx, 620, 758, 790, t, zk * (1 - _7R(t, q.at('teststrip'), 1)));
    const kr = q.on('kraantje'); if (kr > 0.01) { a7.ring(ctx, 620, 740, 26, kr, t); naamBij(ctx, 'kraantje', 'HIER KOMT HET WATER ERUIT', 620, 862, kr, 'center'); }
    _yas(ctx, 300, 900, 430, { pose: kr > 0.5 ? 'wijs' : 'staan', t, a: _7P(t) });
    const ts = q.on('teststrip', 1, 0.4); _bil(ctx, 1660, 900, 450, { kijk: -1, t, a: _7P(t), pose: ts > 0.5 ? 'vasthouden' : 'staan', hold: ts > 0.5 ? (c, x, y) => e7Strip(c, x, y + 50, 'nit', 0, { h: 130, w: 26, label: false, a: ts }) : null });
  },
  s05(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT');
    const te = q.at('eiwit'); a7.eiwit(ctx, 560, 480, 2.2, { vouw: 0.15 + 0.7 * ease(t / 5), n: 34, kA: (i) => _7R(t, i * 0.05, 0.3), nA: (i) => _7R(t, te + 0.3 + i * 0.05, 0.4) });
    naamBij(ctx, 'eiwit', 'KETEN VAN AMINOZUREN', 560, 800, q.on('eiwit'), 'center'); naamBij(ctx, 'stikstof', 'IN ELK AMINOZUUR', 300, 220, _7R(t, te + 0.6), 'left', _l7(E7.nit, 0.35));
    const vak = (x, naam, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 260, 280, 440, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.save(); ctx.beginPath(); roundRect(ctx, x, 260, 280, 440, 14); ctx.clip(); fn(x + 140, 660); ctx.restore(); ctx.restore(); naamBij(ctx, naam, null, x + 140, 750, a, 'center'); };
    vak(980, 'plant', q.on('plant'), (x, y) => ecoKlaver(ctx, x, y, 14, { t }));
    vak(1290, 'koe', q.on('koe'), (x, y) => { ctx.fillStyle = '#3A5540'; ctx.fillRect(x - 140, y - 60, 280, 120); koe7(ctx, x, y - 60, 0.55, { houding: 'grazen', t }); });
    vak(1600, 'jij', q.on('jou', 1, 0.3), (x, y) => persoon(ctx, 'yasmin', x, y + 10, 360, { outfit: 'school', t }));
    metaText(ctx, 'ALLEMAAL EIWIT · NIET OP SCHAAL', 980, 230, C.text2, 'left', 26);
  },
  s06(ctx, t, q) {
    e7Weiland(ctx, { groen: 0, sloot: false, t });
    for (let i = 0; i < 26; i++) { const w = wander(i, t, 26, 0.35); e7N2(ctx, 120 + hash(i * 3.1) * 1680 + w.x, 120 + hash(i * 1.7) * 300 + w.y, 16, { rot: hash(i) * 3 + t * 0.3 * (hash(i * 9) - 0.5) }); }
    const x0 = 460, w = 1000, y = 520, b1 = q.on('achtenzeventig', 1, 1.4), b2 = _7R(t, q.at('achtenzeventig') + 1.4, 0.8);
    metaText(ctx, 'SAMENSTELLING VAN DROGE LUCHT', x0, y - 18, C.text2, 'left', 26); roundRect(ctx, x0, y, w, 56, 8); shape(ctx, rgba(C.fill, 0.5), C.line, 1);
    if (b1 > 0.01) { roundRect(ctx, x0, y, Math.max(16, 0.78 * w * b1 - 3), 56, 8); shape(ctx, E7.n2, _l7(E7.n2, 0.3), 1); }
    if (b2 > 0.01) { roundRect(ctx, x0 + 0.78 * w, y, Math.max(16, 0.21 * w * b2 - 3), 56, 8); shape(ctx, C.teal, _l7(C.teal, 0.3), 1); ctx.save(); ctx.globalAlpha *= b2; roundRect(ctx, x0 + 0.99 * w, y, 0.01 * w, 56, 4); shape(ctx, C.text2, null); ctx.restore(); }
    naamBij(ctx, '78 % stikstofgas', null, x0 + 390, y + 110, b1, 'center'); naamBij(ctx, '21 % zuurstof', null, x0 + 885, y + 110, b2, 'center');
  },
  s07(ctx, t, q) { // vraag-alinea: gras midden in stikstofgas
    e7Weiland(ctx, { groen: 0, sloot: false, horizon: 440, t });
    e7Gras(ctx, 960, 860, 760, 380, { n: 34, seed: 4 });
    for (let i = 0; i < 22; i++) { const w = wander(i + 40, t, 30, 0.3); e7N2(ctx, 520 + hash(i * 2.2) * 880 + w.x, 300 + hash(i * 5.3) * 480 + w.y, 18, { rot: hash(i) * 3 + t * 0.4 * (hash(i * 7) - 0.5), a: q.on('stikstofgas', 1, 1) }); }
    naamBij(ctx, 'stikstofgas', 'OVERAL ROND HET GRAS', 1460, 300, q.on('stikstofgas'), 'left');
    vraagteken(ctx, 960, 260, q.on('gebruiken'), 140);
  },
  s09(ctx, t, q) {
    ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
    vul(ctx, [[0, 140], [W, 140], [W, 420], [1080, 420], [1040, 470], [880, 470], [840, 420], [0, 420]], '#3E6A4A', '#5E8A66', 2);
    for (let i = 0; i < 16; i++) { const cx = 60 + i * 120; if (cx > 760 && cx < 1160) continue; ctx.beginPath(); ctx.ellipse(cx, 300, 52, 80, 0, 0, 6.283); shape(ctx, '#4E7E58', '#6E9E78', 1.5); chloroplast(ctx, cx - 10, 280, 26, 0.9, 0.4); chloroplast(ctx, cx + 14, 330, 24, 0.9, -0.3); }
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(960 + s * 58, 440, 46, 30, 0, 0, 6.283); shape(ctx, '#5E9A62', '#8ABE8C', 1.5); }
    // los: twee atomen die niet uit elkaar gaan
    const big = q.on('stikstofatomen', 1, 0.6), los = _7R(t, q.at('los'), 0.5) * (1 - _7R(t, q.at('huidmondjes'), 1));
    if (big > 0.01) { const tr = los * (2 + 2 * Math.sin(t * 9)); ctx.save(); ctx.globalAlpha *= big; e7N2(ctx, 330, 620, 66 + tr * 0.6, { rot: 0.05 * Math.sin(t * 7) * los });
      if (los > 0.01) { pijl(ctx, 250, 620, 130 - tr * 3, 620, C.koraal, los, 5, 18); pijl(ctx, 410, 620, 530 + tr * 3, 620, C.koraal, los, 5, 18); }
      ctx.restore(); naamBij(ctx, 'stikstofgas', 'TWEE ATOMEN, STEVIG VAST', 330, 740, big, 'center'); }
    const hm = q.on('huidmondjes', 1, 0.8); const pad = [[700, 800], [880, 620], [960, 470], [990, 380], [1050, 470], [1120, 620], [1300, 820]];
    if (hm > 0.01) { ctx.save(); ctx.globalAlpha *= hm; lijn(ctx, pad, rgba(C.goud, 0.45), 2.5); a7.stroom(ctx, pad, t, 7, (c, x, y, k, u) => e7N2(c, x, y, 24, { rot: k + u * 2 }), { snel: 0.09 }); ctx.restore(); }
    naamBij(ctx, 'huidmondje', 'ONDERKANT VAN EEN BLAD', 1130, 510, hm, 'left');
    for (let i = 0; i < 8; i++) { const w = wander(i + 9, t, 18, 0.3); e7N2(ctx, 640 + hash(i * 9) * 1100 + w.x, 660 + hash(i * 4) * 180 + w.y, 20, { rot: hash(i) * 3 + t * 0.2, a: 0.55 }); }
    naamBij(ctx, 'erin en onveranderd eruit', null, 1340, 700, q.on('onveranderd'), 'left');
    metaText(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26);
  },
  s10(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx);
    a7.lamp(ctx, 920, 290, 560, q.on('licht'));
    const gg = q.on('gras', 1, 1.2), gk = q.on('klaver', 1, 1.2);
    a7.bak(ctx, 720, 800, { label: 'bak 1', meta: 'GRAS', seed: 1, opvang: 0.3 }, { soort: 'gras', h: 18 * gg, a: gg, wortel: 0.3 });
    a7.bak(ctx, 1120, 800, { label: 'bak 2', meta: 'KLAVER', seed: 1, opvang: 0.3 }, { soort: 'klaver', h: 22 * gk, a: gk, wortel: 0.3 });
    e7Klok(ctx, 1500, 260, 0.6 * _7R(t, q.at('licht') + 0.5, 3));
    const wa = q.on('water', 1, 0.4);
    _bil(ctx, 330, 900, 450, { pose: 'vasthouden', t, a: _7P(t), hold: (c, x, y) => { _gieter7(c, x, y); if (wa > 0.01) a7.regen(c, x + 104, x + 118, y - 34, 600, t, 6, { a: wa * (1 - _7R(t, q.at('licht') + 1.5, 0.8)), snel: 1.6 }); } });
    naamBij(ctx, 'arm zand, geen mest', 'ALLEEN WATER EN LICHT', 920, 190, q.on('zand'), 'center');
  },
  s11(ctx, t, q) { // vraag-alinea: twee bakken op week 0, nog niets te zien
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx);
    a7.bak(ctx, 720, 800, { label: 'bak 1', meta: 'GRAS', opvang: 0.3 }, { soort: 'gras', h: 18, wortel: 0.3 });
    a7.bak(ctx, 1120, 800, { label: 'bak 2', meta: 'KLAVER', opvang: 0.3 }, { soort: 'klaver', h: 22, wortel: 0.3 });
    e7Klok(ctx, 1500, 260, 0.6); metaText(ctx, 'NA 8 WEKEN?', 1500, 380, C.goud, 'center', 26);
    vraagteken(ctx, 920, 260, q.on('best'), 130);
  },
  s13(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx);
    const g = _7R(t, 0.2, 2.6), geel = q.on('geel', 1, 1);
    e7Klok(ctx, 1560, 220, 8 * _7R(t, 0, 2.6));
    a7.bak(ctx, 700, 800, { label: 'bak 1', meta: 'GRAS', opvang: 0.3 }, { soort: 'gras', h: 18 + 28 * g, kleur: _m7(E7.gras, Math.max(geel, g * 0.6), '#B8B06A'), n: 11 });
    a7.bak(ctx, 1100, 800, { label: 'bak 2', meta: 'KLAVER', opvang: 0.3 }, { soort: 'klaver', h: 22 + 88 * g, knol: 1.1 * g + 0.2 });
    _yas(ctx, 1600, 900, 430, { kijk: -1, pose: q.on('klaver') > 0.5 ? 'wijs' : 'staan', t, a: _7P(t) });
  },
  s14(ctx, t, q) {
    e7Weiland(ctx, { groen: 0, sloot: false, horizon: 440, t }); for (let i = 0; i < 26; i++) ecoKlaver(ctx, 60 + hash(i * 3.3) * 620, 760 + hash(i * 1.9) * 120, 2.6 + hash(i) * 0.8, { t: t + i });
    const op = _7R(t, 0, 1.6); // plant komt omhoog uit de grond
    persoon(ctx, 'yasmin', 360, 840, 420, { outfit: 'school', pose: 'vasthouden', t, a: _7P(t), hold: (c, x, y) => { ecoKlaver(c, x + 4, y + 10 + (1 - op) * 50, 2.5, { t });
      for (let k = 0; k < 6; k++) { const u = ((t * 0.7 + hash(k * 3)) % 1); circ(c, x + (hash(k) - 0.5) * 20, y + 24 + u * 160, 2.5, rgba('#5A4632', 1 - u)); } } });
    const p = q.on('wortels', 1, 0.9);
    if (p > 0.01) { ctx.save(); ctx.globalAlpha *= p; ctx.translate(420, 670); ctx.scale(0.2 + 0.8 * p, 0.2 + 0.8 * p); ctx.translate(-420, -670);
      roundRect(ctx, 820, 120, 1020, 760, 16); shape(ctx, rgba('#162236', 0.96), C.goud, 2);
      ctx.save(); ctx.beginPath(); roundRect(ctx, 820, 120, 1020, 760, 16); ctx.clip(); ecoKlaver(ctx, 1290, 300, 40, { knol: 1, t: t * 0.5 });
      for (let i = 0; i < 18; i++) { const u = (t * 0.12 + hash(i * 5.1)) % 1; ctx.fillStyle = rgba('#5A4632', 1 - u); ctx.beginPath(); ctx.ellipse(1000 + hash(i * 2.7) * 560, 380 + hash(i * 4.1) * 300 + u * 160, 5 + hash(i) * 6, 4 + hash(i * 3) * 4, hash(i) * 3, 0, 6.283); ctx.fill(); }
      ctx.restore(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= p; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(420, 640); ctx.lineTo(420 + 400 * p, 640 - 340 * p); ctx.moveTo(420, 700); ctx.lineTo(420 + 400 * p, 700 + 160 * p); ctx.stroke(); ctx.restore();
      metaText(ctx, 'VERGROOT 16× · WARE VERHOUDINGEN', 850, 850, rgba(C.text2, p), 'left', 26); }
    const mm = q.on('millimeter'); if (mm > 0.01) { ctx.save(); ctx.globalAlpha *= mm; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1620, 840); ctx.lineTo(1660, 840); ctx.stroke(); metaText(ctx, '1 CM', 1676, 850, C.text2, 'left', 26); ctx.restore(); }
    naamBij(ctx, 'wortelknolletjes', '± 15 · 2–4 MM · ROZE', 1820, 200, q.on('roze'), 'right');
  },
  s15(ctx, t, q) {
    ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
    lijn(ctx, [[120, 300], [260, 420], [330, 600], [360, 820]], '#C8AA84', 10); ctx.beginPath(); ctx.ellipse(300, 520, 34, 22, 0.9, 0, 6.283); shape(ctx, '#E8809E', '#9A3E5E', 2);
    const z = q.on('knolletje', 1, 1);
    zoomCircle(ctx, 920, 470, 330 * (0.3 + 0.7 * z), 300, 520, 'DOORSNEDE VAN EEN KNOLLETJE · ± 3 MM', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(560, 120, 720, 720); e7Knol(ctx, 920, 470, 250 * (0.3 + 0.7 * z));
      const b = q.on('bacteriën', 1, 0.6); if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b * (0.10 + 0.06 * Math.sin(t * 2.4)); ctx.fillStyle = '#F0B4C2'; ctx.beginPath(); ctx.ellipse(920, 470, 250 * 1.25 * 0.72, 250 * 0.72, 0, 0, 6.283); ctx.fill(); ctx.restore(); } });
    a7.ring(ctx, 920, 470, 342, q.on('roze') * (0.6 + 0.4 * Math.sin(t * 3)), t);
    const ng = q.on('stikstofgas'), am = q.on('ammonium');
    if (ng > 0.01) { pijl(ctx, 1380, 330, 1250, 400, E7.n2, ng, 4, 14); a7.stroom(ctx, [[1560, 230], [1380, 300], [1180, 410]], t, 5, (c, x, y, k) => e7N2(c, x, y, 16, { rot: k + t }), { a: ng, snel: 0.15 }); }
    if (am > 0.01) { pijl(ctx, 1250, 600, 1400, 680, E7.amm, am, 4, 14); a7.stroom(ctx, [[1180, 560], [1400, 690], [1560, 730]], t, 5, (c, x, y) => e7Ion(c, x, y, 12, 'amm'), { a: am, snel: 0.15, seed: 4 }); }
    naamBij(ctx, 'stikstofgas', null, 1500, 230, ng, 'left'); naamBij(ctx, 'ammonium', null, 1480, 800, am, 'left'); naamBij(ctx, 'bacteriën', 'IN DE ROZE CELLEN', 1360, 520, q.on('bacteriën'), 'left');
    naamBij(ctx, 'stikstofbinding', null, 920, 110, q.on('stikstofbinding'), 'center');
  },
  s16(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); ecoKlaver(ctx, 520, 600, 26, { knol: 2, t: t * 0.6 });
    e7Bacterie(ctx, 1380, 560, 220, { rot: 0.1 + 0.05 * Math.sin(t * 1.3) }); e7Bacterie(ctx, 1460, 640, 160, { rot: -0.4 + 0.06 * Math.sin(t * 1.1 + 1), a: 0.8 });
    const su = q.on('suikers', 1, 0.9), st = q.on('stikstof', 1, 0.9);
    a7.pijl(ctx, 760, 420, 1200, 470, su, ECOK.organisch, 1, 5, 18); if (su > 0.9) a7.stroom(ctx, [[770, 421], [1190, 469]], t, 5, (c, x, y) => circ(c, x, y - 14, 8, ECOK.organisch, _l7(ECOK.organisch, 0.3), 1), { snel: 0.25 });
    a7.pijl(ctx, 1200, 700, 760, 720, st, E7.nit, 1, 5, 18); if (st > 0.9) a7.stroom(ctx, [[1190, 700], [770, 719]], t, 5, (c, x, y) => e7Ion(c, x, y + 16, 9, 'amm'), { snel: 0.25, seed: 5 });
    naamBij(ctx, 'suikers', 'VAN DE PLANT', 980, 400, su, 'center', ECOK.organisch); naamBij(ctx, 'ammonium', 'VAN DE BACTERIE', 980, 790, st, 'center', _l7(E7.nit, 0.35));
    naamBij(ctx, 'klaver', 'VLINDERBLOEMIGE', 200, 300, q.on('vlinderbloemigen'), 'left'); naamBij(ctx, 'bacterie', 'IN HET KNOLLETJE', 1420, 440, _7R(t, 0.2), 'center');
    haak(ctx, 520, 1460, 830, 'mutualisme: allebei voordeel', C.groen, q.on('mutualisme'));
  },
  s17(ctx, t, q) {
    e7Weiland(ctx, { groen: 0, sloot: false, horizon: 480, t });
    const x0 = 140, h = 360, v = gangSnelheid('gerrit', h, 'loop'), tw = Math.max(0.1, (1120 - x0) / v), gx = (tt) => x0 + v * Math.min(tt, tw);
    const plant = (i) => { const px = 80 + hash(i * 3.3) * 1760, py = 700 + hash(i * 1.9) * 160; return [px, py, _7R(t, (px - x0) / v + 0.8, 1.6)]; };
    const lucht = q.on('lucht', 1, 1); if (lucht > 0.01) for (let i = 0; i < 9; i++) { const u = (t * 0.12 + hash(i * 4.4)) % 1; e7N2(ctx, 200 + hash(i * 7.7) * 1500, 200 + u * 520, 13, { rot: i + t * 0.3, a: lucht * Math.min(1, u * 5, (1 - u) * 5) }); }
    for (let i = 0; i < 40; i++) { const [px, py, g] = plant(i); if (py < 820 && g > 0.01) ecoKlaver(ctx, px, py, 2.6 + hash(i) * 1.2, { groei: g, t: t + i }); }
    // zaadjes uit de hand
    for (let k = 0; k < 60; k++) { const te = k * 0.18; if (te > tw || t < te) continue; const dt = t - te, hx = gx(te) + 34, gy0 = 820 - h * 0.46, gy = 700 + hash(k * 2.9) * 150, y = gy0 + 380 * dt * dt; if (y > gy) continue; circ(ctx, hx + 40 * dt + (hash(k) - 0.5) * 20, y, 3, '#D8C890'); }
    if (t < tw) persoon(ctx, 'gerrit', x0, 820, h, { zij: true, gang: 'loop', vooruit: true, t, outfit: 'stal', a: _7P(t) });
    else persoon(ctx, 'gerrit', gx(tw), 820, h, { zij: true, kijk: 1, outfit: 'stal', t });
    for (let i = 0; i < 40; i++) { const [px, py, g] = plant(i); if (py >= 820 && g > 0.01) ecoKlaver(ctx, px, py, 2.6 + hash(i) * 1.2, { groei: g, t: t + i }); }
    naamBij(ctx, 'klaver tussen het gras', '± EEN KWART', 1400, 640, q.on('kwart'), 'left');
    card(ctx, 1240, 160, 600, 170, 'minder kunstmest', '± 100 kg stikstof per hectare per jaar', q.on('honderd'));
  },
  s18(ctx, t, q) {
    e7Weiland(ctx, { groen: 0, sloot: false, horizon: 460, t }); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 640, W, 440);
    const tp = q.at('ploegen'), px = lerp(2150, 1150, _7R(t, tp, 5)), zaai = q.on('zaaien', 1, 2.2);
    for (let i = 0; i < 90; i++) { const sx = hash(i * 4.7) * W; if (sx > px) continue; lijn(ctx, [[sx, 652 + hash(i) * 200], [sx + 3, 640 + hash(i) * 200]], rgba('#C9B070', 0.7 * (1 - zaai)), 2); } // stoppels na de oogst
    for (let x = 0; x < W; x += 60) { if (x + 30 < px) continue; ctx.fillStyle = '#3E3024'; ctx.fillRect(Math.max(x, px), 640, x + 30 - Math.max(x, px), 440); }
    const kl7 = (voor) => { for (let i = 0; i < 90; i++) { const kx = 40 + hash(i * 2.7) * 1860, ky = 660 + hash(i * 3.9) * 220; if (kx > px - 10 || (ky > 760) !== voor) continue; const g = clamp(zaai * 1.4 - hash(i * 5) * 0.4, 0, 1); if (g > 0.01) ecoKlaver(ctx, kx, ky, 2.4, { groei: g, t: t + i }); } };
    kl7(false); if (t > tp - 0.2) { ctx.save(); ctx.translate(px, 760); ctx.scale(-1, 1); a7.trekker(ctx, 0, 0, t, _7R(t, tp - 0.2, 0.3)); ctx.restore(); } kl7(true);
    const af = q.on('afbrekers', 1, 1); if (af > 0.01) for (let i = 0; i < 16; i++) { const w = wander(i + 3, t, 8, 0.4), ix = Math.max(px + 30, 1180) + hash(i * 3.3) * (1900 - Math.max(px + 30, 1180)); e7Ion(ctx, ix + w.x, 700 + hash(i * 5.5) * 160 + w.y, 10, i % 3 ? 'nit' : 'amm', { a: af * _7R(t, q.at('afbrekers') + i * 0.12, 0.5) }); }
    naamBij(ctx, 'ondergeploegd', 'WORDT HUMUS EN MINERALEN', 1500, 600, _7R(t, tp + 4.5, 0.6), 'center');
    naamBij(ctx, 'groenbemester', 'KLAVER WORDT ONDERGEPLOEGD', 560, 560, q.on('groenbemester'), 'center');
  },
  s19(ctx, t, q) {
    _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 760, W, 140); naamBij(ctx, 'bodem', null, 120, 830, 1, 'left');
    const ab = 1, al = q.on('bliksem', 1, 0.4), af = q.on('fabrieken', 1, 0.6), ev = q.on('evenveel', 1, 0.6);
    const kol = [[420, 6, 'bacteriën', 'IN KNOLLETJES', ab], [960, 2, 'bliksem', 'EEN KLEIN BEETJE', al], [1500, 9, 'kunstmestfabriek', 'VEEL ENERGIE', af]];
    for (const [x, d, , , a] of kol) { if (a <= 0.01) continue; a7.pijl(ctx, x, 280, x, 730, a, E7.nit, 1, d * 3, 22); a7.stroom(ctx, [[x, 300], [x, 720]], t, d + 1, (c, xx, yy) => e7Ion(c, xx, yy, 6 + d * 0.8, 'amm'), { a: a * 0.9, snel: 0.2, seed: d }); }
    e7Bacterie(ctx, 420, 200, 120, { rot: 0.05 * Math.sin(t * 1.4) });
    if (al > 0.01) { const fl = al * (0.55 + 0.45 * Math.abs(Math.sin(t * 2.2))) ; ctx.save(); ctx.globalAlpha *= fl; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(990, 120); ctx.lineTo(940, 200); ctx.lineTo(985, 200); ctx.lineTo(930, 280); ctx.stroke(); ctx.restore(); }
    if (af > 0.01) { ctx.save(); ctx.globalAlpha *= af; ctx.fillStyle = '#5E6A80'; ctx.fillRect(1420, 170, 160, 100); ctx.fillRect(1440, 100, 30, 70); ctx.fillRect(1500, 120, 30, 50);
      for (let i = 0; i < 8; i++) { const u = (t * 0.25 + i / 8) % 1; circ(ctx, 1455 + (i % 2) * 60 + u * 40, 96 - u * 70, 10 + u * 14, rgba('#97A3B6', 0.4 * (1 - u))); } ctx.restore();
      const en = q.on('energie'); a7.pijl(ctx, 1760, 220, 1600, 220, en, C.goud, 1, 5, 18); }
    kol.forEach(([x, , n, m, a]) => naamBij(ctx, n, m, x + 40, 500, a, 'left'));
    if (ev > 0.01) { a7.ring(ctx, 420, 640, 50, ev * (1 - _7R(t, q.at('evenveel') + 3, 0.8)), t); a7.ring(ctx, 1500, 640, 50, ev * (1 - _7R(t, q.at('evenveel') + 3, 0.8)), t); }
    metaText(ctx, 'DIKTE VAN DE PIJL = HOEVEELHEID', 80, 880, C.text2, 'left', 26);
  },

  // ================= H2 Van mest tot nitraat =================
  s20(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 620, 900, 280); e7Gras(ctx, 450, 620, 500, 360, { n: 18 }); e7Wortels(ctx, 450, 620, 220, 360, {});
    const op = q.on('wortels', 1, 0.6);
    for (let i = 0; i < 10; i++) { const bx = 160 + hash(i * 3) * 600, by = 700 + hash(i * 5) * 170; let x = bx, y = by, a = 1;
      if (op > 0.01) { const u = ((t - q.at('wortels')) * 0.3 + hash(i * 7)) % 1, tx = 330 + hash(i * 2) * 240, ty = 680; x = lerp(bx, tx, u); y = lerp(by, ty, u); a = Math.min(1, (1 - u) * 4, u < 0.02 ? 1 : 1); }
      e7Ion(ctx, x, y, 11, i % 3 ? 'nit' : 'amm', { a }); }
    const am = q.on('aminozuren', 1, 0.8), su = q.on('suikers', 1, 0.6), ta = q.at('aminozuren');
    a7.pijl(ctx, 700, 420, 1000, 420, am, C.line, 1, 3, 14);
    if (am > 0.9) a7.stroom(ctx, [[700, 420], [990, 420]], t, 4, (c, x, y) => e7Ion(c, x, y - 18, 8, 'nit'), { snel: 0.3 });
    if (su > 0.01) a7.stroom(ctx, [[760, 300], [860, 400], [990, 420]], t, 4, (c, x, y) => circ(c, x, y + 16, 7, ECOK.organisch), { a: su, snel: 0.3, seed: 9 });
    a7.eiwit(ctx, 1380, 430, 1.6, { vouw: 0.5 * q.on('eiwitten', 1, 2.5), n: 26, kA: (i) => _7R(t, ta + 0.6 + i * 0.08, 0.3), nA: () => 1 });
    naamBij(ctx, 'ammonium en nitraat', 'UIT DE BODEM', 450, 840, 1, 'center'); naamBij(ctx, 'aminozuren, eiwit', 'IN DE PLANT', 1380, 660, am, 'center');
    haak(ctx, 1120, 1640, 730, 'stikstofassimilatie', C.groen, q.on('stikstofassimilatie'));
    const vg = q.on('voortgezette'); if (vg > 0.01) metaText(ctx, 'VORM VAN VOORTGEZETTE ASSIMILATIE', 1380, 846, rgba(C.text2, vg), 'center', 24);
  },
  s21(ctx, t, q) {
    e7Weiland(ctx, { sloot: false, horizon: 460, t }); koe7(ctx, 900, 760, 1.25, { houding: 'grazen', t });
    const ee = q.on('eet', 1, 0.6), ur = q.on('ureum', 1, 1.2), me = q.on('mest', 1, 1);
    if (ee > 0.01) a7.stroom(ctx, [[1200, 790], [1110, 730], [960, 640], [760, 620], [640, 660], [600, 760]], t, 9, (c, x, y, k) => e7Ion(c, x, y, 9, k % 2 ? 'amm' : 'nit', { teken: false }), { a: ee * 0.9, snel: 0.12 });
    if (me > 0.01) { ctx.save(); ctx.globalAlpha *= me; ctx.fillStyle = E7.mest; ctx.beginPath(); ctx.ellipse(560, 800, 70 * (0.4 + 0.6 * me), 22 * (0.4 + 0.6 * me), 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    if (ur > 0.01) { ctx.fillStyle = rgba('#D8C86A', 0.55 * ur); ctx.beginPath(); ctx.ellipse(700, 812, 90 * ur, 16 * ur, 0, 0, 6.283); ctx.fill(); }
    naamBij(ctx, 'mest', 'STIKSTOF IN RESTEN', 470, 790, me, 'right'); naamBij(ctx, 'urine', 'UREUM', 800, 818, ur, 'left'); naamBij(ctx, 'eiwit in gras', null, 1300, 640, q.on('eiwitten'), 'left');
  },
  s22(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx);
    const m = q.on('koeienmest', 1, 1.6), wa = q.on('water', 1, 0.4);
    e7Bak(ctx, 960, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 34 * m, label: 'bak 3', meta: 'MET KOEIENMEST', opvang: 0.3 * _7R(t, q.at('water'), 2.5) });
    if (wa > 0.01) _7druip(ctx, 960, 758, 790, t, wa);
    _ger(ctx, 560, 900, 450, { pose: 'vasthouden', t, a: _7P(t), hold: (c, x, y) => { c.save(); c.fillStyle = '#7A8494'; roundRect(c, x - 30, y - 6, 70, 80, 8); c.fill(); c.fillStyle = E7.mest; c.fillRect(x - 24, y, 58, 16 * (1 - m * 0.7)); c.restore(); } });
    e7Klok(ctx, 1500, 260, 0); e7Strip(ctx, 1400, 720, 'amm', 0, { a: q.on('ammonium') }); e7Strip(ctx, 1600, 720, 'nit', 0, { a: q.on('nitraat') });
  },
  s23(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx);
    e7Bak(ctx, 520, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 34, label: 'bak 3', opvang: 0.3 + 0.2 * _7R(t, 0, 2) }); e7Klok(ctx, 520, 200, _7R(t, 0, 1.6));
    e7Strip(ctx, 760, 740, 'amm', 0.85 * q.on('ammoniumstrip', 1, 1.6), { h: 260 }); e7Strip(ctx, 930, 740, 'nit', 0, { h: 260 });
    const z = q.on('bacteriën', 1, 0.9), tb = q.at('breken');
    zoomCircle(ctx, 1400, 470, 290 * (0.3 + 0.7 * z), 560, 470, 'IN DE MEST · VERGROOT', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1100, 140, 600, 600);
      const P = a7.eiwit(ctx, 1330, 330, 0.9, { vouw: 0.3, n: 16, kA: (i) => 1 - _7R(t, tb + i * 0.18, 0.4) });
      e7Bacterie(ctx, 1460 + 10 * Math.sin(t * 0.9), 470, 150, { rot: -0.5 + 0.08 * Math.sin(t * 1.3) }); e7Bacterie(ctx, 1260 + 8 * Math.sin(t * 0.7 + 2), 560, 120, { rot: 0.3 + 0.06 * Math.sin(t) });
      P.forEach((p, i) => { const ti = tb + i * 0.18, u = _7R(t, ti, 1.6); if (t < ti) return; const tx = 1180 + i * 28, ty = 650 + (i % 2) * 28; const w = wander(i, t, 4, 0.6); e7Ion(ctx, lerp(p[0], tx, u) + w.x, lerp(p[1], ty, u) + w.y, 12, 'amm', { a: _7R(t, ti, 0.3) }); }); });
    naamBij(ctx, 'ammonificatie', 'AFBREKERS MAKEN AMMONIUM', 1400, 110, q.on('ammonificatie'), 'center');
  },
  s24(ctx, t, q) {
    e7Stal(ctx, { vloer: 640 }); koe7(ctx, 700, 640, 1.2, { t });
    const ur = q.on('urine', 1, 1.2), ge = q.on('gescheiden', 1, 2), am = q.on('ammoniak', 1, 0.8), wa = q.on('waait', 1, 2), tA = q.at('ammoniak'), tG = q.at('gescheiden');
    if (ur > 0.01) { ctx.fillStyle = rgba('#D8C86A', 0.6 * ur * (1 - ge)); ctx.fillRect(1080 + 150 * (1 - ur), 622, 300 * ur, 18); ctx.fillStyle = E7.mest; ctx.beginPath(); ctx.ellipse(1180, 622, 60 * (0.5 + 0.5 * ur), 14, 0, Math.PI, 0); ctx.fill(); }
    if (ge > 0.01 && ge < 1) for (let i = 0; i < 6; i++) { const u = (t * 1.4 + i / 6) % 1; a7.druppel(ctx, 1110 + i * 45, 660 + u * 120, (1 - ge) * (1 - u), 0.7); } // urine zakt weg door het rooster
    if (am > 0.01) for (let i = 0; i < 22; i++) { const per = 6.25, fase = hash(i * 2.9) * per, dt = t - tA - fase; if (dt < 0) continue; const k = Math.floor(dt / per), u = (dt - k * per) / per, tStart = tA + fase + k * per;
      if (tStart > tG + 0.5) continue; const sx = 1110 + hash(i * 2.2) * 260, dx = (80 + 260 * wa) * u, y = 620 - u * 470;
      e7Ion(ctx, sx + dx + Math.sin(t + i) * 10, y, 10, 'amm', { teken: false, a: am * Math.min(1, u * 6, (1 - u) * 3) }); }
    pijl(ctx, 1240, 600, 1300, 300, E7.amm, am * (1 - ge * 0.8), 4, 16);
    naamBij(ctx, 'ammoniak', 'ONTSNAPT NAAR DE LUCHT', 1420, 300, am, 'left'); naamBij(ctx, 'urine + mest', 'OP DE ROOSTERVLOER', 1230, 740, ur * (1 - ge), 'center');
    naamBij(ctx, 'urine en mest gescheiden', 'MINDER AMMONIAK', 1230, 740, _7R(t, tG + 1.2, 0.6), 'center');
  },
  s25(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 480, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 26, label: 'bak 3', opvang: 0.6 }); e7Klok(ctx, 480, 200, 1 + 3 * _7R(t, 0.2, 2.6));
    const gx = 900, gy = 760, gw = 840, gh = 440; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    for (let wk = 0; wk <= 4; wk++) metaText(ctx, String(wk), gx + wk * gw / 4, gy + 40, C.text2, 'center', 28); metaText(ctx, 'WEEK', gx + gw, gy + 76, C.text2, 'right', 26); metaText(ctx, 'HOEVEELHEID IN HET WATER', gx, gy - gh - 20, C.text2, 'left', 26); metaText(ctx, 'VOORBEELD', gx + gw, gy - gh - 20, C.text2, 'right', 26);
    const am = [0, 0.85, 0.6, 0.3, 0.15], ni = [0, 0.05, 0.35, 0.65, 0.85], P = (v) => v.map((y, i) => [gx + i * gw / 4, gy - y * gh]);
    const f1 = 0.25 + 0.75 * q.on('daalt', 1, 3.5), f2 = 0.25 + 0.75 * q.on('nitraatstrip', 1, 3.5);
    _7lijn(ctx, _7deel(P(am), f1), E7.amm, 5); _7lijn(ctx, _7deel(P(ni), f2), E7.nit, 5);
    naamBij(ctx, 'ammonium', null, gx + gw * 0.27, gy - 0.9 * gh, 1, 'left', E7.amm); naamBij(ctx, 'nitraat', 'NITRIFICATIE · MET ZUURSTOF', gx + gw * 0.62, gy - 0.86 * gh, q.on('nitrificatie'), 'left', _l7(E7.nit, 0.35));
    const ri = q.on('nitriet', 1, 0.6), rn = _7R(t, q.at('nitriet') + 0.9, 0.6); if (ri > 0.01) { e7Ion(ctx, 1240, 200, 16, 'amm', { a: ri }); a7.pijl(ctx, 1272, 200, 1368, 200, ri, C.line, 1, 3, 12);
      ctx.save(); ctx.globalAlpha *= ri; circ(ctx, 1400, 200, 16, '#A8C4E4', '#D0E0F2', 1.5); ctx.strokeStyle = _d7('#A8C4E4', 0.6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1393, 200); ctx.lineTo(1407, 200); ctx.stroke(); ctx.restore(); naamBij(ctx, 'nitriet', null, 1400, 258, ri, 'center');
      a7.pijl(ctx, 1432, 200, 1528, 200, rn, C.line, 1, 3, 12); e7Ion(ctx, 1560, 200, 16, 'nit', { a: rn }); }
  },
  s26(ctx, t, q) { // vraag-alinea: open bak naast een bak die luchtdicht dichtgaat
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx);
    const g1 = e7Bak(ctx, 720, 800, { lagen: [[E7.zand, 130]], mest: 26, label: 'open', opvang: 0.3 }), g2 = e7Bak(ctx, 1200, 800, { lagen: [[E7.zand, 130]], mest: 26, opvang: 0.3 });
    const d = q.on('luchtdicht', 1, 1); _7deksel(ctx, g2.x0, 240, lerp(g2.bodem - 300 - 200, g2.bodem - 300 - 14, d), _7R(t, q.at('luchtdicht') - 0.3, 0.3));
    naamBij(ctx, 'dicht', 'LUCHTDICHT', 1200, 352, _7R(t, q.at('luchtdicht') + 1, 0.5), 'center');
    vraagteken(ctx, 960, 300, q.on('weken'), 120);
  },
  s28(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 380, 800, { w: 200, lagen: [[E7.zand, 110]], mest: 24, label: 'open', opvang: 0.5 }); e7Bak(ctx, 1060, 800, { w: 200, lagen: [[E7.zand, 110]], mest: 24, dicht: true, label: 'dicht', meta: 'LUCHTDICHT', opvang: 0.5, a: _7R(t, 0, 0.6) });
    const mini = (gx, am, ni, fa, fn, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const gy = 760, gw = 300, gh = 260; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
      const P = (v) => v.map((y, i) => [gx + i * gw / 4, gy - y * gh]); _7lijn(ctx, _7deel(P(am), fa), E7.amm, 5); _7lijn(ctx, _7deel(P(ni), fn), E7.nit, 5); metaText(ctx, '4 WEKEN', gx + gw, gy + 36, C.text2, 'right', 26); ctx.restore(); };
    mini(560, [0, 0.85, 0.6, 0.3, 0.15], [0, 0.05, 0.35, 0.65, 0.85], 1, 1);
    mini(1240, [0, 0.4, 0.6, 0.75, 0.85], [0, 0, 0, 0.02, 0.02], q.on('stapelt', 1, 2.5), q.on('nitraat', 1, 2), _7R(t, q.at('dichte') - 0.3, 0.5));
    naamBij(ctx, 'ammonium', 'STAPELT OP', 1560, 500, q.on('stapelt', 1, 0.8), 'left', E7.amm); naamBij(ctx, 'nitraat', 'BLIJFT WEG', 1560, 740, q.on('nitraat'), 'left', _l7(E7.nit, 0.35));
    haak(ctx, 1240, 1540, 800, 'zonder zuurstof geen nitrificatie', C.koraal, q.on('stopt'));
  },
  s29(ctx, t, q) {
    ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
    e7Bacterie(ctx, 960, 470, 520, { rot: 0.03 * Math.sin(t * 0.8) });
    const om = q.on('omzetting', 1, 0.6), en = q.on('energie', 1, 0.6), ko = q.on('koolstof', 1, 0.6), or = q.on('organische', 1, 1), li = q.on('licht', 1, 0.6);
    a7.stroom(ctx, [[300, 430], [690, 470]], t, 5, (c, x, y) => e7Ion(c, x, y, 18, 'amm'), { snel: 0.16 }); pijl(ctx, 520, 460, 680, 470, E7.amm, 1, 5, 18);
    if (om > 0.01) { a7.stroom(ctx, [[1230, 470], [1640, 440]], t, 5, (c, x, y) => e7Ion(c, x, y, 18, 'nit'), { a: om, snel: 0.16, seed: 4 }); pijl(ctx, 1240, 470, 1400, 460, E7.nit, om, 5, 18); }
    if (en > 0.01) { pijl(ctx, 960, 200, 960, 360, C.goud, en, 6, 20); a7.stroom(ctx, [[960, 200], [960, 380]], t, 3, (c, x, y) => circ(c, x, y, 6, C.goud), { a: en, snel: 0.4 }); }
    naamBij(ctx, 'energie', 'UIT DE OMZETTING', 1000, 220, en, 'left', C.goud);
    if (ko > 0.01) { a7.stroom(ctx, [[620, 760], [880, 590]], t, 4, (c, x, y) => circ(c, x, y, 14, '#5E6675', '#8A92A0', 1.5), { a: ko, snel: 0.14, seed: 2 }); pijl(ctx, 790, 690, 870, 610, '#8A92A0', ko, 3, 12); }
    naamBij(ctx, 'koolstofdioxide', 'WORDT ORGANISCHE STOF', 620, 820, ko, 'center');
    if (or > 0.01) for (let i = 0; i < 9; i++) { const w = wander(i + 20, t, 10, 0.4); circ(ctx, 800 + hash(i * 3.3) * 320 + w.x, 440 + hash(i * 2.1) * 60 + w.y, 6, rgba(ECOK.organisch, or)); }
    if (li > 0.01) { ctx.save(); ctx.globalAlpha *= li; circ(ctx, 1560, 220, 40, null, C.goud, 3); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; ctx.beginPath(); ctx.moveTo(1560 + Math.cos(a) * 52, 220 + Math.sin(a) * 52); ctx.lineTo(1560 + Math.cos(a) * 70, 220 + Math.sin(a) * 70); ctx.stroke(); }
      const s = _7R(t, q.at('licht') + 0.4, 0.5); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1490, 290); ctx.lineTo(1490 + 140 * s, 290 - 140 * s); ctx.stroke(); ctx.restore(); naamBij(ctx, 'geen licht nodig', null, 1560, 340, li, 'center'); }
    naamBij(ctx, 'nitrificerende bacterie', 'CHEMO-AUTOTROOF', 960, 620, q.on('chemo'), 'center');
  },
  s30(ctx, t, q) {
    _sch7(ctx, 'VAN MEST TOT NITRAAT');
    const gx = 520, gy = 760, k = 5.5, st = q.on('stro', 1, 1.2), kl = q.on('klaver', 1, 1.2); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 760, gy); ctx.stroke(); metaText(ctx, 'KEER ZOVEEL KOOLSTOF ALS STIKSTOF (C/N)', gx, gy - 90 * k - 20, C.text2, 'left', 26);
    if (st > 0.01) { roundRect(ctx, gx + 80, gy - 80 * k * st, 220, Math.max(2, 80 * k * st - 2), 8); shape(ctx, _m7(C.oker, 0.25, C.bgSchema), _l7(C.oker, 0.3), 1.5); regel(ctx, 'stro ± 80', gx + 190, gy + 50, st, C.text, 40, 'center', 700); }
    if (kl > 0.01) { roundRect(ctx, gx + 460, gy - 17 * k * kl, 220, Math.max(2, 17 * k * kl - 2), 8); shape(ctx, _m7(C.groen, 0.25, C.bgSchema), _l7(C.groen, 0.3), 1.5); regel(ctx, 'klaver ± 17', gx + 570, gy + 50, kl, C.text, 40, 'center', 700); }
    card(ctx, 1380, 380, 440, 160, 'meer hierover', 'in de film Waar blijft het blad?', q.on('film'));
  },

  // ================= H3 Het lek naar de sloot =================
  s31(ctx, t, q) {
    _sch7(ctx, 'HET LEK NAAR DE SLOOT'); _tafel7(ctx);
    const gi = q.on('giet', 1, 0.6), ti = q.at('giet');
    [[760, E7.klei, 0.5, 1], [1160, E7.zand, 0.6, 4]].forEach(([x, kl, opv, seed]) => { const g = e7Bak(ctx, x, 800, { lagen: [[kl, 150]], mest: 24, label: x < 900 ? 'klei' : 'zand', meta: 'MET MEST', opvang: opv * _7R(t, ti + 1.5, 4), seed });
      if (gi > 0.01) { a7.regen(ctx, g.x0 + 20, g.x0 + 220, g.bodem - 280, g.top0 - 20, t, 9, { a: gi, seed }); const fr = _7R(t, ti, 3.5); ctx.fillStyle = rgba(E7.water, 0.25 * gi); ctx.fillRect(g.x0 + 3, g.top0 - 14, 234, (g.bodem - g.top0 + 14) * fr); }
      if (t > ti + 1.5) _7druip(ctx, x, 758, 790, t + seed, gi); });
    _bil(ctx, 330, 900, 450, { pose: 'vasthouden', t, a: _7P(t), hold: _gieter7 }); _yas(ctx, 1620, 900, 430, { kijk: -1, t, a: _7P(t) });
  },
  s32(ctx, t, q) { // vraag-alinea: kleibak, water loopt eruit, twee lege strips
    _sch7(ctx, 'HET LEK NAAR DE SLOOT'); _tafel7(ctx);
    const g = e7Bak(ctx, 760, 800, { lagen: [[E7.klei, 150]], mest: 24, label: 'klei', meta: 'MET MEST', opvang: 0.5 }); _7druip(ctx, 760, 758, 790, t);
    a7.regen(ctx, g.x0 + 20, g.x0 + 220, g.bodem - 280, g.top0 - 20, t, 7, { a: 0.8 });
    e7Strip(ctx, 1120, 760, 'amm', 0, { h: 260 }); e7Strip(ctx, 1290, 760, 'nit', 0, { h: 260 });
    vraagteken(ctx, 1205, 400, q.on('kleibak'), 110);
  },
  s34(ctx, t, q) {
    ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H);
    e7Strip(ctx, 120, 560, 'amm', 0, { h: 200 }); e7Strip(ctx, 300, 560, 'nit', 0.7 * q.on('nitraatstrip', 1, 1.2), { h: 200 });
    const ne = q.on('negatief', 1, 0.6), am = q.on('ammonium', 1, 1.6), ni = q.on('nitraat', 2, 0.6), af = q.on('afgestoten', 1, 0.6);
    e7Kleideeltje(ctx, 960, 470, 1100, 170);
    if (ne > 0.01) for (let i = 0; i < 7; i++) { const px = 960 - 550 + 60 + i * (1100 - 120) / 6, py = 470 - 170 * 0.45; a7.ring(ctx, px, py, 24, ne * (0.5 + 0.5 * Math.sin(t * 3 + i)), t); }
    for (let i = 0; i < 6; i++) { const tx = 560 + i * 160, ty = 300, sx = tx + (hash(i * 3) - 0.5) * 300, sy = 140 + hash(i * 5) * 60, u = _7R(t, q.at('ammonium') + i * 0.2, 1.4); e7Ion(ctx, lerp(sx, tx, u), lerp(sy, ty, u) + (u > 0.99 ? Math.sin(t * 2 + i) * 2 : 0), 22, 'amm', { a: Math.max(am, 0) }); }
    if (ni > 0.01) for (let i = 0; i < 4; i++) { const bx = 620 + i * 230, by = 600 + (i % 2) * 40; let y = by; if (af > 0.01) { const u = ((t - q.at('afgestoten')) * 0.35 + i * 0.25) % 1; y = by + u * 230; e7Ion(ctx, bx, y, 22, 'nit', { a: ni * Math.min(1, (1 - u) * 4) }); a7.druppel(ctx, bx + 40, y + 10, ni * Math.min(1, (1 - u) * 4)); } else e7Ion(ctx, bx, y, 22, 'nit', { a: ni }); }
    naamBij(ctx, 'ammonium', 'POSITIEF · BLIJFT HANGEN', 1560, 300, q.on('plakken'), 'left', E7.amm); naamBij(ctx, 'kleideeltje', 'NEGATIEF GELADEN', 1560, 470, ne, 'left'); naamBij(ctx, 'nitraat', 'NEGATIEF · SPOELT UIT', 1560, 690, ni, 'left', _l7(E7.nit, 0.35));
    naamBij(ctx, 'uitspoeling', null, 1560, 820, q.on('uitspoeling'), 'left');
    metaText(ctx, 'MODEL · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26);
  },
  s35(ctx, t, q) {
    _sch7(ctx, 'HET LEK NAAR DE SLOOT'); _tafel7(ctx, 820); const dk = 1 - 0.5 * _7R(t, 0, 1);
    e7Bak(ctx, 560, 820, { lagen: [[E7.klei, 150]], mest: 18, label: 'klei', opvang: 0.5, a: dk }); e7Bak(ctx, 1160, 820, { lagen: [[E7.zand, 150]], mest: 18, label: 'zand', opvang: 0.4 + 0.25 * _7R(t, 0, 4), seed: 4 }); _7druip(ctx, 1160, 778, 810, t);
    e7Strip(ctx, 740, 760, 'amm', 0, { h: 240, a: dk }); e7Strip(ctx, 900, 760, 'nit', 0.7, { h: 240, a: dk });
    e7Strip(ctx, 1360, 760, 'amm', 0.25 * q.on('ammoniumstrip', 1, 1.2), { h: 240 }); e7Strip(ctx, 1530, 760, 'nit', 0.95 * q.on('nitraatstrip', 1, 1.2), { h: 240 });
    const hu = q.on('humus', 1, 0.6); if (hu > 0.01) for (let i = 0; i < 5; i++) { const u = ((t - q.at('humus')) * 0.3 + i / 5) % 1; e7Ion(ctx, 1080 + i * 40, 540 + u * 180, 9, 'amm', { a: hu * Math.min(1, (1 - u) * 4) }); }
  },
  s36(ctx, t, q) {
    const kr = 0.25 + 0.75 * q.on('kroos', 1, 3); e7Doorsnede(ctx, { kroos: kr });
    const sp = q.on('spoelt', 1, 1), fo = q.on('fosfaat', 1, 1);
    for (let i = 0; i < 9; i++) { const x = 160 + i * 120; a7.stroom(ctx, [[x, 490], [x + 30, 620], [x + 60, 690], [1240, 680], [1330, 620]], t + i * 0.37, 2, (c, xx, yy) => e7Ion(c, xx, yy, 9, 'nit'), { a: sp, snel: 0.07, seed: i }); }
    for (let i = 0; i < 3; i++) { const x = 900 + i * 110; a7.stroom(ctx, [[x, 490], [x + 20, 600], [x + 50, 680], [1250, 670], [1320, 610]], t + i * 0.9, 2, (c, xx, yy) => e7Ion(c, xx, yy, 9, 'fos'), { a: fo, snel: 0.07, seed: 20 + i }); }
    naamBij(ctx, 'nitraat spoelt uit', 'MET HET REGENWATER', 640, 790, sp, 'center', _l7(E7.nit, 0.35)); naamBij(ctx, 'fosfaat', 'BIJ VEEL MEST', 1250, 760, fo, 'left', E7.fos);
    naamBij(ctx, 'kroos en algen', 'GROEIEN HARDER', 1490, 440, q.on('kroos'), 'center'); naamBij(ctx, 'eutrofiëring', null, 1490, 360, q.on('eutrofi'), 'center', C.goud);
  },
  s37(ctx, t, q) {
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
    const wi = q.on('winter', 1, 0.8), re = q.on('regen', 1, 0.8), dm = q.on('drijfmest');
    const paneel = (x, winter, naam, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.rect(x, 140, 820, 700); ctx.clip(); ctx.save(); ctx.translate(x, 140); ctx.scale(0.43, 0.75); ctx.translate(0, -120); e7Doorsnede(ctx, { kroos: 0, winter, slootX: 2400, gw: 820 }); ctx.restore();
        for (let i = 0; i < 6; i++) { const px = x + 80 + i * 120; if (winter) a7.stroom(ctx, [[px, 520], [px + 10, 720]], t + i * 0.3, 2, (c, xx, yy) => e7Ion(c, xx, yy, 8, 'nit'), { snel: 0.22, seed: i }); else a7.stroom(ctx, [[px + 10, 620], [px, 500]], t + i * 0.3, 2, (c, xx, yy) => e7Ion(c, xx, yy, 8, 'nit'), { snel: 0.18, seed: i }); }
        if (winter) a7.regen(ctx, x + 20, x + 800, 160, 470, t, 26, { a: re, seed: 7 });
        ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, 140, 820, 700); naamBij(ctx, naam, winter ? 'WEINIG OPNAME · VEEL REGEN' : 'WORTELS NEMEN OP', x + 410, 200, 1, 'center'); ctx.restore(); };
    paneel(110, false, 'zomer', 1 - 0.4 * wi); paneel(990, true, 'winter', Math.max(0.35, wi));
    naamBij(ctx, 'geen drijfmest', 'IN DE WINTER', 1400, 800, dm, 'center', C.koraal);
  },
  s38(ctx, t, q) {
    _sch7(ctx, 'HET LEK NAAR DE SLOOT');
    a7.balans(ctx, 360, 780, { k: 2.2, as: _7R(t, 0, 0.8), f: { kunst: q.on('kunstmest', 1, 0.9), mest: q.on('tachtig', 1, 0.9), lucht: q.on('twintig', 2, 0.9), oogst: q.on('honderdveertig', 1, 0.9) } });
    _ger(ctx, 1560, 900, 440, { kijk: -1, pose: q.on('stikstofbalans') > 0.5 ? 'wijs' : 'staan', t, a: _7P(t) });
  },
  s39(ctx, t, q) { // vraag-alinea: de balans, met de vraag wat er overblijft
    _sch7(ctx, 'HET LEK NAAR DE SLOOT');
    a7.balans(ctx, 560, 780, { k: 2.2 });
    const k = 2.2, x = 560, y = 780, hl = (id, v0, v) => { const a = q.on(id, 1, 0.4) * (1 - _7R(t, q.at(id) + 1.6, 0.5)); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x + 36, y - (v0 + v) * k - 4, 208, v * k + 4, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } };
    hl('kunstmest', 0, 120); hl('tachtig', 120, 80);
    vraagteken(ctx, x + 540, y - 185 * k, q.on('over'), 110);
  },
  s41(ctx, t, q) {
    _sch7(ctx, 'HET LEK NAAR DE SLOOT'); a7.balans(ctx, 360, 780, { k: 2.2, ov: q.on('tachtig', 1, 0.8) });
    const ox = 1000, oy = 780 - 180 * 2.2, A = [['ammoniak', [ox + 30, oy - 40], [ox + 300, oy - 160], E7.amm, 'amm', 'NAAR DE LUCHT', E7.amm], ['nitraat', [ox + 30, oy + 20], [ox + 300, oy + 60], E7.nit, 'nit', 'NAAR GRONDWATER EN SLOOT', _l7(E7.nit, 0.35)], ['stikstofgas', [ox + 30, oy + 70], [ox + 300, oy + 230], E7.n2, 'n2', 'DENITRIFICATIE', C.text]];
    A.forEach(([w, p1, p2, kl, soort, meta, lk], i) => { const a = q.on(w, 1, 0.8); if (a <= 0.01) return; a7.pijl(ctx, p1[0], p1[1], p2[0], p2[1], a, kl, 1, 4, 16);
      a7.stroom(ctx, [p1, p2], t + i, 3, (c, x, y, k) => soort === 'n2' ? e7N2(c, x, y, 10, { rot: k }) : e7Ion(c, x, y, 9, soort), { a, snel: 0.3, seed: i * 5 });
      naamBij(ctx, w, meta, ox + 320, (i === 0 ? oy - 170 : i === 1 ? oy + 60 : oy + 240), a, 'left', lk); });
  },
  s42(ctx, t, q) {
    _sch7(ctx, 'HET LEK NAAR DE SLOOT');
    const kn = [[560, 260, 'fosfaat in de bodem'], [1060, 260, 'plant'], [1360, 560, 'dier'], [1060, 820, 'mest, dood'], [560, 820, 'sloot']];
    const tr = q.at('rond'), knA = [_7R(t, 0, 0.6), q.on('plant', 1, 0.6), _7R(t, tr + 0.3, 0.6), _7R(t, tr + 0.9, 0.6), q.on('sloot', 1, 0.6)];
    const rij = [[0, 1, q.on('plant', 1, 0.8)], [1, 2, _7R(t, tr, 0.8)], [2, 3, _7R(t, tr + 0.6, 0.8)], [3, 0, _7R(t, tr + 1.2, 0.8)], [0, 4, q.on('sloot', 1, 0.8)]];
    const seg = (a, b) => { const A = kn[a], B = kn[b]; const d = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d; return [A[0] + ux * 160, A[1] + uy * 60, B[0] - ux * 160, B[1] - uy * 60]; };
    for (const [a, b, u] of rij) { const [x1, y1, x2, y2] = seg(a, b); a7.pijl(ctx, x1, y1, x2, y2, u, a === 0 && b === 4 ? C.line : E7.fos, 1, a === 0 && b === 4 ? 3 : 5, 18); }
    const ro = _7R(t, tr + 1.8, 0.8); if (ro > 0.01) { const route = [0, 1, 2, 3].map(i => seg(i, (i + 1) % 4)).flatMap(s => [[s[0], s[1]], [s[2], s[3]]]); a7.stroom(ctx, route, t, 4, (c, x, y) => e7Ion(c, x, y, 10, 'fos'), { a: ro, snel: 0.06 }); }
    kn.forEach(([x, y, n], i) => { if (knA[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= knA[i]; roundRect(ctx, x - 150, y - 44, 300, 88, 44); shape(ctx, _m7(E7.fos, 0.75, C.bgSchema), E7.fos, 2); text(ctx, n, x, y + 12, fTekst(36, 600), C.text, 'center'); ctx.restore(); });
    naamBij(ctx, 'langzaam, bij veel mest', null, 400, 560, q.on('langzaam'), 'center');
    const ga = q.on('gasvorm', 1, 0.6); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga; roundRect(ctx, 1460, 140, 360, 160, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, 'lucht', 1640, 210, fTekst(40, 700), C.text2, 'center'); const s = _7R(t, q.at('gasvorm') + 0.4, 0.5); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1490, 280); ctx.lineTo(1490 + 300 * s, 280 - 120 * s); ctx.stroke(); ctx.restore(); naamBij(ctx, 'geen gasvorm', null, 1640, 350, ga, 'center'); }
    naamBij(ctx, 'vaak beperkend', 'VOOR ALGEN IN ZOET WATER', 390, 815, q.on('beperkt'), 'right', E7.fos);
  },

  // ================= H4 Zonder zuurstof =================
  s43(ctx, t, q) {
    _sch7(ctx, 'ZONDER ZUURSTOF'); _tafel7(ctx);
    const kr = q.on('kraantje', 1, 0.5), wa = q.on('water', 1, 3), tw = q.at('water'), tl = q.at('lucht');
    const g = e7Bak(ctx, 960, 800, { lagen: [[E7.zand, 150]], mest: 22, water: 80 * wa, label: 'zandbak', meta: 'ONDER WATER', opvang: 0.3 * (1 - kr), kraanOpen: kr < 0.5, ionen: _ionenRegen('nit', 12, 7) });
    if (t > tw && t < tl + 2) for (let i = 0; i < 14; i++) { const u = ((t - tw) * 0.5 + hash(i * 3.7)) % 1, ti0 = t - u / 0.5; if (ti0 > tl + 0.5) continue; const top = g.top0 - 80 * wa; circ(ctx, g.x0 + 30 + hash(i * 5.1) * 180, lerp(g.bodem - 20, top, u), 4 + hash(i) * 3, rgba('#DCE8F2', 0.7 * (1 - u)), rgba('#FFFFFF', 0.6 * (1 - u)), 1); }
    a7.ring(ctx, 960, 740, 26, kr * (1 - _7R(t, q.at('kraantje') + 2.5, 0.6)), t); naamBij(ctx, 'kraantje dicht', null, 960, 880, kr, 'center');
    _yas(ctx, 560, 900, 430, { pose: 'vasthouden', t, a: _7P(t), hold: (c, x, y) => { _gieter7(c, x, y); if (wa > 0.01 && wa < 1) a7.regen(c, x + 104, x + 118, y - 34, 560, t, 6, { snel: 1.6 }); } });
    e7Klok(ctx, 1460, 260, 3 * q.on('weken', 1, 2.5));
    const lu = q.on('tussen', 1, 0.6); if (lu > 0.01) { zoomCircle(ctx, 1460, 600, 140 * (0.4 + 0.6 * lu), 1040, 640, 'GEEN LUCHT TUSSEN DE KORRELS', lu, () => { ctx.fillStyle = rgba(E7.water, 0.6); ctx.fillRect(1300, 440, 320, 320); for (let i = 0; i < 9; i++) circ(ctx, 1360 + (i % 3) * 100 + hash(i) * 20, 510 + Math.floor(i / 3) * 90 + hash(i * 3) * 20, 40, E7.zand, E7.zandD, 2); }); }
  },
  s44(ctx, t, q) { // vraag-alinea: de ondergelopen zandbak met nitraat
    _sch7(ctx, 'ZONDER ZUURSTOF'); _tafel7(ctx);
    e7Bak(ctx, 860, 800, { lagen: [[E7.zand, 150]], mest: 22, water: 80, label: 'onder water', opvang: 0, kraanOpen: false, ionen: (c, x0, top0, w, bodem) => { for (let i = 0; i < 12; i++) { const ww = wander(i, t, 4, 0.5); e7Ion(c, x0 + 20 + hash(7 + i * 1.3) * (w - 40) + ww.x, top0 + (0.1 + hash(7 + i * 2.1) * 0.8) * (bodem - top0) + ww.y, 9, 'nit'); } } });
    naamBij(ctx, 'nitraat', null, 1020, 640, q.on('nitraat'), 'left', _l7(E7.nit, 0.35)); e7Klok(ctx, 1360, 260, 3);
    vraagteken(ctx, 1360, 560, q.on('water'), 110);
  },
  s46(ctx, t, q) {
    _sch7(ctx, 'ZONDER ZUURSTOF'); _tafel7(ctx); e7Bak(ctx, 480, 800, { lagen: [[E7.zand, 150]], mest: 22, water: 80, label: 'na 3 weken', opvang: 0.4 }); e7Klok(ctx, 480, 200, 3);
    e7Strip(ctx, 740, 760, 'nit', 0.05); a7.ring(ctx, 740, 490, 40, q.on('nitraatstrip') * (1 - _7R(t, q.at('nitraatstrip') + 2.5, 0.6)), t);
    const z = q.on('bacteriën', 1, 0.9), ng = q.on('stikstofgas', 1, 0.6), tz = q.at('bacteriën');
    zoomCircle(ctx, 1360, 470, 300 * (0.3 + 0.7 * z), 500, 560, 'NATTE GROND · VERGROOT', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1040, 120, 640, 640); ctx.fillStyle = rgba(E7.water, 0.25); ctx.fillRect(1040, 120, 640, 640);
      for (let i = 0; i < 9; i++) circ(ctx, 1100 + hash(i * 3) * 520, 200 + hash(i * 7) * 480, 40 + hash(i) * 20, '#7A6448', '#A08A6A', 1.5);
      e7Bacterie(ctx, 1320, 470, 170, { rot: 0.2 + 0.06 * Math.sin(t * 1.2) });
      a7.stroom(ctx, [[1120, 600], [1240, 520]], t, 3, (c, x, y) => e7Ion(c, x, y, 14, 'nit'), { a: _7R(t, tz + 0.6, 0.6), snel: 0.25 });
      a7.stroom(ctx, [[1400, 420], [1460, 300], [1500, 160]], t, 4, (c, x, y, k) => e7N2(c, x, y, 16, { rot: k + t }), { a: ng, snel: 0.2, seed: 3 }); });
    naamBij(ctx, 'denitrificatie', 'NITRAAT WORDT STIKSTOFGAS', 1360, 90, q.on('denitrificatie'), 'center');
    const an = q.on('anaeroob'); if (an > 0.01) metaText(ctx, 'ANAEROOB · ZONDER ZUURSTOF', 1360, 856, rgba(C.goud, an), 'center', 26);
  },
  s47(ctx, t, q) {
    e7Doorsnede(ctx, { kroos: 0.3, gw: 700 }); const na = q.on('natte', 1, 1), ng = q.on('stikstofgas', 1, 0.8);
    ctx.fillStyle = rgba('#1A2224', 0.45 * na); ctx.fillRect(0, 590, W, 110);
    for (let i = 0; i < 18; i++) { const x = 160 + i * 95; if (x > 1280 && x < 1700) continue; a7.stroom(ctx, [[x, 470], [x + 10, 600]], t + i * 0.4, 1, (c, xx, yy) => e7Ion(c, xx, yy, 7, 'nit'), { a: na * (1 - 0.6 * ng), snel: 0.15, seed: i }); }
    for (let i = 0; i < 12; i++) { const x = 60 + hash(i * 2.3) * 1800, y0 = 600 + hash(i * 4.1) * 90, u = (t * 0.18 + hash(i * 7.7)) % 1, yt = (x > 1280 && x < 1700) ? 520 : 470; circ(ctx, x + Math.sin(t * 2 + i) * 4, lerp(y0, yt - 60, u), 6, rgba(E7.n2, 0.9 * ng * Math.min(1, (1 - u) * 3)), rgba(_l7(E7.n2, 0.3), ng * Math.min(1, (1 - u) * 3)), 1); }
    for (let i = 0; i < 4; i++) pijl(ctx, 260 + i * 300, 590, 260 + i * 300, 420, E7.n2, 0.8 * ng, 3, 12); pijl(ctx, 1490, 610, 1490, 420, E7.n2, 0.8 * ng, 3, 12);
    naamBij(ctx, 'stikstofgas', 'UIT DE NATTE LAAG', 1500, 380, ng, 'center'); naamBij(ctx, 'weinig zuurstof', 'NATTE GROND · SLOOTBODEM', 700, 790, na, 'center');
  },
  s48(ctx, t, q) {
    _sch7(ctx, 'ZONDER ZUURSTOF');
    const L = { binding: q.on('binden'), opname: q.on('planten'), eten: q.on('dieren'), dood: q.on('afbrekers'), ammonificatie: q.on('afbrekers'), nitrificatie: q.on('nitraat'), denitrificatie: q.on('zonder') };
    a7.kringloop(ctx, { L, zuur: q.on('let') });
    for (let k = 0; k < 3; k++) { const [x, y] = a7.kringPunt(t * 0.035 + k / 3); circ(ctx, x, y, 9, E7.nit, _l7(E7.nit, 0.4), 2); }
  },

  // ================= H5 Van wc tot kraan =================
  s49(ctx, t, q) {
    _sch7(ctx, 'VAN WC TOT KRAAN'); ctx.fillStyle = '#2E3A52'; ctx.fillRect(120, 220, 560, 600); e7Toilet(ctx, 420, 820, 1.2); _bil(ctx, 230, 820, 400, { pose: q.on('doortrekt') > 0.5 ? 'wijs' : 'staan', outfit: 'school', t, a: _7P(t) });
    const pad = [[420, 830], [420, 868], [1500, 868], [1500, 820]]; ctx.strokeStyle = C.line; ctx.lineWidth = 16; ctx.lineJoin = 'round'; ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    const dt = q.on('doortrekt', 1, 0.6); if (dt > 0.01) a7.stroom(ctx, pad, t, 10, (c, x, y) => circ(c, x, y, 5, rgba('#9CCBE3', 0.9)), { a: dt, snel: 0.12 });
    const rw = q.on('rioolwaterzuivering', 1, 0.8); if (rw > 0.01) { ctx.save(); ctx.globalAlpha *= rw; ctx.translate(1200, 640); ctx.scale(0.42, 0.42); e7Rwzi(ctx, 0, 400, { labels: false, t }); ctx.restore(); }
    naamBij(ctx, 'riool', null, 960, 846, q.on('riool'), 'center'); naamBij(ctx, 'rioolwaterzuivering', null, 1580, 500, rw, 'center');
  },
  s50(ctx, t, q) {
    _sch7(ctx, 'VAN WC TOT KRAAN');
    const f = ['x']; if (q.on('grove') > 0.5) f.push('rooster'); if (q.on('zand') > 0.5) f.push('bezink'); if (q.on('lucht') > 0.5) f.push('lucht');
    e7Rwzi(ctx, 220, 640, { focus: f, t });
    for (const [x1, x2] of [[370, 430], [660, 720], [1080, 1140], [1440, 1500]]) a7.stroom(ctx, [[x1, 490], [x2 - 10, 490]], t, 2, (c, x, y) => circ(c, x, y, 4, rgba('#9CCBE3', 0.9)), { snel: 0.5 });
    const ni = q.on('ammonium', 1, 0.6), tn = q.at('ammonium');
    if (ni > 0.01) for (let i = 0; i < 6; i++) { const u = ((t - tn) * 0.25 + i / 6) % 1, x = lerp(780, 1060, u), y = 500 + Math.sin(u * 6 + i) * 30 + (i % 3) * 16; e7Ion(ctx, x, y, 14, u < 0.5 ? 'amm' : 'nit', { a: ni * Math.min(1, u * 6, (1 - u) * 6) }); }
    naamBij(ctx, 'ammonium wordt nitraat', 'NITRIFICATIE', 900, 260, q.on('nitrificerende'), 'center');
  },
  s51(ctx, t, q) {
    _sch7(ctx, 'VAN WC TOT KRAAN');
    const zl = q.on('zonder') > 0.5, ds = q.on('dezelfde', 1, 0.4) * (1 - _7R(t, q.at('fosfaat') - 0.3, 0.4));
    e7Rwzi(ctx, 220, 640, { focus: zl ? (ds > 0.5 ? ['lucht', 'anox'] : ['anox']) : ['lucht'], t });
    a7.stroom(ctx, [[1080, 490], [1130, 490]], t, 2, (c, x, y) => circ(c, x, y, 4, rgba('#9CCBE3', 0.9)), { snel: 0.5 });
    const ng = q.on('stikstofgas', 1, 0.6);
    for (let i = 0; i < 3; i++) { const w = wander(i, t, 5, 0.6); e7Ion(ctx, 1210 + i * 50 + w.x, 520 + w.y, 13, 'nit', { a: _7R(t, q.at('zonder'), 0.6) }); }
    if (ng > 0.01) { a7.stroom(ctx, [[1260, 470], [1290, 330], [1320, 220]], t, 5, (c, x, y, k) => e7N2(c, x, y, 15, { rot: k + t }), { a: ng, snel: 0.2 }); pijl(ctx, 1290, 480, 1300, 360, E7.n2, ng, 3, 12); }
    naamBij(ctx, 'nitraat wordt stikstofgas', 'DENITRIFICATIE', 1560, 260, ng, 'left');
    const fo = q.on('fosfaat', 1, 0.8); a7.pijl(ctx, 1240, 560, 1150, 620, fo, E7.fos, 1, 5, 16); naamBij(ctx, 'fosfaat eruit', 'NAAR HET SLIB', 1290, 820, fo, 'center', E7.fos);
  },
  s52(ctx, t, q) {
    ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
    e7Anammox(ctx, 960, 480, 200 * (1 + 0.015 * Math.sin(t * 1.5)));
    const am = q.on('ammonium', 1, 0.6), ni = q.on('nitriet', 1, 0.6), ng = q.on('stikstofgas', 1, 0.6);
    a7.stroom(ctx, [[360, 400], [600, 420], [760, 460]], t, 4, (c, x, y) => e7Ion(c, x, y, 20, 'amm'), { a: am, snel: 0.13 }); pijl(ctx, 600, 420, 740, 460, E7.amm, am, 5, 18);
    a7.stroom(ctx, [[360, 560], [600, 560], [760, 510]], t, 4, (c, x, y) => { circ(c, x, y, 20, '#A8C4E4', '#D0E0F2', 1.5); c.strokeStyle = _d7('#A8C4E4', 0.6); c.lineWidth = 3; c.beginPath(); c.moveTo(x - 9, y); c.lineTo(x + 9, y); c.stroke(); }, { a: ni, snel: 0.13, seed: 5 }); pijl(ctx, 600, 560, 740, 510, C.line, ni, 5, 18);
    if (ng > 0.01) { a7.stroom(ctx, [[1170, 480], [1600, 470]], t, 5, (c, x, y, k) => e7N2(c, x, y + (k % 2) * 30 - 15, 22, { rot: k + t * 0.5 }), { a: ng, snel: 0.14, seed: 2 }); pijl(ctx, 1180, 480, 1290, 480, E7.n2, ng, 5, 18); }
    naamBij(ctx, 'ammonium', null, 480, 340, am, 'center', E7.amm); naamBij(ctx, 'nitriet', null, 480, 640, ni, 'center'); naamBij(ctx, 'stikstofgas', 'ZONDER ZUURSTOF', 1420, 600, ng, 'center'); naamBij(ctx, 'anammoxbacterie', null, 960, 760, q.on('anammox'), 'center');
    naamBij(ctx, 'deammonificatie', null, 960, 200, q.on('deammonificatie'), 'center'); const rd = q.on('2002'); if (rd > 0.01) metaText(ctx, 'ROTTERDAM · 2002', 960, 830, rgba(C.text2, rd), 'center', 26);
  },
  s53(ctx, t, q) { // vraag-alinea: water uit de laatste tank, en een kraan verderop
    _sch7(ctx, 'VAN WC TOT KRAAN');
    ctx.save(); ctx.translate(80, 220); ctx.scale(0.75, 0.75); e7Rwzi(ctx, 0, 600, { focus: ['na'], t, labels: false }); ctx.restore();
    const py = 220 + 450 * 0.75; ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1212, py); ctx.lineTo(1420, py); ctx.stroke();
    a7.stroom(ctx, [[1215, py], [1420, py], [1440, py + 120]], t, 6, (c, x, y) => circ(c, x, y, 5, rgba('#9CCBE3', 0.9)), { snel: 0.3, a: q.on('gezuiverde', 1, 0.6) });
    naamBij(ctx, 'gezuiverd water', null, 1300, py - 30, q.on('gezuiverde'), 'center');
    e7Kraan(ctx, 1700, 640, 1.1); vraagteken(ctx, 1560, 360, q.on('kraan'), 110);
  },
  s55(ctx, t, q) {
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
    const keys = [[0, 260, 640, 1.9], [q.at('maas'), 560, 690, 1.9], [q.at('drinkwaterbedrijf'), 1060, 600, 1.7], [q.at('biesbosch'), 1290, 520, 1.7], [q.at('gezuiverd', 2), 1680, 560, 1.7], [q.at('zestig'), 960, 540, 1]];
    let cam = keys[0].slice(1); for (let i = 1; i < keys.length; i++) { if (!isFinite(keys[i][0])) continue; const u = _7R(t, keys[i][0] - 0.4, 1.8); cam = cam.map((v, j) => lerp(v, keys[i][j + 1], u)); }
    const _nb = naamBij, sy = (y) => (y - cam[1]) * cam[2] + H / 2, sx = (x) => (x - cam[0]) * cam[2] + W / 2, nb = (c, n, m, x, y, a, al, kl) => _nb(c, n, m, x, y, a * clamp((850 - sy(y + (m ? 28 : 0))) / 40, 0, 1) * clamp((sy(y) - 60) / 40, 0, 1) * clamp((sx(x) - 160) / 60, 0, 1) * clamp((W - 160 - sx(x)) / 60, 0, 1), al, kl);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(cam[2], cam[2]); ctx.translate(-cam[0], -cam[1]);
    ctx.fillStyle = C.bgMacroSky; ctx.fillRect(-400, -400, W + 800, H + 800);
    vul(ctx, [[-400, 520], [500, 500], [1000, 530], [1500, 510], [2300, 520], [2300, H + 400], [-400, H + 400]], C.bgMacroHill);
    const rivier = [[-400, 730], [-40, 720], [300, 690], [700, 740], [1100, 700], [1500, 740], [1960, 710], [2300, 715]]; lijn(ctx, rivier, C.water, 80);
    a7.stroom(ctx, rivier, t, 30, (c, x, y, k) => circ(c, x, y + (hash(k) - 0.5) * 50, 3, rgba('#9CCBE3', 0.7)), { snel: 0.03 });
    ctx.save(); ctx.translate(40, 520); ctx.scale(0.24, 0.24); e7Rwzi(ctx, 0, 300, { labels: false, t }); ctx.restore(); nb(ctx, 'zuivering', null, 210, 640, 1, 'center');
    pijl(ctx, 300, 640, 360, 690, C.line, 1, 3, 12); a7.stroom(ctx, [[300, 640], [360, 690]], t, 2, (c, x, y) => circ(c, x, y, 4, '#9CCBE3'), { snel: 0.5 });
    nb(ctx, 'de Maas', null, 760, 820, q.on('maas'), 'center');
    const bk = q.on('bekkens', 1, 0.8); for (let i = 0; i < 2; i++) { roundRect(ctx, 1080 + i * 230, 420, 200, 90, 30); shape(ctx, _m7(C.water, 0.3, C.bgMacroSky), C.teal, 2); } nb(ctx, 'bekkens', 'BIESBOSCH', 1290, 400, 1, 'center');
    const op = q.on('pompt', 1, 0.6); pijl(ctx, 1060, 690, 1110, 520, C.teal, 1, 4, 14); a7.stroom(ctx, [[1060, 690], [1110, 520]], t, 3, (c, x, y) => circ(c, x, y, 4, '#9CCBE3'), { snel: 0.4, a: op }); nb(ctx, 'inname', null, 1010, 620, op, 'right');
    ctx.fillStyle = '#5E6A80'; ctx.fillRect(1600, 380, 180, 120); nb(ctx, 'drinkwaterbedrijf', null, 1690, 360, q.on('drinkwaterbedrijf'), 'center'); pijl(ctx, 1540, 460, 1590, 460, C.teal, 1, 4, 14);
    const gz = q.on('gezuiverd', 2, 0.6); a7.stroom(ctx, [[1510, 460], [1590, 460]], t, 2, (c, x, y) => circ(c, x, y, 4, '#9CCBE3'), { snel: 0.5, a: gz });
    e7Kraan(ctx, 1640, 680, 0.8); e7Glas(ctx, 1760, 700, 110, 0.15 + 0.45 * gz); if (gz > 0.01 && gz < 1) a7.regen(ctx, 1714, 1720, 612, 690, t, 3, { snel: 1.8 });
    ctx.restore();
    const ze = q.on('zestig', 1, 0.6); card(ctx, 160, 160, 620, 150, '± 60 % grondwater', 'de rest vooral uit rivieren', _7R(t, q.at('zestig') + 1, 0.6)); if (ze > 0.5) metaText(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26);
  },
  s56(ctx, t, q) {
    _sch7(ctx, 'VAN WC TOT KRAAN'); e7Glas(ctx, 640, 760, 380, 0.75); e7Strip(ctx, 900, 760, 'nit', 0.2 * q.on('nitraat', 1, 1.2), { h: 320 });
    const lx = 1200, ly0 = 780, lh = 520; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly0); ctx.lineTo(lx, ly0 - lh); ctx.stroke();
    for (let v = 0; v <= 100; v += 25) { const y = ly0 - v / 100 * lh; ctx.beginPath(); ctx.moveTo(lx - 10, y); ctx.lineTo(lx, y); ctx.stroke(); metaText(ctx, String(v), lx - 20, y + 9, C.text2, 'right', 26); }
    metaText(ctx, 'NITRAAT IN MG PER LITER', lx, ly0 - lh - 24, C.text2, 'left', 26);
    const zg = q.on('zandgrond', 1, 1.6); if (zg > 0.01) { const hv = 62 * zg / 100 * lh; roundRect(ctx, 1640, ly0 - hv, 60, Math.max(2, hv), 6); shape(ctx, _m7(E7.nit, 0.25, C.bgSchema), _l7(E7.nit, 0.3), 1.5); naamBij(ctx, 'droge zandgrond', 'SOMS BOVEN DE GRENS', 1670, ly0 - 0.62 * lh - 60, q.on('zandgrond'), 'center'); }
    const gr = q.on('vijftig', 1, 0.8), yg = ly0 - 0.5 * lh; if (gr > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lx, yg); ctx.lineTo(lx + 520 * gr, yg); ctx.stroke(); } naamBij(ctx, 'grens 50 mg per liter', 'GRONDWATER', lx + 20, yg - 58, gr, 'left', C.koraal);
  },

  // ================= Samenvatting =================
  s57(ctx, t, q) {
    _sch7(ctx, 'SAMENVATTING');
    const dy = 20, km = q.on('kunstmest'), pl = q.on('plakt'), sp = q.on('spoelt', 1, 0.8), fo = q.on('fosfaat'), al = q.on('algen', 1, 2), kl = q.on('klaver'), to = q.on('toiletwater');
    a7.kringloop(ctx, { dy, L: { ammonificatie: km, binding: kl, nitrificatie: to, denitrificatie: to }, zuur: to });
    a7.ring(ctx, 420, 640 + dy, 150, pl * (1 - _7R(t, q.at('plakt') + 2.5, 0.6)), t);
    if (km > 0.01) { const tk = q.at('kunstmest'); for (let i = 0; i < 4; i++) { const u = _7R(t, tk + i * 0.3, 1.4); e7Ion(ctx, lerp(380 + i * 30, 400 + i * 14, u), lerp(420, 640 + dy - 10, u), 9, 'nit', { a: u > 0.98 ? 1 - _7R(t, tk + 3, 0.6) : km }); } }
    a7.slootje(ctx, 1030, 440 + dy, 300, 170, 0.25 + 0.75 * al, q.on('terug', 1, 0.6));
    a7.pijl(ctx, 1040, 300 + dy, 1130, 432 + dy, sp, E7.nit, 1, 4, 14);
    a7.stroom(ctx, [[1040, 300 + dy], [1130, 470 + dy], [1180, 520 + dy]], t, 3, (c, x, y) => e7Ion(c, x, y, 8, 'nit'), { a: sp, snel: 0.2 });
    a7.stroom(ctx, [[1010, 300 + dy], [1100, 470 + dy], [1160, 520 + dy]], t + 1, 2, (c, x, y) => e7Ion(c, x, y, 8, 'fos'), { a: fo, snel: 0.2, seed: 6 });
  },
  s58(ctx, t, q) { // de stikstof gaat rond, de energie stroomt erdoorheen
    _sch7(ctx, 'SAMENVATTING');
    const s = 0.8, dx = 196, dy = 150, ro = q.on('rond', 1, 0.8), en = q.on('energie', 1, 1.2), wa = q.on('erdoorheen', 1, 0.8);
    ctx.save(); ctx.translate(dx, dy); ctx.scale(s, s); a7.kringloop(ctx, { L: { binding: ro, opname: ro, eten: ro, dood: ro, ammonificatie: ro, nitrificatie: ro, denitrificatie: ro } });
    for (let k = 0; k < 6; k++) { const [x, y] = a7.kringPunt(t * 0.05 + k / 6); circ(ctx, x, y, 11, rgba(E7.nit, ro), rgba(_l7(E7.nit, 0.4), ro), 2); }
    ctx.restore();
    const y = 205; if (en > 0.01) { a7.pijl(ctx, 260, y, 1800, y, en, C.goud, 1, 6, 22); if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; pijl(ctx, 1500, y, 1800, y, C.koraal, 1, 6, 22); ctx.restore(); }
      a7.stroom(ctx, [[270, y], [1790, y]], t, 9, (c, x, yy) => circ(c, x, yy, 7, x > 1500 ? _m7(C.goud, clamp((x - 1500) / 200, 0, 1) * wa, C.koraal) : C.goud), { a: en, snel: 0.12 }); }
    naamBij(ctx, 'energie', null, 90, y + 12, en, 'left', C.goud); naamBij(ctx, 'warmte', null, 1800, y - 30, wa, 'right', C.koraal);
  },
});
