// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: BIO, membraanBoog, celRond, plantencel, rodeBloedcel, bloedvat, eiwitVouw, longblaasje, wortelHaren, _kkHelix, _kkPad, nierBijnier
const BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
const _bioPolyCache = {};
function bioPad(ctx, pts, closed = false) { // Catmull-Rom door punten
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]);
  const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}
function bioPunt(pts, u) { // punt + richting op fractie u (0..1) van een polylijn
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function bioDicht(pts, n = 80) { // gladde, gelijk verdeelde punten langs een pad
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  out.push(pts[m - 1]); return out;
}
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-r * 0.9, -r * 0.85); ctx.quadraticCurveTo(r * 1.3, 0, -r * 0.9, r * 0.85); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.9, -r * 0.85); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}
function _eiwitB_soort(n) { // h = helix, s = streng, l = lus
  const k = Array(n).fill('l'); const zet = (a, b, c) => { for (let i = Math.round(a * n); i < Math.min(n, Math.round(b * n)); i++) k[i] = c; };
  zet(0.04, 0.3, 'h'); zet(0.36, 0.5, 's'); zet(0.55, 0.69, 's'); zet(0.74, 0.96, 'h'); return k;
}
function _eiwitB_pad(pts, stappen) { // punten op een polylijn op cumulatieve afstanden
  const len = [0]; for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  let j = 1; return stappen.map(d => { while (j < pts.length - 1 && len[j] < d) j++; const f = clamp((d - len[j - 1]) / ((len[j] - len[j - 1]) || 1), 0, 1); const an = Math.atan2(pts[j][1] - pts[j - 1][1], pts[j][0] - pts[j - 1][0]); return [lerp(pts[j - 1][0], pts[j][0], f), lerp(pts[j - 1][1], pts[j][1], f), an]; });
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0, kleur = null, seed = 4 } = o; if (a <= 0.01) return; const n = kinds.length;
  const soort = _eiwitB_soort(n); const st = r * 2.1;
  const stap = soort.map(k => k === 'h' ? st * 0.42 : st * 0.95); const cum = [0]; for (let i = 1; i < n; i++) cum.push(cum[i - 1] + (stap[i] + stap[i - 1]) / 2);
  const L = cum[n - 1];
  // 1. secundair, uitgestrekt
  const sec = cum.map((d, i) => { let x = (d - L / 2) * 0.6, y = Math.sin(d / L * Math.PI * 2) * r * 3.2, z = 0; if (soort[i] === 'h') { const ph = i / 3.6 * 6.283; y += Math.sin(ph) * r * 1.4; x += Math.cos(ph) * r * 0.75; z = Math.cos(ph); } else if (soort[i] === 's') y += (i % 2 ? 1 : -1) * r * 0.25; return [x, y, z]; });
  // 2. kluwen: serpentine door het enzymsilhouet (holte rechts), helix als spiraal rond die lijn
  const Rv = u => { let rr = 1 + 0.07 * Math.sin(u * 5 + seed) + 0.04 * Math.sin(u * 9 + seed * 2); const d = Math.abs(((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI); if (d < 0.5) rr *= 1 - 0.5 * Math.pow(0.5 + 0.5 * Math.cos(Math.PI * d / 0.5), 0.7); return rr; };
  const ring = []; [[0.8, 1], [0.52, -1], [0.25, 1]].forEach(([k, dir], ri) => { for (let i = 0; i <= 48; i++) { const u = dir > 0 ? lerp(0.6 + ri * 0.2, 5.68 - ri * 0.1, i / 48) : lerp(5.68 - ri * 0.1, 0.6 + ri * 0.2, i / 48); ring.push([Math.cos(u) * Rv(u) * k, Math.sin(u) * Rv(u) * k]); } });
  let L1 = 0; for (let i = 1; i < ring.length; i++) L1 += Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]);
  const R0 = L / L1 * 0.97; const ringS = ring.map(p => [p[0] * R0, p[1] * R0]);
  const op = _eiwitB_pad(ringS, cum);
  const ter = op.map((p, i) => { if (soort[i] !== 'h') return [p[0], p[1], 0]; const ph = i / 3.6 * 6.283, nx = -Math.sin(p[2]), ny = Math.cos(p[2]); return [p[0] + nx * Math.sin(ph) * r * 1.1 + Math.cos(p[2]) * Math.cos(ph) * r * 0.55, p[1] + ny * Math.sin(ph) * r * 1.1 + Math.sin(p[2]) * Math.cos(ph) * r * 0.55, Math.cos(ph)]; });
  const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const f1 = ease(clamp(fold / 0.5, 0, 1)), f2 = ease(clamp((fold - 0.5) / 0.5, 0, 1));
  const pts = begin.map((b, i) => { const w = wander(i + 900, t, r * 0.12, 0.6); const x1 = lerp(b[0], sec[i][0], f1), y1 = lerp(b[1], sec[i][1], f1);
    return [cx + lerp(x1, ter[i][0], f2) + w.x, cy + lerp(y1, ter[i][1], f2) + w.y, lerp(sec[i][2] * f1, ter[i][2], f2)]; });
  const eiwit = kleur === 'eiwit'; const kc = eiwit ? C.enzym : V.ew; const lijnCol = _mixHex(kc, '#FFFFFF', 0.38);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // silhouet van het enzym verschijnt als de kluwen dicht is
  if (f2 > 0.6) { const k = (f2 - 0.6) / 0.4; const om = []; for (let q = 0; q < 64; q++) { const u = q / 64 * 6.283, rr = Rv(u) * R0 * 1.0 + r * 1.05; om.push([cx + Math.cos(u) * rr, cy + Math.sin(u) * rr]); }
    ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(_mixHex(kc, '#1A2740', 0.55), 0.85), rgba(_mixHex(kc, '#FFFFFF', 0.2), 0.8), Math.max(1, r * 0.12));
    ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.3); ctx.beginPath(); const hp = []; for (let q = -10; q <= 10; q++) { const u = q / 10 * 0.5; const rr = Rv(u) * R0 + r * 1.05; hp.push([cx + Math.cos(u) * rr, cy + Math.sin(u) * rr]); } bioPad(ctx, hp, false); ctx.stroke(); ctx.restore(); }
  // waterstofbruggen tussen de twee strengen (in de kluwen liggen ze in naburige ringen)
  if (f2 > 0.7) { const s1 = [], s2 = []; soort.forEach((k, i) => { if (k === 's') (i < n * 0.52 ? s1 : s2).push(i); }); ctx.save(); ctx.globalAlpha *= (f2 - 0.7) / 0.3; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.setLineDash([r * 0.3, r * 0.3]);
    s1.forEach(i => { let best = -1, bd = r * 3.2; s2.forEach(j => { const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (d < bd) { bd = d; best = j; } }); if (best >= 0) { ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[best][0], pts[best][1]); ctx.stroke(); } }); ctx.setLineDash([]); ctx.restore(); }
  const items = []; pts.forEach((p, i) => { items.push({ z: p[2], i }); if (i) items.push({ z: Math.min(p[2], pts[i - 1][2]) - 0.02, l: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = pts[it.l], q = pts[it.l - 1], z = (it.z + 1) / 2; ctx.strokeStyle = rgba(lijnCol, 0.45 + 0.5 * z); ctx.lineWidth = Math.max(1.5, r * (soort[it.l] === 'h' ? 0.3 + 0.3 * z : 0.3)); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
    const p = pts[it.i], z = (p[2] + 1) / 2, rr = r * (soort[it.i] === 'h' ? 0.55 + 0.25 * z : 0.8);
    if (eiwit) { ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, _mixHex(_mixHex(kc, '#1A2740', 0.4), kc, 0.25 + 0.75 * z), _mixHex(kc, '#FFFFFF', 0.35), Math.max(1, r * 0.1)); }
    else { ctx.save(); ctx.globalAlpha *= 0.65 + 0.35 * z; bead(ctx, p[0], p[1], rr, kinds[it.i], { ess }); ctx.restore(); } });
  ctx.restore(); pts.plek = [cx + Rv(0) * R0 + r, cy]; return pts;
}
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, t = 0, golf = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o;
  const E = eiwitten.map(e => typeof e === 'number' ? { an: e, soort: 'eiwit', open: 0 } : Object.assign({ soort: 'eiwit', open: 0 }, e));
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const Rg = an => R + golf * Math.sin(an * R / (60 * s) + t * 0.9) * kr * 0.5;           // lichte golving langs de boog
  const ret = { eiwit: E.map(e => [cx + Math.cos(e.an) * Rg(e.an), cy + Math.sin(e.an) * Rg(e.an), e.an]), punt: an => [cx + Math.cos(an) * Rg(an), cy + Math.sin(an) * Rg(an)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const blad = (buiten) => { for (let i = 0; i <= n; i++) { let an = lerp(a0, a1, i / n); an += (Math.sin(t * 1.3 + i * 2.7 + (buiten ? 0 : 5)) * 0.25 * kr) / R * golf; // koppen schuiven
      if (E.some(e => Math.abs(an - e.an) * R < kr * (e.soort === "kanaal" ? 6.5 : 5))) continue; const Rk = Rg(an) + (buiten ? 1 : -1) * (sl + gap);
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = buiten ? -1 : 1; const tx = -uy, ty = ux; const kw = Math.sin(t * 2 + i) * 0.15 * golf;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * (sd * 0.6 + kw) * kr, hy + uy * d * sl * 0.5 + ty * (sd * 0.6 + kw) * kr, hx + ux * d * sl + tx * (sd * 0.35 + kw) * kr, hy + uy * d * sl + ty * (sd * 0.35 + kw) * kr); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, _mixHex(kop, '#FFFFFF', 0.3), 1); } };
  blad(true); blad(false);
  // eiwitten: bundel helices die de laag overspannen; kanaal = twee helften met porie
  E.forEach(e => { const p = ret.punt(e.an); ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(e.an + Math.PI / 2); // lokaal: x langs de laag, y loodrecht (−y = buiten)
    const H = sl * 2 + kr * 2 + gap * 2 + kr * 2.4, hw = kr * 1.7; const licht = _mixHex(eiwitCol, '#FFFFFF', 0.3), donker = _mixHex(eiwitCol, '#1A2740', 0.3);
    // α-helix als kralen (verbeterronde 2): van boven (−y, buiten) naar onder of omgekeerd; ends = [boven, onder] in lokale maat
    const kb = Math.max(hw * 0.34, 2.2), kst = hw < 12 ? 1.6 : 0.95, helix = (x0, h, sch, omlaag, fase) => { const c2 = Math.cos(sch), s2 = Math.sin(sch), P = (yy) => [x0 - yy * s2, yy * c2];
      const A = P(-h / 2), B = P(h / 2); _kkHelix(ctx, omlaag ? A : B, omlaag ? B : A, kb, eiwitCol, { fase, amp: 0.55, stap: kst }); return [A, B]; };
    const lus = (p, q, buiten) => { const m = [(p[0] + q[0]) / 2, (buiten ? Math.min(p[1], q[1]) : Math.max(p[1], q[1])) + (buiten ? -1 : 1) * hw * 0.9]; _kkPad(ctx, [p, m, q], kb, eiwitCol, { stap: 2.1 }); };
    if (e.soort === 'kanaal') { const op = clamp(e.open, 0, 1); const sp = kr * (0.25 + 1.2 * op);
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * sp, 0);
        const h1 = helix(sd * hw * 0.55, H * 0.92, sd * 0.06 * (1 - op), true, 0), h2 = helix(sd * hw * 1.65, H * 0.8, -sd * 0.08, false, 2);
        lus(h1[1], h2[1], false); lus(h2[0], [h2[0][0] + sd * hw * 1.2, h2[0][1] - hw * 0.6], true); _kkPad(ctx, [[h1[0][0] - sd * hw * 0.5, h1[0][1] - hw * 1.1], h1[0]], kb, eiwitCol, { stap: 2.1 }); ctx.restore(); }
      if (op > 0.05) { ctx.save(); ctx.globalAlpha *= op; for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(0, -H * 0.3 + q * H * 0.3 + Math.sin(t * 3 + q) * kr * 0.3, kr * 0.35, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); } ctx.restore(); } }
    else { const E4 = []; for (let k = 0; k < 4; k++) E4.push(helix((k - 1.5) * hw * 1.05, H * (0.86 + 0.08 * Math.sin(k * 2.1)), (k % 2 ? 1 : -1) * 0.12, k % 2 === 0, k * 1.3));
      for (let k = 0; k < 3; k++) lus(k % 2 === 0 ? E4[k][1] : E4[k][0], k % 2 === 0 ? E4[k + 1][1] : E4[k + 1][0], k % 2 === 1);
      _kkPad(ctx, [[E4[0][0][0] - hw * 0.9, E4[0][0][1] - hw * 1.2], [E4[0][0][0] - hw * 0.2, E4[0][0][1] - hw * 0.9], E4[0][0]], kb, eiwitCol, { stap: 2.1 }); // N-staart buiten
      _kkPad(ctx, [E4[3][0], [E4[3][0][0] + hw * 0.5, E4[3][0][1] - hw * 1.0], [E4[3][0][0] + hw * 1.3, E4[3][0][1] - hw * 0.9]], kb, eiwitCol, { stap: 2.1 }); }
    ctx.restore(); });
  ctx.restore(); return ret;
}
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [], seed = 1 } = o;
  const s = o.s != null ? o.s : clamp(r / 250, 0.25, 1.5);
  const T = clamp(r * 0.1, 4, 34) * Math.min(1.3, Math.max(0.7, s));   // membraandikte
  const rIn = r - T;                                                     // binnenkant membraan
  const kx = cx + r * 0.17, ky = cy - r * 0.1, kr = r * 0.32;
  const gA = 3.55, gx = kx + Math.cos(gA) * (kr + r * 0.2), gy = ky + Math.sin(gA) * (kr + r * 0.2);
  const ret = { kern: [kx, ky, kr], er: [kx + Math.cos(0.9) * (kr + r * 0.12), ky + Math.sin(0.9) * (kr + r * 0.12)], golgi: [gx, gy],
    mito: [cx + Math.cos(2.4) * r * 0.62, cy + Math.sin(2.4) * r * 0.62], membraan: an => [cx + Math.cos(an) * (r - T / 2), cy + Math.sin(an) * (r - T / 2)] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const golf = an => 1 + 0.006 * Math.sin(an * 3 + t * 0.7 + seed) + 0.004 * Math.sin(an * 5 - t * 0.5);
  const cirkel = (rr) => { ctx.beginPath(); for (let i = 0; i <= 96; i++) { const an = i / 96 * 6.283; const q = rr * golf(an); i ? ctx.lineTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q) : ctx.moveTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q); } ctx.closePath(); };
  // cytoplasma
  cirkel(r - T * 0.5); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  const lod = r >= 150 ? 2 : r >= 60 ? 1 : 0;
  const schok = (i) => { const k = Math.floor(t * 0.8 + hash(i * 3.3 + seed)); const f = ease(clamp((t * 0.8 + hash(i * 3.3 + seed)) - k, 0, 0.3) / 0.3);
    const an0 = hash(i * 7 + k) * 6.283, an1 = hash(i * 7 + k + 1) * 6.283; const m = r * 0.012; return [lerp(Math.cos(an0), Math.cos(an1), f) * m, lerp(Math.sin(an0), Math.sin(an1), f) * m]; };
  ctx.save(); cirkel(rIn); ctx.clip();
  // rustige textuur: vrije ribosomen
  const nr = Math.round(r * r / 260); for (let i = 0; i < nr; i++) { const an = hash(i * 5 + 1 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + 2 + seed)) * rIn;
    const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr; if (Math.hypot(px - kx, py - ky) < kr + 4) continue;
    ctx.beginPath(); ctx.arc(px, py, Math.max(0.7, r * 0.0055), 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.32); ctx.fill(); }
  if (organellen) {
    // cytoskelet: dunne lijnen vanuit het centrosoom naast de kern
    if (lod >= 1) { const zx = kx + Math.cos(3.0) * (kr + r * 0.06), zy = ky + Math.sin(3.0) * (kr + r * 0.06); ctx.strokeStyle = rgba(C.line, 0.28); ctx.lineWidth = 0.75;
      for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283 + 0.2; const L = rIn * 1.6; ctx.beginPath(); ctx.moveTo(zx, zy); ctx.quadraticCurveTo(zx + Math.cos(an + 0.25) * L * 0.5, zy + Math.sin(an + 0.25) * L * 0.5, zx + Math.cos(an) * L, zy + Math.sin(an) * L); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(zx, zy, Math.max(1.5, r * 0.012), 0, 6.283); ctx.fillStyle = rgba(C.line, 0.7); ctx.fill(); }
    // ruw ER: gebogen platte zakken om de kern (van ± 0,3 tot 2,3 rad), ribosomen aan de buitenkant
    const erN = lod === 2 ? 4 : lod === 1 ? 3 : 0;
    for (let k = 0; k < erN; k++) { const R0 = kr + r * (0.055 + k * 0.05), b0 = -0.2 + k * 0.12, b1 = 2.3 - k * 0.1, dik = Math.max(1.5, r * 0.012);
      const zak = (dr) => { const P = []; for (let i = 0; i <= 30; i++) { const u = i / 30, an = lerp(b0, b1, u); const rr = R0 + dr + Math.sin(u * 6.283 * 2 + k) * r * 0.008; P.push([kx + Math.cos(an) * rr, ky + Math.sin(an) * rr]); } return P; };
      const buiten = zak(dik), binnen = zak(-dik).reverse(); ctx.beginPath(); bioPad(ctx, buiten.concat(binnen), true); shape(ctx, rgba(C.er, 0.22), rgba(C.er, 0.85), Math.max(0.8, r * 0.004));
      if (lod === 2) { ctx.fillStyle = C.ribo; for (let i = 1; i < buiten.length - 1; i += 2) { const p = buiten[i], an = Math.atan2(p[1] - ky, p[0] - kx); ctx.beginPath(); ctx.arc(p[0] + Math.cos(an) * dik * 1.3, p[1] + Math.sin(an) * dik * 1.3, Math.max(1, r * 0.007), 0, 6.283); ctx.fill(); } } }
    // golgi: 5 gebogen zakjes, bol naar de kern toe, met blaasjes aan de buitenkant
    if (lod >= 1) { const nz = lod === 2 ? 5 : 3, ang = gA; ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang + Math.PI / 2);
      for (let k = 0; k < nz; k++) { const w = r * (0.27 - k * 0.022), yy = -k * r * 0.036, th = r * 0.014; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08, w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08 - 2 * th, -w / 2, yy); ctx.closePath(); shape(ctx, rgba(C.golgi, 0.85), lighten(C.golgi, 0.3), Math.max(0.6, r * 0.003)); }
      for (let k = 0; k < 4; k++) { const sx = (k - 1.5) * r * 0.06 + (hash(k + seed) - 0.5) * r * 0.02, sy = -nz * r * 0.03 - r * 0.02 - hash(k * 2) * r * 0.03; ctx.beginPath(); ctx.arc(sx, sy, r * 0.014, 0, 6.283); shape(ctx, C.ves, C.vesR, 0.8); }
      ctx.restore(); }
    // mitochondriën (± 0,15 r lang), verdeeld in de ring tussen kern en membraan
    const nm = lod === 2 ? 8 : lod === 1 ? 5 : 2; const mL = r * 0.17;
    for (let k = 0; k < nm; k++) { const an = 1.9 + k * (4.6 / nm) + (hash(k * 9 + seed) - 0.5) * 0.3, rr = r * (0.58 + 0.16 * hash(k * 4 + seed)); const [dx, dy] = schok(k);
      const mx = cx + Math.cos(an) * rr + dx, my = cy + Math.sin(an) * rr + dy, rot = an + 1.3 + (hash(k * 5) - 0.5) * 1.2;
      if (Math.hypot(mx - kx, my - ky) < kr + mL * 0.6 || Math.hypot(mx - gx, my - gy) < r * 0.15) continue;
      if (lod === 2 && mL >= 36) mitochondrion(ctx, mx, my, mL, rot, 1, 4, t);
      else { ctx.save(); ctx.translate(mx, my); ctx.rotate(rot); roundRect(ctx, -mL / 2, -mL * 0.21, mL, mL * 0.42, mL * 0.21); shape(ctx, C.mito, C.mitoR, 1); if (lod >= 1) { ctx.strokeStyle = rgba(C.mitoR, 0.8); ctx.lineWidth = 0.8; for (let q = 0; q < 3; q++) { const qx = -mL * 0.25 + q * mL * 0.25, d = q % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(qx, d * mL * 0.2); ctx.lineTo(qx, -d * mL * 0.02); ctx.stroke(); } } ctx.restore(); } }
    // lysosomen en blaasjes
    if (lod >= 1) { for (let k = 0; k < 4; k++) { const an = [4.1, 5.5, 0.9, 2.9][k] + (hash(k * 11 + seed) - 0.5) * 0.4, rr = r * (0.5 + 0.28 * hash(k * 13 + seed)); const [dx, dy] = schok(k + 20); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.035, 0, 6.283); shape(ctx, rgba(C.lyso, 0.85), lighten(C.lyso, 0.35), 1); }
      for (let k = 0; k < 6; k++) { const an = 2.6 + k * 0.32, rr = r * (0.72 + 0.12 * hash(k * 17 + seed)); const [dx, dy] = schok(k + 40); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.02, 0, 6.283); shape(ctx, rgba(C.ves, 0.8), C.vesR, 0.8); } }
    // kern: dubbel kernmembraan met poriën, chromatine als vage vlekken, kernlichaampje
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, rgba(C.kern, 0.8), C.kernR, Math.max(1, r * 0.006));
    ctx.save(); ctx.beginPath(); ctx.arc(kx, ky, kr - 1, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#3E2E66', 0.35);
    for (let i = 0; i < 12; i++) { const an = hash(i * 2.1 + seed) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.85; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.2, kr * 0.11, an, 0, 6.283); ctx.fill(); }
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(kx - kr * 0.22, ky + kr * 0.12, kr * 0.24, kr * 0.2, 0.3, 0, 6.283); shape(ctx, rgba('#4A3A78', 0.95), rgba(C.kernR, 0.6), 1);
    if (lod >= 1) { const np = lod === 2 ? 14 : 8, rr = kr + Math.max(2, r * 0.012); ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(0.8, r * 0.004);
      for (let i = 0; i < np; i++) { const b0 = i / np * 6.283 + 0.06, b1 = (i + 1) / np * 6.283 - 0.06; ctx.beginPath(); ctx.arc(kx, ky, rr, b0, b1); ctx.stroke(); } }
  }
  ctx.restore();
  // membraan
  if (lod === 2) membraanBoog(ctx, cx, cy, r - T / 2, a0, a1, { s: T / 69, eiwitten });
  else { const lw = Math.max(1, T * 0.22); ctx.strokeStyle = C.er; ctx.lineWidth = lw;
    for (const rr of [r - lw / 2, rIn + lw / 2]) { ctx.beginPath(); ctx.arc(cx, cy, rr, a0, a1); ctx.stroke(); }
    if (lod === 1) { const n = Math.round(Math.abs(a1 - a0) * r / Math.max(4, T * 0.55)); ctx.fillStyle = C.er; for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); for (const rr of [r - lw, rIn + lw]) { ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(0.9, T * 0.13), 0, 6.283); ctx.fill(); } } }
    eiwitten.forEach(e => { ctx.save(); ctx.translate(cx + Math.cos(e) * (r - T / 2), cy + Math.sin(e) * (r - T / 2)); ctx.rotate(e); roundRect(ctx, -T * 0.8, -T * 0.4, T * 1.6, T * 0.8, T * 0.4); shape(ctx, C.enzym, lighten(C.enzym, 0.3), 1); ctx.restore(); }); }
  ctx.restore(); return ret;
}
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, glowSchors = glow, glowMerg = glow, urine = 0, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const anker = { bijnier: P(4, -140), bijnierSchors: P(-30, -128), bijnierMerg: P(6, -132), schors: P(-58, -30), merg: P(-20, 40), bekken: P(44, 4), urineleider: P(78, 120), slagader: P(118, -34), ader: P(122, 12) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // vaten en urineleider vanuit de hilus, gebogen (slagader boven/achter, ader ervoor, urineleider naar beneden)
  ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(56, -14); ctx.bezierCurveTo(90, -22, 110, -40, 160, -38); ctx.stroke();
  ctx.strokeStyle = '#4A6CA8'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(56, 10); ctx.bezierCurveTo(92, 14, 118, 2, 162, 8); ctx.stroke();
  const UL = [[52, 26], [72, 46], [82, 90], [76, 150], [72, 200]];
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke();
  if (urine > 0.01) { const D = bioDicht(UL, 10); for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const [px, py, an] = bioPunt(D, u); ctx.save(); ctx.globalAlpha *= urine * Math.min(1, u * 8, (1 - u) * 8); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 7, 3.2, 0, 0, 6.283); shape(ctx, '#F2D04A', '#B8941E', 1); ctx.restore(); } } // urinedruppels: verzadigd geel met donkere rand, zodat ze op de bleke urineleider opvallen
  // nier: schors (lichter) als hele vulling, kapsel als lichte rand
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#B05A48', '#E6B4A2', 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.25); for (let i = 0; i < 70; i++) { const an = hash(i * 3.3) * 6.283, rr = 0.8 + 0.18 * hash(i * 7.7); ctx.beginPath(); ctx.arc(5 + Math.cos(an) * 66 * rr, Math.sin(an) * 106 * rr, 1.6, 0, 6.283); ctx.fill(); } // nierlichaampjes (korrelig)
  // nierbekken met kelkjes, piramides met de punt in een kelkje
  const PEL = [44, 4]; const angs = [-2.3, -2.75, 3.0, 2.55, 2.1, -1.85, 1.7];
  angs.forEach((an, k) => { const bx = 5 + Math.cos(an) * 50, by = Math.sin(an) * 82, ax = lerp(bx, PEL[0], 0.58), ay = lerp(by, PEL[1], 0.58); const nx = -(ay - by), ny = ax - bx, nl = Math.hypot(nx, ny) || 1, bw = 17;
    ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw, by + ny / nl * bw); ctx.quadraticCurveTo(bx - (ax - bx) * 0.15, by - (ay - by) * 0.15, bx - nx / nl * bw, by - ny / nl * bw); ctx.lineTo(ax, ay); ctx.closePath(); shape(ctx, '#7A3428', null);
    ctx.strokeStyle = rgba('#A85A48', 0.7); ctx.lineWidth = 1.2; for (let q = -1; q <= 1; q++) { ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw * q * 0.38, by + ny / nl * bw * q * 0.38); ctx.lineTo(lerp(bx, ax, 0.85), lerp(by, ay, 0.85)); ctx.stroke(); } // strepen (buisjes)
    ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax + (ax - bx) * 0.05, ay + (ay - by) * 0.05); ctx.lineTo(lerp(ax, PEL[0], 0.75), lerp(ay, PEL[1], 0.75)); ctx.stroke(); }); // kelkje
  ctx.beginPath(); ctx.ellipse(PEL[0], PEL[1], 17, 34, 0, 0, 6.283); ctx.fillStyle = _mixHex('#E8D9A0', '#F2D04A', 0.6 * urine); ctx.fill(); // nierbekken kleurt mee bij o.urine
  ctx.restore();
  // bijnier op de bovenpool: schors (geel) buiten, merg (rood-bruin) binnen
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const gS = glowSchors * (0.75 + 0.25 * Math.sin(t * 4)), gM = glowMerg * (0.75 + 0.25 * Math.sin(t * 4 + 1));
  ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, _mixHex('#D9AE48', '#F2D27A', gS), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); shape(ctx, _mixHex('#8A4A3A', '#E07A5F', gM), gM > 0.01 ? rgba(C.goud, gM) : null, 3);
  if (gS > 0.01) { ctx.save(); ctx.globalAlpha *= gS * 0.7; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function bacterieEcht(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, flagel = false, plasmide = false, col = '#B89A62', seed = 3, fimbriae = true } = o;
  const riboHl = o.riboHl != null ? o.riboHl : (o.hlRibo || 0); const ab = clamp(antibiotica, 0, 1);
  const hw = (o.h != null ? o.h : L / 2.5) / 2, ww = Math.max(2, hw * 0.16), half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.12, ky = 0, plx = half * 0.62, ply = hw * 0.32;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky), plasmide: T(plx, ply),
    wandAt: an => T(Math.cos(an) * L / 2, Math.sin(an) * hw) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - Math.max(1.5, hw * 0.06)).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // fimbriae: korte rechte haartjes loodrecht op de wand
  if (fimbriae && hw > 14) { ctx.strokeStyle = rgba(_mixHex(col, '#FFFFFF', 0.3), 0.6); ctx.lineWidth = Math.max(0.8, hw * 0.018); omtrek(hw, 60).forEach((q, i) => { if (hash(i * 3.3 + seed) < 0.35) return; const l = hw * (0.18 + 0.1 * hash(i)); ctx.beginPath(); ctx.moveTo(q.p[0], q.p[1]); ctx.lineTo(q.p[0] + q.n[0] * l, q.p[1] + q.n[1] * l); ctx.stroke(); }); }
  // flagel aan de linkerpool, achter de cel
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 90; i++) { const u = i / 90, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba(C.text, 0.7); ctx.lineWidth = Math.max(1.2, hw * 0.05); ctx.stroke(); }
  // cytoplasma (neutraal) met ribosomen
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba('#2A3448', 0.85); ctx.fill();
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  const nr = Math.round(L * hw / 130 + 14); const rr = Math.max(0.9, hw * 0.03);
  const vrij = (px, py) => !(Math.pow((px - kx) / (half * 0.8 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.52), 2) < 1) && !(plasmide && Math.hypot(px - plx, py - ply) < hw * 0.22);
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2 + seed) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4; if (!vrij(px, py)) continue;
    const poly = hash(i * 5.5) > 0.55 ? 5 : 1; const an = hash(i * 8.1) * 6.283; for (let k = 0; k < poly; k++) { const qx = px + Math.cos(an + Math.sin(k) * 0.5) * k * rr * 2.4, qy = py + Math.sin(an + Math.sin(k) * 0.5) * k * rr * 2.4; if (!vrij(qx, qy)) break;
      ctx.beginPath(); ctx.arc(qx, qy, rr * (1 + 0.5 * riboHl), 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex(C.ribo, C.goud, riboHl) : rgba(C.ribo, 0.8); ctx.fill(); } }
  // nucleoïde: vezelig gebied zonder rand: licht vlak + veel korte kronkellussen DNA (grijs, palet B)
  ctx.beginPath(); ctx.ellipse(kx, ky, half * 0.78 + hw * 0.15, hw * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(DNA_BASE.rugR, 0.12); ctx.fill();
  ctx.strokeStyle = rgba(DNA_BASE.rugR, 0.95); ctx.lineWidth = Math.max(0.9, hw * 0.028);
  const nl = Math.round(10 + L / 12); for (let i = 0; i < nl; i++) { const u = hash(i * 4.1 + seed) * 6.283, d = Math.sqrt(hash(i * 2.3 + seed)); const bx = kx + Math.cos(u) * d * (half * 0.72), by = ky + Math.sin(u) * d * hw * 0.38;
    const lr = hw * (0.07 + 0.06 * hash(i)); const Q = []; for (let k = 0; k < 6; k++) { const v = k / 6 * 6.283 + i; Q.push([bx + Math.cos(v) * lr * (1 + 0.5 * hash(i * 9 + k)), by + Math.sin(v) * lr * 0.8 * (1 + 0.5 * hash(i * 5 + k))]); } ctx.beginPath(); bioPad(ctx, Q, true); ctx.stroke(); }
  // plasmide: klein ringetje, licht gedraaid
  if (plasmide) { const pr = hw * 0.15; const Q = []; for (let i = 0; i < 12; i++) { const u = i / 12 * 6.283; Q.push([plx + Math.cos(u) * pr * (1 + 0.15 * Math.sin(u * 3)), ply + Math.sin(u) * pr * 0.75]); }
    ctx.beginPath(); bioPad(ctx, Q, true); ctx.strokeStyle = _mixHex(DNA_BASE.rugR, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, hw * 0.035); ctx.stroke(); }
  ctx.restore();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.1, hw * 0.035);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr * 1.3, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 1 - u); ctx.fill(); } }
  // celwand: dikke band (één kleur), met gaten bij antibiotica; oplichten = gouden rand
  const wand = omtrek(hw - ww / 2, 96);
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  const rand = hlWand > 0.01 ? _mixHex(_mixHex(col, '#FFFFFF', 0.35), C.goud, hlWand) : _mixHex(col, '#FFFFFF', 0.35);
  for (const pass of [[rand, ww + Math.max(1.5, ww * 0.25)], [col, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  if (flagel) { ctx.strokeStyle = C.text; ctx.lineWidth = Math.max(1.5, hw * 0.07); ctx.beginPath(); ctx.moveTo(-L / 2 + ww * 0.5, 0); ctx.quadraticCurveTo(-L / 2 - hw * 0.15, -hw * 0.1, -L / 2 - hw * 0.25, hw * 0.05); ctx.stroke(); ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.line, C.text, 1); }
  ctx.restore(); return ret;
}
function bacterieGroot(ctx, x, y, w, h, o = {}) { const { wandKapot = 0, riboHl = 0, a = 1, t = 0 } = o; const r = bacterieEcht(ctx, x, y, w, { a, t, h, antibiotica: wandKapot, riboHl, plasmide: true }); return { wand: an => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] }; }
function _bioVoronoi(key, pts, rmax, gap = 2, N = 36) {
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const out = pts.map((p, i) => { const R = typeof rmax === 'function' ? rmax(i) : rmax, P = [];
    const buren = pts.filter((q, j) => j !== i && Math.abs(q[0] - p[0]) < R * 2.2 && Math.abs(q[1] - p[1]) < R * 2.2);
    for (let k = 0; k < N; k++) { const an = k / N * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = R;
      for (const q of buren) { const dx = q[0] - p[0], dy = q[1] - p[1], dd = Math.hypot(dx, dy), proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); }
      best = Math.max(0, best - gap / 2); P.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts: P }; });
  _bioPolyCache[key] = out; return out;
}
const DNA_BASE = {
  base: { A: '#D8604A', T: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  letter: { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE' },
  rug: '#5E6A80', rugR: '#97A3B6', fosfaat: '#7D899E', suiker: '#B4BECD',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  // verbeterronde 2 (variant B): bruggen verdeeld over de hele breedte
  plek: { A: [0.27, 0.73], T: [0.27, 0.73], G: [0.15, 0.5, 0.85], C: [0.15, 0.5, 0.85] },
  // puzzelstaaf (27 okt 2026): lengte tot de paarlijn en hoogte van de letter, in eenheden van s
  len: 80, letterY: 40
};
function _baseRand(b, px, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, f = 1 - Math.min(Math.abs(px) / hw, 1);
  if (b === 'A') return L - d + 2 * d * f; if (b === 'T' || b === 'U') return L + d - 2 * d * f;
  if (b === 'C') return Math.abs(px) <= tw ? L + d : L - d; return Math.abs(px) <= tw ? L - d : L + d; }
function basePuzzelPad(ctx, b, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, y0 = 8 * s;
  ctx.beginPath(); ctx.moveTo(-hw, y0); ctx.lineTo(hw, y0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); }
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir); ctx.translate(0, -6 * s);
  basePuzzelPad(ctx, b, s); ctx.fillStyle = kl; ctx.fill();
  if (DNA_BASE.letter[b] && DNA_BASE.letter[b] !== 'rgba(0,0,0,0)') { ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, 2 * s, w * 1.4, L + 19 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud;
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L - 6 * s), yb = y2 - sg * (_baseRand(c, px, s) - L - 6 * s);
    for (let k = 1; k <= 3; k++) _bioCirc(ctx, x + px, lerp(ya, yb, k / 4), Math.max(1, 2.4 * s), C.goud); }); ctx.restore(); }
