// DNA kopiëren 2.0 (DNA 2/8) — scènes, één functie per gesproken alinea. 26 okt 2026.
// Tekeningen: teken_dna2.js (vork, polymerase, helicase, primase, ligase, vrije nucleotide, schaafwond; basen = baseRing uit lib_bio.js)
// plus de gedeelde bibliotheek: onderarm, huidDoorsnede, kernChromatine, chromatideX, nucleosoomDraad, celRond, enzymKluwen, dnaDraad.
// Cue-woorden: q.at zoekt een stukje van een woord (hoofdletterongevoelig).

const mic = (ctx) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); };
const sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const nb = (ctx, n, m, x, y, a = 1, al = 'left', kl = C.text) => naamBij(ctx, n, m, x, y, a, al, kl);
const meta = (ctx, s, x, y, al = 'left', kl = C.text2, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, kl, al, 28); ctx.restore(); };
const schaal = (ctx, px, lab, a = 1, x = 70, y = 860) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y - 12, px, 5); metaText(ctx, lab, x + px + 20, y, C.text2, 'left', 28); ctx.restore(); };
const snel = (ctx, s, a = 1) => meta(ctx, s, W - 70, 860, 'right', C.text2, a);
const fade = (t, t0, t1, d = 0.5) => ramp(t, t0, d) * (1 - ramp(t, t1, d));
function kamerNoor(ctx) { ctx.fillStyle = '#20304C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#2F4268'; ctx.fillRect(0, 836, W, 10); ctx.fillStyle = '#34405A'; ctx.fillRect(0, 846, W, H - 846);
  roundRect(ctx, 1460, 170, 300, 340, 8); shape(ctx, '#2C4A6E', '#3E5E86', 3); ctx.fillStyle = '#3E5E86'; ctx.fillRect(1607, 170, 6, 340); ctx.fillRect(1460, 335, 300, 6); }
// Noors eigen onderarm (rechts in beeld) met een gouden ringetje op de wond, en een kader om de vergrote arm (MOET 1 frisse review)
const NOOR_WOND = [1646, 692];
function vergrootKader(ctx, x0, y0, x1, y1, a = 1, lijn = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const [wx, wy] = NOOR_WOND;
  ctx.strokeStyle = C.goud; ctx.lineWidth = 2; roundRect(ctx, x0, y0, x1 - x0, y1 - y0, 14); ctx.stroke(); ctx.beginPath(); ctx.arc(wx, wy, 16, 0, 6.283); ctx.stroke();
  if (lijn > 0.01) { ctx.save(); ctx.globalAlpha *= lijn; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(wx - 14, wy - 6); ctx.lineTo(x1, y0 + 20); ctx.moveTo(wx - 12, wy + 9); ctx.lineTo(x1, y1 - 20); ctx.stroke(); ctx.restore(); }
  metaText(ctx, 'vergroot', x0 + 18, y0 - 16, C.goud, 'left', 26); ctx.restore(); }
function haakKort(ctx, x1, x2, y, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1 + 3, y + 10); ctx.lineTo(x1 + 3, y); ctx.lineTo(x2 - 3, y); ctx.lineTo(x2 - 3, y + 10); ctx.stroke(); ctx.restore(); }

// ---------- celcyclusklok (zelfde ring en kleuren als Celdeling: interfase paars met G1/S/G2, mitose goud, cytokinese groen) ----------
function klok(ctx, cx, cy, R, o = {}) { const { a = 1, wijzer = null, hlS = 0, hlM = 0, labels = 1 } = o; if (a <= 0.01) return; const th = 62, A0 = -Math.PI / 2, ang = (f) => A0 + f * 6.2832;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = th; ctx.strokeStyle = rgba(C.line, 0.22); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.stroke();
  [['G1', 0, 0.4, C.paars], ['S', 0.4, 0.7, C.paars], ['G2', 0.7, 0.88, C.paars], ['M', 0.88, 1, '#8FA0B5']].forEach(([n, f0, f1, col]) => {
    const hl = n === 'S' ? hlS : n === 'M' ? hlM : 0; if (n === 'M') col = _mixHex(col, C.goud, hl); ctx.lineWidth = th; ctx.strokeStyle = rgba(col, 0.55 + 0.4 * hl); ctx.beginPath(); ctx.arc(cx, cy, R, ang(f0) + 0.012, ang(f1) - 0.012); ctx.stroke();
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.lineWidth = 4; ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.arc(cx, cy, R + th / 2 + 8, ang(f0) + 0.012, ang(f1) - 0.012); ctx.stroke(); ctx.restore(); }
    if (labels > 0.01) { const fm = (f0 + f1) / 2; ctx.save(); ctx.globalAlpha *= labels; text(ctx, n === 'S' ? 'S' : n === 'M' ? 'M' : n, cx + Math.cos(ang(fm)) * R, cy + Math.sin(ang(fm)) * R + 12, fTekst(34, 700), C.text, 'center'); ctx.restore(); } });
  if (wijzer != null) { const an = ang(wijzer % 1); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * (R - th / 2 - 14), cy + Math.sin(an) * (R - th / 2 - 14)); ctx.stroke(); _bioCirc(ctx, cx, cy, 9, C.text); }
  ctx.restore(); }

// ---------- vork in beeld ----------
const VST = { i0: 0, i1: 110, X0: 110, cy: 430, g: 50, dx: 15, Dmax: 185, Lsplit: 9, Ltw: 10, Lf: 26, pl: 4, p1: 30, lead: 4, startLead: 0, vlag: 1.4 };
function eind53(ctx, M, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const e = (s, x, y) => text(ctx, s, x, y, fTekst(34, 700), C.text2, 'center');
  e("3'", 72, M.yT(M.i0) + 12); e("5'", 72, M.yB(M.i0) + 12); e("5'", M.X(M.i1) + 32, M.cy - 14); e("3'", M.X(M.i1) + 32, M.cy + 38); ctx.restore(); }

// ---------- startpuntsimulatie (vaste seed: elk moment is gelijk bij afspelen of zoeken) ----------
function startSim(ctx, x0, x1, y, tau, o = {}) { const { n = 26, v = 0.06, seed = 3, h = 30, a = 1, genen = 0, niet = 0 } = o; if (a <= 0.01) return { frac: 0 };
  const O = []; for (let k = 0; k < n; k++) O.push({ p: (k + 0.2 + 0.6 * hash(seed + k)) / n, t0: hash(seed * 7 + k) * 0.75 });
  const iv = O.filter(q => tau > q.t0).map(q => [Math.max(0, q.p - v * (tau - q.t0) * 6), Math.min(1, q.p + v * (tau - q.t0) * 6)]).sort((p, q) => p[0] - q[0]);
  const U = []; iv.forEach(I => { if (U.length && I[0] <= U[U.length - 1][1]) U[U.length - 1][1] = Math.max(U[U.length - 1][1], I[1]); else U.push(I.slice()); });
  const X = (u) => x0 + (x1 - x0) * u; let gedaan = 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const GEN = [[0.08, 0.13], [0.31, 0.35], [0.52, 0.6], [0.83, 0.88]];
  if (genen > 0.01) { ctx.save(); ctx.globalAlpha *= genen; GEN.forEach(([p, q]) => { ctx.fillStyle = rgba(C.groen, 0.3); ctx.fillRect(X(p), y - h - 10, X(q) - X(p), 2 * h + 20); }); ctx.restore(); }
  if (niet > 0.01) { ctx.save(); ctx.globalAlpha *= niet; let p0 = 0; [...GEN, [1, 1]].forEach(([p, q]) => { if (p > p0) { ctx.strokeStyle = rgba(C.text, 0.7); ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.strokeRect(X(p0) + 3, y - h - 14, X(p) - X(p0) - 6, 2 * h + 28); ctx.setLineDash([]); } p0 = q; }); ctx.restore(); }
  ctx.strokeStyle = D2.oud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  U.forEach(([p, q]) => { gedaan += q - p; const xa = X(p), xb = X(q), r = Math.min(14, (xb - xa) / 2);
    ctx.fillStyle = C.bgMicro; ctx.fillRect(xa + 2, y - 6, xb - xa - 4, 12);
    [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(xa, y); ctx.quadraticCurveTo(xa + r, y + s * h, xa + r * 2, y + s * h); ctx.lineTo(xb - r * 2, y + s * h); ctx.quadraticCurveTo(xb - r, y + s * h, xb, y);
      ctx.strokeStyle = D2.oud; ctx.lineWidth = 8; ctx.stroke(); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 3; ctx.stroke(); }); });
  O.forEach(q => { if (tau > q.t0) _bioCirc(ctx, X(q.p), y, 6, genen > 0.5 ? rgba(C.text2, 0.5) : C.goud); else _bioCirc(ctx, X(q.p), y, 5, null, rgba(C.grain, 0.6), 1.5); });
  ctx.restore(); return { frac: Math.min(1, gedaan) }; }

