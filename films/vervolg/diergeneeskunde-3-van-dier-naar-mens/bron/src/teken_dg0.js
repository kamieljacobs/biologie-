// Wat word jij? · Diergeneeskunde — gedeelde tekenset voor de vier films (21 okt 2026)
// Dieren in zijaanzicht, kop naar rechts (kijk: -1 spiegelt). Anker (x, y) = midden onder de poten, op de grond. s = schaal (1 ≈ koe van 470 px lang).
// Een dier dat naar rechts kijkt, laat zijn LINKERflank zien (pens en lebmaag van de koe liggen links).

// gladde gesloten (of open) lijn door punten (midpuntmethode)
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');

// poot: van (x, y0) naar de grond (y = 0), met knie/hak-knik dx; hoef of voetje
function poot(ctx, x, y0, b, kleur, hoef, o = {}) { const { knik = 0, buig = 0, voet = 'hoef', hoefH = 14, smal = 0.42 } = o;
  const k = y0 * 0.45; ctx.beginPath(); ctx.moveTo(x - b * 0.62, y0); ctx.quadraticCurveTo(x - b * 0.5 + knik, k, x - b * smal + buig, -hoefH); ctx.lineTo(x + b * smal + buig, -hoefH); ctx.quadraticCurveTo(x + b * 0.5 + knik, k, x + b * 0.62, y0); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  if (voet === 'hoef') { roundRect(ctx, x - b * (smal + 0.1) + buig, -hoefH - 2, b * (smal + 0.1) * 2, hoefH + 2, 3); ctx.fillStyle = hoef; ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(x + buig + b * 0.15, -hoefH * 0.4, b * 0.62, hoefH * 0.55, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); } }

function _start(ctx, x, y, s, kijk, a) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); }

