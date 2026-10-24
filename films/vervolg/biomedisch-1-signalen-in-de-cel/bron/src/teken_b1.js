// Wat word jij? · Biomedische wetenschappen 1 · Signalen in de cel — eigen tekeningen (24 okt 2026)
// Moleculen volgens BEELDAFSPRAKEN: eiwitten als kralenketting die opgevouwen is, ATP = base + suiker + drie fosfaatgroepen,
// celmembraan gebogen (stuk van een cirkel) als dubbele laag fosfolipiden, inhoud blijft binnen het membraan.

const SB = { fosfaat: '#E8A23A', fosfaatR: '#F6CB7E', camp: '#7FC4B8', campR: '#B5E3DA', rem: '#E07A5F', kinase: '#C9A35C', aan: '#F2D27A', ras: '#8C7BBF', bcr: '#5BA4C9', abl: '#E07A5F', pil: '#F2F2EE' };

// ---------- gebogen membraan ----------
// punt op de cirkel boven: y bij x; hoek (raaklijn) bij x
function arcY(cx, cy, R, x) { return cy - Math.sqrt(Math.max(0, R * R - (x - cx) * (x - cx))); }
function arcHoek(cx, cy, R, x) { return Math.asin(clamp((x - cx) / R, -1, 1)); }
// celinhoud onder de boog (cytoplasma): zacht vlak met weinig, kleine rustige deeltjes
function celBinnen(ctx, cx, cy, R, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, R - 30, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill(); ctx.clip();
  for (let i = 0; i < 70; i++) { const x = hash(i * 7 + 1) * W, y = hash(i * 7 + 2) * 900; const w = wander(i + 300, t, 6, 0.3); ctx.beginPath(); ctx.arc(x + w.x, y + w.y, 2.2, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.13); ctx.fill(); }
  ctx.restore(); }
// dubbele laag fosfolipiden langs de boog; gaten (x-posities) waar een eiwit doorheen steekt
function membraan(ctx, cx, cy, R, x0, x1, o = {}) { const { a = 1, gaten = [], gat = 46 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 8, d = 28, step = 19; const n = Math.floor((x1 - x0) / step);
  for (let k = 0; k <= n; k++) { const x = x0 + k * step; if (gaten.some(g => Array.isArray(g) ? Math.abs(g[0] - x) < g[1] : Math.abs(g - x) < gat)) continue; const an = arcHoek(cx, cy, R, x) - Math.PI / 2; const ux = Math.cos(an), uy = Math.sin(an); const yb = arcY(cx, cy, R, x);
    for (const [rr, inw] of [[d, 1], [-d, -1]]) { const hx = x + ux * rr, hy = yb + uy * rr; ctx.strokeStyle = V.vt; ctx.lineWidth = 2.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx - uy * sd * 3, hy + ux * sd * 3); ctx.lineTo(hx - ux * inw * (d - 5) - uy * sd * 3.5, hy - uy * inw * (d - 5) + ux * sd * 3.5); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, C.er, lighten(C.er, 0.3), 1); } }
  ctx.restore(); }

// ---------- eiwit als kralenketting ----------
function _kralen(ctx, pts, r, kleur, o = {}) { const { gloed = 0, lijn = null } = o; ctx.save();
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed * 0.55; ctx.strokeStyle = SB.aan; ctx.lineWidth = r * 3.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  ctx.strokeStyle = lijn || lighten(kleur, 0.35); ctx.lineWidth = 2.2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  pts.forEach((p, i) => { const tint = [0, 0.15, 0.3, -0.12][i % 4]; ctx.beginPath(); if (i % 5 === 3) roundRect(ctx, p[0] - r * 0.9, p[1] - r * 0.9, r * 1.8, r * 1.8, r * 0.4); else ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, tint >= 0 ? lighten(kleur, tint) : _mix(kleur, 0.2), lighten(kleur, 0.45), 1.1); });
  ctx.restore(); }
