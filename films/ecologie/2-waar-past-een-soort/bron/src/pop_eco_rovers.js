// Ecologie v2 — rovers als uitknippop: vos (Vulpes vulpes) en Canadese lynx (Lynx canadensis, wintervacht), 29 okt 2026 (POPBRIEF.md, familie 'rovers')
// Rig = kopie van KatPop (pop_katten.js; zelf uit wolf_pop.js): zachte huid, rand in twee passes, 2-bots-IK, gangmodel met vaste steunvoet,
// ruggengraat in 3 delen. Toegevoegd: bemonsteringsstap per dier en x-rek (uit pop_honden.js, omgekeerd: de AI-figuren zijn te KORT t.o.v. de tekstbron)
// en 'sprong' = sleutelstanden met grondpunten (IK, staan vast) of vaste poothoeken (in de lucht) en een parabool voor de vluchtfase.
// Delen: romp, nek, schouder, dij, staart overgetrokken (pop/rovers/overtrek.py) uit de VLAKKE onderste rij van referentie/dieren/ecologie/<dier>.webp,
// kop = de vlakke kop-close-up rechts op de plaat (gelijkvormig afgebeeld op de figuur), onderpoten = profielen in de plaatkleuren.
// Eenheid = cm, y omlaag, grond y = 0. Aanroep: vos(ctx, x, y, s, o) / lynx(ctx, x, y, s, o) (ook ecoVos / ecoLynx): s = px per cm (zoals wolf()),
// (x, y) = grondpunt midden onder het dier; o.houding, o.t (0-1), o.kijk (±1), o.a, o.wereld, o.kopHoek, o.nekHoek.
// Laad dit bestand ná dieren_zoog.js (en eventueel pop_honden.js voor de prooimuis bij 'eten'); het verandert geen bestaande functies.

