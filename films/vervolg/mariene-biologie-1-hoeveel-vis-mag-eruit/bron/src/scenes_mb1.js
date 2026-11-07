// Wat word jij? · Mariene biologie 1 · Hoeveel vis mag eruit? — scènes per alinea (v1.0, 7 nov 2026).
// Look: Schema met cast. Sam (stagiair): outfit 'buiten' aan dek, 'practicum' in het lab. De mariene bioloog ('marien', geen naam,
// nergens in beeld): 'boord' aan dek, 'lab' in het lab. Figurant Joost als visser, naamloos, zegt niets.
// Decors (Kamiel 7 nov 2026): 'schip' onder de scènes aan dek, 'lab' onder de otolietscène; modelzee, grafieken en kaarten op navy.

function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: o.outfit || 'buiten', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function bio(ctx, x, t, o = {}) { return persoon(ctx, 'marien', x, o.y || GROND, o.h || 440, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: o.outfit || 'boord', a: o.a == null ? 1 : o.a, hold: o.hold }); }
// camera: schaal z rond (fx, fy)
function camera(ctx, z, fx, fy, fn) { ctx.save(); ctx.translate(fx, fy); ctx.scale(z, z); ctx.translate(-fx, -fy); fn(); ctx.restore(); }
// vaste schollenvelden (populatie op de zeebodem)
const VELD = (() => { const P = []; for (let i = 0; i < 70; i++) { const x = 140 + hash(i * 3.7) * 1640, y = 220 + hash(i * 5.3) * 560; if (Math.hypot(x - 960, y - 480) < 120) continue; P.push([x, y, 70 + hash(i * 1.9) * 40, hash(i * 7.7) > 0.5 ? 1 : -1, (hash(i * 2.3) - 0.5) * 0.5]); } return P; })();
const DRIE = [{ x: 110, n: 200, kop: 'bijna leeg', nw: 80 }, { x: 690, n: 500, kop: 'half vol', nw: 125 }, { x: 1270, n: 1000, kop: 'vol', nw: 0 }];
function drieZeeen(ctx, t, A, o = {}) { DRIE.forEach((d, i) => { const a = A[i]; if (a <= 0.01) return; modelZee(ctx, d.x, 300, 540, 400, { a, n: d.n, t, kop: d.kop, ton: d.n + ' TON', nieuw: d.nw, nieuwU: (o.nieuw || [0, 0, 0])[i], ic: 0.95, rh: 44 }); }); }

