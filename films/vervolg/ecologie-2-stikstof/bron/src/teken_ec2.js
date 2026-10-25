// Wat word jij? · Ecologie en natuurbeheer · film 2 Stikstof — eigen tekeningen (fase A, 25 okt 2026)
// Kleuren (reeksbrief): ammoniak/ammonium oker, stikstofoxiden grijs (geen extra seriekleur), water/regen teal, 'te veel' koraal, focus goud.
// Gevoelig dossier: geen personen van overheid of bedrijven, geen namen, partijen of logo's. Stal en fabriek alleen als gebouw.
// Schaal in veldscènes: persoon 400 px ≈ 1,75 m → ± 230 px per meter; struikhei 30–50 cm ≈ 70–110 px.

const FLOOR = 840;                      // voetlijn personen
const KL_NOX = '#A4ACB8';               // stikstofoxiden: neutraal grijs
const KL_H = '#E8E4DA';                 // waterstofatoom
const VELD = { outfit: 'veld' };
function daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.voet || FLOOR, o.h || 390, Object.assign({ t, uit: 'neutraal', kijk: 1 }, VELD, o)); }
function bas(ctx, x, t, o = {}) { return persoon(ctx, 'bas', x, o.voet || FLOOR, o.h || 400, Object.assign({ t, uit: 'neutraal', kijk: -1 }, o)); }
function ec2Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'center', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// kaartje met een kop en regels (meningen, rapport, recap); n = hoeveel regels al zichtbaar (breuk = laatste regel fadet in)
function ec2Kaart(ctx, x, y, w, kop, regels, o = {}) { const { a = 1, n = regels.length, px = 32, kopKl = C.goud, rand = C.line, hl = -1 } = o; if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a;
  const rh = px * 1.55, h = 76 + regels.length * rh + 18; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.92), rgba(rand, 0.8), 1.5);
  metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => { const f = clamp(n - i, 0, 1); if (f <= 0.01) return; const [s2, mark] = Array.isArray(r) ? r : [r, null]; const ry = y + 76 + i * rh + px * 0.9;
    ctx.save(); ctx.globalAlpha *= f; if (i === hl) { roundRect(ctx, x + 14, ry - px * 1.05, w - 28, rh, 8); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fill(); }
    const tx = mark ? x + 76 : x + 28; text(ctx, s2, tx, ry, fTekst(px, 600), C.text, 'left');
    if (mark === 'v') vink_(ctx, x + 44, ry - px * 0.35, 13, 1, C.groen); else if (mark === 'x') kruis(ctx, x + 44, ry - px * 0.35, 11, 1, C.koraal); else if (mark === '!') text(ctx, '!', x + 44, ry, fTekst(px + 4, 800), C.koraal, 'center'); else if (mark === '•') circ(ctx, x + 44, ry - px * 0.32, 6, C.line);
    ctx.restore(); });
  ctx.restore(); return h; }

