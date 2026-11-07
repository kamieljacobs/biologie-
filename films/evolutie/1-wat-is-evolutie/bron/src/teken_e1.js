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

// ---- review 23 okt: dag i.p.v. nacht ("zonnig kozijn") ----
const E1_DAG = { lucht: '#9CC3E0', band: '#B7D3E6', heuvel: '#6E9A62', voor: '#5C8A55', boom: '#3F6B47', glas: '#CFE2EE' };
function kozijnDag(ctx, o = {}) {
  const { glasX = 0, glasB = 1250, dorpelY = 640 } = o;
  ctx.save(); ctx.beginPath(); ctx.rect(glasX, 0, glasB, dorpelY); ctx.clip();
  ctx.fillStyle = E1_DAG.lucht; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = E1_DAG.band; ctx.fillRect(0, 420, W, 220);
  vul(ctx, [[-50, 520], [260, 470], [600, 505], [900, 450], [1300, 500], [1300, 700], [-50, 700]], E1_DAG.heuvel);
  for (const [bx, bs] of [[180, 1], [430, 0.8], [980, 1.15], [1120, 0.9]]) vul(ctx, [[bx - 60 * bs, 520], [bx, 330 * (2 - bs) * 0.5 + 200], [bx + 60 * bs, 520]], E1_DAG.boom);
  circ(ctx, 1000, 140, 78, 'rgba(255,236,170,0.35)'); circ(ctx, 1000, 140, 46, '#F6D77A');
  ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(320, 0); ctx.lineTo(80, dorpelY); ctx.lineTo(-40, dorpelY); ctx.fill();
  ctx.restore();
  const hout = '#D9D2C2', houtS = '#BDB5A3', houtL = '#ECE7DA';
  ctx.fillStyle = hout; ctx.fillRect(glasX + glasB, 0, W - glasX - glasB, dorpelY + 40);
  ctx.fillStyle = houtS; ctx.beginPath(); ctx.moveTo(glasB, 0); ctx.lineTo(glasB + 26, 0); ctx.lineTo(glasB + 26, dorpelY + 26); ctx.lineTo(glasB, dorpelY); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, dorpelY); ctx.lineTo(glasB, dorpelY); ctx.lineTo(glasB + 26, dorpelY + 26); ctx.lineTo(0, dorpelY + 26); ctx.fill();
  ctx.fillStyle = hout; ctx.fillRect(0, dorpelY + 26, W, 200);
  ctx.fillStyle = houtL; ctx.fillRect(0, dorpelY + 26, W, 10);
  ctx.fillStyle = houtS; ctx.fillRect(0, dorpelY + 226, W, 14);
  ctx.fillStyle = '#5A4A3E'; ctx.fillRect(0, dorpelY + 240, W, H - dorpelY - 240);
  for (let r = 0; r < 4; r++) for (let k = 0; k < 14; k++) { const bx = k * 150 + (r % 2) * 75 - 40, by = dorpelY + 246 + r * 52; roundRect(ctx, bx, by, 142, 46, 4); shape(ctx, '#6B4A3A', '#7A5848', 1); }
  ctx.strokeStyle = rgba(houtS, 0.6); ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(glasB + 60 + i * 95, 0); ctx.bezierCurveTo(glasB + 80 + i * 95, 200, glasB + 40 + i * 95, 400, glasB + 70 + i * 95, dorpelY); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, dorpelY + 60 + i * 40); ctx.bezierCurveTo(500, dorpelY + 50 + i * 40, 1100, dorpelY + 75 + i * 40, W, dorpelY + 58 + i * 40); ctx.stroke(); }
  // zonlicht door het raam: warme schuine vlek op de vensterbank en de stijl
  ctx.fillStyle = 'rgba(255,224,140,0.16)'; ctx.beginPath(); ctx.moveTo(300, dorpelY + 26); ctx.lineTo(1500, dorpelY + 26); ctx.lineTo(1800, dorpelY + 226); ctx.lineTo(600, dorpelY + 226); ctx.fill();
  ctx.beginPath(); ctx.moveTo(glasB + 26, 120); ctx.lineTo(W, 40); ctx.lineTo(W, dorpelY + 26); ctx.lineTo(glasB + 26, dorpelY + 26); ctx.fill();
}
function e1huis(ctx, x, y, w, h) { // huisGevel overdag (ramen = glas, niet verlicht)
  ctx.beginPath(); ctx.moveTo(x - 30, y - h); ctx.lineTo(x + w / 2, y - h - h * 0.55); ctx.lineTo(x + w + 30, y - h); ctx.closePath(); ctx.fillStyle = '#5A4650'; ctx.fill();
  ctx.fillStyle = '#7A5444'; ctx.fillRect(x, y - h, w, h);
  ctx.strokeStyle = '#8A6454'; ctx.lineWidth = 1.5; for (let r = 0; r < h / 26; r++) { ctx.beginPath(); ctx.moveTo(x, y - h + r * 26); ctx.lineTo(x + w, y - h + r * 26); ctx.stroke(); }
  const ram = (rx, ry, rw, rh) => { ctx.fillStyle = '#D9D2C2'; ctx.fillRect(rx - 10, ry - 10, rw + 20, rh + 20); ctx.fillStyle = E1_DAG.glas; ctx.fillRect(rx, ry, rw, rh); ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(rx + 8, ry + 6, rw * 0.18, rh - 12); ctx.fillStyle = '#D9D2C2'; ctx.fillRect(rx + rw / 2 - 4, ry, 8, rh); ctx.fillRect(rx, ry + rh / 2 - 4, rw, 8); };
  ram(x + w * 0.14, y - h * 0.78, w * 0.26, h * 0.32); ram(x + w * 0.6, y - h * 0.78, w * 0.26, h * 0.32);
  ctx.fillStyle = '#3A4A66'; ctx.fillRect(x + w * 0.42, y - h * 0.4, w * 0.16, h * 0.4); }