const D2 = { // palet B (28 okt 2026): oude streng grijs, nieuwe streng bijna wit; basen = DNA_BASE, RNA-basen = RNA_BASE
  oud: '#7D899E', oudR: '#AEB8C8', nieuw: '#DCE3EC', nieuwR: '#F0F3F7',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#D8604A', T: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  rbase: { A: '#D8604A', U: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE', U: '#121A26' },
};
const D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
const d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];
const RNA_BASE = { base: { A: '#D8604A', U: '#F2CF7A', C: '#86C3E8', G: '#34609A' }, letter: { A: '#121A26', U: '#121A26', C: '#121A26', G: '#F2F2EE' } };
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polCvorm(x, y) { const ex = (x - 20) / 165, ey = y / 232; if (ex * ex + ey * ey > 1) return false; return !(x < 85 && Math.abs(y) < 122); }
function _polKlem(ctx, g, voor) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; const c = voor ? '#A4B2CA' : '#5E6C84'; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); shape(ctx, c, lighten(c, 0.3), 1); } }
function _polRomp(ctx, g, hl, al) { ctx.save(); ctx.globalAlpha *= al; const col = hl > 0.01 ? _mixHex('#66758F', C.goud, hl * 0.5) : '#66758F';
  _kkKluwen(ctx, 0, 0, _polCvorm, { bbox: [-145, -232, 185, 232], sc: g / 100, r: 9, col, seed: 4, key: 'polC' }); ctx.restore(); }
