// ===== teken_lb2.js — Wat zit er in de bodem? (Landbouw 2) =====
// Nieuwe bibliotheekobjecten (eerst op het testvel, daarna naar bibliotheek/): zandkorrel, kleideeltje met lading,
// humusvlok, ion (kalium/ammonium/nitraat/fosfaat), jampot, trechter, plantenbak, regenworm, bodemprofiel,
// dood blad, schimmeldraden rond een wortel (mycorrhiza), kruimel, teststrookje, druppelbak.
// Kleuren (REEKS-landbouw.md): bodem oker-familie, water teal, plant groen, 'let op' koraal, focus goud.
// Bodemtinten (Macro-dag-palet C3 + okerfamilie): zand #C9A86A, klei #8A6A4A, humus #3A2E24, veen #4A3A2E.
const BODEM = { zand: '#C9A86A', zandR: '#E2C88E', klei: '#8A6A4A', kleiR: '#B08A5C', humus: '#3A2E24', humusR: '#6B5440', veen: '#4A3A2E', grond: '#5A4434', grondR: '#7A5E44', glas: '#AFC0D0', worm: '#C98A7A', wormR: '#E0A898', zadel: '#D9A08E', schimmel: '#C9C4B4', wortel: '#E6D8B8', wortelR: '#C9B48A' };

// --- zandkorrel: onregelmatig afgeronde korrel (kwarts), r in px; seed maakt elke korrel anders
function zandkorrel(ctx, x, y, r, seed = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 11, pts = []; for (let i = 0; i < n; i++) { const an = i / n * 6.283 + hash(seed * 13 + i) * 0.3; const rr = r * (0.82 + 0.3 * hash(seed * 7 + i * 3)); pts.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.86]); }
  ctx.beginPath(); for (let i = 0; i <= n; i++) { const p = pts[i % n], q2 = pts[(i + 1) % n]; const mx = (p[0] + q2[0]) / 2, my = (p[1] + q2[1]) / 2; i ? ctx.quadraticCurveTo(p[0], p[1], mx, my) : ctx.moveTo(mx, my); } ctx.closePath();
  shape(ctx, o.fill || BODEM.zand, o.rand || BODEM.zandR, o.lw || 2);
  if (r > 30) { ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.ellipse(x - r * 0.3, y - r * 0.3, r * 0.28, r * 0.14, -0.6, 0, 6.283); ctx.fillStyle = '#F2E6C8'; ctx.fill(); }
  ctx.restore(); }

// --- kleideeltje: dun plaatje (zeshoekig schilfertje), schuin gezien; lading = aantal min-tekens op het oppervlak
function kleideeltje(ctx, x, y, w, ang = 0, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const h = w * 0.34, d = w * 0.09; // dikte als zijkant
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 4, -h / 2); ctx.lineTo(w / 4, -h / 2); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 4, h / 2); ctx.lineTo(-w / 4, h / 2); ctx.closePath(); shape(ctx, o.fill || BODEM.klei, o.rand || BODEM.kleiR, 2);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, d); ctx.lineTo(-w / 4, h / 2 + d); ctx.lineTo(w / 4, h / 2 + d); ctx.lineTo(w / 2, d); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 4, h / 2); ctx.lineTo(-w / 4, h / 2); ctx.closePath(); shape(ctx, '#6E5238', BODEM.kleiR, 1.5);
  const nl = o.lading == null ? 5 : o.lading; if (nl > 0 && (o.laA == null || o.laA > 0.01)) { ctx.globalAlpha *= (o.laA == null ? 1 : o.laA); for (let i = 0; i < nl; i++) { const u = (i + 0.5) / nl; const px = (u - 0.5) * w * 0.78, py = (i % 2 ? -1 : 1) * h * 0.12; ctx.strokeStyle = '#F2E6D8'; ctx.lineWidth = Math.max(2, w * 0.018); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - w * 0.03, py); ctx.lineTo(px + w * 0.03, py); ctx.stroke(); } }
  ctx.restore(); }

