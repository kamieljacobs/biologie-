// Wat word jij? · Forensisch onderzoek · film 1 Sporen op de plaats delict — eigen tekeningen (25 okt 2026)
// Beeldgrenzen (reeksbrief): geen lichaam, geen wond, geen geweld; bloed alleen als nette druppels/spatten op vloer en muur.
// Schaal in de gangscènes: persoon 430 px ≈ 1,80 m → ± 240 px per meter (mes ± 25 cm ≈ 60 px, vlek ± 15 cm ≈ 40 px).

const KL_BLOED = '#7E3A2E';      // opgedroogd bloed: roodbruin, koraal rand
const KL_LUMI = '#6FA8FF';       // luminol: blauw licht (± 425 nanometer)
const KL_ROZE = '#E58AB8';       // kleurtest positief (fenolftaleïne)
const KL_MUUR = '#22324E', KL_VLOER = '#2C3B57', KL_PLINT = '#3A4A68';
const FLOOR = 860;               // voetlijn personen in de gang

function fo1Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fo1Rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------- de gang: muur, plint, vloer, keukendeur links, voordeur met afzetlint rechts ----------
function gang(ctx, o = {}) { const { a = 1, lint = 1, keuken = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = KL_MUUR; ctx.fillRect(0, 120, W, 660);
  ctx.fillStyle = KL_VLOER; ctx.fillRect(0, 780, W, 100);
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(i * 240 - 40, 880); ctx.lineTo(i * 240 + 30, 780); ctx.stroke(); }
  ctx.fillStyle = KL_PLINT; ctx.fillRect(0, 764, W, 16);
  // keukendeur (open, donker) links
  if (keuken > 0.01) { roundRect(ctx, 150, 330, 190, 450, 6); shape(ctx, '#151F33', rgba(C.line, 0.5), 2);
    ctx.fillStyle = rgba('#3A4A68', 0.8); ctx.fillRect(150, 330, 18, 450); }
  // voordeur rechts met afzetlint
  roundRect(ctx, 1580, 300, 200, 480, 6); shape(ctx, '#3B4C6C', rgba(C.line, 0.6), 2);
  roundRect(ctx, 1610, 340, 140, 170, 4); shape(ctx, '#2F3F5E', rgba(C.line, 0.35), 1.5);
  circ(ctx, 1600, 560, 9, '#C9CED6');
  if (lint > 0.01) { ctx.save(); ctx.globalAlpha *= lint; for (const [y1, y2] of [[420, 520], [560, 470]]) {
      ctx.save(); ctx.translate(1570, y1); ctx.rotate(Math.atan2(y2 - y1, 220)); const L = Math.hypot(220, y2 - y1);
      ctx.fillStyle = '#E6C64A'; ctx.fillRect(0, -16, L, 32); ctx.fillStyle = '#1A1A1A';
      for (let k = 0; k < L; k += 44) { ctx.beginPath(); ctx.moveTo(k, -16); ctx.lineTo(k + 18, -16); ctx.lineTo(k + 2, 16); ctx.lineTo(k - 16, 16); ctx.closePath(); ctx.fill(); }
      ctx.restore(); } ctx.restore(); }
  ctx.restore(); }

// geel nummerbordje (tentje) op de vloer
function nummerbordje(ctx, x, y, n, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - 26, y); ctx.lineTo(x - 18, y - 52); ctx.lineTo(x + 18, y - 52); ctx.lineTo(x + 26, y); ctx.closePath(); shape(ctx, '#E6C64A', hl > 0.5 ? C.goud : '#B89A2E', hl > 0.5 ? 3 : 1.5);
  text(ctx, String(n), x, y - 14, fTekst(30, 800), '#1A1A1A', 'center'); ctx.restore(); }

