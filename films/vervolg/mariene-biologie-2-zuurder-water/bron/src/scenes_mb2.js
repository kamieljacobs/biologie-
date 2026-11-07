// Wat word jij? · Mariene biologie 2 · Zuurder water — scènes per alinea (v1.0, 7 nov 2026).
// Look: Schema met cast (Sam, stagiair, outfit 'practicum'; de mariene bioloog, 'marien', outfit 'lab'; geen namen in beeld).
// Decor 'lab' (aquaria aan de Noordzee) alleen waar Sam en de bioloog in het lab staan; bladen, moleculen en grafieken op navy.
// Stem zegt 'H-plus' en 'Ierseke'; beeld en ondertitels tonen H⁺ en Yerseke. Geen cues op 'CO₂' of 'H⁺' (de speler normaliseert
// die tot 'co' en 'h', en dat matcht te veel woorden).

// strook doorgestreepte tekst
function streep(ctx, x, y, w, u, col = C.koraal) { if (u <= 0.01) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * ease(u), y); ctx.stroke(); ctx.restore(); }
// tekst met superscript (10^0,1)
function macht(ctx, grond, exp, rest, x, y, px, kl) { ctx.save(); ctx.font = fTekst(px, 800); ctx.fillStyle = kl; ctx.textAlign = 'left'; ctx.fillText(grond, x, y); let w = ctx.measureText(grond).width; ctx.font = fTekst(px * 0.58, 800); ctx.fillText(exp, x + w + 4, y - px * 0.42); w += ctx.measureText(exp).width + 12; ctx.font = fTekst(px, 800); ctx.fillText(rest, x + w, y); ctx.restore(); }
// gemeten meter (wijzerplaatje) aan de inlaat
function mb2_meter(ctx, x, y, r, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2EEE4', '#9AA3B2', 3); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, r - 10, -0.6, -0.1); ctx.stroke();
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 4; const an = -Math.PI + v * Math.PI; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 14), y + Math.sin(an) * (r - 14)); ctx.stroke(); circ(ctx, x, y, 6, '#2A3446'); ctx.restore(); }
// rij verdachten op blad 1
function verdachten(ctx, x, y, q, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  metaA(ctx, 'VERDACHTEN', x, y, q.on('Eerst', 1, 0.4), C.grain, 'left', 28);
  const rij = [['bacterie', q.on('bacterie', 1, 0.4), q.on('zonder', 1, 0.6)], ['te weinig zuurstof', q.on('zuurstof', 1, 0.4), -q.on('Bleef', 1, 0.6)], ['het water zelf', q.on('Bleef', 1, 0.4), 0]];
  rij.forEach(([s2, ra, st], i) => { if (ra <= 0.01) return; const yy = y + 80 + i * 84; ctx.save(); ctx.globalAlpha *= ra; ctx.font = fTekst(44, 700); const w = ctx.measureText(s2).width;
    text(ctx, s2, x, yy, fTekst(44, 700), Math.abs(st) > 0.5 ? C.text2 : C.text, 'left'); if (st > 0) streep(ctx, x - 8, yy - 14, w + 16, st); else if (st < -0.5) mb2_meta(ctx, 'MINDER WAARSCHIJNLIJK', x, yy + 36, C.text2, 'left', 28);
    if (i === 2) laag(ctx, q.on('zelf', 1, 0.4), () => { roundRect(ctx, x - 20, yy - 52, w + 40, 72, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }); ctx.restore(); });
  ctx.restore(); }
// klein blad in de recap: kaartje met kop
function recapTegel(ctx, x, y, w, h, kop, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, MB2.blad, rgba(MB2.map, 0.9), 2); mb2_meta(ctx, kop, x + 24, y + 44, C.goud, 'left', 28); ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); teken(x, y, w, h); ctx.restore(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.fillStyle = rgba(C.teal, 0.18); ctx.fillRect(1080, 330, 760, 470); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(1080, 330, 760, 4); ctx.restore();
    mb2_oester(ctx, 1460, 640, 1.9, { rot: -0.25 }); [[1180, 430, 0.4], [1300, 560, 2.1], [1700, 420, 1.2], [1740, 700, 0.3]].forEach(([x, y, r], i) => mb2_co2(ctx, x + Math.sin(t + i) * 6, y + Math.cos(t * 0.8 + i) * 5, 14, { rot: r + t * 0.2 }));
    [[1240, 700], [1620, 520], [1780, 560]].forEach(([x, y], i) => mb2_hplus(ctx, x + Math.sin(t * 1.3 + i) * 5, y, 12)); },

  // ---------- Cold open: lab met aquaria ----------
  s01(ctx, t, q) { decor(ctx, 'lab', 0.6);
    const tW = q.at('Waarom', 1), [A, B] = wisselT(t, tW - 0.2);
    const schuif = ease(clamp((t - q.at('dossier', 1)) / 1.4, 0, 1));
    if (A > 0.5) { bioloog(ctx, 1380, t, { kijk: -1, uit: 'blij', pose: schuif > 0.02 && schuif < 0.98 ? 'wijs' : 'staan' });
      sam(ctx, 520, t, { kijk: 1, uit: q.on('overleefden', 1) > 0.5 ? 'verbaasd' : 'blij' }); }
    laag(ctx, A, () => {
      mb2_pil(ctx, 'STAGIAIR', 520, 380, 1 - q.on('zee', 1, 0.4)); mb2_pil(ctx, 'MARIENE BIOLOOG', 1380, 390, 1 - q.on('zee', 1, 0.4));
      mb2_tafel(ctx, 700, 640, 560);
      const dx = lerp(1110, 860, schuif); mb2_dossierDicht(ctx, dx, 640, 300, { lab: 1, rot: 0 });
      laag(ctx, q.on('kwekerij', 1, 0.5), () => { mb2_meta(ctx, 'DOSSIER · OESTERKWEKERIJ', 980, 560, C.goud, 'center', 28); mb2_meta(ctx, 'OREGON (VS) · ± 2007', 980, 594, C.goud, 'center', 28); });
      laag(ctx, q.on('zee', 1, 0.5), () => { kaart(ctx, 560, 120, 800, 210, 1, C.goud); text(ctx, 'Ruim een kwart van onze CO₂', 600, 196, fTekst(48, 800), C.text, 'left'); text(ctx, 'gaat de zee in.', 600, 256, fTekst(48, 800), C.text, 'left');
        laag(ctx, q.on('goed', 1, 0.4), () => { vink_(ctx, 1290, 220, 26, 1, C.groen); }); mb2_meta(ctx, 'GLOBAL CARBON BUDGET 2025', 600, 304, C.text2, 'left', 28); });
      laag(ctx, q.on('oesters', 1, 0.4), () => { mb2_oester(ctx, 1080, 520, 0.45, { rot: 0.4 }); kruis(ctx, 1080, 520, 26, 1, C.koraal); }); });
    laag(ctx, B, () => { kaart(ctx, 200, 200, 1180, 360, 1, C.goud); mb2_meta(ctx, 'DOSSIER · OESTERKWEKERIJ OREGON (VS) · ± 2007', 250, 262, C.goud, 'left', 28);
      text(ctx, 'De zee neemt ruim een kwart van onze CO₂ op.', 250, 350, fTekst(48, 800), C.text, 'left'); text(ctx, 'Slecht nieuws voor een oester?', 250, 430, fTekst(48, 800), C.text, 'left');
      mb2_stempelPlek(ctx, 250, 470, 520, 70, 1); mb2_oester(ctx, 1560, 520, 1.3, { rot: -0.2 }); vraagteken(ctx, 1560, 300, q.on('Wat', 1, 0.4), 130); }); },

  // ---------- H1 CO₂ lost op en het water wordt zuurder ----------
  s03(ctx, t, q) { const [A, B] = wisselT(t, q.at('diepte', 1) - 0.1); decor(ctx, 'lab', 0.6 * A);
    if (A > 0.5) { bioloog(ctx, 170, t, { kijk: 1, uit: 'neutraal' }); sam(ctx, 400, t, { kijk: 1, pose: 'wijs', uit: q.on('dood', 1) > 0.5 && q.on('Eerst', 1) < 0.5 ? 'verbaasd' : 'neutraal' }); }
    laag(ctx, A, () => {
      mb2_blad(ctx, 640, 140, 1200, 690, { nr: 'blad 1', titel: 'MELDING' });
      metaA(ctx, 'ROND 2007 · OESTERKWEKERIJ · OREGON (VS)', 676, 250, q.on('Rond', 1, 0.4), C.grain, 'left', 28);
      const D = q.on('dood', 1, 0.8); [0, 1, 2].forEach(i => mb2_bak(ctx, 690 + i * 175, 330, 150, 130, { n: 12, dood: Math.round(12 * D), t: D > 0.5 ? 0 : t }));
      metaA(ctx, 'KWEEKBAKKEN MET LARVEN', 676, 520, 1, C.text2, 'left', 28);
      laag(ctx, D, () => { text(ctx, 'larven sterven', 676, 590, fTekst(44, 800), C.koraal, 'left'); mb2_meta(ctx, 'PRODUCTIE STORT IN', 676, 634, C.koraal, 'left', 28); });
      verdachten(ctx, 1260, 300, q); mb2_meta(ctx, 'BARTON E.A. 2012', 1810, 800, C.text2, 'right', 28); });
    laag(ctx, B, () => { mb2_meta(ctx, 'BLAD 1 · HET WATER ZELF', 120, 150, C.goud, 'left', 28);
      const u = clamp((t - q.at('diepte', 1) + 0.4) / 2.6, 0, 1); const G = mb2_opwelling(ctx, 100, 190, 1100, 600, { u, t });
      mb2_naam(ctx, 'kwekerij', '', G.kx + 60, G.ky - 120, 1, 'center');
      laag(ctx, q.on('rijk', 1, 0.5), () => mb2_naam(ctx, 'diep water omhoog', 'rijk aan CO₂', 400, 560, 1, 'center', '#9FC8E0'));
      mb2_meta(ctx, 'BARTON E.A. 2012 · FEELY E.A. 2008', 1200, 840, C.text2, 'right', 28);
      laag(ctx, q.on('nature', 1, 0.5), () => { const Y = mb2_co2Meter(ctx, 1340, 270, 170, 520, { nat: 0.84, extra: 0.12 * ease(clamp((t - q.at('Onze', 1)) / 1.6, 0, 1)), grens: 0.9, grensA: 1, t });
        mb2_meta(ctx, 'CO₂ IN HET WATER', 1425, 236, C.text2, 'center', 28); mb2_naam(ctx, 'van nature', 'opwellend diep water', 1560, Y(0.5), 1, 'left');
        text(ctx, 'grens', 1560, Y(0.9) + 44, fTekst(36, 700), C.koraal, 'left'); mb2_meta(ctx, 'TAST KALK AAN', 1560, Y(0.9) + 76, C.koraal, 'left', 28);
        laag(ctx, q.on('Onze', 1, 0.4), () => { text(ctx, 'onze CO₂', 1560, Y(0.94) - 24, fTekst(36, 800), '#B3A6E0', 'left'); }); }); }); },

  s04(ctx, t, q) { bg(ctx, 'schema'); mb2_blad(ctx, 90, 140, 1740, 690, { nr: 'blad 2', titel: 'Wat doet CO₂ in water?' });
    // Micro: CO₂ + water → koolzuur → H⁺
    const zx = 470, zy = 520, zr = 250, V = q.on('vormt', 1, 0.8), K = q.on('koolzuur', 1, 0.5), L = clamp((t - q.at('laat', 1)) / 1.2, 0, 1);
    mb2_zoom(ctx, zx, zy, zr, zx, zy, 'MICRO · VERGROOT', 1, () => { ctx.fillStyle = rgba(MB2.water, 0.55); ctx.fillRect(zx - zr, zy - zr, zr * 2, zr * 2);
      for (let i = 0; i < 9; i++) mb2_h2o(ctx, zx - 200 + hash(i * 3.1) * 400 + Math.sin(t + i) * 4, zy - 200 + hash(i * 5.3) * 400, 11, { rot: i + t * 0.2, a: 0.45 });
      laag(ctx, 1 - K, () => { mb2_co2(ctx, lerp(zx - 140, zx - 40, V), zy - 30, 22, { rot: t * 0.3 * (1 - V) }); mb2_h2o(ctx, lerp(zx + 140, zx + 40, V), zy - 10, 20, { rot: 0.3 });
        mb2_naam(ctx, 'CO₂', '', lerp(zx - 140, zx - 40, V), zy + 40, 1 - V, 'center'); mb2_naam(ctx, 'water', '', lerp(zx + 140, zx + 40, V), zy + 50, 1 - V, 'center'); });
      laag(ctx, K, () => { mb2_koolzuur(ctx, zx - 20, zy - 10, 24, { los: L }); mb2_naam(ctx, 'koolzuur', '', zx - 20, zy + 110, 1, 'center');
        laag(ctx, L, () => mb2_naam(ctx, 'H⁺', '', zx + 120, zy + 170, 1, 'center', '#B3A6E0')); }); });
    // pH-liniaal
    const P = q.on('lager', 1, 0.6), tD = q.at('Daardoor', 1), w82 = q.at('twee', 2), w81 = q.at('één', 1);
    const wz = t < w81 - 0.2 ? 8.2 : lerp(8.2, 8.1, ease((t - w81 + 0.2) / 0.8));
    laag(ctx, P, () => { mb2_meta(ctx, 'pH: HOE LAGER, HOE ZUURDER', 860, 300, C.text2, 'left', 28); pijl(ctx, 1700, 290, 1500, 290, C.line, 1, 3, 14); });
    laag(ctx, q.on('zuur', 3, 0.4), () => vraagteken(ctx, 860 + (8.1 - 7.9) / 0.4 * 900, 470, 1, 90));
    laag(ctx, ramp(t, tD - 0.2, 0.5), () => { mb2_meta(ctx, 'pH OPEN ZEE', 860, 548, C.text2, 'left', 28); mb2_meta(ctx, 'IPCC · EEA', 1760, 800, C.text2, 'right', 28);
      mb2_phZoom(ctx, 860, 640, 900, 7.9, 8.3, { kl: rgba(C.line, 0.35), wijzer: t > w82 ? wz : null, punten: [[8.2, '8,2', '± 1750', C.text, q.on('twee', 2, 0.4)], [8.1, '8,1', '± 2010', C.goud, q.on('één', 1, 0.4)]] });
      metaA(ctx, '◂ NU: RUIM 8,0', 860 + (8.04 - 7.9) / 0.4 * 900, 760, ramp(t, w81 + 0.6, 0.5), C.koraal, 'center', 28); });
    laag(ctx, q.on('oceaan', 1, 0.5) * (1 - ramp(t, tD - 0.2, 0.4)), () => { kaart(ctx, 860, 600, 900, 160, 1, C.teal); text(ctx, 'Oceaan: ruim 1/4 van onze CO₂-uitstoot', 896, 676, fTekst(44, 800), C.text, 'left'); mb2_meta(ctx, 'GLOBAL CARBON BUDGET 2025', 896, 730, C.text2, 'left', 28); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: nee, het is basisch, alleen minder', 1);
    const Z = q.on('Zuur', 1, 0.5), Bs = q.on('basisch', 1, 0.5), M = q.on('minder', 1, 0.6);
    mb2_phLiniaal(ctx, 260, 290, 1400, { wijzer: 8.1, hlZuur: Z * (1 - Bs), hlBas: Bs, zuurA: Bs > 0.5 ? 0.25 : 0.55 });
    laag(ctx, Z * (1 - Bs), () => text(ctx, 'zuur: onder 7', 260 + 3.5 / 14 * 1400, 520, fTekst(44, 800), C.koraal, 'center'));
    laag(ctx, Bs, () => text(ctx, 'zeewater ± 8,1', 260 + 8.1 / 14 * 1400, 520, fTekst(44, 800), C.teal, 'center'));
    mb2_afdruk(ctx, 1530, 520, 'BASISCH · MINDER BASISCH', M, { s: 0.85, rot: -0.06 });
    const G1 = q.on('tien', 1, 0.5), G2 = q.on('stapje', 1, 0.5);
    mb2_geeltje(ctx, 260, 600, 640, ['pH −1 = 10 × zoveel H⁺'], { a: G1, px: 44 });
    mb2_geeltje(ctx, 1000, 600, 660, ['pH −0,1 = ? × zoveel H⁺'], { a: G2, px: 44, rot: 0.02 });
    vraagteken(ctx, 1730, 700, q.on('Wat', 1, 0.4), 100); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer een kwart meer', 1);
    const S = q.on('zesentwintig', 1, 0.5); mb2_geeltje(ctx, 140, 230, 700, [['pH −0,1 = ' + (S > 0.5 ? '1,26' : '?') + ' × zoveel H⁺', MB2.inkt, 1]], { px: 44, rot: -0.02 });
    laag(ctx, q.on('tien', 1, 0.4), () => macht(ctx, '10', '0,1', ' ≈ 1,26', 160, 500, 72, C.goud));
    laag(ctx, q.on('Zesentwintig', 2, 0.5), () => { text(ctx, '→ ± 26 % meer H⁺', 160, 610, fTekst(60, 800), C.goud, 'left'); mb2_meta(ctx, 'IPCC · WHOI', 160, 670, C.text2, 'left', 28); });
    const ex = 26 * clamp((t - q.at('Zesentwintig', 2)) / 2.2, 0, 1); mb2_hRaster(ctx, 1040, 250, 100, ex, { per: 14, gap: 50, r: 16 });
    mb2_meta(ctx, 'VOOR: 100 H⁺', 1040, 740, C.text2, 'left', 28); laag(ctx, ex > 0 ? 1 : 0, () => mb2_meta(ctx, 'NU: ' + Math.round(100 + ex) + ' H⁺', 1690, 740, C.goud, 'right', 28)); },

  // ---------- H2 Schelpdieren en koraal kunnen minder makkelijk kalk bouwen ----------
  s09(ctx, t, q) { decor(ctx, 'lab', 0.6); let hand = null;
    const O = q.on('oesterschelp', 1, 0.5);
    sam(ctx, 180, t, { kijk: 1, uit: 'neutraal' });
    bioloog(ctx, 450, t, { kijk: 1, uit: 'blij', pose: O > 0.3 ? 'vasthouden' : 'staan', hold: O > 0.3 ? (c, hx, hy) => { hand = [hx + 8, hy - 22]; mb2_oester(c, hx + 8, hy - 22, 0.36, { rot: -0.6, rand: q.on('Ze', 1, 0.4) }); } : null });
    mb2_blad(ctx, 760, 140, 1080, 110, { nr: 'blad 3', titel: 'Hoe kan dat een larve doden?' });
    const Z = q.on('kalk', 1, 0.6); if (hand) mb2_zoom(ctx, 1240, 540, 240, hand[0] + 20, hand[1] + 10, 'GROEIRAND VAN DE SCHELP · VERGROOT', Z, () => {
      ctx.fillStyle = rgba(MB2.water, 0.6); ctx.fillRect(1000, 300, 480, 480); const bouw = 14 + 8 * ease(clamp((t - q.at('carbonaat', 2)) / 1.5, 0, 1));
      mb2_kalkrand(ctx, 1000, 780, 480, bouw, { bs: 44, rijen: 3 }); ctx.fillStyle = MB2.kalk; ctx.fillRect(1000, 760, 480, 30);
      const C1 = q.on('calcium', 2, 0.5), C2 = q.on('carbonaat', 2, 0.5), kl = clamp((t - q.at('carbonaat', 2)) / 1.5, 0, 1);
      laag(ctx, C1 * (1 - kl), () => { mb2_calcium(ctx, lerp(1110, 1170, ease(kl)), lerp(470, 640, ease(kl)), 18); mb2_naam(ctx, 'calcium', '', 1110, 430, 1 - kl, 'center'); });
      laag(ctx, C2 * (1 - kl), () => { mb2_carbonaat(ctx, lerp(1360, 1250, ease(kl)), lerp(470, 640, ease(kl)), 16); mb2_naam(ctx, 'carbonaat', '', 1360, 420, 1 - kl, 'center'); });
      laag(ctx, q.on('calciumcarbonaat', 1, 0.4), () => mb2_naam(ctx, 'kalk', 'calciumcarbonaat', 1240, 610, 1, 'center'));
      const H = q.on('extra', 1, 0.5); for (let i = 0; i < 7; i++) mb2_hplus(ctx, 1040 + hash(i * 3.7) * 400 + Math.sin(t * 1.5 + i) * 6, 360 + hash(i * 2.1) * 160, 12, { a: H }); });
    vraagteken(ctx, 1240, 540, q.on('denk', 1, 0.4), 120); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: H⁺ pakt carbonaat weg: minder bouwstof', 1);
    const zx = 640, zy = 520, zr = 300, Hh = clamp((t - q.at('hecht', 1) + 0.2) / 1.4, 0, 1);
    mb2_zoom(ctx, zx, zy, zr, zx, zy, 'GROEIRAND · VERGROOT', 1, () => { ctx.fillStyle = rgba(MB2.water, 0.6); ctx.fillRect(zx - zr, zy - zr, zr * 2, zr * 2);
      mb2_kalkrand(ctx, zx - zr, zy + 260, zr * 2, 30, { bs: 46, rijen: 3, gat: [9, 10] }); ctx.fillStyle = MB2.kalk; ctx.fillRect(zx - zr, zy + 240, zr * 2, 70);
      // twee carbonaten: één wordt bicarbonaat
      const bx = zx - 60, by = zy - 40; mb2_carbonaat(ctx, bx, by, 22, { h: Hh });
      laag(ctx, 1 - Hh, () => mb2_hplus(ctx, bx + 140 - 140 * ease(Hh), by - 120 + 60 * ease(Hh), 16));
      laag(ctx, q.on('bouwsteen', 1, 0.4), () => { mb2_naam(ctx, 'bicarbonaat', 'geen bouwsteen meer', bx, by + 110, 1, 'center', C.koraal); });
      const Ca = q.on('calcium', 1, 0.5); for (let i = 0; i < 5; i++) mb2_calcium(ctx, zx + 60 + hash(i * 4.3) * 200 + Math.sin(t + i) * 4, zy - 200 + hash(i * 7.1) * 260, 17, { a: Ca });
    });
    const Pr = 1 - q.on('proeven', 1, 0.4);
    laag(ctx, q.on('carbonaat', 2, 0.5) * Pr, () => tag(ctx, 'minder bouwstof', 1000, 330, C.koraal, 1, 'left', 44));
    laag(ctx, q.on('calcium', 1, 0.5) * Pr, () => text(ctx, 'calcium: genoeg', 1000, 460, fTekst(48, 800), C.groen, 'left'));
    laag(ctx, q.on('carbonaat', 3, 0.5) * Pr, () => text(ctx, 'carbonaat: te weinig', 1000, 540, fTekst(48, 800), C.koraal, 'left'));
    laag(ctx, q.on('proeven', 1, 0.5), () => { mb2_oester(ctx, 1260, 380, 1.1, { rot: -0.15 }); mb2_naam(ctx, 'volwassen schelp', 'lost pas op bij heel veel CO₂', 1260, 560, 1, 'center'); });
    laag(ctx, q.on('energie', 1, 0.5), () => mb2_energie(ctx, 1080, 690, 700, [[0.72, C.oker, 'BOUWEN'], [0.28, C.groen, 'REST']], { kop: 'BOUWEN KOST MEER ENERGIE' }));
    laag(ctx, q.on('Koraal', 1, 0.5), () => { kaart(ctx, 1520, 230, 320, 280, 1, C.line); mb2_koraal(ctx, 1680, 410, 0.9); mb2_naam(ctx, 'koraal', 'ook kalk · ver weg', 1680, 470, 1, 'center'); }); },

  s12(ctx, t, q) { decor(ctx, 'lab', 0.6);
    sam(ctx, 520, t, { kijk: 1, uit: 'neutraal', pose: q.on('larven', 1) > 0.5 ? 'wijs' : 'staan' }); bioloog(ctx, 260, t, { kijk: 1, uit: 'neutraal' });
    mb2_tafel(ctx, 620, 640, 400); mb2_microscoop(ctx, 800, 640, 0.42);
    mb2_blad(ctx, 1080, 140, 760, 110, { nr: 'blad 4', titel: 'Waarom juist larven?' });
    mb2_zoom(ctx, 1460, 540, 230, 796, 598, 'ONDER DE MICROSCOOP · ± 0,1 mm', q.on('larven', 1, 0.6), () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(1230, 310, 460, 460);
      const st = ease(clamp((t - q.at('stierven', 1)) / 1.2, 0, 1));
      [[1380, 470, 1], [1560, 450, 0], [1460, 600, 1], [1600, 640, 1], [1330, 640, 0]].forEach(([x, y, d], i) => mb2_larve(ctx, x, y + (d ? 30 * st : Math.sin(t * 2 + i) * 6), 46, { u: 0, grijs: d && st > 0.5 ? 1 : 0, velum: d ? 1 - st : 1, t })); }); 
    laag(ctx, q.on('stierven', 1, 0.5), () => mb2_pil(ctx, 'LEVEND 2 · DOOD 3', 1460, 850, 1, C.koraal));
    vraagteken(ctx, 1760, 330, q.on('Waarom', 1, 0.4), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: hun eerste schelp kost veel energie', 1);
    const u = clamp((t - q.at('eerste', 1)) / (q.at('dag', 1) + 0.4 - q.at('eerste', 1)), 0, 1);
    mb2_zoom(ctx, 560, 500, 290, 560, 500, 'OESTERLARVE · ± 0,1 MM · VERGROOT', 1, () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(270, 210, 580, 580); mb2_larve(ctx, 560, 540, 150, { u, t }); });
    laag(ctx, q.on('eerste', 1, 0.4), () => mb2_naam(ctx, u < 0.99 ? 'eerste schelp groeit' : 'eerste schelp', 'in een paar uur', 560, 260, 1, 'center', C.oker));
    const D2 = clamp((t - q.at('dagen', 1)) / 1.2, 0, 1); mb2_klok(ctx, 1080, 300, 70, 0.5 * u + 0.5 * D2, D2 > 0.5 ? 'DAG 2' : 'DAG 1', q.on('eerste', 1, 0.4));
    laag(ctx, q.on('eten', 1, 0.4), () => { vink_(ctx, 1210, 300, 24, 1, C.goud); text(ctx, 'klaar om te eten', 1250, 316, fTekst(44, 800), C.goud, 'left'); });
    laag(ctx, q.on('energie', 1, 0.5), () => mb2_energie(ctx, 1040, 500, 760, [[0.55, C.oker, 'SCHELP'], [0.45, C.groen, 'ZWEMMEN · ETEN']], { kop: 'GEWOON ZEEWATER' }));
    laag(ctx, q.on('zuurder', 1, 0.5), () => mb2_energie(ctx, 1040, 680, 760, [[0.86, C.oker, 'SCHELP'], [0.14, C.groen, '']], { kop: 'ZUURDER WATER' }));
    laag(ctx, q.on('weinig', 1, 0.4), () => { text(ctx, 'te weinig →', 1724, 680, fTekst(36, 800), C.koraal, 'right'); });
    laag(ctx, q.on('Onderzoekers', 1, 0.4), () => { tag(ctx, 'HYPOTHESE', 1700, 236, C.goud, 1, 'center', 28); mb2_meta(ctx, 'WALDBUSSER E.A. 2015 · OREGON STATE', 1800, 870, C.text2, 'right', 28); }); },

  // ---------- H3 Een proef met oesterlarven, met een controlegroep ----------
  s15(ctx, t, q) { decor(ctx, 'lab', 0.6);
    bioloog(ctx, 540, t, { kijk: -1, uit: 'neutraal' });
    sam(ctx, 300, t, { kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: (c, hx, hy) => mb2_stempelDing(c, hx, hy + 42, 0.5) });
    mb2_blad(ctx, 760, 140, 1080, 560, { nr: 'blad 5', titel: 'Bewijs?' });
    laag(ctx, q.on('sterfte', 1, 0.4), () => { mb2_bak(ctx, 820, 290, 170, 130, { n: 12, dood: 10 }); mb2_meta(ctx, 'STERFTE', 905, 470, C.koraal, 'center', 28); });
    laag(ctx, q.on('diepe', 1, 0.4), () => { text(ctx, '+', 1060, 390, fTekst(64, 800), C.text, 'center'); mb2_co2Meter(ctx, 1120, 280, 110, 160, { nat: 0.84, extra: 0.12, grens: 0.9, t }); mb2_meta(ctx, 'DIEP WATER', 1175, 470, C.teal, 'center', 28); });
    laag(ctx, q.on('samen', 1, 0.4), () => { text(ctx, '= samen', 1280, 390, fTekst(52, 800), C.text, 'left'); });
    const S = q.on('stempel', 1, 0.4); mb2_stempelPlek(ctx, 900, 520, 800, 120, 0.5 + 0.5 * S);
    vraagteken(ctx, 1760, 600, q.on('denk', 1, 0.4), 100); },

  s17(ctx, t, q) { decor(ctx, 'lab', 0.6); mb2_tekstPil(ctx, 'antwoord b: nee, eerst larven met en zonder CO₂ vergelijken', 120, 150, 1);
    const r = bioloog(ctx, 700, t, { kijk: 1, uit: 'neutraal', pose: 'vasthouden' }); sam(ctx, 1420, t, { kijk: -1, uit: 'neutraal' });
    const hy = r.handR ? r.handR.y : 640, hx = r.handR ? r.handR.x : 800; mb2_tafel(ctx, 760, hy + 56, 480); mb2_stempelDing(ctx, hx, hy + 56, 0.5);
    laag(ctx, q.on('Samen', 1, 0.5), () => { kaart(ctx, 360, 200, 1200, 100, 1, C.goud); text(ctx, 'samen voorkomen ≠ oorzaak', 960, 268, fTekst(48, 800), C.goud, 'center'); });
    laag(ctx, q.on('anders', 1, 0.5) * (1 - q.on('Onderzoek', 1, 0.4)), () => mb2_meta(ctx, 'IN HET DIEPE WATER KAN OOK IETS ANDERS ZITTEN', 960, 350, C.text, 'center', 28));
    laag(ctx, q.on('Onderzoek', 1, 0.5), () => filmKaartje(ctx, 560, 320, 'Onderzoek doen · één ding veranderen, de rest gelijk', 1)); },

  s18(ctx, t, q) { decor(ctx, 'lab', 0.6);
    sam(ctx, 260, t, { kijk: 1, uit: 'blij', pose: q.on('controlegroep', 1) > 0.5 && q.on('dagen', 1) < 0.5 ? 'wijs' : 'staan' }); bioloog(ctx, 1760, t, { kijk: -1, uit: 'neutraal' });
    mb2_tafel(ctx, 440, 640, 1160);
    const E = q.on('Eitjes', 1, 0.5), Ctl = q.on('controlegroep', 1, 0.5), Co = q.on('extra', 1, 0.5), D = ramp(t, q.at('dagen', 1) + 0.6, 1.2);
    for (let i = 0; i < 3; i++) mb2_bak(ctx, 480 + i * 170, 520, 140, 120, { n: Math.round(8 * E), t, rand: Ctl > 0.5 && Co < 0.5 ? C.goud : null });
    for (let i = 0; i < 3; i++) mb2_bak(ctx, 1080 + i * 170, 520, 140, 120, { n: Math.round(8 * E), co2: Co, dood: Math.round(7 * D), t, rand: Co > 0.5 ? C.goud : null });
    laag(ctx, Ctl, () => mb2_naam(ctx, 'controlegroep', 'gewoon zeewater · pH 8,2', 715, 470, 1, 'center', C.teal));
    laag(ctx, Co, () => mb2_naam(ctx, 'veel CO₂', 'pH 7,4', 1315, 470, 1, 'center', '#B3A6E0'));
    const g = [['ZELFDE EITJES', q.on('dezelfde', 1, 0.4)], ['ZELFDE TEMPERATUUR', q.on('dezelfde', 2, 0.4)], ['VIJF KEER HERHAALD', q.on('tel', 1, 0.4)]];
    g.forEach(([s2, a], i) => metaA(ctx, s2, 560 + i * 420, 200, a, C.goud, 'center', 30));
    mb2_klok(ctx, 1540, 300, 52, ease(clamp((t - q.at('dagen', 1)) / 1.5, 0, 1)), '48 UUR', q.on('dagen', 1, 0.4));
    laag(ctx, q.on('tel', 1, 0.4), () => mb2_meta(ctx, 'TEL: LARVEN MET EEN NORMALE SCHELP', 960, 300, C.text, 'center', 28)); },

  s19(ctx, t, q) { const tP = q.at('proef', 1), tN = q.at('nu', 1), tS = q.at('Sindsdien', 1);
    const tZ = q.at('Zit', 1), fA = 1 - ramp(t, tP - 0.35, 0.3), fB = ramp(t, tP, 0.3) * (1 - ramp(t, tZ - 0.35, 0.3)), fC = 0, fD = ramp(t, tZ, 0.3);
    bg(ctx, 'schema');
    // A: de uitkomst van de Japanse proef
    laag(ctx, fA, () => { mb2_meta(ctx, 'NORMALE LARVE MET SCHELP NA 48 UUR', 140, 170, C.text, 'left', 28); metaA(ctx, 'KURIHARA E.A. 2007 · JAPAN', 140, 210, q.on('Japan', 1, 0.4), C.text2, 'left', 28);
      const x0 = 220, y0 = 760, H = 460; lijn(ctx, [[x0, y0 - H - 20], [x0, y0], [x0 + 640, y0]], C.line, 2); [0, 50, 100].forEach(p => mb2_meta(ctx, p + ' %', x0 - 16, y0 - p / 100 * H + 10, C.text2, 'right', 28));
      const b1 = 0.68 * ease(clamp((t - q.at('controlegroep', 1)) / 1.6, 0, 1)), b2 = 0.05 * ease(clamp((t - q.at('twintig', 1) + 0.6) / 0.8, 0, 1));
      if (b1 > 0) { roundRect(ctx, x0 + 80, y0 - b1 * H, 200, b1 * H, 8); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); laag(ctx, q.on('derde', 1, 0.4), () => text(ctx, '68 %', x0 + 180, y0 - b1 * H - 20, fTekst(48, 800), C.text, 'center')); }
      if (b2 > 0) { roundRect(ctx, x0 + 380, y0 - b2 * H, 200, b2 * H, 6); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); text(ctx, '5 %', x0 + 480, y0 - b2 * H - 20, fTekst(48, 800), C.text, 'center'); }
      metaA(ctx, 'CONTROLEGROEP', x0 + 180, y0 + 40, q.on('controlegroep', 1, 0.4), C.teal, 'center', 28); metaA(ctx, 'pH 8,2', x0 + 180, y0 + 76, q.on('controlegroep', 1, 0.4), C.teal, 'center', 28);
      metaA(ctx, 'VEEL CO₂', x0 + 480, y0 + 40, q.on('veel', 1, 0.4), '#B3A6E0', 'center', 28); metaA(ctx, 'pH 7,4', x0 + 480, y0 + 76, q.on('veel', 1, 0.4), '#B3A6E0', 'center', 28);
      const Zc = q.on('larve', 1, 0.5) * (1 - q.on('extreem', 1, 0.4)); mb2_zoom(ctx, 1150, 360, 140, 1150, 360, 'pH 8,2', Zc, () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(1000, 210, 300, 300); mb2_larve(ctx, 1150, 380, 80, { u: 1, t }); });
      mb2_zoom(ctx, 1530, 360, 140, 1530, 360, 'pH 7,4', q.on('twintig', 1, 0.5) * (1 - q.on('extreem', 1, 0.4)), () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(1380, 210, 300, 300); mb2_larve(ctx, 1530, 380, 80, { u: 0.8, mis: 1, t }); });
      laag(ctx, q.on('extreem', 1, 0.4), () => { text(ctx, 'pH 7,4 = extreem', 1010, 300, fTekst(48, 800), C.koraal, 'left'); mb2_meta(ctx, '± HET JAAR 2300, ERGSTE GEVAL', 1010, 350, C.koraal, 'left', 28); });
      laag(ctx, q.on('minder', 1, 0.5), () => { mb2_geeltje(ctx, 1010, 450, 760, ['minder extra CO₂ → trager'], { px: 44, h: 120 }); mb2_meta(ctx, 'TIMMINS-SCHIFFMAN E.A. 2013', 1770, 620, C.text2, 'right', 28); }); });
    // B: proef, metingen en de afgevallen verdachten naast elkaar
    laag(ctx, fB, () => { const kol = [[110, 'PROEF', ['CO₂ alleen verstoort', 'de eerste schelp'], 'KURIHARA E.A. 2007', q.on('proef', 1, 0.5), C.goud],
        [690, 'METINGEN IN DE KWEKERIJ', ['overleving ↔ chemie', 'van het inlaatwater'], 'BARTON E.A. 2012', q.on('kwekerij', 1, 0.5), C.teal],
        [1270, 'AFGEVALLEN VERDACHTEN', ['bacterie', 'te weinig zuurstof'], 'BLAD 1', q.on('afgevallen', 1, 0.5), C.koraal]];
      kol.forEach(([x, kop, r, bron, a, kl], i) => laag(ctx, a, () => { kaart(ctx, x, 170, 540, 300, 1, kl); mb2_meta(ctx, kop, x + 28, 222, kl, 'left', 28);
        r.forEach((s2, j) => { text(ctx, s2, x + 28, 300 + j * 56, fTekst(40, 700), i === 2 ? C.text2 : C.text, 'left'); if (i === 2) { ctx.font = fTekst(40, 700); streep(ctx, x + 22, 300 + j * 56 - 13, ctx.measureText(s2).width + 12, ramp(t, q.at('verdachten', 1) - 0.2 + j * 0.25, 0.4)); } });
        mb2_meta(ctx, bron, x + 28, 444, C.text2, 'left', 28); }));
      laag(ctx, q.on('samen', 2, 0.4), () => { haak(ctx, 110, 1810, 500, '', C.goud, 1); mb2_stempelPlek(ctx, 560, 580, 800, 130, 1 - q.on('stempel', 1, 0.2)); });
      const uS = clamp((t - q.at('stempel', 1)) / 0.5, 0, 1); if (uS < 1) { const dy = uS > 0 ? -40 * (1 - ease(uS)) : -60 * ramp(t, q.at('stempel', 1) - 0.8, 0.6); laag(ctx, q.on('nu', 1, 0.3), () => mb2_stempelDing(ctx, 960, 610 + dy, 1.1)); }
      mb2_afdruk(ctx, 960, 650, 'OORZAAK: CO₂ IN HET WATER', uS, { s: 1.25, rot: -0.06 }); });
    // C: Sam zet de stempel
    laag(ctx, fC, () => { bioloog(ctx, 200, t, { kijk: 1, uit: 'blij' }); sam(ctx, 440, t, { kijk: 1, uit: 'blij', pose: 'wijs' });
      mb2_blad(ctx, 640, 140, 1200, 560, { nr: 'blad 5', titel: 'Bewijs' }); mb2_stempelPlek(ctx, 840, 340, 800, 140, 1 - q.on('stempel', 1, 0.2));
      mb2_afdruk(ctx, 1240, 410, 'OORZAAK: CO₂ IN HET WATER', clamp((t - q.at('stempel', 1)) / 0.5, 0, 1), { s: 1.1, rot: -0.08 }); });
    // D: de kwekerij meet haar water
    laag(ctx, fD, () => { mb2_meta(ctx, 'DE KWEKERIJ NU', 120, 150, C.goud, 'left', 28); const G = mb2_opwelling(ctx, 100, 190, 1100, 600, { u: 0.75, t });
      const mx = (G.kx + G.kust - 40) / 2, my = (G.ky - 20 + G.zee + 30) / 2 - 50; mb2_meter(ctx, mx, my, 44, 0.5 + 0.35 * Math.sin(t * 1.4), q.on('meet', 1, 0.4)); laag(ctx, q.on('meet', 1, 0.4), () => mb2_naam(ctx, 'meter aan de inlaat', '', mx, my - 66, 1, 'center'));
      const st = [['meten', q.on('meet', 1, 0.4)], ['bakken later vullen', q.on('later', 1, 0.4)], ['water aanpassen', q.on('passen', 1, 0.4)]];
      st.forEach(([s2, a], i) => laag(ctx, a, () => { vink_(ctx, 1320, 330 + i * 120, 18, 1, C.groen); text(ctx, s2, 1360, 346 + i * 120, fTekst(44, 700), C.text, 'left'); }));
      mb2_meta(ctx, 'BARTON E.A. 2012 · 2015', 1800, 840, C.text2, 'right', 28); }); },

  // ---------- H4 Wat dit betekent voor de koolstofkringloop ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); mb2_blad(ctx, 80, 140, 1760, 700, { nr: 'laatste blad', titel: 'Wat betekent dit?' });
    const cx = 620, cy = 520; aardeVast(ctx, cx, cy, 150, 1, -30, 25);
    const vak = [['LUCHT', 620, 270, q.on('lucht', 1, 0.4), C.text2], ['LEVEN', 980, 520, q.on('leven', 1, 0.4), C.groen], ['BODEM', 620, 780, q.on('Alles', 1, 0.4), C.oker], ['OCEAAN', 260, 520, q.on('oceaan', 1, 0.4), C.teal]];
    const zuur = q.on('zuurder', 1, 0.5);
    laag(ctx, q.on('rondgaan', 1, 0.5), () => { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.lineDashOffset = -t * 20; ctx.beginPath(); ctx.ellipse(cx, cy, 360, 250, 0, 0, 6.283); ctx.stroke(); ctx.restore(); });
    vak.forEach(([s2, x, y, a, kl]) => laag(ctx, a, () => { roundRect(ctx, x - 120, y - 38, 240, 76, 14); shape(ctx, rgba('#0D1420', 0.9), s2 === 'OCEAAN' && zuur > 0.5 ? C.koraal : kl, 2.5); mb2_meta(ctx, s2, x, y + 10, s2 === 'OCEAAN' && zuur > 0.5 ? C.koraal : kl, 'center', 28); }));
    filmKaartje(ctx, 1220, 160, 'Alles gaat rond', q.on('Alles', 1, 0.4) * (1 - q.on('koolstofput', 1, 0.4)));
    const KP = q.on('koolstofput', 1, 0.6); laag(ctx, KP, () => { ctx.save(); ctx.strokeStyle = C.paars; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(500, 300); ctx.quadraticCurveTo(320, 330, 280, 460); ctx.stroke(); ctx.restore(); pijl(ctx, 296, 420, 272, 478, C.paars, 1, 16, 30); });
    const tZ = q.at('Zonder', 1), tG = q.at('gratis', 1);
    laag(ctx, KP * (1 - ramp(t, tZ - 0.3, 0.3)), () => { termKaart(ctx, 1220, 300, 580, 'koolstofput', ['RUIM 1/4 VAN DE UITSTOOT', 'GLOBAL CARBON BUDGET 2025'], 1, '#B3A6E0'); });
    laag(ctx, ramp(t, tZ, 0.3) * (1 - ramp(t, tG - 0.3, 0.3)), () => { kaart(ctx, 1220, 300, 580, 240, 1, C.line); mb2_meta(ctx, 'ZONDER OCEAAN', 1250, 350, C.text2, 'left', 28); text(ctx, 'meer CO₂ in de lucht', 1250, 410, fTekst(40, 800), C.text, 'left');
      for (let i = 0; i < 6; i++) mb2_co2(ctx, 1280 + i * 84, 480, 14, { a: 0.5 }); ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; roundRect(ctx, 1250, 450, 520, 60, 10); ctx.stroke(); ctx.restore(); });
    laag(ctx, ramp(t, tG, 0.4), () => { kaart(ctx, 1220, 300, 580, 160, 1, C.koraal); mb2_meta(ctx, 'PRIJS', 1250, 350, C.koraal, 'left', 28); text(ctx, 'zuurder water', 1250, 420, fTekst(48, 800), C.koraal, 'left'); });
    vraagteken(ctx, 1510, 640, q.on('zwaar', 1, 0.4), 110); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: nee, sommige soorten bouwen juist meer kalk', 1);
    const tL = q.at('larven', 1), T = 1 - ramp(t, tL - 0.4, 0.3), Lz = ramp(t, tL, 0.4);
    // achttien soorten (Ries e.a. 2009): 10 minder, 7 meer, 1 gelijk
    laag(ctx, T, () => { mb2_meta(ctx, 'PROEF MET 18 SOORTEN · RIES E.A. 2009', 120, 230, C.text2, 'left', 28);
      const soort = ['o', 'o', 's', 's', 'e', 'e', 'k', 'k', 's', 'o', 'c', 'c', 'c', 'r', 'r', 'r', 'c', 'm'];
      const Ten = q.on('tien', 2, 0.4), Kr = q.on('Krabben', 1, 0.4);
      soort.forEach((sp, i) => { const a = q.on('achttien', 1, 0.3 + i * 0.04); const x = 120 + (i % 6) * 135, y = 260 + Math.floor(i / 6) * 135; const p = i < 10 ? (Ten > 0.5 ? 'neer' : null) : i < 17 ? (Kr > 0.5 ? 'op' : null) : (Kr > 0.5 ? 'gelijk' : null);
        mb2_tegel(ctx, x, y, 120, (c, ix, iy) => { if (sp === 'o') mb2_oester(c, ix, iy - 4, 0.36); else if (sp === 's') mb2_schelpje(c, ix, iy - 8, 0.9); else if (sp === 'e') mb2_zeeEgel(c, ix, iy - 8, 0.9); else if (sp === 'k') mb2_koraal(c, ix, iy + 16, 0.36); else if (sp === 'c') mb2_krab(c, ix, iy, 0.5); else if (sp === 'r') { c.save(); c.translate(ix + 8, iy); c.rotate(-0.5); mb2_kreeft(c, 0, 0, 0.42); c.restore(); } else mb2_mossel(c, ix, iy, 0.4); }, p, { a }); });
      laag(ctx, Ten, () => text(ctx, '10 minder kalk', 120, 700, fTekst(40, 800), C.koraal, 'left')); laag(ctx, Kr, () => text(ctx, '7 meer · 1 gelijk', 520, 700, fTekst(40, 800), C.groen, 'left')); });
    laag(ctx, Lz, () => { mb2_zoom(ctx, 480, 460, 220, 480, 460, '', 1, () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(260, 240, 440, 440); mb2_larve(ctx, 480, 500, 110, { u: 1, t }); });
      text(ctx, 'larven van weekdieren', 480, 740, fTekst(40, 800), C.koraal, 'center'); mb2_meta(ctx, 'EXTRA GEVOELIG · KROEKER E.A. 2013', 480, 784, C.koraal, 'center', 28); });
    // het Yerseke-blaadje
    laag(ctx, q.on('Dichter', 1, 0.5), () => { roundRect(ctx, 1000, 220, 820, 470, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
      mb2_meta(ctx, 'MINDER KALK BIJ VEEL CO₂', 1040, 276, '#3E4658', 'left', 28);
      mb2_mossel(ctx, 1160, 380, 0.7); mb2_oester(ctx, 1160, 540, 0.5, { rot: -1.4 });
      const M = q.on('mossel', 1, 0.8), O = q.on('oester', 1, 0.8), bw = 280;
      roundRect(ctx, 1280, 352, bw * 0.25 / 0.3 * M, 56, 8); shape(ctx, rgba(C.koraal, 0.8), C.koraal, 2); text(ctx, 'mossel −25 %', 1300 + bw * 0.25 / 0.3 * M, 392, fTekst(38, 800), '#2A3446', 'left');
      roundRect(ctx, 1280, 512, bw * 0.1 / 0.3 * O, 56, 8); shape(ctx, rgba(C.koraal, 0.8), C.koraal, 2); text(ctx, 'oester −10 %', 1300 + bw * 0.1 / 0.3 * O, 552, fTekst(38, 800), '#2A3446', 'left');
      mb2_meta(ctx, 'DALING VAN DE EIGEN KALKBOUW', 1040, 630, '#3E4658', 'left', 28); mb2_meta(ctx, 'GAZEAU E.A. 2007 · YERSEKE (NU NIOZ)', 1040, 664, '#3E4658', 'left', 28); });
    laag(ctx, q.on('soort', 2, 0.5), () => haak(ctx, 1000, 1820, 700, 'één soort zegt niet alles', C.groen, 1)); },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); const P = 1 - ramp(t, q.at('koolzuur', 1) - 0.6, 0.4);
    laag(ctx, P, () => { kaart(ctx, 260, 260, 1400, 300, 1, C.goud); mb2_meta(ctx, 'HET DOSSIER', 310, 320, C.goud, 'left', 28); text(ctx, 'Waarom is CO₂ in zee slecht nieuws', 310, 410, fTekst(56, 800), C.text, 'left'); text(ctx, 'voor een oester?', 310, 480, fTekst(56, 800), C.text, 'left'); mb2_oester(ctx, 1500, 420, 0.9, { rot: -0.2 }); });
    const W = 540, Hh = 300, X = [120, 690, 1260], Y = [150, 500];
    const tg = [[q.on('koolzuur', 1, 0.4), 'CO₂ → KOOLZUUR → H⁺', (x, y) => { mb2_co2(ctx, x + 100, y + 170, 18); pijl(ctx, x + 160, y + 170, x + 210, y + 170, C.line, 1, 3, 12); mb2_koolzuur(ctx, x + 280, y + 170, 18, { los: 0.6 }); pijl(ctx, x + 370, y + 170, x + 420, y + 170, C.line, 1, 3, 12); mb2_hplus(ctx, x + 470, y + 170, 18); }],
      [q.on('carbonaat', 1, 0.4), 'H⁺ PAKT CARBONAAT WEG', (x, y) => { mb2_kalkrand(ctx, x, y + Hh, W, 30, { bs: 40, rijen: 2, gat: [4, 5] }); mb2_carbonaat(ctx, x + 270, y + 140, 20, { h: 1 }); mb2_naam(ctx, 'minder bouwstof', '', x + 270, y + 222, 1, 'center', C.koraal); }],
      [q.on('basisch', 1, 0.4), 'BASISCH · MINDER BASISCH', (x, y) => { mb2_phLiniaal(ctx, x + 40, y + 110, W - 80, { wijzer: 8.1, labels: 0 }); }],
      [q.on('larve', 1, 0.4), 'DE LARVE MERKT HET EERST', (x, y) => { mb2_zoom(ctx, x + 270, y + 170, 110, x + 270, y + 170, '', 1, () => { ctx.fillStyle = MB2.waterD; ctx.fillRect(x + 150, y + 50, 240, 240); mb2_larve(ctx, x + 270, y + 190, 64, { u: 1, t }); }); }],
      [q.on('controlegroep', 1, 0.4), 'PROEF MET CONTROLEGROEP', (x, y) => { mb2_bak(ctx, x + 60, y + 100, 140, 110, { n: 8, t }); mb2_bak(ctx, x + 230, y + 100, 140, 110, { n: 8, dood: 7, co2: 0.8 }); mb2_afdruk(ctx, x + 300, y + 260, 'OORZAAK', 1, { s: 0.8 }); }],
      [q.on('zee', 2, 0.4), 'DE ZEE ALS KOOLSTOFPUT', (x, y) => { aardeVast(ctx, x + 150, y + 160, 80, 1, -30, 25); pijl(ctx, x + 340, y + 80, x + 250, y + 150, C.paars, 1, 10, 22); mb2_meta(ctx, 'PRIJS: ZUURDER WATER', x + 520, y + 284, C.koraal, 'right', 28); }]];
    tg.forEach(([a, kop, fn], i) => recapTegel(ctx, X[i % 3], Y[Math.floor(i / 3)], W, Hh, kop, a * (1 - P), fn)); },

  s24(ctx, t, q) { bg(ctx, 'schema'); const tD = q.at('Daarna', 2), A = 1 - ramp(t, tD - 0.4, 0.3), B = ramp(t, tD, 0.3);
    laag(ctx, A, () => { roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); mb2_meta(ctx, '2026', 700, 176, C.grain, 'right', 28);
      mb2_opleiding(ctx, 100, 250, 1100, 'WO · 3 JAAR · ENGELSTALIG', 'Marine Sciences', 'WAGENINGEN', q.on('Marine', 1, 0.5), C.teal);
      mb2_opleiding(ctx, 100, 430, 1100, 'WO · BACHELOR + MASTER', 'Biologie → master Marine Biology', 'GRONINGEN', q.on('Groningen', 1, 0.5), C.teal);
      mb2_opleiding(ctx, 100, 610, 1100, 'HBO · 4 JAAR', 'Kust- en zeemanagement', 'LEEUWARDEN', q.on('hbo', 1, 0.5), C.groen);
    });
    if (A > 0.5) { sam(ctx, 1420, t, { kijk: 1, uit: 'blij' }); bioloog(ctx, 1680, t, { kijk: -1, uit: 'blij' }); }
    laag(ctx, B, () => { mb2_meta(ctx, 'DAARNA DOE JE ONDERZOEK', 120, 200, C.goud, 'left', 28);
      [['schip', 'op zee', 'zee'], ['wad', 'op het wad', 'wad'], ['lab', 'in het lab', 'lab']].forEach(([d, lab, cue], i) => mb2_plekKaart(ctx, d, 120 + i * 570, 260, 540, lab, 1)); }); }
});
