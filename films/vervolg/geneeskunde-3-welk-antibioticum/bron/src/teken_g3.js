// Wat word jij? · Geneeskunde en Farmacie · Welk antibioticum? — eigen tekeningen (20 okt 2026)

const ECOLI = '#E07A5F';            // E. coli (blaasbacterie), overal dezelfde kleur
const WAND = '#C9A35C', WANDR = '#E8CF8E'; // bacteriële celwand
const AB = '#E0B64A';               // antibioticummolecuul
const AGAR = '#B8893E', GAZON = '#E9DDB8';

// antibioticummolecuul: zeshoekje met staartje
function abMol(ctx, x, y, s = 1, a = 1, rot = 0, col = AB) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; ctx.lineTo(Math.cos(an) * 9 * s, Math.sin(an) * 9 * s); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 2.2 * s);
  ctx.strokeStyle = col; ctx.lineWidth = 2.2 * s; ctx.beginPath(); ctx.moveTo(9 * s, 0); ctx.lineTo(18 * s, -6 * s); ctx.lineTo(26 * s, 0); ctx.stroke(); ctx.restore(); }

// capsulevorm (staafje met ronde uiteinden)
function capsule(ctx, x, y, w, h) { roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); }

// staafvormige bacterie, groot en schematisch: celwand (dikke band), celmembraan, cytoplasma, ribosomen, DNA-ring
// o: wand (0..1 nadruk), kapot (0..1 penicilline: gaten, uitstulpen, knappen), ribo (nadruk), riboBlok (0..1), dna (nadruk), dnaBlok (0..1), col (cytoplasma-tint), t
function bacterieGroot(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { kapot = 0, riboBlok = 0, dnaBlok = 0, wand = 0, ribo = 0, dna = 0, t = 0, col = '#33466A' } = o;
  ctx.save(); ctx.globalAlpha *= a * (kapot > 0.85 ? clamp(1 - (kapot - 0.85) / 0.15, 0, 1) : 1); ctx.translate(x, y);
  const k = h / 300, bol = clamp((kapot - 0.35) / 0.5, 0, 1); // uitstulping
  // celwand
  const ww = 22 * k; capsule(ctx, 0, 0, w, h); shape(ctx, rgba(WAND, 0.55 + 0.35 * wand), lighten(WAND, 0.2 + 0.3 * wand), 2 + 2 * wand);
  // gaten in de wand (penicilline)
  const gaten = [[-0.25, -1], [0.18, 1], [0.32, -1]];
  if (kapot > 0.05) gaten.forEach(([fx, side], i) => { const g = clamp(kapot * 2 - i * 0.25, 0, 1); if (g <= 0) return; ctx.save(); ctx.fillStyle = C.bgSchema; const gy = side < 0 ? -h / 2 - 3 : h / 2 - ww - 1; ctx.fillRect(fx * w - 26 * k * g, gy, 52 * k * g, ww + 4); ctx.restore(); });
  // binnenkant: membraan + cytoplasma
  capsule(ctx, 0, 0, w - 2 * ww, h - 2 * ww); shape(ctx, col, '#AFC0D0', 2);
  if (bol > 0.01) { gaten.forEach(([fx, side]) => { ctx.beginPath(); ctx.ellipse(fx * w, side * (h / 2 - ww * 0.4), 30 * k + 40 * k * bol, 14 * k + 46 * k * bol, 0, side > 0 ? 0 : Math.PI, side > 0 ? Math.PI : 2 * Math.PI); shape(ctx, col, '#AFC0D0', 2); }); }
  // rustige textuur
  ctx.save(); capsule(ctx, 0, 0, w - 2 * ww - 6, h - 2 * ww - 6); ctx.clip();
  for (let i = 0; i < 18; i++) { const px = (hash(i * 7 + 1) - 0.5) * (w - 80 * k), py = (hash(i * 7 + 3) - 0.5) * (h - 80 * k); circ(ctx, px, py, 1.6, rgba('#AFC0D0', 0.25)); }
  // DNA-ring: kronkelige gesloten lus
  ctx.strokeStyle = dnaBlok > 0.5 ? rgba(C.kernR, 0.55) : C.kernR; ctx.lineWidth = 3 + 2 * dna; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, r = 1 + 0.16 * Math.sin(an * 7 + 0.6) + 0.08 * Math.sin(an * 13); const px = w * 0.17 * r * Math.cos(an), py = h * 0.22 * r * Math.sin(an); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (dna > 0.01) { ctx.save(); ctx.globalAlpha *= dna * 0.35; ctx.strokeStyle = C.kernR; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  // kopieervork die vastloopt
  if (dnaBlok > 0.01) { const an = -0.9 + (1 - dnaBlok) * 0.6, fx = w * 0.17 * Math.cos(an), fy = h * 0.22 * Math.sin(an); abMol(ctx, fx, fy, 1.3 * k * 2.2, dnaBlok, 0.4); }
  // ribosomen (twee bolletjes: klein ribosoom van de bacterie)
  const R = [[-0.36, -0.2], [-0.3, 0.18], [-0.4, 0.02], [0.33, -0.22], [0.38, 0.12], [0.3, 0.26], [-0.2, 0.3], [0.22, -0.32], [-0.22, -0.34], [0.42, -0.04]];
  R.forEach(([fx, fy], i) => { const px = fx * w, py = fy * h; const c = riboBlok > 0.5 ? '#8A8E96' : C.ribo; circ(ctx, px, py - 6 * k, 7 * k * (1 + 0.25 * ribo), c); circ(ctx, px, py + 6 * k, 9 * k * (1 + 0.25 * ribo), c);
    if (riboBlok > 0.01) abMol(ctx, px + 14 * k * 1.2, py - 12 * k * 1.2, 0.8 * k * 1.2, clamp(riboBlok * 2 - i * 0.08, 0, 1), 0.5);
    else if (o.eiwit) { const u = (t * 0.6 + i * 0.13) % 1; ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j < 6 * u + 1; j++) { const ex = px + 16 * k * 1.2 + j * 7 * k * 1.2, ey = py + Math.sin(j * 1.4) * 6 * k * 1.2; j ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); } ctx.stroke(); } });
  ctx.restore(); ctx.restore();
  // gelekte celinhoud en scherven na het knappen
  if (kapot > 0.85) { ctx.save(); ctx.globalAlpha *= a * 0.55 * clamp((kapot - 0.85) / 0.15, 0, 1); blob(ctx, x, y + 10, w * 0.36, h * 0.3, 0.18, 3, 0); shape(ctx, rgba('#33466A', 0.8), null); ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60; ctx.lineTo(x - w * 0.25 + u * w * 0.5, y + 10 + Math.sin(u * 17) * h * 0.08); } ctx.stroke(); ctx.restore(); }
  if (kapot > 0.8) { ctx.save(); ctx.globalAlpha *= a * clamp((kapot - 0.8) / 0.2, 0, 1); for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + 0.3, d = (0.55 + 0.25 * hash(i)) * w * 0.5 * (0.8 + 0.4 * clamp((kapot - 0.8) * 5, 0, 1)); ctx.save(); ctx.translate(x + Math.cos(an) * d, y + Math.sin(an) * d * h / w * 1.4); ctx.rotate(an); roundRect(ctx, -20 * k * 2, -5 * k * 2, 40 * k * 2, 10 * k * 2, 4); shape(ctx, rgba(WAND, 0.6), WAND, 1.5); ctx.restore(); } ctx.restore(); } }

