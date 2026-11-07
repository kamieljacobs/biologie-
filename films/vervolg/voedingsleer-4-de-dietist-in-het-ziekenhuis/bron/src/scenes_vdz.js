// Wat word jij? · Voeding en diëtetiek 4 · Eten als behandeling: de diëtist in het ziekenhuis — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Diëtist Hanneke in het ziekenhuis, Noor, Mevrouw Jansen als patiënt, Erik naamloos als nierpatiënt, Verpleegkundige Jesse, Fysiotherapeut Femke).
// Decor 'ziekenhuis' (ziekenhuiskamer) alleen in H1, het begin van H3 en de kamerscènes van H4; de gang (cold open, recap) en alle uitleg op navy.
// Rode draad: het dienblad uit kamer 12 (MA · DI · WO vol, in de recap leeg).

function kamer(ctx, a = 0.6) { decor(ctx, 'ziekenhuis', a); }
function gang(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; for (const x of [140, 760, 1380]) { roundRect(ctx, x, 250, 300, 612, 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 250, 560); ctx.lineTo(x + 250, 600); ctx.stroke(); } ctx.restore(); vloer(ctx, 862); }
function hanneke(ctx, x, t, o = {}) { const k = o.kijk || -1, r = persoon(ctx, 'hanneke', x, GROND, o.h || 480, { t, kijk: k, uit: o.uit || 'blij', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold }); naamkaartje(ctx, r, k, o.a == null ? 1 : o.a); return r; }
function noor(ctx, x, t, o = {}) { return persoon(ctx, 'noor', x, GROND, o.h || 455, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function schriftje(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.2); roundRect(ctx, -26, -34, 52, 68, 4); shape(ctx, '#5B7FA8', '#86A6CC', 1.5); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-20, -28, 40, 6); ctx.restore(); }
function zoomOpen(ctx, u, fn) { bg(ctx, 'schema'); if (u <= 0.01) return; const R = lerp(0, 1150, ease(u)); ctx.save(); ctx.beginPath(); ctx.arc(960, 520, R, 0, 6.283); ctx.clip(); fn(); ctx.restore();
  if (u < 0.99) { ctx.beginPath(); ctx.arc(960, 520, R, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } }
function opleidingKaart(ctx, x, y, w, niv, naam, meta, a = 1, col = C.groen, hl = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 18); shape(ctx, rgba('#0D1420', 0.88), col, 2); text(ctx, niv, x + 50, y + 88, fTitel(52), col); text(ctx, naam, x + 190, y + 78, fTekst(44, 700), C.text); metaText(ctx, meta, x + 190, y + 120, C.grain, 'left', 28);
  if (hl && hl.a > 0.01) { ctx.save(); ctx.globalAlpha *= hl.a; metaText(ctx, hl.deel, x + 190, y + 120, C.goud, 'left', 28); ctx.restore(); } ctx.restore(); }
// raster van 100 stippen; k gekleurd
function raster100(ctx, x, y, k, col, a = 1, gap = 30, r = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 100; i++) circ(ctx, x + (i % 10) * gap, y + Math.floor(i / 10) * gap, r, i < k ? col : '#3A4458'); ctx.restore(); }

// H2-schema: Jansen staand met de lever in de romp, hersenen in een zoomcirkel naast het hoofd, leverzoom, drie bronnen rechts
const H2 = { px: 380, ph: 640, brein: [800, 215, 95], lever: [800, 600, 120], spier: [1330, 380, 80], vet: [1330, 600, 80], niets: [1330, 800, 60], rest: [1800, 545] };
function h2Basis(ctx, t, o = {}) { const r = persoon(ctx, 'buurvrouw', H2.px, GROND, H2.ph, { t, kijk: 1, uit: o.uit || 'neutraal', outfit: 'ziekenhuis' });
  const RK = rompKijkje(ctx, r, 1, { lever: 1, gloed: o.gloed || 0 });
  const [bx, by, br] = H2.brein; zoomCircle(ctx, bx, by, br, r.hoofd.x + r.hoofd.r * 0.6, r.hoofd.y - r.hoofd.r * 0.2, '', 1, () => { ctx.fillStyle = '#22304A'; ctx.fillRect(bx - br, by - br, 2 * br, 2 * br); ctx.save(); ctx.filter = 'grayscale(0.85) brightness(2.3) sepia(0.25)'; brein(ctx, bx, by + 10, 0.3, 1); ctx.restore(); });
  naamBij(ctx, 'hersenen', '', bx + br + 20, by + 12, 1, 'left');
  const [lx, ly, lr] = H2.lever; zoomCircle(ctx, lx, ly, lr, RK.lever[0], RK.lever[1], '', 1, () => leverBinnen(ctx, lx, ly, lr, o.vol == null ? 1 : o.vol, t));
  naamBij(ctx, 'lever', '', lx - lr * 0.75, ly - lr * 0.85, 1, 'right');
  H2R = r; return { r, RK }; }
let H2R = null;
const GLUC_PAD = () => bocht(H2.lever[0] - 20, H2.lever[1] - H2.lever[2] + 10, H2.brein[0] - 20, H2.brein[1] + H2.brein[2] - 10, 0, 10);
function bron(ctx, k, a, binnen, naam, sub, col) { if (a <= 0.01) return; const [x, y, r] = H2[k]; laag(ctx, a, () => { if (false && H2R && H2R.heup) { const sx = H2R.heup.x + (k === 'spier' ? 40 : 20), sy = H2R.heup.y + (k === 'spier' ? 110 : -40), an = Math.atan2(y - sy, x - sx); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 1.5; for (const d of [-1, 1]) { const b = an + d * Math.PI / 2; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(x + Math.cos(b) * r, y + Math.sin(b) * r); ctx.stroke(); } } ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); binnen(x, y, r); ctx.restore(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); naamBij(ctx, naam, sub, x + r + 22, y + 12, 1, 'left', col); }); }
function nietsBinnen(x, y, r) { }
function dagenKlok(ctx, uur, a = 1) { laag(ctx, a, () => { klok(ctx, 1700, 200, 70, uur, '', 1, C.goud); metaText(ctx, 'UUR ' + Math.round(uur), 1700, 312, C.goud, 'center', 28); }); }

