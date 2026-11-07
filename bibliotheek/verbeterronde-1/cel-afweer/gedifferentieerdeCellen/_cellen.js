// --- losse celtypen (gedeeld door de set). u = maat-eenheid in px (± 1 µm × u/2). Elk geeft het midden van de kern terug.
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
  if (soort === 'bloed') { rodeBloedcel(ctx, x - u * 0.28, y, u * 0.34, 0, 0); rodeBloedcel(ctx, x + u * 0.32, y + u * 0.08, u * 0.34, 0.4, 0.85); return null; } // geen kern
  return [x, y];
}
function _gdStrip(ctx, x, y, w, aan, a = 1, zonderKern = false) { // hetzelfde stukje DNA met vijf genen; alleen 'aan' licht op
  ctx.save(); ctx.globalAlpha *= a; const h = Math.max(4, w * 0.12), n = _GD_GEN.length, g = w / n;
  roundRect(ctx, x - w / 2 - 2, y - h / 2 - 2, w + 4, h + 4, h / 2 + 2); shape(ctx, rgba(C.paars, 0.35), rgba(C.paars, 0.9), 1);
  for (let i = 0; i < n; i++) { const on = _GD_GEN[i][0] === aan; roundRect(ctx, x - w / 2 + i * g + 1.5, y - h / 2, g - 3, h, Math.min(3, h / 2)); ctx.fillStyle = on ? _GD.aan : _GD.uit; ctx.fill(); }
  if (zonderKern) { ctx.setLineDash([3, 3]); roundRect(ctx, x - w / 2 - 5, y - h / 2 - 5, w + 10, h + 10, h / 2 + 5); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }
