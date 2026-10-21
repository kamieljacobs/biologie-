// Wat word jij? · Fysiotherapie 4 · Welke oefening helpt? — eigen tekeningen (21 okt 2026)
// gedeelde hulpjes uit film 1
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function praktijk(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22304C'; ctx.fillRect(0, 760, W, 120);
  roundRect(ctx, 1180, 600, 560, 60, 14); shape(ctx, '#3E6A8E', '#5E8AAE', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(1220, 660, 24, 120); ctx.fillRect(1676, 660, 24, 120); ctx.restore(); }
function checkRij(ctx, s2, x, y, a = 1, st = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 40, 40, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 2); text(ctx, s2, x + 64, y, fTekst(px, 600), C.text, 'left'); ctx.restore();
  if (st === 'nee') kruis(ctx, x + 20, y - 14, 13, a); if (st === 'ja') vink_(ctx, x + 20, y - 14, 14, a); }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }

const OE = { bot: '#E6DCC6', botR: '#B8AC94', band: '#E2C27A', spier: '#B8564E', pees: '#E2D3B0', schijf: '#9CC4DC', huid: '#E3B998' };

// ===== kleine iconen voor de agenda
function icoon(ctx, soort, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  if (soort === 'enkel') { ctx.moveTo(-6, -40); ctx.lineTo(-6, 10); ctx.quadraticCurveTo(-6, 30, 20, 30); ctx.lineTo(40, 30); ctx.moveTo(10, -40); ctx.lineTo(10, 6); }
  if (soort === 'knie') { ctx.moveTo(-10, -44); ctx.lineTo(4, -4); ctx.lineTo(-10, 40); ctx.stroke(); ctx.beginPath(); ctx.ellipse(14, -6, 9, 13, 0, 0, 6.283); }
  if (soort === 'rug') { for (let i = 0; i < 5; i++) { ctx.moveTo(-14 + Math.sin(i * 0.7) * 6, -40 + i * 20); ctx.lineTo(14 + Math.sin(i * 0.7) * 6, -40 + i * 20); } }
  if (soort === 'schouder') { ctx.arc(0, 0, 18, 0, 6.283); ctx.moveTo(-40, -24); ctx.quadraticCurveTo(-10, -40, 24, -16); ctx.moveTo(10, 16); ctx.lineTo(24, 46); }
  ctx.stroke(); ctx.restore(); }

