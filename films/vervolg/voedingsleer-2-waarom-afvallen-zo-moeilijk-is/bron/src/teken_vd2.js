// Wat word jij? · Voeding en diëtetiek 2 · Waarom afvallen zo moeilijk is — eigen tekenfuncties (26 okt 2026)
// Laadvolgorde: lib.js, lib_voeding.js, lib_hormonen.js, lib_cast.js (eigen castboek), scenes.js r.1–32, brein.js, teken.js, extra.js,
// lib_bio.js, vd/teken_vd.js (gedeelde reeksbibliotheek, niet wijzigen), dan dit bestand.
// Kleuren (reeksbrief): oker = voedsel, koraal = energie, paars = hormonen, teal = zenuwsignalen, groen = positief, goud = focus.

const GROND = 860; // vloerlijn ± 80 % van de hoogte (decor praktijk volgt later)

// ---------- decor ----------
function praktijkDecor(ctx, a = 0.6) { vdDecor(ctx, a); }

// ---------- hulpjes (zoals l1 en lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function _lt2(hex, k = 0.3) { return lighten(hex, k); }
// terugverwijskaartje naar een andere film (zonder stem)
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const ww = w || ctx.measureText(s2).width + 110; roundRect(ctx, x, y, ww, 64, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 24, y + 18); ctx.lineTo(x + 48, y + 32); ctx.lineTo(x + 24, y + 46); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 64, y + 42, fTekst(28, 700), C.text, 'left'); ctx.restore(); }
// tekst die zich schrijft (u = 0..1)
function schrijf(ctx, s2, x, y, u, font, col, align = 'left') { if (u <= 0.01) return; const n = Math.round(s2.length * clamp(u, 0, 1)); if (align !== 'left') { ctx.save(); ctx.font = font; const w = ctx.measureText(s2).width; ctx.restore(); x = align === 'center' ? x - w / 2 : x - w; } text(ctx, s2.slice(0, n), x, y, font, col, 'left'); }
// pijltje omhoog of omlaag met een woord (bv. 'trek ↑'), als tag
function pijlTag(ctx, s2, x, y, col, a = 1, px = 32, align = 'center') { tag(ctx, s2, x, y, col, a, align, px); }
// maan (sikkel)
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // sikkel als één pad: linkerboog van de maan, terug langs de binnenboog
  const dx = r * 0.6, dy = -r * 0.18, R = r * 0.95, D = Math.hypot(dx, dy), k = (r * r - R * R + D * D) / (2 * D), hq = Math.sqrt(Math.max(0, r * r - k * k));
  const px = k * dx / D, py = k * dy / D, i1 = [px - hq * dy / D, py + hq * dx / D], i2 = [px + hq * dy / D, py - hq * dx / D];
  const a1 = Math.atan2(i1[1], i1[0]), a2 = Math.atan2(i2[1], i2[0]), b1 = Math.atan2(i1[1] - dy, i1[0] - dx), b2 = Math.atan2(i2[1] - dy, i2[0] - dx);
  ctx.beginPath(); ctx.arc(x, y, r, a1, a2, false); ctx.arc(x + dx, y + dy, R, b2, b1, true); ctx.closePath(); ctx.fillStyle = '#F2E2A8'; ctx.fill(); ctx.restore(); }
function sterren(ctx, x, y, w, h, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < n; k++) circ(ctx, x + hash(k * 3.1) * w, y + hash(k * 5.7) * h, 1.5 + hash(k) * 2, rgba('#F2F2EE', 0.6)); ctx.restore(); }

// ---------- hand die een riem vasthoudt (zoomcirkel cold open) ----------
function hand(ctx, x, y, s = 1, huid = '#E6BE9A', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const d = lighten(huid, -0.0), sch = '#C79A78';
  // pols en mouw (bruine trui, Joost)
  roundRect(ctx, 70, -40, 140, 80, 20); shape(ctx, '#8A5A3A', '#9E6E4C', 1.5);
  // handpalm met duim boven, vingers om de riem heen
  ctx.beginPath(); ctx.moveTo(78, -34); ctx.bezierCurveTo(40, -44, 0, -40, -14, -26); ctx.lineTo(-20, 26); ctx.bezierCurveTo(10, 40, 50, 40, 78, 34); ctx.closePath(); shape(ctx, huid, null);
  for (let k = 0; k < 4; k++) { roundRect(ctx, -34 + k * 2, -24 + k * 13, 40, 13, 6.5); shape(ctx, k % 2 ? huid : sch, null); }
  ctx.beginPath(); ctx.ellipse(10, -36, 30, 11, -0.25, 0, 6.283); shape(ctx, sch, null); // duim
  ctx.restore(); }
