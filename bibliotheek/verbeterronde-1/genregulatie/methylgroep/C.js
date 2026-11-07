// =====================================================================================
// METHYLGROEP op de promotor (basenniveau; ronde 2: gouden promotorvak om het stuk DNA). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 7):
//  - DNA-methylering = een methylgroep (CH3: één koolstof met drie waterstofatomen) op de C van een CG-paar (CpG) in de
//    promotor; CpG's liggen gespiegeld, dus op beide strengen zit een C die gemethyleerd wordt. Het CH3 steekt uit in de grote
//    groef; hier als bolletje aan de zijkant van de C-base (koraal; C1: rem/uit) met drie witte H's.
//  - een gemethyleerde promotor wordt meestal niet afgelezen: de transcriptiefactor kan niet binden (o.tf: hij komt aan, stuit
//    op de methylgroepen en drijft weg; zonder methylering landt hij). Slotje (o.slot) is een optionele metafoor.
//  - bij de deling (o.deling 0..1) gaan de strengen uit elkaar; elke dochter heeft één oude streng mét methylgroepen en één nieuwe
//    zonder (half gemethyleerd); een enzym zet daarna op de nieuwe streng tegenover elke oude CH3 ook een CH3 (beide dochters
//    gemethyleerd; 'persist through multiple rounds of cell division', OpenStax).
// Bekende fouten: CH3 op een A of T; methylgroepen die bij de deling verdwijnen; methyl als losse stip zonder binding.
// (x, y) = midden van het stuk promotor; s = schaal (± 820 × 260 px bij s = 1, met deling ± 820 × 640). o.m 0..1 (groepen
// verschijnen één voor één), o.tf 0..1, o.deling 0..1, o.slot, o.t. Geeft {sites: [[x, y] …], tf, dochters} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
function methylCH3(ctx, x, y, r, an = -Math.PI / 2, a = 1) { // CH3: koolstof (koraal) met drie waterstofjes, aan een steeltje vanaf (x, y) in richting an
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.koraal, 0.25); ctx.lineWidth = Math.max(1.2, r * 0.32); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * 1.5, 0); [-1.1, 0, 1.1].forEach(q => { ctx.moveTo(r * 1.5, 0); ctx.lineTo(r * 1.5 + Math.cos(q) * r * 1.25, Math.sin(q) * r * 1.25); }); ctx.stroke();
  [-1.1, 0, 1.1].forEach(q => _bioCirc(ctx, r * 1.5 + Math.cos(q) * r * 1.3, Math.sin(q) * r * 1.3, r * 0.42, '#E4E6EA', null)); _bioCirc(ctx, r * 1.5, 0, r * 0.75, C.koraal, lighten(C.koraal, 0.35), 1); ctx.restore(); }
function _mgSlot(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5 * s; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - 14 * s, 12 * s, Math.PI, 0); ctx.lineTo(x + 12 * s, y - 4 * s); ctx.moveTo(x - 12 * s, y - 14 * s); ctx.lineTo(x - 12 * s, y - 4 * s); ctx.stroke();
  roundRect(ctx, x - 18 * s, y - 6 * s, 36 * s, 28 * s, 6 * s); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 1); _bioCirc(ctx, x, y + 8 * s, 3.5 * s, '#121A26'); ctx.restore(); }
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, slot = false, t = 0, seq = 'ACGGTCGACGTA' } = o; if (a <= 0.01) return {};
  const n = seq.length, dx = 68 * s, k = 0.78 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, uit = { sites: [], dochters: [] };
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, cpg = []; for (let i = 0; i < n - 1; i++) if (seq[i] === 'C' && seq[i + 1] === 'G') cpg.push(i);
  const plekken = []; cpg.forEach(i => { plekken.push([i, 0]); plekken.push([i + 1, 1]); }); // [index, streng]: boven de C, onder de C tegenover de G
  ctx.save(); ctx.globalAlpha *= a;
  const ladder = (cy, sterkte, oudBoven, oudOnder, nieuwA, mOud, mNieuw) => { // sterkte = afstand tussen de rails / 2
    roundRect(ctx, x0 - 46 * s, cy - sterkte - 22 * s, (n - 1) * dx + 92 * s, sterkte * 2 + 44 * s, 18 * s); shape(ctx, rgba(C.goud, 0.12), rgba(C.goud, 0.75), 1.5 * Math.max(0.6, s)); // gouden promotorvak (ronde 2)
    const yT = cy - sterkte, yB = cy + sterkte, rail = (yy, oud, al) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = oud ? DNA_BASE.rugR : '#DCD4F5'; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yy); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yy); ctx.stroke(); ctx.strokeStyle = oud ? DNA_BASE.rug : '#B9ACE6'; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
    for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yT + 8 * s, seq[i], 1, { s: k, a: oudBoven ? 1 : nieuwA, plekA: 0 }); baseRing(ctx, xx, yB - 8 * s, comp[seq[i]], -1, { s: k, a: oudOnder ? 1 : nieuwA, plekA: 0 }); }
    rail(yT, oudBoven, oudBoven ? 1 : nieuwA); rail(yB, oudOnder, oudOnder ? 1 : nieuwA);
    plekken.forEach(([i, str], q) => { const xx = x0 + i * dx + 22 * k, yy = str === 0 ? yT + 8 * s + DNA_BASE.len * k * 0.5 : yB - 8 * s - DNA_BASE.len * k * 0.5; const oud = str === 0 ? oudBoven : oudOnder;
      const mm = oud ? mOud(q) : mNieuw; if (mm > 0.01) { methylCH3(ctx, xx, yy + (1 - ease(mm)) * (str === 0 ? -60 : 60) * s, 8 * s, 0, Math.min(1, mm * 1.5)); } uit.sites.push([xx + 24 * s, yy]); }); };
  const mq = (q) => ease(clamp(m * plekken.length - q, 0, 1));
  if (deling < 0.01) { ladder(y, H, true, true, 1, mq, 0);
    if (slot && m > 0.5) _mgSlot(ctx, x0 - 70 * s, y - H - 30 * s, s, (m - 0.5) * 2);
    if (tf > 0.01) { const geblokt = m > 0.5, p = ease(tf), ty = geblokt ? y - H - 130 * s + Math.sin(p * Math.PI) * 50 * s - p * 30 * s : lerp(y - H - 220 * s, y - H - 46 * s, p), tx = x + (geblokt ? p * 60 * s : 0);
      _grKluwen(ctx, tx, ty, (qx, qy) => { const ex = qx / 70, ey = qy / 52; return ex * ex + ey * ey < 1 && !(qy > 30 && Math.abs(qx) < 24); }, { r: 6.5, sc: s, col: '#7A8BA8', seed: 3, bbox: [-72, -54, 72, 54], key: 'mgTF', a: Math.min(1, tf * 2) }); uit.tf = [tx, ty]; } }
  else { const d = ease(clamp(deling / 0.45, 0, 1)), nieuw = ease(clamp((deling - 0.4) / 0.25, 0, 1)), herstel = ease(clamp((deling - 0.7) / 0.3, 0, 1)), off = d * (H * 2 + 70 * s);
    // dochter 1: oude bovenstreng + nieuwe onderstreng; dochter 2: nieuwe bovenstreng + oude onderstreng
    ladder(y - off / 2 * 1.0 - 0, H, true, false, nieuw, mq, herstel); ladder(y + off / 2, H, false, true, nieuw, mq, herstel); uit.dochters = [[x, y - off / 2], [x, y + off / 2]]; }
  ctx.restore(); return uit;
}
