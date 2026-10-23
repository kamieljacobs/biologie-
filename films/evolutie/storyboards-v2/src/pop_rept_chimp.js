// Reptielen (nijlkrokodil, zandhagedis) en chimpansee als uitknippop, 23 okt 2026 — POPFAMILIE.md, familie 'rept_chimp'.
// Twee rigs in één naamruimte (PopRC):
//  - PopRC.reptiel(D): '3D-lite' rig. De ruggengraat is een kromme in 3D (x vooruit, y omlaag, z = naar de kijker); de zijwaartse S-golf
//    (staande golf in de romp, lopende golf in de staart) en de zijwaarts uitstaande poten worden in 3D berekend (2-bots-IK met een
//    pool naar buiten/boven) en dan loodrecht geprojecteerd: zijaanzicht (x, y) voor de scènes, bovenaanzicht (x, -z) voor de controle.
//    Zo bewegen de poten van opzij vooral op en neer en voor/achter, en is de S-buiging in het bovenaanzicht echt.
//  - PopRC.aap(D): 2D-rig voor de chimpansee (romp in 2 delen met zachte huid, nek, kop, armen en benen met IK, knokkelhand, platvoet).
// Eenheid = cm, grond y = 0, kop naar +x; o.kijk = -1 spiegelt. Wrappers onderaan: krokodil(), hagedis(), chimp() met de aanroep en
// schermmaat van dieren_overig.js / dieren_zoog.js. LET OP: src/sb8.js definieert ook een chimp(); laad dit bestand daarna.

