// Wat word jij? · Laboratoriumtechniek 1 · Preparaat en microscoop — eigen tekeningen (24 okt 2026)
// potje, paraffineBlok, microtoom, kleurBak, glaasje, labTafel en de HE-kleuren komen uit Geneeskunde 4 (Wat de patholoog ziet), licht aangepast.

function mixC(a, b, f) { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); f = clamp(f, 0, 1); const c = s => Math.round(((p >> s) & 255) * (1 - f) + ((q >> s) & 255) * f); return `rgb(${c(16)},${c(8)},${c(0)})`; }
const HE = { glas: '#F3EEF1', grijs: '#E4E0E5', grijsR: '#D6D1D8', roze: '#EDB0C6', rozeR: '#D98AA8', rozeL: '#F6CFDC', paars: '#55398C', paarsD: '#3B2470', bloed: '#D0465E' };
const LICHTVELD = '#EEEBE2'; // achtergrond van een helder-veldbeeld
const FL = { groen: '#7CE08A', blauw: '#6A8CFF' }; // fluorescentie (label groen, belichting blauw)

// ---------- uit Geneeskunde 4 ----------
function potje(ctx, x, y, s = 1, a = 1, t = 0, stukje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -110, 140, 190, 22); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); roundRect(ctx, -70, -110, 140, 190, 22); ctx.clip(); ctx.fillStyle = rgba('#DDEFF0', 0.22); ctx.fillRect(-70, -70 + Math.sin(t * 1.5) * 2, 140, 160); ctx.restore();
  roundRect(ctx, -78, -140, 156, 38, 10); shape(ctx, '#F2F2EE', '#C9CED6', 2);
  roundRect(ctx, -52, -30, 104, 54, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.fillStyle = '#5A6478'; ctx.fillRect(-38, -16, 76, 5); ctx.fillRect(-38, -2, 54, 5);
  if (stukje > 0.01) { ctx.save(); ctx.globalAlpha *= stukje; const dy = 46 + Math.sin(t * 1.2) * 4; ctx.beginPath(); ctx.moveTo(-34, dy); ctx.quadraticCurveTo(-30, dy - 16, 0, dy - 14); ctx.quadraticCurveTo(34, dy - 12, 32, dy + 2); ctx.quadraticCurveTo(10, dy + 14, -34, dy); ctx.closePath(); shape(ctx, '#8E4A3E', '#6E382E', 2); ctx.restore(); }
  ctx.restore(); }
function paraffineBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -100, -20, 200, 90, 8); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.fillStyle = rgba('#1A2740', 0.35); for (let i = 0; i < 7; i++) ctx.fillRect(-84 + i * 24, 6, 12, 50);
  ctx.beginPath(); ctx.moveTo(-80, -20); ctx.lineTo(-70, -110); ctx.lineTo(70, -110); ctx.lineTo(80, -20); ctx.closePath(); shape(ctx, '#EFE6CC', '#CDBF98', 2.5);
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(-60, -100, 20, 70);
  ctx.beginPath(); ctx.ellipse(4, -64, 40, 14, 0, 0, 6.283); shape(ctx, '#B88070', '#94604E', 1.5);
  ctx.restore(); }
function microtoom(ctx, x, y, s = 1, a = 1, t = 0, u = 0, draai = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -20, 340, 40, 10); shape(ctx, '#D8DEE6', '#8FA0B5', 2);
  roundRect(ctx, -40, -200, 170, 180, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2);
  const fase = draai ? (t * 1.4) % 1 : 0, by = -150 + Math.sin(fase * 6.283) * 26;
  roundRect(ctx, -20, by - 30, 50, 60, 6); shape(ctx, '#EFE6CC', '#CDBF98', 2); ctx.fillStyle = '#B88070'; ctx.fillRect(-20, by - 10, 10, 20);
  ctx.beginPath(); ctx.moveTo(-26, -136); ctx.lineTo(-90, -122); ctx.lineTo(-90, -108); ctx.lineTo(-26, -112); ctx.closePath(); shape(ctx, '#EEF2F6', '#7A8BA8', 2);
  ctx.save(); ctx.translate(150, -110); circ(ctx, 0, 0, 56, null, '#8FA0B5', 6); const an = fase * 6.283; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56); ctx.stroke(); circ(ctx, Math.cos(an) * 56, Math.sin(an) * 56, 9, '#2A3446'); ctx.restore();
  if (u > 0.01) { const n = Math.round(u * 6); for (let i = 0; i < n; i++) { const sx = -100 - i * 40, sy = -112 + i * 3; ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.05); roundRect(ctx, -18, -4, 36, 22, 3); shape(ctx, rgba('#F4EEDC', 0.85), '#CDBF98', 1.2); ctx.fillStyle = rgba('#B88070', 0.8); ctx.fillRect(-12, 2, 10, 10); ctx.restore(); } }
  ctx.restore(); }
