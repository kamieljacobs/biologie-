// Wat word jij? · Mariene biologie 1 · Hoeveel vis mag eruit? — eigen tekeningen (7 nov 2026)
// Seriekleuren (reeksbrief): teal = zeewater, groen = plankton, oker = vis als biomassa en vangst, koraal = let op,
// goud = focus, duurzame vangst en advies. Schol met beide ogen aan de bovenkant (rechterzijde), oranje vlekken.
// Otoliet: in de kop een paar millimeter (alleen als stipje); groot alleen in een zoomcirkel of onder de binoculair.
// Kustlijnen: AARDE_LAND (Natural Earth, uit Van molecuul tot biosfeer), uitgesneden voor Noordzee en Noord-Atlantische Oceaan.

const GROND = 860;
const SCHOL = { rug: '#8C7A52', rugD: '#6E5E3E', rand: '#5A4C32', vlek: '#E2783C', vin: '#7A6A46', lijn: '#B3A276' };

// ---------- algemene hulpjes (zoals mk1) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 64, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 18); ctx.lineTo(x + 52, y + 32); ctx.lineTo(x + 26, y + 46); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 66, y + 43, fTekst(30, 700), C.text, 'left'); ctx.restore(); }
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 48, h = 80 + regels.length * lh + (bron ? 50 : 6);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(o.rand || C.line, 0.85), 2); metaText(ctx, kop, x + 28, y + 48, o.kopKl || C.goud, 'left', 28);
  regels.forEach((r, i) => { const [s2, ra, kl] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 28, y + 104 + i * lh, fTekst(o.px || 36, 700), kl || C.text, 'left'); ctx.restore(); } });
  if (bron) metaText(ctx, bron, x + 28, y + h - 22, C.text2, 'left', 28); ctx.restore(); return h; }
function somRegel(ctx, s2, x, y, a = 1, kl = C.text, px = 48, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, 800), kl, al); ctx.restore(); }
function modelLabel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); const w = ctx.measureText('MODEL').width + 52; roundRect(ctx, x, y - 34, w, 44, 22); shape(ctx, rgba(C.goud, 0.14), C.goud, 1.5); metaText(ctx, 'MODEL', x + w / 2 + 2, y - 2, C.goud, 'center', 28); ctx.restore(); }
function assenM(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) metaText(ctx, xl, x + w, y + h + 82, C.text2, 'right', 28); if (yl) metaText(ctx, yl, x, y - 20, C.text2, 'left', 28); }
const AANWAS = (n) => 0.5 * n * (1 - n / 1000); // model: r = 0,5 per jaar, K = 1000 ton

// ---------- schol (Pleuronectes platessa), bovenaanzicht van de ogenzijde ----------
// lengte len in px. kijk 1 = kop rechts, ogen aan de bovenrand (zoals op elke scholfoto); kijk -1 = 180° gedraaid. Lichaam ± 0,4 × lengte hoog, vinzoom rondom, staartsteel kort,
// twee ogen bovenop dicht bij elkaar, knobbelrij achter de ogen, zijlijn bijna recht, oranje vlekken.
function schol(ctx, x, y, len, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(-len / 200, len / 200); if ((o.kijk || 1) < 0) ctx.rotate(Math.PI); // tekening heeft kop links; geschaald naar kop rechts = ogenzijde boven (rechtsoog-platvis)
  const golf = o.stil ? 0 : Math.sin(t * 3) * 1.2;
  // vinzoom (rug- en aarsvin) als iets grotere vorm rond het lijf
  const lijf = (k) => { ctx.beginPath(); ctx.moveTo(-100, 4); ctx.bezierCurveTo(-98, -14 - k * 0.3, -82, -34 - k, -50, -40 - k); ctx.bezierCurveTo(-10, -46 - k, 40, -38 - k, 66, -16 - k * 0.6); ctx.lineTo(76, -9 - k * 0.2);
    ctx.lineTo(76, 9 + k * 0.2); ctx.lineTo(66, 16 + k * 0.6); ctx.bezierCurveTo(40, 38 + k, -10, 46 + k, -46, 40 + k); ctx.bezierCurveTo(-76, 34 + k, -94, 22 + k * 0.4, -100, 4); ctx.closePath(); };
  // staartvin
  ctx.beginPath(); ctx.moveTo(72, -9); ctx.quadraticCurveTo(90, -26 + golf, 100, -22 + golf); ctx.quadraticCurveTo(104, 0, 100, 22 + golf); ctx.quadraticCurveTo(90, 26 + golf, 72, 9); ctx.closePath(); shape(ctx, SCHOL.vin, SCHOL.rand, 1.6);
  ctx.strokeStyle = rgba(SCHOL.rand, 0.6); ctx.lineWidth = 1; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(76, i * 2); ctx.lineTo(99, i * 5.2 + golf * 0.5); ctx.stroke(); }
  lijf(9); ctx.save(); ctx.clip(); ctx.fillStyle = SCHOL.vin; ctx.fill(); ctx.strokeStyle = rgba(SCHOL.rand, 0.55); ctx.lineWidth = 0.9;
  for (let i = 0; i < 46; i++) { const u = i / 45, xx = -84 + u * 156, ang = Math.atan2(1, 0); ctx.beginPath(); ctx.moveTo(xx, 0); ctx.lineTo(xx + (u - 0.5) * 14, -60); ctx.moveTo(xx, 0); ctx.lineTo(xx + (u - 0.5) * 14, 60); ctx.stroke(); }
  ctx.restore(); lijf(9); ctx.strokeStyle = SCHOL.rand; ctx.lineWidth = 1.6; ctx.stroke();
  // lijf
  lijf(0); shape(ctx, SCHOL.rug, SCHOL.rand, 1.6);
  ctx.save(); lijf(0); ctx.clip();
  ctx.fillStyle = rgba('#000000', 0.08); ctx.beginPath(); ctx.ellipse(-10, 26, 90, 18, 0, 0, 6.283); ctx.fill(); // iets donkerder buikkant (bovenaanzicht: schaduwtint)
  const V = [[-50, -18], [-28, 12], [-6, -26], [6, 20], [24, -8], [40, 24], [46, -24], [-30, -30], [-58, 18], [60, 4], [14, 2], [-12, 30]];
  (o.var ? V.map(([a, b]) => [a * 0.92 + 5, -b + 3]) : V).forEach(([vx, vy], i) => { const r = 5.2 - (i % 3) * 0.8; circ(ctx, vx, vy, r, SCHOL.vlek); circ(ctx, vx, vy, r, null, rgba('#F6E7C8', 0.5), 1); });
  ctx.restore();
  // zijlijn: boogje boven de borstvin, dan recht
  ctx.strokeStyle = SCHOL.lijn; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-66, -4); ctx.quadraticCurveTo(-56, -14, -44, -6); ctx.lineTo(74, 0); ctx.stroke();
  // kieuwdeksel
  ctx.strokeStyle = SCHOL.rugD; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-70, -26); ctx.quadraticCurveTo(-60, 0, -72, 28); ctx.stroke();
  // borstvin (ogenzijde) achter het kieuwdeksel
  ctx.beginPath(); ctx.moveTo(-66, 6); ctx.quadraticCurveTo(-50, 16, -46, 26); ctx.quadraticCurveTo(-58, 24, -68, 12); ctx.closePath(); shape(ctx, SCHOL.rugD, SCHOL.rand, 1);
  // bek: klein, scheef, vooraan onder de ogen
  ctx.strokeStyle = SCHOL.rand; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-99, 4); ctx.quadraticCurveTo(-94, 12, -88, 12); ctx.stroke();
  // twee ogen dicht bij elkaar aan de bovenkant, het ene iets vóór het andere
  const oog = (ox, oy) => { ctx.beginPath(); ctx.ellipse(ox, oy, 6.5, 5.5, -0.3, 0, 6.283); shape(ctx, '#D8C9A0', SCHOL.rand, 1.2); circ(ctx, ox + 0.6, oy, 3.4, '#1A1A1A'); circ(ctx, ox - 0.8, oy - 1.4, 1.1, '#F2F2EE'); };
  oog(-84, -12); oog(-76, -24);
  // knobbelrij (4–6 benige knobbels) achter de ogen
  for (let i = 0; i < 5; i++) circ(ctx, -70 + i * 3.4, -20 + i * 3.2, 1.9, '#C9B98A', SCHOL.rand, 0.8);
  if (o.oor) { circ(ctx, -66, -6, 2.4, rgba('#F2EEE4', 0.9)); } // gehoorsteentje: een paar mm, alleen als stipje
  if (o.goud) { lijf(9); ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * 200 / len * (o.goudDik || 1); ctx.stroke(); }
  ctx.restore(); }
