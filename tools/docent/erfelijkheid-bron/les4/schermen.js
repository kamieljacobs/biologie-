/* =====================================================================================
   Erfelijkheid · les 4 (extra les) · Begrippen en kruisen oefenen (23 november 2026)
   Eigen hulpen met prefix L4_. Sluit aan op film 1 (Chromosomen) en film 2 (Monohybride kruisingen)
   en op les 1–2. Kern: de basisbegrippen kort herhalen, één voorbeeld voordoen en dan de klas
   zelf kruisingsschema's laten maken (opdracht → klok → stap voor stap de uitwerking).
   ===================================================================================== */
const L4_vulP = () => rgba(BLOEM.paars, C.licht ? 0.28 : 0.32);
const L4_vulW = () => C.licht ? '#EEECE6' : rgba('#F2F2EE', 0.16);
const L4_ZWART = () => C.licht ? '#34343C' : '#5C5C68';
const L4_BRUIN = () => C.licht ? '#8C5B37' : '#B47C50';
const L4_GEEL = () => C.licht ? '#E3B92E' : '#F0CB4A';
const L4_GROEN = () => C.licht ? '#6FA84A' : '#8CC66A';
const L4_VLIEG = () => C.licht ? '#A88A5C' : '#B8996A';

function L4_chip(ctx, s, x, y, a, o = {}) { allelChip(ctx, s, x, y, a, Object.assign({ px: 40 }, o)); }
function L4_maal(ctx, x, y, a, px = 52) { regel(ctx, '×', x, y, a, C.text2, px, 'center', 700); }

/* ---------- fenotypen: kleur, groot figuur, klein icoon in een vakje ---------- */
const L4_FEN = {
  paars: { kl: () => BLOEM.paars, naam: 'paars' }, wit: { kl: () => C.line, naam: 'wit' },
  geel: { kl: L4_GEEL, naam: 'geel' }, groen: { kl: L4_GROEN, naam: 'groen' },
  zwart: { kl: L4_ZWART, naam: 'zwart' }, bruin: { kl: L4_BRUIN, naam: 'bruin' },
  normaal: { kl: () => C.teal, naam: 'normale vleugels' }, stomp: { kl: () => C.koraal, naam: 'stompe vleugels' }
};
// peul met erwten (zaadkleur); geel = true/false
function L4_peul(ctx, x, y, s, geel, a = 1) { if (a <= 0.01) return; const bl = C.licht ? '#5C9A5E' : '#7FC48F'; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 150 * s, 52 * s, -0.12, 0, 6.283); shape(ctx, rgba(bl, 0.55), dk(bl, 0.3), 3);
  ctx.strokeStyle = dk(bl, 0.3); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 150 * s, y + 6 * s); ctx.quadraticCurveTo(x - 185 * s, y - 10 * s, x - 175 * s, y - 40 * s); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 4; i++) erwt(ctx, x - 96 * s + i * 64 * s, y - 6 * s + i * 4 * s - 7 * s, 28 * s, { a, geel }); }
// groot figuur voor de ouders (x = midden, y = onderkant)
function L4_figuur(ctx, fen, x, y, a, T, kijk = 1, schaal = 1) { if (a <= 0.01) return;
  if (fen === 'paars' || fen === 'wit') erwtPlant(ctx, x, y, 300 * schaal, fen === 'paars' ? BLOEM.paars : BLOEM.wit, { a, t: T });
  else if (fen === 'geel' || fen === 'groen') L4_peul(ctx, x, y - 80 * schaal, 1.05 * schaal, fen === 'geel', a);
  else if (fen === 'zwart' || fen === 'bruin') muis(ctx, x + 10 * kijk, y - 60 * schaal + Math.sin(T * 2 + x) * 2, 1.25 * schaal, L4_FEN[fen].kl(), { a, kijk });
  else if (fen === 'normaal' || fen === 'stomp') vlieg(ctx, x, y - 150 * schaal, 1.8 * schaal, { a, stomp: fen === 'stomp', rot: Math.sin(T * 0.9 + x) * 0.03 }); }
// klein icoon in een vakje van het schema
function L4_icoon(ctx, fen, x, y, a, T = 0) { if (a <= 0.01) return;
  if (fen === 'paars' || fen === 'wit') vlinderbloem(ctx, x, y, 24, fen === 'paars' ? BLOEM.paars : BLOEM.wit, 0);
  else if (fen === 'geel' || fen === 'groen') erwt(ctx, x, y, 21, { a, geel: fen === 'geel' });
  else if (fen === 'zwart' || fen === 'bruin') muis(ctx, x + 8, y + 2, 0.36, L4_FEN[fen].kl(), { a });
  else vlieg(ctx, x, y - 10, 0.52, { a, stomp: fen === 'stomp' }); }
function L4_icoonA(ctx, fen, x, y, a) { ctx.save(); ctx.globalAlpha *= a; L4_icoon(ctx, fen, x, y, 1); ctx.restore(); }

/* ---------- klok voor de werktijd: loopt alleen zolang je op stap 0 van het scherm staat ---------- */
function L4_klok(ctx, x, y, r, S, sec) { if (S.b !== 0) return; const el = Math.max(0, S.T - (S.start(0) || 0)), f = clamp(el / sec, 0, 1), rest = Math.max(0, Math.ceil(sec - el));
  circ(ctx, x, y, r, rgba(C.bg, 0.9), rgba(C.line, 0.5), 3);
  ctx.save(); ctx.strokeStyle = f >= 1 ? C.goud : C.teal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r - 10, -Math.PI / 2, -Math.PI / 2 + 6.283 * Math.max(0.001, 1 - f)); ctx.stroke(); ctx.restore();
  if (f >= 1) gloed(ctx, x, y, r * 1.5, C.goud, 0.5 + 0.3 * Math.sin(S.T * 3));
  regel(ctx, f >= 1 ? 'tijd' : `${Math.floor(rest / 60)}:${String(rest % 60).padStart(2, '0')}`, x, y + 10, 1, C.text, 30, 'center', 700); }

/* ---------- leeg schema als steiger (gestippeld, met ?) ---------- */
function L4_leegSchema(ctx, x, y, v, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3;
  roundRect(ctx, x, y, 2 * v, 2 * v, 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + v, y); ctx.lineTo(x + v, y + 2 * v); ctx.moveTo(x, y + v); ctx.lineTo(x + 2 * v, y + v); ctx.stroke();
  [[x + v / 2, y - v / 2], [x + 1.5 * v, y - v / 2], [x - v / 2, y + v / 2], [x - v / 2, y + 1.5 * v]].forEach(([cx, cy]) => { ctx.beginPath(); ctx.arc(cx, cy, v * 0.3, 0, 6.283); ctx.stroke(); });
  ctx.restore(); [[x + v / 2, y - v / 2], [x + 1.5 * v, y - v / 2], [x - v / 2, y + v / 2], [x - v / 2, y + 1.5 * v]].forEach(([cx, cy]) => regel(ctx, '?', cx, cy + 14, a * 0.8, C.text2, 40, 'center', 700)); }

