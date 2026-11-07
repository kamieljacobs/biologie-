// Binnen de grenzen — eigen tekeningen (bestuivers, gewassen, rivier, aardsystemen, planetaire grenzen, ozonlaag)

// ---------- bestuivers (kop naar boven tenzij ang) ----------
function hommel(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, ang = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = Math.sin(t * 40) * 0.25; ctx.fillStyle = rgba('#C8D4E4', 0.55); ctx.strokeStyle = rgba('#E6EEF8', 0.7); ctx.lineWidth = 1;
  for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * (0.5 + fl)); ctx.beginPath(); ctx.ellipse(d * 22, -6, 22, 10, 0, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 14, 20, 24, 0, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#E8C04A'; ctx.fillRect(-22, -2, 44, 10); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-22, 26, 44, 14); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0, -10, 16, 13, 0, 0, 6.283); ctx.fillStyle = '#E8C04A'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -24, 10, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.strokeStyle = 'rgba(242,238,230,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 18; i++) { const an = i / 18 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 18, 14 + Math.sin(an) * 22); ctx.lineTo(Math.cos(an) * 22, 14 + Math.sin(an) * 26); ctx.stroke(); }
  ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -32); ctx.lineTo(-10, -44); ctx.moveTo(4, -32); ctx.lineTo(10, -44); ctx.stroke(); ctx.restore(); }
function wildeBij(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, ang = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = Math.sin(t * 46) * 0.25; ctx.fillStyle = rgba('#C8D4E4', 0.5); for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * (0.6 + fl)); ctx.beginPath(); ctx.ellipse(d * 16, -4, 16, 7, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 12, 11, 17, 0, 0, 6.283); ctx.fillStyle = '#C9683A'; ctx.fill(); ctx.strokeStyle = '#E8955E'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -6, 9, 8, 0, 0, 6.283); ctx.fillStyle = '#4A3A30'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -16, 6.5, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-3, -21); ctx.lineTo(-7, -30); ctx.moveTo(3, -21); ctx.lineTo(7, -30); ctx.stroke(); ctx.restore(); }
function vlinder(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, col = '#E07A5F' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = 0.55 + 0.45 * Math.abs(Math.cos(t * 6));
  for (const d of [-1, 1]) { ctx.save(); ctx.scale(d * k, 1); ctx.beginPath(); ctx.ellipse(16, -10, 18, 14, -0.4, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.ellipse(12, 12, 12, 10, 0.4, 0, 6.283); ctx.fill(); ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.arc(20, -12, 3.5, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#2A2420'; roundRect(ctx, -3, -18, 6, 36, 3); ctx.fill(); ctx.restore(); }

// ---------- gewassen ----------
function graanaar(ctx, x, yG, h, a = 1, t = 0, wind = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); const b = Math.sin(t * 1.6 + x * 0.01) * 0.08 * wind;
  ctx.rotate(b); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(4, -h * 0.5, 0, -h * 0.7); ctx.stroke();
  for (let i = 0; i < 7; i++) { const yy = -h * 0.7 - i * h * 0.045; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 7, yy, 6, 11, d * 0.35, 0, 6.283); ctx.fillStyle = '#D9B866'; ctx.fill(); ctx.strokeStyle = '#B08A3C'; ctx.lineWidth = 1; ctx.stroke(); } }
  ctx.strokeStyle = '#D9B866'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo((i % 2 ? 7 : -7), -h * 0.73 - i * h * 0.045); ctx.lineTo((i % 2 ? 22 : -22), -h * 0.85 - i * h * 0.05); ctx.stroke(); }
  ctx.restore(); }
