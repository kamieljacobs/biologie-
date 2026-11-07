// Wat word jij? · Verloskunde — gedeelde tekeningen voor de reeks (21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra, baby).
// Kleuren: vlees/baarmoeder VK.spier, vruchtwater VK.vocht, placenta VK.plac, bloed moeder VK.bloedM, bloed kind VK.bloedK.
const VK = { spier: '#C98A7A', spierD: '#A8685A', vocht: '#5BA4C9', plac: '#9E3B4A', placL: '#C2566A', bloedM: '#D8573F', bloedK: '#E8909A', huid: '#E8B9A0', huidD: '#D29C82',
  ecto: '#5BA4C9', meso: '#E07A5F', endo: '#E0B64A', dna: '#8C7BBF', melk: '#F4EEDC' };
function vkA(ctx, a) { ctx.save(); ctx.globalAlpha *= a; }

// ---------- ruimte ----------
// praktijkkamer: vloer, raam, poster met baarmoeder, plant. Personen staan op y = 880.
function praktijk(ctx, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a);
  ctx.fillStyle = rgba('#000000', 0.18); ctx.fillRect(0, 880, W, 200); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(W, 880); ctx.stroke();
  if (!o.zonderRaam) { const rx = o.raamX ?? 1520; roundRect(ctx, rx, 90, 280, 220, 10); shape(ctx, rgba(C.teal, 0.12), rgba(C.line, 0.6), 3); ctx.strokeStyle = rgba(C.line, 0.45); ctx.beginPath(); ctx.moveTo(rx + 140, 90); ctx.lineTo(rx + 140, 310); ctx.moveTo(rx, 200); ctx.lineTo(rx + 280, 200); ctx.stroke(); }
  if (!o.zonderPoster) { const px = o.posterX ?? 150; roundRect(ctx, px, 170, 220, 280, 8); shape(ctx, rgba(C.text, 0.06), rgba(C.line, 0.5), 2); baarmoeder(ctx, px + 110, 330, 0.32, { week: 20, a: 0.8, lijn: true }); }
  if (!o.zonderPlant) { const lx = o.plantX ?? 1830; ctx.fillStyle = '#6B4E3A'; roundRect(ctx, lx - 34, 800, 68, 80, 8); ctx.fill(); ctx.fillStyle = rgba(C.groen, 0.75); [[-30, 760, -0.6], [0, 740, 0], [30, 765, 0.6], [-14, 720, -0.25], [16, 718, 0.3]].forEach(([dx, yy, r]) => { ctx.beginPath(); ctx.ellipse(lx + dx, yy, 18, 54, r, 0, 6.283); ctx.fill(); }); }
  ctx.restore(); }

// huis (eerste lijn) en ziekenhuis (tweede lijn) als icoon
function huisje(ctx, x, y, s = 1, a = 1, col = C.groen) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(0, -140); ctx.lineTo(90, -60); ctx.lineTo(90, 60); ctx.lineTo(-90, 60); ctx.closePath(); shape(ctx, rgba(col, 0.18), col, 4);
  roundRect(ctx, -22, 0, 44, 60, 4); shape(ctx, rgba(col, 0.45), null); roundRect(ctx, 34, -30, 36, 36, 4); shape(ctx, rgba(C.goud, 0.5), null); ctx.restore(); }
function ziekenhuis(ctx, x, y, s = 1, a = 1, col = C.teal) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, -150, 240, 210, 8); shape(ctx, rgba(col, 0.16), col, 4); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) if (!(r === 2 && (k === 1 || k === 2))) { roundRect(ctx, -96 + k * 52, -126 + r * 52, 30, 30, 3); shape(ctx, rgba(C.goud, 0.35), null); }
  roundRect(ctx, -24, 4, 48, 56, 4); shape(ctx, rgba(col, 0.45), null); ctx.fillStyle = C.koraal; ctx.fillRect(-12, -205, 24, 66); ctx.fillRect(-33, -184, 66, 24); ctx.restore(); }

