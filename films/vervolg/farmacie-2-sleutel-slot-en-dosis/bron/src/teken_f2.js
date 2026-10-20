// Wat word jij? · Farmacie 2 · Sleutel, slot en dosis — eigen tekeningen (20 okt 2026)

const KL = { receptor: C.teal, enzym: C.paars, transport: C.groen, ion: C.oker, ibu: C.goud, morf: C.koraal, nal: C.groen, cyto: '#24395A' };
function lichtHex(hex, k) { const n = parseInt(hex.slice(1), 16); const c = (v) => Math.round(v + (255 - v) * k).toString(16).padStart(2, '0'); return '#' + c(n >> 16) + c((n >> 8) & 255) + c(n & 255); }
const ef = (u) => u * u * (3 - 2 * u); // zachte overgang

// gevouwen keten: slingerlijn binnen het huidige pad (clip), leest als een opgevouwen eiwitketen
function ketenVulling(ctx, x0, y0, w, h, col, lw = 3) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(col, 0.55); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); const rij = 15; let dir = 1, first = true;
  for (let yy = y0 + 8; yy < y0 + h - 4; yy += rij) { const xa = dir > 0 ? x0 + 6 : x0 + w - 6, xb = dir > 0 ? x0 + w - 6 : x0 + 6; const n = 8;
    for (let k = 0; k <= n; k++) { const xx = xa + (xb - xa) * k / n, wob = Math.sin(k * 1.7 + yy * 0.13) * 4; if (first) { ctx.moveTo(xx, yy + wob); first = false; } else ctx.lineTo(xx, yy + wob); }
    ctx.quadraticCurveTo(xb + dir * 10, yy + rij / 2, xb, yy + rij); dir = -dir; }
  ctx.stroke(); ctx.restore(); }
// pad met afgeronde hoeken door een lijst punten
function rondPad(ctx, P, r = 10) { ctx.beginPath(); const n = P.length; for (let i = 0; i < n; i++) { const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n];
    const m1 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]; if (i === 0) ctx.moveTo(m1[0], m1[1]); ctx.arcTo(p1[0], p1[1], (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, r); } ctx.closePath(); }
function eiwitVorm(ctx, P, col, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const xs = P.map(p => p[0]), ys = P.map(p => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = rgba(C.goud, 0.9 * gloed); ctx.shadowBlur = 30 * gloed; rondPad(ctx, P, 9); ctx.fillStyle = rgba(col, 0.6); ctx.fill(); ctx.restore(); }
  rondPad(ctx, P, 9); ctx.fillStyle = rgba(lichtHex(col, 0.15 * gloed), 0.42 + 0.2 * gloed); ctx.fill(); rondPad(ctx, P, 9); ketenVulling(ctx, x0, y0, w, h, lichtHex(col, 0.45));
  rondPad(ctx, P, 9); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); }

// ---- de vier doelwitten (lokale coördinaten: membraan op y = 0, buiten = negatieve y), s = schaal
// receptor met V-vormig slot aan de buitenkant
function receptor(ctx, s = 1, a = 1, gloed = 0, col = KL.receptor) { eiwitVorm(ctx, [[-36, 44], [-38, -56], [-16, -58], [0, -30], [16, -58], [38, -56], [36, 44], [0, 52]].map(([x, y]) => [x * s, y * s]), col, a, gloed); }
// transporteiwit: twee helften met een kanaal; glucose (zeshoek) gaat erdoor (u 0..1)
function zeshoek(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.5236; ctx[k ? 'lineTo' : 'moveTo'](x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }
function transporteiwit(ctx, s = 1, a = 1, u = 0) { if (a <= 0.01) return; for (const k of [-1, 1]) eiwitVorm(ctx, [[k * 12, -54], [k * 46, -50], [k * 50, 0], [k * 44, 50], [k * 12, 54], [k * 16, 0]].map(([x, y]) => [x * s, y * s]), KL.transport, a);
  if (u > 0) zeshoek(ctx, 0, (-90 + 190 * (u % 1)) * s, 13 * s, C.text, a * clamp(Math.sin((u % 1) * Math.PI) * 3, 0, 1)); }
// ionkanaal: vier staafjes met een smalle porie; ionen (+) gaan erdoor
function ionkanaal(ctx, s = 1, a = 1, t = 0) { if (a <= 0.01) return; [-44, -22, 22, 44].forEach((dx, i) => eiwitVorm(ctx, [[dx - 10, -48], [dx + 10, -48], [dx + 11, 48], [dx - 11, 48]].map(([x, y]) => [x * s, y * s]), KL.ion, a));
  ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, y = (-110 + 230 * u) * s; const al = clamp(Math.sin(u * Math.PI) * 2, 0, 1); circ(ctx, 0, y, 8 * s, rgba('#F2F2EE', 0.85 * al)); text(ctx, '+', 0, y + 5 * s, fTekst(14 * s, 800), rgba('#121A26', al), 'center'); } ctx.restore(); }
