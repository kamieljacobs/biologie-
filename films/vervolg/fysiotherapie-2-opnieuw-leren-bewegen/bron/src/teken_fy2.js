// Wat word jij? · Fysiotherapie 2 · Opnieuw leren bewegen — eigen tekeningen (21 okt 2026)
// henkBed en lijfMaat overgenomen uit Hoe weefsel herstelt
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function henkBed(ctx, x, y, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const { kussen = 0, matras = 0, drukH = 0, drukS = 0, donker = 0, draai = 0, uit = 'neutraal', H = 420 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = 420, hipX = x - L + 150; const M = lijfMaat('henk', 0, 0, H);
  // frame
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x - L - 20, y + 60, 2 * L + 40, 18); ctx.fillRect(x - L, y + 78, 14, 100); ctx.fillRect(x + L - 14, y + 78, 14, 100);
  circ(ctx, x - L + 7, y + 186, 14, '#4A5266'); circ(ctx, x + L - 7, y + 186, 14, '#4A5266');
  roundRect(ctx, x - L - 34, y - 210, 22, 300, 8); shape(ctx, '#8A93A6', null); roundRect(ctx, x + L + 12, y - 80, 22, 170, 8); shape(ctx, '#8A93A6', null);
  const mCol = matras > 0.5 ? '#9CCBD6' : '#DDE6EE';
  roundRect(ctx, x - L, y, 2 * L, 60, 14); shape(ctx, mCol, '#B8C8D8', 2);
  // rugleuning omhoog
  ctx.save(); ctx.translate(x - L + 14, y + 40); ctx.rotate(-1.38); roundRect(ctx, 0, -46, 340, 56, 14); shape(ctx, mCol, '#B8C8D8', 2);
  if (matras > 0.01) { ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = 30; xx < 320; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, -40); ctx.lineTo(xx, 4); ctx.stroke(); } } ctx.restore();
  if (matras > 0.01) { ctx.save(); ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = x - L + 40; xx < x + L - 10; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, y + 8 + 3 * Math.sin(t * 2 + xx)); ctx.lineTo(xx, y + 54); ctx.stroke(); } ctx.restore(); }
  // hoofdkussen tegen de leuning
  // Henk tot de heup, licht achterover
  ctx.save(); ctx.beginPath(); ctx.rect(x - L - 200, y - H - 100, 2 * L + 400, H + 100 + 20); ctx.clip(); ctx.translate(hipX, y + 14); ctx.rotate(-0.12 + (draai > 0.01 ? 0.04 * Math.sin(t * 2) : 0));
  roundRect(ctx, -M.hh * 1.25, -M.heupY + M.top - M.hh * 0.25, M.hh * 1.5, (M.schouderY - M.top) + M.hh * 1.1, M.hh * 0.5); shape(ctx, '#F2F2EE', '#C8D2DC', 2);
  persoon(ctx, 'henk', 0, -M.heupY, H, { t, uit, kijk: 1 }); ctx.restore();
  // deken: van de borst over de benen naar de voeten
  const lift = kussen * 36, vx = x + L - 60, borst = y + 14 + M.heupY + (M.schouderY - M.heupY) * 0.32 - M.heupY * 0;
  const by = y + 14 + (M.schouderY + (M.heupY - M.schouderY) * 0.55) - M.heupY; // deken-rand op de borst
  ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6);
  ctx.bezierCurveTo(hipX + M.sw * 0.9, y - 40, hipX + 200, y - 72, hipX + 300, y - 70 - lift * 0.5); ctx.bezierCurveTo(hipX + 420, y - 70 - lift, vx - 80, y - 64 - lift, vx - 24, y - 50 - lift); ctx.lineTo(vx - 24, y + 30); ctx.lineTo(hipX - M.sw * 0.62, y + 30); ctx.closePath();
  shape(ctx, '#7FA6C9', '#5A86AE', 2); ctx.strokeStyle = rgba('#5A86AE', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const xx = hipX + 140 + i * 100; ctx.beginPath(); ctx.moveTo(xx, y - 60 - (i > 1 ? lift * 0.7 : 0)); ctx.quadraticCurveTo(xx + 26, y - 20, xx + 8, y + 20); ctx.stroke(); }
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6); ctx.lineTo(hipX + M.sw * 0.62, by + 26); ctx.quadraticCurveTo(hipX, by + 4, hipX - M.sw * 0.62, by + 30); ctx.closePath(); ctx.fill();
  if (kussen > 0.01) { ctx.save(); ctx.globalAlpha *= kussen; roundRect(ctx, vx - 150, y - 34, 170, 44, 20); shape(ctx, '#E8E2D4', '#C8BEA8', 2); ctx.restore(); }
  // blote voet (zijaanzicht): hiel op de matras of vrij boven het kussen, tenen omhoog
  const fy = y - lift; ctx.save(); ctx.translate(vx, fy); ctx.beginPath(); ctx.moveTo(-26, -54); ctx.lineTo(-4, -54); ctx.bezierCurveTo(20, -62, 40, -92, 52, -106); ctx.quadraticCurveTo(64, -108, 60, -92); ctx.bezierCurveTo(50, -56, 30, -8, 6, 0); ctx.bezierCurveTo(-16, 4, -30, -10, -30, -28); ctx.closePath(); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2); ctx.restore();
  const hiel = { x: vx - 12, y: fy - 4 }, stuit = { x: hipX + 10, y: y + 12 };
  const gloed = (p, f) => { if (f <= 0.01) return; const r = 64; const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, r); const col = donker > 0.5 ? '#5A1E3A' : '#E04A3A'; g.addColorStop(0, rgba(col, 0.95 * f)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); };
  gloed(hiel, drukH); gloed(stuit, drukS);
  ctx.restore(); return { hiel, stuit, hip: { x: hipX, y }, voet: { x: vx, y: fy }, hoofdY: y + 14 - M.heupY + M.top }; }

