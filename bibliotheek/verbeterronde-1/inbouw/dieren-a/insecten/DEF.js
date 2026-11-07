// =====================================================================================
// INSECTEN — variant C = winnaar B (bovenaanzicht) + uit A het zijaanzicht, voor de poses die van boven niet te zien zijn.
// - Bovenaanzicht (standaard): driepootgang nu zichtbaar (steunpoten vol met voetstip, zwaaipoten vaag en dunner,
//   grotere pas); bij met duidelijk stuifmeelkorfje op de achterscheen (geel met rand; o.stuifmeel 0–1, standaard 0,8
//   = werkster op stuifmeelvlucht).
// - Dagpauwoog: 'vliegen' en 'zonnen' van boven (open vleugels, oogvlekken); 'rust' = vleugels dicht omhoog, dus van
//   opzij getekend: donkere, fijn gestreepte onderkant en vier zichtbare looppoten (voorpoten gereduceerd; DELTA).
// - o.zij: true geeft voor elke soort het zijaanzicht (o.a. de bij die van opzij loopt, met korfje).
// Recept, bronnen en maten: zie de koppen hieronder (A = zijaanzicht, B = bovenaanzicht).
// =====================================================================================
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

var INSECT_ZIJ = {
  // honingbij-werkster: kop 25, borststuk 40, achterlijf 60 (eenheid 0,1 mm)
  bij: { lengte: 130, hoog: 40, kleuren: { kop: '#2E2824', borst: '#7E6440', haar: '#B89A68', band: '#C9953A', donker: '#352B24', poot: '#6A5644', oog: '#1A1614' },
    heup: [[12, -27], [1, -25], [-10, -26]], rust: [30, 3, -30], lf: [16, 18, 22], lt: [17, 19, 26], stride: 26, lift: 9 },
  mier: { lengte: 70, hoog: 18, kleuren: { kop: '#8E4A34', borst: '#9A5236', donker: '#2E2624', poot: '#6A3A2A', oog: '#1A1614' },
    heup: [[9, -13], [1, -13], [-6, -13]], rust: [24, 2, -24], lf: [15, 17, 19], lt: [15, 17, 21], stride: 22, lift: 7 },
  kever: { lengte: 250, hoog: 52, kleuren: { schild: '#6E7E3A', schildL: '#A2A856', schildD: '#3E4A24', kop: '#5E6E34', poot: '#9A5A3A', oog: '#1A1614' },
    heup: [[58, -26], [30, -24], [2, -24]], rust: [104, 40, -52], lf: [34, 38, 46], lt: [36, 42, 52], stride: 44, lift: 12 },
  vlinder: { lengte: 200, hoog: 0, kleuren: { lijf: '#3A2E28', poot: '#B0A090', haar: '#6A5646', boven: '#8E3A36', bovenD: '#5A2422', onder: '#2E2724', onderL: '#4E4440', geel: '#D8B65A', blauw: '#6E8EB8', oog: '#1A1614' },
    heup: [[72, 8], [62, 10], [50, 10]], rust: [96, 84, 22], lf: [0, 26, 28], lt: [0, 30, 32], stride: 0, lift: 0 }
};

