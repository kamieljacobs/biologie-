// Wat word jij? · Fysiotherapie 1 · Wat is er met die knie? — eigen tekeningen (21 okt 2026)

const KN = { bot: '#E6DCC6', botR: '#B8AC94', kraak: '#9CC4DC', band: '#E2C27A', bandR: '#B8963E', bloed: '#B23A3A', huid: '#F1D2B8', huidF: '#D8A47F', gras: '#3F6B45', grasD: '#345A3A' };
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }

// maat van een castpersoon (zoals in Hoe weefsel herstelt): knie en benen
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
// dikke knie op een persoon (zijde s = -1 links in beeld, 1 rechts)
function dikkeKnie(ctx, id, x, y, h, s, u, a = 1) { if (a <= 0.01 || u <= 0.01) return; const M = lijfMaat(id, x, y, h), kx = M.been(s), ky = M.kn + M.hh * 0.3; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * (0.2 + 0.16 * u), M.hh * (0.22 + 0.14 * u), 0, 0, 6.283); ctx.fillStyle = rgba('#E8A090', 0.55 * u); ctx.fill(); ctx.strokeStyle = rgba(C.koraal, 0.9 * u); ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); return { x: kx, y: ky }; }
function kniePunt(id, x, y, h, s) { const M = lijfMaat(id, x, y, h); return { x: M.been(s), y: M.kn + M.hh * 0.3, hh: M.hh }; }

