/* =====================================================================================
   Erfelijkheid · les 2 · Kruisen en tellen (28 oktober 2026)
   Eigen hulpen met prefix L2_. Films: 2 Monohybride kruisingen, 3 Voorbij dominant en recessief,
   5 Overerving via X-chromosomen en mitochondriën.
   ===================================================================================== */
const L2_vulP = () => rgba(BLOEM.paars, C.licht ? 0.28 : 0.32);
const L2_vulW = () => C.licht ? '#EEECE6' : rgba('#F2F2EE', 0.16);
const L2_GEEL = () => C.licht ? '#D8AE2E' : '#E6C658', L2_GRIJS = () => C.licht ? '#8C8C92' : '#A4A4AC';

// kleine erwtenplant met wiegen
function L2_plant(ctx, x, y, h, kl, a, T, o = {}) { erwtPlant(ctx, x, y, h, kl, { a, t: T, peul: o.peul }); }
// eiwit/enzym als gevouwen keten: kronkelende lijn met gloed; kapot = grijs met koraal kruisje
function L2_enzym(ctx, x, y, s, kl, a = 1, T = 0, kapot = false) { if (a <= 0.01) return;
  const pts = []; for (let i = 0; i <= 11; i++) { const an = i * 1.9 + Math.sin(i * 2.3) * 0.6, r = s * (0.25 + 0.55 * hash(i * 3.1 + 2)); pts.push([x + Math.cos(an) * r + Math.sin(T * 1.3 + i) * s * 0.02, y + Math.sin(an) * r * 0.8]); }
  ctx.save(); ctx.globalAlpha *= a; if (!kapot) gloed(ctx, x, y, s * 1.3, kl, 0.8); ctx.restore();
  lijnPad(ctx, pts, kapot ? rgba(C.line, 0.9) : kl, Math.max(4, s * 0.13), a);
  if (kapot) kruis(ctx, x + s * 0.75, y - s * 0.6, s * 0.22, a, C.koraal); }
// antigeen (suikerketentje) zoals in rodeBloedcel: A = goud vertakt, B = teal met blokje; richting omhoog
function L2_antigeen(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; const kl = soort === 'A' ? C.goud : C.teal; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = Math.max(3, s * 0.12); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y + s * 0.5); ctx.lineTo(x, y - s * 0.2); ctx.stroke();
  if (soort === 'A') { ctx.beginPath(); ctx.moveTo(x, y - s * 0.2); ctx.lineTo(x - s * 0.3, y - s * 0.5); ctx.moveTo(x, y - s * 0.2); ctx.lineTo(x + s * 0.3, y - s * 0.5); ctx.stroke(); circ(ctx, x, y - s * 0.2, s * 0.14, kl); }
  else { roundRect(ctx, x - s * 0.18, y - s * 0.56, s * 0.36, s * 0.36, 3); shape(ctx, kl, null); circ(ctx, x, y - s * 0.72, s * 0.12, kl); }
  ctx.restore(); }
// mitochondrion met cristae en rond DNA (paars)
function L2_mito(ctx, x, y, w, h, a = 1, T = 0, o = {}) { if (a <= 0.01) return; const kl = C.oker; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(kl, C.licht ? 0.16 : 0.22), kl, Math.max(2, h * 0.03));
  ctx.beginPath(); ctx.ellipse(x, y, w / 2 - h * 0.08, h / 2 - h * 0.08, 0, 0, 6.283); ctx.strokeStyle = rgba(kl, 0.7); ctx.lineWidth = Math.max(1.5, h * 0.02); ctx.stroke();
  ctx.strokeStyle = rgba(dk(kl, 0.15), 0.85); ctx.lineWidth = Math.max(1.5, h * 0.025); ctx.lineCap = 'round';
  const n = 6; for (let i = 0; i < n; i++) { const cx = x - w * 0.36 + i * w * 0.72 / (n - 1), up = i % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(cx, y + up * h * 0.42); ctx.lineTo(cx, y + up * h * 0.05); ctx.stroke(); }
  if (!o.geenDNA) { const rr = h * 0.13; [[-0.18, 0.12], [0.12, -0.12], [0.3, 0.16]].forEach(([dx, dy], i) => { ctx.beginPath(); ctx.ellipse(x + dx * w, y + dy * h, rr * (1 + 0.05 * Math.sin(T + i)), rr * 0.8, 0.4, 0, 6.283); ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(2, h * 0.035); ctx.stroke(); }); }
  ctx.restore(); }
// rij vakjes met een genotype onder een plant
function L2_chip(ctx, s, x, y, a, o = {}) { allelChip(ctx, s, x, y, a, Object.assign({ px: 38 }, o)); }
// een plant of bloem onder een 'ouder'-paneel met ×
function L2_maal(ctx, x, y, a, px = 56) { regel(ctx, '×', x, y, a, C.text2, px, 'center', 700); }
// vul van een vakje per fenotype
const L2_vak = (kl, a) => ({ vul: rgba(kl, a == null ? 0.32 : a) });

/* ---------- 0 · start ---------- */
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Erfelijkheid</b> · les 2: kruisen en tellen', n: 'Kies eerst havo of vwo. Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Vorige les: chromosomen, genen en allelen, homozygoot en heterozygoot, dominant en recessief (film 1).' }],
  teken(ctx, S) { const T = S.T;
    metaText(ctx, 'Erfelijkheid · les 2', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Kruisen', 140, 470, fTitel(112), C.text); text(ctx, 'en tellen', 140, 600, fTitel(112), C.goud);
    regel(ctx, 'kruisingsschema · intermediair en bloedgroepen', 144, 690, 1, C.text2, 32, 'left', 400);
    regel(ctx, 'X-chromosoom en mitochondriën', 144, 740, 1, C.text2, 32, 'left', 400);
    L2_plant(ctx, 1380, 900, 560, BLOEM.paars, 1, T, { peul: true }); L2_plant(ctx, 1660, 900, 420, BLOEM.wit, 1, T + 2);
  } });

/* ---------- 1 · opening ---------- */
const L2_KIND1 = [1, 1, 0, 1, 1, 1, 0, 1]; // 0 = wordt wit
SCHERMEN.push({ titel: 'Twee puzzels', kop: 'Twee paarse planten, witte kinderen', deel: 'Opening',
  stappen: [
    { t: '<b>Mendel</b> kweekte erwtenplanten. Hij kruiste twee planten met <b>paarse</b> bloemen.', n: 'Haak uit film 2 (Monohybride kruisingen). Gregor Mendel, monnik in Brno, kweekte van 1856 tot 1863 erwten en publiceerde in 1866. Geen tekening van Mendel zelf: alleen de planten.' },
    { t: 'Ze krijgen een rij nakomelingen.', n: 'Kruisen = stuifmeel van de ene plant op de stamper van de andere. Erwten bestuiven zichzelf normaal; Mendel knipte de meeldraden weg.' },
    { t: 'Tussen de nakomelingen zitten ineens <b>witte</b> planten.', n: 'Vraag uit film 2: Twee paarse ouders, witte nakomelingen: hoe kan dat? (puzzel 1; antwoord op scherm 3–5).' },
    { t: 'En een paarse plant: aan de buitenkant zie je niet welke <b>allelen</b> erin zitten.', n: 'Vraag uit film 2: Hoe kom je erachter welke allelen in een paarse plant zitten, zonder DNA-test? (puzzel 2; antwoord op scherm 8, de terugkruising).' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.2), s2 = S.on(2, 1.0), s3 = S.on(3, 0.9);
    L2_plant(ctx, 380, 560, 360, BLOEM.paars, s0, T); L2_plant(ctx, 760, 560, 360, BLOEM.paars, s0, T + 1); L2_maal(ctx, 570, 420, s0);
    pijl(ctx, 570, 600, 570, 680, C.text2, 5, s1);
    L2_KIND1.forEach((w, i) => { const a = S.on(1, 0.5, i * 0.08); const kl = w ? BLOEM.paars : mix(BLOEM.paars, BLOEM.wit, s2); L2_plant(ctx, 190 + i * 108, 990, 240, kl, a, T + i * 0.7); });
    if (s2 > 0.01) [2, 6].forEach(i => gloed(ctx, 190 + i * 108, 760, 70, C.goud, s2 * 0.7));
    // puzzel 2
    paneel(ctx, 1220, 230, 600, 720, s3); L2_plant(ctx, 1520, 800, 440, BLOEM.paars, s3, T + 3);
    L2_chip(ctx, 'A?', 1520, 870, s3, { px: 46, kl: C.goud });
  } });

/* ---------- 2 · Mendels proef ---------- */
// F2: 705 paars en 224 wit, door elkaar (vast patroon)
const L2_F2 = (() => { const r = toeval(7), arr = Array.from({ length: 929 }, (_, i) => i < 224 ? 0 : 1); for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; })();
const L2_F2tel = (() => { const c = [0]; L2_F2.forEach(v => c.push(c[c.length - 1] + v)); return c; })();
function L2_stipVeld(ctx, x, y, w, h, arr, zicht, a, r0) { if (a <= 0.01) return; const n = arr.length, kol = Math.max(1, Math.round(Math.sqrt(n * w / h))), rijen = Math.ceil(n / kol), dx = w / kol, dy = h / rijen, r = r0 || Math.min(dx, dy) * 0.36;
  ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < Math.min(n, zicht); i++) { const c = i % kol, rr = Math.floor(i / kol), wit = !arr[i]; circ(ctx, x + c * dx + dx / 2, y + rr * dy + dy / 2, r, wit ? BLOEM.wit : BLOEM.paars, wit ? rgba(C.line, 0.9) : null, 1.5); } ctx.restore(); }