function kleurBak(ctx, x, y, s = 1, a = 1, col = HE.paars, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); };
  pad(); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill();
  ctx.save(); pad(); ctx.closePath(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-100, -60); for (let i = 0; i <= 20; i++) ctx.lineTo(-100 + i * 10, -60 + Math.sin(t * 2 + i * 0.6) * 3); ctx.lineTo(100, 70); ctx.lineTo(-100, 70); ctx.closePath(); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore();
  pad(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
// glaasje (objectglas); k 0 = ongekleurd plakje → 1 = HE
function glaasje(ctx, x, y, s = 1, a = 1, k = 0, plakje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -45, 300, 90, 6); shape(ctx, rgba('#DCEBF4', 0.28), '#AFC0D0', 2.5); ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(-146, -41, 70, 82);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-136, -20, 50, 5); ctx.fillRect(-136, -6, 40, 5);
  if (plakje > 0.01) { ctx.save(); ctx.globalAlpha *= plakje; ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); shape(ctx, mixC('#E4E0E5', HE.roze, k), rgba('#B9B4BC', 0.6 * (1 - k)), 1.5);
    if (k > 0.01) { ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); ctx.clip(); for (let i = 0; i < 26; i++) circ(ctx, -20 + hash(i * 3) * 120, -20 + hash(i * 3 + 1) * 40, 3, rgba(HE.paars, 0.8 * k)); } ctx.restore(); }
  ctx.restore(); }
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// ---------- lichtmicroscoop (zijaanzicht, gebruiker links) ----------
// o: obj 0..3 (4×, 10×, 40×, 100×), grof/fijn = draaihoek van de schroeven, hl = 'oc'|'obj'|'grof'|'fijn'|'licht', licht 0..1, olie 0..1, glas 0..1
const OBJ = [{ v: '4×', L: 34, c: '#D8574A' }, { v: '10×', L: 44, c: '#E5C04A' }, { v: '40×', L: 56, c: '#5B8FD8' }, { v: '100×', L: 66, c: '#F2F2EE' }];
function lichtMicroscoop(ctx, x, y, s = 1, o = {}) { const { a = 1, obj = 0, grof = 0, fijn = 0, hl = null, licht = 1, olie = 0, glas = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446', HL = (k) => hl === k ? C.goud : rand, LW = (k) => hl === k ? 5 : 2.5;
  // voet met lichtbron
  roundRect(ctx, -150, -46, 300, 46, 14); shape(ctx, body, rand, 2.5);
  circ(ctx, 40, -46, 20, licht > 0.01 ? mixC('#C9CED6', '#FFF1B8', licht) : '#C9CED6', HL('licht'), LW('licht'));
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= 0.35 * licht; ctx.fillStyle = '#FFF1B8'; ctx.beginPath(); ctx.moveTo(26, -60); ctx.lineTo(54, -60); ctx.lineTo(48, -205); ctx.lineTo(32, -205); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // statief (arm)
  ctx.beginPath(); ctx.moveTo(-120, -46); ctx.lineTo(-60, -46); ctx.lineTo(-56, -300); ctx.quadraticCurveTo(-40, -400, 20, -420); ctx.lineTo(20, -380); ctx.quadraticCurveTo(-70, -360, -100, -300); ctx.closePath(); shape(ctx, body, rand, 2.5);
  // condensor en tafel
  roundRect(ctx, 18, -196, 44, 26, 5); shape(ctx, '#C9D0DA', rand, 2);
  roundRect(ctx, -70, -222, 230, 18, 5); shape(ctx, donker, rand, 2);
  if (glas > 0.01) { ctx.save(); ctx.globalAlpha *= glas; roundRect(ctx, -10, -232, 110, 10, 2); shape(ctx, rgba('#DCEBF4', 0.85), '#AFC0D0', 1.5); ctx.restore(); }
  // revolver met objectieven
  const ry = -330; ctx.beginPath(); ctx.moveTo(-6, ry - 26); ctx.lineTo(86, ry - 26); ctx.lineTo(96, ry + 6); ctx.lineTo(-16, ry + 6); ctx.closePath(); shape(ctx, body, HL('obj'), LW('obj'));
  const ob = OBJ[clamp(Math.round(obj), 0, 3)];
  [[-0.5, (obj + 3) % 4], [0.5, (obj + 1) % 4]].forEach(([rot, i]) => { const O = OBJ[Math.round(i) % 4]; ctx.save(); ctx.translate(40 + rot * 70, ry + 4); ctx.rotate(rot); roundRect(ctx, -11, 0, 22, O.L * 0.8, 4); shape(ctx, '#B8C2CE', rand, 1.5); ctx.fillStyle = O.c; ctx.fillRect(-11, O.L * 0.8 - 12, 22, 4); ctx.restore(); });
  roundRect(ctx, 26, ry + 4, 28, ob.L * 1.25, 5); shape(ctx, '#C9D0DA', HL('obj'), LW('obj')); ctx.fillStyle = ob.c; ctx.fillRect(26, ry + 4 + ob.L * 1.25 - 16, 28, 6);
  const objTip = ry + 4 + ob.L * 1.25;
  if (olie > 0.01) { ctx.save(); ctx.globalAlpha *= olie; ctx.beginPath(); ctx.ellipse(40, (objTip - 232) / 2 + 232 - 2 + (objTip - 232 < 0 ? 0 : 0), 12, Math.max(3, (-232 - objTip) / 2 + 3), 0, 0, 6.283); ctx.fillStyle = rgba(C.goud, 0.75); ctx.fill(); ctx.restore(); }
  // tubus en oculair
  roundRect(ctx, 14, -420, 52, 92, 8); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(30, -418); ctx.rotate(-0.55); roundRect(ctx, -18, -110, 36, 112, 6); shape(ctx, donker, HL('oc'), LW('oc')); roundRect(ctx, -22, -122, 44, 18, 5); shape(ctx, '#3A4458', HL('oc'), LW('oc')); ctx.restore();
  // grote en fijne schroef (gestapeld op het statief)
  const kx = -78, ky = -150;
  circ(ctx, kx, ky, 40, body, HL('grof'), LW('grof')); for (let i = 0; i < 12; i++) { const an = grof + i * 0.5236; ctx.strokeStyle = rgba(rand, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kx + Math.cos(an) * 30, ky + Math.sin(an) * 30); ctx.lineTo(kx + Math.cos(an) * 39, ky + Math.sin(an) * 39); ctx.stroke(); }
  circ(ctx, kx, ky, 19, '#C9D0DA', HL('fijn'), LW('fijn')); ctx.strokeStyle = donker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(fijn) * 15, ky + Math.sin(fijn) * 15); ctx.stroke();
  ctx.restore();
  const P = (px, py) => ({ x: x + px * s, y: y + py * s });
  return { oc: P(30 - 0.52 * 116, -418 - 0.85 * 116), obj: P(40, objTip - 20), objTip: P(40, objTip), grof: P(kx, ky), fijn: P(kx, ky), licht: P(40, -46), tafel: P(45, -222), objV: ob.v };
}

