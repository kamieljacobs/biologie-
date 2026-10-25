// Wat word jij? · Bio-informatica 2 · Een miljoen varianten: welke maakt ziek? — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam, meeloopweek, eigen kleren; Dr. Kim, klinisch geneticus, outfit gewoon).
// Het kind komt nooit in beeld (dossiermap, kindertekening, stamboomschema). Geen ziekenhuisbed, geen spuiten.
// Ouders in H3: VOORLOPIG twee bestaande figuranten (Erik en Joost, twee vaders) — twijfelscène s14.
// H3_ALT = true tekent het alternatief: geen ouders in beeld; Sam wacht op de gang en Dr. Kim vertelt het hem achteraf.
const H3_ALT = (typeof window !== 'undefined' && /h3alt/.test(location.hash)) || false;
const OUDER1 = 'erik', OUDER2 = 'joost';
const TRX = 560, TRY = 220, TRS = 0.85; // trechter in hoofdstuk 2

function samKim(ctx, t, o = {}) { const { xs = 200, xk = 420, h = 420, a = 1, poseS = 'staan', poseK = 'staan', uitS = 'neutraal', uitK = 'neutraal', kijkS = 1, kijkK = 1, namen = 1 } = o; if (a <= 0.01) return;
  persoon(ctx, 'sam', xs, 800, h, { t, a, pose: poseS, uit: uitS, kijk: kijkS });
  persoon(ctx, 'kim', xk, 800, h, { t, a, pose: poseK, uit: uitK, kijk: kijkK, outfit: 'gewoon' });
  if (namen > 0.01) { const sep = xk - xs < 300; naamBij(ctx, 'Sam', sep ? '' : 'meeloopweek', xs, 800 - h * 1.04 - 40, a * namen, 'center'); naamBij(ctx, 'Dr. Kim', 'klinisch geneticus', xk, 800 - h * 1.02 - 40, a * namen, 'center'); } }
// harde wissel tussen twee beelden rond een woord: eerst het oude weg, dan het nieuwe (geen spookachtige mensen)
function wissel(q, w, n = 1, d = 0.3) { const tw = q.at(w, n); return [1 - ramp(q.localT, tw - d - 0.05, d), ramp(q.localT, tw, d)]; }
// de ouders aan tafel (voorlopig: twee figuranten uit de cast), hand in hand op 'hand'
function ouders(ctx, t, o = {}) { const { a = 1, hand = 0, uit1 = 'neutraal', uit2 = 'neutraal', x1 = 470, x2 = 650, h = 430 } = o; if (a <= 0.01) return;
  const r2 = persoon(ctx, OUDER2, x2, 800, h, { t, a, uit: uit2, kijk: 1 });
  persoon(ctx, OUDER1, x1, 800, h, { t, a, uit: uit1, kijk: 1, pose: hand > 0.5 ? 'handdruk' : 'staan', hand: hand > 0.5 && r2.handL ? { x: r2.handL.x, y: r2.handL.y } : null }); }
function tijdKaartje(ctx, s2, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase()).width + 50; ctx.letterSpacing = '0px';
  roundRect(ctx, x - w / 2, y - 42, w, 60, 30); shape(ctx, rgba(C.goud, 0.14), C.goud, 1.5); metaText(ctx, s2, x, y - 2, C.goud, 'center', 28); ctx.restore(); }
function teller(ctx, x, y, u, a = 1, px = 44) { if (a <= 0.01) return; const n = Math.round(4100000 * ease(u)); regel(ctx, n.toLocaleString('nl-NL').replace(/\./g, ' ') + (u >= 0.999 ? '+' : '') + ' varianten', x, y, a, C.goud, px, 'right', 700); }