// waar het binnenoor (otoliet) zit, voor een zoomcirkel: punt in schermcoördinaten
function scholOor(x, y, len, kijk = 1) { const k = kijk || 1; return { x: x + k * 66 * len / 200, y: y - k * 6 * len / 200 }; }

// vereenvoudigde schol als biomassa-eenheid (25 ton) in oker
function scholIcoon(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
  ctx.beginPath(); ctx.moveTo(-20, 0); ctx.bezierCurveTo(-18, -9, -6, -11, 4, -10); ctx.bezierCurveTo(12, -9, 15, -4, 16, -2); ctx.lineTo(22, -7); ctx.lineTo(22, 7); ctx.lineTo(16, 2); ctx.bezierCurveTo(15, 4, 12, 9, 4, 10); ctx.bezierCurveTo(-6, 11, -18, 9, -20, 0); ctx.closePath();
  shape(ctx, o.kl || C.oker, o.goud ? C.goud : _mb1Donker(o.kl || C.oker), o.goud ? 3 : 1.2); circ(ctx, -15, -3.5, 1.6, '#2A2418'); circ(ctx, -12, -6, 1.6, '#2A2418'); ctx.restore(); }
function _mb1Donker(hex) { const n = parseInt(hex.slice(1), 16); return `rgb(${(n >> 16) * 0.6 | 0},${((n >> 8) & 255) * 0.6 | 0},${(n & 255) * 0.6 | 0})`; }

// ---------- haring (Clupea harengus), zijaanzicht: slank, gevorkte staart, één rugvin midden, blauwgroene rug, zilveren flank ----------
function haring(ctx, x, y, len, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale((o.kijk || 1) * len / 200, len / 200); const g = Math.sin(t * 5 + (o.fase || 0)) * 2;
  ctx.beginPath(); ctx.moveTo(76, -4); ctx.lineTo(100, -20 + g); ctx.lineTo(90, 0); ctx.lineTo(100, 20 + g); ctx.lineTo(76, 4); ctx.closePath(); shape(ctx, '#7E93A4', '#4E6274', 1.4);
  ctx.beginPath(); ctx.moveTo(-6, -20); ctx.lineTo(8, -34); ctx.lineTo(22, -18); ctx.closePath(); shape(ctx, '#6E8698', '#4E6274', 1.2); // rugvin midden
  ctx.beginPath(); ctx.moveTo(44, 12); ctx.lineTo(56, 20); ctx.lineTo(62, 10); ctx.closePath(); shape(ctx, '#B8C4CE', '#7E93A4', 1); // aarsvin
  const lijf = () => { ctx.beginPath(); ctx.moveTo(-100, 0); ctx.bezierCurveTo(-92, -16, -50, -24, 0, -22); ctx.bezierCurveTo(40, -20, 66, -10, 78, -4); ctx.lineTo(78, 4); ctx.bezierCurveTo(60, 12, 30, 20, 0, 21); ctx.bezierCurveTo(-50, 22, -90, 14, -100, 0); ctx.closePath(); };
  lijf(); shape(ctx, '#C9D3DC', '#5E7486', 1.6); ctx.save(); lijf(); ctx.clip(); ctx.fillStyle = '#3F667E'; ctx.beginPath(); ctx.moveTo(-100, -2); ctx.bezierCurveTo(-60, -8, 20, -6, 80, -2); ctx.lineTo(80, -40); ctx.lineTo(-100, -40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(-100, 6, 200, 4); ctx.restore();
  ctx.strokeStyle = '#5E7486'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-68, -14); ctx.quadraticCurveTo(-60, 0, -68, 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-54, 6); ctx.lineTo(-40, 12); ctx.lineTo(-52, 12); ctx.closePath(); shape(ctx, '#B8C4CE', '#7E93A4', 1); // borstvin laag
  circ(ctx, -84, -4, 5, '#E8EEF2', '#5E7486', 1); circ(ctx, -84, -4, 2.8, '#1A1A1A');
  ctx.strokeStyle = '#5E7486'; ctx.beginPath(); ctx.moveTo(-100, 0); ctx.lineTo(-94, 3); ctx.stroke();
  if (o.goud) { lijf(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * 200 / len; ctx.stroke(); }
  ctx.restore(); }

// ---------- kabeljauw (Gadus morhua), zijaanzicht: drie rugvinnen, twee aarsvinnen, baarddraad, gespikkeld, lichte zijlijn ----------
function kabeljauw(ctx, x, y, len, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale((o.kijk || 1) * len / 200, len / 200); const g = Math.sin(t * 3 + (o.fase || 0)) * 2;
  const VIN = '#6E6A44', R = '#4A462C';
  ctx.beginPath(); ctx.moveTo(78, -6); ctx.lineTo(100, -22 + g); ctx.quadraticCurveTo(103, 0, 100, 22 + g); ctx.lineTo(78, 6); ctx.closePath(); shape(ctx, VIN, R, 1.4);
  [[-40, -14], [0, 20], [40, 22]].forEach(([x0, w]) => { ctx.beginPath(); ctx.moveTo(x0, -26); ctx.quadraticCurveTo(x0 + 4, -44, x0 + w * 0.5, -42); ctx.quadraticCurveTo(x0 + w, -34, x0 + w + 4, -22); ctx.closePath(); shape(ctx, VIN, R, 1.2); });
  [[-2, 22], [38, 22]].forEach(([x0, w]) => { ctx.beginPath(); ctx.moveTo(x0, 22); ctx.quadraticCurveTo(x0 + w * 0.4, 38, x0 + w, 30); ctx.lineTo(x0 + w + 4, 18); ctx.closePath(); shape(ctx, VIN, R, 1.2); });
  const lijf = () => { ctx.beginPath(); ctx.moveTo(-100, 2); ctx.bezierCurveTo(-96, -22, -64, -32, -20, -30); ctx.bezierCurveTo(30, -28, 66, -14, 80, -6); ctx.lineTo(80, 6); ctx.bezierCurveTo(60, 16, 20, 26, -20, 28); ctx.bezierCurveTo(-70, 30, -96, 20, -100, 2); ctx.closePath(); };
  lijf(); shape(ctx, '#A8A07A', R, 1.6); ctx.save(); lijf(); ctx.clip(); ctx.fillStyle = '#E8E2CC'; ctx.beginPath(); ctx.moveTo(-100, 10); ctx.bezierCurveTo(-40, 12, 30, 8, 80, 4); ctx.lineTo(80, 40); ctx.lineTo(-100, 40); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 40; i++) circ(ctx, -80 + hash(i * 3.3) * 150, -26 + hash(i * 7.1) * 30, 1.8, rgba('#5A5232', 0.7)); ctx.restore();
  ctx.strokeStyle = '#E8E2CC'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-64, -10); ctx.bezierCurveTo(-20, -18, 20, -10, 78, -2); ctx.stroke();
  ctx.strokeStyle = R; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-68, -22); ctx.quadraticCurveTo(-58, 0, -70, 22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-56, 8); ctx.lineTo(-38, 14); ctx.lineTo(-52, 18); ctx.closePath(); shape(ctx, VIN, R, 1);
  circ(ctx, -84, -10, 5, '#E8E2CC', R, 1); circ(ctx, -84, -10, 2.8, '#1A1A1A');
  ctx.strokeStyle = R; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-100, 4); ctx.lineTo(-90, 8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-90, 14); ctx.quadraticCurveTo(-92, 22, -88, 26); ctx.stroke(); // baarddraad
  ctx.restore(); }