// riem met hand in een zoomcirkel; gat = welk gaatje (float = schuift), oud = markering van het oude gaatje
function riemBeeld(ctx, cx, cy, w, gat, o = {}) { const x0 = cx - w / 2; riem(ctx, x0, cy, w, { gat });
  if (o.oud > 0.01) { const gx = x0 + w - 60 - (o.oudGat ?? 1) * 40, gl = o.gloed || 0; ctx.save(); ctx.globalAlpha *= o.oud;
    if (gl > 0.01) { circ(ctx, gx, cy, 20 + 4 * gl, rgba(C.goud, 0.3 * gl), null); }
    ctx.setLineDash([5, 5]); circ(ctx, gx, cy, 17, null, gl > 0.5 ? C.goud : '#C9B896', 3); ctx.setLineDash([]); metaText(ctx, 'OUD', gx, cy + 72, gl > 0.5 ? C.goud : '#C9B896', 'center', 34); ctx.restore(); }
  hand(ctx, x0 + w + 20 - (o.trek || 0) * 18, cy, 1, '#E6BE9A', o.hand == null ? 1 : o.hand); }
function riemZoom(ctx, x, y, r, sx, sy, gat, caption, a = 1, o = {}) { zoomCircle(ctx, x, y, r, sx, sy, caption, a, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.fillStyle = '#8A5A3A'; ctx.fillRect(x - r, y - r, 2 * r, r * 0.62); ctx.fillStyle = '#33415C'; ctx.fillRect(x - r, y + r * 0.2, 2 * r, r); riemBeeld(ctx, x - 40, y - 10, 520, gat, o); }); }