// ---------- kijkveld (rond beeld door het oculair) ----------
function kijkVeld(ctx, cx, cy, r, a, bgCol, inner) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = bgCol; ctx.fill(); ctx.save(); ctx.clip(); if (inner) inner(); ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r + 7, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 16; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); }
// kweekcellen in een helder veld; k = contrast 0..1, blur 0..1 (onscherp), zoom = schaal
function kweekCellen(ctx, cx, cy, R, o = {}) { const { k = 0, blur = 0, zoom = 1, n = 14, seed = 3, t = 0, hlRand = 0 } = o;
  const cel = (x, y, r, i) => { const wob = (an) => 1 + 0.06 * Math.sin(an * 3 + i) + 0.04 * Math.sin(an * 5 + i * 2);
      const pad = () => { ctx.beginPath(); for (let j = 0; j <= 36; j++) { const an = j / 36 * 6.283; const rr = r * wob(an); j ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); };
      pad(); ctx.fillStyle = `rgba(150,140,120,${0.03 + 0.22 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(90,86,76,${0.10 + 0.5 * k + 0.35 * hlRand})`; ctx.lineWidth = 2.2 + 1.5 * hlRand; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + r * 0.15, y - r * 0.1, r * 0.36, r * 0.32, i, 0, 6.283); ctx.fillStyle = `rgba(90,76,120,${0.02 + 0.35 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(80,70,100,${0.03 + 0.3 * k})`; ctx.lineWidth = 1.5; ctx.stroke();
      for (let m = 0; m < 6; m++) { const an = hash(i * 9 + m) * 6.283, d = r * (0.45 + 0.3 * hash(i * 9 + m + 3)); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * 0.05, `rgba(110,100,90,${0.02 + 0.25 * k})`); } };
  const copies = blur > 0.02 ? 5 : 1;
  for (let c = 0; c < copies; c++) { ctx.save(); if (copies > 1) { ctx.globalAlpha *= 0.32; const an = c / copies * 6.283; ctx.translate(Math.cos(an) * blur * 14, Math.sin(an) * blur * 14); }
    for (let i = 0; i < n; i++) { const an = hash(seed * 31 + i) * 6.283, d = Math.sqrt(hash(seed * 31 + i + 50)) * R * 0.85; const w = wander(i + seed, t, 3, 0.2);
      cel(cx + (Math.cos(an) * d) * zoom + w.x, cy + (Math.sin(an) * d) * zoom + w.y, R * 0.11 * zoom * (0.85 + 0.3 * hash(i + seed * 7)), i); }
    ctx.restore(); } }
// twee lichtpuntjes met hun wazige vlekje (buigingsschijfje); d = afstand in px, w = straal van het vlekje
function puntjes(ctx, cx, cy, d, w, col = '#2A3446', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const sx of [-1, 1]) for (let k = 6; k >= 1; k--) { circ(ctx, cx + sx * d / 2, cy, w * k / 6, rgba(col, 0.13)); } ctx.restore(); }

