/* =====================================================================================
   Evolutie · les 4 · De mens als selectiefactor (31 okt 2026)
   Film 4 De mens als selectiefactor (films/evolutie/4-de-mens-als-selectiefactor.html, script v2); havo + vwo gelijk (geen vwo-blokken).
   Compact (± 25 min), te combineren met les 3 of les 5 in één lesuur.
   Eigen hulpen hebben het voorvoegsel L4_. Kleuren zoals de reeks: gevoelig allel blauw (EV().a1), resistentie-allel paars
   (ontstaan door mutatie), recessief ziekte-allel geel (EV().a2), selectie groen, uitwisseling (plasmide) teal.
   Personages: Opa Henk en apotheker Ravi (opening), Dr. Kim (blaasontsteking), zonder namen in beeld.
   ===================================================================================== */

// ---------- hulpen ----------
// staafbacterie; kl = kleur (allel), o.dood 0..1 (vervaagt, grijs), o.plas = plasmide erin, o.vorm = 'dik' (andere soort)
function L4_bac(ctx, x, y, s, rot, kl, a = 1, o = {}) { if (a <= 0.01) return; const d = o.dood || 0, k = d > 0 ? mix(kl, C.line, d) : kl, dik = o.vorm === 'dik';
  const w = dik ? 64 : 76, h = dik ? 40 : 30;
  ctx.save(); ctx.globalAlpha *= a * (1 - d * 0.7); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * (1 - d * 0.15), s * (1 - d * 0.15));
  roundRect(ctx, -w / 2, -h / 2, w, h, h / 2); shape(ctx, rgba(k, C.licht ? 0.28 : 0.35), k, 3);
  ctx.strokeStyle = rgba(k, 0.8); ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const px = -w * 0.3 + i * w * 0.05, py = Math.sin(i * 1.3) * h * 0.18; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (o.plas) circ(ctx, w * 0.3, 0, h * 0.18, null, C.paars, 2.5);
  ctx.restore(); }
// vaste plekken in een rechthoek (raster met speling), [x, y, hoek]
function L4_plekken(n, x, y, w, h, seed) { const r = toeval(seed), kol = Math.ceil(Math.sqrt(n * w / h)), rij = Math.ceil(n / kol), out = [];
  for (let i = 0; i < n; i++) { const c = i % kol, rr = Math.floor(i / kol); out.push([x + (c + 0.5) * w / kol + (r() - 0.5) * w / kol * 0.45, y + (rr + 0.5) * h / rij + (r() - 0.5) * h / rij * 0.45, (r() - 0.5) * 2.6]); } return out; }
// griepvirus: bolletje met uitsteeksels
function L4_virus(ctx, x, y, r, a = 1, T = 0) { if (a <= 0.01) return; const kl = C.koraal; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(T * 0.2);
  ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, r * 0.08); for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r); ctx.lineTo(Math.cos(an) * r * 1.3, Math.sin(an) * r * 1.3); ctx.stroke(); circ(ctx, Math.cos(an) * r * 1.35, Math.sin(an) * r * 1.35, r * 0.1, kl); }
  circ(ctx, 0, 0, r, rgba(kl, 0.3), kl, 3); ctx.restore(); }
// doosje antibiotica (vooraanzicht), s = 1 → 120 × 80
function L4_doosje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -40, 120, 80, 8); shape(ctx, C.licht ? '#F4F1EA' : '#E8E4DA', C.line, 2); ctx.fillStyle = C.groen; ctx.fillRect(-60, -14, 120, 22);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-8, -12, 6, 18); ctx.fillRect(-14, -6, 18, 6); ctx.restore(); }
// lijntje met kleine pillen
function L4_pil(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.save(); ctx.clip(); ctx.fillStyle = C.licht ? '#F4F1EA' : '#E8E4DA'; ctx.fillRect(-26, -11, 52, 22); ctx.fillStyle = C.groen; ctx.fillRect(0, -11, 26, 22); ctx.restore();
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
// balk gevoelig (blauw) tegen resistent (paars); p = aandeel resistent
function L4_balk(ctx, x, y, w, p, a = 1) { if (a <= 0.01) return; const h = 30; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, h / 2); ctx.save(); ctx.clip();
  ctx.fillStyle = EV().a1; ctx.fillRect(x, y, w * (1 - p), h); ctx.fillStyle = EV().nieuw; ctx.fillRect(x + w * (1 - p), y, w * p, h); ctx.restore();
  roundRect(ctx, x, y, w, h, h / 2); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
  regel(ctx, 'resistent ' + Math.round(p * 100) + '%', x + w / 2, y + h + 40, a, EV().nieuw, 30, 'center', 700); }
