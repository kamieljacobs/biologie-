// Wat word jij? · Biomedische wetenschappen 2 · CRISPR: wat doet dit gen? — eigen tekeningen (24 okt 2026)
// Dieren (muis, zebravis, worm) zelf getekend in filmstijl; geen grijze poppetjes behalve telpoppetjes in een groep.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// ---------- tuin ----------
// tomatenplant met stok en touw; r = rijpheid 0..1
function tomatenplant(ctx, x, yBase, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yBase); ctx.scale(s, s);
  ctx.strokeStyle = '#8A6A4A'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(26, -360); ctx.stroke();  // stok
  ctx.strokeStyle = '#4E7A46'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 0); for (let i = 0; i <= 10; i++) { const u = i / 10; ctx.lineTo(Math.sin(u * 2.4) * 16, -u * 340); } ctx.stroke();
  for (let i = 0; i < 5; i++) { const yy = -70 - i * 62, dir = i % 2 ? 1 : -1, sw = Math.sin(t * 0.7 + i) * 3;
    ctx.strokeStyle = '#4E7A46'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(dir * 56, yy - 16 + sw); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(dir * 62, yy - 20 + sw, 34, 16, dir * -0.25, 0, 6.283); shape(ctx, '#568A4E', '#6EA862', 2); }
  circ(ctx, -42, -150, 20, '#C9503C', '#E07A5F', 2); circ(ctx, -16, -118, 16, '#C9503C', '#E07A5F', 2); circ(ctx, 56, -236, 18, '#C9503C', '#E07A5F', 2);
  // touwtje om stok en stengel
  ctx.strokeStyle = '#D8C8A8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -236); ctx.bezierCurveTo(8, -244, 18, -228, 26, -236); ctx.stroke();
  ctx.restore(); }

