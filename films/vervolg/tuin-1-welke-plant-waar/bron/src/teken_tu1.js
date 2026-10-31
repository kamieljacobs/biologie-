// Wat word jij? · Tuin- en landschapsinrichting 1 · Welke plant waar? — eigen tekeningen (v1.0, 31 okt 2026).
// Planten echt getekend: rododendron (elliptisch leerachtig blad, verspreid, gave rand, rozet aan de top), sering (tegenoverstaand, hartvormig),
// hulst (verspreid, stekelige rand), vaste plant (pol). Chlorose: geel tússen de nerven, nerven groen, jongste blad het eerst.
// Kleuren: groen = plant, oker = bodem/kalk/basisch, teal = water/zuur, paars = genen en auxine, koraal = 'let op', goud = focus.

const _dk = (hex, k = 0.25) => _mixHex(hex, '#000000', k), _lt = (hex, k = 0.25) => _mixHex(hex, '#FFFFFF', k);
const BLAD = '#3F7A48', BLAD_J = '#5C9A55', GEEL = '#E2CC58', NERF = '#2F6A3A', TAK = '#6A5240';
const BODEM = '#5A4632', KALK = C.oker;

// ---------- blad ----------
// blad langs +x vanaf de steelaanzet (x,y), lengte L, hoek ang. o.vorm 'rhodo' | 'sering' | 'hulst'; o.chl 0..1 = chlorose (geel tussen de nerven)
function _bladPad(ctx, L, vorm) { ctx.beginPath();
  if (vorm === 'sering') { const W = L * 0.42; ctx.moveTo(0, 0); ctx.bezierCurveTo(-0.1 * L, -W * 1.15, 0.45 * L, -W * 1.2, L, 0); ctx.bezierCurveTo(0.45 * L, W * 1.2, -0.1 * L, W * 1.15, 0, 0); return; }
  if (vorm === 'hulst') { const W = L * 0.3, N = 5, pts = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40, w = W * Math.pow(Math.sin(Math.PI * u), 0.75); pts.push([u * L, -w]); }
    // stekels: N per kant, naar buiten en iets naar voren
    const up = [[0, 0]]; for (let k = 0; k < N; k++) { const u0 = (k + 0.3) / (N + 0.4), u1 = (k + 1) / (N + 0.4), um = (u0 + u1) / 2, w = (u) => W * Math.pow(Math.sin(Math.PI * u), 0.75);
      up.push([u0 * L, -w(u0) * 0.78]); up.push([um * L + L * 0.03, -w(um) * 0.7]); up.push([u1 * L + L * 0.02, -w(u1) - W * 0.38]); }
    up.push([L, 0]); ctx.moveTo(0, 0); up.forEach(p => ctx.lineTo(p[0], p[1])); for (let i = up.length - 2; i >= 1; i--) ctx.lineTo(up[i][0], -up[i][1]); ctx.closePath(); return; }
  const W = L * 0.21; ctx.moveTo(0, 0); ctx.bezierCurveTo(L * 0.2, -W * 1.25, L * 0.72, -W * 1.2, L, 0); ctx.bezierCurveTo(L * 0.72, W * 1.2, L * 0.2, W * 1.25, 0, 0); }
function blad(ctx, x, y, L, ang, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01 || L < 2) return; const vorm = o.vorm || 'rhodo', chl = o.chl || 0;
  const base = o.col || (vorm === 'sering' ? '#5E9A55' : vorm === 'hulst' ? '#2E5E3A' : BLAD);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // steeltje
  ctx.strokeStyle = _dk(base, 0.15); ctx.lineWidth = Math.max(1.2, L * 0.03); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-L * 0.12, 0); ctx.lineTo(0, 0); ctx.stroke();
  _bladPad(ctx, L, vorm); ctx.fillStyle = chl > 0.01 ? _mixHex(base, GEEL, chl) : base; ctx.fill();
  if (vorm === 'hulst') { ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.beginPath(); ctx.ellipse(L * 0.45, -L * 0.07, L * 0.32, L * 0.06, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  if (o.verbrand > 0.01) { ctx.save(); _bladPad(ctx, L, vorm); ctx.clip(); ctx.fillStyle = rgba('#8C5A3A', o.verbrand); ctx.beginPath(); ctx.ellipse(L * 0.92, 0, L * 0.22, L * 0.3, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(L * 0.5, -L * 0.24, L * 0.2, L * 0.07, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  // nerven: bij chlorose blijven ze groen, met een smalle groene zoom
  const nerf = chl > 0.01 ? NERF : _lt(base, 0.18), w0 = vorm === 'rhodo' ? L * 0.21 : vorm === 'sering' ? L * 0.42 : L * 0.3;
  const wAt = (u) => w0 * Math.pow(Math.sin(Math.PI * clamp(u, 0, 1)), 0.8);
  const lat = (lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; const n = vorm === 'sering' ? 5 : 7;
    for (let i = 1; i <= n; i++) { const u = i / (n + 1.3), u2 = Math.min(0.97, u + 0.14); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(u * L, 0); ctx.quadraticCurveTo((u + 0.03) * L, sg * wAt(u) * 0.55, u2 * L, sg * wAt(u2) * 0.82); ctx.stroke(); } } };
  if (o.nerf !== false && L > 40) { ctx.save(); _bladPad(ctx, L, vorm); ctx.clip();
    if (chl > 0.01) { ctx.globalAlpha *= chl; lat(Math.max(2, L * 0.03), rgba(BLAD_J, 0.85)); ctx.strokeStyle = rgba(BLAD_J, 0.85); ctx.lineWidth = Math.max(3, L * 0.045); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L * 0.95, 0); ctx.stroke(); ctx.globalAlpha /= chl; }
    lat(Math.max(1, L * 0.011), nerf); ctx.restore(); }
  ctx.strokeStyle = nerf; ctx.lineWidth = Math.max(1.2, L * 0.02); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L * 0.94, 0); ctx.stroke();
  ctx.restore(); }

// ---------- rododendronbloem en tros ----------
function rhodoBloem(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.48, y + Math.sin(an) * r * 0.48, r * 0.56, r * 0.42, an, 0, 6.283); ctx.fillStyle = i === 0 ? _lt(col, 0.12) : col; ctx.fill(); }
  ctx.fillStyle = _dk(col, 0.35); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + (k - 1.5) * r * 0.16, y - r * 0.5 + Math.abs(k - 1.5) * r * 0.06, r * 0.06, 0, 6.283); ctx.fill(); }
  circ(ctx, x, y, r * 0.16, _lt(col, 0.45)); ctx.restore(); }