// mensencel: rond, alleen celmembraan, kern, ER met (grotere) ribosomen, mitochondriën
function mensCel(ctx, x, y, r, a = 1, t = 0, nadruk = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.94, 0.03, 2, t); shape(ctx, '#3A3A5E', null); membrane(ctx, x, y, r, r * 0.94, C.er, 0.03, 2, t);
  for (let i = 0; i < 16; i++) { const an = hash(i * 5 + 2) * 6.283, d = Math.sqrt(hash(i * 5 + 4)) * r * 0.8; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 1.6, rgba('#AFC0D0', 0.25)); }
  nucleus(ctx, x - r * 0.12, y - r * 0.05, r * 0.33, 1, t);
  mitochondrion(ctx, x + r * 0.45, y + r * 0.42, r * 0.34, -0.5, 1, 4, t); mitochondrion(ctx, x - r * 0.48, y + r * 0.45, r * 0.3, 0.6, 1, 4, t);
  // ribosomen: groter, met twee bolletjes, op een stukje ER
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; for (let k2 = 0; k2 < 2; k2++) { ctx.beginPath(); ctx.arc(x - r * 0.12, y - r * 0.05, r * (0.45 + k2 * 0.09), -1.2, 0.1); ctx.stroke(); }
  for (let i = 0; i < 7; i++) { const an = -1.15 + i * 0.2, rr = r * 0.6 + 6; const px = x - r * 0.12 + Math.cos(an) * rr, py = y - r * 0.05 + Math.sin(an) * rr; const s2 = 1 + 0.3 * nadruk; circ(ctx, px, py, 9 * s2, C.ribo); circ(ctx, px + Math.cos(an) * 12 * s2, py + Math.sin(an) * 12 * s2, 12 * s2, C.ribo); }
  ctx.restore(); }

