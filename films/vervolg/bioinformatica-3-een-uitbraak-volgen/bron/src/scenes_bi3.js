// Wat word jij? · Bio-informatica · film 3 · Stambomen uit DNA: een uitbraak volgen — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam, meeloopweek; Dr. Kim, onderzoeker, outfit 'gewoon'); Micro alleen in de zoomcirkel van H1 (virusdeeltje met RNA).
// Gevoelig: geen zieke mensen in beeld. Bedacht voorbeeld (A–E) met castpersonages en figuranten (keuring Kamiel 25 okt 2026): A = Jesse, C = verpleegkundige,
// E = patiënt zittend in gewone kleding, B = zorgmedewerker elders, D = Joost; 'niet getest' = gestippeld kader + label. Geen schuld.
// Echte casus: geen stads- of ziekenhuisnamen; de bron (Sikkema e.a. 2020) alleen op het bronkaartje in de recap (s34).
// Vraagsegmenten ('Wat denk je? …') zijn eigen alinea's: s07, s13, s21, s25, s31.

const SEQ3 = 'ATGCTTACGGATCAGTTCGAGCTAACGTTA';   // 30 letters, uitsnede
const SEQ3B = SEQ3.slice(0, 17) + 'T' + SEQ3.slice(18); // één afwijkende letter (plek 18)
const STUK3 = [[0, 7], [5, 13], [11, 19], [17, 24], [22, 30]];

