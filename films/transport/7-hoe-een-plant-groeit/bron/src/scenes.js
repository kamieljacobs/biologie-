// Transport · Hoe een plant groeit — scènes per alinea (v1.0, 15 okt 2026).
// Kern: drawStrip() tekent een stengel- of wortelstuk als twee kolommen cellen; de kromming volgt uit het
// lengteverschil van de twee kanten (hoek = (L1 - L2) / breedte). Zo is het buigen in beeld altijd een gevolg
// van ongelijke strekking, nooit een losse animatie.

// ---------- kleuren ----------
const STENG = '#7FC48F', STENGD = '#4E8F5E', BLAD = '#6DB37A', WORT = '#D9C9A0', WORTD = '#A8946A', AUX = '#E0B64A', LICHT = '#F2D27A',
  POT = '#B5654A', AGAR = '#E8D9A0', WAND = '#9FD3A8', VAC = '#5BA4C9', STAT = '#F2EEE6';

// ---------- kleine helpers ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function stip(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function mix(a, b, u) { return a + (b - a) * clamp(u, 0, 1); }

// ---------- een gebogen lijn: begin (x,y), richting th0, lengte L, totale draaiing turn ----------
function boog(x, y, th0, L, turn, n = 40) { const pts = [[x, y]]; let th = th0, px = x, py = y; const ds = L / n; for (let i = 0; i < n; i++) { th += turn / n; px += Math.cos(th - turn / n / 2) * ds; py += Math.sin(th - turn / n / 2) * ds; pts.push([px, py]); } return { pts, th }; }
function streep(ctx, pts, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }

// ---------- kiemplant (zonnebloem): stengel, twee zaadlobben, wortel ----------
function kiemplant(ctx, x, y, o = {}) { const { L = 260, bend = 0, th0 = -Math.PI / 2, root = 0, rbend = 0, a = 1, lw = 14, blad = 1, bladA = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  let rt = null; if (root > 0) { rt = boog(x, y, th0 + Math.PI, root, rbend); streep(ctx, rt.pts, WORT, lw * 0.6); for (let i = 6; i < rt.pts.length; i += 5) { const p = rt.pts[i], an = Math.atan2(rt.pts[i][1] - rt.pts[i - 1][1], rt.pts[i][0] - rt.pts[i - 1][0]); ctx.strokeStyle = rgba(WORT, 0.6); ctx.lineWidth = 1.5; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + Math.cos(an + s * 1.2) * 14, p[1] + Math.sin(an + s * 1.2) * 14); ctx.stroke(); } } }
  const st = boog(x, y, th0, L, bend); streep(ctx, st.pts, STENGD, lw + 4); streep(ctx, st.pts, STENG, lw);
  const tip = st.pts[st.pts.length - 1];
  if (blad > 0.01) { ctx.save(); ctx.translate(tip[0], tip[1]); ctx.rotate(st.th + Math.PI / 2); ctx.globalAlpha *= bladA; for (const s of [-1, 1]) { ctx.save(); ctx.rotate(s * 0.9); ctx.beginPath(); ctx.ellipse(0, -46 * blad, 20 * blad, 46 * blad, 0, 0, 6.283); shape(ctx, BLAD, STENGD, 2); ctx.restore(); } ctx.restore(); }
  ctx.restore(); return { tip, th: st.th, stem: st.pts, root: rt }; }
function pot(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 70 * s, y); ctx.lineTo(x + 70 * s, y); ctx.lineTo(x + 52 * s, y + 110 * s); ctx.lineTo(x - 52 * s, y + 110 * s); ctx.closePath(); shape(ctx, POT, '#8C4A36', 2); roundRect(ctx, x - 80 * s, y - 16 * s, 160 * s, 24 * s, 6 * s); shape(ctx, '#C97A5C', '#8C4A36', 2); ctx.fillStyle = '#4A3326'; ctx.fillRect(x - 66 * s, y - 4 * s, 132 * s, 8 * s); ctx.restore(); }
function lichtbundel(ctx, x0, y0, x1, y1, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const off = (i - 2) * w / 5, k = 0.10 + 0.04 * Math.sin(t * 1.3 + i); ctx.beginPath(); ctx.moveTo(x0, y0 + off - w / 10); ctx.lineTo(x1, y1 + off * 1.6 - w / 8); ctx.lineTo(x1, y1 + off * 1.6 + w / 8); ctx.lineTo(x0, y0 + off + w / 10); ctx.closePath(); ctx.fillStyle = rgba(LICHT, k); ctx.fill(); } ctx.restore(); }
function zonnetje(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, LICHT); ctx.strokeStyle = LICHT; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.35, y + Math.sin(an) * r * 1.35); ctx.lineTo(x + Math.cos(an) * r * 1.7, y + Math.sin(an) * r * 1.7); ctx.stroke(); } ctx.restore(); }

// ---------- kamer met raam (Macro) ----------
function kamer(ctx, t, nacht = 0) { ctx.fillStyle = '#2A3346'; ctx.fillRect(0, 0, W, CAPTION_Y); ctx.fillStyle = '#323C52'; ctx.fillRect(0, 640, W, CAPTION_Y - 640);
  // raam rechts
  roundRect(ctx, 1260, 90, 560, 520, 8); shape(ctx, mix(0, 1, 1) ? '#5E86B8' : '#5E86B8', '#C9C9C9', 10); ctx.fillStyle = rgba('#8FB8E0', 0.5); ctx.fillRect(1270, 100, 540, 250); ctx.strokeStyle = '#C9C9C9'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(1540, 90); ctx.lineTo(1540, 610); ctx.moveTo(1260, 350); ctx.lineTo(1820, 350); ctx.stroke();
  zonnetje(ctx, 1700, 200, 46, 1, t);
  // vensterbank
  roundRect(ctx, 820, 600, 1040, 40, 6); shape(ctx, '#D8D2C2', '#A8A292', 2);
  if (nacht > 0.01) { ctx.fillStyle = rgba('#000000', 0.55 * nacht); ctx.fillRect(0, 0, W, CAPTION_Y); } }