// ---------- baarmoeder, placenta, kind ----------
// baarmoeder in doorsnede (peervorm, hals onder); o.week bepaalt kind; o.placenta; o.hoofdOnder; o.lijn = alleen omlijning (poster)
function baarmoeder(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  const g = o.groei == null ? 1 : o.groei, R = 200 + 120 * g, H = 230 + 150 * g; const pad = (k) => { ctx.beginPath(); ctx.moveTo(-60 * k, H * 0.95); ctx.bezierCurveTo(-R * k * 1.05, H * 0.6, -R * k * 1.15, -H * 0.55, 0, -H * k); ctx.bezierCurveTo(R * k * 1.15, -H * 0.55, R * k * 1.05, H * 0.6, 60 * k, H * 0.95); ctx.closePath(); };
  if (o.lijn) { pad(1); ctx.strokeStyle = VK.spier; ctx.lineWidth = 10; ctx.stroke(); foetus(ctx, 0, 0, 0.9, { week: o.week || 20, lijn: true }); ctx.restore(); return; }
  pad(1); shape(ctx, VK.spier, null); pad(0.86); shape(ctx, rgba(VK.vocht, 0.28), rgba(VK.vocht, 0.6), 2);
  // hals
  roundRect(ctx, -46, H * 0.9, 92, 70 * (1 - (o.open || 0) * 0.6), 18); shape(ctx, VK.spierD, null); if ((o.open || 0) > 0.01) { roundRect(ctx, -46 * (o.open), H * 0.9, 92 * o.open, 80, 12); shape(ctx, rgba(C.bgSchema, 1), null); }
  if (o.placenta !== false) { const pa = o.placenta == null ? 1 : o.placenta; ctx.save(); ctx.globalAlpha *= pa; ctx.beginPath(); ctx.ellipse(R * 0.35, -H * 0.66, R * 0.42, 46, 0.45, 0, 6.283); shape(ctx, VK.plac, VK.placL, 3);
    ctx.fillStyle = rgba(VK.placL, 0.6); for (let i = 0; i < 9; i++) circ(ctx, R * 0.35 + (i - 4) * 18 * Math.cos(0.45), -H * 0.66 + (i - 4) * 18 * Math.sin(0.45) + (i % 2 ? 10 : -10), 7, rgba(VK.placL, 0.7)); ctx.restore(); }
  const fs = o.fs || (0.35 + 0.75 * g); const hoofdOnder = o.hoofdOnder ?? (g > 0.6);
  if (o.week !== 0) { const kind = foetus(ctx, o.fx || 0, (o.fy || 0) + (hoofdOnder ? 40 : 0), fs, { week: o.week || 30, rot: hoofdOnder ? Math.PI : 0, t: o.t });
    if (o.placenta !== false && kind) { ctx.strokeStyle = VK.bloedK; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(R * 0.25, -H * 0.6); ctx.bezierCurveTo(R * 0.55, -H * 0.2, -R * 0.1, -H * 0.25, kind.navel[0], kind.navel[1]); ctx.stroke();
      ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.stroke(); ctx.setLineDash([]); } }
  ctx.restore(); }

// kind in de buik. week = weken zwangerschap (≤ 10: embryo, C-vorm met staartje; daarna opgerold kind). Geeft {navel:[x,y]} terug in het lokale stelsel.
function foetus(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null; const wk = o.week || 30, t = o.t || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const huid = VK.huid, D = VK.huidD;
  if (o.lijn) { ctx.strokeStyle = huid; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-10, -70, 62, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -20); ctx.bezierCurveTo(110, 20, 90, 140, 0, 150); ctx.bezierCurveTo(-70, 150, -90, 80, -40, 20); ctx.stroke(); ctx.restore(); return { navel: [x, y] }; }
  if (wk <= 10) { // embryo: kromme romp, groot hoofd, knopjes
    ctx.beginPath(); ctx.moveTo(-30, -110); ctx.bezierCurveTo(70, -150, 120, -40, 80, 40); ctx.bezierCurveTo(50, 110, -10, 120, -40, 90); ctx.quadraticCurveTo(-20, 70, 10, 80); ctx.bezierCurveTo(40, 40, 30, -30, -30, -40); ctx.closePath(); shape(ctx, huid, null);
    ctx.beginPath(); ctx.ellipse(-30, -70, 72, 62, -0.3, 0, 6.283); shape(ctx, huid, null); circ(ctx, -52, -76, 9, rgba('#3A2A30', 0.55));
    const kn = clamp((wk - 6) / 4, 0.2, 1); ctx.fillStyle = D; ctx.beginPath(); ctx.ellipse(40, -20, 14 * kn + 4, 26 * kn + 4, -0.6, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(66, 50, 14 * kn + 4, 26 * kn + 4, 0.4, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba(C.bloedK || VK.bloedK, 0.9); circ(ctx, 18, -2, 13, rgba(VK.bloedM, 0.85 + 0.15 * Math.sin(t * 9)));
    ctx.restore(); return { navel: [x + 20 * s, y + 30 * s] }; }
  // opgerold kind: rug rechts, hoofd boven, knieën naar de borst
  ctx.beginPath(); ctx.moveTo(-20, -40); ctx.bezierCurveTo(90, -50, 120, 70, 70, 140); ctx.bezierCurveTo(40, 180, -40, 185, -70, 150); ctx.bezierCurveTo(-95, 110, -80, 40, -60, 0); ctx.closePath(); shape(ctx, huid, null);
  ctx.fillStyle = D; ctx.beginPath(); ctx.ellipse(-30, 120, 60, 34, -0.5, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(10, 168, 42, 18, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = D; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 10); ctx.quadraticCurveTo(-70, 50, -50, 80); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-20, -100, 80, 76, 0.15, 0, 6.283); shape(ctx, huid, null); ctx.strokeStyle = rgba('#3A2A30', 0.55); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-62, -100, 10, 0.2, 2.6); ctx.stroke();
  ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.beginPath(); ctx.ellipse(0, -130, 34, 18, -0.4, 0, 6.283); ctx.fill();
  ctx.restore(); const c = Math.cos(o.rot || 0), sn = Math.sin(o.rot || 0); return { navel: [x + (-50 * c - 60 * sn) * s, y + (-50 * sn + 60 * c) * s] }; }

// blaasje van cellen (blastocyste) dat zich innestelt; u 0..1 = ingegroeid
function blastocyste(ctx, x, y, r, a = 1, u = 0, t = 0) { if (a <= 0.01) return; vkA(ctx, a);
  const n = 18; for (let i = 0; i < n; i++) { const an = i / n * 6.283; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, r * 0.2, rgba(C.paars, 0.75), C.paars, 1.5); }
  ctx.beginPath(); ctx.ellipse(x, y + r * 0.45, r * 0.45, r * 0.32, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); ctx.restore(); }

