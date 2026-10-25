// Wat word jij? · Ecologie en natuurbeheer · film 3 Een plan voor de natuur — eigen tekeningen (fase A, 25 okt 2026)
// Gebruikt ec_reeks.js (struikhei, grasPol, tapuit, loopkever, nederland, gebiedKaart, telformulier, maisPlant).
// Schaal in de veldscènes: persoon 400 px ≈ 1,75 m → ± 230 px per meter (bouwvoor 30 cm ≈ 70 px, kuil ± 0,6 m diep).
// Kleuren: groen = plant/gewas, oker = bodem/mest/fosfaat, teal = water, koraal = let op, goud = focus. Geen paars (alleen DNA in deze reeks).

const FLOOR = 840;               // voetlijn personen op de akker
const KL_FOSFAAT = C.oker;       // fosfaat- en fosforbolletjes en munten

function ec3Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.voet || FLOOR, o.h || 380, Object.assign({ t, uit: 'neutraal', kijk: 1, outfit: 'veld' }, o)); }
function bas(ctx, x, t, o = {}) { return persoon(ctx, 'bas', x, o.voet || FLOOR, o.h || 410, Object.assign({ t, uit: 'neutraal', kijk: -1, outfit: 'veld' }, o)); }
function chipL(ctx, s2, x, y, col, a = 1, px = 30) { tag(ctx, s2, x, y, col, a, 'center', px); }

// ---------- gereedschap in de hand ----------
// schep: steel ± 1,1 m, blad 30 × 20 cm; ang = richting van de hand (lib_cast hold-callback); de steel loopt van de hand omhoog, het blad omlaag
function schep(ctx, hx, hy, s = 1) { ctx.save(); ctx.translate(hx, hy); ctx.lineCap = 'round';
  ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 8 * s; ctx.beginPath(); ctx.moveTo(0, -70 * s); ctx.lineTo(0, 150 * s); ctx.stroke();
  ctx.strokeStyle = '#5A4430'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(-16 * s, -70 * s); ctx.lineTo(16 * s, -70 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-24 * s, 150 * s); ctx.lineTo(24 * s, 150 * s); ctx.lineTo(20 * s, 205 * s); ctx.quadraticCurveTo(0, 222 * s, -20 * s, 205 * s); ctx.closePath(); shape(ctx, '#8A949E', '#5E6872', 1.5);
  ctx.restore(); }
// duimstok (gele vouwmeter) uitgeklapt, recht omlaag uit de hand; per 10 cm een streep
function duimstok(ctx, hx, hy, L = 140, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(hx, hy);
  roundRect(ctx, -6, -6, 12, L, 3); shape(ctx, '#E8C850', '#A88A28', 1.2); ctx.fillStyle = '#3A3020'; for (let i = 1; i * 23 < L; i++) ctx.fillRect(-6, -6 + i * 23, i % 5 ? 6 : 10, 2);
  ctx.restore(); }

