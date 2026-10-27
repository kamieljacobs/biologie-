// =====================================================================================
// STAMCELDELING. Recept: een stamcel is ongespecialiseerd (geen weefseleigen onderdelen; ronde cel, grote kern,
// weinig organellen) en kan zich lang blijven delen. Bij een deling blijft één dochtercel stamcel (zelfvernieuwing) en
// gaat de andere zich specialiseren (differentiëren), meestal in stappen. Volwassen stamcellen maken de celtypen van
// hun eigen weefsel (bloedstamcel in het beenmerg → bloedcellen); embryonale stamcellen kunnen alle celtypen worden.
// Rode bloedcel als voorbeeld: de voorlopercel wordt kleiner, het cytoplasma kleurt rood door hemoglobine, de kern
// krimpt en wordt uitgestoten; over blijft een ingedeukte schijf van 7–8 µm zonder kern. Deling: chromosomen in het
// midden, insnoering, twee dochtercellen even groot. Bron: Klymkowsky & Cooper, Biofundamentals 10.5; NIH Stem Cell
// Basics (archief). Bekende fouten: beide dochters specialiseren; rode bloedcel met kern; stamcel die al een celtype is.
// =====================================================================================
// Stijl B: stappenschema — de stamcel deelt (twee dochters naast elkaar); een boog terug naar de stamcel laat zien dat
// één dochter stamcel blijft; de andere doorloopt de stappen voorlopercel → erytroblast (rood, kern krimpt) →
// reticulocyt (kern uitgestoten) → rode bloedcel. o.f onthult de stappen één voor één; de actieve stap krijgt een
// gouden ring. Aanroep: stamcelDeling(ctx, x, y, r, o) — (x, y) = midden van de stamcel (links), r = straal; het schema
// is ± 8,5 r breed. o.f 0..1, o.soort = 'volwassen' | 'embryonaal' (na de voorlopercel drie mogelijke celtypen), o.t.
// Geeft { stam, dochter, stappen: [[x,y], …] } terug.
// =====================================================================================
const _SCB = { cyto: '#33405A', rand: '#B8C8DC', kern: '#6E5A9E', kernR: '#A392D6' };
function _scbCel(ctx, x, y, r, rood, kernF, lw, mito = true) { // rood 0..1 = hemoglobine, kernF = kerngrootte (0 = geen)
  const fill = `rgb(${Math.round(lerp(51, 194, rood))},${Math.round(lerp(64, 69, rood))},${Math.round(lerp(90, 62, rood))})`;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, fill, rood > 0.5 ? lighten(BIO.bloed, 0.3) : _SCB.rand, lw);
  if (mito && rood < 0.5) for (const [an, d] of [[2.4, 0.68], [0.5, 0.7]]) { ctx.save(); ctx.translate(x + Math.cos(an) * r * d, y + Math.sin(an) * r * d); ctx.rotate(an + 1.4); roundRect(ctx, -r * 0.14, -r * 0.055, r * 0.28, r * 0.11, r * 0.055); shape(ctx, C.mito, C.mitoR, Math.max(0.6, lw * 0.6)); ctx.restore(); }
  if (kernF > 0) { ctx.beginPath(); ctx.arc(x + r * 0.05, y - r * 0.05, r * kernF, 0, 6.283); shape(ctx, kernF < 0.35 ? '#4E3E7A' : _SCB.kern, _SCB.kernR, lw); } }