// ---------- gewichtscurve (model, zonder getallen op de as) ----------
// vorm: omlaag (0–0,3) · vlak (0,3–0,5) · weer omhoog (0,5–1). u = hoe ver getekend. o.pijlen: [leptine, ghreline, trek, verbruik] 0..1
function _gcF(tx) { if (tx < 0.3) return 0.78 - 0.34 * ease(tx / 0.3); if (tx < 0.5) return 0.44 - 0.02 * Math.sin((tx - 0.3) / 0.2 * Math.PI); return 0.44 + 0.3 * (1 - Math.exp(-(tx - 0.5) * 4.2)); }
function gewichtCurve2(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const u = o.u == null ? 1 : o.u;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const P = tx => [x + tx * w, y + h - _gcF(tx) * h];
  if (o.rise > 0.01) { ctx.save(); ctx.globalAlpha *= o.rise; ctx.fillStyle = rgba(C.koraal, 0.14); ctx.beginPath(); ctx.moveTo(x + 0.5 * w, y + h); for (let p = 0; p <= 40; p++) { const tx = 0.5 + 0.5 * p / 40; if (tx > u) break; const [px, py] = P(tx); ctx.lineTo(px, py); } ctx.lineTo(x + Math.min(u, 1) * w, y + h); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let p = 0; p <= 100 * u; p++) { const [px, py] = P(p / 100); p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (u > 0.02 && u < 0.999 && o.punt !== false) { const [px, py] = P(u); circ(ctx, px, py, 8, C.goud, null); }
  metaText(ctx, 'GEWICHT', x, y - 18, C.text2, 'left', 28); metaText(ctx, 'TIJD', x + w, y + h + (w < 500 && (o.label || 'VOORBEELD · MODEL').length > 8 ? 80 : 40), C.text2, 'right', 28);
  if (o.label !== '') { const lb = o.label || 'VOORBEELD · MODEL'; if (w < 500 && lb.length > 8) metaText(ctx, lb, x, y + h + 40, C.grain, 'left', 28); else metaText(ctx, lb, x + w, y - 18, C.grain, 'right', 28); }
  const pj = o.pijlen; if (pj) { const L = [['leptine ↓', C.paars], ['ghreline ↑', C.paars], ['trek ↑', C.goud], ['verbruik ↓', C.koraal]], px0 = o.pijlX ?? (x + w * 0.62), py0 = o.pijlY ?? (y + 34);
    L.forEach(([s2, col], i) => pijlTag(ctx, s2, px0 + (i % 2) * (o.pijlDx ?? 220), py0 + Math.floor(i / 2) * 66, col, pj[i] || 0, 30, 'left')); }
  ctx.restore(); }
// lange tijdlijn: flauw, licht golvend verder (H4)
function jarenCurve(ctx, x, y, w, h, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let p = 0; p <= 100 * u; p++) { const tx = p / 100, v = 0.62 - 0.14 * (1 - Math.exp(-tx * 2.5)) + 0.025 * Math.sin(tx * 19); const px = x + tx * w, py = y + h - v * h; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  metaText(ctx, 'GEWICHT', x, y - 18, C.text2, 'left', 28); metaText(ctx, 'JAREN', x + w, y + h + 40, C.text2, 'right', 28); metaText(ctx, 'MODEL', x + w, y - 18, C.grain, 'right', 28); ctx.restore(); }

// ---------- energiebalans (eigen versie: labels naast de schaal, ≥ 28 px) ----------
// o.tilt (rad, + = rechts omlaag), o.eten 0..n (voedsel op de linkerschaal), o.lagen = [[hoogte, kleur, alpha]] van onder naar boven, o.hlL/o.hlR = goud oplichten, o.labels 0..1
// geeft { L:{x,y}, R:{x,y}, lagen:[{x,y,h}] } terug (y = middelpunt van de laag)
const _ETEN_STAPEL = [['boterham', -60, -40], ['appel', 40, -36], ['kaas', -10, -100], ['rijst', 60, -110], ['pizza', -60, -150], ['koekje', 30, -170]];
function balans2(ctx, cx, y, o = {}) { const a = o.a == null ? 1 : o.a; const tilt = o.tilt || 0, L = 330, R = { lagen: [] }; if (a <= 0.01) return R; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#4A5468'; ctx.beginPath(); ctx.moveTo(cx - 50, y + 330); ctx.lineTo(cx + 50, y + 330); ctx.lineTo(cx + 10, y + 6); ctx.lineTo(cx - 10, y + 6); ctx.closePath(); ctx.fill(); roundRect(ctx, cx - 120, y + 326, 240, 18, 8); shape(ctx, '#4A5468', null);
  const dx = Math.cos(tilt) * L, dy = Math.sin(tilt) * L; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - dx, y - dy); ctx.lineTo(cx + dx, y + dy); ctx.stroke(); circ(ctx, cx, y, 13, C.goud, null);
  const pan = (px, py, hl) => { const PY = py + 230; ctx.strokeStyle = rgba(C.line, 0.85); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 125, PY); ctx.moveTo(px, py); ctx.lineTo(px + 125, PY); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, PY, 135, 16, 0, 0, Math.PI); ctx.closePath(); shape(ctx, hl > 0.01 ? rgba(C.goud, 0.25 * hl + 0.0) : '#5A6A84', hl > 0.01 ? C.goud : '#8FA0B5', 1.5 + 1.5 * hl); return PY; };
  const lx = cx - dx, ly = y - dy, rx = cx + dx, ry = y + dy; const LPY = pan(lx, ly, o.hlL || 0), RPY = pan(rx, ry, o.hlR || 0);
  const ne = o.eten || 0; _ETEN_STAPEL.forEach(([k, ox, oy], i) => { const al = clamp(ne - i, 0, 1); if (al > 0.01) eten(ctx, k, lx + ox, LPY + oy + (1 - al) * -30, 0.85, al); });
  // lagen op 0,75 (past onder de touwtjes) en dekkend, zodat de touwtjes erachter vallen (beeldreview 1, punt 15)
  let yy = RPY - 4; (o.lagen || []).forEach(([hh0, col, al = 1]) => { const hh = hh0 * 0.75; if (hh <= 0.5) { R.lagen.push({ x: rx, y: yy, h: 0 }); return; } ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, rx - 100, yy - hh, 200, hh, Math.min(8, hh / 2)); shape(ctx, _mixHex(col, '#1A2740', 0.45), col, 1.8); ctx.restore(); R.lagen.push({ x: rx, y: yy - hh / 2, h: hh, top: yy - hh }); yy -= hh + 5; });
  const lab = o.labels == null ? 1 : o.labels; metaA(ctx, 'ENERGIE IN · ETEN', lx, LPY + 60, lab, C.oker, 'center', 28); metaA(ctx, 'ENERGIE UIT', rx, RPY + 60, lab, C.koraal, 'center', 28);
  ctx.restore(); R.L = { x: lx, y: LPY }; R.R = { x: rx, y: RPY }; return R; }

