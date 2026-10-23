// Katachtigen als uitknippop (cut-out rig), 23 okt 2026 — POPFAMILIE.md, familie katten
// Eén rig-code (KatPop.maak) met per dier eigen gewrichtspunten (botlengtes), eigen delen, eigen kleuren/tekening en eigen houdingen.
// Basis = wolf_pop.js (zachte huid, rand in twee passes, IK, gangmodel), maar met een buigzame ruggengraat in 3 delen
// (rompV = borst, rompM = lende, rompA = bekken) zodat het jachtluipaard in galop kan buigen en strekken.
// Eenheid = cm, y omlaag, grond y = 0, x = 0 onder het midden van de rug (midrug). Kijkrichting +x (o.kijk = -1 spiegelt).
// API per dier: KAT.luipaard.teken(ctx, x, y, schaal (px/cm), o)  o.houding, o.t (0-1 cyclus), o.kijk, o.a, o.wereld (dier schuift S*t mee)
// Wrappers onderaan: jachtluipaard(), leeuw(), tijger(), huiskat() met dezelfde aanroep en schermmaat als in dieren_zoog.js.

const KatPop = (() => {
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
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function spline(P) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u; const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); } }
    return out; }
  function openLijn(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
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
    const K = D.K, X0 = D.X0, G0 = D.G0; const cm = (p) => [(p[0] - X0) / K, (p[1] - G0) / K]; D.HOUDING.rust = D.HOUDING.rust || {};
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
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, vrij: d.vrij, lagen: d.lagen.map(laag) }; }
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
      const basis = L.concat([tip], R.reverse());
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
    // ---- kop uit de vlakke kopplaat (koppen.png, rij 2): gelijkvormig afgebeeld via twee ankers (achterhoofd -> J.kop, neuspunt -> J.neus) ----
    let KOPG = null;
    if (D.KOP) { const Kp = D.KOP, [a0, a1] = Kp.van, b0 = D.J.kop, b1 = D.J.neus; const va = sub(a1, a0), vb = sub(b1, b0); const sc = len(vb) / len(va) * (Kp.schaal || 1), rt = ang(vb) - ang(va) + (Kp.draai || 0) * RAD;
      const naar = (p) => { const q = add(b0, rot(mul(sub(p, a0), sc), rt)); return p[2] ? [q[0], q[1], 1] : q; }; const pk = sc / K; // koppen-px -> cm
      const bouw = (L) => L.map(l => { if (l.veeg) return { c: l.c, pts: streep(l.p.map(p => cm(naar(p))), l.veeg[0] * pk, l.veeg[1] * pk) };
        let P = spline(l.p.map(p => { const c = cm(naar(p)); return p[2] ? [c[0], c[1], 1] : c; })); if (l.tand) P = tanden(P, [l.tand[0] * pk, l.tand[1] * pk, l.tand[2]]); return { c: l.c, pts: P }; });
      PREP.kop = { bot: 'kop', lagen: bouw(Kp.lagen) }; delete PREP.oor; delete PREP.oorF; if (Kp.oor) PREP.oor = { bot: 'kop', lagen: bouw(Kp.oor) }; if (Kp.oorF) PREP.oorF = { bot: 'kop', lagen: bouw(Kp.oorF) }; delete PREP.kaak;
      KOPG = { oog: Kp.oog && { c: cm(naar(Kp.oog.c)), r: Kp.oog.r * pk, iris: Kp.oog.iris, pupil: Kp.oog.pupil || 'rond', rek: Kp.oog.rek || 1, rand: Kp.oog.rand, hoek: rt },
        lijnen: (Kp.lijnen || []).map(l => ({ c: l.c, w: l.w * pk, pts: openLijn(l.p.map(p => cm(naar(p)))) })) }; }

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
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.A || {}) }));
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
    // galop (jachtluipaard): roterende galop met gebogen (gathered) en gestrekte (extended) zweeffase; romp buigt via rompM/rompA
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
    const GANGEN = {}; if (D.LOPEN) GANGEN.lopen = (t) => stap(D.LOPEN, t); if (D.GALOP) GANGEN.galop = (t) => galop(D.GALOP, t);
    const SNELHEID = { lopen: D.LOPEN ? D.LOPEN.S : 0, galop: D.GALOP ? D.GALOP.S : 0 };
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
      if (Dl.lagen.length > 1) { ctx.save(); if (!Dl.vrij) { pad(ctx, basis); ctx.clip(); } for (let i = 1; i < Dl.lagen.length; i++) { const L = Dl.lagen[i], P = tr ? tr(L) : L.pts;
        if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
      if (Dl.voet && D.TENEN) D.TENEN(ctx, k, pal, BOT, cm);
      if (k === 'kop' && KOPG) tekenGezicht(ctx, pal);
      else if (k === 'kop' && D.GEZICHT) D.GEZICHT(ctx, pal, cm, A, BOT);
      ctx.restore(); }
    // oog: rond, met iris, pupil en één lichtpuntje (geen staarblik); lijnen: mond, snorharen
    function tekenGezicht(ctx, pal) { const G = KOPG;
      for (const l of G.lijnen) { ctx.strokeStyle = pal[l.c] || l.c; ctx.lineWidth = l.w; ctx.lineCap = 'round'; ctx.beginPath(); l.pts.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }
      const O = G.oog; if (!O) return; ctx.save(); ctx.translate(O.c[0], O.c[1]); ctx.rotate(O.hoek * 0.3);
      ctx.fillStyle = O.rand || '#2A201A'; ctx.beginPath(); ctx.ellipse(0, 0, O.r * 1.18 * O.rek, O.r * 1.12, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = O.iris; ctx.beginPath(); ctx.ellipse(0.05 * O.r, 0, O.r * O.rek, O.r, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = mixKat(O.iris, 0.25, '#FFF6D8'); ctx.beginPath(); ctx.ellipse(0.1 * O.r, 0.35 * O.r, O.r * 0.62 * O.rek, O.r * 0.45, 0, 0, 6.283); ctx.fill(); // lichtere onderkant iris
      ctx.fillStyle = '#120C0A'; ctx.beginPath(); if (O.pupil === 'spleet') ctx.ellipse(0.12 * O.r, 0, O.r * 0.3, O.r * 0.78, 0, 0, 6.283); else ctx.arc(0.12 * O.r, 0, O.r * 0.5, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.beginPath(); ctx.arc(0.42 * O.r, -0.4 * O.r, O.r * 0.2, 0, 6.283); ctx.fill(); ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fk(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    function teken(ctx, x, y, s, o = {}) {
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400.6); ctx.clip(); }
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

// =====================================================================================================
// JACHTLUIPAARD (Acinonyx jubatus). Gewrichtspunten op galop-luipaard.png, houding 'staan' (onderste rij midden), grond y = 648.
// Schofthoogte 80 cm (bronnen 67-94 cm) -> K = 161 px / 80 cm. Borst: onderrand 0,50 H boven de grond (plaat 0,51 H; diepte 0,49 H),
// diepste punt net achter de elleboog, borstbeen maar ±6 cm voor de voorpoot; taille 0,30 H (wespentaille).
// =====================================================================================================
const KAT_LUIPAARD_DEF = {
  K: 161 / 80, X0: 680, G0: 648, rand: 0.45, verMix: 0.3, verKleur: '#5A4630',
  J: { midrug: [680, 502], nekBasis: [748, 500], lend: [632, 500], kruis: [596, 504],
    kop: [790, 466], neus: [825, 476], kaak: [800, 482], kin: [818, 486],
    schoft: [735, 494], schouder: [770, 528], elleboog: [740, 570], pols: [748, 626], vkogel: [752, 640], vteen: [765, 645],
    heup: [590, 522], knie: [622, 566], hak: [576, 605], akogel: [580, 640], ateen: [593, 645],
    staart0: [585, 506], staart1: [574, 540], staart2: [565, 575], staart3: [551, 598], staart4: [522, 611] },
  PAL: { basis: '#E3AF6C', donker: '#C9914F', licht: '#EFDDBF', creme: '#F4E8D2', vlek: '#2B221D', neus: '#3A2A26', traan: '#231B18', oorbin: '#E9D3B0', wit: '#F6F0E6' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[582, 512], [585, 501], [592, 495], [604, 491.5], [618, 490.5], [634, 491], [656, 492], [680, 495], [706, 496], [726, 492], [742, 484], [756, 478], [770, 498], [777, 520], [774, 540], [764, 556], [748, 566], [728, 569], [706, 566], [686, 561], [664, 553], [646, 545], [634, 543], [622, 556], [606, 566], [592, 561], [584, 544], [582, 522]] },
      { c: 'licht', p: [[777, 528], [776, 548], [762, 566], [740, 572], [714, 570], [692, 566], [668, 558], [648, 551], [634, 548], [640, 540], [660, 542], [684, 548], [708, 553], [730, 554], [752, 548], [768, 536]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[724, 504], [734, 488], [748, 479], [762, 470], [776, 460], [788, 452], [798, 451], [806, 462], [808, 478], [800, 492], [790, 501], [783, 513], [778, 528], [770, 540], [752, 536], [736, 522]] },
      { c: 'licht', p: [[808, 474], [806, 484], [798, 494], [790, 503], [784, 516], [779, 530], [773, 542], [766, 530], [772, 512], [782, 498], [794, 486]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[784, 462], [790, 454], [800, 451], [812, 454], [819, 460], [823, 466], [826, 471], [826, 477], [822, 481], [816, 484], [808, 487], [800, 487], [792, 481], [786, 472]] },
      { c: 'licht', p: [[806, 474], [814, 476], [822, 479], [818, 484], [810, 488], [800, 488], [796, 482]] },
      { c: 'licht', p: [[806, 461], [811, 459], [815, 462], [810, 465]] },
      { c: 'neus', p: [[822, 474.5], [825.5, 473.5], [826.5, 475.5], [824.5, 478], [822.5, 477]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[800, 482], [810, 482], [818, 483], [815, 487], [806, 489], [798, 487]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'basis', p: [[782, 462], [781, 454], [785, 449], [791, 448], [795, 452], [794, 460]] },
      { c: 'vlek', p: [[781.5, 458], [781.5, 453], [784.5, 449.5], [786, 451], [784, 457]] },
      { c: 'oorbin', p: [[789, 459], [790, 452], [793, 451], [793.5, 457]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'donker', p: [[792, 458], [794, 451], [799, 449], [802, 452], [800, 458]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[734, 492], [752, 494], [766, 506], [775, 524], [774, 542], [764, 556], [752, 566], [742, 574], [732, 572], [726, 556], [724, 532], [726, 508]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[585, 504], [598, 498], [612, 508], [624, 524], [632, 544], [634, 562], [626, 574], [612, 581], [598, 586], [588, 580], [583, 564], [580, 544], [580, 524]] },
    ] },
  },
  // poten: profielen [u, voor, achter] in cm (rad/mc/vp: voor = voorkant; schn: voor = onder-voor; vp/ap: voor = bovenkant)
  POOT: {
    rad: { prof: [[-0.12, 3.0, 1.0], [0.0, 3.4, 3.2], [0.1, 3.5, 3.6], [0.3, 3.1, 2.6], [0.6, 2.5, 1.9], [0.88, 2.1, 1.9], [1.0, 2.1, 2.3], [1.08, 2.0, 1.4]], lagen: [{ c: 'licht', prof: [[-0.1, -0.6, 1.2], [0.1, -1.4, 3.7], [0.5, -0.8, 2.2], [1.0, -0.6, 2.4], [1.1, -0.6, 1.8]] }] },
    mc: { prof: [[-0.25, 2.1, 2.3], [0.0, 2.0, 2.2], [0.6, 1.9, 1.9], [1.0, 2.0, 2.0], [1.2, 1.6, 1.6]], lagen: [{ c: 'licht', prof: [[-0.3, -0.5, 2.6], [0.5, -0.4, 2.2], [1.3, -0.3, 2.2]] }] },
    vp: { voet: true, c: 'licht', prof: [[-0.32, 1.5, 1.3], [0.0, 2.1, 1.2], [0.35, 2.0, 1.05], [0.7, 1.6, 0.9], [0.92, 0.95, 0.6], [1.02, 0.25, 0.25]] },
    schn: { prof: [[-0.12, 3.4, 2.5], [0.05, 3.6, 4.0], [0.3, 3.0, 4.4], [0.55, 2.2, 3.0], [0.85, 1.8, 2.0], [1.0, 2.0, 2.6], [1.1, 1.6, 1.6]], lagen: [{ c: 'licht', prof: [[0.0, -1.2, 4.2], [0.3, -1.6, 4.6], [0.6, -0.8, 3.2], [1.0, -0.4, 2.8], [1.12, -0.4, 1.8]] }] },
    mt: { prof: [[-0.12, 1.8, 2.4], [0.05, 1.9, 2.6], [0.3, 1.8, 1.7], [0.8, 1.8, 1.7], [1.0, 1.9, 2.0], [1.15, 1.6, 1.6]], lagen: [{ c: 'licht', prof: [[-0.2, -0.4, 2.8], [0.5, -0.3, 2.0], [1.3, -0.2, 2.2]] }] },
    ap: { voet: true, c: 'licht', prof: [[-0.32, 1.5, 1.3], [0.0, 2.0, 1.15], [0.35, 1.95, 1.0], [0.7, 1.55, 0.85], [0.92, 0.9, 0.6], [1.02, 0.25, 0.25]] },
  },
  STAART: { w: [3.8, 3.6, 3.3, 3.2, 3.4, 3.6], onder: [0.05, 0.6], onderC: 'licht', banden: [[0.62, 2.2, 'vlek'], [0.71, 2.4, 'vlek'], [0.8, 2.6, 'vlek'], [0.885, 2.8, 'vlek'], [0.975, 4.0, 'wit']] },
  TEKENING({ PREP, cm, vlekVorm, binnen, hsh }) { // massieve ronde vlekken; Poisson-schijf per deel, kleiner op buik en poten
    const doe = (k, dmin, r0, r1, seed, filter) => { const D = PREP[k]; if (!D) return; const B = D.lagen[0].pts; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const p of B) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
      const P = []; let n = 0; for (let i = 0; i < 4000 && n < 400; i++) { const p = [x0 + hsh(seed + i * 1.37) * (x1 - x0), y0 + hsh(seed + i * 2.91 + 5) * (y1 - y0)]; if (!binnen(p, B)) continue; if (filter && !filter(p)) continue;
        const r = r0 + (r1 - r0) * hsh(seed + i * 4.3); if (P.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < dmin * (0.8 + 0.4 * (q[2] + r) / (2 * r1)))) continue; P.push([p[0], p[1], r]); n++; }
      for (const [x, y, r] of P) D.lagen.push({ c: 'vlek', mid: [x, y], pts: vlekVorm([x, y], r, seed + x * 3 + y, 1.1, 0.3) }); };
    doe('romp', 2.55, 0.62, 0.92, 11); doe('nek', 2.2, 0.5, 0.78, 23); doe('hum', 2.4, 0.58, 0.85, 31); doe('dij', 2.5, 0.6, 0.9, 41);
    doe('rad', 2.2, 0.42, 0.62, 51, (p) => p[0] > -100); doe('schn', 2.3, 0.45, 0.7, 61); doe('mc', 2.0, 0.28, 0.4, 71); doe('mt', 2.0, 0.3, 0.42, 81);
    doe('kop', 1.5, 0.28, 0.4, 91, (p) => p[0] < cm([806, 0])[0] && p[1] < cm([0, 478])[1]);
    doe('staart', 2.4, 0.6, 0.85, 97, (p) => p[1] < cm([0, 586])[1]);
  },
  GEZICHT(ctx, pal, cm) { // traanstreep, oog, mond
    const T = [[808, 461], [812, 466], [814, 472], [816, 478], [818, 483], [815, 483], [812, 476], [809, 468], [806, 463]].map(cm);
    ctx.fillStyle = pal.traan; ctx.beginPath(); ctx.moveTo(T[0][0], T[0][1]); for (const p of T.slice(1)) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fill();
    const O = cm([809, 463]); ctx.fillStyle = '#2A2320'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 1.35, 0.85, -0.12, 0, 6.283); ctx.fill();
    if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + 0.1, O[1]); ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, 3.0, '#C08A2E'); ctx.restore(); }
    const M = [cm([812, 482]), cm([817, 483]), cm([822, 481])]; ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.28; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo(M[1][0], M[1][1] + 0.3, M[2][0], M[2][1]); ctx.stroke(); },
  TENEN(ctx, k, pal, BOT, cm) { const b = BOT[k]; const d = [Math.cos(b.A0), Math.sin(b.A0)], s = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + s[0] * w, b.J0[1] + d[1] * b.L * u + s[1] * w];
    ctx.strokeStyle = mixKat(pal.licht, 0.45, '#1A1410'); ctx.lineWidth = 0.18; ctx.lineCap = 'round'; for (const u of [0.42, 0.75]) { const a = p(u, 1.9), c = p(u + 0.05, -0.9); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); }
    ctx.fillStyle = pal.klauw; for (const u of [0.66, 0.98]) { const a = p(u, -0.5), c = p(u + 0.22, -0.9), e = p(u + 0.02, -1.0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(e[0], e[1]); ctx.closePath(); ctx.fill(); } },
  // houdingen: R = [dx, y] van midrug (cm), A = wereldhoeken (graden, y omlaag), voet = [teen x, teen y, middenhand/-voet, voet] (graden)
  HOUDING: {
    staan: { adem: 1, ver: { V: 4, A: 16 } }, // = de gemeten ruststand; verre poten iets naar voren
    liggen: { R: [2, -24], zit: 1, A: { rompV: -9, rompM: 176, rompA: 172, nek: -52, kop: 12, st0: 150, st1: 178, st2: 182, st3: 186 },
      voet: { V: [72, -1.0, 2, 4], VF: [66, -1.0, 3, 4], A: [-6, -1.0, 4, 6], AF: [-1, -1.0, 4, 6] } },
    zitten: { zit: 1, autoZit: { heup: 11, rv: [-66, -30], V: 4, A: 20, ver: { V: 5, A: 4 }, ty: -1.0, meta: [84, 2], poot: [22, 4] }, A: { rompV: -64, rompM: 104, rompA: 88, nek: -40, kop: 18, st0: 110, st1: 178, st2: 184, st3: 188 } },
  },
  // stap: laterale volgorde (A 0, V 0,2, AF 0,5, VF 0,7), duty 0,62 (katachtigen in stap 0,6-0,7)
  LOPEN: { S: 86, beta: 0.62, fase: { A: 0, V: 0.22, AF: 0.5, VF: 0.72 }, lift: { V: 9, A: 7 }, bob: 0.7, nx: { V: 0, A: 4 }, Ry: -70.5, scap: 9,
    A: { nek: -38, kop: 18 }, staartZwaai: [2, 4, 6, 8],
    V: { metaS: [[0, 62], [0.5, 74], [0.82, 88], [1, 108]], metaZ: [[0, 108], [0.3, 140], [0.58, 120], [0.85, 64], [1, 62]], pootS: [[0, 20], [0.68, 20], [1, 70]], pootZ: [[0, 70], [0.3, 110], [0.6, 80], [0.86, 26], [1, 20]] },
    A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 112]], metaZ: [[0, 112], [0.35, 72], [0.62, 52], [0.86, 62], [1, 70]], pootS: [[0, 23], [0.62, 23], [1, 70]], pootZ: [[0, 70], [0.3, 92], [0.6, 50], [0.86, 26], [1, 23]] } },
  // galop: roterende galop (Hildebrand 1959; Hudson e.a. 2012): verre voorpoot (niet-leidend) 0 -> nabije voorpoot (leidend) 0,10 -> gebogen zweeffase ->
  // nabije achterpoot (niet-leidend) 0,54 -> verre achterpoot (leidend) 0,64 -> gestrekte zweeffase. Duty ±0,22 per poot.
  GALOP: { S: 320, beta: { V: 0.22, A: 0.22 }, fase: { VF: 0.0, V: 0.10, A: 0.54, AF: 0.64 }, nx: { V: 46, A: -33 }, ty: { V: -1.0, A: -1.0 }, scap: 14,
    am0: { V: -0.7, A: -1.0 }, am1: { V: -1.0, A: -1.3 }, fold: { V: [[0, 0], [0.22, 24], [0.5, 16], [0.82, 3], [1, 0]], A: [[0, 0], [0.35, 22], [0.65, 12], [0.9, 2], [1, 0]] },
    flex: [[0, 0.45], [0.1, 0.55], [0.3, 0.95], [0.45, 1.0], [0.58, 0.75], [0.74, 0.25], [0.88, 0.0], [1.0, 0.45]],
    Ry: [[0, -67], [0.16, -66], [0.3, -71], [0.45, -75], [0.6, -70], [0.75, -66], [0.9, -69], [1, -67]],
    gestrekt: { rompV: -4, rompM: 186, rompA: 194, nek: -22, kop: 18, st0: 168, st1: 180, st2: 186, st3: 192 },
    gebogen: { rompV: 11, rompM: 165, rompA: 142, nek: -32, kop: 16, st0: 160, st1: 180, st2: 194, st3: 206 },
    staartZwaai: [4, 8, 12, 16],
    V: { metaS: [[0, 55], [0.5, 80], [1, 122]], metaZ: [[0, 122], [0.18, 165], [0.45, 135], [0.75, 45], [1, 55]], pootS: [[0, 15], [0.55, 15], [1, 85]], pootZ: [[0, 85], [0.2, 150], [0.5, 90], [0.8, 20], [1, 15]] },
    A: { metaS: [[0, 62], [0.5, 92], [1, 132]], metaZ: [[0, 132], [0.3, 108], [0.6, 82], [0.85, 58], [1, 62]], pootS: [[0, 18], [0.6, 18], [1, 105]], pootZ: [[0, 105], [0.3, 70], [0.6, 35], [0.85, 15], [1, 18]] } },
};
function mixKat(h, k, m) { return KatPop.mixHex(h, k, m); }

