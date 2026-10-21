// Wat word jij? · Tandheelkunde 3 · Bloedend tandvlees — eigen tekeningen (21 okt 2026).
// Kies-doorsnede overgenomen uit t2/teken_t2.js (KG, kiesOmtrek, kiesKroon, kiesDEJ, kiesPulpaPad, kanaalLijn, tand uit _kiesEigen) voor dezelfde look in de reeks;
// uitgebreid met tandvlees en randje (sulcus), plak, tandsteen, pocket, kaakbot dat zakt (botafbrekende cellen), pocketsonde en röntgenfoto met botniveau.

// ================= kies (uit t2) =================
// Lokale maat (s = 1): kroontop y≈-300, hals y≈-60, wortelpunten y≈+330, breedte kroon ±190. Midden (x, y) = halsrand.
const KG = { top: -300, hals: -60, punt: 330, bw: 190, kamerTop: -175, kamerBodem: -40, hoorn: 80, kanaalX: 92, glz: 34, tvlees: -30, bot: 10 };
// pad van de buitenkant van de tand (kroon + twee wortels), lokale maat
function kiesOmtrek(ctx, k = 0) { const b = KG.bw - k, tp = KG.top + k; ctx.beginPath();
  ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals);
  ctx.bezierCurveTo(b * 0.8 - k * 0.2, 80, 150 - k, 280, 118 - k * 0.6, KG.punt - k); ctx.quadraticCurveTo(92, KG.punt + 12 - k, 66 + k * 0.6, KG.punt - 10 - k); ctx.bezierCurveTo(60 + k, 200, 40 + k, 60 + k, 0, 40 + k);
  ctx.bezierCurveTo(-40 - k, 60 + k, -60 - k, 200, -66 - k * 0.6, KG.punt - 10 - k); ctx.quadraticCurveTo(-92, KG.punt + 12 - k, -118 + k * 0.6, KG.punt - k); ctx.bezierCurveTo(-150 + k, 280, -b * 0.8 + k * 0.2, 80, -b * 0.78, KG.hals); ctx.closePath(); }
function kiesKroon(ctx) { const b = KG.bw, tp = KG.top; ctx.beginPath(); ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals); ctx.quadraticCurveTo(0, -95, -b * 0.78, KG.hals); ctx.closePath(); }
// grens glazuur/tandbeen: binnenrand van de kroon (dun bij de hals)
function kiesDEJ(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.beginPath(); ctx.moveTo(-KG.bw * 0.78 + 4, KG.hals); ctx.bezierCurveTo(-b * 1.02, -110, -b * 1.0, -230, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.12, tp + 38, 0, tp + 34);
  ctx.quadraticCurveTo(b * 0.12, tp + 38, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.0, -230, b * 1.02, -110, KG.bw * 0.78 - 4, KG.hals); }
