// Wat word jij? · Fysiotherapie 4 · Welke oefening helpt? — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Fysiotherapeut Femke; Noor, Bilal, Verpleegkundige Jesse, Yasmin).
// Rode draad: één spreekuur van Femke met vier klachten.

Object.assign(SCENES, {
  title(ctx, t) { golfTee(ctx, 1660, 560, 1.1, 1, { spieren: 1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx); persoon(ctx, 'femke', 1620, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'spreekuur', 1680, 330, q.on('Femke', 1));
    paneel(ctx, 140, 200, 760, 520, '', q.on('maandag', 1)); metaA(ctx, 'MAANDAG · SPREEKUUR', 180, 260, q.on('maandag', 1));
    const rij = (i, w0, naam, sz) => { const a = q.on(w0, 1); icoon(ctx, sz, 230, 340 + i * 100, 1, a); regel(ctx, naam, 300, 356 + i * 100, a, C.text, 40, 'left', 700); regel(ctx, sz, 560, 356 + i * 100, a, C.text2, 34, 'left', 600); };
    rij(0, 'Noor', 'Noor', 'enkel'); rij(1, 'Bilal', 'Bilal', 'knie'); rij(2, 'Jesse', 'Jesse', 'rug'); rij(3, 'Yasmin', 'Yasmin', 'schouder');
    tag(ctx, 'alle vier: oefeningen', 520, 800, C.groen, q.on('oefeningen', 1), 'center', 30); kruis(ctx, 1100, 420, 26, q.on('massage', 1)); tag(ctx, 'massage of apparaat', 1100, 500, C.koraal, q.on('massage', 1), 'center', 26); vraagteken(ctx, 1200, 280, q.on('Waarom', 1), 100); },

  // ---------- H1 enkel ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const O = q.on('Veel', 1, 0.8);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; const kl = q.on('klapte', 1, 0.5) * (1 - q.on('gebroken', 1) * 0.7);
      enkel(ctx, 620, 560, 0.9, 1, { klap: kl, punten: q.on('plekjes', 1) * (1 - q.on('Meestal', 1)), scheur: q.on('ingescheurd', 1), hl: q.on('buitenste', 1) });
      persoon(ctx, 'noor', 1480, 860, 460, { t, outfit: 'sport', uit: 'neutraal', kijk: -1 }); naamBij(ctx, 'Noor', 'volleybal', 1540, 330, q.on('Noor', 1));
      tag(ctx, 'drukpijn op deze plekjes of geen 4 stappen → foto', 1000, 230, C.koraal, q.on('plekjes', 1) * (1 - q.on('Meestal', 1)), 'center', 26); checkRij(ctx, 'Noor: geen foto nodig', 900, 300, q.on('Dat', 1) * (1 - q.on('Meestal', 1)), 'ja', 30);
      naamBij(ctx, 'buitenste enkelband', 'uitgerekt of ingescheurd', 730, 620, q.on('buitenste', 1), 'left'); tag(ctx, 'na vijf dagen opnieuw testen', 1000, 160, C.teal, q.on('vijf', 1), 'center', 28); ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; metaA(ctx, 'NIEUWE VERZWIKKINGEN', 160, 230, 1); balk(ctx, 160, 290, 900, 0.9, C.koraal, 'zonder balansoefeningen', q.on('Veel', 1)); balk(ctx, 160, 390, 900, 0.6 * q.on('derde', 1) + 0.9 * (1 - q.on('derde', 1)), C.groen, '8 weken balansoefeningen thuis', q.on('acht', 1));
      tag(ctx, 'ongeveer een derde minder', 610, 500, C.groen, q.on('derde', 1), 'center', 30); const wb = Math.sin(t * 3) * 0.04; kussen(ctx, 1450, 850, 300, q.on('kussen', 1)); ctx.save(); ctx.translate(1450, 850); ctx.rotate(wb * 2 * q.on('kussen', 1)); enkel(ctx, 0, -76, 0.6, q.on('één', 1, 0.3), { klap: 0.1 * Math.sin(t * 3), ger: 1 }); ctx.restore(); tag(ctx, 'op één been', 1450, 400, C.paars, q.on('één', 1), 'center', 30); vraagteken(ctx, 1100, 650, q.on('helpt', 1), 100); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); enkel(ctx, 560, 580, 0.85, 1, { klap: 0.15 * Math.sin(t * 2), ger: 1 - q.on('trainen', 1) * 0.0, scheur: 0.4 });
    naamBij(ctx, 'zintuigjes in band en spieren', 'ook beschadigd', 760, 400, q.on('zintuigjes', 1)); tag(ctx, 'minder goed voelen hoe je voet staat', 1300, 560, C.koraal, q.on('voelt', 1), 'center', 28);
    verwijs(ctx, 'Opnieuw leren bewegen', 1300, 680, q.on('Opnieuw', 1)); tag(ctx, 'spiergevoel opnieuw trainen', 1300, 760, C.groen, q.on('trainen', 1), 'center', 30); },

  // ---------- H2 pees ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Rust', 1, 0.8), F = q.on('kniebuigingen', 1, 0.8);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; knieZijPees(ctx, 440, 520, 0.85, 1, { pees: q.on('pees', 1), pijn: q.on('springen', 1), t }); naamBij(ctx, 'knieschijfpees', 'overbelast', 470, 600, q.on('pees', 1), 'left');
      verwijs(ctx, 'Hoe weefsel herstelt', 1300, 200, q.on('weefsel', 1)); collageen(ctx, 900, 300, 380, 220, 1, q.on('weefsel', 1)); collageen(ctx, 1360, 300, 380, 220, 0.1, q.on('rommelig', 1)); naamBij(ctx, 'gezond', '', 1090, 570, q.on('weefsel', 1), 'center'); naamBij(ctx, 'overbelast', 'rommelige collageendraden', 1550, 570, q.on('rommelig', 1), 'center');
      tag(ctx, 'meestal geen echte ontsteking', 1320, 700, C.oker, q.on('ontsteking', 1), 'center', 28); ctx.restore(); }
    if (R * (1 - F) > 0.01) { ctx.save(); ctx.globalAlpha *= R * (1 - F); const st = (x, lab, sterk, pijn) => { regel(ctx, lab, x, 260, 1, C.text, 36, 'center', 700); collageen(ctx, x - 200, 320, 400, 200, 0.4, 1); balk(ctx, x - 200, 580, 400, sterk, C.teal, 'sterkte', 1); tag(ctx, pijn, x, 720, pijn.includes('terug') ? C.koraal : C.groen, 1, 'center', 28); };
      st(560, 'rust', 0.3, 'pijn minder'); if (q.on('springen', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('springen', 1); st(1360, 'weer springen', 0.3, 'pijn komt terug'); ctx.restore(); } ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const dip = (Math.sin(t * 0.9) * 0.5 + 0.5); persoon(ctx, 'bilal', 640, 860 + 60 * dip, 500, { t, outfit: 'sport', uit: 'neutraal', pose: 'handenHeup' }); tag(ctx, 'zwaar en langzaam', 640, 230, C.goud, 1, 'center', 32);
      kalenderW4(ctx, 1150, 300, 12, Math.round(12 * clamp((t - q.at('twaalf', 1)) / 2, 0, 1)), q.on('twaalf', 1)); pijnMeter(ctx, 1080, 640, 680, 3, q.on('pijn', 1)); vraagteken(ctx, 1000, 400, q.on('zegt', 1), 90); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); pijnMeter(ctx, 160, 280, 900, Math.round(5 * q.on('vijf', 1, 1.2)), 1); tag(ctx, 'tot ± 5 mag', 420, 400, C.groen, q.on('vijf', 1), 'center', 30); tag(ctx, 'volgende ochtend weer gezakt', 820, 400, C.teal, q.on('ochtend', 1), 'center', 28);
    const u = clamp((t - q.at('collageen', 1)) / 3, 0, 1); collageen(ctx, 1200, 240, 560, 300, 0.2 + 0.8 * u, q.on('pees', 1), u * 0.5); naamBij(ctx, 'nieuw collageen', 'pees wordt weer sterk', 1480, 600, q.on('collageen', 1), 'center');
    pijl(ctx, 1150, 390, 1060, 390, C.goud, q.on('trek', 1), 6, 20); pijl(ctx, 1810, 390, 1880, 390, C.goud, q.on('trek', 1), 6, 20); metaA(ctx, 'ZWARE, LANGZAME TREK', 1200, 220, q.on('trek', 1)); },

  // ---------- H3 rug ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'jesse', 520, 860, 500, { t, outfit: 'werk', uit: 'neutraal', pose: 'handenHeup' }); naamBij(ctx, 'Jesse', 'verpleegkundige', 520, 250, q.on('Jesse', 1), 'center'); { const M = lijfMaat('jesse', 520, 860, 500); flits(ctx, 520 + M.hw2 * 1.05, M.heupY - M.hh * 0.3, 44, q.on('rug', 1)); tag(ctx, 'onderrug', 520 + M.hw2 * 1.05 + 120, M.heupY - M.hh * 0.3, C.koraal, q.on('rug', 1) * (1 - q.on('Acht', 1)), 'left', 24); }
    metaA(ctx, 'OOIT LAGE RUGPIJN', 900, 330, q.on('Acht', 1)); stippen(ctx, 900, 370, 10, Math.round(8 * q.on('tien', 1, 1)), C.koraal, q.on('Acht', 1), 10, 26, 70); regel(ctx, '8 van de 10', 900, 470, q.on('tien', 1), C.koraal, 44, 'left', 700);
    tag(ctx, 'meestal geen duidelijke oorzaak', 1180, 550, C.oker, q.on('oorzaak', 1), 'center', 28); persoon(ctx, 'femke', 1600, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'neutraal', a: q.on('scan', 1, 0.3) }); tag(ctx, 'scan?', 900, 640, C.teal, q.on('scan', 1), 'center', 32); kruis(ctx, 1000, 630, 22, q.on('nee', 1)); vraagteken(ctx, 1300, 650, q.on('Waarom', 1), 90); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const AL = q.on('alarmsignalen', 1, 0.8), BW = q.on('advies', 1, 0.8);
    if (AL < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - AL; wervels(ctx, 360, 540, 0.85, 1, { slijt: q.on('slijtage', 1) }); metaA(ctx, 'MENSEN ZONDER RUGPIJN · SLIJTAGE OP DE SCAN', 760, 240, q.on('twintigjarigen', 1));
      balk(ctx, 760, 300, 900, 0.37 * q.on('derde', 1, 1.2), C.oker, '20 jaar: ruim een derde', q.on('twintigjarigen', 1)); balk(ctx, 760, 400, 900, 0.96 * q.on('tachtigjarigen', 1, 1.2), C.oker, '80 jaar: bijna iedereen', q.on('tachtigjarigen', 1));
      tag(ctx, 'kan bang maken om te bewegen', 1200, 560, C.koraal, q.on('bang', 1), 'center', 28); ctx.restore(); }
    if (AL * (1 - BW) > 0.01) { ctx.save(); ctx.globalAlpha *= AL * (1 - BW); metaA(ctx, 'ALARMSIGNALEN → METEEN NAAR DE ARTS', 160, 260, 1, C.koraal); const n = q.on('Jesse', 1) > 0.5 ? 'nee' : null;
      checkRij(ctx, 'gevoelloos zitvlak', 160, 360, q.on('gevoelloos', 1), n); checkRij(ctx, 'moeite met plassen', 160, 440, q.on('plassen', 1), n); checkRij(ctx, 'koorts', 160, 520, q.on('koorts', 1), n); persoon(ctx, 'jesse', 1300, 860, 480, { t, outfit: 'werk', uit: 'neutraal' }); ctx.restore(); }
    if (BW > 0.01) { ctx.save(); ctx.globalAlpha *= BW; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 760, W, 120); const x = 500 + ((t * 60) % 900); persoon(ctx, 'jesse', x, 860, 460, { t, outfit: 'gewoon', uit: 'blij' });
      regel(ctx, 'blijf bewegen', 160, 260, 1, C.groen, 52, 'left', 700); tag(ctx, 'in bed blijven: trager herstel', 1400, 300, C.koraal, q.on('bed', 1), 'center', 28); tag(ctx, 'elke dag wandelen en opbouwen', 1400, 380, C.groen, q.on('wandelt', 1), 'center', 28); ctx.restore(); } },

  // ---------- H4 schouder ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const OP = q.on('Vroeger', 1, 0.8);
    if (OP < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - OP; persoon(ctx, 'yasmin', 420, 860, 480, { t, outfit: 'school', uit: 'neutraal', pose: q.on('elastiek', 1) > 0.5 ? 'vasthouden' : 'wijsOmhoog' }); naamBij(ctx, 'Yasmin', 'zwemt veel', 500, 300, q.on('Yasmin', 1));
      if (q.on('elastiek', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('elastiek', 1); ctx.strokeStyle = C.groen; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(470, 610); ctx.quadraticCurveTo(620, 600 + 20 * Math.sin(t * 2), 760, 640); ctx.stroke(); ctx.restore(); tag(ctx, 'oefenen met elastiek', 600, 220, C.groen, q.on('elastiek', 1), 'center', 28); }
      golfTee(ctx, 1250, 460, 1.2, q.on('golfbal', 1), { spieren: q.on('spieren', 1), t }); naamBij(ctx, 'kop van de bovenarm', 'golfbal', 1250, 190, q.on('golfbal', 1), 'center'); naamBij(ctx, 'vier kleine spieren', 'houden de kop in de kom', 1600, 520, q.on('spieren', 1), 'left'); ctx.restore(); }
    if (OP > 0.01) { ctx.save(); ctx.globalAlpha *= OP; tag(ctx, 'vroeger vaak: operatie om ruimte te maken', 960, 260, C.oker, 1, 'center', 32); groepBalken(ctx, 600, 360, q.on('zoek', 1), 0); vraagteken(ctx, 960, 560, q.on('helpt', 1), 120); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const U = q.on('ultrageluid', 1, 0.8);
    if (U < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - U; metaA(ctx, 'BRITS ONDERZOEK', 160, 230, q.on('Britse', 1)); groepBalken(ctx, 300, 300, q.on('groep', 1), clamp((t - q.at('vooruit', 1)) / 1.5, 0, 1));
      tag(ctx, 'echt', 490, 395, C.teal, q.on('echte', 1), 'center', 24); tag(ctx, 'niets weggehaald', 790, 395, C.oker, q.on('kijkoperatie', 1), 'center', 24);
      tag(ctx, 'ongeveer even veel vooruit', 1400, 400, C.goud, q.on('even', 1), 'center', 32); tag(ctx, 'verwachting en tijd doen veel', 1400, 480, C.text2, q.on('verwachten', 1), 'center', 28); ctx.restore(); }
    if (U > 0.01) { ctx.save(); ctx.globalAlpha *= U; ultrageluid(ctx, 560, 470, 1.6, 1); tag(ctx, 'ultrageluid: voegt nauwelijks iets toe', 560, 230, C.koraal, 1, 'center', 28);
      persoon(ctx, 'femke', 1400, 860, 480, { t, outfit: 'werk', uit: 'neutraal', kijk: -1, pose: 'denk' }); tag(ctx, 'leest onderzoek, past haar werk aan', 1400, 260, C.teal, q.on('lezen', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body, col) => card(ctx, 120 + i * 430, 230, 400, 230, tit, body, q.on(w0, 1), col);
    kaart(0, 'klachten', 'enkel', 'spiergevoel trainen', C.teal); kaart(1, 'oefeningen', 'pees', 'zwaar en langzaam', C.goud); kaart(2, 'gevaarlijk', 'rug', 'blijf bewegen', C.groen); kaart(3, 'belasting', 'schouder', 'kop in de kom', C.paars);
    tag(ctx, 'uitsluiten wat gevaarlijk is → juiste belasting → uitleggen', 960, 560, C.text, q.on('uitleggen', 1), 'center', 30); tag(ctx, 'gaat het niet over? laat het onderzoeken', 960, 680, C.koraal, q.on('onderzoeken', 1), 'center', 32); },

  s17(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    tag(ctx, 'fysiotherapie: hbo', 480, 260, C.teal, q.on('hbo', 1), 'center', 30); tag(ctx, 'sportfysiotherapeut', 480, 380, C.goud, q.on('sportfysiotherapeut', 1), 'center', 28); tag(ctx, 'kinderen', 480, 450, C.goud, q.on('kinderen', 1), 'center', 28); tag(ctx, 'ouderen', 480, 520, C.goud, q.on('ouderen', 1), 'center', 28);
    tag(ctx, 'zelf onderzoek doen', 1450, 450, C.paars, q.on('onderzoek', 1), 'center', 30); },
});
function kalenderW4(ctx, x, y, n, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x + (i % 6) * 70, y + Math.floor(i / 6) * 70, 56, 56, 8); shape(ctx, i < k ? C.groen : '#3A4458', C.line, 1.5); } metaText(ctx, '12 WEKEN', x, y - 16, C.grain, 'left', 22); ctx.restore(); }
