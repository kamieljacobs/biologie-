// Wat word jij? · Verloskunde 3 · Screenen: een keuze — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra rond 10 en 20 weken).
// Rode draad: het gesprek over screening en wat een uitslag betekent.

function gesprek(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; praktijk(ctx, 1, o.kamer || {});
  persoon(ctx, 'mirjam', o.mx || 700, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan' });
  persoon(ctx, 'esra', o.ex || 1220, 880, 455, { t, kijk: -1, uit: o.uitE || 'neutraal', pose: o.poseE || 'staan', zwanger: o.zw == null ? 0.12 : o.zw }); ctx.restore(); }
// uitslagbrief
function brief(ctx, x, y, s = 1, a = 1, regels = [], col = C.koraal) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -200, -260, 400, 520, 10); shape(ctx, '#F2F2EE', '#C8D0D8', 2);
  ctx.fillStyle = '#B8C2CC'; for (let i = 0; i < 4; i++) ctx.fillRect(-160, -200 + i * 30, 240 - i * 30, 10); regels.forEach((r, i) => text(ctx, r, 0, -40 + i * 50, fTekst(i ? 26 : 32, 800), i ? '#2A3446' : col, 'center'));
  ctx.fillStyle = '#B8C2CC'; for (let i = 0; i < 5; i++) ctx.fillRect(-160, 110 + i * 26, 320 - (i % 2) * 60, 9); ctx.restore(); }