function tros(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; const P = [[0, -1.1], [-0.95, -0.55], [0.95, -0.55], [-1.1, 0.35], [1.1, 0.35], [-0.45, 0.2], [0.45, 0.2], [0, -0.3], [0, 0.75]];
  P.forEach(([dx, dy]) => rhodoBloem(ctx, x + dx * r * 0.78, y + dy * r * 0.78, r * 0.55, col, a)); }

// ---------- rododendrontwijg: verspreide bladeren met zichtbare tussenruimte, rozet + eindknop aan de top ----------
// o.chl = chlorose van het jonge blad (oud blad krijgt 20 %), o.n = aantal bladeren, o.bloem (kleur) of o.knop, o.vorm
function rhodoTwijg(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; const n = o.n || 7, Lst = 330 * s, chl = o.chl || 0, out = [];
  const st = (u) => [x + Math.sin(u * 2.2) * 14 * s, y - u * Lst];
  ctx.strokeStyle = TAK; ctx.lineWidth = 9 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const p = st(i / 20); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  ctx.strokeStyle = '#5E8A50'; ctx.lineWidth = 6 * s; ctx.beginPath(); for (let i = 12; i <= 20; i++) { const p = st(i / 20); i > 12 ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  for (let i = 0; i < n; i++) { const u = 0.12 + i * (0.8 / n), p = st(u), sg = i % 2 ? 1 : -1, jong = i >= n - 3, L = 150 * s * (jong ? 0.82 : 1);
    const an = sg > 0 ? -0.55 - (jong ? 0.35 : 0) : Math.PI + 0.55 + (jong ? 0.35 : 0); const c = jong ? chl : chl * 0.2;
    if (o.weg && o.weg[i] > 0.01) { const f = o.weg[i]; blad(ctx, p[0] + sg * 30 * f, p[1] + 320 * f * f, L, an + sg * f * 1.2, { chl: c, a: 1 - f }); continue; }
    blad(ctx, p[0], p[1], L, an, { chl: c, a: o.bladA ? o.bladA[i] : 1 }); out.push({ x: p[0] + Math.cos(an) * L * 0.5, y: p[1] + Math.sin(an) * L * 0.5, i }); }
  const top = st(1); if (o.bloem) tros(ctx, top[0], top[1] - 30 * s, 60 * s, o.bloem, 1); else { ctx.beginPath(); ctx.ellipse(top[0], top[1] - 14 * s, 11 * s, 22 * s, 0, 0, 6.283); ctx.fillStyle = '#7FA05A'; ctx.fill(); }
  ctx.restore(); return out; }

function seringTwijg(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Lst = 320 * s;
  ctx.strokeStyle = '#7A6A58'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - Lst); ctx.stroke();
  [0.2, 0.52, 0.8].forEach((u, i) => { const yy = y - u * Lst, L = 120 * s * (1 - i * 0.12); circ(ctx, x, yy, 6 * s, '#7A6A58'); blad(ctx, x, yy, L, -0.35, { vorm: 'sering' }); blad(ctx, x, yy, L, Math.PI + 0.35, { vorm: 'sering' }); });
  ctx.fillStyle = '#7FA05A'; [-1, 1].forEach(sg => { ctx.beginPath(); ctx.ellipse(x + sg * 7 * s, y - Lst - 10 * s, 7 * s, 16 * s, sg * 0.3, 0, 6.283); ctx.fill(); }); ctx.restore(); }

function hulstTwijg(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Lst = 320 * s;
  ctx.strokeStyle = '#4E6A3E'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 18 * s, y - Lst * 0.5, x + 4 * s, y - Lst); ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = 0.12 + i * 0.15, sg = i % 2 ? 1 : -1; blad(ctx, x + 10 * s * Math.sin(u * 3), y - u * Lst, 108 * s * (1 - i * 0.04), sg > 0 ? -0.5 : Math.PI + 0.5, { vorm: 'hulst' }); }
  ctx.restore(); }

// ---------- rododendronstruik: takken uit de voet, aan elke taktop een rozet ----------
const _ROZ = [[-150, -70, 0.85], [150, -75, 0.85], [-95, -130, 0.95], [95, -128, 0.95], [-170, -150, 0.8], [170, -150, 0.8], [0, -110, 0.9], [-60, -195, 1], [60, -200, 1], [-125, -215, 0.9], [125, -212, 0.9], [0, -250, 1]];
function rhodoStruik(ctx, x, yb, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const chl = o.chl || 0, bl = o.blad || 1, ks = o.kleur;
  ctx.strokeStyle = TAK; ctx.lineCap = 'round'; _ROZ.forEach(([dx, dy], i) => { ctx.lineWidth = (7 - Math.min(4, i * 0.3)) * s; ctx.beginPath(); ctx.moveTo(x + dx * 0.15 * s, yb); ctx.quadraticCurveTo(x + dx * 0.35 * s, yb + dy * 0.4 * s, x + dx * s, yb + dy * s); ctx.stroke(); });
  _ROZ.forEach(([dx, dy, k], i) => { const cx = x + dx * s, cy = yb + dy * s, L = 66 * s * k * bl, boven = dy < -180;
    for (let j = 0; j < 7; j++) { const an = -Math.PI / 2 + (j - 3) * 0.62 + (hash(i * 7 + j) - 0.5) * 0.25 + (dx > 0 ? 0.15 : dx < 0 ? -0.15 : 0); const jong = Math.abs(j - 3) <= 1;
      const c = chl * (jong ? 1 : 0.35) * (boven ? 1 : 0.75); blad(ctx, cx, cy, L * (jong ? 0.85 : 1), an + (Math.abs(an + Math.PI / 2) > 1.2 ? 0.25 * Math.sign(an + Math.PI / 2) : 0), { chl: c, nerf: L > 70, col: o.nieuw && jong ? '#5E9A55' : null }); }
    if (ks && (o.bloei || 0) > 0.01 && dy < -60) tros(ctx, cx, cy - 6 * s, 30 * s * bl, ks, o.bloei); else { ctx.beginPath(); ctx.ellipse(cx, cy - 6 * s, 6 * s, 12 * s, 0, 0, 6.283); ctx.fillStyle = '#7FA05A'; ctx.fill(); } });
  ctx.restore(); }