// --- humusvlok: donkere, onregelmatige, iets rafelige vlok (organische stof), negatief geladen
function humusVlok(ctx, x, y, r, seed = 3, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rr = r * (0.7 + 0.45 * hash(seed * 11 + (i % n) * 5)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, BODEM.humus, BODEM.humusR, 2);
  const nl = o.lading == null ? 3 : o.lading; for (let i = 0; i < nl; i++) { const an = i / nl * 6.283 + 0.4; const px = x + Math.cos(an) * r * 0.42, py = y + Math.sin(an) * r * 0.32; ctx.strokeStyle = '#E8DCCB'; ctx.lineWidth = Math.max(2, r * 0.05); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - r * 0.09, py); ctx.lineTo(px + r * 0.09, py); ctx.stroke(); }
  ctx.restore(); }

// --- ion: rond deeltje met symbool. soort: 'K' kalium, 'NH4' ammonium, 'NO3' nitraat, 'P' fosfaat.
// o.vast: 0 = opgelost (teal-rand), 1 = vast aan klei/humus (oker-rand). o.volg: gouden rand (het gevolgde deeltje, C8).
const IONEN = { K: { s: 'K', lad: '+', r: 1 }, NH4: { s: 'NH₄', lad: '+', r: 1.15 }, NO3: { s: 'NO₃', lad: '−', r: 1.2 }, P: { s: 'PO₄', lad: '−', r: 1.25 } };
function ion(ctx, x, y, soort, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const I = IONEN[soort]; ctx.save(); ctx.globalAlpha *= a; const r = 26 * s * I.r, vast = o.vast || 0;
  const rand = vast > 0.5 ? C.oker : C.teal; circ(ctx, x, y, r, '#E8EEF2', rand, 4 * s);
  if (o.volg) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x, y, r + 8 * s, 0, 6.283); ctx.stroke(); }
  text(ctx, I.s, x - (I.s.length > 1 ? 3 : 1) * s, y + 9 * s, fTekst(Math.round(24 * s * (I.s.length > 2 ? 0.85 : 1)), 700), '#121A26', 'center');
  { const lx = x + r * 0.95 + 10 * s, ly = y - r * 0.8; circ(ctx, lx, ly - 9 * s, 13 * s, I.lad === '+' ? '#F2C94C' : '#F2F2EE', '#121A26', 1.5); text(ctx, I.lad, lx, ly + 1 * s, fTekst(Math.round(28 * s), 900), '#121A26', 'center'); }
  ctx.restore(); }

// --- glazen pot (line drawing, C4 lab library). vul 0..1 = waterhoogte; inhoud(ctx, x0, y0, w, h) tekent wat erin zit
function jampot(ctx, x, y, w, h, a = 1, vul = 0.85, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x0 = x - w / 2, yb = y;
  ctx.save(); roundRect(ctx, x0, yb - h, w, h, 18); ctx.clip(); if (vul > 0) { ctx.fillStyle = rgba(C.teal, 0.22); ctx.fillRect(x0, yb - h * vul, w, h * vul); } if (inhoud) inhoud(ctx, x0, yb - h * vul, w, h * vul); ctx.restore();
  roundRect(ctx, x0, yb - h, w, h, 18); ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.stroke(); roundRect(ctx, x0 + 8, yb - h - 26, w - 16, 28, 6); shape(ctx, '#5A6478', BODEM.glas, 2); ctx.restore(); }

// --- trechter met filter en grond, druppels eronder in een beker. stroom 0..1 = hoeveel water erdoor komt (u = tijd)
function trechter(ctx, x, y, s, soort, a = 1, stroom = 0, u = 0, beker = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, -160); ctx.lineTo(120, -160); ctx.lineTo(16, -20); ctx.lineTo(16, 40); ctx.lineTo(-16, 40); ctx.lineTo(-16, -20); ctx.closePath(); ctx.save(); ctx.clip();
  ctx.fillStyle = soort === 'zand' ? BODEM.zand : BODEM.klei; ctx.fillRect(-120, -110, 240, 100); for (let i = 0; i < 40; i++) { const px = -100 + hash(i * 3 + (soort === 'zand' ? 1 : 7)) * 200, py = -104 + hash(i * 5 + 2) * 90; if (soort === 'zand') circ(ctx, px, py, 4 + 3 * hash(i), BODEM.zandR); else { ctx.fillStyle = BODEM.kleiR; ctx.fillRect(px, py, 9, 2.5); } }
  ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(-120, -160, 240, 50 * (1 - Math.min(1, u))); ctx.restore();
  ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-120, -160); ctx.lineTo(-16, -20); ctx.lineTo(-16, 40); ctx.moveTo(120, -160); ctx.lineTo(16, -20); ctx.lineTo(16, 40); ctx.stroke();
  for (let i = 0; i < 4; i++) { const ph = ((u * 3 + i / 4) % 1); if (stroom > 0.05 && hash(i * 9) < stroom + 0.15) { ctx.beginPath(); ctx.ellipse(0, 52 + ph * 120, 6, 9, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.85 * Math.sin(ph * 3.14)); ctx.fill(); } }
  if (beker > 0.01) { ctx.globalAlpha *= beker; const bh = 170; roundRect(ctx, -80, 190, 160, bh, 10); ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.stroke(); const lv = bh * 0.85 * stroom * Math.min(1, u); if (lv > 1) { ctx.fillStyle = rgba(C.teal, 0.55); ctx.fillRect(-77, 190 + bh - 3 - lv, 154, lv); } }
  ctx.restore(); }