// opgedroogde vlek op de vloer (plat, van schuin boven)
function vloerVlek(ctx, x, y, rx, a = 1, o = {}) { if (a <= 0.01) return; const { col = KL_BLOED, seed = 3 } = o; ctx.save(); ctx.globalAlpha *= a;
  const r = fo1Rng(seed); ctx.beginPath(); for (let k = 0; k <= 24; k++) { const u = k / 24 * 6.283, rr = 1 + 0.12 * Math.sin(u * 3 + seed) + 0.06 * Math.sin(u * 7);
      const px = x + Math.cos(u) * rx * rr, py = y + Math.sin(u) * rx * 0.36 * rr; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, col, rgba(C.koraal, 0.7), 1.5);
  for (let i = 0; i < 4; i++) { const an = r() * 6.283; circ(ctx, x + Math.cos(an) * rx * 1.35, y + Math.sin(an) * rx * 0.5, 3 + r() * 3, col); }
  ctx.restore(); }

// mes plat op de vloer (± 25 cm)
function mes(ctx, x, y, s = 1, rot = -0.12, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -60, -7, 50, 14, 6); shape(ctx, '#3A2A22', '#5A443A', 1.5);
  for (const k of [-48, -24]) circ(ctx, k, 0, 2.5, '#C9CED6');
  ctx.beginPath(); ctx.moveTo(-10, -8); ctx.lineTo(70, -5); ctx.quadraticCurveTo(84, -2, 88, 2); ctx.lineTo(-10, 7); ctx.closePath(); shape(ctx, '#C9CED6', '#EEF2F6', 1.5);
  ctx.restore(); }

// spatjes op een muur: rond en ovaal met staartje (staart wijst de vliegrichting op)
function spat(ctx, x, y, b, l, an, a = 1, o = {}) { if (a <= 0.01) return; const { staart = 1, col = KL_BLOED, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (l > b * 1.08 && staart > 0) { ctx.beginPath(); ctx.moveTo(l * 0.42, -b * 0.22); ctx.quadraticCurveTo(l * 0.9, -b * 0.06, l * (0.95 + 0.25 * staart), 0); ctx.quadraticCurveTo(l * 0.9, b * 0.06, l * 0.42, b * 0.22); ctx.closePath(); ctx.fillStyle = typeof staart === 'string' ? staart : col; ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 0, l / 2, b / 2, 0, 0, 6.283); shape(ctx, col, hl > 0.5 ? C.goud : rgba(C.koraal, 0.75), hl > 0.5 ? 3 : 1.5);
  ctx.restore(); }

// ---------- lab- en veldspullen ----------
function wattenstaafje(ctx, x, y, L, rot, o = {}) { const { a = 1, tip = '#F2EEE4', nat = 0, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(L + 14, 0, 26, 15, 0, 0, 6.283); shape(ctx, tip, rand || lighten(tip, 0.3), rand ? 3 : 1.5);
  if (nat > 0.01) { ctx.globalAlpha *= nat; circ(ctx, L + 18, 26, 6, rgba(C.teal, 0.8)); circ(ctx, L + 4, 40, 4, rgba(C.teal, 0.6)); }
  ctx.restore(); }
function druppelflesje(ctx, x, y, s, vloeistof, a = 1, o = {}) { if (a <= 0.01) return; const { drup = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -34, -60, 68, 110, 14); shape(ctx, rgba('#AFC0D0', 0.18), '#AFC0D0', 2);
  roundRect(ctx, -30, -10, 60, 56, 10); ctx.fillStyle = vloeistof; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-14, -60); ctx.lineTo(-6, -98); ctx.lineTo(6, -98); ctx.lineTo(14, -60); ctx.closePath(); shape(ctx, '#C9CED6', '#EEF2F6', 1.5);
  if (drup > 0.01 && drup < 1) { ctx.beginPath(); ctx.ellipse(0, -100 - 60 * (1 - drup) + 0, 7, 10, 0, 0, 6.283); } // (druppel valt naar beneden bij omgekeerd flesje: zie fo1Druppel)
  ctx.restore(); }
function fo1Druppel(ctx, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.quadraticCurveTo(x + 12, y, x, y + 10); ctx.quadraticCurveTo(x - 12, y, x, y - 18); shape(ctx, col, rgba('#FFFFFF', 0.5), 1.5); ctx.restore(); }
function camera(ctx, x, y, s, a = 1, flits = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -44, 140, 88, 12); shape(ctx, '#2A3446', '#8FA0B5', 2); roundRect(ctx, -40, -60, 50, 18, 4); shape(ctx, '#2A3446', '#8FA0B5', 1.5);
  circ(ctx, 6, 2, 30, '#121A26', '#8FA0B5', 3); circ(ctx, 6, 2, 16, '#3A4A68'); roundRect(ctx, 34, -36, 26, 14, 3); shape(ctx, flits > 0.5 ? '#FFFFFF' : '#C9CED6', null);
  if (flits > 0.01 && flits < 0.99) { ctx.globalAlpha *= Math.sin(flits * Math.PI); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4; for (let k = 0; k < 5; k++) { const an = -1.2 + k * 0.35; ctx.beginPath(); ctx.moveTo(47 + Math.cos(an) * 26, -29 + Math.sin(an) * 26); ctx.lineTo(47 + Math.cos(an) * 50, -29 + Math.sin(an) * 50); ctx.stroke(); } }
  ctx.restore(); }
