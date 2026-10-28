// =====================================================================================
// ANTISTOF (IgG) — variant B 'vier kralenketens' (verbeterronde 2, 28 okt 2026; Kamiel: 'het mag simpeler, nu
// is het erg druk'). Zelfde eenvoudige leerboekopbouw als OpenStax Microbiology / Newcastle Univ. BMS-wiki /
// Kaiser Microbiology 13.1B, maar elke keten is één rij kralen (aminozuren), zoals alle eiwitten in de beeldbank
// (kralenketen). Geen vouwdomeinen: de ketens liggen gestrekt langs de Y, zodat het rustig blijft.
// Recept:
// - twee identieke zware ketens (lang, goud) lopen van de voet van de steel door het scharnier tot in de top van
//   elke arm; ze liggen aan de binnenkant van de Y. De steel (Fc) bestaat alleen uit de twee zware ketens.
// - twee identieke lichte ketens (kort, crème) liggen aan de buitenkant van elke arm (Fab), naast de zware keten.
// - de laatste kralen van beide ketens in elke top zijn het variabele deel (teal: per antistof anders); samen vormen
//   ze één bindplaats met een pasvorm voor één stukje antigeen (epitoop). Twee gelijke bindplaatsen.
// - zwavelbruggen (korte witte streepjes) tussen de zware ketens in het scharnier en tussen zware en lichte keten.
//   Het scharnier is buigzaam (armen ± 60–180° uit elkaar).
// - als B-celreceptor loopt de steel door in een kort staartje door het membraan.
// - verhouding: antistof ± 15 nm, virus ± 100 nm, bacterie ± 1000 nm (antistof dus heel klein).
// - klein getekend (s < 0,35) worden de kralen gladde banden (anders korrel).
// Kleur: zware keten goud, lichte keten crème (lichter: ook zonder kleur te onderscheiden), variabel deel teal,
// antigeen koraal. Bekende fouten: Y als drie streepjes; bindplaats aan de steel; lichte keten in de steel; antistof
// net zo groot als het virus; kralen die per domein heen en weer vouwen (te druk).
// Aanroep: antistofY(ctx, x, y, s, o) — (x, y) = scharnier, s = 1 → ± 200 px hoog. o.a, o.ang (0 = armen omhoog),
// o.open (halve hoek tussen de armen, standaard 0.7), o.buig [l, r], o.k = pasvorm 0–3, o.bind [0..1, 0..1]
// (antigeen zakt in de bindplaats), o.agCol, o.op = 'vrij' | 'bcel', o.hl (gloed), o.t, o.zwavel.
// Geeft { tips, richt, voet, scharnier } terug (schermcoördinaten).
// =====================================================================================
const _AYB = { zwaar: '#D9A93A', licht: '#F3E3B8', varZ: '#4E9CC4', varL: '#9FD0E6', rand: '#1A2740', zwavel: '#FFFFFF', ag: '#E07A5F' };
function _aybPas(ctx, k, w) { // pasvorm van de bindplaats, van links naar rechts, diepte naar binnen = +y
  if (k === 1) { ctx.lineTo(-w * 0.5, 0); ctx.arc(0, 0, w * 0.5, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.42, 0); ctx.lineTo(-w * 0.42, w * 0.5); ctx.lineTo(w * 0.42, w * 0.5); ctx.lineTo(w * 0.42, 0); }
  else if (k === 3) { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(-w * 0.2, w * 0.5); ctx.lineTo(0, w * 0.15); ctx.lineTo(w * 0.2, w * 0.5); ctx.lineTo(w * 0.5, 0); }
  else { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(0, w * 0.6); ctx.lineTo(w * 0.5, 0); }
}
function _aybAg(ctx, k, w, col) { // stukje antigeen: bult die precies in de pasvorm valt, aan een groter (afgesneden) molecuul
  ctx.beginPath(); ctx.moveTo(-w * 0.8, -w * 0.25);
  if (k === 1) { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.arc(0, 0, w * 0.47, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.4, -w * 0.02); ctx.lineTo(-w * 0.4, w * 0.48); ctx.lineTo(w * 0.4, w * 0.48); ctx.lineTo(w * 0.4, -w * 0.02); }
  else if (k === 3) { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.lineTo(-w * 0.2, w * 0.47); ctx.lineTo(0, w * 0.12); ctx.lineTo(w * 0.2, w * 0.47); ctx.lineTo(w * 0.47, -w * 0.02); }
  else { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.lineTo(0, w * 0.57); ctx.lineTo(w * 0.47, -w * 0.02); }
  ctx.lineTo(w * 0.8, -w * 0.25); ctx.bezierCurveTo(w * 1.35, -w * 0.5, w * 1.15, -w * 1.5, 0, -w * 1.4); ctx.bezierCurveTo(-w * 1.15, -w * 1.5, -w * 1.35, -w * 0.5, -w * 0.8, -w * 0.25); ctx.closePath();
  shape(ctx, col, lighten(col, 0.3), Math.max(1, w * 0.06));
}
function _aybBand(ctx, x0, y0, x1, y1, w, col, rand, lw) { // afgeronde band van (x0,y0) naar (x1,y1), breedte w
  const L = Math.hypot(x1 - x0, y1 - y0) || 1, an = Math.atan2(y1 - y0, x1 - x0);
  ctx.save(); ctx.translate(x0, y0); ctx.rotate(an); roundRect(ctx, -w / 2, -w / 2, L + w, w, w / 2); shape(ctx, col, rand, lw); ctx.restore();
}
function antistofY(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = 0, open = 0.7, buig = [0, 0], k = 0, bind = [0, 0], agCol = _AYB.ag, op = 'vrij', hl = 0, t = 0 } = o;
  const w = 15 * s, g = 0.5; // kraaldikte (= ketenbreedte); kleine naad tussen de ketens
  const La = 96 * s, Ls = 88 * s, o0 = 10 * s; // armlengte, steellengte, arm begint iets boven het scharnier
  const zwavel = o.zwavel ?? (s > 0.3);
  const ca = Math.cos(ang), sa = Math.sin(ang); const P = (px, py) => [x + px * ca - py * sa, y + px * sa + py * ca];
  const armAn = [-Math.PI / 2 - open - buig[0] + 0.025 * Math.sin(t * 1.3), -Math.PI / 2 + open + buig[1] + 0.025 * Math.sin(t * 1.1 + 1)];
  const tipOff = o0 + La + w * 0.5;
  const ret = { tips: armAn.map(an => P(Math.cos(an) * tipOff, Math.sin(an) * tipOff)), richt: armAn.map(an => an + ang), voet: P(0, Ls + (op === 'bcel' ? 26 * s : 0)), scharnier: [x, y] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, 1.6 * s), rand = _AYB.rand;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = w * 3.2; ctx.beginPath(); ctx.moveTo(0, Ls); ctx.lineTo(0, 0); armAn.forEach(an => { ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * (o0 + La), Math.sin(an) * (o0 + La)); }); ctx.stroke(); ctx.restore(); }
  // staartje door het membraan (B-celreceptor)
  if (op === 'bcel') { ctx.strokeStyle = _AYB.zwaar; ctx.lineWidth = Math.max(1.2, w * 0.3); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * w * 0.5, Ls); ctx.lineTo(sd * w * 0.3, Ls + 26 * s); ctx.stroke(); } }
  // bindplaats: in elke top een kommetje met de pasvorm (teal lijn) tussen de toppen van zware en lichte keten
  const pw = w * 1.85;
  const arm = armAn.map((an, i) => { const ux = Math.cos(an), uy = Math.sin(an), sd = i ? 1 : -1; return { an, ux, uy, nx: -uy * sd, ny: ux * sd }; }); // n = naar buiten
  ctx.save();
  // ketens: pad van elke keten (zware: voet van de steel → scharnier → binnenkant arm; lichte: buitenkant arm)
  const ketens = [];
  arm.forEach((A2, i) => { const sd = i ? 1 : -1; const sx = sd * (w * 0.5 + g);
    const b0 = [A2.ux * o0 + sx * 0.2, A2.uy * o0], top = [A2.ux * (o0 + La - w * 0.6), A2.uy * (o0 + La - w * 0.6)];
    const bocht = []; for (let q = 0; q <= 6; q++) { const u = q / 6, m = [sx, -w * 0.2]; bocht.push([(1 - u) * (1 - u) * sx + 2 * u * (1 - u) * m[0] + u * u * b0[0], (1 - u) * (1 - u) * w * 0.6 + 2 * u * (1 - u) * m[1] + u * u * b0[1]]); }
    ketens.push({ pts: [[sx, Ls - w * 0.5], ...bocht, top], col: _AYB.zwaar, vcol: _AYB.varZ, r: w * 0.38, vVan: La * 0.45 }); // variabel deel: laatste ± 45 % van de arm
    const off = w + g * 2, l0 = o0 + La * 0.12, l1 = o0 + La - w * 0.6;
    ketens.push({ pts: [[A2.ux * l0 + A2.nx * off, A2.uy * l0 + A2.ny * off], [A2.ux * l1 + A2.nx * off, A2.uy * l1 + A2.ny * off]], col: _AYB.licht, vcol: _AYB.varL, r: w * 0.36, vVan: La * 0.45 }); });
  if (s < 0.35) { // klein: gladde banden
    for (const K of ketens) { const D = bioDicht(K.pts, 40); let L = 0; const acc = [0]; for (let q = 1; q < D.length; q++) { L += Math.hypot(D[q][0] - D[q - 1][0], D[q][1] - D[q - 1][1]); acc.push(L); }
      const split = D.findIndex((p, q) => acc[q] >= L - K.vVan); ctx.lineWidth = K.r * 2; ctx.strokeStyle = K.col; ctx.beginPath(); D.slice(0, split + 1).forEach((p, q) => q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.strokeStyle = K.vcol; ctx.beginPath(); D.slice(split).forEach((p, q) => q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); } }
  else for (const K of ketens) { // kralen op vaste afstand langs het pad, met een dunne draad eronder
    const D = bioDicht(K.pts, 120); let L = 0; const acc = [0]; for (let q = 1; q < D.length; q++) { L += Math.hypot(D[q][0] - D[q - 1][0], D[q][1] - D[q - 1][1]); acc.push(L); }
    ctx.strokeStyle = rgba(K.col, 0.8); ctx.lineWidth = Math.max(1, K.r * 0.35); ctx.beginPath(); D.forEach((p, q) => q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    const stap = K.r * 2.04, nk = Math.max(2, Math.round(L / stap)); let q = 0;
    for (let j = 0; j <= nk; j++) { const d = j / nk * L; while (q < D.length - 2 && acc[q + 1] < d) q++; const f = (d - acc[q]) / Math.max(1e-6, acc[q + 1] - acc[q]); const px = lerp(D[q][0], D[q + 1][0], f), py = lerp(D[q][1], D[q + 1][1], f);
      const col = d >= L - K.vVan ? K.vcol : K.col; ctx.beginPath(); ctx.arc(px, py, K.r * 0.96, 0, 6.283); shape(ctx, col, _mixHex(col, '#FFFFFF', 0.35), Math.max(0.8, K.r * 0.1)); } }
  ctx.restore();
  // kapje in elke top: de variabele toppen van zware en lichte keten samen, met de pasvorm aan de buitenkant
  arm.forEach(A2 => { const c = o0 + La + w * 0.45; ctx.save(); ctx.translate(A2.ux * c + A2.nx * w * 0.5, A2.uy * c + A2.ny * w * 0.5); ctx.rotate(A2.an + Math.PI / 2);
    const bw = w * 1.3, hh = w * 1.35; ctx.beginPath(); ctx.moveTo(-bw, 0); _aybPas(ctx, k, pw * 0.7); ctx.lineTo(bw, 0); ctx.lineTo(bw, hh * 0.55); ctx.quadraticCurveTo(bw, hh, bw * 0.55, hh); ctx.lineTo(-bw * 0.55, hh); ctx.quadraticCurveTo(-bw, hh, -bw, hh * 0.55); ctx.closePath();
    shape(ctx, _AYB.varZ, _mixHex(_AYB.varZ, '#FFFFFF', 0.4), Math.max(1, w * 0.08)); ctx.restore(); });
  // zwavelbruggen
  if (zwavel) { ctx.strokeStyle = _AYB.zwavel; ctx.lineWidth = Math.max(1, 1.7 * s);
    for (const yy of [w * 1.1, w * 1.8]) { ctx.beginPath(); ctx.moveTo(-w * 0.35, yy); ctx.lineTo(w * 0.35, yy); ctx.stroke(); }
    arm.forEach(A2 => { const d = o0 + La * 0.2; ctx.beginPath(); ctx.moveTo(A2.ux * d + A2.nx * w * 0.2, A2.uy * d + A2.ny * w * 0.2); ctx.lineTo(A2.ux * d + A2.nx * w * 0.8, A2.uy * d + A2.ny * w * 0.8); ctx.stroke(); }); }
  // antigeen dat in de bindplaats zakt
  arm.forEach((A2, i) => { const b = clamp(bind[i] || 0, 0, 1); if (b <= 0.01) return; const c = o0 + La + w * 0.45;
    ctx.save(); ctx.translate(A2.ux * c + A2.nx * w * 0.5, A2.uy * c + A2.ny * w * 0.5); ctx.rotate(A2.an + Math.PI / 2); ctx.globalAlpha *= Math.min(1, b * 2); ctx.translate(0, -(1 - ease(b)) * 40 * s); _aybAg(ctx, k, pw * 0.68, agCol); ctx.restore(); });
  ctx.restore(); return ret;
}