function _polVingers(ctx, g, sluit, hl) { // α-helix van de vingers: scharnier rechtsboven, klapt van schuin omhoog naar plat over de nucleotide
  const th = lerp(Math.PI - 0.75, Math.PI + 0.12, ease(sluit)), P0 = [1.0 * g, 1.3 * g], L = 1.0 * g, T = [P0[0] + Math.cos(th) * L, P0[1] + Math.sin(th) * L];
  const col = hl > 0.01 ? _mixHex('#C3CCDA', C.goud, hl * 0.6) : '#C3CCDA'; _kkHelix(ctx, P0, T, Math.max(2.5, 0.12 * g), col, { amp: 0.8 }); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); _polRomp(ctx, g, hl, 1); if (klem) _polKlem(ctx, g, false); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); if (j >= 0) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (j < 0) { _polRomp(ctx, g, hl, 0.85); if (klem) _polKlem(ctx, g, false); }
  _polVingers(ctx, g, sluit, hl);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.05 * g, 0.86 * g, 0.26 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true);
  ctx.restore(); }
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sb = Math.sin(0.7), L = [];
  for (let k = 0; k < 6; k++) { const ph = k / 6 * 6.283 + fase; L.push({ x: x + Math.sin(ph) * r * 0.78 * sb, y: y + Math.cos(ph) * r * 0.78, z: Math.sin(ph), ph, k }); }
  L.sort((p, q) => p.z - q.z);
  const band = (v) => { ctx.beginPath(); ctx.ellipse(x, y, r * 0.78 * sb, r * 0.78, 0, v ? -Math.PI / 2 : Math.PI / 2, v ? Math.PI / 2 : Math.PI * 1.5); ctx.strokeStyle = v ? '#56667F' : '#323E52'; ctx.lineWidth = r * 0.34; ctx.stroke(); };
  if (laag !== 'voor') { ctx.beginPath(); ctx.ellipse(x, y, r * 0.5 * sb, r * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill(); band(false); }
  if (laag !== 'achter') band(true);
  L.forEach(p => { const voor = p.z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const col = _mixHex('#8E9CB8', '#2A3448', 0.55 * (1 - (p.z + 1) / 2)), cc = hl > 0.01 && voor ? _mixHex(col, C.goud, hl * 0.6) : col;
    const an = Math.atan2(p.y - y, (p.x - x) / sb), rx = r * 0.36, ry = r * 0.3 * (0.75 + 0.25 * Math.abs(Math.cos(p.ph)));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(_mixHex(cc, '#121A26', 0.45), 0.7); ctx.fill();
    const E = _ellips(40, 32); _kkKluwen(ctx, 0, 0, E.binnen, { bbox: E.bbox, sc: rx / 42, r: 7, col: cc, seed: 3 + p.k, key: 'heli' + p.k }); ctx.restore(); });
  ctx.restore(); }
const _PRIM = (() => { const P = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283, d = Math.abs(((u + Math.PI) % 6.283) - Math.PI), rr = 50 * (1 + 0.08 * Math.sin(u * 5 + 2)) * (d < 0.5 ? 0.55 + d * 0.9 : 1); P.push([Math.cos(u) * rr, Math.sin(u) * rr]); } return P; })();
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const col = hl > 0.01 ? _mixHex('#6F86A0', C.goud, hl * 0.6) : '#6F86A0';
  ctx.beginPath(); bioPad(ctx, _PRIM.map(([px, py]) => [px * r / 50, py * r / 50]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(_PRIM); _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 52, r: 7, col, seed: 2, key: 'prim' }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.22, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  if (rna > 0.01) { ctx.globalAlpha *= rna; const n = 4, st = r * 0.3, x0 = r * 1.0; for (let i = 0; i < n; i++) { ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, -i * st - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); }
  ctx.restore(); }