// ---------- het veld (dwarsdoorsnede): grond, heide, ven ----------
// o.ven (0..1), o.gras (0..1 pollen gras tussen de heide), o.bloei
function veldGrond(ctx, o = {}) { const { a = 1, x0 = 0, x1 = W, y = 800, ven = 1, gras = 0.5, bloei = 1, seed = 11, venX = 300, venW = 300 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2C3A34'; ctx.fillRect(x0, y, x1 - x0, 90); ctx.fillStyle = KL_ZAND_D; ctx.globalAlpha *= 0.35; ctx.fillRect(x0, y + 30, x1 - x0, 60); ctx.globalAlpha /= 0.35;
  ctx.strokeStyle = rgba('#7E9A6E', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  if (ven > 0.01) ecA(ctx, ven, () => { ctx.beginPath(); ctx.ellipse(venX + venW / 2, y + 4, venW / 2, 18, 0, 0, Math.PI); ctx.fillStyle = rgba(C.teal, 0.7); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(venX, y + 2); ctx.lineTo(venX + venW, y + 2); ctx.stroke(); });
  const R = ecRng(seed); let x = x0 + 20;
  while (x < x1 - 10) { const inVen = ven > 0.5 && x > venX - 10 && x < venX + venW + 10; if (!inVen) { const r = R(); if (r < gras * 0.22) grasPol(ctx, x, y, 70 + R() * 30, { seed: Math.floor(R() * 99), kl: '#9CC070' }); else struikhei(ctx, x, y, 70 + R() * 40, { seed: Math.floor(R() * 99), bloei }); } x += 34 + R() * 34; }
  ctx.restore(); }




// ---------- HEIDEPLANTEN, nieuwe tekening (keuring Kamiel 25 okt 2026: 'mag mooier'; C10.6: plant als geheel, blaadjes vast aan de plant) ----------
// TORMENTIL (Potentilla erecta): laag, dunne liggende tot opstijgende stengels (10–30 cm), blaadjes zittend, drietallig met twee grote
// steunblaadjes (lijkt vijftallig), deelblaadjes langwerpig met grove tanden aan de top; bloemen ± 1 cm op lange dunne steeltjes,
// VIER gele kroonbladen met een inkeping, oranje hart. x, y = voet; h = hoogte px.
function ec2Blaadje(ctx, x, y, an, L, B, kl, rand, tand = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, 0);
  if (tand) { const n = tand; ctx.quadraticCurveTo(L * 0.25, -B * 0.9, L * 0.45, -B); for (let i = 0; i < n; i++) { const u0 = 0.45 + 0.55 * i / n, u1 = 0.45 + 0.55 * (i + 0.5) / n, w0 = B * (1 - (u0 - 0.45) * 1.3), w1 = B * (1 - (u1 - 0.45) * 1.3); ctx.lineTo(L * u1, -w1 * 1.18); ctx.lineTo(L * (u0 + 0.55 / n), -Math.max(0, w0 - B * 0.55 / n * 1.3) * 0.92); }
    ctx.lineTo(L, 0); for (let i = n - 1; i >= 0; i--) { const u0 = 0.45 + 0.55 * i / n, u1 = 0.45 + 0.55 * (i + 0.5) / n, w0 = B * (1 - (u0 - 0.45) * 1.3), w1 = B * (1 - (u1 - 0.45) * 1.3); ctx.lineTo(L * u1, w1 * 1.18); ctx.lineTo(L * u0, w0 * 0.92); } ctx.quadraticCurveTo(L * 0.25, B * 0.9, 0, 0); }
  else { ctx.quadraticCurveTo(L * 0.4, -B * 1.2, L, 0); ctx.quadraticCurveTo(L * 0.4, B * 1.2, 0, 0); }
  ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = Math.max(0.8, B * 0.12); ctx.stroke(); }
  ctx.strokeStyle = rgba('#26381E', 0.45); ctx.lineWidth = Math.max(0.6, B * 0.1); ctx.beginPath(); ctx.moveTo(L * 0.05, 0); ctx.lineTo(L * 0.85, 0); ctx.stroke(); ctx.restore(); }
