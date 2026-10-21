// Wat word jij? · Diergeneeskunde 2 · Bronst, dekken en kalven — eigen tekeningen (21 okt 2026). Gebruikt de gedeelde dieren uit teken_dg0.js.

// koe die op een andere koe springt (staande tocht); u = 0..1 hoe ver omhoog
function koeSprong(ctx, x, y, s, u, t) { koe(ctx, x, y, s, { t }); if (u <= 0.01) return; ctx.save(); ctx.translate(x - 210 * s, y - 60 * s * u); ctx.rotate(-0.42 * u); koe(ctx, 0, 0, s, { t, uier: 0.6 }); ctx.restore(); }
// hormoonlijnen over 21 dagen (oestrogeen piek vlak voor de eisprong, LH-piek, progesteron in de tweede helft)
function koeHormonen(ctx, x, y, w, h, a = 1, nu = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, '', 'hormoonspiegel'); metaText(ctx, 'DAGEN', x + w / 2, y + h + 34, C.text2, 'center', 18);
  const lijn = (f, col) => { ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); const n = Math.floor(120 * nu); for (let i = 0; i <= n; i++) { const d = i / 120; const v = f(d); const px = x + d * w, py = y + h - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
  const g = (d, m, s2) => Math.exp(-((d - m) ** 2) / (2 * s2 * s2));
  lijn(d => 0.12 + 0.45 * g(d, 0.88, 0.05) + 0.4 * g(d, 0.35, 0.06), C.paars); lijn(d => 0.15 + 0.7 * g(d, 0.95, 0.04) + 0.7 * g(d, -0.05, 0.04), C.goud); lijn(d => 0.08 + 0.9 * g(d, 0.97, 0.012) + 0.9 * g(d, 0.0, 0.012), C.koraal); lijn(d => 0.08 + 0.75 * Math.max(0, Math.sin(Math.PI * clamp((d - 0.15) / 0.65, 0, 1))), C.teal);
  regel(ctx, 'oestrogeen', x + w + 14, y + h * 0.35, 1, C.goud, 26, 'left', 700); regel(ctx, 'LH', x + w + 14, y + h * 0.15, 1, C.koraal, 26, 'left', 700); regel(ctx, 'progesteron', x + w * 0.48, y + h * 0.1, 1, C.teal, 26, 'center', 700); regel(ctx, 'FSH', x + w * 0.35, y + h * 0.42, 1, C.paars, 26, 'center', 700);
  regel(ctx, '0', x, y + h + 34, 1, C.text2, 22, 'center', 600); regel(ctx, '21', x + w, y + h + 34, 1, C.text2, 22, 'center', 600); ctx.restore(); }
// jaarrad met 12 maanden; highlight = [[startmaand, eindmaand, kleur, label]]
function jaarRad(ctx, x, y, r, a = 1, vakken = [], wijzer = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  circ(ctx, x, y, r, '#22304C', C.line, 2);
  vakken.forEach(([m0, m1, col, al]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, -Math.PI / 2 + m0 / 12 * 6.283, -Math.PI / 2 + m1 / 12 * 6.283); ctx.closePath(); ctx.fillStyle = rgba(col, 0.55); ctx.fill(); ctx.restore(); });
  M.forEach((m, i) => { const an = -Math.PI / 2 + (i + 0.5) / 12 * 6.283; regel(ctx, m, x + Math.cos(an) * (r + 34), y + Math.sin(an) * (r + 34) + 8, 1, C.text2, 22, 'center', 600); });
  if (wijzer != null) { const an = -Math.PI / 2 + wijzer / 12 * 6.283; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 20), y + Math.sin(an) * (r - 20)); ctx.stroke(); }
  circ(ctx, x, y, 8, C.goud); ctx.restore(); }
// dag/nacht-balk: frac = deel nacht; melatonine-golfjes in het donker
function dagNacht(ctx, x, y, w, frac, a = 1, label = '', t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 60, 12); shape(ctx, '#E0B64A', null); roundRect(ctx, x + w * (1 - frac), y, w * frac, 60, 12); shape(ctx, '#141C2E', '#5A6478', 2);
  for (let i = 0; i < Math.round(frac * 10); i++) { const px = x + w * (1 - frac) + 20 + i * (w * frac - 40) / Math.max(1, Math.round(frac * 10) - 1); circ(ctx, px, y + 30 + Math.sin(t * 2 + i) * 6, 7, C.paars); }
  if (label) regel(ctx, label, x - 20, y + 42, 1, C.text, 28, 'right', 700); ctx.restore(); }
