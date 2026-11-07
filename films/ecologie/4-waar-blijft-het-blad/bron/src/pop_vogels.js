// Vogels als uitknippop (cut-out rig), 23 okt 2026 — POPFAMILIE.md, familie vogels. Laadt NA dieren_overig.js en vervangt
// grondvink, merel, koolmees, zaadkraker, pauw, pauwin, vogel (blauwe reiger) en zwaluw (zelfde naam, aanroep, eenheid en anker).
// VOGELSKELET (anders dan bij de wolf): dijbeen verborgen in de romp (knie wijst naar voren), tibiotarsus ('drumstick') grotendeels bevederd,
// zichtbaar is vooral de tarsus; het gewricht dat naar achter knikt is de HIEL. Vleugel = opperarm, onderarm (armpennen), hand (handpennen).
// De vleugel is een 3D-vlak: slaghoek phi draait de spanwijdte om de lichaamsas (y = b·sin(phi ± eps)), vouw f (0 gespreid, 1 dicht)
// draait de botten in het vleugelvlak; de pennen volgen de botten. Rust: f = 1, phi = -90° (de dichte vleugel ligt tegen de flank).
// Alles in de eenheden van de oude functies (lessen_pop_vogels.md). Twee passes: eerst lichte silhouetrand van alle delen, dan de vlakken.
const VogelPop = (() => {
  const RAD = Math.PI / 180, EPS = 14 * RAD; // eps = camera iets boven het dier: verre vleugel valt niet samen met de nabije
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (v, k) => [v[0] * k, v[1] * k];
  const dir = (a) => [Math.cos(a), Math.sin(a)], ang = (v) => Math.atan2(v[1], v[0]), len = (v) => Math.hypot(v[0], v[1]);
  const L = (a, b, u) => a + (b - a) * u, LP = (p, q, u) => [L(p[0], q[0], u), L(p[1], q[1], u)];
  const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const mix = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const DK = (c, k = 0.25) => mix(c, k, '#000000'), LT = (c, k = 0.25) => mix(c, k, '#FFFFFF');
  const VER = (c) => mix(c, 0.3, '#2E2B29'); // verre delen: warm donker (wolfles 6)
  const RIM = (c) => mix(c, 0.3, '#F2EEE6');
  // sleutelkromme [[u, waarde], ...] met smoothstep
  const kurve = (K, u) => { u = Math.max(0, Math.min(1, u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * ss((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function crs(P, st = 1.2) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = []; const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n]; const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = 0; s < m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  function cro(P, st = 1.2) { const n = P.length, out = [];
    for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)]; const ta = mul(sub(b, p0), 0.5), tb = mul(sub(p3, a), 0.5); const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = (i ? 1 : 0); s <= m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  // buis langs een (open) middellijn P met breedtes W per controlepunt (boven/onder apart mogelijk: Wo)
  function buis(P, W, Wo = W, st = 1.0) { const C = cro(P, st); const cum = [0]; for (let i = 1; i < C.length; i++) cum.push(cum[i - 1] + len(sub(C[i], C[i - 1])));
    const ck = [0]; for (let i = 1; i < P.length; i++) ck.push(ck[i - 1] + len(sub(P[i], P[i - 1]))); const tot = cum[cum.length - 1] || 1, totk = ck[ck.length - 1] || 1;
    const wAt = (Wv, s) => { if (Wv.length !== P.length) { const u = s / tot * (Wv.length - 1), i = Math.min(Wv.length - 2, Math.floor(u)); return L(Wv[i], Wv[i + 1], u - i); }
      const u = s / tot * totk; let i = 0; while (i < ck.length - 2 && ck[i + 1] < u) i++; return L(Wv[i], Wv[i + 1], Math.max(0, Math.min(1, (u - ck[i]) / Math.max(1e-6, ck[i + 1] - ck[i])))); };
    const A = [], B = []; for (let i = 0; i < C.length; i++) { const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)]; const d = sub(b, a), l = len(d) || 1, n = [d[1] / l, -d[0] / l];
      A.push(add(C[i], mul(n, wAt(Wo, cum[i]) / 2))); B.push(sub(C[i], mul(n, wAt(W, cum[i]) / 2))); }
    return { pts: A.concat(B.reverse()), boven: A, onder: B, mid: C }; }
  const tf = (o, a, j = [0, 0]) => (v) => add(o, rot(sub(v, j), a)); // lokaal -> wereld

  // ---------- tekenen: lijst van delen ----------
  // deel = { b: basisvorm, c: vulkleur, l: [{p, c} | {lijn, c, w}], r: false (geen rand), o: omtreklijn [kleur, breedte], na(ctx) }
  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  function render(ctx, D, rw) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const d of D) if (d.r !== false && d.b) { pad(ctx, d.b); ctx.strokeStyle = d.rk || RIM(d.c); ctx.lineWidth = rw * 2; ctx.stroke(); }
    for (const d of D) { if (d.vooraf) d.vooraf(ctx); if (!d.b) { if (d.na) d.na(ctx); continue; }
      pad(ctx, d.b); ctx.fillStyle = d.c; ctx.fill();
      if (d.l && d.l.length) { ctx.save(); pad(ctx, d.b); ctx.clip(); for (const l of d.l) { if (!l) continue;
          if (l.lijn) { ctx.beginPath(); l.lijn.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = l.c; ctx.lineWidth = l.w; ctx.stroke(); }
          else if (l.fn) l.fn(ctx); else { pad(ctx, l.p); ctx.fillStyle = l.c; ctx.fill(); } } ctx.restore(); }
      if (d.o) { pad(ctx, d.b); ctx.strokeStyle = d.o[0]; ctx.lineWidth = d.o[1]; ctx.stroke(); }
      if (d.na) d.na(ctx); } }

  // ---------- poot ----------
  function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al; return { knie: add(p0, mul(dir(a1), l1)), rek }; }
  // tenen: polylijnen (wereld) met breedtes. P = poot-spec, v = voet-pose
  function tenen(P, v) { const F = v.F, T = P.teen, H = P.hal, tw = P.tw, uit = [];
    const boog = (C, r, a0, a1, n = 8) => { const out = []; for (let i = 0; i <= n; i++) { const a = L(a0, a1, i / n); out.push(add(C, mul(dir(a), r))); } return out; };
    if (v.modus === 'tak') { const C = v.C, r = len(sub(F, C)), a0 = ang(sub(F, C));
      const vr = Math.min(1.7, T / r), hr = Math.min(1.35, H / r);
      uit.push({ p: boog(C, r, a0, a0 + vr * 0.92), w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 }); // buitenteen (iets verder)
      uit.push({ p: boog(C, r, a0, a0 + vr), w: [tw * 0.85, tw * 0.62], klauw: 1 }); // middenteen
      uit.push({ p: boog(C, r, a0 + 0.05, a0 - hr), w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else if (v.modus === 'schors') { const a = v.ta || 0; // tenen gespreid tegen de schors
      for (const [da, l, k] of [[-1.15, T, 1], [-0.75, T * 0.8, 1], [1.9, H, -1]]) { const d = dir(a + da); uit.push({ p: [F, add(F, mul(d, l * 0.55)), add(F, add(mul(d, l), mul(dir(a + da + k * 0.6), l * 0.1)))], w: [tw * 0.8, tw * 0.55], klauw: k }); } }
    else if (v.modus === 'vlucht' || v.modus === 'zwaai') { const a = v.ta, k = v.modus === 'vlucht' ? 1 : 0.6, T = P.teen * (v.modus === 'vlucht' ? 0.6 : 0.85), H = P.hal * (v.modus === 'vlucht' ? 0.6 : 0.85); // tenen gekruld (vlucht) of halfgevouwen (zwaaifase lopen)
      const d = dir(a); const C = add(F, mul(dir(a + 1.4), T * 0.22 * k + 0.5));
      uit.push({ p: [F, add(F, mul(dir(a + 0.5), T * 0.45)), add(F, mul(dir(a + 1.2), T * (0.75 - 0.25 * k)))], w: [tw * 0.8, tw * 0.55], klauw: 1, tint: 0.12 });
      uit.push({ p: [F, add(F, mul(dir(a + 0.25), T * 0.55)), add(F, mul(dir(a + 0.9), T * (0.95 - 0.3 * k)))], w: [tw * 0.85, tw * 0.6], klauw: 1 });
      uit.push({ p: [F, add(F, mul(dir(a + 3.0), H * 0.5)), add(F, mul(dir(a + 2.5), H * 0.8))], w: [tw * 0.8, tw * 0.55], klauw: -1 }); }
    else { const y = F[1] + tw * 0.15; // grond: plat, middenteen naar voren, buitenteen iets korter (naar de kijker), achterteen (hallux)
      uit.push({ p: [[F[0], y], [F[0] + T * 0.5, y + tw * 0.1], [F[0] + T * 0.8, y + tw * 0.15]], w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 });
      uit.push({ p: [[F[0], y], [F[0] + T * 0.55, y + tw * 0.15], [F[0] + T, y + tw * 0.2]], w: [tw * 0.85, tw * 0.62], klauw: 1 });
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.15], [F[0] - H, y + tw * 0.2]], w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    return uit; }
  // poot -> delen. heup (wereld), v = {F, ta, modus, C}, ver = verre poot
  function pootDelen(sp, heup, v, ver, kl) {
    const P = sp.poot, D = []; const hiel = sub(v.F, mul(dir(v.ta), P.tars)); const { knie, rek } = ik(heup, hiel, P.fem, P.tib, -1);
    const leg = ver ? VER(P.kl) : P.kl, legL = LT(leg, 0.14), dij = ver ? VER(kl.dij || sp.pal.buik) : (kl.dij || sp.pal.buik);
    // tibiotarsus: bevederd deel (dij/broek) en eventueel kaal onderste deel (reiger, pauw)
    const kaal = P.kaal || 0; const kD = LP(knie, hiel, P.kaal ? 1 - kaal : (P.dijTot ?? 0.55));
    if (kaal > 0) D.push({ b: buis([LP(knie, hiel, 0.5), hiel], [P.tw * 1.25, P.tw * 1.1]).pts, c: leg });
    const dijV = buis([LP(heup, knie, 0.4), knie, LP(knie, kD, 0.55), kD], [P.dij[0] * 0.8, P.dij[0], P.dij[0] * 0.8, P.dij[1]]).pts;
    const dijD = { b: dijV, c: dij };
    // tarsus met schubben (dwarsstreepjes aan de voorkant)
    const tv = buis([hiel, LP(hiel, v.F, 0.5), v.F], [P.tw * 1.2, P.tw, P.tw * 0.95]);
    const sch = []; for (let i = 1; i < 6; i++) { const q = LP(hiel, v.F, i / 6), n = rot(dir(v.ta), -Math.PI / 2); sch.push({ lijn: [add(q, mul(n, P.tw * 0.15)), add(q, mul(n, P.tw * 0.55))], c: DK(leg, 0.25), w: P.tw * 0.12 }); }
    const spoor = P.spoor ? (ctx) => { const q = LP(hiel, v.F, 0.62), n = rot(dir(v.ta), Math.PI / 2); const t = add(q, add(mul(n, P.tw * 1.4), mul(dir(v.ta), -P.tw * 0.5)));
      ctx.fillStyle = DK(leg, 0.2); ctx.beginPath(); ctx.moveTo(...add(q, mul(dir(v.ta), -P.tw * 0.5))); ctx.lineTo(...t); ctx.lineTo(...add(q, mul(dir(v.ta), P.tw * 0.5))); ctx.closePath(); ctx.fill(); } : null;
    D.push({ b: tv.pts, c: leg, l: [...sch, { lijn: [LP(hiel, v.F, 0.05), LP(hiel, v.F, 0.95)].map(q => add(q, mul(rot(dir(v.ta), Math.PI / 2), P.tw * 0.28))), c: legL, w: P.tw * 0.2 }], na: spoor });
    for (const t of tenen(P, v)) { const pp = buis(t.p, t.w); const c = t.tint ? DK(leg, t.tint) : leg; const e = t.p[t.p.length - 1], e2 = t.p[t.p.length - 2]; const a = ang(sub(e, e2));
      D.push({ b: pp.pts, c, na: (ctx) => { // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

  // ---------- vleugel ----------
  // a = langs de lichaamsas (vooruit +), b = langs de spanwijdte. Botten: beta = hoek vanaf +a richting +b.
  function veer(p, be, l, w, punt) { const d = dir(be), n = [-d[1], d[0]], A = [], B = [];
    for (let i = 0; i <= 10; i++) { const u = i / 10; let hw = w * (u < 0.2 ? 0.55 + 2.25 * u : 1); if (u > 0.55) hw *= punt ? Math.pow((1 - u) / 0.45, 0.75) * 0.95 + 0.05 : Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.55) / 0.45, 2.2)));
      const q = add(p, mul(d, u * l)); A.push(add(q, mul(n, hw))); B.push(sub(q, mul(n, hw * 0.62))); }
    return A.concat(B.reverse()); }
  function vleugelGeo(W, f, sweep = 0) {
    const bh = L(56, 170, f) * RAD, bu = L(78, 16, f) * RAD + sweep * 0.5, bm = L(90, 184, f) * RAD + sweep;
    const S = [0, 0], E = add(S, mul(dir(bh), W.hum)), Wr = add(E, mul(dir(bu), W.uln)), T = add(Wr, mul(dir(bm), W.man));
    const P = [], Sx = [], Tt = []; const nP = W.P.length, nS = W.S.length;
    for (let i = 0; i < nP; i++) { const q = i / (nP - 1); const be = bm + L(L(W.pw0 ?? -4, W.pw1 ?? 66, q), L(0, 6, q), f) * RAD; P.push({ p: LP(T, Wr, q * 0.92), be, l: W.P[i], w: W.P[i] * (W.pb ?? 0.13), punt: W.punt ?? 1 }); }
    for (let j = 0; j < nS; j++) { const q = j / (nS - 1); const be = L(L(166, 184, q), L(178, 182, q), f) * RAD; Sx.push({ p: LP(Wr, E, q * 0.95), be, l: W.S[j], w: W.S[j] * (W.sb ?? 0.24), punt: 0 }); }
    for (let k = 0; k < W.T.length; k++) { const be = L(186 + 5 * k, 183 + 3 * k, f) * RAD; Tt.push({ p: LP(E, S, 0.1 + 0.3 * k), be, l: W.T[k], w: W.T[k] * 0.24, punt: 0 }); }
    const dS = dir(L(176, 180, f) * RAD), dP = dir(bm + L(20, 3, f) * RAD), dT = dir(L(186, 182, f) * RAD);
    const M = LP(Wr, T, 0.55);
    const dek = [S, E, LP(E, Wr, 0.5), Wr, M, add(M, mul(dP, W.P[2] * 0.26)), add(Wr, mul(dS, W.S[0] * 0.42)), add(LP(E, Wr, 0.5), mul(dS, W.S[3] * 0.44)), add(E, mul(dS, W.S[nS - 1] * 0.46)), add(S, mul(dT, W.T[0] * 0.5))];
    const kleinDek = [S, E, LP(E, Wr, 0.5), Wr, LP(Wr, T, 0.3), add(LP(Wr, T, 0.3), mul(dP, W.P[2] * 0.1)), add(Wr, mul(dS, W.S[0] * 0.2)), add(E, mul(dS, W.S[nS - 1] * 0.2)), add(S, mul(dT, W.T[0] * 0.22))];
    return { S, E, Wr, T, P, Sx, Tt, dek, kleinDek, dS }; }
  // vleugel -> delen in wereld. sw = schouder (wereld), tb = romphoek, k = projectiefactor (sin(phi ± eps)), dorsaal = bovenkant zichtbaar
  function vleugelDelen(sp, sw, tb, phi, f, ver, sweep = 0) {
    const W = sp.vl, k = ver ? Math.sin(phi - EPS) : Math.sin(phi + EPS), dors = ver ? Math.sin(phi) > -0.05 : k < 0.05;
    const ax = dir(tb), up = [Math.sin(tb), -Math.cos(tb)], g = vleugelGeo(W, f, sweep);
    const pr = (q) => add(sw, add(mul(ax, q[0]), mul(up, q[1] * k * (W.bk ?? 1))));
    const pal = W.pal, cv = (c) => ver ? VER(c) : c;
    const veerC = dors ? pal.veer : pal.onder, zoom = dors ? pal.zoom : DK(pal.onder, 0.12), dek = dors ? pal.dek : LT(pal.onder, 0.1);
    const D = [];
    const veerDeel = (v, c, zc, extra) => { const pts = veer(v.p, v.be, v.l, v.w, v.punt).map(pr); const shaft = [v.p, add(v.p, mul(dir(v.be), v.l * 0.9))].map(pr);
      D.push({ b: pts, c: cv(c), o: [cv(zc), (W.lw ?? 0.9) * L(1, 0.7, f)], l: [f < 0.7 ? { lijn: shaft, c: cv(DK(c, 0.2)), w: (W.lw ?? 0.9) * 0.6 } : null, extra] }); };
    const P = g.P, S = g.Sx, T = g.Tt;
    const handC = pal.hand || veerC, armC = pal.arm || veerC;
    const tip = (v, c) => pal.punt ? { p: veer(add(v.p, mul(dir(v.be), v.l * 0.62)), v.be, v.l * 0.4, v.w, v.punt).map(pr), c: cv(c) } : null;
    if (dors) { for (const v of P) veerDeel(v, dors ? handC : veerC, zoom, tip(v, pal.punt)); for (const v of S) veerDeel(v, armC, zoom); for (const v of T) veerDeel(v, pal.tert || armC, zoom); }
    else { for (const v of [...T].reverse()) veerDeel(v, veerC, zoom); for (const v of [...S].reverse()) veerDeel(v, veerC, zoom); for (const v of [...P].reverse()) veerDeel(v, veerC, zoom); }
    const band = dors && pal.band ? { p: [g.Wr, g.E, add(g.E, mul(g.dS, W.S[W.S.length - 1] * 0.46)), add(g.Wr, mul(g.dS, W.S[0] * 0.42))].map(pr), c: cv(pal.band) } : null;
    const dekL = dors && pal.dekPatroon ? { fn: (ctx) => pal.dekPatroon(ctx, g, pr, ver) } : null;
    D.push({ b: crs(g.dek.map(pr), 1), c: cv(dek), l: [band, dors ? { p: crs(g.kleinDek.map(pr), 1), c: cv(pal.kleinDek || DK(dek, 0.08)) } : null, dekL] });
    return { D, g, pr, k, dors }; }

  // ---------- staart ----------
  function staartDelen(sp, basis, a, spreid, ver) { const S = sp.staart, n = S.n || 5, D = []; const cv = (c) => ver ? VER(c) : c;
    // pennen van achter (verst) naar voor; bij spreiden draaien ze iets uit elkaar
    for (let i = 0; i < n; i++) { const q = n > 1 ? i / (n - 1) : 0.5; const da = (q - 0.5) * spreid * 0.5 + (S.krom || 0) * (q - 0.5); const be = Math.PI + a + da;
      const l = S.L * (S.vork ? 1 + S.vork * Math.pow(Math.abs(q - 0.5) * 2, 3) : 1) * (S.rond ? 1 - 0.08 * Math.pow(Math.abs(q - 0.5) * 2, 2) : 1);
      const p = add(basis, mul(dir(be + Math.PI / 2), (q - 0.5) * S.wb * (0.18 + 0.5 * spreid)));
      const pts = veer(p, be, l, (S.vork ? S.wt * 0.38 : S.wt * 0.5) * (S.vork && Math.abs(q - 0.5) > 0.4 ? 0.6 : 1), S.vork ? 1 : 0);
      const wit = S.wit && (i === n - 1) ? { p: veer(add(p, mul(dir(be), l * 0.35)), be, l * 0.66, S.wt * 0.5, 0), c: cv(S.wit) } : null;
      D.push({ b: pts, c: cv(i === n - 1 ? S.kl : DK(S.kl, 0.1)), o: [cv(S.rand || LT(S.kl, 0.2)), (S.lw || 0.9) * 0.7], l: [{ lijn: [add(p, mul(dir(be), l * 0.1)), add(p, mul(dir(be), l * 0.9))], c: cv(DK(S.kl, 0.22)), w: (S.lw || 0.9) * 0.55 }, wit] }); }
    return D; }

  // ---------- nek (zachte buis tussen romp en kop) ----------
  function nekDelen(sp, P) { const N = sp.nek; const pts = P.nekPts; const nb = buis(pts, P.nekW || N.w, P.nekW || N.w);
    const lagen = []; if (N.voor) lagen.push({ p: nb.onder.concat([...nb.mid].reverse()), c: N.voor }); if (N.achter) lagen.push({ p: nb.boven.concat([...nb.mid].reverse()), c: N.achter });
    if (N.patroon) lagen.push({ fn: (ctx) => N.patroon(ctx, nb) });
    return [{ b: nb.pts, c: N.kl, l: lagen }]; }

  // ---------- het hele dier ----------
  function delen(sp, P, o = {}) {
    const D = [], Tb = tf(P.heup, P.tb), pal = sp.pal;
    const kopW = add(P.kop, [0, 0]), Tk = tf(kopW, P.tk);
    const vl = P.vl || {}; const vlieg = !!vl.vlieg;
    // romp
    const romp = { b: sp.romp.map(Tb), c: pal.basis, l: (sp.rompLagen || []).map(l => l.fn ? { fn: (ctx) => { ctx.save(); ctx.translate(...P.heup); ctx.rotate(P.tb); l.fn(ctx, P); ctx.restore(); } } : l.lijn ? { lijn: l.lijn.map(Tb), c: l.c, w: l.w } : { p: l.p.map(Tb), c: l.c }) };
    const poot = (zij) => { const v = P.poot[zij]; if (!v) return { D: [] }; return pootDelen(sp, Tb(sp.heupL || [0, 0]), v, zij === 'f', { dij: sp.dijKl }); };
    const pn = poot('n'), pf = poot('f');
    const vlD = (zij) => { const v = vl[zij]; if (!v) return { D: [] }; return vleugelDelen(sp, Tb(sp.vl.sch), P.tb, v.phi, v.f, zij === 'f', v.sweep || 0); };
    const staart = staartDelen(sp, Tb(sp.staart.aan), P.tb + (P.ts || 0), P.tsp || 0, false);
    const kop = { b: (sp.kop.Kc || (sp.kop.Kc = VogelPop.crs(sp.kop.K, 1))).map(Tk), c: sp.kop.kl, l: (sp.kop.lagen || []).map(l => l.lijn ? { lijn: l.lijn.map(Tk), c: l.c, w: l.w } : { p: l.p.map(Tk), c: l.c }),
      na: (ctx) => { ctx.save(); ctx.translate(...kopW); ctx.rotate(P.tk); sp.kop.na(ctx, o, P); ctx.restore(); } };
    // volgorde: verre poot, verre vleugel (vlucht), staart/sleep, nabije poot (vlucht: achter de buik), romp, nabije poot, nabije vleugel, nek, kop
    if (pf.dij) D.push(pf.dij); D.push(...pf.D);
    if (vl.f && vlieg) D.push(...vlD('f').D);
    if (sp.achter) D.push(...sp.achter(P, Tb, o));
    if (!sp.staartVoor) D.push(...staart);
    if (pn.dij) D.push(pn.dij);
    if (P.pootAchter) D.push(...pn.D);
    D.push(romp);
    if (sp.staartVoor) D.push(...staart);
    if (sp.rompNa) D.push(...sp.rompNa(P, Tb, o));
    if (!P.pootAchter) D.push(...pn.D);
    if (vl.n) D.push(...vlD('n').D);
    if (sp.vlNa) D.push(...sp.vlNa(P, Tb, o));
    D.push(...nekDelen(sp, P));
    D.push(kop);
    if (sp.kopNa) D.push(...sp.kopNa(P, Tk, o));
    return { D, pn, pf }; }

  function teken(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }

  return { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, mix, DK, LT, VER, RIM, kurve, hermite, crs, cro, buis, tf, pad, render, ik, tenen, pootDelen, veer, vleugelGeo, vleugelDelen, staartDelen, delen, teken };
})();

// ===================================================================================
// ZANGVOGELS (grondvink, zaadkraker, koolmees, merel): één sjabloon, per soort eigen maten, kleuren, kop en houdingen.
// Sjabloon in grondvink-eenheden (1 = 0,5 mm). Romp-lokaal: oorsprong = heup, x = langs de romp naar voren.
// Maten (tekstbronnen, zie lessen_pop_vogels.md): G. fortis 12,5 cm, vleugel 68–73 mm, tarsus 20–24 mm, staart ± 42 mm.
// ===================================================================================
const VogelZang = (() => {
  const V = VogelPop, { RAD, rot, add, sub, mul, dir, L, LP, ss, fr, kurve, DK, LT } = V;
  const ROMP0 = [[-52, -15], [-30, -26], [0, -36], [30, -43], [56, -47], [78, -44], [96, -30], [104, -10], [101, 10], [88, 27], [64, 38], [36, 42], [10, 38], [-14, 28], [-34, 14], [-48, 2], [-56, -7]];
  const MANTEL = [[74, -45], [44, -45], [14, -38], [-4, -31], [14, -27], [46, -30], [72, -34]];
  const sc = (P, sx, sy) => P.map(p => [p[0] * sx, p[1] * sy]);
  // streepjes (druppels) in rijen op borst en flank
  function strepen(ctx, kl, x0, x1, y0, y1, n, w, seed = 1) { ctx.fillStyle = kl; for (let i = 0; i < n; i++) { const u = (i * 0.618 + hash(i * 3.1 + seed) * 0.3) % 1, v = (i * 0.37 + hash(i * 7.7 + seed) * 0.4) % 1; const x = L(x1, x0, u), y = L(y0, y1, v);
      ctx.beginPath(); ctx.ellipse(x, y, w * 0.45, w * (0.9 + 0.4 * hash(i)), 0.35, 0, 6.283); ctx.fill(); } }

  function maak(def) { // def: soortgegevens -> spec voor VogelPop
    const sx = def.sx || 1, sy = def.sy || 1;
    const sp = { rw: def.rw || 1.1, pal: def.pal, romp: V.crs(sc(ROMP0, sx, sy), 1.2), rompLagen: def.rompLagen(sx, sy),
      heupL: [0, 0], dijKl: def.dijKl, kopL: [82 * sx, -26 * sy],
      poot: def.poot, vl: def.vl, staart: Object.assign({ aan: [-50 * sx, -13 * sy] }, def.staart), kop: def.kop,
      nek: { kl: def.kop.kl, voor: def.pal.keel || def.pal.buik, achter: def.kop.kl, aan: [62 * sx, -30 * sy], w: [50 * sy, 48 * sy, 46 * sy] },
      vlNa: (P, Tb) => [{ b: VogelPop.crs(sc(MANTEL, sx, sy), 1).map(Tb), c: def.pal.mantel || def.pal.rug, r: false }],
      kopAan: def.kopAan || [-8, 6], ...def.extra };
    sp.def = def; return sp; }

  // houdingen -> pose. ctxInfo: { z: zitplek }
  function nekPts(sp, P) { const Tb = V.tf(P.heup, P.tb), Tk = V.tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
  function voetGrond(sp, x) { return [x, -sp.poot.tw * 0.55]; }
  function pose(sp, h, o = {}) {
    const d = sp.def, t = o.t || 0, P = { poot: {}, vl: {} };
    const kopRel = (tb) => rot(sp.kopL, tb);
    const vx = d.voetX; // voetmidden t.o.v. het anker (uit de staan-houding)
    if (h === 'staan' || h === 'pikken0') { // grond; kop op het oude kopframe (sb2 rekent daarmee)
      P.tb = d.tbStaan * RAD; P.kop = d.kopF.slice(); P.tk = (o.pik || 0) * d.pikR; const kr = kopRel(P.tb);
      P.heup = [P.kop[0] - kr[0], -d.heupH]; P.ts = d.tsStaan * RAD;
      P.poot.n = { F: voetGrond(sp, P.heup[0] + d.voetDx[0]), ta: d.taStaan * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, P.heup[0] + d.voetDx[1]), ta: (d.taStaan - 6) * RAD, modus: 'grond' };
      P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'pikken') { P.tb = (d.tbStaan + 30) * RAD; P.heup = [vx + 2, -d.heupH + 6]; const kr = kopRel(P.tb); P.kop = add(P.heup, add(kr, [10, 26])); P.tk = (o.pik ?? 1) * d.pikR + 0.35;
      P.ts = (d.tsStaan + 18) * RAD; P.poot.n = { F: voetGrond(sp, vx + 6), ta: (d.taStaan - 4) * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, vx - 8), ta: (d.taStaan - 10) * RAD, modus: 'grond' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'tak' || h === 'schuin') { // tenen om de tak. o.takHoek (rad, schermhoek van de tak; negatief = stijgt naar rechts), o.takDik
      const hk = h === 'schuin' ? (o.takHoek ?? -0.62) : (o.takHoek || 0), dik = o.takDik ?? 10, r = dik / 2; const u = dir(hk), nUp = [Math.sin(hk), -Math.cos(hk)];
      const opTak = (x) => { const p0 = [x, (x - vx) * Math.tan(hk)]; return { F: add(p0, mul(nUp, sp.poot.tw * 0.5)), C: sub(p0, mul(nUp, r)) }; };
      const schuin = Math.max(0, -hk) / 0.62; P.tb = (d.tbTak - 14 * schuin) * RAD; P.ts = (d.tsTak - 6 * schuin) * RAD;
      const a = opTak(vx + 10 + 4 * schuin), b = opTak(vx - 12 - 2 * schuin);
      const hy = L(a.F[1], b.F[1], 0.5); P.heup = [vx + 2 - 6 * schuin, hy - d.heupTak];
      const kr = kopRel(P.tb); P.kop = add(P.heup, add(kr, [0, 2])); P.tk = (o.pik || 0) * d.pikR + (h === 'schuin' ? -0.08 : 0);
      P.poot.n = { F: a.F, C: a.C, ta: (d.taTak - 8 * schuin) * RAD, modus: 'tak' }; P.poot.f = { F: b.F, C: b.C, ta: (d.taTak + 6 - 4 * schuin) * RAD, modus: 'tak' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'klampen') { // aan de schors (oude aanroep draait het hele dier met o.rot): rechtop, tenen gespreid, staart tegen de stam
      P.tb = (d.tbStaan - 28) * RAD; P.heup = [vx + 4, -d.heupH + 4]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = (o.pik || 0) * d.pikR; P.ts = (d.tsStaan - 24) * RAD;
      P.poot.n = { F: [vx + 14, -6], ta: 35 * RAD, modus: 'schors' }; P.poot.f = { F: [vx - 6, 4], ta: 70 * RAD, modus: 'schors' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'vliegen') { const fl = vlucht(d, fr(t)); P.tb = (-4 + fl.kantel) * RAD; P.heup = [vx - 4, -d.heupH - 6 + fl.dy]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = 0.06;
      P.ts = (d.tsStaan + 4 + fl.staart) * RAD; P.tsp = fl.spreid;
      const tuck = (dx, dy, ta) => ({ F: add(P.heup, rot([dx, dy], P.tb)), ta: P.tb + ta * RAD, modus: 'vlucht' });
      P.poot.n = tuck(6 * d.sx, 42 * d.sy, 25); P.poot.f = tuck(-2 * d.sx, 40 * d.sy, 35); P.pootAchter = true;
      P.vl = { vlieg: true, n: { phi: fl.phi, f: fl.f, sweep: fl.sweep }, f: { phi: fl.phi, f: fl.f, sweep: fl.sweep } }; P.vlFase = fl; }
    else if (h === 'hippen') { const g = hup(d, fr(t)); P.tb = (d.tbStaan + g.kantel) * RAD; P.heup = [vx + 2 + g.x, -d.heupH + g.dy]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = g.kop;
      P.ts = (d.tsStaan + g.staart) * RAD; P.dx = 0;
      if (g.lucht) { const F = (dx) => ({ F: add(P.heup, [dx, d.heupH * g.been]), ta: g.ta * RAD, modus: 'vlucht' }); P.poot.n = F(8); P.poot.f = F(0); }
      else { const x = g.x0; P.poot.n = { F: voetGrond(sp, x + 6), ta: g.ta * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, x - 4), ta: (g.ta - 6) * RAD, modus: 'grond' }; }
      P.vl.n = { phi: -90 * RAD + g.vleugel, f: 1 - g.vleugelOpen }; if (g.vleugelOpen > 0.02) { P.vl.vlieg = true; P.vl.f = { phi: P.vl.n.phi, f: P.vl.n.f }; }
      P.hup = g; }
    P.nekPts = nekPts(sp, P); return P; }

  // VLUCHT: flap-bound (golvende vlucht van vinken en mezen): 2 slagen, dan vleugels dicht (referentie vlucht-hup-zit fase 1 en 8).
  // Sleutels [t, phi (graden), vouw]. Neerslag: gespreid. Opslag: pols gebogen (vouw ± 0,55), hand naar achter.
  function vlucht(d, t) {
    const B = d.bound ?? 0.24, F = 1 - B; // fractie slagen
    let phi, f, sweep = 0;
    if (t < F) { const u = t / F * (d.slagen || 2); const k = Math.floor(u), w = u - k; const eerste = k === 0, laatste = k === (d.slagen || 2) - 1;
      // per slag: opslag (0-0,42) dan neerslag (0,42-1)
      if (w < 0.42) { const q = w / 0.42; phi = L(eerste ? -90 : -58, 80, ss(q)) * RAD; f = eerste ? L(1, 0.12, ss(q)) : 0.12 + 0.48 * Math.sin(Math.PI * q); sweep = -0.25 * Math.sin(Math.PI * q); }
      else { const q = (w - 0.42) / 0.58; phi = L(80, laatste ? -70 : -58, ss(q)) * RAD; f = laatste ? L(0.06, 0.25, ss((q - 0.6) / 0.4)) : L(0.12, 0, ss(q * 3)); sweep = 0.12 * Math.sin(Math.PI * q); }
    } else { const q = (t - F) / B; phi = L(-70, -90, ss(q * 3)) * RAD; f = L(0.25, 1, ss(q * 4)); }
    const golf = Math.sin(2 * Math.PI * (t - 0.1)); // stijgt tijdens slagen, zakt in de bound
    return { phi, f, sweep, dy: -4 * golf, kantel: -3 * golf, staart: 6 * Math.max(0, -Math.sin(phi)) - 4, spreid: t < F ? 0.25 : 0.05 }; }
  // HIPPEN: twee voeten tegelijk (zangvogels). 0-0,22 inzakken, 0,22-0,32 afzet, 0,32-0,7 sprong, 0,7-0,85 landen, -1 rechtop.
  function hup(d, t) { const H = d.hup || { l: 70, h: 26 };
    const x = H.l * ss((t - 0.24) / 0.5), x0 = t < 0.5 ? 0 : H.l;
    let dy, ta, kantel, kop = 0, lucht = false, been = 0.85;
    if (t < 0.22) { const q = ss(t / 0.22); dy = 10 * q; ta = L(d.taStaan, d.taStaan + 14, q); kantel = 8 * q; }
    else if (t < 0.32) { const q = ss((t - 0.22) / 0.1); dy = L(10, -6, q); ta = L(d.taStaan + 14, d.taStaan - 18, q); kantel = L(8, -6, q); }
    else if (t < 0.7) { const q = (t - 0.32) / 0.38; dy = -6 - H.h * Math.sin(Math.PI * q); ta = L(70, 95, q); kantel = L(-6, 4, q); lucht = true; been = L(0.92, 0.82, Math.sin(Math.PI * q)); }
    else if (t < 0.85) { const q = ss((t - 0.7) / 0.15); dy = L(-6, 9, q); ta = L(d.taStaan - 14, d.taStaan + 12, q); kantel = L(4, 6, q); }
    else { const q = ss((t - 0.85) / 0.15); dy = L(9, 0, q); ta = L(d.taStaan + 12, d.taStaan, q); kantel = L(6, 0, q); }
    const open = t > 0.3 && t < 0.72 ? Math.sin(Math.PI * (t - 0.3) / 0.42) * (H.open ?? 0) : 0;
    return { x, x0, dy, ta, kantel, kop, lucht, been, staart: -kantel * 1.6, vleugel: open * 30 * RAD, vleugelOpen: open }; }

  // ---------- soorten ----------
  // GRONDVINK (Geospiza fortis). Kopframe (26, -104), pik draait 0,6 rad, snavelpunt (22 + lS, 0,12·hS) met hS = 2,2·mm (sb2 e2s9/e2s11/e2s13).
  function grondvinkDef(o) { const man = o.kleed === 'man';
    const pal = man ? { basis: '#34322F', rug: '#2A2826', buik: '#3E3B38', keel: '#3A3734', streep: '#1C1B1D', snv: '#2A292C' }
                    : { basis: '#7A6858', rug: '#665446', buik: '#C2AE98', keel: '#B7A28A', streep: '#6A5646', snv: '#B9A88A' };
    const kop = { kl: man ? '#33312E' : '#776455', K: [[-24, 14], [-20, -10], [-8, -24], [8, -28], [22, -22], [28, -12], [30, 2], [24, 14], [8, 20], [-10, 22]],
      lagen: [{ p: [[-30, -40], [30, -40], [30, -15], [8, -14], [-30, -4]], c: man ? '#2A2826' : '#6A5747' }, { p: [[0, 8], [30, 5], [30, 30], [-14, 30]], c: man ? '#3C3936' : pal.keel },
        ...(man ? [] : [0, 1, 2, 3, 4, 5].map(i => ({ lijn: [[-12 + i * 6, -24 + (i % 2) * 3], [-14 + i * 6, -17 + (i % 2) * 3]], c: '#5A4838', w: 1.5 }))), man ? null : { lijn: [[2, 3], [18, 8]], c: '#9A8670', w: 1.6 }].filter(Boolean),
      na: (ctx, oo) => { const sn = oo.snavel ?? 9.3, hS = sn * 2.2, lS = hS * 1.2; const k = oo.snavelKleur || pal.snv; _kegelSnavel(ctx, 22, 0, hS, lS, k, oo.snavelKleur ? LT(oo.snavelKleur, 0.35) : LT(k, 0.3), 0.6);
        dierOog(ctx, 10, -6, 4.6, '#2A1A10', { rand: man ? '#4A4744' : '#E2D6C0' }); } };
    return { naam: 'grondvink', kopF: [26, -104], pikR: 0.6, sx: 0.9, sy: 0.86, rw: 1.1, pal, kop,
      tbStaan: -8, heupH: 62, tsStaan: 2, taStaan: 64, voetDx: [14, 2], tbTak: -30, heupTak: 52, tsTak: 18, taTak: 74,
      poot: { fem: 30, tib: 50, tars: 42, teen: 30, hal: 22, tw: 4.2, kl: man ? '#2E2A28' : '#4A4440', klauw: '#1E1A18', dij: [20, 11] },
      staart: { L: 84, wb: 14, wt: 15, n: 5, kl: man ? '#2A2826' : '#5E4E42', rand: man ? '#4E4B48' : '#9A8670' },
      vl: { sch: [48, -27], hum: 32, uln: 38, man: 28, P: [104, 112, 110, 104, 96, 88, 80, 74, 68], S: [64, 63, 62, 61, 60, 59, 58, 58, 57], T: [64, 60, 52],
        pal: man ? { veer: '#2E2C2C', zoom: '#5C5856', dek: '#363432', onder: '#4A4644', kleinDek: '#3C3A38' } : { veer: '#5A4A40', zoom: '#B09A82', dek: '#6E5C4E', onder: '#857464', kleinDek: '#7A6858', tert: '#5E4E42' } },
      rompLagen: () => [{ p: [[-70, -70], [130, -80], [80, -42], [40, -30], [0, -18], [-60, -6]], c: pal.rug }, { p: [[130, -60], [92, -40], [66, -16], [36, 4], [0, 12], [-30, 8], [-60, 0], [-70, 60], [130, 60]], c: pal.buik },
        man ? { fn: (ctx) => { ctx.fillStyle = '#E8E4DC'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-42 + i * 6, 6 + i * 3, 3, 2, 0.4, 0, 6.283); ctx.fill(); } } }
          : { fn: (ctx) => strepen(ctx, pal.streep, 10, 100, -30, 34, 40, 3.4, 2) }],
      hup: { l: 70, h: 24 } }; }
  function zaadkrakerDef(o) { const pal = { basis: '#2A282E', rug: '#232127', buik: '#2E2C33', keel: '#B8323A', rood: '#B8323A', roodL: '#D45A5E', snv: '#3E4A60' };
    const big = o.snavel === 'groot' ? 31 : o.snavel === 'midden' ? 26 : 21;
    const kop = { kl: pal.rood, K: [[-24, 16], [-20, -8], [-6, -26], [12, -30], [26, -22], [34, -8], [34, 8], [24, 18], [4, 22], [-12, 20]], lagen: [{ p: [[-30, -40], [40, -40], [40, -24], [0, -20], [-30, -12]], c: DK(pal.rood, 0.06) }],
      na: (ctx, oo) => { const sk = oo.snavelKleur || pal.snv; _kegelSnavel(ctx, 30, -2, big, big * 1.15, sk, oo.snavelKleur ? LT(oo.snavelKleur, 0.35) : '#8494B0', 0.7); dierOog(ctx, 13, -8, 4.4, '#2A1A10', { rand: '#5A6478' }); } };
    return { naam: 'zaadkraker', kopF: [30, -112], pikR: 0.6, sx: 1.06, sy: 1.04, rw: 1.1, pal, kop,
      tbStaan: -12, heupH: 62, tsStaan: 6, taStaan: 64, voetDx: [6, -8], tbTak: -34, heupTak: 54, tsTak: 16, taTak: 76,
      poot: { fem: 32, tib: 52, tars: 42, teen: 30, hal: 22, tw: 5, kl: '#6A5E58', klauw: '#2A2420', dij: [24, 14] }, dijKl: '#2A282E',
      staart: { L: 98, wb: 15, wt: 16, n: 5, kl: '#962830', rand: '#C84A50' },
      vl: { sch: [64, -40], hum: 34, uln: 40, man: 30, P: [108, 116, 114, 108, 100, 92, 84, 78, 72], S: [66, 65, 64, 63, 62, 61, 60, 60, 59], T: [66, 62, 54],
        pal: { veer: '#2A2830', zoom: '#55525E', dek: '#2E2C34', onder: '#3E3C46', kleinDek: '#34323A' } },
      rompLagen: (sx, sy) => [{ p: sc([[130, -60], [70, -54], [50, -20], [70, 10], [96, 30], [130, 30]], sx, sy), c: pal.rood }, { p: sc([[-30, -40], [-70, -40], [-70, 0], [-50, 0], [-40, -20]], sx, sy), c: pal.rood }] }; }
  function koolmeesDef(o) { const pal = { basis: '#7E9058', rug: '#6E8050', buik: '#E2C44A', keel: '#1C1D24', zwart: '#1C1D24', geelD: '#CDAE3C' };
    const kop = { kl: '#1C1D24', K: [[-22, 16], [-20, -8], [-8, -22], [8, -24], [20, -18], [26, -6], [26, 8], [16, 16], [-4, 20]],
      lagen: [{ p: [[-10, 4], [4, -4], [18, -2], [22, 8], [10, 14], [-6, 13]], c: '#F2F2EE' }, { p: [[-22, -8], [-16, -14], [-14, -4], [-20, 0]], c: '#E8EAD8' }],
      na: (ctx, oo) => { vul(ctx, [[24, -5], [36, -1], [44, 1], [36, 4], [24, 5]], '#24252C', '#4A4C56', 1); lijn(ctx, [[25, 1], [43, 1]], '#0E0F12', 1); dierOog(ctx, 14, -9, 3.6, '#1A1210'); if (oo.prooi) oo.prooi(ctx, 44, 0); } };
    return { naam: 'koolmees', kopF: [30, -104], pikR: 0.7, sx: 0.9, sy: 0.88, rw: 1.0, pal, kop, kopAan: [-8, 8],
      tbStaan: -14, heupH: 56, tsStaan: 4, taStaan: 64, voetDx: [6, -8], tbTak: -34, heupTak: 48, tsTak: 14, taTak: 76,
      poot: { fem: 28, tib: 48, tars: 40, teen: 28, hal: 22, tw: 4.6, kl: '#5E6A80', klauw: '#2A2E38', dij: [22, 13] }, dijKl: '#D8D4C4',
      staart: { L: 118, wb: 13, wt: 15, n: 5, kl: '#5E7090', rand: '#8EA2C0', wit: '#EEEEEA' },
      vl: { sch: [56, -36], hum: 32, uln: 38, man: 30, P: [110, 118, 116, 110, 102, 94, 86, 80, 74], S: [66, 65, 64, 63, 62, 61, 60, 60, 59], T: [64, 60, 52],
        pal: { veer: '#5E7090', zoom: '#C8D2E2', dek: '#6E829E', onder: '#AEB6C2', band: '#F2F2EE', kleinDek: '#788A72', tert: '#6A7C98' } },
      rompLagen: (sx, sy) => [{ p: sc([[-70, -70], [130, -80], [110, -30], [60, -28], [0, -18], [-60, -8]], sx, sy), c: pal.rug },
        { p: sc([[130, -24], [96, -4], [60, 8], [20, 14], [-20, 10], [-60, 0], [-70, 60], [130, 60]], sx, sy), c: pal.buik },
        { p: sc([[-30, 16], [-60, 2], [-70, 60], [-10, 60]], sx, sy), c: '#D8D4C4' },
        { p: sc([[110, -40], [104, -6], [92, 18], [70, 34], [44, 44], [40, 36], [62, 24], [80, 6], [90, -20], [94, -40]], sx, sy), c: pal.zwart }] }; }
  function merelDef(o) { const pal = { basis: '#2C2B31', rug: '#25242A', buik: '#34333A', keel: '#2F2E34' };
    const kop = { kl: '#2C2B31', K: [[-22, 16], [-20, -8], [-8, -20], [8, -22], [20, -16], [26, -6], [26, 8], [16, 16], [-4, 20]], lagen: [{ p: [[-30, -40], [30, -40], [30, -12], [-30, -4]], c: '#25242A' }],
      na: (ctx, oo) => { vul(ctx, [[20, -7], [36, -5], [55, -1], [57, 1], [38, 4], [20, 6]], '#E3A23A', '#F2C878', 1.2); vul(ctx, [[22, 1], [40, 2], [56, 1], [38, 5], [22, 6]], '#ECB656');
        lijn(ctx, [[21, 0], [55, 0]], '#9A6420', 1.3); circ(ctx, 28, -3, 1.4, '#9A6420'); dierOog(ctx, 12, -6, 4.2, '#1A1210', { rand: '#E8A83A' }); if (oo.prooi) oo.prooi(ctx, 54, 0); } };
    return { naam: 'merel', kopF: [36, -118], pikR: 0.8, sx: 0.74, sy: 0.7, rw: 1.0, pal, kop,
      tbStaan: -16, heupH: 66, tsStaan: 2, taStaan: 66, voetDx: [8, -8], tbTak: -30, heupTak: 46, tsTak: 22, taTak: 76,
      poot: { fem: 28, tib: 48, tars: 34, teen: 26, hal: 18, tw: 4.4, kl: '#3E3428', klauw: '#1E1A16', dij: [20, 12] }, dijKl: '#323137',
      staart: { L: 104, wb: 14, wt: 18, n: 5, kl: '#24232A', rand: '#4E4D56', rond: 1 },
      vl: { sch: [44, -26], hum: 26, uln: 30, man: 24, P: [92, 98, 97, 93, 87, 81, 75, 70, 66], S: [56, 55, 55, 54, 53, 53, 52, 52, 51], T: [56, 52, 46],
        pal: { veer: '#26252B', zoom: '#55545C', dek: '#2E2D33', onder: '#3E3D44', kleinDek: '#333238' } },
      rompLagen: (sx, sy) => [{ p: sc([[-70, -70], [130, -80], [110, -26], [0, -18], [-60, -8]], sx, sy), c: pal.rug }, { p: sc([[130, -10], [60, 14], [-60, 4], [-70, 60], [130, 60]], sx, sy), c: pal.buik },
        { fn: (ctx) => { ctx.strokeStyle = 'rgba(94,93,102,0.5)'; ctx.lineWidth = 1.2; for (let i = 0; i < 16; i++) { const px = 72 - (i % 6) * 11, py = -4 + Math.floor(i / 6) * 10 + (i % 2) * 3; ctx.beginPath(); ctx.arc(px, py, 3.4, 0.2, 2.6); ctx.stroke(); } } }],
      bound: 0.08, slagen: 3, hup: { l: 60, h: 20 } }; }

  const DEFS = { grondvink: grondvinkDef, zaadkraker: zaadkrakerDef, koolmees: koolmeesDef, merel: merelDef };
  const CACHE = {};
  function spec(naam, o = {}) { const key = naam + '|' + (o.kleed || '') + '|' + (o.snavel || ''); if (CACHE[key]) return CACHE[key];
    const d = DEFS[naam](o); const sp = maak(d);
    // voetmidden t.o.v. het anker uit de staan-houding (kop op het oude kopframe)
    d.voetX = 0; const P = pose(sp, 'staan', {}); d.voetX = (P.poot.n.F[0] + P.poot.f.F[0]) / 2; return (CACHE[key] = sp); }

  // oude aanroepen: houding automatisch uit de zitplek (_zitplek in dieren_overig.js) of o.houding
  function kies(ctx, x, y, s, o) { let h = o.houding, dy = 0, extra = {};
    if (h === 'tak') { dy = o.takY != null ? (o.takY - y) / s : 0; extra.takDik = o.takDik ?? 10; }
    else if (!h) { const z = o.rot ? { soort: 'schors' } : _zitplek(ctx, x, y, s, o);
      if (z.soort === 'tak') { h = 'tak'; dy = Math.min(0, z.top); extra.takDik = z.dik; } else if (z.soort === 'schors') h = 'klampen'; else h = (o.pik && o.pik >= 0.99 && false) ? 'pikken' : 'staan'; }
    if (h === 'staan' && o.pik) h = 'staan';
    return { h, dy, extra }; }
  function teken(naam, ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const sp = spec(naam, o); const k = kies(ctx, x, y, s, o);
    const oo = Object.assign({}, o, k.extra); const P = pose(sp, k.h, oo); const wx = o.wereld && k.h === 'hippen' ? (sp.def.hup || { l: 70 }).l * Math.floor(o.t || 0) : 0;
    return V.teken(ctx, sp, P, x + wx * s * (o.kijk || 1), y + k.dy * s, s, oo); }
  return { spec, pose, teken, vlucht, hup, DEFS };
})();