function tormentilPlant(ctx, x, y, h, o = {}) { const { a = 1, seed = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const R = ecRng(seed * 17 + 3);
  const stK = '#6A8048', blK = '#6E9050', blL = '#86A862', lw = Math.max(1.2, h * 0.028);
  for (let i = 0; i < 4; i++) { const sgn = i % 2 ? 1 : -1, sp = (0.35 + 0.22 * i) * sgn, L = h * (0.85 + R() * 0.35);
    // stengel: eerst schuin naar buiten, dan opstijgend
    const P0 = [x, y], P1 = [x + Math.sin(sp) * L * 0.7, y - L * 0.25], P2 = [x + Math.sin(sp) * L * 0.95, y - L * (0.55 + R() * 0.25)];
    ctx.strokeStyle = stK; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(P0[0], P0[1]); ctx.quadraticCurveTo(P1[0], P1[1], P2[0], P2[1]); ctx.stroke();
    // zittende blaadjes langs de stengel: drie deelblaadjes + twee steunblaadjes
    for (let k = 1; k <= 2; k++) { const u = k / 3, bx = (1 - u) * (1 - u) * P0[0] + 2 * u * (1 - u) * P1[0] + u * u * P2[0], by = (1 - u) * (1 - u) * P0[1] + 2 * u * (1 - u) * P1[1] + u * u * P2[1], kant = k % 2 ? 1 : -1, ba = -Math.PI / 2 + sp * 0.8 + kant * 0.9;
      for (let j = -2; j <= 2; j++) { const ja = ba + j * 0.42, gL = h * (j === 0 ? 0.2 : Math.abs(j) === 1 ? 0.17 : 0.12); ec2Blaadje(ctx, bx, by, ja, gL, gL * 0.3, Math.abs(j) === 2 ? blK : blL, rgba('#3E5A2C', 0.7), Math.abs(j) === 2 ? 0 : 3); } }
    // bloem op een lang dun steeltje
    const Fx = P2[0] + sgn * h * 0.12, Fy = P2[1] - h * 0.22; ctx.strokeStyle = stK; ctx.lineWidth = lw * 0.6; ctx.beginPath(); ctx.moveTo(P2[0], P2[1]); ctx.quadraticCurveTo(P2[0] + sgn * h * 0.02, Fy + h * 0.1, Fx, Fy); ctx.stroke();
    const r = Math.max(3, h * 0.085), rot = R() * 1.6;
    for (let k = 0; k < 4; k++) { const pa = rot + k * Math.PI / 2; ctx.save(); ctx.translate(Fx, Fy); ctx.rotate(pa); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(r * 0.55, -r * 0.75, r * 1.05, -r * 0.32); ctx.lineTo(r * 0.82, 0); ctx.lineTo(r * 1.05, r * 0.32); ctx.quadraticCurveTo(r * 0.55, r * 0.75, 0, 0); ctx.closePath(); ctx.fillStyle = '#EDCB3A'; ctx.fill(); ctx.strokeStyle = '#C9A12A'; ctx.lineWidth = Math.max(0.7, r * 0.08); ctx.stroke(); ctx.restore(); }
    circ(ctx, Fx, Fy, r * 0.3, '#D9892A'); for (let k = 0; k < 6; k++) { const pa = k * 1.047; circ(ctx, Fx + Math.cos(pa) * r * 0.38, Fy + Math.sin(pa) * r * 0.38, Math.max(0.8, r * 0.07), '#8A5A1A'); } }
  ctx.restore(); }
// BRAAM (Rubus fruticosus agg.): houtige ranken die in een boog overhangen en met de top weer de grond raken, met stekels;
// bladeren verspreid langs de rank, op een steel, samengesteld uit 3–5 deelblaadjes (eirond, gezaagde rand, toegespitst);
// bloemen wit tot lichtroze met 5 kroonbladen, vruchten (samengestelde steenvrucht) eerst rood, dan zwart. x, y = voet; h = hoogte px.
function braamStruik(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, bes = 1, bloem = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const R = ecRng(seed * 7 + 11);
  const rankK = '#7A4A4E', rankL = '#9A6066', blK = '#4E7A40', blL = '#5E8C4C', blD = '#3E6634', lw = Math.max(2, h * 0.026);
  const ranken = []; for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, L = h * (0.85 + R() * 0.55), top = [x + s * L * (0.2 + R() * 0.2), y - h * (0.8 + R() * 0.3)], end = [x + s * L * (0.8 + R() * 0.3), y - h * (0.02 + R() * 0.1)]; ranken.push([s, top, end]); }
  const punt = (top, end, u) => { const c = [top[0], top[1] - h * 0.25]; return [(1 - u) * (1 - u) * x + 2 * u * (1 - u) * c[0] + u * u * end[0], (1 - u) * (1 - u) * y + 2 * u * (1 - u) * c[1] + u * u * end[1]]; };
  // eerst alle ranken (met stekels), daarna de bladeren erop, zodat bladeren vastzitten en niet zweven
  ranken.forEach(([s, top, end]) => { ctx.strokeStyle = rankK; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(top[0], top[1] - h * 0.25, end[0], end[1]); ctx.stroke();
    ctx.strokeStyle = rankL; ctx.lineWidth = lw * 0.35; ctx.stroke();
    for (let k = 1; k < 14; k++) { const u = k / 14, p = punt(top, end, u), q = punt(top, end, u + 0.01), an = Math.atan2(q[1] - p[1], q[0] - p[0]), zij = k % 2 ? 1 : -1; ctx.strokeStyle = rankK; ctx.lineWidth = Math.max(1, lw * 0.4); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + Math.cos(an + zij * 2.2) * lw * 1.6, p[1] + Math.sin(an + zij * 2.2) * lw * 1.6); ctx.stroke(); } });
  ranken.forEach(([s, top, end], i) => { for (let k = 0; k < 4; k++) { const u = 0.22 + k * 0.19 + (R() - 0.5) * 0.05, p = punt(top, end, u), q = punt(top, end, u + 0.01), an = Math.atan2(q[1] - p[1], q[0] - p[0]), zij = (k + i) % 2 ? 1 : -1;
      // bladsteel, dan 3 of 5 deelblaadjes in een handvorm
      const sa = an + zij * 1.05 - (zij > 0 ? 0.25 : -0.25), sl = h * 0.09, bx = p[0] + Math.cos(sa) * sl, by = p[1] + Math.sin(sa) * sl;
      ctx.strokeStyle = '#5A6A3A'; ctx.lineWidth = Math.max(1, lw * 0.45); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(bx, by); ctx.stroke();
      const n = (k + i) % 3 ? 5 : 3, bL = h * 0.13, opp = sa - Math.PI / 2 * 0; for (let j = 0; j < n; j++) { const ja = opp + (j - (n - 1) / 2) * (n === 5 ? 0.62 : 0.75), gL = bL * (j === (n - 1) / 2 ? 1 : n === 5 && (j === 0 || j === n - 1) ? 0.62 : 0.85);
        ec2Blaadje(ctx, bx, by, ja, gL, gL * 0.36, j === (n - 1) / 2 ? blL : (j + k) % 2 ? blK : blD, rgba('#2E4A26', 0.8), 4); } }
    // bloemen en bramen aan de top van sommige ranken
    const t2 = punt(top, end, 0.5);
    if (bloem > 0.01 && i % 3 === 0) ecA(ctx, bloem, () => { const r = h * 0.045; for (let k = 0; k < 5; k++) { const pa = k * 1.2566 + i; ctx.beginPath(); ctx.ellipse(t2[0] + Math.cos(pa) * r * 0.75, t2[1] - h * 0.04 + Math.sin(pa) * r * 0.75, r * 0.7, r * 0.5, pa, 0, 6.283); ctx.fillStyle = '#F2E6EA'; ctx.fill(); ctx.strokeStyle = '#C8B0B8'; ctx.lineWidth = 1; ctx.stroke(); } circ(ctx, t2[0], t2[1] - h * 0.04, r * 0.35, '#D8C06A'); });
    if (bes > 0.01 && i % 3 === 1) ecA(ctx, bes, () => { [[0, 0, '#2A1E2E'], [h * 0.05, h * 0.03, '#2A1E2E'], [-h * 0.045, h * 0.035, '#A8343A']].forEach(([dx, dy, kl]) => { const bx = t2[0] + dx, by = t2[1] - h * 0.02 + dy, r = Math.max(1.4, h * 0.011); for (let m = 0; m < 7; m++) { const pa = m * 0.9, rr = m ? r * 1.25 : 0; circ(ctx, bx + Math.cos(pa) * rr, by + Math.sin(pa) * rr * 1.2, r, kl, rgba('#000000', 0.25), 0.6); } }); }); });
  ctx.restore(); }