// --- plantenbak (houten bak) met grondsoort; plant = tomatenplant uit teken_lb1.js
function plantenbak(ctx, x, y, w, soort, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.42;
  ctx.fillStyle = soort === 'zand' ? BODEM.zand : BODEM.klei; ctx.fillRect(x - w / 2 + 10, y - h + 18, w - 20, 26); // grondoppervlak
  for (let i = 0; i < 26; i++) { const px = x - w / 2 + 20 + hash(i * 7 + (soort === 'zand' ? 3 : 9)) * (w - 40); if (soort === 'zand') circ(ctx, px, y - h + 26 + hash(i) * 10, 3 + 2 * hash(i * 2), BODEM.zandR); else { ctx.fillStyle = '#6E5238'; ctx.fillRect(px, y - h + 24 + hash(i) * 12, 14, 3); } }
  ctx.fillStyle = '#8C6A48'; ctx.fillRect(x - w / 2, y - h + 34, w, h - 34); ctx.strokeStyle = '#6A4E34'; ctx.lineWidth = 3; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h + 34 + i * (h - 34) / 3); ctx.lineTo(x + w / 2, y - h + 34 + i * (h - 34) / 3); ctx.stroke(); } ctx.strokeRect(x - w / 2, y - h + 34, w, h - 34);
  if (o.label) { roundRect(ctx, x - 90, y - h * 0.55, 180, 50, 8); shape(ctx, '#F2EAD8', '#B8A880', 2); text(ctx, o.label, x, y - h * 0.55 + 36, fTekst(30, 700), '#3A2E24', 'center'); }
  ctx.restore(); return y - h + 26; }

// --- regenworm (Lumbricus): één doorlopend lijf langs een pad, segmenten als lichte banden, zadel (clitellum) op ±1/3 vanaf de kop,
// kop iets spits, staart afgeplat. pts = middellijn van kop naar staart; dik = maximale dikte. Recept: lengte ±25–40× de dikte.
function regenworm(ctx, pts, dik, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = bioDicht(pts, 90), n = P.length;
  const breed = (u) => dik * (u < 0.06 ? 0.55 + u / 0.06 * 0.45 : u < 0.35 ? 1 : u > 0.9 ? 0.75 + (1 - u) / 0.1 * 0.15 : 1 - (u - 0.35) * 0.25);
  const L = [], R = []; for (let i = 0; i < n; i++) { const p = P[i], q2 = P[Math.min(n - 1, i + 1)], p0 = P[Math.max(0, i - 1)]; const dx = q2[0] - p0[0], dy = q2[1] - p0[1], ln = Math.hypot(dx, dy) || 1; const nx = -dy / ln, ny = dx / ln, b = breed(i / (n - 1)) / 2; L.push([p[0] + nx * b, p[1] + ny * b]); R.push([p[0] - nx * b, p[1] - ny * b]); }
  ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); for (const p of L) ctx.lineTo(p[0], p[1]); for (let i = n - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); shape(ctx, BODEM.worm, '#A86A5C', 2);
  // zadel
  const z0 = Math.floor(n * 0.27), z1 = Math.floor(n * 0.36); ctx.beginPath(); ctx.moveTo(L[z0][0], L[z0][1]); for (let i = z0; i <= z1; i++) ctx.lineTo(L[i][0], L[i][1]); for (let i = z1; i >= z0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); ctx.fillStyle = BODEM.zadel; ctx.fill();
  // segmentbanden
  ctx.strokeStyle = rgba('#F2D2C6', 0.55); ctx.lineWidth = Math.max(1, dik * 0.06); for (let i = 2; i < n - 1; i += 2) { if (i >= z0 && i <= z1) continue; ctx.beginPath(); ctx.moveTo(L[i][0], L[i][1]); ctx.lineTo(R[i][0], R[i][1]); ctx.stroke(); }
  // rugstreep (bloedvat schemert door): donkerder lijn op de rug
  ctx.strokeStyle = rgba('#9A4E46', 0.45); ctx.lineWidth = Math.max(1.5, dik * 0.12); ctx.beginPath(); for (let i = 3; i < n - 3; i++) i === 3 ? ctx.moveTo(P[i][0], P[i][1]) : ctx.lineTo(P[i][0], P[i][1]); ctx.stroke();
  ctx.restore(); }