SCHERMEN.push({ titel: 'Mendels proef', kop: 'Mendels proef', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'P: een <b>raszuivere</b> paarse plant × een raszuivere witte. Raszuiver = homozygoot: <b>AA</b> en <b>aa</b>.', n: 'Raszuiver: planten die al generaties lang alleen paarse of alleen witte nakomelingen gaven. P = parentes, de oudergeneratie.' },
    { t: 'F1: alle nakomelingen zijn <b>paars</b>. Ze kregen een A en een a: <b>Aa</b>. A is dominant.', n: 'Vraag uit film 2: Wat verwacht je als je twee planten uit de F1 met elkaar kruist?' },
    { t: 'F1 × F1: in de F2 komt <b>wit terug</b>. Mendel telde elke plant.', n: '929 stippen = 929 planten, precies Mendels aantallen uit 1866 (bloemkleur).' },
    { t: '705 paars : 224 wit ≈ <b>3 : 1</b>. Het allel voor wit zat verborgen in de F1.', n: '705 / 224 = 3,15. Mendel vond bij alle zeven eigenschappen een verhouding dicht bij 3 : 1 (bijv. 5474 rond : 1850 gerimpeld). Zie briefing.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), s2 = S.on(2, 3.0), s3 = S.on(3, 0.9);
    metaText(ctx, 'P', 100, 360, C.meta, 'left', 30, s0);
    L2_plant(ctx, 260, 470, 270, BLOEM.paars, s0, T); L2_plant(ctx, 580, 470, 270, BLOEM.wit, s0, T + 1); L2_maal(ctx, 420, 360, s0, 50);
    L2_chip(ctx, 'AA', 260, 530, S.on(0, 0.6, 0.6)); L2_chip(ctx, 'aa', 580, 530, S.on(0, 0.6, 0.6));
    pijl(ctx, 420, 580, 420, 650, C.text2, 5, s1); metaText(ctx, 'F1', 100, 800, C.meta, 'left', 30, s1);
    [0, 1, 2, 3].forEach(i => L2_plant(ctx, 210 + i * 140, 900, 220, BLOEM.paars, S.on(1, 0.5, i * 0.1), T + i));
    L2_chip(ctx, 'Aa', 420, 955, S.on(1, 0.6, 0.5), { kl: C.goud });
    // F2
    pijl(ctx, 720, 780, 900, 640, C.text2, 5, s2 > 0 ? 1 : 0);
    metaText(ctx, 'F2 · F1 × F1', 960, 210, C.meta, 'left', 24, s2 > 0 ? 1 : 0);
    const zicht = Math.floor(s2 * 929); L2_stipVeld(ctx, 960, 232, 840, 520, L2_F2, zicht, s2 > 0 ? 1 : 0);
    const p = L2_F2tel[zicht], w = zicht - p, at = (s2 > 0 ? 1 : 0) * (1 - s3);
    regel(ctx, `paars ${p}`, 1180, 820, at, C.text, 38, 'center', 700); regel(ctx, `wit ${w}`, 1580, 820, at, C.text, 38, 'center', 700);
    verhouding(ctx, 960, 860, 840, 56, [{ n: 3, kl: BLOEM.paars, label: '705 paars' }, { n: 1, kl: C.line, label: '224 wit' }], s3, { tekst: '705 : 224 ≈ 3 : 1', tpx: 42 });
  } });

/* ---------- 3 · gameten ---------- */
SCHERMEN.push({ titel: 'Gameten', kop: 'Meiose in de F1-plant', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'Een cel in een meeldraad van een F1-plant: <b>Aa</b>. Het ene chromosoom draagt A, het andere a.', n: 'Teal = chromosoom van de ene ouder, oker = van de andere. Het chromosoom is al gekopieerd (twee chromatiden, X-vorm).' },
    { t: 'Meiose I: de chromosomen van het paar gaan <b>uit elkaar</b>.', n: 'Wet van de segregatie (splitsingswet): de twee allelen van een gen komen in verschillende gameten.' },
    { t: 'Meiose II: de <b>chromatiden</b> gaan uit elkaar. Vier gameten: twee met A, twee met a. Elk ½.', n: 'Bij een plant zijn dit de stuifmeelkorrels (die de zaadcel leveren).' },
    { t: 'In de <b>eicellen</b> van de andere F1-plant gebeurt precies hetzelfde: ½ A en ½ a.', n: 'Meiose in de vruchtbeginsels. Ook daar: elk allel met kans ½.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.6), s2 = S.on(2, 1.8), s3 = S.on(3, 0.9);
    // echte deling: moedercel → twee cellen → vier gameten; elke cel gaat óp in zijn dochtercellen (geen lege omtrekken)
    const M = [560, 600], D = [[560, 380], [560, 820]], G = [[400, 380], [720, 380], [400, 820], [720, 820]];
    const e1 = ease(clamp(s1 / 0.4, 0, 1)), m1 = ease(clamp((s1 - 0.35) / 0.65, 0, 1)), g = ease(clamp(s2 / 0.8, 0, 1));
    cel(ctx, M[0], M[1], 270, 245, s0 * (1 - m1), { geenKern: true, kl: C.groen, seed: 3 });
    naam(ctx, 'cel in een meeldraad', M[0], 315, s0 * (1 - s1), 'center', C.groen, 34);
    const dpos = D.map(([x, y]) => [lerp(M[0], x, m1), lerp(M[1], y, m1)]);
    if (m1 > 0.01) dpos.forEach(([x, y], i) => cel(ctx, x, y, lerp(200, 185, m1), lerp(180, 165, m1), Math.min(1, m1 * 2) * (1 - g), { geenKern: true, kl: C.groen, seed: 5 + i }));
    const gpos = G.map(([x, y], k) => { const [dx, dy] = D[k >> 1]; return [lerp(dx, x, g), lerp(dy, y, g)]; });
    if (g > 0.01) gpos.forEach(([x, y]) => gameet(ctx, x, y, lerp(130, 110, g), '', { soort: 'cel', kl: C.groen, a: Math.min(1, g * 2) }));
    [[CH.vader, 'A', -1, 0], [CH.moeder, 'a', 1, 1]].forEach(([kl, letter, zij, i]) => {
      if (s2 < 0.01) { const x = lerp(M[0] + zij * 75 * (1 + e1 * 0.5), dpos[i][0], m1), y = lerp(M[1], dpos[i][1], m1);
        chromosoom(ctx, x, y, lerp(240, 175, m1), { kl, dubbel: 1, a: s0, banden: [{ p: 0.66, letter, px: 52 }], letterLinks: zij < 0 }); return; }
      [0, 1].forEach(k => { const [x, y] = gpos[i * 2 + k], sp = (1 - g) * (k ? 20 : -20);
        chromosoom(ctx, x + sp - 14 * g, y, lerp(175, 140, g), { kl, dubbel: 0, a: s0, banden: [{ p: 0.66, letter, px: 52 }], letterLinks: false }); }); });
    regel(ctx, '½ A', 990, 405, g, C.goud, 72, 'center', 700); regel(ctx, '½ a', 990, 845, g, C.goud, 72, 'center', 700);
    // eicellen van de andere plant
    paneel(ctx, 1220, 190, 620, 800, s3); naam(ctx, 'eicellen (Aa)', 1530, 270, s3, 'center', C.oker, 40);
    [['A', 1400, 450], ['A', 1660, 450], ['a', 1400, 700], ['a', 1660, 700]].forEach(([l, x, y], i) => gameet(ctx, x, y, 92, l, { soort: 'ei', a: S.on(3, 0.5, 0.2 + i * 0.1), px: 62 }));
    regel(ctx, '½ A · ½ a', 1530, 920, s3, C.goud, 52, 'center', 700);
  } });

/* ---------- 4 · het kruisingsschema ---------- */
function L2_schemaAa(ctx, x, y, v, prog, a, o = {}) { return kruisSchema(ctx, x, y, Object.assign({ links: ['A', 'a'], boven: ['A', 'a'], vak: v, prog, a, klLinks: CH.vader, klBoven: CH.moeder,
  cel: (i, j, g) => g === 'aa' ? { vul: L2_vulW(), rand: rgba(C.line, 0.6) } : { vul: L2_vulP() } }, o)); }
SCHERMEN.push({ titel: 'Kruisingsschema', kop: 'Het kruisingsschema', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'Links de gameten van de ene ouder, boven die van de andere: allebei <b>Aa</b>.', n: 'Kleur: teal = gameten van de ene plant (stuifmeel), oker = van de andere (eicellen).' },
    { t: 'Elk vakje is één mogelijke <b>bevruchting</b>: A met A geeft AA, A met a geeft Aa, en zo verder.', n: 'Paars vakje = minstens één A (paars), licht vakje = aa (wit).' },
    { t: 'Genotypen: <b>1 AA : 2 Aa : 1 aa</b>.', n: 'Aa staat er twee keer: A van de ene en a van de andere ouder, of andersom.' },
    { t: 'Fenotypen: <b>3 paars : 1 wit</b>. Dat is Mendels 3 : 1.', n: 'Drie van de vier vakjes hebben minstens één A. Terug naar puzzel 1: de witte kinderen kregen van beide paarse (Aa) ouders een a.' }
  ],
  teken(ctx, S) { const s0 = S.on(0, 0.9), s1 = S.on(1, 2.2), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    L2_schemaAa(ctx, 470, 420, 250, s1, s0, { kopLinks: 'gameten ouder 1', kopBoven: 'gameten ouder 2', px: 80 });
    [['AA', 1250, 1], ['Aa', 1500, 2], ['aa', 1750, 1]].forEach(([g, x, n], i) => { const a = S.on(2, 0.5, i * 0.15); regel(ctx, String(n), x, 400, a, C.goud, 90, 'center', 700); L2_chip(ctx, g, x, 490, a, { px: 54 }); });
    regel(ctx, ':', 1375, 395, s2, C.text2, 76, 'center', 700); regel(ctx, ':', 1625, 395, s2, C.text2, 76, 'center', 700);
    metaText(ctx, 'genotypen', 1500, 270, C.meta, 'center', 26, s2);
    metaText(ctx, 'fenotypen', 1500, 660, C.meta, 'center', 26, s3);
    verhouding(ctx, 1140, 710, 720, 100, [{ n: 3, kl: BLOEM.paars, in: '3', label: 'paars' }, { n: 1, kl: C.line, in: '1', label: 'wit' }], s3, { px: 34 });
  } });