// ---------- WOLKJE gas (ammoniak oker, stikstofoxiden grijs) ----------
function gasWolk(ctx, x, y, r, col, a = 1, t = 0, seed = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.75;
  for (let i = 0; i < 6; i++) { const an = i * 1.05 + seed, d = r * 0.45, w2 = wander(i + seed * 7, t, r * 0.06, 0.5); circ(ctx, x + Math.cos(an) * d + w2.x, y + Math.sin(an) * d * 0.6 + w2.y, r * (0.45 + 0.12 * hash(i + seed)), rgba(col, 0.45)); }
  ctx.restore(); }
// regenwolk (teal) met druppels; o.regen 0..1
function regenWolk(ctx, x, y, w, o = {}) { const { a = 1, t = 0, regen = 1, stip = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 5; i++) circ(ctx, x - w * 0.4 + i * w * 0.2, y + (i % 2 ? -14 : 0), w * (0.14 + (i % 3) * 0.03), rgba('#9AB4C8', 0.55));
  ctx.beginPath(); ctx.ellipse(x, y + 12, w * 0.48, w * 0.12, 0, 0, 6.283); ctx.fillStyle = rgba('#9AB4C8', 0.55); ctx.fill();
  if (regen > 0.01) { ctx.globalAlpha *= regen; for (let i = 0; i < 14; i++) { const px = x - w * 0.42 + (i / 13) * w * 0.84, ph = ((t * 0.9 + hash(i) ) % 1), py = y + 40 + ph * 220; ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 4, py + 18); ctx.stroke(); if (stip && i % 2 === 0) circ(ctx, px - 2, py + 9, 4.5, C.oker); } }
  ctx.restore(); }

