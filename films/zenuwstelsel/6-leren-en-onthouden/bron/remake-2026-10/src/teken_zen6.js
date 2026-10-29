// Zenuwstelsel 6 · Leren en onthouden — eigen tekeningen (lichte remake, 29 okt 2026).
// Nieuw t.o.v. de beeldbank (kandidaten voor lib_bio.js / het castboek, nog niet gekeurd):
//   fietsMaat/fiets (fiets in zijaanzicht, maat afgeleid van de berijder uit het castboek) + pose 'fiets' in de filmkopie van lib_cast.js
//   straat (Macro-nacht: huizenrij met verlichte ramen, fietspad, stoep, gras; schuift mee als de camera de fietsers volgt)
//   hersenZij (hersenen van opzij met voorhoofdskwab, motorische schors, slaapkwab, kleine hersenen, hersenstam; hippocampus en basale kernen diep, gestippeld)
//   netwerk (zenuwcellen met verbindingen, patroon, activiteit), synapsVoetje (synaps op een dendrietvoetje met AMPA- en NMDA-receptoren, magnesium, calcium)
//   bel, etensbak, frietbakje, spiegelOpstelling, ster
// Kleuren (tabel Regeling 29 okt 2026): zenuwsignaal teal #5BA4C9, neurotransmitter licht teal #9CCBE3, focus goud; calcium lichtgrijs (zoals synapsEcht).
const Z6 = { nt: '#9CCBE3', sig: C.teal, ca: '#D8DDE6', ampa: '#7FA6A0', nmda: '#C9B896', mg: '#9AA3B2', cyt: '#2A3550', post: '#2E3A4E', mem: C.er,
  brein: '#B8A0AC', breinS: '#8E7484', breinD: '#6E5666', pad: '#7A4A3C', stoep: '#5A6478', gras: '#3A5540' };