function kiesPulpaPad(ctx, k = 0) { const h = KG.hoorn - k * 0.5, tp = KG.kamerTop + k; ctx.beginPath(); ctx.moveTo(-h - 12 + k, -50); ctx.quadraticCurveTo(-h - 14 + k, tp + 30, -h + 6, tp); ctx.quadraticCurveTo(-h + 30, tp + 26, -30, tp + 44); ctx.quadraticCurveTo(0, tp + 52, 30, tp + 44); ctx.quadraticCurveTo(h - 30, tp + 26, h - 6, tp); ctx.quadraticCurveTo(h + 14 - k, tp + 30, h + 12 - k, -50);
  ctx.bezierCurveTo(h + 10 - k, 40, KG.kanaalX + 12 - k * 0.6, 200, KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(KG.kanaalX - 14 + k * 0.6, 200, 60 + k, 50, 24, KG.kamerBodem + 6);
  ctx.lineTo(-24, KG.kamerBodem + 6); ctx.bezierCurveTo(-60 - k, 50, -KG.kanaalX + 14 - k * 0.6, 200, -KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(-KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(-KG.kanaalX - 12 + k * 0.6, 200, -h - 10 + k, 40, -h - 12 + k, -50); ctx.closePath(); }
// midden van een kanaal (zenuw en bloedvat lopen erdoor): van de kamer naar de wortelpunt; kant ±1, off = zijwaartse verschuiving
function kanaalLijn(ctx, kant, off = 0) { ctx.beginPath(); ctx.moveTo(kant * 30 + off, -150); ctx.quadraticCurveTo(kant * 70 + off, -100, kant * 72 + off * 0.7, -40); ctx.bezierCurveTo(kant * 74 + off * 0.5, 60, kant * KG.kanaalX + off * 0.3, 200, kant * KG.kanaalX + off * 0.2, KG.punt - 6); }

function kiesDEJReverse(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.bezierCurveTo(b * 1.02, -110, b * 1.0, -230, b * 0.8, tp + 30); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.12, tp + 38, 0, tp + 34); ctx.quadraticCurveTo(-b * 0.12, tp + 38, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.8, tp + 30); ctx.bezierCurveTo(-b * 1.0, -230, -b * 1.02, -110, -KG.bw * 0.78 + 4, KG.hals); }

// ---------- uit t2: instrumenten, bacterie, rager, stoel, röntgenkies, kies van buiten ----------
function spiegelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(70, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(84, 0, 15, 15, 0, 0, 6.283); shape(ctx, '#DDE6EE', '#8A939E', 3); circ(ctx, 80, -4, 4, rgba('#FFFFFF', 0.8)); ctx.restore(); }
function spuitHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -10, -11, 80, 22, 6); shape(ctx, rgba('#DDE6EE', 0.9), '#8A939E', 2); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(14, -7, 50, 14);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(118, 0); ctx.stroke(); ctx.restore(); }
// tandartsstoel (zijaanzicht, rugleuning schuin)
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }
// omtrek van een kies (kroon boven, wortels omlaag), halsrand op y=0; w = breedte, hc = kroonhoogte, hr = wortellengte
function _kiesPad(ctx, w, hc, hr, k = 0) { const W2 = w / 2, kr = 1 - k; ctx.beginPath();
  ctx.moveTo(-W2 * 0.8 * kr, 0); ctx.bezierCurveTo(-W2 * 1.02 * kr, -hc * 0.3, -W2 * 1.0 * kr, -hc * 0.75 * kr, -W2 * 0.72 * kr, -hc * kr);
  ctx.quadraticCurveTo(-W2 * 0.45 * kr, -hc * 1.06 * kr, -W2 * 0.22 * kr, -hc * 0.9 * kr); ctx.quadraticCurveTo(0, -hc * 0.82 * kr, W2 * 0.22 * kr, -hc * 0.9 * kr);
  ctx.quadraticCurveTo(W2 * 0.45 * kr, -hc * 1.06 * kr, W2 * 0.72 * kr, -hc * kr); ctx.bezierCurveTo(W2 * 1.0 * kr, -hc * 0.75 * kr, W2 * 1.02 * kr, -hc * 0.3, W2 * 0.8 * kr, 0);
  if (hr > 0) { ctx.bezierCurveTo(W2 * 0.78, hr * 0.5, W2 * 0.62, hr * 0.95, W2 * 0.42, hr); ctx.quadraticCurveTo(W2 * 0.28, hr * 0.98, W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(W2 * 0.18, hr * 0.3, 0, hr * 0.26);
    ctx.quadraticCurveTo(-W2 * 0.18, hr * 0.3, -W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(-W2 * 0.28, hr * 0.98, -W2 * 0.42, hr); ctx.bezierCurveTo(-W2 * 0.62, hr * 0.95, -W2 * 0.78, hr * 0.5, -W2 * 0.8, 0); }
  ctx.closePath(); }
function _xrKies(ctx, x, y, w, hc, hr, boven) { ctx.save(); ctx.translate(x, y); if (boven) ctx.scale(1, -1);
  _kiesPad(ctx, w, hc, hr, 0); ctx.fillStyle = '#A9A9A6'; ctx.fill(); // tandbeen
  ctx.save(); _kiesPad(ctx, w, hc, 0, 0); ctx.clip(); ctx.lineWidth = w * 0.11; ctx.strokeStyle = '#EDEDEA'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); // glazuur: rand van de kroon
  ctx.beginPath(); ctx.rect(-w, -hc * 1.2, w * 2, hc * 0.32); ctx.fillStyle = '#EDEDEA'; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w, -hc * 1.3, w * 2, hc * 1.25); ctx.clip(); ctx.lineWidth = w * 0.06; ctx.strokeStyle = '#E4E4E0'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); ctx.restore();
  // pulpa: kamer + twee kanalen
  ctx.fillStyle = '#4A4A4C'; ctx.beginPath(); ctx.moveTo(-w * 0.2, -hc * 0.1); ctx.quadraticCurveTo(-w * 0.22, -hc * 0.5, -w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(0, -hc * 0.4, w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(w * 0.22, -hc * 0.5, w * 0.2, -hc * 0.1);
  ctx.quadraticCurveTo(w * 0.22, hr * 0.5, w * 0.21, hr * 0.92); ctx.lineTo(w * 0.17, hr * 0.92); ctx.quadraticCurveTo(w * 0.14, hr * 0.4, w * 0.04, hr * 0.12); ctx.lineTo(-w * 0.04, hr * 0.12); ctx.quadraticCurveTo(-w * 0.14, hr * 0.4, -w * 0.17, hr * 0.92); ctx.lineTo(-w * 0.21, hr * 0.92); ctx.quadraticCurveTo(-w * 0.22, hr * 0.5, -w * 0.2, -hc * 0.1); ctx.fill();
  ctx.restore(); }
// ---------- bacteriën ----------
function bacterie(ctx, x, y, s, an, soort = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (soort === 0) { roundRect(ctx, -14 * s, -6 * s, 28 * s, 12 * s, 6 * s); shape(ctx, '#7FB58A', '#5A8F66', 1.5); } else { circ(ctx, -5 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); circ(ctx, 6 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); }
  ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
// kaartje voor de recap
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// kies van buiten (zonder doorsnede), met tandvlees
function _kiesKlein(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-210, KG.bot + 10); ctx.quadraticCurveTo(-150, KG.hals - 30, 0, KG.hals - 5); ctx.quadraticCurveTo(150, KG.hals - 30, 210, KG.bot + 10); ctx.lineTo(210, 120); ctx.lineTo(-210, 120); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2.5); ctx.restore(); }

// ---------- tand zelf (tandbeen, glazuur, pulpa), lokale maat; uit t2 _kiesEigen ----------
function _tandT3(ctx, o = {}) { const { kanaal = 0, zenuwKleur = '#F2D06A', pulpaKleur = '#E89AA8', zonderPulpa = false } = o; const dimm = () => 1;
  // tand: tandbeen
  ctx.save(); ctx.globalAlpha *= dimm('tandbeen'); kiesOmtrek(ctx); shape(ctx, '#EBDCA6', '#B9A56E', 2.5);
  // kanaaltjes: fijne evenwijdige lijntjes van pulpa naar buiten
  ctx.save(); kiesOmtrek(ctx); ctx.clip(); ctx.strokeStyle = rgba('#B9A06A', 0.5 + 0.4 * kanaal); ctx.lineWidth = 1.3 + kanaal;
  for (let i = 0; i < 46; i++) { const u = i / 45, an = Math.PI * (1.08 + u * 0.84); const r0 = 95, r1 = 300; const cx0 = 0, cy0 = -60; ctx.beginPath(); ctx.moveTo(cx0 + Math.cos(an) * r0, cy0 + Math.sin(an) * r0 * 0.9); ctx.quadraticCurveTo(cx0 + Math.cos(an) * (r0 + r1) * 0.5 + 10 * Math.sin(an), cy0 + Math.sin(an) * (r0 + r1) * 0.45, cx0 + Math.cos(an) * r1, cy0 + Math.sin(an) * r1); ctx.stroke(); }
  for (const kant of [-1, 1]) for (let k = 0; k < 9; k++) { const yy = 0 + k * 34; ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) + 16), yy); ctx.lineTo(kant * (KG.bw * 0.78 - yy * 0.18), yy - 18); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) - 16), yy); ctx.lineTo(kant * (44 + yy * 0.06), yy - 12); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // glazuur
  ctx.save(); ctx.globalAlpha *= dimm('glazuur'); kiesKroon(ctx); ctx.save(); ctx.clip(); ctx.beginPath(); ctx.rect(-300, -400, 600, 400); kiesDEJ(ctx); ctx.lineTo(300, -400); ctx.lineTo(-300, -400); ctx.closePath();
  const gg = ctx.createLinearGradient(-200, -320, 200, -60); gg.addColorStop(0, '#FBFDFF'); gg.addColorStop(1, '#DCE6EE'); kiesKroon(ctx); ctx.fillStyle = gg; ctx.restore();
  ctx.save(); kiesKroon(ctx); ctx.clip(); ctx.beginPath(); ctx.moveTo(-400, -400); ctx.lineTo(400, -400); ctx.lineTo(400, KG.hals); ctx.lineTo(KG.bw * 0.78 - 4, KG.hals); kiesDEJReverse(ctx); ctx.lineTo(-400, KG.hals); ctx.closePath(); ctx.fillStyle = gg; ctx.fill(); ctx.restore();
  kiesDEJ(ctx); ctx.strokeStyle = rgba('#B9A56E', 0.8); ctx.lineWidth = 2; ctx.stroke(); kiesKroon(ctx); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.85); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -245); ctx.quadraticCurveTo(-120, -280, -70, -282); ctx.stroke(); ctx.restore();
  // pulpa met bloedvat en zenuw
  if (!zonderPulpa) { ctx.save(); ctx.globalAlpha *= dimm('pulpa'); kiesPulpaPad(ctx); shape(ctx, pulpaKleur, '#C77A88', 2);
    ctx.save(); kiesPulpaPad(ctx); ctx.clip(); ctx.lineCap = 'round';
    for (const kant of [-1, 1]) { kanaalLijn(ctx, kant, -7); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 6; ctx.stroke(); kanaalLijn(ctx, kant, 7); ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 5; ctx.stroke(); }
    ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-37, -152); ctx.bezierCurveTo(-60, -190, -20, -150, 0, -140); ctx.bezierCurveTo(20, -150, 60, -190, 23, -152); ctx.stroke();
    ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 3; for (const kant of [-1, 1]) { ctx.beginPath(); ctx.moveTo(kant * 34, -150); ctx.quadraticCurveTo(kant * 70, -150, kant * 72, -170); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * 36, -150); ctx.quadraticCurveTo(kant * 50, -165, kant * 30, -178); ctx.stroke(); }
    ctx.restore(); ctx.restore(); }
}