// enzym: kluwen met een rechthoekig zakje (actieve plaats) aan de bovenkant; blok 0..1 = ibuprofen zit erin
function enzym(ctx, x, y, s = 1, a = 1, blok = 0, col = KL.enzym) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y);
  eiwitVorm(ctx, [[-60, -30], [-18, -40], [-17, -12], [17, -12], [18, -40], [60, -30], [66, 18], [30, 46], [-30, 46], [-66, 18]].map(([px, py]) => [px * s, py * s]), col, a);
  if (blok > 0.01) ibuBlok(ctx, 0, (-26 - (1 - blok) * 90) * s, s, a * clamp(blok * 3, 0, 1)); ctx.restore(); }
function ibuBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 15 * s, y - 14 * s, 30 * s, 30 * s, 5 * s); shape(ctx, KL.ibu, lichtHex(KL.ibu, 0.4), 2); ctx.restore(); }
// pijn- en ontstekingsstofje (klein zigzagketentje)
function pijnStofje(ctx, x, y, s = 1, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k < 5; k++) ctx[k ? 'lineTo' : 'moveTo'](x + (k - 2) * 9 * s, y + (k % 2 ? -6 : 6) * s); ctx.stroke(); ctx.restore(); }

// cel met rond membraan; geeft functie terug die een punt + rotatie op het membraan geeft
function celRond(ctx, cx, cy, rx, ry, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(KL.cyto, 0.85); ctx.fill();
  for (let i = 0; i < 26; i++) { const w = wander(i, t, 10, 0.2), an = hash(i * 5) * 6.283, rr = Math.sqrt(hash(i * 9 + 2)) * 0.82; circ(ctx, cx + Math.cos(an) * rx * rr + w.x, cy + Math.sin(an) * ry * rr + w.y, 2.2, rgba('#C9D6E6', 0.22)); }
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, rx - 12, ry - 12, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
function opMembraan(cx, cy, rx, ry, th) { const x = cx + Math.cos(th) * (rx - 6), y = cy + Math.sin(th) * (ry - 6); const nx = Math.cos(th) / rx, ny = Math.sin(th) / ry; return { x, y, rot: Math.atan2(nx, -ny) }; }
function opPlek(ctx, p, fn) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); fn(); ctx.restore(); }

// stuk membraan als boog (deel van een grote cirkel), buiten = boven
function membraanBoog(ctx, x, y, w, a = 1, R = 2200) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.asin(w / 2 / R);
  ctx.beginPath(); ctx.arc(x, y + R, R + 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.arc(x, y + R, R - 12, -Math.PI / 2 + an, -Math.PI / 2 - an, true); ctx.closePath(); ctx.fillStyle = rgba(C.er, 0.18); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y + R, R + 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y + R, R - 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y + R, R - 13, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.lineTo(x + w / 2, y + 260); ctx.lineTo(x - w / 2, y + 260); ctx.closePath(); ctx.fillStyle = rgba(KL.cyto, 0.6); ctx.fill(); ctx.restore(); }
function boogY(x, x0, y0, R = 2200) { return y0 + R - Math.sqrt(R * R - (x - x0) * (x - x0)); }
function boogRot(x, x0, R = 2200) { return Math.asin((x - x0) / R); }

// stofjes die op het V-slot passen: agonist (sleutel die opent) en antagonist (sleutel die vastzit, met dikke kop)
function ligand(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const col = soort === 'ag' ? KL.morf : KL.nal;
  ctx.beginPath(); if (soort === 'ag') { ctx.moveTo(-14, -28); ctx.lineTo(0, 0); ctx.lineTo(14, -28); ctx.lineTo(24, -40); ctx.quadraticCurveTo(0, -56, -24, -40); }
  else { ctx.moveTo(-14, -28); ctx.lineTo(0, 0); ctx.lineTo(14, -28); ctx.lineTo(40, -34); ctx.lineTo(44, -62); ctx.lineTo(10, -70); ctx.lineTo(-30, -66); ctx.lineTo(-42, -40); }
  ctx.closePath(); shape(ctx, rgba(col, 0.85), lichtHex(col, 0.4), 2.5); ctx.restore(); }
// hangslot met sleutel: open (agonist) of dicht met vastgelopen sleutel (antagonist)
function hangslot(ctx, x, y, s, open, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 9; ctx.beginPath(); if (open) ctx.arc(-26, -40, 26, Math.PI, 0); else ctx.arc(0, -40, 26, Math.PI, 0); ctx.moveTo(open ? 0 : 26, -40); ctx.lineTo(open ? 0 : 26, -20); if (!open) { ctx.moveTo(-26, -40); ctx.lineTo(-26, -20); } else { ctx.moveTo(-52, -40); ctx.lineTo(-52, -26); } ctx.stroke();
  roundRect(ctx, -40, -22, 80, 66, 10); shape(ctx, '#8C939E', '#C9CED6', 2); circ(ctx, 0, 6, 8, '#2A3446');
  ctx.save(); ctx.translate(0, 6); ctx.rotate(open ? 1.2 : 0); ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 60); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 76, 16, 0, 6.283); ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); ctx.restore(); }

// ademhalingsspoor; f 0..1 = traag → normaal
function ademSpoor(ctx, x, y, w, h, f, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - h / 2 - 50, w + 40, h + 90, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); metaText(ctx, 'ADEMHALING', x, y - h / 2 - 16, C.grain, 'left', 20);
  ctx.strokeStyle = f > 0.5 ? C.groen : C.koraal; ctx.lineWidth = 3.5; ctx.beginPath(); const cyc = lerp(1.6, 5, f), amp = lerp(0.35, 0.9, f);
  for (let i = 0; i <= w; i += 3) { const v = Math.sin((i / w * cyc - t * cyc * 0.12) * 6.283) * amp; ctx[i ? 'lineTo' : 'moveTo'](x + i, y - v * h / 2 + h * 0.05); } ctx.stroke(); ctx.restore(); }

// ---- grafiek: dosis tegen effect ----
// curve: K = halve-effectdosis (zelfde eenheid als xmax), n = steilheid; draw 0..1 = tot waar getekend
function effectV(d, K, n = 1) { return d <= 0 ? 0 : Math.pow(d, n) / (Math.pow(d, n) + Math.pow(K, n)); }
function grafAssen(ctx, x, y, w, h, a = 1, xl = 'DOSIS', yl = 'EFFECT') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  pijl(ctx, x, y + 10, x, y - 6, C.line, 1, 2.5, 14); pijl(ctx, x + w - 10, y + h, x + w + 6, y + h, C.line, 1, 2.5, 14); metaText(ctx, xl, x + w, y + h + 40, C.text2, 'right', 22); metaText(ctx, yl, x - 10, y - 24, C.text2, 'left', 22); ctx.restore(); }
function curve(ctx, x, y, w, h, xmax, K, n, col, draw = 1, a = 1, lw = 6, top = 1) { if (a <= 0.01 || draw <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const N = 160; for (let i = 0; i <= N * draw; i++) { const d = i / N * xmax; const px = x + i / N * w, py = y + h - effectV(d, K, n) * h * 0.86 * top; ctx[i ? 'lineTo' : 'moveTo'](px, py); } ctx.stroke(); ctx.restore(); }
function curvePunt(x, y, w, h, xmax, K, n, d, top = 1) { return [x + d / xmax * w, y + h - effectV(d, K, n) * h * 0.86 * top]; }

// tablet (wit, met breukgleuf) en doordrukstrip
function tablet(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, 6.283); shape(ctx, '#F4F2EC', '#BFC5CE', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -r * 0.5); ctx.lineTo(0, r * 0.5); ctx.stroke(); ctx.restore(); }
function strip(ctx, x, y, s, leeg = 0, a = 1, naam = 'IBUPROFEN 400 mg') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -130, -70, 260, 140, 12); shape(ctx, '#C9D2DC', '#E8EEF4', 2);
  for (let i = 0; i < 10; i++) { const px = -96 + (i % 5) * 48, py = -26 + Math.floor(i / 5) * 56; ctx.beginPath(); ctx.ellipse(px, py, 19, 14, 0, 0, 6.283); shape(ctx, i < leeg ? '#9AA6B4' : '#EEF2F6', '#AEB8C4', 1.5); if (i >= leeg) tablet(ctx, px, py, 13, 1); else { ctx.strokeStyle = '#7A8696'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px - 10, py - 4); ctx.lineTo(px + 6, py + 6); ctx.stroke(); } }
  text(ctx, naam, 0, 64, fTekst(15, 800), '#3A4458', 'center'); ctx.restore(); }