// opgevouwen kluwen (kinase, enzym): keten van n kralen, compact gevouwen; aan 0..1 = gloed; P = aantal fosfaatgroepen erop
function kluwen(ctx, x, y, R, o = {}) { const { a = 1, n = 26, seed = 1, kleur = SB.kinase, aan = 0, P = 0, t = 0, zak = false, vorm = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = R * 0.16, pts = []; for (let i = 0; i < n; i++) { const th = i / (n - 1) * 6.283 * 1.15 + seed; const rr = R * (0.35 + 0.55 * Math.abs(Math.sin(i * 0.9 + seed * 1.7))) * (1 + 0.06 * vorm * Math.sin(i)); const w = wander(i + seed * 40, t, r * 0.12, 0.5);
    pts.push([x + Math.cos(th * 1.3 + vorm * 0.35) * rr * 0.95 + w.x, y + Math.sin(th * 1.7) * rr * 0.8 + w.y]); }
  _kralen(ctx, pts, r, kleur, { gloed: aan });
  if (zak) { ctx.beginPath(); ctx.arc(x + R * 0.55, y - R * 0.1, R * 0.32, 0, 6.283); ctx.fillStyle = rgba(C.bgMicro, 0.85); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]); }
  for (let k = 0; k < P; k++) fosfaat(ctx, x - R * 0.7 + k * R * 0.5, y - R * 0.95, R * 0.22, 1);
  ctx.restore(); }

// ---------- kleine moleculen ----------
function fosfaat(ctx, x, y, r = 13, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, SB.fosfaat, SB.fosfaatR, 1.5); text(ctx, 'P', x, y + r * 0.42, fTekst(r * 1.2, 800), '#3A2410', 'center'); ctx.restore(); }
function _vijfhoek(ctx, x, y, r, fill, stroke) { ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; i ? ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r) : ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, fill, stroke, 1.5); }
// ATP: base (zes- + vijfring) – suiker (vijfring) – staart van nP fosfaatgroepen; los = de laatste fosfaat springt naar (lx, ly)
function atp(ctx, x, y, s = 1, o = {}) { const { a = 1, nP = 3, los = 0, lx = 0, ly = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = 16 * s; hexagon(ctx, x - r * 3.2, y, r, rgba(C.paars, 0.6), C.paars, 1.5); _vijfhoek(ctx, x - r * 1.75, y - r * 0.2, r * 0.85, rgba(C.paars, 0.6), C.paars);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * 0.9, y); ctx.lineTo(x - r * 0.1, y); ctx.stroke(); _vijfhoek(ctx, x + r * 0.6, y, r * 0.85, rgba(C.oker, 0.55), C.oker);
  for (let k = 0; k < nP; k++) { let px = x + r * 2.2 + k * r * 1.75, py = y; const laatste = k === nP - 1;
    if (laatste && los > 0.01) { const u = ease(los); px = lerp(px, lx, u); py = lerp(py, ly, u) - Math.sin(u * Math.PI) * 60 * s; } else { ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(px - r * 1.75 + r * 0.7, py); ctx.lineTo(px - r * 0.7, py); ctx.stroke(); }
    fosfaat(ctx, px, py, r * 0.72, 1); }
  ctx.restore(); }
// cAMP: suiker met één fosfaatgroep die er een ring mee vormt, plus de base
function camp(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = 12 * s;
  hexagon(ctx, x - r * 2, y - r * 0.4, r * 0.8, rgba(C.paars, 0.6), C.paars, 1.2); _vijfhoek(ctx, x, y, r * 0.8, rgba(SB.camp, 0.55), SB.camp);
  ctx.strokeStyle = SB.campR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + r * 0.6, y - r * 0.5); ctx.quadraticCurveTo(x + r * 1.6, y - r * 0.8, x + r * 1.7, y); ctx.quadraticCurveTo(x + r * 1.6, y + r * 0.8, x + r * 0.6, y + r * 0.6); ctx.stroke();
  fosfaat(ctx, x + r * 1.75, y, r * 0.6, 1); ctx.restore(); }
function glucose(ctx, x, y, r = 12, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(C.teal, 0.55), C.teal, 1.3); ctx.restore(); }