Object.assign(SCENES, {
  title(ctx, t) {
    boom3(ctx, 1180, 760, 560, 380, { t, r: 28 });
    bedacht3(ctx, 1, 1180, 830);
    corona3(ctx, 1720, 290, 62, { t });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    kaartje3(ctx, 'maart 2020', 860, 90, 1, C.goud);
    [620, 960, 1300].forEach((x, i) => { const al = q.on('ziekenhuizen', 1, 0.4 + i * 0.25); zh3(ctx, x, 330, 0.5, Math.max(0.35, al)); });
    naamBij(ctx, 'drie ziekenhuizen in Brabant', '', 960, 412, q.on('Brabant', 1), 'center');
    const N = 96, k = Math.round(N * clamp((t - q.at('testen', 1)) / 2.6, 0, 1));
    for (let i = 0; i < N; i++) { const c = i % 16, r = Math.floor(i / 16); const ord = (i * 37) % 96; pop3(ctx, 560 + c * 54, 520 + r * 50, 42, ord < k ? C.koraal : ZORG); }
    const kA = q.on('testen', 1, 0.4);
    regel(ctx, String(k), 300, 690, kA, C.koraal, 120, 'center', 800);
    m3(ctx, 'medewerkers met klachten', 300, 740, kA, C.grain, 'center', 24); m3(ctx, 'positief', 300, 776, kA, C.grain, 'center', 24);
    tag(ctx, 'op het werk?', 1660, 560, C.koraal, q.on('werk', 1), 'center', 34);
    tag(ctx, 'of van buiten?', 1660, 660, C.teal, q.on('buiten', 1), 'center', 34);
    vraagteken(ctx, 1660, 820, q.on('daarachter', 1), 100); },

  // ---------- H1 Van monster naar sequentie ----------
  s03(ctx, t, q) { bg(ctx, 'schema');
    bureau3(ctx, 960, 650, { t });
    const M = q.on('monsters', 1);
    rek3(ctx, 872, 612, 6, 1, M);
    sam3(ctx, 450, t, { kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Sam', 'meeloopweek · dag 3', 450, 400, 1, 'center');
    kim3(ctx, 1470, t, { kijk: -1, pose: M > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1470, 404, q.on('Kim', 1, 0.3), 'center');
    // 'ziet nooit wie wie besmette'
    const N = q.on('nooit', 1) * (1 - 0.65 * M); pop3(ctx, 1690, 300, 84, ZORG, { a: N }); pop3(ctx, 1830, 300, 84, ZORG, { a: N }); pijl(ctx, 1722, 262, 1796, 262, C.line, N, 3, 14); vraagteken(ctx, 1760, 220, N, 60);
    naamBij(ctx, 'monsters', 'erfelijk materiaal van het virus', 960, 730, M, 'center'); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    buis3(ctx, 250, 560, 0.95, 1); naamBij(ctx, 'wattenstaafje', 'in een buisje', 250, 790, 1, 'center');
    const Z = q.on('coronavirus', 1, 0.8);
    zoomCircle(ctx, 700, 450, 230, 262, 690, 'VERGROOT · VIRUSDEELTJE · SCHEMATISCH', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(460, 210, 480, 480); corona3(ctx, 700, 450, 140, { t, rna: q.on('RNA', 1), hlRna: q.on('RNA', 1) * (1 - q.on('schrijft', 1)) }); });
    naamBij(ctx, 'RNA', 'ongeveer 30 000 letters', 700, 170, q.on('RNA', 1), 'center');
    // rechts: RNA → DNA → stukjes → machine
    const R = q.on('schrijft', 1), K = q.on('kopieert', 1), L = q.on('machine', 1);
    streng3(ctx, 1090, 250, 640, 'rna', { a: Math.max(R, q.on('RNA', 1) * 0.0), t }); naamBij(ctx, 'RNA', '', 1070, 260, R, 'right');
    pijl(ctx, 1410, 290, 1410, 360, C.line, R, 3, 14); m3(ctx, 'omschrijven', 1440, 336, R, C.grain, 'left', 24);
    streng3(ctx, 1090, 420, 640, 'dna', { a: R, t, p: clamp((t - q.at('schrijft', 1)) / 1.2, 0, 1) }); naamBij(ctx, 'DNA', '', 1070, 430, R, 'right');
    stukjes3(ctx, 1090, 540, 12, { a: K, aan: clamp((t - q.at('kopieert', 1)) / 2, 0, 1), w: 120 });
    m3(ctx, 'stukjes van een paar honderd letters', 1090, 670, q.on('honderd', 1), C.grain, 'left', 24);
    machine3(ctx, 1600, 790, 0.75, { a: L, t, leest: clamp((t - q.at('machine', 1)) / 1.4, 0, 1) }); naamBij(ctx, 'leesmachine', '', 1400, 800, L, 'right'); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const S = q.on('sequentie', 1), V = q.on('volgorde', 1);
    venster3(ctx, 150, 170, 1620, 520, 'uitlijnen · referentiegenoom', { a: 1 }, () => {
      const X0 = 400, w = 38, g = 6;
      m3(ctx, 'referentie', 180, 312, 1, C.text2, 'left', 22);
      rij3(ctx, X0, 280, SEQ3, { modus: 'grijs', w, gap: g });
      // stukjes schuiven van onder naar hun plek onder de referentie
      const P = q.on('langs', 1, 1.6);
      STUK3.forEach(([a, b], i) => { const u = clamp(P * 1.6 - i * 0.15, 0, 1); const yy = lerp(600 - (i % 2) * 60, 380 + (i % 2) * 64, ease(u)); const xx = X0 + a * (w + g) + (1 - ease(u)) * ((i - 2) * 60);
        rij3(ctx, xx, yy, SEQ3B.slice(a, b), { a: 1 - S, w, gap: g }); });
      if (S > 0.01) { m3(ctx, 'sequentie', 180, 446, S, C.text2, 'left', 22); rij3(ctx, X0, 414, SEQ3B, { a: S, w, gap: g, modus: V > 0.5 ? 'grijs' : 'kleur', goud: V > 0.5 ? [17] : [] }); }
      if (V > 0.01) { m3(ctx, 'ander monster', 180, 566, V, C.text2, 'left', 22); rij3(ctx, X0, 534, SEQ3, { a: V, w, gap: g, modus: 'grijs', goud: [17] }); }
    });
    naamBij(ctx, 'sequentie', 'de volgorde van alle letters', 960, 760, S, 'center'); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    // keten van besmettingen: telpoppetjes met elk een genoombalkje; gouden streepje = mutatie (niet bij elke sprong)
    const N = 7, X = i => 240 + i * 240, Y = 600; const MU = [[], [], [0.34], [0.34], [0.34], [0.34, 0.71], [0.34, 0.71]];
    const loop = clamp((t - q.at('kopie', 1)) / 7, 0, 1), F = q.on('fout', 1);
    for (let i = 0; i < N; i++) { const al = i === 0 ? 1 : clamp(loop * (N - 1) - (i - 1), 0, 1); if (al <= 0) continue;
      pop3(ctx, X(i), Y, 120, ZORG, { a: al }); if (i < N - 1) pijl(ctx, X(i) + 50, Y - 60, X(i + 1) - 50, Y - 60, C.line, clamp(loop * (N - 1) - i, 0, 1), 3, 12);
      ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, X(i) - 80, Y - 230, 160, 26, 8); shape(ctx, rgba(C.paars, 0.35), C.paars, 1.5);
      MU[i].forEach((m, j) => { const ga = (j === 0 ? Math.max(F, i > 2 ? 1 : 0) : 1); ctx.save(); ctx.globalAlpha *= ga; ctx.fillStyle = C.goud; ctx.fillRect(X(i) - 80 + m * 160, Y - 236, 10, 38); ctx.restore(); }); ctx.restore(); }
    m3(ctx, 'virus van persoon naar persoon', 240, 260, 1, C.grain, 'left', 26);
    naamBij(ctx, 'mutatie', 'een kopieerfout', X(2) - 25, Y - 310, q.on('mutatie', 1), 'center', C.goud);
    const K = q.on('gemiddeld', 1); klokje(ctx, 1640, 250, 56, 0.5, K); m3(ctx, 'ongeveer 2 per maand', 1560, 245, K, C.text, 'right', 26); m3(ctx, 'gemiddeld', 1560, 285, K, C.grain, 'right', 24);
    m3(ctx, 'gemeten', 1640, 350, q.on('gemeten', 1), C.groen, 'center', 24); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    const A = q.on('medewerker', 1, 0.3), W = q.on('week', 1), Lz = q.on('lezen', 1);
    pop3(ctx, 360, 520, 150, ZORG, { a: A }); pop3(ctx, 620, 520, 150, ZORG, { a: A }); pijl(ctx, 420, 430, 560, 430, C.line, A, 3, 14); m3(ctx, 'besmet', 490, 400, A, C.grain, 'center', 24);
    klokje(ctx, 870, 440, 50, 0.25, W); m3(ctx, 'een week later', 870, 530, W, C.grain, 'center', 24);
    buis3(ctx, 1080, 470, 0.5, Lz); buis3(ctx, 1170, 470, 0.5, Lz);
    venster3(ctx, 1290, 300, 520, 330, 'twee virussen', { a: Lz }, () => { rij3(ctx, 1320, 400, SEQ3.slice(0, 10), { w: 40, modus: 'kleur' }); rij3(ctx, 1320, 480, SEQ3.slice(0, 10), { w: 40, modus: 'kleur', a: 0.5 }); });
    vraagteken(ctx, 1550, 790, q.on('Hoeveel', 1), 110); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    venster3(ctx, 150, 170, 1620, 360, 'medewerker · collega', { a: 1 }, () => {
      const off = (t * 60) % 46; m3(ctx, 'medewerker', 180, 306, 1, C.text2, 'left', 22); m3(ctx, 'collega', 180, 406, 1, C.text2, 'left', 22);
      for (let k = 0; k < 2; k++) { const seq = (SEQ3 + SEQ3 + SEQ3).slice(0, 80); const gx = 1150 - ((t * 60) % 3000);
        for (let i = 0; i < 40; i++) { const x = 400 + i * 46 - off; if (x < 360 || x > 1740) continue; const idx = i + Math.floor(t * 60 / 46); const isG = k === 1 && idx % 61 === 23;
          tegel3(ctx, x, 270 + k * 100, seq[idx % seq.length], { modus: isG ? 'goud' : 'grijs' }); } } });
    naamBij(ctx, 'meestal geen letter, of maar een paar', '', 960, 600, q.on('meestal', 1), 'center', C.groen);
    // maandbalk: twee mutaties per maand, één week is kort
    const M = q.on('gemiddelde', 1);
    ctx.save(); ctx.globalAlpha *= M; roundRect(ctx, 360, 690, 1200, 50, 12); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5);
    for (let i = 1; i < 4; i++) { ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(360 + i * 300, 690); ctx.lineTo(360 + i * 300, 740); ctx.stroke(); }
    [0.42, 0.83].forEach(f => { ctx.fillStyle = C.goud; ctx.fillRect(360 + f * 1200 - 5, 682, 10, 66); });
    const Wk = q.on('kort', 1); if (Wk > 0.01) { ctx.globalAlpha *= Wk; roundRect(ctx, 360, 690, 300, 50, 12); shape(ctx, rgba(C.teal, 0.3), C.teal, 3); }
    ctx.restore(); m3(ctx, 'een maand · gemiddeld 2 mutaties', 360, 676, M, C.grain, 'left', 24); m3(ctx, 'een week', 510, 790, q.on('kort', 1), C.teal, 'center', 24); },

  // ---------- H2 Zelf een stamboom bouwen ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    const B = q.on('bedacht', 1, 0.4), P = q.on('Sam', 1, 0.5);
    tag(ctx, 'Evolutie 7: verschillen tellen', 960, 140, C.paars, 1 - P, 'center', 32);
    bedacht3(ctx, B);
    const Vp = q.on('verpleegkundigen', 1), Pa = q.on('patiënt', 1), An = q.on('ander', 1);
    plattegrond3(ctx, { a: P, tx: 20, ty: 10, sc: 0.95, t, mon: q.on('vijf', 1), hl: { A: Vp * (1 - Pa), C: Vp * (1 - Pa), E: Pa * (1 - An), B: An }, extra: () => {
      naamBij(ctx, 'verpleegkundigen', '', 285, 700, Vp, 'center'); naamBij(ctx, 'patiënt', '', 540, 700, Pa, 'center'); naamBij(ctx, 'ander ziekenhuis', '', 870, 576, An, 'center'); } });
    const L = q.on('vijf', 1);
    venster3(ctx, 1110, 220, 420, 360, 'vijf sequenties', { a: L }, () => { 'ABCDE'.split('').forEach((k, i) => { mon3(ctx, 1150, 312 + i * 54, k, { r: 20 }); rij3(ctx, 1190, 290 + i * 54, SEQ3.slice(3, 10), { w: 36, h: 42, px: 24, gap: 6, modus: 'grijs', goud: [[], [], [2], [5], [2]][i] }); }); });
    sam3(ctx, 1700, t, { kijk: -1, pose: L > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Sam', '', 1700, 410, 1, 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    plattegrond3(ctx, { tx: -40, ty: 90, sc: 0.8, t });
    const T = q.on('tabel', 1, 0.5);
    tabel3(ctx, 1260, 300, ['A', 'B', 'C', 'D', 'E'], { a: T, vul: clamp((t - q.at('tabel', 1)) / 1.6, 0, 1),
      hl: { 'A|B': [C.goud, q.on('nul', 1)], 'C|E': [C.goud, q.on('twee', 1)], 'A|D': [C.oker, q.on('zes', 1)], 'B|D': [C.oker, q.on('zes', 1)], 'C|D': [C.oker, q.on('zes', 1)], 'D|E': [C.oker, q.on('zes', 1)] } });
    m3(ctx, 'aantal verschillen per paar', 1260, 790, T, C.grain, 'left', 24); },

  s12(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const S = [q.on('Stap', 1, 0.4), q.on('Stap', 2, 0.4), q.on('Herhaal', 1, 0.4)];
    m3(ctx, 'algoritme · vast stappenplan', 120, 230, q.on('algoritme', 1), C.goud, 'left', 26);
    ['hang het paar met de minste verschillen aan één vertakking', 'doe alsof dat paar één monster is', 'herhaal tot alles aan elkaar hangt'].forEach((s, i) => { ctx.save(); ctx.globalAlpha *= S[i]; circ(ctx, 150, 310 + i * 150, 28, rgba(C.goud, 0.2), C.goud, 2); text(ctx, String(i + 1), 150, 322 + i * 150, fTekst(34, 800), C.goud, 'center');
      ctx.font = fTekst(36, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, s, 200, 322 + i * 150, 600, 44); ctx.restore(); });
    const M = q.on('alsof', 1, 0.8);
    tabel3(ctx, 960, 300, ['A', 'B', 'C', 'D', 'E'], { a: 1 - M, hl: { 'A|B': [C.goud, q.on('minste', 1)] } });
    tabel3(ctx, 960, 300, ['A-B', 'C', 'D', 'E'], { a: M });
    boom3(ctx, 1460, 790, 340, 300, { r: 22, lw: 4, kleur: 0, g1: q.on('vertakking', 1, 1), g2: 0, g3: 0, g4: 0 }); m3(ctx, 'stamboom', 1630, 430, q.on('vertakking', 1), C.grain, 'center', 24); },

  s13(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    tabel3(ctx, 960, 300, ['A-B', 'C', 'D', 'E'], {});
    boom3(ctx, 1460, 790, 340, 300, { r: 22, lw: 4, kleur: 0, g1: 1, g2: 0, g3: 0, g4: 0 }); m3(ctx, 'stamboom', 1630, 430, 1, C.grain, 'center', 24);
    vraagteken(ctx, 480, 600, q.on('daarna', 1), 160); },

  s15(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const K = q.on('kleinste', 1), D = q.on('blijven', 1, 0.8), Sa = q.on('samen', 1);
    antwRegel3(ctx, 'het paar C-E, met twee verschillen', K);
    const CE = Math.max(...[1, 2, 3].map(n => q.on('C-E', n, 0.3) * (1 - clamp((t - q.at('C-E', n) - 1.2) / 0.4, 0, 1))));
    const V5 = q.on('vijf,', 1);
    tabel3(ctx, 740, 340, ['A-B', 'C', 'D', 'E'], { a: 1 - D, hl: { 'C|E': [C.goud, K] }, paar: true, c: 140 });
    tabel3(ctx, 740, 340, ['A-B', 'C-E', 'D'], { a: D, c: 140, hl: { 'A-B|C-E': [C.goud, Math.max(V5, Sa)] }, paar: true, paarHl: { 'C-E': CE } });
    tag(ctx, 'werkplek telt niet mee', 300, 330, C.koraal, q.on('werkt', 1), 'center', 32);
    tag(ctx, 'collega’s A en C: 5 verschillen', 300, 420, C.koraal, q.on('collega', 1), 'center', 32);
    boom3(ctx, 1360, 790, 440, 400, { r: 24, lw: 4, kleur: 0, g1: 1, g2: q.on('kleinste', 1, 1), g3: q.on('samen', 1, 1), g4: q.on('laatste', 1, 1), paarLabels: 1, hl: { g2: CE > 0.5 ? C.goud : null } }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const P = boom3(ctx, 380, 700, 800, 430, { r: 34, kleur: 1, t });
    m3(ctx, 'stamboom (fylogenetische boom) · vereenvoudigd', 780, 220, 1, C.grain, 'center', 26);
    tag(ctx, 'lezen: Evolutie 8, Stambomen lezen', 1560, 400, C.paars, q.on('lezen', 1), 'center', 28);
    m3(ctx, 'echte programma’s rekenen slimmer', 1560, 520, q.on('slimmer', 1), C.grain, 'center', 22);
    haak(ctx, 340, 620, 750, 'weinig verschil: nauw verwant', C.groen, q.on('weinig', 1)); },

  // ---------- H3 Hoe zeker is die boom? ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const F = q.on('letter', 1);
    sam3(ctx, 330, t, { kijk: 1, pose: 'denk', uit: 'denkt' }); naamBij(ctx, 'Sam', '', 330, 400, 1, 'center');
    boom3(ctx, 760, 760, 560, 420, { r: 28, kleur: 1, t, wiebel: F * (0.5 + 0.5 * Math.sin(t * 1.3)) });
    const fk = F > 0.01 ? (Math.sin(t * 5) > 0 ? 1 : 0) : 0;
    mon3(ctx, 1460, 362, 'C', { r: 20 }); mon3(ctx, 1460, 442, 'E', { r: 20 });
    rij3(ctx, 1500, 340, 'GATCCAGT', { w: 40, modus: 'grijs', goud: [2] }); rij3(ctx, 1500, 420, 'GAACCTGT', { w: 40, modus: 'grijs', goud: [2, 5], flikker: 5, fk });
    m3(ctx, 'twee verschillen', 1680, 520, 1, C.grain, 'center', 22);
    naamBij(ctx, 'één letter kan de boom omgooien', '', 1680, 620, F, 'center', C.koraal); },

  s18(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const M = q.on('mutatie', 1), Fa = q.on('familie', 1), L = q.on('leesfout', 1);
    const P = boom3(ctx, 200, 760, 560, 420, { r: 28, kleur: 1, t, monHl: { B: M, D: M } });
    mon3(ctx, 920, 362, 'B', { r: 20 }); mon3(ctx, 920, 442, 'D', { r: 20 });
    rij3(ctx, 960, 340, 'CTAGGATC', { w: 40, modus: 'grijs', goud: M > 0.5 ? [4] : [] }); rij3(ctx, 960, 420, 'GTCGGATA', { w: 40, modus: 'grijs', goud: M > 0.5 ? [4] : [] });
    m3(ctx, 'dezelfde letter, los van elkaar', 1140, 520, M, C.goud, 'center', 22);
    boogPijl3(ctx, P.X.B, 700, P.X.D, 700, 0.25, C.koraal, Fa, { dash: true, lw: 3 }); boogPijl3(ctx, P.X.D, 700, P.X.B, 700, -0.25, C.koraal, Fa, { dash: true, lw: 3 });
    tag(ctx, 'lijken familie', P.X.D + 190, 720, C.koraal, Fa, 'center', 30);
    kaartje3(ctx, 'leesfout van de machine', 1260, 600, L, C.koraal);
    tegel3(ctx, 1280, 680, 'G', { a: L, modus: 'goud', vraag: L }); m3(ctx, 'nepverschil', 1350, 714, L, C.koraal, 'left', 22);
    machine3(ctx, 1720, 730, 0.55, { a: L, t, leest: 1 }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const KO = q.on('kolommen', 1), Lo = q.on('loten', 1), Te = q.on('terug', 1), Ev = q.on('evenveel', 1), Tw = q.on('Sommige', 1), Nb = q.on('nieuwe', 1), Hd = q.on('honderden', 1), Hb = q.on('herbemonsteren', 1);
    const fade = 1 - Hd;   // keuring: beeld in twee delen; deel 1 (trekken) gaat helemaal weg voor deel 2 (de stapel boompjes)
    m3(ctx, 'uitlijning (uitsnede)', 230, 216, 1, C.grain, 'left', 22);
    ctx.save(); ctx.globalAlpha *= fade; kolommen3(ctx, 260, 240, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], { w: 32, gap: 8, hl: KO > 0.5 && Tw < 0.5 ? [3] : [] }); ctx.restore();
    bak3(ctx, 900, 430, 0.7, fade * Math.max(0.35, Lo));
    // één lot: uit de bak, overschrijven, terug
    const up = clamp((t - q.at('loten', 1)) / 1.0, 0, 1), dn = clamp((t - q.at('terug', 1)) / 1.0, 0, 1); const ly = lerp(400, 220, ease(up)) + lerp(0, 180, ease(dn));
    if (Lo > 0.01 && dn < 1) lot3(ctx, 900, ly, 3, { a: Lo * (1 - dn) * fade, s: 0.8 });
    m3(ctx, 'trekken · overschrijven · terugleggen', 900, 560, Lo * fade, C.grain, 'center', 22);
    const RS = [0, 0, 2, 3, 4, 4, 6, 7, 9, 9];
    const n = clamp((t - q.at('trekt', 2)) / 2.5, 0, 1) * 10;
    ctx.save(); ctx.globalAlpha *= fade; kolommen3(ctx, 1200, 240, RS, { w: 32, gap: 8, n: Math.max(n, Te > 0.5 ? 1 : 0), namen: 0, hl: Tw > 0.5 ? [0, 1, 4, 5, 8, 9] : [] }); ctx.restore();
    m3(ctx, 'evenveel kolommen als het origineel', 1400, 216, Ev * fade, C.teal, 'center', 22);
    m3(ctx, 'sommige dubbel, andere weg', 1400, 540, Tw * fade, C.teal, 'center', 22);
    boompje3(ctx, 1730, 420, 1.2, 0, Nb * fade);
    // stapel boompjes: honderden keren
    const V = [0, 0, 1, 0, 0, 2, 0, 0, 1, 0]; const nh = clamp((t - q.at('honderden', 1)) / 2.4, 0, 1) * V.length;
    V.forEach((v, i) => boompje3(ctx, 330 + (i % 5) * 315, 470 + Math.floor(i / 5) * 230, 1.35, v, clamp(nh - i, 0, 1)));
    m3(ctx, 'honderden keren, steeds een nieuwe trekking', 960, 790, Hd, C.grain, 'center', 24);
    regel(ctx, 'herbemonsteren · bootstrappen', 960, 250, Hb, C.goud, 44, 'center', 700); },

  s20(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const S = (q.on('altijd', 1) + q.on('acht', 1) + q.on('zes', 1)) / 3;
    boom3(ctx, 360, 760, 720, 470, { r: 34, kleur: 1, t, steun: S, hlSteun: [q.on('altijd', 1) * (1 - q.on('acht', 1)), q.on('acht', 1) * (1 - q.on('zes', 1)), q.on('zes', 1)] });
    m3(ctx, 'hoe vaak komt elk groepje terug?', 720, 220, q.on('telt', 1), C.grain, 'center', 26);
    // keuring: de getallen zijn de uitkomst van een berekening (werk/bootstrap_sim.py: 0,99 · 0,85 · 0,58)
    const Rk = q.on('telt', 1, 0.6); regel(ctx, 'reken je het uit, dan …', 1280, 400, Rk, C.text, 40, 'left', 600);
    kaartje3(ctx, 'eigen berekening, vereenvoudigd', 1280, 440, Rk, C.grain); },

  s21(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    boom3(ctx, 360, 760, 720, 470, { r: 34, kleur: 1, t, steun: 1, hlSteun: [0, 0, 1] });
    m3(ctx, 'eigen berekening, vereenvoudigd', 1700, 820, 1, C.grain, 'right', 22);
    vraagteken(ctx, 1450, 520, q.on('betekent', 1), 140); },

  s23(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const W = q.on('wankel', 1), Ho = q.on('hoog', 1), Bw = q.on('bewijst', 1);
    antwRegel3(ctx, 'die tak staat wankel', W);
    boom3(ctx, 360, 760, 720, 470, { r: 34, kleur: 1, t, steun: 1, wankel: W, hlSteun: [Ho, 0, W * (1 - Ho)] });
    m3(ctx, 'eigen berekening, vereenvoudigd', 1700, 820, 1, C.grain, 'right', 22);
    naamBij(ctx, 'hoog getal', 'de data geven steeds dit groepje', 1180, 420, Ho, 'left');
    kaartje3(ctx, 'geen bewijs dat de boom juist is', 1180, 520, Bw, C.koraal); },

  // ---------- H4 Wie besmette wie, en waar houdt dat op? ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const G = q.on('precies', 1), D = q.on('eerder', 1);
    plattegrond3(ctx, { tx: 400, ty: 20, sc: 0.95, t, wie: G > 0.5 ? 'AB' : 'ABCDE', col: { A: G > 0.5 ? C.teal : null, B: G > 0.5 ? C.teal : null }, hl: { A: G, B: G }, extra: (B) => {
      tag(ctx, 'positief: dag 1', PL3.A[0] + 40, 642, C.groen, D, 'center', 28); tag(ctx, 'positief: dag 3', 1160, 420, C.groen, q.on('dan', 1), 'center', 28); } });
    naamBij(ctx, 'hetzelfde virus', '', 1560, 300, G, 'left', C.teal); },

  s25(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    plattegrond3(ctx, { tx: 400, ty: 20, sc: 0.95, t, wie: 'AB', col: { A: C.teal, B: C.teal }, hl: { A: 1, B: 1 }, extra: (B) => {
      tag(ctx, 'positief: dag 1', PL3.A[0] + 40, 642, C.groen, 1, 'center', 28); tag(ctx, 'positief: dag 3', 1160, 420, C.groen, 1, 'center', 28); } });
    vraagteken(ctx, 1620, 560, q.on('zegt', 1), 140); },

  s27(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const Nv = q.on('verwant', 1), Bs = q.on('besmet', 1), Kl = q.on('dagen', 1), Br = q.on('bron', 1), Og = q.on('ongeteste', 1), Gm = q.on('gemeten', 1);
    antwRegel3(ctx, 'hun virussen zijn familie', Nv * (1 - Br));
    const x0 = 1000, pd = 110, sh = 1 - 0.0 * Br;
    mon3(ctx, 150, 290, 'A', { r: 28, col: C.teal }); mon3(ctx, 150, 470, 'B', { r: 28, col: C.teal });
    tijdlijn3(ctx, x0, 290, pd, { b: -4, k: -1, t: 1 }, { pB: Bs, pK: Kl, pT: 1, van: -7, tot: 5 });
    tijdlijn3(ctx, x0, 470, pd, { b: -6, k: 2, t: 3 }, { pB: Bs, pK: Kl, pT: 1, van: -7, tot: 5 });
    m3(ctx, 'dag 1', x0 + 1 * pd, 250, 1, C.groen, 'center', 22); m3(ctx, 'dag 3', x0 + 3 * pd, 430, 1, C.groen, 'center', 22);
    naamBij(ctx, 'eerder besmet, later getest', '', 230, 578, Bs * clamp((t - q.at('besmet', 1) - 0.8) / 0.6, 0, 1), 'left', C.koraal);
    // dezelfde bron via ongeteste mensen (keuring: echte mensen; 'niet getest' = gestippeld kader + label)
    const Y = 880; if (Br > 0.01) { ctx.save(); ctx.globalAlpha *= Br; circ(ctx, 960, 640, 22, rgba(C.koraal, 0.35), C.koraal, 2); ctx.restore(); } m3(ctx, 'dezelfde bron?', 960, 604, Br, C.grain, 'center', 22);
    if (Br > 0.01) { mens3(ctx, 'A', 380, Y, 220, { t, a: Br, kijk: 1 }); mens3(ctx, 'B', 1540, Y, 220, { t, a: Br, kijk: -1 }); mon3(ctx, 300, 690, 'A', { r: 22, col: C.teal, a: Br }); mon3(ctx, 1620, 690, 'B', { r: 22, col: C.teal, a: Br }); }
    nietGetest3(ctx, 'passant', 700, Y, 190, { t, a: Og, kijk: -1, label: false }); nietGetest3(ctx, 'buurvrouw', 1220, Y, 180, { t, a: Og, kijk: 1, outfit: 'buiten', label: false });
    boogPijl3(ctx, 935, 655, 750, 690, 0.12, rgba(C.line, 0.9), Og, { dash: true, lw: 3 }); boogPijl3(ctx, 985, 655, 1170, 690, -0.12, rgba(C.line, 0.9), Og, { dash: true, lw: 3 });
    boogPijl3(ctx, 640, 760, 460, 760, 0.2, rgba(C.line, 0.9), Og, { dash: true, lw: 3 }); boogPijl3(ctx, 1280, 760, 1460, 760, -0.2, rgba(C.line, 0.9), Og, { dash: true, lw: 3 });
    m3(ctx, 'niet getest', 960, 820, Og, ZORG, 'center', 24);
    kaartje3(ctx, 'boom: alleen wie gemeten is', 1500, 560, Gm, C.grain); },

  s28(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    const A1 = q.on('verpleegkundige', 1), A2 = q.on('haar', 1), A3 = q.on('anders', 1), Al = q.on('past', 1), Ri = q.on('richting', 1), Sc = q.on('schuld', 1);
    mens3(ctx, 'C', 620, 860, 330, { t, kijk: 1 }); mon3(ctx, 620, 470, 'C', { r: 28, col: C.paars }); naamBij(ctx, 'verpleegkundige', '', 500, 640, 1, 'right');
    mens3(ctx, 'E', 1300, 860, 320, { t, kijk: -1 }); mon3(ctx, 1300, 530, 'E', { r: 28, col: C.paars }); naamBij(ctx, 'patiënt', '', 1430, 640, 1, 'left');
    boogPijl3(ctx, 720, 490, 1200, 490, -0.12, C.goud, A1, { lw: 4, p: clamp((t - q.at('verpleegkundige', 1)) / 0.8, 0, 1) });
    boogPijl3(ctx, 1200, 590, 720, 590, -0.08, C.goud, A2, { lw: 4, p: clamp((t - q.at('haar', 1)) / 0.8, 0, 1) });
    nietGetest3(ctx, 'passant', 960, 880, 300, { t, a: A3, label: false }); m3(ctx, 'iemand anders · niet getest', 960, 548, A3, C.grain, 'center', 22);
    const p3 = clamp((t - q.at('anders', 1)) / 0.8, 0, 1); boogPijl3(ctx, 880, 700, 740, 660, 0.1, C.goud, A3, { lw: 4, p: p3 }); boogPijl3(ctx, 1040, 700, 1180, 660, -0.1, C.goud, A3, { lw: 4, p: p3 });
    m3(ctx, 'twee letters verschil', 960, 330, 1, C.grain, 'center', 22);
    haak(ctx, 560, 1360, 170, 'boom = verwantschap · richting hier niet te zien', C.groen, Ri);
    tag(ctx, 'en geen schuld', 1640, 500, C.text2, Sc, 'center', 32); },

  s29(ctx, t, q) { bg(ctx, 'schema'); bedacht3(ctx);
    boom3(ctx, 1000, 760, 340, 320, { r: 22, lw: 4, kleur: 1, t });
    const G = q.on('gesprekken', 1);
    lijst3(ctx, 200, 260, ['werkplek', 'eerste klachten', 'waar geweest'], [q.on('werkte', 1), q.on('klachten', 1), q.on('geweest', 1)], G, 620);
    kim3(ctx, 1620, t, { kijk: -1, pose: G > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Dr. Kim', '', 1620, 404, 1, 'center');
    m3(ctx, 'boom + gesprekken', 1170, 300, G, C.goud, 'center', 24); },

  s30(ctx, t, q) { bg(ctx, 'schema');
    kaartje3(ctx, 'maart 2020 · echte studie', 60, 74, 1, C.goud);
    [600, 960, 1320].forEach(x => zh3(ctx, x, 320, 0.45, 1)); naamBij(ctx, 'drie ziekenhuizen in Brabant', '', 960, 384, 1, 'center');
    const T = q.on('vijftig', 1); tag(ctx, 'vijftig medewerkers · tien patiënten', 960, 470, C.text2, T, 'center', 32);
    const G = q.on('groepen', 1);
    GRP3.forEach((c, i) => groep3(ctx, 420 + i * 380, 610, c, { a: G, aan: clamp((t - q.at('groepen', 1)) / 1.2 - i * 0.3, 0, 1) }));
    huis3(ctx, 1560, 660, 0.45, q.on('daarbuiten', 1));
    naamBij(ctx, 'elke groep: in meer dan één ziekenhuis', '', 800, 770, q.on('meer', 1), 'center');
    m3(ctx, 'zelfde virussen ook', 1590, 740, q.on('daarbuiten', 1), C.grain, 'center', 22); m3(ctx, 'buiten de ziekenhuizen', 1590, 772, q.on('daarbuiten', 1), C.grain, 'center', 22);
    const Co = q.on('collega', 1);
    if (Co > 0.01) { ctx.save(); ctx.globalAlpha *= Co; roundRect(ctx, 1690, 440, 200, 200, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.restore(); m3(ctx, 'één afdeling', 1790, 480, Co, C.grain, 'center', 20);
      pop3(ctx, 1750, 610, 100, GRP3[0], { a: Co }); pop3(ctx, 1830, 610, 100, GRP3[1], { a: Co }); } },

  s31(ctx, t, q) { bg(ctx, 'schema');
    kaartje3(ctx, 'maart 2020 · echte studie', 60, 74, 1, C.goud);
    [600, 960, 1320].forEach(x => zh3(ctx, x, 320, 0.45, 1)); naamBij(ctx, 'drie ziekenhuizen in Brabant', '', 960, 384, 1, 'center');
    GRP3.forEach((c, i) => groep3(ctx, 420 + i * 380, 610, c, {}));
    naamBij(ctx, 'elke groep: in meer dan één ziekenhuis', '', 800, 770, 1, 'center');
    huis3(ctx, 1590, 640, 0.45, 1); m3(ctx, 'zelfde virussen ook', 1590, 740, 1, C.grain, 'center', 22); m3(ctx, 'buiten de ziekenhuizen', 1590, 772, 1, C.grain, 'center', 22);
    vraagteken(ctx, 1590, 520, q.on('besmet', 1), 120); },

  s33(ctx, t, q) { bg(ctx, 'schema');
    kaartje3(ctx, 'maart 2020 · echte studie', 60, 74, 1, C.goud);
    const B = q.on('buiten', 1), U = q.on('uitgesloten', 1);
    antwRegel3(ctx, 'vooral buiten het werk', B, 175);
    ctx.save(); ctx.setLineDash([12, 10]); roundRect(ctx, 120, 260, 900, 560, 24); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.restore();
    naamBij(ctx, 'buiten de ziekenhuizen', '', 150, 310, 1, 'left');
    huis3(ctx, 230, 760, 0.4); huis3(ctx, 900, 430, 0.4);
    const HZ = [[1300, 380], [1560, 380], [1820, 380]];
    HZ.forEach(([x, y]) => zh3(ctx, x, y, 0.38, 1));
    GRP3.forEach((c, i) => { const gx = 330 + i * 250, gy = 540 + (i % 2) * 90; groep3(ctx, gx, gy, c, {});
      HZ.forEach(([x, y]) => { ctx.save(); ctx.globalAlpha *= 0.55 * B; ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx + 70, gy); ctx.quadraticCurveTo((gx + x) / 2, gy - 120, x - 40, y + 20); ctx.stroke(); ctx.restore(); }); });
    zh3(ctx, 1560, 760, 0.3, U); vraagteken(ctx, 1680, 760, U, 80);
    m3(ctx, 'niet uitgesloten · niet de grote route', 1560, 840, U, C.grain, 'center', 22); },

  // ---------- Recap ----------
  s34(ctx, t, q) { bg(ctx, 'schema');
    const R = q.on('buiten', 1), Bo = q.on('stamboom', 1), He = q.on('Herbemonsteren', 1), Ge = q.on('gesprekken', 1);
    kaartje3(ctx, 'maart 2020 · echte studie', 120, 180, 1, C.goud);
    // bronkaartje (keuring: de bron alleen hier, aan het eind)
    kaartje3(ctx, 'bron: Sikkema e.a., Lancet Infect Dis 2020', 120, 820, Bo, C.grain);
    ctx.save(); ctx.setLineDash([12, 10]); roundRect(ctx, 120, 250, 700, 380, 24); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.restore();
    GRP3.forEach((c, i) => groep3(ctx, 250 + i * 220, 430 + (i % 2) * 70, c, {}));
    naamBij(ctx, 'vooral van buiten', '', 470, 600, R, 'center', C.groen);
    bedacht3(ctx, Bo, 1000, 180);
    boom3(ctx, 1040, 640, 640, 300, { r: 26, lw: 4, kleur: 1, t, steun: He, g1: 1, g2: 1, g3: 1, g4: 1, a: Math.max(0.25, Bo) });
    tag(ctx, 'wie het aan wie gaf: gesprekken nodig', 960, 760, C.goud, Ge, 'center', 32); },

  s35(ctx, t, q) { bg(ctx, 'schema');
    opl3(ctx, 140, 200, 780, 'hbo · 4 jaar', 'Bio-informatica', 'HAN · Nijmegen', q.on('hbo', 1), C.groen);
    opl3(ctx, 1000, 200, 780, 'wo · bachelor → master', 'Biologie → Bioinformatics', 'Radboud Nijmegen → Wageningen', q.on('bachelor', 1), C.groen); m3(ctx, 'of moleculaire levenswetenschappen', 1028, 410, q.on('moleculaire', 1), C.grain, 'left', 24);
    const W = q.on('werkt', 1);
    [['ziekenhuis', 560], ['instituut', 960], ['bedrijf', 1360]].forEach(([s, x], i) => { const a = clamp(W * 3 - i * 0.6, 0, 1); werkIcoon3(ctx, x, 520, s, a); naamBij(ctx, ['ziekenhuis', 'onderzoeksinstituut', 'bedrijf'][i], '', x, 640, a, 'center'); });
    kaartje3(ctx, 'RIVM · elke week de varianten', 760, 730, q.on('RIVM', 1), C.teal); }
});

// antwoordregel na een vraag: "antwoord: <inhoud>" zonder letter (de monsters heten A–E). Bij Vragen uit laat antwoordtekst.py alleen de inhoud staan.
// De inhoud begint nooit met een losse letter A–D: die regex leest 'antwoord: C en E' als antwoordletter c.
function antwRegel3(ctx, s, a = 1, y = 175) { regel(ctx, 'antwoord: ' + s, 120, y, a, C.groen, 40, 'left', 700); }
