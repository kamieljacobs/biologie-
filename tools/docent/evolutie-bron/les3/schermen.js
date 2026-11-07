/* =====================================================================================
   Evolutie · les 3 · Vormen van selectie (31 okt 2026)
   Film 3 Vormen van selectie (films/evolutie/3-vormen-van-selectie.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min), te combineren met les 2 of les 4 in één lesuur. Geen vwo-blokken in de film.
   Eigen hulpen hebben het voorvoegsel L3_. Kleuren zoals de reeks: selectie groen, allel zwart blauw (EV().a1),
   allel licht geel (EV().a2). Personages: alleen verloskundige Mirjam en een baby (zoals de film), zonder naam in beeld.
   ===================================================================================== */

// ---------- hulpen ----------
const L3_g = (u, mu, sd) => Math.exp(-0.5 * ((u - mu) / sd) ** 2);
// zangvogel van opzij (zelfde bouw als les 2); o.kl = romp, o.kop = kop, o.sn = snavel, o.bek = snavelgrootte, o.kijk = -1 naar links
function L3_vogel(ctx, x, y, s, a, T, o = {}) { if (a <= 0.01) return; const { bek = 1, kijk = 1 } = o;
  const kl = o.kl || (C.licht ? '#6E5A44' : '#8A7258'), kop = o.kop || (C.licht ? '#4A3C2E' : '#5C4B3A'), sn = o.sn || C.oker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 2) * 2); ctx.scale(s * kijk, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 46, 30, -0.15, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-84, -6); ctx.lineTo(-80, 14); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  circ(ctx, 38, -24, 22, kop); if (o.borst) { ctx.beginPath(); ctx.ellipse(30, -4, 22, 20, 0.3, 0, 6.283); ctx.fillStyle = kop; ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(54, -24 - 11 * bek); ctx.quadraticCurveTo(54 + 12 + 18 * bek, -24, 56, -24 + 11 * bek); ctx.closePath(); ctx.fillStyle = sn; ctx.fill();
  circ(ctx, 44, -30, 3.5, '#111'); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-6, 28); ctx.lineTo(-10, 52); ctx.moveTo(10, 28); ctx.lineTo(8, 52); ctx.stroke(); ctx.restore(); }
const L3_ZAADKRAKER = () => ({ kl: '#1E1B1E', kop: '#B8322A', sn: '#5A6B82', borst: true });
// berkenspanner van boven, vleugels gespreid; zwart = carbonaria, anders licht met spikkels; s = 1 → ± 150 px breed
function L3_mot(ctx, x, y, s, zwart, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const vl = zwart ? '#262321' : '#E4DFCF', sp = zwart ? '#3A3632' : '#2A2622';
  [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(k * 74, -22); ctx.quadraticCurveTo(k * 70, 8, k * 56, 16); ctx.lineTo(0, 8); ctx.closePath(); ctx.fillStyle = vl; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(k * 50, 20); ctx.quadraticCurveTo(k * 40, 42, k * 6, 30); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 22; i++) { const u = hash(i * 3.1 + (k > 0 ? 7 : 0)), v = hash(i * 5.7 + (k > 0 ? 3 : 0)); circ(ctx, k * (8 + u * 58), -12 + v * 28 + u * 4, 1.6 + hash(i) * 1.6, sp); } });
  ctx.beginPath(); ctx.ellipse(0, 4, 7, 28, 0, 0, 6.283); ctx.fillStyle = zwart ? '#1A1817' : '#4A423A'; ctx.fill();
  ctx.strokeStyle = zwart ? '#1A1817' : '#4A423A'; ctx.lineWidth = 2; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * 2, -22); ctx.quadraticCurveTo(k * 12, -36, k * 18, -40); ctx.stroke(); });
  ctx.restore(); }
// boomstam (x = links), roet 0..1: licht met korstmos → zwart
function L3_stam(ctx, x, y, w, h, roet, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kl = mix('#CFC9B6', '#2B2723', roet); ctx.fillStyle = kl; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = mix(kl, '#000000', 0.25); ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const bx = x + 20 + hash(i * 2.3) * (w - 40); ctx.beginPath(); ctx.moveTo(bx, y + hash(i) * 60); ctx.bezierCurveTo(bx + 12, y + h * 0.3, bx - 12, y + h * 0.6, bx + 6, y + h - hash(i * 4) * 60); ctx.stroke(); }
  if (roet < 0.99) for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.ellipse(x + 20 + hash(i * 1.7) * (w - 40), y + 40 + hash(i * 6.1) * (h - 80), 18 + hash(i) * 20, 12 + hash(i * 2) * 10, hash(i * 3), 0, 6.283); ctx.fillStyle = rgba('#A9B694', 0.75 * (1 - roet)); ctx.fill(); }
  ctx.restore(); }
// fabrieksschoorsteen met rook
function L3_fabriek(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.licht ? '#6B5A50' : '#7A6A5E'; ctx.fillRect(x - 22, y - 260, 44, 260); ctx.fillRect(x - 90, y - 90, 180, 90);
  for (let i = 0; i < 6; i++) { const u = ((T * 0.25 + i / 6) % 1); circ(ctx, x + u * 160, y - 280 - u * 120, 24 + u * 40, rgba(C.licht ? '#555555' : '#9A9A9A', 0.5 * (1 - u))); } ctx.restore(); }
