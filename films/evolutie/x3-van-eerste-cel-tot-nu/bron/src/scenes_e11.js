// Film 11 · Van eerste cel tot nu — geanimeerde scènes (keyframes uit sb11.js als eindbeeld, opgebouwd in de maat van de stem).
// Rode draad: de klok van 24 uur. Grote klok in de Schema-scènes, kleine klok rechtsboven (e11Mini) in de Macro-scènes; de wijzer loopt mee met de genoemde tijd.
// De speler tekent linksboven al 'havo · vwo · evolutie extra 3/4': e11Tag wordt hier niet gebruikt.

// wijzer langs vaste punten [[tijd, uur], …] met zachte overgangen
const e11Pad = (t, P) => { if (t <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) if (t < P[i][0]) return lerp(P[i - 1][1], P[i][1], ease((t - P[i - 1][0]) / (P[i][0] - P[i - 1][0]))); return P[P.length - 1][1]; };
const E11T = { leven: e11Tijd(3480), zuurstof: e11Tijd(2430), euk: e11Tijd(1600), ediacara: e11Tijd(575), camb: e11Tijd(539), land: e11Tijd(470), dpoot: e11Tijd(425), tikt: e11Tijd(375), perm: e11Tijd(252), kpg: e11Tijd(66), chimp: e11Tijd(7) };
// naam die later een toelichting krijgt (zelfde plek, de meta-regel komt erbij)
const e11NaamMeta = (ctx, naam, meta, x, y, a, b, al = 'center', k = C.text) => { naamBij(ctx, naam, null, x, y, a * (1 - b), al, k); naamBij(ctx, naam, meta, x, y, a * b, al, k); };
// oerzee als achtergrond met golfjes
const _zee = (ctx, t, o = {}) => { e11Oerzee(ctx, o); e11Golf(ctx, o.opp || 470, t, 120, 0.25); };
// oerzee met stromatolieten (s07, s08)
const _STROM = [[260, 770, 1.3, 1], [480, 770, 1.0, 4], [680, 770, 1.5, 2], [930, 770, 1.1, 5], [1150, 770, 1.35, 3]];
const _stromTop = ([x, y, s, sd]) => [x, y - (90 + hash(sd + 2) * 40) * s - 4 * s];
// zuurstofmeter in de lucht (linksboven)
const _meter = (ctx, frac, a = 1, gl = 0) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120, 150, 280, 40, 18); shape(ctx, '#2A3A58', C.line, 2);
  if (frac > 0.005) { roundRect(ctx, 120, 150, Math.max(36, 280 * frac), 40, 18); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); } ctx.restore(); if (gl > 0.01) e11Gloed(ctx, 140, 170, 70, gl, C.teal); };
// maan
const _maan = (ctx, x, y, r, a = 1) => { if (a <= 0.01) return; e11Gloed(ctx, x, y, r * 3, 0.35 * a, '#E6E1D3'); circ(ctx, x, y, r, rgba('#E6E1D3', 0.9 * a)); };