// ===== grafiek belasting tegen weken (geleidelijk opbouwen) =====

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
const BR = { hersen: '#3A3452', rand: '#8C7BBF', strip: '#E0B64A', schade: '#5A2A2E', zenuw: '#E0B64A', spier: '#B8564E', spierL: '#D27A6E', huid: '#E3B998' };

// ===== hersenen van boven (voorkant boven). o: motor 0..1, schade 0..1, arm (grootte armgebied links, 1 = normaal), nieuw 0..1 (nieuwe verbindingen), route 0..1, t
function breinBoven(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { motor = 0, schade = 0, arm = 1, nieuw = 0, route = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 112, 0, 104, 160, 0, 0, 6.283); shape(ctx, BR.hersen, BR.rand, 2.5); ctx.strokeStyle = rgba(BR.rand, 0.45); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(k * 40, -120 + i * 55); ctx.quadraticCurveTo(k * 120, -100 + i * 55 + 20, k * 190, -120 + i * 55 + 10); ctx.stroke(); } }
  // motorische strook (dwars, iets voor het midden)
  if (motor > 0.01) { ctx.save(); ctx.globalAlpha *= motor; ctx.strokeStyle = rgba(BR.strip, 0.85); ctx.lineWidth = 22; ctx.lineCap = 'round'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 22, -18); ctx.quadraticCurveTo(k * 110, -40, k * 196, -6); ctx.stroke(); } ctx.restore(); }
  // armgebied links (op de strook)
  if (motor > 0.01) { ctx.save(); ctx.globalAlpha *= motor; ctx.beginPath(); ctx.ellipse(-120, -32, 34 * arm, 18 * arm, -0.1, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.85); ctx.fill(); ctx.restore(); }
  if (schade > 0.01) { ctx.save(); ctx.globalAlpha *= schade; ctx.beginPath(); ctx.ellipse(-95, 10, 60, 48, 0.3, 0, 6.283); ctx.fillStyle = rgba('#1A0E12', 0.85); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 7; i++) { const an = i * 0.9 + 0.3, r1 = 70, r2 = 70 + 50 * clamp(nieuw * 1.4 - i * 0.06, 0, 1); ctx.beginPath(); ctx.moveTo(-95 + Math.cos(an) * r1, 10 + Math.sin(an) * r1 * 0.8); ctx.quadraticCurveTo(-95 + Math.cos(an + 0.4) * (r1 + r2) / 2, 10 + Math.sin(an + 0.4) * (r1 + r2) / 2 * 0.8, -95 + Math.cos(an + 0.2) * r2, 10 + Math.sin(an + 0.2) * r2 * 0.8); ctx.stroke(); circ(ctx, -95 + Math.cos(an + 0.2) * r2, 10 + Math.sin(an + 0.2) * r2 * 0.8, 6, C.groen); } ctx.restore(); }
  // baan: van de linker strook naar beneden, kruist in het midden onderaan
  if (route > 0.01) { ctx.save(); ctx.strokeStyle = BR.zenuw; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.setLineDash([2, 0]); const P = [[-120, -30], [-70, 80], [0, 170], [70, 260]]; ctx.beginPath(); ctx.moveTo(...P[0]); const n = 40; for (let i = 1; i <= n * route; i++) { const u = i / n, k = u * 3, j = Math.min(2, Math.floor(k)), f = k - j; ctx.lineTo(P[j][0] + (P[j + 1][0] - P[j][0]) * f, P[j][1] + (P[j + 1][1] - P[j][1]) * f); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ===== arm (schema) met spier; act 0..1 = spier krijgt opdracht (gloed); lam = verlamd (grijs)
function armSchema(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { act = 0, buig = 0.2, heel = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.strokeStyle = BR.huid; ctx.lineWidth = 70; const ex = 260, ey = 0, f = -buig * 1.6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ex, ey); ctx.lineTo(ex + Math.cos(f) * 230, ey + Math.sin(f) * 230); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(130, -18, 110, 34, 0, 0, 6.283); ctx.fillStyle = act > 0.01 ? rgba(BR.spierL, 0.6 + 0.4 * act) : rgba(BR.spier, 0.7); ctx.fill();
  ctx.strokeStyle = BR.zenuw; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 30); ctx.quadraticCurveTo(60, 40, 120, 0); ctx.stroke();
  if (heel > 0.01) vink_(ctx, 130, -110, 24, heel); ctx.restore(); }

// ===== motorische eenheid: neuron + n vezels (getekend m)
function motorEenheid(ctx, x, y, s, m, a = 1, act = 0, col = C.goud, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 26, rgba(col, 0.9), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(140, 0); ctx.stroke();
  const rows = Math.min(m, 12), cols = Math.ceil(m / rows), H2 = rows * 26;
  for (let i = 0; i < m; i++) { const r = i % rows, c = Math.floor(i / rows), fy = -H2 / 2 + r * 26 + 13, fx = 220 + c * 12; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 0); ctx.quadraticCurveTo(180, fy, fx, fy); ctx.stroke();
    const on = act > 0.01 ? 0.5 + 0.5 * Math.sin(t * 10) * act : 0; roundRect(ctx, fx, fy - 9, 260, 18, 9); shape(ctx, on > 0.6 ? BR.spierL : BR.spier, '#8A3A34', 1.5); }
  ctx.restore(); }