// ---------- strook: stengel- of wortelstuk als twee rijen cellen; buiging volgt uit lengteverschil ----------
// basis (x,y), richting th0, breedte w, lengte kant A (links van de looprichting) La en kant B Lb, n cellen per kant.
function drawStrip(ctx, x, y, th0, w, La, Lb, o = {}) { const { n = 6, col = STENG, colD = STENGD, a = 1, auxA = 0, auxB = 0, t = 0, label = null, kapje = 0, mutsje = 0 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const Lc = (La + Lb) / 2, turn = (La - Lb) / w; // langere kant wordt de buitenbocht
  const nx = Math.cos(th0 - Math.PI / 2), ny = Math.sin(th0 - Math.PI / 2); // normaal naar kant A
  const N = 40; const mid = boog(x, y, th0, Lc, turn, N);
  const side = (s) => mid.pts.map((p, i) => { const th = th0 + turn * i / N; const ax = Math.cos(th - Math.PI / 2), ay = Math.sin(th - Math.PI / 2); return [p[0] + ax * s * w / 2, p[1] + ay * s * w / 2]; });
  const A = side(1), B = side(-1);
  ctx.beginPath(); A.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = B.length - 1; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]); ctx.closePath(); shape(ctx, rgba(col, 0.28), colD, 3);
  const M = side(0); streep(ctx, M, rgba(colD, 0.9), 2);
  // celwanden dwars: n per kant, gelijk verdeeld over de booglengte → langere kant = langere cellen
  ctx.strokeStyle = rgba(colD, 0.9); ctx.lineWidth = 2;
  for (let k = 1; k < n; k++) { const i = Math.round(k / n * N); for (const [S, s] of [[A, 1], [B, -1]]) { const p = S[i], m = M[i]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(m[0], m[1]); ctx.stroke(); } }
  // auxine-stipjes per kant
  for (const [S, amt, s] of [[A, auxA, 1], [B, auxB, -1]]) { if (amt <= 0.01) continue; const cnt = Math.round(amt * 14); for (let j = 0; j < cnt; j++) { const u = (j + 0.5) / cnt, i = Math.min(N, Math.round(u * N)); const p = S[i], m = M[i]; const f = 0.3 + 0.4 * hash(j * 7 + s * 3); const wv = wander(j + (s > 0 ? 0 : 50), t, 3, 0.8); stip(ctx, mix(p[0], m[0], f) + wv.x, mix(p[1], m[1], f) + wv.y, 5, AUX, Math.min(1, amt * 1.4)); } }
  const end = mid.pts[N]; const thE = th0 + turn;
  if (mutsje > 0.01) { ctx.save(); ctx.globalAlpha *= mutsje; ctx.translate(end[0], end[1]); ctx.rotate(thE); ctx.beginPath(); ctx.moveTo(0, -w / 2 - 4); ctx.quadraticCurveTo(w * 0.9, 0, 0, w / 2 + 4); ctx.closePath(); shape(ctx, rgba(WORTD, 0.6), WORTD, 2); ctx.restore(); }
  ctx.restore(); return { A, B, M, end, th: thE, turn }; }