/* ---------- 5 · kansen, geen aantallen ---------- */
const L2_SIM = (() => { const r = toeval(11); return Array.from({ length: 400 }, () => r() < 0.75 ? 1 : 0); })();
const L2_SIMtel = (() => { const c = [0]; L2_SIM.forEach(v => c.push(c[c.length - 1] + v)); return c; })();
const L2_SIMpos = (() => { let p = 0, w = 0; return L2_SIM.map(v => v ? p++ : w++); })();
SCHERMEN.push({ titel: 'Kansen', kop: 'Kansen, geen aantallen', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'Voor aa moeten <b>beide</b> gameten een a hebben: ½ × ½ = ¼. Kansen die allebei moeten gebeuren, vermenigvuldig je.', n: 'Productregel. Later (les 3, stambomen) komt de somregel erbij: kansen die elkaar uitsluiten, tel je op.' },
    { t: 'Deze twee Aa-planten krijgen <b>vier</b> nakomelingen: hier 2 paars en 2 wit.', n: 'Vraag uit film 2: Vier nakomelingen: zijn dat er precies drie paars en één wit? Rekenvoorbeeld (briefing): de kans op precies 3 paars en 1 wit is 4 × (¾)³ × ¼ ≈ 42 %; op 2 : 2 ≈ 21 %; op 4 paars ≈ 32 %.' },
    { t: 'Bij <b>400</b> nakomelingen kom je dicht bij 3 : 1. Elke bevruchting is toeval.', n: 'Vaste toevalsreeks: 304 paars en 96 wit (3,17 : 1). Hoe meer nakomelingen, hoe dichter bij de verwachte verhouding (wet van de grote aantallen).' },
    { t: 'Het schema geeft <b>kansen</b>. De vier vakjes zijn geen vier kinderen.', n: 'Misvatting: "Ze hebben al drie paarse kinderen, dus het vierde wordt wit." Elke bevruchting is opnieuw ¼ kans op wit.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), s2 = S.on(2, 4.0), s3 = S.on(3, 0.9);
    breuk(ctx, 1, 2, 190, 290, 76, s0); regel(ctx, '×', 320, 310, s0, C.text2, 72, 'center', 700); breuk(ctx, 1, 2, 450, 290, 76, s0); regel(ctx, '=', 580, 310, s0, C.text2, 72, 'center', 700); breuk(ctx, 1, 4, 710, 290, 76, s0, C.goud);
    regel(ctx, 'kans op aa', 820, 312, s0, C.text2, 36, 'left', 600);
    termKaart(ctx, 'productregel', 'en … en: vermenigvuldigen', 470, 430, S.on(0, 0.6, 0.5));
    [1, 0, 1, 0].forEach((v, i) => L2_plant(ctx, 190 + i * 185, 800, 230, v ? BLOEM.paars : BLOEM.wit, S.on(1, 0.5, i * 0.15), T + i));
    regel(ctx, '4 nakomelingen: 2 : 2', 470, 858, S.on(1, 0.6, 0.7), C.text, 40, 'center', 700);
    // 400 bevruchtingen vallen in twee kolommen
    const zicht = s2 * 400, kolP = 1280, kolW = 1660, basis = 880, per = 19, d = 19;
    if (s2 > 0.001 || S.on(2) > 0) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1080, basis + 14); ctx.lineTo(1840, basis + 14); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < Math.min(400, Math.ceil(zicht)); i++) { const v = L2_SIM[i], k = L2_SIMpos[i], cx = (v ? kolP : kolW) + ((k % per) - (per - 1) / 2) * d, ty = basis - Math.floor(k / per) * d, f = s2 >= 0.999 ? 1 : ease(clamp((zicht - i) / 10, 0, 1)), y = lerp(330, ty, f);
      circ(ctx, cx, y, 7.8, v ? BLOEM.paars : BLOEM.wit, v ? null : rgba(C.line, 0.9), 1.5); }
    const n = Math.min(400, Math.floor(zicht)), p = L2_SIMtel[n], w = n - p, at = s2 > 0 ? 1 : 0;
    naam(ctx, 'paars', kolP, basis + 60, at, 'center', C.text, 36); naam(ctx, 'wit', kolW, basis + 60, at, 'center', C.text, 36);
    regel(ctx, `${p}`, kolP, 300, at, C.text, 66, 'center', 700); regel(ctx, `${w}`, kolW, 300, at, C.text, 66, 'center', 700); regel(ctx, ':', 1470, 300, at, C.text2, 66, 'center', 700);
    regel(ctx, `${n} nakomelingen`, 1470, 220, at, C.text2, 34, 'center', 600);
    misvatting(ctx, 'De 4 vakjes zijn 4 kinderen', 'Het schema geeft kansen, geen aantallen', 1460, 410, 740, s3, S.on(3, 0.6, 0.5));
  } });

/* ---------- 6 · stappenplan ---------- */
SCHERMEN.push({ titel: 'Stappenplan', kop: 'Stappenplan bij een kruisingsvraag', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'Stap 1: schrijf de <b>genotypen</b> van de ouders op.', n: 'Uit film 2. Dit stappenplan komt in de hele reeks terug (ook dihybride en X-chromosomaal in les 3).' },
    { t: 'Stap 2: bepaal welke <b>gameten</b> elke ouder kan maken.', n: 'Per gen één allel per gameet. Een homozygote ouder maakt maar één soort gameet.' },
    { t: 'Stap 3: zet ze in een <b>kruisingsschema</b>.', n: 'Elk vakje = één mogelijke bevruchting, elk met dezelfde kans (hier ¼).' },
    { t: 'Stap 4: lees de <b>verhoudingen</b> af: eerst de genotypen, dan de fenotypen.', n: 'Let op wat de vraag wil: genotype of fenotype, verhouding of kans, of een kans bij een bepaald geslacht (scherm 17).' }
  ],
  teken(ctx, S) { const s = [0, 1, 2, 3].map(k => S.on(k, 0.8));
    [['genotypen ouders', 'Aa × Aa'], ['gameten per ouder', 'A of a · A of a'], ['kruisingsschema', 'elk vakje een bevruchting'], ['verhoudingen aflezen', 'genotypen, dan fenotypen']].forEach(([kop, sub], i) => { const a = s[i]; if (a <= 0.01) return; const y = 200 + i * 190, x = 120 + (1 - a) * -30;
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 780, 160, 18); shape(ctx, rgba(C.fill, C.licht ? 0.6 : 0.5), rgba(C.goud, 0.6), 2.5); ctx.restore();
      circ(ctx, x + 70, y + 80, 40, rgba(C.goud, 0.2 * a), rgba(C.goud, a), 3); regel(ctx, String(i + 1), x + 70, y + 98, a, C.goud, 48, 'center', 700);
      regel(ctx, kop, x + 140, y + 72, a, C.text, 40, 'left', 700); regel(ctx, sub, x + 140, y + 122, a, C.text2, 30, 'left', 500); });
    L2_chip(ctx, 'Aa', 1300, 240, s[0], { px: 50 }); L2_maal(ctx, 1475, 258, s[0], 56); L2_chip(ctx, 'Aa', 1650, 240, s[0], { px: 50 });
    L2_schemaAa(ctx, 1300, 430, 175, s[2], s[1], { px: 56 });
    verhouding(ctx, 1110, 880, 720, 70, [{ n: 3, kl: BLOEM.paars, label: '3 paars' }, { n: 1, kl: C.line, label: '1 wit' }], s[3], { tekst: '1 AA : 2 Aa : 1 aa', tpx: 42, kl: C.text, px: 32 });
  } });