// ===== knie van voren, opengewerkt. (x,y) = midden van het gewricht =====
// o: acl 0..1 scheur, bloed 0..1, hl {acl, pcl, menis, zij, bot, kraak}, knieschijf 0..1, dim 0..1 (rest vaag)
function knieVoor(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { acl = 0, bloed = 0, hl = {}, knieschijf = 0, dim = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const glow = (k, col) => { if ((hl[k] || 0) > 0.01) { ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 26 * hl[k]; ctx.stroke(); ctx.restore(); } };
  if (bloed > 0.01) { ctx.beginPath(); ctx.ellipse(0, 0, 230, 170, 0, 0, 6.283); ctx.fillStyle = rgba(KN.bloed, 0.35 * bloed); ctx.fill(); for (let i = 0; i < 14; i++) { const w2 = wander(i, t, 60, 0.4); circ(ctx, w2.x * 2.4, w2.y * 1.6, 7, rgba(KN.bloed, 0.8 * bloed)); } }
  const fade = 1 - dim * 0.6; ctx.globalAlpha *= fade;
  // dijbeen
  ctx.beginPath(); ctx.moveTo(-55, -440); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -440); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  // kraakbeen op de knobbels
  ctx.strokeStyle = KN.kraak; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-150, -40); ctx.bezierCurveTo(-148, 6, -50, 8, -28, -32); ctx.moveTo(28, -32); ctx.bezierCurveTo(50, 8, 148, 6, 150, -40); ctx.stroke(); glow('kraak', KN.kraak);
  // scheenbeen en kuitbeen
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 440); ctx.lineTo(-46, 440); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  ctx.strokeStyle = KN.kraak; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-160, 44); ctx.quadraticCurveTo(0, 28, 160, 44); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); shape(ctx, KN.bot, KN.botR, 2.5); roundRect(ctx, 146, 150, 26, 290, 10); shape(ctx, KN.bot, KN.botR, 2.5);
  // meniscus links en rechts (wigjes)
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 168, 44); ctx.lineTo(k * 162, 8); ctx.quadraticCurveTo(k * 100, 22, k * 44, 34); ctx.lineTo(k * 44, 38); ctx.quadraticCurveTo(k * 110, 40, k * 168, 44); ctx.closePath(); shape(ctx, '#B8D8EA', '#7AA6C2', 2); glow('menis', '#B8D8EA'); }
  // zijbanden
  ctx.strokeStyle = KN.band; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-160, -110); ctx.lineTo(-158, 160); ctx.moveTo(162, -110); ctx.lineTo(164, 118); ctx.stroke(); glow('zij', KN.band);
  // achterste kruisband (onder), voorste kruisband (boven, kan scheuren)
  ctx.lineWidth = 18; ctx.strokeStyle = '#C9A860'; ctx.beginPath(); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.stroke(); glow('pcl', '#C9A860');
  ctx.strokeStyle = (hl.acl || 0) > 0.5 ? C.goud : KN.band; const A0 = [-24, 40], A1 = [46, -62];
  if (acl < 0.01) { ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...A1); ctx.stroke(); glow('acl', C.goud); }
  else { const g = 0.5 - acl * 0.18, g2 = 0.5 + acl * 0.18, P = u => [A0[0] + (A1[0] - A0[0]) * u, A0[1] + (A1[1] - A0[1]) * u]; ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...P(g)); ctx.moveTo(...P(g2)); ctx.lineTo(...A1); ctx.stroke();
    ctx.lineWidth = 3; for (const u of [g, g2]) { const p = P(u); for (let j = -2; j <= 2; j++) { ctx.beginPath(); ctx.moveTo(p[0] + j * 4, p[1]); ctx.lineTo(p[0] + j * 6 + (u < 0.5 ? 8 : -8), p[1] + (u < 0.5 ? -10 : 10)); ctx.stroke(); } } }
  // knieschijf (ligt ervoor, doorzichtig)
  if (knieschijf > 0.01) { ctx.save(); ctx.globalAlpha *= knieschijf; ctx.beginPath(); ctx.ellipse(0, -120, 70, 86, 0, 0, 6.283); ctx.fillStyle = rgba(KN.bot, 0.35); ctx.fill(); ctx.setLineDash([10, 8]); ctx.strokeStyle = KN.botR; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ===== been van opzij (ligt op de tafel): bovenbeen naar links, onderbeen iets gebogen naar rechts; schuif = scheenbeen naar voren (omhoog in beeld)
function knieZij(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { schuif = 0, scheur = 0, handen = 1, huid = KN.huid, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const an = 0.42, dy = -schuif * 42; // onderbeen-hoek
  // tafel
  roundRect(ctx, -560, 120, 1120, 40, 10); shape(ctx, '#4A6A8A', '#6A8AAA', 2);
  // huid (doorzichtig)
  ctx.save(); ctx.globalAlpha *= 0.45; ctx.beginPath(); ctx.moveTo(-560, -95); ctx.quadraticCurveTo(-200, -120, -10, -80); ctx.quadraticCurveTo(40, -70, 60, -50 + dy); ctx.lineTo(60 + Math.cos(an) * 520, -40 + Math.sin(an) * 520 + dy * 0.2); ctx.lineTo(40 + Math.cos(an) * 520, 40 + Math.sin(an) * 520); ctx.lineTo(0, 90); ctx.quadraticCurveTo(-260, 115, -560, 110); ctx.closePath(); ctx.fillStyle = huid; ctx.fill(); ctx.restore();
  // dijbeen
  ctx.beginPath(); ctx.moveTo(-560, -28); ctx.lineTo(-90, -24); ctx.quadraticCurveTo(-30, -60, 10, -30); ctx.quadraticCurveTo(40, 0, 10, 34); ctx.quadraticCurveTo(-40, 46, -90, 26); ctx.lineTo(-560, 28); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  // scheenbeen (verschuift)
  ctx.save(); ctx.translate(0, dy); ctx.translate(20, 50); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-10, -58); ctx.quadraticCurveTo(30, -66, 60, -40); ctx.lineTo(420, -22); ctx.lineTo(420, 22); ctx.lineTo(60, 30); ctx.quadraticCurveTo(10, 40, -10, 10); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5); ctx.restore();
  // voorste kruisband: van voorkant scheenbeen naar achterkant dijbeen
  const p0 = [40, -10 + dy], p1 = [-14, 22]; ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  else { const m = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]; ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(m[0] + 8, m[1] - 8 * scheur); ctx.moveTo(m[0] - 8, m[1] + 8 * scheur); ctx.lineTo(...p1); ctx.stroke(); }
  // handen van Femke: één op het bovenbeen, één trekt het scheenbeen omhoog (naar voren)
  if (handen > 0.01) { ctx.save(); ctx.globalAlpha *= handen; const hand = (hx, hy, r) => { ctx.save(); ctx.translate(hx, hy); ctx.rotate(r); roundRect(ctx, -60, -26, 120, 52, 24); shape(ctx, KN.huidF, '#A87A5A', 2); ctx.restore(); };
    hand(-200, -112, 0.02); hand(170, 160 + dy, 0.42); pijl(ctx, 260, 120 + dy, 260, 40 + dy, C.goud, 0.4 + 0.6 * schuif, 6, 20); ctx.restore(); }
  ctx.restore(); }