function _scbPijl(ctx, x0, y0, x1, y1, lw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.85); ctx.fillStyle = rgba(C.line, 0.85); ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  const an = Math.atan2(y1 - y0, x1 - x0), h = lw * 4.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(an - 0.45) * h, y1 - Math.sin(an - 0.45) * h); ctx.lineTo(x1 - Math.cos(an + 0.45) * h, y1 - Math.sin(an + 0.45) * h); ctx.closePath(); ctx.fill(); ctx.restore(); }
function stamcelDeling(ctx, x, y, r, o = {}) {
  const { a = 1, f = 1, soort = 'volwassen', t = 0 } = o; const lw = Math.max(1, r * 0.03), plw = Math.max(1.2, r * 0.035);
  const ff = clamp(f, 0, 1); const stap = ff * 5; const zicht = i => ease(clamp(stap - i + 1, 0, 1)); // i = 1..5
  const X = [x, x + r * 1.9, x + r * 4.3, x + r * 6.3, x + r * 8.1]; const Y = y + r * 2.2;
  const ret = { stam: [x, y], dochter: [X[1], Y], stappen: X.map((xx, i) => [xx, i ? Y : y]) };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const actief = Math.min(4, Math.floor(stap));
  const ring = (px, py, rr, i) => { if (i !== actief) return; ctx.beginPath(); ctx.arc(px, py, rr * 1.22, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke(); };
  // stamcel
  _scbCel(ctx, x, y, r, 0, 0.5, lw); ring(x, y, r, 0);
  // deling: twee dochters onder de stamcel; links = nieuwe stamcel met boog terug, rechts = gaat specialiseren
  const z1 = zicht(1); if (z1 > 0.01) { ctx.save(); ctx.globalAlpha *= z1; const lx = x - r * 0.15, rx2 = X[1];
    const dX = x - r * 0.75; _scbPijl(ctx, x - r * 0.35, y + r * 1.05, dX + r * 0.05, Y - r * 0.9, plw); _scbPijl(ctx, x + r * 0.55, y + r * 0.95, rx2 - r * 0.7, Y - r * 0.7, plw);
    _scbCel(ctx, dX, Y, r * 0.82, 0, 0.5, lw); ret.stam = [dX, Y];
    // groene boog: deze dochter is weer een stamcel
    ctx.strokeStyle = rgba(C.groen, 0.85); ctx.lineWidth = plw; ctx.beginPath(); ctx.moveTo(dX - r * 0.88, Y - r * 0.1); ctx.bezierCurveTo(x - r * 2.5, Y - r * 0.6, x - r * 2.3, y - r * 0.2, x - r * 1.22, y); ctx.stroke();
    _scbPijl(ctx, x - r * 1.6, y + r * 0.08, x - r * 1.1, y - r * 0.02, plw * 0.9, 1); ctx.restore(); }
  const stappen = soort === 'embryonaal' ? [[0, 0.48, 0.9]] : [[0, 0.48, 0.92], [0.85, 0.3, 0.8], [1, 0, 0.66], [1, -1, 0.56]];
  // voorlopercel
  if (z1 > 0.01) { ctx.save(); ctx.globalAlpha *= z1; _scbCel(ctx, X[1], Y, r * 0.9, 0, 0.48, lw); ring(X[1], Y, r * 0.9, 1); ctx.restore(); }
  if (soort === 'embryonaal') { const z = zicht(2); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z;
      [[-1.1, 'zenuw'], [0, 'spier'], [1.1, 'bloed']].forEach(([dy, tp]) => { const px = X[2] + r * 0.6, py = Y + dy * r * 1.4; _scbPijl(ctx, X[1] + r * 1.0, Y + dy * r * 0.5, px - r * 0.9, py, plw);
        if (tp === 'zenuw') zenuwcel(ctx, px, py, { s: r / 130, naar: [px + r * 3, py], takken: 4, seed: 2 }); else if (tp === 'spier') spierVezel(ctx, px - r * 0.4, py, r * 2.2, r * 0.5, { streep: Math.max(4, r * 0.09) }); else rodeBloedcel(ctx, px + r * 0.3, py, r * 0.42, 0.3, 0); });
      ctx.restore(); } ctx.restore(); return ret; }
  // erytroblast → reticulocyt (+ uitgestoten kern) → rode bloedcel
  for (let i = 2; i <= 4; i++) { const z = zicht(i); if (z < 0.01) continue; ctx.save(); ctx.globalAlpha *= z; const [rood, kf, rr] = stappen[i - 1]; const R2 = r * rr;
    _scbPijl(ctx, X[i - 1] + r * (i === 2 ? 1.05 : stappen[i - 2][2] + 0.15), Y, X[i] - R2 - r * 0.15, Y, plw);
    if (i === 4) rodeBloedcel(ctx, X[i], Y, R2, 0, 0); else _scbCel(ctx, X[i], Y, R2, rood, Math.max(0, kf), lw, false);
    if (i === 3) { const kx = X[i] + R2 * 0.75, ky = Y - R2 * 1.15; ctx.beginPath(); ctx.arc(kx, ky, R2 * 0.36, 0, 6.283); shape(ctx, rgba('#3A3448', 0.85), rgba(_SCB.rand, 0.8), lw); ctx.beginPath(); ctx.arc(kx, ky, R2 * 0.24, 0, 6.283); shape(ctx, '#4E3E7A', _SCB.kernR, lw); }
    ring(X[i], Y, R2, i); ctx.restore(); }
  ctx.restore(); return ret;
}