function tuinGrond(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A3528'; ctx.beginPath(); ctx.moveTo(0, 896); ctx.quadraticCurveTo(960, 862, 1920, 896); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- stamboom en balken ----------
// vierkant (man) of cirkel (vrouw) met naam eronder; ziek = gevuld
function stamFig(ctx, x, y, r, man, ziek, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const fill = ziek ? rgba(C.koraal, 0.75) : rgba(C.fill, 0.5), lijn = ziek ? C.koraal : C.line;
  if (man) { roundRect(ctx, x - r, y - r, r * 2, r * 2, 6); shape(ctx, fill, lijn, 3); } else { circ(ctx, x, y, r, fill, lijn, 3); }
  if (naam) regel(ctx, naam, x, y + r + 40, 1, C.text, 30, 'center', 600); ctx.restore(); }

// cholesterolbalk met waarde; u 0..1 = vulling, hoog = koraal
function cholBalk(ctx, x, y, w, frac, lab, a = 1, col = C.koraal, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 44;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#2A3446', C.line, 1.5);
  const ww = w * frac * clamp(u, 0, 1); if (ww > 3) { roundRect(ctx, x, y, ww, h, 10); shape(ctx, rgba(col, 0.6), col, 2); }
  if (lab) regel(ctx, lab, x, y - 14, 1, C.text2, 26, 'left', 600); ctx.restore(); }

// ---------- DNA ----------
// recht stuk dubbele streng met basen; mark = index van de afwijkende base (-1 = geen)
function dnaStuk(ctx, x, y, w, n, a = 1, mark = -1, knip = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const dx = w / n, amp = 22;
  ctx.strokeStyle = C.er; ctx.lineWidth = 5;
  for (const sgn of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= n * 4; i++) { const u = i / (n * 4), xx = x + u * w, yy = y + sgn * (amp + Math.sin(u * 7) * 4); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  for (let i = 0; i < n; i++) { const xx = x + dx * (i + 0.5), af = i === mark; ctx.strokeStyle = af ? C.goud : rgba(C.er, 0.75); ctx.lineWidth = af ? 7 : 4;
    ctx.beginPath(); ctx.moveTo(xx, y - amp + 2); ctx.lineTo(xx, y + amp - 2); ctx.stroke(); if (af) circ(ctx, xx, y, 11, C.goud); }
  if (knip > 0.01) { const kx = mark >= 0 ? x + dx * (mark + 0.5) : x + w / 2; ctx.save(); ctx.globalAlpha *= knip; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(kx, y - amp - 26); ctx.lineTo(kx, y + amp + 26); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// gids-RNA: korte enkele kronkelende streng met een koppelvlak
function gidsRna(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const u = i / 40, xx = -90 + u * 180, yy = Math.sin(u * 9) * 14 - u * 10; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (let i = 0; i < 7; i++) { const xx = -78 + i * 26; ctx.strokeStyle = rgba(C.paars, 0.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, Math.sin((i / 7) * 9) * 14 - 2); ctx.lineTo(xx, Math.sin((i / 7) * 9) * 14 + 18); ctx.stroke(); }
  ctx.restore(); }

// Cas9: hoekig eiwitlichaam met een spleet waar het DNA in past
function cas9(ctx, x, y, s = 1, a = 1, dicht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const g = 30 - dicht * 16;
  ctx.beginPath(); ctx.moveTo(-96, -86); ctx.bezierCurveTo(-30, -112, 60, -104, 96, -58); ctx.bezierCurveTo(108, -32, 86, -g, 40, -g); ctx.lineTo(-54, -g); ctx.bezierCurveTo(-96, -g - 6, -110, -54, -96, -86); ctx.closePath(); shape(ctx, '#6E7FA0', '#AFC0D0', 3);
  ctx.beginPath(); ctx.moveTo(-96, 86); ctx.bezierCurveTo(-30, 112, 60, 104, 96, 58); ctx.bezierCurveTo(108, 32, 86, g, 40, g); ctx.lineTo(-54, g); ctx.bezierCurveTo(-96, g + 6, -110, 54, -96, 86); ctx.closePath(); shape(ctx, '#5F6F8E', '#AFC0D0', 3);
  ctx.restore(); }

// ---------- modelorganismen ----------
// gistcel: ovaal met kern en een knop die uitgroeit (budding)
function gistcel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kn = 26 + Math.sin(t * 0.8) * 6;
  ctx.beginPath(); ctx.ellipse(72, -56, kn, kn * 0.92, 0, 0, 6.283); shape(ctx, 'rgba(201,163,92,0.3)', C.oker, 3);
  ctx.beginPath(); ctx.ellipse(0, 0, 90, 76, 0, 0, 6.283); shape(ctx, 'rgba(201,163,92,0.28)', C.oker, 3.5);
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 86, 72, 0, 0, 6.283); ctx.clip();
  circ(ctx, -16, 6, 30, rgba(C.kern, 0.6), C.kernR, 2.5);
  for (let i = 0; i < 7; i++) { const w = wander(i, t, 5, 0.5); circ(ctx, -60 + (i * 23) % 120, -40 + (i * 31) % 80 + w.y, 4, rgba(C.ribo, 0.55)); } ctx.restore();
  ctx.restore(); }

// worm C. elegans: slanke doorzichtige buis met celkernen, zacht golvend
function worm(ctx, x, y, len = 520, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([-len / 2 + u * len, Math.sin(u * 6.6 + t * 1.6) * 30 * (0.35 + u * 0.65)]); }
  const dik = u => 6 + 16 * Math.sin(Math.PI * Math.min(1, Math.max(0.04, u)) ** 0.75);
  ctx.beginPath(); pts.forEach(([px, py], i) => { const u = i / 60; i ? ctx.lineTo(px, py - dik(u)) : ctx.moveTo(px, py - dik(u)); });
  for (let i = pts.length - 1; i >= 0; i--) { const u = i / 60; ctx.lineTo(pts[i][0], pts[i][1] + dik(u)); } ctx.closePath();
  shape(ctx, 'rgba(216,226,214,0.22)', '#D8E2D6', 3);
  for (let i = 3; i < 58; i += 4) { const u = i / 60; circ(ctx, pts[i][0], pts[i][1] + ((i % 8) ? -6 : 7), 5.5, rgba(C.kern, 0.7)); }
  ctx.restore(); }

// zebravisembryo: dooierbol met doorzichtig lijfje en staart; hart = kloppend stipje
function zebravisEmbryo(ctx, x, y, s = 1, a = 1, t = 0, hart = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // chorion (doorzichtig eihulsje)
  circ(ctx, 0, 0, 148, 'rgba(175,192,208,0.10)', 'rgba(175,192,208,0.5)', 2.5);
  // dooier
  circ(ctx, -6, 30, 72, 'rgba(224,182,74,0.5)', C.goud, 3);
  // lijfje over de dooier + staart
  ctx.beginPath(); ctx.moveTo(-70, -16); ctx.bezierCurveTo(-30, -62, 40, -58, 74, -20);
  ctx.bezierCurveTo(100, 4, 118, 34, 128, 62); ctx.bezierCurveTo(112, 46, 92, 36, 74, 34);
  ctx.bezierCurveTo(40, 22, -24, 26, -70, 4); ctx.closePath(); shape(ctx, 'rgba(216,226,214,0.3)', '#D8E2D6', 3);
  // oog
  circ(ctx, -52, -14, 20, 'rgba(242,242,238,0.5)', '#D8E2D6', 2); circ(ctx, -52, -14, 10, '#121A26');
  // somieten
  ctx.strokeStyle = 'rgba(216,226,214,0.6)'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { const u = i / 7; ctx.beginPath(); ctx.moveTo(10 + u * 96, -12 + u * 40); ctx.lineTo(16 + u * 96, 14 + u * 38); ctx.stroke(); }
  // staartslag
  ctx.save(); ctx.translate(128, 62); ctx.rotate(Math.sin(t * 5) * 0.2); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(28, -16); ctx.lineTo(24, 14); ctx.closePath(); shape(ctx, 'rgba(216,226,214,0.35)', '#D8E2D6', 2); ctx.restore();
  // kloppend hart
  if (hart > 0.01) { const p = 1 + 0.3 * Math.sin(t * 7); ctx.save(); ctx.globalAlpha *= hart; circ(ctx, -14, 2, 13 * p, rgba(C.koraal, 0.85), C.koraal, 2); ctx.restore(); }
  ctx.restore(); }

// muis in filmstijl, zijaanzicht naar rechts; knock = knock-outmerk (gouden stip op de flank)
function muisje(ctx, x, yBase, s = 1, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const { kijk = 1, knock = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yBase); ctx.scale(s * kijk, s);
  const sn = Math.sin(t * 2.4) * 2;
  // staart
  ctx.strokeStyle = '#C9A08E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-104, -54); ctx.bezierCurveTo(-170, -46, -196, -96, -238, -80 + sn * 3); ctx.stroke();
  // achterpoot
  ctx.strokeStyle = '#B9ADA4'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(-54, -34); ctx.lineTo(-62, -4); ctx.lineTo(-34, -2); ctx.stroke();
  // lichaam
  ctx.beginPath(); ctx.moveTo(-106, -56); ctx.bezierCurveTo(-92, -128, -10, -148, 58, -118); ctx.bezierCurveTo(96, -104, 112, -76, 104, -46);
  ctx.bezierCurveTo(60, -16, -50, -14, -106, -56); ctx.closePath(); shape(ctx, '#C4BAB1', '#DCD5CE', 2.5);
  // kop
  ctx.beginPath(); ctx.moveTo(60, -118); ctx.bezierCurveTo(104, -124, 146, -104, 156, -78); ctx.bezierCurveTo(160, -62, 136, -44, 108, -46); ctx.bezierCurveTo(76, -50, 58, -84, 60, -118); ctx.closePath(); shape(ctx, '#C4BAB1', '#DCD5CE', 2.5);
  // oor, oog, snuit, snorharen
  circ(ctx, 78, -126, 25, '#D4A9A2', '#DCD5CE', 2.5); circ(ctx, 78, -126, 13, 'rgba(180,130,124,0.75)');
  circ(ctx, 118, -92, 6.5, '#121A26'); circ(ctx, 155, -70, 6, '#C98A8A');
  ctx.strokeStyle = 'rgba(242,242,238,0.75)'; ctx.lineWidth = 2; for (let i = -1; i < 2; i++) { ctx.beginPath(); ctx.moveTo(150, -72); ctx.lineTo(192, -72 + i * 16 + sn); ctx.stroke(); }
  // voorpoot
  ctx.strokeStyle = '#B9ADA4'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(62, -46); ctx.lineTo(70, -8); ctx.lineTo(94, -4); ctx.stroke();
  if (knock > 0.01) { ctx.save(); ctx.globalAlpha *= knock; circ(ctx, -20, -86, 16, rgba(C.goud, 0.8), C.goud, 2); ctx.restore(); }
  ctx.restore(); }

// kaartje onder een modelorganisme: waarvoor je hem kiest
function modelKaart(ctx, x, y, w, titel, regelTekst, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 104, 14); shape(ctx, rgba(col, 0.12), rgba(col, 0.6), 2);
  regel(ctx, titel, x, y + 42, 1, C.text, 32, 'center', 700); regel(ctx, regelTekst, x, y + 80, 1, C.text2, 26, 'center', 500); ctx.restore(); }

