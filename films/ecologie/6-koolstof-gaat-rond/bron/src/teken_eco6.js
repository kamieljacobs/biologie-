// teken_eco6.js — Ecologie v2 · film 6 Koolstof gaat rond — film-eigen tekeningen (voorvoegsel e6), 29 okt 2026.
// Laadt na lib.js, base.js, dier_basis.js, lib_cast.js, lib_evo.js, de pop-bestanden, lib_eco.js en e11_aarde.js.
// Kleuren (seriebrief): koolstof donkergrijs #5E6675 / CO₂ lichtgrijs, organische stof groen, energie goud (alleen het gevolgde atoom = focus), warmte koraal, water teal.
// Reconstructie Carboon (C9): boomvaren (Psaronius) 8–10 m, rechte stam met wortelmantel, kroon van grote gevederde bladen; wolfsklauwboom (Lepidodendron) tot 30–40 m,
// rechte stam met ruitvormige bladlittekens, kroon pas hoog en dichotoom (steeds in tweeën) vertakt; reuzenpaardenstaart (Calamites) 5–10 m, geleed met kransen.

var E6K = { koolstof: ECOK.koolstof, co2: '#AEB6C4', co2R: '#D2D8E2', org: C.groen, energie: C.goud, warmte: C.koraal, water: C.teal };
// ecoTag, ecoTitelKaart, ecoVraagKaart, ecoSchaal en ECOK komen uit lib_eco.js.
function e6Bg(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }

// ---------- het gevolgde atoom en CO2 ----------
function e6Atoom(ctx, x, y, r = 14, o = {}) { const { a = 1, ring = true } = o; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.goud, _lt(C.goud, 0.35), 2);
  text(ctx, 'C', x, y + r * 0.42, fTekst(Math.round(r * 1.25), 800), '#3A2E10', 'center'); if (ring) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r + 9, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// CO2 = O=C=O: drie bolletjes op een rij (C donkergrijs of goud als het gevolgde atoom, O teal-grijs)
function e6Co2(ctx, x, y, s = 1, o = {}) { const { a = 1, goud = false, hoek = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(hoek); ctx.scale(s, s);
  for (const dx of [-17, 17]) circ(ctx, dx, 0, 10, '#8FB4C8', '#B8D2E0', 1.5); circ(ctx, 0, 0, 11, goud ? C.goud : E6K.koolstof, goud ? _lt(C.goud, 0.35) : '#8A93A2', 1.5);
  if (goud) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / s; ctx.beginPath(); ctx.arc(0, 0, 32, 0, 6.283); ctx.stroke(); } ctx.restore(); }

// ---------- Carboon-moerasbos (Macro-nacht) ----------
function e6Boomvaren(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, licht = false } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const stam = licht ? '#6A5A44' : '#5A4A3A'; ctx.strokeStyle = stam; ctx.lineWidth = h * 0.045; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + h * 0.03 * (hash(seed) - 0.5), y - h * 0.5, x, y - h); ctx.stroke();
  ctx.lineWidth = h * 0.075; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h * 0.18); ctx.stroke(); // wortelmantel onderaan dikker
  const bl = licht ? ['#6E9E5A', '#82B068'] : ['#4E7A44', '#5E8C50'];
  for (let i = 0; i < 9; i++) { const an = -Math.PI / 2 + (i - 4) * 0.36 + (hash(seed * 7 + i) - 0.5) * 0.15, L = h * (0.42 + 0.12 * hash(seed + i * 3)), bx = x + Math.cos(an) * L, by = y - h + Math.sin(an) * L * 0.75 + L * 0.35 * Math.abs(Math.cos(an));
    ctx.strokeStyle = bl[i % 2]; ctx.lineWidth = h * 0.012; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.quadraticCurveTo((x + bx) / 2, y - h - L * 0.25, bx, by); ctx.stroke();
    for (let k = 1; k < 10; k++) { const u = k / 10, px = lerp(x, bx, u), py = lerp(y - h, by, u) - Math.sin(u * 3.1416) * L * 0.18, pl = L * 0.13 * (1 - u * 0.6); ctx.lineWidth = h * 0.008;
      for (const z of [-1, 1]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an + z * 1.2) * pl, py + Math.sin(an + z * 1.2) * pl + pl * 0.4); ctx.stroke(); } } }
  ctx.restore(); }