// ---------- veld met kuil (cold open en opening H2) ----------
// Achtergrond: horizon met heide links en mais rechts; akkergrond als vlak. De kuil: verre wand (doorsnede met bouwvoor en zand) en bodem;
// de nabije grond wordt ná de persoon in de kuil getekend, zodat zijn onderbenen erachter vallen ('tot zijn knieën').
const KUIL = { x0: 600, x1: 1240, rand: 590, wandOnder: 790, bouw: 672, voor: 800 }; // rand = bovenkant verre wand; bouw = grens bouwvoor/zand; voor = nabije rand
function veldAchter(ctx, o = {}) { const { a = 1, t = 0, heideHl = 0, maisHl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // lucht blijft schema-navy; horizon
  const hor = 520;
  // bosrand ver weg
  ctx.fillStyle = '#26402F'; ecPad(ctx, [[0, hor], [0, 470], [120, 452], [260, 466], [420, 446], [560, 470], [700, 458], [700, hor]]); ctx.fill();
  // heide links op de horizon
  ctx.fillStyle = KL_HEIDE; ecPad(ctx, [[0, 560], [0, 500], [200, 492], [460, 498], [640, 508], [700, 560]]); ctx.fill();
  heideRij(ctx, 10, 640, 520, 34, { seed: 11 }); heideRij(ctx, 30, 600, 548, 40, { seed: 23 });
  if (heideHl > 0.01) ecA(ctx, heideHl, () => { ecPad(ctx, [[0, 566], [0, 496], [200, 486], [460, 492], [650, 504], [706, 566]]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  // akker: vlak tot onderaan
  ctx.fillStyle = '#4A3E2E'; ctx.beginPath(); ctx.moveTo(0, 560); ctx.lineTo(700, 548); ctx.lineTo(W, 520); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  // mais (stoppels en een rij planten rechtsachter)
  for (let i = 0; i < 12; i++) maisPlant(ctx, 1300 + i * 52 + (i % 3) * 9, 540 + (i % 2) * 6, 210 + (i % 4) * 16, { seed: i + 2, t, kolf: i % 2 });
  if (maisHl > 0.01) ecA(ctx, maisHl, () => { roundRect(ctx, 1280, 300, 640, 260, 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.strokeStyle = rgba('#6A5A42', 0.7); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, 600 + i * 34); ctx.lineTo(W, 580 + i * 36); ctx.stroke(); }
  ctx.restore(); }
// verre kuilwand + bodem; o.fosfaat (0..1) = bolletjes in de bouwvoor; o.hl = gouden rand om de bouwvoor
function kuilAchter(ctx, o = {}) { const { a = 1, fosfaat = 0, hl = 0, zandHl = 0 } = o; if (a <= 0.01) return; const K = KUIL; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A2018'; ctx.beginPath(); ctx.ellipse((K.x0 + K.x1) / 2, K.rand + 8, (K.x1 - K.x0) / 2 + 24, 26, 0, 0, 6.283); ctx.fill(); // vergraven rand
  ctx.fillStyle = KL_BOUWVOOR; ctx.fillRect(K.x0, K.rand, K.x1 - K.x0, K.bouw - K.rand);
  ctx.fillStyle = KL_ZAND; ctx.fillRect(K.x0, K.bouw, K.x1 - K.x0, K.wandOnder - K.bouw + 40);
  // overgang: kleine tongen van donker in het zand (ploegzool), rustig
  ctx.fillStyle = KL_BOUWVOOR; for (let i = 0; i < 9; i++) { const x = K.x0 + 30 + i * 68; ctx.beginPath(); ctx.moveTo(x - 20, K.bouw - 1); ctx.quadraticCurveTo(x, K.bouw + 10 + (i % 3) * 4, x + 22, K.bouw - 1); ctx.fill(); }
  ctx.fillStyle = rgba(KL_ZAND_D, 0.7); for (let i = 0; i < 40; i++) circ(ctx, K.x0 + hash(i) * (K.x1 - K.x0), K.bouw + 14 + hash(i + 50) * 100, 2, rgba(KL_ZAND_D, 0.8));
  ctx.fillStyle = KL_BOUWVOOR_L; for (let i = 0; i < 30; i++) circ(ctx, K.x0 + hash(i + 7) * (K.x1 - K.x0), K.rand + 8 + hash(i + 70) * (K.bouw - K.rand - 16), 2.5, KL_BOUWVOOR_L);
  if (fosfaat > 0.01) ecA(ctx, fosfaat, () => { for (let i = 0; i < 46; i++) circ(ctx, K.x0 + 12 + hash(i + 300) * (K.x1 - K.x0 - 24), K.rand + 10 + hash(i + 400) * (K.bouw - K.rand - 18), 5, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.35), 1); });
  if (hl > 0.01) ecA(ctx, hl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(K.x0 + 2, K.rand + 2, K.x1 - K.x0 - 4, K.bouw - K.rand - 2); });
  if (zandHl > 0.01) ecA(ctx, zandHl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(K.x0 + 2, K.bouw + 4, K.x1 - K.x0 - 4, K.voor - K.bouw - 4); });
  ctx.restore(); }
// nabije grond vóór de kuil (bedekt de onderbenen van wie in de kuil staat)
function kuilVoor(ctx, a = 1) { if (a <= 0.01) return; const K = KUIL; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#4A3E2E'; ctx.beginPath(); ctx.moveTo(K.x0 - 60, H); ctx.lineTo(K.x0 - 60, K.voor + 6); ctx.quadraticCurveTo((K.x0 + K.x1) / 2, K.voor - 14, K.x1 + 60, K.voor + 6); ctx.lineTo(K.x1 + 60, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#2A2018'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(K.x0 - 40, K.voor + 6); ctx.quadraticCurveTo((K.x0 + K.x1) / 2, K.voor - 12, K.x1 + 40, K.voor + 6); ctx.stroke();
  // opgegraven hoop: donker bovenop licht
  ctx.fillStyle = KL_ZAND_D; ecPad(ctx, [[K.x1 + 40, 850], [K.x1 + 90, 790], [K.x1 + 190, 770], [K.x1 + 280, 820], [K.x1 + 300, 860]]); ctx.fill();
  ctx.fillStyle = KL_BOUWVOOR; ecPad(ctx, [[K.x1 + 70, 820], [K.x1 + 120, 780], [K.x1 + 200, 775], [K.x1 + 250, 820]]); ctx.fill();
  ctx.strokeStyle = rgba('#6A5A42', 0.7); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(K.x0 - 60, 830 + i * 34); ctx.lineTo(K.x1 + 60, 826 + i * 36); ctx.stroke(); }
  ctx.restore(); }

// ---------- graafmachine (rupskraan), zijaanzicht ----------
// x, y = grond onder het midden van de rupsen; s = schaal (1 ≈ 3 m lang, 270 px); o.arm 0..1 (0 = bak boven, 1 = bak op de grond voor de machine); o.vol = bak gevuld (kleur)
function graafmachine(ctx, x, y, s = 1, o = {}) { const { a = 1, arm = 0.4, vol = null, kijk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const geel = '#D9A93A', geelD = '#A8801E', grijs = '#3A3E46';
  roundRect(ctx, -130, -44, 260, 44, 22); shape(ctx, grijs, '#22252B', 2); for (let i = 0; i < 6; i++) circ(ctx, -104 + i * 42, -22, 13, '#5A5E66', '#22252B', 1.5);
  roundRect(ctx, -110, -110, 190, 64, 10); shape(ctx, geel, geelD, 2); // bovenwagen
  roundRect(ctx, -96, -196, 90, 88, 10); shape(ctx, geel, geelD, 2); roundRect(ctx, -84, -184, 66, 52, 6); shape(ctx, '#8FB0C8', '#5A7A92', 1.5); // cabine met raam
  roundRect(ctx, -150, -104, 44, 56, 8); shape(ctx, geelD, '#7A5E14', 1.5); // contragewicht
  // giek en steel: schouder (60, −90) → elleboog → bak
  const sh = [60, -96], an1 = lerp(-1.05, -0.35, arm), L1 = 190, el = [sh[0] + Math.cos(an1) * L1, sh[1] + Math.sin(an1) * L1], an2 = lerp(0.9, 1.45, arm), L2 = 150, bk = [el[0] + Math.cos(an2) * L2, el[1] + Math.sin(an2) * L2];
  ctx.strokeStyle = geelD; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(...sh); ctx.lineTo(...el); ctx.stroke(); ctx.strokeStyle = geel; ctx.lineWidth = 20; ctx.stroke();
  ctx.strokeStyle = geelD; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(...el); ctx.lineTo(...bk); ctx.stroke(); ctx.strokeStyle = geel; ctx.lineWidth = 13; ctx.stroke();
  circ(ctx, el[0], el[1], 9, grijs);
  ctx.save(); ctx.translate(bk[0], bk[1]); ctx.rotate(lerp(0.3, -0.4, arm)); ctx.beginPath(); ctx.moveTo(-8, -10); ctx.lineTo(48, -6); ctx.quadraticCurveTo(54, 30, 18, 44); ctx.lineTo(-10, 34); ctx.closePath(); shape(ctx, grijs, '#22252B', 2);
  if (vol) { ctx.beginPath(); ctx.ellipse(20, -8, 30, 12, 0, Math.PI, 0); ctx.fillStyle = vol; ctx.fill(); }
  ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(4 + i * 10, 44 - i * 2); ctx.lineTo(8 + i * 10, 54 - i * 2); ctx.lineTo(12 + i * 10, 42 - i * 2); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ---------- doorsnede van de bodem (H2) ----------
// x, y = linksboven van het maaiveld; w breed; o.bouwH = dikte bouwvoor (px), o.fosfaat 0..1, o.weg 0..1 (bouwvoor weggegraven tot dat deel, van links naar rechts),
// o.diep 0..1 = fosfaat ook dieper in het zand, o.laagje 0..1 = dun laagje heidegrond op het afgegraven zand, o.ploeg 0..1 ploegvoren; o.hl gouden rand om de bouwvoor
function bodemDoorsnede(ctx, x, y, w, h, o = {}) { const { a = 1, bouwH = 150, fosfaat = 0, weg = 0, diep = 0, laagje = 0, ploeg = 0, hl = 0, t = 0, mest = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); ctx.save(); ctx.clip();
  ctx.fillStyle = KL_ZAND; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = rgba(KL_ZAND_D, 0.8); for (let i = 0; i < 70; i++) circ(ctx, x + hash(i + 11) * w, y + bouwH + 16 + hash(i + 91) * (h - bouwH - 20), 2.4, rgba(KL_ZAND_D, 0.8));
  const xw = x + w * weg; // tot hier is de bouwvoor weg
  ctx.fillStyle = KL_BOUWVOOR; ctx.fillRect(xw, y, x + w - xw, bouwH);
  for (let i = 0; i < 14; i++) { const px = x + 20 + i * (w / 14); if (px < xw) continue; ctx.beginPath(); ctx.moveTo(px - 26, y + bouwH - 1); ctx.quadraticCurveTo(px, y + bouwH + 12 + (i % 3) * 4, px + 26, y + bouwH - 1); ctx.fill(); }
  ctx.fillStyle = KL_BOUWVOOR_L; for (let i = 0; i < 50; i++) { const px = x + hash(i + 5) * w; if (px > xw) circ(ctx, px, y + 10 + hash(i + 55) * (bouwH - 20), 3, KL_BOUWVOOR_L); }
  if (ploeg > 0.01) ecA(ctx, ploeg, () => { ctx.strokeStyle = rgba('#7A6A52', 0.9); ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const px = x + 40 + i * (w - 80) / 8; if (px < xw) continue; ctx.beginPath(); ctx.moveTo(px, y + 4); ctx.quadraticCurveTo(px + 30, y + bouwH * 0.5, px + 10, y + bouwH - 10); ctx.stroke(); } });
  if (fosfaat > 0.01) ecA(ctx, fosfaat, () => { const n = Math.round(80 * fosfaat) + 6; for (let i = 0; i < n; i++) { const px = x + 14 + hash(i + 300) * (w - 28), py = y + 12 + hash(i + 400) * (bouwH - 22); if (px > xw) circ(ctx, px, py, 6, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.35), 1); } });
  if (mest > 0.01) ecA(ctx, mest, () => { for (let i = 0; i < 16; i++) { const k = ((t * 0.5 + hash(i + 900)) % 1), px = x + 30 + hash(i + 800) * (w - 60); if (px > xw) circ(ctx, px, y - 70 + k * (70 + bouwH * 0.4), 6, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.35), 1); } });
  if (diep > 0.01) ecA(ctx, diep, () => { for (let i = 0; i < 14; i++) circ(ctx, x + 30 + hash(i + 600) * (w * 0.5), y + bouwH + 20 + hash(i + 700) * 70, 6, KL_FOSFAAT, C.goud, 1.5); });
  if (laagje > 0.01) ecA(ctx, laagje, () => { const lw = (xw - x) * clamp(laagje * 1.1, 0, 1); ctx.fillStyle = KL_HEIDE; ctx.fillRect(x, y + bouwH - 10, lw, 10); });
  ctx.restore();
  // maaiveld: waar de bouwvoor weg is, ligt het zand lager
  roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  if (weg > 0.01) { ctx.fillStyle = C.bgSchema; ctx.fillRect(x - 2, y - 2, xw - x + 2, bouwH - 10 + 2); }
  if (hl > 0.01) ecA(ctx, hl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(Math.max(x, xw) + 2, y + 2, x + w - Math.max(x, xw) - 4, bouwH - 2); });
  ctx.restore(); }