// virusdeeltje: twintigvlak (zeshoek), uitsteeksels, erfelijk materiaal binnenin
function virusDeeltje(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(t * 0.15); const r = 60 * s;
  ctx.strokeStyle = '#9FD3B0'; ctx.lineWidth = 4 * s; for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.95, Math.sin(an) * r * 0.95); ctx.lineTo(Math.cos(an) * r * 1.35, Math.sin(an) * r * 1.35); ctx.stroke(); circ(ctx, Math.cos(an) * r * 1.4, Math.sin(an) * r * 1.4, 7 * s, '#9FD3B0'); }
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.3), C.groen, 3 * s);
  ctx.strokeStyle = C.kernR; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = (u - 0.5) * r * 1.1, py = Math.sin(u * 14) * r * 0.25; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

// kleine bacterie (staafje) met kleur; dood = grijs en gekreukt
function staafje(ctx, x, y, s = 1, rot = 0, col = ECOLI, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#7A8090' : col; capsule(ctx, 0, 0, 44 * s, 20 * s); shape(ctx, rgba(c, 0.55), lighten(c, 0.15), 2.5 * s); capsule(ctx, 0, 0, 30 * s, 8 * s); shape(ctx, rgba(c, 0.35), null); ctx.restore(); }
function bolletje(ctx, x, y, s = 1, col = C.teal, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); const c = dood > 0.5 ? '#7A8090' : col; circ(ctx, x, y, 12 * s, rgba(c, 0.55), lighten(c, 0.15), 2.5 * s); ctx.restore(); }
function spiraal(ctx, x, y, s = 1, rot = 0, col = C.paars, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot); const c = dood > 0.5 ? '#7A8090' : col; ctx.strokeStyle = c; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = (u - 0.5) * 60 * s, py = Math.sin(u * 12) * 7 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// MRSA: Staphylococcus, trosje bolletjes
function staphTros(ctx, x, y, s = 1, a = 1, col = '#D8A23C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[0, 0], [22, -6], [-20, 8], [6, 20], [-6, -20], [26, 16], [-26, -12], [14, -26]].forEach(([dx, dy]) => circ(ctx, x + dx * s, y + dy * s, 12 * s, rgba(col, 0.6), lighten(col, 0.2), 2.2 * s)); ctx.restore(); }

// urinepotje met dop
function urinePotje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -46, -40, 92, 110, 10); shape(ctx, rgba('#E8EEF2', 0.12), '#C9D6E0', 3); roundRect(ctx, -42, 0, 84, 66, 8); shape(ctx, rgba('#E8C95A', 0.75), null);
  roundRect(ctx, -54, -62, 108, 26, 6); shape(ctx, '#E07A5F', '#B9452F', 2); ctx.restore(); }
