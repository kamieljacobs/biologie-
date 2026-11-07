// Wat word jij? · Landbouw 1 · Meer oogst — eigen tekeningen (24 okt 2026)

// ---------- decor (ElevenLabs, alleen onder scènes die echt op die plek spelen; ±60 % over navy) ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6, dy = 0, grond = null) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, -dy, W, H); if (dy > 0 && grond) { ctx.fillStyle = grond; ctx.fillRect(0, H - dy - 2, W, dy + 2); } ctx.restore(); }

// ---------- kleine moleculen ----------
function co2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 22 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 22 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x, y, 15 * s, '#5A6170', '#9AA3B2', 2); ctx.restore(); }
function o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 11 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 11 * s, y, 13 * s, '#D8573F', '#F08A70', 2); ctx.restore(); }
function h2o(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 14 * s, '#D8573F', '#F08A70', 2); circ(ctx, x - 16 * s, y + 10 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5); circ(ctx, x + 16 * s, y + 10 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5); ctx.restore(); }
// suiker als zeshoekige ring
function suiker(ctx, x, y, s = 1, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.52; const px = x + Math.cos(an) * 16 * s, py = y + Math.sin(an) * 16 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 3 * s); ctx.restore(); }

// ---------- tomatenplant (vooraanzicht): stengel, bladeren, trossen; rijp 0..1 per tros; blad = aantal bladparen ----------
function tomatenplant(ctx, x, y, h, t = 0, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const blad = o.blad == null ? 6 : o.blad, trossen = o.trossen || [0.9, 0.5, 0.1], wieg = Math.sin(t * 0.8 + x * 0.01) * 4, hl = o.hl || {};
  ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.018; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + wieg, y - h * 0.5, x + wieg * 1.5, y - h); ctx.stroke();
  for (let i = 0; i < blad; i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06);
    ctx.save(); ctx.globalAlpha *= hl.blad ? 1 : 1; ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.008; ctx.beginPath(); ctx.moveTo(x + wieg * f, yy); ctx.quadraticCurveTo(x + z * ln * 0.5, yy - ln * 0.35, x + z * ln, yy - ln * 0.1); ctx.stroke();
    for (let k = 0; k < 3; k++) { const u = 0.45 + k * 0.25, lx = x + z * ln * u, ly = yy - ln * 0.32 * Math.sin(u * 3) - ln * 0.05; ctx.beginPath(); ctx.ellipse(lx, ly, ln * 0.17, ln * 0.09, z * (0.5 - k * 0.3), 0, 6.283); shape(ctx, hl.blad ? rgba(C.groen, 0.9) : '#4E7E52', hl.blad ? C.goud : null, hl.blad ? 3 : 1.5); } ctx.restore(); }
  trossen.forEach((r, j) => { const yy = y - h * (0.32 + j * 0.2), z = j % 2 ? 1 : -1, n = o.vrucht == null ? 5 : o.vrucht;
    ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.006; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + z * h * 0.08, yy + h * 0.02, x + z * h * 0.11, yy + h * 0.08); ctx.stroke();
    if (r < 0) { for (let k = 0; k < 4; k++) bloem(ctx, x + z * h * (0.08 + (k % 2) * 0.05), yy + h * (0.07 + k * 0.035), h * 0.0012); return; }
    for (let k = 0; k < n; k++) { const tx = x + z * h * (0.08 + (k % 2) * 0.05), ty = yy + h * (0.07 + k * 0.035), rr = h * 0.03 * (o.klein || 1), rp = clamp(r - k * 0.08, 0, 1);
      const col = rp > 0.66 ? '#D8573F' : rp > 0.33 ? '#E0904A' : '#7FAE6A'; circ(ctx, tx, ty, rr, col, hl.vrucht ? C.goud : null, hl.vrucht ? 3 : 1); } });
  ctx.restore(); }

// rij planten aan één kant (in perspectief naar achteren), voor kasscènes zonder decor-planten op de voorgrond
function plantRij(ctx, x0, y0, n, h0, dx, t, a = 1) { for (let i = n - 1; i >= 0; i--) tomatenplant(ctx, x0 + i * dx, y0 - i * 14, h0 * (1 - i * 0.12), t, { a, blad: 5, trossen: [0.8, 0.4] }); }

