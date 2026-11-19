// Wat word jij? · Sport en topsport 6 · De stem in je hoofd — eigen tekeningen (v1.0, 19 nov 2026)
// Seriekleuren: paars = gedachten (wolkjes), goud = raceplan, focus en uitdaging, koraal = piekeren en bedreiging, teal = water.
// Maten: de zwemmer ± 1,79 m (h = staande lengte in px); 50-meterbad met 8 banen van 2,5 m; startblok ± 0,75 m boven het water.
// Figuranten: Bilal en Daan in zwemkleding (eigen garderobe 'zwem' hieronder, zelfde snit als die van Sam), verder castfiguranten
// (Erik, Joost, Anouk, Milan, Sanne, Bram, Thijs, de voorbijganger) en publiek als silhouetten in een groep.

const GROND = 860;
var BODY = { cx: 960, yb: 860, h: 600 };
function dot(ctx, x, y, r, col) { circ(ctx, x, y, r, col); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
// alleen zichtbaar tussen het n-de woord w0 en het woord w1 (zonder fade-uit als w1 ontbreekt)
function SP6_tussen(q, w0, n0, w1, n1, d = 0.4) { return q.on(w0, n0, d) * (w1 ? 1 - q.on(w1, n1, d) : 1); }

// ---------- figuranten in zwemkleding ----------
(function () { const Z = CAST.sam.garderobe.zwem;
  if (CAST.bilal && CAST.bilal.garderobe) CAST.bilal.garderobe.zwem = Object.assign({}, Z, { topKleur: CAST.bilal.huid, topAccent: _mixHex(CAST.bilal.huid, '#000000', 0.12), schoen: CAST.bilal.huid, schoenAccent: CAST.bilal.huid, broek: '#2A2F3E', broekAccent: '#5BA4C9', badmuts: '#3F78B8' });
  if (CAST.erik) { CAST.erik.garderobe = CAST.erik.garderobe || {}; if (!CAST.erik.garderobe.sport) CAST.erik.garderobe.sport = { top: 'tshirt', topKleur: '#5BA4C9', topAccent: '#4A8BB0', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#5BA4C9' }; }
  if (CAST.daan && CAST.daan.garderobe) CAST.daan.garderobe.zwem = Object.assign({}, Z, { topKleur: CAST.daan.huid, topAccent: _mixHex(CAST.daan.huid, '#000000', 0.12), schoen: CAST.daan.huid, schoenAccent: CAST.daan.huid, broek: '#2F4A3A', broekAccent: '#E0B64A', badmuts: '#E8E2D4' });
})();
const SP6 = { muur: '#22324F', muurL: '#2C3E5E', vloer: '#3A4A66', tegel: '#2E4A6A', water: '#2F6F8F', waterL: '#5BA4C9', waterD: '#1F4F6E', blok: '#D8DEE4', blokD: '#9AA6B6', lijn: '#13223A', hout: '#8A6A4A', bord: '#F2F2EE' };

// ---------- klok rechtsboven ----------
function SP6_klok(ctx, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(44, 800); const w = ctx.measureText(s2).width + 70;
  roundRect(ctx, 1860 - w, 34, w, 74, 14); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.9), 2.5);
  circ(ctx, 1860 - w + 30, 71, 12, null, C.goud, 3); lijn(ctx, [[1860 - w + 30, 63], [1860 - w + 30, 71], [1860 - w + 36, 75]], C.goud, 3);
  text(ctx, s2, 1860 - 22, 88, fTekst(44, 800), C.text, 'right'); ctx.restore(); }

// ---------- gedachtenwolkje: tekst in hoofdletters, staartje (twee bolletjes) naar het hoofd ----------
function SP6_wolk(ctx, x, y, s2, col, a = 1, o = {}) { if (a <= 0.01) return; const px = o.px || 34; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800);
  const regels = s2.split('\n'), w = Math.max(...regels.map(r => ctx.measureText(r).width)) + px * 1.6, h = regels.length * px * 1.2 + px * 1.1, x0 = x - w / 2, y0 = y - h / 2;
  const vul = o.vul || _mixHex(col, '#F2F2EE', 0.62);
  ctx.fillStyle = vul; ctx.beginPath(); roundRect(ctx, x0, y0, w, h, h / 2); ctx.fill();
  const nb = Math.max(3, Math.round(w / (px * 1.5))); for (let i = 0; i < nb; i++) { const u = (i + 0.5) / nb, bx = x0 + h * 0.35 + u * (w - h * 0.7), rr = h * (0.3 + 0.08 * Math.sin(i * 2.3));
    ctx.beginPath(); ctx.arc(bx, y0 + h * 0.2, rr, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(bx + px * 0.4, y0 + h * 0.8, rr * 0.9, 0, 6.283); ctx.fill(); }
  if (o.staart) { const dx = o.staart.x - x, dy = o.staart.y - y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, r0 = Math.min(w, h) * 0.5 + 10;
    circ(ctx, x + ux * (r0 + 14) + (dx - ux * r0) * 0.15, y + uy * (r0 + 14) + (dy - uy * r0) * 0.15, px * 0.32, vul); circ(ctx, x + ux * (r0 + 14) + (dx - ux * r0) * 0.45, y + uy * (r0 + 14) + (dy - uy * r0) * 0.45, px * 0.2, vul); }
  regels.forEach((r, i) => text(ctx, r, x, y + px * 0.36 + (i - (regels.length - 1) / 2) * px * 1.2, fTekst(px, 800), o.ink || '#1A1530', 'center'));
  ctx.restore(); return { w, h }; }

// ---------- zwembad van boven (50 m × 25 m, 8 banen); (cx, cy) = midden van het bad; s = px per meter ----------
function SP6_badBoven(ctx, cx, cy, s, o = {}) { const { t = 0, zwemmer = null, tribune = true, a = 1, licht = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = 50 * s, B = 25 * s, x0 = cx - L / 2, y0 = cy - B / 2;
  // kant rondom
  roundRect(ctx, x0 - 4 * s, y0 - 4 * s, L + 8 * s, B + 8 * s, 0.6 * s); shape(ctx, SP6.vloer, null);
  if (tribune) { // tribune boven het bad: rijen silhouetten
    roundRect(ctx, x0 + 2 * s, y0 - 12 * s, L - 4 * s, 7 * s, 0.4 * s); shape(ctx, '#2A3550', null);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 46; i++) { const px = x0 + 3.4 * s + i * (L - 7 * s) / 45 + (r % 2) * 0.5 * s, py = y0 - 10.8 * s + r * 2.1 * s; ctx.fillStyle = r % 2 ? '#4A5878' : '#56648A';
      ctx.beginPath(); ctx.ellipse(px, py + 0.55 * s, 0.42 * s, 0.32 * s, 0, 0, 6.283); ctx.fill(); circ(ctx, px, py, 0.26 * s, r % 2 ? '#5E6C8E' : '#6A789A'); } }
  ctx.fillStyle = SP6.water; ctx.fillRect(x0, y0, L, B);
  // bodemlijnen per baan
  for (let i = 0; i < 8; i++) { const by = y0 + (i + 1.5) * 2.5 * s; ctx.fillStyle = rgba('#13223A', 0.55); ctx.fillRect(x0 + 2 * s, by - 0.12 * s, L - 4 * s, 0.24 * s); ctx.fillRect(x0 + 2 * s, by - 0.5 * s, 0.24 * s, 1 * s); ctx.fillRect(x0 + L - 2.24 * s, by - 0.5 * s, 0.24 * s, 1 * s); }
  // banenlijnen (drijvers)
  for (let i = 0; i <= 8; i++) { const ly = y0 + (i + 1) * 2.5 * s; const n = Math.round(L / (0.5 * s));
    for (let k = 0; k < 100; k++) { const u = k / 99, px = x0 + u * L, eind = u < 0.1 || u > 0.9; ctx.fillStyle = eind ? '#D8573F' : (k % 2 ? '#E0B64A' : '#3F78B8'); ctx.beginPath(); ctx.ellipse(px, ly, 0.24 * s, 0.13 * s, 0, 0, 6.283); ctx.fill(); } }
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht; ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 0.12 * s); ctx.strokeRect(x0, y0 + 4.5 * 2.5 * s - 2.5 * s, L, 2.5 * s); ctx.restore(); }
  // startblokken aan de linkerkant met nummer
  for (let i = 0; i < 8; i++) { const by = y0 + (i + 1.5) * 2.5 * s; roundRect(ctx, x0 - 1.0 * s, by - 0.3 * s, 0.75 * s, 0.6 * s, 0.1 * s); shape(ctx, SP6.blok, null);
    if (s > 14) text(ctx, String(i + 1), x0 - 0.62 * s, by + 0.14 * s, fTekst(Math.max(10, 0.42 * s), 800), '#1A2740', 'center'); }
  if (zwemmer) zwemmer(ctx);
  ctx.restore(); return { x0, y0, L, B, baan: (n) => y0 + (n + 0.5) * 2.5 * s }; }
