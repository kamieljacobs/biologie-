// Film 8 · Stambomen lezen — geanimeerde scènes (keyframes uit sb8.js als eindbeeld, opgebouwd in de maat van de stem).
// Elke scène tekent eerst haar eigen achtergrond. Dieren in een boom staan in losse tegels (geen maatvergelijking); dieren samen in één beeld op echte onderlinge maat.

// H1: tegels boven de bladeren van een layout
const _tegels = (ctx, B, a = 1, o = {}) => { for (const n in B.L) { const p = B.L[n]; const r = (o.rand && o.rand[n]) || 0, d = (o.dim && o.dim[n]) ?? 1;
  E8.tegel(ctx, n, p.x, p.y - 12, a * d, { w: o.w || E8.TW, h: o.h || E8.TH, rand: r, randKleur: (o.randKleur && o.randKleur[n]) || C.goud, label: o.label ?? true }); } };
// H2: boom met drie tegels (wortel R, knoop K)
const _boom2 = (ctx, namen, o = {}) => { const { g = 1, a = 1, tegelA = [1, 1, 1], rand = [0, 0, 0], kleur0 = C.line, knoopK = C.line, meta = [null, null, null] } = o; const R = E8.R, K = E8.K;
  const L = E8.BX.map(x => [x, E8.BY]);
  E8.tak(ctx, L[0], R, g, { kleur: kleur0, a }); E8.tak(ctx, L[1], K, ramp(g, 0, 0.6), { a }); E8.tak(ctx, L[2], K, ramp(g, 0, 0.6), { a }); E8.tak(ctx, K, R, ramp(g, 0.6, 0.4), { a });
  E8.tak(ctx, R, E8.STOMP, ramp(g, 0.9, 0.1), { a }); E8.knoop(ctx, K, a * ramp(g, 0.55, 0.2), knoopK, knoopK === C.line ? 9 : 12); E8.knoop(ctx, R, a * ramp(g, 0.9, 0.1));
  namen.forEach((n, i) => E8.tegel(ctx, n, E8.BX[i], E8.BY - 12, tegelA[i], { rand: rand[i], meta: meta[i] })); };
const _rk = (u) => [lerp(E8.R[0], E8.K[0], u), lerp(E8.R[1], E8.K[1], u)];
// H2 rivieroever (Macro) op echte maat: krokodil 4 m, reiger ±1 m, zandhagedis 20 cm (1,5 px per cm); de hagedis ook 7× vergroot in een zoomcirkel
const _oever = (ctx, t, o = {}) => { const { lab = {}, vogelX = 1560, vogelH = 'staan', vogelT = 0, hagX = 1000, hagH = 'staan', hagT = 0, zoomA = 1 } = o;
  macroNacht(ctx, { horizon: 600 }); ctx.fillStyle = C.water; ctx.fillRect(0, 760, W, 140);
  ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = _lt(C.water, 0.35); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const x = E8.fr(hash(i) + t * 0.02) * W, y = 790 + hash(i + 4) * 90; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50 + hash(i + 2) * 60, y); ctx.stroke(); } ctx.restore();
  krokodil(ctx, 440, 780, 0.9, { houding: 'liggen' });
  hagedis(ctx, hagX, 752, 0.06, { houding: hagH, t: hagT });
  vogel(ctx, vogelX, 820, 0.34, { houding: vogelH, t: vogelT, kijk: -1 }); ctx.fillStyle = rgba(C.water, 0.6); ctx.fillRect(vogelX - 110, 786, 220, 114);
  const zx = 1040, zy = 420, zr = 160;
  zoomCircle(ctx, zx, zy, zr, hagX + 2, 748, '7× vergroot', zoomA, () => { ctx.fillStyle = '#2F4A3A'; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(zx - zr, zy + 54, 2 * zr, zr);
    for (let i = 0; i < 9; i++) { const x = zx - zr - 40 + E8.fr(i / 9 - (hagX - 1000) * 7 / 400) * (2 * zr + 80); circ(ctx, x, zy + 70 + (i % 3) * 22, 5 + (i % 4) * 2, '#4E6A52'); }
    hagedis(ctx, zx + 20, zy + 54, 0.42, { houding: hagH, t: hagT }); });
  if (lab.krok) naamBij(ctx, 'krokodil', lab.krokM || null, 440, 640, lab.krok, 'center', lab.krokK || C.text);
  if (lab.hag) naamBij(ctx, 'hagedis', lab.hagM || null, zx, zy - zr - 50, lab.hag, 'center');
  if (lab.vog) naamBij(ctx, 'vogel', lab.vogM || null, vogelX, 600, lab.vog, 'center');
  evoSchaal(ctx, 'op schaal · cirkel 7× vergroot'); };
