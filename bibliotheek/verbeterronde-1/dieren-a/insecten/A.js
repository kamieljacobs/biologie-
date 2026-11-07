// =====================================================================================
// INSECTEN (zijaanzicht, kop naar rechts): honingbij (werkster), gouden loopkever, rode bosmier (werkster), dagpauwoog.
// Recept (C9): drie lichaamsdelen (kop, borststuk, achterlijf); drie paar gelede poten (heup, dij, scheen, voet in leedjes)
// en, bij gevleugelde soorten, twee paar vleugels, allemaal aan het borststuk; geen aanhangsels aan het achterlijf
// (Life 11e fig. 31.26). Lopen = driepootgang: voor- en achterpoot van de ene kant + middenpoot van de andere kant samen
// (L1 R2 L3 ↔ R1 L2 R3; Zollikofer 1994, JEB 192). Dij gaat omhoog naar de 'knie', scheen omlaag naar de grond.
// Maten (1 eenheid = 0,1 mm, dus s = 1 → bij 13 mm = 130 px): bij ± 13 mm, voorvleugel ± 9 mm, voor- en achtervleugel
// gekoppeld (haakjes, Hepburn & Radloff 2004), achterpoot met stuifmeelkorfje op de scheen; mier ± 7 mm, geknikte
// antenne (lange schacht + zweep), steeltje (petiolus) tussen borststuk en achterlijf (idtools PIAkey); loopkever ± 25 mm,
// dekschilden met lengteribbels, draadvormige antennes; dagpauwoog spanwijdte 63–75 mm, bovenkant purperrood met
// oogvlekken, onderkant bijna zwart met fijne streepjes, maar 4 volwaardige poten (voorpoten gereduceerd; DELTA Inachis).
// Aanroep: insect(ctx, soort, x, y, s, o)  soort 'bij' | 'kever' | 'mier' | 'vlinder'; (x, y) = grond onder het midden
// (vlinder en vliegend: midden van het lijf). o.houding: 'lopen' (t = fase 0–1 van de gang), 'staan', 'vliegen' (t:
// vleugelslag), bij ook 'bestuiven' (zweven, korfjes vol stuifmeel), vlinder ook 'rust' (vleugels dicht omhoog, onderkant
// zichtbaar). o.kijk ±1, o.a. Geeft {kop, borst, achterlijf} (schermcoördinaten) terug voor namen.
// Bekende fouten: poten aan het achterlijf; 8 poten; vleugels aan het achterlijf; antenne uit het oog; mier zonder steeltje.
// =====================================================================================
function _insPoot(ctx, H, F, lf, lt, kleur, w, voetDir, nVoet = 4) { // 2-bots-IK, knie boven
  const dx = F[0] - H[0], dy = F[1] - H[1]; let d = Math.hypot(dx, dy); const dm = (lf + lt) * 0.98; let Fx = F[0], Fy = F[1];
  if (d > dm) { Fx = H[0] + dx / d * dm; Fy = H[1] + dy / d * dm; d = dm; }
  const a = Math.atan2(Fy - H[1], Fx - H[0]); const c = Math.max(-1, Math.min(1, (lf * lf + d * d - lt * lt) / (2 * lf * d))); const b = Math.acos(c);
  const k1 = [H[0] + Math.cos(a - b) * lf, H[1] + Math.sin(a - b) * lf], k2 = [H[0] + Math.cos(a + b) * lf, H[1] + Math.sin(a + b) * lf];
  const K = k1[1] < k2[1] ? k1 : k2;
  ctx.lineCap = 'round'; ctx.strokeStyle = kleur;
  ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(K[0], K[1]); ctx.stroke();
  ctx.lineWidth = w * 0.75; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(Fx, Fy); ctx.stroke();
  ctx.lineWidth = w * 0.5; ctx.beginPath(); ctx.moveTo(Fx, Fy); let px = Fx, py = Fy; const sl = lt * 0.12; // voet in leedjes
  for (let i = 0; i < nVoet; i++) { px += voetDir * sl; py += 0.25 * sl * (i === 0 ? -1 : 0.2); ctx.lineTo(px, py); } ctx.stroke();
  for (let i = 0; i <= nVoet; i++) { const q = Fx + voetDir * sl * i; ctx.beginPath(); ctx.arc(q, Fy + (i ? 0 : 0), w * 0.28, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); }
  return K; }
