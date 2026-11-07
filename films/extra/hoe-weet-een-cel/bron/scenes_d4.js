// scenes_d4.js — animator 4: s66–s94 (8 Vastzetten, 9 Kan de knikker terug?, 10 Terug naar de lens). Bouwt op SBW4 (kf/sbw4.js).
// Cues via q.on(woord, n, duur) op de woordtijden van Roos. Achtergrond micro zonder korrel (Kamiel: korrel stoort).

function _d4bg(ctx, look) { if (look === 'micro') { bg(ctx, 'schema'); ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } else bg(ctx, look); }
const _d4U = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const _d4Back = (u) => { u = clamp(u, 0, 1); const s = 1.9; return 1 + (s + 1) * Math.pow(u - 1, 3) + s * Math.pow(u - 1, 2); }; // klik met lichte overshoot
function _d4A(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function _d4Ring(ctx, x, y, r, a = 1, col = C.goud, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function _d4Knikker(ctx, x, y, a = 1, stip = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 18, 0, 6.283);
  if (stip) { ctx.setLineDash([6, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } else { ctx.fillStyle = C.goud; ctx.fill(); ctx.strokeStyle = '#8A6510'; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); }

// ---------- pad door het landschap (zelfde bezier als landschap()) ----------
function _d4Bez(a, b, v) { const x0 = a.x, y0 = a.y, x1 = b.x, y1 = b.y, my = (y0 + y1) / 2, u = v;
  return [(1 - u) ** 3 * x0 + 3 * (1 - u) ** 2 * u * x0 + 3 * (1 - u) * u * u * x1 + u ** 3 * x1, (1 - u) ** 3 * y0 + 3 * (1 - u) ** 2 * u * my + 3 * (1 - u) * u * u * my + u ** 3 * y1]; }
// namen = knopen van begin naar eind; eind = deel van het laatste stuk dat wordt afgelegd. Geeft polyline.
function _d4Keten(L, namen, eind = 1) { const K = namen.map(n => L.knopen.find(k => k.b.n === n)); const P = [];
  for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1], f = i === K.length - 2 ? eind : 1;
    for (let s = (i ? 1 : 0); s <= 30; s++) { const v = s / 30 * f; P.push(b.ouder === a ? _d4Bez(a, b, v) : _d4Bez(b, a, 1 - v)); } }
  const D = [0]; for (let i = 1; i < P.length; i++) D.push(D[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return { P, D, L: D[D.length - 1] }; }
function _d4KetenPunt(k, u) { const d = clamp(u, 0, 1) * k.L; let i = 1; while (i < k.D.length - 1 && k.D[i] < d) i++; const f = (d - k.D[i - 1]) / ((k.D[i] - k.D[i - 1]) || 1);
  return [lerp(k.P[i - 1][0], k.P[i][0], f), lerp(k.P[i - 1][1], k.P[i][1], f)]; }
function _d4KetenSpoor(ctx, k, u0, u1, col = C.goud, lw = 5, dash = [14, 14], a = 1) { if (a <= 0.01 || u1 <= u0) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60; for (let i = 0; i <= n; i++) { const p = _d4KetenPunt(k, lerp(u0, u1, i / n)); i ? ctx.lineTo(p[0], p[1] - 14) : ctx.moveTo(p[0], p[1] - 14); } ctx.stroke(); ctx.restore(); }

// ---------- lapjeskat met vlekken die groeien (vk 0..1) en dimmen (va); hergebruikt twee canvassen ----------
let _d4KC = null;
function _d4Kat(ctx, x, y, s, houding = 'zitten', o = {}) { const vk = o.vlek ?? 1, va = o.va ?? 1, kijk = o.kijk ?? 1;
  if (!_d4KC) { _d4KC = [0, 1].map(() => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; }); }
  const [c1, c2] = _d4KC, g1 = c1.getContext('2d'), g2 = c2.getContext('2d');
  for (const g of [g1, g2]) { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.clearRect(0, 0, W, H); }
  _katWrap(g1, _w4KatWit(), x, y, s * 8.8, { houding, kijk });
  if (vk > 0.01 && va > 0.01) { g2.globalAlpha = va; for (const [u, v, rx, ry, k, sd] of _W4_VLEK[houding]) { blob(g2, x + u * s * kijk, y + v * s, rx * s * vk, ry * s * vk, 0.22, sd); g2.fillStyle = k === 'o' ? _W4.oranje : _W4.zwart; g2.fill(); }
    g2.globalAlpha = 1; g2.globalCompositeOperation = 'destination-in'; g2.drawImage(c1, 0, 0); g1.globalCompositeOperation = 'multiply'; g1.drawImage(c2, 0, 0); }
  ctx.save(); ctx.globalAlpha *= o.a ?? 1; ctx.drawImage(c1, 0, 0); ctx.restore(); }

// ---------- celdeling: d 0 = één cel, 1 = twee dochtercellen naast elkaar ----------
function _d4Deling(ctx, cx, cy, d, o = {}) { const r = lerp(150, 125, d), dx = lerp(0, 122, ease(d)), aan = o.aan || [1, 3];
  ctx.save(); ctx.beginPath(); ctx.arc(cx - dx, cy, r, 0, 6.283); ctx.arc(cx + dx, cy, r, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.18); ctx.fill('nonzero');
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, r * 0.06); const a = dx < r ? Math.acos(dx / r) : 0;
  ctx.beginPath(); ctx.arc(cx + dx, cy, r, -(Math.PI - a), Math.PI - a); ctx.stroke(); ctx.beginPath(); ctx.arc(cx - dx, cy, r, a, 6.283 - a); ctx.stroke();
  const kd = lerp(0, 122, ease(clamp((d - 0.15) / 0.6, 0, 1)));
  for (const k of (kd < 1 ? [0] : [-1, 1])) { const kx = cx + k * kd; ctx.beginPath(); ctx.arc(kx, cy, 58, 0, 6.283); shape(ctx, rgba(C.paars, 0.6), C.kernR, 2); _w4GenRij(ctx, kx, cy, 96, aan, 4); }
  ctx.restore(); }

// ---------- 8 · oogbeker met lens ----------
function _d4Oog(ctx, t, q) { const cx = 520, cy = 520;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 270, 0.75, 5.53); ctx.arc(cx + 40, cy, 180, 5.45, 0.83, true); ctx.closePath(); shape(ctx, rgba(C.teal, 0.28), C.teal, 2.5); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 270, 0.75, 5.53); ctx.arc(cx, cy, 246, 5.53, 0.75, true); ctx.closePath(); shape(ctx, '#3E3550', '#6A5E7E', 1.5); ctx.restore();
  for (let i = 0; i < 26; i++) { const an = 0.85 + i / 25 * (5.43 - 0.85); ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx + 40 + Math.cos(an) * 182, cy + Math.sin(an) * 182); ctx.lineTo(cx + Math.cos(an) * 244, cy + Math.sin(an) * 244); ctx.stroke(); }
  // lens: de cellen in de achterwand rekken uit ('allang geen blaasje meer')
  const lx = 770, ly = 520, lr = 125, rek = ramp(t, q.at('oogblaasje'), 2.0);
  ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 6.283); shape(ctx, rgba(C.teal, 0.2), C.teal, 2.5);
  for (let i = 0; i < 18; i++) { const an = i / 18 * 6.283; const r0 = (Math.cos(an) < -0.3) ? lerp(lr - 34, 20, rek) : lr - 34; ctx.strokeStyle = rgba(C.teal, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx + Math.cos(an) * r0, ly + Math.sin(an) * r0); ctx.lineTo(lx + Math.cos(an) * lr, ly + Math.sin(an) * lr); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(lx, ly, lr - 34, -1.25, 1.25); ctx.strokeStyle = rgba(C.teal, 0.55); ctx.lineWidth = 1.5; ctx.stroke();
  return [lx, ly, lr]; }

// ---------- 8 · terugkoppeling ----------
const _D4LUS = [[1150, 300], [1000, 210], [800, 260], [780, 470]];
function _d4LusPunt(u) { return _d4bez(_D4LUS[0], _D4LUS[1], _D4LUS[2], _D4LUS[3], u); }
function _d4bez(p0, p1, p2, p3, u) { const v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]]; }

// ---------- 8 · slotjes ----------
const _D4MX = [[1110, -1], [1230, 1], [1340, -1], [1450, 1], [1560, -1], [1650, 1]];
function _d4Rij(ctx, y, R, o = {}) { const a = o.a ?? 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  nucleosoomDraad(ctx, 170, y, 800, y, { n: 4, R, los: 0.15 });
  dnaDraad(ctx, [[790, y], [900, y + 4], [1010, y]], { w: Math.max(6, R * 0.34) });
  const cp = o.compact ?? 1; nucleosoomDraad(ctx, lerp(1000, 1060, 0), y, 1720, y, { n: 7, R, compact: cp });
  _D4MX.forEach(([mx, k], i) => { const p = o.pop ? o.pop(i) : 1; if (p <= 0.01) return; const yy = y + k * R * lerp(1.6, 0.95, clamp(p, 0, 1));
    ctx.save(); ctx.globalAlpha *= clamp(p * 1.5, 0, 1); _w4Methyl(ctx, mx, yy, R * 0.26 * Math.max(0.05, p), k < 0 ? -Math.PI / 2 : Math.PI / 2); ctx.restore(); });
  ctx.restore(); }

// ---------- 8 · raam met kat ----------
function _d4Raam(ctx) { roundRect(ctx, 130, 140, 760, 500, 6); shape(ctx, '#2A3F63', null);
  ctx.save(); roundRect(ctx, 130, 140, 760, 500, 6); ctx.clip(); ctx.beginPath(); ctx.moveTo(130, 520); ctx.bezierCurveTo(330, 440, 560, 470, 890, 500); ctx.lineTo(890, 640); ctx.lineTo(130, 640); ctx.closePath(); ctx.fillStyle = C.bgMacroHill; ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#B9B2A4'; ctx.lineWidth = 14; roundRect(ctx, 130, 140, 760, 500, 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(510, 140); ctx.lineTo(510, 640); ctx.stroke();
  roundRect(ctx, 90, 636, 840, 34, 6); shape(ctx, '#B9AE98', '#8C8270', 2); }