const RoverPop = (() => {
  let STAP = 0.7; // bemonsteringsstap van de vormen (cm), per dier D.stap
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
    STAP = D.stap || 0.7; const K = D.K, X0 = D.X0, G0 = D.G0; const kr = D.rek; // rek = [xa, xb, f]: lijf tussen xa en xb (plaat-px) in x uitrekken (f > 1) of krimpen (f < 1); de vlakke rij is korter dan de tekstbron
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
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, vrij: d.vrij, lagen: d.lagen.map(laag) }; }
    // taille: buikzijde van de romp tussen lies en borst iets optrekken (D.taille = [fractie, x-midden px, halve breedte px])
    if (D.taille && PREP.romp) { const [fr0, xm, hw] = D.taille, xc = cm([xm, 0])[0], w = hw / K; const yr = J.midrug[1];
      for (const l of PREP.romp.lagen) l.pts = l.pts.map(([x, y]) => { if (y <= yr) return [x, y]; const b = Math.max(0, 1 - ((x - xc) / w) ** 2); return [x, yr + (y - yr) * (1 - fr0 * b)]; }); }
    // welving (rovers): rugprofiel als y-verschuiving per x in cm [[x, dy], ...] (schoft hoger, lende lager) op romp, nek, schouder, dij; buik naar de lies via taille
    if (D.welving) { const W = D.welving, dyAt = (x) => { if (x <= W[0][0]) return W[0][1]; for (let i = 0; i < W.length - 1; i++) if (x <= W[i + 1][0]) { const u = sstep((x - W[i][0]) / (W[i + 1][0] - W[i][0])); return W[i][1] + (W[i + 1][1] - W[i][1]) * u; } return W[W.length - 1][1]; };
      const yr = J.midrug[1]; for (const k of ['romp', 'nek', 'hum', 'dij', 'staart']) if (PREP[k]) for (const l of PREP[k].lagen) l.pts = l.pts.map(([x, y]) => { const w = Math.max(0, Math.min(1, (yr + 8 - y) / 14)); return [x, y + dyAt(x) * w]; }); }
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
    if (D.KOP) { const Kp = D.KOP, [a0, a1] = Kp.van, b0 = Kp.naar ? Kp.naar[0] : D.J.kop, b1 = Kp.naar ? Kp.naar[1] : D.J.neus; const va = sub(a1, a0), vb = sub(b1, b0); const sc = len(vb) / len(va) * (Kp.schaal || 1), rt = ang(vb) - ang(va) + (Kp.draai || 0) * RAD;
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
    // klem (overgetrokken figuren): punten van schouder/dij die binnen het rompsilhouet liggen, volgen de romp i.p.v. de poot,
    // anders schuift het buik-/borstvlak van het pootdeel bij lopen naar voren-onder uit (Kamiel ronde 3: 'buik steekt naar voren')
    const ROMPB = PREP.romp && PREP.romp.lagen[0].pts; const randAfst = (v) => { let m = 1e9; for (let i = 0; i < ROMPB.length; i += 2) { const q = ROMPB[i]; m = Math.min(m, Math.hypot(q[0] - v[0], q[1] - v[1])); } return m; };
    if (D.klem && ROMPB) for (const sk of ['hum', 'dij']) { const g0 = GEW[sk], rb = sk === 'hum' ? 'rompV' : 'rompA'; GEW[sk] = (v) => { const w = g0(v); if (!binnen(v, ROMPB)) return w;
        const f = sstep(randAfst(v) / D.klem); return w.map(([b, x]) => [b, x * (1 - f)]).concat([[rb, f]]); }; }
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
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.romp || {}) })); // G.romp = romphoeken (G.A is de achterpoot)
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
    // ---- sprong / vrije beweging (muizensprong, besprong): sleutelstanden met romp, kop, staart en per poot óf een grondpunt (IK, staat vast) óf
    // vaste wereldhoeken (in de lucht). Tussen twee sleutels: romp en hoeken zacht gemengd; een poot die in beide sleutels op dezelfde plek staat
    // blijft via IK op de grond (glijdt niet); de wortel volgt in een vluchtsegment een parabool (x lineair = constante horizontale snelheid).
    const PIDX = { V: ['hum', 'rad', 'mc', 'vp'], A: ['dij', 'schn', 'mt', 'ap'] };
    function sleutelStand(k, prev) { const A = lichaam({ A: Object.assign({}, prev ? prev.Araw : {}, k.A) }); const R = [ROOT0[0] + k.R[0], k.R[1]]; const voeten = {}, ik0 = {};
      for (const L of LEGS) { const v = k.voet[L] || k.voet[L[0]]; if (v.rust != null) { const r = RUSTVOET(L); v.grond = [r[0] + v.rust, r[1], v.meta ?? r[2], v.poot ?? r[3]]; }
        if (v.grond) voeten[L] = { teen: [v.grond[0], v.grond[1] ?? D.ty ?? -0.3], meta: v.grond[2], poot: v.grond[3] }; }
      const sc = {}; for (const L of LEGS) { const v = k.voet[L] || k.voet[L[0]]; sc[L] = v.scap || 0; }
      zetBenen(R, A, voeten, sc);
      for (const L of LEGS) { const v = k.voet[L] || k.voet[L[0]]; const z = L.length > 1 ? 'F' : '', nm = PIDX[L[0]];
        if (!v.grond) { if (L[0] === 'V') A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (v.scap || 0) * RAD; v.hoek.forEach((h, i) => A[nm[i] + z] = h * RAD); }
        ik0[L] = v.grond ? { teen: voeten[L].teen.slice(), meta: v.grond[2], poot: v.grond[3] } : null; }
      return { A, R, grond: ik0, Araw: Object.assign({}, prev ? prev.Araw : {}, k.A) }; }
    const SPRONG = {}; for (const h in (D.SPRONG || {})) { const G = D.SPRONG[h]; const S = []; G.keys.forEach((k, i) => S.push(sleutelStand(k, S[i - 1]))); SPRONG[h] = { G, S }; }
    function sprong(h, t) { const { G, S } = SPRONG[h]; const ks = G.keys; t = Math.max(0, Math.min(1, t)); let i = 0; while (i < ks.length - 2 && ks[i + 1].t <= t) i++;
      const k0 = ks[i], k1 = ks[i + 1], s0 = S[i], s1 = S[i + 1]; const u = Math.max(0, Math.min(1, (t - k0.t) / Math.max(1e-6, k1.t - k0.t))), w = k0.lin ? u : sstep(u);
      const A = Object.assign({}, s0.A); mixA(A, s1.A, w, ORDE);
      let R = [lin(s0.R[0], s1.R[0], w), lin(s0.R[1], s1.R[1], w)];
      // vluchtfase: key a met vlucht = { tot: b, h } -> wortel volgt een parabool van key a naar key b (x lineair in t = constante snelheid, geen glijden in de lucht)
      for (let a = 0; a < ks.length; a++) { const V = ks[a].vlucht; if (!V) continue; const b = V.tot, ta = ks[a].t, tb = ks[b].t; if (t < ta || t > tb) continue;
        const v = (t - ta) / (tb - ta); R = [lin(S[a].R[0], S[b].R[0], v), lin(S[a].R[1], S[b].R[1], v) - 4 * V.h * v * (1 - v)]; }
      if (G.staartZwaai) for (let j = 0; j < 4; j++) A['st' + j] += G.staartZwaai[j] * RAD * Math.sin(2 * Math.PI * (t * (G.staartF || 2) - j * 0.1));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
      // poten die in beide sleutels op de grond staan: IK naar het gemengde grondpunt (vaste plek = geen glijden); anders gemengde hoeken (al in A)
      const voeten = {}; for (const L of LEGS) { const g0 = s0.grond[L], g1 = s1.grond[L]; if (g0 && g1) voeten[L] = { teen: [lin(g0.teen[0], g1.teen[0], w), lin(g0.teen[1], g1.teen[1], w)], meta: lin(g0.meta, g1.meta, w), poot: lin(g0.poot, g1.poot, w), steun: true }; }
      const sc = {}; for (const L in voeten) { const v0 = (k0.voet[L] || k0.voet[L[0]]), v1 = (k1.voet[L] || k1.voet[L[0]]); sc[L] = lin(v0.scap || 0, v1.scap || 0, w); }
      const rek = zetBenen(R, A, voeten, sc); for (const L in voeten) voeten[L].rek = rek[L];
      for (const L of LEGS) if (!voeten[L]) { const piv = fk(R, A), z = L.length > 1 ? 'F' : ''; voeten[L] = { teen: eind(piv, A, (L[0] === 'V' ? 'vp' : 'ap') + z), steun: false }; }
      return { R, A, voeten }; }
    const GANGEN = {}, SNELHEID = {};
    for (const h in (D.GANG || {})) { const G = D.GANG[h]; GANGEN[h] = G.galop ? (t) => galop(G, t) : (t) => stap(G, t); SNELHEID[h] = G.S; }
    for (const h in SPRONG) { GANGEN[h] = (t) => sprong(h, t); SNELHEID[h] = 0; }
    const EENMALIG = Object.keys(SPRONG); // niet-cyclisch: o.t wordt geklemd (0-1), niet modulo
    function stand(o) { if (o.stand) return o.stand; const h = o.houding || 'staan';
      if (GANGEN[h]) { const st = GANGEN[h](EENMALIG.includes(h) ? (o.t || 0) : fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
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
      if (G.oog) oogTeken(ctx, G.oog); }
    function oogTeken(ctx, O) { ctx.save(); ctx.translate(O.c[0], O.c[1]); ctx.rotate(O.hoek * 0.3);
      ctx.fillStyle = O.rand || '#2A201A'; ctx.beginPath(); ctx.ellipse(0, 0, O.r * 1.18 * O.rek, O.r * 1.12, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = O.iris; ctx.beginPath(); ctx.ellipse(0.05 * O.r, 0, O.r * O.rek, O.r, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = mixHex(O.iris, 0.25, '#FFF6D8'); ctx.beginPath(); ctx.ellipse(0.1 * O.r, 0.35 * O.r, O.r * 0.62 * O.rek, O.r * 0.45, 0, 0, 6.283); ctx.fill(); // lichtere onderkant iris
      ctx.fillStyle = '#120C0A'; ctx.beginPath(); if (O.pupil === 'spleet') ctx.ellipse(0.12 * O.r, 0, O.r * 0.3, O.r * 0.78, 0, 0, 6.283); else if (O.pupil === 'ovaal') ctx.ellipse(0.1 * O.r, 0, O.r * 0.42, O.r * 0.8, 0, 0, 6.283); else ctx.arc(0.12 * O.r, 0, O.r * 0.5, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.beginPath(); ctx.arc(0.42 * O.r, -0.4 * O.r, O.r * 0.2, 0, 6.283); ctx.fill(); ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fk(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    // vaste uitknipfiguur voor een stilstaande houding (overgetrokken uit de vlakke plaat): D.FIGUUR[h] = { lagen (plaat-px), x0, g0 }
    const FIG = {}; for (const h in (D.FIGUUR || {})) { const F = D.FIGUUR[h]; const cmF = (p) => [(p[0] - F.x0) / K + (D.anker || 0), (p[1] - F.g0) / K];
      FIG[h] = F.lagen.map(l => ({ c: l.c, pts: spline(l.p.map(cmF)) })); }
    function tekenFiguur(ctx, x, y, s, o, L) { ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(-(D.anker || 0), 0);
      pad(ctx, L[0].pts); ctx.strokeStyle = RANDK(PAL[L[0].c]); ctx.lineWidth = D.rand || 0.5; ctx.stroke(); pad(ctx, L[0].pts); ctx.fillStyle = PAL[L[0].c]; ctx.fill();
      ctx.save(); pad(ctx, L[0].pts); ctx.clip(); for (const l of L.slice(1)) { pad(ctx, l.pts); ctx.fillStyle = PAL[l.c]; ctx.fill(); } ctx.restore();
      const Fd = D.FIGUUR[o.houding], cmF = (p) => [(p[0] - Fd.x0) / K + (D.anker || 0), (p[1] - Fd.g0) / K];
      for (const l of (Fd.lijnen || [])) { const P = openLijn(l.p.map(cmF)); ctx.strokeStyle = l.c; ctx.lineWidth = l.w / K; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); }
      if (Fd.oog) oogTeken(ctx, Object.assign({}, Fd.oog, { c: cmF(Fd.oog.c), r: Fd.oog.r / K, hoek: 0 })); ctx.restore(); }
    function teken(ctx, x, y, s, o = {}) {
      if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas && !o.skelet) { // doorzichtig: eerst los tekenen (anders schemeren overlappende delen door elkaar)
        if ((o.a ?? 1) <= 0.01) return null; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
        k.setTransform(ctx.getTransform()); const st = teken(k, x, y, s, Object.assign({}, o, { a: 1 }));
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return st; }
      if (!o.stand && FIG[o.houding]) return tekenFiguur(ctx, x, y, s, o, FIG[o.houding]);
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400 + (D.klipGrond ?? 0.6)); ctx.clip(); }
      let VO = st.volgorde ? st.volgorde : VOLGORDE;
      const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A);
      for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
      if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
      if (D.verZonderTrace) VO = VO.filter(([k, v]) => !(v && (k === 'dij' || k === 'hum'))); // verre poot zonder overgetrokken dij/schouder (anders rafelige dubbele vlakken)
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
    return { teken, info, stand, deel, houding, fk, meng, BOT, ORDE, PREP, J, PAL, D, TEEN0, SNELHEID, GANGEN, RP, RESTA, cm, SPRONG, eind };
  }
  return { maak, kurve, vlekVorm, streep, binnen, hsh, mixHex, spline, openLijn };
})();


