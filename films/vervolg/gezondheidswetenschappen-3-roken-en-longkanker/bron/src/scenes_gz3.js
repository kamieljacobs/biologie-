// Wat word jij? · Gezondheidswetenschappen 3 · Roken en longkanker — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Yasmin, stagiair; Epidemioloog Farid, zonder badge en zonder afdeling). Decor 'ggd' (kantoor uit film 1, zonder opschrift) alleen in de cold open, het begin van H1 en de recap.
// Rode draad: het getal op Farids scherm; een tijdlijn bovenin springt per hoofdstuk (2026 → 1951 → 1950 → 2001 → 2026).
// Telpoppetjes alleen in rasters; teal = nooit gerookt, oker = rookt, koraal = longkanker, groen = gestopt.

const tl = (ctx, jaar, a = 1, o = {}) => tijdlijn(ctx, jaar, a, o);
const tlBeweeg = (t, t0, d, j0, j1) => lerp(j0, j1, ease((t - t0) / d));
function duo(ctx, t, o = {}) { const ry = persoon(ctx, 'yasmin', o.yx || 560, GROND, 450, { t, kijk: 1, uit: o.uitY || 'blij', pose: o.poseY || 'staan', a: o.aY == null ? 1 : o.aY });
  const rf = persoon(ctx, 'farid', o.fx || 1420, GROND, 460, { t, kijk: -1, uit: o.uitF || 'blij', pose: o.poseF || 'staan', outfit: 'kantoor', a: o.aF == null ? 1 : o.aF }); return { ry, rf }; }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(rand, 0.85), 2); ctx.restore(); }
const PCT = (k) => Math.round(647 * k / (647 * k + 622) * 100);