function _ligVorm(k) { const kaak = lerp(0.62, 0.36, k); return [[-0.9, 0], [-0.6, -0.75], [0.2, -0.95], [1.05, -kaak - 0.25], [1.15, -kaak], [0.45, -0.5], [0.3, 0], [0.45, 0.5], [1.15, kaak], [1.05, kaak + 0.25], [0.2, 0.95], [-0.6, 0.75]]; }
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const k = ease(sluit), col = hl > 0.01 ? _mixHex('#8392AE', C.goud, hl * 0.6) : '#8392AE', V0 = _ligVorm(k);
  ctx.beginPath(); bioPad(ctx, V0.map(([px, py]) => [px * r, py * r]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(V0.map(([px, py]) => [px * 100, py * 100])); // rijen dwars op de opening: elke rij is één stuk, ook de kaken vullen zich
    _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 100, r: 7, col, seed: 7, key: 'lig' + Math.round(k * 4) }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.18, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, r * 1.05, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k];
  DNA_BASE.base[k] = RNA_BASE.base[b]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (o.geenLetter) return; const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter[b], 'center'); ctx.restore(); }
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, len = DNA_BASE.len * s;
  if (!vorm || 44 * s < 18) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    const v = hw > 2.5 ? 0.5 : 0; ctx.fillStyle = fill; ctx.fillRect(-hw + v, 0, hw * 2 - 2 * v, len); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.strokeRect(-hw, 0, hw * 2, len); } ctx.restore();
    if (o.staafLetter && hw >= 5) { const fs = Math.min(hw * 1.5, len * 0.4), lx = x + Math.cos(ang) * len * 0.5, ly = y + Math.sin(ang) * len * 0.5; // letter in het staafje (vork met letters)
      ctx.save(); ctx.globalAlpha *= a; text(ctx, b, lx, ly + fs * 0.35, fTekst(fs, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
    return; }
  const op = Math.sin(ang) < 0, k = (rna && b === 'U') ? 'T' : b, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore(); if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos, m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
function vorkModel(st) { const S = Object.assign({ i0: 0, i1: 120, X0: 80, cy: 450, g: 56, Dmax: 210, Lsplit: 14, Ltw: 12, Lf: 30, pl: 4, p1: 12, vlag: 1.35, startLead: 0, lead: 3 }, st);
  S.dx = S.dx || S.g * 0.17; const X = (i) => S.X0 + (i - S.i0) * S.dx;
  const D = (i) => i >= S.f ? S.g / 2 : S.g / 2 + (S.Dmax - S.g / 2) * ease((S.f - i) / S.Lsplit);
  const yT = (i) => S.cy - D(i), yB = (i) => S.cy + D(i);
  // Okazaki-fragmenten
  const frags = []; for (let k = 1; ; k++) { const p = S.p1 + (k - 1) * S.Lf; if (p - S.pl > S.f + 2) break;
    const a = p + 2, e = a + S.pl * 0.5; const primN = clamp((S.f - a) / (S.pl * 0.5), 0, 1) * S.pl; // aantal primerbasen
    const ondergrens = k === 1 ? S.startLead : S.p1 + (k - 2) * S.Lf - S.pl + 1;     // tot waar de polymerase doorbouwt (incl. vervangen primer vorige)
    const q = Math.max(ondergrens, p - S.pl + 1 - Math.max(0, S.f - e) * S.vlag);     // 3'-uiteinde (linkerkant)
    const klaar = q <= ondergrens + 0.01, fKlaar = e + (p - S.pl + 1 - ondergrens) / S.vlag;
    frags.push({ k, p, a, e, primN, q, klaar, fKlaar, ondergrens }); }
  // per bp: wat zit er op de nieuwe onderstreng? 0 = niets, 1 = DNA, 2 = RNA-primer
  const onder = (i) => { for (const F of frags) { const lo = F.p - S.pl + 1; if (i <= F.p && i >= F.p - F.primN + 1 && i >= lo) { // primerdeel van dit fragment
        const vervangen = frags.some(G => G.k === F.k + 1 && G.q <= i); return vervangen ? 1 : 2; }
      if (i < lo && i >= F.q) return 1; } return 0; };
  // ligase-knippen: na het vervangen van een primer wordt de knip bij (p_vorige - pl + 0.5) gedicht
  const knips = frags.filter(F => F.k >= 2).map(F => { const prev = frags[F.k - 2]; const xN = prev.p - S.pl + 0.5; const tKl = F.fKlaar; return { i: xN, s: clamp((S.f - tKl) / 4, 0, 1), k: F.k }; });
  return Object.assign(S, { X, D, yT, yB, frags, onder, knips }); }
function vorkTeken(ctx, st) { const M = vorkModel(st); const { g, dx, cy, f, i0, i1, X, yT, yB } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, nieuw: 1, lead: 1, lag: 1 }, M.toon || {});
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1, dx * 0.25), vorm = false, letters = !!M.letters && dx >= 30;
  // ronde 3 (Kamiel 28 okt 2026: 'sommige nucleotiden zijn dubbel zo dik?'): elke base één staafje van gelijke dikte (de helft van
  // de afstand per bp) met een duidelijke spleet. Vroeger tekende de vork bij dx ≥ 22 de puzzelvorm, die breder is dan dx: twee
  // buren liepen in elkaar over en twee gelijke basen leken één dikke. In het echt zijn alle basen even breed (0,34 nm per bp).
  const iA = Math.floor(i0), iB = Math.ceil(i1);
  // --- vóór de vork: helix die meedraait (fase volgt f) ---
  const tw = (i) => ease((i - f) / M.Ltw), fase = (i) => (i / 10) * 6.283 - f * 0.628 + 0.6;
  const Ytop = (i) => i <= f ? yT(i) : cy + lerp(-g / 2, -g / 2 * Math.cos(fase(i)), tw(i)), Ybot = (i) => i <= f ? yB(i) : cy + lerp(g / 2, g / 2 * Math.cos(fase(i) + 2.3), tw(i));
  const Ztop = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i)), tw(i)), Zbot = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i) + 2.3), tw(i));
  const pts = (fy, a, b) => { const P = []; for (let i = a; i <= b + 1e-6; i += 0.25) P.push([X(i), fy(i)]); return P; };
  // achterkant van de helix eerst
  const helixDeel = (fy, fz, kleur, voor) => { let cur = []; const segs = []; for (let i = Math.max(f, iA); i <= iB; i += 0.25) { const z = fz(i) >= 0; if (z === voor) cur.push([X(i), fy(i)]); else { if (cur.length > 1) segs.push(cur); cur = []; } } if (cur.length > 1) segs.push(cur);
    segs.forEach(P => d2Rug(ctx, P, { kleur: voor ? kleur : _mixHex(kleur, '#000000', 0.35), bw })); };
  helixDeel(Ytop, Ztop, D2.oud, false); helixDeel(Ybot, Zbot, D2.oud, false);
  // sporten vóór de vork
  for (let i = Math.max(Math.ceil(f), iA); i <= iB; i++) { const xa = X(i), ya = Ytop(i), yb = Ybot(i), mid = (ya + yb) / 2, b = d2seq(i); const z = (Ztop(i) + Zbot(i)) / 2; const dk = z < 0 ? 0.3 : 0;
    const Lh = Math.abs(yb - ya) / 2 - bw * 0.4; if (Lh < 2) continue; ctx.save(); ctx.globalAlpha *= z < 0 ? 0.8 : 1;
    d2Base(ctx, xa, ya + Math.sign(yb - ya) * bw * 0.4, yb > ya ? Math.PI / 2 : -Math.PI / 2, b, Lh, hw, { vorm: false }); d2Base(ctx, xa, yb - Math.sign(yb - ya) * bw * 0.4, yb > ya ? -Math.PI / 2 : Math.PI / 2, D2.comp[b], Lh, hw, { vorm: false }); ctx.restore(); }
  helixDeel(Ytop, Ztop, D2.oud, true); helixDeel(Ybot, Zbot, D2.oud, true);
  // --- achter de vork: twee matrijzen + nieuwe strengen ---
  const iF = Math.min(f, iB);
  if (iF > iA) {
    // helling per bp (voor schuine basen)
    const ang = (fy, i, sgn) => { const d = (fy(i + 0.3) - fy(i - 0.3)) / (0.6 * dx); return Math.atan2(1, -d) * sgn; };
    // nieuwe strengen: leidende (boven, onder de bovenmatrijs) en volgende (onder)
    const leadEind = Math.min(iF - M.lead, iB), leadStart = Math.max(M.startLead, iA);
    const yTn = (i) => yT(i) + g, yBn = (i) => yB(i) - g;
    // matrijs-basen + nieuwe basen per bp
    for (let i = iA; i <= iF; i++) { const b = d2seq(i), xa = X(i);
      const nT = toon.nieuw && toon.lead && i >= leadStart && i <= leadEind; const nB = toon.nieuw && toon.lag ? M.onder(i) : 0;
      const aT = Math.atan2(yT(i + 0.3) - yT(i - 0.3), 0.6 * dx), aB = Math.atan2(yB(i + 0.3) - yB(i - 0.3), 0.6 * dx);
      const primLead = i < M.startLead + M.pl;
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, staafLetter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, staafLetter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, staafLetter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, staafLetter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      const knip = (i) => M.knips.some(K => K.s < 1 && Math.abs(K.i - i) < 0.01);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - (knip(R.a - 0.5) ? 0.12 : 0.45), R.b + (knip(R.b + 0.5) ? 0.12 : 0.45)), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }
function _vorkYtop(M, i) { return i <= M.f ? M.yT(i) : M.cy + lerp(-M.g / 2, -M.g / 2 * Math.cos((i / 10) * 6.283 - M.f * 0.628 + 0.6), ease((i - M.f) / M.Ltw)); }
function vorkEnzymen(ctx, M, o = {}) { const { g, f, X, yT, yB, dx } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, lead: 1, lag: 1 }, M.toon || {}); const hl = o.hl || {}; const out = {};
  const gp = g * 0.55; // grootte enzym t.o.v. DNA (vereenvoudigd: in het echt groter)
  // helicase op de bovenste streng (matrijs van de leidende streng), net vóór de vork
  if (toon.helicase) { const hi = f + (M.hOff == null ? 1.8 : M.hOff), hx = X(hi), hy = _vorkYtop(M, hi); helicaseRing(ctx, hx, hy, g * 0.62, { fase: t * 2.4 + f * 0.5, laag: 'voor', hl: hl.helicase || 0 }); out.helicase = [hx, hy]; }
  // leidende polymerase
  if (toon.poly && toon.lead && M.leadEind > M.startLead) { const i = M.leadEind + 0.5, x = X(i), yc = (yT(i) + M.yTn(i)) / 2; const rot = Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx);
    polymeraseVoor(ctx, x, yc, gp, { dir: 1, up: -1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6), hl: hl.poly || 0 }); out.polyLead = [x, yc]; }
  // volgende streng: polymerase op het actieve fragment (of in de sprong naar de volgende primer)
  if (toon.poly && toon.lag && M.frags.length) { let F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); let x, y, rot = 0;
    if (F) { const i = F.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; rot = Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx); }
    else { const done = [...M.frags].reverse().find(F => F.klaar), nxt = M.frags.find(G => !G.klaar && (!done || G.k > done.k));
      if (done && nxt) { const u = clamp((f - done.fKlaar) / Math.max(0.5, nxt.e - done.fKlaar), 0, 1), i0 = done.q - 0.5, i1 = nxt.p - M.pl + 0.5; const ii = lerp(i0, i1, ease(u));
        x = X(ii); y = (yB(ii) + M.yBn(ii)) / 2 + Math.sin(Math.PI * ease(u)) * g * 1.6; } else if (done) { const i = done.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; } }
    if (x != null && (M.lagA == null ? 1 : M.lagA) > 0.01) { polymeraseVoor(ctx, x, y, gp, { dir: -1, up: 1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6 + 1), hl: hl.poly || 0, a: M.lagA == null ? 1 : M.lagA }); out.polyLag = [x, y]; } }
  // primase: bij de nieuwste primer, vlak achter de helicase
  if (toon.primase) { const F = [...M.frags].reverse().find(F => F.primN > 0.01); if (F && (F.primN < M.pl - 0.01 || f - F.e < 1.8)) { const i = F.p - F.primN + 0.5, x = X(i), y = M.yBn(i) + g * 0.55; primase(ctx, x, y, g * 0.42, { an: 0.4, hl: hl.primase || 0 }); out.primase = [x, y]; } }
  // ligase bij een knip die gedicht wordt
  if (toon.ligase) { const K = M.knips.find(K => K.s > 0 && K.s < 1); if (K) { const x = X(K.i), y = M.yBn(K.i) + g * 0.48; ligase(ctx, x, y, g * 0.55, { an: -1.2, sluit: K.s, hl: hl.ligase || 0 });
      if (K.s > 0.6) { ctx.save(); ctx.globalAlpha *= (1 - K.s) * 2.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, M.yBn(K.i), g * 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } out.ligase = [x, y]; } }
  return out; }
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + (st.hOff == null ? 1.8 : st.hOff)), _vorkYtop(M, f + (st.hOff == null ? 1.8 : st.hOff)), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx), a: st.lagA == null ? 1 : st.lagA }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
const _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }
function _ellips(rx, ry) { return { binnen: (x, y) => (x * x) / (rx * rx) + (y * y) / (ry * ry) < 1, bbox: [-rx, -ry, rx, ry] }; }
function _gdPoly(cx, cy, r, n, seed, rond = 0) { const p = []; for (let i = 0; i < n; i++) { const an = (i + 0.2 * (hash(seed + i) - 0.5)) / n * 6.283; const rr = r * (0.9 + 0.2 * hash(seed * 3 + i)); p.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]); } return p; }
function _mrbKralen(ctx, pts, r, col, lw, stap = 1.9) { const P = bioDicht(pts, 12); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba(lighten(col, 0.3), 0.6); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  k.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.2)); }); return k; }
function _tgBlob(ctx, x, y, rx, ry, seed, fill, rand, lw, wob = 0.12) { const p = []; for (let i = 0; i < 14; i++) { const u = i / 14 * 6.283; const k = 1 + wob * (hash(seed + i) - 0.5) * 2; p.push([x + Math.cos(u) * rx * k, y + Math.sin(u) * ry * k]); } ctx.beginPath(); bioPad(ctx, p, true); shape(ctx, fill, rand, lw); }
function _wbContour(x, y, r, f, n = 64) { const pts = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 - Math.PI; const rr = f(u); pts.push([x + Math.cos(u) * rr, y + Math.sin(u) * rr]); } return pts; }
function chloroplastEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 88, grana = 7, licht = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, opY = -B * 0.18, opA = A * 0.9, opB = B * 0.66;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const posG = []; for (let i = 0; i < grana; i++) { const row = i % 2; posG.push([-opA * 0.72 + opA * 1.44 * (i + 0.5) / grana + (hash(i + seed) - 0.5) * 6, opY + (row ? 0.28 : -0.12) * opB + (hash(i * 3 + seed) - 0.5) * 6]); }
  posG.sort((p, q) => p[1] - q[1]);
  const anker = { mid: P(0, 0), membraan: P(-A * 0.3, B * 0.98), granum: P(posG[3][0], posG[3][1] - 10), thylakoide: P(posG[2][0], posG[2][1]), stroma: P(A * 0.2, opY + opB * 0.55), zetmeel: P(-A * 0.4, opY + opB * 0.4), dna: P(A * 0.6, opY) };
  if (a <= 0.01) return anker;
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - u * u, 0.62); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64; for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * lang > 90;
  const kOpp = _mixHex(C.chloro, '#1A2740', 0.12), kTus = _mixHex(C.chloro, '#121A26', 0.6), kStroma = _mixHex(C.chloro, '#1A2740', 0.55), kTop = _mixHex(C.chloro, '#F2F2EE', 0.15), kZij = _mixHex(C.chloro, '#121A26', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.5); ctx.stroke();
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
  const ins = Math.max(3, B * 0.07); pad(opA - ins, opB - ins, opY); ctx.fillStyle = kStroma; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.2); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // stromalamellen tussen buren
  ctx.fillStyle = rgba(kTop, 0.8); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.7);
  for (let i = 0; i < posG.length; i++) for (let j = i + 1; j < posG.length; j++) { const [x1, y1] = posG[i], [x2, y2] = posG[j]; if (Math.hypot(x2 - x1, y2 - y1) > opA * 0.42 || hash(i * 7 + j + seed) < 0.35) continue;
    const h1 = -6 - hash(i + j) * 10, h2 = -4 - hash(i * j + 1) * 10; ctx.beginPath(); ctx.moveTo(x1, y1 + h1 - 1.6); ctx.lineTo(x2, y2 + h2 - 1.6); ctx.lineTo(x2, y2 + h2 + 1.6); ctx.lineTo(x1, y1 + h1 + 1.6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-A * 0.4, opY + opB * 0.4, A * 0.1, B * 0.13, 0.2, 0, 6.283); ctx.fillStyle = _mixHex(C.oker, '#F2F2EE', 0.25); ctx.fill(); ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.fillStyle = _mixHex(C.oker, '#121A26', 0.35); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc((hash(i * 9 + 2 + seed) - 0.5) * A * 1.3, opY + (hash(i * 9 + 4 + seed) - 0.5) * opB, 2.4, 0, 6.283); ctx.fill(); }
  if (groot) { ctx.beginPath(); ctx.ellipse(A * 0.62, opY + 2, 5.5, 4, 0.2, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  // grana als muntstapels (achter naar voor)
  for (let i = 0; i < posG.length; i++) { const [gxx, gyy] = posG[i]; const m = 4 + Math.floor(hash(i * 7 + 1 + seed) * 3), rx = 8 + hash(i * 3 + seed) * 2, ry = rx * 0.38, st = 3.4;
    for (let k = 0; k < m; k++) { const yy = gyy - k * st; ctx.beginPath(); ctx.ellipse(gxx, yy + 1.5, rx, ry, 0, 0, Math.PI); ctx.lineTo(gxx - rx, yy); ctx.ellipse(gxx, yy, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fillStyle = kZij; ctx.fill();
      ctx.beginPath(); ctx.ellipse(gxx, yy, rx, ry, 0, 0, 6.283); ctx.fillStyle = kTop; ctx.fill(); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.8); ctx.stroke(); } }
  ctx.restore();
  if (licht > 0.01) { ctx.globalAlpha *= licht; ctx.strokeStyle = lighten(C.goud, 0.35); ctx.lineWidth = lw(1.6);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); const sx = -A * 0.6 + i * 40 - 40 + u * 40, sy = -B - 70 + u * 60; ctx.save(); ctx.globalAlpha *= u < 0.8 ? 1 : (1 - u) / 0.2; ctx.beginPath(); for (let k = 0; k <= 14; k++) { const q = k / 14; ctx.lineTo(sx + q * 18 + Math.sin(q * 12) * 2.5, sy + q * 22 - Math.sin(q * 12) * 2); } ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const v = ((t * 0.3 + i / 3) % 1); const ox = A * 0.5 + v * 70, oy = B * 0.2 + i * 14 - 14 + v * 20; ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i === 1) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(ox + Math.cos(an) * 6, oy + Math.sin(an) * 6); } ctx.closePath(); ctx.strokeStyle = C.oker; ctx.lineWidth = lw(1.8); ctx.stroke(); }
      else { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 3.4, oy, 3.8, 0, 6.283); ctx.fill(); } } ctx.restore(); } }
  ctx.restore();
  return anker;
}
const _POR = { kleur: '#A4B2CA' }; // porie-eiwitten grijsblauw (C2: eiwit), niet meer lila
function kernEnvelopPorie(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r = 150, porien = 14, mrna = -1, mrnaPorie = 2, nucleolus = true, ribo = true } = o;
  const gap = Math.max(7, r * 0.075), off = 0.31; const pf = Array.from({ length: porien }, (_, i) => off + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / porien * 6.283);
  const P = (lx, ly) => [x + lx * s, y + ly * s]; const fp = pf[mrnaPorie % porien];
  const anker = { kern: P(0, 0), envelop: P(Math.cos(-1.9) * r, Math.sin(-1.9) * r), porie: P(Math.cos(fp) * r, Math.sin(fp) * r), porien: pf.map(f => P(Math.cos(f) * (r - 4), Math.sin(f) * (r - 4))),
    nucleolus: P(-r * 0.22, r * 0.12), chromatine: P(r * 0.35, r * 0.3), mrna: P(Math.cos(fp) * r * 1.35, Math.sin(fp) * r * 1.35), tussenruimte: P(Math.cos(2.6) * (r - 4), Math.sin(2.6) * (r - 4)) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * r > 90;
  const kPlasma = _mixHex(C.kern, '#2A3448', 0.45), kTus = o.tusKleur || _mixHex(C.kern, '#121A26', 0.72), kRand = C.kernR, kChrom = _mixHex(C.kernR, C.kern, 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // nucleoplasma
  ctx.beginPath(); ctx.arc(0, 0, r - gap, 0, 6.283); ctx.fillStyle = kPlasma; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - gap - 1, 0, 6.283); ctx.clip();
  // heterochromatine: dichtere vlekken tegen het binnenmembraan, niet voor de poriën
  for (let i = 0; i < 40; i++) { const f = hash(i * 7 + 1) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.12)) continue;
    ctx.beginPath(); ctx.ellipse(Math.cos(f) * (r - gap - 5), Math.sin(f) * (r - gap - 5), 9 + hash(i) * 7, 4, f + 1.57, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.75); ctx.fill(); }
  // chromatine: losse, zacht kronkelende draden
  if (groot) { ctx.strokeStyle = rgba(kChrom, 0.55); ctx.lineWidth = lw(1.5);
    for (let k = 0; k < 14; k++) { let px = (hash(k * 3) * 2 - 1) * r * 0.55, py = (hash(k * 3 + 1) * 2 - 1) * r * 0.55, an = hash(k * 3 + 2) * 6.283; ctx.beginPath(); ctx.moveTo(px, py);
      for (let j = 0; j < 30; j++) { an += Math.sin(j * 0.5 + k * 2 + t * 0.15) * 0.35; px += Math.cos(an) * 4.4; py += Math.sin(an) * 4.4; const d = Math.hypot(px, py); if (d > r * 0.72) { an = Math.atan2(-py, -px) + Math.sin(j + k) * 0.6; } ctx.lineTo(px, py); } ctx.stroke(); } }
  // nucleolus
  if (nucleolus) { ctx.beginPath(); for (let i = 0; i <= 36; i++) { const f = i / 36 * 6.283, rr = r * 0.25 * (1 + 0.07 * Math.sin(f * 3 + 1) + 0.05 * Math.sin(f * 5)); const px = -r * 0.22 + Math.cos(f) * rr, py = r * 0.12 + Math.sin(f) * rr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.closePath(); ctx.fillStyle = _mixHex(C.kern, '#121A26', 0.5); ctx.fill(); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = lw(1); ctx.stroke(); if (groot) { ctx.fillStyle = rgba(C.kernR, 0.35); for (let i = 0; i < 30; i++) { const f = hash(i * 11) * 6.283, d = Math.sqrt(hash(i * 11 + 1)) * r * 0.2; ctx.beginPath(); ctx.arc(-r * 0.22 + Math.cos(f) * d, r * 0.12 + Math.sin(f) * d, 1.4, 0, 6.283); ctx.fill(); } } }
  ctx.restore();
  // envelop: stukken dubbel membraan tussen de poriën, met ronde rand waar buiten en binnen samenkomen
  const gh = 5.5 / r; const rc = r - gap / 2;
  for (let i = 0; i < porien; i++) { const f0 = pf[i] + gh, f1 = pf[(i + 1) % porien] + (i === porien - 1 ? 6.283 : 0) - gh;
    ctx.beginPath(); ctx.arc(0, 0, r, f0, f1); ctx.arc(Math.cos(f1) * rc, Math.sin(f1) * rc, gap / 2, f1, f1 + Math.PI); ctx.arc(0, 0, r - gap, f1, f0, true); ctx.arc(Math.cos(f0) * rc, Math.sin(f0) * rc, gap / 2, f0 + Math.PI, f0 + 2 * Math.PI); ctx.closePath();
    ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // porie-complexen
  for (let i = 0; i < porien; i++) { const f = pf[i], c = Math.cos(f), sn = Math.sin(f), tx = -sn, ty = c;
    // porie-complex als kralen (eiwit, grijsblauw): per kant een kort kettinkje dwars door de envelop
    const kr = Math.max(0.55 / s, 1.6), kc = _POR.kleur;
    for (const sg of [-1, 1]) { const ox = tx * sg * (gh * r + 1.5), oy = ty * sg * (gh * r + 1.5), nk = Math.max(2, Math.round(gap * 1.6 / (kr * 1.8)));
      for (let k = 0; k < nk; k++) { const d = rc + (k - (nk - 1) / 2) * kr * 1.8; ctx.beginPath(); ctx.arc(c * d + ox, sn * d + oy, kr, 0, 6.283); shape(ctx, k % 2 ? lighten(kc, 0.1) : kc, groot ? lighten(kc, 0.3) : null, lw(0.7)); } }
    if (groot) { const kl = (pts) => { const P = bioDicht(pts, 30); let acc = 0; P.forEach((p, i) => { if (i) acc += Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]); if (i === 0 || acc >= kr * 1.6) { acc = 0; ctx.beginPath(); ctx.arc(p[0], p[1], kr * 0.75, 0, 6.283); shape(ctx, kc, null); } }); };
      for (const sg of [-1, 1]) kl([[c * (r + 1) + tx * sg * 4, sn * (r + 1) + ty * sg * 4], [c * (r + 9) + tx * sg * 6, sn * (r + 9) + ty * sg * 6]]); // draadjes naar het cytoplasma
      kl([[c * (r - gap) + tx * 5, sn * (r - gap) + ty * 5], [c * (r - gap - 10) + tx * 2.5, sn * (r - gap - 10) + ty * 2.5], [c * (r - gap - 10) - tx * 2.5, sn * (r - gap - 10) - ty * 2.5], [c * (r - gap) - tx * 5, sn * (r - gap) - ty * 5]]); } } // mandje
  // ribosomen op het buitenste kernmembraan
  if (ribo && groot) { ctx.fillStyle = C.ribo; for (let i = 0; i < 70; i++) { const f = hash(i * 13 + 5) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.07)) continue; ctx.beginPath(); ctx.arc(Math.cos(f) * (r + 3.6), Math.sin(f) * (r + 3.6), 1.9, 0, 6.283); ctx.fill(); } }
  // mRNA door een porie naar buiten (5'-eind voorop)
  if (mrna >= 0) { const c = Math.cos(fp), sn = Math.sin(fp), tx = -sn, ty = c; const pad = [];
    for (let i = 0; i <= 60; i++) { const u = i / 60; const d = lerp(r * 0.2, r - gap / 2, u); pad.push([c * d + tx * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u), sn * d + ty * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u)]); }
    for (let i = 1; i <= 50; i++) { const u = i / 50; const d = r - gap / 2 + u * r * 0.75; pad.push([c * d + tx * Math.sin(u * 9) * 12 * u, sn * d + ty * Math.sin(u * 9) * 12 * u]); }
    const cum = [0]; for (let i = 1; i < pad.length; i++) cum.push(cum[i - 1] + Math.hypot(pad[i][0] - pad[i - 1][0], pad[i][1] - pad[i - 1][1]));
    const tot = cum[cum.length - 1], Ls = r * 0.95, kop = lerp(Ls * 0.95, tot, clamp(mrna, 0, 1)), staart = kop - Ls;
    const op = (dd) => { let i = 1; while (i < cum.length - 1 && cum[i] < dd) i++; const u = (dd - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]); return [lerp(pad[i - 1][0], pad[i][0], u), lerp(pad[i - 1][1], pad[i][1], u)]; };
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(2); ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [px, py] = op(Math.max(0, staart) + (kop - Math.max(0, staart)) * k / 60); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const [hx, hy] = op(kop); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, 6.283); ctx.fill();
    const m = op(kop - Ls * 0.3); anker.mrna = P(m[0], m[1]); }
  ctx.restore();
  return anker;
}
function mitochondrionEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 86, cristae = 11, deling = 0, stoffen = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, n = 2.4, d = clamp(deling, 0, 1);
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const opY = -B * 0.2, opA = A * 0.9, opB = B * 0.66;
  const anker = { mid: P(0, 0), buiten: P(0, B), binnen: P(-A * 0.5, opY - opB + 5), crista: P(-A * 0.1, opY), matrix: P(A * 0.3, opY + opB * 0.4), dna: P(A * 0.5, opY) };
  if (a <= 0.01) return anker;
  const knijp = (lx, aa) => 1 - d * 0.97 * Math.exp(-Math.pow(lx / (aa * 0.17), 2));
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - Math.pow(u, n), 1 / n) * knijp(lx, aa); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64;
    for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.7) / s;
  const kOpp = C.mito, kTus = _mixHex(C.mito, '#1A2740', 0.55), kHol = _mixHex(C.mito, '#1A2740', 0.38), kPlaat = _mixHex(C.mito, '#F2F2EE', 0.12), kSchaduw = _mixHex(C.mito, '#1A2740', 0.22);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // buitenkant (onderste, naar ons toe gekeerde helft van de wand)
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.6); ctx.stroke();
  // snijvlak: buitenmembraan, tussenruimte, binnenmembraan
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.5); ctx.stroke();
  const ins = Math.max(3.5, B * 0.09);
  pad(opA - ins, opB - ins, opY); ctx.fillStyle = kHol; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // achterwand: lichtere strook bovenin (de binnenkant van de wand die we zien)
  pad(opA - ins, opB - ins, opY - (opB - ins) * 0.55); ctx.fillStyle = _mixHex(C.mito, '#1A2740', 0.3); ctx.fill();
  if (s * lang > 90) for (let i = 0; i < 22; i++) { const lx = (hash(i * 7 + seed) * 2 - 1) * opA * 0.85, ly = opY + (hash(i * 7 + 3 + seed) * 2 - 1) * opB * 0.6; const w = wander(i + 300 + seed, t, 1.4, 0.6);
    ctx.beginPath(); ctx.arc(lx + w.x, ly + w.y, 1.4, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.5); ctx.fill(); }
  // cristae als platen dwars op de as: voet op de wand (onder), steken omhoog de matrix in
  const nc = s * lang < 60 ? Math.max(4, Math.round(cristae / 2)) : cristae;
  for (let i = 0; i < nc; i++) {
    const lx = -opA + ins + (2 * opA - 2 * ins) * (i + 0.5 + (hash(i * 13 + seed) - 0.5) * 0.3) / nc;
    const hb = se(opA - ins, opB - ins, lx); if (hb < opB * 0.35) continue;
    const vanOnder = (i + seed) % 3 !== 1; const hoog = hb * 2 * (0.62 + 0.3 * hash(i * 5 + seed));
    const y0 = vanOnder ? opY + hb + 2 : opY - hb - 2, y1 = vanOnder ? y0 - hoog : y0 + hoog;
    const w = Math.max(3.2, lang / 40), sk = (hash(i * 9 + seed) - 0.5) * 6 + Math.sin(t * 0.5 + i) * 0.6;
    ctx.beginPath(); ctx.moveTo(lx - w, y0); ctx.lineTo(lx - w * 0.8 + sk, y1); ctx.quadraticCurveTo(lx + sk, y1 + (vanOnder ? -w : w), lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath();
    ctx.fillStyle = kPlaat; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx + w * 0.15, y0); ctx.lineTo(lx + w * 0.15 + sk, y1 + (vanOnder ? 1 : -1) * w * 0.4); ctx.lineTo(lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath(); ctx.fillStyle = kSchaduw; ctx.fill();
  }
  if (s * lang > 90) for (const [dx, r] of [[A * 0.52, 6], [-A * 0.62, 5]]) { ctx.beginPath(); ctx.ellipse(dx, opY + 4, r, r * 0.75, 0.3, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  ctx.restore();
  // stoffen erin en eruit
  if (stoffen > 0.01) { ctx.globalAlpha *= stoffen;
    for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const inX = lerp(-A - 60, -A * 0.4, u), inY = opY + (i - 1.5) * 14;
      ctx.save(); ctx.globalAlpha *= u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15;
      if (i % 2) { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(inX + dd * 3.2, inY, 3.6, 0, 6.283); ctx.fill(); } }
      else { ctx.strokeStyle = C.oker; ctx.lineWidth = lw(2.4); ctx.beginPath(); ctx.moveTo(inX - 8, inY + 2); ctx.lineTo(inX, inY - 3); ctx.lineTo(inX + 8, inY + 2); ctx.stroke(); } ctx.restore();
      const v = ((t * 0.25 + i / 4 + 0.5) % 1); const ox = lerp(A * 0.4, A + 70, v), oy = opY + (i - 1.5) * 16;
      ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i % 2) { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(ox - 6, oy, 4, 0, 6.283); ctx.fill(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(ox + 2 + k * 5.5, oy, 2.4, 0, 6.283); ctx.fill(); } }
      else { ctx.fillStyle = C.mens; ctx.beginPath(); ctx.arc(ox, oy, 3.4, 0, 6.283); ctx.fill(); ctx.fillStyle = lighten(C.teal, 0.2); for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 6, oy, 3, 0, 6.283); ctx.fill(); } }
      ctx.restore(); }
  }
  ctx.restore();
  return anker;
}
const _PC_HOEK = [[-300, -165], [-70, -212], [240, -196], [312, 4], [262, 208], [-40, 222], [-286, 172], [-322, 2]];
function _pcVorm(hoek, N) { // afgeronde veelhoek (Chaikin), gelijk verdeeld in N punten
  let p = hoek.map(q => q.slice()); for (let it = 0; it < 3; it++) { const n = []; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; const k = it === 0 ? 0.12 : 0.25; n.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k)], [lerp(a[0], b[0], 1 - k), lerp(a[1], b[1], 1 - k)]); } p = n; }
  const cum = [0]; for (let i = 1; i <= p.length; i++) { const a = p[i - 1], b = p[i % p.length]; cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); } const tot = cum[p.length]; const out = [];
  for (let k = 0; k < N; k++) { const d = tot * k / N; let i = 1; while (cum[i] < d) i++; const u = (d - cum[i - 1]) / (cum[i] - cum[i - 1]); const a = p[i - 1], b = p[i % p.length]; out.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u)]); } return out; }