function aardbei(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-30, 10, -26, -20, 0, -18); ctx.bezierCurveTo(26, -20, 30, 10, 0, 30); ctx.fillStyle = '#D8463F'; ctx.fill(); ctx.strokeStyle = '#F07A6A'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = '#F2D27A'; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.ellipse(-12 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4, -6 + Math.floor(i / 4) * 11, 1.6, 2.4, 0, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#5FA86E'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(-1.1 + i * 0.55); ctx.beginPath(); ctx.ellipse(0, -22, 5, 11, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
function amandel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -26); ctx.bezierCurveTo(20, -14, 18, 18, 0, 26); ctx.bezierCurveTo(-18, 18, -20, -14, 0, -26); ctx.fillStyle = '#B07A4C'; ctx.fill(); ctx.strokeStyle = '#D9A272'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.strokeStyle = 'rgba(80,50,30,.45)'; ctx.beginPath(); ctx.moveTo(-4, -16); ctx.quadraticCurveTo(-8, 0, -3, 16); ctx.moveTo(5, -12); ctx.quadraticCurveTo(7, 0, 4, 14); ctx.stroke(); ctx.restore(); }
function koffie(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 30, -16 * d, 18, 8, d * 0.5, 0, 6.283); ctx.fill(); }
  [[-12, 8], [0, 12], [12, 8], [-6, -4], [6, -4]].forEach(([bx, by], i) => { ctx.beginPath(); ctx.arc(bx, by, 8, 0, 6.283); ctx.fillStyle = i % 2 ? '#B8322E' : '#D8463F'; ctx.fill(); ctx.strokeStyle = '#F07A6A'; ctx.lineWidth = 1; ctx.stroke(); }); ctx.restore(); }
function tomaat(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 4, 26, 22, 0, 0, 6.283); ctx.fillStyle = '#E0503C'; ctx.fill(); ctx.strokeStyle = '#F2846E'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(0, -16); ctx.rotate(i / 5 * 6.283); ctx.beginPath(); ctx.ellipse(0, -6, 3, 8, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
function bloesemTak(ctx, x, y, s = 1, o = {}) { const { a = 1, bloei = 1, vrucht = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#6A4A34'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-260, 60); ctx.quadraticCurveTo(-60, 10, 200, -40); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60, 22); ctx.quadraticCurveTo(-10, -60, 40, -110); ctx.moveTo(90, -18); ctx.quadraticCurveTo(140, 30, 170, 80); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; [[-140, 40, 0.5], [-30, -30, -0.8], [120, -40, 0.2], [170, 40, 1.2], [0, -80, -1]].forEach(([bx, by, r]) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 26, 11, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  const spots = [[-180, 30], [-90, 10], [40, -110], [-10, -40], [200, -40], [170, 80], [100, -30]];
  spots.forEach(([bx, by], i) => { if (vrucht > 0.01) appel(ctx, bx, by + 18, 0.55 * vrucht, 1); if (bloei > 0.01) { ctx.save(); ctx.globalAlpha *= bloei * (1 - vrucht); for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 + i; ctx.beginPath(); ctx.ellipse(bx + Math.cos(an) * 11, by + Math.sin(an) * 11, 10, 8, an, 0, 6.283); ctx.fillStyle = '#F6E4EA'; ctx.fill(); ctx.strokeStyle = '#E8B4C2'; ctx.lineWidth = 1; ctx.stroke(); } ctx.beginPath(); ctx.arc(bx, by, 5, 0, 6.283); ctx.fillStyle = '#E0B64A'; ctx.fill(); ctx.restore(); } });
  ctx.restore(); }

// ---------- Lottes ontbijt ----------
function ontbijt(ctx, x, y, a = 1, o = {}) { const { appelA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 300, y, 600, 26, 8); shape(ctx, '#8C6A4A', '#B08A68', 1.5); ctx.fillStyle = '#6A4E36'; ctx.fillRect(x - 270, y + 26, 18, 140); ctx.fillRect(x + 252, y + 26, 18, 140);
  ctx.beginPath(); ctx.ellipse(x - 150, y - 6, 90, 18, 0, 0, 6.283); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5);
  roundRect(ctx, x - 205, y - 40, 110, 34, 14); shape(ctx, '#C99A5C', '#E0BC84', 1.2); roundRect(ctx, x - 190, y - 34, 80, 22, 10); shape(ctx, '#EAD4A8', null);
  ctx.beginPath(); ctx.ellipse(x + 40, y - 6, 70, 14, 0, 0, 6.283); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); aardbei(ctx, x + 15, y - 26, 0.7); aardbei(ctx, x + 60, y - 22, 0.6);
  roundRect(ctx, x + 150, y - 70, 60, 70, 8); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x + 214, y - 36, 14, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#4A2E1C'; ctx.fillRect(x + 156, y - 62, 48, 8);
  appel(ctx, x + 260, y - 30, 1.1, appelA); ctx.restore(); }

