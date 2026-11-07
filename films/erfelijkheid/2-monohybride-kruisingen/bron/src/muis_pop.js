// Muizenpop uit bibliotheek/dieren/lib_dieren.js (r. 2216–2593 HondPop + r. 2888–2950 MUIS_DEF), 28 okt 2026 — alleen wat Erfelijkheid 2 nodig heeft.
// ===== pop_honden.js =====
// Hondachtigen (+ zeehond en muis) als uitknippop, 23 okt 2026 — POPFAMILIE.md, familie honden
// Rig-code = kopie van de katten-rig (KatPop.maak, die zelf uit wolf_pop.js komt): zachte huid, rand in twee passes, 2-bots-IK, gangmodel met vaste steunvoet.
// Per ras eigen gewrichtspunten (botlengtes), delen, kleuren en houdingen; gangen: 'lopen' (laterale stap) en 'draven' (diagonale draf).
// Gewrichtspunten en delen in px op referentie/pop/honden/stijl.png (vlakke stijl), K = px per cm uit de schofthoogte; 'krimp' drukt het lijf in x samen
// waar de AI-plaat langer is dan de rasstandaard (FCI). Eenheid = cm, y omlaag, grond y = 0; anker = midden tussen schouder en heup.
// Wrappers onderaan: hond(ctx, ras, x, y, s, o) (s = px per cm, zoals dieren_zoog.js), zeehond(ctx, x, y, s, o), muis(ctx, x, y, s, o).
// Laad dit bestand ná dieren_zoog.js (en eventueel na wolf_pop.js); het overschrijft hond, zeehond en muis.

const HondPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const lin = (a, b, u) => a + (b - a) * u;
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  // sleutelkromme [[u, waarde], ...] met zachte overgangen; per = periodiek (u modulo 1, laatste = eerste)
  const kurve = (K, u) => { u = Math.max(K[0][0], Math.min(K[K.length - 1][0], u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  let STAP = 0.7; // bemonsteringsstap van de vormen (cm); per dier D.stap (kleine dieren fijner)
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function spline(P) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / STAP));
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u; const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); } }
    return out; }
  function openLijn(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / STAP));
      for (let k = 0; k <= st; k++) { const u = k / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function binnen(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  // vlek: onregelmatige ronde vorm (cm)
  function vlekVorm(c, r, seed, rek = 1, hoek = 0) { const P = []; const n = 7; for (let i = 0; i < n; i++) { const a = i / n * 6.283; const rr = r * (0.78 + 0.4 * hsh(seed * 7.1 + i * 1.7));
      P.push(add(c, rot([Math.cos(a) * rr * rek, Math.sin(a) * rr], hoek))); } return spline(P); }
  // band (streep) langs een middenlijn met breedte die taps afloopt: lijn = [[x,y],...] (cm), w0 -> w1
  function streep(lijn, w0, w1) { const L = openLijn(lijn); const n = L.length; if (n < 2) return null; const l = [], r = [];
    for (let i = 0; i < n; i++) { const a = L[Math.max(0, i - 1)], b = L[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = i / (n - 1), w = lin(w0, w1, u) * Math.sin(Math.PI * Math.min(1, 0.15 + u * 0.85)) ** 0.35;
      l.push(add(L[i], mul(nn, w))); r.push(sub(L[i], mul(nn, w))); } return l.concat(r.reverse()); }

  // ---------- generieke botten ----------
  const POOTB = (z) => [['scap' + z, 'rompV', 'schoft', 'schouder'], ['hum' + z, 'scap' + z, 'schouder', 'elleboog'], ['rad' + z, 'hum' + z, 'elleboog', 'pols'], ['mc' + z, 'rad' + z, 'pols', 'vkogel'], ['vp' + z, 'mc' + z, 'vkogel', 'vteen'],
    ['dij' + z, 'rompA', 'heup', 'knie'], ['schn' + z, 'dij' + z, 'knie', 'hak'], ['mt' + z, 'schn' + z, 'hak', 'akogel'], ['ap' + z, 'mt' + z, 'akogel', 'ateen']];
  const BOTEN = [['rompV', null, 'midrug', 'nekBasis'], ['rompM', null, 'midrug', 'lend'], ['rompA', 'rompM', 'lend', 'kruis'],
    ['nek', 'rompV', 'nekBasis', 'kop'], ['kop', 'nek', 'kop', 'neus'], ['kaak', 'kop', 'kaak', 'kin'], ...POOTB(''), ...POOTB('F'),
    ['st0', 'rompA', 'staart0', 'staart1'], ['st1', 'st0', 'staart1', 'staart2'], ['st2', 'st1', 'staart2', 'staart3'], ['st3', 'st2', 'staart3', 'staart4']];
  const ROMPNAMEN = ['rompV', 'rompM', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2', 'st3'];
  const LEGS = ['A', 'AF', 'V', 'VF'];

  function maak(D) {
    STAP = D.stap || 0.7; const K = D.K, X0 = D.X0, G0 = D.G0; const kr = D.krimp; // krimp = [xa, xb, f]: lijf tussen xa en xb (plaat-px) in x samendrukken (AI-platen zijn te lang; rasstandaard wint)
    const wx = (x) => { if (!kr) return x; const d = (kr[1] - kr[0]) * (1 - kr[2]); return x <= kr[0] ? x + d / 2 : x >= kr[1] ? x - d / 2 : kr[0] + d / 2 + (x - kr[0]) * kr[2]; };
    const cm = (p) => [(wx(p[0]) - wx(X0)) / K, (p[1] - G0) / K]; D.HOUDING.rust = D.HOUDING.rust || {};
    const J = {}; for (const k in D.J) J[k] = cm(D.J[k]); if (D.anker == null) D.anker = (J.schouder[0] + J.heup[0]) / 2; // anker = midden tussen schouder en heup (midden onder het dier)
    const BOT = {}, ORDE = [];
    for (const [n, par, j0, j1] of BOTEN) { const v = sub(J[j1], J[j0]); BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: J[j0] }; ORDE.push(n); }
    for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
    const ROOT0 = J.midrug;
    const PAL = Object.assign({ neus: '#2A2220', klauw: '#2A2420', mond: '#3A2622', tong: '#B86A64', vlek: '#2A221E' }, D.PAL);
    const PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.3, D.verKleur || '#3E3A36');
    const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');

    // ---- delen opbouwen (cm, ruststand) ----
    const PREP = {}; let seed = D.seed || 1;
    // haarpieken langs de omtrek (manen): tand = [hoogte cm, golflengte cm, alleen waar f(p) waar is]
    function tanden(P, [amp, w, f]) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
      let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
        if (f && !f(p)) return p; const ww = w * (0.8 + 0.4 * hsh(Math.floor(sc / w) * 3.3)), ph = fr(sc / ww), h = amp * (0.6 + 0.6 * hsh(Math.floor(sc / ww) * 7.7)) * (ph < 0.75 ? Math.pow(ph / 0.75, 1.4) : (1 - ph) / 0.25); return add(p, mul(nn, h)); }); }
    const laag = (l) => { if (l.veeg) return { c: l.c, pts: streep(l.p.map(cm), l.veeg[0], l.veeg[1]) }; if (l.lijn) return { c: l.c, lijn: l.lijn, pts: openLijn(l.p.map(cm)) }; let P = spline(l.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; })); if (l.tand) P = tanden(P, l.tand); return { c: l.c, pts: P }; };
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, lagen: d.lagen.map(laag) }; }
    // poten uit profielen: [[u, voor, achter], ...] in cm langs het bot (voor = kant naar +x bij een bot dat omlaag wijst)
    function profiel(bn, prof) { const b = BOT[bn], d = dir(b.A0), s = [d[1], -d[0]]; const V = [], A = [];
      const dk = (bn.startsWith('rad') || bn.startsWith('mc') || bn.startsWith('vp') ? D.dikV : D.dikA) || D.dik || 1; for (const [u, wv, wa] of prof) { const p = add(b.J0, mul(d, b.L * u)); V.push(add(p, mul(s, wv * dk))); A.push(sub(p, mul(s, wa * dk))); }
      return spline(V.concat(A.reverse())); }
    for (const k in D.POOT) { const P = D.POOT[k]; const lagen = [{ c: P.c || 'basis', pts: profiel(P.bot || k, P.prof) }];
      for (const ex of (P.lagen || [])) lagen.push(ex.prof ? { c: ex.c, pts: profiel(P.bot || k, ex.prof) } : laag(ex));
      PREP[k] = { bot: P.bot || k, voet: P.voet, lagen }; }
    // staart als buis langs de keten met breedtes per knoop
    if (D.STAART) { const keten = ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j]); const W = D.STAART.w; const L = [], R = [];
      const lijn = openLijn(keten); const cum = [0]; for (let i = 1; i < lijn.length; i++) cum.push(cum[i - 1] + len(sub(lijn[i], lijn[i - 1]))); const tot = cum[cum.length - 1];
      const wAt = (u) => { const x = u * (W.length - 1), i = Math.min(W.length - 2, Math.floor(x)); return lin(W[i], W[i + 1], x - i); };
      for (let i = 0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const w = wAt(cum[i] / tot);
        L.push(add(lijn[i], mul(nn, w))); R.push(sub(lijn[i], mul(nn, w))); }
      const e = lijn[lijn.length - 1], e2 = lijn[lijn.length - 4], te = sub(e, e2), tel = len(te); const tip = add(e, mul(te, W[W.length - 1] * 0.9 / tel));
      let basis = L.concat([tip], R.reverse()); if (D.STAART.tand) basis = tanden(basis, D.STAART.tand);
      const lagen = [{ c: D.STAART.c || 'basis', pts: basis }];
      const bandOp = (u, bw, c) => { const s0 = Math.max(0, u - bw / tot / 2) * tot, s1 = Math.min(1, u + bw / tot / 2) * tot; const idx = (s) => { let i = 0; while (i < cum.length - 1 && cum[i] < s) i++; return i; };
        const i0 = idx(s0), i1 = idx(s1); const P = []; for (let i = i0; i <= i1; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(add(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        for (let i = i1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        if (u + bw / tot / 2 >= 1) P.splice(i1 - i0 + 1, 0, add(tip, mul(te, 3 / tel))); return { c, pts: P }; };
      for (const [u, bw, c] of (D.STAART.banden || [])) lagen.push(bandOp(u, bw, c));
      if (D.STAART.onder) { const P = []; for (let i = 0; i < lijn.length; i++) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 0.25))); }
        for (let i = lijn.length - 1; i >= 0; i--) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 1.5))); }
        lagen.splice(1, 0, { c: D.STAART.onderC || 'licht', pts: P }); }
      if (D.STAART.kwast) { const [u0, c] = D.STAART.kwast; const s0 = u0 * tot; let i0 = 0; while (i0 < cum.length - 1 && cum[i0] < s0) i0++; const P = []; const kw = D.STAART.kwastW || 3.2;
        for (let i = i0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(add(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        P.push(add(tip, mul(te, kw * 0.7 / tel)));
        for (let i = lijn.length - 1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(sub(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        PREP.kwast = { skin: 'staart', lagen: [{ c, pts: spline(P.filter((_, i) => i % 3 === 0)) }] }; }
      PREP.staart = { skin: 'staart', lagen }; }
    // tekening: vlekken / strepen per deel (in ruststand, daarna meegebogen door dezelfde huid)
    if (D.TEKENING) D.TEKENING({ PREP, J, cm, vlekVorm, streep, binnen, hsh, BOT });

    // ---- gewichten (zachte huid) ----
    function projectie(v, keten) { let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
    const xr = ROOT0[0], xl = J.lend[0], xk = J.kruis[0], xn = J.nekBasis[0];
    const GEW = {
      romp: (v) => { const x = v[0]; const wV = sstep((x - (xr - 0.35 * (xr - xl))) / (0.35 * (xr - xl) + 0.45 * (xn - xr)));
        const wA = sstep(((xl + 0.25 * (xr - xl)) - x) / (0.25 * (xr - xl) + 0.6 * (xl - xk))); const wM = Math.max(0, 1 - wV - wA); const s = wV + wA + wM; return [['rompV', wV / s], ['rompM', wM / s], ['rompA', wA / s]]; },
      nek: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.3) / 1.0), wk = sstep((u - 0.7) / 0.4); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      manen: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.5) / 1.1), wk = sstep((u - 0.55) / 0.6); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      dij: (v) => { const u = projectie(v, [J.heup, J.knie]); const w = sstep((u - 0.15) / 0.8); return [['rompA', 1 - w], ['dij', w]]; },
      hum: (v) => { const u = projectie(v, [J.schoft, J.schouder, J.elleboog]); const w = sstep((u - 0.75) / 0.7); const wr = 1 - sstep((u + 0.1) / 0.6); return [['rompV', wr * 0.6], ['scap', Math.max(0, 1 - w - wr * 0.6)], ['hum', w]]; },
      staart: (v) => { const u = projectie(v, ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j])); const c = [['rompA', -0.4], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5], ['st3', 3.5]];
        let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 3.5) w = [['st3', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
    };
    for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { if (l.mid) l.wm = GEW[p.skin](l.mid).filter(([, x]) => x > 1e-4); else l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

    // ---- kinematica ----
    function fk(R, A) { const piv = {}; for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; } return piv; }
    const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
    function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
      dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
      const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek]; }
    const RESTA = {}; for (const n of ORDE) RESTA[n] = BOT[n].A0;
    // voeten = { L: {teen, meta, poot} } (graden) -> hoeken via IK; scapZwaai graden
    function zetBenen(R, A, voeten, scapZwaai = {}) { let piv = fk(R, A); const rek = {};
      for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', z = L.length > 1 ? 'F' : ''; const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
        const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
        if (voor) { A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
          const [a1, a2, r] = ik(eind(piv, A, 'scap' + z), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + z] = a1; A['rad' + z] = a2; rek[L] = r; }
        else { A['dij' + z] = A.rompA; piv = fk(R, A); const [a1, a2, r] = ik(piv['dij' + z], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + z] = a1; A['schn' + z] = a2; rek[L] = r; }
        A[nM + z] = v.meta * RAD; A[nP + z] = v.poot * RAD; v.kogel = kogel; }
      return rek; }
    const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } };
    // rompA wordt (zoals de andere romphoeken) in wereldgraden opgegeven
    function lichaam(spec) { const A = Object.assign({}, RESTA); for (const n in (spec.A || {})) A[n] = spec.A[n] * RAD; if (spec.A && spec.A.kop != null && spec.A.kaak == null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return A; }
    // rust-teenposities (ruststand = gemeten plaat)
    const RP = fk(ROOT0, RESTA); const TEEN0 = { V: eind(RP, RESTA, 'vp'), VF: eind(RP, RESTA, 'vpF'), A: eind(RP, RESTA, 'ap'), AF: eind(RP, RESTA, 'apF') };

    // ---- houdingen (specs per dier) ----
    const RUSTVOET = (L) => { const z = L.length > 1 ? 'F' : '', voor = L[0] === 'V'; return [TEEN0[L][0], TEEN0[L][1], BOT[(voor ? 'mc' : 'mt') + z].A0 / RAD, BOT[(voor ? 'vp' : 'ap') + z].A0 / RAD]; };
    // auto-houding: voeten recht onder schouder/heup (+dx), romphoogte zo dat de poten 'rek' gestrekt zijn (bisectie)
    const AUTO = {};
    function autoStaan(h, S) { if (AUTO[h]) return AUTO[h]; const A0 = lichaam(S), au = S.auto, ty = au.ty ?? -1;
      const probeer = (y) => { const A = Object.assign({}, A0), R = [ROOT0[0], y]; const piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const vt = { V: [sch[0] + au.V, ty, au.meta ? au.meta[0] : 80, au.poot ? au.poot[0] : 20], A: [hp[0] + au.A, ty, au.meta ? au.meta[1] : 86, au.poot ? au.poot[1] : 22] };
        const voeten = {}; for (const L of LEGS) { const v = vt[L[0]]; voeten[L] = { teen: [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1]], meta: v[2], poot: v[3] }; }
        const rek = zetBenen(R, A, voeten); return { rek: Math.max(rek.V, rek.A), vt }; };
      let lo = -400, hi = 0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (probeer(m).rek > au.rek) lo = m; else hi = m; }
      const { vt } = probeer(hi); const voet = {}; for (const L of LEGS) { const v = vt[L[0]]; voet[L] = [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1], v[2], v[3]]; }
      return (AUTO[h] = { R: [0, hi], voet }); }
    function geschaald(S) { if (!S.schaal) return S; const [B, f] = S.schaal; const R = B.R ? [B.R[0] * f, B.R[1] * f] : null; const voet = {}; for (const L in B.voet) { const v = B.voet[L]; voet[L] = [v[0] * f, v[1] * f, v[2], v[3]]; }
      return Object.assign({}, B, { R, voet, A: Object.assign({}, B.A, S.A || {}) }); }
    // auto-zit: heup op hoogte 'heup' boven de grond, romp zo rechtop als de voorpoten toelaten (rompV van rv[0] naar rv[1])
    function autoZit(h, S) { if (AUTO[h]) return AUTO[h]; const au = S.autoZit, ty = au.ty ?? -1; let best = null;
      for (let rv = au.rv[0]; rv <= au.rv[1]; rv += 2) { const d = rv - au.rv[0]; const A = lichaam({ A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) });
        let piv = fk([ROOT0[0], 0], A); const y = -au.heup - piv.dij[1]; const R = [ROOT0[0], y]; piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const voeten = {}; for (const L of LEGS) { const voor = L[0] === 'V', ver = L.length > 1 ? au.ver[L[0]] : 0; voeten[L] = { teen: [(voor ? sch[0] + au.V : hp[0] + au.A) + ver, ty], meta: au.meta[voor ? 0 : 1], poot: au.poot[voor ? 0 : 1] }; }
        const A2 = Object.assign({}, A); const rek = zetBenen(R, A2, voeten); best = { R: [0, y], voet: Object.fromEntries(LEGS.map(L => [L, [voeten[L].teen[0], ty, voeten[L].meta, voeten[L].poot]])), A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) };
        if (rek.V <= 0.985) break; }
      return (AUTO[h] = best); }
    function houding(h, o = {}) { let S = geschaald(D.HOUDING[h] || D.HOUDING.staan); if (S.autoZit) S = Object.assign({}, S, autoZit(h, S)); if (S.auto) S = Object.assign({}, S, autoStaan(h, S)); const A = lichaam(S); const R = S.R ? [ROOT0[0] + (S.R[0] || 0), S.R[1]] : ROOT0.slice();
      if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
      if (S.adem && o.t != null) { const w = Math.sin(2 * Math.PI * o.t); A.st2 += 4 * RAD * w; A.st3 += 7 * RAD * Math.sin(2 * Math.PI * o.t - 0.7); }
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + (o.bek || 0);
      const voeten = {}; for (const L of LEGS) { let v = S.voet ? (S.voet[L] || S.voet[L[0]]) : RUSTVOET(L); if (!S.voet && S.ver && L.length > 1) v = [v[0] + S.ver[L[0]], v[1], v[2], v[3]]; voeten[L] = { teen: [v[0], v[1]], meta: v[2], poot: v[3], steun: true }; }
      const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, zit: !!S.zit, volgorde: S.volgorde }; }

    // ---- gangen ----
    // stap: laterale volgorde, teen staat stil in de steunfase, zwaai met Hermite, IK
    function stap(G, t) {
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.romp || {}) })); // G.romp = wereldhoeken van romp/nek/kop/staart in deze gang (G.A = sleutelkrommen achterpoot)
      const w2 = Math.sin(4 * Math.PI * (t - (G.bobFase || 0.06)));
      const R = [ROOT0[0], (G.Ry ?? ((H.R ? H.R[1] : ROOT0[1]) + (G.dy || 0))) + (G.bob || 0.6) * Math.cos(4 * Math.PI * (t - 0.06))];
      A.rompV += (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompA -= (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompM -= 0.4 * (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t);
      A.nek += (G.knik || 2) * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= (G.knik || 2) * 0.7 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
      const sz = G.staartZwaai || [3, 5, 7, 9]; for (let i = 0; i < 4; i++) A['st' + i] += sz[i] * RAD * Math.sin(2 * Math.PI * (t - 0.2 - i * 0.12));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
      const half = G.S * G.beta / 2, voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', p = fr(t - G.fase[L]), steun = p < G.beta; const v0 = H.voet ? (H.voet[k] || H.voet[L]) : RUSTVOET(k); // verre poot loopt in hetzelfde spoor (geen standverschil)
        const nx = v0[0] + G.nx[k], ty0 = v0[1]; let tx, ty, u;
        if (steun) { u = p / G.beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; tx = hermite(nx - half, nx + half, m, m, u); ty = ty0 - G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        if (voor) scap[L] = (G.scap || 8) * (tx - nx) / half; }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten }; }
    // galop (niet gebruikt bij honden; blijft voor hergebruik): roterende galop met gebogen (gathered) en gestrekte (extended) zweeffase; romp buigt via rompM/rompA
    function galopRomp(G, t) { const flex = kurve(G.flex, fr(t)); // 0 = gestrekt, 1 = gebogen
      const A = lichaam({ A: G.gestrekt }), A1 = lichaam({ A: G.gebogen }); mixA(A, A1, flex, ROMPNAMEN);
      for (let i = 0; i < 4; i++) A['st' + i] += (G.staartZwaai[i] || 0) * RAD * Math.sin(2 * Math.PI * (t - 0.15 - i * 0.1));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return { A, R: [ROOT0[0], kurve(G.Ry, fr(t))], flex }; }
    const galopZwaai = (G, L, t) => { const beta = G.beta[L[0] === 'V' ? 'V' : 'A'], p = fr(t - G.fase[L]); return G.scap * (p < beta ? (1 - 2 * p / beta) : kurve([[0, -1], [0.5, 0.2], [1, 1]], (p - beta) / (1 - beta))); };
    function galopGewricht(G, t, L) { const { A, R } = galopRomp(G, t), voor = L[0] === 'V', z = L.length > 1 ? 'F' : '';
      if (voor) A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - galopZwaai(G, L, t) * RAD; else A['dij' + z] = A.rompA; const piv = fk(R, A); return voor ? eind(piv, A, 'scap' + z) : piv['dij' + z]; }
    function galop(G, t) {
      const { A, R, flex } = galopRomp(G, t);
      const voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', beta = G.beta[k], p = fr(t - G.fase[L]), steun = p < beta; const half = G.S * beta / 2;
        const nx = G.nx[k], ty0 = G.ty[k]; let tx, ty, u;
        if (steun) { u = p / beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { // zwaai in het assenstelsel van heup/schouder (poolcoördinaten), aansluitend op de steunpunten bij loslaten en neerzetten
          u = (p - beta) / (1 - beta); const t0 = t - p, tLO = t0 + beta, tTD = t0 + 1;
          const hLO = galopGewricht(G, tLO, L), hTD = galopGewricht(G, tTD, L), h = galopGewricht(G, t, L);
          const rLO = sub([nx - half, ty0], hLO), rTD = sub([nx + half, ty0], hTD); const aLO = ang(rLO), aTD = ang(rTD);
          const a = hermite(aLO, aTD, G.am0[k] * (aTD - aLO), G.am1[k] * (aTD - aLO), u), l = lin(len(rLO), len(rTD), u) - kurve(G.fold[k], u);
          const q = add(h, mul(dir(a), l)); tx = q[0]; ty = Math.min(ty0, q[1]); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        scap[L] = galopZwaai(G, L, t); }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, flex }; }
    const GANGEN = {}; if (D.LOPEN) GANGEN.lopen = (t) => stap(D.LOPEN, t); if (D.DRAF) GANGEN.draven = (t) => stap(D.DRAF, t);
    const SNELHEID = { lopen: D.LOPEN ? D.LOPEN.S : 0, draven: D.DRAF ? D.DRAF.S : 0 };
    function stand(o) { if (o.stand) return o.stand; const h = o.houding || 'staan';
      if (GANGEN[h]) { const st = GANGEN[h](fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
      return houding(h, o); }

    // ---- tekenen ----
    function tekenDeel(ctx, k, M, ver, piv, A, modus) {
      const Dl = PREP[k]; if (!Dl) return; const pal = ver ? PALF : PAL;
      const tr = Dl.skin ? (l) => { if (l.wm) { let x = 0, y = 0; for (const [b, w] of l.wm) { const q = M[b](l.mid); x += q[0] * w; y += q[1] * w; } const dx = x - l.mid[0], dy = y - l.mid[1]; return l.pts.map(v => [v[0] + dx, v[1] + dy]); } // vlek: alleen verschuiven, niet uitrekken
        return l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }); } : null;
      ctx.save();
      if (!Dl.skin) { const b = BOT[Dl.bot]; ctx.translate(piv[Dl.bot][0], piv[Dl.bot][1]); ctx.rotate(A[Dl.bot] - b.A0); ctx.translate(-b.J0[0], -b.J0[1]); }
      const basis = tr ? tr(Dl.lagen[0]) : Dl.lagen[0].pts;
      if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[Dl.lagen[0].c]); ctx.lineWidth = D.rand || 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
      pad(ctx, basis); ctx.fillStyle = pal[Dl.lagen[0].c]; ctx.fill();
      if (Dl.lagen.length > 1) { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < Dl.lagen.length; i++) { const L = Dl.lagen[i], P = tr ? tr(L) : L.pts;
        if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
      if (Dl.voet && D.TENEN) D.TENEN(ctx, k, pal, BOT, cm);
      if (k === 'kop' && D.GEZICHT) D.GEZICHT(ctx, pal, cm, A, BOT);
      ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['krul'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fk(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    function teken(ctx, x, y, s, o = {}) {
      if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas && !o.skelet) { // doorzichtig: eerst los tekenen (anders schemeren overlappende delen door elkaar)
        if ((o.a ?? 1) <= 0.01) return null; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
        k.setTransform(ctx.getTransform()); const st = teken(k, x, y, s, Object.assign({}, o, { a: 1 }));
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return st; }
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400 + (D.klipGrond ?? 0.6)); ctx.clip(); }
      let VO = st.volgorde ? st.volgorde : VOLGORDE;
      const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A);
      for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
      if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand'); else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF); else tekenDeel(ctx, k, M, false, piv, A); }
      if (o.skelet) { ctx.lineWidth = 0.5; for (const n of ORDE) { const e = eind(piv, A, n); ctx.strokeStyle = n.endsWith('F') ? '#4FC3F7' : (n.startsWith('romp') ? '#FFEB3B' : '#FF5252'); ctx.beginPath(); ctx.moveTo(piv[n][0], piv[n][1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(piv[n][0], piv[n][1], 0.7, 0, 6.283); ctx.fill(); } }
      ctx.restore(); return st; }
    function info(o = {}) { const st = stand(o); const piv = fk(st.R, st.A); return { piv, A: st.A, voeten: st.voeten, R: st.R, flex: st.flex, eind: (n) => eind(piv, st.A, n) }; }
    function deel(ctx, k, dx = 0, dy = 0) { const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
      if (k.endsWith('F') && PREP[k.slice(0, -1)]) tekenDeel(ctx, k.slice(0, -1), M, true, RP, RESTA); else tekenDeel(ctx, k, M, false, RP, RESTA); ctx.restore();
      const Dl = PREP[k.replace(/F$/, '')]; if (!Dl) return []; const bones = Dl.skin ? { romp: ['rompV', 'rompM', 'rompA'], nek: ['nek', 'kop'], manen: ['nek'], staart: ['st0', 'st1', 'st2', 'st3'], dij: ['dij'], hum: ['scap', 'hum'] }[Dl.skin] : [Dl.bot];
      return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]); }
    function meng(stA, stB, w) { const A = Object.assign({}, stA.A); mixA(A, stB.A, w, ORDE); return { R: [lin(stA.R[0], stB.R[0], w), lin(stA.R[1], stB.R[1], w)], A, voeten: {}, zit: w < 0.5 ? stA.zit : stB.zit }; }
    return { teken, info, stand, deel, houding, fk, meng, BOT, ORDE, PREP, J, PAL, D, TEEN0, SNELHEID, GANGEN, RP, RESTA, cm };
  }
  return { maak, kurve, vlekVorm, streep, binnen, hsh, mixHex, spline, openLijn };
})();