// ---------- MOLECULEN (Micro, vereenvoudigd) ----------
// NH₃: stikstof (oker) met drie waterstof; NH₄⁺: vier waterstof en een plusje. r = straal N.
function nh3(ctx, x, y, r, o = {}) { const { a = 1, rot = 0, vier = 0, plus = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const H = [[-0.95, 0.55], [0.95, 0.55], [0, -1.05]]; if (vier > 0.01) H.push([0, 1.15]);
  H.forEach(([hx, hy], i) => { const f = i === 3 ? vier : 1; ctx.save(); ctx.globalAlpha *= f; const px = hx * r * 1.15, py = hy * r * 1.15; ctx.strokeStyle = rgba(KL_H, 0.8); ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(px, py); ctx.stroke(); circ(ctx, px, py, r * 0.5, KL_H, '#B8B4AA', 1.2); ctx.restore(); });
  circ(ctx, 0, 0, r, C.oker, lighten(C.oker, 0.35), 1.5); text(ctx, 'N', 0, r * 0.36, fTekst(r * 1.0, 800), '#2A2010', 'center');
  if (plus > 0.01) { ctx.save(); ctx.globalAlpha *= plus; ctx.rotate(-rot); circ(ctx, r * 1.25, -r * 1.25, r * 0.42, '#121A26', C.oker, 1.5); text(ctx, '+', r * 1.25, -r * 1.25 + r * 0.2, fTekst(r * 0.65, 800), C.oker, 'center'); ctx.restore(); }
  ctx.restore(); }
// stikstofoxide (NO₂ vereenvoudigd): N (grijs) met twee O; o.om = 0..1 omgezet (wordt een deeltje: rond, dichter)
function nox(ctx, x, y, r, o = {}) { const { a = 1, rot = 0, om = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  if (om < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - om; for (const s of [-1, 1]) { const px = s * r * 1.2, py = r * 0.55; ctx.strokeStyle = rgba('#C8CED8', 0.8); ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(px, py); ctx.stroke(); circ(ctx, px, py, r * 0.72, '#7E8EA4', '#A8B6C8', 1.2); } circ(ctx, 0, 0, r * 0.8, KL_NOX, '#C8CED8', 1.5); ctx.restore(); }
  if (om > 0.01) { ctx.save(); ctx.globalAlpha *= om; circ(ctx, 0, 0, r * 1.15, rgba(KL_NOX, 0.9), '#C8CED8', 1.5); for (let i = 0; i < 5; i++) circ(ctx, Math.cos(i * 1.26) * r * 0.55, Math.sin(i * 1.26) * r * 0.55, r * 0.22, '#6E7A8C'); ctx.restore(); }
  ctx.restore(); }

// waterdruppel op een blad (Micro-inzet); x, y = midden druppel; r
function druppelOpBlad(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - r * 3.2, y + r * 0.95); ctx.quadraticCurveTo(x, y + r * 0.4, x + r * 3.2, y + r * 1.2); ctx.quadraticCurveTo(x, y + r * 1.9, x - r * 3.2, y + r * 0.95); shape(ctx, '#3E6A44', '#5FA86E', 2);
  ctx.beginPath(); ctx.moveTo(x - r, y + r * 0.78); ctx.bezierCurveTo(x - r * 1.05, y - r * 0.6, x + r * 1.05, y - r * 0.6, x + r, y + r * 0.78); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); }

