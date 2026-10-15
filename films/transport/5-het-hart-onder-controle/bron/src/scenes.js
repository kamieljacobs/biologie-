// Transport 5 · Het hart onder controle — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A1E18', shirt: '#4F6A9A', hairStyle: 'short' };
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function paneel(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, C.bgSchema, rand, 1.5); ctx.restore(); }
const komma = (v, d = 1) => v.toFixed(d).replace('.', ',');

// ---------- hartslag: fase uit een (veranderende) hartfrequentie ----------
function slagFase(t, bpmFn) { let ph = 0; const dt = 0.04; for (let s = 0; s < t; s += dt) ph += bpmFn(s) * dt / 60; return ph; }
function bonzendHart(ctx, x, y, r, t, bpm, a = 1) { if (a <= 0.01) return; const per = 60 / bpm, ph = (t % per) / per, k = Math.exp(-ph * 8); const s = r * (1 + 0.16 * k);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + s * 0.9); ctx.bezierCurveTo(x - s * 1.6, y - s * 0.3, x - s * 0.7, y - s * 1.4, x, y - s * 0.45); ctx.bezierCurveTo(x + s * 0.7, y - s * 1.4, x + s * 1.6, y - s * 0.3, x, y + s * 0.9); ctx.closePath(); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 2); ctx.restore(); }
// sinusknoop die bij elke slag een prikkel geeft (u = hartFase-u)
function sinusPuls(ctx, X, Y, S, u, a = 1) { if (a <= 0.01) return; const p = hartPunt(X, Y, S, 'sinus'); const d = ((u - 0.38) % 1 + 1) % 1; const k = Math.exp(-d * 6);
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = TR.signaal; ctx.beginPath(); ctx.arc(p[0], p[1], 13 + 9 * k, 0, 6.283); ctx.fill();
  ctx.strokeStyle = rgba(TR.signaal, 0.7 * (1 - d)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(p[0], p[1], 36 + 260 * S * d, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- trillend hart (kamerfibrilleren) ----------
function trilF(t) { return { u: 0.2, atr: 0.2 + 0.15 * Math.sin(t * 29), ven: 0.13 + 0.09 * Math.sin(t * 41) * Math.sin(t * 17.3), av: 1, sl: 0, naam: 'trillen' }; }
function chaos(ctx, X, Y, S, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = TR.signaal; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; const k = Math.floor(t * 9);
  for (let i = 0; i < 18; i++) { const h1 = hash(i * 7 + k * 13), h2 = hash(i * 11 + k * 3 + 1); const lv = i % 2; const lx = lv ? lerp(70, 215, h1) : lerp(-225, -70, h1), ly = lerp(0, lv ? 215 : 165, h2);
    const an = hash(i + k * 5) * 6.283; ctx.beginPath(); ctx.arc(X + lx * S, Y + ly * S, (12 + 12 * hash(i * 3 + k)) * S, an, an + 2.4); ctx.stroke(); }
  ctx.restore(); }
// alle hartspiercellen tegelijk geprikkeld (schok)
function allesPrikkel(ctx, X, Y, S, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.55; ctx.translate(X, Y); ctx.scale(S, S); ctx.beginPath(); ctx.moveTo(-262, -40); ctx.bezierCurveTo(-268, 70, -240, 170, -150, 225); ctx.bezierCurveTo(-60, 280, 90, 330, 170, 300); ctx.bezierCurveTo(250, 270, 280, 150, 272, -40); ctx.closePath(); ctx.fillStyle = TR.signaal; ctx.fill();
  roundRect(ctx, -240, -188, 182, 150, 46); ctx.fill(); roundRect(ctx, 58, -188, 182, 150, 46); ctx.fill(); ctx.restore(); }
function bliksem(ctx, x, y, s = 1, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(10, -60); ctx.lineTo(-24, 6); ctx.lineTo(0, 6); ctx.lineTo(-12, 60); ctx.lineTo(26, -10); ctx.lineTo(2, -10); ctx.closePath(); shape(ctx, col, lighten(col, 0.4), 2); ctx.restore(); }

// ---------- ECG-strook die meeloopt ----------
const ecgFib = (tt) => 0.3 * Math.sin(tt * 31) + 0.2 * Math.sin(tt * 47 + 1) + 0.14 * Math.sin(tt * 19 + 2) + 0.08 * Math.sin(tt * 71);
function ecgStrip(ctx, x, y, w, h, t, vf, a = 1, titel = 'ECG · model') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.bgSchema, 0.94), C.line, 1.5);
  ctx.strokeStyle = TR.signaal; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); const sp = (w - 40) / 3.5;
  for (let px = 0; px <= w - 40; px += 2) { const tt = t - (w - 40 - px) / sp; const v = vf(tt); const yy = y + h * 0.62 - v * h * 0.42; px ? ctx.lineTo(x + 20 + px, yy) : ctx.moveTo(x + 20 + px, yy); } ctx.stroke();
  metaText(ctx, titel, x + 20, y + 36, C.grain, 'left', 24); ctx.restore(); }

// ---------- maatbeker ----------
function maatbeker(ctx, x, y, w, h, val, max, o = {}) { const { a = 1, ticks = [], unit = '', col = TR.rijk, titel = '', sub = '', hi = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const lv = clamp(val / max, 0, 1); if (lv > 0.01) { roundRect(ctx, x + 5, y + h - h * lv, w - 10, h * lv - 5, 8); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); }
  ctx.strokeStyle = hi ? C.goud : C.line; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - 12, y - 8); ctx.lineTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke();
  for (const v of ticks) { const py = y + h - h * v / max; ctx.strokeStyle = rgba(C.text, 0.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w - 26, py); ctx.lineTo(x + w, py); ctx.stroke(); text(ctx, String(v), x + w + 12, py + 9, fTekst(26), C.text2, 'left'); }
  if (unit) metaText(ctx, unit, x + w + 12, y - 16, C.grain, 'left', 24);
  if (titel) text(ctx, titel, x + w / 2, y + h + 46, fTekst(34, 600), C.text, 'center'); if (sub) text(ctx, sub, x + w / 2, y + h + 88, fTekst(30), C.text2, 'center');
  ctx.restore(); }

// ---------- Macro: sporthal met AED-kastje ----------
function aedKast(ctx, x, y, s = 1, a = 1, hi = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70 * s, y - 85 * s, 140 * s, 170 * s, 14 * s); shape(ctx, '#2F7A4E', hi > 0.01 ? C.goud : '#5FA87A', 2 + 3 * hi);
  const hx = x, hy = y - 18 * s, r = 34 * s; ctx.beginPath(); ctx.moveTo(hx, hy + r * 0.9); ctx.bezierCurveTo(hx - r * 1.6, hy - r * 0.3, hx - r * 0.7, hy - r * 1.4, hx, hy - r * 0.45); ctx.bezierCurveTo(hx + r * 0.7, hy - r * 1.4, hx + r * 1.6, hy - r * 0.3, hx, hy + r * 0.9); ctx.closePath(); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  bliksem(ctx, hx, hy, 0.38 * s, 1, '#2F7A4E'); text(ctx, 'AED', x, y + 62 * s, fTekst(Math.max(26, 34 * s), 700), '#F2F2EE', 'center'); ctx.restore(); }