// liniaal (schaal: px per millimeter), met millimeterstreepjes
function liniaal(ctx, x, y, mm, pxmm, a = 1, o = {}) { if (a <= 0.01) return; const { rot = 0, labels = true } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -10, -8, mm * pxmm + 20, 56, 6); shape(ctx, '#E8E2C8', '#B8B09A', 1.5);
  ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 2; for (let k = 0; k <= mm; k++) { const h = k % 10 === 0 ? 26 : k % 5 === 0 ? 18 : 10; ctx.beginPath(); ctx.moveTo(k * pxmm, -8); ctx.lineTo(k * pxmm, -8 + h); ctx.stroke(); }
  if (labels) for (let k = 0; k <= mm; k += 10) text(ctx, String(k / 10), k * pxmm, 40, fTekst(18, 700), '#3A3A3A', 'center');
  ctx.restore(); }
function klokjeFo(ctx, x, y, r, frac, a = 1) { klokje(ctx, x, y, r, frac, a); }
function sproeier(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -10, 52, 90, 12); shape(ctx, rgba(KL_LUMI, 0.25), '#AFC0D0', 2);
  roundRect(ctx, -12, -36, 24, 28, 4); shape(ctx, '#3A4A68', '#8FA0B5', 1.5); roundRect(ctx, -12, -46, 52, 14, 4); shape(ctx, '#3A4A68', '#8FA0B5', 1.5);
  ctx.restore(); }