// pot met n knikkers waarvan r paars (resistent), de rest blauw
const L4_kl = (n, r) => Array.from({ length: n }, (_, i) => i < r ? EV().nieuw : EV().a1);
// hond van opzij; anker = midden tussen de poten op de grond; s = 1 → ± 260 breed
function L4_hond(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return;
  const { kl = '#8C8A86', lijf = 1, poot = 1, kop = 1, snuit = 1, oor = 'staand', oorG = 1, staart = 'pluim', kijk = 1 } = o, dk = mix(kl, '#000000', 0.25);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  const lh = 74 * poot, bl = 150 * lijf, bh = 58 * Math.sqrt(lijf), by = -lh - bh * 0.35;
  ctx.fillStyle = dk; [-0.3, 0.34].forEach(f => { roundRect(ctx, bl * f - 6, by, 13, -by, 5); ctx.fill(); });
  ctx.strokeStyle = dk; ctx.lineCap = 'round';
  if (staart === 'pluim') { ctx.lineWidth = 20 * lijf; ctx.beginPath(); ctx.moveTo(-bl * 0.45, by - bh * 0.15); ctx.quadraticCurveTo(-bl * 0.68, by + bh * 0.2, -bl * 0.66, by + bh * 0.85); ctx.stroke(); }
  else { ctx.lineWidth = 8 * Math.sqrt(lijf); ctx.beginPath(); ctx.moveTo(-bl * 0.45, by - bh * 0.2); ctx.quadraticCurveTo(-bl * 0.62, by - bh * 0.9, -bl * 0.52, by - bh * 1.15); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, by, bl / 2, bh / 2, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  ctx.fillStyle = kl; [-0.4, 0.26].forEach(f => { roundRect(ctx, bl * f - 7, by, 14, -by, 6); ctx.fill(); });
  const r = 30 * kop, hx = bl * 0.48 + r * 0.5, hy = by - bh * 0.45 - r * 0.7;
  ctx.beginPath(); ctx.moveTo(bl * 0.25, by - bh * 0.35); ctx.lineTo(hx - r * 0.3, hy - r * 0.6); ctx.lineTo(hx + r * 0.2, hy + r * 0.5); ctx.lineTo(bl * 0.42, by + bh * 0.2); ctx.closePath(); ctx.fill();
  circ(ctx, hx, hy, r, kl);
  const sl = 14 + 40 * snuit; ctx.beginPath(); ctx.moveTo(hx + r * 0.4, hy - r * 0.45); ctx.lineTo(hx + r * 0.6 + sl, hy + r * 0.05); ctx.lineTo(hx + r * 0.55 + sl, hy + r * 0.5); ctx.lineTo(hx + r * 0.1, hy + r * 0.75); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  circ(ctx, hx + r * 0.58 + sl, hy + r * 0.12, 5 * Math.sqrt(kop), '#1E1A18'); circ(ctx, hx + r * 0.35, hy - r * 0.25, 3.5 * Math.sqrt(kop), '#1E1A18');
  if (oor === 'staand') { ctx.beginPath(); ctx.moveTo(hx - r * 0.55, hy - r * 0.6); ctx.lineTo(hx - r * 0.35, hy - r * (0.9 + 0.9 * oorG)); ctx.lineTo(hx + r * 0.15, hy - r * 0.8); ctx.closePath(); ctx.fillStyle = dk; ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(hx - r * 0.35, hy + r * 0.15, r * 0.3, r * 0.65 * oorG, 0.25, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); }
  ctx.restore(); }
const L4_WOLF = { kl: '#8E8A84', snuit: 1.1, oorG: 0.8 }, L4_CHI = { kl: '#D9B27C', lijf: 0.62, poot: 0.75, kop: 1.25, snuit: 0.3, oorG: 1.5, staart: 'krul' };
// kool en zijn groenten; anker = onderkant midden, s = 1 → ± 160 hoog
const L4_GR = () => (C.licht ? '#5E8F5A' : '#6FA56A'), L4_GRB = () => (C.licht ? '#6E9A8E' : '#82AFA2');
function L4_wildeKool(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = L4_GRB(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -150); ctx.stroke();
  [[-1, -30, 0.5], [1, -45, -0.5], [-1, -70, 0.7], [1, -90, -0.7]].forEach(([k, yy, rr]) => { ctx.beginPath(); ctx.ellipse(k * 40, yy, 44, 20, rr, 0, 6.283); ctx.fillStyle = L4_GRB(); ctx.fill(); });
  for (let i = 0; i < 6; i++) circ(ctx, -18 + (i % 3) * 18, -158 - Math.floor(i / 3) * 16, 7, '#E3C443'); ctx.restore(); }
function L4_groente(ctx, soort, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const g = L4_GR(), dg = mix(g, '#000000', 0.25);
  if (soort === 'boerenkool') { ctx.strokeStyle = dg; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -60); ctx.stroke();
    [[-1, -0.5], [1, 0.5], [0, 0]].forEach(([k, rr], j) => { ctx.save(); ctx.translate(k * 34, -90 - (k === 0 ? 30 : 0)); ctx.rotate(rr); for (let i = 0; i < 9; i++) circ(ctx, Math.sin(i * 2.1) * 18, -40 + i * 10, 15, i % 2 ? g : dg); ctx.restore(); }); }
  if (soort === 'spruitjes') { ctx.strokeStyle = C.licht ? '#8FA87A' : '#A2BB8C'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -160); ctx.stroke();
    for (let i = 0; i < 8; i++) circ(ctx, (i % 2 ? 1 : -1) * 16, -20 - i * 18, 13, i % 2 ? g : dg); ctx.beginPath(); ctx.ellipse(0, -172, 34, 16, 0, 0, 6.283); ctx.fillStyle = g; ctx.fill(); }
  if (soort === 'koolrabi') { ctx.strokeStyle = g; ctx.lineWidth = 5; [-0.5, 0, 0.5].forEach(rr => { ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(Math.sin(rr) * 70, -150); ctx.stroke(); ctx.beginPath(); ctx.ellipse(Math.sin(rr) * 74, -160, 14, 26, rr, 0, 6.283); ctx.fillStyle = g; ctx.fill(); });
    ctx.beginPath(); ctx.ellipse(0, -46, 52, 46, 0, 0, 6.283); ctx.fillStyle = C.licht ? '#B6CF8E' : '#C2D99A'; ctx.fill(); ctx.strokeStyle = dg; ctx.lineWidth = 2; ctx.stroke(); }
  if (soort === 'broccoli' || soort === 'bloemkool') { const bk = soort === 'bloemkool'; ctx.fillStyle = bk ? (C.licht ? '#A9C08A' : '#9DB880') : (C.licht ? '#8FA87A' : '#A2BB8C'); roundRect(ctx, -16, -80, 32, 80, 10); ctx.fill();
    if (bk) [[-1, 0.6], [1, -0.6]].forEach(([k, rr]) => { ctx.beginPath(); ctx.ellipse(k * 52, -80, 30, 60, rr, 0, 6.283); ctx.fillStyle = g; ctx.fill(); });
    for (let i = 0; i < 9; i++) { const an = Math.PI + i / 8 * Math.PI; circ(ctx, Math.cos(an) * 50, -100 + Math.sin(an) * 44, 24, bk ? '#EFE6CC' : (i % 2 ? '#3F6E3A' : '#4C8045')); } circ(ctx, 0, -110, 30, bk ? '#F4ECD6' : '#3F6E3A'); }
  ctx.restore(); }
// graanplantje (akker), h = hoogte, kl = kleur aar
function L4_graan(ctx, x, y, h, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.licht ? '#7E9A5A' : '#93AE6C'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
  for (let i = 0; i < 5; i++) [-1, 1].forEach(k => { ctx.beginPath(); ctx.ellipse(x + k * 7, y - h + i * 12, 6, 10, k * 0.4, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); }); ctx.restore(); }
// vriezer met zaadpotjes (genenbank)
function L4_vriezer(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 170, y - 360, 340, 360, 16); shape(ctx, rgba(C.teal, C.licht ? 0.12 : 0.18), C.teal, 3);
  for (let r = 0; r < 4; r++) { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 150, y - 270 + r * 80 + 24); ctx.lineTo(x + 150, y - 270 + r * 80 + 24); ctx.stroke();
    for (let k = 0; k < 6; k++) { const px = x - 125 + k * 50, py = y - 270 + r * 80; roundRect(ctx, px - 16, py - 30, 32, 52, 6); shape(ctx, C.licht ? '#F4F1EA' : '#E8E4DA', C.line, 1.5); for (let z = 0; z < 4; z++) circ(ctx, px - 7 + (z % 2) * 14, py + 4 + Math.floor(z / 2) * 10, 4.5, ['#C9A35C', '#8A5F3A', '#D8C190', '#6E5A44'][(r + k + z) % 4]); } }
  ctx.restore(); }