// ---------- rivier bij Nijmegen (bovenaanzicht, schematisch) ----------
function waalKaart(ctx, X, Y, Wd, Hd, o = {}) { const { a = 1, geul = 0, hoog = 0, t = 0, natuur = 0, lab = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, X, Y, Wd, Hd, 16); shape(ctx, '#2F4A3A', C.line, 1.5); ctx.save(); roundRect(ctx, X, Y, Wd, Hd, 16); ctx.clip();
  const rv = (u) => Y + Hd * 0.62 - Math.sin(u * Math.PI) * Hd * 0.16; // de Waal maakt een bocht
  const gv = (u) => rv(u) - Hd * 0.2 * Math.sin(Math.PI * clamp((u - 0.15) / 0.7, 0, 1)); // nevengeul aan de noordkant (Lent)
  // Nijmegen (zuid) en Lent (noord)
  const huis = (hx, hy, s) => { ctx.fillStyle = '#6A6E7A'; ctx.fillRect(hx - 12 * s, hy - 14 * s, 24 * s, 14 * s); ctx.fillStyle = '#9A5A48'; ctx.beginPath(); ctx.moveTo(hx - 15 * s, hy - 14 * s); ctx.lineTo(hx, hy - 26 * s); ctx.lineTo(hx + 15 * s, hy - 14 * s); ctx.closePath(); ctx.fill(); };
  for (let i = 0; i < 22; i++) huis(X + 40 + (i % 11) * (Wd - 80) / 10.5, Y + Hd - 50 - Math.floor(i / 11) * 40 + (i % 3) * 4, 1.2);
  for (let i = 0; i < 10; i++) huis(X + 50 + i * (Wd - 100) / 9.5, Y + 60 + (i % 2) * 6, 1.1);
  const pad = (f, w, col) => { ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50, px = X - 20 + u * (Wd + 40), py = f(u); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
  if (hoog > 0.01) { ctx.save(); ctx.globalAlpha *= hoog * 0.5; pad(rv, 40 + 120 * hoog, '#2E6FBF'); ctx.restore(); }
  pad(rv, 42, '#2E6FBF');
  if (geul > 0.01) { ctx.save(); ctx.globalAlpha *= geul; pad(gv, 22 + 16 * hoog, '#3A86D4');
    if (natuur > 0.01) { ctx.globalAlpha *= natuur; for (let k = 0; k < 14; k++) { const u = 0.22 + 0.56 * k / 14; const px = X - 20 + u * (Wd + 40), py = (rv(u) + gv(u)) / 2 + ((k % 3) - 1) * 6; ctx.fillStyle = k % 4 ? '#5FA86E' : '#7FC48F'; ctx.beginPath(); ctx.arc(px, py, 8 + (k % 2) * 3, 0, 6.283); ctx.fill(); } }
    ctx.restore(); }
  ctx.fillStyle = 'rgba(242,242,238,.6)'; for (let k = 0; k < 14; k++) { const u = ((t * 0.05 + k / 14) % 1), px = X - 20 + u * (Wd + 40), py = rv(u); ctx.fillRect(px - 10, py - 2, 20, 4); if (geul > 0.5 && hoog > 0.3 && u > 0.2 && u < 0.8) ctx.fillRect(px - 8, gv(u) - 2, 16, 4); }
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 9; ctx.lineCap = 'butt'; const bxx = X + Wd * 0.38; ctx.beginPath(); ctx.moveTo(bxx, Y + 60); ctx.lineTo(bxx, Y + Hd - 100); ctx.stroke();
  ctx.restore();
  if (lab > 0.01) { naamBij(ctx, 'Nijmegen', null, X + Wd - 30, Y + Hd - 104, lab, 'right'); naamBij(ctx, 'Lent', null, X + Wd - 30, Y + 84, lab, 'right'); naamBij(ctx, 'Waal', null, X + Wd * 0.12, rv(0.12) + 12, lab, 'center', C.text); }
  ctx.restore(); }

// ---------- insectenval (malaiseval, tentje) ----------
function insectenval(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(242,242,238,.18)'; ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.lineTo(-90, -150); ctx.lineTo(110, -170); ctx.lineTo(120, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(0, 0); ctx.stroke(); ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.moveTo(-90, -150); ctx.lineTo(110, -170); ctx.lineTo(110, -155); ctx.lineTo(-90, -135); ctx.closePath(); ctx.fill();
  roundRect(ctx, 104, -200, 26, 44, 6); shape(ctx, rgba(C.teal, 0.4), '#C9CED6', 1.5);
  ctx.strokeStyle = 'rgba(201,206,214,.35)'; ctx.lineWidth = 1; for (let k = -100; k < 120; k += 18) { ctx.beginPath(); ctx.moveTo(k, -150 - (k + 90) * 0.1); ctx.lineTo(k + (k < 0 ? -12 : 4), 0); ctx.stroke(); }
  ctx.restore(); naamBij(ctx, 'insectenval', null, x, yG + 40, a, 'center', C.text); }

// ---------- grafiek: Living Planet Index (gemiddelde, 1970 = 100 %) ----------
const LPI = [[1970, 1], [1975, 0.93], [1980, 0.86], [1985, 0.78], [1990, 0.69], [1995, 0.6], [2000, 0.52], [2005, 0.45], [2010, 0.37], [2015, 0.31], [2020, 0.27]];

// ---------- de aarde als vier sferen ----------
function sferen(ctx, x, y, r, o = {}) { const { a = 1, atmo = 1, hydro = 1, litho = 1, bio = 1, hl = null, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const A = (k, v) => v * (hl && hl !== k ? 0.3 : 1);
  if (atmo > 0.01) { ctx.save(); ctx.globalAlpha *= A('atmo', atmo); ctx.beginPath(); ctx.arc(x, y, r * 1.3, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); for (let k = 0; k < 5; k++) wolkje(ctx, x + Math.cos(k * 1.26 - 1.2 + t * 0.05) * r * 1.2, y + Math.sin(k * 1.26 - 1.2 + t * 0.05) * r * 1.2, 0.32, 1); ctx.restore(); }
  // lithosfeer: gesteente in doorsnede
  ctx.save(); ctx.globalAlpha *= A('litho', litho); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#7A5A3C'; ctx.fill(); ctx.strokeStyle = '#B08A68'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, r * 0.6, 0, 6.283); ctx.fillStyle = '#A8643C'; ctx.fill(); ctx.beginPath(); ctx.arc(x, y, r * 0.28, 0, 6.283); ctx.fillStyle = '#D89A4C'; ctx.fill(); ctx.restore();
  // hydrosfeer: oceaan als schil aan het oppervlak (linkerkant)
  if (hydro > 0.01) { ctx.save(); ctx.globalAlpha *= A('hydro', hydro); ctx.beginPath(); ctx.arc(x, y, r + 26, Math.PI * 0.55, Math.PI * 1.45); ctx.arc(x, y, r - 4, Math.PI * 1.45, Math.PI * 0.55, true); ctx.closePath(); ctx.fillStyle = '#2E6FBF'; ctx.fill(); ctx.strokeStyle = '#6FA4E0'; ctx.lineWidth = 2; ctx.stroke();
    for (let k = 0; k < 3; k++) { const an = Math.PI * (0.8 + k * 0.2); vis(ctx, x + Math.cos(an) * (r + 11), y + Math.sin(an) * (r + 11), 0.32, {}); } ctx.restore(); }
  // biosfeer: bos op het land (rechterkant)
  if (bio > 0.01) { ctx.save(); ctx.globalAlpha *= A('bio', bio); for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31, bx = x + Math.cos(an) * r, by = y + Math.sin(an) * r; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = '#5A4030'; ctx.fillRect(-3, -14, 6, 14); ctx.fillStyle = '#4F8F5A'; ctx.beginPath(); ctx.ellipse(0, -24, 14, 13, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }

// ---------- planetaire grenzen als rad ----------
// waarden: 0..1 = binnen veilig, >1 = overschreden (schematisch, naar Planetary Health Check 2025)
const GRENZEN = [
  ['biosfeer', 2.2], ['landgebruik', 1.5], ['zoet water', 1.45], ['stikstof en fosfor', 2.1], ['nieuwe stoffen', 2.0],
  ['oceaanverzuring', 1.15], ['klimaat', 1.6], ['ozonlaag', 0.55], ['fijnstof', 0.8]];
function grenzenRad(ctx, x, y, R, o = {}) { const { a = 1, grow = 1, toon = 9, hl = [], labels = 1, schaal = 1, hlA = 1 } = o; const HL = Array.isArray(hl) ? hl : (hl >= 0 ? [hl] : []); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 9, gap = 0.035, rin = R * 0.18;
  // veilige zone
  ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.14); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke();
  GRENZEN.forEach(([nm, v], i) => { if (i >= toon) return; const a0 = -Math.PI / 2 + i / n * 6.283 + gap, a1 = -Math.PI / 2 + (i + 1) / n * 6.283 - gap; const vv = typeof grow === 'number' ? Math.min(v, 0.9) + (v - Math.min(v, 0.9)) * clamp((grow - 0.4) / 0.6, 0, 1) : v; const g0 = Math.min(1, grow / 0.4); const rr = vv <= 1 ? rin + (R - rin) * vv * g0 : R + (R - rin) * 0.5 * (vv - 1); const over = v > 1;
    ctx.save(); ctx.globalAlpha *= (HL.length && !HL.includes(i)) ? 1 - 0.65 * hlA : 1;
    ctx.beginPath(); ctx.arc(x, y, rin, a0, a1); ctx.arc(x, y, Math.max(rin + 2, Math.min(rr, R)), a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.groen, 0.55); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 1.5; ctx.stroke();
    if (rr > R) { ctx.beginPath(); ctx.arc(x, y, R, a0, a1); ctx.arc(x, y, rr, a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.6); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.stroke(); }
    if (labels > 0.01) { const am = (a0 + a1) / 2, lr = Math.max(R, rr) + 40, lx = x + Math.cos(am) * lr, ly = y + Math.sin(am) * lr; ctx.save(); ctx.globalAlpha *= labels; text(ctx, nm, lx, ly + 10, fTekst(30, 600), over && grow > 0.95 ? C.koraal : C.text, Math.cos(am) > 0.25 ? 'left' : Math.cos(am) < -0.25 ? 'right' : 'center'); ctx.restore(); }
    ctx.restore(); });
  ctx.beginPath(); ctx.arc(x, y, rin, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); aarde(ctx, x, y, rin * 0.82, 1);
  ctx.restore(); }

// ---------- ozonlaag boven Antarctica (bovenaanzicht) ----------
function ozonKaart(ctx, x, y, r, gat, a = 1, jaar = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#2E6FBF'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283, rr = r * (0.46 + 0.07 * Math.sin(an * 3) + 0.05 * Math.cos(an * 5)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fillStyle = '#E8EDF2'; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.22); ctx.fill();
  if (gat > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 0.64 * gat, r * 0.56 * gat, 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.45); ctx.fill(); ctx.strokeStyle = C.paars; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]);
    if (gat > 0.35) naamBij(ctx, 'ozongat', null, x, y - r * 0.56 * gat - 14, Math.min(1, (gat - 0.35) * 4), 'center', C.paars); }
  if (jaar) metaText(ctx, jaar, x, y + r + 44, C.grain, 'center', 30);
  ctx.restore(); }
