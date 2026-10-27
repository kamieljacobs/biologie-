// =====================================================================================
// GEN-OPBOUW op de DNA-helix (gebieden als mouwen, splicing met lasso's). Recept (OpenStax Biology 2e § 15.4 en § 16.4;
// Lodish 8e § 8.1):
//  - het DNA blijft een rechtsdraaiende dubbele helix (dnaDraad); een gen is een stuk van die helix met een vaste volgorde:
//    promotor (goud; bindplek voor transcriptiefactoren en RNA-polymerase, stroomopwaarts; pijltje = startpunt en leesrichting)
//    → exon – intron – exon – … → terminator. De gebieden zijn gekleurde mouwen achter de helix, het DNA zelf blijft paars.
//  - genen kunnen zeer lange intronen hebben (OpenStax): hier langer getekend dan de exonen, 'niet op schaal'.
//  - splicing (o.splice 0..1): het voorloper-mRNA (dunne teal streng) ligt boven het gen; de spliceosomen trekken elk intron
//    tot een lus (lasso) zodat de exon-uiteinden elkaar raken, de lus komt los en valt weg; het rijpe mRNA (alleen exonen) krijgt
//    een kapje aan 5' en een poly-A-staart aan 3'.
//  - genstrip (o.modus 'strip'): lang stuk helix met veel genen; o.aan[i] = gen i aan (mouw goud, mRNA-sliertje eraf).
// Bekende fouten: intronen die in het mRNA blijven; DNA als platte balk; mRNA als dikke balk; promotor ná het gen.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de balkversie: (x, y) = begin promotor op de as, w = lengte;
// o.exonen, o.intronen, o.hl, o.aan, o.t. Geeft {promotor, start, exonen[], intronen[], terminator, mrna} terug.
// =====================================================================================
function _goIndeling(x, w, ex, inn) { const delen = [['p', 0.55]]; ex.forEach((e, i) => { delen.push(['e', e]); if (i < inn.length) delen.push(['i', inn[i]]); }); delen.push(['t', 0.32]);
  const tot = delen.reduce((s, d) => s + d[1], 0), gap = w * 0.006; let xx = x; return delen.map(([k, l]) => { const L = w * l / tot - gap; const r = [k, xx, xx + L]; xx += L + gap; return r; }); }