// ---------- gedeelde tekenhulp (tenen, oog, mond) ----------
function _hondTenen(ctx, k, pal, BOT, f, klauw = true) { const b = BOT[k]; const d = [Math.cos(b.A0), Math.sin(b.A0)], s = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + s[0] * w * f, b.J0[1] + d[1] * b.L * u + s[1] * w * f];
  ctx.strokeStyle = HondPop.mixHex(pal.licht || pal.basis, 0.5, '#1A1410'); ctx.lineWidth = 0.2 * f; ctx.lineCap = 'round';
  for (const u of [0.45, 0.76]) { const a = p(u, 1.5), c = p(u + 0.04, -0.7); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); }
  if (klauw) { ctx.fillStyle = pal.klauw; for (const u of [0.86, 1.0]) { const a = p(u - 0.06, -0.15), c = p(u + 0.09, -0.75), e = p(u - 0.02, -0.85); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(e[0], e[1]); ctx.closePath(); ctx.fill(); } } }
function _hondOog(ctx, O, r, iris, pal, o = {}) { // amandeloog: donkere rand + dierOog in eigen schaal (dierOog werkt in px)
  ctx.fillStyle = o.rand || '#1E1A18'; ctx.beginPath(); ctx.ellipse(O[0], O[1], r * 1.45, r * (o.rond ? 1.25 : 0.95), o.hoek ?? -0.15, 0, 6.283); ctx.fill();
  if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + r * 0.12, O[1]); ctx.scale(r / 4, r / 4); dierOog(ctx, 0, 0, 4.0, iris); ctx.restore(); }
  else { ctx.fillStyle = iris; ctx.beginPath(); ctx.arc(O[0], O[1], r, 0, 6.283); ctx.fill(); } }