// teststrip (dipstick) met vakjes; u 0..1 = verkleuren (nitriet + leukocyten positief)
function testStrip(ctx, x, y, s = 1, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.25); ctx.scale(s, s);
  roundRect(ctx, -14, -150, 28, 300, 4); shape(ctx, '#F2F2EE', '#C9CED6', 1.5); const V = [['#E8D8A0', '#E8D8A0'], ['#F2E6C0', '#C27BA0'], ['#E6E0B0', '#8C6BB0'], ['#D8E4B0', '#D8E4B0'], ['#F0D8A0', '#F0D8A0']];
  V.forEach(([c0, c1], i) => { const k = (i === 1 || i === 2) ? u : 0; ctx.fillStyle = k > 0.5 ? c1 : c0; ctx.fillRect(-10, 40 + i * 20, 20, 14); }); ctx.restore(); }

// doosje antibiotica; kies = gouden rand; naam bovenop
function medDoos(ctx, x, y, w, naam, col, a = 1, kies = 0, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); ctx.lineTo(x - w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2, y - h / 2); ctx.closePath(); shape(ctx, '#D8DCE2', '#AEB6C2', 1.5);
  ctx.beginPath(); ctx.moveTo(x + w / 2, y - h / 2); ctx.lineTo(x + w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2 + 26, y + h / 2 - 22); ctx.lineTo(x + w / 2, y + h / 2); ctx.closePath(); shape(ctx, '#B8C0CC', '#AEB6C2', 1.5);
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 4); shape(ctx, '#F2F2EE', kies > 0.5 ? C.goud : '#AEB6C2', kies > 0.5 ? 5 : 1.5); ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h / 2 + h * 0.18, w, h * 0.2);
  ctx.save(); ctx.font = fTekst(Math.round(w * 0.13), 800); ctx.fillStyle = '#1A2740'; ctx.textAlign = 'center'; ctx.fillText(naam, x, y + h * 0.18, w - 16); if (sub) { ctx.font = fTekst(Math.round(w * 0.09), 600); ctx.fillStyle = '#5A6478'; ctx.fillText(sub, x, y + h * 0.36, w - 16); } ctx.restore();
  ctx.restore(); }

// petrischaal (bovenaanzicht). o: kolonies (aantal losse kolonies), groei 0..1, gazon 0..1 (dichte groei),
// schijf: [{dx, dy, code, ring (straal heldere zone in px), a}], ringU 0..1 (zones groeien), hl = index uitgelicht
function petri(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { kolonies = 0, groei = 1, gazon = 0, schijf = [], ringU = 1, hl = -1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r + 14, rgba('#DCE6EE', 0.12), '#C9D6E0', 3); circ(ctx, x, y, r, AGAR, lighten(AGAR, 0.2), 2);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip();
  if (gazon > 0.01) { ctx.fillStyle = rgba(GAZON, 0.85 * gazon); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); for (let i = 0; i < 160; i++) { const an = hash(i * 3 + 9) * 6.283, d = Math.sqrt(hash(i * 3 + 5)) * r; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 3 + 3 * hash(i), rgba('#F6EED6', 0.6 * gazon)); } }
  for (let i = 0; i < kolonies; i++) { const an = hash(i * 13 + 1) * 6.283, d = Math.sqrt(hash(i * 13 + 2)) * r * 0.88; const g = clamp(groei * 1.4 - hash(i * 13 + 4) * 0.4, 0, 1); if (g <= 0) continue; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, (5 + 9 * hash(i * 13 + 3)) * g, '#EFE3C2', '#D6C69C', 1.5); }
  schijf.forEach((sc, i) => { const zr = sc.ring * clamp(ringU, 0, 1); if (zr > 1) { circ(ctx, x + sc.dx, y + sc.dy, zr, AGAR); ctx.save(); ctx.strokeStyle = rgba(GAZON, 0.7); ctx.lineWidth = 2; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(x + sc.dx, y + sc.dy, zr, 0, 6.283); ctx.stroke(); ctx.restore(); } });
  ctx.restore();
  schijf.forEach((sc, i) => { const sa = sc.a == null ? 1 : sc.a; if (sa <= 0.01) return; ctx.save(); ctx.globalAlpha *= sa; const yy = y + sc.dy - (sc.lift || 0); circ(ctx, x + sc.dx, yy, 24, '#FFFFFF', i === hl ? C.goud : '#C9CED6', i === hl ? 5 : 1.5); text(ctx, sc.code, x + sc.dx, yy + 7, fTekst(18, 800), '#1A2740', 'center'); ctx.restore(); });
  ctx.restore(); }
