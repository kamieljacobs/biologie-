// =====================================================================================
// GEN-OPBOUW op het DNA (balk). Recept (OpenStax Biology 2e § 15.4 en § 16.4; Lodish 8e § 8.1):
//  - een gen ligt op het DNA als een stuk met vaste volgorde: promotor (bindplek voor transcriptiefactoren en RNA-polymerase,
//    stroomopwaarts van het startpunt; pijltje = startpunt en leesrichting) → exon – intron – exon – … → terminator.
//  - exonen = coderende stukken, intronen = niet-coderende stukken ertussen; genen kunnen zeer lange intronen hebben (OpenStax):
//    standaard zijn de intronen hier langer getekend dan de exonen, 'niet op schaal'.
//  - splicing (o.splice 0..1): het hele gen wordt eerst overgeschreven tot voorloper-mRNA (dunne teal streng: exondelen teal,
//    introndelen grijs), spliceosomen knippen de intronen eruit en plakken de exonen aan elkaar; het rijpe mRNA krijgt een
//    kapje aan 5' en een poly-A-staart (± 200 A's) aan 3'.
//  - genstrip (o.modus 'strip'): een stuk chromosoom met veel genen; o.aan[i] = gen i staat aan (goud, mRNA komt eraf).
// Bekende fouten: intronen die in het mRNA blijven; promotor ná het gen; mRNA als dikke balk; elk gen even lang.
// (x, y) = begin van de promotor op de DNA-as; w = lengte van promotor t/m terminator. o.exonen, o.intronen = relatieve lengtes;
// o.hl = 'promotor' | 'exon' | 'intron' | 'terminator' (goud omrand). Geeft {promotor, start, exonen[], intronen[], terminator, mrna} terug.
// =====================================================================================
function _goIndeling(x, w, ex, inn) { const delen = [['p', 0.55]]; ex.forEach((e, i) => { delen.push(['e', e]); if (i < inn.length) delen.push(['i', inn[i]]); }); delen.push(['t', 0.32]);
  const tot = delen.reduce((s, d) => s + d[1], 0), gap = w * 0.006; let xx = x; return delen.map(([k, l]) => { const L = w * l / tot - gap; const r = [k, xx, xx + L]; xx += L + gap; return r; }); }
