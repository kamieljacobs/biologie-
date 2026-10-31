/* =====================================================================================
   Evolutie · les 1 · Variatie en de genenpool (31 okt 2026)
   Film 1 Wat is evolutie eigenlijk? (films/evolutie/1-wat-is-evolutie.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min), zodat Kamiel hem met les 2 in één lesuur kan combineren.
   Eigen hulpen hebben het voorvoegsel L1_. Kleuren zoals in de film: allel voor zwart blauw, allel voor oranje geel,
   nieuw allel (mutatie) paars, kern van de zaak goud.
   ===================================================================================== */

// ---------- hulpen ----------
// beestje dat in de richting (hx, hy) kruipt
function L1_kruip(ctx, x, y, hx, hy, s, o = {}) { lhb(ctx, x, y, s, Object.assign({ rot: Math.atan2(hx, -hy) }, o)); }
// de tien beestjes van de film: acht oranje (verschillend aantal stippen), twee zwart
const L1_TIEN = [['oranje', 14], ['oranje', 6], ['oranje', 19], ['oranje', 9], ['vier', 0], ['oranje', 2], ['oranje', 12], ['oranje', 17], ['twee', 0], ['oranje', 7]];
// legsel: trosje gele eitjes
function L1_legsel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 14; i++) { const an = i * 2.4, r = Math.sqrt(i) * 13 * s; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r, y + Math.sin(an) * r * 0.8, 7 * s, 11 * s, an * 0.2, 0, 6.283); ctx.fillStyle = '#E8C65A'; ctx.fill(); ctx.strokeStyle = '#B8902C'; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }
// stukje DNA: bovenstreng + onderstreng met basen; idx = plek van de mutatie, m = 0..1 (verandering)
const L1_BASE = { A: 'T', T: 'A', C: 'G', G: 'C' };
function L1_dna(ctx, x, y, seq, idx, m, a = 1) { if (a <= 0.01) return; const w = 64, x0 = x - seq.length * w / 2;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round';
  [y - 70, y + 70].forEach(yy => { ctx.beginPath(); ctx.moveTo(x0 - 20, yy); ctx.lineTo(x0 + seq.length * w + 20, yy); ctx.stroke(); });
  seq.split('').forEach((b, i) => { const xm = x0 + i * w + w / 2, mut = i === idx;
    const boven = mut && m > 0.5 ? 'T' : b, onder = L1_BASE[boven], kl = mut ? mix(C.text2, C.paars, m) : C.text2;
    ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xm, y - 66); ctx.lineTo(xm, y + 66); ctx.stroke();
    [[boven, y - 26], [onder, y + 26]].forEach(([l, yy]) => { roundRect(ctx, xm - 22, yy - 22, 44, 44, 10); shape(ctx, mut ? rgba(C.paars, 0.25 * m) : rgba(C.bg, 0.9), kl, 2.5);
      text(ctx, l, xm, yy + 11, fTekst(30, 700), C.text, 'center'); });
    if (mut && m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; roundRect(ctx, xm - 30, y - 56, 60, 112, 14); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }
// genenpaar per kind/ouder: kolom van twee knikkers per gen (r = straal)
function L1_paren(ctx, cx, y, paren, a = 1, r = 15, ring = null) { const sp = r * 2.5;
  paren.forEach(([k1, k2], i) => { const x = cx + (i - (paren.length - 1) / 2) * sp; knikker(ctx, x, y - r * 1.05, r, k1, a); knikker(ctx, x, y + r * 1.05, r, k2, a);
    if (ring && ring.a > 0.01 && ring.i.includes(i)) { ctx.save(); ctx.globalAlpha *= a * ring.a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - r - 5, y - r * 2.05 - 5, 2 * r + 10, r * 4.1 + 10, r); ctx.stroke(); ctx.restore(); } }); }
// rij losse allelen (een eicel of zaadcel) in een kapsel
function L1_gameet(ctx, cx, y, kleuren, a = 1, r = 14, kl = C.line) { if (a <= 0.01) return; const sp = r * 2.5, w = kleuren.length * sp + 24;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, cx - w / 2, y - r - 14, w, 2 * r + 28, r + 14); shape(ctx, rgba(C.fill, 0.5), kl, 2.5); ctx.restore();
  kleuren.forEach((k, i) => knikker(ctx, cx + (i - (kleuren.length - 1) / 2) * sp, y, r, k, a)); }
