// Wat word jij? · Laboratoriumtechniek 2 · Van buisje tot uitslag — eigen tekeningen (24 okt 2026)
// Labvoorwerpen in Schema-look: transportbuisje met barcode, wattenstaafje, scanner, handpipet, eppendorfbuisjes,
// pipetteerrobot, plaat met 96 putjes, probe op DNA, amplificatiegrafiek, ijklijn, controlekaart, reagensflesje, vriezer, telefoon.

const KL_OPA = '#E0B64A', KL_ANDER = '#5BA4C9', KL_RNA = '#E07A5F';
function zacht2(ctx, a, f) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); }

// wattenstaafje: steel met watten aan het eind (x,y = eind van de steel), richting rot
function wattenstaafje2(ctx, x, y, rot = -1.57, a = 1, len = 150) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(len + 10, 0, 16, 8, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 1.5); }); }

// barcode (deterministisch)
function barcode(ctx, x, y, w, h, seed = 3) { ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#121A26'; let xx = x + 4; let i = 0;
  while (xx < x + w - 6) { const bw = 1.5 + Math.floor(hash(seed * 31 + i) * 3) * 1.5; if (i % 2 === 0) ctx.fillRect(xx, y + 3, bw, h - 6); xx += bw + 1.5; i++; } }

// transportbuisje met oranje dop, vloeistof en etiket met barcode; o.etiket=false = zonder naam
function transportBuis(ctx, x, y, s = 1, a = 1, o = {}) { const { etiket = true, staaf = true, naam = 'H. de Vries' } = o; zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -170, 52, 230, 24); shape(ctx, rgba('#CFE4F0', 0.14), '#AFC0D0', 2.5);
  ctx.fillStyle = rgba('#E8D9A8', 0.55); roundRect(ctx, -22, -20, 44, 76, 20); ctx.fill();
  if (staaf) { ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -190); ctx.lineTo(0, 20); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 30, 7, 15, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 1.2); }
  roundRect(ctx, -32, -212, 64, 46, 8); shape(ctx, '#E07A5F', '#C9654B', 2); ctx.fillStyle = '#C9654B'; for (let k = 0; k < 5; k++) ctx.fillRect(-26 + k * 12, -206, 5, 34);
  if (etiket) { roundRect(ctx, -30, -140, 60, 108, 4); shape(ctx, '#F2F2EE', '#C9CED6', 1); barcode(ctx, -24, -132, 48, 40, 7); ctx.save(); ctx.translate(0, -60); ctx.rotate(-1.5708); text(ctx, naam, 0, 6, fTekst(13, 700), '#121A26', 'center'); ctx.restore(); } }); }

// handscanner met rode lichtstraal (beam 0..1) naar (tx,ty)
function handScanner(ctx, x, y, s = 1, a = 1, beam = 0, tx = 0, ty = 0) { zacht2(ctx, a, () => {
  if (beam > 0.01) { ctx.save(); ctx.globalAlpha *= beam * 0.6; ctx.fillStyle = '#E05A4A'; ctx.beginPath(); ctx.moveTo(x + 40 * s, y - 10 * s); ctx.lineTo(tx, ty - 30); ctx.lineTo(tx, ty + 30); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -34, 110, 52, 18); shape(ctx, '#3A4458', '#5A6478', 2); roundRect(ctx, -40, 0, 34, 90, 12); shape(ctx, '#3A4458', '#5A6478', 2); ctx.fillStyle = '#E05A4A'; ctx.fillRect(40, -24, 8, 32); ctx.restore(); }); }

// beeldscherm met regels: rows = [[tekst, alpha, kleur, vink(0..1)]]
function labScherm(ctx, x, y, w, h, a = 1, titel = '', rows = [], px = 28) { zacht2(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1826', '#5A6478', 3); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + w / 2 - 14, y + h, 28, 30); roundRect(ctx, x + w / 2 - 90, y + h + 26, 180, 14, 6); shape(ctx, '#5A6478', null);
  if (titel) metaText(ctx, titel, x + 30, y + 46, C.grain, 'left', 20);
  rows.forEach(([s2, al, col, vk], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + 100 + i * (px + 30); text(ctx, s2, x + 80, yy, fTekst(px, 600), col || C.text, 'left');
    if (vk != null) { if (vk > 0.01) vink_(ctx, x + 44, yy - 10, 14, vk); else { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x + 32, yy - 24, 24, 24); } } ctx.restore(); }); }); }

