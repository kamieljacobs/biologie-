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
// Stijl A: één doorlopende morph (celRond-stijl): deling → linkerdochter blijft stamcel, rechterdochter wordt een
// rode bloedcel (of bij embryonaal: kan meerdere kanten op). Aanroep: stamcelDeling(ctx, x, y, r, o) — (x, y) =
// midden van de stamcel (en eindplek van de dochter die stamcel blijft), r = straal (px); o.f 0..1 (0 stamcel · 0,1–0,35 chromosomen + rekken · 0,35–0,5 insnoeren ·
// 0,5–1 uit elkaar + specialiseren), o.soort = 'volwassen' | 'embryonaal', o.t. Geeft { stam, dochter, kern } terug.
// =====================================================================================
const _SC = { cyto: '#33405A', rand: '#B8C8DC', kern: '#6E5A9E', kernR: '#A392D6', chrom: '#8C7BBF' };
function _scCel(ctx, x, y, rx, ry, lw, fill = _SC.cyto, rand = _SC.rand) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); shape(ctx, fill, rand, lw); }
function _scTextuur(ctx, x, y, r, seed) { for (let i = 0; i < 14; i++) { const an = hash(seed + i * 3.1) * 6.283, d = Math.sqrt(hash(seed + i * 1.7)) * r * 0.85; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(0.7, r * 0.018), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.14); ctx.fill(); } }
function _scMito(ctx, x, y, L, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -L / 2, -L * 0.2, L, L * 0.4, L * 0.2); shape(ctx, C.mito, C.mitoR, Math.max(0.6, L * 0.05)); ctx.restore(); }
function _scStam(ctx, x, y, r, lw, seed) { _scCel(ctx, x, y, r, r, lw); _scTextuur(ctx, x, y, r, seed); _scMito(ctx, x - r * 0.62, y + r * 0.35, r * 0.28, 0.8); _scMito(ctx, x + r * 0.55, y + r * 0.5, r * 0.26, -0.4);
  ctx.beginPath(); ctx.arc(x + r * 0.06, y - r * 0.08, r * 0.52, 0, 6.283); shape(ctx, _SC.kern, _SC.kernR, lw); ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.2, r * 0.13, 0, 6.283); ctx.fillStyle = rgba('#3E2E66', 0.6); ctx.fill(); }