const PopRC = (() => {
  const RAD = Math.PI / 180;
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (v, k) => [v[0] * k, v[1] * k];
  const len = (v) => Math.hypot(v[0], v[1]), ang = (v) => Math.atan2(v[1], v[0]), dir = (a) => [Math.cos(a), Math.sin(a)];
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const lin = (a, b, u) => a + (b - a) * u, cl = (x, a, b) => Math.max(a, Math.min(b, x));
  const sstep = (u) => { u = cl(u, 0, 1); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const kurve = (K, u) => { u = cl(u, K[0][0], K[K.length - 1][0]); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };
  // 1D Catmull-Rom door sleutelpunten [[s, v], ...] (niet-uniform)
  function cr(K, s) { const n = K.length; if (s <= K[0][0]) return K[0][1]; if (s >= K[n - 1][0]) return K[n - 1][1]; let i = 0; while (K[i + 1][0] < s) i++;
    const p0 = K[Math.max(0, i - 1)], p1 = K[i], p2 = K[i + 1], p3 = K[Math.min(n - 1, i + 2)], h = p2[0] - p1[0], u = (s - p1[0]) / h;
    const m1 = (p2[1] - p0[1]) / (p2[0] - p0[0] || 1) * h, m2 = (p3[1] - p1[1]) / (p3[0] - p1[0] || 1) * h; return hermite(p1[1], p2[1], m1, m2, u); }
  function spline(P) { const n = P.length, out = []; const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n]; const st = Math.max(2, Math.min(24, Math.ceil(len(sub(b, a)) / 0.6)));
      for (let s = 0; s < st; s++) { const u = s / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  // buis rond een open lijn met halve breedtes W; ronde kappen; zijde = { links: [i0,i1], rechts: [...] } voor haarpieken
  function buis(P, W, kap = [1, 1]) { const n = P.length, L = [], R = [];
    for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl];
      L.push(add(P[i], mul(nn, W[i]))); R.push(sub(P[i], mul(nn, W[i]))); }
    const capPts = (c, w, a0) => { const o = []; for (let k = 1; k < 8; k++) { const a = a0 - Math.PI * k / 8; o.push(add(c, mul(dir(a), w))); } return o; };
    const t0 = sub(P[Math.min(1, n - 1)], P[0]), t1 = sub(P[n - 1], P[Math.max(0, n - 2)]);
    const eind = kap[1] ? capPts(P[n - 1], W[n - 1], ang(t1) + Math.PI / 2) : [];
    const begin = kap[0] ? capPts(P[0], W[0], ang(t0) - Math.PI / 2) : [];
    return { pts: L.concat(eind, R.slice().reverse(), begin), nL: L.length, nE: eind.length }; }
  // fijne lijn langs een open pad met dikte w0 -> w1 (streep, plek)
  function streep(lijn, w0, w1) { const n = lijn.length; if (n < 2) return null; const W = lijn.map((_, i) => lin(w0, w1, i / (n - 1))); return buis(lijn, W).pts; }
  // haarpieken (vlamvorm, helling naar achter) op een deel van een gesloten omtrek: f(i, p) -> gewicht 0..1
  function pieken(P, amp, w, f, seed = 1) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
    let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const g = f(i, p); if (g <= 0) return p; const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
      const k = Math.floor(sc / w), ph = fr(sc / w), h = amp * g * (0.55 + 0.7 * hsh(k * 7.7 + seed)) * (ph < 0.72 ? Math.pow(ph / 0.72, 1.5) : (1 - ph) / 0.28); return add(p, mul(nn, h)); }); }
  function ik2(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2); dd = cl(dd, Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-3);
    const al = Math.acos(cl((l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd), -1, 1)); const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return { j, a1, a2: ang(sub(t, j)), rek }; }
  // 3D
  const v3 = { sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], len: (a) => Math.hypot(a[0], a[1], a[2]), norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; } };
  function ik3(P, T, l1, l2, pool) { let d = v3.sub(T, P); let dd = v3.len(d); const rek = dd / (l1 + l2); const dn = v3.norm(d); dd = cl(dd, Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-3);
    const a = (l1 * l1 - l2 * l2 + dd * dd) / (2 * dd), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)); let pv = v3.sub(pool, v3.mul(dn, v3.dot(pool, dn))); pv = v3.norm(pv);
    const K = v3.add(v3.add(P, v3.mul(dn, a)), v3.mul(pv, h)); const T2 = v3.add(P, v3.mul(dn, dd)); return { K, T: T2, rek }; }
  // tekenen in twee passes: eerst alleen een lichte rand van alle delen, dan alle vlakken (+ lagen geknipt op het deel)
  const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');
  function tekenDelen(ctx, delen, rand) { ctx.lineJoin = 'round';
    for (const d of delen) { if (!d || d.geenRand) continue; pad(ctx, d.pts); ctx.strokeStyle = RANDK(d.c); ctx.lineWidth = rand; ctx.stroke(); }
    for (const d of delen) { if (!d) continue; pad(ctx, d.pts); ctx.fillStyle = d.c; ctx.fill();
      if (d.lagen && d.lagen.length) { ctx.save(); pad(ctx, d.pts); ctx.clip(); for (const L of d.lagen) { if (!L) continue; if (L.fn) { L.fn(ctx); continue; }
        if (L.lijn) { ctx.beginPath(); L.pts.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = L.c; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, L.pts); ctx.fillStyle = L.c; ctx.fill(); } } ctx.restore(); }
      if (d.na) d.na(ctx); } }

  // =====================================================================================================
  // REPTIEL-RIG
  // =====================================================================================================
  function reptiel(D) {
    const L = D.L, NS = D.NS || 180, S0 = D.anker; // S0 = x van de snuitpunt in ruststand (anker = x 0)
    const top0 = (s) => cr(D.prof.map(p => [p[0], p[1]]), s), bot0 = (s) => cr(D.prof.map(p => [p[0], p[2]]), s), brd = (s) => Math.max(0.02, cr(D.prof.map(p => [p[0], p[3]]), s));
    const diep = (s) => top0(s) - bot0(s);
    const SS = Array.from({ length: NS }, (_, i) => L * Math.pow(i / (NS - 1), 1));
    const PAL = D.PAL, PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.34, D.verKleur || '#2E3428');
    const GANG = D.GANG, sm = (D.sS + D.sH) / 2;
    // ---- pose: per knoop [x, y(centrum = onderkant), z], hoek phi (zijwaarts), en per poot de gewrichten ----
    function wervel(phiF, bodem) { // phiF(s) zijwaartse richting; bodem(s) = hoogte buik boven grond (cm, +)
      const X = new Array(NS), Z = new Array(NS), PH = SS.map(phiF); let im = 0; while (SS[im + 1] < sm) im++;
      X[im] = S0 - SS[im]; Z[im] = 0;
      for (let i = im - 1; i >= 0; i--) { const ds = SS[i + 1] - SS[i], ph = (PH[i] + PH[i + 1]) / 2; X[i] = X[i + 1] + Math.cos(ph) * ds; Z[i] = Z[i + 1] + Math.sin(ph) * ds; }
      for (let i = im + 1; i < NS; i++) { const ds = SS[i] - SS[i - 1], ph = (PH[i] + PH[i - 1]) / 2; X[i] = X[i - 1] - Math.cos(ph) * ds; Z[i] = Z[i - 1] - Math.sin(ph) * ds; }
      const B = SS.map(bodem); return { X, Z, PH, B }; }
    const op = (W, s) => { let i = 0; while (i < NS - 2 && SS[i + 1] < s) i++; const u = (s - SS[i]) / (SS[i + 1] - SS[i]);
      return { x: lin(W.X[i], W.X[i + 1], u), z: lin(W.Z[i], W.Z[i + 1], u), ph: lin(W.PH[i], W.PH[i + 1], u), b: lin(W.B[i], W.B[i + 1], u) }; };
    // gewricht (schouder/heup) van poot L: 3D
    function gordel(W, L) { const voor = L[0] === 'V', sg = L[1] === 'N' ? 1 : -1, s = voor ? D.sS : D.sH, q = op(W, s);
      const y = -(q.b + diep(s) * (voor ? D.jS : D.jH)), wz = brd(s) * 0.82; return [q.x - Math.sin(q.ph) * wz * sg, y, q.z + Math.cos(q.ph) * wz * sg]; }
    // poot: G (gewricht), B (bal = begin tenen) op de grond, psi = richting voet in xz, p = hiel omhoog (graden), q = tenen krullen (graden, + = omlaag)
    function poot(G, L, B, psi, p, q) { const voor = L[0] === 'V', P = D.poot[voor ? 'V' : 'A'], sg = L[1] === 'N' ? 1 : -1;
      const cp = Math.cos(p * RAD), sp = Math.sin(p * RAD); const Wp = [B[0] - P.l[2] * cp * Math.cos(psi), B[1] - P.l[2] * sp - P.dik * cp, B[2] - P.l[2] * cp * Math.sin(psi)];
      const pool = [P.pool[0], P.pool[1], P.pool[2] * sg]; const r = ik3(G, Wp, P.l[0], P.l[1], pool);
      const tenen = P.tenen.map(([da, tl], k) => { const a = psi + da * sg * RAD, cq = Math.cos(q * RAD); return [B[0] + tl * cq * Math.cos(a), B[1] + tl * Math.sin(q * RAD), B[2] + tl * cq * Math.sin(a)]; });
      return { G, K: r.K, W: r.T, B, tenen, rek: r.rek, psi }; }
    const POTEN = ['VN', 'VF', 'AN', 'AF'];
    function stand(o) { const h = o.houding || 'lopen', t = fr(o.t || 0);
      if (h === 'liggen') { const LG = D.LIGGEN; const W = wervel((s) => LG.phi ? LG.phi(s) : 0, (s) => cr(LG.bodem, s)); const benen = {};
        for (const Lb of POTEN) { const voor = Lb[0] === 'V', sg = Lb[1] === 'N' ? 1 : -1, G = gordel(W, Lb), v = LG.voet[voor ? 'V' : 'A'];
          const Bx = S0 - (voor ? D.sS : D.sH) + v[0] + (sg < 0 ? v[3] || 0 : 0); benen[Lb] = poot(G, Lb, [Bx, 0, sg * v[1]], sg * v[2] * RAD, 0, 0); benen[Lb].steun = true; }
        return { W, benen }; }
      const G = GANG, staan = h === 'staan';
      const fase = (Lb) => fr(t - G.fase[Lb]);
      const yS = staan ? 0 : -G.yaw[0] * RAD * Math.cos(2 * Math.PI * (t - G.fase.VN)), yH = staan ? 0 : -G.yaw[1] * RAD * Math.cos(2 * Math.PI * (t - G.fase.AN));
      const kop = G.kopVast ?? 0.4, kap = G.staartGolf || 0.6;
      const phiF = (s) => { if (s <= D.sS) return yS * (kop + (1 - kop) * s / D.sS); if (s <= D.sH) return lin(yS, yH, (s - D.sS) / (D.sH - D.sS));
        const u = (s - D.sH) / (L - D.sH); const A = lin(G.yaw[1], G.yaw[2], Math.pow(u, 0.8)) * RAD; return staan ? 0 : -A * Math.cos(2 * Math.PI * (t - G.fase.AN) - 2 * Math.PI * kap * u); };
      const bob = staan ? 0 : (G.bob || 0) * Math.cos(4 * Math.PI * (t - 0.08));
      const W = wervel(phiF, (s) => bot0(s) + bob * (s < D.sH + 20 ? 1 : 0) + (D.staartLeg ? D.staartLeg(s, t) : 0)); const benen = {};
      for (const Lb of POTEN) { const voor = Lb[0] === 'V', k = voor ? 'V' : 'A', sg = Lb[1] === 'N' ? 1 : -1, Gp = gordel(W, Lb), beta = G.beta[k];
        const nx = S0 - (voor ? D.sS : D.sH) + G.nx[k], half = G.S * beta / 2; const p = staan ? (Lb[1] === 'N' ? 0.3 : 0.5) * beta : fase(Lb), steun = p < beta; let bx, by = 0, bz = sg * G.spread[k], hp, tq, u;
        if (staan) { bx = nx + (sg < 0 ? G.verDx || 0 : 0); hp = 0; tq = 0; u = 0.5; }
        else if (steun) { u = p / beta; bx = nx + half * (1 - 2 * u); hp = kurve([[0, 0], [0.62, 0], [1, G.hiel[k]]], u); tq = 0; }
        else { u = (p - beta) / (1 - beta); const m = -G.S * (1 - beta) * 0.5; bx = hermite(nx - half, nx + half, m, m, u); by = -G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.85)), 1.1);
          bz = sg * (G.spread[k] - G.inw[k] * Math.sin(Math.PI * u)); hp = kurve([[0, G.hiel[k]], [0.45, G.hiel[k] * 0.6], [0.85, -6], [1, 0]], u); tq = kurve([[0, 10], [0.4, 35], [0.85, -5], [1, 0]], u); }
        if (voor && G.scap && !staan) Gp[0] += G.scap * cl2((bx - nx) / half); // schoudergordel/borstbeen schuift mee (Baier e.a.: grotere pas in de high walk)
        const psi = sg * G.psi[k] * RAD + (steun ? 0 : sg * 10 * RAD * Math.sin(Math.PI * u));
        benen[Lb] = poot(Gp, Lb, [bx, by, bz], psi, hp, tq); benen[Lb].steun = steun; benen[Lb].u = u; }
      return { W, benen }; }
    // ---- zijaanzicht ----
    const NO = D.NO || 260; const SO = Array.from({ length: NO }, (_, i) => L * i / (NO - 1));
    function zij(st) { const { W } = st; const Tp = [], Bp = [];
      for (const s of SO) { const q = op(W, s), d = diep(s) + (D.kam ? D.kam(s) : 0); Tp.push([q.x, -(q.b + d)]); Bp.push([q.x, -q.b]); }
      const q0 = op(W, 0), d0 = diep(0), r0 = d0 / 2; const neus = []; for (let k = 1; k < 8; k++) { const a = -Math.PI / 2 + Math.PI * k / 8; neus.push([q0.x + Math.cos(a) * r0 * (D.neusRond || 0.8), -(q0.b + r0) + Math.sin(a) * r0]); }
      const romp = Tp.concat().reverse().concat([]).reverse(); // top van snuit naar staart
      const pts = neus.slice().reverse().concat(Tp, Bp.slice().reverse()); // start bij neus onder->boven? (gesloten, volgorde maakt niet uit)
      const M = (s, f) => { const q = op(W, s); return [q.x, -(q.b + diep(s) * f)]; }; // f = 0 onderkant, 1 bovenkant (zonder kam)
      return { pts, M, Tp, Bp }; }
    function pootDelen(b, ver, P, pal, k) { // delen van één poot in volgorde achter -> voor, zijaanzicht (x, y)
      const pr = (v) => [v[0], v[1]]; const w = P.w; const G = pr(b.G), K = pr(b.K), Wt = pr(b.W), B = pr(b.B);
      const G2 = [G[0], G[1] - (P.hoger || 0)]; const boven = { pts: buis([G2, lin2(G, K, 0.5), K], [w[0], (w[0] + w[1]) / 2, w[1]]).pts, c: pal.poot, lagen: [] };
      const onder = { pts: buis([K, lin2(K, Wt, 0.5), Wt], [w[1], (w[1] + w[2]) / 2, w[2]]).pts, c: pal.poot, lagen: [] };
      const voet = { pts: buis([Wt, B], [w[2], w[3]]).pts, c: pal.poot, lagen: [] };
      const tenen = b.tenen.map((T, j) => ({ pts: buis([B, lin2(B, pr(T), 0.6), pr(T)], [w[4], w[4] * 0.85, w[4] * 0.55]).pts, c: pal.poot, geenRand: false, na: P.klauw ? (ctx) => { const e = pr(T), a = ang(sub(e, B)); ctx.fillStyle = pal.klauw; ctx.beginPath(); ctx.moveTo(...add(e, mul(dir(a + 1.4), w[4] * 0.5))); ctx.lineTo(...add(e, mul(dir(a), P.klauw))); ctx.lineTo(...add(e, mul(dir(a - 1.4), w[4] * 0.5))); ctx.closePath(); ctx.fill(); } : null }));
      // zwemvlies (achterpoot krokodil): vlak tussen de tenen
      const vlies = P.vlies ? { pts: [B].concat(b.tenen.slice(0, P.vlies).map(pr).map((T) => lin2(B, T, 0.75))), c: pal.pootD, geenRand: true } : null;
      if (P.schubben) for (const part of [boven, onder]) part.lagen.push({ fn: (ctx) => P.schubben(ctx, part === boven ? [G, K] : [K, Wt], w, pal) });
      // dij/bovenarm: lichtere voorkant, donkere achterkant (leesbaarheid)
      boven.lagen.unshift({ pts: buis([lin2(G, K, 0.25), K], [w[0] * 0.3, w[1] * 0.28]).pts.map(p => add(p, mul(norm2(sub(K, G), k === 'A' ? -1 : 1), w[1] * 0.72))), c: pal.pootL });
      onder.lagen.unshift({ pts: buis([K, Wt], [w[1] * 0.3, w[2] * 0.3]).pts.map(p => add(p, mul(norm2(sub(Wt, K), k === 'A' ? 1 : -1), w[1] * 0.75))), c: pal.pootD });
      return ver ? [boven, onder, vlies, voet, ...tenen] : [...tenen, vlies, voet, onder, boven]; }
    const lin2 = (a, b, u) => [lin(a[0], b[0], u), lin(a[1], b[1], u)], cl2 = (v) => cl(v, -1.2, 1.2);
    const norm2 = (v, sg = 1) => { const l = len(v) || 1; return [-v[1] / l * sg, v[0] / l * sg]; };
    function teken(ctx, x, y, s, o = {}) { const st = o.stand || stand(o); const kijk = o.kijk || 1, ver = (Lb) => Lb[1] === 'F';
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * kijk, s); const rand = (o.rand ?? 1.5) / s;
      if (o.wereld && (o.houding || 'lopen') === 'lopen') ctx.translate(GANG.S * fr(o.t || 0), 0);
      if (o.boven) { tekenBoven(ctx, st, rand, o); ctx.restore(); return st; }
      const Z = zij(st); const delen = [];
      const P = D.poot;
      for (const Lb of ['AF', 'VF']) delen.push(...pootDelen(st.benen[Lb], true, P[Lb[0]], { poot: PALF.poot, pootL: PALF.pootL, pootD: PALF.pootD, klauw: PALF.klauw }, Lb[0]));
      if (D.verKam) delen.push(D.verKam(Z, PALF, st));
      const lijf = { pts: Z.pts, c: PAL.flank, lagen: D.lagen ? D.lagen(Z, PAL, st) : [] }; delen.push(lijf);
      for (const Lb of ['AN', 'VN']) delen.push(...pootDelen(st.benen[Lb], false, P[Lb[0]], PAL, Lb[0]));
      tekenDelen(ctx, delen, rand);
      if (D.kopDetail) D.kopDetail(ctx, Z, PAL, s, st);
      if (o.skelet) { ctx.lineWidth = 2 / s; for (const Lb of POTEN) { const b = st.benen[Lb]; ctx.strokeStyle = ver(Lb) ? '#4FC3F7' : '#FF5252'; ctx.beginPath(); [b.G, b.K, b.W, b.B].forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
        ctx.strokeStyle = '#FFEB3B'; ctx.beginPath(); SO.forEach((s2, i) => { const q = op(st.W, s2); i ? ctx.lineTo(q.x, -q.b - diep(s2) / 2) : ctx.moveTo(q.x, -q.b - diep(s2) / 2); }); ctx.stroke(); }
      ctx.restore(); return st; }
    // ---- bovenaanzicht (controle tegen de plaat): x vooruit, scherm-y = -z ----
    function tekenBoven(ctx, st, rand, o) { const { W } = st; const Lp = [], Rp = [];
      for (const s of SO) { const q = op(W, s), w = brd(s); Lp.push([q.x - Math.sin(q.ph) * w, -(q.z + Math.cos(q.ph) * w)]); Rp.push([q.x + Math.sin(q.ph) * w, -(q.z - Math.cos(q.ph) * w)]); }
      const delen = []; const pr = (v) => [v[0], -v[2]];
      for (const Lb of POTEN) { const b = st.benen[Lb], P = D.poot[Lb[0]], w = P.w; const G = pr(b.G), K = pr(b.K), Wt = pr(b.W), B = pr(b.B);
        delen.push({ pts: buis([G, K], [w[0], w[1]]).pts, c: PAL.poot }, { pts: buis([K, Wt], [w[1], w[2]]).pts, c: PAL.poot }, { pts: buis([Wt, B], [w[2], w[3]]).pts, c: PAL.poot },
          ...b.tenen.map(T => ({ pts: buis([B, pr(T)], [w[4], w[4] * 0.5]).pts, c: PAL.poot }))); }
      const R = Lp.concat(Rp.reverse()); delen.push({ pts: R, c: PAL.flank, lagen: [{ pts: (() => { const A = [], B2 = []; for (const s of SO) { const q = op(W, s), w = brd(s) * 0.55; A.push([q.x - Math.sin(q.ph) * w, -(q.z + Math.cos(q.ph) * w)]); B2.push([q.x + Math.sin(q.ph) * w, -(q.z - Math.cos(q.ph) * w)]); } return A.concat(B2.reverse()); })(), c: PAL.rug }] });
      tekenDelen(ctx, delen, rand);
      if (o.skelet) { ctx.lineWidth = 2 / (o.sk || 1); ctx.strokeStyle = '#FFEB3B'; ctx.beginPath(); SO.forEach((s2, i) => { const q = op(W, s2); i ? ctx.lineTo(q.x, -q.z) : ctx.moveTo(q.x, -q.z); }); ctx.stroke(); } }
    function info(o = {}) { const st = stand(o); return st; }
    return { teken, stand, info, D, op, diep, bot0, top0, brd, SO };
  }

  // =====================================================================================================
  // AAP-RIG (chimpansee), 2D
  // =====================================================================================================
  function aap(D) {
    const PAL = D.PAL, PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.32, D.verKleur || '#141820');
    const B = D.bot; // lengtes
    // romp in rust: x langs de romp vanaf het heupgewricht, y = buikkant (+)
    const ROMP = pieken(spline(D.romp), D.piek[0], D.piek[1], (i, p) => (p[1] < -9 ? 1 : (p[1] > 13 && p[0] < 44 ? 0.8 : 0)), 11); const wBorst = (x) => sstep((x - (B.buik - 9)) / 18);
    const ROMPLAAG = D.rompLagen.map(l => ({ c: l.c, pts: spline(l.p) }));
    function fk(S) { // S: { R, A: {buik, borst, nek, kop} (graden) }
      const A = {}; for (const k in S.A) A[k] = S.A[k] * RAD; const R = S.R, mid = add(R, mul(dir(A.buik), B.buik)), nekB = add(mid, mul(dir(A.borst), B.borst)), kopJ = add(nekB, mul(dir(A.nek), B.nek));
      const huid = (p) => { const w = wBorst(p[0]); const a = add(R, rot(p, A.buik)), b = add(mid, rot([p[0] - B.buik, p[1]], A.borst)); return [lin(a[0], b[0], w), lin(a[1], b[1], w)]; };
      return { A, R, mid, nekB, kopJ, huid, sch: huid(D.schouder), heup: huid(D.heup) }; }
    // pose -> volledige stand (alle gewrichten)
    function benen(F, S, voeten, handen) { const out = {};
      for (const k in voeten) { const v = voeten[k]; const va = v.voet * RAD, Bp = v.bal; const A = sub(Bp, mul(dir(va), B.voet)); const r = ik2(F.heup, A, B.dij, B.schn, v.knieTeken ?? -1);
        out['A' + k] = { H: F.heup, K: r.j, Ak: A, Bp, voet: va, teen: (v.teen ?? 0) * RAD, rek: r.rek, steun: v.steun }; }
      for (const k in handen) { const h = handen[k]; const sch = add(F.sch, [h.schX || 0, h.schY || 0]); let Wp, ha = h.hand * RAD, Kn;
        if (h.knokkel) { Kn = h.knokkel; Wp = sub(Kn, mul(dir(ha), B.hand)); } else { Wp = h.pols; Kn = add(Wp, mul(dir(ha), B.hand)); }
        const r = ik2(sch, Wp, B.hum, B.rad, h.elleboogTeken ?? 1); out['V' + k] = { S: sch, E: r.j, Wp, Kn, hand: ha, vinger: h.vinger * RAD, rek: r.rek, steun: h.steun, grijp: h.grijp }; }
      return out; }
    // ---- houdingen ----
    const HOUDING = D.HOUDING;
    function stand(o) { const h = o.houding || 'staan'; const f = HOUDING[h] || HOUDING.staan; const st = f(o, { fk, benen, B, D, kurve, hermite, fr, lin, dir, add, sub, mul, RAD }); return st; }
    // ---- tekenen ----
    function tekenArm(b, pal, ver) { const d = []; const w = D.wArm;
      const hum = buis([b.S, lin2(b.S, b.E, 0.45), b.E], [w[0], w[0] * 0.95, w[1]]); const rad = buis([b.E, lin2(b.E, b.Wp, 0.4), b.Wp, add(b.Wp, mul(dir(b.hand), 1.2))], [w[1], w[1] * 1.02, w[2], w[2] * 0.9]);
      const humP = pieken(hum.pts, 1.1, 7, (i) => (i > hum.nL * 0.25 && i < hum.nL) ? 1 : 0, 3);
      const radP = pieken(rad.pts, 1.4, 6.5, (i) => (i < rad.nL * 0.9) ? 1 : 0, 5); // haar aan de achterkant van de onderarm
      const vg = b.Kn ? add(b.Kn, mul(dir(b.vinger), B.vinger)) : null;
      const hand = { pts: buis([b.Wp, lin2(b.Wp, b.Kn, 0.55), b.Kn], [w[3], w[3] * 1.12, w[4]]).pts, c: pal.huid, lagen: [{ pts: buis([b.Wp, lin2(b.Wp, b.Kn, 0.5)], [w[3] * 1.05, w[3] * 0.4]).pts, c: pal.vacht }] };
      const ving = { pts: buis([b.Kn, lin2(b.Kn, vg, 0.5), vg], [w[5], w[5] * 0.95, w[5] * 0.75]).pts, c: pal.huid, lagen: [{ lijn: 0.35, pts: [add(b.Kn, mul(dir(b.vinger + 1.4), w[5] * 0.6)), add(vg, mul(dir(b.vinger + 1.6), w[5] * 0.3))], c: pal.huidD }] };
      const duim = { pts: buis([lin2(b.Wp, b.Kn, 0.35), add(lin2(b.Wp, b.Kn, 0.35), mul(dir(b.hand + (b.grijp ? 1.2 : 0.55)), 3.6))], [1.3, 1.0]).pts, c: pal.huidD };
      const humD = { pts: humP, c: pal.vacht, lagen: [{ pts: buis([lin2(b.S, b.E, 0.1), lin2(b.S, b.E, 0.8)], [w[0] * 0.3, w[1] * 0.22]).pts.map(p => add(p, mul(norm2(sub(b.E, b.S)), -w[0] * 0.55))), c: pal.licht }, { pts: buis([lin2(b.S, b.E, 0.3), lin2(b.S, b.E, 1.0)], [w[0] * 0.25, w[1] * 0.25]).pts.map(p => add(p, mul(norm2(sub(b.E, b.S)), w[0] * 0.8))), c: pal.donker }] };
      const radD = { pts: radP, c: pal.vacht };
      return ver ? [humD, radD, ving, duim, hand] : [ving, duim, hand, radD, humD]; }
    function tekenBeen(b, pal, ver) { const w = D.wBeen;
      const dij = buis([b.H, lin2(b.H, b.K, 0.5), b.K], [w[0], w[0] * 0.9, w[1]]); const schn = buis([b.K, lin2(b.K, b.Ak, 0.5), b.Ak], [w[1] * 0.92, w[1] * 0.8, w[2]]);
      const dijP = pieken(dij.pts, 1.3, 8, (i) => (i > dij.nL + dij.nE) ? 1 : 0, 7), schnP = pieken(schn.pts, 1.1, 7, (i) => (i > schn.nL + schn.nE) ? 0.9 : 0, 9);
      // voet in zoolframe (bal = oorsprong, x langs de zool), hoek = voet - zoolhoek
      const za = b.voet - D.zoolHoek * RAD; const Z = (p) => add(b.Bp, rot(p, za)); const voetP = spline(D.voetVorm.map(Z));
      const T = add(b.Bp, mul(dir(za + b.teen), B.teen));
      const teen = { pts: buis([b.Bp, lin2(b.Bp, T, 0.5), T], [w[4], w[4] * 0.92, w[4] * 0.7]).pts.map(p => add(p, mul(dir(za + Math.PI / 2), w[4] * 0.55))), c: pal.huid, lagen: [] };
      const voet = { pts: voetP, c: pal.huid, lagen: [{ pts: spline(D.voetVacht.map(Z)), c: pal.vacht }] };
      const dijD = { pts: dijP, c: pal.vacht, lagen: [{ pts: buis([lin2(b.H, b.K, 0.2), lin2(b.H, b.K, 0.85)], [w[0] * 0.3, w[1] * 0.22]).pts.map(p => add(p, mul(norm2(sub(b.K, b.H)), -w[0] * 0.6))), c: pal.licht }, { pts: buis([lin2(b.H, b.K, 0.3), lin2(b.H, b.K, 1.0)], [w[0] * 0.28, w[1] * 0.3]).pts.map(p => add(p, mul(norm2(sub(b.K, b.H)), w[0] * 0.78))), c: pal.donker }] };
      const schnD = { pts: schnP, c: pal.vacht };
      const grtn = D.groteTeen ? { pts: buis([Z([-5.5, 1.6]), Z([-1.5, 2.6]), Z([1.5, 2.2])], [1.3, 1.25, 1.0]).pts, c: pal.huidD } : null;
      return ver ? [dijD, schnD, grtn, voet, teen] : [grtn, teen, voet, schnD, dijD]; }
    const lin2 = (a, b, u) => [lin(a[0], b[0], u), lin(a[1], b[1], u)];
    const norm2 = (v, sg = 1) => { const l = len(v) || 1; return [-v[1] / l * sg, v[0] / l * sg]; };
    function teken(ctx, x, y, s, o = {}) { const st = o.stand || stand(o); const F = st.F; const kijk = o.kijk || 1;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.translate(-(D.anker || 0), 0); const rand = (o.rand ?? 1.5) / s;
      if (o.wereld && st.S) ctx.translate(st.S * fr(o.t || 0), 0);
      if (st.voor) st.voor(ctx, PAL, s);
      if (st.zit) { ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 800, 400.4); ctx.clip(); }
      const romp = { pts: ROMP.map(F.huid), c: PAL.vacht, lagen: ROMPLAAG.map(l => ({ c: PAL[l.c], pts: l.pts.map(F.huid) })) };
      const kopT = (p) => add(F.kopJ, rot(mul(p, D.kopSchaal), F.A.kop));
      const nek = { pts: buis([F.nekB, lin2(F.nekB, F.kopJ, 0.5), F.kopJ], D.wNek).pts, c: PAL.vacht };
      const kop = { pts: pieken(spline(D.kop.map(kopT)), 0.9, 3.2, (i, p) => D.kopHaar(i), 13), c: PAL.vacht, lagen: D.kopLagen.map(l => ({ c: PAL[l.c], pts: spline(l.p.map(kopT)) })), na: (ctx) => D.gezicht(ctx, kopT, PAL, s, F) };
      const oor = { pts: spline(D.oor.map(kopT)), c: PAL.huid, lagen: [{ pts: spline(D.oorBinnen.map(kopT)), c: PAL.huidD }] };
      const delen = [...tekenArm(st.b.VF, PALF, true), ...tekenBeen(st.b.AF, PALF, true), romp, nek, ...tekenBeen(st.b.AN, PAL, false)];
      const armN = tekenArm(st.b.VN, PAL, false);
      if (st.armVoorKop) delen.push(kop, oor, ...armN); else delen.push(...armN, kop, oor);
      tekenDelen(ctx, delen, rand); if (st.zit) ctx.restore();
      if (st.na) st.na(ctx, PAL, s);
      if (o.skelet) { ctx.lineWidth = 2 / s; const L = (pts, c) => { ctx.strokeStyle = c; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
        L([F.R, F.mid, F.nekB, F.kopJ], '#FFEB3B'); for (const k of ['VN', 'VF']) { const b = st.b[k]; L([b.S, b.E, b.Wp, b.Kn], k === 'VF' ? '#4FC3F7' : '#FF5252'); }
        for (const k of ['AN', 'AF']) { const b = st.b[k]; L([b.H, b.K, b.Ak, b.Bp], k === 'AF' ? '#4FC3F7' : '#FF5252'); } }
      ctx.restore(); return st; }
    return { teken, stand, fk, D, PAL };
  }
  return { reptiel, aap, kurve, hermite, cr, mixHex, hsh, fr, lin, sstep, buis, streep, spline, pieken, RAD };
})();