// handpipet (verticaal), x,y = punt van de tip; disp = tekst op het display; drup 0..1 = druppel aan de tip
function handPipet(ctx, x, y, s = 1, a = 1, disp = '10 µl', drup = 0, tipKleur = '#E8ECF2') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.lineTo(12, -120); ctx.lineTo(-12, -120); ctx.closePath(); shape(ctx, rgba(tipKleur, 0.85), '#AFC0D0', 1.5);
  roundRect(ctx, -20, -200, 40, 84, 10); shape(ctx, '#9AA3B2', '#7A8498', 2);
  roundRect(ctx, -38, -470, 76, 280, 30); shape(ctx, '#E8ECF2', '#9AA3B2', 2.5); roundRect(ctx, -28, -420, 56, 44, 6); shape(ctx, '#1C2A3E', null); text(ctx, disp, 0, -390, fMeta(17), '#7FC48F', 'center');
  ctx.beginPath(); ctx.moveTo(30, -440); ctx.quadraticCurveTo(66, -430, 60, -380); ctx.lineWidth = 10; ctx.strokeStyle = '#B8C0D0'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.fillStyle = '#7A8498'; ctx.fillRect(-7, -540, 14, 74); roundRect(ctx, -26, -556, 52, 20, 8); shape(ctx, C.teal, null);
  if (drup > 0.01) { const r = 9 * drup; ctx.beginPath(); ctx.arc(0, 4 + r, r, 0, 6.283); ctx.fillStyle = rgba('#9FD0EA', 0.9); ctx.fill(); } }); }

// eppendorfbuisje; vul 0..1 (hoogte vloeistof), kleur + sterkte (0..1) = concentratie
function eppje(ctx, x, y, s = 1, a = 1, vul = 0.6, sterk = 1, col = KL_RNA, rand = '#AFC0D0') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-34, -120); ctx.lineTo(34, -120); ctx.lineTo(34, -20); ctx.lineTo(8, 60); ctx.quadraticCurveTo(0, 72, -8, 60); ctx.lineTo(-34, -20); ctx.closePath(); };
  pad(); shape(ctx, rgba('#CFE4F0', 0.12), null);
  if (vul > 0.01) { ctx.save(); pad(); ctx.clip(); const top = 66 - vul * 170; ctx.fillStyle = rgba('#9FD0EA', 0.35); ctx.fillRect(-40, top, 80, 200); if (sterk > 0.004) { ctx.fillStyle = rgba(col, 0.12 + 0.78 * sterk); ctx.fillRect(-40, top, 80, 200); } ctx.restore(); }
  pad(); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke(); roundRect(ctx, -40, -138, 80, 20, 6); shape(ctx, '#D8DEE4', '#AFC0D0', 2); ctx.beginPath(); ctx.ellipse(52, -132, 14, 9, 0.3, 0, 6.283); shape(ctx, '#D8DEE4', '#AFC0D0', 2); }); }

// liniaal in millimeter (vergroot) met druppel van d mm
function druppelLiniaal(ctx, x, y, mm = 40, a = 1, d = 2.67) { zacht2(ctx, a, () => { const L = 5 * mm; roundRect(ctx, x - 14, y, L + 28, 66, 6); shape(ctx, '#E8D9A8', '#B8A27A', 2); ctx.strokeStyle = '#4A3A2E'; ctx.lineWidth = 2;
  for (let k = 0; k <= 5; k++) { ctx.beginPath(); ctx.moveTo(x + k * mm, y); ctx.lineTo(x + k * mm, y + 28); ctx.stroke(); text(ctx, String(k), x + k * mm, y + 54, fTekst(20, 700), '#4A3A2E', 'center'); }
  const r = d * mm / 2; ctx.beginPath(); ctx.moveTo(x + r, y - 4 - 2.1 * r); ctx.bezierCurveTo(x + r + r * 0.15, y - 4 - 1.6 * r, x + 2 * r, y - 4 - 1.1 * r, x + 2 * r, y - 4 - r * 0.9); ctx.arc(x + r, y - 4 - r * 0.9, r, 0, Math.PI); ctx.bezierCurveTo(x, y - 4 - 1.1 * r, x + r - r * 0.15, y - 4 - 1.6 * r, x + r, y - 4 - 2.1 * r); ctx.fillStyle = rgba('#9FD0EA', 0.85); ctx.fill(); ctx.strokeStyle = '#5BA4C9'; ctx.stroke(); }); }