// <<OVERTREK_ROVERS (gegenereerd door pop/rovers/overtrek.py uit de vlakke rij van vos.webp en lynx.webp; niet met de hand aanpassen)
const ROVER_OVERTREK = {"vos":{"romp":[{"c":"basis","p":[[172,446],[167,432],[165,430],[160,430],[149,438],[117,439],[107,437],[87,437],[66,444],[60,449],[58,469],[64,478],[76,491],[91,489],[96,479],[101,475],[115,480],[133,482],[136,484],[138,491],[143,491],[157,486],[168,471],[172,457]]}],"nek":[{"c":"basis","p":[[181,409],[179,409],[171,418],[165,422],[164,425],[148,439],[148,444],[155,468],[161,474],[166,473],[172,466],[171,459],[178,448],[194,448],[192,421],[190,416]]},{"c":"wit","p":[[192,441],[175,440],[172,443],[167,455],[162,460],[161,474],[166,473],[171,467],[171,459],[178,448],[194,448]]},{"c":"wit","p":[[186,414],[182,415],[183,418],[179,426],[186,424]]}],"hum":[{"c":"basis","p":[[137,441],[135,443],[130,464],[131,476],[133,481],[140,490],[146,493],[154,493],[157,490],[158,484],[172,466],[171,455],[169,449],[165,446]]},{"c":"wit","p":[[170,453],[162,460],[162,467],[156,474],[155,482],[159,482],[171,467]]}],"dij":[{"c":"basis","p":[[94,441],[72,442],[64,445],[58,451],[57,486],[60,491],[74,503],[80,502],[87,495],[99,476],[107,475],[108,460],[96,442]]}],"staart":[{"c":"basis","p":[[63,449],[58,450],[44,462],[40,470],[33,478],[30,486],[22,497],[14,515],[13,527],[15,530],[23,529],[30,526],[35,521],[40,519],[53,505],[56,495],[58,474],[64,453]]},{"c":"wit","p":[[34,505],[23,504],[20,506],[14,521],[16,529],[28,527],[36,520],[38,512]]}],"kop":[{"c":"basis","p":[[1181,341],[1173,348],[1172,348],[1166,356],[1144,377],[1141,383],[1139,385],[1139,387],[1134,389],[1134,441],[1135,442],[1137,453],[1139,457],[1140,464],[1142,468],[1144,479],[1146,483],[1147,490],[1153,498],[1159,504],[1165,504],[1166,503],[1168,503],[1169,504],[1174,504],[1175,503],[1191,503],[1192,504],[1197,505],[1198,506],[1198,510],[1203,510],[1207,512],[1217,513],[1217,510],[1218,509],[1220,509],[1221,510],[1221,515],[1223,515],[1226,517],[1232,518],[1233,519],[1245,520],[1247,519],[1247,516],[1248,515],[1253,515],[1256,513],[1258,513],[1270,505],[1271,498],[1269,496],[1266,495],[1238,468],[1234,458],[1234,446],[1233,445],[1233,440],[1231,438],[1230,433],[1228,431],[1225,424],[1217,412],[1213,408],[1212,399],[1214,398],[1214,385],[1215,384],[1216,377],[1218,373],[1218,369],[1220,365],[1220,362],[1222,359],[1223,346],[1219,346],[1198,364],[1195,364],[1194,363],[1193,344],[1190,340],[1184,340],[1183,341]]},{"c":"licht","p":[[1263,493],[1261,493],[1260,495],[1258,495],[1258,497],[1259,497],[1260,499],[1262,499],[1265,497],[1265,495],[1264,495]]},{"c":"licht","p":[[1214,485],[1214,487],[1218,487],[1219,489],[1221,489],[1221,485],[1219,484]]},{"c":"licht","p":[[1188,478],[1188,481],[1203,482],[1203,480],[1199,478],[1194,478],[1193,479]]},{"c":"licht","p":[[1180,472],[1179,473],[1179,476],[1181,476],[1182,477],[1182,479],[1186,479],[1186,474],[1184,474],[1183,475],[1182,474],[1182,472]]},{"c":"licht","p":[[1221,446],[1221,451],[1223,452],[1223,454],[1225,454],[1226,453],[1226,450],[1223,446]]},{"c":"licht","p":[[1154,413],[1154,420],[1156,420],[1156,413]]},{"c":"licht","p":[[1209,403],[1204,401],[1197,402],[1197,411],[1195,414],[1190,414],[1190,417],[1186,419],[1186,421],[1188,421],[1191,423],[1187,425],[1186,427],[1184,427],[1184,429],[1183,430],[1180,431],[1180,433],[1181,434],[1180,435],[1178,435],[1178,438],[1177,439],[1175,439],[1174,441],[1167,442],[1167,444],[1166,445],[1160,445],[1160,447],[1159,448],[1156,449],[1154,451],[1150,452],[1150,454],[1152,455],[1151,456],[1149,456],[1143,460],[1143,462],[1147,462],[1148,463],[1143,466],[1143,470],[1144,471],[1145,478],[1150,477],[1151,478],[1151,481],[1160,481],[1162,479],[1163,475],[1169,471],[1169,468],[1170,467],[1173,467],[1173,464],[1175,462],[1177,462],[1179,460],[1182,459],[1182,455],[1184,454],[1184,452],[1183,451],[1187,449],[1187,445],[1188,443],[1190,442],[1190,440],[1192,437],[1194,436],[1194,434],[1195,433],[1197,433],[1199,429],[1201,429],[1201,427],[1202,426],[1205,426],[1206,425],[1208,427],[1210,427],[1212,423],[1215,427],[1219,427],[1220,429],[1221,429],[1226,434],[1226,438],[1229,438],[1230,439],[1230,441],[1232,441],[1230,433],[1228,431],[1225,424],[1219,415],[1217,414],[1215,410],[1209,404]]},{"c":"donker","p":[[1213,464],[1213,465],[1211,466],[1211,468],[1216,469],[1216,465],[1215,464]]},{"c":"donker","p":[[1169,473],[1169,476],[1172,476],[1173,475],[1175,475],[1175,473],[1176,472],[1178,472],[1180,470],[1182,470],[1188,466],[1190,466],[1191,465],[1197,465],[1201,462],[1205,462],[1205,460],[1203,460],[1202,459],[1203,458],[1206,458],[1211,455],[1217,455],[1218,456],[1220,456],[1221,457],[1221,460],[1226,468],[1226,470],[1225,471],[1224,470],[1222,470],[1222,473],[1223,474],[1223,476],[1226,478],[1226,483],[1227,484],[1226,489],[1227,490],[1227,494],[1229,495],[1227,498],[1228,502],[1229,503],[1233,503],[1234,501],[1239,501],[1240,499],[1241,500],[1248,501],[1248,499],[1247,499],[1246,497],[1242,494],[1243,492],[1245,492],[1245,490],[1244,489],[1242,489],[1239,486],[1234,476],[1232,474],[1232,472],[1230,469],[1230,460],[1228,460],[1227,462],[1224,460],[1225,456],[1226,455],[1228,455],[1229,450],[1227,450],[1226,454],[1224,455],[1222,453],[1219,447],[1215,445],[1214,443],[1212,443],[1211,447],[1214,449],[1216,449],[1218,451],[1217,452],[1215,451],[1208,452],[1204,455],[1202,455],[1200,457],[1197,457],[1192,461],[1187,463],[1180,468],[1176,470],[1174,470]]},{"c":"donker","p":[[1176,408],[1174,412],[1174,414],[1175,416],[1178,416],[1180,414],[1180,412],[1179,411],[1179,409],[1178,408]]},{"c":"donker","p":[[1160,405],[1160,411],[1163,411],[1163,405]]},{"c":"donker","p":[[1136,405],[1136,444],[1139,452],[1140,459],[1141,460],[1143,460],[1146,458],[1146,454],[1148,452],[1150,452],[1152,448],[1155,448],[1155,445],[1156,444],[1159,444],[1159,442],[1158,441],[1159,430],[1158,430],[1153,424],[1151,424],[1148,419],[1148,415],[1147,414],[1144,414],[1143,412],[1141,411],[1139,407],[1139,405]]},{"c":"donker","p":[[1139,396],[1137,396],[1136,397],[1136,403],[1138,403]]},{"c":"donker","p":[[1199,384],[1197,386],[1197,394],[1199,396],[1201,396],[1203,400],[1206,400],[1206,396],[1205,395],[1206,394],[1207,387],[1205,386],[1205,384],[1203,384],[1202,385],[1201,384]]},{"c":"donker","p":[[1182,369],[1180,369],[1179,371],[1180,375],[1179,376],[1178,375],[1176,375],[1176,377],[1181,378],[1181,376],[1182,375]]},{"c":"wit","p":[[1191,511],[1183,512],[1176,516],[1180,518],[1185,518],[1185,517],[1189,513],[1190,513]]},{"c":"wit","p":[[1146,478],[1146,482],[1148,486],[1149,493],[1159,504],[1165,504],[1166,503],[1168,503],[1169,504],[1174,504],[1175,503],[1191,503],[1192,504],[1197,505],[1200,507],[1202,510],[1206,510],[1209,512],[1212,512],[1213,513],[1217,513],[1217,510],[1218,509],[1220,509],[1221,511],[1223,511],[1223,508],[1224,507],[1225,508],[1225,510],[1227,512],[1226,513],[1224,513],[1224,516],[1226,517],[1226,516],[1228,515],[1229,516],[1229,518],[1232,518],[1233,519],[1234,518],[1238,520],[1245,520],[1247,519],[1247,516],[1248,515],[1253,515],[1256,513],[1258,513],[1262,511],[1264,509],[1260,501],[1256,499],[1248,499],[1247,501],[1245,500],[1239,500],[1236,502],[1232,501],[1231,503],[1229,503],[1227,499],[1228,498],[1228,494],[1227,494],[1226,492],[1224,492],[1221,489],[1217,488],[1214,486],[1209,485],[1203,482],[1188,482],[1182,478],[1182,476],[1179,476],[1178,475],[1169,476],[1163,481],[1152,481],[1151,480],[1151,477],[1147,477]]},{"c":"wit","p":[[1222,357],[1218,366],[1215,370],[1215,372],[1213,374],[1212,379],[1210,382],[1210,384],[1208,388],[1207,403],[1208,403],[1212,408],[1213,408],[1212,399],[1214,398],[1214,385],[1215,384],[1216,377],[1218,373],[1218,369],[1219,368],[1220,362],[1222,359]]},{"c":"wit","p":[[1192,347],[1188,348],[1183,354],[1182,357],[1180,359],[1178,364],[1176,366],[1167,382],[1167,384],[1163,394],[1163,410],[1162,411],[1162,420],[1161,421],[1160,420],[1160,402],[1158,402],[1158,407],[1156,412],[1156,419],[1155,420],[1155,428],[1158,430],[1163,430],[1166,427],[1167,428],[1168,434],[1170,436],[1172,436],[1173,435],[1173,428],[1174,427],[1174,423],[1176,418],[1176,416],[1174,413],[1174,410],[1172,410],[1171,411],[1170,410],[1171,408],[1171,404],[1172,403],[1172,401],[1170,400],[1171,398],[1171,392],[1172,391],[1172,387],[1173,386],[1174,381],[1176,378],[1176,376],[1179,373],[1181,369],[1183,373],[1181,375],[1181,380],[1183,381],[1181,382],[1181,384],[1183,384],[1184,385],[1183,386],[1183,388],[1182,389],[1180,389],[1180,391],[1182,392],[1181,393],[1181,398],[1179,399],[1179,401],[1180,402],[1179,403],[1178,409],[1179,410],[1179,412],[1181,413],[1178,415],[1178,421],[1185,421],[1188,418],[1190,418],[1190,415],[1191,414],[1196,414],[1197,412],[1197,402],[1196,401],[1196,396],[1197,395],[1197,393],[1196,392],[1196,371],[1198,369],[1198,367],[1197,367],[1194,363],[1194,355],[1193,354],[1193,348]]},{"c":"zwart","p":[[1271,499],[1267,497],[1265,497],[1261,500],[1261,505],[1263,509],[1265,509],[1269,505],[1270,505]]},{"c":"zwart","p":[[1202,458],[1202,460],[1204,460],[1207,464],[1209,464],[1209,461],[1208,460],[1210,458],[1212,458],[1213,459],[1212,460],[1213,464],[1215,464],[1217,459],[1218,460],[1218,463],[1216,466],[1216,468],[1226,471],[1226,467],[1221,459],[1221,456],[1219,456],[1218,455],[1210,455],[1205,458]]},{"c":"zwart","p":[[1180,373],[1178,373],[1173,383],[1172,391],[1171,392],[1171,396],[1172,397],[1171,398],[1171,401],[1172,402],[1171,409],[1173,409],[1174,410],[1176,410],[1176,409],[1178,408],[1178,404],[1180,399],[1179,393],[1180,392],[1180,390],[1182,389],[1182,384],[1180,383],[1180,378],[1179,377],[1180,376]]},{"c":"zwart","p":[[1223,348],[1211,359],[1210,359],[1201,367],[1199,367],[1197,369],[1197,385],[1199,385],[1200,384],[1201,385],[1203,385],[1204,384],[1205,385],[1205,387],[1207,387],[1208,383],[1213,373],[1215,371],[1222,358]]},{"c":"zwart","p":[[1192,343],[1187,343],[1186,344],[1184,344],[1176,351],[1175,351],[1169,359],[1147,380],[1144,386],[1142,388],[1142,390],[1140,391],[1137,406],[1139,407],[1141,411],[1141,413],[1146,414],[1148,416],[1148,420],[1150,424],[1152,424],[1152,417],[1153,416],[1153,413],[1156,407],[1156,405],[1159,400],[1160,401],[1160,407],[1162,407],[1162,399],[1163,398],[1163,394],[1164,393],[1164,390],[1166,387],[1168,380],[1179,363],[1184,353],[1190,347],[1193,349],[1193,344]]}]},"lynx":{"romp":[{"c":"basis","p":[[219,445],[206,418],[192,421],[180,427],[142,429],[89,427],[56,438],[55,464],[59,468],[82,479],[95,488],[99,488],[109,483],[119,486],[126,496],[137,495],[150,502],[156,500],[163,502],[172,494],[174,497],[174,506],[177,509],[182,509],[198,505],[213,488],[216,479]]}],"nek":[{"c":"basis","p":[[240,392],[203,418],[195,421],[189,429],[205,475],[223,492],[228,491],[237,463],[240,461],[246,461],[247,453],[253,448],[255,440],[252,407],[245,403],[245,396]]},{"c":"creme","p":[[229,451],[226,452],[227,463],[225,466],[225,477],[221,486],[223,492],[228,491],[236,467],[236,461]]},{"c":"creme","p":[[254,434],[250,434],[246,439],[243,451],[244,455],[252,449],[255,440]]}],"hum":[{"c":"basis","p":[[179,435],[175,440],[172,475],[176,509],[182,524],[201,531],[219,521],[224,508],[225,496],[230,485],[230,474],[222,442],[217,439]]}],"dij":[{"c":"basis","p":[[51,441],[46,455],[51,468],[50,509],[46,516],[48,526],[54,529],[71,530],[80,524],[92,524],[101,521],[110,515],[115,508],[114,503],[110,500],[105,500],[97,507],[95,505],[95,498],[103,485],[109,483],[117,486],[124,485],[125,475],[105,445],[98,443]]}],"staart":[{"c":"basis","p":[[63,436],[58,436],[56,438],[54,438],[49,441],[46,441],[41,439],[35,439],[32,442],[31,445],[32,453],[35,456],[37,456],[38,458],[47,458],[50,462],[50,467],[51,469],[64,468]]},{"c":"zwart","p":[[36,440],[33,443],[32,450],[34,454],[36,456],[38,456],[39,458],[45,458],[47,454],[46,442],[41,440]]}],"kop":[{"c":"basis","p":[[1191,336],[1189,338],[1191,346],[1191,359],[1189,365],[1179,376],[1171,380],[1159,390],[1150,395],[1150,471],[1165,521],[1173,521],[1176,523],[1176,528],[1178,530],[1186,528],[1187,533],[1195,538],[1232,533],[1246,529],[1262,512],[1265,506],[1265,502],[1251,479],[1248,462],[1249,452],[1242,436],[1214,404],[1216,396],[1213,364],[1217,354],[1218,343],[1214,341],[1210,344],[1210,355],[1208,357],[1207,363],[1204,368],[1199,369],[1197,366],[1197,338],[1195,336]]},{"c":"creme","p":[[1182,525],[1186,527],[1189,530],[1189,534],[1195,538],[1219,535],[1222,533],[1222,529],[1225,526],[1230,526],[1233,524],[1245,524],[1251,522],[1255,518],[1255,512],[1252,509],[1241,510],[1230,508],[1226,506],[1212,506],[1211,507],[1204,506],[1201,512],[1197,516],[1186,518],[1183,521]]},{"c":"zwart","p":[[1180,399],[1178,399],[1173,405],[1172,410],[1173,416],[1172,428],[1175,429],[1177,425],[1182,424],[1181,419],[1183,410]]},{"c":"zwart","p":[[1215,347],[1211,350],[1211,356],[1207,367],[1201,372],[1199,372],[1197,367],[1198,348],[1197,343],[1193,341],[1192,342],[1191,365],[1180,377],[1178,377],[1177,379],[1169,383],[1162,391],[1156,403],[1156,407],[1150,422],[1150,444],[1154,448],[1158,447],[1155,440],[1155,430],[1157,421],[1162,415],[1163,408],[1168,397],[1173,390],[1193,371],[1198,372],[1202,385],[1203,395],[1204,396],[1206,395],[1208,383],[1213,371],[1213,364],[1217,353],[1217,350]]}]}};
// OVERTREK_ROVERS>>

