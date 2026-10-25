// ===== Cast voor de Engelse films (Unboxing Biology) — 25 okt 2026 =====
// Nieuwe caststijl (BEELDAFSPRAKEN 25 okt 2026): rijker getekend, één schaduwtint per vlak, dunne contourlijn in een donkere tint van de eigen vulling.
// Ontworpen naar castvel 1 (personages/en/vellen/vel-1.webp). Gebruikt GANG, _beenPose en _mix uit personages/lib_cast.js (laad die eerst).
//
// Gebruik:  persoonEN(ctx, 'maya', x, y, h, { t, pose, uit, praat, kijk, zij, gang, lijn })
//   x, y = midden tussen de voeten op de grond · h = lengte van Maya in px (de anderen schalen mee met hun eigen lengte)
//   pose: 'staan' | 'zak' (hand in de zak) | 'wijs' | 'zwaai' | 'uitleg' | 'denk', of { L:[a1,a2,hand,zak], R:[...] } · uit: 'neutraal' | 'blij' | 'verbaasd'
//   praat: true = mond beweegt op t · zij: true = zijaanzicht (kijk 1 = naar rechts, -1 = naar links), gang: 'loop' | 'ren' | 'sprint' (zonder gang: staan)
//   lijn: false = zonder contourlijnen (standaard aan)
// Geeft ankerpunten terug: { hoofd:{x,y,r}, handL, handR } voor pijlen, labels en vastgehouden voorwerpen.

const CAST_EN = {
  maya:    { naam: 'Maya', leeftijd: 16, rol: "'you': curious, asks the questions", lengte: 1.0, kop: 1.0, sb: 1.0, hb: 1.0, lb: 1.0, armK: 1.0,
             huid: '#8A4A26', huidS: '#6F3A1D', haar: '#1C1613', haarL: '#3A2C24', kapsel: 'puff', wenkbrauw: '#1C1613',
             top: 'trui', topK: '#D9922A', topS: '#BE7A1D', broek: 'jeans', broekK: '#4C76A0', broekS: '#3C6189', omslag: '#6B93BB',
             schoen: 'sneaker', schoenK: '#F1EBE3', schoenS: '#D6CCC0' },
  theo:    { naam: 'Theo', leeftijd: 16, rol: 'does the experiments, sporty', lengte: 1.11, kop: 0.95, sb: 1.13, hb: 1.0, lb: 1.08, armK: 1.03,
             huid: '#EDB98A', huidS: '#D49B6B', haar: '#B4602A', haarL: '#D27C40', kapsel: 'kortRommel', wenkbrauw: '#A0521F', sproeten: true,
             top: 'hoodie', topK: '#4E7A52', topS: '#3D6442', broek: 'broek', broekK: '#22263A', broekS: '#181B2B',
             schoen: 'sneaker', schoenK: '#F1EBE3', schoenS: '#D6CCC0' },
  priya:   { naam: 'Priya', leeftijd: 17, rol: 'sharp, wants to study medicine', lengte: 1.02, kop: 0.97, sb: 0.98, hb: 1.0, lb: 1.0, armK: 1.0,
             huid: '#B06A3E', huidS: '#93542D', haar: '#1A1715', haarL: '#3A3330', kapsel: 'vlecht', wenkbrauw: '#1A1715',
             top: 'vest', topK: '#28324F', topS: '#1D2540', binnen: '#F2ECE2', binnenS: '#D8D0C3', broek: 'broek', broekK: '#373942', broekS: '#2A2C34',
             schoen: 'instap', schoenK: '#22201F', schoenS: '#151413' },
  kenji:   { naam: 'Kenji', leeftijd: 15, rol: 'quiet, thinks it through, likes numbers', lengte: 1.04, kop: 0.98, sb: 1.0, hb: 0.95, lb: 0.98, armK: 1.0,
             huid: '#D69A68', huidS: '#BC8152', haar: '#191919', haarL: '#383838', kapsel: 'pony', wenkbrauw: '#191919', bril: 'rond',
             top: 'streep', topK: '#22304A', topS: '#18223A', streep: '#E9E1D0', broek: 'chino', broekK: '#7A5234', broekS: '#62412A', omslag: '#8C6141',
             schoen: 'sneaker', schoenK: '#F1EBE3', schoenS: '#D6CCC0' },
  ribeiro: { naam: 'Dr Ana Ribeiro', leeftijd: 42, rol: 'doctor and researcher', lengte: 1.06, kop: 0.92, sb: 1.0, hb: 1.05, lb: 1.0, armK: 1.02,
             huid: '#D08E62', huidS: '#B4744B', haar: '#1F1C1A', haarL: '#3D3734', kapsel: 'golf', wenkbrauw: '#1F1C1A', oorbel: '#D4A84A',
             top: 'labjas', topK: '#F3EEE8', topS: '#D6D0C8', binnen: '#22607A', binnenS: '#1A4C62', broek: 'broek', broekK: '#1C2332', broekS: '#141A26',
             schoen: 'instap', schoenK: '#202024', schoenS: '#141417', stethoscoop: true },
  mensah:  { naam: 'Mr Mensah', leeftijd: 39, rol: 'biology teacher, asks what you think first', lengte: 1.16, kop: 0.9, sb: 1.2, hb: 1.1, lb: 1.1, armK: 1.06,
             huid: '#5E3A28', huidS: '#4A2C1D', haar: '#161210', haarL: '#2E2622', kapsel: 'kortKrul', wenkbrauw: '#161210', baard: '#1C1512', bril: 'recht',
             top: 'truiKraag', topK: '#1F6062', topS: '#174B4D', kraag: '#C9DAEA', kraagS: '#A9BFD3', broek: 'broek', broekK: '#6E737B', broekS: '#5A5E66',
             schoen: 'leer', schoenK: '#5A3B28', schoenS: '#452C1D' }
};
const CAST_EN_VOLGORDE = ['maya', 'theo', 'priya', 'kenji', 'ribeiro', 'mensah'];

// ---------- tekenhulpjes ----------
let _EN_LIJN = true, _EN_LW = 2.4;
const _enHex = (c) => { if (c[0] === '#') return c; const m = c.match(/\d+/g); return '#' + m.slice(0, 3).map(v => (+v).toString(16).padStart(2, '0')).join(''); };
const _enLijn = (kl) => _mix(_enHex(kl), 0.68, '#140E14');
const _enVer = (kl, k = 0.22) => _enHex(_mix(_enHex(kl), k, '#1A2740'));
function _enVorm(ctx, pad, vul, schaduw) { pad(); ctx.fillStyle = vul; ctx.fill(); if (schaduw) { ctx.save(); pad(); ctx.clip(); schaduw(); ctx.restore(); } if (_EN_LIJN) { pad(); ctx.strokeStyle = _enLijn(vul); ctx.lineWidth = _EN_LW; ctx.stroke(); } }
function _enVormen(ctx, paden, vul, schaduw) { if (_EN_LIJN) { ctx.strokeStyle = _enLijn(vul); ctx.lineWidth = _EN_LW * 2; for (const p of paden) { p(); ctx.stroke(); } } ctx.fillStyle = vul; for (const p of paden) { p(); ctx.fill(); } if (schaduw) for (const p of paden) { ctx.save(); p(); ctx.clip(); schaduw(); ctx.restore(); } }
function _enCaps(ctx, x1, y1, r1, x2, y2, r2, nieuw = true) { const a = Math.atan2(y2 - y1, x2 - x1), nx = Math.cos(a + Math.PI / 2), ny = Math.sin(a + Math.PI / 2);
  if (nieuw) ctx.beginPath(); ctx.moveTo(x1 + nx * r1, y1 + ny * r1); ctx.lineTo(x2 + nx * r2, y2 + ny * r2); ctx.arc(x2, y2, r2, a + Math.PI / 2, a - Math.PI / 2, true); ctx.lineTo(x1 - nx * r1, y1 - ny * r1); ctx.arc(x1, y1, r1, a - Math.PI / 2, a + Math.PI / 2, true); ctx.closePath(); }
function _enUnie(ctx, cirkels, vul) { if (_EN_LIJN) { ctx.fillStyle = _enLijn(vul); for (const [x, y, r] of cirkels) { ctx.beginPath(); ctx.arc(x, y, r + _EN_LW, 0, 6.283); ctx.fill(); } } ctx.fillStyle = vul; for (const [x, y, r] of cirkels) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); } }
function _enLijnStreek(ctx, kl, w, f) { if (!_EN_LIJN) return; ctx.strokeStyle = _enLijn(kl); ctx.lineWidth = _EN_LW * w; ctx.beginPath(); f(); ctx.stroke(); }
const _enEase = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);

// ---------- hand (lokaal: oorsprong = pols, +y = richting van de onderarm, duim naar +x) ----------
function _enHand(ctx, P, soort, s = 1, golf = 0) {
  const delen = [], spleten = [];
  const vinger = (x, y, ang, len, r) => { delen.push(() => { const ex = x + Math.sin(ang) * len, ey = y + Math.cos(ang) * len; _enCaps(ctx, x, y, r, ex, ey, r * 0.86); }); return [x, y]; };
  delen.push(() => { ctx.beginPath(); ctx.moveTo(-13 * s, 4 * s); ctx.quadraticCurveTo(-16 * s, 22 * s, -12 * s, 36 * s); ctx.lineTo(12 * s, 36 * s); ctx.quadraticCurveTo(16 * s, 20 * s, 12 * s, 4 * s); ctx.quadraticCurveTo(0, 0, -13 * s, 4 * s); ctx.closePath(); });
  if (soort === 'wijs') { vinger(-4 * s, 32 * s, -0.05, 30 * s, 5 * s); delen.push(() => { ctx.beginPath(); ctx.ellipse(4 * s, 36 * s, 11 * s, 8 * s, 0, 0, 6.283); }); spleten.push([[0, 32], [2, 42]], [[6, 32], [8, 42]]); }
  else if (soort === 'open' || soort === 'zwaai') { const sp = soort === 'zwaai' ? 0.13 + golf * 0.05 : 0.07; for (let i = 0; i < 4; i++) vinger((-8.5 + i * 5.7) * s, 33 * s, (i - 1.5) * sp, (i === 0 ? 17 : i === 3 ? 15 : 20) * s, 4.4 * s); }
  else if (soort === 'vuist') { delen.push(() => { ctx.beginPath(); ctx.ellipse(0, 38 * s, 14 * s, 10 * s, 0, 0, 6.283); }); spleten.push([[-6, 32], [-6, 44]], [[0, 32], [0, 46]], [[6, 32], [6, 44]]); }
  else { for (let i = 0; i < 4; i++) vinger((-8 + i * 5.3) * s, 33 * s, 0.05 * (i - 1.5), (i === 3 ? 11 : 15) * s, 4.4 * s); }
  if (soort !== 'vuist') vinger(13 * s, 10 * s, soort === 'wijs' ? 0.95 : -0.55, 15 * s, 5 * s); else vinger(11 * s, 22 * s, 1.4, 9 * s, 5 * s); // duim
  if (_EN_LIJN) { ctx.strokeStyle = _enLijn(P.huid); ctx.lineWidth = _EN_LW * 2; for (const d of delen) { d(); ctx.stroke(); } }
  ctx.fillStyle = P.huid; for (const d of delen) { d(); ctx.fill(); }
  ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(-6 * s, 22 * s, 5 * s, 10 * s, 0, 0, 6.283); ctx.fill();
  if (_EN_LIJN) { ctx.strokeStyle = _enLijn(P.huid); ctx.lineWidth = _EN_LW * 0.7; for (const [[a, b], [c, d]] of spleten) { ctx.beginPath(); ctx.moveTo(a * s, b * s); ctx.lineTo(c * s, d * s); ctx.stroke(); } }
}