// =====================================================================================================
// NIJLKROKODIL (Crocodylus niloticus), 4 m. Maten: zijaanzicht stap.png (krokodil fase 1, K = 318 px / 400 cm), kruiscontrole:
// - achterpoot (femur+tibia+mt III) ±63 % van de presacrale lengte en femur ±43 % daarvan bij grote dieren (Iijima e.a. 2021, JEB 224:jeb242990, alligator);
//   hier dij 38, onderbeen 30, middenvoet 17 cm (presacraal ±150 cm). Bovenarm ±0,85 x dij (32), onderarm 21 cm.
// - heup hoger dan schouder bij grote krokodilachtigen (zelfde bron); heupgewricht ±59 cm, schouder ±47 cm in de high walk (plaat 59 cm).
// - gang: 'walking trot' / diagonale koppels, fase achter-voor ±0,5, duty 0,67 (voor) en 0,76 (achter) bij de grootste dieren (zelfde bron).
// - staart ±45 % van de lengte, zijwaarts afgeplat (breedte ±1/3 van de hoogte), met dubbele en dan enkele kam.
// =====================================================================================================
const REPT_KROK_DEF = {
  L: 400, anker: 200, NS: 200, NO: 300, sS: 112, sH: 222, jS: 0.12, jH: 0.28, verMix: 0.36, verKleur: '#20261E', neusRond: 0.9,
  // [s vanaf de snuit, bovenkant, onderkant, halve breedte] (cm boven de grond in de loophouding)
  // hoogtes 23 cm lager dan de plaat (Kamiel 23 okt: poten te lang); dij = 1/16 van 400 cm (Farlow e.a. 2005, alligators tot 427 cm: dij 236-263 mm); buik ±16 cm boven de grond
  prof: [[0, 56, 47, 6], [4, 60.5, 46.5, 8], [10, 59.5, 46, 8.5], [28, 62, 44, 10.5], [42, 66, 42, 13], [52, 69, 40.5, 15], [62, 67, 38.5, 16.5], [72, 69.5, 35.5, 17], [86, 72, 30, 17], [100, 74, 23, 21], [118, 75.5, 17.5, 26], [150, 76.5, 16, 29], [185, 77, 16.5, 29.5], [212, 75, 19, 27], [238, 70, 23.5, 21], [262, 63, 26.5, 16], [290, 53, 23, 13], [320, 39, 13, 10], [350, 25.9, 3.9, 7], [376, 18.8, 3.3, 4], [400, 12, 7.5, 0.8]],
  // rugkam: ronde osteodermen op de romp, driehoekige kam (naar achter hellend) op de staart
  kam(s) { if (s > 84 && s < 238) { const f = ((s - 84) / 9.2) % 1; return 2.6 * Math.pow(Math.sin(Math.PI * f), 0.7); }
    if (s >= 238 && s < 396) { const h = 7.5 - (s - 238) * 0.034, f = ((s - 238) / 10.5) % 1; return h * (f < 0.78 ? Math.pow(f / 0.78, 1.3) : (1 - f) / 0.22); } return 0; },
  staartLeg: null,
  PAL: { flank: '#7C7456', rug: '#5C5846', buik: '#B4A983', band: '#343A3D', schub: '#4A493C', schubL: '#958B66', poot: '#6E6A52', pootL: '#7A7459', pootD: '#5E5A46', klauw: '#2A2A22', kaak: '#B0A580', tand: '#ECE6CE', mond: '#2A2E1E' },
  poot: {
    V: { l: [20.5, 14, 7], dik: 4, hoger: 0, pool: [-0.55, -0.35, 1], w: [7.5, 5.4, 4.8, 4.6, 2.8], tenen: [[-55, 7], [-25, 9.5], [0, 10.5], [25, 9.5], [50, 7]], klauw: 2.4,
 },
    A: { l: [25, 19.5, 10], dik: 4.5, hoger: 2, pool: [0.55, -0.35, 1], w: [9.5, 6.4, 5.2, 4.9, 3.0], tenen: [[-32, 11], [-10, 13.5], [12, 14.5], [34, 12]], klauw: 2.8, vlies: 4,
 },
  },
  // walking trot met diagonale koppels (achter loopt 0,06 voor op zijn diagonale voorpoot); S = slaglengte per cyclus
  GANG: { S: 72, scap: 6, beta: { V: 0.68, A: 0.74 }, fase: { AN: 0, VF: 0.06, AF: 0.5, VN: 0.56 }, nx: { V: 6, A: 2 }, spread: { V: 33, A: 36 }, inw: { V: 6, A: 7 }, psi: { V: 32, A: 14 },
    lift: { V: 7, A: 8 }, hiel: { V: 38, A: 46 }, yaw: [11, 12, 16], kopVast: 0.35, staartGolf: 0.55, bob: 1.2, verDx: -6 },
  LIGGEN: { bodem: [[0, 3], [40, 1.5], [70, 0.5], [100, 0], [300, 0], [400, 0]], phi: (s) => (s > 220 ? -0.35 * Math.sin((s - 220) / 180 * Math.PI) : 0) - 0.04,
    voet: { V: [6, 38, 55, 0], A: [-18, 42, -30, 0] } },
};
REPT_KROK_DEF.lagen = (Z, P) => { const { M } = Z, L = []; const Ls = (a, b, n, fn) => { const o = []; for (let i = 0; i <= n; i++) o.push(fn(a + (b - a) * i / n)); return o; };
  // rug donker (bovenste 35 %), buik licht (onderste 30 %), onderkaak licht
  L.push({ c: P.rug, pts: Ls(60, 400, 60, s => M(s, 0.66 + 0.04 * Math.sin(s / 7))).concat([M(400, 2), M(60, 2)]) });
  L.push({ c: P.buik, pts: Ls(0, 392, 90, s => M(s, s < 64 ? 0.42 + 0.045 * Math.sin(s / 6.5) : (s < 100 ? _rcLin0(0.42, 0.33, (s - 64) / 36) : 0.33 - 0.08 * Math.max(0, (s - 240) / 150)))).concat([M(392, -1), M(-4, -1)]) });
  // benen platen (osteodermen) in rijen op rug en bovenflank: donkere afgeronde tegels, iets lichter naar de flank
  for (let r = 0; r < 4; r++) for (let s = 90 + (r % 2) * 4.6; s < 244; s += 9.2) { const f = [0.92, 0.81, 0.7, 0.59][r]; const Q = [M(s, f + 0.045), M(s + 7.2, f + 0.045), M(s + 7.2, f - 0.045), M(s, f - 0.045)];
    L.push({ c: r < 2 ? P.schub : _rcMix(P.schub, P.flank, 0.25 + r * 0.15), pts: _rcRondHoek(Q, 1.1) }); }
  // staart: donkere blokken boven, lichte blokken onder (geblokt als op de plaat), afwisselend
  for (let s = 246, i = 0; s < 394; s += 11.5, i++) { const w = 9 - (s - 246) * 0.02; if (i % 2 === 0) L.push({ c: P.band, pts: _rcRondHoek([M(s, 1.3), M(s + w, 1.3), M(s + w - 1, 0.5), M(s - 1, 0.5)], 1.2) });
    else L.push({ c: _rcMix(P.flank, P.schubL, 0.45), pts: _rcRondHoek([M(s, 0.5), M(s + w, 0.5), M(s + w - 1, 0.3), M(s - 1, 0.3)], 1.6) }); }
  // buikschubben: dwarse lijnen
  for (let s = 100; s < 238; s += 5.4) L.push({ lijn: 0.5, c: '#A09676', pts: [M(s, 0.02), M(s + 0.4, 0.28)] });
  return L; };