Object.assign(SCENES, {
  title(ctx, t) { dienblad(ctx, 1460, 520, 1.15, 'KAMER 12', {}); flesje(ctx, 1730, 760, 1.4, 1); },

  // ---------- Cold open: de gang, de kar, drie bladen ----------
  s01(ctx, t, q) { gang(ctx); kar(ctx, 250, 862, 1, 1, 5);
    const tD = q.at('volgende', 1), tE = q.at('daarna', 1), tI = q.at('Iemand', 1) - 0.2, R = ramp(t, tI, 0.8), W = q.on('Waarom', 1, 0.5);
    const blad = (lab, t0, t1) => { const inn = ramp(t, t0, 0.6), uit = t1 ? ramp(t, t1, 0.5) : 0; return { a: inn * (1 - uit), x: lerp(560, 1060, inn) - 300 * uit }; };
    if (R < 0.99) laag(ctx, 1 - R, () => { const b1 = blad('MA', 0, tD - 0.2), b2 = blad('DI', tD, tE - 0.2), b3 = blad('WO', tE, 0);
      dienblad(ctx, b1.x, 470, 1.35, 'KAMER 12 · MA', { a: b1.a }); dienblad(ctx, b2.x, 470, 1.35, 'KAMER 12 · DI', { a: b2.a }); dienblad(ctx, b3.x, 470, 1.35, 'KAMER 12 · WO', { a: b3.a });
      tag(ctx, 'bijna niets gegeten', 1060, 760, C.koraal, q.on('gegeten', 1) * (1 - q.on('daarna', 1)), 'center', 34); });
    laag(ctx, R, () => { ['MA', 'DI', 'WO'].forEach((d, i) => dienblad(ctx, 620 + i * 440, 400 - W * 60, 0.95, 'KAMER 12 · ' + d, {})); metaText(ctx, 'DRIE DAGEN BIJNA NIETS', 1060, 600 - W * 60, C.koraal, 'center', 32); });
    laag(ctx, W, () => { kaart(ctx, 440, 600, 1240, 200, 1, C.goud); text(ctx, 'Een week bijna niets eten:', 490, 680, fTekst(48, 800), C.text, 'left'); text(ctx, 'waarom gevaarlijk?', 490, 750, fTekst(48, 800), C.goud, 'left'); vraagteken(ctx, 1590, 760, 1, 120); }); },

  // ---------- H1 Ondervoed in een ziekenhuisbed ----------
  s03(ctx, t, q) { kamer(ctx); const B = JANSEN_BED, rJ = jansenInBed(ctx, t);
    laag(ctx, 1 - q.on('opname', 1), () => dienblad(ctx, JANSEN_BED.x, 640, 0.75, 'KAMER 12', {}));
    naamBij(ctx, 'Mevrouw Jansen', '72 JAAR', B.x, 240, 1 - q.on('opname', 1), 'center');
    tag(ctx, 'heup gebroken', 640, 300, C.koraal, fase(t, q.at('heup', 1), q.at('opname', 1) + 0.2), 'center', 34);
    const S = q.on('opname', 1, 0.5) * (1 - q.on('Daarom', 1, 0.5)); screening(ctx, 120, 200, { a: S, v1: q.on('afgevallen', 1, 0.3), v2: q.on('trek', 1, 0.3), score: q.on('hoog', 1, 0.4) });
    laag(ctx, q.on('Daarom', 1, 0.4), () => metaText(ctx, 'SCORE 3 → DIËTIST', 140, 160, C.goud, 'left', 30));
    const H = q.on('diëtist', 1, 0.3), N = q.on('stagiair', 1, 0.3);
    if (H > 0.01) { const x = lerp(1720, 1430, ease(clamp((t - q.at('diëtist', 1)) / 1.2, 0, 1))); hanneke(ctx, x, t, { a: H, hold: (c, hx, hy) => klembord(c, hx + 6, hy - 10, 0.9) }); naamBij(ctx, 'Diëtist Hanneke', 'ZIEKENHUIS', x, 330, H, 'center'); }
    if (N > 0.01) { noor(ctx, 1730, t, { a: N, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) }); naamBij(ctx, 'Noor', 'STAGIAIR', 1730, 355, N, 'center'); } },

  s04(ctx, t, q) { kamer(ctx); jansenInBed(ctx, t);
    hanneke(ctx, 1430, t, { kijk: -1, hold: (c, hx, hy) => klembord(c, hx + 6, hy - 10, 0.9) });
    noor(ctx, 1730, t, { kijk: -1, uit: q.on('mager', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('mager', 1) > 0.5 ? 'denk' : 'staan' });
    tag(ctx, 'niet mager', JANSEN_BED.x, 240, C.goud, q.on('mager', 1), 'center', 36);
    laag(ctx, q.on('ondervoed', 1, 0.4), () => { tag(ctx, 'toch ondervoed?', 1640, 330, C.goud, 1, 'center', 36); vraagteken(ctx, 1830, 250, 1, 90); }); },

  s06(ctx, t, q) { const tO = q.at('opname', 1) - 0.3, N = ramp(t, tO, 0.6);
    if (N < 0.99) laag(ctx, 1, () => { kamer(ctx); const rJ = jansenInBed(ctx, t);
      antwoord(ctx, 'antwoord c: ja, ze krijgt te weinig binnen', 1 - q.on('weegt', 1));
      const tW = q.at('weegt', 1), Wg = fase(t, tW - 0.2, q.at('kleine', 1) + 0.4, 0.4);
      hanneke(ctx, lerp(1430, 1330, Wg), t, { kijk: -1, pose: Wg > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1730, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) });
      weegschaal(ctx, 1200, 862, 1.4, Wg, '');
      const L = q.on('onbedoeld', 1) * (1 - q.on('kleine', 1)); laag(ctx, L, () => { kaart(ctx, 120, 200, 760, 150, 1, C.goud); metaText(ctx, 'ONDERVOED:', 150, 252, C.goud, 'left', 28); metaText(ctx, 'ONBEDOELD AFVALLEN, VOORAL SPIER', 150, 292, C.text, 'left', 28); metaA(ctx, '· OOK BIJ OVERGEWICHT', 150, 330, q.on('overgewicht', 1), C.goud, 'left', 28); });
      const R = q.on('trouwring', 1, 0.5), V = q.on('vest', 1, 0.5);
      zoomCircle(ctx, 300, 360, 150, rJ.handL.x, rJ.handL.y, '', R * (1 - N), () => handRing(ctx, 300, 360, 150, t)); tag(ctx, 'ring zit los', 300, 570, C.goud, R * (1 - N), 'center', 30);
      zoomCircle(ctx, 660, 360, 150, rJ.handL.x - 50, rJ.handL.y + 6, '', V * (1 - N), () => mouwRuim(ctx, 660, 360, 150)); tag(ctx, 'vest te ruim', 660, 570, C.goud, V * (1 - N), 'center', 30); });
    laag(ctx, N, () => { bg(ctx, 'schema'); metaText(ctx, 'ONDERVOED BIJ OPNAME · NEDERLAND', 160, 200, C.text2, 'left', 28);
      const rij = (y, lab, k, aa, sub) => laag(ctx, aa, () => { text(ctx, lab, 160, y + 20, fTekst(44, 800), C.text, 'left'); poppetjes(ctx, 760, y - 20, k === 7 ? 7 : 3, 1, 110, C.koraal); metaText(ctx, sub, 760 + (k === 7 ? 7 : 3) * 110 + 30, y + 26, C.koraal, 'left', 30); });
      rij(330, 'alle patiënten', 7, q.on('zeven', 1, 0.5), '± 1 OP 7');
      rij(560, 'afdeling ouderen', 3, q.on('ouderen', 1, 0.5), 'GERIATRIE · ± 1 OP 3');
      metaA(ctx, 'SCREENING · 564.000 PATIËNTEN · NL 2007–2014 · KRUIZENGA E.A. 2016', 160, 800, q.on('patiënten', 1), C.grain, 'left', 28); }); },

  // ---------- H2 Als eten wegvalt ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('glycogeen', 1), tN = q.at('nieuwe', 1), tD = q.at('dag', 2);
    const uur = t < tG ? 0 : t < tD ? lerp(0, 18, (t - tG) / (tD - tG)) : lerp(18, 24, (t - tD) / 1.2), vol = 1 - clamp(uur / 24, 0, 0.9);
    h2Basis(ctx, t, { vol, gloed: q.on('lever', 1) * (1 - q.on('lever', 2)) });
    const Q = q.on('Waar', 1, 0.5); dagenKlok(ctx, uur, 1 - Q); metaA(ctx, '0 → 24 → 48', 1700, 350, 1 - Q, C.text2, 'center', 28);
    laag(ctx, q.on('glucose', 1) * (1 - q.on('glycogeen', 1)), () => { glucose(ctx, 1060, 150, 22); naamBij(ctx, 'glucose', 'ELKE DAG NODIG', 1096, 162, 1, 'left', GLUC); });
    stroom(ctx, GLUC_PAD(), t, 4, (x, y) => glucose(ctx, x, y, 13, 1, C.oker), q.on('glycogeen', 1) * (1 - ramp(t, tD + 0.4, 1)), 0.35);
    naamBij(ctx, 'glycogeen', 'VOORRAAD IN DE LEVER', H2.lever[0] - 40, H2.lever[1] + H2.lever[2] + 50, q.on('glycogeen', 1), 'center', C.oker);
    stroom(ctx, GLUC_PAD().map(([x, y]) => [x + 46, y]), t + 0.3, 3, (x, y) => glucose(ctx, x, y, 13), q.on('nieuwe', 1), 0.3);
    metaA(ctx, '+ NIEUWE GLUCOSE', H2.lever[0] + 70, H2.brein[1] + 200, q.on('nieuwe', 1) * (1 - Q), GLUC, 'left', 28);
    metaA(ctx, 'GLYCOGEEN · BIJNA OP NA ± 1 DAG', 1860, 410, ramp(t, tD, 0.6) * (1 - Q), C.oker, 'right', 28);
    bron(ctx, 'spier', Q, (x, y, r) => spierBinnen(ctx, x, y, r, 0, t), 'spier', '', C.koraal);
    bron(ctx, 'vet', Q, (x, y, r) => vetBinnen(ctx, x, y, r), 'vetweefsel', '', VET);
    laag(ctx, Q, () => { const [x, y, r] = H2.niets; ctx.setLineDash([10, 8]); circ(ctx, x, y, r, rgba(C.fill, 0.4), C.text2, 2.5); ctx.setLineDash([]); naamBij(ctx, 'niets', 'LAAG PITJE?', x + r + 22, y + 12, 1, 'left', C.text2);
      for (const k of ['spier', 'vet', 'niets']) { const [x2, y2, r2] = H2[k]; pijl(ctx, x2 - r2 - 10, y2, H2.lever[0] + H2.lever[2] + 20, H2.lever[1] + (y2 - H2.lever[1]) * 0.25, C.line, 0.8, 3, 14); }
      vraagteken(ctx, 1100, 520, 1, 90); }); },

  s09(ctx, t, q) { const tB = q.at('Wie', 1) - 0.3, B = ramp(t, tB, 0.6);
    if (B < 0.99) laag(ctx, 1 - B, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: uit eiwit in je spieren', 1);
      const A = q.on('aminozuren', 1, 0.5), Vt = q.on('Vet', 1, 0.5), S = q.on('spiereiwit', 1, 1.2);
      h2Basis(ctx, t, { vol: 0.1 });
      bron(ctx, 'spier', 1, (x, y, r) => spierBinnen(ctx, x, y, r, Math.max(A * 0.5, S), t), 'spier', 'EIWIT → AMINOZUREN', C.koraal);
      bron(ctx, 'vet', 1, (x, y, r) => vetBinnen(ctx, x, y, r), 'vetweefsel', '', VET);
      const sp = bocht(H2.spier[0] - H2.spier[2], H2.spier[1], H2.lever[0] + H2.lever[2], H2.lever[1] - 30, 60);
      padLijn(ctx, sp, C.koraal, A * 0.6, 3); stroom(ctx, sp, t, 6, (x, y) => aminozuur(ctx, x, y, 11), A, 0.3);
      stroom(ctx, GLUC_PAD().map(([x, y]) => [x + 46, y]), t + 0.3, 4, (x, y) => glucose(ctx, x, y, 13), A, 0.3);
      // vet: brede stroom naar de rest van het lichaam (hart en spieren), niet naar de hersenen
      laag(ctx, Vt, () => { const [vx, vy, vr] = H2.vet, [rx, ry] = H2.rest; const x0 = vx + vr * 0.55, y0 = vy - vr * 0.8; ctx.fillStyle = rgba(VET, 0.18); ctx.beginPath(); ctx.moveTo(x0 - 30, y0 + 10); ctx.lineTo(rx - 50, ry - 40); ctx.lineTo(rx - 40, ry + 44); ctx.lineTo(x0 + 40, y0 + 30); ctx.closePath(); ctx.fill();
        stroom(ctx, [[x0 - 10, y0 + 12], [rx - 50, ry - 18]], t, 6, (x, y) => circ(ctx, x, y, 10, VET), 1, 0.4); stroom(ctx, [[x0 + 24, y0 + 26], [rx - 44, ry + 22]], t + 0.4, 6, (x, y) => circ(ctx, x, y, 10, VET), 1, 0.4);
        circ(ctx, rx, ry, 56, rgba(C.fill, 0.6), VET, 2.5); hart(ctx, rx, ry, 0.9); naamBij(ctx, 'hart en spieren', '', rx, ry + 96, 1, 'center', VET);
        metaText(ctx, 'VET: DE MEESTE ENERGIE', 1240, 760, VET, 'left', 28); });
      laag(ctx, q.on('hersenen', 1, 0.5), () => { slotje(ctx, H2.brein[0] + 100, H2.brein[1] + 92, 0.9, 1, VET); metaText(ctx, 'HERSENEN DRAAIEN ER NOG NIET OP', 1240, 800, VET, 'left', 28); });
      laag(ctx, fase(t, q.at('eiwitvoorraad', 1), tB, 0.4), () => filmKaartje(ctx, 1080, 120, 'Wat zit er in je eten?')); });
    laag(ctx, B, () => { bg(ctx, 'schema'); poppetjes(ctx, 180, 420, 6, 6, 90, C.text2); poppetjes(ctx, 180, 560, 6, 6, 90, C.text2); metaText(ctx, '12 GEZONDE OUDEREN', 160, 700, C.text2, 'left', 28);
      const T = q.on('tien', 1, 1.5);
      metaText(ctx, 'DOORSNEDE BOVENBEEN · SCHEMATISCH', 1250, 190, C.text2, 'center', 28);
      dijDoorsnede(ctx, 1000, 500, 170, 1, 1); text(ctx, 'voor', 1000, 750, fTekst(40, 800), C.text, 'center');
      laag(ctx, q.on('tien', 1, 0.5), () => { dijDoorsnede(ctx, 1500, 500, 170, 1 - T, 1); text(ctx, 'na 10 dagen bedrust', 1500, 750, fTekst(40, 800), C.koraal, 'center'); });
      tag(ctx, '± 1 kg beenspier · ouderen', 1250, 835, C.koraal, q.on('kilo', 1), 'center', 34);
      metaA(ctx, 'ONDERZOEK VS · 12 OUDEREN · KORTEBEIN E.A. 2007', 1250, 236, q.on('Amerikaans', 1), C.grain, 'center', 28);
      tag(ctx, 'spieren nauwelijks gebruikt', 420, 330, C.text2, q.on('nauwelijks', 1) * (1 - q.on('Amerikaans', 1)), 'center', 30); }); },

  s10(ctx, t, q) { kamer(ctx); jansenInBed(ctx, t);
    hanneke(ctx, 1430, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => rekenblok(c, hx, hy - 20, 1.1) }); noor(ctx, 1730, t, { kijk: -1 });
    tag(ctx, 'de hele dag in bed', JANSEN_BED.x, 240, C.text2, q.on('ligt', 1), 'center', 32);
    laag(ctx, q.on('eiwit', 1, 0.4), () => { kaart(ctx, 120, 170, 560, 150, 1, C.goud); text(ctx, 'eiwit: minder of meer?', 160, 262, fTekst(40, 800), C.text, 'left'); vraagteken(ctx, 610, 300, 1, 80); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer, want haar lichaam moet herstellen', 1);
    metaText(ctx, 'EIWIT · GRAM PER KG PER DAG', 160, 222, C.text2, 'left', 28);
    const yb = 780, k = 260, G = q.on('gezond', 1, 0.8), Z = q.on('zieke', 1, 0.8);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, yb); ctx.lineTo(820, yb); ctx.stroke();
    laag(ctx, 1, () => { const h = 0.8 * k * G; roundRect(ctx, 220, yb - h, 200, h, 10); shape(ctx, rgba(C.groen, 0.4), C.groen, 2.5); laag(ctx, G, () => { text(ctx, '0,8', 320, yb - h - 20, fTekst(44, 800), C.groen, 'center'); metaText(ctx, 'GEZOND', 320, yb + 40, C.groen, 'center', 28); }); });
    laag(ctx, Z, () => { const h1 = 1.2 * k * Z, h2 = 1.5 * k * Z; roundRect(ctx, 540, yb - h1, 200, h1, 10); shape(ctx, rgba(C.koraal, 0.45), C.koraal, 2.5); roundRect(ctx, 540, yb - h2, 200, h2 - h1, 10); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2.5); ctx.setLineDash([]);
      text(ctx, '1,2–1,5', 640, yb - h2 - 20, fTekst(44, 800), C.koraal, 'center'); metaText(ctx, 'ZIEK', 640, yb + 40, C.koraal, 'center', 28); });
    tag(ctx, '± 1,5 × zoveel', 860, 470, C.koraal, q.on('anderhalf', 1), 'center', 32);
    metaA(ctx, 'ESPEN 2024 · GEZONDHEIDSRAAD', 160, 860, q.on('zoveel', 1), C.grain, 'left', 28);
    const K = [['wond en bot herstellen', 'herstellen', C.oker], ['afweer', 'afweer', C.teal], ['spier terug', 'eiwitten', C.koraal]];
    K.forEach(([s2, cue, col], i) => { const a = q.on(cue, 1, 0.5), y = 250 + i * 150; if (a <= 0.01) return; kaart(ctx, 980, y, 700, 120, a, col); laag(ctx, a, () => text(ctx, s2, 1020, y + 76, fTekst(42, 800), C.text, 'left')); });
    tag(ctx, '+ ± 1,5 dag langer in het ziekenhuis', 1330, 800, C.koraal, q.on('anderhalve', 1), 'center', 34); },

  // ---------- H3 Als de nieren stoppen ----------
  s13(ctx, t, q) { const tA = q.at('nieren', 1) - 0.4, A = 1 - ramp(t, tA, 0.6), tD = q.at('gewone', 1) - 0.4, D = ramp(t, tD, 0.6), tF = q.at('fosfaat', 2) - 0.3, F = ramp(t, tF, 0.5);
    if (A > 0.01) laag(ctx, A, () => zoomOpen(ctx, clamp(t / 1.3, 0, 1), () => { kamer(ctx);
      const zh = 120; roundRect(ctx, 420, GROND - zh - 20, 560, 34, 10); shape(ctx, '#E6EAEE', '#C4CCD6', 2); roundRect(ctx, 420, GROND - zh + 14, 560, 50, 8); shape(ctx, '#C9D2E0', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(440, GROND - zh + 64, 14, zh - 70); ctx.fillRect(946, GROND - zh + 64, 14, zh - 70);
      persoon(ctx, 'erik', 700, GROND, 470, { t, pose: 'zit', zitHoogte: zh, kijk: 1, outfit: 'trui', uit: 'neutraal' });
      naamBij(ctx, 'patiënt', '38 JAAR', 700, 330, 1, 'center');
      hanneke(ctx, 1250, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => tablet(c, hx, hy - 16, 1, -0.2) }); noor(ctx, 1580, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) }); }));
    if (A > 0.99) return;
    const B = (1 - A) * (1 - D);
    laag(ctx, B, () => { bg(ctx, 'schema'); const r = persoon(ctx, 'erik', 280, GROND, 600, { t, kijk: 1, outfit: 'trui' }); const G = q.on('niet', 1, 1.0);
      const zx = 600, zy = 560, zr = 160; zoomCircle(ctx, zx, zy, zr, r.heup.x + 10, r.heup.y - 70, '', 1, () => nierPaar(ctx, zx, zy, zr, G)); naamBij(ctx, 'nieren', G > 0.5 ? 'WERKEN BIJNA NIET' : 'ACHTER IN DE RUG', zx, zy + zr + 50, 1, 'center', G > 0.5 ? C.text2 : C.text);
      metaA(ctx, 'IN HET BLOED', 850, 320, q.on('bloed', 1), C.text2, 'left', 28);
      const BK = [['UREUM', C.oker, 'ureum'], ['KALIUM', KAL, 'kalium'], ['FOSFAAT', FOS, 'fosfaat'], ['ZOUT', ZOUT, 'zout']];
      BK.forEach(([n, col, cue], i) => bakje(ctx, 920 + i * 200, 640, 140, 220, n, col, 0.75 * q.on(cue, 1, 1.0), q.on('hoopt', 1, 0.4)));
      bakje(ctx, 1740, 640, 140, 220, 'WATER', C.teal, 0, q.on('hoopt', 1, 0.4) * 0.8, { stippel: true });
      laag(ctx, q.on('hoopt', 1), () => filmKaartje(ctx, 850, 140, 'Uitscheiding en evenwicht')); });
    if (D <= 0.01) return;
    laag(ctx, D, () => { bg(ctx, 'schema'); metaText(ctx, 'ZIJN GEWONE DAG', 160, 150, C.text2, 'left', 28);
      const X = [300, 700, 1100, 1500], Y = 330, lab = ['ONTBIJT', 'LUNCH', 'AVOND', 'TUSSENDOOR'];
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, Y + 100); ctx.lineTo(1760, Y + 100); ctx.stroke();
      X.forEach((x, i) => { bordje(ctx, x, Y, 1); metaText(ctx, lab[i], x, Y + 140, C.text2, 'center', 28); });
      const Z = q.on('Soep', 1, 0.4) * (1 - F), Zc = q.on('chips', 1, 0.4) * (1 - F), Fo = q.on('fosfaat', 2, 0.4);
      eten(ctx, 'boterham', X[0] - 40, Y - 6, 0.9); smeerkaas(ctx, X[0] + 40, Y + 20, 0.9, Fo > 0.5 ? FOS : '#F0E2B0'); banaan(ctx, X[0] + 30, Y - 22, 0.6);
      soepPak(ctx, X[1], Y - 10, 1); aardappels(ctx, X[2] - 40, Y, 1); saus(ctx, X[2] + 10, Y + 24, 0.9); biefstuk(ctx, X[2] + 46, Y - 10, 0.9, Fo > 0.5 ? '#6A88A8' : '#9A5A44'); eten(ctx, 'chips', X[3], Y - 6, 1);
      gloeiRing(ctx, X[1], Y, 120, 70, ZOUT, Z); gloeiRing(ctx, X[3], Y, 120, 70, ZOUT, Zc); metaA(ctx, 'ZOUT', X[1], Y - 90, Z, ZOUT, 'center', 28); metaA(ctx, 'ZOUT', X[3], Y - 90, Zc, ZOUT, 'center', 28);
      gloeiRing(ctx, X[0] + 40, Y + 18, 50, 30, FOS, Fo); gloeiRing(ctx, X[2] + 46, Y - 10, 60, 40, FOS, Fo); metaA(ctx, 'FOSFAAT', X[2] + 46, Y - 90, Fo, FOS, 'center', 28);
      // onderste rij, deel 1: zout, dorst, vocht
      laag(ctx, 1 - F, () => { const S = q.on('zes', 1, 0.5); laag(ctx, S, () => { zoutvaatje(ctx, 260, 660, 1.3); metaText(ctx, '≤ 6 G PER DAG', 340, 640, C.text, 'left', 28); metaText(ctx, 'ZOALS VOOR IEDEREEN', 340, 680, C.text2, 'left', 28); });
        const Do = q.on('dorst', 1, 0.5), Vo = q.on('vocht', 1, 0.5); pijl(ctx, 700, 640, 830, 600, C.line, Do, 3, 14); laag(ctx, Do, () => { glas(ctx, 900, 600, 0.9, 0.5); metaText(ctx, 'DORST', 980, 610, C.teal, 'left', 28); });
        pijl(ctx, 700, 700, 1060, 790, C.line, Vo, 3, 14); bakje(ctx, 1150, 800, 120, 170, 'VOCHT VASTHOUDEN', C.teal, 0.7 * q.on('plast', 1, 1.2), Vo, { stippel: q.on('plast', 1) < 0.5, px: 20 });
        laag(ctx, q.on('drinkadvies', 1, 0.5), () => { kaart(ctx, 1320, 540, 480, 280, 1, C.teal); metaText(ctx, 'DRINKADVIES', 1350, 590, C.teal, 'left', 28); metaText(ctx, 'PERSOONLIJK', 1350, 626, C.text2, 'left', 28); glas(ctx, 1640, 700, 1.0, 0.45, 0.55); metaA(ctx, 'MINDER DRINKEN', 1350, 780, q.on('minder', 1), C.text, 'left', 28); }); });
      // deel 2: fosfaat
      laag(ctx, F, () => { tag(ctx, 'fosfaat ↑', 360, 660, FOS, 1, 'center', 40); metaA(ctx, 'SLECHT VOOR BOTTEN EN BLOEDVATEN', 160, 760, q.on('slecht', 1), FOS, 'left', 28);
        laag(ctx, q.on('fosfaatbinder', 1, 0.5), () => { kaart(ctx, 1080, 560, 720, 200, 1, FOS); pil(ctx, 1180, 660, 1.4); text(ctx, 'fosfaatbinder', 1270, 650, fTekst(42, 800), C.text, 'left'); metaText(ctx, 'BIJ HET ETEN', 1270, 700, FOS, 'left', 28); }); }); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'kalium ↑', 360, 200, KAL, 1, 'center', 40);
    const items = [[banaan, 480, '#9AA3B2', 1.8], [aardappels, 960, '#9AA3B2', 2.2], [saus, 1440, '#9AA3B2', 2.4]], cues = ['banaan', 'aardappelen', 'tomatensaus'], nm = ['banaan', 'aardappelen', 'tomatensaus'];
    items.forEach(([f, x, col, s], i) => { const a = Math.max(0.35, q.on(cues[i], 1, 0.4)); laag(ctx, a, () => { circ(ctx, x, 500, 160, rgba(C.fill, 0.5), C.line, 2); f(ctx, x, 500, s, col); naamBij(ctx, nm[i], 'ELKE DAG', x, 720, 1, 'center'); }); });
    laag(ctx, q.on('raadt', 1, 0.4), () => { tag(ctx, 'wat raadt de diëtist aan?', 960, 830, C.goud, 1, 'center', 34); vraagteken(ctx, 1720, 560, 1, 120); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const tP = q.at('Aardappelen', 1) - 0.3, P = ramp(t, tP, 0.6);
    antwoord(ctx, 'antwoord a: minder vaak, en andere soorten kiezen', 1);
    const K = q.on('kalium', 1, 0.8);
    laag(ctx, 1 - P, () => { const items = [[banaan, 480, 1.8], [aardappels, 960, 2.2], [saus, 1440, 2.4]];
      items.forEach(([f, x, s]) => { circ(ctx, x, 420, 150, rgba(C.fill, 0.5), K > 0.5 ? KAL : C.line, K > 0.5 ? 3 : 2); f(ctx, x, 420, s, _mixK('#9AA3B2', KAL, K)); });
      metaA(ctx, 'VEEL KALIUM', 960, 630, K, KAL, 'center', 30);
      const Hh = q.on('hart', 1, 0.5); laag(ctx, Hh, () => { kaart(ctx, 260, 670, 1000, 170, 1, KAL); hartslag(ctx, 300, 760, 560, 40, t, 1, KAL, 1); text(ctx, 'te veel kalium:', 900, 744, fTekst(36, 800), C.text, 'left'); text(ctx, 'hartritme', 900, 794, fTekst(36, 800), KAL, 'left'); });
      tag(ctx, 'wel groente en fruit · soorten met minder kalium', 960, 220, C.groen, q.on('soorten', 1), 'center', 30);
      laag(ctx, q.on('soorten', 1), () => tag(ctx, 'minder vaak', 1520, 760, C.groen, 1, 'center', 32)); });
    laag(ctx, P, () => { pan(ctx, 860, 520, 1.6, q.on('gooit', 1, 1.0), t); kaart(ctx, 1240, 360, 560, 220, 1, C.teal); text(ctx, 'in ruim water koken', 1280, 440, fTekst(40, 800), C.text, 'left'); metaA(ctx, 'KOOKVOCHT WEG', 1280, 510, q.on('weg', 1), C.teal, 'left', 28); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('Daarom', 1) - 0.3, N = ramp(t, tN, 0.6);
    laag(ctx, 1, () => { biefstuk(ctx, 260, 280 - 60 * N, 1.4); naamBij(ctx, 'eiwit', '', 260, 380 - 60 * N, 1 - N, 'center', C.oker);
      const U = q.on('ureum', 1, 0.5); pijl(ctx, 360, 280 - 60 * N, 520, 280 - 60 * N, C.line, U, 3, 14); bakje(ctx, 620, 360 - 60 * N, 130, 180, 'UREUM', C.oker, 0.7, U, { slot: q.on('kwijt', 1) });
      metaA(ctx, 'RAAKT HIJ NIET KWIJT', 720, 270 - 60 * N, q.on('kwijt', 1) * (1 - N), C.oker, 'left', 28); });
    eiwitSchuif(ctx, 260, 620, 1400, { a: N, gezond: q.on('lichaam', 2, 0.5), voor: q.on('nodig', 1, 0.5), meesten: q.on('meeste', 1, 0.5), dialyseVraag: q.on('dialyse', 1, 0.5) });
    metaA(ctx, 'NIERSTICHTING · NFN/NIV-RICHTLIJN', 260, 850, N, C.grain, 'left', 28);
    laag(ctx, q.on('dialyse', 1, 0.4), () => tag(ctx, 'volgende week: dialyse', 1400, 230, C.teal, 1, 'center', 32)); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: meer eiwit', 1);
    const A = q.on('aminozuren', 1, 2.0); dialyseVlies(ctx, 160, 210, 1000, 340, t, A, 1);
    laag(ctx, q.on('twaalf', 1, 0.5), () => { kaart(ctx, 1240, 230, 560, 200, 1, C.koraal); metaText(ctx, 'HEMODIALYSE', 1270, 278, C.text2, 'left', 28); text(ctx, '± 12 g per keer', 1270, 350, fTekst(48, 800), C.koraal, 'left'); metaText(ctx, 'MAASTRICHT UMC+ · 2020', 1270, 404, C.grain, 'left', 28); });
    tag(ctx, 'anders: spier afbreken', 1520, 500, C.koraal, q.on('spier', 1), 'center', 30);
    const O = q.on('omhoog', 1, 0.8);
    eiwitSchuif(ctx, 260, 760, 1300, { gezond: 1, voor: 1 - O, dialyse: O, a: 1 }); },

  // ---------- H4 Samen met het team ----------
  s20(ctx, t, q) { const tF = q.at('fysiotherapeut', 1) - 0.3, tZ = q.at('Zulke', 1) - 0.3, tP = q.at('Maar', 1) - 0.3;
    const A = 1 - ramp(t, tF, 0.5), Fy = ramp(t, tF, 0.5) * (1 - ramp(t, tZ, 0.5)), Z = ramp(t, tZ, 0.5) * (1 - ramp(t, tP, 0.5)), P = ramp(t, tP, 0.5);
    const Pl = ramp(t, q.at('verrijkt', 1) - 0.4, 0.5);
    if (A > 0.01 && Pl < 0.99) laag(ctx, A * (1 - Pl), () => { kamer(ctx); jansenInBed(ctx, t);
      hanneke(ctx, 1430, t, { kijk: -1, pose: q.on('plan', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1730, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) });
      tag(ctx, 'het plan', 640, 260, C.goud, q.on('plan', 1), 'center', 40); });
    if (A > 0.01 && Pl > 0.01) laag(ctx, A * Pl, () => { bg(ctx, 'schema'); const sip = fase(t, q.at('drinkvoeding', 1) + 0.6, q.at('energie', 1) + 1.0, 0.4);
      metaText(ctx, 'HET PLAN', 120, 160, C.goud, 'left', 30);
      const lit = [q.on('verrijkt', 1, 0.5), q.on('drinkvoeding', 1, 0.5)]; trapK(ctx, 100, 840, 270, lit, 1, 0, 34);
      const chips = [['volle yoghurt', 'yoghurt'], ['extra beleg', 'beleg'], ['eiwitrijk tussendoortje', 'tussendoortje']];
      chips.forEach(([s2, cue], i) => tag(ctx, s2, 330, 330 + i * 70, C.oker, q.on(cue, 1, 0.4), 'center', 32));
      metaA(ctx, 'NA HEUPOPERATIE: METEEN DRINKVOEDING', 120, 210, q.on('meteen', 1), C.grain, 'left', 28);
      inBed(ctx, 'buurvrouw', 1500, 860, 0.8, { t, outfit: 'ziekenhuis', deken: '#9FB7C9', uit: sip > 0.6 && t > q.at('energie', 1) - 0.4 ? 'bezorgd' : 'neutraal', hold: (c, hx, hy) => flesje(c, hx, hy - 30 - 20 * sip, 0.9, q.on('drinkvoeding', 1, 0.4)) });
      tag(ctx, 'veel eiwit en energie', 1500, 240, C.oker, q.on('energie', 1), 'center', 32); });
    if (Fy > 0.01) laag(ctx, Fy, () => { gang(ctx); const t0 = tF, h = 430, tt = Math.max(0, t - t0);
      const xJ = 380 + gangSnelheid('buurvrouw', h, 'loop', 0.55) * tt, xF = 280 + gangSnelheid('femke', 470, 'loop', 0.48) * tt; persoon(ctx, 'femke', xF, GROND - 6, 470, { zij: true, kijk: 1, gang: 'loop', tempo: 0.48, t: tt + 0.35 });
      rollator(ctx, xJ + 120, GROND + 2, 0.95, 1); persoon(ctx, 'buurvrouw', xJ, GROND, h, { zij: true, kijk: 1, gang: 'loop', tempo: 0.55, t: tt, outfit: 'ziekenhuis', arm: [0.9, 0.5], armVer: [0.9, 0.5] });
      naamBij(ctx, 'Fysiotherapeut Femke', '', xF, 330, 1, 'center');
      tag(ctx, 'bewegen houdt spieren vast', 1300, 260, C.groen, q.on('bewegen', 1), 'center', 36); });
    if (Z > 0.01) laag(ctx, Z, () => { bg(ctx, 'schema'); metaText(ctx, 'OVERLEDEN BINNEN 30 DAGEN · VAN DE 100', 160, 200, C.text2, 'left', 28);
      const M = q.on('zeven', 1, 0.8), Zo = q.on('tien', 1, 0.8);
      raster100(ctx, 220, 300, Math.round(7 * M), C.koraal, 1); text(ctx, 'met voedingsplan', 220, 640, fTekst(40, 800), C.groen, 'left'); laag(ctx, M, () => text(ctx, '7', 355, 710, fTekst(60, 800), C.koraal, 'center'));
      raster100(ctx, 820, 300, Math.round(10 * Zo), C.koraal, 1); text(ctx, 'zonder', 820, 640, fTekst(40, 800), C.text2, 'left'); laag(ctx, Zo, () => text(ctx, '10', 955, 710, fTekst(60, 800), C.koraal, 'center'));
      laag(ctx, q.on('vooral', 1, 0.5), () => { kaart(ctx, 1300, 300, 520, 290, 1, C.oker); metaText(ctx, 'VOORAL DOOR', 1330, 348, C.oker, 'left', 28); boterhamBord(ctx, 1450, 460, 0.9, 0); flesje(ctx, 1660, 460, 1.2, 1); metaText(ctx, 'VERRIJKT + DRINKVOEDING', 1330, 560, C.text, 'left', 28); });
      metaA(ctx, 'ZWITSERS ONDERZOEK · ± 2000 PATIËNTEN · GEEN OPERATIE · SCHUETZ E.A. 2019', 160, 800, q.on('Zwitsers', 1), C.grain, 'left', 28); });
    if (P > 0.01) laag(ctx, P, () => { kamer(ctx); jansenInBed(ctx, t, { hold: (c, hx, hy) => flesje(c, hx + 40, hy - 30, 0.9, 1) }); const J = q.on('verpleegkundige', 1, 0.3);
      tag(ctx, 'een plan op papier ≠ eten in je buik', 960, 170, C.goud, q.on('papier', 1), 'center', 32);
      if (J > 0.01) { persoon(ctx, 'jesse', 560, GROND, 490, { t, kijk: 1, a: J, outfit: 'werk', pose: 'vasthouden', hold: (c, hx, hy) => klembord(c, hx + 4, hy - 12, 1) }); naamBij(ctx, 'Verpleegkundige Jesse', '', 560, 320, J, 'center');
        laag(ctx, J, () => { kaart(ctx, 1440, 300, 400, 320, 1, C.teal); metaText(ctx, 'WAT AT ZE?', 1470, 350, C.teal, 'left', 28); ['ontbijt', 'lunch', 'avond', 'tussendoor'].forEach((s2, i) => { text(ctx, s2, 1470, 410 + i * 50, fTekst(30, 600), C.text, 'left'); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fillRect(1650, 390 + i * 50, [60, 40, 70, 30][i], 22); });
          ctx.beginPath(); ctx.ellipse(1600, 700, 70, 20, 0, 0, 6.283); shape(ctx, '#E6E2DA', '#FFFFFF', 1.5); eten(ctx, 'koekje', 1600, 688, 0.9); metaText(ctx, 'TUSSENDOORTJE', 1600, 760, C.oker, 'center', 28); }); } }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const St = q.on('stelt', 1, 0.5); hanneke(ctx, 190, t, { kijk: 1, h: 440, pose: 'vasthouden', hold: (c, hx, hy) => tablet(c, hx, hy - 16, 0.9, 0.2) });
    const x0 = 520, yb = 700, w = 96, Hn = 380, dx = 128, D = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'], v = [0.30, 0.36, 0.40, 0.34, 0.42, 0.38, 0.44];
    metaText(ctx, 'WAT ZE ETEN EN DRINKEN · 1 WEEK', x0, 220, C.text2, 'left', 28);
    ctx.setLineDash([12, 9]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 20, yb - Hn); ctx.lineTo(x0 + 7 * dx, yb - Hn); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'WAT ZE NODIG HEEFT', x0 + 7 * dx + 20, yb - Hn + 10, C.groen, 'left', 28);
    ctx.strokeStyle = rgba(C.groen, 0.5); ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.moveTo(x0 - 20, yb - Hn / 2); ctx.lineTo(x0 + 7 * dx, yb - Hn / 2); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'HELFT', x0 + 7 * dx + 20, yb - Hn / 2 + 10, rgba(C.groen, 0.8), 'left', 28);
    D.forEach((d, i) => { const u = ramp(t, 0.2 + i * 0.25, 0.5), h = Hn * v[i] * u, x = x0 + i * dx; roundRect(ctx, x, yb - h, w, Math.max(h, 1), 8); shape(ctx, rgba(C.oker, 0.5), C.oker, 2); metaText(ctx, d, x + w / 2, yb + 38, C.text2, 'center', 28); });
    tag(ctx, '< 1/2 · na 1 week', 1010, 820, C.koraal, q.on('helft', 1) * (1 - St), 'center', 34);
    laag(ctx, St, () => { bg(ctx, 'schema'); tag(ctx, '< 1/2 · na 1 week', 960, 220, C.koraal, 1, 'center', 34); trapK(ctx, 400, 800, 280, [1, 1], 1, 1, 36); }); },

  s23(ctx, t, q) { const tS = q.at('slangetje', 1) - 0.4, S = ramp(t, tS, 0.6);
    if (S < 0.99) laag(ctx, 1 - S, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: sondevoeding erbij', 1); trapK(ctx, 400, 800, 280, [1, 1, q.on('Sondevoeding', 1, 0.6)], 1, 0, 36);
      tag(ctx, 'niet pas aan het eind', 1240, 300, C.teal, q.on('eind', 1), 'center', 34); });
    laag(ctx, S, () => { kamer(ctx); const rJ = jansenInBed(ctx, t); flesje(ctx, 160, 760, 1.2, 1);
      dienblad(ctx, 1600, 730, 0.5, 'KAMER 12', { a: q.on('eten', 1, 0.5) }); metaA(ctx, 'GEWOON DOOR ETEN', 1600, 850, q.on('eten', 1) * (1 - q.on('diëtist', 1)), C.oker, 'center', 28);
      const zx = 470, zy = 360, zr = 180; zoomCircle(ctx, zx, zy, zr, rJ.hoofd.x - rJ.hoofd.r * 1.25, rJ.hoofd.y + rJ.hoofd.r * 0.3, '', 1, () => sondeSchema(ctx, zx, zy, zr, q.on('maag', 1, 1.5), t)); tag(ctx, 'neussonde · vaak tijdelijk', zx, zy + zr + 60, C.teal, 1, 'center', 30);
      const R = [['diëtist: hoeveel', 'rekent', C.goud], ['arts en verpleegkundige: uitvoeren', 'arts', C.teal], ['patiënt: beslist mee', 'beslist', C.groen]];
      R.forEach(([s2, cue, col], i) => { const a = q.on(cue, 1, 0.4), y = 300 + i * 120; kaart(ctx, 1380, y, 480, 104, a, col); laag(ctx, a, () => { ctx.font = fTekst(30, 800); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrapC(ctx, s2, 1404, y + 42, 440, 34); }); }); }); },

  // ---------- Recap ----------
  s24(ctx, t, q) { const tK = q.at('glycogeen', 1) - 0.3, K = ramp(t, tK, 0.6);
    if (K < 0.99) laag(ctx, 1 - K, () => { gang(ctx); kar(ctx, 220, 862, 0.9, 1, 4);
      ['MA', 'DI', 'WO'].forEach((d, i) => dienblad(ctx, 520 + i * 370, 250, 0.72, 'KAMER 12 · ' + d, {}));
      dienblad(ctx, 1660, 250, 0.72, 'KAMER 12', { leeg: 1 }); metaText(ctx, 'NU', 1660, 400, C.groen, 'center', 28);
      hanneke(ctx, 1500, t, { kijk: 1, h: 400 }); noor(ctx, 1790, t, { kijk: -1, h: 385, uit: 'lacht' }); });
    laag(ctx, K, () => { bg(ctx, 'schema'); const C4 = [['zonder eten', 'spier wordt glucose', C.koraal, 'glycogeen'], ['herkennen', 'ook zonder mager te zijn', C.goud, 'ziet'], ['nieren', 'zout, kalium, fosfaat · soms vocht · eiwit vóór en tijdens dialyse anders', KAL, 'nierfalen']];
      C4.forEach(([k, s2, col, cue], i) => { const a = q.on(cue, 1, 0.5), x = 160 + (i % 2) * 820, y = 170 + Math.floor(i / 2) * 330; if (a <= 0.01) return; kaart(ctx, x, y, 780, 290, a, col);
        laag(ctx, a, () => { text(ctx, k, x + 36, y + 80, fTekst(46, 800), col, 'left'); ctx.font = fTekst(34, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrapC(ctx, s2, x + 36, y + 150, 700, 42); }); });
      laag(ctx, q.on('trager', 1) * (1 - q.on('nierfalen', 1)), () => tag(ctx, 'in bed en bij ziekte: sneller spierverlies', 960, 830, C.koraal, 1, 'center', 30)); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 120, 150, 760, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Diëtist: waar leer je dit?', 150, 220, 1, C.text, 52, 'left', 700);
    stempel(ctx, 1140, 200, 'BESCHERMDE TITEL', C.goud, q.on('beschermde', 1));
    opleidingKaart(ctx, 120, 300, 1180, 'hbo', 'Voeding en Diëtetiek', 'HAN · NIJMEGEN · 4 JAAR', q.on('diploma', 1), C.groen, { deel: 'HAN · NIJMEGEN', a: q.on('HAN', 1, 0.4) });
    tag(ctx, 'dan mag je je diëtist noemen', 710, 500, C.groen, q.on('noemen', 1), 'center', 30);
    opleidingKaart(ctx, 120, 560, 1180, 'wo', 'Voeding en Gezondheid', 'WAGENINGEN · 3 JAAR', q.on('Wageningen', 1), C.teal);
    tag(ctx, 'geen diëtist · na een master bv. onderzoeker', 710, 770, C.teal, q.on('geen', 1), 'center', 30);
    hanneke(ctx, 1620, t, { kijk: -1, h: 500 }); }
});

// trap met eigen tredebreedte
function trapK(ctx, x, y, tw, lit = [], a = 1, grijs3 = 0, fs = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const th = tw * 0.5, fp = fs || Math.max(19, Math.round(tw * 0.125));
  TRAP.forEach(([lab, col], i) => { const bx = x + i * tw, by = y - (i + 1) * th, L = lit[i] || 0, G = i === 2 ? grijs3 : 0;
    roundRect(ctx, bx, by, tw - 8, (i + 1) * th, 10); shape(ctx, G > 0.5 ? rgba(C.fill, 0.3) : L > 0.01 ? rgba(col, 0.15 + 0.4 * L) : rgba(C.fill, 0.45), L > 0.5 ? col : G > 0.5 ? C.text2 : C.line, L > 0.5 ? 3 : 1.5);
    ctx.font = fTekst(fp, 700); ctx.fillStyle = L > 0.5 ? C.text : C.text2; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; wrapC(ctx, lab, bx + tw / 2 - 4, by + fp + 12, tw - 26, fp + 4);
    if (G > 0.01) vraagteken(ctx, bx + tw / 2 - 4, by + th * 0.5 + fp * 2 + 30, G, Math.round(tw * 0.4)); });
  ctx.restore(); }
