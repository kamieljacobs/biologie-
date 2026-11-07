// Wat word jij? · Verloskunde 5 · De kraamweek — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra in kraamkleding, baby Lina).
// Rode draad: de eerste week en de nacontrole van Esra en Lina.

function kraamkamer(ctx, a = 1, raam = true) { if (a <= 0.01) return; vkA(ctx, a); ctx.fillStyle = rgba('#000000', 0.18); ctx.fillRect(0, 880, W, 200); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(W, 880); ctx.stroke();
  if (raam) { roundRect(ctx, 1460, 150, 340, 300, 10); shape(ctx, rgba(C.teal, 0.12), rgba(C.line, 0.6), 3); ctx.strokeStyle = rgba(C.line, 0.45); ctx.beginPath(); ctx.moveTo(1630, 150); ctx.lineTo(1630, 450); ctx.stroke(); }
  // wieg
  ctx.fillStyle = '#C9A882'; roundRect(ctx, 120, 700, 300, 110, 30); ctx.fill(); ctx.fillStyle = '#A88A68'; ctx.fillRect(150, 810, 14, 70); ctx.fillRect(376, 810, 14, 70); ctx.restore(); }
function kraam(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; kraamkamer(ctx, 1, !o.zonderRaam);
  if (o.mirjam !== false) persoon(ctx, 'mirjam', o.mx || 760, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan' });
  persoon(ctx, 'esra', o.ex || 1200, 880, 455, { t, kijk: -1, uit: o.uitE || 'blij', pose: o.poseE || 'staan', outfit: 'kraam', zwanger: 0 });
  if (o.lina !== false) persoon(ctx, 'baby', (o.ex || 1200) - 20, 575, 170, { t, uit: o.uitL || 'slaapt' }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { borstDoorsnede(ctx, 1380, 560, 0.85, 1, { melk: 0.8, knijp: 0.5 + 0.5 * Math.sin(t), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); kraam(ctx, t, { mirjam: false, ex: 1000, uitE: q.on('merkt', 1) > 0.5 ? 'verbaasd' : 'blij', uitL: q.on('huilen', 1) > 0.5 ? 'huilt' : 'slaapt' });
    naamBij(ctx, 'Lina', '5 dagen oud', 1110, 520, q.on('Lina', 1), 'left', C.goud); tag(ctx, 'honger', 980, 440, C.koraal, q.on('honger', 1), 'center', 28);
    for (let i = 0; i < 3; i++) { const f = (t * 0.6 + i / 3) % 1; circ(ctx, 1030 + i * 14, 640 + f * 60, 7, rgba(VK.melk, q.on('melk', 1) * (1 - f))); } tag(ctx, 'er loopt al melk', 1400, 620, C.goud, q.on('melk', 1), 'center', 28);
    vraagteken(ctx, 1500, 380, q.on('denk', 1), 110); },

  // ---------- H1 Borstvoeding ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b'); const kn = q.on('samentrekken', 1) * (0.5 + 0.5 * Math.sin(t * 3));
    borstDoorsnede(ctx, 560, 520, 0.95, 1, { melk: 0.85, knijp: kn, t }); naamBij(ctx, 'melkklierblaasjes', '', 300, 220, q.on('blaasjes', 1), 'left', VK.melk); naamBij(ctx, 'spiercellen eromheen', '', 300, 860, q.on('spiercellen', 1), 'left', C.koraal);
    brein(ctx, 1380, 300, 0.5, q.on('hersenen', 1), { t }); naamBij(ctx, 'hypofyse', 'geeft oxytocine af', 1380, 480, q.on('hypofyse', 1), 'center', C.paars); pijl(ctx, 1280, 420, 880, 480, C.paars, q.on('oxytocine', 1), 5, 18);
    regel(ctx, 'toeschietreflex', 1380, 620, q.on('toeschietreflex', 1), C.goud, 44, 'center', 800); tag(ctx, 'leert: huilen is genoeg', 1380, 700, C.teal, q.on('leert', 1), 'center', 28); tag(ctx, 'stress remt', 1380, 780, C.koraal, q.on('Stress', 1), 'center', 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('zwangerschap', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; brein(ctx, 520, 360, 0.5, 1, { t }); naamBij(ctx, 'prolactine', 'maakt melk', 520, 540, q.on('prolactine', 1), 'center', C.goud);
      borstDoorsnede(ctx, 1300, 520, 0.7, 1, { melk: 0.3 + 0.6 * q.on('meer', 1, 3), t }); tag(ctx, 'vaker drinken → meer prolactine → meer melk', 960, 820, C.groen, q.on('vaker', 1), 'center', 30); tag(ctx, 'vraag en aanbod', 960, 160, C.goud, q.on('aanbod', 1), 'center', 32); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'esra', 600, 880, 470, { t, kijk: 1, uit: 'denkt', pose: 'denk', zwanger: 0.85 }); tag(ctx, 'al veel prolactine', 1250, 330, C.goud, 1, 'center', 30); tag(ctx, 'toch pas melk na de geboorte', 1250, 420, C.text, q.on('pas', 1), 'center', 30); vraagteken(ctx, 1250, 640, q.on('denk', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord a'); const B = q.on('eerste', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; hormoonGrafiek(ctx, 360, 300, 1100, 380, 1, { u: clamp((t - q.at('placenta', 1)) / 3, 0, 1), lijnen: [['progesteron', C.paars, x => x < 0.45 ? 0.25 + x * 1.4 : Math.max(0.04, 0.88 - (x - 0.45) * 12)], ['prolactine', C.goud, x => x < 0.45 ? 0.35 + x : 0.8]] });
      tag(ctx, 'de rem valt weg', 1300, 220, C.groen, q.on('daalt', 1), 'center', 30); tag(ctx, 'melk komt op gang', 1300, 800, C.goud, q.on('gang', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'colostrum', 960, 200, q.on('colostrum', 1), C.goud, 52, 'center', 800); tag(ctx, 'weinig, dik en geel, vol antistoffen', 960, 270, C.text2, q.on('antistoffen', 1), 'center', 28);
      vkA(ctx, 1); roundRect(ctx, 260, 460, 1400, 200, 40); shape(ctx, rgba(VK.spier, 0.3), VK.spier, 3); ctx.restore(); naamBij(ctx, 'darmwand van Lina', '', 280, 720, q.on('darm', 1));
      for (let i = 0; i < 9; i++) { const x = 340 + i * 150; ctx.save(); ctx.globalAlpha *= q.on('bedekken', 1); ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, 460); ctx.lineTo(x, 420); ctx.moveTo(x, 420); ctx.lineTo(x - 18, 396); ctx.moveTo(x, 420); ctx.lineTo(x + 18, 396); ctx.stroke(); ctx.restore(); }
      for (let i = 0; i < 4; i++) bacterie(ctx, 420 + i * 340, 380, 0.7, 0.3, 1, C.koraal, q.on('vangen', 1) * 0.6); tag(ctx, 'niet opgenomen in het bloed', 960, 860, C.text2, q.on('opgenomen', 1), 'center', 26); ctx.restore(); } },

  // ---------- H2 De baarmoeder krimpt ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const k = clamp((t - q.at('zakt', 1)) / 6, 0, 1);
    persoon(ctx, 'esra', 960, 880, 640, { t, kijk: 1, uit: 'blij', outfit: 'kraam', zwanger: 0 }); vkA(ctx, 1); ctx.beginPath(); ctx.ellipse(960, 625 + 40 * k, 92 * (1 - 0.55 * k), 72 * (1 - 0.55 * k), 0, 0, 6.283); shape(ctx, rgba(VK.spier, 0.85), VK.spierD, 3); ctx.restore();
    naamBij(ctx, 'baarmoeder', 'kijkje in de buik', 1090, 630 + 40 * k, 1, 'left', VK.spier); tag(ctx, '± 1 kilo', 600, 300, C.text2, q.on('kilo', 1), 'center', 30); tag(ctx, 'dag 1: tot de navel', 600, 380, C.text2, q.on('navel', 1), 'center', 28);
    tag(ctx, 'na 6 weken: zo klein als een peer', 1400, 300, C.groen, q.on('peer', 1), 'center', 30); tag(ctx, 'naweeën bij het voeden: oxytocine', 1400, 760, C.paars, q.on('naweeën', 1), 'center', 28); },

  s09(ctx, t, q) { bg(ctx, 'schema'); kraam(ctx, t, { mx: 700, uitM: 'blij', zonderRaam: true });
    vkKaart(ctx, 90, 110, 600, 300, 'Kraamverzorgende', [['meerdere uren per dag', 'uren'], ['voelt de baarmoeder', 'voelt'], ['meet de temperatuur', 'temperatuur'], ['helpt met voeden', 'helpt']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.teal, q.on('kraamverzorgende', 1));
    vkKaart(ctx, 1230, 110, 600, 300, 'Mirjam', [['eindverantwoordelijk', 'eindverantwoordelijkheid'], ['koorts', 'koorts'], ['bloedverlies', 'bloedverlies'], ['bloeddruk', 'bloeddruk']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.goud, q.on('langs', 1));
    tag(ctx, 'pre-eclampsie kan ook nog na de bevalling', 1500, 470, C.koraal, q.on('pre-eclampsie', 1), 'center', 28); },

  // ---------- H3 De eerste testen ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'baby', 620, 600, 460, { t, uit: 'neutraal' }); const d = q.on('druppels', 1);
    for (let i = 0; i < 3; i++) circ(ctx, 860 + i * 20, 640 + i * 26 * d, 9, rgba(VK.bloedM, d)); vkA(ctx, d); roundRect(ctx, 1150, 380, 460, 300, 12); shape(ctx, '#F2F2EE', '#C8D0D8', 2); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(1230 + i * 75, 560, 28, 0, 6.283); ctx.strokeStyle = '#B8C2CC'; ctx.lineWidth = 3; ctx.stroke(); if (i < 4) circ(ctx, 1230 + i * 75, 560, 24, rgba(VK.bloedM, 0.8)); } text(ctx, 'hielprikkaart', 1380, 450, fTekst(28, 800), '#2A3446', 'center'); ctx.restore();
    naamBij(ctx, 'hielprik', 'in de eerste week', 620, 260, q.on('hielprik', 1), 'center'); tag(ctx, 'zeldzame aandoeningen: vroeg erbij = iets doen', 1380, 760, C.groen, q.on('vroeg', 1), 'center', 26); tag(ctx, 'film: Wat heb jij aan DNA?', 1380, 300, C.teal, q.on('film', 1), 'center', 26); },

  s11(ctx, t, q) { bg(ctx, 'schema'); oorTest(ctx, 1000, 480, 1.2, 1, { t, echo: q.on('echo', 1) }); naamBij(ctx, 'gehoortest', 'met een dopje in het oor', 240, 230, q.on('gehoortest', 1));
    tag(ctx, 'zachte tikjes erin', 560, 720, C.teal, q.on('tikjes', 1), 'center', 28); tag(ctx, 'haarcellen versterken actief', 1280, 720, C.goud, q.on('haarcellen', 1), 'center', 28); tag(ctx, 'zwakke echo terug', 960, 790, C.goud, q.on('meet', 1), 'center', 28);
    tag(ctx, 'niets terug? tweede test', 960, 160, C.text2, q.on('tweede', 1), 'center', 26); tag(ctx, 'slechthorend vroeg ontdekt, vóór het praten', 960, 860, C.groen, q.on('slechthorendheid', 1), 'center', 26); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const g = q.on('tweehonderd', 1); weegschaal(ctx, 960, 620, 1.2, 1, 3400 - 200 * g); persoon(ctx, 'baby', 960, 600, 300, { t, uit: 'neutraal' });
    tag(ctx, 'geboorte: 3400 g', 600, 300, C.text2, q.on('drieduizend', 1), 'center', 30); tag(ctx, 'dag 3: 3200 g', 1320, 300, C.koraal, g, 'center', 30); vraagteken(ctx, 960, 260, q.on('denk', 1), 100); },

  // ---------- H4 Hoe gaat het met jou? ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); weegschaal(ctx, 560, 620, 1, 1, 3200); persoon(ctx, 'baby', 560, 600, 260, { t, uit: 'slaapt' }); regel(ctx, '− 6 %', 560, 420, q.on('procent', 1), C.goud, 60, 'center', 800);
    tag(ctx, 'verliest vocht, drinkt nog weinig', 1350, 330, C.text2, q.on('vocht', 1), 'center', 28); tag(ctx, 'tot ± 10 % is normaal', 1350, 420, C.groen, q.on('procent', 1), 'center', 30); tag(ctx, 'na 10 dagen à 2 weken: terug op geboortegewicht', 1350, 520, C.teal, q.on('geboortegewicht', 1), 'center', 26); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('ongeveer', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; kraam(ctx, t, { mirjam: false, ex: 520, uitE: 'huilt' }); hormoonGrafiek(ctx, 900, 300, 820, 300, q.on('hormonen', 1), { lijnen: [['hormonen', C.paars, x => x < 0.45 ? 0.3 + x * 1.3 : Math.max(0.06, 0.88 - (x - 0.45) * 10)]] });
      vkKaart(ctx, 980, 700, 640, 170, 'Kraamtranen', [['meer dan de helft · gaat vanzelf over', 'helft']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.teal, q.on('kraamtranen', 1)); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; vkKaart(ctx, 160, 200, 760, 300, 'Kraamtranen', ['tot twee weken', 'meer dan de helft van de moeders', 'gaat vanzelf over'], C.teal, 1);
      vkKaart(ctx, 1000, 200, 760, 300, 'Postnatale depressie', ['weken', '± 1 op de 10 moeders', 'plezier verdwijnt · hulp nodig'].slice(0, 1 + (q.on('weken', 1) > 0.5) + (q.on('plezier', 1) > 0.5)), C.koraal, 1);
      persoon(ctx, 'mirjam', 700, 880, 340, { t, kijk: 1, uit: 'praat', a: q.on('vraagt', 1, 0.3) }); persoon(ctx, 'esra', 1000, 880, 330, { t, kijk: -1, uit: 'neutraal', outfit: 'kraam', zwanger: 0, a: q.on('vraagt', 1, 0.3) }); persoon(ctx, 'baby', 985, 660, 120, { t, uit: 'slaapt', a: q.on('vraagt', 1, 0.3) }); tag(ctx, '"hoe gaat het met jóú?"', 1450, 640, C.goud, q.on('jou', 1), 'center', 32); tag(ctx, 'twijfel? naar de huisarts', 1450, 740, C.text2, q.on('huisarts', 1), 'center', 28); ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1); persoon(ctx, 'mirjam', 700, 880, 470, { t, kijk: 1, uit: 'praat' }); persoon(ctx, 'esra', 1180, 880, 455, { t, kijk: -1, uit: 'lacht', zwanger: 0, outfit: 'jas' });
    tag(ctx, 'nacontrole · na 6 weken', 960, 170, C.goud, q.on('nacontrole', 1), 'center', 32); [['bloeddruk', 'Bloeddruk'], ['herstel', 'herstel'], ['anticonceptie', 'anticonceptie']].forEach(([s2, w], i) => chip(ctx, s2, 760 + i * 200, 250, C.teal, q.on(w, 1), 26));
    tag(ctx, 'Lina: na de kraamweek naar het consultatiebureau', 960, 330, C.goud, q.on('consultatiebureau', 1), 'center', 26); huisje(ctx, 1550, 640, 0.6, q.on('huisarts', 1)); naamBij(ctx, 'huisarts', 'voor Esra zelf', 1550, 760, q.on('huisarts', 1), 'center'); },

  // ---------- Recap ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); borstDoorsnede(ctx, 560, 520, 0.85, 1, { melk: 0.85, knijp: q.on('knijpt', 1) * (0.5 + 0.5 * Math.sin(t * 3)), t });
    tag(ctx, 'toeschietreflex had al geleerd', 1350, 330, C.teal, q.on('geleerd', 1), 'center', 30); tag(ctx, 'oxytocine knijpt de melk eruit', 1350, 420, C.paars, q.on('knijpt', 1), 'center', 30); tag(ctx, 'prolactine: nieuwe melk', 1350, 510, C.goud, q.on('prolactine', 1), 'center', 30); },

  s18(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1, { zonderRaam: true, zonderPoster: true });
    tijdlijn(ctx, 160, 300, 1600, q.on('rond', 1), { max: 46, stap: 46, marks: [[7, 'intake', C.teal, 1], [20, 'controles en screening', C.goud, 1, 60], [40, 'bevalling', C.koraal, 1], [46, 'nacontrole', C.groen, 1, 60]] });
    persoon(ctx, 'mirjam', 480, 880, 400, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'esra', 760, 880, 390, { t, kijk: -1, uit: 'lacht', pose: 'vasthouden', outfit: 'kraam', zwanger: 0 }); persoon(ctx, 'baby', 740, 640, 150, { t, uit: 'slaapt' });
    [['Amsterdam en Groningen', 'Groningen'], ['Rotterdam', 'Rotterdam'], ['Maastricht', 'Maastricht']].forEach(([s2, w], i) => chip(ctx, s2, 1350, 470 + i * 70, C.teal, q.on(w, 1), 28));
    tag(ctx, 'selectie', 1350, 700, C.goud, q.on('selectie', 1), 'center', 28); tag(ctx, 'nachtdiensten · verantwoordelijkheid · bijzondere momenten', 1250, 800, C.text2, q.on('bijzondere', 1), 'center', 24); },
});