// ---------- MEETPAAL van het meetnet: paaltje met wit kapje, drie buisjes eronder ----------
// x = voet, y = grond; s schaal (1 = ± 1,5 m ≈ 340 px). o.weg = welk buisje (0..2) eruit is (fractie), o.hl
function meetPaal(ctx, x, y, s = 1, o = {}) { const { a = 1, weg = -1, wegK = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -9, -320, 18, 320, 4); shape(ctx, '#8A7A60', '#A8987A', 1.5);
  // kapje (schotel, wit) tegen regen
  ctx.beginPath(); ctx.ellipse(0, -330, 70, 16, 0, 0, 6.283); shape(ctx, '#F2F2EE', '#C9CED6', 2); ctx.beginPath(); ctx.ellipse(0, -336, 40, 10, 0, Math.PI, 0); ctx.fillStyle = '#E2E4E6'; ctx.fill();
  // drie buisjes, open kant naar beneden
  [-34, 0, 34].forEach((bx, i) => { let dy = 0, dx = 0, f = 1; if (i === weg) { dy = 70 * wegK; dx = 30 * wegK; f = 1; }
    ctx.save(); ctx.translate(bx + dx, -312 + dy); roundRect(ctx, -7, 0, 14, 62, 4); shape(ctx, '#E8ECF0', '#9AA3B2', 1.5); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-7, 0, 14, 10); ctx.fillStyle = rgba(C.oker, 0.6); ctx.fillRect(-5, 50, 10, 10); ctx.restore(); });
  if (hl > 0.01) ecA(ctx, hl, () => { ctx.beginPath(); ctx.ellipse(0, -290, 90, 70, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.restore(); }
// los buisje groot (passieve sampler): open onderkant, filter bovenin; o.lucht = ammoniak die binnenkomt (0..1), t
function buisjeGroot(ctx, x, y, h, o = {}) { const { a = 1, lucht = 0, t = 0, etiket = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.24;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba('#E8ECF0', 0.18), '#C9CED6', 2.5);
  roundRect(ctx, x - w / 2, y - h / 2, w, h * 0.12, 8); shape(ctx, '#5BA4C9', '#8FC0DC', 1.5); roundRect(ctx, x - w / 2 + 6, y - h / 2 + h * 0.13, w - 12, h * 0.07, 4); shape(ctx, rgba(C.oker, 0.75), C.oker, 1.5);
  if (etiket) { roundRect(ctx, x - w / 2 - 4, y - h * 0.05, w + 8, h * 0.18, 4); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); text(ctx, etiket, x, y + h * 0.075, fTekst(Math.max(20, h * 0.06), 700), '#1A2740', 'center'); }
  if (lucht > 0.01) for (let i = 0; i < 7; i++) { const ph = ((t * 0.18 + hash(i * 3)) % 1), px = x + (hash(i) - 0.5) * w * 0.6, py = lerp(y + h * 0.75, y - h * 0.3, ph); nh3(ctx, px, py, 9, { a: lucht * (ph < 0.9 ? 1 : 0), rot: i + t * 0.3 }); }
  ctx.restore(); }
// meetstation: kast met apparatuur en een antenne/inlaat
function meetStation(ctx, x, y, s = 1, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -80, -170, 160, 170, 8); shape(ctx, '#C9CED6', '#9AA3B2', 2); roundRect(ctx, -60, -150, 120, 70, 4); shape(ctx, '#2A3446', '#5A6478', 1.5);
  ctx.strokeStyle = C.groen; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const px = -52 + i * 5.2, py = -115 + Math.sin(i * 0.9) * 12; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  for (let i = 0; i < 3; i++) circ(ctx, -40 + i * 40, -50, 10, ['#7FC48F', '#E0B64A', '#9AA3B2'][i]); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-4, -230, 8, 60); ctx.beginPath(); ctx.arc(0, -230, 16, Math.PI, 0); ctx.fill();
  if (hl > 0.01) ecA(ctx, hl, () => { roundRect(ctx, -92, -244, 184, 252, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.restore(); }

// raster over een gebied (clip door de beller); o.goud = [kolom, rij] van het gouden zeshoekje, o.goudA; geeft het middelpunt van het gouden terug
function zeshoekRaster(ctx, x0, y0, x1, y1, r, o = {}) { const { a = 1, punt = null, goudA = 0, kl = rgba(C.line, 0.45) } = o; let G = null; const dx = r * Math.sqrt(3), dy = r * 1.5;
  if (punt) { const j = Math.round((punt[1] - y0) / dy), i = Math.round((punt[0] - x0 - (j % 2 ? dx / 2 : 0)) / dx); G = [x0 + i * dx + (j % 2 ? dx / 2 : 0), y0 + j * dy]; }
  if (a <= 0.01) return G; ctx.save(); ctx.globalAlpha *= a;
  for (let j = 0; y0 + j * dy < y1 + r; j++) for (let i = 0; x0 + i * dx < x1 + r; i++) { const px = x0 + i * dx + (j % 2 ? dx / 2 : 0), py = y0 + j * dy; zeshoek(ctx, px, py, r, null, kl, 1.2); }
  if (G && goudA > 0.01) ecA(ctx, goudA, () => zeshoek(ctx, G[0], G[1], r, rgba(C.goud, 0.45), C.goud, 3.5));
  ctx.restore(); return G; }

// ---------- getallenlijn depositie (mol N per ha per jaar) met streepjes en balk ----------
// x0..x1 = 0..max; o.balk (waarde), o.balkA, o.strepen [[waarde, naam, kleur, a]], o.marge [lo, hi, a]
function depLijn(ctx, x0, x1, y, max, o = {}) { const { a = 1, balk = 0, balkA = 0, strepen = [], marge = null, ticks = [0, 500, 1000, 1500, 2000, 2500], boven = 0.5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = v => x0 + (x1 - x0) * v / max;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  ticks.forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), y); ctx.lineTo(X(v), y + 12); ctx.stroke(); metaText(ctx, String(v), X(v), y + 46, C.text2, 'center', 26); });
  metaText(ctx, 'MOL STIKSTOF PER HECTARE PER JAAR', x1, y + 86, C.text2, 'right', 26);
  if (marge && marge[2] > 0.01) ecA(ctx, marge[2], () => { const [lo, hi] = marge; for (let k = 0; k < 12; k++) { const f = k / 12; ctx.fillStyle = rgba(C.koraal, 0.05); ctx.fillRect(X(lo) + (X(hi) - X(lo)) * f * 0.06, y - 150, (X(hi) - X(lo)) * (1 - f * 0.12), 120); }
    ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(X(lo), y - 160); ctx.lineTo(X(lo), y - 20); ctx.moveTo(X(hi), y - 160); ctx.lineTo(X(hi), y - 20); ctx.stroke(); ctx.setLineDash([]); });
  if (balkA > 0.01) ecA(ctx, balkA, () => { const { kdw = null, kdwA = 0 } = o; roundRect(ctx, X(0), y - 120, X(balk) - X(0), 60, 8); shape(ctx, rgba(C.line, 0.3), C.line, 1.5);
    if (kdw != null && kdwA > 0.01 && balk > kdw) ecA(ctx, kdwA, () => { roundRect(ctx, X(0), y - 120, X(kdw) - X(0), 60, 8); shape(ctx, rgba(C.groen, 0.45), C.groen, 1.5); roundRect(ctx, X(kdw), y - 120, X(balk) - X(kdw), 60, 8); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 2); }); });
  strepen.forEach(([v, nm, col, sa], i) => { if (!(sa > 0.01)) return; ecA(ctx, sa, () => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(v), y - 190 - i * 0); ctx.lineTo(X(v), y); ctx.stroke(); naamBij(ctx, nm, String(v) + ' mol', X(v), y - 210 - (i % 2) * 0, 1, i % 2 ? 'left' : 'right', C.text); }); });
  ctx.restore(); return X; }