// vinkje als icoon (vooruitblik)
function L1_vink(ctx, x, y, s, a, T, bek = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 2) * 2); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 46, 30, -0.15, 0, 6.283); ctx.fillStyle = C.licht ? '#6E5A44' : '#8A7258'; ctx.fill();
  circ(ctx, 38, -24, 22, C.licht ? '#4A3C2E' : '#5C4B3A'); ctx.beginPath(); ctx.moveTo(54, -36 - (bek - 1) * 6); ctx.quadraticCurveTo(54 + 30 * bek, -24, 56, -12 + (bek - 1) * 6); ctx.closePath(); ctx.fillStyle = C.oker; ctx.fill();
  circ(ctx, 44, -28, 3.5, '#111'); ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-84, -6); ctx.lineTo(-80, 14); ctx.closePath(); ctx.fillStyle = C.licht ? '#4A3C2E' : '#5C4B3A'; ctx.fill();
  ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-6, 28); ctx.lineTo(-10, 52); ctx.moveTo(10, 28); ctx.lineTo(8, 52); ctx.stroke(); ctx.restore(); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 1: variatie, allelen, de genenpool en wat evolutie eigenlijk is', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 1 van de nieuwe reeks, Wat is evolutie eigenlijk?: havo Biologie voor jou H4, vwo Nectar H7. Bewust kort (± 25 minuten), zodat je hem met les 2 (Natuurlijke selectie) in één lesuur kunt combineren.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 1', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Wat is evolutie', 140, 465, fTitel(98), C.text); text(ctx, 'eigenlijk?', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'variatie · allelen · genenpool', 144, 675, 1, C.text2, 32, 'left', 400);
    pot(ctx, 1430, 780, 1.25, { p: 0.3, n: 70, seed: 4 });
    [0, 1, 2].forEach(i => { const an = T * 0.22 + i * 2.09, x = 1430 + Math.cos(an) * 380, y = 600 + Math.sin(an) * 300;
      L1_kruip(ctx, x, y, -Math.sin(an), Math.cos(an), 0.7, { vorm: ['oranje', 'vier', 'oranje'][i], stippen: [12, 0, 4][i], loop: T + i }); });
  } });

// ---------- 2 · broers en zussen ----------
const L1_YP = [[0, 1], [1, 1], [0, 1], [0, 0], [1, 1], [0, 1], [0, 0], [1, 0]], L1_BP = [[0, 1], [0, 1], [0, 1], [0, 1], [1, 1], [0, 1], [1, 1], [1, 0]];
const L1_pk = (l) => l.map(([x, y]) => [x ? EV().a2 : EV().a1, y ? EV().a2 : EV().a1]);
SCHERMEN.push({ titel: 'Broers en zussen', kop: 'Op elkaar lijken, maar nooit precies', deel: 'Opening',
  stappen: [
    { t: 'Yasmin en Bilal: zus en broer, met dezelfde ouders. Dat zie je: dezelfde ogen, dezelfde neus, dezelfde lach.', n: 'Dezelfde opening als de film. Startvraag van de film (kun je zelf stellen): Waarom lijken broers en zussen op elkaar, maar nooit precies?' },
    { t: 'Toch zijn ze niet hetzelfde. Dat geldt voor alle broers en zussen, behalve een eeneiige tweeling.', n: 'Het antwoord komt op scherm 7 (recombinatie). Het begint bij verschillen, en daar begint ook evolutie.' },
    { t: 'Onder de huid: van elk gen hebben ze twee varianten. Op sommige plekken dezelfde, op andere niet.', n: 'Vooruitblik: knikkers zijn allelen (scherm 4). Gouden kaders = plekken waar ze verschillen. Bij echte mensen gaat het om duizenden genen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 0.8), a2 = S.on(2, 1.2);
    pers(ctx, 'yasmin', 660, 720, 470, { t: T, uit: 'blij', kijk: 1, a: a0 }); pers(ctx, 'bilal', 1260, 720, 500, { t: T + 1, uit: 'blij', kijk: -1, a: a0 });
    naam(ctx, 'Yasmin', 660, 770, a0, 'center'); naam(ctx, 'Bilal', 1260, 770, a0, 'center');
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.moveTo(660, 245); ctx.lineTo(660, 215); ctx.lineTo(1260, 215); ctx.lineTo(1260, 245); ctx.stroke(); ctx.restore();
      regel(ctx, 'zelfde ouders', 960, 200, a1, C.text2, 30, 'center', 600); regel(ctx, 'niet hetzelfde', 960, 520, a1, C.goud, 38, 'center', 700); }
    L1_paren(ctx, 660, 880, L1_pk(L1_YP), a2 * S.on(2, 0.01), 14, { i: [1, 3, 6], a: S.on(2, 0.6, 0.8) });
    L1_paren(ctx, 1260, 880, L1_pk(L1_BP), a2 * S.on(2, 0.01), 14, { i: [1, 3, 6], a: S.on(2, 0.6, 0.8) });
  } });