// ---------- receptor met zeven helices door het membraan (adrenalinereceptor) ----------
// lokaal: membraan horizontaal op y=0, buiten = negatief; vorm 0..1 = vormverandering na binden (binnenlussen zakken en kantelen)
function receptor7(ctx, x, y, ang, s = 1, o = {}) { const { a = 1, vorm = 0, bind = 0, t = 0, gloed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const pts = []; const H = 40; const xs = [-96, -64, -32, 0, 32, 64, 96];
  pts.push([-140, -78], [-118, -62]);
  xs.forEach((hx, i) => { const op = i % 2 === 0; const sh = vorm * (i >= 4 ? 14 : -6); for (let k = 0; k <= 4; k++) { const f = k / 4; const yy = op ? lerp(-H, H, f) : lerp(H, -H, f); pts.push([hx + sh * (yy + H) / (2 * H) + Math.sin(f * 6.283) * 5, yy]); }
    if (i < 6) { const binnen = op; const lus = binnen ? H + 20 + (i === 4 ? vorm * 34 : 0) : -H - 18; pts.push([hx + 16 + (binnen && i === 4 ? vorm * 10 : 0), lus]); } });
  pts.push([110 + vorm * 18, H + 30 + vorm * 30], [96 + vorm * 30, H + 56 + vorm * 40], [70 + vorm * 40, H + 70 + vorm * 46]);
  _kralen(ctx, pts, 9, '#AFC0D0', { gloed: gloed });
  if (bind > 0.01) { const d = 150 * (1 - ease(bind)); hormoonVorm(ctx, -6, -62 - d, 18, 'adrenaline', Math.min(1, bind * 3)); }
  ctx.restore(); }
// groeifactorreceptor: één keer door het membraan, binnen een kinasekluwen; P = fosfaatgroepen
function receptorRTK(ctx, x, y, ang, s = 1, o = {}) { const { a = 1, P = 0, aan = 0, t = 0, seed = 3, ligand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const pts = []; for (let k = 0; k < 6; k++) pts.push([Math.sin(k * 1.3 + seed) * 22, -120 + k * 14]); for (let k = 0; k < 6; k++) pts.push([Math.sin(k * 0.9) * 4, -46 + k * 18]);
  _kralen(ctx, pts, 9, '#AFC0D0', {}); kluwen(ctx, 0, 110, 46, { seed, kleur: SB.kinase, aan, t });
  for (let k = 0; k < P; k++) fosfaat(ctx, -36 + k * 36, 168, 13, 1);
  if (ligand > 0.01) { const d = 120 * (1 - ease(ligand)); hormoonVorm(ctx, 0, -130 - d, 16, 'groei', Math.min(1, ligand * 3), C.groen); }
  ctx.restore(); }

// ---------- schakelaar (Ras) ----------
function rasSchakel(ctx, x, y, aan, a = 1, o = {}) { if (a <= 0.01) return; const { vast = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  kluwen(ctx, x, y, 40, { seed: 7, kleur: SB.ras, aan, t, n: 20 });
  const bx = x + 64, by = y - 22; roundRect(ctx, bx, by, 72, 40, 20); shape(ctx, aan > 0.5 ? rgba(C.groen, 0.85) : '#3A4458', C.line, 2); circ(ctx, bx + (aan > 0.5 ? 52 : 20), by + 20, 15, '#F2F2EE');
  text(ctx, aan > 0.5 ? 'aan' : 'uit', bx + 36, by + 70, fTekst(26, 700), aan > 0.5 ? C.groen : C.text2, 'center');
  if (vast > 0.01) { ctx.save(); ctx.globalAlpha *= vast; const lx = bx + 92, ly = by + 2; roundRect(ctx, lx, ly + 14, 32, 26, 5); shape(ctx, C.koraal, null); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(lx + 16, ly + 14, 11, Math.PI, 0); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ---------- kern met DNA-draden en transcriptiefactor ----------
function kernDNA(ctx, x, y, r, o = {}) { const { a = 1, tf = 0, aan = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.9, 0.03, 4, 0); shape(ctx, rgba(C.kern, 0.5), C.kernR, 2.5);
  ctx.save(); blob(ctx, x, y, r - 10, r * 0.9 - 10, 0.03, 4, 0); ctx.clip(); ctx.strokeStyle = rgba(C.kernR, 0.75); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = i / 40; const xx = x - r + f * 2 * r, yy = y - r * 0.5 + k * r * 0.33 + Math.sin(f * 9 + k * 2 + t * 0.4) * 14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore();
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const f = i / 12; const xx = x - r * 0.1 + f * r * 0.7, yy = y - r * 0.17 + Math.sin((0.45 + f * 0.35) * 9 + 1 * 2 + t * 0.4) * 14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
  if (tf > 0.01) kluwen(ctx, x - r * 0.2, y - r * 0.2, 26, { a: tf, seed: 11, kleur: C.groen, n: 14, aan, t });
  ctx.restore(); }
// cel die deelt: u 0..1 = insnoeren en twee cellen
function delendeCel(ctx, x, y, r, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = r * 0.95 * ease(u);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * d, y, r * (1 - 0.3 * ease(u)), 0, 6.283); shape(ctx, rgba('#C9B896', 0.18), '#C9B896', 2.5); circ(ctx, x + sd * d, y, r * 0.32, rgba(C.kern, 0.6), C.kernR, 1.5); } ctx.restore(); }
// witte bloedcel met gelobde kern
function witteCel(ctx, x, y, r, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) circ(ctx, x, y, r * 1.35, rgba(C.koraal, 0.18 * gloed)); circ(ctx, x, y, r, rgba('#E6E1F0', 0.35), '#D6D0E6', 2);
  ctx.fillStyle = rgba(C.paars, 0.75); [[-0.3, -0.1], [0.05, 0.15], [0.3, -0.12]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, r * 0.26, r * 0.2, dx, 0, 6.283); ctx.fill(); }); ctx.restore(); }
