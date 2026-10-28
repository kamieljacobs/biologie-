// =====================================================================================
// ANTISTOF (IgG) — variant A 'leerboek-Y' (verbeterronde 2, 28 okt 2026; Kamiel: 'het mag simpeler, nu is het
// erg druk'). Eenvoud zoals in leerboeken (OpenStax Microbiology fig. 'antibody structure'; Newcastle Univ.
// BMS-wiki 'Antibody'; Kaiser, Microbiology 13.1B): vier ketens als gladde, afgeronde banden, géén domeinen of kralen.
// Recept:
// - twee identieke zware ketens (lang, goud) lopen van de voet van de steel door het scharnier tot in de top van
//   elke arm; ze liggen aan de binnenkant van de Y. De steel (Fc) bestaat alleen uit de twee zware ketens.
// - twee identieke lichte ketens (kort, licht crème) liggen aan de buitenkant van elke arm (Fab), naast de zware keten.
// - de toppen van beide ketens zijn het variabele deel (teal: per antistof anders); samen vormen ze in elke top één
//   bindplaats met een pasvorm voor één stukje antigeen (epitoop). Twee gelijke bindplaatsen.
// - zwavelbruggen (korte witte streepjes) houden de ketens bij elkaar: tussen de zware ketens in het scharnier en
//   tussen zware en lichte keten. Het scharnier is buigzaam (armen ± 60–180° uit elkaar).
// - als B-celreceptor loopt de steel door in een kort staartje door het membraan.
// - verhouding: antistof ± 15 nm, virus ± 100 nm, bacterie ± 1000 nm (antistof dus heel klein).
// Kleur: zware keten goud, lichte keten crème (lichter: ook zonder kleur te onderscheiden), variabel deel teal,
// antigeen koraal. Bekende fouten: Y als drie streepjes; bindplaats aan de steel; lichte keten in de steel; antistof
// net zo groot als het virus; te veel detail (domeinen, kralen) op klein formaat.
// Aanroep: antistofY(ctx, x, y, s, o) — (x, y) = scharnier, s = 1 → ± 200 px hoog. o.a, o.ang (0 = armen omhoog),
// o.open (halve hoek tussen de armen, standaard 0.7), o.buig [l, r], o.k = pasvorm 0–3, o.bind [0..1, 0..1]
// (antigeen zakt in de bindplaats), o.agCol, o.op = 'vrij' | 'bcel', o.hl (gloed), o.t, o.zwavel (standaard aan
// boven ± 60 px hoogte). Geeft { tips, richt, voet, scharnier } terug (schermcoördinaten).
// =====================================================================================
const _AYA = { zwaar: '#D9A93A', licht: '#F3E3B8', varZ: '#4E9CC4', varL: '#9FD0E6', rand: '#1A2740', zwavel: '#FFFFFF', ag: '#E07A5F' };
function _ayaPas(ctx, k, w) { // pasvorm van de bindplaats, van links naar rechts, diepte naar binnen = +y
  if (k === 1) { ctx.lineTo(-w * 0.5, 0); ctx.arc(0, 0, w * 0.5, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.42, 0); ctx.lineTo(-w * 0.42, w * 0.5); ctx.lineTo(w * 0.42, w * 0.5); ctx.lineTo(w * 0.42, 0); }
  else if (k === 3) { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(-w * 0.2, w * 0.5); ctx.lineTo(0, w * 0.15); ctx.lineTo(w * 0.2, w * 0.5); ctx.lineTo(w * 0.5, 0); }
  else { ctx.lineTo(-w * 0.5, 0); ctx.lineTo(0, w * 0.6); ctx.lineTo(w * 0.5, 0); }
}
function _ayaAg(ctx, k, w, col) { // stukje antigeen: bult die precies in de pasvorm valt, aan een groter (afgesneden) molecuul
  ctx.beginPath(); ctx.moveTo(-w * 0.8, -w * 0.25);
  if (k === 1) { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.arc(0, 0, w * 0.47, Math.PI, 0, true); }
  else if (k === 2) { ctx.lineTo(-w * 0.4, -w * 0.02); ctx.lineTo(-w * 0.4, w * 0.48); ctx.lineTo(w * 0.4, w * 0.48); ctx.lineTo(w * 0.4, -w * 0.02); }
  else if (k === 3) { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.lineTo(-w * 0.2, w * 0.47); ctx.lineTo(0, w * 0.12); ctx.lineTo(w * 0.2, w * 0.47); ctx.lineTo(w * 0.47, -w * 0.02); }
  else { ctx.lineTo(-w * 0.47, -w * 0.02); ctx.lineTo(0, w * 0.57); ctx.lineTo(w * 0.47, -w * 0.02); }
  ctx.lineTo(w * 0.8, -w * 0.25); ctx.bezierCurveTo(w * 1.35, -w * 0.5, w * 1.15, -w * 1.5, 0, -w * 1.4); ctx.bezierCurveTo(-w * 1.15, -w * 1.5, -w * 1.35, -w * 0.5, -w * 0.8, -w * 0.25); ctx.closePath();
  shape(ctx, col, lighten(col, 0.3), Math.max(1, w * 0.06));
}
function _ayaBand(ctx, x0, y0, x1, y1, w, col, rand, lw) { // afgeronde band van (x0,y0) naar (x1,y1), breedte w
  const L = Math.hypot(x1 - x0, y1 - y0) || 1, an = Math.atan2(y1 - y0, x1 - x0);
  ctx.save(); ctx.translate(x0, y0); ctx.rotate(an); roundRect(ctx, -w / 2, -w / 2, L + w, w, w / 2); shape(ctx, col, rand, lw); ctx.restore();
}
function antistofY(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = 0, open = 0.7, buig = [0, 0], k = 0, bind = [0, 0], agCol = _AYA.ag, op = 'vrij', hl = 0, t = 0 } = o;
  const w = 15 * s, g = 0.5; // bandbreedte; kleine naad tussen de banden
  const La = 96 * s, Ls = 88 * s, o0 = 10 * s; // armlengte, steellengte, arm begint iets boven het scharnier
  const zwavel = o.zwavel ?? (s > 0.3);
  const ca = Math.cos(ang), sa = Math.sin(ang); const P = (px, py) => [x + px * ca - py * sa, y + px * sa + py * ca];
  const armAn = [-Math.PI / 2 - open - buig[0] + 0.025 * Math.sin(t * 1.3), -Math.PI / 2 + open + buig[1] + 0.025 * Math.sin(t * 1.1 + 1)];
  const tipOff = o0 + La + w * 0.5;
  const ret = { tips: armAn.map(an => P(Math.cos(an) * tipOff, Math.sin(an) * tipOff)), richt: armAn.map(an => an + ang), voet: P(0, Ls + (op === 'bcel' ? 26 * s : 0)), scharnier: [x, y] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, 1.6 * s), rand = _AYA.rand;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = w * 3.2; ctx.beginPath(); ctx.moveTo(0, Ls); ctx.lineTo(0, 0); armAn.forEach(an => { ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * (o0 + La), Math.sin(an) * (o0 + La)); }); ctx.stroke(); ctx.restore(); }
  // staartje door het membraan (B-celreceptor)
  if (op === 'bcel') { ctx.strokeStyle = _AYA.zwaar; ctx.lineWidth = Math.max(1.2, w * 0.3); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * w * 0.5, Ls); ctx.lineTo(sd * w * 0.3, Ls + 26 * s); ctx.stroke(); } }
  // de pasvormen uitsparen in de toppen (clip), zodat de achtergrond erdoor te zien is
  const pw = w * 1.85;
  const arm = armAn.map((an, i) => { const ux = Math.cos(an), uy = Math.sin(an), sd = i ? 1 : -1; return { an, ux, uy, nx: -uy * sd, ny: ux * sd }; }); // n = naar buiten
  ctx.save(); ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000);
  arm.forEach(A2 => { const c = o0 + La + w * 0.5; ctx.save(); ctx.translate(A2.ux * c + A2.nx * w * 0.5, A2.uy * c + A2.ny * w * 0.5); ctx.rotate(A2.an + Math.PI / 2); ctx.moveTo(-w * 1.3, -w * 3); ctx.lineTo(-w * 1.3, 0); _ayaPas(ctx, k, pw); ctx.lineTo(w * 1.3, 0); ctx.lineTo(w * 1.3, -w * 3); ctx.closePath(); ctx.restore(); });
  ctx.clip('evenodd');
  // zware ketens: steel (naast elkaar) → scharnier → binnenkant van de arm; variabel deel in de top
  arm.forEach((A2, i) => { const sd = i ? 1 : -1; const sx = sd * (w * 0.5 + g);
    const b0 = [A2.ux * o0 - A2.nx * 0 + sx * 0.2, A2.uy * o0], kn = [A2.ux * (o0 + La * 0.55), A2.uy * (o0 + La * 0.55)], top = [A2.ux * (o0 + La), A2.uy * (o0 + La)];
    _ayaBand(ctx, sx, Ls - w * 0.5, sx, w * 0.2, w, _AYA.zwaar, rand, lw); // steel
    ctx.strokeStyle = _AYA.zwaar; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(sx, w * 0.6); ctx.quadraticCurveTo(sx, -w * 0.2, b0[0], b0[1]); ctx.stroke(); // soepel scharnier
    _ayaBand(ctx, b0[0], b0[1], kn[0], kn[1], w, _AYA.zwaar, rand, lw);
    _ayaBand(ctx, kn[0], kn[1], top[0], top[1], w, _AYA.varZ, rand, lw); });
  // lichte ketens: buitenkant van elke arm, begint een stukje van het scharnier
  arm.forEach(A2 => { const off = w + g * 2; const l0 = o0 + La * 0.12, kn = o0 + La * 0.55, l1 = o0 + La;
    _ayaBand(ctx, A2.ux * l0 + A2.nx * off, A2.uy * l0 + A2.ny * off, A2.ux * kn + A2.nx * off, A2.uy * kn + A2.ny * off, w * 0.92, _AYA.licht, rand, lw);
    _ayaBand(ctx, A2.ux * kn + A2.nx * off, A2.uy * kn + A2.ny * off, A2.ux * l1 + A2.nx * off, A2.uy * l1 + A2.ny * off, w * 0.92, _AYA.varL, rand, lw); });
  ctx.restore();
  // zwavelbruggen
  if (zwavel) { ctx.strokeStyle = _AYA.zwavel; ctx.lineWidth = Math.max(1, 1.7 * s);
    for (const yy of [w * 1.1, w * 1.8]) { ctx.beginPath(); ctx.moveTo(-w * 0.35, yy); ctx.lineTo(w * 0.35, yy); ctx.stroke(); }
    arm.forEach(A2 => { const d = o0 + La * 0.2; ctx.beginPath(); ctx.moveTo(A2.ux * d + A2.nx * w * 0.2, A2.uy * d + A2.ny * w * 0.2); ctx.lineTo(A2.ux * d + A2.nx * w * 0.8, A2.uy * d + A2.ny * w * 0.8); ctx.stroke(); }); }
  // antigeen dat in de bindplaats zakt
  arm.forEach((A2, i) => { const b = clamp(bind[i] || 0, 0, 1); if (b <= 0.01) return; const c = o0 + La + w * 0.5;
    ctx.save(); ctx.translate(A2.ux * c + A2.nx * w * 0.5, A2.uy * c + A2.ny * w * 0.5); ctx.rotate(A2.an + Math.PI / 2); ctx.globalAlpha *= Math.min(1, b * 2); ctx.translate(0, -(1 - ease(b)) * 40 * s); _ayaAg(ctx, k, pw * 0.97, agCol); ctx.restore(); });
  ctx.restore(); return ret;
}
