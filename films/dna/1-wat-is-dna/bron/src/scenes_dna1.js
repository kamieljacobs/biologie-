// Wat is DNA? 3.0 — scènes (één functie per gesproken alinea). 26 okt 2026.
// q.at(woord) zoekt een stukje van een woord (hoofdletterongevoelig, eerste keer): kies cue-woorden die uniek zijn.
const SEQ = 'ATGCATTGCAGT';
const KERN = { cx: 960, cy: 450, r: 380, seed: 4 };

Object.assign(SCENES, {
  // ---------------- titel: de helix draait rustig
  title(ctx, t) { dnaLadderHelix(ctx, 1060, 600, 70, 'ATGCATTGCAGTCC', { draai: 1, R: 90, s: 0.45, fase: t * 0.6 }); },

  // ---------------- Cold open: Noor doet het practicum
  s01(ctx, t, q) { lokaal(ctx);
    const water = ramp(t, q.at('spuugt'), 0.9), zeep = ramp(t, q.at('afwasmiddel'), 0.6), alc = ramp(t, q.at('alcohol'), 1.2), draad = ramp(t, q.at('zweven'), 2.4);
    let bx = 0, by = 0; persoon(ctx, 'noor', 520, VLOER, 640, { outfit: 'practicum', pose: 'vasthouden', uit: t > q.at('draadjes') ? 'blij' : 'neutraal', t, kijk: 1, hold: (c, x, y) => { bx = x + 6; by = y + 60; } });
    // camera duwt langzaam in op het buisje (getekend bovenop, groter)
    const zz = ramp(t, q.at('spuugt') - 0.3, 2.0), z = 1 + 0.9 * zz, cx = lerp(bx, 1180, zz), cy = lerp(by - 120, 460, zz);
    if (z > 1.01) { dimLaag(ctx, 0.6 * (z - 1) / 0.9); }
    ctx.save(); ctx.translate(cx, cy + 120 * z); ctx.scale(z, z); buisje(ctx, 0, 0, 230, { water, zeep, alc, draad, t }); ctx.restore();
    if (t > q.at('DNA') - 0.2) naamBij(ctx, 'witte draadjes', 'dna', cx + 70 * z, cy + 60 * z, ramp(t, q.at('DNA') - 0.2, 0.5), 'left', C.goud);
  },
  s02(ctx, t, q) { lokaal(ctx); persoon(ctx, 'noor', 520, VLOER, 640, { outfit: 'practicum', pose: 'vasthouden', uit: 'blij', t, kijk: 1 });
    dimLaag(ctx, 0.6); ctx.save(); ctx.translate(1180, 460 + 207); ctx.scale(1.9, 1.9); buisje(ctx, 0, 0, 230, { draad: 1, t }); ctx.restore();
    const z = ramp(t, q.at('wangcellen') - 0.3, 1.0) * (1 - ramp(t, q.at('Hoeveel') - 0.2, 0.6));
    zoomCircle(ctx, 640, 430, 320, 1180, 560, 'wangcellen uit het spoelwater · vergroot', z, () => { chMicro(ctx); const cc = wangcellen(ctx, 320, 110, 640, 640, { umPx: 4.2, seed: 5, focus: 4, focusA: ramp(t, q.at('elke'), 0.5) });
      if (t > q.at('complete')) ring(ctx, cc[4].kern[0], cc[4].kern[1], 22, ramp(t, q.at('complete'), 0.5)); });
    if (z > 0.5) { ctx.save(); ctx.globalAlpha *= z; ctx.fillStyle = C.text; ctx.fillRect(480, 830, 4.2 * 50, 5); metaText(ctx, '50 micrometer', 480 + 210 + 16, 841, C.text2, 'left', 26); ctx.restore(); }
    const d = ramp(t, q.at('Hoeveel') - 0.2, 0.6); if (d > 0.01) { dimLaag(ctx, d * 0.7);
      card(ctx, 260, 300, 660, 260, 'Puzzel 1', 'Hoeveel DNA zit er in één cel, en hoe past het erin?', d);
      card(ctx, 1000, 300, 660, 260, 'Puzzel 2', 'Hoe kan het DNA van Noor anders zijn dan het jouwe, met dezelfde bouwstenen?', d * ramp(t, q.at('Noor') - 0.3, 0.6)); } },

  // ---------------- Hoofdstuk 1 — Van wang tot molecuul
  s04(ctx, t, q) { const I = wangInfo(), f = I[6] ? 6 : 0, F = I[f];
    // doorlopende zoom: uitstrijkje → één wangcel → kern vult het beeld (één camera)
    const z1 = ramp(t, q.at('celkern') - 0.3, 2.2), zk = lerp(1, 380 / F.kr, z1);
    if (z1 < 0.98) { chMicro(ctx); ctx.save(); ctx.translate(960, 450); ctx.scale(zk, zk); ctx.translate(-lerp(960, F.kern[0], z1), -lerp(450, F.kern[1], z1)); wangcellen(ctx, 0, 0, W, 880, { umPx: 9, seed: 8, focus: f, focusA: ramp(t, q.at('platte'), 0.6) * (1 - z1) }); ctx.restore();
      naamBij(ctx, 'wangcel', 'plat · ± 70 micrometer', F.c[0] + 140, F.c[1] - 230, ramp(t, q.at('platte'), 0.5) * (1 - ramp(t, q.at('celkern') - 0.3, 0.4)), 'left');
      chSchaal(ctx, 9 * 20 * zk, '20 micrometer', 1 - ramp(z1, 0, 0.25)); }
    if (z1 > 0.6) { ctx.save(); ctx.globalAlpha *= ramp(z1, 0.6, 0.4); chMicro(ctx);
      const n = Math.round(46 * ramp(t, q.at('zesenveertig') - 0.2, 1.6));
      const e1 = ramp(t, q.at('chromosoom.') - 0.2, 0.4) * (1 - ramp(t, q.at('Meestal') - 0.2, 0.4)), e2 = ramp(t, q.at('langste') - 0.2, 0.4), foc = e2 > 0.5 ? 0 : 7, fA = Math.max(e1, e2);
      const pos = kernChromatine(ctx, KERN.cx, KERN.cy, KERN.r, { c: 0, seed: KERN.seed, kleuren: (i) => (i === foc && fA > 0.01 ? _mixHex(C.kernR, C.goud, fA) : (i < n ? _mixHex(C.kernR, '#121A26', 0.6 * fA) : _mixHex(C.kernR, '#121A26', 0.55))) });
      const P0 = pos[foc] || pos[0];
      if (t > q.at('zesenveertig') - 0.2 && t < q.at('chromosoom') + 2) term(ctx, n + ' chromosomen', 1460, 300, 1, 'left', 48);
      naamBij(ctx, 'celkern', null, KERN.cx + KERN.r * 0.8, KERN.cy - KERN.r * 0.75, ramp(t, q.at('celkern'), 0.5) * (1 - ramp(t, q.at('Elk') - 0.3, 0.4)), 'left');
      naamBij(ctx, 'chromosoom', 'één lang dna-molecuul', 1420, 420, e1, 'left');
      if (t > q.at('losse') - 0.2) naamBij(ctx, 'losse draden', 'elk in een eigen gebied', 1420, 520, ramp(t, q.at('losse') - 0.2, 0.5) * (1 - ramp(t, q.at('langste') - 0.3, 0.4)), 'left');
      naamBij(ctx, 'chromosoom 1', 'uitgerold ± 8 centimeter', 1420, 520, e2, 'left');
      chSchaal(ctx, 253, '2 micrometer'); ctx.restore(); } },
  s05(ctx, t, q) { chMicro(ctx); kernChromatine(ctx, KERN.cx, KERN.cy, KERN.r, { c: 0, seed: KERN.seed }); chSchaal(ctx, 253, '2 micrometer'); },
  s07(ctx, t, q) { const kw = ramp(t, q.at('micrometer') - 0.3, 0.4), tb = ramp(t, q.at('tennisbal') - 0.2, 0.5), kn = ramp(t, q.at('wikkelen') - 0.6, 0.5);
    if (kw < 0.99) { chSchema(ctx); // 2 meter naast Noor (1,65 m)
      const p = ramp(t, 0.1, 1.2), h = 520; persoon(ctx, 'noor', 640, 820, h, { uit: 'blij', t });
      const hm = h / 1.65 * 2; ctx.save(); ctx.fillStyle = C.paars; roundRect(ctx, 900, 820 - hm * p, 22, hm * p, 8); ctx.fill(); ctx.restore();
      metaText(ctx, '2 meter dna · uitgerekt', 960, 820 - hm * p + 10, C.text2, 'left', 28); metaText(ctx, 'noor · 1,65 meter', 640, 862, C.text2, 'center', 28);
      term(ctx, 'langer dan jij', 1300, 420, ramp(t, q.at('Langer'), 0.5), 'left'); }
    if (kw > 0.01 && tb < 0.99) { ctx.save(); ctx.globalAlpha *= kw; chMicro(ctx); kernChromatine(ctx, 760, 450, 300, { c: 0, seed: KERN.seed }); chSchaal(ctx, 200, '2 micrometer');
      term(ctx, 'een paar micrometer', 1180, 420, 1, 'left'); metaText(ctx, 'kleiner dan een honderdste millimeter', 1180, 470, C.grain, 'left', 28); ctx.restore(); }
    if (tb > 0.01 && kn < 0.99) { ctx.save(); ctx.globalAlpha *= tb; chSchema(ctx); tennisbal(ctx, 420, 470, 140, 1);
      const L = ramp(t, q.at('meer') - 0.2, 1.6); ctx.strokeStyle = C.paars; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(560, 470); for (let x = 560; x < 560 + 1280 * L; x += 8) ctx.lineTo(x, 470 + Math.sin(x / 40) * 10 * Math.min(1, (x - 560) / 200)); ctx.stroke();
      metaText(ctx, 'kern = tennisbal (6,7 cm)', 420, 680, C.grain, 'center', 28); term(ctx, 'meer dan tien kilometer DNA', 1180, 400, L, 'center', 56); metaText(ctx, 'zelfde verhouding · niet op schaal getekend', 1180, 540, C.grain, 'center', 28); ctx.restore(); }
    if (kn > 0.01) { ctx.save(); ctx.globalAlpha *= kn; chMicro(ctx); kernChromatine(ctx, 600, 450, 330, { c: 0, seed: KERN.seed });
      const sx = 690, sy = 360, zc = ramp(t, q.at('Zoom') - 0.2, 0.8); ring(ctx, sx, sy, 22, zc);
      zoomCircle(ctx, 1420, 430, 330, sx, sy, 'dna rond eiwitten · vergroot', zc, () => { chMicro(ctx); const op = ramp(t, q.at('opgevouwen') - 0.3, 1.2);
        if (op < 0.5) nucleosoomDraad(ctx, 1110, 470, 1740, 390, { n: 3, R: 62, t, a: 1 - op * 2 }); if (op > 0.01) kralenVouw(ctx, 1420, 430, 560, ramp(op, 0.3, 0.7), { n: 12, R: 24, a: Math.min(1, op * 2) }); });
      naamBij(ctx, 'eiwitten', null, 1420, 650, ramp(t, q.at('eiwitten'), 0.5), 'center'); naamBij(ctx, 'DNA', null, 1690, 300, ramp(t, q.at('eiwitten'), 0.5), 'left');
      chMeta(ctx, 'inzoomen · tien miljoen keer'); ctx.restore(); } },

  // ---------------- Hoofdstuk 2 — De bouwsteen en de ladder
  s08(ctx, t, q) { chMicro(ctx); const z = ramp(t, 0, 1.6);
    // van nucleosoomdraad naar één stuk helix (doorlopende zoom), dan ontwinden tot ladder
    if (z < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - z; nucleosoomDraad(ctx, 300, 470, 1640, 390, { n: 3, R: 62 + 300 * z, t }); ctx.restore(); }
    const dr = 1 - ramp(t, q.at('Draai') - 0.1, 1.8); const seq = 'ATGCATTGCAGT';
    dnaLadderHelix(ctx, 300, 330, 120, seq, { draai: dr, R: lerp(70, 115, 1 - dr), s: 0.55, a: z, fase: t * 0.3 * dr });
    naamBij(ctx, 'twee strengen', null, 1660, 230, ramp(t, q.at('strengen'), 0.5), 'right');
    const nl = ramp(t, q.at('nucleotiden') - 0.4, 0.8); for (let i = 0; i < 12; i++) kader(ctx, 300 + i * 120 - 34, 160, 68, 140, nl * ramp(t, q.at('nucleotiden') - 0.4 + i * 0.06, 0.2), C.goud, 2, 10);
    term(ctx, 'nucleotiden', 960, 760, nl, 'center'); chSchaal(ctx, 120, '1 nanometer · vereenvoudigd'); },
  s09(ctx, t, q) { chMicro(ctx); const seq = 'ATGCATTGCA', x0 = 380, dx = 130;
    const ex = ramp(t, q.at('drie') - 0.2, 1.0) * (1 - ramp(t, q.at('rug') - 0.4, 0.8));
    ctx.save(); ctx.globalAlpha *= lerp(1, 0.3, ex); const L = stukLadder(ctx, x0, 160, dx, seq, { s: 0.55, rugHl: 0.5 * ramp(t, q.at('rug') - 0.2, 0.5) * (1 - ramp(t, q.at('naar') - 0.2, 0.5)) }); ctx.restore();
    // de G op plek 3 komt naar voren en valt uit elkaar
    const p = nucleotideRing(ctx, lerp(x0 + 3 * dx, 860, ex), lerp(170, 560, ex), 'G', { s: lerp(0.6, 1.7, ex), explode: ex, a: Math.max(ex, 0.001) > 0.01 ? 1 : 0 });
    if (ex > 0.5) { naamBij(ctx, 'fosfaatgroep', null, p.p[0] - 40, p.p[1] - 46, ramp(t, q.at('fosfaatgroep'), 0.4) * ex, 'center');
      naamBij(ctx, 'desoxyribose', 'suiker', p.su[0] + 70, p.su[1] - 30, ramp(t, q.at('desoxyribose') - 0.3, 0.4) * ex, 'left');
      naamBij(ctx, 'stikstofbase', null, p.b[0] + 70, p.b[1] + 20, ramp(t, q.at('stikstofbase') - 0.3, 0.4) * ex, 'left'); }
    if (ex < 0.5 && t > q.at('rug')) { naamBij(ctx, 'rug', 'fosfaat + suiker', x0 - 40, 120, ramp(t, q.at('rug') - 0.2, 0.5), 'left'); kader(ctx, x0 + 5 * dx - 34, 168, 68, 70, ramp(t, q.at('naar') - 0.1, 0.5) * (1 - ramp(t, q.at('vier') - 0.3, 0.4))); naamBij(ctx, 'de base steekt naar binnen', null, 960, 470, ramp(t, q.at('naar') - 0.1, 0.5) * (1 - ramp(t, q.at('vier') - 0.3, 0.4)), 'left'); }
    // vier basen: groot (2 ringen) en klein (1 ring), zonder het al te zeggen
    const v = ramp(t, q.at('vier') - 0.2, 0.5); if (v > 0.01) { dimLaag(ctx, v * 0.7); const names = [['A', 'adenine', 'adenine'], ['T', 'thymine', 'thymine'], ['C', 'cytosine', 'cytosine'], ['G', 'guanine', 'guanine']];
      names.forEach(([b, n, cue], i) => { const a = ramp(t, q.at(cue) - 0.2, 0.4); baseRing(ctx, 520 + i * 300, 330, b, 1, { s: 1.2, a }); term(ctx, n, 520 + i * 300, 560, a, 'center', 40); }); }
    chSchaal(ctx, 130, '1 nanometer · vergroot'); },
  s10(ctx, t, q) { chMicro(ctx); // KERNSCÈNE · pastest tegenover A, met de ringvorm (besluit Kamiel t2/t3)
    const s = 1.15, x = 960, y0 = 190, span = 112 * s + 72 * s + 16 * s + 10, yb = y0 + span;
    const intro = 1 - ramp(t, q.at('Kijk') - 0.4, 0.6);
    if (intro > 0.01) { ctx.save(); ctx.globalAlpha *= intro; [['A', 'G', 'groot · twee ringen'], ['T', 'C', 'klein · één ring']].forEach(([a, b, lab], k) => { const a1 = ramp(t, k ? 0.6 : 0.2, 0.5); const hlA = ramp(t, q.at(k ? 'klein' : 'groot') - 0.3, 0.4);
        baseRing(ctx, 500 + k * 820, 240, a, 1, { s: 1.6, a: a1 }); baseRing(ctx, 700 + k * 820, 240, b, 1, { s: 1.6, a: a1 }); ctx.save(); ctx.globalAlpha *= hlA; metaText(ctx, lab, 600 + k * 820, 560, C.grain, 'center', 30); ctx.restore(); }); term(ctx, 'tegenover elke base staat een base', 960, 720, ramp(t, 0.3, 0.5) * (1 - ramp(t, q.at('groot') - 0.5, 0.4)), 'center', 40); ctx.restore(); }
    const st = 1 - intro; if (st < 0.01) return chSchaal(ctx, 120, '1 nanometer · model');
    ctx.save(); ctx.globalAlpha *= st;
    const rug = (yy, al = 1) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 520, yy); ctx.lineTo(x + 520, yy); ctx.stroke(); ctx.strokeStyle = DNA_BASE.rug; ctx.lineWidth = 9; ctx.stroke(); ctx.restore(); };
    rug(y0); rug(yb); baseRing(ctx, x, y0 + 8, 'A', 1, { s, plekA: 1, bindA: t > q.at('wel') ? 1 : 0 });
    // de buren links en rechts staan gedimd, voor context
    [['G', -260], ['T', 260]].forEach(([b, dxx]) => { ctx.save(); ctx.globalAlpha *= 0.35; baseRing(ctx, x + dxx, y0 + 8, b, 1, { s }); baseRing(ctx, x + dxx, yb - 8, DNA_BASE.comp[b], -1, { s }); ctx.restore(); });
    // drie kandidaten na elkaar: één molecuul volgen (gouden rand), in een boog aanschuiven, met anticipatie
    const fase = (cue, dur) => { const t0 = q.at(cue); return [ramp(t, t0 - 0.4, 0.9), ramp(t, t0 + dur, 0.8)]; };
    const kand = [['G', 'tegenover', 2.6, 'samen te breed'], ['C', 'goede', 3.6, 'plekken passen niet'], ['T', 'wel', 99, 'past']];
    const tG = q.at('tegenover', 2), tC = q.at('tegenover', 3), tT = q.at('past', 2);
    [[kand[0], tG, q.at('past') + 0.6], [kand[1], tC, q.at('elkaar.') + 0.3], [kand[2], tT - 0.3, 1e9]].forEach(([[b, , , uit], tin, tout], i) => {
      const inn = ramp(t, tin - 0.3, 0.9), out = ramp(t, tout, 0.8); if (inn < 0.01 || out > 0.99) return;
      const len = (DNA_BASE.purine[b] ? 112 : 72) * s, dok = yb - 8; // aanhechting
      const overl = DNA_BASE.purine[b] ? 40 : 0, yy = lerp(dok + 260, dok + overl, inn) + out * 300, xx = x + Math.sin((1 - inn) * 1.4) * 220 * (1 - inn) - out * 200;
      baseRing(ctx, xx + (b === 'C' ? 18 * inn : 0), yy, b, -1, { s, plekA: 1, bindA: b === 'T' && inn > 0.98 ? 1 : 0, rand: C.goud });
      if (inn > 0.95) { if (b === 'G') { ctx.save(); ctx.fillStyle = rgba(C.koraal, 0.4 * (1 - out)); ctx.beginPath(); ctx.ellipse(x, y0 + 8 + 112 * s + 10, 50, 22, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
        term(ctx, 'A – ' + b, x, 600, 1 - out, 'center', 44); term(ctx, uit, x, 660, 1 - out, 'center', 36, b === 'T' ? C.groen : C.koraal); } });
    if (t > tT + 0.6) baseBruggen(ctx, x, y0 + 8 + 112 * s, yb - 8 - 72 * s, 'A', s, ramp(t, tT + 0.6, 0.4));
    if (t > q.at('Daarom') - 0.2) { const a = ramp(t, q.at('Daarom') - 0.2, 0.5); term(ctx, 'A – T  ·  C – G', 960, 760, a, 'center', 52); term(ctx, 'basenparing', 960, 820, ramp(t, q.at('basenparing') - 0.2, 0.4), 'center', 44, C.goud); }
    metaText(ctx, 'model', x - 520, 150, C.grain, 'left', 26); ctx.restore(); chSchaal(ctx, 120, '1 nanometer · model'); },
  s11(ctx, t, q) { chMicro(ctx); const dr = ramp(t, q.at('draait') - 0.3, 2.6);
    const G = dnaLadderHelix(ctx, 200, 450, 100, 'ATTGCAGTCCATGACG', { draai: dr, R: lerp(115, 120, dr), s: 0.55, fase: t * 0.3 * dr });
    term(ctx, 'dubbelstrengs DNA', 960, 150, ramp(t, q.at('dubbelstrengs') - 0.2, 0.5) * (1 - dr), 'center');
    naamBij(ctx, 'helixstructuur', 'rechtsdraaiend', 960, 150, ramp(t, q.at('helixstructuur') - 0.3, 0.5), 'center');
    if (dr > 0.95) { naamBij(ctx, 'kleine groef', null, G.klein(1), G.top - 26, ramp(t, q.at('helixstructuur'), 0.5), 'center'); naamBij(ctx, 'grote groef', null, G.groot(1), G.top - 26, ramp(t, q.at('helixstructuur'), 0.5), 'center'); }
    chSchaal(ctx, 100, '1 nanometer · vereenvoudigd'); },
  s12(ctx, t, q) { chMicro(ctx); stukLadder(ctx, 560, 300, 200, 'ATTGC', { s: 1, pa: () => 0 }); metaText(ctx, 'gegeven streng', 400, 250, C.grain, 'left', 28); },
  s14(ctx, t, q) { chMicro(ctx); const seq = 'ATTGC', t0 = 0.1;
    stukLadder(ctx, 560, 230, 200, seq, { s: 1, pa: (i) => ramp(t, t0 + i * 0.35, 0.5), sep: 0.35 * ramp(t, q.at('kopieert') - 0.4, 0.8) });
    term(ctx, 'ken je één streng, dan ken je de andere', 960, 780, ramp(t, q.at('Ken') - 0.2, 0.5), 'center', 44);
    if (t > q.at('kopieert') - 0.4) metaText(ctx, 'dna kopiëren · aflevering twee', 1200, 830, C.grain, 'center', 28); chSchaal(ctx, 120, '1 nanometer · vergroot'); },
  s15(ctx, t, q) { const pl = ramp(t, q.at('plant') - 0.3, 0.5);
    if (pl < 0.99) { chMicro(ctx); ctx.save(); ctx.globalAlpha *= 1 - pl; const p = nucleotideRing(ctx, 760, 440, 'G', { s: 1.7, explode: 1 });
      const fp = ramp(t, q.at('fosfor') - 0.2, 0.4), fn = ramp(t, q.at('stikstof') - 0.2, 0.4); ring(ctx, p.p[0], p.p[1], 50, fp); naamBij(ctx, 'P = fosfor', 'in het fosfaat', p.p[0] - 60, p.p[1] - 90, fp, 'center');
      kader(ctx, p.b[0] - 60, p.b[1] - 110, 120, 200, fn); naamBij(ctx, 'N = stikstof', 'in de ringen van de base', p.b[0] + 80, p.b[1] - 10, fn, 'left'); ctx.restore(); }
    if (pl > 0.01) { ctx.save(); ctx.globalAlpha *= pl; chSchema(ctx); plantje(ctx, 760, 560, 1.2, 1, t, ramp(t, q.at('fosfaat', 2) - 0.3, 0.6));
      naamBij(ctx, 'fosfaat en nitraat', 'uit de bodem', 1240, 700, ramp(t, q.at('fosfaat', 2) - 0.2, 0.5), 'left', C.oker); ctx.restore(); } },

  // ---------------- Hoofdstuk 3 — Van volgorde tot gen tot genoom (Schema)
  s16(ctx, t, q) { chSchema(ctx); const R = (k) => 'ATCG'[Math.floor(hash(k * 7.7 + 3) * 4)], n = 36, x0 = 130, dx = 46;
    const seqJ = [...Array(n)].map((_, i) => R(i)), diff = (i) => i % 9 === 4; const seqN = seqJ.map((b, i) => diff(i) ? 'ATCG'[('ATCG'.indexOf(b) + 2) % 4] : b);
    const show = Math.floor(n * ramp(t, 0.2, 1.4)); for (let i = 0; i < show; i++) tegel(ctx, x0 + i * dx, 200, seqJ[i]);
    metaText(ctx, 'vier letters: a · t · c · g', x0, 300, C.grain, 'left', 28);
    const nr = ramp(t, q.at('Toch') - 0.2, 0.5); if (nr > 0.01) { for (let i = 0; i < n; i++) tegel(ctx, x0 + i * dx, 350, seqN[i], { a: nr, rand: diff(i) && t > q.at('volgorde.') - 0.3 ? C.goud : null }); metaText(ctx, 'jij', x0 - 20, 240, C.text2, 'right', 28); metaText(ctx, 'noor', x0 - 20, 390, C.text2, 'right', 28); metaText(ctx, 'vergroot · echt ± 1 verschil op de 1000 basen', x0 + 36 * dx, 445, C.grain, 'right', 26); }
    term(ctx, 'het verschil zit in de volgorde', x0, 490, ramp(t, q.at('volgorde.') - 0.2, 0.5) * (1 - ramp(t, q.at('nucleotidenvolgorde') - 0.4, 0.3)), 'left', 44);
    term(ctx, 'nucleotidenvolgorde · DNA-sequentie', x0, 490, ramp(t, q.at('nucleotidenvolgorde') - 0.2, 0.5), 'left', 44);
    const mi = ramp(t, q.at('miljard') - 0.6, 1.0); if (mi > 0.01) { const N = Math.floor(3100000000 * mi); term(ctx, N.toLocaleString('nl-NL') + ' basenparen', x0, 620, 1, 'left', 48); metaText(ctx, 'in één set van 23 chromosomen', x0, 668, C.grain, 'left', 28);
      ctx.save(); ctx.fillStyle = C.paars; roundRect(ctx, x0, 700, 760, 28, 8); ctx.fill(); const s2 = ramp(t, q.at('sets') - 0.4, 0.6); if (s2 > 0.01) { ctx.globalAlpha *= s2; roundRect(ctx, x0, 740, 760, 28, 8); ctx.fill(); } ctx.restore();
      metaText(ctx, 'set van vader · set van moeder', x0 + 790, 760, C.text2, 'left', 26); } },
  s17(ctx, t, q) { chSchema(ctx); // één groeiend schema: nucleotide → gen → chromosoom → genoom
    const R = (k) => 'ATCG'[Math.floor(hash(k * 7.7 + 3) * 4)]; for (let i = 0; i < 36; i++) tegel(ctx, 130 + i * 46, 160, R(i), { a: 0.85 });
    const g = ramp(t, q.at('gen.') - 0.4, 0.5); kader(ctx, 130 + 9 * 46 - 6, 150, 14 * 46 + 4, 80, g); term(ctx, 'gen', 130 + 16 * 46, 135, g, 'center', 44, C.goud); metaText(ctx, 'informatie voor één eiwit', 130 + 16 * 46, 270, C.grain, 'center', 28);
    if (t > q.at('drie.') - 1.5) metaText(ctx, 'van gen naar eiwit · aflevering drie', 130, 310, C.text2, 'left', 26);
    const ge = ramp(t, q.at('genoom.') - 0.5, 0.6); if (ge > 0.01) { ctx.save(); ctx.globalAlpha *= ge; for (let i = 0; i < 46; i++) { const nr = Math.floor(i / 2), L = 30 + 110 * CHROM_MB[Math.min(nr, 22)] / 249; chromatideX(ctx, 180 + (i % 23) * 70, 470 + Math.floor(i / 23) * 170, L, 0, { w: 14 }); }
      kader(ctx, 130, 380, 1640, 330, 1, C.paars, 2); term(ctx, 'genoom', 1760, 368, 1, 'right', 44); metaText(ctx, 'alle dna in een cel · vlak voor de deling', 1300, 368, C.grain, 'right', 26); ctx.restore(); }
    const kl = ramp(t, q.at('klein') - 0.2, 0.4); if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; chSchema(ctx); ctx.restore(); const st = ['nucleotide', 'gen', 'chromosoom', 'genoom'], cues = [['nucleotide', 1], ['gen', 3], ['chromosoom', 1], ['genoom', 2]];
      st.forEach((s, i) => { const a = ramp(t, q.at(cues[i][0], cues[i][1]) - 0.3, 0.4); term(ctx, s, 260 + i * 460, 520, a, 'center', 48); if (i) { ctx.save(); ctx.globalAlpha *= a; pijl(ctx, 260 + (i - 1) * 460 + 150, 505, 260 + i * 460 - 150, 505, C.line, 1, 3, 14); ctx.restore(); } }); } },
  s18(ctx, t, q) { chSchema(ctx); for (let i = 0; i < 100; i++) roundRect(ctx, 210 + (i % 25) * 60, 260 + Math.floor(i / 25) * 80, 50, 64, 6), shape(ctx, C.fill, rgba(C.line, 0.4), 1); metaText(ctx, '100 blokjes = al je dna', 210, 620, C.grain, 'left', 28); },
  s20(ctx, t, q) { chSchema(ctx); const c = ramp(t, 0.1, 0.6);
    for (let i = 0; i < 100; i++) { const x = 210 + (i % 25) * 60, y = 260 + Math.floor(i / 25) * 80; const isC = i === 0, reg = i >= 1 && i <= 8, ver = i >= 40 && i <= 52;
      const kl = isC ? C.goud : (reg && t > q.at('regelt') - 0.2 ? C.groen : (ver && t > q.at('verschilt') - 0.2 ? '#B0B8C6' : C.fill));
      roundRect(ctx, x, y, 50, 64, 6); shape(ctx, kl, rgba(C.line, 0.4), 1); if (isC) { ctx.save(); ctx.fillStyle = C.fill; ctx.fillRect(x + 25, y + 1, 24, 62); ctx.restore(); } }
    term(ctx, 'coderend DNA · minder dan 2 %', 210, 210, c, 'left', 44, C.goud); metaText(ctx, 'coderend op schaal: ± anderhalf blokje · groen en grijs niet op schaal', 210, 640, C.grain, 'left', 26);
    term(ctx, 'niet-coderend DNA', 1710, 210, ramp(t, q.at('niet-coderend') - 0.3, 0.5), 'right', 44);
    naamBij(ctx, 'regelt genen aan en uit', 'aflevering zes', 1720, 720, ramp(t, q.at('regelt') - 0.2, 0.5), 'right', C.groen);
    naamBij(ctx, 'verschilt sterk tussen mensen', 'dna-profiel · aflevering zeven', 1720, 800, ramp(t, q.at('verschilt') - 0.2, 0.5), 'right', C.text); },
  s21(ctx, t, q) { chMicro(ctx); // één kern (eigen tekening, geen celRond-kern), mitochondriën met ring-DNA; plantencelletje met bladgroenkorrel; bacterie met paars ring-chromosoom en plasmiden
    const cx = 520, cy = 450, r = 290; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.55); ctx.fill(); ctx.restore(); membraanBoog(ctx, cx, cy, r - 7, 0, 6.283, { s: 0.7 });
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx + 20, cy - 20, 95, 88, 0, 0, 6.283); shape(ctx, rgba(C.kern, 0.5), C.kernR, 1.5); ctx.restore();
    naamBij(ctx, 'kern', 'bijna al het dna', cx + 20, cy - 10, ramp(t, q.at('kern.') - 0.3, 0.5), 'center');
    const mi = ramp(t, q.at('Mitochondri') - 0.2, 0.5); [[390, 610, 0.5], [660, 620, -0.4], [330, 380, 1.3]].forEach(([x, y, rr]) => { mitochondrion(ctx, x, y, 84, rr, 1, 5, t); if (mi > 0.01) { ctx.save(); ctx.globalAlpha *= mi; plasmideRing(ctx, x, y, 11, { gen: false }); ctx.restore(); } });
    naamBij(ctx, 'mitochondrium', 'eigen ringvormig dna', 520, 700, mi, 'center');
    const bl = ramp(t, q.at('Bladgroen') - 0.2, 0.5); if (bl > 0.01) { ctx.save(); ctx.globalAlpha *= bl; roundRect(ctx, 1020, 120, 300, 220, 30); shape(ctx, rgba('#2A3448', 0.55), C.groen, 6); chloroplast(ctx, 1170, 230, 130, 1, 0.2); plasmideRing(ctx, 1170, 230, 12, { gen: false }); ctx.restore(); naamBij(ctx, 'bladgroenkorrel', 'plantencel · ook eigen dna', 1170, 380, bl, 'center'); }
    const ba = ramp(t, q.at('bacterie') - 0.2, 0.5); if (ba > 0.01) { ctx.save(); ctx.globalAlpha *= ba; const bx = 1520, by = 600; roundRect(ctx, bx - 250, by - 110, 500, 220, 110); shape(ctx, rgba(C.teal, 0.12), C.teal, 6);
      ctx.save(); roundRect(ctx, bx - 238, by - 98, 476, 196, 98); ctx.clip(); ctx.save(); ctx.translate(bx - 40, by); ctx.scale(1.5, 1); plasmideRing(ctx, 0, 0, 62, { gen: false, seed: 5 }); ctx.restore();
      const pl = ramp(t, q.at('plasmiden') - 0.3, 0.5); [[bx + 150, by - 40], [bx + 160, by + 45], [bx - 190, by + 30]].forEach(([x, y], k) => plasmideRing(ctx, x, y, 18, { gen: false, a: 0.35 + 0.65 * pl, seed: k + 1 })); ctx.restore(); ctx.restore();
      naamBij(ctx, 'bacterie', 'geen kern · niet op schaal', bx, by - 140, ba, 'center'); naamBij(ctx, 'plasmiden', 'losse dna-ringetjes', bx + 120, by + 160, ramp(t, q.at('plasmiden') - 0.3, 0.5), 'center'); naamBij(ctx, 'ringvormig chromosoom', null, bx - 60, by + 160, ramp(t, q.at('ring,') - 0.3, 0.5), 'right'); } },

  // ---------------- Hoofdstuk 4 — Richting, bruggen en verpakking (vwo)
  s22(ctx, t, q) { chMicro(ctx); const seq = 'ATGCA', x0 = 330, dx = 200;
    const L = stukLadder(ctx, x0, 210, dx, seq, { s: 0.8 });
    const su = ramp(t, q.at('suiker') - 0.3, 0.5) * (1 - ramp(t, q.at('loopt') - 1.2, 0.5));
    if (su > 0.01) { dimLaag(ctx, su * 0.6); ctx.save(); ctx.globalAlpha *= su; nucleotideRing(ctx, 1520, 420, 'A', { s: 1.8, explode: 0.55, oh: ramp(t, q.at('OH-groep') - 0.3, 0.4), nummers: ramp(t, q.at('nummers') - 0.3, 0.5), hl: t > q.at('derde') ? "3'" : (t > q.at('vijfde') ? "5'" : null) }); ctx.restore();
      if (t > q.at('vijfde')) metaText(ctx, "5' → vrije fosfaatgroep", 1300, 720, C.goud, 'left', 28); if (t > q.at('derde')) metaText(ctx, "3' → vrije oh-groep", 1300, 770, C.goud, 'left', 28); }
    const r = ramp(t, q.at('loopt') - 0.6, 0.5); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r;
      term(ctx, "5'", x0 - 130, L.yT + 14, 1, 'right', 40); term(ctx, "3'", x0 + 5 * dx - 70, L.yT + 14, 1, 'left', 40); term(ctx, "3'", x0 - 130, L.yB + 14, 1, 'right', 40); term(ctx, "5'", x0 + 5 * dx - 70, L.yB + 14, 1, 'left', 40);
      const p1 = ramp(t, q.at('loopt') - 0.2, 1), p2 = ramp(t, q.at('ernaast') - 0.2, 1); pijl(ctx, x0 - 90, L.yT - 60, x0 - 90 + 5 * dx * p1, L.yT - 60, C.goud, 1, 4, 16); pijl(ctx, x0 + 5 * dx - 110, L.yB + 70, x0 + 5 * dx - 110 - 5 * dx * p2, L.yB + 70, C.goud, 1, 4, 16); ctx.restore(); }
    term(ctx, 'antiparallel', x0 - 90, 720, ramp(t, q.at('antiparallel') - 0.3, 0.5), 'left', 48);
    if (t > q.at('schrijf') - 0.3) metaText(ctx, "een volgorde schrijf je op van 5' naar 3'", x0 - 90, 772, C.goud, 'left', 28);
    chSchaal(ctx, 120, '1 nanometer · vereenvoudigd'); },
  s23(ctx, t, q) { chMicro(ctx); const seq = 'ATGCA', x0 = 330, dx = 200;
    const heat = ramp(t, q.at('Verwarm') - 0.2, 2.2), cool = ramp(t, q.at('Koel') - 0.2, 1.8), sep = heat * (1 - cool);
    const L = stukLadder(ctx, x0, 210, dx, seq, { s: 0.8, sep, bruggenA: ramp(t, q.at('waterstofbruggen') - 0.3, 0.5) });
    naamBij(ctx, 'waterstofbruggen', 'zwak', x0 + 2 * dx, 560, ramp(t, q.at('waterstofbruggen') - 0.3, 0.5) * (1 - heat), 'center');
    if (t > q.at('twee.') - 0.5 && heat < 0.2) seq.split('').forEach((b, i) => term(ctx, String(DNA_BASE.plek[b].length), x0 + i * dx + 50, 400, ramp(t, q.at(b === 'A' || b === 'T' ? 'twee.' : 'drie.') - 0.4, 0.4), 'left', 40, C.goud));
    thermo(ctx, 1700, 180, 460, lerp(0.15, 0.95, heat) - 0.8 * cool, ramp(t, q.at('Verwarm') - 0.4, 0.4), heat > 0.5 && cool < 0.5 ? '± 95 °C' : null);
    if (t > q.at('passende') - 0.3) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('passende') - 0.3, 0.5) * (1 - ramp(t, q.at('plakken'), 1)); stukLadder(ctx, 1280, 720, 70, 'GGA', { s: 0.3, pa: () => 0 }); ctx.restore(); metaText(ctx, 'past niet · glijdt weg', 1300, 690, C.koraal, 'left', 24); }
    chSchaal(ctx, 120, '1 nanometer · vereenvoudigd'); },
  s24(ctx, t, q) { chMicro(ctx); stukLadder(ctx, 260, 110, 170, 'GCGCGC', { s: 0.62 }); stukLadder(ctx, 260, 480, 170, 'ATATAT', { s: 0.62 }); thermo(ctx, 1700, 180, 460, 0.2); },
  s26(ctx, t, q) { chMicro(ctx); const heat = ramp(t, 0, 2.5);
    stukLadder(ctx, 260, 120, 170, 'ATATAT', { s: 0.62, sep: heat }); stukLadder(ctx, 260, 500, 170, 'GCGCGC', { s: 0.62, sep: 0 });
    metaText(ctx, 'veel a en t · laat los', 1230, 230, C.goud, 'left', 26); metaText(ctx, 'veel c en g · dicht', 1230, 610, C.text2, 'left', 26); if (t > q.at('bruggen') - 0.3 && t < q.at('Dit') + 0.3) { metaText(ctx, 'twee bruggen per paar', 1230, 270, C.goud, 'left', 24); metaText(ctx, 'drie bruggen per paar', 1230, 650, C.text2, 'left', 24); }
    thermo(ctx, 1760, 180, 460, lerp(0.2, 0.7, heat), 1, 'warmer');
    term(ctx, 'hybridisatie', 1180, 740, ramp(t, q.at('hybridisatie') - 0.3, 0.5), 'left', 48); if (t > q.at('PCR') - 0.3) metaText(ctx, 'pcr · aflevering zeven', 1180, 786, C.grain, 'left', 28);
    chMeta(ctx, 'simulatie · model', 1, 1640); },
  s27(ctx, t, q) { chMicro(ctx); const ch = ramp(t, q.at('celdeling') - 0.3, 2.2);
    if (ch < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ch; const op = ramp(t, q.at('kralenketting') - 0.2, 2.0);
      nucleosoomDraad(ctx, 200, 450, 1720, 420, { n: 5, R: 80, t, a: 1 - ramp(op, 0, 0.35) }); if (op > 0.01) kralenVouw(ctx, 960, 440, 1300, ramp(op, 0.25, 0.75), { n: 16, R: 34, a: ramp(op, 0, 0.35) });
      naamBij(ctx, 'histonen', 'eiwitten', 360, 620, ramp(t, q.at('histonen') - 0.3, 0.5) * (1 - ramp(op, 0, 0.3)), 'center');
      ring(ctx, 360 + 30 * op, 450, 130, ramp(t, q.at('nucleosoom') - 0.3, 0.4) * (1 - op)); term(ctx, 'nucleosoom', 960, 720, ramp(t, q.at('nucleosoom') - 0.3, 0.5) * (1 - op), 'center');
      { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('nucleosoom') - 0.3, 0.5) * (1 - op); metaText(ctx, 'acht histonen met dna eromheen', 960, 770, C.grain, 'center', 28); ctx.restore(); } term(ctx, 'chromatine', 960, 720, ramp(t, q.at('chromatine') - 0.3, 0.5), 'center'); ctx.restore(); }
    if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch; kernChromatine(ctx, KERN.cx, KERN.cy, KERN.r, { c: ramp(t, q.at('strak') - 0.3, 2.2), seed: KERN.seed, membraan: 1 - 0.5 * ramp(t, q.at('strak'), 2) }); ctx.restore();
      naamBij(ctx, 'chromosomen als staafjes', 'vlak voor de deling', 1420, 300, ramp(t, q.at('staafjes') - 0.4, 0.5), 'left'); }
    chSchaal(ctx, ch > 0.5 ? 253 : 120, ch > 0.5 ? '2 micrometer' : '10 nanometer'); },

  // ---------------- Samenvatting — Terug naar het buisje
  s28(ctx, t, q) { const steps = [['buisje', 0], ['meter', 1], ['nucleotiden', 2], ['paren', 3], ['informatie', 4], ['genoom', 5], ['kopieert', 6]];
    let k = 0; steps.forEach(([w, i]) => { if (t > q.at(w) - 0.3) k = i; });
    if (k === 0) { lokaal(ctx); persoon(ctx, 'noor', 520, VLOER, 640, { outfit: 'practicum', pose: 'vasthouden', uit: 'blij', t, kijk: 1 }); dimLaag(ctx, 0.5); ctx.save(); ctx.translate(1180, 667); ctx.scale(1.9, 1.9); buisje(ctx, 0, 0, 230, { t }); ctx.restore(); }
    else if (k === 1) { chMicro(ctx); kernChromatine(ctx, 700, 450, 330, { c: 0, seed: KERN.seed }); zoomCircle(ctx, 1420, 430, 280, 790, 360, null, 1, () => { chMicro(ctx); nucleosoomDraad(ctx, 1170, 470, 1690, 400, { n: 3, R: 52, t }); }); }
    else if (k === 2 || k === 3) { chMicro(ctx); stukLadder(ctx, 420, 230, 180, 'ATGCAT', { s: 0.85 }); if (k === 3) term(ctx, 'A – T  ·  C – G', 960, 770, ramp(t, q.at('paren') - 0.2, 0.5), 'center', 52); }
    else if (k === 4 || k === 5) { chSchema(ctx); const R = (j) => 'ATCG'[Math.floor(hash(j * 7.7 + 3) * 4)]; for (let i = 0; i < 36; i++) { tegel(ctx, 130 + i * 46, 260, R(i)); tegel(ctx, 130 + i * 46, 360, i % 9 === 4 ? 'ATCG'[('ATCG'.indexOf(R(i)) + 2) % 4] : R(i), { rand: i % 9 === 4 ? C.goud : null }); }
      metaText(ctx, 'jij', 110, 300, C.text2, 'right', 28); metaText(ctx, 'noor', 110, 400, C.text2, 'right', 28); metaText(ctx, 'vergroot · echt ± 1 verschil op de 1000 basen', 1786, 450, C.grain, 'right', 26); kader(ctx, 130 + 9 * 46 - 6, 250, 14 * 46 + 4, 80, ramp(t, q.at('gen') - 0.2, 0.4)); if (k === 5) term(ctx, 'genoom', 960, 620, ramp(t, q.at('genoom') - 0.2, 0.4), 'center'); }
    else { chMicro(ctx); dnaLadderHelix(ctx, 360, 450, 100, 'ATGCATTGCAGT', { draai: 1, R: 110, s: 0.55, fase: t * 0.4 }); metaText(ctx, 'volgende: dna kopiëren', 960, 760, C.grain, 'center', 30); } },
});