function _pcNormaal(pts) { return pts.map((p, i) => { const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length]; let nx = b[1] - a[1], ny = -(b[0] - a[0]); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (nx * p[0] + ny * p[1] < 0) { nx = -nx; ny = -ny; } return [nx, ny]; }); }
function plantencel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, plasmolyse = 0, nadruk = null, stroom = true } = o; const pl = ease(clamp(plasmolyse, 0, 1));
  const N = 200, wand = 15; const buiten = _pcVorm(_PC_HOEK, N), nB = _pcNormaal(buiten);
  const binnen = buiten.map((p, i) => [p[0] - nB[i][0] * wand, p[1] - nB[i][1] * wand]);
  const RXp = 205, RYp = 140, cxp = 10, cyp = 0;
  const proto = binnen.map((p, i) => { const q = [p[0] - nB[i][0] * 1.5, p[1] - nB[i][1] * 1.5]; const th = Math.atan2(q[1] - cyp, q[0] - cxp); const re = 1 / Math.sqrt(Math.cos(th) ** 2 / (RXp * RXp) + Math.sin(th) ** 2 / (RYp * RYp)); return [lerp(q[0], cxp + Math.cos(th) * re, pl), lerp(q[1], cyp + Math.sin(th) * re, pl)]; });
  const nP = _pcNormaal(proto); const iK = Math.round(N * 0.58); // kern in de rand, linksonder
  const rand = (i) => { const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); return 26 + 4 * pl + 62 * Math.exp(-Math.pow(d / 10, 2)); };
  const vac = proto.map((p, i) => [p[0] - nP[i][0] * rand(i), p[1] - nP[i][1] * rand(i)]);
  const kernP = [proto[iK][0] - nP[iK][0] * 46, proto[iK][1] - nP[iK][1] * 46];
  const S = (p) => [x + p[0] * s, y + p[1] * s];
  const nC = 14, chl = []; for (let k = 0; k < nC; k++) { let f = (k + 0.5) / nC + (stroom ? t * 0.006 : 0); f = ((f % 1) + 1) % 1; const i = Math.floor(f * N); const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); if (d < 14) continue;
    const p = proto[i], n = nP[i], tg = Math.atan2(n[0], -n[1]); chl.push([p[0] - n[0] * 14, p[1] - n[1] * 14, tg]); }
  const iM = [Math.round(N * 0.08), Math.round(N * 0.33), Math.round(N * 0.83)].map(i => { const p = proto[i], n = nP[i]; return [p[0] - n[0] * 13, p[1] - n[1] * 13, Math.atan2(n[0], -n[1])]; });
  const PDI = [18, 26, 68, 118, 126, 166], PD = PDI.map(i => buiten[i]); // in paren, zoals ze vaak in groepjes (putvelden) liggen
  const iR = Math.round(N * 0.23);
  const anker = { cel: S([0, 0]), celwand: S(buiten[Math.round(N * 0.12)]), celmembraan: S(proto[Math.round(N * 0.95)]), vacuole: S([40, -10]), kern: S(kernP), bladgroenkorrel: S(chl[2] || [0, 0]), cytoplasma: S([(proto[iR][0] + vac[iR][0]) / 2, (proto[iR][1] + vac[iR][1]) / 2]),
    plasmodesma: S(PD[1]), mito: S(iM[1]), ruimte: S([(binnen[iR][0] + proto[iR][0]) / 2, (binnen[iR][1] + proto[iR][1]) / 2]) };
  if (a <= 0.01) return anker;
  const A = (n) => (nadruk === null || nadruk === n) ? 1 : 0.35; const lw = (px) => Math.max(px * s, 0.6) / s;
  const pad = (lst) => { ctx.beginPath(); lst.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // celwand: cellulose, middenlamel aan de buitenrand, plasmodesmata als kanaaltjes
  ctx.save(); ctx.globalAlpha *= A('wand'); ctx.beginPath(); buiten.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); binnen.slice().reverse().forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  ctx.fillStyle = _mixHex(C.groen, '#1A2740', 0.5); ctx.fill('evenodd');
  ctx.strokeStyle = rgba(C.groen, 0.35); ctx.lineWidth = lw(0.8); for (const f of [0.35, 0.65]) { pad(buiten.map((p, i) => [p[0] - nB[i][0] * wand * f, p[1] - nB[i][1] * wand * f])); ctx.stroke(); }
  pad(buiten); ctx.strokeStyle = _mixHex(C.groen, '#F2F2EE', 0.2); ctx.lineWidth = lw(2); ctx.stroke(); pad(binnen); ctx.strokeStyle = lighten(C.groen, 0.1); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.restore();
  // ruimte tussen wand en protoplast (buitenvloeistof bij plasmolyse)
  pad(binnen); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.82); ctx.fill();
  // protoplast: cytoplasma, dan vacuole
  ctx.save(); ctx.globalAlpha *= A('cytoplasma'); pad(proto); ctx.fillStyle = '#2C3A52'; ctx.fill(); ctx.restore();
  ctx.save(); pad(proto); ctx.clip();
  for (let i = 0; i < 70; i++) { const k = Math.floor(hash(i * 3) * N), dd = 4 + hash(i * 3 + 1) * Math.max(4, rand(k) - 8); const p = proto[k], n = nP[k]; ctx.beginPath(); ctx.arc(p[0] - n[0] * dd, p[1] - n[1] * dd, 1.3, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.14); ctx.fill(); }
  ctx.save(); ctx.globalAlpha *= A('vacuole'); pad(vac); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.62); ctx.fill(); ctx.strokeStyle = lighten(C.teal, 0.25); ctx.lineWidth = lw(1.4); ctx.stroke(); ctx.restore();
  ctx.restore();
  ctx.restore();
  // organellen in de rand (binnen het membraan)
  iM.forEach((m, k) => { const p = S(m); mitochondrionEcht(ctx, p[0], p[1], s, { a: a * A('mito'), t, rot: m[2], lang: 26, dik: 12, cristae: 4, seed: k }); });
  chl.forEach((c, k) => { const p = S(c); chloroplastEcht(ctx, p[0], p[1], s * 0.27, { a: a * A('bladgroen'), t, rot: c[2], seed: k }); });
  const pk = S(kernP); kernEnvelopPorie(ctx, pk[0], pk[1], s, { a: a * A('kern'), t, r: 40, porien: 10, ribo: false });
  // celmembraan (dubbele lijn), tegen de wand of losgelaten
  ctx.save(); ctx.globalAlpha *= a * A('membraan'); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.3);
  for (const d of [0, 3.2]) { pad(proto.map((p, i) => [p[0] - nP[i][0] * d, p[1] - nP[i][1] * d])); ctx.stroke(); } ctx.restore();
  // plasmodesmata: kanaaltje dwars door de wand tot de middenlamel (daar begint de buurcel), bekleed met het celmembraan
  // dat erdoorheen loopt, met het ER-buisje (desmotubulus) in het midden. Bij plasmolyse blijft het membraan in het
  // kanaaltje aan de wand vastzitten: een dun draadje naar de losgelaten protoplast.
  ctx.save(); ctx.globalAlpha *= a * A('wand'); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  PDI.forEach((i) => { const n = nB[i], tx = -n[1], ty = n[0], w = 4.2; const bi = binnen[i], pr = proto[i], bu = buiten[i];
    const van = pl < 0.05 ? [pr[0] - nP[i][0] * 3.2, pr[1] - nP[i][1] * 3.2] : bi;
    ctx.beginPath(); ctx.moveTo(van[0] + tx * w, van[1] + ty * w); ctx.lineTo(bu[0] + tx * w, bu[1] + ty * w); ctx.lineTo(bu[0] - tx * w, bu[1] - ty * w); ctx.lineTo(van[0] - tx * w, van[1] - ty * w); ctx.closePath(); ctx.fillStyle = '#2C3A52'; ctx.fill();
    ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.1); for (const sg of [1, -1]) { ctx.beginPath(); ctx.moveTo(van[0] + sg * tx * w, van[1] + sg * ty * w); ctx.lineTo(bu[0] + sg * tx * w, bu[1] + sg * ty * w); ctx.stroke(); }
    ctx.strokeStyle = rgba(C.er, 0.75); ctx.lineWidth = lw(1.3); ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.lineTo(bu[0], bu[1]); ctx.stroke();
    if (pl >= 0.05) { ctx.strokeStyle = C.er; ctx.lineWidth = lw(0.9); ctx.beginPath(); ctx.moveTo(bi[0], bi[1]); ctx.quadraticCurveTo((bi[0] + pr[0]) / 2 + tx * 3, (bi[1] + pr[1]) / 2 + ty * 3, pr[0], pr[1]); ctx.stroke(); } });
  ctx.restore();
  return anker;
}
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
function _riboKeten(ctx, x, y, n, r, t, er) { if (n <= 0) return; const P = []; let px = x, py = y, an = er ? Math.PI / 2 : -Math.PI / 2;
  // de eerste ± 3 aminozuren steken recht uit de tunnel; daarna vouwt de keten tot een compacte kluwen (co-translationeel vouwen):
  // de bocht per kraal is groot en de keten wordt teruggestuurd naar het vouwmidden zodra ze buiten de straal √(n) komt.
  const st = r * 1.75, k0 = 3, cx = x + Math.cos(an) * st * (k0 + 1.2), cy = y + Math.sin(an) * st * (k0 + 1.2);
  for (let i = 0; i < n; i++) { if (i >= k0) { an += (hash(i * 3.7) - 0.5) * 1.6 + 0.45 + Math.sin(t * 0.8 + i) * 0.06; const R = st * (1.1 + 0.8 * Math.sqrt(Math.max(1, i - k0)));
      const nx = px + Math.cos(an) * st, ny = py + Math.sin(an) * st; if (Math.hypot(nx - cx, ny - cy) > R) { const doel = Math.atan2(cy - py, cx - px); let df = Math.atan2(Math.sin(doel - an), Math.cos(doel - an)); an += df * 0.8; } }
    px += Math.cos(an) * st; py += Math.sin(an) * st; P.push([px, py]); }
  ctx.strokeStyle = '#9C7A4A'; ctx.lineWidth = r * 0.6; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.stroke();
  const AAT = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F']; P.forEach((p, i) => _bioCirc(ctx, p[0], p[1], r, AAT[i % 5], lighten(AAT[i % 5], 0.3), 1.2)); }
function ribosoomEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'vrij', keten = 0, stap = 0, sites = 0, t = 0, codon = 42 * s } = o; if (a <= 0.01) return {}; const u = 100 * s, er = stand === 'er';
  const kl = C.ribo || '#C9B896', kd = _mixHex(kl, '#121A26', 0.35), rd = lighten(kl, 0.3);
  ctx.save(); ctx.globalAlpha *= a; const dx = -ease(clamp(stap, 0, 1)) * 0; // ribosoom zelf staat; de aanroeper schuift x per codon
  const X = x + codon * 0.0, P = [X, y], A = [X + codon, y], E = [X - codon, y];
  // grote subeenheid (boven het mRNA): koepel met een inham aan de onderkant voor de drie plekken
  ctx.beginPath(); bioPad(ctx, [[X - 1.05 * u, y - 0.18 * u], [X - 1.12 * u, y - 0.75 * u], [X - 0.7 * u, y - 1.28 * u], [X + 0.05 * u, y - 1.42 * u], [X + 0.8 * u, y - 1.22 * u], [X + 1.15 * u, y - 0.7 * u], [X + 1.05 * u, y - 0.18 * u], [X + 0.6 * u, y - 0.12 * u], [X, y - 0.16 * u], [X - 0.6 * u, y - 0.12 * u]], true); shape(ctx, kl, rd, 1.5);
  // kleine subeenheid (onder het mRNA) met 'kop'
  ctx.beginPath(); bioPad(ctx, [[X - 0.92 * u, y + 0.12 * u], [X - 0.98 * u, y + 0.45 * u], [X - 0.55 * u, y + 0.72 * u], [X + 0.2 * u, y + 0.66 * u], [X + 0.6 * u, y + 0.8 * u], [X + 0.95 * u, y + 0.5 * u], [X + 0.9 * u, y + 0.14 * u], [X, y + 0.1 * u]], true); shape(ctx, _mixHex(kl, '#121A26', 0.12), rd, 1.5);
  // uitsnede met de drie plekken (donker), E – P – A
  if (sites > 0.01 && u > 50) { ctx.save(); ctx.globalAlpha *= sites; [[E, 'E'], [P, 'P'], [A, 'A']].forEach(([q]) => { roundRect(ctx, q[0] - codon * 0.44, y - 0.95 * u, codon * 0.88, 0.8 * u, codon * 0.25); shape(ctx, rgba('#121A26', 0.75), kd, 1.5); }); ctx.restore(); }
  // tunnel vanaf de P-plek naar de top
  ctx.strokeStyle = kd; ctx.lineWidth = Math.max(2, 0.07 * u); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X + 0.05 * u, y - 0.9 * u); ctx.quadraticCurveTo(X + 0.25 * u, y - 1.15 * u, X + 0.12 * u, y - 1.42 * u); ctx.stroke();
  const tun = [X + 0.12 * u, y - 1.42 * u];
  if (er) { const Rm = 9 * u, cy = y - 1.62 * u - Rm; ctx.lineCap = 'round'; [0, 0.2 * u].forEach((d, k) => { ctx.beginPath(); ctx.arc(X, cy - d, Rm, Math.PI / 2 - 0.2, Math.PI / 2 + 0.2); ctx.strokeStyle = rgba(C.er, k ? 0.6 : 0.95); ctx.lineWidth = 0.12 * u; ctx.stroke(); }); } // ER-membraan (gebogen, dubbel)
  _riboKeten(ctx, tun[0], tun[1] - (er ? 0.45 * u : 0), keten, Math.max(2, 0.085 * u), t, false);
  ctx.restore(); return { A, P, E, tunnel: tun, top: y - 1.42 * u };
}
function polysoom(ctx, x0, y, len, n, o = {}) { const { s = 0.5, t = 0, a = 1 } = o; const out = [];
  for (let i = 0; i < n; i++) { const x = x0 + len * (n - i - 0.5) / n; out.push(ribosoomEcht(ctx, x, y, s, { keten: 2 + Math.round((n - i) * 3), t: t + i, a })); } return out; }