// --- bodemprofiel in doorsnede: strooisellaag, donkere bovengrond (humus), lichtere ondergrond; o.gang = wormengang (pad)
function bodemprofiel(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const z = o.soort === 'klei' ? BODEM.klei : BODEM.grond;
  ctx.fillStyle = '#3A5540'; ctx.fillRect(x, y - 16, w, 16); // gras/strooisel
  ctx.fillStyle = BODEM.humus; ctx.fillRect(x, y, w, h * 0.38); ctx.fillStyle = z; ctx.fillRect(x, y + h * 0.38, w, h * 0.62);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); // golvende grens en korrels
  for (let i = 0; i < 70; i++) { const px = x + hash(i * 3 + 1) * w, py = y + h * 0.38 + (hash(i * 5) - 0.5) * 30; circ(ctx, px, py, 3 + 5 * hash(i * 7), i % 2 ? BODEM.humus : z); }
  for (let i = 0; i < 90; i++) { const px = x + hash(i * 11 + 4) * w, py = y + hash(i * 13 + 2) * h; circ(ctx, px, py, 1.5 + 2.5 * hash(i * 17), rgba(py < y + h * 0.38 ? BODEM.humusR : '#A88A68', 0.5)); }
  if (o.gang) { ctx.strokeStyle = '#2A2018'; ctx.lineWidth = o.gangDik || 22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, o.gang); ctx.stroke(); }
  if (o.wortels) { ctx.strokeStyle = BODEM.wortel; ctx.lineCap = 'round'; for (const r of o.wortels) { ctx.lineWidth = r[2] || 4; ctx.beginPath(); bioPad(ctx, r[0]); ctx.stroke(); } }
  ctx.restore(); ctx.restore(); }

// --- dood blad (beuk/eik-achtig), bruin; vergaan 0..1 = rafelt en verkleurt
function doodBlad(ctx, x, y, s, ang = 0, a = 1, vergaan = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.5 * vergaan); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.bezierCurveTo(-30, -34, 30, -34, 60, 0); ctx.bezierCurveTo(30, 34, -30, 34, -60, 0); ctx.closePath(); shape(ctx, vergaan > 0.5 ? '#6B4A30' : '#9A6A3A', '#6B4A30', 2);
  ctx.strokeStyle = '#6B4A30'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(56, 0); for (let i = -2; i <= 2; i++) { ctx.moveTo(i * 20, 0); ctx.lineTo(i * 20 + 14, -16); ctx.moveTo(i * 20, 0); ctx.lineTo(i * 20 + 14, 16); } ctx.stroke();
  if (vergaan > 0.05) { ctx.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 12; i++) if (hash(i * 3) < vergaan) circ(ctx, -50 + hash(i * 5) * 100, -20 + hash(i * 7) * 40, 6 + 8 * hash(i), '#000'); }
  ctx.restore(); }

