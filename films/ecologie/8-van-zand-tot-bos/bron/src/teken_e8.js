// teken_e8.js — animatiehulpen voor film 8 'Van zand tot bos' (Ecologie v2). Laadt na teken_eco8.js, vóór sb8.js. Alleen eigen functies (voorvoegsel a8).
const a8 = {
  pijl(ctx, x1, y1, x2, y2, u, kl, a = 1, lw = 4, kop = 16) { if (u <= 0.01 || a <= 0.01) return; pijl(ctx, x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u, kl, a, lw, kop * Math.min(1, u * 4)); },
  ring(ctx, x, y, w, h, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h); ctx.restore(); },
  // zandslierten die over de vlakte waaien
  wind(ctx, y0, y1, t, n = 14, a = 1, snel = 160) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(E8.zandL, 0.45); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { const span = W + 400, x = ((hash(i * 3.1) * span + t * snel * (0.8 + 0.4 * hash(i * 7))) % span) - 200, y = y0 + hash(i * 2.2) * (y1 - y0); ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 60, y - 12, x + 120, y + 6, x + 200, y - 8); ctx.stroke(); }
    ctx.restore(); },
  // korrels die met de wind meegaan (stop = x waar ze blijven liggen)
  korrels(ctx, x0, x1, y0, y1, t, n, o = {}) { const { a = 1, snel = 220, stop = null, kl = E8.zandL } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kl;
    for (let i = 0; i < n; i++) { const L = x1 - x0, u = (t * snel / L + hash(i * 1.9)) % 1; let x = x0 + u * L; const y = y0 + hash(i * 4.3) * (y1 - y0) + Math.sin(t * 3 + i) * 4; if (stop != null && x > stop) x = stop - hash(i * 5) * 30; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill(); }
    ctx.restore(); },
  eikel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, -14, 10, 15, 0, 0, 6.283); shape(ctx, '#B88A4A', '#8E6A36', 1.5);
    ctx.beginPath(); ctx.ellipse(0, -26, 12, 7, 0, Math.PI, 0); ctx.fillStyle = '#7A5E3A'; ctx.fill(); ctx.fillRect(-1.5, -38, 3, 6); ctx.restore(); },
  rook(ctx, x, y, t, a = 1) { if (a <= 0.01) return; for (let k = 0; k < 6; k++) { const u = (t * 0.12 + k / 6) % 1; ctx.fillStyle = rgba('#9AA3B2', 0.2 * a * (1 - u)); ctx.beginPath(); ctx.ellipse(x + u * 60 + Math.sin(t + k) * 8, y - u * 380, 26 + u * 70, 18 + u * 30, 0, 0, 6.283); ctx.fill(); } },
  // jonge scheut met twee blaadjes (g 0..1)
  scheut(ctx, x, y, h, g) { if (g <= 0.01) return; const top = y - h * g; lijn(ctx, [[x, y], [x + 4, (y + top) / 2], [x, top]], '#6EA460', 4); for (const s of [-1, 1]) { ctx.save(); ctx.translate(x, top + 6); ctx.rotate(s * 0.9); ctx.beginPath(); ctx.ellipse(0, -10 * g, 6 * g, 12 * g, 0, 0, 6.283); ctx.fillStyle = '#7FC48F'; ctx.fill(); ctx.restore(); } },
};