REPT_KROK_DEF.kopDetail = (ctx, Z, P, s) => { const { M } = Z; // (onderkaak licht = buiklaag)
  // kaaklijn (golvend), tanden die in elkaar grijpen, 4e ondertand steekt boven de bovenkaak uit
  const K = []; for (let i = 0; i <= 36; i++) { const ss = 1 + i * 2; K.push(M(ss, 0.42 + 0.045 * Math.sin(ss / 6.5) - (ss > 60 ? (ss - 60) * 0.004 : 0))); }
  ctx.strokeStyle = P.mond; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.fillStyle = P.tand; for (let i = 0; i < 15; i++) { const ss = 4 + i * 3.9; if (ss > 62) break; const f = 0.42 + 0.045 * Math.sin(ss / 6.5); const p = M(ss, f), up = i % 2 === 0; const h = up ? 2.4 : 2.2;
    ctx.beginPath(); ctx.moveTo(p[0] - 1.1, p[1]); ctx.lineTo(p[0], p[1] + (up ? -h : h)); ctx.lineTo(p[0] + 1.1, p[1]); ctx.closePath(); ctx.fill(); }
  { const p = M(13, 0.42 + 0.045 * Math.sin(2)); ctx.beginPath(); ctx.moveTo(p[0] - 1.6, p[1] + 1); ctx.lineTo(p[0] - 0.2, p[1] - 5.2); ctx.lineTo(p[0] + 1.4, p[1] + 1); ctx.closePath(); ctx.fill(); }
  // neusgat op de knobbel, oog op de oogknobbel (geelgroen, verticale spleet), oorklep erachter
  { const p = M(3, 0.95); ctx.fillStyle = P.mond; ctx.beginPath(); ctx.ellipse(p[0], p[1], 1.4, 0.9, 0, 0, 6.283); ctx.fill(); }
  { const p = M(51, 0.98); ctx.fillStyle = P.rug; ctx.beginPath(); ctx.ellipse(p[0], p[1] - 0.6, 6.4, 3.6, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#C8B030'; ctx.beginPath(); ctx.ellipse(p[0] + 0.6, p[1] - 0.6, 2.6, 2.1, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#0A0C08'; ctx.beginPath(); ctx.ellipse(p[0] + 0.7, p[1] - 0.6, 0.5, 1.9, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(p[0] + 1.6, p[1] - 1.6, 0.55, 0, 6.283); ctx.fill();
    ctx.strokeStyle = P.schub; ctx.lineWidth = 0.9; ctx.beginPath(); const a = M(44, 0.86), b = M(52, 0.8), c = M(60, 0.86); ctx.moveTo(...a); ctx.quadraticCurveTo(b[0], b[1] + 1.5, c[0], c[1]); ctx.stroke(); }
  { const p = M(64, 0.8); ctx.fillStyle = P.schub; ctx.beginPath(); ctx.ellipse(p[0], p[1], 3.2, 1.2, -0.15, 0, 6.283); ctx.fill(); } };
function _rcLin0(a, b, u) { u = Math.max(0, Math.min(1, u)); return a + (b - a) * u; }
function _rcLin2(a, b, u) { return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]; }
function _rcMix(a, b, k) { return PopRC.mixHex(a, k, b); }
function _rcH(n) { return PopRC.hsh(n); }
function _rcRond(c, r) { const o = []; for (let i = 0; i < 10; i++) o.push([c[0] + Math.cos(i / 10 * 6.283) * r, c[1] + Math.sin(i / 10 * 6.283) * r * 0.8]); return o; }
function _rcRondHoek(P, r) { // vierhoek met afgeronde hoeken
  const o = []; const n = P.length; for (let i = 0; i < n; i++) { const a = P[(i - 1 + n) % n], b = P[i], c = P[(i + 1) % n]; const l1 = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, l2 = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1;
    const k1 = Math.min(r / l1, 0.45), k2 = Math.min(r / l2, 0.45); o.push([b[0] + (a[0] - b[0]) * k1, b[1] + (a[1] - b[1]) * k1], b, [b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2]); }
  return PopRC.spline(o.map((p, i) => (i % 3 === 1 ? p : [p[0], p[1], 1]))); }