const KAT = {};
KAT.luipaard = KatPop.maak(KAT_LUIPAARD_DEF);

// ---------- gedeelde tekening: strepen (tijger, huiskat) ----------
function _katStrepen(H, o) { // o: { delen: {deel: {stap, len:[a,b], w, krom, seed, richting:'v'|'h'}}, ... }
  const { PREP, streep, hsh } = H;
  for (const k in o) { const D = PREP[k]; if (!D) continue; const c = o[k]; const B = D.lagen[0].pts; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const p of B) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
    const rand = (x, boven) => { let best = boven ? 1e9 : -1e9; for (let i = 0; i < B.length; i++) { const a = B[i], b = B[(i + 1) % B.length]; if ((a[0] - x) * (b[0] - x) > 0) continue; const u = (x - a[0]) / ((b[0] - a[0]) || 1e-6), y = a[1] + (b[1] - a[1]) * u; best = boven ? Math.min(best, y) : Math.max(best, y); } return best; };
    const randY = (y, links) => { let best = links ? 1e9 : -1e9; for (let i = 0; i < B.length; i++) { const a = B[i], b = B[(i + 1) % B.length]; if ((a[1] - y) * (b[1] - y) > 0) continue; const u = (y - a[1]) / ((b[1] - a[1]) || 1e-6), x = a[0] + (b[0] - a[0]) * u; best = links ? Math.min(best, x) : Math.max(best, x); } return best; };
    let i = 0;
    if ((c.richting || 'v') === 'v') { for (let x = x0 + c.stap * 0.5; x < x1 - c.stap * 0.3; x += c.stap * (0.8 + 0.4 * hsh(c.seed + i))) { i++; const top = rand(x, true), bot = rand(x, false); if (!isFinite(top) || bot - top < 2) continue;
        const L = (bot - top) * (c.len[0] + (c.len[1] - c.len[0]) * hsh(c.seed + i * 3.1)); const kr = (c.krom || 0) * (hsh(c.seed + i * 5.7) - 0.3) * L; const y0s = c.onder ? bot + 1 : top - 1, sg = c.onder ? -1 : 1;
        const golf = (c.golf || 0) * (hsh(c.seed + i * 8.3) - 0.5) * L;
        const lijn = [[x, y0s], [x + kr * 0.3 + golf, y0s + sg * L * 0.35], [x + kr * 0.6 - golf * 0.5, y0s + sg * L * 0.7], [x + kr, y0s + sg * L]]; const S = streep(lijn, c.w * (0.8 + 0.4 * hsh(c.seed + i * 2.3)), c.w * 0.08); if (S) D.lagen.push({ c: c.kleur || 'streep', pts: S });
        if (c.paar && hsh(c.seed + i * 4.9) < 0.7) { const dx = c.paar * (hsh(c.seed + i * 6.1) > 0.5 ? 1 : -1), L2 = L * (0.35 + 0.3 * hsh(c.seed + i * 7.7)); // dubbele streep: korter, smaller, parallel
          const S2 = streep([[x + dx, y0s + sg * L * 0.05], [x + dx + kr * 0.25, y0s + sg * L2 * 0.5], [x + dx + kr * 0.4, y0s + sg * L2]], c.w * 0.6, c.w * 0.06); if (S2) D.lagen.push({ c: c.kleur || 'streep', pts: S2 }); }
        if (c.vork && hsh(c.seed + i * 9.1) < c.vork) { const l2 = [[x + kr * 0.4, y0s + sg * L * 0.45], [x + kr * 0.4 - c.stap * 0.35, y0s + sg * L * 0.75]]; const S2 = streep(l2, c.w * 0.6, c.w * 0.1); if (S2) D.lagen.push({ c: c.kleur || 'streep', pts: S2 }); } } }
    else { for (let y = y0 + c.stap * 0.5; y < y1 - c.stap * 0.3; y += c.stap * (0.85 + 0.3 * hsh(c.seed + i))) { i++; const l = randY(y, true), r = randY(y, false); if (!isFinite(l) || r - l < 1) continue;
        const L = (r - l) * (c.len[0] + (c.len[1] - c.len[0]) * hsh(c.seed + i * 3.1)); const st = c.vanVoor ? r + 1 : l - 1, sg = c.vanVoor ? -1 : 1; const kr = (c.krom || 0) * L;
        const S = streep([[st, y], [st + sg * L * 0.5, y + kr * 0.5], [st + sg * L, y + kr]], c.w * (0.8 + 0.4 * hsh(c.seed + i * 2.3)), c.w * 0.15); if (S) D.lagen.push({ c: c.kleur || 'streep', pts: S }); } }
  } }