function _d4XS(ctx, x, y, L, s, band, a = 1) { if (a <= 0.01 || s <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); _w4X(ctx, x, y, L, band); ctx.restore(); }

// ---------- 8 · embryo van 16 cellen ----------
const _D4KL = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0]; // 1 = oranje X uitgeschakeld
function _d4EmbryoPos(cx, cy, R) { const P = []; for (let i = 0; i < 11; i++) { const an = i / 11 * 6.283 + 0.2; P.push([cx + Math.cos(an) * R * 0.68, cy + Math.sin(an) * R * 0.68]); }
  for (let i = 0; i < 4; i++) { const an = i / 4 * 6.283 + 0.6; P.push([cx + Math.cos(an) * R * 0.27, cy + Math.sin(an) * R * 0.27]); } P.push([cx, cy]); return P; }
// uit(i) 0..1 = X-inactivatie in cel i; tint 0..1 = cel kleurt naar de X die aan blijft
function _d4Embryo(ctx, cx, cy, R, uit, tint = 0) { circ(ctx, cx, cy, R + 16, null, rgba('#C9CED6', 0.45), 14); const P = _d4EmbryoPos(cx, cy, R);
  P.forEach(([x, y], i) => { circ(ctx, x, y, R * 0.29, '#33405A', C.line, 2); if (tint > 0.01) _d4A(ctx, tint, () => circ(ctx, x, y, R * 0.29, _D4KL[i] ? rgba('#3A3632', 0.95) : rgba(_W4.oranje, 0.55))); });
  P.forEach(([x, y], i) => { circ(ctx, x, y, R * 0.11, rgba(C.paars, 0.7), C.kernR, 1.5); const u = ease(uit(i)), an = hash(i * 9) * 6.283;
    const bx = x + Math.cos(an) * R * 0.075, by = y + Math.sin(an) * R * 0.075, uitK = _D4KL[i] ? _W4.oranje : _W4.zwart, aanK = _D4KL[i] ? _W4.zwart : _W4.oranje;
    // de X die aan blijft: los draadje
    ctx.save(); ctx.strokeStyle = aanK === _W4.zwart ? '#C9CED6' : aanK; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); const ax = x - Math.cos(an) * R * 0.06, ay = y - Math.sin(an) * R * 0.06;
    ctx.moveTo(ax - 9, ay - 5); ctx.quadraticCurveTo(ax, ay + 9, ax + 9, ay - 4); ctx.stroke(); ctx.restore();
    // de X die uitgaat: van draadje naar compact bolletje
    if (u < 1) { ctx.save(); ctx.globalAlpha *= 1 - u; ctx.strokeStyle = uitK === _W4.zwart ? '#C9CED6' : uitK; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx - 9, by + 4); ctx.quadraticCurveTo(bx, by - 9, bx + 9, by + 5); ctx.stroke(); ctx.restore(); }
    if (u > 0.01) { blob(ctx, bx, by, 10 * u, 8 * u, 0.15, i); shape(ctx, uitK, _W4.zwartR, 1.5); } });
  return P; }

// ---------- 9 · axolotl met poot die verloren gaat en teruggroeit ----------
// o.verlies 0..1 (onderpoot valt weg), o.knop 0..1 (blastema verschijnt), o.groei 0..1 (blastema groeit uit tot poot), o.spook
function _d4Axolotl(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = _W4.huidAx, rand = _W4.huidAxR, ver = _dk(huid, 0.18);
  const lijnPad = (P) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  const poot = (P, col, lw = 22) => { ctx.strokeStyle = _dk(col, 0.25); ctx.lineWidth = lw + 4; lijnPad(P); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = lw; lijnPad(P); ctx.stroke(); };
  const tenen = (hx, hy, n, an0, col, l = 26) => { for (let i = 0; i < n; i++) { const an = an0 + (i - (n - 1) / 2) * 0.32; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + Math.cos(an) * l, hy + Math.sin(an) * l); ctx.stroke(); } };
  const zw = o.zwaai || 0;
  poot([[240, 40], [222, 112], [252, 146]], ver); tenen(252, 146, 4, 0.15, ver);
  poot([[-150, 40], [-178, 108], [-142, 146]], ver); tenen(-142, 146, 5, 0.1, ver);
  const kieuw = (bx, by, ex, ey, a) => { ctx.save(); ctx.globalAlpha *= a; const n = 9; ctx.strokeStyle = _W4.kieuwL; ctx.lineWidth = 3;
    for (let i = 1; i <= n; i++) { const t = i / (n + 1), px = lerp(bx, ex, t), py = lerp(by, ey, t), an = Math.atan2(ey - by, ex - bx); const l = 22 * (1 - t * 0.5);
      for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an + k * 1.2) * l, py + Math.sin(an + k * 1.2) * l); ctx.stroke(); } }
    ctx.strokeStyle = _W4.kieuw; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo((bx + ex) / 2 + 12, (by + ey) / 2, ex, ey); ctx.stroke(); ctx.restore(); };
  kieuw(322, -70, 300 + zw * 6, -205, 0.55); kieuw(312, -52, 258 + zw * 6, -168, 0.55);
  const sw = (u) => Math.sin(zw * 2 + u * 0.01) * 0; // staart blijft rustig
  vul(ctx, [[120, -60], [-60, -84], [-240, -92], [-400, -56 + zw * 8], [-512, -6 + zw * 14], [-400, -10 + zw * 8], [-240, -30], [-60, -58]], rgba(huid, 0.55), rand, 2);
  vul(ctx, [[-130, 46], [-260, 80], [-410, 48 + zw * 8], [-512, 0 + zw * 14], [-400, 14 + zw * 8], [-260, 28]], rgba(huid, 0.55), rand, 2);
  vul(ctx, [[508, -2], [496, -46], [458, -80], [398, -94], [330, -86], [282, -70], [248, -62], [150, -64], [50, -66], [-60, -60], [-160, -50], [-280, -34], [-400, -18 + zw * 8], [-505, -4 + zw * 14], [-400, 10 + zw * 8], [-280, 22], [-160, 38], [-60, 52], [50, 58], [150, 58], [250, 58], [330, 66], [410, 62], [472, 44], [502, 18]], huid, rand, 3);
  vul(ctx, [[400, 50], [300, 58], [150, 52], [0, 50], [-120, 36], [0, 40], [150, 42], [300, 44]], _lt(huid, 0.3), null);
  kieuw(338, -62, 292 + zw * 6, -210, 1); kieuw(330, -44, 252 + zw * 6, -178, 1); kieuw(322, -26, 226 + zw * 6, -128, 1);
  circ(ctx, 432, -46, 10, '#2A1A1A'); circ(ctx, 435, -49, 3, 'rgba(255,255,255,0.8)');
  ctx.strokeStyle = _dk(rand, 0.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(503, 8); ctx.quadraticCurveTo(470, 30, 420, 22); ctx.stroke();
  poot([[-110, 46], [-142, 112], [-100, 148]], huid); tenen(-100, 148, 5, 0.1, huid);
  // voorpoot nabij
  const vl = o.verlies || 0, kn = o.knop || 0, gr = o.groei || 0;
  if (o.spook) { ctx.save(); ctx.globalAlpha *= o.spook * (1 - gr); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.text, 0.55); ctx.lineWidth = 3; lijnPad([[290, 56], [282, 118], [318, 150]]); ctx.stroke(); ctx.restore(); }
  if (vl < 1) { ctx.save(); ctx.globalAlpha *= 1 - ease(vl); ctx.translate(0, 140 * vl * vl); ctx.rotate(0.25 * vl); poot([[292, 78], [282, 118], [318, 150]], huid); tenen(318, 150, 4, 0.15, huid); ctx.restore(); }
  poot([[290, 50], [292, 80]], huid, 24);
  if (vl >= 1 && gr > 0.01) { const P = [[292, 80], [lerp(292, 282, gr), lerp(86, 118, gr)], [lerp(293, 318, gr), lerp(96, 150, gr)]]; poot(P, huid, lerp(18, 22, gr)); tenen(P[2][0], P[2][1], 4, 0.15, huid, 26 * ease((gr - 0.7) / 0.3)); }
  let bp = [293, 92 + 8 * kn]; if (vl >= 1 && kn > 0.01) { const bx = gr > 0.01 ? lerp(293, 318, gr) : 293, by = gr > 0.01 ? lerp(96, 150, gr) : 92 + 8 * kn; bp = [bx, by];
    const sc = kn * (1 - ease((gr - 0.6) / 0.4)); if (sc > 0.01) { ctx.beginPath(); ctx.ellipse(bx, by, 15 * sc, (12 + 10 * kn) * sc, 0, 0, 6.283); shape(ctx, '#F2D3CC', C.goud, 3);
      for (let i = 0; i < 7; i++) circ(ctx, bx - 7 + (i % 3) * 7, by - 6 + Math.floor(i / 3) * 7, 2.2 * sc, rgba(C.paars, 0.8)); } }
  ctx.restore(); return { blastema: [x + bp[0] * s, y + bp[1] * s] }; }
function _d4Water(ctx) { ctx.strokeStyle = rgba('#AFC0D0', 0.35); ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(120 + i * 300, 130); ctx.quadraticCurveTo(190 + i * 300, 120, 260 + i * 300, 130); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(0, 790); ctx.bezierCurveTo(500, 760, 1200, 800, 1920, 770); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fillStyle = '#2C3A44'; ctx.fill();
  for (const [px, h] of [[140, 260], [190, 190], [1780, 230]]) { ctx.strokeStyle = rgba(C.groen, 0.45); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, 790); ctx.quadraticCurveTo(px + 30, 790 - h / 2, px - 10, 790 - h); ctx.stroke(); } }

