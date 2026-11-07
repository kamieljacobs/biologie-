// Bestaat dit echt? — dierenbibliotheek volgens Part C9 (tekenrecept Dieren), 22 okt 2026
// Elk dier: f(ctx, x, y, s, o). Anker (x, y) = midden onder het dier; kop naar rechts (kijk: -1 spiegelt).
// Redelijk realistisch maar vlak getekend: echte verhoudingen, echt oog, 2–3 kenmerken met detail, geen verlopen.

function _bd(ctx, x, y, s, kijk = 1, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s * kijk, s); }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
// echt dierenoog: iris in eigen kleur, pupil in de juiste vorm, één klein lichtpuntje
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
// patroon binnen een vorm (vlekken, rimpels): eerst clippen op P
function binnen(ctx, P, fn) { ctx.save(); zacht(ctx, P); ctx.clip(); fn(); ctx.restore(); }

// ================= 1. BEERDIERTJE (Micro) =================
// Ramazzottius/Hypsibius-achtig: tonvormig lijf ±4:1, 5 segmenten, 4 paar stompe poten met klauwtjes (4e paar achteraan, naar achter), kop met snuit en 2 oogvlekjes.
// o: t (lopen), tun 0..1 (opgerold tot tonnetje), kijk, a
function beerdiertje(ctx, x, y, s = 1, o = {}) { const { t = 0, tun = 0, kijk = 1, a = 1, darm = '#7A8A4A' } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const L = lerp(1, 0.56, tun), Hh = lerp(1, 1.08, tun); ctx.scale(L, Hh);
  const huid = '#D8B88E', rand = '#F0D8B4', donker = '#A88660';
  // poten (ver = donker, eerst)
  const potX = [130, 40, -50], ph = [0, 2.1, 4.2];
  const poot_ = (px, py, ang, len, ver, fase) => { const sw = Math.sin(t * 5 + fase) * 0.22 * (1 - tun); const an = ang + sw; const k = 1 - tun * 0.85;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an); const col = ver ? donker : huid;
    roundRect(ctx, -17, -6, 34, len * k + 6, 15); ctx.fillStyle = col; ctx.fill(); if (!ver) { ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (k > 0.3) { ctx.strokeStyle = ver ? '#5A4630' : '#4A3A28'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = -1; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 6 - 2, len * k - 2); ctx.quadraticCurveTo(i * 8 + 4, len * k + 14, i * 9 + 12, len * k + 10); ctx.stroke(); } }
    ctx.restore(); };
  potX.forEach((px, i) => poot_(px + 18, -62, 0.18, 46, true, ph[i] + 3.1)); poot_(-150, -78, 0.9, 40, true, 1);
  // lijf
  const R = [[-175, -95], [-150, -150], [-95, -178], [-30, -186], [40, -184], [105, -172], [158, -146], [190, -112], [206, -78], [198, -56], [160, -48], [100, -44], [20, -42], [-60, -44], [-130, -50], [-178, -66]];
  vul(ctx, R, huid, rand, 2.5);
  binnen(ctx, R, () => { // darm met voedsel (doorschijnend) en segmentplooien
    ctx.globalAlpha *= 0.55; vul(ctx, [[-120, -100], [-60, -128], [40, -132], [120, -118], [150, -100], [110, -84], [20, -82], [-80, -84]], darm); ctx.globalAlpha /= 0.55;
    ctx.strokeStyle = donker; ctx.lineWidth = 2.5; [-120, -60, 0, 60, 118].forEach((sx, i) => { ctx.beginPath(); ctx.moveTo(sx - 6, -190); ctx.quadraticCurveTo(sx + 14, -120, sx - 4, -40); ctx.stroke(); });
    ctx.fillStyle = 'rgba(255,240,215,0.35)'; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(-160 + hash(i * 3.1) * 340, -175 + hash(i * 5.7) * 120, 3 + hash(i) * 4, 0, 6.283); ctx.fill(); } });
  // snuit (mondkegel) en oogvlekjes
  vul(ctx, [[188, -104], [216, -96], [226, -82], [214, -70], [196, -70]], rand, donker, 1.5);
  circ(ctx, 172, -128, 5.5, '#2A1C14'); circ(ctx, 158, -124, 4, 'rgba(42,28,20,0.55)');
  potX.forEach((px, i) => poot_(px, -56, -0.06, 50, false, ph[i])); poot_(-168, -70, 1.05, 44, false, 0.5);
  if (tun > 0.05) { ctx.globalAlpha *= tun; ctx.strokeStyle = donker; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { const sx = -150 + i * 50; ctx.beginPath(); ctx.moveTo(sx, -175); ctx.quadraticCurveTo(sx + 8 + hash(i) * 10, -110, sx - 4, -50); ctx.stroke(); } }
  ctx.restore(); }