// =====================================================================================================
// LEEUW (Panthera leo), mannetje met manen. Gewrichtspunten op stap-leeuw-kat.png, leeuw fase 1 (bovenste rij links), grond y = 210.
// Schofthoogte 120 cm (bron: ±1,2 m bij mannetjes) -> K = 135 px / 120 cm. Borst diep (onderrand ±0,45 H, met buikmanen lager).
// =====================================================================================================
const KAT_LEEUW_DEF = {
  K: 135 / 120, X0: 150, G0: 210, rand: 0.7, verMix: 0.3, verKleur: '#4A3420', dikV: 1.38, dikA: 1.4,
  J: { midrug: [150, 80], nekBasis: [205, 82], lend: [124, 78], kruis: [104, 80],
    kop: [268, 84], neus: [306, 106], kaak: [276, 110], kin: [298, 120],
    schoft: [200, 77], schouder: [238, 118], elleboog: [230, 162], pols: [256, 195], vkogel: [262, 203], vteen: [273, 207],
    heup: [96, 106], knie: [102, 147], hak: [58, 171], akogel: [62, 201], ateen: [74, 206],
    staart0: [90, 88], staart1: [73, 114], staart2: [61, 143], staart3: [44, 164], staart4: [21, 168] },
  PAL: { basis: '#C68D4E', donker: '#A8743E', licht: '#DDB683', creme: '#E9CFA6', manenD: '#6A4326', manenM: '#9A642F', manenL: '#C98C47', kwast: '#2E2320', neus: '#4A3028', snuit: '#E8CBA6', oorbin: '#8A5A34' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[82, 104], [85, 90], [92, 79], [102, 73], [116, 70.5], [135, 70.5], [160, 71.5], [182, 70], [204, 65], [228, 76], [246, 104], [251, 132], [244, 152], [228, 164], [208, 164], [190, 156], [170, 150], [150, 146], [135, 139], [124, 142], [112, 152], [96, 154], [84, 142], [78, 120]] },
      { c: 'licht', p: [[250, 128], [246, 150], [228, 163], [206, 162], [186, 155], [164, 150], [146, 146], [132, 144], [138, 136], [158, 139], [180, 142], [200, 146], [222, 146], [240, 138]] },
    ] },
    nek: { skin: 'nek', lagen: [{ c: 'basis', p: [[190, 84], [205, 70], [228, 62], [252, 60], [270, 66], [276, 84], [274, 104], [266, 118], [256, 132], [248, 144], [232, 140], [212, 118]] }] },
    manen: { skin: 'manen', lagen: [
      { c: 'manenM', tand: [3.6, 8, (p) => p[0] < 118 || p[1] > -50], p: [[186, 100], [190, 80], [198, 64], [212, 50], [232, 40], [254, 33], [276, 34], [292, 44], [302, 58], [305, 76], [301, 94], [295, 110], [288, 124], [279, 138], [268, 152], [256, 163], [240, 170], [224, 168], [210, 158], [200, 142], [192, 122]] },
      { c: 'manenD', tand: [3, 7], p: [[189, 112], [194, 96], [203, 88], [214, 92], [222, 110], [230, 132], [238, 152], [234, 166], [222, 168], [208, 158], [198, 142]] },
      { c: 'manenL', tand: [2.6, 6], p: [[246, 44], [266, 34], [286, 37], [298, 50], [305, 66], [304, 84], [298, 100], [291, 116], [283, 130], [272, 142], [266, 130], [274, 112], [279, 96], [280, 80], [276, 66], [266, 55], [252, 52]] },
      { c: 'manenD', veeg: [0.9, 0.2], p: [[232, 60], [228, 90], [222, 120], [218, 146]] },
      { c: 'manenD', veeg: [0.8, 0.2], p: [[252, 58], [252, 92], [250, 124], [252, 150]] },
      { c: 'manenL', veeg: [0.7, 0.15], p: [[214, 64], [210, 90], [206, 112]] },
      { c: 'manenM', veeg: [0.8, 0.2], p: [[262, 110], [258, 132], [252, 156]] },
      { c: 'manenM', veeg: [0.7, 0.15], p: [[284, 58], [288, 76], [286, 98]] },
      { c: 'manenL', veeg: [0.7, 0.15], p: [[238, 46], [242, 70], [244, 96]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[262, 72], [272, 64], [284, 66], [294, 74], [300, 84], [305, 94], [309, 102], [310, 108], [305, 112], [298, 115], [290, 118], [281, 118], [272, 112], [265, 100], [261, 86]] },
      { c: 'snuit', p: [[290, 108], [300, 110], [307, 110], [303, 116], [295, 120], [286, 119], [283, 113]] },
      { c: 'licht', p: [[283, 82], [290, 80], [294, 84], [288, 86]] },
      { c: 'neus', p: [[302, 101], [308, 101], [310, 106], [306, 108], [302, 106]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'snuit', p: [[276, 114], [290, 116], [300, 116], [296, 122], [286, 124], [276, 120]] }] },
    oor: { bot: 'kop', lagen: [{ c: 'basis', p: [[264, 70], [266, 60], [272, 55], [279, 57], [281, 66], [277, 72]] }, { c: 'oorbin', p: [[268, 68], [270, 61], [274, 59], [277, 63], [275, 69]] }] },
    hum: { skin: 'hum', lagen: [{ c: 'basis', p: [[198, 80], [222, 86], [240, 104], [248, 126], [244, 146], [236, 160], [228, 168], [216, 166], [208, 146], [204, 120], [200, 100]] }] },
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[86, 92], [102, 86], [116, 98], [124, 118], [126, 138], [118, 150], [104, 156], [90, 152], [82, 138], [80, 114]] },
      { c: 'licht', p: [[119, 124], [125, 134], [126, 146], [118, 154], [112, 150], [116, 138]] }] },
  },
  POOT: {
    rad: { prof: [[-0.12, 4.8, 2.0], [0.0, 5.4, 5.0], [0.12, 5.6, 5.4], [0.35, 5.0, 4.0], [0.65, 4.0, 3.2], [0.9, 3.5, 3.2], [1.0, 3.6, 3.8], [1.1, 3.4, 2.4]], lagen: [{ c: 'licht', prof: [[0.0, -2.0, 5.2], [0.5, -1.6, 3.6], [1.0, -1.2, 3.8], [1.12, -1.2, 2.6]] }] },
    mc: { prof: [[-0.25, 3.6, 3.8], [0.0, 3.5, 3.6], [0.6, 3.3, 3.2], [1.0, 3.4, 3.3], [1.2, 2.8, 2.8]], lagen: [{ c: 'licht', prof: [[-0.3, -0.8, 4.2], [1.3, -0.6, 3.6]] }] },
    vp: { voet: true, c: 'licht', prof: [[-0.32, 2.6, 2.2], [0.0, 3.6, 2.0], [0.35, 3.4, 1.8], [0.7, 2.8, 1.5], [0.92, 1.6, 1.0], [1.02, 0.4, 0.4]] },
    schn: { prof: [[-0.12, 5.4, 4.0], [0.05, 5.8, 6.4], [0.3, 4.8, 7.0], [0.55, 3.6, 4.6], [0.85, 3.0, 3.2], [1.0, 3.2, 4.0], [1.1, 2.6, 2.6]], lagen: [{ c: 'licht', prof: [[0.2, -2.6, 7.2], [0.6, -1.4, 5.0], [1.0, -0.8, 4.2], [1.12, -0.8, 2.8]] }] },
    mt: { prof: [[-0.12, 3.0, 3.8], [0.05, 3.2, 4.2], [0.3, 3.0, 2.8], [0.8, 3.0, 2.8], [1.0, 3.2, 3.4], [1.15, 2.6, 2.6]], lagen: [{ c: 'licht', prof: [[-0.2, -0.6, 4.4], [0.5, -0.5, 3.2], [1.3, -0.4, 3.6]] }] },
    ap: { voet: true, c: 'licht', prof: [[-0.32, 2.5, 2.1], [0.0, 3.4, 1.9], [0.35, 3.3, 1.7], [0.7, 2.7, 1.4], [0.92, 1.5, 1.0], [1.02, 0.4, 0.4]] },
  },
  STAART: { w: [3.6, 3.1, 2.6, 2.3, 2.2, 2.2], kwast: [0.8, 'kwast'], kwastW: 4.6 },
  GEZICHT(ctx, pal, cm) { const O = cm([288, 87]); ctx.fillStyle = '#3A2A20'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 1.9, 1.2, -0.15, 0, 6.283); ctx.fill();
    if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + 0.15, O[1]); ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, 4.4, '#B07A2A'); ctx.restore(); }
    const M = [cm([284, 117]), cm([292, 118]), cm([300, 115])]; ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.45; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo(M[1][0], M[1][1] + 0.4, M[2][0], M[2][1]); ctx.stroke();
    ctx.strokeStyle = mixKat(pal.basis, 0.35, '#3A2416'); ctx.lineWidth = 0.4; ctx.beginPath(); const a = cm([296, 96]), b = cm([303, 100]); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(b[0], a[1], b[0], b[1]); ctx.stroke(); },
  TENEN: (ctx, k, pal, BOT) => _katTenen(ctx, k, pal, BOT, 1.6),
  HOUDING: {
    staan: { adem: 1, auto: { rek: 0.95, V: 2, A: -4, ver: { V: 9, A: 14 }, ty: -1.4, meta: [76, 84], poot: [20, 22] }, A: { rompV: 0, rompM: 180, rompA: 176, nek: -10, kop: 30, st0: 108, st1: 100, st2: 108, st3: 150 } },
    zitten: { zit: 1, autoZit: { heup: 16, rv: [-66, -30], V: 6, A: 30, ver: { V: 8, A: 6 }, ty: -1.4, meta: [84, 2], poot: [22, 4] }, A: { rompV: -60, rompM: 106, rompA: 88, nek: -30, kop: 30, st0: 110, st1: 178, st2: 184, st3: 188 } },
    liggen: { zit: 1, schaal: [null, 4.6], A: { nek: -30, kop: 26 } },
  },
  // stap: zwaaiende 'lijfwacht'-gang, kop laag; laterale volgorde, duty 0,65
  LOPEN: { basis: 'staan', S: 124, beta: 0.65, fase: { A: 0, V: 0.24, AF: 0.5, VF: 0.74 }, lift: { V: 12, A: 10 }, bob: 1.0, nx: { V: -3, A: 4 }, dy: 4, scap: 8, rol: 1.2, knik: 2.5,
    A: { nek: -2, kop: 34 }, staartZwaai: [3, 5, 8, 12],
    V: { metaS: [[0, 62], [0.5, 76], [0.82, 90], [1, 110]], metaZ: [[0, 110], [0.3, 145], [0.58, 120], [0.85, 64], [1, 62]], pootS: [[0, 20], [0.68, 20], [1, 70]], pootZ: [[0, 70], [0.3, 115], [0.6, 80], [0.86, 26], [1, 20]] },
    A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 112]], metaZ: [[0, 112], [0.35, 74], [0.62, 54], [0.86, 62], [1, 70]], pootS: [[0, 22], [0.62, 22], [1, 70]], pootZ: [[0, 70], [0.3, 92], [0.6, 50], [0.86, 26], [1, 22]] } },
};

