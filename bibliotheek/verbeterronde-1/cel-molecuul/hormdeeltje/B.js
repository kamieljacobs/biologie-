// HORMOONDEELTJE — variant B 'silhouet per hormoon, leesbaar op filmgrootte' (27 okt 2026).
// Recept (BEELDAFSPRAKEN; OpenStax Biology 2e 3.3 en A&P 17.2): elk hormoon één gevuld silhouet dat ook op
// r = 9 px nog verschilt (vorm, niet alleen kleur):
// · steroïden = vier gekoppelde ringen (3 zesringen + 1 vijfring) als één gevuld blok met gaten in de ringen;
//   testosteron met een knopje (=O) links, oestradiol met een ronde ring A (aromatisch) en een staartje (OH).
// · GnRH = decapeptide: een gebogen 'rups' van 10 bultjes (kralen samengesmolten), goud.
// · FSH = glycoproteïne: twee lobben (α rond + β langgerekt) met twee suikerantennes (teal).
// · LH = twee lobben (α rond + β kort en rond) met één suikerantenne (groen).
// · volg = gouden ring om één deeltje (C8, geen gloed).
// Bekende fouten: capsules die alleen in kleur verschillen; steroïden als bolletjes.
// Aanroep zoals voorheen: hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false).
const HORM_B = { gnrh: '#E0B64A', fsh: '#5BA4C9', lh: '#7FC48F', testo: '#8C7BBF', oestro: '#B59BE0' };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const col = HORM_B[soort] || HORM_B.gnrh; const rand = _mixHex(col, '#FFFFFF', 0.45), lw = Math.max(1, r * 0.14);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'testo' || soort === 'oestro') {
    const e = r * 0.42, w = e * Math.sqrt(3); const hx = (cx, cy, s = 1) => { for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3; i ? ctx.lineTo(cx + Math.cos(an) * e * s, cy + Math.sin(an) * e * s) : ctx.moveTo(cx + Math.cos(an) * e * s, cy + Math.sin(an) * e * s); } ctx.closePath(); };
    const A = [-w * 1.2, e * 0.75], B = [-w * 0.2, e * 0.75], Cc = [w * 0.3, -e * 0.75]; const c1 = [Cc[0] + w / 2, Cc[1] - e / 2], c2 = [Cc[0] + w / 2, Cc[1] + e / 2];
    const D = () => { ctx.moveTo(c1[0], c1[1]); ctx.lineTo(c1[0] + e * 0.95, c1[1] - e * 0.3); ctx.lineTo(c1[0] + e * 1.5, Cc[1]); ctx.lineTo(c2[0] + e * 0.95, c2[1] + e * 0.3); ctx.lineTo(c2[0], c2[1]); ctx.closePath(); };
    ctx.beginPath(); hx(...A, 1.12); hx(...B, 1.12); hx(...Cc, 1.12); D(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke();
    // gaten in de ringen (donker), ring A rond bij oestradiol
    ctx.fillStyle = C.bgSchema; ctx.beginPath(); if (soort === 'oestro') ctx.arc(A[0], A[1], e * 0.5, 0, 6.283); else hx(...A, 0.48); hx(...B, 0.48); hx(...Cc, 0.48); ctx.fill();
    ctx.beginPath(); ctx.arc(c1[0] + e * 0.6, Cc[1], e * 0.28, 0, 6.283); ctx.fill();
    if (soort === 'testo') { ctx.beginPath(); ctx.arc(A[0] - w * 0.62, A[1] + e * 0.62, e * 0.36, 0, 6.283); shape(ctx, col, rand, lw); }
    else { ctx.strokeStyle = col; ctx.lineWidth = e * 0.35; ctx.beginPath(); ctx.moveTo(A[0] - w * 0.45, A[1] + e * 0.3); ctx.lineTo(A[0] - w * 0.85, A[1] + e * 0.6); ctx.stroke(); }
  } else if (soort === 'gnrh') {
    const P = []; for (let i = 0; i < 10; i++) { const u = i / 9; P.push([lerp(-r * 1.25, r * 1.25, u), -Math.sin(u * Math.PI) * r * 0.7 + r * 0.3]); }
    ctx.beginPath(); P.forEach(p => { ctx.moveTo(p[0] + r * 0.24, p[1]); ctx.arc(p[0], p[1], r * 0.24, 0, 6.283); }); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = r * 0.3; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
    ctx.strokeStyle = rand; ctx.lineWidth = Math.max(0.8, r * 0.07); ctx.beginPath(); P.forEach(p => { ctx.moveTo(p[0] + r * 0.24, p[1]); ctx.arc(p[0], p[1], r * 0.24, 0, 6.283); }); ctx.stroke();
  } else {
    const fsh = soort === 'fsh'; const k = fsh ? 1.2 : 1.1; const R = r * k;
    const ant = (bx, by, dx, dy) => { ctx.strokeStyle = _mixHex(C.oker, '#FFFFFF', 0.2); ctx.lineWidth = Math.max(1, R * 0.12); ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + dx, by + dy); ctx.stroke(); ctx.beginPath(); ctx.arc(bx + dx, by + dy, R * 0.16, 0, 6.283); ctx.fillStyle = C.oker; ctx.fill(); };
    if (fsh) { ant(R * 0.2, -R * 0.3, -R * 0.15, -R * 0.65); ant(R * 0.75, -R * 0.2, R * 0.3, -R * 0.55); } else ant(R * 0.45, -R * 0.35, R * 0.15, -R * 0.6);
    ctx.beginPath(); ctx.arc(-R * 0.45, R * 0.05, R * 0.55, 0, 6.283); shape(ctx, _mixHex(col, '#8FA0B5', 0.4), rand, lw);
    ctx.beginPath(); if (fsh) ctx.ellipse(R * 0.5, 0, R * 0.72, R * 0.4, -0.15, 0, 6.283); else ctx.arc(R * 0.42, 0, R * 0.45, 0, 6.283); shape(ctx, col, rand, lw);
  }
  ctx.restore();
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