// zwemmer van boven (eenvoudige vorm): (x, y) = kruin, kijk 1 = naar rechts; L = lengte in px van kruin tot tenen
function SP6_zwemmerBoven(ctx, x, y, L, t = 0, o = {}) { const { kijk = 1, slag = true } = o; ctx.save(); ctx.translate(x, y); ctx.scale(kijk, 1); const hu = CAST.sam.huid, s = L / 1.8;
  ctx.strokeStyle = hu; ctx.lineCap = 'round'; ctx.lineWidth = 0.1 * s; const p = slag ? t * 0.8 * 6.283 : 0;
  for (const k of [-1, 1]) { const ph = p + (k > 0 ? 0 : Math.PI); const ax = 0.2 * s + Math.cos(ph) * 0.55 * s, ay = k * (0.22 * s + Math.abs(Math.sin(ph)) * 0.12 * s); ctx.beginPath(); ctx.moveTo(-0.3 * s, k * 0.2 * s); ctx.lineTo(ax, ay); ctx.stroke(); }
  ctx.fillStyle = hu; ctx.beginPath(); ctx.ellipse(-0.75 * s, 0, 0.5 * s, 0.2 * s, 0, 0, 6.283); ctx.fill();
  ctx.lineWidth = 0.11 * s; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-1.2 * s, k * 0.08 * s); ctx.lineTo(-1.75 * s, k * (0.1 * s + 0.03 * s * Math.sin(t * 9 + k))); ctx.stroke(); }
  ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-1.12 * s, 0, 0.14 * s, 0.17 * s, 0, 0, 6.283); ctx.fill();
  circ(ctx, -0.14 * s, 0, 0.13 * s, '#D8573F'); ctx.restore(); }