// vaste plant (pol) met bladscheuten; deel: 0..1 = in drie stukken uit elkaar; o.wortel = wortels zichtbaar (uitgegraven)
function pol(ctx, x, yb, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = o.deel || 0, w = o.wortel || 0;
  for (let k = 0; k < 3; k++) { const dx = (k - 1) * 150 * s * ease(d), cx = x + (k - 1) * 70 * s + dx;
    if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 3 * s; for (let r = 0; r < 7; r++) { const rx = cx + (r - 3) * 12 * s; ctx.beginPath(); ctx.moveTo(rx, yb); ctx.quadraticCurveTo(rx + (hash(k * 9 + r) - 0.5) * 50 * s, yb + 60 * s, rx + (hash(k * 5 + r) - 0.5) * 60 * s, yb + (90 + 40 * hash(r + k)) * s); ctx.stroke(); } ctx.restore();
      ctx.beginPath(); ctx.ellipse(cx, yb + 6 * s, 62 * s, 22 * s, 0, 0, 6.283); ctx.fillStyle = '#6E5A44'; ctx.fill(); }
    for (let j = 0; j < 6; j++) { const an = -Math.PI / 2 + (j - 2.5) * 0.32 + (hash(k * 13 + j) - 0.5) * 0.2; blad(ctx, cx + (j - 2.5) * 8 * s, yb - 4 * s, (110 + 40 * hash(k * 3 + j)) * s, an, { col: '#5E9A55', nerf: false }); } }
  ctx.restore(); }

// spitvork (grijze tanden, steel): x,y = punt van de tanden, an = hoek
function spitvork(ctx, x, y, s, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo((i - 1.5) * 16 * s, 0); ctx.lineTo((i - 1.5) * 16 * s, -90 * s); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-26 * s, -90 * s); ctx.lineTo(26 * s, -90 * s); ctx.stroke();
  ctx.strokeStyle = '#8C6A48'; ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(0, -90 * s); ctx.lineTo(0, -330 * s); ctx.stroke(); ctx.restore(); }

// ---------- kweekpot, stek, kap ----------
function pot(ctx, x, yb, w, h, a = 1, doorsnede = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - w / 2, yb - h); ctx.lineTo(x + w / 2, yb - h); ctx.lineTo(x + w * 0.38, yb); ctx.lineTo(x - w * 0.38, yb); ctx.closePath();
  if (doorsnede) { ctx.fillStyle = '#4A3A2C'; ctx.fill(); ctx.strokeStyle = '#B86A48'; ctx.lineWidth = 8; ctx.stroke(); ctx.fillStyle = rgba('#C9B896', 0.25); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(x + (hash(i * 3) - 0.5) * w * 0.7, yb - h * 0.08 - hash(i * 5) * h * 0.85, 3, 0, 6.283); ctx.fill(); } }
  else { ctx.fillStyle = '#B86A48'; ctx.fill(); roundRect(ctx, x - w / 2 - 6, yb - h - 4, w + 12, 22, 6); ctx.fillStyle = '#C97A55'; ctx.fill(); }
  ctx.restore(); }
// stek in vooraanzicht/doorsnede: voet op (x, yb), stengel omhoog. o.weg[7] = onderste bladeren vallen af, o.wond, o.poeder, o.aux (0..1 stroom), o.bladAux, o.wortel 0..1, o.kluit 0..1, o.t
function stek(ctx, x, yb, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Lst = 470 * s, t = o.t || 0;
  // wortels
  const wr = o.wortel || 0, kl = o.kluit || 0; if (wr > 0.01) { ctx.strokeStyle = '#EDE6D6'; ctx.lineCap = 'round';
    for (let r = 0; r < 9; r++) { const sg = r % 2 ? 1 : -1, len = (50 + 50 * hash(r * 3)) * s * wr * (1 + kl * 1.6), y0 = yb - (r * 9) * s, an = sg * (0.5 + 0.9 * hash(r * 7)); ctx.lineWidth = 4 * s;
      ctx.beginPath(); ctx.moveTo(x + sg * 10 * s, y0); ctx.quadraticCurveTo(x + sg * Math.sin(an) * len * 0.6, y0 + len * 0.4, x + sg * Math.sin(an) * len, y0 + Math.cos(an) * len); ctx.stroke();
      if (kl > 0.01) { ctx.lineWidth = 2 * s; for (let k = 0; k < 3; k++) { const u = 0.4 + k * 0.2, px = x + sg * Math.sin(an) * len * u, py = y0 + Math.cos(an) * len * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + sg * 22 * s * kl, py + 18 * s * kl); ctx.stroke(); } } } }
  // stengel
  ctx.lineCap = 'butt'; ctx.strokeStyle = '#6E5A44'; ctx.lineWidth = 26 * s; ctx.beginPath(); ctx.moveTo(x, yb); ctx.lineTo(x, yb - Lst * 0.62); ctx.stroke(); ctx.strokeStyle = '#5E8A50'; ctx.lineWidth = 22 * s; ctx.beginPath(); ctx.moveTo(x, yb - Lst * 0.62); ctx.lineTo(x, yb - Lst); ctx.stroke();
  ctx.fillStyle = '#7FA05A'; ctx.beginPath(); ctx.ellipse(x, yb - Lst - 16 * s, 12 * s, 26 * s, 0, 0, 6.283); ctx.fill();
  if ((o.wond || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.wond; ctx.fillStyle = '#E8DCB8'; roundRect(ctx, x - 13 * s, yb - 70 * s, 10 * s, 64 * s, 4 * s); ctx.fill(); ctx.restore(); }
  if ((o.poeder || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.poeder; ctx.fillStyle = '#F2F2EE'; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(x + (hash(i * 7) - 0.5) * 30 * s, yb - hash(i * 11) * 60 * s, 2.6 * s, 0, 6.283); ctx.fill(); } ctx.restore(); }
  // bladeren: 7, de onderste 4 kunnen weg
  const pos = []; for (let i = 0; i < 7; i++) { const u = 0.3 + i * 0.1, sg = i % 2 ? 1 : -1, yy = yb - u * Lst, L = 175 * s * (i >= 4 ? 0.85 : 1), an = sg > 0 ? -0.75 : Math.PI + 0.75, f = o.weg ? o.weg[i] || 0 : 0;
    if (f >= 0.999) continue; blad(ctx, x + sg * 30 * f * s, yy + 360 * s * f * f, L, an + sg * f * 1.4, { a: 1 - f }); if (i >= 4) pos.push([x + Math.cos(an) * L * 0.5, yy + Math.sin(an) * L * 0.5]); }
  // auxine (paars): uit de top en de jonge bladeren, langs de stengel naar de voet
  const ax = o.aux || 0, ba = o.bladAux || 0; if (ax > 0.01 || ba > 0.01) { ctx.save();
    for (let k = 0; k < 14; k++) { const u = ((t * 0.32 + k / 14) % 1); const yy = lerp(yb - Lst, yb - 10 * s, u); const show = ax * clamp((ax * 1.3 - u) * 4, 0, 1); if (show > 0.01) { ctx.globalAlpha = a * show; circ(ctx, x + Math.sin(k * 2.1) * 5 * s, yy, 7 * s, C.paars, _lt(C.paars, 0.4), 1.5); } }
    if (ba > 0.01) pos.forEach(([px, py], j) => { for (let k = 0; k < 3; k++) { const u = ((t * 0.45 + k / 3 + j * 0.2) % 1), xx = lerp(px, x, u), yy2 = lerp(py, yb - Lst * 0.75, u); ctx.globalAlpha = a * ba; circ(ctx, xx, yy2, 6.5 * s, C.paars, _lt(C.paars, 0.4), 1.5); } });
    const pile = Math.max(ax, ba); ctx.globalAlpha = a * pile; for (let k = 0; k < 6; k++) circ(ctx, x + (k - 2.5) * 6 * s, yb - 14 * s - (k % 2) * 9 * s, 6.5 * s, C.paars, _lt(C.paars, 0.4), 1.5); ctx.restore(); }
  ctx.restore(); return { top: [x, yb - Lst], voet: [x, yb], blad: pos }; }