// ---------- KOE (Holstein-bont) ----------
const KOE_ROMP = [[-205, -190], [-196, -222], [-150, -236], [-50, -230], [60, -236], [120, -244], [158, -228], [176, -196], [168, -150], [140, -112], [92, -98], [30, -94], [-50, -96], [-120, -100], [-172, -116], [-202, -150]];
const KOE_KOP = [[150, -232], [186, -246], [214, -238], [244, -206], [266, -168], [270, -142], [256, -126], [232, -128], [210, -150], [176, -170], [150, -186]];
// o: a, kijk, t, kauw (0..1 kaak), bont, uier, doorsnede (0..1: romp doorzichtig), staart (zwaai), horens, kalf
function koe(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kauw = 0, bont = true, uier = 1, doorsnede = 0, staart = 0.3, horens = true, kleur = '#F2EEE6', vlek = '#2A2622', binnen = null } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const romp = 1 - doorsnede * 0.72, rand = '#6A6258';
  // achterste poten (donkerder)
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -168, -130, 30, _dk(kleur, 0.18), '#3A3430', { knik: -14, smal: 0.36 }); poot(ctx, 104, -108, 28, _dk(kleur, 0.18), '#3A3430', { smal: 0.36 }); ctx.restore();
  // staart
  const zw = Math.sin(t * 1.4) * 10 * staart; ctx.save(); ctx.globalAlpha *= romp; ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-198, -214); ctx.quadraticCurveTo(-222 + zw * 0.3, -150, -214 + zw, -70); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-214 + zw, -58, 9, 18, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.restore();
  // romp + nek + kop
  ctx.save(); ctx.globalAlpha *= romp; zacht(ctx, KOE_ROMP); ctx.fillStyle = kleur; ctx.fill();
  ctx.beginPath(); ctx.moveTo(110, -240); ctx.quadraticCurveTo(150, -250, 176, -236); ctx.lineTo(196, -170); ctx.quadraticCurveTo(170, -120, 128, -112); ctx.closePath(); ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_ROMP); ctx.clip(); ctx.fillStyle = vlek; [[-150, -190, 50, 38, 1], [-60, -215, 46, 30, 3], [30, -150, 58, 40, 5], [-110, -120, 30, 20, 7], [110, -200, 40, 34, 9]].forEach(([bx, by, rx, ry, sd]) => { blob(ctx, bx, by, rx, ry, 0.28, sd); ctx.fill(); }); ctx.restore(); }
  // uier
  if (uier > 0.01) { ctx.save(); ctx.globalAlpha *= uier; ctx.beginPath(); ctx.ellipse(-108, -94, 40, 24, 0, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); ctx.fillStyle = '#D89C90'; [-130, -112, -94].forEach(px => { roundRect(ctx, px - 4, -76, 8, 14, 3); ctx.fill(); }); ctx.restore(); }
  ctx.restore();
  if (binnen) binnen(ctx);
  // voorste poten
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -128, -118, 32, kleur, '#3A3430', { knik: -16, smal: 0.36 }); poot(ctx, 146, -108, 30, kleur, '#3A3430', { smal: 0.36 });
  // kop
  const kk = kauw * Math.sin(t * 9) * 3; zacht(ctx, KOE_KOP); ctx.fillStyle = kleur; ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_KOP); ctx.clip(); ctx.fillStyle = vlek; blob(ctx, 196, -222, 36, 26, 0.2, 4); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(258, -142 + kk, 18, 20, 0.2, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); circ(ctx, 263, -150 + kk, 3.5, '#8A5A50');
  circ(ctx, 220, -196, 6.5, '#1A1612'); circ(ctx, 222, -198, 2, '#FFFFFF');
  ctx.beginPath(); ctx.ellipse(180, -232, 26, 10, -0.35, 0, 6.283); ctx.fillStyle = _dk(kleur, 0.08); ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke();
  if (horens) { ctx.beginPath(); ctx.moveTo(196, -240); ctx.quadraticCurveTo(204, -262, 222, -266); ctx.quadraticCurveTo(208, -252, 206, -238); ctx.closePath(); ctx.fillStyle = '#D8CBB0'; ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// koe in doorsnede: de vier maagdelen (u = 0..1 opbouw; nadruk: 'pens'|'net'|'boek'|'leb'|null). Coördinaten in koe-eenheden.
function koeMagen(ctx, u = 1, nadruk = null, t = 0, o = {}) { const { gas = 0, verschoven = 0 } = o; const A = (k) => clamp(u * 4 - k, 0, 1);
  // slokdarm
  ctx.save(); ctx.globalAlpha *= A(0); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; zacht(ctx, [[250, -150], [200, -170], [150, -178], [110, -186], [70, -190]], false); ctx.stroke(); ctx.restore();
  const dim = (k) => (nadruk && nadruk !== k ? 0.45 : 1);
  // pens: groot, links-achter
  ctx.save(); ctx.globalAlpha *= A(0) * dim('pens'); zacht(ctx, [[-160, -200], [-100, -214], [0, -212], [62, -196], [70, -150], [40, -116], [-40, -108], [-130, -114], [-168, -150]]); shape(ctx, '#7FA35A', '#A8C882', 2.5);
  ctx.save(); zacht(ctx, [[-160, -200], [-100, -214], [0, -212], [62, -196], [70, -150], [40, -116], [-40, -108], [-130, -114], [-168, -150]]); ctx.clip();
  for (let i = 0; i < 26; i++) { const px = -150 + hash(i * 3.1) * 210, py = -200 + hash(i * 7.7) * 85, an = hash(i) * 3 + t * 0.4; ctx.strokeStyle = '#C9DFA8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 10, py - Math.sin(an) * 10); ctx.lineTo(px + Math.cos(an) * 10, py + Math.sin(an) * 10); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // netmaag: rond, voor de pens
  ctx.save(); ctx.globalAlpha *= A(1) * dim('net'); ctx.beginPath(); ctx.ellipse(96, -168, 26, 24, 0, 0, 6.283); shape(ctx, '#B88A5A', '#D8AE7E', 2.5);
  ctx.strokeStyle = 'rgba(255,240,210,0.35)'; ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(78, -168 + i * 8); ctx.lineTo(114, -168 + i * 8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(96 + i * 8, -188); ctx.lineTo(96 + i * 8, -148); ctx.stroke(); } ctx.restore();
  // boekmaag
  ctx.save(); ctx.globalAlpha *= A(2) * dim('boek'); ctx.beginPath(); ctx.ellipse(118, -128, 20, 17, 0, 0, 6.283); shape(ctx, '#9A7AB0', '#BBA0D0', 2.5); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(104, -128 + i * 5); ctx.lineTo(132, -128 + i * 5); ctx.stroke(); } ctx.restore();
  // lebmaag: langgerekt onderin; bij verschoven ligt hij omhoog naast de pens, vol gas
  ctx.save(); ctx.globalAlpha *= A(3) * dim('leb'); const vy = -verschoven * 70, vx = -verschoven * 40;
  zacht(ctx, [[110 + vx, -112 + vy], [70 + vx, -104 + vy], [10 + vx, -102 + vy], [-36 + vx, -110 + vy], [-20 + vx, -124 + vy], [40 + vx, -122 + vy], [96 + vx, -128 + vy]]); shape(ctx, '#D8826A', '#F0A890', 2.5);
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; ctx.beginPath(); ctx.ellipse(30 + vx, -121 + vy, 46, 9, 0, 0, 6.283); ctx.fillStyle = 'rgba(230,240,255,0.55)'; ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- PAARD (bruin, zwarte manen) ----------
const PAARD_ROMP = [[-190, -250], [-140, -272], [-40, -262], [60, -266], [118, -282], [150, -270], [162, -232], [150, -186], [120, -160], [60, -150], [-40, -150], [-120, -158], [-172, -176], [-196, -214]];
function paard(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, doorsnede = 0, kleur = '#9A5E38', manen = '#2A1C14', pijn = 0, binnen = null } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const romp = 1 - doorsnede * 0.72, hoef = '#2E2620', sch = Math.sin(t * 6) * pijn;
  ctx.save(); ctx.globalAlpha *= romp;
  poot(ctx, -164, -172, 24, _dk(kleur, 0.2), hoef, { knik: -16, smal: 0.3 }); poot(ctx, 108, -160, 22, _dk(kleur, 0.2), hoef, { buig: sch * 20, smal: 0.3 });
  // staart
  ctx.fillStyle = manen; zacht(ctx, [[-188, -252], [-214, -230], [-226, -170], [-220, -100], [-206, -96], [-206, -170], [-192, -224]]); ctx.fill();
  zacht(ctx, PAARD_ROMP); ctx.fillStyle = kleur; ctx.fill();
  // nek en kop
  zacht(ctx, [[96, -276], [150, -340], [196, -394], [222, -402], [246, -380], [282, -326], [294, -298], [284, -286], [262, -294], [236, -334], [210, -330], [180, -270], [160, -200], [120, -200]]); ctx.fill();
  ctx.fillStyle = manen; zacht(ctx, [[100, -280], [148, -344], [194, -398], [206, -404], [198, -376], [160, -330], [122, -282]]); ctx.fill();
  ctx.beginPath(); ctx.ellipse(208, -404, 7, 18, 0.4, 0, 6.283); ctx.fillStyle = kleur; ctx.fill();
  circ(ctx, 236, -364, 6, '#140E0A'); circ(ctx, 238, -366, 2, '#FFFFFF'); circ(ctx, 284, -300, 4, '#3A2418');
  ctx.restore();
  if (binnen) binnen(ctx);
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -126, -168, 26, kleur, hoef, { knik: -18, smal: 0.3 }); poot(ctx, 146, -160, 24, kleur, hoef, { smal: 0.3 }); ctx.restore();
  ctx.restore(); }