function _insGang(t, i, duty = 0.55) { // fase per poot, i = 0..2 (voor, midden, achter), zijde ±1 → driepootgang
  return ((t + ((i % 2 === 0) ? 0 : 0.5)) % 1 + 1) % 1; }
function _insVoet(rx, p, stride, lift, duty = 0.55) { if (p < duty) return [rx + stride * (0.5 - p / duty), 0];
  const q = (p - duty) / (1 - duty); return [rx - stride / 2 + stride * (0.5 - 0.5 * Math.cos(Math.PI * q)), -Math.sin(Math.PI * q) * lift]; }
function _insPad(ctx, pts) { ctx.beginPath(); bioPad(ctx, pts, true); }

var INSECT_SOORT = {
  // honingbij-werkster: kop 25, borststuk 40, achterlijf 60 (eenheid 0,1 mm)
  bij: { lengte: 130, hoog: 40, kleuren: { kop: '#2E2824', borst: '#7E6440', haar: '#B89A68', band: '#C9953A', donker: '#352B24', poot: '#6A5644', oog: '#1A1614' },
    heup: [[12, -27], [1, -25], [-10, -26]], rust: [30, 3, -30], lf: [16, 18, 22], lt: [17, 19, 26], stride: 26, lift: 9 },
  mier: { lengte: 70, hoog: 18, kleuren: { kop: '#8E4A34', borst: '#9A5236', donker: '#2E2624', poot: '#6A3A2A', oog: '#1A1614' },
    heup: [[9, -13], [1, -13], [-6, -13]], rust: [24, 2, -24], lf: [15, 17, 19], lt: [15, 17, 21], stride: 22, lift: 7 },
  kever: { lengte: 250, hoog: 52, kleuren: { schild: '#6E7E3A', schildL: '#A2A856', schildD: '#3E4A24', kop: '#5E6E34', poot: '#9A5A3A', oog: '#1A1614' },
    heup: [[58, -26], [30, -24], [2, -24]], rust: [104, 40, -52], lf: [34, 38, 46], lt: [36, 42, 52], stride: 44, lift: 12 },
  vlinder: { lengte: 200, hoog: 0, kleuren: { lijf: '#3A2E28', haar: '#6A5646', boven: '#8E3A36', bovenD: '#5A2422', onder: '#2E2724', onderL: '#4E4440', geel: '#D8B65A', blauw: '#6E8EB8', oog: '#1A1614' },
    heup: [[72, 8], [60, 9], [48, 9]], rust: [96, 64, 30], lf: [0, 26, 28], lt: [0, 30, 32], stride: 0, lift: 0 }
};