function kap(ctx, x, yb, w, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - w / 2, yb); ctx.lineTo(x - w / 2, yb - h + w / 2); ctx.arc(x, yb - h + w / 2, w / 2, Math.PI, 0); ctx.lineTo(x + w / 2, yb);
  ctx.fillStyle = rgba('#AFC0D0', 0.1); ctx.fill(); ctx.strokeStyle = rgba('#AFC0D0', 0.85); ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < 22; i++) { const px = x + (hash(i * 3.3) - 0.5) * w * 0.9, py = yb - h * 0.12 - hash(i * 7.1) * h * 0.8, d = ((t * 0.08 + hash(i)) % 1) * 18; circ(ctx, px, py + d, 3 + 2 * hash(i * 2), rgba(C.teal, 0.7), rgba('#F2F2EE', 0.6), 1); }
  ctx.restore(); }

// ---------- stekpoeder, snoeischaar, mest, meter ----------
function poederPotje(ctx, x, yb, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60 * s, yb - 110 * s, 120 * s, 110 * s, 12 * s); ctx.fillStyle = '#D8DEE4'; ctx.fill(); roundRect(ctx, x - 64 * s, yb - 122 * s, 128 * s, 22 * s, 6 * s); ctx.fillStyle = '#8FA0B5'; ctx.fill();
  roundRect(ctx, x - 50 * s, yb - 84 * s, 100 * s, 50 * s, 6 * s); ctx.fillStyle = '#F2F2EE'; ctx.fill(); ctx.restore(); metaA(ctx, 'STEKPOEDER', x, yb + 38, a, C.grain, 'center', 28); }
function snoeischaar(ctx, x, y, s, an, open = 0.3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  [-1, 1].forEach(sg => { ctx.save(); ctx.rotate(sg * open * 0.4); ctx.fillStyle = '#C8463C'; roundRect(ctx, -120 * s, sg * 6 * s - 9 * s, 110 * s, 18 * s, 9 * s); ctx.fill(); ctx.fillStyle = '#D8DEE4'; ctx.beginPath(); ctx.moveTo(0, sg * 4 * s); ctx.quadraticCurveTo(40 * s, sg * 14 * s, 70 * s, 0); ctx.lineTo(0, -sg * 4 * s); ctx.closePath(); ctx.fill(); ctx.restore(); });
  circ(ctx, 0, 0, 6 * s, '#5A6478'); ctx.restore(); }
function mestZak(ctx, x, yb, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 70 * s, yb); ctx.lineTo(x - 64 * s, yb - 150 * s); ctx.lineTo(x - 50 * s, yb - 170 * s); ctx.lineTo(x + 50 * s, yb - 172 * s); ctx.lineTo(x + 64 * s, yb - 150 * s); ctx.lineTo(x + 70 * s, yb); ctx.closePath(); ctx.fillStyle = '#B89A6A'; ctx.fill();
  ctx.fillStyle = '#A3875A'; ctx.fillRect(x - 64 * s, yb - 156 * s, 128 * s, 12 * s); roundRect(ctx, x - 46 * s, yb - 120 * s, 92 * s, 70 * s, 6 * s); ctx.fillStyle = '#E8DCC0'; ctx.fill();
  blad(ctx, x - 6 * s, yb - 70 * s, 34 * s, -1.2, { col: '#5E9A55', nerf: false }); blad(ctx, x + 6 * s, yb - 70 * s, 30 * s, -2.0, { col: '#5E9A55', nerf: false }); ctx.restore();
  text(ctx, 'MEST', x, yb - 18 * s, fTekst(Math.max(20, 26 * s), 800), '#5A4632', 'center'); }
// pH-meter: kastje met display en lange pin naar beneden; (x, y) = punt van de pin
function phMeter(ctx, x, y, s, waarde, a = 1, vol = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = 7 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 170 * s); ctx.stroke();
  roundRect(ctx, x - 60 * s, y - 330 * s, 120 * s, 170 * s, 16 * s); ctx.fillStyle = '#3A4A5E'; ctx.fill(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke(); roundRect(ctx, x - 46 * s, y - 312 * s, 92 * s, 62 * s, 6 * s); ctx.fillStyle = '#C9DCC8'; ctx.fill();
  if (waarde) { ctx.globalAlpha *= vol; text(ctx, waarde, x, y - 264 * s, fTekst(42 * s, 800), '#1A2740', 'center'); } ctx.restore(); }
// grote uitlezing naast een meter
function meterUit(ctx, x, y, waarde, a = 1, col = C.text, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 82, 260, 120, 18); shape(ctx, rgba('#0D1420', 0.9), col, 3); metaText(ctx, 'pH', x - 108, y - 44, C.text2, 'left', 28);
  text(ctx, waarde, x + 18, y + 14, fTitel(76), col, 'center'); if (sub) metaText(ctx, sub, x, y + 74, C.grain, 'center', 28); ctx.restore(); }