// ---------- gevoeligheidscurven ----------
const sig = (z) => 1 / (1 + Math.exp(-z));
const fStengel = (u) => 1.0 * Math.exp(-Math.pow((u - 0.64) / 0.14, 2)) - 0.7 * sig((u - 0.93) / 0.025);
const fWortel = (u) => 0.55 * Math.exp(-Math.pow((u - 0.17) / 0.09, 2)) - 0.85 * sig((u - 0.38) / 0.05);
function auxGrafiek(ctx, gx, gy, gw, gh, o = {}) { const { a = 1, assen = 1, boven = 0, stengel = 0, wortel = 0, markU = -1, mark = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const y0 = gy + gh * 0.5, sy = gh * 0.42, X = (u) => gx + u * gw, Y = (v) => y0 - v * sy;
  ctx.save(); ctx.globalAlpha *= assen; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.stroke(); pijl(ctx, gx, y0, gx + gw + 30, y0, C.line, 1, 2, 14);
  text(ctx, 'auxineconcentratie →', gx + gw + 10, gy + gh + 44, fTekst(26, 600), C.text2, 'right'); metaText(ctx, 'effect op strekking', gx - 20, gy - 18, C.text2, 'left', 22); ctx.restore();
  if (boven > 0.01) { ctx.save(); ctx.globalAlpha *= boven; ctx.fillStyle = rgba(C.groen, 0.08); ctx.fillRect(gx, gy, gw, gh / 2); ctx.fillStyle = rgba(C.koraal, 0.08); ctx.fillRect(gx, y0, gw, gh / 2); regel(ctx, 'bevordert', gx + 16, gy + 38, 1, C.groen, 26, 'left', 700); regel(ctx, 'remt', gx + 16, gy + gh - 16, 1, C.koraal, 26, 'left', 700); ctx.restore(); }
  for (const [f, col, p, nm, lu] of [[fWortel, WORT, wortel, 'wortel', 0.17], [fStengel, STENG, stengel, 'stengel', 0.64]]) { if (p <= 0.01) continue; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const m = Math.max(2, Math.round(120 * p)); for (let i = 0; i <= m; i++) { const u = i / 120; const px = X(u), py = Y(f(u)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); regel(ctx, nm, X(lu), Y(f(lu)) - 22, ramp(p, 0.6, 0.4), col, 30, 'center', 700); }
  if (markU >= 0 && mark > 0.01) { ctx.save(); ctx.globalAlpha *= mark; ctx.setLineDash([10, 8]); ctx.strokeStyle = AUX; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(markU), gy); ctx.lineTo(X(markU), gy + gh); ctx.stroke(); ctx.setLineDash([]); stip(ctx, X(markU), Y(fStengel(markU)), 12, STENG); stip(ctx, X(markU), Y(fWortel(markU)), 12, WORT); ctx.restore(); }
  ctx.restore(); return { X, Y }; }

// ---------- boom met spijker ----------
function boom(ctx, x, yGrond, hStam, o = {}) { const { a = 1, spijkerY = null, dik = 34, meri = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#6B4E3A'; roundRect(ctx, x - dik / 2, yGrond - hStam, dik, hStam, 6); ctx.fill();
  for (const [dx, dy, r] of [[0, -40, 92], [-72, 0, 70], [72, 0, 70], [-40, -90, 60], [42, -86, 62]]) circ(ctx, x + dx, yGrond - hStam + dy, r, '#4A7A3A');
  if (meri > 0.01) { ctx.save(); ctx.globalAlpha *= meri * (0.75 + 0.25 * Math.sin(t * 4)); circ(ctx, x, yGrond - hStam - 120, 16, AUX); ctx.restore(); }
  if (spijkerY != null) { ctx.fillStyle = '#C9C9C9'; ctx.fillRect(x + dik / 2 - 4, spijkerY - 4, 46, 8); ctx.fillRect(x + dik / 2 + 38, spijkerY - 12, 8, 24); }
  ctx.restore(); }

// ---------- plantencel (strekking) ----------
function plantcel(ctx, cx, yBot, w, h, o = {}) { const { a = 1, vac = 0.5, soepel = 0, druk = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, cx - w / 2, yBot - h, w, h, 16); ctx.fillStyle = rgba(C.groen, 0.12); ctx.fill();
  ctx.save(); if (soepel > 0.01) ctx.setLineDash([18 - 8 * soepel, 6 * soepel]); ctx.strokeStyle = WAND; ctx.lineWidth = 12 - 4 * soepel; roundRect(ctx, cx - w / 2, yBot - h, w, h, 16); ctx.stroke(); ctx.restore();
  // cytoplasma-randje en vacuole
  const vw = (w - 40) * (0.55 + 0.45 * vac), vh = (h - 40) * (0.45 + 0.55 * vac); roundRect(ctx, cx - vw / 2, yBot - h / 2 - vh / 2, vw, vh, Math.min(40, vw / 2)); shape(ctx, rgba(VAC, 0.35), VAC, 2);
  circ(ctx, cx - w / 2 + 34, yBot - h + 40, 14, rgba(C.kern, 0.9), C.kernR, 2);
  if (druk > 0.01) { for (const [dx, dy, ex, ey] of [[0, -vh / 2, 0, -h / 2 + 6], [0, vh / 2, 0, h / 2 - 6], [-vw / 2, 0, -w / 2 + 8, 0], [vw / 2, 0, w / 2 - 8, 0]]) pijl(ctx, cx + dx * 0.7, yBot - h / 2 + dy * 0.7, cx + ex, yBot - h / 2 + ey, VAC, druk, 3, 12); }
  ctx.restore(); }
function water(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 7, rgba(C.teal, 0.9)); circ(ctx, x - 7, y - 5, 4, '#E6E6E6'); circ(ctx, x + 7, y - 5, 4, '#E6E6E6'); ctx.restore(); }

// ---------- kiemschede (Darwin/Went) ----------
function kiemschede(ctx, x, y, o = {}) { const { L = 260, bend = 0, w = 34, a = 1, kapTop = 0, kapLaag = 0, top = 1, blokje = 0, blokKant = -1, aux = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // alleen het onderste deel buigt (het topje merkt het licht op; het buigen gebeurt lager)
  const Lr = L * 0.35, Lb = L * 0.65; const r1 = boog(x, y, -Math.PI / 2, Lr, 0, 10); const r2 = boog(r1.pts[10][0], r1.pts[10][1], -Math.PI / 2, Lb, bend, 30);
  const pts = r1.pts.concat(r2.pts.slice(1)); streep(ctx, pts, STENGD, w + 6); streep(ctx, pts, rgba(STENG, 0.95), w);
  const tip = pts[pts.length - 1], th = r2.th;
  if (top > 0.01) { ctx.save(); ctx.globalAlpha *= top; ctx.translate(tip[0], tip[1]); ctx.rotate(th + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, 0, w / 2 + 3, 26, 0, Math.PI, 0); shape(ctx, STENG, STENGD, 3); ctx.restore(); }
  if (kapTop > 0.01) { ctx.save(); ctx.globalAlpha *= kapTop; ctx.translate(tip[0], tip[1]); ctx.rotate(th + Math.PI / 2); ctx.beginPath(); ctx.moveTo(-w / 2 - 8, 14); ctx.lineTo(0, -46); ctx.lineTo(w / 2 + 8, 14); ctx.closePath(); shape(ctx, '#3A3F4A', '#9AA3B2', 2); ctx.restore(); }
  if (kapLaag > 0.01) { const p = pts[18]; ctx.save(); ctx.globalAlpha *= kapLaag; roundRect(ctx, p[0] - w / 2 - 8, p[1] - 30, w + 16, 60, 6); shape(ctx, '#3A3F4A', '#9AA3B2', 2); ctx.restore(); }
  if (blokje > 0.01) { ctx.save(); ctx.globalAlpha *= blokje; ctx.translate(tip[0], tip[1]); ctx.rotate(th + Math.PI / 2); const bx = blokKant < 0 ? -w / 2 - 4 : -6; roundRect(ctx, bx, -30, w / 2 + 10, 30, 4); shape(ctx, AGAR, '#B8A870', 2); ctx.restore(); }
  if (aux > 0.01) { for (let j = 0; j < 10; j++) { const u = ((j / 10 + t * 0.12) % 1), i = Math.round((1 - u) * (pts.length - 1)); const p = pts[i], q2 = pts[Math.max(0, i - 1)]; const an = Math.atan2(p[1] - q2[1], p[0] - q2[0]); const off = blokKant * w * 0.25; stip(ctx, p[0] + Math.cos(an - Math.PI / 2) * off, p[1] + Math.sin(an - Math.PI / 2) * off, 5, AUX, aux * clamp(u * 4, 0, 1)); } }
  ctx.restore(); return { tip, th, pts }; }

// ---------- stomata, banaan, kleine iconen ----------
function huidmondje(ctx, x, y, s, open, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = 6 + 14 * open; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + d * (g + 18 * s) , y, 22 * s, 46 * s, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); } ctx.beginPath(); ctx.ellipse(x, y, Math.max(1, g * 0.8), 34 * s * (0.3 + 0.7 * open), 0, 0, 6.283); shape(ctx, '#121A26', null); ctx.restore(); }
function banaan(ctx, x, y, s, rijp, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(0, 60, 70, -10); ctx.quadraticCurveTo(0, 30, -70, -10); const g = [Math.round(mix(120, 236, rijp)), Math.round(mix(190, 200, rijp)), Math.round(mix(90, 70, rijp))]; shape(ctx, `rgb(${g.join(',')})`, '#8C7A3A', 2); ctx.fillStyle = '#5A4A2A'; ctx.fillRect(-76, -14, 10, 8); if (rijp > 0.7) for (let i = 0; i < 5; i++) circ(ctx, -40 + i * 18, 8 + (i % 2) * 6, 3, rgba('#5A3A1A', (rijp - 0.7) * 3)); ctx.restore(); }
function zaadKiem(ctx, x, y, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 30, 20, 0, 0, 6.283); shape(ctx, '#C9A35C', '#8C6A3A', 2); if (k > 0.01) { streep(ctx, [[x + 10, y - 10], [x + 18, y - 10 - 50 * k]], STENG, 6); streep(ctx, [[x - 6, y + 14], [x - 10, y + 14 + 36 * k]], WORT, 4); } ctx.restore(); }
function delendeCellen(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 1 + Math.floor((t * 0.7) % 3); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { roundRect(ctx, x - 90 + i * 46, y - 60 + j * 40, 44, 38, 6); shape(ctx, rgba(C.groen, 0.18), WAND, 2); circ(ctx, x - 68 + i * 46, y - 41 + j * 40, 6, rgba(C.kern, 0.9)); } ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { lichtbundel(ctx, 1920, 300, 1100, 520, 360, 1, t); pot(ctx, 1450, 760, 1.1); kiemplant(ctx, 1450, 752, { L: 300, bend: 0.5 + 0.08 * Math.sin(t * 0.8), lw: 16, blad: 1.2 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { kamer(ctx, t);
    const tl = q.on('Twee', 1, 3.0), b = 0.95 * tl;
    lichtbundel(ctx, 1500, 260, 980, 520, 300, 1, t);
    persoon(ctx, 'daan', 520, 860, 560, { uit: q.at('ogen') < t ? 'denkt' : 'blij', pose: q.at('ogen') < t ? 'denk' : (t < q.at('Twee') ? 'wijs' : 'staan'), kijk: 1, t });
    pot(ctx, 1140, 596, 0.9); kiemplant(ctx, 1140, 590, { L: 230, bend: b, lw: 13, blad: 1 });
    if (tl > 0.01 && tl < 0.999) { metaText(ctx, 'timelapse · 2 dagen', 1140, 140, C.grain, 'center', 26); }
    tag(ctx, 'buigt naar het raam', 1140, 220, C.goud, q.on('buigt', 1) * (1 - q.on('ogen', 1)));
    tag(ctx, 'geen ogen, geen spieren', 1140, 220, C.text2, q.on('ogen', 1));
    vraagteken(ctx, 860, 360, q.on('Hoe', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const pl = q.on('plant', 2), sp = q.on('spijker', 1);
    ctx.save(); ctx.globalAlpha *= 1 - sp;
    // mens: groeit overal
    const g = 0.5 + 0.5 * Math.sin(Math.max(0, t - q.at('groeit', 1)) * 1.5); persoon(ctx, 'daan', 520, 820, 460 + 30 * q.on('groeit', 1) * g, { uit: 'neutraal', pose: 'staan', kijk: 1, t, a: 1 });
    regel(ctx, 'mens: alles groeit mee', 520, 200, q.on('mens', 1), C.text, 30, 'center', 700);
    pot(ctx, 1360, 700, 1); const kp = kiemplant(ctx, 1360, 692, { L: 260, lw: 14 }); regel(ctx, 'plant: alleen op vaste plekken', 1360, 200, pl, C.text, 30, 'center', 700);
    if (kp) { stip(ctx, kp.tip[0], kp.tip[1] - 6, 16, AUX, q.on('vaste', 1) * (0.7 + 0.3 * Math.sin(t * 4))); }
    ctx.restore();
    // boom met spijker
    ctx.save(); ctx.globalAlpha *= sp; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 820, W, 80); boom(ctx, 960, 820, 420, { spijkerY: 820 - 200 }); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(760, 820); ctx.lineTo(760, 620); ctx.stroke(); regel(ctx, '1 m', 740, 728, 1, C.text2, 28, 'right', 700); ctx.restore();
    regel(ctx, 'en over tien jaar?', 1300, 400, q.on('tien', 1), C.goud, 36, 'left', 700); vraagteken(ctx, 1380, 560, q.on('tien', 1), 120); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const grow = q.on('spijker', 1, 3), top = q.on('top', 1), wm = q.on('wortelpunt', 1), camb = q.on('dikker', 1);
    const hS = 420 + 170 * grow; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 820, W, 80);
    ctx.save(); ctx.globalAlpha *= 1 - 0.75 * camb;
    boom(ctx, 760, 820, hS * 0.9 + 0, { spijkerY: 620, dik: 34 + 26 * grow, meri: top, t }); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(560, 820); ctx.lineTo(560, 620); ctx.stroke(); regel(ctx, '1 m', 540, 728, 1, C.text2, 28, 'right', 700);
    regel(ctx, 'spijker blijft op 1 m', 860, 640, q.on('blijft', 1), C.text, 30, 'left', 700);
    regel(ctx, 'meristeem', 860, 820 - hS * 0.9 - 110, q.on('meristeem', 1), AUX, 32, 'left', 700);
    // wortels met meristeem in de punt
    ctx.save(); ctx.globalAlpha *= wm; for (const [dx, an] of [[-10, 2.2], [10, 1.0], [0, 1.6]]) { const r = boog(760 + dx, 830, an, 160, 0.3 * (an - 1.6)); streep(ctx, r.pts, WORTD, 6); const e = r.pts[r.pts.length - 1]; stip(ctx, e[0], e[1], 9, AUX, 0.7 + 0.3 * Math.sin(t * 4)); } regel(ctx, 'meristeem in elke wortelpunt', 900, 880, 1, AUX, 26, 'left', 700); ctx.restore();
    ctx.restore();
    // doorsnede: cambiumring
    if (camb > 0.01) { ctx.save(); ctx.globalAlpha *= camb; const cx = 1320, cy = 470; circ(ctx, cx, cy, 250, '#8C6A4A', '#5A3E2A', 4); for (let r = 40; r < 220; r += 32) circ(ctx, cx, cy, r, null, rgba('#C9A35C', 0.5), 2); const pr = 222 + 6 * Math.sin(t * 3); ctx.strokeStyle = AUX; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, pr, 0, 6.283); ctx.stroke(); circ(ctx, cx, cy, 250, null, '#3E2A1A', 10);
      regel(ctx, 'cambium: ring delende cellen', cx, cy + 320, q.on('cambium', 1), AUX, 32, 'center', 700); regel(ctx, 'doorsnede van de stam · de stam wordt dikker', cx, 150, 1, C.text2, 26, 'center', 600); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'micro'); const dl = q.on('delen', 1), stk = q.on('strekken', 1), dif = q.on('lager', 1), schuif = q.on('schuift', 1, 2.5);
    const x0 = 760, wC = 72, cols = 5, top = 150 - 70 * schuif; // stengeltop als kolom cellen
    // delingszone
    const yD = top + 40; for (let r = 0; r < 3; r++) for (let c = 0; c < cols; c++) { const x = x0 - cols * wC / 2 + c * wC, y = yD + r * 46; roundRect(ctx, x + 2, y + 2, wC - 4, 42, 6); shape(ctx, rgba(C.groen, 0.2), WAND, 2); circ(ctx, x + wC / 2, y + 23, 9, rgba(C.kern, 0.95)); if (dl > 0.01 && (r * cols + c) % 4 === Math.floor(t * 2) % 4) { ctx.save(); ctx.globalAlpha *= dl; ctx.strokeStyle = AUX; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + wC / 2, y + 4); ctx.lineTo(x + wC / 2, y + 40); ctx.stroke(); ctx.restore(); } }
    ctx.beginPath(); ctx.ellipse(x0, yD + 4, cols * wC / 2, 44, 0, Math.PI, 0); shape(ctx, rgba(C.groen, 0.2), WAND, 2);
    // strekkingszone
    const yS = yD + 3 * 46; const hs = [60, 90, 130, 170]; let yy = yS; ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * stk; for (let r = 0; r < 4; r++) { for (let c = 0; c < cols; c++) { const x = x0 - cols * wC / 2 + c * wC; roundRect(ctx, x + 2, yy + 2, wC - 4, hs[r] - 4, 8); shape(ctx, rgba(C.groen, 0.14), WAND, 2); roundRect(ctx, x + 10, yy + 12, wC - 20, hs[r] - 24, 8); shape(ctx, rgba(VAC, 0.3), null); } yy += hs[r]; } ctx.restore();
    // differentiatiezone
    const yDf = yy; ctx.save(); ctx.globalAlpha *= 0.3 + 0.7 * dif; for (let c = 0; c < cols; c++) { const x = x0 - cols * wC / 2 + c * wC, h = CAPTION_Y - 20 - yDf; roundRect(ctx, x + 2, yDf + 2, wC - 4, h, 6); if (c === 1) { shape(ctx, rgba(C.oker, 0.15), C.oker, 2); for (let k = yDf + 14; k < yDf + h; k += 16) { ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 8, k); ctx.lineTo(x + wC - 8, k); ctx.stroke(); } } else if (c === 3) { shape(ctx, rgba(C.teal, 0.15), C.teal, 2); for (let k = yDf + 60; k < yDf + h; k += 90) { ctx.strokeStyle = C.teal; ctx.setLineDash([4, 5]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 4, k); ctx.lineTo(x + wC - 4, k); ctx.stroke(); ctx.setLineDash([]); } } else shape(ctx, rgba(C.groen, 0.12), WAND, 2); } ctx.restore();
    // labels rechts, direct naast de zone
    const lx = x0 + cols * wC / 2 + 40;
    regel(ctx, '1  delen', lx, yD + 80, dl, AUX, 34, 'left', 700); regel(ctx, 'meristeem', lx, yD + 116, dl, C.text2, 26, 'left', 600);
    regel(ctx, '2  strekken', lx, yS + 230, stk, VAC, 34, 'left', 700); regel(ctx, 'cellen worden veel langer', lx, yS + 266, stk, C.text2, 26, 'left', 600);
    regel(ctx, '3  differentiëren', lx, Math.min(CAPTION_Y - 80, yDf + 90), q.on('differentiëren', 1), C.oker, 34, 'left', 700);
    regel(ctx, 'houtvat', x0 - cols * wC / 2 + 1.5 * wC, Math.min(CAPTION_Y - 30, yDf + 150), q.on('houtvat', 1), C.oker, 24, 'center', 700); regel(ctx, 'bastvat', x0 - cols * wC / 2 + 3.5 * wC, Math.min(CAPTION_Y - 30, yDf + 150), q.on('bastvat', 1), C.teal, 24, 'center', 700);
    if (schuif > 0.01) pijl(ctx, x0 - cols * wC / 2 - 60, 260, x0 - cols * wC / 2 - 60, 120, AUX, schuif, 5); scaleBar(ctx, 'schematisch · niet op schaal'); },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'micro'); const w0 = q.on('water', 2, 1.0), str = q.on('rekt', 1, 2.2), druk = q.on('duwt', 1) * (1 - 0.5 * str), soepel = q.on('soepeler', 1), top = q.on('top', 1);
    // links: net gedeelde cel, rechts: dezelfde cel na strekken
    const yBot = 820; plantcel(ctx, 480, yBot, 240, 200, { vac: 0.2 }); regel(ctx, 'net gedeeld', 480, yBot + 46, 1, C.text2, 28, 'center', 600);
    const vac = 0.25 + 0.75 * q.on('vacuole', 2, 2.0), h = 200 + 520 * str;
    plantcel(ctx, 960, yBot, 240, h, { vac, soepel, druk, t });
    regel(ctx, 'tot 10× zo lang', 960, yBot + 46, q.on('tien', 1), C.text, 28, 'center', 700);
    if (w0 > 0.01) for (let i = 0; i < 10; i++) { const u = ((t * 0.35 + i / 10) % 1); water(ctx, 1400 - 300 * u, yBot - 100 - i * 26 + Math.sin(i + t) * 8, w0 * (1 - u * 0.6) * (1 - 0.7 * str)); }
    regel(ctx, 'water in: osmose', 1440, 520, q.on('osmose', 1), C.teal, 32, 'left', 700);
    regel(ctx, 'vacuole', 960, yBot - h / 2 + 10, q.on('vacuole', 1) * (1 - q.on('turgor', 1)), C.text, 30, 'center', 700);
    regel(ctx, 'turgor: druk tegen de wand', 1440, 380, q.on('turgor', 1), VAC, 32, 'left', 700);
    regel(ctx, 'celwand wordt soepel', 1440, 440, soepel, WAND, 32, 'left', 700);
    tag(ctx, 'water is goedkoop', 1600, 680, C.teal, q.on('goedkoop', 1) * (1 - top));
    // vooruitblik: een stof uit de top
    if (top > 0.01) { for (let i = 0; i < 8; i++) { const u = ((t * 0.3 + i / 8) % 1); stip(ctx, 960 + (hash(i) - 0.5) * 80, 40 + u * Math.max(20, yBot - h - 50), 7, AUX, top); } regel(ctx, 'een stof uit de top', 1440, 260, top, AUX, 32, 'left', 700); }
    scaleBar(ctx, 'schematisch · niet op schaal'); },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const bo = q.on('bogen', 1, 2.0), kap = q.on('kapje', 1);
    lichtbundel(ctx, 1920, 260, 1100, 480, 320, 1, t); zonnetje(ctx, 1840, 170, 40, 1, t);
    regel(ctx, 'Charles en Francis Darwin · 1880', 140, 140, q.on('Darwin', 1), C.text2, 28, 'left', 600);
    ctx.fillStyle = '#4A3326'; ctx.fillRect(360, 780, 960, 30);
    for (let i = 0; i < 3; i++) { const x = 520 + i * 300; kiemschede(ctx, x, 780, { L: 280, bend: (i === 1 ? 0 : 0.7) * bo + (i === 1 ? 0.7 * bo * (1 - kap) : 0), kapTop: i === 1 ? kap : 0 }); }
    regel(ctx, 'kanariegras: kiemplantjes', 820, 870, q.on('kiemplantjes', 1), C.text2, 26, 'center', 600);
    regel(ctx, 'kapje op het topje', 820, 180, kap, C.text, 30, 'center', 700); vraagteken(ctx, 820, 330, q.on('Buigt', 1), 100); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const went = q.on('Went', 1), donker = q.on('donker', 1), boog2 = q.on('boog', 1, 3.0);
    ctx.save(); ctx.globalAlpha *= 1 - went;
    lichtbundel(ctx, 1920, 260, 1100, 480, 320, 1, t); ctx.fillStyle = '#4A3326'; ctx.fillRect(260, 780, 1140, 30);
    const opts = [['zonder kapje', 0.7, 0, 0], ['kapje op het topje', 0, 1, 0], ['kapje lager', 0.7, 0, 1]];
    opts.forEach(([nm, b, kt, kl], i) => { const x = 440 + i * 380; const a = i === 1 ? 1 : q.on('kapje', i === 2 ? 2 : 1); kiemschede(ctx, x, 780, { L: 280, bend: b, kapTop: kt, kapLaag: kl, a: i === 0 ? 1 : (i === 1 ? 1 : q.on('lager', 1)) }); regel(ctx, nm, x, 860, i === 2 ? q.on('lager', 1) : 1, C.text, 26, 'center', 700); });
    regel(ctx, 'het topje merkt het licht op', 820, 160, q.on('merkt', 1), C.goud, 32, 'center', 700);
    regel(ctx, 'het buigen gebeurt lager', 820, 210, q.on('buigen', 1), C.text, 30, 'center', 700);
    if (q.on('iets', 2) > 0.01) pijl(ctx, 360, 520, 360, 740, AUX, q.on('iets', 2), 5);
    ctx.restore();
    // Went
    if (went > 0.01) { ctx.save(); ctx.globalAlpha *= went; if (donker > 0.01) { ctx.fillStyle = rgba('#000000', 0.45 * donker); ctx.fillRect(0, 0, W, CAPTION_Y); }
      regel(ctx, 'Frits Went · 1926', 140, 140, 1, C.text2, 28, 'left', 600);
      const cut = q.on('eraf', 1), agar = q.on('agar', 1), op = q.on('blokje', 2);
      // links: topjes op agar
      ctx.fillStyle = '#4A3326'; ctx.fillRect(200, 780, 520, 30);
      for (let i = 0; i < 2; i++) { const x = 340 + i * 220; kiemschede(ctx, x, 780, { L: 260, top: 1 - cut }); }
      ctx.save(); ctx.globalAlpha *= agar; roundRect(ctx, 300, 330, 300, 60, 6); shape(ctx, AGAR, '#B8A870', 2); for (const dx of [340, 420, 500]) { ctx.beginPath(); ctx.ellipse(dx, 330, 20, 26, 0, Math.PI, 0); shape(ctx, STENG, STENGD, 3); } for (let j = 0; j < 8; j++) stip(ctx, 320 + j * 34, 360 + 8 * Math.sin(j + t), 5, AUX, ramp(t, q.at('agar', 1) + 0.6 + j * 0.15, 0.5)); regel(ctx, 'agar', 450, 430, 1, C.text2, 26, 'center', 700); ctx.restore();
      // rechts: blokje scheef op een stengel zonder top
      const kb = kiemschede(ctx, 1240, 780, { L: 380, w: 44, top: 0, blokje: op, blokKant: -1, bend: 0.75 * boog2, aux: q.on('stof', 1), t, a: q.on('zette', 2) });
      ctx.fillStyle = '#4A3326'; ctx.fillRect(1080, 780, 320, 30);
      regel(ctx, 'blokje op één kant', 1240, 230, q.on('scheef', 1) * (1 - boog2), C.text, 30, 'center', 700);
      regel(ctx, 'buigt weg van het blokje', 1240, 230, boog2, C.text, 30, 'center', 700);
      regel(ctx, 'in het donker', 1240, 870, donker, C.text2, 26, 'center', 600);
      tag(ctx, 'auxine: een plantenhormoon', 960, 120, AUX, q.on('naam', 1));
      ctx.restore(); } },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const aux = q.on('auxine', 1, 1.2), str = q.on('strekken', 1, 2.5), bz = q.on('buigt', 1);
    lichtbundel(ctx, 1920, 200, 1150, 460, 360, 1, t); zonnetje(ctx, 1840, 150, 40, q.on('licht', 1), t); regel(ctx, 'licht', 1700, 300, q.on('licht', 1), LICHT, 30, 'center', 700);
    // stengelstuk als twee rijen cellen: kant A = links (schaduw), kant B = rechts (licht)
    const La = 520 * (1 + 0.26 * str), Lb = 520 * (1 + 0.08 * str);
    const s = drawStrip(ctx, 820, 840, -Math.PI / 2, 120, La, Lb, { n: 7, auxA: aux, auxB: 0.15 * aux, t });
    if (s) { const e = s.end; ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(s.th + Math.PI / 2); for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.9); ctx.beginPath(); ctx.ellipse(0, -60, 26, 60, 0, 0, 6.283); shape(ctx, BLAD, STENGD, 2); ctx.restore(); } ctx.restore();
      stip(ctx, e[0], e[1], 14, AUX, q.on('top', 1) * (0.7 + 0.3 * Math.sin(t * 4)));
      regel(ctx, 'schaduwkant', s.A[20][0] - 100, s.A[20][1], q.on('schaduwkant', 1), C.text2, 30, 'right', 700);
      regel(ctx, 'lichtkant', s.B[20][0] + 90, s.B[20][1], q.on('lichtkant', 1), LICHT, 30, 'left', 700);
      regel(ctx, 'langere cellen', s.A[10][0] - 100, s.A[10][1], q.on('langer', 1), C.text, 26, 'right', 600); }
    regel(ctx, 'auxine', 300, 220, aux, AUX, 32, 'left', 700); stip(ctx, 280, 210, 8, AUX, aux);
    tag(ctx, 'fototropie', 960, 120, C.goud, q.on('fototropie', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); lichtbundel(ctx, 1920, 200, 1150, 460, 360, 1, t);
    const s = drawStrip(ctx, 820, 840, -Math.PI / 2, 120, 520 * 1.26, 520 * 1.08, { n: 7, auxA: 1, auxB: 0.15, t });
    if (s) { const e = s.end; ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(s.th + Math.PI / 2); for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.9); ctx.beginPath(); ctx.ellipse(0, -60, 26, 60, 0, 0, 6.283); shape(ctx, BLAD, STENGD, 2); ctx.restore(); } ctx.restore();
      const mB = s.B[22], mA = s.A[22];
      pijl(ctx, mB[0] + 150, mB[1], mB[0] + 30, mB[1], LICHT, q.on('lichtkant', 1), 5); kruis(ctx, mB[0] + 95, mB[1], 22, q.on('niet', 1));
      regel(ctx, 'trekt niet', mB[0] + 60, mB[1] - 50, q.on('niet', 1), C.text, 30, 'left', 700);
      for (let k = 0; k < 3; k++) { const p = s.A[10 + k * 10]; const an = Math.atan2(s.A[11 + k * 10][1] - p[1], s.A[11 + k * 10][0] - p[0]); pijl(ctx, p[0] - 60 * Math.cos(an - 1.57) * 0 - 50, p[1] + 30, p[0] - 50, p[1] - 30, C.groen, q.on('duwt', 1), 5); }
      regel(ctx, 'duwt: strekt meer', mA[0] - 120, mA[1] + 120, q.on('duwt', 1), C.groen, 30, 'right', 700); }
    tag(ctx, 'antwoord b', 960, 120, C.goud, q.on('antwoord', 1) * (1 - q.on('wil', 1)));
    tag(ctx, 'de plant wil niets', 960, 120, C.text2, q.on('wil', 1) * (1 - q.on('bladeren', 1)));
    tag(ctx, 'bladeren vangen meer licht', 960, 120, C.groen, q.on('bladeren', 1)); },

  // ---------- H5 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = rgba('#000000', 0.35); ctx.fillRect(0, 0, W, CAPTION_Y);
    const omh = q.on('omhoog', 1, 3.0), zoom = q.on('wortelmuts', 1), stat = q.on('zakken', 1, 2.0), auxR = q.on('auxine', 1, 1.0), auxS = q.on('auxine', 2, 1.0);
    regel(ctx, 'in het donker', 160, 140, 1, C.text2, 26, 'left', 600);
    // liggende kiemplant: stengel naar rechts, wortel naar links
    const cx = 760, cy = 470;
    const st = drawStrip(ctx, cx, cy, 0, 70, 340, 340 * (1 + 0.16 * omh), { n: 6, auxB: auxS, t }); // kant B = onderkant (rechts van looprichting naar rechts)
    if (st) { const e = st.end; ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(st.th + Math.PI / 2); for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.9); ctx.beginPath(); ctx.ellipse(0, -46, 20, 46, 0, 0, 6.283); shape(ctx, BLAD, STENGD, 2); ctx.restore(); } ctx.restore(); }
    const rt = drawStrip(ctx, cx, cy, Math.PI, 46, 300, 300, { n: 6, col: WORT, colD: WORTD, auxA: auxR, t, mutsje: 1 }); // kant A = onderkant voor looprichting naar links
    regel(ctx, 'stengel', cx + 170, cy + 80, 1, STENG, 28, 'center', 700); regel(ctx, 'wortel', cx - 170, cy - 60, 1, WORTD, 28, 'center', 700);
    tag(ctx, 'gravitropie', 420, 220, C.goud, q.on('gravitropie', 1) * (1 - zoom));
    // zoom op de wortelmuts: statolieten zakken
    if (rt && zoom > 0.01) { const e = rt.end; zoomCircle(ctx, 560, 670, 170, e[0], e[1], 'wortelmuts', zoom, () => { ctx.fillStyle = '#1E2638'; ctx.fillRect(380, 520, 360, 360); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const x = 420 + i * 95, y = 575 + j * 95; roundRect(ctx, x, y, 88, 88, 8); shape(ctx, rgba(WORT, 0.2), WORTD, 2); for (let k = 0; k < 3; k++) { const fy = mix(y + 22 + hash(k + i * 5 + j * 11) * 40, y + 72 - (k % 2) * 10, stat); circ(ctx, x + 20 + k * 24, fy, 8, STAT, '#B8B2A2', 1.5); } } });
      regel(ctx, 'statolieten (zetmeelkorrels)', 770, 690, q.on('statolieten', 1), C.text, 30, 'left', 700); regel(ctx, 'zakken naar de onderkant', 770, 734, stat, C.text2, 26, 'left', 600); }
    tag(ctx, 'meer auxine aan de onderkant', 1420, 820, AUX, q.on('Dus', 1));
    vraagteken(ctx, 1500, 680, q.on('doet', 1), 100); },

  s16(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('grafiek', 1), rechts = q.on('rechts', 1), boven = q.on('Boven', 1), stg = q.on('stengel', 2, 1.5), wrt = q.on('wortel', 2, 1.5), zet = q.on('Zet', 1);
    const gx = 160, gy = 200, gw = 860, gh = 560;
    ctx.save(); ctx.globalAlpha *= Math.max(gr, 0.0001);
    auxGrafiek(ctx, gx, gy, gw, gh, { assen: 1, boven, stengel: Math.max(stg, zet), wortel: Math.max(wrt, zet), markU: 0.5, mark: zet });
    ctx.restore();
    if (gr < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - gr; const ans = ramp(t, 0.3, 1.5); drawStrip(ctx, 960, 470, 0, 64, 320, 320 * 1.14, { n: 6, auxB: 1, t }); drawStrip(ctx, 960, 470, Math.PI, 44, 280, 280 * (1 + 0.12 * ans), { n: 6, col: WORT, colD: WORTD, auxA: 1, t, mutsje: 1 }); regel(ctx, 'wortel buigt omlaag', 700, 700, ans, WORT, 30, 'center', 700); ctx.restore(); }
    tag(ctx, 'de wortel is veel gevoeliger', 960, 130, WORT, q.on('gevoeliger', 1) * (1 - gr));
    // panelen rechts: dezelfde concentratie in stengel en wortel
    const ps = q.on('versnelt', 1), pr = q.on('remt', 3), bS = q.on('omhoog', 1, 2.5), bR = q.on('omlaag', 1, 2.5);
    if (zet > 0.01) { ctx.save(); ctx.globalAlpha *= zet;
      roundRect(ctx, 1110, 180, 700, 330, 18); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); roundRect(ctx, 1110, 540, 700, 330, 18); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5);
      regel(ctx, 'stengel', 1140, 230, 1, STENG, 30, 'left', 700); regel(ctx, 'wortel', 1140, 590, 1, WORT, 30, 'left', 700);
      // stengel: kant B (onder) strekt meer → buigt omhoog
      drawStrip(ctx, 1200, 400, 0, 60, 380, 380 * (1 + 0.14 * bS), { n: 6, auxB: 1, t });
      regel(ctx, 'versnelt: onderkant langer', 1780, 480, ps, C.groen, 26, 'right', 700);
      // wortel: kant A (onder bij looprichting naar rechts? → wortel loopt naar rechts) onderkant geremd
      drawStrip(ctx, 1200, 660, 0, 44, 380 * (1 + 0.08 * bR), 380, { n: 6, col: WORT, colD: WORTD, auxB: 1, t, mutsje: 1 });
      regel(ctx, 'remt: onderkant blijft korter', 1140, 850, pr, C.koraal, 26, 'left', 700);
      ctx.restore(); }
    tag(ctx, 'één hormoon, twee effecten', 960, 120, C.goud, q.on('hormoon', 1)); },

  // ---------- H6 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); pot(ctx, 960, 640, 1); kiemplant(ctx, 960, 632, { L: 300, lw: 15, blad: 1.1 });
    const k1 = q.on('Gibberelline', 1), k2 = q.on('Cytokinine', 1), k3 = q.on('Abscisinezuur', 1), k4 = q.on('ethyleen', 1);
    const box = (x, y, nm, col, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 560, 300, 18); shape(ctx, rgba(C.fill, 0.6), col, 2); regel(ctx, nm, x + 30, y + 54, 1, col, 34, 'left', 700); fn(x, y); ctx.restore(); };
    box(110, 120, 'gibberelline', C.groen, k1, (x, y) => { regel(ctx, 'stengel strekt · zaad kiemt', x + 30, y + 100, 1, C.text, 26, 'left', 600); zaadKiem(ctx, x + 380, y + 210, q.on('kiemen', 1)); pijl(ctx, x + 120, y + 260, x + 120, y + 140, C.groen, 1, 5); });
    box(1250, 120, 'cytokinine', C.teal, k2, (x, y) => { regel(ctx, 'cellen delen', x + 30, y + 100, 1, C.text, 26, 'left', 600); delendeCellen(ctx, x + 330, y + 200, t); });
    box(110, 560, 'abscisinezuur', C.oker, k3, (x, y) => { regel(ctx, 'huidmondjes dicht bij droogte', x + 30, y + 100, 1, C.text, 26, 'left', 600); huidmondje(ctx, x + 300, y + 200, 0.9, 1 - q.on('droog', 1, 1.5)); });
    box(1250, 560, 'ethyleen (gas)', C.goud, k4, (x, y) => { regel(ctx, 'vruchten rijpen', x + 30, y + 100, 1, C.text, 26, 'left', 600); banaan(ctx, x + 180, y + 200, 0.9, 1); banaan(ctx, x + 400, y + 210, 0.9, q.on('sneller', 1, 2)); for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1; stip(ctx, x + 230 + u * 130, y + 190 + Math.sin(u * 6 + i) * 20, 4, C.goud, q.on('banaan', 1) * (1 - u)); } }); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); const p1 = q.on('meristemen', 1), p2 = q.on('Cellen', 1), p3 = q.on('licht', 1), p4 = q.on('Ligt', 1), p5 = q.on('Geen', 1);
    const panel = (x, nm, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 200, 400, 560, 18); shape(ctx, rgba(C.fill, 0.45), rgba(C.line, 0.4), 1.5); regel(ctx, nm, x + 200, 250, 1, C.text, 28, 'center', 700); fn(x); ctx.restore(); };
    panel(80, 'meristemen', p1, (x) => { pot(ctx, x + 200, 620, 0.8); const k = kiemplant(ctx, x + 200, 614, { L: 220, lw: 12, root: 0 }); if (k) stip(ctx, k.tip[0], k.tip[1] - 4, 12, AUX, 0.7 + 0.3 * Math.sin(t * 4)); });
    panel(530, 'delen, strekken', p2, (x) => { plantcel(ctx, x + 120, 700, 90, 90, { vac: 0.2 }); plantcel(ctx, x + 270, 700, 90, 90 + 280 * q.on('strekken', 1, 1.5), { vac: 0.9 }); });
    panel(980, 'naar het licht', p3, (x) => { lichtbundel(ctx, x + 400, 300, x + 200, 460, 200, 1, t); drawStrip(ctx, x + 180, 720, -Math.PI / 2, 60, 360 * 1.3, 360 * 1.06, { n: 6, auxA: 1, t }); });
    panel(1430, 'op zijn kant', p4, (x) => { drawStrip(ctx, x + 180, 480, 0, 46, 180, 180 * (1 + 0.4 * q.on('omhoog', 1, 1.5)), { n: 4, auxB: 1, t }); drawStrip(ctx, x + 180, 480, Math.PI, 30, 150, 150 * (1 + 0.4 * q.on('omlaag', 1, 1.5)), { n: 4, col: WORT, colD: WORTD, auxA: 1, t, mutsje: 1 }); });
    tag(ctx, 'alleen cellen die meer of minder strekken', 960, 840, C.goud, q.on('Alleen', 1)); }
};