// ---------- otoliet, groot (onder de binoculair of in een zoomcirkel) ----------
// ovaal met een kern; per jaar een brede lichte (opake) zone en een smalle donkere (doorzichtige) winterring.
// n = aantal winterringen, toon = 0..1 hoeveel ringen er al staan, goud = 0..1 telt de smalle ringen goud, lees = 0..1 positie van de leeslijn kern → rand
function _otoGrenzen(n) { const b = []; for (let i = 0; i < n; i++) b.push(i === 0 ? 1.6 : 1.15 - i * 0.08); const tot = b.reduce((s, v) => s + v, 0) + 0.25 + 0.3; let acc = 0.3; return b.map(v => { acc += v; return acc / tot; }); }
function otoliet(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const n = o.n || 4, goud = o.goud || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot);
  const ey = 0.62, kx = -0.16 * r; // ovaal (sagitta van een platvis), kern iets naar voren
  const vorm = () => { ctx.beginPath(); for (let i = 0; i <= 72; i++) { const an = i / 72 * 6.283, w = 1 + 0.018 * Math.sin(an * 9) + (Math.cos(an) > 0 ? 0.05 * Math.cos(an) : 0); const px = Math.cos(an) * r * w, py = Math.sin(an) * r * ey * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  const G = _otoGrenzen(n), g0 = 0.12; // kernzone
  // groei: de steen groeit van de kern naar buiten; toon 0..1: toon·n = aantal jaren (deel van een jaar = brede laag groeit)
  const toon = o.toon == null ? 1 : o.toon, jr = clamp(toon * n, 0, n), k = Math.floor(jr), f = jr - k;
  const buiten = toon >= 1 ? 1 : k >= n ? G[n - 1] : lerp(k ? G[k - 1] : g0, G[k], f) + (k ? 0.004 : 0);
  const zone = (s) => { ctx.save(); ctx.translate(kx * (1 - s), 0); ctx.scale(s, s); vorm(); ctx.restore(); };
  zone(buiten); shape(ctx, '#EDE4CC', '#C9C2B0', 2);
  for (let i = n - 1; i >= 0; i--) { const s = G[i]; if (s > buiten + 1e-6) continue; zone(s); ctx.lineWidth = Math.max(2.5, r * 0.032); ctx.strokeStyle = (goud > 0.01 && i < goud * n - 0.001) || o.hl === i ? C.goud : '#6E6A5E'; ctx.stroke(); }
  zone(g0); shape(ctx, '#F6EFDC', '#B8AE92', 1); circ(ctx, kx, 0, Math.max(3, r * 0.045), '#A8977A'); // kern
  ctx.strokeStyle = rgba('#8A7E66', 0.45); ctx.lineWidth = Math.max(1.5, r * 0.018); ctx.beginPath(); ctx.moveTo(-r * 0.7 * buiten, r * 0.1 * buiten); ctx.quadraticCurveTo(0, r * 0.2 * buiten, r * 0.66 * buiten, r * 0.06 * buiten); ctx.stroke(); // groef (sulcus)
  if (o.lees != null && o.lees > 0) { const xe = kx + (r * 1.04 - kx) * o.lees; ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(kx, 0); ctx.lineTo(xe, 0); ctx.stroke(); ctx.setLineDash([]); circ(ctx, xe, 0, 6, C.goud); }
  ctx.restore(); }
// x-positie van winterring i (relatief t.o.v. het midden), voor labels langs de leeslijn
function otolietRingX(r, n, i) { const G = _otoGrenzen(n), s = G[i], kx = -0.16 * r; return kx * (1 - s) + r * s * 1.0; }

// binnenoor van een vis (bovenaanzicht van de schedel, schematisch) met het grootste paar otolieten
function binnenoor(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 150, 110, 0, 0, 6.283); shape(ctx, rgba('#C9B896', 0.12), rgba('#C9B896', 0.5), 2); // schedelholte
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * 70, 0); ctx.scale(k, 1);
    ctx.strokeStyle = rgba('#9FC3E8', 0.75); ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(-6, -30, 24, Math.PI * 0.95, Math.PI * 2.05); ctx.stroke(); // voorste kanaal
    ctx.beginPath(); ctx.arc(14, -24, 20, Math.PI * 1.3, Math.PI * 2.4); ctx.stroke(); // achterste kanaal
    ctx.beginPath(); ctx.ellipse(-2, -10, 30, 12, 0, Math.PI * 0.05, Math.PI * 0.95, true); ctx.stroke(); // horizontaal kanaal
    roundRect(ctx, -26, -8, 52, 22, 11); shape(ctx, rgba('#9FC3E8', 0.25), rgba('#9FC3E8', 0.6), 2); // zakje
    ctx.beginPath(); ctx.ellipse(-2, 32, 28, 16, 0.2, 0, 6.283); shape(ctx, '#F2EAD6', o.goud ? C.goud : '#C9C2B0', o.goud ? 4 : 2); // sagitta (grootste otoliet)
    circ(ctx, -18, 2, 5, '#E8DFC6', '#C9C2B0', 1); circ(ctx, 18, 4, 4, '#E8DFC6', '#C9C2B0', 1); // twee kleinere
    ctx.restore(); }
  ctx.restore(); }

// ---------- meetplank met cm-schaal; de neus tegen het kopschot op 0 ----------
function meetplank(ctx, x, y, pxcm, lenCm = 40, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = pxcm * lenCm, hh = o.hh || pxcm * 9;
  if (o.rechts) { ctx.translate(2 * x + w, 0); ctx.scale(-1, 1); } // kopschot rechts (x = linkerrand van de schaal blijft)
  roundRect(ctx, x - 24, y - hh, w + 48, hh * 2, 10); shape(ctx, '#D8DEE4', '#8A96A6', 2); // wit kunststof
  roundRect(ctx, x - 30, y - hh - 12, 26, hh * 2 + 24, 6); shape(ctx, '#7A8698', '#5A6478', 2); // kopschot
  const yl = y + hh - 40; ctx.fillStyle = '#F2C94C'; ctx.fillRect(x, yl, w, 30);
  for (let c = 0; c <= lenCm; c++) { const xx = x + c * pxcm, lang = c % 5 === 0; ctx.fillStyle = '#2A2F3E'; ctx.fillRect(xx - 1, yl, 2, lang ? 18 : 9); if (c % 10 === 0 && c > 0) { ctx.save(); ctx.translate(xx, yl + 29); if (o.rechts) ctx.scale(-1, 1); text(ctx, String(c), 0, 0, fTekst(Math.min(24, pxcm * 1.1), 700), '#2A2F3E', 'center'); ctx.restore(); } }
  if (o.mark != null && (o.markA == null || o.markA > 0.01)) { ctx.save(); ctx.globalAlpha *= (o.markA == null ? 1 : o.markA); const xx = x + o.mark * pxcm; ctx.fillStyle = C.goud; ctx.fillRect(xx - 2, y - hh, 4, hh * 2); ctx.restore(); }
  ctx.restore(); }

// ---------- sorteerband (zijaanzicht van boven-schuin): band met rollen, vangst als nette tekening ----------
function sorteerband(ctx, x, y, w, a = 1, t = 0, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 120;
  ctx.fillStyle = '#4A5468'; ctx.fillRect(x + 30, y + h, 16, GROND - y - h); ctx.fillRect(x + w - 46, y + h, 16, GROND - y - h);
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#3A4252', '#7A8698', 2);
  roundRect(ctx, x + 12, y + 12, w - 24, h - 24, 8); shape(ctx, '#2A303C', null);
  ctx.strokeStyle = rgba('#7A8698', 0.5); ctx.lineWidth = 2; const v = (t * 30) % 60; for (let xx = x + 20 + v; xx < x + w - 20; xx += 60) { ctx.beginPath(); ctx.moveTo(xx, y + 14); ctx.lineTo(xx, y + h - 14); ctx.stroke(); }
  ctx.restore(); }

// ---------- binoculair (stereomicroscoop), zijaanzicht ----------
function binoculair(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, -24, 240, 24, 8); shape(ctx, '#3A4252', '#8A96A6', 2); // voet
  roundRect(ctx, -30, -40, 60, 16, 4); shape(ctx, '#121A26', '#5A6478', 1.5); // objecttafel (zwart)
  roundRect(ctx, 70, -300, 26, 280, 8); shape(ctx, '#C9CED6', '#8A96A6', 2); // kolom
  roundRect(ctx, -10, -220, 110, 50, 12); shape(ctx, '#C9CED6', '#8A96A6', 2); // arm
  roundRect(ctx, -46, -200, 92, 90, 16); shape(ctx, '#E4E8EC', '#8A96A6', 2); // optiek
  roundRect(ctx, -26, -112, 52, 36, 6); shape(ctx, '#3A4252', '#5A6478', 1.5); // objectief
  ctx.save(); ctx.translate(0, -200); ctx.rotate(-0.5); roundRect(ctx, -34, -80, 26, 80, 6); shape(ctx, '#3A4252', '#5A6478', 1.5); roundRect(ctx, 8, -80, 26, 80, 6); shape(ctx, '#3A4252', '#5A6478', 1.5); ctx.restore(); // twee oculairen
  circ(ctx, 84, -160, 18, '#7A8698', '#5A6478', 2); // focusknop
  circ(ctx, 0, -44, 5, '#F2EAD6'); // het steentje op de tafel
  ctx.restore(); }