// plaat met 96 putjes (8 × 12); fn(i, j) -> [vulkleur, gloei 0..1] of null; x,y linksboven, w breed
function plaat96(ctx, x, y, w, a = 1, fn = null) { zacht2(ctx, a, () => { const h = w * 0.67, p = w / 13.2, r = p * 0.36; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#D8DEE4', '#9AA3B2', 2.5);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) { const cx = x + p * 1.1 + j * p, cy = y + p * 1.0 + i * p * 0.98; const v = fn ? fn(i, j) : null;
    if (v && v[1] > 0.01) { ctx.save(); ctx.globalAlpha *= v[1] * 0.5; circ(ctx, cx, cy, r * 1.7, v[0]); ctx.restore(); }
    circ(ctx, cx, cy, r, v ? v[0] : '#B8C2CE', '#8A94A8', 1.2); } }); }

// pipetteerrobot: portaal met een kop van 8 tips; u 0..1 = positie van de kop over de breedte, z 0..1 = kop omlaag
function pipetRobot(ctx, x, y, w, a = 1, u = 0, z = 0) { zacht2(ctx, a, () => { const h = 400;
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x, y, 22, h); ctx.fillRect(x + w - 22, y, 22, h); roundRect(ctx, x - 10, y - 30, w + 20, 46, 10); shape(ctx, '#4A5468', '#6A7488', 2);
  const kx = x + 60 + u * (w - 220), ky = y + 16; roundRect(ctx, kx, ky, 100, 90 + z * 60, 10); shape(ctx, '#5A6478', '#8A94A8', 2);
  for (let k = 0; k < 8; k++) { const tx = kx + 10 + k * 11.5; ctx.beginPath(); ctx.moveTo(tx - 4, ky + 90 + z * 60); ctx.lineTo(tx + 4, ky + 90 + z * 60); ctx.lineTo(tx + 1, ky + 150 + z * 60); ctx.lineTo(tx - 1, ky + 150 + z * 60); ctx.closePath(); shape(ctx, '#E8ECF2', '#AFC0D0', 1); }
  ctx.fillStyle = C.teal; ctx.fillRect(x + 30, y + h - 14, 60, 6); }); }

// rek met buisjes
function buisRek(ctx, x, y, n = 8, a = 1, s = 0.5) { zacht2(ctx, a, () => { for (let k = 0; k < n; k++) transportBuis(ctx, x + k * 40 * s * 2, y, s, 1, { staaf: false, naam: '' }); roundRect(ctx, x - 40 * s, y + 10 * s, n * 80 * s, 40 * s, 6); shape(ctx, '#5A6478', '#8A94A8', 2); }); }

// stukje dubbelstrengs DNA (horizontaal), x0..x1 op hoogte y; met probe (pos px..px+pw) en polymerase op positie pol (x) ; knip 0..1
function probeOpDNA(ctx, x0, x1, y, a = 1, o = {}) { const { px = 0.55, pw = 260, pol = null, knip = 0, gloei = 0, nieuw = 0, pa = 1 } = o; zacht2(ctx, a, () => {
  ctx.lineCap = 'round'; ctx.strokeStyle = C.paars; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0, y + 60); ctx.lineTo(x1, y + 60); ctx.stroke();
  for (let xx = x0 + 14; xx < x1; xx += 30) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx, y + 54); ctx.lineTo(xx, y + 30); ctx.stroke(); }
  const pX = x0 + (x1 - x0) * px;
  if (nieuw > 0.01 && pol != null) { ctx.strokeStyle = C.teal; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0 + 20, y + 18); ctx.lineTo(Math.max(x0 + 20, pol - 70), y + 18); ctx.stroke(); }
  const rest = clamp(knip, 0, 1);
  ctx.globalAlpha *= pa;
  if (rest < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - rest; ctx.strokeStyle = C.groen; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(pX, y + 18); ctx.lineTo(pX + pw, y + 18); ctx.stroke(); ctx.restore(); }
  const qx = pX + pw + 14 + rest * 60, qy = y + 18 - rest * 90, rx = pX - 14 - rest * 40, ry = y + 18 - rest * 190;
  circ(ctx, qx, qy, 24, '#2A2F3E', '#8A94A8', 3); // blokkeerder
  if (gloei > 0.01) { ctx.save(); ctx.globalAlpha *= gloei * 0.35; circ(ctx, rx, ry, 80, KL_OPA); ctx.globalAlpha = a * gloei * 0.5; circ(ctx, rx, ry, 48, KL_OPA); ctx.restore(); }
  circ(ctx, rx, ry, 24, gloei > 0.3 ? '#F6D77A' : '#7A6A38', '#C9A35C', 3); // kleurstof
  if (pol != null) { ctx.beginPath(); ctx.ellipse(pol, y + 10, 84, 64, 0, 0, 6.283); shape(ctx, rgba(C.enzym, 0.92), '#AFC0D0', 3); } }); }