// ---------- pH-balk 4–8 ----------
// o.pins = [[waarde, label, kleur, a]], o.band (0..1) = groene band 4,5–6 'RODODENDRON', o.zuur/o.bas (labels)
function phBalk(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (v) => x + (v - 4) / 4 * w, h = 46;
  const n = 40; for (let i = 0; i < n; i++) { const u = i / (n - 1); ctx.fillStyle = _mixHex(C.teal, C.oker, u); ctx.globalAlpha = a * 0.75; ctx.fillRect(x + u * w - w / n / 2 + (i === 0 ? w / n / 2 : 0), y, w / n + 1, h); }
  ctx.globalAlpha = a; roundRect(ctx, x, y, w, h, 10); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  for (let v = 4; v <= 8; v++) { ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(v), y + h); ctx.lineTo(X(v), y + h + 12); ctx.stroke(); text(ctx, String(v), X(v), y + h + 44, fTekst(30, 700), C.text, 'center'); }
  if (o.woorden !== false) { text(ctx, 'zuur', x - 22, y + h / 2 + 11, fTekst(32, 700), C.teal, 'right'); text(ctx, 'basisch', x + w + 22, y + h / 2 + 11, fTekst(32, 700), C.oker, 'left'); } metaA(ctx, '7 = NEUTRAAL', X(7), y - 16, o.neutraal == null ? 1 : o.neutraal, C.text2, 'center', 26);
  const b = o.band || 0; if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; roundRect(ctx, X(4.5), y - 8, X(6) - X(4.5), h + 16, 12); ctx.fillStyle = rgba(C.groen, 0.35); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.stroke(); metaText(ctx, 'RODODENDRON', (X(4.5) + X(6)) / 2, y + h + 86, C.groen, 'center', 28); ctx.restore(); }
  (o.pins || []).forEach(([v, lab, col, pa]) => { if (pa <= 0.01) return; ctx.save(); ctx.globalAlpha *= pa; const px = X(v); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px, y - 4); ctx.lineTo(px - 14, y - 30); ctx.lineTo(px + 14, y - 30); ctx.closePath(); ctx.fill(); ctx.fillRect(px - 2, y - 4, 4, h + 8);
    roundRect(ctx, px - 58, y - 86, 116, 52, 12); shape(ctx, rgba('#0D1420', 0.92), col, 2.5); text(ctx, lab, px, y - 48, fTekst(32, 800), col, 'center'); ctx.restore(); });
  ctx.restore(); return X; }

// ---------- doorsnede terras: tegels, cementzand, betonrand, tuingrond, kalk ----------
function terrasDoorsnede(ctx, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = 420, t = o.t || 0;
  ctx.fillStyle = rgba('#1E2E4A', 0.6); ctx.fillRect(120, 140, 1680, g - 140);
  // grond
  const bas = o.basisch || 0; ctx.fillStyle = _mixHex('#4E3E2E', '#7A6440', bas * 0.7); ctx.fillRect(120, g, 1680, 420);
  ctx.fillStyle = rgba('#C9B896', 0.18); for (let i = 0; i < 140; i++) { ctx.beginPath(); ctx.arc(130 + hash(i * 3) * 1660, g + 20 + hash(i * 5) * 390, 3 + 3 * hash(i), 0, 6.283); ctx.fill(); }
  // cementzand + tegels (links), betonrand
  ctx.fillStyle = '#9A927E'; ctx.fillRect(120, g - 10, 860, 70); ctx.fillStyle = rgba('#D8D0BC', 0.6); for (let i = 0; i < 90; i++) { ctx.beginPath(); ctx.arc(126 + hash(i * 9) * 850, g - 4 + hash(i * 4) * 58, 2.5, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 6; i++) { roundRect(ctx, 124 + i * 142, g - 46, 136, 38, 4); ctx.fillStyle = '#8A8E96'; ctx.fill(); }
  ctx.fillStyle = '#B4B8BE'; roundRect(ctx, 980, g - 48, 70, 260, 6); ctx.fill(); ctx.fillStyle = rgba('#7A7E86', 0.6); for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.arc(988 + hash(i * 2) * 54, g - 40 + hash(i * 6) * 240, 3, 0, 6.283); ctx.fill(); }
  // struik op de grond rechts (onderste deel) met ondiepe wortels
  rhodoStruik(ctx, 1460, g, 0.95, { chl: o.chl || 0 });
  ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let r = 0; r < 12; r++) { const sg = r % 2 ? 1 : -1, len = 120 + 160 * hash(r * 3); ctx.beginPath(); ctx.moveTo(1460 + sg * 10, g + 4); ctx.quadraticCurveTo(1460 + sg * len * 0.5, g + 40 + 30 * hash(r), 1460 + sg * len, g + 30 + 70 * hash(r * 7)); ctx.stroke(); }
  // kalk: oker korreltjes die vanuit zand en beton de grond in trekken
  const k = o.kalk || 0; if (k > 0.01) { for (let i = 0; i < 26; i++) { const u = ((t * 0.12 + hash(i * 1.7)) % 1) * k; const sx = i < 14 ? 300 + hash(i * 4) * 680 : 1015, sy = i < 14 ? g + 58 : g - 20 + hash(i * 8) * 220;
      const ex = 1180 + hash(i * 2.2) * 520, ey = g + 30 + hash(i * 6.6) * 140; ctx.globalAlpha = a * k * (u < 0.9 ? 1 : (1 - u) * 10); circ(ctx, lerp(sx, ex, u), lerp(sy, ey, u) + Math.sin(u * 6 + i) * 12, 7, rgba(C.oker, 0.8), _lt(C.oker, 0.3), 1.5); }
    ctx.globalAlpha = a * k; pijl(ctx, 700, g + 110, 1150, g + 150, C.oker, 1, 5, 20); pijl(ctx, 1060, g + 150, 1180, g + 190, C.oker, 1, 5, 20); }
  ctx.restore(); return g; }

// ---------- micro: ijzer in de grond ----------
function fe(ctx, x, y, r, vast, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = vast > 0.5 ? C.oker : C.teal; circ(ctx, x, y, r, rgba(col, 0.28), col, 3); text(ctx, 'Fe', x, y + r * 0.36, fTekst(r * 0.95, 800), _lt(col, 0.3), 'center'); ctx.restore(); }
function korrel(ctx, x, y, r, a = 1, n = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i <= 18; i++) { const an = i / 18 * 6.283, rr = r * (1.25 + 0.18 * Math.sin(an * 3 + x)); i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fillStyle = rgba('#8C6A3A', 0.7); ctx.fill(); ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < n; i++) { const an = i / n * 6.283; fe(ctx, x + Math.cos(an) * r * 0.62, y + Math.sin(an) * r * 0.62, r * 0.42, 1); } ctx.restore(); }
// wortelhaar in een uitsnede; (x0,y0) = waar de haar uit de wortel komt, lengte len naar links
function wortelHaar(ctx, x0, y0, len, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#D8CDB0'; ctx.beginPath(); ctx.moveTo(x0, y0 - 26); ctx.lineTo(x0 - len, y0 - 22); ctx.arc(x0 - len, y0, 22, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(x0, y0 + 26); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#F2EAD8'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = '#C9BC98'; ctx.fillRect(x0, y0 - 220, 280, 440); ctx.strokeStyle = '#F2EAD8'; ctx.beginPath(); ctx.moveTo(x0, y0 - 220); ctx.lineTo(x0, y0 - 26); ctx.moveTo(x0, y0 + 26); ctx.lineTo(x0, y0 + 220); ctx.stroke(); ctx.restore(); }

// ---------- bladcel met bladgroenkorrels die verbleken ----------
function bladCel(ctx, x, y, w, h, bleek = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 26); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 9; ctx.stroke();
  const P = [[-0.32, -0.3], [0.05, -0.34], [0.32, -0.22], [-0.3, 0.05], [0.33, 0.12], [-0.12, 0.32], [0.18, 0.33]]; P.forEach(([dx, dy], i) => { chloroplast(ctx, x + dx * w, y + dy * h, w * 0.2, 1, i * 0.7); if (bleek > 0.01) { ctx.beginPath(); ctx.ellipse(x + dx * w, y + dy * h, w * 0.105, w * 0.065, i * 0.7, 0, 6.283); ctx.fillStyle = rgba('#E8DC8A', 0.85 * bleek); ctx.fill(); } });
  ctx.restore(); }