// ---------- fixeren: eiwitketens die aan elkaar vastgeknoopt raken ----------
function eiwitKetens(ctx, cx, cy, w, u, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rows = [-90, 0, 90], pt = (ri, j) => { const x = cx - w / 2 + j * w / 22, y = cy + rows[ri] + Math.sin(j * 0.8 + ri * 2 + t * 0.6 * (1 - u)) * 18; return [x, y]; };
  const links = [[0, 4], [1, 9], [0, 14], [1, 18], [0, 7], [1, 3], [0, 19], [1, 12], [0, 11], [1, 15]];
  links.forEach(([ri, j], m) => { const f = clamp(u * links.length - m, 0, 1); if (f <= 0) return; const [x1, y1] = pt(ri, j), [x2, y2] = pt(ri + 1, j); ctx.strokeStyle = rgba(C.goud, f); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f); ctx.stroke(); });
  rows.forEach((_, ri) => { ctx.strokeStyle = rgba(C.enzym, 0.9); ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 22; j++) { const [x, y] = pt(ri, j); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let j = 0; j <= 22; j++) { const [x, y] = pt(ri, j); circ(ctx, x, y, 11, ['#7A8BA8', '#8C7BBF', '#5BA4C9', '#C9A35C'][(j + ri) % 4], '#1A2740', 1.5); } });
  ctx.restore(); }
function staafBacterie(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -40 * s, -16 * s, 80 * s, 32 * s, 16 * s); shape(ctx, rgba('#7FC48F', 0.55), '#7FC48F', 3); ctx.strokeStyle = rgba('#7FC48F', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14 * s, -4 * s); ctx.quadraticCurveTo(0, 8 * s, 14 * s, -4 * s); ctx.stroke(); ctx.restore(); }
function knipEnzym(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.beginPath(); ctx.arc(0, 0, 34 * s, 0.5, 6.283 - 0.5); ctx.lineTo(8 * s, 0); ctx.closePath(); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 3); ctx.restore(); }

// ---------- dikte: weefselblok (zijaanzicht) met cellen van ± 25 µm; plakje van 4 µm (8 px per µm) ----------
function weefselBlok(ctx, x, y, w, h, o = {}) { const { a = 1, band = 0, dik = 0, pxum = 8 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba('#EFE6CC', 0.18), '#CDBF98', 2); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  const D = 25 * pxum; for (let r = 0; r < 4; r++) for (let c = -1; c < 6; c++) { const cxp = x + 40 + c * D + (r % 2) * D / 2, cyp = y + 20 + r * D * 0.86; circ(ctx, cxp, cyp, D / 2 - 4, rgba('#B88070', 0.55), '#94604E', 2); circ(ctx, cxp + 12, cyp - 8, D * 0.15, rgba(C.kern, 0.6)); }
  ctx.restore();
  const by = y + h * 0.42; if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; const bh = 4 * pxum; ctx.fillStyle = rgba(C.goud, 0.28); ctx.fillRect(x - 20, by, w + 40, bh); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x - 20, by, w + 40, bh); ctx.restore(); }
  if (dik > 0.01) { ctx.save(); ctx.globalAlpha *= dik; const bh = 60 * pxum * 0.5; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(x - 20, by - bh / 2, w + 40, bh); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); return { by }; }

// ---------- levercoupe (HE): balkjes levercellen rond een centrale ader, haarvaten ertussen ----------
function leverCoupe(ctx, cx, cy, r, t, o = {}) { const { a = 1, kern = 1, rest = 1, hlVat = 0, hlCel = 0, hlKern = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const u = r / 330;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = mixC(HE.glas, '#F7E3EA', rest); ctx.fill(); ctx.save(); ctx.clip();
  const vx = cx - 0.12 * r, vy = cy + 0.08 * r, vr = 0.15 * r;
  const cR = mixC(HE.grijs, '#E7A3BE', rest), cB = mixC(HE.grijsR, HE.rozeR, rest), cK = mixC('#D9D4DC', HE.paars, kern), cRBC = mixC(HE.grijsR, HE.bloed, rest);
  const geo = { vat: [vx, vy], cel: null, kern: null };
  const N = 16; for (let i = 0; i < N; i++) { const an0 = i / N * 6.283 + 0.1;
    for (let j = 0; j < 9; j++) { const d = vr + 26 * u + j * 46 * u; const an = an0 + Math.sin(j * 0.7 + i) * 0.05; const px = vx + Math.cos(an) * d, py = vy + Math.sin(an) * d;
      const cw = 40 * u * (0.9 + 0.2 * hash(i * 17 + j)), ch = (d * 6.283 / N) * 0.62; ctx.save(); ctx.translate(px, py); ctx.rotate(an);
      roundRect(ctx, -cw / 2, -ch / 2, cw, ch, 6 * u); shape(ctx, cR, cB, 1.4 * u);
      const kr = 7.5 * u; circ(ctx, 2 * u, (hash(i * 5 + j) - 0.5) * ch * 0.3, kr, cK); if (hash(i * 13 + j * 7) > 0.85) circ(ctx, -8 * u, ch * 0.22, kr * 0.9, cK);
      ctx.restore(); if (i === 3 && j === 4) geo.cel = [px, py]; if (i === 11 && j === 3) geo.kern = [px, py];
      if (j > 0 && hash(i * 7 + j * 3) > 0.62) { const an2 = an0 + 3.1416 / N; const qx = vx + Math.cos(an2) * (d - 20 * u), qy = vy + Math.sin(an2) * (d - 20 * u); ctx.beginPath(); ctx.ellipse(qx, qy, 6 * u, 3.4 * u, an2, 0, 6.283); ctx.fillStyle = cRBC; ctx.fill(); } } }
  circ(ctx, vx, vy, vr, mixC(HE.glas, '#FBEFF3', rest), cB, 3 * u); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(vx - vr * 0.4 + hash(i * 3) * vr * 0.8, vy - vr * 0.4 + hash(i * 3 + 1) * vr * 0.8, 9 * u, 5 * u, hash(i) * 3, 0, 6.283); ctx.fillStyle = cRBC; ctx.fill(); }
  if (hlVat > 0.01) circ(ctx, vx, vy, vr + 10 * u, null, rgba(C.goud, hlVat), 5 * u);
  if (hlCel > 0.01 && geo.cel) circ(ctx, geo.cel[0], geo.cel[1], 34 * u, null, rgba(C.goud, hlCel), 5 * u);
  if (hlKern > 0.01 && geo.kern) circ(ctx, geo.kern[0], geo.kern[1], 18 * u, null, rgba(C.goud, hlKern), 4 * u);
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r + 7, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 16; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return geo; }