// ---------- BMI-balk (eigen versie: 14–36, labels 28 px) ----------
function bmiBalk2(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lo = 14, hi = 36, X = v => x + (v - lo) / (hi - lo) * w, hl = o.hl || [1, 1, 1, 1];
  const zones = [[lo, 18.5, C.teal, 'ONDERGEWICHT'], [18.5, 25, C.groen, 'GEZOND'], [25, 30, C.oker, 'OVERGEWICHT'], [30, hi, C.koraal, 'OBESITAS']];
  zones.forEach(([v0, v1, col, lab], i) => { const h = hl[i] ?? 1; ctx.fillStyle = rgba(col, 0.18 + 0.4 * h); ctx.fillRect(X(v0), y, X(v1) - X(v0), 56); metaA(ctx, lab, (X(v0) + X(v1)) / 2, y + 104, 0.45 + 0.55 * h, h > 0.5 ? C.text : C.text2, 'center', 28); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, 56); [18.5, 25, 30].forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), y - 10); ctx.lineTo(X(v), y + 66); ctx.stroke(); text(ctx, String(v).replace('.', ','), X(v), y - 22, fTekst(40, 700), C.text, 'center'); });
  if (o.waarde != null && (o.mark ?? 1) > 0.01) { ctx.save(); ctx.globalAlpha *= o.mark ?? 1; const mx = X(o.waarde); ctx.fillStyle = C.goud; ctx.fillRect(mx - 3, y - 8, 6, 72); ctx.beginPath(); ctx.moveTo(mx, y + 64); ctx.lineTo(mx - 16, y + 90); ctx.lineTo(mx + 16, y + 90); ctx.closePath(); ctx.fill(); if (o.markLabel) text(ctx, o.markLabel, mx, y - 70, fTekst(40, 800), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); return X; }

// ---------- vet rond de organen in de buik (zoomcirkel H2) ----------
function buikVet(ctx, cx, cy, r, t = 0) { ctx.fillStyle = '#3A2A30'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  // geel vetweefsel rondom, darmlussen ertussen (organen op hun plek: darmlussen in de buikholte, omringd door vet)
  for (let k = 0; k < 26; k++) { const an = hash(k * 2.3) * 6.283, d = r * (0.25 + 0.75 * hash(k * 4.1)); vetcel(ctx, cx + Math.cos(an) * d, cy + Math.sin(an) * d, 22 + 12 * hash(k * 9.3), {}); }
  const lus = [[cx - r * 0.75, cy - r * 0.15], [cx - r * 0.35, cy - r * 0.45], [cx + r * 0.05, cy - r * 0.1], [cx - r * 0.3, cy + r * 0.25], [cx + r * 0.15, cy + r * 0.5], [cx + r * 0.55, cy + r * 0.1], [cx + r * 0.35, cy - r * 0.45], [cx + r * 0.8, cy - r * 0.3]];
  buisPad(ctx, lus, r * 0.24, 1, '#D99A8A', '#B8786C', { seed: 4 }); }
// spieren van een sporter (zoomcirkel H2)
function spierBeeld(ctx, cx, cy, r) { ctx.fillStyle = '#3A2A30'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); spierBundel(ctx, cx - r * 0.85, cy, r * 1.7, { n: 6, h: r * 0.22 }); }

// ---------- risicopijlen (H2) ----------
function blokje(ctx, s2, x, y, w, col, a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 44, w, 88, 14); shape(ctx, rgba(col, 0.2), col, 2); text(ctx, s2, x, y + 12, fTekst(px, 700), C.text, 'center'); ctx.restore(); }

// ---------- maag met begin van de dunne darm, en de hersenen, voor de zoomcirkels (H3) ----------
// maag: centrum ongeveer (cx, cy); vol 0..1 rekt uit; geeft het punt van de maagportier terug
function maagDarm(ctx, cx, cy, s = 1, o = {}) { const vol = o.vol || 0; const ox = cx + 36 * s, oy = cy + 88 * s; // maagVorm-coördinaten: zie maagGhreline in teken_vd.js
  const port = [ox + (-110 + 340 * 0.6) * s, oy + (-150 + 170 * 0.6) * s];
  buisPad(ctx, [port, [port[0] + 50 * s, port[1] + 10 * s], [port[0] + 70 * s, port[1] + 80 * s], [port[0] + 30 * s, port[1] + 140 * s], [port[0] - 60 * s, port[1] + 150 * s]], 42 * s, 1, V.neutraal, C.fill, { seed: 2 });
  maagGhreline(ctx, ox, oy, s, { vol, ghreline: 0 });
  if (vol > 0.01) { ctx.save(); ctx.globalAlpha *= vol; ctx.translate(ox, oy); ctx.scale(s * (1 + 0.18 * vol), s * (1 + 0.1 * vol)); ctx.translate(-110, -150); ctx.scale(0.6, 0.6); maagPad(ctx, 0, 0, 1); ctx.restore(); ctx.save(); ctx.globalAlpha *= vol * 0.9; ctx.fillStyle = rgba(C.oker, 0.55); ctx.fill(); ctx.restore(); }
  return { port, darm: [port[0] + 40 * s, port[1] + 100 * s], midden: [cx - 20 * s, cy + 10 * s] }; }