// =====================================================================================================
// ZANDHAGEDIS (Lacerta agilis), mannetje in paarkleed. Kop-romp 8 cm (bron: volwassen kop-romp 69-74 mm, max ±80-100 mm; Acta Herpetologica 5(1), 2010),
// staart 1,5 x kop-romp -> 20 cm totaal. De plaat (stap.png) heeft een te korte staart (0,9 x kop-romp): de tekstbron wint. Lijfhoogtes en kop uit de plaat
// (K = 202 px / 8 cm). Achterpoot ±0,5 x kop-romp (dij 1,35, onderbeen 1,2, middenvoet 0,55, 4e teen 1,15 cm, de langste), voorpoot ±0,33 x kop-romp.
// Gang: 'walking trot' met zijwaarts uitstaande poten en een staande golf in de romp (knopen bij de gordels; Ritter 1992, Farley & Ko 1997), duty ±0,6.
// =====================================================================================================
const REPT_HAG_DEF = {
  L: 20, anker: 7.2, NS: 160, NO: 260, sS: 3.0, sH: 7.7, jS: 0.28, jH: 0.32, verMix: 0.36, verKleur: '#1E2A1C', neusRond: 1.1,
  prof: [[0, 2.14, 1.98, 0.12], [0.3, 2.42, 1.86, 0.3], [0.7, 2.6, 1.76, 0.43], [1.2, 2.68, 1.66, 0.52], [1.85, 2.62, 1.45, 0.56], [2.4, 2.48, 1.3, 0.5], [3.0, 2.4, 1.08, 0.6],
    [4.2, 2.32, 0.92, 0.74], [5.6, 2.34, 0.88, 0.78], [6.9, 2.36, 0.98, 0.72], [7.7, 2.28, 1.1, 0.58], [8.1, 2.06, 1.22, 0.46], [9.2, 1.86, 1.2, 0.4], [11, 1.5, 0.98, 0.3],
    [14, 0.98, 0.6, 0.19], [17, 0.56, 0.3, 0.1], [20, 0.2, 0.12, 0.02]],
  PAL: { flank: '#7E9A44', rug: '#8C6E46', rugD: '#6E5434', vlek: '#3A2C1C', oogvlek: '#E6DFC2', buik: '#D6D29C', groenD: '#5C7630', groenL: '#A2BC66', poot: '#78923E', pootL: '#86A04A', pootD: '#68822F', klauw: '#2A2618', kop: '#7A8C42', mond: '#2E2A1A', ring: '#6A7E36' },
  poot: {
    V: { l: [1.2, 1.05, 0.38], dik: 0.1, pool: [-0.5, -0.75, 1], w: [0.3, 0.2, 0.15, 0.13, 0.055], tenen: [[-60, 0.32], [-28, 0.5], [0, 0.6], [28, 0.55], [62, 0.34]], klauw: 0.08 },
    A: { l: [1.45, 1.3, 0.55], dik: 0.11, pool: [0.45, -0.8, 1], w: [0.38, 0.24, 0.17, 0.15, 0.06], tenen: [[-42, 0.35], [-20, 0.6], [0, 0.85], [16, 1.15], [70, 0.55]], klauw: 0.08 },
  },
  GANG: { S: 5.2, scap: 0.25, beta: { V: 0.6, A: 0.62 }, fase: { AN: 0, VF: 0.02, AF: 0.5, VN: 0.52 }, nx: { V: 0.05, A: 0.1 }, spread: { V: 1.6, A: 1.95 }, inw: { V: 0.35, A: 0.4 }, psi: { V: 40, A: 22 },
    lift: { V: 0.62, A: 0.7 }, hiel: { V: 42, A: 55 }, yaw: [24, 26, 30], kopVast: 0.25, staartGolf: 0.7, bob: 0.06, verDx: 0.2 },
  LIGGEN: { bodem: [[0, 0.55], [1.2, 0.3], [2.4, 0.06], [3, 0], [12, 0], [20, 0]], phi: (s) => (s > 7.7 ? 0.5 * Math.sin((s - 7.7) / 12.3 * Math.PI * 1.2) : 0) + (s < 3 ? 0.12 * (3 - s) / 3 : 0),
    voet: { V: [0.3, 2.0, 70, 0], A: [-0.6, 2.4, -20, 0] } },
};
REPT_HAG_DEF.lagen = (Z, P) => { const { M } = Z, L = []; const Ls = (a, b, n, fn) => { const o = []; for (let i = 0; i <= n; i++) o.push(fn(a + (b - a) * i / n)); return o; };
  // groene flank met lichte stippen; bruine rugband (paarkleed-man: groene flanken), oogvlekken in twee rijen; lichte buik; staart: bruin met vage ringen
  L.push({ c: P.buik, pts: Ls(0.2, 19.5, 50, s => M(s, s < 1.7 ? 0.36 - 0.06 * Math.pow(s / 1.65, 2) : (s < 2.6 ? _rcLin0(0.3, 0.2, (s - 1.7) / 0.9) : (s < 8.2 ? 0.2 : 0.22 - 0.08 * (s - 8.2) / 11)))).concat([M(19.5, -1), M(0.2, -1)]) });
  for (let i = 0; i < 70; i++) { const s = 2.6 + _rcH(i * 1.7) * 5.4, f = 0.32 + _rcH(i * 2.9) * 0.38, p = M(s, f); L.push({ c: i % 3 ? P.groenD : P.groenL, pts: _rcRond(p, 0.05 + _rcH(i * 4.1) * 0.035) }); }
  L.push({ c: P.rug, pts: Ls(1.5, 20, 80, s => M(s, s < 2.6 ? _rcLin0(1.02, 0.7, (s - 1.5) / 1.1) : (s < 8 ? 0.7 - 0.03 * Math.sin(s * 3.1) : _rcLin0(0.7, 0.18, (s - 8) / 5)))).concat([M(20.5, 2), M(1.5, 2)]) });
  L.push({ c: P.rugD, pts: Ls(2.0, 12, 50, s => M(s, s < 2.8 ? _rcLin0(1.02, 0.86, (s - 2.0) / 0.8) : (s < 8 ? 0.86 : _rcLin0(0.86, 0.5, (s - 8) / 4)))).concat([M(12.5, 2), M(2.0, 2)]) });
  for (const [f, d] of [[0.79, 0], [0.92, 0.25]]) for (let s = 2.4 + d; s < 9.4; s += 0.5) { const p = M(s, f + 0.02 * Math.sin(s * 5)); L.push({ c: P.vlek, pts: _rcRond(p, 0.085) }); L.push({ c: P.oogvlek, pts: _rcRond(p, 0.03) }); }
  for (let s = 8.8; s < 19.6; s += 0.62) L.push({ c: P.rugD, pts: [M(s, 1.2), M(s + 0.2, 1.2), M(s + 0.16, 0.45), M(s - 0.04, 0.45)] });
  return L; };
