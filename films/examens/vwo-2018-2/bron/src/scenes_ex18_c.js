// Examenbespreking vwo 2018-II · s44–s64 (Grootvader en kleinkind, vragen 16–26) — helper c
const c_ZWART = ['IV-2', 'IV-4', 'IV-9'];
const c_STAM = { ox: 110, oy: 190, sx: 1.5, sy: 1.36 };
function c_pts(...ids) { let out = []; for (let i = 1; i < ids.length; i++) { const p = c_pad(ids[i - 1], ids[i]); out = out.concat(i > 1 ? p.slice(1) : p); } return out; }
function c_tag(ctx, s, x, y, col, a = 1, px = 26) { tag(ctx, s, x, y, col, a, 'left', px); }

Object.assign(SCENES, {
  s44(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const kl = q.on('kleinkinderen', 1, 0.3), xch = q.on('X-chromosoom', 1, 0.8), her = q.on('herhalingen', 1, 0.8);
    c_henk(ctx, 330, 860, 470, { t, beef: q.on('bevingen', 1, 0.8), uit: q.at('denkvermogen') < t ? 'verbaasd' : 'neutraal', kijk: 1, a: q.on('Grootvaders', 1, 0.3) });
    naamBij(ctx, 'FXTAS', 'grootvader · vanaf 50 jaar', 330, 330, q.on('FXTAS', 1), 'center', C.goud);
    persoon(ctx, 'kind', 1590, 860, 300, { t, a: kl, uit: 'blij', kijk: -1 });
    naamBij(ctx, 'FXS', 'kleinkind · fragiele-X-syndroom', 1590, 500, q.on('FXS', 1), 'center', C.koraal);
    // X-chromosoom met fragiele plek
    c_chromosoom(ctx, 960, 330, 0.62, { bl: 1, br: 1 }, { a: xch, fragiel: q.on('mutatie', 1, 0.8) });
    naamBij(ctx, 'X-chromosoom', null, 960, 160, xch, 'center');
    naamBij(ctx, 'FMR1-gen', null, 1060, 470, q.on('FMR1-gen', 1), 'left', C.goud);
    // CGG-herhalingen groeien aan het begin van het gen
    if (her > 0.01) { ctx.save(); ctx.globalAlpha *= her; const n = Math.round(lerp(3, 9, q.on('CGG', 1, 2.5))); const bx = 960 - 4.5 * 78;
      roundRect(ctx, bx - 20, 620, 9 * 78 + 40, 70, 20); shape(ctx, rgba(EX.papier, 0.85), EX.papierR, 2);
      for (let i = 0; i < n; i++) { roundRect(ctx, bx + i * 78 + 4, 634, 70, 42, 10); shape(ctx, rgba(C.goud, 0.25), C.goud, 2); text(ctx, 'CGG', bx + i * 78 + 39, 664, fMeta(22), C.text, 'center'); }
      naamBij(ctx, 'begin van het FMR1-gen', null, 960, 740, 1, 'center', C.text2); ctx.restore(); }
  },

  s45(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 16, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'waardoor +2 nucleotiden vaak erger is dan +3', 70, 170, 1000, q.on('Vraag', 1, 0.4));
    const a2 = q.on('twee', 2, 0.5), a3 = q.on('drie', 1, 0.5);
    text(ctx, 'CGG CGG CGG', 1180, 260, fMeta(34), C.text, 'left');
    regel(ctx, '+ CG', 1180, 360, a2, C.koraal, 44, 'left', 800); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; text(ctx, 'twee nucleotiden', 1330, 360, fTekst(30, 500), C.text2, 'left'); ctx.restore(); }
    regel(ctx, '+ CGG', 1180, 460, a3, C.goud, 44, 'left', 800); if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; text(ctx, 'drie nucleotiden', 1360, 460, fTekst(30, 500), C.text2, 'left'); ctx.restore(); }
    vraagteken(ctx, 1600, 690, q.on('waardoor', 1, 0.5), 140);
  },

  s46(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 16, 2, 1);
    const ant = q.on('antwoord', 1, 0.8), x0 = 420;
    const r1 = 1 - ant, r2 = 1 - ant;
    // rij 1: normaal
    c_leesrij(ctx, x0, 230, 'AUGGCAUUCGGACUCAAG', ['g', 'g', 'g', 'g', 'g', 'g'], { a: q.on('ribosoom', 1, 0.5) * r1, lees: q.on('leest', 1, 5), rib: 1, t, label: 'normaal', seed: 1 });
    // rij 2: + 3
    c_leesrij(ctx, x0, 430, 'AUGGCAcggUUCGGACUCAAG', ['g', 'g', 'x', 'g', 'g', 'g', 'g'], { a: q.on('Komen', 1, 0.5) * r2, ins: q.on('drie', 2, 1), lees: q.on('codon', 2, 3), rib: 1, t, label: '+ 3', labelCol: C.goud, seed: 2 });
    if (r2 > 0.01) { naamBij(ctx, 'één aminozuur erbij', null, x0 + 7 * 34 + 10, 590, q.on('aminozuur', 1) * r2 * (1 - q.on('Komen', 2, 0.4)), 'center', C.goud); naamBij(ctx, 'de rest blijft gelijk', null, x0 + 21 * 34 + 40, 530, q.on('rest', 1) * r2 * (1 - q.on('Komen', 2, 0.4)), 'left', C.teal); }
    // rij 3: + 2 (schuift omhoog bij het antwoord)
    const y3 = lerp(630, 250, ant);
    c_leesrij(ctx, x0, y3, 'AUGGCAcgUUCGGACUCAAG', ['g', 'g', 'a', 'a', 'a', 'a'], { a: q.on('Komen', 2, 0.5), ins: q.on('twee', 1, 1), lees: q.on('schuift', 1, 3), rib: 1, rood: q.on('anders', 1, 0.6), t, label: '+ 2', labelCol: C.koraal, seed: 3 });
    naamBij(ctx, 'leesraam verschoven', null, x0 + 20 * 34 + 50, y3 + 96, q.on('anders', 1) * (1 - ant), 'left', C.koraal);
    punten(ctx, [{ t: 'Het leesraam verschuift: er ontstaan andere codons', v: q.on('verschuift', 1, 0.4) },
      { t: 'Andere aminozuren, dus een ander (mogelijk niet werkend) eiwit', a: q.on('Daardoor', 1, 0.5), v: q.on('eiwit', 1, 0.4) }], 260, 470, 1400, ant);
  },

  s47(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('Hoe', 1, 0.5); examenKader(ctx, 150, 140, 1620, 735, 'AFBEELDING 1', ka); if (ka < 0.01) return;
    ctx.save(); ctx.globalAlpha *= ka; const g = c_genBalk(ctx, 400, 1560, 230, 1);
    metaText(ctx, 'CGG', 200, 362, C.text2, 'left', 22); metaText(ctx, 'mRNA', 200, 560, C.text2, 'left', 22); metaText(ctx, 'FMRP', 200, 720, C.text2, 'left', 22); metaText(ctx, 'fenotype', 200, 842, C.text2, 'left', 22);
    const kol = [[560, q.on('gezonde', 1, 0.6), 0.22, 'normaal', '< 55'], [990, q.on('premutatie', 1, 0.6), 0.5, 'premutatie', '55–200'], [1420, q.on('Boven', 1, 0.6), 0.92, 'volledige mutatie', '> 200']];
    const met = q.on('gemethyleerd', 1, 0.6), mr = q.on('mRNA', 1, 1.2), klont = q.on('samenklontert', 1, 1.2);
    kol.forEach(([x, a, f, n, r], i) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.e1, 256); ctx.lineTo(lerp(g.e1, x, ease(a)), lerp(256, 322, ease(a))); ctx.stroke();
      c_cggStaaf(ctx, x, 350, 230, f, 1, i === 2 ? met : 0, t);
      text(ctx, n, x, 412, fTekst(28, 700), [C.teal, C.goud, C.koraal][i], 'center'); text(ctx, r, x, 446, fTekst(26, 500), C.text2, 'center');
      c_pijlOmlaag(ctx, x, 482, 1);
      if (i === 0) { for (let k = 0; k < 4; k++) c_sliert(ctx, x - 30 + (k % 2) * 50, 535 + k * 16, 70, 0.1 * (k - 1.5), 1, t, k); }
      if (i === 1) { const n2 = Math.round(lerp(4, 9, ease(mr))); for (let k = 0; k < n2; k++) { const kx = x - 50 + (k % 3) * 46, ky = 520 + Math.floor(k / 3) * 22; const cx2 = lerp(kx, x, ease(klont) * 0.5), cy2 = lerp(ky, 545, ease(klont) * 0.5); c_sliert(ctx, cx2, cy2, 64, 0.15 * (k % 3 - 1), 1, t, k + 3); }
        if (klont > 0.01) { ctx.save(); ctx.globalAlpha *= klont; for (let k = 0; k < 5; k++) circ(ctx, x - 40 + k * 20, 545 + (k % 2 ? 14 : -14), 7, '#8A8E9A', '#B8BCC6', 1.2); ctx.restore(); naamBij(ctx, 'RNA-eiwitklont', null, x + 90, 600, klont, 'left', C.goud); } }
      if (i === 2) { ctx.save(); ctx.globalAlpha *= met; kruis(ctx, x, 550, 30, 1, C.koraal); ctx.restore(); }
      c_pijlOmlaag(ctx, x, 640, i === 2 ? 0 : 1);
      if (i === 0) for (let k = 0; k < 7; k++) c_kluwen(ctx, x - 54 + (k % 4) * 36 + (Math.floor(k / 4) ? 18 : 0), 700 + Math.floor(k / 4) * 36, 9, C.teal, 1, 1, k, 6);
      if (i === 1) for (let k = 0; k < 3; k++) c_kluwen(ctx, x - 36 + k * 36, 715, 9, C.teal, 1, 1, k + 2, 6);
      text(ctx, ['normaal', 'soms FXTAS', '100% FXS'][i], x, 842, fTekst(28, 600), C.text, 'center');
      ctx.restore(); });
    naamBij(ctx, 'methylering', null, 1548, 362, met, 'left', C.koraal);
    ctx.restore();
  },

  s48(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 17, 1, 1);
    vraagKaart(ctx, 'Waardoor', 'wordt bij een volledige mutatie geen FMRP gevormd?', 70, 150, 1780, q.on('Waardoor', 1, 0.4));
    const d = q.on('Door', 2, 0.5); const m = q.on('methylering', 1, 1.6);
    c_promotorDNA(ctx, 160, 1180, 480, { a: d, methyl: m, pol: q.on('vindt', 1, 1.2), bots: q.on('transcriptie', 1, 1.0), t });
    naamBij(ctx, 'methylgroepen', null, 590, 390, m, 'left', C.koraal);
    // rechts: geen mRNA, geen translatie, geen FMRP
    const zm = q.on('Zonder', 1, 0.5); if (zm > 0.01) { ctx.save(); ctx.globalAlpha *= zm; c_mrna(ctx, 1320, 1520, 440, 1, t, 4, 7, rgba(C.goud, 0.5), 3); kruis(ctx, 1420, 440, 34, q.on('mRNA', 1, 0.4)); naamBij(ctx, 'geen mRNA', null, 1420, 520, 1, 'center');
      c_ribosoom(ctx, 1700, 440, 0.9, 0.7); kruis(ctx, 1700, 440, 34, q.on('translatie', 1, 0.4)); naamBij(ctx, 'geen FMRP', null, 1700, 520, q.on('translatie', 1), 'center', C.koraal); ctx.restore(); }
    punten(ctx, [{ t: 'Door methylering (van de promotor) geen transcriptie, dus zonder mRNA geen translatie', v: q.on('translatie', 1, 0.4) }], 160, 630, 1600, q.on('Door', 2, 0.6));
  },

  s49(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 18, 1, 1);
    vraagKaart(ctx, 'Verklaar', 'uitval van zenuwcellen in de kleine hersenen geeft symptomen', 70, 150, 940, q.on('Verklaar', 1, 0.5), { px: 36 });
    const bx = 1230, by = 400, bs = 1.0; brein(ctx, bx, by, bs, q.on('Vraag', 1, 0.6));
    const kh = q.on('kleine', 1, 0.6), cx = bx + 210 * bs, cy = by + 120 * bs;
    if (kh > 0.01) { ctx.save(); ctx.globalAlpha *= kh * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); ctx.ellipse(cx, cy, 84 * bs, 49 * bs, 0.2, 0, 6.283); shape(ctx, rgba(C.goud, 0.35), C.goud, 3); ctx.restore(); }
    naamBij(ctx, 'kleine hersenen', null, cx - 30, cy + 100, kh, 'center', C.goud);
    // zenuwcellen in de kleine hersenen: klonten en uitval
    const ui = q.on('Vallen', 1, 2.0), kl = q.on('RNA-eiwitklonten', 1, 1);
    for (let k = 0; k < 7; k++) { const nx = cx - 52 + (k % 4) * 34 + (k > 3 ? 16 : 0), ny = cy - 14 + (k > 3 ? 26 : 0); const uit = clamp(ui * 1.8 - (k % 3) * 0.3, 0, 1) * (k % 2 ? 1 : 0.0); circ(ctx, nx, ny, 6, uit > 0.5 ? '#4A4A58' : lighten(C.goud, 0.3), null); if (kl > 0.01 && k % 2) { ctx.save(); ctx.globalAlpha *= kl * (1 - uit); circ(ctx, nx + 5, ny - 5, 4, '#8A8E9A'); ctx.restore(); } }
    naamBij(ctx, 'RNA-eiwitklonten', 'giftig', 1250, 690, kl * (1 - q.on('coördineren', 1, 0.4)), 'center', C.text2);
    naamBij(ctx, 'coördineren bewegingen', null, cx - 30, cy + 140, q.on('coördineren', 1), 'center');
    const hb = q.on('bevingen', 1, 0.4); c_henk(ctx, 1680, 860, 380, { t, beef: hb, a: hb, uit: 'verbaasd', kijk: -1 });
    punten(ctx, [{ t: 'Kleine hersenen coördineren bewegingen: uitval geeft bevingen en motorische problemen', v: q.on('problemen', 1, 0.4) }], 70, 450, 940, q.on('coördineren', 1, 0.6), { px: 32 });
    tipKaart(ctx, 'Koppel het hersendeel aan een symptoom uit de tekst', 70, 690, 940, q.on('Koppel', 1, 0.5), 30);
  },

  s50(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 19, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'waardoor de ernst van FXTAS bij vrouwen verschilt', 70, 150, 900, q.on('Leg', 1, 0.5) + q.on('Vraag', 1, 0.4));
    const ca = q.on('Vrouwen', 1, 0.6), inact = q.on('uitgezet', 1, 1.4), will = q.on('willekeurig', 1, 0.6);
    persoon(ctx, 'lotte', 1110, 860, 360, { t, a: q.on('Vrouwen', 1, 0.3), kijk: 1 });
    [[1450, 1], [1760, 0]].forEach(([x, mutUit], i) => { const a = ca * (i ? q.on('elke', 1, 0.6) : 1); c_cel(ctx, x, 430, 135, a, { kern: true });
      if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; c_xje(ctx, x - 30, 430, 1.1, C.koraal, 1, mutUit ? inact : 0); c_xje(ctx, x + 32, 430, 1.1, C.teal, 1, mutUit ? 0 : inact); ctx.restore();
      naamBij(ctx, mutUit ? 'gemuteerde X uit' : 'gezonde X uit', null, x, 620, inact, 'center', mutUit ? C.teal : C.koraal); });
    naamBij(ctx, 'gemuteerd X', null, 1420, 270, q.on('gemuteerd', 1) * (1 - inact), 'center', C.koraal);
    naamBij(ctx, 'willekeurig', null, 1605, 220, will, 'center', C.goud);
  },

  s51(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 19, 2, 1);
    const lo = q.on('Let', 1, 0.5);
    punten(ctx, [{ t: 'Toeval: in elke zenuwcel wordt het gemuteerde of het gezonde X uitgezet', a: q.on('Eén', 1, 0.5), v: q.on('uitgezet', 1, 0.4) },
      { t: 'Dus per vrouw verschilt in hoeveel zenuwcellen het gemuteerde X actief is', a: q.on('Twee', 1, 0.5), v: q.on('actief', 1, 0.4) }], 70, 170, 900, 1, { px: 32 });
    valkuil(ctx, 'Alleen: het aantal herhalingen verschilt', 70, 600, 900, lo, 30);
    const k = q.on('toeval', 1, 2.5), wa = q.on('Eén', 1, 0.6);
    metaText(ctx, 'vrouw 1', 1170, 230, C.text2, 'center', 24); metaText(ctx, 'vrouw 2', 1600, 230, C.text2, 'center', 24);
    c_weefsel(ctx, 1030, 290, 5, 5, 0.24, k, wa, { r: 26, seed: 3, puls: q.on('actief', 1), t });
    c_weefsel(ctx, 1460, 290, 5, 5, 0.72, k, wa * q.on('verschilt', 1, 0.6), { r: 26, seed: 7, puls: q.on('actief', 1), t });
    const me = q.on('ernstiger', 1, 1.2);
    c_meter(ctx, 1050, 590, 260, 0.25 * ease(me), C.goud, 'mild', me); c_meter(ctx, 1480, 590, 260, 0.75 * ease(me), C.koraal, 'ernstig', me * q.on('verschilt', 1, 0.6));
    naamBij(ctx, 'gemuteerde X actief', null, 1460, 690, wa * q.on('actief', 1), 'center', C.koraal);
    naamBij(ctx, 'gezonde X actief', null, 1460, 740, wa * q.on('actief', 1), 'center', C.teal);
    tag(ctx, 'X-inactivatie', 1460, 820, C.goud, q.on('X-inactivatie', 1), 'center', 30);
  },

  s52(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('stamboom', 1, 0.5); examenKader(ctx, 40, 135, 1060, 745, 'AFBEELDING 2', ka);
    const st = q.on('stip', 1, 0.6), zw = q.on('zwart', 1, 0.6), on = q.on('Onder', 1, 0.6) * (1 - st);
    const nr = {}; if (on > 0.01) c_PERS.forEach(([id]) => nr[id] = on);
    const vb = q.on('vijfenvijftig', 1, 0.6) * (1 - q.on('persoon', 1, 0.5)); ['I-2', 'II-1', 'II-4'].forEach((id) => nr[id] = Math.max(nr[id] || 0, vb));
    const ii = q.on('II-1', 1, 0.5);
    c_stamboom(ctx, Object.assign({ a: ka, bouw: q.on('stamboom', 1, 3) * 5, t, pulse: { p: st * (1 - zw), v: zw * (1 - vb) }, numRing: nr, hl: { 'II-1': ii }, genHl: { II: ii } }, c_STAM));
    c_legenda(ctx, 1240, 300, st);
    if (vb > 0.01) { ctx.save(); ctx.globalAlpha *= vb; const M = c_stamMap(c_STAM); c_stamboom(ctx, Object.assign({ a: 1, paden: [{ pts: c_pts('I-2', 'II-1'), u: q.on('verandert', 1, 1) }, { pts: c_pad('I-2', 'II-4'), u: q.on('verandert', 1, 1) }], numRing: { 'I-2': 1, 'II-1': 1, 'II-4': 1 } }, c_STAM)); ctx.restore();
      ketting(ctx, [{ t: '70' }, { t: '120 of 85' }], 1240, 560, 560, vb, { px: 30 }); naamBij(ctx, 'het aantal verandert', null, 1520, 650, vb, 'center', C.goud); }
    if (ii > 0.01) { ctx.save(); ctx.globalAlpha *= ii; text(ctx, 'II-1', 1240, 610, fTitel(70), C.goud, 'left'); text(ctx, 'generatie II · persoon 1', 1240, 670, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
  },

  s53(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 20, 'mc', 1);
    const z = q.on('Zoek', 1, 0.5), g4 = q.on('vier', 1, 0.5), mo = q.on('moeder', 1, 0.6), g5 = q.on('vijf', 1, 0.6), va = q.on('vaders', 1, 0.6), ii1 = q.on('II-1', 1, 0.5), ii4 = q.on('II-4', 1, 0.5), eind = q.on('antwoord', 1, 0.6);
    const hl = {}, ring = {}, ringCol = {}, numRing = {}, numCol = {}, dim = {}, paden = [];
    const h4 = g4 * (1 - va); hl['IV-2'] = q.on('IV-2', 1, 0.4) * (1 - va); hl['IV-4'] = q.on('IV-4', 1, 0.4) * (1 - va); hl['IV-9'] = q.on('IV-9', 1, 0.4) * (1 - va);
    const hlCol = {}; c_ZWART.forEach((id) => hlCol[id] = C.koraal);
    const mm = mo * (1 - va); hl['III-3'] = mm; hl['III-7'] = mm; numRing['III-3'] = mm; numRing['III-7'] = mm;
    paden.push({ pts: c_pad('III-3', 'IV-2'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud }); paden.push({ pts: c_pad('III-7', 'IV-4'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud }); paden.push({ pts: c_pad('III-7', 'IV-9'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud });
    // generatie V: telt niet mee
    ['V-2', 'V-6'].forEach((id) => { ring[id] = g5; ringCol[id] = C.koraal; }); hl['IV-2'] = Math.max(hl['IV-2'], g5 * (1 - va) * 0.8); hl['IV-9'] = Math.max(hl['IV-9'], g5 * (1 - va) * 0.8);
    // vaders
    hl['II-1'] = ii1 * (1 - ii4); numRing['II-1'] = ii1; numRing['III-1'] = q.on('132', 1, 0.4); numRing['III-3'] = Math.max(numRing['III-3'], q.on('126', 1, 0.4)); ['II-1', 'III-1', 'III-3'].forEach((id) => numCol[id] = C.teal);
    paden.push({ pts: c_pad('II-1', 'III-1'), u: q.on('dochters', 1, 1), col: C.teal }); paden.push({ pts: c_pad('II-1', 'III-3'), u: q.on('dochters', 1, 1), col: C.teal });
    hl['II-4'] = ii4; numRing['II-4'] = ii4; numRing['III-7'] = Math.max(numRing['III-7'], q.on('85', 2, 0.4)); numCol['II-4'] = C.teal; numCol['III-7'] = C.teal; paden.push({ pts: c_pad('II-4', 'III-7'), u: q.on('dochter', 2, 1), col: C.teal });
    hlCol['II-1'] = C.teal; hlCol['II-4'] = C.teal; c_ZWART.forEach((id) => hl[id] = Math.max(hl[id], eind));
    c_stamboom(ctx, Object.assign({ t, pulse: { v: z * (1 - g4) }, hl, hlCol, ring, ringCol, numRing, numCol, paden, genHl: { IV: h4 * (1 - g5), V: g5 * (1 - va) } }, c_STAM));
    // 'telt niet mee' bij V-2 en V-6
    const M = c_stamMap(c_STAM); const tn = q.on('tellen', 1, 0.5) * (1 - eind * 0);
    [['V-2', 1], ['V-6', 1]].forEach(([id]) => { const p = c_P[id]; c_tag(ctx, 'telt niet mee', M.X(p.x) + 34, M.Y(p.y) + 12, C.koraal, tn, 24); });
    // opties
    const weg = q.on('blijft', 1, 0.8);
    opties(ctx, ['alleen tijdens de vorming van eicellen', 'alleen tijdens de vorming van zaadcellen', 'tijdens de vorming van eicellen én van zaadcellen'], 1150, 170, 720, { weg: [0, weg, weg], goed: 0, g: q.on('antwoord', 1, 0.5) }, q.on('Vraag', 1, 0.4), { px: 30 });
    // samenvatting rechts
    const sa = mo * (1 - g5); if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; text(ctx, 'moeder: premutatie', 1160, 640, fTekst(34, 700), C.goud, 'left'); text(ctx, '→  kind: volledige mutatie', 1160, 690, fTekst(34, 700), C.koraal, 'left'); ctx.restore(); }
    const vb = va * (1 - eind); if (vb > 0.01) { ctx.save(); ctx.globalAlpha *= vb; text(ctx, 'vader: premutatie', 1160, 640, fTekst(34, 700), C.teal, 'left'); text(ctx, '→  dochter: premutatie', 1160, 690, fTekst(34, 700), C.teal, 'left'); ctx.restore(); }
  },

  s54(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 21, 3, 1);
    const gv = q.on('grootvader', 1, 0.5), kk = q.on('kleinkind', 1, 0.5);
    const hl = { 'II-1': gv, 'II-4': gv, 'IV-2': kk, 'IV-4': kk, 'IV-9': kk }, hlCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal };
    c_stamboom(ctx, Object.assign({ t, hl, hlCol }, c_STAM));
    vraagKaart(ctx, 'Beschrijf', 'stap voor stap: premutatie van een grootvader → volledige mutatie bij een kleinkind', 1150, 170, 720, q.on('Beschrijf', 1, 0.5) + q.on('Vraag', 1, 0.4), { px: 34 });
  },

  s55(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 21, 3, 1);
    const via = q.on('Via', 2, 0.6);
    const s1 = q.on('II-1', 1, 0.5), s2 = q.on('III-3', 1, 0.5), s3 = q.on('IV-2', 1, 0.5);
    const hl = { 'II-1': s1, 'III-3': s2, 'IV-2': s3, 'II-4': via, 'III-7': via, 'IV-4': via, 'IV-9': via };
    const hlCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal, 'II-4': C.teal, 'III-7': C.teal };
    const numRing = { 'II-1': q.on('120', 1, 0.4), 'III-3': q.on('126', 1, 0.4), 'IV-2': q.on('252', 1, 0.4), 'II-4': via, 'III-7': via, 'IV-4': via, 'IV-9': via };
    const numCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal };
    const paden = [{ pts: c_pad('II-1', 'III-3'), u: q.on('geeft', 1, 1.6) }, { pts: c_pad('III-3', 'IV-2'), u: q.on('eicel', 1, 1.6), col: C.koraal },
      { pts: c_pad('II-4', 'III-7'), u: q.on('II-4', 1, 1.2), col: C.teal }, { pts: c_pad('III-7', 'IV-4'), u: q.on('IV-4', 1, 1.2), col: C.teal }, { pts: c_pad('III-7', 'IV-9'), u: q.on('IV-9', 1, 1.2), col: C.teal }];
    c_stamboom(ctx, Object.assign({ t, hl, hlCol, numRing, numCol, paden }, c_STAM));
    const k1 = 1 - via; ketting(ctx, [{ t: 'II-1 · 120', a: s1 }, { t: 'III-3 · 126', a: s2 }, { t: 'IV-2 · 252', a: s3, col: C.koraal }], 1140, 240, 740, q.on('Kies', 1, 0.4) * k1, { px: 28 });
    ketting(ctx, [{ t: 'II-4 · 85', col: C.teal }, { t: 'III-7 · 85', col: C.teal }, { t: 'IV-4 of IV-9', col: C.koraal }], 1140, 240, 740, q.on('kleinkinderen', 1, 0.6), { px: 26 });
    tag(ctx, 'ook goed', 1510, 345, C.groen, q.on('goed', 1, 0.5), 'center', 30);
    punten(ctx, [{ t: 'Grootvader geeft de premutatie door aan zijn dochter', a: q.on('Drie', 1, 0.5), v: q.on('dochter', 2, 0.4) },
      { t: 'Bij het doorgeven aan haar kind neemt het aantal toe', a: q.on('Drie', 1, 0.5), v: q.on('toe', 2, 0.4) },
      { t: 'Het kleinkind komt boven de 200 (252)', a: q.on('Drie', 1, 0.5), v: q.on('tweehonderd', 1, 0.4) }], 1140, 400, 740, 1, { px: 29, gap: 16 });
  },

  s56(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('X-chromosoom', 1, 0.6); examenKader(ctx, 120, 140, 1680, 735, 'AFBEELDING 3', ka);
    const lng = q.on('lange', 1, 0.6), hit = q.on('Xq27.3', 1, 0.6);
    c_ideogram(ctx, 220, 1700, 430, 46, { a: ka, reveal: q.on('X-chromosoom', 1, 1.6), loci: q.on('FMR1-gen', 1, 0.8), hit, q: lng });
    naamBij(ctx, 'p · korte arm', null, 600, 500, lng * 0.8, 'center', C.text2); naamBij(ctx, 'q · lange arm', null, 1240, 500, lng, 'center', C.goud);
    naamBij(ctx, 'FMR1', null, 220 + (889 - 190) * 1480 / 756, 210, hit, 'center', C.goud);
    // gewoon chromosoom onder de microscoop, liggend zoals het ideogram (p links, q rechts)
    // rechtop zoals nr. 3 in s57: knik met bolletje aan het eind van q
    const ch = q.on('volledige', 1, 0.6), fr = ramp(t, q.at('microscoop', 1), 0.5);
    c_chromosoom(ctx, 960, 640, 0.8, { bl: 1, br: 1 }, { a: ch, fragiel: fr });
    if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch; text(ctx, 'p', 900, 600, fTekst(30, 700), C.text2, 'center'); text(ctx, 'q', 892, 730, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }
    naamBij(ctx, 'insnoering', null, 1030, 800, fr, 'left', C.goud);
  },

  s57(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 22, 2, 1);
    vraagKaart(ctx, 'Noteer', 'welke X-chromosomen je ziet in een karyogram van IV-9', 70, 150, 1780, 1);
    const xs = [460, 710, 960, 1210, 1460], KN = [{}, { bl: 1 }, { bl: 1, br: 1 }, { tl: 1 }, { tl: 1, tr: 1 }];
    xs.forEach((x, i) => { const a = q.on('vijf', 1, 0.4 + i * 0.12); c_chromosoom(ctx, x, 560, 0.7, KN[i], { a }); regel(ctx, String(i + 1), x, 820, a, C.text, 40, 'center', 700); });
    tag(ctx, 'IV-9 · 32 / 257', 1660, 430, C.koraal, q.on('IV-9', 1, 0.5), 'center', 30);
  },

  s58(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 22, 2, 1);
    const xs = [250, 480, 710, 940, 1170], KN = [{}, { bl: 1 }, { bl: 1, br: 1 }, { tl: 1 }, { tl: 1, tr: 1 }];
    const g1 = q.on('nummer', 1, 0.5), lang = q.on('lange', 1, 0.6) * (1 - q.on('Bij', 1, 0.5)), af = q.on('vallen', 1, 0.6), bl = q.on('Blijven', 1, 0.5), zus = q.on('zusterchromatiden', 1, 0.6), al = q.on('alleen', 1, 0.6), ant = q.on('antwoord', 1, 0.6);
    xs.forEach((x, i) => { const weg = i >= 3 ? af : i === 1 ? al : 0; const hlb = i === 0 ? 0 : (i === 1 || i === 2) ? zus : 0;
      c_chromosoom(ctx, x, 470, 0.7, KN[i], { a: 1 - 0.55 * weg, hlL: i === 0 ? g1 : (i === 1 || i === 2) ? zus : 0, hlR: i === 0 ? g1 : i === 2 ? zus : 0, hlCol: i === 0 ? C.groen : C.goud });
      if (lang > 0.01) { ctx.save(); ctx.globalAlpha *= lang; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); roundRect(ctx, x - 70, 470 + 40, 140, 140, 20); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
      if (weg > 0.01) kruis(ctx, x, 470, 50 * ease(weg), weg);
      const goed = (i === 0 || i === 2) ? ant : 0; if (goed > 0.01) { ctx.save(); ctx.globalAlpha *= goed; ctx.beginPath(); ctx.ellipse(x, 480, 105, 200, 0, 0, 6.283); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
      regel(ctx, String(i + 1), x, 730, 1, (i === 0 && g1 > 0.5) || (i === 2 && ant > 0.5) ? C.groen : C.text, 40, 'center', 700); });
    naamBij(ctx, 'gewoon X', null, 250, 210, g1, 'center', C.groen);
    naamBij(ctx, 'lange arm', null, 710, 790, lang, 'center', C.goud);
    naamBij(ctx, 'korte arm', null, 1055, 210, af * (1 - bl), 'center', C.koraal);
    naamBij(ctx, 'twee zusterchromatiden', null, 595, 210, zus * (1 - ant), 'center', C.goud);
    tag(ctx, 'IV-9 · 32 en 257', 1600, 210, C.koraal, q.on('IV-9', 1, 0.5), 'center', 30);
    const vr = q.on('vrouw', 1, 0.5); if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; text(ctx, '32 → gewoon X', 1430, 300, fTekst(32, 600), C.teal, 'left'); text(ctx, '257 → gemuteerd X', 1430, 350, fTekst(32, 600), C.koraal, 'left'); ctx.restore(); }
    punten(ctx, [{ t: 'chromosoom 1', v: q.on('1', 2, 0.4), a: ant }, { t: 'chromosoom 3', v: q.on('3', 4, 0.4), a: ant }], 1430, 440, 420, 1, { px: 32 });
  },

  s59(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 23, 'mc', 1);
    regel(ctx, 'Waarop berust de PCR?', 70, 210, q.on('Waarop', 1, 0.5), C.text, 42, 'left', 700);
    opties(ctx, ['bepalen van de genexpressie', 'hybridiseren van RNA', 'op grootte scheiden van DNA-fragmenten', 'repliceren van DNA-fragmenten'], 70, 260, 860, { weg: [0, 0, q.on('Scheiden', 1, 0.8), 0], goed: 3, g: q.on('antwoord', 1, 0.5) }, q.on('Waarop', 1, 0.5), { px: 32 });
    // PCR: elke cyclus verdubbelt het stuk DNA
    const t0 = q.at('repliceren'), cyc = clamp((t - t0) / 1.6, 0, 4.2); const nC = Math.floor(cyc), f = cyc - nC; const n = Math.pow(2, nC); const pa = q.on('repliceren', 1, 0.5);
    if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; roundRect(ctx, 1010, 200, 840, 620, 22); shape(ctx, rgba(EX.papier, 0.6), EX.papierR, 2); metaText(ctx, 'PCR', 1040, 248, C.text2, 'left', 22);
      const cols = 4, w = 150; for (let i = 0; i < Math.min(16, n * 2); i++) { const isNew = i >= n; const k = isNew ? i - n : i; const src = k; const xx = 1110 + (i % cols) * 200, yy = 320 + Math.floor(i / cols) * 120;
        const sx = 1110 + (src % cols) * 200, sy = 320 + Math.floor(src / cols) * 120; if (isNew) { if (nC >= 4) continue; const m = ease(clamp(f * 1.4 - 0.2, 0, 1)); ctx.save(); ctx.globalAlpha *= m; c_dnaStukje(ctx, lerp(sx, xx, m), lerp(sy, yy, m), w, 1, 1, 0); ctx.restore(); }
        else c_dnaStukje(ctx, xx, yy, w, 1, 1, nC < 4 ? 6 * Math.sin(f * Math.PI) : 0); }
      text(ctx, (nC >= 4 ? 16 : n) + (n === 1 && nC < 4 ? ' stuk DNA' : ' kopieën'), 1440, 790, fTekst(34, 700), C.goud, 'center'); ctx.restore(); }
    naamBij(ctx, 'daarna: gelelektroforese', null, 500, 820, q.on('gelelektroforese', 1), 'center', C.text2);
  },

  s60(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 24, 'mc', 1);
    const ga = q.on('gel', 1, 0.6), wie = q.on('persoon', 1, 0.5);
    const hl = { 6: q.on('6', 1, 0.3), 7: q.on('7', 1, 0.3), 9: q.on('9', 1, 0.3), 11: q.on('11', 1, 0.3) };
    c_gel(ctx, { a: ga, x0: 110, x1: 990, y0: 230, y1: 820, banden: q.on('twaalf', 1, 1.2), zones: q.on('herhalingen', 1, 0.8), hl });
    const pa = q.on('groter', 1, 0.6); if (pa > 0.01) { pijl(ctx, 70, 800, 70, 260, C.goud, pa * ease(q.on('hoger', 1, 0.8) + 0.4), 4, 18); ctx.save(); ctx.globalAlpha *= pa; ctx.translate(52, 540); ctx.rotate(-Math.PI / 2); text(ctx, 'langer fragment', 0, 0, fTekst(26, 700), C.goud, 'center'); ctx.restore(); }
    opties(ctx, ['persoon 6', 'persoon 7', 'persoon 9', 'persoon 11'], 1460, 240, 400, {}, wie, { px: 32 });
    regel(ctx, 'man met FXTAS-risico?', 1460, 210, wie, C.text, 32, 'left', 700);
  },

  s61(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 24, 'mc', 1);
    const vr = q.on('vrouwen', 1, 0.6), p7 = q.on('Persoon', 1, 0.5), p11 = q.on('Persoon', 2, 0.5), pz = q.on('premutatie', 1, 0.6), nb = q.on('normale', 1, 0.6);
    const hl = { 6: q.on('6', 1, 0.4), 9: q.on('9', 1, 0.4), 7: p7, 11: p11 }, hlCol = { 6: C.koraal, 9: C.koraal, 7: C.koraal, 11: C.groen };
    c_gel(ctx, { x0: 110, x1: 990, y0: 230, y1: 820, hl, hlCol, dim: { 6: vr * 0.6, 9: vr * 0.6, 7: nb * 0.6 }, zoneHl: { p: pz, n: nb * (1 - p11) } });
    opties(ctx, ['persoon 6', 'persoon 7', 'persoon 9', 'persoon 11'], 1460, 240, 400, { weg: [vr, nb, vr, 0], goed: 3, g: q.on('antwoord', 1, 0.5) }, 1, { px: 32 });
    const s1 = q.on('Eén', 1, 0.5) * (1 - q.on('Twee', 3, 0.5)), s2 = q.on('Twee', 3, 0.5);
    regel(ctx, '1  man: één X → één bandje', 1460, 690, s1, C.text, 30, 'left', 700); regel(ctx, '2  premutatie', 1460, 690, s2, C.text, 30, 'left', 700);
  },

  s62(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const fx = q.on('FXS', 1, 1.0); const nx = lerp(960, 520, fx), ns = lerp(1.0, 0.78, fx), ny = lerp(480, 470, fx);
    const st = { t, glu: q.on('Glutamaat', 1, 1.2), bind: q.on('activeert', 1, 0.8), synth: q.on('aanmaak', 1, 1.5), fmrp: q.on('remt', 1, 0.6), labels: 1, lGlu: q.on('Glutamaat', 1), lM: q.on('mGluR5', 1), lA: q.on('AMPA', 1), lE: q.on('eiwitten', 1), ampaHl: q.on('receptoren', 1, 0.5) * (1 - q.on('Glutamaat', 1, 0.5)) + q.on('AMPA', 1, 0.5) * (1 - q.on('normale', 1, 0.5)), pijlen: q.on('activeert', 1, 0.8) };
    c_synaps(ctx, nx, ny, ns, 'normaal', Object.assign({ a: q.on('synaps', 1, 0.6) }, st));
    naamBij(ctx, 'normaal', null, nx, ny + 340 * ns, fx, 'center', C.teal);
    c_synaps(ctx, 1400, 470, 0.78, 'fxs', { a: fx, t, glu: 1, bind: 1, synth: 1, fmrp: q.on('ontbreekt', 1, 0.6), weg: q.on('ontbreekt', 1, 2.5), labels: 0 });
    naamBij(ctx, 'fragiele-X-syndroom', null, 1400, 470 + 340 * 0.78, fx, 'center', C.koraal);
    naamBij(ctx, 'geen FMRP', null, 1600, 400, q.on('ontbreekt', 1), 'left', C.koraal);
  },

  s63(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 25, 2, 1);
    const an = q.on('antwoord', 1, 0.6), tip = q.on('Tip', 1, 0.6);
    vraagKaart(ctx, 'Leg uit', 'waardoor de synaps bij FXS verzwakt', 70, 140, 1780, (q.on('Vraag', 1, 0.4)) * (1 - an));
    punten(ctx, [{ t: 'Normaal remt FMRP de eiwitten die na stimulering van mGluR5 worden gemaakt', v: q.on('gemaakt', 1, 0.4) },
      { t: 'Zonder FMRP halen die eiwitten de AMPA-receptoren uit het membraan', a: q.on('Twee', 2, 0.5), v: q.on('membraan', 1, 0.4) }], 70, 140, 1780, an * (1 - tip), { px: 30, gap: 14 });
    tipKaart(ctx, 'Wat remt wat? Wat gebeurt er als de rem wegvalt?', 70, 150, 1780, tip, 34);
    const sy = 590, sc = 0.6;
    c_synaps(ctx, 520, sy, sc, 'normaal', { t, glu: 1, bind: 1, synth: 1, fmrp: 1, labels: 0 });
    const rem = q.on('remt', 1, 0.5) * (1 - q.on('Twee', 2, 0.5)); if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem * (0.6 + 0.4 * Math.sin(t * 6)); circ(ctx, 520 + 45 * sc, sy + 90 * sc, 46 * sc, null, C.teal, 4); ctx.restore(); }
    naamBij(ctx, 'normaal', null, 520, sy + 290 * sc, 1, 'center', C.teal);
    const weg = q.on('halen', 1, 2.2);
    c_synaps(ctx, 1400, sy, sc, 'fxs', { t, glu: 1, bind: 1, synth: 1, fmrp: 1, weg, ampaHl: q.on('Minder', 1, 0.5) });
    naamBij(ctx, 'FXS', null, 1400, sy + 290 * sc, 1, 'center', C.koraal);
    naamBij(ctx, 'minder AMPA', null, 1400 + 200 * sc, sy - 40, q.on('Minder', 1), 'left', C.koraal);
  },

  s64(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 26, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'hoe knock-out-muizen helpen bij het zoeken naar een medicijn', 70, 150, 900, q.on('Vraag', 1, 0.4) + q.on('Leg', 1, 0.4), { px: 36 });
    const mu = q.on('muizen', 1, 0.5), uit = q.on('uitgeschakeld', 1, 0.8), vs = q.on('verschijnselen', 1, 0.8), test = q.on('testen', 1, 0.8), verm = q.on('vermindert', 1, 2.0);
    c_genKaartje(ctx, 1420, 260, mu, uit);
    naamBij(ctx, 'geen FMRP', null, 1420, 350, q.on('FMRP', 1), 'center', C.koraal);
    c_muis(ctx, 1450, 560, 1.15, { a: mu, t, beef: vs * (1 - verm), kijk: -1 });
    c_meter(ctx, 1290, 700, 300, (0.8 * ease(vs)) * (1 - 0.65 * ease(verm)), verm > 0.5 ? C.groen : C.koraal, verm > 0.5 ? 'minder' : 'FXS', vs);
    c_flesje(ctx, 1080, 560 - 20 * Math.sin(Math.min(1, test) * Math.PI), 1.2, test * (1 - 0.0), C.groen);
    naamBij(ctx, 'stof testen', null, 1080, 660, test, 'center', C.groen);
    punten(ctx, [{ t: 'Bij deze muizen is het FMR1-gen uitgeschakeld (geen FMRP)', v: q.on('uitgeschakelde', 1, 0.4) }, { t: 'Op deze muizen test je of een stof de verschijnselen van FXS vermindert', v: q.on('stoffen', 1, 0.4) }], 70, 430, 900, q.on('Twee', 2, 0.5), { px: 30 });
  },
});