// ---------- BODEMPROFIEL (zandgrond) met kalk die uitspoelt ----------
function bodemProfiel(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, spoel = 0, zuur = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); ctx.save(); ctx.clip(); ctx.fillStyle = '#3A2E26'; ctx.fillRect(x, y, w, h * 0.22); ctx.fillStyle = '#8A7A5A'; ctx.fillRect(x, y + h * 0.22, w, h * 0.3); ctx.fillStyle = KL_ZAND_D; ctx.fillRect(x, y + h * 0.52, w, h * 0.48);
  const R = ecRng(5); for (let i = 0; i < 70; i++) circ(ctx, x + R() * w, y + h * 0.25 + R() * h * 0.74, 1.5 + R() * 2, rgba('#F2EAD8', 0.25));
  // kalk (wit) als korrels; spoel 0..1 = korrels zakken naar beneden en uit beeld
  for (let i = 0; i < 16; i++) { const px = x + 30 + (i % 8) * (w - 60) / 7, base = y + h * (0.1 + Math.floor(i / 8) * 0.14), dy = spoel * (h * (0.6 + hash(i) * 0.5)) + Math.sin(t * 2 + i) * 2; if (base + dy < y + h + 10) circ(ctx, px, base + dy, 7, rgba('#F2F2EE', 0.9), '#C9CED6', 1); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 12); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 1.5; ctx.stroke();
  if (zuur > 0.01) ecA(ctx, zuur, () => { for (let i = 0; i < 5; i++) { const px = x + 40 + i * (w - 80) / 4, py = y - 40 - (i % 2) * 18; circ(ctx, px, py, 10, rgba(C.koraal, 0.7)); text(ctx, 'H⁺', px, py + 36, fTekst(24, 700), C.koraal, 'center'); } });
  ctx.restore(); }

// ---------- NESTKAST aan een boom, EI, SLAKKENHUISJE ----------
function boomStam(ctx, x, y, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 34, y); ctx.lineTo(x - 26, y - h); ctx.lineTo(x + 26, y - h); ctx.lineTo(x + 36, y); ctx.closePath(); shape(ctx, '#5A4636', '#7A6450', 1.5);
  ctx.strokeStyle = rgba('#3A2E26', 0.7); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 20 + i * 8, y - 20 - i * 30); ctx.lineTo(x - 16 + i * 8, y - 90 - i * 30); ctx.stroke(); }
  for (let i = 0; i < 7; i++) circ(ctx, x + (i - 3) * 50, y - h - 20 - (i % 2) * 40, 70, i % 2 ? KL_BOS : KL_BOS_L); ctx.restore(); }

