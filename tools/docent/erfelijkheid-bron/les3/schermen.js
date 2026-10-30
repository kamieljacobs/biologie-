/* =====================================================================================
   Erfelijkheid · les 3 · Twee genen en een stamboom (28 okt 2026)
   Eigen hulpen met prefix L3_. Kleuren: vader teal, moeder oker, gen goud, aandoening koraal.
   29 okt 2026 gelijkgetrokken met films 4 en 6 versie 2.0: fruitvlieg G/g en V/v (gekoppeld GV/gv),
   dihybride schema en crossing-over vwo zoals in film 4, recombinatiepercentage en genkaart eruit (Kamiel: te diepgaand).
   ===================================================================================== */
const L3_bult = (u) => Math.sin(Math.PI * clamp(u, 0, 1));
// fenotypen van erwten: [geel, rond]; tint per fenotype (vast in de hele les)
const L3_FEN = [[true, true], [true, false], [false, true], [false, false]];
const L3_FNAAM = ['geel, rond', 'geel, gerimpeld', 'groen, rond', 'groen, gerimpeld'];
const L3_FKL = () => [C.goud, C.oker, C.groen, C.paars];
const L3_fenVan = (g) => (g.includes('G') ? 0 : 2) + (g.includes('R') ? 0 : 1);
// nakomelingen van GgRr × GgRr (48 erwten, 27 : 9 : 9 : 3, vaste volgorde)
const L3_KROST = (() => { const a = []; [27, 9, 9, 3].forEach((n, k) => { for (let i = 0; i < n; i++) a.push(k); }); const r = toeval(7); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();

// gameet met gekleurde letters (teal = van de vader, oker = van de moeder)
function L3_gameet(ctx, x, y, r, letters, kls, a = 1, o = {}) { if (a <= 0.01) return; gameet(ctx, x, y, r, '', { soort: 'cel', kl: o.kl || C.text2, a });
  const px = o.px || r * 0.62; ctx.save(); ctx.font = fTekst(px, 700); const ws = letters.map(l => ctx.measureText(l).width), tot = ws.reduce((s, w) => s + w, 0) + (letters.length - 1) * 4; ctx.restore();
  let xx = x - tot / 2; letters.forEach((l, i) => { regel(ctx, l, xx + ws[i] / 2, y + px * 0.36, a, kls[i] || C.text, px, 'center', 700); xx += ws[i] + 4; }); }
const L3_kl = (l) => (l === l.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')) ? CH.vader : CH.moeder);

// één chromatide als staafje met twee kleuren (boven/onder de breuk) en genbanden met letter erop
function L3_chromatide(ctx, x, y0, len, w, klBoven, klOnder, breuk, banden, a = 1, dxOnder = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const yb = y0 + len * breuk, xb = x + dxOnder * 0.5;
  const seg = (kl, ya, yz, xa, xz) => { ctx.strokeStyle = dk(kl); ctx.lineWidth = w + 3; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xz, yz); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xz, yz); ctx.stroke(); };
  seg(klOnder, yb, y0 + len, xb, x + dxOnder); seg(klBoven, y0, yb, x, xb);
  (banden || []).forEach(B => { const by = y0 + len * B.p, bx = B.p < breuk ? x + (xb - x) * (B.p / breuk) : xb + (x + dxOnder - xb) * ((B.p - breuk) / (1 - breuk));
    roundRect(ctx, bx - w / 2 - 3, by - w * 0.42, w + 6, w * 0.84, 5); shape(ctx, C.goud, dk(C.goud, 0.5), 2.5);
    ctx.font = fTekst(B.px || Math.max(22, w * 0.72), 700); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#121C2E'; ctx.fillText(B.letter, bx, by + 1); });
  ctx.restore(); }

/* ---------- stamboom van het gezin De Wit ----------
   cx = midden, top = hoogte van generatie I, s = schaal. o.aI/aII/aIII = zichtbaarheid per generatie, o.ziek = Levi ingekleurd (0..1),
   o.namen (0..1), o.geno = {id: 'Aa'}, o.genoA = {id: a}, o.hl = {id: a}, o.romeins (0..1), o.vanafII = generatie I weglaten. Geeft posities terug. */
const L3_WIT = { opawit: [-400, 0, 1, 'opa Frank'], omawit: [-240, 0, 0, 'oma Lucia'], opabos: [240, 0, 1, 'opa Wim'], omabos: [400, 0, 0, 'oma Anja'],
  dennis: [-160, 1, 1, 'Dennis'], marieke: [160, 1, 0, 'Marieke'], sara: [-150, 2, 0, 'Sara'], levi: [0, 2, 1, 'Levi'], jens: [150, 2, 1, 'Jens'] };
function L3_witBoom(ctx, cx, top, s, o = {}) {
  const dy = 220 * s, r = 38 * s, P = {}, gen = [o.vanafII ? 0 : (o.aI == null ? 1 : o.aI), o.aII == null ? 1 : o.aII, o.aIII == null ? 1 : o.aIII];
  const y0 = o.vanafII ? top - dy : top;
  Object.entries(L3_WIT).forEach(([id, [dx, g]]) => { P[id] = [cx + dx * s, y0 + g * dy]; });
  const lp = Math.max(30, 30 * s);
  // lijnen
  if (!o.vanafII) { stamPaar(ctx, P.opawit[0], P.omawit[0], P.opawit[1], r, gen[0]); stamPaar(ctx, P.opabos[0], P.omabos[0], P.opabos[1], r, gen[0]);
    stamKinderen(ctx, (P.opawit[0] + P.omawit[0]) / 2, P.opawit[1], [P.dennis[0]], P.dennis[1], r, gen[0] * gen[1]);
    stamKinderen(ctx, (P.opabos[0] + P.omabos[0]) / 2, P.opabos[1], [P.marieke[0]], P.marieke[1], r, gen[0] * gen[1]); }
  stamPaar(ctx, P.dennis[0], P.marieke[0], P.dennis[1], r, gen[1]);
  stamKinderen(ctx, cx, P.dennis[1], [P.sara[0], P.levi[0], P.jens[0]], P.sara[1], r, gen[1] * gen[2]);
  Object.entries(L3_WIT).forEach(([id, [dx, g, m, nm]]) => { const a = gen[g] * (o.dim && o.dim[id] != null ? o.dim[id] : 1); if (a <= 0.01) return; const [x, y] = P[id];
    const zij = g === 1 ? (id === 'dennis' ? 'links' : 'rechts') : g === 0 ? 'boven' : 'onder', nmA = o.namen == null ? 1 : o.namen;
    stamPersoon(ctx, x, y, r, { m: !!m, a, hl: o.hl && o.hl[id] ? o.hl[id] : 0 });
    if (id === 'levi' && o.ziek) stamPersoon(ctx, x, y, r, { m: true, ziek: true, a: a * o.ziek });
    if (o.vraag && o.vraag[id]) regel(ctx, '?', x, y + r * 0.42, a * o.vraag[id], C.goud, r * 1.2, 'center', 700);
    if (nmA > 0.01 && !(g === 0 && o.geenNamenI)) naam(ctx, nm, zij === 'links' ? x - r - 14 : zij === 'rechts' ? x + r + 14 : x, zij === 'onder' ? y + r + lp + 6 : zij === 'boven' ? y - r - 14 : y + lp * 0.36, a * nmA, zij === 'links' ? 'right' : zij === 'rechts' ? 'left' : 'center', C.text, lp);
    if (o.geno && o.geno[id]) { const ga = a * (o.genoA && o.genoA[id] != null ? o.genoA[id] : 1); const gs = o.geno[id];
      allelChip(ctx, gs, g === 0 ? x : x + r + 34 * Math.max(0.8, s), g === 0 ? y + r + 36 : y - r - 6, ga, { px: Math.max(30, 30 * s), kl: gs === 'aa' ? C.koraal : gs === 'Aa' ? C.goud : null }); } });
  if (o.romeins) ['I', 'II', 'III'].forEach((rn, g) => { if (o.vanafII && g === 0) return; regel(ctx, rn, cx - 560 * s, y0 + g * dy + 13, o.romeins * gen[g], C.text2, 38, 'center', 700); });
  return { P, r };
}
// ruit = kind waarvan je het geslacht nog niet weet
function L3_ruit(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.2); ctx.lineTo(x + r * 1.2, y); ctx.lineTo(x, y + r * 1.2); ctx.lineTo(x - r * 1.2, y); ctx.closePath(); shape(ctx, C.licht ? '#FFFFFF' : C.bg, C.text, 3); ctx.restore(); regel(ctx, '?', x, y + r * 0.42, a, C.goud, r * 1.2, 'center', 700); }
// meiose-I-cel met twee paren in het midden; omgekeerd = vormpaar andersom
function L3_meioseCel(ctx, x, y, a, omgekeerd, T) { if (a <= 0.01) return;
  cel(ctx, x, y, 370, 290, a, { geenKern: true, kl: C.text2, seed: omgekeerd ? 3 : 1 });
  ctx.save(); ctx.globalAlpha *= a * 0.6; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(x, y - 260); ctx.lineTo(x, y + 260); ctx.stroke(); ctx.restore();
  const w = Math.sin(T * 1.3) * 1.5, dx = 74;
  chromosoom(ctx, x - dx, y - 110 + w, 200, { kl: CH.vader, dubbel: 1, a, banden: [{ p: 0.7, letter: 'G', px: 42 }], letterLinks: true });
  chromosoom(ctx, x + dx, y - 110 + w, 200, { kl: CH.moeder, dubbel: 1, a, banden: [{ p: 0.7, letter: 'g', px: 42 }] });
  const [kL, lL, kR, lR] = omgekeerd ? [CH.moeder, 'r', CH.vader, 'R'] : [CH.vader, 'R', CH.moeder, 'r'];
  chromosoom(ctx, x - dx, y + 140 - w, 160, { kl: kL, dubbel: 1, a, banden: [{ p: 0.68, letter: lL, px: 42 }], letterLinks: true });
  chromosoom(ctx, x + dx, y + 140 - w, 160, { kl: kR, dubbel: 1, a, banden: [{ p: 0.68, letter: lR, px: 42 }] });
}

/* ---------- iconen voor 'volgende keer' ---------- */
function L3_icoonSchema(ctx, x, y, a) { ctx.save(); ctx.globalAlpha *= a; const v = 34, x0 = x - 2 * v, y0 = y - 2 * v; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { roundRect(ctx, x0 + j * v + 2, y0 + i * v + 2, v - 4, v - 4, 5); const f = L3_fenVan(genotypeVan(['GR', 'Gr', 'gR', 'gr'][i], ['GR', 'Gr', 'gR', 'gr'][j])); shape(ctx, rgba(L3_FKL()[f], 0.45), L3_FKL()[f], 1.5); } ctx.restore(); }
function L3_icoonOefen(ctx, x, y, a) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 58, y - 70, 116, 140, 10); shape(ctx, rgba(C.text, 0.06), C.text2, 3); ctx.restore();
  stamPersoon(ctx, x - 22, y - 30, 16, { m: true, a }); stamPersoon(ctx, x + 22, y - 30, 16, { a }); stamPaar(ctx, x - 22, x + 22, y - 30, 16, a); stamKinderen(ctx, x, y - 30, [x - 26, x + 26], y + 30, 16, a);
  stamPersoon(ctx, x - 26, y + 30, 16, { m: true, ziek: true, a }); stamPersoon(ctx, x + 26, y + 30, 16, { a, vraag: true }); }
