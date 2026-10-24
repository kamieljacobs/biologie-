// Film 4 · De mens als selectiefactor — eigen hulpfuncties voor de animatie (na lib_dieren/lib_micro_evo, vóór sb4.js). Niets gedeelds aangepast.
const E4 = {};
E4.sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
E4.mic = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); };
E4.cam = (ctx, cx, cy, z) => { ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
// posities van een kolonie, identiek aan _kolonie in sb4.js (zelfde seed = zelfde plekken als het keyframe)
E4.kolPos = function (cx, cy, rx, ry, n, len, seed = 1) { const P = [];
  for (let i = 0; i < n; i++) { const an = hash(i * 7 + seed) * 6.283, d = Math.sqrt(hash(i * 13 + seed));
    P.push({ i, x: cx + Math.cos(an) * d * rx, y: cy + Math.sin(an) * d * ry, len: len * (0.85 + 0.3 * hash(i * 3 + seed)), rot: hash(i * 5 + seed) * 3.14 }); } return P; };
// rustig levende bacterie op een kolonieplek: licht wiebelen, flagellen golven (t in s)
E4.leef = (p, t, amp = 1) => ({ x: p.x + Math.sin(t * 0.45 + p.i * 1.7) * p.len * 0.035 * amp, y: p.y + Math.cos(t * 0.38 + p.i * 2.3) * p.len * 0.03 * amp, rot: p.rot + Math.sin(t * 0.3 + p.i) * 0.06 * amp });
E4.kol = function (ctx, cx, cy, rx, ry, n, len, f, seed, t, amp = 1) {
  for (const p of E4.kolPos(cx, cy, rx, ry, n, len, seed)) { const o = f(p.i); if (!o) continue; const l = E4.leef(p, t, o.dood ? 0 : amp);
    const oo = Object.assign({ seed: p.i, zweep: len > 100, t: t * 0.7 + p.i * 0.13 }, o);
    if (oo.deler != null) E4.deler(ctx, l.x, l.y, p.len, l.rot, oo.deler, oo); else bacterie(ctx, l.x, l.y, p.len, l.rot, oo); } };
// deling: u 0..1 — staafje wordt langer en snoert in (0–0,65), dan twee dochters die uit elkaar schuiven en groeien
E4.deler = function (ctx, x, y, len, rot, u, o = {}) { const oo = Object.assign({}, o); delete oo.deler;
  if (u <= 0) { bacterie(ctx, x, y, len, rot, oo); return; }
  if (u < 0.65) { const a = u / 0.65; bacterie(ctx, x, y, len * (1 + 0.25 * ease(a)), rot, Object.assign(oo, { deling: 0.95 * ease(a) })); return; }
  const e = ease((u - 0.65) / 0.35), L2 = len * lerp(0.62, 0.82, e), off = len * lerp(0.315, 0.47, e), c = Math.cos(rot), s = Math.sin(rot);
  for (const k of [-1, 1]) bacterie(ctx, x + c * off * k, y + s * off * k, L2, rot + k * 0.04 * e, Object.assign({}, oo, { deling: 0, seed: (oo.seed || 1) + (k > 0 ? 50 : 0) })); };
// plek van plasmide i binnen bacterie(len, rot, seed) in wereldcoördinaten (zelfde rekensom als lib_micro_evo)
E4.plasPos = function (x, y, len, rot, seed, i) { const L = len, r = len * 0.14, half = L / 2; const bendA = (hash(seed * 3.7 + 0.3) - 0.5) * 0.36 * r, bend = (px) => bendA * (1 - Math.pow(px / half, 2));
  const ww = Math.max(1.4, r * 0.1), gp = Math.max(1.2, r * 0.07), lwM = Math.max(1, r * 0.035), ri = r - ww - gp - lwM, rp = Math.max(4, Math.min(L * 0.065, ri * 0.34));
  const PL = [[0.33, -1], [-0.36, 1], [0.4, 1], [-0.22, -1]], [u, zij] = PL[i % 4]; const vy = zij * Math.max(0, ri - rp * 1.25 - 1) * 0.85, px = u / 0.4 * (half - ri - rp) * 0.8, py = vy + bend(px);
  return { x: x + px * Math.cos(rot) - py * Math.sin(rot), y: y + px * Math.sin(rot) + py * Math.cos(rot), r: rp }; };
// tijdlijn met k zichtbare streepjes (van n)
E4.tijdlijn = function (ctx, x, y, w, n, kleur, label, meta, aL = 1, aM = 1, k = n) { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < Math.min(n, Math.floor(k)); i++) { const xx = x + (i + 0.5) * w / n; ctx.strokeStyle = kleur; ctx.lineWidth = n > 20 ? 4 : 8; ctx.beginPath(); ctx.moveTo(xx, y - 24); ctx.lineTo(xx, y + 24); ctx.stroke(); }
  if (aL > 0.01) text(ctx, label, x, y - 50, fTekst(40, 600), rgba(C.text, aL), 'left'); if (aM > 0.01) metaText(ctx, meta, x + w, y - 50, rgba(C.grain, aM), 'right', 26); };
E4.knikker = (ctx, x, y, kr, oker, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, kr, oker ? EVO.a2 : EVO.a1, oker ? EVO.a2R : EVO.a1R, 2); circ(ctx, x - kr * 0.35, y - kr * 0.35, kr * 0.22, 'rgba(255,255,255,0.35)'); ctx.restore(); };
// balie met kast (apotheek), zoals in sb4
E4.apotheek = function (ctx, kast = true) { E4.sch(ctx); if (kast) _kast(ctx, 120, 160, 700, 520); };
E4.doosje = (ctx, x, y, w = 120) => medicijnDoosje(ctx, x, y, w);
// rond 'zoomvenster' met Micro-achtergrond (cirkel opent met radius r)
E4.venster = function (ctx, x, y, r, fn) { if (r <= 1) return; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.clip(); fn(); ctx.restore(); circ(ctx, x, y, r, null, C.goud, 2); };
// stamboom-icoon (s31): vader + 7 pups; g = groei 0..1, fam = koppeling tussen twee pups
E4.stamboom = function (ctx, g, fam = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vx = 1500, vy = 300;
  roundRect(ctx, vx - 26, vy - 26, 52, 52, 6); shape(ctx, rgba(C.goud, 0.3), C.goud, 3);
  for (let i = 0; i < 7; i++) { const u = clamp(g * 8 - i, 0, 1); if (u <= 0) continue; const px = 1260 + i * 80, py = 470; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, vy + 26); ctx.lineTo(lerp(vx, px, u), lerp(vy + 26, py - 20, u)); ctx.stroke(); if (u > 0.95) circ(ctx, px, py, 20, rgba(C.fill, 0.9), C.line, 2); }
  if (fam > 0.01) { ctx.save(); ctx.globalAlpha *= fam; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1340, 492); ctx.quadraticCurveTo(1460, 560, 1580, 492); ctx.stroke(); circ(ctx, 1340, 470, 24, null, C.koraal, 3); circ(ctx, 1580, 470, 24, null, C.koraal, 3); ctx.restore(); }
  ctx.restore(); };
