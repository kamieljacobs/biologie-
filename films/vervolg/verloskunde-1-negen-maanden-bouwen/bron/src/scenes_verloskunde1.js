// Wat word jij? · Verloskunde 1 · Negen maanden bouwen — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra 7 weken zwanger).
// Rode draad: de intake van Esra, en het kind dat intussen groeit.

// tafeltje tussen de twee personen
function tafel(ctx, x, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - 140, 640, 280, 22, 6); shape(ctx, '#6B4E3A', null); ctx.fillStyle = '#5A4030'; ctx.fillRect(x - 120, 662, 14, 218); ctx.fillRect(x + 106, 662, 14, 218); ctx.restore(); }
// spreekkamer met Mirjam links en Esra rechts
function intake(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  praktijk(ctx, 1, o.kamer || {}); if (o.tafel !== false) tafel(ctx, 960);
  persoon(ctx, 'mirjam', o.mx || 700, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan' });
  persoon(ctx, 'esra', o.ex || 1220, 880, 455, { t, kijk: -1, uit: o.uitE || 'blij', pose: o.poseE || 'staan', zwanger: o.zw || 0 }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { baarmoeder(ctx, 1400, 560, 0.62, { week: 30, groei: 0.85, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    intake(ctx, t, { uitE: q.on('test', 1) > 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Esra', '7 weken zwanger', 1220, 385, q.on('Esra', 1), 'center'); naamBij(ctx, 'Verloskundige Mirjam', '', 470, 360, q.on('Mirjam', 1));
    potje(ctx, 960, 640, 0.8, q.on('foliumzuur', 1, 0.4)); tag(ctx, 'begonnen bij een positieve test', 1180, 330, C.text2, q.on('vorige', 1), 'center', 26);
    tag(ctx, 'advies: al vóór de zwangerschap', 960, 170, C.goud, q.on('eerder', 1), 'center', 30); vraagteken(ctx, 960, 470, q.on('denk', 1), 100); },

  // ---------- H1 De intake ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord a'); const u = clamp((t - q.at('vouwt', 1)) / 5, 0, 1);
    neuraleBuis(ctx, 960, 520, 1.15, 1, u); naamBij(ctx, 'plaatje cellen', 'op de rug van het embryo', 960, 690, q.on('plaatje', 1) * (1 - clamp(u * 2, 0, 1)), 'center');
    naamBij(ctx, 'neurale buis', 'hersenen en ruggenmerg', 960, 690, q.on('hersenen', 1), 'center');
    tag(ctx, 'niet helemaal dicht → open ruggetje', 520, 830, C.koraal, q.on('ruggetje', 1), 'center', 28); tag(ctx, 'foliumzuur verkleint de kans', 1400, 830, C.goud, q.on('verkleint', 1), 'center', 28);
    tag(ctx, 'dicht: ± 4 weken na de bevruchting', 960, 270, C.groen, q.on('vier', 1), 'center', 32); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    tijdlijn(ctx, 200, 520, 1520, 1, { max: 10, stap: 1, titel: 'WEKEN ZWANGERSCHAP',
      marks: [[0, 'laatste menstruatie', C.text2, q.on('menstruatie', 1)], [2, 'bevruchting', C.paars, q.on('bevruchting', 1), 60], [6, 'ruggetje dicht', C.groen, q.on('gesloten', 1), 60], [7, 'vandaag', C.goud, q.on('zeven', 1)]],
      banden: [[2, 7, C.paars, q.on('vijf', 1), 'embryo: 5 weken oud']] });
    foetus(ctx, 200 + 1520 * 0.7, 330, 0.45, { week: 7, a: q.on('vijf', 1), t }); persoon(ctx, 'esra', 1800, 880, 300, { t, kijk: -1, uit: 'neutraal', a: q.on('Esra', 1, 0.3) });
    tag(ctx, 'daarom: advies vóór de zwangerschap', 960, 820, C.goud, q.on('Daarom', 1), 'center', 30); },

  s06(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { kamer: { zonderPoster: true, zonderRaam: true }, mx: 640, ex: 1280 });
    naamBij(ctx, 'intake', 'eerste afspraak', 960, 200, q.on('intake', 1) * (1 - q.on('rekent', 1)), 'center');
    vkKaart(ctx, 90, 90, 560, 300, 'Vragen', [['uitgerekende datum', 'datum'], ['gezondheid, medicijnen', 'gezond'], ['roken, alcohol', 'Rookt'], ['ziektes in de familie', 'familie']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.teal, q.on('rekent', 1));
    vkKaart(ctx, 680, 90, 560, 300, 'Eten', [['geen rauw vlees', 'vlees'], ['geen kaas van rauwe melk', 'kaas'], ['kattenbak: niet zelf', 'kattenbak'], ['toxoplasmose', 'toxoplasmose']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.goud, q.on('eten', 1));
    vkKaart(ctx, 1270, 90, 560, 300, 'Bloedtest', [['hiv', 'hiv'], ['hepatitis B', 'hepatitis'], ['syfilis', 'syfilis'], ['baby beschermen', 'beschermen']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.koraal, q.on('bloedtest', 1)); },

  // ---------- H2 Drie lagen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('nestelt', 1)) / 4, 0, 1);
    vkA(ctx, 1); roundRect(ctx, 260, 560, 1400, 300, 40); shape(ctx, rgba(VK.spier, 0.35), rgba(VK.spier, 0.7), 2); ctx.restore(); naamBij(ctx, 'baarmoederslijmvlies', '', 300, 840, q.on('slijmvlies', 1));
    blastocyste(ctx, 960, 420 + 180 * u, 120, 1, u, t); tag(ctx, '1 week na de bevruchting', 960, 200, C.text2, q.on('week', 1), 'center', 28);
    naamBij(ctx, 'buitenste cellen', 'worden de placenta', 1130, 420 + 180 * u, q.on('placenta', 1), 'left', C.paars); naamBij(ctx, 'groepje binnenin', 'wordt het kind', 790, 500 + 180 * u, q.on('kind', 1), 'right', C.goud);
    tag(ctx, 'film: Van bevruchting tot baby', 1500, 200, C.teal, q.on('film', 1), 'center', 26); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('medicijn', 1), up = q.on('herstelt', 1, 1), dn = q.on('overleeft', 1, 1);
    regel(ctx, 'de eerste twee weken', 960, 170, q.on('eerste', 1), C.text, 40, 'center', 700);
    cellenHoop(ctx, 520, 520, 64, 1, { ziek: d > 0.5 ? [3, 9, 10] : [] }); chip(ctx, 'cellen nemen elkaars werk nog over', 520, 740, C.paars, q.on('elkaars', 1), 28);
    pijl(ctx, 760, 480, 1180, 330, C.groen, up, 6, 22); cellenHoop(ctx, 1380, 330, 52, up, { ziek: [3, 9, 10], herstel: up }); chip(ctx, 'herstelt helemaal', 1380, 500, C.groen, up, 28);
    pijl(ctx, 760, 580, 1180, 720, C.text2, dn, 6, 22); cellenHoop(ctx, 1380, 720, 52, dn * 0.3, { ziek: [0, 1, 2, 3, 4, 5, 6, 9, 10, 14] }); chip(ctx, 'overleeft het niet', 1380, 850, C.text2, dn, 28);
    tag(ctx, 'alles of niets', 960, 270, C.goud, q.on('alles-of-niets', 1), 'center', 34); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('lagen', 1)) / 2.5, 0, 1);
    tag(ctx, 'derde week na de bevruchting', 480, 200, C.text2, q.on('derde', 1), 'center', 28); kiemschijf(ctx, 480, 400, 560, 1, u); naamBij(ctx, 'kiembladen', '', 480, 610, q.on('kiembladen', 1), 'center');
    const rij = (i, col, kop, org, w) => { const a = q.on(w, 1); if (a <= 0.01) return; vkA(ctx, a); text(ctx, kop, 790, 412 + i * 54, fTekst(30, 800), col, 'left'); text(ctx, org, 1010, 412 + i * 54, fTekst(30, 600), C.text, 'left'); ctx.restore(); };
    rij(0, VK.ecto, 'buitenste laag', 'huid en het hele zenuwstelsel', 'buitenste'); rij(1, VK.meso, 'middelste laag', 'spieren, botten, hart en bloed', 'middelste'); rij(2, VK.endo, 'binnenste laag', 'darmkanaal, longen en lever', 'binnenste');
    tag(ctx, 'dezelfde genen, per laag andere genen aan', 960, 860, C.paars, q.on('Dezelfde', 1), 'center', 28); },

  // ---------- H3 De kwetsbare weken ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    tijdlijn(ctx, 200, 640, 1520, 1, { max: 10, stap: 1, titel: 'WEKEN NA DE BEVRUCHTING', marks: [[3, 'hart klopt', C.koraal, q.on('hart', 1), 60], [4.5, 'armen en benen', C.goud, q.on('knopjes', 1)]], banden: [[3, 8, C.koraal, q.on('drie', 1), 'alle organen worden aangelegd']] });
    foetus(ctx, 960, 340, 0.85, { week: 9, t, a: q.on('organen', 1) }); tag(ctx, 'kwetsbaarst', 1450, 300, C.koraal, q.on('kwetsbaarst', 1), 'center', 34); tag(ctx, 'blijvende schade', 1450, 380, C.koraal, q.on('blijvende', 1), 'center', 28); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    pillen(ctx, 360, 360, 1, q.on('Softenon', 1), 'Softenon', C.paars); tag(ctx, 'jaren vijftig · slaapmiddel', 360, 560, C.text2, q.on('vijftig', 1), 'center', 26);
    regel(ctx, '± 10.000 kinderen', 960, 300, q.on('tienduizend', 1), C.koraal, 56, 'center', 800); regel(ctx, 'korte of geen armen en benen', 960, 370, q.on('ontbrekende', 1), C.text, 32, 'center', 600);
    tijdlijn(ctx, 520, 680, 880, q.on('periode', 1), { max: 10, stap: 1, titel: 'WEKEN NA DE BEVRUCHTING', banden: [[3, 5, C.goud, 1, 'alleen in deze weken']] });
    foetus(ctx, 1580, 420, 0.6, { week: 7, t, a: q.on('Precies', 1) }); if (q.on('Precies', 1) > 0.01) { vkA(ctx, q.on('Precies', 1) * (0.6 + 0.4 * Math.sin(t * 4))); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(1580 + 24, 420 - 12, 40, 0, 6.283); ctx.arc(1580 + 40, 420 + 30, 40, 0, 6.283); ctx.stroke(); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('infecties', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      roundRect(ctx, 200, 260, 700, 480, 30); shape(ctx, rgba(VK.bloedM, 0.15), rgba(VK.bloedM, 0.6), 2); roundRect(ctx, 1020, 260, 700, 480, 30); shape(ctx, rgba(VK.bloedK, 0.12), rgba(VK.bloedK, 0.6), 2);
      ctx.strokeStyle = rgba(C.paars, 0.9); ctx.lineWidth = 8; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(960, 240); ctx.lineTo(960, 760); ctx.stroke(); ctx.setLineDash([]);
      metaText(ctx, 'BLOED MOEDER', 550, 230, C.grain, 'center', 22); metaText(ctx, 'BLOED KIND', 1370, 230, C.grain, 'center', 22); naamBij(ctx, 'placenta', 'dunne laag cellen', 980, 820, 1, 'center');
      for (let i = 0; i < 5; i++) { const f = ((t * 0.25 + i / 5) % 1); molecuultje(ctx, 300 + f * 1300, 360 + i * 30, 1.3, 'alcohol', q.on('alcohol', 1)); molecuultje(ctx, 300 + ((f + 0.5) % 1) * 1300, 560 + i * 30, 1.2, 'zuurstof', q.on('zuurstof', 1)); }
      naamBij(ctx, 'alcohol', '', 300, 330, q.on('alcohol', 1)); naamBij(ctx, 'zuurstof', '', 300, 700, q.on('zuurstof', 1));
      tag(ctx, 'veilige hoeveelheid: onbekend', 960, 170, C.goud, q.on('veilige', 1), 'center', 30); stempel(ctx, 1500, 160, 'niet drinken', C.koraal, q.on('helemaal', 1)); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; foetus(ctx, 1200, 520, 0.9, { week: 12, t }); for (let i = 0; i < 4; i++) { const f = (t * 0.2 + i / 4) % 1; virusje(ctx, 300 + f * 700, 380 + i * 70, 26, 1); }
      naamBij(ctx, 'rodehond', 'in de eerste maanden', 300, 300, q.on('rodehond', 1)); tag(ctx, 'doof', 1550, 400, C.koraal, q.on('doof', 1), 'center', 30); tag(ctx, 'hartafwijking', 1550, 480, C.koraal, q.on('hartafwijking', 1), 'center', 30);
      tag(ctx, 'daarom: BMR-prik als kind', 960, 820, C.teal, q.on('prik', 1), 'center', 30); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { kamer: { zonderRaam: true }, uitM: q.on('raadt', 1) > 0.5 ? 'praat' : 'neutraal' });
    pillen(ctx, 1500, 300, 0.8, q.on('ibuprofen', 1), 'ibuprofen', C.koraal); kruis(ctx, 1600, 250, 30, q.on('paracetamol', 1)); pillen(ctx, 1500, 560, 0.8, q.on('paracetamol', 1), 'paracetamol', C.groen); vink_(ctx, 1610, 520, 30, q.on('paracetamol', 1) * 0.9);
    tag(ctx, 'later in de zwangerschap: nieren, bloedvat bij het hart', 960, 170, C.koraal, q.on('nieren', 1), 'center', 28); tag(ctx, 'zie: De bevalling', 960, 830, C.teal, q.on('bevalling', 1), 'center', 26); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    foetus(ctx, 520, 470, 0.9, { week: 7, t }); regel(ctx, '5 weken na de bevruchting', 520, 760, 1, C.text, 40, 'center', 800);
    foetus(ctx, 1400, 470, 1.1, { week: 22, t, a: q.on('twintig', 1) }); regel(ctx, '20 weken na de bevruchting', 1400, 760, q.on('twintig', 1), C.text, 40, 'center', 800);
    tag(ctx, 'stof die de aanleg van armen verstoort', 960, 180, C.paars, q.on('stof', 1), 'center', 30); vraagteken(ctx, 960, 520, q.on('denk', 1), 120); },

  // ---------- H4 Groeien en rijpen ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b');
    foetus(ctx, 960, 560, 0.5, { week: 10, t, a: 1 - q.on('twaalf', 1) }); tag(ctx, 'na 8 weken: embryo → foetus', 960, 230, C.paars, q.on('foetus', 1), 'center', 30); tag(ctx, 'groeien en rijpen', 960, 300, C.goud, q.on('rijpen', 1), 'center', 30);
    const kol = (x, s, wk, l1, l2, w) => { const a = q.on(w, 1); foetus(ctx, x, 560, s, { week: wk, t, a }); regel(ctx, l1, x, 800, a, C.text, 34, 'center', 800); regel(ctx, l2, x, 845, a, C.text2, 28, 'center', 600); };
    kol(400, 0.2, 12, '12 weken', '± 6 cm', 'twaalf'); kol(900, 0.65, 20, '20 weken', '± 25 cm · 300 g', 'twintig'); kol(1480, 1.15, 38, 'geboorte', '± 50 cm · 3,5 kg', 'geboorte'); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    echoScherm(ctx, 960, 200, 820, 1, (c) => { foetus(c, -20, 0, 0.75, { week: 11 }); const m = q.on('kruin', 1, 1.2); if (m > 0.01) { c.save(); c.globalAlpha *= m; c.strokeStyle = C.goud; c.lineWidth = 5; c.setLineDash([12, 8]); c.beginPath(); c.moveTo(-40, -170); c.lineTo(-40 + 50 * m, -170 + 300 * m); c.stroke(); c.setLineDash([]); circ(c, -40, -170, 9, C.goud); if (m > 0.95) circ(c, 10, 130, 9, C.goud); c.restore(); } });
    naamBij(ctx, 'kop-romplengte', 'van kruin tot stuit', 1450, 520, q.on('kruin', 1), 'left', C.goud); naamBij(ctx, 'termijnecho', '10 tot 12 weken', 300, 300, q.on('termijnecho', 1));
    tag(ctx, 'alle embryo’s groeien ongeveer even snel', 960, 140, C.text2, q.on('even', 1), 'center', 28); tag(ctx, 'termijn op een paar dagen nauwkeurig', 960, 860, C.groen, q.on('nauwkeurig', 1), 'center', 30); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const adem = 0.5 + 0.5 * Math.sin(t * 2.2);
    naamBij(ctx, 'longen', 'als laatste klaar', 960, 200, q.on('longen', 1), 'center');
    longblaasje(ctx, 560, 500, 170, q.on('water', 1), { open: q.on('surfactant', 1) > 0.5 ? 0.2 + 0.8 * adem : 1, water: q.on('trekt', 1) });
    naamBij(ctx, 'laagje water', 'trekt de wand naar binnen', 560, 760, q.on('trekt', 1), 'center');
    longblaasje(ctx, 1360, 500, 170, q.on('surfactant', 1), { open: 0.85 + 0.15 * adem, surf: 1 }); naamBij(ctx, 'surfactant', 'houdt het blaasje open', 1360, 760, q.on('surfactant', 1), 'center', C.goud);
    tag(ctx, 'zonder', 560, 280, C.koraal, q.on('surfactant', 1), 'center', 28); tag(ctx, 'met', 1360, 280, C.groen, q.on('surfactant', 1), 'center', 28);
    tag(ctx, 'geboren bij 25 weken: ademhulp en extra surfactant', 960, 860, C.koraal, q.on('vijfentwintig', 1), 'center', 30); },

  s19(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'esra', 520, 880, 470, { t, kijk: 1, uit: 'bezorgd', zwanger: 0.65, outfit: 'gewoon' }); const p1 = q.on('prikken', 1);
    spuit(ctx, 700, 560, 0.7, p1, -2.5); klokje(ctx, 1000, 260, 50, 0, p1); regel(ctx, 'prik 1', 1000, 350, p1, C.text, 28, 'center', 700); klokje(ctx, 1200, 260, 50, 1, p1); regel(ctx, 'prik 2', 1200, 350, p1, C.text, 28, 'center', 700); tag(ctx, 'een dag ertussen', 1100, 180, C.text2, q.on('dag', 1), 'center', 26);
    naamBij(ctx, 'bijnierschorshormoon', '', 1100, 440, p1, 'center', C.goud);
    longblaasje(ctx, 1420, 640, 90, q.on('versnelt', 1), { open: 1, surf: clamp((t - q.at('versnelt', 1)) / 3, 0, 1) }); tag(ctx, 'longen rijpen sneller', 1420, 820, C.groen, q.on('versnelt', 1), 'center', 28);
    vraagteken(ctx, 960, 620, q.on('denk', 1), 110); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); baarmoeder(ctx, 1050, 520, 0.8, { week: 30, groei: 0.8, t });
    const pad = [[180, 520], [600, 520], [1140, 290], [1080, 470]]; for (let i = 0; i < 6; i++) { const f = ((t * 0.3 + i / 6) % 1) * 3, k = Math.min(2, Math.floor(f)), r = f - k; circ(ctx, pad[k][0] + (pad[k + 1][0] - pad[k][0]) * r, pad[k][1] + (pad[k + 1][1] - pad[k][1]) * r, 11, C.goud); }
    naamBij(ctx, 'hormoon in het bloed van de moeder', '', 180, 470, q.on('hormoon', 1)); naamBij(ctx, 'door de placenta', '', 1250, 220, q.on('placenta', 1), 'left', C.paars); naamBij(ctx, 'surfactant aan', 'in de longen van het kind', 1350, 560, q.on('surfactant', 1));
    tag(ctx, 'duurt 1 à 2 dagen', 400, 760, C.text2, q.on('duurt', 1), 'center', 28); tag(ctx, 'elke dag langer telt', 960, 870, C.goud, q.on('elke', 1), 'center', 30); },

  s22(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { uitE: 'lacht', uitM: 'blij' });
    [['ruggetje gesloten', 'ruggetje'], ['hart klopt', 'klopt'], ['organen worden aangelegd', 'organen']].forEach(([s2, w], i) => { const a = q.on(w, 1); chip(ctx, s2, 960, 190 + i * 70, C.groen, a, 28); });
    tag(ctx, 'luisteren en adviseren', 960, 470, C.goud, q.on('luisteren', 1), 'center', 34); },

  s23(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1, { zonderRaam: true }); persoon(ctx, 'mirjam', 520, 880, 500, { t, kijk: 1, uit: 'blij', pose: 'wijsOmhoog' });
    regel(ctx, 'Opleiding verloskunde', 1150, 220, q.on('Verloskundige', 1), C.text, 44, 'center', 800); tag(ctx, 'hbo · 4 jaar', 1150, 300, C.goud, q.on('vier', 1), 'center', 32);
    tag(ctx, 'biologie en geneeskunde', 1000, 400, C.teal, q.on('biologie', 1), 'center', 28); tag(ctx, 'gesprekken voeren', 1340, 400, C.paars, q.on('gesprekken', 1), 'center', 28);
    huisje(ctx, 1000, 680, 0.8, q.on('praktijk', 1)); naamBij(ctx, 'praktijk', '', 1000, 800, q.on('praktijk', 1), 'center'); ziekenhuis(ctx, 1380, 700, 0.75, q.on('ziekenhuis', 1)); naamBij(ctx, 'ziekenhuis', '', 1380, 800, q.on('ziekenhuis', 1), 'center');
    tag(ctx, 'stage vanaf het begin', 1190, 520, C.groen, q.on('stage', 1), 'center', 28); },
});