// amplificatiegrafiek: licht tegen cycli; curves = [{ct, col, u (0..1 getekend)}]; nu = huidige cyclus (0..40); dr = drempel tonen
function ampKromme(ct) { const D = 0.06, k = 0.75, m = ct + Math.log(1 / D - 1) / k; return c => 1 / (1 + Math.exp(-k * (c - m))); }
function ampGrafiek(ctx, x, y, w, h, a = 1, curves = [], nu = 40, dr = 0, o = {}) { zacht2(ctx, a, () => { const X = c => x + c / 40 * w, Y = v => y + h - v * h * 0.92;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  for (let c = 0; c <= 40; c += 10) { text(ctx, String(c), X(c), y + h + 34, fTekst(22, 600), C.text2, 'center'); }
  metaText(ctx, 'aantal cycli', x + w, y + h + 70, C.text2, 'right', 18); metaText(ctx, 'licht', x, y - 16, C.text2, 'left', 18);
  if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; ctx.setLineDash([12, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(0.06)); ctx.lineTo(x + w, Y(0.06)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'drempel', x + w - 8, Y(0.06) - 14, fTekst(24, 700), C.koraal, 'right'); ctx.restore(); }
  curves.forEach(cv => { if ((cv.u ?? 1) <= 0.01) return; const f = ampKromme(cv.ct), cmax = Math.min(nu, 40) * (cv.u ?? 1); ctx.strokeStyle = cv.col; ctx.lineWidth = 5; ctx.beginPath();
    for (let c = 0; c <= cmax; c += 0.25) { const p = [X(c), Y(f(c) - f(0))]; c ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke();
    if (cv.m > 0.01 && cmax >= cv.ct) { ctx.save(); ctx.globalAlpha *= cv.m; ctx.setLineDash([6, 6]); ctx.strokeStyle = cv.col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(cv.ct), Y(0.06)); ctx.lineTo(X(cv.ct), y + h); ctx.stroke(); ctx.setLineDash([]); circ(ctx, X(cv.ct), Y(0.06), 9, cv.col);
      if (cv.lab) { const lx = X(cv.ct) + (cv.lr || 1) * 14; ctx.font = fTekst(26, 700); const tw = ctx.measureText(cv.lab).width; const bx = (cv.lr || 1) > 0 ? lx : lx - tw; roundRect(ctx, bx - 8, y + h - 66, tw + 16, 38, 8); shape(ctx, '#1A2740', null); text(ctx, cv.lab, bx, y + h - 38, fTekst(26, 700), cv.col, 'left'); } ctx.restore(); } }); }); }