// CO₂-buisje langs de plantenrij, met wolkjes CO₂ die eruit komen (aan 0..1)
function co2Buis(ctx, x1, x2, y, aan = 0, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y - 3); ctx.lineTo(x2, y - 3); ctx.stroke();
  if (aan > 0.01) for (let i = 0; i < 9; i++) { const ph = (t * 0.35 + i / 9) % 1, px = x1 + (i + 0.5) / 9 * (x2 - x1) + Math.sin(t + i) * 10, py = y - 20 - ph * 220; co2(ctx, px, py, 0.7, aan * Math.sin(ph * 3.14)); }
  ctx.restore(); }

// meter met getal (ppm)
function ppmMeter(ctx, x, y, waarde, label, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 70, 260, 140, 18); shape(ctx, '#121A26', col, 3);
  text(ctx, String(Math.round(waarde)), x, y + 18, fTekst(64, 800), C.text, 'center'); metaText(ctx, 'deeltjes per miljoen', x, y + 52, C.text2, 'center', 16); regel(ctx, label, x, y - 88, 1, col, 30, 'center', 700); ctx.restore(); }

// ton met duigen; hoogtes 0..1, labels boven elke duig; water tot de laagste duig en daar over de rand naar voren
function ton(ctx, x, y, w, h, hoog, labels, a = 1, water = 1, t = 0, hlIdx = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = hoog.length, dw = w / n, laag = Math.min(...hoog), li = hoog.indexOf(laag);
  for (let i = 0; i < n; i++) { const dh = h * hoog[i], col = i === hlIdx ? C.koraal : '#8C5A3A'; roundRect(ctx, x + i * dw + 3, y - dh, dw - 6, dh, 6); shape(ctx, col, '#5A3A26', 2); }
  if (water > 0.01) { const wy = y - h * laag * water; ctx.fillStyle = rgba('#5BA4E8', 0.5); ctx.fillRect(x + 6, wy, w - 12, y - wy); ctx.strokeStyle = '#9FD0F5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 6, wy); ctx.lineTo(x + w - 6, wy); ctx.stroke();
    if (water > 0.95) { const sx = x + li * dw + 10, sw = dw - 20; ctx.fillStyle = rgba('#9FD0F5', 0.85); ctx.beginPath(); ctx.moveTo(sx, wy); ctx.lineTo(sx + sw, wy); ctx.quadraticCurveTo(sx + sw + 10, wy + 30, sx + sw - 4, y + 50); ctx.lineTo(sx + 4, y + 50); ctx.quadraticCurveTo(sx - 10, wy + 30, sx, wy); ctx.fill();
      for (let k = 0; k < 6; k++) { const ph = (t * 1.5 + k / 6) % 1; circ(ctx, sx + sw * (k + 0.5) / 6, wy + ph * (y + 50 - wy), 5, rgba('#FFFFFF', 0.7)); }
      ctx.fillStyle = rgba('#5BA4E8', 0.55); ctx.beginPath(); ctx.ellipse(sx + sw / 2, y + 58, sw * 0.9, 14, 0, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = 10; [0.25, 0.7].forEach(f => { ctx.beginPath(); ctx.moveTo(x - 4, y - h * f * laag); ctx.lineTo(x + w + 4, y - h * f * laag); ctx.stroke(); });
  for (let i = 0; i < n; i++) if (labels[i]) text(ctx, labels[i], x + (i + 0.5) * dw, y - h * hoog[i] - 16, fTekst(i === hlIdx ? 28 : 24, 800), i === hlIdx ? C.koraal : C.text, 'center');
  ctx.restore(); }

// blad met in- en uitgaande pijlen (licht, CO₂, water in; suiker en zuurstof uit)
function blad(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-60, -150, 200, 0); ctx.quadraticCurveTo(-60, 150, -200, 0); shape(ctx, rgba(C.chloro, 0.85), hl ? C.goud : '#7FC48F', hl ? 5 : 3);
  ctx.strokeStyle = '#3E7A4A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(200, 0); for (let i = -3; i <= 3; i++) { ctx.moveTo(i * 45, 0); ctx.lineTo(i * 45 + 50, i % 2 ? -60 : 60); } ctx.stroke(); ctx.restore(); }

// rubisco: kluwen-enzym met een holte; pakt = 'co2' | 'o2' | null; u 0..1 = molecuul vliegt in
function rubisco(ctx, x, y, s, a = 1, pakt = null, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // keten als kralen opgevouwen tot kluwen
  ctx.strokeStyle = rgba(C.enzym, 0.9); ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const f = i / 60, an = f * 6.283 * 2.3 + 0.4, r = 70 + 40 * Math.sin(f * 17) + 18 * Math.sin(f * 41); const px = Math.cos(an) * r, py = Math.sin(an) * r * 0.85; if (Math.abs(Math.atan2(py, px) + 1.57) < 0.42 && r > 80) { ctx.moveTo(px, py); continue; } i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 8; ctx.stroke();
  // holte bovenaan
  ctx.beginPath(); ctx.arc(0, -78, 34, 0, Math.PI); ctx.fillStyle = '#121A26'; ctx.fill();
  if (pakt) { const py = -78 - (1 - u) * 260 + Math.sin(t * 3) * 3 * (1 - u), px = (1 - u) * 160; if (pakt === 'co2') co2(ctx, px, py, 1.1); else o2(ctx, px, py, 1.1); }
  ctx.restore(); }

// grafiek fotosynthese tegen CO₂ bij weinig en veel licht; d = hoe ver de lijnen getekend zijn
function grafiekCO2(ctx, x, y, w, h, a = 1, d1 = 1, d2 = 1, mark = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'CO₂ in de lucht', 'fotosynthese');
  const curve = (max, k, d, col, lab) => { if (d <= 0.01) return; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60 * d; i++) { const f = i / 60, px = x + f * w, py = y + h - h * max * (1 - Math.exp(-f * k)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); if (d > 0.95) regel(ctx, lab, x + w + 16, y + h - h * max * (1 - Math.exp(-k)) + 10, 1, col, 26, 'left', 700); };
  curve(0.9, 3.2, d1, C.goud, 'veel licht'); curve(0.3, 5, d2, C.teal, 'weinig licht');
  [[0.29, '400'], [0.58, '800'], [0.72, '1000']].forEach(([f, s2]) => text(ctx, s2, x + f * w, y + h + 30, fTekst(20, 600), C.text2, 'center'));
  if (mark >= 0) { const px = x + mark * w; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }

// klimaatcomputer: vier schuifjes met waarden 0..1
function schuifjes(ctx, x, y, waarden, labels, a = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 560, 360, 20); shape(ctx, '#121A26', C.line, 2);
  const cols = [C.goud, C.koraal, C.grain, C.teal]; waarden.forEach((v, i) => { const sx = x + 80 + i * 130, sy = y + 60, sh = 220; roundRect(ctx, sx - 8, sy, 16, sh, 8); shape(ctx, '#2A3446', null);
    roundRect(ctx, sx - 8, sy + sh * (1 - v), 16, sh * v, 8); shape(ctx, rgba(cols[i], 0.6), null); roundRect(ctx, sx - 30, sy + sh * (1 - v) - 14, 60, 28, 10); shape(ctx, i === hl ? cols[i] : '#D4D8DE', cols[i], i === hl ? 4 : 2);
    if (i === hl) { ctx.save(); ctx.strokeStyle = cols[i]; ctx.lineWidth = 4; roundRect(ctx, sx - 52, sy - 20, 104, sh + 80, 16); ctx.stroke(); ctx.restore(); } text(ctx, labels[i], sx, y + 334, fTekst(i === hl ? 32 : 28, 800), i === hl ? cols[i] : C.text2, 'center'); }); ctx.restore(); }

// huidmondje (bovenaanzicht): twee sluitcellen; open 0..1; stroom CO₂ in, waterdamp uit
function huidmondje(ctx, x, y, s, open = 1, a = 1, t = 0, stroom = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -260, -170, 520, 340, 40); shape(ctx, rgba('#9CC79A', 0.25), rgba('#9CC79A', 0.6), 2);
  const g = 10 + 34 * open; [-1, 1].forEach(z => { ctx.beginPath(); ctx.ellipse(z * (g + 46), 0, 58, 130, 0, 0, 6.283); shape(ctx, '#5FA86E', '#3E7A4A', 4); for (let k = 0; k < 4; k++) circ(ctx, z * (g + 46) + (k % 2 ? 12 : -12), -60 + k * 40, 9, '#3E8A52'); });
  ctx.beginPath(); ctx.ellipse(0, 0, Math.max(2, g), 110 * (0.4 + 0.6 * open), 0, 0, 6.283); ctx.fillStyle = '#121A26'; ctx.fill();
  if (stroom * open > 0.05) for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; co2(ctx, -300 + ph * 300, -120 + i * 70, 0.6, stroom * open * Math.sin(ph * 3.14)); h2o(ctx, ph * 320, -100 + i * 60, 0.6, stroom * open * Math.sin(ph * 3.14)); }
  ctx.restore(); }