function _goSlier(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function genOpbouw(ctx, x, y, w, o = {}) {
  const { a = 1, exonen = [1, 1.15, 0.8], intronen = [1.7, 2.3], splice = 0, modus = 'gen', aan = null, hl = null, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1000, bh = 46 * s, uit = { exonen: [], intronen: [] };
  ctx.save(); ctx.globalAlpha *= a;
  const dnaLijn = (x0, x1) => { ctx.strokeStyle = C.kernR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x0, y - 6 * s); ctx.lineTo(x1, y - 6 * s); ctx.moveTo(x0, y + 6 * s); ctx.lineTo(x1, y + 6 * s); ctx.stroke(); };
  if (modus === 'strip') { const n = (aan || []).length || 14; dnaLijn(x - 30 * s, x + w + 30 * s);
    for (let i = 0; i < n; i++) { const L = w / n * (0.45 + 0.4 * hash(i * 3.3 + 1)), xx = x + w * i / n + (w / n - L) / 2, on = aan ? aan[i] : i % 3 === 0;
      roundRect(ctx, xx, y - bh * 0.42, L, bh * 0.84, 6 * s); shape(ctx, on ? rgba(C.goud, 0.85) : rgba(C.kern, 0.55), on ? lighten(C.goud, 0.3) : rgba(C.kernR, 0.5), 1.2);
      if (on) { const P = []; for (let k = 0; k <= 10; k++) P.push([xx + L * 0.5 + Math.sin(k * 0.9 + i + t) * 7 * s, y - bh * 0.5 - k * 7 * s]); _goSlier(ctx, P, C.teal, 2.4 * s); }
      uit.exonen.push([xx + L / 2, y]); }
    ctx.restore(); return uit; }
  const D = _goIndeling(x, w, exonen, intronen); dnaLijn(x - 40 * s, x + w + 40 * s);
  D.forEach(([k, x0, x1]) => { const isHl = hl === { p: 'promotor', e: 'exon', i: 'intron', t: 'terminator' }[k];
    if (k === 'p') { roundRect(ctx, x0, y - bh / 2, x1 - x0, bh, 10 * s); shape(ctx, rgba(C.goud, 0.28), C.goud, 2 * s); uit.promotor = [(x0 + x1) / 2, y];
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 2 * s, y - bh / 2); ctx.lineTo(x1 + 2 * s, y - bh * 1.15); ctx.lineTo(x1 + 34 * s, y - bh * 1.15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1 + 40 * s, y - bh * 1.15); ctx.lineTo(x1 + 28 * s, y - bh * 1.15 - 8 * s); ctx.lineTo(x1 + 28 * s, y - bh * 1.15 + 8 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); uit.start = [x1, y - bh * 1.15]; }
    else if (k === 'e') { roundRect(ctx, x0, y - bh / 2, x1 - x0, bh, 8 * s); shape(ctx, C.kern, C.kernR, 1.5); uit.exonen.push([(x0 + x1) / 2, y]); }
    else if (k === 'i') { roundRect(ctx, x0, y - bh * 0.28, x1 - x0, bh * 0.56, 6 * s); shape(ctx, rgba(C.line, 0.28), rgba(C.line, 0.7), 1.2); uit.intronen.push([(x0 + x1) / 2, y]); }
    else { roundRect(ctx, x0, y - bh * 0.4, x1 - x0, bh * 0.8, 8 * s); shape(ctx, rgba(C.line, 0.22), C.line, 1.5); ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x1 - 10 * s, y - bh * 0.4); ctx.lineTo(x1 - 10 * s, y + bh * 0.4); ctx.stroke(); uit.terminator = [(x0 + x1) / 2, y]; }
    if (isHl) { roundRect(ctx, x0 - 5 * s, y - bh / 2 - 5 * s, x1 - x0 + 10 * s, bh + 10 * s, 12 * s); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.stroke(); } });
  // splicing: 0–0.3 voorloper-mRNA groeit; 0.3–0.55 knippen (intronen zakken weg); 0.55–1 exonen schuiven aan elkaar, kapje + staart
  if (splice > 0.01) { const g = ease(clamp(splice / 0.3, 0, 1)), kn = ease(clamp((splice - 0.3) / 0.25, 0, 1)), sch = ease(clamp((splice - 0.55) / 0.35, 0, 1)), af = ease(clamp((splice - 0.85) / 0.15, 0, 1));
    const yr = y + 95 * s, xs = D[1][1], xe = D[D.length - 2][2], xEind = xs + (xe - xs) * g;
    const E = D.filter(d => d[0] === 'e'), Ltot = E.reduce((q, d) => q + d[2] - d[1], 0), cx = (xs + xe) / 2; let acc = cx - Ltot / 2;
    const golf = (u, ph) => Math.sin(u / (26 * s) + ph) * 5 * s + Math.sin(u / (71 * s) + ph) * 3 * s;
    D.forEach(([k, x0, x1], idx) => { if (k !== 'e' && k !== 'i') return; if (x0 > xEind) return; const xx1 = Math.min(x1, xEind);
      if (k === 'e') { const doel = acc; acc += x1 - x0; const dx = (doel - x0) * sch; const P = []; for (let u = x0; u <= xx1; u += 6 * s) P.push([u + dx, yr + 70 * s * sch + golf(u + dx, 0) * sch + golf(u, 0) * (1 - sch)]); if (P.length > 1) _goSlier(ctx, P, C.teal, 3.2 * s); }
      else { const val = kn, P = []; for (let u = x0; u <= xx1; u += 6 * s) P.push([u, yr + val * 60 * s + golf(u, 0) + Math.sin((u - x0) / (x1 - x0) * Math.PI) * val * 26 * s]);
        ctx.save(); ctx.globalAlpha *= 1 - ease(clamp((splice - 0.5) / 0.3, 0, 1)); if (P.length > 1) _goSlier(ctx, P, rgba(C.line, 0.8), 2.4 * s);
        if (kn > 0.05 && kn < 1) { [x0, x1].forEach(xk => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(xk - 6 * s, yr - 12 * s); ctx.lineTo(xk + 6 * s, yr + 12 * s); ctx.moveTo(xk + 6 * s, yr - 12 * s); ctx.lineTo(xk - 6 * s, yr + 12 * s); ctx.stroke(); }); } ctx.restore(); } });
    if (af > 0.01) { const y2 = yr + 70 * s, xa = cx - Ltot / 2, xb = cx + Ltot / 2; ctx.save(); ctx.globalAlpha *= af; _bioCirc(ctx, xa - 8 * s, y2 + golf(xa, 0), 8 * s, C.goud, lighten(C.goud, 0.3), 1.2);
      const P = []; for (let u = 0; u <= 120 * s; u += 5 * s) P.push([xb + u, y2 + golf(xb, 0) + Math.sin(u / (9 * s)) * 3 * s]); _goSlier(ctx, P, lighten(C.teal, 0.35), 1.8 * s); ctx.restore(); uit.mrna = [cx, y2]; } }
  ctx.restore(); return uit;
}