// ijklijn: Ct (verticaal, omhoog = hoger) tegen log10 kopieën (2..6); np = aantal standaarden zichtbaar (0..5), lijn 0..1, opa 0..1
function ijklijnGrafiek(ctx, x, y, w, h, a = 1, o = {}) { const { np = 5, lijn = 0, opa = 0, stap = 0 } = o; zacht2(ctx, a, () => {
  const X = l => x + (l - 1.6) / 4.8 * w, Y = ct => y + h - (ct - 14) / 20 * h, ctOf = l => 17 - 3.32 * (l - 6);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ['100', '1000', '10 000', '100 000', '1 miljoen'].forEach((s2, i) => text(ctx, s2, X(2 + i), y + h + 34, fTekst(21, 600), C.text2, 'center'));
  [15, 20, 25, 30].forEach(ct => text(ctx, String(ct), x - 14, Y(ct) + 8, fTekst(22, 600), C.text2, 'right'));
  metaText(ctx, 'kopieën per putje (bij het begin)', x + w, y + h + 70, C.text2, 'right', 18); metaText(ctx, 'Ct-waarde', x, y - 16, C.text2, 'left', 18);
  if (lijn > 0.01) { ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(1.8), Y(ctOf(1.8))); const le = 1.8 + 4.4 * lijn; ctx.lineTo(X(le), Y(ctOf(le))); ctx.stroke(); }
  for (let i = 0; i < 5; i++) { const al = clamp(np - i, 0, 1); if (al <= 0.01) continue; const l = 6 - i; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(l), Y(ctOf(l)), 12, '#F2F2EE', C.teal, 3); ctx.restore(); }
  if (stap > 0.01) { ctx.save(); ctx.globalAlpha *= stap; const l1 = 5, l2 = 4; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(l1), Y(ctOf(l1))); ctx.lineTo(X(l1), Y(ctOf(l2))); ctx.lineTo(X(l2), Y(ctOf(l2))); ctx.stroke(); text(ctx, '+3,3', X(l1) + 12, (Y(ctOf(l1)) + Y(ctOf(l2))) / 2 + 8, fTekst(24, 700), C.goud, 'left'); text(ctx, '÷10', (X(l1) + X(l2)) / 2, Y(ctOf(l2)) - 14, fTekst(24, 700), C.goud, 'center'); ctx.restore(); }
  if (opa > 0.01) { ctx.save(); ctx.globalAlpha *= opa; const l = Math.log10(3906); ctx.setLineDash([8, 7]); ctx.strokeStyle = KL_OPA; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, Y(25)); ctx.lineTo(X(l), Y(25)); ctx.lineTo(X(l), y + h); ctx.stroke(); ctx.setLineDash([]); circ(ctx, X(l), Y(25), 13, KL_OPA, '#F2F2EE', 2); ctx.restore(); } }); }

// controlekaart (Levey-Jennings): punten = afwijking in sd per dag; n = zichtbaar; band 0..1; hl = { index: [kleur, a] }
const QC_PUNTEN = [0.3, -0.6, 0.9, -0.2, 0.5, -1.1, 2.3, 0.2, -0.4, 0.7, -0.8, 0.1, 1.2, -0.3, 2.4, 2.6];
function controleKaart(ctx, x, y, w, h, a = 1, o = {}) { const { n = QC_PUNTEN.length, band = 1, drie = 1, hl = {} } = o; zacht2(ctx, a, () => {
  const Y = sd => y + h / 2 - sd * h / 7, X = i => x + 40 + i * (w - 80) / (QC_PUNTEN.length - 1);
  if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(x, Y(2), w, Y(-2) - Y(2)); ctx.strokeStyle = rgba(C.oker, 0.9); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); [2, -2].forEach(sd => { ctx.beginPath(); ctx.moveTo(x, Y(sd)); ctx.lineTo(x + w, Y(sd)); ctx.stroke(); }); ctx.setLineDash([]);
    text(ctx, '+2 sd', x + w + 12, Y(2) + 8, fTekst(22, 700), C.oker, 'left'); text(ctx, '−2 sd', x + w + 12, Y(-2) + 8, fTekst(22, 700), C.oker, 'left'); ctx.restore(); }
  if (drie > 0.01) { ctx.save(); ctx.globalAlpha *= drie; ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 2; [3, -3].forEach(sd => { ctx.beginPath(); ctx.moveTo(x, Y(sd)); ctx.lineTo(x + w, Y(sd)); ctx.stroke(); }); text(ctx, '+3 sd', x + w + 12, Y(3) + 8, fTekst(22, 700), C.koraal, 'left'); ctx.restore(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, Y(0)); ctx.lineTo(x + w, Y(0)); ctx.stroke(); text(ctx, 'gemiddelde', x + w + 12, Y(0) + 8, fTekst(22, 700), C.text2, 'left');
  metaText(ctx, 'Ct van de positieve controle', x, y - 16, C.text2, 'left', 18); metaText(ctx, 'dag', x + w, y + h + 34, C.text2, 'right', 18);
  ctx.strokeStyle = rgba(C.text, 0.5); ctx.lineWidth = 2; ctx.beginPath(); const nn = Math.min(QC_PUNTEN.length, Math.ceil(n));
  for (let i = 0; i < nn; i++) { const p = [X(i), Y(QC_PUNTEN[i])]; i ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke();
  for (let i = 0; i < nn; i++) { const al = clamp(n - i, 0, 1); const hk = hl[i]; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(i), Y(QC_PUNTEN[i]), 11, '#F2F2EE', C.line, 2); if (hk && hk[1] > 0.01) { ctx.globalAlpha *= hk[1]; circ(ctx, X(i), Y(QC_PUNTEN[i]), 13, hk[0]); circ(ctx, X(i), Y(QC_PUNTEN[i]), 24, null, hk[0], 4); } ctx.restore(); } }); }