REPT_HAG_DEF.kopDetail = (ctx, Z, P, s) => { const { M } = Z;
  const K = []; for (let i = 0; i <= 16; i++) { const ss = 0.05 + i * 0.1; K.push(M(ss, 0.36 - 0.06 * Math.pow(ss / 1.65, 2))); }
  ctx.strokeStyle = P.mond; ctx.lineWidth = 0.05; ctx.lineCap = 'round'; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  { const p = M(0.12, 0.62); ctx.fillStyle = P.mond; ctx.beginPath(); ctx.arc(p[0], p[1], 0.03, 0, 6.283); ctx.fill(); }
  { const p = M(0.98, 0.62); ctx.save(); ctx.translate(p[0], p[1]); const k = s; ctx.scale(1 / k, 1 / k); if (typeof dierOog === 'function') dierOog(ctx, 0, 0, Math.max(1.3, 0.15 * k), '#6A4A1A', { rand: '#D8D0A0' }); ctx.restore(); }
  { const p = M(1.86, 0.5); ctx.fillStyle = PopRC.mixHex(P.flank, 0.45, '#1A1A10'); ctx.beginPath(); ctx.ellipse(p[0], p[1], 0.07, 0.11, 0, 0, 6.283); ctx.fill(); }
};

const REPT = { krokodil: PopRC.reptiel(REPT_KROK_DEF), hagedis: PopRC.reptiel(REPT_HAG_DEF) };