// ---------- vooraanzicht ----------
// Alles in de coördinaten van de still: midden x 207, kruin y 110, zolen y 1150 (1040 eenheden lengte).
const _EN_C = 207;
const POSES_EN = {
  staan:  { L: [0.12, 0.04, 'rust'], R: [0.12, 0.04, 'rust'] },
  zak:    { L: [0.24, -0.34, 'rust', true], R: [0.14, 0.05, 'rust'] },
  wijs:   { L: [0.12, 0.04, 'rust'], R: [1.42, 1.52, 'wijs'] },
  zwaai:  { L: [0.12, 0.04, 'rust'], R: [2.55, 2.95, 'zwaai'] },
  uitleg: { L: [0.22, 2.75, 'open', false, 1, 0.42], R: [0.2, 2.65, 'open', false, 1, 0.42] },
  denk:   { L: [0.05, 3.61, 'vuist', false, 0.75, 1.11], R: [0.12, 0.04, 'rust'] }
};
function _enArm(ctx, P, s, cfg, o) {
  const C = _EN_C, a1 = cfg[0], a2 = cfg[1], soort = cfg[2] || 'rust', zak = !!cfg[3];
  const sw = 101 * P.sb, S = [C + s * (sw + 2), 330], L1 = 146 * P.armK * (cfg[4] || 1), rek = cfg[5] || (a2 > 1.6 && a2 < 3 && a1 < 1 ? 0.72 : 1), L2 = 166 * P.armK * (zak ? (P.top === 'labjas' ? 1 : 0.78) : rek);
  let A1 = a1, A2 = a2;
  if (zak) { // hand in de zak: de pols mikt op de zakopening (twee-schakelige IK, elleboog naar buiten), zodat het bij elk lichaam klopt
    const T = P.top === 'labjas' ? [C + s * 70, 640] : [C + s * 58 * P.hb, 590], tx = s * (T[0] - S[0]), ty = T[1] - S[1];
    const d = Math.min(Math.hypot(tx, ty), L1 + L2 - 1), phi = Math.atan2(tx, ty), al = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))));
    A1 = phi + al; const ex = Math.sin(A1) * L1, ey = Math.cos(A1) * L1; A2 = Math.atan2(tx - ex, ty - ey); }
  const E = [S[0] + s * Math.sin(A1) * L1, S[1] + Math.cos(A1) * L1], W = [E[0] + s * Math.sin(A2) * L2, E[1] + Math.cos(A2) * L2];
  const dir = Math.atan2(W[0] - E[0], W[1] - E[1]), C2 = [E[0] + (W[0] - E[0]) * 0.86, E[1] + (W[1] - E[1]) * 0.86], Mx = [(E[0] + C2[0]) / 2, (E[1] + C2[1]) / 2];
  const kort = P.top === 'streep', lab = P.top === 'labjas';
  // zaklijn: jeans/broek op de heup, labjas op de jaszak
  const zl = lab ? [[C - 112, 652], [C - 30, 646]] : [[C - 99 * P.hb, 600], [C - 21 * P.hb, 572]];
  // hand (met zak: alleen het deel boven de zaklijn)
  ctx.save();
  if (zak) { const zs = s < 0 ? zl : zl.map(([x, y]) => [2 * C - x, y]); ctx.beginPath(); ctx.moveTo(-500, -500); ctx.lineTo(900, -500); ctx.lineTo(900, 1300); ctx.lineTo(-500, 1300); ctx.closePath(); ctx.moveTo(zs[0][0] + s * 20, zs[0][1] + 6); ctx.lineTo(zs[0][0], zs[0][1]); ctx.lineTo(zs[1][0], zs[1][1]); ctx.lineTo(zs[1][0] - s * 30, zs[1][1] - 2); ctx.lineTo(zs[1][0] - s * 30, 1300); ctx.lineTo(zs[0][0] + s * 20, 1300); ctx.closePath(); ctx.clip('evenodd'); }
  ctx.translate(W[0], W[1]); ctx.rotate(-dir); if (s < 0) ctx.scale(-1, 1);
  _enHand(ctx, P, soort, 1.45 * (P.armK || 1), o.golf || 0); ctx.restore();
  if (zak) { const zs = s < 0 ? zl : zl.map(([x, y]) => [2 * C - x, y]); const bk = lab ? P.topK : P.broekK;
    ctx.fillStyle = lab ? P.topS : P.broekS; ctx.beginPath(); ctx.moveTo(zs[0][0], zs[0][1]); ctx.lineTo(zs[1][0], zs[1][1]); ctx.lineTo(zs[1][0], zs[1][1] + 7); ctx.lineTo(zs[0][0], zs[0][1] + 7); ctx.closePath(); ctx.fill();
    _enLijnStreek(ctx, bk, 1, () => { ctx.moveTo(zs[0][0], zs[0][1]); ctx.lineTo(zs[1][0], zs[1][1]); }); }
  // mouw
  const tk = P.topK, ts = P.topS;
  if (kort) { // T-shirt: korte mouw, blote onderarm
    _enVorm(ctx, () => _enCaps(ctx, E[0], E[1], 20, C2[0] + (W[0] - C2[0]) * 0.6, C2[1] + (W[1] - C2[1]) * 0.6, 17), P.huid, () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(Mx[0] + Math.cos(dir) * s * 10, Mx[1] - Math.sin(dir) * s * 10, 6, 60, -dir, 0, 6.283); ctx.fill(); });
    _enVorm(ctx, () => _enCaps(ctx, S[0], S[1], 32, S[0] + (E[0] - S[0]) * 0.62, S[1] + (E[1] - S[1]) * 0.62, 28), tk, () => { if (P.streep) { ctx.fillStyle = P.streep; for (let yy = 300; yy < 520; yy += 26) { ctx.save(); ctx.translate(S[0], S[1]); ctx.rotate(-Math.atan2(E[0] - S[0], E[1] - S[1])); ctx.fillRect(-60, yy - 330, 120, 11); ctx.restore(); } } });
  } else {
    const cuffK = P.top === 'labjas' ? P.topS : P.top === 'vest' ? P.topS : ts;
    _enVormen(ctx, [() => _enCaps(ctx, S[0], S[1], 30, E[0], E[1], 27), () => _enCaps(ctx, E[0], E[1], 27, Mx[0], Mx[1], P.top === 'labjas' ? 27 : 31), () => _enCaps(ctx, Mx[0], Mx[1], P.top === 'labjas' ? 27 : 31, C2[0], C2[1], 23)], tk,
      () => { ctx.fillStyle = ts; ctx.beginPath(); ctx.ellipse(Mx[0] + Math.cos(dir) * s * 18, Mx[1] - Math.sin(dir) * s * 18, 13, 70, -dir, 0, 6.283); ctx.fill();
        ctx.beginPath(); ctx.ellipse((S[0] + E[0]) / 2 + s * 16, (S[1] + E[1]) / 2, 10, 60, -Math.atan2(E[0] - S[0], E[1] - S[1]), 0, 6.283); ctx.fill(); });
    // plooien bij de elleboog en boven de manchet
    _enLijnStreek(ctx, tk, 0.8, () => { ctx.moveTo(E[0] - s * 14, E[1] - 8); ctx.quadraticCurveTo(E[0], E[1] + 4, E[0] + s * 12, E[1] - 3); ctx.moveTo(C2[0] - Math.cos(dir) * 18, C2[1] + Math.sin(dir) * 18 - 14); ctx.quadraticCurveTo(C2[0], C2[1] - 6, C2[0] + Math.cos(dir) * 12, C2[1] - Math.sin(dir) * 12 - 16); });
    const M2 = [W[0] + (C2[0] - W[0]) * 0.1, W[1] + (C2[1] - W[1]) * 0.1];
    if (P.top === 'truiKraag') { const M3 = [W[0] + (C2[0] - W[0]) * -0.05, W[1] + (C2[1] - W[1]) * -0.05]; _enVorm(ctx, () => _enCaps(ctx, M2[0], M2[1], 17, M3[0], M3[1], 17), P.kraag); }
    _enVorm(ctx, () => _enCaps(ctx, C2[0], C2[1], 21, M2[0], M2[1], 19), cuffK, () => { if (P.top === 'trui' || P.top === 'hoodie' || P.top === 'truiKraag') { ctx.strokeStyle = tk; ctx.lineWidth = 1.6; const px = Math.cos(dir), py = -Math.sin(dir); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(C2[0] + px * i * 7 - Math.sin(dir) * 4, C2[1] + py * i * 7 - Math.cos(dir) * 4); ctx.lineTo(M2[0] + px * i * 7, M2[1] + py * i * 7); ctx.stroke(); } } });
  }
  return { x: W[0] + Math.sin(dir) * 40, y: W[1] + Math.cos(dir) * 40, ang: Math.PI / 2 - dir };
}

