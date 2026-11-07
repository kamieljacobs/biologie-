// =====================================================================================
// LICHTMICROSCOOP (binoculair, schoolmodel), zijaanzicht met volume (drie vlakke tinten: wit-grijs gelakt metaal,
// zwarte knoppen, metalen objectieven) en een beeldcirkel met wat je door het oculair ziet (scherp of wazig).
// Recept (Evident/Olympus CX23: 198 × 398 × 386 mm, ± 6 kg; LED-lamp onderin, Abbe-condensor, kruistafel met
//  verplaatsing 76 × 30 mm, coaxiale grove en fijne scherpstelknop aan beide kanten, scherpstellen door de tafel te
//  bewegen (slag grof 15 mm); onderdelen volgens CUNY Bio Lab Manual: oculair, revolver met objectieven,
//  objectieftafel met preparaatklem, condensor, lamp, voet, statief (arm), grove en fijne instelling, lichtregelaar).
//  Opbouw in zijaanzicht: voet ± 250 mm diep met de lamp; statief (C-vorm) achter; kop met twee oculairen schuin
//  (± 30°) naar de kijker; revolver met 3 objectieven (verschillend lang); tafel ± 140 mm met glaasje; condensor
//  onder de tafel; knoppen laag op het statief. Het licht gaat van de lamp omhoog door condensor, preparaat en
//  objectief (teal bundel, alleen als o.licht).
//  Beeld: ronde lichtvlek met cellen (rok-epitheel: platte cellen met kern, paars gekleurd); bij o.scherp 0 vaag en
//  groter (onscherp), bij 1 scherpe randen. Bij lamp uit: donker.
//  Bekende fouten: oculair recht boven het objectief zonder kop; lamp boven de tafel; microscoop zo groot als een
//  kind; scherpstellen door het oculair te draaien.
// x, y = midden van de voet op tafel; s = px per mm. o.tafel 0..1 (hoogte van de tafel binnen de grove slag),
// o.licht (bool), o.scherp 0..1 (beeld in de cirkel), o.beeld (bool: cirkel tonen), o.kijk, o.a. Geeft { oculair, objectief, tafel, lamp,
// knop, condensor } terug.
// =====================================================================================
function microscoop(ctx, x, y, s, o = {}) {
  const { a = 1, tafel = 0.5, licht = true, scherp = 1, beeld = false } = o; const k = o.kijk || 1;
  const P = (px, py) => [x + k * px * s, y + py * s]; const dz = clamp(tafel, 0, 1) * 15;
  const ret = { oculair: P(95, -380), objectief: P(30, -215), tafel: P(30, -170 - dz), lamp: P(20, -18), knop: P(-80, -110), condensor: P(30, -140 - dz), beeld: P(-260, -330) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.save(); ctx.translate(x, y); ctx.scale(k * s, s);
  const wit = '#E6E9EE', grijs = '#C2C8D2', don = '#8E98A8', zwart = '#2B2F38', staal = '#AEB8C6';
  const poly = (pts, fill) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  if (licht) { ctx.fillStyle = rgba(C.goud, 0.18); ctx.beginPath(); ctx.moveTo(18, -40); ctx.lineTo(42, -40); ctx.lineTo(36, -150 - dz); ctx.lineTo(24, -150 - dz); ctx.closePath(); ctx.fill(); }
  // voet (3 tinten), lamp
  poly([[-125, -40], [125, -40], [125, -6], [-125, -6]], grijs); poly([[-125, -40], [125, -40], [120, -32], [-120, -32]], wit); poly([[-125, -6], [125, -6], [122, 0], [-122, 0]], don);
  ctx.fillStyle = licht ? C.goud : '#55657F'; ctx.beginPath(); ctx.ellipse(30, -40, 16, 4, 0, 0, 6.283); ctx.fill();
  // statief
  poly([[-110, -40], [-110, -300], [-90, -330], [60, -330], [70, -300], [-60, -300], [-70, -280], [-70, -40]], grijs); poly([[-110, -40], [-110, -300], [-100, -315], [-100, -40]], wit); poly([[-75, -40], [-75, -285], [-70, -280], [-70, -40]], don);
  // kop + oculairen
  poly([[-60, -330], [60, -330], [70, -350], [-40, -360]], wit); poly([[40, -345], [62, -360], [104, -398], [86, -412], [30, -365]], grijs); poly([[62, -360], [104, -398], [100, -402], [58, -366]], don);
  ctx.save(); ctx.translate(95, -405); ctx.rotate(-0.72); ctx.fillStyle = zwart; roundRect(ctx, -9, -20, 18, 24, 3); ctx.fill(); ctx.fillStyle = '#4A505C'; ctx.fillRect(-9, -20, 5, 24); ctx.restore();
  // revolver en objectieven (metaal met gekleurde ring per vergroting)
  poly([[0, -300], [60, -300], [52, -318], [8, -318]], don);
  for (const [x0, x1, y1, ring] of [[16, 44, -240, '#E07A5F'], [46, 60, -268, '#E0B64A'], [-2, 12, -258, '#7FC48F']]) { poly([[x0, -300], [x1, -300], [x1 - 3, y1], [x0 + 3, y1]], staal); poly([[x0, -300], [x0 + 4, -300], [x0 + 6, y1], [x0 + 3, y1]], wit); ctx.fillStyle = ring; ctx.fillRect(x0 + 1, -286, x1 - x0 - 2, 3); }
  // tafel + glaasje + condensor
  ctx.save(); ctx.translate(0, -dz); poly([[-40, -168], [110, -168], [110, -158], [-40, -158]], zwart); poly([[-70, -160], [-40, -168], [-40, -158], [-70, -150]], grijs);
  ctx.fillStyle = rgba('#E8EEF5', 0.6); ctx.fillRect(-10, -172, 80, 4); ctx.fillStyle = rgba(C.paars, 0.7); ctx.fillRect(26, -172, 8, 3); poly([[10, -158], [50, -158], [44, -138], [16, -138]], zwart); ctx.restore();
  // knoppen (zwart, coaxiaal)
  circ(ctx, -90, -110, 24, zwart); circ(ctx, -90, -110, 12, '#4A505C'); ctx.strokeStyle = '#4A505C'; ctx.lineWidth = 2; for (let kk = 0; kk < 10; kk++) { const an = kk / 10 * 6.283; ctx.beginPath(); ctx.moveTo(-90 + Math.cos(an) * 20, -110 + Math.sin(an) * 20); ctx.lineTo(-90 + Math.cos(an) * 24, -110 + Math.sin(an) * 24); ctx.stroke(); }
  ctx.restore();
  // beeldcirkel: wat je door het oculair ziet
  if (beeld) { const [bx, by] = ret.beeld, br = 130 * s; ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.283); ctx.fillStyle = '#0A0D12'; ctx.fill(); ctx.save(); ctx.clip();
    if (licht) { ctx.fillStyle = '#E8E2D2'; ctx.beginPath(); ctx.arc(bx, by, br * 0.94, 0, 6.283); ctx.fill(); const vaag = 1 - clamp(scherp, 0, 1);
      if (vaag > 0.05) ctx.filter = `blur(${(vaag * 8 * s * 2).toFixed(1)}px)`;
      for (let i = 0; i < 7; i++) { const cx2 = bx + (hash(i * 3 + 1) - 0.5) * br * 1.3, cy2 = by + (hash(i * 3 + 2) - 0.5) * br * 1.3, rr = br * (0.22 + 0.08 * hash(i)); const pts = []; for (let kk = 0; kk < 9; kk++) { const an = kk / 9 * 6.283; pts.push([cx2 + Math.cos(an) * rr * (0.85 + 0.3 * hash(i * 9 + kk)), cy2 + Math.sin(an) * rr * (0.85 + 0.3 * hash(i * 9 + kk + 4))]); }
        ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = rgba(C.paars, 0.18); ctx.fill(); ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = Math.max(1, 1.5 * s * 2); ctx.stroke(); circ(ctx, cx2 + rr * 0.1, cy2, rr * 0.16, rgba(C.kern, 0.85)); }
      ctx.filter = 'none'; }
    ctx.restore(); ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore(); return ret;
}