// voetafdruk (schoenzool van boven, plat op de vloer)
function voetafdruk(ctx, x, y, s, rot, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s * 0.42);
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(10, 0, 22, 13, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(-20, 0, 12, 10, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function lichtVlek(ctx, x, y, rx, ry, k, a = 1) { if (a <= 0.01 || k <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * k;
  for (const [f, al] of [[1.9, 0.12], [1.45, 0.22], [1, 0.75]]) { ctx.beginPath(); ctx.ellipse(x, y, rx * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba(KL_LUMI, al); ctx.fill(); } ctx.restore(); }

// ---------- micro: hemoglobine met vier heemgroepen ----------
// Recept: tetrameer van twee α- en twee β-ketens (elk een opgevouwen keten met helices), ± 5 nanometer; in elke keten een
// plat heem (porfyrinering) met één ijzeratoom in het midden. Bron: Berg, Biochemistry h. 7; PMC9271945. Bekende fout: één Fe in het midden.
// o.heem 0..1 = heemgroepen oplichten, o.fe = ijzerlabels, o.kleur = [α, β] (mens: koraaltinten; hond: okertinten), o.reactie 0..1.
function heemRing(ctx, x, y, r, o = {}) { const { a = 1, hl = 0, fe = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + Math.PI / 4; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; ctx.lineTo(px, py); }
  ctx.closePath(); shape(ctx, rgba('#8A3A30', 0.9), hl > 0.5 ? C.goud : '#D88E7A', hl > 0.5 ? 3 : 2);
  for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + Math.PI / 4; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r, y + Math.sin(an) * r, r * 0.32, 0, 6.283); shape(ctx, '#A04A3A', '#D88E7A', 1.5); }
  if (fe > 0.01) { ctx.save(); ctx.globalAlpha *= fe; circ(ctx, x, y, r * 0.38, C.goud, lighten(C.goud, 0.3), 1.5); text(ctx, 'Fe', x, y + r * 0.14, fTekst(Math.max(14, r * 0.36), 800), '#1A1A1A', 'center'); ctx.restore(); }
  ctx.restore(); }
const HB_POS = [[-0.48, -0.42], [0.48, -0.42], [-0.48, 0.44], [0.48, 0.44]];
function hemoglobine(ctx, x, y, R, o = {}) { const { a = 1, heem = 1, fe = 1, kleur = ['#C46A5A', '#D9907E'], t = 0, hlHeem = 0 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a;
  const heemXY = [];
  HB_POS.forEach(([fx, fy], i) => { const cx = x + fx * R, cy = y + fy * R, col = kleur[i % 3 === 0 ? 0 : 1], rr = R * 0.56;
    // keten als gevouwen kluwen: omtrek + helixbochten
    const pts = []; for (let k = 0; k < 22; k++) { const u = k / 22 * 6.283; const r2 = rr * (1 + 0.1 * Math.sin(u * 4 + i * 1.7) + 0.06 * Math.sin(u * 7 + i)); pts.push([cx + Math.cos(u) * r2, cy + Math.sin(u) * r2 * 0.92]); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, rgba(col, 0.85), lighten(col, 0.3), 1.5);
    ctx.strokeStyle = rgba(lighten(col, 0.35), 0.7); ctx.lineWidth = 3; for (let h = 0; h < 3; h++) { const hx = cx - rr * 0.55 + h * rr * 0.32, hy = cy + (h % 2 ? rr * 0.35 : -rr * 0.35);
      ctx.beginPath(); for (let k = 0; k <= 16; k++) { const u = k / 16; ctx.lineTo(hx + u * rr * 0.28 + Math.sin(u * 12.6) * 5, hy + (u - 0.5) * rr * 0.5); } ctx.stroke(); }
    const hx = cx + (fx > 0 ? 1 : -1) * rr * 0.32, hy = cy + (fy > 0 ? 1 : -1) * rr * 0.18; heemXY.push([hx, hy]); });
  if (heem > 0.01) heemXY.forEach(([hx, hy]) => heemRing(ctx, hx, hy, R * 0.15, { a: heem, hl: hlHeem, fe }));
  ctx.restore(); return heemXY; }
// waterstofperoxide H₂O₂: twee O (teal) met elk een H (wit)
function h2o2(ctx, x, y, s, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-34, -14); ctx.lineTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(34, 14); ctx.stroke();
  circ(ctx, -14, 0, 15, C.teal, lighten(C.teal, 0.3), 1.5); circ(ctx, 14, 0, 15, C.teal, lighten(C.teal, 0.3), 1.5);
  circ(ctx, -34, -14, 9, '#E8ECF0', '#FFFFFF', 1.5); circ(ctx, 34, 14, 9, '#E8ECF0', '#FFFFFF', 1.5); ctx.restore(); }

// ---------- antistof (Y van vier ketens: twee lange, twee korte), bindt met de toppen ----------
function antistof(ctx, x, y, s, rot = 0, o = {}) { const { a = 1, col = '#AFC0D0', deeltje = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineCap = 'round'; const zw = lighten(col, -0.05);
  // zware ketens (lang): stam + armen
  ctx.strokeStyle = col; ctx.lineWidth = 7;
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 4, 40); ctx.lineTo(d * 4, 0); ctx.lineTo(d * 24, -26); ctx.stroke(); }
  // lichte ketens (kort) langs de buitenkant van de armen
  ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = 5; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 16, -4); ctx.lineTo(d * 34, -26); ctx.stroke(); }
  if (deeltje > 0.01) { ctx.globalAlpha *= deeltje; circ(ctx, 0, 52, 11, '#C0392B', '#E07A5F', 1.5); }
  ctx.restore(); }
// klein hemoglobine-bolletje voor op de strook (vereenvoudigd: vier lobben)
function hbKlein(ctx, x, y, r, a = 1, kleur = '#C46A5A') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; HB_POS.forEach(([fx, fy]) => circ(ctx, x + fx * r, y + fy * r, r * 0.6, rgba(kleur, 0.9), lighten(kleur, 0.3), 1.2)); ctx.restore(); }