/* ---------- opdrachtscherm: links de opdracht, rechts de uitwerking in vier stappen ----------
   o = { titel, kop, label ('Opdracht 1'), min (werktijd in minuten; leeg = geen klok), kort: [regels op het beeld],
         legenda: [[allel, betekenis], …], ouders: [{fen, g, vraag?}, {fen, g, vraag?}] (ouder 0 → links in het schema, ouder 1 → boven),
         jong: {fen, g} (alleen bij terugredeneren), links, boven (gameten), fenVan(g) → fen,
         geno: [[aantal, genotype], …], feno: [[aantal, fen], …], antw: [regel 1, regel 2], t: [6 teksten], n: [6 notities], stappenplan: true }
*/
const L4_SX = 1140, L4_SY = 480, L4_V = 150;           // schema linksboven en vakgrootte
function L4_opdracht(o) {
  SCHERMEN.push({ titel: o.titel, kop: o.kop, deel: o.deel || 'Zelf kruisen',
    stappen: o.t.map((t, i) => ({ t, n: o.n[i] || '' })),
    teken(ctx, S) { const T = S.T, s = [0, 1, 2, 3, 4, 5].map(k => S.on(k, k === 3 ? 2.2 : 0.9)), jong = !!o.jong;
      // --- links: de opdracht ---
      metaText(ctx, o.label, 100, 205, C.goud, 'left', 26, s[0]);
      const yF = jong ? 430 : 520, xs = [260, 700];
      o.ouders.forEach((ou, i) => { L4_figuur(ctx, ou.fen, xs[i], yF, s[0], T + i, i ? -1 : 1, jong ? 0.85 : 1);
        naam(ctx, L4_FEN[ou.fen].naam, xs[i], yF + 46, s[0], 'center', C.text, 32);
        if (ou.vraag) L4_chip(ctx, ou.vraag, xs[i], yF + 108, s[0] * (1 - s[1]), { kl: C.goud });
        L4_chip(ctx, ou.g, xs[i], yF + 108, s[1], { kl: C.goud }); });
      L4_maal(ctx, 480, yF - 110, s[0]);
      if (jong) { const jy = 690; ctx.save(); ctx.globalAlpha *= s[0]; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(480, yF - 70); ctx.lineTo(480, jy - 130); ctx.stroke(); ctx.restore();
        L4_figuur(ctx, o.jong.fen, 480, jy, s[0], T + 2, 1, 0.75); naam(ctx, 'jong: ' + L4_FEN[o.jong.fen].naam, 480, jy + 40, s[0], 'center', C.text, 30);
        L4_chip(ctx, o.jong.g, 640, jy - 40, s[1], { kl: C.koraal, px: 36 }); }
      // legenda
      const yL = jong ? 790 : 745; (o.legenda || []).forEach(([al, bet], i) => { const x = 110 + i * 420; L4_chip(ctx, al, x + 30, yL, s[0], { px: 32 }); regel(ctx, bet, x + 80, yL + 11, s[0], C.text2, 30, 'left', 500); });
      // opdrachtkaart (of het stappenplan bij het voorbeeld)
      const yK = jong ? 830 : 800, hK = jong ? 170 : 190;
      if (o.stappenplan) { const nm = ['genotypen ouders', 'gameten', 'kruisingsschema', 'verhoudingen']; paneel(ctx, 80, yK, 860, hK, s[0], rgba(C.goud, 0.5));
        nm.forEach((t, i) => { const x = 110 + (i % 2) * 420, y = yK + 70 + Math.floor(i / 2) * 74, actief = S.b === i + 1 || (i === 3 && S.b >= 4), klaar = S.b > i + 1 && !(i === 3);
          circ(ctx, x + 22, y - 10, 22, actief ? rgba(C.goud, 0.35) : rgba(C.fill, 0.6), actief || klaar ? C.goud : rgba(C.line, 0.6), 2.5); regel(ctx, String(i + 1), x + 22, y + 1, s[0], actief || klaar ? C.goud : C.text2, 28, 'center', 700);
          regel(ctx, t, x + 58, y, s[0], actief ? C.text : C.text2, 30, 'left', actief ? 700 : 500); }); }
      else if (o.kort) { paneel(ctx, 80, yK, 860, hK, s[0], rgba(C.goud, 0.5)); o.kort.forEach((r, i) => regel(ctx, r, 112, yK + (jong ? 54 : 64) + i * 48, s[0], C.text, 33, 'left', 600));
        if (o.min) L4_klok(ctx, 868, yK + hK / 2, 54, S, o.min * 60); }
      // --- rechts: de uitwerking ---
      const v = L4_V, x0 = L4_SX, y0 = L4_SY, pxL = 1050, pxR = 1330, py = 232;
      L4_leegSchema(ctx, x0, y0, v, s[0] * (1 - s[2]) * 0.8);
      metaText(ctx, o.pLabel || 'ouders', (pxL + pxR) / 2, 178, C.meta, 'center', 22, s[1]);
      L4_chip(ctx, o.ouders[0].g, pxL, py, s[1], { px: 42 }); L4_maal(ctx, (pxL + pxR) / 2, py + 16, s[1], 48); L4_chip(ctx, o.ouders[1].g, pxR, py, s[1], { px: 42 });
      pijl(ctx, pxL, py + 38, x0 - v * 0.5 + 6, y0 + 20, rgba(C.line, 0.9), 3, s[2]);
      pijl(ctx, pxR, py + 38, x0 + v * 1.25, y0 - v * 0.82, rgba(C.line, 0.9), 3, s[2]);
      kruisSchema(ctx, x0, y0, { links: o.links, boven: o.boven, vak: v, prog: s[3], a: s[2], klLinks: C.oker, klBoven: C.teal, px: 40,
        cel: (i, j, g) => { const fen = o.fenVan(g); return { vul: rgba(L4_FEN[fen].kl(), C.licht ? 0.2 : 0.22), teken: (c, cx, cy, aa) => { L4_icoonA(c, fen, cx, cy - 26, aa); regel(c, g, cx, cy + 50, aa, C.text, 38, 'center', 700); } }; } });
      // resultaat
      const rx = 1660; metaText(ctx, 'genotypen', rx, 470, C.meta, 'center', 22, s[4]);
      o.geno.forEach(([n, g], i) => regel(ctx, `${n} ${g}`, rx, 520 + i * 48, S.on(4, 0.5, i * 0.15), C.text, 40, 'center', 700));
      const yb = 520 + o.geno.length * 48 + 26; metaText(ctx, 'fenotypen', rx, yb, C.meta, 'center', 22, s[4]);
      verhouding(ctx, 1500, yb + 24, 320, 64, o.feno.map(([n, fen]) => ({ n, kl: L4_FEN[fen].kl(), in: o.feno.length > 1 ? String(n) : 'alle', label: L4_FEN[fen].naam.replace(' vleugels', '') })), S.on(4, 0.6, 0.4), { px: 26 });
      if (s[5] > 0.01) { const ya = 900; ctx.save(); ctx.globalAlpha *= s[5]; roundRect(ctx, 1110, ya - 52, 730, o.antw.length > 1 ? 150 : 104, 18); shape(ctx, rgba(C.goud, 0.12), C.goud, 3); ctx.restore();
        o.antw.forEach((r, i) => regel(ctx, r, 1475, ya + 12 + i * 50, s[5], i ? C.text2 : C.text, i ? 32 : 38, 'center', i ? 600 : 700)); }
    } });
}