// ---------- fluorescentie ----------
function antistof(ctx, x, y, s = 1, rot = 0, a = 1, label = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 0); ctx.moveTo(0, 0); ctx.lineTo(-34, -46); ctx.moveTo(0, 0); ctx.lineTo(34, -46); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-34, -46); ctx.lineTo(-24, -32); ctx.moveTo(34, -46); ctx.lineTo(24, -32); ctx.stroke();
  if (label > 0.01) { ctx.save(); ctx.globalAlpha *= label; ctx.translate(0, 74); ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 - 1.5708, rr = i % 2 ? 9 : 20; ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.closePath(); shape(ctx, FL.groen, '#E8FFE8', 2); ctx.restore(); }
  ctx.restore(); }
// stukje celmembraan (boog) met eiwitten die als knobbel naar buiten steken
function membraanStuk(ctx, cx, cy, R, a0, a1, eiw, a = 1, doel = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.er; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke(); ctx.strokeStyle = C.oker; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R - 11, a0, a1); ctx.stroke(); ctx.strokeStyle = C.er; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R - 22, a0, a1); ctx.stroke();
  eiw.forEach(an => { ctx.save(); ctx.translate(cx + Math.cos(an) * (R - 11), cy + Math.sin(an) * (R - 11)); ctx.rotate(an + 1.5708);
    if (doel != null && Math.abs(an - doel) < 0.01) { ctx.beginPath(); ctx.moveTo(-22, 18); ctx.lineTo(-22, -40); ctx.lineTo(-8, -52); ctx.lineTo(0, -38); ctx.lineTo(8, -52); ctx.lineTo(22, -40); ctx.lineTo(22, 18); ctx.closePath(); shape(ctx, C.teal, lighten(C.teal, 0.35), 2.5); }
    else { ctx.beginPath(); ctx.arc(0, -30, 18, 0, 6.283); shape(ctx, '#8C7BBF', '#B3A6DA', 2); roundRect(ctx, -10, -20, 20, 38, 6); shape(ctx, '#8C7BBF', '#B3A6DA', 2); }
    ctx.restore(); });
  ctx.restore(); }
// donker beeld: cellen met een oplichtende rand (eiwit in het membraan)
function fluorVeld(ctx, cx, cy, R, gl, t) { for (let i = 0; i < 9; i++) { const an = hash(i * 7 + 2) * 6.283, d = Math.sqrt(hash(i * 7 + 3)) * R * 0.8; const x = cx + Math.cos(an) * d, y = cy + Math.sin(an) * d, r = R * 0.15 * (0.85 + 0.3 * hash(i));
    circ(ctx, x, y, r, rgba('#2A3446', 0.6)); for (let k = 3; k >= 1; k--) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = rgba(FL.groen, gl * (k === 1 ? 0.95 : 0.18)); ctx.lineWidth = k === 1 ? 4 : 4 + k * 5; ctx.stroke(); } } }