// ---------- startblok in zijaanzicht: (x, y) = voorrand boven; s = px per meter; kijk 1 = water rechts ----------
function SP6_blok(ctx, x, y, s, o = {}) { const { kijk = 1, nummer = '', a = 1, wig = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const d = 0.6 * s, hoog = 0.75 * s; // blad 60 cm diep, 75 cm boven het water
  ctx.fillStyle = '#5E6A80'; ctx.fillRect(-d * 0.62, 0.06 * s, 0.1 * s, hoog + 0.25 * s); ctx.fillRect(-d * 0.2, 0.06 * s, 0.1 * s, hoog + 0.25 * s); // poten
  ctx.beginPath(); ctx.moveTo(-d, 0.05 * s); ctx.lineTo(0, -0.02 * s); ctx.lineTo(0, 0.08 * s); ctx.lineTo(-d, 0.14 * s); ctx.closePath(); shape(ctx, SP6.blok, null); // blad, iets aflopend naar voren
  ctx.fillStyle = SP6.blokD; ctx.fillRect(-d, 0.12 * s, d, 0.03 * s);
  if (wig) { ctx.beginPath(); ctx.moveTo(-d * 0.92, 0.05 * s); ctx.lineTo(-d * 0.72, 0.035 * s); ctx.lineTo(-d * 0.92, -0.06 * s); ctx.closePath(); shape(ctx, '#B8C2CE', null); }
  if (nummer) { ctx.save(); ctx.scale(kijk, 1); text(ctx, nummer, -kijk * d * 0.42, 0.42 * s, fTekst(0.22 * s, 800), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }
// zwembadkant in zijaanzicht: dek links tot xRand, water rechts vanaf xRand; waterY = wateroppervlak, dekY = vloer
function SP6_badZij(ctx, xRand, dekY, waterY, t = 0, o = {}) { const { muur = true } = o;
  if (muur) { ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, dekY - 84); ctx.fillStyle = rgba('#F2F2EE', 0.04); for (let i = 0; i < 12; i++) ctx.fillRect(i * 180, 84, 2, dekY - 84); }
  ctx.fillStyle = SP6.vloer; ctx.fillRect(0, dekY, xRand, 880 - dekY); ctx.fillStyle = '#4A5A78'; ctx.fillRect(0, dekY, xRand, 6);
  ctx.fillStyle = SP6.water; ctx.fillRect(xRand, waterY, W - xRand, 880 - waterY); ctx.fillStyle = SP6.tegel; ctx.fillRect(xRand - 8, dekY, 8, 880 - dekY);
  ctx.strokeStyle = rgba(SP6.waterL, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let px = xRand; px <= W; px += 12) { const py = waterY + 3 * Math.sin(px * 0.02 + t * 2); px === xRand ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  // banenlijn achter in het bad (één rij drijvers)
  for (let k = 0; k < 40; k++) { const px = xRand + 30 + k * 34; if (px > W) break; ctx.fillStyle = k < 6 ? '#D8573F' : (k % 2 ? '#E0B64A' : '#3F78B8'); ctx.beginPath(); ctx.ellipse(px, waterY - 2, 14, 7, 0, 0, 6.283); ctx.fill(); } }

// ---------- onder water (zijaanzicht) met een meebewegende achtergrond ----------
function SP6_onderWater(ctx, waterY, t = 0, v = 0) { ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, waterY - 84);
  ctx.fillStyle = '#2A4A6E'; ctx.fillRect(0, waterY, W, 880 - waterY);
  const g = ctx.createLinearGradient(0, waterY, 0, 880); g.addColorStop(0, '#2F6F8F'); g.addColorStop(1, '#245A78'); ctx.fillStyle = g; ctx.fillRect(0, waterY, W, 880 - waterY);
  // bodemlijn (zwart) en tegelvoegen die meeschuiven
  const off = (t * v) % 120; ctx.strokeStyle = rgba('#13223A', 0.35); ctx.lineWidth = 2; for (let px = -off; px < W; px += 120) { ctx.beginPath(); ctx.moveTo(px, 820); ctx.lineTo(px, 880); ctx.stroke(); }
  ctx.fillStyle = rgba('#13223A', 0.6); ctx.fillRect(0, 836, W, 18);
  // drijvers van de banenlijn aan het oppervlak
  const off2 = (t * v) % 36; for (let px = -off2; px < W + 36; px += 36) { ctx.fillStyle = Math.floor((px + t * v) / 36) % 2 ? '#E0B64A' : '#3F78B8'; ctx.beginPath(); ctx.ellipse(px, waterY + 2, 15, 8, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = rgba(SP6.waterL, 0.9); ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= W; px += 12) { const py = waterY + 3 * Math.sin(px * 0.018 + t * 2.2); px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); }
// waterlijn als lichte lijn vóór de zwemmer (geen alfa op de persoon)
function SP6_waterlijn(ctx, x0, x1, y, t = 0) { ctx.save(); ctx.strokeStyle = rgba('#BFE3F2', 0.75); ctx.lineWidth = 2.5; ctx.beginPath(); for (let px = x0; px <= x1; px += 10) { const py = y + 4 * Math.sin(px * 0.03 + t * 3); px === x0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); ctx.restore(); }

// ---------- werkbank WERKGEHEUGEN: 4 vakken; kaartjes = [{s, kl, x (vak 0..3 of los), y-offset, rot}] ----------
function SP6_werkbank(ctx, x, y, w, o = {}) { const { a = 1, vakLicht = 0, kop = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = w * 0.07; ctx.fillStyle = SP6.hout; roundRect(ctx, x - w / 2, y, w, h, 8); ctx.fill(); ctx.fillStyle = '#6E543A'; ctx.fillRect(x - w / 2 + 20, y + h, 18, w * 0.22); ctx.fillRect(x + w / 2 - 38, y + h, 18, w * 0.22);
  const vw = w / 4; for (let i = 0; i < 4; i++) { const vx = x - w / 2 + i * vw; ctx.strokeStyle = rgba(vakLicht > 0.01 ? C.goud : '#F2F2EE', 0.35 + 0.5 * vakLicht); ctx.lineWidth = 2 + vakLicht * 1.5; ctx.setLineDash([10, 8]); ctx.strokeRect(vx + 8, y - vw * 0.62, vw - 16, vw * 0.6); ctx.setLineDash([]); }
  if (kop) metaText(ctx, 'WERKGEHEUGEN', x, y + h + 46, C.text, 'center', 28);
  ctx.restore(); return { vak: (i) => ({ x: x - w / 2 + (i + 0.5) * vw, y: y - vw * 0.32 }), vw }; }
function SP6_blokje(ctx, x, y, w, h, s2, kl, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, 8); shape(ctx, _mixHex(kl, '#0D1420', 0.15), _mixHex(kl, '#FFFFFF', 0.3), 2);
  const px = Math.min(24, h * 0.36); const r = s2.split('\n'); r.forEach((q, i) => text(ctx, q, 0, px * 0.36 + (i - (r.length - 1) / 2) * px * 1.15, fTekst(px, 800), '#14182A', 'center')); ctx.restore(); }

// ---------- wachtruimte en kamer van de sportpsycholoog ----------
function SP6_wachtruimte(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = '#25354F'; ctx.fillRect(0, 84, W, 690); ctx.fillStyle = '#2E405E'; ctx.fillRect(0, 774, W, 106);
  ctx.fillStyle = rgba('#F2F2EE', 0.05); for (let i = 0; i < 16; i++) ctx.fillRect(i * 124, 84, 3, 690);
  // deur met bordje-loos raam en klok aan de muur
  roundRect(ctx, 1640, 300, 200, 474, 6); shape(ctx, '#3A4C6C', '#4A5E80', 2); roundRect(ctx, 1680, 340, 120, 150, 4); shape(ctx, '#5BA4C9', null); ctx.fillStyle = rgba('#F2F2EE', 0.2); ctx.fillRect(1690, 350, 30, 130); circ(ctx, 1662, 560, 9, '#C9D2DE');
  // lange bank
  ctx.fillStyle = '#6E543A'; roundRect(ctx, 80, 640, 1460, 34, 8); ctx.fill(); ctx.fillStyle = '#5A4430'; for (const bx of [120, 790, 1480]) ctx.fillRect(bx, 674, 22, 100); }
function SP6_kamer(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = '#2A3A55'; ctx.fillRect(0, 84, W, 700); ctx.fillStyle = '#34465F'; ctx.fillRect(0, 784, W, 96);
  // raam met plant
  roundRect(ctx, 120, 200, 300, 260, 6); shape(ctx, '#4E7FA8', '#5C6E8E', 6); ctx.strokeStyle = '#5C6E8E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(270, 200); ctx.lineTo(270, 460); ctx.stroke();
  ctx.fillStyle = '#B07A4A'; roundRect(ctx, 220, 690, 90, 94, 8); ctx.fill(); ctx.fillStyle = '#5E9E6E'; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(265 + Math.cos(i * 0.9) * 40, 640 - i * 6, 22, 56, i * 0.5 - 1.5, 0, 6.283); ctx.fill(); } }
function SP6_whiteboard(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 10, y - 10, w + 20, h + 20, 8); shape(ctx, '#9AA6B6', null); roundRect(ctx, x, y, w, h, 4); shape(ctx, SP6.bord, null);
  ctx.fillStyle = '#9AA6B6'; ctx.fillRect(x + w * 0.1, y + h + 10, w * 0.8, 12); ctx.restore(); }
// handschrift-achtige tekst die verschijnt van links naar rechts (u 0..1)
function SP6_schrijf(ctx, s2, x, y, px, kl, u, al = 'left') { if (u <= 0.001) return; ctx.save(); ctx.font = fTekst(px, 700); const w = ctx.measureText(s2).width, x0 = al === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 4, y - px * 1.2, w * clamp(u, 0, 1) + 8, px * 1.6); ctx.clip(); text(ctx, s2, x0, y, fTekst(px, 700), kl, 'left'); ctx.restore(); }