/* ================================== 0 · start ================================== */
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Erfelijkheid</b> · extra les: begrippen en kruisen oefenen', n: 'Kies eerst havo of vwo (deze les is voor beide hetzelfde). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Leerlingen hebben een schrift en pen nodig: bij elke opdracht maken ze eerst zelf het kruisingsschema, daarna laat je de uitwerking stap voor stap zien.' }],
  teken(ctx, S) { const T = S.T;
    metaText(ctx, 'Erfelijkheid · extra les', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Begrippen', 140, 470, fTitel(112), C.text); text(ctx, 'en kruisen', 140, 600, fTitel(112), C.goud);
    regel(ctx, 'dominant · recessief · homozygoot · heterozygoot', 144, 690, 1, C.text2, 32, 'left', 400);
    regel(ctx, 'zelf kruisingsschema\'s maken', 144, 740, 1, C.text2, 32, 'left', 400);
    // klein bewegend schema rechts: de vakjes vullen zich steeds opnieuw
    const f = (T * 0.25) % 1.4, prog = clamp(f / 0.9, 0, 1);
    kruisSchema(ctx, 1350, 470, { links: ['A', 'a'], boven: ['A', 'a'], vak: 190, prog, a: 1, klLinks: C.oker, klBoven: C.teal, px: 64,
      cel: (i, j, g) => g === 'aa' ? { vul: L4_vulW(), rand: rgba(C.line, 0.6) } : { vul: L4_vulP() } });
  } });

/* ================================== 1 · gen en allel ================================== */
SCHERMEN.push({ titel: 'Gen en allel', kop: 'Gen en allel', deel: 'De begrippen',
  stappen: [
    { t: 'Chromosomen zitten in <b>paren</b>: één van je vader, één van je moeder.', n: 'Herhaling van film 1 en les 1. Mens: 23 paren. De twee chromosomen van een paar heten homologe chromosomen: zelfde genen op dezelfde plek, maar niet per se dezelfde allelen.' },
    { t: 'Een <b>gen</b> is een stukje DNA met de informatie voor één eigenschap, hier de bloemkleur van de erwt.', n: 'De plek van een gen op het chromosoom heet de locus (vwo-woord; staat ook in BvJ havo). Je hebt van elk gen twee exemplaren: één op elk chromosoom van het paar.' },
    { t: 'Een <b>allel</b> is een variant van dat gen: <b>A</b> geeft paarse bloemen, <b>a</b> witte.', n: 'Misvatting: "een allel is een eigenschap". Nee: een allel is een versie van het DNA; de eigenschap (het fenotype) is wat je ziet. Notatie: hoofdletter = dominant allel, kleine letter = recessief allel (scherm 4).' },
    { t: 'Elke cel heeft per gen dus <b>twee allelen</b>: hier A van de vader en a van de moeder.', n: 'Zelfde kleuren als in de reeks: van de vader teal, van de moeder oker, het gen goud. In een eicel of zaadcel zit maar één allel per gen (scherm 6).' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2), s3 = S.on(3);
    const x = 520, y = 520, len = 520;
    paar(ctx, x, y, len, { a: s0 * (1 - s1), dubbel: 0, dx: 120 });
    paar(ctx, x, y, len, { a: s1, dubbel: 0, dx: 120, allelen: ['A', 'a'], letterA: s2, p: 0.62 });
    naam(ctx, 'van vader', x - 120, 200, s0, 'center', CH.vader, 30); naam(ctx, 'van moeder', x + 120, 200, s0, 'center', CH.moeder, 30);
    naam(ctx, 'chromosomenpaar', x, 930, s0, 'center', C.text2, 30);
    if (s1 > 0.01) gloed(ctx, x, y - len * 0.38 + 0.62 * len, 120, C.goud, s1 * (1 - s2) * (0.6 + 0.3 * Math.sin(T * 3)));
    termKaart(ctx, 'gen', 'stukje DNA voor één eigenschap', 1350, 250, s1, C.goud);
    termKaart(ctx, 'allel', 'een variant van een gen', 1350, 430, s2, C.goud);
    // twee allelen → twee kleuren
    [['A', BLOEM.paars, 'paars', 1180], ['a', BLOEM.wit, 'wit', 1520]].forEach(([al, kl, nm, xx], i) => { const a = S.on(2, 0.6, 0.3 + i * 0.2);
      L4_chip(ctx, al, xx, 660, a, { px: 44 }); pijl(ctx, xx, 705, xx, 760, C.text2, 4, a); ctx.save(); ctx.globalAlpha *= a; vlinderbloem(ctx, xx, 810, 40, kl, 0); ctx.restore(); naam(ctx, nm, xx, 900, a, 'center', C.text, 30); });
    if (s3 > 0.01) { gloed(ctx, x - 120, y - len * 0.38 + 0.62 * len, 70, CH.vader, s3 * 0.8); gloed(ctx, x + 120, y - len * 0.38 + 0.62 * len, 70, CH.moeder, s3 * 0.8);
      regel(ctx, 'genotype: Aa', x, 990, s3, C.goud, 40, 'center', 700); }
  } });