function bgS(ctx) { bg(ctx, 'schema'); }
function bgM(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // Micro zonder korrel buiten de cel (BEELDAFSPRAKEN)
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const PULS = (t, f = 1) => 0.5 + 0.5 * Math.sin(t * 6.283 * f);

// ---------- fiets (zijaanzicht, rijdt naar rechts) ----------
// Recept: maten volgen de berijder (castboek-verhoudingen), zodat de benen precies reiken: zadelhoogte = 0,94 × beenlengte + trapperhoogte;
// wiel ± 0,19 × lengte (26-inch bij 1,65 m), kinderfiets ± 0,17 × lengte (16-inch bij 1,15 m); wielbasis ± 0,7 × lengte; trapas net onder de wielas;
// cranks ± 0,075 × lengte, trappers 180° uit elkaar; zadel achter de trapas, stuur hoger dan het zadel (stadsfiets). Bekende fouten: benen die niet
// bij de trappers komen; trappers die niet tegengesteld draaien; wielen die niet draaien terwijl de fiets rijdt.
function fietsMaat(id, h) { const P = CAST[id] || {}; const hl = h * (P.lengte || 1), hh = hl / (P.kop || 6.1), Lb = hl - 3.67 * hh, kind = (P.leeftijd || 16) < 10;
  const c = 0.075 * hl, bb = c + 0.05 * hl, S = 0.94 * Lb + 0.05 * hl + 0.21 * hh, R = (kind ? 0.17 : 0.19) * hl;
  return { hl, hh, c, bb, S, R, achter: -(kind ? 0.3 : 0.34) * hl, voor: (kind ? 0.34 : 0.38) * hl, zadelX: -0.07 * hl, stuurX: (kind ? 0.27 : 0.31) * hl, stuurY: S + (kind ? 0.1 : 0.09) * hl }; }
// x = trapas, y = grond; o.hoek = crankhoek (rad), o.rol = wielhoek, o.kleur, o.zijwiel (0..1 nog vast), o.zijwielUit {dx, dy, rot} = zijwieltjes eraf
function fiets(ctx, id, x, y, h, o = {}) { const M = fietsMaat(id, h); const { a = 1, hoek = 0, rol = 0, kleur = '#3E6E8E', zijwiel = 0, zijwielUit = null, kantel = 0 } = o;
  const by = y - M.bb, ry = y - M.R, ax = x + M.achter, vx = x + M.voor, zx = x + M.zadelX, zy = y - M.S, sx = x + M.stuurX, sy = y - M.stuurY;
  const pedal = (an) => [x + Math.sin(an) * M.c, by - Math.cos(an) * M.c, an];
  const res = { zadel: [zx, zy], stuur: [sx, sy], p1: pedal(hoek), p2: pedal(hoek + Math.PI), bb: [x, by], achter: [ax, ry], voor: [vx, ry], M };
  if (a <= 0.01) return res;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(kantel); ctx.translate(-x, -y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const wiel = (cx) => { ctx.strokeStyle = '#1C2230'; ctx.lineWidth = M.R * 0.16; ctx.beginPath(); ctx.arc(cx, ry, M.R * 0.92, 0, 6.283); ctx.stroke();
    ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, ry, M.R * 0.8, 0, 6.283); ctx.stroke();
    ctx.strokeStyle = rgba('#AFC0D0', 0.55); ctx.lineWidth = 1.2; for (let k = 0; k < 12; k++) { const an = rol + k * 0.5236; ctx.beginPath(); ctx.moveTo(cx, ry); ctx.lineTo(cx + Math.cos(an) * M.R * 0.8, ry + Math.sin(an) * M.R * 0.8); ctx.stroke(); }
    circ(ctx, cx, ry, M.R * 0.07, '#AFC0D0'); };
  wiel(ax); wiel(vx);
  // zijwieltjes: kleine wielen aan beugels bij de achteras
  const zr = M.R * 0.32; if (zijwiel > 0.01 || zijwielUit) { const U = zijwielUit || { dx: 0, dy: 0, rot: 0 }; ctx.save(); ctx.globalAlpha *= zijwielUit ? 1 : zijwiel; ctx.translate(U.dx, U.dy);
    ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ax, ry); ctx.lineTo(ax - M.R * 0.35, y - zr); ctx.stroke();
    ctx.save(); ctx.translate(ax - M.R * 0.35, y - zr); ctx.rotate(U.rot); ctx.strokeStyle = '#1C2230'; ctx.lineWidth = zr * 0.35; ctx.beginPath(); ctx.arc(0, 0, zr * 0.82, 0, 6.283); ctx.stroke(); circ(ctx, 0, 0, zr * 0.5, '#E0E4EA'); ctx.restore(); ctx.restore(); }
  // frame: achtervork, zitbuis, onderbuis, bovenbuis, balhoofd, voorvork
  const ft = Math.max(4, M.hl * 0.018); ctx.strokeStyle = kleur; ctx.lineWidth = ft;
  const zb = [x + M.zadelX * 0.85, y - M.S * 0.86], bh = [x + M.stuurX * 0.86, y - M.stuurY * 0.78], bh2 = [x + M.stuurX * 0.9, y - M.stuurY * 0.9];
  ctx.beginPath(); ctx.moveTo(ax, ry); ctx.lineTo(x, by); ctx.lineTo(zb[0], zb[1]); ctx.lineTo(ax, ry); ctx.moveTo(x, by); ctx.lineTo(bh[0], bh[1]); ctx.lineTo(zb[0], zb[1] + ft); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bh2[0], bh2[1]); ctx.lineTo(bh[0], bh[1]); ctx.quadraticCurveTo(vx - M.R * 0.05, (bh[1] + ry) / 2, vx, ry); ctx.stroke();
  // zadelpen + zadel, stuurpen + stuur
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = ft * 0.7; ctx.beginPath(); ctx.moveTo(zb[0], zb[1]); ctx.lineTo(zx, zy + 4); ctx.moveTo(bh2[0], bh2[1]); ctx.lineTo(sx - M.hl * 0.02, sy + 4); ctx.stroke();
  ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.ellipse(zx - M.hl * 0.005, zy, M.hl * 0.05, M.hl * 0.014, -0.05, 0, 6.283); ctx.fill();
  ctx.strokeStyle = '#2A2F3E'; ctx.lineWidth = ft * 0.9; ctx.beginPath(); ctx.moveTo(sx - M.hl * 0.03, sy + 2); ctx.quadraticCurveTo(sx - M.hl * 0.005, sy - M.hl * 0.012, sx + M.hl * 0.015, sy + M.hl * 0.01); ctx.stroke();
  // spatbord achter (stadsfiets)
  if (M.hl > 260) { ctx.strokeStyle = _donker(kleur, 0.15); ctx.lineWidth = ft * 0.6; ctx.beginPath(); ctx.arc(ax, ry, M.R * 1.04, -2.6, -0.5); ctx.stroke(); }
  // kettingblad + cranks + trappers
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, by, M.c * 0.55, 0, 6.283); ctx.stroke();
  ctx.strokeStyle = rgba('#AFC0D0', 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, by - M.c * 0.55); ctx.lineTo(ax, ry - M.R * 0.12); ctx.moveTo(x, by + M.c * 0.55); ctx.lineTo(ax, ry + M.R * 0.12); ctx.stroke();
  for (const p of [res.p2, res.p1]) { ctx.strokeStyle = '#5A6478'; ctx.lineWidth = ft * 0.8; ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(p[0], p[1]); ctx.stroke(); roundRect(ctx, p[0] - M.hl * 0.022, p[1] - 3, M.hl * 0.044, 6, 3); ctx.fillStyle = '#1C2230'; ctx.fill(); }
  ctx.restore(); return res;
}
// berijder + fiets; t = tijd, cad = omwentelingen per seconde; geeft de punten van fiets en persoon terug
function fietser(ctx, id, x, y, h, o = {}) { const { t = 0, cad = 1, a = 1, outfit, kleur, zijwiel, zijwielUit, kantel = 0, uit, leun = 10, hoekVast } = o; if (a <= 0.01) return {};
  const hoek = hoekVast != null ? hoekVast : t * cad * 6.283, M = fietsMaat(id, h), rol = (t * cad * 6.283) * (M.c * 2.4) / M.R;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(kantel); ctx.translate(-x, -y);
  const F = fiets(ctx, id, x, y, h, { hoek, rol, kleur, zijwiel, zijwielUit });
  const Pp = persoon(ctx, id, F.zadel[0], y, h, { zij: true, kijk: 1, pose: 'fiets', fiets: F, leun, outfit, uit, t });
  ctx.restore(); return { F, P: Pp };
}