// berg met de ingang van de zadenkluis
function L4_berg(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = C.licht ? '#9AA3B2' : '#5E6A80';
  ctx.beginPath(); ctx.moveTo(x - 280, y); ctx.lineTo(x - 60, y - 330); ctx.lineTo(x + 40, y - 250); ctx.lineTo(x + 140, y - 300); ctx.lineTo(x + 280, y); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 60, y - 330); ctx.lineTo(x - 120, y - 240); ctx.lineTo(x - 70, y - 260); ctx.lineTo(x - 30, y - 230); ctx.lineTo(x + 10, y - 270); ctx.closePath(); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + 20, y); ctx.lineTo(x + 30, y - 150); ctx.lineTo(x + 90, y - 150); ctx.lineTo(x + 100, y); ctx.closePath(); ctx.fillStyle = C.licht ? '#C8CCD2' : '#9AA3B2'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  roundRect(ctx, x + 48, y - 60, 24, 60, 3); ctx.fillStyle = '#2A2E36'; ctx.fill(); ctx.restore(); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 4: de mens als selectiefactor. Antibiotica en resistentie, plasmiden, fokken en veredelen, inteelt', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 4 van de nieuwe reeks, De mens als selectiefactor. Bewust kort (± 25 minuten), te combineren met les 3 of les 5 in één lesuur.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 4', 140, 330, C.meta, 'left', 30);
    text(ctx, 'De mens als', 140, 465, fTitel(98), C.text); text(ctx, 'selectiefactor', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'resistentie · plasmiden · fokken · inteelt', 144, 675, 1, C.text2, 32, 'left', 400);
    L4_plekken(9, 1260, 220, 480, 300, 4).forEach(([x, y, r], i) => L4_bac(ctx, x, y + Math.sin(T + i) * 3, 1.1, r, i === 4 || i === 7 ? EV().nieuw : EV().a1));
    L4_hond(ctx, 1330, 900, 1.1, 1, L4_WOLF); L4_hond(ctx, 1680, 900, 0.85, 1, Object.assign({ kijk: -1 }, L4_CHI));
  } });