// grauwe schimmel: grijze pluisjes op een stengelstuk
function schimmel(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + 140); ctx.lineTo(x, y - 140); ctx.stroke();
  ctx.fillStyle = '#7A5A3A'; ctx.beginPath(); ctx.ellipse(x, y + 5, 16, 60, 0, 0, 6.283); ctx.fill();
  for (let i = 0; i < 26; i++) { const px = x - 30 + hash(i) * 60, py = y - 40 + hash(i + 50) * 90; ctx.strokeStyle = rgba('#B8BCC4', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + (hash(i + 9) - 0.5) * 30, py - 14 - hash(i + 3) * 18); ctx.stroke(); circ(ctx, px + (hash(i + 9) - 0.5) * 30, py - 14 - hash(i + 3) * 18, 4, '#C9CDD4'); }
  ctx.restore(); }

// kasdak met raam dat opengaat (open 0..1) en lampen
function kasDak(ctx, x, y, w, open = 0, lampen = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, y + 120); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w, y + 120); ctx.stroke(); ctx.fillStyle = rgba('#AFC0D0', 0.08); ctx.fill();
  ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(-0.6 * open); ctx.fillStyle = rgba('#AFC0D0', 0.25); ctx.fillRect(0, 0, w * 0.3, 14); ctx.strokeRect(0, 0, w * 0.3, 14); ctx.restore();
  for (let i = 0; i < 5; i++) { const lx = x + w * (0.15 + i * 0.175); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, y + 70); ctx.lineTo(lx, y + 120); ctx.stroke(); roundRect(ctx, lx - 22, y + 120, 44, 16, 6); shape(ctx, lampen > 0.5 ? '#F2C94C' : '#5A5E66', null); if (lampen > 0.5) { ctx.fillStyle = rgba('#F2C94C', 0.12 * lampen); ctx.beginPath(); ctx.moveTo(lx - 20, y + 136); ctx.lineTo(lx - 70, y + 330); ctx.lineTo(lx + 70, y + 330); ctx.lineTo(lx + 20, y + 136); ctx.fill(); } }
  ctx.restore(); }

