// Film 12 · Hoe werden we mens? — geanimeerde scènes (keyframes uit sb12.js als eindbeeld, opgebouwd in de maat van de stem).
// Elke scène tekent eerst haar eigen achtergrond. Geen e12Tag: de speler tekent 'evolutie extra 4/4' zelf.
E12.chimpLoop = (ctx, x0, y, s, t, t0, n, kijk = 1, o = {}) => { const rate = o.rate || 0.9, c = clamp((t - t0) * rate, 0, n), Spx = 76 * s * 1.07;
  if (t <= t0) return chimp(ctx, x0, y, s, Object.assign({ houding: 'staan', kijk }, o.voor || {}));
  if (c >= n) return chimp(ctx, x0 + kijk * Spx * n, y, s, Object.assign({ houding: 'staan', kijk }, o.na || {}));
  return chimp(ctx, x0 + kijk * Spx * Math.floor(c), y, s, { houding: 'lopen', t: c, wereld: true, kijk }); };
// onzichtbaar uitrekenen (positie van een loper) zonder te tekenen
E12.stil = (ctx, f) => { ctx.save(); ctx.globalAlpha = 0; const r = f(); ctx.restore(); return r; };
E12.mix = (A, B, u) => { const m = (a, b) => Array.isArray(a) ? a.map((v, i) => lerp(v, b[i], u)) : lerp(a, b, u); const R = {}; for (const k of ['lean', 'th', 'kn', 'sh', 'el', 'kop']) R[k] = m(A[k], B[k]); return R; };
E12.splitsing = (ctx, o = {}) => { const { y0 = 880, yT = 420, kx = 960, groei = 1, knoop = 0 } = o; const ky = y0 - 0.5 / 7 * (y0 - yT);
  const t1 = [lerp(kx, 620, groei), lerp(ky, yT, groei)], t2 = [lerp(kx, 1300, groei), lerp(ky, yT, groei)];
  if (groei < 1) { ctx.save(); ctx.setLineDash([8, 10]); lijn(ctx, [[kx, ky], [620, yT]], rgba(C.line, 0.45), 3); lijn(ctx, [[kx, ky], [1300, yT]], rgba(C.line, 0.45), 3); ctx.restore(); }
  if (groei > 0.01) { lijn(ctx, [[kx, ky], t1], C.line, 6); lijn(ctx, [[kx, ky], t2], C.line, 6); } lijn(ctx, [[kx, ky], [kx, ky + 50]], C.line, 6);
  e12Gloed(ctx, kx, ky, 70, 70, knoop); circ(ctx, kx, ky, 18, C.bgSchema, knoop > 0.5 ? C.goud : C.line, 5); return { kx, ky }; };
E12.doorstreep = (ctx, x1, y1, x2, y2, aP, aX) => { if (aP > 0.01) pijl(ctx, x1, y1, lerp(x1, x2, ease(aP)), y2, C.text2, 1, 5, 22);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, s = 40 * ease(aX); if (aX > 0.01) { lijn(ctx, [[mx - s, my - s], [mx + s, my + s]], C.koraal, 7); lijn(ctx, [[mx + s, my - s], [mx - s, my + s]], C.koraal, 7); } };
E12.tijdasV = (ctx, y0, yT, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lijn(ctx, [[260, y0], [260, yT]], C.line, 2.5);
  [[7, '7'], [6, '6'], [4, '4'], [2, '2'], [0, 'nu']].forEach(([mj, l]) => { const yy = y0 - (7 - mj) / 7 * (y0 - yT); lijn(ctx, [[252, yy], [268, yy]], C.line, 2); metaText(ctx, l, 236, yy + 8, C.text2, 'right', 26); });
  ctx.save(); ctx.translate(170, (y0 + yT) / 2); ctx.rotate(-Math.PI / 2); metaText(ctx, 'miljoen jaar geleden', 0, 0, C.text2, 'center', 24); ctx.restore(); ctx.restore(); };
E12.eind = (ctx, zinnen, t) => { E12.schema(ctx); zinnen.forEach((z, i) => { const a = i === 0 ? 1 : ramp(t, i * 0.9, 0.5); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, z, 160 + (1 - a) * 30, 260 + i * 110, fTekst(48, 600), C.text, 'left'); ctx.restore(); } });
  const n = zinnen.length, hh = 0.25 + 0.75 * ramp(t, 0, 4.0), yE = 200 + (260 + (n - 1) * 110 + 20 - 200) * hh; ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 200); ctx.lineTo(116, 200); ctx.lineTo(116, yE); ctx.lineTo(130, yE); ctx.stroke(); };
E12.kaartGebieden = [
  ['neanderthaler', NEA_GEBIED, C.oker, 0.3, 15, 60],
  ['denisovamensen', [[78, 56], [86, 54], [90, 50], [84, 48], [78, 50]], C.koraal, 0.4, 97, 60],
  ['Homo floresiensis', [[119, -8], [122, -8.2], [123, -8.8], [120, -9]], C.groen, 0.7, 121, -15],
  ['Homo sapiens', [[-15, 30], [10, 33], [40, 30], [50, 12], [42, -10], [30, -30], [15, -32], [10, -5], [-15, 12]], C.teal, 0.25, 18, -14]];
E12.sepia = (ctx, x, y, w, h, a) => { if (a <= 0.01) return; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = 0.75 * a; ctx.fillStyle = '#8A6E48'; ctx.fillRect(x, y, w, h); ctx.restore(); };
E12.aambeeld = (ctx, x, top, grond) => { vul(ctx, [[x - 150, grond], [x - 120, top + 40], [x - 60, top + 4], [x + 10, top - 4], [x + 80, top + 6], [x + 140, top + 50], [x + 170, grond]], '#6E6A62', '#8A867C', 2); };
E12.warmtePijlen = (ctx, x, g, Hh, kant, t, a, n) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // warmte die uit romp en ledematen straalt: meer pijltjes = meer warmteverlies
  e12Gloed(ctx, x, g - Hh * 0.5, Hh * 0.22, Hh * 0.5, 0.45, C.koraal);
  for (let i = 0; i < n; i++) { const f = (i + 0.5) / n, yy = g - Hh * (0.12 + 0.68 * f), sd = i % 2 ? 1 : -1, p = E12.fr(t * 0.6 + i * 0.37), x0 = x + sd * Hh * 0.08, L = 46;
    ctx.globalAlpha = a * Math.sin(p * Math.PI); pijl(ctx, x0 + sd * p * 30, yy, x0 + sd * (p * 30 + L), yy - 6, C.koraal, 1, 5, 14); } ctx.restore(); };