/* ---------- 7 · de terugkruising ---------- */
SCHERMEN.push({ titel: 'Terugkruising', kop: 'De terugkruising', deel: 'Het kruisingsschema',
  stappen: [
    { t: 'Is deze paarse plant <b>AA</b> of <b>Aa</b>? Kruis hem met een witte plant, <b>aa</b>: een terugkruising.', n: 'Ook testkruising genoemd. Kruisen met een homozygoot recessieve plant.' },
    { t: 'Is de paarse plant AA, dan krijgt elk kind een A: <b>allemaal paars</b>.', n: 'De witte plant geeft altijd een a. Het allel uit de paarse plant bepaalt dus direct de kleur van elk kind.' },
    { t: 'Is hij Aa, dan krijgt de helft een a: <b>1 paars : 1 wit</b>.', n: 'Vraag uit film 2: De helft van de nakomelingen is paars, de helft wit: welk genotype had de paarse plant?' },
    { t: 'Eén witte nakomeling is genoeg als <b>bewijs</b>: de paarse ouder had een a.', n: 'Andersom geldt dat niet hard: tien paarse nakomelingen maken AA heel waarschijnlijk (kans bij Aa: (½)¹⁰ ≈ 0,1 %), maar niet zeker.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    L2_plant(ctx, 360, 500, 300, BLOEM.paars, s0, T); L2_plant(ctx, 720, 500, 300, BLOEM.wit, s0, T + 1); L2_maal(ctx, 540, 380, s0, 50);
    L2_chip(ctx, 'A?', 360, 560, s0, { kl: C.goud, px: 40 }); L2_chip(ctx, 'aa', 720, 560, s0, { px: 40 });
    termKaart(ctx, 'terugkruising', 'kruisen met aa (homozygoot recessief)', 1380, 300, S.on(0, 0.6, 0.5), C.goud);
    [[120, 'als hij AA is', 'AA × aa', [BLOEM.paars, BLOEM.paars, BLOEM.paars, BLOEM.paars], 'alles paars', s1], [990, 'als hij Aa is', 'Aa × aa', [BLOEM.paars, BLOEM.wit, BLOEM.paars, BLOEM.wit], '1 paars : 1 wit', s2]].forEach(([x, kop, g, kl, uit, a]) => {
      paneel(ctx, x, 640, 810, 350, a); regel(ctx, kop, x + 40, 700, a, C.text, 34, 'left', 700); L2_chip(ctx, g, x + 130, 790, a, { px: 34 });
      pijl(ctx, x + 250, 810, x + 320, 810, C.text2, 4, a); kl.forEach((k, i) => L2_plant(ctx, x + 390 + i * 105, 950, 200, k, a, T + i)); regel(ctx, uit, x + 545, 700, a, C.goud, 34, 'center', 700); });
    if (s3 > 0.01) { gloed(ctx, 1485, 820, 90, C.goud, s3 * (0.75 + 0.25 * Math.sin(T * 3))); regel(ctx, 'één witte = bewijs: Aa', 1380, 520, s3, C.goud, 40, 'center', 700); }
  } });

/* ---------- 8 · intermediair ---------- */
function L2_meter(ctx, x, y, w, h, f, kl, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, w / 2); shape(ctx, rgba(C.fill, 0.7), rgba(C.line, 0.7), 2);
  if (f > 0.01) { ctx.save(); roundRect(ctx, x, y, w, h, w / 2); ctx.clip(); ctx.fillStyle = kl; ctx.fillRect(x, y + h * (1 - f), w, h * f); ctx.restore(); } ctx.restore(); }
SCHERMEN.push({ titel: 'Intermediair', kop: 'Intermediair: de leeuwenbek', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Bij de leeuwenbek levert allel <b>R</b> een enzym voor rood pigment. Allel <b>W</b> levert een enzym dat niet werkt.', n: 'Uit film 3 (Voorbij dominant en recessief). Begin met de haak: rood × wit geeft allemaal roze. Vraag: mengen de allelen dan, zoals verf? Het enzym is getekend als gevouwen keten.' },
    { t: 'Drie genotypen, drie kleuren: <b>RR</b> rood, <b>RW</b> roze, <b>WW</b> wit.', n: 'Notatie zoals in film 3 (R en W). Sommige boeken schrijven R en r, of Cᴿ en Cᵂ.' },
    { t: 'RR maakt veel pigment, WW geen. RW maakt ongeveer de <b>helft</b>: niet genoeg voor rood.', n: 'Bij een dominant allel is één werkend allel wél genoeg (paarse erwt Aa). Het verschil zit in hoeveel product nodig is voor het volle fenotype.' },
    { t: 'De heterozygoot zit <b>ertussenin</b>: intermediair, of onvolledig dominant.', n: 'Het fenotype van de heterozygoot ligt tussen dat van de twee homozygoten. Verschil met codominant: scherm 12.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 1.4), s3 = S.on(3, 0.9);
    // allelen → enzym
    L2_chip(ctx, 'R', 200, 260, s0, { px: 44 }); pijl(ctx, 260, 262, 330, 262, C.text2, 4, s0); L2_enzym(ctx, 400, 258, 50, C.groen, s0, T); pijl(ctx, 470, 262, 540, 262, C.text2, 4, s0);
    for (let i = 0; i < 6; i++) circ(ctx, 580 + (i % 3) * 26, 246 + Math.floor(i / 3) * 26, 9, BLOEM.rood, null); naam(ctx, 'rood pigment', 690, 272, s0, 'left', C.text, 30);
    L2_chip(ctx, 'W', 1120, 260, S.on(0, 0.6, 0.4), { px: 44 }); pijl(ctx, 1180, 262, 1250, 262, C.text2, 4, S.on(0, 0.6, 0.4)); L2_enzym(ctx, 1320, 258, 50, C.line, S.on(0, 0.6, 0.4), T, true); naam(ctx, 'werkt niet', 1400, 272, S.on(0, 0.6, 0.4), 'left', C.text, 30);
    // drie bloemen met meters
    [['RR', BLOEM.rood, 1, 560], ['RW', BLOEM.roze, 0.5, 960], ['WW', BLOEM.wit, 0, 1360]].forEach(([g, kl, f, x], i) => { const a = S.on(1, 0.6, i * 0.15);
      leeuwenbek(ctx, x, 770, 360, kl, { a }); L2_chip(ctx, g, x, 820, a, { px: 40 });
      L2_meter(ctx, x + 110, 450, 40, 320, f * ease(clamp(s2 * 1.4 - i * 0.2, 0, 1)), BLOEM.rood, s2);
      if (s2 > 0.01) regel(ctx, f === 1 ? 'veel' : f > 0 ? 'half' : 'geen', x + 130, 430, s2, C.text2, 26, 'center', 600); });
    naam(ctx, 'pigment', 1580, 620, s2, 'left', C.text2, 28);
    termKaart(ctx, 'intermediair (onvolledig dominant)', 'RW zit tussen RR en WW in', 960, 870, s3, C.goud);
  } });

/* ---------- 9 · roze × roze ---------- */
const L2_RW = (g) => g.includes('R') && g.includes('W') ? 'RW' : g;
SCHERMEN.push({ titel: 'Roze × roze', kop: 'Roze × roze', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Twee roze bloemen: allebei <b>RW</b>. Elke ouder maakt gameten met R of met W.', n: 'Vraag uit film 3: Roze × roze: wat verwacht jij? (Als de allelen gemengd zijn, wordt alles weer roze.)' },
    { t: 'Het schema: rood, roze en wit komen terug.', n: 'Zelfde schema als bij Mendel (scherm 5); alleen het fenotype van de heterozygoot is anders.' },
    { t: '<b>1 rood : 2 roze : 1 wit</b>. Hier zie je het genotype direct aan de kleur.', n: 'Geen 3 : 1, omdat RW een eigen fenotype heeft. Een terugkruising is hier dus niet nodig.' },
    { t: 'De allelen zijn niet gemengd: ze worden <b>los doorgegeven</b>, precies zoals bij Mendel.', n: 'Het oude idee van "mengende erfelijkheid" (blending): dan zou wit nooit terugkomen. Mendels erwten lieten al zien dat het allel voor wit onveranderd terugkwam.' }
  ],
  teken(ctx, S) { const s0 = S.on(0, 0.9), s1 = S.on(1, 2.0), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    leeuwenbek(ctx, 230, 660, 420, BLOEM.roze, { a: s0 }); leeuwenbek(ctx, 520, 660, 420, BLOEM.roze, { a: s0 }); L2_maal(ctx, 375, 470, s0, 56);
    L2_chip(ctx, 'RW', 230, 720, s0, { px: 44 }); L2_chip(ctx, 'RW', 520, 720, s0, { px: 44 });
    kruisSchema(ctx, 820, 330, { links: ['R', 'W'], boven: ['R', 'W'], vak: 215, prog: s1, a: s0, px: 66, klLinks: C.text2, klBoven: C.text2,
      cel: (i, j, g) => { const t = L2_RW(g); return { t, vul: rgba(t === 'RR' ? BLOEM.rood : t === 'RW' ? BLOEM.roze : (C.licht ? '#D8D6D0' : '#F2F2EE'), t === 'WW' ? 0.3 : 0.45) }; } });
    verhouding(ctx, 1340, 500, 500, 90, [{ n: 1, kl: BLOEM.rood, in: '1', label: 'rood' }, { n: 2, kl: BLOEM.roze, in: '2', label: 'roze' }, { n: 1, kl: C.line, in: '1', label: 'wit' }], s2);
    misvatting(ctx, 'Allelen mengen, zoals verf', 'Ze worden los doorgegeven', 960, 840, 1000, s3, S.on(3, 0.6, 0.5));
  } });