// --- wortel met wortelharen en schimmeldraden (arbusculaire mycorrhiza): draden groeien vanuit de wortel ver de grond in.
// groei 0..1 = hoe ver de draden reiken; stroom 0..1 = fosfaat naar de wortel, suiker naar de schimmel.
function mycorrhiza(ctx, x, y, L, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const groei = o.groei == null ? 1 : o.groei, t = o.t || 0;
  // wortel (horizontaal), dikte 46, punt rechts
  ctx.beginPath(); ctx.moveTo(x - L / 2, y - 24); ctx.lineTo(x + L / 2 - 40, y - 20); ctx.quadraticCurveTo(x + L / 2 + 10, y, x + L / 2 - 40, y + 20); ctx.lineTo(x - L / 2, y + 24); ctx.closePath(); shape(ctx, BODEM.wortel, BODEM.wortelR, 2.5);
  // wortelharen: kort
  ctx.strokeStyle = BODEM.wortelR; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { const px = x - L / 2 + 40 + i * (L - 140) / 18, kant = i % 2 ? -1 : 1; ctx.beginPath(); ctx.moveTo(px, y + kant * 22); ctx.lineTo(px + 6, y + kant * (40 + 10 * hash(i))); ctx.stroke(); }
  // schimmeldraden: vertakte dunne lijnen, veel langer dan wortelharen
  ctx.strokeStyle = BODEM.schimmel; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  const tak = (sx, sy, an, len, d, seed) => { if (d > 3 || len < 12) return; const e = len * groei; const ex = sx + Math.cos(an) * e, ey = sy + Math.sin(an) * e; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + (hash(seed) - 0.5) * 30, (sy + ey) / 2 + (hash(seed + 1) - 0.5) * 30, ex, ey); ctx.stroke(); if (groei > 0.3) { tak(ex, ey, an - 0.5 + hash(seed + 2) * 0.3, len * 0.62, d + 1, seed * 3 + 1); tak(ex, ey, an + 0.4 + hash(seed + 3) * 0.3, len * 0.55, d + 1, seed * 3 + 2); } };
  for (let i = 0; i < 6; i++) { const px = x - L / 2 + 80 + i * (L - 220) / 5, kant = i % 2 ? -1 : 1; tak(px, y + kant * 22, kant * (1.57 + (hash(i * 5) - 0.5) * 1.2), 120 + 50 * hash(i * 9), 0, i * 17 + 3); }
  // binnen de wortel: arbuscules (fijn vertakte boompjes in de cellen), gedimd
  ctx.globalAlpha *= 0.6; for (let i = 0; i < 4; i++) { const px = x - L / 2 + 120 + i * (L - 260) / 3; ctx.beginPath(); for (let k = 0; k < 5; k++) { ctx.moveTo(px, y + 4); ctx.lineTo(px - 14 + k * 7, y - 12); } ctx.stroke(); } ctx.globalAlpha /= 0.6;
  // stroom: fosfaat langs een draad naar binnen, suiker naar buiten
  if ((o.stroom || 0) > 0.01) { const st = o.stroom; for (let i = 0; i < 3; i++) { const ph = (t * 0.35 + i / 3) % 1; ion(ctx, x - L / 2 + 80, y + 40 + 200 * (1 - ph) * groei, 'P', 1.1, st * Math.sin(ph * 3.14), { vast: 0 }); suiker(ctx, x - L / 2 + 330, y - 40 - 180 * ph * groei, 1.4, st * Math.sin(ph * 3.14), C.oker); } }
  ctx.restore(); }

// --- kruimel (aggregaat): korrels aan elkaar geplakt door schimmeldraden en slijm, met poriën ertussen
function kruimel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lijm = o.lijm == null ? 1 : o.lijm;
  if (lijm > 0.01) { ctx.save(); ctx.globalAlpha *= lijm * 0.45; ctx.beginPath(); ctx.ellipse(x, y, r * 1.05, r * 0.9, 0, 0, 6.283); ctx.fillStyle = rgba('#B8C8B0', 0.5); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 9; i++) { const an = hash(i * 7 + 1) * 6.283, d = r * 0.6 * Math.sqrt(hash(i * 3 + 2)); const px = x + Math.cos(an) * d * (1 + (1 - lijm) * 0.8), py = y + Math.sin(an) * d * (1 + (1 - lijm) * 0.8); if (i % 3 === 0) humusVlok(ctx, px, py, r * 0.24, i + 2, 1, { lading: 0 }); else if (i % 3 === 1) zandkorrel(ctx, px, py, r * 0.26, i, 1); else kleideeltje(ctx, px, py, r * 0.45, hash(i) * 3, 1, { lading: 0 }); }
  if (lijm > 0.01) { ctx.strokeStyle = rgba(BODEM.schimmel, lijm); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const an = i * 1.3 + 0.4; ctx.beginPath(); ctx.arc(x, y, r * (0.55 + 0.35 * hash(i * 9)), an, an + 1.1 + 0.6 * hash(i * 4)); ctx.stroke(); } }
  ctx.restore(); }

