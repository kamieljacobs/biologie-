// Het kabelnetwerk 2.0 — tekenhulpjes (29 okt 2026, lichte remake in de donkere stijl).
// Kleuren (brief Regeling 29 okt 2026): zenuwsignaal teal, Na⁺ oker, K⁺ groen, ATP koraal, focus goud.
const Z2 = { neuron: '#9DB0C6', neuronL: '#C9D5E3', na: C.oker, k: C.groen, sig: C.teal, atp: C.koraal, muur: '#22324F', vloer: '#2A3A58', tafel: '#8C5A3A', tafelL: '#A8704A' };
const VLOER2 = 820;

// achtergrond zonder korrel; in een cel alleen een rustige, schaarse textuur (Part C, beeldafspraken)
function bgZ(ctx, look = 'micro') { ctx.fillStyle = look === 'micro' ? C.bgMicro : C.bgSchema; ctx.fillRect(0, 0, W, H); }
function textuurIn(ctx, clipFn, n = 90, seed = 3) { ctx.save(); clipFn(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12);
  for (let i = 0; i < n; i++) { const x = hash(i * 7 + seed) * W, y = hash(i * 13 + seed * 3) * H; ctx.beginPath(); ctx.arc(x, y, 1.6 + 1.4 * hash(i * 3 + seed), 0, 6.283); ctx.fill(); } ctx.restore(); }
const fade = (t, t0, t1, d = 0.5) => ramp(t, t0, d) * (1 - ramp(t, t1, d));

// ---------- ionen: rond, met naam erin (kleur is nooit de enige drager) ----------
function ion(ctx, soort, x, y, a = 1, r = 26) { if (a <= 0.01) return; const col = soort === 'na' ? Z2.na : Z2.k; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _mixHex(col, '#121A26', 0.35), lighten(col, 0.25), 2);
  text(ctx, soort === 'na' ? 'Na⁺' : 'K⁺', x, y + r * 0.38, fTekst(Math.round(r * 1.08), 700), '#F2F2EE', 'center'); ctx.restore(); }
function plusje(ctx, x, y, a = 1, col = C.text, s = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke(); ctx.restore(); }
function minnetje(ctx, x, y, a = 1, col = C.text, s = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.stroke(); ctx.restore(); }

// ---------- membraan: stuk van een ronde cel (gebogen), buiten = boven ----------
const MEM = { cx: 960, R: 4200 };
function memY(x, yTop) { const cy = yTop + MEM.R; return cy - Math.sqrt(MEM.R * MEM.R - (x - MEM.cx) * (x - MEM.cx)); }
function memAn(x, yTop) { const cy = yTop + MEM.R; return Math.atan2(memY(x, yTop) - cy, x - MEM.cx); }
// eiwitten: [{x, soort:'kanaal'|'eiwit', open}], ionKleur = kleur van de ionen in een open kanaal
function membraanZ(ctx, yTop, t, eiw = [], o = {}) { const { a = 1, s = 1.5, ionKleur = Z2.k } = o; const cy = yTop + MEM.R;
  const E = eiw.map(e => ({ an: memAn(e.x, yTop), soort: e.soort, open: e.open || 0 }));
  const oud = C.teal; C.teal = ionKleur; // de open kanalen tonen ionen in de porie in de kleur van dat ion
  try { membraanBoog(ctx, MEM.cx, cy, MEM.R, memAn(-60, yTop), memAn(W + 60, yTop), { a, s, t, golf: 0.6, eiwitten: E, eiwitCol: '#7A8BA8' }); } finally { C.teal = oud; } }
function binnenClip(ctx, yTop) { const cy = yTop + MEM.R; ctx.beginPath(); ctx.arc(MEM.cx, cy, MEM.R - 40, 0, 6.283); }
function buitenLabels(ctx, yTop, a = 1) { metaText(ctx, 'buiten de cel', 60, yTop - 120, C.text2, 'left', 28); metaText(ctx, 'binnen in het neuron', 60, memY(60, yTop) + 150, C.text2, 'left', 28); }