// pincet (voor het neerleggen van een schijfje), punt op (x, y)
function pincet(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(0.7); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-4, -20); ctx.lineTo(-10, -260); ctx.moveTo(4, -20); ctx.lineTo(10, -260); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-10, -260); ctx.lineTo(10, -260); ctx.stroke(); ctx.restore(); }
// liniaal met mm-streepjes; len in px, 1 mm = mm px
function liniaal(ctx, x, y, len, a = 1, mm = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, len, 46, 4); shape(ctx, rgba('#F2F2EE', 0.85), '#9AA3B2', 1.5); ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 1.5;
  for (let i = 0; i * mm <= len - 4; i++) { const h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8; ctx.beginPath(); ctx.moveTo(x + 2 + i * mm, y); ctx.lineTo(x + 2 + i * mm, y + h); ctx.stroke(); if (i % 10 === 0 && i) text(ctx, String(i), x + 2 + i * mm, y + 40, fTekst(16, 700), '#1A2740', 'center'); } ctx.restore(); }
// broedstoof met venster en temperatuur
function broedstoof(ctx, x, y, a = 1, inhoud = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 300, 360, 16); shape(ctx, '#C9D0DA', '#8A94A2', 2); roundRect(ctx, x + 30, y + 70, 240, 250, 10); shape(ctx, '#2A3446', '#8A94A2', 2);
  roundRect(ctx, x + 90, y + 18, 120, 38, 6); shape(ctx, '#1A2230', null); text(ctx, '37 °C', x + 150, y + 47, fTekst(26, 800), C.groen, 'center');
  for (let k = 0; k < 3; k++) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 40, y + 140 + k * 70, 220, 5); if (inhoud > 0.01) { ctx.save(); ctx.globalAlpha *= inhoud; ctx.beginPath(); ctx.ellipse(x + 110, y + 130 + k * 70, 50, 10, 0, 0, 6.283); shape(ctx, AGAR, '#C9D6E0', 2); ctx.beginPath(); ctx.ellipse(x + 200, y + 130 + k * 70, 50, 10, 0, 0, 6.283); shape(ctx, AGAR, '#C9D6E0', 2); ctx.restore(); } } ctx.restore(); }

// blaas (vooraanzicht) met urine en bacteriën; dood 0..1
function blaas(ctx, x, y, s = 1, a = 1, n = 8, dood = 0, t = 0, groei = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#D9A0A0'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -240); ctx.quadraticCurveTo(-130, -150, -95, -110); ctx.moveTo(150, -240); ctx.quadraticCurveTo(130, -150, 95, -110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, 120); ctx.bezierCurveTo(-170, 100, -190, -60, -110, -120); ctx.bezierCurveTo(-40, -165, 40, -165, 110, -120); ctx.bezierCurveTo(190, -60, 170, 100, 30, 120); ctx.lineTo(18, 190); ctx.lineTo(-18, 190); ctx.closePath(); shape(ctx, '#C97F86', '#E8AAB0', 4);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#E8C95A', 0.45); ctx.fillRect(-200, -60, 400, 260); ctx.restore();
  for (let i = 0; i < n; i++) { const g = clamp(groei * n - i, 0, 1); const px = (hash(i * 5 + 1) - 0.5) * 210 + Math.sin(t + i) * 4, py = -10 + (hash(i * 5 + 2) - 0.3) * 120 + Math.cos(t * 0.8 + i) * 4; staafje(ctx, px, py, 0.9, hash(i) * 3, ECOLI, g, dood); }
  ctx.restore(); }