function sporthal(ctx, t) { ctx.fillStyle = '#25344F'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = rgba('#8FA0B5', 0.18); ctx.lineWidth = 2; for (let x = 0; x < W; x += 160) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 640); ctx.stroke(); }
  ctx.fillStyle = '#2E3F5C'; ctx.fillRect(0, 560, W, 80); // lambrisering
  ctx.fillStyle = '#6B5238'; ctx.fillRect(0, 640, W, H - 640); ctx.strokeStyle = rgba('#E6E1D3', 0.35); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 760); ctx.lineTo(W, 760); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(1640, 760, 260, 70, 0, Math.PI, 0); ctx.stroke();
  // basket
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(1700, 250, 14, 390); roundRect(ctx, 1560, 200, 200, 130, 8); shape(ctx, rgba('#E6E1D3', 0.85), '#8FA0B5', 3);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(1580, 330, 46, 12, 0, 0, 6.283); ctx.stroke();
  ctx.strokeStyle = rgba('#E6E1D3', 0.7); ctx.lineWidth = 2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(1580 + i * 14, 340); ctx.lineTo(1580 + i * 9, 400); ctx.stroke(); }
}
function speler(ctx, t, x0 = 980, a = 1) { if (a <= 0.01) return; const x = x0 + Math.sin(t * 0.6) * 140; const per = 0.62, ph = (t % per) / per; const b = Math.abs(Math.cos(ph * Math.PI));
  const P = person(ctx, x, 880, 430, a, { armR: { a1: 0.55, a2: lerp(0.2, 0.9, 1 - b) }, armL: { a1: 0.25, a2: 0.1 }, shirt: '#C9653F' });
  const bx = P.rHand.x + 14, by = lerp(P.rHand.y + 26, 860, 1 - b); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(bx, by, 26, 0, 6.283); shape(ctx, '#D9822B', '#8C4A14', 2); ctx.strokeStyle = '#8C4A14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 26, by); ctx.lineTo(bx + 26, by); ctx.stroke(); ctx.restore(); }

// ---------- bloedverdeling (stromen per orgaan; breedte = liter per minuut) ----------
const ORG = [['hersenen', 0.75, 0.75, 190], ['hartspier', 0.25, 1.0, 290], ['spieren', 1.0, 16, 450], ['huid', 0.4, 0.6, 610], ['darmen', 1.4, 0.5, 700], ['nieren', 1.1, 0.5, 790]];
function orgWaarden(k, huid = 0) { return ORG.map(([n, r, s]) => n === 'huid' ? lerp(lerp(r, s, k), 1.6, huid) : lerp(r, s, k)); }
function verdeling(ctx, X, Y, t, o = {}) { const { a = 1, k = 0, huid = 0, hi = {}, vraag = 0, waarden = 1, ghost = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sc = 12.5, x0 = X + 90, x1 = X + 700; const vals = orgWaarden(k, huid); const tot = vals.reduce((p, v) => p + v, 0);
  let acc = Y - tot * sc / 2;
  vals.forEach((v, i) => { const w = v * sc, a0 = acc, a1 = acc + w; acc += w; const yc = ORG[i][3], b0 = yc - w / 2, b1 = yc + w / 2, xm = (x0 + x1) / 2;
    ctx.beginPath(); ctx.moveTo(x0, a0); ctx.bezierCurveTo(xm, a0, xm, b0, x1, b0); ctx.lineTo(x1, b1); ctx.bezierCurveTo(xm, b1, xm, a1, x0, a1); ctx.closePath(); shape(ctx, rgba(TR.rijk, 0.55), (hi[ORG[i][0]] || 0) > 0.5 ? C.goud : rgba(TR.rijkL, 0.7), (hi[ORG[i][0]] || 0) > 0.5 ? 3 : 1);
    const pts = []; for (let j = 0; j <= 12; j++) { const u = j / 12, ym = (a0 + a1) / 2, yb = yc; const xx = (1 - u) ** 3 * x0 + 3 * (1 - u) ** 2 * u * xm + 3 * (1 - u) * u * u * xm + u ** 3 * x1, yy = (1 - u) ** 3 * ym + 3 * (1 - u) ** 2 * u * ym + 3 * (1 - u) * u * u * yb + u ** 3 * yb; pts.push([xx, yy]); }
    particleFlow(ctx, pts, Math.max(1, Math.round(v * 2.2)), t, 220, TR.rijkL, 5, i * 17, 0.9);
    const h1 = hi[ORG[i][0]] || 0; roundRect(ctx, x1 + 14, yc - 30, 230, 60, 14); shape(ctx, rgba(C.bgSchema, 0.95), h1 > 0.5 ? C.goud : C.line, h1 > 0.5 ? 3 : 1.5);
    text(ctx, ORG[i][0], x1 + 34, yc + 12, fTekst(32, 600), C.text, 'left');
    if (waarden > 0.01) { ctx.save(); ctx.globalAlpha *= waarden * (1 - vraag); const s = v >= 9.5 ? String(Math.round(v)) : komma(v, v < 1 ? 2 : 1); text(ctx, s + ' L/min', x1 + 262, yc + 12, fTekst(30, 600), h1 > 0.5 ? C.goud : C.text2, 'left'); ctx.restore(); }
    if (vraag > 0.01) vraagteken(ctx, x1 + 290, yc + 22, vraag, 56);
    if (ghost > 0.01) { const rv = ORG[i][1] * sc; ctx.save(); ctx.globalAlpha *= ghost; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.text, 0.6); ctx.lineWidth = 2; ctx.strokeRect(x1 - 18, yc - rv / 2, 12, rv); ctx.restore(); }
  });
  bonzendHart(ctx, X + 20, Y, 52, t, 70 + 80 * k, 1); text(ctx, 'hart', X + 20, Y + 100, fTekst(32, 600), C.text, 'center');
  text(ctx, (tot >= 9.5 ? Math.round(tot) : komma(tot, 0)) + ' L/min', X + 20, Math.min(Y - 84, Y - tot * sc / 2 - 24), fTekst(34, 700), C.goud, 'center');
  ctx.restore(); }

// ---------- kleine slagader in lengtedoorsnede met een ring van glad spierweefsel ----------
// n: -1 = wijd (vaatverwijding), 0 = normaal, 1 = nauw (vaatvernauwing)
function vatLang(ctx, x0, x1, yc, R, n, t, o = {}) { const { a = 1, seed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = x1 - x0, rMid = R * (1 - 0.45 * n), wt = 26 + 14 * n; const bump = (x) => { const u = (x - x0) / L; return u < 0.12 || u > 0.88 ? 0 : Math.sin((u - 0.12) / 0.76 * Math.PI); };
  const rx = (x) => lerp(R, rMid, bump(x)), wx = (x) => lerp(26, wt, bump(x));
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let x = x0; x <= x1; x += 8) { const y = yc + sd * rx(x); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } for (let x = x1; x >= x0; x -= 8) ctx.lineTo(x, yc + sd * (rx(x) + wx(x))); ctx.closePath(); shape(ctx, TR.spier, TR.spierR, 1.5);
    ctx.strokeStyle = rgba(TR.spierR, 0.8); ctx.lineWidth = 2; for (let x = x0 + 12; x < x1; x += 20) { const r = rx(x), w = wx(x); ctx.beginPath(); ctx.moveTo(x, yc + sd * (r + 3)); ctx.lineTo(x, yc + sd * (r + w - 3)); ctx.stroke(); }
    ctx.strokeStyle = C.grain; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 8) { const y = yc + sd * (rx(x) + wx(x) + 2); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
  ctx.beginPath(); for (let x = x0; x <= x1; x += 8) ctx.lineTo(x, yc - rx(x)); for (let x = x1; x >= x0; x -= 8) ctx.lineTo(x, yc + rx(x)); ctx.closePath(); ctx.fillStyle = rgba(TR.rijk, 0.3); ctx.fill();
  const f = (rMid / R) ** 2, N = Math.round(10 + 22 * f), sp = 90 + 160 * f; ctx.fillStyle = TR.rijkL;
  for (let k = 0; k < N; k++) { const x = x0 + ((t * sp + hash(k + seed) * L) % L), off = (hash(k * 3 + 1 + seed) * 2 - 1) * 0.78; ctx.beginPath(); ctx.ellipse(x, yc + off * rx(x), 11, 6, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); return { rMid, wt }; }

// ---------- slagader met groeiende plaque, scheur en stolsel ----------
function plaqueVat(ctx, x0, x1, yc, R, t, o = {}) { const { a = 1, g = 0, ont = 0, scheur = 0, stol = 0, labels = {} } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const xm = (x0 + x1) / 2, hw = 260; const bump = (x) => Math.abs(x - xm) > hw ? 0 : 0.5 + 0.5 * Math.cos((x - xm) / hw * Math.PI); const hp = g * R * 1.25;
  const bot = (x) => yc + R - hp * bump(x), top = (x) => yc - R;
  // wand
  ctx.fillStyle = TR.spier; ctx.fillRect(x0, yc - R - 44, x1 - x0, 44); ctx.fillRect(x0, yc + R, x1 - x0, 44); ctx.strokeStyle = TR.spierR; ctx.lineWidth = 2; ctx.strokeRect(x0, yc - R - 44, x1 - x0, 44); ctx.strokeRect(x0, yc + R, x1 - x0, 44);
  ctx.fillStyle = C.grain; ctx.fillRect(x0, yc - R - 52, x1 - x0, 8); ctx.fillRect(x0, yc + R + 44, x1 - x0, 8);
  // lumen
  ctx.beginPath(); ctx.moveTo(x0, top(x0)); ctx.lineTo(x1, top(x1)); for (let x = x1; x >= x0; x -= 6) ctx.lineTo(x, bot(x)); ctx.closePath(); ctx.fillStyle = rgba(TR.rijk, 0.3); ctx.fill();
  // plaque
  if (g > 0.01) { ctx.beginPath(); ctx.moveTo(xm - hw, yc + R); for (let x = xm - hw; x <= xm + hw; x += 6) ctx.lineTo(x, bot(x)); ctx.lineTo(xm + hw, yc + R + 30); ctx.lineTo(xm - hw, yc + R + 30); ctx.closePath(); shape(ctx, rgba(C.oker, 0.9), lighten(C.oker, 0.35), 2);
    ctx.fillStyle = lighten(C.oker, 0.55); for (let i = 0; i < 26; i++) { const x = xm - hw * 0.8 + hash(i * 5) * hw * 1.6; const yy = lerp(bot(x) + 12, yc + R + 20, hash(i * 5 + 2)); if (yy > bot(x) + 8 && bump(x) > 0.15 && hash(i * 9) < g) { ctx.save(); ctx.translate(x, yy); ctx.rotate(hash(i) * 3); ctx.fillRect(-7, -2.5, 14, 5); ctx.restore(); } }
    for (let i = 0; i < 9; i++) { if (ont <= 0.01) break; const x = xm - hw * 0.6 + hash(i * 13 + 3) * hw * 1.2; const yy = lerp(bot(x) + 18, yc + R + 10, hash(i * 13 + 4)); if (bump(x) < 0.25 || yy < bot(x) + 14) continue; ctx.save(); ctx.globalAlpha *= ont; ctx.beginPath(); ctx.arc(x, yy, 13, 0, 6.283); shape(ctx, rgba(C.text2, 0.85), C.text, 1.5); ctx.fillStyle = rgba(C.bgSchema, 0.7); ctx.beginPath(); ctx.arc(x + 2, yy, 5, 0, 6.283); ctx.fill(); ctx.restore(); }
    ctx.strokeStyle = rgba('#E6E1D3', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let x = xm - hw; x <= xm + hw; x += 6) x === xm - hw ? ctx.moveTo(x, bot(x)) : ctx.lineTo(x, bot(x)); ctx.stroke(); }
  if (scheur > 0.01) { ctx.save(); ctx.globalAlpha *= scheur; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); const cx = xm - 40, cy = bot(xm - 40); ctx.moveTo(cx - 30, cy + 2); ctx.lineTo(cx - 12, cy + 22); ctx.lineTo(cx + 4, cy + 4); ctx.lineTo(cx + 22, cy + 28); ctx.lineTo(cx + 38, cy + 6); ctx.stroke(); ctx.restore(); }
  if (stol > 0.01) { const cx = xm - 30, cy0 = bot(xm - 30), hh = (cy0 - top(cx)) * clamp(stol, 0, 1); ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy0 - hh / 2 + 4, 70 + 50 * stol, hh / 2 + 6, 0, 0, 6.283); ctx.save(); ctx.clip(); ctx.fillStyle = TR.arm; ctx.fillRect(cx - 140, cy0 - hh - 10, 280, hh + 20);
    ctx.strokeStyle = rgba('#E6E1D3', 0.55); ctx.lineWidth = 1.5; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(cx - 130 + hash(i) * 260, cy0 - hh); ctx.lineTo(cx - 130 + hash(i + 40) * 260, cy0); ctx.stroke(); } ctx.restore(); ctx.strokeStyle = lighten(TR.arm, 0.3); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  // bloedstroom: stopt achter een afgesloten vat
  const L = x1 - x0, flow = 1 - clamp(stol * 1.1, 0, 1) * 0.97, nar = 1 - 0.6 * g; ctx.fillStyle = TR.rijkL;
  for (let k = 0; k < 26; k++) { let x = x0 + ((t * 170 * flow * nar + hash(k) * L) % L); if (stol > 0.9 && x > xm - 120) x = x0 + (x - x0) * 0.4; const r = (bot(x) - top(x)) / 2, yy = (bot(x) + top(x)) / 2 + (hash(k * 3 + 1) * 2 - 1) * r * 0.75; if (r < 8) continue; ctx.beginPath(); ctx.ellipse(x, yy, 12, 6, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); return { xm, bot }; }

// ---------- hart met afgesloten kransslagader en afstervend stuk hartspier ----------
function infarct(ctx, X, Y, S, blok = 0, grijs = 0) { ctx.save(); ctx.translate(X, Y); ctx.scale(S, S);
  if (grijs > 0.01) { ctx.save(); ctx.globalAlpha *= grijs; ctx.beginPath(); ctx.ellipse(175, 185, 70 * (0.5 + 0.5 * grijs), 95 * (0.5 + 0.5 * grijs), -0.5, 0, 6.283); ctx.fillStyle = rgba('#8A8F98', 0.9); ctx.fill(); ctx.restore(); }
  if (blok > 0.01) { ctx.save(); ctx.globalAlpha *= blok; ctx.strokeStyle = '#6A6F78'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(135, 45); ctx.bezierCurveTo(112, 120, 122, 200, 160, 280); ctx.stroke();
    ctx.beginPath(); ctx.arc(140, 30, 15, 0, 6.283); shape(ctx, TR.arm, C.goud, 3); ctx.restore(); }
  ctx.restore(); }

// ---------- liggende persoon, hulpverlener, AED ----------
function liggend(ctx, xVoet, yLijn, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(xVoet, yLijn); ctx.rotate(-Math.PI / 2); person(ctx, 0, 0, h, 1, { armR: { a1: 0.25, a2: 0.1 }, armL: { a1: 0.25, a2: 0.1 }, shirt: '#C9653F' }); ctx.restore(); return { borstX: xVoet - 0.7 * h, y: yLijn }; }
function helper(ctx, x, yHand, druk, a = 1, los = 0) { if (a <= 0.01) return; const h = 440, top = yHand - 277 + 14 * druk - 50 * los; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, W, 770); ctx.clip();
  const arm = los > 0.5 ? { a1: 2.5, a2: 2.9 } : { a1: -0.29, a2: -0.29 }; person(ctx, x - 60 * los, top + h, h, 1, { armR: arm, armL: arm, shirt: '#3E7A6A', hair: '#6B4A2E', hairStyle: 'bun', skin: SKINS[0] }); ctx.restore(); }
