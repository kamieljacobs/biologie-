/* =====================================================================================
   Cellen · gedeelde bouwstenen voor de lessen 1–6 (31 okt 2026)
   Overgenomen uit de erfelijkheidslessen (algemene delen). Alles is 1920×1080; a = doorzichtigheid 0..1.
   Eigen tekeningen per les staan in les<n>/schermen.js met voorvoegsel L<n>_.
   ===================================================================================== */
const CH = { get vader() { return C.teal; }, get moeder() { return C.oker; }, get neutraal() { return C.paars; } };
const dk = (h, k = 0.35) => mix(h, '#000000', k);
function kruis(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, r * 0.45); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, r, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, r * 0.45); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r * 0.3, y + r * 0.7); ctx.lineTo(x + r, y - r * 0.7); ctx.stroke(); ctx.restore(); }
function zoomRand(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, null, rgba(C.line, 0.8), 4); ctx.restore(); }
// zoomcirkel met inhoud; van = [x,y] waar de stippellijnen vandaan komen
function zoom(ctx, zx, zy, zr, a, van, fn) { if (a <= 0.01) return; if (van) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); const an = Math.atan2(zy - van[1], zx - van[0]); ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.lineTo(zx + Math.cos(an + 1.9) * zr, zy + Math.sin(an + 1.9) * zr); ctx.moveTo(van[0], van[1]); ctx.lineTo(zx + Math.cos(an - 1.9) * zr, zy + Math.sin(an - 1.9) * zr); ctx.stroke(); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.clip(); ctx.fillStyle = C.bg; ctx.fill(); fn(); ctx.restore(); zoomRand(ctx, zx, zy, zr, a); }
// aanwijslijn + naam (de knop Namen verbergen geldt ook hier)
function wijs(ctx, s, x1, y1, x2, y2, a = 1, col = C.text, px = 30, align = 'center') { if (!toonNamen || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); circ(ctx, x2, y2, 4, C.line); ctx.restore(); naam(ctx, s, x1, y1 + (y1 < y2 ? -10 : 34), a, align, col, px); }
// brede kernbalk onderaan (één kernzin of conclusie)
function balk(ctx, s, x, y, w, a = 1, col = C.goud, px = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 52, w, 104, 20); shape(ctx, rgba(col, 0.12), col, 3); ctx.restore(); regel(ctx, s, x, y + 14, a, C.text, px, 'center', 700); }
// zachte, ronde celvorm: geen rechte randen
function blob(ctx, x, y, rx, ry, seed = 1, wob = 0.06) { ctx.beginPath(); for (let i = 0; i <= 64; i++) { const an = i / 64 * 6.283, w = 1 + wob * Math.sin(an * 3 + seed) + wob * 0.6 * Math.sin(an * 5 + seed * 2.1); const px = x + Math.cos(an) * rx * w, py = y + Math.sin(an) * ry * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }
// cel met kern; o.kl = membraankleur, o.kr = kernstraal, o.kdx/kdy = plek van de kern, o.geenKern
function cel(ctx, x, y, rx, ry, a = 1, o = {}) { if (a <= 0.01) return; const kl = o.kl || C.teal; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, rx, ry, o.seed || 1, o.wob == null ? 0.05 : o.wob); shape(ctx, rgba(kl, C.licht ? 0.08 : 0.12), kl, o.lw || 4);
  if (!o.geenKern) { const kx = x + (o.kdx || 0), ky = y + (o.kdy || 0), kr = o.kr || Math.min(rx, ry) * 0.34; circ(ctx, kx, ky, kr, rgba(C.paars, C.licht ? 0.14 : 0.24), C.paars, 2.5); }
  ctx.restore(); }


// vaste pseudo-toevalsreeks (zelfde beeld bij elke keer afspelen)
function toeval(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// stippenveld: n stippen in een raster binnen (x, y, w, h); kl(i) = kleur van stip i; zicht = aantal stippen dat al te zien is
function stippen(ctx, x, y, w, h, n, kl, a = 1, o = {}) { if (a <= 0.01) return; const r = o.r || Math.max(3, Math.sqrt(w * h / n) * 0.36), kol = Math.max(1, Math.round(Math.sqrt(n * w / h))), rijen = Math.ceil(n / kol), dx = w / kol, dy = h / rijen, zicht = o.zicht == null ? n : o.zicht;
  ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < Math.min(n, zicht); i++) { const c = i % kol, rr = Math.floor(i / kol); circ(ctx, x + c * dx + dx / 2, y + rr * dy + dy / 2, r, kl(i)); } ctx.restore(); }