function e6Schubboom(ctx, x, y, h, o = {}) { const { a = 1, seed = 2 } = o; ctx.save(); ctx.globalAlpha *= a; const sw = h * 0.05;
  ctx.fillStyle = '#4E5A48'; ctx.beginPath(); ctx.moveTo(x - sw, y); ctx.lineTo(x - sw * 0.7, y - h * 0.7); ctx.lineTo(x + sw * 0.7, y - h * 0.7); ctx.lineTo(x + sw, y); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#6A7860'; ctx.lineWidth = 1.2; for (let r = 0; r < 26; r++) { const yy = y - r * h * 0.026; for (let k = -1; k <= 1; k++) { const xx = x + k * sw * 0.5 + (r % 2) * sw * 0.25; ctx.beginPath(); ctx.moveTo(xx, yy - 5); ctx.lineTo(xx + 4, yy); ctx.lineTo(xx, yy + 5); ctx.lineTo(xx - 4, yy); ctx.closePath(); ctx.stroke(); } }
  // dichotome kroon
  const tak = (px, py, an, L, d) => { const ex = px + Math.cos(an) * L, ey = py + Math.sin(an) * L; ctx.strokeStyle = '#4E5A48'; ctx.lineWidth = Math.max(2, sw * 0.9 * Math.pow(0.65, 4 - d)); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke();
    if (d > 0) { tak(ex, ey, an - 0.42, L * 0.72, d - 1); tak(ex, ey, an + 0.42, L * 0.72, d - 1); } else { ctx.strokeStyle = '#5E8C50'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an + (i - 2.5) * 0.35) * 18, ey + Math.sin(an + (i - 2.5) * 0.35) * 18); ctx.stroke(); } } };
  tak(x, y - h * 0.7, -Math.PI / 2, h * 0.14, 4); ctx.restore(); }
function e6Paardenstaart(ctx, x, y, h, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5E7A50'; ctx.lineWidth = h * 0.03; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
  for (let k = 1; k < 9; k++) { const yy = y - h * k / 9; ctx.strokeStyle = '#4E6A44'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 6, yy); ctx.lineTo(x + 6, yy); ctx.stroke(); ctx.strokeStyle = '#6E9A58';
    for (let i = 0; i < 8; i++) { const an = i / 8 * 3.1416; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + Math.cos(an) * h * 0.08, yy + h * 0.03 - Math.sin(an) * h * 0.01); ctx.moveTo(x, yy); ctx.lineTo(x - Math.cos(an) * h * 0.08, yy + h * 0.03 - Math.sin(an) * h * 0.01); ctx.stroke(); } } ctx.restore(); }
function e6Moerasbos(ctx, o = {}) { const { horizon = 560, water = 760 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  for (let i = 0; i < 7; i++) e6Schubboom(ctx, 120 + i * 290 + hash(i) * 60, horizon + 60, 480 + hash(i * 3) * 60, { a: 0.55, seed: i });
  vul(ctx, [[-40, horizon + 20], [500, horizon - 10], [1100, horizon + 30], [1980, horizon], [1980, H], [-40, H]], '#2C4436');
  for (let i = 0; i < 7; i++) e6Boomvaren(ctx, 80 + i * 300 + hash(i * 5) * 80, water + 10, 160 + hash(i * 7) * 40, { a: 0.8, seed: i + 3 });
  for (let i = 0; i < 6; i++) e6Paardenstaart(ctx, 200 + i * 310 + hash(i * 9) * 70, water + 6, 120 + hash(i * 2) * 40, 0.85);
  ctx.fillStyle = '#244A5A'; ctx.fillRect(0, water, W, H - water); ctx.strokeStyle = rgba('#5BA4C9', 0.4); ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const x = (i * 211) % W, y = water + 30 + (i * 53) % (H - water - 50); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 70, y); ctx.stroke(); } }