// kiemschijf met drie lagen; u 0..1 = lagen verschijnen na elkaar; uit = 0..1 pijlen naar organen
function kiemschijf(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; vkA(ctx, a); const h = 46;
  [[VK.ecto, 0], [VK.meso, 1], [VK.endo, 2]].forEach(([col, i]) => { const f = clamp(u * 3 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.beginPath(); ctx.ellipse(x, y + i * (h + 8), w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.55), col, 3); ctx.restore(); }); ctx.restore(); }

// neurale buis in doorsnede: u 0 = vlakke plaat, 1 = gesloten buis onder de huid (plaat met vaste lengte buigt tot een cirkel)
function neuraleBuis(ctx, x, y, s = 1, a = 1, u = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const R0 = 80, L = 2 * Math.PI * R0, f = clamp(u, 0.02, 1), r = L / (2 * Math.PI * f), cy = 40 - r, sp = Math.PI * f;
  const lx = Math.cos(Math.PI / 2 + sp) * r, ly = cy + Math.sin(Math.PI / 2 + sp) * r, rx = -lx;
  ctx.lineCap = 'round'; ctx.strokeStyle = rgba(VK.ecto, 0.45); ctx.lineWidth = 24; ctx.beginPath();
  if (u < 0.97) { ctx.moveTo(-340, 40); ctx.lineTo(lx - 20, ly); ctx.moveTo(340, 40); ctx.lineTo(rx + 20, ly); } else { const yy = 40 - 2 * R0 - 40; ctx.moveTo(-340, 40); ctx.quadraticCurveTo(-160, yy, 0, yy); ctx.quadraticCurveTo(160, yy, 340, 40); }
  ctx.stroke(); ctx.strokeStyle = VK.ecto; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, cy, r, Math.PI / 2 - sp, Math.PI / 2 + sp); ctx.stroke(); ctx.restore(); }

// tijdlijn in weken (0..40). marks = [[week, label, col, alpha], …]; nu = week van de wijzer
function tijdlijn(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const max = o.max || 40, X = (wk) => x + w * wk / max;
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let k = 0; k <= max; k += (o.stap || 4)) { ctx.beginPath(); ctx.moveTo(X(k), y - 10); ctx.lineTo(X(k), y + 10); ctx.stroke(); metaText(ctx, String(k), X(k), y + 46, C.text2, 'center', 22); }
  if (o.titel) metaText(ctx, o.titel, x, y + 90, C.grain, 'left', 22);
  (o.marks || []).forEach(([wk, lab, col, al = 1, hoog = 0]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(wk), y, 14, col, null); text(ctx, lab, X(wk), y - 34 - hoog, fTekst(28, 700), col, 'center'); ctx.restore(); });
  (o.banden || []).forEach(([w0, w1, col, al = 1, lab]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, X(w0), y - 12, X(w1) - X(w0), 24, 12); shape(ctx, rgba(col, 0.55), col, 2); if (lab) text(ctx, lab, (X(w0) + X(w1)) / 2, y + 135, fTekst(28, 700), col, 'center'); ctx.restore(); });
  ctx.restore(); }

// longblaasje met haarvaten. open 0..1; surf 0..1 = laagje surfactant (goud)
function longblaasje(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const op = o.open == null ? 1 : o.open, rr = r * (0.35 + 0.65 * op);
  ctx.strokeStyle = rgba(VK.bloedM, 0.6); ctx.lineWidth = 7; for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.3; ctx.beginPath(); ctx.arc(x, y, rr + 12, an, an + 0.7); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x, y, rr, rr * (0.55 + 0.45 * op), 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), '#E8B9C0', 5);
  if ((o.surf || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.surf; ctx.beginPath(); ctx.ellipse(x, y, rr - 7, rr * (0.55 + 0.45 * op) - 7, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if ((o.water || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.water; ctx.beginPath(); ctx.ellipse(x, y, rr - 7, rr * (0.55 + 0.45 * op) - 7, 0, 0, 6.283); ctx.strokeStyle = rgba(VK.vocht, 0.9); ctx.lineWidth = 8; ctx.stroke();
    for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283; pijl(ctx, x + Math.cos(an) * (rr + 30), y + Math.sin(an) * (rr + 30) * (0.55 + 0.45 * op), x + Math.cos(an) * (rr - 26), y + Math.sin(an) * (rr - 26) * (0.55 + 0.45 * op), C.koraal, 0.8, 4, 12); } ctx.restore(); }
  ctx.restore(); }

// injectiespuit; vol 0..1
function spuit(ctx, x, y, s = 1, a = 1, rot = -0.6, vol = 1) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -120, -22, 200, 44, 8); shape(ctx, rgba('#FFFFFF', 0.25), '#DCE3EA', 3); roundRect(ctx, -116 + 196 * (1 - vol), -18, 196 * vol, 36, 6); shape(ctx, rgba(C.goud, 0.6), null);
  ctx.fillStyle = '#DCE3EA'; ctx.fillRect(-160, -6, 44, 12); ctx.fillRect(-170, -30, 12, 60); ctx.strokeStyle = '#DCE3EA'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(80, 0); ctx.lineTo(170, 0); ctx.stroke(); ctx.restore(); }