// staafdiagram: w = [hoogtes 0..1], o.kl, o.labels (onder de staven), o.as (naam onder de as)
function histogram(ctx, x, y, w, h, waarden, a = 1, o = {}) { if (a <= 0.01) return; const n = waarden.length, bw = w / n; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  waarden.forEach((v, i) => { const bh = h * v * (o.groei == null ? 1 : o.groei); roundRect(ctx, x + i * bw + bw * 0.1, y - bh, bw * 0.8, Math.max(0.1, bh), Math.min(8, bw * 0.2)); shape(ctx, rgba(o.kl || C.teal, 0.55), o.kl || C.teal, 2); }); ctx.restore();
  (o.labels || []).forEach((l, i) => regel(ctx, l, x + i * bw + bw / 2, y + 36, a, C.text2, o.px || 24, 'center', 500)); if (o.as) metaText(ctx, o.as, x + w / 2, y + 80, C.text2, 'center', 20, a); }
// kansbalk: f = deel 0..1 gevuld met kl, tekst ernaast
function kansBalk(ctx, x, y, w, h, f, kl, a = 1, tekst = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, h / 2); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.6), 2); if (f > 0.005) { roundRect(ctx, x, y, Math.max(h, w * f), h, h / 2); shape(ctx, rgba(kl, 0.75), kl, 2); } ctx.restore(); if (tekst) regel(ctx, tekst, x + w + 24, y + h / 2 + 12, a, C.text, 34, 'left', 700); }
// breuk als tekst met streep: teller boven, noemer onder
function breuk(ctx, t, n, x, y, px = 54, a = 1, kl = C.text) { if (a <= 0.01) return; ctx.save(); ctx.font = fTekst(px, 700); const w = Math.max(ctx.measureText(String(t)).width, ctx.measureText(String(n)).width) + 12; ctx.restore(); regel(ctx, String(t), x, y - px * 0.18, a, kl, px, 'center', 700); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = Math.max(3, px * 0.07); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke(); ctx.restore(); regel(ctx, String(n), x, y + px * 0.92, a, kl, px, 'center', 700); }

/* ---------- kaarten ---------- */
function termKaart(ctx, term, uitleg, x, y, a = 1, kl = C.goud, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.font = fTekst(42, 700); const w1 = ctx.measureText(term).width; ctx.font = fTekst(30, 500); const w2 = uitleg ? ctx.measureText(uitleg).width : 0; ctx.restore();
  const bw = w || Math.max(w1, w2) + 64, bh = uitleg ? 124 : 84; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - bw / 2, y, bw, bh, 14); shape(ctx, rgba(C.bg, 0.94), kl, 2.5); ctx.restore();
  regel(ctx, term, x, y + 54, a, kl, 42, 'center', 700); if (uitleg) regel(ctx, uitleg, x, y + 100, a, C.text, 30, 'center', 500); }
function misvatting(ctx, fout, goed, x, y, w, a = 1, g = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 150, 14); shape(ctx, rgba(C.bg, 0.95), rgba(C.line, 0.7), 2); ctx.restore();
  kruis(ctx, x - w / 2 + 50, y + 46, 15, a, C.koraal); regel(ctx, fout, x - w / 2 + 90, y + 58, a, C.text2, 34, 'left', 600);
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.font = fTekst(34, 600); const fw = ctx.measureText(fout).width; ctx.beginPath(); ctx.moveTo(x - w / 2 + 88, y + 46); ctx.lineTo(x - w / 2 + 92 + fw, y + 46); ctx.stroke(); ctx.restore();
  if (g > 0.01) { vink(ctx, x - w / 2 + 50, y + 108, 15, a * g, C.groen); regel(ctx, goed, x - w / 2 + 90, y + 120, a * g, C.text, 34, 'left', 600); } }

/* ---------- vooruitblik (laatste scherm van elke les) ---------- */
function vooruitblik(ctx, S, kop, tegels) {
  const T = S.T, n = tegels.length, w = 380, gap = 40, x0 = 960 - (n * w + (n - 1) * gap) / 2;
  metaText(ctx, 'volgende keer', 960, 250, C.meta, 'center', 24, S.on(0, 0.6));
  text(ctx, kop, 960, 340, fTitel(76), C.goud, 'center');
  tegels.forEach(([titel, sub, f], i) => { const a = S.on(0, 0.6, 0.4 + i * 0.25); if (a <= 0.01) return; const x = x0 + i * (w + gap) + w / 2, y = 640;
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 210, w, 420, 24); shape(ctx, rgba(C.fill, C.licht ? 0.5 : 0.4), rgba(C.line, 0.4), 2); ctx.restore();
    f(ctx, x, y - 60, a, T); regel(ctx, titel, x, y + 110, a, C.text, 34, 'center', 700); if (sub) regel(ctx, sub, x, y + 156, a, C.text2, 26, 'center', 400); });
}