// <<DIEREN
// =====================================================================================================
// gedeelde tekenhulp: tenen (lijntjes + klauwtjes bij de vos; bij de lynx ronde tenen zonder zichtbare nagels: die zijn teruggetrokken)
function _roverTenen(ctx, k, pal, BOT, f, klauw) { const b = BOT[k]; const d = [Math.cos(b.A0), Math.sin(b.A0)], s = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + s[0] * w * f, b.J0[1] + d[1] * b.L * u + s[1] * w * f];
  ctx.strokeStyle = RoverPop.mixHex(pal[klauw ? 'zwart' : 'creme'] || pal.basis, 0.45, '#120E0C'); ctx.lineWidth = 0.16 * f; ctx.lineCap = 'round';
  for (const u of [0.5, 0.78]) { const a = p(u, 1.3), c = p(u + 0.03, -0.55); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); }
  if (klauw) { ctx.fillStyle = '#1A1512'; for (const u of [0.9, 1.02]) { const a = p(u - 0.06, -0.1), c = p(u + 0.08, -0.6), e = p(u - 0.02, -0.7); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(e[0], e[1]); ctx.closePath(); ctx.fill(); } } }
const _rovt = (dier, deel, skin) => ({ skin, lagen: ROVER_OVERTREK[dier][deel].map(l => ({ c: l.c, p: l.p })) });