/* ================================== 2 · genotype en fenotype ================================== */
SCHERMEN.push({ titel: 'Genotype en fenotype', kop: 'Genotype en fenotype', deel: 'De begrippen',
  stappen: [
    { t: 'Het <b>genotype</b> zegt welke twee allelen je hebt: AA, Aa of aa.', n: 'Genotype = de combinatie van allelen voor één gen (of meer genen). Schrijf het altijd met twee letters; de hoofdletter eerst (Aa, niet aA).' },
    { t: 'Het <b>fenotype</b> is wat je ervan ziet: paarse of witte bloemen.', n: 'Fenotype = de waarneembare eigenschap. Dat kan ook iets zijn dat je meet of in het bloed bepaalt (bloedgroep). In les 1 kwam erbij: fenotype = genotype + milieu.' },
    { t: 'AA en Aa: <b>zelfde fenotype</b>, ander genotype. Aan de buitenkant zie je het verschil niet.', n: 'Dit is de kern van veel kruisingsvragen: een plant met het dominante fenotype kan AA of Aa zijn. Je schrijft dan A? (scherm 15 en de terugkruising in les 2). Een plant met het recessieve fenotype is altijd aa.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2);
    const kol = [['AA', 'paars', 420], ['Aa', 'paars', 960], ['aa', 'wit', 1500]];
    metaText(ctx, 'genotype', 100, 625, C.meta, 'left', 22, s0); metaText(ctx, 'fenotype', 100, 940, C.meta, 'left', 22, s1);
    kol.forEach(([g, fen, x], i) => { const a0 = S.on(0, 0.6, i * 0.15), a1 = S.on(1, 0.7, i * 0.15);
      paar(ctx, x, 390, 260, { a: a0, dubbel: 0, dx: 56, allelen: [g[0], g[1]], p: 0.62 });
      L4_chip(ctx, g, x, 618, a0, { px: 44 });
      if (s2 > 0.01 && fen === 'paars') gloed(ctx, x, 830, 190, C.goud, s2 * (0.55 + 0.2 * Math.sin(T * 2.5)));
      erwtPlant(ctx, x, 990, 300, fen === 'paars' ? BLOEM.paars : BLOEM.wit, { a: a1, t: T + i });
      naam(ctx, fen, x + 120, 920, a1, 'left', C.text, 32); });
    regel(ctx, 'AA en Aa: zelfde fenotype, ander genotype', 690, 220, s2, C.goud, 38, 'center', 700);
  } });

/* ================================== 3 · dominant en recessief ================================== */
SCHERMEN.push({ titel: 'Dominant en recessief', kop: 'Dominant en recessief', deel: 'De begrippen',
  stappen: [
    { t: 'Bij <b>Aa</b> zie je alleen het effect van A: paars. A is <b>dominant</b>.', n: 'Dominant = het allel komt tot uiting als het er één keer is. Bij de erwt maakt allel A een werkend enzym voor de paarse kleurstof; één werkend allel maakt genoeg (film 2). Het recessieve allel is er nog wel, het wordt doorgegeven.' },
    { t: 'Het effect van a zie je alleen bij <b>aa</b>: wit. a is <b>recessief</b>.', n: 'Recessief = alleen zichtbaar als er geen dominant allel is, dus bij twee recessieve allelen. Daarom geldt: wie het recessieve fenotype heeft, kent zijn genotype al (aa).' },
    { t: 'Afspraak: <b>hoofdletter</b> = dominant allel, <b>kleine letter</b> = recessief allel. Dezelfde letter voor hetzelfde gen.', n: 'Misvatting: "dominant komt het meest voor". Nee: dominant zegt alleen iets over wat je ziet bij Aa. Er zijn zeldzame dominante aandoeningen (achondroplasie, de ziekte van Huntington) en heel gewone recessieve eigenschappen. Kies letters die je niet kunt verwarren (niet S/s of C/c in een handschrift); een vraag geeft vaak zelf de letters.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2);
    [[120, 'Aa', BLOEM.paars, 'paars', 'dominant', 'één allel is genoeg', 0, 0], [1000, 'aa', BLOEM.wit, 'wit', 'recessief', 'alleen te zien bij aa', 1, -1]].forEach(([px, g, kl, nm, term, uit, k, acc]) => { const a = S.on(k);
      paneel(ctx, px, 190, 800, 650, a); allelChip(ctx, g, px + 230, 300, a, { px: 70, acc: acc >= 0 ? acc : null });
      erwtPlant(ctx, px + 230, 800, 400, kl, { a, t: T + px });
      termKaart(ctx, term, uit, px + 560, 400, S.on(k, 0.6, 0.4), C.goud);
      ctx.save(); ctx.globalAlpha *= a; vlinderbloem(ctx, px + 560, 640, 34, kl, 0); ctx.restore(); regel(ctx, nm, px + 560, 720, a, C.text, 40, 'center', 700); });
    balk(ctx, 'hoofdletter = dominant  ·  kleine letter = recessief', 960, 950, 1300, s2, C.goud, 38);
  } });

/* ================================== 4 · homozygoot en heterozygoot ================================== */
SCHERMEN.push({ titel: 'Homo- en heterozygoot', kop: 'Homozygoot en heterozygoot', deel: 'De begrippen',
  stappen: [
    { t: '<b>Homozygoot</b>: twee dezelfde allelen, AA of aa.', n: 'Homo = gelijk. Een homozygoot individu maakt maar één soort gameet (alleen A of alleen a). Een ander woord in oudere boeken: raszuiver (Mendel begon met raszuivere planten).' },
    { t: '<b>Heterozygoot</b>: twee verschillende allelen, Aa.', n: 'Hetero = verschillend. Een heterozygoot individu maakt twee soorten gameten, A en a, elk in de helft van de gameten.' },
    { t: 'Precies: AA is <b>homozygoot dominant</b>, aa is <b>homozygoot recessief</b>.', n: 'Die twee woorden komen vaak in examenvragen ("een homozygoot recessieve plant"). Let op: "heterozygoot dominant" bestaat niet; Aa heeft wel het dominante fenotype.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2);
    [['AA', 360, s0], ['aa', 820, s0], ['Aa', 1460, s1]].forEach(([g, x, a], i) => {
      paar(ctx, x, 430, 340, { a, dubbel: 0, dx: 70, allelen: [g[0], g[1]], p: 0.62 }); L4_chip(ctx, g, x, 690, a, { px: 46 }); });
    // haak boven homozygoot
    ctx.save(); ctx.globalAlpha *= s0; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(250, 760); ctx.lineTo(250, 780); ctx.lineTo(930, 780); ctx.lineTo(930, 760); ctx.stroke(); ctx.restore();
    termKaart(ctx, 'homozygoot', 'twee dezelfde allelen', 590, 800, s0, C.goud);
    termKaart(ctx, 'heterozygoot', 'twee verschillende allelen', 1460, 800, s1, C.teal);
    regel(ctx, 'homozygoot dominant', 360, 250, s2, C.goud, 32, 'center', 700); regel(ctx, 'homozygoot recessief', 820, 250, s2, C.goud, 32, 'center', 700);
  } });

/* ================================== 5 · begrippen toepassen ================================== */
SCHERMEN.push({ titel: 'Begrippen toepassen', kop: 'Begrippen toepassen: de muis', deel: 'De begrippen',
  stappen: [
    { t: 'Bij muizen is zwarte vacht (<b>Z</b>) dominant over bruine (<b>z</b>). Drie genotypen.', n: 'Nieuw voorbeeld om de begrippen toe te passen. Laat de klas per rij hardop of op een wisbordje zeggen: homozygoot of heterozygoot? En welk fenotype? Klik pas daarna. (Echt: het allel voor bruin, Tyrp1ᵇ, is recessief ten opzichte van zwart; zie de briefing.)' },
    { t: 'Kolom 2: <b>homozygoot</b> of <b>heterozygoot</b>.', n: 'ZZ en zz homozygoot, Zz heterozygoot.' },
    { t: 'Kolom 3: het <b>fenotype</b>. Zz is zwart, want Z is dominant.', n: 'Zelfde fenotype bij ZZ en Zz.' },
    { t: 'Andersom: een bruine muis is altijd <b>zz</b>. Een zwarte kan <b>ZZ</b> of <b>Zz</b> zijn.', n: 'Notatie voor "weet ik niet": Z?. Dit heb je nodig bij opdracht 5 (terugredeneren) en de uitdaging.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2), s3 = S.on(3);
    const X = [240, 640, 1180, 1680], Y0 = 250, rh = 140, rijen = [['ZZ', 'homozygoot', 'zwart'], ['Zz', 'heterozygoot', 'zwart'], ['zz', 'homozygoot', 'bruin']];
    ctx.save(); ctx.globalAlpha *= s0; roundRect(ctx, X[0], Y0, X[3] - X[0], 80 + rh * 3, 16); shape(ctx, rgba(C.fill, C.licht ? 0.4 : 0.35), rgba(C.line, 0.6), 2);
    ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; [X[1], X[2]].forEach(x => { ctx.beginPath(); ctx.moveTo(x, Y0); ctx.lineTo(x, Y0 + 80 + rh * 3); ctx.stroke(); }); [0, 1, 2].forEach(r => { ctx.beginPath(); ctx.moveTo(X[0], Y0 + 80 + r * rh); ctx.lineTo(X[3], Y0 + 80 + r * rh); ctx.stroke(); }); ctx.restore();
    [['genotype', s0], ['homo- of heterozygoot', s1], ['fenotype', s2]].forEach(([k, a], i) => metaText(ctx, k, (X[i] + X[i + 1]) / 2, Y0 + 52, C.meta, 'center', 22, s0));
    rijen.forEach(([g, h, f], r) => { const cy = Y0 + 80 + r * rh + rh / 2;
      L4_chip(ctx, g, (X[0] + X[1]) / 2, cy, s0, { px: 46 });
      regel(ctx, h, (X[1] + X[2]) / 2, cy + 12, S.on(1, 0.5, r * 0.2), h === 'homozygoot' ? C.goud : C.teal, 38, 'center', 700);
      const a = S.on(2, 0.5, r * 0.2); muis(ctx, X[2] + 150, cy + 10, 0.62, L4_FEN[f].kl(), { a }); regel(ctx, f, X[2] + 330, cy + 12, a, C.text, 38, 'left', 700); });
    // terug: van fenotype naar genotype
    const yt = 830; [['bruin', 'zz', 'zeker', 520], ['zwart', 'ZZ of Zz', 'Z?', 1300]].forEach(([f, g, z, x], i) => { const a = S.on(3, 0.6, i * 0.25);
      muis(ctx, x - 200, yt + 40, 0.6, L4_FEN[f].kl(), { a }); pijl(ctx, x - 90, yt + 40, x - 20, yt + 40, C.text2, 4, a); L4_chip(ctx, g, x + 150, yt + 40, a, { px: 42, kl: C.goud }); regel(ctx, z, x + 150, yt + 128, a, C.text2, 30, 'center', 600); });
  } });

/* ================================== 6 · van P naar F1 ================================== */
SCHERMEN.push({ titel: 'P, gameten, F1', kop: 'P, gameten en F1', deel: 'Het kruisingsschema',
  stappen: [
    { t: '<b>P</b> = de ouders: een homozygote paarse plant (AA) × een witte (aa).', n: 'P van parentes (ouders). Mendel begon altijd met homozygote (raszuivere) ouders.' },
    { t: 'Elke gameet krijgt <b>één allel</b> per gen. AA maakt alleen gameten met A, aa alleen met a.', n: 'Bij de meiose gaan de twee chromosomen van een paar uit elkaar (les 1 en film 2). Een homozygote ouder maakt dus maar één soort gameet.' },
    { t: '<b>F1</b> = de eerste generatie nakomelingen: allemaal Aa, allemaal paars.', n: 'F van filius/filia (zoon/dochter). Alle F1-planten hebben hetzelfde genotype. Dit is opdracht 1 straks met erwten, maar dan met zaadkleur.' },
    { t: 'Kruis je de F1 met elkaar (F1 × F1), dan krijg je de <b>F2</b>. Daarvoor heb je het schema nodig.', n: 'Aa × Aa: twee soorten gameten per ouder, dus vier combinaties. Dat zet je in een kruisingsschema (volgend scherm, voorgedaan).' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2), s3 = S.on(3);
    const xa = 430, xb = 830; ctx.save(); ctx.translate(0, 30);
    regel(ctx, 'P', 130, 330, s0, C.goud, 64, 'center', 700); metaText(ctx, 'gameten', 130, 610, C.meta, 'center', 22, s1); regel(ctx, 'F1', 130, 880, s2, C.goud, 64, 'center', 700);
    erwtPlant(ctx, xa, 400, 250, BLOEM.paars, { a: s0, t: T }); erwtPlant(ctx, xb, 400, 250, BLOEM.wit, { a: s0, t: T + 1 }); L4_maal(ctx, (xa + xb) / 2, 320, s0);
    L4_chip(ctx, 'AA', xa, 452, s0, { px: 38 }); L4_chip(ctx, 'aa', xb, 452, s0, { px: 38 });
    pijl(ctx, xa, 490, xa, 545, C.text2, 4, s1); pijl(ctx, xb, 490, xb, 545, C.text2, 4, s1);
    gameet(ctx, xa, 600, 44, 'A', { soort: 'cel', kl: C.oker, a: s1, px: 40 }); gameet(ctx, xb, 600, 44, 'a', { soort: 'cel', kl: C.teal, a: s1, px: 40 });
    pijl(ctx, xa + 40, 650, 600, 720, C.text2, 4, s2); pijl(ctx, xb - 40, 650, 660, 720, C.text2, 4, s2);
    [330, 490, 650, 810].forEach((x, i) => erwtPlant(ctx, x + 40, 960, 210, BLOEM.paars, { a: S.on(2, 0.5, i * 0.12), t: T + i }));
    L4_chip(ctx, 'alle Aa', 1060, 880, s2, { px: 38, kl: C.goud }); ctx.restore();
    termKaart(ctx, 'P', 'de ouders', 1500, 250, s0, C.goud, 560);
    termKaart(ctx, 'gameten', 'één allel per gen', 1500, 420, s1, C.goud, 560);
    termKaart(ctx, 'F1', 'eerste generatie nakomelingen', 1500, 590, s2, C.goud, 560);
    termKaart(ctx, 'F2', 'nakomelingen van F1 × F1', 1500, 760, s3, C.teal, 560);
  } });

/* ================================== 7 · voorgedaan: Aa × Aa ================================== */
L4_opdracht({ titel: 'Voorbeeld', kop: 'Voorgedaan: F1 × F1', deel: 'Het kruisingsschema', label: 'voorbeeld · stappenplan', stappenplan: true, pLabel: 'F1 × F1',
  legenda: [['A', 'paars (dominant)'], ['a', 'wit (recessief)']],
  ouders: [{ fen: 'paars', g: 'Aa', vraag: 'A?' }, { fen: 'paars', g: 'Aa', vraag: 'A?' }], links: ['A', 'a'], boven: ['A', 'a'], fenVan: g => g.includes('A') ? 'paars' : 'wit',
  geno: [[1, 'AA'], [2, 'Aa'], [1, 'aa']], feno: [[3, 'paars'], [1, 'wit']], antw: ['¼ van de F2 is wit', '3 paars : 1 wit'],
  t: ['Voorgedaan: twee planten uit de F1 (<b>Aa × Aa</b>) worden gekruist. Volg de vier stappen mee.',
    'Stap 1: schrijf de <b>genotypen</b> van de ouders op: Aa × Aa.',
    'Stap 2: de <b>gameten</b>. Elke ouder maakt gameten met A en gameten met a. Zet ze boven en links.',
    'Stap 3: vul het <b>schema</b>. Elk vakje is één mogelijke bevruchting.',
    'Stap 4: lees af. Genotypen <b>1 AA : 2 Aa : 1 aa</b>, fenotypen <b>3 paars : 1 wit</b>.',
    'Elk vakje heeft dezelfde kans: <b>¼</b>. De kans op een witte plant is dus ¼.'],
  n: ['Doe dit voor en zeg de stappen hardop; daarna doen de leerlingen het zelf. Laat ze het schema meetekenen in hun schrift.',
    'Altijd eerst de genotypen, ook als ze in de vraag staan. Bij een fenotype zonder genotype: recessief fenotype = aa; dominant fenotype = A? (scherm 5).',
    'Per gen één allel per gameet. Van welke ouder je boven of links zet maakt niet uit (in de reeks: boven stuifmeel/vader teal, links eicel/moeder oker).',
    'Combineer de letter boven met de letter links; schrijf de hoofdletter eerst. Kleur gerust de vakjes met het recessieve fenotype.',
    'Aa staat er twee keer: A van de ene en a van de andere ouder, of andersom. Let in de vraag op wat er gevraagd wordt: genotype of fenotype, verhouding, kans of aantal.',
    'Het schema geeft kansen, geen aantallen: 4 vakjes zijn geen 4 kinderen (film 2, les 2 scherm 6). Bij veel nakomelingen kom je dicht bij 3 : 1 (Mendel: 705 : 224).'] });

/* ================================== 8–12 · opdrachten ================================== */
L4_opdracht({ titel: 'Opdracht 1', kop: 'Opdracht 1: erwten', label: 'opdracht 1 · in je schrift', min: 3,
  kort: ['Kruis een homozygote erwtenplant', 'met gele erwten met een plant', 'met groene erwten.'],
  legenda: [['G', 'geel (dominant)'], ['g', 'groen (recessief)']],
  ouders: [{ fen: 'geel', g: 'GG' }, { fen: 'groen', g: 'gg' }], links: ['G', 'G'], boven: ['g', 'g'], fenVan: g => g.includes('G') ? 'geel' : 'groen',
  geno: [[4, 'Gg']], feno: [[1, 'geel']], antw: ['F1: allemaal Gg', 'allemaal geel'],
  t: ['Opdracht 1: kruis een homozygote plant met <b>gele</b> erwten met een plant met <b>groene</b> erwten. Geef genotype en fenotype van de F1.',
    'Stap 1: geel en homozygoot = <b>GG</b>. Groen is recessief, dus altijd <b>gg</b>.',
    'Stap 2: GG maakt alleen gameten met <b>G</b>, gg alleen met <b>g</b>.',
    'Stap 3: elk vakje wordt <b>Gg</b>.',
    'Stap 4: genotype: allemaal <b>Gg</b>. Fenotype: allemaal <b>geel</b>.',
    'Antwoord: de F1 is <b>heterozygoot</b> (Gg) en heeft <b>gele</b> erwten.'],
  n: ['Werktijd ± 3 minuten (klok rechts in de kaart; R zet hem opnieuw). Loop rond en kijk vooral naar stap 1: schrijven ze voor groen echt gg? Erwtkleur is een eigenschap van het zaad (Mendel: geel dominant over groen).',
    'Veelgemaakte fout: "groen = Gg". Een recessief fenotype heeft altijd twee recessieve allelen.',
    'Een homozygote ouder maakt één soort gameet. Leerlingen mogen ook een schema van 1 × 1 vakje tekenen; met 2 × 2 zie je dat alles hetzelfde is.',
    'Elk vakje heeft een G van de ene en een g van de andere ouder.',
    'Dit is precies Mendels eerste kruising (P → F1): de F1 lijkt op één ouder, de recessieve eigenschap lijkt verdwenen.',
    'Vraag eventueel: waar is het groene allel gebleven? (Het zit in elke F1-plant, maar is niet te zien: zie opdracht 2.)'] });

L4_opdracht({ titel: 'Opdracht 2', kop: 'Opdracht 2: de F2', label: 'opdracht 2 · in je schrift', min: 3, pLabel: 'F1 × F1',
  kort: ['Kruis twee planten uit de F1 (Gg × Gg).', 'Je krijgt 200 erwten.', 'Hoeveel groene erwten verwacht je?'],
  legenda: [['G', 'geel (dominant)'], ['g', 'groen (recessief)']],
  ouders: [{ fen: 'geel', g: 'Gg' }, { fen: 'geel', g: 'Gg' }], links: ['G', 'g'], boven: ['G', 'g'], fenVan: g => g.includes('G') ? 'geel' : 'groen',
  geno: [[1, 'GG'], [2, 'Gg'], [1, 'gg']], feno: [[3, 'geel'], [1, 'groen']], antw: ['¼ × 200 = 50 groene erwten', 'en ± 150 gele'],
  t: ['Opdracht 2: kruis twee planten uit de F1 (<b>Gg × Gg</b>). Je krijgt 200 erwten. Hoeveel <b>groene</b> erwten verwacht je?',
    'Stap 1: de ouders zijn allebei <b>Gg</b>.',
    'Stap 2: elke ouder maakt gameten met <b>G</b> en met <b>g</b>.',
    'Stap 3: vier vakjes: GG, Gg, Gg en gg.',
    'Stap 4: <b>1 GG : 2 Gg : 1 gg</b>, dus <b>3 geel : 1 groen</b>.',
    'Antwoord: groen is ¼ van de erwten: <b>¼ × 200 = 50</b>. Verwacht, want het blijft toeval.'],
  n: ['Werktijd ± 3 minuten. Snelle leerlingen: hoeveel van de 150 gele erwten zijn heterozygoot? (⅔, dus ± 100.)',
    'Hier staan de genotypen in de opdracht; dan hoef je in stap 1 alleen over te schrijven.',
    'Twee soorten gameten per ouder, elk met kans ½.',
    'Gg staat twee keer.',
    'Het groene allel komt in de F2 weer tevoorschijn: het was er de hele tijd. Mendel telde 6022 geel : 2001 groen (3,01 : 1).',
    'Woord "verwacht": in het echt is het bijna nooit precies 50 (vergelijk met 705 : 224 bij de bloemkleur).'] });

L4_opdracht({ titel: 'Opdracht 3', kop: 'Opdracht 3: muizen', label: 'opdracht 3 · in je schrift', min: 3,
  kort: ['Een heterozygote zwarte muis krijgt', 'jongen met een bruine muis.', 'Hoe groot is de kans op een bruin jong?'],
  legenda: [['Z', 'zwart (dominant)'], ['z', 'bruin (recessief)']],
  ouders: [{ fen: 'zwart', g: 'Zz' }, { fen: 'bruin', g: 'zz' }], links: ['Z', 'z'], boven: ['z', 'z'], fenVan: g => g.includes('Z') ? 'zwart' : 'bruin',
  geno: [[2, 'Zz'], [2, 'zz']], feno: [[1, 'zwart'], [1, 'bruin']], antw: ['kans op bruin: ½ = 50 %', '1 zwart : 1 bruin'],
  t: ['Opdracht 3: een <b>heterozygote</b> zwarte muis krijgt jongen met een <b>bruine</b> muis. Hoe groot is de kans dat een jong bruin is?',
    'Stap 1: heterozygoot zwart = <b>Zz</b>, bruin = <b>zz</b>.',
    'Stap 2: Zz maakt gameten met <b>Z</b> en met <b>z</b>; zz alleen met <b>z</b>.',
    'Stap 3: twee vakjes Zz, twee vakjes zz.',
    'Stap 4: <b>1 Zz : 1 zz</b>, dus <b>1 zwart : 1 bruin</b>.',
    'Antwoord: de kans op een bruin jong is <b>½ (50 %)</b>, bij elk jong opnieuw.'],
  n: ['Werktijd ± 3 minuten. Vraag naar een kans: schrijf als breuk of percentage.',
    'Heterozygoot = twee verschillende allelen; bruin is recessief, dus zz.',
    'Dit is dezelfde kruising als een terugkruising (kruisen met homozygoot recessief, les 2 scherm 8): de uitkomst laat direct zien welke gameten de zwarte muis maakt.',
    'Twee rijen of kolommen zijn hetzelfde: dat mag.',
    '2 : 2 = 1 : 1.',
    'Misvatting: "Ze hebben al twee zwarte jongen, dus het volgende is vast bruin." Elk jong heeft opnieuw kans ½.'] });

L4_opdracht({ titel: 'Opdracht 4', kop: 'Opdracht 4: fruitvliegen', label: 'opdracht 4 · in je schrift', min: 3,
  kort: ['Een homozygote vlieg met normale', 'vleugels × een heterozygote vlieg.', 'Welke genotypen en fenotypen?'],
  legenda: [['V', 'normale vleugels (dom.)'], ['v', 'stompe vleugels (rec.)']],
  ouders: [{ fen: 'normaal', g: 'VV' }, { fen: 'normaal', g: 'Vv' }], links: ['V', 'V'], boven: ['V', 'v'], fenVan: g => g.includes('V') ? 'normaal' : 'stomp',
  geno: [[2, 'VV'], [2, 'Vv']], feno: [[1, 'normaal']], antw: ['1 VV : 1 Vv', 'alle vliegen normale vleugels'],
  t: ['Opdracht 4: een <b>homozygote</b> fruitvlieg met normale vleugels × een <b>heterozygote</b>. Welke genotypen en fenotypen verwacht je, in welke verhouding?',
    'Stap 1: homozygoot normaal = <b>VV</b>, heterozygoot = <b>Vv</b>.',
    'Stap 2: VV maakt alleen gameten met <b>V</b>; Vv maakt gameten met <b>V</b> en met <b>v</b>.',
    'Stap 3: twee vakjes VV, twee vakjes Vv.',
    'Stap 4: genotypen <b>1 VV : 1 Vv</b>. Fenotype: <b>allemaal normale vleugels</b>.',
    'Antwoord: <b>1 VV : 1 Vv</b>; alle nakomelingen hebben normale vleugels. Geen enkele vv.'],
  n: ['Werktijd ± 3 minuten. Stompe vleugels (vestigial) zijn bij de fruitvlieg echt recessief; in film 4 heet het allel anders (G/V), hier alleen V/v.',
    'Beide ouders hebben hetzelfde fenotype maar een ander genotype (scherm 2).',
    'Wie VV × Vv lastig vindt: begin met de ouder die twee soorten gameten maakt.',
    'Geen vakje vv: daarvoor moet je van beide ouders een v krijgen.',
    'Let op het verschil tussen genotypeverhouding (1 : 1) en fenotypeverhouding (alles hetzelfde). Een vraag vraagt vaak maar één van de twee.',
    'Vraag eventueel: hoe kun je in de F1 de heterozygote vliegen vinden? (Kruisen met vv: zie de uitdaging.)'] });

L4_opdracht({ titel: 'Opdracht 5', kop: 'Opdracht 5: terugredeneren', label: 'opdracht 5 · in je schrift', min: 4,
  kort: ['Twee zwarte muizen krijgen een bruin jong.', 'Genotypen ouders? Kans dat het volgende', 'jong ook bruin is?'],
  legenda: [['Z', 'zwart (dominant)'], ['z', 'bruin (recessief)']],
  ouders: [{ fen: 'zwart', g: 'Zz', vraag: 'Z?' }, { fen: 'zwart', g: 'Zz', vraag: 'Z?' }], jong: { fen: 'bruin', g: 'zz' },
  links: ['Z', 'z'], boven: ['Z', 'z'], fenVan: g => g.includes('Z') ? 'zwart' : 'bruin',
  geno: [[1, 'ZZ'], [2, 'Zz'], [1, 'zz']], feno: [[3, 'zwart'], [1, 'bruin']], antw: ['ouders Zz × Zz', 'kans op bruin: ¼ = 25 %'],
  t: ['Opdracht 5: twee <b>zwarte</b> muizen krijgen een <b>bruin</b> jong. Wat zijn de genotypen van de ouders? Hoe groot is de kans dat hun volgende jong ook bruin is?',
    'Stap 1: het bruine jong is <b>zz</b>: het kreeg van elke ouder een z. De ouders zijn zwart, dus allebei <b>Zz</b>.',
    'Stap 2: elke ouder maakt gameten met <b>Z</b> en met <b>z</b>.',
    'Stap 3: ZZ, Zz, Zz en zz.',
    'Stap 4: <b>3 zwart : 1 bruin</b>.',
    'Antwoord: de ouders zijn <b>Zz × Zz</b>; de kans op nog een bruin jong is <b>¼ (25 %)</b>.'],
  n: ['Werktijd ± 4 minuten: dit is lastiger, want je redeneert terug van kind naar ouders. Tip voor wie vastzit: begin bij het dier waarvan je het genotype zeker weet (het recessieve fenotype).',
    'Redenering in twee stappen: (1) bruin = zz, dus elke ouder heeft minstens één z; (2) de ouders zijn zwart, dus ze hebben ook een Z. Samen: Zz. Zo werkt ook film 2 bij het gezin De Wit (Levi aa, ouders Aa).',
    'Vanaf hier is het opdracht 2 opnieuw, met andere letters.',
    'Het eerste bruine jong verandert niets aan de kans voor het volgende jong.',
    'Bij Zz × Zz altijd 3 : 1 voor de fenotypen.',
    'Uitbreiding (les 3, stambomen): een zwart jong van deze ouders is met kans ⅔ heterozygoot.'] });

/* ================================== 13 · uitdaging: ZZ of Zz? ================================== */
SCHERMEN.push({ titel: 'Uitdaging', kop: 'Uitdaging: ZZ of Zz?', deel: 'Zelf kruisen',
  stappen: [
    { t: 'Uitdaging: je hebt een <b>zwarte</b> muis. Hoe kom je erachter of hij <b>ZZ</b> of <b>Zz</b> is? Maak voor allebei een schema.', n: 'Voor snelle leerlingen of als afsluiter (± 4 minuten). Tip: kruis met een muis waarvan je het genotype zeker weet. Dat is een terugkruising (les 2, scherm 8; in andere boeken testkruising).' },
    { t: 'Kruis hem met een <b>bruine</b> muis (zz). Is hij <b>ZZ</b>, dan zijn alle jongen zwart.', n: 'De bruine muis geeft altijd een z; het allel van de zwarte muis bepaalt dus direct de kleur van elk jong.' },
    { t: 'Is hij <b>Zz</b>, dan is de helft van de jongen bruin: <b>1 zwart : 1 bruin</b>.', n: 'Zelfde schema als opdracht 3.' },
    { t: 'Eén bruin jong is genoeg <b>bewijs</b>: de zwarte muis is Zz.', n: 'Andersom niet hard: tien zwarte jongen maken ZZ heel waarschijnlijk (bij Zz is de kans daarop (½)¹⁰ ≈ 0,1 %), maar niet zeker.' }
  ],
  teken(ctx, S) { const T = S.T, s0 = S.on(0), s1 = S.on(1), s2 = S.on(2), s3 = S.on(3);
    muis(ctx, 330, 330 + Math.sin(T * 2) * 2, 1.4, L4_ZWART(), { a: s0 }); L4_chip(ctx, 'Z?', 330, 450, s0, { kl: C.goud, px: 44 });
    L4_maal(ctx, 610, 345, s1); muis(ctx, 870, 330 + Math.sin(T * 2 + 1) * 2, 1.4, L4_BRUIN(), { a: s1, kijk: -1 }); L4_chip(ctx, 'zz', 870, 450, s1, { px: 44 });
    if (S.b === 0) L4_klok(ctx, 1760, 300, 60, S, 240);
    const fen = g => g.includes('Z') ? 'zwart' : 'bruin';
    const cel = (i, j, g) => ({ vul: rgba(L4_FEN[fen(g)].kl(), C.licht ? 0.2 : 0.22), teken: (c, cx, cy, aa) => { L4_icoonA(c, fen(g), cx, cy - 24, aa); regel(c, g, cx, cy + 44, aa, C.text, 34, 'center', 700); } });
    [[100, 'als hij ZZ is', ['Z', 'Z'], 'alle jongen zwart', s1], [1000, 'als hij Zz is', ['Z', 'z'], '1 zwart : 1 bruin', s2]].forEach(([px, kop, L, uit, a]) => {
      paneel(ctx, px, 540, 820, 470, a); regel(ctx, kop, px + 40, 600, a, C.text, 34, 'left', 700);
      kruisSchema(ctx, px + 200, 720, { links: L, boven: ['z', 'z'], vak: 125, prog: a, a, klLinks: C.oker, klBoven: C.teal, px: 34, cel });
      regel(ctx, uit, px + 640, 857, a, C.goud, 34, 'center', 700); });
    if (s3 > 0.01) { gloed(ctx, 1325, 907, 110, C.goud, s3 * (0.6 + 0.25 * Math.sin(T * 3))); balk(ctx, 'één bruin jong = bewijs: Zz', 1460, 330, 700, s3, C.goud, 40); }
  } });

/* ================================== 14 · samenvatting ================================== */
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Begrippen en kruisen', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Begrippen</b>: gen, allel, genotype en fenotype, dominant en recessief, homozygoot en heterozygoot.' },
    { t: '<b>Stappenplan</b>: genotypen ouders → gameten → schema → verhoudingen aflezen.' },
    { t: 'Het schema geeft <b>kansen</b>, geen aantallen.', n: 'Zo sluit film 2 af: het gezin De Wit heeft drie kinderen, en dat is geen 3 : 1.' }
  ],
  teken(ctx, S) { const s0 = S.on(0), s1 = S.on(1), s2 = S.on(2);
    paneel(ctx, 100, 180, 830, 670, s0, rgba(C.goud, 0.6)); regel(ctx, 'begrippen', 515, 250, s0, C.goud, 40, 'center', 700);
    [['gen', 'stukje DNA, één eigenschap'], ['allel', 'variant van een gen (A of a)'], ['genotype', 'je allelen: AA, Aa, aa'], ['fenotype', 'wat je ziet'], ['dominant', 'al zichtbaar bij Aa'], ['recessief', 'alleen zichtbaar bij aa'], ['homozygoot', 'AA of aa'], ['heterozygoot', 'Aa']].forEach(([b, u], k) => { const a = S.on(0, 0.5, 0.15 + k * 0.08), y = 330 + k * 64;
      regel(ctx, b, 150, y, a, C.text, 31, 'left', 700); regel(ctx, u, 420, y, a, C.text2, 29, 'left', 500); });
    paneel(ctx, 990, 180, 830, 670, s1, rgba(C.teal, 0.6)); regel(ctx, 'stappenplan', 1405, 250, s1, C.teal, 40, 'center', 700);
    ['genotypen van de ouders', 'gameten: één allel per gen', 'kruisingsschema invullen', 'verhoudingen aflezen'].forEach((t, k) => { const a = S.on(1, 0.5, 0.15 + k * 0.15), y = 360 + k * 120;
      circ(ctx, 1080, y - 12, 34, rgba(C.teal, 0.2 * a), rgba(C.teal, a), 3); regel(ctx, String(k + 1), 1080, y + 2, a, C.teal, 40, 'center', 700); regel(ctx, t, 1140, y, a, C.text, 34, 'left', 600); });
    balk(ctx, 'het schema geeft kansen, geen aantallen', 960, 950, 1000, s2, C.goud, 38);
  } });