// ---------- meten ----------
function bloeddrukMeter(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -110, 260, 220, 22); shape(ctx, '#E8ECF0', '#B8C2CC', 3); roundRect(ctx, -100, -80, 200, 120, 10); shape(ctx, '#1C2A24', null);
  const k = clamp(o.u == null ? 1 : o.u, 0, 1), bo = Math.round((o.boven || 120) * k), on = Math.round((o.onder || 80) * k), kl = o.kleur || '#9FE0A8';
  text(ctx, String(bo), 60, -24, fTekst(52, 800), kl, 'right'); text(ctx, String(on), 60, 30, fTekst(40, 800), kl, 'right'); metaText(ctx, 'MMHG', -86, 30, rgba(kl, 0.7), 'left', 16);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 110); ctx.bezierCurveTo(0, 170, -120, 160, -150, 200); ctx.stroke(); ctx.restore(); }
// manchet om een arm (op hand-anker): band
function manchet(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - 34 * s, y - 50 * s, 68 * s, 100 * s, 12 * s); shape(ctx, '#3E5A7A', '#2E4560', 2); ctx.restore(); }
// doptone: kastje met hartslag en golfjes
function doptone(ctx, x, y, s = 1, a = 1, bpm = 140, t = 0, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -80, 220, 160, 20); shape(ctx, '#E8ECF0', '#B8C2CC', 3); roundRect(ctx, -84, -56, 168, 80, 8); shape(ctx, '#1C2A24', null);
  text(ctx, String(Math.round(bpm)), 0, 2, fTekst(48, 800), '#9FE0A8', 'center'); const slag = (t * bpm / 60) % 1; circ(ctx, 60, -34, 8, rgba(C.koraal, 1 - slag));
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 80); ctx.bezierCurveTo(0, 140, 90, 140, 120, 190); ctx.stroke(); roundRect(ctx, 100, 180, 60, 80, 20); shape(ctx, '#C8D0D8', null);
  if (o.golf) { ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { const f = ((t * 1.5 + i / 3) % 1); ctx.globalAlpha = (1 - f) * 0.8; ctx.beginPath(); ctx.arc(130, 270, 20 + f * 70, 0.6, 2.5); ctx.stroke(); } }
  ctx.restore(); }
// urinestrip: vakjes, eiwitvakje kleurt (eiwit 0..1)
function urineStrip(ctx, x, y, s = 1, a = 1, eiwit = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -30, -200, 60, 400, 8); shape(ctx, '#F2F2EE', '#C8D0D8', 2); ['#E8D86A', '#9FD0A8', null, '#E0A0B0'].forEach((c, i) => { roundRect(ctx, -20, -180 + i * 60, 40, 40, 4); shape(ctx, c || _mixHex('#E8E070', '#3E8E7E', eiwit), null); });
  metaText(ctx, 'EIWIT', 40, -180 + 2 * 60 + 28, C.grain, 'left', 22); ctx.restore(); }

// stukje baarmoederwand met een spiraalslagader; wijd 0..1 (omgebouwd); stroom = bloeddeeltjes
function spiraalSlagader(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const wd = o.wijd || 0, t = o.t || 0;
  roundRect(ctx, -260, -260, 520, 520, 30); shape(ctx, rgba(VK.spier, 0.35), rgba(VK.spier, 0.8), 2); metaText(ctx, o.label || 'BAARMOEDERWAND', -240, -280, C.grain, 'left', 22); roundRect(ctx, -260, -260, 520, 520, 30); ctx.clip();
  const pts = []; for (let k = 0; k <= 60; k++) { const u = k / 60; pts.push([Math.sin(u * 14) * 60 * (1 - wd * 0.85), 260 - u * 560]); }
  const breed = 22 + wd * 70; ctx.strokeStyle = VK.bloedM; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = breed + 14; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.strokeStyle = rgba('#7A2A2A', 0.9); ctx.stroke();
  ctx.lineWidth = breed; ctx.strokeStyle = rgba(VK.bloedM, 0.85); ctx.stroke();
  const n = Math.round(6 + 20 * wd), sp = 0.15 + 0.35 * wd; for (let i = 0; i < n; i++) { const u = ((t * sp + i / n) % 1), p = pts[Math.min(60, Math.floor(u * 60))]; circ(ctx, p[0] + (i % 3 - 1) * breed * 0.2, p[1], 6, '#F2B0A0'); }
  if ((o.trofo || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.trofo; for (let k = 4; k < 58; k += 5) { const p = pts[k], d = (k % 10 < 5 ? 1 : -1); circ(ctx, p[0] + d * (breed / 2 + 12), p[1], 11, rgba(C.paars, 0.85), C.paars, 1.5); } ctx.restore(); }
  ctx.restore(); }

// nierfilter (kluwen van haarvaten → kapsel): kleine stofjes gaan door, eiwitketens alleen als lek > 0
function nierFilter(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const lek = o.lek || 0, t = o.t || 0;
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 180, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.08), C.goud, 3); metaText(ctx, 'NIERFILTER', -220, -200, C.grain, 'left', 22);
  ctx.strokeStyle = rgba(VK.bloedM, 0.85); ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-320, -60); ctx.lineTo(-150, -40); for (let k = 0; k <= 90; k++) { const u = k / 90, an = u * 6.283 * 3; ctx.lineTo(-20 + Math.cos(an) * (60 + 50 * Math.sin(u * 9)) + u * 40, -10 + Math.sin(an) * (70 + 30 * Math.cos(u * 7))); } ctx.lineTo(150, -40); ctx.lineTo(320, -60); ctx.stroke();
  for (let i = 0; i < 10; i++) { const f = (t * 0.4 + i / 10) % 1; circ(ctx, -150 + i * 30, 120 + f * 90, 6, rgba(C.teal, 0.9 * (1 - f))); }
  if (lek > 0.01) { ctx.save(); ctx.globalAlpha *= lek; for (let i = 0; i < 4; i++) { const f = (t * 0.25 + i / 4) % 1; const px = -120 + i * 70, py = 100 + f * 120; ctx.strokeStyle = C.paars; ctx.lineWidth = 7; ctx.beginPath(); for (let k = 0; k < 6; k++) ctx.lineTo(px + Math.cos(k * 1.7) * 14, py + k * 6); ctx.stroke(); } ctx.restore(); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, 180); ctx.lineTo(-40, 260); ctx.moveTo(40, 180); ctx.lineTo(40, 260); ctx.stroke(); metaText(ctx, 'URINE', 60, 250, C.goud, 'left', 22);
  ctx.restore(); }

