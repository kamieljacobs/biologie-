// Film 2 · Natuurlijke selectie — eigen hulpfuncties voor de animatie (laadt na lib_dieren, vóór sb2.js).
// Niets in /root/evo2/src of /root/hw/evolib aangepast; alles hier.

// 0..1 tussen twee tijden
function _sg(t, t0, t1) { return ease((t - t0) / Math.max(1e-3, t1 - t0)); }
// schermachtergrond voor Schema-scènes (de keyframes tekenen die niet zelf)
function _schemaBg(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
// alles wat fn tekent, geschaald om (cx, cy) met factor k
function _zoom(ctx, cx, cy, k, fn) { ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy); fn(); ctx.restore(); }

// merel met een opname van waar de snavelpunt zit (via de prooi-callback); o.prooi = tekenfunctie of null
function _merelP(ctx, x, y, s, o = {}) { let P = null; const prooi = o.prooi;
  merel(ctx, x, y, s, Object.assign({}, o, { prooi: (c, px, py) => { const m = c.getTransform(); P = [m.a * px + m.c * py + m.e, m.b * px + m.d * py + m.f]; if (prooi) prooi(c, px, py); } }));
  return P; }
const _bruineRups = (c, x, y) => { c.save(); c.translate(x - 4, y + 2); c.rotate(0.5); rups(c, 0, 0, 0.15, { kleur: '#8C6A48', krom: 0.4 }); c.restore(); };

// histogram met een vrije dichtheidsfunctie dens(u) (0..1 over de as), staafjes zoals histogram() in lib_evo
function _histo(ctx, x, y, w, h, dens, kleur = C.teal, a = 1, n = 22, licht = null) { ctx.save(); ctx.globalAlpha *= a; const bw = w / n;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, v = dens(u); if (v < 0.02) continue; const bh = v * h; const hl = licht ? licht(u) : 0;
    roundRect(ctx, x + i * bw + 3, y - bh, bw - 6, bh, 4); shape(ctx, rgba(kleur, 0.75), hl > 0.01 ? C.goud : _lt(kleur, 0.35), 1.5 + hl * 2); }
  ctx.restore(); }
function _hAs(ctx, x, y, w, h, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x + w + 10, y); ctx.moveTo(x, y + 10); ctx.lineTo(x, y - h - 30); ctx.stroke(); ctx.restore(); }
const _gauss = (u, m, s) => Math.exp(-0.5 * ((u - m) / s) ** 2);
function _mmAs(ctx, x, y, w, a = 1) { ctx.save(); ctx.globalAlpha *= a; for (let v = 7; v <= 12; v++) metaText(ctx, String(v), x + (v - 7) / 5 * w, y + 44, C.text2, 'center', 28);
  metaText(ctx, 'snavelhoogte (mm)', x + w, y + 80, C.grain, 'right', 28); ctx.restore(); }
function _stip(ctx, x1, y1, x2, y2, kl, lw = 3) { ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }

// pad deels tekenen (0..1 van de punten), met fractie van het laatste stuk
function _deelPad(P, f) { if (f <= 0) return []; const n = P.length - 1, e = f * n, k = Math.floor(e), r = e - k; const out = P.slice(0, Math.min(P.length, k + 1));
  if (k < n) out.push([lerp(P[k][0], P[k + 1][0], r), lerp(P[k][1], P[k + 1][1], r)]); return out; }

// één knikker (allel) in reekskleur
function _knikker(ctx, x, y, r, allel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const f = allel === 1 ? EVO.a1 : EVO.a2, rr = allel === 1 ? EVO.a1R : EVO.a2R;
  circ(ctx, x, y, r, f, rr, 2); circ(ctx, x - r * 0.35, y - r * 0.35, r * 0.22, 'rgba(255,255,255,0.35)'); ctx.restore(); }

// vink die over de grond hipt: x0 = beginanker, t = aantal sprongen (continu), y = grond
function _hipVink(ctx, x0, y, s, t, o = {}) { const l = 70; const k = Math.floor(t), f = t - k; grondvink(ctx, x0 + (o.kijk || 1) * k * l * s, y, s, Object.assign({}, o, { houding: f > 0.001 ? 'hippen' : 'staan', t: f })); }