function _goSlier(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function genOpbouw(ctx, x, y, w, o = {}) {
  const { a = 1, exonen = [1, 1.15, 0.8], intronen = [1.7, 2.3], splice = 0, modus = 'gen', aan = null, hl = null, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1000, dw = Math.max(5, 22 * s), mh = 58 * s, uit = { exonen: [], intronen: [] };
  ctx.save(); ctx.globalAlpha *= a;
  const mouw = (x0, x1, fill, rand, hh = mh) => { roundRect(ctx, x0, y - hh / 2, x1 - x0, hh, hh * 0.3); shape(ctx, fill, rand, 1.5 * Math.max(0.6, s)); };
  const helix = (x0, x1) => dnaDraad(ctx, [[x0, y], [x1, y]], { w: dw, helix: dw >= 6, glad: false, fase: t * 0.1 });
  if (modus === 'strip') { const n = (aan || []).length || 14;
    for (let i = 0; i < n; i++) { const L = w / n * (0.45 + 0.4 * hash(i * 3.3 + 1)), xx = x + w * i / n + (w / n - L) / 2, on = aan ? aan[i] : i % 3 === 0;
      mouw(xx, xx + L, on ? rgba(C.goud, 0.55) : rgba(C.kern, 0.35), on ? C.goud : rgba(C.kernR, 0.45), mh * 0.8); uit.exonen.push([xx + L / 2, y]); }
    helix(x - 30 * s, x + w + 30 * s);
    for (let i = 0; i < n; i++) { const on = aan ? aan[i] : i % 3 === 0; if (!on) continue; const xx = x + w * (i + 0.5) / n; const P = []; for (let k = 0; k <= 11; k++) P.push([xx + Math.sin(k * 0.9 + i + t) * 7 * s + k * 2 * s, y - mh * 0.45 - k * 7 * s]); _goSlier(ctx, P, C.teal, 2.4 * s); }
    ctx.restore(); return uit; }
  const D = _goIndeling(x, w, exonen, intronen);
  D.forEach(([k, x0, x1]) => { const isHl = hl === { p: 'promotor', e: 'exon', i: 'intron', t: 'terminator' }[k];
    if (k === 'p') { mouw(x0, x1, rgba(C.goud, 0.35), C.goud); uit.promotor = [(x0 + x1) / 2, y]; }
    else if (k === 'e') { mouw(x0, x1, rgba(C.kernR, 0.42), C.kernR); uit.exonen.push([(x0 + x1) / 2, y]); }
    else if (k === 'i') { mouw(x0, x1, rgba(C.line, 0.14), rgba(C.line, 0.45), mh * 0.75); uit.intronen.push([(x0 + x1) / 2, y]); }
    else { mouw(x0, x1, rgba(C.line, 0.3), C.line); uit.terminator = [(x0 + x1) / 2, y]; }
    if (isHl) { roundRect(ctx, x0 - 5 * s, y - mh / 2 - 5 * s, x1 - x0 + 10 * s, mh + 10 * s, 14 * s); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.stroke(); } });
  helix(x - 40 * s, x + w + 40 * s);
  const xp = D[0][2]; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xp + 2 * s, y + mh / 2); ctx.lineTo(xp + 2 * s, y + mh * 1.05); ctx.lineTo(xp + 34 * s, y + mh * 1.05); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xp + 40 * s, y + mh * 1.05); ctx.lineTo(xp + 28 * s, y + mh * 1.05 - 8 * s); ctx.lineTo(xp + 28 * s, y + mh * 1.05 + 8 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); uit.start = [xp, y + mh * 1.05];
  // splicing boven het gen: 0–0.3 voorloper groeit; 0.3–0.75 intronen trekken samen tot lussen; 0.75–0.9 lussen los en weg; 0.9–1 kap + staart
  if (splice > 0.01) { const g = ease(clamp(splice / 0.3, 0, 1)), lus = ease(clamp((splice - 0.3) / 0.45, 0, 1)), weg = ease(clamp((splice - 0.75) / 0.15, 0, 1)), af = ease(clamp((splice - 0.9) / 0.1, 0, 1));
    const yr = y - 110 * s, xs = D[1][1], xe = D[D.length - 2][2], xEind = xs + (xe - xs) * g;
    const E = D.filter(d => d[0] === 'e'), I = D.filter(d => d[0] === 'i'), Ltot = E.reduce((q, d) => q + d[2] - d[1], 0), cx = (xs + xe) / 2;
    // nieuwe plek van elk deel: exonen schuiven naar het midden, elk intron krimpt tot een lus op de naad
    let acc = lerp(xs, cx - Ltot / 2, lus); const plek = D.map(([k, x0, x1]) => { if (k !== 'e' && k !== 'i') return null; const L = k === 'e' ? x1 - x0 : (x1 - x0) * (1 - lus); const r = [acc, acc + L]; acc += L; return r; });
    const golf = (u) => Math.sin(u / (26 * s)) * 4 * s;
    D.forEach(([k, x0, x1], idx) => { if ((k !== 'e' && k !== 'i') || x0 > xEind) return; const [n0, n1] = plek[idx], frac = clamp((xEind - x0) / (x1 - x0), 0, 1);
      if (k === 'e') { const P = []; for (let u = 0; u <= frac; u += 0.02) { const X = lerp(n0, n1, u); P.push([X, yr + golf(X)]); } if (P.length > 1) _goSlier(ctx, P, C.teal, 3.2 * s); }
      else { const Lx = x1 - x0, rr = Math.max(4 * s, Lx / 6.283 * lus * 0.9), mid = (n0 + n1) / 2; ctx.save(); ctx.globalAlpha *= 1 - weg;
        const dy = -weg * 60 * s; const P = []; for (let u = 0; u <= frac; u += 0.01) { // lijn → lus
          const X0 = lerp(n0, n1, u), Y0 = yr + golf(X0), an = Math.PI / 2 + u * 6.283, LX = mid + Math.cos(an) * rr * 0.9, LY = yr - rr - Math.sin(an) * rr + rr * 0; P.push([lerp(X0, LX, lus), lerp(Y0, LY - rr * 0.05, lus) + dy * (lus > 0.99 ? 1 : 0)]); }
        if (P.length > 1) _goSlier(ctx, P, rgba(C.line, 0.85), 2.4 * s); ctx.restore(); } });
    if (af > 0.01) { const xa = cx - Ltot / 2, xb = cx + Ltot / 2; ctx.save(); ctx.globalAlpha *= af; _bioCirc(ctx, xa - 8 * s, yr + golf(xa), 8 * s, C.goud, lighten(C.goud, 0.3), 1.2);
      const P = []; for (let u = 0; u <= 120 * s; u += 5 * s) P.push([xb + u, yr + golf(xb) + Math.sin(u / (9 * s)) * 3 * s]); _goSlier(ctx, P, lighten(C.teal, 0.35), 1.8 * s); ctx.restore(); uit.mrna = [cx, yr]; } }
  ctx.restore(); return uit;
}