// ---- integratie: zelfde namen en aanroepvorm als dieren_overig.js ----
grondvink = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('grondvink', ctx, x, y, s, o); };
merel = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('merel', ctx, x, y, s, o); };
koolmees = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('koolmees', ctx, x, y, s, o); };
zaadkraker = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('zaadkraker', ctx, x, y, s, o); };

// ===================================================================================
// GROTE VOGELS (blauwe reiger, pauw, pauwin) en boerenzwaluw: eigen pop per soort, zelfde motor (VogelPop).
// Houdingen = tabellen (romphoek, heuphoogte, nek als S-lijn van controlepunten vanaf de nekbasis, voeten); lopen = tweebenig gangmodel
// (steunvoet staat stil, duty factor 0,6–0,65, poten in tegenfase, kop 'houdt en stoot' zoals bij hoenders en reigers).
// ===================================================================================
const VogelGroot = (() => {
  const V = VogelPop, { RAD, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, kurve, hermite, DK, LT, VER, crs, buis, tf } = V;

  // tweebenig gangmodel: G = { S, beta, lift, taS, taZ, bob, kopbob }, x0 = neutrale voet-x per poot (t.o.v. de heup)
  function gang(G, t, x0, tw) { const v = {}; const half = G.S * G.beta / 2;
    for (const z of ['n', 'f']) { const p = fr(t - (z === 'n' ? 0 : 0.5)), steun = p < G.beta; let x, y = 0, ta, modus, u;
      if (steun) { u = p / G.beta; x = x0[z] + half * (1 - 2 * u); ta = kurve(G.taS, u); modus = 'grond'; }
      else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; x = hermite(x0[z] - half, x0[z] + half, m, m, u); y = -G.lift * Math.pow(Math.sin(Math.PI * u), 1.2); ta = kurve(G.taZ, u); modus = u > 0.82 ? 'grond' : 'zwaai'; }
      v[z] = { F: [x, -tw * 0.55 + y], ta: ta * RAD, modus, steun, u }; }
    const h = fr(2 * t); const kop = G.kopbob * G.S / 2 * ((h < 0.6 ? -h : -0.6 + 0.6 * ss((h - 0.6) / 0.4)) + 0.3);
    return { v, bob: -G.bob * Math.cos(4 * Math.PI * (t - G.beta / 2)), kop }; }

  // nek: [binnen de romp, basis, controlepunten (wereld, t.o.v. de basis), kop-aanhechting]
  function nekLijn(sp, P, ctrl, kopVerschuif = 0) { const Tb = tf(P.heup, P.tb), b = Tb(sp.nekAan); const n = ctrl.length;
    const pts = ctrl.map((c, i) => add(b, add(c, [kopVerschuif * Math.pow((i + 1) / n, 1.5), 0])));
    P.kop = pts[n - 1]; const Tk = tf(P.kop, P.tk);
    P.nekPts = [Tb(sp.nekIn), b, ...pts.slice(0, n - 1), Tk(sp.kopAan), Tk(add(sp.kopAan, [6, 0]))]; }

  function pose(sp, h, o = {}) { const H = sp.H[h] || sp.H.staan, P = { poot: {}, vl: {} }; const t = o.t || 0;
    P.tb = H.tb * RAD; P.ts = (H.ts || 0) * RAD; P.tk = H.tk || 0; P.heup = [H.hx || 0, -H.heupH];
    let kv = 0;
    if (H.gang) { const g = gang(H.gang, fr(t), { n: H.voet[0][0], f: H.voet[1][0] }, sp.poot.tw); P.heup[1] += g.bob; kv = g.kop; P.tb += 1.2 * RAD * Math.sin(4 * Math.PI * t);
      for (const z of ['n', 'f']) { const v = g.v[z]; P.poot[z] = { F: [P.heup[0] + v.F[0], v.F[1]], ta: v.ta, modus: v.modus, steun: v.steun }; }
      P.dx = o.wereld ? H.gang.S * fr(t) : 0; P.gangS = H.gang.S; }
    else if (H.vlieg) { const fl = (sp.vlucht || vluchtStaal)(fr(t)); P.heup = [0, fl.dy]; P.tb += fl.kantel * RAD;
      P.vl = { vlieg: true, n: { phi: fl.phi, f: fl.f, sweep: fl.sweep || 0 }, f: { phi: fl.phi, f: fl.f, sweep: fl.sweep || 0 } }; P.pootAchter = !!H.pootAchter;
      const Tb = tf(P.heup, P.tb); for (const [z, i] of [['n', 0], ['f', 1]]) { const [dx, dy, ta] = H.voet[i]; P.poot[z] = { F: Tb([dx, dy]), ta: P.tb + ta * RAD, modus: H.tenen || 'vlucht' }; } }
    else { for (const [z, i] of [['n', 0], ['f', 1]]) { const [dx, ta] = H.voet[i]; P.poot[z] = { F: [P.heup[0] + dx, -sp.poot.tw * 0.55], ta: ta * RAD, modus: 'grond' }; }
      if (o.t && sp.adem) { P.tk += 0.03 * Math.sin(2 * Math.PI * t); } }
    if (!H.vlieg) P.vl.n = { phi: -90 * RAD, f: 1 };
    nekLijn(sp, P, H.nek, kv); P.h = h; return P; }

  // slagcyclus voor grote vogels: diep en traag, geen bound (reiger); sleutels [t, phi, vouw]
  function vluchtStaal(t) { let phi, f, sweep = 0;
    if (t < 0.45) { const q = t / 0.45; phi = L(70, -55, ss(q)) * RAD; f = 0.04; sweep = 0.1 * Math.sin(Math.PI * q); }
    else { const q = (t - 0.45) / 0.55; phi = L(-55, 70, ss(q)) * RAD; f = 0.04 + 0.4 * Math.sin(Math.PI * q); sweep = -0.3 * Math.sin(Math.PI * q); }
    const g = Math.sin(2 * Math.PI * (t - 0.2)); return { phi, f, sweep, dy: -6 * g, kantel: -1.5 * g }; }

  // ---------- BLAUWE REIGER (Ardea cinerea) ----------
  // 84–102 cm, tot 1 m hoog, spanwijdte 155–195 cm; tarsus ± 15 cm, snavel ± 12 cm, vleugel ± 45 cm. Eenheid ± 0,225 cm (hoogte ± 430 als bij de oude vogel()).
  function reiger() { const pal = { basis: '#9AA2AD', rug: '#8A929E', buik: '#D6DADF', grijs: '#9AA2AD', zw: '#1E2026', wit: '#EDEEF0' };
    const romp = crs([[-82, -18], [-58, -36], [-16, -44], [32, -46], [70, -40], [96, -24], [106, -2], [98, 20], [72, 34], [30, 40], [-12, 36], [-52, 22], [-78, 4]], 2);
    return { naam: 'reiger', rw: 1.6, pal, romp,
      rompLagen: [{ p: [[130, -48], [92, -20], [60, 6], [20, 22], [-30, 26], [-90, 20], [-90, 90], [130, 90]], c: pal.buik }, { p: [[-60, 14], [10, 22], [60, 10], [60, 22], [10, 34], [-60, 30]], c: pal.zw }],
      rompNa: (P, Tb) => [{ r: false, na: (ctx) => { ctx.strokeStyle = pal.wit; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = Tb([96 - i * 4, -8 + i * 3]), b = Tb([80 - i * 6, 28 + i * 2]); ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(a[0] - 2, (a[1] + b[1]) / 2 + 8, b[0], b[1] + 14); ctx.stroke(); } } }],
      heupL: [0, 0], dijKl: '#B9BFC7', nekAan: [92, -26], nekIn: [70, -20], kopAan: [-10, 4],
      poot: { fem: 52, tib: 100, tars: 70, teen: 46, hal: 30, tw: 7.4, kl: '#B49A5C', klauw: '#2A2620', dij: [26, 14], kaal: 0.42 },
      staart: { aan: [-74, -10], L: 62, wb: 14, wt: 20, n: 4, kl: '#7E8692', rand: '#B8BEC6', lw: 1.4 },
      vl: { sch: [64, -28], hum: 74, uln: 86, man: 52, P: [150, 160, 158, 152, 144, 136, 128, 122, 116, 112], S: Array.from({ length: 11 }, (_, i) => 120 - i * 1.5), T: [116, 108, 98],
        pw0: 2, pw1: 46, pb: 0.17, sb: 0.26, punt: 0, lw: 1.4,
        pal: { veer: '#7E8692', zoom: '#B7BDC6', dek: '#A3AAB4', onder: '#8D949F', kleinDek: '#C8CDD4', hand: '#2C2E34', arm: '#6E7682', tert: '#8E96A2',
          dekPatroon: (ctx, g, pr, ver) => { ctx.fillStyle = ver ? VER('#1E2026') : '#1E2026'; V.pad(ctx, crs([g.Wr, LP(g.Wr, g.E, 0.25), add(LP(g.Wr, g.E, 0.25), mul(g.dS, 22)), add(g.Wr, mul(g.dS, 26))].map(pr), 1)); ctx.fill(); } } },
      kop: { kl: pal.wit, K: [[-17, -4], [-5, -12], [9, -10], [17, 0], [11, 10], [-5, 12], [-17, 8]],
        lagen: [{ p: [[-3, -7], [11, -5], [3, 1], [-19, 4], [-30, 6], [-30, -2], [-20, -4]], c: pal.zw }],
        na: (ctx) => { lijn(ctx, [[-14, -2], [-38, 4], [-62, 12]], pal.zw, 2.2); lijn(ctx, [[-14, 0], [-34, 8], [-52, 18]], pal.zw, 1.6);
          vul(ctx, [[12, -4], [42, 1], [66, 7], [42, 9], [12, 8]], '#C8A44A', '#E2C47A', 1.2); lijn(ctx, [[13, 2], [62, 7]], '#8A6A2A', 1.2); dierOog(ctx, 5, -1, 3.2, '#D8B43A'); } },
      nek: { kl: pal.wit, voor: pal.wit, achter: '#DCDFE3', w: [34, 24, 20, 18],
        patroon: (ctx, nb) => { ctx.fillStyle = pal.zw; const B = nb.onder, n = B.length; for (let i = 0; i < 12; i++) { const q = B[Math.floor(n * (0.25 + i * 0.05))]; if (!q) continue; ctx.beginPath(); ctx.ellipse(q[0], q[1], 1.8, 3.6, 0.3, 0, 6.283); ctx.fill(); } } },
      H: { staan: { tb: -44, heupH: 196, nek: [[10, -34], [-2, -84], [12, -130], [36, -150]], tk: 0.04, ts: 30, voet: [[12, 86], [-4, 82]] },
           rust: { tb: -32, heupH: 190, nek: [[18, -16], [2, -42], [16, -66], [40, -72]], tk: 0.08, ts: 22, voet: [[10, 86], [-4, 82]] },
           lopen: { tb: -16, heupH: 192, nek: [[30, -28], [66, -56], [104, -68], [132, -68]], tk: 0.14, ts: 10, voet: [[16, 0], [16, 0]],
             gang: { S: 120, beta: 0.64, lift: 34, taS: [[0, 62], [0.5, 84], [1, 108]], taZ: [[0, 112], [0.4, 128], [0.75, 70], [1, 62]], bob: 3, kopbob: 0.55 } },
           vliegen: { tb: -2, vlieg: 1, nek: [[16, 10], [34, 20], [52, 12], [62, -6]], tk: 0.02, ts: 4, voet: [[-260, 6, 178], [-252, 12, 176]], pootAchter: false, tenen: 'zwaai' } } }; }

  // ---------- PAUW (Pavo cristatus, man) ----------
  // Snavel–staart 100–120 cm, met sleep 200–230 cm; sleep = verlengde bovenstaartdekveren; pronk: waaier opgezet en trillend, vleugels half open en hangend.
  // Eenheid ± 0,37 cm (kop ± 300 boven de grond, als de oude pauw()).
  const pauwKop = (pal, kuif) => ({ kl: pal.kop, K: [[-11, 6], [-9, -6], [2, -11], [12, -8], [16, -1], [12, 6], [0, 9]],
    lagen: [{ p: [[-4, -6], [6, -7], [12, -4], [2, -4]], c: pal.gezicht }, { p: [[-2, 2], [6, 4], [12, 2], [6, 1]], c: pal.gezicht }],
    na: (ctx) => { for (let i = 0; i < 9; i++) { const bx = -4 + i * 1.2, by = -9 - i * 0.2, an = -1.95 + i * 0.09, l = kuif * (1 + (i % 3) * 0.08); const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l;
        lijn(ctx, [[bx, by], [tx, ty]], pal.kuifS, 1.1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-4, -3, 0, -6); ctx.quadraticCurveTo(4, -3, 0, 2); ctx.fillStyle = i % 2 ? pal.kuif1 : pal.kuif2; ctx.fill(); ctx.restore(); }
      vul(ctx, [[13, -4], [22, -2], [26, 1], [21, 3], [13, 3]], '#B0A288', '#D0C4A8', 1); dierOog(ctx, 4, -2, 2.6, '#2A1A10'); } });
  const PAUWROMP = crs([[-92, -8], [-64, -34], [-14, -48], [36, -46], [62, -30], [72, -6], [64, 18], [34, 38], [-16, 44], [-58, 34], [-86, 14]], 2);
  function pauwBasis(man) {
    const pal = man ? { basis: '#2C5EA6', rug: '#3E7A4E', buik: '#1E2E3A', kop: '#2C5EA6', gezicht: '#EEEEE6', kuifS: '#3A4A6A', kuif1: '#3E8AA0', kuif2: '#4C86CC' }
                    : { basis: '#8A7660', rug: '#7A6650', buik: '#E8E2D4', kop: '#8A6A4A', gezicht: '#E8E2D4', kuifS: '#5A4A38', kuif1: '#7A6A48', kuif2: '#6A8A6A' };
    const kop = pauwKop(pal, man ? 26 : 20); if (!man) kop.lagen.push({ lijn: [[-6, -2], [10, -3]], c: '#4A3A2A', w: 2.2 });
    return { naam: man ? 'pauw' : 'pauwin', rw: 1.5, pal, romp: PAUWROMP,
      rompLagen: man ? [{ p: [[80, 10], [30, 22], [-30, 22], [-100, 10], [-100, 80], [80, 80]], c: pal.buik },
          { p: [[60, -60], [-100, -60], [-100, -6], [-40, -16], [30, -30]], c: pal.rug }, { fn: (ctx) => { ctx.strokeStyle = '#1E3A2A'; ctx.lineWidth = 1.4; for (let r = 0; r < 4; r++) for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(40 - i * 13 - r * 6, -42 + r * 8, 5, 0.2, 2.9); ctx.stroke(); } } }]
        : [{ p: [[80, 14], [40, 26], [-20, 30], [-100, 22], [-100, 80], [80, 80]], c: pal.buik }, { fn: (ctx) => { ctx.fillStyle = 'rgba(230,220,200,0.7)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(40 - (i % 8) * 12 - Math.floor(i / 8) * 5, -38 + Math.floor(i / 8) * 8, 1.8, 0, 6.283); ctx.fill(); } } }],
      heupL: [-6, 4], dijKl: man ? '#22323E' : '#D8D0C0', nekAan: [52, -36], nekIn: [34, -26], kopAan: [-8, 4],
      poot: { fem: 50, tib: 70, tars: 48, teen: 34, hal: 22, tw: 8.4, kl: '#8A7C6C', klauw: '#4A4038', dij: [28, 16], kaal: 0.3, spoor: man },
      staart: man ? { aan: [-84, -18], L: 70, wb: 26, wt: 30, n: 4, kl: '#6A4E34', rand: '#8A6E50', lw: 1.3 } : { aan: [-84, -18], L: 92, wb: 28, wt: 32, n: 5, kl: '#5E4E3E', rand: '#8A7A66', rond: 1, lw: 1.3 },
      vl: { sch: [40, -34], hum: 50, uln: 58, man: 36, P: [104, 110, 108, 104, 98, 92, 86, 80, 76, 72], S: Array.from({ length: 10 }, (_, i) => 84 - i), T: [86, 80, 74], pw0: 4, pw1: 50, pb: 0.15, sb: 0.26, punt: 0, lw: 1.3,
        pal: man ? { veer: '#1E1A18', zoom: '#4A4038', dek: '#C4B490', onder: '#6A5A4A', kleinDek: '#BBA984', hand: '#9A5A2E', arm: '#1E1A18', tert: '#C4B490',
          dekPatroon: (ctx, g, pr, ver) => { ctx.strokeStyle = ver ? VER('#2E261C') : '#2E261C'; ctx.lineWidth = 2.4; for (let i = 0; i < 12; i++) { const a = LP(g.S, g.Wr, i / 11); const b = add(a, mul(g.dS, 50)); ctx.beginPath(); ctx.moveTo(...pr(a)); ctx.lineTo(...pr(b)); ctx.stroke(); } } }
          : { veer: '#6A5846', zoom: '#B4A48C', dek: '#8A7660', onder: '#9A8A76', kleinDek: '#9A866E', hand: '#5A4A3A', arm: '#6A5846', tert: '#7A6650' } },
      kop, nek: man ? { kl: pal.basis, voor: '#2A58A0', achter: '#3466B0', w: [46, 30, 23, 19], patroon: (ctx, nb) => { ctx.fillStyle = 'rgba(30,68,126,0.55)'; const M = nb.mid; for (let i = 0; i < M.length; i += 7) { ctx.beginPath(); ctx.arc(M[i][0] + (i % 2 ? 3 : -3), M[i][1], 2.2, 0, Math.PI); ctx.fill(); } } }
        : { kl: '#4E8A62', voor: '#4E8A62', achter: '#468058', w: [44, 28, 22, 18], patroon: (ctx, nb) => { ctx.fillStyle = 'rgba(46,90,62,0.6)'; const M = nb.mid; for (let i = 0; i < M.length; i += 7) { ctx.beginPath(); ctx.arc(M[i][0] + (i % 2 ? 3 : -3), M[i][1], 2, 0, Math.PI); ctx.fill(); } } },
      H: { staan: { tb: -16, heupH: 122, nek: [[10, -30], [2, -64], [12, -96], [26, -110]], tk: 0.06, ts: man ? -6 : 14, voet: [[12, 84], [-2, 80]] },
           lopen: { tb: -14, heupH: 120, nek: [[14, -28], [10, -62], [22, -92], [36, -104]], tk: 0.1, ts: man ? -6 : 14, voet: [[10, 0], [10, 0]],
             gang: { S: 76, beta: 0.62, lift: 20, taS: [[0, 64], [0.5, 84], [1, 106]], taZ: [[0, 110], [0.4, 120], [0.75, 70], [1, 64]], bob: 2.4, kopbob: 1 } } },
      achter: man ? sleep : null, adem: true }; }
  // SLEEP in rust: bundel van de stuit schuin naar achter-omlaag, laatste stuk op de grond; schachten en oogvlekken langs de lengte
  function sleep(P, Tb, o) { const Lt = 300 * (o.staartLengte ?? 1), r = Tb([-80, -30]); const zw = P.gangS ? Math.sin(2 * Math.PI * (o.t || 0) * 2) : 0;
    const C = [r, [r[0] - Lt * 0.3, r[1] + (0 - r[1]) * 0.42 + zw * 3], [r[0] - Lt * 0.66, -16 + zw * 2], [r[0] - Lt, -5]];
    const b = buis(C, [26, 48, 46, 30], [26, 48, 46, 30], 2); const grond = (p) => [p[0], Math.min(p[1], -0.5)];
    const pts = b.pts.map(grond), M = b.mid;
    return [{ b: pts, c: '#2E5A40', rk: '#B8A050', l: [{ fn: (ctx) => { ctx.strokeStyle = 'rgba(192,168,72,0.4)'; ctx.lineWidth = 1.3; for (let k = -3; k <= 3; k++) { ctx.beginPath(); M.forEach((q, i) => { const d = M[Math.min(M.length - 1, i + 1)], e = M[Math.max(0, i - 1)]; const a = Math.atan2(d[1] - e[1], d[0] - e[0]) + Math.PI / 2; const w = k * 6 * (0.6 + 0.6 * Math.sin(Math.PI * i / M.length)); const p = [q[0] + Math.cos(a) * w, q[1] + Math.sin(a) * w]; i ? ctx.lineTo(...p) : ctx.moveTo(...p); }); ctx.stroke(); }
          const vl = o.vlekken ?? 1; for (let i = 0; i < 22; i++) { if (hash(i * 7.3) > vl) continue; const u = 0.16 + i * 0.038, j = Math.min(M.length - 1, Math.floor(u * M.length)); const q = M[j], d = M[Math.min(M.length - 1, j + 2)], e = M[Math.max(0, j - 2)]; const a = Math.atan2(d[1] - e[1], d[0] - e[0]);
            const off = ((i % 3) - 1) * 12 * (0.5 + u); _oogvlek(ctx, q[0] + Math.cos(a + 1.57) * off, Math.min(q[1] + Math.sin(a + 1.57) * off, -3), 4 + u * 7, a + Math.PI); } } }] }]; }
  // PRONK: vooraanzicht met waaier als bijna volle schijf (± 1,8 m breed), vleugels hangend; kop in profiel. o.t laat de veren trillen.
  function pronk(ctx, x, y, s, o) { const t = o.t || 0, w = o.waaier ?? 1, Rw = 246 * (o.staartLengte ?? 1) * L(0.45, 1, ss((w - 0.5) / 0.5)), vl = o.vlekken ?? 1; const tr = Math.sin(2 * Math.PI * t * 6);
    const pal = { blauw: '#2C5EA6', blauwL: '#4C86CC', groen: '#2E5A40', brons: '#B8A050' }; const cx = -4, cy = -262; const D = [];
    const a0 = (90 + 30) * RAD, a1 = (90 - 30 + 360) * RAD; const F = []; for (let i = 0; i <= 90; i++) { const a = L(a0, a1, i / 90); const r = Rw * (1 + 0.012 * Math.sin(i * 2.2)); F.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } F.push([cx, cy + 40]);
    D.push({ b: F, c: pal.groen, rk: pal.brons, l: [{ fn: (ctx) => { ctx.strokeStyle = 'rgba(184,160,74,0.45)'; ctx.lineWidth = 1.3; for (let i = 0; i <= 110; i++) { const a = L(a0, a1, i / 110) + 0.004 * tr; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); ctx.lineTo(cx + Math.cos(a) * Rw, cy + Math.sin(a) * Rw); ctx.stroke(); }
        for (const [rr, n] of [[0.93, 50], [0.79, 42], [0.65, 34], [0.51, 26], [0.37, 18]]) for (let i = 0; i < n; i++) { if (hash(i * 13 + rr * 100) > vl) continue; const a = L(a0, a1, (i + 0.5 + 0.5 * (rr * 10 % 2)) / (n + 1)) + 0.01 * tr * (1 - rr); _oogvlek(ctx, cx + Math.cos(a) * Rw * rr, cy + Math.sin(a) * Rw * rr, (6 + 9 * rr) * (Rw / 262), a + Math.PI); } } }] });
    // hangende vleugels: kastanjebruine handpennen opzij van het lijf
    for (const k of [-1, 1]) { const b = [k * 30, -160], d = 0.05 * tr; const pen = []; for (let i = 0; i < 6; i++) { const a = (90 - k * (16 + i * 7)) * RAD + d * k; pen.push({ b: V.veer(add(b, [k * i * 2, i * 4]), a, 86 - i * 4, 10, 0), c: '#9A5A2E', o: ['#C07A48', 1.2] }); } D.push(...pen.reverse()); }
    // poten (vooraanzicht): bevederde dij, grijsbruine tarsus, tenen gespreid
    for (const k of [-1, 1]) { const x0 = k * 13; D.push({ b: buis([[x0, -104], [x0 + k, -66]], [22, 14]).pts, c: '#22323E' }); D.push({ b: buis([[x0 + k, -70], [x0 + k * 2, -46], [x0 + k * 3, -6]], [10, 8.4, 8]).pts, c: '#8A7C6C' });
      for (const da of [-0.5, 0, 0.5]) { const a = Math.PI / 2 + k * 0.9 + da * 0.6; D.push({ b: buis([[x0 + k * 3, -6], [x0 + k * 3 + Math.cos(a) * 14 * k * 0 + (da * 22) + k * 6, -2]], [7, 5]).pts, c: '#7E7060' }); } }
    // lijf (vooraanzicht): blauwe borst, donkere onderbuik
    const B = crs([[0, -206], [24, -196], [38, -166], [40, -134], [30, -106], [12, -94], [-12, -94], [-30, -106], [-40, -134], [-38, -166], [-24, -196]], 2);
    D.push({ b: B, c: pal.blauw, l: [{ p: [[-50, -126], [50, -126], [50, -80], [-50, -80]], c: '#1E2E3A' }, { fn: (ctx) => { ctx.fillStyle = 'rgba(30,68,126,0.5)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(-26 + (i % 6) * 10 + (Math.floor(i / 6) % 2) * 5, -190 + Math.floor(i / 6) * 13, 2.3, 0, Math.PI); ctx.fill(); } } }] });
    // hals en kop (kop draait naar de kijkrichting, licht knikkend)
    const kopP = [6, -276], tk = 0.05 * Math.sin(2 * Math.PI * t * 1.5); const nb = buis([[0, -190], [2, -226], [3, -252], [5, -268]], [34, 24, 18, 15]); D.push({ b: nb.pts, c: pal.blauw });
    const KP = pauwKop({ kop: pal.blauw, gezicht: '#EEEEE6', kuifS: '#3A4A6A', kuif1: '#3E8AA0', kuif2: pal.blauwL }, 26); const Tk = tf(kopP, tk);
    D.push({ b: crs(KP.K, 1).map(Tk), c: KP.kl, l: KP.lagen.map(l => ({ p: l.p.map(Tk), c: l.c })), na: (c) => { c.save(); c.translate(...kopP); c.rotate(tk); KP.na(c); c.restore(); } });
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); V.render(ctx, D, 1.5); ctx.restore(); }

  // ---------- BOERENZWALUW (Hirundo rustica) ----------
  // 17–19 cm incl. staartspiesen, vleugel 12–13 cm (BTO: 125,6 mm), spanwijdte 32–34 cm. Eenheid 1 cm; anker = midden van het lijf.
  function zwaluwSpec() { const pal = { basis: '#2E3E62', rug: '#2A3858', buik: '#E8DCC8', keel: '#B4503A' };
    return { naam: 'zwaluw', rw: 0.07, pal, romp: crs([[-4.6, -0.5], [-2.4, -1.25], [1, -1.45], [3.4, -1.2], [4.6, -0.4], [4.5, 0.6], [3.2, 1.25], [0.4, 1.45], [-2.6, 1.05], [-4.7, 0.35]], 0.2),
      rompLagen: [{ p: [[6, 0.1], [2, 0.4], [-2, 0.4], [-6, 0.2], [-6, 3], [6, 3]], c: pal.buik }, { p: [[6, -0.2], [3.4, -0.1], [3.2, 1.3], [6, 1.4]], c: pal.keel }],
      heupL: [0, 0.6], nekAan: [3.6, -0.5], nekIn: [2.4, -0.3], kopAan: [-0.6, 0.2],
      poot: { fem: 0.6, tib: 0.9, tars: 1.0, teen: 0.8, hal: 0.6, tw: 0.16, kl: '#3A2E2A', klauw: '#1A1414', dij: [0.6, 0.4] },
      staart: { aan: [-4.4, -0.1], L: 4.2, wb: 0.6, wt: 0.7, n: 5, kl: '#26344F', rand: '#4A5C80', vork: 1.25, lw: 0.07 },
      vl: { sch: [2.0, -0.9], hum: 1.5, uln: 1.9, man: 2.1, P: [9.4, 9.6, 8.8, 7.8, 6.8, 5.8, 4.9, 4.1, 3.5], S: Array.from({ length: 9 }, (_, i) => 3.2 - i * 0.05), T: [3.1, 2.8, 2.4], pw0: -6, pw1: 34, pb: 0.11, sb: 0.24, lw: 0.07,
        pal: { veer: '#2A3656', zoom: '#4E6088', dek: '#34466E', onder: '#8C8A8A', kleinDek: '#3A4C76' } },
      kop: { kl: pal.basis, K: [[-0.9, 0.7], [-0.9, -0.5], [-0.2, -1.0], [0.7, -0.9], [1.2, -0.3], [1.1, 0.5], [0.3, 0.9]], lagen: [{ p: [[0.5, -0.3], [1.4, -0.4], [1.4, 1.2], [0.1, 1.2]], c: pal.keel }],
        na: (ctx) => { vul(ctx, [[1.1, -0.2], [1.8, 0.05], [1.1, 0.3]], '#1A1A1E', null, 0); ctx.save(); ctx.translate(0.35, -0.3); ctx.scale(0.05, 0.05); dierOog(ctx, 0, 0, 5, '#0A0A0A'); ctx.restore(); } },
      nek: { kl: pal.basis, voor: pal.keel, achter: pal.basis, w: [2.0, 1.7] },
      H: { vliegen: { tb: 0, vlieg: 1, nek: [[0.5, -0.1], [1.0, -0.15]], tk: 0.05, ts: 0, voet: [[0.2, 1.2, 160], [0, 1.2, 160]], pootAchter: true } },
      vlucht: (t) => { // zwaluw: snelle slagen afgewisseld met glijden (vleugels half gebogen: sikkel)
        if (t < 0.6) { const u = t / 0.6 * 2, w = u - Math.floor(u); let phi, f; if (w < 0.45) { const q = w / 0.45; phi = L(-50, 60, ss(q)) * RAD; f = 0.15 + 0.4 * Math.sin(Math.PI * q); } else { const q = (w - 0.45) / 0.55; phi = L(60, -50, ss(q)) * RAD; f = 0.12; } return { phi, f, sweep: -0.15, dy: 0, kantel: 0 }; }
        const q = (t - 0.6) / 0.4; const phi = L(-50, 6, ss(q * 3)) * RAD * (q < 0.85 ? 1 : 1 - (q - 0.85) / 0.15 * 0) ; return { phi: q > 0.85 ? L(6, -50, ss((q - 0.85) / 0.15)) * RAD : phi, f: 0.3, sweep: -0.35, dy: 0, kantel: 0 }; } }; }

  const SP = {}; const spec = (n) => SP[n] || (SP[n] = n === 'reiger' ? reiger() : n === 'pauw' ? pauwBasis(true) : n === 'pauwin' ? pauwBasis(false) : zwaluwSpec());
  function teken(n, ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const sp = spec(n); const P = pose(sp, o.houding, o); return V.teken(ctx, sp, P, x, y, s, o); }
  return { spec, pose, teken, gang, pronk, vluchtStaal };
})();

// ---- integratie ----
const _vpZwaluwOud = typeof zwaluw === 'function' ? zwaluw : null, _vpVogelOud = typeof vogel === 'function' ? vogel : null;
pauw = function (ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; const h = o.houding || ((o.waaier ?? 0) >= 0.5 ? 'pronk' : 'staan');
  if (h === 'pronk') return VogelGroot.pronk(ctx, x, y, s, o); return VogelGroot.teken('pauw', ctx, x, y, s, Object.assign({}, o, { houding: h === 'rust' ? 'staan' : h })); };
pauwin = function (ctx, x, y, s = 1, o = {}) { return VogelGroot.teken('pauwin', ctx, x, y, s, Object.assign({}, o, { houding: o.houding === 'lopen' ? 'lopen' : 'staan' })); };
// vogel() = blauwe reiger: 'staan' (standaard, hals gestrekt), 'rust' (S-hals ingetrokken), 'lopen' (sluipend), 'vliegen' (anker = midden van het lijf)
vogel = function (ctx, x, y, s = 1, o = {}) { if (typeof o !== 'object' || o === null) o = {}; return VogelGroot.teken('reiger', ctx, x, y, s, Object.assign({}, o, { houding: o.houding || 'staan' })); };
// zwaluw: vlucht van opzij (pop, o.t = slagcyclus); o.boven = de oude tekening van bovenaf
zwaluw = function (ctx, x, y, s, o = {}) { if (o.boven && _vpZwaluwOud) return _vpZwaluwOud(ctx, x, y, s, o); return VogelGroot.teken('zwaluw', ctx, x, y, s, Object.assign({}, o, { houding: 'vliegen' })); };