function insectZij(ctx, soort, x, y, s = 1, o = {}) {
  const P = INSECT_ZIJ[soort] || INSECT_ZIJ.bij, K = P.kleuren; const { a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return;
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
        F = ph == null ? [rx, soort === 'vlinder' ? 50 : -(lift + dein)] : (() => { const f = _insVoet(rx, ph, P.stride, P.lift); return [f[0], f[1] - dein]; })(); }
      const w = soort === 'kever' ? 5 : soort === 'vlinder' ? 4 : 2.8;
      _insPoot(ctx, H, F, P.lf[i] || 20, P.lt[i] || 20, kl, w, i === 2 ? -1 : 1, soort === 'mier' ? 4 : 5);
      if (soort === 'bij' && i === 2) { // achterpoot: verbrede scheen met stuifmeelkorfje
        const kx = (H[0] + F[0]) / 2 - 2, ky = (H[1] + F[1]) / 2 + 2; const vol = houding === 'bestuiven' ? 1 : (o.stuifmeel ?? 0.8);
        ctx.beginPath(); ctx.ellipse(kx, ky, 3.5 + vol * 4, 6 + vol * 4, 0.5, 0, 6.283); ctx.fillStyle = vol > 0.05 ? (ver ? '#B8892E' : '#E8B840') : kl; ctx.fill(); if (vol > 0.05 && !ver) { ctx.strokeStyle = '#9A6E22'; ctx.lineWidth = 1.2; ctx.stroke(); } } } };
  // ---- vleugels ----
  const slag = vliegt ? Math.sin(t * Math.PI * 2 * (soort === 'vlinder' ? 1 : 3)) : 0;
  const bijVleugel = (ver) => { // voor- en achtervleugel gekoppeld; bij lopen plat over het achterlijf
    ctx.save(); ctx.translate(6, -56); // aanzet bovenop het borststuk (midden-borstsegment)
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

// =====================================================================================
// INSECTEN (bovenaanzicht, kop naar boven, zoals lhb): honingbij (werkster), gouden loopkever, rode bosmier, dagpauwoog.
// Recept (C9): drie lichaamsdelen na elkaar op één as (kop, borststuk, achterlijf); zes gelede poten, allemaal uit het
// borststuk, gespreid in een brede stand; vleugels (twee paar) aan het borststuk; niets aan het achterlijf (Life 11e
// fig. 31.26; NCSU 'locomotion': brede stand, driepootgang). Lopen = driepootgang L1 R2 L3 ↔ R1 L2 R3 (Zollikofer 1994):
// van boven zie je de twee driehoeken om beurten neerzetten. Maten (1 eenheid = 0,1 mm): bij ± 13 mm (voor- en
// achtervleugel gekoppeld, in rust plat over het achterlijf; Hepburn & Radloff 2004), korfje op de achterscheen; mier
// ± 7 mm met geknikte antenne en steeltje (idtools PIAkey); loopkever ± 25 mm, dekschilden met ribbels, draadvormige
// antennes; dagpauwoog spanwijdte ± 65 mm, bovenkant purperrood met vier oogvlekken, 4 volwaardige poten (DELTA).
// Aanroep: insect(ctx, soort, x, y, s, o)  (x, y) = midden van het lijf; o.houding 'lopen' (t = fase 0–1), 'staan',
// 'vliegen' (t = vleugelslag; van boven wordt de vleugel korter als hij omhoog/omlaag staat), bij ook 'bestuiven',
// vlinder ook 'rust' (zonnen met open vleugels). o.rot (radialen, 0 = kop naar boven), o.a. Geeft {kop, borst, achterlijf}.
// Bekende fouten: poten aan het achterlijf; alle poten tegelijk; antenne uit het oog; kever als rond knoopje.
// =====================================================================================
var INSECT_BOVEN = {
  bij: { kleuren: { kop: '#2E2824', borst: '#7E6440', haar: '#B89A68', band: '#C9953A', donker: '#352B24', poot: '#6A5644', oog: '#1A1614' },
    heup: [[7, -36], [8, -28], [8, -20]], rust: [[-30, -60], [-40, -26], [-34, 16]], lf: [16, 18, 22], lt: [17, 19, 26], stride: 30, kop: -52, borst: -28, al: 16 },
  mier: { kleuren: { kop: '#8E4A34', borst: '#9A5236', donker: '#2E2624', poot: '#7A4430', oog: '#1A1614' },
    heup: [[3, -14], [3, -9], [3, -4]], rust: [[-24, -34], [-30, -8], [-26, 18]], lf: [15, 17, 19], lt: [15, 17, 21], stride: 22, kop: -30, borst: -10, al: 16 },
  kever: { kleuren: { schild: '#6E7E3A', schildL: '#A2A856', schildD: '#3E4A24', kop: '#5E6E34', poot: '#9A5A3A', oog: '#1A1614' },
    heup: [[12, -64], [16, -38], [18, -18]], rust: [[-62, -110], [-76, -34], [-70, 50]], lf: [36, 40, 48], lt: [38, 44, 54], stride: 50, kop: -112, borst: -80, al: 10 },
  vlinder: { kleuren: { lijf: '#3A2E28', haar: '#6A5646', boven: '#8E3A36', bovenD: '#5A2422', geel: '#D8B65A', blauw: '#6E8EB8', oog: '#1A1614' },
    heup: [[0, 0], [5, -8], [5, 2]], rust: [[0, 0], [-26, -24], [-26, 20]], lf: [0, 20, 22], lt: [0, 22, 24], stride: 0, kop: -58, borst: -30, al: 30 }
};
function _insPootB(ctx, H, F, lf, lt, kleur, w, kant) { // 2-bots-IK in het vlak, knie naar buiten (kant ±1)
  const dx = F[0] - H[0], dy = F[1] - H[1]; let d = Math.hypot(dx, dy); const dm = (lf + lt) * 0.98; let Fx = F[0], Fy = F[1];
  if (d > dm) { Fx = H[0] + dx / d * dm; Fy = H[1] + dy / d * dm; d = dm; }
  const a = Math.atan2(Fy - H[1], Fx - H[0]); const b = Math.acos(Math.max(-1, Math.min(1, (lf * lf + d * d - lt * lt) / (2 * lf * d))));
  const k1 = [H[0] + Math.cos(a - b) * lf, H[1] + Math.sin(a - b) * lf], k2 = [H[0] + Math.cos(a + b) * lf, H[1] + Math.sin(a + b) * lf];
  const K = (k1[0] * kant > k2[0] * kant) ? k1 : k2; ctx.lineCap = 'round'; ctx.strokeStyle = kleur;
  ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(K[0], K[1]); ctx.stroke();
  ctx.lineWidth = w * 0.72; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(Fx, Fy); ctx.stroke();
  const ux = (Fx - K[0]) / (lt || 1), uy = (Fy - K[1]) / (lt || 1); ctx.lineWidth = w * 0.45; ctx.beginPath(); ctx.moveTo(Fx, Fy); ctx.lineTo(Fx + ux * lt * 0.35, Fy + uy * lt * 0.35); ctx.stroke(); // voet
  return K; }
function insectBoven(ctx, soort, x, y, s = 1, o = {}) {
  const P = INSECT_BOVEN[soort] || INSECT_BOVEN.bij, K = P.kleuren; const { a = 1, t = 0, rot = 0 } = o; if (a <= 0.01) return;
  const houding = o.houding || (soort === 'vlinder' ? 'vliegen' : 'staan'); const vliegt = houding === 'vliegen' || houding === 'bestuiven';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round';
  const M = (px, py) => [x + (px * Math.cos(rot) - py * Math.sin(rot)) * s, y + (px * Math.sin(rot) + py * Math.cos(rot)) * s];
  const pad = pts => { ctx.beginPath(); bioPad(ctx, pts, true); };
  const ell = (cx, cy, rx, ry, c, r = 0) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, r, 0, 6.283); ctx.fillStyle = c; ctx.fill(); };
  const slag = vliegt ? Math.cos(t * Math.PI * 2) : 1; // van boven: projectie van de vleugel op het vlak
  // ---- poten ----
  for (const kant of [-1, 1]) for (let i = 0; i < 3; i++) { if (soort === 'vlinder' && i === 0) continue;
    const H = [kant * P.heup[i][0], P.heup[i][1]]; let F = [kant * -P.rust[i][0], P.rust[i][1]];
    let zwaai = false; if (houding === 'lopen') { const groep = (i % 2 === 0) === (kant < 0) ? 0 : 0.5; const p = ((t + groep) % 1 + 1) % 1, duty = 0.5; zwaai = p >= duty;
      const dy = !zwaai ? P.stride * (0.5 - p / duty) : P.stride * (-0.5 + (0.5 - 0.5 * Math.cos(Math.PI * (p - duty) / (1 - duty)))); F = [F[0] + (zwaai ? kant * 4 : 0), F[1] + dy]; } // steunvoet schuift naar achter, zwaaivoet naar voren
    if (vliegt) F = [H[0] + kant * 6, H[1] + 14 + i * 4];
    const w = soort === 'kever' ? 5.5 : soort === 'vlinder' ? 2.2 : 2.8; // driepootgang zichtbaar: zwaaipoten (opgetild) vaag en dunner, steunpoten vol met een voetstip
    ctx.save(); if (zwaai) ctx.globalAlpha *= 0.45; _insPootB(ctx, H, F, P.lf[i], P.lt[i], K.poot || K.lijf, zwaai ? w * 0.8 : w, kant); ctx.restore();
    if (houding === 'lopen' && !zwaai) ell(F[0], F[1], w * 0.75, w * 0.75, lighten(K.poot || '#6A5644', 0.25));
    if (soort === 'bij' && i === 2) { const vol = houding === 'bestuiven' ? 1 : (o.stuifmeel ?? 0.8); const kx = (H[0] + F[0]) / 2 + kant * 5, ky = (H[1] + F[1]) / 2 + 3; ell(kx, ky, 3.5 + vol * 4, 6 + vol * 4, vol > 0.05 ? '#E8B840' : K.poot, kant * 0.5); if (vol > 0.05) { ctx.strokeStyle = '#9A6E22'; ctx.lineWidth = 1.2; ctx.stroke(); } } /* stuifmeelkorfje op de achterscheen */ }
  let A;
  if (soort === 'bij') {
    if (!vliegt) for (const kant of [-1, 1]) { pad([[kant * 6, -32], [kant * 18, -18], [kant * 20, 16], [kant * 12, 44], [kant * 4, 40], [kant * 2, -10]]); ctx.fillStyle = 'rgba(214,226,236,0.30)'; ctx.fill(); } // vleugels plat over het achterlijf (onder het lijf getekend, zichtbaar langs de rand)
    pad([[0, -14], [14, -8], [17, 14], [12, 40], [0, 50], [-12, 40], [-17, 14], [-14, -8]]); ctx.fillStyle = K.band; ctx.fill(); ctx.save(); pad([[0, -14], [14, -8], [17, 14], [12, 40], [0, 50], [-12, 40], [-17, 14], [-14, -8]]); ctx.clip(); ctx.fillStyle = K.donker; for (let k = 0; k < 5; k++) ctx.fillRect(-20, -2 + k * 11, 40, 4.5); ctx.restore();
    ell(0, -28, 17, 16, K.borst); ctx.strokeStyle = K.haar; ctx.lineWidth = 1.1; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 15, -28 + Math.sin(an) * 14); ctx.lineTo(Math.cos(an) * 19, -28 + Math.sin(an) * 18); ctx.stroke(); }
    ell(0, -50, 13, 9, K.kop); ell(-9, -50, 4.5, 7.5, K.oog, 0.3); ell(9, -50, 4.5, 7.5, K.oog, -0.3);
    ctx.strokeStyle = K.kop; ctx.lineWidth = 2; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 3, -57); ctx.lineTo(k * 6, -70); ctx.lineTo(k * 16, -80); ctx.stroke(); }
    if (vliegt || o.vleugelsOpen) for (const kant of [-1, 1]) { const sp = Math.max(0.25, Math.abs(slag)); // voor- en achtervleugel gekoppeld, zijwaarts
      ctx.save(); ctx.translate(kant * 8, -32); ctx.scale(kant * sp, 1); pad([[0, 0], [30, -12], [78, -10], [92, 0], [84, 10], [30, 14], [0, 8]]); ctx.fillStyle = 'rgba(214,226,236,0.36)'; ctx.fill(); ctx.strokeStyle = 'rgba(190,204,218,0.8)'; ctx.lineWidth = 1; ctx.stroke();
      pad([[0, 10], [26, 16], [56, 20], [52, 30], [22, 28], [0, 18]]); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(120,110,96,0.6)'; ctx.beginPath(); ctx.moveTo(2, 2); ctx.lineTo(70, -6); ctx.moveTo(2, 4); ctx.lineTo(56, 6); ctx.stroke(); ctx.restore(); }
    if (houding === 'bestuiven') { ctx.fillStyle = '#E0B64A'; for (let k = 0; k < 14; k++) ell(((k * 37) % 26) - 13, -40 + ((k * 23) % 26), 1.3, 1.3, '#E0B64A'); }
  } else if (soort === 'mier') {
    ell(0, 16, 11, 13, K.donker); ctx.strokeStyle = rgba('#5A4A44', 0.8); ctx.lineWidth = 1; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(0, 10 + k * 7, 10 - k * 1.5, 2, 0, 0, Math.PI); ctx.stroke(); }
    ell(0, 1, 3.5, 2.5, K.borst); pad([[0, -20], [6, -16], [5, -8], [3, -3], [-3, -3], [-5, -8], [-6, -16]]); ctx.fillStyle = K.borst; ctx.fill();
    pad([[0, -38], [9, -35], [11, -27], [7, -21], [-7, -21], [-11, -27], [-9, -35]]); ctx.fillStyle = K.kop; ctx.fill(); ell(-8, -29, 2, 3, K.oog); ell(8, -29, 2, 3, K.oog);
    ctx.strokeStyle = '#5A2E22'; ctx.lineWidth = 1.8; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 3, -37); ctx.lineTo(k * 6, -43); ctx.stroke(); }
    ctx.strokeStyle = K.kop; ctx.lineWidth = 1.6; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 5, -34); ctx.lineTo(k * 16, -42); ctx.lineTo(k * 14, -56); ctx.stroke(); } // geknikte antenne
  } else if (soort === 'kever') {
    const vl = vliegt ? 1 : 0;
    if (vl) for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * 10, -52); ctx.scale(kant * Math.max(0.3, Math.abs(slag)), 1); pad([[0, 0], [60, -10], [150, 10], [140, 40], [60, 40], [0, 20]]); ctx.fillStyle = 'rgba(214,220,226,0.4)'; ctx.fill(); ctx.strokeStyle = 'rgba(160,160,150,0.8)'; ctx.stroke(); ctx.restore(); }
    for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * vl * 26, -vl * 8); ctx.rotate(kant * vl * 0.55); const E = [[0, -58], [kant * 34, -56], [kant * 46, -10], [kant * 44, 50], [kant * 26, 92], [0, 104]]; pad(E); ctx.fillStyle = K.schild; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.save(); pad(E); ctx.clip(); ctx.strokeStyle = rgba(K.schildD, 0.85); ctx.lineWidth = 1.6; for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(kant * k * 8.5, -56); ctx.quadraticCurveTo(kant * k * 10.5, 20, kant * k * 5, 100); ctx.stroke(); }
      ctx.strokeStyle = rgba(K.schildL, 0.55); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kant * 30, -40); ctx.quadraticCurveTo(kant * 38, 20, kant * 26, 70); ctx.stroke(); ctx.restore(); ctx.restore(); }
    pad([[0, -60], [24, -64], [30, -80], [22, -96], [0, -98], [-22, -96], [-30, -80], [-24, -64]]); ctx.fillStyle = K.kop; ctx.fill(); ctx.strokeStyle = K.schildD; ctx.lineWidth = 1.4; ctx.stroke(); // halsschild
    pad([[0, -98], [14, -100], [16, -116], [8, -124], [-8, -124], [-16, -116], [-14, -100]]); ctx.fillStyle = K.kop; ctx.fill(); ell(-14, -112, 4, 5, K.oog); ell(14, -112, 4, 5, K.oog);
    ctx.strokeStyle = '#3A2E22'; ctx.lineWidth = 3.4; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 6, -123); ctx.quadraticCurveTo(k * 10, -136, k * 3, -140); ctx.stroke(); }
    ctx.strokeStyle = K.poot; ctx.lineWidth = 2.4; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 12, -120); for (let j = 1; j <= 11; j++) ctx.lineTo(k * (12 + j * 5.5), -120 - j * 8 + j * j * 0.2); ctx.stroke(); }
  } else { // vlinder: vleugels open; van boven korter naarmate de slag omhoog/omlaag staat
    const sp = houding === 'rust' ? 1 : Math.max(0.12, Math.abs(slag));
    for (const kant of [-1, 1]) { ctx.save(); ctx.translate(kant * 6, -30); ctx.scale(kant * sp, 1);
      const HV = [[0, 6], [70, 10], [150, 40], [176, 96], [150, 150], [80, 172], [20, 120]], VV = [[0, -2], [80, -40], [180, -76], [260, -80], [276, -50], [240, 10], [170, 60], [70, 52], [8, 20]];
      for (const [pts, oogXY, isV] of [[HV, [140, 70], false], [VV, [210, -40], true]]) { pad(pts); ctx.fillStyle = K.boven; ctx.fill(); ctx.strokeStyle = K.bovenD; ctx.lineWidth = 1.6; ctx.stroke();
        ctx.save(); pad(pts); ctx.clip(); ctx.fillStyle = rgba('#3A2A28', 0.55); ctx.beginPath(); ctx.moveTo(0, 0); for (const p of pts) ctx.lineTo(p[0] * 0.25, p[1] * 0.25); ctx.fill(); // donkere vleugelvoet
        ctx.strokeStyle = rgba('#2A1E1C', 0.8); ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); // donkere zoom
        const [ex, ey] = oogXY; if (isV) { ell(ex, ey, 30, 26, K.geel); ell(ex, ey, 22, 19, '#5E3A5A'); ell(ex - 4, ey - 2, 10, 8, K.blauw); ell(130, -50, 22, 10, '#1E1A1C', -0.35); ell(165, -62, 12, 8, '#E6D8B8', -0.35); }
        else { ell(ex, ey, 30, 32, '#C9B9A0'); ell(ex, ey, 25, 27, '#1E1A1C'); for (let k = 0; k < 4; k++) ell(ex - 8 + k * 5, ey - 8 + k * 5, 4, 4, K.blauw); }
        ctx.restore(); }
      ctx.restore(); }
    ell(0, 30, 9, 50, K.lijf); ell(0, -30, 13, 22, K.lijf); ctx.strokeStyle = K.haar; ctx.lineWidth = 1; for (let k = 0; k < 10; k++) { const an = k / 10 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 12, -30 + Math.sin(an) * 20); ctx.lineTo(Math.cos(an) * 15, -30 + Math.sin(an) * 23); ctx.stroke(); }
    ell(0, -58, 10, 9, K.lijf); ell(-7, -59, 4.5, 5.5, '#4E4038'); ell(7, -59, 4.5, 5.5, '#4E4038');
    ctx.strokeStyle = K.lijf; ctx.lineWidth = 2; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 4, -66); ctx.quadraticCurveTo(k * 16, -110, k * 34, -142); ctx.stroke(); ell(k * 35, -145, 4, 7, K.lijf, k * 0.5); }
  }
  A = { kop: M(0, P.kop), borst: M(0, P.borst), achterlijf: M(0, P.al) };
  ctx.restore(); return A; }

function insect(ctx, soort, x, y, s = 1, o = {}) {
  if (o.zij || (soort === 'vlinder' && o.houding === 'rust')) return insectZij(ctx, soort, x, y, s, o);
  return insectBoven(ctx, soort, x, y, s, soort === 'vlinder' && o.houding === 'zonnen' ? Object.assign({}, o, { houding: 'rust' }) : o); }