// darmvenster: rond uitsnede met veel soorten bacteriën. breed 0..1 doodt bijna alles; res = resistente bacterie (index 0) groeit uit (groei 0..1)
const DARMB = (() => { const out = []; for (let i = 0; i < 34; i++) { const an = hash(i * 17 + 3) * 6.283, d = Math.sqrt(hash(i * 17 + 5)) * 0.82; out.push({ x: Math.cos(an) * d, y: Math.sin(an) * d, sort: i % 4, rot: hash(i * 17 + 7) * 3, col: [C.teal, C.groen, C.paars, '#C9A35C'][Math.floor(hash(i * 17 + 9) * 4)] }); } out[0] = { x: 0.12, y: -0.08, sort: 0, rot: 0.4, col: '#D8573F', res: true }; return out; })();
function darmVenster(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { breed = 0, groei = 0, hlRes = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#3A2F3E', '#D9A0A0', 5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 4, 0, 6.283); ctx.clip();
  // darmwand met plooien onderaan
  ctx.fillStyle = '#B9707A'; ctx.beginPath(); ctx.moveTo(x - r, y + r); for (let i = 0; i <= 24; i++) { const u = i / 24; ctx.lineTo(x - r + u * 2 * r, y + r * 0.72 - Math.abs(Math.sin(u * 15)) * r * 0.16); } ctx.lineTo(x + r, y + r); ctx.closePath(); ctx.fill();
  const sc = r / 300;
  DARMB.forEach((b, i) => { const px = x + b.x * r * 0.95 + Math.sin(t * 0.7 + i) * 4, py = y + b.y * r * 0.8 + Math.cos(t * 0.6 + i * 2) * 4; if (b.res) return; const d = clamp(breed * 1.6 - hash(i) * 0.6, 0, 1); const al = 1 - clamp((d - 0.6) * 2.5, 0, 0.85);
    if (b.sort === 0) staafje(ctx, px, py, sc * 1.1, b.rot, b.col, al, d); else if (b.sort === 1) bolletje(ctx, px, py, sc * 1.2, b.col, al, d); else if (b.sort === 2) spiraal(ctx, px, py, sc * 0.9, b.rot, b.col, al, d); else staafje(ctx, px, py, sc * 0.8, b.rot + 1, b.col, al, d); });
  // resistente bacterie + nakomelingen
  const R0 = DARMB[0]; const nKids = Math.floor(groei * 26);
  for (let k = 0; k <= nKids; k++) { const an = k * 2.399, d = k === 0 ? 0 : Math.sqrt(k) * 46 * sc; const px = x + R0.x * r + Math.cos(an) * d, py = y + R0.y * r + Math.sin(an) * d * 0.8; const g = k === nKids && k > 0 ? groei * 26 - nKids : 1; staafje(ctx, px, py, sc * 1.15, an + 0.4, '#D8573F', k ? clamp(g + 0.3, 0, 1) : 1); }
  if (hlRes > 0.01) { ctx.save(); ctx.globalAlpha *= hlRes; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x + R0.x * r, y + R0.y * r, 40 * sc + 20, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore(); }

// staafjes 'gebruik' (schematisch, zonder getallen)
function gebruikStaaf(ctx, x, y, w, frac, col, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 48, 10); shape(ctx, '#2A3446', rgba(C.line, 0.5), 1.5); if (frac > 0.005) { roundRect(ctx, x, y, Math.max(22, w * frac), 48, 10); shape(ctx, rgba(col, 0.7), col, 2); } text(ctx, naam, x - 20, y + 35, fTekst(30, 700), C.text, 'right'); ctx.restore(); }

// spreekkamer: bureau met computerscherm
function bureau(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 24, 6); shape(ctx, '#7A5A3E', '#5A422E', 2); ctx.fillStyle = '#5A422E'; ctx.fillRect(x + 20, y + 24, w - 40, 880 - y - 24); ctx.fillStyle = '#4A3626'; ctx.fillRect(x + 40, y + 60, w - 80, 4);
  roundRect(ctx, x + w - 210, y - 150, 180, 120, 8); shape(ctx, '#20283A', '#6A7080', 3); ctx.fillStyle = '#6A7080'; ctx.fillRect(x + w - 132, y - 30, 24, 30); ctx.restore(); }