const E1_RAAM = [640 + 520 * 0.14, 760 - 330 * 0.78, 520 * 0.26, 330 * 0.32]; // linkerraam van het huis (x, y, w, h)
function e1tuinDag(ctx) { const hz = 640; ctx.fillStyle = E1_DAG.lucht; ctx.fillRect(0, 0, W, H); ctx.fillStyle = E1_DAG.band; ctx.fillRect(0, hz - 120, W, 120);
  circ(ctx, 1640, 150, 70, 'rgba(255,236,170,0.35)'); circ(ctx, 1640, 150, 42, '#F6D77A');
  vul(ctx, [[-50, hz], [300, hz - 70], [700, hz - 30], [1100, hz - 90], [1500, hz - 40], [1980, hz - 80], [1980, H], [-50, H]], E1_DAG.heuvel);
  vul(ctx, [[-50, hz + 120], [500, hz + 80], [1000, hz + 130], [1500, hz + 90], [1980, hz + 120], [1980, H], [-50, H]], E1_DAG.voor);
  e1huis(ctx, 640, 760, 520, 330);
  for (const [x, y, s] of [[300, 760, 1], [1420, 760, 1.2], [1650, 780, 0.9]]) { ctx.beginPath(); ctx.moveTo(x - 70 * s, y); ctx.lineTo(x, y - 230 * s); ctx.lineTo(x + 70 * s, y); ctx.closePath(); ctx.fillStyle = E1_DAG.boom; ctx.fill(); } }

// ---- Groot-Brittannië (silhouet, vereenvoudigd; lon/lat) ----
const GB_CONTOUR = [[-3.0, 58.6], [-1.8, 57.6], [-2.1, 57.1], [-2.5, 56.6], [-2.6, 56.05], [-1.6, 55.6], [-1.4, 54.9], [-0.6, 54.5], [0.1, 54.1], [0.1, 53.6], [0.3, 53.1], [0.4, 52.9], [1.7, 52.7], [1.7, 52.1], [1.4, 51.4], [1.4, 51.1], [0.3, 50.8], [-1.0, 50.7], [-2.0, 50.6], [-3.4, 50.6], [-4.2, 50.3], [-5.7, 50.05], [-5.0, 50.6], [-4.2, 51.1], [-3.0, 51.25], [-4.0, 51.6], [-5.3, 51.8], [-4.4, 52.2], [-4.1, 52.9], [-4.7, 52.8], [-4.4, 53.4], [-3.1, 53.3], [-3.0, 53.8], [-3.4, 54.4], [-3.1, 54.95], [-4.4, 54.7], [-5.1, 54.8], [-4.9, 55.6], [-5.6, 55.3], [-5.6, 56.0], [-5.8, 56.5], [-5.7, 57.3], [-5.8, 57.9], [-5.0, 58.6]];
function gbXY(lon, lat, cx, cy, k) { return [cx + (lon + 2.5) * 0.58 * k, cy - (lat - 54.4) * k]; }
function gbSil(ctx, cx, cy, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; vul(ctx, GB_CONTOUR.map(([lo, la]) => gbXY(lo, la, cx, cy, k)), C.fill, C.line, 3); ctx.restore(); }

// ---- allelen als paren (één paar per gen): bovenste en onderste knikker; gouden kader om de paren die verschillen ----
const E1_YP = [[EVO.a1, EVO.a2], [EVO.a2, EVO.a2], [EVO.a1, EVO.a2], [EVO.a1, EVO.a1], [EVO.a2, EVO.a2], [EVO.a1, EVO.a2], [EVO.a1, EVO.a1], [EVO.a2, EVO.a1]];
const E1_BP = [[EVO.a1, EVO.a2], [EVO.a1, EVO.a2], [EVO.a1, EVO.a2], [EVO.a1, EVO.a2], [EVO.a2, EVO.a2], [EVO.a1, EVO.a2], [EVO.a2, EVO.a2], [EVO.a2, EVO.a1]];
function e1paren(ctx, cx, y, paren, u, g = 0, r = 15, verschil = [1, 3, 6]) { const sp = r * 2.6;
  paren.forEach(([k1, k2], i) => { const v = clamp(u * paren.length - i, 0, 1); if (v <= 0) return; const e = ease(v), x = cx + (i - (paren.length - 1) / 2) * sp;
    knikker(ctx, x, y - r * 1.05 + (1 - e) * 16, r * (0.6 + 0.4 * e), k1, e); knikker(ctx, x, y + r * 1.05 + (1 - e) * 16, r * (0.6 + 0.4 * e), k2, e);
    if (g > 0 && verschil.includes(i)) { ctx.save(); ctx.globalAlpha *= g; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - r - 5, y - r * 2.05 - 5, 2 * r + 10, r * 4.1 + 10, r); ctx.stroke(); ctx.restore(); } }); }

function e1paneel(ctx, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 56, 150, 1000, 96, 12); ctx.fillStyle = 'rgba(18,26,38,0.82)'; ctx.fill(); ctx.restore(); }