// paard in doorsnede: kleine maag voor, dunne darm, grote blinde darm en dikke darm achter
function paardDarm(ctx, u = 1, nadruk = null, t = 0, o = {}) { const { slot = 0 } = o; const A = (k) => clamp(u * 4 - k, 0, 1); const dim = (k) => (nadruk && nadruk !== k ? 0.45 : 1);
  ctx.save(); ctx.globalAlpha *= A(0); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; zacht(ctx, [[270, -300], [220, -330], [170, -290], [130, -246], [104, -230]], false); ctx.stroke(); ctx.restore();
  // maag (klein)
  ctx.save(); ctx.globalAlpha *= A(0) * dim('maag'); ctx.beginPath(); ctx.ellipse(86, -222, 28, 22, -0.3, 0, 6.283); shape(ctx, '#D8826A', '#F0A890', 2.5);
  if (slot > 0.01) { ctx.save(); ctx.globalAlpha *= slot; circ(ctx, 106, -236, 9, '#E0B64A', '#F2D27A', 2); ctx.restore(); } ctx.restore();
  // dunne darm: kronkel
  ctx.save(); ctx.globalAlpha *= A(1) * dim('dunne'); ctx.strokeStyle = '#E8A890'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const f = i / 60, px = 70 - f * 110 + Math.sin(f * 18) * 18, py = -226 + f * 30 + Math.cos(f * 18) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore();
  // blinde darm (komma) + dikke darm (lussen)
  ctx.save(); ctx.globalAlpha *= A(2) * dim('blinde'); zacht(ctx, [[-60, -214], [-20, -220], [20, -206], [40, -178], [30, -160], [-10, -160], [-50, -172], [-80, -196]]); shape(ctx, '#7FA35A', '#A8C882', 2.5);
  ctx.save(); zacht(ctx, [[-60, -214], [-20, -220], [20, -206], [40, -178], [30, -160], [-10, -160], [-50, -172], [-80, -196]]); ctx.clip(); for (let i = 0; i < 14; i++) { const px = -70 + hash(i * 2.3) * 100, py = -210 + hash(i * 5.1) * 45, an = hash(i) * 3 + t * 0.4; ctx.strokeStyle = '#C9DFA8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 8 * Math.cos(an), py - 8 * Math.sin(an)); ctx.lineTo(px + 8 * Math.cos(an), py + 8 * Math.sin(an)); ctx.stroke(); } ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= A(3) * dim('dikke'); ctx.strokeStyle = '#8FB06A'; ctx.lineWidth = 16; ctx.lineCap = 'round'; zacht(ctx, [[-80, -196], [-140, -200], [-160, -176], [-120, -166], [-150, -224], [-178, -236], [-196, -232]], false); ctx.stroke(); ctx.restore(); }

// ---------- KAT (zittend of staand, cyperse grijs) ----------
function kat(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#8A8A86', streep = '#5E5E5A', ziek = 0, zit = true } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const st = Math.sin(t * 1.2) * 8;
  ctx.strokeStyle = kleur; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, -14); ctx.quadraticCurveTo(-100, -10, -96 + st, -70); ctx.stroke();
  if (zit) { zacht(ctx, [[-50, -10], [-56, -60], [-36, -110], [0, -130], [30, -120], [40, -80], [36, -20], [20, 0], [-30, 0]]); ctx.fillStyle = kleur; ctx.fill();
    ctx.fillStyle = kleur; roundRect(ctx, 8, -60, 16, 60, 8); ctx.fill(); roundRect(ctx, 28, -60, 16, 60, 8); ctx.fill();
    ctx.save(); zacht(ctx, [[-50, -10], [-56, -60], [-36, -110], [0, -130], [30, -120], [40, -80], [36, -20], [20, 0], [-30, 0]]); ctx.clip(); ctx.strokeStyle = streep; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-60, -90 + i * 22); ctx.quadraticCurveTo(-30, -84 + i * 22, -10, -98 + i * 22); ctx.stroke(); } ctx.restore(); }
  else { zacht(ctx, [[-70, -60], [-40, -78], [30, -76], [50, -60], [44, -40], [-60, -38]]); ctx.fillStyle = kleur; ctx.fill(); [[-56, -44], [-38, -44], [24, -46], [40, -46]].forEach(([px, py]) => { roundRect(ctx, px - 6, py, 12, -py, 6); ctx.fill(); }); }
  // kop
  const hx = zit ? 18 : 56, hy = zit ? -146 : -86; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(hx, hy, 34, 30, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(hx - 28, hy - 14); ctx.lineTo(hx - 22, hy - 46); ctx.lineTo(hx - 4, hy - 26); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(hx + 4, hy - 28); ctx.lineTo(hx + 22, hy - 46); ctx.lineTo(hx + 28, hy - 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E8A8A0'; ctx.beginPath(); ctx.moveTo(hx + 22, hy - 2); ctx.lineTo(hx + 30, hy - 2); ctx.lineTo(hx + 26, hy + 4); ctx.closePath(); ctx.fill();
  const og = ziek > 0.5 ? 0.35 : 1; ctx.fillStyle = '#C9D85A'; ctx.beginPath(); ctx.ellipse(hx + 2, hy - 8, 6, 6 * og, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(hx + 20, hy - 8, 5, 5 * og, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#121212'; ctx.fillRect(hx + 1, hy - 8 - 5 * og, 2, 10 * og); ctx.fillRect(hx + 19, hy - 8 - 4 * og, 2, 8 * og);
  ctx.strokeStyle = '#D8D8D2'; ctx.lineWidth = 1.2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(hx + 28, hy + 4); ctx.lineTo(hx + 56, hy + 1 + i * 7); ctx.stroke(); }
  ctx.restore(); }

// ---------- HOND (collie: bruin met witte kraag) ----------
function hond(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#B07A3E', wit = '#F2EEE6' } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const st = Math.sin(t * 3) * 6; ctx.fillStyle = kleur;
  zacht(ctx, [[-110, -118], [-140, -96], [-150, -50], [-130 + st, -40], [-120, -90]]); ctx.fill();
  poot(ctx, -86, -80, 18, _dk(kleur, 0.2), '#2A2A2A', { voet: 'pootje', hoefH: 8 }); poot(ctx, 60, -80, 16, _dk(wit, 0.1), '#2A2A2A', { voet: 'pootje', hoefH: 8 });
  ctx.fillStyle = kleur; zacht(ctx, [[-118, -120], [-60, -136], [40, -134], [86, -126], [96, -96], [70, -72], [-40, -70], [-110, -80], [-124, -100]]); ctx.fill();
  ctx.fillStyle = wit; zacht(ctx, [[50, -146], [96, -168], [124, -120], [110, -84], [96, -64], [82, -76], [68, -66], [58, -100]]); ctx.fill();
  ctx.fillStyle = kleur; [[-100, -76], [-60, -70], [-20, -70], [20, -70]].forEach(([px, py]) => { ctx.beginPath(); ctx.moveTo(px - 8, py - 2); ctx.lineTo(px, py + 10); ctx.lineTo(px + 8, py - 2); ctx.closePath(); ctx.fill(); });
  poot(ctx, -70, -80, 18, kleur, '#2A2A2A', { voet: 'pootje', hoefH: 8 }); poot(ctx, 78, -80, 16, wit, '#2A2A2A', { voet: 'pootje', hoefH: 8 });
  // kop: smalle lange snuit
  ctx.fillStyle = kleur; zacht(ctx, [[78, -150], [100, -186], [126, -188], [156, -170], [190, -160], [194, -150], [164, -140], [120, -132], [92, -132]]); ctx.fill();
  ctx.fillStyle = wit; zacht(ctx, [[140, -166], [190, -160], [194, -150], [160, -142], [136, -148]]); ctx.fill(); circ(ctx, 192, -156, 5, '#1A1A1A');
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(100, -180); ctx.lineTo(96, -212); ctx.lineTo(116, -186); ctx.closePath(); ctx.fill(); ctx.fillStyle = _dk(kleur, 0.3); ctx.beginPath(); ctx.moveTo(106, -196); ctx.lineTo(96, -212); ctx.lineTo(110, -206); ctx.closePath(); ctx.fill();
  circ(ctx, 134, -168, 4.5, '#1A1410'); circ(ctx, 135, -169, 1.5, '#FFFFFF');
  ctx.restore(); }

// ---------- GEIT (wit, met baardje, horentjes, uier) ----------
function geit(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#ECE6DA', uier = 1, drachtig = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const hoef = '#3A3430', b = drachtig * 14; ctx.fillStyle = kleur;
  poot(ctx, -76, -96, 16, _dk(kleur, 0.15), hoef, { knik: -8 }); poot(ctx, 62, -96, 15, _dk(kleur, 0.15), hoef);
  ctx.fillStyle = kleur; zacht(ctx, [[-100, -150], [-60, -164], [30, -162], [80, -168], [96, -140], [88, -104], [40, -96 + b * 0.2], [-20, -94 - 0 + b], [-80, -100], [-104, -122]]); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-98, -154); ctx.lineTo(-112, -170); ctx.lineTo(-100, -146); ctx.closePath(); ctx.fill();
  if (uier > 0.01) { ctx.save(); ctx.globalAlpha *= uier; ctx.beginPath(); ctx.ellipse(-58, -92, 18, 12, 0, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); ctx.restore(); }
  poot(ctx, -62, -96, 16, kleur, hoef, { knik: -8 }); poot(ctx, 76, -96, 15, kleur, hoef);
  ctx.fillStyle = kleur; zacht(ctx, [[72, -160], [96, -200], [118, -214], [140, -200], [150, -176], [142, -162], [120, -168], [100, -150]]); ctx.fill();
  ctx.fillStyle = _dk(kleur, 0.25); ctx.beginPath(); ctx.moveTo(140, -168); ctx.lineTo(136, -140); ctx.lineTo(128, -166); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#B8A890'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(112, -212); ctx.quadraticCurveTo(100, -236, 86, -238); ctx.stroke();
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(100, -204, 14, 6, -0.6, 0, 6.283); ctx.fill(); circ(ctx, 126, -198, 4, '#1A1612');
  ctx.restore(); }

// ---------- VARKEN (roze, krulstaartje; staart: 1 = heel, 0.4 = gecoupeerd, wond: 0..1) ----------
function varken(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#F0B4A8', staart = 1, wond = 0, wroet = 0, hangStaart = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const hoef = '#8A5A50', w = Math.sin(t * 5) * 4 * wroet;
  poot(ctx, -70, -70, 20, _dk(kleur, 0.15), hoef); poot(ctx, 66, -70, 20, _dk(kleur, 0.15), hoef);
  // staart
  if (staart > 0.01) { ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-112, -118);
    if (hangStaart > 0.5) { ctx.quadraticCurveTo(-122, -100, -120, -100 + 40 * staart); } else { const L = 26 * staart; ctx.bezierCurveTo(-132, -128, -140, -128 + L * 0.2, -132, -118 + L * 0.3); if (staart > 0.6) ctx.bezierCurveTo(-124, -110, -138, -104, -142, -112); } ctx.stroke();
    if (wond > 0.01) { const ex = hangStaart > 0.5 ? -120 : -136, ey = hangStaart > 0.5 ? -100 + 40 * staart : -122 + 26 * staart * 0.3; circ(ctx, ex, ey, 6 * wond, '#C0392B'); } }
  ctx.fillStyle = kleur; zacht(ctx, [[-114, -110], [-90, -146], [-10, -156], [70, -150], [108, -126], [114, -96], [90, -70], [-30, -64], [-100, -72], [-118, -90]]); ctx.fill();
  poot(ctx, -52, -70, 20, kleur, hoef); poot(ctx, 84, -70, 20, kleur, hoef);
  // kop en snuit
  ctx.save(); ctx.translate(0, w); ctx.fillStyle = kleur; zacht(ctx, [[90, -144], [130, -150], [158, -126], [170, -104], [160, -92], [120, -90], [96, -104]]); ctx.fill();
  roundRect(ctx, 160, -122, 22, 32, 10); ctx.fillStyle = _dk(kleur, 0.12); ctx.fill(); circ(ctx, 172, -112, 3, '#8A5A50'); circ(ctx, 172, -100, 3, '#8A5A50');
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(110, -146); ctx.lineTo(128, -176); ctx.lineTo(140, -142); ctx.closePath(); ctx.fill(); ctx.fillStyle = _dk(kleur, 0.18); ctx.beginPath(); ctx.moveTo(118, -150); ctx.lineTo(128, -170); ctx.lineTo(134, -148); ctx.closePath(); ctx.fill();
  circ(ctx, 142, -124, 4, '#1A1612'); ctx.restore();
  ctx.restore(); }

