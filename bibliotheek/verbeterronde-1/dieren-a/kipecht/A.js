// KIP (leghen), zijaanzicht naar rechts. Recept: romp eivormig en schuin (achter hoger), ± 2,5× de koplengte; staart-
// veren steil omhoog als 4 gebogen punten (sikkelvorm, overlappend); hals met halsveren die over de schouder vallen; kleine
// kop; enkelvoudige kam met 5 punten, lellen onder de snavel, oorlel; gele, korte snavel; oog oranje iris met ronde zwarte
// pupil; vleugel tegen de romp; poten geel geschubd, 3 tenen naar voren, 1 naar achter. Kleur: roodbruin met donkerdere
// vleugel en staart. Bron: foto's leghen (ISA Brown). Bekende fouten: bolletje met cirkelkop; kam als twee rondjes.
// Beweging: o.houding 'staan' (standaard; oude o.t = af en toe een korte knik), 'lopen' (o.t 0–1: om beurten een poot
// opgetild en naar voren, het lijf deint, de kop schokt mee: kip 'head-bob' = kop staat even stil t.o.v. de grond en
// schiet dan naar voren), 'pikken' (o.t 0–1: kop gaat naar de grond, snavel tikt de grond en komt terug).
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const h = o.houding || 'staan', ph = ((t % 1) + 1) % 1;
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A';
  // pootstanden: [heupx, voet dx, voet lift]
  let voeten = [[-6, 0, 0], [22, 0, 0]], dein = 0, kopDx = 0, kopDy = 0, kopRot = 0;
  if (h === 'lopen') { for (let i = 0; i < 2; i++) { const p = (ph + i * 0.5) % 1; const zwaai = p > 0.6; const q = zwaai ? (p - 0.6) / 0.4 : p / 0.6;
      voeten[i][1] = zwaai ? -18 + 36 * (0.5 - 0.5 * Math.cos(Math.PI * q)) : 18 - 36 * q; voeten[i][2] = zwaai ? Math.sin(Math.PI * q) * 16 : 0; }
    dein = -Math.abs(Math.sin(ph * Math.PI * 2)) * 4; const hb = (ph * 2) % 1; kopDx = hb < 0.6 ? -10 * hb / 0.6 : -10 + 10 * (hb - 0.6) / 0.4; } // kop blijft even staan en schiet dan naar voren
  else if (h === 'pikken') { const k = Math.sin(Math.PI * Math.min(1, ph / 0.7)); kopRot = 1.5 * k; kopDx = 34 * k; kopDy = 120 * k; }
  else { const pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6; kopRot = pik * 0.02; }
  // poten (geschubd: kleine dwarsstreepjes)
  voeten.forEach(([px, dx, lift]) => { const py = 52; const fx = px + 2 + dx, fy = py + 54 - lift;
    ctx.strokeStyle = poot; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(px, py + dein); ctx.lineTo(fx, fy); ctx.stroke();
    ctx.strokeStyle = rgba('#A07A2A', 0.7); ctx.lineWidth = 1.2; for (let k = 1; k < 5; k++) { const qx = px + (fx - px) * k / 5, qy = py + dein + (fy - py - dein) * k / 5; ctx.beginPath(); ctx.moveTo(qx - 3, qy); ctx.lineTo(qx + 3, qy); ctx.stroke(); }
    ctx.strokeStyle = poot; ctx.lineWidth = 4; const krul = lift > 2 ? 0.5 : 1; [[-22, 6], [0, 10], [20, 6]].forEach(([tx, ty]) => { ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + tx * krul, fy + ty * krul); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx - 12 * krul, fy - 4); ctx.stroke(); });
  ctx.translate(0, dein);
  // staart: 4 sikkelveren, overlappend, met lichte schachtlijn
  [[-112, -150, -0.25], [-100, -156, -0.05], [-88, -146, 0.12], [-76, -128, 0.3]].forEach(([tx, ty, r], i) => { ctx.beginPath(); ctx.moveTo(-70 + i * 4, -66); ctx.quadraticCurveTo(tx - 20, ty + 40, tx, ty); ctx.quadraticCurveTo(tx + 20, ty + 30, -50 + i * 4, -60); ctx.closePath();
    shape(ctx, _bioDonker(kleur, 0.38 + i * 0.04), _bioDonker(kleur, 0.55), 1.2); ctx.strokeStyle = rgba(licht, 0.35); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-62 + i * 4, -64); ctx.quadraticCurveTo(tx - 4, ty + 30, tx + 2, ty + 4); ctx.stroke(); });
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null); // romp
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null); // vleugel
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76 + kopDx * 0.3, -64); ctx.rotate(kopRot * 0.6); ctx.translate(kopDx * 0.7, kopDy * 0.3);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null); // hals
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.translate(24, -66); ctx.rotate(kopRot * 0.5); ctx.translate(-24, 66);
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null); // kop
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null); // snavel
  ctx.strokeStyle = rgba('#A07A2A', 0.8); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(42, -64); ctx.lineTo(58, -62); ctx.stroke();
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill(); // kam
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); // lel + oorlel
  _bioCirc(ctx, 30, -70, 5, '#E8A040', '#7A4A20', 1); _bioCirc(ctx, 30.6, -70, 2.6, '#121A26'); _bioCirc(ctx, 29.4, -71.4, 0.9, 'rgba(255,255,255,0.5)'); // oog: oranje iris, ronde pupil
  ctx.restore(); ctx.restore();
}