// pauw (anker = voeten); o.open 0..1 (sleep → waaier), o.vlek = deel veren met oogvlek, o.vrouw = pauwin, o.kijk
function L3_oog(ctx, x, y, r) { ctx.beginPath(); ctx.ellipse(x, y, r, r * 1.2, 0, 0, 6.283); ctx.fillStyle = '#3E8E5A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y + r * 0.06, r * 0.68, r * 0.82, 0, 0, 6.283); ctx.fillStyle = '#D9A93A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y + r * 0.1, r * 0.44, r * 0.54, 0, 0, 6.283); ctx.fillStyle = '#2A6A9A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y + r * 0.14, r * 0.22, r * 0.28, 0, 0, 6.283); ctx.fillStyle = '#16203A'; ctx.fill(); }
function L3_pauw(ctx, x, y, s, o = {}) { const { open = 0, vlek = 1, vrouw = false, kijk = 1, T = 0 } = o, a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineCap = 'round';
  const bx = -20, by = -120, tril = open > 0.5 ? Math.sin(T * 40) * 0.006 * open : 0;
  if (!vrouw) { const mid = lerp(Math.PI - 0.22, 1.5 * Math.PI, ease(open)), sp = lerp(0.1, 0.92 * Math.PI / 2, ease(open)), R = lerp(330, 300, open), n = 38;
    if (open > 0.05) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.arc(bx, by, R * 0.98, mid - sp, mid + sp); ctx.closePath(); ctx.fillStyle = rgba('#2F6A3A', 0.55 * open); ctx.fill(); }
    for (let i = 0; i < n; i++) { const an = mid - sp + (i + 0.5) / n * 2 * sp + tril * (i % 2 ? 1 : -1), rr = R * (0.9 + 0.1 * hash(i * 1.3)), tx = bx + Math.cos(an) * rr, ty = by + Math.sin(an) * rr;
      ctx.strokeStyle = '#4C7A36'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty); ctx.stroke();
      if (hash(i * 2.7 + 0.3) < vlek) L3_oog(ctx, tx, ty, lerp(9, 17, open));
      if (open > 0.5 && i % 2 === 0 && hash(i * 4.1 + 0.6) < vlek) L3_oog(ctx, bx + Math.cos(an) * rr * 0.66, by + Math.sin(an) * rr * 0.66, 12 * open); } }
  const romp = vrouw ? '#8C7A62' : '#1E5AA8', nek = vrouw ? '#6E7A5A' : '#1E5AA8';
  ctx.strokeStyle = '#7A7A7A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-6, -80); ctx.lineTo(-10, 0); ctx.moveTo(14, -80); ctx.lineTo(16, 0); ctx.stroke();
  if (vrouw) { ctx.beginPath(); ctx.moveTo(-40, -120); ctx.lineTo(-110, -100); ctx.lineTo(-96, -82); ctx.closePath(); ctx.fillStyle = romp; ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, -112, 54, 38, -0.15, 0, 6.283); ctx.fillStyle = romp; ctx.fill();
  ctx.beginPath(); ctx.ellipse(-8, -108, 32, 22, -0.2, 0, 6.283); ctx.fillStyle = vrouw ? '#7A6A52' : '#8A6A44'; ctx.fill();
  ctx.strokeStyle = nek; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(32, -130); ctx.quadraticCurveTo(50, -170, 44, -208); ctx.stroke();
  circ(ctx, 46, -214, 16, nek); ctx.beginPath(); ctx.moveTo(60, -218); ctx.lineTo(76, -212); ctx.lineTo(60, -206); ctx.closePath(); ctx.fillStyle = '#B8A88A'; ctx.fill();
  circ(ctx, 50, -218, 3, '#111'); ctx.strokeStyle = nek; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(44, -228); ctx.lineTo(36 + k * 5, -252); ctx.stroke(); circ(ctx, 36 + k * 5, -254, 3, nek); }
  ctx.restore(); }
// edelhert (anker = voeten); o.kop 0..1 = kop omlaag (vechten), o.gewei, o.kalf
function L3_hert(ctx, x, y, s, o = {}) { const { kijk = 1, kop = 0, gewei = true, kalf = false } = o, a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kl = kalf ? '#B07A4A' : '#8A5A34', dk = mix(kl, '#000000', 0.3);
  ctx.strokeStyle = dk; ctx.lineWidth = 12; [[-60, -100, -64], [-40, -100, -36], [50, -100, 46], [70, -100, 74]].forEach(([x1, y1, x2]) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, 0); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, -128, 92, 44, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  if (kalf) for (let i = 0; i < 8; i++) circ(ctx, -60 + hash(i) * 110, -148 + hash(i * 3) * 30, 5, '#E8D8B8');
  const hx = lerp(112, 150, kop), hy = lerp(-222, -128, kop), nx = lerp(92, 110, kop), ny = lerp(-200, -128, kop);
  ctx.strokeStyle = kl; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(60, -140); ctx.quadraticCurveTo(nx, ny + 10, hx - 10, hy); ctx.stroke();
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(lerp(0.35, 1.0, kop)); ctx.beginPath(); ctx.ellipse(14, 0, 34, 17, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); circ(ctx, 44, 2, 5, '#2A1E16'); circ(ctx, 8, -6, 3.5, '#111');
  ctx.beginPath(); ctx.ellipse(-12, -16, 12, 6, -0.8, 0, 6.283); ctx.fillStyle = dk; ctx.fill();
  if (gewei && !kalf) { ctx.strokeStyle = '#C8B48E'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-4, -12); ctx.bezierCurveTo(-30, -60, -20, -110, -50, -150); ctx.stroke();
    [[-14, -40, 12, -62], [-22, -80, 4, -104], [-34, -118, -14, -148], [-44, -138, -70, -164]].forEach(([x1, y1, x2, y2]) => { ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }); }
  ctx.restore(); ctx.restore(); }
// sterorchidee met lange nectarbuis (spoor) naar beneden; L = lengte van de buis in px
function L3_orchidee(ctx, x, y, s, a = 1, L = 500) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round';
  ctx.strokeStyle = '#D6DDBE'; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(0, 10 * s); ctx.bezierCurveTo(20 * s, L * 0.35, -20 * s, L * 0.7, 6 * s, L); ctx.stroke();
  circ(ctx, 6 * s, L, 9 * s, C.goud);
  for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + i * Math.PI / 3; ctx.save(); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -18 * s); ctx.quadraticCurveTo(46 * s, -20 * s, 120 * s, 0); ctx.quadraticCurveTo(46 * s, 20 * s, 0, 18 * s); ctx.closePath(); ctx.fillStyle = '#F3EFE2'; ctx.fill(); ctx.strokeStyle = '#CFC8B0'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  circ(ctx, 0, 0, 22 * s, '#E9E2C8', '#BFB698', 2); ctx.restore(); }
// pijlstaartvlinder (kop rechts); tong naar punt (tx, ty) in wereldcoördinaten
function L3_pijlstaart(ctx, x, y, s, a, T, tong) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (tong) { ctx.strokeStyle = '#B08850'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 46 * s, y + 6 * s); ctx.quadraticCurveTo((x + tong[0]) / 2 - 30, y + 30, tong[0], tong[1]); ctx.stroke(); }
  ctx.translate(x, y); ctx.scale(s, s); const fl = 0.55 + 0.45 * Math.abs(Math.sin(T * 14));
  [-1, 1].forEach(k => { ctx.save(); ctx.scale(1, k * fl); ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(30, -96); ctx.lineTo(56, -84); ctx.lineTo(20, 0); ctx.closePath(); ctx.fillStyle = '#857A68'; ctx.fill(); ctx.strokeStyle = '#5E5446'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(10, 0, 56, 14, 0, 0, 6.283); ctx.fillStyle = '#6E6252'; ctx.fill(); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#E3C88A'; ctx.fillRect(28 + i * 8, -12, 3, 24); }
  circ(ctx, -46, 2, 12, '#5E5446'); circ(ctx, -50, -2, 3, '#111'); ctx.restore(); }
// histogram op een as 0..1: f(u) geeft hoogte 0..1; o.kl, o.rand, o.dim(u) = extra doorzichtigheid per staaf
function L3_histo(ctx, x, y, w, h, f, a = 1, o = {}) { if (a <= 0.01) return; const n = o.n || 18, bw = w / n, kl = o.kl || C.teal;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, bh = h * f(u); if (bh < 1) continue; const d = o.dim ? o.dim(u) : 1;
    ctx.save(); ctx.globalAlpha *= d; roundRect(ctx, x + i * bw + bw * 0.08, y - bh, bw * 0.84, bh, Math.min(6, bw * 0.15)); shape(ctx, o.rand ? null : rgba(kl, 0.6), kl, o.rand ? 3 : 2); ctx.restore(); }
  ctx.restore(); }