// meetvierkant met groeifactoren per soortgroep (o.g = {bunt, korst, mos, heide, den, berk, eik} 0..1); verder gelijk aan e8Vierkant
// bomen en struiken in een landschap zonder zichtbare wortels: alles onder de voet (y) wegknippen
function e8Boven(ctx, y, fn) { ctx.save(); ctx.beginPath(); ctx.rect(-4000, -4000, 12000, y + 4000); ctx.clip(); fn(); ctx.restore(); }
// e8Vierkant (teken_eco8.js) vervangen door de versie zonder wortels in beeld, met brand
function e8Vierkant(ctx, x, y, w, stadium, o = {}) { return e8VierkantG(ctx, x, y, w, stadium, o); }
// e8Zandvlakte (teken_eco8.js) vervangen: dezelfde vlakte, bomen aan de rand zonder wortels op het zand
function e8Zandvlakte(ctx, o = {}) { const { horizon = 470, rand = true, wind = true } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  _vh8(ctx, [[0, horizon], [0, horizon - 70], [260, horizon - 90], [520, horizon - 60], [760, horizon - 85], [1000, horizon - 40], [1300, horizon - 70], [1600, horizon - 90], [1920, horizon - 60], [1920, horizon]], '#2A4434');
  _vh8(ctx, [[0, horizon], [1920, horizon], [1920, H], [0, H]], _d8(E8.zand, 0.15));
  for (let i = 0; i < 6; i++) { const yy = horizon + 40 + i * 90; ctx.fillStyle = i % 2 ? _d8(E8.zand, 0.1) : _d8(E8.zand, 0.2); ctx.beginPath(); ctx.moveTo(0, yy); for (let xx = 0; xx <= W; xx += 60) ctx.lineTo(xx, yy + Math.sin(xx / 210 + i) * 14); ctx.lineTo(W, yy + 90); ctx.lineTo(0, yy + 90); ctx.fill(); }
  if (rand) { for (const [x, s, k] of [[90, 1.25, 1], [250, 1.0, -1], [1680, 1.15, -1], [1820, 0.9, 1]]) e8Boven(ctx, horizon + 30, () => ecoGroveDen(ctx, x, horizon + 30, s, { kijk: k })); }
  if (wind) { ctx.strokeStyle = rgba(E8.zandL, 0.45); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const x = 300 + hash(i * 3.1) * 1300, yy = horizon + 60 + hash(i * 2.2) * 360; ctx.beginPath(); ctx.moveTo(x, yy); ctx.bezierCurveTo(x + 60, yy - 12, x + 120, yy + 6, x + 200, yy - 8); ctx.stroke(); } }
}
function e8VierkantG(ctx, x, y, w, stadium, o = {}) { const { brand = null, touw = true, seed = 1, g = {}, touwA = 1, grondA = 1 } = o; const h = w * 0.42; ctx.save();
  const P = [[x - w / 2, y], [x + w / 2, y], [x + w / 2 - w * 0.12, y - h], [x - w / 2 + w * 0.12, y - h]];
  const grond = brand != null ? '#4A3A2E' : (stadium >= 2 ? _m8(E8.zand, Math.min(0.7, stadium * 0.12), E8.humus) : E8.zand); ctx.save(); ctx.globalAlpha *= grondA; _vh8(ctx, P, grond); ctx.restore();
  const G = (k) => g[k] ?? 1, gp = (k) => ({ a: Math.min(1, G(k) * 3), groei: G(k) });
  const pt = (u, v) => [x - w / 2 + w * 0.12 * v + u * (w - w * 0.24 * v), y - h * v];
  const items = []; for (let i = 0; i < 46; i++) items.push([hash(seed + i * 1.37), hash(seed + i * 2.71), i]); items.sort((a, b) => b[1] - a[1]);
  const sk = (fn, k, px, py, s, o2 = {}) => { const v = G(k); if (v <= 0.01) return; ctx.save(); ctx.globalAlpha *= Math.min(1, v * 3); ctx.translate(px, py); ctx.scale(0.3 + 0.7 * v, 0.3 + 0.7 * v); fn(ctx, 0, 0, s, o2); ctx.restore(); };
  for (const [u, v, i] of items) { const [px, py] = pt(0.06 + u * 0.88, 0.06 + v * 0.88), k = 0.6 + 0.4 * (1 - v); ctx.save(); ctx.beginPath(); ctx.rect(-4000, -4000, 12000, py + 4000); ctx.clip();
    if (brand === 0) { if (i % 5 === 0) { ctx.fillStyle = E8.as; ctx.fillRect(px - 6 * k, py - 26 * k, 12 * k, 26 * k); } ctx.restore(); continue; }
    if (brand === 1) { if (i % 2) ecoStruikheide(ctx, px, py, 1.2 * k, { groei: 0.4 }); else if (i % 7 === 0) ecoBerk(ctx, px, py, 0.7 * k, { groei: 0.3 }); ctx.restore(); continue; }
    if (stadium === 1 && i % 2) sk((c, a, b, s) => e8Mos(c, a, b, s), 'mos', px, py, 26 * k);
    if (stadium === 2) { if (i % 3 === 0) sk((c, a, b, s) => e8Buntgras(c, a, b, s, {}), 'bunt', px, py, 1.1 * k); else if (i % 3 === 1) sk((c, a, b, s) => e8Korstmos(c, a, b, s), 'korst', px, py, 0.8 * k); else sk((c, a, b, s) => e8Mos(c, a, b, s), 'mos', px, py, 20 * k); }
    if (stadium === 3) { if (i % 4 === 0) sk((c, a, b, s) => e8Buntgras(c, a, b, s, {}), 'bunt', px, py, 1.1 * k); else if (i % 4 === 1) { if (G('heide') > 0.01) ecoStruikheide(ctx, px, py, 1.3 * k, gp('heide')); } else if (i % 9 === 2) { if (G('den') > 0.01) ecoGroveDen(ctx, px, py, 0.5 * k, { groei: 0.25 * G('den'), a: Math.min(1, G('den') * 3) }); } else sk((c, a, b, s) => e8Korstmos(c, a, b, s), 'korst', px, py, 0.8 * k); }
    if (stadium === 4) { if (i % 3) { if (G('heide') > 0.01) ecoStruikheide(ctx, px, py, 1.4 * k, gp('heide')); } else if (i % 6 === 0 && G('den') > 0.01) ecoGroveDen(ctx, px, py, 0.8 * k, { groei: 0.5 * G('den'), a: Math.min(1, G('den') * 3) }); }
    if (stadium === 5 && i % 8 === 0) { const kk = i % 12 ? 'den' : 'berk'; if (G(kk) > 0.01) (i % 12 ? ecoGroveDen : ecoBerk)(ctx, px, py, 1.1 * k, { groei: 0.8 * G(kk), a: Math.min(1, G(kk) * 3) }); }
    if (stadium === 6 && i % 9 === 0) { const kk = i % 14 ? 'eik' : 'den'; if (G(kk) > 0.01) (i % 14 ? ecoZomereik : ecoGroveDen)(ctx, px, py, 1.25 * k, { groei: G(kk), a: Math.min(1, G(kk) * 3) }); } ctx.restore(); }
  if (touw && touwA > 0.01) { ctx.save(); ctx.globalAlpha *= touwA; ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 2; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); ctx.restore(); }
  if (touw) P.forEach((p, i) => { const pa = o.paalA ? o.paalA(i) : 1; if (pa <= 0.01) return; ctx.save(); ctx.globalAlpha *= pa; ctx.fillStyle = '#C8B48A'; ctx.fillRect(p[0] - 4, p[1] - 36 * pa, 8, 36 * pa); ctx.restore(); });
  ctx.restore(); }

