// =====================================================================================
// NUCLEOSOMEN DICHT ↔ OPEN (acetylering), uitbreiding op nucleosoomDraad. Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 4):
//  - DNA windt ± 1,65 keer om een kern van acht histonen (nucleosoomDraad, op schaal 2 nm / 11 nm). Uit elke kern steken
//    histonstaarten (de uiteinden van de histon-eiwitten, positief geladen) die het negatief geladen DNA vasthouden.
//  - dicht (o.open 0): nucleosomen liggen dicht op elkaar, staarten liggen strak tegen het DNA; de promotor ligt eronder en
//    een transcriptiefactor kan er niet bij ('closely spaced nucleosomes … transcription factors cannot bind', OpenStax).
//  - open (o.open 1): acetylgroepen (groen: gen gaat aan) op de staarten maken ze minder positief, het DNA laat losser,
//    nucleosomen schuiven uit elkaar; de promotor (goud) komt vrij en een transcriptiefactor kan binden (o.tf).
//  - openen is een morph: eerst verschijnen de acetylgroepen, dan strekken de staarten, dan schuiven de nucleosomen.
// Bekende fouten: open = minder nucleosomen; acetylgroepen op het DNA in plaats van op de staarten; DNA dat door de kern loopt.
// Vereist nucleosoomDraad (lib_bio.js) en dnaDraad (lib_micro_evo.js). Van (x0,y0) naar (x1,y1); o.n = aantal nucleosomen
// (even, standaard 4), o.R = straal van de kern; o.open 0..1; o.tf 0..1 (plaatshouder-factor landt op de promotor); o.t.
// Geeft {promotor: [x, y], centra: [[x, y] …], tf: [x, y]} terug.
// =====================================================================================
function _naStaart(ctx, P, rr, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(kl, 0.3); ctx.lineWidth = rr * 0.5; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach(p => _bioCirc(ctx, p[0], p[1], rr, kl, lighten(kl, 0.35), 1)); ctx.restore(); }
function _naAcetyl(ctx, x, y, rr, an, a = 1) { // acetylgroep: C=O en CH3 (drie bolletjes), groen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = rr * 0.4;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, -rr * 0.9); ctx.moveTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, rr * 0.9); ctx.stroke();
  _bioCirc(ctx, rr * 1.6, 0, rr * 0.75, C.groen, lighten(C.groen, 0.35), 1); _bioCirc(ctx, rr * 2.7, -rr * 0.95, rr * 0.6, '#D8DCE2', null); _bioCirc(ctx, rr * 2.7, rr * 0.95, rr * 0.6, C.groen, null); ctx.restore(); }
function nucleosoomAcetyl(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, open = 0, tf = 0, t = 0, tilt = 1.05 } = o; if (a <= 0.01) return {};
  const ac = ease(clamp(open / 0.35, 0, 1)), strek = ease(clamp((open - 0.25) / 0.35, 0, 1)), schuif = ease(clamp((open - 0.5) / 0.5, 0, 1));
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), nL = Math.max(1, Math.floor(n / 2)), nR = Math.max(1, n - nL);
  const per = lerp(1.72, 2.12, schuif) * R, LL = per * nL, LR = per * nR, gap = lerp(60, Math.max(60, L - LL - LR - 60), schuif);
  const xL = (L - (LL + LR + gap)) / 2, xR = xL + LL + gap, cs = Math.cos(ang), sn = Math.sin(ang), Wd = (p) => [x0 + p[0] * cs - p[1] * sn, y0 + p[0] * sn + p[1] * cs];
  const uit = { centra: [] };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const dw = Math.max(6, R * 0.34), yEndL = ((nL - 1) % 2 ? 1 : -1) * R * 0.45 - R * 0.8, yStartR = -R * 0.45 + R * 0.8;
  // vrij DNA tussen de twee groepen, met de promotor (goud) in het midden
  const pa = [xL + LL + 30, yEndL], pb = [xR - 30, yStartR], pm = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2];
  if (schuif > 0.05) { ctx.save(); ctx.globalAlpha *= schuif; roundRect(ctx, pm[0] - R * 1.1, pm[1] - dw * 1.2, R * 2.2, dw * 2.4, dw); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  dnaDraad(ctx, [pa, [pm[0], pm[1] + R * 0.3 * (1 - schuif)], pb], { w: dw, helix: true, fase: t * 0.2 });
  // twee groepen nucleosomen (de bestaande tekening)
  const cL = nucleosoomDraad(ctx, xL, 0, xL + LL, 0, { n: nL, R, t, tilt }); const cR = nucleosoomDraad(ctx, xR, 0, xR + LR, 0, { n: nR, R, t, tilt });
  // verlengstukken naar de uiteinden
  dnaDraad(ctx, [[0, R * 0.35], [xL - 30, (-R * 0.45 + R * 0.8)]], { w: dw, helix: true, fase: t * 0.2 }); const yEndR = ((nR - 1) % 2 ? 1 : -1) * R * 0.45 - R * 0.8; dnaDraad(ctx, [[xR + LR + 30, yEndR], [L, -R * 0.35]], { w: dw, helix: true, fase: t * 0.2 });
  // histonstaarten: dicht = kort en strak tegen de kern; open = gestrekt met acetylgroepen
  const rr = R * 0.075, kl = '#9AAAC4', alle = [...cL.map(c => [c[0] + xL, c[1]]), ...cR.map(c => [c[0] + xR, c[1]])];
  alle.forEach((c, i) => { uit.centra.push(Wd(c)); const hz = R * 6 / 11 * Math.sin(tilt);
    [-2.5, -1.2, 0.3, 1.9].forEach((an0, k) => { const an = an0 + i * 0.7, bx = c[0] + Math.cos(an) * R * 0.9, by = c[1] - hz / 2 + Math.sin(an) * R * Math.cos(tilt) * 0.9, P = [];
      for (let q = 0; q < 7; q++) { const u = q / 6, len = lerp(0.35, 0.95, strek) * R, krul = lerp(1.9, 0.5, strek);
        P.push([bx + Math.cos(an + u * krul) * u * len + Math.sin(t + q + k) * rr * 0.3 * strek, by + Math.sin(an + u * krul) * u * len * 0.8]); }
      _naStaart(ctx, P, rr, kl); if (ac > 0.01) { const q = P[4], q2 = P[6]; _naAcetyl(ctx, q[0], q[1], rr * 1.1, an - 1.4, ac); if (k % 2 === 0) _naAcetyl(ctx, q2[0], q2[1], rr * 1.1, an + 1.2, ac); } }); });
  // plaatshouder-transcriptiefactor (eigen object: transcriptiefactor)
  if (tf > 0.01 && schuif > 0.6) { const p = ease(tf), tx = pm[0], ty = lerp(pm[1] - R * 2.6, pm[1] - dw * 1.6, p); enzymKluwen(ctx, tx, ty, R * 0.62, { a: Math.min(1, tf * 2), col: '#7A8BA8', seed: 3, an: Math.PI / 2 }); uit.tf = Wd([tx, ty]); }
  uit.promotor = Wd(pm); ctx.restore(); return uit;
}