// ---------- straat (Macro-nacht) ----------
// Huizenrij (rijtjeshuizen, ± 9 m hoog) achter een stoep, fietspad (rood asfalt), gras op de voorgrond. o.x = cameraverschuiving (px), o.raam = index van het open raam.
const HUIZEN = [[0, '#5B4A44', 3], [330, '#4E5A66', 2], [610, '#6A5546', 3], [930, '#4A4E5E', 2], [1210, '#5E5048', 3], [1530, '#525E58', 2], [1810, '#5A4B52', 3], [2130, '#4C5866', 2], [2410, '#62514A', 3], [2730, '#4E4C5C', 2], [3010, '#5C5048', 3], [3330, '#4A5A60', 2]];
function straat(ctx, o = {}) { const { x = 0, grond = 800, raam = -1, raamOpen = 0, m = 200 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  // verre bomen (parallax 0,3)
  const vx = x * 0.3; ctx.fillStyle = '#26384E'; for (let i = -2; i < 14; i++) { const bx = ((i * 260 - vx) % 3640 + 3640) % 3640 - 300, r = 70 + hash(i) * 40; ctx.beginPath(); ctx.arc(bx, grond - 330 - hash(i + 3) * 30, r, 0, 6.283); ctx.fill(); }
  // huizen (parallax 0,7)
  const hx = x * 0.7, top0 = grond - 120;
  HUIZEN.forEach(([x0, kl, ram], i) => { let bx = ((x0 - hx) % 3640 + 3640) % 3640 - 400; const bw = 270 + (i % 3) * 20, bh = 300 + (i % 2) * 40, by = top0 - bh;
    ctx.fillStyle = kl; ctx.fillRect(bx, by, bw, bh); ctx.beginPath(); ctx.moveTo(bx - 14, by); ctx.lineTo(bx + bw / 2, by - 110); ctx.lineTo(bx + bw + 14, by); ctx.closePath(); ctx.fillStyle = _donker(kl, 0.25); ctx.fill();
    ctx.fillStyle = _donker(kl, 0.3); ctx.fillRect(bx + bw * 0.12, top0 - 120, 54, 120); // deur
    for (let k = 0; k < ram; k++) { const wx = bx + bw * (0.5 + k * 0.17) - 10, wy = by + 40, lit = (i * 7 + k) % 3 !== 0; const isR = i === raam && k === 0;
      roundRect(ctx, wx, wy, 62, 82, 4); ctx.fillStyle = lit || isR ? rgba('#E8C878', isR ? 0.85 : 0.55) : '#2A3448'; ctx.fill(); ctx.strokeStyle = _licht(kl, 0.2); ctx.lineWidth = 3; ctx.stroke();
      if (isR && raamOpen > 0.01) { ctx.save(); ctx.globalAlpha *= raamOpen; ctx.fillStyle = _donker(kl, 0.1); ctx.beginPath(); ctx.moveTo(wx + 62, wy); ctx.lineTo(wx + 62 + 30 * raamOpen, wy - 8); ctx.lineTo(wx + 62 + 30 * raamOpen, wy + 90); ctx.lineTo(wx + 62, wy + 82); ctx.closePath(); ctx.fill(); ctx.restore(); }
      wx2 = wx; }
    if (i === raam) { const wx = bx + bw * 0.5 - 10, wy = by + 40; RAAMPOS = [wx + 31, wy + 41]; }
    for (let k = 0; k < ram; k++) { const wx = bx + bw * (0.5 + k * 0.17) - 10; roundRect(ctx, wx, by + 170, 62, 82, 4); ctx.fillStyle = (i + k) % 2 ? rgba('#E8C878', 0.45) : '#2A3448'; ctx.fill(); ctx.strokeStyle = _licht(kl, 0.2); ctx.lineWidth = 3; ctx.stroke(); } });
  // stoep, berm, fietspad, gras
  ctx.fillStyle = Z6.stoep; ctx.fillRect(0, top0, W, grond - 70 - top0); ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, grond - 70, W, 30);
  ctx.fillStyle = Z6.pad; ctx.fillRect(0, grond - 40, W, 70); ctx.fillStyle = Z6.gras; ctx.fillRect(0, grond + 30, W, H - grond - 30);
  // stoeptegels en strepen op het fietspad schuiven 1:1 mee
  ctx.strokeStyle = rgba('#8FA0B5', 0.25); ctx.lineWidth = 2; for (let k = -1; k < 24; k++) { const sx = ((k * 90 - x) % 2160 + 2160) % 2160 - 120; ctx.beginPath(); ctx.moveTo(sx, top0 + 4); ctx.lineTo(sx - 20, grond - 72); ctx.stroke(); }
  ctx.strokeStyle = rgba('#F2F2EE', 0.55); ctx.lineWidth = 4; for (let k = -1; k < 16; k++) { const sx = ((k * 160 - x) % 2560 + 2560) % 2560 - 160; ctx.beginPath(); ctx.moveTo(sx, grond - 5); ctx.lineTo(sx + 70, grond - 5); ctx.stroke(); }
}
let RAAMPOS = null, wx2 = 0;
function noot(ctx, x, y, s = 1, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = kl; ctx.strokeStyle = kl; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.ellipse(0, 0, 13, 9, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(11, -3); ctx.lineTo(11, -48); ctx.quadraticCurveTo(24, -40, 26, -28); ctx.stroke(); ctx.restore(); }
function spraakwolk(ctx, x, y, w, h, a = 1, staart = -1, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.fillStyle = rgba('#F2F2EE', 0.95); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + staart * w * 0.15 - 10, y + h / 2 - 2); ctx.lineTo(x + staart * w * 0.3, y + h / 2 + 22); ctx.lineTo(x + staart * w * 0.15 + 12, y + h / 2 - 2); ctx.fill();
  if (inhoud) inhoud(); else for (let k = 0; k < 3; k++) circ(ctx, x - 22 + k * 22, y, 6, '#5A6478'); ctx.restore(); }