// ---------- ton met duigen (beperkende factor) ----------
// staves: [[naam, hoogte 0..1, kleur]]; laag = index van de laagste; groei = extra hoogte voor stave 0
function ton(ctx, x, yb, w, h, staves, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = staves.length, sw = w / n, t = o.t || 0;
  const hs = staves.map((s2, i) => h * s2[1] + (i === (o.groeiI == null ? -1 : o.groeiI) ? (o.groei || 0) * h * 0.25 : 0)); const lvl = Math.min(...hs.map((v, i) => v)), li = hs.indexOf(lvl);
  // water
  roundRect(ctx, x + 4, yb - lvl + 6, w - 8, lvl - 6, 8); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 6, yb - lvl + 6); ctx.lineTo(x + w - 6, yb - lvl + 6); ctx.stroke();
  staves.forEach(([naam, , col], i) => { const sx = x + i * sw, hh = hs[i]; ctx.beginPath(); ctx.moveTo(sx + 3, yb); ctx.lineTo(sx + 3, yb - hh + 10); ctx.quadraticCurveTo(sx + sw / 2, yb - hh - 6, sx + sw - 3, yb - hh + 10); ctx.lineTo(sx + sw - 3, yb); ctx.closePath();
    ctx.fillStyle = rgba(col || '#8C6A48', i === li ? 0.55 : 0.32); ctx.fill(); ctx.strokeStyle = i === li ? C.koraal : '#C9A35C'; ctx.lineWidth = i === li ? 4 : 2.5; ctx.stroke();
  });
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 9; [0.06, 0.62].forEach(u => { ctx.beginPath(); ctx.moveTo(x - 6, yb - h * u * 0.9); ctx.lineTo(x + w + 6, yb - h * u * 0.9); ctx.stroke(); });
  staves.forEach(([naam], i) => { const sx = x + i * sw; ctx.save(); ctx.translate(sx + sw / 2 + 11, yb - 40); ctx.rotate(-Math.PI / 2); text(ctx, naam, 0, 0, fTekst(32, 800), i === li ? C.koraal : C.text, 'left'); ctx.restore(); });
  // overloop bij de laagste duig
  const ox = x + li * sw + sw / 2, oy = yb - lvl; ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ox - 20, oy + 2); ctx.quadraticCurveTo(ox + 10, oy + 4, ox + 18, oy + 34); ctx.stroke();
  for (let k = 0; k < 5; k++) { const u = (t * 1.1 + k / 5) % 1; circ(ctx, ox + 22 + u * 8, oy + 40 + u * 150, 6, rgba(C.teal, 0.85 * (1 - u))); }
  ctx.restore(); return { lvl, li, ox, oy }; }

// ---------- pictogrammen standplaats ----------
function picHalfschaduw(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; zon(ctx, x + 40 * s, y - 40 * s, 40 * s, 1, t); ctx.fillStyle = '#3F6E45'; [[-30, -10, 60], [20, 10, 52], [-60, 24, 44], [0, 34, 50]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 6.283); ctx.fill(); }); ctx.fillStyle = TAK; ctx.fillRect(x - 12 * s, y + 60 * s, 18 * s, 60 * s); ctx.restore(); }
function picVocht(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - 70 * s); ctx.bezierCurveTo(x + 50 * s, y - 10 * s, x + 50 * s, y + 40 * s, x, y + 40 * s); ctx.bezierCurveTo(x - 50 * s, y + 40 * s, x - 50 * s, y - 10 * s, x, y - 70 * s); shape(ctx, rgba(C.teal, 0.45), C.teal, 3);
  ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 5 * s; for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k / 3) % 1; ctx.globalAlpha = a * (1 - u); ctx.beginPath(); ctx.moveTo(x - 20 * s + k * 20 * s, y + 60 * s + u * 40 * s); ctx.lineTo(x - 20 * s + k * 20 * s, y + 74 * s + u * 40 * s); ctx.stroke(); } ctx.restore(); }

// ---------- sleuteltegel ----------
function tegelK(ctx, x, y, w, h, s2, kies, a = 1, eind = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); const k = clamp(kies, -1, 1);
  shape(ctx, k > 0 ? rgba(C.goud, 0.18 * k) : rgba('#0D1420', 0.85), k > 0 ? _mixHex('#8FA0B5', C.goud, k) : (k < 0 ? rgba(C.line, 0.4) : C.line), k > 0 ? 3.5 : 2);
  text(ctx, s2, x + w / 2, y + h / 2 + 12, fTekst(32, 700), k > 0.5 ? C.goud : k < 0 ? rgba(C.text2, 1) : C.text, 'center');
  if (eind) { metaText(ctx, eind, x + w / 2, y + h + 38, k < 0 ? C.text2 : C.grain, 'center', 28); } ctx.restore(); }

// ---------- flora (dik boek) ----------
function flora(ctx, x, y, s, open = 0, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (open < 0.5) { roundRect(ctx, -110, -150, 220, 300, 10); ctx.fillStyle = '#2E5E3A'; ctx.fill(); ctx.fillStyle = '#EDE6D6'; ctx.fillRect(110, -146, 34, 292); ctx.strokeStyle = rgba('#B8B0A0', 0.8); ctx.lineWidth = 1; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(112, -140 + i * 21); ctx.lineTo(142, -140 + i * 21); ctx.stroke(); }
    text(ctx, 'FLORA', 0, -40, fTitel(46), '#F2EAD8', 'center'); blad(ctx, -30, 50, 80, -0.6, { col: '#9AC48A', nerf: false }); }
  else { [-1, 1].forEach(sg => { roundRect(ctx, sg > 0 ? 0 : -260, -170, 260, 340, 8); ctx.fillStyle = '#F2EEE4'; ctx.fill(); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.stroke(); });
    const flip = (t * 0.9) % 1; if (flip < 0.6) { const u = flip / 0.6; ctx.save(); ctx.scale(Math.cos(u * Math.PI), 1); roundRect(ctx, 0, -170, 260, 340, 8); ctx.fillStyle = '#E6E0D2'; ctx.fill(); ctx.strokeStyle = '#B8B0A0'; ctx.stroke(); ctx.restore(); }
    ctx.font = fMeta(18); ctx.fillStyle = '#5A6478'; ctx.textAlign = 'left'; const L = ['112a', '112b', '113a', '113b', '114a', '114b', '115a'], R = ['115b', '116a', '116b', '117a', '117b', '118a', '118b'];
    L.forEach((n, i) => { ctx.fillText(n, -240, -130 + i * 44); ctx.fillRect(-180, -138 + i * 44, 120 + (i * 37 % 50), 4); ctx.fillText('→ ' + (113 + i), -50, -130 + i * 44); });
    R.forEach((n, i) => { ctx.fillText(n, 20, -130 + i * 44); ctx.fillRect(80, -138 + i * 44, 110 + (i * 29 % 40), 4); }); }
  ctx.restore(); }