// ---------- vissersboot (kotter), zijaanzicht ----------
function kotter(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); const deining = Math.sin((o.t || 0) * 1.2) * 3; ctx.translate(0, deining); ctx.rotate(Math.sin((o.t || 0) * 0.9) * 0.015);
  ctx.beginPath(); ctx.moveTo(-170, -40); ctx.lineTo(180, -52); ctx.lineTo(150, 10); ctx.lineTo(-140, 10); ctx.closePath(); shape(ctx, '#2E4A6E', '#1E3250', 2); // romp
  ctx.fillStyle = '#C9534A'; ctx.beginPath(); ctx.moveTo(-148, 0); ctx.lineTo(154, 0); ctx.lineTo(150, 10); ctx.lineTo(-140, 10); ctx.closePath(); ctx.fill(); // rode waterlijn
  ctx.fillStyle = '#E8ECEF'; ctx.fillRect(-160, -46, 330, 6);
  roundRect(ctx, 60, -120, 90, 74, 6); shape(ctx, '#E8ECEF', '#9AA3B2', 2); // stuurhut voor
  ctx.fillStyle = '#5BA4C9'; ctx.fillRect(70, -108, 22, 18); ctx.fillRect(100, -108, 22, 18); ctx.fillRect(130, -108, 14, 18);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(10, -46); ctx.lineTo(10, -190); ctx.stroke(); // mast
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(10, -170); ctx.lineTo(-130, -60); ctx.moveTo(10, -170); ctx.lineTo(150, -124); ctx.stroke(); // tuigage
  ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-150, -110); ctx.lineTo(-150, -44); ctx.moveTo(-150, -110); ctx.lineTo(-110, -110); ctx.lineTo(-110, -44); ctx.stroke(); // galg achter
  if (o.kabel) { ctx.strokeStyle = rgba('#C9CED6', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-150, -110); ctx.quadraticCurveTo(-200, -20, o.kabel[0] / s, o.kabel[1] / s - deining); ctx.stroke(); }
  ctx.restore(); }

// visnet (kuil) onder water: trechter met mazen; vol = 0..1
function visnet(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(0, -h / 2); ctx.lineTo(w * 0.75, -h * 0.22); ctx.quadraticCurveTo(w, 0, w * 0.75, h * 0.22); ctx.lineTo(0, h / 2); ctx.closePath();
  ctx.fillStyle = rgba('#C9CED6', 0.08); ctx.fill(); ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#C9CED6', 0.55); ctx.lineWidth = 1.5;
  for (let i = -20; i < 40; i++) { ctx.beginPath(); ctx.moveTo(i * 22, -h); ctx.lineTo(i * 22 + h * 1.2, h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i * 22, h); ctx.lineTo(i * 22 + h * 1.2, -h); ctx.stroke(); } ctx.restore();
  ctx.beginPath(); ctx.moveTo(0, -h / 2); ctx.lineTo(w * 0.75, -h * 0.22); ctx.quadraticCurveTo(w, 0, w * 0.75, h * 0.22); ctx.lineTo(0, h / 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -h / 2); ctx.lineTo(0, h / 2); ctx.stroke(); // beugel
  ctx.restore(); }

// ---------- modelzee: vak met water, bodem en schol-iconen (1 icoon = 25 ton) ----------
// n = ton in de zee, nieuw = ton nieuwe vis (goud omlijnd), weg = ton die eruit gaat (vervaagt), u = 0..1 groeit
function modelZee(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.teal, 0.18), rgba(C.teal, 0.8), 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.16); ctx.fillRect(x, y + h - 26, w, 26);
  ctx.strokeStyle = rgba('#9FC3E8', 0.35); ctx.lineWidth = 2; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 8) { const yy = y + 12 + Math.sin(xx * 0.05 + t * 1.5) * 4; xx === x ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); ctx.restore();
  const per = o.per || 10, cw = (w - 40) / per, rh = (h - 110) / Math.max(1, Math.ceil(40 / per) - 1), ic = o.ic || Math.min(1.25, cw / 50);
  const nI = Math.round((o.n || 0) / 25), nN = Math.round((o.nieuw || 0) / 25 * (o.nieuwU == null ? 1 : o.nieuwU)), nW = Math.round((o.weg || 0) / 25);
  const pos = (i) => { const r = Math.floor(i / per), c = i % per; return [x + 20 + cw * (c + 0.5) + (r % 2) * cw * 0.2, y + h - 52 - r * rh]; };
  for (let i = 0; i < nI; i++) { const [px, py] = pos(i), wd = wander(i, t, 3, 0.6); const isWeg = i >= nI - nW; const aa = isWeg ? 1 - (o.wegU || 0) : 1; if (aa <= 0.01) continue;
    let dx = 0, dy = 0; if (isWeg && o.wegNaar) { const u = o.wegU || 0; dx = (o.wegNaar[0] - px) * u; dy = (o.wegNaar[1] - py) * u; }
    scholIcoon(ctx, px + wd.x + dx, py + wd.y + dy, ic, aa, { kijk: i % 3 === 0 ? -1 : 1 }); }
  for (let j = 0; j < nN; j++) { const [px, py] = pos((o.nieuwOp ? nI - nW : nI) + j), wd = wander(j + 50, t, 3, 0.6); scholIcoon(ctx, px + wd.x, py + wd.y, ic, 1, { goud: true, kijk: j % 2 ? -1 : 1 }); }
  if (o.kop) text(ctx, o.kop, x + w / 2, y - 20, fTekst(o.kopPx || 40, 800), C.text, 'center');
  if (o.ton) metaText(ctx, o.ton, x + w / 2, y + h + 44, o.tonKl || C.oker, 'center', 30);
  ctx.restore(); }

// populatiebalk (staand): hoogte ~ ton, met maxlijn 1000
function popBalk(ctx, x, y, w, h, ton, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba('#2A3446', 0.8), C.line, 1.5);
  const hh = h * clamp(ton / 1000, 0, 1); if (hh > 1) { roundRect(ctx, x, y + h - hh, w, hh, 10); shape(ctx, rgba(C.oker, 0.75), C.oker, 2); }
  if (o.lijn != null) { const yy = y + h - h * o.lijn / 1000; lijn(ctx, [[x - 14, yy], [x + w + 14, yy]], o.lijnKl || C.goud, 3); }
  text(ctx, Math.round(ton) + ' ton', x + w / 2, y + h + 46, fTekst(36, 800), C.oker, 'center'); ctx.restore(); }