const _STAM = [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]];
// hersenen (hoofd in profiel) met hypothalamus en hersenstam die oplichten; geeft punten terug
function hersenen2(ctx, x, y, s, o = {}) { const r = hoofdHersenen(ctx, x, y, s, { hth: o.hth || 0, t: o.t || 0 }); const st = o.stam || 0;
  if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); bioPad(ctx, _STAM.slice(0, 13).map(p => [p[0], Math.min(p[1], 200)]), true); shape(ctx, rgba(C.goud, 0.55), C.goud, 3 / s); ctx.restore(); }
  return { hth: [x, y], stam: [x - 40 * s, y + 140 * s] }; }
function hersenZoom(ctx, x, y, r, sx, sy, o = {}) { const a = o.a == null ? 1 : o.a; let P = null; const binnen = () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); P = hersenen2(ctx, x + r * 0.12, y + r * 0.02, r / 430, o); };
  if (o.rand) zoomC(ctx, x, y, r, o.caption == null ? 'HERSENEN' : o.caption, a, binnen, o.rand); else zoomCircle(ctx, x, y, r, sx, sy, o.caption == null ? 'HERSENEN' : o.caption, a, binnen);
  if (P && a > 0.01) { const nx = o.rand ? x + r + 18 : null; // kleine cirkel: namen rechts naast de cirkel, op de hoogte van het onderdeel
    naamBij(ctx, 'hypothalamus', '', nx ?? P.hth[0] + 30, o.rand ? P.hth[1] + 2 : P.hth[1] - 28, a * (o.hthNaam || 0), 'left'); naamBij(ctx, 'hersenstam', '', nx ?? P.stam[0] + 30, o.rand ? P.stam[1] + 22 : P.stam[1] + 10, a * (o.stamNaam || 0), 'left'); }
  return P; }
// zoomcirkel zonder lijnen naar de bron (BEELDAFSPRAKEN: geen wijslijnen); koppeling via de kleur van de rand en de plek naast het lichaam
function zoomC(ctx, x, y, r, caption, a, binnen, rand = C.goud, capY = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); binnen && binnen(); ctx.restore();
  ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
  if (caption) metaText(ctx, caption, x, capY ?? y + r + 40, rand, 'center', 28); ctx.restore(); }
// klein gestippeld ringetje op het lichaam in dezelfde kleur als de zoomcirkel
function bronRing(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([6, 5]); circ(ctx, x, y, r, rgba(col, 0.12), col, 3); ctx.setLineDash([]); ctx.restore(); }
// zenuwsignaal: teal lijn met lopende pulsjes van p0 naar p1
function zenuwSignaal(ctx, p0, p1, t, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const mx = (p0[0] + p1[0]) / 2 + (p1[1] - p0[1]) * 0.2, my = (p0[1] + p1[1]) / 2 - (p1[0] - p0[0]) * 0.2;
  const Q = v => [(1 - v) * (1 - v) * p0[0] + 2 * (1 - v) * v * mx + v * v * p1[0], (1 - v) * (1 - v) * p0[1] + 2 * (1 - v) * v * my + v * v * p1[1]];
  ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 30 * u; k++) { const [px, py] = Q(k / 30); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (u > 0.98) { for (let k = 0; k < 3; k++) { const v = (t * 0.6 + k / 3) % 1, [px, py] = Q(v); circ(ctx, px, py, 7, C.teal, _lt2(C.teal, 0.4), 1); } const [ex, ey] = Q(1), [qx, qy] = Q(0.93); pijl(ctx, qx, qy, ex, ey, C.teal, 1, 4, 16); }
  ctx.restore(); }
// paarse hormoonpuntjes die van p0 naar p1 reizen (via het bloed)
function hormoonStroom(ctx, p0, p1, t, a = 1, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < n; k++) { const v = (t * 0.25 + k / n) % 1, w = Math.sin(v * Math.PI); circ(ctx, lerp(p0[0], p1[0], v) + Math.sin(k * 3 + t) * 8, lerp(p0[1], p1[1], v) + Math.cos(k * 2 + t) * 8, 8, rgba(C.paars, 0.3 + 0.7 * w), _lt2(C.paars, 0.4), 1); } ctx.restore(); }
// ghreline over één dag: piek vlak vóór elke maaltijd (Cummings 2001, schematisch)
function ghrelineDag(ctx, x, y, w, h, u = 1, a = 1, eten_ = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const M = [0.22, 0.5, 0.8], f = tx => 0.3 + M.reduce((s, m) => s + 0.55 * Math.exp(-Math.pow((tx - m + 0.035) / (tx < m - 0.035 ? 0.07 : 0.028), 2)), 0);
  M.forEach((m, i) => { ctx.save(); ctx.globalAlpha *= eten_; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.oker, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + m * w, y + 10); ctx.lineTo(x + m * w, y + h); ctx.stroke(); ctx.setLineDash([]); eten(ctx, ['boterham', 'rijst', 'pizza'][i], x + m * w + 4, y + h + 52, 0.5, 1); ctx.restore(); });
  ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let p = 0; p <= 120 * u; p++) { const tx = p / 120, px = x + tx * w, py = y + h - Math.min(1, f(tx)) * h * 0.95; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  metaText(ctx, 'GHRELINE', x, y - 18, C.paars, 'left', 28); metaText(ctx, 'ÉÉN DAG', x + w, y - 18, C.text2, 'right', 28); ctx.restore(); }