// =====================================================================================================
// VOS (Vulpes vulpes). Gewrichtspunten op vos.webp, VLAKKE onderste rij, eerste figuur (staan), grond y = 534 px.
// Maten (tekstbron wint): schofthoogte 35-40 cm (brief; bilderreich-factsheet 35-50) -> 38 cm; kop-romp 60-75 cm (factsheet 45-90); staart 35-45 cm (30-55,5).
// K = 101 px / 38 cm. De plaatfiguur is te kort (neus-staartwortel 148 px = 56 cm, horizontaal ±0,9 x kop-romp) -> romp x 1,12 (rek 72-158 px).
// Botten (plaat, na kruiscontrole): scapula 10, humerus 11,4 (bron GL 11,4-13,7: Iliopoulou e.a., Ann. Naturhist. Mus. Wien 120A), radius 11,1 (bron 10,7-13,0),
// middenhand 4,3, voorvoet 4,6; femur 12,5, tibia 14,5, middenvoet 8,1, achtervoet 5,1 cm (achtervoet hak-teen 13,2; bron 12-18,5).
// =====================================================================================================
const VOS_DEF = {
  K: 101 / 38, X0: 110, G0: 534, rand: 0.28, welving: [[-26, 0.4], [-14, 0.9], [-4, 0.2], [8, -0.5], [17, -1.3], [24, -0.6]], taille: [0.13, 98, 26], stap: 0.3, verMix: 0.3, verKleur: '#3A2A20', klem: 3, rek: [72, 158, 1.12], klipGrond: 0.3, verZonderTrace: true,
  J: { midrug: [110, 450], nekBasis: [160, 447], lend: [85, 451], kruis: [65, 455],
    kop: [185, 426], neus: [209.5, 446], kaak: [190, 441], kin: [204, 449],
    schoft: [151, 444], schouder: [163, 467], elleboog: [143, 489], pols: [143, 518], vkogel: [145, 529], vteen: [156, 534],
    heup: [72, 465], knie: [96, 487], hak: [64, 507], akogel: [67, 528], ateen: [79, 534],
    staart0: [66, 454], staart1: [51, 469], staart2: [38, 487], staart3: [25, 505], staart4: [12, 524] },
  PAL: { basis: '#BE6E37', donker: '#9C5A2F', licht: '#CB7C42', wit: '#EEE5DA', schaduw: '#D8C8B8', zwart: '#2D2723', bruin: '#6E4A33', creme: '#E9DCCB', klauw: '#1A1512' },
  DELEN: { romp: { skin: 'romp', lagen: _rovt('vos', 'romp', 'romp').lagen.concat([{ c: 'wit', p: [[104, 488], [124, 490], [144, 489], [156, 485], [163, 480], [162, 490], [148, 499], [124, 499], [104, 496]] }]) }, nek: _rovt('vos', 'nek', 'nek'), hum: _rovt('vos', 'hum', 'hum'), dij: _rovt('vos', 'dij', 'dij'), staart: _rovt('vos', 'staart', 'staart') },
  // onderpoten als profielen [u, voor, achter] (cm): oranjerood boven, zwarte 'kousen' vanaf de onderarm / het onderbeen (plaat), zwarte voeten
  POOT: {
    rad: { prof: [[-0.2, 1.6, 1.2], [0.0, 1.75, 1.6], [0.2, 1.5, 1.4], [0.45, 1.25, 1.1], [0.8, 1.15, 1.0], [1.0, 1.15, 1.15], [1.1, 1.05, 0.85]], lagen: [{ c: 'bruin', prof: [[0.12, -0.3, 0.9], [0.3, 0.6, 1.4], [0.45, 3, 3], [1.3, 3, 3]] }, { c: 'zwart', prof: [[0.26, -0.4, 0.7], [0.42, 0.7, 1.3], [0.56, 3, 3], [1.3, 3, 3]] }] },
    mc: { c: 'zwart', prof: [[-0.3, 1.15, 1.1], [0.0, 1.1, 1.05], [1.0, 1.1, 1.05], [1.3, 0.95, 0.95]] },
    vp: { voet: true, c: 'zwart', prof: [[-0.45, 0.95, 0.8], [-0.1, 1.35, 0.75], [0.3, 1.3, 0.7], [0.7, 1.05, 0.55], [0.92, 0.65, 0.4], [1.03, 0.2, 0.2]] },
    schn: { prof: [[-0.15, 2.5, 2.0], [0.05, 2.7, 2.8], [0.3, 2.1, 2.4], [0.6, 1.35, 1.5], [0.85, 1.1, 1.2], [1.0, 1.2, 1.4], [1.1, 1.0, 1.0]], lagen: [{ c: 'bruin', prof: [[0.38, 0.9, -0.3], [0.55, 1.5, 0.6], [0.68, 3, 3], [1.3, 3, 3]] }, { c: 'zwart', prof: [[0.52, 0.8, -0.3], [0.66, 1.4, 0.7], [0.78, 3, 3], [1.3, 3, 3]] }] },
    mt: { c: 'zwart', prof: [[-0.12, 1.15, 1.4], [0.05, 1.2, 1.5], [0.3, 1.1, 1.1], [0.8, 1.1, 1.05], [1.0, 1.15, 1.15], [1.18, 0.95, 0.95]] },
    ap: { voet: true, c: 'zwart', prof: [[-0.45, 0.95, 0.8], [-0.1, 1.3, 0.75], [0.3, 1.25, 0.7], [0.7, 1.0, 0.55], [0.92, 0.62, 0.4], [1.03, 0.2, 0.2]] },
  },
  TENEN: (ctx, k, pal, BOT) => _roverTenen(ctx, k, pal, BOT, 0.75, true),
  // kop = vlakke close-up (rechts op de plaat) 1:1, gelijkvormig afgebeeld: oortop (1190, 340,5) en neuspunt (1271, 500) -> figuur (kleinste kwadraten over
  // oortoppen, oog, neus en mondhoek: schaal 0,262, draai -4,2°, restfout < 1 px)
  KOP: { van: [[1190, 340.5], [1271, 500]], naar: [[185.26, 405.04], [209.5, 445.17]], schaal: 1.0, lagen: ROVER_OVERTREK.vos.kop,
    oog: { c: [1209, 460], r: 5.2, iris: '#C9902E', pupil: 'ovaal', rek: 1.15, rand: '#2A1E16' },
    lijnen: [{ c: '#2A1E16', w: 1.6, p: [[1206, 500], [1232, 506], [1258, 508]] }] },
  HOUDING: {
    staan: { adem: 1, ver: { V: 3.5, A: 6 } },
  },
};
// =====================================================================================================
// CANADESE LYNX (Lynx canadensis), wintervacht. Gewrichtspunten op lynx.webp, VLAKKE onderste rij, eerste figuur (staan), grond y = 592 px.
// Maten: schofthoogte 48-56 cm (Wikipedia 'Canada lynx') -> 52 cm; kop-romp 76-106 cm (wildcatconservation.org); staart 5-13 cm met geheel zwarte punt;
// oorpluimen ±4 cm; poten tot 10 cm breed; achterpoten langer dan voorpoten (rug helt naar voren). K = 179 px / 52 cm.
// Plaatfiguur te kort/hoog (neus-staartwortel 215 px = 62 cm; doel ±0,9 x 82 = 74 cm) -> romp x 1,25 (rek 75-195 px).
// Botten (plaat): scapula 13,9, humerus 12,6, radius 15,7, middenhand 4,1, voorvoet 6,2; femur 15,2, tibia 15,8, middenvoet 8,8, achtervoet 6,9 cm.
// =====================================================================================================
const LYNX_DEF = {
  K: 179 / 52, X0: 130, G0: 592, rand: 0.4, stap: 0.35, verMix: 0.42, verKleur: '#2A2726', welving: [[-34, -0.6], [-22, -1.4], [-10, -1.0], [2, -0.2], [12, 0.4], [22, 0.0], [32, -0.6]], taille: [0.12, 112, 34], klem: 4, rek: [75, 195, 1.25], klipGrond: 0.4, verZonderTrace: true, dikA: 1.0, dikV: 1.0,
  J: { midrug: [130, 445], nekBasis: [205, 440], lend: [95, 447], kruis: [62, 449],
    kop: [240, 410], neus: [274, 432], kaak: [248, 432], kin: [266, 441],
    schoft: [198, 432], schouder: [216, 474], elleboog: [196, 512], pols: [198, 566], vkogel: [201, 580], vteen: [222, 592],
    heup: [74, 466], knie: [104, 510], hak: [62, 546], akogel: [80, 581], ateen: [101, 592],
    staart0: [63, 446], staart1: [55, 446], staart2: [47, 447], staart3: [40, 448], staart4: [33, 450] },
  PAL: { basis: '#A0958E', donker: '#867D78', licht: '#B2A8A1', creme: '#DCD2C9', vlek: '#57504B', streep: '#3E3938', zwart: '#1E1C1B', mid: '#7A716C', klauw: '#3A3634', neus: '#B98A80' },
  DELEN: { romp: _rovt('lynx', 'romp', 'romp'), nek: _rovt('lynx', 'nek', 'nek'), hum: _rovt('lynx', 'hum', 'hum'), staart: _rovt('lynx', 'staart', 'staart'),
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[48, 450], [68, 442], [90, 450], [104, 470], [111, 492], [110, 510], [102, 521], [90, 524], [78, 518], [64, 506], [52, 490], [45, 470]] }] } },
  POOT: { // dikke, harige poten in de romptint (geen losse blokken), zeer grote ronde voeten (sneeuwschoenen) met een bolle bovenkant
    rad: { prof: [[-0.32, 3.8, 3.4], [-0.1, 3.7, 3.5], [0.15, 3.3, 3.1], [0.45, 2.9, 2.6], [0.8, 2.7, 2.4], [1.0, 2.8, 2.6], [1.12, 2.6, 2.1]] },
    mc: { prof: [[-0.3, 2.7, 2.4], [0.0, 2.7, 2.4], [1.0, 2.8, 2.4], [1.3, 2.6, 2.2]] },
    vp: { voet: true, prof: [[-0.6, 2.4, 2.0], [-0.3, 3.4, 2.0], [0.05, 4.0, 1.9], [0.4, 4.0, 1.8], [0.7, 3.4, 1.6], [0.92, 2.2, 1.3], [1.05, 0.6, 0.6]], lagen: [{ c: 'licht', prof: [[-0.6, -1.0, 2.1], [0.4, -1.0, 1.9], [1.1, -0.2, 1.0]] }] },
    schn: { prof: [[-0.22, 4.2, 4.0], [0.05, 4.0, 4.0], [0.4, 3.3, 3.4], [0.8, 2.7, 2.8], [1.0, 2.6, 2.8], [1.14, 2.3, 2.2]] },
    mt: { prof: [[-0.18, 2.6, 2.7], [0.1, 2.4, 2.5], [0.8, 2.4, 2.4], [1.0, 2.6, 2.6], [1.18, 2.4, 2.4]] },
    ap: { voet: true, prof: [[-0.6, 2.3, 2.0], [-0.3, 3.3, 2.0], [0.05, 3.9, 1.9], [0.4, 3.9, 1.8], [0.7, 3.3, 1.6], [0.92, 2.1, 1.3], [1.05, 0.6, 0.6]], lagen: [{ c: 'licht', prof: [[-0.6, -1.0, 2.1], [0.4, -1.0, 1.9], [1.1, -0.2, 1.0]] }] },
  },
  TEKENING({ PREP, vlekVorm, binnen, hsh }) { // kleine donkere vlekjes op de onderpoten (plaat), vast op het bot
    for (const [k, dmin, r0, r1, seed] of [['rad', 4.5, 0.45, 0.6, 51], ['schn', 5, 0.5, 0.65, 61]]) {
      const D = PREP[k]; if (!D) continue; const B = D.lagen[0].pts; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const p of B) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
      const P = []; for (let i = 0; i < 3000 && P.length < 3; i++) { const p = [x0 + hsh(seed + i * 1.37) * (x1 - x0), y0 + hsh(seed + i * 2.91 + 5) * (y1 - y0)]; if (!binnen(p, B) || P.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < dmin)) continue; P.push(p); }
      for (const p of P) D.lagen.push({ c: 'donker', pts: vlekVorm(p, r0 + (r1 - r0) * hsh(seed + p[0]), seed + p[0] * 3, 1.4, 1.2) }); } },
  TENEN(ctx, k, pal, BOT) { const b = BOT[k], d = [Math.cos(b.A0), Math.sin(b.A0)], sn = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + sn[0] * w, b.J0[1] + d[1] * b.L * u + sn[1] * w];
    ctx.strokeStyle = RoverPop.mixHex(pal.licht, 0.35, '#3A3634'); ctx.lineWidth = 0.32; ctx.lineCap = 'round'; for (const u of [0.66, 0.86]) { const a = p(u, -1.2), c = p(u + 0.02, 0.2); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo((a[0] + c[0]) / 2 + d[0] * 0.4, (a[1] + c[1]) / 2 + d[1] * 0.4, c[0], c[1]); ctx.stroke(); } },
  KOP: { van: [[1193.75, 335], [1265, 502.5]], naar: [[242.6, 369.0], [277.6, 435.5]], schaal: 1.0, lagen: ROVER_OVERTREK.lynx.kop.concat([
      { c: 'creme', p: [[1214, 486], [1240, 482], [1262, 494], [1268, 508], [1258, 524], [1236, 534], [1206, 538], [1186, 528], [1196, 508]] },
      { c: 'zwart', veeg: [3.4, 1.2], p: [[1200, 476], [1178, 486], [1160, 506], [1150, 528]] }, { c: 'zwart', veeg: [3.0, 1.0], p: [[1206, 500], [1186, 514], [1172, 536]] }]), // ×1,15 rond het kopmidden (coördinator: kop te klein t.o.v. de plaat)
    oog: { c: [1226, 466], r: 4.6, iris: '#B5AE5C', pupil: 'ovaal', rek: 1.15, rand: '#262220' },
    lijnen: [{ c: '#2E2A28', w: 1.6, p: [[1214, 522], [1236, 526], [1254, 519]] }] },
  HOUDING: {
    staan: { adem: 1, ver: { V: 5, A: -4 } },
  },
};
const ECO_ROVER = {};
ECO_ROVER.vos = RoverPop.maak(VOS_DEF);
ECO_ROVER.lynx = RoverPop.maak(LYNX_DEF);