// ---------- grafieken ----------
// S-curve: populatie tegen tijd, u = 0..1 hoe ver getekend
function sCurve(ctx, x, y, w, h, u = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assenM(ctx, x, y, w, h, 'TIJD →', 'POPULATIE');
  lijn(ctx, [[x, y + h * 0.1], [x + w, y + h * 0.1]], rgba(C.goud, 0.8), 2); metaText(ctx, 'DRAAGKRACHT', x + w, y + h * 0.1 - 14, C.goud, 'right', 28);
  ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); const N = 80;
  for (let i = 0; i <= N * u; i++) { const s = i / N, p = 1 / (1 + Math.exp(-10 * (s - 0.45))), xx = x + s * w, yy = y + h - (0.04 + p * 0.86) * h; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
// heuvel: aanwas per jaar tegen populatie (model), punten = [[ton, a, kl]]
function heuvel(ctx, x, y, w, h, u = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (n) => x + n / 1000 * w, Y = (v) => y + h - v / 150 * h;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
  for (const n of [0, 500, 1000]) { ctx.fillStyle = C.line; ctx.fillRect(X(n) - 1, y + h, 2, 10); metaText(ctx, String(n), X(n), y + h + 40, C.text2, 'center', 28); }
  metaText(ctx, o.xl || 'POPULATIE (TON)', x + w, y + h + 80, C.text2, 'right', 28); metaText(ctx, o.yl || 'AANWAS PER JAAR (TON)', x - 10, y - 24, C.text2, 'left', 28);
  if (o.band) { ctx.save(); ctx.globalAlpha *= o.band; ctx.fillStyle = rgba(C.text2, 0.18); ctx.beginPath(); for (let i = 0; i <= 60; i++) { const n = i / 60 * 1000; const v = AANWAS(n) * 1.25 + 6; i ? ctx.lineTo(X(n), Y(v)) : ctx.moveTo(X(n), Y(v)); } for (let i = 60; i >= 0; i--) { const n = i / 60 * 1000; ctx.lineTo(X(n), Y(Math.max(0, AANWAS(n) * 0.75 - 6))); } ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 80 * u; i++) { const n = i / 80 * 1000; i ? ctx.lineTo(X(n), Y(AANWAS(n))) : ctx.moveTo(X(n), Y(AANWAS(n))); } ctx.stroke();
  (o.punten || []).forEach(([n, pa, kl, lab]) => { if (pa <= 0.01) return; ctx.save(); ctx.globalAlpha *= pa; const px = X(n), py = Y(AANWAS(n)); stippel(ctx, px, py, px, y + h, rgba(kl || C.oker, 0.7), 1, 2); circ(ctx, px, py, 10, kl || C.oker, '#0D1420', 2); if (lab) text(ctx, lab, px, py - 22, fTekst(34, 800), kl || C.oker, 'center'); ctx.restore(); });
  ctx.restore(); return { X, Y }; }

// ---------- kaarten (equirectangulair, cos(lat)-gecorrigeerd) met kustlijnen uit AARDE_LAND ----------
let _MB1_POLYS = null;
function _mb1Polys() { if (_MB1_POLYS) return _MB1_POLYS; _MB1_POLYS = MB1_LAND.split(';').map(r => { const n = r.split(',').map(Number), p = []; for (let i = 0; i < n.length; i += 2) p.push([n[i] / 10, n[i + 1] / 10]); return p; }); return _MB1_POLYS; }
// view: {lon, lat (midden), k (px per breedtegraad)}; tekent in rechthoek (x,y,w,h)
function zeeKaart(ctx, x, y, w, h, view, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip();
  ctx.fillStyle = '#163A55'; ctx.fillRect(x, y, w, h); // zeewater (teal-blauw, donker)
  const cl = Math.cos(view.lat * Math.PI / 180), P = (lo, la) => [x + w / 2 + (lo - view.lon) * view.k * cl, y + h / 2 - (la - view.lat) * view.k];
  ctx.beginPath(); for (const p of _mb1Polys()) { p.forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); }
  ctx.fillStyle = '#4C5A48'; ctx.fill('evenodd'); ctx.strokeStyle = rgba('#9FC3E8', 0.55); ctx.lineWidth = 1.5; ctx.stroke();
  if (o.teken) o.teken(P);
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function kaartProj(x, y, w, h, view) { const cl = Math.cos(view.lat * Math.PI / 180); return (lo, la) => [x + w / 2 + (lo - view.lon) * view.k * cl, y + h / 2 - (la - view.lat) * view.k]; }
function mixView(v1, v2, u) { u = ease(u); return { lon: lerp(v1.lon, v2.lon, u), lat: lerp(v1.lat, v2.lat, u), k: Math.exp(lerp(Math.log(v1.k), Math.log(v2.k), u)) }; }
const VIEW_NZ = { lon: 3.0, lat: 56.2, k: 78 }, VIEW_AT = { lon: -24, lat: 52, k: 27 }, VIEW_NF = { lon: -52, lat: 49, k: 62 };

// biomassablok (oker) op de kaart, oppervlak ~ ton
function biomassaBlok(ctx, x, y, ton, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = Math.sqrt(ton / 2000000) * (o.max || 220), z = Math.max(8, s);
  roundRect(ctx, x - z / 2, y - z / 2, z, z, Math.min(14, z / 4)); shape(ctx, rgba(o.kl || C.oker, 0.75), o.rand || o.kl || C.oker, o.rand ? 4 : 2); ctx.restore(); }

// ---------- slagboom ----------
function slagboom(ctx, x, y, open = 0, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 16, y - 120, 32, 120, 6); shape(ctx, '#5A6478', '#8A96A6', 2);
  ctx.save(); ctx.translate(x, y - 100); ctx.rotate(-open * 1.35); const L = o.L || 300; roundRect(ctx, 0, -14, L, 28, 8); shape(ctx, '#F2F2EE', '#8A96A6', 2);
  ctx.save(); roundRect(ctx, 0, -14, L, 28, 8); ctx.clip(); ctx.fillStyle = C.koraal; for (let i = 0; i < L; i += 60) { ctx.beginPath(); ctx.moveTo(i, -14); ctx.lineTo(i + 30, -14); ctx.lineTo(i + 14, 14); ctx.lineTo(i - 16, 14); ctx.closePath(); ctx.fill(); } ctx.restore(); ctx.restore();
  circ(ctx, x, y - 100, 12, '#8A96A6'); ctx.restore(); }

// ---------- quotumroute: kaartjes met pijlen ----------
function routeStap(ctx, x, y, w, s2, kl, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = o.h || 96; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), kl, o.dik || 2.5);
  const regels = s2.split('\n'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + h / 2 + 12 - (regels.length - 1) * 18 + i * 36, fTekst(o.px || 32, 700), o.tk || C.text, 'center')); ctx.restore(); }
// vergadertafel (vooraanzicht) met mapjes
function tafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 20, w, 24, 6); shape(ctx, '#8A6A44', '#5A4430', 2);
  ctx.fillStyle = '#5A4430'; ctx.fillRect(x - w / 2 + 20, y + 4, 14, 90); ctx.fillRect(x + w / 2 - 34, y + 4, 14, 90);
  for (let i = 0; i < 5; i++) { const xx = x - w / 2 + 50 + i * (w - 100) / 4; roundRect(ctx, xx - 26, y - 34, 52, 14, 3); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); } ctx.restore(); }

// ---------- zee met horizon (cold open, ver weg) ----------
function golfjes(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#9FC3E8', 0.5); ctx.lineWidth = 2; for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) { const yy = y + r * 18 + Math.sin(xx * 0.04 + t * 1.4 + r) * 3; xx === x ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); } ctx.restore(); }

// jaarteller
function jaarTeller(ctx, x, y, jaar, a = 1, max = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'JAAR', x, y, C.text2, 'left', 28);
  for (let i = 1; i <= max; i++) { const on = jaar >= i - 0.001; circ(ctx, x + 110 + (i - 1) * 64, y - 9, 24, on ? rgba(C.goud, 0.25) : rgba('#2A3446', 0.8), on ? C.goud : C.line, 2); text(ctx, String(i), x + 110 + (i - 1) * 64, y + 2, fTekst(28, 800), on ? C.goud : C.text2, 'center'); }
  ctx.restore(); }