// =====================================================================================================
// TIJGER (Panthera tigris, Bengaalse tijger). Gewrichtspunten op stap-leeuw-kat.png, tijger (onderste rij links), grond y = 662.
// Schofthoogte 100 cm (bron: 90-110 cm), kop-romp ±190 cm -> K = 189 px / 100 cm. Laag en lang, zware voorhand; borst tot ±0,36 H boven de grond.
// =====================================================================================================
const KAT_TIJGER_DEF = {
  K: 189 / 100, X0: 240, G0: 662, rand: 0.6, verMix: 0.3, verKleur: '#4A3020', dik: 1.15,
  J: { midrug: [240, 482], nekBasis: [345, 488], lend: [190, 480], kruis: [152, 484],
    kop: [398, 500], neus: [441, 540], kaak: [410, 548], kin: [432, 556],
    schoft: [328, 480], schouder: [362, 528], elleboog: [344, 590], pols: [386, 640], vkogel: [396, 652], vteen: [411, 657],
    heup: [126, 518], knie: [122, 578], hak: [62, 606], akogel: [64, 648], ateen: [80, 656],
    staart0: [142, 494], staart1: [102, 520], staart2: [78, 562], staart3: [54, 598], staart4: [26, 600] },
  PAL: { basis: '#C9792F', donker: '#B0662A', licht: '#E9DCC6', creme: '#F2EADC', streep: '#211A17', neus: '#3A2622', oorbin: '#E6D8C0', wit: '#F4EEE2' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[134, 500], [144, 484], [160, 476], [190, 473], [220, 474], [250, 477], [280, 476], [308, 469], [332, 467], [354, 480], [372, 506], [380, 534], [378, 556], [366, 574], [348, 585], [324, 588], [300, 586], [276, 580], [252, 574], [228, 572], [208, 572], [190, 574], [174, 584], [150, 590], [132, 582], [124, 558], [126, 526]] },
      { c: 'licht', p: [[379, 544], [372, 566], [354, 584], [328, 592], [300, 590], [272, 584], [248, 578], [224, 576], [204, 576], [190, 578], [196, 562], [222, 560], [250, 562], [280, 566], [310, 570], [340, 566], [362, 556]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[324, 490], [338, 472], [360, 468], [382, 472], [400, 482], [410, 502], [414, 524], [410, 544], [400, 560], [386, 574], [372, 586], [356, 576], [342, 548], [332, 516]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[388, 488], [400, 480], [414, 482], [424, 490], [432, 504], [438, 518], [443, 530], [445, 538], [442, 544], [434, 548], [424, 552], [412, 554], [400, 548], [390, 534], [386, 514]] },
      { c: 'wit', p: [[410, 528], [424, 532], [436, 536], [444, 540], [440, 548], [428, 554], [414, 556], [400, 552], [392, 540], [396, 530]] },
      { c: 'wit', p: [[412, 496], [420, 494], [426, 500], [418, 504]] },
      { c: 'neus', p: [[437, 533], [443, 533], [446, 538], [443, 541], [438, 539]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'wit', p: [[408, 550], [420, 552], [432, 552], [428, 558], [416, 560], [406, 556]] }] },
    oor: { bot: 'kop', lagen: [{ c: 'basis', p: [[392, 488], [393, 478], [398, 472], [405, 472], [408, 480], [404, 488]] }, { c: 'streep', p: [[393, 486], [394, 477], [398, 473], [400, 476], [397, 485]] }, { c: 'wit', p: [[396, 482.5], [398, 479.5], [400, 482.5], [398, 484.5]] }] },
    hum: { skin: 'hum', lagen: [{ c: 'basis', p: [[322, 482], [346, 488], [364, 506], [376, 530], [376, 556], [366, 578], [354, 596], [338, 600], [330, 576], [326, 546], [322, 512]] }] },
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[134, 498], [152, 492], [168, 506], [178, 530], [180, 556], [172, 580], [154, 592], [134, 592], [120, 578], [116, 552], [120, 520]] },] },
  },
  POOT: {
    rad: { prof: [[-0.12, 5.0, 2.0], [0.0, 5.6, 5.0], [0.12, 5.8, 5.4], [0.35, 5.0, 3.8], [0.65, 4.0, 3.0], [0.9, 3.6, 3.0], [1.0, 3.6, 3.6], [1.1, 3.4, 2.2]], lagen: [{ c: 'licht', prof: [[0.0, -2.4, 5.2], [0.5, -2.0, 3.4], [1.0, -1.6, 3.6], [1.12, -1.6, 2.4]] }] },
    mc: { prof: [[-0.25, 3.4, 3.6], [0.0, 3.3, 3.4], [0.6, 3.1, 3.0], [1.0, 3.2, 3.1], [1.2, 2.6, 2.6]], lagen: [{ c: 'licht', prof: [[-0.3, -1.0, 4.0], [1.3, -0.8, 3.6]] }] },
    vp: { voet: true, c: 'licht', prof: [[-0.32, 2.4, 2.0], [0.0, 3.4, 1.9], [0.35, 3.2, 1.7], [0.7, 2.6, 1.4], [0.92, 1.5, 1.0], [1.02, 0.4, 0.4]] },
    schn: { prof: [[-0.12, 5.2, 4.0], [0.05, 5.6, 6.2], [0.3, 4.6, 6.8], [0.55, 3.4, 4.4], [0.85, 2.8, 3.0], [1.0, 3.0, 3.8], [1.1, 2.4, 2.4]], lagen: [{ c: 'licht', prof: [[0.1, -2.4, 6.6], [0.55, -1.0, 4.8], [1.0, -0.6, 4.0], [1.12, -0.6, 2.6]] }] },
    mt: { prof: [[-0.12, 2.8, 3.6], [0.05, 3.0, 4.0], [0.3, 2.8, 2.6], [0.8, 2.8, 2.6], [1.0, 3.0, 3.2], [1.15, 2.4, 2.4]], lagen: [{ c: 'licht', prof: [[-0.2, -0.8, 4.2], [0.5, -0.6, 3.0], [1.3, -0.5, 3.4]] }] },
    ap: { voet: true, c: 'licht', prof: [[-0.32, 2.3, 1.9], [0.0, 3.2, 1.8], [0.35, 3.1, 1.6], [0.7, 2.5, 1.3], [0.92, 1.4, 1.0], [1.02, 0.4, 0.4]] },
  },
  STAART: { w: [3.8, 3.5, 3.2, 3.0, 3.0, 3.1], onder: [0.05, 0.5], onderC: 'licht', banden: [[0.3, 2.4, 'streep'], [0.42, 2.6, 'streep'], [0.54, 2.8, 'streep'], [0.66, 3.0, 'streep'], [0.77, 3.2, 'streep'], [0.87, 3.4, 'streep'], [0.975, 4.8, 'streep']] },
  TEKENING(H) { _katStrepen(H, {
    romp: { stap: 6.4, len: [0.3, 0.72], w: 1.05, krom: 0.55, seed: 5, vork: 0.45, paar: 1.9, golf: 0.18 },
    nek: { stap: 5.2, len: [0.25, 0.55], w: 0.9, krom: 0.5, seed: 15, vork: 0.3, paar: 1.6, golf: 0.15 },
    hum: { stap: 6.0, len: [0.2, 0.45], w: 0.95, seed: 25, krom: 0.4, paar: 1.6, golf: 0.15 },
    dij: { stap: 4.8, len: [0.3, 0.65], w: 0.95, seed: 35, richting: 'h', vanVoor: false, krom: 0.3 },
    rad: { stap: 5.0, len: [0.3, 0.6], w: 0.9, seed: 45, richting: 'h', vanVoor: false },
    schn: { stap: 5.0, len: [0.3, 0.6], w: 0.9, seed: 55, richting: 'h', vanVoor: false },
    kop: { stap: 3.2, len: [0.15, 0.32], w: 0.55, seed: 65, krom: 0.2 } }); },
  GEZICHT(ctx, pal, cm) { const O = cm([419, 506]); ctx.fillStyle = '#2A1E18'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 1.7, 1.05, -0.2, 0, 6.283); ctx.fill();
    if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + 0.15, O[1]); ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, 3.9, '#C8A030'); ctx.restore(); }
    ctx.strokeStyle = pal.streep; ctx.lineWidth = 0.55; ctx.lineCap = 'round'; for (const [a, b, c] of [[[404, 514], [412, 520], [420, 522]], [[402, 524], [410, 532], [418, 534]], [[422, 512], [428, 516], [432, 522]]]) { const A = cm(a), B = cm(b), Cc = cm(c); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.quadraticCurveTo(B[0], B[1], Cc[0], Cc[1]); ctx.stroke(); }
    const M = [cm([414, 552]), cm([424, 553]), cm([434, 549])]; ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo(M[1][0], M[1][1] + 0.4, M[2][0], M[2][1]); ctx.stroke(); },
  TENEN: (ctx, k, pal, BOT) => _katTenen(ctx, k, pal, BOT, 1.5),
  HOUDING: {
    staan: { adem: 1, auto: { rek: 0.95, V: 2, A: -6, ver: { V: 9, A: 14 }, ty: -1.2, meta: [76, 84], poot: [20, 22] }, A: { rompV: 0, rompM: 180, rompA: 176, nek: 0, kop: 32, st0: 120, st1: 108, st2: 116, st3: 150 } },
    zitten: { zit: 1, autoZit: { heup: 13, rv: [-64, -30], V: 6, A: 26, ver: { V: 8, A: 6 }, ty: -1.2, meta: [84, 2], poot: [22, 4] }, A: { rompV: -58, rompM: 108, rompA: 90, nek: -16, kop: 40, st0: 110, st1: 178, st2: 184, st3: 188 } },
    liggen: { zit: 1, schaal: [null, 3.9], A: { nek: -20, kop: 38 } },
  },
  LOPEN: { basis: 'staan', S: 114, beta: 0.65, fase: { A: 0, V: 0.24, AF: 0.5, VF: 0.74 }, lift: { V: 11, A: 9 }, bob: 0.9, nx: { V: -3, A: 4 }, dy: 3.5, scap: 8, rol: 1.1, knik: 2.2,
    A: { nek: 6, kop: 36 }, staartZwaai: [3, 5, 8, 12],
    V: { metaS: [[0, 62], [0.5, 76], [0.82, 90], [1, 110]], metaZ: [[0, 110], [0.3, 145], [0.58, 120], [0.85, 64], [1, 62]], pootS: [[0, 20], [0.68, 20], [1, 70]], pootZ: [[0, 70], [0.3, 115], [0.6, 80], [0.86, 26], [1, 20]] },
    A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 112]], metaZ: [[0, 112], [0.35, 74], [0.62, 54], [0.86, 62], [1, 70]], pootS: [[0, 22], [0.62, 22], [1, 70]], pootZ: [[0, 70], [0.3, 92], [0.6, 50], [0.86, 26], [1, 22]] } },
};