// ================= 2. AXOLOTL (Macro, onder water) =================
// Leucistisch roze (o.kleur 'wild' = donker olijf). Kop ±1/5 van de lengte, staart ±45% met vinzoom vanaf de nek,
// 3 paar uitwendige kieuwen met veertjes, klein lidloos oog, 4 vingers voor / 5 tenen achter.
// o: t, kleur, poot (0..1 groei van de voorpoot: regeneratie), kijk, a
function axolotl(ctx, x, y, s = 1, o = {}) { const { t = 0, kleur = 'roze', poot = 1, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = kleur === 'roze' ? '#EEC3BC' : '#5E6648', buik = kleur === 'roze' ? '#F6D8D2' : '#8A8E6E', rand = kleur === 'roze' ? '#D9A49C' : '#454C36', kieuw = kleur === 'roze' ? '#D96A7A' : '#7A4A52';
  const golf = (u) => Math.sin(t * 2.2 - u * 3) * 6;
  const potenTek = (ver) => { const col = ver ? _dk(huid, 0.18) : huid; // achterpoot en voorpoot, naar onder en opzij
    const vp = (px, py, len, n, sch, rot) => { ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.scale(sch, sch); roundRect(ctx, -9, 0, 18, len * 0.55, 8); ctx.fillStyle = col; ctx.fill(); ctx.translate(0, len * 0.55); ctx.rotate(0.9); roundRect(ctx, -8, -4, 16, len * 0.5, 7); ctx.fill();
      ctx.translate(0, len * 0.5); for (let i = 0; i < n; i++) { const an = -0.9 + i * (1.8 / (n - 1)); ctx.save(); ctx.rotate(an); roundRect(ctx, -3, 0, 6, 15, 3); ctx.fill(); ctx.restore(); } ctx.restore(); };
    if (ver) { vp(-70, -44, 60, 5, 1, 0.6); vp(118, -40, 54, 4, 1, 0.5); } else { vp(-88, -38, 64, 5, 1, 0.35); if (poot > 0.02) vp(100, -34, 58, 4, poot, 0.25); } };
  potenTek(true);
  // staart met vin
  const VIN = [[-60, -86], [-140, -104 + golf(0.3)], [-220, -96 + golf(0.6)], [-290, -70 + golf(0.9)], [-300, -58 + golf(1)], [-280, -40 + golf(0.9)], [-210, -24 + golf(0.6)], [-130, -26 + golf(0.3)], [-60, -38]];
  ctx.globalAlpha *= 0.8; vul(ctx, VIN, _lt(huid, 0.15), rand, 1.5); ctx.globalAlpha /= 0.8;
  vul(ctx, [[110, -98], [40, -102], [-40, -98]], null, rand, 1.5, false); // rugvin-zoom
  const LIJF = [[-280, -62 + golf(1)], [-200, -74 + golf(0.6)], [-120, -82 + golf(0.3)], [-40, -86], [40, -88], [110, -90], [150, -98], [190, -104], [228, -96], [248, -78], [244, -58], [222, -42], [180, -36], [120, -32], [40, -30], [-50, -32], [-130, -42 + golf(0.3)], [-210, -50 + golf(0.6)]];
  vul(ctx, LIJF, huid, rand, 2);
  binnen(ctx, LIJF, () => { vul(ctx, [[-200, -44], [-60, -40], [80, -38], [200, -40], [240, -52], [240, 0], [-220, 0]], buik);
    if (kleur === 'wild') { ctx.fillStyle = 'rgba(30,34,22,0.5)'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-260 + hash(i * 2.3) * 500, -100 + hash(i * 4.1) * 60, 3 + hash(i) * 5, 0, 6.283); ctx.fill(); } }
    ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const sx = -40 + i * 16; ctx.beginPath(); ctx.moveTo(sx, -84); ctx.lineTo(sx + 2, -40); ctx.stroke(); } });
  // mond (licht omhoog lopende mondlijn, geen lach) en oog
  lijn(ctx, [[246, -66], [226, -60], [196, -60]], _dk(huid, 0.35), 2.5);
  dierOog(ctx, 208, -86, 7, kleur === 'roze' ? '#3A1E22' : '#C9A35C', { pupil: kleur === 'roze' ? 'vol' : 'rond', rand: _dk(huid, 0.2) });
  // kieuwen: 3 stelen per kant met veertjes
  [[-0.95, 66], [-1.35, 74], [-1.75, 62]].forEach(([an0, len], i) => { const ax = 150 - i * 6, ay = -92 + i * 10; const an = an0 + Math.sin(t * 1.6 + i) * 0.06 - 0.5;
    const ex = ax + Math.cos(an + Math.PI) * len * -1, ey = ay + Math.sin(an) * len;
    const p = [[ax, ay], [ax - len * 0.45, ay - len * 0.55 + i * 18], [ax - len * 0.95, ay - len * 0.7 + i * 30]];
    lijn(ctx, p, kieuw, 7); const n = 9; for (let k = 1; k <= n; k++) { const u = k / (n + 1); const qx = lerp(lerp(p[0][0], p[1][0], u), lerp(p[1][0], p[2][0], u), u), qy = lerp(lerp(p[0][1], p[1][1], u), lerp(p[1][1], p[2][1], u), u);
      ctx.strokeStyle = _lt(kieuw, 0.15); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(qx - 4, qy - 13 - (1 - u) * 4); ctx.moveTo(qx, qy); ctx.lineTo(qx - 10, qy + 8); ctx.stroke(); } });
  potenTek(false);
  ctx.restore(); }