function stamcelDeling(ctx, x, y, r, o = {}) {
  const { a = 1, f = 0, soort = 'volwassen', t = 0 } = o; const lw = Math.max(1, r * 0.022);
  x += r * 1.35 * ease(clamp((clamp(f, 0, 1) - 0.1) / 0.6, 0, 1)); // de stamcel-dochter eindigt op de oorspronkelijke plek, de andere schuift naar rechts
  const ff = clamp(f, 0, 1), sp = ease(clamp((ff - 0.5) / 0.2, 0, 1)), dif = ease(clamp((ff - 0.55) / 0.45, 0, 1));
  const dx = lerp(0, r * 1.35, sp); const ret = { stam: [x - (ff >= 0.35 ? lerp(r * 0.55, r * 1.35, sp) : 0), y], dochter: [x + (ff >= 0.35 ? lerp(r * 0.55, r * 1.35, sp) : 0), y], kern: [x, y] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (ff < 0.1) { _scStam(ctx, x, y, r, lw, 1); ctx.restore(); return ret; }
  if (ff < 0.5) { // deling: rekken + chromosomen, dan insnoeren
    const rek = ease(clamp((ff - 0.1) / 0.25, 0, 1)), snoer = ease(clamp((ff - 0.35) / 0.15, 0, 1));
    const half = lerp(0, r * 0.55, rek), rr = r * lerp(1, 0.82, rek);
    const pts = []; for (let i = 0; i < 72; i++) { const u = i / 72 * 6.283; let px = Math.cos(u) * rr, py = Math.sin(u) * rr; px += Math.sign(px) * half; py *= 1 - snoer * 0.92 * Math.exp(-(px * px) / (2 * (r * 0.32) ** 2)); pts.push([x + px, y + py]); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, _SC.cyto, _SC.rand, lw); _scTextuur(ctx, x, y, r * 0.8, 3);
    const kf = 1 - clamp((ff - 0.1) / 0.1, 0, 1); if (kf > 0.01) { ctx.save(); ctx.globalAlpha *= kf; ctx.beginPath(); ctx.arc(x, y, r * 0.52, 0, 6.283); shape(ctx, _SC.kern, _SC.kernR, lw); ctx.restore(); }
    const ch = clamp((ff - 0.12) / 0.08, 0, 1); const uit = lerp(0, r * 0.55 + half * 0.6, snoer); // chromosomen: eerst in het midden, dan naar de polen
    ctx.save(); ctx.globalAlpha *= ch; ctx.strokeStyle = _SC.chrom; ctx.lineWidth = Math.max(1.5, r * 0.06); ctx.lineCap = 'round';
    for (const sd of (snoer > 0.01 ? [-1, 1] : [0])) for (let k = 0; k < 4; k++) { const cy2 = y + (k - 1.5) * r * 0.2, cx2 = x + sd * uit; ctx.beginPath(); ctx.moveTo(cx2 - r * 0.06, cy2 - r * 0.07); ctx.lineTo(cx2 + r * 0.06, cy2 + r * 0.07); if (!sd) { ctx.moveTo(cx2 + r * 0.06, cy2 - r * 0.07); ctx.lineTo(cx2 - r * 0.06, cy2 + r * 0.07); } ctx.stroke(); }
    ctx.restore(); ctx.restore(); return ret; }
  // na de deling: links stamcel (blijft), rechts specialiseert
  const sx = x - lerp(r * 0.55, r * 1.35, sp), dxR = x + lerp(r * 0.55, r * 1.35, sp); const r0 = r * 0.82, rs = lerp(r0, r, sp);
  _scStam(ctx, sx, y, rs, lw, 1); ret.stam = [sx, y];
  if (soort === 'embryonaal' && dif > 0.01) { _scStam(ctx, dxR, y, lerp(r0, r * 0.9, sp) * (1 - 0.15 * dif), lw, 2);
    const opts = [['zenuw', -0.7], ['spier', 0], ['bloed', 0.7]]; opts.forEach(([tp, an], i) => { const px = dxR + Math.cos(an) * r * 2.0, py = y + Math.sin(an) * r * 2.0; ctx.save(); ctx.globalAlpha *= dif;
      ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = Math.max(1, lw); ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.moveTo(dxR + Math.cos(an) * r * 0.95, y + Math.sin(an) * r * 0.95); ctx.lineTo(px - Math.cos(an) * r * 0.55, py - Math.sin(an) * r * 0.55); ctx.stroke(); ctx.setLineDash([]);
      if (tp === 'zenuw') zenuwcel(ctx, px - r * 0.2, py, { s: r / 140, naar: [px + r * 2, py], takken: 4, seed: 2 }); else if (tp === 'spier') spierVezel(ctx, px - r * 0.5, py, r * 1.3, r * 0.4, { streep: Math.max(4, r * 0.08) }); else rodeBloedcel(ctx, px, py, r * 0.42, 0.3, 0);
      ctx.restore(); }); ret.dochter = [dxR, y]; ctx.restore(); return ret; }
  // rode-bloedcellijn: kleiner, rood, kern krimpt, uitgestoten, ingedeukte schijf
  const rd = lerp(rs, r * 0.62, dif); const rood = clamp(dif * 1.3, 0, 1), uitstoot = ease(clamp((dif - 0.6) / 0.25, 0, 1)), schijf = ease(clamp((dif - 0.82) / 0.18, 0, 1));
  const fill = `rgb(${Math.round(lerp(51, 194, rood))},${Math.round(lerp(64, 69, rood))},${Math.round(lerp(90, 62, rood))})`;
  if (schijf < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - schijf; _scCel(ctx, dxR, y, rd, rd, lw, fill, rood > 0.5 ? lighten(BIO.bloed, 0.3) : _SC.rand); if (rood < 0.7) { ctx.save(); ctx.globalAlpha *= 1 - rood; _scMito(ctx, dxR - rd * 0.5, y + rd * 0.45, rd * 0.28, 0.6); ctx.restore(); } ctx.restore(); }
  if (schijf > 0.001) rodeBloedcel(ctx, dxR, y, rd, 0, 0, schijf);
  // kern: krimpt en donkerder, schuift naar de rand en wordt afgesnoerd met een dun laagje membraan
  const kr = lerp(rs * 0.52, rd * 0.3, dif); const kx = dxR + lerp(rd * 0.05, rd * 1.55, uitstoot), ky = y - lerp(rd * 0.08, rd * 0.2, uitstoot);
  ctx.save(); ctx.globalAlpha *= 1 - clamp((dif - 0.9) / 0.1, 0, 1) * 0.5;
  if (uitstoot > 0.01) { ctx.beginPath(); ctx.arc(kx, ky, kr * 1.35, 0, 6.283); shape(ctx, rgba('#3A3448', 0.8), rgba(_SC.rand, 0.8), lw); }
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, lerp(0, 1, dif) > 0.5 ? '#4E3E7A' : _SC.kern, _SC.kernR, lw); ctx.restore();
  ret.dochter = [dxR, y]; ret.kern = [kx, ky];
  ctx.restore(); return ret;
}