// =====================================================================================================
// HUISKAT (Felis catus), cyperse tabby. Gewrichtspunten op stap-leeuw-kat.png, kat lopend (onderste rij, tweede), grond y = 662.
// Schofthoogte 25 cm (bron: 23-25 cm), kop-romp ±46 cm -> K = 124 px / 25 cm. Kop relatief groot, oren spits, staart ±30 cm.
// =====================================================================================================
const KAT_HUISKAT_DEF = {
  K: 124 / 25, X0: 630, G0: 662, rand: 0.16, verMix: 0.3, verKleur: '#3A3430', dik: 1.1,
  J: { midrug: [630, 546], nekBasis: [710, 550], lend: [592, 546], kruis: [566, 550],
    kop: [736, 556], neus: [773, 572], kaak: [746, 576], kin: [766, 580],
    schoft: [700, 546], schouder: [727, 566], elleboog: [711, 612], pols: [748, 645], vkogel: [756, 652], vteen: [767, 657],
    heup: [568, 572], knie: [588, 614], hak: [530, 624], akogel: [519, 652], ateen: [530, 657],
    staart0: [558, 550], staart1: [532, 541], staart2: [517, 517], staart3: [513, 494], staart4: [522, 484] },
  PAL: { basis: '#8E8170', donker: '#6E6356', licht: '#C9BCA8', creme: '#DDD2C2', streep: '#3A322B', neus: '#C9877C', oorbin: '#D7A99A', wit: '#E8E0D2' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[552, 560], [558, 546], [572, 539], [594, 536], [620, 535], [650, 537], [680, 540], [702, 540], [718, 546], [728, 562], [732, 580], [728, 598], [716, 610], [700, 614], [682, 610], [664, 606], [646, 604], [628, 604], [612, 606], [598, 612], [580, 614], [562, 606], [552, 588]] },
      { c: 'licht', p: [[731, 588], [724, 604], [708, 614], [686, 614], [664, 610], [644, 608], [624, 608], [610, 610], [614, 600], [636, 598], [660, 600], [684, 602], [708, 600], [724, 594]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[700, 552], [712, 544], [726, 540], [740, 540], [748, 550], [750, 566], [746, 580], [738, 590], [730, 600], [722, 594], [714, 576], [706, 562]] },
      { c: 'licht', p: [[750, 572], [745, 584], [737, 594], [729, 602], [722, 596], [732, 586], [742, 576]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[728, 554], [736, 544], [748, 541], [758, 546], [765, 554], [770, 562], [774, 568], [774, 574], [770, 578], [762, 581], [752, 582], [742, 578], [733, 570]] },
      { c: 'licht', p: [[752, 570], [762, 572], [772, 573], [770, 578], [762, 582], [752, 583], [746, 578]] },
      { c: 'neus', p: [[770, 568], [774, 568], [775, 571], [772, 572]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[746, 578], [756, 579], [765, 579], [762, 583], [752, 585], [745, 582]] }] },
    oor: { bot: 'kop', lagen: [{ c: 'basis', p: [[738, 548], [741, 536, 1], [749, 524, 1], [754, 536], [756, 546]] }, { c: 'oorbin', p: [[742, 546], [744, 537], [749, 529, 1], [751, 538], [752, 545]] }] },
    oorF: { bot: 'kop', lagen: [{ c: 'donker', p: [[752, 548], [757, 538, 1], [764, 530, 1], [764, 542], [762, 550]] }] },
    hum: { skin: 'hum', lagen: [{ c: 'basis', p: [[698, 548], [714, 552], [726, 562], [732, 580], [730, 598], [722, 610], [714, 618], [706, 614], [702, 596], [700, 574], [698, 558]] }] },
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[556, 556], [570, 550], [584, 560], [594, 580], [598, 600], [594, 614], [582, 620], [566, 618], [554, 604], [550, 582]] }] },
  },
  POOT: {
    rad: { prof: [[-0.12, 1.3, 0.6], [0.0, 1.5, 1.4], [0.12, 1.5, 1.5], [0.4, 1.3, 1.0], [0.7, 1.0, 0.8], [0.9, 0.9, 0.8], [1.0, 0.9, 1.0], [1.1, 0.85, 0.6]], lagen: [{ c: 'licht', prof: [[0.0, -0.5, 1.5], [0.5, -0.4, 1.0], [1.0, -0.3, 1.0], [1.12, -0.3, 0.7]] }] },
    mc: { prof: [[-0.3, 0.9, 1.0], [0.0, 0.9, 0.95], [0.6, 0.85, 0.85], [1.0, 0.9, 0.9], [1.3, 0.7, 0.7]], lagen: [{ c: 'licht', prof: [[-0.4, -0.2, 1.1], [1.4, -0.2, 1.0]] }] },
    vp: { voet: true, c: 'licht', prof: [[-0.32, 0.7, 0.6], [0.0, 0.95, 0.55], [0.35, 0.9, 0.5], [0.7, 0.75, 0.42], [0.92, 0.45, 0.3], [1.02, 0.12, 0.12]] },
    schn: { prof: [[-0.12, 1.4, 1.0], [0.05, 1.5, 1.6], [0.3, 1.3, 1.8], [0.55, 1.0, 1.2], [0.85, 0.8, 0.85], [1.0, 0.85, 1.0], [1.1, 0.7, 0.7]], lagen: [{ c: 'licht', prof: [[0.1, -0.6, 1.8], [0.55, -0.3, 1.3], [1.0, -0.2, 1.1], [1.12, -0.2, 0.75]] }] },
    mt: { prof: [[-0.12, 0.8, 1.0], [0.05, 0.85, 1.1], [0.3, 0.8, 0.75], [0.8, 0.8, 0.75], [1.0, 0.85, 0.9], [1.15, 0.7, 0.7]], lagen: [{ c: 'licht', prof: [[-0.2, -0.2, 1.2], [0.5, -0.15, 0.9], [1.3, -0.1, 1.0]] }] },
    ap: { voet: true, c: 'licht', prof: [[-0.32, 0.7, 0.6], [0.0, 0.92, 0.55], [0.35, 0.88, 0.5], [0.7, 0.72, 0.4], [0.92, 0.42, 0.3], [1.02, 0.12, 0.12]] },
  },
  STAART: { w: [1.3, 1.15, 1.05, 1.0, 1.0, 1.0], banden: [[0.18, 0.9, 'streep'], [0.3, 0.9, 'streep'], [0.42, 1.0, 'streep'], [0.54, 1.0, 'streep'], [0.66, 1.0, 'streep'], [0.78, 1.0, 'streep'], [0.9, 1.0, 'streep'], [0.985, 1.6, 'streep']] },
  TEKENING(H) { _katStrepen(H, {
    romp: { stap: 1.55, len: [0.3, 0.7], w: 0.36, krom: 0.35, seed: 7, vork: 0.25 },
    nek: { stap: 1.3, len: [0.3, 0.55], w: 0.3, krom: 0.3, seed: 17 },
    hum: { stap: 1.6, len: [0.2, 0.45], w: 0.32, seed: 27, krom: 0.35 },
    dij: { stap: 1.4, len: [0.35, 0.7], w: 0.32, seed: 37, richting: 'h', krom: 0.25 },
    rad: { stap: 1.3, len: [0.4, 0.8], w: 0.26, seed: 47, richting: 'h' },
    schn: { stap: 1.3, len: [0.4, 0.8], w: 0.26, seed: 57, richting: 'h' },
    kop: { stap: 0.9, len: [0.15, 0.35], w: 0.16, seed: 67, krom: 0.2 } }); },
  GEZICHT(ctx, pal, cm) { const O = cm([757, 560]); ctx.fillStyle = '#2E2A24'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 0.62, 0.42, -0.1, 0, 6.283); ctx.fill();
    if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + 0.05, O[1]); ctx.scale(0.1, 0.1); dierOog(ctx, 0, 0, 4.8, '#B8B83A', { pupil: 'spleet' }); ctx.restore(); }
    const M = [cm([757, 579]), cm([763, 580]), cm([769, 577])]; ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.14; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo(M[1][0], M[1][1] + 0.12, M[2][0], M[2][1]); ctx.stroke();
    ctx.strokeStyle = 'rgba(240,236,228,0.55)'; ctx.lineWidth = 0.05; for (const d of [-0.12, 0, 0.12]) { const a = cm([766, 575]); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + 4.2, a[1] + d * 9 - 0.4); ctx.stroke(); } },
  TENEN: (ctx, k, pal, BOT) => _katTenen(ctx, k, pal, BOT, 0.42),
  HOUDING: {
    staan: { adem: 1, auto: { rek: 0.95, V: 0.5, A: -1.5, ver: { V: 2.5, A: 3.5 }, ty: -0.35, meta: [76, 84], poot: [20, 22] }, A: { rompV: 0, rompM: 180, rompA: 176, nek: -8, kop: 24, st0: 178, st1: 208, st2: 238, st3: 272 } },
    zitten: { R: [1, -15.5], zit: 1, A: { rompV: -64, rompM: 104, rompA: 86, nek: -36, kop: 24, st0: 110, st1: 175, st2: 186, st3: 190 },
      voet: { V: [8.5, -0.35, 84, 22], VF: [10, -0.35, 82, 22], A: [2.5, -0.35, 2, 4], AF: [4, -0.35, 2, 4] } },
    liggen: { R: [1, -12.5], zit: 1, A: { rompV: -4, rompM: 166, rompA: 146, nek: -46, kop: 20, st0: 100, st1: 25, st2: 2, st3: -8 },
      voet: { V: [15, -0.35, 2, 4], VF: [13, -0.35, 3, 4], A: [-3, -0.35, 4, 6], AF: [-1, -0.35, 4, 6] } },
  },
  LOPEN: { basis: 'staan', S: 27, beta: 0.64, fase: { A: 0, V: 0.22, AF: 0.5, VF: 0.72 }, lift: { V: 3.0, A: 2.4 }, bob: 0.2, nx: { V: -0.5, A: 1.0 }, dy: 1.6, scap: 8, rol: 0.8, knik: 2,
    A: { nek: -4, kop: 26, st0: 180, st1: 210, st2: 240, st3: 274 }, staartZwaai: [2, 4, 6, 8],
    V: { metaS: [[0, 62], [0.5, 74], [0.82, 88], [1, 108]], metaZ: [[0, 108], [0.3, 140], [0.58, 120], [0.85, 64], [1, 62]], pootS: [[0, 20], [0.68, 20], [1, 70]], pootZ: [[0, 70], [0.3, 110], [0.6, 80], [0.86, 26], [1, 20]] },
    A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 112]], metaZ: [[0, 112], [0.35, 72], [0.62, 52], [0.86, 62], [1, 70]], pootS: [[0, 22], [0.62, 22], [1, 70]], pootZ: [[0, 70], [0.3, 92], [0.6, 50], [0.86, 26], [1, 22]] } },
};