// ===== spier met spierspoeltje; rek 0..1, sein = impulsen naar het ruggenmerg
function spierSpoel(ctx, x, y, w, rek, a = 1, t = 0, sein = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = w * (0.8 + 0.25 * rek), h = 150 - 30 * rek;
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(BR.spier, 0.85), '#8A3A34', 2); ctx.strokeStyle = rgba(BR.spierL, 0.6); ctx.lineWidth = 2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.ellipse(x, y + i * 14, L / 2 - 20, 4, 0, 0, 6.283); ctx.stroke(); }
  // spoeltje
  const sl = L * 0.36; ctx.beginPath(); ctx.ellipse(x, y, sl / 2, 22, 0, 0, 6.283); shape(ctx, '#E8D8C0', C.goud, 3); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = x - sl * 0.3 + u * sl * 0.6; ctx.lineTo(px, y + Math.sin(u * 40) * 14); } ctx.stroke();
  // zenuw naar boven
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.quadraticCurveTo(x + 30, y - 160, x + 200, y - 260); ctx.stroke();
  if (sein > 0.01) for (let i = 0; i < 6; i++) { const u = ((t * (0.6 + rek * 1.4) + i / 6) % 1), px = x + 0.5 * (1 - u) * (1 - u) * 0 + 2 * (1 - u) * u * 30 + u * u * 200, py = y - 20 + 2 * (1 - u) * u * -140 + u * u * -240; circ(ctx, px, py, 8, rgba(C.teal, sein)); }
  ctx.restore(); }

function kopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(32, 20); ctx.quadraticCurveTo(0, 30, -32, 20); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA3B2', 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(46, -18, 18, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#6B4A30'; ctx.fillRect(-36, -46, 72, 10); ctx.restore(); }
function want(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, 50); ctx.lineTo(-44, -30); ctx.quadraticCurveTo(-40, -80, 10, -78); ctx.quadraticCurveTo(50, -70, 44, -10); ctx.lineTo(40, 50); ctx.closePath(); shape(ctx, C.paars, '#5A4A8F', 3); ctx.beginPath(); ctx.ellipse(-52, -10, 16, 30, -0.4, 0, 6.283); shape(ctx, C.paars, '#5A4A8F', 3); ctx.fillStyle = '#5A4A8F'; ctx.fillRect(-42, 36, 84, 14); ctx.restore(); }
function sleutel(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); circ(ctx, -40, 0, 22, null, C.goud, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(50, 0); ctx.moveTo(36, 0); ctx.lineTo(36, 16); ctx.moveTo(50, 0); ctx.lineTo(50, 18); ctx.stroke(); ctx.restore(); }
function knoop(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 26 * s, '#C9A35C', '#8A6A3A', 3); for (const [dx, dy] of [[-7, -7], [7, -7], [-7, 7], [7, 7]]) circ(ctx, x + dx * s, y + dy * s, 4 * s, '#6A4A2A'); ctx.restore(); }
function blokjesBak(ctx, x, y, s, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520 * s, 140 * s, 10); shape(ctx, '#6B5440', '#4A3A2E', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 255 * s, y, 10 * s, 140 * s);
  const cols = [C.koraal, C.teal, C.goud, C.groen, C.paars]; for (let i = 0; i < 5; i++) { const moved = u * 5 > i + 0.5; const bx = moved ? x + 300 * s + (i % 3) * 70 * s : x + 30 * s + (i % 3) * 70 * s, by = y + 20 * s + Math.floor(i / 3) * 60 * s; roundRect(ctx, bx, by, 50 * s, 50 * s, 6); shape(ctx, cols[i], '#2A3446', 2); } ctx.restore(); }
function scoreGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'SCORE'); const pts = [0.12, 0.2, 0.3, 0.42, 0.5, 0.58, 0.63, 0.7, 0.74, 0.78]; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); const n = Math.max(1, Math.round(pts.length * u)); for (let i = 0; i < n; i++) { const px = x + 30 + i * (w - 60) / (pts.length - 1), py = y + h - pts[i] * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); for (let i = 0; i < n; i++) circ(ctx, x + 30 + i * (w - 60) / (pts.length - 1), y + h - pts[i] * h, 8, C.groen); ctx.restore(); }