// bloedplaatje (schijfje met korrels)
function bloedplaatje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.55, 0.3, 0, 6.283); shape(ctx, '#C9A0B8', '#E3C2D4', 1.5); for (let i = 0; i < 4; i++) circ(ctx, x - r * 0.4 + i * r * 0.27, y + (i % 2 ? 2 : -2), 2.5, '#8A5A7A'); ctx.restore(); }
// chromosoom: staafje met insnoering (centromeer); delen [kleur, lengte] van boven naar onder
function chromosoom(ctx, x, y, w, delen, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; let yy = y;
  delen.forEach(([col, L, cen], i) => { roundRect(ctx, x - w / 2, yy, w, L, w * 0.45); shape(ctx, rgba(col, 0.8), lighten(col, 0.3), 2); yy += L + (cen ? 6 : 0); });
  if (label) text(ctx, label, x, y - 22, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
// tabletje
function tabletje(ctx, x, y, s = 1, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) circ(ctx, x, y, 30 * s, rgba(C.goud, 0.25 * gloed));
  ctx.beginPath(); ctx.ellipse(x, y, 20 * s, 12 * s, 0, 0, 6.283); shape(ctx, SB.pil, '#C8CCD4', 2); ctx.strokeStyle = '#B8BCC6'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y - 10 * s); ctx.lineTo(x, y + 10 * s); ctx.stroke(); ctx.restore(); }
// remmer als klein molecuul (ringen) dat in de ATP-plek past
function remmer(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x - 20 * s, y, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); hexagon(ctx, x + 4 * s, y + 8 * s, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); hexagon(ctx, x + 28 * s, y, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); ctx.restore(); }

// ---------- ontbijttafel (vóór de personages tekenen) ----------
function ontbijtTafel(ctx, x, y, w, a = 1, o = {}) { const { pil = 1, gloed = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 24, 6); shape(ctx, '#8C6A4A', '#A8865E', 2); ctx.fillStyle = '#6E5238'; ctx.fillRect(x + 30, y + 24, 22, 880 - y - 24); ctx.fillRect(x + w - 52, y + 24, 22, 880 - y - 24);
  // bord met boterham, koffiemok met damp, glas water
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y - 6, 80, 14, 0, 0, 6.283); shape(ctx, '#E6E9EE', '#B8C0CC', 2); roundRect(ctx, x + w * 0.3 - 46, y - 26, 92, 16, 6); shape(ctx, '#D9B074', '#B88A50', 1.5);
  const mx = x + w * 0.62; roundRect(ctx, mx - 30, y - 70, 60, 64, 10); shape(ctx, '#C9654B', '#E08A70', 2); ctx.strokeStyle = '#C9654B'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(mx + 34, y - 40, 15, -1.2, 1.2); ctx.stroke();
  ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const yy = y - 84 - i * 9, xx = mx - 10 + k * 18 + Math.sin(i * 0.9 + t * 2 + k) * 6; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  roundRect(ctx, x + w * 0.8 - 22, y - 80, 44, 76, 6); shape(ctx, rgba('#CFE4F0', 0.25), '#AFC0D0', 2); ctx.fillStyle = rgba('#BFD8E6', 0.35); ctx.fillRect(x + w * 0.8 - 20, y - 50, 40, 44);
  tabletje(ctx, mx - 70, y - 10, 1, pil, gloed);
  ctx.restore(); }