function L3_icoonToets(ctx, x, y, a) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 55, y - 70, 110, 140, 10); shape(ctx, rgba(C.text, 0.08), C.text2, 3); for (let k = 0; k < 4; k++) { ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, y - 40 + k * 30); ctx.lineTo(x + 38, y - 40 + k * 30); ctx.stroke(); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 42, y - 42 + k * 30); ctx.lineTo(x - 36, y - 35 + k * 30); ctx.lineTo(x - 26, y - 50 + k * 30); ctx.stroke(); } ctx.restore(); }
function L3_icoonEvolutie(ctx, x, y, a, T) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const tak = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(x1, (y1 + y2) / 2, x2, y2); ctx.stroke(); };
  tak(x, y + 70, x, y + 20); tak(x, y + 20, x - 50, y - 20); tak(x, y + 20, x + 45, y - 10); tak(x - 50, y - 20, x - 75, y - 60); tak(x - 50, y - 20, x - 25, y - 65); tak(x + 45, y - 10, x + 70, y - 55); ctx.restore();
  [[-75, -60, C.goud], [-25, -65, C.teal], [70, -55, C.koraal]].forEach(([dx, dy, kl], i) => circ(ctx, x + dx, y + dy + Math.sin(T * 1.4 + i) * 2, 12, rgba(kl, a * 0.8), null)); }

/* =====================================================================================
   0 · Start
   ===================================================================================== */
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Erfelijkheid</b> · les 3: twee genen tegelijk, gekoppelde genen en stambomen lezen', n: 'Kies eerst havo of vwo. Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Vorige les: monohybride kruisingen, intermediair en multipele allelen, X-chromosomale overerving. In les 1 zagen de leerlingen het gezin De Wit al (Levi heeft albinisme): vandaag lezen we hun stamboom. Havo: het dihybride kruisingsschema (scherm 5–6) en crossing-over (scherm 8) zijn in film 4 vwo en vallen in de havo-stand weg.' }],
  teken(ctx, S) {
    metaText(ctx, 'Erfelijkheid · les 3', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Twee genen', 140, 470, fTitel(112), C.text); text(ctx, 'en een stamboom', 140, 600, fTitel(112), C.goud);
    regel(ctx, 'dihybride kruising · gekoppelde genen · stambomen en kansen', 144, 690, 1, C.text2, 32, 'left', 400);
    const t = S.T % 9, uit = 1 - ease((t - 7.6) / 0.9), r = 54;
    const ap = ease((t - 0.2) / 0.7) * uit, ak = (k) => ease((t - 1.5 - k * 0.45) / 0.6) * uit, z = ease((t - 3.4) / 0.8) * uit;
    stamPaar(ctx, 1340, 1660, 360, r, ap); stamPersoon(ctx, 1340, 360, r, { m: true, a: ap }); stamPersoon(ctx, 1660, 360, r, { a: ap });
    stamKinderen(ctx, 1500, 360, [1320, 1500, 1680], 600, r, ak(0));
    [[1320, 0], [1500, 1], [1680, 0]].forEach(([x, m], k) => { stamPersoon(ctx, x, 600, r, { m: !!m, a: ak(k) }); if (k === 1) stamPersoon(ctx, x, 600, r, { m: true, ziek: true, a: ak(k) * z }); });
    L3_FEN.forEach(([g, rd], k) => erwt(ctx, 1290 + k * 140, 830 + Math.sin(S.T * 1.5 + k * 1.3) * 5, 42, { geel: g, rimpel: !rd }));
  } });

/* =====================================================================================
   1 · Nieuwe combinaties
   ===================================================================================== */