// =====================================================================================================
// GANGEN. Stap/draf: laterale stap (A 0 · V 0,25 · AF 0,5 · VF 0,75) en diagonale draf (A+VF, AF+V), sleutelkrommen van poot-hoeken uit de wolf/honden
// (canide) en uit de katten (felide). Duty: stap 0,64-0,68, draf 0,40-0,44 (Hildebrand 1965; Maes e.a. 2008). Sluipen = trage stap met laag lijf (duty 0,78):
// Rode vos 'stalk' (wildlifeonline.me.uk): langzaam, kop en staart laag; Canadese lynx sluipt met de buik bij de grond, achterpoten onder het lijf.
// =====================================================================================================
const _RV_KRV = {
  stap: { V: { metaS: [[0, 62], [0.5, 72], [0.82, 86], [1, 104]], metaZ: [[0, 104], [0.32, 128], [0.58, 116], [0.85, 70], [1, 62]], pootS: [[0, 22], [0.68, 22], [1, 72]], pootZ: [[0, 72], [0.3, 100], [0.6, 88], [0.86, 28], [1, 22]] },
          A: { metaS: [[0, 74], [0.5, 84], [0.82, 98], [1, 110]], metaZ: [[0, 110], [0.35, 70], [0.62, 52], [0.86, 64], [1, 74]], pootS: [[0, 24], [0.62, 24], [1, 68]], pootZ: [[0, 68], [0.3, 92], [0.6, 52], [0.86, 28], [1, 24]] } },
  draf: { V: { metaS: [[0, 58], [0.5, 74], [0.8, 92], [1, 112]], metaZ: [[0, 112], [0.3, 160], [0.55, 150], [0.82, 40], [1, 58]], pootS: [[0, 22], [0.6, 22], [1, 80]], pootZ: [[0, 80], [0.3, 140], [0.6, 95], [0.85, 12], [1, 22]] },
          A: { metaS: [[0, 64], [0.5, 84], [0.8, 104], [1, 122]], metaZ: [[0, 122], [0.35, 70], [0.62, 48], [0.86, 50], [1, 64]], pootS: [[0, 24], [0.55, 24], [1, 110]], pootZ: [[0, 110], [0.3, 100], [0.6, 55], [0.86, 14], [1, 24]] } },
  sluip: { V: { metaS: [[0, 50], [0.5, 66], [0.82, 80], [1, 96]], metaZ: [[0, 96], [0.32, 120], [0.58, 106], [0.85, 58], [1, 50]], pootS: [[0, 18], [0.7, 18], [1, 60]], pootZ: [[0, 60], [0.3, 90], [0.6, 70], [0.86, 22], [1, 18]] },
           A: { metaS: [[0, 56], [0.5, 70], [0.82, 84], [1, 96]], metaZ: [[0, 96], [0.35, 60], [0.62, 44], [0.86, 50], [1, 56]], pootS: [[0, 20], [0.64, 20], [1, 60]], pootZ: [[0, 60], [0.3, 84], [0.6, 46], [0.86, 24], [1, 20]] } },
};
function _rvStap(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.66, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: lift, A: lift * 0.85 }, bob: S * 0.008, nx: { V: 0, A: S * 0.03 }, dy: S * 0.015, scap: 8, rol: 0.8, knik: 2,
  staartZwaai: [2, 3, 4, 5] }, _RV_KRV.stap, o); }