const MB1_LAND = '96,409,96,392,86,389,82,409,92,413,96,409;156,382,151,375,151,367,124,378,127,382,138,380,156,382;-527,699,-519,696,-536,693,-549,697,-543,699,-548,701,-544,703,-527,699;-31,585,-41,576,-21,577,-18,575,-26,566,-33,564,-27,563,-38,561,-26,560,-17,556,-12,547,-1,541,1,536,-7,537,3,533,0,529,17,528,16,521,4,515,14,512,2,508,-30,507,-37,502,-42,504,-56,501,-42,512,-31,512,-24,517,-33,514,-52,517,-40,525,-41,529,-47,528,-43,531,-27,533,-31,535,-28,541,-36,545,-30,550,-50,548,-52,550,-47,555,-49,559,-46,559,-48,562,-52,559,-51,562,-57,553,-52,568,-57,565,-61,567,-57,569,-57,577,-52,579,-54,581,-50,586,-31,585;-72,551,-61,552,-57,548,-59,546,-55,545,-63,540,-60,529,-63,522,-93,515,-101,516,-96,519,-103,518,-99,521,-104,522,-88,527,-99,526,-89,532,-101,534,-96,538,-101,543,-85,542,-81,546,-88,547,-83,551,-77,553,-77,550,-73,554,-70,552,-72,551;-760,690,-760,677,-760,674,-760,673,-760,666,-760,665,-760,662,-760,664,-760,671,-760,668,-760,670,-760,671,-760,669,-760,662,-760,661,-760,656,-760,658,-760,655,-760,657,-760,655,-760,652,-760,650,-760,648,-760,644,-760,643,-760,645,-760,644,-760,648,-760,655,-760,660,-760,664,-760,662,-760,659,-760,655,-760,651,320,650,320,646,320,651,320,650,320,648,320,650,320,647,320,649,320,647,320,646,320,648,320,643,320,644,320,638,320,636,320,628,320,623,320,628,320,626,320,615,320,604,320,600,320,606,320,604,320,599,320,605,320,598,320,601,320,599,320,593,320,581,320,577,320,579,320,578,320,572,320,562,320,561,320,562,320,565,320,561,320,555,320,548,320,542,320,538,320,531,320,530,320,524,320,518,320,510,320,552,320,567,320,573,320,578,320,580,320,605,320,609,320,623,320,624,320,627,320,626,320,616,320,617,320,606,320,610,320,619,320,617,320,598,320,595,320,592,320,589,320,591,320,593,320,598,320,595,320,594,320,593,320,595,320,592,320,594,320,592,320,549,320,546,320,538,320,543,320,541,320,539,320,535,320,540,320,535,320,543,320,533,320,531,320,522,320,508,320,501,320,484,320,438,320,427,320,429,320,433,320,417,320,409,320,398,320,392,320,387,320,371,320,360,320,367,320,368,320,369,320,378,320,380,320,377,320,379,320,381,320,387,320,388,320,395,320,396,320,400,320,387,320,394,320,395,320,405,320,410,320,409,320,392,320,391,320,384,320,380,320,372,320,378,320,374,320,368,320,370,320,366,320,361,320,362,320,360,313,360,300,360,279,360,256,360,226,360,200,360,188,360,184,360,179,360,183,360,182,360,167,360,153,360,150,360,145,360,118,360,126,360,137,360,138,360,130,360,134,360,123,360,131,360,122,360,118,360,96,360,90,360,95,360,87,360,93,360,94,360,100,360,93,360,96,360,94,360,99,360,97,360,90,360,89,360,83,360,71,360,69,360,68,360,69,360,61,360,55,360,52,360,55,360,44,360,35,360,37,360,13,360,-20,360,-32,360,-30,360,-32,360,-33,360,-44,360,-75,360,-91,360,-125,360,-133,360,-129,360,-132,360,-131,360,-137,360,-154,360,-151,360,-155,360,-151,360,-159,360,-168,360,-164,360,-168,360,-167,360,-154,360,-164,360,-166,360,-175,360,-166,360,-160,360,-165,360,-162,360,-169,360,-171,360,-169,360,-159,360,-149,360,-144,360,-136,360,-129,360,-116,360,-102,360,-97,360,-98,360,-92,360,-85,360,-69,360,-59,360,-53,360,-46,360,-30,360,-28,360,-19,360,13,365,38,369,53,366,65,371,79,369,97,373,102,372,104,367,110,371,111,369,105,363,111,360,101,360,103,360,123,360,133,360,152,360,157,360,178,360,189,360,200,360,201,360,217,360,231,360,233,360,249,360,252,360,268,360,291,360,311,360,319,360,320,360,318,360,320,360,320,363,320,368,320,366,320,368,320,362,320,360,312,368,306,369,304,363,297,362,290,367,275,367,282,370,273,370,275,372,271,377,272,380,263,383,264,386,267,383,271,385,268,387,270,389,267,393,269,396,261,395,262,400,267,404,290,404,290,406,298,407,291,409,291,412,313,411,320,420,320,421,320,413,320,409,320,410,320,414,320,420,320,427,320,452,320,454,320,460,320,461,320,466,320,467,320,470,320,473,320,466,320,461,320,464,320,462,320,457,320,453,320,454,320,451,320,444,320,446,320,451,320,454,320,461,318,463,320,464,316,466,320,466,318,472,319,467,308,466,302,459,296,457,296,448,289,450,286,435,281,434,275,425,282,416,291,412,290,410,275,410,262,401,268,406,251,410,238,407,243,401,237,403,239,400,226,405,226,400,233,392,229,393,231,390,226,389,240,383,241,378,230,379,235,375,227,375,232,364,227,368,225,364,221,370,217,369,217,374,211,379,218,383,228,380,232,381,224,384,211,384,208,389,211,390,203,393,193,404,196,418,170,430,177,429,169,434,160,435,152,442,155,443,145,453,139,448,135,455,138,456,132,458,123,454,124,442,136,436,145,422,162,419,159,415,185,402,183,398,179,403,169,405,165,397,171,394,172,390,166,388,161,379,156,380,162,389,157,400,111,424,105,430,102,439,88,444,61,431,41,436,33,432,30,428,32,419,7,408,9,407,-3,395,2,388,-5,383,-7,376,-16,374,-21,368,-44,367,-56,360,-64,366,-62,369,-69,373,-90,370,-89,384,-87,384,-93,387,-88,391,-95,388,-87,408,-87,423,-92,432,-77,438,-20,433,-15,436,-11,455,-5,450,-12,457,-11,463,-21,469,-21,473,-17,472,-43,478,-47,480,-42,483,-47,485,-32,488,-27,485,-14,487,-19,497,-13,497,-11,494,4,494,2,497,14,501,18,509,42,514,35,515,43,515,40,519,48,529,55,533,72,533,72,537,76,537,85,534,86,539,98,536,86,543,90,545,87,553,81,556,82,566,92,567,91,570,83,568,86,571,106,577,103,566,109,564,96,555,95,550,100,547,99,545,110,544,109,540,114,539,130,544,146,536,138,541,144,539,181,548,194,544,211,556,206,550,212,549,210,566,217,576,226,577,236,570,244,573,245,584,238,584,235,592,255,596,279,594,281,598,302,599,286,604,285,607,265,604,266,606,230,598,232,600,229,602,225,600,226,604,214,606,216,616,211,626,215,632,223,633,246,648,254,650,253,655,246,659,224,659,214,653,216,651,211,648,215,645,208,639,174,625,176,622,171,616,172,607,180,606,190,598,180,594,186,594,183,591,162,586,169,585,167,584,165,571,160,562,148,562,142,558,142,554,133,553,129,554,130,557,125,563,128,563,129,566,112,584,111,590,114,591,108,592,106,598,102,590,96,591,82,581,67,581,56,586,56,590,64,590,59,591,64,595,52,592,52,596,62,598,57,599,61,602,70,605,62,603,51,596,52,601,57,601,51,604,56,607,51,606,50,610,70,610,76,612,74,614,72,612,51,612,50,614,53,615,49,619,67,619,51,622,66,624,61,624,64,626,81,627,67,627,76,631,86,628,82,632,87,636,108,635,114,640,101,635,96,638,115,647,113,648,115,650,127,652,121,654,130,660,128,661,140,663,131,662,132,666,140,668,137,669,141,671,154,672,144,673,150,676,156,673,153,678,148,678,160,682,163,679,162,683,176,684,165,685,181,692,183,695,189,693,186,695,197,698,196,694,203,699,201,693,207,695,206,699,220,698,214,702,227,704,234,700,248,710,258,708,250,701,265,709,267,709,266,704,275,708,273,710,281,710,284,709,279,707,283,707,282,702,288,709,309,704,288,701,297,697,315,697,320,700,320,697,320,695,320,694,320,691,320,693,320,692,320,677,320,672,320,668,320,661,319,672,320,660,320,654,320,644,320,638,320,641,320,648,320,652,320,646,320,648,320,656,320,665,320,660,320,669,320,673,320,683,320,687,320,685,320,678,320,674,320,668,320,670,320,676,320,677,320,679,320,685,320,684,320,685,320,686,320,690,320,689,320,684,320,683,320,682,320,686,320,690,320,687,320,684,320,687,320,690,320,696,320,698,320,695,320,683,320,690,320,696,320,707,320,708,320,711,320,717,320,720,320,715,320,710,320,690,320,685,320,678,320,670,320,667,320,668,320,664,320,663,320,678,320,684,320,689,320,690,320,685,320,678,320,676,320,678,320,682,320,683,320,689,320,692,320,698,320,706,320,714,320,720,320,717,320,714,320,713,320,709,320,716,320,719,320,720,320,717,320,713,320,706,320,704,320,709,320,702,320,701,320,705,320,711,320,717,320,720,320,718,320,719,320,717,320,711,320,707,320,719,320,714,320,716,320,711,320,713,320,714,320,716,320,715,320,720,320,719,320,720,320,719,320,717,320,720,320,719,320,717,320,715,320,712,320,713,320,708,320,711,320,709,320,705,320,698,320,696,320,689,320,685,320,689,320,694,320,697,320,695,320,697,320,688,320,691,320,696,320,701,320,699,320,690,-760,690;-155,662,-146,664,-151,661,-144,658,-145,656,-136,655,-136,650,-149,643,-187,634,-212,639,-227,638,-227,641,-215,644,-221,643,-216,646,-240,649,-219,650,-225,652,-218,654,-245,655,-233,658,-238,658,-235,662,-224,659,-229,662,-225,663,-231,663,-229,664,-214,660,-214,657,-217,657,-211,653,-208,656,-205,656,-202,661,-195,658,-194,661,-188,662,-181,657,-183,662,-176,660,-165,662,-162,665,-155,662;-760,710,-760,716,-760,720,-760,719,-760,720,-760,719,-760,720,-752,720,-751,720,-759,717,-743,720,-752,717,-747,717,-750,712,-739,718,-742,714,-737,716,-732,713,-733,715,-729,717,-716,715,-712,712,-726,708,-707,711,-719,704,-713,705,-714,701,-706,707,-692,708,-684,705,-701,700,-688,702,-690,700,-687,699,-681,703,-672,698,-693,695,-667,693,-690,691,-678,691,-679,688,-693,689,-667,685,-670,683,-669,681,-662,683,-664,678,-659,681,-654,677,-649,680,-650,678,-638,676,-647,674,-630,672,-637,668,-621,670,-613,666,-621,666,-616,664,-619,663,-626,664,-620,660,-626,660,-624,658,-627,656,-635,659,-636,649,-643,652,-643,654,-646,651,-654,658,-644,663,-658,660,-657,662,-670,666,-673,666,-672,663,-679,665,-674,659,-687,662,-682,661,-679,656,-671,654,-673,653,-667,648,-654,647,-655,645,-651,644,-656,643,-644,637,-647,632,-652,638,-647,629,-652,629,-651,626,-679,637,-678,634,-689,638,-660,622,-663,619,-713,631,-720,634,-714,636,-725,638,-735,644,-733,646,-741,644,-747,648,-749,648,-747,645,-760,642,-760,645,-760,649,-760,655,-758,652,-755,648,-758,653,-736,655,-744,662,-722,673,-733,684,-738,684,-738,687,-749,688,-747,690,-760,687,-760,690,-757,692,-760,695,-760,697,-760,696,-760,698,-760,702,-760,706,-760,704,-760,700,-760,701,-760,697,-760,705,-760,711,-760,710,-760,715,-760,719,-760,720,-760,719,-760,714,-760,710;-760,718,-760,713,-760,709,-760,702,-760,701,-760,700,-760,697,-760,695,-760,693,-760,689,-760,685,-760,683,-760,693,-760,688,-760,683,-760,679,-760,672,-760,675,-760,687,-760,688,-760,691,-760,692,-760,698,-760,696,-760,695,-760,692,-760,689,-760,687,-760,684,-760,675,-760,671,-760,664,-760,670,-760,669,-760,667,-760,662,-760,665,-760,661,-760,653,-760,659,-760,660,-760,652,-760,642,-760,641,-760,640,-760,637,-760,636,-760,641,-760,639,-760,633,-760,630,-760,628,-760,626,-760,625,-760,623,-760,622,-760,624,-760,622,-760,619,-760,618,-760,605,-760,591,-760,587,-760,583,-760,587,-760,573,-760,569,-760,572,-760,556,-760,553,-760,551,-760,553,-760,551,-760,530,-760,524,-760,522,-760,518,-760,514,-760,511,-760,513,-760,508,-760,513,-760,516,-760,512,-760,515,-760,518,-760,523,-760,537,-760,540,-760,547,-760,553,-760,564,-760,578,-760,587,-760,597,-760,596,-760,600,-760,601,-760,608,-760,616,-760,618,-760,623,-760,626,-746,621,-737,625,-727,621,-728,618,-722,618,-722,616,-716,616,-719,614,-714,612,-695,610,-697,601,-707,600,-697,599,-697,593,-693,593,-695,589,-702,588,-684,587,-684,582,-690,579,-680,585,-681,581,-678,584,-677,580,-664,588,-660,584,-660,588,-654,591,-657,592,-655,595,-650,594,-654,598,-650,598,-648,603,-645,603,-648,600,-643,601,-638,595,-639,594,-634,592,-640,591,-632,591,-629,587,-635,583,-626,585,-633,580,-620,579,-620,576,-625,575,-613,570,-614,567,-625,568,-614,564,-617,562,-614,562,-615,560,-603,558,-602,555,-606,551,-598,553,-594,552,-598,548,-593,552,-574,546,-604,537,-601,535,-603,533,-579,541,-583,542,-574,542,-571,538,-575,536,-573,535,-565,538,-560,535,-558,526,-563,525,-557,525,-560,524,-557,522,-570,515,-585,513,-601,503,-665,502,-674,493,-683,492,-697,482,-710,485,-699,482,-700,477,-713,468,-743,455,-740,453,-747,450,-736,454,-732,460,-705,470,-682,486,-655,493,-643,489,-645,488,-643,484,-653,480,-667,480,-647,477,-653,471,-648,471,-645,462,-628,456,-620,459,-610,453,-636,445,-643,445,-655,435,-661,438,-659,446,-661,445,-644,453,-641,450,-634,454,-649,454,-643,458,-646,459,-659,452,-660,454,-664,451,-671,452,-670,448,-681,444,-684,445,-685,443,-688,446,-692,440,-702,438,-708,428,-706,426,-710,423,-704,418,-700,418,-701,421,-699,417,-712,415,-714,418,-715,414,-729,413,-740,408,-740,412,-743,405,-740,404,-741,398,-749,389,-755,395,-751,400,-755,398,-750,384,-759,372,-757,380,-760,387,-759,395,-760,393,-760,384,-760,385,-760,381,-760,384,-760,389,-760,384,-760,379,-760,377,-760,382,-760,376,-760,373,-760,375,-760,371,-760,373,-760,369,-755,360,-759,367,-758,361,-760,362,-760,360,-758,360,-760,360,-756,360,-754,360,-748,360,-743,360,-744,360,-741,360,-733,360,-716,360,-711,360,-720,360,-716,360,-721,360,-716,360,-712,360,-711,360,-715,360,-698,360,-703,360,-700,360,-696,360,-684,360,-681,360,-662,360,-651,360,-637,360,-643,360,-619,360,-629,360,-627,360,-625,360,-623,360,-621,360,-617,360,-616,360,-608,360,-612,360,-616,360,-613,360,-602,360,-588,360,-585,360,-587,360,-584,360,-580,360,-572,360,-570,360,-559,360,-558,360,-544,360,-541,360,-542,360,-538,360,-529,360,-520,360,-518,360,-517,360,-515,360,-512,360,-507,360,-500,360,-499,360,-513,360,-520,360,-527,360,-519,360,-509,360,-504,360,-493,360,-496,360,-492,360,-484,360,-481,360,-474,360,-455,360,-453,360,-451,360,-447,360,-448,360,-444,360,-447,360,-442,360,-434,360,-415,360,-400,360,-372,360,-355,360,-348,360,-353,360,-374,360,-382,360,-389,360,-392,360,-396,360,-398,360,-410,360,-417,360,-420,360,-432,360,-446,360,-455,360,-469,360,-482,360,-487,360,-484,360,-487,360,-486,360,-488,360,-497,360,-509,360,-520,360,-521,360,-513,360,-506,360,-513,360,-520,360,-527,360,-542,360,-562,360,-578,360,-584,360,-582,360,-585,360,-572,360,-574,360,-567,360,-575,360,-582,360,-611,360,-623,360,-621,360,-624,360,-636,360,-651,360,-650,360,-644,360,-638,360,-636,360,-650,360,-643,360,-653,360,-656,360,-669,360,-676,360,-668,360,-659,360,-658,360,-662,360,-658,360,-675,360,-679,360,-683,360,-687,360,-690,360,-684,360,-694,360,-691,360,-695,360,-690,360,-684,360,-692,360,-708,360,-710,360,-713,360,-724,360,-719,360,-718,360,-712,360,-725,360,-731,360,-727,360,-715,360,-727,360,-731,360,-736,360,-731,360,-740,360,-743,360,-728,360,-727,360,-725,360,-732,360,-726,360,-735,360,-742,360,-739,360,-748,360,-751,360,-747,360,-746,360,-738,360,-737,360,-740,360,-742,360,-740,360,-746,360,-740,360,-743,360,-738,360,-741,360,-739,360,-744,360,-743,360,-740,360,-745,360,-746,360,-734,360,-737,360,-742,360,-747,360,-741,360,-745,360,-742,360,-743,360,-750,360,-755,360,-754,360,-757,360,-749,360,-751,360,-742,360,-740,360,-744,360,-737,360,-738,360,-737,360,-729,360,-734,360,-727,360,-733,360,-728,360,-724,360,-728,360,-723,360,-735,360,-740,360,-732,360,-737,360,-732,360,-722,360,-715,360,-717,360,-713,360,-715,360,-706,360,-704,360,-706,360,-701,360,-704,360,-715,360,-751,360,-759,360,-760,360,-760,363,-760,369,-760,375,-760,378,-760,375,-760,380,-760,381,-760,380,-760,389,-760,398,-760,404,-760,415,-760,428,-760,437,-760,462,-760,463,-760,467,-760,469,-760,470,-760,484,-760,481,-760,479,-760,474,-760,479,-760,473,-760,471,-760,480,-760,484,-760,488,-760,491,-760,494,-760,493,-760,497,-760,494,-760,495,-760,497,-760,502,-760,498,-760,500,-760,504,-760,509,-760,505,-760,506,-760,507,-760,511,-760,509,-760,512,-760,516,-760,517,-760,522,-760,524,-760,521,-760,525,-760,528,-760,518,-760,522,-760,525,-760,524,-760,529,-760,528,-760,535,-760,537,-760,533,-760,536,-760,539,-760,538,-760,533,-760,537,-760,542,-760,544,-760,555,-760,556,-760,551,-760,559,-760,553,-760,547,-760,552,-760,553,-760,561,-760,556,-760,562,-760,572,-760,576,-760,578,-760,579,-760,581,-760,585,-760,582,-760,584,-760,594,-760,582,-760,584,-760,588,-760,589,-760,590,-760,588,-760,590,-760,585,-760,582,-760,595,-760,600,-760,596,-760,598,-760,600,-760,597,-760,601,-760,600,-760,603,-760,607,-760,605,-760,607,-760,611,-760,609,-760,612,-760,608,-760,607,-760,605,-760,600,-760,601,-760,598,-760,592,-760,594,-760,598,-760,607,-760,610,-760,609,-760,612,-760,615,-760,603,-760,600,-760,592,-760,588,-760,574,-760,570,-760,564,-760,561,-760,554,-760,556,-760,551,-760,552,-760,548,-760,551,-760,559,-760,558,-760,560,-760,563,-760,575,-760,581,-760,582,-760,584,-760,591,-760,586,-760,589,-760,590,-760,584,-760,591,-760,586,-760,591,-760,596,-760,603,-760,607,-760,603,-760,600,-760,598,-760,605,-760,609,-760,606,-760,608,-760,609,-760,611,-760,617,-760,625,-760,629,-760,632,-760,630,-760,635,-760,637,-760,643,-760,644,-760,648,-760,644,-760,647,-760,644,-760,646,-760,652,-760,653,-760,657,-760,666,-760,662,-760,661,-760,662,-760,664,-760,668,-760,669,-760,665,-760,664,-760,667,-760,670,-760,671,-760,676,-760,684,-760,689,-760,690,-760,703,-760,706,-760,703,-760,705,-760,706,-760,708,-760,709,-760,714,-760,711,-760,708,-760,711,-760,708,-760,707,-760,705,-760,701,-760,687,-760,691,-760,697,-760,695,-760,693,-760,701,-760,693,-760,688,-760,687,-760,694,-760,695,-760,692,-760,697,-760,700,-760,698,-760,703,-760,704,-760,706,-760,694,-760,702,-760,697,-760,694,-760,698,-760,689,-760,684,-760,681,-760,679,-760,678,-760,677,-760,680,-760,673,-760,671,-760,664,-760,670,-760,669,-760,678,-760,686,-760,681,-760,683,-760,686,-760,689,-760,681,-760,677,-760,678,-760,681,-760,676,-760,679,-760,684,-760,685,-760,683,-760,680,-760,682,-760,675,-760,670,-760,666,-760,669,-760,673,-760,677,-760,680,-760,686,-760,690,-760,688,-760,691,-760,693,-760,694,-760,698,-760,703,-760,707,-760,711,-760,713,-760,715,-760,716,-760,719,-760,718;-757,683,-751,681,-754,674,-760,672,-760,677,-760,683,-757,683;-555,515,-560,513,-558,510,-568,496,-562,501,-555,500,-561,496,-552,495,-554,491,-545,495,-536,493,-542,488,-537,487,-541,484,-530,486,-539,480,-536,480,-539,478,-537,476,-529,481,-532,475,-528,478,-527,475,-531,467,-536,466,-536,471,-542,469,-539,474,-542,479,-545,474,-558,469,-548,477,-593,476,-593,479,-583,485,-592,486,-587,486,-584,491,-580,490,-582,494,-578,495,-579,497,-570,510,-560,516,-555,515;-300,720,-258,720,-320,720,-251,720,-217,720,-231,720,-299,720,-251,720,-243,720,-213,720,-212,720,-231,720,-196,720,-175,720,-161,720,-142,720,-114,720,-168,720,-159,720,-165,720,-202,720,-194,720,-190,720,-211,720,-210,720,-217,720,-195,720,-207,720,-205,720,-184,720,-183,720,-226,720,-199,720,-194,720,-195,720,-222,720,-210,720,-209,720,-200,720,-193,720,-211,720,-220,720,-218,720,-220,720,-223,720,-204,720,-206,720,-223,720,-255,720,-248,720,-261,720,-273,720,-265,720,-276,720,-241,720,-220,720,-223,720,-241,720,-246,720,-267,720,-248,720,-247,720,-251,720,-220,717,-225,714,-218,715,-215,705,-224,705,-224,709,-227,704,-233,705,-246,712,-271,716,-258,715,-257,712,-284,710,-281,707,-291,704,-266,705,-276,701,-274,700,-255,704,-223,700,-239,697,-265,687,-310,681,-323,684,-322,680,-332,676,-346,664,-359,664,-356,661,-378,656,-380,657,-373,663,-382,664,-378,663,-381,659,-385,660,-382,657,-402,656,-397,653,-411,650,-402,645,-416,643,-406,641,-405,637,-414,631,-422,632,-416,630,-419,627,-429,627,-422,626,-421,619,-426,617,-423,616,-430,605,-439,606,-432,604,-431,601,-440,600,-437,599,-439,598,-444,599,-442,603,-446,600,-454,602,-448,607,-460,606,-459,612,-469,608,-482,608,-478,610,-484,610,-493,616,-494,619,-488,621,-496,620,-496,622,-503,625,-498,630,-504,628,-515,640,-503,642,-517,642,-507,647,-500,644,-501,647,-510,652,-507,648,-519,642,-525,653,-511,658,-526,655,-532,656,-531,660,-534,660,-512,669,-536,662,-534,666,-524,669,-537,670,-538,674,-525,678,-506,675,-512,677,-510,678,-523,678,-537,675,-532,682,-516,681,-512,684,-534,683,-530,686,-511,686,-508,688,-512,687,-511,691,-503,692,-511,692,-503,700,-523,701,-545,707,-507,704,-518,710,-510,710,-530,712,-529,715,-518,717,-534,716,-531,718,-537,720,-539,720,-535,719,-540,715,-556,716,-548,720,-556,720,-553,720,-556,720,-547,720,-557,720,-553,720,-561,720,-558,720,-562,720,-572,720,-563,720,-586,720,-583,720,-585,720,-633,720,-670,720,-668,720,-683,720,-695,720,-681,720,-712,720,-664,720,-663,720,-694,720,-705,720,-701,720,-728,720,-716,720,-658,720,-648,720,-642,720,-668,720,-672,720,-670,720,-645,720,-630,720,-632,720,-630,720,-614,720,-611,720,-612,720,-604,720,-566,720,-593,720,-545,720,-537,720,-536,720,-530,720,-495,720,-509,720,-500,720,-447,720,-443,720,-456,720,-414,720,-461,720,-465,720,-462,720,-404,720,-382,720,-379,720,-387,720,-377,720,-300,720';