// ---------- RAPPORT met vakjes (passende beoordeling, schematisch) ----------
function rapport(ctx, x, y, w, vakjes, o = {}) { const { a = 1, n = vakjes.length, kop = 'PASSENDE BEOORDELING', px = 30, hl = -1 } = o; if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a;
  const rh = px * 2.0, h = 100 + vakjes.length * rh; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); metaText(ctx, kop, x + 28, y + 56, '#5A6478', 'left', 24);
  vakjes.forEach((s2, i) => { const ry = y + 80 + i * rh, f = clamp(n - i, 0, 1); roundRect(ctx, x + 22, ry, w - 44, rh - 12, 6); shape(ctx, i === hl ? rgba(C.goud, 0.3) : '#E6E0D2', '#C8C0B0', 1.2);
    roundRect(ctx, x + 34, ry + 12, 26, 26, 4); shape(ctx, '#FFFFFF', '#9AA3B2', 1.5); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; vink_(ctx, x + 47, ry + 25, 9, 1, '#3E8A5A'); text(ctx, s2, x + 76, ry + rh * 0.5 + 4, fTekst(px, 600), '#1A2740', 'left'); ctx.restore(); } });
  ctx.restore(); return h; }
// provinciehuis: gebouw met vlag zonder naam of wapen
function provincieGebouw(ctx, x, y, s = 1, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -150, 220, 150, 6); shape(ctx, '#6A7A94', '#9AA8BE', 2); ctx.beginPath(); ctx.moveTo(-124, -150); ctx.lineTo(0, -210); ctx.lineTo(124, -150); ctx.closePath(); shape(ctx, '#56657E', '#9AA8BE', 2);
  for (let i = 0; i < 4; i++) { ctx.fillStyle = '#C9CED6'; ctx.fillRect(-88 + i * 50, -130, 26, 100); } ctx.fillStyle = '#3A4458'; ctx.fillRect(-20, -60, 40, 60);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -210); ctx.lineTo(0, -290); ctx.stroke(); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(2, -290, 54, 30);
  if (hl > 0.01) ecA(ctx, hl, () => { roundRect(ctx, -136, -300, 272, 312, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.restore(); }
// RIVM-rekenen als icoon: scherm met zeshoekjes (geen logo)
function rekenScherm(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -70, 180, 120, 8); shape(ctx, '#2A3446', '#8FA0B5', 2); ctx.save(); roundRect(ctx, -82, -62, 164, 104, 4); ctx.clip(); zeshoekRaster(ctx, -82, -62, 82, 42, 14, { kl: rgba(C.line, 0.6) }); zeshoek(ctx, 6, -16, 14, rgba(C.goud, 0.5), C.goud, 2); ctx.restore();
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(-12, 50, 24, 18); ctx.fillRect(-40, 66, 80, 6); ctx.restore(); }

// ---------- CIRKELDIAGRAM in neutrale tinten (geen koraal voor één sector) ----------
function taart(ctx, x, y, r, delen, o = {}) { const { a = 1, groei = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; let an = -Math.PI / 2; const tot = delen.reduce((s, d) => s + d[0], 0);
  delen.forEach(([v, nm, col, la = 1], i) => { const d = v / tot * 6.283 * groei; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, an, an + d); ctx.closePath(); shape(ctx, col, '#1A2740', 3);
    const m = an + d / 2; if (la > 0.01 && groei > 0.98) naamBij(ctx, nm[0], nm[1], x + Math.cos(m) * r * 1.22 + (Math.cos(m) > 0 ? 0 : 0), y + Math.sin(m) * r * 1.22, la, Math.cos(m) > 0.2 ? 'left' : Math.cos(m) < -0.2 ? 'right' : 'center'); an += d; });
  ctx.restore(); }

// ---------- OPLEIDING- en WERKPLEKKAARTJE ----------
function opleidingKaart(ctx, x, y, w, niveau, naam, plaats, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(C.fill, 0.92), rgba(C.groen, 0.7), 1.5);
  metaText(ctx, niveau, x + 24, y + 44, C.goud, 'left', 26); text(ctx, naam, x + 24, y + 92, fTekst(34, 700), C.text, 'left'); if (plaats) metaText(ctx, plaats, x + 24, y + 130, C.text2, 'left', 24); ctx.restore(); }
