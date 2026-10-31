// sbw4.js — storyboard 'Hoe weet een cel wat hij moet worden?', tekenaar 4: scènes w45–w61 (hoofdstuk 8, 9, 10)
// Nieuwe objecten (eerste voorstel): positieve terugkoppeling, methylslotjes, lapjeskat, X-inactivatie (Barr-lichaampje),
// axolotl met regenererende poot, poot in lengtedoorsnede met herkomstkleuren, kerntransplantatie (Gurdon), lam-silhouet, lensvezelcel.

const _W4 = { oranje: '#E08A3A', zwart: '#2A2622', zwartR: '#C9CED6', chrom: '#AEB8C8', chromR: '#7E8898', ch3: '#8CCB5E',
  kraak: '#C9CED6', huidAx: '#EBC0BA', huidAxR: '#B98A86', kieuw: '#C8505A', kieuwL: '#E58A90', ei: '#E6D9B8', eiD: '#6E5E50', eiR: '#C9BFA6',
  vis: '#5E6B55', visR: '#9AA88E', wol: '#E8E2D6', wolR: '#B8B0A2', glas: '#C9D6E3' };

function _w4bg(ctx, col) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); }
function _w4Lbl(ctx, s, x, y, col = C.text, align = 'left', meta = null) { naamBij(ctx, s, meta, x, y, 1, align, col); }

// eiwit als kralenketen: compacte gevouwen keten binnen straal R (deterministisch)
function _w4Kralen(ctx, cx, cy, R, n, seed, col, br = 7, a = 1) {
  const pts = []; let x = cx + (hash(seed) - 0.5) * R, y = cy + (hash(seed + 1) - 0.5) * R, an = hash(seed + 2) * 6.283; const st = br * 1.75;
  for (let i = 0; i < n; i++) { pts.push([x, y]); an += (hash(seed * 13 + i * 3.1) - 0.5) * 1.7; let nx = x + Math.cos(an) * st, ny = y + Math.sin(an) * st;
    if (Math.hypot(nx - cx, ny - cy) > R) { an = Math.atan2(cy - y, cx - x) + (hash(seed + i * 7.7) - 0.5) * 1.2; nx = x + Math.cos(an) * st; ny = y + Math.sin(an) * st; } x = nx; y = ny; }
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = _dk(col, 0.35); ctx.lineWidth = br * 0.5; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  pts.forEach(p => circ(ctx, p[0], p[1], br, col, _lt(col, 0.35), 1.2)); ctx.restore(); return pts; }

// methylgroep (kogelmodel, zoals in DNA 6): groene C met drie witte H
function _w4Methyl(ctx, x, y, r, rot = -Math.PI / 2) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.PI / 2); ctx.strokeStyle = _lt(_W4.ch3, 0.3); ctx.lineWidth = Math.max(1, r * 0.22);
  [-2.25, -Math.PI / 2, -0.89].forEach(q => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q) * r * 1.35, Math.sin(q) * r * 1.35); ctx.stroke(); circ(ctx, Math.cos(q) * r * 1.4, Math.sin(q) * r * 1.4, r * 0.5, '#E9EBEF'); });
  circ(ctx, 0, 0, r, _W4.ch3, _lt(_W4.ch3, 0.35), Math.max(1, r * 0.12)); ctx.restore(); }