function L3_as(ctx, x, y, w, a, labels = [], titel = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); ctx.restore();
  labels.forEach(([u, s]) => regel(ctx, s, x + u * w, y + 38, a, C.text2, 26, 'center', 500)); if (titel) metaText(ctx, titel, x + w / 2, y + 80, C.text2, 'center', 20, a); }
// weegschaal voor baby's
function L3_weegschaal(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y, 300, 70, 14); shape(ctx, C.fill, C.line, 2.5);
  roundRect(ctx, x - 60, y + 16, 120, 40, 8); shape(ctx, C.bg, C.line, 2); ctx.beginPath(); ctx.moveTo(x - 190, y - 6); ctx.quadraticCurveTo(x, y + 30, x + 190, y - 6); ctx.lineTo(x + 170, y - 18); ctx.quadraticCurveTo(x, y + 8, x - 170, y - 18); ctx.closePath(); shape(ctx, rgba(C.line, 0.4), C.line, 2); ctx.restore(); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 3: vormen van selectie. Gericht, stabiliserend, splitsend, seksuele selectie en co-evolutie', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 3 van de nieuwe reeks, Vormen van selectie: havo Biologie voor jou H4, vwo Nectar H7. Bewust kort (± 25 minuten), te combineren met les 2 of les 4 in één lesuur.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 3', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Vormen van', 140, 465, fTitel(98), C.text); text(ctx, 'selectie', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'gericht · stabiliserend · splitsend · seksueel', 144, 675, 1, C.text2, 32, 'left', 400);
    L3_pauw(ctx, 1450, 900, 1.25, { open: 1, T });
  } });

// ---------- 2 · de pauw en de baby's ----------
SCHERMEN.push({ titel: 'Pauw en baby', kop: 'Waarom worden baby\'s niet steeds zwaarder?', deel: 'Opening',
  stappen: [
    { t: 'Een pauw sleept een sleep van ± 1,5 meter mee. Die kost energie en valt op voor roofdieren. Toch heeft elke volwassen pauwhaan er een.', n: 'De opening van de film. Laat het raadsel even hangen: waarom bestaat zoiets onhandigs? Het antwoord komt bij seksuele selectie (scherm 9).' },
    { t: 'Heel kleine baby\'s hebben het moeilijker dan grotere. Waarom worden baby\'s dan niet elke generatie zwaarder?', n: 'Startvraag van de film (kun je zelf stellen): Waarom worden baby\'s niet steeds zwaarder? Het antwoord komt bij stabiliserende selectie (scherm 7).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9);
    L3_pauw(ctx, 720, 700, 1.4, { a: a0, T });
    if (a0 > 0.01) { const x1 = 720 - 20 * 1.4 - 330 * 1.4, x2 = 720 - 20 * 1.4; ctx.save(); ctx.globalAlpha *= a0 * S.on(0, 0.5, 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x1, 760); ctx.lineTo(x2, 760); ctx.moveTo(x1, 744); ctx.lineTo(x1, 776); ctx.moveTo(x2, 744); ctx.lineTo(x2, 776); ctx.stroke(); ctx.restore();
      naam(ctx, '± 1,5 m', (x1 + x2) / 2, 816, a0 * S.on(0, 0.5, 0.5), 'center', C.goud, 34);
      regel(ctx, 'kost energie', 640, 900, a0 * S.on(0, 0.5, 0.8), C.koraal, 32, 'center', 700); regel(ctx, 'valt op', 640, 950, a0 * S.on(0, 0.5, 0.8), C.koraal, 32, 'center', 700); }
    if (a1 > 0.01) { [[1190, 150], [1440, 200], [1730, 250]].forEach(([x, h], i) => pers(ctx, 'baby', x, 640, h, { t: T + i, uit: 'blij', a: a1 * S.on(1, 0.5, i * 0.2) }));
      regel(ctx, 'heel klein', 1190, 720, a1, C.koraal, 30, 'center', 700); regel(ctx, 'meer risico', 1190, 762, a1, C.koraal, 28, 'center', 500);
      pijl(ctx, 1260, 860, 1760, 860, C.text2, 4, a1 * S.on(1, 0.5, 0.6)); regel(ctx, 'zwaarder', 1510, 920, a1 * S.on(1, 0.5, 0.6), C.text2, 30, 'center', 600); }
  } });

// ---------- 3 · berkenspanner ----------
SCHERMEN.push({ titel: 'Berkenspanner', kop: 'Twee vormen, één gen', deel: 'Gerichte selectie',
  stappen: [
    { t: 'De <b>berkenspanner</b>, een nachtvlinder, zit overdag stil op een stam. Er is een lichte vorm met spikkels en een bijna zwarte. Het verschil komt door één gen met twee allelen.', n: 'Het allel voor zwart (carbonaria) is dominant over het allel voor licht (typica). Blauw = allel zwart, geel = allel licht, zoals in de reeks.' },
    { t: 'Rond Manchester wordt in 1848 de eerste zwarte gevangen. Fabrieken stoken steenkool; roet maakt de stammen zwart en de lichte korstmossen sterven af.', n: 'Laat zien hoe de camouflage omdraait: op een lichte stam valt de zwarte op, op een zwarte stam de lichte.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), roet = ease(a1);
    L3_stam(ctx, 420, 180, 340, 860, roet, a0); L3_fabriek(ctx, 210, 1040, a1, T);
    L3_mot(ctx, 560, 420, 0.9, false, a0, -0.2); L3_mot(ctx, 640, 760, 0.9, true, a0, 0.25);
    if (a1 > 0.01) regel(ctx, '1848 · roet', 210, 560, a1, C.text2, 32, 'center', 700);
    const sub = S.on(0, 0.6, 0.4);
    [[1220, false, 'licht met spikkels', EV().a2, 'allel licht'], [1620, true, 'zwart', EV().a1, 'allel zwart']].forEach(([x, z, nm, kk, al]) => {
      L3_mot(ctx, x, 440, 2.0, z, a0 * sub); naam(ctx, nm, x, 600, a0 * sub, 'center', C.text, 34);
      knikker(ctx, x, 700, 26, kk, a0 * sub); naam(ctx, al, x, 770, a0 * sub, 'center', kk, 30); });
    if (a0 > 0.01) regel(ctx, 'één gen, twee allelen', 1420, 880, a0 * S.on(0, 0.6, 0.8), C.goud, 36, 'center', 700);
  } });

// ---------- 4 · Manchester ----------
const L3_ZWART = [[1848, 1], [1860, 8], [1870, 30], [1880, 70], [1895, 98], [1920, 97], [1955, 95], [1965, 90], [1975, 75], [1985, 50], [1995, 22], [2005, 6], [2015, 2]];
SCHERMEN.push({ titel: 'Manchester', kop: 'Zwart wordt gewoon, en weer zeldzaam', deel: 'Gerichte selectie',
  stappen: [
    { t: 'Op een zwarte stam vindt een vogel de lichte vlinders het eerst. Zwarte vlinders worden minder vaak opgegeten en krijgen meer nakomelingen.', n: 'Vraag uit de film: Wat gebeurt er de jaren daarna met de berkenspanners rond Manchester? (a) de lichte vlinders worden donker van het roet, (b) vogels eten vaker lichte vlinders: zwart wordt vaker, (c) er verandert niets. Antwoord b.' },
    { t: 'In 1895 is rond Manchester ± 98 % van de berkenspanners zwart.', n: 'Geen enkele vlinder verandert van kleur (antwoord a is de misvatting): de allelfrequentie van zwart stijgt.' },
    { t: 'Dan komen wetten voor schone lucht, zoals in 1956. De stammen worden weer licht, en het zwarte allel wordt weer zeldzaam: nu nog maar een paar procent.', n: 'De richting van selectie draait om, net als bij de vinken in 1983 (les 2). De curve is schematisch; zie de briefing voor gemeten getallen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.2), a1 = S.on(1, 1.4), a2 = S.on(2, 1.6), roet = 1 - ease(a2);
    L3_stam(ctx, 140, 180, 300, 860, roet, 1);
    const eet = clamp(a0 * 1.4 - 0.2, 0, 1);
    L3_mot(ctx, 290, 360, 0.8, true, 1, 0.2); L3_mot(ctx, 250, 820, 0.8, true, 1, -0.3); L3_mot(ctx, 330, 600, 0.8, false, 1 - eet, 0.1);
    L3_vogel(ctx, lerp(560, 440, ease(a0)), lerp(420, 580, ease(a0)), 1.3, a0 * (1 - S.on(1, 0.6)), T, { kijk: -1 });
    if (eet > 0.2 && eet < 0.99) kruis(ctx, 330, 600, 18, Math.sin(eet * Math.PI), C.koraal);
    const x0 = 680, y0 = 900, gw = 1060, gh = 600, X = (j) => x0 + (j - 1840) / (2020 - 1840) * gw, Y = (p) => y0 - p / 100 * gh;
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0 - gh); ctx.lineTo(x0, y0); ctx.lineTo(x0 + gw, y0); ctx.stroke(); ctx.restore();
      [1850, 1900, 1950, 2000].forEach(j => regel(ctx, String(j), X(j), y0 + 40, a1, C.text2, 26, 'center', 500)); [0, 50, 100].forEach(p => regel(ctx, p + '%', x0 - 16, Y(p) + 9, a1, C.text2, 24, 'right', 500));
      metaText(ctx, 'zwarte berkenspanners rond Manchester', x0 + 10, y0 - gh - 44, C.text2, 'left', 20, a1);
      const tot = lerp(1848, 1895, a1) + (a2 > 0 ? (2015 - 1895) * a2 : 0); const pts = []; L3_ZWART.forEach(([j, p], i) => { if (j <= tot) pts.push([X(j), Y(p)]); else if (i && L3_ZWART[i - 1][0] < tot) { const [j0, p0] = L3_ZWART[i - 1], u = (tot - j0) / (j - j0); pts.push([X(tot), Y(lerp(p0, p, u))]); } });
      ctx.save(); ctx.strokeStyle = EV().a1; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
      circ(ctx, X(1895), Y(98), 9, EV().a1); regel(ctx, '1895: ± 98 % zwart', X(1895) + 24, Y(98) + 54, a1 * S.on(1, 0.5, 1.0), C.text, 32, 'left', 700); }
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(1956), Y(100)); ctx.lineTo(X(1956), y0); ctx.stroke(); ctx.restore();
      regel(ctx, '1956 · schone lucht', X(1956) - 14, Y(30), a2, C.groen, 30, 'right', 700);
      regel(ctx, 'nu: paar procent', 1900, Y(14), a2 * S.on(2, 0.5, 1.1), C.text, 30, 'right', 700); }
  } });

