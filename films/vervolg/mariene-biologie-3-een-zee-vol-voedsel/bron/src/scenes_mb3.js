// Wat word jij? · Mariene biologie 3 · Een zee vol voedsel: de Waddenzee — scènes per alinea (v1.0, 7 nov 2026).
// Look: Schema met cast (Sam, stagiair, outfit 'buiten'; de mariene bioloog, outfit 'boord'; mosselkweker = figurant Joost, naamloos).
// Geen namen in beeld. Decor 'wad' alleen onder scènes die op het wad spelen (cold open, H1 schep, H2 emmers, H3 terugkomst, H4 kotter,
// bioloog met tablet, recap-opening). Doorsneden, piramide, grafiek, emmer-close-ups op navy.
// Keuzes Kamiel (7 nov 2026): som met label 'VUISTREGEL · ONGEVEER'; stopwatch zonder getal; hoofdstuktitel H2 blijft.

function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'buiten', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function bio(ctx, x, t, o = {}) { return persoon(ctx, 'marien', x, o.y || GROND, o.h || 430, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: 'boord', a: o.a == null ? 1 : o.a, hold: o.hold }); }
// zwerm kanoeten in vlucht langs een baan; u 0..1 = positie op de baan
function zwerm(ctx, t, x0, y0, x1, y1, u, o = {}) { const { n = 9, s = 3.2, a = 1, kijk = x1 < x0 ? -1 : 1, spreid = 1 } = o; if (a <= 0.01) return;
  const dx0 = 34 * s * spreid, dy0 = 22 * s * spreid, kol = Math.ceil(Math.sqrt(n * 1.6)); // ± 1,3 vogellengte uit elkaar, geen overlap
  for (let i = 0; i < n; i++) { const c = i % kol, r = Math.floor(i / kol); const dx = (c - (kol - 1) / 2) * dx0 + (r % 2) * dx0 * 0.5 + (hash(i * 3.7) - 0.5) * dx0 * 0.25, dy = (r - 1) * dy0 + (hash(i * 5.1) - 0.5) * dy0 * 0.3, g = wander(i, t, 3, 0.5);
    mb3_kanoetVlieg(ctx, lerp(x0, x1, u) + dx + g.x, lerp(y0, y1, u) + dy + g.y, s, t * 3.2 + hash(i * 9.3) * 1.0, { kijk, a }); } }
// een rij staande kanoeten (op het wad)
function kanoetRij(ctx, t, x, y, n, s, o = {}) { const { a = 1, gap = 150, pik = true } = o; if (a <= 0.01) return;
  for (let i = 0; i < n; i++) mb3_vogel(ctx, 'kanoet', x + i * gap + (hash(i * 2.2) - 0.5) * 40, y + (i % 2) * 18, s, { a, kijk: i % 3 === 1 ? -1 : 1, pik: pik ? Math.max(0, Math.sin(t * 1.3 + i * 1.7)) * 0.9 : 0 }); }
function kaartTekst(ctx, x, y, w, h, kop, regels, a = 1, rand = C.line, kopKl = C.goud) { if (a <= 0.01) return; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x + 28, y + 100 + i * 46, fTekst(36, 700), C.text, 'left')); }); }