// ---------- verbruik per dag: staven (H3) ----------
// delen = [[hoogte rust, hoogte bewegen]], stippel = verwacht
function verbruikStaaf(ctx, x, yb, w, rust, bew, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.leeg) { ctx.setLineDash([10, 8]); roundRect(ctx, x - w / 2, yb - o.leeg, w, o.leeg, 8); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.8), 2); ctx.setLineDash([]); }
  else { const st = o.stippelVol ? true : false; if (st) ctx.setLineDash([10, 8]);
    roundRect(ctx, x - w / 2, yb - rust, w, rust, 8); shape(ctx, rgba(C.koraal, st ? 0.12 : 0.55), C.koraal, 2);
    if (bew > 0.5) { roundRect(ctx, x - w / 2, yb - rust - bew - 5, w, bew, 8); shape(ctx, rgba(C.koraal, st ? 0.08 : 0.25 + 0.25 * (o.hlBew || 0)), o.hlBew > 0.5 ? C.goud : C.koraal, 2 + (o.hlBew || 0)); }
    ctx.setLineDash([]); if (o.namen) { metaA(ctx, 'RUST', x, yb - rust / 2 + 10, o.namen, C.text, 'center', 28); if (bew > 40) metaA(ctx, 'BEWEGEN', x, yb - rust - bew / 2 + 5, o.namen, C.text, 'center', 28); } }
  if (o.verwacht > 0.01) { ctx.save(); ctx.globalAlpha *= o.verwacht; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; roundRect(ctx, x - w / 2 - 6, yb - o.verwachtH - 6, w + 12, o.verwachtH + 6, 10); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'VERWACHT', x, yb - o.verwachtH - 22, C.text2, 'center', 28); ctx.restore(); }
  if (o.label) o.label.split('|').forEach((r, k) => metaText(ctx, r, x, yb + 42 + k * 34, C.text2, 'center', 28));
  ctx.restore(); }

// ---------- H4: kaartjes, bed, staafjes, straat, agenda ----------
function adviesKaart(ctx, x, y, w, h, kop, col, a = 1, teken = null, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = (1 - Math.min(1, a * 1.2)) * 30; ctx.translate(0, dy);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), hl > 0.5 ? C.goud : col, 2.5 + hl); roundRect(ctx, x, y, w, 64, 16); ctx.fillStyle = rgba(col, 0.25); ctx.fill();
  text(ctx, kop, x + w / 2, y + 46, fTekst(36, 800), C.text, 'center'); if (teken) { ctx.save(); ctx.beginPath(); roundRect(ctx, x + 6, y + 70, w - 12, h - 76, 12); ctx.clip(); teken(x + w / 2, y + 64 + (h - 64) / 2); ctx.restore(); } ctx.restore(); }