// --- teststrookje (nitraat): wit strookje met een testvakje dat kleurt (kleur 0..1)
function teststrookje(ctx, x, y, s, kleur = 0, a = 1, ang = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -16, -150, 32, 300, 6); shape(ctx, '#F2F2EE', '#9AA3B2', 2); roundRect(ctx, -12, 96, 24, 36, 4); ctx.fillStyle = kleur > 0.01 ? `rgb(${Math.round(lerp(242, 150, kleur))},${Math.round(lerp(242, 40, kleur))},${Math.round(lerp(238, 110, kleur))})` : '#F2F2EE'; ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore(); }

// --- druppelbak: bak met zandgrond, gaatjes onderin, opvangbakje; druppels 0..1
function druppelbak(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.5, t = o.t || 0;
  const tuin = o.soort !== 'zand'; ctx.fillStyle = tuin ? BODEM.grond : BODEM.zand; ctx.fillRect(x - w / 2 + 6, y - h + 30, w - 12, h - 36); for (let i = 0; i < 60; i++) circ(ctx, x - w / 2 + 16 + hash(i * 3) * (w - 32), y - h + 40 + hash(i * 5) * (h - 56), 3 + 3 * hash(i * 7), tuin ? (i % 3 ? BODEM.grondR : BODEM.humus) : BODEM.zandR);
  if ((o.korrels || 0) > 0.01) for (let i = 0; i < 14; i++) circ(ctx, x - w / 2 + 30 + hash(i * 11) * (w - 60), y - h + 34 + hash(i * 13) * 8, 7, rgba('#F2F2EE', o.korrels)); // kunstmestkorrels
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  for (let i = 0; i < 5; i++) { ctx.clearRect; circ(ctx, x - w * 0.36 + i * w * 0.18, y, 5, '#1A2740'); }
  const dr = o.druppels || 0; if (dr > 0.01) for (let i = 0; i < 5; i++) { const ph = (t * 1.2 + i * 0.37) % 1; ctx.beginPath(); ctx.ellipse(x - w * 0.36 + i * w * 0.18, y + 12 + ph * 90, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, dr * 0.9 * Math.sin(ph * 3.14)); ctx.fill(); }
  roundRect(ctx, x - w / 2 + 20, y + 110, w - 40, 70, 10); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.stroke(); const lv = 50 * (o.vol || 0); if (lv > 1) { ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(x - w / 2 + 23, y + 177 - lv, w - 46, lv); }
  ctx.restore(); }