// ================= 5. OCTOPUS (Octopus vulgaris) =================
// 3/4-aanzicht: mantel achter de kop, oog met liggende rechthoekige pupil en gouden iris, 8 armen met twee rijen zuignappen.
// o.kleur (hex), o.vlek 0..1 (donkere chromatofoorvlekjes), o.papillen 0..1, t
function octopus(ctx, x, y, s = 1, o = {}) { const { t = 0, kleur = '#B0603E', vlek = 0.5, papillen = 0.4, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const licht = _lt(kleur, 0.35), donker = _dk(kleur, 0.3), nap = '#F0D8C8';
  const arm = (i, n, ver) => { const basis = -60 + i * 18, ang = -2.6 + i * 0.7; const len = 230 + hash(i) * 50; const pts = [];
    for (let k = 0; k <= 12; k++) { const u = k / 12; const kr = Math.sin(t * 1.3 + i * 1.7 + u * 3) * 0.5 * u + (i % 2 ? 1 : -1) * u * u * 1.4; const an = ang + kr; pts.push([basis * (1 - u) + Math.cos(an) * len * u, -70 + Math.sin(an) * len * u * 0.55 + u * 90]); }
    ctx.lineCap = 'round'; for (let k = 0; k < 12; k++) { const w = lerp(34, 5, k / 12); ctx.strokeStyle = ver ? donker : kleur; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(pts[k][0], pts[k][1]); ctx.lineTo(pts[k + 1][0], pts[k + 1][1]); ctx.stroke(); }
    if (!ver) for (let k = 2; k < 12; k++) { const r = lerp(7, 2, k / 12); const dx = pts[k + 1][0] - pts[k][0], dy = pts[k + 1][1] - pts[k][1], d = Math.hypot(dx, dy) || 1; const nx = -dy / d, ny = dx / d; const off = lerp(12, 2, k / 12);
      circ(ctx, pts[k][0] + nx * off, pts[k][1] + ny * off, r, nap, _dk(nap, 0.2), 1); circ(ctx, (pts[k][0] + pts[k + 1][0]) / 2 + nx * off * 0.6, (pts[k][1] + pts[k + 1][1]) / 2 + ny * off * 0.6, r * 0.8, nap, _dk(nap, 0.2), 1); } };
  [1, 3, 5, 7].forEach(i => arm(i, 8, true));
  vul(ctx, [[-90, -96], [70, -100], [96, -50], [56, -24], [20, -40], [-16, -18], [-52, -38], [-96, -30]], _dk(kleur, 0.08), licht, 1.5); // huidscherm tussen de armen
  // mantel (zak) schuin naar achter-boven, met kop
  const M = [[-40, -120], [-120, -200], [-150, -290], [-110, -350], [-30, -350], [30, -300], [60, -230], [70, -160], [50, -100], [0, -80], [-40, -90]];
  vul(ctx, M, kleur, licht, 2.5);
  binnen(ctx, M, () => { ctx.fillStyle = rgba('#3A1408', 0.55 * vlek); for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(-160 + hash(i * 2.9) * 240, -360 + hash(i * 1.3) * 280, 3 + hash(i * 5) * 7, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#F4D8C4', 0.5 * papillen); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-150 + hash(i * 7.1) * 220, -350 + hash(i * 3.3) * 260, 2 + hash(i) * 3, 0, 6.283); ctx.fill(); } });
  // oogheuvel en oog
  vul(ctx, [[10, -190], [52, -206], [78, -180], [70, -148], [36, -142], [12, -160]], kleur, licht, 2);
  dierOog(ctx, 46, -174, 17, '#D8B44A', { pupil: 'liggend', rand: _dk(kleur, 0.15) });
  // sifon
  vul(ctx, [[-50, -110], [-86, -118], [-96, -104], [-60, -96]], donker);
  [0, 2, 4, 6].forEach(i => arm(i, 8, false));
  ctx.restore(); }

// ================= 6. VOGELBEKDIER =================
// Zijaanzicht ±45 cm: platte, zachte snavel (leerachtig grijszwart), kop met oog én oor in één groef, gestroomlijnd bruin lijf,
// platte bever-achtige staart, voorvoeten met zwemvlies tot voorbij de nagels, achtervoet met spoor (mannetje).
function vogelbekdier(ctx, x, y, s = 1, o = {}) { const { t = 0, zwem = 0, spoor = 1, kijk = 1, a = 1, ogenDicht = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#6B4A32', buik = '#A88462', snavel = '#3A3A3C', snavelL = '#5A5A5E';
  const voet = (px, py, ver, voor) => { const col = ver ? _dk(vacht, 0.25) : _dk(vacht, 0.1); const sw = Math.sin(t * 4 + (voor ? 0 : 3) + (ver ? 3 : 0)) * (zwem ? 0.35 : 0.12);
    ctx.save(); ctx.translate(px, py); ctx.rotate(sw + (zwem ? (voor ? 0.9 : 1.2) : 0)); roundRect(ctx, -10, 0, 20, 30, 9); ctx.fillStyle = col; ctx.fill();
    if (voor) { vul(ctx, [[-22, 26], [26, 26], [34, 42], [12, 48], [-6, 48], [-28, 42]], ver ? '#2E2A28' : '#45403C'); ctx.strokeStyle = '#D8D0C0'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-18 + i * 10, 38); ctx.lineTo(-20 + i * 10, 46); ctx.stroke(); } }
    else { vul(ctx, [[-30, 24], [18, 22], [24, 34], [-36, 36]], ver ? '#2E2A28' : '#45403C'); if (spoor && !ver) { ctx.fillStyle = '#E8DCC0'; ctx.beginPath(); ctx.moveTo(12, 8); ctx.lineTo(28, 2); ctx.lineTo(14, 16); ctx.closePath(); ctx.fill(); } } ctx.restore(); };
  voet(-90, -44, true, false); voet(80, -40, true, true);
  // staart
  vul(ctx, [[-150, -78], [-215, -82], [-262, -70], [-270, -52], [-246, -38], [-196, -38], [-150, -48]], _dk(vacht, 0.15), _lt(vacht, 0.15), 2);
  const L = [[-160, -76], [-110, -100], [-30, -110], [50, -108], [110, -96], [150, -84], [176, -72], [180, -52], [160, -40], [100, -32], [20, -28], [-60, -30], [-130, -40], [-165, -56]];
  vul(ctx, L, vacht, _lt(vacht, 0.2), 2);
  binnen(ctx, L, () => { vul(ctx, [[-170, -46], [-80, -44], [40, -40], [140, -46], [190, -50], [190, 0], [-180, 0]], buik); ctx.strokeStyle = rgba('#2A1A10', 0.22); ctx.lineWidth = 1.6; for (let i = 0; i < 60; i++) { const px = -160 + hash(i * 1.7) * 330, py = -108 + hash(i * 2.9) * 60; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 8, py + 3); ctx.stroke(); } });
  // snavel: plat, breed, met lichtere rand en neusgaten bovenop
  vul(ctx, [[166, -82], [210, -88], [262, -86], [290, -74], [292, -60], [264, -54], [214, -54], [172, -58]], snavel, snavelL, 2);
  lijn(ctx, [[176, -68], [230, -70], [286, -66]], '#2A2A2C', 1.5); circ(ctx, 262, -80, 2.5, '#1A1A1A'); circ(ctx, 252, -80, 2.5, '#1A1A1A');
  // groef met oog en oor
  vul(ctx, [[140, -86], [162, -90], [170, -80], [150, -76]], _dk(vacht, 0.35)); dierOog(ctx, 156, -84, 4.5, '#1A1210', { dicht: ogenDicht, lid: _dk(vacht, 0.35) });
  voet(-70, -40, false, false); voet(100, -36, false, true);
  ctx.restore(); }

// ================= 7. NAAKTE MOLRAT =================
// ±9 cm, roze gerimpelde huid met enkele haartjes, knaagtanden buiten de lippen, piepkleine oogjes, korte pootjes, dunne staart (±1/3).
function molrat(ctx, x, y, s = 1, o = {}) { const { t = 0, kijk = 1, a = 1, kleur = '#E4B0A0', koningin = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = kleur, plooi = _dk(kleur, 0.22), poot = _dk(kleur, 0.08);
  const pootje = (px, ver, f) => { const sw = Math.sin(t * 8 + f) * 0.3; ctx.save(); ctx.translate(px, -30); ctx.rotate(sw * 0.4); roundRect(ctx, -9, 0, 18, 30, 8); ctx.fillStyle = ver ? plooi : poot; ctx.fill(); vul(ctx, [[-12, 26], [16, 24], [20, 32], [-14, 34]], ver ? plooi : _lt(poot, 0.15)); ctx.restore(); };
  pootje(-70, true, 3); pootje(90, true, 0);
  lijn(ctx, [[-150, -50], [-200, -44], [-240, -36 + Math.sin(t * 3) * 6]], plooi, 6);
  const lengte = 1 + koningin * 0.35; ctx.save(); ctx.scale(lengte, 1);
  const L = [[-150, -60], [-120, -100], [-40, -118], [50, -116], [120, -104], [160, -86], [178, -64], [176, -46], [150, -32], [60, -26], [-40, -26], [-120, -32], [-150, -44]];
  vul(ctx, L, huid, _lt(huid, 0.2), 2);
  binnen(ctx, L, () => { ctx.strokeStyle = plooi; ctx.lineWidth = 2.2; for (let i = 0; i < 16; i++) { const sx = -140 + i * 19; ctx.beginPath(); ctx.moveTo(sx + hash(i) * 6, -120); ctx.quadraticCurveTo(sx + 10, -74, sx - 2 + hash(i * 3) * 8, -24); ctx.stroke(); }
    ctx.strokeStyle = rgba('#F6E0D6', 0.7); ctx.lineWidth = 1; for (let i = 0; i < 14; i++) { const px = -130 + hash(i * 4.3) * 290, py = -110 + hash(i * 6.1) * 70; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 3, py - 12); ctx.stroke(); } });
  ctx.restore();
  // kop: stompe snuit, knaagtanden (2 boven, 2 onder) buiten de lippen, snorharen
  vul(ctx, [[150, -100], [192, -96], [214, -78], [212, -56], [190, -44], [160, -44]], huid, _lt(huid, 0.2), 2);
  ctx.fillStyle = '#E8D8A0'; roundRect(ctx, 204, -70, 10, 24, 3); ctx.fill(); roundRect(ctx, 202, -48, 9, 20, 3); ctx.fill(); ctx.strokeStyle = '#B8A060'; ctx.lineWidth = 1; ctx.stroke();
  circ(ctx, 182, -84, 2.5, '#2A1A16'); ctx.strokeStyle = rgba('#F6E8E0', 0.8); ctx.lineWidth = 1.2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(200, -66 + i * 4); ctx.lineTo(236, -76 + i * 9); ctx.stroke(); }
  pootje(-50, false, 0); pootje(110, false, 3);
  ctx.restore(); }

// ================= 8. ONSTERFELIJKE KWAL (Turritopsis dohrnii) =================
// Kwal ±4,5 mm: doorzichtig klokje met een felrode maag (manubrium) in het midden en tot ±90 tentakels langs de rand.
// o.puls (t), o.terug 0..1: klokje krimpt tot een bolletje (cyste). Poliep: poliep(ctx, …)
function kwalT(ctx, x, y, s = 1, o = {}) { const { t = 0, terug = 0, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a);
  const p = Math.sin(t * 3) * 0.06 * (1 - terug); const sw = lerp(1, 0.45, terug), sh = lerp(1.45, 0.7, terug);
  ctx.save(); ctx.scale(sw * (1 + p), sh * (1 - p));
  const n = 44; for (let i = 0; i < n; i++) { const u = i / (n - 1), bx = lerp(-118, 118, u), len = lerp(160, 40, terug) * (0.75 + hash(i) * 0.4); ctx.strokeStyle = rgba('#E8E2D0', 0.55 * (1 - terug * 0.8)); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(bx, 0);
    for (let k = 1; k <= 8; k++) { const v = k / 8; ctx.lineTo(bx + Math.sin(t * 1.5 + i + v * 4) * 10 * v + (bx * 0.12) * v, len * v); } ctx.stroke(); }
  const KLOK = [[-120, 2], [-118, -60], [-90, -118], [-40, -150], [0, -156], [40, -150], [90, -118], [118, -60], [120, 2], [80, -6], [0, -10], [-80, -6]];
  vul(ctx, KLOK, 'rgba(210,225,235,0.18)', 'rgba(230,240,248,0.75)', 2.5);
  ctx.strokeStyle = 'rgba(230,240,248,0.35)'; ctx.lineWidth = 1.5; [-60, -20, 20, 60].forEach(kx => { ctx.beginPath(); ctx.moveTo(kx * 1.6, -2); ctx.quadraticCurveTo(kx * 1.2, -110, 0, -128); ctx.stroke(); });
  // rode maag (kruisvormig manubrium) met gonaden
  vul(ctx, [[-22, -120], [22, -120], [34, -70], [26, -30], [8, -14], [-8, -14], [-26, -30], [-34, -70]], '#C8322E', '#E8705A', 2);
  vul(ctx, [[-30, -100], [-52, -60], [-34, -40]], 'rgba(220,90,60,0.6)'); vul(ctx, [[30, -100], [52, -60], [34, -40]], 'rgba(220,90,60,0.6)');
  ctx.restore(); ctx.restore(); }
// poliepkolonie: kruipende stolon op de bodem, met staande poliepjes (knotsje met tentakelkrans)
function poliep(ctx, x, y, s = 1, o = {}) { const { t = 0, groei = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a);
  lijn(ctx, [[-220, 0], [-120, -6], [0, 2], [120, -4], [220, 0]], '#B89A78', 7);
  [-170, -80, 20, 120, 200].forEach((px, i) => { const g = clamp(groei * 5 - i, 0, 1); if (g <= 0.01) return; const h = (110 + hash(i) * 50) * g; const sw = Math.sin(t + i) * 6;
    lijn(ctx, [[px, 0], [px + sw * 0.5, -h * 0.5], [px + sw, -h]], '#C9A882', 5); ctx.save(); ctx.translate(px + sw, -h); ctx.beginPath(); ctx.ellipse(0, -16, 12, 20, 0, 0, 6.283); ctx.fillStyle = '#E0806A'; ctx.fill();
      for (let k = 0; k < 12; k++) { const an = -Math.PI + k / 11 * Math.PI; ctx.strokeStyle = 'rgba(240,226,206,0.8)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 10, -24 + Math.sin(an) * 6); ctx.lineTo(Math.cos(an) * 30, -26 + Math.sin(an) * 22); ctx.stroke(); } ctx.restore(); });
  ctx.restore(); }

// ================= 9. BOMBARDEERKEVER (Brachinus) — bovenaanzicht =================
// Oranje kop en halsschild, blauwzwarte geribde dekschilden, lange antennes (11 leden), oranje poten.
// o.spuit 0..1 (straal uit de achterlijfspunt), o.richting (hoek van de straal), t
function bombardeerkever(ctx, x, y, s = 1, o = {}) { const { t = 0, spuit = 0, richting = Math.PI, a = 1, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  const oranje = '#D9772E', oranjeL = '#F0A060', blauw = '#2A3A5E', blauwL = '#4A6A9A';
  // poten (3 paar), schuin naar buiten
  [[-20, -1], [30, -1], [70, -1]].forEach(([py], i) => { [-1, 1].forEach(z => { const sw = Math.sin(t * 9 + i * 2 + (z > 0 ? 3 : 0)) * 0.18; ctx.save(); ctx.translate(z * 30, py); ctx.rotate(z * (0.9 - i * 0.55) + sw); lijn(ctx, [[0, 0], [z * 40, -10], [z * 70, 8 + i * 6]], oranje, 6); ctx.restore(); }); });
  // straal
  if (spuit > 0.01) { ctx.save(); ctx.translate(0, 120); ctx.rotate(richting - Math.PI / 2); const L = 260 * spuit; for (let i = 0; i < 10; i++) { const u = ((t * 6 + i / 10) % 1); const r = lerp(6, 34, u); circ(ctx, Math.sin(i * 2.1) * 10 * u, L * u, r, rgba('#F4EED6', (1 - u) * 0.75)); } ctx.strokeStyle = rgba('#FFF6D8', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L * 0.5); ctx.stroke(); ctx.restore(); }
  // dekschilden
  const E = [[-48, -10], [-56, 40], [-50, 100], [-24, 126], [0, 130], [24, 126], [50, 100], [56, 40], [48, -10], [0, -16]];
  vul(ctx, E, blauw, blauwL, 2.5); ctx.strokeStyle = rgba(blauwL, 0.6); ctx.lineWidth = 2; [-36, -24, -12, 12, 24, 36].forEach(rx => { ctx.beginPath(); ctx.moveTo(rx, -8); ctx.quadraticCurveTo(rx * 1.1, 60, rx * 0.5, 122); ctx.stroke(); }); ctx.strokeStyle = '#1A2238'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, 130); ctx.stroke();
  // halsschild en kop
  vul(ctx, [[-30, -12], [-36, -40], [-24, -62], [24, -62], [36, -40], [30, -12]], oranje, oranjeL, 2);
  vul(ctx, [[-22, -60], [-26, -84], [-12, -102], [12, -102], [26, -84], [22, -60]], oranje, oranjeL, 2);
  [-1, 1].forEach(z => { circ(ctx, z * 20, -86, 6, '#1A1410'); lijn(ctx, [[z * 8, -100], [z * 18, -116], [z * 12, -124]], '#7A3A18', 4); // kaken
    const P = [[z * 16, -96]]; for (let k = 1; k <= 11; k++) P.push([z * (16 + k * 9 + Math.sin(t * 2 + k * 0.3) * 2), -96 - k * 13 + k * k * 0.5]); lijn(ctx, P, oranje, 3.5); P.forEach((p, k) => k && circ(ctx, p[0], p[1], 3, oranjeL)); });
  ctx.restore(); }

// achtergrond: onderwaterwereld in Macro-look (vlak, lagen, geen verloop)
function onderWater(ctx, t = 0, o = {}) { const { bodem = '#3A4A3A', diep = '#14324A', midden = '#1C4560', licht = '#24587A' } = o;
  ctx.fillStyle = diep; ctx.fillRect(0, 0, W, H); ctx.fillStyle = midden; ctx.fillRect(0, 0, W, 360); ctx.fillStyle = licht; ctx.fillRect(0, 0, W, 140);
  ctx.strokeStyle = 'rgba(160,210,230,0.08)'; ctx.lineWidth = 60; for (let i = 0; i < 5; i++) { const x0 = 200 + i * 380 + Math.sin(t * 0.3 + i) * 30; ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0 - 260, 860); ctx.stroke(); }
  ctx.fillStyle = bodem; zacht(ctx, [[0, 760], [300, 730], [700, 750], [1100, 720], [1500, 745], [1920, 725], [1920, 1080], [0, 1080]]); ctx.fill();
  ctx.fillStyle = _lt(bodem, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.ellipse(hash(i * 3) * W, 770 + hash(i * 7) * 100, 10 + hash(i) * 24, 5 + hash(i) * 6, 0, 0, 6.283); ctx.fill(); } }
function bodemLand(ctx, o = {}) { const { lucht = C.bgMacroSky, heuvel = C.bgMacroHill, voor = C.bgMacroFront } = o; ctx.fillStyle = lucht; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = heuvel; zacht(ctx, [[0, 560], [400, 500], [900, 540], [1400, 490], [1920, 530], [1920, 1080], [0, 1080]]); ctx.fill(); ctx.fillStyle = voor; ctx.fillRect(0, 700, W, 380); }