// =====================================================================================================
// CHIMPANSEE (Pan troglodytes), volwassen. Botlengtes (Gombe + andere P. troglodytes, n=50; Jungers & Susman / 1989 Primates, Gombe chimp size):
// humerus 29,3, radius 27,2, femur 29,0, tibia 24,4 cm -> intermembrale index (29,3+27,2)/(29,0+24,4) = 1,06 (literatuur 106, spreiding 100-114).
// De plaat (houdingen.png, K ±2,07 px/cm) had de onderarm langer dan de bovenarm: tekstbron wint. Hand pols->knokkel 11 cm, middenkootjes 4,5 cm
// (plat op de grond, wijzen naar achter bij knokkelgang); voet enkel->bal 13 cm, tenen 7 cm, zool vlak (plantigraad), grote teen opzij.
// Knokkelgang: diagonale volgorde (achter -> diagonale voor -> andere achter -> ...), fase 0 / 0,3 / 0,5 / 0,8, duty ±0,62-0,66 (primaten; Hildebrand 1967,
// Demes e.a. 1994). Schouder ±62 cm, heup ±53 cm boven de grond in knokkelstand (plaat 59 / 56).
// =====================================================================================================
const CHIMP_DEF = {
  bot: { buik: 24, borst: 29, nek: 9, hum: 29.3, rad: 27.2, hand: 11, vinger: 4.5, dij: 29.0, schn: 24.4, voet: 13, teen: 7 },
  schouder: [46, 4], heup: [0, 0], zoolHoek: 20, kopSchaal: 1.0, verMix: 0.3, verKleur: '#10141C', piek: [1.5, 8.5],
  PAL: { vacht: '#343436', licht: '#433E40', donker: '#26272B', huid: '#A87A61', huidD: '#86604C', huidL: '#B48669', lip: '#7A5444', wit: '#E8E4DC', iris: '#4A2A14', stok: '#8A6A44', stokD: '#6A4E30' },
  // romp in rust (x langs de romp vanaf het heupgewricht, y = buikkant +)
  romp: [[-13, 3], [-12.6, -5], [-9.5, -12.5], [-3, -16.5], [8, -17.5], [21, -18], [33, -19.5], [44, -21.5], [52, -21], [57, -17], [60.5, -10], [61.5, -2], [60, 6], [56, 12.5],
    [49, 17], [40, 18.5], [29, 18], [18, 16.8], [8, 15.2], [-1, 13.5], [-8, 10]],
  rompLagen: [{ c: 'licht', p: [[-10, -11], [-3, -15.4], [8, -16.4], [21, -16.9], [33, -18.3], [44, -20.2], [52, -19.6], [56, -15.4], [50, -16.6], [40, -16.4], [27, -15.2], [12, -14.4], [0, -13.6], [-8, -9.5]] },
    { c: 'donker', p: [[4, 14.5], [15, 16.2], [27, 17.4], [39, 18], [49, 16.2], [48, 11.5], [37, 13], [24, 12.5], [12, 11], [3, 10]] }],
  wArm: [7.0, 5.6, 3.8, 3.2, 3.6, 2.3], wBeen: [10.8, 6.4, 3.9, 0, 1.6], wNek: [8.5, 8.2, 7.5],
  // kop (kopframe: oorsprong = atlas, x = kijkrichting, y omlaag), schaal kopSchaal
  kop: [[-8, 2], [-9.5, -4], [-8.5, -9.5], [-4.5, -13.2], [1.5, -14.3], [6.8, -12.6], [10.6, -9.6], [13.2, -7.6], [12.4, -5.6], [12.6, -3.4], [14.6, -0.6], [16.4, 2.4], [16.2, 4.4],
    [15, 6], [12, 8.6], [7, 9.6], [2, 8], [-3, 5]],
  kopHaar: (i) => (i < 40 ? 1 : 0),
  kopLagen: [{ c: 'huid', p: [[7.4, -9.6], [10.6, -9.5], [13.2, -7.6], [12.4, -5.6], [12.6, -3.4], [14.6, -0.6], [16.4, 2.4], [16.2, 4.4], [15, 6], [12, 8.6], [7.4, 9.4], [5, 6.5], [5.2, 1], [6, -4.5]] },
    { c: 'huidL', p: [[13.2, 0.6], [15.0, 0.9], [16.0, 2.6], [15.4, 3.3], [13.4, 2.9]] },
    { c: 'huidD', p: [[7.6, -8.6], [10.8, -9.0], [13.4, -7.6], [12.6, -6.2], [9.6, -6.6], [7.6, -6.8]] },
    { c: 'wit', p: [[11.6, 8.2], [13.4, 7.4], [14.2, 8.4], [12.6, 10.3], [10.9, 9.7]] }],
  oor: [[-2.8, -9.5], [0.2, -11.2], [3.1, -10.2], [4.0, -7.0], [2.8, -3.8], [-0.3, -3.0], [-2.6, -4.6], [-3.4, -7.2]],
  oorBinnen: [[-0.8, -9.0], [1.6, -9.6], [2.7, -7.4], [1.8, -5.0], [-0.2, -4.6], [-1.2, -6.6]],
  gezicht(ctx, T, P, s, F) { const L = (pts, c, w) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); pts.map(T).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
    L([[12.9, 4.4], [14.6, 4.6], [16.0, 4.2]], P.lip, 0.55); // mondspleet
    L([[8.4, -2.4], [10.2, -1.6], [11.4, -2.6]], P.huidD, 0.32); L([[9, 0.2], [11, 0.9]], P.huidD, 0.28); L([[13.4, 6.4], [12.4, 7.4]], P.huidD, 0.28); // rimpels
    const n = T([14.9, -0.9]); ctx.fillStyle = '#3A2420'; ctx.beginPath(); ctx.ellipse(n[0], n[1], 0.5, 0.32, F.A.kop, 0, 6.283); ctx.fill(); // neusgat
    const o = T([10.0, -4.6]); ctx.fillStyle = '#2A1C16'; ctx.beginPath(); ctx.ellipse(o[0], o[1], 1.15, 0.85, F.A.kop, 0, 6.283); ctx.fill();
    ctx.save(); ctx.translate(o[0] + 0.1, o[1]); ctx.scale(1 / s, 1 / s); if (typeof dierOog === 'function') dierOog(ctx, 0, 0, Math.max(1.4, 0.72 * s), P.iris); ctx.restore(); },
  voetVorm: [[-16.5, -1.5], [-16.8, 1.2], [-15, 2.5], [-6, 2.6], [0, 2.6], [1.2, 0.8], [0.6, -1.8], [-4, -3.6], [-9.5, -5.6], [-13.4, -6.4], [-16, -4.4]],
  voetVacht: [[-17, -4.6], [-13.4, -7.2], [-9.5, -6.4], [-11, -3.4], [-15.4, -2.6]],
  groteTeen: true,
  HOUDING: {},
};
// --- houdingen van de chimpansee (functies: geven { F, b, S? } terug) ---
(function () { const H = CHIMP_DEF.HOUDING, RAD = Math.PI / 180;
  const knokkelStand = (X) => { const { fk, benen, B } = X; const F = fk({ R: [-27, -50.5], A: { buik: -13, borst: -17, nek: -48, kop: 4 } });
    const b = benen(F, null, { N: { bal: [-20, -2.6], voet: 20 }, F: { bal: [-31, -2.6], voet: 20 } },
      { N: { knokkel: [F.sch[0] + 7, -1.8], hand: 78, vinger: 180, elleboogTeken: 1 }, F: { knokkel: [F.sch[0] - 1, -1.8], hand: 80, vinger: 180, elleboogTeken: 1 } });
    return { F, b }; };
  H.staan = (o, X) => knokkelStand(X);
  // knokkelgang: diagonale volgorde, teen/knokkel staat stil in de steunfase
  const G = { S: 76, beta: { V: 0.62, A: 0.66 }, fase: { AN: 0, VF: 0.3, AF: 0.5, VN: 0.8 }, lift: { V: 8, A: 6.5 }, nx: { V: 5, A: 7 } };
  CHIMP_DEF.GANG = G;
  H.lopen = (o, X) => { const { fk, benen, kurve, hermite, fr } = X; const t = fr(o.t || 0);
    const bob = 1.0 * Math.cos(4 * Math.PI * (t - 0.1)), pit = 1.4 * Math.sin(4 * Math.PI * (t - 0.05));
    const F = fk({ R: [-27, -50.5 + bob], A: { buik: -13 + pit, borst: -17 + pit * 0.6, nek: -48 - pit, kop: 4 - pit * 0.3 } });
    const voeten = {}, handen = {};
    for (const k of ['N', 'F']) { // benen
      const L = 'A' + k, beta = G.beta.A, p = fr(t - G.fase[L]), steun = p < beta, half = G.S * beta / 2, nx = -27 + G.nx.A; let bx, by = -2.6, va, ta;
      if (steun) { const u = p / beta; bx = nx + half * (1 - 2 * u); va = kurve([[0, 20], [0.55, 20], [1, 62]], u); ta = kurve([[0, 0], [0.55, 0], [1, -42]], u); }
      else { const u = (p - beta) / (1 - beta), m = -G.S * (1 - beta) * 0.5; bx = hermite(nx - half, nx + half, m, m, u); by = -2.6 - G.lift.A * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 1.2); va = kurve([[0, 62], [0.35, 50], [0.8, 14], [1, 20]], u); ta = kurve([[0, -42], [0.3, 0], [0.8, 6], [1, 0]], u); }
      voeten[k] = { bal: [bx, by], voet: va, teen: ta, steun }; }
    for (const k of ['N', 'F']) { // armen
      const L = 'V' + k, beta = G.beta.V, p = fr(t - G.fase[L]), steun = p < beta, half = G.S * beta / 2, nx = F.sch[0] + G.nx.V - 2; let kx, ky = -1.8, ha, va;
      if (steun) { const u = p / beta; kx = nx + half * (1 - 2 * u); ha = kurve([[0, 70], [0.5, 82], [1, 104]], u); va = 180; }
      else { const u = (p - beta) / (1 - beta), m = -G.S * (1 - beta) * 0.5; kx = hermite(nx - half, nx + half, m, m, u); ky = -1.8 - G.lift.V * Math.pow(Math.sin(Math.PI * u), 1.1); ha = kurve([[0, 104], [0.3, 128], [0.75, 92], [1, 70]], u); va = kurve([[0, 180], [0.3, 230], [0.8, 200], [1, 180]], u); }
      const sx = 4 * (kx - nx) / half; handen[k] = { knokkel: [kx, ky], hand: ha, vinger: va, steun, schX: sx * 0.9, schY: -Math.abs(sx) * 0.15 }; }
    const b = benen(F, null, voeten, handen); return { F, b, S: G.S }; };
  // zitten: zitknobbels op de grond, knieën hoog, onderarmen over de knieën, handen hangen
  const zit = (X, A, extra = {}) => { const { fk, benen } = X; const F = fk({ R: [-16, -10.5], A });
    let b = benen(F, null, { N: { bal: [30, -2.6], voet: 20, knieTeken: -1 }, F: { bal: [25, -2.6], voet: 20, knieTeken: -1 } }, {});
    const kN = b.AN.K, kF = b.AF.K;
    const h = { N: extra.N || { pols: [kN[0] + 6, kN[1] + 4.5], hand: 96, vinger: 250, elleboogTeken: 1 }, F: extra.F || { pols: [kF[0] + 7.5, kF[1] + 4], hand: 92, vinger: 245, elleboogTeken: 1 } };
    b = Object.assign(b, benen(F, null, {}, h)); return { F, b, zit: true }; };
  H.zitten = (o, X) => zit(X, { buik: -76, borst: -60, nek: -72, kop: 6 });
  H.liggen = H.zitten;
  // termieten vissen: zittend, nabije arm naar voren met een stokje (grasstengel) in het gat van de termietenheuvel, kop gebogen naar de hand
  H.termieten = (o, X) => { const t = X.fr(o.t || 0); const prik = Math.sin(2 * Math.PI * t), uit = Math.max(0, -Math.cos(2 * Math.PI * t)); // in en uit
    const st = zit(X, { buik: -74, borst: -54, nek: -50, kop: 22 }, { N: { pols: [37 - 3 * prik, -56 + 1.5 * prik], hand: 18, vinger: 120, elleboogTeken: 1, grijp: true } });
    const hp = st.b.VN; const g = [hp.Kn[0] - 0.8, hp.Kn[1] + 1.4]; const a = 27 * RAD, Ls = 46, tip = [g[0] + Math.cos(a) * Ls, g[1] + Math.sin(a) * Ls]; const st0 = [g[0] - Math.cos(a) * 7, g[1] - Math.sin(a) * 7];
    st.armVoorKop = true;
    st.voor = (ctx, P) => { if (!o.heuvel) return; termHeuvel(ctx, 112, 0, 1); };
    st.na = (ctx, P, s) => { ctx.strokeStyle = P.stok; ctx.lineWidth = 0.9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...st0); ctx.lineTo(...tip); ctx.stroke();
      // hand over het stokje: vingers om de stengel
      const d = [Math.cos(a), Math.sin(a)]; ctx.fillStyle = P.huid; ctx.beginPath(); ctx.ellipse(g[0] + d[0] * 0.6, g[1] + d[1] * 0.6 + 0.3, 2.3, 1.6, a, 0, 6.283); ctx.fill();
      ctx.strokeStyle = P.huidD; ctx.lineWidth = 0.3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(g[0] - 1.2 + i * 1.2, g[1] - 0.6); ctx.lineTo(g[0] - 0.8 + i * 1.2, g[1] + 1.6); ctx.stroke(); }
      if (uit > 0.2) { ctx.fillStyle = '#E8D8B0'; for (let i = 0; i < 4; i++) { const q = [tip[0] - d[0] * (2 + i * 2.2) * uit * 3, tip[1] - d[1] * (2 + i * 2.2) * uit * 3]; ctx.beginPath(); ctx.ellipse(q[0], q[1] + (i % 2 ? -0.5 : 0.5), 0.55, 0.3, a, 0, 6.283); ctx.fill(); } } };
    st.stok = { st0, tip }; return st; };
  // even rechtop staan: heup en knie licht gebogen, romp ±20° voorover, armen hangen tot ±de knie (lange armen)
  H.rechtop = (o, X) => { const { fk, benen } = X; const F = fk({ R: [0, -54], A: { buik: -74, borst: -68, nek: -70, kop: 2 } });
    const b = benen(F, null, { N: { bal: [14, -2.6], voet: 20 }, F: { bal: [-3, -2.6], voet: 20 } }, {});
    Object.assign(b, benen(F, null, {}, { N: { pols: [F.sch[0] + 6, F.sch[1] + 52], hand: 92, vinger: 200, elleboogTeken: 1 }, F: { pols: [F.sch[0] + 1, F.sch[1] + 52.5], hand: 94, vinger: 205, elleboogTeken: 1 } }));
    return { F, b }; };
})();
function termHeuvel(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const P = [[-34, 0, 1], [-30, -8], [-24, -22], [-18, -40], [-14, -56], [-10, -68], [-5, -74], [1, -71], [5, -64], [8, -50], [14, -34], [22, -18], [30, -6], [36, 0, 1]];
  const Q = PopRC.spline(P); ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = '#9A7650'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#B48C62'; ctx.beginPath(); ctx.moveTo(-12, -70); ctx.lineTo(-3, -76); ctx.lineTo(-6, -40); ctx.lineTo(-14, 0); ctx.lineTo(-30, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7A5A3A'; for (let i = 0; i < 40; i++) { const px = -30 + PopRC.hsh(i * 2.3) * 64, py = -PopRC.hsh(i * 3.7) * 72; ctx.beginPath(); ctx.ellipse(px, py, 1.4 + PopRC.hsh(i) * 1.6, 0.9, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.fillStyle = '#3A2818'; ctx.beginPath(); ctx.ellipse(-15.5, -33, 1.8, 1.2, 0.3, 0, 6.283); ctx.fill(); ctx.restore(); }
const CHIMPPOP = PopRC.aap(CHIMP_DEF);
CHIMP_DEF.anker = (() => { const st = CHIMPPOP.stand({ houding: 'staan' }); return (st.F.sch[0] + st.F.heup[0]) / 2; })();

// =====================================================================================================
// WRAPPERS (zelfde naam, aanroep, schermmaat en anker als dieren_overig.js / dieren_zoog.js)
// krokodil: lengte ±670 px bij s = 1 (400 cm -> 1,68 px/cm), anker midden onder het dier. hagedis: ±500 px (20 cm -> 25 px/cm), snuit 180 px voor het anker.
// chimp: hoogte ±92 px bij s = 1 in knokkelstand (1,07 px/cm), anker midden tussen schouder en heup. o.houding: krokodil/hagedis 'lopen' (standaard, o.t),
// 'staan', 'liggen'; chimp 'staan' (knokkelstand, standaard), 'lopen' (knokkelgang, o.t), 'zitten', 'termieten' (o.t, o.heuvel), 'rechtop', 'liggen' (= zitten).
// o.boven (reptielen): bovenaanzicht (controle). o.wereld: dier schuift mee met de slaglengte.
// =====================================================================================================
function krokodil(ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; return REPT.krokodil.teken(ctx, x, y, s * 1.68, o); }
function hagedis(ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; return REPT.hagedis.teken(ctx, x, y, s * 25, o); }
function chimp(ctx, x, y, s = 1, a = 1) { const o = typeof a === 'object' ? a : { a }; if ((o.a ?? 1) <= 0.01) return; return CHIMPPOP.teken(ctx, x, y, s * 1.07, o); }