// ---------- 5 · gerichte selectie ----------
SCHERMEN.push({ titel: 'Gerichte selectie', kop: 'Eén kant heeft voordeel', deel: 'Gerichte selectie',
  stappen: [
    { t: 'Eén kant van de variatie heeft een voordeel; de andere kant een nadeel.', n: 'Bij de berkenspanner: donker heeft voordeel op zwarte stammen. Het histogram is algemeen (een kenmerk met veel tussenvormen, zoals snavelhoogte).' },
    { t: 'Het gemiddelde schuift die kant op, generatie na generatie. Dat heet <b>gerichte selectie</b>.', n: 'De spreiding blijft ongeveer gelijk; de hele verdeling schuift.' },
    { t: 'Je zag het ook bij de vinken van Daphne Major: in de droogte van 1977 schoof de snavelhoogte omhoog.', n: 'Brug naar les 2. Gerichte selectie stopt als de omgeving niet meer verandert, of draait om (berkenspanner na 1956, vinken na 1983).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 0.9);
    const hx = 160, hy = 780, hw = 1100, hh = 460;
    L3_as(ctx, hx, hy, hw, 1, [[0.08, 'klein'], [0.92, 'groot']], 'kenmerk');
    L3_histo(ctx, hx, hy, hw, hh, u => L3_g(u, 0.4, 0.13), 1, { kl: a1 > 0.01 ? C.line : C.teal, rand: a1 > 0.01, dim: u => a0 > 0.01 && a1 < 0.01 ? lerp(1, 0.35, ease(clamp((0.32 - u) * 6 * a0, 0, 1))) : 1 });
    if (a0 > 0.01) { kruis(ctx, hx + 0.1 * hw, hy - 110, 18, a0, C.koraal); regel(ctx, 'nadeel', hx + 0.1 * hw, hy - 150, a0, C.koraal, 32, 'center', 700);
      vink(ctx, hx + 0.94 * hw, hy - 110, 18, a0, C.groen); regel(ctx, 'voordeel', hx + 0.94 * hw, hy - 150, a0, C.groen, 32, 'center', 700); }
    if (a1 > 0.01) { const mu = 0.4 + 0.22 * ease(a1); L3_histo(ctx, hx, hy, hw, hh, u => L3_g(u, mu, 0.13), a1, { kl: C.teal });
      pijl(ctx, hx + 0.4 * hw, hy - hh - 40, hx + mu * hw + 10, hy - hh - 40, C.groen, 5, a1);
      termKaart(ctx, 'gerichte selectie', 'het gemiddelde schuift één kant op', 1580, 300, a1 * S.on(1, 0.6, 0.8), C.groen); }
    if (a2 > 0.01) { L3_mot(ctx, 1450, 640, 1.0, false, a2); pijl(ctx, 1530, 640, 1610, 640, C.groen, 4, a2); L3_mot(ctx, 1700, 640, 1.0, true, a2);
      L3_vogel(ctx, 1440, 860, 0.9, a2, T, { bek: 0.9 }); pijl(ctx, 1530, 850, 1610, 850, C.groen, 4, a2); L3_vogel(ctx, 1700, 860, 0.9, a2, T + 1, { bek: 1.4 }); }
  } });

// ---------- 6 · geboortegewicht ----------
const L3_KG = (kg) => (kg - 1) / 4.5; // as 1–5,5 kg
SCHERMEN.push({ titel: 'Geboortegewicht', kop: 'Baby\'s verschillen in gewicht', deel: 'Stabiliserende selectie',
  stappen: [
    { t: 'Verloskundige Mirjam weegt een pasgeboren baby. Het gewicht hangt af van de voeding en gezondheid van de moeder, maar deels ook van erfelijke aanleg.', n: 'Mirjam is de verloskundige uit de reeks. Alleen het erfelijke deel van de variatie doet mee aan evolutie.' },
    { t: 'In Londen noteerden artsen bij duizenden baby\'s, geboren tussen 1935 en 1946, het geboortegewicht en of de baby de eerste weken overleefde.', n: 'Vraag uit de film: Welke baby\'s hadden toen de grootste kans om te overleven? (a) de baby\'s met een gemiddeld gewicht, (b) de zwaarste baby\'s, (c) de lichtste baby\'s: die worden makkelijker geboren. Antwoord a (volgende scherm).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.3);
    pers(ctx, 'mirjam', 380, 1000, 720, { t: T, uit: 'blij', kijk: 1, a: a0 });
    L3_weegschaal(ctx, 760, 820, a0); pers(ctx, 'baby', 760, 812, 230, { t: T, uit: 'blij', a: a0 });
    if (a0 > 0.01) regel(ctx, '3,4 kg', 760, 860, a0 * S.on(0, 0.5, 0.5), C.text, 28, 'center', 700);
    const hx = 1040, hy = 860, hw = 780, hh = 480;
    L3_as(ctx, hx, hy, hw, a1, [[L3_KG(1), '1'], [L3_KG(2), '2'], [L3_KG(3), '3'], [L3_KG(4), '4'], [L3_KG(5), '5']], 'geboortegewicht (kg)');
    L3_histo(ctx, hx, hy, hw, hh * ease(a1), u => L3_g(u, L3_KG(3.3), 0.13), a1, { kl: C.teal });
    if (a1 > 0.01) { regel(ctx, 'duizenden baby\'s', hx + hw / 2, 250, a1 * S.on(1, 0.5, 0.6), C.text, 34, 'center', 700); regel(ctx, 'Londen · 1935–1946', hx + hw / 2, 296, a1 * S.on(1, 0.5, 0.6), C.text2, 28, 'center', 500); }
  } });

// ---------- 7 · stabiliserende selectie ----------
const L3_overleef = (kg, zorg) => { const oud = 0.12 + 0.86 * Math.exp(-0.5 * ((kg - 3.5) / 0.95) ** 4 * 0.9), nu = 0.97 - 0.5 * (clamp((2.5 - kg) / 1.4, 0, 1) ** 1.6) - 0.25 * clamp((kg - 4.6) / 1, 0, 1); return lerp(oud, nu, zorg); };
SCHERMEN.push({ titel: 'Stabiliserend', kop: 'Het midden overleeft het best', deel: 'Stabiliserende selectie',
  stappen: [
    { t: 'Baby\'s van ± 3,5 kg overleefden het vaakst. Veel lichtere baby\'s hadden het moeilijk, maar heel zware ook: dan was de geboorte gevaarlijker.', n: 'Antwoord a op de vraag van het vorige scherm. Bovenste lijn = kans om de eerste weken te overleven (schematisch, naar Karn & Penrose 1951).' },
    { t: 'Beide uitersten hebben een nadeel. Het gemiddelde blijft staan en de spreiding wordt kleiner: <b>stabiliserende selectie</b>.', n: 'Daarom werden baby\'s niet steeds zwaarder: ook zware baby\'s hadden een nadeel. Antwoord op de startvraag (scherm 2).' },
    { t: 'Met goede zorg is dat veranderd: dankzij couveuses en keizersneden overleven bijna alle baby\'s van 2,5 tot 4,5 kg even goed.', n: 'Die selectiedruk is in landen met goede zorg grotendeels verdwenen. Mooi bruggetje naar les 4: de mens verandert de selectie.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.4), a1 = S.on(1, 1.4), a2 = S.on(2, 1.6), zorg = ease(a2);
    const hx = 160, hw = 1080, X = (kg) => hx + L3_KG(kg) * hw, cy = 520, ch = 300;
    L3_as(ctx, hx, 920, hw, 1, [[L3_KG(1), '1'], [L3_KG(2), '2'], [L3_KG(3), '3'], [L3_KG(4), '4'], [L3_KG(5), '5']], 'geboortegewicht (kg)');
    if (a0 > 0.01) { metaText(ctx, 'kans om te overleven', hx, cy - ch - 20, C.text2, 'left', 20, a0); const pts = [];
      for (let i = 0; i <= 80; i++) { const u = i / 80; if (u > a0) break; const kg = 1 + 4.5 * u; pts.push([hx + u * hw, cy - ch * L3_overleef(kg, zorg)]); }
      ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
      const b = S.on(0, 0.5, 1.2) * (1 - zorg); vink(ctx, X(3.5), cy - ch - 40, 16, b, C.groen); regel(ctx, '± 3,5 kg', X(3.5) + 30, cy - ch - 28, b, C.groen, 30, 'left', 700);
      kruis(ctx, X(1.4), cy - 60, 14, b, C.koraal); regel(ctx, 'te licht', X(1.4), cy - 10, b, C.koraal, 28, 'center', 700);
      kruis(ctx, X(5.2), cy - 60, 14, b, C.koraal); regel(ctx, 'te zwaar', X(5.2), cy - 10, b, C.koraal, 28, 'center', 700); }
    L3_histo(ctx, hx, 920, hw, 300, u => L3_g(u, L3_KG(3.3), 0.15), 1, { kl: a1 > 0.01 ? C.line : C.teal, rand: a1 > 0.01 });
    if (a1 > 0.01) { const sd = lerp(0.15, 0.1, ease(a1)); L3_histo(ctx, hx, 920, hw, 300, u => L3_g(u, L3_KG(3.3), sd), a1, { kl: C.teal });
      pijl(ctx, X(1.6), 760, X(2.4), 760, C.groen, 4, a1); pijl(ctx, X(5.0), 760, X(4.2), 760, C.groen, 4, a1);
      termKaart(ctx, 'stabiliserende selectie', 'beide uitersten hebben een nadeel', 1580, 300, a1 * S.on(1, 0.6, 0.8), C.groen);
      regel(ctx, 'smaller, gemiddelde blijft', 1580, 500, a1 * S.on(1, 0.6, 1.0), C.text, 32, 'center', 600); }
    if (a2 > 0.01) { regel(ctx, 'nu, met goede zorg', 1580, 680, a2, C.goud, 36, 'center', 700); regel(ctx, '2,5–4,5 kg: bijna allemaal', 1580, 730, a2, C.text, 30, 'center', 600);
      regel(ctx, 'selectiedruk grotendeels weg', 1580, 780, a2 * S.on(2, 0.5, 0.8), C.text2, 28, 'center', 500); }
  } });

// ---------- 8 · splitsende selectie ----------
SCHERMEN.push({ titel: 'Splitsend', kop: 'Klein of groot, niet ertussenin', deel: 'Splitsende selectie',
  stappen: [
    { t: 'De <b>zwartbuikzaadkraker</b> in Kameroen: in één populatie hebben sommige vogels een kleine snavel, andere een grote.', n: 'Vraag uit de film: Wat gebeurt er met de snavels in deze populatie? (a) ze worden middelgroot: het beste van twee werelden, (b) alle snavels worden groot, (c) twee groepen, klein en groot, met weinig ertussen. Antwoord c.' },
    { t: 'Een kleine snavel eet sneller de zachte zaden van de ene zegge; een grote kraakt de harde zaden van een andere. Een snavel ertussenin is in geen van beide goed.', n: 'Zegge = een grasachtige moerasplant (Scleria). De twee voedselbronnen zijn de selectiedruk.' },
    { t: 'De vogels in het midden overleven het slechtst. Het histogram krijgt twee toppen: <b>splitsende selectie</b>.', n: 'Bij deze vogel bepaalt vooral één gen of de snavel klein of groot wordt. Splitsende selectie kan het makkelijkst tot nieuwe soorten leiden (les 6); de zaadkraker is nog één soort.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.0), a2 = S.on(2, 1.4);
    const vg = [[330, 0.55, 'kleine snavel', 0], [790, 1.15, 'ertussenin', 1], [1250, 1.9, 'grote snavel', 2]];
    vg.forEach(([x, bek, nm, i]) => { const a = a0 * S.on(0, 0.5, i * 0.2); L3_vogel(ctx, x, 320, 1.6, a, T + i, Object.assign({ bek }, L3_ZAADKRAKER())); naam(ctx, nm, x, 460, a, 'center', C.text, 32); });
    if (a1 > 0.01) { for (let k = 0; k < 7; k++) circ(ctx, 250 + k * 26, 540 + (k % 2) * 16, 8, C.licht ? '#C9B07A' : '#D8C190');
      regel(ctx, 'zacht zaad', 330, 610, a1, C.text2, 28, 'center', 600); vink(ctx, 470, 540, 14, a1 * S.on(1, 0.5, 0.3), C.groen);
      for (let k = 0; k < 4; k++) circ(ctx, 1180 + k * 46, 548, 18, C.licht ? '#6E5A3E' : '#8A7454', mix('#6E5A3E', '#000000', 0.3), 2);
      regel(ctx, 'hard zaad', 1250, 610, a1, C.text2, 28, 'center', 600); vink(ctx, 1400, 540, 14, a1 * S.on(1, 0.5, 0.3), C.groen);
      kruis(ctx, 790, 560, 18, a1 * S.on(1, 0.5, 0.6), C.koraal); }
    const hx = 200, hy = 960, hw = 1180, hh = 260;
    L3_as(ctx, hx, hy, hw, a2, [[0.08, 'klein'], [0.92, 'groot']], 'snavelgrootte');
    if (a2 > 0.01) { const k = ease(a2); L3_histo(ctx, hx, hy, hw, hh, u => lerp(L3_g(u, 0.5, 0.22), Math.max(L3_g(u, 0.24, 0.08), L3_g(u, 0.76, 0.08)), k), a2, { kl: C.teal });
      termKaart(ctx, 'splitsende selectie', 'beide uitersten hebben voordeel', 1640, 640, a2 * S.on(2, 0.6, 0.9), C.groen);
      regel(ctx, 'twee toppen', 1640, 830, a2 * S.on(2, 0.6, 1.1), C.text, 34, 'center', 700); }
  } });

// ---------- 9 · seksuele selectie ----------
SCHERMEN.push({ titel: 'Seksuele selectie', kop: 'Het vrouwtje kiest', deel: 'Seksuele selectie',
  stappen: [
    { t: 'Bij pauwen kiest het vrouwtje, de pauwin. De pauw zet zijn staart op als een waaier en laat de veren trillen.', n: 'Vraag uit de film: Waarom blijft zo\'n opvallende staart generatie na generatie bestaan? (a) hij schrikt roofdieren af, (b) pauwinnen kiezen vaker een pauw met een volle staart, (c) de pauw laat hem groeien omdat hij hem nodig heeft. Antwoord b.' },
    { t: 'Een pauw met veel minder oogvlekken wordt minder vaak gekozen. Wie gekozen wordt, krijgt meer jongen, ook al kost de staart energie.', n: 'Welke delen van de staart het zwaarst wegen, onderzoeken biologen nog (zie briefing). Antwoord c is de doel-misvatting uit les 2.' },
    { t: 'Dit heet <b>seksuele selectie</b>: selectie door het andere geslacht.', n: 'Antwoord op het raadsel van scherm 2: de staart is een nadeel bij het overleven, maar een voordeel bij het voortplanten.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.4), a1 = S.on(1, 1.0), a2 = S.on(2, 0.9);
    L3_pauw(ctx, 500, 760, 1.0, { open: ease(a0), T, a: S.on(0, 0.4) });
    L3_pauw(ctx, 1650, 760, 1.1, { vrouw: true, kijk: -1, T, a: S.on(0, 0.4) });
    if (a0 > 0.01) naam(ctx, 'pauwin', 1650, 820, a0, 'center', C.text, 32);
    if (a1 > 0.01) { L3_pauw(ctx, 1140, 760, 0.72, { open: 1, vlek: 0.35, T: T + 1, a: a1 });
      vink(ctx, 380, 820, 18, a1 * S.on(1, 0.5, 0.4), C.groen); regel(ctx, 'vaker gekozen', 410, 832, a1 * S.on(1, 0.5, 0.4), C.groen, 32, 'left', 700);
      regel(ctx, 'minder oogvlekken:', 1140, 820, a1, C.text2, 28, 'center', 600); regel(ctx, 'minder vaak gekozen', 1140, 858, a1, C.text2, 28, 'center', 600); }
    termKaart(ctx, 'seksuele selectie', 'selectie door het andere geslacht', 960, 905, a2, C.groen);
  } });

// ---------- 10 · strijd ----------
SCHERMEN.push({ titel: 'Strijd', kop: 'Nadeel bij overleven, voordeel bij voortplanten', deel: 'Seksuele selectie',
  stappen: [
    { t: 'Seksuele selectie kan ook via strijd gaan. Edelherten vechten in de bronst met hun gewei om de hinden. Ongeveer een op de vier volwassen herten raakt elk jaar gewond.', n: 'Hinde = vrouwtjeshert. Bronst = de paartijd in de herfst. Het getal (± 1 op 4) is dat van de film; zie de briefing (Clutton-Brock, Rum).' },
    { t: 'Maar een hert dat wint, krijgt veel nakomelingen.', n: 'Op Rum (Schotland) krijgen een paar winnende herten het grootste deel van de kalveren; veel herten krijgen er nooit een.' },
    { t: 'Een kenmerk kan dus een nadeel zijn om te overleven, en toch winnen bij het voortplanten. <b>Fitness</b> telt nakomelingen, geen levensjaren.', n: 'Brug naar fitness uit les 2. Dat geldt voor de pauwenstaart en het gewei.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.2), a2 = S.on(2, 0.9), d = Math.sin(T * 3) * 6 * a0;
    L3_hert(ctx, 560 - d, 640, 1.3, { kop: 1, a: a0 }); L3_hert(ctx, 1000 + d, 640, 1.3, { kop: 1, kijk: -1, a: a0 });
    if (a0 > 0.01) { regel(ctx, 'bronst', 780, 230, a0, C.text2, 30, 'center', 600);
      for (let k = 0; k < 4; k++) circ(ctx, 1320 + k * 70, 300, 24, k === 0 ? C.koraal : rgba(C.line, 0.5)); regel(ctx, '± 1 op 4 gewond per jaar', 1425, 370, a0 * S.on(0, 0.5, 0.5), C.text, 30, 'center', 700); }
    if (a1 > 0.01) { for (let k = 0; k < 6; k++) L3_hert(ctx, 1260 + (k % 3) * 170, 560 + Math.floor(k / 3) * 150, 0.45, { kalf: true, kijk: -1, a: a1 * S.on(1, 0.4, 0.2 + k * 0.12) });
      pijl(ctx, 1150, 520, 1220, 520, C.groen, 4, a1); regel(ctx, 'winnaar: veel nakomelingen', 1430, 790, a1 * S.on(1, 0.5, 0.9), C.groen, 30, 'center', 700); }
    if (a2 > 0.01) { kansBalk(ctx, 340, 860, 420, 40, 0.35, C.koraal, a2, 'overleven'); kansBalk(ctx, 1000, 860, 420, 40, 0.9, C.groen, a2, 'voortplanten');
      balk(ctx, 'fitness telt nakomelingen, geen levensjaren', 960, 990, 1100, a2 * S.on(2, 0.5, 0.5), C.goud, 36); }
  } });

// ---------- 11 · co-evolutie ----------
SCHERMEN.push({ titel: 'Co-evolutie', kop: 'Elkaars selectiedruk', deel: 'Co-evolutie',
  stappen: [
    { t: 'Op Madagaskar groeit Darwins orchidee. De nectar zit onderin een buis van 20 tot 35 centimeter. Darwin voorspelde in 1862: er moet een insect zijn met een tong die bijna net zo lang is.', n: 'Angraecum sesquipedale (sterorchidee). Darwin beschreef de bloem in zijn orchideeënboek van 1862.' },
    { t: 'In 1903 werd de pijlstaartvlinder beschreven die erbij past: zijn tong kan bijna 30 centimeter lang zijn.', n: 'Vraag uit de film: Waarom zijn de buis en de tong allebei zo lang geworden? (a) de bloem maakte haar buis langer voor deze vlinder, (b) toeval: ze passen toevallig bij elkaar, (c) ze waren generaties lang elkaars selectiedruk. Antwoord c.' },
    { t: 'Een langere buis dwingt de vlinder diep te steken: zijn kop raakt het stuifmeel. Een langere tong haalt meer nectar. Zo zijn ze elkaars selectiedruk: <b>co-evolutie</b>.', n: 'Steun: Nilsson (1988) maakte bij een andere orchidee de buis korter; die bloemen werden minder goed bestoven. Er is ook een andere verklaring: misschien werd de tong eerst lang om afstand te houden van spinnen die bij bloemen loeren.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.4), a2 = S.on(2, 1.2);
    const fx = 420, fy = 300, L = 640;
    L3_orchidee(ctx, fx, fy, 1.0, a0, L);
    if (a0 > 0.01) { naam(ctx, 'nectar', fx + 40, fy + L + 10, a0 * S.on(0, 0.5, 0.4), 'left', C.goud, 30);
      ctx.save(); ctx.globalAlpha *= a0 * S.on(0, 0.5, 0.6); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(fx - 120, fy + 20); ctx.lineTo(fx - 120, fy + L); ctx.moveTo(fx - 134, fy + 20); ctx.lineTo(fx - 106, fy + 20); ctx.moveTo(fx - 134, fy + L); ctx.lineTo(fx - 106, fy + L); ctx.stroke(); ctx.restore();
      regel(ctx, '20–35 cm', fx - 140, fy + L / 2, a0 * S.on(0, 0.5, 0.6), C.text, 30, 'right', 700);
      regel(ctx, '1862 · Darwin voorspelt', fx + 50, fy + L - 120, a0 * S.on(0, 0.5, 0.9), C.text2, 28, 'left', 600); }
    if (a1 > 0.01) { const u = ease(clamp(a1 * 1.4, 0, 1)), mx = lerp(1100, fx + 150, u), my = lerp(240, fy - 30, u), d = clamp((a1 * 1.4 - 0.75) / 0.65, 0, 1);
      if (d > 0) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = '#B08850'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([60 + d * (L + 20), 5000]);
        ctx.beginPath(); ctx.moveTo(mx - 50, my + 2); ctx.lineTo(fx + 4, fy + 6); ctx.bezierCurveTo(fx + 20, fy + L * 0.35, fx - 20, fy + L * 0.7, fx + 6, fy + L - 8); ctx.stroke(); ctx.restore(); }
      L3_pijlstaart(ctx, mx, my, 1.1, a1, T, null);
      regel(ctx, '1903 · tong ± 30 cm', fx + 60, fy + 260, a1 * S.on(1, 0.5, 1.1), C.text, 30, 'left', 700); }
    if (a2 > 0.01) { const cx = 1440, cy = 420; regel(ctx, 'langere buis', cx, cy - 130, a2, C.groen, 34, 'center', 700); regel(ctx, 'langere tong', cx, cy + 160, a2, C.oker, 34, 'center', 700);
      ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy + 10, 110, -2.6, -0.5); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy + 10, 110, 0.55, 2.6); ctx.stroke(); ctx.restore();
      const t1 = [cx + Math.cos(-0.5) * 110, cy + 10 + Math.sin(-0.5) * 110], t2 = [cx + Math.cos(2.6) * 110, cy + 10 + Math.sin(2.6) * 110];
      pijl(ctx, t1[0] - 8, t1[1] - 10, t1[0] + 2, t1[1] + 4, C.goud, 5, a2, 22); pijl(ctx, t2[0] + 8, t2[1] + 10, t2[0] - 2, t2[1] - 4, C.goud, 5, a2, 22);
      regel(ctx, 'generatie na generatie', cx, cy + 22, a2, C.text2, 26, 'center', 500);
      termKaart(ctx, 'co-evolutie', 'twee soorten zijn elkaars selectiedruk', 1440, 760, a2 * S.on(2, 0.6, 0.7), C.groen); }
  } });

// ---------- 12 · samenvatting ----------
function L3_mini(ctx, x, y, w, a, f0, f1) { L3_histo(ctx, x, y, w, 90, f0, a, { kl: C.line, rand: true, n: 12 }); L3_histo(ctx, x, y, w, 90, f1, a, { kl: C.teal, n: 12 }); }
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Vormen van selectie', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Gericht</b> schuift het histogram op, <b>stabiliserend</b> maakt het smaller, <b>splitsend</b> geeft twee toppen.', n: 'Daarom werden baby\'s niet steeds zwaarder: het midden had de hoogste fitness.' },
    { t: '<b>Seksuele selectie</b>: het andere geslacht kiest, of de sterkste wint de strijd. Een nadeel bij overleven kan winnen bij voortplanten.', n: 'De pauw verliest misschien iets bij het overleven, maar wint bij het voortplanten.' },
    { t: '<b>Co-evolutie</b>: twee soorten zijn generaties lang elkaars selectiedruk.', n: 'Darwins orchidee en de pijlstaartvlinder.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['drie vormen', C.groen], ['seksuele selectie', C.goud], ['co-evolutie', C.teal]];
    kol.forEach(([kop, col], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) [['gericht', u => L3_g(u, 0.4, 0.14), u => L3_g(u, 0.6, 0.14)], ['stabiliserend', u => L3_g(u, 0.5, 0.17), u => L3_g(u, 0.5, 0.09)], ['splitsend', u => L3_g(u, 0.5, 0.2), u => Math.max(L3_g(u, 0.25, 0.08), L3_g(u, 0.75, 0.08))]].forEach(([nm, f0, f1], k) => {
        const yy = 430 + k * 190, b = a * S.on(0, 0.5, 0.2 + k * 0.2); L3_mini(ctx, x + 40, yy, 230, b, f0, f1); regel(ctx, nm, x + 290, yy - 30, b, C.text, 31, 'left', 700); });
      if (i === 1) { L3_pauw(ctx, x + 270, 640, 0.75, { open: 1, T, a }); regel(ctx, 'het andere geslacht kiest', x + 270, 760, a, C.text, 30, 'center', 500); regel(ctx, 'of strijd', x + 270, 810, a, C.text, 30, 'center', 500); regel(ctx, 'telt: nakomelingen', x + 270, 900, a * S.on(1, 0.5, 0.4), C.goud, 32, 'center', 700); }
      if (i === 2) { L3_orchidee(ctx, x + 180, 380, 0.6, a, 340); L3_pijlstaart(ctx, x + 360, 420, 0.7, a, T, [x + 190, 640]); regel(ctx, 'elkaars selectiedruk', x + 270, 810, a, C.text, 30, 'center', 500); regel(ctx, 'buis en tong', x + 270, 900, a, C.text2, 30, 'center', 500); } });
  } });