// lamp met lichtkegel
function lamp(ctx, x, y, a = 1, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 120); ctx.lineTo(x, y - 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x - 20, y - 24); ctx.lineTo(x + 20, y - 24); ctx.lineTo(x + 40, y); ctx.closePath(); ctx.fillStyle = '#5A6478'; ctx.fill();
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; const g = ctx.createLinearGradient(x, y, x, y + 420); g.addColorStop(0, 'rgba(242,214,122,0.45)'); g.addColorStop(1, 'rgba(242,214,122,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 36, y); ctx.lineTo(x + 36, y); ctx.lineTo(x + 240, y + 420); ctx.lineTo(x - 240, y + 420); ctx.closePath(); ctx.fill(); circ(ctx, x, y + 4, 12, '#F2D27A'); ctx.restore(); }
  ctx.restore(); }
// donkere stal-achtergrond (nacht)
function nachtStal(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#121A2A'; ctx.fillRect(x, y - h, w, h); ctx.strokeStyle = '#2A3448'; ctx.lineWidth = 2; ctx.strokeRect(x, y - h, w, h); for (let i = 0; i < 12; i++) circ(ctx, x + hash(i * 3) * w, y - h - 20 - hash(i * 5) * 60, 2, '#F2EEE6'); ctx.restore(); }
// konijn (zittend)
function konijn(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#B8A58C'; ctx.fillStyle = k; ctx.beginPath(); ctx.ellipse(0, -40, 50, 40, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(44, -76, 26, 22, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(36, -118, 9, 30, -0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(54, -116, 9, 30, 0.2, 0, 6.283); ctx.fill(); circ(ctx, -50, -50, 12, '#F2EEE6'); circ(ctx, 56, -80, 3.5, '#1A1612'); ctx.restore(); }
// stier (koe zonder uier, donker, met horens, steviger)
function stier(ctx, x, y, s = 1, o = {}) { koe(ctx, x, y, s * 1.05, Object.assign({ uier: 0, kleur: '#3A3430', vlek: '#2A2622', bont: false, horens: true }, o)); }
// rietjes in een rek
function rietjesRek(ctx, x, y, n, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const f = clamp(u * n - i, 0, 1); if (f <= 0) continue; ctx.save(); ctx.globalAlpha *= f; rietje(ctx, x + (i % 10) * 30, y + Math.floor(i / 10) * 26, 0.32, 1, Math.PI / 2, [C.teal, C.goud, C.koraal][i % 3]); ctx.restore(); } ctx.restore(); }
// lange pipet
function pipet(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -10, -5, 300, 10, 5); shape(ctx, '#E8ECF2', '#9AA3B2', 1.5); roundRect(ctx, -40, -9, 40, 18, 6); shape(ctx, '#9AA3B2', null); ctx.restore(); }
// eierstok met follikels (n), en embryo's (bolletjes van cellen)
function eierstok(ctx, x, y, r, n, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r, 0, 0, 6.283); shape(ctx, '#C98A7A', '#E0A898', 2);
  for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.3, rr = r * 0.62; circ(ctx, x + Math.cos(an) * rr * 1.25, y + Math.sin(an) * rr, r * 0.24, 'rgba(242,238,228,0.85)', '#F2D27A', 2); circ(ctx, x + Math.cos(an) * rr * 1.25, y + Math.sin(an) * rr, r * 0.07, C.goud); } ctx.restore(); }
function embryo(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, 'rgba(242,238,228,0.25)', '#F2EEE6', 2); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283; circ(ctx, x + Math.cos(an) * r * 0.45, y + Math.sin(an) * r * 0.45, r * 0.32, 'rgba(242,214,122,0.6)', '#F2D27A', 1); } ctx.restore(); }
// dikbilrund: wit-blauw met zware billen en schouders
function dikbil(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, kijk = 1 } = o; koe(ctx, x, y, s, { a, t, kijk, kleur: '#E6E8EE', vlek: '#6A7A96', bont: true, uier: 0 });
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.fillStyle = '#DCE0E8'; ctx.beginPath(); ctx.ellipse(-150, -168, 74, 80, -0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(110, -182, 62, 64, 0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(-40, -150, 50, 56, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B8C0CE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-150, -170, 40, 0.4, 2.2); ctx.stroke(); ctx.beginPath(); ctx.arc(110, -180, 32, 0.6, 2.4); ctx.stroke(); ctx.restore(); }
// snedelijn op de linkerflank (keizersnede)
function snede(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(x - 60 * s, y - 210 * s); ctx.lineTo(x - 40 * s, y - 110 * s); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
// telefoonmelding gebruikt telefoon() uit teken_dg0