/* ---------- 10 · bloedgroepen: drie allelen ---------- */
SCHERMEN.push({ titel: 'Bloedgroepen', kop: 'Bloedgroepen: drie allelen', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Op je rode bloedcellen zitten ketens van suikers: <b>antigenen</b>.', n: 'Uit film 3. De suikerketens zitten vast aan eiwitten en vetten in het membraan. Hier één cel met antigeen A.' },
    { t: 'Allel <b>Iᴬ</b> levert een enzym dat antigeen A bouwt, allel <b>Iᴮ</b> een iets ander enzym voor antigeen B.', n: 'De enzymen hangen elk een andere suiker aan dezelfde basisketen (briefing: glycosyltransferases). De A- en B-enzymen verschillen maar in vier aminozuren.' },
    { t: 'Allel <b>i</b> levert een enzym dat niet werkt: geen A en geen B.', n: 'Bij het O-allel is één base (een G) weg: leesraamverschuiving, het enzym werkt niet. Link met les 1 en de DNA-reeks (mutaties).' },
    { t: 'Drie allelen voor één gen: <b>multipele allelen</b>. Iedereen heeft er twee, één van elke ouder.', n: 'Het ABO-gen ligt op chromosoom 9. De resusfactor wordt door een ander gen bepaald en erft los van ABO.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.2), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    rodeBloedcel(ctx, 420, 540, 200, { A: true, a: s0 }); naam(ctx, 'rode bloedcel', 420, 860, s0, 'center', C.text, 32);
    wijs(ctx, 'antigeen A', 760, 300, 565, 400, S.on(0, 0.6, 0.4), C.goud, 30);
    [['Iᴬ', C.goud, 'A', 300, s1], ['Iᴮ', C.teal, 'B', 470, S.on(1, 0.8, 0.5)], ['i', C.line, '', 640, s2]].forEach(([al, kl, ag, y, a]) => {
      L2_chip(ctx, al, 1000, y, a, { px: 42, kl: ag ? kl : null }); pijl(ctx, 1070, y, 1150, y, C.text2, 4, a); L2_enzym(ctx, 1240, y - 4, 52, kl, a, T, !ag); pijl(ctx, 1330, y, 1410, y, C.text2, 4, a);
      if (ag) { [0, 1, 2].forEach(k => L2_antigeen(ctx, 1470 + k * 44, y + 6, 50, ag, a)); naam(ctx, 'antigeen ' + ag, 1620, y + 14, a, 'left', kl, 30); }
      else { regel(ctx, 'niets', 1470, y + 14, a, C.text2, 32, 'left', 600); } });
    termKaart(ctx, 'multipele allelen', 'drie in de bevolking, twee per persoon', 1340, 790, s3, C.goud);
  } });

/* ---------- 11 · codominant ---------- */
SCHERMEN.push({ titel: 'Codominant', kop: 'Van genotype naar bloedgroep', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: '<b>IᴬIᴬ</b> en <b>Iᴬi</b>: antigeen A, bloedgroep <b>A</b>.', n: 'Iᴬ is dominant over i: één werkend Iᴬ-enzym is genoeg.' },
    { t: '<b>IᴮIᴮ</b> en <b>Iᴮi</b>: antigeen B, bloedgroep <b>B</b>.', n: 'Ook Iᴮ is dominant over i.' },
    { t: '<b>IᴬIᴮ</b>: beide enzymen werken, A én B op de cel. Beide allelen zichtbaar: <b>codominant</b>.', n: 'Verschil met intermediair: bij intermediair een tussenvorm (roze), bij codominant beide producten volledig naast elkaar.' },
    { t: '<b>ii</b>: geen antigeen A en geen antigeen B: bloedgroep <b>O</b>.', n: 'Zes genotypen, vier bloedgroepen. Waarom dit belangrijk is: het afweersysteem maakt antistoffen tegen het antigeen dat je zelf niet hebt (bloedtransfusie, les afweer).' }
  ],
  teken(ctx, S) { const s = [0, 1, 2, 3].map(k => S.on(k, 0.9));
    [[['IᴬIᴬ', 'Iᴬi'], { A: true }, 'A', 330], [['IᴮIᴮ', 'Iᴮi'], { B: true }, 'B', 750], [['IᴬIᴮ'], { A: true, B: true }, 'AB', 1170], [['ii'], {}, 'O', 1590]].forEach(([gs, ag, bg, x], i) => { const a = s[i]; if (a <= 0.01) return;
      gs.forEach((g, k) => L2_chip(ctx, g, x, 240 + k * 96, a, { px: 46 })); pijl(ctx, x, gs.length > 1 ? 385 : 295, x, 420, C.text2, 4, a);
      rodeBloedcel(ctx, x, 560, 125, Object.assign({ a }, ag)); regel(ctx, bg, x, 830, a, C.text, 80, 'center', 700); metaText(ctx, 'bloedgroep', x, 750, C.meta, 'center', 26, a); });
    termKaart(ctx, 'codominant', 'beide allelen zichtbaar', 1170, 865, S.on(2, 0.6, 0.6), C.goud);
  } });

/* ---------- 12 · A × B: kind met O? ---------- */
SCHERMEN.push({ titel: 'A × B', kop: 'Moeder A, vader B: kind met O?', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Moeder heeft bloedgroep A, vader bloedgroep B. Stel: moeder is <b>Iᴬi</b>, vader <b>Iᴮi</b>.', n: 'Vraag uit film 3: Moeder bloedgroep A, vader B: kan hun kind bloedgroep O hebben? Stamboomsymbolen: rondje = vrouw, vierkant = man.' },
    { t: 'Het schema: vier bloedgroepen mogelijk.', n: 'Gameten moeder: Iᴬ of i; vader: Iᴮ of i. Elk vakje ¼.' },
    { t: 'Krijgt het kind van allebei een <b>i</b>, dan is het <b>ii</b>: bloedgroep O. Kans ¼.', n: 'Is een van de ouders homozygoot (IᴬIᴬ of IᴮIᴮ), dan kan het kind géén O hebben. Kinderen met O verraden dus dat beide ouders een i hebben.' },
    { t: 'Bloedgroep O is geen eigen stof: het is het <b>ontbreken</b> van antigeen A en B.', n: 'Misvatting: "O is een eigen antigeen." Het O-allel levert geen werkend enzym; de basisketen (H-antigeen) blijft dan kaal.' }
  ],
  teken(ctx, S) { const s0 = S.on(0, 0.9), s1 = S.on(1, 2.0), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    stamPersoon(ctx, 230, 480, 62, { a: s0, label: 'Iᴬi', labelKl: C.oker, labelPx: 40 }); stamPersoon(ctx, 530, 480, 62, { m: true, a: s0, label: 'Iᴮi', labelKl: C.teal, labelPx: 40 }); stamPaar(ctx, 230, 530, 480, 62, s0);
    naam(ctx, 'moeder · A', 230, 385, s0, 'center', C.oker, 34); naam(ctx, 'vader · B', 530, 385, s0, 'center', C.teal, 34);
    const bg = { 'IᴬIᴮ': 'AB', 'Iᴬi': 'A', 'Iᴮi': 'B', 'ii': 'O' }, gt = [['IᴬIᴮ', 'Iᴬi'], ['Iᴮi', 'ii']];
    const r = kruisSchema(ctx, 840, 330, { links: ['Iᴬ', 'i'], boven: ['Iᴮ', 'i'], vak: 215, prog: s1, a: s0, klLinks: CH.moeder, klBoven: CH.vader, kopLinks: 'moeder', kopBoven: 'vader', px: 44,
      cel: (i, j) => { const g = gt[i][j]; return { vul: g === 'ii' ? rgba(C.goud, 0.18 * (1 + s2)) : null, teken: (c, x, y, a) => { regel(c, g, x, y - 4, a, C.text, 50, 'center', 700); regel(c, bg[g], x, y + 60, a, C.text2, 38, 'center', 700); } }; } });
    if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; roundRect(ctx, 840 + 215 + 4, 330 + 215 + 4, 207, 207, 12); shape(ctx, null, C.goud, 5); ctx.restore(); }
    regel(ctx, 'kans op O: ¼', 1590, 480, s2, C.goud, 56, 'center', 700);
    regel(ctx, '¼ A · ¼ B · ¼ AB · ¼ O', 1590, 555, s2 * S.on(2, 0.5, 0.4), C.text2, 30, 'center', 600);
    misvatting(ctx, 'Bloedgroep O is een eigen stof', 'O = geen antigeen A en geen antigeen B', 960, 840, 1100, s3, S.on(3, 0.6, 0.5));
  } });

/* ---------- 13 · letale factor ---------- */
SCHERMEN.push({ titel: 'Letale factor', kop: 'Een letale factor', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Bij muizen maakt allel <b>Y</b> de vacht geel; het is dominant over <b>y</b> (grijs). Twee gele muizen: allebei Yy.', n: 'Uit film 3. Het allel heet in de muizengenetica Aʸ (lethal yellow, bij het agouti-gen). Zie briefing.' },
    { t: 'Verwacht: 3 geel : 1 grijs. Geteld: steeds <b>2 geel : 1 grijs</b>.', n: 'Vraag uit film 3: Waar is de rest gebleven? Een gele muis is nooit raszuiver: gele × gele geeft altijd ook grijze jongen.' },
    { t: 'YY-embryo\'s ontwikkelen zich <b>niet</b>: dat vakje valt weg. Van de drie die overblijven zijn er twee geel.', n: 'Het Y-allel is dominant voor de kleur, maar recessief letaal: met één Y gaat het goed, met twee niet. Bij Aʸ is ook het naastgelegen gen Raly verstoord, dat het vroege embryo nodig heeft.' },
    { t: 'Zo\'n allel heet een <b>letale factor</b>: 3 : 1 wordt 2 : 1.', n: 'Letaal = dodelijk. Bij muizen sterven de YY-embryo\'s al heel vroeg, nog vóór de innesteling (briefing).' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 1.6), s3 = S.on(3, 0.9), bob = (k) => Math.sin(T * 2 + k) * 2;
    muis(ctx, 300, 340 + bob(0), 1.35, L2_GEEL(), { a: s0, kijk: 1 }); muis(ctx, 720, 340 + bob(1), 1.35, L2_GEEL(), { a: s0, kijk: -1 }); L2_maal(ctx, 510, 355, s0, 56);
    L2_chip(ctx, 'Yy', 300, 470, s0, { px: 42 }); L2_chip(ctx, 'Yy', 720, 470, s0, { px: 42 });
    metaText(ctx, 'verwacht', 140, 610, C.meta, 'left', 26, s1);
    verhouding(ctx, 140, 635, 760, 76, [{ n: 3, kl: L2_GEEL(), in: '3' }, { n: 1, kl: L2_GRIJS(), in: '1' }], s1);
    metaText(ctx, 'geteld', 140, 800, C.meta, 'left', 26, S.on(1, 0.6, 0.5));
    verhouding(ctx, 140, 825, 760, 76, [{ n: 2, kl: L2_GEEL(), in: '2', label: 'geel' }, { n: 1, kl: L2_GRIJS(), in: '1', label: 'grijs' }], S.on(1, 0.6, 0.5));
    const weg = ease(clamp(s2 / 0.6, 0, 1));
    kruisSchema(ctx, 1180, 320, { links: ['Y', 'y'], boven: ['Y', 'y'], vak: 225, prog: s2 > 0 ? 1 : 0, a: s2 > 0 ? 1 : 0, klLinks: C.text2, klBoven: C.text2, px: 50,
      cel: (i, j, g) => ({ vul: rgba(g === 'yy' ? L2_GRIJS() : L2_GEEL(), 0.4 * (g === 'YY' ? 1 - weg * 0.8 : 1)), teken: (c, x, y, a) => { if (g === 'YY') { regel(c, g, x, y + 22, a * (1 - weg * 0.65), C.text, 62, 'center', 700); kruis(c, x, y, 62, a * weg, C.koraal); } else regel(c, g, x, y + 22, a, C.text, 62, 'center', 700); } }) });
    if (s2 > 0.01) regel(ctx, 'embryo ontwikkelt zich niet', 1405, 810, ease(clamp((s2 - 0.5) / 0.5, 0, 1)), C.koraal, 28, 'center', 600);
    termKaart(ctx, 'letale factor', 'YY valt weg → 2 geel : 1 grijs', 1405, 850, s3, C.koraal);
  } });