// ---- Sam op de bank, enkel ingezwachteld op een kussen ----
function bankSam(ctx, x, vloer, h, o = {}) { const { t = 0, uit = 'neutraal', pose = 'staan', hold = null, koel = 0, pijn = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hE = h * 1.04, hh = hE / 6.1, zit = vloer - hh * 2.1, heup = zit - hh * 0.15, Y = heup + hE * (2.65 / 6.1);
  // bank: rugleuning, zitting, armleuning
  roundRect(ctx, x - hh * 2.6, zit - hh * 2.7, hh * 4.6, hh * 2.9, 26); shape(ctx, '#5A4A6E', '#6E5C86', 2);
  roundRect(ctx, x - hh * 3.1, zit - hh * 1.3, hh * 0.9, hh * 2.6, 20); shape(ctx, '#665480', '#7A6896', 2);
  roundRect(ctx, x - hh * 2.4, zit, hh * 4.8, hh * 0.9, 18); shape(ctx, '#6E5C86', '#7E6C98', 2); ctx.fillStyle = '#3E3250'; ctx.fillRect(x - hh * 2.2, zit + hh * 0.9, hh * 0.3, vloer - zit - hh * 0.9); ctx.fillRect(x + hh * 1.9, zit + hh * 0.9, hh * 0.3, vloer - zit - hh * 0.9);
  // poef met kussen voor de enkel
  const px = x + hh * 3.35, pTop = heup + hh * 0.55; roundRect(ctx, px - hh * 0.85, pTop, hh * 1.7, vloer - pTop, 16); shape(ctx, '#7A6448', '#8C7658', 2); roundRect(ctx, px - hh * 0.95, pTop - hh * 0.32, hh * 1.9, hh * 0.42, 16); shape(ctx, '#C98A5C', '#DDA070', 2);
  // Sam zelf (bovenlijf), benen apart
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, 0, 2 * h, heup + hh * 0.35); ctx.clip(); const r = persoon(ctx, 'sam', x, Y, h, { t, uit, pose, kijk: 1, outfit: 'sport', hold }); ctx.restore();
  const huid = '#7A5440', broek = '#2A2F3E'; ctx.lineCap = 'round';
  // achterste been: knie gebogen, voet op de vloer
  const k1 = [x + hh * 1.25, heup + hh * 0.05]; ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.4; ctx.beginPath(); ctx.moveTo(k1[0], k1[1]); ctx.lineTo(k1[0] + hh * 0.1, vloer - hh * 0.3); ctx.stroke();
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.ellipse(k1[0] + hh * 0.3, vloer - hh * 0.14, hh * 0.42, hh * 0.18, 0, Math.PI, 0); ctx.lineTo(k1[0] + hh * 0.72, vloer - hh * 0.04); ctx.lineTo(k1[0] - hh * 0.12, vloer - hh * 0.04); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = _donker(broek, 0.1); ctx.lineWidth = hh * 0.62; ctx.beginPath(); ctx.moveTo(x - hh * 0.2, heup + hh * 0.05); ctx.lineTo(k1[0] - hh * 0.35, heup + hh * 0.05); ctx.stroke(); ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(k1[0] - hh * 0.3, heup + hh * 0.05); ctx.lineTo(k1[0], k1[1]); ctx.stroke();
  // voorste been: gestrekt naar het kussen
  const k2 = [x + hh * 1.35, heup - hh * 0.05], enk = [px - hh * 0.15, pTop - hh * 0.38];
  ctx.strokeStyle = broek; ctx.lineWidth = hh * 0.62; ctx.beginPath(); ctx.moveTo(x + hh * 0.15, heup - hh * 0.05); ctx.lineTo(k2[0] - hh * 0.4, heup - hh * 0.06); ctx.stroke();
  ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(k2[0] - hh * 0.4, heup - hh * 0.06); ctx.lineTo(k2[0], k2[1]); ctx.lineTo(enk[0], enk[1]); ctx.stroke();
  // zwachtel om enkel en voet, voet omhoog
  const vt = [enk[0] + hh * 0.3, enk[1] - hh * 0.5]; ctx.strokeStyle = '#ECEAE4'; ctx.lineWidth = hh * 0.5; ctx.beginPath(); ctx.moveTo(enk[0] - hh * 0.55, enk[1] - hh * 0.02); ctx.lineTo(enk[0], enk[1]); ctx.lineTo(vt[0], vt[1]); ctx.stroke();
  ctx.strokeStyle = '#C9C4B8'; ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { const u = i / 5, bx = lerp(enk[0] - hh * 0.5, enk[0] + hh * 0.2, u), by = lerp(enk[1], enk[1] - hh * 0.3, u * u); ctx.beginPath(); ctx.moveTo(bx - hh * 0.12, by - hh * 0.2); ctx.lineTo(bx + hh * 0.14, by + hh * 0.2); ctx.stroke(); }
  ctx.fillStyle = huid; ctx.beginPath(); ctx.ellipse(vt[0] + hh * 0.04, vt[1] - hh * 0.12, hh * 0.15, hh * 0.13, 0.5, 0, 6.283); ctx.fill();
  if (koel > 0.01) { ctx.save(); ctx.globalAlpha *= koel; ctx.translate(enk[0] - hh * 0.1, enk[1] - hh * 0.32); ctx.rotate(-0.25); roundRect(ctx, -hh * 0.55, -hh * 0.22, hh * 1.1, hh * 0.44, 12); shape(ctx, '#6FB8E0', '#A8DCF4', 2.5); ctx.strokeStyle = rgba('#FFFFFF', 0.6); ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(k * hh * 0.25 - 6, -hh * 0.12); ctx.lineTo(k * hh * 0.25 + 6, hh * 0.12); ctx.stroke(); } ctx.restore(); }
  if (pijn > 0.01) { ctx.save(); ctx.globalAlpha *= pijn; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const an = -2.1 + k * 0.55, r0 = hh * 0.75 + Math.sin(t * 6 + k) * 5; ctx.beginPath(); ctx.moveTo(enk[0] + Math.cos(an) * r0, enk[1] + Math.sin(an) * r0); ctx.lineTo(enk[0] + Math.cos(an) * (r0 + 26), enk[1] + Math.sin(an) * (r0 + 26)); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); return Object.assign({}, r, { enkel: { x: enk[0], y: enk[1] } }); }