// tenen + klauwen op een voetdeel (schaal f t.o.v. het jachtluipaard)
function _katTenen(ctx, k, pal, BOT, f) { const b = BOT[k]; const d = [Math.cos(b.A0), Math.sin(b.A0)], s = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + s[0] * w * f, b.J0[1] + d[1] * b.L * u + s[1] * w * f];
  ctx.strokeStyle = mixKat(pal.licht, 0.45, '#1A1410'); ctx.lineWidth = 0.18 * f; ctx.lineCap = 'round'; for (const u of [0.42, 0.75]) { const a = p(u, 1.6), c = p(u + 0.05, -0.8); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); } }


// =====================================================================================================
// WRAPPERS: dezelfde namen, aanroep en schermmaat als in dieren_zoog.js (schofthoogte op het scherm gelijk, anker = midden onder het dier)
//   jachtluipaard: schoft 360·s px (80 cm)  -> 4,5·s px/cm;  leeuw: 220·s px (120 cm); tijger: 200·s px (100 cm); huiskat: 220·s px (25 cm)
// o.houding: 'staan' | 'lopen' | 'galop' (alleen jachtluipaard; ook 'rennen'/'draven') | 'zitten' | 'liggen'; o.t / o.fase (0-1), o.kijk, o.a, o.wereld
// =====================================================================================================
const _KAT_HMAP = { rennen: 'galop', draven: 'galop', sprinten: 'galop', grazen: 'staan', vechten: 'staan', huilen: 'zitten', snuffelen: 'staan' };
function _katWrap(ctx, P, x, y, pxcm, o) { if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o); if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = _KAT_HMAP[h] || h; if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = (h === 'galop' && P.GANGEN.lopen) ? 'lopen' : 'staan'; oo.houding = h;
  return P.teken(ctx, x, y, pxcm, oo); }
