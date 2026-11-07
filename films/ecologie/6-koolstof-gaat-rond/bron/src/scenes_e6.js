// scenes_e6.js — film 6 Koolstof gaat rond — geanimeerde scènes op de keyframes van sb6.js (bouw 29 okt 2026)
// t = seconden sinds het begin van de alinea; q.on(woord, n, duur) = 0→1 vanaf dat woord. Het gevolgde atoom is goud; CO₂ grijs; organisch groen; warmte koraal; water teal.
function e6Snel(a = {}) { return E6_SNEL.map(v => Object.assign({}, v, { a: a[v.id] == null ? 1 : a[v.id] })); }
function e6Wolk(ctx, t, n, x0, x1, y0, y1, s = 1, a = 1) { for (let i = 0; i < n; i++) e6Co2(ctx, x0 + hash(i * 3) * (x1 - x0) + Math.sin(t * 0.5 + i) * 14, y0 + hash(i * 7) * (y1 - y0) + Math.cos(t * 0.6 + i * 2) * 10, s, { a, hoek: Math.sin(t * 0.4 + i) * 0.6 }); }

Object.assign(SCENES, {
  // ================= TITEL: kringloop met rondgaand gouden atoom (rechts van x 1150) =================
  title(ctx, t) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); const cx = 1460, cy = 780, R = 190, a = e6S(t / 0.8);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = E6K.co2; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke();
    for (const an of [0.4, 2.0, 3.6, 5.2]) pijl(ctx, cx + Math.cos(an) * R, cy + Math.sin(an) * R, cx + Math.cos(an + 0.3) * R, cy + Math.sin(an + 0.3) * R, E6K.co2, 1, 8, 22); ctx.restore();
    const an = t * 0.45; e6Atoom(ctx, cx + Math.cos(an) * R, cy + Math.sin(an) * R, 18, { a }); },

  // ================= OPENING =================
  s01(ctx, t, q) { const D = e6Dur(arguments[3], 10), u = t / D; ctx.save(); const z = 1.07; ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-960 + 50 - 100 * u, -540);
    e6Moerasbos(ctx); e6Schubboom(ctx, 1300, 780, 640, { seed: 9 });
    ctx.save(); ctx.translate(760, 770); ctx.rotate(Math.sin(t * 0.7) * 0.015); ctx.translate(-760, -770); e6Boomvaren(ctx, 760, 770, 230, { seed: 11, licht: true }); ctx.restore();
    const aA = q.on('koolstofatoom', 1, 0.8); e6Atoom(ctx, 820, 560, 16, { a: aA }); e6Puls(ctx, 820, 560, 26, t, aA); ctx.restore(); ctx.fillStyle = rgba(C.bgMacroSky, 0.85); ctx.fillRect(30, 0, 570, 66);
    naamBij(ctx, 'boomvaren', '± 8 meter', 760, 810, q.on('Boomvarens'), 'center'); naamBij(ctx, 'wolfsklauwboom', 'tot ± 30 meter', 1420, 400, q.on('wolfsklauwbomen'), 'left');
    if (q.on('geleden') > 0.5) ecoSchaal(ctx, 'Carboon · ± 300 miljoen jaar geleden'); },
  s02(ctx, t, q) { e6Straat(ctx); const aA = q.on('atoom', 1, 0.8), x = 1420 + Math.sin(t * 0.35) * 40, y = 230 + Math.sin(t * 0.6) * 18;
    e6Co2(ctx, x, y, 2, { goud: true, a: aA, hoek: Math.sin(t * 0.5) * 0.4 });
    vraagteken(ctx, 1600, 260, q.on('Hoe'), 140); naamBij(ctx, 'hetzelfde atoom', 'als koolstofdioxide', 1420, 340, q.on('koolstofdioxide'), 'center', C.goud); ecoSchaal(ctx, 'nu'); },

  // ================= H1 DE SNELLE KRINGLOOP =================
  s04(ctx, t, q) { e6Bg(ctx); e6GroenBlad(ctx, 780, 560, 34, -0.25 + Math.sin(t * 0.8) * 0.02);
    const aC = q.on('koolstofdioxide', 1, 0.8), uIn = e6Tus(t, q.at('koolstofdioxide') + 0.3, q.at('bouwt') + 0.2), uG = e6Tus(t, q.at('glucose') - 0.4, q.at('glucose') + 1.4);
    for (const [x, y] of [[220, 300], [380, 210], [1560, 260]]) e6Co2(ctx, x + Math.sin(t * 0.5 + x) * 12, y + Math.cos(t * 0.4 + y) * 8, 2.2, { a: aC, hoek: Math.sin(t * 0.3 + x) * 0.5 });
    // het gouden CO₂-molecuul gaat het blad in; daarna schuift het atoom in de glucose-zeshoek
    if (uIn < 1) e6Co2(ctx, lerp(330, 700, uIn), lerp(420, 520, uIn), 2.2, { goud: true, a: aC * (1 - e6S((uIn - 0.8) / 0.2)) });
    e6PijlA(ctx, 430, 430, 600, 500, aC);
    const gx = 1380, gy = 620; e6Zeshoek(ctx, gx, gy, 70, q.on('glucose', 1, 0.6)); e6PijlA(ctx, 1000, 600, 1280, 620, q.on('glucose', 1, 0.8), C.line, 4);
    if (uIn >= 1) e6Atoom(ctx, lerp(760, gx + 61, uG), lerp(540, gy - 35, uG), 14);
    naamBij(ctx, 'glucose', 'organische stof', gx, gy + 130, q.on('glucose'), 'center', C.oker); naamBij(ctx, 'koolstofdioxide', 'uit de lucht', 330, 540, aC, 'center', '#D2D8E2');
    naamBij(ctx, 'fotosynthese', null, 800, 300, q.on('fotosynthese'), 'center', C.groen);
    const aO = q.on('hout', 1, 1); if (aO > 0) { ctx.save(); ctx.globalAlpha *= aO; metaText(ctx, 'daarna: hout · blad · wortels', gx, gy + 210, C.grain, 'center', 26); ctx.restore(); } },
  // vraag-alinea: een plant onder een afgesloten glazen stolp, in het donker
  s05(ctx, t, q) { e6Bg(ctx); ctx.fillStyle = '#141E30'; roundRect(ctx, 460, 120, 1000, 740, 24); ctx.fill(); circ(ctx, 1320, 230, 36, '#C8CED8'); circ(ctx, 1336, 220, 32, '#141E30');
    e6Stolp(ctx, 960, 800, 2.3, t, { a: e6S(t / 0.8) }); ctx.save(); ctx.beginPath(); ctx.rect(700, 300, 520, 480); ctx.clip(); e6Wolk(ctx, t, 6, 760, 1160, 340, 600, 1, q.on('koolstofdioxide', 1, 0.8)); ctx.restore();
    naamBij(ctx, 'afgesloten glazen stolp', 'in het donker', 960, 230, q.on('stolp'), 'center'); vraagteken(ctx, 1340, 520, q.on('gebeurt'), 120); },
  s07(ctx, t, q) { e6Bg(ctx); const aD = q.on('dissimileert', 1, 0.8), aV = q.on('koolstofdioxide', 1, 0.8), aDag = q.on('Overdag', 1, 0.8), aF = q.on('fotosynthese', 1, 0.8);
    [[520, true, aDag], [1400, false, 1]].forEach(([x, dag, ap]) => { if (ap <= 0.01) return; ctx.save(); ctx.globalAlpha *= ap; roundRect(ctx, x - 380, 170, 760, 640, 20); shape(ctx, rgba(dag ? '#2E4466' : '#141E30', 0.9), C.line, 2);
      ctx.save(); roundRect(ctx, x - 380, 170, 760, 640, 20); ctx.clip(); ecoKlaver(ctx, x, 640, 26, { wind: Math.sin(t * 0.8 + x) * 0.15 }); ctx.fillStyle = '#3A3026'; ctx.fillRect(x - 380, 642, 760, 170); ctx.restore();
      e6PijlA(ctx, x + 120, 470, x + 270, 330, aD, E6K.co2, 6); const p = e6Fr(t * 0.3 + (dag ? 0.5 : 0)); if (aV > 0.01) e6Co2(ctx, lerp(x + 120, x + 300, p), lerp(470, 300, p), 1.4, { a: aV * Math.sin(Math.PI * p) });
      if (dag) { e6PijlA(ctx, x - 270, 330, x - 120, 470, aF, E6K.co2, 12); for (let k = 0; k < 2; k++) { const f = e6Fr(t * 0.35 + k / 2); e6Co2(ctx, lerp(x - 300, x - 120, f), lerp(300, 470, f), 1.4, { a: aF * Math.sin(Math.PI * f) }); }
        naamBij(ctx, 'fotosynthese', 'opname, met licht', x - 200, 720, aF, 'center', C.groen); }
      else { circ(ctx, x - 250, 270, 30, '#C8CED8'); circ(ctx, x - 236, 262, 27, '#141E30'); }
      naamBij(ctx, 'dissimilatie', 'afgifte, altijd', x + 200, 720, aD, 'center', '#D2D8E2'); metaText(ctx, dag ? 'DAG' : 'NACHT', x, 220, C.text2, 'center', 28); ctx.restore(); }); },
  s08(ctx, t, q) { e6Bg(ctx); const aR = q.on('rups', 1, 0.8), aB = q.on('schimmels', 1, 0.8), aDi = q.on('dissimileren', 1, 1), aK = q.on('cirkel', 1, 1), aT = q.on('jaar', 1, 1);
    const V = e6KringA(ctx, e6Snel({ dier: aR, bodem: aB }), [['lucht', 'plant', 'fotosynthese', null, e6S(t / 0.8)], ['plant', 'lucht', 'dissimilatie', null, aDi], ['plant', 'dier', null, null, aR], ['dier', 'lucht', null, null, aDi], ['plant', 'bodem', null, null, aB], ['dier', 'bodem', null, null, aB], ['bodem', 'lucht', 'afbraak', null, aDi]], { t, stroom: aK, tijd: aT });
    // het atoom: lucht → plant → dier (rups) → lucht, daarna rondjes
    const tR = q.at('rups'), tD = q.at('dissimileren'); let p;
    if (!isFinite(tR) || t < tR) p = e6Route(V, ['lucht', 'plant'], 0.999); else if (t < tD) p = e6Route(V, ['plant', 'dier'], Math.min(0.999, e6Tus(t, tR, tR + 1.5))); else p = e6Route(V, ['dier', 'lucht', 'plant', 'dier'], e6Fr((t - tD) / 9) * 2.999);
    e6Atoom(ctx, p[0], p[1], 14); haak(ctx, 380, 1540, 650, 'de snelle kringloop: dagen tot eeuwen', C.groen, aK); },
  s09(ctx, t, q) { e6Bg(ctx); const aK = q.on('koolstof', 1, 0.8), aE = q.on('Energie', 1, 1.6), aW = q.on('warmte', 1, 1);
    e6KringA(ctx, e6Snel(), E6_SNEL_P.map(p => p.concat([null, 1])), { t, stroom: Math.max(0.4, aK), a: 0.9 });
    e6PijlA(ctx, 200, 720, 1720, 720, aE, C.goud, 6); for (const x of [700, 1150, 1600]) { ctx.save(); ctx.globalAlpha *= aW * (0.6 + 0.4 * Math.sin(t * 2 + x)); e5WarmteE6(ctx, x, 700 - e6Fr(t * 0.4 + x) * 14); ctx.restore(); }
    naamBij(ctx, 'pijlen = koolstof gaat ergens heen', 'niet "eet"', 960, 860, q.on('eet'), 'center', '#D2D8E2'); naamBij(ctx, 'energie stroomt door', 'en wordt warmte', 1780, 660, aE, 'right', C.goud); },

  // ================= H2 WAAR AFBRAAK STOPT =================
  s10(ctx, t, q) { e6Moerasbos(ctx, { water: 600 }); const uV = e6Tus(t, q.at('stapelen') - 0.5, q.at('veen', 1) + 1.5), lh = lerp(40, 260, uV);
    ctx.fillStyle = '#4A3420'; ctx.fillRect(0, 1080 - lh, W, lh);
    // dode stammen en bladeren zakken door het water naar de bodem
    ctx.strokeStyle = '#7A5A3A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; const aZ = q.on('Dode', 1, 0.6);
    for (let i = 0; i < 12; i++) { const f = e6Fr(hash(i * 5) + t * 0.08), x = hash(i * 4) * W, y0 = 620, y = lerp(y0, 1080 - lh + 10, f), d = hash(i * 2) * 30; ctx.save(); ctx.globalAlpha *= Math.max(0.35, aZ) * Math.min(1, (1 - f) * 5); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90 + hash(i) * 60, y + 10 + d); ctx.stroke(); ctx.restore(); }
    e6Atoom(ctx, 1560, 1080 - lh + 34, 14, { a: q.on('veen', 1, 0.8) }); ctx.fillStyle = rgba(C.bgMacroSky, 0.85); ctx.fillRect(30, 0, 570, 66);
    naamBij(ctx, 'veen', 'dode varens, niet afgebroken', 360, 862, q.on('veen', 1), 'center', '#C9A35C'); naamBij(ctx, 'nat, weinig zuurstof', 'reducenten werken nauwelijks', 1460, 700, q.on('zuurstofarm'), 'center', C.teal);
    const aH = q.on('hoogveen', 1, 0.8); if (aH > 0) { ctx.save(); ctx.globalAlpha *= aH; roundRect(ctx, 1500, 150, 360, 200, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); ctx.fillStyle = '#4A3420'; ctx.fillRect(1520, 270, 320, 60);
      ctx.fillStyle = '#6E3A2A'; ctx.fillRect(1520, 255, 320, 15); for (let i = 0; i < 18; i++) { const x = 1530 + i * 17; ctx.strokeStyle = i % 2 ? '#9AB85A' : '#B8C86A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 256); ctx.lineTo(x + Math.sin(t + i) * 2, 232 - (i % 3) * 4); ctx.stroke(); }
      metaText(ctx, 'hoogveen nu: veenmos', 1680, 200, C.grain, 'center', 24); ctx.restore(); } },
  s11(ctx, t, q) { e6Bg(ctx); const f1 = lerp(0, 0.05, e6Tus(t, q.at('lagen') - 0.2, q.at('veen') + 0.5)), f2 = lerp(0.05, 0.5, e6Tus(t, q.at('bruinkool') - 0.4, q.at('bruinkool') + 1.2)), f3 = lerp(0.5, 1, e6Tus(t, q.at('steenkool') - 0.4, q.at('steenkool') + 1.4));
    const a2 = q.on('bruinkool', 1, 0.6), a3 = q.on('steenkool', 1, 0.6);
    [['veen', f1, 1], ['bruinkool', f2, a2], ['steenkool', f3, a3]].forEach(([n, f, a], i) => { if (a <= 0.01) return; const x = 160 + i * 560; ctx.save(); ctx.globalAlpha *= a; e6Lagen(ctx, x, 200, 440, 560, f); ctx.restore(); naamBij(ctx, n, ['begin', 'miljoenen jaren', 'tientallen miljoenen jaren'][i], x + 220, 840, a, 'center'); });
    e6PijlA(ctx, 620, 480, 700, 480, a2, C.line, 5); e6PijlA(ctx, 1180, 480, 1260, 480, a3, C.line, 5); },
  // vraag-alinea: de steenkoollaag met het atoom en een tikkende klok
  s12(ctx, t, q) { e6Bg(ctx); const yv = e6Lagen(ctx, 660, 180, 600, 600, 1); e6Puls(ctx, 660 + 600 * 0.62, yv + 600 * 0.06, 20, t, q.on('atoom'));
    e6Klok(ctx, 1480, 420, 80, t, q.on('lang', 1, 0.6)); vraagteken(ctx, 1480, 620, q.on('lang'), 110); naamBij(ctx, 'steenkool', null, 960, 840, e6S(t / 0.6), 'center'); },
  s14(ctx, t, q) { e6Bg(ctx); const kool = e6Mijn(ctx, 300, 300, 1100, 560);
    e6Mijnwerker(ctx, 960, kool + 42, 150, { kijk: 1, a: q.on('mijnwerkers', 1, 0.3), t });
    ctx.fillStyle = '#1E1C1E'; ctx.fillRect(300 + 1100 * 0.85, kool - 150, 1100 * 0.15 - 2, 200);
    // brok steenkool met het atoom: ligt stil, gaat dan via de gang en de schacht naar boven
    const uB = e6Tus(t, q.at('boven') - 0.6, q.at('boven') + 2.4), sx = 300 + 1100 * 0.2 + 20; let bx, by;
    if (uB < 0.5) { bx = lerp(1320, sx, uB * 2); by = kool - 40; } else { bx = sx; by = lerp(kool - 40, 230, (uB - 0.5) * 2); }
    if (uB > 0) vul(ctx, [[bx - 28, by + 10], [bx - 20, by - 18], [bx + 16, by - 22], [bx + 30, by + 4], [bx + 10, by + 22]], '#2A2628', '#4A4448', 2);
    e6Atoom(ctx, bx, by, 16, { a: q.on('Carboon', 1, 0.8) }); e6Puls(ctx, bx, by, 26, t, q.on('stil') * (1 - uB));
    naamBij(ctx, 'steenkoollaag', 'Carboon · ± 300 miljoen jaar oud', 1320, 860, q.on('Carboon'), 'center'); naamBij(ctx, 'mijn in Zuid-Limburg', 'tot het jaar 1974', 1550, 360, q.on('1974'), 'left', C.text2); },
  s15(ctx, t, q) { e6Straat(ctx, { grond: 880 }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 880); ctx.fillStyle = '#243656'; ctx.fillRect(0, 760, W, 120); ctx.fillStyle = '#3A3E46'; ctx.fillRect(0, 880, W, 200);
    e6Centrale(ctx, 820, 880, 1.1, { pluim: false }); const tx = 820 + 160 * 1.1, ty = 880 - 560 * 1.1; e6Pluim(ctx, tx, ty - 20, 1, t, q.on('verbrand', 1, 1));
    const uA = e6Tus(t, q.at('schoorsteen') - 0.4, q.at('lucht') + 0.6); e6Co2(ctx, lerp(tx, 1260, uA) + Math.sin(t * 0.6) * 8 * uA, lerp(ty - 10, 180, uA), 1.6, { goud: true, a: q.on('koolstofdioxide', 1, 0.6), hoek: Math.sin(t * 0.5) * 0.4 });
    naamBij(ctx, 'kolencentrale', 'steenkool verbrand', 620, 560, q.on('kolencentrale'), 'center'); naamBij(ctx, 'weer koolstofdioxide', null, 1260, 300, q.on('lucht'), 'center', C.goud); },
  s16(ctx, t, q) { e6Bg(ctx); const A = [q.on('aardolie', 1, 0.8), q.on('steenkool', 1, 0.8), q.on('kalk', 1, 0.8)];
    const kol = [['aardolie en aardgas', 'plankton op de zeebodem', '#3E5A70'], ['steenkool', 'moerasbossen', '#2A2628'], ['kalksteen', 'schelpen en kalkskeletten', '#C9C0A6']];
    kol.forEach(([n, m, kl], i) => { const a = A[i]; if (a <= 0.01) return; const x = 210 + i * 560; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 230, 420, 520, 16); shape(ctx, rgba(kl, 0.55), C.line, 2); ctx.restore(); naamBij(ctx, n, m, x + 210, 820, a, 'center');
      ctx.save(); roundRect(ctx, x, 230, 420, 520, 16); ctx.clip(); ctx.globalAlpha *= a;
      if (i === 0) { for (let k = 0; k < 18; k++) { const f = e6Fr(hash(k * 7) + t * 0.06); circ(ctx, x + 40 + hash(k * 3) * 340 + Math.sin(t + k) * 6, lerp(250, 730, f), 6, C.groen, null); } ctx.fillStyle = '#2A3A48'; ctx.fillRect(x, 700, 420, 50); }
      if (i === 1) { const n1 = Math.floor(8 * e6Tus(t, q.at('steenkool'), q.at('steenkool') + 3)); ctx.strokeStyle = '#6A5A4A'; ctx.lineWidth = 4; for (let k = 0; k < n1; k++) { ctx.beginPath(); ctx.moveTo(x + 40, 664 - k * 52); ctx.lineTo(x + 380, 660 - k * 52); ctx.stroke(); } }
      if (i === 2) { const tk = q.at('kalk'), n2 = Math.min(16, Math.max(0, (t - tk) / 0.35)); ctx.strokeStyle = '#8A8068'; ctx.lineWidth = 3;
        for (let k = 0; k < Math.ceil(n2); k++) { const cx = x + 50 + (k % 4) * 100, cyE = 690 - Math.floor(k / 4) * 110, f = e6S(n2 - k), cy = lerp(250, cyE, f); ctx.beginPath(); ctx.arc(cx, cy, 26, Math.PI, 0); ctx.stroke(); for (let r = -2; r <= 2; r++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * 11, cy - 24); ctx.stroke(); } } }
      ctx.restore(); });
    metaText(ctx, 'ALLE DRIE: MILJOENEN JAREN', 960, 190, rgba(C.grain, q.on('trage')), 'center', 28); },
  s17(ctx, t, q) { e6Bg(ctx); const aT = q.on('trage', 1, 1), aF = q.on('fossiele', 1, 1), aM = q.on('miljoenen', 1, 1);
    const V0 = [{ id: 'lucht', x: 960, y: 170, naam: 'lucht', tijd: 'jaren' }, { id: 'plant', x: 520, y: 380, naam: 'planten', tijd: 'jaren–eeuwen', kl: '#2E4A3A' }, { id: 'bodem', x: 1400, y: 380, naam: 'bodem', tijd: 'jaren–eeuwen', kl: '#3A3026' },
      { id: 'veen', x: 1400, y: 660, naam: 'veen', tijd: 'duizenden jaren', kl: '#4A3420', a: aT, ta: aM }, { id: 'fossiel', x: 960, y: 820, naam: 'steenkool, olie, gas', tijd: 'miljoenen jaren', kl: '#2A2628', a: aT, ta: aM }, { id: 'kalk', x: 400, y: 760, naam: 'kalksteen', tijd: 'miljoenen jaren', kl: '#6A6452', a: aT, ta: aM }];
    const V = e6KringA(ctx, V0, [['lucht', 'plant', null, null, 1], ['plant', 'bodem', null, null, 1], ['bodem', 'lucht', null, null, 1], ['bodem', 'veen', null, null, q.on('afbraak', 1, 1)], ['veen', 'fossiel', null, null, q.on('blijft', 1, 1)], ['fossiel', 'lucht', 'verbranding', C.koraal, aF], ['lucht', 'kalk', null, C.teal, aT]], { bw: 300, t, stroom: 0.6 });
    const tA = q.at('afbraak'), p = (!isFinite(tA) || t < tA) ? e6Route(V, ['lucht', 'plant', 'bodem'], e6Fr(t / 6) * 1.999, 300) : e6Route(V, ['bodem', 'veen', 'fossiel'], Math.min(1.999, (t - tA) / 2.2), 300);
    e6Atoom(ctx, p[0], p[1], 14); naamBij(ctx, 'trage kringloop', null, 1600, 870, aT, 'center', C.goud); naamBij(ctx, 'via de oceaan', null, 470, 600, aT, 'center', _lt(C.teal, 0.2)); },

  // ================= H3 VOORRAAD EN STROOM =================
  s18(ctx, t, q) { e6Bg(ctx); e6StaafA(ctx, 300, 760, 1380, 500, { n: [q.on('lucht'), q.on('planten'), q.on('bodem'), q.on('fossiele'), q.on('oceaan')], as: q.on('gigaton') }); },
  // vraag-alinea: de vijf voorraden zonder staven, met een vraagteken
  s19(ctx, t, q) { e6Bg(ctx); e6StaafA(ctx, 300, 760, 1380, 500, {}); vraagteken(ctx, 960, 400 + Math.sin(t * 2) * 6, q.on('meeste'), 140); },
  s21(ctx, t, q) { e6Bg(ctx); const tb = q.at('bodem');
    e6StaafA(ctx, 300, 760, 1380, 500, { g: [q.on('lucht', 1, 1), q.on('planten', 1, 1), q.on('bodem', 1, 1), e6Tus(t, tb + 1.2, tb + 2.4), q.on('oceaan', 1, 2.2)], gs: q.on('verreweg', 1, 1.2) });
    naamBij(ctx, 'vooral opgelost in diep water', null, 300 + 1380 / 6 * 4.5 - 90, 380, q.on('diepe'), 'right', _lt(C.teal, 0.3)); },
  s22(ctx, t, q) { e6Bg(ctx); e6OceaanA(ctx, 260, 180, 1400, 680, t, { alg: q.on('Algen', 1, 1), rest: q.on('zakken', 1, 1.5), bodem: lerp(30, 60, q.on('kalksteen', 1, 2)) });
    const aL = q.on('lost', 1, 0.8); for (const x of [500, 900, 1300]) { const f = e6Fr(t * 0.3 + x * 0.001); e6Co2(ctx, x, lerp(110, 260, f), 1, { a: aL * Math.min(1, (1 - f) * 3) }); }
    naamBij(ctx, 'algen', 'fotosynthese', 1690, 260, q.on('Algen'), 'left', C.groen); naamBij(ctx, 'resten', 'zakken', 1690, 560, q.on('zakken'), 'left', '#C9B896'); naamBij(ctx, 'diepzee', 'eeuwen', 1690, 800, q.on('honderden'), 'left', C.teal);
    const aK = q.on('kalksteen'); if (aK > 0) metaText(ctx, 'kalksteen', 960, 845, rgba(C.text2, aK), 'center', 24); },
  s23(ctx, t, q) { e6Bg(ctx); const aB = q.on('badkuip', 1, 0.8);
    e6BadA(ctx, 560, 760, 800, 360, { peil: 0.5, t, a: aB, kranen: [[0.3, 40, E6K.co2, 'stroom erin', q.on('kraan', 1, 1)]], afvoer: [[0.7, 40, E6K.co2, 'stroom eruit', q.on('afvoer', 1, 1)]] });
    naamBij(ctx, 'voorraad', 'koolstof in de lucht · gigaton', 960, 640, q.on('hoeveelheid'), 'center');
    metaText(ctx, 'VOORRAAD = GIGATON', 760, 200, rgba(C.grain, q.on('voorraad')), 'center', 26); metaText(ctx, 'STROOM = GIGATON PER JAAR', 1200, 200, rgba(C.grain, q.on('stroom')), 'center', 26); },
  s24(ctx, t, q) { e6Bg(ctx); const aF = q.on('Fotosynthese', 1, 1), aD = q.on('Dissimilatie', 1, 1), aO = q.on('oceaan', 1, 1);
    e6BadA(ctx, 560, 760, 800, 360, { peil: 0.5, t, kranen: [[0.22, 70, E6K.co2, 'dissimilatie, afbraak', aD], [0.62, 60, C.teal, 'uit de oceaan', aO]], afvoer: [[0.3, 70, C.groen, 'fotosynthese', aF], [0.72, 60, C.teal, 'in de oceaan', aO]] });
    naamBij(ctx, 'evenwicht', 'zonder de mens', 960, 640, q.on('Zonder'), 'center');
    const aV = q.on('verschil', 1, 0.8); if (aV > 0) { ctx.save(); ctx.globalAlpha *= aV * (0.5 + 0.5 * Math.sin(t * 3)); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(580, 580); ctx.lineTo(1340, 580); ctx.stroke(); ctx.restore(); } },
  s25(ctx, t, q) { e6Bg(ctx); const aK = q.on('kraan', 1, 1.4);
    e6BadA(ctx, 560, 760, 800, 360, { peil: 0.5, t, kranen: [[0.22, 70, E6K.co2, null], [0.62, 60, C.teal, null], [0.92, 14, C.koraal, 'fossiele brandstoffen', aK]], afvoer: [[0.3, 70, C.groen, null], [0.72, 60, C.teal, null]] });
    naamBij(ctx, '± 10 gigaton per jaar extra', 'wat miljoenen jaren lag', 1560, 640, q.on('tien'), 'left', C.koraal);
    const aA = q.on('afvoeren', 1, 0.8); if (aA > 0) { ctx.save(); ctx.globalAlpha *= aA; metaText(ctx, 'afvoeren groeien niet even hard mee', 960, 870, C.text2, 'center', 24); ctx.restore(); } },
  // vraag-alinea: de badkuip met de extra kraan; het peil is de vraag
  s26(ctx, t, q) { e6Bg(ctx); e6BadA(ctx, 560, 760, 800, 360, { peil: 0.5, t, kranen: [[0.22, 70, E6K.co2, null], [0.62, 60, C.teal, null], [0.92, 14, C.koraal, null]], afvoer: [[0.3, 70, C.groen, null], [0.72, 60, C.teal, null]] });
    vraagteken(ctx, 1480, 580, q.on('niveau'), 110); },
  s28(ctx, t, q) { e6Bg(ctx); const uA = q.on('oceaan', 1, 1.2), uS = e6Tus(t, q.at('stijgt') - 0.8, q.at('stijgt') + 4);
    e6BadA(ctx, 560, 760, 800, 360, { peil: 0.5, t, stijg: 50 * uS, sa: Math.min(1, uS * 3), kranen: [[0.22, 70, E6K.co2, null], [0.62, 60, C.teal, null], [0.92, 14, C.koraal, null]], afvoer: [[0.3, lerp(70, 76, uA), C.groen, null], [0.72, lerp(60, 66, uA), C.teal, null]] });
    naamBij(ctx, 'de helft blijft in de lucht', 'het niveau stijgt elk jaar', 960, 260, q.on('helft', 2), 'center', C.goud);
    if (q.on('broeikasgas') > 0.3) metaText(ctx, 'BROEIKASEFFECT: ZIE ÉÉN AARDE', 80, 880, C.text2, 'left', 26); },
  s29(ctx, t, q) { e6Bg(ctx); const uS = e6Tus(t, q.at('zes') - 0.5, q.at('zes') + 3);
    e6BadA(ctx, 160, 760, 640, 300, { peil: 0.55, t, stijg: 30 * uS, sa: Math.min(1, uS * 3), kranen: [[0.25, 60, E6K.co2, null], [0.9, 14, C.koraal, null]], afvoer: [[0.4, 60, C.groen, null]] }); naamBij(ctx, '± 900 gigaton', 'in de lucht', 480, 680, q.on('negenhonderd'), 'center');
    regel(ctx, '6 ÷ 900 × 100 % ≈ 0,7 % per jaar', 1340, 380, q.on('zes', 2), C.goud, 48, 'center', 700); naamBij(ctx, 'netto erbij: ± 6 gigaton per jaar', null, 1340, 280, q.on('zes'), 'center');
    const a58 = q.on('1958', 1, 0.6), uN = e6Tus(t, q.at('1958'), q.at('derde') + 0.6);
    if (a58 > 0) { ctx.save(); ctx.globalAlpha *= a58; roundRect(ctx, 1000, 560, 500, 50, 10); shape(ctx, rgba(E6K.co2, 0.6), C.line, 2); roundRect(ctx, 1000, 640, lerp(500, 680, uN), 50, 10); shape(ctx, rgba(E6K.co2, 0.9), C.line, 2);
      metaText(ctx, '1958', 980, 595, C.text2, 'right', 26); metaText(ctx, 'NU', 980, 675, C.text2, 'right', 26); ctx.restore(); }
    naamBij(ctx, 'ruim een derde meer', null, 1340, 760, q.on('derde'), 'center', C.goud); },
  // ================= VWO DE LIJN DIE ADEMT =================
  s30(ctx, t, q) { e6Bg(ctx); const uL = e6Tus(t, q.at('gemeten') - 0.3, q.at('vierhonderddertig') + 0.6), jt = lerp(1958, 2024, uL);
    const P = e6KeelingA(ctx, 300, 780, 1360, 520, 1958, 2026, jt, { assen: e6S(t / 0.8) });
    naamBij(ctx, '± 315', 'in het jaar 1958', P.X(1960), P.Y(350), q.on('driehonderdvijftien'), 'left'); if (uL > 0.98) metaText(ctx, '420 in 2023', P.X(2024) + 16, P.Y(421) + 44, C.text2, 'left', 20);
    const aN = q.on('vierhonderddertig', 1, 0.5); if (aN > 0) { circ(ctx, P.X(2025.37), P.Y(430), 9, rgba(C.goud, aN)); e6Puls(ctx, P.X(2025.37), P.Y(430), 12, t, aN); }
    naamBij(ctx, '± 430', 'mei 2025', P.X(2025.37) + 22, P.Y(430) + 12, aN, 'left', C.goud);
    const aV = q.on('Mauna', 1, 0.8); if (aV > 0) { ctx.save(); ctx.globalAlpha *= aV; vul(ctx, [[1690, 600], [1745, 535], [1770, 530], [1795, 535], [1850, 600]], '#4A4248', '#6A6268', 2); metaText(ctx, 'Mauna Loa', 1770, 636, C.grain, 'center', 22); metaText(ctx, 'Hawaï', 1770, 664, C.grain, 'center', 22); ctx.restore(); } },
  s31(ctx, t, q) { e6Bg(ctx); const jt = lerp(2021, 2024, e6S(t / 3.5)); const P = e6KeelingA(ctx, 300, 780, 1360, 520, 2021, 2024, jt, { pmin: 410, pmax: 430, stap: 1 / 48, trend: q.on('elk', 2, 1.6) });
    const aM = q.on('mei', 1, 0.6), aO = q.on('oktober', 1, 0.6);
    for (const j of [2021, 2022, 2023]) { const jm = j + 0.37, jo = j + 0.77; naamBij(ctx, 'mei', null, P.X(jm), P.Y(e6KeelingWaarde(jm)) - 30, aM, 'center', C.text); naamBij(ctx, 'okt', null, P.X(jo), P.Y(e6KeelingWaarde(jo)) + 60, aO, 'center', C.text); }
    naamBij(ctx, '± 6 ppm', 'op en neer', 1780, 340, q.on('zes'), 'right', '#D2D8E2'); naamBij(ctx, 'trend', null, P.X(2024) + 18, P.Y(e6KTrend(2024)) + 12, q.on('elk', 2), 'left', C.goud); },
  // vraag-alinea: de zaagtand, met mei → oktober oplichtend
  s32(ctx, t, q) { e6Bg(ctx); const P = e6KeelingA(ctx, 300, 780, 1360, 520, 2021, 2024, 2024, { pmin: 410, pmax: 430, stap: 1 / 48 });
    const aD = q.on('daalt', 1, 0.8); if (aD > 0) { ctx.save(); ctx.globalAlpha *= aD * (0.6 + 0.4 * Math.sin(t * 3)); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; for (const j of [2021, 2022, 2023]) { ctx.beginPath(); for (let k = j + 0.37; k <= j + 0.77; k += 0.01) { const x = P.X(k), y = P.Y(e6KeelingWaarde(k)); k === j + 0.37 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore(); }
    vraagteken(ctx, 1700, 300, q.on('oktober'), 110); },
  s34(ctx, t, q) { e6Bg(ctx); const sez = Math.cos(t * 0.9), zomer = (1 - sez) / 2; // seizoen loopt mee met de lijn
    const aG = e6S(t / 0.8); e11Aarde(ctx, 560, 500, 300 * (1 + 0.01 * q.on('ademen') * Math.sin(t * 2)), aG, t * 0.05);
    const aS = q.on('lente', 1, 1); if (aS > 0) { ctx.save(); ctx.beginPath(); ctx.arc(560, 500, 300, Math.PI, 0); ctx.closePath(); ctx.clip(); ctx.fillStyle = rgba(C.groen, 0.32 * zomer * aS); ctx.fill(); ctx.fillStyle = rgba('#AEB6C4', 0.28 * (1 - zomer) * aS); ctx.fill(); ctx.restore(); }
    const P = e6KeelingA(ctx, 1040, 760, 760, 380, 2021, 2024, 2024, { pmin: 410, pmax: 430, titel: false, stap: 1 / 48 }); const jm = 2021.37 + e6Fr((t * 0.9) / 6.283) * 2.6; // 1 cyclus per jaar
    const jj = 2021 + ((t * 0.9 / 6.283) % 3); circ(ctx, P.X(jj), P.Y(e6KeelingWaarde(jj)), 9, C.goud);
    naamBij(ctx, 'noordelijk halfrond', 'meeste land en bos', 560, 140, q.on('noordelijk'), 'center'); naamBij(ctx, 'zomer: meer fotosynthese', 'lijn omlaag', 1420, 300, q.on('zomer'), 'center', C.groen);
    const aW = q.on('herfst', 1, 0.8); naamBij(ctx, 'herfst en winter: andersom', 'lijn omhoog', 1420, 220, aW, 'center', '#D2D8E2'); },
  s35(ctx, t, q) { e6Bg(ctx); const pts = [[960, 240, 'warmer', q.on('Warmer', 1, 0.6)], [1360, 640, 'oceaan neemt minder op', q.on('oceaan', 1, 0.6)], [560, 640, 'meer CO₂ in de lucht', q.on('lucht', 1, 0.6)]];
    const aR = [q.on('oceaan', 1, 1), q.on('lucht', 1, 1), q.on('nog', 1, 1)];
    for (let i = 0; i < 3; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 3]; const k = i === 1 ? 0.34 : 0.22; const sx = lerp(x1, x2, k), sy = lerp(y1, y2, k), ex = lerp(x1, x2, 1 - k), ey = lerp(y1, y2, 1 - k); const u = aR[i]; if (u > 0.01) pijl(ctx, sx, sy, lerp(sx, ex, u), lerp(sy, ey, u), C.koraal, 1, 6, 22); }
    const aL = q.on('nog', 1, 1); if (aL > 0.5) { const f = e6Fr(t * 0.25) * 3, i = Math.floor(f), u = f - i, [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 3]; circ(ctx, lerp(x1, x2, u), lerp(y1, y2, u), 12, C.koraal); }
    pts.forEach(([x, y, n, a]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 250, y - 50, 500, 100, 18); shape(ctx, '#2A3A58', C.line, 2); text(ctx, n, x, y + 12, fTekst(36, 700), C.text, 'center'); ctx.restore(); });
    haak(ctx, 560, 1360, 760, 'positieve terugkoppeling', C.koraal, q.on('terugkoppeling')); },

  // ================= H4 OPSLAG OF KRINGLOOP? =================
  s36(ctx, t, q) { e6Straat(ctx, { grond: 880 }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 880); vul(ctx, [[-40, 760], [800, 730], [1980, 760], [1980, 880], [-40, 880]], C.bgMacroFront);
    // eerst dichtbij (Noor plant het boompje); bij 'Elk jaar' zoomt het beeld uit, zodat de eik tientallen jaren later echt boomhoog is (± 12 m tegen Noor 1,6 m)
    const tE = q.at('Elk'), uZ = e6Tus(t, tE - 0.3, tE + 1.6), z = lerp(1, 0.3, uZ);
    ctx.save(); ctx.translate(lerp(520, 330, uZ), 880); ctx.scale(z, z); ctx.translate(-520, -880);
    persoon(ctx, 'noor', 520, 880, 330, { uit: 'blij', pose: t > 1.2 ? 'wijs' : 'staan', a: e6S(t / 0.3), t }); e6Eik(ctx, 700, 880, 1.6, { groei: 0.25 }); ctx.restore();
    const uG = e6Tus(t, tE + 0.6, q.at('hoger') + 1.4), aG = q.on('Elk', 1, 0.8);
    if (aG > 0) { ctx.save(); ctx.globalAlpha *= aG; e6Eik(ctx, 1300, 880, 4.6, { groei: lerp(0.3, 1, uG) }); ctx.restore(); e6PijlA(ctx, 560, 820, 820, 820, aG, C.line, 4); naamBij(ctx, 'tientallen jaren later', '± 12 meter hoog', 690, 770, aG, 'center', C.text2); }
    const aC = q.on('koolstof', 1, 0.8); for (let k = 0; k < 3; k++) { const f = e6Fr(t * 0.25 + k / 3); e6Co2(ctx, lerp(1420 - k * 90, 1300, f), lerp(70, 330, f), 1.2, { a: aC * Math.sin(Math.PI * f) }); }
    naamBij(ctx, 'droog hout: ± de helft is koolstof', null, 420, 200, q.on('helft'), 'center', C.groen); },
  // vraag-alinea: een bos; koolstof gaat erin en eruit
  s37(ctx, t, q) { e6Bg(ctx); ctx.fillStyle = '#3A5540'; ctx.fillRect(360, 700, 1200, 50); for (let i = 0; i < 4; i++) e6Eik(ctx, 520 + i * 300, 700, 1.9, {});
    for (let k = 0; k < 4; k++) { const f = e6Fr(t * 0.22 + k / 4), dn = k % 2 === 0; e6Co2(ctx, 560 + k * 270, dn ? lerp(120, 330, f) : lerp(330, 120, f), 1.1, { a: Math.sin(Math.PI * f) }); }
    vraagteken(ctx, 1700, 320, q.on('opslag'), 120); naamBij(ctx, 'bos', null, 960, 820, e6S(t / 0.6), 'center'); },
  s39(ctx, t, q) { e6Bg(ctx); const aS = q.on('stroomt', 1, 1), uJ = e6Tus(t, q.at('jong') - 0.3, q.at('jong') + 3), uO = e6Tus(t, q.at('oud') - 0.3, q.at('oud') + 3);
    ctx.save(); ctx.translate(0, -60);
    [[480, 'jong bos', 0.3, 40 * uJ, uJ], [1440, 'oud bos', 0.75, 12 * uO, uO]].forEach(([x, n, p, st, u], i) => { ctx.fillStyle = '#3A5540'; ctx.fillRect(x - 300, 470, 600, 40); for (let k = 0; k < 3; k++) e6Eik(ctx, x - 160 + k * 160, 470, i === 0 ? 1.4 : 1.6, { groei: i === 0 ? lerp(0.3, 0.45, uJ) : 1 });
      e6BadA(ctx, x - 260, 860, 520, 220, { peil: p, t, stijg: st, sa: Math.min(1, u * 3), kranen: [[0.3, 46, C.groen, null, Math.max(0.3, aS)]], afvoer: [[0.7, i === 0 ? 30 : 40, E6K.co2, null, Math.max(0.3, aS)]] }); });
    ctx.restore();
    naamBij(ctx, 'jong bos', 'legt netto veel vast', 480, 150, Math.max(e6S(t / 0.8) * 0.6, q.on('jong')), 'center'); naamBij(ctx, 'oud bos', 'legt vaak nog wat vast', 1440, 70, Math.max(e6S(t / 0.8) * 0.6, q.on('oud')), 'center');
    metaText(ctx, 'BADKUIP = VOORRAAD IN HOUT EN BODEM', 960, 860, rgba(C.grain, q.on('voorraad')), 'center', 26); },
  s40(ctx, t, q) { e6Bg(ctx); const aV = q.on('Brandt', 1, 0.6), aR = q.on('Verteert', 1, 0.8);
    e6Eik(ctx, 520, 760, 1.6, {}); ctx.fillStyle = '#3A3026'; ctx.fillRect(300, 760, 440, 60); e6Vlam(ctx, 520, 760, 200, 70, t, aV);
    if (aV > 0) for (let k = 0; k < 6; k++) { const f = e6Fr(t * 0.6 + k / 6); e6Co2(ctx, 470 + (k % 3) * 50 + Math.sin(t + k) * 10, lerp(560, 140, f), 1.2, { a: aV * Math.sin(Math.PI * f) }); }
    const kr = e6Tus(t, q.at('Verteert'), q.at('Verteert') + 6); ctx.fillStyle = '#5A4A38'; roundRect(ctx, 1160, 700 + 20 * kr, 520 * lerp(1, 0.8, kr), 70 - 20 * kr, 30); ctx.fill(); for (let i = 0; i < 9; i++) circ(ctx, 1200 + i * 55 * lerp(1, 0.8, kr), 700 + 20 * kr + (i % 2) * 10, 10, rgba('#C9B896', Math.max(0.3, aR)));
    if (aR > 0) { const f = e6Fr(t * 0.15); e6Co2(ctx, 1420, lerp(680, 420, f), 1.1, { a: aR * Math.sin(Math.PI * f) }); }
    naamBij(ctx, 'verbranden', 'binnen uren terug', 520, 860, q.on('uur'), 'center', C.koraal); naamBij(ctx, 'verteren', 'jaren tot tientallen jaren', 1420, 860, q.on('tientallen'), 'center', '#C9B896'); },

  // ================= SAMENVATTING =================
  s41(ctx, t, q) { e6Bg(ctx); const R = [['varen', 220], ['veen', 470], ['steenkool', 720], ['schoorsteen', 970], ['lucht', 1220], ['eikenblad', 1470]];
    R.forEach(([n, x], i) => { const a = e6S((t - i * 0.25) / 0.6); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 100, 420, 200, 110, 18); shape(ctx, i < 3 ? '#2A3A58' : '#2E4A3A', C.line, 2); text(ctx, n, x, 488, fTekst(34, 700), C.text, 'center'); if (i < R.length - 1) pijl(ctx, x + 104, 475, x + 146, 475, C.goud, 1, 5, 16); ctx.restore(); });
    // de reis van het atoom loopt vooruit: varen → … → eikenblad
    const uR = e6Tus(t, q.at('Zo') - 0.2, q.at('blad') + 0.4), f = uR * 5, i = Math.min(4, Math.floor(f)), xa = lerp(R[i][1], R[Math.min(5, i + 1)][1], e6S(f - i));
    e6Atoom(ctx, uR > 0 ? xa : 220, 380 - Math.abs(Math.sin((f - i) * Math.PI)) * 30 * (uR > 0 && uR < 1 ? 1 : 0), 16);
    metaText(ctx, 'MILJOENEN JAREN', 470, 600, rgba(C.grain, q.on('trage')), 'center', 26); metaText(ctx, 'JAREN', 1220, 600, rgba(C.grain, q.on('snelle')), 'center', 26);
    haak(ctx, 120, 820, 640, 'trage kringloop', C.text2, q.on('trage')); haak(ctx, 870, 1570, 640, 'snelle kringloop', C.groen, q.on('snelle')); },
});
// pijl die groeit (u 0..1)
function e6PijlA(ctx, x1, y1, x2, y2, u, kl = E6K.co2, lw = 5) { if (u <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), kl, Math.min(1, u * 2), lw, 18); }
