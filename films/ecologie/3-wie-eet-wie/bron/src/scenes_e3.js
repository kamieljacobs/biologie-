// Film 3 · Wie eet wie? — geanimeerde scènes (keyframes uit sb3.js als eindbeeld, opgebouwd in de maat van de stem).
Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (duin in de wind, vos en konijn)
  title(ctx, t) {
    ctx.save(); ctx.beginPath(); ctx.arc(1440, 600, 300, 0, 6.283); ctx.clip(); e3Duin(ctx, { horizon: 520, helmPos: [[1240, 680, 1], [1650, 690, 0.8]], t });
    ecoVos(ctx, 1380, 760, 2.6, { houding: 'staan' }); ecoKonijn(ctx, 1620, 770, 2.6, { houding: t % 7 < 3.5 ? 'zitten' : 'grazen', t: t * 0.4, kijk: -1 }); ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(1440, 600, 300, 0, 6.283); ctx.stroke(); },

  // ---------------- Opening
  s01(ctx, t, q) { e3Duin(ctx, { t });
    [[1180, _G - 6, 'grazen', 0.1], [1330, _G + 14, 'zitten', 0], [1480, _G - 2, 'grazen', 0.5], [1620, _G + 20, 'grazen', 0.3], [1760, _G + 4, 'zitten', 0]].forEach(([x, y, h, f], i) => ecoKonijn(ctx, x, y, 3, { houding: h, t: f + t * 0.35, kijk: i % 2 ? -1 : 1 }));
    const T = e3Tocht(t, 0, 300, 780, 3.2, E3S.vos.sluipen, 0.55); e3Loop(ecoVos, ctx, _G + 10, 3.2, T, 'sluipen', 'sluipen', { t: 0.35 });
    ecoSchaal(ctx, 'vos ± 1 m lang · konijn ± 40 cm'); },
  s02(ctx, t, q) { e3Duin(ctx, { t });
    // de vos springt (hij vangt er één), de konijnen schieten weg naar hun holen; dan telt de kalender en komen de konijnen terug
    const tS = q.at('vangt') - 0.3, sp = clamp((t - tS) / 1.3, 0, 1);
    ecoVos(ctx, 780, _G + 10, 3.2, sp <= 0 ? { houding: 'sluipen', t: 0.35 } : sp < 1 ? { houding: 'muizensprong', t: sp } : { houding: 'staan', kijk: 1 });
    for (const [x, y] of [[1560, _G + 22], [1830, _G + 12]]) vul(ctx, [[x - 40, y], [x, y - 30], [x + 40, y]], '#1E2A24');
    [[1180, _G - 6, 1560], [1330, _G + 14, 1830], [1480, _G - 2, 1560], [1620, _G + 20, 1830]].forEach(([x, y, xh], i) => { const T = e3Tocht(t, tS + 0.3 + i * 0.15, x, xh, 3, E3S.konijn.rennen, 1.6);
      if (!T.klaar) e3Loop(ecoKonijn, ctx, y, 3, T, 'rennen', 'zitten', { t: 0 }); });
    const tM = q.at('Morgen'), tV = q.at('voorjaar');
    [1, 2, 3, 4, 5, 6, 7].forEach((d, i) => { const a = ramp(t, tM + i * 0.35, 0.3); if (a <= 0.01) return; e3A(ctx, a, () => { roundRect(ctx, 640 + i * 96, 200, 76, 76, 12); shape(ctx, rgba(C.fill, 0.8), i < 5 ? C.line : C.goud, 1.5); text(ctx, String(d), 678 + i * 96, 252, fTekst(36, 700), C.text, 'center'); }); });
    metaText(ctx, 'DAG', 560, 248, rgba(C.text2, ramp(t, tM, 0.3)), 'right', 28);
    [[1180, _G - 6, 'grazen'], [1330, _G + 14, 'zitten'], [1480, _G - 2, 'grazen'], [1620, _G + 20, 'grazen'], [1720, _G + 4, 'zitten']].forEach(([x, y, h], i) => ecoKonijn(ctx, x, y, 3, { houding: h, t: t * 0.35 + i * 0.2, kijk: i % 2 ? -1 : 1, a: ramp(t, tV + i * 0.25, 0.4) }));
    naamBij(ctx, 'elk voorjaar weer konijnen', null, 960, 360, q.on('voorjaar', 1, 0.5), 'center', C.goud); },

  // ---------------- H1 Pijlen van voedsel
  s04(ctx, t, q) { const z = lerp(1.3, 1, q.on('vos', 1, 1.6)), fx0 = lerp(560, 960, q.on('vos', 1, 1.6)), fx = clamp(fx0, 960 / z, W - 960 / z);
    ctx.save(); ctx.translate(960, 600); ctx.scale(z, z); ctx.translate(-fx, -600);
    e3Duin(ctx, { helmPos: [[520, 900, 1.6], [1700, 860, 1.0]], t });
    ecoKonijn(ctx, 760, _G + 40, 3.4, { houding: 'grazen', t: 0.4 + t * 0.4 }); ecoVos(ctx, 1380, _G + 10, 3.0, { houding: 'staan', kijk: -1 });
    naamBij(ctx, 'helm', null, 330, 760, q.on('helm', 1, 0.5), 'center'); naamBij(ctx, 'konijn', null, 800, 640, q.on('konijn', 2, 0.5), 'center'); naamBij(ctx, 'vos', null, 1360, 590, q.on('vos', 1, 0.5), 'center');
    ctx.restore(); metaText(ctx, 'VOEDSELKETEN', 960, 200, rgba(C.goud, q.on('voedselketen', 1, 0.6)), 'center', 30); },
  s05(ctx, t, q) { _sch(ctx);
    [[400, 'helm', 0], [960, 'konijn', 0.3], [1520, 'vos', 0.6]].forEach(([x, k, d]) => e3Knoop(ctx, x, 520, k, E3P[k], { r: 112, a: ramp(t, d, 0.5) }));
    const a = q.on('pijl', 1, 0.6); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.setLineDash([12, 12]); ctx.beginPath(); ctx.moveTo(1080, 520); ctx.lineTo(1400, 520); ctx.stroke(); ctx.restore(); }
    vraagteken(ctx, 1240, 470, q.on('vos', 1, 0.5), 96); },
  s07(ctx, t, q) { _sch(ctx);
    const u2 = q.on('wijst', 1, 1.2), u1 = q.on('volgt', 1, 1.2);
    e3PijlG(ctx, 400, 520, 960, 520, u1, { r1: 120, r2: 120, lw: 6 }); e3PijlG(ctx, 960, 520, 1520, 520, u2, { r1: 120, r2: 120, lw: 6 });
    e3Stroom(ctx, 960, 520, 1520, 520, t, q.on('stoffen', 1, 0.6) * (1 - q.on('energie', 1, 0.6)), C.oker, 3, 0.3, 10, 120, 120);
    const aE = q.on('energie', 1, 0.6); e3Stroom(ctx, 400, 520, 960, 520, t, aE, C.goud, 2, 0.3, 12, 120, 120); e3Stroom(ctx, 960, 520, 1520, 520, t + 1.6, aE, C.goud, 2, 0.3, 12, 120, 120);
    [[400, 'helm'], [960, 'konijn'], [1520, 'vos']].forEach(([x, k]) => e3Knoop(ctx, x, 520, k, E3P[k], { r: 112, focus: k === 'vos' && t > q.at('vos') }));
    const aL = q.on('Lees', 1, 0.6); text(ctx, 'wordt gegeten door', 680, 470, fTekst(36, 600), rgba(C.oker, aL), 'center'); text(ctx, 'wordt gegeten door', 1240, 470, fTekst(36, 600), rgba(C.oker, aL), 'center');
    haak(ctx, 300, 1620, 740, 'De pijl volgt het voedsel: van gegeten naar eter.', C.groen, q.on('volgt', 1, 0.8)); },
  s08(ctx, t, q) { _sch(ctx);
    e3PijlG(ctx, 400, 520, 960, 520, 1, { r1: 120, r2: 120, lw: 6 }); e3PijlG(ctx, 960, 520, 1520, 520, 1, { r1: 120, r2: 120, lw: 6 });
    e3Stroom(ctx, 400, 520, 960, 520, t, 1 - ramp(t, 0, 1), C.goud, 2, 0.3, 12, 120, 120);
    const aP = q.on('producent', 1, 0.6), aL = q.on('licht', 1, 0.6);
    zon(ctx, 400, 230, 44, aL, t);
    if (aL > 0.01) for (let i = 0; i < 3; i++) { const u = e3fr(t * 0.5 + i / 3); circ(ctx, 400 + (i - 1) * 40, lerp(300, 420, u), 7, rgba(C.goud, aL * Math.min(1, (1 - u) * 4))); }
    e3Knoop(ctx, 400, 520, null, E3P.helm, { r: 112, rand: aP > 0.5 ? C.groen : C.line, focus: aP > 0.5 }); e3Knoop(ctx, 960, 520, null, E3P.konijn, { r: 112 }); e3Knoop(ctx, 1520, 520, null, E3P.vos, { r: 112 });
    if (aP > 0.01) circ(ctx, 400, 520, 118 + 6 * Math.sin(t * 2), null, rgba(C.groen, 0.6 * aP), 3);
    naamBij(ctx, 'producent', 'maakt zelf voedsel met licht', 400, 720, aP, 'center', C.groen);
    haak(ctx, 860, 1620, 660, 'consumenten', C.oker, q.on('consumenten', 1, 0.6)); },
  s09(ctx, t, q) { _sch(ctx);
    const kol = [['herbivoor', 'eet planten', 400, 'herbivoor'], ['omnivoor', 'eet planten én dieren', 960, 'omnivoor'], ['carnivoor', 'eet vooral dieren', 1520, 'carnivoor']];
    kol.forEach(([n, m, x, w]) => { roundRect(ctx, x - 250, 200, 500, 600, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); naamBij(ctx, n, m, x, 270, q.on(w, 1, 0.6), 'center'); });
    e3Knoop(ctx, 400, 520, 'konijn', E3P.konijn, { r: 110, a: q.on('konijn', 1, 0.5) });
    const sch = q.on('omnivoor', 1, 1.2), xv = lerp(1520, 960, sch), yv = lerp(520, 470, sch);
    if (sch > 0.01) e3A(ctx, 0.35 * sch, () => e3Knoop(ctx, 1520, 520, null, E3P.vos, { r: 110 }));
    e3Knoop(ctx, xv - 100, yv + 230, null, E3P.muis, { r: 62, a: q.on('muizen', 1, 0.5) }); e3Knoop(ctx, xv + 100, yv + 230, null, E3P.braam, { r: 62, a: q.on('bramen', 1, 0.5) });
    e3Knoop(ctx, xv, yv, sch > 0.5 ? 'vos' : null, E3P.vos, { r: 110, focus: true, a: q.on('vos', 1, 0.5) });
    metaText(ctx, 'en ook: aaseter', 960, 860, rgba(C.text2, q.on('aaseter', 1, 0.6)), 'center', 28); },
  s10(ctx, t, q) { _sch(ctx);
    const P = { 'helm-konijn': 1, 'konijn-vos': 1, 'eik-muis': q.on('eikels', 1, 1), 'muis-vos': q.on('muis', 2, 1), 'eik-rups': q.on('eikenblad', 1, 1), 'rups-merel': q.on('rups', 2, 1), 'eik-gaai': q.on('Alle', 1, 1), 'braam-vos': q.on('Alle', 1, 1) };
    const K = { muis: q.on('muis', 1, 0.5), eik: q.on('zaden', 1, 0.5), rups: q.on('rups', 1, 0.5), merel: q.on('merel', 1, 0.5), gaai: q.on('Alle', 1, 0.6), braam: q.on('Alle', 1, 0.6) };
    const f = []; if (t > q.at('muis') && t < q.at('rups')) f.push('muis'); if (t > q.at('rups') && t < q.at('Alle')) f.push('rups', 'merel');
    e3WebA(ctx, { k: K, p: P, focus: f }); metaText(ctx, 'VOEDSELWEB · DUINEN', 1780, 140, rgba(C.goud, q.on('voedselweb', 1, 0.6)), 'right', 30); },
  s11(ctx, t, q) { _sch(ctx);
    [[790, 'PRODUCENTEN', q.on('Planten', 1, 0.8)], [540, 'CONSUMENT 1E ORDE', q.on('eerste', 2, 0.8)], [280, 'CONSUMENT 2E ORDE', q.on('tweede', 1, 0.8)]].forEach(([y, l, a]) => e3A(ctx, a, () => { roundRect(ctx, 150, y - 105, 1460, 210, 18); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.5), 1); metaText(ctx, l, 1590, y - 71, C.text2, 'right', 26); }));
    const aB = q.on('bramen', 1, 0.8); e3WebA(ctx, { focus: t > q.at('tweede') ? ['vos'] : [] });
    e3PijlG(ctx, 1190, 800, 1440, 560, aB, { r1: 70, r2: 60, lw: 6 }); e3Knoop(ctx, 1440, 560, null, E3P.vos, { r: 54, a: aB, focus: true }); naamBij(ctx, 'vos: ook 1e orde', '(bramen)', 1440, 650, aB, 'center', C.text); },
  s12(ctx, t, q) { _sch(ctx);
    const out = 1 - ramp(t, 0, 0.8); [[790], [540], [280]].forEach(([y]) => e3A(ctx, out, () => { roundRect(ctx, 150, y - 105, 1460, 210, 18); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.5), 1); }));
    const dM = q.on('verdwijnen', 1, 1.2), dk = q.on('jaagt', 1, 1);
    e3WebA(ctx, { dim: { muis: dM }, dik: { 'konijn-vos': dk }, focus: t > q.at('Volg') ? ['konijn'] : [] });
    e3Stroom(ctx, 330, 540, 540, 270, t, q.on('Volg', 1, 0.6), C.goud, 1, 0.4, 12, 70, 74);
    for (let i = 0; i < 5; i++) { const a = ramp(t, q.at('eikels') + i * 0.2, 0.4); if (a <= 0.01) continue; const x = 690 + i * 34, y = 890 - (i % 2) * 6 - (1 - a) * 20; e3A(ctx, a, () => { ctx.beginPath(); ctx.ellipse(x, y, 10, 14, 0.3, 0, 6.283); shape(ctx, '#A06C36', '#BC8A50', 1.5); }); }
    naamBij(ctx, 'minder muizen', null, 760, 450, dM, 'center', C.koraal); },

  // ---------------- H2 Eten zonder te doden
  s13(ctx, t, q) { e3Duin(ctx, { helmPos: [[260, 800, 1], [1750, 850, 1.1]], t });
    const kn = q.on('knabbelt', 1, 0.4), wieg = kn * Math.exp(-Math.max(0, t - q.at('knabbelt')) * 0.5);
    e3Boom(ctx, 'eik', 1080, _G + 40, 5.2, { groei: 0.3, wind: 0.15 + 0.6 * wieg, t: t * 0.5 });
    // een jong blaadje dat het konijn eraf knabbelt
    const bl = 1 - q.on('eraf', 1, 0.8); if (bl > 0.01) e3A(ctx, bl, () => { ctx.save(); ctx.translate(lerp(1000, 972, kn), lerp(_G - 120, _G - 70, kn)); ctx.rotate(0.6); ctx.beginPath(); ctx.ellipse(0, 0, 16 * bl + 4, 8 * bl + 2, 0, 0, 6.283); ctx.fillStyle = '#8FCB78'; ctx.fill(); ctx.restore(); });
    ecoKonijn(ctx, 900, _G + 44, 5.2, { houding: 'grazen', t: 0.6 + t * 0.5 * (0.4 + kn) });
    naamBij(ctx, 'jonge eik', 'een paar jaar oud', 1200, 380, q.on('eikje', 1, 0.6), 'left'); ecoSchaal(ctx, 'eikje ± 70 cm · konijn ± 40 cm'); },
  s14(ctx, t, q) { e3Duin(ctx, { helmPos: [[260, 800, 1], [1750, 850, 1.1]], t: t + 10 });
    e3Boom(ctx, 'eik', 1080, _G + 40, 5.2, { groei: 0.3, wind: 0.2, t: t * 0.5 }); ecoKonijn(ctx, 900, _G + 44, 5.2, { houding: 'grazen', t: 0.6 + t * 0.4 });
    naamBij(ctx, 'blijft leven', null, 1200, 380, q.on('leven', 1, 0.6), 'left', C.groen); vraagteken(ctx, 1500, 300, q.on('relatie', 1, 0.5), 110); },
  s16(ctx, t, q) { _sch(ctx);
    const aV = q.on('dier', 1, 0.6), aP = q.on('predatie', 1, 0.6);
    for (const [x, a] of [[520, aV], [1400, aP]]) e3A(ctx, a, () => { roundRect(ctx, x - 380, 180, 760, 620, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); });
    naamBij(ctx, 'vraat', 'de plant leeft door', 520, 260, q.on('vraat', 1, 0.6), 'center'); naamBij(ctx, 'predatie', 'de prooi gaat dood', 1400, 260, q.on('dood', 1, 0.6), 'center');
    e3A(ctx, aV, () => { e3Boom(ctx, 'eik', 660, 740, 4.4, { groei: 0.3, wind: 0.2, t: t * 0.5 }); ecoKonijn(ctx, 480, 740, 4.4, { houding: 'grazen', t: t * 0.4 }); });
    e3A(ctx, aP, () => { ecoVos(ctx, 1330, 740, 3.6, { houding: 'staan' }); ecoKonijn(ctx, 1620, 740, 3.8, { houding: 'zitten', kijk: -1, a: lerp(1, 0.35, q.on('doodt', 1, 0.8)) }); });
    const aT1 = q.on('vraat', 1, 0.5), aT2 = q.on('rover', 1, 0.5);
    e3Teken(ctx, 400, 400, '+', { a: aT1 }); e3Teken(ctx, 640, 400, '−', { a: aT1 }); e3Teken(ctx, 1280, 400, '+', { a: aT2 }); e3Teken(ctx, 1560, 400, '−', { a: aT2 });
    metaText(ctx, 'predator = rover', 1400, 860, rgba(C.text2, q.on('predator', 1, 0.6)), 'center', 26); },
  s17(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    e3Braam(ctx, 280, _G + 20, 1.6); e3Boom(ctx, 'eik', 1500, _G + 20, 2.2, { groei: 0.25, wind: 0.2, t: t * 0.5 });
    const z1 = q.on('stekels', 1, 0.8), z2 = q.on('looizuren', 1, 0.8);
    if (z1 > 0.01) zoomCircle(ctx, 640, 360, 210 * (0.6 + 0.4 * z1), 520, 690, 'stekels · ± 5 mm', z1, () => { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(400, 120, 480, 480); e3Braam(ctx, 330, 600, 4.2, { bramen: 0 }); });
    const st = q.on('stijgt', 1, 3); // looizuren nemen toe in de zomer: blad wordt donkerder
    if (z2 > 0.01) zoomCircle(ctx, 1220, 360, 210 * (0.6 + 0.4 * z2), 1460, 640, 'looizuren · bitter', z2, () => { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(980, 120, 480, 480); ecoEikenblad(ctx, 1220, 360, 28, { stadium: 0, hoek: -0.5 + Math.sin(t * 0.8) * 0.04 });
      if (st > 0.01) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = rgba('#5E7A52', 0.55 * st); ctx.beginPath(); ctx.ellipse(1220, 360, 175, 120, -0.5, 0, 6.283); ctx.fill(); ctx.restore(); } });
    const aZ = q.on('zomer', 1, 0.6); if (aZ > 0.01) e3A(ctx, aZ, () => { metaText(ctx, 'MEI', 1060, 860, C.text2, 'left', 26); metaText(ctx, 'SEPT', 1380, 860, C.text2, 'right', 26); for (let i = 0; i < 8; i++) { const a = clamp(st * 8 - i, 0, 1); ctx.fillStyle = rgba(C.groen, (0.25 + i * 0.09) * Math.max(0.15, a)); ctx.fillRect(1060 + i * 40, 800, 36, 24); } }); },

  // ---------------- H3 De golven
  s18(ctx, t, q) { const tC = q.at('Canada');
    if (t < tC) { e3Duin(ctx, { t }); ecoVos(ctx, 760, _G + 10, 3.2, { houding: 'staan', kijk: 1 });
      const op = q.on('niets', 1, 1.0); [[1240, _G, 'grazen'], [1460, _G + 14, 'zitten'], [1650, _G - 4, 'grazen']].forEach(([x, y, h], i) => ecoKonijn(ctx, x, y, 3, { houding: h, t: t * 0.35 + i * 0.3, a: 1 - op }));
      vraagteken(ctx, 960, 360, q.on('loopt', 1, 0.5), 96); return; }
    const u = t - tC; e3Sneeuwbos(ctx);
    ecoSneeuwschoenhaas(ctx, 620, 830, 3.4, { houding: 'zitten', vacht: 'winter', t: u * 0.3 });
    const T = e3Tocht(u, 0, 1560, 1300, 3.2, E3S.lynx.lopen, 0.7); e3Loop(ecoLynx, ctx, 820, 3.2, T, 'lopen', 'staan', { kijk: -1 });
    naamBij(ctx, 'sneeuwschoenhaas', 'wintervacht', 620, 600, q.on('sneeuwschoenhaas', 1, 0.5), 'center'); naamBij(ctx, 'lynx', 'Canadese lynx', 1300, 520, q.on('lynx', 1, 0.5), 'center'); metaText(ctx, 'CANADA', 1780, 140, C.goud, 'right', 30); },
  s19(ctx, t, q) { const tS = Math.min(q.at('sneeuwschoenhazen') - 0.4, 2.2), v = 640, s = 3.2;
    // eerst sluipt de lynx, dan de achtervolging: de camera loopt mee, de voeten staan stil op de sneeuw
    const u = Math.max(0, t - tS), cam = u * v; const off = ((cam % W) + W) % W;
    ctx.save(); ctx.translate(-off, 0); e3Sneeuwbos(ctx); ctx.translate(W, 0); e3Sneeuwbos(ctx); ctx.restore();
    if (t < tS) { const T = e3Tocht(t, 0, 560, 760, s, E3S.lynx.sluipen, 0.45); e3Loop(ecoLynx, ctx, 830, s, T, 'sluipen', 'sluipen', { t: 0.4 }); ecoSneeuwschoenhaas(ctx, 1320, 830, s, { houding: 'zitten', vacht: 'winter' }); }
    else { const SL = E3S.lynx.sprinten * s, cL = u * v / SL; ecoLynx(ctx, 700 + Math.floor(cL) * SL - cam, 830, s, { houding: 'sprinten', t: cL, wereld: true });
      const vH = v * 1.04, SH = E3S.haas.rennen * s, cH = u * vH / SH; ecoSneeuwschoenhaas(ctx, 1320 + Math.floor(cH) * SH - cam, 830, s, { houding: 'rennen', t: cH, wereld: true, vacht: 'winter' }); }
    const a = q.on('één', 1, 0.6); e3A(ctx, a, () => { roundRect(ctx, 1380, 190, 380, 130, 16); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, '± 1 haas', 1570, 250, fTekst(44, 700), C.text, 'center'); metaText(ctx, 'per 1–2 dagen', 1570, 296, C.text2, 'center', 26); }); },
  s20(ctx, t, q) { _sch(ctx);
    // eerst de hele reeks 1845–1935 als balk; het venster 1900–1920 licht op en wordt de grafiek
    const aB = 1 - q.on('twintig', 1, 1.2);
    if (aB > 0.01) e3A(ctx, aB, () => { const x0 = 300, x1 = 1620, y = 300, X = (j) => lerp(x0, x1, (j - 1845) / 90); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, q.on('1935', 1, 1.2)), y); ctx.stroke();
      metaText(ctx, '1845', x0, y + 50, C.text2, 'center', 28); metaText(ctx, '1935', x1, y + 50, rgba(C.text2, q.on('1935', 1, 0.5)), 'center', 28);
      const aW = q.on('vellen', 1, 0.6); for (let i = 0; i < 18; i++) { const x = lerp(x0, x1, (i + 0.5) / 18), a = ramp(t, q.at('vellen') + i * 0.08, 0.3) * aW; if (a > 0.01) { roundRect(ctx, x - 22, y - 70 - 26 * hash(i), 44, 26 + 26 * hash(i), 6); shape(ctx, rgba(C.oker, 0.6 * a), null); } }
      metaText(ctx, 'vangsten, geen tellingen', 960, y + 140, rgba(C.koraal, q.on('vangsten', 1, 0.6)), 'center', 28);
      e3A(ctx, q.on('beeld', 1, 0.6), () => { roundRect(ctx, X(1900), y - 30, X(1920) - X(1900), 60, 10); shape(ctx, rgba(C.goud, 0.2), C.goud, 2); }); });
    const aG = q.on('twintig', 1, 1.0); const tH = q.at('twintig'), tL = q.at('lynxen');
    e3GrafiekA(ctx, { a: aG, haas: 20 * clamp((t - tH - 0.5) / Math.max(1.5, tL - tH - 0.6), 0, 1), lynx: 3 * clamp((t - q.at('hazen')) / 1.4, 0, 1) });
    naamBij(ctx, 'sneeuwschoenhaas', null, 760, 210, q.on('hazen', 1, 0.6), 'left', C.teal); naamBij(ctx, 'lynx', null, 340, 640, q.on('lynxen', 1, 0.6), 'left', C.oker);
    metaText(ctx, 'PELSHANDEL CANADA · VANGSTEN, GEEN TELLINGEN', 1780, 140, rgba(C.text2, aG), 'right', 26); },
  s21(ctx, t, q) { _sch(ctx); e3GrafiekA(ctx, { haas: 20, lynx: 3 });
    naamBij(ctx, 'sneeuwschoenhaas', null, 760, 210, 1, 'left', C.teal); naamBij(ctx, 'lynx', null, 340, 640, 1, 'left', C.oker);
    const aP = q.on('piek', 1, 0.6); if (aP > 0.01) { const px = e3GX(3), py = e3GY(E3HAAS[3]); circ(ctx, px, py, 18 + 4 * Math.sin(t * 3), null, rgba(C.goud, aP), 3); metaText(ctx, '1903', px + 30, py + 8, rgba(C.goud, aP), 'left', 28); }
    vraagteken(ctx, e3GX(4) + 20, e3GY(30), q.on('daarna', 1, 0.5), 100); },
  s23(ctx, t, q) { _sch(ctx); const tP = q.at('pieken');
    e3GrafiekA(ctx, { haas: 20, lynx: 3 + 17 * clamp((t - tP + 0.3) / 2.6, 0, 1), pieken: q.on('twee', 1, 0.6) + 0.4 * Math.max(0, Math.sin((t - q.at('zoek')) * 3)) * q.on('zoek', 1, 0.3) * (1 - q.on('prooi', 1, 0.5)) });
    naamBij(ctx, 'sneeuwschoenhaas', null, 760, 210, 1, 'left', C.teal); naamBij(ctx, 'lynx', null, 340, 640, 1, 'left', C.oker);
    const a1 = q.on('twee', 1, 0.6), a2 = q.on('elke', 1, 0.6);
    pijl(ctx, 446, 880, 504, 880, C.goud, a1, 3, 14); metaText(ctx, '1 JAAR', 476, 930, rgba(C.goud, a1), 'center', 26);
    pijl(ctx, 1146, 880, 1274, 880, C.goud, a2, 3, 14); metaText(ctx, '2 JAAR', 1210, 930, rgba(C.goud, a2), 'center', 26);
    naamBij(ctx, 'de prooi gaat voor, de rover volgt', null, 1780, 150, q.on('prooi', 1, 0.6), 'right', C.goud);
    metaText(ctx, 'golf van ± 10 jaar', 1780, 196, rgba(C.grain, q.on('tien', 1, 0.6)), 'right', 26); },
  s24(ctx, t, q) { _sch(ctx);
    const V = [[960, 210, 'veel hazen', 'haas', 1.3, 'veel'], [1420, 520, 'meer lynxen', 'lynx', 1.3, 'meer'], [960, 790, 'minder hazen', 'haas', 0.7, 'daalt'], [500, 520, 'minder lynxen', 'lynx', 0.7, 'sterven']];
    const A = V.map((v) => q.on(v[5], 1, 0.6)); A[0] = Math.max(A[0], ramp(t, 0.3, 0.6));
    for (let i = 0; i < 4; i++) { const [x1, y1] = V[i], [x2, y2] = V[(i + 1) % 4]; const u = i < 3 ? A[i + 1] : q.on('groeien', 1, 1); e3PijlG(ctx, x1, y1, x2, y2, u, { r1: 130, r2: 130, kl: C.line, lw: 3 }); }
    V.forEach(([x, y, n, k, f], i) => { const g = lerp(1, f, ramp(t, (i === 0 ? 0.3 : q.at(V[i][5])) + 0.4, 1.2)); e3Knoop(ctx, x, y, null, (c, xx, yy, r) => E3P[k](c, xx, yy, r * g), { r: 96, a: A[i], focus: t > q.at(V[i][5]) && t < q.at(V[(i + 1) % 4][5]) }); });
    V.forEach(([x, y, n], i) => naamBij(ctx, n, null, x + (i === 1 ? 120 : i === 3 ? -120 : 0), y + (i === 0 ? -120 : i === 2 ? 150 : 8), A[i], i === 1 ? 'left' : i === 3 ? 'right' : 'center'));
    // één keer rond: een stip loopt de kring na
    const tg = q.at('groeien'); if (t > tg) { const u = clamp((t - tg) / 3, 0, 1), an = -Math.PI / 2 + u * 6.283; circ(ctx, 960 + Math.cos(an) * 460, 500 + Math.sin(an) * 300, 12, rgba(C.goud, Math.min(1, (1 - u) * 5))); } },
  s25(ctx, t, q) { e3Duin(ctx, { t });
    [[1180, _G - 6, 'grazen'], [1330, _G + 14, 'zitten'], [1480, _G - 2, 'grazen'], [1620, _G + 20, 'grazen']].forEach(([x, y, h], i) => ecoKonijn(ctx, x, y, 3, { houding: h, t: t * 0.35 + i * 0.25, kijk: i % 2 ? -1 : 1 }));
    const T = e3Tocht(t, q.at('weg') - 0.3, 760, -300, 3.2, E3S.vos.draven, 1.3); if (!T.klaar) e3Loop(ecoVos, ctx, _G + 10, 3.2, T, 'draven', 'staan');
    vraagteken(ctx, 1400, 420, q.on('konijnen', 1, 0.5), 110); },
  s27(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    const kaal = q.on('gras', 1, 2.0); if (kaal > 0.01) e3A(ctx, kaal, () => vul(ctx, [[-60, 740], [600, 720], [1200, 760], [1990, 730], [1990, H], [-60, H]], '#6A6A48'));
    const tT = q.at('toe'), ziek = q.on('myxomatose', 1, 1.5);
    for (let i = 0; i < 18; i++) { const x = 140 + i * 95 + 30 * hash(i), y = 790 + 50 * hash(i + 4); const a = i % 4 === 0 ? 1 : ramp(t, tT - 0.6 + hash(i + 9) * 2.2, 0.4); const blijf = i % 7 === 2 || i % 9 === 4;
      ecoKonijn(ctx, x, y, 2.4, { houding: i % 3 ? 'zitten' : 'grazen', t: t * 0.35 + hash(i), kijk: i % 2 ? 1 : -1, a: a * (blijf ? 1 : lerp(1, 0.35, ziek)) }); }
    naamBij(ctx, 'myxomatose', 'in de jaren vijftig · > 9 op de 10 dood', 960, 300, q.on('myxomatose', 1, 0.6), 'center', C.koraal); },
  s28(ctx, t, q) { e3Duin(ctx, { t });
    const tM = q.at('muizen'), s = 3.2, n = 3, cps = n / Math.max(2, tM - 0.4); const T = e3Tocht(t, 0, 760 - n * E3S.vos.sluipen * s, 760, s, E3S.vos.sluipen, cps);
    const sp = clamp((t - tM + 0.2) / 1.3, 0, 1);
    if (sp <= 0) e3Loop(ecoVos, ctx, _G + 10, s, T, 'sluipen', 'sluipen', { t: 0.35 }); else ecoVos(ctx, 760, _G + 10, s, { houding: 'muizensprong', t: sp });
    if (sp < 0.85) muis(ctx, 940, _G + 20, 6, {});
    ecoKonijn(ctx, 1460, _G, 3, { houding: 'zitten', kijk: -1 }); ecoKonijn(ctx, 1600, _G + 10, 3, { houding: 'grazen', t: t * 0.35 });
    vul(ctx, [[1520, _G + 18], [1560, _G - 10], [1620, _G + 18]], '#1E2A24');
    naamBij(ctx, 'sinds het jaar 1968 terug', null, 760, 420, q.on('1968', 1, 0.6) * (1 - q.on('jacht', 1, 0.6)), 'center', C.text2);
    haak(ctx, 1380, 1680, _G + 40, 'Er blijven er altijd over.', C.groen, q.on('altijd', 1, 0.6)); },

  // ---------------- H4 Samenleven
  s29(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    const stam = (x, w) => { ctx.beginPath(); ctx.moveTo(x - w / 2 - 18, _G + 34); ctx.quadraticCurveTo(x - w / 2, _G - 20, x - w * 0.45, 0); ctx.lineTo(x + w * 0.45, 0); ctx.quadraticCurveTo(x + w / 2, _G - 20, x + w / 2 + 18, _G + 34); ctx.closePath(); shape(ctx, '#5A4632', '#6E5844', 2); ctx.strokeStyle = '#4A3828'; ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { const xx = x - w * 0.35 + k * w * 0.11; ctx.beginPath(); ctx.moveTo(xx, _G + 20); ctx.bezierCurveTo(xx + 8, 600, xx - 8, 300, xx + 4, 0); ctx.stroke(); } };
    stam(260, 220); stam(1720, 170); ctx.fillStyle = '#4A3A2C'; ctx.fillRect(0, _G + 30, W, 4);
    // eikels onder de oude eik; de gaai pakt er drie
    for (let i = 0; i < 4; i++) { const pak = ramp(t, q.at('verzamelt') + i * 0.5, 0.3); if (i < 3 && pak > 0.99) continue; e3A(ctx, i < 3 ? 1 - pak : 1, () => { ctx.beginPath(); ctx.ellipse(500 + i * 50, _G + 26, 9, 12, 0.3, 0, 6.283); shape(ctx, '#A06C36', '#BC8A50', 1.5); }); }
    const tV = q.at('keel'), tD = q.at('duwt'), uV = clamp((t - tV) / Math.max(1.6, tD - tV - 0.3), 0, 1);
    if (t < tV) ecoGaai(ctx, 580, _G + 30, 4, { houding: t > q.at('verzamelt') ? 'pikken' : 'staan', t: t * 0.8 });
    else if (uV < 1) ecoGaai(ctx, lerp(580, 960, uV), _G + 30 - Math.sin(Math.PI * uV) * 300, 4, { houding: 'vliegen', t: (t - tV) * 3 });
    else { const d = clamp((t - tD) * 0.9, 0, 3); ecoGaai(ctx, 960, _G + 30, 4, d > 0 && d < 3 ? { houding: 'duwen', t: d } : { houding: 'staan' }); }
    naamBij(ctx, 'gaai', '± 34 cm', 960, 640, q.on('gaai', 1, 0.5), 'center'); naamBij(ctx, 'stam van een oude eik', null, 420, 500, q.on('duinbos', 1, 0.6), 'left'); ecoSchaal(ctx, 'gaai ± 34 cm · eikenstam ± 55 cm breed'); },
  s30(ctx, t, q) { e3Duin(ctx, { helm: false, t: t + 20 }); ctx.fillStyle = '#4A3A2C'; ctx.fillRect(0, _G + 30, W, 4);
    ecoGaai(ctx, 860, _G + 30, 4, { houding: 'staan' });
    // doorsnede: de verstopte eikel in de grond
    ctx.beginPath(); ctx.ellipse(1040, _G + 70, 10, 14, 0.3, 0, 6.283); shape(ctx, '#A06C36', '#BC8A50', 1.5);
    e3Boom(ctx, 'eik', 1560, _G + 30, 2.6, { groei: 1, wind: 0.2, t: t * 0.5 });
    vraagteken(ctx, 1220, 380, q.on('voordeel', 1, 0.5), 110); },
  s32(ctx, t, q) { _sch(ctx);
    roundRect(ctx, 180, 160, 1100, 680, 24); shape(ctx, '#2F4A3A', '#5A7A62', 2); metaText(ctx, 'DUINBOS · BOVENAANZICHT', 200, 140, C.text2, 'left', 26);
    for (const [x, y, r] of [[360, 330, 70], [620, 260, 60], [980, 360, 80], [460, 620, 64], [1100, 660, 70]]) circ(ctx, x, y, r, '#3F6B4A', '#5A8A62', 2);
    const tV = q.at('vijfduizend'), dw = q.on('winter', 1, 1.5), kg = q.on('vergeten', 1, 1.5);
    for (let i = 0; i < 70; i++) { const x = 230 + hash(i) * 1000, y = 200 + hash(i + 80) * 600; const kiem = i % 17 === 3; const a = ramp(t, tV - 0.5 + i * 0.035, 0.3); if (a <= 0.01) continue;
      const blijf = kiem || i % 5 === 0; circ(ctx, x, y, kiem ? lerp(10, 14, kg) : 10, rgba(kiem && kg > 0.5 ? C.groen : C.oker, a * (blijf ? 1 : lerp(1, 0.25, dw)))); if (kiem) e3Kiem(ctx, x, y - 12, kg); }
    naamBij(ctx, '± 5000 eikels', 'in één herfst', 1560, 380, q.on('vijfduizend', 1, 0.6), 'center', C.oker); naamBij(ctx, 'vergeten → nieuwe eik', null, 1560, 560, kg, 'center', C.groen);
    ecoGaai(ctx, 1560, 800, 5, { houding: 'eikel' }); },
  s33(ctx, t, q) { _sch(ctx);
    const aL = 1 - q.on('Gaai', 1, 0.6); [['+', 'voordeel', 'Plus'], ['−', 'nadeel', 'min'], ['0', 'geen van beide', 'nul']].forEach(([s, w, c], i) => { const a = Math.min(q.on(c, 1, 0.5), aL); if (a <= 0.01) return; e3Teken(ctx, 700 + i * 260, 180, s, { r: 34, a }); metaText(ctx, w, 700 + i * 260, 250, rgba(C.text2, a), 'center', 24); });
    // gaai en eik elk in een eigen cirkel (verschillende schaal)
    const aC = ramp(t, 0, 0.5);
    e3A(ctx, aC, () => { for (const x of [640, 1260]) circ(ctx, x, 540, 230, rgba(C.fill, 0.6), C.line, 1.5);
      ctx.save(); ctx.beginPath(); ctx.arc(640, 540, 228, 0, 6.283); ctx.clip(); ecoGaai(ctx, 640, 680, 7.5, { houding: 'eikel' }); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(1260, 540, 228, 0, 6.283); ctx.clip(); e3Boom(ctx, 'eik', 1260, 740, 2.4, { wind: 0.2, t: t * 0.5 }); ctx.restore();
      metaText(ctx, 'gaai ± 34 cm', 640, 812, C.text2, 'center', 24); metaText(ctx, 'eik · niet op dezelfde schaal', 1260, 812, C.text2, 'center', 24); });
    const a1 = q.on('plus', 2, 0.5), a2 = q.on('plus', 3, 0.5);
    e3Teken(ctx, 640, 270, '+', { r: 40, a: a1 }); e3Teken(ctx, 1260, 270, '+', { r: 40, a: a2 });
    naamBij(ctx, 'voedsel', null, 720, 282, a1, 'left'); naamBij(ctx, 'verspreid', null, 1340, 282, a2, 'left');
    text(ctx, 'mutualisme', 960, 880, fTekst(48, 700), rgba(C.groen, q.on('mutualisme', 1, 0.6)), 'center'); },
  s34(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    vul(ctx, [[300, _G + 60], [700, 560], [1100, 520], [1500, 600], [1800, _G + 60]], '#C9A86A', '#DCC08A', 2);
    e3Hol(ctx, 1040, 700, 1.3); e3Hol(ctx, 1400, 690, 1.3);
    const tB = q.at('bergeend'), tE = q.at('veilige'); const u = clamp((t - tB) / Math.max(1.5, tE - tB - 0.3), 0, 1); const xe = lerp(560, 1000, u), weg = ramp(t, tE, 0.8);
    if (weg < 0.99) { const a = ramp(t, tB - 0.4, 0.3); if (u < 1) e3EendLoop(ctx, xe, 716, 3.6, t, 1, a); else e3Bergeend(ctx, 1000 + weg * 40, 716, 3.6 * (1 - 0.35 * weg), { kijk: 1, a: 1 - weg }); }
    ecoKonijn(ctx, 1520, 700, 3.6, { houding: 'zitten', kijk: -1, t: t * 0.3 });
    const aN = q.on('nul', 1, 0.5); e3Teken(ctx, 1040, 450, '+', { r: 40, a: aN }); e3Teken(ctx, 1520, 450, '0', { r: 40, a: aN });
    naamBij(ctx, 'bergeend', 'broedt in het hol', 1000, 370, q.on('bergeend', 1, 0.6), 'center'); naamBij(ctx, 'konijn', 'merkt er nauwelijks iets van', 1560, 370, q.on('merkt', 1, 0.6), 'center');
    ecoSchaal(ctx, 'bergeend ± 60 cm · konijn ± 40 cm'); naamBij(ctx, 'commensalisme', null, 960, 230, q.on('commensalisme', 1, 0.6), 'center', C.groen); },
  s35(ctx, t, q) { _sch(ctx); metaText(ctx, 'SYMBIOSE: LANG EN NAUW SAMENLEVEN', 260, 200, rgba(C.goud, ramp(t, 0, 0.5)), 'left', 30);
    const R = [['mutualisme', '+', '+', 'gaai en eik', 'mutualisme', 'gaai'], ['commensalisme', '+', '0', 'bergeend en konijn', 'commensalisme', 'commensalisme'], ['parasitisme', '+', '−', 'leverbot en schaap', 'parasitisme', 'nadeel']];
    R.forEach(([n, a, b, v, c1, c2], i) => { const y = 300 + i * 150, a1 = q.on(c1, 1, 0.6), a2 = q.on(c2, 1, 0.6); text(ctx, n, 260, y + 14, fTekst(44, 700), rgba(C.text, a1), 'left'); e3Teken(ctx, 880, y, a, { a: a2 }); e3Teken(ctx, 980, y, b, { a: a2 }); text(ctx, v, 1080, y + 12, fTekst(38, 500), rgba(C.text2, a2), 'left'); });
    const aD = q.on('predatie', 1, 0.6); if (aD > 0.01) { ctx.strokeStyle = rgba(C.line, aD); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(260, 700); ctx.lineTo(260 + 1400 * aD, 700); ctx.stroke(); }
    text(ctx, 'predatie', 260, 784, fTekst(44, 700), rgba(C.text2, aD), 'left'); e3Teken(ctx, 880, 770, '+', { a: 0.6 * aD }); e3Teken(ctx, 980, 770, '−', { a: 0.6 * aD });
    text(ctx, 'prooi gaat meteen dood', 1080, 782, fTekst(38, 500), rgba(C.text2, q.on('meteen', 1, 0.6)), 'left'); },
  s36(ctx, t, q) { _sch(ctx);
    persoon(ctx, 'noor', 440, 880, 600, { uit: 'neutraal', t, a: ramp(t, 0, 0.3) });
    const z = q.on('darm', 1, 1.0);
    if (z > 0.01) zoomCircle(ctx, 1220, 470, 330 * (0.5 + 0.5 * z), 450, 640, 'dikke darm · vergroot ± 2000×', z, () => e3DarmT(ctx, 1220, 470, 330, t, 1 - q.on('resten', 1, 3), q.on('vitamine', 1, 2)));
    naamBij(ctx, 'bacteriën', 'ongeveer evenveel als je cellen', 1220, 110, q.on('bacteriën', 1, 0.6), 'center');
    const aP = q.on('plus', 1, 0.5), aQ = q.on('plus', 2, 0.5); e3Teken(ctx, 1640, 300, '+', { r: 34, a: aP }); e3Teken(ctx, 1730, 300, '+', { r: 34, a: aQ }); naamBij(ctx, 'mens', null, 1640, 380, aP, 'center'); naamBij(ctx, 'bacterie', null, 1760, 380, aQ, 'left'); },
  s37(ctx, t, q) { e3Duin(ctx, { helm: false, horizon: 420, t });
    vul(ctx, [[-60, 600], [400, 580], [900, 610], [1990, 590], [1990, H], [-60, H]], '#3A2E24'); e3Boom(ctx, 'den', 420, 600, 2.2, { groei: 0.5, wind: 0.2, t: t * 0.5 }); lijn(ctx, [[420, 600], [432, 700], [404, 790]], '#C9A880', 10); lijn(ctx, [[428, 660], [500, 720], [540, 790]], '#C9A880', 7);
    const z = q.on('wortels', 1, 1.0);
    if (z > 0.01) zoomCircle(ctx, 1300, 470, 330 * (0.5 + 0.5 * z), 420, 790, 'worteltop met schimmeldraden · vergroot', z, () => e3MycoT(ctx, 1300, 470, 330, t, q.on('schimmeldraden', 1, 2.5), q.on('mineralen', 1, 0.8), q.on('suikers', 1, 0.8)));
    naamBij(ctx, 'mycorrhiza', 'jonge grove den', 1300, 112, q.on('mycorrhiza', 1, 0.6), 'center'); naamBij(ctx, 'water, mineralen → wortel', null, 950, 200, q.on('mineralen', 1, 0.6), 'right', ECOK.stikstof); naamBij(ctx, 'suikers → schimmel', null, 950, 260, q.on('suikers', 1, 0.6), 'right', C.groen); },

  // ---------------- H5 Twee gastheren
  s38(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    vul(ctx, [[600, 860], [900, 830], [1300, 850], [1500, 880], [1100, 900], [700, 900]], '#3E6A7A');
    [[300, 800, 'grazen'], [520, 820, 'grazen'], [760, 790, 'grazen']].forEach(([x, y, h], i) => ecoSchaap(ctx, x, y, 2.6, { houding: h, t: t * 0.3 + i * 0.3, kijk: i % 2 ? -1 : 1 }));
    ecoSchaap(ctx, 1240, 790, 2.6, { houding: 'staan', kijk: -1 });
    const tG = q.at('schapenhouder') - 0.2, h = 440, v = gangSnelheid('gerrit', h, 'loop'), L = 360, dt = clamp(t - tG, 0, L / v);
    if (t > tG) persoon(ctx, 'gerrit', 1960 - v * dt, 830, h, dt < L / v ? { zij: true, kijk: -1, gang: 'loop', t: dt } : { kijk: -1, t, pose: 'denk' });
    naamBij(ctx, 'mager schaap', null, 1240, 520, q.on('magerder', 1, 0.6), 'center', C.koraal); },
  s39(ctx, t, q) { e3Duin(ctx, { helm: false, t });
    ecoSchaap(ctx, 760, _G + 10, 3.2, { houding: 'staan' });
    const hold = t > q.at('mest') - 0.3; persoon(ctx, 'mila', 1180, _G + 20, 520, { pose: hold ? 'vasthouden' : 'staan', kijk: -1, t, a: ramp(t, 0, 0.3), hold: hold ? (c, x, y) => { roundRect(c, x - 12, y - 70, 24, 70, 8); shape(c, rgba('#E8E2D4', 0.6), C.line, 2); roundRect(c, x - 10, y - 30, 20, 28, 6); shape(c, '#6A5A3A', null); } : null });
    persoon(ctx, 'gerrit', 1520, _G + 20, 540, { pose: 'denk', kijk: -1, t, a: ramp(t, 0, 0.3) });
    naamBij(ctx, 'dierenarts', 'onderzoekt de mest', 1180, 200, q.on('dierenarts', 1, 0.5) * (1 - q.on('leverbot', 1, 0.5)), 'center'); naamBij(ctx, 'schapenhouder', null, 1560, 230, ramp(t, 0.3, 0.5) * (1 - q.on('leverbot', 1, 0.5)), 'center');
    // kaartje met de worm (± 3 cm)
    const aW = q.on('leverbot', 1, 0.6); e3A(ctx, aW, () => { roundRect(ctx, 160, 150, 440, 260, 18); shape(ctx, rgba(C.fill, 0.92), C.line, 1.5); e3Leverbot(ctx, 380, 260, 0.36, { rot: Math.sin(t * 0.8) * 0.08 }); naamBij(ctx, 'leverbot', '± 3 cm', 380, 370, q.on('centimeter', 1, 0.6), 'center'); });
    e3Teken(ctx, 560, 190, '+', { r: 28, a: q.on('voordeel', 1, 0.5) }); e3Teken(ctx, 760, 460, '−', { r: 34, a: q.on('nadeel', 1, 0.5) });
    naamBij(ctx, 'gastheer', null, 760, 550, q.on('gastheer', 1, 0.6), 'center', C.goud); },
  s40(ctx, t, q) { _sch(ctx);
    ecoSchaap(ctx, 420, 760, 3.2, { houding: 'staan' }); ctx.beginPath(); ctx.ellipse(470, 600, 52, 34, -0.2, 0, 6.283); shape(ctx, rgba('#8C4A42', 0.9), C.goud, 2);
    const z = ramp(t, 0.2, 1.0), tE = q.at('eitjes');
    zoomCircle(ctx, 1240, 460, 340 * (0.5 + 0.5 * z), 470, 600, 'lever · schematisch · niet op schaal', z, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 120, 680, 680); e3Lever(ctx, 1240, 460, 1.4);
      const g = 0.7 + 0.3 * q.on('volwassen', 1, 1.5); e3Leverbot(ctx, 1170, 380, 0.42 * g, { rot: -0.6 + Math.sin(t * 0.9) * 0.07 }); e3Leverbot(ctx, 1330, 470, 0.38 * g, { rot: 0.3 + Math.sin(t * 0.8 + 1) * 0.07 });
      for (let i = 0; i < 6; i++) { const a = ramp(t, tE + i * 0.25, 0.3); if (a <= 0.01) continue; const u = e3fr((t - tE) * 0.12 + i / 6); e3A(ctx, a, () => e3Ei(ctx, 1230 + i * 6 + u * 120, 540 + u * 160, 7)); } });
    // eitjes in de mest naar buiten
    const aM = q.on('mest', 1, 0.6); e3A(ctx, aM, () => { for (let i = 0; i < 5; i++) circ(ctx, 240 + i * 14, 752 - (i % 2) * 10, 10, '#4A3A2A'); for (let i = 0; i < 4; i++) e3Ei(ctx, 230 + i * 22, 712 - (i % 2) * 8 - 6 * Math.sin(t + i), 7); metaText(ctx, 'eitjes in mest', 280, 850, C.text2, 'center', 24); });
    naamBij(ctx, 'leverbot', '± 3 cm', 1240, 290, q.on('wormen', 1, 0.6) * z, 'center'); },
  s41(ctx, t, q) { _sch(ctx);
    const N = [[480, 'eitje', 'eitje', (x, y) => { for (let i = 0; i < 3; i++) e3Ei(ctx, x - 30 + i * 30, y + (i % 2) * 12, 14); }], [960, 'larve', 'larve', (x, y) => { ctx.beginPath(); ctx.ellipse(x, y + 30, 110, 34, 0, 0, 6.283); ctx.fillStyle = rgba('#3E6A7A', 0.8); ctx.fill(); e3Trilhaarlarve(ctx, x + Math.sin(t * 1.3) * 50, y + 20 + Math.sin(t * 2.1) * 6, 30); }], [1440, 'slak', 'slak', (x, y) => ecoLeverbotslak(ctx, x, y + 50, 70, {})]];
    N.forEach(([x, n, c, f], i) => { const a = i === 0 ? ramp(t, 0, 0.5) : q.on(c, 1, 0.6); if (a <= 0.01) return; e3A(ctx, a, () => { circ(ctx, x, 470, 150, rgba(C.fill, 0.95), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, 470, 148, 0, 6.283); ctx.clip(); f(x, 470); ctx.restore(); }); naamBij(ctx, n, null, x, 690, a, 'center'); });
    e3PijlG(ctx, 480, 470, 960, 470, q.on('larve', 1, 0.8), { r1: 160, r2: 165, lw: 3 }); const aS = q.on('slak', 1, 0.6); if (aS > 0.01) { ctx.save(); ctx.setLineDash([10, 10]); pijl(ctx, 1130, 470, 1270, 470, C.oker, aS, 3, 14); ctx.restore(); }
    vraagteken(ctx, 1440, 260, q.on('nodig', 1, 0.5), 90); },
  s43(ctx, t, q) { _sch(ctx);
    const cx = 960, cy = 480, R = 330; const cue = [0, 0, q.at('larve'), q.at('leverbotslak'), q.at('honderden'), q.at('cysten')];
    const st = [
      [-90, 'schaap', (x, y) => ecoSchaap(ctx, x, y + 60, 1.6, { houding: 'grazen', t: t * 0.3 })],
      [-30, 'eitjes in mest', (x, y) => { for (let i = 0; i < 4; i++) e3Ei(ctx, x - 30 + i * 20, y + (i % 2) * 10, 12); }],
      [30, 'larve in water', (x, y) => { ctx.beginPath(); ctx.ellipse(x, y + 20, 80, 26, 0, 0, 6.283); ctx.fillStyle = rgba('#3E6A7A', 0.8); ctx.fill(); e3Trilhaarlarve(ctx, x + Math.sin(t * 1.4) * 30, y + 10, 26); }],
      [90, 'slak', (x, y) => ecoLeverbotslak(ctx, x, y + 40, 60, {})],
      [150, 'honderden larven', (x, y) => { const n = Math.round(lerp(1, 7, q.on('honderden', 1, 1.2))); for (let i = 0; i < n; i++) e3Cercarie(ctx, x - 50 + (i % 4) * 32 + Math.sin(t * 2 + i) * 4, y - 20 + Math.floor(i / 4) * 34, 11, 0.4 * i + Math.sin(t * 3 + i) * 0.3); }],
      [210, 'cysten op gras', (x, y) => { e3Grasspriet(ctx, x, y + 60, 120); e3Cyste(ctx, x + 2, y - 10, 11); e3Cyste(ctx, x + 4, y + 26, 11); }]];
    const rond = q.on('rond', 1, 0.8); ctx.save(); ctx.strokeStyle = rond > 0.5 ? rgba(C.goud, 0.8) : C.line; ctx.lineWidth = rond > 0.5 ? 3 : 2; ctx.setLineDash([10, 10]); ctx.lineDashOffset = -t * 20 * rond; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke(); ctx.restore();
    st.forEach(([g, n, f], i) => { const a = i < 2 ? ramp(t, i * 0.4, 0.5) : ramp(t, cue[i], 0.6); if (a <= 0.01) return; const an = g * Math.PI / 180, x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R;
      e3A(ctx, a, () => { circ(ctx, x, y, 100, rgba(C.fill, 0.95), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, 98, 0, 6.283); ctx.clip(); f(x, y); ctx.restore(); });
      const vert = Math.abs(Math.cos(an)) < 0.3; const nx = vert ? x + 125 : cx + Math.cos(an) * (R + 125), ny = vert ? y + 12 : cy + Math.sin(an) * (R + 125) + 12; naamBij(ctx, n, null, nx, ny, a, vert || Math.cos(an) > 0.3 ? 'left' : 'right');
      const ai = i === 5 ? q.on('schaap', 1, 0.8) : (i === 0 ? ramp(t, 0.6, 0.5) : ramp(t, cue[i + 1], 0.6)); if (ai > 0.01) { const a2 = an + Math.PI / 3, b1 = an + 0.36, b2 = a2 - 0.36; pijl(ctx, cx + Math.cos(b1) * R, cy + Math.sin(b1) * R, cx + Math.cos(b2) * R, cy + Math.sin(b2) * R, C.oker, ai, 3, 14); } });
    metaText(ctx, 'schematisch · stadia vergroot', 80, 880, C.text2, 'left', 26); },
  s44(ctx, t, q) { _sch(ctx);
    const aE = q.on('eindgastheer', 1, 0.6), aT = q.on('tussengastheer', 1, 0.6);
    circ(ctx, 600, 470, 230, rgba(C.fill, 0.95), aE > 0.5 ? C.goud : C.line, aE > 0.5 ? 3 : 1.5); ecoSchaap(ctx, 600, 620, 3.2, { houding: 'grazen', t: t * 0.3 }); naamBij(ctx, 'eindgastheer', 'volwassen worm · eitjes', 600, 790, aE, 'center', C.goud);
    circ(ctx, 1320, 470, 230, rgba(C.fill, 0.95), aT > 0.5 ? C.goud : C.line, aT > 0.5 ? 3 : 1.5); ecoLeverbotslak(ctx, 1320, 540, 150, {}); naamBij(ctx, 'tussengastheer', 'larven vermenigvuldigen', 1320, 790, aT, 'center', C.goud);
    const tV = q.at('vermenigvuldigen'), n = Math.round(1 + 299 * clamp((t - tV) / 2.2, 0, 1)), aV = q.on('vermenigvuldigen', 1, 0.5);
    text(ctx, n >= 300 ? '1 → honderden' : '1 → ' + n, 1320, 200, fTekst(48, 700), rgba(C.goud, aV), 'center');
    const tD = q.at('duizenden'); if (t > tD) for (let i = 0; i < 60; i++) { const a = ramp(t, tD + i * 0.02, 0.3); circ(ctx, 880 + (i % 10) * 18, 400 + Math.floor(i / 10) * 18, 5, rgba(C.oker, a * 0.9)); } },
  s45(ctx, t, q) { _sch(ctx);
    ecoSchaap(ctx, 600, 760, 3.2, { houding: 'grazen', t: t * 0.3 }); ctx.beginPath(); ctx.ellipse(650, 600, 52, 34, -0.2, 0, 6.283); shape(ctx, rgba('#8C4A42', 0.9), C.goud, 2);
    zoomCircle(ctx, 1300, 440, 260, 650, 600, 'lever · schematisch', ramp(t, 0, 0.6), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1040, 180, 520, 520); e3Lever(ctx, 1300, 440, 1.05); e3Leverbot(ctx, 1250, 380, 0.32, { rot: -0.6 + Math.sin(t) * 0.07 }); });
    vraagteken(ctx, 1700, 230, q.on('Hoe', 1, 0.5), 100); },
  s47(ctx, t, q) { const tD = q.at('Daarom');
    if (t < tD) { _sch(ctx);
      const rij = (y, lang, a, d0, dur) => { ctx.save(); ctx.globalAlpha *= a; ecoSchaap(ctx, 300, y + 60, 1.6, { houding: 'grazen', t: t * 0.3 }); const L = lang * clamp((t - d0) / dur, 0, 1); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(460, y + 30); ctx.lineTo(460 + L, y + 30); ctx.stroke();
        for (let i = 0; i < Math.floor(L / 40); i++) e3Ei(ctx, 480 + i * 40, y, 10); ctx.restore(); };
      const t1 = q.at('levend'), t2 = q.at('stierf');
      if (t > t1 - 0.3) { rij(300, 1200, ramp(t, t1 - 0.3, 0.4), t1, Math.max(2, t2 - t1)); metaText(ctx, 'SCHAAP LEEFT LANG · VEEL EITJES', 480, 260, rgba(C.text2, ramp(t, t1, 0.5)), 'left', 26); }
      if (t > t2 - 0.3) { rij(560, 260, ramp(t, t2 - 0.3, 0.4) * lerp(1, 0.35, q.on('minder', 1, 1)), t2, 1); metaText(ctx, 'SCHAAP STERFT SNEL · WEINIG EITJES', 480, 520, rgba(C.text2, ramp(t, t2, 0.5)), 'left', 26); }
      haak(ctx, 460, 1660, 700, 'Niet willen: wie snel doodt, laat minder nakomelingen na.', C.groen, q.on('Willen', 1, 0.6)); return; }
    // harde snede: de natte duinvallei, behandelde kudde en een hek voor de natste plek
    const u = t - tD; e3Duin(ctx, { helm: false, t });
    vul(ctx, [[1100, 860], [1350, 830], [1650, 850], [1800, 880], [1500, 900], [1150, 900]], '#3E6A7A');
    [[300, 800], [500, 820], [700, 790]].forEach(([x, y], i) => ecoSchaap(ctx, x, y, 2.6, { houding: 'grazen', t: t * 0.3 + i * 0.3, kijk: i % 2 ? -1 : 1 }));
    persoon(ctx, 'mila', 860, 830, 420, { kijk: -1, t, a: ramp(u, 0, 0.3) }); persoon(ctx, 'gerrit', 1000, 830, 440, { kijk: 1, t, a: ramp(t, q.at('schapenhouder') - 0.2, 0.3) });
    e3Hek(ctx, 1060, 1840, 840, q.on('weg', 1, 1.5));
    for (const [x, y] of [[1300, 862], [1560, 870]]) ecoLeverbotslak(ctx, x, y, 14, { a: q.on('slakken', 1, 0.6) });
    naamBij(ctx, 'natte plek: hier leven de slakken', null, 1450, 760, q.on('slakken', 1, 0.6), 'center', C.teal); },

  // ---------------- Samenvatting
  s48(ctx, t, q) { _sch(ctx);
    const tS = q.at('stoffen'), u = clamp((t - tS) / 5, 0, 1);
    e3WebA(ctx, { focus: t > q.at('bovenaan') ? ['vos'] : [] });
    e3Stroom(ctx, 330, 790, 330, 540, t, q.on('stoffen', 1, 0.6), C.koraal, 2, 0.35, 9, 70, 74); e3Stroom(ctx, 330, 540, 540, 270, t + 0.7, q.on('stoffen', 1, 0.6), C.koraal, 2, 0.35, 9, 70, 74);
    for (const [k, n, d] of [['helm', 2, 0], ['konijn', 4, 0.25], ['vos', 8, 0.45]]) { const [x, y] = E3WEB[k]; const m = Math.round(n * clamp((u - d) * 2, 0, 1)); for (let i = 0; i < m; i++) circ(ctx, x + 82 + (i % 4) * 24, y - 50 + Math.floor(i / 4) * 24, 9, C.koraal); }
    naamBij(ctx, 'accumulatie', 'zie de film Eén aarde', 1560, 760, q.on('accumulatie', 1, 0.6), 'center', C.koraal); },
  s49(ctx, t, q) { _sch(ctx);
    const aP = q.on('pijlen', 1, 0.6); e3WebA(ctx, {});
    for (const [a, b] of E3WEBP) { const [x1, y1] = E3WEB[a], [x2, y2] = E3WEB[b]; e3Stroom(ctx, x1, y1, x2, y2, t, aP * (1 - q.on('rover', 1, 0.6)), C.goud, 1, 0.4, 9, 70, 74); }
    const a1 = q.on('plus', 2, 0.5), a2 = q.on('nul', 1, 0.5), a3 = q.on('min', 1, 0.5);
    e3Teken(ctx, 1030, 230, '+', { r: 24, a: a1 }); e3Teken(ctx, 840, 760, '+', { r: 24, a: a1 });
    e3A(ctx, a2, () => { roundRect(ctx, 1500, 160, 360, 300, 18); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); e3Bergeend(ctx, 1600, 330, 1.7); ecoKonijn(ctx, 1770, 330, 1.6, { houding: 'zitten', kijk: -1 }); e3Teken(ctx, 1600, 210, '+', { r: 24 }); e3Teken(ctx, 1770, 210, '0', { r: 24 }); naamBij(ctx, 'commensalisme', null, 1680, 410, 1, 'center'); });
    e3A(ctx, a3, () => { roundRect(ctx, 1500, 560, 360, 300, 18); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); e3Knoop(ctx, 1600, 690, null, E3P.schaap, { r: 60 }); e3Knoop(ctx, 1770, 690, null, E3P.slak, { r: 60 }); e3Teken(ctx, 1600, 600, '−', { r: 24 }); naamBij(ctx, 'leverbot', null, 1680, 830, 1, 'center'); }); },
  s50(ctx, t, q) { e3Duin(ctx, { t });
    vul(ctx, [[1100, 760], [1300, 640], [1500, 760]], '#4A5E4C'); ecoVos(ctx, 1300, 650, 2.6, { houding: 'staan', kijk: -1 });
    const min = q.on('minder', 1, 1) * (1 - q.on('meegaan', 1, 1.5));
    [[420, _G + 20, 'grazen'], [580, _G, 'zitten'], [760, _G + 30, 'grazen'], [880, _G + 10, 'zitten']].forEach(([x, y, h], i) => ecoKonijn(ctx, x, y, 2.8, { houding: h, t: t * 0.35 + i * 0.3, kijk: i % 2 ? -1 : 1, a: i % 2 ? 1 - min : 1 }));
    const g = q.on('lynxen', 1, 2.5); ctx.save(); ctx.translate(240, 120); ctx.scale(0.32, 0.3); const aG = ramp(t, q.at('lynxen') - 0.3, 0.5); e3GrafiekA(ctx, { x: 200, y: 700, w: 1400, h: 520, haas: 20 * g, lynx: 20 * clamp(g * 1.15 - 0.15, 0, 1), a: aG, as: 0 }); if (aG > 0.01) { ctx.strokeStyle = rgba(C.line, aG); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(200, 160); ctx.lineTo(200, 700); ctx.lineTo(1620, 700); ctx.stroke(); } ctx.restore();
    naamBij(ctx, 'haas', null, 260, 120, aG, 'left', C.teal); naamBij(ctx, 'lynx', null, 380, 120, aG, 'left', C.oker); },
});