// ---------- meters ----------
// hartslagmeter: scherm met hartje en lopende lijn; v 0..1 = hoe snel (geen getal: de stem noemt er geen)
function SP6_hartmeter(ctx, x, y, w, v, t, o = {}) { const { a = 1, kl = C.koraal, kop = 'HARTSLAG' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.5;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#0D1420', rgba(C.line, 0.9), 2);
  metaText(ctx, kop, x - w / 2 + 20, y - h / 2 + 38, C.text2, 'left', 22);
  const f = 1 + v * 2.2, puls = Math.pow(Math.max(0, Math.sin(t * f * Math.PI)), 8); // hartje klopt sneller
  ctx.save(); ctx.translate(x + w / 2 - 40, y - h / 2 + 30); ctx.scale(1 + 0.15 * puls, 1 + 0.15 * puls); ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-18, -4, -10, -18, 0, -8); ctx.bezierCurveTo(10, -18, 18, -4, 0, 10); ctx.fill(); ctx.restore();
  // ECG-achtige lijn
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 14, y - h / 2 + 50, w - 28, h - 64); ctx.clip(); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); const x0 = x - w / 2 + 14, ww = w - 28, yb = y + h * 0.18;
  for (let i = 0; i <= ww; i += 3) { const tt = (i / ww) * 3 + t * 0.6, fr = (tt * f) % 1, piek = fr > 0.42 && fr < 0.5 ? -Math.sin((fr - 0.42) / 0.08 * Math.PI) * h * 0.32 : (fr > 0.5 && fr < 0.55 ? Math.sin((fr - 0.5) / 0.05 * Math.PI) * h * 0.08 : 0); i === 0 ? ctx.moveTo(x0 + i, yb + piek) : ctx.lineTo(x0 + i, yb + piek); }
  ctx.stroke(); ctx.restore();
  // balk onderaan
  roundRect(ctx, x - w / 2 + 20, y + h / 2 - 22, w - 40, 10, 5); shape(ctx, '#2A3446', null); roundRect(ctx, x - w / 2 + 20, y + h / 2 - 22, Math.max(10, (w - 40) * clamp(v, 0, 1)), 10, 5); shape(ctx, kl, null);
  ctx.restore(); }