// genrijtje in een kern: grijze draad met blokjes; aan = indexen die groen zijn
function _w4GenRij(ctx, x, y, w, aan = [], n = 5) { ctx.save(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke();
  const bw = w / n * 0.62; for (let i = 0; i < n; i++) { const bx = x - w / 2 + (i + 0.5) * w / n - bw / 2; roundRect(ctx, bx, y - 9, bw, 18, 4);
    shape(ctx, aan.includes(i) ? C.groen : '#4A5468', aan.includes(i) ? _lt(C.groen, 0.4) : '#6A7488', 1.5); } ctx.restore(); }

// eenvoudige cel: membraan (gebogen), kern; o.goud = onze cel
function _w4Cel(ctx, x, y, r, o = {}) { ctx.save(); ctx.globalAlpha *= o.a ?? 1; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = o.vul || rgba(C.teal, 0.18); ctx.fill();
  ctx.lineWidth = o.goud ? Math.max(3, r * 0.06) : 2; ctx.strokeStyle = o.goud ? C.goud : C.line; ctx.stroke();
  if (o.kern !== false) { ctx.beginPath(); ctx.arc(x + (o.kx || 0), y + (o.ky || 0), r * (o.kr || 0.42), 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }

// ---------- lapjeskat: huiskat-pop in wit, met oranje en zwarte vlekken (multiply, zodat de vachtschaduw blijft) ----------
let _w4KatPop = null;
function _w4KatWit() { if (!_w4KatPop) { const D = Object.assign({}, KAT_HUISKAT2_DEF, { PAL: Object.assign({}, KAT_HUISKAT2_DEF.PAL,
  { basis: '#ECE6DC', mid: '#E6DFD3', licht: '#F1ECE4', creme: '#F3EEE6', wit: '#F7F3EC', donker: '#D9D1C4', streep: '#E0D8CB' }) }); _w4KatPop = KatPop.maak(D); } return _w4KatPop; }
const _W4_VLEK = { // [u, v, rx, ry, kleur, seed] in px bij s = 1, anker = midden onder de kat
  zitten: [[-55, -175, 42, 58, 'z', 3], [-60, -62, 42, 46, 'o', 5], [-8, -18, 32, 18, 'z', 7], [2, -300, 26, 30, 'o', 9], [44, -312, 15, 14, 'z', 11], [6, -138, 26, 36, 'o', 13], [-90, -110, 18, 30, 'z', 15]],
  liggen: [[-30, -95, 62, 30, 'z', 3], [-108, -62, 32, 36, 'o', 5], [45, -92, 32, 26, 'o', 7], [122, -196, 22, 18, 'z', 9], [-62, -24, 26, 15, 'z', 11], [92, -150, 16, 22, 'o', 13]] };
function _w4Lapjeskat(ctx, x, y, s, houding = 'zitten', kijk = 1) {
  const c1 = document.createElement('canvas'); c1.width = W; c1.height = H; const g1 = c1.getContext('2d');
  _katWrap(g1, _w4KatWit(), x, y, s * 8.8, { houding, kijk });
  const c2 = document.createElement('canvas'); c2.width = W; c2.height = H; const g2 = c2.getContext('2d');
  for (const [u, v, rx, ry, k, sd] of _W4_VLEK[houding]) { blob(g2, x + u * s * kijk, y + v * s, rx * s, ry * s, 0.22, sd); g2.fillStyle = k === 'o' ? _W4.oranje : _W4.zwart; g2.fill(); }
  g2.globalCompositeOperation = 'destination-in'; g2.drawImage(c1, 0, 0);
  g1.globalCompositeOperation = 'multiply'; g1.drawImage(c2, 0, 0); ctx.drawImage(c1, 0, 0); }

// X-chromosoom (twee zusterchromatiden), met een allel-band op de lange arm
function _w4X(ctx, x, y, L, allel) { const w = L * 0.15;
  const arm = (k) => [[x + k * L * 0.13, y - L * 0.36], [x + k * L * 0.035, y], [x + k * L * 0.15, y + L * 0.62]];
  const pad = (P) => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.quadraticCurveTo(P[1][0], P[1][1], P[2][0], P[2][1]); };
  ctx.save(); ctx.lineCap = 'round';
  for (const k of [-1, 1]) { pad(arm(k)); ctx.strokeStyle = _W4.chromR; ctx.lineWidth = w + 5; ctx.stroke(); }
  for (const k of [-1, 1]) { pad(arm(k)); ctx.strokeStyle = _W4.chrom; ctx.lineWidth = w; ctx.stroke(); }
  // windingen
  for (const k of [-1, 1]) { const P = arm(k); for (let i = 1; i < 14; i++) { const t = i / 14; if (Math.abs(t - 0.5) < 0.06) continue;
    const q = [(1 - t) ** 2 * P[0][0] + 2 * (1 - t) * t * P[1][0] + t * t * P[2][0], (1 - t) ** 2 * P[0][1] + 2 * (1 - t) * t * P[1][1] + t * t * P[2][1]];
    ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(q[0] - w * 0.36, q[1]); ctx.lineTo(q[0] + w * 0.36, q[1]); ctx.stroke(); } }
  if (allel) for (const k of [-1, 1]) { const P = arm(k); ctx.save(); ctx.beginPath(); ctx.rect(x - L, y + L * 0.24, 2 * L, L * 0.1); ctx.clip(); pad(P); ctx.strokeStyle = allel; ctx.lineWidth = w; ctx.lineCap = 'butt'; ctx.stroke(); ctx.restore(); }
  circ(ctx, x, y, w * 0.42, '#6E7888'); ctx.restore(); }

// kikkerei: donkere bovenkant (dierlijke pool), lichte onderkant; o.kern = 'eigen' | 'weg' | 'darm'; o.grijs
function _w4Eicel(ctx, x, y, r, o = {}) { ctx.save(); ctx.globalAlpha *= o.a ?? 1;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = o.grijs ? '#5A6478' : _W4.ei; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(x, y - r * 0.05, r * 1.1, r * 0.25, 0, 0, 6.283); ctx.rect(x - r, y - r, 2 * r, r * 0.95);
  ctx.fillStyle = o.grijs ? '#46505F' : _W4.eiD; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = o.grijs ? '#6A7488' : _W4.eiR; ctx.lineWidth = Math.max(2, r * 0.03); ctx.stroke();
  const kx = x, ky = y - r * 0.4, kr = r * 0.22;
  if (o.kern === 'eigen') { circ(ctx, kx, ky, kr, rgba(C.paars, 0.85), C.kernR, 2); }
  else if (o.kern === 'weg') { ctx.setLineDash([8, 8]); circ(ctx, kx, ky, kr, null, C.text2, 2.5); ctx.setLineDash([]); }
  else if (o.kern === 'darm') { circ(ctx, kx, ky, kr, rgba(C.paars, 0.95), C.goud, 4); }
  ctx.restore(); return [kx, ky, kr]; }

// kikkervisje als klein schematisch silhouet (kop naar rechts)
function _w4Kikkervisje(ctx, x, y, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -10); ctx.bezierCurveTo(-110, -40, -170, -30, -230, 0); ctx.bezierCurveTo(-170, 30, -110, 40, -40, 14); ctx.closePath(); shape(ctx, rgba(_W4.visR, 0.35), _W4.visR, 2);
  ctx.beginPath(); ctx.moveTo(-40, -8); ctx.bezierCurveTo(-100, -14, -160, -6, -228, 0); ctx.bezierCurveTo(-160, 6, -100, 14, -40, 10); ctx.closePath(); shape(ctx, _W4.vis, null);
  ctx.beginPath(); ctx.ellipse(10, 0, 68, 46, 0, 0, 6.283); shape(ctx, _W4.vis, _W4.visR, 2.5);
  circ(ctx, 44, -14, 8, '#121A26', '#C9D6E3', 1.5); ctx.restore(); }

// lam (eenvoudig silhouet, kop naar rechts); y = grond
function _w4Lam(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = '#4A4440'; ctx.lineWidth = 9; [[-45, -45], [-28, -45], [30, -45], [45, -45]].forEach(([lx, ly]) => { ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + (lx > 0 ? 3 : -3), 0); ctx.stroke(); });
  const wol = [[-60, -78, 26], [-30, -92, 30], [5, -94, 30], [38, -84, 27], [-55, -55, 22], [-20, -58, 26], [18, -58, 26], [48, -60, 22]];
  wol.forEach(([wx, wy, r]) => circ(ctx, wx, wy, r + 2, _W4.wolR)); wol.forEach(([wx, wy, r]) => circ(ctx, wx, wy, r, _W4.wol));
  ctx.save(); ctx.translate(78, -112); ctx.rotate(0.45); ctx.beginPath(); ctx.ellipse(0, 0, 30, 19, 0, 0, 6.283); shape(ctx, '#D8D0C2', '#9A9284', 2);
  ctx.beginPath(); ctx.ellipse(-16, -16, 14, 6, -0.9, 0, 6.283); shape(ctx, '#C9C0B0', '#9A9284', 1.5); ctx.restore();
  circ(ctx, 84, -118, 3.5, '#1A1614'); ctx.restore(); }

// glazen micronaald (pipet) van (x1,y1) breed naar de punt (x2,y2)
function _w4Naald(ctx, x1, y1, x2, y2, w = 26) { const an = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(an), ny = Math.cos(an);
  ctx.beginPath(); ctx.moveTo(x1 + nx * w / 2, y1 + ny * w / 2); ctx.lineTo(x2 + nx * 3, y2 + ny * 3); ctx.lineTo(x2 - nx * 3, y2 - ny * 3); ctx.lineTo(x1 - nx * w / 2, y1 - ny * w / 2); ctx.closePath();
  shape(ctx, rgba(_W4.glas, 0.25), _W4.glas, 2); }