// --- veen in doorsnede: lagen samengeperste plantenresten; zak 0..1 = ontwaterd, inklinken (maaiveld zakt), sloot met lager water
function veenprofiel(ctx, x, y, w, h, a = 1, zak = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dz = 60 * zak;
  ctx.fillStyle = BODEM.veen; ctx.fillRect(x, y + dz, w, h - dz); ctx.strokeStyle = rgba('#7A6248', 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const py = y + dz + 14 + hash(i * 3) * (h - dz - 28), px = x + hash(i * 5) * (w - 80); ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 30, py - 6, px + 70, py + 2); ctx.stroke(); }
  ctx.fillStyle = '#3A5540'; ctx.fillRect(x, y + dz - 14, w, 14); ctx.strokeStyle = '#8FA0B5'; ctx.setLineDash([10, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = rgba(C.teal, 0.45); const wl = y + 30 + 110 * zak; ctx.fillRect(x + w - 120, wl, 120, h - (wl - y)); ctx.restore(); }

// ===== extra objecten voor de scènes (25 okt 2026) =====
// watermolecuul (teal O, lichte H); ang = richting van de H-kant
function watertje(ctx, x, y, s = 1, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  circ(ctx, 9 * s, -7 * s, 6 * s, '#E8EEF2', '#AFC0D0', 1.2); circ(ctx, 9 * s, 7 * s, 6 * s, '#E8EEF2', '#AFC0D0', 1.2); circ(ctx, 0, 0, 10 * s, C.teal, '#8FC6E2', 1.5); ctx.restore(); }
// hydratatiemantel: watermoleculen rond een ion; bij een negatief ion wijzen de H's naar het ion, bij een positief ion de O
function mantel(ctx, x, y, r, neg = true, a = 1, t = 0, n = 7) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const an = i / n * 6.283 + t * 0.25 + Math.sin(t * 1.3 + i) * 0.06; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; watertje(ctx, px, py, 1, neg ? an + Math.PI : an, a); } }
// fosfaat dat met calcium/ijzer/aluminium een vast korreltje vormt (u 0..1)
function fosfaatKorrel(ctx, x, y, s = 1, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 7; ctx.beginPath(); for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rr = 30 * s * (0.8 + 0.25 * hash(i * 3 + 7)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.85; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.globalAlpha *= u; shape(ctx, '#B8A27A', '#8C7A58', 2.5); ctx.restore(); }
// bladrozet (sla/spinazie-achtig) voor het proefveldje; groei 0..1, bleek 0..1 = gele onderste bladeren
function bladrozet(ctx, x, y, s = 1, groei = 1, bleek = 0, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = 0.35 + 0.65 * groei;
  for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.42 + Math.sin(t * 0.7 + i) * 0.02, ln = (i === 0 || i === 6 ? 70 : 90 + 10 * (3 - Math.abs(i - 3))) * s * g; const onder = (i === 0 || i === 6 || i === 1 || i === 5);
    const col = onder && bleek > 0 ? `rgb(${Math.round(lerp(78, 214, bleek))},${Math.round(lerp(126, 196, bleek))},${Math.round(lerp(82, 96, bleek))})` : '#4E7E52';
    ctx.save(); ctx.translate(x, y); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -ln / 2, ln * 0.24, ln / 2, 0, 0, 6.283); shape(ctx, col, '#3E6642', 1.5); ctx.strokeStyle = rgba('#2E4A32', 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, -ln * 0.9); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// tomatenplant met bleke onderste bladeren (bovenop tomatenplant uit teken_lb1)
function tomaatBleek(ctx, x, y, h, t, o = {}, bleek = 0) { tomatenplant(ctx, x, y, h, t, o); if (bleek <= 0.01) return; const blad = o.blad == null ? 6 : o.blad, wieg = Math.sin(t * 0.8 + x * 0.01) * 4; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a) * bleek;
  for (let i = 0; i < Math.min(2, blad); i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06);
    for (let k = 0; k < 3; k++) { const u = 0.45 + k * 0.25, lx = x + z * ln * u, ly = yy - ln * 0.32 * Math.sin(u * 3) - ln * 0.05; ctx.beginPath(); ctx.ellipse(lx, ly, ln * 0.17, ln * 0.09, z * (0.5 - k * 0.3), 0, 6.283); shape(ctx, '#D6C460', '#A89A40', 1.5); } }
  ctx.restore(); }
// gieter
function gieter(ctx, x, y, s = 1, a = 1, giet = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5 * giet); ctx.scale(s, s);
  roundRect(ctx, -50, -40, 100, 80, 12); shape(ctx, '#5E8F8A', '#3E6A66', 2); ctx.strokeStyle = '#3E6A66'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30, -40); ctx.quadraticCurveTo(0, -80, 30, -40); ctx.stroke();
  ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(48, 20); ctx.lineTo(120, -30); ctx.stroke(); roundRect(ctx, 112, -44, 24, 18, 4); shape(ctx, '#5E8F8A', '#3E6A66', 2);
  if (giet > 0.3) for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; ctx.beginPath(); ctx.ellipse(130 + i * 4 + ph * 30, -26 + ph * 120, 3, 6, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.8 * Math.sin(ph * 3.14)); ctx.fill(); }
  ctx.restore(); }
