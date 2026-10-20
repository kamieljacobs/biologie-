// Wat word jij? · Leraar biologie 1 · Waar blijft je vet? — eigen tekeningen (20 okt 2026)

// schoolbord met krijtrand; regels = [[tekst, alpha], …] in krijtletters
function schoolbord(ctx, x, y, w, h, a = 1, regels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 10); shape(ctx, '#6B5440', '#4A3A2E', 2); roundRect(ctx, x, y, w, h, 6); shape(ctx, '#2F4A3E', null);
  ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + w * 0.1, y + h + 14, w * 0.8, 12); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x + w * 0.2, y + h + 8, 40, 8);
  regels.forEach(([s2, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, s2, x + 40, y + 70 + i * 62, fTekst(40, 600), '#E8EEE6', 'left'); ctx.restore(); } }); ctx.restore(); }

// atoom: C grijs, O rood, H wit
const AT = { C: ['#5A6170', '#9AA3B2', 22], O: ['#D8573F', '#F08A70', 20], H: ['#E8E8E2', '#FFFFFF', 13] };
function atoom(ctx, el, x, y, s = 1) { const [f, r, rr] = AT[el]; circ(ctx, x, y, rr * s, f, r, 2); }

// vetmolecuul (schematisch): glycerol + drie ketens van C met H; u 0..1 = atomen gaan op weg als CO2 (naar rechtsboven) en H2O
function vetMolecuul(ctx, x, y, s, a = 1, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pts = []; for (let k = 0; k < 3; k++) { const yy = y + (k - 1) * 100 * s; pts.push(['O', x - 50 * s, yy]); for (let i = 0; i < 7; i++) pts.push(['C', x + i * 64 * s, yy + (i % 2 ? -16 : 16) * s]); }
  pts.push(['C', x - 110 * s, y - 100 * s], ['C', x - 110 * s, y], ['C', x - 110 * s, y + 100 * s]);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s; ctx.globalAlpha *= 1 - u * 0.85;
  for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const p = pts[k * 8 + i]; i ? ctx.lineTo(p[1], p[2]) : ctx.moveTo(p[1], p[2]); } ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x - 110 * s, y - 100 * s); ctx.lineTo(x - 110 * s, y + 100 * s); ctx.stroke(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x - 110 * s, y + (k - 1) * 100 * s); ctx.lineTo(x - 50 * s, y + (k - 1) * 100 * s); ctx.stroke(); }
  pts.forEach(([el, px, py], i) => { if (el === 'C' && i < 24 && i % 8) { const up = (i % 8) % 2 ? -1 : 1; atoom(ctx, 'H', px, py + up * 34 * s, s * 0.8); } atoom(ctx, el, px, py, s); });
  ctx.restore();
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 9; i++) { const f = clamp(u * 1.6 - i * 0.07, 0, 1); if (f <= 0) continue; const sx = x + (i % 3) * 150 * s, sy = y + (Math.floor(i / 3) - 1) * 100 * s; const tx = sx + f * (380 + 30 * i) * s, ty = sy - f * (200 + 25 * (i % 4)) * s + Math.sin(t * 2 + i) * 6;
      if (i % 4 === 3) { atoom(ctx, 'O', tx, ty, s); atoom(ctx, 'H', tx - 20 * s, ty + 14 * s, s); atoom(ctx, 'H', tx + 20 * s, ty + 14 * s, s); }
      else { atoom(ctx, 'O', tx - 34 * s, ty, s); atoom(ctx, 'C', tx, ty, s); atoom(ctx, 'O', tx + 34 * s, ty, s); } } ctx.restore(); } }

// staaf van tien kilo vet: deel via koolstofdioxide (uitgeademd) en via water
function kiloStaaf(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 70;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#2A3446', C.line, 1.5); const w1 = w * 0.84 * clamp(u * 2, 0, 1), w2 = w * 0.16 * clamp(u * 2 - 1, 0, 1);
  if (w1 > 2) { roundRect(ctx, x, y, w1, h, 12); shape(ctx, rgba(C.grain, 0.55), C.grain, 2); text(ctx, '8,4 kilo eruit via koolstofdioxide', x + 24, y + 46, fTekst(30, 700), C.text, 'left'); }
  if (w2 > 2) { roundRect(ctx, x + w * 0.84, y, w2, h, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2); text(ctx, '1,6 kilo via water', x + w * 0.92, y + h + 40, fTekst(28, 700), C.teal, 'center'); }
  metaText(ctx, 'TIEN KILO VET', x, y - 18, C.grain, 'left', 24); ctx.restore(); }