// ---------- straat met eik (Macro-nacht) ----------
function e6Straat(ctx, o = {}) { const { grond = 860 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  const huis = (x, w, h, dak, kl) => { ctx.fillStyle = kl; ctx.fillRect(x, grond - h, w, h); ctx.beginPath(); ctx.moveTo(x - 10, grond - h); ctx.lineTo(x + w / 2, grond - h - dak); ctx.lineTo(x + w + 10, grond - h); ctx.closePath(); ctx.fillStyle = _dk(kl, 0.25); ctx.fill();
    ctx.fillStyle = '#E0C77A'; for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) ctx.fillRect(x + w * 0.2 + k * w * 0.4, grond - h + 40 + r * 110, w * 0.18, 60); };
  huis(60, 300, 330, 150, '#5A5048'); huis(380, 260, 300, 130, '#6A5A4E'); huis(1300, 280, 320, 140, '#5E5450'); huis(1600, 300, 340, 160, '#665A50');
  ctx.fillStyle = '#3A3E46'; ctx.fillRect(0, grond, W, H - grond); ctx.fillStyle = '#5A5E66'; ctx.fillRect(0, grond, W, 10);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, grond); ctx.clip(); ecoZomereik(ctx, 960, grond, 3.4, {}); ctx.restore(); }

// ---------- bodemdoorsnede: veen → bruinkool → steenkool ----------
function e6Lagen(ctx, x, y, w, h, fase = 1, o = {}) { const { atoom = true } = o; ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip();
  const lagen = [['zand', '#B8A06A', 0.18], ['klei', '#7E7262', 0.16], ['zand', '#A8925E', 0.16], ['klei', '#6E6456', 0.14]]; let yy = y;
  const nBoven = Math.round(fase * lagen.length); for (let i = 0; i < nBoven; i++) { const hh = h * lagen[i][2]; ctx.fillStyle = lagen[i][1]; ctx.fillRect(x, yy, w, hh); yy += hh; }
  const veenH = h * lerp(0.36, 0.12, fase), kl = fase < 0.3 ? '#5A3E26' : fase < 0.7 ? '#3E2C1E' : '#1E1C1E'; ctx.fillStyle = kl; ctx.fillRect(x, yy, w, veenH);
  ctx.strokeStyle = rgba('#8A6A4A', fase < 0.5 ? 0.6 : 0.2); ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const px = x + hash(i * 7) * w, py = yy + hash(i * 3) * veenH; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 40, py + (hash(i) - 0.5) * 8); ctx.stroke(); }
  if (atoom) e6Atoom(ctx, x + w * 0.62, yy + veenH / 2, 12, { ring: true }); const yv = yy; yy += veenH; ctx.fillStyle = '#4A4248'; ctx.fillRect(x, yy, w, y + h - yy); ctx.restore();
  roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); return yv; }

// ---------- mijn (doorsnede) ----------
function e6Mijn(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); ctx.fillStyle = '#7E7262'; ctx.fillRect(x, y, w, h);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? '#8E8068' : '#6E6456'; ctx.fillRect(x, y + 60 + i * h * 0.13, w, h * 0.13); }
  const kool = y + h * 0.78; ctx.fillStyle = '#1E1C1E'; ctx.fillRect(x, kool, w, h * 0.09); ctx.fillStyle = '#4A4248'; ctx.fillRect(x, kool + h * 0.09, w, h);
  ctx.fillStyle = '#121A26'; ctx.fillRect(x + w * 0.2, y, 40, kool - y + 30); ctx.fillRect(x + w * 0.2, kool - 170, w * 0.65, 214); ctx.restore();
  // schachttoren
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; const sx = x + w * 0.2 + 20; ctx.beginPath(); ctx.moveTo(sx - 50, y); ctx.lineTo(sx, y - 140); ctx.lineTo(sx + 50, y); ctx.moveTo(sx - 30, y - 50); ctx.lineTo(sx + 30, y - 50); ctx.stroke(); circ(ctx, sx, y - 140, 16, null, '#AFC0D0', 4);
  roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); return kool; }