// weegschaal: links WAT IK IN HUIS HEB, rechts WAT ER GEVRAAGD WORDT; k = kanteling (-1 = links omlaag, +1 = rechts omlaag)
function SP6_weegschaal(ctx, x, y, s, k, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#9AA6B6'; ctx.beginPath(); ctx.moveTo(-90, 300); ctx.lineTo(90, 300); ctx.lineTo(20, 270); ctx.lineTo(-20, 270); ctx.closePath(); ctx.fill(); ctx.fillRect(-10, 0, 20, 275);
  const an = -0.22 * k; ctx.save(); ctx.rotate(an); ctx.fillStyle = '#C9D2DE'; roundRect(ctx, -330, -10, 660, 20, 10); ctx.fill(); ctx.restore(); circ(ctx, 0, 0, 18, C.goud);
  const kl = k < -0.05 ? C.goud : k > 0.05 ? C.koraal : C.line;
  for (const sd of [-1, 1]) { const px = sd * 310 * Math.cos(an), py = sd * 310 * Math.sin(an); ctx.strokeStyle = '#9AA6B6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, py + 150); ctx.moveTo(px, py); ctx.lineTo(px + 110, py + 150); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 150, 130, 26, 0, 0, Math.PI); ctx.fillStyle = (sd < 0 && k < -0.05) ? rgba(C.goud, 0.7) : (sd > 0 && k > 0.05) ? rgba(C.koraal, 0.7) : '#5E6A80'; ctx.fill();
    const lab = sd < 0 ? ['WAT IK', 'IN HUIS HEB'] : ['WAT ER', 'GEVRAAGD WORDT']; lab.forEach((l, i) => text(ctx, l, px, py + 230 + i * 40, fTekst(32, 800), sd < 0 ? C.goud : C.koraal, 'center')); }
  ctx.restore(); }