function _hondLijn(ctx, P, c, w) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }

// =====================================================================================================
// DUITSE HERDER. Gewrichtspunten op stijl.png (bovenste rij links, staand), grond y = 229.
// FCI-standaard 166: schofthoogte reu 60-65 cm -> 62 cm (= oude hond()); romplengte 10-17% groter dan de schofthoogte (plaat 23% -> krimp 0,89);
// borstdiepte 45-48% (plaat ±47%); kop ±40% van de schofthoogte (pop 25 cm); kruis ±23°; voormiddenvoet 20-22°, ±1/3 van de onderarm.
// K = 153 px / 62 cm. Botten: scapula 21, humerus 20, radius 19, femur 20, tibia 24, middenvoet 11 cm.
// =====================================================================================================
const HOND_HERDER_DEF = {
  K: 153 / 62, X0: 200, G0: 229, rand: 0.42, stap: 0.5, verMix: 0.32, verKleur: '#4A4038', krimp: [140, 250, 0.89],
  J: { midrug: [200, 91], nekBasis: [262, 96], lend: [165, 98], kruis: [130, 110],
    kop: [306, 54], neus: [364, 76], kaak: [318, 81], kin: [345, 89],
    schoft: [254, 92], schouder: [291, 127], elleboog: [252, 160], pols: [258, 207], vkogel: [262, 221], vteen: [283, 228],
    heup: [127, 121], knie: [148, 165], hak: [97, 194], akogel: [99, 221], ateen: [111, 228],
    staart0: [121, 113], staart1: [110, 134], staart2: [95, 158], staart3: [76, 180], staart4: [54, 198] },
  PAL: { basis: '#C3874B', tanL: '#CC955A', tanD: '#A9703C', licht: '#D9AE76', creme: '#E7CA9A', zadel: '#2A2827', zadelR: '#4B3C30', masker: '#262423', oorbin: '#A87A50', neus: '#161515', klauw: '#2A2522' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[112, 128], [118, 116], [130, 104], [146, 93], [165, 86], [190, 82], [215, 80], [240, 79], [258, 82], [274, 92], [290, 108], [301, 126], [302, 140], [292, 152], [272, 162], [248, 166], [226, 165], [206, 160], [190, 156], [178, 157], [166, 162], [150, 165], [132, 160], [118, 148]] },
      { c: 'zadelR', tand: [0.9, 2.4, (p) => p[1] > -27], p: [[108, 124], [120, 108], [134, 97], [152, 88], [175, 82], [200, 80], [228, 79], [252, 79], [268, 86], [266, 98], [256, 108], [246, 122], [236, 134], [222, 143], [204, 146], [188, 143], [174, 133], [160, 124], [146, 120], [130, 126], [116, 136]] },
      { c: 'zadel', tand: [0.8, 2.2, (p) => p[1] > -28], p: [[108, 122], [120, 106], [134, 95], [152, 86], [175, 80], [200, 78], [228, 77], [252, 77], [266, 84], [262, 94], [252, 103], [242, 116], [232, 127], [218, 135], [203, 138], [188, 134], [175, 125], [160, 117], [146, 114], [130, 120], [116, 130]] },
      { c: 'licht', tand: [0.7, 2.0, (p) => p[1] < -24], p: [[303, 132], [298, 148], [284, 158], [266, 165], [246, 168], [224, 167], [204, 162], [189, 158], [178, 159], [166, 164], [160, 160], [172, 151], [190, 149], [210, 153], [232, 156], [255, 154], [276, 147], [294, 134]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[248, 84], [262, 74], [276, 64], [292, 54], [304, 46], [316, 48], [324, 60], [326, 78], [322, 92], [315, 108], [309, 122], [304, 136], [296, 146], [282, 140], [270, 124], [260, 108], [252, 96]] },
      { c: 'zadel', tand: [0.9, 2.4, (p) => true], p: [[246, 80], [262, 71], [278, 61], [294, 51], [305, 45], [311, 52], [300, 62], [288, 72], [278, 84], [270, 96], [262, 100], [252, 94]] },
      { c: 'zadel', veeg: [1.3, 0.3], p: [[270, 92], [276, 106], [284, 120], [290, 132]] },
      { c: 'tanD', veeg: [1.1, 0.3], p: [[288, 70], [292, 86], [296, 102], [300, 118]] },
      { c: 'creme', tand: [0.8, 2.0, (p) => p[0] > 36], p: [[325, 84], [322, 98], [316, 112], [309, 126], [303, 140], [295, 140], [300, 124], [307, 108], [313, 94], [316, 84]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[301, 46], [312, 40], [326, 40], [338, 47], [347, 56], [354, 62], [361, 68], [366, 74], [365, 79], [358, 82], [346, 84], [334, 85], [322, 86], [312, 82], [304, 72], [300, 58]] },
      { c: 'zadel', p: [[301, 46], [312, 40], [326, 40], [336, 46], [326, 50], [314, 54], [304, 58]] },
      { c: 'masker', p: [[336, 55], [348, 60], [358, 66], [366, 73], [365, 79], [358, 82], [346, 84], [334, 85], [329, 79], [331, 70], [333, 62]] },
      { c: 'tanL', p: [[312, 72], [322, 71], [330, 76], [327, 84], [316, 86], [308, 80]] },
      { c: 'tanD', p: [[328, 56], [336, 55], [340, 60], [332, 61]] },
      { c: 'neus', p: [[357, 71], [363, 70], [367, 74], [365, 79], [359, 78]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'masker', p: [[318, 82], [332, 84], [346, 85], [354, 85], [348, 90], [334, 92], [322, 92], [315, 88]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'zadel', p: [[305, 48], [309, 34, 1], [318, 19, 1], [327, 31], [330, 48]] },
      { c: 'oorbin', p: [[310, 46], [313, 34], [318, 25, 1], [322, 33], [325, 46]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'zadel', p: [[318, 44], [323, 32, 1], [331, 21, 1], [334, 34], [334, 48]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[250, 90], [266, 95], [282, 106], [294, 120], [299, 136], [293, 148], [277, 158], [262, 166], [250, 168], [244, 158], [243, 136], [245, 112]] },
      { c: 'tanD', veeg: [1.2, 0.4], p: [[258, 104], [260, 124], [258, 146], [254, 162]] },
      { c: 'licht', p: [[295, 124], [299, 138], [291, 150], [278, 159], [272, 153], [285, 141]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[112, 112], [126, 104], [142, 108], [156, 120], [164, 136], [165, 152], [159, 165], [149, 172], [137, 175], [124, 169], [112, 156], [106, 140], [106, 124]] },
      { c: 'zadel', tand: [0.8, 2.2, (p) => p[1] > -44], p: [[106, 112], [122, 101], [142, 103], [160, 115], [146, 118], [128, 118], [112, 126]] },
      { c: 'creme', tand: [0.8, 2.0, (p) => p[0] < -36], p: [[103, 124], [103, 146], [109, 162], [121, 174], [127, 168], [118, 154], [112, 138], [110, 124]] },
      { c: 'tanD', veeg: [1.0, 0.3], p: [[152, 128], [156, 146], [152, 162]] },
    ] },
  },
  POOT: {
    rad: { prof: [[-0.14, 3.8, 1.6], [0.0, 3.8, 3.6], [0.15, 3.5, 3.5], [0.45, 2.8, 2.4], [0.8, 2.5, 2.2], [1.0, 2.5, 2.5], [1.08, 2.3, 1.8]], lagen: [{ c: 'licht', prof: [[0.0, -1.2, 3.8], [0.4, -0.9, 2.6], [1.0, -0.8, 2.7], [1.1, -0.8, 2.0]] }] },
    mc: { prof: [[-0.25, 2.4, 2.4], [0.0, 2.3, 2.3], [0.6, 2.1, 2.0], [1.0, 2.2, 2.2], [1.25, 1.8, 1.8]], c: 'licht' },
    vp: { voet: true, c: 'licht', prof: [[-0.42, 1.6, 1.4], [-0.1, 2.6, 1.3], [0.3, 2.5, 1.2], [0.65, 2.0, 1.0], [0.9, 1.3, 0.7], [1.03, 0.4, 0.35]] },
    schn: { prof: [[-0.12, 3.6, 3.0], [0.05, 3.9, 4.2], [0.3, 3.2, 4.0], [0.6, 2.4, 2.6], [0.85, 2.0, 2.2], [1.0, 2.2, 2.6], [1.1, 1.8, 1.8]], lagen: [{ c: 'licht', prof: [[0.0, -1.5, 4.4], [0.4, -1.3, 3.6], [0.8, -0.6, 2.4], [1.12, -0.4, 2.0]] }] },
    mt: { prof: [[-0.12, 2.0, 2.6], [0.05, 2.1, 2.8], [0.3, 2.0, 2.0], [0.8, 2.0, 1.9], [1.0, 2.1, 2.1], [1.18, 1.8, 1.8]], c: 'licht' },
    ap: { voet: true, c: 'licht', prof: [[-0.45, 1.5, 1.3], [-0.1, 2.5, 1.25], [0.3, 2.4, 1.15], [0.65, 1.95, 0.95], [0.9, 1.25, 0.7], [1.03, 0.4, 0.35]] },
  },
  STAART: { c: 'zadel', w: [2.4, 3.4, 4.2, 4.4, 3.8, 2.2], onder: [0.04, 0.97], onderC: 'basis', tand: [1.1, 2.6] }, dikV: 1.2, dikA: 1.12,
  GEZICHT(ctx, pal, cm) { _hondOog(ctx, cm([334, 63]), 0.85, '#6A3B1A', pal, { hoek: -0.2 });
    _hondLijn(ctx, [cm([322, 84]), cm([334, 85]), cm([348, 85]), cm([355, 84])], '#120F0E', 0.28); },
  TENEN: (ctx, k, pal, BOT) => _hondTenen(ctx, k, pal, BOT, 1.0),
  HOUDING: {
    staan: { adem: 1, ver: { V: 3, A: 18 } },
    zitten: { zit: 1, autoZit: { heup: 10, rv: [-64, -30], V: 2, A: 15, ver: { V: 4, A: 3 }, ty: -0.4, meta: [80, 2], poot: [21, 4] }, A: { rompV: -64, rompM: 122, rompA: 100, nek: -66, kop: 18, st0: 120, st1: 172, st2: 180, st3: 184 } },
    liggen: { R: [0, -25], zit: 1, A: { rompV: -6, rompM: 176, rompA: 168, nek: -52, kop: 16, st0: 150, st1: 174, st2: 180, st3: 184 },
      voet: { V: [66, -0.4, 2, 4], VF: [60, -0.4, 3, 4], A: [-12, -0.4, 4, 6], AF: [-8, -0.4, 4, 6] } },
  },
};
// ---- gedeelde gangen: stap (laterale volgorde, duty 0,64-0,68) en draf (diagonale paren, duty 0,44; Hildebrand 1965, Maes e.a. 2008 voor honden) ----
// sleutelhoeken van middenhand/middenvoet en voet uit de wolfpop (loopcyclus-plaat); pas S en zwaaihoogte per ras naar de beenlengte
const _HOND_KRV = {
  stap: { V: { metaS: [[0, 62], [0.5, 72], [0.82, 86], [1, 104]], metaZ: [[0, 104], [0.32, 128], [0.58, 116], [0.85, 70], [1, 62]], pootS: [[0, 21], [0.68, 21], [1, 72]], pootZ: [[0, 72], [0.3, 100], [0.6, 88], [0.86, 28], [1, 21]] },
          A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 110]], metaZ: [[0, 110], [0.35, 70], [0.62, 52], [0.86, 60], [1, 70]], pootS: [[0, 21], [0.62, 21], [1, 68]], pootZ: [[0, 68], [0.3, 92], [0.6, 52], [0.86, 26], [1, 21]] } },
  draf: { V: { metaS: [[0, 58], [0.5, 74], [0.8, 92], [1, 112]], metaZ: [[0, 112], [0.3, 160], [0.55, 150], [0.82, 40], [1, 58]], pootS: [[0, 21], [0.6, 21], [1, 80]], pootZ: [[0, 80], [0.3, 140], [0.6, 95], [0.85, 12], [1, 21]] },
          A: { metaS: [[0, 60], [0.5, 84], [0.8, 104], [1, 122]], metaZ: [[0, 122], [0.35, 70], [0.62, 48], [0.86, 47], [1, 60]], pootS: [[0, 21], [0.55, 21], [1, 110]], pootZ: [[0, 110], [0.3, 100], [0.6, 55], [0.86, 12], [1, 21]] } } };