// mijnwerker = figurant Erik (castboek, vaste rol 'anoniem iemand') in werkkleding, met helm en lamp; outfit alleen in deze film (geen wijziging in lib_cast.js)
function e6Mijnwerker(ctx, x, y, h, o = {}) { const P0 = CAST.erik; const oud = P0.garderobe;
  P0.garderobe = Object.assign({}, oud || {}, { mijn: { top: 'jas', topKleur: '#4A5A6E', topAccent: '#3A475A', broek: '#3E4A5A', schoen: '#2A2620', schoenAccent: '#1A1814' } });
  const r = persoon(ctx, 'erik', x, y, h, Object.assign({ outfit: 'mijn', uit: 'neutraal' }, o)); P0.garderobe = oud;
  if (r && r.hoofd) { const { x: hx, y: hy, r: hr } = r.hoofd; ctx.save(); ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.arc(hx, hy - hr * 0.25, hr * 1.12, Math.PI, 0); ctx.fill();
    ctx.fillRect(hx - hr * 1.35, hy - hr * 0.3, hr * 2.7, hr * 0.22); circ(ctx, hx, hy - hr * 0.95, hr * 0.28, '#F2F2EE', '#C9A35C', 1.5); ctx.restore(); }
  return r; }

// ---------- kolencentrale ----------
function e6Centrale(ctx, x, y, s = 1, o = {}) { const { pluim = true } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#4A5670'; ctx.fillRect(-260, -220, 360, 220); ctx.fillStyle = '#5A6680'; ctx.fillRect(-240, -300, 140, 80); ctx.fillStyle = '#3E4860'; ctx.fillRect(130, -560, 60, 560);
  ctx.fillStyle = '#E0C77A'; for (let i = 0; i < 5; i++) ctx.fillRect(-230 + i * 64, -160, 34, 40);
  if (pluim) { for (let i = 0; i < 7; i++) circ(ctx, 170 + i * 46, -600 - i * 40 - hash(i) * 20, 40 + i * 8, rgba('#AEB6C4', 0.55 - i * 0.05)); }
  ctx.restore(); }

// ---------- staafdiagram voorraden (Gt C) ----------
const E6_VOORRAAD = [['lucht', 900], ['planten', 450], ['bodem', 2000], ['fossiele brandstoffen', 10000], ['oceaan', 38000]];
function e6Staaf(ctx, x, y, w, h, o = {}) { const { getallen = true, max = 40000, a = 1, focus = null, leeg = false } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let v = 0; v <= max; v += 10000) { const yy = y - v / max * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, v.toLocaleString('nl-NL'), x - 16, yy + 10, C.text2, 'right', 26); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const n = E6_VOORRAAD.length + 1, bw = w / n; E6_VOORRAAD.forEach(([nm, v], i) => { const bh = Math.max(6, v / max * h), bx = x + i * bw + bw * 0.2; const f = focus == null || focus === i; if (leeg) { text(ctx, nm, bx + bw * 0.3, y + 44, fTekst(32, 600), C.text, 'center'); return; }
    roundRect(ctx, bx, y - bh, bw * 0.6, bh, 6); shape(ctx, rgba(i === 4 ? C.teal : i === 1 ? C.groen : E6K.co2, f ? 0.8 : 0.3), C.line, 1.5);
    text(ctx, nm, bx + bw * 0.3, y + 44, fTekst(32, 600), f ? C.text : rgba(C.text, 0.5), 'center'); if (getallen) text(ctx, '± ' + v.toLocaleString('nl-NL'), bx + bw * 0.3, y - bh - 16, fTekst(32, 700), C.text, 'center'); });
  // gesteente: pijl buiten de schaal
  if (leeg) { metaText(ctx, 'voorraad koolstof · gigaton (Gt C)', x, y - h - 50, C.grain, 'left', 26); ctx.restore(); return; } const gx = x + 5 * bw + bw * 0.2; roundRect(ctx, gx, y - h - 10, bw * 0.6, h + 10, 6); shape(ctx, rgba('#C9B896', 0.5), C.line, 1.5); pijl(ctx, gx + bw * 0.3, y - h + 20, gx + bw * 0.3, y - h - 80, C.text, 1, 5, 18);
  text(ctx, 'gesteente', gx + bw * 0.3, y + 44, fTekst(32, 600), C.text, 'center'); if (getallen) text(ctx, 'veel meer', gx + bw * 0.3, y - h - 100, fTekst(32, 700), C.text, 'center');
  metaText(ctx, 'voorraad koolstof · gigaton (Gt C) · ongeveer', x, y - h - 50, C.grain, 'left', 26); ctx.restore(); }