/* ---------- 14 · polygeen ---------- */
const L2_BIN = (n) => { const r = [1]; for (let k = 0; k < n; k++) { const s = [1]; for (let i = 1; i < r.length; i++) s.push(r[i - 1] + r[i]); s.push(1); r.splice(0, r.length, ...s); } const m = Math.max(...r); return r.map(v => v / m); };
const L2_KLOK = Array.from({ length: 25 }, (_, i) => Math.exp(-Math.pow((i - 12) / 4.6, 2) / 2));
const L2_VERD = [L2_BIN(2), L2_BIN(4), L2_BIN(6), L2_KLOK];
function L2_hoogteBij(verd, u) { const n = verd.length, i = clamp(Math.floor(u * n), 0, n - 1); return verd[i]; }
SCHERMEN.push({ titel: 'Polygeen', kop: 'Polygene overerving: lengte', deel: 'Niet altijd 3 : 1',
  stappen: [
    { t: 'Stel dat lengte door <b>één gen</b> met twee allelen werd bepaald (zonder dominantie): drie groepen.', n: 'Uit film 3. Model: elk "lang"-allel telt even zwaar mee (additief). Eén gen: 0, 1 of 2 lang-allelen → 1 : 2 : 1.' },
    { t: 'Met <b>twee genen</b>: vijf groepen.', n: 'Vier allelen: 0 tot 4 lang-allelen → 1 : 4 : 6 : 4 : 1.' },
    { t: 'Met <b>drie genen</b> al zeven groepen.', n: '1 : 6 : 15 : 20 : 15 : 6 : 1. Nog steeds Mendel per gen.' },
    { t: 'Met <b>veel genen</b> en invloed van voeding en gezondheid: een vloeiende klokvorm, een normale verdeling.', n: 'Vraag uit film 3: Geen groepen: is lengte dan niet erfelijk? Wel: lange ouders krijgen vaak lange kinderen. Bij lengte spelen duizenden genvarianten mee; erfelijkheidsgraad in rijke landen ± 80 % (briefing).' }
  ],
  teken(ctx, S) { const s = [0, 1, 2, 3].map(k => S.on(k, 1.1)); const x0 = 220, w = 1480, base = 800, hh = 540;
    let cur = -1; for (let k = 3; k >= 0; k--) if (s[k] > 0) { cur = k; break; } if (cur < 0) return;
    const e = s[cur], nieuw = L2_VERD[cur], oud = cur > 0 ? L2_VERD[cur - 1] : null, n = nieuw.length, bw = w / n;
    ctx.save(); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 20, base); ctx.lineTo(x0 + w + 20, base); ctx.stroke(); ctx.restore();
    nieuw.forEach((v, i) => { const u = (i + 0.5) / n, h0 = oud ? L2_hoogteBij(oud, u) : 0, h = lerp(h0, v, e) * hh;
      ctx.save(); roundRect(ctx, x0 + i * bw + bw * 0.08, base - h, bw * 0.84, Math.max(0.1, h), Math.min(10, bw * 0.2)); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); ctx.restore(); });
    if (cur === 3) { ctx.save(); ctx.globalAlpha *= e; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = i / 120, x = x0 + u * w, y = base - hh * Math.exp(-Math.pow((u * 25 - 12.5) / 4.6, 2) / 2); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    naam(ctx, 'kort', x0, base + 50, 1, 'left', C.text2, 36); naam(ctx, 'lang', x0 + w, base + 50, 1, 'right', C.text2, 36); metaText(ctx, 'lengte', 960, base + 50, C.meta, 'center', 26);
    const lab = ['1 gen · 3 groepen', '2 genen · 5 groepen', '3 genen · 7 groepen', 'veel genen + milieu'][cur];
    regel(ctx, lab, 960, 225, 1, C.goud, 52, 'center', 700);
    balk(ctx, 'elk gen erft volgens Mendel; de effecten tellen op', 960, 960, 1180, s[3], C.goud, 36);
  } });