// ---------- etiket in het gras (onleesbaar) ----------
function etiket(ctx, x, yb, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yb); ctx.rotate(0.25); ctx.beginPath(); ctx.moveTo(-36 * s, -200 * s); ctx.lineTo(36 * s, -200 * s); ctx.lineTo(36 * s, -40 * s); ctx.lineTo(0, 0); ctx.lineTo(-36 * s, -40 * s); ctx.closePath(); ctx.fillStyle = '#E8E2D4'; ctx.fill();
  ctx.strokeStyle = rgba('#5A6478', 0.55); ctx.lineWidth = 4 * s; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-24 * s, -170 * s + i * 30 * s); for (let k = 0; k < 6; k++) ctx.lineTo(-24 * s + k * 9 * s, -170 * s + i * 30 * s + (hash(i * 7 + k) - 0.5) * 12 * s); ctx.stroke(); }
  ctx.restore(); ctx.fillStyle = rgba('#2F4A3A', 0.9 * a); for (let i = 0; i < 26; i++) { const gx = x - 140 * s + i * 11 * s, gh = (30 + 50 * hash(i * 3)) * s; ctx.beginPath(); ctx.moveTo(gx - 4 * s, yb + 4); ctx.lineTo(gx + (hash(i) - 0.5) * 14 * s, yb - gh); ctx.lineTo(gx + 4 * s, yb + 4); ctx.fill(); } }

// ---------- zaaddoos van rododendron (open, met fijne zaadjes) ----------
function zaaddoos(ctx, x, y, s, a = 1, zaad = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A3A'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2 + (i - 2) * 0.32); ctx.beginPath(); ctx.ellipse(0, -22 * s, 9 * s, 26 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = '#6A5240'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 40 * s); ctx.stroke();
  if (zaad > 0.01) { ctx.fillStyle = '#C9A35C'; for (let i = 0; i < 16; i++) { const u = clamp(zaad * 1.5 - hash(i) * 0.5, 0, 1); ctx.globalAlpha = a * u; ctx.beginPath(); ctx.ellipse(x + (hash(i * 3) - 0.5) * 60 * s, y - 40 * s + u * (60 + 40 * hash(i * 7)) * s, 2.5 * s, 4 * s, 0.4, 0, 6.283); ctx.fill(); } } ctx.restore(); }

// ---------- genen als balkjes (paars) ----------
function genBalk(ctx, x, y, w, patroon, a = 1, lbl = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = patroon.length, sw = w / n; roundRect(ctx, x, y, w, 30, 8); ctx.fillStyle = '#2A3446'; ctx.fill();
  patroon.forEach((p, i) => { ctx.fillStyle = p ? C.paars : _lt(C.paars, 0.55); roundRect(ctx, x + i * sw + 2, y + 3, sw - 4, 24, 5); ctx.fill(); }); if (lbl) metaText(ctx, lbl, x + w / 2, y + 66, C.grain, 'center', 28); ctx.restore(); }

// ---------- stamper met stuifmeel (doorsnede) ----------
function stamper(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // vruchtbeginsel onderaan, stijl omhoog, stempel boven
  ctx.beginPath(); ctx.moveTo(-14, -330); ctx.lineTo(-14, -120); ctx.bezierCurveTo(-110, -110, -120, 40, 0, 50); ctx.bezierCurveTo(120, 40, 110, -110, 14, -120); ctx.lineTo(14, -330); ctx.closePath(); ctx.fillStyle = rgba(C.groen, 0.28); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -345, 42, 20, 0, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.5); ctx.fill(); ctx.stroke();
  // zaadbeginsel met eicel
  ctx.beginPath(); ctx.ellipse(0, -30, 44, 58, 0, 0, 6.283); ctx.fillStyle = rgba('#F2EAD8', 0.18); ctx.fill(); ctx.strokeStyle = '#D8CDB0'; ctx.lineWidth = 2.5; ctx.stroke();
  circ(ctx, 0, -60, 17, rgba(C.paars, 0.55), _lt(C.paars, 0.4), 2.5);
  // stuifmeelkorrel + buis
  const b = o.best || 0, v = o.bevr || 0; if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; const py = lerp(-470, -372, ease(b)); circ(ctx, 0, py, 18, '#E0B64A', '#F0CC7A', 2); for (let i = 0; i < 10; i++) { const an = i * 0.628; circ(ctx, Math.cos(an) * 19, py + Math.sin(an) * 19, 3.5, '#F0CC7A'); } ctx.restore(); }
  if (v > 0.01) { const ye = lerp(-360, -84, ease(v)); ctx.strokeStyle = '#F0CC7A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -362); ctx.bezierCurveTo(8, -280, -8, -180, 0, ye); ctx.stroke(); circ(ctx, 0, ye, 8, C.paars, _lt(C.paars, 0.4), 2); }
  ctx.restore(); }

// ---------- kalender ----------
function kalender(ctx, x, y, s, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['SEP', 'OKT', 'NOV', 'DEC'], i = Math.min(3, Math.floor(u * 3.999)), f = (u * 3.999) % 1;
  roundRect(ctx, x - 90 * s, y - 70 * s, 180 * s, 190 * s, 10); ctx.fillStyle = '#F2EEE4'; ctx.fill(); ctx.fillStyle = C.koraal; ctx.fillRect(x - 90 * s, y - 70 * s, 180 * s, 50 * s);
  text(ctx, M[i], x, y + 70 * s, fTitel(64 * s), '#1A2740', 'center');
  if (i < 3 && f > 0.55) { const k = (f - 0.55) / 0.45; ctx.save(); ctx.translate(x, y - 20 * s); ctx.scale(1, 1 - k); roundRect(ctx, -90 * s, 0, 180 * s, 140 * s, 8); ctx.fillStyle = '#E6E0D2'; ctx.fill(); ctx.restore(); }
  for (let k = -1; k <= 1; k += 2) circ(ctx, x + k * 45 * s, y - 70 * s, 8 * s, '#5A6478'); ctx.restore(); }