// ===== enkel van voren: scheenbeen, kuitbeen, voet; klap 0..1 = voet kantelt naar binnen (enkel klapt naar buiten); band 0..1 uitgerekt/ingescheurd
function enkel(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { klap = 0, scheur = 0, hl = 0, punten = 0, ger = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.moveTo(-110, -420); ctx.lineTo(-100, -40); ctx.quadraticCurveTo(-120, 30, -90, 60); ctx.lineTo(110, 60); ctx.quadraticCurveTo(130, 20, 110, -40); ctx.lineTo(110, -420); ctx.closePath(); ctx.fillStyle = OE.huid; ctx.fill(); ctx.restore();
  roundRect(ctx, -70, -420, 90, 380, 30); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(-50, -30, 40, 30, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  roundRect(ctx, 40, -400, 34, 380, 14); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(62, -10, 24, 36, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  // voet (draait om het enkelgewricht)
  ctx.save(); ctx.translate(0, 20); ctx.rotate(klap * 0.5); ctx.beginPath(); ctx.ellipse(0, 18, 70, 34, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5); roundRect(ctx, -110, 50, 230, 50, 20); shape(ctx, OE.bot, OE.botR, 2.5);
  const bandEnd = [86, 40]; ctx.restore();
  // buitenste enkelband: van kuitbeen naar voet (buitenkant)
  const ex = Math.cos(klap * 0.5) * 86 - Math.sin(klap * 0.5) * 60, ey = 20 + Math.sin(klap * 0.5) * 86 + Math.cos(klap * 0.5) * 60;
  ctx.strokeStyle = hl > 0.5 || scheur > 0.01 ? C.goud : OE.band; ctx.lineWidth = 16 - 6 * klap; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(70, 18); ctx.lineTo(ex, ey); ctx.stroke(); } else { const m = [(70 + ex) / 2, (18 + ey) / 2]; ctx.beginPath(); ctx.moveTo(70, 18); ctx.lineTo(m[0] - 4, m[1] - 6 * scheur); ctx.moveTo(m[0] + 4, m[1] + 6 * scheur); ctx.lineTo(ex, ey); ctx.stroke(); }
  if (punten > 0.01) { ctx.save(); ctx.globalAlpha *= punten; for (const [px, py] of [[-60, -60], [64, -60], [-30, 90], [70, 96]]) { circ(ctx, px, py, 18, rgba(C.koraal, 0.4), C.koraal, 3); } ctx.restore(); }
  if (ger > 0.01) { ctx.save(); ctx.globalAlpha *= ger; for (let i = 0; i < 6; i++) circ(ctx, 70 + (ex - 70) * (0.2 + i * 0.12), 18 + (ey - 18) * (0.2 + i * 0.12) - 18, 6, C.teal); ctx.restore(); }
  ctx.restore(); }

// ===== balanskussen; persoon erop wiebelt
function kussen(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w / 2, 26, 0, 0, 6.283); shape(ctx, C.paars, '#5A4A8F', 3); ctx.beginPath(); ctx.ellipse(x, y - 8, w / 2 - 14, 16, 0, 0, 6.283); ctx.fillStyle = rgba('#A898D8', 0.5); ctx.fill(); ctx.restore(); }

// ===== knie van opzij met knieschijfpees; pees 0..1 = markering
function knieZijPees(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { pees = 0, pijn = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -420, 110, 400, 40); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(-4, -20, 80, 54, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  roundRect(ctx, -50, 50, 100, 380, 36); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(0, 50, 86, 30, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  ctx.beginPath(); ctx.ellipse(-110, -40, 34, 56, 0.1, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  ctx.beginPath(); ctx.moveTo(-110, -330); ctx.quadraticCurveTo(-140, -200, -120, -95); ctx.lineTo(-90, -95); ctx.quadraticCurveTo(-80, -200, -40, -330); ctx.closePath(); shape(ctx, rgba(OE.spier, 0.85), '#8A3A34', 2);
  ctx.strokeStyle = pees > 0.5 ? C.goud : OE.pees; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-106, 10); ctx.lineTo(-56, 120); ctx.stroke();
  if (pijn > 0.01) flits(ctx, -84, 66, 60 + 6 * Math.sin(t * 6), pijn); ctx.restore(); }

// ===== collageendraden: orde 1 = netjes in de lengte, 0 = rommelig
function collageen(ctx, x, y, w, h, orde, a = 1, nieuw = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 20); shape(ctx, '#3E2E38', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 20); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < 40; i++) { const px = x + 40 + hash(i * 7 + 1) * (w - 80), py = y + 25 + hash(i * 11 + 2) * (h - 50), an = (hash(i * 13) - 0.5) * 3 * (1 - orde), L = 60 + 40 * hash(i * 17); ctx.strokeStyle = i < 40 * nieuw ? C.groen : rgba(OE.pees, 0.95); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== pijnmeter 0–10 met groene zone tot 5
function pijnMeter(ctx, x, y, w, waarde, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i <= 10; i++) { const bx = x + i * w / 11; roundRect(ctx, bx, y, w / 11 - 8, 56, 8); shape(ctx, i <= 5 ? rgba(C.groen, i <= waarde ? 0.95 : 0.3) : rgba(C.koraal, i <= waarde ? 0.95 : 0.3), C.line, 1.5); text(ctx, String(i), bx + (w / 11 - 8) / 2, y + 40, fTekst(28, 700), '#121A26', 'center'); }
  metaText(ctx, 'PIJN', x, y - 14, C.grain, 'left', 22); ctx.restore(); }

// ===== wervelkolom van opzij (onderrug): wervels met tussenwervelschijven; slijt 0..1
function wervels(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { slijt = 0, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { const yy = -260 + i * 120, xx = Math.sin(i * 0.6 + 0.4) * 30; roundRect(ctx, xx - 80, yy, 160, 86, 16); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.moveTo(xx + 80, yy + 20); ctx.lineTo(xx + 150, yy + 40); ctx.lineTo(xx + 80, yy + 66); ctx.closePath(); shape(ctx, OE.bot, OE.botR, 2);
    if (i < 4) { const dh = 30 * (1 - 0.45 * slijt); ctx.beginPath(); ctx.ellipse(xx + Math.sin(0.3) * 15, yy + 86 + 17, 74, dh / 2, 0, 0, 6.283); shape(ctx, slijt > 0.5 ? rgba(OE.schijf, 0.6) : OE.schijf, '#7AA6C2', 2); } }
  ctx.restore(); }

// ===== schouder: golfbal op een tee, met vier kleine spieren rond de kop
function golfTee(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spieren = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 60); ctx.quadraticCurveTo(0, 30, 70, 60); ctx.lineTo(16, 90); ctx.lineTo(10, 300); ctx.lineTo(-10, 300); ctx.lineTo(-16, 90); ctx.closePath(); shape(ctx, OE.bot, OE.botR, 2.5);
  circ(ctx, 0, -40, 110, '#F2F2EE', '#9AA3B2', 3); for (let i = 0; i < 18; i++) circ(ctx, -60 + (i % 6) * 24, -90 + Math.floor(i / 6) * 40, 6, rgba('#9AA3B2', 0.6));
  if (spieren > 0.01) { ctx.save(); ctx.globalAlpha *= spieren; ctx.strokeStyle = OE.spier; ctx.lineWidth = 26; ctx.lineCap = 'round'; for (let k = 0; k < 4; k++) { const an = -2.6 + k * 0.75; ctx.beginPath(); ctx.arc(0, -40, 132, an, an + 0.55); ctx.stroke(); } const pul = 0.5 + 0.5 * Math.sin(t * 3); pijl(ctx, -190, -40, -150, -40, C.goud, spieren * pul, 5, 14); pijl(ctx, 190, -40, 150, -40, C.goud, spieren * pul, 5, 14); ctx.restore(); }
  ctx.restore(); }

// ===== twee groepen: staaf vóór en na; echte operatie tegenover kijkoperatie
function groepBalken(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, 700, 380, '', 'MINDER PIJN');
  const st = (i, col, lab) => { const bx = x + 120 + i * 300, hh = 260 * u; roundRect(ctx, bx, y + 380 - hh, 140, hh, 10); shape(ctx, col, C.line, 1.5); text(ctx, lab, bx + 70, y + 430, fTekst(30, 600), C.text, 'center'); };
  st(0, C.teal, 'echte operatie'); st(1, C.oker, 'kijkoperatie'); ctx.restore(); }
function ultrageluid(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#E3B998'; ctx.fillRect(-200, 70, 400, 90); ctx.fillStyle = rgba('#B8564E', 0.6); ctx.fillRect(-200, 110, 400, 50); ctx.strokeStyle = '#5A6274'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(30, -110); ctx.quadraticCurveTo(140, -170, 190, -90); ctx.stroke();
  ctx.save(); ctx.rotate(0.25); roundRect(ctx, -26, -120, 52, 130, 22); shape(ctx, '#D8DEE4', '#8A93A6', 3); roundRect(ctx, -46, 6, 92, 40, 14); shape(ctx, '#8A93A6', '#5A6274', 2); ctx.restore();
  circ(ctx, -10, 72, 30, rgba('#BFE3F2', 0.7)); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(-10, 74, i * 24, 0.3, Math.PI - 0.3); ctx.stroke(); } ctx.restore(); }