function _enBeen(ctx, P, s) { // s = -1 links in beeld, +1 rechts
  const C = _EN_C, lb = P.lb, X = (dx) => C + s * dx * lb, lab = P.top === 'labjas';
  const bin = [[3, 640], [14, 800], [24, 930], [30, 1032]], buit = [[88, 562], [96, 740], [100, 900], [102, 1032]];
  const kl = P.broekK, ks = P.broekS, jeans = P.broek === 'jeans';
  _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(X(buit[0][0]), buit[0][1]); ctx.bezierCurveTo(X(buit[1][0]), buit[1][1], X(buit[2][0]), buit[2][1], X(buit[3][0]), buit[3][1]); ctx.lineTo(X(bin[3][0]), bin[3][1]); ctx.bezierCurveTo(X(bin[2][0]), bin[2][1], X(bin[1][0]), bin[1][1], X(bin[0][0]), bin[0][1]); ctx.closePath(); }, kl,
    () => { ctx.fillStyle = ks; ctx.beginPath(); ctx.moveTo(X(bin[0][0]), bin[0][1]); ctx.bezierCurveTo(X(bin[1][0]), bin[1][1], X(bin[2][0]), bin[2][1], X(bin[3][0]), bin[3][1]); ctx.lineTo(X(bin[3][0] + 24), bin[3][1]); ctx.lineTo(X(bin[0][0] + 20), bin[0][1] + 40); ctx.closePath(); ctx.fill();
      if (jeans) { ctx.strokeStyle = '#C9A35C'; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(X(buit[0][0] - 8), buit[0][1] + 30); ctx.bezierCurveTo(X(buit[1][0] - 8), buit[1][1], X(buit[2][0] - 8), buit[2][1], X(buit[3][0] - 8), buit[3][1]); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
      else { ctx.strokeStyle = ks; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(50), 600); ctx.quadraticCurveTo(X(62), 820, X(66), 1030); ctx.stroke(); } }); // vouw in de pijp
  // knieplooi
  _enLijnStreek(ctx, kl, 0.7, () => { ctx.moveTo(X(40), 818); ctx.quadraticCurveTo(X(58), 826, X(76), 816); });
  const lx = Math.min(X(bin[3][0]), X(buit[3][0])) - 4, rx = Math.max(X(bin[3][0]), X(buit[3][0])) + 4;
  if (P.omslag) _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(lx, 1030); ctx.lineTo(rx, 1030); ctx.lineTo(rx + 2, 1056); ctx.lineTo(lx - 2, 1056); ctx.closePath(); }, P.omslag);
  const vx = X(66), ond = P.omslag ? 1054 : 1032;
  _enVorm(ctx, () => { ctx.beginPath(); ctx.rect(vx - 17, ond, 34, 1088 - ond); }, P.huid);
  if (!P.omslag) _enLijnStreek(ctx, kl, 1, () => { ctx.moveTo(lx, 1032); ctx.lineTo(rx, 1032); });
  _enSchoenVoor(ctx, P, vx, s);
}
function _enSchoenVoor(ctx, P, vx, s) {
  const z = s, sc = P.schoenK, ss = P.schoenS;
  if (P.schoen === 'sneaker') {
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(vx - 30, 1080); ctx.quadraticCurveTo(vx, 1068, vx + 28, 1080); ctx.quadraticCurveTo(vx + 34 + z * 14, 1100, vx + 40 + z * 22, 1128); ctx.lineTo(vx - 40 + z * 22, 1132); ctx.quadraticCurveTo(vx - 38, 1100, vx - 30, 1080); ctx.closePath(); }, sc,
      () => { ctx.fillStyle = ss; ctx.fillRect(vx - 60, 1118, 130, 16); ctx.strokeStyle = ss; ctx.lineWidth = 2.2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(vx - 12 + z * i * 3, 1086 + i * 8); ctx.lineTo(vx + 12 + z * i * 3, 1086 + i * 8); ctx.stroke(); } });
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(vx - 46 + z * 22, 1128); ctx.lineTo(vx + 46 + z * 22, 1124); ctx.quadraticCurveTo(vx + 50 + z * 22, 1146, vx + 36 + z * 22, 1148); ctx.lineTo(vx - 38 + z * 22, 1150); ctx.quadraticCurveTo(vx - 50 + z * 22, 1146, vx - 46 + z * 22, 1128); ctx.closePath(); }, '#E2D9CE');
  } else { // instapper of leren schoen: laag, glanzende neus, smalle zool
    const leer = P.schoen === 'leer';
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(vx - 24, 1086); ctx.quadraticCurveTo(vx, 1080, vx + 24, 1086); ctx.quadraticCurveTo(vx + 36 + z * 16, 1110, vx + 42 + z * 22, 1136); ctx.quadraticCurveTo(vx + z * 22, 1150, vx - 42 + z * 22, 1140); ctx.quadraticCurveTo(vx - 34, 1110, vx - 24, 1086); ctx.closePath(); }, sc,
      () => { ctx.fillStyle = ss; ctx.fillRect(vx - 70, 1136, 150, 20); ctx.fillStyle = _licht(sc, 0.25); ctx.beginPath(); ctx.ellipse(vx + z * 20, 1112, 10, 5, z * 0.4, 0, 6.283); ctx.fill();
        if (leer) { ctx.strokeStyle = ss; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx - 12, 1094); ctx.lineTo(vx + 12, 1094); ctx.moveTo(vx - 10, 1102); ctx.lineTo(vx + 10, 1102); ctx.stroke(); } });
  }
}

function _enRomp(ctx, P, adem) {
  const C = _EN_C, sw = 101 * P.sb, hw = 88 * P.hb, nw = 31 * P.kop;
  const lab = P.top === 'labjas', yHem = lab ? 770 : P.top === 'vest' ? 585 : 548;
  const vul = lab ? P.binnen : P.top === 'vest' ? P.binnen : P.topK, sch = lab ? P.binnenS : P.top === 'vest' ? P.binnenS : P.topS;
  const pad = (yh = yHem, uit = 0) => { ctx.beginPath(); ctx.moveTo(C - nw, 296); ctx.bezierCurveTo(C - nw - 35, 300, C - sw + 8, 304, C - sw, 334); ctx.bezierCurveTo(C - sw + 6, 420, C - hw - 2 - uit, 500, C - hw - uit, yh);
    ctx.quadraticCurveTo(C, yh + 12 + adem, C + hw + uit, yh); ctx.bezierCurveTo(C + hw + 2 + uit, 500, C + sw - 6, 420, C + sw, 334); ctx.bezierCurveTo(C + sw - 8, 304, C + nw + 35, 300, C + nw, 296); ctx.quadraticCurveTo(C, 314, C - nw, 296); ctx.closePath(); };
  // basis: het kledingstuk zelf, of het shirt/de top eronder bij vest en labjas
  _enVorm(ctx, () => pad(lab ? 600 : yHem), vul, () => {
    ctx.fillStyle = sch; ctx.beginPath(); ctx.moveTo(C + sw * 0.55, 330); ctx.quadraticCurveTo(C + sw, 420, C + hw - 6, 552); ctx.lineTo(C + sw + 20, 600); ctx.lineTo(C + sw + 20, 330); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(C - sw * 0.88, 360); ctx.quadraticCurveTo(C - sw * 0.66, 450, C - hw * 0.9, 548); ctx.lineTo(C - sw - 20, 548); ctx.lineTo(C - sw - 20, 360); ctx.closePath(); ctx.fill();
    if (P.top === 'trui' || P.top === 'hoodie' || P.top === 'truiKraag') { ctx.fillStyle = sch; ctx.fillRect(C - sw - 20, yHem - 20, 2 * sw + 40, 30); ctx.strokeStyle = vul; ctx.lineWidth = 1.5; for (let xx = C - hw + 6; xx < C + hw; xx += 9) { ctx.beginPath(); ctx.moveTo(xx, yHem - 16); ctx.lineTo(xx, yHem + 8); ctx.stroke(); } }
    if (P.top === 'streep') { ctx.fillStyle = P.streep; for (let yy = 352; yy < 560; yy += 30) ctx.fillRect(C - sw - 20, yy, 2 * sw + 40, 12); ctx.fillStyle = _enHex(_mix(P.topK, 0.25, '#000000')); ctx.globalAlpha = 0.25; ctx.fillRect(C + sw * 0.6, 330, sw, 260); ctx.globalAlpha = 1; }
    if (P.top === 'hoodie') { // buidelzak
      ctx.fillStyle = sch; ctx.beginPath(); ctx.moveTo(C - 62, 470); ctx.lineTo(C + 62, 470); ctx.lineTo(C + 78, 534); ctx.lineTo(C - 78, 534); ctx.closePath(); ctx.fill(); }
    if (P.top === 'vest' || lab) { // knoopsluiting van het shirt / plooi van de top
      ctx.strokeStyle = sch; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(C + 2, 320); ctx.lineTo(C + 2, 600); ctx.stroke(); if (!lab) for (let i = 0; i < 4; i++) { ctx.fillStyle = sch; ctx.beginPath(); ctx.arc(C + 6, 360 + i * 50, 3, 0, 6.283); ctx.fill(); } }
  });
  if (P.top === 'hoodie') { _enLijnStreek(ctx, P.topK, 0.9, () => { ctx.moveTo(C - 62, 470); ctx.lineTo(C + 62, 470); ctx.moveTo(C - 62, 470); ctx.lineTo(C - 78, 534); ctx.moveTo(C + 62, 470); ctx.lineTo(C + 78, 534); }); }
  // open vest of labjas: twee panden over de basis
  if (P.top === 'vest' || lab) {
    const tk = P.topK, ts = P.topS, yh = yHem;
    for (const s of [-1, 1]) {
      _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C + s * nw * 0.8, 298); ctx.bezierCurveTo(C + s * (nw + 35), 300, C + s * (sw - 8), 304, C + s * sw, 334); ctx.bezierCurveTo(C + s * (sw - 6), 420, C + s * (hw + (lab ? 14 : 2)), 520, C + s * (hw + (lab ? 22 : 4)), yh);
          ctx.lineTo(C + s * (lab ? 26 : 10), yh + (lab ? 0 : 6)); ctx.lineTo(C + s * (lab ? 20 : 12), lab ? 470 : 420); ctx.quadraticCurveTo(C + s * (lab ? 40 : 30), 340, C + s * nw * 0.8, 298); ctx.closePath(); }, tk,
        () => { ctx.fillStyle = ts; if (s > 0) { ctx.beginPath(); ctx.moveTo(C + sw * 0.55, 330); ctx.quadraticCurveTo(C + sw, 440, C + hw + 20, yh); ctx.lineTo(C + sw + 40, yh); ctx.lineTo(C + sw + 40, 330); ctx.closePath(); ctx.fill(); }
          if (lab) { ctx.fillStyle = ts; ctx.beginPath(); ctx.moveTo(C + s * 22, 470); ctx.quadraticCurveTo(C + s * 48, 400, C + s * nw * 0.9, 300); ctx.lineTo(C + s * (nw * 0.9 + 14), 300); ctx.quadraticCurveTo(C + s * 64, 400, C + s * 34, 474); ctx.closePath(); ctx.fill(); } // revers
          else { ctx.strokeStyle = ts; ctx.lineWidth = 1.5; for (let yy = yh - 18; yy < yh; yy += 6) { ctx.beginPath(); ctx.moveTo(C + s * 10, yy); ctx.lineTo(C + s * (hw + 6), yy); ctx.stroke(); } } });
      if (lab) { // jaszak
        _enLijnStreek(ctx, tk, 0.9, () => { ctx.moveTo(C + s * 34, 640); ctx.lineTo(C + s * 104, 646); ctx.lineTo(C + s * 104, 718); ctx.lineTo(C + s * 38, 714); ctx.closePath(); }); }
      else { for (let i = 0; i < 4; i++) { ctx.fillStyle = ts; ctx.beginPath(); ctx.arc(C + s * 18, 440 + i * 36, 4, 0, 6.283); ctx.fill(); } }
    }
  }
}