// ---------- 13 · volgende keer ----------
function L3_icoonPil(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let k = 0; k < 5; k++) { const bx = x - 90 + (k % 3) * 70, by = y - 20 + Math.floor(k / 3) * 60; ctx.save(); ctx.translate(bx, by); ctx.rotate(hash(k) * 2); roundRect(ctx, -26, -12, 52, 24, 12); shape(ctx, rgba(k === 4 ? C.koraal : C.teal, 0.6), k === 4 ? C.koraal : C.teal, 2); ctx.restore(); }
  ctx.translate(x + 80, y - 70); ctx.rotate(-0.5); roundRect(ctx, -36, -16, 72, 32, 16); ctx.save(); ctx.clip(); ctx.fillStyle = C.goud; ctx.fillRect(-36, -16, 36, 32); ctx.fillStyle = C.bg; ctx.fillRect(0, -16, 36, 32); ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; roundRect(ctx, -36, -16, 72, 32, 16); ctx.stroke(); ctx.restore(); }
function L3_icoonPlasmide(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[-70, 0, C.teal], [70, 0, C.oker]].forEach(([dx, dy, k]) => { roundRect(ctx, x + dx - 60, y + dy - 34, 120, 68, 34); shape(ctx, rgba(k, 0.35), k, 2.5); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x + 10, y); ctx.stroke();
  const u = (T * 0.4) % 1; circ(ctx, x - 70 + u * 140, y, 14, null, C.paars, 4); circ(ctx, x - 70, y, 14, null, C.paars, 4); ctx.restore(); }