// telpoppetje (alleen in groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// gedachtewolk met idee-blokken; nieuw = blok dat er niet in past (stuitert af)
function ideeWolk(ctx, x, y, w, h, a = 1, blokken = [], nieuw = null, nu = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * 6.283; ctx.ellipse(x + Math.cos(an) * w * 0.36, y + Math.sin(an) * h * 0.32, w * 0.2, h * 0.24, 0, 0, 6.283); } ctx.fillStyle = '#2E3D5C'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, w * 0.48, h * 0.44, 0, 0, 6.283); ctx.fill(); circ(ctx, x - w * 0.36, y + h * 0.62, 16, '#2E3D5C'); circ(ctx, x - w * 0.44, y + h * 0.82, 10, '#2E3D5C');
  blokken.forEach(([s2, col], i) => { ctx.font = fTekst(28, 700); const bw = ctx.measureText(s2).width + 36; const bx = x - bw / 2, by = y - 70 + i * 62; roundRect(ctx, bx, by, bw, 48, 8); shape(ctx, rgba(col, 0.35), col, 2); text(ctx, s2, x, by + 33, fTekst(28, 700), C.text, 'center'); });
  if (nieuw && nu > 0.01) { ctx.font = fTekst(28, 700); const bw = ctx.measureText(nieuw).width + 36; const d = (1 - clamp(nu * 1.4, 0, 1)) * 300, wob = nu > 0.7 ? Math.sin(t * 9) * 10 * (1 - nu) : 0; const bx = x + w * 0.42 + d + wob, by = y - 30;
    ctx.save(); ctx.translate(bx + bw / 2, by + 24); ctx.rotate(0.18 + wob * 0.01); roundRect(ctx, -bw / 2, -24, bw, 48, 8); shape(ctx, rgba(C.teal, 0.35), C.teal, 2); text(ctx, nieuw, 0, 9, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// kaartje met stapnummer (voorspellen / waarnemen / verklaren)
function stapKaart(ctx, x, y, w, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(col, 0.08 + 0.17 * aan), rgba(col, 0.35 + 0.65 * aan), 2); circ(ctx, x + 46, y + 48, 26, rgba(col, 0.3 + 0.5 * aan)); text(ctx, String(nr), x + 46, y + 60, fTekst(32, 800), C.text, 'center'); text(ctx, s2, x + 90, y + 60, fTekst(32, 700), C.text, 'left'); ctx.restore(); }

// reageerbuis met kalkwater en een rietje; tr 0..1 = troebel; bel = bubbels
function kalkBuis(ctx, x, y, s, a = 1, tr = 0, bel = 0, t = 0, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -200); ctx.lineTo(-40, 120); ctx.arc(0, 120, 40, Math.PI, 0, true); ctx.lineTo(40, -200); ctx.fillStyle = rgba('#CFE4F0', 0.08); ctx.fill();
  ctx.save(); ctx.clip(); const vl = rgba('#BFD8E6', 0.35); ctx.fillStyle = vl; ctx.fillRect(-40, -60, 80, 230); if (tr > 0.01) { ctx.fillStyle = rgba('#F2F2EE', 0.75 * tr); ctx.fillRect(-40, -60, 80, 230); }
  if (bel > 0.01) for (let i = 0; i < 8; i++) { const ph = (t * 1.2 + i / 8) % 1; circ(ctx, -8 + Math.sin(i * 3) * 14, 140 - ph * 200, 5 + (i % 3) * 2, rgba('#FFFFFF', 0.6 * bel)); } ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -200); ctx.lineTo(-40, 120); ctx.arc(0, 120, 40, Math.PI, 0, true); ctx.lineTo(40, -200); ctx.stroke();
  ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 140); ctx.lineTo(-6, -260); ctx.lineTo(-60, -300); ctx.stroke();
  if (lab) text(ctx, lab, 0, 230, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// tegeltjes: rij leesmomenten of ophaalmomenten
function leerTegel(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = soort === 'lees' ? C.oker : C.groen; roundRect(ctx, x, y, 120, 120, 14); shape(ctx, rgba(col, 0.2), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'lees') { ctx.beginPath(); ctx.moveTo(x + 60, y + 38); ctx.quadraticCurveTo(x + 38, y + 28, x + 20, y + 34); ctx.lineTo(x + 20, y + 84); ctx.quadraticCurveTo(x + 38, y + 78, x + 60, y + 88); ctx.quadraticCurveTo(x + 82, y + 78, x + 100, y + 84); ctx.lineTo(x + 100, y + 34); ctx.quadraticCurveTo(x + 82, y + 28, x + 60, y + 38); ctx.lineTo(x + 60, y + 88); ctx.stroke(); }
  else { ctx.strokeRect(x + 28, y + 24, 54, 72); [44, 58, 72].forEach(yy => { ctx.beginPath(); ctx.moveTo(x + 38, y + yy); ctx.lineTo(x + 70, y + yy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x + 96, y + 30); ctx.lineTo(x + 72, y + 92); ctx.stroke(); }
  text(ctx, soort === 'lees' ? 'lezen' : 'ophalen', x + 60, y + 154, fTekst(24, 700), C.text2, 'center'); ctx.restore(); }

// staafjes onthouden: paren (lezen, ophalen) na vijf minuten en na een week (waarden in procenten)
function onthoudStaven(ctx, x, y, w, h, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const V = [[[81, 75], u1, 'na vijf minuten'], [[40, 61], u2, 'na een week']]; V.forEach(([[l, o], u, lab], g) => { const gx = x + 60 + g * w * 0.5; [[l, C.oker, 'lezen'], [o, C.groen, 'ophalen']].forEach(([v, col, n], k) => { const hh = h * v / 100 * clamp(u, 0, 1), bx = gx + k * 130; roundRect(ctx, bx, y + h - hh, 100, hh, 8); shape(ctx, rgba(col, 0.6), col, 2); if (u > 0.95 && g === 1) text(ctx, v + '%', bx + 50, y + h - hh - 14, fTekst(30, 800), C.text, 'center'); text(ctx, n, bx + 50, y + h + 34, fTekst(24, 600), C.text2, 'center'); }); text(ctx, lab, gx + 115, y + h + 76, fTekst(28, 700), C.text, 'center'); });
  metaText(ctx, 'WAT WEET JE NOG? · VOORAL HET VERSCHIL TELT', x, y - 18, C.grain, 'left', 22); ctx.restore(); }

// rij boeken (hoofdstukken) met een gouden draad erdoorheen
function boekenRij(ctx, x, y, a = 1, draad = 0, namen = ['Vertering', 'Ademhaling', 'Planten', 'Cellen', 'Ecologie']) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cols = [C.oker, C.koraal, C.groen, C.paars, C.teal];
  namen.forEach((n, i) => { const bx = x + i * 150; roundRect(ctx, bx, y, 110, 230, 8); shape(ctx, rgba(cols[i], 0.45), cols[i], 2); ctx.save(); ctx.translate(bx + 60, y + 115); ctx.rotate(-Math.PI / 2); text(ctx, n, 0, 10, fTekst(28, 700), C.text, 'center'); ctx.restore(); });
  if (draad > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const L = 150 * namen.length; for (let k = 0; k <= 60 * draad; k++) { const f = k / 60, xx = x - 40 + f * (L + 20), yy = y + 115 + Math.sin(f * 18) * 30; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// darmvlok: vinger met bloedvaatjes en microvilli-randje
function darmvlok(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(k * 80 - 30, 90); ctx.lineTo(k * 80 - 30, -40); ctx.arc(k * 80, -40, 30, Math.PI, 0); ctx.lineTo(k * 80 + 30, 90); shape(ctx, '#D99A8A', '#F0B8A6', 2.5); ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(k * 80 - 8, 90); ctx.lineTo(k * 80 - 8, -40); ctx.arc(k * 80, -40, 8, Math.PI, 0); ctx.lineTo(k * 80 + 8, 90); ctx.stroke(); }
  ctx.fillStyle = '#C98A7A'; ctx.fillRect(-140, 90, 280, 30); ctx.restore(); }
// longblaasjes: trosje
function longblaasjes(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(0, 30); ctx.moveTo(0, 50); ctx.lineTo(-50, 0); ctx.moveTo(0, 50); ctx.lineTo(50, 0); ctx.stroke();
  [[-70, -30], [-40, -70], [0, -40], [40, -70], [70, -30], [-90, 20], [90, 20], [0, -90], [-20, 0], [20, 0]].forEach(([dx, dy]) => circ(ctx, dx, dy, 30, '#E3A8B0', '#F4C8CE', 2.5)); ctx.restore(); }
// wortel met wortelharen
function wortelharen(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -120); ctx.quadraticCurveTo(10, 0, -6, 120); ctx.stroke(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#E8D6A8';
  for (let i = 0; i < 26; i++) { const yy = -70 + i * 6.5, side = i % 2 ? 1 : -1, xx = 3 + side * 10; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + side * 30, yy + 4, xx + side * (50 + (i % 4) * 8), yy + 10); ctx.stroke(); }
  ctx.restore(); }
