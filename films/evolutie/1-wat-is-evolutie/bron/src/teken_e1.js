// Evolutie v2 · film 1 — eigen hulpfuncties voor de animatie (23 okt 2026)
// Lieveheersbeestjes lopen met de driepootgang uit lib_dieren (houding 'lopen', t = fase) en verschuiven over de grond met de gangsnelheid;
// vliegen met houding 'vliegen' (dekschilden open), bij de landing klappen de dekschilden dicht.

const e1hex = (h1, h2, k) => { k = clamp(k, 0, 1); const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); };
const e1rot = (dx, dy) => Math.atan2(dx, -dy); // lhb kijkt bij rot 0 naar boven
const E1V = 34; // loopsnelheid (px/s per schaal 1)

// loopt van (x0,y0) naar (x1,y1), start op t0; draait daarna naar rotEind. Poten bewegen alleen tijdens lopen en draaien.
function e1loop(ctx, x0, y0, x1, y1, t0, t, s, o = {}) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), v = (o.v || E1V) * s, T = L / v, tt = t - t0;
  const r0 = o.rotStart != null ? o.rotStart : (L > 1 ? e1rot(dx, dy) : (o.rotEind || 0)), rd = L > 1 ? e1rot(dx, dy) : r0, re = o.rotEind != null ? o.rotEind : rd;
  let x = x0, y = y0, rot = r0, loopt = false;
  if (tt <= 0) { rot = o.rotStart != null ? o.rotStart : rd; }
  else if (tt < 0.35 && Math.abs(r0 - rd) > 0.01) { rot = lerp(r0, rd, ease(tt / 0.35)); loopt = true; }
  else if (tt < T + 0.35) { const u = clamp((tt - 0.35 * (Math.abs(r0 - rd) > 0.01)) / T, 0, 1); x = x0 + dx * u; y = y0 + dy * u; rot = rd; loopt = u < 1; }
  if (tt >= T + 0.35) { x = x1; y = y1; const w = tt - T - 0.35; rot = lerp(rd, re, ease(w / 0.45)); loopt = w < 0.45 && Math.abs(re - rd) > 0.02; }
  lhb(ctx, x, y, s, Object.assign({}, o, { rot, houding: loopt ? 'lopen' : undefined, t: tt }));
  return [x, y];
}
// vliegt over een boog van (x0,y0) naar (x1,y1) in dur s, landt (dekschilden dicht in 0,4 s) en draait naar rotEind
function e1vlieg(ctx, x0, y0, x1, y1, t0, dur, t, s, o = {}) {
  const tt = t - t0; if (tt < 0) return null;
  const u = clamp(tt / dur, 0, 1), uu = 1 - (1 - u) * (1 - u), h = o.boog == null ? 140 : o.boog;
  const x = lerp(x0, x1, uu), y = lerp(y0, y1, uu) - Math.sin(uu * Math.PI) * h + (u < 1 ? Math.sin(tt * 9) * 6 : 0);
  const rd = e1rot(x1 - x0, y1 - y0 - 40), w = tt - dur;
  const open = u < 1 ? 1 : 1 - ease(w / 0.4), rot = u < 1 ? rd : lerp(rd, o.rotEind != null ? o.rotEind : rd, ease((w - 0.2) / 0.6));
  const sc = s * (u < 1 ? lerp(o.s0 || 1, 1, uu) : 1);
  lhb(ctx, x, y, sc, Object.assign({}, o, { rot, open, houding: undefined }));
  return [x, y];
}

// ---- de pot met een eigen lijst knikkers (kleur per plek), zodat knikkers één voor één kunnen binnenrollen ----
function potSlot(x, y, s, i, seed = 1) { const kr = 13, kol = 9, w = 260; const rij = Math.floor(i / kol), k = i % kol, vs = (rij % 2) * kr;
  return [x + s * (-w / 2 + 26 + k * kr * 2.25 + vs + (hash(seed + i * 3.1) - 0.5) * 5), y + s * (-18 - rij * kr * 1.95 + (hash(seed + i * 5.7) - 0.5) * 4)]; }
function potCap() { let i = 0; while (-18 - Math.floor(i / 9) * 13 * 1.95 + 2 >= -240) i++; return i; }
function potKleuren(n, p, seed) { const n1 = Math.round(n * p), L = []; for (let i = 0; i < n; i++) L.push(i < n1 ? EVO.a1 : EVO.a2);
  for (let i = L.length - 1; i > 0; i--) { const j = Math.floor(hash(seed * 31 + i * 7) * (i + 1)); [L[i], L[j]] = [L[j], L[i]]; } return L; }
