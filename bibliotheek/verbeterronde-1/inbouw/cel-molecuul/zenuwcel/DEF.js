// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// ZENUWCEL (neuron) — variant A 'met myeline en een impuls die springt' (27 okt 2026).
// Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die zich als een boom
// vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon vanuit een kegeltje
// (axonheuvel), lang en overal even dik, eindigt in vertakkingen met knopjes (synaps). Myeline (o.myeline):
// lipiderijke schede in worstjes rond het axon, met korte openingen (knopen van Ranvier, 'gap between two
// myelinated regions'); de impuls springt dan van knoop naar knoop (saltatoire geleiding). De impuls is een vlak
// gouden bandje op het axon (C1: geen gloed). Het axon golft maar licht.
// Bron: Kandel, Principles of Neural Science, fig. 2-1; OpenStax A&P 1e h. 12 (begrippen axon, axon hillock,
// myelin, node of Ranvier, saltatory conduction). Bekende fouten: ster met gelijke armen; axon dat dunner
// wordt; geen kern; impuls als gloeiende bol; myeline als doorlopende buis zonder knopen.
// Aanroep zoals voorheen: zenuwcel(ctx, x, y, {a, s, col, naar, seed, kernCol, t, axonDik, puls, pulsCol, takken}); nieuw: myeline.
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6, myeline = false } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 9 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    // myeline: worstjes (Schwann-cellen) met knopen van Ranvier ertussen; impuls springt van knoop naar knoop
    const D = bioDicht(pts, 200); const lenA = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); lenA.push(acc); });
    const at = (u) => { const tgt = u * acc; let j = lenA.findIndex(l => l >= tgt); j = Math.max(1, j); return D[j]; };
    const seg = 46 * s, knoop = 7 * s, nS = Math.max(1, Math.floor((acc - 30 * s) / (seg + knoop)));
    const knopen = []; if (myeline) { for (let k = 0; k < nS; k++) { const u0 = (20 * s + k * (seg + knoop)) / acc, u1 = (20 * s + k * (seg + knoop) + seg) / acc; if (u1 > 0.97) break; knopen.push((u1 * acc + knoop / 2) / acc);
        const S = []; for (let q = 0; q <= 10; q++) S.push(at(lerp(u0, u1, q / 10))); ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.55); ctx.lineWidth = axonDik * s * 2.8; ctx.beginPath(); S.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.8); ctx.lineWidth = axonDik * s * 2.8 - 3; ctx.stroke(); } }
    if (puls >= 0 && puls <= 1) { let u = puls; if (myeline && knopen.length) { const kk = Math.min(knopen.length - 1, Math.floor(puls * knopen.length)); u = knopen[kk]; }
      const L2 = (myeline ? knoop * 1.6 : 26 * s) / acc; ctx.strokeStyle = pulsCol; ctx.lineWidth = axonDik * s * (myeline ? 3.4 : 2.2); ctx.lineCap = 'butt'; ctx.beginPath(); for (let q = 0; q <= 6; q++) { const p = at(clamp(u - L2 / 2 + L2 * q / 6, 0, 1)); q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.lineCap = 'round'; }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
}