// Joost slapend in bed, in zijaanzicht (beeldreview 1, punt 1): hij ligt op zijn zij met het gezicht naar ons, hoofd op het kussen,
// lichaam onder de deken (de deken volgt schouder, taille, heup en benen), bril op het nachtkastje. (x, y) = midden van de matras; vloer op y + 150·s.
if (CAST.joost && CAST.joost.garderobe) CAST.joost.garderobe.slaap = { accessoire: [], heupK: 1.66, schouderK: 2.02 }; // zonder bril (die ligt op het nachtkastje)
function bedSlaap(ctx, x, y, s = 1, t = 0, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const MT = -10; // bovenkant matras
  // nachtkastje met lampje en bril
  if (o.kastje !== false) { roundRect(ctx, -430, -40, 110, 190, 6); shape(ctx, '#5A4434', '#7A5E48', 2); ctx.fillStyle = '#4A382A'; ctx.fillRect(-420, 30, 90, 4); circ(ctx, -375, 0, 5, '#C9B896', null);
    ctx.fillStyle = '#7A5E48'; ctx.fillRect(-405, -60, 8, 20); ctx.beginPath(); ctx.moveTo(-425, -60); ctx.lineTo(-377, -60); ctx.lineTo(-388, -100); ctx.lineTo(-414, -100); ctx.closePath(); shape(ctx, '#E8D8A8', '#C9B896', 1.5);
    ctx.strokeStyle = '#2A2F3E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(-363, -50, 11, 8, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-337, -50, 11, 8, 0, 0, 6.283); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-352, -52); ctx.lineTo(-348, -52); ctx.moveTo(-374, -50); ctx.lineTo(-390, -43); ctx.moveTo(-326, -50); ctx.lineTo(-312, -43); ctx.stroke(); }
  // bed: hoofdeinde, voeteneinde, pootjes, zijkant
  roundRect(ctx, -305, -170, 30, 320, 8); shape(ctx, '#6A5040', '#8A6A50', 2); roundRect(ctx, 280, -70, 26, 220, 8); shape(ctx, '#6A5040', '#8A6A50', 2);
  ctx.fillStyle = '#5A4434'; ctx.fillRect(-270, 110, 16, 40); ctx.fillRect(250, 110, 16, 40);
  roundRect(ctx, -280, 50, 565, 62, 8); shape(ctx, '#6A5040', '#8A6A50', 2);
  roundRect(ctx, -278, MT, 560, 64, 14); shape(ctx, '#E8E2D2', '#CFC7B4', 1.5); // matras
  ctx.beginPath(); ctx.ellipse(-205, MT - 22, 70, 28, 0, 0, 6.283); shape(ctx, '#F4F0E6', '#D8D0C0', 1.5); // kussen
  // Joost: vooraanzichtfiguur gedraaid, hoofd links op het kussen
  const h = 470, hh = h / 6.1, by = MT - 2 - hh * 0.95; ctx.save(); ctx.translate(250, by); ctx.rotate(-Math.PI / 2); persoon(ctx, 'joost', 0, 0, h, { uit: 'slaapt', outfit: 'slaap', t }); ctx.restore();
  // deken: van de nek tot over de voeten, bolt op bij schouder en heup, hangt over de zijkant
  const adem = 1.5 * Math.sin(t * 1.6), nek = 250 - h + hh * 1.25, top = by - hh * 1.55;
  ctx.beginPath(); ctx.moveTo(nek - 6, MT + 70); ctx.lineTo(nek - 6, top + 34); ctx.bezierCurveTo(nek - 4, top - 2 - adem, nek + 70, top - 8 - adem, nek + 125, top + 2 - adem);
  ctx.bezierCurveTo(nek + 175, top + 12, nek + 200, top + 30, nek + 230, top + 26); ctx.bezierCurveTo(nek + 275, top + 18, nek + 300, top + 14, nek + 330, top + 40);
  ctx.bezierCurveTo(250, by - hh * 0.9, 284, by - hh * 0.8, 292, by - hh * 0.4); ctx.lineTo(292, MT + 74); ctx.quadraticCurveTo(10, MT + 92, nek - 6, MT + 70); ctx.closePath(); shape(ctx, '#5B7FA8', '#7C9CC2', 2);
  ctx.strokeStyle = rgba('#F2F2EE', 0.3); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(nek + 6, top + 30); ctx.quadraticCurveTo(nek + 12, MT + 30, nek + 4, MT + 66); ctx.moveTo(nek + 160, top + 30); ctx.quadraticCurveTo(nek + 200, MT + 20, nek + 180, MT + 70); ctx.stroke();
  ctx.restore(); }
function wekker(ctx, x, y, r, uur, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.78, y - Math.cos(an) * r * 0.78); ctx.lineTo(x + Math.sin(an) * r * 0.9, y - Math.cos(an) * r * 0.9); ctx.stroke(); }
  const an = uur / 12 * 6.283; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(an) * r * 0.5, y - Math.cos(an) * r * 0.5); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - r * 0.72); ctx.stroke();
  if (lab) text(ctx, lab, x, y + r + 50, fTekst(36, 700), C.text, 'center'); ctx.restore(); }
// twee staafjes: normaal (stippel) en na kort slapen (vol), paars
function hormoonStaafjes(ctx, x, yb, naam, voor, na, u, a = 1, pijl = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 110;
  ctx.setLineDash([10, 8]); roundRect(ctx, x - w - 10, yb - voor, w, voor, 8); shape(ctx, rgba(C.paars, 0.12), rgba(C.paars, 0.8), 2); ctx.setLineDash([]);
  const hh = lerp(voor, na, u); roundRect(ctx, x + 10, yb - hh, w, hh, 8); shape(ctx, rgba(C.paars, 0.55), C.paars, 2);
  metaText(ctx, 'GOED', x - w / 2 - 10, yb + 40, C.text2, 'center', 28); metaText(ctx, 'KORT', x + w / 2 + 10, yb + 40, C.text2, 'center', 28); metaText(ctx, 'GESLAPEN', x, yb + 76, C.text2, 'center', 28);
  text(ctx, naam + (pijl ? ' ' + pijl : ''), x, yb - Math.max(voor, na) - 30, fTekst(40, 800), C.paars, 'center'); ctx.restore(); }