// ---------- spaarpot (varken) met munten ----------
// x, y = midden; s = schaal (1 ≈ 220 px breed); o.vul 0..1 = hoe vol (munten zichtbaar door het venster); o.label
function spaarpot(ctx, x, y, s = 1, o = {}) { const { a = 1, vul = 1, label = 'fosfaat' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const kl = '#C98A7A', klD = '#A86A5A';
  for (const px of [-60, -24, 30, 64]) { roundRect(ctx, px - 13, 50, 26, 44, 8); shape(ctx, klD, '#8A5444', 1.5); }
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 80, 0, 0, 6.283); shape(ctx, kl, klD, 2.5);
  ctx.beginPath(); ctx.ellipse(112, 6, 26, 30, 0, 0, 6.283); shape(ctx, kl, klD, 2.5); circ(ctx, 120, 0, 5, '#6A3A30'); circ(ctx, 120, 14, 5, '#6A3A30');
  ctx.beginPath(); ctx.moveTo(60, -62); ctx.lineTo(84, -96); ctx.lineTo(92, -56); ctx.closePath(); shape(ctx, klD, '#8A5444', 1.5);
  circ(ctx, 72, -26, 6, '#2A1A16'); ctx.strokeStyle = klD; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-118, -10, 14, 0.5, 4.2); ctx.stroke();
  ctx.fillStyle = '#5A3A30'; roundRect(ctx, -30, -82, 60, 9, 4); ctx.fill(); // gleuf
  // venster: munten zichtbaar
  ctx.save(); ctx.beginPath(); ctx.ellipse(-12, 10, 70, 50, 0, 0, 6.283); ctx.fillStyle = '#2A2032'; ctx.fill(); ctx.clip();
  const n = Math.round(22 * vul); for (let i = 0; i < n; i++) { const cx = -70 + (i % 7) * 20, cy = 50 - Math.floor(i / 7) * 16; munt(ctx, cx, cy, 0.8); }
  ctx.restore(); ctx.beginPath(); ctx.ellipse(-12, 10, 70, 50, 0, 0, 6.283); ctx.strokeStyle = klD; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); if (label) naamBij(ctx, label, '', x, y - 110 * s - 10, a, 'center'); }