// bloedvat in een zoomcirkel: breedte b (0..1, 0,5 = gewoon), stroom f (deeltjes per tel)
function SP6_vat(ctx, cx, cy, r, b, f, t, kl) { const hw = lerp(40, 120, b); ctx.fillStyle = '#3A2A3A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#C46A6A'; ctx.fillRect(cx - r, cy - hw - 22, 2 * r, 22); ctx.fillRect(cx - r, cy + hw, 2 * r, 22); // vaatwand
  ctx.fillStyle = '#5A2430'; ctx.fillRect(cx - r, cy - hw, 2 * r, 2 * hw);
  const n = 18; for (let i = 0; i < n; i++) { const u = (hash(i * 3.1) + t * (0.15 + f * 0.35)) % 1, py = cy + (hash(i * 7.7) - 0.5) * 1.5 * (hw - 18); const px = cx - r + u * 2 * r; ctx.beginPath(); ctx.ellipse(px, py, 18, 10, 0, 0, 6.283); shape(ctx, '#D8604A', '#F0A090', 1.5); }
  if (kl) { ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.strokeRect(cx - r, cy - hw - 22, 2 * r, 2 * hw + 44); } }

// ---------- icoontjes van de routine (bril · armen zwaaien · LANG) ----------
function SP6_icoon(ctx, x, y, soort, licht, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = licht > 0.5 ? C.goud : '#7A8496';
  roundRect(ctx, x - 70, y - 50, 140, 100, 16); shape(ctx, licht > 0.5 ? rgba(C.goud, 0.18) : rgba('#0D1420', 0.85), kl, 2.5);
  ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = 5; ctx.lineCap = 'round';
  if (soort === 'bril') { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 24, y, 20, 14, 0, 0, 6.283); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x - 44, y); ctx.lineTo(x - 58, y - 6); ctx.moveTo(x + 44, y); ctx.lineTo(x + 58, y - 6); ctx.stroke(); }
  else if (soort === 'armen') { circ(ctx, x, y - 22, 9, kl); ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, y + 26); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 6, 30, -2.6, 0.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 26, y + 9); ctx.lineTo(x + 30, y - 6); ctx.lineTo(x + 16, y + 2); ctx.stroke(); text(ctx, '2×', x - 38, y + 34, fTekst(22, 800), kl, 'center'); }
  else text(ctx, 'LANG', x, y + 14, fTekst(40, 800), kl, 'center');
  ctx.restore(); }

// ---------- kalender en seizoensrooster ----------
function SP6_kalender(ctx, x, y, s2, a = 1, blad = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 120, 300, 260, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = C.koraal; roundRect(ctx, x - 150, y - 120, 300, 70, 14); ctx.fill(); ctx.fillRect(x - 150, y - 70, 300, 20); for (const dx of [-80, 80]) { roundRect(ctx, x + dx - 8, y - 140, 16, 40, 6); shape(ctx, '#5E6A80', null); }
  text(ctx, s2, x, y + 50, fTekst(s2.length > 10 ? 36 : 54, 800), '#1A2740', 'center');
  if (blad > 0.01 && blad < 0.99) { ctx.save(); ctx.translate(x, y - 50); ctx.scale(1, 1 - blad); ctx.fillStyle = '#E2DCCC'; ctx.fillRect(-150, 0, 300, 190); ctx.restore(); }
  ctx.restore(); }
function SP6_rooster(ctx, x, y, w, h, a = 1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['SEP', 'OKT', 'NOV', 'DEC', 'JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG'];
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); metaText(ctx, 'SEIZOEN', x + 24, y + 42, C.text2, 'left', 24);
  const cw = (w - 48) / 12, ch = (h - 110) / 3; M.forEach((m, i) => { metaText(ctx, m, x + 24 + (i + 0.5) * cw, y + 84, C.text2, 'center', 18);
    for (let r = 0; r < 3; r++) { const wed = hash(i * 5 + r * 13) < 0.55; const hier = i === 2 && r === 1; const cx = x + 24 + i * cw + 3, cy = y + 100 + r * ch + 3;
      roundRect(ctx, cx, cy, cw - 6, ch - 6, 6); shape(ctx, hier ? rgba(C.goud, 0.35 + 0.5 * licht) : wed ? rgba(C.teal, 0.45) : rgba('#2A3446', 0.9), hier ? C.goud : null, hier ? 2 + 2 * licht : 1); } });
  ctx.restore(); }