// thermometer
function thermometer(ctx, x, y, h, v, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14, y - h, 28, h, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x, y + 6, 26, col, '#9AA3B2', 2); roundRect(ctx, x - 6, y - h * v, 12, h * v, 6); shape(ctx, col, null); ctx.restore(); }

// bron-en-put-plant (schema): bladeren boven als bron, vruchten en kop als put; suikertjes van blad naar stengel en dan naar tros of kop
function bronPut(ctx, x, y, h, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = o.stroom == null ? 1 : o.stroom, blad = o.blad == null ? 6 : o.blad, tr = o.trossen || [0.2, 0.15];
  tomatenplant(ctx, x, y, h, t, { blad, trossen: tr, vrucht: o.vrucht, hl: o.hl });
  if (st > 0.01) { const L = [], T = [];
    for (let i = 0; i < blad; i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06); L.push([x + z * ln * 0.7, yy - ln * 0.2, yy]); }
    tr.forEach((r, j) => { const yy = y - h * (0.32 + j * 0.2), z = j % 2 ? 1 : -1; T.push([x + z * h * 0.1, yy + h * 0.12, yy]); });
    const doel = k => (k % 5 === 0 || T.length === 0) ? [x, y - h, y - h] : (k % 5 === 4 && T.length > 1 ? T[1] : T[0]);
    for (let k = 0; k < 14; k++) { const lf = L[k % L.length], d = doel(k), ph = (t * 0.22 + k / 14) % 1;
      const d1 = Math.abs(lf[0] - x), d2 = Math.abs(lf[2] - d[2]), d3 = Math.hypot(d[0] - x, d[1] - d[2]), tot = d1 + d2 + d3, s0 = ph * tot; let px, py;
      if (s0 < d1) { const u = s0 / d1; px = lerp(lf[0], x, u); py = lerp(lf[1], lf[2], u); } else if (s0 < d1 + d2) { const u = (s0 - d1) / d2; px = x; py = lerp(lf[2], d[2], u); } else { const u = (s0 - d1 - d2) / d3; px = lerp(x, d[0], u); py = lerp(d[2], d[1], u); }
      suiker(ctx, px, py, 0.8, st * Math.min(1, 3 * Math.sin(ph * 3.14))); } }
  ctx.restore(); }