// ---------- levercel met LDL-receptoren ----------
// Ronde levercel (uitsnede van een bol); rec = aantal receptoren, pcsk = PCSK9-eiwit dat er een meeneemt
function levercel(ctx, cx, cy, r, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const { rec = 6, pak = -1, pakU = 0, binnen = 0, label = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, cx, cy, r, 'rgba(42,58,88,0.55)', C.er, 4); circ(ctx, cx, cy, r - 12, null, 'rgba(175,192,208,0.5)', 2);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14, 0, 6.283); ctx.clip();
  for (let i = 0; i < 10; i++) { const w = wander(i + 5, t, 6, 0.4); circ(ctx, cx - r * 0.6 + (i * 53) % (r * 1.2), cy - r * 0.5 + (i * 37) % (r * 1.0) + w.y, 3.5, 'rgba(201,184,150,0.4)'); }
  circ(ctx, cx + r * 0.22, cy + r * 0.22, r * 0.3, rgba(C.kern, 0.45), C.kernR, 2.5);
  if (binnen > 0.01) { ctx.save(); ctx.globalAlpha *= binnen; for (let i = 0; i < 5; i++) ldlDeeltje(ctx, cx - r * 0.42 + i * 26, cy - r * 0.18 + (i % 2) * 24, 0.8, 1); ctx.restore(); }
  ctx.restore();
  // receptoren loodrecht op het membraan
  for (let i = 0; i < rec; i++) { const an = -2.5 + i * (2.0 / Math.max(1, rec - 1));
    const pakt = i === pak, u = pakt ? clamp(pakU, 0, 1) : 0, rr = r - u * (r * 0.42);
    ldlReceptor(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, an, 1 - u * 0.55, pakt ? C.koraal : C.groen); }
  if (label) naamBij(ctx, 'levercel', '', cx, cy + r + 54, 1, 'center');
  ctx.restore(); }