// ================= nieuw in t3: tandvlees, randje, plak, tandsteen, pocket, kaakbot =================
// maat: 1 mm ≈ 32 eenheden (lokale maat van de kies). Glazuur-cementgrens = KG.hals (-60).
const MM = 32;
// x van het tandoppervlak (rechterkant) op hoogte y (lokale maat), uit de bezierkrommen van kiesOmtrek
const _OPP = (() => { const bz = (p0, p1, p2, p3, u) => { const v = 1 - u; return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3; };
  const pts = []; const b = KG.bw;
  for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([bz(b * 0.8, b * 1.02, b * 1.04, b * 0.78, u), bz(KG.top + 30, -240, -110, KG.hals, u)]); }
  for (let i = 1; i <= 60; i++) { const u = i / 60; pts.push([bz(b * 0.78, b * 0.8, 150, 118, u), bz(KG.hals, 80, 280, KG.punt, u)]); }
  return pts; })();
function oppX(y) { const P = _OPP; if (y <= P[0][1]) return P[0][0]; for (let i = 1; i < P.length; i++) if (P[i][1] >= y) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return x0 + (x1 - x0) * (y - y0) / Math.max(1e-6, y1 - y0); } return P[P.length - 1][0]; }

// standaardtoestand van het tandvlees; scènes geven een deel van deze velden mee
// rand = y van de tandvleesrand; diepte = mm (randje/pocket); bot = y van de botrand (null = automatisch)
// rood 0..1 = ontsteking (kleur), zwel 0..1, vaat 0..1 (wijder), wbc 0..1 (witte bloedcellen), bloed 0..1 (druppels)
// plak 0..1 (boven de rand), plakOnder 0..1 (hoe ver de plak in het randje/pocket zit), steen 0..1 (tandsteen)
// oc 0..1 (botafbrekende cellen), stof 0..1 (ontstekingsstoffen), spook 0..1 (stippellijn van de oude botrand), bleek 0..1 (roker: minder doorbloed)
// randje 0..1 (gouden gloed langs het randje), los 0..1 (tand wiebelt)
const TV0 = { rand: -112, diepte: 2, bot: null, rood: 0, zwel: 0, vaat: 0, wbc: 0, bloed: 0, plak: 0, plakOnder: 0, steen: 0, oc: 0, stof: 0, spook: 0, spookBot: 22, bleek: 0, randje: 0, los: 0, bact: 1, t: 0 };
function tvState(o) { const S = Object.assign({}, TV0, o); S.bodem = S.rand + S.diepte * MM; if (S.bot == null) S.bot = Math.max(22, S.bodem + 42); return S; }
function tvKleur(S) { let c = _mixHex('#E99AA2', '#D2453A', clamp(S.rood, 0, 1) * 0.85); if (S.bleek > 0) c = _mixHex(c, '#EDC2BE', S.bleek * 0.75); return c; }
// botrand rechts: van de tand (x = oppX(bot)) naar buiten
function botRand(S, xx) { const x0 = oppX(S.bot) + 4, u = clamp((xx - x0) / (430 - x0), 0, 1), e = u * u * (3 - 2 * u); return lerp(S.bot, KG.bot + 34, e); }
// spleetbreedte van het randje/de pocket op hoogte y
function spleet(S, y) { if (y >= S.bodem) return 0; const gw = 5 + 4.2 * (S.diepte - 2) + 4 * S.zwel; const u = clamp((y - S.rand) / Math.max(1, S.bodem - S.rand), 0, 1); return gw * (1 - u * u); }