// weegschaal: links (blad) en rechts (vrucht); kant -1..1 = welke kant zwaarder
function weegschaal(ctx, x, y, kant, a = 1, l = 'blad', r = 'vruchten') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = kant * 0.22;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(x - 60, y + 200); ctx.lineTo(x + 60, y + 200); ctx.lineTo(x, y); ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(260, 0); ctx.stroke(); ctx.restore();
  const ly = y - Math.sin(an) * 260, ry = y + Math.sin(an) * 260;
  [[-260, ly, l, C.groen], [260, ry, r, '#D8573F']].forEach(([dx, py, s2, col]) => { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + dx, py); ctx.lineTo(x + dx - 70, py + 90); ctx.moveTo(x + dx, py); ctx.lineTo(x + dx + 70, py + 90); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + dx, py + 92, 90, 20, 0, 0, 3.1416); shape(ctx, rgba(col, 0.5), col, 2); text(ctx, s2, x + dx, py + 150, fTekst(30, 700), col, 'center'); });
  ctx.restore(); }

// staafgrafiek opbrengst (kilo per vierkante meter)
function opbrengst(ctx, x, y, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sc = 8.5;
  [[u1 * 51, 'Nederlandse kas', C.groen, '51'], [u2 * 8.5, 'Spanje, gemiddeld', C.oker, '± 9']].forEach(([v, lab, col, s2], i) => { const bx = x + i * 260, bh = v * sc; roundRect(ctx, bx, y - bh, 170, bh, 10); shape(ctx, rgba(col, 0.55), col, 2);
    if (v > 1) text(ctx, s2, bx + 85, y - bh - 18, fTekst(40, 800), C.text, 'center'); if (v > 0.3) text(ctx, lab, bx + 85, y + 44, fTekst(26, 700), col, 'center'); });
  metaText(ctx, 'kilo tomaten per vierkante meter per jaar', x, y - 51 * sc - 90, C.text2, 'left', 20); ctx.restore(); }

// ethyleen (C₂H₄): twee C met dubbele binding en vier H; drijft van (x1,y1) naar (x2,y2)
function c2h4(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s;
  ctx.beginPath(); ctx.moveTo(x - 14 * s, y - 4 * s); ctx.lineTo(x + 14 * s, y - 4 * s); ctx.moveTo(x - 14 * s, y + 4 * s); ctx.lineTo(x + 14 * s, y + 4 * s); [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dx, dy]) => { ctx.moveTo(x + dx * 16 * s, y); ctx.lineTo(x + dx * 32 * s, y + dy * 20 * s); }); ctx.stroke();
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dx, dy]) => circ(ctx, x + dx * 32 * s, y + dy * 20 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5)); circ(ctx, x - 16 * s, y, 13 * s, '#5A6170', '#9AA3B2', 2); circ(ctx, x + 16 * s, y, 13 * s, '#5A6170', '#9AA3B2', 2); ctx.restore(); }
function ethyleen(ctx, x1, y1, x2, y2, a = 1, t = 0) { if (a <= 0.01) return; for (let i = 0; i < 4; i++) { const ph = (t * 0.25 + i / 4) % 1; c2h4(ctx, lerp(x1, x2, ph) + Math.sin(t + i * 2) * 14, lerp(y1, y2, ph) + Math.cos(t * 1.3 + i) * 10, 0.8, a * Math.sin(ph * 3.14)); } }