// sneltest als schema: monsterkussen → kussen met gekleurde antistoffen → strook met T en C → zuigkussen
// o.mono 0..1 (antistoffen met deeltje), o.T 0..1, o.C 0..1, o.stroom 0..1 (vochtfront)
const STRK = { x0: 220, x1: 1700, y: 560, h: 90, xT: 1050, xC: 1330, xConj: 560 };
function strookSchema(ctx, o = {}) { const { a = 1, mono = 1, T = 0, Cl = 0, stroom = 0, t = 0, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const { x0, x1, y, h, xT, xC, xConj } = STRK;
  roundRect(ctx, x0, y - h / 2, x1 - x0, h, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  roundRect(ctx, x0, y - h / 2 - 8, 200, h + 16, 10); shape(ctx, '#E2DCCB', '#B8B0A0', 2);           // monsterkussen
  roundRect(ctx, xConj - 120, y - h / 2 - 4, 240, h + 8, 8); shape(ctx, '#EADFD8', '#B8B0A0', 2);    // kussen met gekleurde antistoffen
  roundRect(ctx, x1 - 200, y - h / 2 - 8, 200, h + 16, 10); shape(ctx, '#E2DCCB', '#B8B0A0', 2);     // zuigkussen
  if (stroom > 0.01) { const xf = lerp(x0, x1, stroom); ctx.fillStyle = rgba(C.teal, 0.18); ctx.fillRect(x0, y - h / 2, xf - x0, h); }
  // lijnen
  const lijn = (xx, k) => { ctx.fillStyle = rgba('#8A9AB0', 0.35); ctx.fillRect(xx - 7, y - h / 2, 14, h); if (k > 0.01) { ctx.fillStyle = rgba('#C0392B', 0.9 * k); ctx.fillRect(xx - 7, y - h / 2, 14, h); } };
  lijn(xT, T); lijn(xC, Cl);
  // gekleurde antistoffen in het kussen
  if (mono > 0.01) for (let i = 0; i < 6; i++) antistof(ctx, xConj - 90 + i * 36, y + 4 + (i % 2) * 6, 0.45, 0, { a: mono, deeltje: 1, col: '#8FA0C8' });
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels;
    text(ctx, 'T', xT, y - h / 2 - 20, fTekst(44, 800), C.text, 'center'); text(ctx, 'C', xC, y - h / 2 - 20, fTekst(44, 800), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }
// klein uitleesstrookje (venster met T en C), voor naast elkaar
function strookjeKlein(ctx, x, y, s, T, Cl, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -40, 340, 80, 16); shape(ctx, '#D9DFE7', hl > 0.5 ? C.goud : '#F4F7FA', hl > 0.5 ? 4 : 2);
  circ(ctx, -120, 0, 18, '#5E6878', '#C3CBD6', 2);
  roundRect(ctx, -70, -18, 200, 36, 8); ctx.fillStyle = '#F4F2EE'; ctx.fill(); ctx.strokeStyle = '#3E4858'; ctx.lineWidth = 2; ctx.stroke();
  const lijn = (xx, k) => { if (k > 0.01) { ctx.fillStyle = rgba('#C0392B', 0.92 * k); ctx.fillRect(xx - 5, -18, 10, 36); } };
  lijn(10, T); lijn(80, Cl);
  text(ctx, 'T', 10, -52, fTekst(26, 800), C.text, 'center'); text(ctx, 'C', 80, -52, fTekst(26, 800), C.text, 'center');
  ctx.restore(); }

// ---------- planten met peroxidase (voorproef kan ook hierop reageren) ----------
function mierikswortel(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-18, -60); ctx.quadraticCurveTo(-22, 20, -4, 90); ctx.quadraticCurveTo(0, 100, 4, 90); ctx.quadraticCurveTo(22, 20, 18, -60); ctx.closePath(); shape(ctx, '#D9CBA8', '#EDE2C6', 1.5);
  ctx.strokeStyle = rgba('#A8977A', 0.8); ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(-14 + k * 2, -30 + k * 22); ctx.lineTo(12 - k * 2, -26 + k * 22); ctx.stroke(); }
  ctx.fillStyle = C.chloro; for (const d of [-1, 0, 1]) { ctx.beginPath(); ctx.ellipse(d * 14, -96, 10, 40, d * 0.35, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
function aardappel(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 50, 0.2, 0, 6.283); shape(ctx, '#B8935C', '#D4B07A', 1.5);
  for (const [px, py] of [[-30, -12], [20, 18], [36, -20], [-6, 22]]) circ(ctx, px, py, 4, '#8C6A3A'); ctx.restore(); }

// ---------- hondenmand (de hond zelf is niet in beeld: ongedeerd, bij de buren) ----------
function hondenmand(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -10, 110, 34, 0, 0, 6.283); shape(ctx, '#8C5A3A', '#B08A5C', 2);
  ctx.beginPath(); ctx.ellipse(0, -18, 84, 20, 0, 0, 6.283); shape(ctx, '#C46A5A', '#D9907E', 1.5);
  ctx.beginPath(); ctx.ellipse(0, -18, 50, 10, 0, 0, 6.283); ctx.fillStyle = '#B05A4A'; ctx.fill(); ctx.restore(); }
function pootafdruk(ctx, x, y, s, rot, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s * 0.5);
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 6, 12, 10, 0, 0, 6.283); ctx.fill(); for (let k = 0; k < 4; k++) circ(ctx, -13 + k * 8.6, -10 - (k === 1 || k === 2 ? 4 : 0), 4.5, col); ctx.restore(); }