function _enHaarAchter(ctx, P, o, t) {
  const C = _EN_C, knik = o.knik || 0, kant = Math.sin(t * 0.7 + (P.naam.length)) * 0.025 + (o.kantel || 0);
  ctx.save(); ctx.translate(C, 262); ctx.rotate(kant); ctx.scale(P.kop, P.kop); ctx.translate(-C, -262 + knik * 3);
    if (P.kapsel === 'puff') { const pv = Math.sin(t * 1.6 - 0.6) * 1.5 + knik * 6, puff = []; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; puff.push([C - 41 + Math.cos(a) * 46 + pv * 0.3, 88 + Math.sin(a) * 40 + pv, 24 + (i % 3) * 3]); } puff.push([C - 41, 88 + pv, 44]);
      _enUnie(ctx, puff, P.haar); ctx.strokeStyle = P.haarL; ctx.lineWidth = 2.2; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + 0.3, r = 30 + (i % 2) * 10; ctx.beginPath(); ctx.arc(C - 41 + Math.cos(a) * r, 88 + pv + Math.sin(a) * r * 0.8, 7, a + 1, a + 3); ctx.stroke(); } }
    if (P.kapsel === 'golf') { // volle golvende massa tot op de schouders
      const rand = (s) => { const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16, yy = 120 + u * 225, w = 64 + Math.sin(Math.min(1, u * 1.3) * 1.57) * 34 + Math.sin(u * 19 + s) * 7; pts.push([C + s * w, yy]); } return pts; };
      _enVorm(ctx, () => { const L = rand(-1), R = rand(1); ctx.beginPath(); ctx.moveTo(C, 96); ctx.quadraticCurveTo(C - 60, 96, L[0][0], L[0][1]); for (const [xx, yy] of L) ctx.lineTo(xx, yy);
          for (let i = 0; i <= 6; i++) { const u = i / 6, xx = L[16][0] + (R[16][0] - L[16][0]) * u; ctx.quadraticCurveTo(xx - 8, 352 + (i % 2) * 10, xx, 345); }
          for (let i = 16; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.quadraticCurveTo(C + 60, 96, C, 96); ctx.closePath(); }, P.haar,
        () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = 2.2; for (let i = 0; i < 12; i++) { const s = i % 2 ? 1 : -1, yy = 170 + Math.floor(i / 2) * 26; ctx.beginPath(); ctx.arc(C + s * (80 + (i % 3) * 5), yy, 12, s > 0 ? 2.0 : -1.1, s > 0 ? 4.2 : 1.1); ctx.stroke(); } }); }
    if (P.kapsel === 'vlecht') { _enVorm(ctx, () => { ctx.beginPath(); ctx.ellipse(C, 196, 74, 98, 0, 0, 6.283); }, P.haar); }
    ctx.restore();
}

function _enHoofdVoor(ctx, P, o, t) {
  const C = _EN_C, knik = o.knik || 0;
  const kant = Math.sin(t * 0.7 + (P.naam.length)) * 0.025 + (o.kantel || 0);
  ctx.save(); ctx.translate(C, 262); ctx.rotate(kant); ctx.scale(P.kop, P.kop); ctx.translate(-C, -262 + knik * 3);
  // oren (+ oorbellen)
  for (const s of [-1, 1]) { _enVorm(ctx, () => { ctx.beginPath(); ctx.ellipse(C + s * 60, 214, 11, 18, s * 0.15, 0, 6.283); }, P.huid, () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(C + s * 62, 216, 5, 10, 0, 0, 6.283); ctx.fill(); });
    if (P.oorbel) { ctx.strokeStyle = P.oorbel; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(C + s * 62, 238, 6, 0, 6.283); ctx.stroke(); } }
  // gezicht (mannen iets hoekiger kaak)
  const kaak = P.baard || P.kapsel === 'kortRommel' ? 6 : 0;
  _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C, 112); ctx.bezierCurveTo(C + 43, 112, C + 61, 150, C + 59, 196); ctx.bezierCurveTo(C + 57 + kaak, 236, C + 33 + kaak, 268, C, 272); ctx.bezierCurveTo(C - 33 - kaak, 268, C - 57 - kaak, 236, C - 59, 196); ctx.bezierCurveTo(C - 61, 150, C - 43, 112, C, 112); ctx.closePath(); }, P.huid,
    () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(C + 55, 210, 18, 60, 0.1, 0, 6.283); ctx.fill(); });
  // baard
  if (P.baard) { _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 56, 214); ctx.bezierCurveTo(C - 54, 258, C - 30, 282, C, 286); ctx.bezierCurveTo(C + 30, 282, C + 54, 258, C + 56, 214); ctx.bezierCurveTo(C + 46, 236, C + 30, 244, C + 18, 238); ctx.quadraticCurveTo(C, 232, C - 18, 238); ctx.bezierCurveTo(C - 30, 244, C - 46, 236, C - 56, 214); ctx.closePath(); }, P.baard);
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 24, 242); ctx.quadraticCurveTo(C, 232, C + 24, 242); ctx.quadraticCurveTo(C, 240, C - 24, 242); ctx.closePath(); }, P.baard); }
  // haar vóór (haarkap, pony, rommelig)
  if (P.kapsel === 'puff' || P.kapsel === 'vlecht') {
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 61, 200); ctx.bezierCurveTo(C - 71, 150, C - 51, 104, C, 100); ctx.bezierCurveTo(C + 51, 100, C + 71, 150, C + 61, 200); ctx.bezierCurveTo(C + 55, 168, C + 43, 150, C + 23, 146);
        ctx.quadraticCurveTo(C, 138, C - 23, 146); ctx.bezierCurveTo(C - 43, 150, C - 55, 168, C - 61, 200); ctx.closePath(); }, P.haar,
      () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = 2; for (const [a, b, c2, d] of [[-32, 150, -39, 112], [-2, 140, -21, 104], [29, 148, 7, 104], [51, 172, 33, 114]]) { ctx.beginPath(); ctx.moveTo(C + a, b); ctx.quadraticCurveTo(C + (a + c2) / 2 - 8, (b + d) / 2, C + c2, d); ctx.stroke(); } if (P.kapsel === 'vlecht') { ctx.strokeStyle = P.haarL; ctx.beginPath(); ctx.moveTo(C, 102); ctx.lineTo(C, 140); ctx.stroke(); } });
  }
  if (P.kapsel === 'golf') { // middenscheiding, lokken langs het gezicht
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 58, 250); ctx.quadraticCurveTo(C - 66, 280, C - 60, 312); for (let i = 0; i < 5; i++) ctx.quadraticCurveTo(C - 80 - (i % 2) * 10, 300 - i * 34, C - 84 + (i % 2) * 4, 282 - i * 36);
      ctx.bezierCurveTo(C - 84, 130, C - 50, 98, C, 100); ctx.bezierCurveTo(C + 50, 98, C + 84, 130, C + 84, 138); for (let i = 4; i >= 0; i--) ctx.quadraticCurveTo(C + 80 + (i % 2) * 10, 300 - i * 34 - 30, C + 84 - (i % 2) * 4, 282 - i * 36 + 36);
      ctx.quadraticCurveTo(C + 66, 280, C + 58, 250); ctx.bezierCurveTo(C + 60, 190, C + 46, 158, C + 6, 132); ctx.lineTo(C, 120); ctx.lineTo(C - 6, 132); ctx.bezierCurveTo(C - 46, 158, C - 60, 190, C - 58, 250); ctx.closePath(); }, P.haar,
      () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(C - 8, 132); ctx.quadraticCurveTo(C - 40, 150, C - 54, 200); ctx.moveTo(C + 8, 132); ctx.quadraticCurveTo(C + 40, 150, C + 54, 200); ctx.stroke(); }); }
  if (P.kapsel === 'pony') { // steil zwart met pony tot de wenkbrauwen, puntjes
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 64, 214); ctx.bezierCurveTo(C - 76, 140, C - 50, 92, C, 92); ctx.bezierCurveTo(C + 50, 92, C + 78, 140, C + 64, 214); ctx.lineTo(C + 56, 200); ctx.lineTo(C + 54, 178);
        for (let i = 0; i <= 8; i++) { const xx = C + 50 - i * 12.5, yy = 172 + (i % 2) * 10 - Math.abs(i - 4) * 1.5; ctx.lineTo(xx, yy); } ctx.lineTo(C - 56, 182); ctx.lineTo(C - 58, 204); ctx.closePath(); }, P.haar,
      () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(C - 40 + i * 16, 110); ctx.quadraticCurveTo(C - 46 + i * 16, 140, C - 44 + i * 17, 168); ctx.stroke(); } }); }
  if (P.kapsel === 'kortRommel') { // kort, rossig, rommelige kuif
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 62, 196); ctx.bezierCurveTo(C - 72, 140, C - 56, 98, C - 20, 86); ctx.lineTo(C - 6, 72); ctx.lineTo(C + 6, 86); ctx.lineTo(C + 22, 74); ctx.lineTo(C + 30, 92); ctx.bezierCurveTo(C + 66, 106, C + 72, 150, C + 62, 196);
        ctx.bezierCurveTo(C + 58, 168, C + 50, 150, C + 34, 146); ctx.lineTo(C + 22, 154); ctx.lineTo(C + 10, 142); ctx.lineTo(C - 4, 152); ctx.lineTo(C - 16, 140); ctx.lineTo(C - 30, 150); ctx.bezierCurveTo(C - 48, 152, C - 58, 168, C - 62, 196); ctx.closePath(); }, P.haar,
      () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = 2.4; for (const [a, b] of [[-30, 120], [-8, 104], [14, 110], [36, 124]]) { ctx.beginPath(); ctx.moveTo(C + a, b + 24); ctx.quadraticCurveTo(C + a + 4, b + 6, C + a + 14, b); ctx.stroke(); } }); }
  if (P.kapsel === 'kortKrul') { // kort gemillimeterd, strakke haarlijn
    _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 61, 186); ctx.bezierCurveTo(C - 68, 130, C - 46, 98, C, 98); ctx.bezierCurveTo(C + 46, 98, C + 68, 130, C + 61, 186); ctx.bezierCurveTo(C + 56, 160, C + 50, 140, C + 36, 136); ctx.quadraticCurveTo(C, 126, C - 36, 136); ctx.bezierCurveTo(C - 50, 140, C - 56, 160, C - 61, 186); ctx.closePath(); }, P.haar,
      () => { ctx.fillStyle = P.haarL; for (let i = 0; i < 30; i++) { const a = i * 2.4, r = 20 + (i * 7) % 34; ctx.beginPath(); ctx.arc(C + Math.cos(a) * r, 122 + Math.sin(a) * r * 0.4, 2, 0, 6.283); ctx.fill(); } }); }
  // gezicht: wenkbrauwen, ogen, neus, mond
  const knip = (o.knipper != null ? o.knipper : (((t + P.naam.length * 0.7) % 4.2) < 0.13 ? 1 : 0)), verb = o.uit === 'verbaasd' ? 1 : 0, blij = o.uit === 'blij' ? 1 : 0;
  ctx.strokeStyle = P.wenkbrauw; ctx.lineWidth = P.baard ? 6 : 5; ctx.lineCap = 'round';
  if (P.kapsel !== 'pony') for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(C + s * 16, 180 - verb * 6); ctx.quadraticCurveTo(C + s * 30, 172 - verb * 8, C + s * 44, 179 - verb * 5); ctx.stroke(); }
  for (const s of [-1, 1]) { const ex = C + s * 26, ey = 202;
    if (knip || blij) { ctx.strokeStyle = '#1A1210'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 10, ey + (blij ? 2 : 0)); ctx.quadraticCurveTo(ex, ey + (blij ? -6 : 5), ex + 10, ey + (blij ? 2 : 0)); ctx.stroke(); }
    else { ctx.fillStyle = '#1A1210'; ctx.beginPath(); ctx.ellipse(ex, ey, 8.5, 9.5 + verb * 2, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.arc(ex + 2.6, ey - 3, 2.4, 0, 6.283); ctx.fill();
      ctx.strokeStyle = P.huidS; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(ex, ey + 1, 13, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); } }
  if (P.sproeten) { ctx.fillStyle = _enHex(_mix(P.huid, 0.3, '#8A4A22')); for (let i = 0; i < 14; i++) { const s = i % 2 ? 1 : -1, a = i * 1.7; ctx.beginPath(); ctx.arc(C + s * (24 + Math.cos(a) * 12), 222 + Math.sin(a) * 6, 1.8, 0, 6.283); ctx.fill(); } }
  if (P.bril) { ctx.strokeStyle = '#1A1412'; ctx.lineWidth = 3.4; for (const s of [-1, 1]) { ctx.beginPath(); if (P.bril === 'rond') ctx.arc(C + s * 26, 202, 19, 0, 6.283); else { ctx.moveTo(C + s * 8, 190); ctx.lineTo(C + s * 46, 188); ctx.quadraticCurveTo(C + s * 48, 214, C + s * 40, 216); ctx.lineTo(C + s * 12, 216); ctx.quadraticCurveTo(C + s * 6, 214, C + s * 8, 190); } ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(C - 8, 198); ctx.quadraticCurveTo(C, 192, C + 8, 198); ctx.moveTo(C - 45, 198); ctx.lineTo(C - 58, 204); ctx.moveTo(C + 45, 198); ctx.lineTo(C + 58, 204); ctx.stroke(); }
  ctx.strokeStyle = P.huidS; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(C - 4, 214); ctx.quadraticCurveTo(C - 7, 228, C - 11, 233); ctx.quadraticCurveTo(C, 239, C + 11, 233); ctx.stroke();
  const praat = o.praat ? Math.max(0, Math.sin(t * 13) * 0.55 + Math.sin(t * 7.3) * 0.45) : 0;
  const mondY = P.baard ? 250 : 247;
  if (praat > 0.12) { _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 16, mondY + 2); ctx.quadraticCurveTo(C, mondY + 5, C + 16, mondY + 2); ctx.quadraticCurveTo(C, mondY + 5 + praat * 18, C - 16, mondY + 2); ctx.closePath(); }, '#5A2418');
    ctx.fillStyle = '#B5524A'; ctx.beginPath(); ctx.ellipse(C, mondY + 3 + praat * 12, 8 * praat, 3 * praat, 0, 0, 6.283); ctx.fill(); }
  else { ctx.strokeStyle = P.baard ? '#2A1712' : '#5A2418'; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(C - 17 - blij * 3, mondY); ctx.quadraticCurveTo(C, mondY + 11 + blij * 6, C + 17 + blij * 3, mondY - 1); ctx.stroke();
    if (blij) { ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(C - 14, mondY + 2); ctx.quadraticCurveTo(C, mondY + 12, C + 14, mondY + 1); ctx.quadraticCurveTo(C, mondY + 6, C - 14, mondY + 2); ctx.fill(); } }
  ctx.restore();
}

