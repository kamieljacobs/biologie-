// Variant A (27 okt 2026): somieten als bultjes op de rugrand, kieuwbogen als drie bolle plooien onder het oog, hart
// dieper rood binnen de hartbult; nieuwe optie o.week (4–8, standaard 6 = oud beeld): ledemaatknoppen groeien
// (week 8 vingerstralen), staartje en kieuwbogen verdwijnen, somieten vervagen. Bron: Sadler h. 6; UNSW Embryology
// Carnegie-stadia. Vorm van het lijf zelf blijft die van ± week 6 (geen echte morph van de romp).
// EMBRYO van ± 6 weken na de bevruchting (Carnegie-stadium 15–17, kop-romplengte ± 7–12 mm), zijaanzicht.
// Recept: C-vormig; groot hoofd (± de helft van de lengte) met voorhersenblaas; oog als donker pigmentringetje met
// lens; oorputje achter de kieuwbogen; 3 kieuwboogjes onder het hoofd; grote hartbult en daaronder de leverbult;
// armknop (al een peddel) ter hoogte van het hart, kleinere beenknop lager; rij somieten (blokjes) langs de rug;
// staartje dat naar binnen krult. Huid doorzichtig, roze. De aanleg van de geslachtsklieren ligt binnenin tegen de
// achterwand van de buikholte (genitale lijst, naast de oernier). Bron: Sadler, Langman's Embryology h. 6 en 16;
// Virtual Human Embryo (Carnegie 16). Bekende fouten: kommavorm met een stip; ledematen als vingers; aanleg buiten op het lijf.
// Oorsprong = midden; ± 300 × 400 bij s = 1. o.glow = aanleg laten oplichten.
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0, week = 6 } = o; if (a <= 0.01) return; const wk = clamp(week, 4, 8);
  const ledem = clamp((wk - 4) / 3, 0.15, 1), staart = clamp((8 - wk) / 3, 0, 1), vinger = clamp(wk - 7, 0, 1), boog = clamp((7.5 - wk) / 2, 0, 1), som = clamp((7.5 - wk) / 2.5, 0.15, 1); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#C9877A', diep = '#D69A8A';
  const lijf = [[-70, -170], [20, -208], [104, -182], [150, -112], [160, -24], [150, 58], [118, 124], [72, 166], [28, 182], [-8, 166], [-34, 128], [-52, 78], [-70, 30], [-98, -14], [-90, -52], [-108, -72], [-124, -112], [-112, -152]];
  // staart
  if (staart > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(staart * 2, 0, 1); ctx.strokeStyle = huid; ctx.lineWidth = 26 * (0.5 + 0.5 * staart); ctx.beginPath(); bioPad(ctx, [[30, 176], [-14, 196], [-44, 182], [-50, 156]], false); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, [[-44, 182], [-56, 156], [-46, 136]], false); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, rgba(huid, 0.96), rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  // voorhersenblaas en hersenblazen als zachtere vlakken
  ctx.fillStyle = rgba('#F6CDBC', 0.8); ctx.beginPath(); ctx.ellipse(-30, -150, 70, 50, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -150, 52, 44, 0.4, 0, 6.283); ctx.fill();
  // hart (klopt) en lever door de huid
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2; ctx.fillStyle = rgba('#9E2E2A', 0.7 + 0.2 * slag); ctx.beginPath(); ctx.ellipse(-52, -16, 26 + 3 * slag, 22 + 3 * slag, 0.3, 0, 6.283); ctx.fill(); // hart: dieper rood, binnen de hartbult (niet aan de rand)
  ctx.fillStyle = rgba('#9A3E36', 0.4); ctx.beginPath(); ctx.ellipse(-44, 46, 34, 36, 0, 0, 6.283); ctx.fill();
  // somieten langs de rug
  const rug = bioDicht([[96, -150], [138, -80], [146, 0], [132, 74], [100, 136], [56, 168]], 26); ctx.save(); ctx.globalAlpha *= som; rug.forEach((p, i) => { const q = rug[Math.min(rug.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an) * 14, p[1] + Math.cos(an) * 14); ctx.rotate(an); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.6), null); ctx.restore(); }); ctx.restore();
  // aanleg geslachtsklier: langwerpige lijst tegen de achterwand van de buik
  const gp = [[86, 30], [96, 70], [90, 108]]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 10; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwboogjes
  // somieten als rij bultjes op de rugrand (de rug is golvend, niet glad)
  if (som > 0.01) { ctx.save(); ctx.globalAlpha *= som; bioDicht([[118, -168], [150, -112], [160, -24], [150, 58], [118, 124]], 22).forEach((p, i, A) => { const q = A[Math.min(A.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.beginPath(); ctx.arc(p[0] - Math.sin(an) * 1, p[1] + Math.cos(an) * 1, 7, an, an + Math.PI); ctx.fillStyle = huid; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.stroke(); }); ctx.restore(); }
  // kieuwbogen: drie plooien onder het oog, elk een eigen bolle wal met een groef ertussen
  if (boog > 0.01) { ctx.save(); ctx.globalAlpha *= boog; [[-96, -94, 20, 11], [-88, -72, 17, 9], [-80, -54, 13, 7]].forEach(([bx, by, rx, ry], i) => { ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, 0.5, 0, 6.283); shape(ctx, i ? '#E8AE98' : '#F0BEA8', rand, 2); }); ctx.restore(); }
  // oog en oorputje
  _bioCirc(ctx, -66, -128, 15, rgba('#5A3A34', 0.85)); _bioCirc(ctx, -66, -128, 7, rgba('#F6E6DC', 0.9)); ctx.beginPath(); ctx.arc(-6, -96, 7, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke();
  // armknop (peddel) en beenknop
  ctx.save(); ctx.translate(14, 12); ctx.rotate(1.9); ctx.beginPath(); ctx.ellipse(28 * ledem + 6, 0, 40 * ledem + 6, 22 * (0.6 + 0.4 * ledem), 0, 0, 6.283); shape(ctx, huid, rand, 2.5);
  if (vinger > 0.01) { ctx.strokeStyle = rgba(rand, 0.8 * vinger); ctx.lineWidth = 2; for (let f = -2; f <= 2; f++) { ctx.beginPath(); ctx.moveTo(48, f * 4); ctx.lineTo(70, f * 7.5); ctx.stroke(); } } ctx.restore();
  const been = clamp((wk - 4.5) / 3, 0.1, 1); ctx.save(); ctx.translate(58, 128); ctx.rotate(2.3); ctx.beginPath(); ctx.ellipse(22 * been + 5, 0, 30 * been + 5, 17 * (0.6 + 0.4 * been), 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.restore();
}