// --- kaakbot (beide kanten), met wortelvlies; boven de tand getekend wordt niets
function _bot(ctx, S, links) { const L = links || S;
  const mid = Math.min(Math.max(S.bot, L.bot), 60);
  ctx.beginPath(); ctx.moveTo(-430, KG.bot + 34);
  for (let xx = 430; xx >= oppX(L.bot) + 4; xx -= 12) ctx.lineTo(-xx, botRand(L, xx));
  ctx.lineTo(-oppX(L.bot) - 4, L.bot); ctx.lineTo(-60, mid); ctx.lineTo(60, mid); ctx.lineTo(oppX(S.bot) + 4, S.bot);
  for (let xx = oppX(S.bot) + 4; xx <= 430; xx += 12) ctx.lineTo(xx, botRand(S, xx));
  ctx.lineTo(430, 380); ctx.lineTo(-430, 380); ctx.closePath(); shape(ctx, '#D9C9B4', '#B8A68E', 2);
  ctx.save(); ctx.clip(); for (let i = 0; i < 110; i++) { const bx = -420 + hash(i * 3 + 7) * 840, by = -40 + hash(i * 5 + 3) * 420; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 16, 6 + hash(i * 2) * 10, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#BFAC92', rgba('#A8957C', 0.7), 1); } ctx.restore();
  // wortelvlies: smalle roze spleet om de wortel, alleen onder de botrand
  ctx.save(); ctx.beginPath(); ctx.rect(-430, Math.min(S.bot, L.bot) - 2, 860, 420); ctx.clip(); kiesOmtrek(ctx, -9); shape(ctx, '#F0C4BE', null);
  ctx.strokeStyle = rgba('#F7E4DA', 0.95); ctx.lineWidth = 1.6; for (const kant of [-1, 1]) { const SS = kant < 0 ? L : S; for (let k = 0; k < 14; k++) { const yy = SS.bot + 10 + k * 22; if (yy > KG.punt - 10) break; const bx = oppX(yy) + 2; ctx.beginPath(); ctx.moveTo(kant * bx, yy); ctx.lineTo(kant * (bx + 8), yy - 5); ctx.stroke(); } }
  ctx.restore();
}

// --- botafbrekende cel (osteoclast): grote paarse cel met meerdere kernen, plat op het bot
function osteoclast(ctx, x, y, r, an, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const p = 1 + 0.04 * Math.sin(t * 3 + x);
  ctx.beginPath(); for (let i = 0; i <= 28; i++) { const u = i / 28 * Math.PI; const rr = r * p * (1 + 0.08 * Math.sin(u * 5 + t)); ctx.lineTo(Math.cos(u) * rr * 1.5, -Math.sin(u) * rr * 0.8); }
  for (let i = 0; i <= 10; i++) { const xx = r * 1.5 - i * r * 0.3; ctx.lineTo(xx, 3 + 3 * Math.sin(i * 2.2 + t * 4)); } ctx.closePath(); shape(ctx, '#B79AD8', '#7E62A8', 2);
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse((k - 1.5) * r * 0.55, -r * 0.35, r * 0.2, r * 0.15, 0, 0, 6.283); shape(ctx, '#6E4F9A', null); }
  ctx.restore(); }