/* ================================== 15 · zelf verder oefenen ================================== */
function L4_icoonSchema(ctx, x, y, a) { kruisSchema(ctx, x - 50, y - 30, { links: ['A', 'a'], boven: ['A', 'a'], vak: 60, prog: 1, a, klLinks: C.oker, klBoven: C.teal, px: 24, cel: (i, j, g) => g === 'aa' ? { vul: L4_vulW() } : { vul: L4_vulP() } }); }
function L4_icoonToets(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 90, 140, 180, 12); shape(ctx, rgba(C.fill, 0.7), rgba(C.line, 0.7), 2); ctx.restore();
  [0, 1, 2].forEach(i => { vink(ctx, x - 38, y - 45 + i * 48, 12, a, i === 2 ? C.goud : C.groen); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 14, y - 45 + i * 48); ctx.lineTo(x + 48, y - 45 + i * 48); ctx.stroke(); ctx.restore(); }); }
function L4_icoonFilm(ctx, x, y, a) { if (a <= 0.01) return; circ(ctx, x, y, 72, rgba(C.goud, 0.12 * a), rgba(C.goud, a), 3); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 22, y - 34); ctx.lineTo(x + 36, y); ctx.lineTo(x - 22, y + 34); ctx.closePath(); shape(ctx, C.goud, null); ctx.restore(); }
SCHERMEN.push({ titel: 'Zelf verder', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Zelf verder oefenen: de <b>Kruisingtrainer</b>, de <b>oefentoets</b> en de films op de site.', n: 'Huiswerk: 10 kruisingen in de Kruisingtrainer (Snel oefenen: monohybride, testkruising en terugredeneren), en wie wil de oefentoets Erfelijkheid. Films 1 (Chromosomen) en 2 (Monohybride kruisingen) om terug te kijken, met de opdrachten bij Zelf aan de slag.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Zelf verder oefenen', [['Kruisingtrainer', 'veel kleine kruisingen', L4_icoonSchema], ['Oefentoets', 'erfelijkheid havo of vwo', L4_icoonToets], ['Films 1 en 2', 'terugkijken en oefenen', L4_icoonFilm]]);
  } });