// ---------- elektronenmicroscoop ----------
function emKolom(ctx, x, y, s = 1, o = {}) { const { a = 1, bundel = 0, vac = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -60, 340, 60, 10); shape(ctx, '#C9D0DA', '#8FA0B5', 2); // tafel
  roundRect(ctx, -62, -620, 124, 560, 18); shape(ctx, '#DDE3EA', '#8FA0B5', 2.5);
  roundRect(ctx, -44, -680, 88, 70, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2); // elektronenbron
  [-520, -420, -300, -200].forEach(yy => { roundRect(ctx, -80, yy, 160, 40, 8); shape(ctx, '#B87333', '#8A5428', 2); }); // magnetische lenzen
  roundRect(ctx, -120, -150, 240, 70, 10); shape(ctx, '#2A3446', '#8FA0B5', 2); // scherm/camera
  if (bundel > 0.01) { ctx.save(); ctx.globalAlpha *= bundel; ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(-6, -610); ctx.lineTo(6, -610); ctx.lineTo(18, -470); ctx.lineTo(3, -350); ctx.lineTo(26, -160); ctx.lineTo(-26, -160); ctx.lineTo(-3, -350); ctx.lineTo(-18, -470); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 8; i++) { const f = ((t * 0.9 + i / 8) % 1); const yy = -610 + f * 450; circ(ctx, Math.sin(i * 2.1) * 6, yy, 4, C.teal); } ctx.restore(); }
  roundRect(ctx, 62, -380, 120, 22, 6); shape(ctx, '#8FA0B5', null); roundRect(ctx, 170, -420, 90, 100, 12); shape(ctx, '#5A6478', '#8FA0B5', 2); // vacuümpomp
  if (vac > 0.01) { ctx.save(); ctx.globalAlpha *= vac; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, -70, -630, 140, 500, 20); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// zwart-wit EM-beeld: ruw ER met ribosomen, mitochondrion met cristae, losse ribosomen
function emBeeld(ctx, cx, cy, R, o = {}) { const { hlRibo = 0, hlMito = 0, er = 1 } = o;
  for (let i = 0; i < 160; i++) { const x = cx + (hash(i * 3) - 0.5) * 2 * R, y = cy + (hash(i * 3 + 1) - 0.5) * 2 * R; circ(ctx, x, y, 2 + 3 * hash(i * 3 + 2), rgba('#6A6A6A', 0.12)); }
  // ruw ER
  for (let k = 0; k < 4; k++) { const y0 = cy - R * 0.55 + k * 40; ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 4; for (const dy of [0, 14]) { ctx.beginPath(); for (let j = 0; j <= 30; j++) { const x = cx - R * 0.9 + j * R * 0.05, y = y0 + dy + Math.sin(j * 0.35 + k) * 10; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    for (let j = 0; j <= 30; j += 1) { const x = cx - R * 0.9 + j * R * 0.05, y = y0 + Math.sin(j * 0.35 + k) * 10; circ(ctx, x, y - 7, 4, '#1E1E1E'); circ(ctx, x + R * 0.025, y + 21 + Math.sin((j + 0.5) * 0.35 + k) * 0, 4, '#1E1E1E'); } }
  if (hlRibo > 0.01) { ctx.save(); ctx.globalAlpha *= hlRibo; roundRect(ctx, cx - R * 0.92, cy - R * 0.62, R * 0.62, 58, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  // mitochondrion
  const mx = cx + R * 0.15, my = cy + R * 0.35, ml = R * 0.55, mh = R * 0.22; ctx.beginPath(); ctx.ellipse(mx, my, ml, mh, -0.1, 0, 6.283); shape(ctx, '#BDBDBD', '#2A2A2A', 5); ctx.beginPath(); ctx.ellipse(mx, my, ml - 10, mh - 10, -0.1, 0, 6.283); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(mx, my, ml - 10, mh - 10, -0.1, 0, 6.283); ctx.clip(); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 4; for (let i = -6; i <= 6; i++) { const x = mx + i * ml * 0.14; const up = i % 2 === 0; ctx.beginPath(); ctx.moveTo(x, up ? my - mh : my + mh); ctx.quadraticCurveTo(x + 8, my, x, up ? my + mh * 0.25 : my - mh * 0.25); ctx.stroke(); } ctx.restore();
  if (hlMito > 0.01) { ctx.save(); ctx.globalAlpha *= hlMito; ctx.beginPath(); ctx.ellipse(mx, my, ml + 18, mh + 18, -0.1, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 40; i++) { const x = cx + (hash(i * 5 + 90) - 0.5) * 1.8 * R, y = cy + (hash(i * 5 + 91) - 0.1) * 0.5 * R - R * 0.05; if (Math.abs(y - my) < mh + 10 && Math.abs(x - mx) < ml + 10) continue; circ(ctx, x, y, 4, '#2A2A2A'); }
  return { mito: [mx, my, ml, mh] }; }
// levende cel met groen oplichtende mitochondriën die bewegen (eigen label)
function levendeCel(ctx, cx, cy, r, t, gl = 1) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3446', 0.7); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, cx + r * 0.15, cy - r * 0.1, r * 0.3, rgba('#3A4458', 0.9));
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 8, 0, 6.283); ctx.clip();
  for (let i = 0; i < 14; i++) { const an = hash(i * 4 + 1) * 6.283, d = r * (0.45 + 0.4 * hash(i * 4 + 2)); const w = wander(i, t, r * 0.08, 0.5); const x = cx + Math.cos(an) * d + w.x, y = cy + Math.sin(an) * d + w.y, rot = an + 1.2 + Math.sin(t * 0.7 + i) * 0.4, L = r * 0.16;
    for (let k = 2; k >= 1; k--) { ctx.strokeStyle = rgba(FL.groen, gl * (k === 1 ? 0.95 : 0.2)); ctx.lineWidth = k === 1 ? 8 : 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - Math.cos(rot) * L, y - Math.sin(rot) * L); ctx.quadraticCurveTo(x + Math.sin(rot) * 8, y - Math.cos(rot) * 8, x + Math.cos(rot) * L, y + Math.sin(rot) * L); ctx.stroke(); } }
  ctx.restore(); }

// ---------- meten: liniaal in het oculair over een objectmicrometer (pxDiv px per streepje; 100 µm = 40 streepjes) ----------
function oculairSchaal(ctx, cx, cy, o = {}) { const { oc = 1, obj = 0, cel = 0, hlCel = 0, pxDiv = 15 } = o; const x0 = cx - 20 * pxDiv;
  if (obj > 0.01) { ctx.save(); ctx.globalAlpha *= obj; const yo = cy + 70, pxUm = 40 * pxDiv / 100; ctx.strokeStyle = '#3A3A44'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yo); ctx.lineTo(x0 + 100 * pxUm, yo); ctx.stroke();
    for (let u = 0; u <= 100; u += 10) { const xx = x0 + u * pxUm, L = u % 50 === 0 ? 46 : 28; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, yo); ctx.lineTo(xx, yo + L); ctx.stroke(); if (u % 50 === 0) text(ctx, u + ' µm', xx, yo + 72, fTekst(26, 700), '#3A3A44', 'center'); } ctx.restore(); }
  if (cel > 0.01) { ctx.save(); ctx.globalAlpha *= cel; const r = 4 * pxDiv; const ccx = x0 + 6 * pxDiv + r; kweekCelLos(ctx, ccx, cy - 70, r, 0.75); if (hlCel > 0.01) { ctx.globalAlpha *= hlCel; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; [ccx - r, ccx + r].forEach(xx => { ctx.beginPath(); ctx.moveTo(xx, cy - 70 - r - 10); ctx.lineTo(xx, cy + 4); ctx.stroke(); }); } ctx.restore(); }
  if (oc > 0.01) { ctx.save(); ctx.globalAlpha *= oc; ctx.strokeStyle = '#121A26'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x0 + 40 * pxDiv, cy); ctx.stroke();
    for (let i = 0; i <= 40; i++) { const xx = x0 + i * pxDiv, L = i % 10 === 0 ? 34 : i % 5 === 0 ? 24 : 14; ctx.beginPath(); ctx.moveTo(xx, cy); ctx.lineTo(xx, cy - L); ctx.stroke(); if (i % 10 === 0) text(ctx, String(i), xx, cy - 42, fTekst(24, 700), '#121A26', 'center'); } ctx.restore(); }
  return { x0 }; }
