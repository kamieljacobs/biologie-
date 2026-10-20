// Wat word jij? · Psychologie 4 · Meten wat je niet kunt zien — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Lotte, Dr. Kim).
// Rode draad: het meetbord ZEGGEN · DOEN · LICHAAM.

const MB_KOL = [['ZEGGEN', C.teal], ['DOEN', C.groen], ['LICHAAM', C.koraal]];
function meetBord(ctx, x, y, s, items, a = 1, hi = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  MB_KOL.forEach(([k, col], i) => { const xx = i * 300; roundRect(ctx, xx, 0, 280, 360, 16); shape(ctx, rgba(C.fill, hi === i ? 0.95 : 0.7), hi === i ? col : rgba(C.line, 0.6), hi === i ? 2.5 : 1.5); text(ctx, k, xx + 140, 50, fMeta(28), col, 'center');
    (items[i] || []).forEach(([t2, a2], j) => { if (a2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= a2; roundRect(ctx, xx + 20, 80 + j * 80, 240, 60, 10); shape(ctx, rgba(col, 0.18), col, 1.5); text(ctx, t2, xx + 140, 120 + j * 80, fTekst(26, 700), C.text, 'center'); ctx.restore(); }); });
  ctx.restore(); }
function hartslagGrafiek(ctx, x, y, w, h, a = 1, u = 1, piek = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 1); metaText(ctx, 'HARTSLAG', x + 20, y + 40, C.koraal, 'left', 28);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); const N = 160; for (let i = 0; i <= N * u; i++) { const f = i / N; const base = 0.35 + piek * 0.4 * clamp((f - 0.55) * 5, 0, 1); const v = base + Math.max(0, Math.sin(f * 80)) ** 8 * 0.25; const px = x + 20 + f * (w - 40), py = y + h - 20 - v * (h - 70); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
function polsband(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26 * s, y - 14 * s, 52 * s, 28 * s, 8); shape(ctx, '#2A2F3E', '#AFC0D0', 1.5); circ(ctx, x, y, 6 * s, rgba(C.koraal, 0.6 + 0.4 * Math.sin(t * 7))); ctx.restore(); }
function looplijn(ctx, x, y, w, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 6; i++) { const xx = x + i * w / 6; roundRect(ctx, xx, y, w / 6 - 10, 18, 6); shape(ctx, i < k ? rgba(C.groen, 0.7) : '#3A4458', null); metaText(ctx, String(i + 1), xx + w / 12 - 5, y + 50, i < k ? C.groen : C.grain, 'center', 28); } ctx.restore(); }
function vraagKaartje(ctx, x, y, w, tekst, a = 1, stempelT = '', stCol = C.koraal, goed = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 90, 12); shape(ctx, '#F2EEE4', goed ? C.groen : '#B8B0A0', goed ? 3 : 2); ctx.font = fTekst(28, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, tekst, x + 20, y + 38, w - 40, 32); ctx.restore(); if (stempelT) stempel(ctx, x + w - 90, y + 70, stempelT, stCol, a); }
function schaal15(ctx, x, y, a = 1, kies = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { circ(ctx, x + i * 110, y, 30, i === kies ? C.teal : '#2A3A58', C.teal, 2); text(ctx, String(i + 1), x + i * 110, y + 10, fTekst(28, 700), i === kies ? '#121A26' : C.text, 'center'); } metaText(ctx, 'NOOIT', x, y + 70, C.grain, 'center', 28); metaText(ctx, 'HEEL VAAK', x + 440, y + 70, C.grain, 'center', 28); ctx.restore(); }
function weegschaal(ctx, x, y, s, a = 1, getal = '72') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -30, 220, 60, 14); shape(ctx, '#AFC0D0', '#D4D8DE', 2); roundRect(ctx, -50, -22, 100, 40, 6); shape(ctx, '#121A26', null); text(ctx, getal, 0, 10, fTekst(30, 700), C.groen, 'center'); ctx.restore(); }
function schijf(ctx, x, y, r, a = 1, pijlen = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [1, 0.7, 0.4, 0.15].forEach((f, i) => circ(ctx, x, y, r * f, i % 2 ? '#F2EEE4' : C.koraal, null)); pijlen.forEach(([dx, dy]) => { circ(ctx, x + dx * r, y + dy * r, 7, '#1A2740', '#F2F2EE', 2); }); ctx.restore(); }
function kleurWoord(ctx, x, y, woord, kleur, a = 1, px = 64) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, woord, x, y, fTekst(px, 800), kleur, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { meetBord(ctx, 1080, 470, 0.8, [[['vragenlijst', 1]], [['gedragstest', 1]], [['hartslag', 1]]], 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'lotte', 480, 880, 560, { t, uit: q.on('schiet', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Lotte', 'proefpersoon', 660, 330, q.on('Lotte', 1)); polsband(ctx, 400, 610, 1.2, q.on('hartslagmeter', 1), t);
    persoon(ctx, 'kim', 980, 880, 600, { a: q.on('Kim', 1), t, pose: 'vasthouden', kijk: -1 }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1060, 280, q.on('Kim', 1));
    const P = q.on('pot', 1); if (P > 0.01) { ctx.fillStyle = '#5A4632'; roundRect(ctx, 620, 720, 260, 24, 6); ctx.fill(); pot(ctx, 750, 718, 0.9, P); spin(ctx, 750, 660, 0.8, P, t); }
    hartslagGrafiek(ctx, 1240, 300, 560, 300, q.on('hartslag', 1), clamp((t - q.at('hartslag', 1)) / 2.5, 0, 1), q.on('schiet', 1)); vraagteken(ctx, 1520, 700, q.on('bewijs', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('operationaliseren', 1, 0.8);
    regel(ctx, 'Antwoord b: er gebeurt iets, maar niet wat', 120, 140, 1, C.groen, 40, 'left', 700);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; ['schrik', 'opwinding', 'trap op'].forEach((w, i) => chip(ctx, w, 400 + i * 260, 300, C.koraal, q.on(['schrik', 'opwinding', 'trap'][i], 1), 32)); hartslagGrafiek(ctx, 400, 380, 900, 260, 1, 1, 1, t); tag(ctx, 'angst niet direct te zien of te wegen', 850, 720, C.text2, q.on('wegen', 1), 'center', 32); ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; wolk(ctx, 960, 330, 340, 140, 'ANGST', 1, '#F2F2EE', 44); regel(ctx, 'operationaliseren: van begrip naar iets wat je kunt tellen', 960, 210, 1, C.goud, 36, 'center', 700);
      MB_KOL.forEach(([k, col], i) => { const a = q.on(['zegt', 'doet', 'lichaam'][i], 1); pijl(ctx, 960, 420, 520 + i * 440, 640, col, a, 4, 18); tag(ctx, k.toLowerCase(), 520 + i * 440, 700, col, a, 'center', 36); }); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const E = q.on('Elke', 1, 0.8);
    meetBord(ctx, 510, 160, 1, [[['vragen', q.on('vragen', 1)]], [['hoe dichtbij?', q.on('dichtbij', 1)]], [['hartslag', q.on('hartslag', 1)], ['zweet', q.on('zweet', 1)]]], 1 - E, E > 0.5 ? -1 : (q.on('lichaam', 1) > 0.5 ? 2 : q.on('gedragstest', 1) > 0.5 ? 1 : 0));
    const L = q.on('loopt', 1) * (1 - E); if (L > 0.01) { looplijn(ctx, 560, 600, 800, Math.floor(clamp((t - q.at('loopt', 1)) * 1.2, 0, 4)), L); pot(ctx, 1420, 640, 0.6, L); spin(ctx, 1420, 600, 0.5, L, t); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; persoon(ctx, 'lotte', 400, 880, 520, { t, uit: 'neutraal' }); bubbel(ctx, 640, 420, 'valt wel mee', '#F2F2EE', q.on('meevalt', 1), 32); roundRect(ctx, 260, 360, 30, 520, 6); shape(ctx, '#8A6A44', null); tag(ctx, 'blijft bij de deur', 420, 300, C.groen, q.on('deur', 1), 'center', 28);
      tag(ctx, 'de drie wegen lopen vaak niet gelijk op', 1240, 420, C.goud, q.on('gelijk', 1), 'center', 32); tag(ctx, 'zo werkt angst', 1240, 500, C.text2, q.on('werkt', 1), 'center', 30); meetBord(ctx, 900, 560, 0.6, [[['vragen', 1]], [['hoe dichtbij?', 1]], [['hartslag', 1]]], q.on('meetbord', 1)); ctx.restore(); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); meetBord(ctx, 1140, 160, 0.6, [[['vragen', 1]], [], []], 1, 0);
    regel(ctx, 'één verkeerd woord, en je meet iets anders', 120, 160, q.on('woord', 1), C.text, 36, 'left', 700);
    ['Ben je bang voor spinnen en slangen?', 'Heb je vaak last van spinnen?', 'Hoeveel dagen liep je vorige week weg voor een spin?'].forEach((s2, i) => vraagKaartje(ctx, 160, 300 + i * 130, 860, (['a', 'b', 'c'][i]) + '. ' + s2, q.on('best', 1))); },
  s08(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('schaal', 1, 0.8), T = q.on('tien', 1, 0.8), W = q.on('valkuil', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S; regel(ctx, 'Antwoord c', 120, 140, 1, C.groen, 40, 'left', 700);
      vraagKaartje(ctx, 160, 220, 860, 'a. Ben je bang voor spinnen en slangen?', 1, q.on('dubbele', 1) > 0.5 ? 'DUBBEL' : ''); vraagKaartje(ctx, 160, 350, 860, 'b. Heb je vaak last van spinnen?', 1, q.on('vaag', 1) > 0.5 ? 'VAAG' : ''); vraagKaartje(ctx, 160, 480, 860, 'c. Hoeveel dagen liep je vorige week weg voor een spin?', 1, '', C.groen, q.on('periode', 1) > 0.5);
      const st = q.on('sturende', 1); if (st > 0.01) vraagKaartje(ctx, 1080, 640, 680, 'Je bent toch ook bang voor spinnen?', st, 'STUREND'); ctx.restore(); }
    if (S * (1 - T) > 0.01) { ctx.save(); ctx.globalAlpha *= S * (1 - T); regel(ctx, 'vaste schaal', 960, 240, 1, C.text, 40, 'center', 700); schaal15(ctx, 740, 420, 1, Math.floor((t * 0.8) % 5)); ctx.restore(); }
    if (T * (1 - W) > 0.01) { ctx.save(); ctx.globalAlpha *= T * (1 - W); for (let i = 0; i < 10; i++) { const v = 2 + Math.round(hash(i + 3) * 2) + (i === 4 ? 2 : 0); roundRect(ctx, 300 + i * 80, 600 - v * 60, 50, v * 60, 8); shape(ctx, rgba(C.teal, i === 4 ? 0.3 : 0.6), i === 4 ? C.koraal : C.teal, 1.5); } tag(ctx, 'één vraag valt scheef uit', 600, 680, C.koraal, q.on('scheef', 1), 'center', 30); tag(ctx, 'opgeteld: toevallige fouten vallen weg', 600, 760, C.groen, q.on('weg', 1), 'center', 32); ['vermijden', 'piekeren', 'schrikken'].forEach((w, i) => chip(ctx, w, 1400, 320 + i * 90, C.teal, q.on(w, 1), 32)); ctx.restore(); }
    if (W > 0.01) { ctx.save(); ctx.globalAlpha *= W; regel(ctx, 'sociaal wenselijk antwoorden', 960, 260, 1, C.koraal, 44, 'center', 700); bubbel(ctx, 960, 420, 'nee hoor, valt wel mee', '#F2F2EE', 1, 34); chip(ctx, 'anoniem invullen helpt', 700, 620, C.groen, q.on('Anoniem', 1), 32); chip(ctx, 'vraag naar concreet gedrag', 1220, 620, C.groen, q.on('concreet', 1), 32); ctx.restore(); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'betrouwbaar', 520, 260, q.on('Betrouwbaar', 1), C.teal, 48, 'center', 700); regel(ctx, 'opnieuw meten → ongeveer hetzelfde', 520, 330, q.on('opnieuw', 1), C.text, 30, 'center', 700);
    regel(ctx, 'valide', 1400, 260, q.on('Valide', 1), C.groen, 48, 'center', 700); regel(ctx, 'je meet wat je wilt meten', 1400, 330, q.on('echt', 1), C.text, 30, 'center', 700);
    const W = q.on('weegschaal', 1); weegschaal(ctx, 960, 620, 1.6, W, (72 + 2) + ' kg'); tag(ctx, 'echt: 72 kg · steeds +2', 960, 760, C.koraal, q.on('twee', 1), 'center', 30); },
  s11(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord a: betrouwbaar, niet valide', 120, 140, 1, C.groen, 40, 'left', 700);
    weegschaal(ctx, 420, 420, 1.4, 1, '74 kg'); weegschaal(ctx, 420, 560, 1.4, 1, '74 kg'); vink_(ctx, 700, 490, 34, q.on('betrouwbaar', 1), C.teal); kruis(ctx, 760, 490, 30, q.on('valide', 1), C.koraal);
    const P = q.on('pijlen', 1); schijf(ctx, 1300, 460, 170, P, [[0.55, -0.45], [0.6, -0.38], [0.5, -0.5], [0.62, -0.5]]); tag(ctx, 'dicht bij elkaar, naast de roos', 1300, 690, C.text, P, 'center', 30);
    haak(ctx, 1100, 1500, 760, 'betrouwbaar is nodig, niet genoeg', C.goud, q.on('genoeg', 1)); },
  s12(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('validiteit', 1, 0.8);
    regel(ctx, 'betrouwbaarheid', 500, 200, 1, C.teal, 40, 'center', 700); metaText(ctx, 'TEST  ·  TWEE WEKEN LATER', 500, 260, C.grain, 'center', 28);
    const tw = q.on('twee', 1); for (let i = 0; i < 8; i++) { const v = hash(i * 3 + 1); circ(ctx, 300 + i * 50, 320 + (1 - v) * 220, 9, C.teal); circ(ctx, 300 + i * 50, 320 + (1 - v) * 220 + (hash(i + 50) - 0.5) * 30, 9, rgba(C.oker, tw), null); }
    tag(ctx, 'scores lijken op elkaar', 500, 600, C.teal, q.on('Lijken', 1), 'center', 28); tag(ctx, 'hoog op de ene vraag → hoog op de andere', 500, 680, C.text2, q.on('andere', 1), 'center', 28);
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; regel(ctx, 'validiteit', 1400, 200, 1, C.groen, 40, 'center', 700); roundRect(ctx, 1120, 280, 260, 200, 14); shape(ctx, rgba(C.teal, 0.15), C.teal, 2); text(ctx, 'angstlijst', 1250, 360, fTekst(28, 700), C.text, 'center'); text(ctx, 'score: hoog', 1250, 410, fTekst(28, 700), C.teal, 'center');
      pijl(ctx, 1390, 380, 1450, 380, C.goud, q.on('spin', 1), 3, 14); looplijn(ctx, 1460, 360, 300, 1, q.on('spin', 1)); tag(ctx, 'blijft ver van de spin', 1600, 460, C.groen, q.on('spin', 1), 'center', 28); regel(ctx, 'dan meet je lijst waarschijnlijk echt angst', 1400, 600, q.on('waarschijnlijk', 1), C.groen, 30, 'center', 700); ctx.restore(); } },

  // ---------- H4 ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); chip(ctx, 'IAT · impliciete associatietest', 960, 200, C.teal, q.on('test', 1), 32);
    const tw = q.on('twee', 1); regel(ctx, 'jij, vandaag: 70', 600, 420, q.on('zeventig', 1), C.text, 44, 'center', 700); regel(ctx, 'jij, over twee weken: 45', 1320, 420, q.on('vijfenveertig', 1), C.text, 44, 'center', 700); pijl(ctx, 820, 410, 1080, 410, C.koraal, q.on('vijfenveertig', 1), 4, 18);
    vraagteken(ctx, 960, 650, q.on('bruikbaar', 1), 110); },
  s15(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord b: voor een grote groep', 120, 140, 1, C.groen, 40, 'left', 700);
    const G = q.on('honderd', 1); for (let i = 0; i < 100; i++) { const jit = (hash(i * 7 + Math.floor(t * 2)) - 0.5) * 20; circ(ctx, 220 + (i % 20) * 30, 300 + Math.floor(i / 20) * 40 + jit * 0.2, 7, rgba(C.teal, 0.7 * G)); } ctx.save(); ctx.globalAlpha *= G; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(200, 560); ctx.lineTo(800, 560); ctx.stroke(); ctx.restore(); tag(ctx, 'gemiddelde ligt vast', 500, 620, C.goud, q.on('vast', 1), 'center', 30);
    const P = q.on('persoon', 1); if (P > 0.01) { persoon(ctx, 'lotte', 1350, 860, 440, { a: P, t }); const sc = 45 + Math.round(25 * (0.5 + 0.5 * Math.sin(t * 2.5))); regel(ctx, String(sc), 1350, 360, P, C.koraal, 64, 'center', 700); tag(ctx, 'de fout blijft in jouw score', 1350, 260, C.koraal, q.on('zitten', 1), 'center', 30); }
    chip(ctx, 'twee keer meten helpt een beetje', 960, 800, C.text2, q.on('beetje', 1), 28); },

  // ---------- H5 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Lotte', 2, 0.8), Z = q.on('Elke', 1, 0.8), A = 1 - L;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; metaText(ctx, 'STROOP · 1935', 120, 160, C.grain, 'left', 30);
      const W = q.on('rood', 1); kleurWoord(ctx, 960, 380, 'ROOD', C.teal, W, 110); const P = q.on('Probeer', 1); [['GROEN', C.koraal], ['BLAUW', C.groen], ['GEEL', C.paars], ['ROOD', C.teal]].forEach(([w, c], i) => kleurWoord(ctx, 560 + i * 260, 560, w, c, P, 64));
      tag(ctx, 'zeg de kleur van de letters', 960, 230, C.goud, q.on('kleur', 1), 'center', 32); regel(ctx, '± driekwart langer', 960, 720, q.on('driekwart', 1), C.koraal, 44, 'center', 700); ctx.restore(); }
    if (L * (1 - Z) > 0.01) { ctx.save(); ctx.globalAlpha *= L * (1 - Z); persoon(ctx, 'lotte', 300, 880, 520, { t }); [['WEB', C.groen], ['POTEN', C.koraal], ['SPIN', C.teal]].forEach(([w, c], i) => kleurWoord(ctx, 800 + i * 280, 300, w, c, q.on('web', 1), 70)); [['TAFEL', C.koraal], ['BOEK', C.groen], ['LAMP', C.teal]].forEach(([w, c], i) => kleurWoord(ctx, 800 + i * 280, 440, w, c, q.on('gewone', 1), 70));
      hoogteBalkMe(ctx, 700, 560, 800, 0.75, C.koraal, 'spinnenwoorden', q.on('trager', 1)); hoogteBalkMe(ctx, 700, 660, 800, 0.6, C.teal, 'gewone woorden', q.on('trager', 1)); tag(ctx, 'een verklaring: aandacht blijft hangen', 1100, 790, C.text2, q.on('verklaring', 1), 'center', 28); ctx.restore();
      meetBord(ctx, 1260, 120, 0.45, [[['vragen', 1]], [['gedragstest', 1], ['tijdmeting', q.on('doen', 1)]], [['hartslag', 1]]], L * (1 - Z) * q.on('meetbord', 1), 1); }
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; meetBord(ctx, 510, 170, 1, [[['vragenlijst', 1], ['mooier voordoen', q.on('vragenlijst', 1)]], [['gedragstest', 1], ['kost tijd, echte spin', q.on('gedragstest', 1)], ['tijdmeting', 1], ['per persoon wankel', q.on('wankel', 1)]], [['hartslag · zweet', 1], ['reageert op meer', q.on('andere', 1)]]], 1); haak(ctx, 520, 1400, 590, 'samen het beste beeld', C.goud, q.on('beeld', 1)); ctx.restore(); } },

  // ---------- Recap ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vak', 1, 0.8);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; persoon(ctx, 'lotte', 420, 880, 540, { t }); polsband(ctx, 340, 610, 1.2, 1, t); meetBord(ctx, 800, 220, 0.8, [[['wat ze zegt', q.on('zegt', 1)]], [['wat ze doet', q.on('doet', 1)]], [['hartslag', 1]]], 1); ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; regel(ctx, 'de psycholoog als onderzoeker', 960, 200, 1, C.goud, 44, 'center', 700);
      [['begrip operationaliseren', 'operationaliseert'], ['heldere vragen', 'heldere'], ['betrouwbaar en valide?', 'betrouwbaar'], ['wat kan je meting niet?', 'niet']].forEach(([s2, w], i) => chip(ctx, s2, 960, 320 + i * 90, C.groen, q.on(w, w === 'niet' ? 2 : 1), 34)); chip(ctx, 'studie psychologie: methodeleer en testtheorie', 960, 720, C.teal, q.on('testtheorie', 1), 30); ctx.restore(); } }
});
function hoogteBalkMe(ctx, x, y, w, v, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); roundRect(ctx, x, y, w * v, 40, 10); shape(ctx, rgba(col, 0.8), col, 1.5); text(ctx, label, x + 16, y + 29, fTekst(26, 700), '#121A26', 'left'); metaText(ctx, 'TIJD', x + w + 50, y + 30, C.grain, 'left', 28); ctx.restore(); }