// ===== been dat buigt met hoekmeter (thigh horizontaal), graden = buiging
function buigBeen(ctx, x, y, s, graden, a = 1, o = {}) { if (a <= 0.01) return; const { huid = KN.huid, dik = 0, col = C.goud } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const f = graden * Math.PI / 180, L = 300, ex = Math.cos(f) * L, ey = Math.sin(f) * L;
  ctx.lineCap = 'round'; ctx.strokeStyle = huid; ctx.lineWidth = 78; ctx.beginPath(); ctx.moveTo(-320, 0); ctx.lineTo(0, 0); ctx.lineTo(ex, ey); ctx.stroke();
  if (dik > 0.01) { ctx.beginPath(); ctx.arc(0, 0, 48 + 20 * dik, 0, 6.283); ctx.fillStyle = rgba('#E8A090', 0.8 * dik); ctx.fill(); }
  // hoekmeter: twee armen + boog
  ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-220, -60); ctx.lineTo(0, -60); ctx.stroke(); ctx.save(); ctx.rotate(f); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(220, -60); ctx.stroke(); ctx.restore();
  circ(ctx, 0, -60, 16, '#D8DEE4', '#8A93A6', 3); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 120, 0, f); ctx.stroke();
  text(ctx, Math.round(graden) + '°', Math.cos(f / 2) * 190, Math.sin(f / 2) * 190 + 14, fTekst(48, 700), col, 'center'); ctx.restore(); }

// ===== voetbalveld (achtergrond onderin) met doel
function veld(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = KN.gras; ctx.fillRect(0, 640, W, 240); ctx.fillStyle = KN.grasD; for (let i = 0; i < 8; i++) ctx.fillRect(i * 240, 640, 120, 240);
  ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 700); ctx.lineTo(W, 700); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1500, 780, 220, 50, 0, 0, 6.283); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(120, 700); ctx.lineTo(120, 470); ctx.lineTo(420, 470); ctx.lineTo(420, 700); ctx.stroke(); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(120 + i * 37, 470); ctx.lineTo(120 + i * 37, 700); ctx.stroke(); } ctx.restore(); }
function bal(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#2A3446', 3); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#2A3446'; ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = i * 1.2566 - 1.57; ctx.lineTo(Math.cos(an) * r * 0.38, Math.sin(an) * r * 0.38); } ctx.fill(); ctx.restore(); }

// ===== praktijkruimte: behandeltafel en skeletposter
function praktijk(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22304C'; ctx.fillRect(0, 760, W, 120);
  roundRect(ctx, 1180, 600, 560, 60, 14); shape(ctx, '#3E6A8E', '#5E8AAE', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(1220, 660, 24, 120); ctx.fillRect(1676, 660, 24, 120); ctx.restore(); }
function notitie(ctx, x, y, w, regels, a = 1) { if (a <= 0.01) return; const h = 80 + regels.length * 64; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(-0.03); ctx.translate(-x - w / 2, -y - h / 2);
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEDF', '#B8B09A', 2); ctx.fillStyle = '#C9B896'; ctx.fillRect(x, y, w, 26);
  regels.forEach(([s2, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, s2, x + 30, y + 86 + i * 64, fTekst(34, 600), '#2A3446', 'left'); ctx.restore(); } }); ctx.restore(); ctx.restore(); }

// ===== röntgenfoto: botten wit, banden onzichtbaar
function rontgen(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spook = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 220 * s, y - 330 * s, 440 * s, 660 * s, 14); shape(ctx, '#0B1018', '#5A6478', 3);
  ctx.save(); roundRect(ctx, x - 220 * s, y - 330 * s, 440 * s, 660 * s, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s * 0.62, s * 0.62);
  ctx.filter = 'blur(2px)'; ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.beginPath(); ctx.moveTo(-55, -440); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -440); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 440); ctx.lineTo(-46, 440); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); ctx.fill(); ctx.fillRect(146, 150, 26, 290); ctx.filter = 'none';
  if (spook > 0.01) { ctx.globalAlpha *= spook; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-24, 40); ctx.lineTo(46, -62); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.moveTo(-160, -110); ctx.lineTo(-158, 160); ctx.moveTo(162, -110); ctx.lineTo(164, 118); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// rij van een checklist: vierkantje + tekst; st = 'ja' | 'nee' | null
function checkRij(ctx, s2, x, y, a = 1, st = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 40, 40, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 2); text(ctx, s2, x + 64, y, fTekst(px, 600), C.text, 'left'); ctx.restore();
  if (st === 'nee') kruis(ctx, x + 20, y - 14, 13, a); if (st === 'ja') vink_(ctx, x + 20, y - 14, 14, a); }
// kalender met n blokjes (weken/maanden), k gevuld
function kalender(ctx, x, y, n, k, lab, a = 1, per = 6, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, per * 70 + 30, Math.ceil(n / per) * 70 + 80, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = C.koraal; ctx.fillRect(x, y, per * 70 + 30, 44);
  text(ctx, lab, x + (per * 70 + 30) / 2, y + 32, fTekst(28, 700), '#FFFFFF', 'center'); for (let i = 0; i < n; i++) { const bx = x + 20 + (i % per) * 70, by = y + 60 + Math.floor(i / per) * 70; roundRect(ctx, bx, by, 56, 56, 8); shape(ctx, i < k ? col : '#DDE2E8', '#9AA3B2', 1.5); } ctx.restore(); }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }
