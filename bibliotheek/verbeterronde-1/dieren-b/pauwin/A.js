// ===================================================================================
// VOGELVOET (gedeelde patch voor VogelPop: grondvink, merel, koolmees, zaadkraker, pauw, pauwin, reiger).
// Recept: zangvogels en hoenders zijn anisodactyl: drie tenen naar voren, één (hallux) naar achteren. Op de grond van
// opzij gezien waaieren de voortenen licht uit (vork), met teengewrichten als kleine knobbels en een klauwtje per teen;
// niet als één plat balkje. Alle andere houdingen (tak, schors, vlucht, zwaai) blijven ongewijzigd.
// Werkt door VogelPop.teken te vervangen (de oude tenen() zit in een closure); VogelZang en VogelGroot roepen V.teken
// aan en krijgen de nieuwe voet vanzelf. Plak dit blok na lib_dieren.js (of vervang tenen() in VogelPop zelf).
// ===================================================================================
(function () {
  const V = VogelPop, { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, DK, LT, VER, RIM, crs, cro, buis, tf, render, vleugelDelen, staartDelen } = V;
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
    else { const y = F[1] + tw * 0.15; // grond: drietand. Van opzij: middenteen recht naar voren, buitenteen schuin naar de kijker
      // (iets omlaag en korter door perspectief), binnenteen schuin weg (iets omhoog, donker), achterteen (hallux) naar achteren;
      // teengewrichten als kleine knobbels zodat de tenen ook op 80 px als vork lezen (Grant: anisodactyl, 3 voor + 1 achter).
      const vork = (da, l, kl, tint) => { const d = [Math.cos(da), Math.sin(da)]; return { p: [[F[0], y], [F[0] + d[0] * l * 0.5, y + d[1] * l * 0.5], [F[0] + d[0] * l, y + d[1] * l]], w: [tw * 0.85, tw * 0.45], klauw: kl, tint, knobbel: 1 }; };
      uit.push(vork(-0.5, T * 0.8, 1, 0.3));  // binnenteen (verste kant, half achter de middenteen)
      uit.push(vork(0.02, T, 1, 0));           // middenteen
      uit.push(vork(0.5, T * 0.72, 1, 0.1));   // buitenteen (naar de kijker)
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.05], [F[0] - H, y + tw * 0.15]], w: [tw * 0.9, tw * 0.62], klauw: -1, knobbel: 1 }); }
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
      D.push({ b: pp.pts, c, na: (ctx) => { if (t.knobbel && P.tw >= 3) { ctx.fillStyle = LT(c, 0.1); for (const u of [0.45, 0.75]) { const q = t.p.length > 2 ? LP(t.p[1], t.p[2], (u - 0.5) * 2 > 0 ? (u - 0.5) * 2 : 0) : t.p[0]; ctx.beginPath(); ctx.arc(q[0], q[1], P.tw * 0.42, 0, 6.283); ctx.fill(); } } // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

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

  function tekenNieuw(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }
  V.tenen = tenen; V.pootDelen = pootDelen; V.delen = delen; V.teken = tekenNieuw;
})();
// ===================================================================================
// PAUWIN (Pavo cristatus, vrouw), aanpassing op VogelGroot (spec wordt in place aangepast; zelfde aanroep).
// Recept (Indian peafowl): roodbruine kop met kuif (toppen kastanje met groene rand), witte wang/oogstreep; ONDERHALS
// metaalgroen, borst donkerbruin met groene glans, buik wittig; bovenlijf bruin met lichte vlekjes; geen sleep.
// Hals korter en dikker dan bij een reiger of gans: de kop staat ± 1/3 boven de rug, niet op een lange slang.
// Bekende fouten: lange dunne groene hals (leest als reiger/gans); geheel groene hals; kop te klein.
// Variant A: hals ± half zo lang en dikker, kleurzones (bruine kop/bovenhals, groene onderhals, donkere borst), kop ×1,2.
// ===================================================================================
(function () { const sp = VogelGroot.spec('pauwin');
  sp.H.staan.nek = [[14, -24], [14, -46], [24, -62], [34, -68]]; sp.H.lopen.nek = [[18, -22], [22, -44], [34, -58], [46, -62]];
  sp.nek.w = [52, 38, 30, 25]; sp.nek.kl = '#3E7A56'; sp.nek.voor = '#3E7A56'; sp.nek.achter = '#367050';
  sp.nek.patroon = (ctx, nb) => { const A = nb.boven, Bn = nb.onder, n = A.length, k = Math.floor(n * 0.5);
    ctx.fillStyle = '#8A6A4A'; ctx.beginPath(); ctx.moveTo(...A[k]); for (let i = k; i < n; i++) ctx.lineTo(...A[i]); for (let i = n - 1; i >= k; i--) ctx.lineTo(...Bn[i]); ctx.closePath(); ctx.fill(); // bovenhals bruin
    ctx.fillStyle = 'rgba(46,90,62,0.5)'; for (let i = 2; i < k; i += 5) { ctx.beginPath(); ctx.arc(nb.mid[i][0] + (i % 2 ? 3 : -3), nb.mid[i][1], 2.4, 0, Math.PI); ctx.fill(); } };
  sp.kop.K = sp.kop.K.map(p => [p[0] * 1.2, p[1] * 1.2]); sp.kop.Kc = null; sp.kop.lagen = sp.kop.lagen.map(l => l.p ? { p: l.p.map(p => [p[0] * 1.2, p[1] * 1.2]), c: l.c } : { lijn: l.lijn.map(p => [p[0] * 1.2, p[1] * 1.2]), c: l.c, w: l.w });
  const kna = sp.kop.na; sp.kop.na = (ctx, o, P) => { ctx.save(); ctx.scale(1.2, 1.2); kna(ctx, o, P); ctx.restore(); };
  // borst donkerbruin met groene glans, doorlopend vanaf de groene onderhals
  sp.rompLagen = [{ p: [[80, 14], [40, 26], [-20, 30], [-100, 22], [-100, 80], [80, 80]], c: sp.pal.buik },
    { p: [[90, -60], [52, -40], [40, -10], [46, 16], [80, 20]], c: '#4A3E30' }, { p: [[90, -60], [56, -44], [48, -22], [70, -14], [90, -20]], c: '#3E6A4E' },
    { fn: (ctx) => { ctx.fillStyle = 'rgba(230,220,200,0.7)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(30 - (i % 8) * 12 - Math.floor(i / 8) * 5, -38 + Math.floor(i / 8) * 8, 1.8, 0, 6.283); ctx.fill(); } } }];
})();
