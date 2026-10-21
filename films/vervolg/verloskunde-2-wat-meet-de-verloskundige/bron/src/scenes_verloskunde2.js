// Wat word jij? · Verloskunde 2 · Wat meet de verloskundige? — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra 30–37 weken, Dr. Kim als gynaecoloog).
// Rode draad: de controles van Esra.

function controle(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  praktijk(ctx, 1, o.kamer || {});
  persoon(ctx, 'mirjam', o.mx || 700, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan' });
  const e = persoon(ctx, 'esra', o.ex || 1180, 880, 455, { t, kijk: -1, uit: o.uitE || 'blij', pose: o.poseE || 'staan', zwanger: o.zw == null ? 0.75 : o.zw }); ctx.restore(); return e; }
// glucose die door een placentagrens gaat (insuline niet)
function placentaGrens(ctx, x, y, h, a = 1) { if (a <= 0.01) return; vkA(ctx, a); ctx.strokeStyle = rgba(C.paars, 0.9); ctx.lineWidth = 8; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { bloeddrukMeter(ctx, 1560, 330, 0.95, 1, { boven: 118, onder: 72 }); doptone(ctx, 1640, 690, 0.8, 1, 140, t, { golf: 1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const e = controle(ctx, t, { uitE: 'blij' });
    naamBij(ctx, 'Esra', '30 weken zwanger', 1180, 385, q.on('Esra', 1), 'center'); tag(ctx, '"ik voel me prima"', 1380, 330, C.text2, q.on('prima', 1), 'center', 28);
    manchet(ctx, 1110, 615, 0.75, q.on('band', 1)); if (q.on('band', 1) > 0.01) { vkA(ctx, q.on('band', 1)); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1110, 580); ctx.bezierCurveTo(1060, 480, 1000, 420, 960, 340); ctx.stroke(); ctx.restore(); } bloeddrukMeter(ctx, 960, 260, 0.7, q.on('bloeddruk', 1), { boven: 118, onder: 72, u: clamp((t - q.at('bloeddruk', 1)) / 1.5, 0, 1) });
    vraagteken(ctx, 960, 560, q.on('denk', 1), 100); },

  // ---------- H1 Een gewone controle ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b'); bloeddrukMeter(ctx, 600, 470, 1.1, 1, { boven: 150, onder: 100, kleur: '#F0A090' });
    tag(ctx, 'doet geen pijn', 1300, 380, C.text2, q.on('pijn', 1), 'center', 32); tag(ctx, 'kan het eerste teken zijn van een ernstige ziekte', 1300, 470, C.koraal, q.on('teken', 1), 'center', 30); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('voelt', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; regel(ctx, '± 12 controles', 960, 200, q.on('twaalf', 1), C.text, 52, 'center', 800);
      const wk = [8, 12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40]; tijdlijn(ctx, 200, 480, 1520, q.on('twaalf', 1), { max: 40, stap: 4, marks: wk.map((w, i) => [w, '', C.goud, clamp(q.on('vier', 1) * 14 - i, 0, 1)]) });
      tag(ctx, 'eerst om de 4 weken', 600, 640, C.text2, q.on('vier', 1), 'center', 28); tag(ctx, 'aan het eind: elke week', 1500, 640, C.text2, q.on('eind', 1), 'center', 28);
      tag(ctx, 'gesprek: hoe gaat het? beweegt het kind?', 960, 780, C.teal, q.on('gesprek', 1), 'center', 28); bloeddrukMeter(ctx, 1700, 230, 0.5, q.on('bloeddruk', 1), { boven: 110, onder: 65 }); tag(ctx, 'midden: vaak wat lager', 1700, 380, C.groen, q.on('lager', 1), 'center', 24); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const g = clamp((t - q.at('bovenkant', 1)) / 4, 0, 1);
      persoon(ctx, 'esra', 560, 880, 470, { t, kijk: 1, uit: 'blij', zwanger: 0.4 + 0.5 * g }); baarmoeder(ctx, 1180, 520, 0.55 + 0.25 * g, { week: 30, groei: 0.4 + 0.5 * g, t, hoofdOnder: q.on('hoofd', 1) > 0.5 });
      naamBij(ctx, 'bovenkant baarmoeder', 'elke week een stukje hoger', 1450, 260, q.on('bovenkant', 1), 'left', VK.spier);
      tag(ctx, 'hoofd naar beneden', 1580, 640, C.groen, q.on('hoofd', 1), 'center', 28); tag(ctx, 'of met de billen', 1580, 720, C.text2, q.on('billen', 1), 'center', 28); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); controle(ctx, t, { uitE: 'lacht', poseM: 'vasthouden' });
    doptone(ctx, 1013, 492, 0.9, q.on('hart', 1), 140, t, { golf: 1 }); naamBij(ctx, 'hart van het kind', '', 1013, 360, q.on('hart', 1), 'center', C.koraal);
    tag(ctx, '± 140 per minuut', 960, 220, C.koraal, q.on('honderdveertig', 1), 'center', 30); tag(ctx, 'Esra zelf: ± 80', 1500, 500, C.text2, q.on('Esra', 1), 'center', 26); stempel(ctx, 1520, 260, 'goed', C.groen, q.on('goed', 1)); },

  // ---------- H2 Als de placenta niet goed ingroeit ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('bouwen', 1)) / 4, 0, 1);
    spiraalSlagader(ctx, 960, 520, 0.85, 1, { wijd: u, trofo: q.on('dringen', 1), t });
    naamBij(ctx, 'cellen van de placenta', '', 1220, 280, q.on('dringen', 1), 'left', C.paars); naamBij(ctx, 'smalle slagader', '', 700, 280, q.on('smalle', 1) * (1 - u), 'right', VK.bloedM); naamBij(ctx, 'wijde buis', 'veel bloed langs de placenta', 1220, 640, u, 'left', VK.bloedM); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('stoffen', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; spiraalSlagader(ctx, 960, 520, 0.85, 1, { wijd: 0, trofo: 0.5, t }); naamBij(ctx, 'blijft smal', 'placenta krijgt te weinig bloed', 1220, 300, q.on('smal', 1), 'left', C.koraal); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; ctx.beginPath(); ctx.ellipse(380, 480, 200, 110, 0.2, 0, 6.283); shape(ctx, VK.plac, VK.placL, 3); naamBij(ctx, 'placenta in nood', '', 380, 660, 1, 'center', VK.placL);
      for (let i = 0; i < 8; i++) { const f = (t * 0.3 + i / 8) % 1; circ(ctx, 600 + f * 500, 430 + (i % 3) * 40, 10, rgba(C.paars, 1 - f * 0.5)); }
      const k = q.on('knijpen', 1); vkA(ctx, 1); ctx.strokeStyle = rgba(VK.bloedM, 0.9); ctx.lineWidth = 70 - 34 * k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1150, 480); ctx.lineTo(1800, 480); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'bloedvaten van de moeder', 'binnenkant beschadigd', 1475, 380, q.on('beschadigen', 1), 'center'); tag(ctx, 'bloeddruk stijgt', 1475, 600, C.koraal, q.on('stijgt', 1), 'center', 32);
      regel(ctx, 'pre-eclampsie', 960, 200, q.on('pre-eclampsie', 1), C.koraal, 52, 'center', 800); regel(ctx, 'zwangerschapsvergiftiging', 960, 250, q.on('zwangerschapsvergiftiging', 1), C.text2, 30, 'center', 600);
      tag(ctx, '2 à 5 op de 100 zwangeren', 960, 800, C.goud, q.on('twee', 1), 'center', 30); tag(ctx, 'meestal na 20 weken', 960, 870, C.text2, q.on('tweede', 1), 'center', 26); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); urineStrip(ctx, 700, 500, 1.3, q.on('urine', 1), clamp((t - q.at('eiwit', 1)) / 2, 0, 1));
    tag(ctx, 'normaal: bijna geen eiwit', 1250, 420, C.text2, q.on('normaal', 1), 'center', 30); vraagteken(ctx, 1250, 640, q.on('denk', 1), 110); },

  s11(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); const B = q.on('klachten', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; nierFilter(ctx, 960, 480, 1.1, 1, { lek: q.on('beschadigd', 1), t }); naamBij(ctx, 'kleine stoffen', 'gaan altijd door', 520, 820, q.on('kleine', 1), 'left', C.teal); naamBij(ctx, 'eiwitten', 'lekken als het filter beschadigd is', 1200, 820, q.on('lekken', 1), 'left', C.paars); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'esra', 520, 880, 470, { t, kijk: 1, uit: 'bezorgd', zwanger: 0.85 });
      [['hoofdpijn', 'hoofdpijn'], ['sterretjes zien', 'sterretjes'], ['pijn bovenin de buik', 'bovenin']].forEach(([s2, w], i) => chip(ctx, s2, 1000, 260 + i * 70, C.koraal, q.on(w, 1), 30));
      tag(ctx, 'kan overgaan in aanvallen of leverschade', 1000, 500, C.koraal, q.on('aanvallen', 1), 'center', 28);
      regel(ctx, 'enige oplossing: de placenta moet eruit', 1250, 640, q.on('oplossing', 1), C.goud, 38, 'center', 800); tag(ctx, 'soms weken te vroeg', 1250, 720, C.text2, q.on('vroeg', 1), 'center', 28); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); controle(ctx, t, { zw: 0.9, uitM: 'neutraal', uitE: 'neutraal' }); naamBij(ctx, 'Esra', '36 weken', 1180, 385, 1, 'center');
    bloeddrukMeter(ctx, 960, 250, 0.7, q.on('honderdvijfendertig', 1), { boven: 135, onder: 85, kleur: '#F0D070' }); klokje(ctx, 1500, 200, 46, 1, q.on('uur', 1)); tag(ctx, 'een uur later opnieuw', 1500, 300, C.text2, q.on('uur', 1), 'center', 26);
    urineStrip(ctx, 1640, 560, 0.7, q.on('urine', 1), 0); [['geen eiwit', 'eiwit'], ['geen klachten', 'klachten']].forEach(([s2, w], i) => chip(ctx, s2, 1400, 520 + i * 70, C.groen, q.on(w, 1), 26));
    tag(ctx, 'over een paar dagen nog eens meten', 960, 160, C.goud, q.on('dagen', 1), 'center', 28); },

  // ---------- H3 Zwangerschapsdiabetes ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); controle(ctx, t, { zw: 0.6, ex: 1220 }); tag(ctx, 'moeder van Esra: diabetes type 2', 960, 170, C.text2, q.on('moeder', 1), 'center', 28);
    tag(ctx, 'suikertest rond 26 weken', 960, 250, C.goud, q.on('suikertest', 1), 'center', 30); const d = q.on('drankje', 1);
    if (d > 0.01) { vkA(ctx, d); roundRect(ctx, 920, 470, 80, 150, 14); shape(ctx, rgba('#FFFFFF', 0.2), '#DCE3EA', 3); roundRect(ctx, 926, 530, 68, 84, 10); shape(ctx, rgba(C.goud, 0.6), null); ctx.restore(); }
    klokje(ctx, 1500, 400, 50, 1, q.on('uur', 1)); tag(ctx, 'nuchter meten', 640, 330, C.text2, q.on('nuchter', 1), 'center', 26); tag(ctx, '2 uur later: opnieuw meten', 1500, 500, C.text2, q.on('opnieuw', 1), 'center', 26); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const bound = 1 - q.on('minder', 1) * 0.7;
    ctx.save(); ctx.beginPath(); ctx.ellipse(300, 300, 170, 90, 0.2, 0, 6.283); shape(ctx, VK.plac, VK.placL, 3); ctx.restore(); naamBij(ctx, 'placenta', 'maakt hormonen', 300, 450, q.on('placenta', 1), 'center', VK.placL);
    for (let i = 0; i < 5; i++) { const f = (t * 0.3 + i / 5) % 1; circ(ctx, 480 + f * 300, 320 + (i % 2) * 30, 9, rgba(C.paars, q.on('hormonen', 1) * (1 - f * 0.4))); }
    doelcel(ctx, 960, 470, 170, { kind: 'insuline', bound: bound * q.on('insuline', 1), t, n: 6 }); naamBij(ctx, 'cel van de moeder', 'minder gevoelig voor insuline', 960, 720, q.on('gevoelig', 1), 'center');
    for (let i = 0; i < 10; i++) glucoseDeeltje(ctx, 1260 + (i % 5) * 60, 330 + Math.floor(i / 5) * 70, 18, q.on('glucose', 1));
    placentaGrens(ctx, 1600, 260, 400, q.on('door', 1)); for (let i = 0; i < 3; i++) { const f = (t * 0.4 + i / 3) % 1; glucoseDeeltje(ctx, 1520 + f * 200, 520 + i * 40, 16, q.on('door', 1)); }
    tag(ctx, 'alvleesklier: 2 à 3 keer zoveel insuline', 960, 170, C.groen, q.on('alvleesklier', 1) * (1 - q.on('Lukt', 1)), 'center', 30);
    regel(ctx, 'zwangerschapsdiabetes', 960, 170, q.on('Lukt', 1), C.koraal, 46, 'center', 800); tag(ctx, '± 5 op de 100 zwangeren', 960, 860, C.goud, q.on('vijf', 1), 'center', 28); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('geboorte', 2, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; placentaGrens(ctx, 760, 240, 520, 1); metaText(ctx, 'MOEDER', 400, 230, C.grain, 'center', 22); metaText(ctx, 'KIND', 1300, 230, C.grain, 'center', 22);
      for (let i = 0; i < 6; i++) { const f = (t * 0.3 + i / 6) % 1; glucoseDeeltje(ctx, 300 + f * 900, 330 + (i % 3) * 50, 18, 1); }
      hormoonVorm(ctx, 600, 600, 22, 'insuline', q.on('insuline', 1)); kruis(ctx, 760, 600, 30, q.on('insuline', 1)); naamBij(ctx, 'insuline moeder', 'gaat niet door de placenta', 420, 700, q.on('insuline', 1), 'center');
      for (let i = 0; i < 4; i++) hormoonVorm(ctx, 1000 + i * 70, 620, 20, 'insuline', q.on('zelf', 1)); naamBij(ctx, 'kind maakt zelf extra insuline', '', 1100, 720, q.on('zelf', 1), 'center');
      foetus(ctx, 1550, 520, 0.6 + 0.25 * q.on('groeit', 1, 2), { week: 36, t }); tag(ctx, 'groeit extra, vooral in vet', 1550, 820, C.goud, q.on('groeit', 1), 'center', 28); tag(ctx, 'schouders kunnen vast komen te zitten', 1300, 170, C.koraal, q.on('schouders', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'baby', 960, 640, 360, { t, uit: 'neutraal' }); tag(ctx, 'te lage bloedsuiker?', 960, 300, C.koraal, q.on('lage', 1), 'center', 34); vraagteken(ctx, 1300, 560, q.on('denk', 1), 110); ctx.restore(); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b'); const B = q.on('moeder', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; persoon(ctx, 'baby', 760, 640, 380, { t, uit: 'neutraal' }); for (let i = 0; i < 4; i++) hormoonVorm(ctx, 1150 + i * 70, 420, 20, 'insuline', 1); kruis(ctx, 1260, 560, 40, 1); glucoseDeeltje(ctx, 1260, 560, 22, 0.5);
      tag(ctx, 'bloedsuiker een paar keer meten', 960, 820, C.goud, q.on('meten', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'esra', 760, 880, 470, { t, kijk: 1, uit: 'blij', outfit: 'kraam' });
      chip(ctx, 'verdwijnt meestal na de geboorte', 1300, 330, C.groen, q.on('verdwijnt', 1), 28); chip(ctx, 'later meer kans op diabetes type 2', 1300, 410, C.koraal, q.on('later', 1), 28); stempel(ctx, 1300, 600, 'suikertest Esra: goed', C.groen, q.on('Esra', 1)); ctx.restore(); } },

  // ---------- H4 Wanneer verwijs je door? ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    huisje(ctx, 520, 470, 1.2, q.on('eerste', 1)); persoon(ctx, 'mirjam', 170, 880, 360, { t, kijk: 1, uit: 'blij', a: q.on('eerste', 1, 0.3) }); regel(ctx, 'eerste lijn', 520, 680, q.on('eerste', 1), C.groen, 40, 'center', 800); regel(ctx, 'verloskundige · gezonde zwangerschap', 520, 730, q.on('eerste', 1), C.text2, 28, 'center', 600);
    ziekenhuis(ctx, 1400, 500, 1.1, q.on('tweede', 1)); persoon(ctx, 'kim', 1760, 880, 380, { t, kijk: -1, uit: 'blij', outfit: 'lab', a: q.on('tweede', 1, 0.3) }); regel(ctx, 'tweede lijn', 1400, 680, q.on('tweede', 1), C.teal, 40, 'center', 800); regel(ctx, 'gynaecoloog · verhoogd risico', 1400, 730, q.on('tweede', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'zonder arts', 520, 200, C.goud, q.on('arts', 1), 'center', 30); tag(ctx, 'meer techniek, kinderarts dichtbij', 1400, 200, C.teal, q.on('techniek', 1), 'center', 28); tag(ctx, 'in andere landen: bijna altijd een arts', 960, 850, C.text2, q.on('landen', 1), 'center', 26); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('kiezen', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; stippen(ctx, 580, 360, 100, q.on('helft', 1) > 0.5 ? 55 : 0, C.teal, q.on('Bijna', 1), 20, 14, 40);
      tag(ctx, 'iedereen begint bij een verloskundige', 960, 200, C.groen, q.on('begint', 1), 'center', 30); tag(ctx, 'meer dan de helft wordt doorverwezen', 960, 780, C.teal, q.on('helft', 1), 'center', 30); tag(ctx, 'landelijke lijst met afspraken', 960, 860, C.text2, q.on('lijst', 1), 'center', 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'mirjam', 360, 880, 470, { t, kijk: 1, uit: 'denkt', pose: 'denk' });
      regel(ctx, 'nog gewoon, of doorverwijzen?', 1150, 260, 1, C.text, 40, 'center', 800); vraagteken(ctx, 1150, 560, q.on('denk', 1), 110); ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); const B = q.on('Misselijkheid', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; persoon(ctx, 'mirjam', 460, 880, 460, { t, kijk: 1, uit: 'praat', pose: 'vasthouden' }); persoon(ctx, 'kim', 1460, 880, 470, { t, kijk: -1, uit: 'neutraal', outfit: 'lab' });
      naamBij(ctx, 'Dokter Kim', 'gynaecoloog', 1560, 360, q.on('Kim', 1)); pijl(ctx, 700, 520, 1200, 520, C.teal, q.on('belt', 1), 6, 22); tag(ctx, 'wat ze heeft gezien en gemeten', 950, 460, C.teal, q.on('gemeten', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; chip(ctx, 'misselijk in week 8: normaal', 560, 230, C.groen, 1, 28); chip(ctx, 'eerste schoppen: normaal', 1360, 230, C.groen, 1, 28);
      [['tweeling', 'tweeling'], ['billen naar beneden aan het eind', 'billen'], ['kind groeit te weinig', 'groeit'], ['bloedverlies', 'bloedverlies']].forEach(([s2, w], i) => chip(ctx, s2, 960, 380 + i * 80, C.koraal, q.on(w, 1), 30));
      pijl(ctx, 1300, 760, 680, 760, C.groen, q.on('terug', 1), 5, 18); tag(ctx, 'opgelost? terug naar de verloskundige', 990, 840, C.groen, q.on('terug', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); controle(ctx, t, { zw: 0.95, uitE: 'lacht', uitM: 'blij' }); naamBij(ctx, 'Esra', '37 weken', 1180, 385, 1, 'center');
    [['bloeddruk weer gedaald', 'gedaald'], ['suikertest goed', 'suikertest'], ['kind groeit', 'groeit']].forEach(([s2, w], i) => chip(ctx, s2, 960, 190 + i * 70, C.groen, q.on(w, 1), 28)); tag(ctx, 'ze blijft bij Mirjam', 960, 470, C.goud, q.on('blijft', 1), 'center', 30); },

  s23(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1, { zonderRaam: true }); persoon(ctx, 'mirjam', 520, 880, 500, { t, kijk: 1, uit: 'blij', pose: 'wijsOmhoog' });
    stempel(ctx, 1200, 260, 'geen assistent', C.koraal, q.on('assistent', 1)); tag(ctx, 'zelf de zorgverlener', 1200, 400, C.goud, q.on('zorgverlener', 1), 'center', 32); tag(ctx, 'weten waar de grens ligt', 1200, 480, C.teal, q.on('grens', 1), 'center', 30);
    tag(ctx, 'oefenen met echte casussen', 1200, 600, C.paars, q.on('casussen', 1), 'center', 28); huisje(ctx, 1050, 830, 0.55, q.on('stages', 1)); ziekenhuis(ctx, 1360, 840, 0.5, q.on('stages', 1)); },
});
