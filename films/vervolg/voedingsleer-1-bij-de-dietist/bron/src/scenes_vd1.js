// Wat word jij? · Voeding en diëtetiek 1 · Bij de diëtist — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Diëtist Hanneke, Joost met outfit 'spreekuur', Noor loopt mee; op de telefoonfoto Fleur bij haar fiets).
// Decor 'praktijk' (ElevenLabs, volgt) alleen onder scènes die in de praktijk spelen: praktijkDecor() tekent nu nog niets.
// Kleuren: oker = voedsel (dagboek, wat je eet), groen = groente en fruit / positief, koraal = 'let op' (ertegenin gaan), goud = focus.
// Camera: wijd in de praktijk (cold open, recap) → dagboek → de schijf (navy) → terug aan tafel → weekbord (navy) → wijd.

Object.assign(SCENES, {
  title(ctx, t) { eetdagboek(ctx, 1420, 600, 1.05, { iconen: 1 }); pen(ctx, 1640, 560, 1.1, 0.5); bakjeTomaatjes(ctx, 1250, 790, 1.1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const N9 = q.on('Negen', 1, 1.2), D3 = q.on('drie', 1, 1.2), Zm = 1 + 0.6 * ease(clamp((t - q.at('Hoe', 1)) / 3, 0, 1));
    // vanaf 'Hoe kan dat?' zoomt de praktijk langzaam in op het dagboek (1 → 1,6); het paneel met de staven blijft staan
    const px = CAM_WIJD.tx + CAM_WIJD.s * 960, py = CAM_WIJD.ty + CAM_WIJD.s * 640;
    ctx.save(); ctx.translate(px, py); ctx.scale(Zm, Zm); ctx.translate(-px, -py); praktijkDecor(ctx);
    praktijk(ctx, t, { cam: CAM_WIJD, noor: 1720, uitN: 'neutraal', opTafel: c => eetdagboek(c, 960, 640, 0.55, { iconen: 1 }) });
    naamBij(ctx, 'Noor', 'loopt een dag mee', 930, 470, q.on('Noor', 1, 0.4) * (1 - q.on('Hoe', 1)), 'center'); ctx.restore();
    roundRect(ctx, 1110, 170, 700, 700, 20); shape(ctx, rgba('#0D1420', 0.6 * N9), null);
    kloofStaven(ctx, 1300, 760, 500, { w: N9, d: D3 });
    metaA(ctx, 'VOLWASSENEN · CBS, RIVM', 1460, 220, N9, C.grain, 'center', 26);
    vraagteken(ctx, 1460, 420, q.on('Hoe', 1), 110); },

  // ---------- H1 Meten wat iemand eet ----------
  s04(ctx, t, q) { praktijkDecor(ctx); antwoord(ctx, 'antwoord c: weten is nog geen doen', 1 - q.on('Wat', 1));
    const Z = q.on('Daarvoor', 1, 1.6), cam = camMix(Z);
    praktijk(ctx, t, { cam, noor: 1720, opTafel: c => eetdagboek(c, 960, 640, 0.55, { iconen: 1 }) });
    laag(ctx, 1 - Z, () => { ctx.translate(Z * 700, 0); roundRect(ctx, 1110, 170, 700, 700, 20); shape(ctx, rgba('#0D1420', 0.6), null);
      kloofStaven(ctx, 1300, 760, 500, { w: 1, d: 1 });
      tag(ctx, 'prijs', 1740, 450, C.text2, q.on('Prijs', 1), 'center', 30); tag(ctx, 'smaak', 1740, 525, C.text2, q.on('smaak', 1), 'center', 30);
      tag(ctx, 'weten alleen is niet genoeg', 1460, 222, C.goud, q.on('alleen', 1), 'center', 30); }); },

  s05(ctx, t, q) { praktijkDecor(ctx); const tD = q.at('Dan', 1), tS = q.at('schrijft', 1), tV = q.at('vraagt', 1), M = q.on('meet', 1, 0.5) * (1 - ramp(t, tD - 0.2, 0.5));
    const L = 1 - ramp(t, q.at('meet', 1) - 0.3, 0.5), vul = clamp((t - tS - 0.3) / 3.2, 0, 1), W8 = q.on('vraagt', 1, 0.4);
    const Sc = ramp(t, tS - 0.2, 0.6) * (1 - ramp(t, tV - 0.5, 0.6)), KM = fase(t, q.at('meekijkt', 1) - 0.1, q.at('meet', 1) + 0.2, 0.4);
    const dbx = lerp(960, 1080, ease(Sc)), schr = 0.1 * Math.sin(t * 9) * (vul > 0.02 && vul < 0.98 ? 1 : 0);
    const r = praktijk(ctx, t, { noor: 1720, noorKijk: -1, noorKnik: -0.13 * KM, uitN: q.on('Noor', 1) > 0.5 ? 'blij' : 'neutraal', uitJ: q.on('goed', 1) > 0.5 ? 'blij' : 'neutraal', uitH: 'blij', leunH: W8 > 0.5 ? 8 : 0,
      optJ: Sc > 0.01 ? { armDoel: { R: { dx: lerp(-0.4, 1.3 + schr, ease(Sc)), dy: lerp(0.93, 0.38, ease(Sc)) } } } : {},
      opTafel: c => { laag(c, M, () => weegschaalBoven(c, 1090, 856, 0.62, 0.3)); if (t > tS - 0.3) eetdagboek(c, dbx, 640, 0.55, { vul, a: ramp(t, tS - 0.3, 0.4) }); } });
    // pen in Joosts hand op 'schrijft': hij schrijft de regels zelf
    if (Sc > 0.3 && r.J && r.J.handR) { const h = r.J.handR; ctx.save(); ctx.globalAlpha *= clamp((Sc - 0.3) / 0.3, 0, 1); pen(ctx, h.x + 16, h.y - 30, 0.62, 0.4); handOp(ctx, 'joost', { x: h.x + 4, y: h.y - 4, ang: 0.5 }); ctx.restore(); }
    naamDonker(ctx, 'Hanneke', 'diëtist', 640, 405, L * q.on('Hanneke', 1, 0.4)); naamDonker(ctx, 'Joost', q.on('vijfenvijftig', 1) > 0.5 ? '55 · via de huisarts' : '', 1280, 405, L * q.on('Joost', 1, 0.4));
    naamDonker(ctx, 'Noor', 'loopt een dag mee', 1700, 372, L * q.on('Noor', 1, 0.4));
    // gewicht: weegschaal naast de tafel, van bovenaf met leeg display; buikomvang: meetlint om Joosts middel
    const Gw = M * q.on('gewicht', 1, 0.4), Bo = M * q.on('buikomvang', 1, 0.4);
    zoomCircle(ctx, 960, 300, 130, 1090, 846, '', Gw, () => { bg(ctx, 'schema'); weegschaalBoven(ctx, 960, 306, 1.0); });
    metaA(ctx, 'GEWICHT', 960, 146, Gw, C.grain, 'center', 28);
    zoomCircle(ctx, 1530, 330, 130, 1305, 688, '', Bo, () => { bg(ctx, 'schema'); buikZoom(ctx, 1530, 330, t); });
    metaA(ctx, 'BUIKOMVANG', 1530, 176, Bo, C.grain, 'center', 28);
    tag(ctx, 'ook een weekenddag', 960, 470, C.oker, q.on('weekenddag', 1) * (1 - W8), 'center', 30);
    spreek(ctx, 250, 360, 430, 92, 'Wat at je gisteren?', W8, ...mond(r.H), 34); },

  s06(ctx, t, q) { praktijkDecor(ctx); const Z = ease(clamp(t / 1.4, 0, 1)), H8 = q.on('Hoe', 1, 0.6), E = q.on('echt', 1, 0.5);
    // camera zakt naar het dagboek op tafel
    laag(ctx, 1 - Z, () => praktijk(ctx, t, { opTafel: c => eetdagboek(c, 960, 640, 0.55, { iconen: 1 }) }));
    laag(ctx, Z, () => { bg(ctx, 'schema'); const x = lerp(960, 560, H8), s = lerp(1.6, 1.15, H8);
      [0, 1, 2].forEach(k => dichtBoek(ctx, x - 300 + k * 26, 520 + k * 10, 0.9, ['#5B7FA8', '#8C7BBF', '#6FA878'][k], H8 * 0.9));
      eetdagboek(ctx, x, 480, s, { iconen: 1 }); naamBij(ctx, 'het dagboek van Joost', 'MA · DI · WO · ZA', x, 480 - 140 * s - 30, 1 - H8, 'center');
      chip(ctx, 'een week later', x, 860 - 40, C.text2, q.on('week', 1) * (1 - H8), 28);
      dagboekStaven(ctx, 1230, 760, { h1: 300, a1: H8, a2: E }); }); },

  s08(ctx, t, q) { const tV = q.at('vergeet', 1) - 0.3, tO = q.at('overkomt', 1) - 0.3, tH = q.at('Hanneke', 1) - 0.4;
    const A = 1 - ramp(t, tV, 0.5), B = ramp(t, tV, 0.5) * (1 - ramp(t, tO, 0.5)), Cc = ramp(t, tO, 0.5) * (1 - ramp(t, tH, 0.5)), D = ramp(t, tH, 0.5);
    bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: er staat te weinig in', A * (1 - q.on('Dat', 1)));
    laag(ctx, A, () => { const G = ease(clamp((t - 0.3) / 1.6, 0, 1)), Z = q.on('zwaar', 1);
      dagboekStaven(ctx, 420, 760, { h1: 300, h2: 390, groei: G, vers: q.on('tien', 1) });
      naamBij(ctx, 'meestal 10 tot 30 % te weinig', '', 810, 300, q.on('tien', 1), 'left', C.goud); metaA(ctx, 'SOMS NOG MEER', 810, 350, q.on('Soms', 1), C.grain, 'left', 28);
      laag(ctx, Z, () => { roundRect(ctx, 1180, 420, 600, 360, 20); shape(ctx, rgba('#0D1420', 0.6), rgba(C.line, 0.6), 1.5); glasZwaarWater(ctx, 1320, 590, 1.6);
        naamBij(ctx, 'zwaar water', 'METING · VEREENVOUDIGD', 1420, 540, 1, 'left'); });
      tag(ctx, 'hoeveel energie je echt verbruikt', 1480, 850 - 20, C.koraal, q.on('energie', 1), 'center', 28);
      pijl(ctx, 1170, 600, 820, 520, C.goud, q.on('vergelijk', 1), 4, 18); });
    laag(ctx, B, () => { const w = 480, y = 230, h = 460;
      oorzaakKaart(ctx, 150, y, w, h, 'iets vergeten', 'MELK IN DE KOFFIE', q.on('vergeet', 1), (cx, cy) => { eten(ctx, 'koffie', cx - 40, cy + 10, 1.8); melkPak(ctx, cx + 100, cy + 10, 1.3, 1, true); });
      oorzaakKaart(ctx, 720, y, w, h, 'portie te klein', 'GESCHAT', q.on('schat', 1), (cx, cy) => { bordTafel(ctx, cx - 90, cy + 40, 0.8); eten(ctx, 'rijst', cx - 90, cy + 10, 0.7); bordTafel(ctx, cx + 90, cy + 40, 1.15); eten(ctx, 'rijst', cx + 90, cy + 4, 1.15);
        metaText(ctx, 'GESCHAT', cx - 90, cy - 70, C.text2, 'center', 22); metaText(ctx, 'ECHT', cx + 90, cy - 70, C.text2, 'center', 22); });
      oorzaakKaart(ctx, 1290, y, w, h, 'anders eten', 'OMDAT JE OPSCHRIJFT', q.on('anders', 1), (cx, cy) => { eetdagboek(ctx, cx, cy, 0.62, { iconen: 1 }); pen(ctx, cx + 120, cy - 10, 0.9, -0.5); }); });
    laag(ctx, Cc, () => { const xs = [360, 600, 840, 1080, 1320, 1560]; xs.forEach((x, k) => k === 2 ? eetdagboek(ctx, x, 470, 0.62, { iconen: 1 }) : dichtBoek(ctx, x, 470, 0.95, ['#5B7FA8', '#8C7BBF', '#6FA878', '#C9A35C', '#5B9AC0', '#B98A80'][k], q.on('veel', 2, 0.3 + k * 0.08)));
      naamBij(ctx, 'Joost', '', 840, 660, 1, 'center'); tag(ctx, 'heel veel mensen, niet alleen Joost', 960, 790, C.goud, q.on('mensen', 1), 'center', 32); });
    laag(ctx, D, () => { praktijkDecor(ctx); praktijk(ctx, t, { uitH: 'blij', uitJ: 'blij', opTafel: c => { eetdagboek(c, 900, 640, 0.55, { iconen: 1 }); bordTafel(c, 1110, 690, 0.9); } });
      tag(ctx, 'een schatting, geen verwijt', 960, 300, C.goud, q.on('schatting', 1), 'center', 34); }); },

  // ---------- H2 De Schijf van Vijf ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const F = ease(clamp((t - 0.2) / 2.2, 0, 1)), S = q.on('Vijf', 1, 1.4), V = q.on('vakken', 1, 0.6);
    // dagboek in een zoomcirkel die zich sluit; producten stijgen op en vormen de ring
    const rc = lerp(900, 0, ease(clamp(t / 1.6, 0, 1))); if (rc > 2) cirkelOpen(ctx, 960, 500, rc, () => { bg(ctx, 'schema'); eetdagboek(ctx, 960, 500, 1.4, { iconen: 1 }); });
    const prod = ['boterham', 'tomaat', 'kaas', 'melk', 'ei'];
    laag(ctx, 1 - S, () => prod.forEach((k, i) => { const an = -Math.PI / 2 + i * 2 * Math.PI / 5, tx = SCH.cx + Math.cos(an) * SCH.R * 0.7, ty = SCH.cy + Math.sin(an) * SCH.R * 0.7, u = ease(clamp(F * 1.3 - i * 0.08, 0, 1));
      eten(ctx, k, lerp(960, tx, u), lerp(560, ty, u) - Math.sin(u * Math.PI) * 60, 1.1, u > 0.02 ? 1 : 0); }));
    const cues = ['Groente', 'Brood', 'Peulvruchten', 'Vetten', 'dranken'], lit = cues.map((c, i) => q.on(c, 1, 0.4) * (1 - (i < 4 ? q.on(cues[i + 1], 1, 0.4) : 0)));
    schijf(ctx, SCH.cx, SCH.cy, SCH.R, { a: S, inhoud: 0, lit, dim: q.on('Groente', 1) * 0.5, namenAl: cues.map(c => q.on(c, 1, 0.4)), namen: 1 });
    laag(ctx, S, () => { const ic = [[['tomaat', 'tomaat'], ['appel', 'appel']], [['boterham', 'boterhammen'], ['rijst', 'rijst']], [['kaas', 'kaas'], ['ei', 'ei', 2]], [['olie', 'olijfolie']], [['water', 'water'], ['thee', 'thee']]];
      ic.forEach((set, i) => { const [mx, my] = vakMidden(i), am = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / 5; set.forEach(([k, cue, n], j) => { const off = (j - (set.length - 1) / 2) * 70; eten(ctx, k, mx + off * Math.cos(am + 1.57), my + off * Math.sin(am + 1.57), 0.85, q.on(cue, n || 1, 0.4)); }); }); });
    metaA(ctx, 'VERNIEUWD · APRIL 2026 · VOEDINGSCENTRUM', 1840, 110, q.on('april', 1), C.grain, 'right', 24);
    tag(ctx, 'vijf vakken', 1600, 300, C.goud, V * (1 - q.on('Groente', 1)), 'center', 34);
    filmKaartje(ctx, 1450, 780, 'Wat zit er in je eten?', q.on('vakken', 1)); },

  s10(ctx, t, q) { bg(ctx, 'schema'); schijf(ctx, SCH.cx, SCH.cy, SCH.R, { inhoud: 1, namen: 1 });
    const B = q.on('bonen', 1, 0.5), y = 520 + Math.sin(t * 1.6) * 14, x = 1660 + Math.sin(t * 0.9) * 10;
    eten(ctx, 'bonenblik', x, y, 2.0, B); naamBij(ctx, 'bruine bonen', '', x, y + 140, B, 'center', C.oker); vraagteken(ctx, x, y - 130, q.on('welk', 1), 90);
    metaA(ctx, 'VERNIEUWD · APRIL 2026 · VOEDINGSCENTRUM', 1840, 110, 1, C.grain, 'right', 24); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: bij vlees en vis', 1 - q.on('eiwit', 1)); const u = ease(clamp((t - 0.4) / 1.8, 0, 1));
    schijf(ctx, SCH.cx, SCH.cy, SCH.R, { inhoud: 1, namen: 1, lit: [0, 0, u, 0, 0], dim: 0.5 * u });
    // het blik maakt een boog onder de vaknaam van het broodvak door en eindigt helemaal in het vak peulvruchten
    const P = [[1660, 520], [1700, 860], [1180, 800], [930, 690]], v = 1 - u, bz = k => v * v * v * P[0][k] + 3 * v * v * u * P[1][k] + 3 * v * u * u * P[2][k] + u * u * u * P[3][k];
    eten(ctx, 'bonenblik', bz(0), bz(1), lerp(2.0, 0.8, u));
    eten(ctx, 'vlees', 772, 680, 0.7, q.on('vlees', 1)); eten(ctx, 'vis', 796, 610, 0.7, q.on('vis', 1));
    // één regel naast de vaknaam
    tag(ctx, 'peulvruchten', 1090, 812, C.oker, q.on('peulvruchten', 1), 'left', 32); tag(ctx, 'veel eiwit', 1340, 812, C.goud, q.on('eiwit', 1), 'left', 32); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const VC = q.on('Voedingscentrum', 1), GR = q.on('Gezondheidsraad', 1), M = q.on('meeste', 1);
    const cx = lerp(SCH.cx, 600, ease(VC)), R = lerp(SCH.R, 240, ease(VC));
    schijf(ctx, cx, SCH.cy, R, { inhoud: 1, namen: 1 - VC, lit: VC > 0.5 ? [1, 0, 0, 0, 0] : [M, M, M, M, M], dim: 0.5 * VC });
    tag(ctx, 'elke dag het meeste', 1500, 300, C.goud, M * (1 - VC), 'center', 34);
    laag(ctx, VC, () => { const x0 = 1000; metaText(ctx, 'GROENTE EN FRUIT PER DAG', x0, 270, C.text2, 'left', 24);
      const u = ease(clamp((t - q.at('tweehonderdvijftig', 1)) / 1.2, 0, 1)); roundRect(ctx, x0, 310, 625 * u + 4, 70, 12); shape(ctx, rgba(C.groen, 0.55), C.groen, 2);
      text(ctx, '250 g groente + 2 stuks fruit', x0 + 24, 358, fTekst(38, 700), C.text, 'left'); metaText(ctx, 'ADVIES · VOEDINGSCENTRUM', x0, 422, C.grain, 'left', 24);
      laag(ctx, GR, () => { roundRect(ctx, x0, 480, 500, 40, 10); shape(ctx, rgba(C.groen, 0.3), rgba(C.groen, 0.8), 1.5); text(ctx, '≥ 200 g groente', x0 + 20, 510, fTekst(30, 600), C.text, 'left'); metaText(ctx, 'ONDERGRENS · GEZONDHEIDSRAAD', x0, 564, C.grain, 'left', 24); });
      tag(ctx, 'een heel dagmenu', 1240, 680, C.goud, q.on('dagmenu', 1), 'center', 32); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); schijf(ctx, SCH.cx, SCH.cy, SCH.R, { inhoud: 1, namen: 1 });
    const P = q.on('pizza', 1, 0.5), y = 545 + Math.sin(t * 1.5) * 12, x = 1680 + Math.sin(t * 0.8) * 8;
    eten(ctx, 'pizza', x, y, 1.9, P); naamBij(ctx, 'pizza uit de winkel', '', 1680, 420, P, 'center', C.oker); vraagteken(ctx, 1680, 760, q.on('Waar', 1), 90); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder vaak', 1 - q.on('vuistregel', 1)); const u = ease(clamp((t - 0.4) / 1.4, 0, 1)), Z = q.on('vak', 1, 0.6);
    const cx = lerp(SCH.cx, 520, u), R = lerp(SCH.R, 230, u); schijf(ctx, cx, 480, R, { inhoud: 1, namen: 0 });
    laag(ctx, Z, () => { roundRect(ctx, 960, 200, 880, 640, 26); ctx.setLineDash([14, 10]); shape(ctx, rgba(C.oker, 0.06), rgba(C.oker, 0.9), 2.5); ctx.setLineDash([]); metaText(ctx, 'BUITEN DE SCHIJF · BEPERKEN', 1400, 250, C.oker, 'center', 26); });
    const px = lerp(1660, 1080, ease(Z)), py = lerp(520, 380, ease(Z)); eten(ctx, 'pizza', q.on('vuistregel', 1) > 0.5 ? lerp(px, 1290, q.on('groots', 1)) : px, q.on('vuistregel', 1) > 0.5 ? lerp(py, 680, q.on('groots', 1)) : py, lerp(1.9, 0.9, ease(Z)), 1 - q.on('vuistregel', 1) * (1 - q.on('groots', 1)));
    tag(ctx, 'geen verbod: minder vaak', 1400, 520, C.goud, q.on('verbod', 1) * (1 - q.on('vuistregel', 1)), 'center', 34);
    laag(ctx, q.on('kleins', 1), () => { eten(ctx, 'koekje', 1060, 400, 1.2); text(ctx, 'klein', 1140, 390, fTekst(38, 700), C.text, 'left'); metaText(ctx, '3 TOT 5 KEER PER DAG', 1140, 430, C.grain, 'left', 24); });
    laag(ctx, q.on('groots', 1), () => { eten(ctx, 'croissant', 1050, 690, 0.9); eten(ctx, 'chips', 1170, 690, 0.9); text(ctx, 'groot', 1380, 680, fTekst(38, 700), C.text, 'left'); metaText(ctx, 'HOOGUIT 3 KEER PER WEEK', 1380, 720, C.grain, 'left', 24); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); schijf(ctx, 640, 470, 270, { inhoud: 1, namen: 0 });
    const r = persoon(ctx, 'noor', 1380, VLOER, 440, { t, kijk: -1, uit: q.on('Waarop', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('mening', 1) > 0.5 ? 'denk' : 'staan' });
    spreek(ctx, 1150, 270, 420, 92, 'Gewoon een mening?', q.on('mening', 1), ...mond(r), 34); vraagteken(ctx, 1010, 430, q.on('Waarop', 1), 100); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: op onderzoek', 1 - q.on('Gezondheidsraad', 1)); const tW = q.at('Wie', 1) - 0.4, A = 1 - ramp(t, tW, 0.5), B = ramp(t, tW, 0.5);
    laag(ctx, A, () => { const N = q.on('naast', 1, 1.2);
      commissieTafel(ctx);
      // de studies liggen óp het tafelblad: eerst op een stapel, op 'naast elkaar' uitgespreid
      for (let k = 0; k < 8; k++) { const sx = lerp(960 + (hash(k) - 0.5) * 110, 400 + k * 160, N), sy = lerp(552 - k * 3, 556, N); ctx.save(); ctx.translate(sx, sy); ctx.scale(1, 0.55); studieVel(ctx, 0, 0, 0.95, ramp(t, q.at('onderzoek', 1) + k * 0.12, 0.4), k); ctx.restore(); }
      naamBij(ctx, 'Richtlijnen goede voeding', 'GEZONDHEIDSRAAD', 960, 300, q.on('Gezondheidsraad', 1), 'center'); });
    laag(ctx, B, () => { schijf(ctx, 480, 480, 250, { inhoud: 1, namen: 0, lit: [1, 0, 0, 0, 0], dim: 0.6 });
      text(ctx, 'meer groente en fruit:', 820, 230, fTekst(40, 700), C.text, 'left'); metaA(ctx, 'MINDER KANS · GEEN GARANTIE', 820, 276, q.on('minder', 1), C.grain, 'left', 26);
      const kaarten = [['hart- en vaatziekten', 'hart-', 360, true], ['beroerte', 'beroerte', 460, true], ['diabetes type 2', 'diabetes', 600, false], ['darmkanker', 'darmkanker', 700, false]];
      kaarten.forEach(([s2, cue, y, dik]) => ziekteKaart(ctx, 820, y, 560, s2, q.on(cue, 1), dik));
      metaA(ctx, 'BEWIJS STERK', 1410, 420, q.on('sterk', 1), C.groen, 'left', 26); metaA(ctx, 'BEWIJS MINDER STERK', 1410, 660, q.on('andere', 1), C.text2, 'left', 26); }); },

  // ---------- H3 Een advies op maat ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const rc = lerp(60, 1400, ease(clamp(t / 1.5, 0, 1))), H8 = q.on('Hoe', 1, 0.8);
    if (rc < 1390) { schijf(ctx, 960, 650, 60, { inhoud: 0, lit: [1, 0, 0, 0, 0] }); }
    // op 'Hoe begint ze het gesprek?': Hanneke iets naar voren met open handen, Joost hoofd iets omlaag
    const open = { dx: lerp(-0.4, 0.02, H8), dy: lerp(0.92, 0.58, H8) };
    cirkelOpen(ctx, 960, 650, rc, () => { praktijkDecor(ctx); praktijk(ctx, t, { uitH: 'blij', uitJ: 'neutraal', leunH: lerp(6, 14, H8), optH: H8 > 0.01 ? { armDoel: { R: open, L: open } } : {}, optJ: { knik: -0.1 * H8 },
      opTafel: c => { eetdagboek(c, 820, 640, 0.55, { iconen: 1, a: 1 }); velPapier(c, 1080, 650, 150, 100, 1, { lijnen: 5 }); bordTafel(c, 960, 690, 0.8); } }); });
    tag(ctx, 'genoeg dat anders kan', 860, 420, C.oker, q.on('dagboek', 1) * (1 - H8), 'center', 30); vraagteken(ctx, 960, 330, H8, 100); },

  s22(ctx, t, q) { praktijkDecor(ctx); antwoord(ctx, 'antwoord a: ze vraagt wat hij wil', 1 - q.on('Hanneke', 1));
    const vs = ease(clamp((t - 0.4) / 1.2, 0, 1)), Tl = ease(q.on('telefoon', 1, 0.7)), Fo = q.on('foto', 1, 0.5), Hr = q.on('hoort', 1, 0.4);
    const r = praktijk(ctx, t, { uitH: Hr > 0.5 ? 'blij' : 'neutraal', uitJ: Fo > 0.5 ? 'blij' : 'neutraal', leunH: 10,
      // op 'telefoon': Joost heft de telefoon schuin op in zijn hand
      optJ: Tl > 0.01 ? { armDoel: { R: { dx: lerp(-0.4, 0.5, Tl), dy: lerp(0.93, -0.1, Tl) } } } : {},
      opTafel: c => { velPapier(c, lerp(1080, 870, vs), lerp(650, 668, vs), 150, 100, 1, { lijnen: 5, rot: -0.12 * vs }); eetdagboek(c, 820, 640, 0.55, { iconen: 1 }); } });
    let src = [1190, 590]; if (Tl > 0.01 && r.J && r.J.handR) { const h = r.J.handR; src = [h.x - 4, h.y - 26]; ctx.save(); ctx.globalAlpha *= clamp(Tl * 3, 0, 1); telefoonIn(ctx, src[0], src[1], 0.3, 1.1); handOp(ctx, 'joost', { x: h.x, y: h.y, ang: 0.6 }); ctx.restore(); }
    // de foto in een zoomcirkel naast hem, vanaf 'foto'
    zoomCircle(ctx, 960, 285, 160, src[0], src[1], '', Fo, () => { bg(ctx, 'schema'); telefoonFoto(ctx, 960, 285, 1.02, { kind: 'fleur' }); });
    const Kl = q.on('kleindochter', 1) * (1 - q.on('bijhouden', 1, 0.3)), Mh = q.on('bijhouden', 1) * (1 - q.on('zegt', 1, 0.3)), Rd = q.on('reden', 1);
    naamBij(ctx, 'kleindochter', '', 930, 506, Kl, 'center');
    tag(ctx, 'met haar mee kunnen', 880, 510, C.goud, Mh, 'center', 30);
    tag(ctx, 'zijn reden', 930, 510, C.goud, Rd, 'center', 34);
    spreek(ctx, 230, 340, 470, 92, 'Wat wil jij veranderen?', q.on('vraagt', 1, 0.3) * (1 - q.on('pakt', 1, 0.3)), ...mond(r.H), 32);
    tag(ctx, 'zegt terug wat ze hoort', 440, 270, C.text2, q.on('terug', 1) * (1 - Rd), 'center', 28);
    spreek(ctx, 170, 320, 560, 100, 'Je wilt met haar mee kunnen.', Hr, ...mond(r.H), 32); },

  s23(ctx, t, q) { praktijkDecor(ctx); const tZ = q.at('Zegt', 1) - 0.3, A = 1 - ramp(t, tZ, 0.5), B = ramp(t, tZ, 0.5), J = q.on('ja,', 1, 0.4), HP = q.on('helpt', 1, 0.5);
    const r = praktijk(ctx, t, { uitH: B > 0.5 && HP < 0.5 ? 'ernstig' : 'blij', uitJ: J > 0.5 && HP < 0.5 ? 'bezorgd' : 'neutraal', leunH: B > 0.5 && HP < 0.5 ? 0 : 10, opTafel: c => eetdagboek(c, 960, 640, 0.55, { iconen: 1 }) });
    laag(ctx, A, () => { naamBij(ctx, 'motiverende gespreksvoering', '', 960, 150, q.on('motiverende', 1), 'center', C.goud);
      [['open vragen', 0], ['luisteren', 1], ['eigen reden', 2]].forEach(([s2, k]) => { const a = q.on('gespreksvoering', 1, 0.4 + k * 0.3), hl = k === 2 ? q.on('zelf', 1) : 0;
        laag(ctx, a, () => { roundRect(ctx, 520 + k * 300, 200, 280, 80, 14); shape(ctx, rgba('#0D1420', 0.85), hl > 0.5 ? C.goud : rgba(C.line, 0.8), hl > 0.5 ? 3 : 1.5); text(ctx, s2, 660 + k * 300, 252, fTekst(34, 700), hl > 0.5 ? C.goud : C.text, 'center'); }); });
      tag(ctx, 'meer kans dat het lukt', 960, 380, C.groen, q.on('kans', 1), 'center', 30); });
    laag(ctx, B, () => { spreek(ctx, 170, 330, 480, 96, 'Je moet meer groente eten.', 1 - HP, ...mond(r.H), 30); spreek(ctx, 1220, 340, 260, 90, 'Ja, maar…', J * (1 - HP), ...mond(r.J), 36);
      pijlPaar(ctx, 960, 200, false, J * (1 - HP)); metaA(ctx, 'ERTEGENIN GAAN', 960, 272, J * (1 - HP), C.koraal, 'center', 26);
      pijlPaar(ctx, 960, 200, true, HP); metaA(ctx, 'MEEBEWEGEN', 960, 302, HP, C.goud, 'center', 26);
      tag(ctx, 'helpt, maar geen toverformule', 960, 420, C.goud, q.on('toverformule', 1), 'center', 30); }); },

  s24(ctx, t, q) { praktijkDecor(ctx); const sch = ease(clamp((t - q.at('schuift', 1)) / 1.2, 0, 1)), V = q.on('valt', 1, 0.5), AD = q.on('advies', 1, 0.5), K = ease(q.on('kiest', 1, 0.6));
    // op 'kiest' wijst Joost het kaartje aan
    const r = praktijk(ctx, t, { uitH: 'blij', uitJ: q.on('ziet', 1) > 0.5 ? 'verbaasd' : 'neutraal', leunH: 8, leunJ: K > 0.5 ? 10 : 0,
      optJ: K > 0.01 ? { armDoel: { R: { dx: lerp(-0.4, 1.5, K), dy: lerp(0.93, -4.8, K), k1: lerp(0.85, 1, K), k2: lerp(0.75, 1, K) } } } : {},
      opTafel: c => { eetdagboek(c, lerp(960, 860, sch), 640, 0.55, { iconen: 1 }); laag(c, sch, () => { roundRect(c, 1010, 560, 160, 140, 12); shape(c, rgba('#0D1420', 0.85), rgba(C.line, 0.7), 1.5); schijf(c, 1090, 630, 58, { inhoud: 0, lit: [V, 0, 0, 0, 0] }); }); } });
    zoomCircle(ctx, 960, 280, 190, 960, 600, '', V * (1 - AD), () => { bg(ctx, 'schema'); eetdagboek(ctx, 870, 280, 0.62, { iconen: 1 }); schijf(ctx, 1065, 280, 70, { inhoud: 0, lit: [1, 0, 0, 0, 0], dim: 0.6 }); });
    spreek(ctx, 250, 370, 400, 90, 'Wat valt je op?', q.on('vraagt', 1, 0.3) * (1 - q.on('Natuurlijk', 1, 0.4)), ...mond(r.H), 34);
    tag(ctx, 'weinig groente', 1300, 280, C.groen, q.on('weinig', 1) * (1 - AD), 'left', 32);
    adviesVel(ctx, 730, 140, AD, { n: clamp((t - q.at('advies', 1)) / 0.4, 0, 3), hl: K, vk: K });
    metaA(ctx, 'JOOST KIEST ZELF', 960, 436, K, C.goud, 'center', 26); },

  // ---------- H4 Gewoontes veranderen ----------
  s25(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('morgen', 1), Kl = q.on('kleine', 1), Al = q.on('als-dan', 1), Tv = q.on('tv', 1), Bk = q.on('bakje', 1), To = q.on('toevoegen', 1), Wl = q.on('weglaten', 1);
    const rc = lerp(1400, 0, ease(clamp(t / 1.2, 0, 1))); if (rc > 2) cirkelOpen(ctx, 960, 650, rc, () => { praktijkDecor(ctx); praktijk(ctx, t, { opTafel: c => eetdagboek(c, 960, 640, 0.55, { iconen: 1 }) }); });
    const cw = (1400 - 72) / 7;
    laag(ctx, ease(clamp((t - 0.6) / 1, 0, 1)), () => { weekbord(ctx, 260, 160, 1400, { status: [Bk > 0.5 ? 1 : 0] });
      if (M > 0.01 && Bk < 0.5) { roundRect(ctx, 254, 154, cw + 12, cw + 12, 14); ctx.strokeStyle = rgba(C.goud, M); ctx.lineWidth = 4; ctx.stroke(); } });
    // de kleine stap staat er eerst als lege (gestippelde) kaart; op 'als-dan' wordt het het plan
    laag(ctx, Kl * (1 - Al), () => { roundRect(ctx, 260, 400, 1400, 220, 18); ctx.setLineDash([14, 10]); shape(ctx, rgba('#0D1420', 0.5), rgba(C.goud, 0.8), 2.5); ctx.setLineDash([]); text(ctx, 'een kleine, concrete stap', 960, 528, fTekst(44, 700), C.goud, 'center'); });
    laag(ctx, Al, () => { roundRect(ctx, 260, 400, 1400, 220, 18); shape(ctx, rgba('#0D1420', 0.88), C.goud, 2.5); metaText(ctx, 'ALS-DAN-PLAN', 290, 442, C.goud, 'left', 24);
      text(ctx, "als ik 's avonds de tv aanzet,", 290, 515, fTekst(40, 700), C.text, 'left'); laag(ctx, q.on('dan', 2), () => text(ctx, 'dan pak ik een bakje tomaatjes', 290, 580, fTekst(40, 700), C.goud, 'left'));
      tvIcoon(ctx, 1320, 510, 0.9, Tv, Tv); bakjeTomaatjes(ctx, 1520, 540, 1.1, Bk); });
    laag(ctx, To, () => { roundRect(ctx, 260, 680, 640, 80, 14); shape(ctx, rgba(C.groen, 0.15), C.groen, 2); text(ctx, '+ iets toevoegen', 300, 734, fTekst(36, 700), C.text, 'left'); vink_(ctx, 840, 718, 18, 1, C.groen); });
    laag(ctx, Wl, () => { roundRect(ctx, 940, 680, 640, 80, 14); shape(ctx, rgba(C.fill, 0.4), rgba(C.line, 0.7), 1.5); text(ctx, '− iets weglaten', 980, 734, fTekst(36, 700), C.text2, 'left'); metaText(ctx, 'LUKT MINDER GOED', 1560, 732, C.text2, 'right', 26); });
    filmKaartje(ctx, 1600, 790, 'Leren', q.on('Leren', 1)); },

  s26(ctx, t, q) { bg(ctx, 'schema'); const u = ease(clamp(t / 4, 0, 1));
    gewoonteCurve(ctx, 300, 220, 1100, 520, { u, lijnen: [q.on('drie', 1), q.on('gemiddeld', 1), q.on('schatting', 1)] });
    metaA(ctx, 'ÉÉN ONDERZOEK (ENGELAND) · MODEL', 1400, 190, q.on('Engels', 1), C.grain, 'right', 24); },

  s27(ctx, t, q) { praktijkDecor(ctx); const Pa = q.on('paar', 1), R = q.on('rot', 1, 0.6);
    // bellen: telefoon aan het oor (hand bij het oor via armDoel)
    const oor = { R: { dx: -0.1, dy: -0.88, k1: 0.9, k2: 0.85 } };
    const rH = persoonX(ctx, 'hanneke', 420, VLOER, 470, { t, kijk: 1, uit: 'neutraal', armDoel: oor }); belt(ctx, 'hanneke', rH, 1);
    // weekbord op een eigen donker paneel, 'na drie weken' eronder
    roundRect(ctx, 728, 62, 1064, 228, 18); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.6), 1.5);
    weekbord(ctx, 760, 110, 1000, { status: [1, 1, Pa > 0.5 ? 2 : 1, 1, Pa > 0.5 ? 2 : 1, Pa > 0.5 ? 2 : 1, 1] });
    tag(ctx, 'na drie weken', 900, 352, C.text2, 1, 'center', 30);
    zoomCircle(ctx, 1390, 575, 240, rH.handR ? rH.handR.x + 20 : 470, rH.handR ? rH.handR.y - 10 : 430, 'JOOST · THUIS', 1, () => { bg(ctx, 'schema');
      const rJ = persoonX(ctx, 'joost', 1390, 805, 420, { t, kijk: -1, outfit: 'spreekuur', uit: R > 0.5 ? 'bezorgd' : 'neutraal', armDoel: oor, knik: -0.13 * R }); belt(ctx, 'joost', rJ, -1); });
    vraagteken(ctx, 990, 560, q.on('betekent', 1), 100); },

  s29(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: hij gaat gewoon door', 1 - q.on('telkens', 1)); const tH = q.at('Hanneke', 1) - 0.4, A = 1 - ramp(t, tH, 0.5), B = ramp(t, tH, 0.5);
    laag(ctx, A, () => { const u = ease(clamp(t / 4, 0, 1)); doorloopCurve(ctx, 260, 240, 1000, 480, { u, grijs: 1, tel: q.on('telkens', 1) });
      tag(ctx, 'uitglijder, geen mislukking', 1560, 330, C.goud, q.on('uitglijder', 1), 'center', 32);
      naamBij(ctx, 'telkens overslaan', '', 1280, 690, q.on('telkens', 1), 'left', C.text2);
      tag(ctx, 'de meeste mensen vallen een keer terug', 960, 830, C.text2, q.on('meeste', 1), 'center', 30); });
    laag(ctx, B, () => { const W = q.on('wél', 1); weekbord(ctx, 260, 160, 1400, { status: [1, 1, 2, 1, 2, 2, 1] });
      if (W > 0.01) [0, 1, 3, 6].forEach(i => { const cw = (1400 - 72) / 7; roundRect(ctx, 260 + i * (cw + 12) - 6, 154, cw + 12, cw + 12, 14); ctx.strokeStyle = rgba(C.goud, W); ctx.lineWidth = 4; ctx.stroke(); });
      metaA(ctx, 'WAT WÉL LUKTE', 960, 400, W, C.goud, 'center', 24);
      laag(ctx, q.on('plan', 1), () => { roundRect(ctx, 260, 440, 1400, 220, 18); shape(ctx, rgba('#0D1420', 0.88), C.goud, 2.5); metaText(ctx, 'PLAN VOOR ALS HET MISGAAT', 290, 482, C.goud, 'left', 24);
        laag(ctx, q.on('oversla', 4), () => text(ctx, 'als ik een avond oversla,', 290, 555, fTekst(40, 700), C.text, 'left')); laag(ctx, q.on('dan', 1), () => text(ctx, 'dan pak ik de volgende avond weer het bakje', 290, 620, fTekst(40, 700), C.goud, 'left'));
        bakjeTomaatjes(ctx, 1540, 580, 1.0, q.on('bakje', 1)); });
      tag(ctx, 'het plan van Joost', 960, 760, C.goud, q.on('Joosts', 1), 'center', 32); }); },

  // ---------- Recap ----------
  s30(ctx, t, q) { praktijkDecor(ctx); const K = q.on('diëtist', 1, 0.6);
    ctx.save(); ctx.translate(CAM_WIJD.tx, CAM_WIJD.ty); ctx.scale(CAM_WIJD.s, CAM_WIJD.s);
    // het dagboek ligt plat op tafel links van Hanneke; de handdruk staat vóór de tafel en boven het tafelblad
    tafel(ctx, 960, TAFEL_Y + 60, 1000); dagboekPlat(ctx, 560, TAFEL_Y + 40);
    noorMee(ctx, 1720, t, { uitN: 'blij' });
    handdruk(ctx, 'hanneke', 'joost', 960, VLOER + 40, 470, { t, schud: clamp((t - 0.6) / 2.2, 0, 1), outfitR: 'spreekuur', uitL: 'blij', uitR: 'blij' });
    ctx.restore();
    roundRect(ctx, 1110, 170, 700, 700, 20); shape(ctx, rgba('#0D1420', 0.6), null);
    kloofStaven(ctx, 1300, 760, 500, { w: ramp(t, 0.3, 0.8), d: ramp(t, 0.3, 0.8), gw: q.on('Gewoontes', 1), kort: true });
    tag(ctx, 'weten is niet genoeg', 1460, 240, C.goud, q.on('genoeg', 1) * (1 - q.on('Gewoontes', 1)), 'center', 30);
    const kaart = [['meten', 'meet', (x, y) => eetdagboek(ctx, x, y, 0.28, { iconen: 1 })], ['de schijf', 'Schijf', (x, y) => schijf(ctx, x, y, 44, { inhoud: 0 })],
      ['eigen reden', 'reden', (x, y) => telefoonFoto(ctx, x, y + 4, 0.4, { kind: 'fleur' })], ['kleine stappen', 'kleine', (x, y) => weekbord(ctx, x - 90, y - 22, 180, { status: [1, 1, 1, 0, 0, 0, 0] })]];
    kaart.forEach(([s2, cue, teken], i) => { const a = K * q.on(cue, 1), x = 70 + i * 255, y = 150; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 235, 190, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.85), 2); teken(x + 117, y + 70); text(ctx, s2, x + 117, y + 168, fTekst(32, 700), C.text, 'center'); ctx.restore(); }); },

  s31(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'diëtist = beschermde titel', 560, 180, C.goud, q.on('beschermde', 1), 'center', 34);
    const kaart = (i, n, o, m, a, extra, hk = 180) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 260 + i * 220; roundRect(ctx, 120, y, 1100, hk, 18); shape(ctx, rgba('#0D1420', 0.88), i ? rgba(C.line, 0.8) : C.groen, 2);
      text(ctx, n, 170, y + 80, fTitel(52), i ? C.text2 : C.groen); text(ctx, o, 320, y + 76, fTekst(44, 700), C.text); metaText(ctx, m, 320, y + 124, C.grain, 'left', 26); if (extra) extra(y); ctx.restore(); };
    kaart(0, 'hbo', 'Voeding en Diëtetiek', 'HAN · NIJMEGEN · 4 JAAR', q.on('Diëtetiek', 1), y => metaText(ctx, 'DIËTIST', 1180, y + 80, C.groen, 'right', 28));
    kaart(1, 'wo', 'Voeding en Gezondheid', 'WAGENINGEN · 3 JAAR', q.on('Wageningen', 1), y => { metaA(ctx, 'GEEN DIËTIST', 1180, y + 80, q.on('geen', 1), C.koraal, 'right', 28); metaA(ctx, 'NA EEN MASTER: BIJV. ONDERZOEKER', 1180, y + 166, q.on('onderzoeker', 1), C.text2, 'right', 24); }, 200);
    persoon(ctx, 'hanneke', 1560, VLOER, 470, { t, kijk: -1, uit: 'blij' }); naamBij(ctx, 'Hanneke', 'diëtist', 1560, 330, 1 - q.on('praktijk', 1), 'center');
    tag(ctx, 'praktijk', 1450, 320, C.text2, q.on('praktijk', 1), 'center', 28); tag(ctx, 'ziekenhuis', 1690, 320, C.text2, q.on('ziekenhuis', 1), 'center', 28);
    laag(ctx, q.on('mensen', 1), () => { roundRect(ctx, 120, 720, 1100, 80, 14); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'werkt met mensen zoals Joost', 160, 772, 1, C.text, 36, 'left', 600); }); }
});