function L3_hond(ctx, x, y, s, kl) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = kl; ctx.strokeStyle = kl; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(0, -60, 60, 26, 0, 0, 6.283); ctx.fill(); ctx.lineWidth = 12; [[-40, -36], [-25, -36], [30, -36], [45, -36]].forEach(([lx, ly]) => { ctx.beginPath(); ctx.moveTo(lx, ly - 10); ctx.lineTo(lx, 0); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-56, -70); ctx.quadraticCurveTo(-90, -90, -96, -60); ctx.stroke(); ctx.beginPath(); ctx.ellipse(66, -92, 26, 20, 0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(84, -90); ctx.lineTo(112, -82); ctx.lineTo(86, -76); ctx.fill();
  ctx.beginPath(); ctx.moveTo(56, -108); ctx.lineTo(60, -134); ctx.lineTo(74, -110); ctx.fill(); ctx.restore(); }
function L3_icoonHond(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; L3_hond(ctx, x - 50, y + 60, 0.95, C.licht ? '#7A7068' : '#9A9088'); L3_hond(ctx, x + 110, y + 60, 0.35, C.licht ? '#C08A50' : '#D09A60'); ctx.restore(); pijl(ctx, x + 40, y - 70, x + 100, y - 70, C.goud, 4, a); }
function L3_icoonZaad(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 80, 140, 160, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 3); ctx.fillStyle = C.line; ctx.fillRect(x - 76, y - 96, 152, 20);
  const kl = ['#C9B07A', '#8A6A3A', '#D8C190', '#6E8A4A', '#B5574A']; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.ellipse(x - 48 + (i % 5) * 24, y + 60 - Math.floor(i / 5) * 22, 9, 6, hash(i), 0, 6.283); ctx.fillStyle = kl[i % 5]; ctx.fill(); } ctx.restore(); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 4): <b>de mens als selectiefactor</b>. Antibiotica en resistentie, kunstmatige selectie, inteelt en de genenbank.', n: 'Huiswerk: de film Vormen van selectie (nog eens) kijken. Wie vooruit wil: film 4 De mens als selectiefactor (startvraag: Waarom helpt een antibioticum niet tegen griep, maar maakt het wel resistentie?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'De mens als selectiefactor', [['Antibiotica', 'het middel kiest', L3_icoonPil], ['Resistentie springt over', 'via plasmiden', L3_icoonPlasmide], ['Kunstmatige selectie', 'van wolf tot chihuahua', L3_icoonHond], ['Inteelt en genenbank', 'variatie als verzekering', L3_icoonZaad]]); } });