// staafje met grens (nitraatnorm)
function grensStaaf(ctx, x, y, w, h, waarde, grens, max, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w + 80, y); ctx.stroke();
  const vh = h * waarde / max; roundRect(ctx, x + 40, y - vh, w, vh, 6); shape(ctx, rgba(C.teal, 0.55), C.teal, 2); const gy = y - h * grens / max; ctx.setLineDash([12, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w + 80, gy); ctx.stroke(); ctx.setLineDash([]);
  if (label) metaText(ctx, label, x + w + 90, gy + 8, C.koraal, 'left', 28); ctx.restore(); }
// akker in doorsnede met grondwater; regen 0..1, gewas 0..1 (vanggewas), nitraat zakt naar het grondwater (u)
function akkerDoorsnede(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0;
  ctx.fillStyle = o.zand ? BODEM.zand : BODEM.grond; ctx.fillRect(x, y, w, h * 0.68); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fillRect(x, y + h * 0.68, w, h * 0.32); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + h * 0.68); ctx.lineTo(x + w, y + h * 0.68); ctx.stroke();
  for (let i = 0; i < 50; i++) circ(ctx, x + hash(i * 3 + 1) * w, y + 10 + hash(i * 5 + 2) * h * 0.62, 2 + 3 * hash(i), o.zand ? BODEM.zandR : BODEM.grondR);
  if ((o.gewas || 0) > 0.01) for (let i = 0; i < 14; i++) { const px = x + 40 + i * (w - 80) / 13; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 4; ctx.globalAlpha *= 1; const gh = 50 * o.gewas; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px - 6, y - gh); ctx.moveTo(px, y); ctx.lineTo(px + 7, y - gh * 0.9); ctx.stroke(); ctx.strokeStyle = BODEM.wortel; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + 3, y + 110 * o.gewas); ctx.stroke(); }
  if ((o.regen || 0) > 0.01) for (let i = 0; i < 26; i++) { const ph = (t * 1.1 + hash(i * 7)) % 1; const px = x + hash(i * 11) * w; ctx.strokeStyle = rgba(C.teal, 0.75 * o.regen); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y - 260 + ph * 240); ctx.lineTo(px - 6, y - 236 + ph * 240); ctx.stroke(); }
  if ((o.nitraat || 0) > 0.01) for (let i = 0; i < 5; i++) { const ph = ((o.u || 0) + i * 0.17) % 1; const px = x + 120 + i * (w - 240) / 4; const py = y + 30 + ph * h * 0.7; ion(ctx, px, py, 'NO3', 0.9, o.nitraat * (o.gewas > 0.5 && py < y + 120 ? 0.25 : 1), { vast: 0 }); }
  ctx.restore(); }
// kalender nov–mrt (regen > verdamping)
function kalender(ctx, x, y, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  M.forEach((m, i) => { const winter = i < 3 || i > 9; roundRect(ctx, x + i * 70, y, 62, 70, 8); shape(ctx, winter && hl > 0.5 ? rgba(C.teal, 0.35) : '#2A3A58', winter && hl > 0.5 ? C.teal : C.line, 1.5); text(ctx, m, x + i * 70 + 31, y + 44, fTekst(24, 700), C.text, 'center'); }); ctx.restore(); }
// bodemmonster: grondboor met monsterzakje
function bodemmonster(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -90, 140, 170, 14); shape(ctx, '#E8E2D4', '#B8AE98', 2); ctx.fillStyle = BODEM.grond; ctx.beginPath(); ctx.ellipse(0, 40, 50, 24, 0, 0, 6.283); ctx.fill(); text(ctx, 'monster', 0, -40, fTekst(26, 700), '#3A2E24', 'center');
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(120, -140); ctx.lineTo(120, 90); ctx.moveTo(80, -140); ctx.lineTo(160, -140); ctx.stroke(); ctx.restore(); }
// eiwitje: kralenketting die opgevouwen ligt (kluwen), voor 'stikstof in eiwitten'
function eiwitje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pts = []; for (let i = 0; i < 22; i++) { const an = i * 0.75, r = (18 + 22 * Math.sin(i * 0.45)) * s; pts.push([x + Math.cos(an) * r, y + Math.sin(an) * r * 0.8]); }
  ctx.strokeStyle = '#9AA8C0'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); bioPad(ctx, pts); ctx.stroke(); pts.forEach((p, i) => circ(ctx, p[0], p[1], 6 * s, i % 5 === 0 ? C.groen : '#7A8BA8', '#B8C4D8', 1)); ctx.restore(); }