// isolatiekamer: deur met raampje en bordje, kar met schorten en handschoenen
function isolatieDeur(ctx, x, y, a = 1, dicht = 1, bord = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 20, 300, 520, 6); shape(ctx, '#2C3A52', rgba(C.line, 0.6), 2);
  // kamer achter de deur: bed
  ctx.fillStyle = '#1E2A3E'; ctx.fillRect(x, y, 260, 480); roundRect(ctx, x + 30, y + 300, 200, 60, 10); shape(ctx, '#DCE6EE', null); roundRect(ctx, x + 40, y + 280, 70, 30, 10); shape(ctx, '#F2F2EE', null); ctx.fillStyle = '#8A94A2'; ctx.fillRect(x + 40, y + 360, 8, 60); ctx.fillRect(x + 210, y + 360, 8, 60);
  const dw = 260 * dicht; ctx.save(); roundRect(ctx, x, y, dw, 480, 4); shape(ctx, '#7FA3C9', '#5B7FA6', 2); if (dicht > 0.6) { roundRect(ctx, x + 70, y + 60, 120, 140, 6); shape(ctx, rgba('#BFE3F0', 0.35), '#5B7FA6', 2); circ(ctx, x + dw - 30, y + 260, 10, '#C9D0DA'); } ctx.restore();
  if (bord > 0.01) { ctx.save(); ctx.globalAlpha *= bord; roundRect(ctx, x + 40, y + 230, 180, 70, 8); shape(ctx, '#F2C94C', '#C9A035', 2); text(ctx, 'ISOLATIE', x + 130, y + 276, fTekst(30, 800), '#1A2740', 'center'); ctx.restore(); }
  ctx.restore(); }
// pompflacon handalcohol met druppels
function flacon(ctx, x, y, a = 1, drup = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40, y - 120, 80, 140, 14); shape(ctx, rgba('#BFE3F0', 0.4), '#9FC6D8', 2); ctx.fillStyle = rgba('#BFE3F0', 0.6); ctx.fillRect(x - 36, y - 60, 72, 76); roundRect(ctx, x - 14, y - 160, 28, 40, 4); shape(ctx, '#F2F2EE', null); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x - 14, y - 166, 60, 12);
  roundRect(ctx, x - 30, y - 40, 60, 30, 4); shape(ctx, '#F2F2EE', null); text(ctx, '70%', x, y - 18, fTekst(18, 800), '#1A2740', 'center');
  if (drup > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i / 3) % 1; circ(ctx, x + 40, y - 150 + ph * 80, 6, rgba('#BFE3F0', drup * (1 - ph))); } ctx.restore(); }
// wattenstaafje + kweekbuisje
function wattenstaaf(ctx, x, y, a = 1, rot = -0.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 240); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -6, 12, 22, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 2); ctx.restore(); }
function kweekBuis(ctx, x, y, a = 1, col = '#E07A5F') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 130, 44, 210, 20); shape(ctx, rgba('#DCE6EE', 0.15), '#C9D6E0', 2.5); roundRect(ctx, x - 26, y - 160, 52, 40, 6); shape(ctx, col, null); ctx.fillStyle = rgba('#C9A35C', 0.6); ctx.fillRect(x - 18, y + 10, 36, 60); ctx.restore(); }
// zaal met bedden (bovenaanzicht, zonder personen)
function bedTop(ctx, x, y, a = 1, besmet = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 110, 120, 220, 12); shape(ctx, '#DCE6EE', '#9AA3B2', 2); roundRect(ctx, x - 44, y - 96, 88, 40, 10); shape(ctx, '#F2F2EE', '#C9CED6', 1.5); roundRect(ctx, x - 56, y - 40, 112, 140, 10); shape(ctx, '#7FA3C9', '#5B7FA6', 1.5);
  if (besmet > 0.01) staphTros(ctx, x + 30, y - 70, 0.8, besmet); ctx.restore(); }