function kweekCelLos(ctx, x, y, r, k) { ctx.beginPath(); for (let j = 0; j <= 36; j++) { const an = j / 36 * 6.283, rr = r * (1 + 0.05 * Math.sin(an * 3)); j ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fillStyle = `rgba(150,140,120,${0.25 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(90,86,76,${0.7 * k})`; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + r * 0.15, y - r * 0.1, r * 0.36, r * 0.32, 0.3, 0, 6.283); ctx.fillStyle = `rgba(90,76,120,${0.4 * k})`; ctx.fill(); }

// ---------- tellen: telkamer ----------
function telkamerZij(ctx, x, y, w, o = {}) { const { a = 1, vloei = 0, maat = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 60, 6); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2.5); // objectglas
  roundRect(ctx, x + 40, y - 30, 110, 30, 4); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2); roundRect(ctx, x + w - 150, y - 30, 110, 30, 4); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2); // steunranden
  roundRect(ctx, x + 180, y - 14, w - 360, 14, 3); shape(ctx, rgba('#DCEBF4', 0.45), '#AFC0D0', 2); // telplatform met raster
  for (let i = 0; i < 12; i++) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 200 + i * (w - 400) / 11, y - 14, 2, 6); }
  if (vloei > 0.01) { ctx.save(); ctx.globalAlpha *= vloei; ctx.fillStyle = rgba(C.teal, 0.45); ctx.fillRect(x + 160, y - 44, w - 320, 30); for (let i = 0; i < 14; i++) circ(ctx, x + 190 + hash(i) * (w - 380), y - 30 + (hash(i + 9) - 0.5) * 16, 4, rgba('#F2F2EE', 0.8)); ctx.restore(); }
  roundRect(ctx, x + 20, y - 46, w - 40, 14, 3); shape(ctx, rgba('#E8F4FA', 0.5), '#C9D6E0', 2); // dekglas
  if (maat > 0.01) { ctx.save(); ctx.globalAlpha *= maat; const mx = x + w / 2; pijl(ctx, mx, y - 22, mx, y - 32, C.goud, 1, 3, 10); pijl(ctx, mx, y - 22, mx, y - 12, C.goud, 1, 3, 10); ctx.restore(); }
  ctx.restore(); }