function _rvDraf(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.42, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: lift, A: lift * 0.75 }, bob: S * 0.01, nx: { V: S * 0.05, A: S * 0.05 }, dy: S * 0.02, scap: 11, rol: 1.0, knik: 1.5,
  staartZwaai: [2, 3, 4, 5] }, _RV_KRV.draf, o); }
function _rvSluip(S, lift, dy, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.78, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: lift, A: lift * 0.8 }, bob: 0.15, nx: { V: 1, A: 1 }, dy, scap: 6, rol: 0.4, knik: 0.6,
  staartZwaai: [1, 1, 1, 1] }, _RV_KRV.sluip, o); }

// ---- vos ----
VOS_DEF.HOUDING.staan.ver = { V: 6, A: 5 };
VOS_DEF.GANG = {
  lopen: _rvStap(40, 4.2, { romp: { nek: -36, kop: 36 } }),
  draven: _rvDraf(62, 6.5, { romp: { nek: -24, kop: 42, st0: 150, st1: 156, st2: 160, st3: 164 } }), // plaat: kop iets lager en vooruit, staart hoger
  sluipen: _rvSluip(30, 3.0, 5.5, { romp: { rompV: 4, rompM: 181, rompA: 172, nek: 4, kop: 48, st0: 165, st1: 170, st2: 172, st3: 175 } }), // plaat: kop op ruglijn, neus vooruit, staart horizontaal
};
// eten: kop omlaag naar een prooi tussen de voorpoten (plaat heeft geen eet-figuur; houding uit de sluip-/snuffelstand van de wolf)
VOS_DEF.HOUDING.eten = { R: [0, -29.5], A: { rompV: 10, rompM: 180, rompA: 166, nek: 58, kop: 108, st0: 150, st1: 140, st2: 136, st3: 134 }, voet: { V: [20.5, -0.3, 82, 22], VF: [25, -0.3, 80, 22], A: [-13, -0.3, 82, 25], AF: [-8, -0.3, 82, 25] }, prooi: 1 };
// muizensprong (Henry 1986 via wildlifeonline: zet af onder ±40°, landt met de voorpoten eerst, lijf soms bijna verticaal; prooi wordt met de voorpoten vastgedrukt).
// Plaat (5e figuur): boog in de lucht, voorpoten gebogen onder de borst, kop omlaag; achterpoten hangen. Sleutels: t = fase 0-1 (eenmalig).
VOS_DEF.SPRONG = { muizensprong: { staartZwaai: [2, 3, 4, 5], staartF: 1, keys: [
  { t: 0.0, R: [0, -31.6], A: { rompV: -4, rompM: 178, rompA: 168, nek: -40, kop: 40, st0: 140, st1: 132, st2: 130, st3: 128 }, voet: { V: { rust: 0 }, VF: { rust: 6 }, A: { rust: 0 }, AF: { rust: 5 } } },
  { t: 0.18, R: [-2, -26], A: { rompV: -12, rompM: 176, rompA: 162, nek: -50, kop: 62, st0: 150, st1: 144, st2: 140, st3: 136 }, voet: { V: { rust: 0, meta: 70 }, VF: { rust: 6, meta: 70 }, A: { rust: 0, meta: 58 }, AF: { rust: 5, meta: 58 } } },
  { t: 0.32, R: [10, -40], A: { rompV: -40, rompM: 144, rompA: 134, nek: -62, kop: 44, st0: 132, st1: 138, st2: 146, st3: 154 }, vlucht: { tot: 4, h: 36 },
    voet: { V: { hoek: [118, 70, 80, 110], scap: -4 }, VF: { hoek: [114, 64, 74, 104], scap: -4 }, A: { rust: 2, meta: 118, poot: 116 }, AF: { rust: 6, meta: 118, poot: 116 } } },
  { t: 0.55, R: [55, -80], A: { rompV: 20, rompM: 186, rompA: 160, nek: 46, kop: 100, st0: 158, st1: 162, st2: 166, st3: 172 }, // boog: lende hoogst, kop en staart lager (plaat)
    voet: { V: { hoek: [118, 70, 128, 150], scap: 6 }, VF: { hoek: [114, 66, 124, 146], scap: 6 }, A: { hoek: [92, 146, 108, 96] }, AF: { hoek: [88, 142, 104, 92] } } }, // voorpoten gevouwen onder de borst, achterpoten hangen
  { t: 0.78, R: [92, -38], A: { rompV: 50, rompM: 228, rompA: 214, nek: 78, kop: 120, st0: 222, st1: 214, st2: 200, st3: 190 },
    voet: { V: { grond: [118, -0.3, 78, 18] }, VF: { grond: [123, -0.3, 78, 18] }, A: { hoek: [104, 150, 116, 80] }, AF: { hoek: [100, 146, 112, 76] } } },
  { t: 1.0, R: [92, -27], A: { rompV: 16, rompM: 184, rompA: 166, nek: 64, kop: 112, st0: 150, st1: 140, st2: 136, st3: 134 },
    voet: { V: { grond: [118, -0.3, 78, 18] }, VF: { grond: [123, -0.3, 78, 18] }, A: { grond: [77, -0.3, 74, 26] }, AF: { grond: [82, -0.3, 74, 26] } } },
] } };