// witte bloedcel: bleke bol met gelobde kern
function witteCel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F4F0F8', '#B9AECB', 1.5);
  ctx.fillStyle = '#8C7BBF'; for (const [dx, dy] of [[-0.35, -0.1], [0.05, 0.25], [0.35, -0.12]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, r * 0.3, r * 0.24, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
// druppel bloed
function bloedDruppel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.bezierCurveTo(x + r * 0.9, y - r * 0.4, x + r, y + r * 0.9, x, y + r); ctx.bezierCurveTo(x - r, y + r * 0.9, x - r * 0.9, y - r * 0.4, x, y - r * 1.6); shape(ctx, '#C0392B', '#8E2A20', 1.2); circ(ctx, x - r * 0.3, y + r * 0.1, r * 0.22, rgba('#FFFFFF', 0.5)); ctx.restore(); }

// --- één kant van het tandvlees (rechts, lokale maat); voor links met ctx.scale(-1,1)
function _tvKant(ctx, S, kant) { const t = S.t, r = S.rand, sx = (y) => oppX(y);
  // inhoud van het randje/de pocket: donkere spleet
  ctx.beginPath(); ctx.moveTo(sx(r), r); for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y), y); for (let y = S.bodem; y >= r; y -= 4) ctx.lineTo(sx(y), y); ctx.closePath(); ctx.fillStyle = '#4A2230'; ctx.fill();
  // plak onder de rand (in het randje of de pocket) en tandsteen
  const yOnder = r + (S.bodem - r) * clamp(S.plakOnder, 0, 1) * 0.92;
  if (S.steen > 0.01) { const y0 = r - 46 * S.steen, y1 = r + (yOnder - r) * 0.85; ctx.beginPath(); for (let y = y0; y <= y1; y += 5) ctx.lineTo(sx(y) + 2 + S.steen * (9 + 6 * hash(Math.round(y) * 3 + kant)) * Math.min(1, (y1 - y) / 20 + 0.2), y); for (let y = y1; y >= y0; y -= 5) ctx.lineTo(sx(y) - 1, y); ctx.closePath(); shape(ctx, '#CDB27A', '#8F7A4A', 1.6);
    ctx.fillStyle = rgba('#8F7A4A', 0.6); for (let k = 0; k < 10 * S.steen; k++) { const y = lerp(y0, y1, hash(k * 7 + kant)); circ(ctx, sx(y) + 6, y, 1.8, ctx.fillStyle); } }
  _plakLaag(ctx, S, r - 120 * clamp(S.plak, 0, 1), r, S.plak, kant, S.steen > 0.3 ? 12 * S.steen : 0);
  if (S.plakOnder > 0.01) _plakLaag(ctx, S, r, yOnder, 1, kant + 5, S.steen > 0.3 ? 12 * S.steen : 0);
  // tandvlees zelf
  const zw = S.zwel, tip = r - 4 * zw; const gk = tvKleur(S), rk = _mixHex(gk, '#7A2A30', 0.25);
  const buitenTop = sx(r) + spleet(S, r) + 10;
  ctx.beginPath(); ctx.moveTo(sx(r) + spleet(S, r), tip);
  for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y), y);
  for (let y = S.bodem; y <= S.bot; y += 6) ctx.lineTo(sx(y) + 0.5, y);
  for (let xx = sx(S.bot) + 4; xx <= 440; xx += 14) ctx.lineTo(xx, botRand(S, xx) - 2);
  ctx.lineTo(440, KG.bot - 30 - 18 * zw);
  ctx.bezierCurveTo(330, KG.bot - 40 - 26 * zw, buitenTop + 60 + 28 * zw, r + 30 - 8 * zw, buitenTop + 22 + 16 * zw, r + 4);
  ctx.quadraticCurveTo(buitenTop + 4 + 8 * zw, tip - 12 - 6 * zw, sx(r) + spleet(S, r), tip); ctx.closePath();
  shape(ctx, gk, rk, 2.2);
  ctx.save(); ctx.clip();
  // bovenlaag (epitheel) iets lichter langs de buitenkant
  ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(440, KG.bot - 24 - 18 * zw); ctx.bezierCurveTo(330, KG.bot - 34 - 26 * zw, buitenTop + 60 + 28 * zw, r + 36 - 8 * zw, buitenTop + 22 + 16 * zw, r + 10); ctx.stroke();
  // bloedvaatjes: lusjes vlak onder het randje
  const vw = 2.5 + 5 * S.vaat, vc = S.bleek > 0.5 ? rgba('#C0392B', 0.35) : '#B03A36';
  for (let k = 0; k < 4; k++) { const yy = r + 26 + k * Math.max(26, (S.bot - r - 40) / 4), xx = sx(yy) + spleet(S, yy) + 34 + (k % 2) * 30; const lw = vw * (S.bleek > 0.5 ? 0.5 : 1);
    ctx.strokeStyle = vc; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xx + 70, yy + 26); ctx.bezierCurveTo(xx - 14, yy + 24, xx - 14, yy - 8, xx + 20, yy - 6); ctx.bezierCurveTo(xx + 50, yy - 4, xx + 40, yy + 12, xx + 90, yy + 10); ctx.stroke(); }
  // witte bloedcellen: van de vaatjes naar het randje
  if (S.wbc > 0.01) for (let i = 0; i < 7; i++) { const u = ((t * 0.22 + hash(i * 13)) % 1); const yy = r + 30 + hash(i * 5) * Math.max(40, S.bodem - r + 10); const x0 = sx(yy) + spleet(S, yy) + 110, x1 = sx(yy) + spleet(S, yy) + 12; witteCel(ctx, lerp(x0, x1, u), yy + Math.sin(u * 6 + i) * 6, 10, S.wbc * clamp(Math.min(u * 4, (1 - u) * 6), 0, 1)); }
  ctx.restore();
  // gloed langs het randje (aanwijzen zonder wijslijn)
  if (S.randje > 0.01) { ctx.save(); ctx.globalAlpha *= S.randje; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.shadowColor = rgba(C.goud, 0.9); ctx.shadowBlur = 12; ctx.beginPath(); for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y) + 3, y); ctx.stroke(); ctx.restore(); }
  // bloed: druppels die uit het randje komen en over de tand lopen
  if (S.bloed > 0.01) for (let i = 0; i < 3; i++) { const u = (t * 0.35 + i / 3) % 1; const yy = r - 6 - u * 70, xx = sx(yy) + 8 + i * 4; bloedDruppel(ctx, xx, yy, 7 + 3 * (1 - u), S.bloed * clamp((1 - u) * 2.5, 0, 1)); }
  if (S.bloed > 0.01) { ctx.save(); ctx.globalAlpha *= S.bloed * 0.8; ctx.fillStyle = '#C0392B'; ctx.beginPath(); ctx.ellipse(sx(r) + spleet(S, r) * 0.5 + 2, r - 2, 10, 5, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  // ontstekingsstoffen: van de pocket naar het bot
  if (S.stof > 0.01) for (let i = 0; i < 12; i++) { const u = ((t * 0.3 + hash(i * 17)) % 1); const ya = S.bodem - 10 + hash(i * 3) * 30, yb2 = S.bot + 20 + hash(i * 7) * 20; const xa = sx(ya) + 20 + hash(i) * 40, xb = sx(S.bot) + 40 + hash(i * 9) * 100;
    const px = lerp(xa, xb, u), py = lerp(ya, yb2, u) + Math.sin(u * 8 + i) * 5; ctx.save(); ctx.globalAlpha *= S.stof * clamp(Math.min(u * 5, (1 - u) * 5), 0, 1); circ(ctx, px, py, 5, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  // botafbrekende cellen op de botrand
  if (S.oc > 0.01) { const x1 = sx(S.bot) + 36, x2 = sx(S.bot) + 120; osteoclast(ctx, x1, botRand(S, x1) + 2, 22, Math.atan2(botRand(S, x1 + 5) - botRand(S, x1 - 5), 10), S.oc, t); osteoclast(ctx, x2, botRand(S, x2) + 2, 19, Math.atan2(botRand(S, x2 + 5) - botRand(S, x2 - 5), 10), S.oc * clamp(S.oc * 2 - 0.6, 0, 1), t + 2); }
  // oude botrand als stippellijn
  if (S.spook > 0.01) { ctx.save(); ctx.globalAlpha *= S.spook; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; ctx.setLineDash([10, 8]); const G = Object.assign({}, S, { bot: S.spookBot }); ctx.beginPath(); for (let xx = oppX(G.bot) + 4; xx <= 430; xx += 10) ctx.lineTo(xx, botRand(G, xx)); ctx.stroke(); ctx.restore(); } }

// laagje plak (biofilm) langs het tandoppervlak tussen y0 en y1, met staafjes en bolletjes in een slijmlaag
function _plakLaag(ctx, S, y0, y1, dicht, seed, buiten = 0) { if (dicht <= 0.01 || y1 - y0 < 4) return; const sx = (y) => oppX(y) + buiten;
  const dik = 9 + 5 * clamp(dicht, 0, 1);
  ctx.beginPath(); for (let y = y0; y <= y1; y += 4) ctx.lineTo(sx(y) + dik * (0.6 + 0.4 * Math.sin(y * 0.15 + seed)) * clamp(Math.min((y - y0) / 14, (y1 - y) / 10 + 0.4, 1), 0, 1), y); for (let y = y1; y >= y0; y -= 4) ctx.lineTo(sx(y) - 1, y); ctx.closePath(); shape(ctx, rgba('#B8D46A', 0.55), rgba('#8FAF4A', 0.7), 1.2);
  const n = Math.floor((y1 - y0) / 9); for (let i = 0; i < n; i++) { const y = y0 + (i + 0.5) * (y1 - y0) / n; const deel = 0.85 + 0.15 * Math.sin(S.t * 1.5 + i * 2 + seed); bacterie(ctx, sx(y) + 4 + hash(i * 3 + seed) * 4, y, 0.36 * deel, Math.PI / 2 + (hash(i + seed) - 0.5) * 0.9, (i + seed) % 3 === 0 ? 1 : 0, S.bact); } }

// --- complete doorsnede: kies + kaakbot + tandvlees aan twee kanten.  o = toestand rechts (zie TV0), o.links = afwijkingen links
function parodont(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const S = tvState(o), L = tvState(Object.assign({}, o, o.links || {}));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  _bot(ctx, S, L);
  // tand (met wiebel bij los)
  ctx.save(); if (S.los > 0.01) { ctx.translate(0, KG.punt); ctx.rotate(S.los * 0.035 * Math.sin(S.t * 5)); ctx.translate(0, -KG.punt); } _tandT3(ctx, { kanaal: 0 }); ctx.restore();
  _tvKant(ctx, S, 1); ctx.save(); ctx.scale(-1, 1); _tvKant(ctx, L, -1); ctx.restore();
  ctx.restore(); return S; }
// schermpositie van een lokaal punt
function pp(x, y, s, lx, ly) { return { x: x + lx * s, y: y + ly * s }; }

// --- pocketsonde: dun staafje met mm-streepjes; tip op (tx, ty) lokaal, in = mm in het randje; lengte boven de tip
function sonde(ctx, x, y, s, S, inMM, a = 1, kant = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.scale(kant, 1);
  const ty = S.rand + inMM * MM, gx = oppX(Math.min(ty, S.bodem)) + Math.max(4, spleet(S, Math.min(ty - 6, S.bodem - 6)) * 0.5) + 2; const top = ty - 11 * MM;
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(gx, ty); ctx.lineTo(gx + 2, top); ctx.quadraticCurveTo(gx + 6, top - 50, gx + 60, top - 80); ctx.stroke();
  ctx.lineWidth = 16; ctx.strokeStyle = '#9AA3AE'; ctx.beginPath(); ctx.moveTo(gx + 60, top - 80); ctx.lineTo(gx + 160, top - 140); ctx.stroke();
  ctx.fillStyle = '#C9CED6'; circ(ctx, gx, ty, 3.5, '#C9CED6');
  // streepjes elke mm, donkere band van 3 tot 5 mm
  ctx.save(); ctx.beginPath(); ctx.rect(-500, -900, 1400, S.rand - 2 + 900); ctx.restore();
  ctx.fillStyle = '#2A2F3A'; ctx.fillRect(gx - 4.5, ty - 5 * MM, 9, 2 * MM);
  ctx.strokeStyle = '#2A2F3A'; ctx.lineWidth = 2; for (let k = 1; k <= 10; k++) { const yy = ty - k * MM; ctx.beginPath(); ctx.moveTo(gx - 6, yy); ctx.lineTo(gx + 6, yy); ctx.stroke(); }
  ctx.restore(); }
// sonde in de hand
function sondeHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(60, 0); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(100, -4); ctx.lineTo(112, 12); ctx.stroke(); ctx.restore(); }
// scaler/curette in de hand
function curetteHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(62, 0); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(62, 0); ctx.quadraticCurveTo(96, -4, 104, 14); ctx.quadraticCurveTo(108, 24, 100, 26); ctx.stroke(); ctx.restore(); }
// curette in de doorsnede: blad tegen de wortel op diepte yy (lokaal)
function curette(ctx, x, y, s, yy, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const gx = oppX(yy) + 8; ctx.lineCap = 'round';
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx, yy); ctx.quadraticCurveTo(gx + 4, yy - 160, gx + 40, -330); ctx.stroke(); ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(gx + 40, -330); ctx.lineTo(gx + 110, -440); ctx.stroke();
  ctx.fillStyle = '#E8EAEE'; ctx.beginPath(); ctx.ellipse(gx + 3, yy + 6, 5, 12, 0.2, 0, 6.283); ctx.fill(); ctx.restore(); }
function tandenborstelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -14, -8, 120, 16, 7); shape(ctx, '#5BA4C9', '#3E7FA0', 2); roundRect(ctx, 100, -9, 40, 18, 5); shape(ctx, '#F2F2EE', '#AEB6C0', 1.5);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(104 + k * 5.5, -9); ctx.lineTo(104 + k * 5.5, -24); ctx.stroke(); } ctx.restore(); }
function ragerHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an + 0.3); rager(ctx, 60, 0, 0.8, 1); ctx.restore(); }
// tandenborstel los (schuin), bv. in de doorsnede
function tandenborstel(ctx, x, y, s, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); tandenborstelHold(ctx, 0, 0, an); ctx.restore(); }

// --- badkamer: wastafel met spiegel; schuim = roze schuim in de wasbak
function wastafel(ctx, x, y, a = 1, schuim = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 190, y - 640, 380, 300, 18); shape(ctx, rgba('#BFE3F5', 0.18), '#8FA0B5', 3); ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 140, y - 600); ctx.lineTo(x - 60, y - 520); ctx.moveTo(x - 110, y - 600); ctx.lineTo(x - 50, y - 540); ctx.stroke();
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 12, y - 300, 24, 300); // poot
  ctx.beginPath(); ctx.moveTo(x - 230, y - 300); ctx.lineTo(x + 230, y - 300); ctx.quadraticCurveTo(x + 220, y - 200, x, y - 190); ctx.quadraticCurveTo(x - 220, y - 200, x - 230, y - 300); ctx.closePath(); shape(ctx, '#EEF1F4', '#AEB6C0', 3);
  ctx.beginPath(); ctx.ellipse(x, y - 296, 200, 26, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#AEB6C0', 2);
  if (schuim > 0.01) { ctx.save(); ctx.globalAlpha *= schuim; for (let i = 0; i < 9; i++) { const bx = x - 70 + i * 18 + Math.sin(t + i) * 3, by = y - 296 + Math.sin(i * 2) * 8; circ(ctx, bx, by, 12 + 5 * hash(i), i % 3 === 0 ? '#E8A0A8' : '#F6E2E4'); } ctx.restore(); }
  ctx.strokeStyle = '#AEB6C0'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 120, y - 300); ctx.lineTo(x + 120, y - 350); ctx.quadraticCurveTo(x + 120, y - 370, x + 90, y - 368); ctx.stroke(); ctx.restore(); }