// brandplek met groeiende heide en berken (gh, gb 0..1) en rook (rook 0..1)
function e8BrandA(ctx, o = {}) { const { gh = 0, gb = 0, rook = 0, t = 0, horizon = 500, zwart = 1 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  _vh8(ctx, [[0, horizon], [1920, horizon], [1920, H], [0, H]], _m8('#1E1C1A', 1 - zwart, '#4A4A3A'));
  for (let i = 0; i < 26; i++) { const x = hash(i * 2.3) * W, y = horizon + 30 + hash(i * 4.4) * 380, s = 0.6 + (y - horizon) / 500; ctx.fillStyle = E8.as; ctx.fillRect(x - 6 * s, y - (i % 4 ? 30 : 180) * s, 12 * s, (i % 4 ? 30 : 180) * s); }
  if (rook > 0.01) for (let i = 0; i < 4; i++) a8.rook(ctx, 320 + i * 420, horizon - 10, t + i * 2, rook);
  for (let i = 0; i < 60; i++) { const x = hash(i * 1.9) * W, y = horizon + 40 + hash(i * 3.3) * 380, s = 0.5 + (y - horizon) / 450; if (i % 5) { const g = clamp(gh * 1.3 - hash(i * 7) * 0.3, 0, 1); if (g > 0.01) e8Boven(ctx, y, () => ecoStruikheide(ctx, x, y, 1.6 * s, { groei: 0.4 * g, a: Math.min(1, g * 3) })); } else { const g = clamp(gb * 1.3 - hash(i * 5) * 0.3, 0, 1); if (g > 0.01) e8Boven(ctx, y, () => ecoBerk(ctx, x, y, 1.2 * s, { groei: 0.35 * g, a: Math.min(1, g * 3) })); } }
}

// uitheems mos (grijs kronkelsteeltje) als laag, dicht tapijt dat uitdijt: donkergroen kussen met grijze haartopjes; r = 0..1
function e8MosTapijt(ctx, cx, cy, rx, ry, r, t = 0) { if (r <= 0.01) return; const P = []; for (let k = 0; k < 28; k++) { const an = k / 28 * 6.283, f = 0.82 + 0.18 * hash(k * 3.7); P.push([cx + Math.cos(an) * rx * r * f, cy + Math.sin(an) * ry * r * f]); }
  ctx.save(); vul(ctx, P, '#3E5A2C', '#5E7A40', 2); ctx.clip(); ctx.fillStyle = '#4E6E34'; for (let i = 0; i < 240; i++) { const px = cx + (hash(i * 1.7) - 0.5) * 2 * rx, py = cy + (hash(i * 2.9) - 0.5) * 2 * ry; ctx.beginPath(); ctx.arc(px, py, 7, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#C8CEC4'; for (let i = 0; i < 420; i++) { const px = cx + (hash(i * 4.1) - 0.5) * 2 * rx, py = cy + (hash(i * 5.3) - 0.5) * 2 * ry; ctx.fillRect(px, py, 2, 2); } ctx.restore(); }
