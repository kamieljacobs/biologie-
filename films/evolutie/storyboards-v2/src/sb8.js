// Evolutie v2 — film 8 'Stambomen lezen' — storyboard: één keyframe per scène (22 okt 2026). Laad: teken_evo7, teken_evo8, sb8.
function blauw(ctx) { ctx.fillStyle = '#1C3A58'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#22466A'; ctx.fillRect(0, 0, W, 180); ctx.fillStyle = '#163048'; ctx.fillRect(0, 760, W, 320); }
function bord(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); roundRect(ctx, 760, 150, 1040, 580, 16); shape(ctx, '#203A34', '#5A6A62', 6); }
function schema(ctx, hfst) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 8, hfst); }
// eenvoudige boomtekenaar met vaste knooppunten: takken als lijnen, namen bovenaan
function tak(ctx, x1, y1, x2, y2, o = {}) { const { kleur = C.line, lw = 5, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }
function knoop(ctx, x, y, kleur = C.line, r = 9) { circ(ctx, x, y, r, C.bgSchema, kleur, 3.5); }
function eindKaart8(ctx, zinnen) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 8, 'SAMENVATTING');
  zinnen.forEach((z, i) => text(ctx, z, 160, 300 + i * 120, fTekst(48, 600), C.text, 'left')); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 240); ctx.lineTo(116, 240); ctx.lineTo(116, 300 + (zinnen.length - 1) * 120 + 20); ctx.lineTo(130, 300 + (zinnen.length - 1) * 120 + 20); ctx.stroke(); }
const DIER = { walvis: (c, x, y, s, a) => bultrug(c, x, y - 20, 0.2 * s, { a }), nijlpaard: (c, x, y, s, a) => nijlpaard(c, x, y, 0.3 * s, { a }), koe: (c, x, y, s, a) => koe7(c, x, y, 0.3 * s, { a }),
  haai: (c, x, y, s, a) => haai(c, x, y - 30, 0.3 * s, { a }), hagedis: (c, x, y, s, a) => hagedis(c, x, y, 0.4 * s, { a }), mens: (c, x, y, s, a) => persoon(c, 'noor', x, y, 150 * s, { a }),
  chimpansee: (c, x, y, s, a) => chimp(c, x, y, s * 0.95, a), krokodil: (c, x, y, s, a) => krokodil(c, x, y, 0.26 * s, { a }), vogel: (c, x, y, s, a) => vogel(c, x, y, 0.36 * s, { a }),
  dolfijn: (c, x, y, s, a) => dolfijn(c, x, y - 30, 0.3 * s, { a }), ichthyosaurus: (c, x, y, s, a) => ichthyosaurus(c, x, y - 30, 0.28 * s, { a }) };
// chimpansee: knokkelloper in zijaanzicht (±1,2 m lang op vier ledematen); armen langer dan benen, donkere vacht, licht gezicht met uitstekende mond, oor groot en rond
// chimpansee: knokkelloper in zijaanzicht. Recept: schouder hoger dan heup (armen langer dan benen), handen op de knokkels, voeten plat met opponeerbare grote teen,
// donkere vacht, licht kaal gezicht met uitstekende mond, wenkbrauwboog, grote ronde oren opzij van de kop. Schouderhoogte ±80 eenheden bij s=1 (mens: persoon h=150 = ±1,6 m).
function chimpOud(ctx, x, y, s = 1, a = 1) { _bd(ctx, x, y, s, 1, a); const v = '#2E2622', vd = '#221C18', g = '#C8A890';
  ledemaat(ctx, [[-34, -52], [-50, -28], [-40, -4]], [18, 11, 9], vd); vul(ctx, [[-50, -6], [-28, -6], [-26, 0], [-52, 0]], vd);
  ledemaat(ctx, [[30, -76], [40, -40], [34, -6]], [16, 10, 9], vd); circ(ctx, 36, -4, 6, vd);
  vul(ctx, [[-48, -50], [-44, -66], [-10, -80], [30, -88], [46, -82], [44, -64], [20, -54], [-20, -44], [-44, -42]], v);
  vul(ctx, [[34, -86], [48, -98], [66, -100], [80, -92], [86, -80], [80, -70], [62, -66], [44, -72]], v);
  vul(ctx, [[62, -96], [78, -94], [90, -84], [92, -74], [80, -68], [64, -70], [58, -82]], g); lijn(ctx, [[62, -92], [76, -94], [84, -88]], _dk(g, 0.4), 2.5);
  circ(ctx, 46, -88, 7, g, _dk(g, 0.2), 1.5); dierOog(ctx, 74, -86, 2.6, '#4A2A14'); lijn(ctx, [[90, -74], [80, -72]], '#4A3028', 1.5); circ(ctx, 88, -80, 1.2, '#4A3028');
  ledemaat(ctx, [[-26, -50], [-42, -26], [-32, -4]], [19, 12, 10], v); vul(ctx, [[-42, -6], [-18, -6], [-16, 0], [-44, 0]], v);
  ledemaat(ctx, [[42, -76], [52, -40], [46, -6]], [17, 11, 10], v); circ(ctx, 48, -4, 6.5, v); ctx.restore(); }