// --- rij van drie kiezen van buiten met tandvlees (rood = ontsteking, bloed = druppels bij de rand)
function kiesRijT3(ctx, x, y, s, o = {}) { const { rood = 0, bloed = 0, t = 0, a = 1, bleek = 0, rager: rg = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const gk = tvKleur({ rood, bleek });
  [-1, 0, 1].forEach(i => { ctx.save(); ctx.translate(x + i * 330 * s, y); ctx.scale(s * 0.85, s); kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke(); ctx.restore(); });
  // tandvlees: golvende rand (papillen tussen de kiezen)
  ctx.beginPath(); ctx.moveTo(x - 560 * s, y + 140 * s); ctx.lineTo(x - 560 * s, y - 40 * s);
  for (let i = -1; i <= 1; i++) { const cx = x + i * 330 * s; ctx.quadraticCurveTo(cx - 150 * s, y - 40 * s - 30 * rood * s, cx - 120 * s, y - 80 * s); ctx.quadraticCurveTo(cx, y - 20 * s + 10 * rood * s, cx + 120 * s, y - 80 * s); ctx.quadraticCurveTo(cx + 150 * s, y - 50 * s, cx + 165 * s, y - 120 * s - 15 * rood * s); }
  ctx.lineTo(x + 560 * s, y - 40 * s); ctx.lineTo(x + 560 * s, y + 140 * s); ctx.closePath(); shape(ctx, gk, _mixHex(gk, '#7A2A30', 0.25), 2.5);
  if (bloed > 0.01) for (let i = 0; i < 4; i++) { const u = (t * 0.4 + i / 4) % 1; bloedDruppel(ctx, x + (-495 + i * 330) * s, y - 120 * s + u * 40 * s, 9 * s / 0.6, bloed * (1 - u * 0.5)); }
  if (rg > 0.01) { const px = x + 165 * s, sw = Math.sin(t * 6) * 14 * s; rager(ctx, px + 70 * s + sw, y - 110 * s, s * 1.2, rg); }
  ctx.restore(); }
// klein tandvlees-icoon (één kies met tandvlees), voor groepjes
function tvIcoon(ctx, x, y, s, rood = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); ctx.fillStyle = '#EEF3F7'; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 6; ctx.stroke();
  const gk = tvKleur({ rood }); ctx.beginPath(); ctx.moveTo(-230, 80); ctx.lineTo(-230, -40); ctx.quadraticCurveTo(-180, -110 - 30 * rood, -120, -80); ctx.quadraticCurveTo(0, -30 + 20 * rood, 120, -80); ctx.quadraticCurveTo(180, -110 - 30 * rood, 230, -40); ctx.lineTo(230, 80); ctx.closePath(); shape(ctx, gk, _mixHex(gk, '#7A2A30', 0.3), 5); ctx.restore(); }

// --- röntgenfoto onderkaak met botniveau: verlies 0..1 (bot gezakt), lijn 0..1 (gezonde botrand als stippellijn + echte botrand)
function rontgenBot(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { verlies = 0, lijn = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 26); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); ctx.fillStyle = '#151618'; ctx.fillRect(x, y, w, h);
  const cw = w * 0.27, hc = h * 0.3, hr = h * 0.48, cej = y + h * 0.4, xs = [x + w * 0.18, x + w * 0.5, x + w * 0.82];
  const gezond = cej + h * 0.06, diep = cej + hr * 0.5;
  const crest = (xx) => { const u = (xx - x) / w; const b = Math.exp(-Math.pow((u - 0.4) / 0.22, 2)); return gezond + (diep - gezond) * verlies * (0.35 + 0.65 * b) + Math.sin(u * 19) * 4; };
  ctx.filter = 'blur(2px)';
  ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 8) ctx.lineTo(xx, crest(xx)); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#727378'; ctx.fill();
  ctx.save(); ctx.clip(); for (let i = 0; i < 160; i++) { const bx = x + hash(i * 3 + 1) * w, by = cej + hash(i * 7) * h * 0.6; circ(ctx, bx, by, 4 + hash(i * 11) * 10, rgba(hash(i) < 0.5 ? '#707175' : '#3A3B3E', 0.55)); } ctx.restore();
  xs.forEach((xx, i) => _xrKies(ctx, xx, cej, cw, hc, hr, false));
  ctx.filter = 'none';
  const v = ctx.createRadialGradient(x + w / 2, y + h / 2, h * 0.3, x + w / 2, y + h / 2, w * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)'); ctx.fillStyle = v; ctx.fillRect(x, y, w, h); ctx.restore();
  if (lijn > 0.01) { ctx.save(); ctx.globalAlpha *= lijn; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(x + 10, gezond); ctx.lineTo(x + w - 10, gezond); ctx.stroke();
    ctx.setLineDash([]); ctx.strokeStyle = C.koraal; ctx.beginPath(); for (let xx = x + 10; xx <= x + w - 10; xx += 8) ctx.lineTo(xx, crest(xx)); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { gezond, diep, crest }; }

// --- kalender met maanden; stippen = controles; vlam = opvlammen
function kalenderJaar(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { controles = 0, vlam = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 480, 330, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; roundRect(ctx, x, y, 480, 56, 18); ctx.fill(); ctx.fillRect(x, y + 30, 480, 26);
  for (const rx of [x + 120, x + 360]) { circ(ctx, rx, y, 10, '#8A939E'); }
  const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  M.forEach((m, i) => { const cx = x + 60 + (i % 4) * 120, cy = y + 112 + Math.floor(i / 4) * 80; text(ctx, m, cx, cy + 8, fTekst(24, 700), '#3A4458', 'center');
    if (i % 3 === 0 && controles > i / 12) { ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy, 44, 28, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } });
  if (vlam > 0.01) vlammetje(ctx, x + 440, y + 300, 1, vlam, t);
  ctx.restore(); }
function vlammetje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (1 + 0.05 * Math.sin(t * 9)), s);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-40, -10, -30, -60, 0, -90); ctx.bezierCurveTo(4, -60, 30, -50, 26, -24); ctx.bezierCurveTo(40, -30, 36, -8, 0, 0); shape(ctx, C.koraal, '#FFD0A8', 2);
  ctx.beginPath(); ctx.moveTo(0, -4); ctx.bezierCurveTo(-18, -10, -12, -36, 2, -50); ctx.bezierCurveTo(6, -30, 18, -24, 0, -4); shape(ctx, C.goud, null); ctx.restore(); }

// --- sigaret met rookpluim
function sigaret(ctx, x, y, s, a = 1, t = 0, an = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(an);
  roundRect(ctx, -110, -13, 160, 26, 6); shape(ctx, '#F4F2EC', '#B8B0A0', 2); roundRect(ctx, -150, -13, 50, 26, 6); shape(ctx, '#D99A4E', '#A87632', 2);
  ctx.fillStyle = '#6A6A6A'; ctx.fillRect(48, -13, 12, 26); circ(ctx, 62, 0, 8, rgba(C.koraal, 0.9));
  ctx.rotate(-an); for (let i = 0; i < 3; i++) { const u = (t * 0.4 + i / 3) % 1; ctx.strokeStyle = rgba('#C9CED6', 0.6 * (1 - u)); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(62, -10 - u * 120); ctx.bezierCurveTo(40, -40 - u * 120, 90, -70 - u * 120, 62, -110 - u * 120); ctx.stroke(); } ctx.restore(); }