// ---------- Meselson-Stahl ----------
function buis(ctx, x, y, h, banden, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 90;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w / 2, y + h - w / 2); ctx.arc(x, y + h - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(x - w / 2, y + 30, w, h); ctx.restore();
  banden.forEach(([pos, kl, s]) => { if (s <= 0.01) return; const by = y + 60 + pos * (h - 140); ctx.save(); ctx.globalAlpha *= s; roundRect(ctx, x - w / 2 + 8, by - 7, w - 16, 14, 6); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); });
  text(ctx, lab, x, y + h + 50, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
function molecuul(ctx, x, y, kA, kB, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [kA, kB].forEach((kl, k) => { ctx.strokeStyle = kl; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + k * 18, y); ctx.lineTo(x + k * 18, y + 90); ctx.stroke(); }); ctx.restore(); }
function staafje(ctx, x, y, L, rot, kl) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -L / 2, -L * 0.17, L, L * 0.34, L * 0.17); shape(ctx, rgba(C.teal, 0.55), C.teal, 1.2); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, L * 0.25, L * 0.08, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } // E. coli met DNA in de kleur zwaar/licht
function dubbelHelix(ctx, x0, x1, y, A, kA, kB, t) { const n = 120, P = (k) => { const r = []; for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n), ph = (x - x0) / 170 * 6.283 + t * 0.4 + k * 2.3; r.push([x, y + A * Math.sin(ph), Math.cos(ph)]); } return r; };
  const a = P(0), b = P(1); ctx.save(); ctx.lineCap = 'round';
  for (let i = 0; i <= n; i += 2) { const d = (a[i][2] + b[i][2]) / 2; ctx.strokeStyle = rgba(DNA_BASE.base[d2seq(i)], 0.55 + 0.35 * (d + 1) / 2); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(a[i][0], a[i][1]); ctx.lineTo(b[i][0], b[i][1]); ctx.stroke(); }
  [[a, kA], [b, kB]].forEach(([p, kl]) => { ctx.strokeStyle = kl; ctx.lineWidth = 14; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }); ctx.restore(); }
const ZW = '#4F3F86', LI = '#C9BEEB', HZ = '#8C7BBF';

// ---------- close-up van de polymerase (zelfde model als keyframe 04) ----------
// fase: 0 = alleen DNA, 'kies' = vrije nucleotiden botsen, 'mis'/'past' = gevolgde nucleotide, sluit 0..1, schuif = aantal geplaatste extra basen
function polyClose(ctx, ox, t, o = {}) { const { poly = 1, mis = 0, past = 0, sluit = 0, schuif = 0, vrij = 1, letters = true, skip = null, van = -999, prim = 0, px = 0 } = o;
  const g = 150, dx = 25.5, cy = 470, x3 = ox + 520 + schuif * dx; const yM = cy + g / 2, yN = cy - g / 2, L = g / 2 - 14, hw = 8.5;
  if (poly > 0.01) polymeraseAchter(ctx, x3 + px, cy, g * 0.95, { dir: 1, up: 1, a: poly });
  const P = (y, a, b) => { const r = []; for (let x = a; x <= b; x += 6) r.push([x, y]); return r; };
  const k0 = -22, k1 = 18;
  for (let k = k0; k <= k1; k++) { const x = ox + 520 + k * dx, b = d2seq(k + 40); if (x < -40 || x > W + 40) continue; d2Base(ctx, x, yM - 7, -Math.PI / 2, D2.comp[b], L, hw, {});
    const isP = prim > 0.01 && k >= van && k < van + 4; if (k <= -1 + Math.floor(schuif) && k !== skip && k >= van && (!(k < van + 4) || van < k0 || isP)) d2Base(ctx, x, yN + 7, Math.PI / 2, isP ? D2.rcomp[D2.comp[b]] : b, L, hw, { rna: isP, a: isP ? prim : 1 }); }
  d2Rug(ctx, P(yM, ox + 520 + k0 * dx - 10, ox + 520 + k1 * dx + 10), { kleur: D2.oud, bw: 14 });
  if (van < k0) d2Rug(ctx, P(yN, ox + 520 + k0 * dx - 10, x3 - dx * 0.6), { kleur: D2.nieuw, bw: 14 });
  else { const xa = ox + 520 + van * dx - 10, xp = ox + 520 + (van + 3) * dx + 12; if (prim > 0.01) d2Rug(ctx, P(yN, xa, Math.min(xp, x3 - dx * 0.6)), { kleur: D2.rna, bw: 14, a: prim }); if (x3 - dx * 0.6 > xp) d2Rug(ctx, P(yN, xp, x3 - dx * 0.6), { kleur: D2.nieuw, bw: 14 }); }
  // vrije nucleotiden die rustig rondzwerven
  if (vrij > 0.01) [[120, 170, 'C', 0.4], [380, 140, 'A', -0.6], [760, 200, 'T', 0.9], [860, 760, 'G', 2.6], [150, 780, 'A', 2.2], [600, 800, 'C', 1.4]].forEach(([x, y, b, an], i) => { const w = wander(i + 3, t, 14, 0.5); vrijNucleotide(ctx, ox + x + w.x, y + w.y, b, an + 0.1 * Math.sin(t + i), 0.75, { a: 0.55 * vrij }); });
  const kb = d2seq(40 + Math.floor(schuif));
  if (mis > 0.01) { const u = ease(mis), bx = lerp(x3 + 10, x3 + 140, u), by = lerp(cy - 40, cy - 330, u) - Math.sin(u * Math.PI) * 40; vrijNucleotide(ctx, bx, by, 'G', 0.5 + u * 1.5, 1.15, { rand: C.koraal, a: 1 - ramp(mis, 0.85, 0.15) }); }
  if (past > 0.01) { const u = ease(past), bx = lerp(x3 + 140, x3, u), by = lerp(cy - 300, yN + 2, u); vrijNucleotide(ctx, bx, by, kb, lerp(0.8, Math.PI, u), 1.05, { rand: C.goud }); }
  if (poly > 0.01) polymeraseVoor(ctx, x3 + px, cy, g * 0.95, { dir: 1, up: 1, sluit, a: 0.94 * poly });
  return { x3, cy, g, yM, yN }; }