function potK(ctx, x, y, s, kleuren, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const seed = o.seed || 1;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -124, -260, 248, 254, 28); ctx.restore(); ctx.clip();
  kleuren.forEach((k, i) => { if (!k) return; const [kx, ky] = potSlot(x, y, s, i, seed); if (ky < y - 240 * s) return; knikker(ctx, kx, ky, 13 * s, k); if (o.ring && o.ring.includes(i)) goudRing(ctx, kx, ky, 13 * s + 6); });
  ctx.restore();
  pot(ctx, x, y, s, { n: 0, glans: true }); ctx.restore(); }

// ---- allelbalk die van links naar rechts verschijnt (u = 0..1) ----
function e1balk(ctx, x, y, w, p, u, o = {}) { if (u <= 0.01) return; ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - 10, (w + 20) * u, (o.h || 34) + 80); ctx.clip(); allelBalk(ctx, x, y, w, p, o); ctx.restore(); }

// ---- legsel: geel-oranje, rechtopstaande eitjes in een groepje ----
function legsel(ctx, x, y, s = 1, a = 1, uit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 18, 96, 34, 0, 0, 6.283); ctx.fillStyle = rgba('#3E6B48', 0.55); ctx.fill(); // blad eronder
  const P = [[-48, 0], [-24, -8], [0, -4], [24, -10], [48, 0], [-36, 16], [-12, 14], [12, 16], [36, 14], [0, 30], [-24, 30], [24, 30]];
  P.forEach(([px, py], i) => { ctx.beginPath(); ctx.ellipse(px, py - 10, 9, 15, (hash(i) - 0.5) * 0.3, 0, 6.283); shape(ctx, i < uit ? rgba('#F2E6B0', 0.5) : '#E9C34E', '#B8902E', 1.5); });
  ctx.restore(); }

// ---- larve van een lieveheersbeestje (bovenaanzicht): langgerekt, gesegmenteerd, donker met oranje vlekken, zes poten vooraan ----
function larve(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const g = Math.sin(t * 6) * 0.25; ctx.strokeStyle = '#2A2422'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (const k of [-1, 1]) [-46, -30, -14].forEach((py, i) => { const f = ((i + (k > 0 ? 1 : 0)) % 2 ? 1 : -1) * g; ctx.beginPath(); ctx.moveTo(k * 14, py); ctx.lineTo(k * 34, py - 6 + f * 14); ctx.lineTo(k * 42, py + 6 + f * 18); ctx.stroke(); });
  const seg = [[-62, 14, 11], [-48, 18, 10], [-32, 20, 10], [-16, 21, 9], [0, 21, 9], [16, 19, 9], [31, 16, 9], [45, 12, 8], [58, 8, 7], [69, 5, 6]];
  seg.forEach(([py, rx, ry], i) => { ctx.beginPath(); ctx.ellipse(0, py, rx, ry, 0, 0, 6.283); shape(ctx, i === 0 ? '#1C1B1E' : '#34323A', '#1C1B1E', 1.2);
    if (i === 3 || i === 4) for (const k of [-1, 1]) circ(ctx, k * rx * 0.6, py, 4.5, '#D9792E'); else if (i > 1 && i < 8) for (const k of [-1, 1]) circ(ctx, k * rx * 0.55, py, 2.6, '#55525C'); });
  ctx.restore(); }