// --- hart (orgaan, vereenvoudigd) met kransslagaders
function hartje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const p = 1 + 0.04 * Math.max(0, Math.sin(t * 6)); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 90); ctx.bezierCurveTo(-90, 40, -110, -40, -60, -70); ctx.bezierCurveTo(-30, -90, -5, -70, 0, -50); ctx.bezierCurveTo(10, -80, 60, -95, 85, -55); ctx.bezierCurveTo(110, -10, 70, 50, 0, 90); shape(ctx, '#C9524A', '#8E2A20', 3);
  roundRect(ctx, -30, -120, 26, 60, 10); shape(ctx, '#C9524A', '#8E2A20', 3); roundRect(ctx, 6, -126, 30, 56, 12); shape(ctx, '#5B7FB8', '#3E5C8A', 3);
  ctx.strokeStyle = '#E8B04A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, -50); ctx.bezierCurveTo(-40, -20, -50, 20, -20, 60); ctx.moveTo(20, -50); ctx.bezierCurveTo(40, -10, 50, 20, 30, 50); ctx.stroke(); ctx.restore(); }
// --- glucosemeter met strip en schermpje (trend: lijntje dat iets zakt)
function glucosemeter(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { hoog = 1, zak = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -140, 180, 280, 40); shape(ctx, '#3A4458', '#8A939E', 3); roundRect(ctx, -66, -110, 132, 110, 12); shape(ctx, '#CFE6D6', '#8A939E', 2);
  ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 10; i++) { const u = i / 10; const yy = -40 - 30 * hoog - 6 * Math.sin(i * 1.7) + (u > 0.6 ? zak * 18 * (u - 0.6) / 0.4 : 0); ctx.lineTo(-56 + u * 112, yy); } ctx.stroke();
  circ(ctx, -34, 50, 18, '#5A6478', '#8A939E', 2); circ(ctx, 34, 50, 18, '#5A6478', '#8A939E', 2); roundRect(ctx, -16, 140, 32, 70, 4); shape(ctx, '#F2F2EE', '#B8B0A0', 2); ctx.fillStyle = '#C0392B'; ctx.fillRect(-10, 190, 20, 12); ctx.restore(); }
// --- lichaamscel met insulinereceptoren; open 0..1 = receptoren reageren; glucose (zeshoekjes) gaat naar binnen als open
function insulineCel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { open = 1, stof = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E8C9A0', 0.28), '#C9A06A', 4); ctx.beginPath(); ctx.arc(x, y, r - 9, 0, 6.283); ctx.strokeStyle = rgba('#C9A06A', 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, x + r * 0.15, y + r * 0.1, r * 0.28, rgba(C.kern, 0.7), C.kernR, 2);
  for (let k = 0; k < 5; k++) { const an = -Math.PI * 0.95 + k * 0.42; const rx = x + Math.cos(an) * r, ry = y + Math.sin(an) * r; ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2);
    ctx.strokeStyle = open > 0.5 ? C.goud : '#8A939E'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -24); ctx.moveTo(9, 0); ctx.lineTo(9, -24); ctx.stroke();
    const dock = clamp(open * 1.2, 0, 1); circ(ctx, 0, -30 - 30 * (1 - dock), 10, C.goud, '#FFF4C8', 2); ctx.restore(); }
  // glucose
  for (let i = 0; i < 6; i++) { const binnen = open > 0.5 && i < 4; const u = (t * 0.25 + i / 6) % 1; const an = -Math.PI * 0.9 + i * 0.35; const d = binnen ? lerp(r * 1.6, r * 0.5, u) : r * 1.45 + Math.sin(t + i) * 8; zeshoek(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 12, 1); }
  if (stof > 0.01) for (let i = 0; i < 8; i++) { const an = -Math.PI + i * 0.45 + Math.sin(t * 0.6 + i) * 0.1; const d = r + 60 + 10 * Math.sin(t + i * 2); ctx.save(); ctx.globalAlpha *= stof; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 6, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  ctx.restore(); }
function zeshoek(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + Math.PI / 6; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba('#F2F2EE', 0.9), '#9AA3B2', 2); ctx.restore(); }
// --- bloedbaan (buis) met ontstekingsstoffen die meestromen
function bloedbaan(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; const { stof = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - 40, x1 - x0, 80, 40); shape(ctx, rgba('#C0392B', 0.18), '#C0392B', 3);
  for (let i = 0; i < 10; i++) { const u = (t * 0.12 + hash(i * 3)) % 1; ctx.beginPath(); ctx.ellipse(x0 + 30 + u * (x1 - x0 - 60), y + (hash(i * 7) - 0.5) * 40, 14, 8, 0, 0, 6.283); shape(ctx, '#D2453A', '#A8322A', 1); }
  if (stof > 0.01) for (let i = 0; i < 12; i++) { const u = (t * 0.16 + hash(i * 5 + 1)) % 1; ctx.save(); ctx.globalAlpha *= stof; circ(ctx, x0 + 30 + u * (x1 - x0 - 60), y + (hash(i * 9) - 0.5) * 46, 6, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  ctx.restore(); }
// --- vernauwd bloedvat in doorsnede (dwars), met plaque en bacteriën erin
function vatDoorsnede(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { plaque = 1, bact = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#D98A80', '#A8524A', 4); circ(ctx, x, y, r * 0.8, '#3A1E28');
  ctx.beginPath(); ctx.arc(x, y, r * 0.8, Math.PI * 0.6, Math.PI * 1.9); ctx.bezierCurveTo(x + r * 0.2, y - r * 0.1 * plaque, x - r * 0.1, y + r * 0.25 * plaque, x + Math.cos(Math.PI * 0.6) * r * 0.8, y + Math.sin(Math.PI * 0.6) * r * 0.8); ctx.closePath(); shape(ctx, '#E8D27A', '#B8A04A', 2.5);
  for (let i = 0; i < 6; i++) bacterie(ctx, x - r * 0.35 + hash(i * 3) * r * 0.4, y - r * 0.45 + hash(i * 5) * r * 0.5, 1.1, hash(i) * 6 + Math.sin(t + i) * 0.2, i % 2, bact);
  ctx.restore(); }