Object.assign(SCENES, {
  title(ctx, t) { metaText(ctx, 'BLEVEN ROKEN', 1100, 440, C.oker, 'left', 28); metaText(ctx, 'NOOIT GEROOKT', 1500, 440, C.teal, 'left', 28);
    raster100(ctx, 1110, 490, C.oker, clamp((t - 0.8) * 10, 0, 16), 1, { gap: 34, r: 10 }); raster100(ctx, 1510, 490, C.teal, 0, 1, { gap: 34, r: 10 });
    metaText(ctx, 'LONGKANKER VÓÓR 75 · VAN DE 100', 1100, 860, C.text2, 'left', 28); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const tG = q.at('getal', 1), Z = ramp(t, tG - 0.1, 1.4), P = 1 - clamp(Z * 3, 0, 1), V = q.on('zoeken', 1, 0.5);
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'neutraal', aY: P, aF: P });
        naamBij(c, 'Yasmin', 'STAGIAIR', 560, 360, P, 'center'); naamBij(c, 'Epidemioloog Farid', '', 1420, 345, P, 'center'); },
      (c) => { laag(c, 1 - 0.8 * V, () => schermGetal(c, 1)); });
    tl(ctx, 2026, clamp(Z * 2 - 1, 0, 1));
    const Y = q.on('vraagt', 1, 0.3) * (1 - V);
    laag(ctx, Math.max(Y, ramp(t, tG + 1.2, 0.3)), () => persoon(ctx, 'yasmin', lerp(1600, 1780, V), 862, 440, { t, kijk: -1, uit: Y > 0.5 ? 'verbaasd' : 'neutraal', pose: Y > 0.5 ? 'denk' : 'staan' }));
    bubbel(ctx, 1580, 300, 'Hoe weten ze dat?', '#F2F2EE', q.on('hoe', 1, 0.3) * (1 - q.on('Je', 1, 0.3)) * (1 - V), 34);
    laag(ctx, q.on('proef', 1, 0.4) * (1 - V), () => { sigaret(ctx, 1600, 290, 2.2); kruis(ctx, 1600, 290, 60, 1); metaText(ctx, 'PROEF? MAG NIET', 1600, 390, C.koraal, 'center', 28); });
    laag(ctx, V, () => { kaart(ctx, 260, 330, 1100, 300, 1, C.goud); text(ctx, 'Hoe weet je dat roken kanker geeft,', 320, 440, fTekst(54, 800), C.text, 'left'); text(ctx, 'zonder experiment?', 320, 520, fTekst(54, 800), C.text, 'left'); vraagteken(ctx, 1250, 540, 1, 130);
      metaText(ctx, 'WAAR KOMT DIT GETAL VANDAAN?', 320, 594, C.goud, 'left', 28); persoon(ctx, 'farid', 1500, 862, 460, { t, kijk: -1, pose: 'wijs', outfit: 'kantoor', uit: 'blij' }); }); },

  // ---------- H1 Cohortonderzoek ----------
  s03(ctx, t, q) { const Z = ramp(t, q.at('Elke', 1) - 0.4, 1.4), P = 1 - clamp(Z * 3, 0, 1);
    const monitor = (c, a2) => laag(c, a2, () => { for (let i = 5; i >= 0; i--) { c.save(); c.translate(i * 14, -i * 12); roundRect(c, 180, 330, 360, 440, 10); shape(c, '#F2EEE4', '#9AA3B2', 2); c.restore(); }
      c.fillStyle = '#5A6478'; c.font = fTekst(30, 800); c.textAlign = 'left'; c.fillText('Gezondheidsmonitor', 210, 400); c.font = fTekst(24, 600);
      ['Rookt u?', 'Hoeveel per dag?', 'Hoe vaak sport u?', 'Drinkt u alcohol?'].forEach((s2, i) => { c.fillText(s2, 210, 460 + i * 64); c.strokeStyle = '#9AA3B2'; c.lineWidth = 2; c.strokeRect(470, 438 + i * 64, 28, 28); });
      vink_(c, 484, 452, 12, 1, C.oker); });
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'neutraal', aY: P, aF: P }); },
      (c) => monitor(c, 1));
    if (Z < 0.99) return;
    tl(ctx, 2026, 1); metaA(ctx, 'ELKE 4 JAAR · GGD\'EN, RIVM EN CBS', 160, 230, q.on('jaar', 1), C.grain, 'left', 28); metaA(ctx, 'HONDERDDUIZENDEN DEELNEMERS', 160, 830, q.on('honderdduizenden', 1), C.goud, 'left', 28);
    const L = q.on('Landelijk', 1); kaart(ctx, 680, 250, 520, 460, L);
    laag(ctx, L, () => { metaText(ctx, 'VOLWASSENEN · 2024', 710, 302, C.goud, 'left', 28); raster(ctx, 730, 380, 10, 50, 44, 12, (i) => i % 10 < 2 && i < 50 ? C.oker : C.teal, 1, { gapY: 56 });
      text(ctx, '18 % rookt', 710, 680, fTekst(46, 800), C.text, 'left'); metaText(ctx, 'CBS/RIVM', 710, 755, C.text2, 'left', 28); });
    const M = q.on('momentopname', 1); laag(ctx, M, () => { const x = 1290, y = 250; roundRect(ctx, x, y, 520, 460, 16); ctx.setLineDash([14, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]);
      metaText(ctx, 'ÉÉN MOMENT:', x + 30, y + 50, C.goud, 'left', 28); metaText(ctx, 'WIE ROOKT NU?', x + 30, y + 86, C.goud, 'left', 28); raster(ctx, x + 60, y + 160, 9, 36, 50, 13, (i) => hash(i * 4.1) < 0.2 ? C.oker : C.teal, 1, { gapY: 64 }); });
    const La = q.on('later', 1); laag(ctx, La, () => { text(ctx, 'wie wordt later ziek?', 1550, 800, fTekst(40, 700), C.text, 'center'); vraagteken(ctx, 1770, 640, 1, 90); }); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const tJ = q.at('negentienhonderdeenenvijftig', 1); tl(ctx, tlBeweeg(t, tJ, 1.2, 2026, 1951), 1, { label: tlBeweeg(t, tJ, 1.2, 2026, 1951) });
    const B = ramp(t, q.at('beroemd', 1) - 0.2, 0.6);
    laag(ctx, 1 - B, () => { experiment(ctx, 140, 260, 1, q.on('niet', 1, 0.4)); laag(ctx, q.on('observationeel', 1), () => { kaart(ctx, 760, 330, 980, 240, 1, C.goud); text(ctx, 'observationeel onderzoek', 800, 420, fTekst(56, 800), C.goud, 'left'); text(ctx, 'kijken naar wat mensen zelf al doen', 800, 500, fTekst(40, 600), C.text, 'left'); }); });
    laag(ctx, B, () => { const O = q.on('vroegen', 1, 0.5); envelop(ctx, 420, 520, 1.6, 1, O); metaText(ctx, 'VRAGENLIJST · 1951', 420, 720, C.grain, 'center', 28);
      metaA(ctx, 'BRITSE ARTSEN · DOLL & HILL', 160, 230, q.on('Doll', 1), C.goud, 'left', 28);
      const A = q.on('artsen', 1, 0.5), K = q.on('hoeveel', 1, 1.2); artsen(ctx, A, { kleur: K });
      metaA(ctx, '± 34.000 MANNEN · 1 POPPETJE ≈ 200', 800, 392, q.on('dertigduizend', 1), C.text2, 'left', 28);
      laag(ctx, K, () => { popje(ctx, 1300, 860, 12, C.oker); text(ctx, 'rookt', 1325, 866, fTekst(30, 700), C.oker, 'left'); popje(ctx, 1480, 860, 12, C.teal); text(ctx, 'nooit gerookt', 1505, 866, fTekst(30, 700), C.teal, 'left'); });
      tag(ctx, 'daarna 50 jaar gevolgd', 1275, 320, C.goud, q.on('vijftig', 2), 'center', 28); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 1951, 1); metaText(ctx, 'BRITSE ARTSEN · DOLL & HILL', 160, 230, C.goud, 'left', 28);
    artsen(ctx, 1, { kleur: 1 }); envelop(ctx, 420, 520, 1.6, 1, 1);
    laag(ctx, q.on('bepaalde', 1, 0.4), () => { tag(ctx, 'wie koos?', 1275, 345, C.goud, 1, 'center', 34); vraagteken(ctx, 1640, 360, 1, 100); }); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de artsen zelf; het werd alleen gevraagd', 1);
    const tV = q.at('volgden', 1), u = clamp((t - tV) / 5.2, 0, 1), jaar = lerp(1951, 2001, u); tl(ctx, jaar, 1, { label: jaar, van: 1951 });
    artsen(ctx, 1, { kleur: 1, ziek: u }); tag(ctx, 'zelf gekozen · alleen gevraagd', 1275, 345, C.goud, 1 - q.on('vooruit', 1), 'center', 28);
    laag(ctx, q.on('vooruit', 1, 0.4), () => mediaKnop(ctx, 300, 330, 70, 'play', 1, 'VOORUIT'));
    const T = q.on('telden', 1); laag(ctx, T, () => { kaart(ctx, 160, 470, 540, 200, 1); popje(ctx, 210, 548, 14, C.koraal); text(ctx, 'longkanker', 240, 552, fTekst(36, 800), C.koraal, 'left'); metaText(ctx, 'TELLEN PER GROEP', 190, 610, C.text2, 'left', 28); metaText(ctx, 'SCHEMATISCH', 190, 648, C.text2, 'left', 28); });
    naamBij(ctx, 'cohort', 'EEN GROEP DIE JE JARENLANG VOLGT', 1275, 330, q.on('cohort', 1), 'center', C.goud);
    const G = q.on('gemeten', 1); laag(ctx, G, () => { kaart(ctx, 160, 690, 540, 175, 1, C.goud); sigaret(ctx, 240, 750, 1.1); pijl(ctx, 310, 750, 430, 750, C.goud, 1, 4, 16); popje(ctx, 490, 774, 16, C.koraal); metaText(ctx, 'EERST ROKEN, DAN ZIEK', 190, 840, C.goud, 'left', 28); });
    laag(ctx, q.on('veroorzaakt', 1), () => { metaText(ctx, 'NIET ANDERSOM', 1830, 840, C.koraal, 'right', 28); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2001, 1, { van: 1951 }); const g = { x: 260, y: 300, w: 760, h: 420, max: 300, stap: 50 };
    staven(ctx, g, [['nooit gerookt', 17, C.teal, q.on('nooit', 1, 0.8), '± 17'], ['sigaretten', 250, C.oker, q.on('tweehonderdvijftig', 1, 0.8), '± 250']], 1, { yl: 'LONGKANKERSTERFTE PER 100.000 MANNEN PER JAAR' });
    metaText(ctx, 'BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005', 190, 846, C.text2, 'left', 28);
    echtKaart(ctx, 1150, 300, 640, 'NEDERLAND · COHORT', [['gestart in 1986', q.on('zesentachtig', 1)], ['voeding, leefstijl en kanker', q.on('voeding', 1)], ['120.852 mensen', q.on('honderdtwintigduizend', 1)]], 'NLCS · MAASTRICHT', q.on('Nederland', 1), { lh: 56 }); },

  // ---------- H2 Patiënt-controleonderzoek ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const tJ = q.at('negentienhonderdvijftig', 1); const j = tlBeweeg(t, tJ, 1.0, 2001, 1950); tl(ctx, j, 1, { label: j });
    const Z = q.on('ziekte', 1, 0.6);
    laag(ctx, 1 - Z, () => { kaart(ctx, 660, 300, 600, 380, 1); document_(ctx, 960, 450, 3, C.line); metaText(ctx, 'PUBLICATIE 1950', 960, 610, C.goud, 'center', 28); metaText(ctx, 'DOLL & HILL', 960, 648, C.goud, 'center', 28); });
    laag(ctx, Z, () => { groep649(ctx, 160, 330, 0, 0, 1); raster(ctx, 160, 330, 30, 649, 18, 6, () => C.koraal, 1, { gapY: 21 }); naamBij(ctx, 'mannen met longkanker', '649', 420, 290, 1, 'center', C.koraal); });
    laag(ctx, q.on('spoelden', 1, 0.3), () => mediaKnop(ctx, 960, 520, 70, 'rew', 1, 'TERUGSPOELEN'));
    laag(ctx, q.on('patiënt-controleonderzoek', 1), () => { kaart(ctx, 1160, 380, 640, 260, 1, C.goud); text(ctx, 'patiënt-', 1200, 470, fTekst(54, 800), C.goud, 'left'); text(ctx, 'controleonderzoek', 1200, 540, fTekst(54, 800), C.goud, 'left'); metaText(ctx, 'KIJK TERUG VANUIT', 1200, 596, C.text2, 'left', 28); metaText(ctx, 'DE ZIEKTE', 1200, 632, C.text2, 'left', 28); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 1950, 1); metaText(ctx, 'LONDEN · PUBLICATIE 1950 · DOLL & HILL', 160, 230, C.goud, 'left', 28);
    const N2 = q.on('nooit', 1, 0.5), N27 = q.on('zevenentwintig', 1, 0.5), E = q.on('evenveel', 1, 0.5);
    raster(ctx, 160, 340, 30, 649, 18, 6, (i) => i >= 647 ? _mixHex(C.koraal, C.teal, N2) : C.koraal, 1, { gapY: 21, ringR: 1.6, ring: (i) => i >= 647 ? N2 : 0 });
    naamBij(ctx, 'mannen met longkanker', '649 PATIËNTEN', 420, 290, 1, 'center', C.koraal);
    const Vt = q.on('vertelde', 1, 1.2); raster(ctx, 1140, 340, 30, 649, 18, 6, (i) => i >= 622 ? _mixHex(C.line, C.teal, Vt) : _mixHex(C.line, C.oker, Vt), E, { gapY: 21 });
    naamBij(ctx, 'controlegroep', 'GEEN KANKER · ZELFDE LEEFTIJD EN ZIEKENHUIS', 1400, 290, E, 'center', C.text);
    laag(ctx, q.on('vertelde', 1), () => { sigaret(ctx, 900, 520, 2); vraagteken(ctx, 900, 640, 1, 70); metaText(ctx, 'ROOKTE HIJ?', 900, 710, C.grain, 'center', 28); });
    laag(ctx, N2, () => { text(ctx, '2', 300, 860, fTitel(64), C.teal, 'center'); text(ctx, 'nooit gerookt', 340, 852, fTekst(34, 700), C.teal, 'left'); });
    laag(ctx, N27, () => { text(ctx, '27', 1290, 860, fTitel(64), C.teal, 'center'); text(ctx, 'nooit gerookt', 1340, 852, fTekst(34, 700), C.teal, 'left'); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 1950, 1);
    raster(ctx, 160, 340, 30, 649, 18, 6, (i) => i >= 647 ? C.teal : C.koraal, 1, { gapY: 21 }); naamBij(ctx, 'mannen met longkanker', '649 PATIËNTEN', 420, 290, 1, 'center', C.koraal);
    raster(ctx, 1140, 340, 30, 649, 18, 6, (i) => i >= 622 ? C.teal : C.oker, 1, { gapY: 21 }); naamBij(ctx, 'controlegroep', '649 ZONDER KANKER', 1400, 290, 1, 'center', C.text);
    const K = q.on('Kan', 1, 0.4); laag(ctx, K, () => { kaart(ctx, 720, 400, 360, 300, 1, C.goud); metaText(ctx, '% VAN DE ROKERS', 900, 460, C.goud, 'center', 28); metaText(ctx, 'DIE LONGKANKER', 900, 496, C.goud, 'center', 28); metaText(ctx, 'KRIJGT?', 900, 532, C.goud, 'center', 28); vraagteken(ctx, 900, 660, 1, 110); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 1950, 1); antwoord(ctx, 'antwoord c: de onderzoekers kozen zelf hoeveel patiënten', 1);
    const tW = q.at('Wat', 1), B = ramp(t, tW - 0.3, 0.6), tVoor = q.at('Voor', 1), Cc = ramp(t, tVoor - 0.3, 0.6);
    // fase A: de onderzoekers kozen de verhouding; schuif met het aantal patiënten
    const S = q.on('Neem', 1, 0.6) * (1 - ramp(t, tW - 0.8, 0.5)), sw = Math.sin((t - q.at('Neem', 1)) * 1.3), k = 1 + S * (sw > 0 ? sw * 0.85 : sw * 0.55), nL = Math.round(649 * k);
    laag(ctx, 1 - B, () => { raster(ctx, 160, 300, 36, nL, 15, 5, (i) => i < 2 ? C.teal : C.koraal, 1, { gapY: 17 }); naamBij(ctx, 'patiënten: ' + RHO(nL), '', 430, 268, 1, 'center', C.koraal);
      raster(ctx, 1240, 300, 36, 649, 15, 5, (i) => i >= 622 ? C.teal : C.oker, 1, { gapY: 17 }); naamBij(ctx, 'controles: 649', '', 1510, 268, 1, 'center', C.text);
      metaA(ctx, 'ZELF GEKOZEN: HELFT : HELFT', 960, 250, q.on('kozen', 1) * (1 - S), C.goud, 'center', 28);
      laag(ctx, q.on('zeldzamer', 1), () => { kaart(ctx, 780, 330, 380, 150, 1); metaText(ctx, 'IN HET ECHT', 970, 384, C.text2, 'center', 28); text(ctx, 'veel minder zieken', 970, 440, fTekst(34, 700), C.text, 'center'); });
      laag(ctx, S, () => { kaart(ctx, 780, 520, 380, 300, 1, C.goud); metaText(ctx, 'ROKERS MET', 970, 570, C.goud, 'center', 28); metaText(ctx, 'LONGKANKER HIER', 970, 604, C.goud, 'center', 28); text(ctx, PCT(k) + ' %', 970, 710, fTitel(84), C.text, 'center'); metaText(ctx, 'HANGT AF VAN', 970, 760, C.text2, 'center', 28); metaText(ctx, 'DE KEUZE', 970, 796, C.text2, 'center', 28); }); });
    // fase B: wel vergelijken
    laag(ctx, B * (1 - Cc), () => { metaText(ctx, 'GEEN KANS PER ROKER · WEL VERGELIJKEN', 160, 250, C.goud, 'left', 28);
      const rij = (y, kop, a1, a2, v1, v2, al) => laag(ctx, al, () => { text(ctx, kop, 160, y, fTekst(34, 700), C.text, 'left'); balk(ctx, 160, y + 30, 640, a1, C.koraal, '', 1); text(ctx, v1, 820, y + 62, fTekst(30, 800), C.koraal, 'left'); balk(ctx, 160, y + 90, 640, a2, C.oker, '', 1); text(ctx, v2, 820, y + 122, fTekst(30, 800), C.oker, 'left'); });
      rij(330, 'rookten', 647 / 649, 622 / 649, '647 van 649', '622 van 649', q.on('Bijna', 1)); rij(560, 'van de rokers: 25 of meer per dag', 0.26, 0.135, '26 %', '13,5 %', q.on('meer', 1));
      laag(ctx, q.on('Bijna', 1), () => { popje(ctx, 180, 800, 12, C.koraal); text(ctx, 'patiënten', 205, 806, fTekst(28, 700), C.koraal, 'left'); popje(ctx, 400, 800, 12, C.oker); text(ctx, 'controles', 425, 806, fTekst(28, 700), C.oker, 'left'); });
      echtKaart(ctx, 1100, 300, 700, 'PATIËNT-CONTROLEONDERZOEK', [['snel: de zieken zijn er al', q.on('snel', 1)], ['handig bij een zeldzame ziekte', q.on('handig', 1)]], '', q.on('snel', 1), { lh: 56 });
      laag(ctx, q.on('factor', 1), () => { kaart(ctx, 1100, 560, 700, 210, 1, C.goud); metaText(ctx, 'DOLL & HILL · 1950', 1130, 612, C.goud, 'left', 28); text(ctx, '“roken is een factor,', 1130, 670, fTekst(38, 700), C.text, 'left'); text(ctx, 'en een belangrijke factor”', 1130, 720, fTekst(38, 700), C.text, 'left'); }); });
    // fase C: de kans zelf
    laag(ctx, Cc, () => { kaart(ctx, 360, 320, 1200, 300, 1, C.goud); metaText(ctx, 'DE KANS ZELF', 420, 380, C.goud, 'left', 28);
      laag(ctx, q.on('cohort', 1), () => { text(ctx, 'een cohort', 420, 470, fTekst(56, 800), C.text, 'left'); });
      laag(ctx, q.on('cijfers', 1), () => { text(ctx, 'of de cijfers van het hele land', 420, 560, fTekst(56, 800), C.text, 'left'); });
      filmKaartje(ctx, 360, 700, 'Kun je onderzoek vertrouwen?', q.on('land', 1)); }); },

  // ---------- H3 Relatief en absoluut risico ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const j = tlBeweeg(t, 0, 1.0, 1950, 2001); tl(ctx, j, 1, { label: j });
    persoon(ctx, 'farid', 260, 862, 400, { t, kijk: 1, pose: 'staan', outfit: 'kantoor', uit: 'neutraal' });
    const g = { x: 580, y: 300, w: 620, h: 420, max: 300, stap: 50 }; staven(ctx, g, [['nooit gerookt', 17, C.teal, 1, '± 17'], ['sigaretten', 250, C.oker, 1, '± 250']], 1, { yl: 'PER 100.000 MANNEN PER JAAR' });
    metaText(ctx, 'BRITSE ARTSEN 1951–2001', 510, 846, C.text2, 'left', 28);
    laag(ctx, q.on('Tweehonderdvijftig', 1), () => text(ctx, '250 : 17', 1300, 420, fTekst(64, 700), C.text, 'left'));
    laag(ctx, q.on('ongeveer', 1), () => text(ctx, '≈ 15', 1300, 530, fTitel(96), C.goud, 'left'));
    laag(ctx, q.on('relatief', 1), () => { kaart(ctx, 1280, 600, 540, 170, 1, C.goud); text(ctx, 'relatief risico', 1310, 670, fTekst(46, 800), C.goud, 'left'); metaText(ctx, 'HOEVEEL KEER ZO GROOT', 1310, 732, C.text, 'left', 28); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2001, 1); text(ctx, '15×', 820, 560, fTitel(260), C.goud, 'center'); vraagteken(ctx, 1180, 560, q.on('betekent', 1, 0.4), 200); metaText(ctx, 'RELATIEF RISICO', 820, 680, C.text2, 'center', 28); },

  s17(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2001, 1); antwoord(ctx, 'antwoord a: rokers hadden 15 keer zoveel kans', 1);
    const A = ramp(t, q.at('absoluut', 1) - 0.3, 0.6);
    laag(ctx, 1 - A, () => { const g = { x: 300, y: 320, w: 520, h: 400, max: 300, stap: 50 }; staven(ctx, g, [['nooit', 17, C.teal, 1, '± 17'], ['rokers', 250, C.oker, 1, '± 250']], 1, { yl: 'PER 100.000 PER JAAR' });
      text(ctx, '15×', 1050, 520, fTitel(120), C.goud, 'center'); metaText(ctx, 'VERGELIJKT TWEE GROEPEN', 1050, 594, C.text2, 'center', 28);
      laag(ctx, q.on('zegt', 1), () => { kaart(ctx, 1300, 380, 500, 190, 1); text(ctx, 'hoe groot is', 1340, 455, fTekst(40, 700), C.text, 'left'); text(ctx, 'de kans zelf?', 1340, 510, fTekst(40, 700), C.text, 'left'); vraagteken(ctx, 1720, 520, 1, 80); }); });
    laag(ctx, A, () => { metaText(ctx, 'ABSOLUUT RISICO · HOEVEEL VAN DE 100', 160, 236, C.goud, 'left', 28);
      metaText(ctx, 'LONGKANKER VÓÓR 75 JAAR', 160, 274, C.text2, 'left', 28);
      const K16 = clamp((t - q.at('zestien', 1)) * 12, 0, 16), K1 = q.on('minder', 1) * 0.45, KG = clamp((t - q.at('dertigste', 1)) * 6, 0, 2);
      const kol = [[160, 'bleven roken', C.oker, K16, '± 16', 1], [640, 'nooit gerookt', C.teal, K1, '< 1', q.on('niet-rokers', 1)], [1120, 'gestopt rond 30', C.groen, KG, '± 2', q.on('dertigste', 1)]];
      kol.forEach(([x, naam, col, k, getal, al]) => laag(ctx, al, () => { text(ctx, naam, x, 345, fTekst(36, 700), col, 'left'); raster100(ctx, x + 14, 400, col, k, 1, { gap: 34, r: 10 }); laag(ctx, k > 0.2 || naam === 'nooit gerookt' ? q.on(naam === 'bleven roken' ? 'zestien' : naam === 'nooit gerookt' ? 'minder' : 'twee', 1) : 0, () => text(ctx, getal + ' van de 100', x, 780, fTekst(42, 800), C.text, 'left')); }));
      metaA(ctx, 'PETO E.A. 2000 · VK, CIJFERS 1990', 160, 834, q.on('patiënt-controleonderzoek', 1), C.text2, 'left', 28);
      metaA(ctx, 'ALS ZE NIET EERDER AAN IETS ANDERS OVERLIJDEN', 160, 870, q.on('patiënt-controleonderzoek', 1), C.text2, 'left', 28);
      const Sc = q.on('scherm', 1) * (1 - q.on('rond', 1, 0.3)); laag(ctx, Sc, () => { kaart(ctx, 1150, 330, 660, 300, 1, C.goud); metaText(ctx, 'FARIDS SCHERM', 1180, 380, C.goud, 'left', 28); text(ctx, '± 16 van de 100', 1180, 470, fTekst(54, 800), C.text, 'left');
        laag(ctx, q.on('Groot-Brittannië', 1), () => { metaText(ctx, 'PATIËNT-CONTROLE', 1180, 540, C.text2, 'left', 28); metaText(ctx, '+ CIJFERS VAN HET HELE LAND', 1180, 578, C.text2, 'left', 28); }); }); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2026, ramp(t, 0, 0.4));
    persoon(ctx, 'yasmin', 360, 862, 440, { t, kijk: 1, pose: 'vasthouden', uit: q.on('veel', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    krant(ctx, 640, 260, 760, 520, 'Stof verdubbelt kans op ziekte!', 1);
    laag(ctx, q.on('weten', 1), () => { vraagteken(ctx, 1560, 520, 1, 150); metaText(ctx, 'IS DAT VEEL?', 1560, 610, C.goud, 'center', 28); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2026, 1); antwoord(ctx, 'antwoord b: hoe groot de kans zonder die stof al was', 1); metaText(ctx, 'REKENVOORBEELD', 160, 236, C.text2, 'left', 28);
    const E1 = q.on('één', 1), E2 = q.on('twee', 2), X = q.on('extra', 1);
    laag(ctx, Math.max(E1, 0.35), () => { stip10k(ctx, 180, 320, 420, 1, 1, E1); text(ctx, 'zonder de stof', 180, 800, fTekst(36, 700), C.text, 'left'); laag(ctx, E1, () => text(ctx, '1 op de 10.000', 180, 850, fTekst(34, 800), C.koraal, 'left')); });
    laag(ctx, Math.max(E2, 0.35), () => { stip10k(ctx, 760, 320, 420, 2, 1, E2); text(ctx, 'met de stof', 760, 800, fTekst(36, 700), C.text, 'left'); laag(ctx, E2, () => text(ctx, '2 op de 10.000', 760, 850, fTekst(34, 800), C.koraal, 'left')); });
    laag(ctx, X, () => { kaart(ctx, 1290, 320, 520, 150, 1, C.koraal); text(ctx, '+1 per 10.000', 1320, 410, fTekst(48, 800), C.koraal, 'left'); });
    laag(ctx, q.on('allebei', 1), () => { kaart(ctx, 1290, 500, 520, 300, 1, C.goud); metaText(ctx, 'NOEM ALLEBEI', 1320, 552, C.goud, 'left', 28);
      laag(ctx, q.on('keer', 2, 0.3), () => text(ctx, 'hoeveel keer: 2×', 1320, 630, fTekst(40, 700), C.text, 'left'));
      laag(ctx, q.on('honderd', 1, 0.3), () => { text(ctx, 'hoeveel van de 100', 1320, 700, fTekst(40, 700), C.text, 'left'); metaText(ctx, 'HIER: 1 → 2 VAN DE 10.000', 1320, 750, C.text2, 'left', 28); }); }); },

  // ---------- H4 Verstorende factoren ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2026, 1);
    persoon(ctx, 'yasmin', 260, 862, 440, { t, kijk: 1, pose: q.on('Geeft', 1) > 0.5 ? 'denk' : 'wijs', uit: 'neutraal' });
    kaart(ctx, 520, 220, 1280, 210, 1); metaText(ctx, 'COHORT VS · GUERTIN E.A. 2016', 560, 272, C.text2, 'left', 28);
    laag(ctx, q.on('zes', 1, 0.3), () => text(ctx, '≥ 6 koppen koffie per dag', 560, 340, fTekst(44, 700), C.text, 'left'));
    laag(ctx, q.on('vijf', 1, 0.3), () => text(ctx, 'bijna 5× zo vaak longkanker', 560, 400, fTekst(44, 800), C.koraal, 'left'));
    const Gk = q.on('Geeft', 1); factorBlok(ctx, 760, 640, 360, 'koffie', C.line, q.on('koffie', 1, 0.3), (x, y) => koffiekop(ctx, x, y + 14, 0.7));
    factorBlok(ctx, 1520, 640, 380, 'longkanker', C.koraal, q.on('longkanker', 1, 0.3));
    laag(ctx, Gk, () => { pijl(ctx, 950, 640, 1320, 640, C.text, 1, 5, 20); vraagteken(ctx, 1135, 610, 1, 80); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2026, 1); antwoord(ctx, 'antwoord c: wie veel koffie drinkt, rookt vaker', 1);
    const tK = q.at('Kijk', 1), B = ramp(t, tK - 0.3, 0.6);
    laag(ctx, 1 - B, () => { factorBlok(ctx, 560, 640, 360, 'koffie', C.line, 1, (x, y) => koffiekop(ctx, x, y + 14, 0.7)); factorBlok(ctx, 1360, 640, 380, 'longkanker', C.koraal, 1);
      stippel(ctx, 750, 640, 1160, 640, C.text2, 0.6, 3);
      const R = q.on('Roken', 1, 0.5); factorBlok(ctx, 960, 360, 340, 'roken', C.oker, R, (x, y) => sigaret(ctx, x + 6, y, 0.9));
      laag(ctx, q.on('allebei', 1), () => { pijl(ctx, 860, 420, 650, 570, C.oker, 1, 5, 18); }); laag(ctx, q.on('longkanker', 1), () => { pijl(ctx, 1060, 420, 1270, 570, C.oker, 1, 5, 18); });
      laag(ctx, q.on('verstorende', 1, 0.3), () => { naamBij(ctx, 'verstorende factor', 'OOK: VERSTORENDE VARIABELE', 960, 232, 1, 'center', C.goud); });
      laag(ctx, q.on('check', 1), () => { vraagteken(ctx, 960, 820, 1, 70); }); });
    laag(ctx, B, () => { const groep = (x, n, nRook, ziekR, ziekN, naam, kop) => { const W2 = q.on('rookten', 1, 1.2);
        raster(ctx, x, 380, 8, n, 52, 13, (i) => i < nRook ? (i < ziekR ? C.koraal : C.oker) : ((i - nRook) < ziekN ? C.koraal : C.teal), 1, { gapY: 66, dx: (i) => i < nRook ? -W2 * 60 : 0, ia: (i) => i < nRook ? 1 - W2 : 1 });
        naamBij(ctx, naam, kop, x + 180, 320, 1, 'center', C.text); };
      groep(240, 40, 26, 9, 1, 'koffie ≥ 6 koppen', ''); groep(980, 40, 8, 2, 2, 'geen koffie', '');
      metaText(ctx, 'SCHEMATISCH', 160, 236, C.text2, 'left', 28);
      laag(ctx, q.on('weg', 1), () => tag(ctx, 'alleen nooit-rokers: verband vrijwel weg', 960, 850, C.goud, 1, 'center', 30));
      persoon(ctx, 'farid', 1720, 862, 420, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'neutraal' });
      laag(ctx, q.on('verband', 2, 0.3), () => { kaart(ctx, 1420, 230, 440, 120, 1, C.koraal); text(ctx, 'groot verband ≠ bewijs', 1640, 305, fTekst(34, 800), C.text, 'center'); });
 }); },

  s24(ctx, t, q) { bg(ctx, 'schema'); tl(ctx, 2026, 1);
    persoon(ctx, 'yasmin', 260, 862, 440, { t, kijk: 1, pose: 'denk', uit: 'neutraal' });
    factorBlok(ctx, 760, 330, 340, 'roken', C.oker, 1, (x, y) => sigaret(ctx, x + 6, y, 0.9)); factorBlok(ctx, 1480, 330, 380, 'longkanker', C.koraal, 1); pijl(ctx, 940, 330, 1280, 330, C.text, 1, 5, 20);
    laag(ctx, q.on('verstorends', 1), () => { ctx.save(); roundRect(ctx, 1010, 120 + 50, 240, 90, 14); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); text(ctx, '?', 1130, 238, fTitel(60), C.text2, 'center'); });
    const T = q.on('experiment', 1); [0, 1, 2, 3].forEach((i) => tegel(ctx, 560 + i * 320, 520, 290, 300, '', 0, T));
    laag(ctx, q.on('veroorzaakt', 1), () => vraagteken(ctx, 1110, 470, 1, 90)); },

  s26(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: meer roken, meer risico; stoppen helpt', 1);
    const tZ = q.at('Zo', 1), u = clamp((t - tZ) / 3, 0, 1), j = lerp(1950, 2026, ease(u)); tl(ctx, u > 0 ? j : 2026, 1, { label: u > 0 ? j : 2026, stations: [1950, 1951, 2001], van: u > 0 ? 1950 : null });
    const items = [['Sterk verband: ± 15×', 'sterk', (x, y) => { [[17, C.teal], [250, C.oker]].forEach(([v, c], i) => { const h = v / 250 * 110; roundRect(ctx, x - 50 + i * 60, y + 50 - h, 40, h, 4); shape(ctx, c, null); }); }],
      ['Eerst roken, dan ziek', 'vóór', (x, y) => { sigaret(ctx, x - 50, y, 1); pijl(ctx, x - 10, y, x + 40, y, C.goud, 1, 4, 14); popje(ctx, x + 70, y + 26, 14, C.koraal); }],
      ['Hoe meer, hoe erger', 'meer', (x, y) => { [[130, '130'], [234, '234'], [415, '415']].forEach(([v, s2], i) => { const h = v / 415 * 110; roundRect(ctx, x - 80 + i * 60, y + 50 - h, 40, h, 4); shape(ctx, C.oker, null); text(ctx, s2, x - 60 + i * 60, y + 50 - h - 8, fTekst(24, 700), C.text, 'center'); }); }],
      ['Stoppen helpt', 'stopte', (x, y) => { popje(ctx, x - 40, y + 26, 16, C.oker); pijl(ctx, x - 10, y, x + 30, y, C.goud, 1, 4, 14); popje(ctx, x + 60, y + 26, 16, C.groen); }]];
    items.forEach(([kop, cue, teken], i) => tegel(ctx, 140 + i * 420, 300, 380, 330, kop, q.on(cue, 1), 1, teken));
    laag(ctx, q.on('dezelfde', 1), () => { pijl(ctx, 160, 652, 1760, 652, C.goud, 1, 4, 18); metaText(ctx, 'ALLEMAAL DEZELFDE KANT OP', 960, 694, C.goud, 'center', 28); });
    laag(ctx, q.on('meer', 1), () => { metaText(ctx, 'STERFTE PER 100.000 PER JAAR BIJ 1–14 · 15–24 · ≥ 25 SIGARETTEN PER DAG', 140, 744, C.text2, 'left', 28); metaText(ctx, 'BRITSE ARTSEN 1951–2001 · DOLL E.A. 2005', 140, 782, C.text2, 'left', 28); });
    laag(ctx, q.on('scherm', 1, 0.4), () => { kaart(ctx, 1400, 780, 420, 90, 1, C.goud); text(ctx, '± 16 van de 100', 1610, 840, fTekst(40, 800), C.text, 'center'); }); },

  // ---------- Recap ----------
  s27(ctx, t, q) { kantoorVlak(ctx); ctx.save(); roundRect(ctx, SCR.x, SCR.y, SCR.w, SCR.h, 2); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); schermGetal(ctx, 1); ctx.restore();
    duo(ctx, t, { yx: 1460, fx: 1700, poseF: 'staan', uitY: 'blij' });
    const kaarten = [['1950 · patiënt-controle: terugkijken', 'patiënt', (x, y) => { mediaKnop(ctx, x - 90, y, 30, 'rew', 1); raster(ctx, x - 20, y + 10, 6, 12, 22, 7, (i) => i < 11 ? C.koraal : C.teal, 1); }],
      ['1951–2001 · cohort: volgen', 'cohort', (x, y) => { mediaKnop(ctx, x - 90, y, 30, 'play', 1); raster(ctx, x - 20, y + 10, 6, 12, 22, 7, (i) => i % 3 ? C.oker : C.teal, 1); }],
      ['hoeveel keer · hoeveel van de 100', 'keer', (x, y) => { text(ctx, '15×', x - 60, y + 20, fTitel(52), C.goud, 'center'); text(ctx, '16/100', x + 70, y + 16, fTekst(38, 800), C.koraal, 'center'); }],
      ['altijd: zoek de derde factor', 'derde', (x, y) => { factorBlok(ctx, x, y, 140, '', C.oker, 1, (xx, yy) => sigaret(ctx, xx + 6, yy, 0.8)); }]];
    kaarten.forEach(([kop, cue, teken], i) => recapKaart(ctx, 60 + (i % 2) * 560, 460 + Math.floor(i / 2) * 210, 540, 190, kop, q.on(cue, 1), teken)); },

  s28(ctx, t, q) { kantoorVlak(ctx); const tG = q.at('Gezondheidswetenschappen', 1), B = ramp(t, tG - 0.3, 0.6);
    laag(ctx, 1 - ramp(t, tG - 0.7, 0.35), () => { echtKaart(ctx, 100, 200, 1180, 'NEDERLAND · LONGKANKER', [['ruim 14.000 mensen per jaar', q.on('veertienduizend', 1)], ['± 3 op de 4 gevallen door roken', q.on('drie', 1)]], 'IKNL, 2024 · TNO/KWF 2014', 1, { lh: 70, px: 52 });
      laag(ctx, q.on('drie', 1), () => raster(ctx, 160, 560, 4, 4, 70, 18, (i) => i % 4 < 3 ? C.oker : C.text2, 1, { gapY: 80 })); });
    laag(ctx, B, () => { roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 28);
      const rij = [['wo', 'Gezondheidswetenschappen', 'ENSCHEDE', 'Gezondheidswetenschappen'], ['wo', 'Biomedische Wetenschappen → master', 'EPIDEMIOLOGY (ENGELSTALIG) · NIJMEGEN', 'Nijmegen'], ['werk', 'bijv. epidemioloog', 'BIJ DE GGD, HET RIVM OF HET KANKERCENTRUM IKNL', 'epidemioloog']];
      rij.forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 160;
        roundRect(ctx, 100, y, 1180, 140, 18); shape(ctx, rgba('#0D1420', 0.9), i < 2 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 86, fTitel(46), i < 2 ? C.groen : C.goud); text(ctx, o, 300, y + 66, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 110, C.grain, 'left', 28); ctx.restore(); }); });
    duo(ctx, t, { yx: 1460, fx: 1700, uitY: 'blij' }); }
});