// bijzettafeltje
function tafeltje(ctx, x, vloer, w = 220, hgt = 210) { roundRect(ctx, x - w / 2, vloer - hgt, w, 22, 8); shape(ctx, '#8C6A44', '#A88258', 2); ctx.fillStyle = '#6E5236'; ctx.fillRect(x - w / 2 + 16, vloer - hgt + 22, 14, hgt - 22); ctx.fillRect(x + w / 2 - 30, vloer - hgt + 22, 14, hgt - 22); }
function glas(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y - 90); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 26, y - 90); ctx.fillStyle = rgba('#CFE4F0', 0.12); ctx.fill(); ctx.fillStyle = rgba('#8CC4E8', 0.45); ctx.beginPath(); ctx.moveTo(x - 24, y - 55); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 24, y - 55); ctx.fill(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 26, y - 90); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 26, y - 90); ctx.stroke(); ctx.restore(); }

// ---- H3 ----
function bloedbuis(ctx, x, y, s, a = 1, vul = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-28, -120); ctx.lineTo(-28, 120); ctx.arc(0, 120, 28, Math.PI, 0, true); ctx.lineTo(28, -120); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#A8323A'; const top = lerp(150, -60, vul); ctx.fillRect(-28, top, 56, 200); ctx.fillStyle = rgba('#E8B04A', 0.35); ctx.fillRect(-28, top, 56, 14); ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-28, -120); ctx.lineTo(-28, 120); ctx.arc(0, 120, 28, Math.PI, 0, true); ctx.lineTo(28, -120); ctx.stroke(); roundRect(ctx, -36, -170, 72, 56, 10); shape(ctx, '#7A5AA8', '#9A7AC8', 2);
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-28, -60, 56, 70); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-20, -44 + i * 18); ctx.lineTo(16 - i * 8, -44 + i * 18); ctx.stroke(); } ctx.restore(); }
// balk bloedspiegel met twee grenzen; w = breedte; g1, g2 = grenzen (0..1); v = spiegel (0..1)
function spiegelBalk(ctx, x, y, w, g1, g2, v, a = 1, tl = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 54;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.text2, 0.18), C.line, 1.5); ctx.fillStyle = rgba(C.groen, 0.45); ctx.fillRect(x + w * g1, y, w * (g2 - g1), h); ctx.fillStyle = rgba(C.koraal, 0.35); roundRect(ctx, x + w * g2, y, w * (1 - g2), h, 14); ctx.fill();
  ctx.strokeStyle = C.text; ctx.lineWidth = 4; for (const g of [g1, g2]) { ctx.beginPath(); ctx.moveTo(x + w * g, y - 18); ctx.lineTo(x + w * g, y + h + 18); ctx.stroke(); }
  if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; text(ctx, 'werkt niet', x + w * g1 / 2, y + h + 50, fTekst(26, 700), C.text2, 'center'); text(ctx, 'goed', x + w * (g1 + g2) / 2, y + h + 50, fTekst(26, 700), C.groen, 'center'); text(ctx, 'giftig', x + w * (g2 + 1) / 2, y + h + 50, fTekst(26, 700), C.koraal, 'center'); ctx.restore(); }
  const vx = x + w * v; ctx.fillStyle = '#A8323A'; ctx.beginPath(); ctx.moveTo(vx, y - 6); ctx.bezierCurveTo(vx - 22, y - 34, vx - 14, y - 58, vx, y - 70); ctx.bezierCurveTo(vx + 14, y - 58, vx + 22, y - 34, vx, y - 6); ctx.fill(); ctx.restore(); }