function _enVoor(ctx, P, x, y, h, o) {
  const t = o.t || 0, k = h * P.lengte / 1040, C = _EN_C;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-C, -1150); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const adem = Math.sin(t * 1.6 + P.naam.length) * 1.2;
  let pose = o.pose || 'staan'; if (typeof pose === 'string') pose = POSES_EN[pose] || POSES_EN.staan;
  if (P.top === 'labjas') { /* jas valt over de benen: eerst benen */ }
  // capuchon ligt achter de nek op de schouders
  if (P.top === 'hoodie') _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 70, 300); ctx.quadraticCurveTo(C - 76, 250, C - 40, 240); ctx.lineTo(C + 40, 240); ctx.quadraticCurveTo(C + 76, 250, C + 70, 300); ctx.closePath(); }, P.topS);
  _enHaarAchter(ctx, P, o, t); // haar achter hoofd en romp
  _enBeen(ctx, P, -1); _enBeen(ctx, P, 1);
  if (P.top !== 'labjas' && P.top !== 'vest') { // broekband
    const hw = 88 * P.hb; _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - hw - 4, 548); ctx.lineTo(C + hw + 4, 548); ctx.lineTo(C + hw + 6, 600); ctx.quadraticCurveTo(C, 660, C - hw - 6, 600); ctx.closePath(); }, P.broekK, () => { ctx.fillStyle = P.broekS; ctx.fillRect(C - 120, 575, 240, 6); });
    _enLijnStreek(ctx, P.broekK, 0.8, () => { ctx.moveTo(C + 1, 578); ctx.quadraticCurveTo(C + 5, 615, C - 2, 640); });
    if (P.broek === 'jeans') { for (const bx of [-67, -17, 21, 69]) { ctx.fillStyle = P.broekS; ctx.fillRect(C + bx - 3, 548, 6, 26); } ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.arc(C + 1, 562, 5, 0, 6.283); ctx.fill(); }
  }
  ctx.save(); ctx.translate(0, -adem); _enRomp(ctx, P, adem);
  // plooien in het lijf
  if (P.top !== 'labjas') _enLijnStreek(ctx, P.topK, 0.75, () => { ctx.moveTo(C - 57, 470); ctx.quadraticCurveTo(C - 37, 490, C - 39, 520); ctx.moveTo(C + 43, 450); ctx.quadraticCurveTo(C + 33, 480, C + 45, 512); });
  ctx.restore();
  // vlecht over de schouder (links in beeld)
  if (P.kapsel === 'vlecht') { const sw0 = Math.sin(t * 1.3) * 2, kn = []; for (let i = 0; i < 9; i++) kn.push([C - 40 + Math.sin(i * 0.5) * 6 + sw0 * i * 0.2, 268 + i * 28, 15 - i * 0.6]);
    _enUnie(ctx, kn, P.haar); ctx.strokeStyle = P.haarL; ctx.lineWidth = 2; for (const [xx, yy, r] of kn) { ctx.beginPath(); ctx.arc(xx - 4, yy, r * 0.7, -0.6, 1.4); ctx.stroke(); }
    _enVorm(ctx, () => { ctx.beginPath(); ctx.ellipse(kn[8][0], kn[8][1] + 14, 6, 8, 0, 0, 6.283); }, P.haarL); }
  // stethoscoop om de nek, over de jas
  if (P.stethoscoop) { ctx.strokeStyle = '#2E3442'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(C - 34, 300); ctx.bezierCurveTo(C - 60, 360, C - 66, 420, C - 52, 470); ctx.moveTo(C + 34, 300); ctx.bezierCurveTo(C + 62, 350, C + 64, 400, C + 54, 440); ctx.quadraticCurveTo(C + 46, 470, C + 30, 470); ctx.stroke();
    ctx.fillStyle = '#A9B2BF'; ctx.beginPath(); ctx.arc(C - 52, 478, 10, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#6E7786'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#2E3442'; ctx.beginPath(); ctx.arc(C + 28, 470, 5, 0, 6.283); ctx.fill(); }
  // armen
  const L = _enArm(ctx, P, -1, pose.L, o), R = _enArm(ctx, P, 1, pose.R, o);
  // notitieboekje (Kenji) in de vrije hand als hij staat
  if (o.boek) { ctx.save(); ctx.translate(R.x - 30, R.y - 60); ctx.rotate(-0.08); _enVorm(ctx, () => { ctx.beginPath(); ctx.rect(-36, -50, 72, 100); }, '#23324F', () => { ctx.fillStyle = '#E9E1D0'; ctx.fillRect(30, -46, 5, 92); }); ctx.restore(); }
  // hals en kraag
  ctx.save(); ctx.translate(0, -adem * 0.6);
  const nw = 23 * P.kop;
  _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - nw, 250); ctx.lineTo(C + nw, 250); ctx.lineTo(C + nw + 4, 300); ctx.quadraticCurveTo(C, 312, C - nw - 4, 300); ctx.closePath(); }, P.huid, () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(C, 262, 30, 18, 0, 0, 6.283); ctx.fill(); });
  if (P.top === 'truiKraag') { for (const s of [-1, 1]) _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C + s * 4, 312); ctx.lineTo(C + s * 36, 286); ctx.lineTo(C + s * 40, 304); ctx.lineTo(C + s * 18, 326); ctx.closePath(); }, P.kraag, () => { ctx.fillStyle = P.kraagS; ctx.fillRect(C + s * 20 - 10, 300, 20, 30); }); }
  if (P.top === 'vest') { for (const s of [-1, 1]) _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C + s * 2, 318); ctx.lineTo(C + s * 32, 288); ctx.lineTo(C + s * 38, 310); ctx.lineTo(C + s * 16, 334); ctx.closePath(); }, P.binnen, () => { ctx.fillStyle = P.binnenS; ctx.fillRect(C + s * 20 - 10, 306, 20, 30); }); }
  if (P.top === 'labjas') _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 30, 296); ctx.lineTo(C, 360); ctx.lineTo(C + 30, 296); ctx.quadraticCurveTo(C, 306, C - 30, 296); ctx.closePath(); }, P.huid);
  if (P.top === 'trui' || P.top === 'truiKraag' || P.top === 'streep' || P.top === 'hoodie') _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(C - 35, 294); ctx.quadraticCurveTo(C, 322, C + 35, 294); ctx.quadraticCurveTo(C + 39, 306, C + 33, 308); ctx.quadraticCurveTo(C, 334, C - 33, 308); ctx.quadraticCurveTo(C - 39, 304, C - 35, 294); ctx.closePath(); }, P.top === 'streep' ? P.topK : P.topS);
  if (P.top === 'hoodie') { ctx.strokeStyle = _licht(P.topK, 0.45); ctx.lineWidth = 3; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(C + s * 16, 320); ctx.quadraticCurveTo(C + s * 20, 360, C + s * 17, 400); ctx.stroke(); ctx.fillStyle = _licht(P.topK, 0.45); ctx.beginPath(); ctx.arc(C + s * 17, 404, 4, 0, 6.283); ctx.fill(); } }
  _enHoofdVoor(ctx, P, o, t);
  ctx.restore();
  ctx.restore();
  const m = (q) => ({ x: x + (q.x - C) * k, y: y + (q.y - 1150) * k });
  return { hoofd: { x, y: y + (192 - 1150) * k, r: 70 * k }, handL: m(L), handR: m(R) };
}