const SB8 = {
  e8s01(ctx) { blauw(ctx); evoTag(ctx, 8, 'OPENING'); dolfijn(ctx, 640, 380, 1.3, { t: 1 }); haai(ctx, 1280, 640, 1.3, { kijk: 1, t: 0.6 });
    naamBij(ctx, 'dolfijn', null, 640, 260, 1, 'center'); naamBij(ctx, 'haai', null, 1280, 500, 1, 'center'); evoSchaal(ctx, 'allebei ±2–3 m'); },
  e8s02(ctx) { bord(ctx); evoTag(ctx, 8, 'OPENING'); persoon(ctx, 'visser', 440, 900, 560, { pose: 'wijs', uit: 'praat' });
    dolfijn(ctx, 1280, 330, 0.75); haai(ctx, 1280, 560, 0.75); text(ctx, 'familie?', 1280, 460, fTekst(52, 700), C.goud, 'center'); },
  e8s03(ctx) { titelKaart(ctx, 8, 'Stambomen lezen', ['Is een dolfijn', 'familie van een haai?'], (c) => { dolfijn(c, 1420, 520, 0.8); haai(c, 1420, 760, 0.8); }); },
  e8s04(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN'); const kx = 960, ky = 640; tak(ctx, kx, ky, 700, 340); tak(ctx, kx, ky, 1220, 340); tak(ctx, kx, ky, kx, ky + 120); knoop(ctx, kx, ky, C.goud);
    DIER.walvis(ctx, 700, 300, 1.4, 1); DIER.nijlpaard(ctx, 1220, 300, 1.4, 1); naamBij(ctx, 'walvis', null, 700, 200, 1, 'center'); naamBij(ctx, 'nijlpaard', null, 1220, 200, 1, 'center');
    naamBij(ctx, 'cladogram', null, 160, 220, 1, 'left', C.goud); },
  e8s05(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN'); const kx = 960, ky = 640; tak(ctx, kx, ky, 1220, 340, { a: 0.35 }); tak(ctx, kx, ky, 700, 340, { kleur: C.goud, lw: 7 }); tak(ctx, kx, ky, kx, ky + 160, { kleur: C.goud, lw: 7 }); knoop(ctx, kx, ky, C.goud, 12);
    DIER.walvis(ctx, 700, 300, 1.4, 1); DIER.nijlpaard(ctx, 1220, 300, 1.4, 0.35); naamBij(ctx, 'gemeenschappelijke voorouder', 'een populatie die splitste', kx + 30, ky + 50, 1, 'left', C.goud);
    naamBij(ctx, 'afstammingslijn', null, 660, 560, 1, 'right', C.goud); },
  e8s06(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN'); const r = 780, n = 560; tak(ctx, r, r - 0, 400, 300); tak(ctx, r, r, n + 400, n); tak(ctx, n + 400, n, 800, 300); tak(ctx, n + 400, n, 1220, 300); tak(ctx, r, r, r, r + 80);
    knoop(ctx, r, r, C.teal); knoop(ctx, n + 400, n, C.goud);
    DIER.koe(ctx, 400, 260, 1.3, 1); DIER.walvis(ctx, 800, 260, 1.3, 1); DIER.nijlpaard(ctx, 1220, 260, 1.3, 1); [['koe', 400], ['walvis', 800], ['nijlpaard', 1220]].forEach(([nm, x]) => naamBij(ctx, nm, null, x, 160, 1, 'center'));
    naamBij(ctx, 'jongste gemeenschappelijke voorouder', 'walvis en nijlpaard', 1000, 640, 1, 'left', C.goud); naamBij(ctx, 'oudere voorouder', 'alle drie', 810, 830, 1, 'left', C.teal); },
  e8q07(ctx) { vraagKaart(ctx, ['In deze boom staat de walvis naast de koe.', 'Wie is het nauwst verwant aan de walvis?'], ['Het nijlpaard', 'De koe: die staat er het dichtst naast', 'Dat verschilt per tekening'], 8);
    cladogram(ctx, 1555, 900, 320, 300, [['nijlpaard', 'walvis'], 'koe'], { px: 32 }); },
  e8s08(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN');
    cladogram(ctx, 200, 820, 560, 400, ['koe', ['walvis', 'nijlpaard']], { px: 36, a: 0.45 }); pijl(ctx, 860, 600, 1040, 600, C.line, 1, 4, 18);
    cladogram(ctx, 1160, 820, 560, 400, [['nijlpaard', 'walvis'], 'koe'], { px: 36, markeer: ['walvis', 'nijlpaard'] });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1160 + 140, 820 - 400 + 140, 50, -2.6, -0.5); ctx.stroke(); pijl(ctx, 1160 + 140 + 46, 820 - 400 + 140 - 24, 1160 + 140 + 50, 820 - 400 + 140 - 8, C.goud, 1, 3, 14);
    naamBij(ctx, 'zelfde boom', 'takken gedraaid', 960, 200, 1, 'center', C.goud); naamBij(ctx, 'lees de vertakkingen, niet de volgorde', null, 960, 900 - 20, 1, 'center'); },
  e8s09(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN'); const kx = 960, ky = 680; tak(ctx, kx, ky, 680, 360); tak(ctx, kx, ky, 1240, 360); tak(ctx, kx, ky, kx, ky + 120); knoop(ctx, kx, ky);
    DIER.chimpansee(ctx, 680, 320, 1.3, 1); DIER.mens(ctx, 1240, 330, 1, 1); naamBij(ctx, 'chimpansee', null, 680, 160, 1, 'center'); naamBij(ctx, 'mens', null, 1240, 160, 1, 'center');
    pijl(ctx, 800, 260, 1100, 260, C.koraal, 1, 5, 20); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(900, 200); ctx.lineTo(1000, 320); ctx.moveTo(1000, 200); ctx.lineTo(900, 320); ctx.stroke();
    naamBij(ctx, 'geen voorouder van elkaar', null, 950, 400, 1, 'center', C.koraal); },
  e8s10(ctx) { schema(ctx, 'EEN STAMBOOM LEZEN'); const kx = 960, ky = 680; tak(ctx, kx, ky, 680, 360); tak(ctx, kx, ky, 1240, 360); tak(ctx, kx, ky, kx, ky + 120); knoop(ctx, kx, ky, C.goud, 12);
    DIER.chimpansee(ctx, 680, 320, 1.3, 1); DIER.mens(ctx, 1240, 330, 1, 1); naamBij(ctx, 'chimpansee', null, 680, 160, 1, 'center'); naamBij(ctx, 'mens', null, 1240, 160, 1, 'center');
    naamBij(ctx, 'gemeenschappelijke voorouder', 'ongeveer 6 tot 8 miljoen jaar geleden', kx, ky + 70, 1, 'center', C.goud);
    naamBij(ctx, 'even lange takken', 'evenveel tijd om te veranderen', 1180, 560, 1, 'left'); },
  e8s11(ctx) { schema(ctx, 'KENMERKEN OP DE TAKKEN'); const r = [760, 840], k = [1060, 620];
    tak(ctx, r[0], r[1], 420, 360); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 860, 360); tak(ctx, k[0], k[1], 1300, 360); tak(ctx, r[0], r[1], r[0], r[1] + 60); knoop(ctx, r[0], r[1]); knoop(ctx, k[0], k[1]);
    DIER.haai(ctx, 420, 320, 1.2, 1); DIER.hagedis(ctx, 860, 320, 1.3, 1); DIER.mens(ctx, 1300, 330, 0.9, 1); [['haai', 420], ['hagedis', 860], ['mens', 1300]].forEach(([n, x]) => naamBij(ctx, n, null, x, 160, 1, 'center'));
    kenmerkStreep(ctx, r[0], r[1], k[0], k[1], 0.5, 'vier poten'); },
  e8s12(ctx) { schema(ctx, 'KENMERKEN OP DE TAKKEN'); const r = [760, 840], k = [1060, 620];
    tak(ctx, r[0], r[1], 420, 360); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 860, 360); tak(ctx, k[0], k[1], 1300, 360); tak(ctx, r[0], r[1], r[0], r[1] + 60); knoop(ctx, r[0], r[1]); knoop(ctx, k[0], k[1]);
    DIER.haai(ctx, 420, 320, 1.2, 1); DIER.hagedis(ctx, 860, 320, 1.3, 1); DIER.mens(ctx, 1300, 330, 0.9, 1); [['haai', 420], ['hagedis', 860], ['mens', 1300]].forEach(([n, x]) => naamBij(ctx, n, null, x, 160, 1, 'center'));
    kenmerkStreep(ctx, r[0], r[1] + 60, r[0], r[1], 0.4, 'wervelkolom', { kleur: C.text, kant: 'left' }); kenmerkStreep(ctx, r[0], r[1], k[0], k[1], 0.5, 'vier poten', { kleur: C.text }); kenmerkStreep(ctx, k[0], k[1], 1300, 360, 0.35, 'haar en melk');
    roundRect(ctx, 1200, 120, 200, 260, 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.stroke(); ctx.setLineDash([]); naamBij(ctx, 'elk nieuw kenmerk:', 'kleinere groep', 1500, 560, 1, 'left'); },
  e8s13(ctx) { schema(ctx, 'KENMERKEN OP DE TAKKEN'); const r = [760, 840], k = [1060, 620];
    tak(ctx, r[0], r[1], 420, 360, { kleur: C.text2 }); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 860, 360); tak(ctx, k[0], k[1], 1300, 360); tak(ctx, r[0], r[1], r[0], r[1] + 60); knoop(ctx, r[0], r[1]); knoop(ctx, k[0], k[1]);
    DIER.haai(ctx, 420, 320, 1.2, 1); DIER.hagedis(ctx, 860, 320, 1.3, 1); DIER.mens(ctx, 1300, 330, 0.9, 1);
    roundRect(ctx, 250, 140, 340, 280, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); naamBij(ctx, 'buitengroep', 'laat zien wat oud is', 230, 470, 1, 'right', C.goud);
    kenmerkStreep(ctx, r[0], r[1] + 60, r[0], r[1], 0.4, 'wervelkolom', { kleur: C.text, kant: 'left', meta: 'oud: ook bij de haai' }); },
  e8s14(ctx) { macroNacht(ctx, { horizon: 600 }); evoTag(ctx, 8, 'KENMERKEN OP DE TAKKEN'); ctx.fillStyle = C.water; ctx.fillRect(0, 760, W, 140);
    krokodil(ctx, 440, 780, 0.9); hagedis(ctx, 1040, 780, 0.75); vogel(ctx, 1560, 790, 1.15);
    naamBij(ctx, 'krokodil', 'schubben · eieren', 440, 640, 1, 'center'); naamBij(ctx, 'hagedis', 'schubben · eieren', 1040, 680, 1, 'center'); naamBij(ctx, 'vogel', 'veren · vleugels', 1360, 340, 1, 'right'); evoSchaal(ctx, 'niet op schaal'); },
  e8q15(ctx) { vraagKaart(ctx, 'Wie is nauwer verwant aan de krokodil?', ['De hagedis: die lijkt er het meest op', 'Ze zijn alle drie even nauw verwant', 'De vogel'], 8);
    krokodil(ctx, 1640, 420, 0.42); hagedis(ctx, 1640, 600, 0.5); vogel(ctx, 1640, 890, 0.55); },
  e8s16(ctx) { schema(ctx, 'KENMERKEN OP DE TAKKEN'); const r = [760, 840], k = [1060, 620];
    tak(ctx, r[0], r[1], 420, 360); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 860, 360); tak(ctx, k[0], k[1], 1300, 360); tak(ctx, r[0], r[1], r[0], r[1] + 60); knoop(ctx, r[0], r[1]); knoop(ctx, k[0], k[1], C.goud, 12);
    DIER.hagedis(ctx, 420, 320, 1.3, 1); DIER.krokodil(ctx, 860, 320, 1.2, 1); DIER.vogel(ctx, 1300, 340, 1, 1); [['hagedis', 420], ['krokodil', 860], ['vogel', 1300]].forEach(([n, x]) => naamBij(ctx, n, null, x, 160, 1, 'center'));
    kenmerkStreep(ctx, r[0], r[1], k[0], k[1], 0.3, 'hart met vier kamers'); kenmerkStreep(ctx, r[0], r[1], k[0], k[1], 0.62, 'spiermaag'); naamBij(ctx, '+ DNA wijst dezelfde kant op', null, 1160, 520, 1, 'left', C.goud); },
  e8s17(ctx) { schema(ctx, 'KENMERKEN OP DE TAKKEN'); const r = [760, 840], k = [1060, 620];
    tak(ctx, r[0], r[1], 420, 360); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 860, 360); tak(ctx, k[0], k[1], 1300, 360); tak(ctx, r[0], r[1], r[0], r[1] + 90); knoop(ctx, r[0], r[1]); knoop(ctx, k[0], k[1]);
    DIER.hagedis(ctx, 420, 320, 1.3, 1); DIER.krokodil(ctx, 860, 320, 1.2, 1); DIER.vogel(ctx, 1300, 340, 1, 1);
    kenmerkStreep(ctx, r[0], r[1] + 90, r[0], r[1], 0.5, 'schubben', { kleur: C.text, kant: 'left', meta: 'oud kenmerk: zegt niets' }); kenmerkStreep(ctx, r[0], r[1], k[0], k[1], 0.5, 'nieuw kenmerk', { meta: 'dit telt' });
    naamBij(ctx, 'veren: vervormde schubben', null, 1300, 160, 0.6, 'center'); },
  e8s18(ctx) { schema(ctx, 'DEZELFDE VORM, ANDERE TAK'); haai(ctx, 560, 420, 1.35, { rontgen: 1 }); dolfijn(ctx, 1380, 420, 1.35, { rontgen: 1 });
    naamBij(ctx, 'haai', 'kraakbeen · kieuwen', 560, 230, 1, 'center'); naamBij(ctx, 'dolfijn', 'botten · longen', 1380, 230, 1, 'center');
    naamBij(ctx, 'kraakbeenstralen', null, 560, 640, 1, 'center'); naamBij(ctx, 'opperarm · onderarm · hand', null, 1300, 640, 1, 'center', C.goud); },
  e8s19(ctx) { blauw(ctx); evoTag(ctx, 8, 'DEZELFDE VORM, ANDERE TAK'); haai(ctx, 420, 300, 0.85, { a: 0.6 }); ichthyosaurus(ctx, 960, 500, 1.3); dolfijn(ctx, 1500, 720, 0.85, { a: 0.6 });
    naamBij(ctx, 'ichthyosaurus', 'reptiel · uit de tijd van de dinosauriërs', 960, 360, 1, 'center', C.goud); evoSchaal(ctx, 'alle drie ±2–3 m · reconstructie ichthyosaurus'); },
  e8q20(ctx) { vraagKaart(ctx, 'Waarom hebben haai, dolfijn en ichthyosaurus bijna dezelfde vorm?', ['Ze erfden die vorm van één voorouder die al zo zwom', 'Ze kregen die vorm los van elkaar, door dezelfde selectiedruk in water', 'Ze pasten zich aan omdat ze snel moesten zwemmen'], 8);
    haai(ctx, 1680, 480, 0.42, { a: 0.8 }); dolfijn(ctx, 1680, 620, 0.42, { a: 0.8 }); ichthyosaurus(ctx, 1680, 760, 0.38, { a: 0.8 }); },
  e8s21(ctx) { schema(ctx, 'DEZELFDE VORM, ANDERE TAK'); ctx.save(); ctx.translate(0, -20); const r = [520, 860], v = [900, 720], am = [1240, 560];
    tak(ctx, r[0], r[1], 260, 300); tak(ctx, r[0], r[1], v[0], v[1]); tak(ctx, v[0], v[1], 640, 300, { a: 0.5 }); tak(ctx, v[0], v[1], am[0], am[1]); tak(ctx, am[0], am[1], 1000, 300, { a: 0.5 }); tak(ctx, am[0], am[1], 1460, 420); tak(ctx, 1460, 420, 1340, 300); tak(ctx, 1460, 420, 1640, 300); tak(ctx, r[0], r[1], r[0], r[1] + 60);
    [r, v, am, [1460, 420]].forEach(p => knoop(ctx, p[0], p[1]));
    DIER.haai(ctx, 260, 270, 1.15, 1); DIER.ichthyosaurus(ctx, 1340, 270, 1.15, 1); DIER.dolfijn(ctx, 1640, 270, 1.1, 1); naamBij(ctx, 'beenvissen', null, 640, 270, 0.5, 'center'); naamBij(ctx, 'amfibieën', null, 1000, 270, 0.5, 'center');
    naamBij(ctx, 'haai', 'kraakbeenvis', 260, 170, 1, 'center'); naamBij(ctx, 'ichthyosaurus', 'reptiel', 1340, 150, 1, 'center'); naamBij(ctx, 'dolfijn', 'zoogdier', 1660, 150, 1, 'center');
    naamBij(ctx, 'voorouder op vier poten', 'liep op het land', am[0] + 40, am[1] + 60, 1, 'left', C.goud); knoop(ctx, am[0], am[1], C.goud, 12); ctx.restore(); metaText(ctx, 'vereenvoudigd: niet alle groepen getekend', W - 80, 880, C.text2, 'right', 26); },
  e8s22(ctx) { schema(ctx, 'DEZELFDE VORM, ANDERE TAK'); const rij = (y, fn, naam) => { for (let i = 0; i < 4; i++) { const f = i / 3; ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * f; ctx.translate(560 + i * 340, y); ctx.scale(1, 1 - 0.45 * (1 - f)); fn(0, 0); ctx.restore(); } naamBij(ctx, naam, null, 120, y + 14, 1, 'left'); };
    rij(300, (x, y) => haai(ctx, x, y, 0.42), 'haaien'); rij(530, (x, y) => ichthyosaurus(ctx, x, y, 0.4), 'ichthyosaurussen'); rij(760, (x, y) => dolfijn(ctx, x, y, 0.42), 'dolfijnen');
    pijl(ctx, 300, 860, 1600, 860, C.line, 1, 3, 16); metaText(ctx, 'generaties', 1600, 900, C.text2, 'right', 26); naamBij(ctx, 'meer nakomelingen met een gladdere vorm', null, 1760, 180, 1, 'right', C.groen); },
  e8s23(ctx) { schema(ctx, 'DEZELFDE VORM, ANDERE TAK'); haai(ctx, 380, 460, 0.75, { rontgen: 1 }); ichthyosaurus(ctx, 960, 460, 0.7); dolfijn(ctx, 1540, 460, 0.75, { rontgen: 1 });
    naamBij(ctx, 'haai', null, 380, 320, 1, 'center'); naamBij(ctx, 'ichthyosaurus', null, 960, 320, 1, 'center'); naamBij(ctx, 'dolfijn', null, 1540, 320, 1, 'center');
    naamBij(ctx, 'analoge organen', 'zelfde functie · andere bouw', 960, 180, 1, 'center', C.goud); haak(ctx, 200, 1720, 620, 'convergente evolutie: dezelfde selectiedruk, niet nauw verwant', C.groen); },
  e8s24(ctx) { schema(ctx, 'DEZELFDE VORM, ANDERE TAK'); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 200); ctx.lineTo(960, 820); ctx.stroke();
    armSkelet(ctx, 'mens', 200, 280, 380, { huid: 0.3 }); armSkelet(ctx, 'vleermuis', 330, 280, 380, { huid: 0.3 }); armSkelet(ctx, 'walvis', 680, 280, 380, { huid: 0.3 }); armSkelet(ctx, 'paard', 840, 280, 380, { huid: 0.3 });
    haai(ctx, 1240, 360, 0.5); ichthyosaurus(ctx, 1600, 520, 0.48); dolfijn(ctx, 1240, 680, 0.5);
    naamBij(ctx, 'homoloog', 'wijst op verwantschap', 520, 210, 1, 'center', C.goud); naamBij(ctx, 'analoog', 'zegt niets over verwantschap', 1440, 210, 1, 'center');
    haak(ctx, 160, 900, 760, 'bouw en DNA tellen, niet het uiterlijk', C.goud); },
  e8s25(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); naamVak(ctx, 160, 220, 1600, 600, 'geslacht', 'Panthera', { nadruk: true });
    leeuw(ctx, 620, 720, 0.95); tijger(ctx, 1320, 720, 1.02); naamBij(ctx, 'leeuw', null, 620, 790, 1, 'center'); naamBij(ctx, 'tijger', null, 1320, 790, 1, 'center'); evoSchaal(ctx, 'leeuw ±2 m · tijger ±2,2 m (zonder staart)'); },
  e8s26(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); const lv = [['rijk', 'dieren'], ['stam', 'gewervelde dieren'], ['klasse', 'zoogdieren'], ['orde', 'roofdieren'], ['familie', 'katachtigen']];
    lv.forEach(([n, m], i) => { const x = 100 + i * 60, y = 110 + i * 100; roundRect(ctx, x, y, 1720 - i * 120, 790 - i * 100, 22); ctx.fillStyle = rgba(C.fill, 0.22); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
      metaText(ctx, n, x + 24, y + 42, C.grain, 'left', 26); text(ctx, m, x + 24 + 170, y + 44, fTekst(38, 600), C.text, 'left'); });
    naamVak(ctx, 420, 620, 760, 260, 'geslacht', 'Panthera', { nadruk: true }); leeuw(ctx, 680, 860, 0.36); tijger(ctx, 1000, 860, 0.39); huiskat(ctx, 1480, 860, 0.2); naamBij(ctx, 'huiskat', 'geslacht Felis', 1480, 760, 1, 'center'); },
  e8s27(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); naamVak(ctx, 160, 200, 1600, 640, 'geslacht', 'Panthera');
    naamVak(ctx, 220, 320, 720, 480, 'soort', 'leeuw', { nadruk: true }); naamVak(ctx, 980, 320, 720, 480, 'soort', 'tijger', { nadruk: true });
    leeuw(ctx, 580, 760, 0.62); tijger(ctx, 1340, 760, 0.66); naamBij(ctx, 'soort: in de natuur samen vruchtbare nakomelingen', null, 960, 900 - 20, 1, 'center'); },
  e8q28(ctx) { vraagKaart(ctx, ['De leeuw heet Panthera leo, de tijger Panthera tigris.', 'Wat zegt het eerste woord?'], ['De soort', 'De familie', 'Het geslacht'], 8);
    ctx.save(); ctx.font = 'italic 600 52px "Source Sans 3", sans-serif'; ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.fillText('Panthera leo', 1640, 560); ctx.fillText('Panthera tigris', 1640, 660); ctx.restore(); },
  e8s29(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); const nm = (x, y, g, s2) => { ctx.save(); ctx.font = 'italic 600 88px "Source Sans 3", sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = C.goud; ctx.fillText(g, x, y); const w = ctx.measureText(g + ' ').width; ctx.fillStyle = C.text; ctx.fillText(s2, x + w, y); ctx.restore(); return w; };
    const w = nm(360, 420, 'Panthera', 'leo'); nm(360, 640, 'Panthera', 'tigris');
    naamBij(ctx, 'geslachtsnaam', 'hoofdletter', 360, 480, 1, 'left', C.goud); naamBij(ctx, 'soortaanduiding', null, 360 + w, 480, 1, 'left');
    leeuw(ctx, 1500, 470, 0.45); tijger(ctx, 1500, 690, 0.48); haak(ctx, 360, 1000, 720, 'samen: de naam van de soort', C.groen); naamBij(ctx, 'binomiale naamgeving', 'twee woorden', 360, 220, 1, 'left', C.goud); },
  e8s30(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); roundRect(ctx, 520, 240, 880, 560, 18); shape(ctx, '#E8E0CC', '#B8A888', 3); ctx.strokeStyle = '#B8A888'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(960, 250); ctx.lineTo(960, 790); ctx.stroke();
    ctx.save(); ctx.fillStyle = '#2A2420'; ctx.textAlign = 'center'; ctx.font = '700 44px "Fraunces", serif'; ctx.fillText('Systema Naturae', 740, 380); ctx.font = '500 36px "Source Sans 3", sans-serif'; ctx.fillText('1758', 740, 440);
    ctx.font = 'italic 700 56px "Source Sans 3", sans-serif'; ctx.fillText('Homo sapiens', 1180, 470); ctx.font = '500 32px "Source Sans 3", sans-serif'; ctx.fillText('de wijze mens', 1180, 530); ctx.restore();
    naamBij(ctx, 'Carl Linnaeus', 'voor dieren vanaf het jaar 1758', 960, 180, 1, 'center'); naamBij(ctx, 'Homo = geslacht', null, 1180, 880, 1, 'center', C.goud); },
  e8s31(ctx) { schema(ctx, 'NAMEN EN GROEPEN'); naamVak(ctx, 120, 200, 980, 640, 'familie', 'katachtigen'); naamVak(ctx, 170, 330, 560, 480, 'geslacht', 'Panthera', { nadruk: true }); naamVak(ctx, 770, 330, 290, 480, 'geslacht', 'Felis');
    leeuw(ctx, 330, 720, 0.34); tijger(ctx, 560, 720, 0.37); huiskat(ctx, 910, 720, 0.16);
    const r = [1480, 800], k = [1360, 560]; tak(ctx, r[0], r[1], 1720, 300); tak(ctx, r[0], r[1], k[0], k[1]); tak(ctx, k[0], k[1], 1240, 300); tak(ctx, k[0], k[1], 1480, 300); knoop(ctx, r[0], r[1], C.teal); knoop(ctx, k[0], k[1], C.goud, 12);
    naamBij(ctx, 'leeuw', null, 1240, 270, 1, 'center'); naamBij(ctx, 'tijger', null, 1480, 270, 1, 'center'); naamBij(ctx, 'huiskat', null, 1720, 270, 1, 'center');
    naamBij(ctx, 'kleinste gedeelde groep = jongste voorouder', null, 1460, 900 - 20, 1, 'center', C.goud); },
  e8s32(ctx) { eindKaart8(ctx, ['Dolfijn en haai: heel ver familie. Stroomlijn en rugvin zijn analoog.', 'Lees een stamboom aan de vertakkingen, niet aan de namen.', 'Gedeelde nieuwe kenmerken, bouw en DNA tonen verwantschap.']); },
};