function jachtluipaard(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT.luipaard, x, y, s * 4.5, o); }
function luipaardIcoon(ctx, x, y, s = 0.14, kijk = 1, a = 1) { jachtluipaard(ctx, x, y, s, { kijk, a }); }
function leeuw(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT.leeuw, x, y, s * 220 / 120, o); }
function tijger(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT.tijger, x, y, s * 2.0, o); }
function huiskat(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT.huiskat, x, y, s * 8.8, o); }

// liggen van leeuw en tijger = de (goedgekeurde) lig-houding van de huiskat, geschaald
KAT_LEEUW_DEF.HOUDING.liggen.schaal[0] = KAT_HUISKAT_DEF.HOUDING.liggen; KAT_TIJGER_DEF.HOUDING.liggen.schaal[0] = KAT_HUISKAT_DEF.HOUDING.liggen;

// =====================================================================================================
// KOPPEN naar de vlakke kopplaat referentie/pop/katten/koppen.png, rij 2 (Kamiel 23 okt 2026: huiskat 'mag schattiger, niet zombieachtig',
// leeuw 'net niet realistisch', tijger 'realistischer, sterker, eleganter'). Punten in px van koppen.png; ankers: achterhoofd en neuspunt.
// =====================================================================================================
KAT_HUISKAT_DEF.KOP = { van: [[1062, 500], [1198, 566]], schaal: 1.32,
  lagen: [
    { c: 'kopM', p: [[1050, 520], [1046, 482], [1060, 456], [1082, 444], [1104, 448], [1124, 456], [1142, 464], [1157, 480], [1168, 497], [1177, 516], [1185, 537], [1193, 553], [1199, 565], [1198, 574], [1191, 582], [1187, 594], [1177, 604], [1160, 611], [1140, 613], [1118, 607], [1095, 597], [1072, 582], [1056, 556]] },
    { c: 'licht', p: [[1118, 562], [1150, 556], [1176, 560], [1193, 568], [1197, 576], [1189, 584], [1185, 596], [1173, 606], [1156, 613], [1135, 613], [1112, 605], [1100, 591], [1106, 575]] },
    { c: 'licht', p: [[1122, 512], [1134, 502], [1152, 503], [1162, 518], [1157, 536], [1140, 542], [1126, 533]] },
    { c: 'streep', veeg: [7, 1], p: [[1072, 562], [1100, 546], [1132, 540]] },
    { c: 'streep', veeg: [5.5, 1], p: [[1092, 586], [1122, 576], [1152, 580]] },
    { c: 'streep', veeg: [5, 1], p: [[1102, 496], [1122, 492], [1146, 497]] },
    { c: 'streep', veeg: [4, 0.8], p: [[1112, 474], [1130, 468], [1146, 472]] },
    { c: 'neus', p: [[1187, 563], [1197, 561], [1200, 569], [1195, 577], [1189, 572]] },
  ],
  oor: [{ c: 'kopM', p: [[1048, 474], [1068, 428], [1086, 400, 1], [1098, 434], [1108, 476]] }, { c: 'oorbin', p: [[1062, 466], [1076, 430], [1086, 412, 1], [1093, 440], [1100, 470]] }],
  oorF: [{ c: 'donker', p: [[1122, 466], [1126, 432], [1130, 408, 1], [1140, 440], [1152, 472]] }],
  oog: { c: [1141, 522], r: 12.5, iris: '#9DBE5E', pupil: 'spleet', rek: 0.92, rand: '#3A2E26' },
  lijnen: [{ c: 'mond', w: 2.2, p: [[1170, 590], [1182, 594], [1191, 584]] }, { c: '#F4EEE4', w: 1.1, p: [[1176, 578], [1205, 573], [1232, 572]] }, { c: '#F4EEE4', w: 1.1, p: [[1176, 583], [1206, 586], [1230, 594]] }, { c: '#F4EEE4', w: 1.0, p: [[1174, 588], [1200, 598], [1220, 612]] }] };
Object.assign(KAT_HUISKAT_DEF.PAL, { basis: '#A2907A', kopM: '#B7A389', donker: '#6E5D4B', licht: '#ECDABF', creme: '#F2E6D2', streep: '#5A4A3A', oorbin: '#E2BFA4', neus: '#D88270', mond: '#4A3A30' });