// ---------- aanrecht met glas ----------
function aanrecht(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4A68'; ctx.fillRect(x, y, w, 22); ctx.fillStyle = '#2A3A58'; ctx.fillRect(x + 10, y + 22, w - 20, 860 - y - 22 > 0 ? 860 - y - 22 : 0); ctx.restore(); }
function glas(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { hl = 0, vlek = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(-32, 0); ctx.lineTo(32, 0); ctx.lineTo(40, -150); ctx.closePath(); shape(ctx, rgba('#AFC0D0', 0.18), hl > 0.5 ? C.goud : '#AFC0D0', hl > 0.5 ? 4 : 2);
  ctx.beginPath(); ctx.moveTo(-35, -60); ctx.lineTo(-33, 0); ctx.lineTo(33, 0); ctx.lineTo(35, -60); ctx.closePath(); ctx.fillStyle = rgba(C.oker, 0.35); ctx.fill();
  if (vlek > 0.01) { ctx.globalAlpha *= vlek; ctx.beginPath(); ctx.ellipse(-30, -136, 12, 6, -0.2, 0, 6.283); ctx.strokeStyle = rgba('#E8ECF0', 0.8); ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore(); }

// ---------- zetmeel met blauwe kleurstof (Phadebas-idee) ----------
// zetmeelSpiraal (lib_bio) + blauwe kleurstofbolletjes aan de glucose; bij knippen komen ze los
function kleurstofZetmeel(ctx, x, y, n, r, o = {}) { const { a = 1, los = 0, t = 0, knip = 0 } = o; if (a <= 0.01) return;
  const pos = zetmeelSpiraal(ctx, x, y, n, r, { a, open: 0.7, los: los * 0.5, t, spreid: 1 });
  ctx.save(); ctx.globalAlpha *= a; (pos || []).forEach((p, i) => { if (i % 3 !== 1) return; const w = wander(i + 50, t, 6, 0.6);
    const px = p[0] + w.x * los + (i - n / 2) * 10 * los, py = p[1] - r * 1.4 - 120 * los * (0.6 + hash(i) * 0.8) + w.y * los;
    circ(ctx, px, py, r * 0.55, '#3E6FD8', '#8FB0F0', 1.5); }); ctx.restore(); }

// ---------- inslaghoek: druppel in zijaanzicht ----------
function druppelZij(ctx, x, y, r, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, KL_BLOED, rgba(C.koraal, 0.8), 1.5); ctx.restore(); }

// ---------- veiligstellen ----------
function handschoen(ctx, x, y, s, a = 1, o = {}) { const { col = '#5B8FD0', vlek = 0, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -34, -10, 68, 70, 14); shape(ctx, col, lighten(col, 0.3), 1.5);
  for (let k = 0; k < 4; k++) { roundRect(ctx, -32 + k * 17, -64 + (k === 1 || k === 2 ? -6 : 4), 14, 60, 7); shape(ctx, col, lighten(col, 0.3), 1.5); }
  roundRect(ctx, 26, -24, 14, 44, 7); ctx.save(); ctx.translate(36, 0); ctx.rotate(0.5); roundRect(ctx, -6, -30, 14, 40, 7); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.restore();
  if (vlek > 0.01) { ctx.globalAlpha *= vlek; circ(ctx, -8, -40, 9, KL_BLOED, rgba(C.koraal, 0.8), 1.5); circ(ctx, 10, -8, 6, KL_BLOED); }
  ctx.restore(); }
function zakPlastic(ctx, x, y, s, a = 1, o = {}) { const { schimmel = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -150, 220, 300, 18); shape(ctx, rgba('#C9D6E4', 0.16), '#C9D6E4', 2.5);
  ctx.fillStyle = rgba('#C9D6E4', 0.5); ctx.fillRect(-110, -132, 220, 10);
  wattenstaafje(ctx, -70, 40, 90, -0.4, { tip: '#B88A7A' });
  ctx.fillStyle = rgba('#E8F0F8', 0.55); for (let i = 0; i < 18; i++) circ(ctx, -90 + hash(i) * 180, -100 + hash(i + 7) * 220, 3 + hash(i + 3) * 4, rgba('#E8F0F8', 0.5));
  if (schimmel > 0.01) { ctx.globalAlpha *= schimmel; for (let i = 0; i < 9; i++) { const px = 2 + (hash(i + 20) - 0.5) * 90, py = -20 + (hash(i + 30) - 0.5) * 80; circ(ctx, px, py, 8 + hash(i) * 10, rgba('#7FA86E', 0.75)); circ(ctx, px, py, 4, rgba('#5F8A50', 0.9)); } }
  ctx.restore(); }
function zakPapier(ctx, x, y, s, a = 1, o = {}) { const { nr = '', zegel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-100, -140); ctx.lineTo(100, -140); ctx.lineTo(110, 150); ctx.lineTo(-110, 150); ctx.closePath(); shape(ctx, '#C9A87A', '#E0C89A', 2);
  ctx.strokeStyle = rgba('#8C6A3A', 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-100, -110); ctx.lineTo(100, -110); ctx.stroke();
  if (nr) { roundRect(ctx, -76, -60, 152, 80, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); text(ctx, nr, 0, -12, fTekst(26, 800), '#1A1A1A', 'center'); }
  if (zegel > 0.01) { ctx.save(); ctx.globalAlpha *= zegel; roundRect(ctx, -100, -128, 200, 30, 4); ctx.fillStyle = rgba(C.koraal, 0.9); ctx.fill(); text(ctx, 'ZEGEL', 0, -105, fMeta(20), '#FFFFFF', 'center'); ctx.restore(); }
  ctx.restore(); }
function staafjesDoosje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -40, -150, 80, 300, 10); shape(ctx, '#E2DCCB', '#F2EEE4', 2);
  for (let k = 0; k < 6; k++) circ(ctx, -14 + (k % 2) * 28, -110 + Math.floor(k / 2) * 30, 5, '#8C8070');
  ctx.restore(); }