function paraDoos(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#C9D2DC'; ctx.beginPath(); ctx.moveTo(-170, -110); ctx.lineTo(-130, -150); ctx.lineTo(210, -150); ctx.lineTo(170, -110); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#AEB8C4'; ctx.beginPath(); ctx.moveTo(170, -110); ctx.lineTo(210, -150); ctx.lineTo(210, 70); ctx.lineTo(170, 110); ctx.closePath(); ctx.fill();
  roundRect(ctx, -170, -110, 340, 220, 6); shape(ctx, '#F4F6F8', '#C9D2DC', 2); ctx.fillStyle = '#3E7BB8'; ctx.fillRect(-170, -110, 340, 52);
  text(ctx, 'PARACETAMOL', 0, -72, fTekst(32, 800), '#FFFFFF', 'center'); text(ctx, '500 mg · 20 tabletten', 0, -20, fTekst(22, 600), '#3A4458', 'center');
  if (hl > 0.01) { roundRect(ctx, -150, 12, 300, 64, 10); shape(ctx, rgba(C.goud, 0.35 * hl), rgba('#B8862A', hl), 3); }
  text(ctx, 'max. per dag', 0, 54, fTekst(30, 800), '#2A3446', 'center'); ctx.restore(); }
function lever(ctx, x, y, s, a = 1, schade = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, -40); ctx.bezierCurveTo(-150, -110, 40, -120, 170, -80); ctx.bezierCurveTo(200, -60, 160, -10, 110, 10); ctx.bezierCurveTo(40, 50, -60, 90, -120, 70); ctx.bezierCurveTo(-180, 50, -190, 0, -170, -40); ctx.closePath(); shape(ctx, '#8E3B32', '#B85A4A', 3);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5E221C', 0.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, -110); ctx.quadraticCurveTo(10, -20, -40, 80); ctx.stroke();
  if (schade > 0.01) for (let i = 0; i < 9; i++) { const px = -130 + hash(i * 7) * 260, py = -80 + hash(i * 11 + 3) * 140; ctx.beginPath(); ctx.ellipse(px, py, 22 * schade + 4, 16 * schade + 3, hash(i) * 3, 0, 6.283); ctx.fillStyle = rgba('#D9B26A', 0.75 * schade); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ---- H4 ----
// ronde inzoom (geen verbindingslijn): tekent fn binnen de cirkel
function inzoom(ctx, x, y, r, a, col, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#16233A'; ctx.fill(); ctx.save(); ctx.clip(); fn(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
// maagwand: rij cellen met slijmlaag erboven; dikte 0..1, schade 0..1
function maagwand(ctx, x, y, w, dikte, schade = 0, t = 0) { const n = 7, cw = w / n; for (let i = 0; i < n; i++) { const cx = x + i * cw; const kap = schade > 0.01 && (i === 3 || i === 4) ? schade : 0;
    roundRect(ctx, cx + 3, y + kap * 40, cw - 6, 150 - kap * 40, 14); shape(ctx, kap ? _mix('#D99A8A', kap * 0.5, '#8E3B32') : '#D99A8A', '#F0B8A6', 2); circ(ctx, cx + cw / 2, y + 100, 12, '#8C5A6A'); }
  if (dikte > 0.01) { const h = 70 * dikte; ctx.fillStyle = rgba(C.groen, 0.35); ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= 20; k++) ctx.lineTo(x + w * k / 20, y - h - Math.sin(k * 1.3 + t) * 5 * dikte); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = rgba('#E8D06A', 0.35); for (let i = 0; i < 14; i++) { const w2 = wander(i, t, 20, 0.6); circ(ctx, x + hash(i * 3) * w + w2.x * 0.5, y - 120 - hash(i * 5) * 60 + w2.y, 5, rgba('#E8D06A', 0.5)); } }
// steroïdskelet (drie zeshoeken + vijfhoek); dubbel = extra dubbele binding in ring A (prednison)
function steroid(ctx, x, y, L, col, a = 1, dubbel = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  const hex = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + k * Math.PI / 3; ctx[k ? 'lineTo' : 'moveTo'](cx + Math.cos(an) * L, cy + Math.sin(an) * L); } ctx.closePath(); ctx.stroke(); };
  const A = [x, y], B = [x + Math.sqrt(3) * L, y], Cc = [B[0] + 0.866 * L, y - 1.5 * L]; hex(...A); hex(...B); hex(...Cc);
  const P = [Cc[0] + 0.866 * L + 0.688 * L, Cc[1]], R = 0.851 * L; ctx.beginPath(); [144, 72, 0, -72, -144].forEach((d, k) => { const an = d * Math.PI / 180; ctx[k ? 'lineTo' : 'moveTo'](P[0] + Math.cos(an) * R, P[1] - Math.sin(an) * R); }); ctx.closePath(); ctx.stroke();
  // zijgroepen (=O links, OH-staart rechts)
  ctx.beginPath(); ctx.moveTo(x - 0.866 * L, y + 0.5 * L); ctx.lineTo(x - 1.6 * L, y + 0.95 * L); ctx.stroke(); ctx.beginPath(); ctx.moveTo(P[0] + R * 0.3, P[1] - R * 0.95); ctx.lineTo(P[0] + R * 0.9, P[1] - R * 1.7); ctx.stroke();
  if (dubbel) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); const p1 = [x + Math.cos(-Math.PI / 2) * L * 0.75, y + Math.sin(-Math.PI / 2) * L * 0.75], p2 = [x + Math.cos(-Math.PI / 6) * L * 0.75, y + Math.sin(-Math.PI / 6) * L * 0.75]; ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.stroke(); }
  ctx.restore(); }