Object.assign(SCENES, {
  // ---------------- titel
  title(ctx, t) { ctx.save(); ctx.translate(980, 260); ctx.scale(0.62, 0.62); vork(ctx, Object.assign({}, VST, { f: 70 + t * 2.2, t, toon: { primase: 1, ligase: 1 } })); ctx.restore(); },

  // ---------------- Cold open: Noors arm heelt, zoomcirkel naar de basale laag
  s01(ctx, t, q) { kamerNoor(ctx); const sc = 13, ex = 100, ey = 470;
    const heel = t < q.at('week') ? 0 : clamp((t - q.at('week')) / 2.2, 0, 1) * 0.74; const dag = Math.round(lerp(0, 7, heel / 0.74));
    const zoom = ramp(t, q.at('Daarvoor') - 0.2, 1.2), uit = ramp(t, q.at('twee'), 0.8);
    persoon(ctx, 'noor', 1720, 846, 480, { uit: heel > 0.5 ? 'blij' : 'bezorgd', t, kijk: -1 });
    onderarm(ctx, ex, ey, sc, { id: 'noor', kijk: 1 }); schaafwond(ctx, ex, ey, sc, { heel, kijk: 1, cx: 14, cyy: -0.4, rx: 3.0, ry: 1.5 });
    nb(ctx, 'onderarm van Noor', null, ex + 20 * sc, ey - 120, ramp(t, 0.2, 0.6) * (1 - zoom), 'center');
    vergrootKader(ctx, 50, 380, 640, 560, ramp(t, 0.2, 0.6) * (1 - uit), 1 - zoom);
    meta(ctx, 'dag ' + dag, ex + 14 * sc, ey + 110, 'center', C.text, ramp(t, q.at('week') - 0.3, 0.4));
    const sx = ex + 14 * sc, sy = ey - 0.4 * sc;
    zoomCircle(ctx, 1080, 400, 300, sx, sy, null, zoom * (1 - uit), () => { mic(ctx); ctx.save(); ctx.translate(1080 - 470, 400 - 280); ctx.scale(1.15, 1.15); huidDoorsnede(ctx, 0, 0, 820, 500, { um: 260, mel: 1, deling: 1, seed: 7, hl: 'basaal', t }); ctx.restore(); });
    nb(ctx, 'basale laag van de huid', 'deze cellen delen zich', 1080, 760, zoom * (1 - uit), 'center');
    // twee meter DNA in elke cel
    if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; roundRect(ctx, 820, 200, 680, 560, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
      const k = kernChromatine(ctx, 1000, 470, 150, { c: 0, seed: 4 }); text(ctx, 'in elke cel', 1000, 270, fTekst(34, 600), C.text, 'center');
      persoon(ctx, 'noor', 1300, 700, 300, { uit: 'verbaasd', t }); const h2 = 300 * 200 / 167; dnaDraad(ctx, [[1430, 700], [1434, 700 - h2 * 0.5], [1430, 700 - h2]], { w: 5 });
      text(ctx, '2 m', 1450, 700 - h2 / 2, fTekst(40, 700), C.kernR, 'left'); meta(ctx, 'DNA uit één cel, uitgerekt', 1160, 740, 'center', C.text2); ctx.restore(); }
    // de vraag
    const vr = ramp(t, q.at('Hoe'), 0.5); if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; text(ctx, 'Hoe doet een cel dat?', 960, 150, fTitel(64), C.goud, 'center'); ctx.restore(); } },

  // ---------------- Hoofdstuk 1: klok van de cel
  s03(ctx, t, q) { const klokA = t >= q.at('klok') - 0.2 ? 1 : 0; // cut naar Schema-kaart (C6)
    if (klokA < 0.999) { mic(ctx); ctx.save(); ctx.globalAlpha *= 1 - klokA;
      // een cel die zou delen zonder te kopiëren: de helft (koraal)
      celRond(ctx, 660, 450, 230, { t }); const half = ramp(t, q.at('Anders'), 0.6);
      if (half > 0.01) { ctx.save(); ctx.globalAlpha *= half; celRond(ctx, 1300, 330, 150, { t, organellen: false }); celRond(ctx, 1300, 650, 150, { t, organellen: false });
        kernChromatine(ctx, 1300, 330, 60, { c: 0, n: 23, seed: 4 }); kernChromatine(ctx, 1300, 650, 60, { c: 0, n: 23, seed: 9 });
        text(ctx, 'maar de helft?', 1520, 500, fTekst(40, 700), C.koraal, 'left'); ctx.restore(); }
      nb(ctx, 'een cel die gaat delen', null, 660, 160, ramp(t, 0.1, 0.5), 'center'); ctx.restore(); }
    if (klokA > 0.01) { ctx.save(); ctx.globalAlpha *= klokA; sch(ctx);
      const tS = q.at('S-fase'), tM = q.at('M-fase'); const w = t < tS ? 0.1 + 0.3 * ramp(t, q.at('klok'), 2.5) : t < tM ? 0.4 + 0.3 * ramp(t, tS, 3) : 0.7 + 0.25 * ramp(t, tM, 2);
      klok(ctx, 560, 470, 270, { wijzer: w, hlS: fade(t, tS, tM), hlM: ramp(t, tM, 0.5) });
      nb(ctx, 'celcyclus', null, 560, 120, ramp(t, q.at('celcyclus'), 0.5), 'center');
      // naast de klok: één chromatide wordt een X (S), daarna twee cellen (M)
      const c = ramp(t, tS + 0.5, 2.0), m = ramp(t, tM, 1.2);
      if (m <= 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(lerp(1262, 1000, c), 200, 600, 460); ctx.clip(); chromatideX(ctx, 1260, 420, 300, 0, { uiteen: 0, a: 1 }); ctx.restore(); }
      else chromatideX(ctx, 1260, 420, 300, 0, { uiteen: m, a: 1 });
      nb(ctx, c < 0.5 ? 'één chromatide' : 'gekopieerd: twee chromatiden', null, 1260, 640, fade(t, q.at('klok'), tM), 'center');
      nb(ctx, 'S = synthese', 'het DNA wordt gekopieerd', 1260, 170, fade(t, tS, tM), 'center', C.goud);
      nb(ctx, 'M = deling', 'kopieën naar twee dochtercellen', 1260, 170, m * (1 - ramp(t, q.at('replicatie'), 0.5)), 'center', C.goud);
      const r = ramp(t, q.at('replicatie'), 0.5); if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; roundRect(ctx, 1080, 640, 640, 150, 14); shape(ctx, rgba(C.fill, 0.9), C.line, 1);
        text(ctx, 'DNA-replicatie', 1400, 705, fTekst(48, 700), C.text, 'center'); text(ctx, 'ook: DNA-verdubbeling', 1400, 760, fTekst(32, 600), C.text2, 'center', ); ctx.globalAlpha *= ramp(t, q.at('verdubbeling'), 0.4); ctx.restore(); }
      ctx.restore(); } },
  s04(ctx, t) { sch(ctx); klok(ctx, 960, 470, 270, { wijzer: 0.2 + 0.02 * Math.sin(t), labels: 1 }); text(ctx, '?', 960, 490, fTitel(120), C.goud, 'center'); },
  s06(ctx, t, q) { sch(ctx); klok(ctx, 560, 470, 270, { wijzer: 0.55, hlS: 1 });
    nb(ctx, 'vóór de deling: S-fase', null, 560, 120, 1, 'center', C.goud);
    const x = ramp(t, q.at('chromosoom') - 0.3, 0.8); chromatideX(ctx, 1300, 440, 320, 0, { a: 1 });
    nb(ctx, 'twee identieke chromatiden', 'één chromosoom, al gekopieerd', 1300, 690, ramp(t, q.at('chromatiden') - 0.4, 0.5), 'center');
    haakKort(ctx, 1230, 1370, 260, C.goud, x); },

  // ---------------- Hoofdstuk 2: doorlopende zoom kern → helix
  s07(ctx, t, q) { mic(ctx); const z = clamp(t / 4.6, 0, 1); // vier stadia, zachte overgangen
    const st = z * 3, k = Math.floor(Math.min(2.999, st)), f = ease(st - k), cx = 960, cy = 430;
    const teken = (n, a, s) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy);
      if (n === 0) kernChromatine(ctx, cx, cy, 300, { c: 0, seed: 4 });
      if (n === 1) { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([cx - 520 + u * 1040, cy + Math.sin(u * 9) * 120 + Math.sin(u * 23) * 30]); } dnaDraad(ctx, pts, { w: 34, helix: false }); }
      if (n === 2) nucleosoomDraad(ctx, cx - 560, cy + 20, cx + 560, cy - 20, { n: 4, R: 90, t });
      if (n === 3) dnaDraad(ctx, [[cx - 760, cy + 30], [cx, cy - 10], [cx + 760, cy + 20]], { w: 150, helix: true, fase: t * 0.05, kleur: D2.oud, donker: _mixHex(D2.oud, '#000000', 0.45) });
      ctx.restore(); };
    const tl = ramp(t, q.at('Tegenover') - 0.6, 1.4); // helix → ladder met ringbasen
    if (tl < 0.999) { teken(k, (1 - f) * (1 - tl), 1 + f * 3); teken(k + 1, f * (1 - tl), 0.35 + 0.65 * f); }
    const labs = [['celkern', 'beeld 20 micrometer breed'], ['chromatine', 'beeld 2 micrometer breed'], ['DNA rond eiwitten', 'beeld 120 nanometer breed'], ['DNA', 'beeld 25 nanometer breed · 2 nanometer dik']];
    const li = Math.round(st); meta(ctx, labs[li][0] + ' · ' + labs[li][1], 70, 860, 'left', C.text2, 1 - tl);
    nb(ctx, 'de dubbele ketting', 'uit aflevering 1', 960, 150, ramp(t, q.at('dubbele'), 0.5) * (1 - tl), 'center');
    if (tl > 0.01) { const seq = 'ATGCAGTC'; dnaLadderHelix(ctx, 260, 470, 200, seq, { draai: 1 - tl, R: 210, s: 1, bruggenA: ramp(t, q.at('Tegenover'), 0.6), plekA: 0, a: tl });
      const hlA = fade(t, q.at('A', 2) - 0.1, q.at('tegenover', 2)), hlC = fade(t, q.at('tegenover', 2), q.at('Ken'));
      if (hlA > 0.01) haakKort(ctx, 220, 300, 230, C.goud, hlA); if (hlC > 0.01) haakKort(ctx, 820, 900, 230, C.goud, hlC);
      const ken = ramp(t, q.at('Ken'), 0.5); if (ken > 0.01) { ctx.save(); ctx.globalAlpha *= ken * 0.65; ctx.fillStyle = C.bgMicro; ctx.fillRect(140, 480, 1640, 230); ctx.restore(); text(ctx, 'ken je één streng, dan ken je de andere', 960, 820, fTekst(40, 600), C.text, 'center'); }
      schaal(ctx, 200, '0,34 nanometer · één basenpaar', tl); } },

  s08(ctx, t, q) { mic(ctx); const f = 3 + 22 * ramp(t, q.at('helicase') + 0.3, 6), st = { f, i0: -4, i1: 50, X0: 960, cy: 450, g: 52, dx: 13, Dmax: 130, Lsplit: 9, Ltw: 10, Lf: 22, pl: 4, p1: 6, lead: 4, t, toon: { nieuw: 0, primase: 0, ligase: 0, poly: 0 } };
    const MV = vork(ctx, st); ctx.save(); ctx.translate(1920, 2 * st.cy); ctx.scale(-1, -1); vork(ctx, st); ctx.restore();
    const M = vorkModel(st); meta(ctx, 'startpunt', 960, 300, 'center', C.grain, ramp(t, 0, 0.6) * (1 - ramp(t, q.at('voorbeeld'), 0.5)));
    const ha = ramp(t, q.at('helicase'), 0.5); nb(ctx, 'helicase', 'trekt de strengen uit elkaar', 1400, 230, ha, 'left');
    if (ha > 0.01 && MV.E.helicase) { ctx.save(); ctx.globalAlpha *= ha; ctx.strokeStyle = C.text2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(1392, 238); ctx.lineTo(MV.E.helicase[0] + 22, MV.E.helicase[1] - 38); ctx.stroke(); ctx.restore(); }
    nb(ctx, 'als een rits die opengaat', null, 960, 760, fade(t, q.at('rits'), q.at('basen')), 'center', C.goud);
    nb(ctx, 'de basen liggen vrij', null, 960, 760, fade(t, q.at('basen'), q.at('Elke')), 'center', C.goud);
    nb(ctx, 'elke oude streng is een voorbeeld', null, 960, 760, ramp(t, q.at('Elke'), 0.5), 'center', C.goud);
    schaal(ctx, 130, '3,4 nanometer · één winding van 10 basenparen'); snel(ctx, 'simulatie · sterk vertraagd'); },

  s09(ctx, t, q) { mic(ctx); const tm = q.at('Deze', 1), tw = q.at('Deze', 2);
    polyClose(ctx, 420, t, { poly: 0, mis: ramp(t, tm, 1.6), past: ramp(t, tw, 1.4), vrij: ramp(t, 0.3, 0.8) });
    nb(ctx, 'vrije nucleotiden', 'in het kernplasma', 1500, 230, fade(t, q.at('vrije'), q.at('volgen')), 'left');
    nb(ctx, 'past niet', 'g tegenover t · schiet weg', 1300, 140, fade(t, tm + 0.6, tw), 'center', C.koraal);
    nb(ctx, 'past wel', 'a tegenover t', 1300, 140, ramp(t, tw + 0.8, 0.5), 'center', C.goud);
    nb(ctx, 'oude streng', null, 360, 610, ramp(t, 0.3, 0.6), 'left', C.kernR); snel(ctx, 'simulatie · 10 000× vertraagd'); },

  s10(ctx, t, q) { mic(ctx); const pIn = ramp(t, q.at('DNA-polymerase') - 0.6, 1.2), tSl = q.at('sluit'), tKop = q.at('koppelt'), tOp = q.at('vorige'), tSch = q.at('schuift');
    const schuif = ramp(t, tSch, 3.5) * 5;
    // vingers: open → klappen dicht op 'sluit' (korte aanloop: eerst iets verder open) → blijven dicht tijdens 'koppelt vast' → weer open; daarna open/dicht per stap
    const sl = t < tSch ? ease(ramp(t, tSl - 0.1, 0.5)) - 0.25 * Math.sin(Math.PI * ramp(t, tSl - 0.45, 0.35)) - ease(ramp(t, tOp + 0.3, 0.5)) : 0.5 - 0.5 * Math.cos(schuif * 6.283);
    const R = polyClose(ctx, 420, t, { poly: pIn, past: 1, sluit: clamp(sl, 0, 1), schuif: t > tSch ? schuif : 0, vrij: 0.35 });
    const fl = fade(t, tKop, tKop + 0.9, 0.25); if (fl > 0.01) { ctx.save(); ctx.globalAlpha *= fl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(R.x3 - 12.75, R.yN, 26 + 10 * ramp(t, tKop, 0.8), 0, 6.283); ctx.stroke(); ctx.restore(); }
    nb(ctx, 'DNA-polymerase', 'model · vereenvoudigd', 940, 720, ramp(t, q.at('DNA-polymerase'), 0.5), 'center');
    nb(ctx, 'kiest niet zelf', null, 1300, 140, fade(t, q.at('kiest'), q.at('nucleotide')), 'center', C.goud);
    nb(ctx, 'past bij de base én in het enzym', null, 1300, 140, fade(t, q.at('nucleotide'), q.at('Alleen')), 'center', C.goud);
    nb(ctx, 'enzym sluit', null, 1300, 140, fade(t, q.at('Alleen'), tKop), 'center', C.goud); nb(ctx, 'koppelt vast', null, 1300, 140, fade(t, tKop, tSch), 'center', C.goud);
    nb(ctx, 'nieuwe streng groeit', null, 1300, 140, ramp(t, q.at('schuift'), 0.5), 'center', D2.nieuwR);
    snel(ctx, t > q.at('schuift') ? 'simulatie · 1000× vertraagd' : 'simulatie · 10 000× vertraagd'); },

  s11(ctx, t, q) { mic(ctx); const f = 30 + 22 * ramp(t, 0.3, t > q.at('andere') ? 15 : 15), st = { f, i0: 0, i1: 64, X0: 120, cy: 420, g: 40, dx: 24, Dmax: 140, Lsplit: 9, Ltw: 10, Lf: 22, pl: 4, p1: 8, lead: 4, t, toon: { primase: 1, ligase: 1 } };
    const M = vork(ctx, st); const tE = q.at('ene'), tA = q.at('andere');
    nb(ctx, 'met de rits mee', null, M.X(14), M.yT(14) - 60, ramp(t, tE, 0.5), 'center', C.goud); if (t > tE) pijl(ctx, M.X(22), M.yT(22) - 72, M.X(34), M.yT(34) - 72, C.goud, ramp(t, tE, 0.5), 3, 14);
    nb(ctx, 'steeds een stukje terug', null, M.X(14), M.yB(14) + 90, ramp(t, tA, 0.5), 'center', C.goud); if (t > tA) pijl(ctx, M.X(34), M.yB(34) + 78, M.X(22), M.yB(22) + 78, C.goud, ramp(t, tA, 0.5), 3, 14);
    const tg = fade(t, q.at('tegengesteld') - 0.2, tE, 0.4); if (tg > 0.01) { pijl(ctx, M.X(18), M.yT(18) - 34, M.X(3), M.yT(3) - 34, C.kernR, tg, 4, 18); pijl(ctx, M.X(3), M.yB(3) + 34, M.X(18), M.yB(18) + 34, C.kernR, tg, 4, 18); }
    nb(ctx, 'tegengesteld', 'de oude strengen', M.X(10), M.cy + 4, tg, 'center', C.text);
    nb(ctx, 'oude strengen', null, 70, 230, ramp(t, 0.2, 0.5) * (1 - ramp(t, tE, 0.4)), 'left', C.kernR);
    snel(ctx, 'schematisch · niet op schaal'); },

  s12(ctx, t, q) { sch(ctx); const seq = 'ATGC'; text(ctx, 'oude streng', 300, 330, fTekst(36, 600), C.kernR, 'right');
    seq.split('').forEach((b, i) => { const x = 520 + i * 260; baseRing(ctx, x, 260, b, 1, { s: 1.2 }); });
    ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(430, 250); ctx.lineTo(1390, 250); ctx.stroke();
    text(ctx, '? ? ? ?', 910, 640, fTitel(80), C.goud, 'center'); },
  s14(ctx, t, q) { sch(ctx); const seq = 'ATGC'; const tt = ['A', 'T', 'G', 'C'].map((b, i) => q.at('tegenover', i + 1));
    text(ctx, 'oude streng', 330, 270, fTekst(34, 600), C.kernR, 'right'); text(ctx, 'nieuwe streng', 330, 590, fTekst(34, 600), D2.nieuwR, 'right');
    ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(430, 230); ctx.lineTo(1390, 230); ctx.stroke();
    const S = 1.7, Y2 = 240 + 200 * S; seq.split('').forEach((b, i) => { const x = 520 + i * 260, p = ramp(t, tt[i] + 0.4, 0.8), c = DNA_BASE.comp[b];
      baseRing(ctx, x, 240, b, 1, { s: S, plekA: 1, bindA: p }); if (p > 0.01) { baseRing(ctx, x, Y2 + (1 - ease(p)) * 120, c, -1, { s: S, plekA: 1, bindA: p, a: p }); if (p > 0.95) baseBruggen(ctx, x, 240 + DNA_BASE.len * S + 10 * S, Y2 - DNA_BASE.len * S - 10 * S, b, S, 1); } });
    const nw = ramp(t, tt[3] + 0.6, 0.5); if (nw > 0.01) { ctx.save(); ctx.globalAlpha *= nw; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(430, Y2 + 10); ctx.lineTo(1390, Y2 + 10); ctx.stroke(); ctx.restore(); }
    const ghost = fade(t, q.at('kopie'), q.at('spiegelbeeld') + 0.6); if (ghost > 0.01) { ctx.save(); ctx.globalAlpha *= ghost; text(ctx, 'A T G C ?', 1640, 760, fTekst(44, 700), C.koraal, 'center'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1520, 745); ctx.lineTo(1760, 745); ctx.stroke(); ctx.restore(); }
    nb(ctx, 'de partner', 'geen kopie', 1600, 520, ramp(t, q.at('partner'), 0.5), 'center', C.goud);
    const u = ramp(t, q.at('hoort'), 0.5); if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u * (1 - ramp(t, q.at('Daar') + 1, 0.5)); baseRingRNA(ctx, 1640, 130, 'U', 1, { s: 1.4 }); kruis(ctx, 1640, 190, 60, 1, C.koraal); meta(ctx, 'u zit alleen in rna', 1640, 330, 'center', C.teal); ctx.restore(); } },

  // ---------------- Hoofdstuk 3
  s15(ctx, t, q) { mic(ctx); const sp = ramp(t, q.at('Twee', 1) - 0.2, 1.4), chr = ramp(t, q.at('dochtercellen') - 1.2, 1.4);
    // twee moleculen (oud donker + nieuw licht) die uit elkaar schuiven, daarna de twee chromatiden van een X
    if (chr < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - chr;
      if (sp < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - sp; dubbelHelix(ctx, 260, 1660, 450, 60, D2.oud, D2.oud, t); ctx.restore(); }
      [-1, 1].forEach((s, k) => { const y = 450 + s * 210 * ease(sp); if (sp <= 0.01) return; ctx.save(); ctx.globalAlpha *= sp;
        dubbelHelix(ctx, 260, 1660, y, 60, k ? D2.nieuw : D2.oud, k ? D2.oud : D2.nieuw, t);
        const pa = ramp(t, q.at('partner') - 0.3, 0.5); ctx.save(); ctx.globalAlpha *= ramp(sp, 0.8, 0.2); text(ctx, 'oud', 1700, y - 4, fTekst(30, 700), D2.oudR, 'left'); text(ctx, 'nieuw', 1700, y + 34, fTekst(30, 700), D2.nieuwR, 'left'); ctx.restore();
        nb(ctx, k ? 'oude streng + nieuwe streng' : 'nieuwe streng + oude streng', null, 960, y + (s < 0 ? -100 : 130), pa, 'center', C.text); ctx.restore(); });
      meta(ctx, 'donker = oude streng · licht = nieuwe streng', 960, 860, 'center', C.text2, sp); ctx.restore(); }
    if (chr > 0.01) { chromatideX(ctx, 960, 450, 420, 0, { a: chr, uiteen: 0 }); nb(ctx, 'twee identieke chromatiden', 'klaar voor twee dochtercellen', 960, 760, chr, 'center'); }
    nb(ctx, 'allebei gelijk aan het origineel', null, 960, 130, fade(t, q.at('Allebei'), q.at('Elke')), 'center', C.goud); },
  s16(ctx, t, q) { sch(ctx); // genoom als lint; teller; kalender
    const x0 = 160, x1 = 1760, y = 380; ctx.strokeStyle = D2.oud; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    meta(ctx, 'al het dna van één set: 3 miljard basenparen', 960, 330, 'center', C.text2, ramp(t, q.at('miljard') - 0.3, 0.5));
    const p1 = ramp(t, q.at('polymerase') - 0.3, 0.6); enzymKluwen(ctx, x0 + 8, y - 4, 26, { a: p1, col: D2.enz });
    nb(ctx, '50 per seconde', 'één polymerase', x0 + 10, y + 90, p1, 'left');
    const kal = ramp(t, q.at('bijna') - 0.2, 0.7); if (kal > 0.01) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('Maar'), 0.5); roundRect(ctx, 760, 500, 400, 280, 16); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = '#8FA0B5'; ctx.fillRect(760, 500, 400, 60);
      text(ctx, (Math.round(lerp(0, 1.9, kal) * 10) / 10).toString().replace('.', ',') + ' jaar', 960, 690, fTitel(84), '#121A26', 'center'); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= ramp(t, q.at('Maar'), 0.5); ctx.fillStyle = D2.nieuw; ctx.fillRect(x0, y - 4, Math.max(2, (x1 - x0) * 0.0005 * kal), 8); ctx.restore(); },
  s17(ctx, t) { sch(ctx); enzymKluwen(ctx, 960, 400, 80, { col: D2.enz }); text(ctx, '50/s', 960, 560, fTitel(72), C.text, 'center'); text(ctx, 'een paar uur?', 960, 680, fTekst(44, 600), C.goud, 'center'); },
  s19(ctx, t, q) { mic(ctx); const tau = clamp(t / 12.5, 0, 1); const R = startSim(ctx, 160, 1420, 430, tau, { seed: 5, genen: ramp(t, q.at('alles'), 0.6), niet: ramp(t, q.at('niet') - 0.3, 0.5) });
    meta(ctx, Math.round(R.frac * 100) + ' % gekopieerd', 1760, 440, 'right', C.grain); meta(ctx, 'na ' + Math.round(tau * 8) + ' uur', 160, 330, 'left', C.text);
    nb(ctx, 'startpunt', 'tienduizenden in al het dna', 860, 640, fade(t, q.at('tienduizenden'), q.at('Vanuit') + 1.5), 'center', C.goud);
    nb(ctx, 'twee vorken per startpunt', null, 860, 640, fade(t, q.at('Vanuit') + 1.5, q.at('Zo')), 'center', C.goud);
    nb(ctx, 'ook stukken zonder gen worden gekopieerd', null, 860, 640, ramp(t, q.at('alles'), 0.5), 'center', C.goud);
    meta(ctx, 'groen = een gen', 160, 540, 'left', C.groen, ramp(t, q.at('alles'), 0.5)); meta(ctx, 'stippellijn = geen gen', 560, 540, 'left', C.text, ramp(t, q.at('niet') - 0.3, 0.5));
    snel(ctx, 'stukje van één chromosoom · niet op schaal'); },
  s20(ctx, t, q) { mic(ctx); chromatideX(ctx, 560, 470, 560, 0, {}); const tl = ramp(t, q.at('telomeer') - 0.3, 0.5);
    const tip = [[466, 262], [654, 262], [466, 812], [654, 812]]; tip.forEach(([x, y]) => { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('uiteinden'), 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 30, 0, 6.283); ctx.stroke(); ctx.restore(); });
    nb(ctx, 'telomeren', 'herhaald, niet-coderend dna', 760, 270, tl, 'left', C.goud);
    const v = ramp(t, q.at('plastic') - 0.4, 0.6); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, 1140, 380, 620, 280, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
      ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1190, 560); ctx.bezierCurveTo(1300, 420, 1430, 640, 1560, 510); ctx.stroke();
      ctx.save(); ctx.translate(1600, 495); ctx.rotate(-0.35); roundRect(ctx, -40, -11, 90, 22, 9); shape(ctx, '#AFC0D0', '#D8E2EC', 1.5); ctx.restore();
      text(ctx, 'zoals het plastic uiteinde van een veter', 1450, 630, fTekst(32, 600), C.text, 'center'); ctx.restore(); } },
  s21(ctx, t, q) { mic(ctx); const fout = ramp(t, q.at('miljard') - 0.4, 0.6), uitz = ramp(t, q.at('mutatie') - 0.6, 1.0);
    if (uitz < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - uitz; const R = polyClose(ctx, 420, t, { poly: 1, past: 0, sluit: 0.5 + 0.5 * Math.sin(t * 3), schuif: 2 + ramp(t, 0.5, 4) * 4, vrij: 0.6 });
      if (fout > 0.01) { const x = 420 + 520 + 2 * 25.5; d2Base(ctx, x, R.yN + 7, Math.PI / 2, 'G', 150 / 2 - 14, 8.5, { rand: C.koraal, a: fout }); }
      nb(ctx, 'bijna altijd goed', null, 1300, 140, ramp(t, q.at('Bijna'), 0.5) * (1 - fout), 'center', C.groen); nb(ctx, 'heel soms een verkeerde', null, 991, 760, fout, 'center', C.koraal); if (fout > 0.01) { ctx.save(); ctx.globalAlpha *= fout; ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(991, 712); ctx.lineTo(991, 640); ctx.stroke(); ctx.restore(); } ctx.restore(); }
    if (uitz > 0.01) { ctx.save(); ctx.globalAlpha *= uitz; for (let i = 0; i < 1600; i++) { const x = 160 + (i % 64) * 25, y = 200 + Math.floor(i / 64) * 22; _bioCirc(ctx, x, y, 4, i === 1013 ? C.koraal : rgba(DNA_BASE.base[d2seq(i)], 0.5)); }
      nb(ctx, 'mutatie', 'een kopieerfout die blijft staan', 160 + (1013 % 64) * 25, 200 + Math.floor(1013 / 64) * 22 - 40, clamp((uitz - 0.75) / 0.25, 0, 1), 'center', C.koraal);
      meta(ctx, 'elke stip staat voor ongeveer 600 000 basenparen · 1 fout op een miljard', 960, 820, 'center', C.text2); ctx.restore(); } },

  // ---------------- Hoofdstuk 4 (vwo)
  s22(ctx, t, q) { const sch2 = t >= q.at('Hoe') - 0.2 ? 1 : 0; // cut naar Schema (C6)
    if (sch2 < 0.999) { mic(ctx); ctx.save(); ctx.globalAlpha *= 1 - sch2; [-1, 1].forEach((s, k) => { const y = 430 + s * 180; const x0 = 330;
        ctx.strokeStyle = k ? D2.nieuw : D2.oud; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y - 30); ctx.lineTo(x0 + 1260, y - 30); ctx.stroke();
        ctx.strokeStyle = k ? D2.oud : D2.nieuw; ctx.beginPath(); ctx.moveTo(x0, y + 30); ctx.lineTo(x0 + 1260, y + 30); ctx.stroke();
        text(ctx, k ? 'nieuw' : 'oud', x0 + 1290, y - 20, fTekst(30, 700), k ? D2.nieuwR : D2.oudR, 'left'); text(ctx, k ? 'oud' : 'nieuw', x0 + 1290, y + 40, fTekst(30, 700), k ? D2.oudR : D2.nieuwR, 'left'); });
      nb(ctx, 'half oud, half nieuw', null, 960, 440, ramp(t, q.at('Half'), 0.5), 'center', C.goud);
      nb(ctx, 'semiconservatief', 'de helft wordt bewaard', 960, 830, ramp(t, q.at('semiconservatief'), 0.5), 'center');
      meta(ctx, 'donker = oude streng · licht = nieuwe streng', 960, 130, 'center', C.text2, ramp(t, 0.5, 0.5)); ctx.restore(); }
    if (sch2 > 0.01) { ctx.save(); ctx.globalAlpha *= sch2; sch(ctx); text(ctx, 'Meselson en Stahl, 1958', 120, 160, fTitel(56), C.text, 'left');
      // kolf met bacteriën: eerst zware stikstof (donker), dan licht
      const zw = ramp(t, q.at('zware'), 0.6), li = ramp(t, q.at('Daarna') - 0.2, 0.8);
      const kolf = (x, kl, a, lab) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 40, 300); ctx.lineTo(x - 40, 420); ctx.lineTo(x - 150, 640); ctx.lineTo(x + 150, 640); ctx.lineTo(x + 40, 420); ctx.lineTo(x + 40, 300); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 92, 520); ctx.lineTo(x - 150, 640); ctx.lineTo(x + 150, 640); ctx.lineTo(x + 92, 520); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.25); ctx.fill();
        for (let i = 0; i < 9; i++) { const bx = x - 80 + (i % 3) * 60 + hash(i) * 20, by = 560 + Math.floor(i / 3) * 24; staafje(ctx, bx, by, 34, hash(i + 3) * 3, kl); } text(ctx, lab, x, 710, fTekst(32, 600), C.text, 'center'); ctx.restore(); };
      kolf(560, zw > 0.5 ? ZW : '#8FA0B5', 1, zw > 0.5 ? 'zware stikstof' : 'E. coli-bacteriën'); kolf(1260, LI, li, 'daarna lichte stikstof'); if (li > 0.01) pijl(ctx, 760, 520, 1060, 520, C.line, li, 3, 14);
      nb(ctx, 'al het DNA zwaar', null, 560, 780, ramp(t, q.at('zwaar.') , 0.5) , 'center', C.text); ctx.restore(); } },
  s23(ctx, t) { sch(ctx); buis(ctx, 960, 230, 440, [[0.85, ZW, 1]], 'start: zwaar'); text(ctx, '?', 1160, 480, fTitel(120), C.goud, 'center'); },
  s25(ctx, t, q) { sch(ctx); const r1 = ramp(t, 0.2, 0.6), r2 = ramp(t, q.at('tweede') - 0.2, 0.6);
    text(ctx, 'Meselson en Stahl, 1958', 120, 150, fTitel(56), C.text, 'left');
    buis(ctx, 360, 230, 420, [[0.85, ZW, 1]], 'start'); buis(ctx, 760, 230, 420, [[0.5, HZ, r1]], 'na 1 ronde', 1); buis(ctx, 1160, 230, 420, [[0.5, HZ, r2], [0.15, LI, r2]], 'na 2 rondes', r2 > 0.01 ? 1 : 0.35);
    [['licht', 0.15], ['tussenin', 0.5], ['zwaar', 0.85]].forEach(([s, p]) => { const by = 230 + 60 + p * 280; ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(300, by); ctx.lineTo(1230, by); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, s, 1250, by + 9, C.text2, 'left', 26); });
    const BY = (p) => 230 + 60 + p * 280, mol = (p, kA, kB, lab, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.translate(0, BY(p) - 36); ctx.scale(1, 0.8); molecuul(ctx, 1460, 0, kA, kB, 1); ctx.restore(); text(ctx, lab, 1520, BY(p) + 10, fTekst(30, 600), C.text, 'left'); ctx.restore(); };
    mol(0.85, ZW, ZW, 'zwaar + zwaar', 1); mol(0.5, ZW, LI, 'oud zwaar + nieuw licht', ramp(t, q.at('oude'), 0.5)); mol(0.15, LI, LI, 'licht + licht', r2);
    haak(ctx, 620, 1300, 770, 'precies wat semiconservatief voorspelt', C.groen, ramp(t, q.at('Precies', 2), 0.5)); },
  s26(ctx, t, q) { mic(ctx); const tB = q.at('zelf') - 1.2, tPr = q.at('primer', 1), tPa = q.at('primase');
    if (t < tB) { // deel 1: antiparallel, 3'-uiteinde, groeirichting
      const sl = ramp(t, q.at('3\'-uiteinde') - 0.3, 0.6), groei = ramp(t, q.at('groeit'), 2.5) * 4;
      const R = polyClose(ctx, 420, t, { poly: 1, past: sl, sluit: sl, schuif: groei, vrij: 0.4 });
      const a5 = ramp(t, q.at('antiparallel'), 0.5); ctx.save(); ctx.globalAlpha *= a5; const xl = 420 + 520 - 22 * 25.5 - 50, xr = 420 + 520 + 18 * 25.5 + 50;
      text(ctx, "5'", xl, R.yN + 14, fTekst(40, 700), D2.nieuwR, 'center'); text(ctx, "3'", xl, R.yM + 14, fTekst(40, 700), C.kernR, 'center'); text(ctx, "5'", xr, R.yM + 14, fTekst(40, 700), C.kernR, 'center'); ctx.restore();
      nb(ctx, "3'-uiteinde", 'hier komt de volgende nucleotide', R.x3 - 40, R.yN - 150, ramp(t, q.at('3\'-uiteinde'), 0.5), 'center', C.goud);
      const gr = ramp(t, q.at('groeit'), 0.5); nb(ctx, "groeit van 5' naar 3'", null, 520, R.yN - 140, gr, 'center', C.goud); if (gr > 0.01) pijl(ctx, 330, R.yN - 90, 710, R.yN - 90, C.goud, gr, 3, 14);
    } else { // deel 2 (harde snede, zelfde look): open matrijs, geen nieuwe streng; polymerase kan niet beginnen → primase legt de primer → polymerase begint aan het 3'-uiteinde van de primer
      const pr = ramp(t, tPr - 0.3, 1.0), naar = ramp(t, tPa + 0.4, 1.0), bouw = ramp(t, tPa + 1.4, 1.6);
      const wacht = (1 - naar) * (260 + 30 * Math.sin(t * 2.2)), R = polyClose(ctx, 420, t, { poly: 1, past: 0, sluit: 0.2 + 0.6 * ease(naar), schuif: -2 + 2 * bouw, van: -6, prim: pr, px: wacht, vrij: 0.5 });
      const xs = 420 + 520 - 6 * 25.5; ctx.save(); ctx.globalAlpha *= pr; text(ctx, "5'", xs - 50, R.yN + 14, fTekst(40, 700), D2.rnaR, 'center'); ctx.restore();
      nb(ctx, 'kan niet zelf beginnen', 'geen 3\'-uiteinde om aan te koppelen', R.x3 + wacht + 40, R.yN - 210, 1 - pr, 'center', C.koraal);
      primase(ctx, xs + 40, R.yN - 110, 52, { a: fade(t, tPr - 0.6, tPa + 1.6) });
      nb(ctx, 'primer', 'kort startstukje van RNA', xs + 40, R.yN - 240, pr, 'center', D2.rnaR); nb(ctx, 'primase', 'maakt de primer', xs - 90, R.yN - 120, fade(t, tPa - 0.1, tPa + 1.6), 'right');
      nb(ctx, 'DNA-polymerase', 'begint aan het 3\'-uiteinde van de primer', R.x3 + 40, R.yM + 170, naar, 'center'); }
    snel(ctx, 'model · vereenvoudigd'); },
  s27(ctx, t, q) { mic(ctx); const T = [0, q.at('ene'), q.at('andere'), q.at('Okazaki'), q.at('Later'), q.at('volgende')];
    // vork loopt in vijf momenten: f van 36 (primers) naar 107 (ligase); camera volgt
    const f = t < T[1] ? lerp(30, 36, ramp(t, 0, T[1])) : t < T[2] ? lerp(36, 58, ramp(t, T[1], T[2] - T[1])) : t < T[3] ? lerp(58, 76, ramp(t, T[2], T[3] - T[2])) : t < T[4] ? lerp(76, 87, ramp(t, T[3], T[4] - T[3])) : lerp(87, 107, ramp(t, T[4], 4.5));
    const pan = clamp((f - 70) * 15, 0, 600); ctx.save(); ctx.translate(-pan, 0);
    const st = Object.assign({}, VST, { f, t, i1: 150, lagA: 1 - 0.8 * ramp(t, T[4] + 1.0, 1.2) }); const M = vork(ctx, st, { hl: { poly: fade(t, T[1], T[4]), ligase: ramp(t, T[4], 0.5) } }); eind53(ctx, M, 1);
    nb(ctx, 'helicase', null, M.E.helicase ? M.E.helicase[0] + 40 : 0, M.E.helicase ? M.E.helicase[1] - 50 : 0, fade(t, 0.2, T[1]), 'left');
    nb(ctx, 'leidende streng', "met de vork mee, van 5' naar 3'", Math.max(M.X(22), pan + 360), M.yTn(22) + 64, ramp(t, q.at('leidende') - 0.2, 0.5), 'center', C.goud);
    if (M.E.polyLag) { const a = fade(t, T[2] + 1, T[3]); nb(ctx, "van de vork af: 5' → 3'", null, M.E.polyLag[0] - 60, M.E.polyLag[1] + 130, a, 'center', C.goud); pijl(ctx, M.E.polyLag[0] + 20, M.E.polyLag[1] + 80, M.E.polyLag[0] - 140, M.E.polyLag[1] + 80, C.goud, a, 3, 14); }
    if (M.E.primase) nb(ctx, 'primase', 'nieuwe primer', M.E.primase[0] + 40, M.E.primase[1] + 60, fade(t, q.at('primase'), T[3]), 'left');
    const ok = fade(t, T[3], T[4] + 1.5); if (ok > 0.01) { M.frags.filter(F => F.primN > 0 && F.k <= 3).forEach(F => haakKort(ctx, M.X(F.q), M.X(F.p), M.yBn((F.q + F.p) / 2) - 40, C.goud, ok)); nb(ctx, 'Okazaki-fragmenten', '100 tot 200 nucleotiden per stuk', Math.max(M.X(40), pan + 420), M.yBn(40) + 110, ok, 'center', C.goud); }
    if (M.E.ligase) { const la = ramp(t, q.at('ligase'), 0.5) * (1 - ramp(t, T[5] - 0.4, 0.4)); nb(ctx, 'ligase', 'plakt de stukken', M.E.ligase[0], M.E.ligase[1] - 120, la, 'center'); if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; ctx.strokeStyle = C.text2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(M.E.ligase[0], M.E.ligase[1] - 90); ctx.lineTo(M.E.ligase[0], M.E.ligase[1] - 30); ctx.stroke(); ctx.restore(); } }
    nb(ctx, 'volgende streng', 'in stukken, van de vork af', Math.max(M.X(18), pan + 360), M.yBn(18) - 60, ramp(t, T[5] - 0.2, 0.5), 'center', C.goud);
    ctx.restore(); snel(ctx, 'schematisch · fragmenten korter dan echt'); },
  s28(ctx, t, q) { sch(ctx); const tRT = q.at('Sommige'), tRep = q.at('fouten');
    const panelen = [[120, 'replicatie', 'DNA-polymerase', 'al het DNA, één keer per celcyclus', -1], [1000, 'transcriptie', 'RNA-polymerase', 'één gen, zo vaak als nodig', q.at('verwarren')]];
    const hoofd = 1 - ramp(t, tRep - 0.3, 0.6);
    panelen.forEach(([x, kop, enz, m, t0], k) => { const a = ramp(t, t0 - 0.4, 0.6) * hoofd; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, x, 200, 800, 560, 16); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); text(ctx, kop, x + 400, 270, fTitel(56), C.text, 'center'); metaText(ctx, m, x + 400, 320, C.grain, 'center', 26);
      ctx.save(); ctx.beginPath(); roundRect(ctx, x + 10, 340, 780, 410, 12); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(x, 340, 800, 420);
      if (k === 0) vork(ctx, { f: 40 + t * 0.6, i0: 0, i1: 60, X0: x + 30, cy: 540, g: 34, dx: 13, Dmax: 110, Lsplit: 8, Ltw: 8, Lf: 18, pl: 3, p1: 16, lead: 3, t, toon: { primase: 0, ligase: 0 } });
      else { const y = 520; dnaDraad(ctx, [[x + 20, y], [x + 780, y]], { w: 30, helix: true, fase: t * 0.05 }); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fillRect(x + 220, y - 30, 360, 60); metaText(ctx, 'één gen', x + 400, y - 48, C.goud, 'center', 26);
        const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([x + 480 - u * 300, y + 70 + Math.sin(u * 8 + t) * 26 + u * 90]); } ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        enzymKluwen(ctx, x + 500, y + 10, 48, { col: '#7A8BA8' }); nb(ctx, 'mRNA', null, x + 150, y + 190, 1, 'left', C.teal); }
      ctx.restore(); nb(ctx, enz, null, x + 400, 720, 1, 'center'); ctx.restore(); });
    const rt = fade(t, tRT, tRep); if (rt > 0.01) { ctx.save(); ctx.globalAlpha *= rt; roundRect(ctx, 560, 790, 800, 90, 14); shape(ctx, rgba(C.bgSchema, 0.97), C.teal, 2);
      text(ctx, 'reverse transcriptase: RNA → DNA', 960, 848, fTekst(38, 700), C.text, 'center'); ctx.restore(); }
    const rp = t >= tRep - 0.2 ? 1 : 0; if (rp > 0.01) { ctx.save(); ctx.globalAlpha *= rp; mic(ctx); const R = polyClose(ctx, 420, t, { poly: 0, vrij: 0.4, schuif: 7, skip: 0 });
      // fout (koraal G tegenover T) → enzym schuift erheen → knipt hem eruit → juiste nucleotide komt erin → groen kader
      const x = 420 + 520, L = 150 / 2 - 14, tV = q.at('vervangen'), loop = ramp(t, q.at('gaan') - 0.2, tV - q.at('gaan') + 0.1), uit = ramp(t, tV, 0.9), inn = ramp(t, tV + 0.9, 1.0), ok = ramp(t, tV + 1.9, 0.4);
      const ex = lerp(1560, x + 20, ease(loop)), ey = R.yN - 120;
      if (uit < 0.999) d2Base(ctx, x, R.yN + 7 - 230 * ease(uit), Math.PI / 2, 'G', L, 8.5, { rand: C.koraal, a: 1 - ramp(uit, 0.6, 0.4) });
      if (inn > 0.01 && inn < 0.999) vrijNucleotide(ctx, lerp(x + 260, x, ease(inn)), lerp(R.yN - 300, R.yN + 2, ease(inn)), d2seq(40), lerp(0.8, Math.PI, ease(inn)), 1.05, { rand: C.goud });
      if (inn >= 0.999) d2Base(ctx, x, R.yN + 7, Math.PI / 2, d2seq(40), L, 8.5, { rand: ok > 0.5 ? C.groen : C.goud });
      enzymKluwen(ctx, ex, ey, 60, { col: '#7A8BA8', sluit: fade(t, tV - 0.1, tV + 1.8, 0.3) });
      nb(ctx, 'DNA-repair-enzym', null, ex + 80, ey - 70, 1, 'left');
      nb(ctx, 'verkeerde nucleotide', 'G past niet tegenover T', x, R.yM + 170, 1 - ramp(t, tV + 0.9, 0.4), 'center', C.koraal);
      nb(ctx, 'vervangen', 'nu A tegenover T', x, R.yM + 170, ok, 'center', C.groen); ctx.restore(); } },

  // ---------------- Samenvatting
  s29(ctx, t, q) { kamerNoor(ctx); const sc = 13, ex = 100, ey = 470; persoon(ctx, 'noor', 1720, 846, 480, { uit: 'blij', t, kijk: -1 });
    onderarm(ctx, ex, ey, sc, { id: 'noor', kijk: 1 }); schaafwond(ctx, ex, ey, sc, { heel: 1, kijk: 1 }); nb(ctx, 'genezen', null, ex + 20 * sc, ey - 120, ramp(t, 0.2, 0.5) * (1 - ramp(t, q.at('Helicase') - 0.5, 0.5)), 'center', C.groen);
    const z = ramp(t, q.at('Helicase') - 0.6, 0.8); vergrootKader(ctx, 50, 380, 640, 560, 1 - ramp(t, q.at('Maar'), 0.6), 1 - z); const sx = ex + 14 * sc, sy = ey - 0.4 * sc;
    const stap = t < q.at('Helicase') ? 0 : t < q.at('DNA-polymerase') ? 1 : t < q.at('ontstaan') ? 2 : t < q.at('tienduizenden') ? 3 : t < q.at('fouten') ? 4 : 5;
    zoomCircle(ctx, 1080, 430, 320, sx, sy, ['', 'helicase opent', 'alleen wat past', 'half oud, half nieuw', 'tienduizenden startpunten', 'heel soms een fout'][stap], z * (1 - ramp(t, q.at('Maar'), 0.6)), () => { mic(ctx);
      ctx.save(); ctx.translate(1080, 430); ctx.scale(0.5, 0.5); ctx.translate(-960, -470);
      if (stap <= 1) { const st = { f: 10 + (t - q.at('Helicase')) * 2.5, i0: -4, i1: 50, X0: 960, cy: 450, g: 52, dx: 13, Dmax: 130, Lsplit: 9, Ltw: 10, Lf: 22, pl: 4, p1: 6, lead: 4, t, toon: { nieuw: 0, poly: 0, primase: 0, ligase: 0 } }; vork(ctx, st); ctx.save(); ctx.translate(1920, 900); ctx.scale(-1, -1); vork(ctx, st); ctx.restore(); }
      else if (stap === 2) polyClose(ctx, 420, t, { poly: 1, past: 1, sluit: 1, vrij: 0.6 });
      else if (stap === 3) { [-1, 1].forEach((s, k) => { const y = 470 + s * 120; ctx.strokeStyle = k ? D2.nieuw : D2.oud; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300, y - 40); ctx.lineTo(1620, y - 40); ctx.stroke(); ctx.strokeStyle = k ? D2.oud : D2.nieuw; ctx.beginPath(); ctx.moveTo(300, y + 40); ctx.lineTo(1620, y + 40); ctx.stroke();
        text(ctx, k ? 'nieuw' : 'oud', 960, y - 62, fTekst(44, 700), k ? D2.nieuwR : D2.oudR, 'center'); text(ctx, k ? 'oud' : 'nieuw', 960, y + 102, fTekst(44, 700), k ? D2.oudR : D2.nieuwR, 'center'); }); }
      else if (stap === 4) startSim(ctx, 200, 1720, 470, clamp((t - q.at('tienduizenden')) / 3, 0, 1), { seed: 5, h: 50 });
      else polyClose(ctx, 420, t, { poly: 1, vrij: 0.3, schuif: 2 });
      ctx.restore(); });
    const vv = ramp(t, q.at('Maar'), 0.6); if (vv > 0.01) { ctx.save(); ctx.globalAlpha *= vv; roundRect(ctx, 560, 140, 800, 110, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 2); text(ctx, 'Volgende: hoe leest een cel haar DNA?', 960, 210, fTekst(44, 700), C.goud, 'center'); ctx.restore(); } }
});