function droogrek(ctx, x, y, s, a = 1, o = {}) { const { nat = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, 0, 180, 22, 6); shape(ctx, '#8FA0B5', '#AFC0D0', 1.5);
  for (const d of [-40, 0, 40]) { circ(ctx, d, 0, 9, '#3A4A68'); }
  wattenstaafje(ctx, 0, 0, 110, -Math.PI / 2, { tip: '#B88A7A', nat });
  ctx.restore(); }
function doosMes(ctx, x, y, s, a = 1, o = {}) { const { zegel = 0, nr = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -180, -60, 360, 120, 10); shape(ctx, '#B89568', '#D4B07A', 2);
  roundRect(ctx, -160, -40, 320, 80, 6); ctx.fillStyle = '#E8E2D4'; ctx.fill();
  mes(ctx, 0, 0, 1.5, 0); ctx.fillStyle = '#5A6478'; for (const k of [-70, 40]) { ctx.fillRect(k, -26, 10, 52); }
  if (nr) text(ctx, nr, 0, 98, fTekst(24, 700), C.text2, 'center');
  if (zegel > 0.01) { ctx.save(); ctx.globalAlpha *= zegel; ctx.fillStyle = rgba(C.koraal, 0.9); ctx.fillRect(-20, -66, 40, 132); text(ctx, 'ZEGEL', 0, 6, fMeta(16), '#FFFFFF', 'center'); ctx.restore(); }
  ctx.restore(); }
