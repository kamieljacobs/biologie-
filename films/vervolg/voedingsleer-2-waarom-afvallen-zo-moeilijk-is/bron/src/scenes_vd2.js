// Wat word jij? · Voeding en diëtetiek 2 · Waarom afvallen zo moeilijk is — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Diëtist Hanneke, Joost (outfit 'spreekuur'; na het afvallen 'gewoon'), Noor loopt mee, Dennis (sport) en Erik (buurman));
// Micro alleen in de zoomcirkels (maag met ghreline, vetcel met leptine, hersenen met hypothalamus en hersenstam, náást het lichaam).
// Decor praktijk volgt later (praktijkDecor tekent nu alleen navy): cold open, meetlint (H2), recap. Rode draad: de riem en de gewichtscurve (MODEL).
// Toon: geen getal bij Joosts gewicht, geen weegschaal, geen etende close-ups, telpoppetjes alleen in tellingen.

// Joost/Erik/Dennis even lang tekenen (castboek-lengte wegdelen)
function mens(ctx, id, x, h, o = {}) { const P = CAST[id] || {}; return persoon(ctx, id, x, o.voet || GROND, h / (o.echt ? 1 : (P.lengte || 1)), Object.assign({ kijk: 1, uit: 'neutraal' }, o)); }
// buikpunt van een staand personage (vooraanzicht), voor zoomcirkels
function buikPunt(x, h, dx = 0, f = 2.75) { const hh = h / 6.1; return [x + dx, GROND - h + hh * f]; }
// meetlint rond het middel (voorste helft van de ellips), u = hoe ver om
// dun lint (7 px) met streepjes: begint links (in de hand) en loopt over de voorkant naar rechts, dan achterlangs (niet zichtbaar)
function lintOmMiddel(ctx, cx, y, rx, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const ry = 16, P = an => [cx - Math.cos(an) * rx, y + Math.sin(an) * ry];
  roundRect(ctx, cx - rx - 16, y - 5, 16, 14, 3); shape(ctx, '#B8BCC6', '#8A8E9A', 1); // metalen eindje in de hand
  if (u > 0.01) { ctx.strokeStyle = '#E8CF5A'; ctx.lineWidth = 7; ctx.beginPath(); for (let k = 0; k <= 60 * u; k++) { const [px, py] = P(k / 60 * Math.PI); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    ctx.strokeStyle = '#3A3E4E'; ctx.lineWidth = 1.5; for (let k = 1; k < 40 * u; k++) { const [px, py] = P(k / 40 * Math.PI); ctx.beginPath(); ctx.moveTo(px, py - 3); ctx.lineTo(px, py + (k % 5 ? 0 : 3)); ctx.stroke(); } }
  ctx.restore(); }

// spreekuur aan tafel (cold open, recap, slot): Hanneke links, Joost rechts, allebei zittend; tafelblad op TY (riem van Joost net boven het blad)
const TY = 740;
function spreekuur(ctx, t, o = {}) { const hx = 300, jx = 820, hJ = 480, hhJ = hJ / 6.1, topJ = GROND - hhJ * 1.45 - hhJ * 3.45;
  persoon(ctx, 'hanneke', hx, GROND, hanH(hJ), { t, pose: 'zit', stoel: true, kijk: 1, uit: o.uitH || 'blij', tafel: TY, hold: o.hold });
  persoon(ctx, 'joost', jx, GROND, hJ, { t, pose: 'zit', stoel: true, kijk: -1, outfit: 'spreekuur', uit: o.uitJ || 'neutraal', tafel: TY });
  tafel(ctx, 560, TY, 760);
  return { hx, jx, riem: [jx, topJ + hhJ * 3.05], naamY: topJ - 44 }; }

Object.assign(SCENES, {
  title(ctx, t) { riem(ctx, 1100, 490, 560, { gat: 2 }); hand(ctx, 1680, 490, 0.9); gewichtCurve2(ctx, 1180, 620, 560, 220, { u: 0.74 }); },

  // ---------- Cold open ----------
  // beeldreview 1, punt 16–18: gesprek aan tafel (zoals in de recap), zoomcirkel en label op 'riem', gesp springt op 'strakker', oude gaatje licht op bij 'oude'
  s01(ctx, t, q) { praktijkDecor(ctx); const P = spreekuur(ctx, t, { uitJ: q.on('Maanden', 1) > 0.5 ? 'ernstig' : (q.on('best', 1) > 0.5 ? 'blij' : 'neutraal'), uitH: q.on('Diëtist', 1) > 0.5 ? 'blij' : 'neutraal' });
    const M = q.on('Maanden', 1, 1.2), gat = lerp(1, 2, q.on('strakker', 1, 0.5)) - 0.65 * M;
    naamBij(ctx, 'Joost', 'cliënt', P.jx, P.naamY, 1, 'center');
    naamBij(ctx, 'Hanneke', 'diëtist', P.hx, P.naamY, q.on('Diëtist', 1, 0.4), 'center');
    riemZoom(ctx, 1230, 370, 230, P.riem[0], P.riem[1], gat, M > 0.5 ? 'WEER BIJNA HET OUDE GAATJE' : 'EEN GAATJE STRAKKER', q.on('riem', 1, 0.4), { oud: q.on('strakker', 1), oudGat: 1, gloed: q.on('oude', 1, 0.4), trek: q.on('strakker', 1) * (1 - q.on('eraf', 1)) });
    // gewichtscurve: omlaag tot 'eraf', vlak tot 'groter', omhoog tot het oude gaatje; stopt daar
    const u = t < q.at('eraf', 1) ? lerp(0.02, 0.3, t / q.at('eraf', 1)) : t < q.at('groter', 1) ? lerp(0.3, 0.5, (t - q.at('eraf', 1)) / (q.at('groter', 1) - q.at('eraf', 1))) : lerp(0.5, 0.74, (t - q.at('groter', 1)) / Math.max(0.5, q.at('gaatje', 2) - q.at('groter', 1)));
    roundRect(ctx, 1490, 200, 380, 400, 12); shape(ctx, rgba('#121A26', 0.85), null); // donker paneel: curve leesbaar voor het raam
    gewichtCurve2(ctx, 1530, 270, 300, 220, { u, rise: M });
    tag(ctx, 'een paar kilo eraf', 1680, 660, C.groen, fase(t, q.at('eraf', 1), q.at('trek', 1)), 'center', 32);
    tag(ctx, 'trek wordt groter', 1680, 660, C.goud, fase(t, q.at('trek', 1) + 0.3, q.at('Diëtist', 1)), 'center', 32);
    vraagteken(ctx, 1680, 780, q.on('kan', 1), 100); },

  // ---------- H1 ----------
  // beeldreview 1, punt 21: curve al op 'biologie' naar de hoek, Joost snel weg (geen half doorzichtig silhouet), op 'Eerst de basis' staat de lege schaal van s05 er al
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer trek en wat minder verbruik', 1 - q.on('Eerst', 1, 0.35));
    const E = q.on('biologie', 1, 1.2), cx = lerp(820, 1560, E), cy = lerp(300, 140, E), cw = lerp(860, 260, E), ch = lerp(400, 110, E), B = q.on('Eerst', 1, 0.35);
    mens(ctx, 'joost', 330, 560, { t, outfit: 'spreekuur', uit: q.on('biologie', 1) > 0.5 ? 'neutraal' : 'ernstig', a: 1 - B });
    gewichtCurve2(ctx, cx, cy, cw, ch, { u: 1, rise: 1 - E, a: lerp(1, 0.6, E), label: E > 0.5 ? 'MODEL' : 'VOORBEELD · MODEL', pijlen: [0, 0, q.on('trek', 1) * (1 - E), q.on('verbruik', 1) * (1 - E)], pijlX: 1180, pijlY: 790, pijlDx: 260 });
    tag(ctx, 'niet alleen doorzetten', 960, 850, C.text2, fase(t, q.at('doorzetten', 1), q.at('biologie', 1)), 'center', 32);
    tag(ctx, 'er zit biologie achter', 960, 850, C.groen, fase(t, q.at('biologie', 1), q.at('Eerst', 1) + 0.2), 'center', 32);
    laag(ctx, B, () => { persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij' }); balans2(ctx, 860, 300, { labels: 0 }); regel(ctx, 'Eerst de basis: energie in en uit', 960, 190, 1, C.text, 52, 'center', 700); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    const H = q.on('Hanneke', 1), cx = 860;
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij', pose: H > 0.5 && t < q.at('Dat', 1) ? 'wijs' : 'staan' });
    const L = 70, lagen = [[L * q.on('ruststofwisseling', 1), C.koraal], [L * q.on('verteren', 1), C.koraal], [L * q.on('bewegen', 1), C.koraal]];
    const R = balans2(ctx, 860, 300, { eten: 4 * q.on('eten', 1, 1.5), lagen, hlL: fase(t, q.at('Links', 1), q.at('rechts', 1) + 0.2), hlR: fase(t, q.at('rechts', 1), q.at('Dat', 1) + 0.3), labels: q.on('eten', 1) });
    laagNamen(ctx, R, [['ruststofwisseling', '', q.on('ruststofwisseling', 1)], ['verteren', '', q.on('verteren', 1)], ['bewegen', '', q.on('bewegen', 1)]]);
    metaA(ctx, 'DRIE MANIEREN', R.R.x, 180, fase(t, q.at('drie', 1), q.at('Hanneke', 1)), C.koraal, 'center', 28);
    tag(ctx, 'energiebalans', cx, 820, C.goud, q.on('energiebalans', 1), 'center', 40); },

  s06(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij' });
    const R = balans2(ctx, 860, 300, { eten: 4, lagen: [[70, C.koraal], [70, C.koraal], [70, C.koraal]] });
    laagNamen(ctx, R, [['ruststofwisseling', '', 1], ['verteren', '', 1], ['bewegen', '', 1]]);
    const N = q.on('Noor', 1, 0.3); persoon(ctx, 'noor', 1720, GROND, 450, { t, kijk: -1, a: N, uit: 'neutraal', pose: q.on('vraagt', 1) > 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Noor', 'loopt een dag mee', 1700, 380, N * (1 - q.on('Welk', 1)), 'center');
    vraagteken(ctx, 1640, 330, q.on('grootst', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de ruststofwisseling', 1 - q.on('Verteren', 1)); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    persoon(ctx, 'hanneke', 210, GROND, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'noor', 1720, GROND, 450, { t, kijk: -1, uit: q.on('twee', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    const g1 = q.on('twee', 1, 1.2), g2 = q.on('tiende', 1, 1), g3 = q.on('Bewegen', 1, 1);
    const R = balans2(ctx, 860, 300, { eten: 4, lagen: [[lerp(70, 160, g1), C.koraal], [lerp(70, 24, g2), C.koraal], [lerp(70, 56, g3), C.koraal]] });
    laagNamen(ctx, R, [['ruststofwisseling', g1 > 0.5 ? '± twee derde' : '', 1, g1 > 0.5 ? C.goud : C.text], ['verteren', g2 > 0.5 ? '± een tiende' : '', 1], ['bewegen', g3 > 0.5 ? 'de rest' : '', 1]]);
    tag(ctx, 'ook als je stilzit', 860, 840, C.koraal, fase(t, q.at('stilzit', 1), q.at('Bewegen', 1) + 0.4), 'center', 32); },

  s09(ctx, t, q) { bg(ctx, 'schema'); gewichtCurve2(ctx, 1560, 140, 260, 110, { u: 1, label: 'MODEL', a: 0.6 });
    const M = q.on('Minder', 1, 1), tilt = lerp(-0.13, 0.13, M) * q.on('Meer', 1, 1);
    const R = balans2(ctx, 860, 330, { eten: lerp(6, 2, M), lagen: [[160, C.koraal], [24, C.koraal], [56, C.koraal]], tilt });
    tag(ctx, 'aankomen', R.L.x, 300, C.oker, fase(t, q.at('aan', 1), q.at('Minder', 1) + 0.3), 'center', 36);
    laag(ctx, q.on('vet', 1) * (1 - M), () => { vetcel(ctx, 330, 560, lerp(40, 80, q.on('vet', 1, 1.5)), {}); naamBij(ctx, 'vetcel', 'overschot opgeslagen', 330, 690, 1, 'center'); });
    tag(ctx, 'afvallen', R.R.x, 240, C.groen, q.on('val', 1), 'center', 36);
    filmKaartje(ctx, 120, 760, 'Alles op adem', q.on('af', 1, 0.8)); filmKaartje(ctx, 1430, 760, 'Waar blijft je vet?', q.on('af', 1, 0.8)); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const fy = 330, fx = 520;
    metaA(ctx, 'BMI · BODY MASS INDEX', 140, 200, 1, C.goud, 'left', 32);
    schrijf(ctx, 'gewicht (kg)', fx, fy, q.on('gewicht', 1, 0.8), fTekst(52, 700), C.text, 'center');
    laag(ctx, q.on('gedeeld', 1), () => { ctx.fillStyle = C.text; ctx.fillRect(fx - 250, fy + 30, 500, 4); });
    schrijf(ctx, 'lengte (m) × lengte (m)', fx, fy + 100, q.on('lengte', 1, 0.8) * (q.on('kwadraat', 1) > 0.5 ? 1 : 0.999), fTekst(52, 700), C.text, 'center');
    tag(ctx, 'in het kwadraat', fx, fy + 190, C.text2, q.on('kwadraat', 1) * (1 - q.on('voorbeeld', 1)), 'center', 32);
    metaA(ctx, 'VOORBEELD · 90 KG · 1,80 M', 140, 600, q.on('voorbeeld', 1), C.grain, 'left', 30);
    schrijf(ctx, '90 ÷ (1,80 × 1,80)', 140, 680, q.on('negentig', 1, 1.2), fTekst(52, 700), C.text);
    schrijf(ctx, '= 90 ÷ 3,24', 140, 760, q.on('geeft', 1, 0.8), fTekst(52, 700), C.text);
    schrijf(ctx, '≈ 27,8', 520, 760, q.on('zevenentwintig', 1, 0.8), fTekst(64, 800), C.goud);
    persoon(ctx, 'hanneke', 1500, GROND, 480, { t, kijk: -1, uit: 'blij', pose: t > q.at('gewicht', 1) && t < q.at('voorbeeld', 1) ? 'wijs' : 'staan' });
    naamBij(ctx, 'Diëtist Hanneke', 'rekent', 1500, 330, fase(t, q.at('Hanneke', 1), q.at('voorbeeld', 1)), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const hl = [q.on('ondergewicht', 1), q.on('gezond', 1), q.on('overgewicht', 1), q.on('obesitas', 1)].map(v => 0.15 + 0.85 * v);
    regel(ctx, '90 ÷ 3,24 ≈ 27,8', 140, 200, 1, C.text2, 40, 'left', 700); metaA(ctx, 'VOORBEELD', 140, 240, 1, C.grain, 'left', 28);
    bmiBalk2(ctx, 160, 420, 1600, { waarde: 27.8, mark: 1, markLabel: '27,8', hl });
    tag(ctx, 'ook een risico', 330, 660, C.teal, fase(t, q.at('risico', 1), q.at('Vanaf', 1)), 'center', 32);
    metaA(ctx, 'VOLWASSENEN · ONDER 18: ANDERE GRENZEN', 960, 760, q.on('jongeren', 1), C.grain, 'center', 30); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const h = 560;
    mens(ctx, 'dennis', 560, h, { t, outfit: 'sporter', uit: 'blij', pose: q.on('traint', 1) > 0.5 ? 'handenHeup' : 'staan' }); shirtNummer(ctx, 560, h, '7');
    mens(ctx, 'erik', 1360, h, { t, uit: 'neutraal', kijk: -1 });
    chip(ctx, '26', 560, 250, C.goud, q.on('zesentwintig', 1), 44); chip(ctx, '26', 1360, 250, C.goud, q.on('zesentwintig', 1), 44);
    metaA(ctx, 'BMI', 960, 240, q.on('index', 1), C.text2, 'center', 28);
    tag(ctx, 'traint veel', 720, 420, C.text2, q.on('traint', 1), 'left', 30); tag(ctx, 'traint niet', 1200, 420, C.text2, q.on('niet', 1), 'right', 30);
    vraagteken(ctx, 960, 660, q.on('zeker', 1), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Daarom', 1, 0.4), D2 = ramp(t, q.at('Daarom', 1) + 0.4, 0.4);
    laag(ctx, 1 - D, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: hun gewicht en lengte gaan gelijk op', 1 - q.on('Spieren', 1)); const h = 560, B1 = buikPunt(360, h, 20, 2.3), B2 = buikPunt(1180, h, 0, 3.0);
      mens(ctx, 'dennis', 360, h, { t, outfit: 'sporter', uit: 'blij' }); shirtNummer(ctx, 360, h, '7'); mens(ctx, 'erik', 1180, h, { t, uit: 'neutraal' });
      chip(ctx, '26', 360, 250, C.goud, 1, 44); chip(ctx, '26', 1180, 250, C.goud, 1, 44);
      tag(ctx, 'zelfde verhouding gewicht : lengte', 770, 420, C.goud, fase(t, q.at('verhouding', 1), q.at('Spieren', 1) + 0.3), 'center', 32);
      zoomCircle(ctx, 740, 450, 160, B1[0], B1[1], 'SPIEREN WEGEN MEE', q.on('Spieren', 1), () => spierBeeld(ctx, 740, 450, 160));
      tag(ctx, 'scoort overgewicht', 740, 720, C.oker, q.on('scoren', 1), 'center', 30);
      zoomCircle(ctx, 1560, 450, 160, B2[0], B2[1], 'VET ROND DE ORGANEN', q.on('vet', 1), () => buikVet(ctx, 1560, 450, 160, t));
      tag(ctx, 'grotere kans op ziekten', 1560, 720, C.koraal, q.on('grotere', 1), 'center', 30);
      metaA(ctx, 'ZELFDE INDEX · ANDER LICHAAM', 960, 160, q.on('Dezelfde', 1), C.goud, 'center', 30); });
    if (D >= 0.99) praktijkDecor(ctx); laag(ctx, D2, () => { const h = 600, jx = 900, hh = h / 6.1, my = GROND - h + hh * 3.0, rx = hh * 1.08;
      // beeldreview 1, punt 8 en 19: dun meetlint (7 px, streepjes) op navelhoogte, het uiteinde in Hannekes hand; Hanneke ± 0,93 van Joost
      const L = q.on('meetlint', 1, 1.2), hand = { x: jx - rx - 4, y: my + 4 };
      persoon(ctx, 'joost', jx, GROND, h, { t, kijk: -1, outfit: 'spreekuur', uit: 'neutraal' });
      persoon(ctx, 'hanneke', 600, GROND, hanH(h), { t, kijk: 1, uit: 'blij', pose: 'handdruk', hand });
      lintOmMiddel(ctx, jx, my, rx, L);
      naamBij(ctx, 'middelomtrek', 'meetlint', jx + rx + 20, my - 46, q.on('meetlint', 1), 'left');
      const M = q.on('Voor', 1); laag(ctx, M, () => { roundRect(ctx, 1260, 280, 560, 360, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 1.5); metaText(ctx, 'RISICO GROTER VANAF', 1540, 340, C.text2, 'center', 28);
        text(ctx, 'man: 94 cm', 1540, 420, fTekst(48, 700), C.text, 'center'); laag(ctx, q.on('vrouw', 1), () => text(ctx, 'vrouw: 80 cm', 1540, 495, fTekst(48, 700), C.text, 'center'));
        metaText(ctx, 'VOLWASSENEN TOT 70', 1540, 565, C.grain, 'center', 28); metaText(ctx, 'EUROPESE AFKOMST', 1540, 605, C.grain, 'center', 28); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Nederland', 1, 0.4), N2 = ramp(t, q.at('Nederland', 1) + 0.4, 0.4);
    // beeldreview 1, punt 13: schema ± 1,25× groter en naar het midden; dikke koraal pijlen vanuit 'vooral vet in de buik'
    laag(ctx, 1 - N, () => { const d = q.on('diabetes', 1, 0.4), hv = q.on('hart', 1, 0.4);
      ctx.save(); ctx.translate(960, 430); ctx.scale(1.25, 1.25); ctx.translate(-900, -430);
      blokje(ctx, 'overgewicht', 470, 400, 400, C.oker); tag(ctx, 'vooral vet in de buik', 470, 500, C.oker, 1, 'center', 30);
      laag(ctx, d, () => { pijl(ctx, 650, 478, 1060, 318, C.koraal, 1, 10, 30); blokje(ctx, 'diabetes type 2', 1300, 300, 440, C.koraal); });
      laag(ctx, hv, () => { pijl(ctx, 650, 512, 1060, 542, C.koraal, 1, 10, 30); blokje(ctx, 'hart- en vaatziekten', 1300, 560, 440, C.koraal); });
      ctx.restore();
      metaA(ctx, 'GROTERE KANS · GEEN ZEKERHEID', 960, 745, q.on('kans', 2), C.goud, 'center', 32);
      filmKaartje(ctx, 1460, 780, 'Suiker in balans', d); });
    laag(ctx, N2, () => { const helft = q.on('helft', 1), zes = q.on('zes', 1);
      telpoppetjes(ctx, 480, 260, 100, 20, 48, i => (i < 16 && zes > 0.5) ? C.koraal : (i < 51 && helft > 0.5 ? C.oker : '#5A6478'), 1);
      tag(ctx, 'overgewicht · ± de helft', 700, 740, C.oker, helft, 'center', 32); tag(ctx, 'waarvan obesitas · ± 1 op de 6', 1260, 740, C.koraal, zes, 'center', 32);
      metaA(ctx, 'VOLWASSENEN NL · 2025 · CBS', 960, 200, 1, C.grain, 'center', 28); }); },

  // ---------- H3 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const h = 600, jx = 760, B = buikPunt(jx, h, 30, 2.7), T = q.on('trek', 1, 0.5);
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: 'ernstig', pose: T > 0.5 ? 'handdruk' : 'staan', hand: { x: B[0] + 10, y: B[1] + 6 } });
    naamBij(ctx, 'Joost', '', jx, 230, 1, 'center');
    tag(ctx, 'steeds meer trek', 1240, 420, C.goud, T, 'left', 36);
    tag(ctx, 'tegen zijn eigen lijf?', 1240, 520, C.text2, q.on('vecht', 1), 'left', 32);
    vraagteken(ctx, 1400, 700, q.on('honger', 1), 130); },

  // beeldreview 1, punt 6 en 22: Joost links, hersenen in een kleine cirkel náást het hoofd, maag (en vetcel) rechtsonder op rompshoogte;
  // geen lijnen naar het lichaam: koppeling via de randkleur en een gestippeld ringetje op de plek (maag hoog links in de buik, onder de ribben)
  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: signalen uit maag, darm en vet', 1 - q.on('Ghreline', 1));
    const h = 560, jx = 250, BM = buikPunt(jx, h, 30, 2.3), MX = 560, MY = 700;
    const vol = q.on('volle', 1, 1.2), G = q.on('Ghreline', 1), V = q.on('volle', 1, 0.4);
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: vol > 0.5 ? 'blij' : 'neutraal' });
    bronRing(ctx, BM[0], BM[1], 24, C.oker, 1);
    zoomC(ctx, MX, MY, 115, 'MAAG EN DARM', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(MX - 115, MY - 115, 230, 230); maagDarm(ctx, MX - 12, MY - 14, 0.46, { vol });
      hormoonPuntjes(ctx, MX - 24, MY + 24, Math.round(4 + 10 * (1 - vol)), 6, t, G * (1 - 0.8 * vol), C.paars, 70); }, C.oker);
    naamBij(ctx, 'ghreline', 'hormoon uit de maag', MX + 140, MY - 10, G * (1 - q.on('Ghreline', 2, 0.3)), 'left', C.paars);
    tag(ctx, 'ghreline geeft trek', MX + 140, MY, C.paars, fase(t, q.at('Ghreline', 2) + 0.3, q.at('volle', 1)), 'left', 32);
    laag(ctx, fase(t, q.at('stijgt', 1), q.at('volle', 1)), () => ghrelineDag(ctx, 1060, 230, 700, 300, clamp((t - q.at('stijgt', 1)) / 2.5, 0, 1)));
    metaA(ctx, 'VÓÓR HET ETEN: GHRELINE ↑', 1410, 660, fase(t, q.at('vlak', 1), q.at('volle', 1)), C.paars, 'center', 28);
    const Z = q.on('zenuwen', 1); const HP = hersenZoom(ctx, 530, 320, 140, 0, 0, { a: Z, rand: C.teal, caption: '', hth: q.on('hersenen', 1) * 0.6, stam: q.on('hersenen', 1), t, stamNaam: q.on('hersenen', 1) });
    if (HP) zenuwSignaal(ctx, [MX - 10, MY - 118], [HP.stam[0] - 12, HP.stam[1] + 14], t, Z, clamp((t - q.at('zenuwen', 1)) / 1.2, 0, 1));
    if (HP) hormoonStroom(ctx, [MX + 40, MY - 110], [HP.stam[0] + 4, HP.stam[1] + 30], t, q.on('darm', 1), 6);
    // rechts bouwt het samenspel op
    tag(ctx, 'volle maag rekt uit → zenuw', 1080, 330, C.teal, q.on('rekt', 1) * V, 'left', 34);
    tag(ctx, 'darmhormonen', 1080, 430, C.paars, q.on('darm', 1), 'left', 34);
    tag(ctx, 'genoeg', 1080, 560, C.groen, q.on('genoeg', 1), 'left', 44);
    metaA(ctx, 'DAT GEVOEL = VERZADIGING', 1080, 640, q.on('verzadiging', 1), C.goud, 'left', 30); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const h = 560, jx = 250, BM = buikPunt(jx, h, 30, 2.3), BV = buikPunt(jx, h, -22, 3.15), MX = 560, VX = 830, MY = 700;
    const M = q.on('Minder', 1, 1), groei = q.on('meer', 1, 1.6), r = lerp(lerp(48, 72, groei), 44, M), n = Math.round(lerp(lerp(5, 14, groei), 4, M));
    persoon(ctx, 'joost', jx, GROND, h, { t, kijk: 1, outfit: 'spreekuur', uit: 'neutraal' });
    bronRing(ctx, BM[0], BM[1], 24, C.oker, 0.45); bronRing(ctx, BV[0], BV[1], 26, C.koraal, 1);
    zoomC(ctx, MX, MY, 115, 'MAAG EN DARM', 0.45, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(MX - 115, MY - 115, 230, 230); maagDarm(ctx, MX - 12, MY - 14, 0.46, {}); }, C.oker);
    zoomC(ctx, VX, MY, 115, 'VETCEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(VX - 115, MY - 115, 230, 230); vetcelLeptine(ctx, VX, MY, r, { leptine: q.on('leptine', 1), t, n }); }, C.koraal);
    naamBij(ctx, 'leptine', 'uit vetcellen', VX + 135, MY + 10, q.on('leptine', 1), 'left', C.paars);
    const HP = hersenZoom(ctx, 530, 320, 140, 0, 0, { rand: C.teal, caption: '', hth: q.on('hypothalamus', 1), stam: q.on('hersenstam', 1), t, hthNaam: q.on('hypothalamus', 1), stamNaam: q.on('hersenstam', 1) });
    if (HP) { hormoonStroom(ctx, [VX - 20, MY - 112], [HP.hth[0] + 6, HP.hth[1] + 10], t, q.on('Veel', 1) * (1 - 0.6 * M), Math.max(2, Math.round(n / 2)));
      zenuwSignaal(ctx, [MX - 10, MY - 118], [HP.stam[0] - 12, HP.stam[1] + 14], t, q.on('signalen', 1), 1); }
    tag(ctx, 'meer vet → meer leptine', 1180, 330, C.paars, fase(t, q.at('hoe', 1), q.at('Veel', 1)), 'left', 34);
    tag(ctx, 'genoeg voorraad', 1180, 330, C.groen, fase(t, q.at('voorraad', 1) - 0.4, q.at('Minder', 1) + 0.2), 'left', 34);
    tag(ctx, 'minder leptine → meer trek', 1180, 330, C.goud, q.on('Minder', 1), 'left', 34);
    filmKaartje(ctx, 1180, 440, 'Het hoofdkantoor', q.on('hypothalamus', 1)); },

  // beeldreview 1, punt 3: namen boven de hoofden (niet over het haar), 'altijd al dit gewicht', haak onder de voeten (voeten op 760)
  s20(ctx, t, q) { bg(ctx, 'schema'); const h = 500, V = 760;
    mens(ctx, 'joost', 380, h, { t, outfit: 'gewoon', uit: 'neutraal', voet: V }); mens(ctx, 'erik', 720, h, { t, uit: 'blij', kijk: -1, voet: V });
    naamBij(ctx, 'Joost', 'afgevallen', 380, V - h - 66, 1, 'center'); naamBij(ctx, 'buurman', 'altijd al dit gewicht', 720, V - h - 66, q.on('buurman', 1), 'center');
    haak(ctx, 270, 830, V + 12, 'zelfde gewicht, zelfde lengte', C.goud, q.on('gewicht', 1));
    metaA(ctx, 'VERBRUIK PER DAG', 1400, 300, q.on('verbruikt', 1), C.koraal, 'center', 30);
    verbruikStaaf(ctx, 1240, 760, 170, 0, 0, { leeg: 300, label: 'JOOST', a: q.on('verbruikt', 1) }); verbruikStaaf(ctx, 1560, 760, 170, 0, 0, { leeg: 300, label: 'BUURMAN', a: q.on('verbruikt', 1) });
    vraagteken(ctx, 1400, 600, q.on('denk', 1), 100); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de buurman verbruikt meer', 1 - q.on('precies', 1)); const h = 520;
    const S = q.on('spieren', 1), L = q.on('leptine', 1);
    mens(ctx, 'joost', 330, h, { t, outfit: 'gewoon', uit: L > 0.5 ? 'ernstig' : 'neutraal' }); mens(ctx, 'erik', 640, h, { t, uit: 'blij', kijk: -1 });
    naamBij(ctx, 'Joost', '', 330, 300, 1, 'center'); naamBij(ctx, 'buurman', '', 640, 300, 1, 'center');
    const vul = q.on('Gemiddeld', 1, 1.2);
    verbruikStaaf(ctx, 1040, 720, 170, 230, lerp(90, 50, vul), { label: 'JOOST', namen: 1, hlBew: S, verwacht: q.on('afgevallen', 1), verwachtH: 325 });
    verbruikStaaf(ctx, 1320, 720, 170, 230, 90, { label: 'BUURMAN', namen: 1 });
    metaA(ctx, 'VERBRUIK PER DAG', 1180, 260, 1, C.koraal, 'center', 28);
    metaA(ctx, 'GEMIDDELD · HOE GROOT: OMSTREDEN · MODEL', 1180, 215, q.on('verschillen', 1), C.grain, 'center', 28);
    tag(ctx, 'spieren werken zuiniger', 1040, 850, C.goud, fase(t, q.at('spieren', 1), q.at('leptine', 1)), 'center', 30);
    pijlTag(ctx, 'leptine ↓', 1640, 420, C.paars, L, 34); pijlTag(ctx, 'ghreline ↑', 1640, 510, C.paars, q.on('ghreline', 1), 34);
    metaA(ctx, '1 JAAR LATER NOG ZO', 1640, 585, q.on('jaar', 1), C.grain, 'center', 28); metaA(ctx, 'IN ÉÉN ONDERZOEK', 1640, 625, q.on('jaar', 1), C.grain, 'center', 28);
    tag(ctx, 'lichter lichaam: al minder · zuinig: komt erbij', 1040, 850, C.koraal, fase(t, q.at('lichter', 1), q.at('Daarom', 1)), 'center', 30);
    tag(ctx, 'afvallen gaat steeds langzamer', 1040, 850, C.goud, q.on('Daarom', 1), 'center', 32); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Joost', 1, 0.4), J2 = ramp(t, q.at('Joost', 1) + 0.4, 0.4);
    laag(ctx, 1 - J, () => { balans2(ctx, 600, 300, { eten: lerp(4, 6, q.on('trek', 1, 1.2)), lagen: [[lerp(160, 150, q.on('verbruik', 1)), C.koraal], [24, C.koraal], [lerp(56, 36, q.on('verbruik', 1)), C.koraal]], tilt: -0.13 * q.on('balans', 1, 1.2) });
      metaA(ctx, 'MEER IN DAN UIT', 600, 210, q.on('balans', 1), C.goud, 'center', 30); });
    laag(ctx, J2, () => { persoon(ctx, 'joost', 280, GROND, 560, { t, kijk: 1, outfit: 'gewoon', uit: q.on('biologie', 1) > 0.5 ? 'blij' : 'ernstig' });
      // beeldreview 1, punt 20: Hanneke wijst naar de grafiek, niet naar Joost
      persoon(ctx, 'hanneke', 660, GROND, hanH(560), { t, kijk: 1, uit: 'blij', pose: q.on('zegt', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Hanneke', '', 660, 296, q.on('Hanneke', 1) * (1 - q.on('biologie', 1)), 'center'); });
    gewichtCurve2(ctx, 1160, 240, 620, 300, { u: 1, rise: 1, label: 'MODEL', pijlen: [1, 1, q.on('trek', 1), q.on('verbruik', 1)], pijlX: 1170, pijlY: 650, pijlDx: 300 });
    tag(ctx, 'nee, dit is biologie', 1460, 820, C.groen, q.on('nee', 1), 'center', 40); },

  // ---------- H4 ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Joost', 1, 0.4), J2 = ramp(t, q.at('Joost', 1) + 0.4, 0.4);
    laag(ctx, 1 - J, () => { const v = q.on('vijf', 1); telpoppetjes(ctx, 560, 300, 20, 10, 84, i => (v > 0.5 && i % 5 === 0) ? C.groen : '#5A6478', 1);
      tag(ctx, '± 1 op de 5', 960, 640, C.groen, v, 'center', 40);
      metaA(ctx, 'MET OVERGEWICHT · 10 % KWIJT · MINSTENS 1 JAAR · OVERZICHT VS', 960, 720, ramp(t, q.at('tien', 1) - 0.3, 0.3), C.grain, 'center', 28); });
    laag(ctx, J2, () => { persoon(ctx, 'joost', 1300, GROND, 560, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'hanneke', 1640, GROND, hanH(560), { t, kijk: -1, uit: t > q.at('korte', 1) && t < q.at('doen', 1) ? 'praat' : 'blij' });
      const S = q.on('korte', 1); laag(ctx, S, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 260); ctx.lineTo(160, 560); ctx.lineTo(900, 560); ctx.stroke(); metaText(ctx, 'GEWICHT', 160, 240, C.text2, 'left', 28); metaText(ctx, 'MODEL', 900, 240, C.grain, 'right', 28);
        ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); const u = clamp((t - q.at('korte', 1)) / 3, 0, 1); for (let p = 0; p <= 80 * u; p++) { const x = p / 80, y = x < 0.35 ? 0.72 - 0.4 * ease(x / 0.35) : 0.32 + 0.42 * ease((x - 0.35) / 0.5); const px = 160 + x * 740, py = 560 - y * 300; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
        metaText(ctx, 'KORT EN STRENG', 300, 620, C.koraal, 'center', 28); });
      tag(ctx, 'dan is de trek groot', 530, 700, C.goud, fase(t, q.at('groot', 1) - 0.6, q.at('Wat', 2) + 0.2), 'center', 32);
      tag(ctx, 'wat je blijft doen', 530, 700, C.groen, q.on('Wat', 2), 'center', 40); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); kaartRij(ctx, t, q, { e: 1, v: q.on('Vezelrijk', 1), hlE: fase(t, 0, q.at('Vezelrijk', 1)), hlV: q.on('Vezelrijk', 1) });
    metaA(ctx, 'IETS MEER VOL', 300, 680, q.on('vol', 1), C.oker, 'center', 28); metaA(ctx, 'DAN KOOLHYDRATEN', 300, 718, q.on('vol', 1), C.oker, 'center', 28); metaA(ctx, 'OF VET', 300, 756, q.on('vol', 1), C.oker, 'center', 28);
    metaA(ctx, 'VULT', 682, 680, q.on('vult', 1), C.groen, 'center', 28); metaA(ctx, 'HELPT EEN BEETJE', 682, 718, q.on('helpt', 1), C.groen, 'center', 28);
    // beeldreview 1, punt 7: Hanneke wijst van dichtbij naar de kaartjes en laat daarna haar arm zakken; Joost luistert
    persoon(ctx, 'joost', 1600, GROND, 560, { t, kijk: -1, outfit: 'gewoon', uit: 'neutraal' });
    persoon(ctx, 'hanneke', 1240, GROND, hanH(560), { t, kijk: -1, uit: 'blij', pose: t < q.at('helpt', 1) ? 'wijs' : 'staan' }); },

  // beeldreview 1, punt 1 en 2: bed in zijaanzicht alleen bij 'Ook slaap telt mee'; het experiment staat los in het midden (Joost is geen proefpersoon)
  s26(ctx, t, q) { bg(ctx, 'schema'); sterren(ctx, 120, 120, 1680, 160, 34, 1); const B = 1 - ramp(t, q.at('klein', 1) - 0.5, 0.3);
    laag(ctx, B, () => { maan(ctx, 1420, 230, 46, 1); bedSlaap(ctx, 1000, 560, 1.15, t, 1); });
    laag(ctx, 1 - B, () => {
      metaA(ctx, 'KLEIN EXPERIMENT', 960, 250, q.on('klein', 1), C.grain, 'center', 30);
      telpoppetjes(ctx, 960 - 2.5 * 84, 320, 12, 6, 84, () => C.teal, q.on('twaalf', 1));
      metaA(ctx, '12 JONGE MANNEN', 960, 560, q.on('twaalf', 1), C.grain, 'center', 28);
      wekker(ctx, 480, 420, 70, 4, q.on('vier', 1), '4 UUR');
      laag(ctx, q.on('nachten', 1), () => { maan(ctx, 1400, 410, 40, 1); maan(ctx, 1500, 410, 40, 1); text(ctx, '2 NACHTEN', 1450, 540, fTekst(36, 700), C.text, 'center'); });
      vraagteken(ctx, 960, 730, q.on('hormonen', 1), 100); }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: meer ghreline en minder leptine', 1 - q.on('dus', 1)); const K = q.on('Hanneke', 1, 0.4), K2 = ramp(t, q.at('Hanneke', 1) + 0.4, 0.4);
    const S = q.on('weinig', 2, 0.5); // 'Te weinig slaap kan de trek dus vergroten': nu pas Joost in bed
    laag(ctx, 1 - K, () => {
      laag(ctx, 1 - S, () => { telpoppetjes(ctx, 470 - 2.5 * 64, 330, 12, 6, 64, () => C.teal, 1); metaText(ctx, '12 JONGE MANNEN', 470, 560, C.grain, 'center', 28); metaText(ctx, '2 NACHTEN 4 UUR', 470, 600, C.grain, 'center', 28); });
      laag(ctx, S, () => { sterren(ctx, 120, 220, 720, 140, 20, 1); maan(ctx, 780, 280, 36, 1); bedSlaap(ctx, 520, 560, 0.72, t, 1); });
      hormoonStaafjes(ctx, 1150, 720, 'ghreline', 150, 192, q.on('ghreline', 1, 1), 1, '↑'); hormoonStaafjes(ctx, 1560, 720, 'leptine', 170, 140, q.on('leptine', 1, 1), 1, '↓');
      metaA(ctx, 'SCHEMATISCH', 1360, 280, 1, C.grain, 'center', 28);
      tag(ctx, 'meer trek', 1360, 850, C.goud, q.on('trek', 1), 'center', 36); });
    laag(ctx, K2, () => { kaartRij(ctx, t, q, { e: 1, v: 1, s: 1, b: q.on('bewegen', 1), hlB: q.on('bewegen', 1) });
      metaA(ctx, 'WIE JAREN EEN LAGER GEWICHT HOUDT, BEWEEGT VAAK VEEL', 960, 690, q.on('Mensen', 1), C.koraal, 'center', 28);
      persoon(ctx, 'hanneke', 1720, GROND, 480, { t, kijk: -1, uit: 'blij' }); }); },

  s29(ctx, t, q) { bg(ctx, 'schema'); sterren(ctx, 100, 120, 1700, 200, 30, 1); const h = 400, v = gangSnelheid('joost', h, 'loop'), off = (v * t) % 1600;
    for (const k of [0, 1]) { huisjes(ctx, 120 - off + k * 1600, GROND, 1); lantaarn(ctx, 1000 - off + k * 1600, GROND, 300, 1); lantaarn(ctx, 200 - off + k * 1600, GROND, 300, 1); }
    ctx.fillStyle = '#3A4458'; ctx.fillRect(0, GROND, W, 20);
    persoon(ctx, 'noor', 1020, GROND, h * 0.97 / (CAST.noor.lengte || 1) * 0.98, { zij: true, kijk: 1, gang: 'loop', t: t + 0.25 }); persoon(ctx, 'joost', 1180, GROND, h, { zij: true, kijk: 1, gang: 'loop', t, outfit: 'gewoon' });
    laag(ctx, q.on('verandering', 1), () => { roundRect(ctx, 120, 130, 640, 270, 16); shape(ctx, rgba('#0D1420', 0.85), null); jarenCurve(ctx, 170, 190, 540, 150, clamp((t - q.at('verandering', 1)) / 3, 0, 1)); });
    tag(ctx, 'kleine, blijvende verandering', 440, 470, C.groen, q.on('wandeling', 1), 'center', 32);
    laag(ctx, q.on('medicijnen', 1), () => { roundRect(ctx, 1180, 170, 620, 130, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.8), 1.5); metaText(ctx, 'VIA DE ARTS', 1490, 220, C.text2, 'center', 28); text(ctx, 'medicijnen · operaties', 1490, 275, fTekst(40, 700), C.text, 'center'); });
    metaA(ctx, 'BIJ ERNSTIG OVERGEWICHT', 1490, 340, q.on('ernstig', 1), C.grain, 'center', 28); },

  // ---------- Recap ----------
  // beeldreview 1, punt 9, 10, 12: riem half zo groot midden op tafel, grafiek op een donker paneel, pillen op het woord
  s30(ctx, t, q) { praktijkDecor(ctx); spreekuur(ctx, t, { uitJ: q.on('schuld', 1) > 0.5 ? 'blij' : 'neutraal' });
    ctx.save(); ctx.translate(560, TY - 12); ctx.scale(0.5, 0.5); riem(ctx, -135, 0, 270, { gat: 2 }); ctx.restore();
    persoon(ctx, 'noor', 1030, GROND, 440, { t, kijk: -1 });
    const D = q.on('Daarom', 1, 1);
    laag(ctx, 1 - D, () => { roundRect(ctx, 1190, 170, 660, 540, 12); shape(ctx, rgba('#121A26', 0.85), null); });
    gewichtCurve2(ctx, 1240, 240, 560, 250, { u: 1, rise: 1, label: 'MODEL', a: 1 - D, pijlen: [q.on('minder', 2, 0.3), q.on('meer', 1, 0.3), q.on('meer', 2, 0.3), q.on('minder', 3, 0.3)], pijlX: 1240, pijlY: 610, pijlDx: 280 });
    tag(ctx, 'biologie, geen schuld', 1520, 820, C.groen, fase(t, q.at('biologie', 1), q.at('Daarom', 1) + 0.3), 'center', 34);
    const K = [['energiebalans', 'in en uit', C.koraal, 'Daarom'], ['BMI en middel', 'waar zit het vet?', C.oker, 'helpt'], ['honger en verzadiging', 'maag, darm en vet', C.paars, 'volhoudt'], ['een lange adem', 'wat je volhoudt', C.groen, 'eiwit']];
    K.forEach(([k, s2, col, cue], i) => { const a = D * q.on(cue, 1), x = 1180 + (i % 2) * 340, y = 200 + Math.floor(i / 2) * 270; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 320, 240, 16); shape(ctx, rgba('#0D1420', 0.88), col, 2.5);
      ctx.font = fTekst(40, 800); ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; wrapC(ctx, k, x + 160, y + 80, 280, 46); text(ctx, s2, x + 160, y + 205, fTekst(32, 600), col, 'center'); ctx.restore(); }); },

  s31(ctx, t, q) { praktijkDecor(ctx); roundRect(ctx, 120, 150, 760, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Diëtist: waar leer je dit?', 150, 220, 1, C.text, 52, 'left', 700);
    stempel(ctx, 1140, 200, 'BESCHERMDE TITEL', C.goud, q.on('beschermde', 1));
    opleidingKaart(ctx, 120, 300, 1180, 'hbo', 'Voeding en Diëtetiek', 'HAN · NIJMEGEN · 4 JAAR', q.on('diploma', 1), C.groen, { deel: 'HAN · NIJMEGEN', a: q.on('HAN', 1, 0.4) }); // punt 4
    tag(ctx, 'dan mag je je diëtist noemen', 710, 500, C.groen, q.on('noemen', 1), 'center', 30);
    opleidingKaart(ctx, 120, 560, 1180, 'wo', 'Voeding en Gezondheid', 'WAGENINGEN · 3 JAAR', q.on('Wageningen', 1), C.teal);
    tag(ctx, 'geen diëtist · na een master bv. onderzoeker', 710, 770, C.teal, q.on('geen', 1), 'center', 30);
    persoon(ctx, 'hanneke', 1620, GROND, 500, { t, kijk: -1, uit: 'blij' }); naamBij(ctx, 'Hanneke', 'diëtist', 1620, 312, 1, 'center'); }, // punt 5

  // beeldreview 1, punt 23: aan tafel blijven zitten; agenda op tafel, Hanneke schrijft de afspraak op
  s32(ctx, t, q) { praktijkDecor(ctx); const pen = (c, x, y) => { const w = Math.sin(t * 9) * 3 * q.on('maanden', 1); c.save(); c.translate(x + w, y - 4); c.rotate(-0.5); roundRect(c, -3, -34, 7, 44, 3); shape(c, C.goud, null); c.restore(); };
    const P = spreekuur(ctx, t, { uitJ: 'blij', hold: pen });
    riemZoom(ctx, 1230, 370, 230, P.riem[0], P.riem[1], 2, 'BLIJFT OP ZIJN GAATJE', 1, { oud: 1, oudGat: 1, trek: 1 - q.on('zit', 1, 0.8) });
    agenda(ctx, 560, TY - 82, 0.5, 1, q.on('maanden', 1, 1)); metaA(ctx, 'OVER 3 MAANDEN', 560, TY - 190, q.on('maanden', 1), C.goud, 'center', 28); }
});

// vier advieskaartjes op een rij (H4): e eiwit, v vezels, s slaap, b bewegen
function kaartRij(ctx, t, q, o) { const w = 360, hgt = 360, y = 260, X = i => 120 + i * (w + 22);
  adviesKaart(ctx, X(0), y, w, hgt, 'eiwit', C.oker, o.e || 0, (cx, cy) => { eten(ctx, 'eiGebakken', cx - 90, cy + 10, 1.0); eten(ctx, 'bonenblik', cx + 10, cy, 1.0); eten(ctx, 'vis', cx + 100, cy + 20, 0.9); }, o.hlE);
  adviesKaart(ctx, X(1), y, w, hgt, 'vezels', C.groen, o.v || 0, (cx, cy) => { eten(ctx, 'tomaat', cx - 100, cy + 10, 1.0); eten(ctx, 'boterham', cx, cy + 10, 1.0); eten(ctx, 'appel', cx + 100, cy + 10, 1.0); }, o.hlV);
  adviesKaart(ctx, X(2), y, w, hgt, 'slaap', C.teal, o.s || 0, (cx, cy) => { maan(ctx, cx + 120, cy - 90, 22, 1); bedSlaap(ctx, cx + 30, cy + 30, 0.44, t, 1); }, o.hlS);
  adviesKaart(ctx, X(3), y, w, hgt, 'bewegen', C.koraal, o.b || 0, (cx, cy) => { persoon(ctx, 'noor', cx - 50, cy + 130, 200, { zij: true, kijk: 1, gang: 'loop', t }); persoon(ctx, 'joost', cx + 50, cy + 130, 210, { zij: true, kijk: 1, gang: 'loop', t: t + 0.3, outfit: 'gewoon' }); }, o.hlB); }
// namen naast de lagen van de rechterschaal, van onder naar boven, met minstens 58 px ertussen; it = [naam, meta, alpha, kleur]
function laagNamen(ctx, R, items) { let vorige = 1e9; items.forEach(([n, m, a, col], i) => { const ly = R.lagen[i]; if (!ly || ly.h <= 1) return; let y = ly.y + 12 - (m ? 14 : 0); y = Math.min(y, vorige - (m ? 86 : 64)); vorige = y; naamBij(ctx, n, m, ly.x + 118, y, a, 'left', col || C.text); }); }
