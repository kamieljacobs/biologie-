// teken_e2.js — eigen hulpfuncties voor de animatie van Ecologie v2 · film 2 (Waar past een soort?), 29 okt 2026.
// Laadt na teken_eco1.js en teken_eco2.js, vóór sb2.js. Niets in /root/eco2 of ecolib aangepast.
const ALLES2 = { on: () => 1, at: () => 0, localT: 99 };
function A2(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= Math.min(1, a); fn(); ctx.restore(); }
function A2clip(ctx, a, x, y, w, h, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= Math.min(1, a); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
// stroming in een snelle beek: lichte streepjes die met het water meegaan
function e2Stroom(ctx, x, w, y0, y1, t, v = 140, n = 14) { ctx.save(); ctx.beginPath(); ctx.rect(x, y0, w, y1 - y0); ctx.clip(); ctx.lineCap = 'round'; ctx.lineWidth = 3;
  for (let i = 0; i < n; i++) { const L = 60 + hash(i * 4.1) * 80, sx = x - 150 + ((hash(i * 2.3) * (w + 300) + t * v * (0.7 + 0.6 * hash(i))) % (w + 300)), sy = y0 + 20 + hash(i * 7.7) * (y1 - y0 - 40);
    ctx.strokeStyle = rgba('#9ACBEA', 0.45); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + L / 2, sy - 6, sx + L, sy); ctx.stroke(); } ctx.restore(); }
// zwevende deeltjes in traag, troebel water
function e2Zweef(ctx, x, w, y0, y1, t, n = 22) { ctx.save(); ctx.beginPath(); ctx.rect(x, y0, w, y1 - y0); ctx.clip();
  for (let i = 0; i < n; i++) { const d = wander(i, t, 14, 0.25), px = x + ((hash(i * 9.1) * w + t * 8) % w) + d.x, py = y0 + 20 + hash(i * 3.3) * (y1 - y0 - 40) + d.y; circ(ctx, px, py, 2 + hash(i) * 3, rgba('#9AAA88', 0.5)); } ctx.restore(); }
function e2BeekA(ctx, x, y, w, h, t, o = {}) { const r = e2Beek(ctx, x, y, w, h, o); if ((o.soort || 'snel') === 'snel') e2Stroom(ctx, x, w, r.wl + 10, r.by - 40, t); else e2Zweef(ctx, x, w, r.wl + 10, r.by - 10, t); return r; }
// zuurstofbolletjes die rustig zweven (en langzaam stijgen)
function e2BolAnim(ctx, x, y, w, h, n, t, seed = 1, kleur = C.teal) { for (let i = 0; i < n; i++) { const d = wander(i + seed * 50, t, 10, 0.5); const bx = x + hash(seed * 11 + i * 1.3) * w + d.x, by = y + ((hash(seed * 5 + i * 2.7) * h - t * 12 * (0.5 + hash(i)) ) % h + h) % h + d.y * 0.5;
    circ(ctx, bx, by, 7, rgba(kleur, 0.85), _lt(kleur, 0.3), 1.5); } }
// reageerbuis met pantoffeldiertjes; u = tijdverloop 0..1 (aantallen volgen de groeilijnen), t = bewegen
function e2BuisA(ctx, x, y, h, o = {}) { const { soorten = [], titel = '', lijnen = [], u = 1, t = 0 } = o; const w = 120;
  ctx.fillStyle = rgba(C.teal, 0.18); roundRect(ctx, x - w / 2, y - h, w, h, 50); ctx.fill(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - 50); ctx.arc(x, y - 50, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  const groei = (v, eind) => { let g = 0.85 / (1 + Math.exp(-(v - 0.3) * 12)); if (eind === 'weg') g = g * Math.max(0, 1 - Math.max(0, v - 0.45) * 2.6); return g; };
  soorten.forEach(([n, kl, zone, eind], k) => { const m = Math.round(n * groei(u, eind) / 0.85); for (let i = 0; i < m; i++) { const d = wander(i + k * 20, t, 8, 0.6); const yy = zone === 'onder' ? y - 30 - hash(i * 3 + k) * h * 0.3 : y - h * 0.25 - hash(i * 7 + k) * h * 0.6;
    e2Paramecium(ctx, x - 30 + hash(i * 5.1 + k * 2) * 60 + d.x * 0.6, yy + d.y, 9, kl, hash(i + k) * 3 + 0.3 * Math.sin(t + i)); } });
  if (titel) text(ctx, titel, x, y + 60, fTekst(36, 700), C.text, 'center');
  const gx = x - 90, gy = y - h - 40, gw = 180, gh = 130; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  lijnen.forEach(([kl, eind]) => { const P = []; for (let i = 0; i <= 20; i++) { const v = i / 20 * u; P.push([gx + v * gw, gy - groei(v, eind) * gh]); } if (u > 0.02) lijn(ctx, P, kl, 5); }); }
// kromme die zich van links naar rechts tekent (clip)
function e2KrommeU(ctx, x, y, w, h, u, o) { if (u <= 0.01) return; ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - h * 1.6, w * u + 10, h * 1.6 + 20); ctx.clip(); e2Kromme(ctx, x, y, w, h, o); ctx.restore(); }