Object.assign(SCENES, {
  title(ctx, t) { zwerm(ctx, t, 1700, 300, 1450, 260, clamp(t / 6, 0, 1), { n: 7, s: 3, kijk: -1 }); mb3_kokkel(ctx, 1620, 720, 30, { L: 3 }); mb3_kokkel(ctx, 1500, 750, 30, { L: 2.2, rot: 0.4 }); mb3_nonnetje(ctx, 1730, 760, 30, { L: 1.8 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'wad', 0.6); const Bn = q.on('Beneden', 1, 0.6), Vr = q.on('Waarom', 1, 0.5);
    laag(ctx, 1 - Vr, () => {
      zwerm(ctx, t, 1900, 260, 520, 330, clamp(t / 9, 0, 1), { n: 11, s: 3.4, kijk: -1 });
      metaA(ctx, 'TOENDRA → WAD', 1500, 160, q.on('toendra', 1, 0.4) * (1 - Bn), C.grain, 'center', 28);
      laag(ctx, Bn, () => { mb3_kotter(ctx, 1180, 650, 20, { geul: 1, zaai: q.on('zaait', 1, 0.5), t, figuur: (fx, fy) => persoon(ctx, 'joost', fx, fy, 80, { t, kijk: -1 }) });
        metaText(ctx, 'MOSSELKWEKER', 1180, 730, C.grain, 'center', 28); });
      laag(ctx, q.on('Beneden', 1, 0.3), () => { bio(ctx, 300, t, { h: 230, kijk: 1, uit: 'neutraal' }); sam(ctx, 400, t, { h: 230, kijk: 1 }); });
      laag(ctx, q.on('meer', 1, 0.4), () => tag(ctx, '+ MEER MOSSELEN', 1180, 520, C.oker, 1, 'center', 30));
      laag(ctx, q.on('Vogelonderzoekers', 1, 0.4), () => tag(ctx, 'EN DE VOGELS?', 660, 520, C.goud, 1, 'center', 30)); });
    laag(ctx, Vr, () => { kaart(ctx, 200, 240, 1300, 360, 1, C.goud); text(ctx, 'Meer mosselen in de Waddenzee:', 250, 350, fTekst(54, 800), C.text, 'left'); text(ctx, 'wat betekent dat voor de vogels?', 250, 430, fTekst(54, 800), C.text, 'left');
      metaText(ctx, 'MOSSELKWEEK · KOKKELS · KANOET', 250, 520, C.goud, 'left', 28); vraagteken(ctx, 1400, 540, 1, 130); mb3_vogel(ctx, 'kanoet', 1640, 760, 9, { kijk: -1 }); }); },

  // ---------- H1 Het voedselweb van het wad ----------
  s03(ctx, t, q) { decor(ctx, 'wad', 0.6); const L = q.on('laag', 1, 0.6), Hv = q.on('Hoe', 1, 0.5);
    laag(ctx, 1 - L, () => zwerm(ctx, t, 1700, 200, 900, 420, clamp(t / 7, 0, 1), { n: 12, s: 4, kijk: -1 }));
    laag(ctx, q.on('trekken', 1, 0.4) * (1 - L), () => { tag(ctx, 'TREKVOGEL · TOENDRA → WAD', 520, 260, C.teal, 1, 'center', 32); });
    laag(ctx, q.on('miljoen', 1, 0.4) * (1 - Hv), () => { kaart(ctx, 120, 330, 760, 120, 1, C.goud); text(ctx, '10–12 miljoen vogels per jaar', 150, 405, fTekst(44, 800), C.goud, 'left'); });
    metaA(ctx, 'WERELDERFGOED WADDENZEE', 150, 500, q.on('grootste', 1, 0.4) * (1 - Hv), C.grain, 'left', 28);
    laag(ctx, L * (1 - Hv), () => { kanoetRij(ctx, t, 760, 800, 6, 6.5, { gap: 190 });
      for (let i = 0; i < 5; i++) mb3_nonnetje(ctx, 700 + i * 230, 840, 9, { L: 2, a: q.on('Nonnetjes', 1, 0.4) });
      for (let i = 0; i < 5; i++) mb3_kokkel(ctx, 820 + i * 220, 845, 9, { L: 2.5, a: q.on('kokkels', 1, 0.4), rot: 0.2 * i });
      naamBij(ctx, 'nonnetje', '± 2 CM', 700, 790, q.on('Nonnetjes', 1, 0.4), 'center'); naamBij(ctx, 'jonge kokkel', '', 1480, 790, q.on('kokkels', 1, 0.4), 'center'); });
    laag(ctx, Hv, () => { mb3_vogel(ctx, 'kanoet', 900, 820, 16, { kokkel: 1 }); vraagteken(ctx, 1500, 520, 1, 150); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: je slikt hem met schelp en al door', 1);
    lijn(ctx, [[160, 800], [1100, 800]], C.line, 2); const Sl = ramp(t, 0.6, 1.6);
    mb3_vogel(ctx, 'kanoet', 640, 800, 18, { kokkel: 1, slik: Sl });
    zoomCircle(ctx, 1400, 440, 220, 590, 715, 'SPIERMAAG', q.on('spiermaag', 1, 0.4), () => mb3_spiermaag(ctx, 1400, 440, 220, { kraak: q.on('kraakt', 1, 0.6) })); },

  s06(ctx, t, q) { const B = q.on('kokkel', 1, 0.6), Vb = q.on('begint', 1, 0.5);
    if (B < 1) decor(ctx, 'wad', 0.6 * (1 - B)); else bg(ctx, 'schema');
    laag(ctx, 1 - B, () => { const st = q.on('schep', 1, 0.8);
      bio(ctx, 760, t, { kijk: 1, pose: q.on('Kijk', 1) > 0.5 ? 'wijs' : 'vasthouden', hold: q.on('Kijk', 1) > 0.5 ? null : (c, hx, hy) => mb3_schep(c, hx, hy - 60 * (1 - st), 0.9, st) });
      sam(ctx, 1150, t, { kijk: -1, uit: q.on('stagiair', 1) > 0.5 ? 'blij' : 'neutraal' }); });
    laag(ctx, B, () => { const S = 12, Y = 380; mb3_bodem(ctx, 160, Y, 1600, 470, { bruin: 0.6 });
      metaText(ctx, 'HET SLIK IN DOORSNEDE', 160, 330, C.text2, 'left', 28); metaText(ctx, '± 25 CM', 1760, 330, C.text2, 'right', 28);
      mb3_kokkel(ctx, 560, Y + 2.2 * S, S, { L: 3.5, open: 0.8 });  naam28(ctx, 'kokkel', '', 560, Y + 120, 1);
      laag(ctx, q.on('nonnetje', 1, 0.4), () => { mb3_nonnetje(ctx, 840, Y + 11 * S, S, { L: 2, sifon: 1 }); naam28(ctx, 'nonnetje', 'dieper', 840, Y + 210, 1); });
      laag(ctx, q.on('hoopjes', 1, 0.4), () => { mb3_wadpier(ctx, 1300, Y, S, { t, eet: q.on('eet', 1, 0.6) }); naam28(ctx, 'wadpier', 'U-gang met hoopje', 1300, Y + 380, q.on('wadpier', 1, 0.4)); });
      laag(ctx, Vb, () => { pijl(ctx, 560, Y + 140, 560, Y + 300, C.goud, 1, 5, 20); tag(ctx, 'WAAR KOMT DIT VANDAAN?', 960, 250, C.goud, 1, 'center', 34); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: bij algen op de platen en in het water', 1);
    const Lb = q.on('laagje', 1, 0.5), Zw = q.on('zweven', 1, 0.5), Zv = q.on('zeven', 1, 0.5), No = q.on('nonnetje', 1, 0.5), En = q.on('energie', 1, 0.6);
    zoomCircle(ctx, 360, 470, 190, 360, 470, 'ALGEN OP DE PLAAT', Lb, () => mb3_kiezelwieren(ctx, 360, 470, 190, t));
    zoomCircle(ctx, 1560, 470, 190, 1560, 470, 'ALGEN IN HET WATER', Zw, () => mb3_plankton(ctx, 1560, 470, 190, t));
    laag(ctx, q.on('producenten', 1, 0.5), () => tag(ctx, 'PRODUCENTEN', 960, 820, C.groen, 1, 'center', 34));
    laag(ctx, Zv, () => { mb3_kokkel(ctx, 1040, 560, 22, { L: 3 }); mb3_mossel(ctx, 1240, 560, 18, { L: 5 }); metaText(ctx, 'KOKKEL', 1030, 640, C.text2, 'center', 28); metaText(ctx, 'MOSSEL', 1250, 640, C.text2, 'center', 28);
      pijl(ctx, 1370, 520, 1280, 540, C.groen, 1, 4, 16); pijl(ctx, 1370, 520, 1090, 545, C.groen, 1, 4, 16); });
    laag(ctx, No, () => { mb3_nonnetje(ctx, 760, 560, 24, { L: 2 }); metaText(ctx, 'NONNETJE', 760, 640, C.text2, 'center', 28); pijl(ctx, 550, 520, 715, 550, C.groen, 1, 4, 16); });
    laag(ctx, En, () => { mb3_vogel(ctx, 'kanoet', 960, 360, 7, {}); metaText(ctx, 'KANOET', 960, 400, C.text2, 'center', 28);
      pijl(ctx, 780, 520, 900, 380, C.oker, 1, 4, 16); pijl(ctx, 1030, 520, 990, 385, C.oker, 1, 4, 16); metaText(ctx, 'NIOZ, RUG, UU 2017', 960, 230, C.grain, 'center', 28); }); },

  // ---------- H2 Filteraars ----------
  s09(ctx, t, q) { const E = q.on('emmers', 1, 0.6), Hv = q.on('Hoeveel', 1, 0.5);
    if (E < 1) { bg(ctx, 'schema'); laag(ctx, 1 - E, () => { const Y = 640, wat = 320 * ramp(t, 0.2, 3.5), Op = q.on('open', 1, 0.8), Fi = q.on('filteraars', 1, 0.5);
      mb3_bodem(ctx, 0, Y, W, 230, { water: wat, groen: 1, t, golf: 5 });
      zwerm(ctx, t, 900, 220, 100, 140, clamp(t / 5, 0, 1), { n: 8, s: 3, kijk: -1, a: 1 - ramp(t, 4, 1) });
      metaA(ctx, 'HET WATER KOMT OP', 1800, 200, 1 - Fi, C.teal, 'right', 28);
      for (let i = 0; i < 4; i++) mb3_kokkel(ctx, 360 + i * 230, Y + 22, 22, { L: 3.2, open: Op, rot: (i % 2) * 0.15 });
      mb3_mosselbank(ctx, 1450, Y + 8, 360, 14, { n: 9, open: Op, seed: 5 });
      laag(ctx, Fi, () => { for (const x of [360, 820]) { pijl(ctx, x + 60, Y - 160, x + 30, Y - 60, C.teal, 1, 4, 14); pijl(ctx, x + 50, Y - 60, x + 100, Y - 170, rgba(C.teal, 0.6), 1, 4, 14); }
        naam28(ctx, 'filteraar', 'zeeft algen uit het water', 960, 200, 1); }); }); }
    else decor(ctx, 'wad', 0.6);
    laag(ctx, E, () => { if (E < 1) decor(ctx, 'wad', 0.6 * E);
      bio(ctx, 560, t, { kijk: 1, pose: 'wijs', uit: 'blij' });
      const em = (x, n, lab, a) => laag(ctx, a, () => { mb3_emmer(ctx, x, 850, 120, { groen: 1, n, t }); metaText(ctx, lab, x, 650, C.text, 'center', 28); });
      em(860, 0, 'A · ZONDER', 1); em(1140, 7, 'B · MET MOSSELEN', q.on('handvol', 1, 0.4));
      sam(ctx, 1480, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => mb3_stopwatch(c, hx + 2, hy - 24, 24, t) });
      laag(ctx, Hv, () => { mb3_mossel(ctx, 960, 400, 30, { L: 5, open: 1 }); vraagteken(ctx, 1150, 440, 1, 130); metaText(ctx, 'LITER PER UUR?', 960, 520, C.goud, 'center', 28); }); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: een paar liter per uur', 1);
    const Em = q.on('emmer', 1, 0.6), St = q.on('stagiair', 1, 0.6);
    laag(ctx, 1 - Em, () => { const v = 0.83 * ramp(t, q.at('liter', 1) - 0.2, 2.5);
      mb3_maatbeker(ctx, 520, 760, 180, 420, v, { label: q.on('vijf', 2) > 0.5 ? '5 L' : '' }); metaText(ctx, 'PER UUR', 520, 820, C.goud, 'center', 28);
      laag(ctx, q.on('centimeter', 1, 0.4), () => { mb3_mossel(ctx, 1050, 420, 50, { L: 5 }); lijn(ctx, [[925, 520], [1175, 520]], C.line, 2); metaText(ctx, '5 CM', 1050, 560, C.text2, 'center', 28);
        metaText(ctx, 'LAB, MOSSEL 5 CM · RIISGÅRD 2011', 1050, 640, C.grain, 'center', 28); });
      laag(ctx, q.on('dag', 1, 0.4), () => { kaart(ctx, 1320, 300, 480, 150, 1, C.teal); metaText(ctx, 'PER DAG', 1350, 350, C.teal, 'left', 28); text(ctx, 'tot tientallen liters', 1350, 410, fTekst(40, 800), C.text, 'left'); }); });
    laag(ctx, Em * (1 - St), () => { const u = ramp(t, q.at('emmer', 1), 3.5);
      mb3_emmer(ctx, 640, 780, 300, { groen: 1, t }); metaA(ctx, 'A · ZONDER', 640, 330, 1 - q.on('zeef', 1, 0.3), C.text, 'center', 28);
      mb3_emmer(ctx, 1160, 780, 300, { groen: 1 - 0.85 * u, n: 7, t }); metaA(ctx, 'B · MET MOSSELEN', 1160, 330, 1 - q.on('zeef', 1, 0.3), C.text, 'center', 28);
      mb3_stopwatch(ctx, 1560, 520, 70, t);
      laag(ctx, q.on('zeef', 1, 0.4), () => tag(ctx, 'MOSSELBANK = EEN GROTE ZEEF', 900, 330, C.teal, 1, 'center', 34)); });
    laag(ctx, St, () => { const u = ramp(t, q.at('stagiair', 1), 4); const n = Math.round(7 + 33 * u);
      mb3_emmer(ctx, 900, 790, 380, { groen: 0.15 + 0.85 * u, n, t }); // tijdens vraag 4 groen houden (vers zeewater met elke schep mosselen): geen voorzegging metaText(ctx, 'B · STEEDS MEER MOSSELEN', 900, 300, C.text, 'center', 28);
      laag(ctx, q.on('gebeurt', 1, 0.4), () => vraagteken(ctx, 1450, 520, 1, 130)); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ze hebben minder te eten', 1);
    const Me = q.on('Metingen', 1, 0.5), Le = q.on('leeg', 1, 0.8), Gt = q.on('getij', 1, 0.5);
    const bed = (x, n, L, kop, sub, kl, groen) => { const w = 760, Y = 640; ctx.save(); ctx.beginPath(); ctx.rect(x, 250, w, 600); ctx.clip();
      mb3_bodem(ctx, x, Y, w, 190, { water: 360, groen, t }); ctx.restore();
      for (let i = 0; i < n; i++) mb3_kokkel(ctx, x + 50 + (i + 0.5) * (w - 100) / n + (hash(i) - 0.5) * 12, Y + 14, 22, { L, open: 1, rot: (hash(i * 3) - 0.5) * 0.3 });
      text(ctx, kop, x + w / 2, 230, fTekst(38, 800), kl, 'center'); metaText(ctx, sub, x + w / 2, Y + 160, C.text2, 'center', 28); };
    laag(ctx, Me, () => { bed(120, 16, 1.6, 'veel kokkels', 'KLEIN · TRAGERE GROEI', C.koraal, 1 - 0.85 * Le); bed(1040, 5, 3.4, 'minder kokkels', 'GROTER', C.oker, 1);
      metaText(ctx, 'WMR 2018', 960, 868, C.grain, 'center', 28);
      laag(ctx, Le, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.strokeRect(122, 282, 756, 356); metaText(ctx, 'ALGEN OP', 500, 330, C.koraal, 'center', 28); });
      laag(ctx, Gt, () => { for (let i = 0; i < 3; i++) { const x0 = 130 + ((t * 120 + i * 260) % 700); pijl(ctx, x0, 380 + i * 70, x0 + 70, 380 + i * 70, C.teal, 0.8, 3, 12); } metaText(ctx, 'GETIJ VOERT NIEUW WATER AAN', 500, 600, C.teal, 'center', 28); }); });
    laag(ctx, q.on('gedeeld', 1, 0.5), () => tag(ctx, 'HET VOEDSEL IS GEDEELD', 960, 160, C.goud, 1, 'center', 34)); },

  // ---------- H3 Energie en de piramide ----------
  s14(ctx, t, q) { const P = q.on('tienduizend', 1, 0.6);
    if (P < 1) decor(ctx, 'wad', 0.6 * (1 - P)); else bg(ctx, 'schema');
    laag(ctx, 1 - P, () => { const u = clamp(t / 3, 0, 1); zwerm(ctx, t, 200, 220, 700, 420, u, { n: 7, s: 4, kijk: 1, a: 1 - ramp(t, 2.6, 0.6) });
      kanoetRij(ctx, t, 560, 800, 6, 6.5, { gap: 190, a: ramp(t, 2.6, 0.6) });
      laag(ctx, q.on('vet', 1, 0.4), () => tag(ctx, 'VET OPBOUWEN VOOR DE TREK', 960, 240, C.oker, 1, 'center', 32));
      laag(ctx, q.on('Alles', 1, 0.4), () => filmKaartje(ctx, 120, 330, 'Alles gaat rond · ± een tiende per stap', 1)); });
    laag(ctx, P, () => { metaText(ctx, 'ENERGIE PER JAAR', 120, 200, C.goud, 'left', 28); metaText(ctx, 'VUISTREGEL · ONGEVEER', 1800, 200, C.text2, 'right', 28);
      mb3_piramide(ctx, 860, 800, { a: [1, q.on('kokkels', 1, 0.4), q.on('eten', 1, 0.4)], kj: ['10.000 kJ', '?', '?'], kjA: [1, 1, 1] }); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: zo’n honderd kilojoule', 1);
    const D = q.on('duizend', 2, 0.4), Ho = q.on('honderd', 1, 0.4), Wa = q.on('warmte', 1, 0.5), Po = q.on('poep', 1, 0.5), Br = q.on('breed', 1, 0.5);
    metaText(ctx, 'ENERGIE PER JAAR', 120, 200, C.goud, 'left', 28); metaText(ctx, 'VUISTREGEL · ONGEVEER', 1800, 200, C.text2, 'right', 28);
    somRegel(ctx, '10.000 kJ', 120, 280, 1, C.groen, 46); somRegel(ctx, '→ 1.000 kJ', 370, 280, D, C.oker, 46); somRegel(ctx, '→ 100 kJ', 650, 280, Ho, C.goud, 46);
    mb3_piramide(ctx, 860, 800, { kj: ['10.000 kJ', '1.000 kJ', '100 kJ'], kjA: [1, D, Ho], hl: Br > 0.5 ? 0 : -1 });
    laag(ctx, q.on('scholeksters', 1, 0.5), () => { mb3_vogel(ctx, 'kanoet', 640, 440, 5, {}); mb3_vogel(ctx, 'scholekster', 1080, 440, 4, { kijk: -1 }); });
    laag(ctx, Wa, () => { for (const [x, y] of [[1150, 560], [1520, 720], [1020, 470]]) { ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 20; k++) ctx.lineTo(x + k * 9, y - k * 4 + Math.sin(k * 0.9 + t * 3) * 6); ctx.stroke(); ctx.restore(); pijl(ctx, x + 170, y - 76, x + 190, y - 86, C.koraal, 1, 4, 14); }
      text(ctx, 'WARMTE', 1600, 430, fTekst(36, 800), C.koraal, 'center'); });
    laag(ctx, Po, () => { ctx.fillStyle = rgba(MB3.slik, 0.95); ctx.fillRect(160, 818, 1400, 50); text(ctx, 'BODEM · POEP EN DODE RESTEN', 860, 854, fTekst(30, 800), C.oker, 'center'); pijl(ctx, 290, 700, 330, 812, C.oker, 1, 4, 16); pijl(ctx, 1440, 700, 1400, 812, C.oker, 1, 4, 16); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const Tt = q.on('2005', 1, 0.6);
    laag(ctx, 1 - Tt, () => { lijn(ctx, [[160, 800], [800, 800]], C.line, 2); mb3_vogelWeeg(ctx, 470, 800, 11, { t }); tag(ctx, 'VET VOOR DE TREK', 470, 420, C.oker, 1, 'center', 30);
      laag(ctx, q.on('vlees', 1, 0.5), () => { mb3_balans(ctx, 1350, 360, 520, 0, (x, y) => mb3_kokkelVlees(ctx, x, y - 34, 26, 1, { L: 3 }), (x, y) => mb3_kokkelVlees(ctx, x, y - 34, 26, 0.2, { L: 3 }));
        metaText(ctx, 'VEEL VLEES', 1090, 280, C.oker, 'center', 28); metaText(ctx, 'WEINIG VLEES', 1610, 280, C.koraal, 'center', 28); metaText(ctx, 'EVEN GROTE KOKKELS', 1350, 660, C.text2, 'center', 28); }); });
    laag(ctx, Tt, () => { kaart(ctx, 120, 200, 600, 120, 1, C.koraal); metaText(ctx, 'TOT 2005', 150, 248, C.koraal, 'left', 28); text(ctx, 'kokkels opgezogen (zuigkor)', 150, 300, fTekst(36, 700), C.text, 'left');
      laag(ctx, 1 - q.on('Rond', 1, 0.5), () => { mb3_bodem(ctx, 160, 700, 1600, 140, {}); for (let i = 0; i < 14; i++) mb3_kokkel(ctx, 220 + i * 110, 720, 18, { L: 2.6, a: i < 8 ? 1 : 1 - ramp(t, 5.5 + (13 - i) * 0.25, 0.4) }); mb3_kotter(ctx, 1450, 520, 14, { t }); lijn(ctx, [[1200, 540], [1260, 708]], '#AFB6C0', 10); metaText(ctx, 'ZUIGKOR', 1260, 440, C.koraal, 'center', 28); });
      laag(ctx, q.on('Rond', 1, 0.5), () => { metaText(ctx, 'BEVISTE PLEKKEN · AANTAL KOKKELS', 120, 420, C.text2, 'left', 28);
        [['1998', 480], ['2002', 620]].forEach(([j, y], r) => { if (r && q.on('evenveel', 1) < 0.01) return; metaText(ctx, j, 120, y + 10, C.text2, 'left', 28); for (let i = 0; i < 10; i++) mb3_kokkel(ctx, 270 + i * 72, y, 20, { L: 2.8 }); });
        text(ctx, '=', 1050, 580, fTitel(90), C.oker, 'center'); });
      laag(ctx, q.on('kanoeten', 1, 0.5), () => { mb3_vogel(ctx, 'kanoet', 1450, 720, 12, { kijk: -1 }); metaText(ctx, 'KANOETEN', 1450, 770, C.koraal, 'center', 28); text(ctx, '↓', 1650, 560, fTitel(110), C.koraal, 'center'); });
      laag(ctx, q.on('wogen', 1, 0.5), () => vraagteken(ctx, 1200, 400, 1, 120)); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder vlees per schelp', 1); const Z = q.on('zagen', 1, 0.6);
    laag(ctx, 1 - Z, () => { // eerlijke index-as: 1998 = 100 %; aantal vlak, vlees ± 11 %/jaar → ± 63 % in 2002 (Van Gils e.a. 2006)
      const gx = 260, gy = 250, gw = 660, gh = 420, Y = (pc) => gy + gh - gh * pc / 120;
      metaText(ctx, 'BEVISTE GEBIEDEN · T.O.V. 1998', 160, 230, C.text2, 'left', 28);
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      [0, 50, 100].forEach(pc => { metaText(ctx, pc + ' %', gx - 16, Y(pc) + 10, C.text2, 'right', 28); ctx.fillStyle = C.line; ctx.fillRect(gx - 8, Y(pc) - 1, 8, 2); });
      ['1998', '2000', '2002'].forEach((j, i) => metaText(ctx, j, gx + 20 + i * 300, gy + gh + 40, C.text2, 'center', 28)); metaText(ctx, 'JAAR', gx + gw, gy + gh + 84, C.text2, 'right', 28);
      const u = ramp(t, 0.4, 2.5), X = (f) => gx + 20 + 600 * f;
      lijn(ctx, [[X(0), Y(100)], [X(u), Y(100)]], C.oker, 5); laag(ctx, u, () => metaText(ctx, 'AANTAL KOKKELS', X(1), Y(100) - 20, C.oker, 'right', 28));
      lijn(ctx, Array.from({ length: 21 }, (_, k) => { const f = u * k / 20; return [X(f), Y(100 * Math.pow(0.887, 4 * f))]; }), C.koraal, 5); laag(ctx, u, () => metaText(ctx, 'VLEES PER GRAM SCHELP', X(1), Y(63) + 50, C.koraal, 'right', 28));
      metaText(ctx, 'VAN GILS 2006 · ± 11 % PER JAAR', 160, 830, C.grain, 'left', 28);
      laag(ctx, q.on('kraken', 1, 0.4), () => mb3_vogel(ctx, 'kanoet', 1120, 820, 8, {}));
      zoomCircle(ctx, 1480, 420, 200, 1104, 790, 'SPIERMAAG', q.on('spiermaag', 1, 0.4), () => mb3_spiermaag(ctx, 1480, 420, 200, { groot: ramp(t, q.at('spiermaag', 1), 2), kraak: 1 }));
      laag(ctx, q.on('terug', 1, 0.4), () => tag(ctx, 'MINDER KANOETEN KWAMEN TERUG', 1460, 780, C.koraal, 1, 'center', 30)); });
    laag(ctx, Z, () => { kaart(ctx, 160, 200, 1600, 440, 1, C.line);
      metaText(ctx, 'OORZAAK: VISSERIJ?', 560, 270, C.koraal, 'center', 30); text(ctx, 'de onderzoekers (2006):', 560, 350, fTekst(36, 700), C.text, 'center'); text(ctx, 'de visserij', 560, 410, fTekst(44, 800), C.text, 'center');
      laag(ctx, q.on('Andere', 1, 0.5), () => { metaText(ctx, 'VOLGT NIET UIT DE GEGEVENS', 1360, 270, C.teal, 'center', 30); text(ctx, 'andere onderzoekers (2023):', 1360, 350, fTekst(36, 700), C.text, 'center'); text(ctx, 'niet bewezen', 1360, 410, fTekst(44, 800), C.text, 'center');
        vraagteken(ctx, 960, 440, 1, 130 + 30 * q.on('niemand', 1, 0.5)); metaText(ctx, 'VAN GILS 2006 · BETWIST: VAN DER MEER & FOLMER 2023', 960, 600, C.grain, 'center', 28); });
      const Si = q.on('Sinds', 1, 0.5);
      laag(ctx, (1 - Si), () => { chip(ctx, 'WARMER WATER', 700, 760, C.koraal, q.on('warmer', 1, 0.4), 30); chip(ctx, 'MINDER NONNETJES', 1200, 760, C.koraal, q.on('nonnetjes', 1, 0.4), 30); });
      laag(ctx, Si, () => tag(ctx, '2005: MECHANISCHE KOKKELVISSERIJ GESTOPT', 960, 770, C.goud, 1, 'center', 34)); }); },

  // ---------- H4 Draagkracht ----------
  s20(ctx, t, q) { const V = q.on('Vroeger', 1, 0.6), Kr = q.on('Krijgen', 1, 0.6);
    if (V < 1) decor(ctx, 'wad', 0.6 * (1 - V)); else bg(ctx, 'schema');
    laag(ctx, 1 - V, () => { mb3_kotter(ctx, 1180, 650, 20, { geul: 1, zaai: q.on('zaait', 1, 0.5), t, figuur: (fx, fy) => persoon(ctx, 'joost', fx, fy, 80, { t, kijk: -1 }) });
      const Zc = q.on('zaait', 1, 0.4) * (1 - q.on('jonge', 1, 0.4)); zoomCircle(ctx, 1500, 330, 190, 870, 620, '', Zc, () => mb3_zaaiCloseup(ctx, 1500, 330, 190, t));
      laag(ctx, q.on('centimeter', 1, 0.5), () => metaText(ctx, 'MOSSELZAAD · 1–2 CM', 420, 140, C.grain, 'center', 28)); zoomCircle(ctx, 420, 360, 170, 760, 680, '', q.on('centimeter', 1, 0.5), () => { ctx.fillStyle = '#1F4E66'; ctx.fillRect(250, 190, 340, 340); for (let k = 0; k < 6; k++) mb3_mossel(ctx, 330 + (k % 3) * 85, 300 + Math.floor(k / 3) * 110, 34, { L: 1.6, rot: hash(k) * 3 }); });
      metaA(ctx, 'PERCELEN OP DE BODEM', 1180, 790, q.on('percelen', 1, 0.4), C.grain, 'center', 28);
      laag(ctx, q.on('aquacultuur', 1, 0.4), () => tag(ctx, 'AQUACULTUUR', 1180, 200, C.oker, 1, 'center', 36)); });
    laag(ctx, V * (1 - Kr), () => { metaText(ctx, 'VROEGER', 120, 220, C.text2, 'left', 28); mb3_bodem(ctx, 120, 640, 720, 210, {}); mb3_mosselbank(ctx, 480, 646, 520, 16, { n: 18, seed: 2 });
      text(ctx, 'zaad van wilde mosselbanken', 120, 290, fTekst(38, 700), C.text, 'left');
      laag(ctx, q.on('invanginstallaties', 1, 0.5), () => { metaText(ctx, 'NU · EEN STEEDS GROTER DEEL', 1000, 220, C.text2, 'left', 28); ctx.fillStyle = rgba(MB3.zee, 0.45); ctx.fillRect(1000, 360, 800, 470);
        mb3_mzi(ctx, 1110, 360, 580, { zaad: 0.8, t, diep: 330, n: 6 }); tag(ctx, 'INVANGINSTALLATIE (MZI)', 1400, 300, C.teal, 1, 'center', 30); }); });
    laag(ctx, Kr, () => { mb3_mosselbank(ctx, 640, 760, 400, 16, { n: 14, open: 1, seed: 8 }); metaText(ctx, 'KWEEKMOSSELEN', 640, 820, C.text2, 'center', 28); mb3_zak(ctx, 1250, 780, 1.8); vraagteken(ctx, 1500, 520, 1, 140); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: nee, ze eten de algen uit het water', 1);
    const ex = 900, ey = 560; mb3_emmer(ctx, ex, 820, 280, { groen: 1, t }); text(ctx, 'ALGEN', ex, 870, fTekst(34, 800), C.groen, 'center');
    const eter = (x, y, cue, n, fn, lab) => { const a = q.on(cue, n, 0.5); if (a <= 0.01) return; mb3_lepel(ctx, ex, ey, x, y + 40, a); laag(ctx, a, () => { fn(); metaText(ctx, lab, x, y - 75, C.text, 'center', 28); }); };
    eter(420, 330, 'kweekmosselen', 1, () => mb3_mosselbank(ctx, 420, 340, 200, 9, { n: 7, open: 1, seed: 1 }), 'KWEEKMOSSEL');
    eter(860, 270, 'wilde', 1, () => mb3_mosselbank(ctx, 860, 280, 200, 9, { n: 7, open: 1, seed: 4 }), 'WILDE MOSSEL');
    eter(1260, 330, 'kokkels', 1, () => { mb3_kokkel(ctx, 1220, 320, 20, { L: 3, open: 1 }); mb3_kokkel(ctx, 1310, 330, 20, { L: 2.6, open: 1 }); }, 'KOKKEL');
    laag(ctx, q.on('jouw', 1, 0.5), () => { pijl(ctx, 1360, 330, 1480, 300, C.oker, 1, 4, 16); mb3_vogel(ctx, 'kanoet', 1580, 320, 6, {}); metaText(ctx, 'KANOET', 1580, 360, C.text, 'center', 28); });
    laag(ctx, q.on('emmer', 1, 0.4), () => { tag(ctx, 'HET WAD = ÉÉN GROTE EMMER', 1380, 620, C.goud, 1, 'center', 32); bio(ctx, 1720, t, { kijk: -1, pose: 'wijs', uit: 'blij' }); }); },

  s23(ctx, t, q) { bg(ctx, 'schema');
    laag(ctx, q.on('Plek', 1, 0.4), () => filmKaartje(ctx, 120, 200, 'Plek genoeg? · draagkracht', 1));
    laag(ctx, q.on('filteraars', 1, 0.5), () => { mb3_emmer(ctx, 420, 760, 220, { groen: 0.8, n: 26, t }); metaText(ctx, 'KWEEK + WILD + KOKKELS', 420, 810, C.text2, 'center', 28); });
    const G = q.on('voeden', 1, 0.5);
    laag(ctx, G, () => { mb3_meter(ctx, 1240, 640, 260, null, { grens: 0.72, vraag: q.on('grens', 1, 0.5), label: 'SCHELPDIEREN' });
      tag(ctx, 'DRAAGKRACHT VOOR SCHELPDIEREN', 1240, 260, C.goud, 1, 'center', 32); });
    metaA(ctx, 'WESTELIJKE WADDENZEE', 1240, 780, q.on('westelijke', 1, 0.4), C.teal, 'center', 28); },

  s25(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: geen aanwijzing tot nu toe, ze blijven meten', 1);
    mb3_meter(ctx, 1240, 620, 250, 0.42 + 0.02 * Math.sin(t), { grens: 0.72, label: 'WESTELIJKE WADDENZEE' }); metaText(ctx, 'WMR 2018, 2024', 1240, 760, C.grain, 'center', 28);
    laag(ctx, q.on('vlezig', 1, 0.4), () => { mb3_kokkelVlees(ctx, 300, 360, 30, 0.9, { L: 3 }); metaText(ctx, 'HOE VLEZIG', 300, 450, C.text2, 'center', 28); });
    laag(ctx, q.on('groeien', 1, 0.4), () => { mb3_kokkel(ctx, 620, 360, 28, { L: 3 }); lijn(ctx, [[578, 420], [662, 420]], C.line, 2); metaText(ctx, 'GROEI', 620, 450, C.text2, 'center', 28); });
    laag(ctx, q.on('emmer', 1, 0.5), () => { mb3_emmer(ctx, 460, 790, 220, { groen: 0.7, n: 30, t }); tag(ctx, 'ELKE MOSSEL ERBIJ EET MEE', 460, 540, C.oker, 1, 'center', 28); }); },

  s26(ctx, t, q) { decor(ctx, 'wad', 0.6);
    mb3_kotter(ctx, 1600, 600, 10, { geul: 1, t, figuur: (fx, fy) => persoon(ctx, 'joost', fx, fy, 44, { t, kijk: -1 }) });
    kaartTekst(ctx, 120, 120, 540, 200, 'KWEKER', ['goede oogst', 'wilde banken met rust'], q.on('kweker', 1, 0.4), C.oker, C.oker);
    kaartTekst(ctx, 690, 120, 540, 200, 'VOGELONDERZOEKER', ['genoeg vlezige', 'schelpdieren'], q.on('Vogelonderzoekers', 1, 0.4), C.teal, C.teal);
    kaartTekst(ctx, 1260, 120, 540, 200, 'MARIENE BIOLOOG', ['telt en weegt'], q.on('weeg', 1, 0.4), C.goud, C.goud);
    bio(ctx, 760, t, { kijk: 1, pose: q.on('Ik', 1) > 0.5 && q.on('bestuur', 1) < 0.5 ? 'wijs' : 'vasthouden', uit: 'blij', hold: q.on('Ik', 1) > 0.5 && q.on('bestuur', 1) < 0.5 ? null : (c, hx, hy) => mb3_tablet(c, hx + 10, hy - 30, 1.3) });
    sam(ctx, 1080, t, { kijk: -1, uit: 'neutraal' });
    laag(ctx, q.on('bestuur', 1, 0.4), () => stempel(ctx, 1440, 400, 'BESLUIT: BESTUUR', C.goud, 1)); },

  // ---------- Recap ----------
  s27(ctx, t, q) { const Om = q.on('Omdat', 1, 0.6);
    if (Om < 1) decor(ctx, 'wad', 0.6 * (1 - Om)); else bg(ctx, 'schema');
    laag(ctx, 1 - Om, () => zwerm(ctx, t, 300, 480, 1300, 300, clamp(t / 5, 0, 1), { n: 9, s: 4, kijk: 1 }));
    // beeld A: alleen het voedselweb (algen in het water → kokkel, mossel, kweekmossel; algen op de plaat → nonnetje, wadpier; kanoet ← kokkel, nonnetje)
    const Fi = q.on('Filteraars', 1, 0.6), Al = q.on('algen', 1, 0.5), dimW = 1 - 0.65 * Fi;
    laag(ctx, Om * dimW, () => { const Y = 560, P = [['KOKKEL', 160], ['MOSSEL', 380], ['KWEEKMOSSEL', 610], ['NONNETJE', 900], ['WADPIER', 1130]];
      mb3_kokkel(ctx, 160, Y, 24, { L: 3 }); mb3_mossel(ctx, 380, Y, 18, { L: 5 }); mb3_mosselbank(ctx, 610, Y + 30, 120, 9, { n: 4, seed: 6 }); mb3_nonnetje(ctx, 900, Y + 5, 30, { L: 2 });
      ctx.save(); ctx.strokeStyle = '#A85440'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1080, Y + 10); ctx.bezierCurveTo(1110, Y - 30, 1150, Y + 40, 1180, Y); ctx.stroke(); ctx.restore();
      P.forEach(([n, x]) => metaText(ctx, n, x, Y + 80, C.text, 'center', 28));
      mb3_vogel(ctx, 'kanoet', 540, 330, 7, {}); metaText(ctx, 'KANOET', 540, 375, C.text, 'center', 28);
      pijl(ctx, 190, Y - 50, 470, 400, C.oker, 1, 4, 16); pijl(ctx, 870, Y - 45, 610, 400, C.oker, 1, 4, 16);
      laag(ctx, Al, () => { chip(ctx, 'ALGEN IN HET WATER', 380, 800, C.groen, 1, 30); chip(ctx, 'ALGEN OP DE PLAAT', 1015, 800, C.groen, 1, 30);
        [160, 380, 610].forEach(x => pijl(ctx, 380 + (x - 380) * 0.4, 760, x, Y + 100, C.groen, 1, 4, 14)); [900, 1130].forEach(x => pijl(ctx, 1015 + (x - 1015) * 0.4, 760, x, Y + 100, C.groen, 1, 4, 14)); }); });
    // beeld B: één nieuw element per zin, rechts naast het gedimde web
    const Vl = q.on('vlees', 1, 0.5), Me = q.on('meet', 1, 0.5);
    laag(ctx, Fi * (1 - Vl), () => { mb3_emmer(ctx, 1600, 600, 200, { groen: 0.8, n: 10, t }); metaText(ctx, 'ÉÉN EMMER', 1600, 650, C.text, 'center', 28);
      laag(ctx, q.on('tiende', 1, 0.5), () => text(ctx, '± een tiende per stap', 1600, 320, fTekst(42, 800), C.goud, 'center')); });
    laag(ctx, Vl * (1 - Me), () => { mb3_balans(ctx, 1600, 320, 360, 0, (x, y) => mb3_kokkelVlees(ctx, x, y - 26, 20, 1, { L: 3 }), (x, y) => mb3_kokkelVlees(ctx, x, y - 26, 20, 0.2, { L: 3 }));
      metaText(ctx, 'VEEL VLEES', 1420, 660, C.oker, 'center', 28); metaText(ctx, 'WEINIG VLEES', 1780, 660, C.koraal, 'center', 28); });
    laag(ctx, Me, () => { bio(ctx, 1600, t, { kijk: -1, pose: 'vasthouden', uit: 'blij', hold: (c, hx, hy) => mb3_tablet(c, hx + 10, hy - 30, 1.3) }); tag(ctx, 'METEN, ZODAT ANDEREN KUNNEN KIEZEN', 1440, 220, C.goud, 1, 'center', 30); }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = [['wo', 'Marine Sciences · 3 jaar', 'WAGENINGEN · ENGELSTALIG', 'Wageningen', C.teal], ['wo', 'Biologie → master Marine Biology', 'GRONINGEN', 'Groningen', C.teal], ['hbo', 'Kust- en zeemanagement · 4 jaar', 'LEEUWARDEN', 'Leeuwarden', C.groen]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 236 + i * 150;
      roundRect(ctx, 100, y, 1340, 130, 18); shape(ctx, rgba('#0D1420', 0.9), kl, 2); text(ctx, n, 140, y + 80, fTitel(46), kl); text(ctx, o, 300, y + 60, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 104, C.grain, 'left', 28); ctx.restore(); });
    laag(ctx, ramp(t, q.at('Leeuwarden', 1) + 0.8, 0.5), () => { roundRect(ctx, 100, 686, 1340, 110, 18); shape(ctx, rgba('#0D1420', 0.9), C.goud, 2); text(ctx, 'werk', 140, 755, fTitel(46), C.goud);
      metaText(ctx, 'BIJV. ZEEONDERZOEK, OVERHEID, AQUACULTUUR', 300, 752, C.text, 'left', 28); });
    sam(ctx, 1600, t, { kijk: 1, uit: 'blij' }); bio(ctx, 1800, t, { kijk: -1, uit: 'blij' }); }
});