// ---------- SCHAAP (wolbol) ----------
function schaapDg(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, wol = '#ECE6D8', kop = '#2E2A26' } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  poot(ctx, -50, -60, 12, '#2E2A26', '#1A1612'); poot(ctx, 50, -60, 12, '#2E2A26', '#1A1612');
  ctx.fillStyle = wol; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * 72, -112 + Math.sin(an) * 40, 26, 0, 6.283); ctx.fill(); } ctx.beginPath(); ctx.ellipse(0, -112, 76, 46, 0, 0, 6.283); ctx.fill();
  poot(ctx, -34, -60, 12, kop, '#1A1612'); poot(ctx, 66, -60, 12, kop, '#1A1612');
  ctx.fillStyle = kop; zacht(ctx, [[70, -140], [104, -156], [124, -132], [116, -112], [90, -112]]); ctx.fill(); ctx.beginPath(); ctx.ellipse(84, -146, 16, 6, -0.5, 0, 6.283); ctx.fill(); circ(ctx, 104, -138, 3, '#F2EEE6');
  ctx.restore(); }

// ---------- KIP ----------
function kip(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, kleur = '#E8DFCC', dood = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  if (dood > 0.5) ctx.globalAlpha *= 0.55;
  ctx.strokeStyle = '#D8A040'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -34); ctx.lineTo(-10, 0); ctx.moveTo(8, -34); ctx.lineTo(10, 0); ctx.stroke();
  ctx.fillStyle = kleur; zacht(ctx, [[-50, -70], [-30, -84], [20, -80], [40, -96], [52, -110], [62, -96], [50, -60], [20, -34], [-30, -36], [-56, -50]]); ctx.fill();
  ctx.fillStyle = _dk(kleur, 0.12); zacht(ctx, [[-60, -76], [-74, -104], [-50, -86]]); ctx.fill();
  ctx.fillStyle = '#C0392B'; zacht(ctx, [[44, -110], [48, -122], [54, -114], [58, -124], [62, -110]]); ctx.fill(); ctx.beginPath(); ctx.ellipse(60, -88, 4, 7, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#E0A43A'; ctx.beginPath(); ctx.moveTo(62, -102); ctx.lineTo(74, -98); ctx.lineTo(62, -94); ctx.closePath(); ctx.fill();
  if (dood > 0.5) { kruisje(ctx, 50, -100, 6, '#1A1612'); } else circ(ctx, 52, -100, 3, '#1A1612');
  ctx.restore(); }