function munt(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 13 * s, 9 * s, 0, 0, 6.283); shape(ctx, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.4), 1.5); if (s >= 1) text(ctx, 'P', x, y + 6 * s, fTekst(17 * s, 800), '#5A4420', 'center'); ctx.restore(); }

// ---------- trekker met kar (maaien en uitmijnen) ----------
// x, y = grond; s schaal (1 ≈ 4,5 m, 420 px); o.lading 'gras' | 'mais' | null; o.t (wielen draaien)
function trekkerKar(ctx, x, y, s = 1, o = {}) { const { a = 1, lading = 'gras', t = 0, kijk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  const wiel = (cx, cy, r) => { circ(ctx, cx, cy, r, '#2A2E36', '#14161A', 2); circ(ctx, cx, cy, r * 0.5, '#8A929E'); ctx.strokeStyle = '#14161A'; ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { const an = t * 3 + k * 1.57; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * r * 0.5, cy + Math.sin(an) * r * 0.5); ctx.stroke(); } };
  // kar (links)
  roundRect(ctx, -260, -110, 200, 70, 6); shape(ctx, '#6A7A8A', '#4A5A6A', 2);
  if (lading === 'gras') { ctx.fillStyle = '#9AB86A'; ecPad(ctx, [[-256, -108], [-240, -150], [-180, -166], [-110, -158], [-64, -112]]); ctx.fill(); }
  if (lading === 'mais') { for (let i = 0; i < 9; i++) { ctx.save(); ctx.translate(-240 + i * 20, -118 - (i % 3) * 8); ctx.rotate(0.3 * (i % 2 ? 1 : -1)); ctx.beginPath(); ctx.ellipse(0, 0, 9, 22, 0, 0, 6.283); shape(ctx, '#E2C04A', '#B8962E', 1.2); ctx.restore(); } }
  ctx.strokeStyle = '#4A5A6A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60, -60); ctx.lineTo(-20, -60); ctx.stroke(); wiel(-200, -26, 26); wiel(-130, -26, 26);
  // trekker (rechts)
  roundRect(ctx, -10, -120, 150, 70, 10); shape(ctx, '#4F8A52', '#3A6A3E', 2); roundRect(ctx, 0, -210, 80, 96, 8); shape(ctx, '#4F8A52', '#3A6A3E', 2); roundRect(ctx, 10, -200, 60, 50, 4); shape(ctx, '#8FB0C8', '#5A7A92', 1.5);
  ctx.fillStyle = '#2A2E36'; ctx.fillRect(110, -156, 8, 40); wiel(30, -46, 46); wiel(120, -30, 30);
  ctx.restore(); }

