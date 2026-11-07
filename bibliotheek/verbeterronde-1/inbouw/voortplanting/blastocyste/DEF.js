// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom, met tight junctions (wordt de placenta); binnenste celmassa (embryoblast) als klompje
// ronde cellen aan één kant (wordt het kind); holte vol vocht (blastocoel). PGT (o.gat 0..1): met een dunne glazen
// pipet door een opening in de zona worden 5–10 trofoblastcellen weggezogen, aan de kant tegenover de celmassa.
// Uitkomen (o.hatch 0..1, eind week 1): de zona wordt dunner, scheurt op één plek, de blastocyste perst zich door de
// opening naar buiten (insnoering in de opening) en laat de lege zona achter; daarna kan ze zich innestelen (dag 6).
// Bron: Sadler h. 3; WSU Gross Anatomy 'Week 1 of human development'; UNSW Embryology (hatching, assisted hatching);
// ESHRE PGT-consortium. Bekende fouten: ring van gelijke rondjes; gat dat niet te zien is; uitkomen als verdwijnende zona.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1, hatch = 0 } = o; if (a <= 0.01) return;
  const h = clamp(hatch, 0, 1), uit = icm + Math.PI; // opening tegenover de celmassa
  const ux = Math.cos(uit), uy = Math.sin(uit);
  const ret = { icm: [0, 0], tegenover: [x + ux * r * 0.9, y + uy * r * 0.9] };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const opening = Math.max(gat > 0.01 ? 0.18 * gat : 0, h > 0 ? lerp(0.12, 0.45, clamp(h * 2, 0, 1)) : 0);
  // zona (dunner bij uitkomen, met opening)
  if (zona > 0.01) { const zw = Math.max(2, r * 0.05 * (1 - 0.45 * h)); ctx.beginPath(); if (opening > 0) ctx.arc(x, y, r * 1.1, uit + opening, uit - opening + 6.283); else ctx.arc(x, y, r * 1.1, 0, 6.283);
    ctx.strokeStyle = rgba('#F6EEDC', 0.75 * zona); ctx.lineWidth = zw; ctx.stroke(); if (!opening) { ctx.fillStyle = rgba('#F6EEDC', 0.1 * zona); ctx.fill(); } }
  // de blastocyste zelf: bij uitkomen schuift het midden door de opening naar buiten; insnoering bij de opening
  const sh = ease(h) * r * 1.6, cx0 = x + ux * sh, cy0 = y + uy * sh;
  const n = 26, cel = [];
  for (let k = 0; k < n; k++) { const an = k / n * 6.283; let px = cx0 + Math.cos(an) * r * 0.88, py = cy0 + Math.sin(an) * r * 0.88;
    if (h > 0.01) { // punten die nog achter de opening zitten: blijven binnen de zona, ingesnoerd
      const rel = (px - x) * ux + (py - y) * uy; const lim = r * 1.05 * Math.cos(opening); if (rel < lim) { const q = [px - x, py - y], d = Math.hypot(q[0], q[1]); if (d > r * 0.92) { px = x + q[0] / d * r * 0.92; py = y + q[1] / d * r * 0.92; } }
      const lat = (px - x) * -uy + (py - y) * ux, langs = (px - x) * ux + (py - y) * uy; if (Math.abs(langs - r * 1.1) < r * 0.25) { const mx = r * 1.1 * Math.sin(opening) * 1.05; if (Math.abs(lat) > mx) { const kk = mx / Math.abs(lat); px = x + ux * langs + -uy * lat * kk; py = y + uy * langs + ux * lat * kk; } } }
    cel.push([px, py, an]); }
  ctx.beginPath(); bioPad(ctx, cel.map(c => [c[0], c[1]]), true); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  const verwijderd = (an) => { if (gat <= 0.01) return false; const d = Math.abs(Math.atan2(Math.sin(an - uit), Math.cos(an - uit))); return d < 0.32 * gat; };
  cel.forEach(([cx, cy, an], k) => { if (verwijderd(an)) return; const p = cel[(k + 1) % n], q = cel[(k - 1 + n) % n]; const ra = Math.atan2(p[1] - q[1], p[0] - q[0]);
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.13, r * 0.06, ra, 0, 6.283); shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', Math.max(0.7, r * 0.008));
    if (r > 25) { ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.045, r * 0.026, ra, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); } });
  // binnenste celmassa
  const ix = cx0 + Math.cos(icm) * r * 0.55, iy = cy0 + Math.sin(icm) * r * 0.55; ret.icm = [ix, iy];
  const PP = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  PP.forEach(([u, v]) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', Math.max(0.7, r * 0.008));
    if (r > 25) { ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); } });
  // PGT-pipet: dunne glazen buis van buitenaf door de opening, met de weggezogen cellen erin
  if (gat > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(gat * 2, 0, 1); const pw = r * 0.16, L = r * 1.6, tip = [x + ux * r * 0.98, y + uy * r * 0.98];
    ctx.translate(tip[0], tip[1]); ctx.rotate(uit); ctx.fillStyle = rgba('#DDE9F0', 0.18); ctx.fillRect(0, -pw / 2, L, pw); ctx.strokeStyle = rgba('#DDE9F0', 0.85); ctx.lineWidth = Math.max(1, r * 0.015);
    ctx.beginPath(); ctx.moveTo(0, -pw / 2); ctx.lineTo(L, -pw / 2); ctx.moveTo(0, pw / 2); ctx.lineTo(L, pw / 2); ctx.stroke();
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(r * (0.25 + 0.24 * k) * gat, 0, r * 0.11, pw * 0.38, 0, 0, 6.283); shape(ctx, '#EBC9A0', '#C9A27A', 1); } ctx.restore(); }
  ctx.restore(); ret.tegenover = [cx0 + ux * r * 0.9, cy0 + uy * r * 0.9]; return ret;
}