// ---------- voltmeter (draaispoel), wijzer in mV ----------
function voltmeter(ctx, x, y, mv, a = 1, o = {}) { if (a <= 0.01) return; const { w = 360, h = 230, label = true } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 22); shape(ctx, '#2A3A58', C.line, 2);
  const cx = x, cy = y + h * 0.33, R = h * 0.62, an = v => Math.PI + (clamp(v, -90, 40) + 90) / 130 * Math.PI;
  ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI); ctx.stroke();
  for (const v of [-90, -70, -55, 0, 40]) { const q = an(v); ctx.beginPath(); ctx.moveTo(cx + Math.cos(q) * R, cy + Math.sin(q) * R); ctx.lineTo(cx + Math.cos(q) * (R - 16), cy + Math.sin(q) * (R - 16)); ctx.stroke(); }
  const q = an(mv); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(q) * (R - 8), cy + Math.sin(q) * (R - 8)); ctx.stroke(); circ(ctx, cx, cy, 9, C.goud);
  if (label) text(ctx, (mv > 0 ? '+' : mv < 0 ? '−' : '') + Math.abs(Math.round(mv)) + ' mV', cx, y + h / 2 - 16, fTekst(40, 700), C.text, 'center');
  ctx.restore(); }

// ---------- grafiek membraanpotentiaal ----------
const GR = { x: 1080, y: 110, w: 760, h: 420, vmin: -90, vmax: 40 };
function grY(v) { return GR.y + GR.h * (GR.vmax - v) / (GR.vmax - GR.vmin); }
function grafiekAssen(ctx, a = 1, o = {}) { if (a <= 0.01) return; const { drempel = 0, xl = 'tijd · vertraagd' } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, GR.x - 120, GR.y - 60, GR.w + 160, GR.h + 130, 18); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.5), 1.5);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(GR.x, GR.y); ctx.lineTo(GR.x, GR.y + GR.h); ctx.lineTo(GR.x + GR.w, GR.y + GR.h); ctx.stroke();
  for (const v of [30, 0, -70]) { metaText(ctx, String(v).replace('-', '−'), GR.x - 14, grY(v) + 9, C.text2, 'right', 28); }
  ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.line, 0.5); ctx.beginPath(); ctx.moveTo(GR.x, grY(0)); ctx.lineTo(GR.x + GR.w, grY(0)); ctx.moveTo(GR.x, grY(-70)); ctx.lineTo(GR.x + GR.w, grY(-70)); ctx.stroke();
  if (drempel > 0.01) { ctx.globalAlpha *= drempel; ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(GR.x, grY(-55)); ctx.lineTo(GR.x + GR.w, grY(-55)); ctx.stroke(); ctx.globalAlpha /= drempel; }
  ctx.setLineDash([]); metaText(ctx, 'mV', GR.x - 14, GR.y - 18, C.text2, 'right', 28); metaText(ctx, xl, GR.x + GR.w, GR.y + GR.h + 44, C.text2, 'right', 28); ctx.restore(); }