Object.assign(SCENES, {
  // ---------------- titel: rechts de klok; de wijzer loopt van middernacht naar half zes en het groene stuk 'leven' begint
  title(ctx, t) { const u = e11Pad(t, [[0.4, 0.001], [3.4, E11T.leven]]);
    e11Klok(ctx, 1580, 620, 250, { uur: u, toonLeven: false, bogen: [{ van: E11T.leven, tot: E11T.leven + (24 - E11T.leven) * ease((t - 3.4) / 4), kleur: E11.leven, a: 0.75 }] }); },

  // ---------------- Opening
  s01(ctx, t, q) { macroNacht(ctx, { horizon: 900, heuvel: false }); e11Sterren(ctx, t, 860);
    e11Aarde(ctx, 560, 470, 260, 1, t * 0.6);
    const dag = q.on('dag', 1, 0.6), nacht = q.on('middernacht', 1, 0.4), rond = q.on('Vierentwintig', 1, q.at('nu') - q.at('Vierentwintig') + 0.4), uur = 0.0001 + 23.998 * rond;
    e11Klok(ctx, 1360, 470, 300, { uur, toonLeven: false, a: 0.35 + 0.65 * dag, bogen: rond > 0.002 ? [{ van: 0, tot: uur, kleur: C.goud, a: 0.45 }] : [] });
    e11Gloed(ctx, 1360, 470 - 279, 70, nacht * (1 - rond * 0.6));
    naamBij(ctx, 'de geschiedenis van de aarde', 'als één dag van 24 uur', 1360, 120, dag, 'center');
    naamBij(ctx, 'middernacht: de aarde ontstaat', null, 1360, 860, nacht * (1 - q.on('Vierentwintig', 1, 0.4)), 'center', C.goud);
    naamBij(ctx, '24 uur later: nu', null, 1360, 860, q.on('later', 1, 0.5), 'center', C.goud); },

  s02(ctx, t, q) { e11Fill(ctx, C.bgSchema); const u = e11Pad(t, [[0, 0.0001], [1.2, E11T.leven]]), sp = q.on('sporen', 1, 1.0);
    e11Klok(ctx, 620, 520, 330, { uur: u, toonLeven: false, bogen: sp > 0.01 ? [{ van: E11T.leven, tot: E11T.leven + 0.25 * sp, kleur: E11.leven }] : [], merk: sp > 0.3 ? [{ u: E11T.leven, kleur: E11.leven }] : [] });
    naamBij(ctx, 'oudste sporen van leven', '±05:36 · ±3,5 miljard jaar', 1000, 220, q.on('leven', 1, 0.5), 'left', E11.leven);
    const z = q.on('laagjes', 1, 0.6), g = 0.25 + 0.75 * q.on('laagjes', 1, q.at('stromatolieten') - q.at('laagjes') + 1.4);
    zoomCircle(ctx, 1500, 600, 230 * (0.6 + 0.4 * z), 925, 500, 'stromatoliet · laagjes door microben', z, () => { ctx.fillStyle = '#22466A'; ctx.fillRect(1250, 350, 500, 500); ctx.fillStyle = E11.zand; ctx.fillRect(1250, 760, 500, 200);
      e11Golf(ctx, 380, t, 300, 0.2); e11Stromatoliet(ctx, 1330, 762, 0.8, { seed: 5 }); e11Stromatoliet(ctx, 1680, 762, 0.85, { seed: 6 });
      e11Stromatoliet(ctx, 1500, 762, 1.75, { seed: 2, laag: 12, groei: g, mat: true, t });
      naamBij(ctx, 'microben', null, 1500, 440, q.on('microben', 1, 0.5) * (1 - q.on('Daar', 1, 0.8)), 'center', E11.cyano); }); },

  s03(ctx, t, q) { e11Fill(ctx, C.bgSchema); const v = q.on('Vier', 1, 1.6);
    e11Klok(ctx, 700, 540, 340, { uur: E11T.leven, toonLeven: false, bogen: [{ van: E11T.leven, tot: E11T.leven + 0.2 + (24 - E11T.leven - 0.2) * v, kleur: E11.leven, a: 0.75 }] });
    [['eerste dieren?', 'dieren'], ['planten op het land?', 'planten'], ['de mens?', 'mens']].forEach(([s, w], i) => naamBij(ctx, s, null, 1200, 400 + i * 110, q.on(w, 1, 0.5), 'left', C.goud));
    const w = q.on('wanneer', 1, 0.6); [[13, 0], [19, 1], [23, 2]].forEach(([h, i]) => { const an = e11U(h), p = 0.6 + 0.4 * Math.sin(t * 2 + i); vraagteken(ctx, 700 + Math.cos(an) * 400, 540 + Math.sin(an) * 400 + 30, w * p, 64); }); },

  s05(ctx, t, q) { e11Fill(ctx, C.bgSchema); const ae = q.on('aarde', 1, 0.6), uu = q.on('uur', 1, 0.6);
    e11Klok(ctx, 760, 540, 340, { uur: null, toonLeven: false, bogen: [{ van: 0, tot: 24 * q.on('4,5', 1, 1.6), kleur: C.goud, a: 0.25 * (1 - uu * 0.6) }].concat(uu > 0.01 ? [{ van: 9, tot: 9 + uu, kleur: C.goud }] : []) });
    naamBij(ctx, 'aarde: ±4,5 miljard jaar', 'gemeten · 24 uur', 1220, 600, ae, 'left');
    naamBij(ctx, '1 uur ≈ 190 miljoen jaar', null, 1220, 360, q.on('190', 1, 0.5), 'left', C.goud);
    naamBij(ctx, '1 minuut ≈ 3 miljoen jaar', null, 1220, 470, q.on('miljoen', 1, 0.8), 'left'); },

  // ---------------- H1 Zuurstof uit de zee
  s06(ctx, t, q) { _zee(ctx, t); const lu = q.on('lucht', 1, 0.6);
    for (let i = 0; i < 10; i++) { const w = wander(i, t, 30, 0.2); e11CO2(ctx, 200 + hash(i * 3) * 1300 + w.x, 150 + hash(i * 5) * 200 + w.y, 1.3, 0.6); }
    naamBij(ctx, 'bijna geen zuurstof', null, 160, 260, lu, 'left');
    e11Mini(ctx, E11T.leven, { meta: '±3,5 miljard jaar geleden', stip: { van: E11T.leven - 1.4 * q.on('eerder', 1, 1.2), tot: E11T.leven, kleur: E11.leven, a: q.on('eerder', 1, 0.4) } });
    const z = q.on('cellen', 1, 0.7);
    zoomCircle(ctx, 1300, 520, 240 * (0.6 + 0.4 * z), 700, 640, 'cellen zonder kern · vergroot', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1050, 270, 500, 500);
      [[1220, 430, 100, 0.3, 0], [1380, 520, 80, -0.4, 1], [1250, 620, 90, 1.1, 0], [1420, 380, 64, 0.2, 2], [1150, 540, 70, 2.0, 1]].forEach(([x, y, l, r, k], i) => { const w = wander(i + 3, t, 14, 0.25);
        e11Prok(ctx, x + w.x, y + w.y, l, r + Math.sin(t * 0.3 + i) * 0.2, { kleur: k === 1 ? '#A89878' : C.teal, bol: k === 2 }); }); });
    e11NaamMeta(ctx, 'bacteriën en archaea', 'allemaal afstammelingen van LUCA', 1300, 850, q.on('bacteriën', 1, 0.5), q.on('LUCA', 1, 0.6));
    evoSchaal(ctx, 'model · niet op schaal'); },

  s07(ctx, t, q) { _zee(ctx, t);
    _STROM.forEach(([x, y, s, sd]) => e11Stromatoliet(ctx, x, y, s, { seed: sd }));
    e11Bellen(ctx, t, q.at('zuurstof') - 0.3, _STROM.map(_stromTop), { n: 4, stijg: 150, per: 2.4 });
    naamBij(ctx, 'stromatolieten', 'gebouwd door cyanobacteriën', 260, 860, 1, 'left');
    naamBij(ctx, 'zuurstofbelletjes', null, 700, 455, q.on('zuurstof', 1, 0.5) * (1 - q.on('Met', 1, 0.5)), 'center', C.teal);
    const z = q.on('cyanobacteriën', 1, 0.7), zx = 1420, zy = 360, zr = 235;
    zoomCircle(ctx, zx, zy, zr * (0.6 + 0.4 * z), 1150, 640, 'cyanobacteriën · vergroot', z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      const li = q.on('licht', 1, 0.6); if (li > 0.01) { ctx.save(); ctx.globalAlpha = 0.22 * li; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; for (let i = 0; i < 6; i++) { const x0 = zx - 260 + i * 70; ctx.beginPath(); ctx.moveTo(x0, zy - 260); ctx.lineTo(x0 + 130, zy + 30); ctx.stroke(); } ctx.restore(); }
      e11Cyano(ctx, zx - 130, zy + 30, 9, { r: 16, golf: 0.2 + 0.04 * Math.sin(t) });
      const tW = q.at('water'), tC = q.at('koolstofdioxide'), tS = Math.max(q.at('suiker'), tC + 1.0), tV = q.at('vrij');
      for (let i = 0; i < 2; i++) { const t0 = tW - 0.6 + i * 0.7, f = ease(clamp((t - t0) / 2.2, 0, 1)), a = ramp(t, t0, 0.4) * (1 - ramp(t, t0 + 2.0, 0.6));
        e11Mol(ctx, 'h2o', lerp(zx - 170 + i * 50, zx - 70 + i * 50, f), lerp(zy - 150 + i * 40, zy + 20, f), 15, a, i === 0); }
      for (let i = 0; i < 2; i++) { const t0 = tC - 0.4 + i * 0.7, f = ease(clamp((t - t0) / 2.2, 0, 1)), a = ramp(t, t0, 0.4) * (1 - ramp(t, t0 + 2.0, 0.6));
        e11Mol(ctx, 'co2', lerp(zx + 150, zx + 20 + i * 40, f), lerp(zy - 140 + i * 60, zy + 25, f), 13, a, i === 0); }
      const su = ramp(t, tS, 0.6); e11Glucose(ctx, zx - 10, zy + 130, 22, su, t * 0.2); if (su > 0.01) text(ctx, 'suiker', zx + 26, zy + 138, fTekst(22, 700), rgba(C.goud, su), 'left');
      for (let i = 0; i < 3; i++) { const t0 = tV - 0.3 + i * 0.6; if (t < t0) continue; const f = Math.min(1, (t - t0) / 2.6);
        e11Mol(ctx, 'o2', zx - 70 + i * 60 + Math.sin(f * 6 + i) * 6, zy + 15 - f * 190, 14, ramp(t, t0, 0.3) * (1 - ramp(f, 0.8, 0.2)), i === 1); } });
    const bl = q.on('bleef', 1, 0.6); _meter(ctx, 0, 1, bl * (0.6 + 0.4 * Math.sin(t * 4)));
    naamBij(ctx, 'zuurstof in de lucht: ±0', null, 120, 240, 1, 'left'); },

  s08(ctx, t, q) { _zee(ctx, t); _STROM.forEach(([x, y, s, sd]) => e11Stromatoliet(ctx, x, y, s, { seed: sd }));
    e11Bellen(ctx, t + 10, 0, _STROM.map(_stromTop), { n: 4, stijg: 150, per: 2.4 });
    _meter(ctx, 0, 1, 0.5 + 0.4 * Math.sin(t * 3)); naamBij(ctx, 'zuurstof in de lucht: ±0', null, 120, 240, 1, 'left');
    vraagteken(ctx, 460, 200, 0.7 + 0.3 * q.on('Waarom', 1, 0.5), 90); vraagteken(ctx, 760, 420, q.on('lucht', 1, 0.5), 70); },

  s10(ctx, t, q) { e11Fill(ctx, C.bgSchema); const bx = 200, by = 200, bw = 820, bh = 520, bodem = by + bh - 6;
    roundRect(ctx, bx, by, bw, bh, 18); shape(ctx, rgba(E11.zeeL, 0.6), C.line, 2);
    const tO = q.at('Zuurstof'), tZ = q.at('zakte'), tV = q.at('vulkanen');
    const fe = (x, y, a = 1) => { circ(ctx, x, y, 17, rgba(C.oker, 0.55 * a), rgba(C.oker, a), 2.5); if (a > 0.3) text(ctx, 'Fe', x, y + 7, fTekst(18, 700), rgba('#1A2740', a), 'center'); };
    const roest = (x, y) => { circ(ctx, x - 13, y - 12, 10, E11.roest, _lt(E11.roest, 0.3), 1.5); circ(ctx, x + 13, y - 12, 10, E11.roest, _lt(E11.roest, 0.3), 1.5); circ(ctx, x, y, 17, E11.roest, _lt(E11.roest, 0.35), 2); };
    ctx.save(); roundRect(ctx, bx, by, bw, bh, 18); ctx.clip();
    const vu = q.on('vulkanen', 1, 0.6); if (vu > 0.01) { ctx.globalAlpha = vu; vul(ctx, [[bx + bw - 230, by + bh], [bx + bw - 150, by + bh - 110], [bx + bw - 110, by + bh - 110], [bx + bw - 30, by + bh]], '#4A4446', '#6A6264', 2);
      for (let i = 0; i < 5; i++) { if (t < tV) break; const f = ((t - tV) / 2.6 + i / 5) % 1; circ(ctx, bx + bw - 130 + Math.sin(f * 7 + i) * 14, by + bh - 120 - f * 240, 16 + f * 10, rgba('#8A8E96', 0.45 * (1 - f)), rgba('#B0B4BA', 0.6 * (1 - f)), 1.5); }
      for (let i = 0; i < 3; i++) { const t0 = tV + 0.8 + i * 0.8, f = clamp((t - t0) / 1.6, 0, 1); if (t > t0 && f < 1) e11Mol(ctx, 'o2', lerp(bx + bw - 330 + i * 40, bx + bw - 135, ease(f)), lerp(by + 150 + i * 40, by + bh - 200, ease(f)), 10, 1 - ramp(f, 0.75, 0.25)); }
      ctx.globalAlpha = 1; }
    const N = 8;
    for (let i = 0; i < N; i++) { const w = wander(i, t, 8, 0.3), x = bx + 90 + (i % 4) * 150 + hash(i * 5) * 50, y = by + 110 + Math.floor(i / 4) * 150 + hash(i * 9) * 50;
      const t1 = tO + 0.3 + i * 0.45, t2 = t1 + 1.2, f = clamp((t - t1) / 1.2, 0, 1), zak = ramp(t, Math.max(tZ, t2) + i * 0.15, 1.6);
      const px = bx + 80 + i * 74, py = bodem - 20;
      if (t < t2) { fe(x + w.x, y + w.y); if (t > t1) e11Mol(ctx, 'o2', lerp(x + 30, x + w.x, ease(f)), lerp(by + 30, y + w.y - 30, ease(f)), 10, ramp(t, t1, 0.3)); }
      else roest(lerp(x + w.x, px, zak), lerp(y + w.y, py, zak)); }
    for (let i = 0; i < 4; i++) { const w = wander(i + 30, t, 10, 0.3); fe(bx + 160 + i * 140 + w.x, by + 400 + hash(i * 3) * 50 + w.y); }
    ctx.restore();
    // namen bij de deeltjes
    const w0 = wander(30, t, 10, 0.3); naamBij(ctx, 'ijzer', null, bx + 160 + w0.x, by + 380 + hash(0) * 50 + w0.y - 2, ramp(t, 0.6, 0.6), 'center', C.oker);
    { const t1 = tO + 0.3, f = clamp((t - t1) / 1.2, 0, 1), x = bx + 90 + hash(0) * 50; naamBij(ctx, 'zuurstof', null, lerp(x + 30, x, ease(f)) + 30, lerp(by + 30, by + 110 + hash(0) * 50 - 30, ease(f)) - 4, ramp(t, t1, 0.4) * (1 - ramp(t, t1 + 1.2, 0.4)), 'left', C.teal); }
    { const x = bx + 90 + hash(0) * 50, y = by + 110 + hash(0) * 50; naamBij(ctx, 'roest', null, x + 30, y - 22, ramp(t, tO + 1.5, 0.4) * (1 - q.on('zakte', 1, 0.5)), 'left', E11.roest); }
    naamBij(ctx, 'roest zakt naar de bodem', null, 500, 770, q.on('zakte', 1, 0.5), 'center', E11.roest); naamBij(ctx, 'gassen uit vulkanen', null, 900, 770, vu, 'center');
    const kl = ['#5A4A40', E11.roest, '#4E4A48', '#9A4A30', '#56504A', E11.roest, '#4A4440', '#A0503A']; const rl = q.on('roestlagen', 1, 2.4);
    kl.forEach((k, i) => { const j = kl.length - 1 - i, a = clamp(rl * kl.length - i, 0, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha = a; roundRect(ctx, 1220, 260 + j * 52 + (1 - a) * 20, 520, 48, 6); shape(ctx, kl[j], _lt(kl[j], 0.2), 1.5); ctx.restore(); });
    naamBij(ctx, 'rode banden in oud gesteente', 'gebande ijzerformatie', 1480, 760, q.on('rode', 1, 0.6), 'center'); },

  s11(ctx, t, q) { e11Fill(ctx, C.bgSchema); const u = e11Pad(t, [[q.at('2,4'), E11T.leven], [q.at('geleden') + 0.6, E11T.zuurstof]]);
    const el = q.on('elf', 1, 0.5); e11Klok(ctx, 520, 500, 310, { uur: u, merk: el > 0.01 ? [{ u: E11T.zuurstof, kleur: C.teal, tekst: '±11:00', meta: '2,4 miljard jaar' }] : [] });
    const x0 = 1000, y0 = 760, w = 780, hh = 380; lijn(ctx, [[x0, y0], [x0 + w, y0]], C.line, 2.5); lijn(ctx, [[x0, y0], [x0, y0 - hh]], C.line, 2.5);
    const X = (mj) => x0 + (3500 - mj) / 3500 * w, Y = (v) => y0 - v * hh; const lim = lerp(lerp(3500, 2000, q.on('blijft', 1, 2.2)), 0, q.on('Nog', 1, 1.6));
    const pts = [[3500, 0], [2500, 0.01], [2430, 0.12], [2300, 0.2], [2000, 0.15], [800, 0.17], [600, 0.6], [300, 0.95], [0, 0.85]];
    ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(X(3500), Y(0));
    for (let i = 1; i < pts.length; i++) { const [m, v] = pts[i], [m0, v0] = pts[i - 1]; if (m >= lim) ctx.lineTo(X(m), Y(v)); else { if (m0 > lim) ctx.lineTo(X(lim), Y(lerp(v0, v, (m0 - lim) / (m0 - m)))); break; } } ctx.stroke();
    const g = q.on('2,4', 1, 0.6); ctx.save(); ctx.globalAlpha = g; lijn(ctx, [[X(2430), y0], [X(2430), y0 - hh]], rgba(C.goud, 0.7), 2); metaText(ctx, '2,4', X(2430), y0 + 40, C.goud, 'center', 28); ctx.restore();
    metaText(ctx, '3,5', x0, y0 + 40, C.text2, 'center', 28); metaText(ctx, 'NU', x0 + w, y0 + 40, C.text2, 'center', 28); metaText(ctx, 'MILJARD JAAR GELEDEN', x0 + w, y0 + 84, C.text2, 'right', 26);
    metaText(ctx, 'ZUURSTOF IN DE LUCHT · GESTILEERD', x0, y0 - hh - 30, C.grain, 'left', 26); naamBij(ctx, 'veel minder dan nu', null, X(1400), Y(0.17) - 60, q.on('minder', 1, 0.5), 'center', C.teal); },

  s12(ctx, t, q) { e11Fill(ctx, C.bgMicro); const gi = q.on('giftig', 1, 1.0), ge = q.on('gebruiken', 1, 0.6), en = q.on('energie', 1, 0.6);
    for (let i = 0; i < 14; i++) { const w = wander(i, t, 40, 0.25); e11O2(ctx, 300 + hash(i * 3) * 1300 + w.x, 260 + hash(i * 7) * 560 + w.y, 1.4, 0.8); }
    [[400, 400, 140, 0.3, 1], [620, 620, 120, -0.6, 1], [880, 380, 150, 1.0, 1], [1080, 640, 130, 0.2, 0], [1300, 420, 140, -0.3, 1], [1500, 600, 130, 0.8, 0], [760, 820, 110, 0.4, 1]].forEach(([x, y, l, r, d], i) => {
      const w = wander(i + 20, t, d ? 12 * (1 - gi) + 3 : 14, 0.3), rr = r + Math.sin(t * 0.4 + i) * 0.15 * (d ? 1 - gi : 1);
      if (d) { e11Prok(ctx, x + w.x, y + w.y, l, rr, { kleur: C.teal, a: 1 - gi }); e11Prok(ctx, x + w.x, y + w.y, l, rr, { kleur: C.teal, dood: true, a: gi }); }
      else { e11Gloed(ctx, x + w.x, y + w.y, 110, ge * (0.7 + 0.3 * Math.sin(t * 3 + i)), C.teal); e11Prok(ctx, x + w.x, y + w.y, l, rr, { kleur: C.teal });
        if (en > 0.01) for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + t * 0.8, d2 = 70 + 20 * Math.sin(t * 3 + k); ctx.save(); ctx.globalAlpha = en; e11Ster(ctx, x + w.x + Math.cos(an) * d2, y + w.y + Math.sin(an) * d2, 9); ctx.restore(); } } });
    naamBij(ctx, 'zuurstof: giftig voor veel cellen', null, 160, 220, q.on('giftig', 1, 0.5), 'left'); naamBij(ctx, 'gebruikt zuurstof: meer energie', null, 1300, 760, ge, 'center', C.teal); },

  // ---------------- H2 De cel met een kern
  s13(ctx, t, q) { e11Fill(ctx, C.bgMicro); const w = wander(1, t, 10, 0.3);
    e11Prok(ctx, 380 + w.x, 520 + w.y, 90, 0.2 + Math.sin(t * 0.4) * 0.1, { kleur: C.teal }); naamBij(ctx, 'bacterie', 'geen kern', 380, 620, q.on('kern', 1, 0.5), 'center');
    const ce = q.on('cel', 1, 1.0), r = 360 * (0.3 + 0.7 * ease(ce)); e11Euk(ctx, 1150, 520, r, { a: ce });
    const kx = 1150 - r * 0.28, ky = 520 - r * 0.05, kr = r * 0.33;
    if (ce > 0.01) { ctx.save(); ctx.globalAlpha = ce; ctx.beginPath(); ctx.arc(kx, ky, kr * 0.86, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba(C.kernR, 0.85); ctx.lineWidth = 2.2; ctx.lineJoin = 'round';
      for (let k = 0; k < 5; k++) e11Kluwen(ctx, kx + Math.cos(k * 1.3) * kr * 0.3, ky + Math.sin(k * 1.7) * kr * 0.3, kr * 0.6, kr * 0.5, 20 + k * 7); ctx.restore(); }
    const k2 = q.on('kern', 2, 0.6), mi = q.on('mitochondri', 1, 0.6), vb = q.on('verbranding', 1, 0.6);
    e11Gloed(ctx, kx, ky, r * 0.5, k2 * (1 - mi * 0.6), C.kernR);
    const mx = 1150 + 0.55 * r, my = 520 - 0.1 * r; e11Gloed(ctx, mx, my, r * 0.24, mi * (0.7 + 0.3 * vb * Math.sin(t * 4)), C.mitoR);
    naamBij(ctx, 'kern', 'met het DNA', 1050, 430, k2, 'center', C.text); naamBij(ctx, 'mitochondrium', 'verbranding', mx + r * 0.2, my + 10, mi, 'left', C.mitoR);
    evoSchaal(ctx, 'bacterie ±2 micrometer · cel ±20 micrometer · schematisch'); },

  s14(ctx, t, q) { e11Fill(ctx, C.bgMicro); const dn = q.on('DNA', 1, 0.6), de = q.on('deelt', 1, 0.6), sp = q.on('splitsen', 1, 1.4);
    const tB = q.at('twee', 2) - 0.1, ub = ramp(t, tB, 0.9), ui = ramp(t, tB + 0.5, 1.0); const b = Math.sin(t * 0.5) * 6;
    e11Mito(ctx, 560, 500 + b, 560, 0.1); e11Gloed(ctx, 560 + 560 * 0.12 * Math.cos(0.1), 500 + b + 560 * 0.12 * Math.sin(0.1), 90, dn * (0.7 + 0.3 * Math.sin(t * 3)) * (1 - ub), C.kernR);
    e11MitoMembraan(ctx, 560, 500 + b, 560, 0.1, 'buiten', ub, C.goud); e11MitoMembraan(ctx, 560, 500 + b, 560, 0.1, 'binnen', ui, C.teal);
    ctx.save(); ctx.globalAlpha = de; if (sp < 0.02) e11Mito(ctx, 1440, 500 - b, 520, 0.1); else { const d = 520 * 0.37 * sp, L = 520 * (1 - 0.36 * sp); for (const k of [-1, 1]) e11Mito(ctx, 1440 + k * Math.cos(0.1) * d, 500 - b + k * Math.sin(0.1) * d, L, 0.1); } ctx.restore();
    naamBij(ctx, 'eigen DNA in een ring', null, 620, 300, dn * (1 - q.on('deelt', 1, 0.5)), 'center', C.kernR);
    naamBij(ctx, 'buitenste membraan', null, 560, 320, ub, 'center', C.goud); naamBij(ctx, 'binnenste membraan met plooien', null, 560, 700, ui, 'center', C.teal);
    naamBij(ctx, 'deelt zich in tweeën', null, 1440, 720, q.on('tweeën', 1, 0.5), 'center'); },

  s15(ctx, t, q) { e11Fill(ctx, C.bgMicro); const w = wander(2, t, 10, 0.3);
    e11Mito(ctx, 640, 500 + Math.sin(t * 0.5) * 6, 440, 0.1); e11Prok(ctx, 1300 + w.x, 500 + w.y, 200, -0.1, { kleur: C.teal });
    vraagteken(ctx, 960, 540, 0.6 + 0.4 * q.on('mitochondri', 1, 0.5), 110); naamBij(ctx, 'mitochondrium', null, 640, 700, 1, 'center', C.mitoR); naamBij(ctx, 'bacterie', null, 1300, 700, 1, 'center', C.teal); },

  s17(ctx, t, q) { e11Fill(ctx, C.bgMicro); const x = 960, y = 540, r = 260, tOp = q.at('op'), fase = ramp(t, tOp - 0.3, 2.4), tV = q.at('verder'), tD = q.at('celdeling');
    if (t < tV) { ctx.save(); const w = wander(5, t, 6, 0.3); ctx.translate(w.x * (1 - fase), w.y * (1 - fase)); e11Endo(ctx, x, y, r, fase); ctx.restore(); }
    else { const sp = ramp(t, tV, 1.2), dl = ramp(t, tD - 0.2, 2.0);
      e11Gastcel(ctx, x, y, r, [[lerp(0.45, 0.25, sp) * r, lerp(-0.1, -0.32, sp) * r, 0.38 * r], [lerp(0.45, 0.42, sp) * r, lerp(-0.1, 0.22, sp) * r, 0.38 * r]], { deel: dl }); }
    e11Gloed(ctx, x + r * (1.25 - 0.8 * Math.min(1, fase)), y - r * 0.1, 80, q.on('verteerd', 1, 0.5) * (1 - q.on('leefde', 1, 0.6)), C.teal);
    naamBij(ctx, 'archaeon (waarschijnlijk)', null, x, 240, q.on('archaeon', 1, 0.5) * (1 - q.on('verteerd', 1, 0.5)), 'center', '#C8B898');
    naamBij(ctx, 'bacterie die zuurstof gebruikt', null, x + 390, y - 210, q.on('zuurstof', 1, 0.5) * (1 - q.on('verteerd', 1, 0.5)), 'center', C.teal);
    naamBij(ctx, 'niet verteerd', null, x, 240, q.on('verteerd', 1, 0.5) * (1 - q.on('celdeling', 1, 0.5)), 'center', C.teal);
    naamBij(ctx, 'bij elke celdeling doorgegeven', null, x, 240, q.on('celdeling', 1, 0.5) * (1 - q.on('endosymbiose', 1, 0.5)), 'center');
    naamBij(ctx, 'endosymbiose', 'opgenomen, niet verteerd', x, 240, q.on('endosymbiose', 1, 0.5), 'center', C.goud); evoSchaal(ctx, 'model · vereenvoudigd'); },

  s18(ctx, t, q) { e11Fill(ctx, C.bgMicro); const cy = q.on('cyanobacterie', 1, 0.5), fase = q.on('cyanobacterie', 1, 1.6), bl = q.on('bladgroenkorrel', 1, 0.8);
    const w = wander(7, t, 6, 0.3); ctx.save(); ctx.translate(w.x * (1 - fase), w.y * (1 - fase)); e11Endo(ctx, 560, 540, 240, fase, { gast: 'cyano' });
    ctx.save(); _e11CelPad(ctx, 560, 540, 232); ctx.clip(); [[-0.45, 0.35, 0.6], [-0.1, 0.55, -0.4], [0.05, -0.55, 1.2]].forEach(([dx, dy, rt]) => e11Mito(ctx, 560 + dx * 240, 540 + dy * 240, 64, rt)); ctx.restore(); ctx.restore();
    naamBij(ctx, 'cel met mitochondriën', null, 560, 250, 1 - cy, 'center', C.mitoR); naamBij(ctx, 'cyanobacterie', 'opgenomen', 560, 860, cy, 'center', E11.cyano);
    pijl(ctx, 880, 540, 1020, 540, C.line, bl, 4, 18); ctx.save(); ctx.globalAlpha = bl; e11Euk(ctx, 1380, 540, 280 * (0.85 + 0.15 * ease(bl)), { chloro: true, focus: 'chloro' }); ctx.restore();
    [[0.3, -0.62], [0.62, 0.42], [-0.15, 0.7]].forEach(([dx, dy], i) => e11Gloed(ctx, 1380 + dx * 280, 540 + dy * 280, 70, bl * (0.6 + 0.3 * Math.sin(t * 3 + i)), C.groen));
    naamBij(ctx, 'bladgroenkorrel', 'bij planten en algen', 1380, 860, bl, 'center', C.groen); },

  s19(ctx, t, q) { e11Fill(ctx, C.bgSchema); const u = e11Pad(t, [[q.at('1,6'), E11T.zuurstof], [q.at('jaar') + 0.8, E11T.euk]]), hv = q.on('half', 1, 0.5), mi = q.on('Misschien', 1, 1.4);
    e11Klok(ctx, 760, 540, 330, { uur: u, merk: hv > 0.01 ? [{ u: E11T.euk, kleur: C.paars, tekst: '±15:30', meta: '1,6 miljard jaar' }] : [] });
    if (mi > 0.01) { ctx.save(); ctx.setLineDash([16, 12]); ctx.strokeStyle = C.kernR; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(760, 540, 330 - 21, e11U(lerp(E11T.euk, e11Tijd(2100), mi)), e11U(E11T.euk)); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'misschien eerder?', null, 545, 862, q.on('ouder', 1, 0.5), 'right', C.kernR);
    const b = Math.sin(t * 0.5) * 5; e11Euk(ctx, 1500, 420 + b, 150); naamBij(ctx, 'eukaryoot', 'cel met een kern', 1500, 640, q.on('eukaryoten', 1, 0.5), 'center');
    naamBij(ctx, 'oudste fossielen', null, 1500, 740, q.on('fossielen', 1, 0.5) * (1 - q.on('Misschien', 1, 0.5)), 'center', C.paars); },

  s20(ctx, t, q) { e11Fill(ctx, C.bgSchema); const x = 360, y = 820, w = 1200, h = 480;
    const g = { stam: 1, bact: q.on('bacteriën', 1, 0.8), arch: q.on('archaea', 1, 1.0), euk: q.on('eukaryoten', 1, 1.2), markA: q.on('nauwst', 1, 0.8) };
    ctx.save(); ctx.globalAlpha = 0.18; e11Boom(ctx, x, y, w, h, { stam: 1, bact: 1, arch: 1, euk: 1 }); ctx.restore();
    const P = e11Boom(ctx, x, y, w, h, g); const iy = P.bact[1] - 100, b = Math.sin(t * 0.6) * 4;
    e11Prok(ctx, P.bact[0], iy + b, 64, 0.2, { kleur: C.teal, a: g.bact }); naamBij(ctx, 'bacteriën', null, P.bact[0], P.bact[1] - 22, g.bact, 'center');
    const aa = clamp(g.arch * 2 - 1, 0, 1); e11Prok(ctx, P.arch[0], iy - b, 50, 0, { kleur: '#A89878', bol: true, a: aa }); naamBij(ctx, 'archaea', null, P.arch[0], P.arch[1] - 22, aa, 'center', g.markA > 0.5 ? C.goud : C.text);
    const ea = clamp(g.euk * 2 - 1, 0, 1); e11EukIcoon(ctx, P.eukTop[0], iy - 10 + b, 40, ea);
    naamBij(ctx, 'eukaryoten', 'cellen met een kern', P.eukTop[0], P.eukTop[1] - 22, ea, 'center', g.markA > 0.5 ? C.goud : C.paars);
    naamBij(ctx, 'nauwst verwant', 'volgens het DNA', P.knA[0] + 30, P.knA[1] + 50, g.markA, 'left', C.goud); },

  // ---------------- H3 Groot worden en het land op
  s21(ctx, t, q) { e11Fill(ctx, C.bgSchema); const u = e11Pad(t, [[0, E11T.euk], [q.at('avonds') + 0.4, 21]]), di = q.on('dier', 1, 0.6), al = q.on('algen', 1, 0.6);
    e11Klok(ctx, 760, 540, 330, { uur: u, toonLeven: false, bogen: [{ van: E11T.leven, tot: u, kleur: E11.leven, a: 0.95 }], merk: di > 0.01 ? [{ u: 21, kleur: C.goud, tekst: '±21:00', meta: 'eerste dieren' }] : [] });
    naamBij(ctx, 'tot ±21:00', 'losse cellen en kleine algen', 1200, 400, q.on('negen', 1, 0.5), 'left', C.groen);
    [[1260, 640, 0.9], [1420, 660, 0.7], [1560, 630, 1.0]].forEach(([ax, ay, s], i) => e11Alg(ctx, ax, ay, s, t + i, al)); if (al > 0.01) metaText(ctx, 'meercellige algen · vergroot', 1200, 720, rgba(C.text2, al), 'left', 22); },

  s22(ctx, t, q) { e11Zeebodem(ctx); e11Golf(ctx, 160, t, 500, 0.12); const vr = ramp(t, 0, 2.0), bl = q.on('bladvormige', 1, 0.6), di = q.on('Dickinsonia', 1, 0.6), ch = q.on('cholesterol', 1, 0.6);
    e11Mini(ctx, E11T.ediacara, { meta: '±575 miljoen jaar geleden', tekst: '±21:00' });
    [[300, 800, 420, 0.05], [470, 790, 300, -0.05], [1500, 790, 380, 0.07], [1660, 800, 260, -0.04]].forEach(([x, y, h, b], i) => e11Frond(ctx, x, y, h, { buig: b + 0.04 * Math.sin(t * 0.7 + i * 1.3), a: vr }));
    e11Gloed(ctx, 960, 820, 300, Math.max(ch * (0.6 + 0.4 * Math.sin(t * 3)), 0.6 * q.on('schijven', 1, 0.5) * (1 - q.on('Dickinsonia', 1, 0.5))), C.goud);
    e11Dickinsonia(ctx, 880 + t * 6, 820, 520, { plat: 0.42 + 0.01 * Math.sin(t), a: vr });
    e11NaamMeta(ctx, 'Dickinsonia', 'tot ±1,4 m · cholesterol: een dier', 960, 640, di, ch, 'center', C.goud);
    naamBij(ctx, 'bladvormige wezens op een steel', null, 380, 300, bl, 'center'); evoSchaal(ctx, 'reconstructie'); },

  s23(ctx, t, q) { e11Zeebodem(ctx); e11Golf(ctx, 160, t, 500, 0.12); e11Mini(ctx, e11Pad(t, [[q.at('539'), E11T.ediacara], [q.at('geleden') + 0.6, E11T.camb]]), { meta: '±539 miljoen jaar geleden', tekst: '±21:10' });
    const ho = q.on('hoofdgroepen', 1, 2.0), og = q.on('ogen', 1, 0.5) * (1 - q.on('poten', 1, 0.5)), sc = q.on('schalen', 1, 0.5) * (1 - q.on('Dat', 1, 0.8));
    [[180, 790, 'spons', 120], [1120, 800, 'schelp'], [1240, 790, 'spons', 90], [300, 830, 'schelp'], [1700, 800, 'spons', 140], [1380, 840, 'schelp'], [860, 840, 'schelp'], [1820, 830, 'schelp']].forEach(([x, y, s, h], i) => { const a = clamp(ho * 8 - i, 0, 1);
      if (s === 'spons') e11Spons(ctx, x, y, h, '#C9A35C', a); else { e11Schelp(ctx, x, y, 1.5, '#B8A07A', a); e11Gloed(ctx, x, y, 40, sc * a * 0.8); } });
    [[400, 800, 150, 0.2], [620, 830, 120, -0.4], [1500, 810, 140, 3.0]].forEach(([x, y, l, r], i) => { const v = 14 + i * 3, dx = Math.cos(r) * v * t, dy = Math.sin(r) * v * t * 0.55;
      ctx.save(); ctx.translate(x + dx, y + dy); ctx.scale(1, 0.55); e11Trilobiet(ctx, 0, 0, l, { rot: r + 0.05 * Math.sin(t * 0.8 + i) }); ctx.restore(); e11Gloed(ctx, x + dx + Math.cos(r) * l * 0.32, y + dy + Math.sin(r) * l * 0.18, 30, og * 0.9); e11Gloed(ctx, x + dx, y + dy, 70, sc * 0.6); });
    const ax = 700 + t * 22, ay = 440 + Math.sin(t * 0.7) * 16; e11Anomalocaris(ctx, ax, ay, 560, { rot: 0.1 + Math.sin(t * 0.5) * 0.04, t: t * 0.9 });
    e11Gloed(ctx, ax + 560 * 0.36, ay - 40, 50, og * 0.8);
    naamBij(ctx, 'Anomalocaris', 'rover · tot ±0,5 m', ax, 260, q.on('Cambrium', 1, 0.6), 'center'); naamBij(ctx, 'trilobieten', 'met ogen en een pantser', 510, 690, og, 'center');
    naamBij(ctx, 'Cambrische explosie', null, 960, 160, q.on('explosie', 1, 0.6), 'center', C.goud); evoSchaal(ctx, 'reconstructie · niet op schaal'); },

  s24(ctx, t, q) { macroNacht(ctx, { horizon: 620, heuvel: false }); e11Sterren(ctx, t, 500, 40, 0.6);
    e11Mini(ctx, e11Pad(t, [[q.at('470'), E11T.camb], [q.at('geleden') + 0.6, E11T.land]]), { meta: '±470 miljoen jaar geleden', tekst: '±21:30' });
    ctx.fillStyle = '#5A5A62'; ctx.fillRect(0, 620, W, 460); vul(ctx, [[-40, 760], [700, 740], [1200, 770], [1960, 750], [1960, 1100], [-40, 1100]], E11.zeeL); e11Golf(ctx, 770, t, 100, 0.25);
    const pl = q.on('planten', 1, 1.6);
    [[300, 750, 70], [380, 752, 50], [460, 748, 64], [560, 750, 46], [640, 746, 58], [740, 742, 40], [820, 744, 52]].forEach(([x, y, h], i) => { const g = clamp(pl * 7 - i * 0.8, 0, 1); if (g > 0.01) e11Cooksonia(ctx, x, y, h * (0.3 + 0.7 * ease(g)), { seed: i, a: Math.min(1, g * 2) }); });
    naamBij(ctx, 'kaal land', null, 1200, 700, 1 - pl, 'center', C.text2);
    const z = q.on('landplantjes', 1, 0.7), dr = q.on('landplantjes', 1, 2.4), zx = 1300, zy = 420, zr = 230;
    zoomCircle(ctx, zx, zy, zr * (0.6 + 0.4 * z), 460, 715, null, z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      for (let i = 0; i < 6; i++) { roundRect(ctx, 1210 + i * 66, 200, 60, 400, 20); shape(ctx, rgba(C.groen, 0.25), _lt(C.groen, 0.2), 1.5); }
      ctx.strokeStyle = rgba('#E6E1D3', 0.85); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { const n = Math.floor(clamp(dr * 1.4 - k * 0.12, 0, 1) * 8); if (!n) continue; ctx.beginPath(); ctx.moveTo(1180, 260 + k * 100); for (let i = 1; i <= n; i++) ctx.lineTo(1180 + i * 55, 260 + k * 100 + Math.sin(i + k) * 26); ctx.stroke(); } });
    if (z > 0.01) metaText(ctx, 'stengel met schimmeldraden · vergroot', zx, zy - zr - 22, rgba(C.grain, z), 'center', 26);
    naamBij(ctx, 'eerste landplantjes', 'een paar cm · zonder wortels', 160, 650, q.on('wortels', 1, 0.6), 'left', C.groen); },

  s25(ctx, t, q) { macroNacht(ctx, { horizon: 620, heuvel: false }); e11Sterren(ctx, t, 500, 40, 0.6);
    e11Mini(ctx, e11Pad(t, [[q.at('425'), E11T.land], [q.at('geleden') + 0.6, E11T.dpoot]]), { meta: '±425 miljoen jaar geleden', tekst: '±21:45' });
    ctx.fillStyle = '#5A5A62'; ctx.fillRect(0, 620, W, 460); vul(ctx, [[-40, 900], [700, 880], [1200, 910], [1960, 890], [1960, 1100], [-40, 1100]], E11.zeeL);
    [[300, 860, 300], [600, 862, 220], [1330, 858, 280], [1620, 860, 200]].forEach(([x, y, h], i) => e11Cooksonia(ctx, x, y, h, { seed: i + 2 }));
    const tt = t * 0.9; e11Duizendpoot(ctx, 820 + tt * 14, 860, 420, { t: tt });
    naamBij(ctx, 'duizendpootachtige', 'een paar cm', 840 + tt * 14, 790, q.on('duizendpoot', 1, 0.5), 'center', C.goud);
    naamBij(ctx, 'eerste dieren op het land', null, 160, 220, q.on('dieren', 1, 0.5), 'left'); evoSchaal(ctx, 'vergroot'); },

  s26(ctx, t, q) { e11Fill(ctx, C.bgSchema); const gy = 720; lijn(ctx, [[200, gy], [1720, gy]], C.line, 2.5);
    const pa = q.on('paddenstoel', 1, 1.8), sc = q.on('schimmels', 1, 0.6), gs = 0.6 + 0.4 * ease(pa);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, gy); ctx.clip(); e11Paddenstoel(ctx, 960, gy, 1.6 * gs, { draden: false }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(0, gy, W, 200); ctx.clip(); ctx.globalAlpha = q.on('grond', 1, 0.8); e11Paddenstoel(ctx, 960, gy, 1.6, { draden: true }); ctx.restore();
    e11Plantje(ctx, 480, gy, 1.6, { a: sc }); muis(ctx, 1440, gy, 16, { houding: 'staan', kijk: -1, a: sc });
    vraagteken(ctx, 720, 520, sc * (0.6 + 0.4 * Math.sin(t * 2)), 80); vraagteken(ctx, 1200, 520, sc * (0.6 + 0.4 * Math.sin(t * 2 + 1.5)), 80);
    naamBij(ctx, 'plant', null, 480, 800, sc, 'center', C.groen); naamBij(ctx, 'schimmel', null, 960, 450, q.on('paddenstoel', 1, 0.5), 'center'); naamBij(ctx, 'dier', null, 1440, 800, sc, 'center'); },

  s28(ctx, t, q) { e11Fill(ctx, C.bgSchema); const x = 260, y = 860, w = 1100, h = 500;
    const g = { stam: 1, bact: 1, arch: 1, euk: 1, sd: q.on('dieren', 1, 1.0), plant: q.on('planten', 1, 0.8), markSD: q.on('DNA', 1, 0.8) };
    const P = e11Boom(ctx, x, y, w, h, g, { grijsEuk: true }); const iy = P.bact[1] - 100, b = Math.sin(t * 0.6) * 4;
    e11Prok(ctx, P.bact[0], iy + b, 64, 0.2, { kleur: C.teal }); e11Prok(ctx, P.arch[0], iy - b, 50, 0, { kleur: '#A89878', bol: true });
    naamBij(ctx, 'bacteriën', null, P.bact[0], P.bact[1] - 22, 1, 'center'); naamBij(ctx, 'archaea', null, P.arch[0], P.arch[1] - 22, 1, 'center');
    const ea = 1 - Math.max(g.sd, g.plant); naamBij(ctx, 'eukaryoten', null, P.eukTop[0], P.eukTop[1] - 22, ea, 'center', C.paars);
    const sa = clamp(g.sd * 2 - 1, 0, 1), k = g.markSD > 0.5 ? C.goud : C.text;
    e11Plantje(ctx, P.plant[0], iy + 40, 0.45, { a: g.plant }); naamBij(ctx, 'planten', null, P.plant[0], P.plant[1] - 22, g.plant, 'center');
    e11Paddenstoel(ctx, P.schim[0], iy + 36, 0.45, { draden: false, a: sa }); naamBij(ctx, 'schimmels', null, P.schim[0], P.schim[1] - 22, sa, 'center', k);
    e11Morganucodon(ctx, P.dier[0], iy + 36 + b * 0.5, 70, { a: sa }); naamBij(ctx, 'dieren', null, P.dier[0], P.dier[1] - 22, sa, 'center', k);
    naamBij(ctx, 'eukaryoten', null, P.knE[0] + 24, P.knE[1] + 34, Math.max(g.sd, g.plant), 'left', C.paars);
    naamBij(ctx, 'zelfde lijn in het DNA', null, 1440, 420, q.on('DNA', 1, 0.5), 'left', C.goud);
    naamBij(ctx, 'chitine in de celwand', null, 1440, 510, q.on('chitine', 1, 0.5), 'left', C.goud); lhb(ctx, 1500, 590, 0.42, { a: q.on('insect', 1, 0.5), rot: 0.4 + Math.sin(t * 0.6) * 0.1 });
    naamBij(ctx, 'opslag als glycogeen', null, 1440, 690, q.on('glycogeen', 1, 0.5), 'left', C.goud); persoon(ctx, 'noor', 1500, 860, 130, { a: q.on('jij', 1, 0.3), t }); },

  s29(ctx, t, q) { macroNacht(ctx, { horizon: 560, heuvel: false }); e11Sterren(ctx, t, 440, 40, 0.5);
    e11Mini(ctx, e11Pad(t, [[0, E11T.dpoot], [1.2, E11T.tikt]]), { meta: '±375 miljoen jaar geleden', tekst: '±22:00' });
    ctx.fillStyle = '#3B4436'; ctx.fillRect(0, 560, W, 520);
    const ph = (Math.sin(t * 1.3 - 1.2) + 1) / 2, lift = ease(ph) * (1 - 0.7 * q.on('pols', 1, 0.6) * (1 - q.on('Hij', 1, 0.6))), tx = 860 + 6 * t, ay = 745, bo = q.on('botjes', 1, 0.6);
    ctx.save(); ctx.translate(tx - 350, ay); ctx.rotate(-0.11 * lift); e11Tiktaalik(ctx, 350, -14 * lift, 1000, { steun: 0.15 + 0.85 * lift, botjes: bo }); ctx.restore();
    vul(ctx, [[-40, 655], [900, 648], [1960, 655], [1960, 1100], [-40, 1100]], rgba('#2E6FBF', 0.38)); lijn(ctx, [[0, 655], [W, 655]], '#9CCBE3', 2); e11Golf(ctx, 655, t, 200, 0.3);
    naamBij(ctx, 'Tiktaalik', '±375 miljoen jaar · tot ±2,7 m', 340, 300, q.on('Tiktaalik', 1, 0.5), 'left');
    naamBij(ctx, 'nek', null, tx + 290, 590, q.on('nek', 1, 0.5) * (1 - q.on('Hij', 1, 0.6)), 'center');
    naamBij(ctx, 'vin met botjes als een pols', 'bovenarm · onderarm · pols', tx + 230, 800, bo, 'right', C.goud);
    naamBij(ctx, 'verwant van de voorouders van viervoeters', null, 340, 380, q.on('verwant', 1, 0.6), 'left', C.text2); evoSchaal(ctx, 'reconstructie'); },

  s30(ctx, t, q) { e11Fill(ctx, C.bgSchema); const tot = lerp(540, 0, q.on('Vijf', 1, q.at('uit') + 0.4)), ma = q.on('massa', 1, 0.6);
    e11Soortenlijn(ctx, 200, 760, 1500, 460, { tot, markeer: ma > 0.5 ? [444, 372, 252, 201, 66] : [] });
    naamBij(ctx, 'vijf massa-extincties', null, 1700, 220, ma, 'right', C.koraal); },

  s31(ctx, t, q) { const kl = q.on('klimaat', 1, 1.2); macroNacht(ctx, { horizon: 620, heuvel: false }); if (kl > 0.01) { ctx.fillStyle = rgba('#5A2A22', 0.45 * kl); ctx.fillRect(0, 0, W, 620); }
    e11Mini(ctx, e11Pad(t, [[q.at('252'), E11T.tikt], [q.at('geleden') + 0.6, E11T.perm]]), { meta: '252 miljoen jaar geleden', tekst: '±22:40' });
    ctx.fillStyle = '#2E2A2C'; ctx.fillRect(0, 620, W, 460); const vu = q.on('vulkaanuitbarstingen', 1, 0.6), tv = q.at('vulkaanuitbarstingen');
    for (let i = 0; i < 4; i++) { const x = 300 + i * 420; vul(ctx, [[x - 210, 650], [x - 55, 470], [x - 30, 478], [x, 470], [x + 30, 478], [x + 55, 470], [x + 210, 650]], '#4A3E3C', '#6A5A56', 2); vul(ctx, [[x - 55, 470], [x - 70, 520], [x - 20, 600], [x + 10, 520]], rgba(C.koraal, 0.5 * vu));
      if (vu > 0.01) { e11Gloed(ctx, x, 470, 80, vu * (0.7 + 0.3 * Math.sin(t * 5 + i)), C.koraal); for (let k = 0; k < 6; k++) { const f = ((t - tv) * 0.18 + k / 6 + hash(i) * 0.3) % 1;
        circ(ctx, x + (hash(i * 9 + k) - 0.5) * 80 + f * 40, 450 - f * 280, 30 + f * 60, rgba('#4A4A56', 0.6 * vu * Math.sin(f * Math.PI))); } } }
    const lv = q.on('vulkaanuitbarstingen', 1, 5); if (lv > 0.005) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W * lv, H); ctx.clip();
      vul(ctx, [[-40, 760], [400, 700], [800, 740], [1200, 690], [1600, 730], [1960, 700], [1960, 840], [-40, 860]], C.koraal, _lt(C.koraal, 0.3), 2); ctx.restore(); }
    naamBij(ctx, 'vulkaanuitbarstingen in Siberië', null, 960, 840, q.on('Siberië', 1, 0.5), 'center');
    const ne = q.on('negen', 1, 0.6); ctx.save(); ctx.globalAlpha = q.on('schatting', 1, 0.6); roundRect(ctx, 520, 235, 880, 140, 18); shape(ctx, rgba(C.bgMicro, 0.8), null);
    for (let i = 0; i < 10; i++) { const weg = i < 9 ? ramp(t, q.at('negen') + 0.2 + i * 0.12, 0.6) : 0; ctx.save(); ctx.globalAlpha *= 1 - 0.88 * weg; e11Schelp(ctx, 580 + i * 84, 305 + weg * 14, 1.6 * (1 - 0.25 * weg), i < 9 ? '#D8C49A' : C.goud); ctx.restore(); if (weg > 0.5) kruis(ctx, 580 + i * 84, 305, 14, (weg - 0.5) * 2 * 0.8, C.koraal); } ctx.restore();
    naamBij(ctx, '±9 op 10 soorten in zee weg', null, 960, 215, ne, 'center', C.koraal); },

  s32(ctx, t, q) { const tP = q.at('planetoïde'), tM = q.at('Mexico'), fl = ramp(t, tM - 0.4, 0.3) * (1 - ramp(t, tM + 0.1, 1.2));
    macroNacht(ctx, { horizon: 700, heuvel: false }); if (t > tM - 0.4) { ctx.fillStyle = rgba('#B0503A', 0.35 * ramp(t, tM - 0.4, 1.5)); ctx.fillRect(0, 0, W, 700); }
    e11Mini(ctx, e11Pad(t, [[q.at('66'), E11T.perm], [q.at('middernacht') + 0.6, E11T.kpg]]), { meta: '66 miljoen jaar geleden', tekst: '±23:40' });
    const vf = ramp(t, tP, tM - tP - 0.4), px = lerp(1700, 1300, vf), py = lerp(120, 640, vf);
    if (t > tP && t < tM + 0.1) { ctx.save(); const gr = ctx.createLinearGradient(lerp(1700, px, 0.2), lerp(120, py, 0.2), px, py); gr.addColorStop(0, rgba(C.koraal, 0)); gr.addColorStop(1, rgba('#F2C94C', 0.9)); ctx.strokeStyle = gr; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lerp(1700, px, 0.2), lerp(120, py, 0.2)); ctx.lineTo(px, py); ctx.stroke(); ctx.restore();
      e11Gloed(ctx, px, py, 70, 0.9, '#F2C94C'); vul(ctx, [[px - 24, py - 6], [px - 12, py - 22], [px + 10, py - 24], [px + 24, py - 6], [px + 18, py + 16], [px - 6, py + 22], [px - 22, py + 12]], '#6A5E54', '#E0B64A', 3); circ(ctx, px - 6, py - 4, 5, '#4E453E'); circ(ctx, px + 8, py + 8, 4, '#4E453E'); }
    if (t > tM - 0.4) { e11Gloed(ctx, 1300, 650, 600, Math.min(1, fl * 1.4 + 0.3 * ramp(t, tM, 1)), '#F2C94C'); ctx.fillStyle = rgba('#F2E6C8', 0.3 * fl); ctx.fillRect(0, 0, W, H); }
    const st = q.on('stierven', 1, 1.6); e11TRex(ctx, 760, 900, 820, { silhouet: true, a: 1 - st });
    const be = q.on('behalve', 1, 0.3), vt = Math.max(0, t - q.at('behalve')); zwaluw(ctx, 980 + vt * 70, 560 - vt * 40, 9, { t: t * 1.6, a: be, kijk: 1 });
    naamBij(ctx, 'planetoïde', null, px + 40, py - 30, ramp(t, tP + 0.2, 0.4) * (t < tM ? 1 : 0), 'left', C.goud); naamBij(ctx, 'inslag bij Mexico', null, 1500, 760, ramp(t, tM + 0.9, 0.5), 'center', C.koraal);
    naamBij(ctx, 'vogels: de dinosauriërs die overleefden', null, 1130, 300, q.on('vogels', 1, 0.5), 'center'); evoSchaal(ctx, 'Tyrannosaurus ±12 m · vogel vergroot'); },

  s33(ctx, t, q) { macroNacht(ctx, { horizon: 640 }); e11Sterren(ctx, t, 520, 50, 0.7); _maan(ctx, 300, 220, 40, 1);
    e11TRex(ctx, 1750, 990, 1500, { t: 0.1 });
    const sn = Math.sin(t * 5) * 0.5 + 0.5, ach = 0.6 + 0.4 * Math.sin(t * 0.6); ctx.save(); ctx.translate(820 - 66, 900); ctx.rotate(0.03 * sn * ach); e11Morganucodon(ctx, 66, 0, 220); ctx.restore();
    [[560, 920], [1020, 920]].forEach(([x, y], j) => { for (let k = 0; k < 5; k++) { ctx.save(); ctx.translate(x, y); ctx.rotate(-1.2 + k * 0.5 + Math.sin(t * 0.8 + k + j) * 0.03); ctx.beginPath(); ctx.ellipse(0, -60, 14, 64, 0, 0, 6.283); shape(ctx, '#4F7A3C', _lt('#4F7A3C', 0.2), 1.5); ctx.restore(); } });
    e11NaamMeta(ctx, 'klein zoogdier uit het Krijt', 'waarschijnlijk vooral ’s nachts actief', 820, 700, 1, q.on('nachts', 1, 0.6));
    naamBij(ctx, 'Tyrannosaurus', 'heup ±4 m', 1500, 300, 1, 'center'); evoSchaal(ctx, 'reconstructie · niet op schaal'); },

  s34(ctx, t, q) { macroNacht(ctx, { horizon: 640 }); e11Sterren(ctx, t, 520, 50, 0.5);
    for (let k = 0; k < 4; k++) circ(ctx, 1500 + k * 60, 560 - k * 60, 40 + k * 16, rgba('#4A4A56', 0.4));
    const sn = Math.sin(t * 5) * 0.5 + 0.5; ctx.save(); ctx.translate(900, 840); ctx.rotate(0.03 * sn); e11Morganucodon(ctx, 60, 0, 220); ctx.restore();
    vraagteken(ctx, 1300, 600, 0.6 + 0.4 * q.on('zoogdieren', 1, 0.5), 90); },

  s36(ctx, t, q) { e11Fill(ctx, C.bgSchema); const x0 = 200, x1 = 1460, X = (mj) => x0 + (90 - mj) / 90 * (x1 - x0), ya = 780, ym = 480;
    lijn(ctx, [[x0, ya], [x1, ya]], C.line, 2.5); [90, 66, 0].forEach(m => metaText(ctx, m ? String(m) : 'nu', X(m), ya + 38, m === 66 ? C.koraal : C.text2, 'center', 26)); metaText(ctx, 'MILJOEN JAAR GELEDEN', x1, ya + 76, C.text2, 'right', 24);
    const ti = q.on('Tien', 1, 0.6); if (ti > 0.01) { ctx.save(); ctx.globalAlpha = ti; metaText(ctx, '56', X(56), ya + 38, C.goud, 'center', 26); lijn(ctx, [[X(56), 200], [X(56), ya]], rgba(C.goud, 0.4), 2); ctx.restore(); }
    lijn(ctx, [[X(66), 180], [X(66), ya]], rgba(C.koraal, 0.8), 4);
    ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(90), ym); ctx.lineTo(X(66), ym); ctx.stroke();
    const st = q.on('stierven', 1, 1.0); for (const y of [440, 520, 400, 560]) { const xe = X(y === 400 || y === 560 ? 67 : 70); ctx.strokeStyle = rgba(C.line, 0.55 * (1 - 0.6 * st)); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(84), ym); ctx.quadraticCurveTo(X(76), y, xe, y); ctx.stroke(); if (st > 0.05) kruis(ctx, xe + 12, y, 8, st, C.koraal); }
    const gr = q.on('ontstonden', 1, 2.6), pr = q.on('primaten', 1, 0.6), pa = q.on('paardachtigen', 1, 0.6);
    [200, 270, 340, 410, 480, 550, 620, 690, 750].forEach((y, i) => { const U = ease(clamp(gr * 1.6 - Math.abs(i - 4) * 0.08, 0, 1)); const uu = y === ym ? Math.max(U, q.on('overlevers', 1, 1.0) * 0.12) : U; if (uu <= 0.005) return;
      const gm = i === 0 ? pr : i === 8 ? pa : 0; ctx.strokeStyle = gm > 0.5 ? C.goud : C.line; ctx.lineWidth = gm > 0.5 ? 6 : 5;
      ctx.beginPath(); ctx.moveTo(X(66), ym); for (let k = 1; k <= 30; k++) { const s = k / 30 * uu, a = (1 - s) * (1 - s), b = 2 * s * (1 - s), c = s * s; ctx.lineTo(a * X(66) + b * X(60) + c * X(0), a * ym + b * y + c * y); } ctx.stroke(); });
    naamBij(ctx, 'vroege primaten', '±56 miljoen jaar', X(0) + 20, 210, pr, 'left', C.goud); naamBij(ctx, 'vroege paardachtigen', '±56 miljoen jaar', X(0) + 20, 750, pa, 'left', C.goud);
    naamBij(ctx, 'inslag', null, X(66), 160, 1, 'center', C.koraal); naamBij(ctx, 'zoogdieren', null, X(90), 450, 1, 'left');
    naamBij(ctx, 'geen grote dinosauriërs meer', null, X(30), 150, q.on('wereld', 1, 0.5) * (1 - q.on('Tien', 1, 0.5)), 'center', C.text2); evoSchaal(ctx, 'vereenvoudigd'); },

  s37(ctx, t, q) { e11Fill(ctx, C.bgSchema); const x0 = 160, w = 1100, y0 = 520;
    e11Mini(ctx, e11Pad(t, [[0, E11T.kpg], [q.at('geleden') + 0.6, E11T.chimp]]), { x: 260, y: 250, r: 90, tekst: '±23:58', bogen: [{ van: 23, tot: 24, kleur: C.goud, a: 0.5 }] });
    metaText(ctx, 'HET LAATSTE UUR', x0, y0 - 40, C.grain, 'left', 26);
    e11Balk(ctx, x0, y0, w, [0, 10, 20, 30, 40, 50, 60].map(m => [m / 60, m === 60 ? '24:00' : '23:' + String(m).padStart(2, '0')]));
    const xk = x0 + w * (60 - 20.9) / 60, xc = x0 + w * (60 - 2.2) / 60; lijn(ctx, [[xk, y0 - 20], [xk, y0 + 80]], C.koraal, 4); naamBij(ctx, 'inslag', '23:39', xk - 30, y0 - 80, 1, 'right', C.koraal);
    const zt = q.on('zes', 1, 0.6); if (zt > 0.01) { ctx.save(); ctx.globalAlpha = zt; ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(x0 + w * (60 - 2.5) / 60, y0, w * 0.6 / 60, 60); lijn(ctx, [[xc, y0 - 20], [xc, y0 + 80]], C.goud, 4); ctx.restore(); }
    naamBij(ctx, '6 tot 8 miljoen jaar', '±2 min voor 24:00', xc + 10, y0 - 130, q.on('minuten', 1, 0.5), 'right', C.goud);
    const ch = q.on('chimpansee', 1, 1.0), vo = q.on('voorouder', 1, 0.6), bx = 1560, by = 760, tk = (x2, y2) => e11Groei(ctx, [bx, by], [x2, y2], ch, C.line, 5);
    e11Groei(ctx, [bx, by + 50], [bx, by], vo, C.line, 5); tk(bx - 160, by - 300); tk(bx + 160, by - 300);
    if (vo > 0.01) circ(ctx, bx, by, 9, C.bgSchema, C.goud, 3.5);
    persoon(ctx, 'noor', bx + 160, by - 330, 150, { a: q.on('chimpansee', 1, 0.3), t }); chimp(ctx, bx - 160, by - 330, 0.9, { a: q.on('chimpansee', 1, 0.3) });
    naamBij(ctx, 'mens', null, bx + 160, by - 520, ch, 'center'); naamBij(ctx, 'chimpansee', null, bx - 160, by - 520, ch, 'center');
    naamBij(ctx, 'gemeenschappelijke voorouder', null, bx, by + 100, vo, 'center', C.goud); },

  s38(ctx, t, q) { e11Fill(ctx, C.bgSchema); const x0 = 160, y0 = 420, w = 1500;
    e11Mini(ctx, e11Pad(t, [[0, E11T.chimp], [q.at('middernacht') + 0.6, 23.998]]), { x: 1790, y: 190, r: 80, tekst: '23:59:54', bogen: [{ van: 23, tot: 24, kleur: C.goud, a: 0.5 }] });
    metaText(ctx, 'DE LAATSTE MINUUT', x0, y0 - 40, C.grain, 'left', 26);
    e11Balk(ctx, x0, y0, w, [0, 10, 20, 30, 40, 50, 60].map(s => [s / 60, s === 60 ? '24:00' : '23:59:' + String(s).padStart(2, '0')]));
    const zs = q.on('zes', 1, 1.0); if (zs > 0.01) { const xs = x0 + w * (1 - 6 / 60 * zs); roundRect(ctx, xs, y0, x0 + w - xs, 60, 8); shape(ctx, C.goud, _lt(C.goud, 0.3), 2); }
    naamBij(ctx, 'Homo sapiens', '±300.000 jaar · ±6 seconden', 1660, 340, q.on('Homo', 1, 0.5), 'right', C.goud); persoon(ctx, 'noor', 1760, 560, 160, { a: q.on('Homo', 1, 0.3), t });
    const zc = q.on('schrift', 1, 0.8), zx = 1250, zy = 680, zr = 140;
    lijn(ctx, [[x0 + w * 59.9 / 60, y0 - 10], [x0 + w * 59.9 / 60, y0 + 70]], rgba(C.koraal, q.on('schrift', 1, 0.5)), 3);
    zoomCircle(ctx, zx, zy, zr * (0.6 + 0.4 * zc), x0 + w - 3, y0 + 60, 'laatste seconde · vergroot', zc, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      roundRect(ctx, zx - 90, zy - 30, 180, 50, 8); shape(ctx, C.goud, _lt(C.goud, 0.3), 2); roundRect(ctx, zx + 72, zy - 30, 18, 50, 6); shape(ctx, C.koraal, _lt(C.koraal, 0.3), 2);
      metaText(ctx, '23:59:59', zx - 50, zy + 60, C.text2, 'center', 20); metaText(ctx, '24:00', zx + 80, zy + 60, C.text2, 'center', 20); });
    naamBij(ctx, 'het eerste schrift', 'laatste ±0,1 seconde', 1090, 680, q.on('schrift', 1, 0.5), 'right', C.koraal);
    naamBij(ctx, 'Hoe werden we mens?', 'volgende extra film', 160, 760, q.on('Hoe', 1, 0.5), 'left', C.text); },

  // ---------------- Samenvatting
  s39(ctx, t, q) { e11Fill(ctx, C.bgSchema); const tA = q.at('avonds'), tR = q.at('rampen');
    const u = e11Pad(t, [[0, 0.001], [0.9, E11T.leven], [tA + 0.8, 21], [q.at('drie'), 21], [tR, 23.6], [q.at('laatste') + 0.6, 23.999]]);
    const gr = e11Pad(t, [[0.9, E11T.leven], [tA + 0.8, 21]]), go = e11Pad(t, [[q.at('drie'), 21], [tR, 24]]);
    const merk = []; if (q.on('zuurstof', 1, 0.4) > 0.5) merk.push({ u: E11T.zuurstof, kleur: C.teal, tekst: 'zuurstof', meta: '±11:00' }); if (q.on('kern', 1, 0.4) > 0.5) merk.push({ u: E11T.euk, kleur: C.paars, tekst: 'cel met een kern', meta: '±15:30' });
    if (q.on('dieren', 1, 0.4) > 0.5) merk.push({ u: 21, kleur: C.goud, tekst: 'dieren, land, rampen', meta: 'vanaf ±21:00' }); if (q.on('rampen', 1, 0.4) > 0.5) merk.push({ u: E11T.kpg, kleur: C.koraal });
    e11Klok(ctx, 760, 480, 310, { uur: u, toonLeven: false, bogen: [{ van: E11T.leven, tot: Math.max(E11T.leven + 0.01, gr), kleur: E11.leven, a: 0.9 }].concat(go > 21.01 ? [{ van: 21, tot: go, kleur: C.goud, a: 0.9 }] : []), merk });
    naamBij(ctx, 'vooral losse cellen', null, 1240, 520, q.on('cellen', 1, 0.5) * (1 - q.on('Daarna', 1, 0.5)), 'left', E11.leven);
    naamBij(ctx, 'Homo sapiens: de laatste 6 seconden', null, 1240, 140, q.on('wij', 1, 0.5), 'left', C.goud); },
});