// ---- lynx ----
LYNX_DEF.HOUDING.staan.ver = { V: 6, A: -9 };
const _LX_V = { metaS: [[0, 62], [0.5, 74], [0.82, 88], [1, 108]], metaZ: [[0, 108], [0.3, 140], [0.58, 120], [0.85, 64], [1, 62]], pootS: [[0, 28], [0.68, 28], [1, 70]], pootZ: [[0, 70], [0.3, 110], [0.6, 80], [0.86, 30], [1, 28]] };
const _LX_A = { metaS: [[0, 72], [0.5, 84], [0.82, 98], [1, 112]], metaZ: [[0, 112], [0.35, 72], [0.62, 52], [0.86, 62], [1, 72]], pootS: [[0, 24], [0.62, 24], [1, 70]], pootZ: [[0, 70], [0.3, 92], [0.6, 50], [0.86, 26], [1, 24]] };
LYNX_DEF.GANG = {
  // stap: katachtigen 0,6-0,7 duty, laterale volgorde; pas ±1,5 x schofthoogte; kop iets lager dan in staan (plaat 2e figuur)
  lopen: { basis: 'staan', S: 62, beta: 0.64, fase: { A: 0, V: 0.24, AF: 0.5, VF: 0.74 }, lift: { V: 7, A: 6 }, bob: 0.5, nx: { V: -1, A: 3 }, dy: 2.4, scap: 8, rol: 0.8, knik: 2,
    romp: { nek: -30, kop: 34 }, staartZwaai: [3, 4, 5, 6], V: _LX_V, A: _LX_A },
  sluipen: _rvSluip(48, 6, 10, { romp: { rompV: 8, rompM: 184, rompA: 186, nek: -8, kop: 34 }, V: _RV_KRV.sluip.V, A: _RV_KRV.sluip.A, scap: 10 }), // plaat: schoft steekt boven de rug, buik laag, kop vooruit
  // sprint / bounding (sneeuwschoenhaas-jacht): halve sprong (half-bound): achterpoten bijna samen (A 0,52 · AF 0,56), voorpoten na elkaar (VF 0 · V 0,1);
  // gebogen en gestrekte zweeffase zoals de roterende galop van het jachtluipaard (Hildebrand 1959), maar trager en met kleinere pas. Duty 0,28.
  sprinten: { galop: 1, S: 175, beta: { V: 0.28, A: 0.3 }, fase: { VF: 0.0, V: 0.1, A: 0.52, AF: 0.56 }, nx: { V: 32, A: -22 }, ty: { V: -0.4, A: -0.4 }, scap: 14,
    am0: { V: -0.7, A: -1.2 }, am1: { V: -2.2, A: -1.2 }, fold: { V: [[0, 0], [0.22, 15], [0.45, 6], [0.65, 0], [1, 0]], A: [[0, 0], [0.3, 14], [0.6, 8], [0.9, 1], [1, 0]] },
    flex: [[0, 0.45], [0.1, 0.55], [0.3, 0.95], [0.45, 1.0], [0.58, 0.75], [0.74, 0.25], [0.88, 0.0], [1.0, 0.45]],
    Ry: [[0, -38.6], [0.16, -38.6], [0.3, -42], [0.45, -44.5], [0.6, -42], [0.75, -40], [0.88, -39.2], [1, -38.6]],
    gestrekt: { rompV: -2, rompM: 182, rompA: 186, nek: -18, kop: 30, st0: 172, st1: 170, st2: 168, st3: 166 },
    gebogen: { rompV: 10, rompM: 168, rompA: 150, nek: -26, kop: 28, st0: 160, st1: 158, st2: 156, st3: 154 },
    staartZwaai: [3, 3, 3, 3],
    V: { metaS: [[0, 50], [0.5, 80], [1, 120]], metaZ: [[0, 120], [0.18, 160], [0.42, 120], [0.65, 35], [0.85, 30], [1, 50]], pootS: [[0, 18], [0.55, 18], [1, 85]], pootZ: [[0, 85], [0.2, 140], [0.45, 70], [0.7, 15], [1, 18]] },
    A: { metaS: [[0, 62], [0.5, 92], [1, 130]], metaZ: [[0, 130], [0.3, 108], [0.6, 82], [0.85, 58], [1, 62]], pootS: [[0, 20], [0.6, 20], [1, 100]], pootZ: [[0, 100], [0.3, 70], [0.6, 35], [0.85, 16], [1, 20]] } },
};
// besprong: vanuit de sluiphouding hurken, afzetten met beide achterpoten, voorpoten ver vooruit gestrekt (plaat 4e figuur = gestrekte sprong), landen op de voorpoten
LYNX_DEF.SPRONG = { besprong: { staartZwaai: [2, 2, 2, 2], staartF: 1, keys: [
  { t: 0.0, R: [0, -33], A: { rompV: 6, rompM: 186, rompA: 194, nek: -14, kop: 30 }, voet: { V: { rust: 4, meta: 62 }, VF: { rust: 10, meta: 62 }, A: { rust: 10, meta: 60 }, AF: { rust: 14, meta: 60 } } },
  { t: 0.22, R: [-3, -28], A: { rompV: 4, rompM: 190, rompA: 204, nek: -16, kop: 28 }, voet: { V: { rust: 4, meta: 60 }, VF: { rust: 10, meta: 60 }, A: { rust: 12, meta: 48, poot: 30 }, AF: { rust: 16, meta: 48, poot: 30 } } },
  { t: 0.36, R: [18, -46], A: { rompV: -18, rompM: 160, rompA: 152, nek: -32, kop: 22 }, vlucht: { tot: 4, h: 22 },
    voet: { V: { hoek: [70, 30, 30, 20], scap: -14 }, VF: { hoek: [66, 26, 26, 16], scap: -14 }, A: { rust: 14, meta: 116, poot: 104 }, AF: { rust: 18, meta: 116, poot: 104 } } },
  { t: 0.58, R: [80, -64], A: { rompV: -4, rompM: 184, rompA: 186, nek: -18, kop: 28 },
    voet: { V: { hoek: [52, 22, 34, 50], scap: -16 }, VF: { hoek: [48, 18, 30, 46], scap: -16 }, A: { hoek: [126, 152, 138, 118] }, AF: { hoek: [122, 148, 134, 114] } } },
  { t: 0.78, R: [140, -40], A: { rompV: 14, rompM: 196, rompA: 196, nek: 0, kop: 46 },
    voet: { V: { grond: [178, -0.4, 50, 24] }, VF: { grond: [184, -0.4, 50, 24] }, A: { hoek: [104, 156, 126, 96] }, AF: { hoek: [100, 152, 122, 92] } } },
  { t: 1.0, R: [146, -36], A: { rompV: 12, rompM: 186, rompA: 180, nek: 14, kop: 66 },
    voet: { V: { grond: [178, -0.4, 72, 26] }, VF: { grond: [184, -0.4, 72, 26] }, A: { grond: [128, -0.4, 72, 24] }, AF: { grond: [134, -0.4, 72, 24] } } },
] } };

ECO_ROVER.vos = RoverPop.maak(VOS_DEF);
ECO_ROVER.lynx = RoverPop.maak(LYNX_DEF);

// =====================================================================================================
// WRAPPERS (aanroep zoals alle dieren): ecoVos / ecoLynx(ctx, x, y, s, o) en de korte namen vos / lynx (bestonden nog niet in src/).
// s = px per cm, dezelfde conventie als wolf() (wolf_pop.js: s px/cm, schofthoogte 80 cm) en edelhert() (2·s px/cm): een vos naast een wolf met dezelfde s
// heeft dus de echte verhouding (38 : 80 cm schofthoogte). (x, y) = grondpunt midden onder het dier.
// o.houding: vos 'staan' | 'lopen' | 'draven' | 'sluipen' | 'muizensprong' | 'eten'; lynx 'staan' | 'lopen' | 'sluipen' | 'sprinten' | 'besprong'.
// Synoniemen: stap/stappen -> lopen, draf/rennen -> draven (vos) of sprinten (lynx), sprong/springen -> muizensprong / besprong, galop -> sprinten.
// o.t = fase 0-1 (gangen cyclisch; sprongen eenmalig 0 -> 1), o.kijk = ±1, o.a, o.wereld (dier schuift mee), o.prooi = false: geen muis bij 'eten'.
// =====================================================================================================
const _RV_HMAP = { vos: { stap: 'lopen', stappen: 'lopen', draf: 'draven', rennen: 'draven', galop: 'draven', sprong: 'muizensprong', springen: 'muizensprong', muisSprong: 'muizensprong', sluip: 'sluipen', grazen: 'eten', snuffelen: 'eten' },
  lynx: { stap: 'lopen', stappen: 'lopen', draf: 'sprinten', draven: 'sprinten', rennen: 'sprinten', galop: 'sprinten', sprint: 'sprinten', bounding: 'sprinten', sprong: 'besprong', springen: 'besprong', sluip: 'sluipen' } };
function _rvProoi(ctx, P, x, y, s, o) { // muis op de grond onder de snuit (bij 'eten'); eerst tekenen, de vos eroverheen
  const I = P.info(o), nz = I.eind('kop'), kj = o.kijk || 1, px = x + (nz[0] - (P.D.anker || 0) - 1.5) * s * kj;
  if (typeof muis === 'function') muis(ctx, px, y, s, { houding: 'staan', kijk: -kj, a: o.a ?? 1 });
  else { ctx.fillStyle = '#7A6656'; ctx.beginPath(); ctx.ellipse(px, y - 2.2 * s, 5 * s, 2.2 * s, 0, 0, 6.283); ctx.fill(); } }
function _rvWrap(ctx, naam, x, y, s, o) { if (o == null) o = {}; if ((o.a ?? 1) <= 0.01) return; const P = ECO_ROVER[naam]; const oo = Object.assign({}, o);
  if (oo.fase != null && oo.t == null) oo.t = oo.fase; if (oo.fase != null && !oo.houding) oo.houding = 'lopen';
  let h = oo.houding || 'staan'; h = _RV_HMAP[naam][h] || h; if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = 'staan'; oo.houding = h;
  if (h === 'eten' && o.prooi !== false) _rvProoi(ctx, P, x, y, s, oo);
  return P.teken(ctx, x, y, s, oo); }
function ecoVos(ctx, x, y, s = 1, o = {}) { return _rvWrap(ctx, 'vos', x, y, s, o); }
function ecoLynx(ctx, x, y, s = 1, o = {}) { return _rvWrap(ctx, 'lynx', x, y, s, o); }
if (typeof vos === 'undefined') var vos = ecoVos;
if (typeof lynx === 'undefined') var lynx = ecoLynx;
// DIEREN>>