// ---------- arm/rijk-vierkant (H2) ----------
// x, y = linksboven; w = zijde; o.rijk = 0 (arm) … 1 (rijk); o.groei 0..1 (gras groeit over de heide heen); o.t
function grondVak(ctx, x, y, w, o = {}) { const { a = 1, rijk = 0, groei = 0, t = 0, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const gy = y + w * 0.78; roundRect(ctx, x, y, w, w, 16); ctx.save(); ctx.clip();
  ctx.fillStyle = rgba(C.fill, 0.5); ctx.fillRect(x, y, w, w);
  ctx.fillStyle = rijk ? KL_BOUWVOOR : KL_ZAND; ctx.fillRect(x, gy, w, w - (gy - y));
  if (rijk) for (let i = 0; i < 18; i++) circ(ctx, x + 10 + hash(i + seed * 20) * (w - 20), gy + 10 + hash(i + 40) * (w * 0.18), 5, KL_FOSFAAT, lighten(KL_FOSFAAT, 0.35), 1);
  for (let i = 0; i < 5; i++) struikhei(ctx, x + w * (0.12 + i * 0.19), gy, w * (0.22 + 0.04 * (i % 2)), { seed: i + seed, bloei: 1 });
  if (rijk && groei > 0.01) { const gh = w * lerp(0.1, 0.72, groei); for (let i = 0; i < 9; i++) grasPol(ctx, x + w * (0.06 + i * 0.11), gy + 2, gh * (0.85 + 0.3 * hash(i + 3)), { seed: i + 5, kl: i % 2 ? '#8FB860' : '#7FA855', n: 11 }); }
  ctx.restore(); roundRect(ctx, x, y, w, w, 16); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }

// ---------- bodemleven in een zoomcirkel (H2 Reijerscamp) ----------
function bodemleven(ctx, cx, cy, r, t = 0, o = {}) { const { zaad = 1, schimmel = 1, dier = 1 } = o;
  ctx.fillStyle = '#3E3228'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 60; i++) circ(ctx, cx + (hash(i + 1) - 0.5) * 2 * r, cy + (hash(i + 2) - 0.5) * 2 * r, 6 + 10 * hash(i + 3), i % 2 ? '#5A4A3A' : '#4A3C30');
  // schimmeldraden (hyfen): dunne vertakte lichte lijnen
  if (schimmel > 0.01) ecA(ctx, schimmel, () => { ctx.strokeStyle = '#E8E0CC'; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; const R = ecRng(5);
    for (let k = 0; k < 6; k++) { let x = cx + (R() - 0.5) * r * 1.4, y = cy + (R() - 0.5) * r * 1.4, an = R() * 6.28; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 7; j++) { an += (R() - 0.5) * 0.9; x += Math.cos(an) * 22; y += Math.sin(an) * 22; ctx.lineTo(x, y); } ctx.stroke(); } });
  // zaden: druppelvormig, bruin, met een lichte zoom
  if (zaad > 0.01) ecA(ctx, zaad, () => { [[-0.45, -0.3], [0.3, -0.5], [0.5, 0.2], [-0.2, 0.45], [0.05, 0.05]].forEach(([u, v], i) => { ctx.save(); ctx.translate(cx + u * r, cy + v * r); ctx.rotate(i); ctx.beginPath(); ctx.ellipse(0, 0, 8, 12, 0, 0, 6.283); shape(ctx, '#9A6A3A', '#D8B080', 1.5); ctx.restore(); }); });
  // springstaart (bodemdiertje): langwerpig lijf, kop met sprieten, springvork onder het achterlijf
  if (dier > 0.01) ecA(ctx, dier, () => { const px = cx - r * 0.25 + Math.sin(t * 2) * 6, py = cy + r * 0.25; ctx.save(); ctx.translate(px, py); ctx.rotate(-0.2);
    ctx.beginPath(); ctx.ellipse(0, 0, 26, 9, 0, 0, 6.283); shape(ctx, '#C8C0A8', '#8A846E', 1.5); circ(ctx, 28, -2, 8, '#C8C0A8', '#8A846E', 1.5);
    ctx.strokeStyle = '#8A846E'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(33, -6); ctx.lineTo(46, -16); ctx.moveTo(33, -4); ctx.lineTo(48, -6); ctx.moveTo(-22, 5); ctx.quadraticCurveTo(-6, 18, 8, 12); ctx.stroke();
    for (const lx of [10, 16, 22]) { ctx.beginPath(); ctx.moveTo(lx, 7); ctx.lineTo(lx + 3, 15); ctx.stroke(); } ctx.restore(); }); }