// ---------- zijaanzicht (lopen, rennen, staan) ----------
function _enZij(ctx, P, x, y, h0, o) {
  const t = o.t || 0, h = h0 * P.lengte, G = o.gang ? GANG[o.gang] : null, hh = h / 6.5, top = y - h, voetY = y, kijk = o.kijk || 1;
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (kijk < 0) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
  const fEff = G ? G.f * (o.tempo || 1) : 1, fase = G ? t * fEff : 0, fi = fase * 6.2832, fr = (q) => ((q % 1) + 1) % 1;
  const heupY0 = top + hh * 3.05, Lb = voetY - heupY0 - hh * 0.2, L1 = Lb * 0.5, L2 = Lb * 0.5;
  // voetstand iets rustiger dan de ruwe cyclus (Kamiel 25 okt 2026: 'de voeten wijzen erg omhoog'): bij hielcontact en in de zwaaifase hooguit 8° tenen omhoog,
  // en in de zwaaifase hooguit 40° tenen omlaag; de grote sneakers maakten de echte hoeken te opvallend
  const rustig = (B) => { if (!G) return B; const D = 180 / Math.PI, fa = B.fA * D; let ex = 0;
    if (B.p >= G.duty && fa < -40) ex = -40 - fa; else if (B.p >= G.duty && fa > 8) ex = 8 - fa; else if (B.p < 0.1 && fa > 8) ex = 8 - fa; else if (B.p < G.duty && B.p > G.duty - 0.12 && fa < -30) ex = -30 - fa;
    return ex ? _beenPose(G, B.p, L1, L2, hh, ex) : B; };
  let B1 = rustig(_beenPose(G, fr(fase), L1, L2, hh)), B2 = rustig(_beenPose(G, fr(fase + 0.5), L1, L2, hh));
  let heupY;
  if (!G) heupY = voetY - Math.max(B1.low, B2.low);
  else { const duty = G.duty, steun = (B) => B.p < duty;
    if (steun(B1) || steun(B2)) heupY = Math.min(steun(B1) ? voetY - B1.low : 1e9, steun(B2) ? voetY - B2.low : 1e9);
    else { const L = B1.p >= duty && B1.p < 0.5 ? B1 : B2, Tf = (0.5 - duty) / fEff, tau = (L.p - duty) / fEff;
      const yTO = voetY - _beenPose(G, duty, L1, L2, hh).low, yIC = voetY - _beenPose(G, 0, L1, L2, hh).low, g = 9.81 * (h / 1.7) * (G.zweef || 1);
      heupY = yTO + (yIC - yTO) * tau / Tf - 0.5 * g * tau * (Tf - tau); }
    for (const k of [1, 2]) { let B = k === 1 ? B1 : B2; if (!steun(B)) for (let e = 0, ex0 = (B.fA - _beenPose(G, B.p, L1, L2, hh).fA) * 180 / Math.PI; e < 10 && heupY + B.low > voetY - hh * 0.03; e++) B = _beenPose(G, B.p, L1, L2, hh, ex0 + (e + 1) * 5); if (k === 1) B1 = B; else B2 = B; } }
  // vooruit: x is het startpunt, de steunvoet blijft staan
  let cx = x;
  if (G && o.vooruit) { const sEnd = Math.min(G.duty, 0.5), c0 = _beenPose(G, 0, L1, L2, hh).ballX, v = (c0 - _beenPose(G, sEnd, L1, L2, hh).ballX) * fEff / sEnd;
    const S = [B1, B2].filter(B => B.p < sEnd).sort((p, q) => p.p - q.p)[0]; cx = x + v * t + (S ? (c0 - S.ballX) - v * S.p / fEff : 0); }
  const dy = heupY - heupY0, lean = G ? G.leun * Math.PI / 180 : 0;
  const rot = (px, py) => { const dx = px - cx, d2 = py - heupY; return [cx + dx * Math.cos(lean) - d2 * Math.sin(lean), heupY + dx * Math.sin(lean) + d2 * Math.cos(lean)]; };
  const LW0 = _EN_LW; _EN_LW = LW0 * hh / 160 * 1.0;
  const lab = P.top === 'labjas', kort = P.top === 'streep';
  const tekenBeen = (B, ver) => {
    const hx = cx - hh * 0.04, K = [hx + B.kx, heupY + B.ky], A = [hx + B.ax, heupY + B.ay];
    const jn = ver ? _enVer(P.broekK) : P.broekK, js = ver ? _enVer(P.broekS) : P.broekS, hu = ver ? _enVer(P.huid) : P.huid;
    _enVormen(ctx, [() => _enCaps(ctx, hx, heupY, hh * 0.3, K[0], K[1], hh * 0.24), () => _enCaps(ctx, K[0], K[1], hh * 0.24, K[0] + (A[0] - K[0]) * 0.92, K[1] + (A[1] - K[1]) * 0.92, hh * 0.22)], jn,
      () => { ctx.fillStyle = js; ctx.beginPath(); ctx.ellipse((hx + K[0]) / 2 - hh * 0.18, (heupY + K[1]) / 2, hh * 0.1, hh * 0.55, B.th, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse((K[0] + A[0]) / 2 - hh * 0.15, (K[1] + A[1]) / 2, hh * 0.08, hh * 0.5, B.sa, 0, 6.283); ctx.fill(); });
    if (P.omslag) _enVorm(ctx, () => _enCaps(ctx, K[0] + (A[0] - K[0]) * 0.86, K[1] + (A[1] - K[1]) * 0.86, hh * 0.23, K[0] + (A[0] - K[0]) * 0.97, K[1] + (A[1] - K[1]) * 0.97, hh * 0.23), ver ? _enVer(P.omslag) : P.omslag);
    _enVorm(ctx, () => _enCaps(ctx, K[0] + (A[0] - K[0]) * 0.94, K[1] + (A[1] - K[1]) * 0.94, hh * 0.12, A[0], A[1], hh * 0.12), hu);
    ctx.save(); ctx.translate(A[0], A[1]); ctx.rotate(-B.fA);
    const sc = ver ? _enVer(P.schoenK) : P.schoenK, ss = ver ? _enVer(P.schoenS) : P.schoenS;
    if (P.schoen === 'sneaker') {
      _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(-hh * 0.2, -hh * 0.14); ctx.quadraticCurveTo(-hh * 0.32, hh * 0.05, -hh * 0.24, hh * 0.18); ctx.lineTo(hh * 0.58, hh * 0.18); ctx.quadraticCurveTo(hh * 0.68, hh * 0.12, hh * 0.6, hh * 0.04); ctx.quadraticCurveTo(hh * 0.38, -hh * 0.06, hh * 0.18, -hh * 0.1); ctx.quadraticCurveTo(0, -hh * 0.18, -hh * 0.2, -hh * 0.14); ctx.closePath(); }, sc,
        () => { ctx.strokeStyle = ss; ctx.lineWidth = hh * 0.025; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(hh * (0.05 + i * 0.08), -hh * (0.1 - i * 0.03)); ctx.lineTo(hh * (0.12 + i * 0.08), hh * 0.02); ctx.stroke(); } });
      _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(-hh * 0.27, hh * 0.15); ctx.lineTo(hh * 0.62, hh * 0.15); ctx.quadraticCurveTo(hh * 0.68, hh * 0.24, hh * 0.56, hh * 0.25); ctx.lineTo(-hh * 0.22, hh * 0.25); ctx.quadraticCurveTo(-hh * 0.32, hh * 0.22, -hh * 0.27, hh * 0.15); ctx.closePath(); }, ver ? _enVer('#E2D9CE') : '#E2D9CE');
    } else {
      _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(-hh * 0.18, -hh * 0.08); ctx.quadraticCurveTo(-hh * 0.28, hh * 0.08, -hh * 0.22, hh * 0.2); ctx.lineTo(hh * 0.6, hh * 0.2); ctx.quadraticCurveTo(hh * 0.7, hh * 0.14, hh * 0.58, hh * 0.04); ctx.quadraticCurveTo(hh * 0.3, -hh * 0.02, hh * 0.12, -hh * 0.04); ctx.closePath(); }, sc,
        () => { ctx.fillStyle = ss; ctx.fillRect(-hh * 0.4, hh * 0.15, hh * 1.2, hh * 0.08); });
    }
    ctx.restore(); };
  const thMin = G ? Math.min(...G.th.map(q => q[1])) : 0, thMax = G ? Math.max(...G.th.map(q => q[1])) : 1;
  const tekenArm = (B, ver) => { let u, e; const D = Math.PI / 180;
    if (G) { const th = B.th / D + (G.kantel || 0), v = 1 - (th - thMin) / (thMax - thMin), w = v * v * (3 - 2 * v); u = (G.arm[0] + (G.arm[1] - G.arm[0]) * w) * D; e = (G.elle[0] + (G.elle[1] - G.elle[0]) * w) * D; }
    else { u = ver ? -0.04 : 0.04; e = 0.12; if (!ver && o.pose === 'wijs') { u = 1.35; e = 0.1; } }
    const [sx, sy] = rot(cx + hh * 0.02, top + hh * 1.32 + dy), A1 = hh * 0.92 * P.armK, A2 = hh * 1.0 * P.armK;
    const ex = sx + Math.sin(u + lean) * A1, ey = sy + Math.cos(u + lean) * A1, f = u + lean + e, wx = ex + Math.sin(f) * A2, wy = ey + Math.cos(f) * A2;
    const tk = ver ? _enVer(P.topK) : P.topK, ts = ver ? _enVer(P.topS) : P.topS, hu = ver ? _enVer(P.huid) : P.huid;
    const Hc = [wx + Math.sin(f) * hh * 0.14, wy + Math.cos(f) * hh * 0.14];
    _enVorm(ctx, () => { ctx.beginPath(); ctx.ellipse(Hc[0], Hc[1], hh * 0.12, hh * 0.18, -f, 0, 6.283); }, hu);
    _enLijnStreek(ctx, P.huid, 0.6, () => { ctx.moveTo(Hc[0] + Math.cos(f) * hh * 0.05, Hc[1] - Math.sin(f) * hh * 0.05); ctx.lineTo(Hc[0] + Math.cos(f) * hh * 0.04 + Math.sin(f) * hh * 0.1, Hc[1] - Math.sin(f) * hh * 0.04 + Math.cos(f) * hh * 0.1); });
    const cX = ex + (wx - ex) * 0.84, cY = ey + (wy - ey) * 0.84;
    if (kort) { _enVorm(ctx, () => _enCaps(ctx, ex, ey, hh * 0.12, wx, wy, hh * 0.1), hu); _enVorm(ctx, () => _enCaps(ctx, sx, sy, hh * 0.2, sx + (ex - sx) * 0.6, sy + (ey - sy) * 0.6, hh * 0.18), tk); }
    else { _enVormen(ctx, [() => _enCaps(ctx, sx, sy, hh * 0.19, ex, ey, hh * 0.18), () => _enCaps(ctx, ex, ey, hh * 0.18, cX, cY, hh * 0.19)], tk,
        () => { ctx.fillStyle = ts; ctx.beginPath(); ctx.ellipse((ex + cX) / 2 - Math.cos(f) * hh * 0.1, (ey + cY) / 2 + Math.sin(f) * hh * 0.1, hh * 0.08, hh * 0.5, -f, 0, 6.283); ctx.fill(); });
      _enLijnStreek(ctx, P.topK, 0.7, () => { ctx.moveTo(ex - Math.cos(f) * hh * 0.12, ey + Math.sin(f) * hh * 0.12); ctx.quadraticCurveTo(ex + Math.sin(f) * hh * 0.05, ey + Math.cos(f) * hh * 0.05, ex + Math.cos(f) * hh * 0.1, ey - Math.sin(f) * hh * 0.1); });
      _enVorm(ctx, () => _enCaps(ctx, cX, cY, hh * 0.13, wx, wy, hh * 0.12), lab ? ts : ts); }
  };
  tekenBeen(B2, true); tekenArm(B2, true);
  _enVorm(ctx, () => { const [px, py] = rot(cx - hh * 0.06, heupY - hh * 0.05); ctx.beginPath(); ctx.ellipse(px, py, hh * 0.42, hh * 0.36, lean, 0, 6.283); }, P.broekK);
  tekenBeen(B1, false);
  // romp: zijkant van het kledingstuk (labjas lang, vest iets langer)
  const sY = top + hh * 1.25 + dy, onder = heupY + hh * (lab ? 0.95 : P.top === 'vest' ? 0.05 : -0.2);
  const pts = [[cx - hh * 0.32, sY + hh * 0.05], [cx - hh * 0.46, sY + hh * 0.7], [cx - hh * 0.4, onder - hh * 0.4], [cx - hh * (lab ? 0.5 : 0.44), onder], [cx + hh * (lab ? 0.48 : 0.38), onder], [cx + hh * 0.36, onder - hh * 0.5], [cx + hh * 0.48, sY + hh * 0.75], [cx + hh * 0.3, sY + hh * 0.02], [cx, sY - hh * 0.08]].map(q => rot(q[0], q[1]));
  const rompPad = () => { const Q = pts; ctx.beginPath(); ctx.moveTo(Q[0][0], Q[0][1]); ctx.quadraticCurveTo(Q[1][0], Q[1][1], Q[2][0], Q[2][1]); ctx.quadraticCurveTo(Q[3][0], Q[3][1] - hh * 0.1, Q[3][0], Q[3][1]); ctx.lineTo(Q[4][0], Q[4][1]); ctx.quadraticCurveTo(Q[5][0], Q[5][1], Q[6][0], Q[6][1]); ctx.quadraticCurveTo(Q[7][0], Q[7][1], Q[8][0], Q[8][1]); ctx.quadraticCurveTo(Q[8][0] - hh * 0.2, Q[8][1], Q[0][0], Q[0][1]); ctx.closePath(); };
  if (P.top === 'hoodie') _enVorm(ctx, () => { const [px, py] = rot(cx - hh * 0.3, sY - hh * 0.05); ctx.beginPath(); ctx.ellipse(px, py, hh * 0.24, hh * 0.3, lean - 0.3, 0, 6.283); }, P.topS); // capuchon op de rug
  _enVorm(ctx, rompPad, P.topK, () => { const [bx, by] = rot(cx - hh * 0.5, sY + hh * 0.9); ctx.fillStyle = P.topS; ctx.beginPath(); ctx.ellipse(bx, by, hh * 0.18, hh * 1.2, lean, 0, 6.283); ctx.fill();
    if (P.streep) { ctx.fillStyle = P.streep; for (let yy = sY + hh * 0.3; yy < onder; yy += hh * 0.19) { const [qx, qy] = rot(cx, yy); ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-hh, 0, hh * 2, hh * 0.075); ctx.restore(); } }
    if (P.top === 'trui' || P.top === 'hoodie' || P.top === 'truiKraag') { const [qx, qy] = rot(cx, onder - hh * 0.12); ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-hh, -hh * 0.02, hh * 2, hh * 0.14); ctx.restore(); }
    if (P.top === 'vest' || lab) { const [p1x, p1y] = rot(cx + hh * 0.3, sY + hh * 0.05), [p2x, p2y] = rot(cx + hh * (lab ? 0.42 : 0.36), onder); ctx.strokeStyle = P.binnen; ctx.lineWidth = hh * 0.16; ctx.beginPath(); ctx.moveTo(p1x + hh * 0.08, p1y); ctx.lineTo(p2x + hh * 0.06, p2y); ctx.stroke(); }
    if (P.top === 'hoodie') { const [qx, qy] = rot(cx + hh * 0.12, sY + hh * 1.2); ctx.fillStyle = P.topS; ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-hh * 0.05, 0, hh * 0.38, hh * 0.38); ctx.restore(); } });
  if (P.kapsel === 'vlecht') { const [nx2, ny2] = rot(cx - hh * 0.16, sY - hh * 0.25); const kn = []; const zw = G ? Math.sin(fi * 2 - 1) * 0.12 : 0; for (let i = 0; i < 8; i++) kn.push([nx2 - hh * 0.04 * i * Math.sin(lean + zw) - hh * 0.02 * i, ny2 + hh * 0.17 * i * Math.cos(lean + zw), hh * (0.09 - i * 0.004)]); _enUnie(ctx, kn, P.haar); }
  if (P.stethoscoop) { const [ax2, ay2] = rot(cx + hh * 0.15, sY - hh * 0.05), [bx2, by2] = rot(cx + hh * 0.38, sY + hh * 0.9); ctx.strokeStyle = '#2E3442'; ctx.lineWidth = hh * 0.035; ctx.beginPath(); ctx.moveTo(ax2, ay2); ctx.quadraticCurveTo(ax2 + hh * 0.3, (ay2 + by2) / 2, bx2, by2); ctx.stroke(); ctx.fillStyle = '#A9B2BF'; ctx.beginPath(); ctx.arc(bx2, by2 + hh * 0.05, hh * 0.06, 0, 6.283); ctx.fill(); }
  tekenArm(B1, false);
  // hals en hoofd (profiel, kijkt naar rechts)
  const [nx, ny] = rot(cx + hh * 0.06, sY - hh * 0.02), Vk = hh * 0.62, kp = P.kop, hx = nx + Math.sin(lean) * Vk + hh * 0.04, hy = ny - Math.cos(lean) * Vk;
  _enVorm(ctx, () => _enCaps(ctx, nx, ny + hh * 0.05, hh * 0.15, hx - hh * 0.02, hy + hh * 0.32 * kp, hh * 0.15), P.huid);
  if (P.top === 'truiKraag') _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(nx - hh * 0.16, ny - hh * 0.05); ctx.lineTo(nx + hh * 0.2, ny - hh * 0.12); ctx.lineTo(nx + hh * 0.16, ny + hh * 0.08); ctx.closePath(); }, P.kraag);
  ctx.save(); ctx.translate(hx, hy); ctx.scale(kp, kp); ctx.translate(-hx, -hy);
  const H = (a, b) => [hx + hh * a, hy + hh * b];
  // haar achter: puff, golf, (vlecht via romp)
  if (P.kapsel === 'puff') { const pdy = G ? Math.sin(fi * 2 - 1.2) * hh * (o.gang === 'loop' ? 0.03 : 0.07) : Math.sin(t * 1.6) * hh * 0.01, pdx = G ? -hh * (o.gang === 'loop' ? 0.02 : 0.08) : 0; const pf = []; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; pf.push([hx - hh * 0.2 + pdx + Math.cos(a) * hh * 0.27, hy - hh * 0.72 + pdy + Math.sin(a) * hh * 0.23, hh * (0.15 + (i % 3) * 0.02)]); } pf.push([hx - hh * 0.2 + pdx, hy - hh * 0.72 + pdy, hh * 0.27]); _enUnie(ctx, pf, P.haar); }
  if (P.kapsel === 'golf') { const zw = G ? Math.sin(fi * 2 - 1) * hh * 0.04 : 0; const g = []; for (let i = 0; i < 12; i++) { const u = i / 11; g.push([hx - hh * (0.3 + u * 0.12) + zw * u, hy - hh * 0.3 + u * hh * 0.85, hh * (0.2 - u * 0.04)]); } g.push([hx - hh * 0.1, hy - hh * 0.25, hh * 0.42]); _enUnie(ctx, g, P.haar); }
  // gezicht in profiel
  _enVorm(ctx, () => { const [a, b] = H(-0.05, -0.5); ctx.beginPath(); ctx.moveTo(a, b); ctx.bezierCurveTo(...H(0.3, -0.52), ...H(0.46, -0.3), ...H(0.44, -0.12)); ctx.quadraticCurveTo(...H(0.5, -0.04), ...H(0.48, 0.02)); ctx.lineTo(...H(0.56, 0.13)); ctx.quadraticCurveTo(...H(0.52, 0.18), ...H(0.47, 0.18));
      ctx.quadraticCurveTo(...H(0.5, 0.26), ...H(0.45, 0.3)); ctx.quadraticCurveTo(...H(0.46, 0.42), ...H(0.3, 0.46)); ctx.quadraticCurveTo(...H(0, 0.5), ...H(-0.14, 0.36)); ctx.bezierCurveTo(...H(-0.5, 0.3), ...H(-0.5, -0.46), a, b); ctx.closePath(); }, P.huid,
    () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(...H(0.05, 0.42), hh * 0.3, hh * 0.08, -0.2, 0, 6.283); ctx.fill(); });
  if (P.baard) _enVorm(ctx, () => { ctx.beginPath(); ctx.moveTo(...H(-0.06, 0.06)); ctx.quadraticCurveTo(...H(-0.04, 0.4), ...H(0.12, 0.5)); ctx.quadraticCurveTo(...H(0.36, 0.56), ...H(0.46, 0.4)); ctx.lineTo(...H(0.46, 0.3)); ctx.lineTo(...H(0.38, 0.32)); ctx.lineTo(...H(0.44, 0.22)); ctx.lineTo(...H(0.47, 0.2)); ctx.lineTo(...H(0.36, 0.2)); ctx.quadraticCurveTo(...H(0.2, 0.28), ...H(0.12, 0.12)); ctx.closePath(); }, P.baard);
  // haarkap per kapsel
  const kap = { puff: [[0.36, -0.26], [0.3, -0.56], [-0.3, -0.6], [-0.48, -0.1], [-0.52, 0.2], [-0.3, 0.34], [-0.2, 0.1], [-0.05, 0.02], [0.1, -0.2]],
    vlecht: [[0.36, -0.26], [0.3, -0.56], [-0.3, -0.6], [-0.48, -0.1], [-0.52, 0.2], [-0.3, 0.34], [-0.2, 0.1], [-0.05, 0.02], [0.1, -0.2]],
    golf: [[0.4, -0.18], [0.34, -0.6], [-0.36, -0.62], [-0.54, -0.1], [-0.56, 0.4], [-0.34, 0.5], [-0.2, 0.12], [-0.02, 0.02], [0.14, -0.14]],
    pony: [[0.46, -0.02], [0.4, -0.62], [-0.32, -0.66], [-0.52, -0.1], [-0.52, 0.22], [-0.3, 0.3], [-0.18, 0.08], [0.0, -0.02], [0.24, -0.06]],
    kortRommel: [[0.4, -0.22], [0.34, -0.66], [-0.3, -0.64], [-0.5, -0.12], [-0.5, 0.14], [-0.34, 0.22], [-0.18, 0.04], [-0.02, -0.04], [0.16, -0.24]],
    kortKrul: [[0.38, -0.3], [0.3, -0.58], [-0.3, -0.58], [-0.48, -0.14], [-0.48, 0.12], [-0.34, 0.2], [-0.2, 0.02], [-0.04, -0.04], [0.14, -0.28]] }[P.kapsel];
  _enVorm(ctx, () => { const q = kap; ctx.beginPath(); ctx.moveTo(...H(...q[0])); ctx.bezierCurveTo(...H(...q[1]), ...H(...q[2]), ...H(...q[3])); ctx.quadraticCurveTo(...H(...q[4]), ...H(...q[5])); ctx.quadraticCurveTo(...H(...q[6]), ...H(...q[7])); ctx.quadraticCurveTo(...H(...q[8]), ...H(...q[0])); ctx.closePath();
      if (P.kapsel === 'kortRommel') { for (const [a, b, c, d, e, f] of [[0.22, -0.56, 0.36, -0.62, 0.34, -0.48], [0.0, -0.62, 0.12, -0.7, 0.16, -0.6], [-0.22, -0.6, -0.14, -0.68, 0.0, -0.62], [0.34, -0.32, 0.46, -0.26, 0.4, -0.18]]) { ctx.moveTo(...H(a, b)); ctx.lineTo(...H(c, d)); ctx.lineTo(...H(e, f)); ctx.closePath(); } } }, P.haar,
    () => { ctx.strokeStyle = P.haarL; ctx.lineWidth = hh * 0.014; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(...H(0.25 - i * 0.12, -0.3 + i * 0.02)); ctx.quadraticCurveTo(...H(-0.05 - i * 0.05, -0.5), ...H(-0.2, -0.55)); ctx.stroke(); } });
  // oor, oorbel, oog, wenkbrauw, bril, mond
  _enVorm(ctx, () => { ctx.beginPath(); ctx.ellipse(...H(-0.02, 0.06), hh * 0.07, hh * 0.11, 0.1, 0, 6.283); }, P.huid, () => { ctx.fillStyle = P.huidS; ctx.beginPath(); ctx.ellipse(...H(-0.01, 0.07), hh * 0.03, hh * 0.06, 0, 0, 6.283); ctx.fill(); });
  if (P.oorbel) { ctx.strokeStyle = P.oorbel; ctx.lineWidth = hh * 0.02; ctx.beginPath(); ctx.arc(...H(-0.01, 0.2), hh * 0.035, 0, 6.283); ctx.stroke(); }
  const knip = ((t + P.naam.length * 0.7) % 3.7) < 0.12;
  if (knip) { ctx.strokeStyle = '#1A1210'; ctx.lineWidth = hh * 0.018; ctx.beginPath(); ctx.moveTo(...H(0.29, 0)); ctx.lineTo(...H(0.38, 0.01)); ctx.stroke(); }
  else { ctx.fillStyle = '#1A1210'; ctx.beginPath(); ctx.ellipse(...H(0.34, 0), hh * 0.035, hh * 0.055, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.arc(...H(0.35, -0.02), hh * 0.011, 0, 6.283); ctx.fill(); }
  if (P.kapsel !== 'pony') { ctx.strokeStyle = P.wenkbrauw; ctx.lineWidth = hh * 0.03; ctx.beginPath(); ctx.moveTo(...H(0.26, -0.1)); ctx.quadraticCurveTo(...H(0.34, -0.14), ...H(0.42, -0.1)); ctx.stroke(); }
  if (P.bril) { ctx.strokeStyle = '#1A1412'; ctx.lineWidth = hh * 0.022; ctx.beginPath(); if (P.bril === 'rond') ctx.arc(...H(0.36, 0.0), hh * 0.1, -1.6, 1.6); else { ctx.moveTo(...H(0.27, -0.08)); ctx.lineTo(...H(0.45, -0.08)); ctx.lineTo(...H(0.44, 0.08)); ctx.lineTo(...H(0.28, 0.08)); ctx.closePath(); } ctx.moveTo(...H(0.27, -0.04)); ctx.lineTo(...H(0.02, 0.0)); ctx.stroke(); }
  if (P.sproeten) { ctx.fillStyle = _enHex(_mix(P.huid, 0.3, '#8A4A22')); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(...H(0.3 + (i % 3) * 0.04, 0.1 + Math.floor(i / 3) * 0.04), hh * 0.009, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = P.baard ? '#2A1712' : '#5A2418'; ctx.lineWidth = hh * 0.02; ctx.beginPath(); ctx.moveTo(...H(0.38, 0.25)); ctx.quadraticCurveTo(...H(0.43, 0.27), ...H(0.46, 0.24)); ctx.stroke();
  ctx.restore();
  _EN_LW = LW0; ctx.restore();
  return { hoofd: { x: kijk < 0 ? 2 * x - hx : hx, y: hy, r: hh * 0.5 } };
}

function persoonEN(ctx, id, x, y, h, o = {}) {
  const P = CAST_EN[id]; if (!P) return {};
  const oud = _EN_LIJN; _EN_LIJN = o.lijn !== false;
  ctx.save(); if (o.a != null) ctx.globalAlpha *= o.a;
  const r = o.zij ? _enZij(ctx, P, x, y, h, o) : _enVoor(ctx, P, x, y, h, o);
  ctx.restore(); _EN_LIJN = oud; return r;
}
// snelheid (px/s) bij deze gang, zodat de steunvoet niet glijdt (zelfde maat als persoonEN met zij:true)
function gangSnelheidEN(id, h, gang = 'loop', tempo = 1) { const P = CAST_EN[id], G = GANG[gang], H = h * P.lengte, hh = H / 6.5, Lb = H - hh * 3.05 - hh * 0.2, L = Lb / 2, sEnd = Math.min(G.duty, 0.5);
  return (_beenPose(G, 0, L, L, hh).ballX - _beenPose(G, sEnd, L, L, hh).ballX) * G.f * tempo / sEnd; }
