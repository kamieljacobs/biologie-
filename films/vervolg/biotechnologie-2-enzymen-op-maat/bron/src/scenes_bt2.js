// Wat word jij? · Biotechnologie en life sciences · Enzymen op maat — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam practicum, Merel lab); Micro alleen in zoomcirkels (eiwitketens op de vezel, protease met plek 222).
// Rode draad: Sams eivlek, drie rondes gerichte evolutie op zijn platen.

const RONDE = (ctx, n, a = 1) => metaA(ctx, 'RONDE ' + n, 1800, 120, a, C.goud, 'right', 28);
Object.assign(SCENES, {
  title(ctx, t) {
    wasmachine(ctx, 1450, 820, 1.25, { t, draai: 1 }); broek(ctx, 1760, 420, 0.8, { vlek: 1 });
    protease(ctx, 1150, 620, 70, { hl: 1, an: 0.3 });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    wasmachine(ctx, 380, FLOOR, 1.15, { t, draai: 1 - q.on('broek', 1) });
    const B = q.on('broek', 1, 0.4); broek(ctx, 760, 400, 1.1, { a: B, vlek: 1 });
    if (q.on('eivlek', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('eivlek', 1); ctx.beginPath(); ctx.ellipse(760 + 46 * 1.1, 400 + 160 * 1.1, 46, 38, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); naamBij(ctx, 'eivlek', 'NA 30 °C NOG ER', 810, 770, q.on('wasbeurt', 1), 'center'); }
    sam(ctx, 1260, t, { a: 1, pose: q.on('eivlek', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1 });
    tag(ctx, 'opdracht: vlek weg bij 30 °C', 1460, 200, C.goud, q.on('stageopdracht', 1), 'center', 32);
    wasmiddelPak(ctx, 1600, FLOOR, 1, q.on('enzym', 1));
    vraagteken(ctx, 1760, 480, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord b: het knipt de ketens in stukjes'); RONDE(ctx, 0, 0);
    const K = q.on('knipt', 1, 6);
    zoomCircle(ctx, 760, 500, 320, 240, 560, 'VERGROOT · GESTOLD EIWIT OP EEN VEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(440, 180, 640, 640);
      eiwitKluwenVezel(ctx, 760, 700, 560, { knip: K, t }); const k = (t * 0.25) % 1, ea = k * 6.283; const ex = 760 + Math.cos(ea) * 150, ey = 580 + Math.sin(ea) * 120; enzymKluwen(ctx, ex, ey, 42, { a: q.on('protease', 1), sluit: (Math.sin(t * 5) + 1) / 2 }); naamBij(ctx, 'protease', 'KNIPT EIWIT', ex + 54, ey - 30, q.on('protease', 1), 'left'); });
    broek(ctx, 200, 380, 0.6, { vlek: 1 - K * 0.8 });
        chip(ctx, 'het enzym raakt niet op', 1360, 470, C.groen, q.on('vrij', 1), 28);
    const V = q.on('zetmeel', 1); [['amylase', 'ZETMEEL', 'amylase'], ['lipase', 'VET', 'lipase']].forEach(([n, m, w], i) => { const a = q.on('amylase', 1); enzymKluwen(ctx, 1300 + i * 260, 640, 40, { a: Math.max(a, 0.4) * V, seed: 6 + i * 3 }); naamBij(ctx, n, m, 1300 + i * 260, 730, a * V, 'center'); }); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    wasmachine(ctx, 360, 760, 1, { t, draai: 1 });
    const E = q.on('energie', 1, 0.6); if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; metaA(ctx, 'ENERGIE PER WASBEURT', 700, 230, 1, C.goud, 'left', 28); metaA(ctx, 'BIJ 40 °C', 700, 310, 1, C.grain, 'left', 28);
      const w1 = 900, k = q.on('scheelt', 1, 1); roundRect(ctx, 700, 330, w1, 60, 10); shape(ctx, '#2A3A58', '#8FA0B5', 2);
      roundRect(ctx, 700, 330, w1 * 0.8, 60, 10); shape(ctx, C.koraal, null); roundRect(ctx, 700 + w1 * 0.8, 330, w1 * 0.2, 60, 10); shape(ctx, '#6E7A90', null);
      naamBij(ctx, 'water opwarmen', 'HET GROOTSTE DEEL', 700 + w1 * 0.4, 440, q.on('water', 1), 'center'); 
      ctx.globalAlpha *= q.on('veertig', 1); const w2 = w1 * lerp(1, 0.67, k); roundRect(ctx, 700, 560, w2, 60, 10); shape(ctx, '#2A3A58', '#8FA0B5', 2); roundRect(ctx, 700, 560, w2 * 0.8, 60, 10); shape(ctx, C.koraal, null);
      metaA(ctx, 'BIJ 30 °C', 700, 540, q.on('veertig', 1), C.grain, 'left', 28); tag(ctx, '≈ een derde minder', 700 + w2 + 40, 600, C.groen, k, 'left', 30); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    const M = q.on('Merel', 1, 0.3); merel(ctx, 1560, t, { a: M, pose: q.on('startenzym', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Merel', 'PROCESTECHNOLOOG', 1560, 400, M, 'center');
    sam(ctx, 300, t, { kijk: 1 });
    protease(ctx, 900, 420, 110, { a: q.on('startenzym', 1), hl: q.on('actieve', 1), plek: 'kapot', vorm: q.on('bleekmiddel', 1) * 0.8, an: 0.2 });
    naamBij(ctx, 'startenzym', 'UIT EEN BACILLUS-BACTERIE', 900, 600, q.on('startenzym', 1), 'center');
    [['basisch', '✓', C.groen, 'basische'], ['koud: traag', '', C.koraal, 'traag'], ['bleekmiddel', '', C.koraal, 'bleekmiddel']].forEach(([n, v, col, w], i) => chip(ctx, n, 560 + i * 340, 760, col, q.on(w, 1), 30));
    bleekMolecuul(ctx, lerp(1250, 1000, q.on('bleekmiddel', 1, 1.5)), lerp(220, 340, q.on('bleekmiddel', 1, 1.5)), 1.4, q.on('bleekmiddel', 1));
    metaA(ctx, 'VORM BEPAALT WERKING', 900, 250, q.on('vorm', 1), C.goud, 'center', 28); },

  s07(ctx, t, q) { bg(ctx, 'schema'); RONDE(ctx, 1, q.on('ronde', 1));
    genStreep(ctx, 700, 260, 760, { mut: Math.round(6 * q.on('willekeurige', 1, 1.5)), seed: 4 });
    naamBij(ctx, 'gen van het enzym', 'WILLEKEURIGE VERANDERINGEN (GOUD)', 700, 330, q.on('willekeurige', 1), 'center');
    const V = q.on('versie', 1, 1); for (let i = 0; i < 8; i++) { const k = clamp(V * 1.6 - i * 0.08, 0, 1); bacteriePlasmide(ctx, lerp(700, 260 + i * 170, ease(k)), lerp(300, 560 + (i % 2) * 120, ease(k)), 160, { a: k, t, plasmide: 0.8, gen: 0.4 }); }
    sam(ctx, 1720, t, { h: 340 });
    vraagteken(ctx, 1500, 400, q.on('denk', 1), 100); },

  s09(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord a: zoals in de wasmachine'); RONDE(ctx, 1);
    [['30 °C', C.teal], ['basisch', C.teal], ['met bleek', C.koraal]].forEach(([n, col], i) => chip(ctx, n, 400 + i * 260, 280, col, q.on('wasmachine', 1), 32));
    const G = q.on('warm', 1, 0.6); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; assen(ctx, 900, 400, 640, 340, '', ''); metaA(ctx, 'TEMPERATUUR', 1540, 790, 1, C.grain, 'right', 28); metaA(ctx, 'KNIPSNELHEID', 900, 380, 1, C.grain, 'left', 28);
      const f1 = (u) => Math.exp(-Math.pow((u - 0.75) / 0.14, 2)), f2 = (u) => 0.75 * Math.exp(-Math.pow((u - 0.45) / 0.18, 2));
      [[f1, '#6E7A90', 'WARM GOED'], [f2, C.groen, '30 °C GOED']].forEach(([f, col, lab]) => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 60; j++) { const u = j / 60, px = 900 + u * 640, py = 740 - f(u) * 300; j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); const um = f === f1 ? 0.75 : 0.45; metaA(ctx, lab, 900 + um * 640 + (f === f1 ? 60 : -60), 740 - f(um) * 300 - 20, 1, col, f === f1 ? 'left' : 'right', 28); });
      ctx.strokeStyle = C.goud; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(900 + 0.45 * 640, 400); ctx.lineTo(900 + 0.45 * 640, 740); ctx.stroke(); ctx.setLineDash([]); metaA(ctx, '30 °C', 900 + 0.45 * 640, 790, 1, C.goud, 'center', 28); ctx.restore(); }
    chip(ctx, 'boven het optimum: vorm weg', 1640, 560, C.koraal, q.on('optimum', 1), 28);
    tag(ctx, 'je vindt alleen waar je op test', 520, 560, C.goud, q.on('vindt', 1), 'center', 32); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); RONDE(ctx, 1);
    sam(ctx, 280, t, { pose: q.on('strijkt', 1) < 0.9 ? 'wijs' : 'staan' });
    const P = q.on('melk', 1, 0.6); melkPlaat(ctx, 860, 450, 300, { a: P, n: 46, ringen: q.on('heldere', 1, 1), groei: q.on('strijkt', 1, 2), win: 3, winSchaal: 1 });
    naamBij(ctx, 'melkplaat', 'TROEBEL DOOR MELKEIWIT · 30 °C · BASISCH', 860, 800, q.on('troebel', 1), 'center');
    naamBij(ctx, 'heldere ring', 'HIER IS HET EIWIT GEKNIPT', 1180, 300, q.on('heldere', 1), 'left');
    tag(ctx, 'duizend kolonies', 1400, 500, C.teal, q.on('duizend', 1), 'left', 30);
    vraagteken(ctx, 1600, 680, q.on('denk', 1), 100); },

  s12(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx); bt1Antwoord(ctx, 'antwoord b: maar een paar'); RONDE(ctx, 1);
    const W = melkPlaat(ctx, 700, 470, 300, { n: 46, ringen: 1, groei: 1, win: 3 });
    if (W.length) W.forEach(([x, y]) => { ctx.save(); ctx.globalAlpha *= q.on('groter', 1); ctx.beginPath(); ctx.arc(x, y, 40, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); });
    metaA(ctx, 'DE MEESTE: EVEN GOED OF SLECHTER', 700, 820, q.on('ringen', 1), C.grain, 'center', 28);
    sam(ctx, 1220, t, { uit: q.on('teleurgesteld', 1) > 0.5 && q.on('normaal', 1) < 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('teleurgesteld', 1) > 0.5 ? 'denk' : 'staan', kijk: -1 });
    merel(ctx, 1660, t, { a: q.on('normaal', 1, 0.3), pose: 'wijs', kijk: -1 });
    bubbel(ctx, 1560, 330, 'Je zoekt juist die paar.', '#F2F2EE', q.on('zoekt', 1), 30); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const meet = clamp((t - q.at('apparaat', 1)) / 3, 0, 1);
    putjesPlaat(ctx, 760, 470, 820, { a: q.on('zesennegentig', 1, 0.6), meet, kleur: q.on('kleurt', 1, 1.2), hl: [[2, 4], [5, 8], [6, 2]] });
    tweeBalk(ctx, 1450, 520, 0.7, 0.5, { a: q.on('bleekmiddel', 1), label: 'één putje' }); metaA(ctx, 'KNIPPEN · NA BLEEK', 1450, 300, q.on('bleekmiddel', 1), C.grain, 'center', 28);
    tag(ctx, 'tot zo\'n 10.000 varianten per dag', 1450, 700, C.goud, q.on('tienduizend', 1), 'center', 30);
    tag(ctx, 'screenen', 760, 140, C.goud, q.on('screenen', 1), 'center', 40); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); RONDE(ctx, 2, q.on('Ronde', 1));
    { const Pa = 1 - q.on('Variant', 1, 0.6); putjesPlaat(ctx, 960, 470, 760, { a: Pa, meet: 1, kleur: 1, hl: [[2, 4], [5, 8], [6, 2]] }); }
    [[0.95, 0.15, 'variant 1', 'snelst'], [0.55, 0.55, 'variant 2', 'iets'], [0.25, 0.9, 'variant 3', 'overleeft']].forEach(([k, b, n, w], i) => tweeBalk(ctx, 520 + i * 440, 700, k, b, { a: q.on(w, 1), label: n, h: 360 }));
    metaA(ctx, 'LINKS: KNIPPEN BIJ 30 °C · RECHTS: OVER NA BLEEK · STREEP: STARTENZYM', 960, 220, q.on('Variant', 1), C.grain, 'center', 28);
    vraagteken(ctx, 1760, 420, q.on('denk', 1), 100); },

  s16(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord c: variant twee'); RONDE(ctx, 2);
    [[0.95, 0.15, 'variant 1'], [0.55, 0.55, 'variant 2'], [0.25, 0.9, 'variant 3']].forEach(([k, b, n], i) => tweeBalk(ctx, 520 + i * 440, 700, k, b, { a: i === 1 ? 1 : 1 - 0.65 * q.on('door', 1), label: n, h: 360, win: i === 1 ? q.on('door', 1) : 0 }));
    tag(ctx, 'snel knippen én bleek overleven', 960, 220, C.groen, q.on('tegelijk', 1), 'center', 32);
    const S = q.on('stapelen', 1, 1.2); if (S > 0.01) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= clamp(S * 3 - i, 0, 1); roundRect(ctx, 1600, 760 - (i + 1) * 70, 160, 60, 8); shape(ctx, C.groen, null); ctx.restore(); } metaA(ctx, 'KLEINE STAPJES', 1680, 820, S, C.grain, 'center', 28); } },

  s17(ctx, t, q) { bg(ctx, 'schema');
    zoomCircle(ctx, 760, 480, 330, 760, 480, 'VERGROOT · ÉÉN PROTEASE', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(420, 140, 680, 680);
      const A = q.on('alanine', 1, 0.6); const P = protease(ctx, 760, 480, 200, { hl: q.on('methionine', 1), plek: A > 0.5 ? 'ala' : 'met', an: 0.15 }); if (A < 0.5) { ctx.save(); ctx.globalAlpha *= q.on('aminozuur', 1); ctx.beginPath(); ctx.arc(P.plek[0], P.plek[1], 34, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
      bleekMolecuul(ctx, lerp(1010, 880, q.on('beschadigt', 1, 1.2)), lerp(220, 340, q.on('beschadigt', 1, 1.2)), 1.2, q.on('Bleekmiddel', 1) * (1 - A));
      naamBij(ctx, 'actief centrum', '', 600, 640, q.on('Bleekmiddel', 1), 'center'); });
    { const A = q.on('alanine', 1, 0.6); naamBij(ctx, A > 0.5 ? 'alanine' : 'methionine', 'PLEK 222', 1110, 290, q.on('aminozuur', 1), 'left', A > 0.5 ? C.groen : C.goud); }
    genStreep(ctx, 1460, 520, 520, { a: q.on('gen', 1), hlPos: 0.62 }); naamBij(ctx, 'gen', 'OP PRECIES DIE PLEK VERANDERD', 1460, 590, q.on('gen', 1), 'center');
    tag(ctx, 'gericht ontwerp', 1460, 400, C.goud, q.on('ontwerp', 1), 'center', 36);
    vraagteken(ctx, 1700, 760, q.on('denk', 1), 90); },

  s19(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord a: beter tegen bleek, vaak trager');
    zoomCircle(ctx, 640, 480, 300, 640, 480, 'VERGROOT · ALANINE OP PLEK 222', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(340, 180, 600, 600);
      protease(ctx, 640, 480, 180, { hl: 1, plek: 'ala', vorm: 0.35 * q.on('vorm', 1), an: 0.15 }); const k = q.on('beschadigen', 1, 1.5); bleekMolecuul(ctx, lerp(780, 860, k), lerp(330, 230, k), 1.1, 1 - 0.5 * k); });
    klokje(ctx, 1300, 380, 70, (t * 0.06) % 1, q.on('trager', 1)); naamBij(ctx, 'knipt vaak trager', 'SOMS EEN FRACTIE ZO SNEL', 1300, 520, q.on('trager', 1), 'center');
    tag(ctx, 'effect moeilijk te voorspellen', 1300, 680, C.koraal, q.on('voorspellen', 1), 'center', 30);
    chip(ctx, 'gericht ontwerp + gerichte evolutie', 1300, 780, C.goud, q.on('combineren', 1), 28); },

  s20(ctx, t, q) { bg(ctx, 'schema'); RONDE(ctx, 3, q.on('kiest', 1));
    tag(ctx, 'het enzym past zich niet aan: Sam kiest', 960, 180, C.goud, q.on('kiest', 1), 'center', 32);
    { const P0 = q.on('kiest', 1) * (1 - q.on('Frances', 1, 0.5)); for (let i = 0; i < 3; i++) { melkPlaat(ctx, 560 + i * 400, 480, 130, { a: P0, n: 14, seed: 7 + i, win: 1, winSchaal: 1 + i * 0.6, ringen: 1 }); if (i < 2) pijl(ctx, 710 + i * 400, 480, 790 + i * 400, 480, C.line, P0, 3, 14); } }
    const A = q.on('Frances', 1, 0.6); if (A > 0.01) { kaartje(ctx, 600, 380, 620, 140, 'Frances Arnold · 1993', 'ALS EERSTE · IN EEN OPLOSMIDDEL', { a: A, col: C.goud });
      const k = q.on('tweehonderdzesenvijftig', 1, 1.8), Nd = 1 - 0.6 * q.on('tweeduizend', 1); ctx.save(); ctx.globalAlpha *= Nd; [[3, 'START', '#6E7A90', 1], [300 * k, 'NA 3 RONDES', C.groen, k]].forEach(([h, lab, col, la], i) => { roundRect(ctx, 420 + i * 220, 820 - Math.max(h, 3), 120, Math.max(h, 3), 6); shape(ctx, col, null); metaA(ctx, lab, 480 + i * 220, 860, la, C.grain, 'center', 28); }); ctx.restore();
      text(ctx, '× 256', 790, 580, fTitel(72), C.groen, 'left'); ctx.save(); ctx.globalAlpha *= 1 - k; ctx.fillStyle = C.bgSchema; ctx.fillRect(770, 500, 300, 100); ctx.restore(); }
    const N = q.on('tweeduizend', 1, 0.5); if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; circ(ctx, 1450, 560, 110, C.goud, '#F0D58A', 4); circ(ctx, 1450, 560, 86, null, '#B8902E', 2); text(ctx, '2018', 1450, 575, fTitel(48), '#2A3A58', 'center'); ctx.restore(); naamBij(ctx, 'Nobelprijs Scheikunde', '2018', 1450, 720, N, 'center'); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); RONDE(ctx, 3);
    for (let i = 0; i < 3; i++) { const x = 460 + i * 500; melkPlaat(ctx, x, 470, 190, { n: 26, seed: 7 + i, win: 1, winSchaal: 1 + i * 0.6, ringen: 1, a: i < 2 ? 1 : q.on('winnaar', 1) }); metaA(ctx, 'RONDE ' + (i + 1), x, 720, 1, C.grain, 'center', 28); if (i < 2) pijl(ctx, x + 210, 470, x + 290, 470, C.line, 1, 3, 14); }
    tag(ctx, 'winnaar: sneller bij 30 °C, ook met bleek', 960, 170, C.groen, q.on('winnaar', 1), 'center', 32);
    metaA(ctx, 'ECHTE PROJECTEN: SOMS VEEL MEER RONDES', 960, 820, q.on('rondes', 1), C.grain, 'center', 28); },

  // ---------- H4 ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    melkPlaat(ctx, 260, 360, 150, { n: 18, seed: 9, win: 1, winSchaal: 2.2 });
    genStreep(ctx, 640, 360, 300, { a: q.on('gen', 1) }); pijl(ctx, 430, 360, 480, 360, C.line, q.on('gen', 1), 3, 12);
    bacteriePlasmide(ctx, 640, 560, 300, { a: q.on('productiecel', 1), t, gen: 1 }); naamBij(ctx, 'productiecel', 'BACILLUS', 640, 700, q.on('Bacillus', 1), 'center');
    bioreactor(ctx, 1220, FLOOR, 1, { a: q.on('tank', 1), t, sensor: 0.6 }); metaA(ctx, 'ZOALS IN FILM 1', 1220, 300, q.on('tank', 1), C.grain, 'center', 28);
    vraagteken(ctx, 1700, 480, q.on('denk', 1), 100); },

  s24(ctx, t, q) { bg(ctx, 'schema'); bt1Antwoord(ctx, 'antwoord c: in de vloeistof');
    zoomCircle(ctx, 640, 500, 300, 640, 500, 'VERGROOT · IN DE TANK', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(340, 200, 600, 600);
      bacteriePlasmide(ctx, 600, 500, 300, { t, gen: 1 }); for (let i = 0; i < 9; i++) { const ph = (t * 0.25 + i / 9) % 1, an = -1.2 + i * 0.3; enzymKluwen(ctx, 600 + Math.cos(an) * (170 + ph * 120), 500 + Math.sin(an) * (90 + ph * 120), 16, { a: q.on('vloeistof', 1) * (1 - ph * 0.6), seed: i }); } });
    const F = q.on('filtert', 1, 0.6); if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; ctx.strokeStyle = KL_GLAS; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1160, 300); ctx.lineTo(1360, 300); ctx.lineTo(1290, 420); ctx.lineTo(1290, 480); ctx.moveTo(1230, 480); ctx.lineTo(1230, 420); ctx.lineTo(1160, 300); ctx.stroke(); ctx.restore(); naamBij(ctx, 'cellen eruit', '', 1420, 330, F, 'left'); }
    korrels(ctx, 1300, 680, 1.4, q.on('korrels', 1)); naamBij(ctx, 'korrels', 'STUIVEN NIET', 1300, 780, q.on('korrels', 1), 'center'); },

  s25(ctx, t, q) { bg(ctx, 'schema');
    octrooiBrief(ctx, 760, 470, 1.4, q.on('octrooi', 1)); protease(ctx, 1240, 420, 90, { a: q.on('variant', 1), hl: 1, plek: 'ala' });
    tag(ctx, 'tot 20 jaar na de aanvraag', 1240, 640, C.goud, q.on('twintig', 1), 'center', 32); metaA(ctx, 'IN EUROPA', 1240, 700, q.on('twintig', 1), C.grain, 'center', 28); },

  s26(ctx, t, q) { bg(ctx, 'schema');
    pilDoosje(ctx, 360, 360, 1.1, q.on('sitagliptine', 1), 'sitagliptine'); naamBij(ctx, 'diabetesmedicijn', 'MERCK EN CODEXIS', 360, 480, q.on('sitagliptine', 1), 'center');
    metaalWeg(ctx, 760, 340, q.on('metaal', 1), q.on('zonder', 1)); naamBij(ctx, 'zwaar metaal', 'RHODIUM', 760, 430, q.on('metaal', 1), 'center');
    const E = q.on('Onderzoekers', 1, 0.6), Ev = q.on('evolueren', 1, 3); protease(ctx, 1200, 360, 90, { a: E, an: 0.5 }); if (E > 0.01) for (let i = 0; i < Math.round(22 * Ev); i++) { const an = hash(i) * 6.283, rr = 30 + hash(i + 3) * 50; circ(ctx, 1200 + Math.cos(an) * rr, 360 + Math.sin(an) * rr, 6, C.goud, null); }
    tag(ctx, 'ruim 20 veranderingen · tienduizenden keren beter', 1200, 520, C.goud, q.on('tienduizenden', 1), 'center', 28);
    chip(ctx, 'in de natuur niet gevonden', 1200, 220, C.koraal, q.on('natuur', 1), 28);
    afvalBalken(ctx, 700, 660, { a: q.on('fabriek', 1), k: q.on('minder', 1, 1.2) }); },

  // ---------- Recap ----------
  s27(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    wasmachine(ctx, 260, FLOOR, 0.9, { t }); broek(ctx, 520, 430, 0.8, { vlek: 1 - q.on('dertig', 1, 1.5) });
    genStreep(ctx, 980, 260, 520, { mut: Math.round(5 * q.on('willekeurig', 1, 1)), seed: 2 });
    [['30 °C', C.teal], ['basisch', C.teal], ['met bleek', C.koraal]].forEach(([n, col], i) => chip(ctx, n, 820 + i * 170, 360, col, q.on('wasmachine', 1), 28));
    for (let i = 0; i < 3; i++) { const x = 820 + i * 330; melkPlaat(ctx, x, 620, 130, { n: 16, seed: 3 + i, win: 1, winSchaal: 1 + i * 0.6, a: [q.on('duizenden', 1), q.on('paar', 1), q.on('ronde', 1)][i] }); metaA(ctx, 'RONDE ' + (i + 1), x, 780, [q.on('duizenden', 1), q.on('paar', 1), q.on('ronde', 1)][i], C.grain, 'center', 28); }
    metaA(ctx, 'DE MEESTE: NIET BETER', 820, 830, q.on('meeste', 1), C.koraal, 'center', 28); },

  s28(ctx, t, q) { bg(ctx, 'schema'); labVloer(ctx);
    sam(ctx, 180, t, { a: 1, h: 360 }); merel(ctx, 1760, t, { a: 1, h: 360, kijk: -1 });
    schoolIcoon(ctx, 560, 360, 1, q.on('HAN', 1), 'HBO'); naamBij(ctx, 'Biologie en Medisch Lab. · Chemie', 'HAN · NIJMEGEN', 560, 520, q.on('HAN', 1), 'center');
    schoolIcoon(ctx, 1260, 360, 1, q.on('universiteit', 1), 'WO'); naamBij(ctx, 'Molecular Life Sciences', 'RADBOUD · NIJMEGEN', 1260, 520, q.on('Radboud', 1), 'center'); naamBij(ctx, 'Biotechnologie', 'WAGENINGEN', 1260, 620, q.on('Wageningen', 1), 'center');
    fabriekIcoon(ctx, 860, 720, 0.7, q.on('IFF', 1)); naamBij(ctx, 'enzymbedrijf', 'BIJV. IFF · LEIDEN', 980, 730, q.on('IFF', 1), 'left');
    chip(ctx, 'film 3: welke regels gelden er?', 960, 180, C.paars, q.on('drie', 1), 28); },
});
