// EIWIT dat vouwt — variant A 'leesbare helix en haarspeld voor elke lengte' (27 okt 2026).
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): een eiwit is een keten van aminozuren (kralen) die
// vouwt. Secundaire structuur: α-helix = strakke spiraal (waterstofbrug tussen elk 1e en 4e aminozuur, ± 3,6
// per winding; per aminozuur 0,15 nm langs de as tegen 0,34 nm in een gestrekte streng, dus helixkralen
// liggen ± 2,3× dichter op elkaar); β-plaat = twee gestrekte strengen naast elkaar, tegengesteld gericht, met
// waterstofbruggen (stippellijntjes) ertussen; daarna de hele keten compact (tertiaire structuur). Vouwen is
// een morph (fold 0 → 1): eerst de helices, dan de haarspeld en de rest.
// Diepte in de helix: kralen achter de as kleiner en donkerder, de keten wordt per stukje voor/achter
// getekend, zodat de spiraal als schroef leest. De doelvorm schaalt naar elk aantal kralen n (≥ 12):
// helix 1 ± 28 %, lus, streng ± 15 %, bocht, streng ± 15 %, lus, helix 2 ± 22 %, staart.
// Kleur: standaard de voedingstaal (V.ew-kralen per soort, `kinds`); o.kleur = 'eiwit' geeft één kraalvorm in
// enzymtinten (C.enzym), zodat het gevouwen eiwit op de enzymen van de bank lijkt.
// Bekende fouten: een bol; een open warboel zonder herkenbare helix of haarspeld; helix als zigzag.
// Aanroep zoals voorheen: eiwitVouw(ctx, cx, cy, s, fold, kinds, {a, r, start, ess, t}); nieuw: kleur.
// Geeft de kraalposities terug ([x, y, z]).
function _eiwitVormA(n, s, r) {
  const st = r * 2.1 / s, hr = st * 0.5, hR = st * 0.78;   // stap streng, stap helix (as), straal helix (ontwerpeenheden)
  const nh1 = Math.max(4, Math.round(n * 0.28)), nl1 = Math.max(2, Math.round(n * 0.07)), ns = Math.max(3, Math.round(n * 0.15)), nt = 2, nl2 = Math.max(2, Math.round(n * 0.07));
  const nh2 = Math.max(3, Math.round(n * 0.22)); const nst = Math.max(0, n - (nh1 + nl1 + ns * 2 + nt + nl2 + nh2));
  const Ls = (ns - 1) * st, L1 = nh1 * hr, L2 = nh2 * hr; const out = [];
  const lijn = (p, q, k, soort) => { for (let i = 0; i < k; i++) { const u = k === 1 ? 0 : i / (k - 1); out.push([lerp(p[0], q[0], u), lerp(p[1], q[1], u) + (soort === 's' ? (i % 2 ? 3 : -3) : 0), 0, soort]); } };
  const helix = (p, q, k) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L; const hp = (i) => { const ph = i / 3.6 * 6.283, u = (i + 0.5) / k; const ax = L * u + Math.cos(ph) * hR * 0.55; return [p[0] + ux * ax - uy * Math.sin(ph) * hR, p[1] + uy * ax + ux * Math.sin(ph) * hR, Math.cos(ph), 'h']; };
    for (let i = 0; i < k; i++) { out.push(hp(i)); if (i < k - 1) for (const f of [0.25, 0.5, 0.75]) { const m = hp(i + f); m[3] = 'm'; out.push(m); } } };
  const lus = (pts, k) => { const D = bioDicht(pts, 40); const len = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); len.push(acc); });
    for (let i = 1; i <= k; i++) { const tgt = acc * i / (k + 1); let j = len.findIndex(l => l >= tgt); j = Math.max(1, j); const f = (tgt - len[j - 1]) / ((len[j] - len[j - 1]) || 1); out.push([lerp(D[j - 1][0], D[j][0], f), lerp(D[j - 1][1], D[j][1], f), 0, 'l']); } };
  const yS1 = 10, yS2 = 10 + st * 1.75, yH1 = yS1 - st * 2.5, yH2 = yS2 + st * 2.4;
  const h1a = [-Math.max(L1, Ls) / 2 - st, yH1], h1b = [h1a[0] + L1, yH1];
  helix(h1a, h1b, nh1);
  const s1a = [Ls / 2, yS1], s1b = [-Ls / 2, yS1];
  lus([h1b, [Math.max(h1b[0], Ls / 2) + st * 1.2, (yH1 + yS1) / 2], [s1a[0] + st * 0.9, yS1]], nl1);
  lijn(s1a, s1b, ns, 's');
  lus([s1b, [s1b[0] - st * 1.0, (yS1 + yS2) / 2], [s1b[0], yS2]], nt);
  const s2a = [-Ls / 2, yS2], s2b = [Ls / 2, yS2]; lijn(s2a, s2b, ns, 's');
  const h2a = [Ls / 2 + st * 0.4, yH2], h2b = [h2a[0] - L2, yH2];
  lus([s2b, [s2b[0] + st * 1.3, (yS2 + yH2) / 2], [h2a[0] + st * 0.6, yH2]], nl2);
  helix(h2a, h2b, nh2);
  let q = out[out.length - 1]; for (let i = 0; i < nst; i++) { const an = Math.PI + 0.9 * (i + 1) / Math.max(1, nst); out.push([q[0] + Math.cos(an) * st * (i + 1) * 0.8, q[1] - Math.sin(an) * st * (i + 1) * 0.5 - st * 0.4 * (i + 1), 0, 'l']); }
  const bo = out.filter(p => p[3] !== 'm'); const mx = bo.reduce((m, p) => m + p[0], 0) / bo.length, my = bo.reduce((m, p) => m + p[1], 0) / bo.length;
  const s1i = nh1 + nl1, s2i = s1i + ns + nt; const alle = []; let nb = 0;
  for (const p of out) { if (p[3] !== 'm') { if (nb >= n) break; nb++; } alle.push([(p[0] - mx) * s, (p[1] - my) * s, p[2], p[3]]); }
  return { alle, bruggen: Array.from({ length: ns }, (_, j) => [s1i + j, s2i + ns - 1 - j]) };
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0, kleur = null } = o; if (a <= 0.01) return; const n = kinds.length;
  const { alle, bruggen } = _eiwitVormA(n, s, r);
  const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  // per punt: kraalindex (of tussenpunt met de twee buren), begin- en doelpositie
  const P = []; let bi = -1; alle.forEach((d, j) => { if (d[3] !== 'm') { bi++; P.push({ d, b: begin[bi], k: bi }); } else { const f = (j - alle.slice(0, j).map(x => x[3] !== 'm').lastIndexOf(true)) * 0; P.push({ d, b: null, k: -1, na: bi }); } });
  P.forEach((p, j) => { if (p.b) return; let v = j, w = j; while (v > 0 && !P[v].b) v--; while (w < P.length - 1 && !P[w].b) w++; const f = (j - v) / ((w - v) || 1); p.b = [lerp(P[v].b[0], P[w].b[0], f), lerp(P[v].b[1], P[w].b[1], f)]; p.ki = P[v].k; });
  const Q = P.map((p, j) => { const ki = p.k >= 0 ? p.k : p.ki; const seg = p.d[3] === 'h' || p.d[3] === 'm' ? 0 : 0.3; const f = ease(clamp((fold - seg) / (1 - seg), 0, 1)); const w = wander(ki + 900, t, r * 0.12, 0.6);
    return [cx + lerp(p.b[0], p.d[0], f) + w.x, cy + lerp(p.b[1], p.d[1], f) + w.y, (p.d[2] || 0) * f, p.k, p.d[3]]; });
  const pts = Q.filter(q => q[3] >= 0);
  const eiwit = kleur === 'eiwit'; const kc = eiwit ? C.enzym : V.ew; const lijnCol = eiwit ? _mixHex(C.enzym, '#FFFFFF', 0.35) : _mixHex(V.ew, '#FFFFFF', 0.4);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // waterstofbruggen tussen de twee strengen van de haarspeld
  if (fold > 0.8) { ctx.save(); ctx.globalAlpha *= (fold - 0.8) / 0.2; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.setLineDash([r * 0.3, r * 0.3]);
    bruggen.forEach(([i, j]) => { const p = pts[i], q = pts[j]; if (p && q) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }); ctx.setLineDash([]); ctx.restore(); }
  // keten en kralen in diepte-volgorde
  const items = []; Q.forEach((p, i) => { if (p[3] >= 0) items.push({ z: p[2], i }); if (i) items.push({ z: Math.min(p[2], Q[i - 1][2]) - 0.02, l: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = Q[it.l], q = Q[it.l - 1]; const z = (it.z + 1) / 2; ctx.strokeStyle = rgba(lijnCol, 0.45 + 0.5 * z); ctx.lineWidth = Math.max(1.5, r * (p[4] === 'h' || p[4] === 'm' ? 0.3 + 0.35 * z : 0.3)); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
    const p = Q[it.i], z = (p[2] + 1) / 2, rr = r * (p[4] === 'h' ? 0.42 + 0.2 * z : 0.85);
    if (eiwit) { ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, _mixHex(_mixHex(kc, '#1A2740', 0.4), kc, 0.25 + 0.75 * z), _mixHex(kc, '#FFFFFF', 0.35), Math.max(1, r * 0.1)); }
    else { ctx.save(); ctx.globalAlpha *= 0.65 + 0.35 * z; bead(ctx, p[0], p[1], rr, kinds[p[3]], { ess }); ctx.restore(); } });
  ctx.restore(); return pts;
}