// ---------- kasje (lijntekening, glas) als plaatsaanduiding achter planten op navy ----------
function kasLijn(ctx, x0, x1, yb, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#AFC0D0', 0.35); ctx.lineWidth = 3; const xm = (x0 + x1) / 2, ys = yb - h * 0.7;
  ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x0, ys); ctx.lineTo(xm, yb - h); ctx.lineTo(x1, ys); ctx.lineTo(x1, yb); ctx.stroke(); ctx.lineWidth = 1.5; for (let i = 1; i < 8; i++) { const xx = lerp(x0, x1, i / 8), yt = xx < xm ? lerp(ys, yb - h, (xx - x0) / (xm - x0)) : lerp(yb - h, ys, (xx - xm) / (x1 - xm)); ctx.beginPath(); ctx.moveTo(xx, yb); ctx.lineTo(xx, yt); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x0, ys); ctx.lineTo(x1, ys); ctx.stroke(); ctx.fillStyle = rgba('#5A4632', 0.7); ctx.fillRect(x0, yb - 30, x1 - x0, 30); ctx.restore(); }

// ---------- plattegrond van de tuin (bovenaanzicht) ----------
// o.lijnen (0..1 opbouw), o.zon, o.half, o.schaduw, o.nat, o.bas, o.planten, o.sering, o.rhodo, o.bed, o.zuur (hele tuin teal), o.t
function plattegrond(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = o.lijnen == null ? 1 : o.lijnen;
  roundRect(ctx, x, y, w, h, 8); ctx.fillStyle = rgba('#2F4A3A', 0.35 * L); ctx.fill();
  const zone = (k, fn) => { if ((k || 0) <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; fn(); ctx.restore(); };
  zone(o.zuur, () => { roundRect(ctx, x, y, w, h, 8); ctx.fillStyle = rgba(C.teal, 0.25); ctx.fill(); });
  zone(o.zon, () => { roundRect(ctx, x + w * 0.55, y + h * 0.12, w * 0.43, h * 0.5, 30); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.stroke(); zon(ctx, x + w * 0.9, y + h * 0.22, 22, 1, o.t || 0); });
  zone(o.half, () => { ctx.beginPath(); ctx.ellipse(x + w * 0.24, y + h * 0.28, w * 0.2, h * 0.22, 0, 0, 6.283); ctx.fillStyle = rgba('#8FA0B5', 0.22); ctx.fill(); ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba('#AFC0D0', 0.8); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); });
  zone(o.schaduw, () => { ctx.beginPath(); ctx.ellipse(x + w * 0.11, y + h * 0.14, w * 0.11, h * 0.13, 0, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.55); ctx.fill(); });
  zone(o.nat, () => { ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.66, w * 0.12, h * 0.1, 0.2, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.4); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.stroke(); });
  zone(o.bas, () => { roundRect(ctx, x + w * 0.28, y + h * 0.7, w * 0.46, h * 0.1, 10); ctx.fillStyle = rgba(C.oker, 0.45); ctx.fill(); ctx.strokeStyle = C.oker; ctx.lineWidth = 2; ctx.stroke(); });
  // vaste delen: haag achter, huis + terras voor, boom linksboven
  ctx.globalAlpha = a * L; ctx.fillStyle = '#2F5E3A'; ctx.fillRect(x, y, w, h * 0.06); ctx.fillStyle = '#5A6478'; ctx.fillRect(x, y + h * 0.94, w, h * 0.06); metaText(ctx, 'HUIS', x + w / 2, y + h - 6, C.text2, 'center', 28);
  roundRect(ctx, x + w * 0.3, y + h * 0.8, w * 0.42, h * 0.14, 4); ctx.fillStyle = '#8A8E96'; ctx.fill(); ctx.strokeStyle = '#B4B8BE'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x + w * 0.3 + i * w * 0.07, y + h * 0.8); ctx.lineTo(x + w * 0.3 + i * w * 0.07, y + h * 0.94); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; roundRect(ctx, x, y, w, h, 8); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + w * 0.14, y + h * 0.18, 46, 0, 6.283); ctx.fillStyle = rgba('#3F6E45', 0.9); ctx.fill(); circ(ctx, x + w * 0.14, y + h * 0.18, 6, TAK);
  // planten
  const pc = (px, py, r, col, k) => { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; circ(ctx, px, py, r * ease(k), rgba(col, 0.55), col, 2.5); circ(ctx, px, py, 4, col); ctx.restore(); };
  const P = o.planten || 0; [[0.62, 0.2, 26], [0.75, 0.3, 22], [0.88, 0.45, 26], [0.6, 0.48, 20], [0.08, 0.35, 18], [0.42, 0.18, 22], [0.92, 0.15, 18]].forEach(([u, v, r], i) => pc(x + u * w, y + v * h, r, C.groen, clamp(P * 7 - i, 0, 1)));
  if ((o.bed || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.bed; roundRect(ctx, x + w * 0.17, y + h * 0.2, w * 0.15, h * 0.16, 6); ctx.fillStyle = rgba(C.teal, 0.3); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  pc(x + w * 0.245, y + h * 0.28, 30, '#C86FA0', o.rhodo || 0); pc(x + w * 0.7, y + h * 0.75, 34, '#A98BD0', o.sering || 0);
  ctx.restore(); return { rhodo: [x + w * 0.245, y + h * 0.28], sering: [x + w * 0.7, y + h * 0.75], bas: [x + w * 0.51, y + h * 0.75], zon: [x + w * 0.76, y + h * 0.37], half: [x + w * 0.24, y + h * 0.28], nat: [x + w * 0.3, y + h * 0.66], schaduw: [x + w * 0.11, y + h * 0.14] }; }

// tablet met (verkleinde) plattegrond, voor in de hand
function tablet(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70 * s, y - 50 * s, 140 * s, 100 * s, 10 * s); ctx.fillStyle = '#1E232C'; ctx.fill(); roundRect(ctx, x - 62 * s, y - 42 * s, 124 * s, 84 * s, 4 * s); ctx.fillStyle = '#2F4A3A'; ctx.fill(); ctx.fillStyle = rgba(C.goud, 0.6); ctx.fillRect(x + 10 * s, y - 30 * s, 40 * s, 30 * s); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fillRect(x - 30 * s, y + 20 * s, 60 * s, 10 * s); ctx.restore(); }