function kruisje(ctx, x, y, r, col) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); }

// ---------- kleine voorwerpen ----------
// telefoon met melding
function telefoon(ctx, x, y, s = 1, a = 1, melding = '', u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -130, 140, 260, 20); shape(ctx, '#1C2230', '#5A6478', 3); roundRect(ctx, -60, -114, 120, 228, 10); shape(ctx, '#26324A', null);
  if (melding && u > 0.01) { ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, -54, -96 + (1 - u) * -20, 108, 70, 10); shape(ctx, '#F2EEE4', null); ctx.font = fTekst(15, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, melding, -46, -72, 92, 18); ctx.restore(); }
  ctx.restore(); }
// sensor (halsband met kastje)
function halsband(ctx, x, y, s = 1, a = 1, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#3A6EA5'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 0, 16, 36, 0.3, 0, 6.283); ctx.stroke(); roundRect(ctx, -12, 26, 24, 22, 4); shape(ctx, '#E0B64A', '#F2D27A', 1.5); if (puls > 0.01) { ctx.strokeStyle = rgba(C.goud, puls); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 37, 20 + puls * 18, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// stethoscoopkop met geluidsgolfjes (stil = 0 golfjes)
function luisteren(ctx, x, y, a = 1, golf = 1, t = 0, tekst = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 16, '#9AA3B2', '#D4D8DE', 3);
  if (golf > 0.01) { ctx.strokeStyle = rgba(C.goud, golf); ctx.lineWidth = 3; for (let i = 1; i <= 3; i++) { const r = 24 + i * 16 + ((t * 30) % 16); ctx.beginPath(); ctx.arc(x, y, r, -0.7, 0.7); ctx.stroke(); } }
  if (tekst) tag(ctx, tekst, x + 140, y + 14, C.goud, 1, 'center', 26); ctx.restore(); }