// ---------- screening ----------
// raster van n stipjes (per rij), k gemarkeerd met kleur col; echt = aantal van de gemarkeerde dat goud (echt) is
function stipRaster(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const n = o.n || 10000, per = o.per || 125, d = o.d || 7, r = o.r || 2.4;
  ctx.fillStyle = rgba(C.line, 0.45); for (let i = 0; i < n; i++) ctx.fillRect(x + (i % per) * d, y + Math.floor(i / per) * d, r, r);
  (o.hl || []).forEach(([idx, col, rad, al = 1]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, x + (idx % per) * d + 1, y + Math.floor(idx / per) * d + 1, rad, col, null); ctx.restore(); });
  ctx.restore(); }
// chromosoom als staafje met insnoering; dubbel = X-vorm (twee chromatiden)
function chromosoom(ctx, x, y, h, col, a = 1, rot = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot);
  for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.18); roundRect(ctx, -9, -h / 2, 18, h, 9); shape(ctx, col, null); ctx.restore(); } circ(ctx, 0, -h * 0.12, 9, _mixHex(col.startsWith('#') ? col : '#888888', '#000000', 0.3)); ctx.restore(); }
// DNA-snippertje (kort stukje dubbele helix)
function dnaSnipper(ctx, x, y, s = 1, col = VK.dna, a = 1, rot = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineWidth = 4; ctx.strokeStyle = col;
  for (const f of [0, Math.PI]) { ctx.beginPath(); for (let k = 0; k <= 20; k++) ctx.lineTo(-40 + k * 4, Math.sin(k * 0.6 + f) * 10); ctx.stroke(); } ctx.strokeStyle = rgba(col, 0.5); ctx.lineWidth = 2; for (let k = 1; k < 20; k += 3) { ctx.beginPath(); ctx.moveTo(-40 + k * 4, Math.sin(k * 0.6) * 10); ctx.lineTo(-40 + k * 4, Math.sin(k * 0.6 + Math.PI) * 10); ctx.stroke(); } ctx.restore(); }
// echoscherm: waaiervormig beeld; fn(ctx) tekent de inhoud (in het midden van de waaier)
function echoScherm(ctx, x, y, w, a = 1, fn = null) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - w / 2 - 30, y - 30, w + 60, w * 0.75 + 60, 16); shape(ctx, '#0A0E14', '#3A4458', 3);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, w * 0.72, Math.PI * 0.27, Math.PI * 0.73); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#20242A'; ctx.fillRect(x - w, y, w * 2, w);
  if (fn) { ctx.save(); ctx.translate(x, y + w * 0.42); fn(ctx); ctx.restore(); } ctx.restore(); ctx.restore(); }
// naald (rechte lijn met punt), van (x1,y1) naar (x2,y2), u 0..1 = hoe ver ingeschoven
function naald(ctx, x1, y1, x2, y2, a = 1, u = 1) { if (a <= 0.01) return; vkA(ctx, a); const ex = x1 + (x2 - x1) * u, ey = y1 + (y2 - y1) * u; ctx.strokeStyle = '#DCE3EA'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke(); roundRect(ctx, x1 - 18, y1 - 18, 36, 36, 6); shape(ctx, '#B8C2CC', null); ctx.restore(); }

// ---------- bevalling ----------
// bekken van boven (ingang) of van onder (uitgang): ovaal dat breed is van links-rechts (ingang) of voor-achter (uitgang); hoofd = ovaal met rot
function bekkenRing(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const ing = o.ingang !== false;
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 200, 0, 0, 6.283); ctx.ellipse(0, 0, ing ? 150 : 110, ing ? 110 : 150, 0, 0, 6.283, true); shape(ctx, '#D8CDB8', null); ctx.strokeStyle = '#B8AA90'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, ing ? 150 : 110, ing ? 110 : 150, 0, 0, 6.283); ctx.stroke();
  if (o.hoofd != null) { ctx.save(); ctx.rotate(o.hoofd); ctx.beginPath(); ctx.ellipse(0, 0, 128, 96, 0, 0, 6.283); shape(ctx, rgba(VK.huid, 0.9), VK.huidD, 3); ctx.strokeStyle = rgba(VK.huidD, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-100, 0); ctx.lineTo(100, 0); ctx.stroke(); ctx.restore(); }
  metaText(ctx, o.label || (ing ? 'INGANG · VAN BOVEN' : 'UITGANG · VAN ONDER'), 0, 250, C.grain, 'center', 22); ctx.restore(); }