Object.assign(SCENES, {
  title(ctx, t) {
    trechter(ctx, 1650, 300, { s: 0.6, lagen: [1, 1, 1], aA: [1, 0, 0, 0], uit: 1, namen: 0, aantal: ['ruim 4 000 000', '', '', ''] });
    metaA(ctx, 'blijft er één over?', 1650, 720, 1, C.grain, 'center', 28);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    spreekkamer(ctx, { x0: 140, x1: 980, top: 640, tekening: 0, map: 1, stoelen: false });
    kinderTekeningGroot(ctx, 360, 545, 0.72);
    const K = q.on('meisje', 1, 0.5), O = q.on('ouders', 1, 0.5);
    stamboom(ctx, 560, 160, 0.72, { aO: 0.35 + 0.65 * O, aK: 1, labels: O, leeftijd: '4 jaar' });
    zacht(ctx, K * (1 - O), () => { circ(ctx, 560, 160 + 144, 46, null, C.goud, 3); });
    const box = scherm(ctx, 1080, 110, 780, 690, 'varianten · meisje');
    const tD = q.at('DNA', 1), tM = q.at('miljoenen', 1); const rol = t < tD ? 0 : (t < tM ? (t - tD) * 1.2 : (tM - tD) * 1.2 + (t - tM) * 9);
    kolomKoppen(ctx, { x: box.x, y: box.y + 20 }); rolLijst(ctx, { x: box.x, y: box.y + 30, w: box.w, h: box.h - 110 }, rol, { a: 1 });
    teller(ctx, 1830, 778, clamp((t - tM) / 2.5, 0, 1), q.on('miljoenen', 1, 0.4), 40);
    vraagteken(ctx, 1000, 330, q.on('variant', 1), 120); },

  // ---------- H1 van sequencer naar variantenlijst ----------
  s03(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 190, xk: 420, h: 420, poseK: q.on('lezen', 1) > 0.5 && q.on('computer', 1) < 0.5 ? 'wijs' : 'staan' });
    const L = q.on('gelezen', 1, 0.5), R = q.on('computer', 1, 0.6);
    [['kind', 640], ['vader', 780], ['moeder', 920]].forEach(([lb, x], i) => buisje(ctx, x, 470, lb, 1, 1 - 0.5 * L));
    sequencer(ctx, 1150, 400, 1, t, L);
    naamBij(ctx, 'machine leest het DNA', 'in korte stukjes', 1150, 222, L, 'center');
    // korte stukjes stromen uit de machine en schuiven daarna op hun plek tegen het referentiegenoom
    const tR = q.at('computer', 1);
    for (let i = 0; i < 12; i++) { const n = 6 + Math.floor(hash(i * 3.1) * 4), sx = 1290 + (i % 3) * 30, sy = 300 + i * 18; const doelX = 700 + hash(i * 7.7) * 1000, doelY = 640 - 26 - (i % 3) * 22;
      const vrij = clamp((t - q.at('stukjes', 1) - i * 0.12) / 0.8, 0, 1) * L; const plek = ease(clamp((t - tR - 0.6 - i * 0.15) / 1.2, 0, 1));
      const fx = lerp(sx + vrij * (180 + hash(i) * 200), doelX, plek), fy = lerp(sy + vrij * (hash(i + 3) - 0.5) * 120, doelY, plek); leesStukje(ctx, fx, fy, n, i, vrij); }
    referentie(ctx, 700, 1820, 660, R);
    naamBij(ctx, 'referentiegenoom', 'afgesproken voorbeeldgenoom', 1260, 720, q.on('referentiegenoom', 1), 'center'); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 200, xk: 410, h: 420, poseS: q.on('ziek', 1) > 0.5 ? 'wijs' : 'staan', uitS: q.on('ziek', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    const box = scherm(ctx, 640, 110, 1220, 690, 'varianten · meisje');
    const P = fasen(q, [null, ['lijst', 1]], 0.5);
    zacht(ctx, P[0], () => { const ref = 'ACGTTAGCCTAG', mei = 'ACGTTGGCCTAG';
      metaA(ctx, 'referentie', box.x + 10, box.y + 90, 1, C.text2, 'left', 26); metaA(ctx, 'meisje', box.x + 10, box.y + 230, 1, C.text2, 'left', 26);
      for (let i = 0; i < 12; i++) { const x = box.x + 280 + i * 62; tegel(ctx, x, box.y + 80, ref[i]); const d = ref[i] !== mei[i]; tegel(ctx, x, box.y + 220, mei[i], { rand: d && q.on('afwijkt', 1) > 0.5 ? C.koraal : null });
        if (!d) { ctx.fillStyle = rgba(C.line, 0.8); ctx.fillRect(x - 1.5, box.y + 116, 3, 66); } }
      naamBij(ctx, 'variant', 'een plek die afwijkt', box.x + 280 + 5 * 62, box.y + 330, q.on('variant', 1), 'center', C.koraal); });
    zacht(ctx, P[1], () => { kolomKoppen(ctx, { x: box.x, y: box.y + 20 }); rolLijst(ctx, { x: box.x, y: box.y + 30, w: 900, h: box.h - 110 }, (t - q.at('lijst', 1)) * 7 + 20, { seed: 50 }); });
    teller(ctx, 1830, 778, clamp((t - q.at('lijst', 1)) / 2.2, 0, 1), P[1], 40);
    vraagteken(ctx, 1700, 330, q.on('denk', 1), 120); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ieder mens verschilt zoveel');
    const P = fasen(q, [null, ['meeste', 1]], 0.5);
    zacht(ctx, P[0], () => { [['jij', 360], ['je buurman', 1060]].forEach(([nm, x], k) => { const box = scherm(ctx, x, 220, 600, 520, 'varianten · ' + nm);
        rolLijst(ctx, { x: box.x - 10, y: box.y + 10, w: 580, h: 340 }, t * 3 + k * 40, { seed: 300 + k * 900 }); regel(ctx, '4 à 5 miljoen', x + 300, 700, q.on('vier', 1), C.goud, 44, 'center', 700); });
      metaA(ctx, 'ieder mens · gemeten', 960, 800, q.on('mens', 1), C.grain, 'center', 28); });
    zacht(ctx, P[1], () => {
      dnaStrook(ctx, 200, 340, 700, { genen: [[0.05, 0.35, 'gen'], [0.65, 0.95, 'gen']], plekken: [{ x: 0.5, col: C.text2 }] });
      naamBij(ctx, 'tussen twee genen', 'doet niets', 550, 450, 1, 'center', C.text2);
      codonRij(ctx, 1150, 300, 'GAG'); regel(ctx, '→', 1335, 312, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1400, 300, 'GAA', { mark: 2 }); aaKraal(ctx, 1200, 400, 34, 'E'); aaKraal(ctx, 1450, 400, 34, 'E');
      naamBij(ctx, 'zelfde aminozuur', 'doet niets', 1325, 500, 1, 'center', C.text2);
      stempel(ctx, 960, 660, 'een verschil, geen fout', C.groen, q.on('verschil', 2), -0.05); }); },

  // ---------- H2 filteren ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 110, xk: 270, h: 380, namen: 0, poseS: q.on('vraagt', 1) > 0.5 && q.on('filtert', 1) < 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Sam', '', 110, 360, 1, 'center'); naamBij(ctx, 'Dr. Kim', '', 270, 360, 1, 'center');
    const F = q.on('filtert', 1, 0.6), E1 = q.on('één', 1);
    trechter(ctx, TRX, TRY, { s: TRS, lagen: [F, F, F], namen: q.on('algoritme', 1), hl: E1 > 0.5 ? 0 : -1, aA: [1, q.on('tienduizend', 1), 0, 0] });
    naamBij(ctx, 'algoritme', 'een vast stappenplan', TRX, 800, q.on('algoritme', 1), 'center');
    const A = q.on('aminozuur', 1), S = q.on('stopcodon', 1);
    zacht(ctx, A, () => { codonRij(ctx, 1260, 300, 'GAG'); regel(ctx, '→', 1440, 312, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1500, 300, 'GTG', { mark: 1 }); aaKraal(ctx, 1310, 400, 34, 'E'); aaKraal(ctx, 1550, 400, 34, 'V', 1, C.goud);
      naamBij(ctx, 'ander aminozuur', '', 1430, 500, 1, 'center'); });
    zacht(ctx, S, () => { codonRij(ctx, 1260, 590, 'CAG'); regel(ctx, '→', 1440, 602, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1500, 590, 'TAG', { mark: 0 }); aaKraal(ctx, 1310, 690, 34, 'Q'); stopKraal(ctx, 1550, 690, 36);
      naamBij(ctx, 'stopcodon', 'eiwit stopt te vroeg', 1430, 790, 1, 'center'); }); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    trechter(ctx, TRX, TRY, { s: TRS, hl: 1, aA: [1, 1, q.on('honderd', 2), 0] });
    const D = q.on('databank', 1), T = q.on('tien', 1), G = q.on('gewoon', 1);
    databank(ctx, 1170, 230, { a: D, aan: 3, aanA: T });
    naamBij(ctx, 'databank', 'dna van honderdduizenden mensen', 1480, 540, D, 'center');
    zacht(ctx, T, () => { roundRect(ctx, 1290, 620, 12, 48, 4); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.2); regel(ctx, '1 op de 10', 1330, 660, 1, C.text, 40, 'left', 700); });
    kruis(ctx, 1296, 644, 30, G); regel(ctx, 'te gewoon', 1330, 720, G, C.koraal, 36, 'left', 700); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    trechter(ctx, TRX, TRY, { s: TRS, hl: 2, aA: [1, 1, 1, 0] });
    const G = q.on('gezond', 1), V = q.on('eiwitvarianten', 1);
    const s = (col, a) => ({ col, a });
    stamboom(ctx, 1480, 300, 0.95, { labels: 1, gezond: G, leeftijd: '', streep: { v: [s(C.teal, V), s(C.teal, V), s(C.teal, V)], m: [s(C.oker, V), s(C.oker, V), s(C.oker, V)], k: [s(C.teal, V), s(C.oker, V), s(C.text2, V)] } });
    vraagteken(ctx, 1600, 590, V * (1 - q.on('denk', 1)), 80);
    vraagteken(ctx, 1780, 600, q.on('denk', 1), 120); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: één of twee');
    dim(ctx, () => trechter(ctx, TRX, TRY, { s: TRS, hl: 2, aA: [0, 0, 0, 0] }));
    const N = q.on('veranderingen', 1), Z = q.on('zaadcel', 1), E = q.on('eicel', 1);
    zaadcelEcht(ctx, 1240, 300, 0, t, 2.2, { a: Z });
    for (let i = 0; i < 3; i++) zacht(ctx, Z * N, () => { roundRect(ctx, 1280 + i * 22, 250, 10, 34, 3); shape(ctx, C.goud, null); });
    naamBij(ctx, 'zaadcel', 'meestal hier', 1240, 380, Z, 'center');
    eicelEcht(ctx, 1240, 560, 70, E);
    zacht(ctx, E * N, () => { roundRect(ctx, 1235, 545, 10, 34, 3); shape(ctx, C.goud, null); });
    naamBij(ctx, 'eicel', '', 1240, 706, E, 'center');
    chip(ctx, 'in de eiwitcode: meestal 1 of 2', 1440, 190, C.goud, q.on('eiwitcode', 1), 30);
    const B = q.on('bevruchte', 1, 0.8);
    pijl(ctx, 1340, 440, 1460, 440, C.line, B, 3, 14);
    zacht(ctx, B, () => { circ(ctx, 1560, 440, 70, rgba(C.oker, 0.2), C.oker, 2); roundRect(ctx, 1555, 420, 12, 40, 4); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.2); });
    naamBij(ctx, 'de novo', 'nieuw', 1560, 560, q.on('novo', 1), 'center', C.goud);
    const EC = q.on('elke', 1, 0.8);
    zacht(ctx, EC, () => { pijl(ctx, 1640, 440, 1690, 440, C.line, 1, 3, 12); for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283, cx = 1780 + (k ? Math.cos(an) * 56 : 0), cy = 440 + (k ? Math.sin(an) * 56 : 0); circ(ctx, cx, cy, 28, rgba(C.oker, 0.2), C.oker, 1.5); ctx.fillStyle = C.goud; ctx.fillRect(cx - 3, cy - 10, 6, 20); } });
    naamBij(ctx, 'elke cel', '', 1780, 560, EC, 'center'); },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const P = fasen(q, [null, ['recessieve', 1], ['ongeveer', 1], ['meisje', 1]], 0.5);
    trechter(ctx, TRX, TRY, { s: TRS, hl: P[3] > 0.5 ? -1 : 2, aA: [1, 1, 1, q.on('meisje', 1)], aantal: ['ruim 4 000 000', 'ongeveer 10 000', 'een paar honderd', '1 over'], uit: q.on('over', 1) });
    const s = (col, o = {}) => Object.assign({ col }, o);
    zacht(ctx, P[0], () => { const X = q.on('valt', 1); stamboom(ctx, 1480, 280, 0.95, { labels: 1, gezond: 1, leeftijd: '', streep: { v: [s(C.teal), s(C.koraal, { ring: 1 })], m: [s(C.oker)], k: [s(C.koraal, { ring: 1, kruis: X })] } });
      regel(ctx, 'valt meestal af', 1480, 700, X, C.koraal, 36, 'center', 700); });
    zacht(ctx, P[1], () => { stamboom(ctx, 1480, 280, 0.95, { labels: 1, gezond: 1, leeftijd: '', streep: { v: [s(C.teal, { ring: 1 })], m: [s(C.oker, { ring: 1 })], k: [s(C.teal, { ring: 1 }), s(C.oker, { ring: 1 })] } });
      naamBij(ctx, 'recessief', 'twee in één gen · één van elke ouder', 1480, 700, 1, 'center', C.goud); });
    zacht(ctx, P[2], () => { for (let i = 0; i < 3; i++) telpop(ctx, 1320 + i * 150, 480, 150, i === 0 ? C.goud : C.mens, 1); regel(ctx, 'ongeveer 1 op 3: oorzaak gevonden', 1470, 590, 1, C.text, 36, 'center', 700); regel(ctx, 'bij de rest nog niet', 1470, 645, q.on('rest', 1), C.text2, 34, 'center', 600); });
    zacht(ctx, P[3], () => { const box = scherm(ctx, 1110, 260, 750, 300, 'na de filters'); varRij(ctx, box.x + 20, box.y + 70, 'chr6', '43 512 907', 'C', 'T', { hl: 1, w: 700 });
      naamBij(ctx, 'de novo', 'gen actief in hersencellen', 1485, box.y + 190, q.on('hersencellen', 1), 'center', C.goud); }); },

  // ---------- H3 een variant met onbekende betekenis ----------
  s13(ctx, t, q) { bg(ctx, 'schema');
    const K = q.on('klassen', 1, 0.6), M = q.on('midden', 1, 1.0);
    dnaStrook(ctx, 560, 210, 800, { genen: [[0.38, 0.62, '']], plekken: [{ x: 0.5, a: 1 - M }] }); naamBij(ctx, 'gen', '', 860, 170, 1 - K, 'center');
    vraagteken(ctx, 1460, 250, q.on('ziektegen', 1) * (1 - K), 100); naamBij(ctx, 'weinig onderzocht', '', 960, 300, q.on('weinig', 1) * (1 - K), 'center', C.text2);
    vijfvak(ctx, 186, 360, { a: K, bw: 300, hl: M > 0.5 ? 2 : -1, streep: 2, aStreep: M });
    zacht(ctx, (1 - M) * K * q.on('midden', 1, 0.01), () => {});
    // het streepje valt van het gen in het middelste vak
    const fx = 960, fy = lerp(210, 415, ease(M)); if (M > 0.01 && M < 0.99) zacht(ctx, 1, () => { roundRect(ctx, fx - 6, fy - 34, 12, 68, 4); shape(ctx, C.goud, null); });
    chip(ctx, '= onduidelijke uitslag', 960, 700, C.text2, q.on('onduidelijke', 1), 34); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const [W1, W2] = wissel(q, 'weken');
    zacht(ctx, W1, () => { vijfvak(ctx, 700, 200, { bw: 200, h: 80, hl: 2, streep: 2, aStreep: 1, labels: 0 }); regel(ctx, 'onbekende betekenis', 1240, 340, 1, C.text2, 32, 'center', 600);
      samKim(ctx, t, { xs: 520, xk: 860, h: 430, poseS: 'denk', kijkK: -1 }); });
    if (W2 > 0.01) zacht(ctx, W2, () => {
      tijdKaartje(ctx, 'een paar weken later', 960, 120, 1);
      if (!H3_ALT) {
        spreekkamer(ctx, { x0: 330, x1: 1130, top: 640, map: 1, tekening: 0 });
        ouders(ctx, t, { x1: 420, x2: 600, hand: q.on('wacht', 1), uit1: q.on('vader', 1) > 0.5 ? 'bezorgd' : 'neutraal', uit2: 'bezorgd' });
        persoon(ctx, 'kim', 1040, 800, 440, { t, kijk: -1, outfit: 'gewoon', uit: 'neutraal' });
        spreekkamer(ctx, { x0: 330, x1: 1130, top: 640, map: 1, tekening: 0, stoelen: false }); // tafel vóór de mensen
        naamBij(ctx, 'Dr. Kim', '', 1040, 300, 1, 'center'); metaA(ctx, 'de ouders', 510, 300, 1, C.grain, 'center', 28);
        metaA(ctx, 'zonder Sam · privé', 1500, 420, q.on('privé', 1), C.text2, 'center', 28);
      } else {
        afdelingGang(ctx); ctx.save(); roundRect(ctx, 1500, 330, 190, 470, 6); shape(ctx, '#3A4A64', '#AFC0D0', 3); ctx.restore();
        regel(ctx, 'spreekkamer', 1595, 300, 1, C.text2, 30, 'center', 600); metaA(ctx, 'privé', 1595, 450, q.on('privé', 1), C.goud, 'center', 28);
        persoon(ctx, 'sam', 1000, 800, 440, { t, kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Sam', 'wacht op de gang', 1000, 300, 1, 'center');
      }
      vraagteken(ctx, 1600, 600, q.on('denk', 1), 120); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: nog onduidelijk, nu niets op beslissen');
    const [Z1, Z] = wissel(q, 'zegt');
    zacht(ctx, Z1, () => { stempel(ctx, 960, 330, 'overblijven ≠ bewijs', C.koraal, q.on('Overblijven', 1), -0.04); regel(ctx, 'geen diagnose', 960, 440, q.on('diagnose', 1), C.text, 40, 'center', 700);
      const B = q.on('behandeling', 1), F = q.on('familie', 1);
      zacht(ctx, B, () => { roundRect(ctx, 560, 540, 130, 70, 35); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); ctx.fillStyle = rgba(C.oker, 0.8); ctx.fillRect(625, 540, 65, 70); kruis(ctx, 625, 575, 50, 1); naamBij(ctx, 'geen behandeling', '', 625, 680, 1, 'center'); });
      zacht(ctx, F, () => { buisje(ctx, 1290, 620, '', 1, 0.5); kruis(ctx, 1290, 560, 50, 1); naamBij(ctx, 'familie niet testen', 'voor de eigen gezondheid', 1290, 740, 1, 'center'); }); });
    if (Z > 0.01) zacht(ctx, Z, () => {
      if (!H3_ALT) { spreekkamer(ctx, { x0: 330, x1: 1130, top: 640, map: 1, tekening: 0 }); ouders(ctx, t, { x1: 420, x2: 600, hand: 1, uit1: 'neutraal', uit2: 'neutraal' });
        persoon(ctx, 'kim', 1040, 800, 440, { t, kijk: -1, outfit: 'gewoon', uit: 'praat' }); spreekkamer(ctx, { x0: 330, x1: 1130, top: 640, map: 1, tekening: 0, stoelen: false }); }
      else { afdelingGang(ctx); samKim(ctx, t, { xs: 520, xk: 960, h: 440, kijkK: -1, uitK: 'praat' }); }
      vink_(ctx, 1300, 330, 26, q.on('weten', 1)); regel(ctx, 'nog niet bekend', 1350, 345, q.on('weten', 1), C.groen, 40, 'left', 700);
      kruis(ctx, 1300, 450, 24, q.on('niets', 1)); regel(ctx, 'niets gevonden', 1350, 465, q.on('niets', 1), C.koraal, 40, 'left', 700); }); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    const P = fasen(q, [null, ['Radboudumc', 1], ['anders', 1], ['ouders', 1]], 0.5);
    zacht(ctx, P[0], () => { const R = 300, cx = 960, cy = 450, lonC = -25, latC = 22; aardeVast(ctx, cx, cy, R, 1, lonC, latC);
      const pts = [[5.8, 51.8], [-71, 42.3], [-46.6, -23.5]].map(([lo, la]) => bolPunt(cx, cy, R, lo, la, lonC, latC));
      const on = [q.on('lab', 1), q.on('elders', 1), q.on('Drie', 1)];
      for (let i = 1; i < 3; i++) zacht(ctx, on[i], () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); ctx.quadraticCurveTo((pts[0].x + pts[i].x) / 2, Math.min(pts[0].y, pts[i].y) - 80, pts[i].x, pts[i].y); ctx.stroke(); ctx.setLineDash([]); });
      pts.forEach((p, i) => artsIcoon(ctx, p.x, p.y, 1, on[i], i === 2 ? q.on('Drie', 1) : 0));
      naamBij(ctx, 'koppelsite', 'artsen met hetzelfde gen', 960, 820, on[0], 'center');
      regel(ctx, 'zelfde gen, zelfde klachten', 1310, 240, q.on('Drie', 1), C.goud, 36, 'left', 700); regel(ctx, 'moeilijk toeval', 1310, 290, q.on('toeval', 1), C.text, 34, 'left', 600); });
    zacht(ctx, P[1], () => { metaA(ctx, 'radboudumc · kinderen zonder diagnose', 960, 260, 1, C.grain, 'center', 28); tijdKaartje(ctx, 'vijf jaar later', 960, 350, q.on('jaar', 1));
      for (let i = 0; i < 10; i++) telpop(ctx, 610 + i * 78, 560, 120, i < 3 && q.on('alsnog', 1) > 0.5 ? C.goud : C.mens, 1);
      regel(ctx, 'bijna een derde: alsnog een diagnose', 960, 660, q.on('alsnog', 1), C.goud, 40, 'center', 700); });
    zacht(ctx, P[2], () => { const L = q.on('onschuldig', 1, 1.2); vijfvak(ctx, 330, 340, { bw: 240, h: 100, hl: -1, streep: 2, aStreep: 1 - L }); const sx = lerp(330 + 2 * 252 + 120, 330 + 0 * 252 + 120, ease(L)); if (L > 0.01) { roundRect(ctx, sx - 9, 356, 18, 68, 5); shape(ctx, C.goud, null); }
      regel(ctx, 'veel varianten met onbekende betekenis: later onschuldig', 960, 700, L, C.groen, 36, 'center', 700); });
    zacht(ctx, P[3], () => { jaarKalender(ctx, 760, 430, 1.1, 1, q.on('nieuwe', 1)); regel(ctx, 'over een paar jaar', 1020, 400, 1, C.text, 40, 'left', 700); regel(ctx, 'nieuwe analyse?', 1020, 460, q.on('nieuwe', 1), C.goud, 40, 'left', 700); metaA(ctx, 'de ouders kiezen zelf', 1020, 530, q.on('kiezen', 1), C.grain, 'left', 28); }); },

  // ---------- H4 GWAS en risicoscores ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    const [G1, G] = wissel(q, 'GWAS');
    zacht(ctx, G1, () => { afdelingGang(ctx, 1, [1640]); samKim(ctx, t, { xs: 330, xk: 700, h: 440, poseS: q.on('hartziekte', 1) > 0.5 && q.on('schudt', 1) < 0.5 ? 'denk' : 'staan', kijkK: -1, uitS: q.on('hartziekte', 1) > 0.5 && q.on('schudt', 1) < 0.5 ? 'verbaasd' : 'neutraal' });
      hartje(ctx, 400, 190, 0.8, q.on('hartziekte', 1)); regel(ctx, '1 variant?', 450, 205, q.on('variant', 1), C.text, 38, 'left', 700); kruis(ctx, 700, 190, 24, q.on('schudt', 1));
      const V = q.on('veel', 1); dnaStrook(ctx, 960, 230, 880, { a: V, plekken: Array.from({ length: 22 }, (_, i) => ({ x: 0.03 + i * 0.044 + 0.01 * hash(i), a: clamp((t - q.at('veel', 1)) * 4 - i * 0.15, 0, 1), col: C.koraal })) });
      naamBij(ctx, 'heel veel varianten', 'elk een klein effect', 1400, 330, V, 'center'); });
    zacht(ctx, G, () => { tag(ctx, 'GWAS · genoombrede associatiestudie', 960, 170, C.goud, 1, 'center', 40);
      const M = q.on('vergelijkt', 1), L = q.on('letter', 1);
      for (let g = 0; g < 2; g++) zacht(ctx, M, () => { const x0 = g ? 1080 : 260; regel(ctx, g ? 'zonder hartziekte' : 'met hartziekte', x0 + 290, 300, 1, g ? C.text : C.koraal, 36, 'center', 700);
        for (let i = 0; i < 12; i++) { const px = x0 + 40 + (i % 6) * 100, py = 440 + Math.floor(i / 6) * 190; telpop(ctx, px, py, 100, g ? C.mens : rgba(C.koraal, 0.85), 1); const isG = g ? i % 4 === 1 : i % 2 === 0 || i === 3; tegel(ctx, px, py + 40, isG ? 'G' : 'A', { w: 36, h: 42, px: 28, a: L, rand: isG && L > 0.5 ? C.goud : null }); } });
      metaA(ctx, 'vaker G bij de zieken', 960, 830, q.on('zieken', 1), C.goud, 'center', 28); }); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const u = clamp((t - 0.2) / 3.5, 0.05, 1);
    manhattan(ctx, 220, 220, 1380, 520, { u });
    regel(ctx, '≈ 1 000 000 tests', 1600, 180, q.on('miljoen', 1), C.goud, 40, 'right', 700);
    metaA(ctx, 'zoals in toeval of echt?', 220, 160, q.on('Toeval', 1) * (1 - q.on('Stel', 1)), C.grain, 'left', 28);
    regel(ctx, 'stel: geen enkele plek doet iets', 220, 160, q.on('Stel', 1), C.text, 36, 'left', 700);
    vraagteken(ctx, 1760, 460, q.on('denk', 1), 120); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer vijftigduizend');
    const P = fasen(q, [null, ['treffer', 1]], 0.5);
    zacht(ctx, P[0], () => { const H = q.on('strengere', 1);
      manhattan(ctx, 220, 260, 1300, 480, { laag: q.on('Nul', 1) * (1 - H * 0.6), boven: q.on('Nul', 1) * (1 - H), hoog: H });
      zacht(ctx, q.on('keer', 1) * (1 - H * 0.7), () => { roundRect(ctx, 1020, 180, 840, 70, 14); shape(ctx, rgba(C.bgSchema, 0.94), C.koraal, 2); regel(ctx, '0,05 × 1 000 000 = 50 000', 1440, 230, 1, C.text, 44, 'center', 700); }); });
    zacht(ctx, P[1], () => { manhattan(ctx, 220, 220, 900, 380, { hoog: 1, toren: 1, u: 1 });
      const N = q.on('naast', 1); dnaStrook(ctx, 1220, 420, 620, { genen: [[0.55, 0.9, 'gen', 1]], plekken: [{ x: 0.3, col: C.goud }, { x: 0.68, col: C.koraal, a: N }] });
      naamBij(ctx, 'treffer', 'gemeten plek', 1406, 520, 1, 'center', C.goud); naamBij(ctx, 'oorzaak', 'de buurman', 1640, 520, N, 'center', C.koraal);
      zacht(ctx, N, () => boogPijlBi2(ctx, 1406, 370, 1640, 370, C.koraal)); }); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    const S = q.on('risicoscore', 1), V = q.on('vergelijkt', 1);
    scoreBalk(ctx, 260, 230, 1400, { u: clamp((t - 0.3) / 3.2, 0, 1) });
    naamBij(ctx, 'polygene risicoscore', 'veel kleine effecten opgeteld', 960, 360, S, 'center');
    scoreVerdeling(ctx, 460, 470, 1000, 240, { a: V, aJ: q.on('aanleg', 1) });
    chip(ctx, 'een kans, geen diagnose', 960, 830, C.groen, q.on('kans', 1), 32);
    vraagteken(ctx, 1700, 560, q.on('denk', 1), 120); },

  s24(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: minder goed dan bij Europese voorouders');
    const P = fasen(q, [null, ['buurman', 1]], 0.5);
    zacht(ctx, P[0], () => { const R = 280, cx = 960, cy = 500, lonC = 15, latC = 25; aardeVast(ctx, cx, cy, R, 1, lonC, latC);
      [[10, 50, 46], [-90, 40, 18], [105, 35, 18], [20, 0, 9], [-60, -15, 8]].forEach(([lo, la, r], i) => { const p = bolPunt(cx, cy, R, lo, la, lonC, latC); if (p.zicht) zacht(ctx, clamp((t - q.at('deelnemers', 1) - i * 0.2) / 0.5, 0, 1), () => circ(ctx, p.x, p.y, r, rgba(C.goud, 0.75), C.goud, 2)); });
      naamBij(ctx, 'de meeste deelnemers', 'europese voorouders', 1290, 300, q.on('Europese', 1), 'left', C.goud); });
    zacht(ctx, P[1], () => { [['Europese voorouders', 330, true], ['Afrikaanse voorouders', 600, false]].forEach(([nm, y, vast]) => {
        regel(ctx, nm, 240, y + 12, q.on('afkomst', 1) || (vast ? 1 : 0), C.text, 36, 'left', 700); const a = vast ? 1 : q.on('afkomst', 1);
        dnaStrook(ctx, 700, y, 1000, { a, genen: [[0.5, 0.75, 'gen']], plekken: [{ x: 0.25, col: C.goud }, { x: 0.58, col: C.koraal }] });
        zacht(ctx, a, () => { const x1 = 700 + 250, x2 = 700 + 580; ctx.strokeStyle = vast ? C.groen : C.koraal; ctx.lineWidth = 3; if (!vast) ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(x1, y - 44); ctx.lineTo(x1, y - 64); ctx.lineTo(x2, y - 64); ctx.lineTo(x2, y - 44); ctx.stroke(); ctx.setLineDash([]); if (!vast) kruis(ctx, (x1 + x2) / 2, y - 64, 18, 1); }); });
      naamBij(ctx, 'gemeten plek', '', 950, 410, 1, 'center', C.goud); naamBij(ctx, 'oorzaak', '', 1280, 410, 1, 'center', C.koraal);
      chip(ctx, 'leefstijl telt mee', 960, 820, C.groen, q.on('leefstijl', 1), 32); }); },

  // ---------- Recap ----------
  s25(ctx, t, q) { bg(ctx, 'schema');
    const l1 = q.on('eiwit', 1), l2 = q.on('zeldzaam', 1), l3 = q.on('familie', 1);
    trechter(ctx, 450, 200, { s: 0.8, lagen: [1, 1, 1], hl: l3 > 0.5 ? 2 : l2 > 0.5 ? 1 : l1 > 0.5 ? 0 : -1, aA: [1, 0, 0, q.on('één', 1)], aantal: ['ruim 4 000 000', '', '', 'soms 1'], uit: q.on('één', 1) });
    const B = q.on('bewijs', 1);
    vijfvak(ctx, 900, 230, { a: B, bw: 120, h: 70, hl: 2, streep: 2, aStreep: 1, labels: 0 }); regel(ctx, 'overblijven ≠ bewijs', 1220, 380, B, C.koraal, 36, 'center', 700);
    jaarKalender(ctx, 1700, 300, 0.55, q.on('weet', 1), 1); regel(ctx, 'eerlijk: nog niet bekend', 1220, 430, q.on('eerlijk', 1), C.text2, 32, 'center', 600);
    const K = q.on('kansen', 1); scoreBalk(ctx, 900, 590, 940, { a: K, u: clamp((t - q.at('kansen', 1)) / 1.5, 0, 1) }); naamBij(ctx, 'veelvoorkomende ziekten', 'kleine kansen opgeteld', 1370, 710, K, 'center'); },

  s26(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'sam', 180, 800, 400, { t, kijk: 1, uit: 'blij' }); naamBij(ctx, 'Sam', '', 180, 360, 1, 'center');
    const KG = q.on('Klinisch', 1, 0.6);
    zacht(ctx, 1 - KG, () => { opleiding(ctx, 420, 150, 620, 'hbo · vier jaar', 'Bio-informatica', 'HAN · Nijmegen', q.on('hbo', 1), C.teal);
      opleiding(ctx, 420, 360, 620, 'wo-bachelor', 'Biologie of Moleculaire Levensw.', 'Radboud · Nijmegen', q.on('bachelor', 1), C.paars);
      pijl(ctx, 1060, 435, 1140, 435, C.line, q.on('master', 1), 3, 14);
      opleiding(ctx, 1160, 360, 620, 'master', 'Bioinformatics', 'Wageningen', q.on('master', 1), C.paars);
      [['ziekenhuis', 700], ['instituut', 1000], ['bedrijf', 1300]].forEach(([s2, x], i) => { const a = clamp((t - q.at('werkt', 1) - i * 0.5) / 0.4, 0, 1); werkIcoon(ctx, x, 660, s2, a); regel(ctx, ['ziekenhuis', 'onderzoeksinstituut', 'bedrijf'][i], x, 760, a, C.text2, 28, 'center', 600); }); });
    zacht(ctx, KG, () => { persoon(ctx, 'kim', 1500, 800, 440, { t, kijk: -1, outfit: 'gewoon', uit: 'blij' }); naamBij(ctx, 'Dr. Kim', 'klinisch geneticus', 1500, 300, 1, 'center');
      opleiding(ctx, 420, 250, 760, 'arts', 'Geneeskunde', 'eerst arts worden', q.on('geneeskunde', 1), C.teal);
      opleiding(ctx, 420, 460, 760, 'vervolgopleiding · vier jaar', 'Klinisch geneticus', 'in een academisch ziekenhuis', q.on('vervolgopleiding', 1), C.goud); }); },
});

function boogPijlBi2(ctx, x1, y1, x2, y2, col) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 70; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.restore(); const an = Math.atan2(y2 - my, x2 - mx); pijl(ctx, x2 - Math.cos(an) * 2, y2 - Math.sin(an) * 2, x2, y2, col, 1, 4, 18); }