/* ---------- 15 · jongen of meisje ---------- */
SCHERMEN.push({ titel: 'Jongen of meisje', kop: 'Jongen of meisje?', deel: 'X-chromosoom en mitochondriën',
  stappen: [
    { t: 'Een vrouw is <b>XX</b>: elke eicel krijgt een X.', n: 'Uit film 5 (Overerving via X-chromosomen en mitochondriën). X en Y zijn de geslachtschromosomen; de andere 22 paren zijn autosomen.' },
    { t: 'Een man is <b>XY</b>: bij de meiose krijgt de helft van de zaadcellen een X, de andere helft een Y.', n: 'X en Y gedragen zich in de meiose als paar (ze hebben kleine gelijke stukjes aan de uiteinden).' },
    { t: 'Het schema: XX is een meisje, XY een jongen.', n: 'Eicellen links (oker), zaadcellen boven (teal).' },
    { t: 'Kans op een jongen: <b>½</b>. De <b>zaadcel</b> bepaalt het geslacht.', n: 'Elke bevruchting opnieuw ½: drie zonen maken een vierde zoon niet minder waarschijnlijk.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 2.0), s3 = S.on(3, 0.9);
    ctx.save(); ctx.translate(-50, -20); ctx.scale(1.3, 1.3);
    stamPersoon(ctx, 190, 330, 48, { a: s0 }); naam(ctx, 'vrouw', 190, 420, s0, 'center', C.text, 30);
    chromosoom(ctx, 300, 320, 120, { kl: CH.moeder, dubbel: 0, a: s0, cen: 0.4 }); chromosoom(ctx, 345, 320, 120, { kl: CH.moeder, dubbel: 0, a: s0, cen: 0.4 });
    pijl(ctx, 400, 330, 470, 330, C.text2, 4, s0); [560, 700].forEach((x, i) => gameet(ctx, x, 330, 48, 'X', { soort: 'ei', a: S.on(0, 0.6, 0.3 + i * 0.15), px: 40 }));
    naam(ctx, 'eicellen: altijd X', 630, 430, S.on(0, 0.6, 0.6), 'center', C.oker, 30);
    stamPersoon(ctx, 190, 640, 48, { m: true, a: s1 }); naam(ctx, 'man', 190, 730, s1, 'center', C.text, 30);
    chromosoom(ctx, 300, 630, 120, { kl: CH.vader, dubbel: 0, a: s1, cen: 0.4 }); chromosoom(ctx, 345, 612, 46, { kl: CH.vader, dubbel: 0, a: s1, cen: 0.3, w: 19 });
    pijl(ctx, 400, 640, 470, 640, C.text2, 4, s1); [['X', 530], ['Y', 720]].forEach(([l, x], i) => gameet(ctx, x, 640, 40, l, { soort: 'zaad', a: S.on(1, 0.6, 0.3 + i * 0.15), px: 36, t: T }));
    naam(ctx, 'zaadcellen: ½ X, ½ Y', 650, 740, S.on(1, 0.6, 0.6), 'center', C.teal, 30);
    ctx.restore();
    kruisSchema(ctx, 1330, 400, { links: ['X', 'X'], boven: ['X', 'Y'], vak: 225, prog: s2, a: s2 > 0 ? 1 : 0, klLinks: CH.moeder, klBoven: CH.vader, kopLinks: 'eicellen', kopBoven: 'zaadcellen', soortLinks: 'ei', px: 60,
      cel: (i, j) => { const g = j ? 'XY' : 'XX'; return { vul: rgba(j ? C.teal : C.oker, 0.16), teken: (c, x, y, a) => { regel(c, g, x, y - 2, a, C.text, 60, 'center', 700); regel(c, j ? 'jongen' : 'meisje', x, y + 60, a, C.text2, 34, 'center', 600); } }; } });
    kansBalk(ctx, 1330, 920, 300, 52, 0.5, C.teal, s3, '½ jongen');
  } });

/* ---------- 16 · kleurenblind: het X-chromosoom ---------- */
const L2_XG = { 'XᴺXᴺ': { ziek: 0, dr: 0, m: 0 }, 'XᴺXⁿ': { ziek: 0, dr: 1, m: 0 }, 'XᴺY': { ziek: 0, dr: 0, m: 1 }, 'XⁿY': { ziek: 1, dr: 0, m: 1 } };
SCHERMEN.push({ titel: 'Kleurenblind', kop: 'Kleurenblind: het X-chromosoom', deel: 'X-chromosoom en mitochondriën',
  stappen: [
    { t: 'Het X-chromosoom is groot: ± 800 genen, ook voor het rood- en groengevoelige eiwit in je kegeltjes. Het Y is klein en heeft die genen niet.', n: 'Vraag uit film 5 (opening): ± 8 % van de mannen is rood-groen kleurenblind, bij vrouwen ± 0,5 %: hoe kan dat? De genen voor het rood- en groengevoelige eiwit liggen naast elkaar op de X; het gen voor blauw ligt op chromosoom 7 (film 5). Het aantal genen op de X verschilt per telmethode (MedlinePlus: 900–1.400 eiwitgenen); de film zegt ± 800.' },
    { t: 'Notatie: het allel bij de X. <b>Xᴺ</b> = normaal kleuren zien, <b>Xⁿ</b> = kleurenblind.', n: 'Een vrouw XᴺXⁿ ziet normaal maar is draagster. Een man is XᴺY of XⁿY: één allel, geen tweede exemplaar dat een fout opvangt.' },
    { t: 'Draagster × man die normaal ziet: dochters zien allemaal normaal (½ draagster), van de zonen is <b>½ kleurenblind</b>.', n: 'Vraag uit film 5: Hoe groot is de kans dat een zoon kleurenblind is? Let op de vraag: kans per zoon = ½, kans per kind = ¼.' },
    { t: 'Een man is kleurenblind met <b>één</b> Xⁿ, een vrouw pas met <b>twee</b>. Daarom vaker bij mannen.', n: 'Vrouw: kans ± 8 % × 8 % ≈ 0,6 %, past bij de ± 0,5 % die je telt. Hemofilie (stollingsstoornis) erft net zo: koningin Victoria was draagster, haar zoon Leopold had hemofilie, via twee dochters kwam het allel in de koningshuizen van Rusland en Spanje.' },
    { t: 'Een vader geeft zijn X <b>nooit</b> aan een zoon: een zoon krijgt een X-aandoening altijd via zijn moeder.', n: 'In het schema: de X van de vader komt alleen in de dochters terecht.' },
    { t: 'Er zijn ook X-chromosomaal <b>dominante</b> aandoeningen: een vader met de aandoening geeft het aan al zijn dochters en aan geen van zijn zonen.', vwo: true, n: 'Een moeder met de aandoening is meestal heterozygoot: de helft van haar kinderen, zonen en dochters. Omdat één allel genoeg is en vrouwen twee X hebben, vaker bij vrouwen.' }
  ],
  teken(ctx, S) { const T = S.T, s = [0, 1, 2, 3, 4, 5].map(k => S.on(k, 0.9)), s2 = S.on(2, 2.0);
    chromosoom(ctx, 200, 390, 300, { kl: CH.neutraal, dubbel: 0, a: s[0], cen: 0.4, w: 46, banden: [{ p: 0.9, kl: C.goud }] }); chromosoom(ctx, 390, 340, 100, { kl: CH.neutraal, dubbel: 0, a: s[0], cen: 0.3, w: 40 });
    naam(ctx, 'X', 200, 245, s[0], 'center', C.text, 40); naam(ctx, 'Y', 390, 285, s[0], 'center', C.text, 40);
    wijs(ctx, 'kleurzien', 360, 580, 228, 560, S.on(0, 0.6, 0.4), C.goud, 28, 'left');
    regel(ctx, '± 800 genen', 200, 650, s[0], C.text2, 28, 'center', 600); regel(ctx, 'weinig genen', 400, 440, s[0], C.text2, 28, 'center', 600);
    L2_chip(ctx, 'Xᴺ', 160, 760, s[1], { px: 40 }); naam(ctx, 'normaal', 240, 772, s[1], 'left', C.text, 30);
    L2_chip(ctx, 'Xⁿ', 160, 860, s[1], { px: 40, kl: C.koraal }); naam(ctx, 'kleurenblind', 240, 872, s[1], 'left', C.koraal, 30);
    // ouders en schema
    const sa = s[1];
    regel(ctx, 'moeder XᴺXⁿ', 610, 590, sa, C.oker, 32, 'center', 700); regel(ctx, 'draagster', 610, 628, sa, C.text2, 26, 'center', 600);
    regel(ctx, 'vader XᴺY', 1085, 205, sa, C.teal, 32, 'center', 700);
    const VX = 880, VY = 440, V = 205;
    kruisSchema(ctx, VX, VY, { links: ['Xᴺ', 'Xⁿ'], boven: ['Xᴺ', 'Y'], vak: V, prog: s2, a: s[1], klLinks: CH.moeder, klBoven: CH.vader, px: 50, gametA: (z) => z === 'l' || z === 'b' ? 1 : 1,
      cel: (i, j) => { const g = [['XᴺXᴺ', 'XᴺY'], ['XⁿXᴺ', 'XⁿY']][i][j], key = g === 'XⁿXᴺ' ? 'XᴺXⁿ' : g, info = L2_XG[key], t = key; return { vul: info.ziek ? rgba(C.koraal, 0.25) : null, teken: (c, x, y, a) => { regel(c, t, x, y - 18, a, C.text, 44, 'center', 700); stamPersoon(c, x, y + 50, 25, { m: info.m, ziek: info.ziek, drager: info.dr, a }); } }; } });
    if (s[4] > 0.01) { ctx.save(); ctx.globalAlpha *= s[4]; roundRect(ctx, VX + 4, VY - V + 18, V - 8, 3 * V - 22, 14); shape(ctx, null, C.goud, 5); ctx.restore(); regel(ctx, 'X van vader → alleen dochters', VX + V / 2, VY + 2 * V + 60, s[4], C.goud, 32, 'center', 700); }
    // percentages
    regel(ctx, 'man: één Xⁿ genoeg', 1340, 290, s[3], C.text, 32, 'left', 700); kansBalk(ctx, 1340, 312, 320, 40, 0.08, C.koraal, s[3], '± 8 %');
    regel(ctx, 'vrouw: twee Xⁿ nodig', 1340, 430, S.on(3, 0.6, 0.4), C.text, 32, 'left', 700); kansBalk(ctx, 1340, 452, 320, 40, 0.005, C.koraal, S.on(3, 0.6, 0.4), '± 0,5 %');
    // vwo: X-chromosomaal dominant
    const v = s[5]; if (v > 0.01) { regel(ctx, 'X-chromosomaal dominant', 1530, 620, v, C.paars, 32, 'center', 700);
      stamPersoon(ctx, 1450, 700, 26, { m: true, ziek: true, a: v }); stamPersoon(ctx, 1610, 700, 26, { a: v }); stamPaar(ctx, 1450, 1610, 700, 26, v);
      const kx = [1370, 1477, 1584, 1691]; stamKinderen(ctx, 1530, 700, kx, 860, 26, v); kx.forEach((x, i) => stamPersoon(ctx, x, 860, 26, { m: i % 2 === 1, ziek: i % 2 === 0, a: v }));
      regel(ctx, 'dochters wel, zonen niet', 1530, 940, v, C.text2, 28, 'center', 600); }
  } });

/* ---------- 17 · mitochondriaal DNA ---------- */
const L2_MPOS = (() => { const r = toeval(5), out = []; while (out.length < 140) { const an = r() * 6.283, d = Math.sqrt(r()) * 0.9; if (d < 0.32) continue; out.push([Math.cos(an) * d, Math.sin(an) * d, r() * 3]); } return out; })();
SCHERMEN.push({ titel: 'Mitochondriën', kop: 'Mitochondriaal DNA', deel: 'X-chromosoom en mitochondriën',
  stappen: [
    { t: 'Een mitochondrion heeft zijn eigen, kleine, <b>ronde DNA</b> met 37 genen.', n: 'Uit film 5. Mens: 16.569 basenparen, 37 genen (13 eiwitten voor de ademhalingsketen, 22 tRNA\'s, 2 rRNA\'s). Een cel heeft honderden tot duizenden kopieën. Paars = DNA, zoals in de DNA-reeks.' },
    { t: 'Een eicel bevat meer dan <b>100.000</b> mitochondriën, een zaadcel maar een paar tientallen.', n: 'Eicel en kop van de zaadcel ongeveer op schaal. De mitochondriën van de zaadcel zitten in het middenstuk. Stippen in de eicel: symbolisch. Strikt genomen gaat het om kopieën mtDNA: een rijpe eicel > 150.000, een zaadcel ± 100 (briefing).' },
    { t: 'Na de bevruchting worden de mitochondriën van de zaadcel <b>afgebroken</b>: al je mitochondriën komen van je moeder.', n: 'Vraag uit film 5: Een man heeft een aandoening door een fout in zijn mitochondriaal DNA: krijgen zijn kinderen die ook?' },
    { t: 'Vader met een mitochondriale aandoening: geen enkel kind. Moeder: <b>alle</b> kinderen, zonen én dochters.', n: 'Verschil met X-chromosomaal: daar een gen op een chromosoom in de kern, hier DNA buiten de kern. Niet iedereen met de fout wordt ziek (briefing: LHON). Mitochondriale Eva: via de moederlijn ver terug in de tijd.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), s2 = S.on(2, 1.2), s3 = S.on(3, 0.9);
    L2_mito(ctx, 330, 400, 400, 200, s0, T); naam(ctx, 'mitochondrion', 330, 270, s0, 'center', C.oker, 32);
    wijs(ctx, 'eigen rond DNA', 330, 590, 300, 430, S.on(0, 0.6, 0.4), C.paars, 30); regel(ctx, '37 genen', 330, 690, S.on(0, 0.6, 0.6), C.text, 34, 'center', 700);
    // eicel (± 100 µm) en zaadcel (kop ± 5 µm) op schaal: 4 px per µm
    if (s1 > 0.01) { const a = s1; circ(ctx, 1000, 430, 228, rgba(C.oker, 0.08 * a), rgba(C.oker, 0.45 * a), 2);
      ctx.save(); ctx.globalAlpha *= a; circ(ctx, 1000, 430, 200, rgba(C.koraal, C.licht ? 0.08 : 0.12), C.koraal, 3); ctx.restore();
      circ(ctx, 1000, 430, 58, rgba(C.paars, (C.licht ? 0.14 : 0.24) * a), rgba(C.paars, a), 2.5);
      L2_MPOS.forEach(([dx, dy, rot], i) => { ctx.save(); ctx.globalAlpha *= a * S.on(1, 0.4, 0.2 + (i % 20) * 0.02); ctx.beginPath(); ctx.ellipse(1000 + dx * 200, 430 + dy * 200, 6, 3.5, rot, 0, 6.283); shape(ctx, C.oker, null); ctx.restore(); });
      naam(ctx, 'eicel', 1000, 190, a, 'center', C.koraal, 32); regel(ctx, '> 100.000', 1000, 700, a, C.oker, 34, 'center', 700);
      // zaadcel
      const zx = 1400, zy = 430; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, x = zx + 32 + u * 200, y = zy + Math.sin(u * 9 - T * 6) * 6 * u; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      ctx.beginPath(); ctx.ellipse(zx, zy, 11, 8, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.3), C.teal, 2.5); roundRect(ctx, zx + 10, zy - 4, 22, 8, 4); shape(ctx, rgba(C.oker, 0.35), C.oker, 1.5); ctx.restore();
      const afg = ease(clamp(s2 / 0.6, 0, 1)); for (let k = 0; k < 4; k++) circ(ctx, zx + 14 + k * 5, zy, 2.2, rgba(C.oker, a * (1 - afg * 0.8)));
      naam(ctx, 'zaadcel', zx + 110, zy - 50, a, 'center', C.teal, 32); regel(ctx, 'paar tientallen', zx + 110, zy + 62, a, C.oker, 30, 'center', 700);
      if (s2 > 0.01) { kruis(ctx, zx + 21, zy, 16, afg, C.koraal); regel(ctx, 'afgebroken', zx + 110, zy + 104, afg, C.koraal, 28, 'center', 600); } }
    if (s2 > 0.01) regel(ctx, 'al je mitochondriën: van je moeder', 1000, 760, ease(clamp((s2 - 0.4) / 0.6, 0, 1)), C.goud, 36, 'center', 700);
    // stambomen
    [[200, 'vader met de aandoening', true], [1040, 'moeder met de aandoening', false]].forEach(([x, kop, vader], k) => { const a = S.on(3, 0.6, k * 0.4); if (a <= 0.01) return;
      paneel(ctx, x, 800, 680, 200, a); regel(ctx, kop, x + 30, 850, a, C.text, 28, 'left', 700);
      const px = x + 470, mx = x + 590, y = 850; stamPersoon(ctx, px, y, 22, { m: true, ziek: vader, a }); stamPersoon(ctx, mx, y, 22, { ziek: !vader, a }); stamPaar(ctx, px, mx, y, 22, a);
      const kx = [x + 100, x + 220, x + 340, x + 460].map(v => v + 80); stamKinderen(ctx, (px + mx) / 2, y, kx, 950, 22, a); kx.forEach((xx, i) => stamPersoon(ctx, xx, 950, 22, { m: i % 2 === 0, ziek: !vader, a })); });
  } });

/* ---------- 18 · samenvatting ---------- */
function L2_icoonSchema(ctx, x, y, a) { kruisSchema(ctx, x - 50, y - 40, { links: ['A', 'a'], boven: ['A', 'a'], vak: 50, a, px: 20, klLinks: CH.vader, klBoven: CH.moeder, cel: (i, j, g) => g === 'aa' ? { t: '', vul: L2_vulW(), rand: rgba(C.line, 0.6) } : { t: '', vul: L2_vulP() } }); }
function L2_icoonX(ctx, x, y, a) { chromosoom(ctx, x - 30, y + 10, 150, { kl: CH.neutraal, dubbel: 0, a, cen: 0.4, w: 26, banden: [{ p: 0.9, kl: C.goud }] }); chromosoom(ctx, x + 40, y - 10, 54, { kl: CH.neutraal, dubbel: 0, a, cen: 0.3, w: 22 }); }
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Kruisen en tellen', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Kruisingsschema</b>: elke ouder geeft per gen één allel, elk met kans ½. Aa × Aa geeft 3 : 1, een terugkruising 1 : 1.', n: 'Terug naar de twee puzzels van scherm 2.' },
    { t: '<b>Niet altijd 3 : 1</b>: intermediair 1 : 2 : 1, codominant (AB), multipele allelen, letaal 2 : 1, polygeen een klokvorm.' },
    { t: '<b>X-chromosoom</b>: een man heeft één allel. X-chromosomaal recessief komt vaker voor bij mannen; een zoon krijgt het via zijn moeder.' },
    { t: '<b>Mitochondriën</b>: DNA buiten de kern, alleen via de moeder. En altijd: allelen mengen nooit.' }
  ],
  teken(ctx, S) { const T = S.T, s = [0, 1, 2, 3].map(k => S.on(k, 0.9));
    const kol = [['kruisingsschema', C.goud, ['Aa × Aa → 3 : 1', '1 AA : 2 Aa : 1 aa', 'terugkruising 1 : 1', 'kansen, geen aantallen']],
      ['niet altijd 3 : 1', C.groen, ['intermediair 1 : 2 : 1', 'codominant: AB', 'multipele allelen', 'letaal: 2 : 1', 'polygeen: klokvorm']],
      ['X-chromosoom', C.teal, ['man: één allel', 'vaker bij mannen', 'zoon: via moeder']],
      ['mitochondriën', C.oker, ['DNA buiten de kern', 'alleen via moeder', 'naar alle kinderen']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 100 + i * 435;
      paneel(ctx, x, 180, 415, 690, a, rgba(col, 0.6)); regel(ctx, kop, x + 207, 250, a, col, 38, 'center', 700);
      if (i === 0) L2_icoonSchema(ctx, x + 207, 370, a); if (i === 1) { leeuwenbek(ctx, x + 150, 450, 170, BLOEM.roze, { a }); rodeBloedcel(ctx, x + 285, 380, 44, { A: true, B: true, a }); }
      if (i === 2) L2_icoonX(ctx, x + 207, 370, a); if (i === 3) L2_mito(ctx, x + 207, 370, 220, 110, a, T);
      regels.forEach((r, k) => regel(ctx, r, x + 32, 530 + k * 62, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 29, 'left', 500)); });
    balk(ctx, 'allelen mengen nooit: ze worden los doorgegeven', 960, 950, 1100, S.on(3, 0.6, 0.6), C.goud, 36);
  } });