// tablet (pil) met breuklijn; half = 0..1 (helft weg)
function tablet(ctx, x, y, r, a = 1, half = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); if (half > 0.5) ctx.arc(x, y, r, Math.PI / 2, Math.PI * 1.5); else ctx.arc(x, y, r, 0, 6.283); ctx.closePath(); shape(ctx, '#F2F2EE', '#B8C0CC', 2); ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke(); ctx.restore(); }
// gewone hartslag-kaart: rij soorten met waarde en een balkje
function hartTabel(ctx, x, y, rijen, a = 1, nu = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  rijen.forEach(([naam, waarde, frac, col], i) => { const f = clamp(nu * rijen.length - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const yy = y + i * 86;
    regel(ctx, naam, x, yy, 1, C.text, 34, 'left', 600); roundRect(ctx, x + 220, yy - 30, 560, 36, 10); shape(ctx, '#2A3446', null); roundRect(ctx, x + 220, yy - 30, 560 * frac, 36, 10); shape(ctx, rgba(col, 0.7), col, 2); regel(ctx, waarde, x + 800, yy, 1, col, 32, 'left', 700); ctx.restore(); }); ctx.restore(); }

// ---------- arm/poot met homologe botten (mens, hond, paard) ----------
// kleur: opperarm goud, spaakbeen/ellepijp teal, pols/middenhand koraal, vingers paars. h = hoogte in px.
function armBotten(ctx, soort, x, y, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const k = h / 400; ctx.scale(k, k);
  const bot = (x1, y1, x2, y2, w, col, f) => { if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); circ(ctx, x1, y1, w * 0.7, col); circ(ctx, x2, y2, w * 0.7, col); ctx.restore(); };
  const F = (i) => clamp(u * 4 - i, 0, 1);
  if (soort === 'mens') { bot(0, 0, 0, 150, 24, C.goud, F(0)); bot(-8, 160, -14, 290, 14, C.teal, F(1)); bot(10, 160, 14, 290, 14, C.teal, F(1)); bot(0, 300, 0, 330, 20, C.koraal, F(2)); [-24, -10, 4, 18, 30].forEach((dx, i) => bot(dx * 0.6, 336, dx * (i === 0 ? 1.8 : 1.1), 400, 7, C.paars, F(3))); }
  if (soort === 'hond') { bot(0, 0, 20, 130, 22, C.goud, F(0)); bot(20, 140, 6, 270, 13, C.teal, F(1)); bot(30, 140, 18, 270, 11, C.teal, F(1)); bot(12, 280, 18, 320, 16, C.koraal, F(2)); [-8, 4, 16, 28].forEach(dx => bot(18 + dx * 0.4, 326, 30 + dx, 392, 7, C.paars, F(3))); }
  if (soort === 'paard') { bot(0, 0, 30, 100, 26, C.goud, F(0)); bot(30, 110, 22, 230, 18, C.teal, F(1)); bot(22, 240, 22, 262, 18, C.koraal, F(2)); bot(22, 272, 22, 360, 14, C.koraal, F(2)); bot(22, 370, 26, 396, 12, C.paars, F(3)); ctx.save(); ctx.globalAlpha *= F(3); roundRect(ctx, 8, 390, 40, 14, 4); ctx.fillStyle = '#3A3430'; ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- schema's ----------
// kalender/klok van 21 dagen met een smal tochtvak; p = positie 0..1 van de wijzer
function cyclusKlok(ctx, x, y, r, a = 1, p = 0, o = {}) { const { dagen = 21, tocht = [0, 0.5], label = 'tochtig' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#22304C', C.line, 2); for (let d = 0; d < dagen; d++) { const an = -Math.PI / 2 + d / dagen * 6.283; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 14), y + Math.sin(an) * (r - 14)); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); }
  const a0 = -Math.PI / 2 + tocht[0] / dagen * 6.283, a1 = -Math.PI / 2 + tocht[1] / dagen * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 4, a0, a1 + 0.04); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fill();
  const an = -Math.PI / 2 + p * 6.283; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 24), y + Math.sin(an) * (r - 24)); ctx.stroke(); circ(ctx, x, y, 8, C.goud);
  regel(ctx, dagen + ' dagen', x, y + r + 44, 1, C.text2, 28, 'center', 600); ctx.restore(); }