// ---------- hometrainer met fietser (zijaanzicht) ----------
function SP6_hometrainer(ctx, x, y, s, t, id = 'erik') { // (x, y) = midden onder op de grond, s = px per meter
  ctx.save(); ctx.fillStyle = '#4A5468'; roundRect(ctx, x - 0.7 * s, y - 0.06 * s, 1.4 * s, 0.06 * s, 6); ctx.fill();
  const zad = { x: x - 0.32 * s, y: y - 0.95 * s }, stuur = { x: x + 0.38 * s, y: y - 1.02 * s }, trap = { x: x - 0.05 * s, y: y - 0.32 * s };
  circ(ctx, x + 0.42 * s, y - 0.34 * s, 0.26 * s, '#2A3446', '#8FA0B5', 3); // vliegwiel
  lijn(ctx, [[x - 0.6 * s, y - 0.05 * s], [trap.x, trap.y], [x + 0.42 * s, y - 0.34 * s]], '#8FA0B5', 0.05 * s); lijn(ctx, [[trap.x, trap.y], [zad.x, zad.y]], '#8FA0B5', 0.05 * s); lijn(ctx, [[x + 0.42 * s, y - 0.34 * s], [stuur.x - 0.05 * s, stuur.y]], '#8FA0B5', 0.05 * s);
  lijn(ctx, [[zad.x - 0.12 * s, zad.y], [zad.x + 0.12 * s, zad.y]], '#1E2230', 0.06 * s); lijn(ctx, [[stuur.x - 0.05 * s, stuur.y], [stuur.x + 0.1 * s, stuur.y - 0.02 * s]], '#1E2230', 0.04 * s);
  // fietser: zittend zijaanzicht, benen trappen rond
  const h = 1.8 * s, hh = h / 6.1, Lb = h - hh * 3.67, L1 = Lb / 2; const ph = t * 1.4 * 6.283, cr = 0.17 * s;
  const been = (p) => { const fx = trap.x + Math.cos(p) * cr, fy = trap.y + Math.sin(p) * cr, dx = fx - zad.x, dy = fy - (zad.y + 0.02 * s), dd = Math.min(Math.hypot(dx, dy), 2 * L1 * 0.995), phi = Math.atan2(dx, dy), al = Math.acos(dd / (2 * L1)); return { th: phi + al, kn: 2 * al, an: -0.2 }; };
  persoon(ctx, id, zad.x, zad.y + 0.02 * s + h - hh * 3.45, h, { zij: true, kijk: 1, vrij: true, outfit: 'sport', been1: been(ph), been2: been(ph + Math.PI), voorover: 0.45, arm: [1.25, -0.25], armVer: [1.25, -0.25], t });
  for (const p of [ph, ph + Math.PI]) lijn(ctx, [[trap.x, trap.y], [trap.x + Math.cos(p) * cr, trap.y + Math.sin(p) * cr]], '#C9D2DE', 0.03 * s);
  ctx.restore(); }

// ---------- kaartje met kop en tekst ----------
function SP6_kaartje(ctx, x, y, w, kop, regels, a = 1, rand = C.goud, px = 34) { if (a <= 0.01) return; const h = 74 + regels.length * px * 1.3; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); metaText(ctx, kop, x + 26, y + 46, rand, 'left', 26);
  regels.forEach((r, i) => text(ctx, r, x + 26, y + 60 + (i + 0.8) * px * 1.3, fTekst(px, 700), C.text, 'left')); }); return h; }
// portret van een castpersonage in een lijstje (voor studenten, groepjes)
function SP6_portret(ctx, id, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { rand = '#B8B0A0', outfit, uit = 'neutraal', t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 50 * s, y - 56 * s, 100 * s, 112 * s, 10); shape(ctx, '#2E3E5C', rand, 2.5); ctx.beginPath(); ctx.rect(x - 47 * s, y - 53 * s, 94 * s, 106 * s); ctx.clip();
  const L = (CAST[id] && CAST[id].lengte) || 1; persoon(ctx, id, x, y + s * (380 * L - 46), 380 * s, { outfit, uit, t }); ctx.restore(); }
// klein potloodje dat schrijft
function SP6_potlood(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + 6 * Math.sin(t * 9), y + 3 * Math.sin(t * 13)); ctx.rotate(-0.7); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-4, -34, 8, 30); ctx.fillStyle = '#E8C9A0'; ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(4, -4); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill(); ctx.restore();
  lijn(ctx, [[x - 30, y + 10], [x - 30 + 24 * ((t * 0.7) % 1), y + 10]], '#9AA3B2', 2, a); }