// ---------- hersenen van opzij (voorkant rechts) ----------
// Recept: grote hersenen ± 17 × 13 cm; voorhoofdskwab vóór de centrale groeve (± 1/3), motorische schors = strook direct vóór de centrale groeve,
// slaapkwab onder de laterale groeve (fissuur van Sylvius); kleine hersenen achter-onder onder de achterhoofdskwab (± 1/8 van het volume), met
// evenwijdige plooien; hersenstam schuin naar achteren-onder. Hippocampus: ± 4–5 cm, gebogen (zeepaardje), mediaal in de slaapkwab;
// basale kernen (striatum, ± 4–5 cm) diep in het midden boven de slaapkwab. Beide liggen binnenin en zijn daarom gestippeld getekend.
// Bron: Gray's Anatomy (lateraal aanzicht, coronale doorsnede); Kenhub 'Hippocampus', 'Basal ganglia'. Bekende fouten: hippocampus aan de buitenkant;
// kleine hersenen los onder de grote hersenen; voorhoofdskwab achterin.
const HZ = {
  groot: [[300, 10], [290, -90], [240, -170], [150, -225], [40, -240], [-80, -228], [-190, -185], [-270, -110], [-300, -20], [-290, 60], [-240, 110], [-150, 118], [-70, 100], [-20, 120], [40, 165], [130, 175], [205, 150], [250, 110], [285, 60]],
  slaap: [[-20, 120], [40, 165], [130, 175], [205, 150], [250, 110], [255, 80], [200, 60], [120, 52], [40, 50], [-20, 60], [-55, 90]],
  voor: [[300, 10], [290, -90], [240, -170], [150, -225], [60, -238], [70, -170], [90, -90], [110, -10], [130, 40], [200, 58], [255, 78], [285, 60]],
  motor: [[60, -238], [10, -238], [20, -170], [40, -90], [60, -10], [78, 42], [130, 40], [110, -10], [90, -90], [70, -170]],
  klein: [[-150, 118], [-240, 112], [-285, 140], [-270, 200], [-200, 228], [-110, 210], [-80, 165], [-95, 128]],
  stam: [[-70, 100], [-40, 120], [-30, 180], [-48, 260], [-90, 262], [-82, 190], [-95, 140]],
  hippo: [[10, 120], [60, 108], [120, 104], [175, 112], [200, 128]], // as van de hippocampus (mediaal in de slaapkwab)
  basaal: [[170, -30], [130, -75], [60, -95], [-10, -80], [-40, -40], [-20, 0]] // staartkern (C-vorm); putamen als ovaal eronder
};
function hersenZij(ctx, x, y, s = 1, o = {}) { const { a = 1, hl = {}, kl = {}, weg = 0, t = 0, dimRest = 0 } = o; const P = (p) => [x + p[0] * s, y + p[1] * s];
  const anker = { voor: P([200, -110]), motor: P([60, -130]), slaap: P([110, 125]), klein: P([-195, 175]), hippo: P([110, 108]), basaal: P([70, -40]), stam: P([-60, 230]), schors: P([-120, -160]) };
  if (a <= 0.01) return anker; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const vul = (pts, fill, stroke, lw = 2) => { ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, fill, stroke, lw); };
  const glans = (pts, v, k) => { if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = rgba(k, 0.55); ctx.fill(); ctx.strokeStyle = k; ctx.lineWidth = 4 / s; ctx.stroke(); ctx.restore(); } };
  const dimA = 1 - 0.55 * dimRest;
  // hersenstam en kleine hersenen achter de grote hersenen
  ctx.save(); ctx.globalAlpha *= dimA; vul(HZ.stam, Z6.breinS, Z6.breinD); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimA; vul(HZ.klein, Z6.brein, Z6.breinS); ctx.save(); ctx.beginPath(); bioPad(ctx, HZ.klein, true); ctx.clip(); ctx.strokeStyle = rgba(Z6.breinD, 0.7); ctx.lineWidth = 2.5;
  for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(-290, 128 + k * 15); ctx.quadraticCurveTo(-185, 150 + k * 13, -80, 128 + k * 14); ctx.stroke(); } ctx.restore(); ctx.restore();
  glans(HZ.klein, hl.klein || 0, kl.klein || C.goud);
  // grote hersenen met windingen
  ctx.save(); ctx.globalAlpha *= dimA; vul(HZ.groot, Z6.brein, Z6.breinS, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, HZ.groot, true); ctx.clip(); ctx.strokeStyle = rgba(Z6.breinD, 0.55); ctx.lineWidth = 3;
  const GR = [[[250, -120], [215, -95], [235, -55]], [[180, -200], [175, -150], [210, -130]], [[150, -40], [190, -20], [230, 10]], [[-60, -225], [-40, -170], [-80, -140]], [[-150, -190], [-120, -150], [-160, -110]],
    [[-240, -120], [-200, -90], [-230, -50]], [[-260, 20], [-210, 0], [-190, 50]], [[-130, -60], [-90, -30], [-120, 10]], [[-40, -120], [0, -100], [-20, -50]], [[100, 90], [150, 95], [200, 85]], [[60, 140], [120, 140], [170, 130]], [[-200, 70], [-150, 60], [-100, 80]]];
  GR.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
  // centrale groeve en laterale groeve iets dieper
  ctx.strokeStyle = rgba(Z6.breinD, 0.9); ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, [[12, -238], [24, -170], [42, -90], [62, -10], [80, 44]], false); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[-55, 90], [-20, 60], [40, 50], [120, 52], [200, 60], [256, 80]], false); ctx.stroke(); ctx.restore(); ctx.restore();
  glans(HZ.voor, hl.voor || 0, kl.voor || C.goud); glans(HZ.motor, hl.motor || 0, kl.motor || C.goud); glans(HZ.slaap, hl.slaap || 0, kl.slaap || C.goud);
  // weggehaald (Henry): arcering op het voorste deel van de slaapkwab
  if (weg > 0.01) { ctx.save(); ctx.globalAlpha *= weg; ctx.beginPath(); bioPad(ctx, [[60, 70], [140, 62], [215, 72], [252, 100], [215, 145], [140, 160], [70, 140], [40, 105]], true); ctx.fillStyle = rgba(C.bgSchema, 0.65); ctx.fill(); ctx.clip();
    ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 3; for (let k = -10; k < 20; k++) { ctx.beginPath(); ctx.moveTo(k * 18, 40); ctx.lineTo(k * 18 + 130, 180); ctx.stroke(); } ctx.restore();
    ctx.save(); ctx.globalAlpha *= weg; ctx.beginPath(); bioPad(ctx, [[60, 70], [140, 62], [215, 72], [252, 100], [215, 145], [140, 160], [70, 140], [40, 105]], true); ctx.setLineDash([8, 6]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  // diep: basale kernen en hippocampus (gestippeld; vol als ze oplichten)
  const diep = (v, k, teken) => { ctx.save(); ctx.globalAlpha *= 0.55 + 0.45 * v; ctx.setLineDash(v > 0.5 ? [] : [7, 6]); ctx.strokeStyle = v > 0.01 ? k : rgba('#F2F2EE', 0.7); ctx.lineWidth = 3; ctx.fillStyle = rgba(k, 0.55 * v); teken(); ctx.restore(); };
  diep(hl.basaal || 0, kl.basaal || C.goud, () => { ctx.beginPath(); bioPad(ctx, HZ.basaal, false); ctx.lineWidth = 16; ctx.strokeStyle = (hl.basaal || 0) > 0.01 ? rgba(kl.basaal || C.goud, 0.35 + 0.6 * hl.basaal) : rgba('#F2F2EE', 0.18); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = (hl.basaal || 0) > 0.01 ? (kl.basaal || C.goud) : rgba('#F2F2EE', 0.7); ctx.beginPath(); ctx.ellipse(80, -10, 58, 34, -0.15, 0, 6.283); ctx.fill(); ctx.stroke(); });
  diep(hl.hippo || 0, kl.hippo || C.goud, () => { ctx.beginPath(); bioPad(ctx, HZ.hippo, false); ctx.lineWidth = 22; ctx.strokeStyle = (hl.hippo || 0) > 0.01 ? rgba(kl.hippo || C.goud, 0.3 + 0.65 * hl.hippo) : rgba('#F2F2EE', 0.16); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = (hl.hippo || 0) > 0.01 ? (kl.hippo || C.goud) : rgba('#F2F2EE', 0.7); ctx.beginPath(); ctx.arc(200, 134, 12, 0, 6.283); ctx.stroke(); });
  ctx.restore(); return anker;
}

// ---------- netwerk van zenuwcellen ----------
// Cellen als kleine cellichamen met korte uitlopers; verbindingen tussen buren. o.pat = indices in het patroon; o.act(i) = activiteit 0..1 (teal),
// o.sterk = 0..1 (verbindingen binnen het patroon dikker), o.dood = index die uitvalt, o.weg(e) = 0..1 verbinding verdwijnt (snoeien).
function netwerkPunten(n, x, y, w, h, seed = 1) { const P = []; const cols = Math.ceil(Math.sqrt(n * w / h)), rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); P.push([x + (c + 0.5 + (hash(i * 3 + seed) - 0.5) * 0.7) * w / cols, y + (r + 0.5 + (hash(i * 5 + seed + 1) - 0.5) * 0.7) * h / rows]); } return P; }
function netwerkLijnen(P, maxD) { const E = []; for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (d < maxD) E.push([i, j, d]); } return E; }
function netwerk(ctx, P, E, o = {}) { const { a = 1, pat = [], act = () => 0, sterk = 0, dood = -1, doodA = 0, weg = () => 0, r = 16, t = 0, dun = () => 0 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const inP = new Set(pat);
  E.forEach(([i, j], k) => { const pp = inP.has(i) && inP.has(j), wg = weg(k); if (wg > 0.99) return; const ac = Math.min(act(i), act(j)); ctx.save(); ctx.globalAlpha *= 1 - wg;
    ctx.strokeStyle = ac > 0.05 ? rgba(Z6.sig, 0.45 + 0.55 * ac) : pp && sterk > 0 ? rgba('#C9D6E3', 0.35 + 0.4 * sterk) : rgba('#8FA0B5', 0.35); ctx.lineWidth = (pp ? 2 + 5 * sterk : 2) * (1 - 0.6 * dun(k));
    if (dun(k) > 0.3 && !pp) ctx.setLineDash([5, 6]); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); ctx.restore(); });
  P.forEach(([x, y], i) => { const ac = act(i), isD = i === dood; ctx.save(); if (isD) ctx.globalAlpha *= 1 - 0.7 * doodA;
    ctx.strokeStyle = rgba('#AFC0D0', 0.6); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { const an = hash(i * 9 + k) * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an + 0.2) * r * 1.7, y + Math.sin(an + 0.2) * r * 1.7); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = ac > 0.02 ? _mixHex('#3A4A66', Z6.sig, ac) : '#3A4A66'; ctx.fill(); ctx.strokeStyle = ac > 0.02 ? lighten(Z6.sig, 0.3) : '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke();
    circ(ctx, x, y, r * 0.38, ac > 0.02 ? rgba('#F2F2EE', 0.5 + 0.5 * ac) : '#6E7E98'); ctx.restore(); if (isD && doodA > 0.05) kruis(ctx, x, y, r * 1.1, doodA, C.koraal); });
  ctx.restore(); }