// ---------- overleving: twee staven ----------
function overleving(ctx, x, y, w, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [['vroeger', 'na 5 jaar', '± 5 op 10', 0.5, C.text2, u1], ['met het tabletje', 'na 5 jaar', '± 9 op 10', 0.89, C.groen, u2], ['met het tabletje', 'na 10 jaar', 'ruim 8 op 10', 0.83, C.groen, u2]].forEach(([n, tijd, s2, v, col, u], i) => { const yy = y + i * 130; if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= clamp(u * 3, 0, 1);
    text(ctx, n, x, yy, fTekst(30, 700), C.text, 'left'); text(ctx, tijd, x + w * 0.52, yy, fTekst(30, 800), C.goud, 'left'); roundRect(ctx, x, yy + 20, w, 44, 10); shape(ctx, '#2A3446', C.line, 1.5); const ww = w * v * ease(u); if (ww > 4) { roundRect(ctx, x, yy + 20, ww, 44, 10); shape(ctx, rgba(col, 0.7), col, 2); }
    text(ctx, s2, x + w, yy, fTekst(28, 700), C.text, 'right'); ctx.restore(); });
  metaText(ctx, 'NOG IN LEVEN', x, y - 54, C.grain, 'left', 24); ctx.restore(); }
// telpoppetjes (1 op 5)
function popjeB(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// ---------- overgenomen uit engine/scenes.js (Geneeskunde 4): labMicroscoop, labTafel ----------
function labMicroscoop(ctx, x, y, s = 1, a = 1, kant = -1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * -kant, s);
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446';
  roundRect(ctx, -110, -34, 220, 34, 10); shape(ctx, body, rand, 2.5); if (licht > 0.01) circ(ctx, -20, -40, 14, rgba('#FFF4C8', 0.9 * licht));
  ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(70, -34); ctx.lineTo(70, -250); ctx.quadraticCurveTo(70, -300, 20, -300); ctx.lineTo(-10, -300); ctx.lineTo(-10, -262); ctx.lineTo(30, -262); ctx.lineTo(40, -250); ctx.closePath(); shape(ctx, body, rand, 2.5);
  roundRect(ctx, -100, -128, 160, 14, 4); shape(ctx, donker, rand, 2); roundRect(ctx, -40, -116, 30, 16, 3); shape(ctx, body, rand, 1.5);
  roundRect(ctx, -66, -134, 80, 6, 2); shape(ctx, rgba('#DCEBF4', 0.8), null);
  ctx.fillStyle = '#5A6478'; [-44, -22].forEach((ox, i) => { roundRect(ctx, ox - 8, -230, 16, 46 + i * 12, 4); ctx.fill(); });
  roundRect(ctx, -60, -262, 100, 40, 10); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(-40, -262); ctx.rotate(-0.6); roundRect(ctx, -14, -80, 28, 80, 6); shape(ctx, donker, rand, 2); roundRect(ctx, 16, -76, 26, 76, 6); shape(ctx, donker, rand, 2); ctx.restore();
  circ(ctx, 56, -90, 18, body, rand, 2.5); circ(ctx, 56, -90, 8, rand);
  ctx.restore(); }
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// AMP: wat er van cAMP overblijft als een enzym de ring openknipt (base + suiker + één fosfaatgroep)
function amp(ctx, x, y, s = 1, a = 1) { atp(ctx, x, y, s, { a, nP: 1 }); }
// het laatste enzym van de cascade (glycogeenfosforylase): andere kleur dan de kinasen
const SB_AFBRAAK = '#6FA8C9';
