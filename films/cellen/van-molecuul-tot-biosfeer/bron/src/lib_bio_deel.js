// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: eiwitVouw, celRond, kernEnvelopPorie, mitochondrionEcht, spierVezel, spierBundel, hartDoorsnede, bloedvat, rodeBloedcel, bacterieEcht, gedifferentieerdeCellen, mrnaSliert, schaalStreep, membraanBoog, enzymKluwen, dnaDraad, injectiespuit, zenuwcel, DNA_BASE, RNA_BASE, D2, BIO
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
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6, myeline = false } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 9 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    // myeline: worstjes (Schwann-cellen) met knopen van Ranvier ertussen; impuls springt van knoop naar knoop
    const D = bioDicht(pts, 200); const lenA = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); lenA.push(acc); });
    const at = (u) => { const tgt = u * acc; let j = lenA.findIndex(l => l >= tgt); j = Math.max(1, j); return D[j]; };
    const seg = 46 * s, knoop = 7 * s, nS = Math.max(1, Math.floor((acc - 30 * s) / (seg + knoop)));
    const knopen = []; if (myeline) { for (let k = 0; k < nS; k++) { const u0 = (20 * s + k * (seg + knoop)) / acc, u1 = (20 * s + k * (seg + knoop) + seg) / acc; if (u1 > 0.97) break; knopen.push((u1 * acc + knoop / 2) / acc);
        const S = []; for (let q = 0; q <= 10; q++) S.push(at(lerp(u0, u1, q / 10))); ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.55); ctx.lineWidth = axonDik * s * 2.8; ctx.beginPath(); S.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.8); ctx.lineWidth = axonDik * s * 2.8 - 3; ctx.stroke(); } }
    if (puls >= 0 && puls <= 1) { let u = puls; if (myeline && knopen.length) { const kk = Math.min(knopen.length - 1, Math.floor(puls * knopen.length)); u = knopen[kk]; }
      const L2 = (myeline ? knoop * 1.6 : 26 * s) / acc; ctx.strokeStyle = pulsCol; ctx.lineWidth = axonDik * s * (myeline ? 3.4 : 2.2); ctx.lineCap = 'butt'; ctx.beginPath(); for (let q = 0; q <= 6; q++) { const p = at(clamp(u - L2 / 2 + L2 * q / 6, 0, 1)); q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.lineCap = 'round'; }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
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
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, c = 0 } = o; const kort = 1 - 0.15 * clamp(c, 0, 1); const streep = (o.streep || 12) * kort; w *= kort; // samentrekken: vezel en sarcomeren korter
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  const band = (o.streep || 12) * 0.45; for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, band, h); // donkere A-band blijft even breed, lichte I-band wordt smaller
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26, c = 0 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3, c }); }
function _ekC_rand(r, seed, sluit) { // straal per hoek; holte rond hoek 0; lippen sluiten symmetrisch en grijpen om
  const w = lerp(0.62, 0.3, sluit);
  return u => { let rr = r * (1 + 0.06 * Math.sin(u * 5 + seed) + 0.035 * Math.sin(u * 9 + seed * 2)); const ad = Math.abs(((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI);
    if (ad < w) rr *= 1 - 0.6 * Math.sqrt(Math.max(0, 1 - Math.pow(ad / w, 2.6)));
    else if (ad < w + 0.35) rr *= 1 + 0.14 * sluit * Math.sin((ad - w) / 0.35 * Math.PI); // lip buigt om het substraat
    return rr; };
}
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, col = C.enzym, seed = 4, bind = 0, knip = 0, sub = (typeof V !== 'undefined' ? V.kh : C.oker) } = o;
  const b = ease(clamp(bind, 0, 1)), kn = clamp(knip, 0, 1), kn1 = ease(clamp(kn / 0.5, 0, 1)), kn2 = ease(clamp((kn - 0.5) / 0.5, 0, 1));
  const sluit = o.sluit != null ? o.sluit : b * (1 - kn2);
  const cs = Math.cos(an), sn = Math.sin(an); const W = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const R = _ekC_rand(r, seed, sluit);
  const ret = { plek: W(r * 0.7, 0), lip: W(r * 0.78, -r * 0.4), rand: u => W(Math.cos(u) * R(u), Math.sin(u) * R(u)) };
  if (a <= 0.01) return ret;
  const licht = _mixHex(col, '#FFFFFF', 0.32), donker = _mixHex(col, '#1A2740', 0.5);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const om = []; for (let k = 0; k < 72; k++) { const u = k / 72 * 6.283, rr = R(u) * 1.04; om.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(donker, 0.92), _mixHex(col, '#FFFFFF', 0.2), Math.max(1, r * 0.02));
  // één kralenketen (verbeterronde 2: geen lint, geen helixveren of β-pijlen meer): serpentine buitenring → middenring →
  // binnenring; klein (r < 20) twee ringen met grotere kralen. Helixstukken = kralen dichter op elkaar in een golf (3,6 per
  // winding, voor licht, achter donker); de twee strengen liggen naast elkaar met waterstofbruggen (teal stippels).
  { const klein = r < 20, kr = klein ? Math.max(r * 0.16, 1.8) : r * 0.075, gw = lerp(0.62, 0.3, sluit) + 0.2;
    const ringen = klein ? [[0.74, 1], [0.38, -1]] : [[0.82, 1], [0.56, -1], [0.3, 1]];
    const pad = []; ringen.forEach(([k, dir], ri) => { const b0 = gw + ri * 0.12, b1 = 6.283 - gw - ri * 0.08;
      for (let i = 0; i <= 60; i++) { const u = dir > 0 ? lerp(b0, b1, i / 60) : lerp(b1, b0, i / 60); pad.push([Math.cos(u) * R(u) * k, Math.sin(u) * R(u) * k, ri, u]); } });
    const soortVan = (ri, u) => klein ? 'l' : (ri === 0 && ((u > 1.05 && u < 2.15) || (u > 4.25 && u < 5.3))) ? 'h' : ((ri === 0 || ri === 1) && u > 2.5 && u < 3.85) ? 's' : 'l';
    const K = []; let acc = 0, hp = 0;
    for (let i = 1; i < pad.length; i++) { const p = pad[i - 1], q = pad[i]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 1e-6) continue; let d = 0;
      while (true) { const sr = soortVan(q[2], q[3]), stap = sr === 'h' ? kr * 0.85 : kr * 1.9; if (acc + (L - d) < stap) { acc += L - d; break; } d += stap - acc; acc = 0;
        const f = d / L, x0 = lerp(p[0], q[0], f), y0 = lerp(p[1], q[1], f), nx = -(q[1] - p[1]) / L, ny = (q[0] - p[0]) / L;
        if (sr === 'h') { const ph = hp / 3.6 * 6.283; hp++; K.push({ x: x0 + nx * Math.sin(ph) * kr * 1.1, y: y0 + ny * Math.sin(ph) * kr * 1.1, z: Math.cos(ph), s: sr, ri: q[2] }); }
        else { hp = 0; K.push({ x: x0, y: y0, z: 0, s: sr, ri: q[2] }); } } }
    ctx.strokeStyle = rgba(licht, 0.75); ctx.lineWidth = Math.max(1, kr * 0.45); ctx.beginPath(); bioPad(ctx, K.map(k => [k.x, k.y]), false); ctx.stroke();
    // waterstofbruggen tussen de twee strengen (buitenring ↔ middenring)
    const s1 = K.filter(k => k.s === 's' && k.ri === 0), s2 = K.filter(k => k.s === 's' && k.ri === 1);
    if (s1.length && s2.length) { ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = Math.max(1, r * 0.01); ctx.setLineDash([r * 0.02, r * 0.02]);
      s1.forEach((p, j) => { if (j % 2) return; let best = null, bd = 1e9; s2.forEach(q => { const dd = Math.hypot(q.x - p.x, q.y - p.y); if (dd < bd) { bd = dd; best = q; } }); if (best && bd < r * 0.4) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(best.x, best.y); ctx.stroke(); } }); ctx.restore(); }
    K.map((k, i) => i).sort((i, j) => K[i].z - K[j].z).forEach(i => { const k = K[i], z = k.z;
      ctx.beginPath(); ctx.arc(k.x, k.y, kr * (0.85 + 0.12 * z), 0, 6.283); shape(ctx, z > 0 ? _mixHex(col, '#FFFFFF', 0.06 + 0.1 * z) : _mixHex(_mixHex(donker, col, 0.75), '#000000', -0.15 * z), licht, Math.max(0.8, r * 0.011)); }); }
  // actieve plek: gouden rand van de holte
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); const w = lerp(0.62, 0.3, sluit) + 0.04; const hp = []; for (let k = -12; k <= 12; k++) { const u = k / 12 * w; hp.push([Math.cos(u) * R(u), Math.sin(u) * R(u)]); } ctx.beginPath(); bioPad(ctx, hp, false); ctx.stroke();
  // substraat: twee glucoseringen; schuift de holte in, wordt geknipt en laat los
  if (sub && (b > 0.01 || kn > 0.01) && typeof hexagon === 'function') { const hr = r * 0.12; const diep = R(0) + hr * 1.1; const inX = lerp(r * 1.75, diep, b);
    const p1 = [inX - kn1 * hr * 0.25 + kn2 * r * 0.7, -kn2 * r * 0.45], p2 = [inX + hr * 2.05 + kn1 * hr * 0.5 + kn2 * r * 1.0, kn2 * r * 0.3];
    if (kn1 < 0.4) { ctx.strokeStyle = _mixHex(sub, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); ctx.moveTo(p1[0] + hr * 0.85, p1[1]); ctx.lineTo(p2[0] - hr * 0.85, p2[1]); ctx.stroke(); }
    hexagon(ctx, p1[0], p1[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); hexagon(ctx, p2[0], p2[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); }
  ctx.restore(); return ret;
}
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
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
const _bioL = (h, k = 0.25) => _mixHex(h, '#FFFFFF', k);
function _bioCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _bioGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = DNA_BASE.rugR, donker = DNA_BASE.rug, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return; // palet B (28 okt 2026): DNA grijs, was paars
  const pts = glad ? _bioCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _bioGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _bioL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }
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
function _rnaTikjes(ctx, pts, lw, o = {}) { const { stap = 2, lang = 2.2, seed = 0 } = o; if (lw < 1.2 || pts.length < 3) return; const seq = 'AUGCCAGUUAGCAUGC';
  ctx.save(); ctx.lineCap = 'butt'; ctx.lineWidth = Math.max(0.8, lw * 0.7);
  for (let i = 1, k = seed; i < pts.length; i += stap, k++) { const p = pts[i], q = pts[i - 1], an = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2;
    ctx.strokeStyle = RNA_BASE.base[seq[k % seq.length]]; ctx.beginPath(); ctx.moveTo(p[0] + Math.cos(an) * lw * 0.5, p[1] + Math.sin(an) * lw * 0.5); ctx.lineTo(p[0] + Math.cos(an) * lw * (0.5 + lang), p[1] + Math.sin(an) * lw * (0.5 + lang)); ctx.stroke(); }
  ctx.restore(); }
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
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }
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
function _gdbRond(ctx, x, y, r, lw) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _GD.cyto, _GD.rand, lw); _gdKern(ctx, x + r * 0.1, y - r * 0.05, r * 0.42, lw); }
function gedifferentieerdeCellen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, toon = 'set', d = 1, genen = 1, licht = null, t = 0 } = o; const u = 44 * s; const ret = {}; const lw = Math.max(1, 1.2 * s);
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const dd = ease(clamp(d, 0, 1));
  const eind = (tp, px, py, uu) => { // eindcel: overvloeien van ronde cel naar eigen vorm
    if (dd < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - dd; _gdbRond(ctx, px, py, uu * 0.55 * (1 - 0.2 * dd), lw); ctx.restore(); }
    if (dd > 0.001) { ctx.save(); ctx.globalAlpha *= dd; ctx.translate(px, py); ctx.scale(lerp(0.6, 1, dd), lerp(0.6, 1, dd)); _gdCel(ctx, tp, 0, 0, uu, t); ctx.restore(); } };
  if (toon !== 'set') { eind(toon, x, y, u); ret[toon] = [x, y]; if (genen > 0.01) _gdStrip(ctx, x + u * 2.4, y, u * 1.6, dd > 0.5 ? toon : null, genen, toon === 'bloed' && dd > 0.5); ctx.restore(); return ret; }
  const x0 = x - 250 * s, x1 = x - 150 * s, x2 = x - 70 * s, x3 = x + 90 * s; const ys = [-180, -90, 0, 90, 180].map(v => y + v * s);
  const types = ['huid', 'lever', 'zenuw', 'spier', 'bloed'];
  const n1 = [y - 50 * s, y + 50 * s], n2 = [y - 120 * s, y - 40 * s, y + 40 * s, y + 120 * s];
  ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = Math.max(1, 1.6 * s);
  const tak = (ax, ay, bx, by) => { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.bezierCurveTo((ax + bx) / 2, ay, (ax + bx) / 2, by, bx, by); ctx.stroke(); };
  n1.forEach(yy => tak(x0, y, x1, yy)); n2.forEach((yy, i) => tak(x1, n1[i < 2 ? 0 : 1], x2, yy));
  const van = [0, 1, 1, 2, 3]; ys.forEach((yy, i) => tak(x2, n2[van[i]], x3 - 40 * s, yy));
  _gdCel(ctx, 'eicel', x0, y, u * 0.55, t); ret.eicel = [x0, y];
  n1.forEach(yy => _gdbRond(ctx, x1, yy, u * 0.5, lw)); n2.forEach(yy => _gdbRond(ctx, x2, yy, u * 0.42, lw));
  types.forEach((tp, i) => { ctx.save(); if (licht && licht !== tp) ctx.globalAlpha *= 0.4; const uu = u * (tp === 'bloed' ? 0.7 : 0.55);
    eind(tp, x3 + (tp === 'zenuw' ? 10 * s : 0), ys[i], uu); ret[tp] = [x3, ys[i]];
    if (genen > 0.01) _gdStrip(ctx, x3 + 150 * s, ys[i], u * 1.5, dd > 0.5 ? tp : null, genen, tp === 'bloed' && dd > 0.5); ctx.restore(); });
  ctx.restore(); return ret;
}
const _GD = { cyto: '#2C3A52', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', kerat: '#C9B896', er: '#AFC0D0', glyc: '#DCC07F', aan: '#E0B64A', uit: '#4A5670' };
const _GD_GEN = [['huid', 'keratine'], ['lever', 'albumine'], ['zenuw', 'neurotransmitter'], ['spier', 'myosine'], ['bloed', 'hemoglobine']];
function _gdKern(ctx, x, y, r, lw) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _GD.kern, _GD.kernR, lw); ctx.fillStyle = rgba('#3E2E66', 0.55); ctx.beginPath(); ctx.arc(x + r * 0.25, y - r * 0.2, r * 0.25, 0, 6.283); ctx.fill(); }
function _gdPoly(cx, cy, r, n, seed, rond = 0) { const p = []; for (let i = 0; i < n; i++) { const an = (i + 0.2 * (hash(seed + i) - 0.5)) / n * 6.283; const rr = r * (0.9 + 0.2 * hash(seed * 3 + i)); p.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]); } return p; }
function _gdCel(ctx, soort, x, y, u, t = 0) {
  const lw = Math.max(1, u * 0.025);
  if (soort === 'eicel') { const r = u * 2.2; ctx.beginPath(); ctx.arc(x, y, r * 1.12, 0, 6.283); ctx.strokeStyle = rgba('#E6DCC6', 0.55); ctx.lineWidth = r * 0.1; ctx.stroke(); // zona pellucida
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#3A3A4E', _GD.rand, lw * 1.3);
    for (let i = 0; i < 40; i++) { const an = hash(i * 3.3) * 6.283, d = Math.sqrt(hash(i * 1.1)) * r * 0.9; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, u * 0.04, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.18); ctx.fill(); }
    _gdKern(ctx, x - r * 0.18, y, r * 0.2, lw); _gdKern(ctx, x + r * 0.2, y + r * 0.05, r * 0.19, lw); return [x, y]; } // twee voorkernen
  if (soort === 'huid') { const P = _gdPoly(x, y, u * 1.05, 6, 11).map(([px, py]) => [px, y + (py - y) * 0.62]); ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3);
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip(); ctx.strokeStyle = rgba(_GD.kerat, 0.75); ctx.lineWidth = Math.max(0.8, u * 0.03); // keratinebundels
    for (let i = 0; i < 7; i++) { const yy = y + (i - 3) * u * 0.14; ctx.beginPath(); ctx.moveTo(x - u * 1.1, yy + u * 0.1); ctx.bezierCurveTo(x - u * 0.4, yy - u * 0.15, x + u * 0.3, yy + u * 0.15, x + u * 1.1, yy - u * 0.08); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.ellipse(x, y, u * 0.34, u * 0.24, 0, 0, 6.283); shape(ctx, _GD.kern, _GD.kernR, lw); return [x, y]; }
  if (soort === 'lever') { const P = _gdPoly(x, y, u * 0.95, 6, 23); ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3);
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip();
    for (let k = 0; k < 3; k++) { ctx.strokeStyle = rgba(_GD.er, 0.55); ctx.lineWidth = Math.max(0.7, u * 0.02); ctx.beginPath(); ctx.arc(x - u * 0.15, y + u * 0.1, u * (0.45 + k * 0.13), 2.2, 4.2); ctx.stroke(); }
    for (let i = 0; i < 22; i++) { const an = hash(i * 7.3) * 6.283, d = u * (0.35 + 0.5 * hash(i * 2.9)); ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, u * 0.035, 0, 6.283); ctx.fillStyle = rgba(_GD.glyc, 0.6); ctx.fill(); } // glycogeen
    for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.4, d = u * 0.62; ctx.save(); ctx.translate(x + Math.cos(an) * d, y + Math.sin(an) * d); ctx.rotate(an + 1.5); roundRect(ctx, -u * 0.13, -u * 0.05, u * 0.26, u * 0.1, u * 0.05); shape(ctx, C.mito, C.mitoR, Math.max(0.6, lw * 0.6)); ctx.restore(); }
    ctx.restore(); _gdKern(ctx, x + u * 0.05, y - u * 0.05, u * 0.27, lw); return [x + u * 0.05, y - u * 0.05]; }
  if (soort === 'zenuw') { zenuwcel(ctx, x - u * 0.9, y, { s: u / 95, naar: [x + u * 3, y + u * 0.2], seed: 3, takken: 5, t }); return [x - u * 0.9, y]; }
  if (soort === 'spier') { spierVezel(ctx, x - u * 1.7, y, u * 3.4, u * 0.7, { seed: 5, streep: Math.max(4, u * 0.13) }); return [x - u * 0.6, y - u * 0.3]; }
  if (soort === 'bloed') { // geen kern; van boven (ingedeukte schijf: bleek midden) en los ernaast van opzij (plat, ± 2 µm dik), niet overlappend
    rodeBloedcel(ctx, x - u * 0.42, y, u * 0.36, 0, 0); rodeBloedcel(ctx, x + u * 0.42, y, u * 0.36, Math.PI / 2, 1); return null; }
  return [x, y];
}
function _gdStrip(ctx, x, y, w, aan, a = 1, zonderKern = false) { // hetzelfde stukje DNA met vijf genen; alleen 'aan' licht op
  ctx.save(); ctx.globalAlpha *= a; const h = Math.max(4, w * 0.12), n = _GD_GEN.length, g = w / n;
  roundRect(ctx, x - w / 2 - 2, y - h / 2 - 2, w + 4, h + 4, h / 2 + 2); shape(ctx, rgba(C.paars, 0.35), rgba(C.paars, 0.9), 1);
  for (let i = 0; i < n; i++) { const on = _GD_GEN[i][0] === aan; roundRect(ctx, x - w / 2 + i * g + 1.5, y - h / 2, g - 3, h, Math.min(3, h / 2)); ctx.fillStyle = on ? _GD.aan : _GD.uit; ctx.fill(); }
  if (zonderKern) { ctx.setLineDash([3, 3]); roundRect(ctx, x - w / 2 - 5, y - h / 2 - 5, w + 10, h + 10, h / 2 + 5); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }
function _mrbKralen(ctx, pts, r, col, lw, stap = 1.9) { const P = bioDicht(pts, 12); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba(lighten(col, 0.3), 0.6); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  k.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.2)); }); return k; }
function _tgBlob(ctx, x, y, rx, ry, seed, fill, rand, lw, wob = 0.12) { const p = []; for (let i = 0; i < 14; i++) { const u = i / 14 * 6.283; const k = 1 + wob * (hash(seed + i) - 0.5) * 2; p.push([x + Math.cos(u) * rx * k, y + Math.sin(u) * ry * k]); } ctx.beginPath(); bioPad(ctx, p, true); shape(ctx, fill, rand, lw); }
function _wbContour(x, y, r, f, n = 64) { const pts = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 - Math.PI; const rr = f(u); pts.push([x + Math.cos(u) * rr, y + Math.sin(u) * rr]); } return pts; }
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
function _pcNormaal(pts) { return pts.map((p, i) => { const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length]; let nx = b[1] - a[1], ny = -(b[0] - a[0]); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (nx * p[0] + ny * p[1] < 0) { nx = -nx; ny = -ny; } return [nx, ny]; }); }
const MRNA_SEQ = 'AUGGCCAAGUUCGGAUCCUGGAAACUGGUCAAUGCGUACGAUCUGGCAAGCUGA';
function _mrnaPad(x, y, len, o) { // kronkelende sliert: richting = som van sinussen (integreren) → echte bochten en af en toe een lus;
  // daarna zo gedraaid en geschaald dat 5' → 3' van (x, y) naar (x + len, y) loopt (langs rot). o.kronkel 0 = rustige golf.
  const { rot = 0, t = 0, slap = 1, rek = 0, seed = 1, kronkel = 1 } = o; const k = kronkel * slap * (1 - rek), n = 160, Q = [[0, 0]]; let px = 0, py = 0;
  for (let i = 1; i <= n; i++) { const u = i / n, th = k * (0.7 * Math.sin(u * 6.283 * 2.1 + seed + t * 0.2) + 1.5 * Math.sin(u * 6.283 * 5.3 + seed * 2.3 - t * 0.15) + 0.6 * Math.sin(u * 6.283 * 9.1 + seed * 0.7));
    px += Math.cos(th); py += Math.sin(th); Q.push([px, py]); }
  const E = Q[n], d = Math.hypot(E[0], E[1]) || 1, ca = E[0] / d, sa = E[1] / d, f = len / d, cr = Math.cos(rot), sr = Math.sin(rot);
  const L0 = Q.map(([qx, qy]) => [(qx * ca + qy * sa) * f, (-qx * sa + qy * ca) * f]), my = Math.max(1, ...L0.map(p => Math.abs(p[1]))), sy = Math.min(1, len * 0.12 / my); // hoogte begrenzen (± 12 % van de lengte, ook met basen en codonbogen binnen een vak van ± 30 % hoog)
  return L0.map(([X, Y0]) => { const Y = Y0 * sy; return [x + X * cr - Y * sr, y + X * sr + Y * cr]; }); }
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
function mrnaSliert(ctx, x, y, len, o = {}) {
  const { a = 1, seq = MRNA_SEQ, basen = 0, codons = 0, cap = 0, polyA = 0, afbraak = 0, dikte = Math.max(2.2, len * 0.0045) } = o; if (a <= 0.01) return {};
  const P = _mrnaPad(x, y, len, o), kl = '#5BA4C9', kd = '#2E6F92';
  const nB = seq.length, nA = Math.round(18 * polyA), tot = nB + nA, stap = 1 / tot, sp = len * stap;
  const af = ease(clamp(afbraak, 0, 1)), staart = nA * (1 - clamp(af * 2, 0, 1)), u0 = clamp((af - 0.4) / 0.6, 0, 1) * 0.85, u1 = (nB + staart) / tot;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // basen (stekels aan één kant, of puzzelvorm als ingezoomd)
  const vorm = basen > 0.5 && sp >= 18;
  for (let i = 0; i < nB + Math.floor(staart); i++) { const u = (i + 0.5) * stap; if (u < u0) continue; const [px, py, an] = _mrnaPunt(P, u), b = i < nB ? seq[i] : 'A', staartA = i >= nB, nx = Math.cos(an + Math.PI / 2), ny = Math.sin(an + Math.PI / 2);
    if (vorm) { ctx.save(); ctx.globalAlpha *= clamp((basen - 0.5) * 2, 0, 1); d2Base(ctx, px + nx * dikte, py + ny * dikte, an + Math.PI / 2, b, sp * 0.9, sp * 0.3, { rna: true, letter: sp >= 34 }); ctx.restore(); }
    const kort = (vorm ? 0 : 1) * lerp(dikte * 2.2, Math.min(sp * 0.9, dikte * 5), basen); if (kort > 0.5) { ctx.strokeStyle = staartA ? '#D8EEF7' : RNA_BASE.base[b]; ctx.lineWidth = Math.max(1.6, Math.min(sp * 0.45, dikte * 1.1)); ctx.beginPath(); ctx.moveTo(px + nx * dikte * 0.5, py + ny * dikte * 0.5); ctx.lineTo(px + nx * (dikte * 0.5 + kort), py + ny * (dikte * 0.5 + kort)); ctx.stroke(); } }
  // ruggengraat
  const Q = P.filter((p, i) => { const u = i / (P.length - 1); return u >= u0 && u <= u1 + stap * 0.5; });
  if (Q.length > 1) { ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kd; ctx.lineWidth = dikte + 2; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dikte; ctx.stroke(); }
  // codons: lichte boog onder elk drietal (aan de kant zonder basen)
  if (codons > 0.01) { ctx.save(); ctx.globalAlpha *= codons * 0.85; for (let k = 0; k * 3 < nB; k++) { const ua = k * 3 * stap + stap * 0.15, ub = (k * 3 + 3) * stap - stap * 0.15; if (ua < u0) continue; ctx.beginPath();
      for (let q = 0; q <= 8; q++) { const [px, py, an] = _mrnaPunt(P, lerp(ua, ub, q / 8)), nx = Math.cos(an - Math.PI / 2), ny = Math.sin(an - Math.PI / 2), d = dikte * 2.4 + Math.sin(q / 8 * Math.PI) * dikte * 1.2; q ? ctx.lineTo(px + nx * d, py + ny * d) : ctx.moveTo(px + nx * d, py + ny * d); }
      ctx.strokeStyle = k % 2 ? rgba(C.goud, 0.55) : rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, dikte * 0.6); ctx.stroke(); } ctx.restore(); }
  // cap aan 5'
  if (cap > 0.01 && u0 < 0.01) { const [px, py] = P[0]; ctx.save(); ctx.globalAlpha *= cap; _bioCirc(ctx, px - dikte * 2.2, py, dikte * 2.8, '#356F91', '#BFE0EF', 2); _bioCirc(ctx, px - dikte * 2.2, py, dikte * 1.1, '#BFE0EF', null); ctx.restore(); }
  // losse nucleotiden van de afbraak
  if (af > 0.4) { const nLos = Math.round(u0 * nB); for (let i = 0; i < nLos; i++) { const [px, py] = _mrnaPunt(P, (i + 0.5) * stap), dr = (af - 0.4) * 60 + 10; _bioCirc(ctx, px + (hash(i * 3.1) - 0.5) * dr, py + (hash(i * 7.7) - 0.3) * dr, Math.max(1.5, dikte * 0.8), rgba(RNA_BASE.base[seq[i]], 0.8)); } }
  ctx.restore();
  return { p5: P[0], p3: _mrnaPunt(P, u1), punt: (u) => _mrnaPunt(P, u), codon: (k) => _mrnaPunt(P, (k * 3 + 1.5) * stap) };
}
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
function injectiespuit(ctx, x, y, s, o = {}) {
  const { a = 1, arm = false, prik = 0, druk = 0, vul = 0.17, kleur = C.teal, hl = 0, t = 0 } = o;
  const rot = arm ? Math.PI / 2 : (o.rot || 0), diep = arm ? clamp(prik, 0, 1) * 22 : 0;
  const tx = x + Math.cos(rot) * diep * s, ty = y + Math.sin(rot) * diep * s; // naaldpunt
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [tx + (px * co - py * si) * s, ty + (px * si + py * co) * s];
  const ml = 16, rest = clamp(vul * (1 - (arm ? clamp(druk, 0, 1) : 0)), 0, 1), xC0 = -38, xC1 = xC0 - 50, xStop = xC0 - 3 - rest * 3 * ml;
  const ret = { punt: [tx, ty], cilinder: P((xC0 + xC1) / 2, 0), duim: P(xStop - 62, 0), huid: [x, y], spier: [x + 30 * s, y + 20 * s], depot: [tx, ty] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.12);
  if (arm) { // doorsnede bovenarm: lagen evenwijdig aan de huid, licht gebogen (arm is rond)
    const B = 55, bocht = (xx) => (xx * xx) / (2 * 140); // straal ± 14 cm-boog over de breedte
    const laag = (d0, d1, fill, clip) => { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d0 + bocht(xx)) * s); } for (let k = 40; k >= 0; k--) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d1 + bocht(xx)) * s); } ctx.closePath(); if (clip) { ctx.clip(); return; } ctx.fillStyle = fill; ctx.fill(); };
    laag(0, 2, BIO.huid); laag(0, 0.6, BIO.huidS); laag(2, 10, BIO.vet); laag(10, 30, BIO.spier); laag(30, 46, BIO.bot);
    // vetkwabjes en spiervezels (rustig, alleen bij genoeg pixels)
    if (s > 3) { ctx.save(); laag(-1, 46, null, true); ctx.strokeStyle = rgba(BIO.vetS, 0.35); ctx.lineWidth = 1; for (let i = 0; i < 7; i++) { const xx = -B + 9 + i * 15.5 + hash(i) * 3, yy = 6 + hash(i + 9) * 1.5; ctx.beginPath(); ctx.ellipse(x + xx * s, y + (yy + bocht(xx)) * s, 4.2 * s, 2.6 * s, 0, 0, 6.283); ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.spierL, 0.3); for (let j = 0; j < 4; j++) { const d = 14 + j * 4.2; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d + bocht(xx) + Math.sin(xx * 0.09 + j) * 0.5) * s); } ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.botS, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (31.5 + bocht(xx)) * s); } ctx.stroke(); ctx.restore(); }
    // depot tussen de spiervezels
    const dep = clamp(druk, 0, 1) * clamp(prik * 2 - 1, 0, 1); if (dep > 0.01) { const r = Math.sqrt(dep) * 6; ctx.save(); ctx.globalAlpha *= 0.75; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(tx, ty - 1 * s, r * 1.6 * s, r * 0.8 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  } // de spuit zelf blijft altijd boven de huid (hub op 25 mm, naald hooguit 22 mm diep)
  ctx.translate(tx, ty); ctx.rotate(rot); ctx.scale(s, s);
  const L = C.er, wit = '#DDE4EC', mid = '#A9B6C6', don = '#6F7E93';
  const band = (x0, x1, h, cols) => { const n = cols.length; cols.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x0, -h + 2 * h * i / n, x1 - x0, 2 * h / n + 0.05); }); };
  // cilinder (glasheldere kunststof: lichte rand, donkere zijde)
  ctx.save(); ctx.beginPath(); ctx.rect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4); ctx.clip();
  ctx.fillStyle = rgba(L, 0.12); ctx.fillRect(xC1, -5.2, 60, 10.4);
  if (rest > 0.003) band(xStop, xC0, 4.6, [lighten(kleur, 0.35), kleur, kleur, kleur, lighten(kleur, -0.0)].map((c, i) => i === 4 ? '#3E7FA5' : c));
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(xC1, -4.4, 60, 1.0); ctx.restore();
  ctx.strokeStyle = L; ctx.lineWidth = lw / s; ctx.strokeRect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4);
  ctx.beginPath(); ctx.moveTo(xC0 - 2.5, -5.2); ctx.lineTo(xC0, -1.4); ctx.lineTo(xC0, 1.4); ctx.lineTo(xC0 - 2.5, 5.2); ctx.fillStyle = rgba(L, 0.2); ctx.fill(); ctx.stroke();
  if (s > 3) { ctx.strokeStyle = rgba(don, 0.9); ctx.lineWidth = 0.18; for (let k = 0; k <= 30; k++) { const xx = xC0 - 3 - k * ml / 10, lang = k % 5 === 0 ? 3 : 1.6; ctx.beginPath(); ctx.moveTo(xx, -5.2); ctx.lineTo(xx, -5.2 + lang); ctx.stroke(); } }
  // rubber stop + stang + duimplaat
  band(xStop - 6, xStop, 4.5, ['#5A606C', '#3B3F48', '#3B3F48', '#2C2F36']);
  band(xStop - 62 + 1.5, xStop - 6, 3.6, [wit, mid, mid, don]);
  band(xStop - 62.5, xStop - 60.3, 6.5, [wit, mid, mid, don]);
  // vingersteun
  band(xC1 - 2, xC1, 11, [wit, mid, mid, mid, don]);
  // luer + hub (blauw, 23 G)
  band(xC0, -34, 1.4, [wit, mid, don]); band(-34, -32, 3.3, ['#6B9DC2', '#4E86B0', '#3E6F95']); band(-32, -25, 2.6, ['#6B9DC2', '#4E86B0', '#4E86B0', '#3E6F95']);
  // naald (ook het deel onder de huid)
  ctx.fillStyle = '#C8D0DA'; ctx.beginPath(); ctx.moveTo(-25, -0.3); ctx.lineTo(-1.6, -0.3); ctx.lineTo(0, 0.3); ctx.lineTo(-25, 0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.55); ctx.fillRect(-25, -0.3, 23, 0.15);
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / s; ctx.strokeRect(xC1 - 2, -11.5, -xC1 + 2, 23); }
  ctx.restore(); return ret;
}
function hartDoorsnedeFase(u) {
  u = ((u % 1) + 1) % 1;
  const atr = u >= 0.42 && u < 0.6 ? Math.sin((u - 0.42) / 0.18 * Math.PI) : 0;
  let ven = 0; if (u >= 0.58 && u < 0.95) { const v = (u - 0.58) / 0.37; ven = v < 0.22 ? ease(v / 0.22) : v < 0.72 ? 1 : 1 - ease((v - 0.72) / 0.28); }
  const av = u < 0.58 || u >= 0.93 ? 1 : (u < 0.6 ? 1 - (u - 0.58) / 0.02 : u > 0.91 ? (u - 0.91) / 0.02 : 0);
  const sl = u >= 0.63 && u < 0.88 ? Math.min(1, (u - 0.63) / 0.03, (0.88 - u) / 0.03) : 0;
  return { u, atr, ven, av: clamp(av, 0, 1), sl: clamp(sl, 0, 1) };
}
function hartDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, u = 0.2, t = 0, stroom = 0, hi = null, detail = 1 } = o;
  const f = hartDoorsnedeFase(u);
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { RB: W(-125, -45), RK: W(-110, 120), LB: W(118, -55), LK: W(115, 130), tussenschot: W(25, 120), aorta: W(110, -268),
    longslagader: W(150, -205), holleAderBoven: W(-140, -270), holleAderOnder: W(-262, 250), longaders: W(232, -70),
    klepR: W(-92, 30), klepL: W(98, 6), klepLong: W(-18, -100), klepAorta: W(35, -72), punt: W(95, 290) };
  if (a <= 0.01) return anker;
  const ARM = BIO.ader, RIJK = BIO.bloed, ARMd = '#3F5F8E', RIJKd = '#8E2E2A';
  const SPIER = '#9A4A46', SNIJ = '#D99A8E', SNIJd = '#C27F73', VET = '#E3C77A', KLEP = '#EDE3CF';
  const dimF = k => (hi && hi !== k && hi !== 'kleppen') ? 0.35 : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (pts, closed = true) => { ctx.beginPath(); bioPad(ctx, pts, closed); };
  const buis = (pts, w, col, al = 1) => { ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'butt'; ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = w * 0.25; ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0] - w * 0.18, p[1]]), false); ctx.stroke(); ctx.restore(); };
  const opening = (cx, cy, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = lighten(col, 0.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx, cy + 1, rx * 0.7, ry * 0.6, 0, 0, 6.283); ctx.fillStyle = col === ARM ? ARMd : RIJKd; ctx.fill(); };
  const schaal = (pts, k, c) => pts.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  // ---------- achterste vaten ----------
  buis([[30, -150], [-40, -175], [-120, -185], [-200, -178]], 34, ARM, dimF('RK'));                // rechter longslagader (achter aorta)
  buis([[-60, -110], [-150, -120], [-215, -118]], 24, RIJK, dimF('LB')); buis([[-60, -85], [-160, -80], [-215, -72]], 24, RIJK, dimF('LB')); // rechter longaders (achter)
  buis([[150, -80], [200, -96], [238, -100]], 24, RIJK, dimF('LB')); buis([[150, -45], [205, -46], [238, -40]], 24, RIJK, dimF('LB'));      // linker longaders
  opening(238, -100, 5, 12, RIJK); opening(238, -40, 5, 12, RIJK); opening(-215, -118, 5, 12, RIJK); opening(-215, -72, 5, 12, RIJK);
  buis([[175, -240], [195, -180], [198, -120]], 40, RIJK, dimF('LK') * 0.9);                       // dalende aorta (achter het hart)
  // ---------- hartspier (buitenkant) ----------
  const kV = 1 - 0.035 * f.ven, cHart = [20, 110];
  const kA = 1 - 0.16 * f.atr, kK = 1 - 0.28 * f.ven;
  const RB = schaal([[-188, -100], [-140, -130], [-80, -114], [-62, -55], [-70, 8], [-110, 24], [-170, 16], [-200, -38]], kA, [-130, -45]);
  const LB = schaal([[52, -95], [95, -124], [160, -118], [200, -80], [194, -20], [150, 2], [90, 2], [55, -30]], kA, [125, -58]);
  const RK = schaal([[-200, 52], [-130, 40], [-62, 44], [-38, -20], [-42, -92], [-2, -96], [4, -20], [8, 90], [-14, 172], [-70, 228], [-148, 200], [-200, 122]], kK, [-90, 120]);
  const LK = schaal([[30, -64], [50, -70], [60, 6], [98, 14], [160, 20], [188, 82], [180, 172], [136, 246], [104, 260], [78, 206], [48, 110], [30, 24]], kK, [118, 140]);
  // kamers: één spiermassa van de klepring tot de punt (wand links ± 3× zo dik als rechts)
  const KAMERS = schaal([[-200, 22], [-216, 105], [-176, 182], [-98, 244], [-5, 284], [95, 302], [162, 262], [216, 170], [236, 62], [226, 10], [170, -2], [62, -40], [22, -100], [-60, -110], [-62, 12], [-140, 30]], kV, cHart);
  const wandVul = (P) => { pad(P); ctx.fillStyle = SNIJ; ctx.fill(); ctx.strokeStyle = SPIER; ctx.lineWidth = 6; ctx.stroke(); };
  wandVul(KAMERS);
  if (detail > 0.5) { ctx.save(); pad(KAMERS); ctx.clip(); ctx.strokeStyle = rgba(SNIJd, 0.55); ctx.lineWidth = 1.2; // vezelrichting in het snijvlak
    for (let i = 0; i < 8; i++) { const k = 0.95 - i * 0.025; pad(schaal(KAMERS, k, [30, 140])); ctx.stroke(); } ctx.restore(); }
  // boezems: dunne wand rond de holte
  wandVul(schaal(RB, 1.12, [-130, -45])); wandVul(schaal(LB, 1.12, [125, -58]));
  if (detail > 0.5) { ctx.save(); ctx.globalAlpha *= 0.85; ctx.fillStyle = VET; // vet in de kransgroeve (tussen boezem en kamer)
    pad([[-214, 30], [-196, 12], [-168, 24], [-190, 42]]); ctx.fill(); pad([[204, 4], [230, 14], [228, 34], [206, 24]]); ctx.fill(); ctx.restore(); }
  const lumen = (P, col, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); pad(P); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rgba('#3A1A1A', 0.45); ctx.lineWidth = 2; ctx.stroke();
    if (detail > 0.5) { ctx.save(); pad(P); ctx.clip(); ctx.strokeStyle = rgba('#000000', 0.14); ctx.lineWidth = 3; // spierbalkjes langs de wand
      for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; const cx = P.reduce((s, v) => s + v[0], 0) / P.length, cy = P.reduce((s, v) => s + v[1], 0) / P.length;
        const d = Math.hypot(cx - mx, cy - my) || 1; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + (cx - mx) / d * 14 + (hash(i + col.length) - 0.5) * 8, my + (cy - my) / d * 14); ctx.stroke(); } ctx.restore(); }
    if (hi === key) { pad(P); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); };
  lumen(RB, ARM, 'RB'); lumen(LB, RIJK, 'LB'); lumen(RK, ARM, 'RK'); lumen(LK, RIJK, 'LK');
  // onderste holle ader: komt van onderen langs de buitenkant van de rechterkamer en mondt uit in de rechterboezem (inbouw 28 okt, uit C)
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-262, 300], [-258, 160], [-246, 60], [-218, 4], [-186, -6]], 40, ARM);
  ctx.beginPath(); ctx.ellipse(-182, -8, 9, 18, -0.3, 0, 6.283); ctx.fillStyle = ARM; ctx.fill(); ctx.restore();
  // papilspieren (uitsteeksels van de kamerwand)
  const papil = (bx, by, hgt, wdt, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.beginPath(); ctx.moveTo(bx - wdt * 1.3, by + 6); ctx.bezierCurveTo(bx - wdt, by - hgt * 0.5, bx - wdt * 0.8, by - hgt, bx, by - hgt); ctx.bezierCurveTo(bx + wdt * 0.8, by - hgt, bx + wdt, by - hgt * 0.5, bx + wdt * 1.3, by + 6); ctx.closePath(); ctx.fillStyle = SNIJd; ctx.fill(); ctx.restore(); return [bx, by - hgt]; };
  const pR1 = papil(-150, 178 - 20 * f.ven, 46, 15, 'RK'), pR2 = papil(-60, 190 - 25 * f.ven, 40, 13, 'RK');
  const pL1 = papil(92, 230 - 30 * f.ven, 58, 17, 'LK'), pL2 = papil(156, 200 - 26 * f.ven, 56, 17, 'LK');
  // ---------- kleppen ----------
  const klepKl = hi === 'kleppen' ? C.goud : KLEP;
  const avKlep = (x1, x2, yy, open, pa, pb, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); const half = (x2 - x1) / 2, L = half * 1.08;
    const ang = lerp(0.18, 1.3, open); // dicht: slippen bijna horizontaal (raken elkaar in het midden), open: hangen langs de wand
    const tips = []; for (const sd of [-1, 1]) { const hx = sd < 0 ? x1 : x2; const ex = hx - sd * Math.cos(ang) * L, ey = yy + Math.sin(ang) * L; tips.push([ex, ey]);
      const nx = -Math.sin(ang) * sd, ny = -Math.cos(ang); // normaal op de slip
      ctx.beginPath(); ctx.moveTo(hx, yy - 7); ctx.quadraticCurveTo((hx + ex) / 2 + nx * 9, (yy + ey) / 2 + ny * 9 - 4, ex, ey); // bovenkant (bol)
      ctx.quadraticCurveTo((hx + ex) / 2 - nx * 3, (yy + ey) / 2 - ny * 3 + 6, hx + -sd * 1, yy + 7); ctx.closePath();
      ctx.fillStyle = klepKl; ctx.fill(); ctx.strokeStyle = '#B8AC92'; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (detail > 0.3) { ctx.strokeStyle = rgba(KLEP, 0.85); ctx.lineWidth = 1.4; for (const [tp, pp, sd] of [[tips[0], pa, -1], [tips[1], pb, 1]]) for (let k = 0; k < 3; k++) { const f0 = 0.55 + k * 0.22; const hx = sd < 0 ? x1 : x2;
        const ax = lerp(hx, tp[0], f0), ay = lerp(yy, tp[1], f0); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(pp[0] + (k - 1) * 5, pp[1] + 2); ctx.stroke(); } }
    ctx.restore(); };
  avKlep(-134, -50, 28, f.av, pR1, pR2, 'RK'); avKlep(56, 146, 8, f.av, pL1, pL2, 'LK');
  // ---------- voorste vaten: aorta (stijgt achter de longslagader), longslagader, bovenste holle ader ----------
  const slKlep = (cx, cy, w, open, col) => { ctx.save(); ctx.fillStyle = klepKl; for (const sd of [-1, 1]) { const tip = lerp(cx + sd * 3, cx + sd * (w - 4), open);
      ctx.beginPath(); ctx.moveTo(cx + sd * w, cy + 4); ctx.quadraticCurveTo(cx + sd * w * 0.5, cy + 10 - 6 * open, tip, cy - 14 - 6 * open); ctx.lineTo(cx + sd * w, cy - 6); ctx.closePath(); ctx.fill(); } ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= dimF('LK');
  buis([[35, -70], [32, -150], [45, -230], [90, -272], [150, -268], [178, -240]], 40, RIJK);
  for (const [bx, tx] of [[75, 62], [112, 108], [148, 158]]) buis([[bx, -270], [tx, -300]], 15, RIJK);
  slKlep(35, -76, 18, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RK');
  buis([[-20, -95], [-12, -150], [20, -185], [90, -200], [160, -205], [210, -198]], 36, ARM);
  slKlep(-20, -100, 16, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-140, -115], [-140, -200], [-138, -300]], 40, ARM); opening(-138, -300, 19, 6, ARM); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('LK'); for (const tx of [62, 108, 158]) opening(tx + (tx === 62 ? -1 : tx === 158 ? 3 : 0), -300, 7, 3, RIJK); ctx.restore();
  opening(210, -198, 6, 17, ARM);
  // ---------- bloedstroom ----------
  if (stroom > 0.01) { const r = 5; const vul = f.av * (1 - f.ven), uit = f.sl;
    ctx.save(); ctx.globalAlpha *= stroom;
    const dl = (path, col, on, sp, n, sd) => { if (on > 0.02) particleFlow(ctx, path, n, t, sp, lighten(col, 0.45), r, sd, on); };
    dl([[-140, -290], [-140, -100], [-110, -20], [-95, 90]], ARM, vul, 120, 6, 1); dl([[-262, 290], [-246, 60], [-186, -6], [-110, 0], [-90, 100]], ARM, vul, 120, 6, 7);
    dl([[230, -70], [140, -60], [100, 20], [110, 150]], RIJK, vul, 120, 6, 13);
    dl([[-100, 150], [-20, 40], [-20, -100], [20, -185], [200, -200]], ARM, uit, 380, 9, 19);
    dl([[110, 200], [45, 40], [35, -70], [40, -220], [100, -270], [175, -235]], RIJK, uit, 420, 10, 29);
    ctx.restore(); }
  ctx.restore(); return anker;
}
function _erfLicht() { const b = C.bgSchema || '#1A2740'; if (b[0] !== '#' || b.length < 7) return false; const n = parseInt(b.slice(1, 7), 16); return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) > 150; }
function _erfVeelhoek(ctx, x, y, r, an, fill, stroke, n = 6) { ctx.beginPath(); for (let i = 0; i < n; i++) { const a = an + i * 6.283 / n; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, fill, stroke, 1.2); }