// axolotl van opzij (kop naar rechts), leucistisch roze; o.blastema 0..1, o.spook = toekomstige poot gestippeld
function _w4Axolotl(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = _W4.huidAx, rand = _W4.huidAxR, ver = _dk(huid, 0.18);
  const poot = (P, col, lw = 22) => { ctx.strokeStyle = _dk(col, 0.25); ctx.lineWidth = lw + 4; lijnPad(P); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = lw; lijnPad(P); ctx.stroke(); };
  const lijnPad = (P) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  const tenen = (hx, hy, n, an0, col) => { for (let i = 0; i < n; i++) { const an = an0 + (i - (n - 1) / 2) * 0.32; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + Math.cos(an) * 26, hy + Math.sin(an) * 26); ctx.stroke(); } };
  // poten aan de verre kant (donkerder)
  poot([[240, 40], [222, 112], [252, 146]], ver); tenen(252, 146, 4, 0.15, ver);
  poot([[-150, 40], [-178, 108], [-142, 146]], ver); tenen(-142, 146, 5, 0.1, ver);
  // kieuwen verre kant
  const kieuw = (bx, by, ex, ey, a) => { ctx.save(); ctx.globalAlpha *= a; const n = 9; ctx.strokeStyle = _W4.kieuwL; ctx.lineWidth = 3;
    for (let i = 1; i <= n; i++) { const t = i / (n + 1), px = lerp(bx, ex, t), py = lerp(by, ey, t), an = Math.atan2(ey - by, ex - bx); const l = 22 * (1 - t * 0.5);
      for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an + k * 1.2) * l, py + Math.sin(an + k * 1.2) * l); ctx.stroke(); } }
    ctx.strokeStyle = _W4.kieuw; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo((bx + ex) / 2 + 12, (by + ey) / 2, ex, ey); ctx.stroke(); ctx.restore(); };
  kieuw(322, -70, 300, -205, 0.55); kieuw(312, -52, 258, -168, 0.55);
  // vinzoom (rug en staart, onder de staart)
  vul(ctx, [[120, -60], [-60, -84], [-240, -92], [-400, -56], [-512, -6], [-400, -10], [-240, -30], [-60, -58]], rgba(huid, 0.55), rand, 2);
  vul(ctx, [[-130, 46], [-260, 80], [-410, 48], [-512, 0], [-400, 14], [-260, 28]], rgba(huid, 0.55), rand, 2);
  // lijf
  vul(ctx, [[508, -2], [496, -46], [458, -80], [398, -94], [330, -86], [282, -70], [248, -62], [150, -64], [50, -66], [-60, -60], [-160, -50], [-280, -34], [-400, -18], [-505, -4], [-400, 10], [-280, 22], [-160, 38], [-60, 52], [50, 58], [150, 58], [250, 58], [330, 66], [410, 62], [472, 44], [502, 18]], huid, rand, 3);
  // buik iets lichter
  vul(ctx, [[400, 50], [300, 58], [150, 52], [0, 50], [-120, 36], [0, 40], [150, 42], [300, 44]], _lt(huid, 0.3), null);
  // kieuwen nabije kant
  kieuw(338, -62, 292, -210, 1); kieuw(330, -44, 252, -178, 1); kieuw(322, -26, 226, -128, 1);
  // oog en mond
  circ(ctx, 432, -46, 10, '#2A1A1A'); circ(ctx, 435, -49, 3, 'rgba(255,255,255,0.8)');
  ctx.strokeStyle = _dk(rand, 0.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(503, 8); ctx.quadraticCurveTo(470, 30, 420, 22); ctx.stroke();
  // achterpoot nabij
  poot([[-110, 46], [-142, 112], [-100, 148]], huid); tenen(-100, 148, 5, 0.1, huid);
  // voorpoot nabij: stomp + blastema (klompje cellen), toekomstige poot gestippeld
  if (o.spook) { ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.text, 0.55); ctx.lineWidth = 3; lijnPad([[290, 56], [282, 118], [318, 150]]); ctx.stroke(); ctx.restore(); }
  poot([[290, 50], [292, 82]], huid, 24);
  const bl = o.blastema ?? 1; ctx.beginPath(); ctx.ellipse(293, 92 + 8 * bl, 15, 12 + 10 * bl, 0, 0, 6.283); shape(ctx, '#F2D3CC', C.goud, 3);
  for (let i = 0; i < 7; i++) circ(ctx, 286 + (i % 3) * 7, 86 + Math.floor(i / 3) * 9 + 8 * bl, 2.2, rgba(C.paars, 0.8));
  ctx.restore(); return { blastema: [x + 293 * s, y + 98 * s] }; }