// ---------- 3 · variatie ----------
SCHERMEN.push({ titel: 'Variatie', kop: 'Eén soort, verschillende vormen', deel: 'Variatie',
  stappen: [
    { t: 'Oktober: op een zonnig kozijn landen Aziatische lieveheersbeestjes. Ze zoeken een plek om te overwinteren.', n: 'De meest algemene soort lieveheersbeestje in Nederland (Harmonia axyridis), oorspronkelijk uit Azië. Ze overwinteren graag in huizen.' },
    { t: 'Kijk goed: ze zijn niet allemaal hetzelfde. Oranje met zwarte stippen, of zwart met vier of twee rode vlekken.', n: 'Er zijn veel meer kleurvormen; deze drie zijn in Nederland het gewoonst. Een oranje beestje heeft hooguit 19 stippen.' },
    { t: 'Verschillen tussen individuen van één soort heten <b>variatie</b>. In een telling in Brabant was ± 8 op de 10 beestjes oranje.', n: 'De telling uit de film. Dit is het vertrekpunt van de hele reeks: zonder variatie geen evolutie.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.6), a1 = S.on(1, 0.8), a2 = S.on(2, 0.8);
    ctx.save(); ctx.fillStyle = rgba(C.fill, C.licht ? 0.9 : 0.7); ctx.fillRect(80, 770, 1760, 46); ctx.fillStyle = rgba(C.line, 0.35); ctx.fillRect(80, 770, 1760, 6); ctx.restore();
    L1_TIEN.forEach(([vorm, st], i) => { const v = clamp(a0 * 1.6 - i * 0.06, 0, 1); if (v <= 0) return; const e = ease(v), x = 250 + i * 158, y = 680 + (i % 2) * 22;
      lhb(ctx, x + (1 - e) * (i - 4.5) * 40, lerp(160, y, e), 0.72, { vorm, stippen: st, open: (1 - e) * 1.2, rot: (hash(i) - 0.5) * 0.6 + (1 - e) * 0.4, a: Math.min(1, v * 3) }); });
    naam(ctx, 'oranje met stippen', 250 + 158, 560, a1, 'center', C.text, 30);
    naam(ctx, 'zwart, vier rode vlekken', 250 + 4 * 158, 560, a1, 'center', C.text, 30);
    naam(ctx, 'zwart, twee rode vlekken', 250 + 8 * 158, 560, a1, 'center', C.text, 30);
    termKaart(ctx, 'variatie', 'verschillen tussen individuen van één soort', 820, 860, a2);
    regel(ctx, '8 van de 10 oranje', 1540, 935, a2, C.goud, 40, 'center', 700);
  } });

// ---------- 4 · allelen ----------
SCHERMEN.push({ titel: 'Allelen', kop: 'Eén gen, twee allelen', deel: 'Variatie',
  stappen: [
    { t: 'Een deel van de variatie is erfelijk. De kleurvorm hangt af van één gen. Varianten van een gen heten <b>allelen</b>.', n: 'We houden het eenvoudig, zoals de film: één allel voor zwart (blauwe knikker) en één voor oranje (gele knikker). In werkelijkheid heeft dit gen meer allelen (zie briefing).' },
    { t: 'Elk beestje heeft er twee: één van elke ouder.', n: 'Zelfde kleuren als de film en de rest van de reeks: blauw = allel voor zwart, geel = allel voor oranje.' },
    { t: 'Het allel voor zwart is dominant. Alleen met twee allelen voor oranje word je oranje.', n: 'Het middelste beestje is zwart, maar draagt ook een allel voor oranje. Dat wordt belangrijk bij de genenpool (scherm 9).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 1.2), a2 = S.on(2, 0.8);
    termKaart(ctx, 'allel', 'een variant van een gen', 960, 180, a0);
    knikker(ctx, 720, 430, 40, EV().a1, a0); naam(ctx, 'allel voor zwart', 720, 510, a0, 'center');
    knikker(ctx, 1200, 430, 40, EV().a2, a0 * S.on(0, 0.6, 0.3)); naam(ctx, 'allel voor oranje', 1200, 510, a0 * S.on(0, 0.6, 0.3), 'center');
    const rij = [['vier', EV().a1, EV().a1], ['vier', EV().a1, EV().a2], ['oranje', EV().a2, EV().a2]];
    rij.forEach(([vorm, k1, k2], i) => { const a = S.on(1, 0.7, i * 0.25), x = 560 + i * 400; if (a <= 0.01) return;
      lhb(ctx, x, 720, 0.8, { vorm, stippen: 12, a, loop: i === 1 ? null : null }); allelPaar(ctx, x, 870, k1, k2, 22, a); });
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; roundRect(ctx, 960 - 170, 590, 340, 340, 24); ctx.stroke(); ctx.restore();
      regel(ctx, 'zwart is dominant', 960, 980, a2, C.goud, 36, 'center', 700); }
  } });

// ---------- 5 · omgeving ----------
SCHERMEN.push({ titel: 'Omgeving', kop: 'Allelen of omgeving?', deel: 'Variatie',
  stappen: [
    { t: 'Twee oranje beestjes uit hetzelfde legsel. Het ene groeit op in de kou, het andere in de warmte.', n: 'Vraag uit de film: Twee oranje beestjes komen uit hetzelfde legsel … Wat denk je? (a) Evenveel stippen, (b) het beestje uit de warmte meer, (c) het beestje uit de kou meer. Antwoord c.' },
    { t: 'Kou geeft meer en grotere stippen. Bij 14 °C hadden alle beestjes er 19, bij 28 °C gemiddeld 8.', n: 'De proef uit de film (temperatuur tijdens de popfase). Zelfde allelen, ander uiterlijk.' },
    { t: 'Dat verschil komt uit de omgeving, niet uit de allelen. Zulke verschillen erf je niet.', n: 'Net zo met de grootte: een larve met weinig voedsel wordt een kleiner beestje. Een beestje uit de kou krijgt dus geen jongen met extra stippen. Variatie = deels erfelijk, deels omgeving.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 0.8);
    L1_legsel(ctx, 960, 270, 1.2, a0); naam(ctx, 'legsel', 960, 380, a0, 'center', C.text2, 28);
    pijl(ctx, 900, 330, 640, 470, C.text2, 4, a0 * S.on(0, 0.6, 0.3)); pijl(ctx, 1020, 330, 1280, 470, C.text2, 4, a0 * S.on(0, 0.6, 0.3));
    thermo(ctx, 260, 700, 260, 0.28, C.teal, a0 * S.on(0, 0.6, 0.5)); regel(ctx, '14 °C', 300, 780, a0 * S.on(0, 0.6, 0.5), C.teal, 36, 'left', 700);
    thermo(ctx, 1660, 700, 260, 0.8, C.koraal, a0 * S.on(0, 0.6, 0.5)); regel(ctx, '28 °C', 1620, 780, a0 * S.on(0, 0.6, 0.5), C.koraal, 36, 'right', 700);
    const st1 = Math.round(lerp(0, 19, a1)), st2 = Math.round(lerp(0, 8, a1));
    lhb(ctx, 560, 620, 1.15, { vorm: 'oranje', stippen: st1, a: a0 * S.on(0, 0.6, 0.6) }); lhb(ctx, 1360, 620, 1.15, { vorm: 'oranje', stippen: st2, a: a0 * S.on(0, 0.6, 0.6) });
    regel(ctx, '19 stippen', 560, 770, a1, C.text, 36, 'center', 700); regel(ctx, '± 8 stippen', 1360, 770, a1, C.text, 36, 'center', 700);
    misvatting(ctx, 'jongen van het koude beestje: extra stippen', 'verschil door de omgeving erf je niet', 960, 830, 1120, a2, S.on(2, 0.6, 0.6));
  } });

// ---------- 6 · mutatie ----------
SCHERMEN.push({ titel: 'Mutatie', kop: 'Een nieuw allel: mutatie', deel: 'Waar komt variatie vandaan?',
  stappen: [
    { t: 'Een nieuw allel ontstaat door een <b>mutatie</b>: een verandering in het DNA.', n: 'Hoe zo\'n verandering ontstaat (kopieerfout, straling, stoffen) zit in de DNA-reeks. Hier is één basenpaar veranderd: C-G wordt T-A.' },
    { t: 'Zo komt er een nieuw allel bij.', n: 'Paars = nieuw allel, zoals mutatie in de hele reeks paars is. De meeste mutaties veranderen niets aan het uiterlijk; sommige wel.' },
    { t: 'Een mutatie gebeurt toevallig, niet omdat een beestje een andere kleur nodig heeft. En mutaties zijn zeldzaam.', n: 'Hardnekkige misvatting: \'het dier past zich aan omdat het moet\'. Komt terug in les 2 (aangepast, zonder doel).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), m = S.on(0, 0.9, 0.9), a1 = S.on(1, 0.8), a2 = S.on(2, 0.8);
    L1_dna(ctx, 960, 360, 'ATGCCTGAGA', 4, m, a0); naam(ctx, 'DNA', 960 - 5 * 64 - 50, 368, a0, 'right', C.text2, 30);
    pijl(ctx, 960, 470, 960, 560, C.text2, 4, a1);
    knikker(ctx, 760, 650, 34, EV().a1, a1); knikker(ctx, 880, 650, 34, EV().a2, a1);
    const e = ease(a1); knikker(ctx, 1080, 650 - (1 - e) * 60, 34 * (0.5 + 0.5 * e), EV().nieuw, a1);
    gloed(ctx, 1080, 650, 90, C.paars, a1 * (0.6 + 0.3 * Math.sin(T * 2)));
    naam(ctx, 'nieuw allel', 1140, 662, a1, 'left', C.paars, 32);
    misvatting(ctx, 'mutatie omdat het beestje het nodig heeft', 'toevallig, en zeldzaam', 960, 790, 1080, a2, S.on(2, 0.6, 0.6));
  } });

// ---------- 7 · recombinatie ----------
const L1_V = [[0, 1], [0, 0], [1, 1], [0, 1], [1, 0], [0, 1]], L1_M = [[1, 0], [0, 1], [0, 1], [1, 1], [0, 1], [0, 0]];
const L1_kl = (b) => b ? EV().a2 : EV().a1;
const L1_G = { v1: [0, 1, 0, 1, 0, 0], v2: [1, 0, 0, 1, 0, 0], m1: [1, 0, 1, 0, 0, 1], m2: [1, 0, 1, 1, 1, 1] };
const L1_gk = (ouder, keus) => ouder.map((p, i) => L1_kl(p[keus[i]]));
SCHERMEN.push({ titel: 'Recombinatie', kop: 'Elk kind een andere greep', deel: 'Waar komt variatie vandaan?',
  stappen: [
    { t: 'Elke ouder heeft van elk gen twee allelen.', n: 'Hier zes genen; in werkelijkheid duizenden. Vraag uit de film: Yasmin en Bilal hebben dezelfde ouders. Waarom hebben ze toch niet dezelfde allelen? (a) Bij elk kind nieuwe mutaties, (b) elk kind krijgt van elke ouder een toevallige helft, (c) elk kind erft wat de ouders leerden of trainden. Antwoord b.' },
    { t: 'Bij de meiose komt in een eicel of zaadcel maar één van de twee terecht. Welke: dat is toeval.', n: 'Per gen onafhankelijk (genen op verschillende chromosomen; crossing-over voegt nog meer toe). Elke zaadcel en elke eicel is dus anders.' },
    { t: 'Bij de bevruchting krijgt elk kind een nieuwe combinatie van allelen die al bestonden: <b>recombinatie</b>.', n: 'Terug naar de openingsvraag: broers en zussen lijken op elkaar (allelen van dezelfde twee ouders), maar elk kreeg een andere greep. Alleen een eeneiige tweeling deelt al zijn allelen. Mutatie maakt nieuwe allelen, meiose en bevruchting nieuwe combinaties: samen de erfelijke variatie.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 1.2), a2 = S.on(2, 1.4);
    const ouder = (o) => o.map(([x, y]) => [L1_kl(x), L1_kl(y)]);
    L1_paren(ctx, 560, 290, ouder(L1_V), a0); naam(ctx, 'vader', 330, 302, a0, 'right', C.text2, 32);
    L1_paren(ctx, 1360, 290, ouder(L1_M), a0); naam(ctx, 'moeder', 1590, 302, a0, 'left', C.text2, 32);
    const g = [['v1', 400, 0], ['v2', 720, 0.2], ['m1', 1200, 0.1], ['m2', 1520, 0.3]];
    g.forEach(([k, x, d]) => { const a = S.on(1, 0.7, d); if (a <= 0.01) return; const bron = k[0] === 'v' ? L1_V : L1_M;
      L1_gameet(ctx, x, lerp(400, 540, ease(a)), L1_gk(bron, L1_G[k]), a, 13); });
    naam(ctx, 'zaadcellen', 560, 620, a1, 'center', C.text2, 28); naam(ctx, 'eicellen', 1360, 620, a1, 'center', C.text2, 28);
    const kind = (vk, mk) => L1_G[vk].map((_, i) => [L1_kl(L1_V[i][L1_G[vk][i]]), L1_kl(L1_M[i][L1_G[mk][i]])]);
    const k1 = kind('v1', 'm1'), k2 = kind('v2', 'm2'), vers = k1.map((p, i) => (p[0] !== k2[i][0] || p[1] !== k2[i][1]) ? i : -1).filter(i => i >= 0);
    [[400, 1200, 700], [720, 1520, 1220]].forEach(([vx, mx, kx], j) => { const a = S.on(2, 0.6, j * 0.3); if (a <= 0.01) return;
      ctx.save(); ctx.setLineDash([8, 8]); pijl(ctx, vx, 580, kx - 40, 760, rgba(C.line, 0.7), 3, a); pijl(ctx, mx, 580, kx + 40, 760, rgba(C.line, 0.7), 3, a); ctx.restore(); });
    L1_paren(ctx, 700, 830, k1, S.on(2, 0.6, 0.4), 15, { i: vers, a: S.on(2, 0.6, 1.0) }); naam(ctx, 'Yasmin', 700, 940, S.on(2, 0.6, 0.4), 'center');
    L1_paren(ctx, 1220, 830, k2, S.on(2, 0.6, 0.7), 15, { i: vers, a: S.on(2, 0.6, 1.0) }); naam(ctx, 'Bilal', 1220, 940, S.on(2, 0.6, 0.7), 'center');
  } });

// ---------- 8 · populatie ----------
SCHERMEN.push({ titel: 'Populatie', kop: 'Wat is een populatie?', deel: 'Populatie en genenpool',
  stappen: [
    { t: 'Een <b>populatie</b>: individuen van één soort, in één gebied, die zich onderling voortplanten.', n: 'Vraag uit de film: Hoe groot is de populatie waar dit beestje bij hoort? (a) Precies alle beestjes in deze tuin, (b) alle Aziatische lieveheersbeestjes op aarde, (c) dat kiest de onderzoeker. Antwoord c.' },
    { t: 'Waar de grens ligt, kiest de onderzoeker, passend bij zijn vraag: een tuin, een stad of heel Nederland.', n: 'Wie één tuin volgt, telt de beestjes in die tuin. Wie wil weten hoe de soort zich verspreidt, neemt heel Nederland.' },
    { t: 'Lieveheersbeestjes vliegen van tuin naar tuin. Een scherpe grens is er niet: het blijft een keuze.', n: 'Uitwisseling tussen populaties (genenstroom) komt terug in les 5 (Toeval en uitwisseling).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 0.7), a1b = S.on(1, 0.7, 0.5), a2 = S.on(2, 0.8);
    termKaart(ctx, 'populatie', 'één soort · één gebied · plant zich onderling voort', 960, 170, a0);
    const vlak = [[960, 660, 760, 300, 'Nederland', a1b], [1080, 680, 380, 170, 'stad', a1], [1200, 700, 140, 80, 'tuin', a0]];
    vlak.forEach(([x, y, rx, ry, nm, a], i) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, rx, ry, 3 + i, 0.05);
      shape(ctx, rgba(C.fill, 0.18 + i * 0.1), i === 2 ? C.goud : rgba(C.line, 0.7), i === 2 ? 3.5 : 2.5); ctx.restore();
      naam(ctx, nm, x - rx + (i === 2 ? 20 : 40), y - ry + (i === 2 ? -14 : 50), a, 'left', i === 2 ? C.goud : C.text2, 30); });
    for (let i = 0; i < 120; i++) { const an = hash(i * 3.3) * 6.283, rr = Math.sqrt(hash(i * 7.1)), x = 960 + Math.cos(an) * rr * 700, y = 660 + Math.sin(an) * rr * 260;
      const inTuin = Math.hypot((x - 1200) / 140, (y - 700) / 80) < 0.9, inStad = Math.hypot((x - 1080) / 380, (y - 680) / 170) < 0.95;
      const a = inTuin ? a0 : inStad ? a1 : a1b; if (a <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 6, hash(i * 1.7) < 0.8 ? '#D9792E' : '#1B1A1C', rgba(C.bg, 0.6), 1.5); ctx.restore(); }
    // beestjes die tussen tuinen vliegen
    if (a2 > 0.01) [0, 1, 2].forEach(i => { const u = (T * 0.18 + i / 3) % 1, x0 = [520, 1500, 760][i], y0 = [560, 820, 820][i], x1 = 1200, y1 = 700;
      const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 120;
      ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(C.text2, 0.5 * a2); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 - 240, x1, y1); ctx.stroke(); ctx.restore();
      L1_kruip(ctx, x, y, x1 - x0, (y1 - y0) - Math.cos(u * Math.PI) * 240, 0.32, { vorm: i === 1 ? 'vier' : 'oranje', stippen: 10, open: 1, a: a2 }); });
  } });

// ---------- 9 · genenpool ----------
const L1_POT = Array.from({ length: 20 }, (_, i) => i < 2 ? 'b' : 'g');
SCHERMEN.push({ titel: 'Genenpool', kop: 'Alle allelen in één pot', deel: 'Populatie en genenpool',
  stappen: [
    { t: 'Tien beestjes: acht oranje, twee zwart. De zwarte hebben allebei één allel voor zwart en één voor oranje.', n: 'Zelfde voorbeeld als de film (een eenvoudig rekenvoorbeeld, geen echte telling).' },
    { t: 'Stop alle allelen van de populatie in één pot: de <b>genenpool</b>. Elk beestje brengt twee knikkers mee.', n: 'Een gedachte-experiment: de pot bestaat niet echt, het is de verzameling van alle allelen in de populatie.' },
    { t: 'Twintig knikkers, twee ervan blauw: dat is 10 %. Dat aandeel heet de <b>allelfrequentie</b>.', n: 'Vraag uit de film: Twee van de tien beestjes zijn zwart. Welk deel van de knikkers in de pot is blauw? (a) 10 %, (b) 20 %, net als de beestjes, (c) 50 %. Antwoord a.' },
    { t: '20 % van de beestjes is zwart, maar de allelfrequentie van zwart is 10 %.', n: 'Valkuil: beestjes tellen in plaats van allelen. Een zwart beestje kan ook een allel voor oranje dragen (dominant, scherm 4).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1), a1 = S.on(1, 2.2), a2 = S.on(2, 0.8), a3 = S.on(3, 0.8);
    const BX = (i) => 300 + i * 147;
    L1_TIEN.forEach(([vorm, st], i) => { const a = S.on(0, 0.6, i * 0.06); lhb(ctx, BX(i), 300, 0.5, { vorm, stippen: st, a });
      const zw = vorm !== 'oranje', k1 = zw ? EV().a1 : EV().a2, k2 = EV().a2;
      const v = clamp(a1 * 1.4 - i * 0.04, 0, 1), e = ease(v);
      if (v < 1) { const tx = 960 + (i - 4.5) * 18, ty = 700; knikker(ctx, lerp(BX(i) - 17, tx - 12, e), lerp(400, ty, e) - Math.sin(e * Math.PI) * 60, 14, k1, a * (1 - v * 0.9)); knikker(ctx, lerp(BX(i) + 17, tx + 12, e), lerp(400, ty, e) - Math.sin(e * Math.PI) * 60, 14, k2, a * (1 - v * 0.9)); } });
    pot(ctx, 960, 960, 0.95, { kleuren: L1_POT.map(k => k === 'b' ? EV().a1 : EV().a2), seed: 7, vul: a1, a: S.on(1, 0.4), kr: 15 });
    naam(ctx, 'genenpool', 960 + 160, 700, S.on(1, 0.6, 0.6), 'left', C.text, 34);
    regel(ctx, '20 knikkers · 2 blauw', 1600, 820, a2, C.text, 34, 'center', 700);
    allelBalk(ctx, 1380, 860, 440, 0.1, a2, { namen: ['zwart', 'oranje'] }); naam(ctx, 'allelfrequentie', 1600, 990, a2, 'center', C.goud, 30);
    if (a3 > 0.01) { paneel(ctx, 100, 740, 620, 250, a3, rgba(C.goud, 0.6));
      regel(ctx, 'beestjes zwart', 140, 815, a3, C.text2, 30, 'left', 600); regel(ctx, '2 van 10 = 20 %', 690, 815, a3, C.text, 36, 'right', 700);
      regel(ctx, 'allelen zwart', 140, 885, a3, C.text2, 30, 'left', 600); regel(ctx, '2 van 20 = 10 %', 690, 885, a3, C.goud, 36, 'right', 700);
      regel(ctx, 'tel allelen, geen beestjes', 410, 958, a3, C.text, 30, 'center', 600); }
  } });

// ---------- 10 · evolutie ----------
SCHERMEN.push({ titel: 'Evolutie', kop: 'Evolutie: de pot verandert', deel: 'Evolutie',
  stappen: [
    { t: '<b>Evolutie</b> is een verandering van de allelfrequenties in een populatie, over generaties.', n: 'De definitie van de film en het boek. Let op de drie delen: allelfrequenties · populatie · generaties.' },
    { t: 'Tien procent blauw wordt twintig generaties later dertig procent: de inhoud van de pot is veranderd.', n: 'Vraag uit de film: Wat is er veranderd? (a) Elk beestje is in zijn leven donkerder geworden, (b) de genenpool: er zitten meer allelen voor zwart in de pot, (c) de beestjes pasten zich aan omdat ze zwart moesten worden. Antwoord b.' },
    { t: 'Een individu evolueert niet: wie oranje uit de pop komt, blijft oranje. Wat verschilt, is wie jongen krijgt en hoeveel.', n: 'Echt gezien: toen het Aziatisch lieveheersbeestje zich over Groot-Brittannië verspreidde, werd in de eerste twee jaar het deel zwarte beestjes kleiner. Het allel voor zwart werd dus zeldzamer.' },
    { t: 'Waardoor verandert de pot? Door selectie, toeval, uitwisseling met andere populaties, en mutatie.', n: 'Dat zijn de volgende lessen: selectie (les 2–4), toeval en uitwisseling (les 5); mutatie voegt nieuwe knikkers toe.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 1.2), a2 = S.on(2, 0.8), a3 = S.on(3, 0.8);
    termKaart(ctx, 'evolutie', 'verandering van de allelfrequenties in een populatie, over generaties', 960, 170, a0);
    pot(ctx, 560, 760, 0.95, { p: 0.1, n: 60, seed: 2, a: a1 }); naam(ctx, 'generatie 1', 560, 420, a1, 'center', C.text2, 30);
    allelBalk(ctx, 410, 790, 300, 0.1, a1, { procent: true });
    const b = S.on(1, 0.8, 0.6);
    pijl(ctx, 770, 640, 1150, 640, C.goud, 5, b); regel(ctx, '20 generaties', 960, 690, b, C.goud, 30, 'center', 700);
    pot(ctx, 1360, 760, 0.95, { p: 0.3, n: 60, seed: 5, a: b }); naam(ctx, 'generatie 21', 1360, 420, b, 'center', C.text2, 30);
    allelBalk(ctx, 1210, 790, 300, 0.3, b, { procent: true });
    if (a2 > 0.01) { lhb(ctx, 960, 470, 0.45, { vorm: 'oranje', stippen: 10, a: a2, loop: T }); regel(ctx, 'blijft oranje', 960, 560, a2, C.text, 28, 'center', 700); }
    const kr = [['selectie', EV().kracht.selectie], ['toeval', EV().kracht.drift], ['uitwisseling', EV().kracht.stroom], ['mutatie', EV().kracht.mutatie]];
    kr.forEach(([nm, kl], i) => { const a = S.on(3, 0.5, i * 0.2); if (a <= 0.01) return; const x = 300 + i * 440;
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 170, 925, 340, 62, 31); shape(ctx, rgba(kl, 0.18), kl, 3); ctx.restore(); regel(ctx, nm, x, 968, a, kl, 32, 'center', 700); });
  } });

// ---------- 11 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Wat is evolutie eigenlijk?', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Variatie</b>: verschillen tussen individuen van één soort. Deels erfelijk (allelen), deels omgeving (niet erfelijk).', n: 'Stippen door kou en grootte door voedsel erf je niet.' },
    { t: 'Nieuwe allelen ontstaan door <b>mutatie</b>. Meiose en bevruchting maken er steeds nieuwe combinaties mee.', n: 'Terug naar de openingsvraag: daarom lijken broers en zussen op elkaar, maar nooit precies.' },
    { t: 'Alle allelen samen: de <b>genenpool</b>. Evolutie = verandering van de allelfrequenties in die pot, over generaties.', n: 'Een populatie evolueert, een individu niet.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['variatie', C.goud, ['erfelijk: allelen', 'omgeving: niet erfelijk']], ['nieuwe variatie', C.paars, ['mutatie: nieuw allel', 'meiose + bevruchting:', 'nieuwe combinatie']], ['evolutie', C.teal, ['genenpool = alle allelen', 'allelfrequentie verandert', 'populatie, niet individu']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { lhb(ctx, x + 170, 470, 0.75, { vorm: 'oranje', stippen: 19, a }); lhb(ctx, x + 370, 470, 0.75, { vorm: 'vier', a }); }
      if (i === 1) { knikker(ctx, x + 170, 460, 32, EV().a1, a); knikker(ctx, x + 270, 460, 32, EV().a2, a); knikker(ctx, x + 370, 460, 32, EV().nieuw, a); gloed(ctx, x + 370, 460, 70, C.paars, a * (0.5 + 0.3 * Math.sin(T * 2))); }
      if (i === 2) pot(ctx, x + 270, 580, 0.75, { p: 0.3, n: 50, seed: 3, a });
      regels.forEach((r, k) => regel(ctx, r, x + 40, 690 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 12 · volgende keer ----------
function L1_icoonEi(ctx, x, y, a, T) { L1_legsel(ctx, x, y, 1.3, a); [[-70, 30], [60, 40], [10, -60]].forEach(([dx, dy], i) => lhb(ctx, x + dx, y + dy, 0.28, { vorm: 'oranje', stippen: 8, a, rot: i, loop: T + i })); }
function L1_icoonVink(ctx, x, y, a, T) { L1_vink(ctx, x, y, 1, a, T); }
function L1_icoonWie(ctx, x, y, a, T) { if (a <= 0.01) return; [40, 70, 100, 70, 40].forEach((h, i) => { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = i === 3 ? C.goud : rgba(C.line, 0.6); ctx.fillRect(x - 100 + i * 42, y + 50 - h, 32, h); ctx.restore(); }); }
function L1_icoonDoel(ctx, x, y, a, T) { L1_vink(ctx, x - 70, y - 30, 0.7, a, T, 0.8); L1_vink(ctx, x + 50, y + 30, 0.7, a, T + 1, 1.6); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 2): <b>natuurlijke selectie</b>. Te veel jongen, de droogte op Daphne Major, en waarom niet altijd de sterkste wint.', n: 'Huiswerk: de film Wat is evolutie eigenlijk? (nog eens) kijken. Wie vooruit wil: film 2 Natuurlijke selectie.' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Natuurlijke selectie', [['Te veel jongen', 'overproductie', L1_icoonEi], ['Daphne Major', 'de vinken en de droogte', L1_icoonVink], ['Wie wint?', 'niet altijd de sterkste', L1_icoonWie], ['Aangepast', 'zonder doel', L1_icoonDoel]]); } });