// ---------- synaps op een dendrietvoetje (Micro) ----------
// Recept: eindknopje (± 1 µm) met blaasjes (± 40 nm) en mitochondriën; synapsspleet ± 20 nm; dendrietvoetje = paddenstoel: kopje ± 0,5–1 µm op een dun
// halsje op de dendriet. In het membraan van het kopje AMPA-receptoren (Na+-kanaal) en NMDA-receptoren: die laten Ca2+ door, maar alleen als glutamaat
// gebonden is én de cel al gedepolariseerd is (dan schuift het magnesiumion uit het kanaal). Ca2+ in het voetje → extra AMPA-receptoren ingebouwd
// (vroege LTP, minuten); na herhaling nieuwe eiwitten, groter kopje en nieuwe voetjes (late LTP, uren tot maanden).
// Bron: Kandel e.a. Principles of Neural Science (LTP, NMDA-receptor); OpenStax Biology 2e 35.2 (LTP, NMDA, Mg2+); Bosch & Hayashi 2012 (structurele LTP van voetjes).
// Bekende fouten: receptoren op het eindknopje; calcium dat door de AMPA-receptor gaat; voetje als losse bol zonder halsje.
// o: groei (0..1 kopje groter), ampa (aantal 3..6), nieuw (0..1 extra receptoren ingebouwd), actief (0..1 voetje gedepolariseerd), glu (0..1 glutamaat in de spleet),
//    nmdaHi, mg (1 = magnesium in het kanaal, 0 = eruit), ca (0..1 calcium stroomt in), eiwit (0..1), tweede (0..1 nieuw voetje), imp (0..1 impuls in het axon)
function synapsVoetje(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, groei = 0, nieuw = 0, actief = 0, glu = 0, nmdaHi = 0, mg = 1, ca = 0, eiwit = 0, tweede = 0, imp = 0, hi = null } = o;
  const P = (px, py) => [x + px * s, y + py * s]; const kw = 1 + 0.35 * groei;
  const anker = { knop: P(0, -230), spleet: P(0, 0), voetje: P(0, 120), nmda: P(0, 22), dendriet: P(-420, 380), ca: P(0, 110), tweede: P(500, 180), eiwit: P(-200, 360) };
  if (a <= 0.01) return anker; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // dendriet (horizontale buis onderaan) met halsje en kopje
  const DY = 330, TH = 64, HW = 400 * kw, HH = 190 * kw, X2 = 500; // dendriet (gebogen buis onderaan) met halsje en kopje
  const dy = (xx) => DY + (xx / 760) ** 2 * 90; // dendriet buigt aan de randen omlaag
  const dend = () => { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = -800 + k * 40; ctx[k ? 'lineTo' : 'moveTo'](xx, dy(xx) - TH); } for (let k = 40; k >= 0; k--) { const xx = -800 + k * 40; ctx.lineTo(xx, dy(xx) + TH); } ctx.closePath(); };
  const kop = (cx, w, hgt, top, open = false) => { const hw = w / 2, nw = 28, by = dy(cx) - TH + 2; ctx.beginPath(); ctx.moveTo(cx - nw, by); ctx.bezierCurveTo(cx - nw, by - 50, cx - nw * 0.8, top + hgt * 0.95, cx - hw * 0.72, top + hgt * 0.8);
    ctx.bezierCurveTo(cx - hw * 1.1, top + hgt * 0.5, cx - hw * 1.02, top + 6, cx - hw * 0.7, top + 2); ctx.quadraticCurveTo(cx, top - 6, cx + hw * 0.7, top + 2);
    ctx.bezierCurveTo(cx + hw * 1.02, top + 6, cx + hw * 1.1, top + hgt * 0.5, cx + hw * 0.72, top + hgt * 0.8); ctx.bezierCurveTo(cx + nw * 0.8, top + hgt * 0.95, cx + nw, by - 50, cx + nw, by); if (!open) ctx.closePath(); };
  const k2 = () => kop(X2, 150 * tweede + 30, 100 * tweede + 20, dy(X2) - TH - (140 * tweede + 50));
  const postVul = _mixHex(Z6.post, Z6.sig, 0.28 * actief);
  ctx.save(); ctx.fillStyle = postVul; dend(); ctx.fill(); kop(0, HW, HH, 26); ctx.fill(); if (tweede > 0.01) { ctx.save(); ctx.globalAlpha *= tweede; k2(); ctx.fill(); ctx.restore(); } ctx.restore();
  // rustige textuur binnen de dendriet en het voetje (weinig deeltjes)
  ctx.save(); dend(); kop(0, HW, HH, 26); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12); for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(-740 + hash(i * 7) * 1480, 30 + hash(i * 7 + 1) * (DY + 80), 1.6, 0, 6.283); ctx.fill(); }
  // eiwitten (kralenketen die vouwt) in de dendriet onder het voetje
  if (eiwit > 0.01) { eiwitVouw(ctx, -210, DY + 8, 0.42, clamp(eiwit * 1.3 - 0.15, 0, 1), Array(24).fill(0), { a: Math.min(1, eiwit * 3), kleur: 'eiwit', r: 7, t }); eiwitVouw(ctx, 190, DY + 14, 0.38, clamp(eiwit * 1.3 - 0.3, 0, 1), Array(22).fill(0), { a: Math.min(1, eiwit * 3), kleur: 'eiwit', r: 7, t, seed: 7 }); }
  // calcium in het voetje
  if (ca > 0.01) { ctx.fillStyle = Z6.ca; for (let k = 0; k < 30; k++) { const u = clamp(ca * 1.6 - hash(k) * 0.6, 0, 1); if (u <= 0) continue; const w0 = wander(k + 300, t, 6, 1.2); const xx = (hash(k + 9) - 0.5) * 300 * kw * Math.min(1, u * 1.5) + w0.x, yy = 26 + 22 + u * (60 + hash(k + 5) * 100) * kw + w0.y; ctx.beginPath(); ctx.arc(xx, yy, 5.5, 0, 6.283); ctx.fill(); } }
  // nieuwe AMPA-receptoren onderweg in blaasjes naar het membraan
  if (nieuw > 0.01 && nieuw < 1) { for (let k = 0; k < 3; k++) { const u = ease(clamp(nieuw * 1.4 - k * 0.15, 0, 1)); const bx = [-120, 120, -170][k] * kw, by = lerp(DY - 20, 26 + 30, u); vesicle(ctx, bx * (0.3 + 0.7 * u), by, 13, 1 - ease(clamp((u - 0.85) / 0.15, 0, 1)), rgba(Z6.ampa, 0.5), Z6.ampa); } }
  ctx.restore();
  // membranen van dendriet en voetjes (dubbele lijn; het halsje loopt open over in de dendriet)
  ctx.strokeStyle = Z6.mem; ctx.lineWidth = 4; dend(); ctx.stroke(); ctx.strokeStyle = postVul; ctx.lineCap = 'butt'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-26, dy(0) - TH); ctx.lineTo(26, dy(0) - TH); ctx.stroke();
  if (tweede > 0.01) { ctx.save(); ctx.globalAlpha *= tweede; ctx.beginPath(); ctx.moveTo(X2 - 26, dy(X2) - TH); ctx.lineTo(X2 + 26, dy(X2) - TH); ctx.stroke(); ctx.restore(); } ctx.lineCap = 'round';
  ctx.strokeStyle = Z6.mem; ctx.lineWidth = 4; kop(0, HW, HH, 26, true); ctx.stroke(); ctx.strokeStyle = rgba(Z6.mem, 0.45); ctx.lineWidth = 1.5; ctx.save(); ctx.translate(0, 7); ctx.scale(0.96, 0.98); kop(0, HW, HH, 26, true); ctx.stroke(); ctx.restore();
  if (tweede > 0.01) { ctx.save(); ctx.globalAlpha *= tweede; ctx.strokeStyle = Z6.mem; ctx.lineWidth = 4; k2(); ctx.stroke(); ctx.restore(); }
  // receptoren in het kopje (loodrecht in het membraan): AMPA-paren en in het midden de NMDA-receptor (toevalsdetector)
  const topY = (xx) => { const hw = 200 * kw; const u = clamp(xx / (hw * 0.7), -1, 1); return 28 + Math.abs(u) ** 2 * 6 - 2; };
  const nA = 4 + Math.round(2 * ease(clamp((nieuw - 0.85) / 0.15, 0, 1)));
  const AX = nA === 4 ? [-140, -80, 80, 140] : [-165, -118, -72, 72, 118, 165]; const bind = glu;
  AX.forEach((ax, i) => { const xx = ax * kw * 0.92, yy = topY(xx); const nw = nA > 4 && (i === 0 || i === 5 || (i === 2 && false)); ctx.fillStyle = hi === 'ampa' ? C.goud : Z6.ampa;
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(xx + sd * 7, yy + 6, 6, 17, 0, 0, 6.283); ctx.fill(); }
    if (bind > 0.5) circ(ctx, xx, yy - 13, 5, Z6.nt); if (bind > 0.6 && actief > -1) { ctx.fillStyle = rgba('#F2F2EE', 0.6); const v = (t * 1.3 + i * 0.21) % 1; ctx.beginPath(); ctx.arc(xx, yy - 6 + v * 46, 3, 0, 6.283); ctx.fill(); } });
  { const xx = 0, yy = topY(0); ctx.fillStyle = nmdaHi > 0.5 ? C.goud : Z6.nmda; for (const sd of [-1, 1]) { roundRect(ctx, xx + sd * 12 - 8, yy - 14, 16, 42, 7); ctx.fill(); }
    if (nmdaHi > 0.01) { ctx.save(); ctx.globalAlpha *= nmdaHi; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xx, yy + 6, 40, 0, 6.283); ctx.stroke(); ctx.restore(); }
    if (bind > 0.5) circ(ctx, xx, yy - 20, 5.5, Z6.nt);
    const my = lerp(yy + 70, yy + 4, mg); if (mg > 0.02 || true) circ(ctx, xx + (1 - mg) * 18, my, 9, Z6.mg, '#C9D2DE', 1.5); }
  // eindknopje (boven) met blaasjes en mitochondriën; axon komt van boven
  const KN = [[-60, -420], [-70, -330], [-190, -280], [-250, -170], [-225, -80], [-160, -24], [-60, -14], [60, -14], [160, -24], [225, -80], [250, -170], [190, -280], [70, -330], [60, -420]];
  ctx.beginPath(); bioPad(ctx, KN, false); ctx.closePath(); ctx.fillStyle = Z6.cyt; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-230 + hash(i + 11) * 460, -400 + hash(i + 61) * 380, 1.6, 0, 6.283); ctx.fill(); }
  if (imp > 0.01 && imp < 1) { ctx.fillStyle = rgba(Z6.sig, 0.3 * Math.sin(imp * 3.14)); ctx.beginPath(); ctx.ellipse(0, lerp(-440, -90, imp), 190, 60, 0, 0, 6.283); ctx.fill(); }
  mitochondrion(ctx, 120, -200, 80, 0.5, 0.95, 5, t); mitochondrion(ctx, -140, -190, 64, -0.6, 0.95, 4, t);
  const BL = [[-90, -60], [-30, -52], [30, -55], [90, -64], [-120, -110], [-50, -118], [20, -112], [80, -125], [-10, -170], [55, -180]];
  BL.forEach(([bx, by], i) => { const vrij = i < 4, open = vrij ? ease(clamp(glu * 2.2 - 0.1 - i * 0.06, 0, 1)) : 0, py = vrij ? lerp(by, -14 - 15, ease(clamp(glu * 3, 0, 1))) : by + Math.sin(t * 0.7 + i) * 2;
    if (open < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - open; ctx.beginPath(); ctx.arc(bx, py + open * 15, 15 * (1 - 0.5 * open), 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.3); ctx.fill(); ctx.strokeStyle = C.vesR; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = Z6.nt; for (let k = 0; k < 5; k++) { const an = k * 1.26 + i; ctx.beginPath(); ctx.arc(bx + Math.cos(an) * 7, py + Math.sin(an) * 7, 2.6, 0, 6.283); ctx.fill(); } ctx.restore(); } });
  ctx.restore();
  ctx.strokeStyle = Z6.mem; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, KN, false); ctx.stroke();
  // glutamaat in de spleet
  if (glu > 0.05) { for (let k = 0; k < 24; k++) { const u = clamp(glu * 1.5 - hash(k + 40) * 0.4, 0, 1); const sx = (hash(k + 20) - 0.5) * 260, tx = (hash(k * 3 + 2) - 0.5) * 300 * kw; const px = lerp(sx * 0.5, tx, u), py = lerp(-12, 14, u) + Math.sin(t * 3 + k) * 2.5;
      ctx.save(); ctx.globalAlpha *= Math.min(1, glu * 4); circ(ctx, px, py, 4, Z6.nt); ctx.restore(); } }
  ctx.restore(); return anker;
}