// weegschaal zonder gewicht (neutraal)
function balans(ctx, x, y, s = 1, a = 1, kantel = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 200); ctx.moveTo(-80, 200); ctx.lineTo(80, 200); ctx.stroke(); ctx.save(); ctx.rotate(kantel); ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(200, 0); ctx.stroke();
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 200, 0); ctx.lineTo(d * 200 - 50, 90); ctx.moveTo(d * 200, 0); ctx.lineTo(d * 200 + 50, 90); ctx.stroke(); ctx.beginPath(); ctx.ellipse(d * 200, 95, 70, 16, 0, 0, Math.PI); ctx.stroke(); } ctx.restore(); circ(ctx, 0, 0, 14, C.goud); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { balans(ctx, 1450, 330, 1.1, 1, 0.05 * Math.sin(t * 0.8)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); brief(ctx, 560, 520, 1, q.on('uitslag', 1), ['Uitslag NIPT', 'aanwijzing voor', 'trisomie 13']);
    naamBij(ctx, 'NIPT', 'bloedtest in de zwangerschap', 860, 330, q.on('bloedtest', 1)); for (let i = 0; i < 3; i++) chromosoom(ctx, 1100 + i * 70, 560, 130, i === 2 ? C.koraal : C.teal, q.on('extra', 1));
    naamBij(ctx, 'syndroom van Patau', 'extra chromosoom 13', 1170, 700, q.on('Patau', 1), 'center'); tag(ctx, 'ernstige aandoening', 1170, 820, C.koraal, q.on('ernstige', 1), 'center', 28);
    vraagteken(ctx, 1600, 520, q.on('denk', 1), 130); },

  // ---------- H1 Het gesprek ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); gesprek(ctx, t); naamBij(ctx, 'Esra', 'bij de intake', 1220, 385, q.on('Esra', 1), 'center');
    tag(ctx, 'wil je informatie over onderzoek?', 960, 200, C.teal, q.on('informatie', 1), 'center', 30); tag(ctx, 'de eerste keuze', 960, 280, C.goud, q.on('eerste', 1), 'center', 28); tag(ctx, 'niet willen weten mag ook', 960, 830, C.text2, q.on('mag', 1), 'center', 26); },

  s05(ctx, t, q) { bg(ctx, 'schema'); gesprek(ctx, t, { mx: 560, ex: 1360, tafel: false });
    vkKaart(ctx, 660, 120, 600, 300, 'Wat Mirjam uitlegt', [['wat er kan', 'kan'], ['wat een uitslag betekent', 'betekent'], ['wat je daarna kunt doen', 'daarna']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.teal, q.on('apart', 1));
    chip(ctx, 'voorbereiden op een kind met een aandoening', 960, 520, C.teal, q.on('voorbereiden', 1), 26); chip(ctx, 'zwangerschap afbreken', 960, 590, C.teal, q.on('breken', 1), 26); tag(ctx, 'kan tot 24 weken', 960, 660, C.text2, q.on('vierentwintig', 1), 'center', 24); },

  s06(ctx, t, q) { bg(ctx, 'schema'); gesprek(ctx, t, { uitM: 'neutraal', uitE: q.on('kiest', 1) > 0.5 ? 'blij' : 'denkt', poseE: q.on('kiest', 1) > 0.5 ? 'staan' : 'denk' });
    balans(ctx, 960, 220, 0.9, q.on('advies', 1), 0.04 * Math.sin(t)); naamBij(ctx, 'neutraal informeren', 'geen advies', 960, 520, q.on('neutraal', 1), 'center', C.goud);
    tag(ctx, 'wat vind jíj belangrijk?', 960, 620, C.teal, q.on('belangrijk', 1), 'center', 28); chip(ctx, 'Esra kiest: NIPT en 20-wekenecho', 1300, 180, C.groen, q.on('kiest', 1), 28); },

  // ---------- H2 Wat de testen zoeken ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const lab = q.on('lab', 1);
    roundRect(ctx, 140, 220, 760, 520, 40); shape(ctx, rgba(VK.bloedM, 0.12), rgba(VK.bloedM, 0.5), 2); metaText(ctx, 'BLOED VAN DE MOEDER', 160, 200, C.grain, 'left', 22);
    for (let i = 0; i < 12; i++) { const x = 220 + (i % 4) * 170 + wander(i, t, 10, 0.5).x, y = 320 + Math.floor(i / 4) * 150 + wander(i + 5, t, 10, 0.5).y; dnaSnipper(ctx, x, y, 0.9, i % 6 === 0 ? C.goud : VK.dna, q.on('stukjes', 1), i * 0.7); }
    naamBij(ctx, 'meeste van de moeder', '', 280, 790, q.on('meeste', 1), 'center', VK.dna); naamBij(ctx, '± 1 op 10 uit de placenta', '', 770, 790, q.on('placenta', 1), 'center', C.goud); tag(ctx, 'vanaf 10 weken', 520, 160, C.text2, q.on('tien', 1), 'center', 26);
    const rij = (i, nr, naam, w) => { const a = q.on(w, 1); for (let k = 0; k < 3; k++) chromosoom(ctx, 1100 + k * 46, 330 + i * 190, 100, k === 2 ? C.goud : C.teal, a); vkA(ctx, a); text(ctx, 'chromosoom ' + nr, 1280, 320 + i * 190, fTekst(30, 800), C.text, 'left'); text(ctx, naam, 1280, 362 + i * 190, fTekst(28, 600), C.goud, 'left'); ctx.restore(); };
    rij(0, 21, 'syndroom van Down', 'Down'); rij(1, 18, 'syndroom van Edwards', 'Edwards'); rij(2, 13, 'syndroom van Patau', 'Patau'); tag(ctx, 'film: DNA lezen', 1500, 160, C.teal, q.on('film', 1), 'center', 26); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const fase = Math.floor(clamp((t - q.at('hart', 1)) / 3, 0, 4));
    echoScherm(ctx, 760, 180, 900, 1, (c) => { foetus(c, 0, 20, 1.05, { week: 20 }); });
    naamBij(ctx, '20-wekenecho', 'afwijkingen in de bouw', 1360, 240, q.on('twintig', 1)); naamBij(ctx, 'echoscopist', 'een half uur', 1360, 330, q.on('echoscopist', 1));
    [['hart · vier kamers', 'hart'], ['ruggetje', 'ruggetje'], ['lip', 'lip'], ['buikwand', 'buikwand'], ['nieren', 'nieren']].forEach(([s2, w], i) => chip(ctx, s2, 1480, 440 + i * 64, C.teal, q.on(w, 1), 26));
    tag(ctx, 'opereren na de geboorte: team staat klaar', 960, 860, C.groen, q.on('opereren', 1), 'center', 28); },

  s09(ctx, t, q) { bg(ctx, 'schema'); gesprek(ctx, t, { zw: 0.4, uitE: 'blij', uitM: 'praat' }); naamBij(ctx, 'Esra', '20 weken', 1220, 385, 1, 'center');
    stempel(ctx, 760, 200, 'NIPT: geen afwijking', C.text2, q.on('uitslagen', 1)); stempel(ctx, 1200, 200, 'echo: niets gevonden', C.text2, q.on('uitslagen', 1), 0.1);
    tag(ctx, 'goede uitslag ≠ garantie', 960, 330, C.koraal, q.on('garantie', 1), 'center', 32); tag(ctx, 'veel aandoeningen zie je niet', 960, 410, C.text2, q.on('Veel', 1), 'center', 28); },

  // ---------- H3 Rekenen met tienduizend ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('Patau', 1, 0.8), pd = (idx, col, a) => [idx, col, 12, a];
    const down = [], patau = []; for (let i = 0; i < 30; i++) down.push(pd((i * 337 + 91) % 10000, i < 29 ? C.goud : C.koraal, q.on('dertig', 1) * (1 - 0.7 * P)));
    for (let i = 0; i < 10; i++) patau.push(pd((i * 997 + 413) % 10000, i < 5 ? C.teal : C.koraal, P));
    stipRaster(ctx, 120, 170, 1, { n: 10000, per: 100, d: 6.6, r: 2.2, hl: down.concat(patau) }); naamBij(ctx, '10.000 zwangeren', '', 450, 860, q.on('tienduizend', 1), 'center');
    regel(ctx, 'Down', 1000, 260, q.on('Down', 1), C.goud, 46, 'left', 800); regel(ctx, '30 afwijkend', 1000, 330, q.on('dertig', 1), C.text, 32, 'left', 600); regel(ctx, '29 echt', 1000, 390, q.on('negenentwintig', 1), C.goud, 40, 'left', 800);
    regel(ctx, 'Patau', 1450, 260, P, C.teal, 46, 'left', 800); regel(ctx, '10 afwijkend', 1450, 330, P, C.text, 32, 'left', 600); regel(ctx, '± 5 echt', 1450, 390, q.on('vijf', 1), C.teal, 40, 'left', 800); regel(ctx, '± 5 vals alarm', 1450, 450, q.on('vijf', 1), C.koraal, 40, 'left', 800);
    stempel(ctx, 1400, 640, 'antwoord b: ± de helft', C.groen, q.on('helft', 1)); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('waar', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; regel(ctx, 'Down: veel echte gevallen', 560, 300, 1, C.text, 34, 'center', 700); stippen(ctx, 330, 350, 30, 29, C.goud, 1, 10, 14, 46);
      regel(ctx, 'Patau: weinig echte gevallen', 1360, 300, 1, C.text, 34, 'center', 700); stippen(ctx, 1150, 350, 10, 5, C.teal, 1, 10, 14, 46); for (let i = 5; i < 10; i++) circ(ctx, 1150 + i * 46, 350, 14, rgba(C.koraal, q.on('alarm', 1)));
      tag(ctx, 'vals alarm weegt zwaarder', 1360, 520, C.koraal, q.on('zwaar', 1), 'center', 30); circ(ctx, 330 + 29 * 46 % 460, 350 + Math.floor(29 / 10) * 46, 14, rgba(C.koraal, q.on('alarm', 1))); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'waar komt dat vals alarm vandaan?', 960, 300, 1, C.text, 44, 'center', 800); vraagteken(ctx, 960, 560, q.on('denk', 1), 130); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); baarmoeder(ctx, 760, 530, 0.75, { week: 12, groei: 0.35, t, fs: 0.6 });
    const v = q.on('misgaan', 1); if (v > 0.01) { vkA(ctx, v); circ(ctx, 824, 392, 30, rgba(C.koraal, 0.35), C.koraal, 3); ctx.restore(); for (let k = 0; k < 3; k++) chromosoom(ctx, 812 + k * 12, 392, 26, C.koraal, v); }
    naamBij(ctx, 'placenta', 'cellen met een extra chromosoom', 1000, 250, v, 'left', C.koraal); naamBij(ctx, 'kind', 'gewone chromosomen', 1000, 560, q.on('gewone', 1), 'left', C.groen);
    tag(ctx, 'één bevruchte eicel', 760, 140, C.text2, q.on('dezelfde', 1), 'center', 28);
    vkKaart(ctx, 1260, 650, 600, 200, 'Afwijkende NIPT', [['de kans is verhoogd', 'kans'], ['we gaan het controleren', 'controleren']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.goud, q.on('nooit', 1)); },

  // ---------- H4 Zekerheid krijgen ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('vlokkentest', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; ziekenhuis(ctx, 960, 560, 1.4, q.on('academisch', 1)); naamBij(ctx, 'centrum in een academisch ziekenhuis', '', 960, 760, q.on('academisch', 1), 'center'); tag(ctx, 'een test die zekerheid geeft', 960, 200, C.goud, q.on('zekerheid', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; baarmoeder(ctx, 560, 560, 0.7, { week: 12, groei: 0.4, t, fs: 0.6 }); naald(ctx, 260, 160, 640, 380, 1, clamp((t - q.at('naald', 1)) / 1.5, 0, 1));
      naamBij(ctx, 'vlokkentest', 'stukje placenta · vanaf 11 weken', 560, 860, 1, 'center', C.paars);
      const V = q.on('vruchtwaterpunctie', 1); baarmoeder(ctx, 1380, 560, 0.75, { week: 16, groei: 0.5, t, fs: 0.62, a: V }); naald(ctx, 1720, 200, 1480, 530, V, clamp((t - q.at('vruchtwaterpunctie', 1)) / 1.5, 0, 1));
      for (let i = 0; i < 5; i++) circ(ctx, 1460 + wander(i, t, 30, 0.6).x, 520 + wander(i + 9, t, 30, 0.6).y, 9, rgba(VK.huid, q.on('losse', 1)));
      naamBij(ctx, 'vruchtwaterpunctie', 'cellen van het kind · vanaf 15 weken', 1380, 860, V, 'center', C.teal); tag(ctx, 'kans op miskraam: ± 1 à 2 op de 1000', 960, 150, C.koraal, q.on('miskraam', 1), 'center', 28); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); brief(ctx, 520, 520, 0.85, 1, ['Uitslag NIPT', 'aanwijzing voor', 'trisomie 13']);
    regel(ctx, 'welke test zegt het meest over het kind zelf?', 1250, 360, q.on('Welke', 1), C.text, 36, 'center', 800); vraagteken(ctx, 1250, 600, q.on('denk', 1), 120); },

  s17(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b');
    baarmoeder(ctx, 560, 560, 0.7, { week: 12, groei: 0.4, t, fs: 0.6 }); circ(ctx, 560 + 45, 560 - 200, 36, rgba(C.koraal, 0.35 * q.on('vlokkentest', 1)), C.koraal, 3); naamBij(ctx, 'vlokkentest', 'kijkt naar de placenta', 560, 860, q.on('vlokkentest', 1), 'center', C.paars);
    tag(ctx, 'kan dezelfde vergissing maken', 560, 160, C.koraal, q.on('vergissing', 1), 'center', 28);
    baarmoeder(ctx, 1380, 560, 0.75, { week: 16, groei: 0.5, t, fs: 0.62 }); for (let i = 0; i < 5; i++) circ(ctx, 1460 + wander(i, t, 30, 0.6).x, 520 + wander(i + 9, t, 30, 0.6).y, 9, VK.huid); naamBij(ctx, 'vruchtwater', 'cellen van het kind zelf', 1380, 860, q.on('vruchtwater', 1), 'center', C.teal); vink_(ctx, 1640, 300, 36, q.on('zelf', 1)); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); brief(ctx, 520, 520, 0.85, 1, ['Uitslag NIPT', 'verhoogde kans', 'geen zekerheid'], C.goud);
    regel(ctx, 'Patau: ± de helft', 1250, 330, q.on('helft', 1), C.goud, 44, 'center', 800); tag(ctx, 'goed uitleggen, als iemand bang is', 1250, 460, C.teal, q.on('bang', 1), 'center', 30); tag(ctx, 'een van de moeilijkste dingen in dit vak', 1250, 540, C.text2, q.on('moeilijkste', 1), 'center', 26); },

  s19(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1, { zonderRaam: true }); persoon(ctx, 'mirjam', 520, 880, 500, { t, kijk: 1, uit: 'blij', pose: 'wijsOmhoog' });
    tag(ctx, 'gesprekken oefenen, ook met acteurs', 1200, 300, C.paars, q.on('acteurs', 1), 'center', 30); echoScherm(ctx, 1200, 470, 360, q.on('echoscopist', 1), (c) => foetus(c, 0, 10, 0.4, { week: 20 }));
    naamBij(ctx, 'echoscopist', 'zelf echo’s maken', 1200, 820, q.on('echoscopist', 1), 'center'); },
});