function insect(ctx, soort, x, y, s = 1, o = {}) {
  const P = INSECT_SOORT[soort] || INSECT_SOORT.bij, K = P.kleuren; const { a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return;
  let houding = o.houding || (soort === 'vlinder' ? 'vliegen' : 'staan');
  const vliegt = houding === 'vliegen' || houding === 'bestuiven';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  const M = (px, py) => [x + px * s * kijk, y + py * s];
  // lijfhoogte: lopend iets deinen; vliegend hangt het lijf om (0,0)
  const dein = houding === 'lopen' ? Math.sin(t * 4 * Math.PI) * 0.8 : 0;
  const lift = vliegt ? (soort === 'vlinder' ? 0 : P.hoog) : 0; ctx.translate(0, lift + dein);
  const poten = (ver) => { // ver = poten aan de verre kant (donkerder, iets naar achter)
    const kl = ver ? lighten(K.poot || K.lijf, -0.35) : (K.poot || K.lijf);
    for (let i = 0; i < 3; i++) { if (soort === 'vlinder' && i === 0) continue; // dagpauwoog: voorpoten gereduceerd
      const H = [P.heup[i][0] + (ver ? -3 : 0), P.heup[i][1] + (ver ? -1 : 0)]; let F;
      if (vliegt) { // poten hangen; bij bestuiven iets gespreid
        F = [H[0] + (i - 1) * -6 - 4, H[1] + P.lf[i] * 0.9 + (houding === 'bestuiven' ? 6 : 0)];
        if (soort === 'vlinder') F = [H[0] - 14, H[1] + 22]; }
      else { const ph = houding === 'lopen' ? _insGang(t + (ver ? 0.5 : 0), i) : null; const rx = P.rust[i] + (ver ? 4 : 0);
        F = ph == null ? [rx, soort === 'vlinder' ? 30 : -(lift + dein)] : (() => { const f = _insVoet(rx, ph, P.stride, P.lift); return [f[0], f[1] - dein]; })(); }
      const w = soort === 'kever' ? 5 : soort === 'vlinder' ? 2.4 : 2.8;
      _insPoot(ctx, H, F, P.lf[i] || 20, P.lt[i] || 20, kl, w, i === 2 ? -1 : 1, soort === 'mier' ? 4 : 5);
      if (soort === 'bij' && i === 2) { // achterpoot: verbrede scheen met stuifmeelkorfje
        const kx = (H[0] + F[0]) / 2 - 2, ky = (H[1] + F[1]) / 2 + 2; const vol = houding === 'bestuiven' ? 1 : (o.stuifmeel || 0);
        ctx.beginPath(); ctx.ellipse(kx, ky, 3.5 + vol * 3, 6 + vol * 3, 0.5, 0, 6.283); ctx.fillStyle = vol > 0.05 ? (ver ? '#B8892E' : '#E0B64A') : kl; ctx.fill(); } } };
  // ---- vleugels ----
  const slag = vliegt ? Math.sin(t * Math.PI * 2 * (soort === 'vlinder' ? 1 : 3)) : 0;
  const bijVleugel = (ver) => { // voor- en achtervleugel gekoppeld; bij lopen plat over het achterlijf
    ctx.save(); ctx.translate(-2, -56); // aanzet bovenop het borststuk (midden-borstsegment)
    const hoek = vliegt ? -0.35 - slag * 0.85 : 0.04; ctx.rotate(hoek);
    const V = [[2, -2], [-30, -10], [-74, -12], [-94, -6], [-90, 2], [-50, 4], [-6, 4]], A = [[-8, 2], [-40, 2], [-64, 6], [-58, 12], [-30, 10], [-8, 6]];
    for (const [pts, al] of [[A, 0.32], [V, 0.38]]) { _insPad(ctx, pts); ctx.fillStyle = `rgba(214,226,236,${ver ? al * 0.7 : al})`; ctx.fill(); ctx.strokeStyle = 'rgba(190,204,218,0.75)'; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.strokeStyle = 'rgba(120,110,96,0.7)'; ctx.lineWidth = 1.1; for (const [ex, ey] of [[-78, -9], [-60, -2], [-40, 2]]) { ctx.beginPath(); ctx.moveTo(-4, 0); ctx.quadraticCurveTo(ex * 0.5, -8, ex, ey); ctx.stroke(); }
    ctx.restore();
    if (vliegt && !ver) { ctx.save(); ctx.globalAlpha *= 0.18; ctx.translate(-2, -56); ctx.rotate(-0.35 + slag * 0.85); _insPad(ctx, V.map(p => [p[0], p[1]])); ctx.fillStyle = '#D6E2EC'; ctx.fill(); ctx.restore(); } }; // vage tweede stand = snelle slag
  const vlinderVleugel = (ver) => { // projectie: hoek > 0 omhoog (onderkant zichtbaar), < 0 omlaag (bovenkant)
    const ang = houding === 'rust' ? 1.45 : houding === 'vliegen' ? 0.95 * slag + 0.25 : 1.2;
    const sn = Math.sin(ang), boven = sn < 0; const span = (u, v, bx, by) => [bx - v - u * 0.18, by - u * sn];
    const F = [[0, 0], [90, -8], [200, -4], [270, 20], [250, 70], [175, 150], [90, 130], [10, 90]]; // (u = spanwijdte naar buiten, v = koorde naar achter)
    const HV = [[0, 10], [100, 20], [180, 50], [190, 120], [150, 180], [80, 200], [25, 150]];
    const teken = (pts, bx, by, isA) => { const S = pts.map(([u, v]) => span(Math.max(0, u * 1.0), v, bx, by)); _insPad(ctx, S);
      const c = boven ? K.boven : K.onder; ctx.fillStyle = ver ? lighten(c, -0.3) : c; ctx.fill(); ctx.strokeStyle = boven ? K.bovenD : K.onderL; ctx.lineWidth = 1.5; ctx.stroke();
      if (ver) return; ctx.save(); _insPad(ctx, S); ctx.clip();
      if (boven) { // oogvlekken: voorvleugel bij de punt, achtervleugel bij de voorhoek
        const [ex, ey] = isA ? span(205, 42, bx, by) : span(160, 70, bx, by); const sy = Math.abs(sn); const r = isA ? 34 : 30;
        ctx.save(); ctx.translate(ex, ey); ctx.scale(1, Math.max(0.15, sy));
        if (isA) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fillStyle = K.geel; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, r * 0.72, 0, 6.283); ctx.fillStyle = '#5E3A5A'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, r * 0.4, 0, 6.283); ctx.fillStyle = K.blauw; ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fillStyle = '#C9B9A0'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, r * 0.82, 0, 6.283); ctx.fillStyle = '#1E1A1C'; ctx.fill(); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-8 + k * 6, -6 + k * 4, 4, 0, 6.283); ctx.fillStyle = K.blauw; ctx.fill(); } }
        ctx.restore(); if (isA) { const [cx, cy] = span(130, 4, bx, by); ctx.fillStyle = '#1E1A1C'; ctx.beginPath(); ctx.ellipse(cx, cy, 16, 12 * Math.abs(sn) + 2, 0, 0, 6.283); ctx.fill(); } }
      else { ctx.strokeStyle = rgba('#141010', 0.6); ctx.lineWidth = 1; for (let k = 0; k < 26; k++) { const u = 20 + (k * 37) % 230, v = (k * 53) % 180; const [px, py] = span(u, v, bx, by); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 5, py + 2); ctx.stroke(); } }
      ctx.restore(); };
    teken(HV, 34, -6, false); teken(F, 56, -8, true); };
  // ---- tekenvolgorde: verre vleugels, verre poten, lijf, nabije poten, nabije vleugels ----
  if (soort === 'bij') bijVleugel(true); if (soort === 'vlinder') vlinderVleugel(true);
  poten(true);
  let A = {};
  if (soort === 'bij') {
    // achterlijf met banden (licht naar beneden gebogen), steeltje, borststuk behaard, kop met groot facetoog, geknikte antenne
    ctx.save(); ctx.translate(-50, -36); ctx.rotate(0.12); const AL = [[28, -14], [8, -21], [-16, -20], [-34, -10], [-40, 2], [-32, 14], [-10, 20], [14, 17], [30, 8]];
    _insPad(ctx, AL); ctx.fillStyle = K.band; ctx.fill(); ctx.save(); _insPad(ctx, AL); ctx.clip(); ctx.fillStyle = K.donker; for (let k = 0; k < 4; k++) ctx.fillRect(16 - k * 14, -26, 6, 52); ctx.fillRect(-46, -26, 10, 52); ctx.restore();
    ctx.strokeStyle = lighten(K.donker, -0.2); ctx.lineWidth = 1.2; _insPad(ctx, AL); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-40, 2); ctx.lineTo(-45, 4); ctx.stroke(); ctx.restore();
    const BO = [[22, -44], [8, -58], [-10, -58], [-22, -46], [-24, -30], [-12, -20], [10, -20], [22, -30]]; _insPad(ctx, BO); ctx.fillStyle = K.borst; ctx.fill();
    ctx.strokeStyle = K.haar; ctx.lineWidth = 1.1; for (let k = 0; k < 22; k++) { const an = -2.9 + k * 0.13, r = 19; const px = Math.cos(an) * r, py = -40 + Math.sin(an) * r; if (py > -24) continue; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px * 1.13, -40 + (py + 40) * 1.13); ctx.stroke(); }
    const KO = [[38, -50], [30, -58], [22, -54], [20, -40], [26, -28], [36, -26], [42, -34]]; _insPad(ctx, KO); ctx.fillStyle = K.kop; ctx.fill();
    ctx.beginPath(); ctx.ellipse(31, -45, 5.5, 10, -0.15, 0, 6.283); ctx.fillStyle = K.oog; ctx.fill(); ctx.beginPath(); ctx.ellipse(29.5, -49, 1.6, 3, -0.15, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill();
    ctx.strokeStyle = K.kop; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(37, -50); ctx.lineTo(42, -66); ctx.lineTo(56, -60); ctx.stroke(); // antenne: schacht omhoog, zweep naar voren
    ctx.strokeStyle = '#4A3A2E'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(38, -28); ctx.quadraticCurveTo(42, -22, 40, -18); ctx.stroke(); // kaken/tong
    A = { kop: M(32, -42 + lift), borst: M(0, -40 + lift), achterlijf: M(-52, -34 + lift) };
  } else if (soort === 'mier') {
    const GA = [[-22, -24], [-34, -27], [-46, -20], [-46, -10], [-36, -7], [-24, -11]]; _insPad(ctx, GA); ctx.fillStyle = K.donker; ctx.fill(); ctx.strokeStyle = lighten(K.donker, 0.15); ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = rgba('#5A4A44', 0.8); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-28 - k * 6, -26 + k); ctx.lineTo(-30 - k * 6, -9); ctx.stroke(); }
    _insPad(ctx, [[-14, -16], [-15, -27], [-19, -27], [-21, -16]]); ctx.fillStyle = K.borst; ctx.fill(); // steeltje (petiolus) met schub
    const ME = [[14, -20], [8, -25], [-2, -24], [-8, -19], [-14, -17], [-14, -13], [0, -12], [12, -13]]; _insPad(ctx, ME); ctx.fillStyle = K.borst; ctx.fill(); ctx.strokeStyle = lighten(K.borst, 0.2); ctx.stroke();
    const KO = [[30, -22], [24, -28], [16, -26], [13, -19], [18, -13], [28, -14]]; _insPad(ctx, KO); ctx.fillStyle = K.kop; ctx.fill();
    ctx.beginPath(); ctx.ellipse(22, -22, 2.4, 3, 0, 0, 6.283); ctx.fillStyle = K.oog; ctx.fill();
    ctx.strokeStyle = K.kop; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(27, -25); ctx.lineTo(24, -38); ctx.lineTo(40, -32); ctx.lineTo(44, -26); ctx.stroke(); // geknikte antenne
    ctx.strokeStyle = '#5A2E22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(29, -16); ctx.lineTo(35, -14); ctx.lineTo(33, -12); ctx.stroke(); // kaak
    A = { kop: M(22, -20), borst: M(2, -19), achterlijf: M(-35, -17) };
  } else if (soort === 'kever') {
    const EL = [[52, -48], [30, -76], [-20, -84], [-80, -74], [-118, -52], [-126, -32], [-112, -24], [-40, -22], [30, -24], [52, -30]]; _insPad(ctx, EL); ctx.fillStyle = K.schild; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.save(); _insPad(ctx, EL); ctx.clip(); ctx.strokeStyle = rgba(K.schildD, 0.8); ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(50, -46 + k * 6); ctx.quadraticCurveTo(-30, -88 + k * 15, -124, -40 + k * 3); ctx.stroke(); }
    ctx.strokeStyle = rgba(K.schildL, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, -62); ctx.quadraticCurveTo(-20, -86, -90, -70); ctx.stroke(); ctx.restore(); // lichtrand op de welving
    const PR = [[88, -54], [76, -64], [56, -62], [46, -48], [48, -30], [70, -26], [88, -34]]; _insPad(ctx, PR); ctx.fillStyle = K.kop; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.stroke();
    const KO = [[118, -46], [104, -56], [88, -52], [86, -34], [104, -30], [118, -36]]; _insPad(ctx, KO); ctx.fillStyle = K.kop; ctx.fill();
    ctx.beginPath(); ctx.ellipse(104, -46, 5, 5, 0, 0, 6.283); ctx.fillStyle = K.oog; ctx.fill();
    ctx.strokeStyle = '#3A2E22'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(116, -36); ctx.quadraticCurveTo(130, -34, 132, -26); ctx.stroke(); // kaak
    ctx.strokeStyle = K.poot; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(112, -50); for (let k = 1; k <= 11; k++) ctx.lineTo(112 + k * 9, -50 - k * 5 + k * k * 0.32); ctx.stroke(); // draadvormige antenne, 11 leedjes
    A = { kop: M(104, -42), borst: M(68, -44), achterlijf: M(-40, -54) };
  } else { // vlinder: dun behaard lijf, opgerolde roltong, knotsvormige antennes
    ctx.beginPath(); ctx.ellipse(-20, 6, 72, 11, 0.04, 0, 6.283); ctx.fillStyle = K.lijf; ctx.fill(); ctx.strokeStyle = rgba(K.haar, 0.8); ctx.lineWidth = 1; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(-70 + k * 12, -3); ctx.lineTo(-71 + k * 12, 15); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(58, 0, 28, 17, 0, 0, 6.283); ctx.fillStyle = K.lijf; ctx.fill(); ctx.strokeStyle = K.haar; ctx.lineWidth = 1.2; for (let k = 0; k < 9; k++) { const an = -2.9 + k * 0.3; ctx.beginPath(); ctx.moveTo(58 + Math.cos(an) * 26, Math.sin(an) * 16); ctx.lineTo(58 + Math.cos(an) * 29, Math.sin(an) * 18.5); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(94, 2, 13, 12, 0, 0, 6.283); ctx.fillStyle = K.lijf; ctx.fill(); ctx.beginPath(); ctx.ellipse(97, -1, 7, 8, 0, 0, 6.283); ctx.fillStyle = '#4E4038'; ctx.fill();
    ctx.strokeStyle = '#2A2220'; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const an = i / 30 * 6.283 * 2, r = 9 - i * 0.22; ctx.lineTo(104 + Math.cos(an) * r, 16 + Math.sin(an) * r); } ctx.stroke(); // roltong
    ctx.strokeStyle = K.lijf; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(98, -10); ctx.quadraticCurveTo(116, -60, 140, -92); ctx.stroke(); ctx.beginPath(); ctx.ellipse(142, -95, 4, 7, 0.6, 0, 6.283); ctx.fillStyle = K.lijf; ctx.fill(); // knots
    A = { kop: M(94, 2), borst: M(58, 0), achterlijf: M(-30, 6) };
  }
  poten(false);
  if (soort === 'bij') bijVleugel(false); if (soort === 'vlinder') vlinderVleugel(false);
  ctx.restore(); return A; }