// muzieknootjes
function SP6_noot(ctx, x, y, t, a = 1, kl = C.text2) { if (a <= 0.01) return; for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; ctx.save(); ctx.globalAlpha *= a * Math.sin(u * Math.PI); const px = x + u * 80 + k * 10, py = y - u * 90; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(px, py, 10, 7, -0.4, 0, 6.283); ctx.fill(); ctx.fillRect(px + 7, py - 34, 3, 34); ctx.restore(); } }
// startsignaal (pieper)
function SP6_pieper(ctx, x, y, aan, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 30, y - 40, 60, 80, 10); shape(ctx, '#3A4458', '#8FA0B5', 2); circ(ctx, x, y - 10, 16, aan > 0.5 ? '#F2C94C' : '#5A5E66');
  if (aan > 0.5) for (let k = 1; k <= 3; k++) { ctx.strokeStyle = rgba(C.goud, 1 - k * 0.25); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y - 10, 20 + k * 16, -0.8, 0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 10, 20 + k * 16, Math.PI - 0.8, Math.PI + 0.8); ctx.stroke(); }
  ctx.restore(); }
// handdoek over de schouders (vooraanzicht, zittend): r = ankerpunten van persoon()
function SP6_handdoek(ctx, r, h) { if (!r || !r.hoofd) return; const hx = r.hoofd.x, hy = r.hoofd.y, R = r.hoofd.r || h * 0.08, sy = hy + R * 1.35, bw = R * 2.3; ctx.save(); ctx.fillStyle = '#E8E2D4';
  ctx.beginPath(); ctx.moveTo(hx - bw, sy + R * 0.1); ctx.quadraticCurveTo(hx, sy - R * 0.35, hx + bw, sy + R * 0.1); ctx.lineTo(hx + bw * 0.95, sy + R * 0.7); ctx.quadraticCurveTo(hx + R * 0.4, sy + R * 0.45, hx + R * 0.5, sy + R * 2.1); ctx.lineTo(hx + R * 0.05, sy + R * 2.1); ctx.lineTo(hx - R * 0.05, sy + R * 0.5);
  ctx.quadraticCurveTo(hx - bw * 0.6, sy + R * 0.5, hx - bw * 0.95, sy + R * 0.7); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(hx + R * 0.08, sy + R * 1.7, R * 0.4, R * 0.18); ctx.restore(); }
// zwembril in de hand
function SP6_bril(ctx, x, y, s) { ctx.save(); ctx.strokeStyle = '#1E2230'; ctx.lineWidth = 3; ctx.fillStyle = rgba('#5BA4C9', 0.9); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 12 * s, y, 10 * s, 7 * s, 0, 0, 6.283); ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 22 * s, y); ctx.quadraticCurveTo(x, y + 26 * s, x + 22 * s, y); ctx.stroke(); ctx.restore(); }
// vliegje (aan de rand van het beeld)
function SP6_vlieg(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = rgba('#C9D2DE', 0.6); const fl = 0.3 * Math.sin(t * 40);
  ctx.beginPath(); ctx.ellipse(-14, -16, 18, 9, -0.6 + fl, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -16, 18, 9, 0.6 - fl, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.ellipse(0, 0, 9, 18, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -18, 8, '#3A2F3E'); circ(ctx, -5, -21, 4, '#B23A3A'); circ(ctx, 5, -21, 4, '#B23A3A');
  ctx.strokeStyle = '#2A2F3E'; ctx.lineWidth = 2; for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(sd * 6, -4 + k * 8); ctx.lineTo(sd * 18, -2 + k * 10); ctx.stroke(); } ctx.restore(); }
// zijaanzicht met de dichtbije hand op een doelpunt (twee-botten-IK op de schouder van persoon())
function SP6_reik(ctx, id, x, y, h, o, doel) { const kijk = o.kijk || 1; ctx.save(); ctx.beginPath(); ctx.rect(-20, -20, 1, 1); ctx.clip(); const r0 = persoon(ctx, id, x, y, h, Object.assign({}, o, { arm: [0.3, 0.2] })); ctx.restore();
  const R = r0 && r0.handR; if (!R || R.shx == null || !doel) return persoon(ctx, id, x, y, h, o);
  const P = Object.assign({}, CAST[id], (CAST[id].garderobe && o.outfit && CAST[id].garderobe[o.outfit]) || {}), A1 = R.hh * 1.32 * (P.armK || 1), A2 = R.hh * 1.2 * (P.armK || 1);
  const tx = kijk < 0 ? 2 * x - doel.x : doel.x, [a1, a2] = _ik(tx - R.shx, doel.y - R.shy, A1, A2); return persoon(ctx, id, x, y, h, Object.assign({}, o, { arm: [a1, a2 - a1] })); }
// de zwemmer staand op of achter het blok, zijaanzicht naar het water (rechts)
function SP6_samZij(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ outfit: 'zwem', zij: true, kijk: 1, t, uit: 'neutraal' }, o)); }