// ---------- klein spul ----------
function bel(ctx, x, y, s = 1, a = 1, swing = 0, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(swing); ctx.scale(s, s);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-34, 22); ctx.quadraticCurveTo(-32, -38, 0, -40); ctx.quadraticCurveTo(32, -38, 34, 22); ctx.lineTo(40, 30); ctx.lineTo(-40, 30); ctx.closePath(); shape(ctx, kl, lighten(kl, 0.3), 2);
  circ(ctx, Math.sin(swing * 3) * 10, 36, 7, _donker(kl, 0.2)); ctx.restore(); }
function belGolf(ctx, x, y, u, a = 1) { if (a <= 0.01 || u <= 0) return; ctx.save(); ctx.globalAlpha *= a * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x, y, 50 + u * 40, sd > 0 ? -0.6 : Math.PI - 0.6, sd > 0 ? 0.6 : Math.PI + 0.6); ctx.stroke(); } ctx.restore(); }
function etensbak(ctx, x, y, s = 1, a = 1, vol = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (vol > 0.01) { ctx.save(); ctx.globalAlpha *= vol; ctx.fillStyle = C.oker; for (let k = 0; k < 9; k++) circ(ctx, -36 + k * 9, -24 - Math.sin(k * 1.3) * 6, 9, k % 2 ? C.oker : C.okerD); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-52, -22); ctx.lineTo(52, -22); ctx.lineTo(42, 0); ctx.lineTo(-42, 0); ctx.closePath(); shape(ctx, '#7A8BA8', '#AFC0D0', 2); ctx.restore(); }
function druppel(ctx, x, y, r = 10, a = 1, kl = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.7); ctx.quadraticCurveTo(x + r * 1.1, y - r * 0.2, x, y + r); ctx.quadraticCurveTo(x - r * 1.1, y - r * 0.2, x, y - r * 1.7); shape(ctx, kl, lighten(kl, 0.3), 1.5); ctx.restore(); }
function frietbak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 0; k < 9; k++) { ctx.save(); ctx.translate(-30 + k * 7.5, -40); ctx.rotate((k - 4) * 0.06); roundRect(ctx, -5, -38 - (k % 3) * 8, 10, 60, 3); shape(ctx, '#E8C45A', '#C9A33A', 1.5); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(30, 20); ctx.lineTo(-30, 20); ctx.closePath(); shape(ctx, '#C9503C', '#E07A5F', 2); ctx.restore(); }
function ster(ctx, x, y, r, o = {}) { const { a = 1, kl = '#F2F2EE', lw = 3, wiebel = 0, seed = 1, deel = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineJoin = 'round';
  const pts = []; for (let k = 0; k <= 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; pts.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr]); }
  const N = Math.round(10 * 12 * deel); ctx.beginPath(); for (let i = 0; i <= N; i++) { const seg = Math.min(9, Math.floor(i / 12)), u = (i % 12) / 12 + (i === N && i % 12 === 0 && i > 0 ? 0 : 0); const p = pts[seg], q = pts[seg + 1]; const px = lerp(p[0], q[0], i === N ? (deel * 10 - seg) : u), py = lerp(p[1], q[1], i === N ? (deel * 10 - seg) : u);
    const w = wiebel * r * 0.09 * (Math.sin(i * 1.7 + seed) + 0.6 * Math.sin(i * 0.53 + seed * 2)); i ? ctx.lineTo(px + w, py - w * 0.6) : ctx.moveTo(px + w, py); } ctx.stroke(); ctx.restore(); }
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#E8DFC0'; ctx.fill(); ctx.beginPath(); ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.9, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.restore(); }
function kaartje(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.92), rand, 1.5); ctx.restore(); }