// ---------- lappendeken: losse heideveldjes tussen akkers en wegen (H3) ----------
// x, y, w, h = kader; o.leeg 0..1 (veldje A loopt leeg door pech), o.groot (groot gebied links), o.instroom 0..1 (stipjes van groot naar dichtbij), o.ver = pijl naar ver veldje stopt
const LAP = [[0.14, 0.5, 0.16, 0.7], [0.38, 0.32, 0.09, 0.16], [0.6, 0.62, 0.08, 0.14], [0.82, 0.3, 0.08, 0.14], [0.78, 0.76, 0.07, 0.12]]; // [u, v, rx, ry] — 0 = groot gebied
function lappendeken(ctx, x, y, w, h, o = {}) { const { a = 1, leeg = 0, instroom = 0, ver = 0, t = 0, stip = 1, hlLeeg = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip(); ctx.fillStyle = '#5E6A3E'; ctx.fillRect(x, y, w, h);
  // akkerpercelen
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { ctx.fillStyle = (i + j) % 2 ? KL_AKKER : '#6E7A44'; ctx.fillRect(x + i * w / 6 + 3, y + j * h / 4 + 3, w / 6 - 6, h / 4 - 6); }
  // wegen
  ctx.fillStyle = KL_WEG; ctx.fillRect(x, y + h * 0.48, w, 16); ctx.fillRect(x + w * 0.5, y, 16, h); ctx.fillRect(x + w * 0.7, y, 12, h);
  // heideveldjes
  LAP.forEach(([u, v, rx, ry], i) => { ctx.beginPath(); ctx.ellipse(x + u * w, y + v * h, rx * w, ry * h, i * 0.4, 0, 6.283); ctx.fillStyle = KL_HEIDE; ctx.fill(); ctx.strokeStyle = KL_HEIDE_L; ctx.lineWidth = 2; ctx.stroke();
    const R = ecRng(i * 7 + 2); for (let k = 0; k < (i ? 10 : 60); k++) circ(ctx, x + (u + (R() - 0.5) * rx * 1.4) * w, y + (v + (R() - 0.5) * ry * 1.4) * h, 3, KL_HEIDEBLOEM_D); });
  ctx.restore();
  // populatie-stipjes (dieren) per veldje; veldje 2 (index 2) loopt leeg
  if (stip > 0.01) ecA(ctx, stip, () => { LAP.forEach(([u, v, rx, ry], i) => { const n = i === 0 ? 16 : 4; for (let k = 0; k < n; k++) { let f = 1; if (i === 2) f = 1 - clamp(leeg * 4 - k, 0, 1);
    if (i === 1 && k >= 2) f = 0; if (i === 4) f = 0; if (f <= 0.01) continue; const R = ecRng(i * 31 + k), wa = wander(i * 10 + k, t, 6, 0.6);
    circ(ctx, x + (u + (R() - 0.5) * rx) * w + wa.x, y + (v + (R() - 0.5) * ry) * h + wa.y, 9, rgba(C.goud, f), '#121A26', 1.5); } }); });
  if (hlLeeg > 0.01) ecA(ctx, hlLeeg, () => { const [u, v, rx, ry] = LAP[2]; ctx.beginPath(); ctx.ellipse(x + u * w, y + v * h, rx * w + 12, ry * h + 12, 0.8, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); });
  // instroom: van het grote gebied naar het dichtbij gelegen veldje (index 1)
  if (instroom > 0.01) { const A = [x + (LAP[0][0] + LAP[0][2] * 0.8) * w, y + LAP[0][1] * h - 30], B = [x + LAP[1][0] * w - 30, y + LAP[1][1] * h + 10];
    pijl(ctx, A[0], A[1], B[0], B[1], C.goud, instroom, 4, 16); for (let k = 0; k < 2; k++) { const u = ((t * 0.35 + k * 0.5) % 1); circ(ctx, lerp(A[0], B[0], u), lerp(A[1], B[1], u), 9, rgba(C.goud, instroom), '#121A26', 1.5); } }
  if (ver > 0.01) { const A = [x + (LAP[0][0] + LAP[0][2]) * w + 10, y + LAP[0][1] * h + 40], B = [x + LAP[4][0] * w - 40, y + LAP[4][1] * h]; ctx.save(); ctx.globalAlpha *= ver; ctx.setLineDash([12, 12]); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(lerp(A[0], B[0], 0.5), lerp(A[1], B[1], 0.5)); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); kruis(ctx, lerp(A[0], B[0], 0.56), lerp(A[1], B[1], 0.56), 14, ver); }
  roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore(); }

// ---------- proefvak-kaartje met loopkevers (H3) ----------
// o.heide = grote heide ernaast (0..1), o.kevers = lijst {u, v, z: zeldzaam, f: zichtbaarheid}
function keverVak(ctx, x, y, w, h, titel, sub, o = {}) { const { a = 1, heide = 0, kevers = [], t = 0, afstand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.55), C.line, 1.5);
  text(ctx, titel, x + 28, y + 52, fTekst(38, 700), C.text, 'left'); if (sub) metaText(ctx, sub, x + 28, y + 90, C.grain, 'left', 26);
  const vx = x + 30, vy = y + 120, vw = w - 60, vh = h - 150;
  if (heide > 0.01) ecA(ctx, heide, () => { roundRect(ctx, vx, vy, vw * 0.42, vh, 12); ctx.fillStyle = KL_HEIDE; ctx.fill(); heideRij(ctx, vx + 10, vx + vw * 0.4, vy + vh - 14, 40, { seed: 4 }); heideRij(ctx, vx + 10, vx + vw * 0.4, vy + vh * 0.55, 34, { seed: 9 });
    metaText(ctx, 'grote heide', vx + vw * 0.21, vy + 40, C.text, 'center', 26); });
  const px0 = heide > 0.01 ? vx + vw * 0.45 : vx; const pw = heide > 0.01 ? vw * 0.55 : vw;
  roundRect(ctx, px0, vy, pw, vh, 12); shape(ctx, rgba(KL_ZAND, 0.85), KL_ZAND_D, 1.5); for (let i = 0; i < 6; i++) struikhei(ctx, px0 + 30 + i * (pw - 60) / 5, vy + vh - 10, 28, { seed: i + 3, jong: 1, bloei: 0.4 });
  metaText(ctx, 'proefveld', px0 + pw / 2, vy + 40, '#5A4A30', 'center', 26);
  if (afstand > 0.01) ecA(ctx, afstand, () => { ctx.setLineDash([10, 10]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px0 - 4, vy + vh / 2); ctx.lineTo(vx - 4, vy + vh / 2); ctx.stroke(); ctx.setLineDash([]); });
  kevers.forEach(k => { const f = k.f == null ? 1 : k.f; if (f <= 0.01) return; const bx = (k.x != null ? k.x : px0 + k.u * pw), by = vy + k.v * vh; loopkever(ctx, bx, by, 2.4, { a: f, rot: k.rot || 0, t: t + k.u * 3, zeldzaam: k.z }); });
  ctx.restore(); return { vx, vy, vw, vh, px0, pw }; }