// cel met receptor binnenin (voor prednison); aan 0..1
function cortCel(ctx, x, y, r, a = 1, aan = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(KL.cyto, 0.9); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r - 9, 0, 6.283); ctx.stroke();
  ctx.save(); ctx.translate(x - r * 0.15, y + r * 0.05); receptor(ctx, r / 150, 1, aan, C.paars); ctx.restore(); if (aan > 0.01) steroid(ctx, x - r * 0.15 - 12, y - r * 0.32, 6, C.goud, aan, true); ctx.restore(); }
// effecticoontjes
function suikerOmhoog(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = Math.round(3 + 5 * u); for (let i = 0; i < n; i++) zeshoek(ctx, x - 60 + (i % 4) * 40, y + 20 - Math.floor(i / 4) * 40, 15, C.text, 1); pijl(ctx, x + 110, y + 40, x + 110, y - 60, C.koraal, u, 6, 22); ctx.restore(); }
function huidLagen(ctx, x, y, w, dun = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = 1 - 0.6 * dun; roundRect(ctx, x, y, w, 26 * d, 6); shape(ctx, '#C99A7A', '#E0B494', 2); roundRect(ctx, x, y + 30 * d, w, 70 * d, 6); shape(ctx, '#B87E6A', '#D09888', 2); roundRect(ctx, x, y + 104 * d, w, 40, 6); shape(ctx, '#E8D6A8', '#F4E6C0', 2); ctx.restore(); }
function bot(ctx, x, y, s, broos = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#ECE4D0'; ctx.strokeStyle = '#C9BFA8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-90, -14); ctx.lineTo(90, -14); ctx.arc(104, -26, 22, Math.PI * 0.8, Math.PI * 2.2); ctx.arc(104, 26, 22, -Math.PI * 0.2, Math.PI * 1.2); ctx.lineTo(-90, 14); ctx.arc(-104, 26, 22, Math.PI * 0.2 - 0.4, Math.PI * 1.8); ctx.arc(-104, -26, 22, Math.PI * 0.8 - 1.4, Math.PI * 1.8 - 0.6); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (broos > 0.01) for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.ellipse(-80 + hash(i * 3) * 160, -8 + hash(i * 7) * 16, 4 + 4 * broos, 3 + 3 * broos, 0, 0, 6.283); ctx.fillStyle = rgba('#5A5040', 0.7 * broos); ctx.fill(); } ctx.restore(); }
function weegschaal(ctx, x, y, s, kant, a = 1, l = '', r = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, 120); ctx.moveTo(-80, 120); ctx.lineTo(80, 120); ctx.stroke(); const an = kant * 0.12; ctx.save(); ctx.translate(0, -150); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(260, 0); ctx.stroke(); ctx.restore(); circ(ctx, 0, -150, 14, '#E0B64A');
  for (const k of [-1, 1]) { const ex = k * 260 * Math.cos(an), ey = -150 + k * 260 * Math.sin(an); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 70, ey + 110); ctx.moveTo(ex, ey); ctx.lineTo(ex + 70, ey + 110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(ex, ey + 112, 90, 18, 0, 0, Math.PI); ctx.fillStyle = '#8C939E'; ctx.fill();
    text(ctx, k < 0 ? l : r, ex, ey + 175, fTekst(30, 800), k < 0 ? C.groen : C.koraal, 'center'); } ctx.restore(); }