function lantaarn(ctx, x, yb, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#4A5468'; ctx.fillRect(x - 5, yb - h, 10, h); roundRect(ctx, x - 22, yb - h - 40, 44, 44, 8); shape(ctx, '#F2E2A8', '#4A5468', 3); ctx.restore(); }
function huisjes(ctx, x0, yb, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[0, 300, 260, '#2E3B56'], [320, 260, 320, '#33425F'], [610, 340, 240, '#2B3852'], [980, 280, 300, '#30405C'], [1290, 320, 270, '#2E3B56']].forEach(([dx, w, h, col], i) => { const x = x0 + dx;
    ctx.fillStyle = col; ctx.fillRect(x, yb - h, w, h); ctx.beginPath(); ctx.moveTo(x - 10, yb - h); ctx.lineTo(x + w / 2, yb - h - 110); ctx.lineTo(x + w + 10, yb - h); ctx.closePath(); ctx.fillStyle = '#26324A'; ctx.fill();
    for (let k = 0; k < 2; k++) { roundRect(ctx, x + 40 + k * (w - 130), yb - h + 50, 50, 64, 4); ctx.fillStyle = (i + k) % 3 ? rgba('#F2E2A8', 0.55) : '#1E2A40'; ctx.fill(); } }); ctx.restore(); }
function agenda(ctx, x, y, s = 1, a = 1, mark = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -150, 340, 300, 14); shape(ctx, '#E8E2D2', '#C8C0AC', 2); roundRect(ctx, -170, -150, 340, 60, 14); ctx.fillStyle = '#5E8A6A'; ctx.fill(); ctx.fillStyle = '#5E8A6A'; ctx.fillRect(-170, -110, 340, 20);
  text(ctx, 'AGENDA', 0, -108, fMeta(28), '#F2F2EE', 'center');
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const cx = -140 + c * 56, cy = -62 + r * 52; roundRect(ctx, cx - 4, cy, 48, 40, 5); ctx.fillStyle = '#D9D2C2'; ctx.fill(); }
  if (mark > 0.01) { ctx.save(); ctx.globalAlpha *= mark; const cx = -140 + 4 * 56 + 20, cy = -62 + 3 * 52 + 20; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(cx, cy, 36, 30, 0, 0, 6.283 * mark); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// hl = { deel, a }: het begin van de meta-regel (bv. 'HAN · NIJMEGEN') licht goud op
function opleidingKaart(ctx, x, y, w, niv, naam, meta, a = 1, col = C.groen, hl = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 18); shape(ctx, rgba('#0D1420', 0.88), col, 2); text(ctx, niv, x + 50, y + 88, fTitel(52), col); text(ctx, naam, x + 190, y + 78, fTekst(44, 700), C.text); metaText(ctx, meta, x + 190, y + 120, C.grain, 'left', 28);
  if (hl && hl.a > 0.01) { ctx.save(); ctx.globalAlpha *= hl.a; metaText(ctx, hl.deel, x + 190, y + 120, C.goud, 'left', 28); ctx.restore(); } ctx.restore(); }

// ---------- cast: Dennis als sporter (beeldreview 1, punt 11): korte broek en een nummer op het shirt ----------
if (CAST.dennis && CAST.dennis.garderobe) CAST.dennis.garderobe.sporter = Object.assign({}, CAST.dennis.garderobe.sport, { kort: true });
// nummer op de borst van een staand personage in vooraanzicht; h = getekende lengte, x = midden
function shirtNummer(ctx, x, h, nr, a = 1, voet = GROND) { if (a <= 0.01) return; const hh = h / 6.1, y = voet - h + hh * 2.45; ctx.save(); ctx.globalAlpha *= a * 0.92; text(ctx, nr, x, y, fTekst(Math.round(hh * 0.62), 800), '#F2F2EE', 'center'); ctx.restore(); }
// Hanneke is ± 0,93 van Joosts lengte (beeldreview 1, punt 19); geeft de h voor persoon() (die vermenigvuldigt met haar castlengte 0,98)
function hanH(hJoost) { return hJoost * 0.93 / 0.98; }

// eindkaart: zes regels uit segments.json, zoals de andere films van de reeks (punt 24 van beeldreview 1 niet overgenomen)