// hart in schema (kind): RB/LB boven, RK/LK onder; longslagader (blauw) uit RK naar de longen, aorta (rood) uit LK naar het lichaam.
// ovale 0 open, 1 dicht (gang tussen de boezems, achter de slagaders); ductus 0 open, 1 dicht (verbinding longslagader → aorta); long 0..1 = doorbloeding longen
// Geeft ankers terug (ovale, ductus, longen, aorta) in schermcoördinaten.
function hartSchema(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return {}; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const ov = o.ovale || 0, du = o.ductus || 0, lg = o.long == null ? 0.2 : o.long, t = o.t || 0;
  const blauw = '#6A8FC8', rood = VK.bloedM, mix = '#B07AA8';
  // longen
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 330, -360, 140, 95, d * 0.15, 0, 6.283); shape(ctx, rgba('#E8B9C0', 0.12 + 0.5 * lg), rgba('#E8B9C0', 0.4 + 0.6 * lg), 3);
    if (lg < 0.5) { ctx.strokeStyle = rgba(VK.vocht, 0.6 * (1 - lg * 2)); ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(d * 330, -360, 100 - k * 30, 60 - k * 18, 0, 0, 6.283); ctx.stroke(); } } }
  // foramen ovale: gang tussen de boezems (achter)
  if (ov < 0.99) { ctx.strokeStyle = rgba(mix, 0.9 * (1 - ov)); ctx.lineWidth = 34 * (1 - ov * 0.8); ctx.beginPath(); ctx.moveTo(-110, -40); ctx.lineTo(110, -40); ctx.stroke(); }
  const kamer = (cx, cy, w, h, col, lab) => { roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 40); shape(ctx, rgba(col, 0.35), col, 4); text(ctx, lab, cx, cy + 12, fTekst(30, 800), C.text, 'center'); };
  kamer(-205, -40, 190, 150, blauw, 'RB'); kamer(205, -40, 190, 150, rood, 'LB'); kamer(-110, 160, 210, 200, blauw, 'RK'); kamer(110, 160, 210, 200, rood, 'LK');
  // klepje van het foramen ovale in de wand van de linkerboezem
  ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(110, -80); ctx.lineTo(110 + 30 * (1 - ov), -20 + 20 * ov); ctx.stroke();
  // slagaders
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 36; ctx.strokeStyle = blauw; ctx.beginPath(); ctx.moveTo(-50, 70); ctx.lineTo(-50, -230); ctx.quadraticCurveTo(-50, -280, -200, -330); ctx.moveTo(-50, -250); ctx.quadraticCurveTo(-30, -300, 200, -340); ctx.stroke();
  ctx.strokeStyle = rood; ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, -170); ctx.bezierCurveTo(50, -270, 330, -280, 380, -100); ctx.lineTo(390, 120); ctx.stroke(); metaText(ctx, 'NAAR HET LICHAAM', 410, 160, C.grain, 'left', 20);
  // ductus Botalli
  const dw = 26 * (1 - du); ctx.strokeStyle = mix; if (dw > 2) { ctx.lineWidth = dw; ctx.beginPath(); ctx.moveTo(-50, -170); ctx.quadraticCurveTo(10, -150, 70, -205); ctx.stroke(); } else { ctx.lineWidth = 5; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(-50, -170); ctx.quadraticCurveTo(10, -150, 70, -205); ctx.stroke(); ctx.setLineDash([]); }
  // bloeddeeltjes
  for (let i = 0; i < 6; i++) { const f = (t * 0.5 + i / 6) % 1;
    if (ov < 0.9) circ(ctx, -110 + 220 * f, -40, 9, rgba('#F2D0E0', 1 - ov));
    if (du < 0.9) circ(ctx, -50 + 120 * f, -170 + 10 * Math.sin(f * 3.14) - 35 * f * f, 8, rgba('#F2D0E0', 1 - du));
    const fl = lg; if (fl > 0.05) { circ(ctx, -50 - 150 * f, -250 - 80 * f, 7, rgba('#DDE6F4', fl)); circ(ctx, -50 + 250 * f, -250 - 90 * f, 7, rgba('#DDE6F4', fl)); } }
  ctx.restore();
  const P = (px, py) => [x + px * s, y + py * s]; return { ovale: P(0, -40), ductus: P(10, -165), longL: P(-330, -360), longR: P(330, -360), aorta: P(380, -60) }; }

// Apgar-kaart: vijf rijen met score 0..2; u 0..1 = rijen vullen
function apgar(ctx, x, y, a = 1, scores = [2, 2, 2, 1, 2], u = 1) { if (a <= 0.01) return; vkA(ctx, a); const R = ['hartslag', 'ademhaling', 'spierspanning', 'reactie', 'kleur']; roundRect(ctx, x, y, 520, 410, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); metaText(ctx, 'APGAR-SCORE', x + 30, y + 52, C.grain, 'left', 24);
  let som = 0; R.forEach((r, i) => { const f = clamp(u * 5 - i, 0, 1); text(ctx, r, x + 30, y + 112 + i * 58, fTekst(30, 600), C.text, 'left'); for (let k = 0; k <= 2; k++) { const on = f > 0.5 && scores[i] === k; circ(ctx, x + 340 + k * 60, y + 102 + i * 58, 20, on ? C.groen : rgba(C.line, 0.25), null); text(ctx, String(k), x + 340 + k * 60, y + 112 + i * 58, fTekst(24, 800), on ? C.bgSchema : C.text2, 'center'); } if (f > 0.5) som += scores[i]; });
  if (u > 0.99) text(ctx, 'samen: ' + som, x + 490, y + 52, fTekst(32, 800), C.groen, 'right'); ctx.restore(); }