function grafiekLijn(ctx, f, u1, a = 1, col = Z2.sig) { if (a <= 0.01 || u1 <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
  const n = Math.ceil(240 * u1); for (let i = 0; i <= n; i++) { const u = Math.min(u1, i / 240); const x = GR.x + u * GR.w, y = grY(f(u)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  const ue = u1, xe = GR.x + ue * GR.w, ye = grY(f(ue)); circ(ctx, xe, ye, 9, col); ctx.restore(); return [xe, ye]; }

// ---------- zenuwcel horizontaal (beeldbank: zenuwcel), met de posities van de onderdelen ----------
function neuronH(ctx, x, y, x2, o = {}) { const { s = 2, a = 1, puls = -1, myeline = true, t = 0, col = Z2.neuron } = o;
  const eind = zenuwcel(ctx, x, y, { s, a, naar: [x2, y], myeline, puls, pulsCol: Z2.sig, col, seed: 3, takken: 7, axonDik: 5 });
  const L = x2 - x, seg = 46 * s, knoop = 7 * s, a0 = x + 26 * s, len = L - 60 * s; const knopen = [], worst = [];
  for (let k = 0; ; k++) { const d0 = 20 * s + k * (seg + knoop), d1 = d0 + seg; if (d1 / len > 0.97) break; worst.push(a0 + (d0 + d1) / 2 * len / len); knopen.push(a0 + d1 + knoop / 2); }
  return { eind, knopen, worst, kern: [x - 4 * s, y], dendriet: [x - 110 * s, y - 40 * s], axon: [x + L * 0.45, y] }; }

// ---------- dwarsdoorsnede van een zenuw: veel uitlopers naast elkaar ----------
function zenuwDoorsnede(ctx, x, y, r, o = {}) { const { a = 1, focus = -1, fA = 0 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.92, 0, 0, 6.283); shape(ctx, '#3A3348', '#8C7A88', 3); // zenuwschede (bindweefsel)
  const bundels = [[-0.38, -0.3, 0.42], [0.33, -0.28, 0.4], [-0.3, 0.38, 0.36], [0.35, 0.36, 0.38], [0.02, 0.02, 0.3]]; let fp = null, nr = 0;
  bundels.forEach((b, bi) => { const bx = x + b[0] * r, by = y + b[1] * r, br = b[2] * r; ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.283); shape(ctx, '#2A3044', '#7A7088', 2);
    for (let i = 0; i < 46; i++) { const an = hash(bi * 97 + i * 3) * 6.283, d = Math.sqrt(hash(bi * 31 + i * 7)) * br * 0.86; const px = bx + Math.cos(an) * d, py = by + Math.sin(an) * d; const rr = br * (0.07 + 0.06 * hash(i * 11 + bi)); const myel = hash(i * 5 + bi * 2) > 0.35;
      const isF = nr === focus; nr++; if (myel) { ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); shape(ctx, '#D8DEE8', null); }
      ctx.beginPath(); ctx.arc(px, py, rr * (myel ? 0.5 : 0.55), 0, 6.283); shape(ctx, Z2.neuron, null); if (isF) fp = [px, py, rr]; } });
  if (fp && fA > 0.01) { ctx.globalAlpha *= fA; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(fp[0], fp[1], fp[2] + 8, 0, 6.283); ctx.stroke(); }
  ctx.restore(); return fp; }

// ---------- keuken 's nachts (vlak, alleen onder de cold open en de teenscènes) ----------
function keuken(ctx, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#1B2840'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#16213A'; ctx.fillRect(0, VLOER2, W, H - VLOER2); ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, VLOER2, W, 4);
  // raam met maan
  roundRect(ctx, 1240, 140, 360, 300, 10); shape(ctx, '#24365A', '#3E5070', 6); ctx.fillStyle = '#3E5070'; ctx.fillRect(1416, 140, 8, 300); ctx.fillRect(1240, 286, 360, 8);
  circ(ctx, 1330, 210, 34, '#E8E2C8'); circ(ctx, 1346, 202, 30, '#24365A');
  ctx.restore(); }
function tafel(ctx, x, a = 1, schok = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(Math.sin(schok * 40) * 6 * schok, 0);
  ctx.fillStyle = Z2.tafel; roundRect(ctx, x - 40, 560, 520, 30, 6); ctx.fill(); ctx.fillStyle = _mixHex(Z2.tafel, '#121A26', 0.25);
  for (const px of [x - 20, x + 420]) { roundRect(ctx, px, 588, 34, VLOER2 - 588, 4); ctx.fill(); } ctx.restore(); }

// ---------- zenuwbaan langs het been van Noor (zijaanzicht, kijk = 1): teen → achterkant been → ruggenmerg ----------
function beenBaan(ctx, P, h, x, voetY) { const hh = h / 6.1; // vaste punten t.o.v. het personage (zijaanzicht, staand)
  return [[x + hh * 0.55, voetY - hh * 0.06], [x + hh * 0.05, voetY - hh * 0.12], [x - hh * 0.08, voetY - hh * 0.9], [x - hh * 0.12, voetY - hh * 1.7], [x - hh * 0.2, voetY - hh * 2.6], [x - hh * 0.32, voetY - hh * 3.3], [x - hh * 0.42, voetY - hh * 3.7]]; }
function baanTeken(ctx, pts, a = 1, col = Z2.sig, lw = 4, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); bioPad(ctx, pts); ctx.stroke(); ctx.restore(); }
function baanPunt(pts, u) { const D = bioDicht(pts, 120); let L = 0; const l = [0]; for (let i = 1; i < D.length; i++) { L += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); l.push(L); } const tg = clamp(u, 0, 1) * L; let i = l.findIndex(v => v >= tg); i = Math.max(1, i); const k = (tg - l[i - 1]) / ((l[i] - l[i - 1]) || 1); return [lerp(D[i - 1][0], D[i][0], k), lerp(D[i - 1][1], D[i][1], k)]; }
function signaal(ctx, x, y, a = 1, r = 14, col = Z2.sig) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, col, lighten(col, 0.5), 3); ctx.restore(); }

// ---------- tijdbalk 0–1 s ----------
function tijdbalk(ctx, x, y, w, a = 1, merk = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (const [u, s] of [[0, '0 s'], [0.5, '0,5 s'], [1, '1 s']]) { ctx.beginPath(); ctx.moveTo(x + u * w, y - 10); ctx.lineTo(x + u * w, y + 10); ctx.stroke(); metaText(ctx, s, x + u * w, y + 46, C.text2, 'center', 28); }
  merk.forEach(m => { if (m.a <= 0.01) return; ctx.save(); ctx.globalAlpha *= m.a; circ(ctx, x + m.u * w, y, 13, m.col || Z2.sig, '#F2F2EE', 2); naamBij(ctx, m.naam, m.meta, x + m.u * w, y - 34 - (m.hoog || 0), 1, 'center', C.text); ctx.restore(); });
  ctx.restore(); }

// ---------- vinger die op de huid drukt + receptor in de lederhuid ----------
function huidStuk(ctx, x, y, w, h, druk = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dip = (xx) => { const d = (xx - (x + w / 2)) / 150; return druk * 40 * Math.exp(-d * d); };
  // opperhuid
  ctx.beginPath(); ctx.moveTo(x, y + dip(x)); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, y + dip(xx)); ctx.lineTo(x + w, y + 70); for (let xx = x + w; xx >= x; xx -= 10) ctx.lineTo(xx, y + 70 + dip(xx) * 0.8 + Math.sin(xx / 40) * 8); ctx.closePath(); shape(ctx, '#C99A7E', '#E0B89C', 2);
  // lederhuid
  ctx.beginPath(); ctx.moveTo(x, y + 70 + dip(x) * 0.8); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, y + 70 + dip(xx) * 0.8 + Math.sin(xx / 40) * 8); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); shape(ctx, '#7E5A5A', null);
  ctx.restore(); return dip; }
function vinger(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 70, y - 420); ctx.lineTo(x - 70, y - 60); ctx.quadraticCurveTo(x - 70, y, x, y); ctx.quadraticCurveTo(x + 70, y, x + 70, y - 60); ctx.lineTo(x + 70, y - 420); ctx.closePath(); shape(ctx, '#D9A982', '#BF8C66', 2);
  roundRect(ctx, x - 44, y - 120, 88, 80, 26); shape(ctx, '#E8C2A6', '#C99A7E', 1.5); ctx.strokeStyle = '#BF8C66'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 50, y - 250); ctx.quadraticCurveTo(x, y - 240, x + 50, y - 250); ctx.stroke(); ctx.restore(); }
// lichaampje van Pacini-achtig drukzintuig: zenuwuiteinde met laagjes, plat te drukken
function drukReceptor(ctx, x, y, druk = 0, a = 1, o = {}) { if (a <= 0.01) return; const { lagen = 6 } = o; ctx.save(); ctx.globalAlpha *= a; const sx = 1 + 0.25 * druk, sy = 1 - 0.28 * druk;
  for (let i = lagen; i >= 1; i--) { ctx.beginPath(); ctx.ellipse(x, y, 34 * i * 0.28 * sx + 10, 52 * i * 0.28 * sy + 14, 0, 0, 6.283); shape(ctx, i % 2 ? '#3E4A62' : '#46546E', '#8FA0B5', 1.2); }
  ctx.strokeStyle = Z2.neuron; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 40 * sy); ctx.lineTo(x, y + 230); ctx.stroke(); ctx.restore(); }

// ---------- kleine spike-reeks (voor frequentie) ----------
function spikeReeks(ctx, x, y, w, hgt, n, a = 1, u1 = 1, col = Z2.sig, onder = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y);
  const xe = x + w * u1; for (let i = 0; i < n; i++) { const sx = x + w * (i + 0.5) / n; if (sx > xe) break; ctx.lineTo(sx - 8, y); if (onder) { ctx.lineTo(sx, y - hgt * 0.3); ctx.lineTo(sx + 8, y); } else { ctx.lineTo(sx, y - hgt); ctx.lineTo(sx + 6, y + hgt * 0.12); ctx.lineTo(sx + 14, y); } }
  ctx.lineTo(xe, y); ctx.stroke(); ctx.restore(); }

// ---------- kabel (axon) als buis, voor de race ----------
function kabel(ctx, x1, x2, y, dik, myel, a = 1, o = {}) { if (a <= 0.01) return []; const { node = -1, nodeA = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const knopen = [];
  roundRect(ctx, x1, y - dik / 2, x2 - x1, dik, dik / 2); shape(ctx, Z2.neuron, lighten(Z2.neuron, 0.3), 2);
  if (myel) { const seg = 104, gap = 16; for (let x = x1 + 10; x + seg < x2; x += seg + gap) { roundRect(ctx, x, y - dik * 0.95, seg, dik * 1.9, dik * 0.9); shape(ctx, '#DCE3EC', '#F2F2EE', 1.5); knopen.push(x + seg + gap / 2); } }
  if (myel && nodeA > 0.01) { ctx.globalAlpha *= nodeA; knopen.forEach(k => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(k, y, dik * 1.1, 0, 6.283); ctx.stroke(); }); }
  ctx.restore(); return knopen; }