// ---------- vegetatieopname: vierkant met touw en vier piketten in perspectief (H4) ----------
function opnameVierkant(ctx, cx, cy, w, o = {}) { const { a = 1, touw = 1, planten = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const d = w * 0.32, P = [[cx - w / 2 + d * 0.5, cy - d], [cx + w / 2 - d * 0.5, cy - d], [cx + w / 2, cy + d * 0.4], [cx - w / 2, cy + d * 0.4]];
  if (planten > 0.01) ecA(ctx, planten, () => { for (let i = 0; i < 7; i++) { const u = hash(i + 3), v = hash(i + 9); const px = lerp(lerp(P[0][0], P[1][0], u), lerp(P[3][0], P[2][0], u), v), py = lerp(P[0][1], P[3][1], v);
    if (i % 3 === 2) grasPol(ctx, px, py, 34, { seed: i, n: 7 }); else struikhei(ctx, px, py, 40 + 10 * hash(i), { seed: i, jong: 1 }); }
    for (let i = 0; i < 3; i++) { const px = cx - w * 0.2 + i * w * 0.18, py = cy - d * 0.2 + (i % 2) * 18; schapenzuring(ctx, px, py, 46); } });
  const piket = (x, y) => { ctx.fillStyle = '#C8A870'; ctx.fillRect(x - 4, y - 46, 8, 50); ctx.fillStyle = C.koraal; ctx.fillRect(x - 4, y - 46, 8, 10); };
  if (touw > 0.01) ecA(ctx, touw, () => { ctx.strokeStyle = hl > 0.5 ? C.goud : '#F2EEE4'; ctx.lineWidth = 3; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] - 20) : ctx.moveTo(p[0], p[1] - 20)); ctx.closePath(); ctx.stroke(); });
  P.forEach(p => piket(p[0], p[1])); ctx.restore(); return P; }
// schapenzuring (Rumex acetosella): rozet van spiesvormige blaadjes op een korte steel, roodbruine bloeiaar; klein
function schapenzuring(ctx, x, y, h) { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#8A4A3A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 2, y - h); ctx.stroke();
  for (let k = 0; k < 4; k++) circ(ctx, x + 2 + (k % 2 ? 4 : -4), y - h + k * 7, 3, '#B0584A');
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x, y - 2); ctx.quadraticCurveTo(x + d * 10, y - h * 0.3, x + d * 18, y - h * 0.22); ctx.quadraticCurveTo(x + d * 8, y - h * 0.1, x, y - 2); ctx.fillStyle = '#6E9A52'; ctx.fill(); } ctx.restore(); }

// ---------- bedekkingsbalk met marge (H4) ----------
// x = links, y = basislijn, bh = maximale hoogte (100 %), bw = breedte; val in %; marge in % (schematisch); o.kl
function bedekBalk(ctx, x, y, bw, bh, val, o = {}) { const { a = 1, groei = 1, kl = C.groen, marge = 6, label = '', sub = '', waarde = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const v = val * clamp(groei, 0, 1), hh = bh * v / 100; roundRect(ctx, x, y - hh, bw, hh, 8); shape(ctx, rgba(kl, 0.6), kl, 2);
  if (groei > 0.98) { ctx.strokeStyle = C.text; ctx.lineWidth = 2.5; const mx = x + bw / 2, t0 = y - bh * (val + marge) / 100, t1 = y - bh * Math.max(0, val - marge) / 100; ctx.beginPath(); ctx.moveTo(mx, t0); ctx.lineTo(mx, t1); ctx.moveTo(mx - 14, t0); ctx.lineTo(mx + 14, t0); ctx.moveTo(mx - 14, t1); ctx.lineTo(mx + 14, t1); ctx.stroke();
    if (waarde) text(ctx, '± ' + val + ' %', mx, y - hh - bh * marge / 100 - 18, fTekst(32, 700), C.text, 'center'); }
  if (label) text(ctx, label, x + bw / 2, y + 44, fTekst(30, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x + bw / 2, y + 80, C.grain, 'center', 24);
  ctx.restore(); }
// kleine meter 'lijkt op droge heide' (overeenkomst in %), horizontaal
function heideMeter(ctx, x, y, w, val, a = 1, hl = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 24, 12); shape(ctx, '#2A3446', C.line, 1.5);
  roundRect(ctx, x, y, Math.max(24, w * val / 100), 24, 12); shape(ctx, rgba(KL_HEIDEBLOEM, 0.85), hl ? C.goud : KL_HEIDEBLOEM, hl ? 3 : 1.5); text(ctx, val + ' %', x + w + 14, y + 22, fTekst(30, 700), C.text, 'left'); ctx.restore(); }

// ---------- schaap (static, zijaanzicht): kudde-icoon in de kringloop; niet lopend ----------
// Recept (Drents heideschaap als voorbeeld): schofthoogte ± 60 cm, romp ± 1,2× zo lang als hoog; wolvacht als één silhouet met golvende rand;
// kop smal met hangende oren, poten dun met de hak hoog (achterpoot), hoefjes donker. Stilstaand, dus een omtrek mag (C10.3).
function schaapStil(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, graas = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const wol = '#E6E0D2', wolD = '#C8C0AE', kop = '#3A3430';
  ctx.strokeStyle = kop; ctx.lineWidth = 7; [[-44, -50, -48, -26, -42, 0], [-30, -50, -30, -24, -28, 0], [34, -50, 36, -26, 34, 0], [48, -50, 50, -26, 50, 0]].forEach(([a1, b1, a2, b2, a3, b3]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.lineTo(a3, b3); ctx.stroke(); });
  const L = []; for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283, r = 1 + 0.05 * Math.sin(i * 2.7); L.push([Math.cos(an) * 74 * r, -86 + Math.sin(an) * 44 * r]); } ecPad(ctx, L); shape(ctx, wol, wolD, 2);
  ctx.strokeStyle = rgba(wolD, 0.9); ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-46 + i * 15, -92 + (i % 2) * 14, 7, 0.4, 2.8); ctx.stroke(); }
  ctx.save(); ctx.translate(66, graas ? -60 : -108); ctx.rotate(graas ? 1.0 : 0.25); ecPad(ctx, [[-10, -14], [14, -16], [36, -4], [40, 8], [24, 14], [-8, 12]]); shape(ctx, kop, '#1E1A18', 1.5);
  ctx.beginPath(); ctx.ellipse(0, -8, 14, 6, -0.7, 0, 6.283); ctx.fillStyle = kop; ctx.fill(); circ(ctx, 18, -4, 2.6, '#C8B070'); ctx.fillStyle = '#121214'; ctx.fillRect(16.6, -5, 3, 2); ctx.restore();
  ctx.restore(); }
