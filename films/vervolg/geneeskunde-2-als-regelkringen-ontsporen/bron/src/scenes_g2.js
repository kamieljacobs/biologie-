// Wat word jij? · Geneeskunde · Als regelkringen ontsporen — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Bilal als patiënt, Dr. Kim als intensivist).

Object.assign(SCENES, {
  title(ctx, t) { drukGrafiek(ctx, 1080, 380, 640, 360, 1, 0.5 + 0.5 * clamp(t / 4, 0, 1)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('ziekenhuis', 1, 0.8);
    scooter(ctx, 360, 820, 1.1, 1 - M * 0.7, 0.25); persoon(ctx, 'bilal', 700, 880, 450, { t, uit: q.on('bleek', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: 'vasthouden', kijk: 1 });
    for (let i = 0; i < 5; i++) { const ph = (t * 0.8 + i / 5) % 1; circ(ctx, 690 + (i % 2) * 14, 700 + ph * 160, 7, rgba('#C9453A', q.on('slagader', 1) * (1 - ph))); }
    naamBij(ctx, 'Bilal', '17 jaar', 790, 380, q.on('Bilal', 1));
    const hr = 80 + 45 * clamp((t - q.at('hartslag', 1)) / 3, 0, 1); monitor(ctx, 1100, 240, 640, 300, M, t, hr, q.on('normaal', 1) > 0.5 ? '112/76' : '120/80', C.groen);
    chip(ctx, 'bloeddruk bijna normaal', 1420, 610, C.groen, q.on('normaal', 1), 26); chip(ctx, 'hartslag omhoog · bleek en koud', 1420, 690, C.koraal, q.on('bleek', 1), 26); vraagteken(ctx, 1420, 830, q.on('denk', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const V = q.on('volwassene', 1, 0.8);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; metaA(ctx, 'REGELKRING BLOEDDRUK', 160, 230, 1, C.grain, 'left', 24);
      kring(ctx, 520, 340, 360, 'drukzintuigen in de slagaders', q.on('zintuigen', 1), C.teal); pijl(ctx, 745, 340, 960, 340, C.line, q.on('Daalt', 1)); kring(ctx, 1160, 340, 360, 'hart sneller en krachtiger', q.on('sneller', 1), C.koraal);
      kring(ctx, 1160, 480, 360, 'vaten in huid en darmen nauwer', q.on('knijpen', 1), C.koraal); kring(ctx, 1160, 620, 360, 'nieren houden water vast', q.on('nieren', 1), C.koraal);
      pijl(ctx, 980, 700, 300, 700, C.line, q.on('negatieve', 1), 4, 0); pijl(ctx, 300, 700, 300, 340, C.line, q.on('negatieve', 1), 4, 0); pijl(ctx, 300, 340, 330, 340, C.line, q.on('negatieve', 1)); regel(ctx, 'negatieve terugkoppeling: de daling wordt tegengewerkt', 960, 790, q.on('negatieve', 1), C.goud, 34, 'center', 800);
      tag(ctx, 'film: Water in balans', 1640, 620, C.teal, q.on('Water', 1), 'center', 24); chip(ctx, 'bleek en koud: bloed naar hart en hersenen', 620, 560, C.text2, q.on('hersenen', 1), 24); ctx.restore(); }
    if (V > 0.01) { drukGrafiek(ctx, 260, 280, 1100, 420, V, clamp((t - q.at('anderhalve', 1) + 1) / 2, 0.02, 0.6)); tag(ctx, 'ongeveer 5 liter bloed', 1580, 300, C.koraal, V, 'center', 28); chip(ctx, 'al in gevaar, maar verborgen', 1580, 420, C.goud, q.on('verbergt', 1), 26); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); drukGrafiek(ctx, 260, 280, 1100, 420, 1, clamp(0.6 + (t - q.at('derde', 1)) / 4 * 0.4, 0.6, 1)); tag(ctx, 'rond een derde van het bloed', 1580, 340, C.koraal, q.on('derde', 1), 'center', 26); chip(ctx, 'dan gaat het snel', 1580, 460, C.goud, q.on('snel', 1), 26); vraagteken(ctx, 1580, 640, q.on('denk', 1), 100); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const S = q.on('melkzuur', 1, 0.8);
    cirkel(ctx, 760, 500, 230, 1, [['druk te laag', q.on('druk', 1)], ['te weinig zuurstof voor de hartspier', q.on('zuurstof', 1)], ['hart pompt slechter', q.on('slechter', 1)], ['druk zakt verder', q.on('verder', 1)]], t);
    regel(ctx, 'positieve terugkoppeling: een vicieuze cirkel', 760, 830, q.on('positieve', 1), C.koraal, 34, 'center', 800);
    tag(ctx, 'zonder zuurstof: melkzuur', 1500, 330, C.oker, S, 'center', 28); tag(ctx, 'film: Alles op adem', 1500, 230, C.teal, q.on('adem', 1), 'center', 24); chip(ctx, 'bloed verzuurt · hart nog zwakker', 1500, 430, C.koraal, q.on('verzuurt', 1), 26);
    regel(ctx, 'shock', 1500, 610, q.on('shock', 1), C.goud, 64, 'center', 800); regel(ctx, 'organen krijgen te weinig bloed', 1500, 670, q.on('shock', 1), C.text, 30, 'center', 600); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('infectie', 1); for (let i = 0; i < 7; i++) staafje(ctx, 260 + (i % 4) * 70 + Math.sin(t + i) * 6, 300 + Math.floor(i / 4) * 60, 1, B, i);
    naamBij(ctx, 'bacteriën', 'bv. longontsteking', 360, 470, q.on('longontsteking', 1), 'center'); afweercel(ctx, 700, 360, 70, q.on('afweersysteem', 1), t, q.on('heftig', 1));
    metaA(ctx, 'BLOEDVAT', 1020, 270, 1, C.grain, 'left', 22); vat(ctx, 1020, 400, 760, 1, q.on('wijd', 1, 1.5), q.on('lekken', 1, 1.5), t); chip(ctx, 'wijd open', 1400, 560, C.goud, q.on('wijd', 1), 26); chip(ctx, 'lekt', 1640, 560, C.teal, q.on('lekken', 1), 26);
    chip(ctx, 'het bloed is er nog, maar de druk zakt', 1400, 660, C.koraal, q.on('zakt', 1), 26); vraagteken(ctx, 960, 800, q.on('denk', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); regel(ctx, 'meerdere regelkringen falen tegelijk', 960, 260, q.on('meerdere', 1), C.goud, 40, 'center', 800);
    orgaan(ctx, 'nier', 520, 460, 1.2, 1, q.on('urine', 1)); regel(ctx, 'nieren: geen urine', 520, 620, q.on('urine', 1), C.text, 28, 'center', 700);
    orgaan(ctx, 'long', 960, 460, 1.2, 1, q.on('longen', 1)); regel(ctx, 'longen: minder zuurstof', 960, 620, q.on('longen', 1), C.text, 28, 'center', 700);
    brein(ctx, 1400, 460, 0.42, 1); if (q.on('verward', 1) > 0.01) vlek(ctx, 1400, 440, 70, C.koraal, q.on('verward', 1) * 0.6, t, 0); regel(ctx, 'hersenen: verward', 1400, 620, q.on('verward', 1), C.text, 28, 'center', 700);
    tag(ctx, 'elk uur telt: snel antibiotica en vocht', 960, 760, C.koraal, q.on('telt', 1), 'center', 32); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const IC = q.on('intensive', 1, 0.8);
    if (IC < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - IC; metaA(ctx, 'OPERATIEKAMER', 160, 220, 1, C.grain, 'left', 26); ctx.fillStyle = '#E8E8E2'; for (let i = 0; i < 3; i++) circ(ctx, 760 + i * 200, 280, 50, rgba('#F2F2D8', 0.85)); infuus(ctx, 1400, 760, q.on('bloed', 1), '#B23A3A', 'bloed'); chip(ctx, 'bloeding gestopt', 860, 500, C.groen, q.on('gestopt', 1), 30); ctx.restore(); }
    if (IC > 0.01) { ctx.save(); ctx.globalAlpha *= IC; metaA(ctx, 'INTENSIVE CARE', 160, 220, 1, C.grain, 'left', 26); bed(ctx, 760, 720, 1, t, 'bilal');
      monitor(ctx, 1180, 230, 420, 220, q.on('slangetje', 1), t, 96, '98/60', q.on('vernauwt', 1) > 0.5 ? C.groen : C.koraal); infuus(ctx, 330, 700, q.on('vernauwt', 1), C.paars, 'vaatvernauwer');
      chip(ctx, 'bloeddruk bij elke hartslag', 1390, 500, C.teal, q.on('slangetje', 1), 24); chip(ctx, 'beademing', 1260, 590, C.teal, q.on('beademingsapparaat', 1), 26); chip(ctx, 'nierapparaat', 1520, 590, C.teal, q.on('nierapparaat', 1), 26);
      persoon(ctx, 'kim', 1760, 880, 450, { t, a: q.on('intensivist', 1, 0.3), kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'intensivist', 1700, 330, q.on('intensivist', 1), 'center');
      tag(ctx, 'meten → bijsturen: zelf een regelkring', 1240, 820, C.goud, q.on('regelkring', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 420, 880, 450, { t, uit: 'blij', kijk: 1 }); monitor(ctx, 760, 260, 560, 260, 1, t, 125, '112/76', C.groen); chip(ctx, 'normale bloeddruk ≠ alles goed', 1040, 600, C.goud, q.on('normale', 1), 30); chip(ctx, 'het lichaam compenseerde hard', 1040, 700, C.koraal, q.on('compenseerde', 1), 28); },
  s13(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'geneeskunde · 6 jaar', 960, 260, C.teal, q.on('Geneeskunde', 1), 'center', 36); tag(ctx, 'anesthesioloog of internist', 960, 400, C.goud, q.on('anesthesioloog', 1), 'center', 30); tag(ctx, 'intensivist · + 2 jaar', 960, 520, C.goud, q.on('intensivist', 1), 'center', 30);
    persoon(ctx, 'kim', 1500, 880, 400, { t, uit: 'blij', kijk: -1 }); }
});