// gasmotor (WKK): kast met drie pijlen eruit
function gasmotor(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 100, 260, 200, 18); shape(ctx, '#3A4458', C.line, 2); circ(ctx, x - 50, y, 40, '#2A3446', C.line, 2); ctx.save(); ctx.translate(x - 50, y); ctx.rotate(t * 3); ctx.strokeStyle = C.text2; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.moveTo(0, -30); ctx.lineTo(0, 30); ctx.stroke(); ctx.restore();
  roundRect(ctx, x + 30, y - 160, 34, 70, 6); shape(ctx, '#5A6478', null);
  const pij = [[C.goud, 'stroom', -0.9], [C.koraal, 'warmte', 0], [C.grain, 'CO₂', 0.9]]; pij.forEach(([col, lab, dy], i) => { const f = clamp(u * 3 - i, 0, 1); if (f <= 0) return; pijl(ctx, x + 140, y + dy * 80, x + 140 + 200 * f, y + dy * 110, col, 1, 6, 20); if (f > 0.9) regel(ctx, lab, x + 360, y + dy * 110 + 10, 1, col, 30, 'left', 700); });
  ctx.restore(); }

// fabriek in de haven met een leiding naar de kas
function haven(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 120, y - 120, 240, 120); ctx.fillRect(x - 90, y - 220, 40, 100); ctx.fillRect(x + 30, y - 260, 40, 140);
  ctx.fillStyle = rgba(C.water, 0.5); ctx.fillRect(x - 200, y, 400, 30);
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 120, y - 40); ctx.lineTo(x + 120 + 520 * u, y - 40); ctx.stroke(); if (u > 0.05) for (let i = 0; i < 4; i++) { const ph = (t * 0.4 + i / 4) % 1; co2(ctx, x + 140 + ph * 500 * u, y - 40, 0.55); }
  ctx.restore(); }

// boorput naar warm water diep in de aarde
function boorput(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { ctx.fillStyle = ['#4A3A2E', '#5A4434', '#6B4A30', '#7A3E2E'][i]; ctx.fillRect(x - 220, y + i * 70, 440, 70); }
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y - 40); ctx.lineTo(x, y + 280 * u); ctx.stroke(); if (u > 0.9) { ctx.fillStyle = rgba(C.koraal, 0.5); ctx.beginPath(); ctx.ellipse(x, y + 290, 120, 26, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; circ(ctx, x + 2, y + 280 - ph * 320, 8, rgba(C.koraal, Math.sin(ph * 3.14))); } }
  ctx.restore(); }

// lamp: oude SON-T (gloeit warm) of led (strakke balk); warmte-golfjes
function lamp(ctx, x, y, soort, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (soort === 'son') { ctx.beginPath(); ctx.ellipse(x, y, 90, 40, 0, 0, Math.PI); shape(ctx, '#5A6478', C.line, 2); circ(ctx, x, y + 14, 22, '#F0A040'); for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 4; ctx.beginPath(); const yy = y + 70 + i * 30 + Math.sin(t * 3 + i) * 3; ctx.moveTo(x - 60, yy); ctx.bezierCurveTo(x - 30, yy - 12, x + 30, yy + 12, x + 60, yy); ctx.stroke(); } }
  if (soort === 'son') { ctx.fillStyle = rgba('#F2C94C', 0.12); ctx.beginPath(); ctx.moveTo(x - 30, y + 30); ctx.lineTo(x - 70, y + 200); ctx.lineTo(x + 70, y + 200); ctx.lineTo(x + 30, y + 30); ctx.fill(); }
  else { ctx.fillStyle = rgba('#E8A0F0', 0.2); ctx.beginPath(); ctx.moveTo(x - 110, y + 14); ctx.lineTo(x - 200, y + 300); ctx.lineTo(x + 200, y + 300); ctx.lineTo(x + 110, y + 14); ctx.fill(); roundRect(ctx, x - 120, y - 12, 240, 24, 8); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 8; i++) circ(ctx, x - 100 + i * 28.5, y + 14, 7, i % 3 ? '#E86A9A' : '#7FA8F0'); }
  ctx.restore(); }

// regenwaterbassin met druppels en een terugloopleiding
function bassin(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 220, 50, 0, 0, 6.283); shape(ctx, rgba(C.water, 0.6), '#7FB6E8', 3);
  for (let i = 0; i < 10; i++) { const ph = (t * 0.8 + i / 10) % 1; circ(ctx, x - 180 + hash(i) * 360, y - 260 + ph * 240, 5, rgba('#7FB6E8', 0.8 * (1 - ph))); } ctx.restore(); }

