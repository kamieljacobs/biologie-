// Wat word jij? · Voeding en diëtetiek 3 · Een burger zonder koe — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Noor, stagiair; Levensmiddelentechnoloog Lars). Decor 'proeffabriek' alleen in de cold open, de pan- en extruderopener van H3 (s15),
// het proeven in H4 (s19) en de recap; alle uitleg op navy. Het ontwerpblad alleen aan het eind van elk hoofdstuk en in de recap (keuring).
// Kleuren: oker = eiwit/voedsel, groen = plantaardig, koraal = dierlijk en hitte, teal = water, pH en koel, goud = focus.

const lars = (ctx, x, t, o = {}) => persoon(ctx, 'lars', x, o.y || GROND, o.h || 450, { t, kijk: o.kijk || 1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: o.outfit || 'fabriek', a: o.a == null ? 1 : o.a });
const noor = (ctx, x, t, o = {}) => persoon(ctx, 'noor', x, o.y || GROND, o.h || 440, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: o.outfit || 'fabriek', a: o.a == null ? 1 : o.a });
function lijstje(ctx, hp, a = 1) { if (!hp || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(hp.x, hp.y); ctx.rotate(-0.15); roundRect(ctx, -30, -70, 70, 92, 6); shape(ctx, '#8A6A4A', '#B08A64', 2); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-24, -60, 58, 76); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(-18, -46 + k * 13); ctx.lineTo(26, -46 + k * 13); ctx.stroke(); } ctx.restore(); }
function reepjeHand(ctx, hp, a = 1) { if (!hp || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(hp.x, hp.y - 10); ctx.rotate(-0.5); roundRect(ctx, -10, -40, 60, 18, 6); shape(ctx, '#C9A86A', '#E2CC9A', 1.5); ctx.restore(); }
// H1-indeling (s04, s06): kudde links, bak voereiwit, bak vlees, kip rechts
const KUD = { g: 640, P: 1.05 }, BA = { x: 820, y: 340, w: 380, h: 360 }, BB = { x: 1290, y: 440, w: 230, h: 220 };
function kudde(ctx, t, a = 1, hlMoeder = 0) { laag(ctx, a, () => { wei(ctx, 90, 760, KUD.g - 6); rund(ctx, 'vlees', 220, KUD.g, KUD.P, { kijk: 1, t }); rund(ctx, 'vlees', 470, KUD.g, KUD.P * 0.98, { kijk: 1, t, houding: 'grazen', uier: 0.9 }); rund(ctx, 'vleeskalf', 650, KUD.g, KUD.P * 0.55, { kijk: -1, t });
  if (hlMoeder > 0.01) { ctx.save(); ctx.globalAlpha *= hlMoeder; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(545, KUD.g - 75, 175, 105, 0, 0, 6.283); ctx.stroke(); ctx.restore(); naamBij(ctx, 'moederkoe met kalf', '', 545, KUD.g + 70, hlMoeder, 'center', C.goud); } }); }
const blokPos = (i) => BLOKPOS(BA.x, BA.y, i);
const VLEES3 = [44, 45, 46];
const bblok = (k) => [BB.x + 70 + k * 40, BB.y + BB.h - 36];
const DEST = [[330, 780], [790, 780], [1250, 780], [540, 520]];

Object.assign(SCENES, {
  title(ctx, t) { rvsTafel(ctx, 1080, 1800, 660, 0.0); bordje(ctx, 1230, 640); burger(ctx, 1230, 636, 1, 'ham'); bordje(ctx, 1620, 640); burger(ctx, 1620, 636, 1, 'erwt'); erwtjes(ctx, 1760, 660, 6, 10);
    etiketje(ctx, 1230, 520, '20 G EIWIT'); etiketje(ctx, 1620, 520, '20 G EIWIT'); metaText(ctx, 'STEL · PER 100 G', 1425, 440, C.grain, 'center', 28);
    text(ctx, 'hamburger', 1230, 730, fTekst(36, 700), C.koraal, 'center'); text(ctx, 'erwtenburger', 1620, 730, fTekst(36, 700), C.groen, 'center'); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'proeffabriek', 0.6); const tL = q.at('legt', 1), V = q.on('Is', 1, 0.5), N = 1 - q.on('Stel', 1, 0.6);
    const hL = lars(ctx, 600, t, { pose: t > tL - 0.2 && t < q.at('neer', 1) + 0.3 ? 'vasthouden' : (q.on('Stel', 1) > 0.5 && V < 0.5 ? 'wijs' : 'staan'), uit: 'blij' });
    noor(ctx, 1520, t, { uit: V > 0.5 ? 'verbaasd' : 'blij', pose: V > 0.5 ? 'denk' : 'staan', a: ramp(t, 0, 0.3) });
    rvsTafel(ctx, 760, 1360, 640);
    const H = q.on('hamburger', 1, 0.4), E = q.on('erwtenburger', 1, 0.4);
    laag(ctx, H, () => { bordje(ctx, 920, 640); burger(ctx, 920, 636 - (1 - H) * 30, 1, 'ham'); naamBij(ctx, 'hamburger', '', 920, 720, 1, 'center', C.koraal); });
    laag(ctx, E, () => { bordje(ctx, 1200, 640); burger(ctx, 1200, 636 - (1 - E) * 30, 1, 'erwt'); erwtjes(ctx, 1320, 630, 5, 9); naamBij(ctx, 'erwtenburger', '', 1200, 720, 1, 'center', C.groen); });
    const Et = q.on('etiket', 1, 0.5); etiketje(ctx, 920, 520, '20 G EIWIT', Et); etiketje(ctx, 1200, 520, '20 G EIWIT', Et); metaA(ctx, 'STEL · PER 100 G', 1060, 420, q.on('Stel', 1), C.grain, 'center', 28);
    naamBij(ctx, 'Lars', 'LEVENSMIDDELENTECHNOLOOG', 600, 320, N * ramp(t, 0.1, 0.4), 'center'); naamBij(ctx, 'Noor', 'STAGIAIR', 1520, 330, N * ramp(t, 0.1, 0.4), 'center');
    laag(ctx, V, () => { kaart(ctx, 330, 120, 1260, 190, 1, C.goud); text(ctx, 'Is de erwtenburger dan net zo goed?', 380, 236, fTekst(56, 800), C.text, 'left'); vraagteken(ctx, 1510, 270, 1, 110); }); },

  // ---------- H1 Waarom minder vlees? ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const Hf = q.on('helft', 1, 0.8), D = q.on('dieren', 1), Dr = q.on('dier', 2, 0.5);
    metaText(ctx, 'EIWIT DAT WIJ ETEN · NEDERLAND', 260, 210, C.text2, 'left', 28);
    ctx.save(); roundRect(ctx, 260, 240, 1400, 60, 8); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.restore(); staafNL(ctx, 260, 240, 1400, 1, Hf);
    metaA(ctx, 'RIVM · VCP 2019–2021', 1660, 350, Hf, C.text2, 'right', 28);
    laag(ctx, 1 - Dr, () => { bordje(ctx, 760, 620); burger(ctx, 760, 616, 1, 'ham'); bordje(ctx, 1160, 620); burger(ctx, 1160, 616, 1, 'erwt'); naamBij(ctx, 'hamburger', '', 760, 700, 1, 'center', C.koraal); naamBij(ctx, 'erwtenburger', '', 1160, 700, 1, 'center', C.groen);
      laag(ctx, D, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(760, 600, 170, 80, 0, 0, 6.283); ctx.stroke(); }); });
    laag(ctx, Dr, () => { wei(ctx, 300, 1500, 760); rund(ctx, 'vlees', 900, 760, 1.6, { kijk: 1, t, houding: q.on('eten', 2) > 0.5 ? 'grazen' : 'staan' }); bak(ctx, 1180, 650, 260, 110); for (let i = 0; i < 18; i++) blokje(ctx, 1220 + (i % 9) * 22, 735 - Math.floor(i / 9) * 22, 18, C.oker);
      naamBij(ctx, 'voer', '', 1310, 630, 1, 'center', C.oker); }); },

  s04(ctx, t, q) { bg(ctx, 'schema'); kudde(ctx, t, 1); naamBij(ctx, 'vleesrunderen', '', 420, 380, q.on('vleesrunderen', 1), 'center', C.koraal);
    const Hd = q.at('honderd', 1); bak(ctx, BA.x, BA.y, BA.w, BA.h, 1); for (let i = 0; i < 100; i++) { const [x, y] = blokPos(i); blokje(ctx, x, y, 24, C.oker, ramp(t, Hd - 0.6 + i * 0.006, 0.25)); }
    pil(ctx, 'voereiwit 100 g', BA.x + BA.w / 2, BA.y - 30, C.oker, q.on('honderd', 1));
    const V = q.on('vlees', 2, 0.5); bak(ctx, BB.x, BB.y, BB.w, BB.h, V); pil(ctx, 'in het vlees?', BB.x + BB.w / 2, BB.y - 30, C.koraal, V); vraagteken(ctx, BB.x + BB.w / 2, BB.y + 160, V, 110); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ongeveer drie gram', 1); const tD = q.at('drie', 1), M = q.on('moederkoeien', 1);
    kudde(ctx, t, 1, M); bak(ctx, BA.x, BA.y, BA.w, BA.h, 1); bak(ctx, BB.x, BB.y, BB.w, BB.h, 1); pil(ctx, 'voereiwit 100 g', BA.x + BA.w / 2, BA.y - 30, C.oker, 1); pil(ctx, 'vlees', BB.x + BB.w / 2, BB.y - 30, C.koraal, 1);
    const cues = [q.at('mest', 1), q.at('brandstof', 1), q.at('botten', 1), q.at('moederkoeien', 1)];
    for (let i = 0; i < 100; i++) { const [x0, y0] = blokPos(i); const k3 = VLEES3.indexOf(i);
      if (k3 >= 0) { const u = ease((t - tD - k3 * 0.15) / 0.9), [x1, y1] = bblok(k3); blokje(ctx, lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * 120, 24, C.oker); continue; }
      const g = Math.floor(hash(i * 2.71) * 4), tg = cues[g] + hash(i * 1.3) * 0.9, u = ease((t - tg) / 1.0), [x1, y1] = DEST[g];
      blokje(ctx, lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * 90, 24 * (1 - 0.5 * u), C.oker, 1 - ramp(t, tg + 0.8, 0.4)); }
    laag(ctx, q.on('honderd', 1), () => text(ctx, '100 g voereiwit  →  ± 3 g vleeseiwit', 820, 240, fTekst(44, 800), C.text, 'left'));
    metaA(ctx, 'O.A.', 200, 742, q.on('mest', 1), C.grain, 'left', 28);
    pil(ctx, 'mest (onverteerd)', DEST[0][0], DEST[0][1] + 10, C.text2, q.on('mest', 1)); pil(ctx, 'brandstof · stikstof in urine', DEST[1][0], DEST[1][1] + 10, C.koraal, q.on('brandstof', 1)); pil(ctx, 'botten, huid, organen', DEST[2][0], DEST[2][1] + 10, C.text2, q.on('botten', 1));
    pil(ctx, 'zij eten ook', 545, 440, C.goud, M);
    const K = q.on('kippen', 1, 0.4); laag(ctx, K, () => { kipEcht(ctx, 1730, KUD.g - 116 * 0.85, 0.85, { t }); naamBij(ctx, 'kip', 'VEEL MEER: ± 20 VAN 100', 1870, 700, 1, 'right'); });
    metaA(ctx, 'VS · SHEPON E.A. 2016 · ANDERE STUDIES: ANDERE GETALLEN, ZELFDE BEELD', 120, 862, q.on('drie', 1), C.text2, 'left', 28);
    filmKaartje(ctx, 1300, 110, 'Waarom zo weinig roofdieren?', q.on('roofdieren', 1)); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const Z = q.on('Zelfs', 1, 0.8), K = q.on('koe', 1, 0.4), G = q.on('Gezondheidsraad', 1), T = q.on('technoloog', 1, 0.5);
    metaText(ctx, 'LAND PER GRAM EIWIT', 160, 250, C.text2, 'left', 28);
    akker(ctx, 160, 300, 130, 130, C.groen, 1); naamBij(ctx, 'erwten', '', 225, 480, 1, 'center', C.groen);
    const s = lerp(130, 318, Z); akker(ctx, 360, 300, s, s, C.koraal, Z); naamBij(ctx, 'zelfs een zuinig rund', 'ZO\'N 6 KEER ZOVEEL', 360 + 159, 680, q.on('rund', 1), 'center', C.koraal);
    metaA(ctx, 'POORE & NEMECEK 2018 · WERELDWIJD', 160, 760, q.on('malen', 1), C.text2, 'left', 28);
    laag(ctx, K * (1 - T), () => { wei(ctx, 900, 1760, 620); rund(ctx, 'vlees', 1300, 620, 1.35, { kijk: -1, t, houding: q.on('eet', 1) > 0.5 ? 'grazen' : 'staan' }); pil(ctx, 'gras: kun jij niet eten', 1300, 340, C.groen, q.on('gras', 1)); });
    laag(ctx, G * (1 - T), () => { kaart(ctx, 900, 690, 880, 150, 1, C.groen); text(ctx, 'Gezondheidsraad:', 940, 752, fTekst(40, 800), C.text, 'left'); text(ctx, 'meer dan de helft van je eiwit uit planten', 940, 806, fTekst(34, 600), C.groen, 'left'); });
    const tT = q.at('technoloog', 1), u = ease((t - tT - 0.3) / 1.0);
    ontwerpblad(ctx, 1160, 130, 640, { a: T, hl: 0, hlA: T, vak: ['erwt', null, null, null], vakA: [ramp(t, tT + 1.3, 0.3), 0, 0, 0] });
    laag(ctx, T * (1 - ramp(t, tT + 1.3, 0.3)), () => vakKaartje(ctx, lerp(1300, 1460, u), lerp(760, 246, u), 'ERWT', '#E2C45A')); },

  // ---------- H2 Eiwit is niet gewoon eiwit ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('negen', 1, 0.8), O = q.on('Onderzoekers', 1);
    const kl = (arr) => arr.map((k) => k < 0 ? -1 : (N > 0.5 ? k : -1));
    naamBij(ctx, 'rund', '', 160, 312, 1, 'left', C.koraal); keten(ctx, golfPad(330, 300, 24, 32, 12, 0.9, t), kl(KET_RUND), 13);
    naamBij(ctx, 'erwt', '', 160, 442, 1, 'left', C.groen); keten(ctx, golfPad(330, 430, 24, 32, 12, 0.9, t + 2), kl(KET_ERWT), 13);
    laag(ctx, N, () => { metaText(ctx, 'NEGEN ESSENTIËLE AMINOZUREN', 160, 550, C.grain, 'left', 28); for (let i = 0; i < 9; i++) { kraal(ctx, 200 + i * 84, 600, 16, i); metaText(ctx, AA_NAAM[i].toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), 200 + i * 84, 650, C.text2, 'center', 28); } });
    filmKaartje(ctx, 160, 720, 'Wat zit er in je eten?', fase(t, q.at('negen', 1), q.at('kijkt', 1) + 0.6));
    laag(ctx, q.on('etiket', 1, 0.4) * (1 - O), () => { etiketje(ctx, 1450, 460, '20 G EIWIT'); text(ctx, 'het getal op het etiket', 1450, 540, fTekst(34, 600), C.text2, 'center'); });
    laag(ctx, O, () => { metaText(ctx, 'EIWITKWALITEIT (DIAAS)', 1120, 300, C.grain, 'left', 28); const yb = 760, hp = 380; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1120, yb); ctx.lineTo(1800, yb); ctx.stroke();
      stippel(ctx, 1120, yb - hp * 100 / 120, 1800, yb - hp * 100 / 120, C.text2, 0.6, 2); metaText(ctx, '100', 1810, yb - hp * 100 / 120 + 10, C.text2, 'left', 28);
      const R = q.on('Rundvlees', 1, 0.6), S = q.on('Soja', 1, 0.6), E = q.on('Erwteneiwit', 1, 0.6);
      diaasStaaf(ctx, 1160, yb, 140, hp, 100, 112, C.koraal, R, R); diaasStaaf(ctx, 1380, yb, 140, hp, 75, 100, C.oker, S, S); diaasStaaf(ctx, 1600, yb, 140, hp, 60, 90, C.groen, E, E);
      text(ctx, 'rund', 1230, yb + 44, fTekst(32, 700), C.koraal, 'center'); text(ctx, 'soja', 1450, yb + 44, fTekst(32, 700), C.oker, 'center'); text(ctx, 'erwt', 1670, yb + 44, fTekst(32, 700), C.groen, 'center');
      metaA(ctx, '≥ 100', 1230, yb - hp * 112 / 120 - 16, R, C.text, 'center', 28); metaA(ctx, '75–100', 1450, yb - hp * 100 / 120 - 16, S, C.text, 'center', 28); metaA(ctx, '60–90', 1670, yb - hp * 90 / 120 - 16, E, C.text, 'center', 28);
      vraagteken(ctx, 1670, yb - hp * 90 / 120 - 70, q.on('Waarom', 1), 90);
      metaA(ctx, 'VOORBEELDWAARDEN · VERSCHILT PER PRODUCT EN STUDIE · FAO-MAAT', 1800, 862, E, C.text2, 'right', 28); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: van één aminozuur zit er weinig in', 1);
    const A = q.on('negen', 1, 1.2), M = q.on('methionine', 1), B = q.on('beperkende', 1), D = q.on('verteert', 1, 0.5), Bl = q.on('bloed', 1), P = q.on('erwten', 2, 0.5);
    metaText(ctx, 'ERWTENEIWIT · SCHEMATISCH', 160, 240, C.grain, 'left', 28);
    bekerRij(ctx, 160, 560, VUL_ERWT.map((v, i) => i === 4 ? v : Math.max(v, 0.9)), 1, { u: 0.15 + 0.85 * A, hl: M > 0.5 ? 4 : null, lijn: 0.42, lijnA: B, w: 56, gap: 74, h: 220 });
    for (let i = 0; i < 9; i++) metaText(ctx, AA_NAAM[i].toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), 188 + i * 74, 604, i === 4 && M > 0.5 ? C.goud : C.text2, 'center', 28);
    naamBij(ctx, 'methionine', 'WEINIG', 484, 300, M * (1 - B), 'center', C.goud); naamBij(ctx, 'beperkend aminozuur', 'HET EERST OP', 484, 300, B, 'center', C.goud);
    laag(ctx, D, () => { const cx = 1330, cy = 420, r = 220; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.clip(); darmWandZoom(ctx, cx, cy, r, t, 1, { frac: 0.72, markeer: Bl, n: 16 }); ctx.restore();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); metaText(ctx, 'DARMWAND · SCHEMATISCH', cx, cy + r + 40, C.grain, 'center', 28);
      naamBij(ctx, 'darm', '', cx - r - 20, cy - 40, 1, 'right', C.text2); naamBij(ctx, 'bloed', '', cx + r + 20, cy - 40, 1, 'left', C.koraal);
      laag(ctx, Bl, () => naamBij(ctx, 'niet verteerd', 'KOMT NOOIT IN JE BLOED', cx, cy + r + 96, 1, 'center', C.text2)); });
    laag(ctx, P, () => { heleErwt(ctx, 240, 760, 40); boon(ctx, 400, 762, 0.85); const tS = q.at('stoffen', 1), vast = ramp(t, q.at('remmen', 1) - 0.2, 0.3); schaar(ctx, 700, 760, 2.2, vast > 0.5 ? 0.12 : 0.5 + 0.45 * Math.sin(t * 6), C.text, 1);
      for (let i = 0; i < 3; i++) { const u = ease((t - tS - 0.2 - i * 0.25) / 1.4), x0 = 250 + i * 70, y0 = 690 - (i % 2) * 18, x1 = 740 + i * 22, y1 = 760 + (i - 1) * 6; remmer(ctx, lerp(x0, x1, u) + Math.sin(t + i) * 3 * (1 - u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * 60, 22, q.on('stoffen', 1, 0.3), i * 0.4); }
      metaA(ctx, 'REMMERS · IN HELE PEULVRUCHTEN', 160, 856, q.on('stoffen', 1, 0.3), C.groen, 'left', 28); naamBij(ctx, 'eiwitschaar', 'GEREMD', 820, 720, q.on('eiwitscharen', 1), 'left'); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('gram', 1), S = q.on('score', 1), K = q.on('keuze', 1, 0.5);
    metaText(ctx, 'ERWTENEIWIT', 160, 240, C.grain, 'left', 28); bekerRij(ctx, 160, 480, VUL_ERWT, 1, { hl: 4, w: 48, gap: 64, h: 180 });
    laag(ctx, S, () => { const yb = 480, hp = 260; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1300, yb); ctx.lineTo(1760, yb); ctx.stroke(); diaasStaaf(ctx, 1340, yb, 140, hp, 100, 112, C.koraal); diaasStaaf(ctx, 1560, yb, 140, hp, 60, 90, C.groen);
      text(ctx, 'rund', 1410, yb + 44, fTekst(32, 700), C.koraal, 'center'); text(ctx, 'erwt', 1630, yb + 44, fTekst(32, 700), C.groen, 'center'); metaText(ctx, 'SCORE PER GRAM', 1300, 190, C.grain, 'left', 28);
      vraagteken(ctx, 1630, yb - hp * 90 / 120 - 30, q.on('omhoog', 1), 90); });
    const kaarten = [['meer erwteneiwit', (x, y) => { schep(ctx, x - 20, y, 0.9, '#E2CC8A'); }], ['tarwe-eiwit erbij', (x, y) => tarweAar(ctx, x, y + 10, 0.7)], ['fijner malen', (x, y) => molen(ctx, x, y + 60, 0.55, 1, t, 0)]];
    kaarten.forEach(([s2, ic], i) => { const a = ramp(t, q.at('keuze', 1) + i * 0.25, 0.4); if (a <= 0.01) return; const x = 200 + i * 540; kaart(ctx, x, 620, 480, 170, a); laag(ctx, a, () => { ic(x + 90, 700); text(ctx, s2, x + 180, 716, fTekst(36, 700), C.text, 'left'); }); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: er eiwit uit tarwe door mengen', 1);
    const T = q.on('Tarwe', 1), An = q.on('andersom', 1), Vh = q.on('verhouding', 1, 0.8), tM = q.at('Meer', 2), tF = q.at('fijner', 1), tE = q.at('Evenveel', 1);
    const LA = 1 - ramp(t, tM - 0.4, 0.4), LB = fase(t, tM - 0.2, tF + 0.1, 0.4), LC = fase(t, tF - 0.2, tE + 0.1, 0.4), D = ramp(t, tE - 0.2, 0.5), R = 1 - D;
    laag(ctx, LA, () => { naamBij(ctx, 'erwt', '', 160, 210, 1, 'left', C.groen); bekerRij(ctx, 160, 380, VUL_ERWT, 1, { hl: An > 0.5 ? 4 : null, w: 44, gap: 60, h: 140 });
      laag(ctx, T, () => { naamBij(ctx, 'tarwe', '', 160, 470, 1, 'left', C.oker); bekerRij(ctx, 160, 640, VUL_TARWE, 1, { hl: q.on('lysine', 1) > 0.5 ? 3 : null, w: 44, gap: 60, h: 140 }); tarweAar(ctx, 760, 560, 0.75);
        metaA(ctx, 'MEER MET · WEINIG LYS', 290, 470, q.on('lysine', 1), C.text2, 'left', 28); metaA(ctx, 'MEER LYS · WEINIG MET', 290, 210, An, C.text2, 'left', 28); }); });
    laag(ctx, R * Vh, () => { balans(ctx, 1080, 250, 0.85, 1, Math.sin(t * 1.2) * 0.08 * (1 - ramp(t, q.at('verhouding', 1) + 1.2, 0.6)), (x, y) => hoop(ctx, x, y, 90, 40, '#E2C45A'), (x, y) => hoop(ctx, x, y, 90, 40, '#E2C47A'));
      metaText(ctx, 'IN DE JUISTE VERHOUDING', 1080, 450, C.goud, 'center', 28);
      naamBij(ctx, 'erwt + tarwe', '', 820, 580, 1, 'left', C.text); bekerRij(ctx, 820, 760, VUL_SAMEN, 1, { u: 0.5 + 0.5 * q.on('vullen', 1, 1.0), w: 40, gap: 54, h: 150, hl: 4, lijn: 0.88, lijnA: q.on('vullen', 1, 1.0) }); });
    laag(ctx, R, () => { const yb = 760, hp = 320, mix = q.on('vullen', 1, 1.0); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1440, yb); ctx.lineTo(1800, yb); ctx.stroke(); metaText(ctx, 'SCORE PER GRAM', 1440, 400, C.grain, 'left', 28);
      diaasStaaf(ctx, 1470, yb, 120, hp, 100, 112, C.koraal); diaasStaaf(ctx, 1640, yb, 120, hp, lerp(60, 85, mix), lerp(90, 95, mix), C.groen);
      text(ctx, 'rund', 1530, yb + 44, fTekst(30, 700), C.koraal, 'center'); text(ctx, mix > 0.5 ? 'erwt + tarwe' : 'erwt', 1700, yb + 44, fTekst(30, 700), C.groen, 'center'); });
    laag(ctx, LB, () => { const g = q.on('geeft', 1, 1.2); schep(ctx, 520, 470 - Math.sin(clamp((t - tM) / 1.2, 0, 1) * Math.PI) * 60, 1.1, '#E2CC8A'); hoop(ctx, 330, 700, lerp(220, 360, g), lerp(90, 160, g), '#E2CC8A'); pil(ctx, 'meer eiwit', 330, 420, C.oker, g);
      const yb = 700, hp = 240; diaasStaaf(ctx, 620, yb, 100, hp, 60, 90, C.groen); metaA(ctx, 'PER GRAM: ZELFDE SCORE', 160, 780, q.on('even', 1), C.goud, 'left', 28); });
    laag(ctx, LC, () => { molen(ctx, 330, 640, 0.9, 1, t, 1); hoop(ctx, 330, 720, 160, 40, '#EADBA8'); metaA(ctx, 'ZELFDE AMINOZUREN', 160, 790, q.on('aminozuren', 1), C.goud, 'left', 28); });
    laag(ctx, D, () => { ontwerpblad(ctx, 560, 170, 800, { versie: 'burger 2.0', vak: ['erwt', 'erwt + tarwe', null, null], hl: 1, hlA: 1 }); text(ctx, 'evenveel gram is nog niet even goed', 960, 680, fTekst(46, 800), C.groen, 'center'); }); },

  // ---------- H3 Van erwt tot vezel ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const tM = q.at('maalt', 1), Mo = ramp(t, tM - 0.3, 0.8), R = q.on('roert', 1, 0.5), Bs = q.on('basisch', 1), Er = q.on('eruit', 1, 1.0), Z = q.on('zuur', 1, 0.8), Kl = q.on('klontert', 1, 1.2), Pd = q.on('poeder', 1, 0.5);
    const px = lerp(560, 220, Mo), py = lerp(480, 300, Mo), pr = lerp(250, 100, Mo);
    erwtDoorsnede(ctx, px, py, pr, 1, { eiwit: q.on('eiwit', 1) > 0.5 && Mo < 0.5 ? 1 : 0, vezel: q.on('vezels', 1) * (1 - Mo) });
    laag(ctx, 1 - Mo, () => { naamBij(ctx, 'eiwit', '± 1/5 · EIWITLICHAAMPJES', 860, 380, q.on('ongeveer', 1, 0.4), 'left', C.oker); naamBij(ctx, 'zetmeel', 'KORRELS', 860, 500, q.on('zetmeel', 1), 'left'); naamBij(ctx, 'vezels', 'CELWANDEN', 860, 620, q.on('vezels', 1), 'left', C.groen); metaText(ctx, 'GELE ERWT · DOORSNEDE', 560, 790, C.grain, 'center', 28); });
    laag(ctx, Mo, () => { molen(ctx, 520, 640, 1, 1, t, 1); for (let i = 0; i < 5; i++) { const ph = ((t * 0.7 + i * 0.2) % 1); heleErwt(ctx, 500 + (i - 2) * 14, 400 + ph * 90, 11, 1 - ph); } hoop(ctx, 520, 730, 140, 40, '#EADBA8'); naamBij(ctx, 'meel', '', 620, 730, q.on('meel', 1), 'left'); });
    const tE = q.at('eruit', 1), tK = q.at('klontert', 1);
    vat(ctx, 820, 260, 560, 520, R, { teken: (x, y, w, h) => {
      for (let i = 0; i < 9; i++) { const sx = x + 50 + hash(i * 3.3) * (w - 100), sy = y + 40 + hash(i * 6.1) * (h - 160), wd = wander(i, t, 18, 0.6); const kx = x + w / 2 + (i - 4) * 22, ky = y + h - 40 - (i % 3) * 16;
        const cx = lerp(sx + wd.x, kx, Kl), cy = lerp(sy + wd.y, ky, Kl); const pts = Array.from({ length: 6 }, (_, k) => [cx + (k - 2.5) * lerp(16, 9, Kl), cy + Math.sin(k + t * 1.5 + i) * lerp(8, 5, Kl)]); keten(ctx, pts, [5, 2, 0, 6, 1, 3], lerp(8, 7, Kl), { a: Bs * 0.6 + 0.4 }); }
      for (let i = 0; i < 14; i++) { const zx = x + 40 + hash(i * 2.2) * (w - 80), zy = y + h - 40 - hash(i * 4.4) * 70, ox = ease((t - tE - hash(i) * 0.6) / 1.2); ctx.save(); ctx.globalAlpha *= 1 - ox; ctx.translate(zx + ox * 300, zy + ox * 60);
        if (i % 3 === 0) { ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 22, 12, hash(i) * 3, 0, 6.283); ctx.stroke(); } else { ctx.beginPath(); ctx.ellipse(0, 0, 13, 9, hash(i) * 3, 0, 6.283); shape(ctx, '#F6F0DA', '#B8A870', 1); } ctx.restore(); } } });
    naamBij(ctx, 'zetmeel en vezels', 'ERUIT', 1100, 830, fase(t, tE, tK, 0.4), 'center', C.text2);
    const ph = Z > 0.5 ? '4,5' : '9'; phMeter(ctx, 1240, 200, ph, Bs, C.teal, 600); metaA(ctx, Z > 0.5 ? 'ZUUR' : 'LICHT BASISCH', 1240, 140, Bs, C.teal, 'center', 28);
    naamBij(ctx, 'eiwit lost op', '', 960, 330, fase(t, q.at('lost', 1), tK, 0.4), 'center', C.oker); naamBij(ctx, 'eiwit klontert', 'ZAKT NAAR DE BODEM', 1100, 330, Kl * (1 - Pd), 'center', C.oker);
    laag(ctx, Pd, () => zakPoeder(ctx, 1650, 790, 0.9)); metaA(ctx, 'NAT UITHALEN · VEREENVOUDIGD', 160, 862, R, C.text2, 'left', 28); },

  s15(ctx, t, q) { const tX = q.at('kneedt', 1), X = ramp(t, tX - 0.3, 0.4);
    if (X < 1) laag(ctx, 1, () => { decor(ctx, 'proeffabriek', 0.6); const Bk = q.on('bakt', 1, 0.4), Br = q.on('zacht', 1, 0.6), Ex = q.on('extruder', 1);
      lars(ctx, 520, t, { pose: Ex > 0.5 ? 'wijs' : 'staan', kijk: Ex > 0.5 ? -1 : 1, uit: 'blij' }); noor(ctx, 1700, t, { pose: Bk > 0.5 && Br < 0.5 ? 'vasthouden' : (Br > 0.5 ? 'denk' : 'staan'), uit: Br > 0.5 ? 'verbaasd' : 'blij' });
      rvsTafel(ctx, 1000, 1580, 660); zakPoeder(ctx, 1080, 650, 0.45, 1, '', ''); naamBij(ctx, 'erwteneiwit', 'POEDER', 1080, 490, 1 - Br, 'center', C.oker); panKoekje(ctx, 1300, 660, t, 1, Br);
      laag(ctx, Br, () => { kaart(ctx, 820, 130, 380, 300, 1); koekjeBreuk(ctx, 1010, 280, 1, 1, Br); });
      naamBij(ctx, 'zacht en korrelig', 'GEEN VEZELS', 1010, 480, q.on('korrelig', 1), 'center', C.text);
      naamBij(ctx, 'extruder', '', 360, 180, Ex, 'center', C.goud);
      ctx.fillStyle = rgba('#000000', 0); });
    if (X > 0.01) laag(ctx, X, () => { bg(ctx, 'schema'); const Ht = q.on('verhit', 1, 1.2); extruder(ctx, t, 1, { heet: Ht, poeder: 1, water: 1, koel: 0, uit: 0 }); stoom(ctx, 1240, 410, t, Ht);
      naamBij(ctx, 'schroef', 'KNEEDT', 820, 650, q.on('kneedt', 1), 'center'); metaText(ctx, 'EXTRUDER · DOORSNEDE · SCHEMATISCH', 300, 800, C.grain, 'left', 28);
      meter(ctx, 1000, 250, 70, Ht * 0.75, '± 100–175 °C', C.koraal, q.on('verhit', 1, 0.4)); meter(ctx, 1240, 250, 70, q.on('druk', 1, 1.0) * 0.8, 'DRUK', C.text2, q.on('druk', 1));
      laag(ctx, q.on('hitte', 1), () => zoomCircle(ctx, 1560, 250, 130, 1100, 520, '', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1430, 120, 260, 260); keten(ctx, kluwenPad(1560, 250, 22, 80, 0, 0, 0, 0, t), [5, 2, 0, -1, 6, 1, 3, -1, 4, 8, 2, -1, 7, 0, 5, -1, 1, 3, 6, -1, 2, 8], 10); vraagteken(ctx, 1640, 200, 1, 70); })); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de keten vouwt open en verteert vaak beter', 1);
    const O = q.on('vouwt', 1, 1.6), Dn = q.on('denatureren', 1), Ei = q.on('ei', 2), Kn = q.on('geknipt', 1), Ae = q.on('elkaar', 1), V = q.on('verteert', 1), Rm = q.on('remmers', 1, 0.5), Ws = q.on('weggespoeld', 1, 1.2), Ov = q.on('overblijft', 1), Hk = q.on('kapot', 1, 1.0), Th = q.on('heet', 2);
    const kinds = [5, 2, 0, -1, 6, 1, 3, -1, 4, 8, 2, -1, 7, 0, 5, -1, 1, 3, 6, -1, 2, 8];
    keten(ctx, kluwenPad(400, 380, 22, 110, O, 180, 380, 38, t), kinds, 14, { lijn: _mixHex('#AFC0D0', C.koraal, O) });
    naamBij(ctx, 'denatureren', 'DE VORM GAAT, DE KETEN BLIJFT', 600, 300, Dn, 'center', C.koraal);
    laag(ctx, Ei, () => { gekooktEi(ctx, 1180, 390, 1); filmKaartje(ctx, 1290, 360, 'Knippen op maat', 1); });
    laag(ctx, Kn, () => { schaar(ctx, 560, 500, 1.3, 0.5, C.text2, 1); kruis(ctx, 560, 500, 34, 1); metaA(ctx, 'NIETS GEKNIPT · AMINOZUREN BLIJVEN AAN ELKAAR', 640, 512, Ae, C.text2, 'left', 28); });
    pil(ctx, 'verteert vaak beter', 400, 650, C.groen, V);
    laag(ctx, Rm, () => { vat(ctx, 960, 590, 380, 260, 1, { teken: (x, y, w, h) => { for (let i = 0; i < 12; i++) { const ox = ease((t - q.at('weggespoeld', 1) - hash(i) * 0.6) / 1.2) * (i < 10 ? 1 : 0); remmer(ctx, x + 40 + hash(i * 3.1) * (w - 80) + ox * 420, y + 30 + hash(i * 5.3) * (h - 60), 18, 1 - ox * (i < 10 ? 1 : 0), i); }
        for (let i = 0; i < 4; i++) keten(ctx, golfPad(x + 60 + i * 70, y + h - 30, 3, 14, 3), [5, 2, 0], 7); } }); text(ctx, 'pH 4,5', 1150, 622, fTekst(30, 700), C.teal, 'center'); pil(ctx, 'weggespoeld', 1150, 560, C.teal, Ws); for (let k = 0; k < 3; k++) pijl(ctx, 1350, 680 + k * 50, 1420, 680 + k * 50, C.teal, Ws, 4, 14); });
    laag(ctx, Ov, () => { kaart(ctx, 1440, 580, 360, 190, 1, C.koraal); metaText(ctx, 'HITTE', 1470, 624, C.koraal, 'left', 28); for (let i = 0; i < 2; i++) { const bx = 1560 + i * 110, by = 700; for (let k = 0; k < 4; k++) { const an = k * 1.57 + 0.8; remmer(ctx, bx + Math.cos(an) * 28 * Hk, by + Math.sin(an) * 22 * Hk, 10, 1 - Hk * 0.5, an); } } metaA(ctx, 'VALT UIT ELKAAR', 1470, 754, Hk, C.koraal, 'left', 28); });
    laag(ctx, Th, () => { pil(ctx, 'te heet of te lang: aminozuren beschadigd', 560, 800, C.koraal, 1); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const Kl = q.on('koele', 1, 0.8), Vs = q.on('vast', 1), Dr = q.on('draden', 1, 0.5), Hoe = q.on('Hoe', 1);
    ctx.save(); ctx.translate(0, 190); extruder(ctx, t, 1, { heet: 1, koel: Kl, uit: Vs, poeder: 1 }); ctx.restore();
    naamBij(ctx, 'koele, platte uitgang', '', 1530, 830, Kl, 'center', C.teal);
    laag(ctx, Dr, () => zoomCircle(ctx, 1320, 290, 170, 1560, 710, 'MODEL · VEREENVOUDIGD', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 120, 340, 340); const u = clamp((t - q.at('draden', 1)) / 3, 0, 1);
      for (let i = 0; i < 9; i++) { const yy = 170 + i * 30, xx = 1180 + hash(i * 3) * 60; const L = lerp(30, 260, ease(u - hash(i) * 0.2)); roundRect(ctx, xx, yy, L, lerp(22, 10, u), 6); ctx.fillStyle = i % 2 ? rgba(C.teal, 0.8) : rgba(C.oker, 0.9); ctx.fill(); }
      pijl(ctx, 1200, 445, 1440, 445, C.text2, 1, 3, 12); }));
    laag(ctx, Dr, () => { naamBij(ctx, 'eiwitrijk', '', 1510, 200, 1, 'left', C.oker); naamBij(ctx, 'waterrijk', '', 1510, 260, 1, 'left', C.teal); });
    laag(ctx, q.on('vleesvezels', 1) * (1 - Hoe), () => { reep(ctx, 520, 330, 1, 1, ease(clamp((t - q.at('vleesvezels', 1)) / 1.2, 0, 1))); naamBij(ctx, 'lijkt op vleesvezels', '', 520, 230, 1, 'center'); });
    metaA(ctx, 'HOE PRECIES: NOG ONDERZOEK (WAGENINGEN)', 1320, 540, q.on('Wageningen', 1), C.goud, 'center', 28);
    ontwerpblad(ctx, 520, 100, 600, { a: Hoe, versie: 'burger 2.0', vak: ['erwt', 'erwt + tarwe', 'extruder', null], hl: 2, hlA: 1 }); },

  // ---------- H4 Wat er nog bij moet ----------
  s19(ctx, t, q) { const tH = q.at('hamburger', 1), N = ramp(t, tH - 0.3, 0.4);
    if (N < 1) { decor(ctx, 'proeffabriek', 0.6); const Pr = q.on('proeft', 1, 0.3), Kl = q.on('Klaar', 1, 0.3), Pk = q.on('pakt', 1, 0.3);
      const hL = lars(ctx, 620, t, { pose: Pk > 0.5 ? 'vasthouden' : 'staan', uit: Kl > 0.5 ? 'neutraal' : 'blij' }); lijstje(ctx, hL.handR, Pk); ontwerpblad(ctx, 860, 110, 480, { a: Pk, versie: 'burger 2.0', vak: ['erwt', 'erwt + tarwe', 'extruder', null], hl: 3, hlA: Pk });
      const hN = noor(ctx, 1460, t, { pose: Kl > 0.5 ? 'wijsOmhoog' : (Pr > 0.5 ? 'vasthouden' : 'staan'), uit: Kl > 0.5 ? 'lacht' : 'blij' }); reepjeHand(ctx, hN.handR, Pr * (1 - Kl));
      rvsTafel(ctx, 900, 1300, 680); reep(ctx, 1100, 670, 0.45, 1, 0);
      naamBij(ctx, 'klaar!', '', 1460, 380, Kl, 'center', C.groen); }
    if (N > 0.01) laag(ctx, N, () => { bg(ctx, 'schema'); const M = q.on('meer', 1), Dn = q.on('doen', 1);
      bordje(ctx, 600, 600, 1.3); burger(ctx, 600, 596, 1.3, 'ham'); text(ctx, 'hamburger', 600, 700, fTekst(36, 700), C.koraal, 'center');
      bordje(ctx, 1320, 600, 1.3); burger(ctx, 1320, 596, 1.3, 'erwt'); text(ctx, 'erwtenburger', 1320, 700, fTekst(36, 700), C.groen, 'center');
      for (const [x, aa] of [[600, M], [1320, Dn]]) { badge(ctx, x - 130, 380, 'eiwit', C.oker); badge(ctx, x, 380, '', C.text2, aa, true); badge(ctx, x + 130, 380, '', C.text2, aa, true); vraagteken(ctx, x, 410, Dn, 64); vraagteken(ctx, x + 130, 410, Dn, 64); }
      metaA(ctx, 'MEER DAN EIWIT ALLEEN', 600, 280, M, C.text2, 'center', 28); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: vitamine B12 én ijzer', 1);
    const B = q.on('B12', 1), Bc = q.on('bacteriën', 1, 0.5), Ij = q.on('IJzer', 1, 0.5), Vc = q.on('maaltijd', 1), Vg = q.on('voegt', 1, 0.6), P1 = 1 - Ij;
    // burgers rechts (blijven staan)
    for (const [x, s2] of [[1350, 'ham'], [1650, 'erwt']]) { bordje(ctx, x, 480, 0.95); burger(ctx, x, 476, 0.95, s2); }
    text(ctx, 'hamburger', 1350, 560, fTekst(30, 700), C.koraal, 'center'); text(ctx, 'erwtenburger', 1650, 560, fTekst(30, 700), C.groen, 'center');
    badge(ctx, 1290, 300, 'B12', C.oker, B); badge(ctx, 1410, 300, 'ijzer', '#C9703A', B);
    badge(ctx, 1590, 300, Vg > 0.5 ? 'B12' : '', Vg > 0.5 ? C.oker : C.text2, 1, Vg < 0.5); badge(ctx, 1710, 300, Vg > 0.5 ? 'ijzer' : '', Vg > 0.5 ? '#C9703A' : C.text2, 1, Vg < 0.5);
    laag(ctx, P1 * Bc, () => { wei(ctx, 120, 720, 640); rund(ctx, 'vlees', 400, 640, 1.2, { kijk: 1, t });
      zoomCircle(ctx, 860, 380, 170, 380, 560, 'PENS · DEEL VAN DE MAAG', 1, () => { ctx.fillStyle = '#3A2A30'; ctx.fillRect(690, 210, 340, 340); for (let i = 0; i < 9; i++) { const w2 = wander(i, t, 14, 0.5); bacterie(ctx, 760 + (i % 3) * 90 + w2.x, 290 + Math.floor(i / 3) * 90 + w2.y, 1.3, hash(i) * 3, 1, C.groen); }
        for (let i = 0; i < 5; i++) { const ph = ((t * 0.3 + i * 0.2) % 1); b12Icoon(ctx, 780 + i * 46, 470 - ph * 200, 0.8, Math.sin(ph * Math.PI)); } });
      regel(ctx, 'B12: alleen bacteriën maken het', 160, 740, q.on('alleen', 1), C.text, 36, 'left', 700); metaA(ctx, 'KOE SLAAT B12 OP', 160, 790, q.on('slaat', 1), C.text2, 'left', 28);
      laag(ctx, q.on('erwt', 1), () => { heleErwt(ctx, 1560, 640, 22); text(ctx, '0 B12', 1600, 652, fTekst(32, 800), C.text, 'left'); }); });
    laag(ctx, Ij, () => { const pan = (x, s2, nDoor, col) => { kaart(ctx, x, 250, 470, 430, 1); text(ctx, s2, x + 235, 300, fTekst(34, 700), col, 'center'); ctx.fillStyle = rgba('#C98E86', 0.8); ctx.fillRect(x + 20, 480, 430, 34); metaText(ctx, 'DARMWAND', x + 30, 470, C.text2, 'left', 28);
        ctx.fillStyle = rgba(C.koraal, 0.25); ctx.fillRect(x + 20, 560, 430, 100); metaText(ctx, 'BLOED', x + 30, 650, C.koraal, 'left', 28);
        for (let i = 0; i < 10; i++) { const door = i < nDoor, ph = clamp((t - q.at('neemt', 1) - 0.4 - hash(i) * 2) / 2.2, 0, 1), y0 = 360 + (i % 3) * 30; const yy = door ? lerp(y0, 600, ease(ph)) : y0 + Math.sin(t * 2 + i) * 4; ijzerDeeltje(ctx, x + 45 + i * 42, yy, 13); } };
      pan(120, 'ijzer uit vlees', 5, C.koraal); pan(630, 'ijzer uit planten', 2 + Math.round(2 * Vc), C.groen);
      laag(ctx, Vc, () => { sinaasPartje(ctx, 760, 800, 0.7); pil(ctx, 'vitamine C helpt', 980, 812, C.oker, 1); }); });
    laag(ctx, Vg, () => { schep(ctx, 1650, 200 - Math.sin(clamp((t - q.at('voegt', 1)) / 1, 0, 1) * Math.PI) * 30, 0.8, '#E8E0CC', 2.6); pil(ctx, 'verrijken', 1650, 650, C.goud, q.on('verrijken', 1)); filmKaartje(ctx, 1290, 740, 'Supplementen en superfoods', q.on('verrijken', 1)); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); schap(ctx, 120, 200, 860, 640, 1); metaText(ctx, 'SUPERMARKT', 140, 180, C.grain, 'left', 28);
    const Tw = q.on('twintig', 1), Op = q.on('op?', 1);
    noor(ctx, 1150, t, { outfit: 'school', kijk: 1, pose: Op > 0.5 ? 'denk' : 'vasthouden', uit: Op > 0.5 ? 'verbaasd' : 'blij' });
    pakje(ctx, 1380, 300, 210, 300, 1, { kleur: '#3E7A5A', titel: 'pakje A', eiwit: false }); pakje(ctx, 1620, 300, 210, 300, 1, { kleur: '#4A6A8A', titel: 'pakje B', eiwit: false });
    pil(ctx, '20 g eiwit', 1485, 660, C.oker, Tw); pil(ctx, '20 g eiwit', 1725, 660, C.oker, q.on('twintig', 1, 0.9)); metaA(ctx, 'PER 100 G', 1605, 720, Tw, C.text2, 'center', 28);
    vraagteken(ctx, 1605, 260, Op, 100); },

  s24(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ijzer en B12, en zout', 1); const tG = q.at('Gram', 3), L = 1 - ramp(t, tG - 0.5, 0.35), Gr = ramp(t, tG - 0.1, 0.4);
    laag(ctx, L, () => { const rA = [['eiwit', '20 g', null], ['ijzer', '2,0 mg', q.on('ijzer', 1) > 0.5 ? 'ok' : null, 1], ['vitamine B12', '0,4 µg', q.on('B12', 1) > 0.5 ? 'ok' : null, 1], ['zout', '0,9 g', q.on('zout', 1) > 0.5 ? 'ok' : null, 1]];
      const rB = [['eiwit', '20 g', null], ['ijzer', '–', q.on('ijzer', 1) > 0.5 ? 'mis' : null, q.on('Niet', 1)], ['vitamine B12', '–', q.on('B12', 1) > 0.5 ? 'mis' : null, q.on('Niet', 1)], ['zout', '1,8 g', q.on('zout', 2) > 0.5 ? 'mis' : null, q.on('zout', 1)]];
      text(ctx, 'pakje A', 460, 260, fTekst(36, 700), C.text, 'center'); text(ctx, 'pakje B', 1140, 260, fTekst(36, 700), C.text, 'center');
      etiketVeld(ctx, 180, 290, 560, rA); etiketVeld(ctx, 860, 290, 560, rB);
      vergrootglas(ctx, 110, lerp(420, 560, q.on('zout', 1)), 44, q.on('kijk', 1));
      metaA(ctx, 'VOEDINGSCENTRUM · ZOUT < 1,1 G PER 100 G', 180, 760, q.on('Voedingscentrum', 1), C.goud, 'left', 28); metaA(ctx, 'VOORBEELDETIKETTEN', 1420, 760, 1, C.text2, 'right', 28);
      laag(ctx, q.on('Niet', 1), () => { text(ctx, 'niet verrijkt', 1600, 470, fTekst(34, 700), C.koraal, 'center'); }); laag(ctx, q.on('zout', 2), () => text(ctx, 'veel zout', 1600, 640, fTekst(34, 700), C.koraal, 'center')); });
    laag(ctx, Gr, () => { ontwerpblad(ctx, 460, 170, 1000, { versie: 'burger 3.0', vink: q.on('alles', 1), vak: ['erwt', 'erwt + tarwe', 'extruder', 'B12, ijzer · weinig zout'], hl: 3, hlA: 1 }); text(ctx, 'gram eiwit zegt niet alles', 960, 700, fTekst(46, 800), C.groen, 'center'); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); text(ctx, 'het eten van de toekomst', 960, 190, fTitel(64), C.text, 'center'); metaText(ctx, 'STAND OKT 2026', 1780, 190, C.grain, 'right', 28);
    const M = q.on('Meelwormen', 1, 0.5), K = q.on('kweekvlees', 1, 0.5);
    laag(ctx, M, () => { kaart(ctx, 140, 250, 760, 570, 1, C.oker); for (let i = 0; i < 3; i++) meelworm(ctx, 400 + i * 90, 400 + i * 40, 1.2 - i * 0.15, 1, t + i); naamBij(ctx, 'meelworm', 'LARVE VAN DE MEELTOR', 520, 560, 1, 'center', C.oker);
      regel(ctx, '2014: in Nederland te koop', 190, 670, q.on('veertien', 1), C.text, 36, 'left', 700); regel(ctx, '2021: toegelaten in de hele EU', 190, 740, q.on('eenentwintig', 1), C.text, 36, 'left', 700); });
    laag(ctx, K, () => { kaart(ctx, 1020, 250, 760, 570, 1, C.koraal); kweekSchaal(ctx, 1260, 420, 150, 1, t); naamBij(ctx, 'kweekvlees', 'CELLEN UIT EEN DIER', 1260, 560, q.on('cellen', 1), 'center', C.koraal);
      laag(ctx, q.on('koe', 1), () => { rund(ctx, 'vlees', 1590, 470, 0.85, { kijk: -1, t }); metaText(ctx, 'BV. EEN KOE', 1590, 520, C.text2, 'center', 28); });
      regel(ctx, 'proeverijen in Nederland', 1070, 670, q.on('proeven', 1), C.text, 36, 'left', 700); regel(ctx, 'nog niet te koop in de EU', 1070, 740, q.on('Verkopen', 1), C.koraal, 36, 'left', 700); }); },

  // ---------- Recap ----------
  s26(ctx, t, q) { decor(ctx, 'proeffabriek', 0.6); const kl = q.on('klopt', 1);
    lars(ctx, 1380, t, { kijk: 1, uit: 'blij' }); noor(ctx, 1700, t, { kijk: -1, uit: kl > 0.5 ? 'lacht' : 'blij' });
    rvsTafel(ctx, 1260, 1820, 690); bordje(ctx, 1440, 690, 0.9); burger(ctx, 1440, 686, 0.9, 'ham'); bordje(ctx, 1650, 690, 0.9); burger(ctx, 1650, 686, 0.9, 'erwt');
    const Bp = q.on('beperkende', 1), Vt = q.on('verteert', 1), Mg = q.on('mengt', 1), Vh = q.on('verhit', 1), Vr = q.on('verrijkt', 1), Ld = q.on('land', 1);
    const hl = Ld > 0.5 ? 0 : Vr > 0.5 ? 3 : Vh > 0.5 ? 2 : (Bp > 0.5 || Mg > 0.5) ? 1 : -1;
    ontwerpblad(ctx, 110, 110, 1060, { groot: true, versie: 'burger 3.0', vink: kl, vak: ['erwt', 'erwt + tarwe', 'extruder', 'B12, ijzer · weinig zout'],
      sub: ['RUND: ± 3 G VAN 100 G VOEREIWIT', 'BEPERKEND AMINOZUUR + VERTEERBAARHEID', 'DENATUREREN · DRADEN', 'VERRIJKEN · ETIKET'], hl, hlA: 1 }); },

  s27(ctx, t, q) { decor(ctx, 'proeffabriek', 0.6); lars(ctx, 1500, t, { kijk: -1, uit: 'blij', pose: q.on('onderzoek', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1730, t, { kijk: -1, uit: 'blij' });
    roundRect(ctx, 110, 120, 700, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 140, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 780, 186, C.grain, 'right', 28);
    opleidingRij(ctx, 110, 250, 1200, 'hbo', 'Voedingsmiddelentechnologie', 'HAS · DEN BOSCH · 4 JAAR · MET HAVO (OF VWO)', C.groen, q.on('Bosch', 1));
    opleidingRij(ctx, 110, 410, 1200, 'wo', 'Food Technology (Engels)', 'WAGENINGEN · 3 JAAR · MET VWO · NG OF NT', C.groen, q.on('Wageningen', 1));
    opleidingRij(ctx, 110, 570, 1200, 'werk', 'bijv. productontwikkelaar', 'PROCESTECHNOLOOG · ONDERZOEKER', C.goud, q.on('ontwikkel', 1)); }
});