// staafjes: stappen per dag, met piek op dag 'piek'
function stappenStaaf(ctx, x, y, w, h, a = 1, nu = 1, piek = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14, bw = w / n;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < n; i++) { const f = clamp(nu * n - i, 0, 1); if (f <= 0) continue; const v = i === piek ? 1 : 0.28 + hash(i * 4.1) * 0.08; const bh = h * v * f; roundRect(ctx, x + i * bw + 4, y - bh, bw - 8, bh, 4); shape(ctx, i === piek ? C.koraal : rgba(C.teal, 0.7), null); }
  metaText(ctx, 'STAPPEN PER DAG', x, y + 36, C.text2, 'left', 20); ctx.restore(); }
// rietje sperma
function rietje(ctx, x, y, s = 1, a = 1, rot = 0, col = '#5BA4C9') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -70, -6, 140, 12, 6); shape(ctx, col, _lt(col, 0.3), 1.5); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-70, -6, 14, 12); ctx.restore(); }
// vat met vloeibare stikstof (damp)
function stikstofVat(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -220, 180, 220, 30); shape(ctx, '#8A96A8', '#C4CCD8', 2); roundRect(ctx, -40, -250, 80, 40, 10); shape(ctx, '#6A7688', '#C4CCD8', 2);
  for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i * 0.2) % 1; ctx.fillStyle = `rgba(230,240,255,${0.35 * (1 - ph)})`; ctx.beginPath(); ctx.arc(-20 + i * 10 + Math.sin(ph * 6 + i) * 12, -260 - ph * 90, 14 + ph * 16, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// echoscherm met kegel; vrucht met kloppend hartje
function echoScherm(ctx, x, y, w, h, a = 1, t = 0, vrucht = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 16, y - 16, w + 32, h + 32, 14); shape(ctx, '#2A2E36', '#5A6070', 2); roundRect(ctx, x, y, w, h, 6); shape(ctx, '#05070A', null);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x + w / 2, y + 14); ctx.arc(x + w / 2, y + 14, h * 0.92, Math.PI / 2 - 0.65, Math.PI / 2 + 0.65); ctx.closePath(); ctx.clip();
  for (let i = 0; i < 900; i++) { const px = x + hash(i * 1.3) * w, py = y + hash(i * 2.7) * h; ctx.fillStyle = `rgba(200,205,210,${0.06 + hash(i * 5.3) * 0.18})`; ctx.fillRect(px, py, 2, 2); }
  const cx = x + w / 2, cy = y + h * 0.58; ctx.fillStyle = '#05070A'; ctx.beginPath(); ctx.ellipse(cx, cy, w * 0.22, h * 0.17, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = 'rgba(220,225,230,0.6)'; ctx.lineWidth = 3; ctx.stroke();
  if (vrucht > 0.01) { ctx.globalAlpha *= vrucht; ctx.fillStyle = 'rgba(220,225,230,0.75)'; ctx.beginPath(); ctx.ellipse(cx - 10, cy + 6, w * 0.08, h * 0.05, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(cx + w * 0.07, cy - 6, h * 0.045, 0, 6.283); ctx.fill();
    const hb = 0.5 + 0.5 * Math.max(0, Math.sin(t * 13)); circ(ctx, cx - 4, cy + 2, 4 + hb * 4, `rgba(255,255,255,${0.5 + hb * 0.5})`); }
  ctx.restore(); ctx.restore(); }
// kalf in de baarmoeder: 'voor' = voorpoten + kop naar buiten (zolen omlaag), 'achter' = achterpoten (zolen omhoog)
function kalfLigging(ctx, x, y, s, ligging = 'voor', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 140, 0, 0, 6.283); shape(ctx, rgba('#C98A7A', 0.25), '#C98A7A', 3); ctx.beginPath(); ctx.moveTo(220, -30); ctx.lineTo(320, -24); ctx.moveTo(220, 30); ctx.lineTo(320, 24); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 3; ctx.stroke();
  const k = '#A8784E'; ctx.fillStyle = k;
  if (ligging === 'voor') { zacht(ctx, [[-170, -40], [-60, -80], [60, -60], [120, -20], [110, 40], [-20, 70], [-160, 50]]); ctx.fill(); zacht(ctx, [[110, -40], [190, -36], [220, -12], [196, 10], [120, 10]]); ctx.fill(); circ(ctx, 180, -24, 5, '#1A1410');
    ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(100, 20); ctx.lineTo(240, 18); ctx.moveTo(100, 40); ctx.lineTo(250, 34); ctx.stroke(); ctx.fillStyle = '#3A3430'; roundRect(ctx, 238, 8, 22, 20, 4); ctx.fill(); roundRect(ctx, 248, 24, 22, 20, 4); ctx.fill(); }
  else { zacht(ctx, [[170, -40], [60, -80], [-60, -60], [-120, -20], [-110, 40], [20, 70], [160, 50]]); ctx.fill(); zacht(ctx, [[-110, -40], [-190, -36], [-220, -12], [-196, 10], [-120, 10]]); ctx.fill(); circ(ctx, -180, -24, 5, '#1A1410');
    ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -30); ctx.lineTo(240, -18); ctx.moveTo(150, -10); ctx.lineTo(250, -2); ctx.stroke(); ctx.fillStyle = '#3A3430'; roundRect(ctx, 238, -32, 22, 20, 4); ctx.fill(); roundRect(ctx, 248, -16, 22, 20, 4); ctx.fill(); ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(150, -30); ctx.lineTo(196, -24); ctx.stroke(); ctx.strokeStyle = '#F2D27A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(196, -24, 16, 0, 6.283); ctx.stroke(); ctx.strokeStyle = '#D8826A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(40, 60); ctx.quadraticCurveTo(80, 120, 140, 128); ctx.stroke(); }
  ctx.restore(); }