SCHERMEN.push({ titel: 'Nieuwe combinaties', kop: 'Twee eigenschappen tegelijk', deel: 'Twee genen',
  stappen: [
    { t: 'Mendel keek naar twee eigenschappen van de erwt tegelijk: de <b>kleur</b> (geel of groen) en de <b>vorm</b> (rond of gerimpeld).', n: 'Film 4 (Dihybride kruising en gekoppelde overerving) opent in de moestuin: Opa Henk opent de peulen van een plant die uit een gele, ronde erwt groeide; de ouders hadden gele, ronde of groene, gerimpelde erwten. Het gaat om het zaad (de erwt), niet om de peul.' },
    { t: 'De planten van de <b>F1</b> hebben allemaal gele, ronde erwten: <b>geel</b> en <b>rond</b> zijn dominant.', n: 'De F1 kwam uit raszuivere ouders: geel-rond × groen-gerimpeld. Laat leerlingen zelf het genotype van die ouders en van de F1 noemen (GGRR × ggrr → GgRr); dat volgt op het volgende scherm.' },
    { t: 'Hij liet de F1 met zichzelf bestuiven. Tussen de nakomelingen zitten vier soorten erwten.', n: 'Zelfbestuiving van de F1 = GgRr × GgRr. Hier 48 erwten in de verhouding van de verwachting; Mendel telde er 556 (scherm 5, vwo).' },
    { t: 'Twee daarvan had geen van de ouders: <b>geel en gerimpeld</b>, en <b>groen en rond</b>. Nieuwe combinaties.', n: 'Startvraag voor de les, de puzzel van film 4: die combinaties hadden de grootouders niet. Hoe kan dat? Kom erop terug bij scherm 4 (toeval in de meiose).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), s2 = S.on(2, 2.2), s3 = S.on(3, 0.8);
    paneel(ctx, 90, 180, 820, 320, s0);
    metaText(ctx, 'kleur', 300, 236, C.meta, 'center', 24, s0); metaText(ctx, 'vorm', 700, 236, C.meta, 'center', 24, s0);
    erwt(ctx, 220, 340, 52, { geel: true, a: s0 }); erwt(ctx, 380, 340, 52, { geel: false, a: s0 });
    erwt(ctx, 620, 340, 52, { geel: true, a: s0 }); erwt(ctx, 780, 340, 52, { geel: true, rimpel: true, a: s0 });
    naam(ctx, 'geel', 220, 448, s0, 'center', C.text, 32); naam(ctx, 'groen', 380, 448, s0, 'center', C.text, 32);
    naam(ctx, 'rond', 620, 448, s0, 'center', C.text, 32); naam(ctx, 'gerimpeld', 780, 448, s0, 'center', C.text, 32);
    if (s1 > 0.01) { metaText(ctx, 'F1', 500, 560, C.meta, 'center', 24, s1);
      regel(ctx, 'geel en rond: dominant', 500, 610, s1 * S.on(1, 0.6, 0.6), C.goud, 34, 'center', 700);
      erwtPlant(ctx, 270, 1000, 360, BLOEM.wit, { a: s1, t: T, peul: true }); erwtPlant(ctx, 730, 1000, 360, BLOEM.wit, { a: s1 * S.on(1, 0.6, 0.3), t: T + 1, peul: true });
      for (let k = 0; k < 4; k++) erwt(ctx, 470 + (k % 2) * 62, 730 + Math.floor(k / 2) * 64, 27, { geel: true, a: s1 * S.on(1, 0.5, 0.4 + k * 0.1) }); }
    if (s2 > 0.01) { pijl(ctx, 920, 760, 1000, 690, C.text2, 5, s2);
      paneel(ctx, 1010, 180, 830, 720, s2); metaText(ctx, 'nakomelingen', 1425, 236, C.meta, 'center', 24, s2);
      L3_KROST.forEach((f, i) => { const c = i % 8, rr = Math.floor(i / 8), e = clamp(s2 * 48 * 1.15 - i, 0, 1); if (e <= 0.01) return; const x = 1080 + c * 98, y = 310 + rr * 104;
        const [g, rd] = L3_FEN[f]; erwt(ctx, x, y, 36, { geel: g, rimpel: !rd, a: e });
        if (s3 > 0.01 && (f === 1 || f === 2)) { ctx.save(); ctx.globalAlpha *= s3; circ(ctx, x, y, 46, null, C.goud, 4); ctx.restore(); } }); }
    naam(ctx, 'nieuwe combinaties', 1425, 960, s3, 'center', C.goud, 38);
  } });

/* =====================================================================================
   2 · Twee genen, twee paren
   ===================================================================================== */
SCHERMEN.push({ titel: 'Twee paren', kop: 'Twee genen, twee chromosoomparen', deel: 'Twee genen',
  stappen: [
    { t: 'Geel = <b>G</b>, groen = <b>g</b>, rond = <b>R</b>, gerimpeld = <b>r</b>. De F1-planten zijn <b>GgRr</b>.', n: 'Letters als in film 4. Hoofdletter = dominant allel. Vraag eventueel: welke gameten maakte de raszuivere geel-ronde ouder (GR) en de groen-gerimpelde (gr)?' },
    { t: 'Het gen voor <b>kleur</b> ligt op een chromosoompaar: één chromosoom van de vader, één van de moeder.', n: 'Kleuren als in les 1: teal = van de vader, oker = van de moeder. Hier vóór het kopiëren getekend (één chromatide).' },
    { t: 'Het gen voor <b>vorm</b> ligt op een <b>ander</b> chromosoompaar. We volgen dus twee paren tegelijk.', n: 'Bij de erwt liggen de genen voor zaadkleur en zaadvorm op verschillende chromosomen. Lagen ze dicht bij elkaar op hetzelfde chromosoom, dan had hij geen 9 : 3 : 3 : 1 gevonden (scherm 7).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.8), s1 = S.on(1, 1.0), s2 = S.on(2, 1.0);
    erwt(ctx, 770, 240, 48, { geel: true, a: s0 }); allelChip(ctx, 'GgRr', 1010, 240, s0, { px: 60, kl: C.goud });
    const ak = Math.max(s1, s2); ctx.save(); ctx.globalAlpha *= ak; ctx.beginPath(); ctx.ellipse(960, 650, 700, 330, 0, 0, 6.283); shape(ctx, rgba(C.paars, C.licht ? 0.06 : 0.1), rgba(C.paars, 0.8), 3); ctx.restore();
    naam(ctx, 'kern', 1590, 390, ak * 0.9, 'left', C.paars, 32);
    const w = Math.sin(T * 1.2) * 2;
    paar(ctx, 680, 600 + w, 400, { dubbel: 0, allelen: ['G', 'g'], a: s1, dx: 92, p: 0.62 });
    naam(ctx, 'kleurgen', 680, 920, s1, 'center', C.text, 36);
    paar(ctx, 1240, 630 - w, 320, { dubbel: 0, allelen: ['R', 'r'], a: s2, dx: 92, p: 0.65 });
    naam(ctx, 'vormgen', 1240, 920, s2, 'center', C.text, 36);
    regel(ctx, 'ander paar', 1240, 450, s2 * S.on(2, 0.6, 0.5), C.goud, 36, 'center', 700);
  } });

/* =====================================================================================
   3 · Toeval in de meiose
   ===================================================================================== */
SCHERMEN.push({ titel: 'Toeval in de meiose', kop: 'Toeval in de meiose', deel: 'Twee genen',
  stappen: [
    { t: 'Bij de meiose gaan de chromosoomparen in het <b>midden</b> van de cel liggen. Hoe elk paar ligt, is toeval.', n: 'Vraag uit film 4: Een erwtenplant is heterozygoot voor kleur (Gg) en voor vorm (Rr); de genen liggen op verschillende chromosomen. Hoeveel soorten gameten kan hij maken? (vier) Metafase I: de homologe chromosomen liggen als paar aan weerszijden van het midden; elk chromosoom bestaat dan uit twee chromatiden (X-vorm).' },
    { t: 'Ligt het zo, dan ontstaan gameten met <b>GR</b> en met <b>gr</b>.', n: 'Voor het gemak per kant één gameet getekend; na meiose II zijn het er vier (twee GR, twee gr).' },
    { t: 'Ligt het vormpaar <b>andersom</b>, dan ontstaan gameten met <b>Gr</b> en met <b>gR</b>.', n: 'De letterkleur laat zien van welke ouder het allel komt: in Gr en gR zitten allelen van vader én moeder door elkaar.' },
    { t: 'Beide liggingen zijn <b>even waarschijnlijk</b>: elk de helft van de keren.' },
    { t: 'Bij honderden cellen: <b>vier soorten gameten</b>, elk ongeveer een kwart.', n: 'Hier 400 gameten, elk bolletje = 4 gameten. Kleine afwijkingen van 100 per soort zijn toeval.' },
    { t: 'Dat heet <b>onafhankelijke overerving</b>: de allelen voor kleur en vorm worden los van elkaar verdeeld.', n: 'Mendels tweede wet (onafhankelijke splitsing). Geldt voor genen op verschillende chromosomen; genen op hetzelfde chromosoom: scherm 7. Daar zit ook het antwoord op de puzzel van scherm 2: gameten Gr en gR maakten de grootouders niet, deze plant wel.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.0), s1 = S.on(1, 1.0), s2 = S.on(2, 1.0), s3 = S.on(3, 0.7), s4 = S.on(4, 2.4), s5 = S.on(5, 0.8);
    const dim = 1 - S.on(4, 0.5), CY = 500;
    laag(ctx, dim, (c) => {
      metaText(c, 'ligging 1', 500, 196, C.meta, 'center', 24, s0); L3_meioseCel(c, 500, CY, s0, false, T);
      [[340, ['G', 'R']], [660, ['g', 'r']]].forEach(([x, l], k) => { const e = S.on(1, 0.7, k * 0.25); pijl(c, 500 + (k ? 80 : -80), 800, x, 818, C.text2, 4, s1 * e); L3_gameet(c, x, 880, 64, l, l.map(L3_kl), s1 * e, { px: 46 }); });
      metaText(c, 'ligging 2', 1420, 196, C.meta, 'center', 24, s2); L3_meioseCel(c, 1420, CY, s2, true, T);
      [[1260, ['G', 'r']], [1580, ['g', 'R']]].forEach(([x, l], k) => { const e = S.on(2, 0.7, 0.4 + k * 0.25); pijl(c, 1420 + (k ? 80 : -80), 800, x, 818, C.text2, 4, s2 * e); L3_gameet(c, x, 880, 64, l, l.map(L3_kl), s2 * e, { px: 46 }); });
      regel(c, 'kans ½', 500, 990, s3, C.goud, 44, 'center', 700); regel(c, 'kans ½', 1420, 990, s3, C.goud, 44, 'center', 700);
    });
    if (s4 > 0.01) { metaText(ctx, '400 gameten uit honderden cellen', 960, 210, C.meta, 'center', 24, s4);
      const tellers = [98, 104, 101, 97], soorten = [['G', 'R'], ['G', 'r'], ['g', 'R'], ['g', 'r']];
      soorten.forEach((l, k) => { const x = 380 + k * 390, n = Math.round(tellers[k] / 4), zicht = Math.floor(n * clamp(s4 * 1.2 - k * 0.05, 0, 1));
        for (let i = 0; i < zicht; i++) { const c = i % 5, rr = Math.floor(i / 5); circ(ctx, x - 72 + c * 36, 660 - rr * 36, 14, rgba(C.paars, 0.75), C.paars, 1.5); }
        L3_gameet(ctx, x, 770, 62, l, l.map(L3_kl), s4, { px: 44 });
        regel(ctx, '± ¼', x, 440, s4 * S.on(4, 0.5, 1.8), C.goud, 46, 'center', 700); }); }
    termKaart(ctx, 'onafhankelijke overerving', 'kleur en vorm worden los van elkaar verdeeld', 960, 866, s5);
  } });

/* =====================================================================================
   4 · Zestien vakjes
   ===================================================================================== */
SCHERMEN.push({ titel: 'Zestien vakjes', kop: 'Negen, drie, drie, één', deel: 'Twee genen',
  stappen: [
    { vwo: true, t: 'Beide F1-ouders (GgRr) maken vier soorten gameten: <b>GR</b>, <b>Gr</b>, <b>gR</b> en <b>gr</b>.', n: 'Dit scherm en het volgende zijn vwo, zoals hoofdstuk 2 van film 4 (havo: dihybride komt in de havo-examens 2018–2026 niet voor, zie briefing). Vraag uit film 4 (vwo): Beide ouders maken vier soorten gameten. Hoeveel vakjes krijgt het kruisingsschema? (zestien)' },
    { vwo: true, t: 'Vier keer vier: <b>zestien vakjes</b>. Elk vakje is even waarschijnlijk.', n: 'Werkwijze bij het invullen: per gen eerst de hoofdletter, dus GgRr en niet gGrR. Laat een paar vakjes hardop invullen.' },
    { vwo: true, t: 'Tel de fenotypen: <b>9</b> geel-rond, <b>3</b> geel-gerimpeld, <b>3</b> groen-rond, <b>1</b> groen-gerimpeld.', n: 'Tip voor leerlingen: elk vakje met minstens één G is geel, elk vakje met minstens één R is rond.' },
    { vwo: true, t: 'De verhouding is <b>9 : 3 : 3 : 1</b>.', n: 'Let op: dat is een verhouding tussen fenotypen. Genotypen zijn er negen verschillende (1 : 2 : 1 × 1 : 2 : 1).' },
    { vwo: true, t: 'Mendel telde <b>315 : 101 : 108 : 32</b> erwten. Heel dicht bij 9 : 3 : 3 : 1.', n: 'Samen 556 erwten; verwacht bij 9 : 3 : 3 : 1 is ± 313 : 104 : 104 : 35. Of zo\'n afwijking nog toeval is, toets je met een chi-kwadraattoets (geen examenstof; staat in de briefing).' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 1.0), s1 = S.on(1, 2.6), s2 = S.on(2, 1.0), s3 = S.on(3, 0.9), s4 = S.on(4, 0.9), KL = L3_FKL();
    const G = ['GR', 'Gr', 'gR', 'gr'];
    kruisSchema(ctx, 330, 330, { links: G, boven: G, vak: 158, prog: s1, a: s0, kopBoven: 'gameten', kopLinks: 'gameten', px: 40,
      cel: (i, j, g) => { const f = L3_fenVan(g), [ge, rd] = L3_FEN[f]; return { vul: s2 > 0.01 ? rgba(KL[f], 0.22 * s2) : null,
        teken: (c, cx, cy, a) => { erwt(c, cx, cy - 20, 32, { geel: ge, rimpel: !rd, a }); regel(c, g, cx, cy + 54, a, C.text2, 30, 'center', 600); } }; } });
    metaText(ctx, 'in het schema', 1560, 300, C.meta, 'center', 22, s2); metaText(ctx, 'Mendel', 1770, 300, C.meta, 'center', 22, s4);
    [9, 3, 3, 1].forEach((n, f) => { const y = 380 + f * 112, a = s2 * S.on(2, 0.5, f * 0.2), [ge, rd] = L3_FEN[f];
      erwt(ctx, 1060, y, 34, { geel: ge, rimpel: !rd, a }); naam(ctx, L3_FNAAM[f], 1112, y + 12, a, 'left', C.text, 34);
      regel(ctx, String(n), 1560, y + 22, a, KL[f], 60, 'center', 700);
      regel(ctx, String([315, 101, 108, 32][f]), 1770, y + 18, s4 * S.on(4, 0.5, f * 0.15), C.text, 50, 'center', 700); });
    verhouding(ctx, 1040, 820, 800, 74, [9, 3, 3, 1].map((n, f) => ({ n, kl: KL[f], in: String(n) })), s3);
    regel(ctx, '9 : 3 : 3 : 1', 1440, 975, s3, C.goud, 54, 'center', 700);
  } });

/* =====================================================================================
   5 · Rekenen zonder schema
   ===================================================================================== */
SCHERMEN.push({ titel: 'Rekenen zonder schema', kop: 'Rekenen zonder schema', deel: 'Twee genen',
  stappen: [
    { vwo: true, t: 'Kijk per gen apart. Gg × Gg: de kans op <b>geel</b> is <b>¾</b>.', n: 'Herhaling van les 2: Aa × Aa geeft 3 : 1. Film 4 (vwo) noemt dit "de productregel uit de vorige film".' },
    { vwo: true, t: 'Rr × Rr: de kans op <b>rond</b> is ook <b>¾</b>.' },
    { vwo: true, t: 'De genen zijn onafhankelijk, dus <b>vermenigvuldig</b>: ¾ × ¾ = <b>9/16</b> geel en rond.', n: 'Productregel (scherm 14 komt erop terug). Het vierkant is het oppervlaktemodel: kolommen = kleur, rijen = vorm.' },
    { vwo: true, t: 'Groen en gerimpeld: ¼ × ¼ = <b>1/16</b>.', n: 'Laat zelf geel-gerimpeld uitrekenen: ¾ × ¼ = 3/16.' },
    { vwo: true, t: '<b>Terugkruising</b> met een groene, gerimpelde plant (ggrr): de vier gameten van GgRr zie je direct terug, <b>1 : 1 : 1 : 1</b>.', n: 'ggrr maakt alleen gameten gr, dus elk fenotype van een nakomeling verraadt welke gameet de GgRr-ouder gaf. Zo toon je ook aan dat een geel-ronde plant GgRr is.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 0.8), s1 = S.on(1, 0.8), s2 = S.on(2, 1.0), s3 = S.on(3, 0.9), s4 = S.on(4, 1.4), KL = L3_FKL();
    const y1 = 330, y2 = 590, X = [180, 320, 450, 590, 730, 860, 1010], R = 44, B = 66;
    const rij = (y, a, b, e1, n1, t1, e2, n2, t2) => { erwt(ctx, X[0], y, R, Object.assign({ a }, e1)); naam(ctx, n1, X[0], y + 88, a, 'center', C.text, 32); breuk(ctx, t1[0], t1[1], X[1], y, B, a);
      regel(ctx, '×', X[2], y + 22, b, C.text2, 60, 'center', 700); erwt(ctx, X[3], y, R, Object.assign({ a: b }, e2)); naam(ctx, n2, X[3], y + 88, b, 'center', C.text, 32); breuk(ctx, t2[0], t2[1], X[4], y, B, b); };
    rij(y1, s0, s1, { geel: true }, 'geel', [3, 4], { geel: false }, 'rond', [3, 4]);
    regel(ctx, '=', X[5], y1 + 22, s2, C.text2, 60, 'center', 700); erwt(ctx, 960, y1, R, { geel: true, a: s2 }); breuk(ctx, 9, 16, 1100, y1, B, s2, C.goud);
    rij(y2, s3, s3, { geel: false }, 'groen', [1, 4], { geel: false, rimpel: true }, 'gerimpeld', [1, 4]);
    regel(ctx, '=', X[5], y2 + 22, s3, C.text2, 60, 'center', 700); erwt(ctx, 960, y2, R, { geel: false, rimpel: true, a: s3 }); breuk(ctx, 1, 16, 1100, y2, B, s3, C.paars);
    const ax = 1360, ay = 240, v = 116, aA = Math.max(s0, s1);
    if (aA > 0.01) { ctx.save(); ctx.globalAlpha *= aA; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const geel = j < 3, rond = i < 3; let vul = rgba(C.fill, 0.5);
        if (geel) vul = rgba(C.goud, 0.1 + 0.18 * s0 * (1 - s2)); if (rond && s1 > 0.01) vul = geel ? rgba(C.goud, 0.28 + 0.1 * s1) : rgba(C.groen, 0.1 + 0.2 * s1 * (1 - s2));
        if (s2 > 0.01 && geel && rond) vul = rgba(KL[0], 0.3 + 0.4 * s2); if (s3 > 0.01 && !geel && !rond) vul = rgba(KL[3], 0.25 + 0.4 * s3); roundRect(ctx, ax + j * v + 4, ay + i * v + 4, v - 8, v - 8, 10); shape(ctx, vul, rgba(C.line, 0.6), 2); } ctx.restore(); }
    naam(ctx, 'geel ¾', ax + 1.5 * v, ay - 18, s0, 'center', C.text, 30); naam(ctx, 'groen', ax + 3.5 * v, ay - 18, s0, 'center', C.text, 30);
    naam(ctx, 'rond ¾', ax - 16, ay + 1.5 * v + 10, s1, 'right', C.text, 30); naam(ctx, 'gerimpeld', ax - 16, ay + 3.5 * v + 10, s1, 'right', C.text, 30);
    if (s4 > 0.01) { const y = 890; allelChip(ctx, 'GgRr', 220, y, s4, { px: 42 }); regel(ctx, '×', 345, y + 16, s4, C.text2, 50, 'center', 700); allelChip(ctx, 'ggrr', 470, y, s4, { px: 42 });
      metaText(ctx, 'terugkruising', 345, y - 70, C.meta, 'center', 22, s4); pijl(ctx, 590, y, 690, y, C.text2, 5, s4);
      ['GgRr', 'Ggrr', 'ggRr', 'ggrr'].forEach((g, k) => { const e = s4 * S.on(4, 0.5, 0.3 + k * 0.2), [ge, rd] = L3_FEN[k], x = 800 + k * 190; erwt(ctx, x, y - 20, 38, { geel: ge, rimpel: !rd, a: e }); regel(ctx, g, x, y + 58, e, C.text2, 30, 'center', 600); });
      regel(ctx, '1 : 1 : 1 : 1', 1620, y + 18, s4 * S.on(4, 0.5, 1.1), C.goud, 54, 'center', 700); }
  } });

/* =====================================================================================
   6 · Gekoppelde genen
   ===================================================================================== */
SCHERMEN.push({ titel: 'Gekoppelde genen', kop: 'Twee genen op één chromosoom', deel: 'Gekoppeld',
  stappen: [
    { t: 'Bij de fruitvlieg: <b>G</b> = grijs lijf, <b>g</b> = zwart; <b>V</b> = normale vleugels, <b>v</b> = stompe vleugels. Raszuiver grijs-normaal × zwart-stomp.', n: 'Letters als in film 4 (de oude les had B/b). Let op: bij de erwt was G geel; bij de vlieg is G grijs. Grijs en normaal zijn dominant. De film begint met: kruis je zulke vliegjes, dan zie je veel minder nieuwe combinaties dan bij de erwten. Hoe kan dat?' },
    { t: 'Beide genen liggen op <b>hetzelfde chromosoom</b>. De ene ouder geeft <b>G</b> en <b>V</b> samen, de andere <b>g</b> en <b>v</b>.', n: 'Raszuiver = homozygoot: GGVV heeft op beide chromosomen G naast V; ggvv g naast v.' },
    { t: 'De F1 is GgVv. Welke allelen samen liggen, lees je af aan de <b>ouders</b>: GV op het ene, gv op het andere chromosoom.', n: 'Waren de ouders grijs-stomp × zwart-normaal geweest, dan was het precies andersom: G naast v, g naast V. Hetzelfde genotype, een andere verdeling over de chromosomen (notatie GV/gv tegenover Gv/gV). Vraag uit film 4 (vwo): Een vliegje Gv/gV wordt gekruist met gv/gv. Welke nakomelingen krijg je, zonder crossing-over? (grijs-stomp en zwart-normaal)' },
    { t: 'De twee genen gaan <b>samen mee</b>: zonder uitwisseling ontstaan maar twee soorten gameten.', n: 'Vraag uit film 4: Twee genen liggen op hetzelfde chromosoom (G naast V, g naast v) en elk chromosoom gaat in zijn geheel naar een gameet. Hoeveel soorten gameten? (twee) Vergelijk met scherm 4: daar lagen de genen op verschillende paren en ontstonden vier soorten.' },
    { t: 'Zulke genen heten <b>gekoppeld</b>.', n: 'Examenvoorbeeld havo 2019-I vraag 12: HLA-genen liggen dicht bij elkaar en erven als één set; de kans dat een broer dezelfde sets heeft als zijn zus = ½ × ½ = ¼ (per ouder één van twee sets).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), s2 = S.on(2, 1.4), s3 = S.on(3, 1.2), s4 = S.on(4, 0.8);
    regel(ctx, 'G grijs  ·  g zwart', 1480, 230, s0, C.text2, 32, 'left', 600); regel(ctx, 'V normaal  ·  v stomp', 1480, 280, s0, C.text2, 32, 'left', 600);
    vlieg(ctx, 240, 300, 2.0, { a: s0, rot: Math.sin(T * 0.9) * 0.03 }); naam(ctx, 'grijs, normaal', 240, 500, s0, 'center', C.text, 32);
    regel(ctx, '×', 740, 330, s0, C.text2, 60, 'center', 700);
    vlieg(ctx, 1000, 300, 2.0, { a: s0, zwart: true, stomp: true, rot: Math.sin(T * 0.9 + 1) * 0.03 }); naam(ctx, 'zwart, stomp', 1000, 500, s0, 'center', C.text, 32);
    const bnd = (u, l1, l2) => [{ p: 0.26, letter: l1, px: 44 }, { p: 0.74, letter: l2, px: 44 }];
    chromosoom(ctx, 470, 320, 260, { kl: CH.vader, dubbel: 0, a: s1, w: 40, banden: bnd(0, 'G', 'V') });
    chromosoom(ctx, 1230, 320, 260, { kl: CH.moeder, dubbel: 0, a: s1, w: 40, banden: bnd(0, 'g', 'v') });
    if (s2 > 0.01) { pijl(ctx, 490, 520, 640, 600, C.text2, 4, s2); pijl(ctx, 1210, 520, 820, 600, C.text2, 4, s2);
      const a2 = s2 * S.on(2, 0.6, 0.4); vlieg(ctx, 380, 760, 2.0, { a: a2, rot: Math.sin(T * 0.9 + 2) * 0.03 }); naam(ctx, 'F1', 380, 960, a2, 'center', C.text, 34);
      chromosoom(ctx, 660, 740, 260, { kl: CH.vader, dubbel: 0, a: s2, w: 40, banden: bnd(0, 'G', 'V'), letterLinks: true });
      chromosoom(ctx, 790, 740, 260, { kl: CH.moeder, dubbel: 0, a: s2, w: 40, banden: bnd(0, 'g', 'v') });
      allelChip(ctx, 'GgVv', 725, 980, s2 * S.on(2, 0.6, 0.8), { px: 36 }); }
    if (s3 > 0.01) { pijl(ctx, 900, 740, 1010, 740, C.text2, 4, s3);
      L3_gameet(ctx, 1110, 740, 74, ['G', 'V'], [CH.vader, CH.vader], s3 * S.on(3, 0.6, 0.2), { px: 48 }); L3_gameet(ctx, 1310, 740, 74, ['g', 'v'], [CH.moeder, CH.moeder], s3 * S.on(3, 0.6, 0.4), { px: 48 });
      const g = s3 * S.on(3, 0.6, 0.8) * 0.6; L3_gameet(ctx, 1540, 690, 50, ['G', 'v'], [C.text2, C.text2], g, { px: 34 }); L3_gameet(ctx, 1700, 690, 50, ['g', 'V'], [C.text2, C.text2], g, { px: 34 });
      kruis(ctx, 1540, 690, 30, g * 1.6, C.koraal); kruis(ctx, 1700, 690, 30, g * 1.6, C.koraal);
      regel(ctx, 'maar twee soorten', 1210, 630, s3 * S.on(3, 0.6, 0.6), C.goud, 36, 'center', 700); }
    termKaart(ctx, 'gekoppelde genen', 'liggen op hetzelfde chromosoom en gaan samen mee', 1380, 860, s4);
  } });

/* =====================================================================================
   7 · Crossing-over
   ===================================================================================== */
SCHERMEN.push({ titel: 'Crossing-over', kop: 'Crossing-over', deel: 'Gekoppeld',
  stappen: [
    { vwo: true, t: 'Toch zie je bij echte fruitvliegjes soms nieuwe combinaties. In de meiose liggen de <b>homologe chromosomen</b> dicht tegen elkaar, elk met twee chromatiden.', n: 'Vwo, zoals hoofdstuk 5 van film 4, en alleen kwalitatief: veel oude, weinig nieuwe combinaties, zonder getallen. Recombinatiepercentage, genkaart en afstand tussen genen zitten bewust niet in film en les (Kamiel: te diepgaand; achtergrond in de briefing). Film 4 kruist een GV/gv-vrouwtje met een zwart mannetje met stompe vleugels: bij fruitvliegmannetjes is er geen crossing-over. Profase I. Teal = het chromosoom met GV (van de grijs-normale ouder), oker = gv.' },
    { vwo: true, t: 'Een chromatide van het ene en een van het andere chromosoom kunnen op <b>dezelfde plek</b> breken en een stuk uitwisselen: <b>crossing-over</b>.', n: 'Vwo: de plek waar de chromatiden elkaar kruisen heet een chiasma (meervoud chiasmata). Het gebeurt tussen een chromatide van de vader en een van de moeder, niet tussen zusterchromatiden.' },
    { vwo: true, t: 'Uit zo\'n cel: twee gameten met de <b>oude</b> combinatie en twee met een <b>nieuwe</b>: Gv en gV.', n: 'Valt de crossing-over niet tussen de twee genen, dan merk je er niets van: dan blijven GV en gv bij elkaar.' },
    { vwo: true, t: 'Daaruit groeien vliegen met een nieuwe combinatie: grijs met stompe en zwart met normale vleugels. Die heten <b>recombinanten</b>. Ze blijven in de minderheid.', n: 'Niet in elke cel valt een crossing-over tussen deze twee genen; daarom krijgen de gameten met een nieuwe combinatie in het kruisingsschema een kleinere kans. Crossing-over verbreekt de koppeling af en toe (film 4).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.0), s1 = S.on(1, 2.6), s2 = S.on(2, 1.4), s3 = S.on(3, 1.0);
    const cx = 960, y0 = 180, len = 400, w = 44, br = 0.5, kV = CH.vader, kM = CH.moeder;
    const nader = L3_bult(s1) * 34, ruil = clamp((s1 - 0.42) / 0.16, 0, 1), sep = 40 * (1 - s0);
    const xs = [cx - 140 - sep, cx - 56 - sep + nader * 0.2, cx + 56 + sep - nader * 0.2, cx + 140 + sep];
    const dxo = [0, nader * 1.1, -nader * 1.1, 0];
    const kb = [kV, kV, kM, kM], ko = [kV, ruil > 0.5 ? kM : kV, ruil > 0.5 ? kV : kM, kM];
    const lb = ['G', 'G', 'g', 'g'], lo = ['V', ruil > 0.5 ? 'v' : 'V', ruil > 0.5 ? 'V' : 'v', 'v'];
    for (let k = 0; k < 4; k++) L3_chromatide(ctx, xs[k], y0, len, w, kb[k], ko[k], br, [{ p: 0.22, letter: lb[k], px: 32 }, { p: 0.78, letter: lo[k], px: 32 }], s0 * (1 - 0.65 * s2), dxo[k]);
    if (s0 > 0.01) { [[0, 1], [2, 3]].forEach(([i, j]) => circ(ctx, (xs[i] + xs[j]) / 2, y0 + len * 0.38, 12, rgba(dk(kb[i]), s0 * (1 - 0.65 * s2)), null)); }
    if (s1 > 0.3 && s1 < 0.85) gloed(ctx, cx, y0 + len * br, 90, C.koraal, L3_bult((s1 - 0.3) / 0.55));
    naam(ctx, 'chromosoom van de ene ouder', xs[0] - 50, y0 + 110, s0 * (1 - s2), 'right', CH.vader, 32);
    naam(ctx, 'van de andere ouder', xs[3] + 50, y0 + 110, s0 * (1 - s2), 'left', CH.moeder, 32);
    naam(ctx, 'breuk en ruil', cx + 210, y0 + len * br + 12, s1 * (1 - s2), 'left', C.koraal, 34);
    const gx = [330, 750, 1170, 1590], rec = [false, true, true, false];
    gx.forEach((x, k) => { const e = s2 * S.on(2, 0.6, 0.2 + k * 0.15); if (e <= 0.01) return; pijl(ctx, xs[k], y0 + len + 24, x, 618, C.text2, 4, e);
      gameet(ctx, x, 720, 90, '', { soort: 'cel', kl: rec[k] ? C.goud : C.text2, a: e }); if (rec[k]) { ctx.save(); ctx.globalAlpha *= e; circ(ctx, x, 720, 102, null, C.goud, 3); ctx.restore(); }
      L3_chromatide(ctx, x, 645, 150, 34, kb[k], ko[k], br, [{ p: 0.22, letter: lb[k], px: 30 }, { p: 0.78, letter: lo[k], px: 30 }], e);
      regel(ctx, rec[k] ? 'nieuw' : 'oud', x, 858, e, rec[k] ? C.goud : C.text2, 34, 'center', 700); });
    vlieg(ctx, 560, 950, 1.0, { a: s3, stomp: true }); naam(ctx, 'grijs, stomp', 620, 962, s3, 'left', C.text, 32);
    vlieg(ctx, 1010, 950, 1.0, { a: s3 * S.on(3, 0.6, 0.3), zwart: true }); naam(ctx, 'zwart, normaal', 1070, 962, s3 * S.on(3, 0.6, 0.3), 'left', C.text, 32);
    regel(ctx, 'recombinanten', 1600, 962, s3 * S.on(3, 0.6, 0.6), C.goud, 38, 'center', 700);
  } });

/* =====================================================================================
   8 · De taal van een stamboom
   ===================================================================================== */
SCHERMEN.push({ titel: 'De taal van een stamboom', kop: 'De taal van een stamboom', deel: 'Stambomen',
  stappen: [
    { t: 'Een <b>vierkant</b> is een man, een <b>rondje</b> een vrouw. <b>Ingekleurd</b>: die persoon heeft de eigenschap.', n: 'Film 6 (Stambomen en kansrekenen) gebruikt een vrouw van 34 (Sanne) bij de klinisch geneticus: haar jongste broer heeft taaislijmziekte, zijzelf, haar oudste broer en haar ouders niet. Hier het gezin De Wit uit les 1: Levi heeft albinisme. Zelfde redenering, zelfde getallen.' },
    { t: 'Generatie <b>I</b>: de grootouders. Een lijn tussen twee symbolen is een paar.', n: 'Generaties nummer je met Romeinse cijfers, personen in een generatie met gewone cijfers van links naar rechts (II-1, II-2).' },
    { t: 'Generatie <b>II</b>: Dennis en Marieke, elk onder zijn of haar eigen ouders.' },
    { t: 'Generatie <b>III</b>: de kinderen hangen onder het paar, van oud naar jong. Alleen <b>Levi</b> is ingekleurd: hij heeft albinisme.', n: 'Sara (13), Levi (10), Jens (7). Albinisme (OCA1): geen pigment in huid, haar en ogen.' },
    { t: 'Dit is het gezin De Wit, dat de leerlingen in les 1 al zagen.', n: 'Wat de leerlingen niet weten: wie van Sara en Jens drager is. Dat is precies de vraag van scherm 13.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.2), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 1.2), s4 = S.on(4, 1.0);
    L3_witBoom(ctx, 760, 300, 1.15, { aI: s1, aII: s2, aIII: s3, ziek: S.on(3, 0.6, 0.7), romeins: 1 });
    const aj = s3 * S.on(3, 0.6, 0.5); if (aj > 0.01) { pijl(ctx, 600, 975, 920, 975, C.text2, 3, aj, 14); naam(ctx, 'oud', 580, 986, aj, 'right', C.text2, 30); naam(ctx, 'jong', 940, 986, aj, 'left', C.text2, 30); }
    const ly = 1000; stamPersoon(ctx, 1290, ly - 12, 26, { m: true, a: s0 }); naam(ctx, 'man', 1330, ly, s0, 'left', C.text, 30);
    const a1 = s0 * S.on(0, 0.5, 0.3), a2 = s0 * S.on(0, 0.5, 0.6); stamPersoon(ctx, 1470, ly - 12, 26, { a: a1 }); naam(ctx, 'vrouw', 1510, ly, a1, 'left', C.text, 30);
    stamPersoon(ctx, 1660, ly - 12, 26, { m: true, ziek: true, a: a2 }); naam(ctx, 'eigenschap', 1700, ly, a2, 'left', C.text, 30);
    if (s4 > 0.01) { const y = 800; [['dennis', 1330, 340], ['marieke', 1460, 320], ['sara', 1580, 290], ['levi', 1690, 260], ['jens', 1790, 225]].forEach(([id, x, h], k) => pers(ctx, id, x, y, h, { t: T, uit: 'blij', a: s4 * S.on(4, 0.5, k * 0.12) }));
      metaText(ctx, 'gezin De Wit', 1560, 860, C.meta, 'center', 24, s4); }
  } });

/* =====================================================================================
   9 · Stap 1: dominant of recessief?
   ===================================================================================== */
SCHERMEN.push({ titel: 'Dominant of recessief?', kop: 'Stap 1: dominant of recessief?', deel: 'Stambomen',
  stappen: [
    { t: 'Zoek twee ouders <b>zonder</b> de eigenschap met een kind dat hem <b>wél</b> heeft: Dennis, Marieke en Levi.', n: 'Leerlingen wijzen zelf de drie personen aan voor je de ringen laat zien (Namen verbergen: L).' },
    { t: 'Dan droegen die ouders het allel verborgen bij zich. De eigenschap is <b>recessief</b>.', n: 'Andersom geldt het niet: twee gezonde ouders met alleen gezonde kinderen bewijzen niets.' },
    { t: 'Twee ouders <b>mét</b> de eigenschap en een kind <b>zonder</b>: dan is hij <b>dominant</b>.', n: 'Beide ouders zijn dan Aa; het gezonde kind is aa.' },
    { t: 'Bij een dominante aandoening, zoals de <b>ziekte van Huntington</b>, heeft wie de aandoening heeft bijna altijd een ouder met de aandoening: hij slaat geen generatie over.', n: '"Bijna altijd", zoals film 6 (de oude film zei "iedereen"): uitzonderingen zijn een nieuwe mutatie en een ziekte die pas laat begint (Huntington meestal na je dertigste), zie briefing. Vraag uit film 6: Deze man heeft de ziekte van Huntington niet, maar zijn vader wel. Kan zijn kind de ziekte krijgen? (nee: hij is aa en heeft geen A om door te geven) In de stamboom hier: de gezonde zoon in generatie II. In die tak is het allel weg; een eigenschap die een generatie overslaat, is recessief.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 1.0), s1 = S.on(1, 0.8), s2 = S.on(2, 1.0), s3 = S.on(3, 1.4);
    L3_witBoom(ctx, 560, 290, 1.0, { ziek: 1, hl: { dennis: s0, marieke: s0, levi: s0 } });
    regel(ctx, 'recessief', 560, 905, s1, C.goud, 60, 'center', 700);
    regel(ctx, 'gezond × gezond → kind met de eigenschap', 560, 962, s1, C.text2, 32, 'center', 500);
    if (s2 > 0.01) { const a = s2, r = 42; stamPaar(ctx, 1160, 1420, 250, r, a); stamPersoon(ctx, 1160, 250, r, { m: true, ziek: true, a }); stamPersoon(ctx, 1420, 250, r, { ziek: true, a });
      stamKinderen(ctx, 1290, 250, [1180, 1400], 410, r, a); stamPersoon(ctx, 1180, 410, r, { m: true, ziek: true, a }); stamPersoon(ctx, 1400, 410, r, { a, hl: S.on(2, 0.5, 0.5) });
      regel(ctx, 'dominant', 1680, 350, a * S.on(2, 0.5, 0.7), C.goud, 54, 'center', 700); }
    if (s3 > 0.01) { const a = s3, r = 38, ag = (k) => a * S.on(3, 0.5, k * 0.35); metaText(ctx, 'ziekte van Huntington', 1290, 545, C.meta, 'center', 24, a);
      stamPaar(ctx, 1210, 1390, 620, r, ag(0)); stamPersoon(ctx, 1210, 620, r, { m: true, ziek: true, a: ag(0) }); stamPersoon(ctx, 1390, 620, r, { a: ag(0) });
      stamKinderen(ctx, 1300, 620, [1300, 1480], 770, r, ag(1)); stamPersoon(ctx, 1300, 770, r, { ziek: true, a: ag(1) }); stamPersoon(ctx, 1480, 770, r, { m: true, a: ag(1) });
      stamPaar(ctx, 1120, 1300, 770, r, ag(1)); stamPersoon(ctx, 1120, 770, r, { m: true, a: ag(1) });
      stamKinderen(ctx, 1210, 770, [1120, 1300], 920, r, ag(2)); stamPersoon(ctx, 1120, 920, r, { m: true, ziek: true, a: ag(2) }); stamPersoon(ctx, 1300, 920, r, { a: ag(2) });
      ['I', 'II', 'III'].forEach((rn, k) => regel(ctx, rn, 1040, [633, 783, 933][k], ag(k), C.text2, 34, 'center', 700));
      regel(ctx, 'slaat geen', 1700, 750, ag(2), C.goud, 40, 'center', 700); regel(ctx, 'generatie over', 1700, 800, ag(2), C.goud, 40, 'center', 700); }
  } });

/* =====================================================================================
   10 · Stap 2: autosomaal of X?
   ===================================================================================== */
SCHERMEN.push({ titel: 'Autosomaal of X?', kop: 'Stap 2: autosomaal of via het X-chromosoom?', deel: 'Stambomen',
  stappen: [
    { t: 'Bij een <b>X-recessieve</b> eigenschap heeft een aangedane dochter altijd een aangedane vader.', n: 'Herhaling van les 2 (X-chromosomale overerving): een vrouw heeft twee X-chromosomen, een man één.' },
    { t: 'Hij geeft haar immers zijn <b>enige X</b>.', n: 'Zonen krijgen van de vader de Y, dus een vader geeft een X-gebonden eigenschap nooit aan zijn zoon.' },
    { t: 'Zie je een aangedane dochter met een <b>gezonde vader</b>, dan is het <b>autosomaal</b>.', n: 'Een gezonde vader is XᴬY en kan geen Xᵃ geven.' },
    { t: 'Bij De Wit is alleen een <b>zoon</b> aangedaan: dat past bij beide. Uit onderzoek weet je dat albinisme <b>autosomaal</b> is.', n: 'Stap 2 lukt dus niet altijd met de stamboom alleen. Levi heeft OCA1: een fout in het gen TYR op een autosoom. In een toetsvraag staat het er dan bij, of je moet beide mogelijkheden noemen.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.0), s1 = S.on(1, 1.4), s2 = S.on(2, 1.0), s3 = S.on(3, 1.0), r = 44;
    const dim = 1 - 0.55 * s3;
    laag(ctx, dim, (c) => {
      metaText(c, 'X-recessief', 520, 196, C.meta, 'center', 24, s0);
      stamPaar(c, 400, 640, 300, r, s0); stamPersoon(c, 400, 300, r, { m: true, ziek: true, a: s0, label: 'XᵃY', labelZij: 'boven', labelPx: 34 }); stamPersoon(c, 640, 300, r, { a: s0, label: 'XᴬXᵃ', labelZij: 'boven', labelPx: 34 });
      stamKinderen(c, 520, 300, [520], 480, r, s0); stamPersoon(c, 520, 480, r, { ziek: true, a: s0, label: 'XᵃXᵃ', labelZij: 'rechts', labelPx: 34 });
      if (s1 > 0.01) { const u = ease(s1); ctx.save(); c.save(); c.globalAlpha *= s1; c.strokeStyle = C.goud; c.lineWidth = 4; c.setLineDash([8, 8]); c.beginPath(); c.moveTo(380, 346); c.quadraticCurveTo(320, 440, 474, 486); c.stroke(); c.restore(); ctx.restore();
        allelChip(c, 'Xᵃ', lerp(340, 310, u), lerp(370, 430, u), s1, { px: 34, kl: C.goud }); naam(c, 'zijn enige X', 270, 500, s1 * S.on(1, 0.5, 0.8), 'right', C.goud, 32); }
      metaText(c, 'aangedane dochter, gezonde vader', 1400, 196, C.meta, 'center', 24, s2);
      stamPaar(c, 1280, 1520, 300, r, s2); stamPersoon(c, 1280, 300, r, { m: true, a: s2, hl: S.on(2, 0.5, 0.4) }); stamPersoon(c, 1520, 300, r, { a: s2 });
      stamKinderen(c, 1400, 300, [1400], 480, r, s2); stamPersoon(c, 1400, 480, r, { ziek: true, a: s2 });
      regel(c, 'autosomaal', 1400, 600, s2 * S.on(2, 0.5, 0.7), C.goud, 52, 'center', 700);
    });
    if (s3 > 0.01) { paneel(ctx, 110, 640, 1700, 360, s3);
      L3_witBoom(ctx, 470, 720, 0.85, { vanafII: true, aII: s3, aIII: s3, ziek: 1, namen: 1 });
      regel(ctx, 'alleen een zoon aangedaan:', 980, 790, s3, C.text, 38, 'left', 600); regel(ctx, 'past bij allebei', 980, 840, s3, C.text, 38, 'left', 600);
      regel(ctx, 'albinisme (OCA1): autosomaal', 980, 930, s3 * S.on(3, 0.5, 0.5), C.goud, 42, 'left', 700); }
  } });

/* =====================================================================================
   11 · Stap 3: genotypen invullen
   ===================================================================================== */
SCHERMEN.push({ titel: 'Genotypen invullen', kop: 'Stap 3: genotypen invullen', deel: 'Stambomen',
  stappen: [
    { t: 'Begin bij wie de eigenschap heeft. Albinisme is recessief, dus Levi is <b>aa</b>.', n: 'A = allel voor pigment (werkend enzym), a = albinisme.' },
    { t: 'Werk terug: Levi kreeg van <b>beide</b> ouders een a. Dennis en Marieke zijn gezond, dus <b>Aa</b>.', n: 'Ouders van een aa-kind zijn altijd minstens drager. Gezond + drager = Aa.' },
    { t: 'Van Sara en Jens weet je alleen dat ze gezond zijn: minstens één A. Noteer <b>A_</b>.', n: 'In de familie liggen hun genotypen vast (Sara AA, Jens Aa, LEVENSLOOP), maar dat kun je uit de stamboom niet afleiden. Dat is de vraag van scherm 13.' },
    { t: 'Ook de grootouders zijn <b>A_</b>.', n: 'Wel weet je: Dennis kreeg zijn a van opa Frank of oma Lucia, Marieke van opa Wim of oma Anja. Per kant is dus minstens één grootouder drager; wie, zie je niet.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 0.8), s1 = S.on(1, 1.2), s2 = S.on(2, 0.8), s3 = S.on(3, 0.8);
    const geno = { levi: 'aa', dennis: 'Aa', marieke: 'Aa', sara: 'A_', jens: 'A_', opawit: 'A_', omawit: 'A_', opabos: 'A_', omabos: 'A_' };
    const genoA = { levi: s0, dennis: S.on(1, 0.6, 0.6), marieke: S.on(1, 0.6, 0.6), sara: s2, jens: s2, opawit: s3, omawit: s3, opabos: s3, omabos: s3 };
    const { P, r } = L3_witBoom(ctx, 790, 280, 1.15, { ziek: 1, romeins: 1, geno, genoA, hl: { levi: s0 * (1 - s1) } });
    if (s1 > 0.01) { const e = s1 * (1 - 0.6 * s2); [P.dennis, P.marieke].forEach(([x, y], k) => { const u = S.on(1, 0.7, k * 0.15); pijl(ctx, P.levi[0] + (k ? 30 : -30), P.levi[1] - r - 6, lerp(P.levi[0], x + (k ? -34 : 34), u), lerp(P.levi[1] - r, y + r + 8, u), C.koraal, 5, e); });
      const my = (P.levi[1] + P.dennis[1]) / 2 + 10; regel(ctx, 'a', (P.levi[0] + P.dennis[0]) / 2 - 22, my, s1 * (1 - s2), C.koraal, 38, 'center', 700); regel(ctx, 'a', (P.levi[0] + P.marieke[0]) / 2 + 22, my, s1 * (1 - s2), C.koraal, 38, 'center', 700); }
    termKaart(ctx, 'A_', 'AA óf Aa', 1640, 480, s2, C.goud, 300);
  } });

/* =====================================================================================
   12 · Is Sara drager?
   ===================================================================================== */
const L3_KIND300 = (() => { const a = []; [[0, 75], [1, 150], [2, 75]].forEach(([k, n]) => { for (let i = 0; i < n; i++) a.push(k); }); const r = toeval(23); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
SCHERMEN.push({ titel: 'Is Sara drager?', kop: 'Is Sara drager?', deel: 'Kansen',
  stappen: [
    { t: 'Dennis en Marieke zijn allebei <b>Aa</b>. We simuleren <b>300 kinderen</b>: een kwart AA, de helft Aa, een kwart aa.', n: 'Vraag uit film 6: Haar ouders zijn allebei Aa. De vrouw zelf is gezond. Hoe groot is de kans dat zij drager is? (twee derde) Hier dezelfde vraag als denkvoorbeeld voor Sara; film 6 simuleert ook 300 kinderen.' },
    { t: 'Maar we weten iets over Sara: ze is <b>gezond</b>. De kinderen met aa vallen weg.', n: 'Haal weg wat je al weet: je rekent alleen binnen de groep die past bij wat je al weet. (In de wiskunde heet dat voorwaardelijke kans; film 6 en de syllabus gebruiken die term niet.)' },
    { t: 'Van de 225 die overblijven zijn er 150 drager: <b>twee derde</b>.', n: 'Of met het schema: van de vier vakjes valt aa weg; van de drie die overblijven zijn er twee Aa.' },
    { t: 'De kans is dus ⅔, <b>niet ½</b>.', n: 'Misvatting: "Aa is de helft, dus ½." Die ½ geldt vóór je weet dat Sara gezond is. Dit is een denkvoorbeeld: in de familie ligt vast dat Sara AA is (LEVENSLOOP). Dat weet je pas met een dragerschapstest (scherm 15).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 2.0), s1 = S.on(1, 1.4), s2 = S.on(2, 1.0), s3 = S.on(3, 1.0), KLG = [C.groen, C.goud, C.koraal];
    pers(ctx, 'sara', 210, 880, 520, { t: T, uit: 'neutraal' }); naam(ctx, 'Sara', 210, 950, 1, 'center', C.text, 36);
    allelChip(ctx, 'Aa × Aa', 860, 210, s0, { px: 40 });
    if (s0 > 0.01) { const x0 = 440, y0 = 260, w = 860, h = 560, kol = 23, dx = w / kol, dy = h / 14, zicht = Math.floor(300 * s0);
      for (let i = 0; i < zicht; i++) { const g = L3_KIND300[i], c = i % kol, rr = Math.floor(i / kol); let x = x0 + c * dx + dx / 2, y = y0 + rr * dy + dy / 2, a = 1;
        if (g === 2 && s1 > 0.01) { const u = clamp(s1 * 1.6 - hash(i) * 0.6, 0, 1); y += 300 * u * u; a = 1 - u; }
        if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 14, KLG[g]); if (s2 > 0.01 && g === 1) circ(ctx, x, y, 17.5, null, rgba(C.text, 0.5 * s2), 2); ctx.restore(); } } }
    [['AA', '¼', 75], ['Aa', '½', 150], ['aa', '¼', 75]].forEach(([g, f, n], k) => { const y = 320 + k * 110, a = s0 * S.on(0, 0.5, 0.8 + k * 0.2) * (k === 2 ? 1 - 0.7 * s1 : 1); circ(ctx, 1390, y - 14, 18, rgba(KLG[k], a)); regel(ctx, g, 1430, y, a, C.text, 42, 'left', 700); regel(ctx, f, 1570, y, a, C.text2, 46, 'left', 700); regel(ctx, String(n), 1670, y, a, C.text2, 36, 'left', 500); });
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1365, 526); ctx.lineTo(1750, 526); ctx.stroke(); ctx.restore(); naam(ctx, 'Sara is gezond', 1560, 600, s1, 'center', C.koraal, 34); }
    regel(ctx, '150 van 225', 1560, 690, s2, C.text, 40, 'center', 700);
    kansBalk(ctx, 440, 890, 600, 52, (2 / 3) * s2, C.goud, s2, '⅔ drager');
    misvatting(ctx, 'de kans is ½', 'de kans is ⅔', 1580, 780, 480, s3, S.on(3, 0.5, 0.5));
  } });

/* =====================================================================================
   13 · Twee rekenregels
   ===================================================================================== */
SCHERMEN.push({ titel: 'Twee rekenregels', kop: 'Twee rekenregels', deel: 'Kansen',
  stappen: [
    { t: '<b>Productregel</b>: moeten twee onafhankelijke dingen allebei gebeuren, vermenigvuldig. Twee kinderen met aa: ¼ × ¼ = <b>1/16</b>.', n: 'Het vierkant: kolommen = eerste kind, rijen = tweede kind. Alleen het hoekvakje is "allebei aa". Zelfde voorbeeld als film 6. Zelfde rekenregel als ½ × ½ in les 2 (vwo ook ¾ × ¾ op scherm 6).' },
    { t: '<b>Somregel</b>: sluiten twee mogelijkheden elkaar uit, tel op. Gezond = AA óf Aa: ¼ + ½ = <b>¾</b>.', n: 'Een kind kan niet tegelijk AA en Aa zijn: elkaar uitsluitend. Vraag terug: wat is de kans op een ziek kind? (1 − ¾ = ¼)' },
    { t: 'Elk kind is een nieuwe trekking. Na een kind met aa is de kans voor het volgende kind <b>weer ¼</b>.', n: 'Vraag uit film 6: Twee dragers hebben al een kind met taaislijmziekte. Hoe groot is de kans dat hun volgende kind het ook krijgt? (een kwart) Misvatting: "Ze hebben al een ziek kind, dus de volgende drie zijn gezond." Toeval heeft geen geheugen. De Wit: Levi kwam als tweede, na Sara.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 1.2), s1 = S.on(1, 1.2), s2 = S.on(2, 1.2);
    paneel(ctx, 90, 180, 850, 620, s0); metaText(ctx, 'productregel', 515, 232, C.meta, 'center', 24, s0);
    const ax = 300, ay = 310, v = 106;
    if (s0 > 0.01) { ctx.save(); ctx.globalAlpha *= s0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let vul = rgba(C.fill, 0.5); if (j === 0 || i === 0) vul = rgba(C.koraal, 0.16); if (i === 0 && j === 0) vul = rgba(C.koraal, 0.25 + 0.55 * S.on(0, 0.6, 0.6));
        roundRect(ctx, ax + j * v + 4, ay + i * v + 4, v - 8, v - 8, 10); shape(ctx, vul, rgba(C.line, 0.6), 2); } ctx.restore(); }
    naam(ctx, '1e kind aa', ax + v / 2, ay - 18, s0, 'center', C.koraal, 30); naam(ctx, '2e', ax - 16, ay + v / 2 + 10, s0, 'right', C.koraal, 30);
    regel(ctx, '¼ × ¼ =', 830, 500, s0 * S.on(0, 0.5, 0.6), C.text, 48, 'center', 700); breuk(ctx, 1, 16, 830, 600, 60, s0 * S.on(0, 0.5, 0.9), C.koraal);
    paneel(ctx, 980, 180, 850, 620, s1); metaText(ctx, 'somregel', 1405, 232, C.meta, 'center', 24, s1);
    verhouding(ctx, 1040, 320, 730, 90, [{ n: 1, kl: C.groen, in: 'AA', label: '¼' }, { n: 2, kl: C.goud, in: 'Aa', label: '½' }, { n: 1, kl: C.koraal, in: 'aa', label: '¼' }], s1, { px: 34 });
    if (s1 > 0.01) { const a = s1 * S.on(1, 0.5, 0.5), x1 = 1044, x2 = 1040 + 730 * 0.75 - 4; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, 490); ctx.lineTo(x1, 512); ctx.lineTo(x2, 512); ctx.lineTo(x2, 490); ctx.stroke(); ctx.restore();
      naam(ctx, 'gezond', (x1 + x2) / 2, 570, a, 'center', C.groen, 34); regel(ctx, '¼ + ½ = ¾', (x1 + x2) / 2, 690, a, C.text, 56, 'center', 700); }
    if (s2 > 0.01) { [[1, 1], [0, 0], [1, 0], [0, 0]].forEach(([m, z], k) => { const x = 210 + k * 200, e = s2 * S.on(2, 0.4, k * 0.25); stamPersoon(ctx, x, 890, 40, { m: !!m, ziek: !!z, a: e }); regel(ctx, 'kans ¼', x, 980, e, C.text2, 30, 'center', 600); if (k) pijl(ctx, x - 150, 890, x - 50, 890, C.text2, 3, e, 12); });
      balk(ctx, 'toeval heeft geen geheugen', 1400, 910, 760, s2 * S.on(2, 0.5, 1.0), C.goud, 42); }
  } });

/* =====================================================================================
   14 · Sara krijgt later een kind
   ===================================================================================== */
SCHERMEN.push({ titel: 'Sara krijgt een kind', kop: 'Sara krijgt later een kind', deel: 'Kansen',
  stappen: [
    { t: 'Stel: Sara krijgt later een kind met een partner die <b>drager</b> is (Aa). We rekenen de kans op een kind met albinisme uit.', n: 'Vraag uit film 6: De vrouw is gezond (kans ⅔ dat ze drager is), haar partner heeft zich laten testen en is drager. Hoe groot is de kans dat hun kind taaislijmziekte krijgt? (een zesde; zelfde getallen)' },
    { t: 'Daarvoor moet Sara eerst <b>drager</b> zijn: kans ⅔. Is ze dat niet, dan wordt het kind niet ziek.', n: 'Die ⅔ komt van scherm 13.' },
    { t: 'Dan moet Sara een <b>a</b> doorgeven: kans ½.' },
    { t: 'En de partner ook een <b>a</b>: kans ½. Alles moet gebeuren, dus vermenigvuldig: ⅔ × ½ × ½ = <b>⅙</b>.', n: 'Productregel. Veelgemaakte fout: ½ × ½ = ¼ vergeten te vermenigvuldigen met de kans dat Sara drager is.' },
    { t: 'Met een <b>dragerschapstest</b> weet Sara het zeker. Dan wordt de kans <b>¼</b> of <b>0</b>.', n: 'Met zulke berekeningen werkt een klinisch geneticus (film 6; de oude film zei erfelijkheidsadviseur). In Nederland vraag je zo\'n test via de huisarts aan bij een afdeling klinische genetica; bij albinisme of taaislijmziekte in de familie wordt hij vergoed (briefing). Denkvoorbeeld: in de familie ligt vast dat Sara AA is (LEVENSLOOP), dus de kans is 0; dat weet zij pas na de test.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.0), s1 = S.on(1, 1.0), s2 = S.on(2, 0.8), s3 = S.on(3, 1.2), s4 = S.on(4, 1.2), r = 48;
    const dim = 1 - 0.5 * s4;
    laag(ctx, dim, (c) => {
      pers(c, 'sara', 175, 660, 440, { t: T, uit: 'neutraal', a: s0 });
      stamPaar(c, 380, 630, 360, r, s0); stamPersoon(c, 380, 360, r, { a: s0, label: 'Sara', labelZij: 'onder', labelPx: 32 }); allelChip(c, 'A_', 380, 360 - r - 40, s0, { px: 32 });
      stamPersoon(c, 630, 360, r, { m: true, drager: true, a: s0, label: 'partner', labelZij: 'onder', labelPx: 32 }); allelChip(c, 'Aa', 630, 360 - r - 40, s0, { px: 32, kl: C.goud });
      stamKinderen(c, 505, 360, [505], 590, r, s0); L3_ruit(c, 505, 590, 42, s0);
      if (s1 > 0.01) { circ(c, 800, 440, 11, rgba(C.text2, s1)); pijl(c, 812, 430, 1000, 320, C.text2, 4, s1, 16); pijl(c, 812, 450, 1000, 570, C.text2, 4, s1, 16);
        regel(c, 'drager ⅔', 1090, 334, s1, C.goud, 40, 'center', 700); regel(c, 'geen drager ⅓', 1120, 584, s1, C.text2, 36, 'center', 600);
        regel(c, '→ kind niet ziek', 1270, 584, s1 * S.on(1, 0.5, 0.5), C.text2, 32, 'left', 500); }
      if (s2 > 0.01) { pijl(c, 1180, 322, 1250, 322, C.text2, 4, s2, 16); regel(c, 'geeft a ½', 1350, 334, s2, C.text, 38, 'center', 700); }
      if (s3 > 0.01) { pijl(c, 1450, 322, 1510, 322, C.text2, 4, s3, 16); regel(c, 'partner a ½', 1640, 334, s3, C.text, 38, 'center', 700);
        regel(c, '⅔ × ½ × ½ =', 1330, 470, s3 * S.on(3, 0.5, 0.6), C.text, 52, 'center', 700); breuk(c, 1, 6, 1620, 456, 62, s3 * S.on(3, 0.5, 0.9), C.koraal); }
    });
    if (s4 > 0.01) { metaText(ctx, 'dragerschapstest', 960, 690, C.meta, 'center', 24, s4);
      [['wel drager (Aa)', '¼', 560], ['geen drager (AA)', '0', 1360]].forEach(([t, k, x], i) => { const a = s4 * S.on(4, 0.5, 0.3 + i * 0.3); paneel(ctx, x - 340, 720, 680, 270, a);
        regel(ctx, t, x, 790, a, C.text, 38, 'center', 700); regel(ctx, 'kans op een kind met albinisme', x, 840, a, C.text2, 30, 'center', 500); regel(ctx, k, x, 950, a, i ? C.groen : C.koraal, 80, 'center', 700); }); }
  } });

/* =====================================================================================
   15 · Samenvatting
   ===================================================================================== */
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Een stamboom in vier stappen', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Stap 1</b>: dominant of recessief? Gezonde ouders met een kind met de eigenschap: recessief.', n: 'Terug naar De Wit (scherm 9–12).' },
    { t: '<b>Stap 2</b>: autosomaal of via het X-chromosoom? Aangedane dochter met een gezonde vader: autosomaal.' },
    { t: '<b>Stap 3</b>: genotypen invullen, van aangedaan (aa) terug naar gezond (Aa of A_).' },
    { t: '<b>Stap 4</b>: de kans. Vermenigvuldig wat allemaal moet gebeuren, tel op wat elkaar uitsluit, haal weg wat je al weet.', n: 'De drie regels, zoals de recap van film 6: productregel (⅔ × ½ × ½), somregel (¼ + ½), haal weg wat je weet (aa valt weg → ⅔).' },
    { t: '<b>Twee genen</b>: los van elkaar 9 : 3 : 3 : 1; gekoppeld vooral de oude combinaties, crossing-over maakt recombinanten.', th: '<b>Twee genen</b>: op verschillende chromosomen vier soorten gameten, elk ¼; gekoppelde genen gaan meestal samen mee.', n: 'Zoals de recap van film 4. Recombinatiepercentage en genkaart zitten niet in film en les.' }
  ],
  teken(ctx, S) {
    const s = [0, 1, 2, 3, 4].map(k => S.on(k, 0.8));
    paneel(ctx, 90, 180, 1060, 820, s[0]); metaText(ctx, 'stamboom', 620, 232, C.meta, 'center', 24, s[0]);
    [['dominant of recessief?', 'gezond × gezond → kind met eigenschap: recessief'], ['autosomaal of X?', 'aangedane dochter, gezonde vader: autosomaal'], ['genotypen invullen', 'van aangedaan (aa) terug naar gezond (Aa, A_)'], ['de kans', '× wat allemaal moet · + wat elkaar uitsluit · weg wat je weet']].forEach(([kop, sub], k) => {
      const a = s[k], y = 320 + k * 180; if (a <= 0.01) return; circ(ctx, 180, y, 40, rgba(C.goud, a * 0.25), rgba(C.goud, a), 3); regel(ctx, String(k + 1), 180, y + 15, a, C.goud, 44, 'center', 700);
      regel(ctx, kop, 250, y - 4, a, C.text, 42, 'left', 700); regel(ctx, sub, 250, y + 46, a, C.text2, 30, 'left', 500); });
    const a = s[4]; paneel(ctx, 1190, 180, 640, 820, a); metaText(ctx, 'twee genen', 1510, 232, C.meta, 'center', 24, a);
    if (a > 0.01) { L3_FEN.forEach(([g, rd], k) => erwt(ctx, 1330 + k * 120, 320, 36, { geel: g, rimpel: !rd, a }));
      if (S.vwo) { regel(ctx, 'los: 9 : 3 : 3 : 1', 1510, 430, a, C.goud, 46, 'center', 700); regel(ctx, 'terugkruising: 1 : 1 : 1 : 1', 1510, 490, a, C.text2, 32, 'center', 600); }
      else { regel(ctx, 'los: 4 soorten gameten', 1510, 430, a, C.goud, 44, 'center', 700); regel(ctx, 'elk ¼', 1510, 490, a, C.text2, 32, 'center', 600); }
      vlieg(ctx, 1400, 610, 1.1, { a }); vlieg(ctx, 1620, 610, 1.1, { a, zwart: true, stomp: true });
      regel(ctx, 'gekoppeld: oude combinaties', 1510, 760, a, C.text, 36, 'center', 700);
      if (S.vwo) regel(ctx, 'crossing-over → recombinanten', 1510, 820, a, C.text2, 32, 'center', 600); }
  } });

/* =====================================================================================
   16 · Volgende keer
   ===================================================================================== */
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Dit was de laatste erfelijkheidsles. Volgende keer: alles <b>herhalen</b> en <b>oefenen</b> voor de toets.', n: 'Havo: daarna de toets van H3 (Biologie voor jou). Vwo: de toets van H5 (Nectar); § 5.5 (ethiek) doen de leerlingen zelf. Oefenen: de Kruisingtrainer (tools/kruisingtrainer.html, snel oefenen en opgaven met context) en de opdrachten onder de films. Daarna Evolutie: waar komen al die allelen vandaan? Huiswerk staat bij de lesopbouw.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Herhalen en de toets', [['Herhalen', 'les 1–3 in één schema', L3_icoonSchema], ['Oefenen', 'Kruisingtrainer + opdrachten', L3_icoonOefen], ['De toets', 'havo H3 · vwo H5', L3_icoonToets], ['Daarna: Evolutie', 'waar komen al die allelen vandaan?', L3_icoonEvolutie]]); } });