// maatbeker met bloed; ml 0..1200
function maatbeker(ctx, x, y, s = 1, a = 1, ml = 300, grens = true) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const H = 360, k = clamp(ml / 1200, 0, 1);
  roundRect(ctx, -90, -H, 180, H, 14); shape(ctx, rgba('#FFFFFF', 0.06), '#C8D0D8', 3); roundRect(ctx, -84, -H * k, 168, H * k - 6, 10); shape(ctx, rgba(VK.bloedM, 0.85), null);
  for (let m = 200; m <= 1200; m += 200) { const yy = -H * m / 1200; ctx.strokeStyle = '#C8D0D8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, yy); ctx.lineTo(-60, yy); ctx.stroke(); metaText(ctx, String(m), -100, yy + 8, C.text2, 'right', 18); }
  if (grens) { const yy = -H * 1000 / 1200; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(-120, yy); ctx.lineTo(120, yy); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, '1 LITER', 130, yy + 8, C.koraal, 'left', 20); }
  metaText(ctx, 'ML', 0, 40, C.grain, 'center', 20); ctx.restore(); }

// ---------- kraamweek ----------
// borst in doorsnede: blaasjes met spiercellen, melkgangen naar tepel (rechts). melk 0..1 vulling, knijp 0..1
function borstDoorsnede(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const melk = o.melk || 0, kn = o.knijp || 0, t = o.t || 0;
  ctx.beginPath(); ctx.moveTo(-260, -300); ctx.bezierCurveTo(120, -300, 300, -120, 300, 0); ctx.bezierCurveTo(300, 120, 120, 300, -260, 300); ctx.closePath(); shape(ctx, rgba(VK.huid, 0.25), VK.huid, 4);
  circ(ctx, 318, 0, 24, VK.huidD, null);
  const kw = [[-120, -170], [-160, 0], [-120, 170], [40, -150], [20, 0], [40, 150]];
  kw.forEach(([bx, by], i) => { ctx.strokeStyle = rgba(VK.melk, 0.7); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bx + 40, by); ctx.quadraticCurveTo((bx + 300) / 2, by * 0.5, 300, 0); ctx.stroke();
    for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 + i; const r = 28 * (1 - 0.25 * kn * (0.5 + 0.5 * Math.sin(t * 6))); const cx = bx + Math.cos(an) * 34, cy = by + Math.sin(an) * 34; circ(ctx, cx, cy, r, rgba(VK.melk, 0.2 + 0.7 * melk), rgba(C.koraal, 0.4 + 0.6 * kn), 3); } });
  if (kn > 0.05 && melk > 0.1) for (let i = 0; i < 4; i++) { const f = (t * 0.8 + i / 4) % 1; circ(ctx, 330 + f * 90, (i - 1.5) * 10 * f, 7 * (1 - f * 0.4), rgba(VK.melk, kn * (1 - f))); }
  ctx.restore(); }
// gehoortest: oor in doorsnede met dopje, gehoorgang, slakkenhuis; tik = golfjes in, echo = kleine golfjes terug
function oorTest(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const t = o.t || 0, echo = o.echo || 0;
  ctx.fillStyle = rgba(VK.huid, 0.3); ctx.beginPath(); ctx.ellipse(-330, 0, 70, 150, 0, 0, 6.283); ctx.fill(); roundRect(ctx, -300, -40, 330, 80, 40); shape(ctx, rgba(VK.huid, 0.18), VK.huid, 3);
  roundRect(ctx, -420, -36, 140, 72, 20); shape(ctx, '#E8ECF0', '#B8C2CC', 3); metaText(ctx, 'DOPJE', -350, -60, C.grain, 'center', 20);
  ctx.strokeStyle = '#E8D8C0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(30, -60); ctx.lineTo(30, 60); ctx.stroke(); metaText(ctx, 'TROMMELVLIES', 30, 90, C.grain, 'center', 16);
  ctx.strokeStyle = '#D8CDB8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(34, 0); ctx.lineTo(70, -18); ctx.lineTo(100, 4); ctx.lineTo(124, 0); ctx.stroke(); metaText(ctx, 'GEHOORBEENTJES', 80, -50, C.grain, 'center', 16);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k < 120; k++) { const an = k * 0.1, r = 110 - k * 0.8; ctx.lineTo(230 + Math.cos(an) * r, Math.sin(an) * r); } ctx.stroke(); metaText(ctx, 'SLAKKENHUIS', 230, 160, C.grain, 'center', 20);
  for (let i = 0; i < 3; i++) { const f = (t * 1.2 + i / 3) % 1; ctx.strokeStyle = rgba(C.teal, 0.9 * (1 - f)); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-280 + f * 300, 0, 30, -0.9, 0.9); ctx.stroke(); }
  if (echo > 0.01) for (let i = 0; i < 3; i++) { const f = (t * 1.2 + i / 3 + 0.5) % 1; ctx.strokeStyle = rgba(C.goud, echo * 0.9 * (1 - f)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(120 - f * 400, 0, 22, Math.PI - 0.9, Math.PI + 0.9); ctx.stroke(); }
  ctx.restore(); }