// raster van 3 × 3 grote vierkanten (elk 1 × 1 mm), elk in 4 × 4 vakjes; één vierkant gemarkeerd, met n cellen (0..50)
function telRaster(ctx, cx, cy, S, o = {}) { const { hl = 0, n = 0, extra = 0, t = 0 } = o; const x0 = cx - 1.5 * S, y0 = cy - 1.5 * S;
  ctx.strokeStyle = '#4A4A55'; ctx.lineWidth = 1.2; for (let i = 0; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * S / 4, y0); ctx.lineTo(x0 + i * S / 4, y0 + 3 * S); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x0, y0 + i * S / 4); ctx.lineTo(x0 + 3 * S, y0 + i * S / 4); ctx.stroke(); }
  ctx.lineWidth = 4; for (let i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * S, y0); ctx.lineTo(x0 + i * S, y0 + 3 * S); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x0, y0 + i * S); ctx.lineTo(x0 + 3 * S, y0 + i * S); ctx.stroke(); }
  const vak = (gx, gy, cnt, seed) => { for (let i = 0; i < cnt; i++) { const px = x0 + gx * S + 8 + hash(seed + i * 2) * (S - 16), py = y0 + gy * S + 8 + hash(seed + i * 2 + 1) * (S - 16); circ(ctx, px, py, S * 0.025 + 3, rgba('#6A6050', 0.35), '#5A564C', 1.5); } };
  for (let gx = 0; gx < 3; gx++) for (let gy = 0; gy < 3; gy++) { const mid = gx === 1 && gy === 1; vak(gx, gy, mid ? 0 : Math.round(40 + 20 * hash(gx * 3 + gy)), 100 + gx * 37 + gy * 11); }
  const nn = Math.round(clamp(n, 0, 50)); for (let i = 0; i < 50; i++) { const px = x0 + S + 8 + hash(7 + i * 2) * (S - 16), py = y0 + S + 8 + hash(8 + i * 2) * (S - 16); circ(ctx, px, py, S * 0.025 + 3, i < nn ? rgba(C.goud, 0.85) : rgba('#6A6050', 0.35), i < nn ? '#8A6A1A' : '#5A564C', 1.5); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.strokeRect(x0 + S, y0 + S, S, S); ctx.restore(); }
  if (extra > 0.01) { ctx.save(); ctx.globalAlpha *= extra; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; [[0, 0], [2, 0], [0, 2], [2, 2]].forEach(([gx, gy]) => ctx.strokeRect(x0 + gx * S + 4, y0 + gy * S + 4, S - 8, S - 8)); ctx.restore(); }
  return { x0, y0 }; }

// ---------- overig ----------
function kweekFles(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-70, -90); ctx.lineTo(30, -90); ctx.lineTo(70, -120); ctx.lineTo(90, -110); ctx.lineTo(60, -70); ctx.lineTo(60, 0); ctx.closePath(); shape(ctx, rgba('#DCEBF4', 0.2), '#AFC0D0', 3);
  ctx.fillStyle = rgba('#E89AA8', 0.6); ctx.fillRect(-66, -30, 122, 28); roundRect(ctx, 80, -134, 30, 26, 5); ctx.save(); ctx.translate(95, -121); ctx.rotate(-0.6); roundRect(ctx, -16, -14, 32, 26, 5); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.restore(); ctx.restore(); }
function pipet(ctx, x, y, s = 1, a = 1, drup = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-10, -120); ctx.lineTo(10, -120); ctx.lineTo(5, 0); ctx.closePath(); shape(ctx, rgba('#DCEBF4', 0.35), '#AFC0D0', 2); roundRect(ctx, -16, -170, 32, 54, 12); shape(ctx, '#E07A5F', '#B85E46', 2);
  if (drup > 0.01) { ctx.beginPath(); ctx.arc(0, 8 + drup * 30, 8, 0, 6.283); ctx.fillStyle = rgba('#E89AA8', 0.8); ctx.fill(); } ctx.restore(); }
function kaartje(ctx, x, y, w, h, titel, sub, col, a = 1, icoon) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(col, 0.12), col, 2.5);
  if (icoon) icoon(x, y - h * 0.14); text(ctx, titel, x, y + h * 0.3, fTekst(32, 800), C.text, 'center'); if (sub) text(ctx, sub, x, y + h * 0.3 + 38, fTekst(24, 600), C.text2, 'center'); ctx.restore(); }
function ziekenhuisje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -120, 180, 120, 6); shape(ctx, '#DCE6EE', '#9AA3B2', 2); ctx.fillStyle = '#7FA3C9'; for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) ctx.fillRect(-70 + i * 50, -100 + j * 40, 30, 24); ctx.fillStyle = C.koraal; ctx.fillRect(-10, -160, 20, 56); ctx.fillRect(-28, -142, 56, 20); ctx.restore(); }