// muis zonder implantaat (proefdier)
function muisKaal(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20, -200, -30, -240, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5); ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A'); ctx.restore(); }

// ---- recap ----
function schaaltje(ctx, x, y, r, a = 1, t = 0, kleur = C.teal, seed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 3); ctx.beginPath(); ctx.ellipse(x, y + 4, r * 0.88, r * 0.34, 0, 0, 6.283); ctx.fillStyle = rgba('#E8C8A0', 0.35); ctx.fill();
  for (let i = 0; i < 14; i++) { const an = hash(i * 3 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + seed)) * 0.75; circ(ctx, x + Math.cos(an) * r * rr, y + 4 + Math.sin(an) * r * 0.3 * rr, 7, rgba(kleur, 0.75), lighten(kleur, 0.3), 1.2); } ctx.restore(); }

// klok met wijzers; uren = verstreken uren (wijzers draaien mee)
function klok(ctx, x, y, r, uren, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 4); ctx.strokeStyle = '#3A4458'; ctx.lineCap = 'round';
  for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; ctx.lineWidth = k % 3 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82); ctx.lineTo(x + Math.sin(an) * r * 0.92, y - Math.cos(an) * r * 0.92); ctx.stroke(); }
  const h0 = 2; const aH = (h0 + uren) / 12 * 6.283, aM = uren * 6.283; if (uren > 0.01) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, -Math.PI / 2 + h0 / 12 * 6.283, -Math.PI / 2 + aH); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.45); ctx.fill(); }
  ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(aH) * r * 0.5, y - Math.cos(aH) * r * 0.5); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(aM) * r * 0.75, y - Math.cos(aM) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#3A4458'); ctx.restore(); }