KAT_LEEUW_DEF.KOP = { van: [[306, 478], [452, 538]], schaal: 1.12,
  lagen: [
    { c: 'gezicht', p: [[300, 470], [322, 452], [345, 452], [368, 465], [392, 484], [414, 502], [434, 518], [448, 530], [453, 540], [449, 552], [441, 560], [441, 574], [434, 586], [424, 598], [408, 610], [390, 616], [372, 612], [356, 598], [338, 580], [318, 562], [302, 540], [295, 505]] },
    { c: 'donker', p: [[298, 520], [318, 500], [344, 506], [362, 532], [368, 562], [360, 592], [340, 580], [318, 562], [302, 540]] },
    { c: 'licht', p: [[394, 540], [420, 533], [441, 545], [441, 574], [434, 586], [420, 595], [400, 592], [385, 576], [384, 556]] },
    { c: 'creme', tand: [5, 9], p: [[394, 598], [420, 592], [438, 588], [440, 606], [432, 626], [420, 642], [404, 642], [392, 626], [386, 610]] },
    { c: 'donker', veeg: [5, 1], p: [[348, 484], [372, 478], [396, 494]] },
    { c: 'neus', p: [[425, 527], [446, 523], [454, 532], [451, 545], [442, 551], [432, 541]] },
  ],
  oor: [{ c: 'gezicht', p: [[276, 472], [270, 446], [279, 424], [298, 417], [313, 430], [315, 456], [306, 474]] }, { c: 'oorbin', p: [[284, 463], [281, 442], [291, 430], [303, 435], [305, 456]] }],
  oog: { c: [378, 500], r: 7.5, iris: '#C88A2A', rek: 1.1, rand: '#3A2416' },
  lijnen: [{ c: 'mond', w: 3, p: [[386, 600], [410, 604], [434, 590]] }, { c: '#F6EEDF', w: 1.2, p: [[420, 580], [392, 590], [362, 606]] }, { c: '#F6EEDF', w: 1.2, p: [[422, 586], [396, 600], [372, 620]] }] };
Object.assign(KAT_LEEUW_DEF.PAL, { gezicht: '#E2B074', basis: '#C99050', donker: '#B47A40', licht: '#EBC58C', creme: '#F2DDB7', neus: '#3A241C', oorbin: '#5A3A24', mond: '#3A2418',
  manenD: '#4A2F1C', manenM: '#7E4F27', manenL: '#B67A3C', manenG: '#D29A55' });

KAT_TIJGER_DEF.KOP = { van: [[688, 470], [842, 540]], schaal: 1.1,
  lagen: [
    { c: 'basis', p: [[665, 470], [680, 440], [700, 425], [722, 428], [745, 440], [768, 452], [790, 470], [810, 492], [826, 512], [840, 528], [846, 540], [842, 552], [832, 560], [830, 575], [822, 590], [812, 604], [798, 612], [778, 612], [758, 605], [738, 592], [715, 580], [695, 560], [675, 530], [665, 500]] },
    { c: 'wit', tand: [5, 10, null], p: [[705, 475], [728, 492], [742, 515], [752, 540], [775, 552], [805, 553], [832, 556], [843, 548], [846, 556], [836, 566], [833, 582], [824, 596], [812, 608], [795, 616], [772, 620], [748, 624], [728, 634], [712, 628], [698, 612], [688, 585], [686, 550], [690, 512], [696, 488]] },
    { c: 'wit', p: [[735, 462], [752, 451], [770, 457], [776, 470], [758, 473], [742, 475]] },
    { c: 'streep', veeg: [5, 0.5], p: [[756, 446], [772, 442], [790, 452]] },
    { c: 'streep', veeg: [4.5, 0.8], p: [[742, 478], [760, 480], [779, 486]] },
    { c: 'streep', veeg: [4.5, 0.6], p: [[722, 452], [736, 440], [754, 436]] },
    { c: 'streep', veeg: [6, 0.8], p: [[752, 504], [734, 512], [712, 516]] },
    { c: 'streep', veeg: [7, 0.8], p: [[762, 524], [740, 536], [712, 542]] },
    { c: 'streep', veeg: [5, 0.6], p: [[740, 540], [722, 552], [704, 552]] },
    { c: 'streep', veeg: [6, 0.8], p: [[766, 548], [744, 563], [716, 568]] },
    { c: 'streep', veeg: [5, 0.8], p: [[752, 588], [730, 598], [706, 600]] },
    { c: 'streep', veeg: [5.5, 0.8], p: [[736, 466], [716, 472], [696, 484]] },
    { c: 'streep', veeg: [2.4, 1], p: [[800, 575], [815, 572], [830, 574]] }, { c: 'streep', veeg: [2.4, 1], p: [[798, 586], [815, 584], [828, 587]] },
    { c: 'neus', p: [[826, 540], [843, 537], [849, 545], [843, 553], [832, 551]] },
  ],
  oor: [{ c: 'wit', p: [[670, 446], [667, 420], [676, 401], [692, 395], [706, 404], [709, 428], [700, 449]] }, { c: 'streep', p: [[679, 441], [679, 419], [689, 408], [698, 416], [694, 436]] }],
  oorF: [{ c: 'streep', p: [[700, 432], [707, 410], [718, 401], [727, 412], [723, 434]] }],
  oog: { c: [762, 494], r: 7.5, iris: '#D9A030', rek: 1.08, rand: '#1E1612' },
  lijnen: [{ c: 'mond', w: 2.6, p: [[792, 602], [812, 604], [832, 594]] }, { c: '#F6EEDF', w: 1.2, p: [[812, 578], [784, 584], [756, 598]] }, { c: '#F6EEDF', w: 1.2, p: [[814, 586], [788, 596], [764, 612]] }] };
Object.assign(KAT_TIJGER_DEF.PAL, { basis: '#CF7E34', donker: '#A85F24', licht: '#F2E2C6', wit: '#F4E6CC', streep: '#1E1714', neus: '#D88A7A', mond: '#2A1A14' });

// leeuwenmanen als grote gelaagde lokken (kopplaat rij 2): donker en lang aan de buitenkant/achter, goud en korter rond het gezicht; geen zaagtand
(function () { const K = KAT_LEEUW_DEF.K, F = [262, 82], h = KatPop.hsh; const L = [];
  L.push({ c: 'manenD', p: [[198, 104], [202, 80], [212, 64], [230, 52], [250, 46], [270, 46], [284, 56], [288, 72], [286, 92], [280, 112], [270, 132], [258, 148], [242, 156], [224, 154], [210, 142], [202, 124]] });
  const lok = (c, a0, a1, n, r, len0, len1, w, trek, seed) => { for (let i = 0; i < n; i++) { const u = n > 1 ? i / (n - 1) : 0.5; const a = (a0 + (a1 - a0) * u + (h(seed + i) - 0.5) * 8) * Math.PI / 180;
      const p0 = [F[0] + Math.cos(a) * r, F[1] + Math.sin(a) * r]; const rad = [Math.cos(a), Math.sin(a)]; const d0 = [rad[0] * (1 - trek) - trek * 0.8, rad[1] * (1 - trek) + trek * 0.6]; const dl = Math.hypot(d0[0], d0[1]); const d = [d0[0] / dl, d0[1] / dl];
      const Ln = len0 + (len1 - len0) * h(seed + i * 3.7); const nn = [-d[1], d[0]], k = (h(seed + i * 5.3) - 0.5) * 0.35 * Ln;
      L.push({ c, veeg: [w / K * 0.5 * (0.85 + 0.3 * h(seed + i * 2.1)), 0.15], p: [p0, [p0[0] + d[0] * Ln * 0.5 + nn[0] * k, p0[1] + d[1] * Ln * 0.5 + nn[1] * k], [p0[0] + d[0] * Ln, p0[1] + d[1] * Ln]] }); } };
  lok('manenD', -125, 135, 17, 30, 60, 84, 18, 0.72, 3);   // buitenste, donkere lokken naar achter en omlaag
  lok('manenD', 75, 125, 5, 26, 46, 62, 15, 0.45, 21);     // borstlokken
  lok('manenM', -120, -50, 6, 22, 40, 56, 14, 0.75, 7); lok('manenM', 50, 120, 5, 22, 40, 56, 14, 0.6, 8); lok('manenM', 130, 175, 3, 22, 44, 56, 14, 0.6, 9);
  lok('manenL', -135, -60, 7, 20, 40, 56, 14, 0.75, 13); lok('manenL', -110, -55, 5, 15, 30, 44, 12, 0.78, 11); lok('manenL', 55, 115, 5, 15, 30, 44, 12, 0.6, 12);
  lok('manenG', -100, -60, 4, 10, 24, 32, 10, 0.8, 17); lok('manenG', 60, 105, 4, 10, 22, 30, 10, 0.6, 18);  // goud direct rond het gezicht
  KAT_LEEUW_DEF.DELEN.manen = { skin: 'manen', vrij: 1, lagen: L }; })();
Object.assign(KAT_LEEUW_DEF, { dikV: 1.7, dikA: 1.6 });
KAT_TIJGER_DEF.KOP.schaal = 1.25; Object.assign(KAT_TIJGER_DEF, { dikV: 1.45, dikA: 1.35 });
KAT_LEEUW_DEF.KOP.schaal = 1.2;
KAT.leeuw = KatPop.maak(KAT_LEEUW_DEF);
KAT.tijger = KatPop.maak(KAT_TIJGER_DEF);
KAT.huiskat = KatPop.maak(KAT_HUISKAT_DEF);