Object.assign(SCENES, {
  title(ctx, t) { schol(ctx, 1300, 780, 400, { t, goud: true, oor: true }); const p = scholOor(1300, 780, 400, 1);
    zoomCircle(ctx, 1650, 560, 140, p.x, p.y, '', 1, () => { ctx.fillStyle = '#121A26'; ctx.fillRect(1500, 410, 300, 300); otoliet(ctx, 1650, 560, 115, { n: 4, goud: 1 }); }); },

  // ---------- Cold open: één schol op de sorteerband, camera zoomt uit ----------
  s01(ctx, t, q) { const z = lerp(2.7, 1, ease((t - 0.6) / 5.6)), V = q.on('Hoe', 1, 0.5);
    camera(ctx, z, 960, 650, () => { decor(ctx, 'schip', 0.6);
      kotter(ctx, 900, 372, 0.22, q.on('Elk', 1, 0.6), { t, kijk: -1 }); golfjes(ctx, 820, 384, 180, q.on('Elk', 1, 0.6) * 0.6, t);
      sorteerband(ctx, 470, 590, 980, 1, t);
      [[600, 650, 1, 0.12, 150], [760, 664, -1, -0.2, 140], [1150, 652, 1, 0.25, 145], [1320, 662, -1, -0.1, 135]].forEach(([x, y, k, r, l], i) => schol(ctx, x, y, l, { t: t + i, kijk: k, rot: r, var: i % 2, stil: true }));
      schol(ctx, 960, 650, 165, { t, kijk: 1, goud: q.on('schol', 1, 0.5) }); });
    bio(ctx, 1680, t, { a: q.on('mariene', 1, 0.3) * (1 - V * 0.0), kijk: -1, uit: 'neutraal', pose: q.on('vang', 1) > 0.5 ? 'wijs' : 'staan' });
    laag(ctx, V, () => { kaart(ctx, 140, 150, 1080, 230, 1, C.goud); text(ctx, 'Minder vangen = meer vis?', 190, 270, fTekst(64, 800), C.text, 'left'); metaText(ctx, 'ELK JAAR GAAT ER SCHOL UIT DE ZEE', 190, 340, C.goud, 'left', 28); vraagteken(ctx, 1130, 340, 1, 120); }); },

  // ---------- H1: meten aan boord ----------
  s03(ctx, t, q) { decor(ctx, 'schip', 0.6); const PX = 18, X0 = 440, W0 = 40 * PX, L = 30 * PX;
    const B = q.on('Ernaast', 1, 0.4), V = q.on('Zijn', 1, 0.4);
    sam(ctx, 1560, t, { kijk: -1, uit: V > 0.5 ? 'verbaasd' : 'blij', pose: q.on('legt', 1) > 0.5 && q.on('Zo', 1) < 0.5 ? 'wijs' : 'staan' });
    const plank = (y, a, cue, n, variant) => laag(ctx, a, () => { meetplank(ctx, X0, y, PX, 40, 1, { rechts: true, hh: 150, mark: 30, markA: q.on(cue, n, 0.3) });
      const glij = variant ? 0 : 1 - ease((t - q.at('legt', 1)) / 1.4); schol(ctx, X0 + W0 - L / 2 - glij * 600, y - 14, L, { t, kijk: 1, stil: true, var: variant, goud: variant ? 0 : 1 });
      laag(ctx, q.on(cue, n, 0.3), () => tag(ctx, '30 CM', X0 + W0 - L, y - 170, C.goud, 1, 'center', 32)); });
    plank(330, 1, 'Dertig', 1, 0); plank(690, B, 'dertig', 2, 1);
    laag(ctx, q.on('zomer', 1, 0.4) * (1 - B), () => { kaart(ctx, X0, 556, 640, 64, 1, C.line); metaText(ctx, 'ONDERZOEKSSCHIP · ELKE ZOMER', X0 + 24, 598, C.grain, 'left', 28); });
    laag(ctx, V, () => { vraagteken(ctx, 300, 380, 1, 110); vraagteken(ctx, 300, 740, 1, 110); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const P2 = ramp(t, q.at('Voor', 1) - 0.3, 0.5), P3 = ramp(t, q.at('groeien', 1) - 0.3, 0.5);
    laag(ctx, 1 - P2, () => { antwoord(ctx, 'antwoord b: nee, de een kan jaren ouder zijn', 1);
      const x = 300, y = 260, w = 900, h = 480, X = (j) => x + j / 7 * w, Y = (cm) => y + h - cm / 40 * h; assenM(ctx, x, y, w, h, 'LEEFTIJD (JAAR) →', 'LENGTE (CM)');
      for (let j = 1; j <= 7; j++) metaText(ctx, String(j), X(j), y + h + 38, C.text2, 'center', 28); stippel(ctx, x, Y(30), x + w, Y(30), rgba(C.goud, 0.7), 1, 2); metaText(ctx, '30 CM', x - 14, Y(30) + 8, C.goud, 'right', 28);
      const kromme = (k, kl, a) => laag(ctx, a, () => { const pts = []; for (let i = 0; i <= 50; i++) { const j = i / 50 * 7; pts.push([X(j), Y(42 * (1 - Math.exp(-k * j)))]); } lijn(ctx, pts, kl, 5); });
      const kS = -Math.log(1 - 30 / 42) / 4, kT = -Math.log(1 - 30 / 42) / 6;
      kromme(kS, C.oker, q.on('voedsel', 1, 0.6)); kromme(kT, C.teal, q.on('temperatuur', 1, 0.6));
      laag(ctx, q.on('voedsel', 1, 0.6), () => { circ(ctx, X(4), Y(30), 10, C.oker); metaText(ctx, 'SNEL GEGROEID · 4 JAAR', X(4) - 10, Y(30) - 26, C.oker, 'right', 28); });
      laag(ctx, q.on('temperatuur', 1, 0.6), () => { circ(ctx, X(6), Y(30), 10, C.teal); metaText(ctx, 'LANGZAAM · 6 JAAR', X(6) + 16, Y(30) + 58, C.teal, 'left', 28); });
      laag(ctx, q.on('groeit', 1, 0.5), () => { schol(ctx, 1640, 400, 300, { t, stil: true }); schol(ctx, 1640, 640, 300, { t, stil: true, var: 1 }); metaText(ctx, '30 CM · 30 CM', 1640, 820, C.text2, 'center', 28); });
      modelLabel(ctx, 300, 230, 0); metaText(ctx, 'VOORBEELD', x + w, y - 16, C.text2, 'right', 28); });
    laag(ctx, P2 * (1 - P3), () => { const sx = 640, sy = 560, L = 760; schol(ctx, sx, sy, L, { t, oor: true, goud: 0 }); const p = scholOor(sx, sy, L, 1);
      laag(ctx, q.on('kop', 1, 0.4), () => metaText(ctx, 'KOP', p.x + 40, sy - 230, C.grain, 'left', 28));
      zoomCircle(ctx, 1460, 400, 240, p.x, p.y, 'binnenoor · een paar millimeter', q.on('gehoorsteentjes', 1, 0.5), () => { ctx.fillStyle = '#16202E'; ctx.fillRect(1200, 150, 520, 500); binnenoor(ctx, 1460, 400, 1.15, 1, { goud: q.on('otolieten', 1) > 0.5 }); });
      laag(ctx, q.on('otolieten', 1, 0.4), () => naamBij(ctx, 'otoliet', 'KALK', 1460, 120, 1, 'center'));
      laag(ctx, q.on('horen', 1, 0.4), () => metaText(ctx, 'HOREN · EVENWICHT', 1460, 740, C.text, 'center', 28)); });
    laag(ctx, P3, () => { const t0 = q.at('groeien', 1), tw = q.at('warme', 1), tz = q.at('winter', 1);
      const jr = t < tw ? lerp(0.6, 2, (t - t0 + 0.3) / (tw - t0)) : t < tz ? lerp(2, 2.9, (t - tw) / (tz - tw)) : lerp(2.9, 3, (t - tz) / 0.5);
      otoliet(ctx, 820, 470, 380, { n: 4, toon: jr / 4, hl: t > tz ? 2 : -1 }); metaText(ctx, 'OTOLIET · VERGROOT', 820, 760, C.text2, 'center', 28);
      metaText(ctx, 'LAAGJE VOOR LAAGJE', 820, 200, C.grain, 'center', 28);
      laag(ctx, q.on('warme', 1, 0.4), () => { tag(ctx, 'brede laag: groeitijd', 1560, 380, C.oker, 1, 'center', 34); metaText(ctx, 'WARM · VEEL VOEDSEL', 1560, 430, C.oker, 'center', 28); });
      laag(ctx, q.on('winter', 1, 0.4), () => { tag(ctx, 'smalle ring: winter', 1560, 560, C.goud, 1, 'center', 34); metaText(ctx, 'DOORZICHTIG', 1560, 610, C.goud, 'center', 28); }); }); },

  s06(ctx, t, q) { const B = ramp(t, q.at('Dit', 1) - 0.3, 0.5), Cc = ramp(t, q.at('instituut', 1) - 0.5, 0.5);
    decor(ctx, 'lab', 0.6 * (1 - Cc)); if (Cc > 0.99) bg(ctx, 'schema');
    laag(ctx, 1 - B, () => { roundRect(ctx, 260, 640, 760, 26, 6); shape(ctx, '#5A6478', '#8A96A6', 2); ctx.fillStyle = '#4A5468'; ctx.fillRect(300, 666, 20, GROND - 666); ctx.fillRect(960, 666, 20, GROND - 666);
      binoculair(ctx, 560, 640, 1.1); bio(ctx, 860, t, { outfit: 'lab', kijk: -1, pose: 'vasthouden', uit: 'neutraal' }); sam(ctx, 1200, t, { outfit: 'practicum', kijk: -1, uit: 'blij' });
      laag(ctx, q.on('steentje', 1, 0.4), () => naamBij(ctx, 'binoculair', 'MICROSCOOP', 560, 340, 1, 'center')); });
    laag(ctx, B * (1 - Cc), () => { const cx = 640, cy = 470, R = 330, r = 290; bio(ctx, 1800, t, { outfit: 'lab', kijk: -1, uit: 'blij', h: 400 });
      circ(ctx, cx, cy, R, '#121A26'); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.clip();
      const tL = q.at('Elke', 1), tV = q.at('Vier', 1) + 0.4, lees = clamp((t - tL) / (tV - tL), 0, 1), xs = [0, 1, 2, 3].map(i => otolietRingX(r, 4, i)), kx = -0.16 * r;
      const geteld = xs.filter(xx => kx + (r * 1.04 - kx) * lees >= xx - 2).length;
      otoliet(ctx, cx, cy, r, { n: 4, goud: geteld / 4, lees: lees > 0 ? lees : (q.on('midden', 1) > 0.5 ? 0.001 : null) }); ctx.restore();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke(); metaText(ctx, 'ONDER DE BINOCULAIR', cx, cy + R + 44, C.grain, 'center', 28);
      laag(ctx, q.on('midden', 1, 0.4) * (1 - q.on('andere', 1, 0.4)), () => { circ(ctx, cx + kx, cy, 12, null, C.goud, 3); metaText(ctx, 'KERN · UIT HET EI', cx, cy - 210, C.goud, 'center', 28); });
      // dagboek: per winterring een regel
      const D = q.on('andere', 1, 0.4); kaart(ctx, 1060, 150, 660, 640, Math.max(q.on('Elke', 1, 0.4), D), C.line);
      laag(ctx, 1 - D, () => { metaA(ctx, 'HAAR DAGBOEK', 1140, 200, q.on('Elke', 1, 0.4), C.text2, 'left', 28);
        ['jaar 1', 'jaar 2', 'jaar 3', 'jaar 4 · net'].forEach((s2, i) => { const a = i < geteld ? 1 : 0; laag(ctx, a, () => { const y = 290 + i * 130; text(ctx, s2, 1140, y + 12, fTekst(40, 800), i === 3 ? C.goud : C.text, 'left');
          schol(ctx, 1560, y, 70 + i * 30, { t, stil: true, kijk: 1 }); }); });
        laag(ctx, q.on('vier', 2, 0.4), () => tag(ctx, '4 jaar', cx, 120, C.goud, 1, 'center', 40)); });
      laag(ctx, D, () => { tag(ctx, '4 jaar', cx, 120, C.goud, 1, 'center', 40); otoliet(ctx, 1450, 440, 210, { n: 6, goud: q.on('zes', 1, 1.0) }); metaText(ctx, 'DE ANDERE SCHOL · OOK 30 CM', 1450, 640, C.text2, 'center', 28);
        laag(ctx, q.on('zes', 1, 0.4), () => tag(ctx, '6 jaar', 1450, 260, C.goud, 1, 'center', 40)); metaText(ctx, 'NOAA · DFO', 1450, 730, C.text2, 'center', 28); }); });
    laag(ctx, Cc, () => { const x = 300, y = 250, w = 1000, h = 460, N = [30, 46, 38, 26, 16, 10, 6, 3], bw = w / 8;
      assenM(ctx, x, y, w, h, 'LEEFTIJD (JAAR) →', 'AANTAL GEMETEN SCHOLLEN'); metaText(ctx, 'VOORBEELD', x + w, y - 16, C.text2, 'right', 28);
      N.forEach((v, i) => { const a = i < 2 ? q.on('jonge', 1, 0.4) : i < 5 ? q.on('hoeveel', 2, 0.4) : q.on('oude', 1, 0.4); const hh = v / 50 * h, oud = i >= 3 && q.on('visserij', 1) > 0.5;
        laag(ctx, a, () => { roundRect(ctx, x + i * bw + 14, y + h - hh, bw - 28, hh, 6); shape(ctx, rgba(C.oker, 0.7), oud ? C.koraal : C.oker, oud ? 3 : 2); }); metaText(ctx, String(i + 1), x + i * bw + bw / 2, y + h + 38, C.text2, 'center', 28); });
      laag(ctx, q.on('duizenden', 1, 0.4), () => { for (let i = 0; i < 18; i++) otoliet(ctx, 1450 + (i % 6) * 66, 260 + Math.floor(i / 6) * 60, 26, { n: 2 + (i * 7) % 5 }); metaText(ctx, 'DUIZENDEN OTOLIETEN', 1615, 470, C.text2, 'center', 28); });
      laag(ctx, q.on('populatie', 1, 0.4), () => { tag(ctx, 'hoe groot is de populatie?', 1615, 600, C.goud, 1, 'center', 32); });
      laag(ctx, q.on('visserij', 1, 0.4), () => { tag(ctx, 'hoeveel neemt de visserij weg?', 1615, 700, C.koraal, 1, 'center', 32); }); }); },

  // ---------- H2: van één schol naar de populatie en het model ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const P2 = ramp(t, q.at('Plek', 1) - 0.4, 0.5), P3 = ramp(t, q.at('mariene', 1) - 0.3, 0.5), P4 = ramp(t, q.at('zet', 1) - 0.3, 0.5);
    laag(ctx, 1 - P2, () => { const z = Math.exp(lerp(Math.log(5), 0, ease((t - 0.3) / 4.2)));
      camera(ctx, z, 960, 480, () => { ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(0, 0, W, 880); ctx.fillStyle = rgba(C.oker, 0.12); ctx.fillRect(0, 760, W, 120);
        VELD.forEach(([x, y, l, k, r], i) => schol(ctx, x, y, l, { t: t + i, kijk: k, rot: r, var: i % 2, a: q.on('alle', 1, 0.8) }));
        schol(ctx, 960, 480, 100, { t, kijk: 1, goud: 1, goudDik: 0.5 }); });
      laag(ctx, q.on('populatie', 1, 0.4), () => { kaart(ctx, 660, 110, 600, 90, 1, C.goud); text(ctx, 'populatie', 960, 172, fTekst(52, 800), C.goud, 'center'); }); });
    laag(ctx, P2 * (1 - P3), () => { metaText(ctx, 'PLEK GENOEG? · DE S-CURVE', 360, 220, C.goud, 'left', 28); sCurve(ctx, 360, 290, 1100, 460, ramp(t, q.at('Plek', 1) + 0.6, 3.2), 1); });
    laag(ctx, P3 * (1 - P4), () => { const n = 500; modelZee(ctx, 260, 260, 900, 480, { n, t, nieuw: 125, nieuwU: q.on('bij', 1, 1.2), per: 12, ic: 1.25, rh: 52 }); modelLabel(ctx, 260, 200, q.on('model', 1, 0.4));
      laag(ctx, q.on('model', 1, 0.4), () => text(ctx, 'modelzee', 710, 230, fTekst(48, 800), C.text, 'center'));
      laag(ctx, q.on('duizend', 1, 0.4), () => { stippel(ctx, 260, 300, 1160, 300, rgba(C.goud, 0.8), 1, 3); metaText(ctx, 'DRAAGKRACHT: HOOGUIT 1000 TON', 1150, 340, C.goud, 'right', 28); });
      laag(ctx, q.on('aanwas', 1, 0.4), () => { kaart(ctx, 1240, 300, 560, 380, 1, C.goud); text(ctx, 'aanwas', 1280, 380, fTekst(54, 800), C.goud, 'left');
        [['+ jonge vis', 'jonge'], ['+ groei van de rest', 'rest'], ['− wat er sterft', 'sterft']].forEach(([s2, c], i) => laag(ctx, q.on(c, 1, 0.4), () => text(ctx, s2, 1280, 470 + i * 70, fTekst(40, 700), i === 2 ? C.koraal : C.text, 'left'))); }); });
    laag(ctx, P4, () => { const tz = q.at('zet', 1); drieZeeen(ctx, t, [ramp(t, tz - 0.3, 0.4), ramp(t, tz + 0.1, 0.4), ramp(t, tz + 0.5, 0.4)]); modelLabel(ctx, 110, 150, 1);
      laag(ctx, q.on('meeste', 1, 0.4), () => vraagteken(ctx, 960, 240, 1, 110)); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const P2 = ramp(t, q.at('achthonderd', 1) - 0.5, 0.6);
    laag(ctx, 1 - P2, () => { antwoord(ctx, 'antwoord c: in de halfvolle zee', 1); modelLabel(ctx, 1640, 150, 1);
      drieZeeen(ctx, t, [1, 1, 1], { nieuw: [q.on('tachtig', 1, 0.8), q.on('honderdvijfentwintig', 1, 0.8), 0] });
      laag(ctx, q.on('ouders', 1, 0.4), () => metaText(ctx, 'TE WEINIG OUDERS', 380, 236, C.koraal, 'center', 28)); laag(ctx, q.on('tachtig', 1, 0.4), () => tag(ctx, '+ 80 ton', 380, 810, C.goud, 1, 'center', 34));
      laag(ctx, q.on('voedsel', 1, 0.4), () => metaText(ctx, 'TE WEINIG VOEDSEL', 1540, 236, C.koraal, 'center', 28)); laag(ctx, q.on('niets', 1, 0.4), () => tag(ctx, '+ 0 ton', 1540, 810, C.text2, 1, 'center', 34));
      laag(ctx, q.on('honderdvijfentwintig', 1, 0.4), () => tag(ctx, '+ 125 ton', 960, 810, C.goud, 1, 'center', 34)); });
    laag(ctx, P2, () => { const g = heuvel(ctx, 220, 240, 960, 480, ramp(t, q.at('Zet', 1), 1.6), 1, { punten: [[200, 1, C.oker, '80'], [500, 1, C.goud, '125'], [1000, 1, C.oker, '0'], [800, q.on('achthonderd', 1, 0.4), C.oker, '80']] });
      modelLabel(ctx, 220, 180, 1);
      laag(ctx, q.on('som', 1, 0.4), () => { kaart(ctx, 1280, 220, 540, 420, 1, C.line); metaText(ctx, 'DE SOM', 1310, 270, C.text2, 'left', 28);
        somRegel(ctx, 'aanwas =', 1310, 340, 1, C.text, 46); somRegel(ctx, '0,5 × N', 1310, 410, q.on('half', 2, 0.4), C.oker, 46); somRegel(ctx, '× (1 − N/1000)', 1310, 480, q.on('vrij', 1, 0.4), C.teal, 46);
        laag(ctx, q.on('vrij', 1, 0.4), () => { metaText(ctx, 'N = POPULATIE IN TON', 1310, 530, C.text2, 'left', 28); metaText(ctx, 'N/1000 = DEEL DAT VOL IS', 1310, 570, C.text2, 'left', 28); });
        laag(ctx, q.on('heuvel', 1, 0.4), () => somRegel(ctx, '500 → 0,5 × 500 × 0,5 = 125', 1310, 620, 1, C.goud, 30)); });
      laag(ctx, q.on('top', 1, 0.4), () => { haak(ctx, g.X(500) - 140, g.X(500) + 140, 760 + 60, 'top bij de helft van de draagkracht', C.goud, 1); }); }); },

  // ---------- H3: duurzame vangst ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const zx = 100, zy = 330, zw = 900, zh = 440, V = q.on('vloot', 1, 0.4);
    const tH = q.at('haalt', 1), tG = q.at('groeit', 1), tJ = q.at('jaar', 2), tD = q.at('Dat', 1);
    // eerste jaar: 125 eruit, 125 erbij; daarna snel nog twee jaren
    const cyc = t < tJ ? 0 : Math.min(2, Math.floor((t - tJ) / 1.8) + 1), tc = t < tJ ? 0 : (t - tJ) % 1.8;
    let wegU, nwU; if (t < tJ) { wegU = ramp(t, tH, 1.0); nwU = ramp(t, tG, 0.8); } else if (t < tJ + 5.4) { wegU = ramp(tc, 0.1, 0.6); nwU = ramp(tc, 0.9, 0.6); } else { wegU = 1; nwU = 1; }
    const grootVang = ramp(t, q.at('driehonderd', 1), 1.2);
    kotter(ctx, zx + 640, zy - 6, 0.55, 1, { t, kijk: -1 }); laag(ctx, q.on('visser', 1, 0.3) * (1 - V), () => persoon(ctx, 'joost', 1790, GROND, 420, { t, kijk: -1, uit: 'neutraal', pose: 'staan' }));
    if (V < 0.5) { modelZee(ctx, zx, zy, zw, zh, { n: 500, weg: 125 * (wegU < 1 || nwU < 1 ? 1 : 0), wegU: nwU >= 1 ? 0 : wegU, wegNaar: [zx + 560, zy + 60], nieuw: 125 * (nwU < 1 && wegU >= 1 ? 1 : 0), nieuwU: nwU, nieuwOp: true, t, per: 12, ic: 1.25, rh: 52 });
      visnet(ctx, zx + 480, zy + 90, 200, 110, 1); }
    else { modelZee(ctx, zx, zy, zw, zh, { n: 500, weg: 300, wegU: grootVang, wegNaar: [zx + 600, zy + 80], nieuw: 125, nieuwU: ramp(t, q.at('driehonderd', 1) + 1.3, 0.6), nieuwOp: true, t, per: 12, ic: 1.25, rh: 52 }); visnet(ctx, zx + 420, zy + 110, 340, 190, 1); laag(ctx, q.on('driehonderd', 1, 0.4), () => tag(ctx, 'vangst: 300 ton', 1300, 420, C.koraal, 1, 'center', 36)); }
    modelLabel(ctx, zx, zy - 150, 1); metaText(ctx, 'HALFVOLLE MODELZEE', zx + 140, zy - 120, C.text2, 'left', 28);
    laag(ctx, 1 - V, () => { popBalk(ctx, 1150, 300, 100, 420, 500 - 125 * (wegU - nwU) * (t < tJ + 5.4 ? 1 : 0), 1, { lijn: 1000 }); metaText(ctx, 'POPULATIE', 1200, 280, C.text2, 'center', 28);
      jaarTeller(ctx, 1320, 300, t < tJ ? 1 : 1 + cyc, q.on('jaar', 1, 0.4));
      laag(ctx, q.on('haalt', 1, 0.4), () => { metaText(ctx, '− 125 TON VANGST', 1320, 400, C.koraal, 'left', 28); }); laag(ctx, q.on('groeit', 1, 0.4), () => metaText(ctx, '+ 125 TON AANWAS', 1320, 450, C.goud, 'left', 28));
      laag(ctx, q.on('duurzame', 1, 0.4), () => { kaart(ctx, 1290, 520, 560, 150, 1, C.goud); text(ctx, 'duurzame vangst', 1320, 590, fTekst(46, 800), C.goud, 'left'); metaText(ctx, 'VANGST = AANWAS', 1320, 640, C.text, 'left', 28); }); });
    laag(ctx, q.on('Hoeveel', 1, 0.4), () => vraagteken(ctx, 1450, 640, 1, 130)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder, er zijn minder ouders', 1); modelLabel(ctx, 1640, 150, 1);
    const zx = 100, zy = 330, zw = 900, zh = 440, tN = q.at('honderdtien', 1);
    modelZee(ctx, zx, zy, zw, zh, { n: 200, nieuw: 125, nieuwU: t < tN ? 1 : 0, t, per: 12, ic: 1.25, rh: 52 });
    if (t >= tN - 0.01) modelZee(ctx, zx, zy, zw, zh, { a: 1, n: 325, nieuw: 110, nieuwU: ramp(t, tN, 0.8), t, per: 12, ic: 1.25, rh: 52 });
    laag(ctx, q.on('driehonderdvijfentwintig', 1, 0.4), () => { somRegel(ctx, '500 + 125 − 300 = 325 ton', zx, zy + zh + 70, 1, C.text, 40); });
    const P = ramp(t, q.at('driehonderdvijfentwintig', 1), 1.0), g = heuvel(ctx, 1130, 300, 680, 400, 1, 1, { punten: [[500, 1 - P * 0.6, C.goud, '125'], [325, P, C.koraal, q.on('honderdtien', 1) > 0.5 ? '110' : '']] });
    laag(ctx, q.on('bron', 1, 0.4), () => haak(ctx, 1130, 1500, 700 + 90, 'de bron krimpt', C.koraal, 1)); },

  s13(ctx, t, q) { decor(ctx, 'schip', 0.6); const V = q.on('Wie', 1, 0.4), Ch = q.on('heuvel', 1, 0.4);
    sam(ctx, 420, t, { kijk: 1, uit: q.on('Mooi', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'blij' : q.on('minder', 1) > 0.5 && q.on('beetje', 1) < 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('top', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'wijs' : q.on('minder', 1) > 0.5 && q.on('beetje', 1) < 0.5 ? 'denk' : 'staan' });
    bio(ctx, 1520, t, { kijk: -1, uit: q.on('Nee', 1) > 0.5 && q.on('beetje', 1) < 0.5 ? 'neutraal' : 'blij', pose: q.on('model', 1) > 0.5 && q.on('Dan', 2) < 0.5 ? 'wijs' : 'staan' });
    laag(ctx, Ch, () => { kaart(ctx, 560, 96, 900, 500, 1, C.line); const zee = q.on('verandert', 1, 0.6), marge = q.on('veiligheidsmarge', 1, 0.5), band = q.on('schattingen', 1, 0.6);
      const Kt = 1000 * (1 + 0.12 * zee * Math.sin(t * 1.8)), X = (n) => 610 + n / 1150 * 400, Y = (v) => 520 - v / 150 * 340, A = (n, K) => 0.5 * n * Math.max(0, 1 - n / K);
      lijn(ctx, [[610, 150], [610, 520], [1020, 520]], C.line, 2); metaText(ctx, 'AANWAS', 624, 150, C.text2, 'left', 28); metaText(ctx, 'POPULATIE →', 1010, 566, C.text2, 'right', 28); modelLabel(ctx, 1290, 150, q.on('model', 1, 0.4));
      if (band > 0.01) laag(ctx, band, () => { ctx.fillStyle = rgba(C.text2, 0.22); ctx.beginPath(); for (let i = 0; i <= 50; i++) { const n = i * 20; ctx.lineTo(X(n), Y(AANWAS(n) * 1.22 + 5)); } for (let i = 50; i >= 0; i--) { const n = i * 20; ctx.lineTo(X(n), Y(Math.max(0, AANWAS(n) * 0.78 - 5))); } ctx.closePath(); ctx.fill(); });
      const pts = []; for (let i = 0; i <= 60; i++) { const n = i / 60 * Kt; pts.push([X(n), Y(A(n, Kt))]); } lijn(ctx, pts, C.oker, 5);
      laag(ctx, zee, () => { const xk = X(Kt), p = []; for (let i = 0; i <= 8; i++) p.push([xk - 16 + i * 4, 520 + Math.sin(i * 1.4 + t * 3) * 6]); lijn(ctx, p, C.teal, 4); circ(ctx, xk, 520, 7, C.teal); });
      laag(ctx, q.on('ernaast', 1, 0.5), () => { ctx.save(); ctx.setLineDash([10, 8]); const p2 = []; for (let i = 0; i <= 50; i++) { const n = i * 20; p2.push([X(n), Y(AANWAS(n) * 0.82)]); } lijn(ctx, p2, C.oker, 3); ctx.restore(); });
      const tq = q.on('top', 1, 0.4) * (1 - marge); laag(ctx, tq, () => { stippel(ctx, 610, Y(125), 1010, Y(125), C.goud, 1, 3); metaText(ctx, 'OP DE TOP?', 1010, Y(125) - 14, C.goud, 'right', 28); });
      laag(ctx, marge, () => { ctx.fillStyle = rgba(C.goud, 0.18); ctx.fillRect(610, Y(125), 400, Y(100) - Y(125)); lijn(ctx, [[610, Y(100)], [1010, Y(100)]], C.goud, 4); });
      const leg = (y, a, teken, s2, kl) => laag(ctx, a, () => { teken(1062, y); metaText(ctx, s2, 1094, y + 10, kl, 'left', 28); });
      leg(250, zee, (x, y) => { const p = []; for (let i = 0; i <= 8; i++) p.push([x - 16 + i * 4, y + Math.sin(i * 1.4 + t * 3) * 6]); lijn(ctx, p, C.teal, 4); circ(ctx, x, y, 6, C.teal); }, 'DRAAGKRACHT?', C.teal);
      leg(320, band, (x, y) => { ctx.fillStyle = rgba(C.text2, 0.35); ctx.fillRect(x - 18, y - 10, 36, 20); }, 'ONZEKER', C.text2);
      leg(390, marge, (x, y) => { ctx.fillStyle = rgba(C.goud, 0.3); ctx.fillRect(x - 18, y - 12, 36, 12); lijn(ctx, [[x - 18, y], [x + 18, y]], C.goud, 4); }, 'QUOTUM + MARGE', C.goud);
      leg(460, q.on('ernaast', 1, 0.5), (x, y) => { ctx.save(); ctx.setLineDash([8, 6]); lijn(ctx, [[x - 18, y], [x + 18, y]], C.oker, 3); ctx.restore(); }, 'TEGENVALLER', C.oker); });
    laag(ctx, q.on('quotum', 2, 0.4), () => { kaart(ctx, 660, 630, 640, 110, 1, C.goud); text(ctx, 'quotum', 690, 688, fTekst(42, 800), C.goud, 'left'); metaText(ctx, 'HOEVEEL VIS PER JAAR MAG', 690, 724, C.text, 'left', 28); });
    laag(ctx, V, () => vraagteken(ctx, 1360, 700, 1, 100)); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de visserijministers van de EU-landen', 1);
    const S = [['metingen\nvan het schip', 'metingen', 1, C.teal], ['onderzoekers\nuit veel landen', 'onderzoekers', 1, C.teal], ['advies', 'advies', 1, C.goud], ['Europese\nCommissie', 'Commissie', 1, C.line], ['december:\nvisserijministers EU', 'december', 1, C.groen]];
    const w = 310, gap = 52, x0 = (W - (5 * w + 4 * gap)) / 2, y = 250;
    S.forEach(([s2, c, n, kl], i) => { const a = q.on(c, n, 0.4); routeStap(ctx, x0 + i * (w + gap), y, w, s2, kl, a, { h: 120, px: 32, dik: i === 4 ? 4 : 2.5 }); if (i) pijl(ctx, x0 + i * (w + gap) - gap + 6, y + 60, x0 + i * (w + gap) - 8, y + 60, C.line, a, 3, 14); });
    const xm = x0 + 4 * (w + gap) + w / 2; laag(ctx, q.on('visserijministers', 1, 0.4), () => tafel(ctx, xm, 480, 300));
    laag(ctx, q.on('Noorwegen', 1, 0.4), () => { pijl(ctx, xm - 230, 620, xm - 150, 500, C.line, 1, 3, 12); routeStap(ctx, xm - 560, 600, 330, 'met Noorwegen\nen VK', C.line, 1, { h: 110, px: 30 }); metaText(ctx, 'BIJ SCHOL', xm - 395, 740, C.text2, 'center', 28); });
    laag(ctx, q.on('advies', 2, 0.4), () => { echtKaart(ctx, 120, 470, 860, 'SCHOL · NOORDZEE + SKAGERRAK', [['advies 2027: hooguit 160.380 ton', q.on('honderdzestigduizend', 1, 0.4), C.goud], ['bestand gezond', q.on('gezond', 1, 0.4), C.groen]], 'ICES 2026 · WUR 2026', 1, { lh: 64, px: 44, rand: C.goud });
      schol(ctx, 800, 520, 120, { t, stil: true }); }); },

  // ---------- H4: overbevissing ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const kx = 100, ky = 110, kw = 1720, kh = 740;
    const view = mixView({ lon: 2, lat: 57, k: 260 }, VIEW_NZ, ramp(t, 0, 2.6)), P = kaartProj(kx, ky, kw, kh, view);
    const t2 = q.at('miljoen', 1), tH = q.at('Halverwege', 1), ton = t < tH ? 2000000 : Math.exp(lerp(Math.log(2000000), Math.log(50000), ease((t - tH) / 3)));
    zeeKaart(ctx, kx, ky, kw, kh, view, 1, { teken: (Pp) => { const [bx, by] = Pp(2.6, 57.3);
      laag(ctx, q.on('harder', 1, 0.5) * (1 - q.on('1977', 1, 0.5)), () => { [[7.8, 55.4], [7.9, 58.0], [4.2, 54.4]].forEach(([lo, la], i) => { const [x, y] = Pp(lo, la); kotter(ctx, x, y, 0.32, 1, { t: t + i, kijk: i % 2 ? 1 : -1 }); }); });
      biomassaBlok(ctx, bx, by, ton, q.on('twee', 1, 0.5), { max: 300, kl: C.oker, rand: t > tH + 1 ? C.koraal : null });
      laag(ctx, q.on('haring', 1, 0.4) * (1 - q.on('Halverwege', 1, 0.4)), () => { haring(ctx, bx, by, 170, { t }); });
      laag(ctx, q.on('miljoen', 1, 0.4) * (1 - q.on('Halverwege', 1, 0.4)), () => metaText(ctx, '> 2 MILJOEN TON HARING', bx, by - 172, C.oker, 'center', 30));
      laag(ctx, q.on('vijftigduizend', 1, 0.4), () => { metaText(ctx, '< 50.000 TON', bx, by + 70, C.koraal, 'center', 30); tag(ctx, 'let op', bx, by - 60, C.koraal, 1, 'center', 32); haring(ctx, bx + 120, by, 110, { t }); });
      laag(ctx, q.on('jonge', 1, 0.4) * (1 - q.on('Halverwege', 1, 0.4)), () => zoomCircle(ctx, bx + 640, by - 130, 150, bx + 90, by - 60, 'jong · nog geen eitjes', 1, () => { ctx.fillStyle = '#163A55'; ctx.fillRect(bx + 480, by - 290, 320, 320); haring(ctx, bx + 640, by - 130, 220, { t, goud: true }); }));
      laag(ctx, q.on('1977', 1, 0.4), () => { const [sx, sy] = Pp(3.0, 53.3); slagboom(ctx, sx, sy, 0, 1, { L: 200 }); tag(ctx, 'dicht 1977', sx - 110, sy - 30, C.koraal, 1, 'center', 32); }); } });
    kaart(ctx, 140, 140, 480, 80, 1, C.line); text(ctx, t < q.at('Halverwege', 1) - 0.2 ? 'jaren zestig' : t < q.at('1977', 1) - 0.2 ? 'jaren zeventig' : '1977', 170, 194, fTekst(40, 800), C.text, 'left'); metaText(ctx, 'NOORDZEE', 600, 194, C.text2, 'right', 28);
    laag(ctx, q.on('Hoe', 1, 0.4), () => vraagteken(ctx, 1640, 300, 1, 130)); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const kx = 100, ky = 110, kw = 1720, kh = 740, tK = q.at('kabeljauw', 1), tO = q.at('Overbevissing', 1);
    const view = mixView(mixView(VIEW_NZ, VIEW_AT, ramp(t, tK - 0.3, 1.6)), VIEW_NF, ramp(t, tK + 1.4, 1.8)), Pt = kaartProj(kx, ky, kw, kh, view), K = ramp(t, tK + 1.6, 0.6), E = ramp(t, tO - 0.3, 0.6);
    const tH = q.at('herstel', 1), t83 = q.at('1983', 1), ton = Math.exp(lerp(Math.log(50000), Math.log(1000000), ease((t - tH) / (q.at('miljoen', 1) - tH + 0.6) * 0.3 + Math.max(0, (t - t83) / (q.at('miljoen', 1) - t83 + 0.4)) * 0.7)));
    laag(ctx, 1 - E, () => { zeeKaart(ctx, kx, ky, kw, kh, view, 1, { teken: (P) => { const [bx, by] = P(2.6, 57.3);
      laag(ctx, 1 - ramp(t, tK - 0.3, 0.6), () => { const [sx, sy] = P(3.0, 53.3); slagboom(ctx, sx, sy, ramp(t, t83, 1.0), 1, { L: 200 }); laag(ctx, q.on('1983', 1, 0.4), () => tag(ctx, 'open 1983', sx - 110, sy - 30, C.groen, 1, 'center', 32)); });
      biomassaBlok(ctx, bx, by, ton, 1, { max: 300 }); laag(ctx, 1 - K, () => { metaText(ctx, ton > 600000 ? '± 1 MILJOEN TON' : 'WEINIG OUDERS', bx, by - 130, C.oker, 'center', 28); });
      const [nx, ny] = P(-48.3, 48.9); laag(ctx, K, () => { kabeljauw(ctx, nx, ny, 240, { t, a: 1 });
        laag(ctx, q.on('kustvisserij', 1, 0.4), () => { const [cx, cy] = P(-53.0, 47.4); kotter(ctx, cx, cy, 0.22, 1, { t }); metaText(ctx, 'KLEINE KUSTVISSERIJ', cx - 30, cy + 52, C.text, 'center', 28); }); }); } });
      laag(ctx, 1 - ramp(t, tK - 0.3, 0.6), () => { kaart(ctx, 1180, 140, 600, 80, 1, C.groen); regel(ctx, 'antwoord b: een paar jaar', 1210, 194, 1, C.groen, 40, 'left', 700); kaart(ctx, 140, 140, 420, 80, 1, C.line); text(ctx, t < t83 - 0.2 ? 'na 1977' : '1983', 170, 194, fTekst(40, 800), C.text, 'left'); metaText(ctx, 'NOORDZEE', 540, 194, C.text2, 'right', 28);
        laag(ctx, q.on('miljoen', 1, 0.4), () => metaText(ctx, 'DICKEY-COLLAS E.A. 2010', 1790, 830, C.text2, 'right', 28)); });
      laag(ctx, K, () => { kaart(ctx, 140, 140, 560, 80, 1, C.line); text(ctx, 'Newfoundland', 170, 194, fTekst(40, 800), C.text, 'left'); metaText(ctx, 'CANADA', 680, 194, C.text2, 'right', 28);
        const t24 = q.at('2024', 1); { const [sx, sy] = Pt(-45.6, 46.6); slagboom(ctx, sx, sy, ramp(t, t24 + 1.2, 1.0), q.on('1992', 1, 0.4), { L: 200 }); }
        laag(ctx, q.on('1992', 1, 0.4), () => tag(ctx, t < t24 + 1 ? 'dicht 1992' : '2024: grote visserij weer open', 1500, 610, t < t24 + 1 ? C.koraal : C.groen, 1, 'center', 32));
        laag(ctx, q.on('schattingen', 1, 0.4) * (1 - q.on('kustvisserij', 1, 0.4)), () => { kaart(ctx, 1080, 260, 700, 130, 1, C.koraal); text(ctx, 'te hoge schattingen', 1110, 316, fTekst(40, 800), C.koraal, 'left'); laag(ctx, q.on('quota', 1, 0.4), () => text(ctx, 'te hoge quota', 1110, 368, fTekst(40, 800), C.koraal, 'left')); });
        laag(ctx, q.on('2024', 1, 0.4), () => { kaart(ctx, 1080, 260, 700, 130, 1, C.line); metaText(ctx, '1992', 1120, 316, C.koraal, 'left', 28); metaText(ctx, '2024', 1740, 316, C.groen, 'right', 28);
          const u = ramp(t, q.at('2024', 1), 1.6); ctx.fillStyle = rgba(C.koraal, 0.6); ctx.fillRect(1120, 336, 620 * u, 20); text(ctx, '32 jaar', 1430, 382, fTekst(32, 800), C.text, 'center'); });
        metaText(ctx, 'DFO 2024 · HUTCHINGS 2000', 1790, 830, C.text2, 'right', 28); }); });
    laag(ctx, E, () => { metaText(ctx, 'HOE LANG WAS DE GROTE VISSERIJ DICHT?', 200, 230, C.text2, 'left', 28); const X = (j) => 420 + (j - 1970) / 60 * 1300;
      [[1970, 2030, 'TIJD →']].forEach(() => { lijn(ctx, [[X(1970), 700], [X(2030), 700]], C.line, 2); for (const j of [1970, 1980, 1990, 2000, 2010, 2020, 2030]) metaText(ctx, String(j), X(j), 748, C.text2, 'center', 28); });
      const rij = (y, naam, a0, a1, kl, f) => { haring && 0; text(ctx, naam, 200, y + 16, fTekst(40, 800), C.text, 'left'); roundRect(ctx, X(a0), y - 26, (X(a1) - X(a0)) * f, 52, 10); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 2); };
      rij(380, 'haring', 1977, 1983, C.koraal, 1); metaText(ctx, '6 JAAR', X(1983) + 20, 392, C.koraal, 'left', 28);
      rij(540, 'kabeljauw', 1992, 2024, C.koraal, ramp(t, tO, 1.4)); metaA(ctx, '32 JAAR', X(2024) + 20, 552, ramp(t, tO + 1.2, 0.4), C.koraal, 'left', 28); laag(ctx, ramp(t, tO + 1.2, 0.4), () => { ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(X(1998), 560, X(2024) - X(1998), 10); metaText(ctx, 'KLEINE KUSTVISSERIJ GING DOOR', X(1998), 612, C.teal, 'left', 28); });
      laag(ctx, q.on('daarna', 1, 0.4), () => haak(ctx, X(1977), X(2024), 640, 'ook vis voor jaren daarna', C.koraal, 1)); }); },

  // ---------- Recap ----------
  s19(ctx, t, q) { const P2 = ramp(t, q.at('model', 1) - 0.6, 0.5), P3 = ramp(t, q.at('mariene', 1) - 0.3, 0.5);
    if (P2 < 1) { const A = 1 - P2, z1 = ramp(t, 0, 1.4); laag(ctx, A, () => {
      if (z1 < 1) { bg(ctx, 'schema'); zeeKaart(ctx, 100, 110, 1720, 740, mixView(VIEW_NZ, { lon: 3.5, lat: 54.5, k: 900 }, z1), 1 - z1); }
      laag(ctx, z1, () => { decor(ctx, 'schip', 0.6); const PX = 18, X0 = 440, L = 30 * PX; meetplank(ctx, X0, 470, PX, 40, 1, { rechts: true, hh: 150, mark: 30 }); schol(ctx, X0 + 40 * PX - L / 2, 456, L, { t, goud: 1, oor: true });
        const p = scholOor(X0 + 40 * PX - L / 2, 456, L, 1); zoomCircle(ctx, 1500, 300, 200, p.x, p.y, 'vier winters', q.on('schol', 1, 0.6), () => { ctx.fillStyle = '#121A26'; ctx.fillRect(1280, 80, 440, 440); otoliet(ctx, 1500, 300, 170, { n: 4, goud: 1 }); });
        laag(ctx, q.on('Waarom', 1, 0.4), () => { kaart(ctx, 160, 690, 1080, 140, 1, C.goud); text(ctx, 'Minder vangen = meer vis?', 200, 768, fTekst(56, 800), C.text, 'left'); metaA(ctx, 'OP DEN DUUR: JA, ALS ER TE VEEL WERD GEVANGEN', 200, 808, q.on('op', 2, 0.3), C.groen, 'left', 28); vink_(ctx, 1170, 756, 26, q.on('op', 2, 0.3), C.groen); }); }); }); }
    if (P2 > 0.01 && P3 < 1) laag(ctx, P2 * (1 - P3), () => { bg(ctx, 'schema'); const tV = q.at('Vang', 3), M = ramp(t, tV, 1.2);
      const g = heuvel(ctx, 260, 240, 960, 480, 1, 1, { punten: [[500, 1 - M, C.goud, '125'], [lerp(500, 325, M), M, C.koraal, '']] }); modelLabel(ctx, 260, 180, 1);
      laag(ctx, q.on('helft', 1, 0.4), () => metaText(ctx, 'HELFT VAN DE DRAAGKRACHT', g.X(500) + 16, 640, C.goud, 'left', 28));
      laag(ctx, q.on('Vang', 2, 0.4), () => { kaart(ctx, 1320, 260, 500, 140, 1, C.goud); text(ctx, 'vangst = aanwas', 1350, 330, fTekst(44, 800), C.goud, 'left'); metaText(ctx, 'DUURZAAM', 1350, 376, C.text, 'left', 28); });
      laag(ctx, q.on('Vang', 3, 0.4), () => { kaart(ctx, 1320, 440, 500, 140, 1, C.koraal); text(ctx, 'vangst > aanwas', 1350, 510, fTekst(44, 800), C.koraal, 'left'); metaText(ctx, 'DE BRON KRIMPT', 1350, 556, C.text, 'left', 28); }); });
    if (P3 > 0.01) laag(ctx, P3, () => { decor(ctx, 'schip', 0.6); sam(ctx, 300, t, { kijk: 1, uit: 'blij' }); bio(ctx, 1620, t, { kijk: -1, uit: 'blij', pose: q.on('besluit', 1) > 0.5 ? 'staan' : 'wijs' });
      const kaartje = (x, kop, cue, fn, kl) => laag(ctx, q.on(cue, 1, 0.4), () => { kaart(ctx, x, 200, 300, 340, 1, kl); fn(x + 150, 340); text(ctx, kop, x + 150, 500, fTekst(36, 800), kl, 'center'); });
      kaartje(520, 'leeftijd', 'leest', (x, y) => otoliet(ctx, x, y, 110, { n: 4, goud: 1 }), C.goud);
      kaartje(850, 'populatie', 'telt', (x, y) => { for (let i = 0; i < 9; i++) scholIcoon(ctx, x - 80 + (i % 3) * 80, y - 60 + Math.floor(i / 3) * 60, 1.4, 1, { kijk: i % 2 ? -1 : 1 }); }, C.oker);
      kaartje(1180, 'duurzame vangst', 'rekent', (x, y) => { const pts = []; for (let i = 0; i <= 30; i++) pts.push([x - 110 + i / 30 * 220, y + 70 - AANWAS(i / 30 * 1000) / 125 * 130]); lijn(ctx, pts, C.oker, 5); circ(ctx, x, y - 60, 10, C.goud); }, C.groen);
      laag(ctx, q.on('ministers', 1, 0.4), () => { kaart(ctx, 700, 590, 540, 100, 1, C.line); text(ctx, 'besluit: de ministers', 970, 654, fTekst(40, 800), C.text, 'center'); }); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = [['wo', 'Marine Sciences · 3 jaar', 'WAGENINGEN · ENGELSTALIG', 'Wageningen', C.groen], ['wo', 'Biologie → master Marine Biology', 'GRONINGEN · MASTER 2 JAAR, ENGELSTALIG', 'Groningen', C.groen], ['hbo', 'Kust- en zeemanagement · 4 jaar', 'VAN HALL LARENSTEIN, LEEUWARDEN', 'Leeuwarden', C.teal]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 170;
      roundRect(ctx, 100, y, 1300, 140, 18); shape(ctx, rgba('#0D1420', 0.9), kl, 2); text(ctx, n, 140, y + 86, fTitel(46), kl); text(ctx, o, 300, y + 64, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 110, C.grain, 'left', 28); ctx.restore(); });
    sam(ctx, 1560, t, { kijk: 1, uit: 'blij', outfit: 'buiten' }); bio(ctx, 1780, t, { kijk: -1, uit: 'blij' }); }
});