// medicatieoverzicht (apotheek): lijst medicijnen met vinkjes; nieuw = antibioticum onderaan
function medicatieLijst(ctx, x, y, a = 1, u = 1, nieuw = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 460, 330, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); metaText(ctx, 'MEDICATIEOVERZICHT', x + 24, y + 44, '#5A6478', 'left', 22);
  const M = [['bloeddrukverlager', C.teal], ['cholesterolremmer', C.paars], ['maagbeschermer', C.oker]]; M.forEach(([n, c], i) => { const yy = y + 100 + i * 60; roundRect(ctx, x + 24, yy - 22, 40, 26, 13); shape(ctx, c, null); text(ctx, n, x + 84, yy, fTekst(26, 600), '#1A2740', 'left'); vink_(ctx, x + 420, yy - 8, 12, clamp(u * 3 - i, 0, 1)); });
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; const yy = y + 280; roundRect(ctx, x + 14, yy - 40, 432, 56, 10); shape(ctx, rgba(C.goud, 0.25), C.goud, 2); roundRect(ctx, x + 24, yy - 22, 40, 26, 13); shape(ctx, ECOLI, null); text(ctx, 'antibioticum', x + 84, yy, fTekst(26, 800), '#1A2740', 'left'); ctx.restore(); }
  ctx.restore(); }
// nier (boonvorm); werk 0..1: 1 = goed, 0 = slecht (grijzer)
function nier(ctx, x, y, s = 1, a = 1, werk = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const c = werk > 0.5 ? '#B5525A' : '#8A6A70';
  ctx.beginPath(); ctx.moveTo(10, -90); ctx.bezierCurveTo(90, -100, 100, 90, 10, 90); ctx.bezierCurveTo(-40, 90, -20, 30, -30, 0); ctx.bezierCurveTo(-20, -30, -40, -90, 10, -90); ctx.closePath(); shape(ctx, c, lighten(c, 0.25), 3);
  ctx.strokeStyle = '#E8C95A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 10); ctx.quadraticCurveTo(-50, 60, -40, 130); ctx.stroke(); ctx.restore(); }
// bloedspiegel: concentratie in het bloed na een dosis; goed (snel omlaag) en slecht (blijft hoog); u = tekenvoortgang
function bloedSpiegel(ctx, x, y, w, h, a = 1, uGoed = 1, uSlecht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD', 'IN HET BLOED');
  const f = (u, k) => Math.exp(-k * u) * (1 - Math.exp(-14 * u)); const lijn = (k, col, uu) => { if (uu <= 0.01) return; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 80 * uu; i++) { const u = i / 80; const px = x + u * w, py = y + h - f(u, k) * h * 1.05; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
  lijn(4.5, C.groen, uGoed); lijn(1.0, ECOLI, uSlecht); ctx.restore(); }

// tegel voor een beroep: icoon + naam
function beroepTegel(ctx, x, y, naam, sub, col, a = 1, icoon = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 200, y - 150, 400, 300, 18); shape(ctx, rgba(col, 0.12), col, 2.5); if (icoon) icoon(x, y - 30); text(ctx, naam, x, y + 100, fTekst(34, 800), C.text, 'center'); if (sub) metaText(ctx, sub.toUpperCase(), x, y + 134, C.grain, 'center', 20); ctx.restore(); }
// apotheekicoon: vijzel met stamper
function vijzel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -10); ctx.lineTo(60, -80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, -20); ctx.lineTo(70, -20); ctx.quadraticCurveTo(66, 50, 0, 56); ctx.quadraticCurveTo(-66, 50, -70, -20); ctx.closePath(); shape(ctx, '#E8E2D4', '#B8B0A0', 3); ctx.fillStyle = '#B8B0A0'; ctx.fillRect(-36, 56, 72, 12); ctx.restore(); }
// microscoop (lab-icoon)
function microscoopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#C9D0DA'; roundRect(ctx, -60, 50, 120, 20, 6); ctx.fill(); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, 50); ctx.quadraticCurveTo(50, -10, 10, -40); ctx.stroke();
  ctx.save(); ctx.translate(-5, -40); ctx.rotate(-0.5); roundRect(ctx, -14, -60, 28, 100, 6); shape(ctx, '#E8E2D4', '#B8B0A0', 2); ctx.restore(); ctx.fillStyle = '#8A94A2'; ctx.fillRect(-40, 10, 70, 8); ctx.restore(); }