E12.kniel = (sl, kern) => ({ pose: 'kniel', hoek: { sh: [0.6 + 0.95 * sl, 0.55], el: [0.6 + 0.5 * sl, 1.0] }, hold: kern });
E12.slagsteen = (c, x, y) => { vul(c, [[x - 10, y - 26], [x + 30, y - 30], [x + 36, y - 6], [x - 6, y - 4]], '#8E8A84', '#6E6A64', 2); };

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (neanderthaler en Homo sapiens op schaal, rustig levend)
  title(ctx, t) { lijn(ctx, [[1150, 900], [1820, 900]], C.line, 2);
    e12Mens(ctx, 'neanderthaler', 1330, 900, 165 * 3.6, { kijk: 1, hoek: { kop: 0.06 * Math.sin(t * 0.7) } });
    e12Mens(ctx, 'sapiens', 1620, 900, 172 * 3.6, { kijk: -1, hoek: { kop: 0.05 * Math.sin(t * 0.6 + 1.5) } });
    naamBij(ctx, 'neanderthaler', null, 1330, 945, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1620, 945, 1, 'center', C.teal); },

  // ---------------- Opening: twee groepen over een dal
  s01(ctx, t, q) { e12Steppe(ctx, { horizon: 600 });
    vul(ctx, [[1100, 760], [1350, 700], [1700, 690], [1980, 720], [1980, 900], [1100, 900]], '#34503E');
    e12Vuur(ctx, 1560, 740, 0.55, { t });
    const op = q.on('zien', 1, 0.5);
    e12Mens(ctx, 'neanderthaler', 1470, 745, e12H('neanderthaler', 1.5), { kijk: op > 0.5 ? -1 : 1, hoek: op > 0.5 ? {} : { sh: [0.5, 0.3], kop: 0.25 } });
    e12Mens(ctx, 'neanderthalerV', 1660, 745, e12H('neanderthalerV', 1.5), { kijk: -1, hoek: { kop: op > 0.5 ? 0 : 0.3 } });
    const zien = q.at('zien');
    e12Loopt(ctx, 'sapiens', 900, e12H('sapiens'), t, { x0: 40, x1: 300, t0: 0, tempo: 0.85 }, { hold: (c, x, y) => e12Speer(c, x - 150, y + 150, x + 120, y - 330, { w: 7 }) });
    e12Loopt(ctx, 'sapiens', 905, e12H('sapiens') * 0.95, t, { x0: 200, x1: 540, t0: 0.2, tempo: 0.85 }, { pose: t > zien + 0.3 ? 'wijs' : 'staan' });
    naamBij(ctx, 'Homo sapiens', null, 420, 330, q.on('sapiens'), 'center'); naamBij(ctx, 'neanderthalers', null, 1560, 470, q.on('neanderthalers'), 'center', C.oker);
    evoSchaal(ctx, '±45 000 jaar geleden · Europa · reconstructie'); },

  s02(ctx, t, q) { E12.schema(ctx); const K = e12Kaart(ctx, 160, 150, 1600, 700, { lon: [-25, 165], lat: [-42, 68] });
    const t0 = q.at('leefden'), uit = q.on('Waarom', 1, 1.0);
    E12.kaartGebieden.forEach(([n, P, kl, a, lo, la], i) => { const aan = ramp(t, t0 + i * 0.45, 0.5), dim = i < 3 ? 1 - 0.8 * uit : 1; if (aan <= 0.01) return;
      ctx.save(); ctx.globalAlpha *= aan * dim; e12Gebied(ctx, K, P, kl, { a: i === 3 ? a + 0.15 * uit : a }); ctx.restore(); naamBij(ctx, n, null, K.X(lo), K.Y(la), aan * dim, 'center', kl); });
    vraagteken(ctx, K.X(70), K.Y(15), q.on('enige', 1, 0.5), 120);
    evoSchaal(ctx, '±60 000 jaar geleden · vereenvoudigd'); },

  // ---------------- H1 De splitsing
  s04(ctx, t, q) { macroNacht(ctx, { horizon: 640 });
    const z = ease(ramp(t, q.at('laatste'), 1.6)); const bx = 160, bw = 1600, gw = lerp(bw * 7 / 4000 + 6, bw, z);
    roundRect(ctx, bx, 150, bw, 40, 20); shape(ctx, rgba('#2A3A58', 0.9), C.line, 2); ctx.fillStyle = C.goud; roundRect(ctx, bx + bw - gw, 150, gw, 40, z > 0.9 ? 20 : 6); ctx.fill();
    if (z < 0.99) { metaText(ctx, '4 miljard jaar geleden', bx, 236, rgba(C.text2, 1 - z), 'left', 26); metaText(ctx, 'laatste 7 miljoen jaar', bx + bw, 236, rgba(C.goud, 1 - z), 'right', 26); }
    if (z > 0.01) { metaText(ctx, '7 miljoen jaar geleden', bx, 236, rgba(C.goud, z), 'left', 26); metaText(ctx, 'nu', bx + bw, 236, rgba(C.goud, z), 'right', 26); }
    const s = 3.0 / 1.07 * 1.05, ad = 1 + 0.012 * Math.sin(t * 2.2); ctx.save(); ctx.translate(760, 900); ctx.scale(1, ad); ctx.translate(-760, -900); chimp(ctx, 760, 900, s, { houding: 'zitten' }); ctx.restore();
    persoon(ctx, 'noor', 1180, 905, 165 * 3.0 * 1.03, { kijk: -1, uit: t > q.at('verwanten') ? 'denkt' : 'neutraal' });
    naamBij(ctx, 'chimpansee', q.on('bonobo') > 0.5 ? 'en de bonobo: even verwant' : null, 760, 560, q.on('chimpansee'), 'center');
    metaText(ctx, 'chimpansee en Noor op schaal', 1840, 880, C.text2, 'right', 26); },

  // vraag-alinea: het lege knooppunt onder mens en chimpansee (de vraagkaart volgt)
  s05(ctx, t, q) { E12.schema(ctx); const { kx, ky } = E12.splitsing(ctx, { groei: 0 });
    e12Mens(ctx, 'sapiens', 620, 410, 230); chimp(ctx, 1300, 410, 1.6, { houding: 'staan' });
    naamBij(ctx, 'mens', null, 500, 360, 1, 'right'); naamBij(ctx, 'chimpansee', null, 1440, 360, 1, 'left');
    const p = q.on('voorouder', 1, 0.5); text(ctx, '?', kx, ky + 12, fTekst(26, 800), C.goud, 'center'); e12Ring(ctx, kx, ky, 30 + 8 * Math.sin(t * 3), 30 + 8 * Math.sin(t * 3), p * 0.8); },

  s07(ctx, t, q) { E12.schema(ctx); const y0 = 880, yT = 420;
    E12.tijdasV(ctx, y0, yT, 0.35 + 0.65 * q.on('miljoen', 1, 0.6));
    const groei = ease(ramp(t, q.at('Beide'), 2.0)); const { kx, ky } = E12.splitsing(ctx, { groei, knoop: q.on('voorouder', 1, 0.5) });
    e12Mens(ctx, 'sapiens', 620, yT - 10, 230); chimp(ctx, 1300, yT - 10, 1.6, { houding: 'staan' });
    naamBij(ctx, 'mens', null, 500, yT - 60, 1, 'right'); naamBij(ctx, 'chimpansee', null, 1440, yT - 60, 1, 'left');
    naamBij(ctx, 'gemeenschappelijke voorouder', q.on('zes') > 0.5 ? '±6–8 miljoen jaar · Afrika' : null, kx + 40, ky + 10, q.on('voorouder'), 'left', C.goud);
    text(ctx, '?', kx, ky + 12, fTekst(26, 800), rgba(C.goud, q.on('geen', 1, 0.5)), 'center');
    metaText(ctx, 'beide lijnen even lang veranderd', 1560, 640, rgba(C.text2, q.on('even', 1, 0.6)), 'center', 26);
    E12.doorstreep(ctx, 1160, 300, 780, 300, q.on('stamt', 1, 0.8), q.on('niet', 1, 0.4)); naamBij(ctx, 'stamt niet af van', null, 970, 250, q.on('niet', 1), 'center', C.koraal); },

  // ---------------- H2 Eerst lopen
  s08(ctx, t, q) { E12.schema(ctx); e12Voetafdruk(ctx, 640, 520, 300, 0, {}); e12Schedel(ctx, 'sapiens', 1300, 540, 1.1, { nadruk: C.paars });
    naamBij(ctx, 'rechtop lopen', null, 640, 760, q.on('eerst', 1, 0.5), 'center'); naamBij(ctx, 'grote hersenen', null, 1300, 760, q.on('eerst', 1, 0.5), 'center');
    vraagteken(ctx, 960, 560, 0.4 + 0.6 * q.on('eerst', 1, 0.5), 120); },

  s10(ctx, t, q) { e12Savanne(ctx, { horizon: 640 }); e12Boom(ctx, 560, 900, 1.6); const Hp = e12H('afarensis', 3.6);
    const los = 0.9; let L;
    if (t < los) L = e12Mens(ctx, 'afarensis', 660, 905, Hp, { hoek: { sh: [2.8 - 2.7 * ease(ramp(t, 0.1, 0.7)), -0.1], el: [0.3, 0.2], kop: -0.15 } });
    else L = e12Loopt(ctx, 'afarensis', 905, Hp, t, { x0: 660, x1: 1000, t0: los, tempo: 0.9 }).info;
    const Lt = q.at('meter'), lh = Hp * ease(ramp(t, Lt - 0.3, 1.0)); if (lh > 1) e12Lat(ctx, 1210, 905, lh, lh > Hp * 0.95 ? '1,07 meter' : '');
    const hip = q.on('bekken', 1, 0.5), arm = q.on('armen', 1, 0.5) * (1 - 0.6 * hip);
    if (L && L.hand) { e12Gloed(ctx, L.hand.x - 10, L.hand.y - 50, 60, 110, arm); e12Gloed(ctx, L.hand.x, L.hand.y, 40, 40, q.on('vingers', 1, 0.5) * (1 - 0.6 * hip)); }
    e12Gloed(ctx, 1000, 905 - Hp * 0.4, 70, 110, hip);
    naamBij(ctx, 'Lucy', q.on('Australopithecus') > 0.5 ? 'Australopithecus afarensis · ±3,2 miljoen jaar' : null, 1000, 440, q.on('Lucy'), 'center');
    naamBij(ctx, q.on('vingers') > 0.5 ? 'lange armen, kromme vingers' : 'lange armen', null, 900, 650, q.on('armen'), 'right', C.goud); naamBij(ctx, 'bekken en dijbeen', null, 1080, 790, hip, 'left', C.goud);
    evoSchaal(ctx, 'Ethiopië · reconstructie, beharing aangenomen'); },

  s11(ctx, t, q) { macroNacht(ctx, { horizon: 560, heuvel: false }); const steen = q.on('soortgenoten', 1, 2.0);
    vul(ctx, [[-40, 560], [1960, 560], [1960, H], [-40, H]], _mixHex('#6E685E', '#8E8070', steen));
    for (let i = 0; i < 60; i++) circ(ctx, hash(i * 3) * W, 600 + hash(i * 7) * 300, 3 + hash(i) * 5, rgba('#5E5A52', 0.6));
    const H1 = e12H('afarensis', 3.2) * 1.3, H2 = e12H('afarensis', 3.2) * 1.05, wA = { x0: 420, x1: 1060, t0: 0, tempo: 0.75 }, wB = { x0: 80, x1: 1320, t0: 0.15, tempo: 0.75 };
    const A = E12.stil(ctx, () => e12Loopt(ctx, 'afarensis', 740, H2, t, wA)), B = E12.stil(ctx, () => e12Loopt(ctx, 'afarensis', 830, H1, t, wB));
    const voet = _mixHex('#4E4A44', '#6A5E52', steen);
    for (let i = 0; i < 12; i++) { const px = 330 + i * 82; if (px < A.x - 50) e12Voetafdruk(ctx, px, 700 + (i % 2 ? 14 : -14), 56, Math.PI / 2, { links: i % 2 === 0, kleur: voet }); }
    e12Loopt(ctx, 'afarensis', 740, H2, t, wA);
    for (let i = 0; i < 12; i++) { const px = 120 + i * 96; if (px < B.x - 60) e12Voetafdruk(ctx, px, 870 + (i % 2 ? 18 : -18), 70, Math.PI / 2, { links: i % 2 === 0, kleur: voet }); }
    e12Loopt(ctx, 'afarensis', 830, H1, t, wB);
    naamBij(ctx, 'Laetoli', q.on('Tanzania') > 0.5 ? 'Tanzania · ±3,6 miljoen jaar' : null, 160, 300, q.on('Laetoli'), 'left');
    naamBij(ctx, 'natte vulkanische as', null, 160, 610, q.on('vulkanische') * clamp(1 - 2 * steen, 0, 1), 'left'); naamBij(ctx, 'versteende voetsporen', null, 160, 610, clamp(2 * steen - 1, 0, 1), 'left', C.goud);
    evoSchaal(ctx, 'reconstructie'); },

  s12(ctx, t, q) { E12.schema(ctx); e12AsVlak(ctx, 300, 220, 560, 640, { seed: 4 }); e12AsVlak(ctx, 1060, 220, 560, 640, { seed: 9 });
    e12Voetafdruk(ctx, 580, 560, 420, 0); e12Voetafdruk(ctx, 1340, 560, 400, 0, { aap: true });
    const r = q.on('teen', 1, 0.5), gx = 580 - 0.42 * 0.22 * 420, gy = 560 - 0.45 * 420; e12Gloed(ctx, gx, gy, 70, 70, r); e12Ring(ctx, gx, gy, 46, 50, r);
    e12Ring(ctx, 1340 - 0.42 * 0.62 * 400, 560 - 0.18 * 400, 46, 50, q.on('andere', 1, 0.5), C.text2, 4);
    const p = ramp(t, q.at('hiel'), q.at('tenen') - q.at('hiel') + 0.4); if (p > 0.01) { pijl(ctx, 700, 740, 700, lerp(740, 380, p), C.goud, 1, 5, 22);
      e12Gloed(ctx, lerp(580, gx, Math.max(0, p - 0.6) / 0.4), lerp(560 + 0.36 * 420, gy, p), 50, 50, Math.sin(Math.PI * Math.min(1, p * 1.05))); }
    naamBij(ctx, 'hiel → tenen', null, 730, 560, q.on('hiel'), 'left', C.goud);
    naamBij(ctx, 'Laetoli', 'grote teen in lijn · 18–26 centimeter, vergroot', 580, 150, 1, 'center'); naamBij(ctx, 'chimpansee', 'grote teen opzij', 1340, 150, 1, 'center'); },

  s13(ctx, t, q) { E12.schema(ctx); const vL = 450 * ease(ramp(t, q.at('450') - 0.4, 1.2)), vC = 400 * ease(ramp(t, q.at('chimpansee') - 0.2, 1.0));
    e12Cilinder(ctx, 520, 820, Math.round(vC / 10) * 10, { label: 'chimpansee', schaal: 0.3 }); e12Cilinder(ctx, 960, 820, Math.round(vL / 10) * 10, { label: 'soort van Lucy', meta: 'afarensis', schaal: 0.3 });
    e12Cilinder(ctx, 1400, 820, 0, { label: 'later', schaal: 0.3, a: 0.5 });
    chimp(ctx, 330, 820, 1.4, { houding: 'zitten' }); e12Mens(ctx, 'afarensis', 760, 820, 250);
    e12Gloed(ctx, 760, 820 - 250 * 0.3, 50, 100, q.on('Rechtop', 1, 0.6)); naamBij(ctx, 'eerst: rechtop lopen', null, 760, 520, q.on('Rechtop', 1, 0.6), 'center', C.goud);
    naamBij(ctx, 'herseninhoud', 'gemiddelde per soort · kubieke centimeter', 960, 200, 1, 'center', C.paars); },

  // ---------------- H3 Hersenen, werktuigen en vuur
  s14(ctx, t, q) { e12Savanne(ctx, { horizon: 640 }); const He = e12H('erectus', 3.4);
    e12Mens(ctx, 'afarensis', 1300, 905, e12H('afarensis', 3.4), { kijk: -1 });
    const E = e12Loopt(ctx, 'erectus', 905, He, t, { x0: 300, x1: 900, t0: 0, tempo: 0.8 });
    e12Gloed(ctx, E.x, 905 - He * 0.27, 70, He * 0.3, q.on('benen', 1, 0.5));
    naamBij(ctx, 'Homo erectus', q.on('rechtopgaande') > 0.5 ? 'de rechtopgaande mens · ±1,9 miljoen jaar' : null, 900, 230, q.on('erectus'), 'center');
    naamBij(ctx, 'Lucy', null, 1300, 480, 1, 'center'); naamBij(ctx, 'lange benen', null, 700, 780, q.on('benen'), 'right', C.goud);
    evoSchaal(ctx, 'op schaal · reconstructie'); },

  s15(ctx, t, q) { E12.schema(ctx); lijn(ctx, [[640, 860], [1280, 860]], C.line, 2);
    e12Mens(ctx, 'afarensis', 800, 860, 107 * 3.3, { hoek: { kop: 0.04 * Math.sin(t) } }); e12Mens(ctx, 'erectus', 1120, 860, 175 * 3.3, { kijk: -1, hoek: { kop: 0.04 * Math.sin(t + 1) } });
    naamBij(ctx, 'Lucy', null, 800, 440, 1, 'center'); naamBij(ctx, 'Homo erectus', null, 1120, 220, 1, 'center');
    vraagteken(ctx, 960, 300, q.on('nieuw', 1, 0.5), 110); evoSchaal(ctx, 'op schaal'); },

  s17(ctx, t, q) { E12.schema(ctx); const x0 = 160, w = 1100, X = (mj) => x0 + (4 - mj) / 4 * w;
    lijn(ctx, [[x0, 420], [x0 + w, 420]], C.line, 2.5); [4, 3, 2, 1, 0].forEach(m => { lijn(ctx, [[X(m), 412], [X(m), 428]], C.line, 2); metaText(ctx, m ? String(m) : 'nu', X(m), 466, C.text2, 'center', 26); });
    metaText(ctx, 'miljoen jaar geleden', x0, 506, C.text2, 'left', 24);
    const bA = ease(ramp(t, q.at('Lucy') - 0.3, 0.8));
    if (bA > 0.01) { roundRect(ctx, X(3.9), 300, (X(2.8) - X(3.9)) * bA, 40, 20); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'afarensis', X(3.35), 280, fTekst(34, 600), rgba(C.text, bA), 'center'); }
    roundRect(ctx, X(1.9), 300, X(0.11) - X(1.9), 40, 20); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'Homo erectus', X(1.0), 280, fTekst(34, 600), C.text, 'center');
    metaText(ctx, 'allebei rechtop', X(2.4), 230, rgba(C.goud, q.on('rechtop', 1, 0.6)), 'center', 26);
    const ar = ramp(t, q.at('bijna'), 1.0); if (ar > 0.01) pijl(ctx, X(3.9), 560, lerp(X(3.9), X(1.9), ar), 560, C.goud, 1, 4, 18); text(ctx, 'bijna 2 miljoen jaar', X(2.9), 620, fTekst(34, 700), rgba(C.goud, ar), 'center');
    const vE = 900 * ease(ramp(t, q.at('hersenen') - 0.2, 1.6)); e12Cilinder(ctx, 1460, 860, 450, { label: 'Lucy', schaal: 0.26, w: 110 }); e12Cilinder(ctx, 1700, 860, Math.round(vE / 10) * 10, { label: 'erectus', schaal: 0.26, w: 110 });
    naamBij(ctx, 'hersenen', q.on('twee', 2) > 0.5 ? 'twee keer zo groot' : 'kubieke centimeter', 1580, 230, 1, 'center', C.paars); },

  s18(ctx, t, q) { e12Steppe(ctx, { horizon: 640 }); const He = e12H('erectus', 3.2), t1 = q.at('handbijlen'), t2 = q.at('druppel') + 0.3;
    const werk = t > t1 - 0.6 && t < t2; const sl = werk ? E12.slag(t - t1 + 0.6, 0.8) : 0.15;
    const hd = E12.stil(ctx, () => e12Mens(ctx, 'erectus', 700, 900, He, E12.kniel(0, null))).hand, kx = hd.x + 10, ky = hd.y + 34; E12.aambeeld(ctx, kx, ky + 22, 900);
    e12Mens(ctx, 'erectus', 700, 900, He, E12.kniel(sl, E12.slagsteen));
    const u = ease(ramp(t, t1, t2 - t1)); e12Knol(ctx, kx, ky, 60, u, { rot: -1.45 });
    if (werk) e12Schilfers(ctx, kx, ky - 20, E12.klap(t - t1 + 0.6, 0.8), Math.floor((t - t1) / 0.8) + 3);
    const ax = q.on('druppel', 1, 0.6); if (ax > 0.01) { ctx.save(); ctx.globalAlpha *= ax; roundRect(ctx, 1450, 150, 300, 300, 18); shape(ctx, rgba(C.bgSchema, 0.85), C.goud, 2); ctx.restore(); } e12Handbijl(ctx, 1600, 300, 220, { a: ax }); naamBij(ctx, 'handbijl', 'vergroot · ±20 centimeter', 1600, 500, ax, 'center'); metaText(ctx, 'oudste ±1,76 miljoen jaar', 1600, 562, rgba(C.grain, ax), 'center', 26);
    const vu = q.on('Zuid', 1, 0.8); e12Vuur(ctx, 1300, 880, 1.1, { t, a: vu, aan: q.on('vuur', 1, 0.6) * 0.9 });
    vraagteken(ctx, 1300, 740, q.on('misschien', 1, 0.5), 80); naamBij(ctx, 'vuur gebruikt?', '±1 miljoen jaar · Zuid-Afrika', 1240, 640, vu, 'center', C.goud); evoSchaal(ctx, 'reconstructie'); },

  // ---------------- H4 De neanderthaler
  s19(ctx, t, q) { e12Steppe(ctx, { horizon: 620 }); const Hm = e12H('neanderthaler', 3.3), Hv = e12H('neanderthalerV', 3.3);
    e12Loopt(ctx, 'neanderthalerV', 905, Hv, t, { x0: 420, x1: 1200, t0: 0, tempo: 0.8 });
    e12Loopt(ctx, 'neanderthaler', 905, Hm, t, { x0: 200, x1: 930, t0: 0, tempo: 0.8 }, { hold: (c, x, y) => e12Speer(c, x - 170, y + 170, x + 130, y - 340, { w: 8 }) });
    const ka = q.on('Europa', 1, 0.6), K = e12Kaart(ctx, 1380, 110, 480, 300, { lon: [-15, 95], lat: [25, 62], a: 0.5 + 0.5 * ka });
    ctx.save(); ctx.globalAlpha *= ka; e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.35 }); ctx.restore();
    metaText(ctx, 'Europa, West- en Centraal-Azië', 1860, 460, rgba(C.oker, ka), 'right', 22);
    const nd = q.on('Neandertal', 1, 0.5); if (nd > 0.01) { circ(ctx, K.X(6.9), K.Y(51.2), 9 + 3 * Math.sin(t * 4), rgba(C.goud, nd)); naamBij(ctx, 'Neandertal', q.on('Botten') > 0.5 ? 'Duitsland · eerste als andere soort herkend' : 'Duitsland', 1840, 540, nd, 'right', C.goud); }
    naamBij(ctx, 'neanderthaler', q.on('vierhonderdduizend') > 0.5 ? '±400 000–40 000 jaar geleden' : null, 160, 200, 1, 'left');
    evoSchaal(ctx, 'reconstructie · kleding aangenomen'); },

  s20(ctx, t, q) { e12Steppe(ctx, { horizon: 520 }); const k = 3.4, g = 880, Hm = 165 * k, Hv = 155 * k, Hs = 172 * k;
    e12Mens(ctx, 'neanderthaler', 760, g, Hm); e12Mens(ctx, 'neanderthalerV', 990, g, Hv, { a: q.on('vrouwen', 1, 0.3) }); e12Mens(ctx, 'sapiens', 1270, g, Hs, { kijk: -1 });
    const b = q.on('borstkas', 1, 0.5), oa = q.on('onderarmen', 1, 0.5), ob = q.on('onderbenen', 1, 0.5), m = q.on('Mannen', 1, 0.5);
    e12Gloed(ctx, 760, g - Hm * 0.66, 90, 80, b * (1 - 0.5 * oa)); e12Gloed(ctx, 790, g - Hm * 0.45, 50, 70, oa * (1 - 0.5 * m)); e12Gloed(ctx, 760, g - Hm * 0.14, 50, 80, ob * (1 - 0.5 * m));
    naamBij(ctx, 'neanderthaler', m > 0.5 ? '♂ ±1,65 meter' : null, 760, 240, 1, 'center', C.oker); naamBij(ctx, 'vrouw', '±1,55 meter', 990, 300, q.on('vrouwen'), 'center', C.oker);
    naamBij(ctx, 'Homo sapiens', m > 0.5 ? '±1,72 meter' : null, 1270, 215, 1, 'center', C.teal);
    naamBij(ctx, 'brede, diepe borstkas', null, 590, 520, b, 'right', C.goud); naamBij(ctx, 'korte onderarm', null, 590, 660, oa, 'right', C.goud); naamBij(ctx, 'kort onderbeen', null, 590, 820, ob, 'right', C.goud);
    const wa = q.on('bouw', 1, 0.8); E12.warmtePijlen(ctx, 1270, g, Hs, 1, t, wa, 9); E12.warmtePijlen(ctx, 760, g, Hm, -1, t, wa, 4);
    naamBij(ctx, 'minder warmteverlies', 'compact lichaam: minder huid per kilo', 590, 420, wa, 'right', C.text); naamBij(ctx, 'meer warmteverlies', null, 1460, 420, wa, 'left', C.text); evoSchaal(ctx, 'op schaal'); },

  s21(ctx, t, q) { E12.schema(ctx); e12Schedel(ctx, 'neanderthaler', 520, 470, 1.25, { nadruk: C.paars }); e12Schedel(ctx, 'sapiens', 1180, 470, 1.25, { nadruk: C.paars });
    const ll = q.on('lang', 1, 0.5), wb = q.on('wenkbrauwboog', 1, 0.5), ns = q.on('neus', 1, 0.5), kn = q.on('kin', 1, 0.5);
    e12Gloed(ctx, 640, 380, 60, 34, wb); e12Gloed(ctx, 668, 482, 40, 40, ns); e12Gloed(ctx, 640, 590, 50, 40, kn); e12Gloed(ctx, 1240, 590, 50, 40, kn);
    naamBij(ctx, 'wenkbrauwboog', null, 640, 300, wb, 'center', C.goud); naamBij(ctx, 'grote neus', null, 720, 500, ns, 'left', C.goud); naamBij(ctx, 'geen kin', null, 650, 650, kn, 'left', C.goud);
    naamBij(ctx, 'lang en laag', null, 330, 290, ll, 'center'); naamBij(ctx, 'kin', null, 1250, 650, kn, 'left', C.goud); naamBij(ctx, 'hoog en rond', null, 1180, 230, ll, 'center');
    naamBij(ctx, 'neanderthaler', null, 520, 790, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1180, 790, 1, 'center', C.teal);
    const ha = q.on('hersenen', 1, 0.4), h = ease(ramp(t, q.at('hersenen') - 0.2, 1.5)); e12Cilinder(ctx, 1560, 850, Math.round(1500 * h / 10) * 10, { schaal: 0.3, w: 100, label: null, a: ha });
    e12Cilinder(ctx, 1760, 850, Math.round(1350 * h / 10) * 10, { schaal: 0.3, w: 100, label: null, a: ha }); metaText(ctx, 'hersenen', 1660, 280, rgba(C.paars, ha), 'center', 26); },

  // vraag-alinea: een neanderthaler half achter een rotsblok (hoe liep hij?) — de vraagkaart volgt
  s22(ctx, t, q) { e12Steppe(ctx, { horizon: 600 }); e12Mens(ctx, 'neanderthaler', 960, 900, e12H('neanderthaler', 3.4), { hoek: { kop: 0.05 * Math.sin(t * 1.3) } });
    vul(ctx, [[640, 905], [700, 720], [820, 640], [1000, 610], [1160, 650], [1280, 760], [1320, 905]], '#5E5A54', '#7A746A', 3); vul(ctx, [[760, 700], [900, 650], [1040, 640], [960, 690]], '#6E6A62');
    vraagteken(ctx, 1330, 360, 0.5 + 0.5 * q.on('liep', 1, 0.5), 120); },

  s24(ctx, t, q) { E12.schema(ctx); const g = 880; lijn(ctx, [[300, g], [1720, g]], C.line, 2);
    const W1 = e12Loopt(ctx, 'neanderthaler', g, 560, t, { x0: 1000, x1: 1300, t0: 0, tempo: 0.75 });
    e12Gloed(ctx, W1.x, g - 560 * 0.28, 60, 160, q.on('gestrekte', 1, 0.5) * (1 - q.on('1911', 1, 0.5)));
    const p = q.on('1911', 1, 0.6); e12Prent(ctx, 380, 300, 480, 600, p);
    const r = ease(ramp(t, q.at('rechtgezet') - 0.2, 1.4)), ST = e12Pose('staan'), BO = e12Pose('boule');
    if (p > 0.01) { ctx.save(); ctx.globalAlpha *= p; e12Mens(ctx, 'neanderthaler', 620, g - 10, 560, { hoek: E12.mix(BO, ST, r) }); ctx.restore(); E12.sepia(ctx, 380, 300, 480, 600, p * (1 - r)); }
    const art = q.on('artrose', 1, 0.5) * (1 - r); e12Gloed(ctx, 700, g - 10 - 560 * 0.55, 60, 70, art, C.koraal); e12Gloed(ctx, 650, g - 10 - 560 * 0.26, 45, 45, art, C.koraal);
    if (r > 0.01) pijl(ctx, 880, 600, lerp(880, 1060, r), 600, C.line, 1, 5, 22);
    naamBij(ctx, '1911', q.on('artrose') > 0.5 ? 'primitief beeld · oude man met artrose' : q.on('primitief') > 0.5 ? 'beeld van een primitief wezen' : 'reconstructie', 620, 240, p, 'center', C.koraal);
    naamBij(ctx, 'later rechtgezet', 'gewoon rechtop', 1300, 220, r, 'center', C.groen); naamBij(ctx, 'gestrekte benen', null, 1300, 220, q.on('gestrekte') * (1 - r), 'center', C.goud); },

  s25(ctx, t, q) { e12Steppe(ctx, { horizon: 600 }); const Hn = e12H('neanderthaler', 3.4), t1 = q.at('kern'), tk = q.at('klap'), ts = q.at('speren');
    const voorb = t > t1 - 0.4 && t < tk - 0.3; let sl = voorb ? E12.slag(t - t1 + 0.4, 0.75) : 0.15;
    if (t >= tk - 0.3 && t < tk + 0.4) sl = t < tk + 0.05 ? ease((t - tk + 0.3) / 0.3) * 1.15 : 0; // één grote klap
    const hd = E12.stil(ctx, () => e12Mens(ctx, 'neanderthaler', 700, 905, Hn, E12.kniel(0, null))).hand, cx = hd.x + 20, cy = hd.y + 46; E12.aambeeld(ctx, cx + 20, cy + 8, 905);
    e12Mens(ctx, 'neanderthaler', 700, 905, Hn, E12.kniel(sl, E12.slagsteen)); vul(ctx, [[cx - 70, cy + 8], [cx - 10, cy - 34], [cx + 80, cy - 36], [cx + 120, cy + 4]], '#B8A27E', '#8A7656', 2);
    const vv = ramp(t, t1, tk - t1); for (let i = 0; i < 5; i++) if (vv > (i + 0.5) / 5) lijn(ctx, [[cx - 40 + i * 30, cy - 30], [cx - 30 + i * 30, cy - 4]], '#8A7656', 2);
    if (voorb) e12Schilfers(ctx, cx + 10, cy - 30, E12.klap(t - t1 + 0.4, 0.75), Math.floor((t - t1) / 0.75) + 7, 4);
    const sp = ramp(t, q.at('speren') - 0.6, 0.4), fl = ramp(t, tk + 0.05, 0.6), mv = ease(ramp(t, ts - 0.5, 0.8));
    let px = cx + 40 + fl * 70, py = cy - 46 - Math.sin(fl * Math.PI) * 60 + fl * 30, rot = fl * 0.8; if (mv > 0) { px = lerp(px, 1740, mv); py = lerp(py, 571, mv); rot = lerp(rot, Math.atan2(-289, 500) + Math.PI / 2, mv); }
    if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; lijn(ctx, [[1240, 860], [1720, 583]], '#8A6A44', 9); ctx.restore(); }
    ctx.save(); ctx.translate(px, py); ctx.rotate(rot); vul(ctx, [[-25, 20], [0, -30], [25, 20]], '#D2BE98', '#8A7656', 2); ctx.restore();
    naamBij(ctx, 'voorbereide kern', 'Levallois · vanaf ±300 000 jaar', cx + 150, cy + 10, q.on('kern'), 'left'); naamBij(ctx, 'speerpunt', null, 1700, 500, q.on('punt', 1, 0.5), 'center', C.goud); },

  s26(ctx, t, q) { e12Steppe(ctx, { horizon: 600 }); vul(ctx, [[600, 900], [1320, 900], [1300, 880], [620, 880]], '#6E6048');
    const t1 = q.at('vonkt') - 0.4, per = 0.9, slaan = t > t1, ph = slaan ? E12.fr((t - t1) / per) : 0;
    const d = slaan ? (ph < 0.75 ? ease(ph / 0.75) : 1 - ease((ph - 0.75) / 0.25)) : 0; // vuursteen naar de pyriet en terug; klap op ph = 0,75
    e12Pyriet(ctx, 860, 720, 2.2); ctx.save(); ctx.translate(-55 * d, 0); vul(ctx, [[1000, 700], [1080, 660], [1160, 690], [1150, 760], [1040, 770]], '#9A928A', '#6E6A64', 2); ctx.restore();
    if (slaan) { const n = Math.floor((t - t1) / per); for (let k = Math.max(0, n - 1); k <= n; k++) { const dt = t - (t1 + k * per + 0.75 * per); if (dt < 0 || dt > 0.9) continue;
      for (let i = 0; i < 8; i++) { const vx = (hash(k * 9 + i) - 0.5) * 260, vy = -120 - hash(k * 5 + i * 3) * 160; const px = 930 + vx * dt, py = 720 + vy * dt + 520 * dt * dt; if (py > 880) continue; circ(ctx, px, py, 5 * (1 - dt / 0.9) + 1, rgba(C.goud, 1 - dt / 0.9)); } } }
    ctx.strokeStyle = '#B8A060'; ctx.lineWidth = 3; for (let i = 0; i < 18; i++) { const gx = 900 + (hash(i * 2.2) - 0.5) * 120; ctx.beginPath(); ctx.moveTo(gx, 884); ctx.quadraticCurveTo(gx + (hash(i) - 0.5) * 30, 860, gx + (hash(i * 3) - 0.5) * 60, 845); ctx.stroke(); }
    const vuur = q.on('zelf', 1, 1.6); e12Vuur(ctx, 960, 900, 0.6, { t, aan: vuur, a: 0.6 + 0.4 * vuur });
    naamBij(ctx, 'pyriet', null, 860, 600, q.on('pyriet'), 'center', C.goud); naamBij(ctx, 'vuursteen', null, 1080, 600, q.on('vuursteen'), 'center');
    naamBij(ctx, 'Barnham, Engeland', q.on('vierhonderdduizend') > 0.5 ? '±400 000 jaar · vuur maken, waarschijnlijk' : null, 160, 200, 1, 'left');
    naamBij(ctx, 'misschien vroege neanderthalers', null, 160, 310, q.on('vroege', 1, 0.5), 'left', C.oker); },

  s27(ctx, t, q) { e12Steppe(ctx, { horizon: 600 }); e12Vuur(ctx, 1500, 900, 1.0, { t });
    const gr = q.on('begroeven', 1, 0.6); e12Graf(ctx, 260, 860, 0.9, 0.3 + 0.7 * gr); naamBij(ctx, 'graf', null, 260, 790, gr, 'center');
    const Hn = e12H('neanderthaler', 3.4); e12Mens(ctx, 'neanderthaler', 620, 905, Hn, { pose: 'zit', uit: 'moe' });
    const zb = E12_SOORT.neanderthaler.H * 3.4; ctx.save(); ctx.translate(620 + Math.sin(1.5) * (0.505 - 0.275) * zb + Math.sin(1.5 - 1.42) * 0.12 * zb, 905 - 0.06 * zb); ctx.rotate(-0.08); roundRect(ctx, -26, -30, 52, 44, 10); shape(ctx, '#D8CDB6', '#A89E86', 2); ctx.restore();
    const zw = q.on('zorgden', 1, 0.5), wv = Math.sin(t * 2.4) * 0.12 * (0.3 + 0.7 * zw);
    e12Mens(ctx, 'neanderthalerV', 1060, 905, e12H('neanderthalerV', 3.4), { kijk: -1, hoek: { lean: 0.5, th: [1.3, -0.05], kn: [1.5, 1.52], sh: [0.95 + wv, 0.75 - wv], el: [0.55 + wv, 0.65], kop: 0.3, voet2: 3.14 } });
    naamBij(ctx, 'zorg voor gewonden', null, 160, 200, zw, 'left'); evoSchaal(ctx, 'reconstructie'); },

  s28(ctx, t, q) { E12.schema(ctx); const ket = ease(ramp(t, q.at('ketting') - 0.8, 1.4)), sn = q.on('snijsporen', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= ket; ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(250, 340); ctx.quadraticCurveTo(520, 520, 790, 340); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 5; i++) { const ex = 300 + i * 110, ey = 470 + Math.abs(i - 2) * -30, er = (i - 2) * 0.25; const sx = 280 + i * 120 + (hash(i) - 0.5) * 40, sy = 610 + hash(i * 3) * 20, sr = 1.3 + hash(i * 5) * 0.6;
      const u = ease(clamp(ket * 1.4 - i * 0.1, 0, 1)); e12Klauw(ctx, lerp(sx, ex, u), lerp(sy, ey, u), 1.3, lerp(sr, er, u)); if (sn > 0.01 && u < 0.5) e12Gloed(ctx, sx, sy - 40, 30, 30, sn * (1 - 2 * u)); }
    naamBij(ctx, 'arendsklauwen', q.on('130') > 0.5 ? 'Krapina, Kroatië · ±130 000 jaar' : 'Krapina, Kroatië', 520, 740, 1, 'center'); naamBij(ctx, 'snijsporen', null, 520, 520, sn * (1 - ket), 'center', C.goud);
    naamBij(ctx, 'misschien een ketting', null, 520, 820, ket, 'center', C.goud);
    const h = q.on('handafdrukken', 1, 0.8); ctx.save(); ctx.globalAlpha *= h; e12Grotwand(ctx, 1100, 200, 640, 440); e12Handafdruk(ctx, 1420, 430, 1.2, 0.1, ease(ramp(t, q.at('handafdrukken') + 0.2, 1.0))); ctx.restore();
    naamBij(ctx, 'rode handafdruk', 'Spanje', 1420, 720, h, 'center');
    const tw = q.on('twisten', 1, 0.5); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; roundRect(ctx, 1240, 790, 360, 56, 12); shape(ctx, rgba(C.koraal, 0.25), C.koraal, 2); text(ctx, 'datering omstreden', 1420, 828, fTekst(32, 700), C.koraal, 'center'); ctx.restore(); } },

  s29(ctx, t, q) { E12.schema(ctx); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-15, 110], lat: [0, 64] });
    e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.35 }); const r = ease(ramp(t, q.at('sapiens') - 0.3, q.at('Europa') - q.at('sapiens') + 1.0));
    e12RouteU(ctx, K, [[38, 10], [42, 24], [36, 33], [30, 42], [18, 48], [5, 49]], C.teal, r, { lw: 8 });
    const ov = q.on('streken', 1, 0.8); e12Gloed(ctx, K.X(14), K.Y(47), 220, 120, ov * (0.8 + 0.2 * Math.sin(t * 2.5)));
    naamBij(ctx, 'neanderthaler', null, K.X(60), K.Y(58), 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', q.on('Europa') > 0.5 ? 'vanaf ±50 000 jaar geleden ook Europa in' : null, K.X(43), K.Y(12), q.on('sapiens'), 'center', C.teal);
    naamBij(ctx, 'samen in dezelfde streken', q.on('paar') > 0.5 ? 'een paar duizend jaar' : null, K.X(12), K.Y(56) - 20, ov, 'center', C.goud); },

  s30(ctx, t, q) { e12Steppe(ctx, { horizon: 600 }); const g = 880;
    e12Mens(ctx, 'neanderthaler', 820, g, 165 * 3.3, { hoek: { kop: 0.05 * Math.sin(t * 0.9) } }); e12Mens(ctx, 'sapiens', 1110, g, 172 * 3.3, { kijk: -1, hoek: { kop: 0.05 * Math.sin(t * 0.8 + 1) } });
    naamBij(ctx, 'neanderthaler', null, 780, 290, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1150, 260, 1, 'center', C.teal);
    vraagteken(ctx, 965, 200, q.on('kinderen', 1, 0.5), 100); evoSchaal(ctx, 'op schaal · reconstructie'); },

  s32(ctx, t, q) { E12.schema(ctx); const rv = ease(ramp(t, q.at('DNA') - 0.2, 1.6));
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 420 + 1.5 * (130 + 270 * rv), H); ctx.clip(); e12BotDNA(ctx, 420, 520, 1.5); ctx.restore(); e12Gloed(ctx, 420, 520, 210, 70, q.on('botten', 1, 0.5) * 0.5, C.paars);
    naamBij(ctx, 'Svante Pääbo', 'Zweden', 420, 700, q.on('Svante'), 'center'); naamBij(ctx, 'oud DNA', 'uit botten van neanderthalers', 420, 330, q.on('DNA'), 'center', C.paars);
    const n = 23 * ease(ramp(t, q.at('genoom') - 0.6, 2.6)); e12Genoom2(ctx, 1200, 820, 600, { pNea: 0, h: 420, n });
    naamBij(ctx, 'genoom gelezen', q.on('Nobelprijs') > 0.5 ? '2010 · Nobelprijs 2022' : '2010', 1500, 330, q.on('genoom'), 'center');
    const nb = q.on('Nobelprijs', 1, 0.5); if (nb > 0.01) { ctx.save(); ctx.globalAlpha *= nb; circ(ctx, 1500, 240, 34, C.goud, _lt(C.goud, 0.3), 3); circ(ctx, 1500, 240, 22, null, _dk(C.goud, 0.3), 2); ctx.restore(); } },

  s33(ctx, t, q) { E12.schema(ctx); const st = q.on('procent', 1, 1.2);
    e12Genoom2(ctx, 200, 820, 1060, { pNea: 0.02, h: 520, aNea: st });
    naamBij(ctx, 'mens van nu, buiten Afrika', null, 730, 220, 1, 'center');
    naamBij(ctx, '±2 % neanderthaler-DNA', q.on('47') > 0.5 ? 'kruising vooral ±47 000 jaar geleden' : null, 1320, 380, st, 'left', C.oker);
    const kd = q.on('kinderen', 1, 0.3); e12Mens(ctx, 'neanderthaler', 1440, 820, 165 * 1.5, { a: kd }); e12Mens(ctx, 'sapiens', 1620, 820, 172 * 1.5, { a: kd, kijk: -1 });
    naamBij(ctx, 'samen kinderen', null, 1530, 520, kd, 'center', C.goud); },

  s34(ctx, t, q) { E12.schema(ctx); const yb = 760, ty = 540, t0 = q.at('kregen');
    let nIn = 0; const ballen = [];
    [0, 1.6, 3.4].map(d => t0 + d).forEach((ts) => { const u = (t - ts) / 1.8; if (u <= 0) return; if (u >= 1) { nIn++; return; } let x, y; if (u < 0.15) { x = 760; y = lerp(ty + 80, ty, u / 0.15); } else if (u < 0.75) { x = lerp(790, 1130, (u - 0.15) / 0.6); y = ty; } else { x = lerp(1130, 1200, (u - 0.75) / 0.25); y = ty + (u - 0.75) / 0.25 * 140; } ballen.push([x, y]); });
    pot(ctx, 600, yb, 1.4, { p: 0, n: 70, seed: 3 }); pot(ctx, 1320, yb, 1.4, { p: 1, n: 70, seed: 5, extra: nIn ? [[EVO.a2, nIn]] : null });
    roundRect(ctx, 790, ty - 20, 340, 40, 20); shape(ctx, rgba('#AFC0D0', 0.15), EVO.glas, 3); ballen.forEach(([x, y]) => circ(ctx, x, y, 13, EVO.a2, EVO.a2R, 2));
    const kr = q.on('kregen', 1, 0.6); if (kr > 0.01) pijl(ctx, 840, ty - 50, 1080, ty - 50, C.oker, kr, 4, 18);
    naamBij(ctx, 'neanderthalers', null, 600, 860, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1320, 860, 1, 'center', C.teal);
    metaText(ctx, 'soort = groep die in de natuur samen vruchtbare nakomelingen kan krijgen', 960, 170, C.text2, 'center', 22);
    const me = q.on('meesten', 1, 0.5); naamBij(ctx, 'een beetje genenstroom', q.on('minder') > 0.5 ? 'waarschijnlijk minder vaak vruchtbare kinderen' : null, 960, 260, kr * (1 - me), 'center', C.goud);
    vraagteken(ctx, 960, 440, q.on('twisten', 1, 0.5) * (1 - me), 90);
    naamBij(ctx, 'de meeste biologen: twee soorten', null, 960, 270, me, 'center', C.goud); },

  s35(ctx, t, q) { E12.schema(ctx); const kx = 860, ky = 700; lijn(ctx, [[kx, ky], [560, 380]], C.line, 6); lijn(ctx, [[kx, ky], [1360, 380]], C.line, 6); lijn(ctx, [[kx, ky], [kx, ky + 80]], C.line, 6);
    const kn = q.on('voorouder', 1, 0.5); e12Gloed(ctx, kx, ky, 70, 70, kn); circ(ctx, kx, ky, 18, C.bgSchema, kn > 0.5 ? C.goud : C.line, 5);
    e12Mens(ctx, 'neanderthaler', 460, 370, 230); e12Mens(ctx, 'sapiens', 1260, 370, 240, { kijk: -1 });
    E12.doorstreep(ctx, 600, 260, 1120, 260, ramp(t, 0, 0.8), q.on('niet', 1, 0.4)); naamBij(ctx, 'stamt niet af van', null, 860, 200, q.on('niet'), 'center', C.koraal);
    naamBij(ctx, 'gemeenschappelijke voorouder', q.on('half') > 0.5 ? 'meer dan 500 000 jaar geleden' : null, kx + 40, ky + 70, kn, 'left', C.goud); naamBij(ctx, 'zustergroepen', null, 860, 520, q.on('zustergroep'), 'center');
    const sk = q.on('stukje', 1, 0.8); e12Genoom2(ctx, 1500, 860, 340, { pNea: 0.02, h: 180, a: sk }); naamBij(ctx, 'een stukje in ons', null, 1670, 640, sk, 'center', C.oker); },

  s36(ctx, t, q) { E12.schema(ctx); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [40, 160], lat: [-15, 62] });
    const dv = q.on('denisovamensen', 1, 0.5), dn = q.on('DNA', 1, 0.8), fl = q.on('floresiensis', 1, 0.3);
    ctx.save(); ctx.globalAlpha *= dn; e12Gebied(ctx, K, [[141, -3], [150, -5], [151, -10], [142, -9], [138, -6]], C.koraal, { a: 0.55 }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= dv; e12Vingerbot(ctx, K.X(84), K.Y(51), 1.4); ctx.restore(); naamBij(ctx, 'Denisovagrot', 'vingerbotje', K.X(84), K.Y(58), dv, 'center', C.koraal);
    naamBij(ctx, 'tot 6 % denisova-DNA', 'Papoea-Nieuw-Guinea', K.X(146), K.Y(-2) - 40, dn, 'center', C.koraal);
    e12Mens(ctx, 'floresiensis', K.X(121), K.Y(-8.5), 106 * 2.0, { a: fl }); const lh = 212 * ease(ramp(t, q.at('meter') - 0.4, 0.9)); if (lh > 1) e12Lat(ctx, K.X(121) + 60, K.Y(-8.5), lh, lh > 200 ? '1,06 meter' : '');
    naamBij(ctx, 'Homo floresiensis', 'Flores', K.X(121) - 120, K.Y(-8.5) + 50, fl, 'right', C.groen);
    if (dv < 0.01) metaText(ctx, 'Azië', K.X(95), K.Y(40), C.text2, 'center', 26); },

  s37(ctx, t, q) { E12.schema(ctx); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-15, 95], lat: [25, 64] });
    const v = ease(ramp(t, q.at('verdwijnen') - 0.3, 1.6)), d = ramp(t, q.at('werktuigen') + 0.6, 3.0);
    e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: lerp(0.35, 0.1, v), streep: true });
    for (const [lo, la] of [[-5, 40], [3, 44], [14, 45], [-8, 37.5], [40, 44], [70, 51]]) { const a = v * (1 - 0.75 * ease(clamp(d * 1.4 - hash(lo) * 0.4, 0, 1))); if (a > 0.01) e12Gebied(ctx, K, [[lo - 2, la - 1], [lo + 2, la - 1], [lo + 2, la + 1.2], [lo - 2, la + 1]], C.oker, { a: 0.6 * a, streep: false }); }
    naamBij(ctx, 'neanderthaler', null, K.X(55), K.Y(58), 1 - 0.6 * v, 'center', C.oker);
    naamBij(ctx, 'laatste werktuigen', '±41 000–39 000 jaar geleden', 960, 830, q.on('werktuigen'), 'center', C.oker); },

  s38(ctx, t, q) { E12.schema(ctx); const kaart = [['concurrentie', 'met Homo sapiens', 'concurrentie'], ['klimaat', 'koud en wisselend', 'klimaat'], ['kleine groepen', 'inteelt', 'kleine'], ['opgaan', 'in Homo sapiens', 'opgaan']];
    const al = q.on('alles', 1, 0.8);
    kaart.forEach(([n, m, cue], i) => { const a = i === 0 ? Math.max(0.35, q.on(cue, 1, 0.5)) : q.on(cue, 1, 0.5); if (a <= 0.01) return; const x = 180 + i * 400, y = 360 + (1 - a) * 30; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, x, y, 360, 360, 22); shape(ctx, rgba(C.fill, 0.8), _mixHex('#8FA0B5', C.goud, al), 2 + 2 * al); text(ctx, n, x + 180, y + 260, fTekst(42, 700), C.text, 'center'); metaText(ctx, m, x + 180, y + 310, C.grain, 'center', 24);
      const cx = x + 180, by = y + 200;
      if (i === 0) { e12Mens(ctx, 'neanderthaler', cx - 50, by, 150); e12Mens(ctx, 'sapiens', cx + 50, by, 156, { kijk: -1 }); }
      if (i === 1) { ctx.strokeStyle = '#CFE3F2'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const an = k * Math.PI / 3 + t * 0.3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * 60, by - 80 + Math.sin(an) * 60); ctx.lineTo(cx - Math.cos(an) * 60, by - 80 - Math.sin(an) * 60); ctx.stroke(); } }
      if (i === 2) { for (let k = 0; k < 3; k++) e12Mens(ctx, k === 1 ? 'neanderthalerV' : 'neanderthaler', cx - 60 + k * 60, by, k === 1 ? 118 : 126, { kijk: k === 2 ? -1 : 1 }); }
      if (i === 3) { const u = 0.5 + 0.5 * Math.sin(t * 1.2); circ(ctx, cx + 25, by - 80, 60, rgba(C.teal, 0.5), C.teal, 3); circ(ctx, cx - 70 + 60 * u, by - 80, 24, rgba(C.oker, 0.85), C.oker, 2); }
      ctx.restore(); });
    naamBij(ctx, 'geen ervan bewezen', null, 960, 820, q.on('bewezen'), 'center', C.goud); naamBij(ctx, 'misschien speelde alles mee', null, 960, 300, al, 'center', C.goud); },

  // ---------------- H5 Wij
  s39(ctx, t, q) { E12.schema(ctx); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-20, 160], lat: [-42, 62] });
    const af = ramp(t, 0.3, 1.0); ctx.save(); ctx.globalAlpha *= af * 0.8; e12Gebied(ctx, K, E12.kaartGebieden[3][1], C.teal, { a: 0.2 }); ctx.restore();
    const ma = q.on('Marokko', 1, 0.5); if (ma > 0.01) { e12Gloed(ctx, K.X(-8.4), K.Y(31.9), 50, 50, ma); circ(ctx, K.X(-8.4), K.Y(31.9), 14 * ma, C.goud); }
    naamBij(ctx, 'Jebel Irhoud', q.on('300') > 0.5 ? 'Marokko · ±300 000 jaar' : 'Marokko', K.X(-8.4) + 30, K.Y(31.9) - 30, ma, 'left', C.goud);
    naamBij(ctx, 'oorsprong: Afrika', null, K.X(20), K.Y(-25), af, 'center', C.teal);
    const r = ramp(t, q.at('300') + 0.4, 2.6); e12RouteU(ctx, K, [[38, 8], [43, 14], [48, 26], [40, 36], [25, 45], [8, 48]], C.teal, r * 1.3, { lw: 7 });
    e12RouteU(ctx, K, [[48, 26], [70, 28], [90, 25], [110, 30]], C.teal, (r - 0.25) * 1.5, { lw: 7 }); e12RouteU(ctx, K, [[90, 25], [102, 5], [120, -8], [134, -20]], C.teal, (r - 0.55) * 2.2, { lw: 7, a: 0.7 });
    naamBij(ctx, 'uit Afrika', '±70 000–50 000 jaar geleden', K.X(62), K.Y(8), ramp(t, q.at('300') + 0.8, 0.6), 'left', C.text); },

  s40(ctx, t, q) { E12.schema(ctx); lijn(ctx, [[640, 860], [1280, 860]], C.line, 2);
    e12Mens(ctx, 'erectus', 800, 860, 175 * 3.3, { hoek: { kop: 0.04 * Math.sin(t) } }); e12Mens(ctx, 'sapiens', 1120, 860, 172 * 3.3, { kijk: -1, hoek: { kop: 0.04 * Math.sin(t + 1) } });
    naamBij(ctx, 'Homo erectus', null, 760, 230, 1, 'center'); naamBij(ctx, 'Homo sapiens', null, 1160, 240, 1, 'center', C.teal);
    vraagteken(ctx, 960, 200, q.on('tegelijk', 1, 0.5), 100); evoSchaal(ctx, 'op schaal'); },

  s42(ctx, t, q) { E12.schema(ctx); const X = (ka) => 260 + (400 - ka) / 400 * 1400;
    lijn(ctx, [[X(400), 290], [X(0), 290]], C.line, 2); [400, 300, 200, 100, 0].forEach(k => metaText(ctx, k ? k + ' 000 jaar' : 'nu', X(k), 326, C.text2, 'center', 22));
    const be = 0.3 + 0.7 * ease(ramp(t, 0, 1.2)), bs = ease(ramp(t, q.at('sapiens') - 0.2, 1.0)), ov = q.on('toen', 1, 0.6);
    roundRect(ctx, X(400), 190, (X(110) - X(400)) * be, 30, 15); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'Homo erectus (Java)', X(400) + 10, 180, fTekst(30, 600), C.text, 'left');
    metaText(ctx, 'tot ±110 000 jaar geleden', X(110), 180, rgba(C.text2, q.on('110', 1, 0.5)), 'right', 22);
    if (bs > 0.01) { roundRect(ctx, X(300), 235, (X(0) - X(300)) * bs, 30, 15); shape(ctx, rgba(C.teal, 0.85), _lt(C.teal, 0.3), 2); text(ctx, 'Homo sapiens', X(0), 225, fTekst(30, 600), rgba(C.teal, bs), 'right'); }
    if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, X(300) - 4, 184, X(110) - X(300) + 8, 86, 12); ctx.stroke(); ctx.restore(); naamBij(ctx, 'tegelijk', null, (X(300) + X(110)) / 2, 400, ov * (1 - q.on('plaatje', 1, 0.4)), 'center', C.goud); }
    // het foute plaatje: een oude prent met een rij figuren, die wordt doorgestreept
    const pr = q.on('plaatje', 1, 0.6), g = 820; if (pr > 0.01) { e12Prent(ctx, 260, 460, 1400, 400, pr); ctx.save(); ctx.globalAlpha *= pr; const k = 1.6;
      chimp(ctx, 420, g, 1.3, { houding: 'staan' }); e12Mens(ctx, 'afarensis', 660, g, 107 * k, { pose: 'loop', t: 0.3 }); e12Mens(ctx, 'erectus', 900, g, 175 * k, { pose: 'loop', t: 0.5 }); e12Mens(ctx, 'neanderthaler', 1180, g, 165 * k, { pose: 'loop', t: 0.7 }); e12Mens(ctx, 'sapiens', 1460, g, 172 * k, { pose: 'loop', t: 0.9 }); ctx.restore(); E12.sepia(ctx, 260, 460, 1400, 400, pr); }
    naamBij(ctx, 'het oude plaatje', null, 960, 440, pr * (1 - ramp(t, q.at('klopt') - 0.1, 0.4)), 'center', C.koraal); const kl = ramp(t, q.at('klopt') - 0.1, 0.5); if (kl > 0.01) { lijn(ctx, [[300, 500], [lerp(300, 1620, kl), lerp(500, 820, kl)]], C.koraal, 8); naamBij(ctx, 'klopt niet', null, 1500, 440, kl, 'center', C.koraal); } },

  s43(ctx, t, q) { E12.schema(ctx); const ts = q.at('struik') - 0.6, veeg = 7 * ease(ramp(t, ts, q.at('soorten') - ts + 1.6));
    e12Struik2(ctx, 380, 170, 1300, 600, { veeg: lerp(4.5, 0, veeg / 7), eind: q.on('uitstierven', 1, 0.8), markeer: ['sapiens', 'chimp'], mk: q.on('chimpansee', 1, 0.6) });
    metaText(ctx, 'vereenvoudigd · meer dan twintig soorten bekend', 1700, 140, rgba(C.text2, q.on('twintig', 1, 0.6)), 'right', 24); },

  s44(ctx, t, q) { E12.schema(ctx); const d = ease(ramp(t, 0.2, 1.0)); const dim = { chimp: d, afarensis: d, erectus: d };
    e12Struik2(ctx, 380, 170, 1300, 600, { veeg: 0, dim, nu: 0.06, eind: 1 }); naamBij(ctx, '60 000 jaar geleden', null, e12TijdX(380, 1300, 0.06), 130, 1, 'center', C.goud); },

  s45(ctx, t, q) { E12.schema(ctx); const sl = ease(ramp(t, q.at('stierven') - 0.4, 1.4)), ui = q.on('uit', 1, 0.8), kr = ease(ramp(t, q.at('Maar') - 0.2, 1.2));
    const dim = { chimp: 1 - 0.5 * ui, afarensis: 1, erectus: 1, neanderthaler: ui, denisova: ui, floresiensis: ui, sapiens: 0 };
    e12Struik2(ctx, 380, 170, lerp(1300, 860, kr), 600, { veeg: 0, dim, nu: lerp(0.06, 0, sl), eind: 1 });
    const gn = q.on('twee', 1, 0.8); e12Genoom2(ctx, 1320, 760, 500, { pNea: 0.02, pDen: 0.01, h: 400, a: gn });
    naamBij(ctx, 'stukjes in ons DNA', 'neanderthaler · denisovamens', 1570, 840, q.on('DNA', 1, 0.6), 'center', C.oker); },

  s46(ctx, t, q) { E12.eind(ctx, ['Mens en chimpansee delen een voorouder: geen van beide.', 'Rechtop lopen kwam eerst, grote hersenen later.', 'De neanderthaler liep rechtop en is een zustergroep, geen voorouder.', 'Er leefden meerdere mensensoorten; wij bleven over.', 'Geen ladder maar een struik; hun DNA leeft voort in veel mensen.'], t); },
});