// virus met spikes (sleutel) en cel met receptoren (slot); past = true/false
function virusDg(ctx, x, y, r, a = 1, col = C.koraal, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283 + t * 0.2; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * (r + 14), y + Math.sin(an) * (r + 14)); ctx.stroke(); circ(ctx, x + Math.cos(an) * (r + 16), y + Math.sin(an) * (r + 16), 5, col); } circ(ctx, x, y, r, rgba(col, 0.35), col, 3); ctx.restore(); }
// celoppervlak (stukje van een cirkel) met receptoren; vorm 'rond' of 'hoek'
function celRand(ctx, cx, cy, R, an0, an1, vorm, a = 1, col = C.teal, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, R, an0, an1); ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, R - 14, an0, an1); ctx.strokeStyle = rgba(col, 0.4); ctx.lineWidth = 6; ctx.stroke();
  for (let k = 0; k < 5; k++) { const an = an0 + (k + 0.5) / 5 * (an1 - an0), px = cx + Math.cos(an) * (R + 6), py = cy + Math.sin(an) * (R + 6); ctx.save(); ctx.translate(px, py); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = C.goud; if (vorm === 'rond') { ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(-12, -22); ctx.arc(0, -22, 12, Math.PI, 0, true); ctx.lineTo(12, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.arc(0, -24, 6, 0, 6.283); ctx.fill(); } else { ctx.fillRect(-12, -26, 24, 26); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.moveTo(-6, -26); ctx.lineTo(0, -16); ctx.lineTo(6, -26); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
// staafgrafiek in een paneel: waarden 0..1, labels onder
function staafGrafiek(ctx, x, y, w, h, waarden, labels, a = 1, nu = 1, col = C.koraal, titel = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = waarden.length, bw = w / n;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  waarden.forEach((v, i) => { const f = clamp(nu * n - i, 0, 1); if (f <= 0) return; const bh = h * v * f; roundRect(ctx, x + i * bw + bw * 0.18, y - bh, bw * 0.64, bh, 6); shape(ctx, rgba(Array.isArray(col) ? col[i] : col, 0.75), Array.isArray(col) ? col[i] : col, 2); if (labels[i]) regel(ctx, labels[i], x + i * bw + bw / 2, y + 36, 1, C.text2, 24, 'center', 600); });
  if (titel) metaText(ctx, titel, x, y - h - 20, C.text2, 'left', 20); ctx.restore(); }
// kaartje met kopje (voor rijtjes oorzaken/maatregelen)
function kaartje(ctx, x, y, w, s2, col = C.teal, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const h = px + 40; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + h / 2 + px * 0.35, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
// stal: eenvoudige schuur met dak (achtergrond)
function stal(ctx, x, y, w, h, a = 1, o = {}) { const { kleur = '#3A4660', dak = '#2A3348' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kleur; ctx.fillRect(x, y - h, w, h); ctx.fillStyle = dak; ctx.beginPath(); ctx.moveTo(x - 30, y - h); ctx.lineTo(x + w / 2, y - h - h * 0.45); ctx.lineTo(x + w + 30, y - h); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 2; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 12, y - h); ctx.lineTo(x + i * w / 12, y); ctx.stroke(); } ctx.restore(); }
// grondlijn met stro
function stro(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(201,163,92,0.35)'; ctx.fillRect(x, y, w, 24); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 2; for (let i = 0; i < w / 9; i++) { const px = x + hash(i * 1.7) * w, an = hash(i * 3.3) * 1.4 - 0.7; ctx.beginPath(); ctx.moveTo(px, y + 4 + hash(i) * 16); ctx.lineTo(px + Math.cos(an) * 22, y + 4 + hash(i) * 16 + Math.sin(an) * 8); ctx.stroke(); } ctx.restore(); }