function _rnapStrengen(ctx, D, y, u, mrna, t) { if (D.dicht) return null; const { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug } = D; const L = Math.max(4, R * 0.75);
  cB.forEach(([X, b]) => d2Base(ctx, X, y - R - H(X) * 0.35 * u + bw * 0.4, Math.PI / 2, b, L * (1 - 0.35 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  tB.forEach(([X, b]) => d2Base(ctx, X, y + R + H(X) * 0.25 * u - bw * 0.4, -Math.PI / 2, D2.comp[b], L * (1 - 0.2 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  d2Rug(ctx, Ltop, { kleur: rug, bw }); d2Rug(ctx, Lbot, { kleur: rug, bw });
  // RNA: hybride over de laatste 8 nt vóór het actieve centrum, daarna los en schuin omhoog naar achteren
  if (mrna > 0) { const xs = xb - dx * 1.5, yh = (X) => y + R + H(X) * 0.25 * u - L * 1.9; const P = [];
    for (let k = 0; k <= 8 && k * dx <= mrna; k++) P.push([xs - k * dx, yh(xs - k * dx)]);
    const rest = mrna - 8 * dx; if (rest > 0) { const [px, py] = P[P.length - 1]; for (let q = 1; q <= 40; q++) { const f = q / 40, d = rest * f; const w = Math.min(1, f * 4); P.push([px - d * 0.55 + Math.sin(f * 6 + t) * u * 0.04 * w, py - d * 0.75 + Math.sin(f * 4 - t * 0.7) * u * 0.05 * w]); } }
    // basen van het hybride (U tegenover A)
    for (let k = 0; k < 8 && k * dx <= mrna; k++) { const X = xs - k * dx, tb = tB.find(q => Math.abs(q[0] - X) < dx * 0.6); if (!tb) continue; const rb = D2.rcomp[D2.comp[tb[1]]] ; d2Base(ctx, X, yh(X), Math.PI / 2, rb === 'T' ? 'U' : rb, L * 0.85, Math.max(1.5, dx * 0.32), { vorm: false, rna: true }); }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = Math.max(2.5, bw * 0.55) + 2; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, bw * 0.55); ctx.stroke(); ctx.restore();
    return P[P.length - 1]; } return null; }
const _grKralenCache = {};
function _grKralen(ctx, cx, cy, binnen, o = {}) {
  const { r: r0 = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null, sx = 1 } = o; const r = r0; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r.toFixed(2) + '|' + bbox.join(',');
  let P = _grKralenCache[k];
  if (!P) { P = []; const rows = []; for (let y = bbox[1] + r * 1.1; y <= bbox[3] - r * 0.9; y += r * 2.45) rows.push(y);
    rows.forEach((y, ri) => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
      if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (!best || best[1] - best[0] < r * 2) return;
      const x0 = best[0] + r * 0.9, x1 = best[1] - r * 0.9, dir = ri % 2 ? -1 : 1, helix = hash(seed * 7.3 + ri * 3.1) > 0.42 && x1 - x0 > r * 6;
      const L = x1 - x0, stap = helix ? r * 0.95 : r * 1.7, n = Math.max(2, Math.round(L / stap));
      if (P.length) { const q = P[P.length - 1], xs = dir > 0 ? x0 : x1; P.push([(q[0] + xs) / 2 + dir * -r * 1.1, (q[1] + y) / 2, 0]); }
      for (let i = 0; i <= n; i++) { const u = i / n, x = dir > 0 ? lerp(x0, x1, u) : lerp(x1, x0, u);
        if (helix) { const ph = i / 3.6 * 6.283 + seed; P.push([x, y + Math.sin(ph) * r * 0.95, Math.cos(ph)]); } else P.push([x + (hash(seed * 3.7 + ri * 11 + i * 1.3) - 0.5) * r * 0.6, y + Math.sin(i * 0.9 + seed) * r * 0.25 + (hash(seed * 5.1 + ri * 7 + i * 2.9) - 0.5) * r * 0.9, 0]); } });
    _grKralenCache[k] = P; }
  const n = P.length, L = n * r * 1.8;
  const pts = P.map((p, i) => { const f = ease(clamp(fold * 1.4 - (i / n) * 0.4, 0, 1)); const bx = -L / 2 + i * r * 1.8, by = Math.sin(i * 0.35 + seed) * r * 3;
    const X = lerp(bx, p[0] * sx, f) * sc, Y = lerp(by, p[1], f) * sc, cs = Math.cos(rot), sn = Math.sin(rot);
    return [cx + X * cs - Y * sn, cy + X * sn + Y * cs, (p[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * sc * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  const tint = [0, 0.12, -0.1]; const order = pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]);
  order.forEach(i => { const p = pts[i], z = p[2], t = tint[(i * 7 + seed) % 3]; const h = hl ? hl(i, n) : 0;
    const fill = h > 0.5 ? C.goud : (t >= 0 ? lighten(col, t + 0.08 * z) : _mixHex(col, '#000000', -t)); ctx.beginPath(); ctx.arc(p[0], p[1], r * sc * (0.84 + 0.14 * z), 0, 6.283); shape(ctx, fill, h > 0.5 ? lighten(C.goud, 0.35) : lighten(col, 0.3), 1); });
  ctx.restore(); return pts;
}
const KK_R = 1.1; // kraalstraal t.o.v. de oude lint-buismaat o.r (zelfde rijdichtheid, iets voller dan de buis)
function _kkKluwen(ctx, cx, cy, binnen, o = {}) {
  const sc = o.sc || 1, bb = o.bbox || [-60, -50, 60, 50], opp = Math.PI / 4 * (bb[2] - bb[0]) * (bb[3] - bb[1]);
  const r = Math.max(Math.min(Math.max((o.r || 7) * KK_R, Math.sqrt(opp / 120)), 14 / sc), 4.5 / sc);
  return _grKralen(ctx, cx, cy, binnen, Object.assign({}, o, { r, key: 'kk|' + (o.key || 'k') + '|' + r.toFixed(2) }));
}
function _kkHex(c) { const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c); return m ? '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') : c; }
function _kkPad(ctx, pts, r, col, o = {}) {
  const { stap = 1.9, a = 1, z = 1, lijn = true } = o; if (a <= 0.01 || pts.length < 2) return []; col = _kkHex(col); const P = bioDicht(pts, 40); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  const kl = z >= 1 ? col : _mixHex(col, '#121A26', 0.35 * (1 - z));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (lijn) { ctx.strokeStyle = lighten(kl, 0.35); ctx.lineWidth = Math.max(1, r * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); }
  k.forEach((p, i) => { ctx.beginPath(); ctx.arc(p[0], p[1], r * 0.84, 0, 6.283); shape(ctx, i % 3 === 1 ? lighten(kl, 0.1) : kl, lighten(kl, 0.3), 1); });
  ctx.restore(); return k;
}
function _kkHelix(ctx, A, B, r, col, o = {}) {
  const { a = 1, fase = 0, amp = 0.9, stap = 0.95 } = o; if (a <= 0.01) return []; col = _kkHex(col); const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const n = Math.max(3, Math.round(L / (r * stap))), P = [];
  for (let i = 0; i <= n; i++) { const u = i / n, ph = i / 3.6 * 6.283 + fase; P.push([A[0] + ux * L * u + nx * Math.sin(ph) * r * amp, A[1] + uy * L * u + ny * Math.sin(ph) * r * amp, Math.cos(ph)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * 0.38); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
  P.map((p, i) => i).sort((i, j) => P[i][2] - P[j][2]).forEach(i => { const p = P[i], z = p[2]; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.84 + 0.14 * z), 0, 6.283);
    shape(ctx, z >= 0 ? lighten(col, 0.06 + 0.08 * z) : _mixHex(col, '#000000', -0.18 * z), lighten(col, 0.3), 1); });
  ctx.restore(); return P;
}
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function longblaasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, adem = 0.5, gas = 0, net = 1, hi = null } = o;
  const k = 0.94 + 0.08 * adem;
  const BL = [[-40, -150, 70], [55, -145, 66], [-120, -60, 72], [130, -55, 70], [-30, -40, 74], [70, 30, 72], [-115, 70, 68], [-15, 105, 72], [110, 125, 66], [10, 205, 66], [-95, 175, 62]];
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { bronchiool: W(-200, -250), blaasje: W(-30, -40), haarvaten: W(70, 30), longslagader: W(-250, 100), longader: W(240, 120) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WAND = '#D79A93', WANDl = '#EDC3BC', WANDd = '#B57872', ARM = BIO.ader, RIJK = BIO.bloed;
  const mix = (u) => { const A = [0x5B, 0x7F, 0xB0], B = [0xC2, 0x45, 0x3E]; u = clamp(u, 0, 1); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], u))).join(',')})`; };
  // bronchiool + gangetje (achter de blaasjes)
  ctx.strokeStyle = WANDd; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(-250, -300); ctx.quadraticCurveTo(-130, -200, -30, -90); ctx.lineTo(10, 120); ctx.stroke();
  ctx.strokeStyle = WAND; ctx.lineWidth = 40; ctx.stroke();
  // longslagader-takje (blauw) en longader-takje (rood)
  const vat = (pts, w, col) => { ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  vat([[-300, 120], [-200, 60], [-150, -10], [-90, -110]], 16, ARM);
  vat([[150, -120], [190, 20], [210, 120], [300, 150]], 18, RIJK);
  // blaasjes
  const blaas = BL.map(([bx, by, r]) => [bx, by, r * k]);
  for (let i = 0; i < blaas.length; i++) { const [bx, by, r] = blaas[i];
    ctx.save(); ctx.globalAlpha *= (hi && hi !== 'blaasje' && hi !== 'net') ? 0.35 : 1;
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fillStyle = WAND; ctx.fill(); ctx.strokeStyle = (hi === 'blaasje' && i === 4) ? C.goud : WANDl; ctx.lineWidth = (hi === 'blaasje' && i === 4) ? 4 : 1.5; ctx.stroke();
    // lichte koepel (vlak, geen verloop): kleinere lichtere schijf linksboven
    ctx.beginPath(); ctx.arc(bx - r * 0.22, by - r * 0.24, r * 0.55, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.fill();
    // haarvatennet over het blaasje
    if (net > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(bx, by, r - 1, 0, 6.283); ctx.clip(); ctx.globalAlpha *= net;
      const N = 7; const pts = []; for (let j = 0; j < N * N; j++) { const gx = (j % N) / (N - 1) - 0.5, gy = Math.floor(j / N) / (N - 1) - 0.5; pts.push([bx + gx * r * 2.2 + (hash(i * 50 + j) - 0.5) * r * 0.25, by + gy * r * 2.2 + (hash(i * 50 + j + 7) - 0.5) * r * 0.25]); }
      ctx.lineWidth = 4.5; for (let j = 0; j < N * N; j++) { const p = pts[j]; for (const d of [1, N]) { if (d === 1 && j % N === N - 1) continue; const q = pts[j + d]; if (!q) continue;
        const u = ((p[0] + q[0]) / 2 + 300) / 600; ctx.strokeStyle = hi === 'net' ? C.goud : mix(u); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo((p[0] + q[0]) / 2 + (hash(j + d) - 0.5) * 8, (p[1] + q[1]) / 2 + (hash(j * 3 + d) - 0.5) * 8, q[0], q[1]); ctx.stroke(); } }
      // rode bloedcellen (op schaal, ± 5 eenheden) die één voor één door het net schuiven
      for (let j = 0; j < 10; j++) { const r0 = Math.floor(hash(i * 13 + j) * N); const u = ((t * 0.18 + hash(i * 7 + j)) % 1); const fx = u * (N - 1); const c0 = Math.floor(fx);
        const p = pts[r0 * N + c0], q = pts[r0 * N + Math.min(N - 1, c0 + 1)]; const px = lerp(p[0], q[0], fx - c0), py = lerp(p[1], q[1], fx - c0);
        ctx.fillStyle = lighten(mix((px + 300) / 600), 0.15); ctx.beginPath(); ctx.ellipse(px, py, 3.2, 2.3, 0, 0, 6.283); ctx.fill(); }
      ctx.restore(); }
    ctx.restore(); }
  // gaswisseling: O2 (teal) gaat het bloed in, CO2 (grijs) komt eruit
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; for (let j = 0; j < 22; j++) { const b = blaas[j % blaas.length]; const u = (t * 0.35 + hash(j * 3.1)) % 1; const ang = hash(j * 5.7) * 6.283;
      const o2 = j % 3 !== 0; const r0 = b[2] * (o2 ? lerp(0.15, 0.85, u) : lerp(0.85, 0.15, u)); const px = b[0] + Math.cos(ang) * r0, py = b[1] + Math.sin(ang) * r0;
      if (o2) { ctx.fillStyle = C.teal; ctx.strokeStyle = lighten(C.teal, 0.35); ctx.lineWidth = 1; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 3.4, py, 3.6, 0, 6.283); ctx.fill(); ctx.stroke(); } }
      else { ctx.fillStyle = '#AEB6C2'; ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 6.4, py, 3, 0, 6.283); ctx.fill(); } } }
    ctx.restore(); }
  ctx.restore(); return anker;
}
function wortelHaren(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, water = 0, zoom = 1, groei = 1, hi = null, korrels = 70, korrelA = 0.5 } = o; // korrels/korrelA: Diffusie en osmose 2.1 (rustiger bodem, s29)
  const W = (px, py) => [x + px * s, y + py * s];
  const ZX = 180, ZY = 110, ZR = 150;
  const anker = { stengel: W(-130, -285), bodem: W(-300, -230), penwortel: W(-130, 120), zijwortel: W(-240, 10), haren: W(-30, 30), zoom: W(ZX, ZY - ZR), haarcel: W(ZX - 70, ZY + 50) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WORTEL = '#D9C9A0', WORTELd = '#A8956A', BODEM = '#3A2E24', KORREL = '#6E5A44';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  // bodem
  ctx.fillStyle = rgba(BODEM, 0.75); ctx.beginPath(); ctx.moveTo(-320, -250); for (let i = 0; i <= 16; i++) ctx.lineTo(-320 + i * 40, -250 + Math.sin(i * 1.7) * 4); ctx.lineTo(320, 300); ctx.lineTo(-320, 300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba(KORREL, korrelA); for (let i = 0; i < korrels; i++) { const px = -310 + hash(i) * 620, py = -235 + hash(i + 99) * 530; if (Math.hypot(px - ZX, py - ZY) < ZR + 6) continue; ctx.beginPath(); ctx.arc(px, py, 1.5 + hash(i + 7) * 3, 0, 6.283); ctx.fill(); }
  // stengel met blaadjes boven de grond
  ctx.strokeStyle = C.groen; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-130, -250); ctx.quadraticCurveTo(-134, -280, -128, -310); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-128 + sd * 26, -300, 26, 10, sd * -0.5, 0, 6.283); ctx.fill(); }
  // wortels: penwortel + zijwortels (takken van 2e orde)
  const takken = [];
  const tak = (pts, w, key, L = groei) => { if (L <= 0.02) return; const n = Math.max(2, Math.round(pts.length * L)); const P = pts.slice(0, n); if (L < 1 && n < pts.length) { const f = pts.length * L - (n - 1); P[n - 1] = [lerp(pts[n - 2][0], pts[n - 1][0], f), lerp(pts[n - 2][1], pts[n - 1][1], f)]; }
    ctx.save(); ctx.globalAlpha *= dimF(key); ctx.strokeStyle = WORTELd; ctx.lineWidth = w + 2; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = hi === key ? C.goud : WORTEL; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); takken.push([P, w]); };
  tak([[-130, -250], [-128, -170], [-136, -60], [-126, 60], [-132, 170], [-128, 270]], 14, 'penwortel');
  const ZW = [[[-130, -190], [-200, -160], [-260, -110], [-290, -40]], [[-130, -170], [-60, -140], [-10, -90], [20, -20]], [[-134, -90], [-210, -50], [-250, 20], [-262, 100]],
    [[-132, -60], [-70, -20], [-30, 40], [-20, 120]], [[-128, 40], [-200, 80], [-230, 150], [-240, 220]], [[-128, 80], [-80, 120], [-60, 190], [-58, 250]]];
  const lZij = Z => clamp((groei - (Z[0][1] + 250) / 520) / 0.45, 0, 1);
  ZW.forEach(Z => tak(Z, 6, 'zijwortel', lZij(Z)));
  ZW.forEach((Z, i) => { const L2 = clamp((lZij(Z) - 0.55) / 0.45, 0, 1); const P = bioPunt(Z, 0.5); tak([[P[0], P[1]], [P[0] + (i % 2 ? 30 : -30), P[1] + 22], [P[0] + (i % 2 ? 44 : -44), P[1] + 52]], 3, 'zijwortel', L2); });
  // wortelharen: alleen in de zone achter de punt (niet op de punt zelf)
  ctx.save(); ctx.globalAlpha *= dimF('haren') * 0.9; ctx.strokeStyle = hi === 'haren' ? C.goud : '#EDE3C6'; ctx.lineWidth = 1;
  takken.forEach(([P, w], j) => { const D = bioDicht(P, 10); const n = D.length; const i0 = Math.floor(n * 0.55), i1 = Math.floor(n * 0.9);
    for (let i = i0; i < i1; i++) { if (i % 2) continue; const p = D[i], q = D[Math.min(n - 1, i + 1)]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const L = (w * 0.9 + 6) * (0.6 + 0.5 * hash(i + j * 50));
      for (const sd of [-1, 1]) { const nx = Math.cos(an + sd * 1.571), ny = Math.sin(an + sd * 1.571); ctx.beginPath(); ctx.moveTo(p[0] + nx * w * 0.5, p[1] + ny * w * 0.5); ctx.lineTo(p[0] + nx * (w * 0.5 + L), p[1] + ny * (w * 0.5 + L)); ctx.stroke(); } } });
  ctx.restore();
  // worteltopjes met mutsje (iets donkerder)
  takken.forEach(([P, w]) => { const e = P[P.length - 1]; ctx.fillStyle = WORTELd; ctx.beginPath(); ctx.arc(e[0], e[1], w * 0.55, 0, 6.283); ctx.fill(); });
  // ---------- zoom: één wortelhaarcel ----------
  if (zoom > 0.01) { ctx.save(); ctx.globalAlpha *= zoom; const bron = [-28, 40];
    ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bron[0], bron[1], 16, 0, 6.283); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bron[0] + 14, bron[1] - 8); ctx.lineTo(ZX - ZR * 0.95, ZY - ZR * 0.3); ctx.moveTo(bron[0] + 12, bron[1] + 10); ctx.lineTo(ZX - ZR * 0.8, ZY + ZR * 0.6); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.fillStyle = '#2A221C'; ctx.fill(); ctx.clip();
    // bodemkorrels met een laagje water
    const KR = [[ZX + 10, ZY - 70, 34], [ZX + 95, ZY - 20, 40], [ZX + 30, ZY + 30, 26], [ZX + 110, ZY + 80, 34], [ZX - 20, ZY - 120, 28], [ZX + 60, ZY + 130, 30], [ZX - 10, ZY + 110, 22]];
    for (const [kx, ky, kr] of KR) { ctx.beginPath(); ctx.arc(kx, ky, kr + 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); ctx.beginPath(); bioPad(ctx, [0, 1, 2, 3, 4, 5].map(k => [kx + Math.cos(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr)), ky + Math.sin(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr * 2))]), true); ctx.fillStyle = KORREL; ctx.fill(); }
    // opperhuidcellen van de wortel (links) en één cel met een lange haar
    for (let i = -2; i <= 2; i++) { const cy = ZY + i * 62; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(ZX - ZR - 10, cy - 29, 110, 58, 12) : ctx.rect(ZX - ZR - 10, cy - 29, 110, 58); ctx.fillStyle = '#C8D6A8'; ctx.fill(); ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 3; ctx.stroke(); }
    const HAAR = [[ZX - 52, ZY], [ZX - 10, ZY - 6], [ZX + 40, ZY - 18], [ZX + 60, ZY - 30], [ZX + 160, ZY - 40]];
    ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 22; ctx.beginPath(); bioPad(ctx, HAAR, false); ctx.stroke(); ctx.strokeStyle = '#C8D6A8'; ctx.lineWidth = 16; ctx.stroke();
    ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.ellipse(ZX - 30, ZY - 2, 10, 7, 0, 0, 6.283); ctx.fill(); // kern bij de basis van de haar
    ctx.fillStyle = rgba(C.teal, 0.35); ctx.beginPath(); ctx.ellipse(ZX - 80, ZY, 30, 18, 0, 0, 6.283); ctx.fill(); // vacuole
    if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; const HD = bioDicht(HAAR, 10); for (let k = 0; k < 14; k++) { const u = 1 - ((t * 0.25 + k / 14) % 1); const p = HD[Math.floor(u * (HD.length - 1))];
        ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(p[0], p[1] + Math.sin(k * 2.1) * 4, 3.4, 0, 6.283); ctx.fill(); }
      for (let k = 0; k < 6; k++) { const v = (t * 0.25 + k / 6) % 1; ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(lerp(ZX - 90, ZX - ZR - 20, v), ZY + Math.sin(k * 3) * 12, 3.4, 0, 6.283); ctx.fill(); } ctx.restore(); }
    ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}
function _erfLicht() { const b = C.bgSchema || '#1A2740'; if (b[0] !== '#' || b.length < 7) return false; const n = parseInt(b.slice(1, 7), 16); return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) > 150; }
function _erfVeelhoek(ctx, x, y, r, an, fill, stroke, n = 6) { ctx.beginPath(); for (let i = 0; i < n; i++) { const a = an + i * 6.283 / n; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, fill, stroke, 1.2); }