function vloer(ctx) { ctx.fillStyle = '#22314C'; ctx.fillRect(0, 862, W, H - 862); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 862); ctx.lineTo(W, 862); ctx.stroke(); }
function aedApparaat(ctx, x, y, a = 1, o = {}) { const { scherm = '', pads = null, flits = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (pads) { ctx.strokeStyle = '#C9C2B0'; ctx.lineWidth = 3; for (const p of pads) { ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.quadraticCurveTo((x + p[0]) / 2, Math.min(y, p[1]) - 60, p[0], p[1]); ctx.stroke(); roundRect(ctx, p[0] - 22, p[1] - 14, 44, 28, 6); shape(ctx, '#E6E1D3', flits > 0.3 ? C.goud : '#9AA3B2', 2); } }
  roundRect(ctx, x - 90, y - 60, 180, 120, 16); shape(ctx, '#2F7A4E', flits > 0.3 ? C.goud : '#5FA87A', 3); roundRect(ctx, x - 70, y - 44, 140, 50, 8); shape(ctx, '#141E30', '#5B6B88', 1.5);
  if (scherm) text(ctx, scherm, x, y - 10, fTekst(26, 700), C.text, 'center'); bliksem(ctx, x, y + 34, 0.32, 1, '#F2F2EE'); ctx.restore(); }

// ---------- titel ----------
const SCENES = {
  title(ctx, t) { const X = 1580, Y = 600, S = 0.6; const u = t * 70 / 60; hart(ctx, X, Y, S, { f: hartFase(u), stroom: 1, t, krans: 0.8 }); sinusPuls(ctx, X, Y, S, u, 0.9); hartMeter(ctx, 1400, 110, 70, t, 1, 420); },

  // ===== Cold open =====
  s01(ctx, t, q) { sporthal(ctx, t); speler(ctx, t, 980, 1 - 0.7 * q.on('hartstilstand', 1));
    const hk = q.on('kastje', 1); aedKast(ctx, 300, 400, 1.15, 1, hk * (1 - q.on('hartstilstand', 1)));
    tag(ctx, 'AED: automatische externe defibrillator', 520, 210, C.goud, q.on('AED', 1) * (1 - q.on('hartstilstand', 1)), 'left');
    const p = q.on('hartstilstand', 1); if (p > 0.01) { paneel(ctx, 960, 110, 900, 760, p); ctx.save(); ctx.globalAlpha *= p; const X = 1250, Y = 520, S = 0.62;
      const tr = q.on('trilt', 1); const f = tr > 0.5 ? trilF(t) : hartFase(t * 1.2); hart(ctx, X, Y, S, { f, stroom: 1 - tr, t, peesdraden: 0.3 });
      chaos(ctx, X, Y, S, t, q.on('spiercellen', 1)); metaText(ctx, 'schematisch', 1830, 150, C.grain, 'right', 24);
      tag(ctx, 'pompt niet, maar trilt', 1410, 820, C.koraal, tr * (1 - q.on('spiercellen', 1)));
      tag(ctx, 'alle cellen door elkaar', 1410, 820, TR.signaal, q.on('spiercellen', 1) * (1 - q.on('stroomstoot', 1)));
      const st = q.on('stroomstoot', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; for (const [px, py] of [[1060, 330], [1460, 720]]) { roundRect(ctx, px - 30, py - 20, 60, 40, 8); shape(ctx, '#E6E1D3', '#9AA3B2', 2); } ctx.restore();
        const fl = Math.sin(t * 9) > 0.6 ? 1 : 0.35; bliksem(ctx, 1260, 520, 1.6, st * fl); tag(ctx, 'stroomstoot door het hart', 1410, 820, C.goud, st); }
      ctx.restore(); }
    vraagteken(ctx, 1700, 330, q.on('helpen', 1), 150);
  },

  // ===== H1 Harder pompen =====
  s04(ctx, t, q) { bg(ctx, 'schema'); const X = 470, Y = 540, S = 0.62; const u = t * 70 / 60, f = hartFase(u);
    hart(ctx, X, Y, S, { f, stroom: 1, t, peesdraden: 0.3 }); hartMeter(ctx, 260, 110, 70, t, q.on('zeventig', 1), 420);
    // per slag: kleine beker vult zich bij elke kamersystole
    const sv = q.on('milliliter', 1); const ej = f.u >= 0.63 && f.u < 0.9 ? (f.u - 0.63) / 0.25 : f.u >= 0.9 ? 1 : 0;
    maatbeker(ctx, 960, 330, 130, 300, 70 * ej, 100, { a: q.on('slag', 1) * (1 - 0.5 * q.on('hartminuutvolume', 1)), ticks: [50, 100], unit: 'ml', titel: 'per slag', sub: '≈ 70 ml', hi: sv > 0.5 && q.on('hartminuutvolume', 1) < 0.5 });
    const sm = q.on('Samen', 1); const fill = clamp((t - q.at('Samen')) / 2.5, 0, 1) * 5;
    maatbeker(ctx, 1370, 160, 160, 470, fill, 25, { a: sm, ticks: [5, 10, 15, 20, 25], unit: 'liter', titel: 'per minuut', sub: '≈ 5 liter', col: TR.rijk });
    tag(ctx, 'al je bloed, één keer rond', 1340, 830, C.goud, q.on('bloed', 1) * (1 - q.on('hartminuutvolume', 1)));
    const hm = q.on('hartminuutvolume', 1); if (hm > 0.01) { paneel(ctx, 820, 760, 1040, 120, hm, C.goud); ctx.save(); ctx.globalAlpha *= hm;
      text(ctx, 'hartminuutvolume', 850, 832, fTekst(36, 700), C.goud, 'left'); regel(ctx, '= hartfrequentie', 1170, 832, q.on('hartfrequentie', 1), C.text, 36); regel(ctx, '× slagvolume', 1450, 832, q.on('slagvolume', 1), C.text, 36);
      ctx.restore(); }
  },

  s05(ctx, t, q) { bg(ctx, 'schema');
    maatbeker(ctx, 420, 240, 160, 500, 5, 25, { ticks: [5, 10, 15, 20, 25], unit: 'liter', titel: 'in rust', sub: '≈ 5 L per minuut' });
    const sp = q.on('sprint', 1), g = ramp(t, q.at('vier'), 1.6);
    maatbeker(ctx, 1000, 240, 160, 500, 5 + 17 * g, 25, { a: sp, ticks: [5, 10, 15, 20, 25], unit: 'liter', titel: 'bij een sprint', sub: g > 0.9 ? '20–25 L per minuut' : '', hi: g > 0.9 });
    if (sp > 0.01) { const sw = Math.sin(t * 9); person(ctx, 1500, 860 - 8 * Math.abs(sw), 400, sp, { armR: { a1: 0.35 + 0.45 * sw, a2: 1.6 }, armL: { a1: 0.35 - 0.45 * sw, a2: 1.6 }, shirt: '#C9653F', open: true }); }
    tag(ctx, '4 à 5 × zo veel', 1080, 170, C.goud, q.on('vier', 1));
    vraagteken(ctx, 1500, 330, q.on('Hoe', 1), 150);
  },

  s07(ctx, t, q) { bg(ctx, 'schema');
    const tB = q.at('krachtiger') - 0.6, tC = q.at('stroomt') - 0.3; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6) * (1 - ramp(t, tC, 0.6)), pC = ramp(t, tC, 0.6);
    const bpmF = (s) => lerp(70, 190, ramp(s, q.at('honderdnegentig', 1), 2.5));
    const u = slagFase(t, (s) => lerp(70, 150, ramp(s, q.at('honderdnegentig', 1), 2.5)));
    tag(ctx, 'antwoord b: sneller én meer per slag', 960, 140, C.goud, q.on('Antwoord', 1) * (1 - q.on('hartfrequentie', 1)));
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 520, Y = 560, S = 0.66; hart(ctx, X, Y, S, { f: hartFase(u), stroom: 1, t: t * 1.6, peesdraden: 0.3 }); hartMeter(ctx, 300, 110, bpmF(t), t, q.on('hartfrequentie', 1), 420);
      const rk = q.on('Reken', 1); paneel(ctx, 1040, 240, 820, 470, rk);
      ctx.save(); ctx.globalAlpha *= rk; regel(ctx, 'hartfrequentie', 1080, 310, 1, C.text2, 30); regel(ctx, '70  →  190 per minuut', 1080, 370, q.on('zeventig', 1), C.text, 40, 'left', 700);
        regel(ctx, '190 : 70 ≈ 2,7  →  nog geen 3 ×', 1080, 440, q.on('drie', 1), C.goud, 38, 'left', 700);
        regel(ctx, 'nodig: 4 × zo veel bloed', 1080, 540, q.on('vier', 1), C.text, 38); regel(ctx, 'dus: ook meer per slag', 1080, 610, q.on('slag', 2), C.goud, 38, 'left', 700); ctx.restore();
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const X = 520, Y = 520, S = 0.66; hart(ctx, X, Y, S, { f: hartFase(u), stroom: 1, t: t * 1.6, peesdraden: 0.3 });
      tag(ctx, 'krachtiger samentrekken', 520, 140, C.goud, q.on('krachtiger', 1) * (1 - q.on('spieren', 1)));
      const rt = q.on('spieren', 1); if (rt > 0.01) { const vp = [[120, 880], [120, Y + 240 * S], [X - 300 * S, Y + 240 * S], [X - 300 * S, Y + 190 * S]]; ctx.save(); ctx.globalAlpha *= rt; ctx.strokeStyle = TR.arm; ctx.lineWidth = 22; ctx.lineJoin = 'round'; ctx.beginPath(); vp.forEach((pp, i) => i ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1])); ctx.stroke(); ctx.restore(); particleFlow(ctx, vp, 12, t, 260, TR.armL, 7, 5, rt); metaText(ctx, 'uit je benen', 140, 860, C.grain, 'left', 24); tag(ctx, 'werkende spieren duwen bloed terug', 520, 140, TR.armL, rt * (1 - q.on('vullen', 1))); }
      tag(ctx, 'kamers vullen zich beter', 520, 140, C.goud, q.on('vullen', 1));
      const sv = lerp(70, 115, ramp(t, q.at('krachtiger'), 4)); const ej = (() => { const ff = hartFase(u); return ff.u >= 0.63 && ff.u < 0.9 ? (ff.u - 0.63) / 0.25 : ff.u >= 0.9 ? 1 : 0; })();
      maatbeker(ctx, 1000, 330, 130, 330, sv * ej, 140, { ticks: [70, 140], unit: 'ml', titel: 'per slag', sub: '≈ ' + Math.round(sv / 5) * 5 + ' ml' });
      const tw = q.on('twintig', 1); maatbeker(ctx, 1460, 180, 160, 480, 5 + 16 * ramp(t, q.at('twintig'), 1.4), 25, { ticks: [5, 10, 15, 20, 25], unit: 'liter', titel: 'per minuut', sub: tw > 0.5 ? '190 × 110 ml ≈ 20 L' : '', hi: tw > 0.5 });
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; const per = 60 / 150, ph = (t % per) / per, puls = Math.exp(-ph * 6) * ramp(t, q.at('slagaders'), 0.6);
      const rk = 1 + 0.12 * puls * q.on('rekken', 1) + 0.18 * puls * (1 - q.on('rekken', 1));
      const yc = 450, R = 110 * rk; ctx.fillStyle = TR.spier; ctx.fillRect(140, yc - R - 40, 1000, 40); ctx.fillRect(140, yc + R, 1000, 40); ctx.strokeStyle = C.grain; ctx.lineWidth = 3; ctx.strokeRect(140, yc - R - 40, 1000, 40); ctx.strokeRect(140, yc + R, 1000, 40);
      ctx.fillStyle = rgba(TR.rijk, 0.3); ctx.fillRect(140, yc - R, 1000, 2 * R); particleFlow(ctx, [[140, yc - 40], [1140, yc - 40]], 9, t, 380, TR.rijkL, 9, 3, 1); particleFlow(ctx, [[140, yc + 40], [1140, yc + 40]], 9, t, 380, TR.rijkL, 9, 9, 1);
      label(ctx, 'slagader', 'WAND REKT MAAR EEN BEETJE MEE', 640, yc - R - 40, 700, 180, q.on('rekken', 1), C.text, 'left');
      const bd = lerp(0.45, 0.85, ramp(t, q.at('stijgt'), 1.2)); roundRect(ctx, 1460, 200, 110, 520, 18); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); const hh = 500 * bd; roundRect(ctx, 1470, 710 - hh, 90, hh, 12); ctx.fillStyle = rgba(TR.rijk, 0.85); ctx.fill();
      text(ctx, 'bloeddruk', 1515, 780, fTekst(34, 600), C.text, 'center'); tag(ctx, 'meer bloed per slag de slagaders in', 640, 800, C.goud, q.on('slagaders', 1) * (1 - q.on('stijgt', 1)));
      tag(ctx, 'dus: bloeddruk stijgt', 640, 800, C.goud, q.on('stijgt', 1)); ctx.restore(); }
  },

  s08(ctx, t, q) { bg(ctx, 'schema'); const X = 520, Y = 620, S = 0.72;
    const tO = q.at('orthosympathische'), tP = q.at('parasympathische'), tA = q.at('adrenaline');
    const bpmF = (s) => { let b = 70; b = lerp(b, 120, ramp(s, tO, 1.5)); b = lerp(b, 60, ramp(s, tP, 1.5)); b = lerp(b, 70, ramp(s, q.at('spanning', 1), 1)); b = lerp(b, 130, ramp(s, tA + 0.6, 2)); return b; };
    const u = slagFase(t, bpmF); hart(ctx, X, Y, S, { f: hartFase(u), peesdraden: 0.3 });
    const sn = q.on('sinusknoop', 1); sinusPuls(ctx, X, Y, S, u, Math.max(sn, q.on('gangmaker', 1) * 0.7));
    const p = hartPunt(X, Y, S, 'sinus'); naamBij(ctx, 'sinusknoop', 'EIGEN GANGMAKER · PACEMAKER', p[0] - 40, p[1] - 165, sn * (1 - 0.6 * q.on('hersenen', 2)), 'center', TR.signaal);
    tag(ctx, 'in de wand van de rechterboezem', 560, 140, C.text2, q.on('rechterboezem', 1) * (1 - q.on('startsein', 1)));
    tag(ctx, 'uit zichzelf: startsein voor elke slag', 560, 140, TR.signaal, q.on('startsein', 1) * (1 - q.on('zonder', 1)));
    tag(ctx, 'klopt ook zonder je hersenen', 560, 140, C.goud, q.on('zonder', 1) * (1 - q.on('hersenen', 2)));
    hartMeter(ctx, 1420, 110, bpmF(t), t, q.on('tempo', 2), 420);
    // hersenen en het autonome zenuwstelsel: twee zenuwbanen naar de sinusknoop
    const hz = q.on('hersenen', 2); if (hz > 0.01) { ctx.save(); ctx.globalAlpha *= hz; roundRect(ctx, 1220, 330, 400, 120, 20); shape(ctx, C.bgSchema, C.line, 2); text(ctx, 'hersenen', 1420, 384, fTekst(36, 600), C.text, 'center'); metaText(ctx, 'autonoom zenuwstelsel', 1420, 424, C.grain, 'center', 22); ctx.restore(); }
    const zen = (al, pts, sign, lab, sub, col, aOn, dyT) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); gladC(pts).forEach((pp, i) => i ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1])); ctx.stroke();
      if (aOn > 0.01) for (const o of [0, 0.5]) { const k = (t * 0.8 + o) % 1; const pp = padPunt(pts, k); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pp[0], pp[1], 10, 0, 6.283); ctx.fill(); }
      const m = padPunt(pts, 0.3); ctx.beginPath(); ctx.arc(m[0], m[1], 30, 0, 6.283); shape(ctx, C.bgSchema, col, 3); text(ctx, sign, m[0], m[1] + 14, fTekst(44, 700), C.text, 'center');
      text(ctx, lab, m[0], m[1] + dyT, fTekst(34, 700), C.text, 'center'); text(ctx, sub, m[0], m[1] + dyT + 40, fTekst(30), C.text2, 'center'); ctx.restore(); };
    zen(q.on('orthosympathische', 1) * (1 - 0.5 * q.on('spanning', 1)), [[1220, 360], [1000, 250], [600, 240], [p[0] + 30, p[1] - 70], [p[0] + 6, p[1] - 14]], '+', 'orthosympathisch', 'sneller en krachtiger', TR.signaal, q.on('orthosympathische', 1) * (1 - q.on('parasympathische', 1)), -96);
    zen(q.on('parasympathische', 1) * (1 - 0.5 * q.on('spanning', 1)), [[1220, 420], [1040, 520], [800, 430], [p[0] + 120, p[1] - 30], [p[0] + 14, p[1] + 2]], '−', 'parasympathisch', 'rustiger', C.line, q.on('parasympathische', 1) * (1 - q.on('spanning', 1)), 76);
    const ad = q.on('bijnieren', 1); if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; nierVorm(ctx, 1240, 780, 0.9, 1, 1); ctx.beginPath(); ctx.ellipse(1242, 730, 26, 14, 0, 0, 6.283); shape(ctx, rgba(HK.klier, 0.85), HK.klierR, 1.5); text(ctx, 'bijnier', 1300, 740, fTekst(32, 600), C.text, 'left');
      const pts = [[1215, 735], [1000, 760], [X + 120, Y + 200 * S]]; bloedNet(ctx, pts, 1, TR.rijk); const ha = q.on('adrenaline', 1); for (let i = 0; i < 7; i++) { const k = ((t * 0.35 + i / 7) % 1); const pp = padPunt(pts, k); hormoonVorm(ctx, pp[0], pp[1], 11, 'adrenaline', ha); }
      tag(ctx, 'adrenaline: sneller en krachtiger', 1500, 860, C.goud, ha * (1 - q.on('Stress', 1))); tag(ctx, 'meer in de film Stress', 1500, 860, C.text2, q.on('Stress', 1)); ctx.restore(); }
  },

  s09(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('harttransplantatie') - 0.4, tC = q.at('startsein') - 0.4; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6) * (1 - ramp(t, tC, 0.6)), pC = ramp(t, tC, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 620, Y = 580, S = 0.72; const zon = q.on('Zonder', 1);
      const bpmF = (s) => lerp(70, 100, ramp(s, q.at('Zonder') + 0.5, 2)); const u = slagFase(t, bpmF); hart(ctx, X, Y, S, { f: hartFase(u), peesdraden: 0.3 }); sinusPuls(ctx, X, Y, S, u, 1);
      const p = hartPunt(X, Y, S, 'sinus'); const pts = [[260, 120], [300, 300], [p[0] - 20, p[1] - 30]]; const nv = q.on('nervus', 1);
      ctx.save(); ctx.globalAlpha *= nv * (1 - 0.75 * zon); ctx.strokeStyle = C.line; ctx.lineWidth = 6; if (zon > 0.5) ctx.setLineDash([12, 12]); ctx.beginPath(); gladC(pts).forEach((pp, i) => i ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1])); ctx.stroke(); ctx.setLineDash([]);
        const m = padPunt(pts, 0.5); ctx.beginPath(); ctx.arc(m[0], m[1], 30, 0, 6.283); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 3); text(ctx, '−', m[0], m[1] + 14, fTekst(44, 700), C.text, 'center'); ctx.restore();
      label(ctx, 'nervus vagus', 'PARASYMPATHISCH · REMT DE SINUSKNOOP', 300, 190, 380, 150, nv * (1 - zon), C.text, 'left');
      tag(ctx, 'in rust overheerst de rem', 1480, 470, C.paars, q.on('overheerst', 1) * (1 - zon));
      tag(ctx, 'zonder zenuwen: eigen tempo ≈ 100', 1480, 570, C.goud, zon);
      hartMeter(ctx, 1270, 140, bpmF(t), t, 1, 420); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const X = 440, Y = 580, S = 0.6; const u = t * 100 / 60; hart(ctx, X, Y, S, { f: hartFase(u), peesdraden: 0.3 }); sinusPuls(ctx, X, Y, S, u, 1);
      const p = hartPunt(X, Y, S, 'sinus'); ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.setLineDash([12, 12]); ctx.beginPath(); ctx.moveTo(180, 150); ctx.quadraticCurveTo(220, 300, p[0] - 30, p[1] - 30); ctx.stroke(); ctx.setLineDash([]);
      schaar(ctx, 210, 250, 1.8, 0.4 + 0.3 * Math.sin(t * 6), C.goud, 1 - q.on('sneller', 1) * 0.6);
      tag(ctx, 'zenuwen doorgeknipt', 440, 140, C.goud, q.on('doorgeknipt', 1) * (1 - q.on('sneller', 1)));
      tag(ctx, 'in rust: ≈ 100 per minuut', 440, 140, C.goud, q.on('sneller', 1));
      const gi = q.on('inspanning', 1); const uG = clamp((t - q.at('inspanning')) / 4.5, 0, 1);
      const ftr = (m) => m < 1 ? 100 : m < 2.6 ? 100 + 6 * (m - 1) : Math.min(150, 110 + 28 * (m - 2.6)), fn = (m) => m < 1 ? 70 : Math.min(160, 70 + 140 * (m - 1));
      grafiek(ctx, 960, 230, 820, 400, { a: gi, xmax: 5, ymax: 200, xticks: [0, 1, 2, 3, 4, 5], yticks: [50, 100, 150], xlab: 'minuten', ylab: 'slagen / min', f: fn, u: uG, col: C.line });
      grafiek(ctx, 960, 230, 820, 400, { a: gi, xmax: 5, ymax: 200, xticks: [], yticks: [], f: ftr, u: uG, col: TR.rijkL });
      ctx.save(); ctx.globalAlpha *= gi; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960 + 820 / 5, 230); ctx.lineTo(960 + 820 / 5, 630); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'start inspanning', 960 + 820 / 5 + 12, 262, fTekst(28, 600), C.goud, 'left');
        regel(ctx, 'gewoon hart', 1200, 790, uG, C.line, 30); regel(ctx, 'getransplanteerd hart', 1450, 790, uG, TR.rijkL, 30, 'left', 700); ctx.restore();
      const ad = q.on('adrenaline', 1); for (let i = 0; i < 6; i++) { const k = (t * 0.4 + i / 6) % 1; hormoonVorm(ctx, lerp(720, 600, k), lerp(860, 700, k) - 40 * Math.sin(k * 3), 11, 'adrenaline', ad); }
      tag(ctx, 'pas als adrenaline in het bloed komt', 1370, 870, C.goud, ad); ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; const X = 700, Y = 590, S = 0.85; const tS = q.at('sinusknoop', 3), tAV = q.at('AV'), tK = q.at('kamers');
      const uC = t < tK - 0.3 ? 0.2 : lerp(0.58, 0.75, clamp((t - tK + 0.3) / 1.6, 0, 1)); hart(ctx, X, Y, S, { f: hartFase(uC), peesdraden: 0.2 });
      const sig = (pts, u, al) => { if (al <= 0.01) return; const D = gladC(pts); const n = Math.floor(D.length * clamp(u, 0, 1)); if (n < 2) return; const pp = D[n - 1]; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = TR.signaal; ctx.lineWidth = 5; ctx.beginPath(); D.slice(0, n).forEach((q2, i) => i ? ctx.lineTo(q2[0], q2[1]) : ctx.moveTo(q2[0], q2[1])); ctx.stroke(); ctx.fillStyle = TR.signaal; ctx.beginPath(); ctx.arc(pp[0], pp[1], 12, 0, 6.283); ctx.fill(); ctx.restore(); };
      const P = (k) => hartPunt(X, Y, S, k);
      sig([P('sinus'), [X - 120 * S, Y - 120 * S], [X + 60 * S, Y - 130 * S], [X + 180 * S, Y - 100 * S]], (t - tS) / 1.6, 1);
      sig([P('sinus'), [X - 100 * S, Y - 70 * S], P('avknoop')], (t - q.at('boezems')) / 1.2, 1);
      sig([P('avknoop'), [X, Y + 80 * S], [X + 30 * S, Y + 230 * S], P('apex'), [X + 245 * S, Y + 170 * S], [X + 262 * S, Y]], (t - tK + 0.3) / 1.4, 1);
      sig([[X + 30 * S, Y + 230 * S], [X - 140 * S, Y + 222 * S], [X - 252 * S, Y + 80 * S], [X - 255 * S, Y - 20 * S]], (t - tK - 0.3) / 1.2, 1);
      const p = P('sinus'); label(ctx, 'sinusknoop', '', p[0], p[1], 300, 200, 1, TR.signaal, 'left');
      const av = P('avknoop'); naamBij(ctx, 'AV-knoop', 'KLEINE VERTRAGING', av[0] + 330, av[1] + 10, q.on('AV', 1), 'left', TR.signaal);
      tag(ctx, 'sinusknoop → boezems → AV-knoop → kamers', 1400, 820, C.goud, q.on('kamers', 1)); ctx.restore(); }
  },

  // ===== H2 Bloed naar waar het nodig is =====
  s10(ctx, t, q) { bg(ctx, 'schema'); verdeling(ctx, 260, 490, t, { k: 0, vraag: q.on('organen', 1), waarden: 1 });
    tag(ctx, 'bij een sprint: 4 × zo veel', 380, 860, C.goud, q.on('vier', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'antwoord b: vooral de spieren', 960, 860, C.goud, q.on('Antwoord', 1) * (1 - q.on('wand', 1)));
    const tB = q.at('werkende') - 0.4; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6);
    const v0 = 1 - q.on('wand', 1); if (v0 > 0.01) verdeling(ctx, 260, 490, t, { a: v0, k: ramp(t, 0.3, 1.5), hi: { spieren: q.on('Antwoord', 1) } });
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA * q.on('wand', 1); const n = ramp(t, q.at('Trekt'), 1.2) * (1 - ramp(t, q.at('Ontspant'), 1.2)) - ramp(t, q.at('Ontspant'), 1.2);
      vatLang(ctx, 200, 1720, 500, 120, n, t, { a: q.on('wand', 1) });
      label(ctx, 'ring van glad spierweefsel', 'IN DE WAND VAN EEN KLEINE SLAGADER', 960, 500 - 120 * (1 - 0.45 * n) - 20, 1180, 180, q.on('glad', 1), C.text, 'left');
      tag(ctx, 'vaatvernauwing: minder bloed', 960, 860, C.goud, q.on('vaatvernauwing', 1) * (1 - q.on('Ontspant', 1)));
      tag(ctx, 'trekt samen', 960, 860, C.text2, q.on('Trekt', 1) * (1 - q.on('vaatvernauwing', 1)));
      tag(ctx, 'ontspant', 960, 860, C.text2, q.on('Ontspant', 1) * (1 - q.on('vaatverwijding', 1)));
      tag(ctx, 'vaatverwijding: meer bloed', 960, 860, C.groen, q.on('vaatverwijding', 1)); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const nS = -ramp(t, q.at('verwijden'), 1.5), nD = ramp(t, q.at('vernauwen'), 1.5);
      regel(ctx, 'in een werkende spier', 160, 210, 1, C.text, 36, 'left', 700); vatLang(ctx, 160, 1150, 360, 85, nS, t, { seed: 3 });
      const st = [['zuurstof ↓', q.on('zuurstof', 1), C.teal], ['koolstofdioxide ↑', q.on('koolstofdioxide', 1), C.text2], ['zuur ↑', q.on('zuur', 2), C.text2]];
      st.forEach(([s, al, col], i) => tag(ctx, s, 1240, 230 + i * 80, col, al, 'left'));
      const dz = q.on('vernauwen', 1); regel(ctx, 'in je darmen en nieren', 160, 610, dz, C.text, 36, 'left', 700); vatLang(ctx, 160, 1150, 750, 85, nD, t, { a: dz, seed: 9 });
      tag(ctx, 'orthosympathisch + adrenaline', 1240, 760, C.goud, q.on('orthosympathische', 1), 'left');
      tag(ctx, 'vaatverwijding', 1240, 460, C.groen, q.on('verwijden', 1), 'left'); tag(ctx, 'vaatvernauwing', 1240, 660, C.goud, q.on('vernauwen', 1), 'left'); ctx.restore(); }
  },

  s13(ctx, t, q) { bg(ctx, 'schema'); const k = ramp(t, q.at('zware'), 2.2);
    const hi = { spieren: q.on('vijfde', 1) * (1 - q.on('darmen', 1)), darmen: q.on('darmen', 1) * (1 - q.on('hersenvaten', 1)), hersenen: q.on('hersenvaten', 1) * (1 - q.on('warm', 1)), huid: q.on('huid', 1) };
    verdeling(ctx, 260, 490, t, { k, huid: ramp(t, q.at('huid'), 1.5), hi, ghost: 0.8 });
    tag(ctx, 'rust → zware inspanning', 380, 860, C.text2, q.on('zware', 1) * (1 - q.on('vijfde', 1)));
    tag(ctx, '≈ vier vijfde naar je spieren', 380, 860, C.goud, q.on('vijfde', 1) * (1 - q.on('darmen', 1)));
    tag(ctx, 'darmen: veel minder', 380, 860, C.goud, q.on('darmen', 1) * (1 - q.on('maaltijd', 1)));
    tag(ctx, 'vlak na een grote maaltijd: niet fijn', 380, 860, C.text2, q.on('maaltijd', 1) * (1 - q.on('hersenvaten', 1)));
    tag(ctx, 'hersenen: ongeveer even veel', 380, 860, C.goud, q.on('hersenvaten', 1) * (1 - q.on('warm', 1)));
    tag(ctx, 'warm: extra bloed naar je huid', 380, 860, C.goud, q.on('warm', 1));
    metaText(ctx, 'streepjes = in rust · schematisch', 1860, 880, C.grain, 'right', 24);
  },

  s14(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('snel', 1) - 0.4, tC = q.at('drukreceptoren', 2) - 0.4, tD = q.at('duizelige') - 0.4;
    const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6) * (1 - ramp(t, tC, 0.6)), pC = ramp(t, tC, 0.6) * (1 - ramp(t, tD, 0.6)), pD = ramp(t, tD, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 760, Y = 640, S = 0.75; const u = t * 70 / 60, f = hartFase(u); hart(ctx, X, Y, S, { f, stroom: 1, t, peesdraden: 0.2 });
      const rek = f.sl ? f.ven : 0; const rc = q.on('drukreceptoren', 1); const pts = [[110, -322], [165, -334], [235, -322], [168, -385], [80, -375]].map(([a, b]) => [X + a * S, Y + b * S]);
      for (const [px, py] of pts) { ctx.save(); ctx.globalAlpha *= rc; ctx.beginPath(); ctx.arc(px, py, 10 + 6 * rek * q.on('uitrekt', 1), 0, 6.283); shape(ctx, TR.signaal, C.text, 2); ctx.restore(); }
      const ab = hartPunt(X, Y, S, 'aorta'); label(ctx, 'aortaboog', '', ab[0] + 40, ab[1] + 10, 1260, 330, q.on('aortaboog', 1), C.text, 'left');
      label(ctx, 'halsslagaders', '', X + 168 * S, Y - 385 * S, 1260, 170, q.on('halsslagaders', 1), C.text, 'left');
      naamBij(ctx, 'drukreceptoren', 'BARORECEPTOREN', X + 60 * S, Y - 395 * S, rc, 'right', TR.signaal);
      tag(ctx, 'meten hoe ver de wand uitrekt', 1460, 640, C.goud, q.on('meten', 1));
      tag(ctx, 'bloeddruk wordt geregeld', 760, 120, C.paars, q.on('geregeld', 1) * (1 - q.on('aortaboog', 1))); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const sink = ramp(t, q.at('zakt'), 2); person(ctx, 760, 860, 600, 1, { armR: { a1: 0.12 }, armL: { a1: 0.12 } });
      ctx.save(); ctx.strokeStyle = rgba(TR.rijk, 0.8); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 330); ctx.lineTo(760, 560); ctx.lineTo(735, 830); ctx.stroke(); ctx.restore();
      if (sink > 0.01) { particleFlow(ctx, [[760, 330], [760, 560], [735, 830]], 10, t, 260, TR.rijkL, 7, 4, sink); for (let k = 0; k < 2; k++) arrow(ctx, 860, 420 + k * 180, 860, 540 + k * 180, C.goud, sink, 3); }
      const dr = lerp(0.75, 0.35, ramp(t, q.at('daalt'), 1.2)); roundRect(ctx, 1300, 200, 110, 520, 18); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 2); const hh = 500 * dr; roundRect(ctx, 1310, 710 - hh, 90, hh, 12); ctx.fillStyle = rgba(TR.rijk, 0.85); ctx.fill(); text(ctx, 'druk naar je hoofd', 1355, 780, fTekst(32, 600), C.text, 'center');
      tag(ctx, 'snel opstaan', 760, 140, C.goud, q.on('snel', 1) * (1 - q.on('zakt', 1))); tag(ctx, 'bloed zakt naar je benen', 760, 140, TR.rijkL, q.on('zakt', 1)); ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; const om = q.on('omgekeerde', 1) * (1 - q.on('negatieve', 1)); const up = om > 0.5;
      const pulse = t > q.at('stijgt', 1) ? (t * 0.35) % 1 : -1;
      kringSchema(ctx, 960, 470, { rx: 560, ry: 270, bw: 420, bh: 120, nodes: [
        { t: 'bloeddruk', s: up ? 'stijgt te ver' : t > q.at('stijgt', 1) ? 'stijgt weer' : 'daalt', col: TR.rijkL, a: 1 },
        { t: 'drukreceptoren', s: up ? 'rekken meer uit' : 'rekken minder uit', col: TR.signaal, a: q.on('drukreceptoren', 2) },
        { t: 'verlengde merg', s: 'regelcentrum in de hersenstam', col: C.paars, a: q.on('verlengde', 1) },
        { t: up ? 'hart rustiger' : 'hart sneller', s: up ? 'vaten wijder' : (q.on('vernauwt', 1) > 0.5 ? 'vaten nauwer' : ''), col: C.goud, a: q.on('sneller', 1) } ],
        arr: [q.on('drukreceptoren', 2), q.on('impulsen', 1), q.on('regelcentrum', 1), q.on('stijgt', 1)], minus: q.on('negatieve', 1), pulse });
      tag(ctx, 'minder impulsen', 1500, 640, TR.signaal, q.on('impulsen', 1) * (1 - q.on('regelcentrum', 1)));
      tag(ctx, 'het gevolg remt de oorzaak', 960, 470, C.text2, q.on('gevolg', 1) * (1 - q.on('negatieve', 1)));
      tag(ctx, 'bloeddruk vrij constant: homeostase', 960, 875, C.goud, q.on('constant', 1)); ctx.restore(); }
    if (pD > 0.01) { ctx.save(); ctx.globalAlpha *= pD; ctx.save(); ctx.translate(960, 860); ctx.rotate(Math.sin(t * 3) * 0.05); person(ctx, 0, 0, 600, 1, { armR: { a1: 0.4, a2: 2.4 }, armL: { a1: 0.2 }, open: true }); ctx.restore();
      for (let i = 0; i < 3; i++) { const an = t * 2 + i * 2.09; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(960 + Math.cos(an) * 90, 230 + Math.sin(an) * 22, 8, 0, 6.283); ctx.fill(); }
      tag(ctx, 'duizelig: de regeling komt een fractie te laat', 960, 140, C.goud, q.on('laat', 1)); ctx.restore(); }
  },

  // ===== H3 Een vat dat dichtgaat =====
  s15(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('wand', 1) - 0.4; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 860, Y = 590, S = 0.82; const kr = q.on('kransslagaders', 1);
      hart(ctx, X, Y, S, { f: hartFase(t * 1.1), stroom: 1 - 0.6 * kr, t, krans: Math.max(0.35, kr), peesdraden: 0.2, hi: {} });
      const p = hartPunt(X, Y, S, 'krans'); naamBij(ctx, 'kransslagaders', 'VOEDEN DE HARTSPIER', 1170, p[1] + 10, kr, 'left', C.goud);
      tag(ctx, 'niet uit het bloed in de holtes', 860, 140, C.koraal, q.on('holtes', 1));
      tag(ctx, 'het hart zit vol bloed', 860, 140, C.text2, q.on('vol', 1) * (1 - q.on('kransslagaders', 1))); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const g = ramp(t, q.at('vet'), 9) * 0.55 + 0.45 * ramp(t, q.at('nauwer'), 1.5);
      const jr = Math.round(lerp(0, 30, ramp(t, q.at('langzaam'), 4)));
      const r = plaqueVat(ctx, 160, 1760, 470, 190, t, { g, ont: q.on('ontstekingscellen', 1), scheur: q.on('Scheurt', 1), stol: ramp(t, q.at('stolsel'), 3) });
      metaText(ctx, 'slagader in lengtedoorsnede · schematisch', 160, 200, C.grain, 'left', 24);
      if (q.on('langzaam', 1) > 0.01) { klok(ctx, 1700, 170, 50, jr * 0.4, '', q.on('langzaam', 1) * (1 - q.on('nauwer', 1))); regel(ctx, jr + ' jaar', 1620, 185, q.on('langzaam', 1) * (1 - q.on('nauwer', 1)), C.goud, 36, 'right', 700); }
      naamBij(ctx, 'vet en cholesterol', 'HOOPT ZICH OP IN DE WAND', r.xm + 120, 765, q.on('cholesterol', 1) * (1 - q.on('ontstekingscellen', 1)), 'left', C.oker);
      naamBij(ctx, 'ontstekingscellen', '', r.xm - 120, 765, q.on('ontstekingscellen', 1) * (1 - q.on('plaque', 1)), 'right', C.text);
      label(ctx, 'plaque', '', r.xm + 60, r.bot(r.xm + 60) + 20, 1300, 830, q.on('plaque', 1) * (1 - q.on('Scheurt', 1)), C.goud, 'left');
      tag(ctx, 'nauwer en stugger', 960, 140, C.text2, q.on('nauwer', 1) * (1 - q.on('atherosclerose', 1)));
      tag(ctx, 'atherosclerose (aderverkalking)', 960, 140, C.goud, q.on('atherosclerose', 1) * (1 - q.on('slagader', 3)));
      tag(ctx, '… maar in slagaders', 960, 140, C.goud, q.on('slagader', 3) * (1 - q.on('Scheurt', 1)));
      tag(ctx, 'plaque scheurt: bloedstolsel', 960, 140, C.goud, q.on('stolsel', 1) * (1 - q.on('afsluiten', 1)));
      tag(ctx, 'vat in één keer dicht', 960, 140, C.koraal, q.on('afsluiten', 1)); ctx.restore(); }
  },

  s16(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('stolsel', 1) - 0.4, tC = q.at('kans') - 0.4; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6) * (1 - ramp(t, tC, 0.6)), pC = ramp(t, tC, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 760, Y = 590, S = 0.85; hart(ctx, X, Y, S, { f: hartFase(t * 1.1), t, krans: 1, peesdraden: 0.2 });
      infarct(ctx, X, Y, S, q.on('kransslagader', 1), ramp(t, q.at('sterft'), 2.5)); const p = [X + 140 * S, Y + 30 * S];
      naamBij(ctx, 'stolsel', 'KRANSSLAGADER DICHT', p[0] + 170, p[1] - 45, q.on('kransslagader', 1), 'left', C.goud);
      tag(ctx, 'geen zuurstof meer', 1460, 470, C.koraal, q.on('zuurstof', 1) * (1 - q.on('sterft', 1)), 'center');
      if (q.on('twintig', 1) > 0.01) { klok(ctx, 1480, 560, 70, (t - q.at('twintig')) * 2, '20 min – paar uur', q.on('twintig', 1)); }
      const g = hartPunt(X, Y, S, 'apex'); naamBij(ctx, 'hartinfarct', 'DIT DEEL STERFT AF', p[0] + 170, Y + 185 * S + 10, q.on('hartinfarct', 1), 'left', C.goud); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const x = 760, y = 560, s = 0.8; lichaam(ctx, x, y, s, 1, { darm: 0 });
      ctx.beginPath(); ctx.ellipse(x, y - 490 * s, 66 * s, 44 * s, 0, Math.PI, 0); ctx.closePath(); shape(ctx, rgba(C.paars, 0.2), rgba(C.paars, 0.7), 1.5);
      bonzendHart(ctx, x + 30 * s, y - 170 * s, 30, t, 70, 1); const pts = [[x + 30 * s, y - 200 * s], [x + 40 * s, y - 330 * s], [x + 30 * s, y - 420 * s], [x + 15 * s, y - 500 * s]];
      ctx.strokeStyle = TR.rijk; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); gladC(pts).forEach((pp, i) => i ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1])); ctx.stroke();
      const k = ramp(t, q.at('losraken'), 2); const pp = padPunt(pts, k); ctx.beginPath(); ctx.arc(pp[0], pp[1], 12, 0, 6.283); shape(ctx, TR.arm, C.goud, 3);
      const gr = ramp(t, q.at('herseninfarct'), 1.5); if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; ctx.beginPath(); ctx.ellipse(x + 25 * s, y - 505 * s, 30 * s, 18 * s, 0.2, 0, 6.283); ctx.fillStyle = rgba('#8A8F98', 0.95); ctx.fill(); ctx.restore(); }
      tag(ctx, 'stolsel raakt los', 1300, 300, C.goud, q.on('losraken', 1) * (1 - q.on('herseninfarct', 1)));
      tag(ctx, 'herseninfarct', 1300, 300, C.goud, q.on('herseninfarct', 1)); tag(ctx, 'een vorm van beroerte', 1300, 390, C.text2, q.on('beroerte', 1)); ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; text(ctx, 'grotere kans op hart- en vaatziekten', 960, 190, fTitel(56), C.text, 'center');
      const R = [['roken', 'roken'], ['hoge bloeddruk', 'bloeddruk'], ['diabetes', 'diabetes'], ['te veel cholesterol', 'cholesterol'], ['weinig bewegen', 'bewegen'], ['overgewicht', 'overgewicht'], ['leeftijd', 'leeftijd'], ['erfelijkheid', 'erfelijkheid']];
      R.forEach(([s, w], i) => { const al = q.on(w, 1); if (al <= 0.01) return; const cx = 330 + (i % 4) * 420, cy = 360 + Math.floor(i / 4) * 230; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, cx - 190, cy - 70, 380, 140, 18); shape(ctx, rgba(C.bgSchema, 0.95), i >= 6 ? C.line : C.goud, 2);
        text(ctx, s, cx, cy + 12, fTekst(36, 700), C.text, 'center'); ctx.restore(); });
      regel(ctx, 'leeftijd en erfelijkheid kun je niet veranderen', 960, 820, q.on('erfelijkheid', 1), C.text2, 32, 'center'); ctx.restore(); }
  },

  // ===== H4 Een hart dat trilt =====
  s17(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('Reageert') - 0.4, tC = q.at('Druk') - 0.3; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 600, Y = 560, S = 0.72; const tf = q.at('kamerfibrilleren'); const tril = t > tf;
      hart(ctx, X, Y, S, { f: tril ? trilF(t) : hartFase(t * 1.2), stroom: tril ? 0 : 1, t, peesdraden: 0.3 }); chaos(ctx, X, Y, S, t, q.on('spiercellen', 1));
      ecgStrip(ctx, 1080, 200, 760, 240, t, (tt) => tt < tf ? ecgV(tt * 1.2) : ecgFib(tt), q.on('ritme', 1));
      tag(ctx, 'te weinig zuurstof: uit het ritme', 1460, 540, C.text2, q.on('ritme', 1) * (1 - q.on('sporters', 1)));
      tag(ctx, 'jonge sporters: soms erfelijke hartziekte', 1460, 540, C.text2, q.on('sporters', 1) * (1 - q.on('kamerfibrilleren', 1)));
      tag(ctx, 'kamerfibrilleren', 1460, 540, TR.signaal, q.on('kamerfibrilleren', 1) * (1 - q.on('trilt', 1)));
      tag(ctx, 'trilt, maar pompt niet', 1460, 540, C.koraal, q.on('trilt', 1));
      tag(ctx, 'hartstilstand', 1460, 640, C.koraal, q.on('hartstilstand', 1));
      tag(ctx, 'na een paar minuten: hersenschade', 1460, 740, C.goud, q.on('hersenen', 1)); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; vloer(ctx); const V = liggend(ctx, 1000, 800, 440, 1); const dr = q.on('Druk', 1);
      const per = 60 / 110, ph = (t % per) / per, d = dr > 0.5 ? Math.exp(-ph * 5) : 0; helper(ctx, V.borstX + 14, 752 + 10 * d, d, dr);
      const stap = [['reageert niet?', 'Reageert'], ['ademt niet normaal?', 'normaal'], ['bel 112', 'Bel'], ['laat een AED halen', 'halen'], ['begin met reanimeren', 'reanimeren']];
      paneel(ctx, 1180, 150, 680, 420, 1 - dr * 0.0);
      stap.forEach(([s, w], i) => { const al = q.on(w, 1); regel(ctx, (i + 1) + '.', 1220, 220 + i * 76, al, C.goud, 36, 'left', 700); regel(ctx, s, 1270, 220 + i * 76, al, C.text, 36, 'left', i === 2 || i === 3 ? 700 : 600); });
      if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; const bl = ph < 0.2; ctx.beginPath(); ctx.arc(1270, 660, 22, 0, 6.283); shape(ctx, bl ? C.goud : rgba(C.goud, 0.2), C.goud, 2); text(ctx, '100–120 keer per minuut', 1310, 672, fTekst(36, 700), C.text, 'left');
        regel(ctx, 'hard en snel · midden van de borst', 1270, 740, q.on('midden', 1), C.text2, 32); ctx.restore(); }
      tag(ctx, 'zo pomp jij het bloed rond', 600, 140, C.goud, q.on('pomp', 2));
      const an = q.on('ademt', 1) * (1 - q.on('Bel', 1)); if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; text(ctx, '?', V.borstX - 260, 690, fTitel(90), C.goud, 'center'); ctx.restore(); } ctx.restore(); }
  },

  s18(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('schok', 1) - 0.8; const pA = 1 - ramp(t, tB, 0.6), pB = ramp(t, tB, 0.6);
    const tS = q.at('prikkelt'), tN = q.at('sinusknoop');
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const X = 600, Y = 560, S = 0.72; const fase = t < tS ? 'tril' : t < tN ? 'stil' : 'klop';
      const u = (t - tN) * 70 / 60 + 0.3; hart(ctx, X, Y, S, { f: fase === 'tril' ? trilF(t) : fase === 'stil' ? hartFase(0.2) : hartFase(u), stroom: fase === 'klop' ? 1 : 0, t, peesdraden: 0.3 });
      if (fase === 'tril') chaos(ctx, X, Y, S, t, 1); if (fase === 'klop') sinusPuls(ctx, X, Y, S, u, 1);
      const fl = clamp(1 - (t - tS) / 0.9, 0, 1) * (t >= tS ? 1 : 0); allesPrikkel(ctx, X, Y, S, fl); bliksem(ctx, X + 10, Y - 20, 2.2, fl);
      ecgStrip(ctx, 1080, 200, 760, 240, t, (tt) => tt < tS ? ecgFib(tt) : tt < tS + 0.12 ? 1.2 : tt < tN + 0.2 ? 0 : ecgV((tt - tN) * 70 / 60 + 0.3));
      tag(ctx, 'antwoord b', 1460, 540, C.goud, q.on('bee', 1) * (1 - q.on('prikkelt', 1)));
      tag(ctx, 'alle hartspiercellen tegelijk geprikkeld', 1460, 540, TR.signaal, q.on('prikkelt', 1) * (1 - q.on('stil', 1)));
      tag(ctx, 'even allemaal stil: trillen weg', 1460, 540, C.text2, q.on('stil', 1) * (1 - q.on('sinusknoop', 1)));
      tag(ctx, 'sinusknoop geeft het startsein', 1460, 540, TR.signaal, q.on('sinusknoop', 1) * (1 - q.on('ritme', 1)));
      tag(ctx, 'weer in het eigen ritme', 1460, 540, C.groen, q.on('ritme', 1));
      const p = hartPunt(X, Y, S, 'sinus'); label(ctx, 'sinusknoop', '', p[0], p[1], 260, 200, q.on('sinusknoop', 1), TR.signaal, 'left'); ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; vloer(ctx); const V = liggend(ctx, 1000, 800, 440, 1);
      const tM = q.at('meet'), tR = q.at('Raak'); const druk = t < tM - 0.4 || (t > q.at('schok', 2) + 0.7 && t < tR - 0.2); const per = 60 / 110, ph = (t % per) / per, d = druk ? Math.exp(-ph * 5) : 0;
      const pads = [[V.borstX - 60, 770], [V.borstX + 70, 832]]; const fl = (t > q.at('schok', 2) && t < q.at('schok', 2) + 0.5) || (t > q.at('schok', 3) && t < q.at('schok', 3) + 0.5) ? 1 : 0;
      aedApparaat(ctx, 1300, 720, 1, { scherm: t > tM - 0.4 && t < q.at('schok', 2) ? 'analyse…' : t >= q.at('schok', 2) && t < q.at('schok', 2) + 1.5 ? 'schok' : t >= tR ? 'loslaten!' : '', pads, flits: fl });
      helper(ctx, V.borstX + 14, 752 + 10 * d, d, 1, druk ? 0 : 1);
      tag(ctx, 'na de schok: meteen verder drukken', 960, 140, C.goud, q.on('verder', 1) * (1 - q.on('meet', 1)));
      tag(ctx, 'de AED meet eerst zelf het ritme', 960, 140, TR.signaal, q.on('meet', 1) * (1 - q.on('helpen', 1)));
      tag(ctx, 'schok alleen als die kan helpen', 960, 140, C.goud, q.on('helpen', 1) * (1 - q.on('Raak', 1)));
      tag(ctx, 'niemand aanraken tijdens de schok', 960, 140, C.koraal, q.on('Raak', 1));
      if (t > tM - 0.4 && t < tR + 3) ecgStrip(ctx, 1460, 360, 400, 170, t, ecgFib, q.on('meet', 1), 'AED meet'); ctx.restore(); }
  },

  // ===== Recap =====
  s19(ctx, t, q) { sporthal(ctx, t); aedKast(ctx, 300, 400, 1.15, 1, q.on('AED', 1)); speler(ctx, t, 760, 1);
    paneel(ctx, 1060, 110, 800, 560, 1); const L = [['eigen gangmaker: de sinusknoop', 'gangmaker', TR.signaal], ['orthosympathisch + adrenaline: sneller', 'orthosympathische', C.text], ['4 à 5 × zo veel bloed rond', 'vier', C.text], ['werkende spieren: vaatverwijding', 'verwijden', C.groen], ['kransslagader dicht: hartinfarct', 'kransslagader', C.text], ['trillend hart: reanimeren en AED', 'reanimatie', C.goud]];
    L.forEach(([s, w, col], i) => { const al = q.on(w, 1); regel(ctx, '•', 1100, 190 + i * 82, al, col, 40, 'left', 700); regel(ctx, s, 1135, 190 + i * 82, al, C.text, 33, 'left', 600); });
    tag(ctx, 'de schok stopt het trillen', 1460, 760, C.goud, q.on('schok', 1));
  },
};