// ---------- badkuip: voorraad en stroom ----------
function e6Badkuip(ctx, x, y, w, h, o = {}) { const { peil = 0.5, kranen = [], afvoer = [], a = 1, stijg = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba(E6K.co2, 0.35); const py = y - h * peil; ctx.beginPath(); ctx.moveTo(x + 12, py); ctx.lineTo(x + w - 12, py); ctx.lineTo(x + w - 30, y - 10); ctx.quadraticCurveTo(x + w / 2, y + 10, x + 30, y - 10); ctx.closePath(); ctx.fill();
  if (stijg) { ctx.strokeStyle = C.goud; ctx.setLineDash([12, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 20, py - stijg); ctx.lineTo(x + w - 20, py - stijg); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, x + w + 40, py, x + w + 40, py - stijg - 10, C.goud, 1, 5, 18); }
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + 30, y - 10); ctx.quadraticCurveTo(x + w / 2, y + 12, x + w - 30, y - 10); ctx.lineTo(x + w, y - h); ctx.stroke();
  kranen.forEach(([kx, b, kl, lab]) => { const kxx = x + kx * w; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(kxx - 60, y - h - 90); ctx.lineTo(kxx, y - h - 90); ctx.lineTo(kxx, y - h - 50); ctx.stroke();
    ctx.fillStyle = rgba(kl, 0.8); ctx.fillRect(kxx - b / 2, y - h - 50, b, h * (1 - peil) + 50); if (lab) naamBij(ctx, lab, null, kxx - 70, y - h - 110, 1, 'center', _lt(kl, 0.2)); });
  afvoer.forEach(([ax, b, kl, lab]) => { const axx = x + ax * w; ctx.fillStyle = rgba(kl, 0.8); ctx.fillRect(axx - b / 2, y - 2, b, 90); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(axx - 30, y + 2); ctx.lineTo(axx + 30, y + 2); ctx.stroke(); if (lab) naamBij(ctx, lab, null, axx, y + 140, 1, 'center', _lt(kl, 0.2)); });
  ctx.restore(); }

// ---------- kringloopschema (Schema): vakken met verblijftijd ----------
// vakken: [{id, x, y, naam, tijd, kl}], pijlen: [[vanId, naarId, label]]
function e6Kringloop(ctx, vakken, pijlen, o = {}) { const { a = 1, focus = null, bw = 260, bh = 110 } = o; ctx.save(); ctx.globalAlpha *= a; const V = {}; vakken.forEach(v => V[v.id] = v);
  pijlen.forEach(([p, q, lab, kl]) => { const A = V[p], B = V[q]; const an = Math.atan2(B.y - A.y, B.x - A.x); const ox = Math.cos(an), oy = Math.sin(an);
    const r = (v) => Math.min(Math.abs(bw / 2 / (ox || 1e-6)), Math.abs(bh / 2 / (oy || 1e-6))) + 10; const off = 14, nx = -oy * off, ny = ox * off;
    const x1 = A.x + ox * r(A) + nx, y1 = A.y + oy * r(A) + ny, x2 = B.x - ox * r(B) + nx, y2 = B.y - oy * r(B) + ny; pijl(ctx, x1, y1, x2, y2, kl || E6K.co2, 1, 5, 18);
    if (lab) { const mx = (x1 + x2) / 2 + nx * 2.6, my = (y1 + y2) / 2 + ny * 2.6; naamBij(ctx, lab, null, mx, my + 12, 1, 'center', kl ? _lt(kl, 0.2) : '#D2D8E2'); } });
  vakken.forEach(v => { const f = focus == null || focus.includes(v.id); roundRect(ctx, v.x - bw / 2, v.y - bh / 2, bw, bh, 18); shape(ctx, rgba(v.kl || '#2A3A58', f ? 0.9 : 0.35), f ? C.line : rgba(C.line, 0.4), 2);
    text(ctx, v.naam, v.x, v.y + (v.tijd ? -2 : 12), fTekst(36, 700), f ? C.text : rgba(C.text, 0.45), 'center'); if (v.tijd) metaText(ctx, v.tijd, v.x, v.y + 36, f ? C.grain : rgba(C.grain, 0.45), 'center', 26); });
  ctx.restore(); return V; }