function _hondStap(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.66, fase: { A: 0, V: 0.24, AF: 0.5, VF: 0.74 }, lift: { V: lift, A: lift * 0.85 }, bob: S * 0.008, nx: { V: 0, A: S * 0.03 }, dy: S * 0.02, scap: 8, rol: 0.8, knik: 2,
  staartZwaai: [2, 3, 4, 5] }, _HOND_KRV.stap, o); }
function _hondDraf(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.44, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: lift, A: lift * 0.75 }, bob: S * 0.01, nx: { V: S * 0.05, A: S * 0.05 }, dy: S * 0.025, scap: 11, rol: 1.0, knik: 1.5,
  staartZwaai: [3, 5, 7, 9] }, _HOND_KRV.draf, o); }
HOND_HERDER_DEF.LOPEN = _hondStap(72, 7.5, { romp: { nek: -40, kop: 24 } });
HOND_HERDER_DEF.DRAF = _hondDraf(108, 12, { romp: { nek: -27, kop: 32, st0: 150, st1: 160, st2: 168, st3: 172 } }); // stijlplaat rij 2: kop laag en naar voren, staart naar achter
// =====================================================================================================
// BOSMUIS (Apodemus sylvaticus) met dezelfde viervoeter-rig (HondPop.maak), gewrichtspunten direct in cm (geen plaat).
// Bronnen: kop-romp 8-11 cm, staart ±even lang (7-11 cm), 15-30 g; grote oren en uitpuilende ogen, lange snorharen, lichte buik scherp afgezet;
// achtervoet ±2,2 cm (semi-plantigraad: lange middenvoet), loopt in stap en draf, zit vaak rechtop op de achterpoten (Zoogdiervereniging; Mammal Society).
// Pop: kop-romp 10,2 cm, staart 9,5 cm, schofthoogte ±3,3 cm. Houdingen: staan, lopen, draven, zitten (gebogen, voorpoten op de grond), rechtop.
// =====================================================================================================
const MUIS_DEF = {
  K: 1, X0: 0, G0: 0, rand: 0.06, stap: 0.05, klipGrond: 0.03, verMix: 0.3, verKleur: '#3A2E26', dik: 1,
  J: { midrug: [0, -2.9], nekBasis: [2.2, -2.8], lend: [-1.8, -2.9], kruis: [-3.4, -2.6],
    kop: [3.0, -3.1], neus: [5.8, -1.9], kaak: [3.6, -2.0], kin: [5.1, -1.55],
    schoft: [1.8, -3.0], schouder: [2.6, -1.9], elleboog: [1.9, -1.1], pols: [2.2, -0.36], vkogel: [2.3, -0.18], vteen: [2.9, -0.06],
    heup: [-3.0, -2.2], knie: [-2.0, -1.35], hak: [-3.6, -0.72], akogel: [-2.4, -0.14], ateen: [-1.8, -0.05],
    staart0: [-3.9, -2.2], staart1: [-6.0, -1.5], staart2: [-8.2, -0.95], staart3: [-10.4, -0.7], staart4: [-12.8, -0.85] },
  PAL: { basis: '#9A7656', donker: '#84644A', licht: '#E2D6C2', roze: '#D8A8A0', oorbin: '#D8A898', staart: '#A88470', neus: '#B57E78', klauw: '#8A6A60' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[-4.6, -1.6], [-4.3, -2.9], [-3.2, -3.8], [-1.2, -4.2], [1.0, -4.1], [2.4, -3.6], [3.2, -2.6], [3.2, -1.6], [2.6, -0.9], [1.2, -0.8], [-0.6, -0.8], [-2.2, -0.9], [-3.8, -1.1]] },
      { c: 'donker', p: [[-4.4, -2.7], [-3.2, -3.9], [-1.2, -4.3], [1.0, -4.2], [2.4, -3.7], [1.6, -3.5], [-0.6, -3.6], [-2.6, -3.3], [-4.0, -2.4]] },
      { c: 'licht', p: [[3.3, -1.9], [2.8, -0.8], [1.0, -0.7], [-1.0, -0.7], [-2.6, -0.8], [-3.6, -1.2], [-2.4, -1.35], [-0.5, -1.3], [1.4, -1.4], [2.8, -1.7]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[1.6, -3.8], [2.6, -4.0], [3.6, -3.6], [4.0, -2.6], [3.6, -1.6], [2.8, -1.2], [2.2, -2.0], [1.8, -2.8]] },
      { c: 'licht', p: [[3.9, -2.2], [3.6, -1.5], [2.9, -1.15], [2.9, -1.6], [3.4, -1.9]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[2.8, -3.6], [3.4, -4.1], [4.2, -4.0], [4.9, -3.4], [5.5, -2.6], [5.9, -2.1], [5.85, -1.75], [5.2, -1.45], [4.4, -1.3], [3.6, -1.5], [3.0, -2.2]] },
      { c: 'licht', p: [[3.6, -1.95], [4.6, -1.95], [5.6, -1.85], [5.4, -1.4], [4.4, -1.25], [3.6, -1.45]] },
      { c: 'neus', p: [[5.62, -2.2], [5.95, -2.05], [5.92, -1.75], [5.6, -1.82]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[3.8, -1.55], [4.6, -1.5], [5.3, -1.5], [5.0, -1.2], [4.2, -1.15]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'basis', p: [[3.0, -3.7], [2.75, -4.9], [3.25, -5.65], [4.1, -5.55], [4.45, -4.7], [4.1, -3.9]] },
      { c: 'oorbin', p: [[3.2, -3.95], [3.1, -4.8], [3.5, -5.3], [4.0, -5.2], [4.15, -4.5], [3.9, -4.05]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'donker', p: [[3.8, -3.9], [3.9, -4.95], [4.45, -5.25], [4.85, -4.7], [4.6, -4.0]] }] },
    hum: { skin: 'hum', lagen: [{ c: 'basis', p: [[1.6, -3.2], [2.6, -3.0], [3.2, -2.2], [3.0, -1.4], [2.4, -0.9], [1.8, -1.0], [1.5, -1.8]] }] },
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[-4.2, -2.6], [-3.2, -3.2], [-2.0, -3.0], [-1.3, -2.2], [-1.4, -1.3], [-2.2, -0.9], [-3.4, -1.0], [-4.2, -1.6]] }] },
  },
  POOT: {
    rad: { prof: [[-0.15, 0.3, 0.2], [0.0, 0.32, 0.3], [0.5, 0.22, 0.2], [1.0, 0.17, 0.17], [1.12, 0.15, 0.13]] },
    mc: { c: 'roze', prof: [[-0.3, 0.15, 0.15], [0.0, 0.15, 0.15], [1.0, 0.13, 0.13], [1.3, 0.11, 0.11]] },
    vp: { voet: true, c: 'roze', prof: [[-0.4, 0.13, 0.11], [0.0, 0.17, 0.1], [0.5, 0.15, 0.09], [0.9, 0.1, 0.06], [1.06, 0.04, 0.04]] },
    schn: { prof: [[-0.12, 0.45, 0.35], [0.1, 0.45, 0.42], [0.5, 0.3, 0.28], [1.0, 0.2, 0.2], [1.12, 0.17, 0.15]] },
    mt: { c: 'roze', prof: [[-0.15, 0.17, 0.19], [0.0, 0.18, 0.19], [1.0, 0.14, 0.12], [1.12, 0.12, 0.1]] },
    ap: { voet: true, c: 'roze', prof: [[-0.3, 0.12, 0.1], [0.0, 0.15, 0.09], [0.5, 0.13, 0.08], [0.9, 0.09, 0.05], [1.08, 0.03, 0.03]] },
  },
  STAART: { c: 'staart', w: [0.3, 0.2, 0.16, 0.13, 0.1, 0.06] },
  GEZICHT(ctx, pal, cm) { const O = cm([4.45, -3.0]); ctx.fillStyle = '#100B08'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 0.48, 0.44, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(O[0] + 0.16, O[1] - 0.16, 0.1, 0, 6.283); ctx.fill();
    ctx.strokeStyle = 'rgba(236,230,218,0.8)'; ctx.lineWidth = 0.035; const a = cm([5.35, -1.9]); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(a[0] + 1.2, a[1] - 0.4 + i * 0.2, a[0] + 2.4, a[1] - 0.9 + i * 0.5); ctx.stroke(); } },
  HOUDING: { staan: { adem: 1, ver: { V: 0.4, A: 0.5 } },
    zitten: { zit: 1, autoZit: { heup: 1.1, rv: [-50, -10], V: 0.3, A: 1.2, ver: { V: 0.3, A: 0.3 }, ty: -0.04, meta: [80, 4], poot: [20, 4] }, A: { rompV: -50, rompM: 140, rompA: 118, nek: -40, kop: 26, st0: 150, st1: 178, st2: 184, st3: 186 } },
    rechtop: { R: [-1.2, -4.2], zit: 1, A: { rompV: -72, rompM: 112, rompA: 98, nek: -38, kop: 22, st0: 168, st1: 182, st2: 184, st3: 186 },
      voet: { V: [2.4, -3.0, 100, 70], VF: [2.7, -3.1, 100, 72], A: [-2.0, -0.04, 4, 4], AF: [-1.6, -0.04, 4, 4] } },
  },
};
MUIS_DEF.LOPEN = _hondStap(3.6, 0.55, { romp: { nek: -36, kop: 24 }, staartZwaai: [1, 2, 3, 4] });
MUIS_DEF.DRAF = _hondDraf(5.5, 0.9, { romp: { nek: -30, kop: 28 }, staartZwaai: [2, 3, 4, 5] });
const MUIS = HondPop.maak(MUIS_DEF);

// ---- wrappers (zelfde naam en aanroep als dieren_zoog.js) ----
function muis(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o); let h = oo.houding || 'staan'; h = { rennen: 'draven', zit: 'zitten' }[h] || h; if (!MUIS.GANGEN[h] && !MUIS.D.HOUDING[h]) h = 'staan'; oo.houding = h; return MUIS.teken(ctx, x, y, s, oo); }