// weegschaal met display (gram)
function weegschaal(ctx, x, y, s = 1, a = 1, gram = 3400) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, -30); ctx.quadraticCurveTo(0, 60, 220, -30); ctx.lineTo(200, 0); ctx.lineTo(-200, 0); ctx.closePath(); shape(ctx, '#E8ECF0', '#B8C2CC', 3);
  roundRect(ctx, -180, 0, 360, 110, 16); shape(ctx, '#D8DEE4', '#B8C2CC', 3); roundRect(ctx, -100, 24, 200, 62, 8); shape(ctx, '#1C2A24', null); text(ctx, Math.round(gram) + ' g', 80, 70, fTekst(40, 800), '#9FE0A8', 'right'); ctx.restore(); }
// hormoonverloop rond de geboorte: lijnen voor progesteron/oestrogeen (dalen) en prolactine (blijft); u = tekenvoortgang
function hormoonGrafiek(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const u = o.u == null ? 1 : o.u; assen(ctx, x, y, w, h, o.xl || 'TIJD', o.yl || 'HOEVEELHEID IN HET BLOED');
  const gx = x + w * 0.45; ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([8, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'GEBOORTE', gx, y + h + 34, C.grain, 'center', 20);
  (o.lijnen || []).forEach(([naam, col, f, al = 1]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); const N = 80; for (let k = 0; k <= N * u; k++) { const xx = k / N; ctx.lineTo(x + xx * w, y + h - h * f(xx)); } ctx.stroke(); const xe = Math.min(u, 1); text(ctx, naam, x + w * xe + 14, y + h - h * f(xe) + 10, fTekst(28, 700), col, 'left'); ctx.restore(); });
  ctx.restore(); }

// kaartje met titel en regels
function vkKaart(ctx, x, y, w, h, titel, regels = [], col = C.goud, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.1), col, 2.5); text(ctx, titel, x + 28, y + 54, fTekst(34, 800), col, 'left');
  regels.forEach((r, i) => text(ctx, r, x + 28, y + 106 + i * 44, fTekst(28, 600), C.text, 'left')); ctx.restore(); }
// tekstlabel met antwoord
function vkAntwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// eenvoudige overgang: a voor het oude beeld = 1 - B
function uitIn(q, w, n = 1, d = 0.8) { return q.on(w, n, d); }
// Verloskunde 1 · Negen maanden bouwen — eigen tekeningen (21 okt 2026)
// potje (supplement) met etiket
function potje(ctx, x, y, s = 1, a = 1, lab = 'foliumzuur', col = C.goud) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -120, 100, 120, 16); shape(ctx, rgba('#FFFFFF', 0.85), '#C8D0D8', 2); roundRect(ctx, -56, -146, 112, 34, 8); shape(ctx, col, null);
  roundRect(ctx, -44, -92, 88, 56, 6); shape(ctx, rgba(col, 0.25), null); text(ctx, lab, 0, -58, fTekst(17, 800), '#2A3446', 'center'); ctx.restore(); }
// strip pillen met naam
function pillen(ctx, x, y, s = 1, a = 1, lab = 'ibuprofen', col = C.koraal) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -70, 260, 140, 14); shape(ctx, '#DCE3EA', '#B8C2CC', 2); for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(-90 + k * 60, -28 + r * 56, 22, 16, 0, 0, 6.283); shape(ctx, rgba(col, 0.75), col, 2); }
  text(ctx, lab, 0, 110, fTekst(32, 800), col, 'center'); ctx.restore(); }
// virusje met uitsteeksels
function virusje(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; vkA(ctx, a); ctx.strokeStyle = col; ctx.lineWidth = 4; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.4, y + Math.sin(an) * r * 1.4); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.45, y + Math.sin(an) * r * 1.45, r * 0.12, col); }
  circ(ctx, x, y, r, rgba(col, 0.35), col, 3); ctx.restore(); }
// klein molecuul: alcohol (C-C-O) of zuurstof (O=O)
function molecuultje(ctx, x, y, s = 1, soort = 'alcohol', a = 1) { if (a <= 0.01) return; vkA(ctx, a); const at = (el, dx, dy) => circ(ctx, x + dx * s, y + dy * s, (el === 'H' ? 8 : 13) * s, el === 'C' ? '#5A6170' : el === 'O' ? '#D8573F' : '#E8E8E2', null);
  if (soort === 'alcohol') { at('C', -22, 0); at('C', 4, -8); at('O', 30, 2); at('H', 44, -10); at('H', -34, 14); at('H', -30, -16); } else { at('O', -12, 0); at('O', 12, 0); } ctx.restore(); }
// cellenhoopje (embryo in de eerste dagen); ziek = indexen die koraal kleuren; uit = 0..1 (verdwijnen)
function cellenHoop(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const n = 19, pos = [[0, 0]]; for (let k = 0; k < 6; k++) pos.push([Math.cos(k * 1.047), Math.sin(k * 1.047)]); for (let k = 0; k < 12; k++) pos.push([Math.cos(k * 0.5236 + 0.26) * 1.9, Math.sin(k * 0.5236 + 0.26) * 1.9]);
  pos.forEach(([px, py], i) => { const ziek = (o.ziek || []).includes(i); const col = ziek ? C.koraal : C.paars; circ(ctx, x + px * r, y + py * r, r * 0.48, rgba(col, ziek ? 0.8 * (1 - (o.herstel || 0)) + 0.2 : 0.7), ziek && (o.herstel || 0) > 0.5 ? C.paars : col, 2); }); ctx.restore(); }