// ---------- 9 · poot in lengtedoorsnede ----------
// o.front = hoe ver de herkomstkleuren in de nieuwe poot zijn ingekleurd (0..1); o.hl = {laag: alpha}; o.wissel 0..1 = lederhuidcellen verhuizen naar het kraakbeen
function _d4Doorsnede(ctx, o = {}) { const x0 = 330, xc = 760, x1 = 1230, cy = 450;
  const lagen = [['opperhuid', C.teal, 160, 140], ['lederhuid', C.oker, 140, 108], ['spier', C.koraal, 108, 42], ['kraakbeen', _W4.kraak, 42, 0]];
  const hl = o.hl || {}, al = (n) => hl[n] ?? 1;
  const vorm = (k) => { ctx.beginPath(); ctx.moveTo(x0, cy - k); ctx.lineTo(x1 - k * 0.6, cy - k); ctx.quadraticCurveTo(x1 + k * 0.5, cy - k, x1 + k * 0.5, cy); ctx.quadraticCurveTo(x1 + k * 0.5, cy + k, x1 - k * 0.6, cy + k); ctx.lineTo(x0, cy + k); ctx.closePath(); };
  ctx.save(); vorm(160); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(x0, cy - 170, x1 - x0 + 200, 340);
  for (const [n, kl, ro] of lagen) { vorm(ro); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.globalAlpha *= al(n); vorm(ro); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }
  ctx.fillStyle = rgba(C.bgSchema, 0.72); ctx.fillRect(xc, cy - 170, 700, 340);
  const front = lerp(xc, x1 + 170, o.front ?? 1), wis = o.wissel ?? 1;
  for (const [n, kl, ro, ri] of lagen) { for (const sgn of (ri === 0 ? [0] : [-1, 1])) { const y0 = ri === 0 ? cy - ro + 12 : (sgn < 0 ? cy - ro + 11 : cy + ri + 11), y1 = ri === 0 ? cy + ro - 12 : (sgn < 0 ? cy - ri - 11 : cy + ro - 11);
    let i = 0; for (let yy = y0; yy <= y1 + 0.1; yy += 22) for (let xx = xc + 16; xx < x1 + 40; xx += 22) { i++; if (xx > front) continue; const pop = clamp((front - xx) / 60, 0, 1);
      const wisselaar = n === 'kraakbeen' && hash(i * 5.1 + yy) < 0.3;
      if (wisselaar) { if (wis <= 0.01) continue; // cel komt uit de lederhuid aanlopen
        const bron = yy < cy ? cy - 124 : cy + 124, u = ease(wis), py = lerp(bron, yy, u), px = xx + Math.sin(i) * 10 * (1 - u);
        ctx.save(); ctx.globalAlpha *= Math.max(al('lederhuid'), al('kraakbeen')) * clamp(wis * 3, 0, 1); circ(ctx, px, py, 8.5, C.oker, _dk(C.oker, 0.3), 1); ctx.restore(); continue; }
      ctx.save(); ctx.globalAlpha *= al(n); circ(ctx, xx, yy, 8.5 * pop, kl, _dk(kl, 0.3), 1); ctx.restore(); } } }
  ctx.restore(); vorm(160); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xc, cy - 200); ctx.lineTo(xc, cy + 200); ctx.stroke(); ctx.restore();
  naamBij(ctx, 'opperhuid', null, x0 - 18, cy - 138, al('opperhuid'), 'right', C.teal); naamBij(ctx, 'spier', null, x0 - 18, cy - 62, al('spier'), 'right', C.koraal);
  naamBij(ctx, 'kraakbeen', null, x0 - 18, cy + 13, al('kraakbeen'), 'right', _W4.kraak); naamBij(ctx, 'lederhuid', null, x0 - 18, cy + 138, al('lederhuid'), 'right', C.oker);
  naamBij(ctx, 'oude poot', null, (x0 + xc) / 2, cy - 200, 1, 'center'); naamBij(ctx, 'nieuwe poot', null, (xc + x1) / 2, cy - 200, 1, 'center');
  return { xc, x1, cy }; }

// ---------- 9 · kerntransplantatie ----------
// darmkern in een pipet: punt (px,py), de kern zit net achter de punt
function _d4Pipet(ctx, px, py, kern, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ex = px + 190, ey = py - 240, d = Math.hypot(ex - px, ey - py), ux = (ex - px) / d, uy = (ey - py) / d;
  if (kern > 0.01) circ(ctx, px + ux * 26, py + uy * 26, 15 * kern, rgba(C.paars, 0.95), C.goud, 3);
  _w4Naald(ctx, ex, ey, px, py, 30); ctx.restore(); }

// ---------- 10 · lensvezelcel: e 0 = ronde cel, 1 = lange vezel ----------
function _d4Vezel(ctx, e, o = {}) { const xl = lerp(850, 300, e), xr = lerp(850, 1400, e), cy = 540, r = 110, my = lerp(430, 395, e);
  const vorm = () => { ctx.beginPath(); ctx.moveTo(xl, 430); ctx.quadraticCurveTo((xl + xr) / 2, my, xr, 430); ctx.arc(xr, cy, r, -Math.PI / 2, Math.PI / 2); ctx.quadraticCurveTo((xl + xr) / 2, 1080 - my, xl, 650); ctx.arc(xl, cy, r, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); };
  vorm(); ctx.fillStyle = rgba(C.teal, lerp(0.18, 0.07, o.helder ?? 0)); ctx.fill();
  ctx.save(); vorm(); ctx.clip();
  // doorzichtige eiwitten (kralenketens) vullen de cel
  const ne = Math.round(46 * (o.eiwit ?? 0)); for (let i = 0; i < ne; i++) { const px = lerp(xl - 70, xr + 70, ((i % 23) + 0.5) / 23) + hash(i) * 14, py = 470 + Math.floor(i / 23) * 110 + hash(i + 3) * 30; _w4Kralen(ctx, px, py, 20, 9, i * 7 + 1, '#C9D6E3', 4, 0.35); }
  // kern: heel, of valt uiteen (o.af 0..1)
  const af = o.af ?? 0, kx = lerp(850, 1240, e), ky = 520;
  if (af < 0.02) { circ(ctx, kx, ky, 62, rgba(C.paars, 0.75), C.kernR, 2); }
  else for (let i = 0; i < 9; i++) { const an = hash(i * 5) * 6.283, d = lerp(10, 30 + hash(i * 5 + 1) * 70, ease(af * 1.4)), sc = 1 - ease((af - 0.45) / 0.55);
    if (sc <= 0.02) continue; blob(ctx, kx + Math.cos(an) * d, ky + Math.sin(an) * d * 0.6, (14 + hash(i) * 12) * sc, (10 + hash(i + 1) * 8) * sc, 0.3, i); ctx.fillStyle = rgba(C.paars, 0.75 - i * 0.04); ctx.fill(); }
  const org = 1 - ease(((o.org ?? 0) - 0.1) / 0.8); if (org > 0.01) for (let i = 0; i < 6; i++) { const px = lerp(kx - 190, kx + 110, hash(i * 11)), py = 470 + hash(i * 11 + 1) * 130; ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i) * 3); ctx.scale(org, org); roundRect(ctx, -16, -7, 32, 14, 7); ctx.fillStyle = rgba(C.mito, 0.55); ctx.fill(); ctx.restore(); }
  ctx.restore();
  vorm(); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke(); return { kx, ky, xl, xr }; }
function _d4Licht(ctx, u, a = 1) { if (u <= 0.01 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const xe = lerp(70, 1840, u); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(70, 600); ctx.lineTo(xe, 600); ctx.stroke(); pijl(ctx, xe - 40, 600, xe + 10, 600, '#F2F2EE', 1, 5, 20); ctx.restore(); }
function _d4LandKlein(ctx, pad, knikker, o = {}) { ctx.save(); roundRect(ctx, 1470, 110, 400, 300, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); const L = landschap(ctx, 1500, 160, 340, 200, { pad, knikker, labels: false }); metaText(ctx, 'MODEL', 1850, 395, C.text2, 'right', 26); ctx.restore(); return L; }

// ---------- 10 · Noor op de bank (w61 zonder tegels en label) ----------
function _d4Noor(ctx) { ctx.fillStyle = '#26365A'; ctx.fillRect(0, 860, W, 40);
  const bk = '#46557A', bkR = '#5E6E94'; roundRect(ctx, 220, 450, 1000, 220, 30); shape(ctx, bk, bkR, 2);
  const nx = 900; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 668); ctx.clip(); persoon(ctx, 'noor', nx, 925, 640, { uit: 'blij' }); ctx.restore();
  _d4Kat(ctx, 520, 668, 0.95, 'liggen');
  roundRect(ctx, 220, 640, 1000, 90, 22); shape(ctx, _lt(bk, 0.08), bkR, 2);
  roundRect(ctx, 170, 520, 90, 240, 26); shape(ctx, _dk(bk, 0.1), bkR, 2); roundRect(ctx, 1180, 520, 90, 240, 26); shape(ctx, _dk(bk, 0.1), bkR, 2);
  ctx.fillStyle = _dk(bk, 0.3); ctx.fillRect(250, 760, 26, 100); ctx.fillRect(1164, 760, 26, 100);
  const P = CAST.noor; ctx.fillStyle = P.broek; [-42, 42].forEach(d => { roundRect(ctx, nx + d - 30, 650, 60, 70, 24); ctx.fill(); roundRect(ctx, nx + d - 24, 710, 48, 140, 18); ctx.fill(); roundRect(ctx, nx + d - 30, 836, 62, 28, 12); shape(ctx, P.schoen, P.schoenAccent, 2); });
  ctx.save(); ctx.beginPath(); ctx.moveTo(nx - 120, 655); ctx.lineTo(nx + 120, 655); ctx.lineTo(nx + 100, 540); ctx.lineTo(nx - 100, 540); ctx.closePath(); shape(ctx, '#3A4458', '#5A6478', 2); ctx.restore();
  roundRect(ctx, nx - 130, 650, 260, 16, 5); shape(ctx, '#4A5468', '#5A6478', 1.5); }
const _D4OOG = [922, 364]; // oog van Noor in w61 (gemeten op de still)

// ---------- landschap van w58 (iets hoger, zodat er ruimte is onder de dalen) ----------
const _D4BOOM58 = { n: 'bevruchte eicel', k: [{ n: 'placenta' }, { n: 'embryo', k: [{ n: 'ectoderm', k: [{ n: 'zenuwcel' }, { n: 'lens' }] }, { n: 'mesoderm', k: [{ n: 'bindweefsel' }, { n: 'spier' }] }, { n: 'endoderm', k: [{ n: 'darm' }, { n: 'lever' }] }] }] };
function _d4Land58(ctx, o = {}) { return landschap(ctx, 140, 200, 1240, 520, { boom: _D4BOOM58, pad: ['embryo'], knikkerTonen: false, dim: o.dim }); }
function _d4Land60(ctx) { return landschap(ctx, 150, 220, 1250, 540, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikkerTonen: false }); }
const _D4PAD60 = ['bevruchte eicel', 'embryo', 'ectoderm', 'huid en lens', 'lens'];
function _d4Tegels(ctx, n, actief, fade = 1, x = 1530, y = 280) { // tegel n verschijnt met fade
  const T = ['positie', 'signaal', 'gevoeligheid', 'geheugen'];
  for (let i = 0; i < 4; i++) { const yy = y + i * 96, zicht = i < n, nieuw = i === n - 1, a = zicht ? (nieuw ? fade : 1) : 0;
    ctx.save(); ctx.globalAlpha *= lerp(0.25, 1, a); const act = i === actief;
    roundRect(ctx, x, yy, 300, 76, 14); shape(ctx, act ? rgba(C.goud, 0.18 * a) : rgba(C.fill, 0.7), act ? C.goud : C.line, 2);
    text(ctx, a > 0.5 ? T[i] : '?', x + 150, yy + 50, fTekst(38, 700), act ? C.goud : C.text, 'center'); ctx.restore(); } }

function _d4Vier(ctx, t, q, i, c) { _d4bg(ctx, 'schema'); difLabel(ctx, 'MODEL');
    const L = _d4Land60(ctx), K = _d4Keten(L, _D4PAD60, 1); const lens = L.knopen.find(k => k.b.n === 'lens');
    const geh = i === 3 ? 0.5 + 0.5 * Math.sin(t * 4) : 0; _d4KetenSpoor(ctx, K, 0, 1, C.goud, 4 + 3 * geh * ramp(t, 0.4, 0.5), [12, 12]);
    const [kx, ky] = _d4KetenPunt(K, 1); _d4Knikker(ctx, kx, ky - 14); metaText(ctx, '→ LENSVEZEL', lens.x, lens.y + 90, C.goud, 'center', 26);
    const kn = (n) => L.knopen.find(k => k.b.n === n), a = ramp(t, 0.1, 0.5);
    if (i === 0) { const ec = kn('ectoderm'), en = kn('endoderm'); _d4Ring(ctx, ec.x, ec.y, 34, a); naamBij(ctx, 'buiten', null, ec.x - 40, ec.y - 40, c.buiten, 'right', C.goud); _d4Ring(ctx, en.x, en.y, 34, c.binnen, C.line, 3); naamBij(ctx, 'binnen', null, en.x + 40, en.y - 40, c.binnen, 'left', C.text2); }
    if (i === 1) { const hl = kn('huid en lens'); for (let j = 0; j < 12; j++) { const ph = (t * 0.5 + hash(j * 3)) % 1, an = hash(j * 7) * 6.283, d = lerp(150, 30, ph); circ(ctx, hl.x + Math.cos(an) * d, hl.y + Math.sin(an) * d * 0.7, 7, rgba(C.koraal, a * Math.sin(ph * Math.PI))); } }
    if (i === 2) { const hl = kn('huid en lens'); _d4Ring(ctx, hl.x, hl.y, 30, a); const ga = c.genen; _d4A(ctx, ga, () => _w4GenRij(ctx, hl.x + 150, hl.y - 30, 120, [1, 3], 5));
      _d4A(ctx, c.rec, () => { for (let j = 0; j < 3; j++) { const rx = hl.x + 110 + j * 40, ry = hl.y - 80; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(rx, ry + 16); ctx.lineTo(rx, ry); ctx.moveTo(rx - 9, ry - 12); ctx.lineTo(rx, ry); ctx.lineTo(rx + 9, ry - 12); ctx.stroke(); } }); }
    _d4Tegels(ctx, i + 1, i, ramp(t, 0, 0.5));
  }