// ===================================================================================== scènes
const SBW4 = {
  // ---------- 8 Vastzetten ----------
  w45(ctx) { _w4bg(ctx, C.bgMicro); difTag(ctx, '8 VASTZETTEN');
    const cx = 520, cy = 520;
    // oogbeker: sikkel van cellen (open naar rechts), twee lagen
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 270, 0.75, 5.53); ctx.arc(cx + 40, cy, 180, 5.45, 0.83, true); ctx.closePath(); shape(ctx, rgba(C.teal, 0.28), C.teal, 2.5); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 270, 0.75, 5.53); ctx.arc(cx, cy, 246, 5.53, 0.75, true); ctx.closePath(); shape(ctx, '#3E3550', '#6A5E7E', 1.5); ctx.restore();
    for (let i = 0; i < 26; i++) { const an = 0.85 + i / 25 * (5.43 - 0.85); ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx + 40 + Math.cos(an) * 182, cy + Math.sin(an) * 182); ctx.lineTo(cx + Math.cos(an) * 244, cy + Math.sin(an) * 244); ctx.stroke(); }
    // lens (blaasje van cellen, achterwand rekt uit)
    const lx = 770, ly = 520, lr = 125; ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 6.283); shape(ctx, rgba(C.teal, 0.2), C.teal, 2.5);
    for (let i = 0; i < 18; i++) { const an = i / 18 * 6.283; const r0 = (Math.cos(an) < -0.3) ? 20 : lr - 34; ctx.strokeStyle = rgba(C.teal, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx + Math.cos(an) * r0, ly + Math.sin(an) * r0); ctx.lineTo(lx + Math.cos(an) * lr, ly + Math.sin(an) * lr); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(lx, ly, lr - 34, -1.25, 1.25); ctx.strokeStyle = rgba(C.teal, 0.55); ctx.stroke();
    // oppervlakte-ectoderm (huid) voor de lens
    // onze cel in de achterwand van de lens
    onzeCel(ctx, lx - 72, ly + 10, 30);
    // signaal uit de oogbeker dooft uit
    for (let i = 0; i < 12; i++) { const px = 600 + hash(i * 3) * 70, py = 400 + hash(i * 3 + 1) * 240; circ(ctx, px, py, 7, rgba(C.koraal, 0.12 + 0.12 * hash(i * 7)), null); }
    _w4Lbl(ctx, 'oogbeker', 330, 215, C.text, 'center'); _w4Lbl(ctx, 'lens', lx + 20, ly - lr - 22, C.text, 'center');
    _w4Lbl(ctx, 'signaal dooft uit', 470, 860, C.text2, 'center');
    // zoom: onze cel deelt, beide dochters houden het lenspatroon
    zoomCircle(ctx, 1420, 480, 300, lx - 72, ly + 10, null, 1, () => { _w4bg(ctx, C.bgMicro);
      for (const [dx, sd] of [[-118, 1], [118, 2]]) { _w4Cel(ctx, 1420 + dx, 480, 125, { goud: true, kern: false });
        ctx.beginPath(); ctx.arc(1420 + dx, 480, 58, 0, 6.283); shape(ctx, rgba(C.paars, 0.6), C.kernR, 2); _w4GenRij(ctx, 1420 + dx, 480, 96, [1, 3], 4); } });
    _w4Lbl(ctx, 'beide dochtercellen:', 1420, 840, C.text, 'center'); _w4Lbl(ctx, 'dezelfde lensgenen aan', 1420, 884, C.groen, 'center');
  },

  w46(ctx) { _w4bg(ctx, C.bgMicro); difTag(ctx, '8 VASTZETTEN');
    const y = 650; dnaDraad(ctx, [[160, y], [600, y - 6], [1100, y + 6], [1600, y - 4], [1780, y]], { w: 16 });
    // gen
    roundRect(ctx, 880, y - 30, 420, 60, 12); shape(ctx, rgba(C.groen, 0.32), C.groen, 3);
    _w4Lbl(ctx, 'mastergen', 1090, y + 92, C.groen, 'center');
    // gen staat aan: pijl van transcriptie
    ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(880, y - 32); ctx.lineTo(880, y - 70); ctx.lineTo(950, y - 70); ctx.stroke(); pijl(ctx, 930, y - 70, 962, y - 70, C.groen, 1, 5, 16);
    // eiwit gemaakt
    pijl(ctx, 1220, y - 44, 1220, 420, C.text2, 1, 4, 18);
    _w4Kralen(ctx, 1220, 320, 80, 34, 21, '#7A8BA8', 12);
    _w4Lbl(ctx, 'eiwit', 1310, 300, C.text, 'left');
    // terug naar het eigen gen
    ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(1150, 300); ctx.bezierCurveTo(1000, 210, 800, 260, 780, 470); ctx.stroke(); ctx.restore(); pijl(ctx, 782, 455, 780, 490, C.groen, 1, 5, 18);
    // gebonden eiwit op de schakelplek vóór het gen
    _w4Kralen(ctx, 790, y - 74, 60, 26, 21, '#7A8BA8', 11);
    _w4Lbl(ctx, 'bindt op zijn eigen gen', 760, y + 92, C.text, 'center');
    text(ctx, '+', 1010, 450, fTitel(110), C.groen, 'center');
    // signaal van buiten: weg
    ctx.save(); ctx.globalAlpha = 0.28; for (let i = 0; i < 9; i++) circ(ctx, 230 + hash(i * 5) * 260, 260 + hash(i * 5 + 1) * 160, 9, C.koraal); ctx.setLineDash([10, 12]); pijl(ctx, 450, 400, 650, 560, C.koraal, 1, 4, 16); ctx.restore();
    _w4Lbl(ctx, 'signaal van buiten: weg', 370, 220, C.text2, 'center');
    _w4Lbl(ctx, 'de kring houdt zichzelf aan', 1000, 820, C.groen, 'center');
  },

  w47(ctx) { _w4bg(ctx, C.bgMicro); difTag(ctx, '8 VASTZETTEN'); difLabel(ctx, 'VEREENVOUDIGD');
    const rij = (y, R, lbl) => { nucleosoomDraad(ctx, 170, y, 800, y, { n: 4, R, los: 0.15 });
      dnaDraad(ctx, [[790, y], [900, y + 4], [1010, y]], { w: Math.max(6, R * 0.34) });
      const c = nucleosoomDraad(ctx, 1000, y, 1720, y, { n: 7, R, compact: 1 });
      [[1110, -1], [1230, 1], [1340, -1], [1450, 1], [1560, -1], [1650, 1]].forEach(([mx, k], i) => _w4Methyl(ctx, mx, y + k * R * 0.95, R * 0.26, k < 0 ? -Math.PI / 2 : Math.PI / 2));
      return c; };
    rij(300, 46); _w4Lbl(ctx, 'gen aan: los', 480, 190, C.groen, 'center'); _w4Lbl(ctx, 'gen uit: slotjes, strak opgerold', 1360, 190, C.text, 'center');
    pijl(ctx, 960, 400, 960, 500, C.text2, 1, 4, 18); _w4Lbl(ctx, 'celdeling', 1000, 462, C.text2, 'left');
    rij(600, 38); rij(780, 38);
    _w4Lbl(ctx, 'beide kopieën houden de slotjes', 960, 878, C.text, 'center');
  },

  w48(ctx) { _w4bg(ctx, C.bgMacroSky); difTag(ctx, '8 VASTZETTEN');
    // raam met uitzicht en vensterbank
    roundRect(ctx, 130, 140, 760, 500, 6); shape(ctx, '#2A3F63', null);
    ctx.save(); roundRect(ctx, 130, 140, 760, 500, 6); ctx.clip(); ctx.beginPath(); ctx.moveTo(130, 520); ctx.bezierCurveTo(330, 440, 560, 470, 890, 500); ctx.lineTo(890, 640); ctx.lineTo(130, 640); ctx.closePath(); ctx.fillStyle = C.bgMacroHill; ctx.fill(); ctx.restore();
    ctx.strokeStyle = '#B9B2A4'; ctx.lineWidth = 14; roundRect(ctx, 130, 140, 760, 500, 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(510, 140); ctx.lineTo(510, 640); ctx.stroke();
    roundRect(ctx, 90, 636, 840, 34, 6); shape(ctx, '#B9AE98', '#8C8270', 2);
    _w4Lapjeskat(ctx, 470, 640, 1.45, 'zitten');
    _w4Lbl(ctx, 'lapjeskat (poes)', 510, 730, C.text, 'center');
    // twee X-chromosomen
    _w4X(ctx, 1240, 450, 330, _W4.oranje); _w4X(ctx, 1600, 450, 330, _W4.zwart);
    text(ctx, 'X', 1240, 300, fTitel(64), C.text, 'center'); text(ctx, 'X', 1600, 300, fTitel(64), C.text, 'center');
    _w4Lbl(ctx, 'allel voor oranje', 1240, 740, _W4.oranje, 'center'); _w4Lbl(ctx, 'allel voor zwart', 1600, 740, C.text, 'center');
    metaText(ctx, 'vachtkleur-gen op het X-chromosoom', 1420, 840, C.text2, 'center', 26);
  },

  w49(ctx) { _w4bg(ctx, C.bgMicro); difTag(ctx, '8 VASTZETTEN');
    const cx = 620, cy = 470, R = 320; circ(ctx, cx, cy, R + 16, null, rgba('#C9CED6', 0.45), 14);
    const P = []; for (let i = 0; i < 11; i++) { const an = i / 11 * 6.283 + 0.2; P.push([cx + Math.cos(an) * R * 0.68, cy + Math.sin(an) * R * 0.68]); }
    for (let i = 0; i < 4; i++) { const an = i / 4 * 6.283 + 0.6; P.push([cx + Math.cos(an) * R * 0.27, cy + Math.sin(an) * R * 0.27]); } P.push([cx, cy]);
    const kleur = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0];
    P.forEach(([x, y], i) => { circ(ctx, x, y, R * 0.29, '#33405A', C.line, 2); });
    P.forEach(([x, y], i) => { circ(ctx, x, y, R * 0.11, rgba(C.paars, 0.7), C.kernR, 1.5); const an = hash(i * 9) * 6.283;
      const bx = x + Math.cos(an) * R * 0.075, by = y + Math.sin(an) * R * 0.075; blob(ctx, bx, by, 10, 8, 0.15, i); shape(ctx, kleur[i] ? _W4.oranje : _W4.zwart, _W4.zwartR, 1.5); });
    _w4Lbl(ctx, 'embryo, ± 16 cellen', cx, 870, C.text, 'center');
    // ingezoomde kern
    const kx = 1460, ky = 420, kr = 190; kernChromatine(ctx, kx, ky, kr, { c: 0, n: 30, seed: 6 }); circ(ctx, kx, ky, kr, null, C.kernR, 2.5);
    blob(ctx, kx + 30, ky - kr + 46, 36, 28, 0.18, 4); shape(ctx, _W4.oranje, _W4.zwartR, 2);
    _w4Lbl(ctx, 'Barr-lichaampje:', kx, ky - kr - 62, C.text, 'center'); _w4Lbl(ctx, 'uitgeschakelde X, strak opgerold', kx, ky - kr - 20, C.text2, 'center');
    _w4Lbl(ctx, 'oranje of zwart uit: toeval', kx, 720, C.text, 'center');
    blob(ctx, kx - 60, 790, 18, 14, 0.15, 2); shape(ctx, _W4.oranje, _W4.zwartR, 1.5); blob(ctx, kx + 60, 790, 18, 14, 0.15, 3); shape(ctx, _W4.zwart, _W4.zwartR, 1.5);
  },

  wq50(ctx) { difVraagKaart(ctx, ['Waarom zitten de kleuren in groepjes,', 'en niet haar voor haar door elkaar?'],
      ['Omdat oranje en zwarte cellen elkaar afstoten en uit elkaar gaan liggen', 'Omdat elke cel bij elke deling opnieuw bij toeval kiest welke X uit gaat', 'Omdat de uitgeschakelde X bij alle nakomelingen van een cel dezelfde blijft'], null);
    const x = 1660, y = 250, r = 150; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#EEE8DE'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    [[x - 70, y - 60, 90, 70, _W4.zwart, 1], [x + 90, y + 40, 80, 90, _W4.oranje, 2], [x - 60, y + 110, 70, 50, _W4.oranje, 3], [x + 60, y - 120, 50, 40, _W4.zwart, 4]].forEach(([bx, by, rx, ry, c, sd]) => { blob(ctx, bx, by, rx, ry, 0.25, sd); ctx.fillStyle = c; ctx.fill(); });
    for (let i = 0; i < 260; i++) { const hx = x - r + hash(i * 3) * 2 * r, hy = y - r + hash(i * 3 + 1) * 2 * r; ctx.strokeStyle = 'rgba(0,0,0,0.13)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx + 8, hy + 6, hx + 20, hy + 8); ctx.stroke(); }
    ctx.restore(); circ(ctx, x, y, r, null, C.line, 3);
  },

  w51(ctx) { _w4bg(ctx, C.bgMacroSky); difTag(ctx, '8 VASTZETTEN');
    // links: klein embryo, kloontjes waaieren uit
    const ex = 300, ey = 470, R = 120; circ(ctx, ex, ey, R + 8, null, rgba('#C9CED6', 0.45), 8);
    const kl = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0]; const P = []; for (let i = 0; i < 11; i++) { const an = i / 11 * 6.283 + 0.2; P.push([ex + Math.cos(an) * R * 0.68, ey + Math.sin(an) * R * 0.68]); }
    for (let i = 0; i < 4; i++) { const an = i / 4 * 6.283 + 0.6; P.push([ex + Math.cos(an) * R * 0.27, ey + Math.sin(an) * R * 0.27]); } P.push([ex, ey]);
    P.forEach(([x, y], i) => circ(ctx, x, y, R * 0.28, kl[i] ? rgba(_W4.oranje, 0.85) : _W4.zwart, _W4.zwartR, 1.5));
    _w4Lbl(ctx, 'embryo', ex, ey + R + 64, C.text, 'center');
    // uitwaaierende kloontjes: celdelingen
    [[1, -0.5], [0, 0.05], [1, 0.55]].forEach(([k, dy], j) => { const c = k ? _W4.oranje : _W4.zwart; const y0 = ey + dy * 260;
      for (let g = 0; g < 4; g++) { const n = 2 ** g; for (let m = 0; m < n; m++) { const gx = ex + 190 + g * 95, gy = y0 + (m - (n - 1) / 2) * 24; circ(ctx, gx, gy, 10, c, k ? _lt(_W4.oranje, 0.3) : '#8C929C', 2); } } });
    pijl(ctx, 800, 470, 900, 470, C.text2, 1, 4, 18); _w4Lbl(ctx, 'heel veel', 700, 760, C.text2, 'center'); _w4Lbl(ctx, 'celdelingen', 700, 800, C.text2, 'center');
    // rechts: de kat met vlekken
    _w4Lapjeskat(ctx, 1330, 830, 1.95, 'liggen');
    _w4Lbl(ctx, 'vlek = groepje cellen met dezelfde keuze', 1330, 230, C.text, 'center');
    _w4Lbl(ctx, 'wit: ander gen', 1700, 860, C.text2, 'center');
  },

  // ---------- 9 Kan de knikker terug? ----------
  w52(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '9 KAN DE KNIKKER TERUG?'); difLabel(ctx, 'MODEL');
    const L = landschap(ctx, 180, 220, 1500, 580, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikker: 1 });
    const [kx, ky] = L.knikker, top = L.knopen[0];
    ctx.save(); ctx.setLineDash([14, 14]); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(kx + 30, ky - 30); ctx.bezierCurveTo(kx + 260, ky - 260, top.x + 320, top.y + 40, top.x + 60, top.y - 10); ctx.stroke(); ctx.restore();
    pijl(ctx, top.x + 110, top.y + 4, top.x + 64, top.y - 8, C.goud, 1, 5, 20);
    text(ctx, '?', kx + 70, ky - 250, fTitel(120), C.goud, 'center');
  },

  w53(ctx) { _w4bg(ctx, C.bgMacroSky); difTag(ctx, '9 KAN DE KNIKKER TERUG?');
    // wateroppervlak en bodem
    ctx.strokeStyle = rgba('#AFC0D0', 0.35); ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(120 + i * 300, 130); ctx.quadraticCurveTo(190 + i * 300, 120, 260 + i * 300, 130); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(0, 790); ctx.bezierCurveTo(500, 760, 1200, 800, 1920, 770); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fillStyle = '#2C3A44'; ctx.fill();
    for (const [px, h] of [[140, 260], [190, 190], [1780, 230]]) { ctx.strokeStyle = rgba(C.groen, 0.45); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, 790); ctx.quadraticCurveTo(px + 30, 790 - h / 2, px - 10, 790 - h); ctx.stroke(); }
    const ax = _w4Axolotl(ctx, 820, 620, 1.05, { blastema: 1, spook: true });
    _w4Lbl(ctx, 'axolotl', 420, 520, C.text, 'center');
    _w4Lbl(ctx, 'nieuwe poot', 1060, 840, C.text, 'center');
    zoomCircle(ctx, 1600, 420, 200, ax.blastema[0], ax.blastema[1], null, 1, () => { _w4bg(ctx, '#22355A');
      ctx.fillStyle = _W4.huidAx; roundRect(ctx, 1530, 180, 140, 170, 30); ctx.fill(); ctx.strokeStyle = _W4.huidAxR; ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(1600, 400, 92, 100, 0, 0, 6.283); shape(ctx, '#F2D3CC', C.goud, 5);
      for (let i = 0; i < 26; i++) { const an = hash(i * 4) * 6.283, d = Math.sqrt(hash(i * 4 + 1)) * 78; circ(ctx, 1600 + Math.cos(an) * d, 400 + Math.sin(an) * d * 1.05, 13, rgba('#E9B9B0', 1), '#C99A92', 1.5); circ(ctx, 1600 + Math.cos(an) * d, 400 + Math.sin(an) * d * 1.05, 5, rgba(C.paars, 0.85)); } });
    _w4Lbl(ctx, 'klompje cellen dat weer deelt', 1600, 680, C.goud, 'center');
  },

  w54(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '9 KAN DE KNIKKER TERUG?');
    // poot in lengtedoorsnede: oud deel (links) en nieuw deel (rechts) met herkomstkleuren
    const x0 = 330, xc = 760, x1 = 1230, cy = 450; const lagen = [['opperhuid', C.teal, 160, 140], ['lederhuid', C.oker, 140, 108], ['spier', C.koraal, 108, 42], ['kraakbeen', _W4.kraak, 42, 0]];
    const vorm = (k) => { ctx.beginPath(); ctx.moveTo(x0, cy - k); ctx.lineTo(x1 - k * 0.6, cy - k); ctx.quadraticCurveTo(x1 + k * 0.5, cy - k, x1 + k * 0.5, cy); ctx.quadraticCurveTo(x1 + k * 0.5, cy + k, x1 - k * 0.6, cy + k); ctx.lineTo(x0, cy + k); ctx.closePath(); };
    ctx.save(); vorm(160); ctx.clip();
    for (const [, kl, ro, ri] of lagen) { vorm(ro); ctx.fillStyle = kl; ctx.fill(); }
    // nieuw deel: lichter, met cellen gekleurd naar herkomst
    ctx.fillStyle = rgba(C.bgSchema, 0.72); ctx.fillRect(xc, cy - 170, 700, 340);
    const wissel = (lbl, i) => lbl === 'lederhuid' ? (hash(i * 3.3) < 0.25 ? _W4.kraak : C.oker) : lbl === 'kraakbeen' ? (hash(i * 5.1) < 0.3 ? C.oker : _W4.kraak) : null;
    for (const [lbl, kl, ro, ri] of lagen) { for (const sgn of (ri === 0 ? [0] : [-1, 1])) { const y0 = ri === 0 ? cy - ro + 12 : (sgn < 0 ? cy - ro + 11 : cy + ri + 11), y1 = ri === 0 ? cy + ro - 12 : (sgn < 0 ? cy - ri - 11 : cy + ro - 11);
      let i = 0; for (let yy = y0; yy <= y1 + 0.1; yy += 22) for (let xx = xc + 16; xx < x1 + 40; xx += 22) { i++; const kc = wissel(lbl, i + yy) || kl; circ(ctx, xx, yy, 8.5, kc, _dk(kc, 0.3), 1); } } }
    ctx.restore(); vorm(160); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xc, cy - 200); ctx.lineTo(xc, cy + 200); ctx.stroke(); ctx.restore();
    _w4Lbl(ctx, 'opperhuid', x0 - 18, cy - 138, C.teal, 'right'); _w4Lbl(ctx, 'spier', x0 - 18, cy - 62, C.koraal, 'right');
    _w4Lbl(ctx, 'kraakbeen', x0 - 18, cy + 13, _W4.kraak, 'right'); _w4Lbl(ctx, 'lederhuid', x0 - 18, cy + 138, C.oker, 'right');
    _w4Lbl(ctx, 'oude poot', (x0 + xc) / 2, cy - 200, C.text, 'center'); _w4Lbl(ctx, 'nieuwe poot', (xc + x1) / 2, cy - 200, C.text, 'center');
    _w4Lbl(ctx, 'kleur = herkomst van de cel', (xc + x1) / 2, cy + 230, C.text2, 'center');
    _w4Lbl(ctx, 'lederhuid en kraakbeen wisselen soms', 780, cy + 300, C.text, 'center');
    metaText(ctx, 'AXOLOTL · 2009', 80, 870, C.text2, 'left', 26);
    // klein landschap: knikker een stukje omhoog
    roundRect(ctx, 1380, 190, 480, 500, 16); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5);
    const L = landschap(ctx, 1450, 300, 340, 300, { pad: ['embryo', 'mesoderm', 'spier'], knikker: 0.62, labels: false });
    const dal = L.knopen.find(k => k.b.n === 'spier'); circ(ctx, dal.x, dal.y - 14, 16, null, rgba(C.goud, 0.6), 2.5);
    _w4Lbl(ctx, 'spier', dal.x, dal.y + 54, C.text, 'center');
    _w4Lbl(ctx, 'een stukje omhoog', 1620, 250, C.goud, 'center'); metaText(ctx, 'MODEL', 1840, 676, C.text2, 'right', 26);
  },

  w55(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '9 KAN DE KNIKKER TERUG?'); difLabel(ctx, 'NIET OP SCHAAL');
    // 1 kikkervisje met darm
    _w4Kikkervisje(ctx, 330, 400, 1.2); circ(ctx, 330, 420, 34, null, C.goud, 3);
    _w4Lbl(ctx, 'kikkervisje', 250, 530, C.text, 'center');
    pijl(ctx, 450, 440, 520, 440, C.text2, 1, 4, 16);
    // 2 darmcel, kern eruit met de naald
    _w4Cel(ctx, 640, 440, 90, { vul: rgba(C.oker, 0.25), kx: -10, ky: 10, kr: 0.36 });
    _w4Naald(ctx, 820, 200, 642, 432, 30);
    _w4Lbl(ctx, 'darmcel', 640, 600, C.text, 'center'); _w4Lbl(ctx, 'kern eruit', 790, 170, C.text2, 'left');
    pijl(ctx, 760, 470, 860, 470, C.text2, 1, 4, 16);
    // 3 eicel zonder eigen kern
    _w4Eicel(ctx, 1060, 470, 160, { kern: 'weg' });
    _w4Lbl(ctx, 'eicel', 1060, 685, C.text, 'center'); _w4Lbl(ctx, 'eigen kern weg', 1060, 727, C.text2, 'center');
    pijl(ctx, 1250, 470, 1340, 470, C.text2, 1, 4, 16);
    // 4 darmkern erin
    const [kx, ky, kr] = _w4Eicel(ctx, 1540, 470, 160, { kern: 'darm' });
    _w4Naald(ctx, 1760, 210, kx + kr + 6, ky - kr * 0.4, 30);
    _w4Lbl(ctx, 'darmkern erin', 1540, 685, C.goud, 'center');
    metaText(ctx, 'KIKKER · 1962', 80, 870, C.text2, 'left', 26);
  },

  wq56(ctx) { difVraagKaart(ctx, 'Kan zo’n eicel uitgroeien tot een nieuw kikkervisje?',
      ['Nee, want de darmkern mist de genen die hij niet gebruikte', 'Nee, want de eicel kan alleen een darmcel maken', 'Ja, de darmkern heeft nog alle genen voor een heel dier'], null);
    _w4Eicel(ctx, 1680, 230, 120, { kern: 'darm' });
  },

  w57(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '9 KAN DE KNIKKER TERUG?');
    for (let i = 0; i < 9; i++) { const x = 200 + i * 105, y = 300; _w4Eicel(ctx, x, y, 42, i === 6 ? { kern: 'darm' } : { kern: 'darm', grijs: true, a: 0.5 }); }
    pijl(ctx, 830, 250, 1180, 250, C.groen, 1, 5, 20);
    _w4Kikkervisje(ctx, 1450, 260, 1.25); _w4Lbl(ctx, 'kikkervisje', 1400, 380, C.groen, 'center');
    _w4Lbl(ctx, 'de meeste eicellen: niets', 620, 410, C.text2, 'center');
    _w4Lbl(ctx, 'de darmkern had nog alle genen voor een heel dier', 960, 500, C.groen, 'center');
    // klein tweede schema: Dolly
    ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 560); ctx.lineTo(1620, 560); ctx.stroke();
    _w4Cel(ctx, 480, 720, 46, { vul: rgba(C.koraal, 0.2), kr: 0.42 }); _w4Lbl(ctx, 'uiercel', 480, 820, C.text, 'center');
    pijl(ctx, 560, 720, 660, 720, C.text2, 1, 4, 16);
    ctx.beginPath(); ctx.arc(760, 720, 66, 0, 6.283); shape(ctx, rgba(C.oker, 0.22), C.oker, 2.5); circ(ctx, 760, 700, 19, rgba(C.paars, 0.95), C.goud, 3); _w4Lbl(ctx, 'eicel', 760, 820, C.text, 'center');
    pijl(ctx, 860, 720, 960, 720, C.text2, 1, 4, 16);
    _w4Lam(ctx, 1090, 790, 0.95); _w4Lbl(ctx, 'lam', 1095, 840, C.text, 'center');
    metaText(ctx, 'SCHAAP DOLLY · 1996', 1260, 735, C.text2, 'left', 28);
  },

  w58(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '9 KAN DE KNIKKER TERUG?'); difLabel(ctx, 'MODEL');
    const boom = { n: 'bevruchte eicel', k: [{ n: 'placenta' }, { n: 'embryo', k: [{ n: 'ectoderm', k: [{ n: 'zenuwcel' }, { n: 'lens' }] }, { n: 'mesoderm', k: [{ n: 'bindweefsel' }, { n: 'spier' }] }, { n: 'endoderm', k: [{ n: 'darm' }, { n: 'lever' }] }] }] };
    const L = landschap(ctx, 140, 230, 1240, 560, { boom, pad: ['embryo'], knikker: 0.35 });
    const dal = L.knopen.find(k => k.b.n === 'bindweefsel'), mes = L.knopen.find(k => k.b.n === 'mesoderm'), emb = L.knopen.find(k => k.b.n === 'embryo'); const [kx, ky] = L.knikker;
    circ(ctx, dal.x, dal.y - 14, 18, null, rgba(C.goud, 0.6), 3);
    ctx.save(); ctx.setLineDash([12, 12]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(dal.x + 10, dal.y - 40); ctx.bezierCurveTo(dal.x + 30, (dal.y + mes.y) / 2, mes.x + 40, mes.y + 10, mes.x + 30, mes.y - 20);
    ctx.bezierCurveTo(mes.x + 20, (mes.y + emb.y) / 2, emb.x + 60, emb.y + 10, emb.x + 40, emb.y - 30); ctx.lineTo(kx + 30, ky + 20); ctx.stroke(); ctx.restore();
    // vier genen duwen
    for (let i = 0; i < 4; i++) { roundRect(ctx, kx + 36 + i * 46, ky + 14, 38, 26, 6); shape(ctx, C.goud, '#8A6510', 2); }
    _w4Lbl(ctx, 'vier genen', kx + 232, ky + 40, C.goud, 'left');
    _w4Lbl(ctx, 'net onder de top', kx - 60, ky - 6, C.text, 'right');
    antwoordTegels(ctx, 1520, 300, 4, 3);
    metaText(ctx, 'MUIS · 2006', 1520, 740, C.text2, 'left', 26);
  },

  // ---------- 10 Terug naar de lens ----------
  w59(ctx) { _w4bg(ctx, C.bgMicro); difTag(ctx, '10 TERUG NAAR DE LENS');
    const vorm = () => { ctx.beginPath(); ctx.moveTo(300, 430); ctx.quadraticCurveTo(860, 395, 1400, 430); ctx.arc(1400, 540, 110, -Math.PI / 2, Math.PI / 2); ctx.quadraticCurveTo(860, 685, 300, 650); ctx.arc(300, 540, 110, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); };
    vorm(); ctx.fillStyle = rgba('#AFC0D0', 0.07); ctx.fill();
    ctx.save(); vorm(); ctx.clip();
    for (let i = 0; i < 46; i++) { const px = 230 + (i % 23) * 52 + hash(i) * 20, py = 470 + Math.floor(i / 23) * 110 + hash(i + 3) * 30; _w4Kralen(ctx, px, py, 20, 9, i * 7 + 1, '#C9D6E3', 4, 0.35); }
    // kern en organellen vallen uiteen
    for (let i = 0; i < 9; i++) { const an = hash(i * 5) * 6.283, d = 30 + hash(i * 5 + 1) * 70; blob(ctx, 1240 + Math.cos(an) * d, 520 + Math.sin(an) * d * 0.6, 14 + hash(i) * 12, 10 + hash(i + 1) * 8, 0.3, i); ctx.fillStyle = rgba(C.paars, 0.75 - i * 0.06); ctx.fill(); }
    for (let i = 0; i < 6; i++) { const px = 1050 + hash(i * 11) * 300, py = 470 + hash(i * 11 + 1) * 130; ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i) * 3); roundRect(ctx, -16, -7, 32, 14, 7); ctx.fillStyle = rgba(C.mito, 0.35 - i * 0.04); ctx.fill(); ctx.restore(); }
    ctx.restore();
    vorm(); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.stroke();
    // lichtstraal recht door de cel
    ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(70, 600); ctx.lineTo(1840, 600); ctx.stroke(); pijl(ctx, 1800, 600, 1850, 600, '#F2F2EE', 1, 5, 20);
    _w4Lbl(ctx, 'lensvezelcel', 300, 380, C.goud, 'left');
    _w4Lbl(ctx, 'doorzichtige eiwitten', 560, 740, C.text, 'center');
    _w4Lbl(ctx, 'kern en organellen afgebroken', 1240, 740, C.text, 'center');
    _w4Lbl(ctx, 'licht gaat recht door', 1850, 572, C.text, 'right');
    landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], 1);
  },

  w60(ctx) { _w4bg(ctx, C.bgSchema); difTag(ctx, '10 TERUG NAAR DE LENS'); difLabel(ctx, 'MODEL');
    const L = landschap(ctx, 150, 220, 1250, 540, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikker: 1 });
    const lens = L.knopen.find(k => k.b.n === 'lens'); metaText(ctx, '→ LENSVEZEL', lens.x, lens.y + 90, C.goud, 'center', 26);
    antwoordTegels(ctx, 1530, 280, 4, 3);
  },

  w61(ctx) { _w4bg(ctx, C.bgMacroSky); difTag(ctx, '10 TERUG NAAR DE LENS');
    ctx.fillStyle = '#26365A'; ctx.fillRect(0, 860, W, 40);
    // bank
    const bk = '#46557A', bkR = '#5E6E94';
    roundRect(ctx, 220, 450, 1000, 220, 30); shape(ctx, bk, bkR, 2); // rugleuning
    // Noor zit (vooraanzicht, onder de heup weggesneden)
    const nx = 900; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 668); ctx.clip(); persoon(ctx, 'noor', nx, 925, 640, { uit: 'blij' }); ctx.restore();
    // de kat ligt naast haar
    _w4Lapjeskat(ctx, 520, 668, 0.95, 'liggen');
    roundRect(ctx, 220, 640, 1000, 90, 22); shape(ctx, _lt(bk, 0.08), bkR, 2); // zitting
    roundRect(ctx, 170, 520, 90, 240, 26); shape(ctx, _dk(bk, 0.1), bkR, 2); roundRect(ctx, 1180, 520, 90, 240, 26); shape(ctx, _dk(bk, 0.1), bkR, 2);
    ctx.fillStyle = _dk(bk, 0.3); ctx.fillRect(250, 760, 26, 100); ctx.fillRect(1164, 760, 26, 100);
    // benen van Noor (dijen naar voren, onderbenen omlaag)
    const P = CAST.noor; ctx.fillStyle = P.broek; [-42, 42].forEach(d => { roundRect(ctx, nx + d - 30, 650, 60, 70, 24); ctx.fill(); roundRect(ctx, nx + d - 24, 710, 48, 140, 18); ctx.fill(); roundRect(ctx, nx + d - 30, 836, 62, 28, 12); shape(ctx, P.schoen, P.schoenAccent, 2); });
    // laptop op schoot, scherm naar Noor
    ctx.save(); ctx.beginPath(); ctx.moveTo(nx - 120, 655); ctx.lineTo(nx + 120, 655); ctx.lineTo(nx + 100, 540); ctx.lineTo(nx - 100, 540); ctx.closePath(); shape(ctx, '#3A4458', '#5A6478', 2); ctx.restore();
    roundRect(ctx, nx - 130, 650, 260, 16, 5); shape(ctx, '#4A5468', '#5A6478', 1.5);
    // onze cel zit nu in de lens van haar oog
    _w4Lbl(ctx, 'onze cel: in de lens van haar oog', 1000, 262, C.goud, 'left');
    antwoordTegels(ctx, 1520, 400, 4, -1);
  },
};