// ---------- 2 · het doosje ----------
SCHERMEN.push({ titel: 'Het doosje', kop: 'Een doosje antibiotica', deel: 'Opening',
  stappen: [
    { t: 'Opa Henk haalt een doosje antibiotica op bij apotheker Ravi. Iedereen kent het advies: maak je kuur af.', n: 'De cold open van de film. Vraag de klas: wie heeft weleens een antibioticum gekregen? Wat werd erbij gezegd?' },
    { t: 'Maar klopt dat advies wel? En waarom krijg je bij griep geen antibioticum?', n: 'Puzzel van de film (kun je zelf stellen): Waarom helpt een antibioticum niet tegen griep, maar maakt het wel resistentie? Het antwoord komt op scherm 6; het kuuradvies op scherm 5.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9);
    ctx.save(); ctx.globalAlpha *= a0; roundRect(ctx, 820, 700, 640, 300, 12); shape(ctx, rgba(C.fill, 0.8), C.line, 2); ctx.restore();
    pers(ctx, 'ravi', 1180, 1000, 560, { t: T, uit: 'praat', kijk: -1, a: a0 });
    ctx.save(); ctx.globalAlpha *= a0; roundRect(ctx, 820, 700, 640, 300, 12); shape(ctx, rgba(C.fill, C.licht ? 0.95 : 0.9), C.line, 2); ctx.restore();
    pers(ctx, 'henk', 560, 1000, 560, { t: T + 1, uit: 'blij', kijk: 1, a: a0, pose: 'vasthouden', hold: (c, x, y) => L4_doosje(c, x + 20, y - 10, 0.7) });
    L4_doosje(ctx, 1000, 670, 0.9, a0 * (1 - a1 * 0)); L4_pil(ctx, 1110, 690, 1, a0, 0.3);
    if (a1 > 0.01) {
      ctx.save(); ctx.globalAlpha *= a1; roundRect(ctx, 1420, 230, 400, 110, 18); shape(ctx, rgba(C.bg, 0.95), C.goud, 3); ctx.restore();
      regel(ctx, 'kuur afmaken?', 1620, 300, a1, C.goud, 40, 'center', 700);
      L4_virus(ctx, 1560, 520, 50, a1 * S.on(1, 0.6, 0.4), T); L4_pil(ctx, 1720, 520, 1.6, a1 * S.on(1, 0.6, 0.4));
      regel(ctx, 'griep', 1560, 640, a1 * S.on(1, 0.6, 0.4), C.koraal, 34, 'center', 700); regel(ctx, '?', 1640, 535, a1 * S.on(1, 0.6, 0.4), C.text2, 60, 'center', 700);
    }
  } });

// ---------- 3 · bacteriën evolueren snel ----------
SCHERMEN.push({ titel: 'Snel', kop: 'Bacteriën evolueren snel', deel: 'Bacteriën',
  stappen: [
    { t: 'Bacteriën delen: één wordt twee, twee worden vier. Onder ideale omstandigheden kan <b>E. coli</b> dat elke twintig minuten.', n: 'Een uur = drie delingen = ×8. In je darmen leven tienduizenden miljarden bacteriën.' },
    { t: 'Bij elke deling wordt het DNA gekopieerd. Heel af en toe gaat daarbij iets mis: een <b>mutatie</b>.', n: 'Paars = nieuw allel, zoals in de hele reeks. Hoe een mutatie ontstaat, zie je in de DNA-reeks.' },
    { t: 'Een mens krijgt ± elke dertig jaar een nieuwe generatie; een bacterie in het lab haalt er tientallen per dag. Dat is de <b>generatietijd</b>.', n: 'Vraag uit de film: Waarom kan een populatie bacteriën veel sneller evolueren dan een populatie mensen? (a) bacteriën passen zich aan als het nodig is, (b) korte generatietijd en enorme aantallen, (c) bacteriën hebben meer genen dan mensen. Antwoord b. In de darm gaat delen trager dan in het lab, maar nog steeds veel sneller dan bij mensen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 2.0), a1 = S.on(1, 0.8), a2 = S.on(2, 1.0);
    const kol = [1, 2, 4, 8], xs = [240, 600, 960, 1320];
    kol.forEach((n, c) => { const a = S.on(0, 0.5, c * 0.45); if (a <= 0.01) return;
      for (let i = 0; i < n; i++) { const y = 420 + (i - (n - 1) / 2) * (n > 4 ? 46 : 70), mut = c === 3 && i === 5; L4_bac(ctx, xs[c] + (i % 2) * 24 - 12 * (n > 1), y, 0.95, 0.05, mut && a1 > 0.5 ? EV().nieuw : EV().a1, a); }
      if (c > 0) { pijl(ctx, xs[c - 1] + 70, 420, xs[c] - 80, 420, C.text2, 3, a); regel(ctx, '20 min', (xs[c - 1] + xs[c]) / 2, 395, a, C.text2, 26, 'center', 600); } });
    if (a1 > 0.01) { gloed(ctx, 1332, 420 + 1.5 * 46, 70, C.paars, a1 * (0.6 + 0.3 * Math.sin(T * 2))); naam(ctx, 'mutatie', 1440, 500, a1, 'left', C.paars, 32); }
    regel(ctx, 'E. coli', 240, 300, a0, C.text2, 28, 'center', 600);
    if (a2 > 0.01) { const y = 760;
      paneel(ctx, 140, y - 50, 760, 250, a2); paneel(ctx, 1020, y - 50, 760, 250, a2 * S.on(2, 0.6, 0.3));
      pers(ctx, 'henk', 260, y + 180, 200, { t: T, a: a2 }); regel(ctx, 'mens', 360, y + 30, a2, C.text, 36, 'left', 700); regel(ctx, '± 30 jaar per generatie', 360, y + 90, a2, C.text2, 32, 'left', 600);
      const b = a2 * S.on(2, 0.6, 0.3); for (let i = 0; i < 6; i++) L4_bac(ctx, 1110 + (i % 3) * 40, y + 30 + Math.floor(i / 3) * 50, 0.6, 0.1, EV().a1, b);
      regel(ctx, 'bacterie (lab)', 1260, y + 30, b, C.text, 36, 'left', 700); regel(ctx, '± 20 minuten per generatie', 1260, y + 90, b, C.text2, 32, 'left', 600);
      regel(ctx, 'meer generaties + meer individuen = sneller evolutie', 960, 1000, a2 * S.on(2, 0.6, 0.8), C.goud, 34, 'center', 700); }
  } });

// ---------- 4 · het antibioticum kiest ----------
const L4_P4 = L4_plekken(28, 640, 240, 1160, 520, 11), L4_RES4 = [5, 17, 22];
SCHERMEN.push({ titel: 'Het antibioticum kiest', kop: 'Het antibioticum kiest', deel: 'Antibiotica',
  stappen: [
    { t: 'Opa Henk heeft een blaasontsteking. Dr. Kim vindt bacteriën in zijn urine. De meeste zijn <b>gevoelig</b> voor het antibioticum; een paar zijn <b>resistent</b>.', n: 'Die paar hebben door een toevallige mutatie een allel waardoor het middel niet werkt. Dat allel ontstond niet door de pil: het was er al.' },
    { t: 'Opa Henk slikt het antibioticum. De gevoelige bacteriën gaan dood. De resistente merken weinig van het middel.', n: 'Vraag uit de film: Opa Henk slikt het antibioticum. Wat gebeurt er met de bacteriën in zijn blaas? (a) ze worden langzaam immuun voor het middel, (b) het middel veroorzaakt resistentie-mutaties, (c) gevoelige gaan dood, resistente delen verder. Antwoord c.' },
    { t: 'De resistente bacteriën delen gewoon verder; hun nakomelingen erven het resistentie-allel. Geen bacterie is veranderd: de <b>populatie</b> is veranderd.', n: 'Leg de nadruk op dat laatste: \'de bacterie wordt resistent\' is de klassieke misvatting (net als \'immuun worden\').' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.4), a2 = S.on(2, 1.6);
    pers(ctx, 'kim', 300, 1000, 600, { t: T, uit: a1 > 0.5 ? 'blij' : 'praat', kijk: 1, a: a0 });
    paneel(ctx, 600, 200, 1240, 600, a0); metaText(ctx, 'bacteriën in de urine', 630, 240, C.text2, 'left', 20, a0);
    L4_P4.forEach(([x, y, r], i) => { const res = L4_RES4.includes(i), wob = Math.sin(T * 1.5 + i) * 2;
      if (res) { L4_bac(ctx, x, y + wob, 1, r, EV().nieuw, a0); return; }
      const d = clamp(a1 * 1.3 - (i % 5) * 0.06, 0, 1); L4_bac(ctx, x, y + wob, 1, r, EV().a1, a0 * (1 - a2), { dood: d });
      if (d > 0.3 && a2 < 0.5) kruis(ctx, x, y, 10, (d - 0.3) * (1 - a2 * 2), C.koraal);
      const kind = clamp(a2 * 2.2 - (i % 7) * 0.15, 0, 1); if (kind > 0.01) L4_bac(ctx, x, y + wob, 1, r, EV().nieuw, kind); });
    if (a0 > 0.01) { const [x, y] = L4_P4[17]; naam(ctx, 'resistent', x, y - 40, a0 * (1 - a2), 'center', EV().nieuw, 30); const [x2, y2] = L4_P4[9]; naam(ctx, 'gevoelig', x2, y2 - 40, a0 * (1 - a1), 'center', EV().a1, 30); }
    if (a1 > 0.01) { for (let i = 0; i < 5; i++) L4_pil(ctx, 700 + i * 260, 860, 1.1, a1 * (1 - a2 * 0.6), 0.3 * Math.sin(i)); regel(ctx, 'antibioticum = selectiedruk', 1220, 940, a1 * (1 - a2), C.groen, 34, 'center', 700); }
    if (a2 > 0.01) balk(ctx, 'de populatie is veranderd, niet de bacterie', 1220, 910, 1180, S.on(2, 0.6, 1.0), C.groen, 38);
  } });

// ---------- 5 · van zeldzaam naar gewoon ----------
SCHERMEN.push({ titel: 'De pot', kop: 'Van zeldzaam naar gewoon', deel: 'Antibiotica',
  stappen: [
    { t: 'In de pot: eerst is het resistentie-allel zeldzaam.', n: 'Blauw = allel van gevoelige bacteriën, paars = resistentie-allel (ontstaan door mutatie). De percentages zijn een voorbeeld.' },
    { t: 'Na de kuur is het ineens heel gewoon. Het antibioticum was de <b>selectiedruk</b>. Elke keer dat je het gebruikt, krijgen resistente bacteriën een voordeel.', n: 'Selectiedruk: de omstandigheid die bepaalt wie overleeft en zich voortplant (les 2). Hier kiest de mens, per ongeluk.' },
    { t: 'En die kuur? Elke extra dag is ook extra selectiedruk. Neem het middel precies zoals de arts het voorschrijft; wil je eerder stoppen, overleg dan eerst.', n: 'Het oude advies \'altijd afmaken\' was bedoeld tegen resistentie, maar daar is weinig bewijs voor (zie briefing, BMJ 2017). Restje? Terug naar de apotheek, niet bewaren en niet door de wc.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.2), a2 = S.on(2, 1.0);
    pot(ctx, 420, 640, 0.95, { kleuren: L4_kl(50, 3), seed: 4, a: a0 }); L4_balk(ctx, 280, 680, 280, 0.06, a0); metaText(ctx, 'vóór de kuur', 420, 300, C.text2, 'center', 22, a0);
    pijl(ctx, 600, 480, 760, 480, C.groen, 5, a1); L4_pil(ctx, 680, 440, 1.2, a1);
    pot(ctx, 940, 640, 0.95, { kleuren: L4_kl(50, 44), seed: 9, a: a1 }); L4_balk(ctx, 800, 680, 280, 0.88, a1); metaText(ctx, 'na de kuur', 940, 300, C.text2, 'center', 22, a1);
    termKaart(ctx, 'selectiedruk', 'het antibioticum bepaalt wie overblijft', 1490, 380, a1 * S.on(1, 0.6, 0.6), C.groen);
    misvatting(ctx, 'maak je kuur altijd af', 'neem hem zoals de arts voorschrijft', 960, 830, 1300, a2, S.on(2, 0.6, 0.6));
    L4_doosje(ctx, 1500, 650, 1.0, a2); regel(ctx, 'restje → apotheek', 1500, 740, a2, C.text2, 30, 'center', 600);
  } });

// ---------- 6 · en griep? ----------
const L4_P6 = L4_plekken(16, 1290, 300, 420, 420, 23), L4_RES6 = [3, 10];
SCHERMEN.push({ titel: 'En griep?', kop: 'Antibioticum tegen griep?', deel: 'Antibiotica',
  stappen: [
    { t: 'Griep komt door een <b>virus</b>. Een virus is geen bacterie: een antibioticum doet er niets tegen. Je wordt dus niet sneller beter.', n: 'Ook verkoudheid en de meeste keelpijn komen door virussen.' },
    { t: 'Maar het middel komt overal in je lichaam, ook bij de bacteriën in je darmen. Daar zitten vaak ook een paar resistente.', n: 'Vraag uit de film: Iemand neemt een antibioticum tegen griep. Wat doet dat? (a) het selecteert resistente bacteriën in je darmen, (b) niets: er zijn geen ziekmakende bacteriën, (c) het griepvirus wordt er resistent door. Antwoord a.' },
    { t: 'Het antibioticum ruimt hun concurrenten op. Tegen griep helpt het niet, maar <b>selecteren</b> doet het wel.', n: 'De oplossing van de puzzel van scherm 2: je hebt de nadelen van het middel, zonder het voordeel.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.0), a2 = S.on(2, 1.4);
    paneel(ctx, 100, 200, 560, 560, a0);
    L4_virus(ctx, 260, 340, 60, a0, T); naam(ctx, 'virus', 260, 460, a0, 'center', C.koraal, 34);
    L4_bac(ctx, 500, 340, 1.6, 0.2, EV().a1, a0); naam(ctx, 'bacterie', 500, 460, a0, 'center', EV().a1, 34);
    L4_pil(ctx, 380, 560, 1.6, a0); pijl(ctx, 340, 590, 270, 640, C.text2, 3, a0); pijl(ctx, 420, 590, 490, 640, C.text2, 3, a0);
    kruis(ctx, 260, 680, 18, a0 * S.on(0, 0.5, 0.5)); regel(ctx, 'werkt niet', 260, 740, a0 * S.on(0, 0.5, 0.5), C.koraal, 30, 'center', 700);
    vink(ctx, 500, 680, 18, a0 * S.on(0, 0.5, 0.5)); regel(ctx, 'werkt', 500, 740, a0 * S.on(0, 0.5, 0.5), C.groen, 30, 'center', 700);
    pers(ctx, 'henk', 900, 1010, 640, { t: T, uit: a2 > 0.5 ? 'bezorgd' : 'moe', kijk: 1, a: a1 });
    zoom(ctx, 1500, 510, 270, a1, [930, 690], () => {
      ctx.fillStyle = rgba(C.koraal, 0.08); ctx.fillRect(1230, 240, 540, 540);
      L4_P6.forEach(([x, y, r], i) => { const res = L4_RES6.includes(i), d = res ? 0 : clamp(a2 * 1.6 - (i % 4) * 0.1, 0, 1), wob = Math.sin(T + i) * 2;
        if (res) { L4_bac(ctx, x, y + wob, 0.95, r, EV().nieuw, 1); return; }
        L4_bac(ctx, x, y + wob, 0.95, r, EV().a1, 1 - clamp(a2 * 2 - 1.2, 0, 1), { dood: d });
        if (a2 > 0.7 && i % 3 === 0) L4_bac(ctx, x + 10, y + 20, 0.95, r + 1, EV().nieuw, clamp(a2 * 3 - 2.2, 0, 1)); });
    });
    naam(ctx, 'darmbacteriën', 1500, 830, a1, 'center', C.text, 32);
    regel(ctx, 'tegen griep: niets · selecteren: wel', 1500, 900, a2 * S.on(2, 0.6, 0.9), C.goud, 36, 'center', 700);
  } });

// ---------- 7 · plasmiden ----------
SCHERMEN.push({ titel: 'Plasmiden', kop: 'De pot lekt', deel: 'Plasmiden',
  stappen: [
    { t: 'Naast hun grote DNA-molecuul hebben bacteriën vaak kleine ringetjes DNA: <b>plasmiden</b>. Op een plasmide ligt soms een resistentiegen.', n: 'Een bacterie heeft geen kern; het grote DNA-molecuul ligt los in het cytoplasma.' },
    { t: 'Een bacterie kan een kopie van zo\'n plasmide doorgeven aan een buurbacterie, via een dun buisje. Die hoeft niet eens dezelfde soort te zijn.', n: 'Vraag uit de film: Een E. coli met een plasmide voor resistentie ligt naast een bacterie van een andere soort. Wat kan er gebeuren? (a) niets: genen gaan alleen naar dochtercellen, (b) de E. coli verliest zijn resistentie, (c) de andere soort krijgt een kopie en wordt resistent. Antwoord c. De gever houdt zijn eigen plasmide.' },
    { t: 'Zo springt resistentie over naar een andere soort, zoals bij <b>ESBL</b>: van E. coli naar bijvoorbeeld Klebsiella. Alsof er een gaatje zit tussen twee potten.', n: 'In een ziekenhuis is de selectiedruk het grootst (veel zieken, veel antibiotica). Daarom testen ziekenhuizen op resistente bacteriën en wassen artsen voortdurend hun handen. Teal = uitwisseling, zoals in de reeks.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 2.0), a2 = S.on(2, 1.2);
    if (a0 > 0.01) { ctx.save(); ctx.globalAlpha *= a0; roundRect(ctx, 140, 260, 640, 280, 140); shape(ctx, rgba(EV().a1, C.licht ? 0.12 : 0.18), EV().a1, 4); ctx.restore();
      const pts = []; for (let i = 0; i <= 80; i++) { const an = i / 80 * 6.283; pts.push([400 + Math.cos(an) * (150 + 18 * Math.sin(an * 7)), 400 + Math.sin(an) * (70 + 12 * Math.cos(an * 5))]); }
      ctx.save(); ctx.globalAlpha *= a0; ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      circ(ctx, 660, 340, 30, null, C.teal, 5); circ(ctx, 680, 450, 24, null, C.teal, 5); ctx.strokeStyle = C.paars; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(660, 340, 30, -1.2, 0.3); ctx.stroke(); ctx.restore();
      naam(ctx, 'groot DNA-molecuul', 400, 240, a0, 'center', C.text2, 30); naam(ctx, 'plasmide', 720, 600, a0, 'center', C.teal, 32);
      naam(ctx, 'resistentiegen', 760, 300, a0 * S.on(0, 0.5, 0.5), 'left', C.paars, 28); }
    if (a1 > 0.01) { const ax = 1100, bx = 1640, y = 400;
      L4_bac(ctx, ax, y, 3.2, 0, EV().a1, a1, { plas: true }); L4_bac(ctx, bx, y, 3.2, 0, C.oker, a1, { vorm: 'dik', plas: S.on(1, 0.3, 1.6) > 0.5 });
      ctx.save(); ctx.globalAlpha *= a1 * S.on(1, 0.4, 0.3); ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax + 120, y); ctx.lineTo(bx - 100, y); ctx.stroke(); ctx.restore();
      const u = S.on(1, 1.0, 0.6); if (u > 0.01 && u < 0.99) circ(ctx, lerp(ax + 120, bx - 100, ease(u)), y, 16, null, C.paars, 4);
      naam(ctx, 'E. coli', ax, y + 120, a1, 'center', EV().a1, 32); naam(ctx, 'andere soort', bx, y + 130, a1, 'center', C.oker, 32); naam(ctx, 'buisje', (ax + bx) / 2, y - 30, a1 * S.on(1, 0.4, 0.3), 'center', C.teal, 28); }
    if (a2 > 0.01) { pot(ctx, 560, 990, 0.62, { kleuren: L4_kl(30, 8), seed: 3, a: a2 }); pot(ctx, 1000, 990, 0.62, { kleuren: Array.from({ length: 30 }, (_, i) => i < 3 ? EV().nieuw : C.oker), seed: 5, a: a2 });
      const u = (T * 0.4) % 1; knikker(ctx, lerp(660, 900, u), 880 - Math.sin(u * Math.PI) * 40, 10, EV().nieuw, a2 * Math.sin(u * Math.PI));
      ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(650, 880); ctx.lineTo(910, 880); ctx.stroke(); ctx.restore();
      naam(ctx, 'E. coli', 560, 1030, a2, 'center', EV().a1, 26); naam(ctx, 'Klebsiella', 1000, 1030, a2, 'center', C.oker, 26);
      termKaart(ctx, 'ESBL', 'enzym dat veel antibiotica afbreekt', 1480, 800, a2 * S.on(2, 0.6, 0.5), C.paars); }
  } });

// ---------- 8 · van wolf tot chihuahua ----------
const L4_GEN = [[{ lijf: 1, poot: 1, kop: 1, snuit: 1, kl: '#9A8E80' }, { lijf: 0.85, poot: 0.9, kop: 1, snuit: 0.85, kl: '#B09070' }, { lijf: 0.72, poot: 0.82, kop: 1.05, snuit: 0.7, kl: '#C29E74' }],
  [{ lijf: 0.75, poot: 0.85, kop: 1.05, snuit: 0.7, kl: '#B49272' }, { lijf: 0.66, poot: 0.8, kop: 1.1, snuit: 0.55, kl: '#C8A276' }, { lijf: 0.58, poot: 0.75, kop: 1.15, snuit: 0.45, kl: '#D2AA78' }]];
SCHERMEN.push({ titel: 'Wolf en hond', kop: 'Van wolf tot chihuahua', deel: 'De mens kiest',
  stappen: [
    { t: 'Minstens vijftienduizend jaar geleden leefden mensen al samen met wolven. Alle honden stammen af van wolven uit die tijd.', n: 'Bij een antibioticum kiest de mens per ongeluk; hier kiest hij met opzet.' },
    { t: 'Fokkers lieten steeds de dieren met de gewenste kenmerken jongen krijgen, bijvoorbeeld steeds de kleinste. Allelen voor een kleine bouw werden zo vaker in de genenpool.', n: 'Vraag uit de film: Hoe kan uit een wolf ooit een chihuahua ontstaan? (a) fokkers lieten steeds de kleinste honden jongen krijgen, (b) binnen wonen en weinig rennen maakte honden kleiner, (c) één grote mutatie maakte in één keer een chihuahua. Antwoord a. De generaties zijn schematisch: in werkelijkheid gaat het om veel meer generaties.' },
    { t: 'Dat heet <b>kunstmatige selectie</b>: hetzelfde mechanisme als natuurlijke selectie, maar de fokker bepaalt wie zich voortplant. Zo ontstonden <b>rassen</b>.', n: 'Ras: een groep honden met eigen erfelijke kenmerken. De meeste rassen zijn pas ongeveer tweehonderd jaar oud.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 2.0), a2 = S.on(2, 1.0);
    L4_hond(ctx, 300, 600, 1.35, a0, L4_WOLF); naam(ctx, 'wolf', 300, 660, a0, 'center', C.text, 34); regel(ctx, '≥ 15 000 jaar geleden', 300, 260, a0, C.text2, 30, 'center', 600);
    L4_GEN.forEach((gen, g) => { const x = 760 + g * 400, ag = a1 * S.on(1, 0.5, g * 0.7); if (ag <= 0.01) return; pijl(ctx, x - 240 + (g ? 40 : 0), 480, x - 130, 480, C.groen, 4, ag);
      gen.forEach((o, i) => { const y = 340 + i * 150; L4_hond(ctx, x, y, 0.62, ag, o); });
      ctx.save(); ctx.globalAlpha *= ag * S.on(1, 0.4, g * 0.7 + 0.35); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; roundRect(ctx, x - 110, 340 + 2 * 150 - 110, 220, 130, 18); ctx.stroke(); ctx.restore(); });
    const ac = a1 * S.on(1, 0.5, 1.5); pijl(ctx, 1290, 480, 1420, 480, C.groen, 4, ac); L4_hond(ctx, 1600, 600, 1.0, ac, L4_CHI); naam(ctx, 'chihuahua', 1600, 660, ac, 'center', C.text, 34);
    regel(ctx, 'steeds de kleinste', 960, 730, a1 * S.on(1, 0.5, 0.4), C.groen, 32, 'center', 700);
    termKaart(ctx, 'kunstmatige selectie', 'de mens bepaalt wie zich voortplant', 640, 810, a2, C.groen, 760);
    termKaart(ctx, 'ras', 'groep met eigen erfelijke kenmerken', 1380, 810, a2 * S.on(2, 0.6, 0.4), C.goud, 620);
  } });

// ---------- 9 · wilde kool ----------
const L4_KOOL = [['boerenkool', 'blad'], ['spruitjes', 'zijknoppen'], ['koolrabi', 'stengel'], ['broccoli', 'bloemknoppen'], ['bloemkool', 'bloemknoppen']];
SCHERMEN.push({ titel: 'Wilde kool', kop: 'Eén plant, vijf groenten', deel: 'De mens kiest',
  stappen: [
    { t: 'Bij planten heet dit <b>veredeling</b>. Kijk naar de wilde kool, een plant van de kalkkliffen langs het Kanaal.', n: 'Wilde kool = Brassica oleracea. Alle groenten op dit scherm zijn dezelfde soort.' },
    { t: 'Uit die ene soort kweekten mensen boerenkool, spruitjes, koolrabi, broccoli en bloemkool. Bij elke groente werd een ander deel steeds groter.', n: 'Boerenkool: blad · spruitjes: zijknoppen · koolrabi: stengel · broccoli en bloemkool: de bloeiwijze. Ook sluitkool (eindknop) hoort erbij.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 2.0);
    if (a0 > 0.01) { ctx.save(); ctx.globalAlpha *= a0; ctx.beginPath(); ctx.moveTo(560, 520); ctx.lineTo(1360, 520); ctx.lineTo(1330, 560); ctx.lineTo(590, 560); ctx.closePath(); ctx.fillStyle = C.licht ? '#E6E2D6' : '#C9C4B6'; ctx.fill(); ctx.restore(); }
    L4_wildeKool(ctx, 960, 520, 1.6, a0); naam(ctx, 'wilde kool', 1120, 300, a0, 'left', C.text, 36); regel(ctx, 'kalkklif', 1250, 600, a0, C.text2, 26, 'center', 500);
    L4_KOOL.forEach(([s, deel], i) => { const x = 240 + i * 360, a = a1 * S.on(1, 0.5, i * 0.25); if (a <= 0.01) return;
      pijl(ctx, 960 + (x - 960) * 0.15, 620, 960 + (x - 960) * 0.85, 700, C.groen, 3, a);
      L4_groente(ctx, s, x, 920, 1.05, a); regel(ctx, s, x, 980, a, C.text, 32, 'center', 700); naam(ctx, deel, x, 1025, a, 'center', C.groen, 26); });
  } });

// ---------- 10 · inteelt ----------
const L4_PUPS = [180, 340, 500, 660, 820];
SCHERMEN.push({ titel: 'Inteelt', kop: 'Familie van elkaar', deel: 'Inteelt',
  stappen: [
    { t: 'Dierenarts Mila ziet veel rashonden met erfelijke ziekten. Een ras is een kleine groep die alleen onderling paart, vaak met één populaire vader. Ouders zijn dan al snel familie: <b>inteelt</b>.', n: 'Hier: halfbroer en halfzus met dezelfde vader krijgen samen jongen.' },
    { t: 'Inteelt maakt geen nieuwe mutaties. Maar verwante ouders dragen vaak hetzelfde zeldzame allel. Hun jongen zijn dan vaker <b>homozygoot</b>, en een recessieve ziekte komt tot uiting.', n: 'Vraag uit de film: Waarom hebben rashonden vaker erfelijke ziekten? (a) bij inteelt ontstaan meer mutaties, (b) rashonden zijn zwakker door het leven in huis, (c) jongen krijgen vaker twee dezelfde recessieve allelen. Antwoord c. Geel = recessief ziekte-allel, blauw = gezond allel. De knikkers in de pot blijven dezelfde; alleen hoe ze in paren komen verandert.' },
    { t: 'Bij veel rassen is de inteelt gemiddeld even hoog als bij een pup van broer en zus.', n: 'Bannasch e.a. (2021): gemiddelde inteeltcoëfficiënt over 227 rassen ± 0,25, de waarde van een broer-zuskruising. Zie briefing.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.4), a1 = S.on(1, 1.2), a2 = S.on(2, 0.9), hk = { kl: '#B8875A', oor: 'hang', staart: 'krul', snuit: 0.8 };
    L4_hond(ctx, 500, 400, 0.7, a0, Object.assign({}, hk, { kl: '#8A6440' })); naam(ctx, 'populaire vader', 640, 270, a0, 'left', C.text, 30);
    ctx.save(); ctx.globalAlpha *= a0; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(500, 420); ctx.lineTo(500, 450); ctx.moveTo(180, 450); ctx.lineTo(820, 450); L4_PUPS.forEach(x => { ctx.moveTo(x, 450); ctx.lineTo(x, 480); }); ctx.stroke(); ctx.restore();
    L4_PUPS.forEach((x, i) => L4_hond(ctx, x, 600, 0.42, a0 * S.on(0, 0.4, 0.3 + i * 0.1), hk));
    const ap = a0 * S.on(0, 0.5, 0.9);
    ctx.save(); ctx.globalAlpha *= ap; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; [340, 660].forEach(x => { roundRect(ctx, x - 80, 500, 160, 120, 16); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(340, 640); ctx.lineTo(340, 700); ctx.lineTo(660, 700); ctx.lineTo(660, 640); ctx.moveTo(500, 700); ctx.lineTo(500, 760); ctx.stroke(); ctx.restore();
    L4_hond(ctx, 500, 880, 0.48, ap, hk);
    if (a1 > 0.01) { allelPaar(ctx, 340, 660 - 10, EV().a1, EV().a2, 13, a1); allelPaar(ctx, 660, 660 - 10, EV().a1, EV().a2, 13, a1);
      const aj = a1 * S.on(1, 0.5, 0.6); allelPaar(ctx, 500, 930, EV().a2, EV().a2, 16, aj); regel(ctx, 'ziek', 600, 942, aj, C.koraal, 32, 'left', 700); }
    termKaart(ctx, 'inteelt', 'paren met familie', 1410, 200, a0 * S.on(0, 0.5, 1.1), C.goud, 640);
    misvatting(ctx, 'inteelt maakt nieuwe mutaties', 'zelfde allelen, vaker in een gelijk paar', 1410, 400, 820, a1, S.on(1, 0.5, 0.5));
    termKaart(ctx, 'homozygoot', 'twee dezelfde allelen voor een gen', 1410, 600, a1 * S.on(1, 0.5, 0.9), EV().a2, 640);
    balk(ctx, 'veel rassen: inteelt ≈ pup van broer en zus', 1410, 900, 860, a2, C.koraal, 34);
  } });

// ---------- 11 · genenbank ----------
SCHERMEN.push({ titel: 'Genenbank', kop: 'Variatie bewaren', deel: 'Inteelt',
  stappen: [
    { t: 'Hetzelfde gebeurt bij gewassen. Boeren telen vaak maar een paar rassen, en oude rassen raken uit beeld.', n: 'Weinig rassen = weinig variatie in de genenpool van het gewas.' },
    { t: 'Daarom bewaart de <b>genenbank</b> in Wageningen zaden van oude rassen en wilde verwanten, diepgevroren. Een reservekopie ligt in een berg op Spitsbergen: meer dan 1,3 miljoen zaadmonsters.', n: 'Spitsbergen = Svalbard Global Seed Vault (Noorwegen). Het getal is van de Noorse overheid (oktober 2025).' },
    { t: 'Komt er een nieuwe plantenziekte, dan zit het allel voor resistentie misschien in een oud ras. Variatie in de genenpool is een verzekering.', n: 'Wat weg is, krijg je niet terug: een allel dat uitsterft, komt alleen door een nieuwe toevallige mutatie misschien ooit terug.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.4), a2 = S.on(2, 1.0);
    paneel(ctx, 100, 200, 520, 560, a0);
    metaText(ctx, 'één ras', 360, 250, C.text2, 'center', 20, a0); for (let i = 0; i < 9; i++) L4_graan(ctx, 160 + i * 50, 450, 150, '#D8B45A', a0);
    metaText(ctx, 'oude rassen', 360, 520, C.text2, 'center', 20, a0); const kl = ['#D8B45A', '#A8763E', '#E3CF8A', '#7E5A3A', '#C9A35C'];
    for (let i = 0; i < 9; i++) L4_graan(ctx, 160 + i * 50, 720, 100 + hash(i * 3) * 80, kl[i % 5], a0 * (1 - 0.6 * S.on(0, 0.8, 0.8) * (i % 3 === 0 ? 1 : 0)));
    L4_vriezer(ctx, 940, 720, a1); naam(ctx, 'genenbank', 940, 790, a1, 'center', C.teal, 34); regel(ctx, 'Wageningen', 940, 835, a1, C.text2, 28, 'center', 500);
    const ab = a1 * S.on(1, 0.6, 0.5); L4_berg(ctx, 1500, 720, ab); naam(ctx, 'zadenkluis', 1500, 790, ab, 'center', C.teal, 34); regel(ctx, 'Spitsbergen', 1500, 835, ab, C.text2, 28, 'center', 500);
    regel(ctx, '> 1,3 miljoen zaadmonsters', 1500, 300, ab, C.text, 32, 'center', 700);
    balk(ctx, 'variatie in de genenpool is een verzekering', 960, 950, 1100, a2, C.goud, 38);
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'De mens als selectiefactor', deel: 'Afsluiting',
  stappen: [
    { t: 'Een antibioticum doodt bacteriën, geen virussen. Maar overal waar het komt, <b>selecteert</b> het: de resistente bacteriën blijven over.', n: 'Daarom helpt het niet tegen griep, en maakt het wel resistentie.' },
    { t: '<b>Plasmiden</b> kunnen resistentie doorgeven, ook aan andere soorten.', n: 'ESBL is het bekende voorbeeld.' },
    { t: 'Bij honden en kool kiest de mens met opzet: <b>kunstmatige selectie</b> en veredeling. Inteelt geeft meer homozygoten. Steeds is de mens de selectiedruk.', n: 'Terug naar les 2: zelfde mechanisme als natuurlijke selectie, alleen de selectiedruk is anders.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['antibiotica', C.groen, ['doodt bacteriën,', 'geen virussen', 'selecteert resistentie']], ['plasmiden', C.teal, ['resistentie op', 'een ringetje DNA', 'ook naar andere soorten']], ['de mens kiest', C.goud, ['fokken en veredelen', 'inteelt: meer', 'homozygoten']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { L4_plekken(7, x + 80, 340, 380, 260, 6).forEach(([bx, by, r], k) => L4_bac(ctx, bx, by, 1, r, k === 2 || k === 5 ? EV().nieuw : EV().a1, a, { dood: k === 2 || k === 5 ? 0 : 0.8 })); }
      if (i === 1) { L4_bac(ctx, x + 150, 470, 2, 0, EV().a1, a, { plas: true }); L4_bac(ctx, x + 400, 470, 2, 0, C.oker, a, { vorm: 'dik', plas: true });
        ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + 230, 470); ctx.lineTo(x + 335, 470); ctx.stroke(); ctx.restore(); }
      if (i === 2) { L4_hond(ctx, x + 160, 600, 0.7, a, L4_CHI); L4_groente(ctx, 'broccoli', x + 400, 600, 1.0, a); }
      regels.forEach((r, k) => regel(ctx, r, x + 40, 720 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · volgende keer ----------
function L4_icoonDrift(ctx, x, y, a, T) { if (a <= 0.01) return; pot(ctx, x - 40, y + 100, 0.5, { p: 0.5, n: 40, seed: 2, a });
  [0, 1, 2].forEach(k => knikker(ctx, x + 90 + k * 26, y + 60 - k * 40, 11, k % 2 ? EV().a2 : EV().a1, a)); regel(ctx, 'toeval', x + 110, y - 70, a, C.goud, 26, 'center', 700); }
function L4_icoonFles(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath();
  ctx.moveTo(x - 110, y - 100); ctx.quadraticCurveTo(x - 10, y - 10, x - 18, y); ctx.quadraticCurveTo(x - 10, y + 10, x - 110, y + 100); ctx.moveTo(x + 110, y - 100); ctx.quadraticCurveTo(x + 10, y - 10, x + 18, y); ctx.quadraticCurveTo(x + 10, y + 10, x + 110, y + 100); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 10; i++) knikker(ctx, x - 60 + (i % 5) * 30, y - 80 + Math.floor(i / 5) * 28, 11, i % 3 ? EV().a1 : EV().a2, a);
  knikker(ctx, x, y, 11, EV().a1, a); knikker(ctx, x - 20, y + 70, 11, EV().a1, a); knikker(ctx, x + 14, y + 74, 11, EV().a1, a); }
function L4_icoonStroom(ctx, x, y, a, T) { if (a <= 0.01) return; pot(ctx, x - 85, y + 100, 0.4, { p: 0.8, n: 30, seed: 3, a }); pot(ctx, x + 85, y + 100, 0.4, { p: 0.2, n: 30, seed: 5, a });
  pijl(ctx, x - 40, y - 40, x + 40, y - 40, C.teal, 5, a); const u = (T * 0.4) % 1; knikker(ctx, lerp(x - 40, x + 40, u), y - 70, 10, EV().a1, a); }
function L4_icoonVier(ctx, x, y, a) { if (a <= 0.01) return; const k = EV().kracht; [[k.selectie, -1, -1], [k.drift, 1, -1], [k.stroom, -1, 1], [k.mutatie, 1, 1]].forEach(([c, dx, dy]) => pijl(ctx, x + dx * 110, y + dy * 80, x + dx * 40, y + dy * 30, c, 6, a, 20));
  knikker(ctx, x, y, 26, EV().a1, a); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 5): <b>toeval en uitwisseling</b>. Genetische drift, flessenhals, genenstroom en de vier krachten samen.', n: 'Huiswerk: de film De mens als selectiefactor (nog eens) kijken. Wie vooruit wil: film 5 Toeval en uitwisseling (puzzel: Kan een allel vaak worden zonder dat het iets oplevert?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Toeval en uitwisseling', [['Genetische drift', 'toeval verschuift de pot', L4_icoonDrift], ['Flessenhals', 'weinig overlevers', L4_icoonFles], ['Genenstroom', 'allelen reizen mee', L4_icoonStroom], ['Vier krachten', 'in één pot', L4_icoonVier]]); } });