// formulier keten van bewaring: rijen met naam, tijd en handtekening
function formulier(ctx, x, y, rijen, a = 1, o = {}) { const { gat = -1, gatHl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 620, 120 + rijen.length * 84, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  text(ctx, 'KETEN VAN BEWARING · SPOOR 1', x + 30, y + 52, fMeta(22), '#3A3A3A', 'left');
  ['wie', 'wanneer', 'paraaf'].forEach((s2, i) => text(ctx, s2, x + 30 + i * 200, y + 98, fTekst(24, 700), '#5A5A5A', 'left'));
  rijen.forEach((r, i) => { const yy = y + 120 + i * 84; ctx.strokeStyle = '#C9C2B0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 20, yy); ctx.lineTo(x + 600, yy); ctx.stroke();
    if (i === gat) { if (gatHl > 0.01) { ctx.save(); ctx.globalAlpha *= gatHl; roundRect(ctx, x + 16, yy + 8, 588, 68, 8); shape(ctx, rgba(C.koraal, 0.18), C.koraal, 3); text(ctx, '? ontbreekt', x + 310, yy + 52, fTekst(28, 800), '#B0402A', 'center'); ctx.restore(); } return; }
    const k = r.a == null ? 1 : r.a; if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k;
    text(ctx, r.wie, x + 30, yy + 52, fTekst(26, 600), '#1A1A1A', 'left'); text(ctx, r.wanneer, x + 230, yy + 52, fTekst(26, 600), '#1A1A1A', 'left');
    ctx.strokeStyle = '#2A4A8A'; ctx.lineWidth = 3; ctx.beginPath(); for (let k2 = 0; k2 <= 20; k2++) { const u = k2 / 20; ctx.lineTo(x + 440 + u * 130 * k, yy + 44 + Math.sin(u * 14 + i) * 10 - u * 8); } ctx.stroke(); ctx.restore(); });
  ctx.restore(); }
// haar dat valt
function haar(ctx, x, y, L, rot, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#2A1E18'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-L / 2, 0); ctx.quadraticCurveTo(0, -L * 0.25, L / 2, 0); ctx.stroke(); ctx.restore(); }
// werkplek-icoon in afgerond vierkant (Schema-bibliotheek: plaatsen als één lijnicoon)
function plekIcoon(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 60, 120, 120, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'politie') { ctx.beginPath(); ctx.moveTo(x, y - 38); ctx.lineTo(x + 32, y - 24); ctx.lineTo(x + 26, y + 16); ctx.lineTo(x, y + 38); ctx.lineTo(x - 26, y + 16); ctx.lineTo(x - 32, y - 24); ctx.closePath(); ctx.stroke(); circ(ctx, x, y - 2, 10, null, '#C9CED6', 4); }
  if (soort === 'nfi') { ctx.beginPath(); ctx.rect(x - 34, y - 20, 68, 52); ctx.moveTo(x - 40, y - 20); ctx.lineTo(x, y - 42); ctx.lineTo(x + 40, y - 20); ctx.stroke(); for (const k of [-18, 0, 18]) { ctx.beginPath(); ctx.moveTo(x + k, y - 8); ctx.lineTo(x + k, y + 32); ctx.stroke(); } }
  if (soort === 'lab') { ctx.beginPath(); ctx.moveTo(x - 10, y - 38); ctx.lineTo(x - 10, y - 8); ctx.lineTo(x - 32, y + 32); ctx.lineTo(x + 32, y + 32); ctx.lineTo(x + 10, y - 8); ctx.lineTo(x + 10, y - 38); ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.7); ctx.beginPath(); ctx.moveTo(x - 22, y + 14); ctx.lineTo(x + 22, y + 14); ctx.lineTo(x + 30, y + 30); ctx.lineTo(x - 30, y + 30); ctx.fill(); }
  ctx.restore(); }
