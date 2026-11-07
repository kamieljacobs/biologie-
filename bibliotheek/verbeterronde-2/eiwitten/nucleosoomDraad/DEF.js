// DNA ROND EIWITTEN (nucleosomen), variant C, verbeterronde 2 eiwitten (28 okt 2026): de histonen en hun staarten als
// kralenketen (_kkKluwen/_kkPad uit eiwitten/_hulp.js) in plaats van het lintmodel; ook bij een kleine schijf (R < 34)
// kralen in plaats van vlakke ellipsjes. DNA, schijf, wikkeling, los, compact en aanroep ongewijzigd.
// Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e § 10.1; Luger e.a. 1997 Nature 389:251):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (147 bp) om een kern van acht histonen (schijf ± 11 nm breed, ± 6 nm hoog);
//    linker-DNA ertussen. Eiwit grijsblauw (#7A8BA8), DNA paars; de wikkeling is 3D (achterkant donkerder, eerst getekend).
//  - o.los 0..1: het DNA wikkelt vanaf beide uiteinden af en wordt linker-DNA; de histonschijf blijft liggen en wordt iets
//    lichter (gen 'aan'). o.compact 0..1: nucleosomen schuiven samen tot een zigzag-stapel (± 30-nm-vezel, model).
//  - op het bovenvlak liggen de histonen als vier gevouwen kralenketens (histonvouw = drie α-helices met twee lussen) en uit
//    de rand steken slappe staarten (N-terminale staarten, rijtje kralen) die over en tussen de DNA-windingen lopen.
//  Bekende fouten: golflijn met losse bolletjes; DNA door de schijf heen; rechte linker; afwikkelen als vervagen; lint.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt). Geeft de centra terug (lokaal, zoals v1).
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false, los = 0, compact = 0 } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  const lo = (i) => typeof los === 'function' ? clamp(los(i), 0, 1) : (Array.isArray(los) ? clamp(los[i] || 0, 0, 1) : clamp(los, 0, 1));
  const cp = ease(clamp(compact, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const sp = lerp(L / n, R * 1.25, cp), mid = L / 2; // afstand tussen centra
  const centra = []; for (let i = 0; i < n; i++) centra.push([mid + (i - (n - 1) / 2) * sp, (i % 2 ? 1 : -1) * R * lerp(0.45, 0.62, cp)]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283, tm = (th0 + th1) / 2, l = ease(lo(i));
    const ta = lerp(th0, tm, l), tb = lerp(th1, tm, l), rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const u = k / 160, th = lerp(ta, tb, u), z = (lerp(-0.5, 0.5, lerp(u, 0.5, l))) * H * 1.05 * (1 - l) + (u - 0.5) * H * 0.2 * l;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(l > 0.97 ? 1 : D); } return { P, Z }; };
  const W = centra.map(wikkel);
  const kr = lerp(1, 0.35, cp); // kromming linker
  const linkers = []; linkers.push([[centra[0][0] - sp * 0.5 - 30, centra[0][1] + R * 0.8 * kr], W[0].P[0]]);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5 * kr], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [centra[n - 1][0] + sp * 0.5 + 30, centra[n - 1][1] - R * 0.8 * kr]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn, l = lo(i); ctx.save(); ctx.globalAlpha *= 1 - 0.25 * l;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    { ctx.save(); ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R * 0.97, ry * 0.97, 0, 0, 6.283); ctx.clip(); ctx.translate(c[0], c[1] - hz / 2); ctx.scale(1, ry / R);
      const E = _ellips(46, 40), kl = ['#8E9CB8', '#7F8FAD', '#9AA8C2', '#8696B2'];
      for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; _kkKluwen(ctx, Math.cos(an) * R * 0.45, Math.sin(an) * R * 0.45, E.binnen, { bbox: E.bbox, sc: R / 120, r: 10, col: kl[k], seed: 4 + k, rot: an + 1.2, key: 'hist' + k }); }
      ctx.restore(); }
    ctx.restore(); });
  // linker + afgewikkeld DNA als één doorlopende draad (zelfde helixfase over de naad)
  linkers.forEach((pl, i) => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  // histonstaarten: dunne slappe uitlopers als een rijtje kleine kralen vanuit de kern over en tussen de windingen
  centra.forEach((c, i) => { const ry = R * cs; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.3 + i * 0.9, P = []; let px = c[0] + Math.cos(an) * R * 0.85, py = c[1] - H * sn / 2 + Math.sin(an) * ry * 0.85, a2 = an;
      for (let q = 0; q < 9; q++) { a2 += Math.sin(q * 1.3 + k + i + t * 0.5) * 0.35; px += Math.cos(a2) * R * 0.09; py += Math.sin(a2) * R * 0.09; P.push([px, py]); }
      _kkPad(ctx, P, Math.max(1.8, R * 0.04), '#8696B2', { stap: 2.2 }); } });
  ctx.restore(); return centra; // lokaal (as van x0,y0 langs de draad), zoals v1
}