// witte vlieg en sluipwesp (eenvoudig, herkenbaar)
function witteVlieg(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 30) * 0.2;
  ctx.fillStyle = '#F2F2EE'; [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.5 + fl)); ctx.beginPath(); ctx.ellipse(z * 18, -6, 22, 12, 0, 0, 6.283); ctx.fill(); ctx.restore(); }); ctx.beginPath(); ctx.ellipse(0, 0, 8, 18, 0, 0, 6.283); ctx.fillStyle = '#E0D890'; ctx.fill(); ctx.restore(); }
function sluipwesp(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 34) * 0.25;
  ctx.fillStyle = rgba('#CFE4F0', 0.6); [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.35 + fl)); ctx.beginPath(); ctx.ellipse(z * 14, -16, 26, 9, z * 0.3, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.fillStyle = '#2A2A2A'; circ(ctx, 0, -18, 8, '#2A2A2A'); ctx.beginPath(); ctx.ellipse(0, 0, 7, 12, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.ellipse(0, 22, 9, 16, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, -24); ctx.lineTo(-12, -40); ctx.moveTo(3, -24); ctx.lineTo(12, -40); ctx.stroke(); ctx.restore(); }
function hommel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 28) * 0.3;
  ctx.fillStyle = rgba('#CFE4F0', 0.55); [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.4 + fl)); ctx.beginPath(); ctx.ellipse(z * 20, -26, 26, 12, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, 0, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-30, -10, 60, 10); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(18, -24, 14, 48); ctx.restore(); circ(ctx, -32, -2, 12, '#2A2420'); ctx.restore(); }
// gele tomatenbloem
function bloem(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = i / 5 * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, 20 * s, 9 * s, an, 0, 6.283); ctx.fillStyle = '#F2C94C'; ctx.fill(); } circ(ctx, x, y, 10 * s, '#E0904A'); ctx.restore(); }

// recapkaartje
function kaartje(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 84, 14); shape(ctx, rgba(col, 0.18), col, 2); text(ctx, s2, x + w / 2, y + 54, fTekst(32, 700), C.text, 'center'); ctx.restore(); }

// plastic tunnel (Spanje): bogen met doorschijnend plastic
function tunnel(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x, y - h * 1.3, x + w, y - h * 1.3, x + w, y); ctx.closePath(); shape(ctx, rgba('#E8EEF2', 0.22), '#C9D2DA', 3);
  ctx.strokeStyle = rgba('#C9D2DA', 0.6); ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const fx = x + w * i / 5; ctx.beginPath(); ctx.moveTo(fx, y); ctx.lineTo(fx, y - h * (1 - Math.pow(2 * i / 5 - 1, 2)) * 0.98); ctx.stroke(); }
  for (let i = 0; i < 4; i++) tomatenplant(ctx, x + w * (0.2 + i * 0.2), y, h * 0.6, 0, { blad: 3, trossen: [0.8] }); ctx.restore(); }
// vlammetje (aardgas)
function vlam(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * (1 + 0.06 * Math.sin(t * 9)));
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(30, -20, 34, 10, 0, 24); ctx.bezierCurveTo(-34, 10, -30, -20, 0, -60); ctx.fillStyle = '#5BA4C9'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -24); ctx.bezierCurveTo(14, -4, 14, 10, 0, 18); ctx.bezierCurveTo(-14, 10, -14, -4, 0, -24); ctx.fillStyle = '#CFE4F0'; ctx.fill(); ctx.restore(); }
// blad van onderen met larven (schildjes) van de witte vlieg; geparasiteerd = donker
function larvenBlad(ctx, x, y, s, a = 1, para = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blad(ctx, x, y, s, 1);
  for (let i = 0; i < 7; i++) { const px = x + (hash(i + 3) - 0.5) * 220 * s, py = y + (hash(i + 11) - 0.5) * 120 * s; const p = i < 3 ? para : 0; ctx.beginPath(); ctx.ellipse(px, py, 13 * s, 9 * s, 0.3, 0, 6.283); shape(ctx, p > 0.5 ? '#3A3428' : '#EDEAD0', '#B8B490', 1.5); } ctx.restore(); }
