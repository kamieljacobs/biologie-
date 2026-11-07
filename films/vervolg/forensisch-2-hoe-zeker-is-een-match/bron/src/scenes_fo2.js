// Wat word jij? · Forensisch onderzoek 2 · Hoe zeker is een match? — scènes per alinea (v1.0, 25 okt 2026)
// Look: Schema met cast (Dr. Kim outfit lab, Bilal practicum, Erik verdachte, Joost de bewoner alleen in de strip).
// Rode draad: de balans weegt het SPOOR (het mes ligt bovenop), nooit de verdachte. Elke scène staat er op t = 0.

const BAL_L = { naam: 'hypothese 1', sub: 'het DNA is van Erik' }, BAL_R = { naam: 'hypothese 2', sub: 'een onbekende man' };

Object.assign(SCENES, {
  title(ctx, t) {
    spoorBalans(ctx, 1460, 420, 0.75, { tilt: 0.12 * Math.sin(t * 0.8) });
    vraagteken(ctx, 1460, 210, 1, 90);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'bilal', 290, 800, 420, { t, uit: q.on('kop', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: 'vasthouden', kijk: 1,
      hold: (c, hx, hy) => telefoon(c, hx + 8, hy - 18, 1.1) });
    naamBij(ctx, 'Bilal', 'leest het nieuws', 290, 300, 1, 'center');
    krantKnipsel(ctx, 560, 190, 660, 440, { sub: q.on('inbraak', 1), kopHl: q.on('kop', 1, 1) });
    bewijszak(ctx, 1560, 300, 440, 220, { a: q.on('mes', 1), druppels: true });
    naamBij(ctx, 'het mes', 'bewijsstuk', 1560, 460, q.on('mes', 1), 'center');
    dossier(ctx, 1560, 640, 'erik', 'Erik', 'verdachte', { a: q.on('Erik', 1, 0.4) });
    chip(ctx, 'DNA past bij Erik', 1560, 790, C.paars, q.on('past', 1), 28);
    vraagteken(ctx, 890, 760, q.on('denk', 1), 100); },

  // ---------- H1 twee hypothesen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: eerst wegen hoe sterk het spoor is'); labtafel(ctx);
    scherm(ctx, 520, 220, 880, 440, () => {
      strProfiel(ctx, 540, 244, { grijs: q.on('compleet', 1), amelo: q.on('man,', 1), cw: 130, gap: 10 });
      regel(ctx, 'grootste donor: past bij Erik', 960, 632, q.on('Erik', 1), C.goud, 32, 'center', 700);
      if (q.on('uitslag', 1) > 0.01) metaA(ctx, 'deelprofiel · drie STR’s zonder uitslag', 1380, 598, q.on('uitslag', 1), C.text2, 'right', 20); });
    const K = q.on('Kim', 1, 0.3), B = q.on('stage', 1, 0.3);
    persoon(ctx, 'kim', 280, 800, 420, { t, a: K, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'DNA-deskundige', 280, 330, K, 'center');
    persoon(ctx, 'bilal', 1660, 800, 400, { t, a: B, uit: 'neutraal', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', 'stagiair', 1660, 300, B, 'center');
    metaA(ctx, 'aflezen: zie Op lengte gesorteerd', 960, 860, q.on('gesorteerd', 1), C.grain, 'center', 22); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', '', 230, 330, 1, 'center');
    spoorBalans(ctx, 1060, 330, 1, { spoorNaam: 'het spoor', spoorSub: 'DNA op het heft',
      L: Object.assign({ aN: q.on('Erik.', 1) }, BAL_L), R: Object.assign({ aN: q.on('onbekende', 1) }, BAL_R) });
    chip(ctx, 'geen familie van Erik', 1360, 680, C.text2, q.on('familie', 1), 26);
    chip(ctx, 'een broer: apart gerekend', 1680, 300, C.koraal, q.on('broer', 1), 26);
    chip(ctx, 'bij allebei: hoe waarschijnlijk is dit spoor?', 1060, 790, C.goud, q.on('allebei', 1), 30); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    const O = q.on('officier', 1, 0.7), s = 1 - 0.18 * O, bx = 1060 - 420 * O;
    spoorBalans(ctx, bx, 330 + 20 * O, s, { spoorNaam: 'het spoor', spoorSub: '',
      L: Object.assign({ kans: 'bijna 1', aK: q.on('zeker', 1) }, BAL_L),
      R: Object.assign({ kans: '1 op 100.000', aK: q.on('honderdduizend', 1), kansKl: C.goud }, BAL_R) });
    metaA(ctx, 'matchkans', bx + 300 * s, 760, q.on('matchkans', 1), C.goud, 'center', 24);
    if (O > 0.01) { const T = clamp((t - q.at('schrijft', 1)) / 3.2, 0, 1);
      notitie(ctx, 1180, 230, 620, 'officier van justitie · notitie', ['De kans dat Erik', 'onschuldig is:', '1 op 100.000.'], { a: O, typ: T, px: 36 }); }
    vraagteken(ctx, 1490, 690, q.on('denk', 1), 100); },

  // ---------- H2 bewijskracht ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: het zegt hoe vaak een onbekende past');
    const M = q.on('Nederland', 1);
    kaartNL(ctx, 470, 500, 1.25, { a: 0.35 + 0.65 * M });
    naamBij(ctx, '± 9 miljoen', 'mannen in Nederland', 470, 520, q.on('miljoen', 1), 'center');
    const P = q.on('negentig', 1, 0.8), Ek = q.on('Erik', 2);
    for (let i = 0; i < 90; i++) { const c = i % 15, r = Math.floor(i / 15), erik = i === 37;
      const f = clamp(P * 1.8 - (c + r) / 20, 0, 1); if (f < 0.01) continue;
      telpop(ctx, 1060 + c * 50 + (r % 2) * 10, 410 + r * 66, 54, erik && Ek > 0.5 ? C.goud : rgba('#AFC0D0', 0.85), f); }
    if (Ek > 0.01) naamBij(ctx, 'Erik', 'één van de ± 90', 1060 + 7 * 50 + 10, 790, Ek, 'center', C.goud);
    regel(ctx, '9.000.000 × 1/100.000 = 90', 1420, 300, q.on('verwachting', 1), C.text, 40, 'center', 700);
    metaA(ctx, 'mannen die naar verwachting passen', 1420, 350, q.on('deelprofiel', 1), C.grain, 'center', 22);
    chip(ctx, 'denkfout van de aanklager: de matchkans omdraaien', 1420, 230, C.koraal, q.on('denkfout', 1), 28); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    const T = q.on('zwaar', 1, 1.4);
    spoorBalans(ctx, 560, 330, 0.85, { tilt: 0.9 * T, spoorNaam: 'het spoor', spoorSub: '',
      L: Object.assign({ kans: 'bijna 1' }, BAL_L), R: Object.assign({ kans: '1 op 100.000' }, BAL_R) });
    const D = q.on('deelt', 1);
    breuk(ctx, 1370, 380, 'bijna 1', '1 op 100.000', { a: D, w: 420, subB: 'kans als hypothese 1 klopt', subO: 'kans als hypothese 2 klopt' });
    regel(ctx, '= 100.000', 1370, 600, q.on('honderdduizend', 2), C.goud, 60, 'center', 800);
    naamBij(ctx, 'likelihood ratio', 'de bewijskracht', 1370, 680, q.on('likelihood', 1), 'center');
    regel(ctx, 'het spoor: 100.000 keer waarschijnlijker als het DNA van Erik is', 960, 810, q.on('keer', 1), C.text, 34, 'center', 700); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const V = q.on('valt', 1);
    roundRect(ctx, 260, 160, 1400, 190, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport · DNA-deskundige', 300, 206, INKT2, 'left', 22);
    text(ctx, 'Het spoor is', 300, 266, fTekst(36, 600), INKT, 'left');
    ctx.save(); ctx.globalAlpha *= 1 - V; ctx.fillStyle = rgba(INKT2, 0.5); ctx.fillRect(510, 270, 300, 3); ctx.restore();
    regel(ctx, 'zeer veel', 520, 266, V, '#9A6A10', 36, 'left', 800);
    text(ctx, 'waarschijnlijker als het DNA van Erik is', 830, 266, fTekst(36, 600), INKT, 'left');
    text(ctx, 'dan als het van een onbekende man is.', 300, 320, fTekst(36, 600), INKT, 'left');
    const S = q.on('schaal', 1, 0.5);
    nfiSchaal(ctx, 120, 500, 1680, { a: S, hl: [0, q.on('iets', 1), q.on('honderd', 1), 0, q.on('tienduizend', 1), 0], dim: 0.4, wijs: 4, wijsU: 0.5, aW: V, waarde: '100.000' });
    metaA(ctx, 'NFI · Nederlands Forensisch Instituut', 960, 460, q.on('NFI', 1) * (1 - V), C.grain, 'center', 24);
    metaA(ctx, 'bewijskracht (likelihood ratio)', 1800, 720, S, C.text2, 'right', 22); },

  s11(ctx, t, q) { bg(ctx, 'schema'); labtafel(ctx);
    persoon(ctx, 'kim', 400, 800, 420, { t, uit: 'neutraal', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', '', 400, 330, 1, 'center');
    persoon(ctx, 'bilal', 1520, 800, 400, { t, uit: 'verbaasd', pose: 'wijs', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', '', 1520, 300, 1, 'center');
    roundRect(ctx, 700, 250, 520, 400, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport', 740, 300, INKT2, 'left', 22);
    text(ctx, 'bewijskracht:', 740, 370, fTekst(32, 600), INKT2, 'left');
    text(ctx, 'zeer veel waarschijnlijker', 740, 416, fTekst(34, 800), INKT, 'left');
    regel(ctx, 'schuldig?', 740, 520, q.on('schuldig', 1), '#B24A30', 40, 'left', 800);
    vraagteken(ctx, 1080, 560, q.on('denk', 1), 90); },

  // ---------- H3 hoe kwam het daar? ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: nee, dat weegt de rechter');
    persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'het lab', 230, 330, 1, 'center');
    roundRect(ctx, 420, 300, 440, 300, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport van het lab', 450, 346, INKT2, 'left', 20);
    text(ctx, 'hoe sterk', 450, 420, fTekst(34, 800), INKT, 'left'); text(ctx, 'is dit spoor?', 450, 466, fTekst(34, 800), INKT, 'left');
    kruis(ctx, 640, 690, 34, q.on('schuld', 1)); regel(ctx, 'geen oordeel over schuld', 640, 770, q.on('schuld', 1), C.koraal, 30, 'center', 700);
    const R = q.on('rechter', 1);
    pijl(ctx, 900, 450, 1150, 450, C.line, R, 4, 16);
    rechtbankIcoon(ctx, 1400, 450, 1, { a: R });
    naamBij(ctx, 'de rechter', 'weegt alles samen', 1400, 670, R, 'center');
    const A = q.on('bewijs', 1);
    [[1660, 290, 'getuigen'], [1700, 450, 'camera'], [1660, 610, 'telefoon']].forEach(([dx, dy, nm], i) => { const f = clamp(A * 2 - i * 0.4, 0, 1);
      document_(ctx, dx, dy, 1.3, C.text2, f); metaA(ctx, nm, dx, dy + 62, f, C.grain, 'center', 20); });
    chip(ctx, 'het lab: alleen de bewijskracht', 640, 220, C.goud, q.on('alleen', 1), 28); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const K = q.on('kant', 1, 0.7);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K;
      for (let i = 0; i < 23; i++) { const c = i % 8, r = Math.floor(i / 8); roundRect(ctx, 160 + c * 82, 260 + r * 82, 70, 70, 10); shape(ctx, rgba(C.paars, 0.2), C.paars, 1.5); }
      metaA(ctx, '23 STR’s · volledig profiel', 160, 230, 1, C.grain, 'left', 24);
      regel(ctx, 'matchkans < 1 op 1 miljard', 480, 600, q.on('miljard', 1), C.goud, 44, 'center', 800);
      kaartNL(ctx, 1380, 470, 1.15, {});
      const N = q.on('niemand', 1); regel(ctx, '9.000.000 × 1/1.000.000.000', 1380, 760, N, C.text, 34, 'center', 700);
      regel(ctx, '< 0,01 man', 1380, 820, N, C.goud, 38, 'center', 800);
      naamBij(ctx, 'niemand anders', 'past waarschijnlijk', 1380, 490, N, 'center');
      ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      metaA(ctx, 'het verhaal van Erik', 960, 160, 1, C.grain, 'center', 26);
      const F = q.on('fiets', 1, 0.5), Hd = q.on('hand.', 1, 0.5), Br = q.on('brood', 1, 0.5);
      stripVak(ctx, 120, 200, 540, 600, 1, 1, () => {
        persoon(ctx, 'erik', 250, 740, 340, { t, uit: 'neutraal', kijk: 1 }); fietsZij(ctx, 400, 740, 0.85);
        persoon(ctx, 'joost', 560, 740, 330, { t, uit: 'blij', pose: 'wijs', kijk: -1, a: F });
        naamBij(ctx, 'Erik', '', 250, 360, 1, 'center'); naamBij(ctx, 'Joost', 'de bewoner', 530, 370, F, 'center');
        metaA(ctx, 'een fiets kopen', 390, 780, F, C.grain, 'center', 22); });
      stripVak(ctx, 690, 200, 540, 600, 2, Hd, () => {
        handdruk(ctx, 'erik', 'joost', 960, 740, 340, { t, schud: clamp((t - q.at('hand.', 1)) / 1.6, 0, 1) });
        metaA(ctx, 'een hand', 960, 780, 1, C.grain, 'center', 22); });
      stripVak(ctx, 1260, 200, 540, 600, 3, Br, () => {
        // aanrecht op heuphoogte (± 0,5 × lengte), brood vlak bij de hand: Joost snijdt echt (zaagbeweging na 'brood')
        const Zg = t > q.at('brood', 1) ? Math.sin((t - q.at('brood', 1)) * 7) * 7 : 0;
        tafel(ctx, 1640, 740, 280, 170); brood(ctx, 1660, 568, 1.1, clamp((t - q.at('brood', 1)) / 1.5, 0, 1));
        persoon(ctx, 'joost', 1400, 740, 330, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, hold: (c, hx, hy) => mes(c, hx + 6 + Zg, hy, 100, { rot: -0.35 }) });
        naamBij(ctx, 'met dit mes', '', 1530, 370, q.on('dit', 1), 'center'); });
      ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const Z = q.on('zien', 1, 0.3), O = q.on('Onderzoekers', 1, 0.3);
    if (Z < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Z;
      persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
      naamBij(ctx, 'Dr. Kim', '', 230, 330, 1, 'center');
      const Bv = q.on('bronvraag', 1), Av = q.on('activiteitvraag', 1);
      roundRect(ctx, 480, 260, 620, 360, 16); shape(ctx, rgba(C.paars, 0.12), C.paars, 2);
      metaText(ctx, 'tot nu toe', 520, 310, C.grain, 'left', 22);
      regel(ctx, 'bronvraag', 520, 380, Bv, C.text, 48, 'left', 800); regel(ctx, 'van wie is het DNA?', 520, 440, Bv, C.text2, 36, 'left', 600);
      mes(ctx, 720, 540, 220, { a: Bv, stip: [{ n: 9, r: 6, col: C.paars }], seed: 2 });
      ctx.save(); ctx.globalAlpha *= Av; roundRect(ctx, 1180, 260, 620, 360, 16); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); ctx.restore();
      regel(ctx, 'activiteitvraag', 1220, 380, Av, C.text, 48, 'left', 800); regel(ctx, 'hoe kwam het daar?', 1220, 440, Av, C.text2, 36, 'left', 600);
      ctx.save(); ctx.globalAlpha *= Av; vraagteken(ctx, 1490, 560, 1, 80); ctx.restore();
      ctx.restore(); }
    if (Z > 0.01 && O < 0.99) { ctx.save(); ctx.globalAlpha *= Z * (1 - O); labtafel(ctx);
      const P = q.on('pakt', 1, 0.6) > 0.5 ? 1 : 0, M = q.at('minuten', 1);
      if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P;
        const r = handdruk(ctx, 'bilal', 'kim', 820, 800, 410, { t, schud: q.on('schudt', 1, 1.8), outfitL: 'practicum', outfitR: 'lab' });
        naamBij(ctx, 'Bilal', '', r.xL, 300, 1, 'center'); naamBij(ctx, 'Dr. Kim', '', r.xR, 320, 1, 'center');
        ctx.restore(); }
      klok(ctx, 1400, 330, 96, clamp((t - M) / 3, 0, 1), { a: q.on('minuten', 1) });
      metaA(ctx, '2 minuten handen schudden', 1400, 470, q.on('minuten', 1), C.grain, 'center', 22);
      if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P;
        persoon(ctx, 'kim', 1000, 800, 420, { t, uit: 'neutraal', kijk: -1, outfit: 'lab' });
        naamBij(ctx, 'Dr. Kim', 'raakt het mes niet aan', 1000, 330, q.on('raakt', 1), 'center');
        persoon(ctx, 'bilal', 560, 800, 410, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, outfit: 'practicum', hold: (c, hx, hy) => mes(c, hx + 4, hy + 6, 110, { rot: 1.25 }) }); // lemmet omlaag, niet naar Dr. Kim
        naamBij(ctx, 'Bilal', 'pakt een schoon mes', 560, 310, 1, 'center');
        ctx.restore(); }
      ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O;
      metaA(ctx, 'dezelfde proef, veel paren', 960, 200, 1, C.grain, 'center', 26);
      for (let i = 0; i < 6; i++) { const x = 520 + (i % 3) * 440, y = 340 + Math.floor(i / 3) * 220; mes(ctx, x - 40, y, 320, {}); }
      chip(ctx, 'wat zit er op het heft?', 960, 780, C.goud, q.on('heft', 1), 30);
      vraagteken(ctx, 960, 470, q.on('denk', 1), 90);
      ctx.restore(); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ook DNA van de ander, soms het meeste');
    const S = q.on('zes', 1, 0.8), G = q.on('grootste', 1);
    for (let i = 0; i < 6; i++) { const x = 520 + (i % 3) * 440, y = 330 + Math.floor(i / 3) * 210; const groot = i === 4, geen = i === 2;
      mes(ctx, x - 40, y, 320, { seed: i * 5, stip: [{ n: groot ? 3 : 8, r: 6, col: C.teal }, { n: geen ? 0 : (groot ? 9 : 2 + (i % 2)), r: 6, col: C.goud, a: S }] });
      if (groot && G > 0.01) { ctx.save(); ctx.globalAlpha *= G; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 200, y - 64, 380, 128, 16); ctx.stroke(); ctx.restore();
        regel(ctx, 'de ander: grootste donor', x, y + 96, G, C.goud, 28, 'center', 700); } }
    naamBij(ctx, 'overdracht', 'DNA via een ander', 960, 210, q.on('overdracht', 1), 'center', C.goud);
    metaA(ctx, 'proef: Cale e.a. 2016', 1800, 120, q.on('Amerikaanse', 1), C.grain, 'right', 22);
    regel(ctx, '5 van de 6', 160, 380, S, C.goud, 40, 'left', 800);
    regel(ctx, '± 1 op de 5', 160, 590, G, C.goud, 40, 'left', 800);
    chip(ctx, 'wie het mes vasthield', 640, 800, C.teal, 1, 26);
    chip(ctx, 'de ander (handdruk)', 1060, 800, C.goud, S, 26);
    chip(ctx, 'andere proeven vonden minder', 1520, 800, C.text2, q.on('minder', 1), 26); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    const Tl = q.on('dus', 1, 1.2);
    balans(ctx, 560, 310, 0.8, { tilt: 0.25 * Tl, titel: 'hoe kwam het op het mes?', aT: 1,
      L: { naam: 'hield het mes vast', sub: 'bij de inbraak', aN: q.on('vast', 1), kans: 'bijna 1', aK: q.on('altijd', 1) },
      R: { naam: 'gaf alleen een hand', sub: '', aN: q.on('hand?', 1), kans: '1 op 5', aK: q.on('vijf.', 1) } });
    metaA(ctx, 'heel vereenvoudigd · één proef', 560, 140, q.on('vereenvoudigd', 1), C.koraal, 'center', 24);
    const D = q.on('gedeeld', 1);
    breuk(ctx, 1380, 300, 'bijna 1', '1/5', { a: D, w: 300, px: 52 });
    regel(ctx, '≈ 5', 1380, 470, q.on('ongeveer', 2), C.goud, 60, 'center', 800);
    const Sc = q.on('schaal', 1, 0.5);
    nfiSchaal(ctx, 120, 650, 1680, { a: Sc, bh: 140, hl: [0, Sc, 0, 0, 0, 0], dim: 0.35, wijs: 1, wijsU: 0.2, aW: 0 });
    chip(ctx, 'echte deskundigen: veel meer proeven', 1380, 590, C.text2, q.on('deskundigen', 1), 26); },

  // ---------- H4 drie mensen op één mes ----------
  s19(ctx, t, q) { bg(ctx, 'schema');
    mes(ctx, 420, 190, 480, { swab: q.on('spoor', 1) });
    naamBij(ctx, 'lemmet', 'tweede spoor', 690, 270, 1, 'center');
    const Pk = q.on('pieken', 1, 1.2), B = q.on('bewoner', 1);
    piekenSTR(ctx, 300, 720, 1100, 360, { groei: Pk, kl: { joost: B } });
    naamBij(ctx, 'Joost', 'de bewoner', 280, 420, B, 'right', C.teal);
    chip(ctx, 'per STR hooguit 2', 1640, 380, C.text2, q.on('hooguit', 1), 26);
    chip(ctx, 'minstens 3 mensen', 1640, 470, C.goud, q.on('minstens', 1), 26);
    regel(ctx, 'mengprofiel', 1640, 570, q.on('mengprofiel', 1), C.text, 40, 'center', 800);
    metaA(ctx, 'het is zijn mes', 280, 490, q.on('Logisch', 1), C.grain, 'right', 20); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    const E = q.on('Eriks', 1);
    piekenSTR(ctx, 300, 720, 1100, 360, { kl: { joost: 1, onbekend: 1 }, hlErik: E });
    naamBij(ctx, 'Joost', 'de bewoner', 280, 420, 1, 'right', C.teal);
    naamBij(ctx, 'onbekend', '', 771, 520, 1, 'center', '#DCE5EC');
    naamBij(ctx, 'Erik', '14 en 18', 1243, 560, E, 'center', C.goud);
    metaA(ctx, 'en zo bij elke STR', 1400, 260, q.on('elke', 1), C.grain, 'right', 22);
    notitie(ctx, 1450, 340, 380, 'notitie Bilal', ['Erik: niet', 'uitgesloten'], { a: q.on('noteert', 1), typ: clamp((t - q.at('noteert', 1)) / 1.6, 0, 1), px: 30 });
    vraagteken(ctx, 1640, 680, q.on('denk', 1), 90); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: bijna niets');
    const Pr = clamp((t - q.at('paren', 1)) / 2.4, 0, 1);
    metaA(ctx, 'alle paren uit 13 · 14 · 15 · 16 · 18', 120, 230, 1, C.grain, 'left', 22);
    parenRaster(ctx, 120, 260, ['13', '14', '15', '16', '18'], { licht: Pr, cw: 150, ch: 66 });
    regel(ctx, '15 paren: veel mensen passen', 120, 540, q.on('mengsel', 1), C.text, 34, 'left', 700);
    const S = q.on('software', 1, 0.6);
    scherm(ctx, 1000, 220, 800, 400, () => {
      text(ctx, 'DNAStatistX', 1030, 266, fTekst(30, 800), C.text, 'left'); metaText(ctx, 'NFI', 1770, 266, C.grain, 'right', 20);
      const H = q.on('hoogte', 1);
      [[13, 0.88, C.teal], [14, 0.2, C.goud], [15, 0.46, '#AFC0D0'], [16, 1, C.teal], [18, 0.18, C.goud]].forEach(([al, h, col], i) => {
        const bx = 1040 + i * 96, bh = 200 * h; roundRect(ctx, bx, 520 - bh, 60, bh, 6); shape(ctx, rgba(col, 0.6), col, 2);
        text(ctx, String(al), bx + 30, 556, fTekst(24, 600), C.text2, 'center'); regel(ctx, String(Math.round(h * 1800)), bx + 30, 510 - bh, H, C.text, 22, 'center', 600); });
      regel(ctx, 'donoren: 3', 1780, 360, q.on('bijdroegen', 1), C.text, 32, 'right', 700);
      regel(ctx, 'LR: 2 – 10', 1780, 420, q.on('likelihood', 1), C.goud, 32, 'right', 800);
      regel(ctx, 'Erik: kleine bijdrage', 1780, 480, q.on('kleine', 1), C.goud, 26, 'right', 700); }, { a: S });
    const U = q.on('uitkomst', 1);
    balans(ctx, 440, 640, 0.5, { titelPx: 22, a: q.on('likelihood', 1), tilt: 0.25 * U, titel: 'tweede spoor',
      L: { naam: 'met Erik' }, R: { naam: 'zonder Erik' } });
    regel(ctx, 'iets waarschijnlijker', 1400, 720, U, C.goud, 40, 'center', 800);
    metaA(ctx, 'voorbeelduitkomst', 1400, 766, U, C.grain, 'center', 20); },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    krantKnipsel(ctx, 120, 170, 560, 374, { streep: clamp((t - q.at('niet.', 1)) / 1.2, 0, 1) });
    persoon(ctx, 'bilal', 800, 800, 380, { t, uit: 'neutraal', pose: 'wijs', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', '', 800, 340, 1, 'center');
    regel(ctx, 'heft · bron: zeer veel waarschijnlijker', 120, 620, q.on('zeer', 1), C.groen, 30, 'left', 700);
    regel(ctx, 'als het DNA van Erik is', 120, 660, q.on('zeer', 1), C.groen, 30, 'left', 700);
    regel(ctx, 'hoe op het mes: weinig bewijs', 120, 730, q.on('weinig', 1), C.koraal, 30, 'left', 700);
    const Bb = q.on('heft', 1), Ba = q.on('kwam', 1), B2 = q.on('weinig', 1);
    balans(ctx, 1110, 330, 0.32, { a: Bb, tilt: 0.95, titel: 'heft · bron', titelPx: 22 });
    balans(ctx, 1440, 330, 0.32, { a: Ba, tilt: 0.25, titel: 'heft · activiteit', titelPx: 22 });
    balans(ctx, 1770, 330, 0.32, { a: B2, tilt: 0.25, titel: 'tweede spoor', titelPx: 22 });
    const R = q.on('rechter', 1);
    rechtbankIcoon(ctx, 1440, 650, 0.55, { a: R });
    naamBij(ctx, 'de rechter', 'weegt alles samen', 1440, 780, R, 'center'); },

  s24(ctx, t, q) { bg(ctx, 'schema'); labtafel(ctx);
    persoon(ctx, 'bilal', 300, 800, 420, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', 'stagiair', 300, 300, 1, 'center');
    opleiding(ctx, 620, 150, 1180, 'hbo-bachelor · 4 jaar · met selectie', 'Forensisch Onderzoek', 'Saxion Enschede · Hogeschool van Amsterdam', q.on('Onderzoek', 1));
    opleiding(ctx, 620, 320, 1180, 'wo · eerst een bachelor, dan een master', 'biologie → Forensic Science', 'bachelor Radboud Nijmegen · master UvA Amsterdam, 2 jaar', q.on('Nijmegen', 1), C.paars);
    opleiding(ctx, 620, 490, 1180, 'hbo-bachelor · 4 jaar', 'Forensisch Laboratoriumonderzoek', 'Van Hall Larenstein, Leeuwarden', q.on('Leeuwarden', 1), C.teal);
    const W2 = q.on('werkt', 1);
    ['NFI', 'politie', 'particulier lab'].forEach((s2, i) => chip(ctx, s2, 820 + i * 380, 740, [C.goud, C.teal, C.oker][i], clamp(W2 * 1.4 - i * 0.3, 0, 1), 30)); }
});
