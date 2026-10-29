// teken_e3.js — eigen hulpfuncties voor de animatie van Ecologie v2 film 3 "Wie eet wie?" (laadt na teken_eco3.js, vóór sb3.js).
// Niets uit /root/eco2 of ecolib aangepast; e3Duin is hier overschreven zodat de helm in de wind kan bewegen (o.t = seconden; zonder o.t = keyframe).
const e3fr = (u) => u - Math.floor(u);
const e3A = (ctx, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
// gangen: cm per cyclus (SNELHEID uit de poppen; gemeten in de straat)
const E3S = { vos: { lopen: 40, draven: 62, sluipen: 30 }, lynx: { lopen: 62, sluipen: 48, sprinten: 175 }, konijn: { huppen: 34, rennen: 72 }, haas: { rennen: 100.8 }, schaap: { lopen: 76 } };
// tocht van x0 naar x1 in hele cycli (geen glijdende poten): geeft cyclusstand en tekenpositie
function e3Tocht(t, t0, x0, x1, s, S, cps) { const k = Math.sign(x1 - x0) || 1, stap = S * s, n = Math.max(1, Math.round(Math.abs(x1 - x0) / stap)); const c = clamp((t - t0) * cps, 0, n);
  return { c, k, xb: x0 + k * Math.floor(Math.min(c, n - 1e-6)) * stap, x: x0 + k * c * stap, rij: c > 0 && c < n, klaar: c >= n, xEnd: x0 + k * n * stap, n }; }
// dier langs een tocht: voor het vertrek en na aankomst in een rusthouding
function e3Loop(fn, ctx, y, s, tocht, gang, rust, o = {}) { const T = tocht;
  if (T.rij) fn(ctx, T.xb, y, s, Object.assign({}, o, { houding: gang, t: T.c, wereld: true, kijk: T.k }));
  else fn(ctx, T.klaar ? T.xEnd : T.x, y, s, Object.assign({ kijk: T.k }, o, { houding: rust })); return T.x; }

function e3Duin(ctx, o = {}) { const hz = o.horizon || 600, tt = o.t; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hz - 110, W, 110);
  vul(ctx, [[-60, hz], [260, hz - 80], [560, hz - 40], [900, hz - 110], [1260, hz - 50], [1600, hz - 95], [1990, hz - 40], [1990, H], [-60, H]], '#3B4A52');
  vul(ctx, [[-60, hz + 70], [420, hz + 20], [820, hz + 80], [1280, hz + 30], [1990, hz + 70], [1990, H], [-60, H]], C.bgMacroHill);
  vul(ctx, [[-60, hz + 170], [600, hz + 140], [1200, hz + 180], [1990, hz + 150], [1990, H], [-60, H]], C.bgMacroFront);
  if (o.helm !== false) (o.helmPos || [[120, hz + 150, 1.1], [360, hz + 168, 0.8], [1500, hz + 160, 1.0], [1780, hz + 150, 1.2], [980, hz + 172, 0.7]]).forEach(([x, y, k], i) => e3HelmBoven(ctx, x, y, 2.2 * k, { t: tt == null ? i * 0.3 : i * 0.3 + tt * 0.22, wind: tt == null ? 0.2 : 0.3 })); }

// pijl die groeit (u 0..1) en een punt op een pijl
function e3PijlG(ctx, x1, y1, x2, y2, u, o = {}) { if (u <= 0.01) return; const { r1 = 82, r2 = 82, kl = C.oker, lw = 4, a = 1 } = o; const an = Math.atan2(y2 - y1, x2 - x1);
  const sx = x1 + Math.cos(an) * r1, sy = y1 + Math.sin(an) * r1, ex = x2 - Math.cos(an) * r2, ey = y2 - Math.sin(an) * r2; pijl(ctx, sx, sy, lerp(sx, ex, u), lerp(sy, ey, u), kl, a, lw, 20); }
function e3OpPijl(x1, y1, x2, y2, u, r1 = 82, r2 = 82) { const an = Math.atan2(y2 - y1, x2 - x1); const sx = x1 + Math.cos(an) * r1, sy = y1 + Math.sin(an) * r1, ex = x2 - Math.cos(an) * (r2 + 14), ey = y2 - Math.sin(an) * (r2 + 14); return [lerp(sx, ex, u), lerp(sy, ey, u)]; }
// reizende stippen langs een pijl (n stuks, snelheid v rondes/s), a = zichtbaarheid
function e3Stroom(ctx, x1, y1, x2, y2, t, a, kl = C.goud, n = 2, v = 0.35, r = 11, r1 = 82, r2 = 82) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = e3fr(t * v + i / n); const [x, y] = e3OpPijl(x1, y1, x2, y2, u, r1, r2); circ(ctx, x, y, r, rgba(kl, a * Math.min(1, u * 6, (1 - u) * 6))); } }