// ---- pop van een lieveheersbeestje (vast op een blad), oranje met donkere vlekjes ----
function popLhb(ctx, x, y, s = 1, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 46, 40, 22, 0, 0, 6.283); ctx.fillStyle = '#2A2422'; ctx.fill(); // vervellingshuidje onderaan
  ctx.beginPath(); ctx.moveTo(-42, 30); ctx.quadraticCurveTo(-50, -40, -6 - open * 20, -66); ctx.lineTo(6 + open * 20, -66); ctx.quadraticCurveTo(50, -40, 42, 30); ctx.quadraticCurveTo(0, 46, -42, 30); shape(ctx, '#C9762E', '#8A4E1E', 2);
  ctx.fillStyle = '#5A3418'; for (const [px, py] of [[-20, -30], [20, -30], [-26, 0], [26, 0], [0, -10], [-12, 18], [12, 18]]) { ctx.beginPath(); ctx.ellipse(px, py, 6, 4, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = rgba('#5A3418', 0.6); ctx.lineWidth = 2; for (const py of [-46, -16, 12]) { ctx.beginPath(); ctx.moveTo(-36, py); ctx.quadraticCurveTo(0, py + 8, 36, py); ctx.stroke(); }
  ctx.restore(); }

// ---- stukje DNA (ladder) voor de zoomcirkel bij mutatie; één sport krijgt de mutatiekleur ----
function dnaStukje(ctx, cx, cy, w, u, t = 0) { const n = 13, amp = 52; ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const x = cx - w / 2 + (i + 0.5) * w / n, ph = i * 0.62 + t * 0.4, y1 = cy - amp * Math.cos(ph), y2 = cy + amp * Math.cos(ph);
    const mid = i === 6, col = mid ? e1hex('#9AA3B2', '#8C7BBF', u) : '#6F7C93'; ctx.strokeStyle = col; ctx.lineWidth = mid ? 9 : 7; ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
    if (mid && u > 0.05) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 14, Math.min(y1, y2) - 12, 28, Math.abs(y2 - y1) + 24, 12); ctx.stroke(); ctx.restore(); } }
  for (const k of [-1, 1]) { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = cx - w / 2 + i * w / 60, ph = ((i / 60) * n - 0.5) * 0.62 + t * 0.4; const y = cy + k * amp * Math.cos(ph); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
  ctx.restore(); }

// ---- pijl die groeit (u = 0..1) ----
function e1pijl(ctx, x1, y1, x2, y2, col, u, lw = 4) { if (u <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), col, Math.min(1, u * 3), lw); }
// gestippelde boog die groeit (u = 0..1); geeft het punt op de boog terug
function e1boog(ctx, x1, y1, x2, y2, u, col = C.goud) { const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 50; const P = (v) => [(1 - v) * (1 - v) * x1 + 2 * (1 - v) * v * cx + v * v * x2, (1 - v) * (1 - v) * y1 + 2 * (1 - v) * v * cy + v * v * y2];
  if (u > 0.01) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]); ctx.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = P(u * i / 30); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); } return P(clamp(u, 0, 1)); }

// ---- ring om ogen, neus of mond van een castpersonage (anker = teruggegeven hoofd) ----
function gezichtRing(ctx, Hd, deel, a) { if (!Hd || a <= 0.01) return; const r = Hd.r, hh = r / 0.55; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath();
  if (deel === 'ogen') ctx.ellipse(Hd.x, Hd.y + hh * 0.01, r * 0.62, r * 0.24, 0, 0, 6.283);
  else if (deel === 'neus') ctx.ellipse(Hd.x, Hd.y + hh * 0.14, r * 0.2, r * 0.22, 0, 0, 6.283);
  else ctx.ellipse(Hd.x, Hd.y + hh * 0.31, r * 0.36, r * 0.18, 0, 0, 6.283);
  ctx.stroke(); ctx.restore(); }

// ---- naam die later een toelichting krijgt (naamBij zonder en met meta, overvloeiend) ----
function naamMeta(ctx, n, m, x, y, aN, aM, align = 'left', col = C.text) { naamBij(ctx, n, null, x, y, aN * (1 - aM), align, col); naamBij(ctx, n, m, x, y, aN * aM, align, col); }

const E1_Y = [EVO.a1, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a1, EVO.a1, EVO.a2], E1_B = [EVO.a1, EVO.a1, EVO.a2, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a2];
// rij allelknikkers die één voor één verschijnen (u = 0..1 over de hele rij) met gouden ringen om de verschillen (g = 0..1)
function e1allelRij(ctx, x, y, kleuren, u, g = 0, r = 18) { kleuren.forEach((k, i) => { const v = clamp(u * kleuren.length - i, 0, 1); if (v <= 0) return; const e = ease(v);
  knikker(ctx, x + i * r * 2.5, y + (1 - e) * 20, r * (0.6 + 0.4 * e), k, e); if (g > 0 && [1, 3, 6].includes(i)) { ctx.save(); ctx.globalAlpha *= g; goudRing(ctx, x + i * r * 2.5, y, r + 7); ctx.restore(); } }); }