// ---------- Keelingcurve (model: trend + seizoensgolf) ----------
function e6KeelingWaarde(jaar) { const t = jaar - 1958; return 315 + 0.75 * t + 0.0125 * t * t + 3 * Math.cos((jaar % 1 - 0.37) * 6.2832); } // ± 315 (1958) → ± 425 (2024); piek rond mei
function e6Keeling(ctx, x, y, w, h, j0, j1, o = {}) { const { pmin = 300, pmax = 440, a = 1, stap = 1 / 24, trend = false, titel = true, maandas = false } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let p = Math.ceil(pmin / 20) * 20; p <= pmax; p += 20) { const yy = y - (p - pmin) / (pmax - pmin) * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, String(p), x - 16, yy + 10, C.text2, 'right', 26); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const X = (j) => x + (j - j0) / (j1 - j0) * w, Y = (p) => y - (p - pmin) / (pmax - pmin) * h;
  ctx.strokeStyle = E6K.co2; ctx.lineWidth = 3; ctx.beginPath(); for (let j = j0; j <= j1; j += stap) { const p = e6KeelingWaarde(j); j === j0 ? ctx.moveTo(X(j), Y(p)) : ctx.lineTo(X(j), Y(p)); } ctx.stroke();
  if (trend) { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let j = j0; j <= j1; j += 0.1) { const t = j - 1958, p = 315 + 0.75 * t + 0.0125 * t * t; j === j0 ? ctx.moveTo(X(j), Y(p)) : ctx.lineTo(X(j), Y(p)); } ctx.stroke(); ctx.setLineDash([]); }
  if (!maandas) { const st = (j1 - j0) > 20 ? 10 : 1; for (let j = Math.ceil(j0 / st) * st; j <= j1; j += st) metaText(ctx, String(j), X(j), y + 40, C.text2, 'center', 26); }
  if (titel) metaText(ctx, 'CO₂ in de lucht · Mauna Loa · ppm (deeltjes per miljoen) · model', x, y - h - 40, C.grain, 'left', 26);
  ctx.restore(); return { X, Y }; }

// ---------- oceaan-doorsnede: oplossen, algen, dwarrelende resten ----------
function e6Oceaan(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); ctx.fillStyle = '#2A5A7A'; ctx.fillRect(x, y, w, h * 0.3); ctx.fillStyle = '#1E4460'; ctx.fillRect(x, y + h * 0.3, w, h * 0.3); ctx.fillStyle = '#14304A'; ctx.fillRect(x, y + h * 0.6, w, h * 0.4);
  for (let i = 0; i < 24; i++) { const px = x + hash(i * 5) * w, py = y + 30 + hash(i * 9) * h * 0.22; circ(ctx, px, py, 7, C.groen, _lt(C.groen, 0.3), 1.5); }
  for (let i = 0; i < 30; i++) { const px = x + hash(i * 13) * w, py = y + h * 0.3 + hash(i * 17) * h * 0.65; circ(ctx, px, py, 3 + hash(i) * 3, '#C9B896', null); }
  ctx.fillStyle = '#3A3026'; ctx.fillRect(x, y + h - 30, w, 30); ctx.restore(); roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); }