Object.assign(SCENES, {
  // ================= 8 Vastzetten =================
  s66(ctx, t, q) { _d4bg(ctx, 'micro'); const [lx, ly, lr] = _d4Oog(ctx, t, q);
    // signaal uit de oogbeker: stipjes stromen naar de lens en doven uit
    const dooft = 1 - ramp(t, q.at('allang'), 1.8);
    for (let i = 0; i < 14; i++) { const ph = (t * 0.35 + hash(i * 3)) % 1, px = lerp(585, 680, ph), py = 400 + hash(i * 3 + 1) * 240 + Math.sin(t + i) * 6;
      circ(ctx, px, py, 7, rgba(C.koraal, (0.7 * dooft + 0.1) * Math.sin(ph * Math.PI))); }
    naamBij(ctx, 'oogbeker', null, 330, 215, 1, 'center'); naamBij(ctx, 'lens', null, lx + 20, ly - lr - 22, 1, 'center');
    naamBij(ctx, 'signaal dooft uit', null, 470, 830, q.on('geen', 1, 0.5), 'center', C.text2);
    const cx = lx - 72, cy = ly + 10; onzeCel(ctx, cx, cy, 30); _d4Ring(ctx, cx, cy, 30 + 22 * ramp(t, q.at('onze'), 0.8), q.on('onze', 1, 0.3) * _d4U(t, q.at('onze') + 0.9, 0.5));
    // zoom: onze cel deelt, beide dochters houden het lenspatroon
    const z = q.on('cellen', 1, 0.6), d = ramp(t, q.at('ontstaan'), 1.6);
    zoomCircle(ctx, 1420, 450, 290, cx, cy, null, z, () => { _d4bg(ctx, 'micro'); _d4Deling(ctx, 1420, 450, d); });
    naamBij(ctx, 'beide dochtercellen:', null, 1420, 795, q.on('worden', 1, 0.5), 'center'); naamBij(ctx, 'dezelfde lensgenen aan', null, 1420, 840, q.on('worden', 1, 0.5), 'center', C.groen);
  },

  s67(ctx, t, q) { _d4bg(ctx, 'micro'); const y = 650;
    dnaDraad(ctx, [[160, y], [600, y - 6], [1100, y + 6], [1600, y - 4], [1780, y]], { w: 16 });
    const mg = q.on('mastergenen', 1, 0.5), sterk = ramp(t, q.at('versterkt'), 1.0);
    const tik = t > q.at('Staat') ? Math.max(0, Math.sin((t - q.at('Staat')) / 1.6 * 6.283)) : 0;
    roundRect(ctx, 880, y - 30, 420, 60, 12); shape(ctx, rgba(C.groen, 0.32 + 0.3 * sterk + 0.15 * tik * sterk), C.groen, 3 + 2 * mg * _d4U(t, q.at('maken'), 0.5));
    naamBij(ctx, 'mastergen', null, 1090, y + 92, mg, 'center', C.groen);
    // gen staat aan: transcriptiepijl
    _d4A(ctx, q.on('maken', 1, 0.4), () => { ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(880, y - 32); ctx.lineTo(880, y - 70); ctx.lineTo(950, y - 70); ctx.stroke(); pijl(ctx, 930, y - 70, 962, y - 70, C.groen, 1, 5, 16); });
    // signaal van buiten: stipjes drijven naar het gen en verdwijnen bij 'weg'
    const sig = lerp(1, 0.18, ramp(t, q.at('signaal'), 1.2));
    for (let i = 0; i < 9; i++) { const ph = (t * 0.18 + hash(i * 5)) % 1; circ(ctx, lerp(200, 560, ph) + hash(i * 5) * 60, lerp(260, 430, ph) + hash(i * 5 + 1) * 120, 9, rgba(C.koraal, 0.6 * sig * Math.sin(ph * Math.PI))); }
    naamBij(ctx, 'signaal van buiten: weg', null, 370, 220, q.on('weg', 1, 0.5), 'center', C.text2);
    // eerste eiwit: groeit uit het gen ('maken een eiwit'), reist naar zijn eigen gen ('eigen'), bindt ('aanzet')
    const g = ramp(t, q.at('maken'), 1.1), reis = ramp(t, q.at('eigen'), 0.9);
    _d4A(ctx, ramp(t, q.at('eigen'), 0.3), () => { ctx.save(); const L = 760, p = ramp(t, q.at('eigen'), 0.9); ctx.setLineDash([L * p, 3000]); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(..._D4LUS[0]); ctx.bezierCurveTo(..._D4LUS[1], ..._D4LUS[2], ..._D4LUS[3]); ctx.stroke(); ctx.restore(); if (p > 0.95) pijl(ctx, 782, 455, 780, 490, C.groen, 1, 5, 18); });
    if (g > 0.01) { let ex, ey; if (reis < 0.01) { ex = 1220; ey = lerp(600, 320, g); } else if (reis < 1) { [ex, ey] = _d4LusPunt(reis); if (reis < 0.1) { ex = lerp(1220, ex, reis / 0.1); ey = lerp(320, ey, reis / 0.1); } } else { ex = 790; ey = y - 74; }
      if (reis < 1) _w4Kralen(ctx, ex, ey, lerp(30, 60, g), Math.round(lerp(6, 26, g)), 21, '#7A8BA8', 11);
      _d4A(ctx, g * _d4U(t, q.at('eigen'), 0.3), () => { pijl(ctx, 1220, y - 44, 1220, 420, C.text2, 1, 4, 18); naamBij(ctx, 'eiwit', null, 1310, 300, 1, 'left'); }); }
    if (reis >= 1) { _w4Kralen(ctx, 790, y - 74, 60, 26, 21, '#7A8BA8', 11); naamBij(ctx, 'bindt op zijn eigen gen', null, 760, y + 92, 1, 'center'); }
    // daarna blijft de kring draaien: telkens nieuwe eiwitten
    const t0 = q.at('Staat'); if (t > t0) for (let k = 0; k < 8; k++) { const ts = t0 + k * 0.8, p = (t - ts) / 1.9; if (p < 0 || p > 1) continue;
      let ex, ey; if (p < 0.3) { ex = 1220; ey = lerp(600, 330, p / 0.3); } else { [ex, ey] = _d4LusPunt((p - 0.3) / 0.7); }
      _d4A(ctx, Math.min(1, p * 6) * (p > 0.92 ? (1 - p) / 0.08 : 1), () => _w4Kralen(ctx, ex, ey, 30, 12, 31 + k, '#7A8BA8', 8)); }
    _d4A(ctx, ramp(t, q.at('versterkt'), 0.3), () => text(ctx, '+', 1010, 450, fTitel(Math.max(10, Math.round(110 * _d4Back(ramp(t, q.at('versterkt'), 0.5))))), C.groen, 'center'));
    naamBij(ctx, 'de kring houdt zichzelf aan', null, 1000, 820, q.on('weg', 1, 0.6), 'center', C.groen);
  },

  s68(ctx, t, q) { _d4bg(ctx, 'micro'); difLabel(ctx, 'VEREENVOUDIGD');
    const mT = q.at('methylgroepen'), cp = ramp(t, q.at('strakker'), 1.0), sp = ramp(t, q.at('celdeling'), 1.4), gr = ramp(t, q.at('grotendeels'), 0.8);
    const popTop = (i) => _d4Back(ramp(t, mT + i * 0.16, 0.4));
    _d4Rij(ctx, 300, 46, { compact: cp, pop: popTop, a: ramp(t, 0, 0.5) });
    naamBij(ctx, 'gen aan: los', null, 480, 190, q.on('DNA', 1, 0.5), 'center', C.groen); naamBij(ctx, 'gen uit: slotjes, strak opgerold', null, 1360, 190, q.on('uit', 1, 0.5), 'center');
    _d4A(ctx, q.on('celdeling', 1, 0.4), () => { pijl(ctx, 960, 400, 960, 480, C.text2, 1, 4, 18); naamBij(ctx, 'celdeling', null, 1000, 452, 1, 'left', C.text2); });
    if (sp > 0.01) { const R = lerp(46, 38, sp); const kop = (mis) => (i) => i === mis ? 1 - gr : 1;
      _d4Rij(ctx, lerp(300, 720, ease(sp)), R, { compact: 1, pop: kop(4), a: clamp((sp - 0.1) * 2.5, 0, 1) }); _d4Rij(ctx, lerp(300, 560, ease(sp)), R, { compact: 1, pop: kop(1), a: clamp((sp - 0.1) * 2.5, 0, 1) }); }
    naamBij(ctx, 'beide kopieën houden de slotjes', null, 960, 845, q.on('doorgegeven', 1, 0.5), 'center');
    _d4A(ctx, q.on('epigenetica', 1, 0.5), () => metaText(ctx, 'EPIGENETICA', 80, 860, C.text2, 'left', 26));
  },

  s69(ctx, t, q) { bg(ctx, 'macro'); _d4Raam(ctx); const a = ramp(t, 0, 0.6); _d4Kat(ctx, 470, 640, 1.45, 'zitten', { a });
    naamBij(ctx, 'lapjeskat (poes)', null, 510, 730, q.on('lapjeskat', 1, 0.5), 'center'); },

  s70(ctx, t, q) { bg(ctx, 'macro'); _d4Raam(ctx); _d4Kat(ctx, 470, 640, 1.45, 'zitten');
    naamBij(ctx, 'lapjeskat (poes)', null, 510, 730, 1, 'center', q.on('poes', 1, 0.3) * _d4U(t, q.at('Ze'), 0.5) > 0.5 ? C.goud : C.text);
    const x1 = q.on('chromosoom', 1, 0.6), or = q.on('oranje', 1, 0.5), zw = q.on('zwart', 1, 0.5), tw = q.on('twee', 1, 0.5);
    // eerste X: band eerst grijs, dan oranje
    _d4XS(ctx, 1240, 450, 330, _d4Back(x1), '#5A6478', 1 - or); _d4XS(ctx, 1240, 450, 330, _d4Back(x1), _W4.oranje, or);
    _d4A(ctx, x1, () => text(ctx, 'X', 1240, 300, fTitel(64), C.text, 'center'));
    _d4A(ctx, x1 * (1 - or), () => metaText(ctx, 'gen voor vachtkleur', 1240, 830, C.text2, 'center', 26));
    naamBij(ctx, 'allel voor oranje', null, 1240, 740, or, 'center', _W4.oranje);
    // tweede versie: zwart; bij 'twee X-chromosomen' staat hij er helemaal
    _d4XS(ctx, 1600, 450, 330, 1, _W4.zwart, lerp(0.45 * zw, 1, tw)); naamBij(ctx, 'allel voor zwart', null, 1600, 740, zw, 'center');
    _d4A(ctx, tw, () => text(ctx, 'X', 1600, 300, fTitel(64), C.text, 'center'));
    _d4A(ctx, tw, () => metaText(ctx, 'vachtkleur-gen op het X-chromosoom', 1420, 840, C.text2, 'center', 26));
    const e = q.on('elke', 1, 0.5); _d4Ring(ctx, 1240, 545, 34, e, C.goud, 4); _d4Ring(ctx, 1600, 545, 34, e, C.goud, 4);
  },

  s71(ctx, t, q) { _d4bg(ctx, 'micro'); const a = ramp(t, 0, 0.5), T0 = q.at('uitgeschakeld');
    _d4A(ctx, a, () => _d4Embryo(ctx, 620, 470, 320, (i) => ramp(t, T0 - 0.2 + hash(i * 17) * 1.2, 0.5)));
    naamBij(ctx, 'embryo, ± 16 cellen', null, 620, 850, q.on('embryo', 1, 0.5), 'center');
    // ingezoomde kern: één X rolt op tot een Barr-lichaampje
    const kx = 1460, ky = 420, kr = 190, b = ramp(t, T0, 1.0); _d4A(ctx, q.on('cel', 1, 0.5), () => { kernChromatine(ctx, kx, ky, kr, { c: 0, n: 30, seed: 6 }); circ(ctx, kx, ky, kr, null, C.kernR, 2.5);
      const bx = kx + 30, by = ky - kr + 46; if (b < 1) { ctx.save(); ctx.globalAlpha *= 1 - b; ctx.strokeStyle = _W4.oranje; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx - 70, by + 40); ctx.bezierCurveTo(bx - 20, by - 30, bx + 20, by + 70, bx + 70, by + 10); ctx.stroke(); ctx.restore(); }
      if (b > 0.01) { blob(ctx, bx, by, 36 * b, 28 * b, 0.18, 4); shape(ctx, _W4.oranje, _W4.zwartR, 2); } });
    naamBij(ctx, 'Barr-lichaampje:', null, kx, ky - kr - 62, q.on('uitgeschakeld', 1, 0.6), 'center'); naamBij(ctx, 'uitgeschakelde X, strak opgerold', null, kx, ky - kr - 20, q.on('uitgeschakeld', 1, 0.6), 'center', C.text2);
    const w = q.on('Welke', 1, 0.5); naamBij(ctx, 'oranje of zwart uit: toeval', null, kx, 720, w, 'center');
    // twee muntjes die om de beurt oplichten: toeval
    const fl = t > q.at('Welke') ? Math.floor((t - q.at('Welke')) * 4) % 2 : -1;
    _d4A(ctx, w, () => { blob(ctx, kx - 60, 790, 18, 14, 0.15, 2); shape(ctx, _W4.oranje, fl === 0 ? C.goud : _W4.zwartR, fl === 0 ? 4 : 1.5); blob(ctx, kx + 60, 790, 18, 14, 0.15, 3); shape(ctx, _W4.zwart, fl === 1 ? C.goud : _W4.zwartR, fl === 1 ? 4 : 1.5); });
  },

  s72(ctx, t, q) { _d4bg(ctx, 'micro');
    // elke cel heeft zijn keuze gemaakt; de cellen kleuren naar de X die aan blijft
    _d4Embryo(ctx, 620, 470, 320, () => 1, q.on('kleuren', 1, 0.8));
    // twee stukjes vacht: in groepjes, of haar voor haar
    const vacht = (x, y, r, a, gemengd) => _d4A(ctx, a, () => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#EEE8DE'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      if (!gemengd) [[x - 50, y - 40, 64, 50, _W4.zwart, 1], [x + 60, y + 30, 56, 64, _W4.oranje, 2], [x - 40, y + 76, 50, 36, _W4.oranje, 3], [x + 40, y - 84, 36, 28, _W4.zwart, 4]].forEach(([bx, by, rx, ry, c, sd]) => { blob(ctx, bx, by, rx, ry, 0.25, sd); ctx.fillStyle = c; ctx.fill(); });
      for (let i = 0; i < 200; i++) { const hx = x - r + hash(i * 3) * 2 * r, hy = y - r + hash(i * 3 + 1) * 2 * r; ctx.strokeStyle = gemengd ? (hash(i * 7) < 0.33 ? _W4.oranje : hash(i * 7) < 0.66 ? _W4.zwart : 'rgba(0,0,0,0.13)') : 'rgba(0,0,0,0.13)'; ctx.lineWidth = gemengd ? 4 : 2; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx + 8, hy + 6, hx + 20, hy + 8); ctx.stroke(); }
      ctx.restore(); circ(ctx, x, y, r, null, C.line, 3); });
    vacht(1330, 330, 130, q.on('groepjes', 1, 0.5), false); vacht(1630, 620, 130, q.on('haar', 1, 0.5), true);
    vraagteken(ctx, 1480, 520, q.on('elkaar', 1, 0.4), 110);
  },

  s74(ctx, t, q) { bg(ctx, 'macro'); const ex = 300, ey = 470, R = 120;
    circ(ctx, ex, ey, R + 8, null, rgba('#C9CED6', 0.45), 8);
    _d4EmbryoPos(ex, ey, R).forEach(([x, y], i) => circ(ctx, x, y, R * 0.28, _D4KL[i] ? _W4.zwart : rgba(_W4.oranje, 0.85), _W4.zwartR, 1.5));
    naamBij(ctx, 'embryo', null, ex, ey + R + 64, 1, 'center');
    _d4Ring(ctx, ex + R * 0.68 * Math.cos(0.2), ey + R * 0.68 * Math.sin(0.2), R * 0.3, q.on('uitgeschakelde', 1, 0.4) * _d4U(t, q.at('nakomelingen') + 0.3), C.goud, 3);
    // kloontjes waaieren uit: elke generatie verdubbelt, de kleur blijft
    [[1, -0.5], [0, 0.05], [1, 0.55]].forEach(([k, dy], j) => { const c = k ? _W4.oranje : _W4.zwart; const y0 = ey + dy * 260;
      for (let g = 0; g < 4; g++) { const a = ramp(t, q.at('nakomelingen') + g * 0.45 + j * 0.1, 0.4); if (a <= 0.01) continue; const n = 2 ** g;
        for (let m = 0; m < n; m++) { const gx = ex + 190 + g * 95, gy = y0 + (m - (n - 1) / 2) * 24, ox = ex + 190 + (g - 1) * 95, oy = y0 + (Math.floor(m / 2) - (n / 2 - 1) / 2) * 24;
          const px = g ? lerp(ox, gx, a) : lerp(ex + R * 0.6, gx, a), py = g ? lerp(oy, gy, a) : lerp(ey + dy * R, gy, a); circ(ctx, px, py, 10, c, k ? _lt(_W4.oranje, 0.3) : '#8C929C', 2); } } });
    const cd = q.on('celdelingen', 1, 0.5); _d4A(ctx, cd, () => pijl(ctx, 800, 470, 900, 470, C.text2, 1, 4, 18)); naamBij(ctx, 'heel veel', null, 700, 760, cd, 'center', C.text2); naamBij(ctx, 'celdelingen', null, 700, 800, cd, 'center', C.text2);
    // de vlekken groeien op de vacht
    const ka = ramp(t, q.at('vlek') - 0.4, 0.6), vk = lerp(0.12, 1, ease((t - q.at('vlek')) / 4.2));
    _d4Kat(ctx, 1330, 830, 1.95, 'liggen', { a: ka, vlek: vk });
    naamBij(ctx, 'vlek = groepje cellen met dezelfde keuze', null, 1330, 230, q.on('groepje', 1, 0.5), 'center');
  },

  s75(ctx, t, q) { bg(ctx, 'macro'); const ex = 300, ey = 470, R = 120;
    circ(ctx, ex, ey, R + 8, null, rgba('#C9CED6', 0.45), 8); _d4EmbryoPos(ex, ey, R).forEach(([x, y], i) => circ(ctx, x, y, R * 0.28, _D4KL[i] ? _W4.zwart : rgba(_W4.oranje, 0.85), _W4.zwartR, 1.5));
    naamBij(ctx, 'embryo', null, ex, ey + R + 64, 1, 'center');
    [[1, -0.5], [0, 0.05], [1, 0.55]].forEach(([k, dy]) => { const c = k ? _W4.oranje : _W4.zwart; const y0 = ey + dy * 260;
      for (let g = 0; g < 4; g++) { const n = 2 ** g; for (let m = 0; m < n; m++) circ(ctx, ex + 190 + g * 95, y0 + (m - (n - 1) / 2) * 24, 10, c, k ? _lt(_W4.oranje, 0.3) : '#8C929C', 2); } });
    pijl(ctx, 800, 470, 900, 470, C.text2, 1, 4, 18); naamBij(ctx, 'heel veel', null, 700, 760, 1, 'center', C.text2); naamBij(ctx, 'celdelingen', null, 700, 800, 1, 'center', C.text2);
    // het wit: de vlekken wijken even, zodat het witte deel opvalt
    const w = q.on('witte', 1, 0.4) * _d4U(t, q.at('los'), 0.6);
    _d4Kat(ctx, 1330, 830, 1.95, 'liggen', { va: lerp(1, 0.25, w) });
    naamBij(ctx, 'vlek = groepje cellen met dezelfde keuze', null, 1330, 230, 1 - 0.6 * w, 'center');
    naamBij(ctx, 'wit: ander gen', null, 1700, 845, q.on('ander', 1, 0.5), 'center', w > 0.3 ? C.text : C.text2);
  },

  // ================= 9 Kan de knikker terug? =================
  s76(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'MODEL');
    const L = landschap(ctx, 180, 220, 1500, 580, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikkerTonen: false });
    const K = _d4Keten(L, ['lens', 'huid en lens'], 1);
    const poging = t > q.at('kan') ? Math.sin(clamp((t - q.at('kan')) / 1.1, 0, 1) * Math.PI) * 0.22 : 0; const [kx, ky] = _d4KetenPunt(K, poging); _d4Knikker(ctx, kx, ky - 14);
    _d4Ring(ctx, kx, ky - 14, 30, q.on('knikker', 1, 0.3) * _d4U(t, q.at('beneden'), 0.5));
    const lens = L.knopen.find(k => k.b.n === 'lens'), top = L.knopen[0], x0 = lens.x + 30, y0 = lens.y - 44, p = ramp(t, q.at('ooit'), 0.9);
    if (p > 0.01) { ctx.save(); ctx.setLineDash([14, 14]); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y0); const n = 40;
      for (let i = 1; i <= n * p; i++) { const pt = _d4bez([x0, y0], [x0 + 230, y0 - 230], [top.x + 320, top.y + 40], [top.x + 60, top.y - 10], i / n); ctx.lineTo(pt[0], pt[1]); } ctx.stroke(); ctx.restore();
      if (p > 0.95) pijl(ctx, top.x + 110, top.y + 4, top.x + 64, top.y - 8, C.goud, 1, 5, 20); }
    vraagteken(ctx, x0 + 40, y0 - 220, q.on('terug', 1, 0.4), 120);
  },

  s77(ctx, t, q) { bg(ctx, 'macro'); _d4Water(ctx);
    const a = ramp(t, 0, 0.5), zw = Math.sin(t * 1.3), dy = Math.sin(t * 0.9) * 6;
    const vl = ramp(t, q.at('Verliest'), 0.9), kn = ramp(t, q.at('wond'), 0.6), gr = ramp(t, q.at('klompje'), 2.0);
    let ax; _d4A(ctx, a, () => { ax = _d4Axolotl(ctx, 820, 620 + dy, 1.05, { zwaai: zw * 0.4, verlies: vl, knop: kn, groei: gr, spook: q.on('nieuwe', 1, 0.5) }); });
    naamBij(ctx, 'axolotl', null, 420, 520, q.on('axolotl', 1, 0.5), 'center');
    naamBij(ctx, 'nieuwe poot', null, 1060, 845, q.on('nieuwe', 1, 0.5), 'center');
    const z = q.on('klompje', 1, 0.5), n = Math.round(lerp(10, 30, ramp(t, q.at('delen') - 0.6, 1.0)));
    zoomCircle(ctx, 1600, 420, 200, ax.blastema[0], ax.blastema[1], null, z, () => { ctx.fillStyle = '#22355A'; ctx.fillRect(1400, 220, 400, 400);
      ctx.fillStyle = _W4.huidAx; roundRect(ctx, 1530, 180, 140, 170, 30); ctx.fill(); ctx.strokeStyle = _W4.huidAxR; ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(1600, 400, 92, 100, 0, 0, 6.283); shape(ctx, '#F2D3CC', C.goud, 5);
      for (let i = 0; i < n; i++) { const an = hash(i * 4) * 6.283, d = Math.sqrt(hash(i * 4 + 1)) * 78, s = clamp((n - i) / 2, 0, 1); circ(ctx, 1600 + Math.cos(an) * d, 400 + Math.sin(an) * d * 1.05, 13 * s, '#E9B9B0', '#C99A92', 1.5); circ(ctx, 1600 + Math.cos(an) * d, 400 + Math.sin(an) * d * 1.05, 5 * s, rgba(C.paars, 0.85)); } });
    naamBij(ctx, 'klompje cellen dat weer deelt', null, 1600, 680, z, 'center', C.goud);
  },

  s78(ctx, t, q) { _d4bg(ctx, 'schema');
    const hlT = [['Spiercellen', 'spier'], ['buitenste', 'opperhuid'], ['lederhuid', 'lederhuid']]; let actief = null;
    for (const [w, n] of hlT) if (t >= q.at(w) - 0.2) actief = n; if (t >= q.at('knikker') - 0.3) actief = null;
    const hl = {}; for (const n of ['opperhuid', 'lederhuid', 'spier', 'kraakbeen']) hl[n] = actief ? (n === actief || (actief === 'lederhuid' && n === 'kraakbeen' && t > q.at('kraakbeen')) ? 1 : 0.3) : 1;
    const D = _d4Doorsnede(ctx, { front: ramp(t, q.at('kleurden'), 2.6), hl, wissel: ramp(t, q.at('wisselen'), 1.8) });
    naamBij(ctx, 'kleur = herkomst van de cel', null, (D.xc + D.x1) / 2, D.cy + 230, q.on('kleurden', 1, 0.5), 'center', C.text2);
    naamBij(ctx, 'lederhuid maakt ook kraakbeen en pezen', null, 780, D.cy + 300, q.on('pezen', 1, 0.5), 'center');
    _d4A(ctx, q.on('2009', 1, 0.5), () => metaText(ctx, 'AXOLOTL · 2009', 80, 860, C.text2, 'left', 26));
    // klein landschap: eerst het oude idee (helemaal terug naar de top), daarna een stukje omhoog
    roundRect(ctx, 1380, 190, 480, 500, 16); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5);
    const L = landschap(ctx, 1450, 300, 340, 300, { pad: ['embryo', 'mesoderm', 'spier'], knikkerTonen: false, labels: false });
    const dal = L.knopen.find(k => k.b.n === 'spier'); naamBij(ctx, 'spier', null, dal.x, dal.y + 54, 1, 'center'); metaText(ctx, 'MODEL', 1840, 676, C.text2, 'right', 26);
    const K = _d4Keten(L, ['spier', 'mesoderm', 'embryo', 'bevruchte eicel'], 1), oud = ramp(t, q.at('terug'), 1.1), oudA = _d4U(t, q.at('Maar'), 0.6);
    if (oud > 0.01 && oudA > 0.01) { _d4KetenSpoor(ctx, K, 0, oud, C.text2, 3, [8, 10], oudA); const p = _d4KetenPunt(K, oud); _d4Knikker(ctx, p[0], p[1] - 14, oudA, true); }
    naamBij(ctx, 'oud idee: terug naar de top', null, 1620, 250, q.on('gedacht', 1, 0.5) * oudA, 'center', C.text2);
    const K2 = _d4Keten(L, ['spier', 'mesoderm'], 1), op = ramp(t, q.at('rolt'), 1.0) * 0.38, wieb = t > q.at('blijft') ? Math.sin((t - q.at('blijft')) * 5) * 0.03 * _d4U(t, q.at('blijft') + 1.2, 0.5) : 0;
    const kp = _d4KetenPunt(K2, op + wieb); _d4Knikker(ctx, kp[0], kp[1] - 14);
    _d4Ring(ctx, dal.x, dal.y - 14, 16, ramp(t, q.at('rolt'), 0.4), rgba(C.goud, 0.6), 2.5);
    naamBij(ctx, 'een stukje omhoog', null, 1620, 250, q.on('stukje', 1, 0.5), 'center', C.goud);
  },

  s79(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'NIET OP SCHAAL');
    _d4A(ctx, ramp(t, 0, 0.6), () => { _w4Kikkervisje(ctx, 330, 400, 1.2); circ(ctx, 330, 420, 34, null, C.goud, 3); naamBij(ctx, 'kikkervisje', null, 250, 530, 1, 'center'); pijl(ctx, 450, 440, 520, 440, C.text2, 1, 4, 16); });
    _d4A(ctx, ramp(t, 0.4, 0.6), () => { _w4Cel(ctx, 640, 440, 90, { vul: rgba(C.oker, 0.25), kx: -10, ky: 10, kr: 0.36 }); naamBij(ctx, 'darmcel', null, 640, 600, 1, 'center'); });
    _d4Ring(ctx, 640, 440, 100, q.on('gespecialiseerde', 1, 0.4), C.goud, 4);
    // in de kern: DNA
    const dn = q.on('DNA', 1, 0.5); _d4A(ctx, dn, () => { ctx.save(); ctx.beginPath(); ctx.arc(630, 450, 32, 0, 6.283); ctx.clip(); dnaDraad(ctx, [[600, 470], [620, 430], [640, 470], [660, 430]], { w: 5 }); ctx.restore(); });
    vraagteken(ctx, 800, 420, q.on('compleet', 1, 0.4), 120);
  },

  s80(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'NIET OP SCHAAL');
    _d4A(ctx, q.on('1962', 1, 0.5), () => metaText(ctx, 'KIKKER · 1962', 80, 860, C.text2, 'left', 26));
    _w4Kikkervisje(ctx, 330, 400, 1.2); circ(ctx, 330, 420, 34, null, C.goud, 3 + 3 * q.on('kikkervisje', 1, 0.3) * _d4U(t, q.at('Die'), 0.5)); naamBij(ctx, 'kikkervisje', null, 250, 530, 1, 'center'); pijl(ctx, 450, 440, 520, 440, C.text2, 1, 4, 16);
    // de pipet komt naar de darmkern, zuigt hem op en brengt hem naar de eicel
    const nIn = ramp(t, q.at('kern') - 0.4, 0.8), zuig = ramp(t, q.at('darmcel'), 0.7), naar = ramp(t, q.at('zette'), 1.2), erin = ramp(t, q.at('eigen'), 0.8);
    const kern = [630, 450], ei = [1250, 470], er = 170, eiKern = [ei[0], ei[1] - er * 0.4];
    _w4Cel(ctx, 640, 440, 90, { vul: rgba(C.oker, 0.25), kern: false }); if (zuig < 1) _d4A(ctx, 1, () => { const kx = lerp(kern[0], kern[0] + 26 * 0.62, zuig), ky = lerp(kern[1], kern[1] - 26 * 0.78, zuig); circ(ctx, kx, ky, lerp(32, 15, zuig), rgba(C.paars, 0.75), C.kernR, 1.5); });
    else { ctx.save(); ctx.setLineDash([6, 6]); circ(ctx, kern[0], kern[1], 32, null, C.text2, 2); ctx.restore(); }
    naamBij(ctx, 'darmcel', null, 640, 600, 1, 'center'); naamBij(ctx, 'kern eruit', null, 800, 170, q.on('darmcel', 1, 0.5) * _d4U(t, q.at('zette'), 0.5), 'left', C.text2);
    // eicel zonder eigen kern
    const ea = q.on('eicel', 1, 0.5); _d4A(ctx, ea, () => _w4Eicel(ctx, ei[0], ei[1], er, { kern: erin > 0.5 ? 'darm' : 'weg' }));
    naamBij(ctx, 'eicel', null, ei[0], ei[1] + er + 50, ea, 'center'); naamBij(ctx, 'eigen kern weg', null, ei[0], ei[1] + er + 92, q.on('weg', 1, 0.5) * _d4U(t, q.at('was') - 0.1, 0.3), 'center', C.text2);
    naamBij(ctx, 'darmkern erin', null, ei[0], ei[1] + er + 92, ramp(t, q.at('was') - 0.1, 0.3), 'center', C.goud);
    // pipetpunt: van boven naar de darmkern, dan naar de eicel, dan erin
    let px = lerp(kern[0] + 140, kern[0], nIn), py = lerp(kern[1] - 180, kern[1] - 18, nIn);
    if (naar > 0) { px = lerp(px, eiKern[0] + 70, naar); py = lerp(py, eiKern[1] - 60, naar); } if (erin > 0) { px = lerp(eiKern[0] + 70, eiKern[0] + 10, erin); py = lerp(eiKern[1] - 60, eiKern[1] - 10, erin); }
    _d4Pipet(ctx, px, py, zuig >= 1 && erin < 0.5 ? 1 : 0, nIn * _d4U(t, q.at('was') + 0.2, 0.6));
  },

  s81(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'NIET OP SCHAAL');
    _w4Eicel(ctx, 960, 470, 200, { kern: 'darm' }); naamBij(ctx, 'eicel met darmkern', null, 960, 730, 1, 'center');
    _d4A(ctx, q.on('uitgroeien', 1, 0.6), () => { ctx.save(); ctx.globalAlpha *= 0.5; ctx.setLineDash([10, 10]); pijl(ctx, 1200, 470, 1320, 470, C.text2, 1, 4, 16); ctx.restore(); });
    vraagteken(ctx, 1500, 510, q.on('kikkervisje', 1, 0.4), 140);
  },

  s83(ctx, t, q) { _d4bg(ctx, 'schema');
    for (let i = 0; i < 9; i++) { const x = 200 + i * 105, y = 300, gr = i === 6 ? 0 : ramp(t, q.at('aantal') + hash(i * 3) * 0.6, 0.5);
      if (i === 6) { const kl = ramp(t, q.at('groeide'), 0.8), weg = ramp(t, q.at('groeide') + 0.6, 0.4);
        _d4A(ctx, 1 - weg * 0.6, () => { _w4Eicel(ctx, x, y, 42, { kern: 'darm' }); if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = _W4.eiR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 42); ctx.lineTo(x, y + 42); if (kl > 0.5) { ctx.moveTo(x - 42, y); ctx.lineTo(x + 42, y); } ctx.stroke(); ctx.restore(); } });
        _d4Ring(ctx, x, y - 17, 14, q.on('alle', 2, 0.4) * _d4U(t, q.at('Bij'), 0.5), C.goud, 3); }
      else _d4A(ctx, lerp(1, 0.5, gr), () => { _w4Eicel(ctx, x, y, 42, { kern: 'darm', grijs: gr > 0.5 }); }); }
    naamBij(ctx, 'de meeste eicellen: niets', null, 620, 410, q.on('gevallen', 1, 0.5), 'center', C.text2);
    // het kikkervisje zwemt uit de ene eicel weg
    const zw = ramp(t, q.at('groeide') + 0.4, 1.3); _d4A(ctx, ramp(t, q.at('groeide') + 0.4, 0.3), () => pijl(ctx, 830, 250, lerp(830, 1180, zw), 250, C.groen, 1, 5, 20));
    if (zw > 0.01) { _w4Kikkervisje(ctx, lerp(830, 1450, zw), lerp(300, 260, zw) + Math.sin(t * 4) * 4 * zw, lerp(0.3, 1.25, zw)); }
    naamBij(ctx, 'kikkervisje', null, 1400, 380, q.on('uit', 1, 0.5), 'center', C.groen);
    naamBij(ctx, 'de darmkern had nog alle genen voor een heel dier', null, 960, 500, q.on('darmkern', 1, 0.5), 'center', C.groen);
    // Dolly
    const d = q.on('schaap', 1, 0.5); _d4A(ctx, d, () => { ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 560); ctx.lineTo(1620, 560); ctx.stroke();
      _w4Cel(ctx, 480, 720, 46, { vul: rgba(C.koraal, 0.2), kr: 0.42 }); naamBij(ctx, 'uiercel', null, 480, 820, 1, 'center'); pijl(ctx, 560, 720, 660, 720, C.text2, 1, 4, 16);
      ctx.beginPath(); ctx.arc(760, 720, 66, 0, 6.283); shape(ctx, rgba(C.oker, 0.22), C.oker, 2.5); naamBij(ctx, 'eicel', null, 760, 820, 1, 'center'); metaText(ctx, 'SCHAAP DOLLY · 1996', 1260, 735, C.text2, 'left', 28); });
    const kv = ramp(t, q.at('Dolly'), 0.9); _d4A(ctx, d, () => circ(ctx, lerp(480, 760, kv), lerp(720, 700, kv) - Math.sin(kv * Math.PI) * 50, 19, rgba(C.paars, 0.95), C.goud, 3));
    const lam = q.on('hetzelfde', 1, 0.6); _d4A(ctx, lam, () => { pijl(ctx, 860, 720, 960, 720, C.text2, 1, 4, 16); _w4Lam(ctx, 1090, 790, 0.95 * lerp(0.7, 1, lam)); naamBij(ctx, 'lam', null, 1095, 840, 1, 'center'); });
    _d4Ring(ctx, 480, 720, 58, q.on('uier', 1, 0.3), C.goud, 4);
  },

  s84(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'MODEL');
    const L = _d4Land58(ctx, { dim: true }); const dal = L.knopen.find(k => k.b.n === 'bindweefsel');
    const K = _d4Keten(L, ['bindweefsel', 'mesoderm', 'embryo', 'bevruchte eicel'], 0.65), u = ramp(t, q.at('duwde'), 3.6);
    _d4KetenSpoor(ctx, K, 0, u, C.goud, 4, [12, 12]); circ(ctx, dal.x, dal.y - 14, 18, null, rgba(C.goud, 0.6 * ramp(t, q.at('duwde'), 0.4)), 3);
    const [kx, ky] = _d4KetenPunt(K, u); _d4Knikker(ctx, kx, ky - 14);
    // vier gouden genen vliegen aan en duwen mee
    for (let i = 0; i < 4; i++) { const a = ramp(t, q.at('vier') + i * 0.15, 0.5); if (a <= 0.01) continue; const tx = kx + 36 + i * 46, ty = ky;
      roundRect(ctx, lerp(1450, tx, ease(a)), lerp(160 + i * 40, ty, ease(a)), 38, 26, 6); shape(ctx, C.goud, '#8A6510', 2); }
    naamBij(ctx, 'vier genen', null, kx + 232, ky + 22, q.on('genen', 1, 0.5), 'left', C.goud);
    naamBij(ctx, 'net onder de top', null, kx - 60, ky - 24, q.on('heuvel', 1, 0.5), 'right');
    _d4A(ctx, q.on('2006', 1, 0.5), () => metaText(ctx, 'MUIS · 2006', 1530, 680, C.text2, 'left', 26));
    // stamcellen: van hier kun je weer alle kanten op
    const st = q.on('celsoort', 1, 0.6); if (st > 0.01) L.knopen.filter(k => !k.b.k && k.b.n !== 'placenta').forEach((k, i) => _d4Ring(ctx, k.x, k.y - 14, 16, st * ramp(t, q.at('celsoort') + i * 0.08, 0.3), C.goud, 3));
    _d4Tegels(ctx, 3, -1, 1, 1530, 280);
  },

  s85(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'MODEL');
    const L = _d4Land58(ctx, { dim: true }); const K = _d4Keten(L, ['bindweefsel', 'mesoderm', 'embryo', 'bevruchte eicel'], 0.65);
    _d4KetenSpoor(ctx, K, 0, 1, C.goud, 4, [12, 12], 1 - 0.5 * ramp(t, q.at('cellen'), 0.6)); const [kx, ky] = _d4KetenPunt(K, 1); _d4Knikker(ctx, kx, ky - 14);
    for (let i = 0; i < 4; i++) { roundRect(ctx, kx + 36 + i * 46, ky, 38, 26, 6); shape(ctx, C.goud, '#8A6510', 2); }
    // in elk dal: dezelfde genen (compleet), maar telkens andere schakelaars aan
    const bl = L.knopen.filter(k => !k.b.k && k.b.n !== 'placenta'), za = q.on('cellen', 1, 0.6), sch = ramp(t, q.at('schakelaars'), 0.8);
    const AAN = [[0, 3], [1, 4], [2, 0], [2, 3], [1, 2], [4, 0]];
    bl.forEach((k, i) => _d4A(ctx, za * ramp(t, q.at('cellen') + i * 0.08, 0.3), () => _w4GenRij(ctx, k.x, k.y + 84, 110, sch > 0.5 ? AAN[i % 6] : [], 5)));
    naamBij(ctx, 'zelfde genen, andere schakelaars aan', null, 760, 160, q.on('schakelaars', 1, 0.5), 'center', C.groen);
    _d4Tegels(ctx, sch > 0.01 ? 4 : 3, sch > 0.01 ? 3 : -1, sch, 1530, 280);
  },

  // ================= 10 Terug naar de lens =================
  s86(ctx, t, q) { _d4bg(ctx, 'micro'); const e = ramp(t, q.at('lensvezelcel') - 0.2, 1.8);
    _d4Vezel(ctx, e, {}); naamBij(ctx, 'lensvezelcel', null, lerp(760, 300, e), 380, q.on('lensvezelcel', 1, 0.5), 'left', C.goud);
    const kn = lerp(0.6, 1, ramp(t, q.at('diep'), 1.0)); _d4LandKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], kn);
    const kx = lerp(850, 1240, e); _d4Ring(ctx, kx, 520, 72, q.on('ding', 1, 0.4), C.goud, 3);
  },

  s87(ctx, t, q) { _d4bg(ctx, 'micro');
    const ei = ramp(t, q.at('doorzichtige') - 0.3, 1.6), af = ramp(t, q.at('kern'), 1.6), org = ramp(t, q.at('organellen'), 1.2), li = ramp(t, q.at('Daardoor'), 1.6);
    _d4Vezel(ctx, 1, { eiwit: ei, af, org, helder: ramp(t, q.at('af'), 1.0) });
    _d4Licht(ctx, li);
    naamBij(ctx, 'lensvezelcel', null, 300, 380, 1, 'left', C.goud); naamBij(ctx, 'doorzichtige eiwitten', null, 560, 740, q.on('eiwitten', 1, 0.5), 'center');
    naamBij(ctx, 'kern en organellen afgebroken', null, 1240, 740, q.on('af', 1, 0.5), 'center'); naamBij(ctx, 'licht gaat recht door', null, 1850, 572, q.on('licht', 1, 0.5), 'right');
    _d4LandKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], 1);
  },

  s88(ctx, t, q) { _d4bg(ctx, 'micro');
    _d4Vezel(ctx, 1, { eiwit: 1, af: 1, org: 1, helder: 1 }); _d4Licht(ctx, 1);
    naamBij(ctx, 'lensvezelcel', null, 300, 380, 1, 'left', C.goud); naamBij(ctx, 'licht gaat recht door', null, 1850, 572, 1, 'right');
    const L = _d4LandKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], 1); const lens = L.knopen.find(k => k.b.n === 'lens');
    // de weg terug is dicht
    const p = q.on('terug', 1, 0.5); _d4A(ctx, ramp(t, q.at('knikker'), 0.5), () => { ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lens.x + 14, lens.y - 34); ctx.quadraticCurveTo(lens.x + 90, lens.y - 120, lens.x + 40, lens.y - 170); ctx.stroke(); ctx.restore(); });
    kruis(ctx, lens.x + 70, lens.y - 110, 20, p);
    // waar de kern zat: leeg
    const zk = q.on('kern', 1, 0.5); _d4A(ctx, zk, () => { ctx.save(); ctx.setLineDash([10, 10]); circ(ctx, 1240, 520, 62, null, C.text2, 3); ctx.restore(); });
    naamBij(ctx, 'geen kern', null, 1240, 740, zk, 'center'); naamBij(ctx, 'deelt nooit meer', null, 1240, 790, q.on('nooit', 1, 0.5), 'center', C.goud);
  },

  s89(ctx, t, q) { _d4bg(ctx, 'schema'); difLabel(ctx, 'MODEL');
    const L = _d4Land60(ctx), K = _d4Keten(L, _D4PAD60, 1), u = ramp(t, q.at('kwam'), 1.8);
    _d4KetenSpoor(ctx, K, 0, u, C.goud, 4, [12, 12]); const [kx, ky] = _d4KetenPunt(K, u); _d4Knikker(ctx, kx, ky - 14);
    const lens = L.knopen.find(k => k.b.n === 'lens'); _d4A(ctx, ramp(t, q.at('lot'), 0.5), () => metaText(ctx, '→ LENSVEZEL', lens.x, lens.y + 90, C.goud, 'center', 26));
    _d4A(ctx, q.on('vier', 1, 0.5), () => _d4Tegels(ctx, 0, -1));
  },
  s90(ctx, t, q) { _d4Vier(ctx, t, q, 0, { buiten: q.on('buiten', 1, 0.4), binnen: q.on('binnen', 1, 0.4) }); },
  s91(ctx, t, q) { _d4Vier(ctx, t, q, 1, {}); },
  s92(ctx, t, q) { _d4Vier(ctx, t, q, 2, { genen: q.on('genen', 1, 0.4), rec: q.on('receptoren', 1, 0.4) }); },
  s93(ctx, t, q) { _d4Vier(ctx, t, q, 3, {}); },
  s94(ctx, t, q) { bg(ctx, 'macro');
    // doorlopende zoom uit: de lensvezel krimpt tot in het oog van Noor, het beeld trekt terug naar de bank
    const z = ease(clamp((t - 0.1) / 3.0, 0, 1)), S = Math.pow(6, 1 - z), [ox, oy] = _D4OOG, ex = lerp(W / 2, ox, z), ey = lerp(H / 2, oy, z);
    ctx.save(); ctx.translate(ex, ey); ctx.scale(S, S); ctx.translate(-ox, -oy); _d4Noor(ctx); ctx.restore();
    const va = 1 - ramp(t, 0.3, 1.0); if (va > 0.01) { ctx.save(); ctx.globalAlpha *= va; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
      const s2 = lerp(1, 0.03, ease(clamp((t - 0.1) / 1.3, 0, 1))); ctx.translate(ex, ey); ctx.scale(s2, s2); ctx.translate(-850, -540);
      _d4Vezel(ctx, 1, { eiwit: 1, af: 1, org: 1, helder: 1 }); _d4Licht(ctx, 1); ctx.restore(); }
    const oc = q.on('onze', 1, 0.5); _d4Ring(ctx, ox, oy, 14, oc, C.goud, 3);
    naamBij(ctx, 'onze cel: in de lens van haar oog', null, 1000, 262, oc, 'left', C.goud);
    _d4A(ctx, q.on('lichaam', 1, 0.6), () => _d4Tegels(ctx, 4, -1, 1, 1520, 400));
  },
});