function spuitbus(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -50, 52, 110, 8); shape(ctx, '#9AA3B2', '#C9CED6', 1.5); ctx.beginPath(); ctx.moveTo(-26, -50); ctx.quadraticCurveTo(0, -78, 26, -50); ctx.closePath(); shape(ctx, '#C9CED6', '#E8EDF2', 1.2);
  roundRect(ctx, -9, -86, 18, 14, 3); shape(ctx, '#5A6478', '#9AA3B2', 1); ctx.fillStyle = '#5A6478'; ctx.fillRect(9, -82, 10, 5);
  ctx.fillStyle = 'rgba(232,237,242,.5)'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(30 + k * 9, -80 - (k % 3 - 1) * 8 * (k / 7 + 0.3), 3 + k * 1.1, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#E07A5F'; ctx.fillRect(-26, -10, 52, 26); ctx.restore(); }
function koelkast(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -150, 100, 300, 12); shape(ctx, '#E8EDF2', '#9AA3B2', 2); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-50, -50); ctx.lineTo(50, -50); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(34, -120); ctx.lineTo(34, -80); ctx.moveTo(34, -20); ctx.lineTo(34, 40); ctx.stroke(); ctx.restore(); }

// ---------- regenwoud (Macro) ----------
function regenwoud(ctx, X, yG, Wd, o = {}) { const { a = 1, kap = 0, droog = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14;
  for (let i = 0; i < n; i++) { const bx = X + (i + 0.5) * Wd / n + (hash(i * 7) - 0.5) * 20, h = 170 + hash(i * 3) * 90; const weg = kap > (i / n) * 1.0 && i % 3 !== 0;
    if (weg) { ctx.fillStyle = '#6A4E36'; roundRect(ctx, bx - 10, yG - 24, 20, 24, 3); ctx.fill(); continue; }
    ctx.fillStyle = '#5A4030'; ctx.fillRect(bx - 7, yG - h * 0.55, 14, h * 0.55);
    const kleur = droog > 0.01 ? `rgb(${Math.round(lerp(79, 160, droog))},${Math.round(lerp(143, 130, droog))},${Math.round(lerp(90, 70, droog))})` : '#4F8F5A';
    ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(bx, yG - h * 0.62, 46, 34, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(bx - 26, yG - h * 0.5, 30, 22, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(bx + 28, yG - h * 0.52, 30, 22, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = '#6A5A40'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, yG); ctx.lineTo(X + Wd, yG); ctx.stroke(); ctx.restore(); }
function co2Pijl(ctx, x, y1, y2, a = 1, op = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; pijl(ctx, x, y1, x, y2, op ? C.groen : C.koraal, 1, 6, 20); regel(ctx, 'CO₂', x + 18, (y1 + y2) / 2 + 10, 1, op ? C.groen : C.koraal, 32, 'left', 700); ctx.restore(); }
function lpiGrafiek(ctx, X, Y, Wd, Hd, u = 1, o = {}) { const { a = 1, punt = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  paneel(ctx, X, Y, Wd, Hd, '', 1); const gx = X + 140, gy = Y + 50, gw = Wd - 360, gh = Hd - 150;
  assen(ctx, gx, gy, gw, gh, '', ''); ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1; for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(gx, gy + gh - gh * k / 4); ctx.lineTo(gx + gw, gy + gh - gh * k / 4); ctx.stroke(); }
  [0, 50, 100].forEach(v => metaText(ctx, v + '%', gx - 16, gy + gh - gh * v / 100 + 10, C.text, 'right', 32));
  [1970, 1995, 2020].forEach(j => metaText(ctx, String(j), gx + gw * (j - 1970) / 50, gy + gh + 44, C.text, 'center', 32));
  const P = LPI.map(([j, v]) => [gx + gw * (j - 1970) / 50, gy + gh - gh * v]); const n = Math.max(1, Math.round(u * (P.length - 1)));
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(P[i][0], P[i][1]) : ctx.moveTo(P[i][0], P[i][1]); ctx.stroke();
  if (punt > 0.01) { const [px, py] = P[P.length - 1]; ctx.save(); ctx.globalAlpha *= punt; circ(ctx, px, py, 10, C.koraal); regel(ctx, '−73 %', px + 24, py + 14, 1, C.koraal, 48, 'left', 700); metaText(ctx, 'gemiddeld', px + 26, py + 52, C.koraal, 'left', 28); ctx.restore(); }
  ctx.restore(); }

function maisPlant(ctx, x, yG, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#7FA85A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, yG); ctx.lineTo(x, yG - h); ctx.stroke();
  ctx.fillStyle = '#7FA85A'; for (let k = 0; k < 4; k++) { const yy = yG - h * (0.25 + k * 0.17), d = k % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + d * 70, yy - 30, x + d * 90, yy + 20); ctx.quadraticCurveTo(x + d * 50, yy - 10, x, yy + 8); ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x + 16, yG - h * 0.5, 12, 34, 0.3, 0, 6.283); ctx.fillStyle = '#E8C04A'; ctx.fill(); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#D9B866'; ctx.lineWidth = 2; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(x, yG - h); ctx.lineTo(x + k * 12, yG - h - 40); ctx.stroke(); } ctx.restore(); }
function rijstPluim(ctx, x, yG, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#9AB86A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, yG); ctx.quadraticCurveTo(x + 6, yG - h * 0.6, x + 40, yG - h * 0.85); ctx.stroke();
  ctx.fillStyle = '#D9C27A'; for (let k = 0; k < 12; k++) { const u = k / 12, px = x + 40 + u * 50, py = yG - h * 0.85 + u * u * 120; ctx.beginPath(); ctx.ellipse(px, py, 5, 9, 0.5, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = '#9AB86A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yG - h * 0.3); ctx.quadraticCurveTo(x - 50, yG - h * 0.6, x - 60, yG - h * 0.75); ctx.stroke(); ctx.restore(); }
function heideStruikje(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s); ctx.fillStyle = '#4A5A3A'; ctx.beginPath(); ctx.ellipse(0, -14, 34, 16, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#B07AC8'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(-26 + (k % 7) * 9, -18 - Math.floor(k / 7) * 9 - Math.abs(k % 7 - 3) * -1, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
function gifvat(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -60, 80, 120, 10); shape(ctx, '#C9A35C', '#E0C890', 2); ctx.strokeStyle = '#8C6A4A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -20); ctx.lineTo(40, -20); ctx.moveTo(-40, 24); ctx.lineTo(40, 24); ctx.stroke();
  ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.arc(0, 2, 12, 0, 6.283); ctx.fill(); ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.arc(-4, 0, 3, 0, 6.283); ctx.arc(4, 0, 3, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7FC48F'; ctx.beginPath(); ctx.ellipse(10, 70, 40, 8, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function vlam(ctx, x, yG, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.45, f = Math.sin(t * 9 + x) * 0.08;
  ctx.fillStyle = 'rgba(154,163,178,.35)'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + Math.sin(t + k) * 14, yG - h - 30 - k * 30, 16 + k * 6, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#E07A5F'; ctx.beginPath(); ctx.moveTo(x - w, yG); ctx.bezierCurveTo(x - w * 1.1, yG - h * 0.5, x - w * 0.2, yG - h * 0.6, x + w * f, yG - h); ctx.bezierCurveTo(x + w * 0.4, yG - h * 0.6, x + w * 1.1, yG - h * 0.5, x + w, yG); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.moveTo(x - w * 0.5, yG); ctx.bezierCurveTo(x - w * 0.6, yG - h * 0.3, x, yG - h * 0.4, x, yG - h * 0.6); ctx.bezierCurveTo(x + w * 0.2, yG - h * 0.4, x + w * 0.6, yG - h * 0.3, x + w * 0.5, yG); ctx.closePath(); ctx.fill(); ctx.restore(); }