/* ---------- 19 · volgende keer ---------- */
function L2_icoonErwten(ctx, x, y, a) { erwt(ctx, x - 40, y - 34, 30, { a }); erwt(ctx, x + 40, y - 34, 30, { a, rimpel: true }); erwt(ctx, x - 40, y + 40, 30, { a, geel: false }); erwt(ctx, x + 40, y + 40, 30, { a, geel: false, rimpel: true }); }
function L2_icoonVlieg(ctx, x, y, a) { vlieg(ctx, x - 55, y - 10, 1.15, { a }); vlieg(ctx, x + 55, y - 10, 1.15, { a, zwart: true, stomp: true }); }
function L2_icoonStamboom(ctx, x, y, a) { stamPersoon(ctx, x - 50, y - 40, 20, { m: true, a }); stamPersoon(ctx, x + 50, y - 40, 20, { a, drager: true }); stamPaar(ctx, x - 50, x + 50, y - 40, 20, a); const kx = [x - 70, x, x + 70]; stamKinderen(ctx, x, y - 40, kx, y + 50, 20, a); kx.forEach((xx, i) => stamPersoon(ctx, xx, y + 50, 20, { m: i !== 1, ziek: i === 2, a })); }
function L2_icoonKans(ctx, x, y, a) { breuk(ctx, 2, 3, x, y + 10, 70, a, C.goud); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer: <b>twee genen</b> tegelijk, gekoppelde genen en <b>stambomen</b> lezen.', n: 'Les 3: films 4 (Dihybride kruising en gekoppelde overerving) en 6 (Stambomen en kansrekenen). Huiswerk staat bij de lesopbouw.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Twee genen en een stamboom', [['Dihybride', 'geel/groen · rond/gerimpeld', L2_icoonErwten], ['Gekoppelde genen', 'de fruitvlieg', L2_icoonVlieg], ['Stambomen', 'lezen en redeneren', L2_icoonStamboom], ['Kansen', 'zoals ⅔', L2_icoonKans]]); } });