// receptor: steel met een bakje, basis op de wand, punt naar buiten
function ldlReceptor(ctx, x, y, an, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(26, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(34, 0, 16, 1.9, -1.9); shape(ctx, null, col, 7); ctx.restore(); }

// LDL-deeltje: bolletje met een vetrand en een enkel apoproteïne-lusje
function ldlDeeltje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 15 * s, 'rgba(224,182,74,0.45)', C.goud, 2.5);
  ctx.strokeStyle = C.oker; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x, y, 15 * s, -1.0, 0.9); ctx.stroke(); ctx.restore(); }

// PCSK9-eiwit: kleine kluwen (keten die zich vouwt), geen bolletje
function pcsk9(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 44; i++) { const u = i / 44, an = u * 11 + Math.sin(t * 0.6) * 0.1, rr = 8 + 20 * Math.sin(u * 3.14); const xx = Math.cos(an) * rr, yy = Math.sin(an) * rr * 0.8; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.restore(); }

// infuuszak met slang en lipide-bolletjes die wegdruppelen
function infuus(ctx, x, y, s = 1, a = 1, t = 0, stroom = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8A8E96'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -210); ctx.lineTo(0, -168); ctx.stroke();
  roundRect(ctx, -58, -168, 116, 196, 18); shape(ctx, 'rgba(91,164,201,0.22)', C.teal, 3);
  ctx.save(); roundRect(ctx, -54, -110, 108, 134, 14); ctx.clip(); ctx.fillStyle = 'rgba(91,164,201,0.3)'; ctx.fillRect(-54, -110, 108, 134);
  for (let i = 0; i < 6; i++) { const w = wander(i, t, 10, 0.5); circ(ctx, -30 + (i * 23) % 70, -84 + (i * 31) % 96 + w.y, 8, rgba(C.goud, 0.6), C.goud, 1.5); } ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(0, 108, 70, 140, 150, 160); ctx.stroke();
  if (stroom > 0.01) for (let i = 0; i < 5; i++) { const u = ((t * 0.5 + i * 0.2) % 1); const xx = 0 + (u < 0.5 ? 0 : (u - 0.5) * 300), yy = 28 + u * 132; circ(ctx, xx, yy, 7, rgba(C.goud, 0.8 * stroom), C.goud, 1.5); }
  ctx.restore(); }

// weegschaal-kaartje voor een afweging
function weegKaart(ctx, x, y, w, kop, tekst, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 150, 16); shape(ctx, rgba(col, 0.1), rgba(col, 0.55), 2);
  regel(ctx, kop, x, y + 46, 1, col, 30, 'center', 700);
  ctx.font = fTekst(26, 500); const words = tekst.split(' '); const lines = []; let cur = '';
  for (const wd of words) { if (ctx.measureText(cur + ' ' + wd).width > w - 44) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; } lines.push(cur);
  lines.slice(0, 3).forEach((l, i) => regel(ctx, l, x, y + 86 + i * 32, 1, C.text2, 26, 'center', 500)); ctx.restore(); }

// stap in de tijdlijn van de recap
function stapBol(ctx, x, y, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, 44, rgba(col, 0.15 + 0.3 * aan), rgba(col, 0.45 + 0.55 * aan), 3);
  regel(ctx, String(nr), x, y + 14, 1, C.text, 36, 'center', 800); regel(ctx, s2, x, y + 86, 1, C.text, 28, 'center', 600); ctx.restore(); }

// telpoppetje, alleen in groepen
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// spiegelt een tekening rond de verticale lijn x (voor een wijsarm de andere kant op); tekst niet hierin tekenen
function gespiegeld(ctx, x, fn) { ctx.save(); ctx.translate(2 * x, 0); ctx.scale(-1, 1); fn(); ctx.restore(); }
// touwtje tussen twee punten met een lichte doorhang
function touw(ctx, x1, y1, x2, y2, a = 1, zak = 18) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#D8C8A8'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + zak, x2, y2); ctx.stroke(); ctx.restore(); }
