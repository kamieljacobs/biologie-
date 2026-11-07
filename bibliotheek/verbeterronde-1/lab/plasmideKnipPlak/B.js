// =====================================================================================
// PLASMIDE KNIPPEN EN PLAKKEN, ingezoomd op de knipplek: basen in de puzzelvorm van de DNA-reeks (d2Base) met
// een klein overzichtsringetje linksboven dat meeloopt (open → gen erin → dicht → in de bacterie).
// Recept (OpenStax Biology 2e § 17.1; EcoRI G↓AATTC, 5′-overhang AATT):
//  - knippen: bovenstreng tussen G en A, onderstreng (andersom gelezen ook G↓AATTC) vier basen verder → zigzag;
//    links blijft een uitstekende TTAA op de onderstreng, rechts een AATT op de bovenstreng (plakkerige uiteinden);
//  - plakken: het gen (goud) is met hetzelfde enzym geknipt en heeft dus precies passende uitsteeksels; A–T paren
//    vormen zich (waterstofbruggen), de ruggengraat heeft nog een 'nick' (gaatje) op elke naad;
//  - ligase sluit de nicks (fosfodiësterbinding, kluwen met gouden actieve plek op de naad);
//  - daarna is het een gewone ring met het nieuwe gen, die de bacterie opneemt (ring binnen het membraan).
//  Kleuren: plasmide-ruggengraat paars, gen goud, basen in de vaste DNA-basetinten (DNA_BASE).
//  Bekende fouten: rechte knip; uitsteeksels die niet complementair zijn; de nick al dicht vóór de ligase komt.
// x, y = midden van de ladder; r = maat (ladder ± 3,4 r breed, ringetje 0,28 r links ervan). o.stap 0..4, o.a.
// Geeft { knip, gen, naden:[[x,y],[x,y]], ring } terug.
// =====================================================================================
function plasmideKnipPlak(ctx, x, y, r, o = {}) {
  const { a = 1, stap = 0 } = o; const st = clamp(stap, 0, 4), knip = clamp(st, 0, 1), plak = clamp(st - 1, 0, 1), lig = clamp(st - 2, 0, 1), terug = clamp(st - 3, 0, 1);
  const bp = 0.14 * r, L = 0.3 * r, hw = bp * 0.34, x0 = x - 12 * bp, yT = y - L, yB = y + L;
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const links = 'CATCAG', site = 'AATT', gen = 'CATGGCCTAG', rechts = 'AATTCGTACC';
  const verschuif = lerp(lerp(0, 1.4, ease(knip)), 14, ease(plak)); // rechterstuk schuift op
  const genY = lerp(-(2 * L + 0.45 * r), 0, ease(plak)), genA = clamp((st - 0.7) / 0.3, 0, 1);
  const kx = (k) => x0 + k * bp;
  const ret = { knip: [kx(5.5), y], gen: [kx(14.5), y + genY], naden: [[kx(5.5), yT], [kx(19.5), yB]], ring: [x0 - 0.55 * r, y - 0.2 * r] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const ladderA = 1 - 0.75 * ease(terug);
  ctx.save(); ctx.globalAlpha *= ladderA;
  const rug = (k0, k1, yy, kleur, dx = 0, dy = 0) => { if (k1 < k0) return; ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(3, bp * 0.32); ctx.beginPath(); ctx.moveTo(kx(k0) - bp * 0.42 + dx, yy + dy); ctx.lineTo(kx(k1) + bp * 0.42 + dx, yy + dy); ctx.stroke(); };
  const basen = (seq, k0, top, dx = 0, dy = 0, rand = null) => seq.split('').forEach((b, i) => d2Base(ctx, kx(k0 + i) + dx, (top ? yT : yB) + dy, top ? Math.PI / 2 : -Math.PI / 2, b, L, hw, { rand }));
  const cmp = (s) => s.split('').map(b => comp[b]).join('');
  // linkerstuk plasmide: boven 0–5, onder 0–9 (onder 6–9 = TTAA, bij de knip eerst nog gepaard met de bovenstreng van rechts)
  basen(links, 0, true); basen(cmp(links) + cmp(site), 0, false);
  rug(0, 5, yT, D2.oud); rug(0, 9, yB, D2.oud);
  // rechterstuk: boven vanaf 6 (AATT + rest), onder vanaf 10
  const dx = verschuif * bp; basen(rechts, 6, true, dx); basen(cmp(rechts.slice(4)), 10, false, dx);
  rug(6, 15, yT, D2.oud, dx); rug(10, 15, yB, D2.oud, dx);
  // gen (goud): boven 6–19, onder 10–23
  if (genA > 0.01) { ctx.save(); ctx.globalAlpha *= genA; basen(site + gen, 6, true, 0, genY); basen(cmp(gen) + cmp(site), 10, false, 0, genY);
    rug(6, 19, yT, C.goud, 0, genY); rug(10, 23, yB, C.goud, 0, genY); ctx.restore(); }
  // nicks: zichtbaar tot de ligase ze sluit
  if (plak > 0.95) { const dicht = ease(lig); [[5.5, yT], [19.5, yB]].forEach(([k, yy], i) => {
      if (dicht < 1) { ctx.fillStyle = C.bgSchema; ctx.fillRect(kx(k) - bp * 0.09 * (1 - dicht), yy - bp * 0.25, bp * 0.18 * (1 - dicht), bp * 0.5); }
      if (st >= 2 && st < 3.3) { const la = st < 3 ? Math.min(1, lig * 3) : 1 - (st - 3) / 0.3; enzymKluwen(ctx, kx(k), yy + (i ? 1 : -1) * L * 1.15, L * 0.75, { a: la, an: i ? -Math.PI / 2 : Math.PI / 2, sluit: lig, seed: 2 + i }); } }); }
  // EcoRI tijdens het knippen (eiwitkluwen boven en onder de plek)
  if (st > 0.05 && st < 1.2) { const ea = st < 1 ? Math.sin(knip * Math.PI) * 0.8 + 0.2 : 1 - (st - 1) / 0.2; enzymKluwen(ctx, kx(5.5), yT - L * 1.0, L * 0.8, { a: ea, an: Math.PI / 2, seed: 7, col: '#8A7FA8' }); enzymKluwen(ctx, kx(9.5) + dx * 0, yB + L * 1.0, L * 0.8, { a: ea, an: -Math.PI / 2, seed: 8, col: '#8A7FA8' }); }
  ctx.restore();
  // overzichtsringetje (of, in stap 3–4, de bacterie met de ring erin)
  const [rx, ry] = ret.ring, rr = 0.28 * r, gap = st < 1 ? 0.05 + 0.4 * knip : 0.45;
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= ease(terug); ctx.beginPath(); roundRect(ctx, rx - rr * 2.1, ry - rr * 1.35, rr * 4.2, rr * 2.7, rr * 1.35); shape(ctx, '#22314D', rgba(C.oker, 0.85), 3); ctx.restore(); }
  const R2 = rr * lerp(1, 0.75, ease(terug)), w2 = Math.max(3, rr * 0.16);
  ctx.strokeStyle = D2.oud; ctx.lineWidth = w2; ctx.beginPath(); ctx.arc(rx, ry, R2, -Math.PI / 2 + gap / 2, -Math.PI / 2 - gap / 2 + 6.283); ctx.stroke();
  ctx.strokeStyle = C.oker; ctx.beginPath(); ctx.arc(rx, ry, R2, 0.1, 1.1); ctx.stroke();
  if (st >= 1) { ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.arc(rx, ry - (1 - ease(plak)) * rr * 0.8, R2, -Math.PI / 2 - gap / 2 + 0.06, -Math.PI / 2 + gap / 2 - 0.06); ctx.stroke(); }
  ctx.restore(); return ret;
}