// zakje zaad
function zaadZakje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(46, 50); ctx.lineTo(-46, 50); ctx.closePath(); shape(ctx, '#D8C8A0', '#A89870', 2);
  ctx.strokeStyle = '#A89870'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -36); ctx.lineTo(40, -36); ctx.stroke(); struikhei(ctx, 0, 30, 54, { seed: 5 }); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(-30 + i * 14, 66 + (i % 2) * 6, 4, 6, i, 0, 6.283); ctx.fillStyle = '#9A6A3A'; ctx.fill(); } ctx.restore(); }
// gezaagd berkje: stronk met zaagvlak en een omgevallen stammetje
function berkStronk(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -14, -40, 28, 40, 4); shape(ctx, '#E8E4DA', '#B8B4AA', 1.5); ctx.beginPath(); ctx.ellipse(0, -40, 14, 5, 0, 0, 6.283); shape(ctx, '#D8C49A', '#B8A478', 1.5);
  ctx.fillStyle = '#2A2A30'; ctx.fillRect(-14, -26, 10, 3); ctx.fillRect(4, -14, 10, 3);
  ctx.save(); ctx.translate(30, -8); ctx.rotate(-0.08); roundRect(ctx, 0, -10, 120, 18, 6); shape(ctx, '#E8E4DA', '#B8B4AA', 1.5); ctx.fillStyle = '#2A2A30'; for (let i = 0; i < 5; i++) ctx.fillRect(14 + i * 22, -10, 3, 10);
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(110 + (i % 2) * 14, -16 - i * 6, 12, 8, 0.5, 0, 6.283); ctx.fillStyle = '#9CC86A'; ctx.fill(); } ctx.restore(); ctx.restore(); }

// ---------- kringloop doel → maatregel → meten → bijsturen (H4) ----------
// cx, cy = midden; r = straal; aan = [4] zichtbaarheid per stap; hl = index in focus; teken(i, x, y) tekent een icoontje bij stap i
function kringloop(ctx, cx, cy, r, aan, hl = -1, teken = null, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = ['doel', 'maatregel', 'meten', 'bijsturen'];
  for (let i = 0; i < 4; i++) { const an = -Math.PI / 2 + i * Math.PI / 2, nx = cx + Math.cos(an) * r, ny = cy + Math.sin(an) * r, f = aan[i]; if (f <= 0.01) continue;
    const a2 = an + Math.PI / 2, a1 = an + 0.42, a3 = a2 - 0.42; const ff = aan[(i + 1) % 4]; if (ff > 0.01) { ctx.save(); ctx.globalAlpha *= ff; ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r, a1, a3); ctx.stroke();
      const hx = cx + Math.cos(a3) * r, hy = cy + Math.sin(a3) * r, tg = a3 + Math.PI / 2; ctx.fillStyle = rgba(C.line, 0.9); ctx.beginPath(); ctx.moveTo(hx + Math.cos(tg) * 14, hy + Math.sin(tg) * 14); ctx.lineTo(hx + Math.cos(tg + 2.5) * 14, hy + Math.sin(tg + 2.5) * 14); ctx.lineTo(hx + Math.cos(tg - 2.5) * 14, hy + Math.sin(tg - 2.5) * 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, nx - 120, ny - 40, 240, 80, 40); shape(ctx, rgba(i === hl ? C.goud : C.fill, i === hl ? 0.25 : 0.85), i === hl ? C.goud : C.line, i === hl ? 3 : 1.5);
    text(ctx, N[i], nx, ny + 12, fTekst(34, 700), C.text, 'center'); if (teken) teken(i, nx, ny); ctx.restore(); }
  ctx.restore(); }

// ---------- opleidingskaartje (recap) ----------
function opleidingKaart(ctx, x, y, w, niveau, naam, plaats, a = 1, icoon = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 16); shape(ctx, rgba(C.fill, 0.75), C.line, 1.5);
  metaText(ctx, niveau, x + 26, y + 42, C.goud, 'left', 26); text(ctx, naam, x + 26, y + 88, fTekst(36, 700), C.text, 'left'); text(ctx, plaats, x + 26, y + 128, fTekst(30), C.text2, 'left'); if (icoon) icoon(x + w - 60, y + 76); ctx.restore(); }

// ---------- plan-vel (H1) ----------
function planVel(ctx, x, y, w, h, regels, aan, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEE4', '#C8C0B0', 2);
  metaText(ctx, 'BEHEERPLAN · AKKER', x + 30, y + 52, '#5A6478', 'left', 24);
  regels.forEach((r2, i) => { const f = aan[i] == null ? 1 : aan[i]; if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; text(ctx, (i + 1) + '  ' + r2, x + 30, y + 110 + i * 56, fTekst(32, i === 0 ? 700 : 600), '#1A2740', 'left'); ctx.restore(); });
  ctx.restore(); }