// H3: ichthyosaurus iets langer (±3 m) dan haai (±2,2 m) en dolfijn (±2,6 m)
const ZW = { ichthyosaurus: 1.12 };
// H4: leeuw, tijger en huiskat op dezelfde px per cm (leeuw-schaal sl)
const _katS = (sl) => ({ l: sl, t: sl * 0.97, k: sl * 0.23, px: sl * 1.833 });
// huiskat op schaal plus een kleine vergrootcirkel (dier zit op (x, y) met schaal k)
const _katZoom = (ctx, x, y, k, cx, cy, r, a, cap) => { if (a <= 0.01) return; huiskat(ctx, x, y, k, { houding: 'zitten', a }); const f = 4, kz = k * f;
  zoomCircle(ctx, cx, cy, r, x + 4, y - 160 * k, cap, a, () => { ctx.fillStyle = rgba(C.fill, 0.9); ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); huiskat(ctx, cx - 16 * kz, cy + 175 * kz, kz, { houding: 'zitten' }); }); };

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (dolfijn en haai zwemmen rustig)
  title(ctx, t) { dolfijn(ctx, 1420 + 14 * Math.sin(t * 0.4), 520 + 8 * Math.sin(t * 0.6), 0.8, { t }); haai(ctx, 1420 + 14 * Math.sin(t * 0.4 + 2), 760 + 8 * Math.sin(t * 0.5 + 1), 0.8, { t: t + 0.4 }); },

  // ---------------- Opening
  s01(ctx, t, q) { E8.blauw(ctx); E8.bellen(ctx, t); const far = q.on('afstand', 1, 1.4);
    const s = lerp(1.3, 0.8, far), dx = 640 + 30 * Math.sin(t * 0.35), hx = 1280 + 30 * Math.sin(t * 0.35 + 1.4), dy = lerp(380, 440, far), hy = lerp(640, 560, far);
    E8.stroom(ctx, 0, W, 200, 760, t, 0.7 * (1 - far * 0.6));
    dolfijn(ctx, dx, dy, s, { t, a: q.on('dolfijn', 1, 0.3) }); haai(ctx, hx, hy, s, { t: t + 0.3, a: q.on('haai', 1, 0.3) });
    if (far > 0.01) { ctx.save(); ctx.globalAlpha = 0.45 * far; ctx.fillStyle = '#1C3A58'; ctx.fillRect(0, 180, W, 580); ctx.restore(); }
    const g1 = q.on('gestroomlijnd', 1, 0.4) * (1 - q.on('vin', 1, 0.4));
    if (g1 > 0.01) { ctx.save(); ctx.globalAlpha = g1; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.ellipse(dx, dy, 290 * s, 80 * s, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(hx, hy, 270 * s, 80 * s, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    const g2 = q.on('vin', 1, 0.4) * (1 - q.on('krachtige', 1, 0.4)); E8.gloed(ctx, dx - 15 * s, dy - 72 * s, 34 * s, g2); E8.gloed(ctx, hx + 25 * s, hy - 70 * s, 34 * s, g2);
    const g3 = q.on('staart', 1, 0.4) * (1 - q.on('afstand', 1, 0.4)); E8.gloed(ctx, dx - 250 * s, dy + 4 * s, 40 * s, g3); E8.gloed(ctx, hx - 210 * s, hy - 25 * s, 50 * s, g3);
    naamBij(ctx, 'dolfijn', null, dx, dy - 120 * s, q.on('dolfijn') * (1 - far), 'center'); naamBij(ctx, 'haai', null, hx, hy - 140 * s, q.on('haai') * (1 - far), 'center');
    evoSchaal(ctx, 'allebei ±2–3 m'); },

  s02(ctx, t, q) { bord(ctx); const praat = t > q.at('Mevrouw') && t < 4.8;
    persoon(ctx, 'visser', 440, 900, 560, { pose: t > q.at('dolfijn') - 0.3 ? 'wijs' : 'staan', uit: praat && Math.sin(t * 9) > 0 ? 'praat' : 'neutraal', t });
    naamBij(ctx, 'Mevrouw Visser', null, 440, 300, q.on('Visser', 1, 0.4) * (1 - q.on('klas', 1, 0.6)), 'center');
    dolfijn(ctx, 1280 + 10 * Math.sin(t * 0.5), 330, 0.75, { t, a: q.on('dolfijn', 1, 0.4) }); haai(ctx, 1280 + 10 * Math.sin(t * 0.5 + 1), 560, 0.75, { t: t + 0.3, a: q.on('haai', 1, 0.4) });
    const f = q.on('familie', 1, 0.5); if (f > 0.01) { ctx.save(); ctx.translate(1280, 460); const k = 0.8 + 0.2 * ease(f); ctx.scale(k, k); text(ctx, 'familie?', 0, 0, fTekst(52, 700), rgba(C.goud, f), 'center'); ctx.restore(); } },

  // ---------------- H1 Een stamboom lezen
  s04(ctx, t, q) { E8.schema(ctx); const k = [960, 640], A = [700, 340], B = [1220, 340];
    const in0 = ramp(t, 0, 0.5); E8.tegel(ctx, 'walvis', A[0], A[1] - 12, in0, { rand: q.on('walvis', 1, 0.4) * (1 - q.on('gemeenschappelijke', 1, 0.5)) }); E8.tegel(ctx, 'nijlpaard', B[0], B[1] - 12, in0, { rand: q.on('nijlpaard', 1, 0.4) * (1 - q.on('gemeenschappelijke', 1, 0.5)) });
    const g = ramp(t, q.at('gemeenschappelijke'), 1.2); E8.tak(ctx, A, k, g); E8.tak(ctx, B, k, g);
    E8.tak(ctx, k, [960, 760], ramp(t, q.at('voorouder') - 0.1, 0.6)); E8.knoop(ctx, k, ramp(t, q.at('voorouder') - 0.3, 0.3), C.goud);
    const v = q.on('vertakking', 1, 0.5) * (1 - ramp(t, q.at('vertakking') + 1.2, 0.8)); E8.gloed(ctx, k[0], k[1], 30, v);
    naamBij(ctx, 'cladogram', null, 160, 220, q.on('cladogram', 1, 0.5), 'left', C.goud); },

  s05(ctx, t, q) { E8.schema(ctx); const k = [960, 640], A = [700, 340], B = [1220, 340], dimN = lerp(1, 0.35, q.on('Volg', 1, 0.8));
    E8.tegel(ctx, 'walvis', A[0], A[1] - 12, 1); E8.tegel(ctx, 'nijlpaard', B[0], B[1] - 12, dimN);
    E8.tak(ctx, B, k, 1, { a: dimN }); E8.tak(ctx, A, k, 1); E8.tak(ctx, k, [960, 760], 1); E8.tak(ctx, [960, 760], [960, 800], q.on('Volg', 1, 0.6));
    const kg = q.on('knooppunt', 1, 0.5); E8.knoop(ctx, k, 1, C.goud, lerp(9, 12, kg)); E8.gloed(ctx, k[0], k[1], 30, kg * (1 - q.on('populatie', 1, 0.6)));
    // de populatie in het knooppunt splitst in twee lijnen
    const pa = q.on('populatie', 1, 0.5) * (1 - ramp(t, q.at('lijnen') + 0.6, 0.6)), sp = ramp(t, q.at('splitste'), 1.4);
    if (pa > 0.01) for (let i = 0; i < 12; i++) { const L = i % 2 ? B : A, u = sp * (0.35 + 0.25 * hash(i + 3)), jx = (hash(i) - 0.5) * 50 * (1 - sp * 0.6), jy = (hash(i + 9) - 0.5) * 40 * (1 - sp * 0.6);
      populatieStip(ctx, lerp(k[0], L[0], u) + jx, lerp(k[1], L[1], u) + jy - 10, 11, i % 2 ? C.oker : C.teal, pa); }
    naamBij(ctx, 'gemeenschappelijke voorouder', q.on('populatie') > 0.5 ? 'een populatie die splitste' : null, k[0] + 30, k[1] + 50, q.on('gemeenschappelijke', 1, 0.5), 'left', C.goud);
    E8.pad(ctx, [A, k, [960, 800]], ramp(t, q.at('lijn', 2), q.at('wortel') + 0.4 - q.at('lijn', 2)), C.goud, 7);
    naamBij(ctx, 'afstammingslijn', null, 660, 560, q.on('afstammingslijn', 1, 0.5), 'right', C.goud); },

  s06(ctx, t, q) { E8.schema(ctx); const m = ramp(t, q.at('koe'), 1.2), m2 = ramp(t, q.at('koe') + 0.8, 1.0);
    const n = [960, lerp(640, 560, m)], W_ = [lerp(700, 800, m), lerp(340, 300, m)], N_ = [1220, lerp(340, 300, m)], r = [780, 780], K_ = [400, 300];
    const sEnd = [lerp(960, r[0], m), lerp(800, r[1], m)];
    E8.pad(ctx, [[700, 340], [960, 640], [960, 800]], 1, C.goud, 7, 1 - ramp(t, 0, 0.6));
    E8.tak(ctx, W_, n); E8.tak(ctx, N_, n); E8.tak(ctx, n, sEnd); E8.tak(ctx, r, K_, m2); E8.tak(ctx, r, [780, 860], m2);
    const jong = q.on('jongere', 1, 0.5), oud = q.on('walvis', 2, 0.5);
    E8.knoop(ctx, n, 1, E8.mix(C.line, C.goud, jong), lerp(9, 12, jong)); E8.knoop(ctx, r, m2, E8.mix(C.line, C.teal, oud), lerp(9, 12, oud));
    const nauw = q.on('nauwer', 1, 0.5);
    E8.tegel(ctx, 'koe', K_[0], K_[1] - 12, q.on('koe', 1, 0.4)); E8.tegel(ctx, 'walvis', W_[0], W_[1] - 12, 1, { rand: nauw }); E8.tegel(ctx, 'nijlpaard', N_[0], N_[1] - 12, 1, { rand: nauw });
    naamBij(ctx, 'jongste gemeenschappelijke voorouder', 'walvis en nijlpaard', 1000, 640, jong, 'left', C.goud);
    naamBij(ctx, 'oudere voorouder', 'alle drie', 810, 830, oud, 'left', C.teal);
    E8.gloed(ctx, n[0], n[1], 30, nauw * (1 - ramp(t, q.at('nauwer') + 1.2, 0.6))); },

  // vraag-alinea: dezelfde drie dieren, nu staat de walvis naast de koe en het nijlpaard aan de rand
  s07(ctx, t, q) { E8.schema(ctx); const a = ramp(t, 0, 0.6); const B = E8.layout([['nijlpaard', 'walvis'], 'koe'], 560, 800, 800, 460);
    E8.tekenLayout(ctx, B, { a });
    _tegels(ctx, B, a, { rand: { walvis: q.on('walvis', 1, 0.4), koe: q.on('koe', 1, 0.4), nijlpaard: q.on('rand', 1, 0.4) }, randKleur: { walvis: C.goud, koe: C.text2, nijlpaard: C.text2 } });
    const bn = q.on('naast', 1, 0.5); if (bn > 0.01) { ctx.save(); ctx.globalAlpha = bn; ctx.strokeStyle = C.text2; ctx.lineWidth = 3; const y = 140; ctx.beginPath(); ctx.moveTo(B.L.walvis.x, y + 12); ctx.lineTo(B.L.walvis.x, y); ctx.lineTo(B.L.koe.x, y); ctx.lineTo(B.L.koe.x, y + 12); ctx.stroke(); ctx.restore(); }
    vraagteken(ctx, 1600, 560, q.on('Wie', 1, 0.5), 120); },

  // antwoord: een knooppunt is een scharnier — de takken draaien echt om het knooppunt
  s09(ctx, t, q) { E8.schema(ctx); const boom = [['nijlpaard', 'walvis'], 'koe'], key = 'nijlpaard+walvis+koe', jongKey = 'nijlpaard+walvis';
    const th = Math.PI * ease((t - q.at('Draai')) / 2.0), sh = ramp(t, q.at('boom', 1), 1.0), terug = Math.PI * (1 - ease((t - q.at('boom', 1) - 0.6) / 1.6));
    const mk = q.on('vertakkingen', 1, 0.6); const kk = { [jongKey]: mk > 0.5 ? C.goud : C.line };
    const bx = lerp(560, 200, sh), bw = lerp(800, 560, sh), by = lerp(800, 820, sh), bh = lerp(460, 400, sh), tw = lerp(E8.TW, 150, sh), thh = lerp(E8.TH, 95, sh);
    const B1 = E8.layout(boom, bx, by, bw, bh, { [key]: th }); const aL = lerp(1, 0.55, sh);
    E8.tekenLayout(ctx, B1, { a: aL, knoopKleur: kk, stomp: 40 });
    const rand = { walvis: mk, nijlpaard: mk }, f1 = lerp(0.4, 1, Math.abs(Math.cos(th))); _tegels(ctx, B1, aL, { w: tw * f1, h: thh * lerp(0.75, 1, f1), rand, label: f1 > 0.75 });
    const boogje = (p, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(p.x, p.y - 60, 50, -2.6, -0.5); ctx.stroke(); ctx.restore(); pijl(ctx, p.x + 40, p.y - 90, p.x + 46, p.y - 72, C.goud, a, 3, 14); };
    const sa = q.on('scharnier', 1, 0.5) * (1 - sh); boogje(B1.top, sa); E8.gloed(ctx, B1.top.x, B1.top.y, 26, sa * (1 - ramp(t, q.at('Draai'), 0.5)));
    if (sh > 0.01) { pijl(ctx, 860, 600, 1040, 600, C.line, sh, 4, 18);
      const B2 = E8.layout(boom, 1160, 820, 560, 400, { [key]: terug }); const f2 = lerp(0.4, 1, Math.abs(Math.cos(terug))); E8.tekenLayout(ctx, B2, { a: sh, knoopKleur: kk, stomp: 40 }); _tegels(ctx, B2, sh, { w: 150 * f2, h: 95 * lerp(0.75, 1, f2), rand, label: f2 > 0.75 });
      boogje(B2.top, sh * (1 - mk)); }
    naamBij(ctx, 'zelfde boom', 'takken gedraaid', 960, 200, q.on('dezelfde', 1, 0.5), 'center', C.goud);
    naamBij(ctx, 'lees de vertakkingen, niet de volgorde', null, 960, 868, q.on('nooit', 1, 0.5), 'center'); },

  // mens en chimpansee groot genoeg om te herkennen, onderling op schaal (mens ±1,65 m, chimpansee op vier poten ±0,9 m schouder)
  s10(ctx, t, q) { E8.schema(ctx); const kx = 960, ky = 720, tl = [680, 470], tr = [1240, 470], g = ramp(t, 0.1, 1.4);
    E8.tak(ctx, tl, [kx, ky], g); E8.tak(ctx, tr, [kx, ky], g); E8.tak(ctx, [kx, ky], [kx, ky + 70], ramp(g, 0.7, 0.3)); E8.knoop(ctx, [kx, ky], ramp(g, 0.7, 0.3));
    const sc = 1.87, st = 76 * sc, c0 = q.at('chimpansee') - 0.3, c = E8.gang(t, [[c0, 2]], 1.0, st, 680 - 2 * st); chimp(ctx, c.x, 440, sc, { houding: c.h, t: c.t, a: ramp(t, c0, 0.3) });
    persoon(ctx, 'noor', 1240, 440, 330, { a: q.on('mens', 1, 0.3) });
    naamBij(ctx, 'chimpansee', null, 680, 230, q.on('chimpansee'), 'center'); naamBij(ctx, 'mens', null, 1240, 90, q.on('mens'), 'center');
    const pa = ramp(t, q.at('Maar'), 1.0); if (pa > 0.01) pijl(ctx, 820, 380, lerp(820, 1100, pa), 380, C.koraal, 1, 5, 20);
    const nk = q.on('nooit', 1, 0.4); kruis(ctx, 960, 380, 52 * nk, nk); naamBij(ctx, 'geen voorouder van elkaar', null, 960, 490, q.on('voorouder', 1, 0.5), 'center', C.koraal);
    evoSchaal(ctx, 'mens en chimpansee op schaal'); },

  s11(ctx, t, q) { E8.schema(ctx); const kx = 960, ky = 720, tl = [680, 470], tr = [1240, 470];
    tak(ctx, kx, ky, tl[0], tl[1]); tak(ctx, kx, ky, tr[0], tr[1]); tak(ctx, kx, ky, kx, ky + 70); const kv = q.on('gemeenschappelijke', 1, 0.5); E8.knoop(ctx, [kx, ky], 1, E8.mix(C.line, C.goud, kv), lerp(9, 12, kv));
    chimp(ctx, 680, 440, 1.87); persoon(ctx, 'noor', 1240, 440, 330);
    naamBij(ctx, 'chimpansee', null, 680, 230, 1, 'center'); naamBij(ctx, 'mens', null, 1240, 90, 1, 'center');
    const w = 1 - ramp(t, 0, 0.6); pijl(ctx, 820, 380, 1100, 380, C.koraal, w, 5, 20); kruis(ctx, 960, 380, 52, w);
    // even lange takken: twee lichtlijnen lopen tegelijk omhoog
    const u = ramp(t, q.at('evenveel'), 1.6), ua = 1 - ramp(t, q.at('Ze') + 0.4, 0.6) * 0.6;
    E8.pad(ctx, [[kx, ky], tl], u, C.goud, 7, ua); E8.pad(ctx, [[kx, ky], tr], u, C.goud, 7, ua);
    naamBij(ctx, 'even lange takken', 'evenveel tijd om te veranderen', 1190, 620, q.on('veranderen', 1, 0.5), 'left');
    naamBij(ctx, 'gemeenschappelijke voorouder', q.on('miljoen') > 0.5 ? 'ongeveer 6 tot 8 miljoen jaar geleden' : null, kx, ky + 90, kv, 'center', C.goud);
    vraagteken(ctx, kx, ky - 60, q.on('geen', 1, 0.5), 90); },

  // ---------------- H2 Kenmerken op de takken
  s12(ctx, t, q) { E8.schema(ctx); const g = ramp(t, 0.2, 1.6), erf = ramp(t, q.at('erven'), 1.0), soms = q.on('Soms', 1, 0.6);
    _boom2(ctx, ['haai', 'hagedis', 'mens'], { g, tegelA: [0, 1, 2].map(i => ramp(t, 0.1 + i * 0.25, 0.4)), rand: [0, erf * (1 - soms * 0.6), erf * (1 - soms * 0.6)] });
    const ka = q.on('kenmerk', 2, 0.5), su = lerp(0.15, 0.5, ramp(t, q.at('voorouder'), 0.8)); const p = _rk(su);
    kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], su, 'vier poten', { a: ka });
    E8.gloed(ctx, p[0], p[1], 30, q.on('streepje', 1, 0.4) * (1 - ramp(t, q.at('streepje') + 0.8, 0.6)));
    E8.pad(ctx, [_rk(0.5), E8.K, [860, E8.BY]], erf, C.goud, 6, 1 - 0.6 * soms); E8.pad(ctx, [_rk(0.5), E8.K, [1300, E8.BY]], erf, C.goud, 6, 1 - 0.6 * soms);
    E8.tegel(ctx, 'walvis', 1640, 760, q.on('walvis', 1, 0.4) * (1 - q.on('Je', 1, 0.5)), { w: 330, h: 180, rontgen: 1, heup: 1, meta: 'resten van de achterpoten' }); },

  s13(ctx, t, q) { E8.schema(ctx); _boom2(ctx, ['haai', 'hagedis', 'mens'], {});
    const w = q.on('wervelkolom', 1, 0.5), v = q.on('vier', 1, 0.5), h = q.on('Haar', 1, 0.5);
    kenmerkStreep(ctx, E8.STOMP[0], E8.STOMP[1], E8.R[0], E8.R[1], 0.4, 'wervelkolom', { kleur: w > 0.5 && v < 0.5 ? C.goud : C.text, kant: 'left', a: w });
    kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.5, 'vier poten', { kleur: v > 0.5 && h < 0.5 ? C.goud : C.text });
    kenmerkStreep(ctx, E8.K[0], E8.K[1], 1300, E8.BY, 0.35, 'haar en melk', { a: h });
    const A = [296, 128, 1128, 196], B = [744, 128, 680, 196], Cc = [1184, 128, 232, 196]; const r = A.map((x, i) => v < 1 ? lerp(x, B[i], v) : lerp(B[i], Cc[i], h));
    E8.kader(ctx, r[0], r[1], r[2], r[3], w);
    naamBij(ctx, 'elk nieuw kenmerk:', 'kleinere groep', 1460, 560, q.on('kleiner', 1, 0.5), 'left'); },

  s14(ctx, t, q) { E8.schema(ctx); const bg = q.on('buitengroep', 1, 0.6);
    _boom2(ctx, ['haai', 'hagedis', 'mens'], { kleur0: E8.mix(C.line, C.text2, bg) });
    const nw = q.on('nieuw', 1, 0.5), oud = q.on('wervelkolom', 1, 0.5) * (1 - nw);
    // het label schuift links omhoog (weg van de ondertitels), de ring blijft op het streepje en valt niet over de tekst
    const om = q.on('wervelkolom', 1, 0.6), wy = lerp(E8.STOMP[1], E8.R[1], 0.4);
    kenmerkStreep(ctx, E8.STOMP[0], E8.STOMP[1], E8.R[0], E8.R[1], 0.4, '', { kleur: C.text });
    naamBij(ctx, 'wervelkolom', om > 0.5 ? 'oud: ook bij de haai' : null, lerp(E8.STOMP[0] - 28, 690, om), lerp(wy + 12, 740, om), 1, 'right', C.text);
    E8.gloed(ctx, E8.STOMP[0], wy, 24, oud);
    const sa = lerp(0.4, 1, nw); kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.5, 'vier poten', { kleur: nw > 0.5 ? C.goud : C.text, a: sa }); kenmerkStreep(ctx, E8.K[0], E8.K[1], 1300, E8.BY, 0.35, 'haar en melk', { kleur: nw > 0.5 ? C.goud : C.text, a: sa });
    E8.kader(ctx, 296, 128, 248, 196, ramp(t, q.at('buitengroep') - 0.2, 0.6));
    naamBij(ctx, 'buitengroep', q.on('laat') > 0.5 ? 'laat zien wat oud is' : null, 450, 400, bg, 'right', C.goud);
    E8.kader(ctx, 736, 120, 696, 212, q.on('groep', 2, 0.5) * (1 - q.on('laat', 1, 0.5)) * 0.8, C.text2); },

  s15(ctx, t, q) { const hg = E8.gang(t, [[q.at('hagedis'), 5], [q.at('vier') + 0.2, 5]], 0.5, 5.2 * 25 * 0.06, 990); const vg = E8.gang(t, [[0.3, 3]], 1.2, 120 * 0.34, 1560 + 3 * 120 * 0.34, -1);
    const sch = q.on('schubben', 1, 0.4), ei = q.on('eieren', 1, 0.4); const mk = ei > 0.5 ? 'schubben · eieren' : sch > 0.5 ? 'schubben' : null;
    _oever(ctx, t, { hagX: hg.x, hagH: hg.h, hagT: hg.t, vogelX: vg.x, vogelH: vg.h, vogelT: vg.t, zoomA: q.on('hagedis', 1, 0.6),
      lab: { krok: q.on('krokodil', 1, 0.5), krokM: mk, hag: q.on('hagedis', 1, 0.5), hagM: mk, vog: q.on('vogel', 1, 0.5), vogM: q.on('vleugels') > 0.5 ? 'veren · vleugels' : q.on('veren') > 0.5 ? 'veren' : null } }); },

  // vraag-alinea: dezelfde oever; de krokodil licht op
  s16(ctx, t, q) { _oever(ctx, t + 12, { hagX: 990 + 10 * 5.2 * 25 * 0.06, vogelX: 1560, lab: { krok: 1, krokK: q.on('krokodil', 1, 0.4) > 0.5 ? C.goud : C.text, krokM: 'schubben · eieren', hag: 1, hagM: 'schubben · eieren', vog: 1, vogM: 'veren · vleugels' } });
    vraagteken(ctx, 440, 540, q.on('Wie', 1, 0.5), 110); },

  s18(ctx, t, q) { E8.schema(ctx); const g = ramp(t, 0, 1.4), mist = q.on('mist', 1, 0.6);
    _boom2(ctx, ['hagedis', 'krokodil', 'vogel'], { g, tegelA: [lerp(1, 0.5, mist), 1, 1], rand: [0, mist, mist], knoopK: mist > 0.5 ? C.goud : C.line });
    kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.3, 'hart met vier kamers', { a: q.on('hart', 1, 0.5) });
    kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.62, 'spiermaag', { a: q.on('spiermaag', 1, 0.5) });
    naamBij(ctx, '+ DNA wijst dezelfde kant op', null, 1160, 520, q.on('DNA', 1, 0.5), 'left', C.goud); },

  s19(ctx, t, q) { E8.schema(ctx); _boom2(ctx, ['hagedis', 'krokodil', 'vogel'], { knoopK: C.goud });
    const uit = 1 - ramp(t, 0, 0.6); kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.3, 'hart met vier kamers', { a: uit }); kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.62, 'spiermaag', { a: uit });
    // 'schubben' schuift van de tak van krokodil+vogel omlaag naar de stam onder alle drie
    const sl = ramp(t, q.at('voorouders'), 1.4), sa = ramp(t, 0.2, 0.5);
    const P0 = _rk(0.5), L1 = Math.hypot(E8.R[0] - P0[0], E8.R[1] - P0[1]), L2 = Math.hypot(E8.STOMP[0] - E8.R[0], E8.STOMP[1] - E8.R[1]), s = sl * (L1 + 0.6 * L2);
    if (s < L1) kenmerkStreep(ctx, E8.R[0], E8.R[1], P0[0], P0[1], 1 - s / L1, 'schubben', { kleur: C.text, a: sa });
    else kenmerkStreep(ctx, E8.STOMP[0], E8.STOMP[1], E8.R[0], E8.R[1], 1 - (s - L1) / L2, 'schubben', { kleur: C.text, kant: 'left', a: sa, meta: q.on('niets') > 0.5 ? 'oud kenmerk: zegt niets' : null });
    const veer = q.on('drie', 1, 0.5); if (veer > 0.01) metaText(ctx, 'veren: vervormde schubben', 1300, 104, rgba(C.grain, veer * 0.8), 'center', 22);
    kenmerkStreep(ctx, E8.R[0], E8.R[1], E8.K[0], E8.K[1], 0.5, 'nieuw kenmerk', { a: q.on('nieuwe', 1, 0.5), meta: 'dit telt' }); },

  // ---------------- H3 Dezelfde vorm, andere tak (haai en dolfijn op echte onderlinge maat)
  s20(ctx, t, q) { E8.schema(ctx); const r = q.on('huid', 1, 1.0);
    haai(ctx, 560, 420, 1.35, { t, rontgen: r }); dolfijn(ctx, 1380, 420, 1.35, { t: t + 0.4, rontgen: r });
    naamBij(ctx, 'haai', q.on('kieuwen') > 0.5 ? 'kraakbeen · kieuwen' : q.on('kraakbeen') > 0.5 ? 'kraakbeen' : null, 560, 230, q.on('haai', 1, 0.5), 'center');
    naamBij(ctx, 'dolfijn', q.on('longen') > 0.5 ? 'botten · longen' : q.on('botten') > 0.5 ? 'botten' : null, 1380, 230, q.on('dolfijn', 1, 0.5), 'center');
    naamBij(ctx, 'kraakbeenstralen', null, 560, 640, q.on('kraakbeen', 1, 0.5), 'center');
    const bv = q.on('borstvin', 1, 0.5); E8.gloed(ctx, 1380 + 120 * 1.35 - 20, 420 + 50 * 1.35, 70, bv * (1 - ramp(t, q.at('arm') + 0.4, 0.6)));
    naamBij(ctx, 'opperarm · onderarm · hand', null, 1300, 640, q.on('botten', 2, 0.5), 'center', C.goud);
    const ar = q.on('jouw', 1, 0.6); if (ar > 0.01) { ctx.save(); ctx.globalAlpha = ar; roundRect(ctx, 1730, 520, 160, 300, 16); ctx.fillStyle = rgba(C.fill, 0.55); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      armSkelet(ctx, 'mens', 1810, 540, 260, { a: ar, u: ar, huid: 0.3 }); naamBij(ctx, 'jouw arm', null, 1810, 500, ar, 'center'); } },

  s21(ctx, t, q) { E8.blauw(ctx); E8.bellen(ctx, t); const fa = lerp(0.7, 1, q.on('Hetzelfde', 1, 0.6)), s = 0.85;
    E8.stroom(ctx, 0, W, 200, 760, t, 0.6 * q.on('stroomlijnlijf', 1, 0.6));
    const hx = 420 + 15 * Math.sin(t * 0.4), dx = 1500 + 15 * Math.sin(t * 0.4 + 1);
    haai(ctx, hx, 300, s, { a: fa, t }); dolfijn(ctx, dx, 720, s, { a: fa, t: t + 0.5 });
    const ix = lerp(-400, 960, ease((t - q.at('ichthyosaurus') + 0.6) / 2.4)) + 10 * Math.sin(t * 0.4 + 2), si = s * ZW.ichthyosaurus; ichthyosaurus(ctx, ix, 520, si, { t: t * 1.4 });
    naamBij(ctx, 'ichthyosaurus', q.on('reptiel') > 0.5 ? 'reptiel · uit de tijd van de dinosauriërs' : null, ix, 360, q.on('ichthyosaurus', 1, 0.5) * clamp((ix - 820) / 120, 0, 1), 'center', C.goud);
    const rv = q.on('rugvin', 1, 0.5); E8.gloed(ctx, hx + 25 * s, 300 - 70 * s, 36 * s, rv); E8.gloed(ctx, dx - 15 * s, 720 - 72 * s, 36 * s, rv); E8.gloed(ctx, ix - 10 * si, 520 - 85 * si, 40 * s, rv);
    evoSchaal(ctx, 'op schaal · reconstructie ichthyosaurus'); },

  // vraag-alinea: de drie zwemmers onder elkaar, zelfde vorm
  s22(ctx, t, q) { E8.blauw(ctx); E8.bellen(ctx, t); const u = ramp(t, 0, 1.4), s = 0.85; E8.stroom(ctx, 0, W, 200, 760, t, 0.7);
    haai(ctx, lerp(420, 860, u), lerp(300, 290, u), s, { t, a: lerp(0.7, 1, u) }); ichthyosaurus(ctx, lerp(960, 860, u), 520, s * ZW.ichthyosaurus, { t: t * 1.4 + 1 }); dolfijn(ctx, lerp(1500, 860, u), lerp(720, 750, u), s, { t: t + 0.5, a: lerp(0.7, 1, u) });
    naamBij(ctx, 'haai', null, 1140, 270, q.on('haai', 1, 0.4), 'left'); naamBij(ctx, 'ichthyosaurus', null, 1180, 500, q.on('ichthyosaurus', 1, 0.4), 'left'); naamBij(ctx, 'dolfijn', null, 1140, 730, q.on('dolfijn', 1, 0.4), 'left');
    vraagteken(ctx, 1620, 560, q.on('Waarom', 1, 0.5), 120); evoSchaal(ctx, 'op schaal'); },

  s24(ctx, t, q) { E8.schema(ctx); const r = [520, 840], v = [900, 710], am = [1240, 575], n2 = [1490, 450], Y = 330;
    const g = ramp(t, 0, 1.2);
    E8.tak(ctx, r, [520, 875], g); E8.tak(ctx, [260, Y], r, g); E8.tak(ctx, r, v, g); E8.tak(ctx, [640, Y], v, g, { a: 0.5 }); E8.tak(ctx, v, am, g); E8.tak(ctx, [1000, Y], am, g, { a: 0.5 });
    E8.tak(ctx, am, n2, g); E8.tak(ctx, [1340, Y], n2, g); E8.tak(ctx, [1660, Y], n2, g);
    const vg = q.on('voorouders', 1, 0.6); [r, v, n2].forEach(p => E8.knoop(ctx, p, g)); E8.knoop(ctx, am, g, E8.mix(C.line, C.goud, vg), lerp(9, 12, vg));
    metaText(ctx, 'beenvissen', 640, Y - 14, rgba(C.text2, g), 'center', 24); metaText(ctx, 'amfibieën', 1000, Y - 14, rgba(C.text2, g), 'center', 24);
    const TZ = { w: 290, h: 160 }; E8.tegel(ctx, 'haai', 260, Y - 12, q.on('haai', 1, 0.4), { ...TZ, meta: q.on('apart') > 0.5 ? 'kraakbeenvis' : null });
    E8.tegel(ctx, 'ichthyosaurus', 1340, Y - 12, q.on('ichthyosaurus', 1, 0.4), { ...TZ, meta: q.on('reptielen') > 0.5 ? 'reptiel' : null });
    E8.tegel(ctx, 'dolfijn', 1660, Y - 12, q.on('dolfijn', 1, 0.4), { ...TZ, meta: q.on('zoogdieren') > 0.5 ? 'zoogdier' : null });
    naamBij(ctx, 'voorouder op vier poten', q.on('land') > 0.5 ? 'liep op het land' : null, am[0] + 40, am[1] + 60, q.on('vier', 1, 0.5), 'left', C.goud);
    // zwemmerslijf in elke lijn opnieuw: groene streepjes op de takken
    const z1 = q.on('zwemmerslijf', 1, 0.5), z2 = q.on('opnieuw', 1, 0.5);
    kenmerkStreep(ctx, n2[0], n2[1], 1340, Y, 0.5, 'stroomlijn', { kleur: C.groen, a: z1, kant: 'left' }); kenmerkStreep(ctx, n2[0], n2[1], 1660, Y, 0.5, 'stroomlijn', { kleur: C.groen, a: z1 });
    kenmerkStreep(ctx, r[0], r[1], 260, Y, 0.55, 'stroomlijn', { kleur: C.groen, a: z2, kant: 'left' });
    metaText(ctx, 'vereenvoudigd: niet alle groepen getekend', W - 80, 880, C.text2, 'right', 26); },

  s25(ctx, t, q) { E8.schema(ctx); const rows = [[300, (x, y, tt, a) => haai(ctx, x, y, 0.42, { t: tt, a }), 'haaien'], [530, (x, y, tt, a) => ichthyosaurus(ctx, x, y, 0.42 * ZW.ichthyosaurus, { t: tt, a }), 'ichthyosaurussen'], [760, (x, y, tt, a) => dolfijn(ctx, x, y, 0.42, { t: tt, a }), 'dolfijnen']];
    const t0 = q.at('elke'); E8.stroom(ctx, 420, 1800, 220, 820, t, q.on('water', 1, 0.6) * (1 - ramp(t, t0, 0.8)));
    rows.forEach(([y, fn, naam], ri) => { naamBij(ctx, naam, null, 120, y + 14, 1, 'left');
      for (let i = 0; i < 4; i++) { const u = i === 0 ? 1 : ramp(t, t0 + i * 0.9, 0.8); if (u <= 0.01) continue; const f = i / 3, x = lerp(560 + (i - 1) * 340, 560 + i * 340, u);
        const al = (0.35 + 0.65 * f) * (i === 0 ? 1 : u), pl = 1 - f; ctx.save(); ctx.translate(x, y); ctx.scale(1 - 0.22 * pl, 1 + 0.6 * pl);
        if (ri > 0 && i < 2) { const kl = ri === 1 ? '#5C6450' : '#5E6C7A', L = (i === 0 ? 1 : 0.55); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = kl; ctx.lineCap = 'round'; ctx.lineWidth = 9 * L + 3;
          [[-55, 1], [-30, -1], [45, 1], [70, -1]].forEach(([px, k]) => { ctx.beginPath(); ctx.moveTo(px, 8); ctx.lineTo(px + k * 4, 8 + 26 * L); ctx.stroke(); }); ctx.restore(); }
        fn(0, 0, t + ri + i * 0.3, al); ctx.restore(); } });
    const ga = ramp(t, t0, 0.6); if (ga > 0.01) pijl(ctx, 300, 860, lerp(300, 1600, ramp(t, t0, 3.4)), 860, C.line, ga, 3, 16); metaText(ctx, 'generaties', 1600, 840, rgba(C.text2, ga), 'right', 24);
    naamBij(ctx, 'meer nakomelingen met een gladdere vorm', null, 1760, 180, q.on('nakomelingen', 1, 0.5), 'right', C.groen);
    E8.kader(ctx, 1510, 210, 320, 600, q.on('drie', 1, 0.5), C.groen); },

  s26(ctx, t, q) { E8.schema(ctx); const r = q.on('andere', 1, 0.9);
    haai(ctx, 380, 460, 0.75, { t, rontgen: r }); ichthyosaurus(ctx, 960, 460, 0.75 * ZW.ichthyosaurus, { t: t * 1.4 + 1 }); dolfijn(ctx, 1540, 460, 0.75, { t: t + 0.5, rontgen: r });
    E8.stroom(ctx, 120, 1800, 340, 600, t, q.on('selectiedruk', 1, 0.6) * (1 - q.on('Dat', 1, 0.6)) * 0.7);
    naamBij(ctx, 'haai', null, 380, 330, 1, 'center'); naamBij(ctx, 'ichthyosaurus', null, 960, 320, 1, 'center'); naamBij(ctx, 'dolfijn', null, 1540, 330, 1, 'center');
    const fv = q.on('functie', 1, 0.5) * (1 - q.on('analoge', 1, 0.5)); E8.gloed(ctx, 380 - 175, 460 - 10, 50, fv); E8.gloed(ctx, 960 - 200, 460 - 10, 50, fv); E8.gloed(ctx, 1540 - 195, 460, 50, fv);
    naamBij(ctx, 'analoge organen', 'zelfde functie · andere bouw', 960, 180, q.on('analoge', 1, 0.5), 'center', C.goud);
    haak(ctx, 200, 1720, 620, 'convergente evolutie: dezelfde selectiedruk, niet nauw verwant', C.groen, q.on('convergente', 1, 0.6)); },

  s27(ctx, t, q) { E8.schema(ctx); const ho = ramp(t, 0, 1.0), an = q.on('Analoge', 1, 0.6);
    ctx.strokeStyle = rgba(C.line, an); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1010, 200); ctx.lineTo(1010, 820); ctx.stroke();
    const arm = (s, x, x0, x1, nm, i) => { const u = ramp(t, i * 0.3, 1.6); armSkelet(ctx, s, x, 280, 380, { huid: 0.3, u, a: ramp(t, i * 0.3, 0.3) }); metaText(ctx, nm, (x0 + x1) / 2, 712, rgba(C.grain, u), 'center', 22); };
    arm('mens', 200, 150, 250, 'mens', 0); arm('vleermuis', 330, 320, 715, 'vleermuis', 1); arm('walvis', 760, 710, 810, 'walvis', 2); arm('paard', 900, 860, 960, 'paard', 3);
    haai(ctx, 1260, 360, 0.5, { t, a: an }); ichthyosaurus(ctx, 1600, 530, 0.5 * ZW.ichthyosaurus, { t: t * 1.4, a: an }); dolfijn(ctx, 1260, 700, 0.5, { t: t + 0.5, a: an });
    naamBij(ctx, 'homoloog', q.on('verwantschap') > 0.5 ? 'wijst op verwantschap' : null, 560, 210, ho, 'center', C.goud);
    naamBij(ctx, 'analoog', q.on('niet', 1) > 0.5 ? 'zegt niets over verwantschap' : null, 1440, 210, an, 'center');
    const ui = q.on('uiterlijk', 1, 0.5) * (1 - q.on('bouw', 1, 0.5)); E8.kader(ctx, 1060, 250, 790, 560, ui, C.text2);
    haak(ctx, 150, 960, 760, 'bouw en DNA tellen, niet het uiterlijk', C.goud, q.on('bouw', 1, 0.6)); },

  // ---------------- H4 Namen en groepen (leeuw, tijger, huiskat steeds op dezelfde px per cm)
  s28(ctx, t, q) { E8.schema(ctx); const S = _katS(0.95);
    naamVak(ctx, 160, 220, 1600, 600, 'geslacht', q.on('Panthera') > 0.5 ? 'Panthera' : null, { nadruk: q.on('geslacht', 1, 0.5) > 0.5, a: q.on('soorten', 1, 0.6) });
    const sl = 124 * S.px, stg = sl * S.t / S.l;
    const l0 = q.at('delen') - 0.4, l = E8.gang(t, [[l0, 1]], 1.2, sl, 660 - sl); leeuw(ctx, l.x, 720, S.l, { houding: l.h, t: l.t, a: ramp(t, l0, 0.3) });
    const g0 = q.at('delen') + 0.2, g = E8.gang(t, [[g0, 1]], 1.15, stg, 1270 + stg, -1); tijger(ctx, g.x, 720, S.t, { houding: g.h, t: g.t, kijk: -1, a: ramp(t, g0, 0.3) });
    naamBij(ctx, 'leeuw', null, 660, 790, q.on('Leeuw', 1, 0.5), 'center'); naamBij(ctx, 'tijger', null, 1270, 790, q.on('tijger', 1, 0.5), 'center');
    evoSchaal(ctx, 'op schaal · leeuw en tijger allebei ±1–1,2 m schofthoogte'); },

  s29(ctx, t, q) { E8.schema(ctx); const u = ramp(t, 0, 1.2);
    const lv = [['rijk', 'dieren', 'rijk'], ['stam', 'gewervelde dieren', 'stam'], ['klasse', 'zoogdieren', 'klasse'], ['orde', 'roofdieren', 'orde'], ['familie', 'katachtigen', 'familie']];
    const pv = [lerp(160, 420, u), lerp(220, 595, u), lerp(1600, 760, u), lerp(600, 215, u)];
    const rect = (i) => [100 + i * 60, 110 + i * 100, 1720 - i * 120, 720 - i * 100];
    lv.forEach(([n, m, cue], i) => { const a = q.on(cue, 1, 0.8); if (a <= 0.01) return; const van = i === 4 ? [pv[0] - 20, pv[1] - 120, pv[2] + 40, pv[3] + 140] : rect(i + 1);
      const R = rect(i).map((d, k) => lerp(van[k], d, a)); ctx.save(); ctx.globalAlpha = clamp(a * 1.5, 0, 1); roundRect(ctx, R[0], R[1], R[2], R[3], 22); ctx.fillStyle = rgba(C.fill, 0.22); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      ctx.globalAlpha = ramp(a, 0.75, 0.25); metaText(ctx, n, R[0] + 24, R[1] + 42, C.grain, 'left', 26); text(ctx, m, R[0] + 24 + 170, R[1] + 44, fTekst(38, 600), C.text, 'left'); ctx.restore(); });
    naamVak(ctx, pv[0], pv[1], pv[2], pv[3], 'geslacht', 'Panthera', { nadruk: true });
    const S = _katS(lerp(0.95, 0.36, u)); leeuw(ctx, lerp(660, 680, u), lerp(720, 800, u), S.l); tijger(ctx, lerp(1270, 1000, u), lerp(720, 800, u), S.t, { kijk: -1 });
    const ka = q.on('huiskat', 1, 0.4); _katZoom(ctx, 1500, 800, _katS(0.36).k, 1390, 700, 82, ka, null); naamBij(ctx, 'huiskat', 'geslacht Felis', 1390, 576, ka, 'center'); if (ka > 0.01) metaText(ctx, '4×', 1484, 712, rgba(C.grain, ka), 'left', 24);
    evoSchaal(ctx, 'op schaal'); },

  s30(ctx, t, q) { E8.schema(ctx); const sp = q.on('soort', 1, 1.2), S = _katS(0.62);
    naamVak(ctx, 160, 200, 1600, 640, 'geslacht', 'Panthera');
    const L = [lerp(760, 220, sp), 320, lerp(400, 720, sp), 480], T = [lerp(760, 980, sp), 320, lerp(400, 720, sp), 480];
    const twee = q.on('twee', 1, 0.5); naamVak(ctx, ...L, 'soort', 'leeuw', { nadruk: twee > 0.5, a: sp }); naamVak(ctx, ...T, 'soort', 'tijger', { nadruk: twee > 0.5, a: sp });
    const s0 = q.at('soort') - 0.2, l = E8.gang(t, [[s0, 1.5]], 1.2, 124 * S.px, 580 - 1.5 * 124 * S.px); leeuw(ctx, l.x, 760, S.l, { houding: l.h, t: l.t });
    const g = E8.gang(t, [[s0, 1.5]], 1.15, 124 * S.px * S.t / S.l, 1340 + 1.5 * 124 * S.px * S.t / S.l, -1); tijger(ctx, g.x, 760, S.t, { houding: g.h, t: g.t, kijk: -1 });
    naamBij(ctx, 'soort: in de natuur samen vruchtbare nakomelingen', null, 980, 292, q.on('vruchtbare', 1, 0.5), 'center');
    evoSchaal(ctx, 'op schaal'); },

  // vraag-alinea: leeuw en tijger met hun wetenschappelijke naam
  s31(ctx, t, q) { E8.schema(ctx); const S = _katS(0.62);
    leeuw(ctx, 560, 560, S.l); tijger(ctx, 1360, 560, S.t, { kijk: -1 });
    naamBij(ctx, 'leeuw', null, 560, 610, q.on('leeuw', 1, 0.5) * (1 - q.on('Panthera', 1, 0.5)), 'center'); naamBij(ctx, 'tijger', null, 1360, 610, q.on('tijger', 1, 0.5) * (1 - q.on('Panthera', 2, 0.5)), 'center');
    const e = q.on('eerste', 1, 0.5);
    const zet = (s1, s2, x, y, a, a2) => { if (a <= 0.01) return; ctx.save(); ctx.font = 'italic 600 64px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; const w1 = ctx.measureText(s1 + ' ').width, w2 = ctx.measureText(s2).width, x0 = x - (w1 + w2) / 2;
      ctx.fillStyle = rgba(C.text, a); ctx.fillText(s1, x0, y); ctx.fillStyle = rgba(C.text, a2); ctx.fillText(s2, x0 + w1, y);
      if (e > 0.01) { ctx.strokeStyle = rgba(C.goud, e); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y + 16); ctx.lineTo(x0 + (w1 - 16) * e, y + 16); ctx.stroke(); } ctx.restore(); };
    zet('Panthera', 'leo', 560, 680, q.on('Panthera', 1, 0.5), q.on('leo', 1, 0.4)); zet('Panthera', 'tigris', 1360, 680, q.on('Panthera', 2, 0.5), q.on('tigris', 1, 0.4));
    vraagteken(ctx, 960, 420, q.on('eerste', 1, 0.5), 110); evoSchaal(ctx, 'op schaal'); },

  s33(ctx, t, q) { E8.schema(ctx); const S = _katS(0.45); const na = q.on('twee', 1, 0.5), gs = q.on('geslachtsnaam', 1, 0.5), sa = q.on('soortaanduiding', 1, 0.5), sm = q.on('Samen', 1, 0.6);
    const kg = E8.mix(C.text, C.goud, gs), ks = E8.mix(C.text, C.goud, sm);
    const w = E8.naam2(ctx, 360, 420, 'Panthera', 'leo', kg, ks, na); E8.naam2(ctx, 360, 640, 'Panthera', 'tigris', kg, ks, na);
    naamBij(ctx, 'geslachtsnaam', q.on('hoofdletter') > 0.5 ? 'hoofdletter' : null, 360, 480, gs, 'left', C.goud); naamBij(ctx, 'soortaanduiding', null, 360 + w, 480, sa, 'left');
    const hl = q.on('hoofdletter', 1, 0.4) * (1 - sm); E8.gloed(ctx, 388, 392, 44, hl); E8.gloed(ctx, 388, 612, 44, hl);
    leeuw(ctx, 1500, 470, S.l); tijger(ctx, 1500, 690, S.t);
    haak(ctx, 360, 1000, 720, 'samen: de naam van de soort', C.groen, sm); naamBij(ctx, 'binomiale naamgeving', 'twee woorden', 360, 220, q.on('binomiale', 1, 0.5), 'left', C.goud);
    evoSchaal(ctx, 'op schaal'); },

  s34(ctx, t, q) { E8.schema(ctx); const op = ramp(t, q.at('Linnaeus') - 0.2, 1.4); E8.boek(ctx, op);
    ctx.save(); ctx.fillStyle = '#2A2420'; ctx.textAlign = 'center';
    ctx.globalAlpha = ramp(op, 0.85, 0.15); ctx.font = '700 44px "Fraunces", serif'; ctx.fillText('Systema Naturae', 740, 380);
    ctx.globalAlpha = q.on('1758', 1, 0.5); ctx.font = '500 36px "Source Sans 3", sans-serif'; ctx.fillText('1758', 740, 440);
    ctx.globalAlpha = q.on('Homo', 1, 0.5); ctx.font = 'italic 700 56px "Source Sans 3", sans-serif'; ctx.fillText('Homo sapiens', 1180, 470);
    ctx.globalAlpha = q.on('wijze', 1, 0.5); ctx.font = '500 32px "Source Sans 3", sans-serif'; ctx.fillText('de wijze mens', 1180, 530); ctx.restore();
    const hg = q.on('Homo', 2, 0.5); if (hg > 0.01) { ctx.save(); ctx.font = 'italic 700 56px "Source Sans 3", sans-serif'; const w = ctx.measureText('Homo').width, x0 = 1180 - ctx.measureText('Homo sapiens').width / 2; ctx.strokeStyle = rgba(C.goud, hg); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, 486); ctx.lineTo(x0 + w * hg, 486); ctx.stroke(); ctx.restore(); }
    persoon(ctx, 'noor', 1640, 860, 400, { a: q.on('mens', 1, 0.3) });
    naamBij(ctx, 'Carl Linnaeus', q.on('1758') > 0.5 ? 'voor dieren vanaf het jaar 1758' : null, 960, 180, q.on('Carl', 1, 0.5), 'center'); const hz = q.on('Homo', 2, 0.5); if (hz > 0.01) { ctx.save(); ctx.globalAlpha = hz; ctx.fillStyle = '#8A6418'; ctx.textAlign = 'center'; ctx.font = '700 40px "Source Sans 3", sans-serif'; ctx.fillText('Homo = geslacht', 1180, 640); ctx.restore(); } },

  s35(ctx, t, q) { E8.schema(ctx); const S = _katS(0.34); const tg = q.on('Leeuw', 1, 0.5), fm = q.on('huiskat', 1, 0.5);
    naamVak(ctx, 120, 200, 980, 640, 'familie', 'katachtigen', { kleur: E8.mix(C.line, C.teal, fm) }); naamVak(ctx, 170, 330, 560, 480, 'geslacht', 'Panthera', { nadruk: tg > 0.5 }); naamVak(ctx, 770, 330, 290, 480, 'geslacht', 'Felis');
    leeuw(ctx, 330, 760, S.l); tijger(ctx, 570, 760, S.t, { kijk: -1 }); _katZoom(ctx, 915, 760, S.k, 915, 560, 95, 1, '4× vergroot');
    const g = ramp(t, q.at('stamboom') - 0.3, 1.4); const r = [1480, 800], k = [1360, 560];
    E8.tak(ctx, [1720, 300], r, g); E8.tak(ctx, k, r, ramp(g, 0.5, 0.5)); E8.tak(ctx, [1240, 300], k, g); E8.tak(ctx, [1480, 300], k, g); E8.tak(ctx, r, [1480, 850], ramp(g, 0.9, 0.1));
    E8.knoop(ctx, r, g, E8.mix(C.line, C.teal, fm), lerp(9, 12, fm)); E8.knoop(ctx, k, g, E8.mix(C.line, C.goud, tg), lerp(9, 12, tg));
    naamBij(ctx, 'leeuw', null, 1240, 270, g, 'center'); naamBij(ctx, 'tijger', null, 1480, 270, g, 'center'); naamBij(ctx, 'huiskat', null, 1720, 270, g, 'center');
    E8.gloed(ctx, k[0], k[1], 28, tg * (1 - fm)); E8.gloed(ctx, r[0], r[1], 28, fm);
    naamBij(ctx, 'kleinste gedeelde groep = jongste voorouder', null, 1460, 868, q.on('nauwer', 1, 0.5), 'center', C.goud);
    evoSchaal(ctx, 'op schaal'); },

  // ---------------- Recap: eigen beeld (de speler tekent daarna de eindkaart)
  s36(ctx, t, q) { E8.schema(ctx); const B = E8.layout(['haai', ['hagedis', ['nijlpaard', 'dolfijn']]], 420, 800, 1080, 470);
    const ver = q.on('ver', 1, 0.6), nl = q.on('nijlpaard', 1, 0.6), vt = q.on('vertakkingen', 1, 0.5), st = q.on('stroomlijn', 1, 0.5), an = q.on('analoog', 1, 0.5);
    const kD = B.N.find(n => n.key === 'nijlpaard+dolfijn'), kR = B.top, kH = B.N.find(n => n.key === 'hagedis+nijlpaard+dolfijn'), L = B.L;
    E8.tekenLayout(ctx, B, { knoopKleur: { 'nijlpaard+dolfijn': nl > 0.5 ? C.goud : C.line, [kR.key]: ver > 0.5 ? C.teal : C.line } });
    E8.pad(ctx, [[L.dolfijn.x, L.dolfijn.y], [kD.x, kD.y], [kH.x, kH.y], [kR.x, kR.y], [L.haai.x, L.haai.y]], ramp(t, q.at('Alleen'), 1.4), C.teal, 6, 1 - st * 0.7);
    E8.tegel(ctx, 'haai', L.haai.x, L.haai.y - 12, ramp(t, q.at('haai'), 0.4), { rand: st * (1 - vt), randKleur: C.groen });
    E8.tegel(ctx, 'hagedis', L.hagedis.x, L.hagedis.y - 12, 0.45);
    E8.tegel(ctx, 'nijlpaard', L.nijlpaard.x, L.nijlpaard.y - 12, lerp(0.45, 1, nl), { rand: nl * (1 - vt) });
    E8.tegel(ctx, 'dolfijn', L.dolfijn.x, L.dolfijn.y - 12, q.on('dolfijn', 1, 0.4), { rand: Math.max(st, q.on('tandwalvis', 1, 0.4)) * (1 - vt), randKleur: q.on('tandwalvis') > 0.5 ? C.goud : C.groen, meta: q.on('zoogdier') > 0.5 ? 'tandwalvis · zoogdier' : null });
    kenmerkStreep(ctx, kR.x, kR.y, L.haai.x, L.haai.y, 0.55, 'stroomlijn', { kleur: C.groen, a: an * (1 - vt), kant: 'left' }); kenmerkStreep(ctx, kD.x, kD.y, L.dolfijn.x, L.dolfijn.y, 0.5, 'stroomlijn', { kleur: C.groen, a: an * (1 - vt) });
    naamBij(ctx, 'analoog', q.on('selectiedruk') > 0.5 ? 'dezelfde selectiedruk in water' : null, 1680, 640, an * (1 - q.on('tandwalvis', 1, 0.5)), 'center', C.groen);
    B.N.forEach(n => E8.gloed(ctx, n.x, n.y, 26, vt * (1 - q.on('gedeelde', 1, 0.6))));
    kenmerkStreep(ctx, kH.x, kH.y, kD.x, kD.y, 0.5, 'gedeelde nieuwe kenmerken', { a: q.on('nieuwe', 1, 0.5), meta: q.on('DNA') > 0.5 ? 'botten · DNA' : q.on('botten') > 0.5 ? 'botten' : null }); },
});