function qcPunt(x, y, w, h, i) { return [x + 40 + i * (w - 80) / (QC_PUNTEN.length - 1), y + h / 2 - QC_PUNTEN[i] * h / 7]; }

// reagensflesje en vriezer met thermometer (warm 0..1)
function reagensFles(ctx, x, y, s = 1, a = 1) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -34, -110, 68, 110, 14); shape(ctx, rgba('#CFE4F0', 0.2), '#AFC0D0', 2.5); ctx.fillStyle = rgba(C.paars, 0.55); roundRect(ctx, -30, -60, 60, 56, 10); ctx.fill(); roundRect(ctx, -22, -140, 44, 32, 6); shape(ctx, C.paars, null); roundRect(ctx, -26, -96, 52, 30, 4); shape(ctx, '#F2F2EE', null); text(ctx, 'mix', 0, -74, fTekst(18, 700), '#121A26', 'center'); }); }
function vriezer(ctx, x, y, s = 1, a = 1) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -300, 220, 300, 14); shape(ctx, '#D8DEE4', '#9AA3B2', 3); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-110, -150); ctx.lineTo(110, -150); ctx.stroke(); ctx.fillStyle = '#7A8498'; ctx.fillRect(80, -270, 10, 90); ctx.fillRect(80, -130, 10, 90); text(ctx, '−20 °C', 0, -200, fTekst(30, 700), '#2A3446', 'center'); }); }
function thermometer(ctx, x, y, a = 1, warm = 0) { zacht2(ctx, a, () => { roundRect(ctx, x - 12, y - 150, 24, 150, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x, y, 20, C.koraal); ctx.fillStyle = C.koraal; const hh = 30 + warm * 100; ctx.fillRect(x - 5, y - hh, 10, hh); }); }

// mobiele telefoon (in de hand)
function telefoon(ctx, x, y, s = 1, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -16, -58, 32, 60, 6); shape(ctx, '#2A2F3E', '#5A6478', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-12, -52, 24, 42); ctx.restore(); }

// weegschaal (analytisch) met display
function balans(ctx, x, y, s = 1, a = 1, disp = '9,98 mg') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -160, -60, 320, 90, 14); shape(ctx, '#D8DEE4', '#9AA3B2', 2.5); roundRect(ctx, -110, -40, 150, 44, 6); shape(ctx, '#1C2A3E', null); text(ctx, disp, -35, -9, fMeta(24), '#7FC48F', 'center');
  ctx.strokeStyle = rgba('#CFE4F0', 0.5); ctx.lineWidth = 3; ctx.strokeRect(-120, -260, 240, 200); ctx.beginPath(); ctx.ellipse(0, -70, 70, 12, 0, 0, 6.283); shape(ctx, '#B8C2CE', '#8A94A8', 2); eppje(ctx, 0, -100, 0.4, 1, 0.3, 0); }); }

// keten van stappen (chips onder elkaar of naast elkaar)
function stapRij(ctx, items, x, y, dx, dy, a = 1, px = 26) { items.forEach(([s2, al, col], i) => { tag(ctx, s2, x + i * dx, y + i * dy, col || C.teal, a * al, 'center', px); if (i && dy) pijl(ctx, x + i * dx, y + (i - 1) * dy + 24, x + i * dx, y + i * dy - px - 12, C.line, a * al, 3, 12); }); }