// voedselweb met losse zichtbaarheden: k = {knoop: alpha}, p = {'a-b': groei 0..1}, dim = {knoop: 0..1}, dik = {'a-b': 0..1}
function e3WebA(ctx, o = {}) { const { k = {}, p = {}, dim = {}, focus = [], dik = {}, namen = true } = o; const al = (n) => (k[n] ?? 1) * (1 - 0.65 * (dim[n] || 0));
  for (const [a, b] of E3WEBP) { const u = p[a + '-' + b] ?? 1; const aa = Math.min(al(a), al(b)); if (u <= 0.01 || aa <= 0.01) continue; const [x1, y1] = E3WEB[a], [x2, y2] = E3WEB[b]; e3PijlG(ctx, x1, y1, x2, y2, u, { r1: 70, r2: 74, a: aa, lw: 4 + 5 * (dik[a + '-' + b] || 0) }); }
  for (const n in E3WEB) { const a = al(n); if (a <= 0.01) continue; const [x, y] = E3WEB[n]; e3Knoop(ctx, x, y, namen ? n : null, E3P[n], { r: 66, a, focus: focus.includes(n) }); } }

// pelsgrafiek met voortgang per lijn: haas/lynx = aantal jaren getekend (0..20, mag fractioneel), pieken = alpha van de piekstrepen
function e3GrafiekA(ctx, o = {}) { const { x = 230, y = 790, w = 1400, h = 560, haas = 20, lynx = 20, pieken = 0, a = 1, as = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  e3A(ctx, as, () => { ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1; for (let v = 20; v <= 80; v += 20) { const yy = y - v / 80 * h; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w + 10, y); ctx.stroke();
    for (let v = 0; v <= 80; v += 20) metaText(ctx, String(v), x - 18, y - v / 80 * h + 10, C.text2, 'right', 28);
    for (let j = 0; j <= 20; j += 5) metaText(ctx, String(1900 + j), x + j / 20 * w, y + 44, C.text2, 'center', 28);
    metaText(ctx, 'VELLEN (× 1000)', x - 10, y - h - 30, C.text2, 'left', 28); metaText(ctx, 'JAAR', x + w, y + 84, C.text2, 'right', 28); });
  const pt = (arr, i) => [x + i / 20 * w, y - arr[i] / 80 * h];
  const tek = (arr, u, kl) => { if (u <= 0) return; const n = Math.floor(u); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= n; i++) { const q = pt(arr, i); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
    if (n < 20) { const p0 = pt(arr, n), p1 = pt(arr, n + 1), f = u - n; ctx.lineTo(lerp(p0[0], p1[0], f), lerp(p0[1], p1[1], f)); } ctx.stroke(); for (let i = 0; i <= n; i++) { const q = pt(arr, i); circ(ctx, q[0], q[1], 5, kl); } };
  tek(E3HAAS, haas, C.teal); tek(E3LYNX, lynx, C.oker);
  if (pieken > 0.01) for (const i of [3, 4, 13, 15]) { const px = x + i / 20 * w; ctx.save(); ctx.globalAlpha *= pieken; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y - h); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
const e3GX = (i, x = 230, w = 1400) => x + i / 20 * w, e3GY = (v, y = 790, h = 560) => y - v / 80 * h;

// darm met bewegende bacteriën; vez = vezelresten 0..1 (afgebroken), vit = vitamine 0..1
function e3DarmT(ctx, cx, cy, R, t, vez = 1, vit = 0) { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  // dikke darm: vlakke wand met crypten (buisvormige instulpingen), geen darmvlokken
  const wy = cy + R * 0.32; ctx.fillStyle = '#B87A6E'; ctx.fillRect(cx - R, wy, 2 * R, R); ctx.strokeStyle = '#D89A8E'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - R, wy); const nc = 7, cw = 2 * R / nc;
  for (let i = 0; i < nc; i++) { const x0 = cx - R + i * cw, m = x0 + cw / 2, hw = cw * 0.16, d = R * 0.42; ctx.lineTo(m - hw, wy); ctx.lineTo(m - hw, wy + d); ctx.arc(m, wy + d, hw, Math.PI, 0, true); ctx.lineTo(m + hw, wy); }
  ctx.lineTo(cx + R, wy); ctx.stroke();
  for (let i = 0; i < nc; i++) { const m = cx - R + (i + 0.5) * cw, hw = cw * 0.16 - 2, d = R * 0.42; ctx.fillStyle = C.bgMicro; ctx.fillRect(m - hw, wy - 1, 2 * hw, d); ctx.beginPath(); ctx.arc(m, wy + d, hw, 0, Math.PI); ctx.fill(); }
  for (let i = 0; i < 6; i++) { const xx = cx - R * 0.6 + i * R * 0.25, yy = cy - R * 0.15 + (i % 2) * 30, f = clamp(vez * 1.3 - hash(i + 40) * 0.3, 0, 1); if (f > 0.02) lijn(ctx, [[xx - 30 * f, yy], [xx, yy - 8 * f], [xx + 34 * f, yy + 2]], '#8C9A5A', 5); }
  for (let i = 0; i < 26; i++) { const w = wander(i, t, 14, 0.5); const xx = cx - R * 0.85 + hash(i) * R * 1.7 + w.x, yy = cy - R * 0.75 + hash(i + 30) * R * 1.0 + w.y; e3Bacterie(ctx, xx, yy, 30 + 16 * hash(i + 5), hash(i + 7) * 3 + Math.sin(t * 0.4 + i) * 0.3, i % 3 ? C.teal : '#7FAFC0'); }
  if (vit > 0.01) for (let i = 0; i < 10; i++) { const u = clamp(vit * 1.4 - i * 0.04, 0, 1); if (u <= 0) continue; const w = wander(i + 60, t, 20, 0.4); const xx = cx - R * 0.6 + hash(i + 70) * R * 1.2 + w.x, yy = cy - R * 0.4 + hash(i + 80) * R * 0.6 + w.y - u * 30;
      ctx.save(); ctx.globalAlpha *= u; ctx.translate(xx, yy); ctx.rotate(i); ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(8, 0); ctx.lineTo(0, 9); ctx.lineTo(-8, 0); ctx.closePath(); shape(ctx, C.oker, _lt(C.oker, 0.3), 1.2); ctx.restore(); } }
// mycorrhiza met groeiende schimmeldraden (g 0..1) en stromende stofjes: blauw naar de wortel, groen naar de schimmel
function e3MycoT(ctx, cx, cy, R, t, g = 1, aB = 0, aG = 0) { ctx.fillStyle = '#2E2620'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  for (let i = 0; i < 40; i++) circ(ctx, cx - R + hash(i) * 2 * R, cy - R + hash(i + 50) * 2 * R, 6 + 10 * hash(i + 9), '#4A3C30');
  lijn(ctx, [[cx - R * 0.15, cy - R], [cx - R * 0.05, cy - R * 0.2], [cx + R * 0.1, cy + R * 0.5]], '#C9A880', 34); lijn(ctx, [[cx - R * 0.05, cy - R * 0.2], [cx - R * 0.5, cy + R * 0.3]], '#C9A880', 20);
  const D = []; for (let i = 0; i < 14; i++) { const sx = cx + (hash(i) - 0.5) * R * 0.3, sy = cy - R * 0.4 + hash(i + 3) * R * 0.9, an = hash(i + 6) * 6.283, L = R * (0.5 + 0.5 * hash(i + 8)) * clamp(g * 1.4 - hash(i + 11) * 0.4, 0, 1);
    D.push([sx, sy, an, L]); if (L > 2) lijn(ctx, [[sx, sy], [sx + Math.cos(an) * L * 0.5, sy + Math.sin(an) * L * 0.5 + 20 * L / R], [sx + Math.cos(an) * L, sy + Math.sin(an) * L]], '#E8E2D4', 2.5); }
  D.forEach(([sx, sy, an, L], i) => { if (L < R * 0.2) return; const u = e3fr(t * 0.18 + hash(i + 30));
    if (aB > 0.01) circ(ctx, sx + Math.cos(an) * L * (1 - u), sy + Math.sin(an) * L * (1 - u), 7, rgba(ECOK.stikstof, aB * Math.min(1, (1 - u) * 5)));
    if (aG > 0.01 && i % 2) { const v = e3fr(t * 0.15 + hash(i + 60)); circ(ctx, sx + Math.cos(an) * L * v, sy + Math.sin(an) * L * v, 7, rgba(C.groen, aG * Math.min(1, v * 5))); } }); }
// hek (palen en twee latten), u = groei van links naar rechts
function e3Hek(ctx, x1, x2, y, u = 1, h = 90) { if (u <= 0.01) return; const xe = lerp(x1, x2, u); ctx.strokeStyle = '#B89A70'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (const yy of [y - h * 0.45, y - h * 0.85]) { ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(xe, yy); ctx.stroke(); }
  for (let x = x1; x <= xe + 1; x += 90) { ctx.fillStyle = '#8C6E4A'; ctx.fillRect(x - 5, y - h, 10, h + 6); } }
// kiemplantje
function e3Kiem(ctx, x, y, g) { if (g <= 0.01) return; lijn(ctx, [[x, y], [x, y - 26 * g]], C.groen, 3); for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + k * 9 * g, y - 26 * g, 9 * g, 4.5 * g, k * -0.4, 0, 6.283); ctx.fillStyle = C.groen; ctx.fill(); } }
// waggelende bergeend (lopen): schommelt en deint
function e3EendLoop(ctx, x, y, s, t, kijk = 1, a = 1) { const ph = t * 3.2 * Math.PI; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(ph) * 0.07); e3Bergeend(ctx, 0, -Math.abs(Math.sin(ph)) * 4, s, { kijk, a }); ctx.restore(); }
