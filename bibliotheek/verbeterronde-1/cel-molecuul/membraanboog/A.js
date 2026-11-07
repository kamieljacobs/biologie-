// MEMBRAAN — variant A 'vloeiend membraan met helixbundel-eiwitten en kanaal' (27 okt 2026).
// Recept (C9; OpenStax Biology 2e 5.1): dubbele laag fosfolipiden langs een boog (een cel is rond); kop (rond)
// + twee staarten ± 2× de kopdiameter, staarten naar binnen, in vetkleur. Membraan 5–10 nm dik. Vloeibaar
// mozaïek: de lipiden schuiven los langs elkaar (o.t: koppen wiebelen zijwaarts, de laag golft licht).
// Een transmembraaneiwit steekt aan beide kanten uit en is een bundel α-helices (staafjes) die de laag
// overspannen, geen kale capsule; een kanaaleiwit heeft een porie in het midden die open/dicht gaat.
// eiwitten: lijst hoeken (oud) of objecten {an, soort: 'eiwit'|'kanaal', open 0..1}.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten; eiwit als gladde pil; kanaal zonder porie.
// Aanroep zoals voorheen: membraanBoog(ctx, cx, cy, R, a0, a1, {a, s, kop, staart, eiwitten, eiwitCol}); nieuw: t, golf.
// Geeft terug: {eiwit: [[x, y, an], ...], punt(an)}.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, t = 0, golf = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o;
  const E = eiwitten.map(e => typeof e === 'number' ? { an: e, soort: 'eiwit', open: 0 } : Object.assign({ soort: 'eiwit', open: 0 }, e));
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const Rg = an => R + golf * Math.sin(an * R / (60 * s) + t * 0.9) * kr * 0.5;           // lichte golving langs de boog
  const ret = { eiwit: E.map(e => [cx + Math.cos(e.an) * Rg(e.an), cy + Math.sin(e.an) * Rg(e.an), e.an]), punt: an => [cx + Math.cos(an) * Rg(an), cy + Math.sin(an) * Rg(an)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const blad = (buiten) => { for (let i = 0; i <= n; i++) { let an = lerp(a0, a1, i / n); an += (Math.sin(t * 1.3 + i * 2.7 + (buiten ? 0 : 5)) * 0.25 * kr) / R * golf; // koppen schuiven
      if (E.some(e => Math.abs(an - e.an) * R < kr * (e.soort === "kanaal" ? 6.5 : 5))) continue; const Rk = Rg(an) + (buiten ? 1 : -1) * (sl + gap);
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = buiten ? -1 : 1; const tx = -uy, ty = ux; const kw = Math.sin(t * 2 + i) * 0.15 * golf;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * (sd * 0.6 + kw) * kr, hy + uy * d * sl * 0.5 + ty * (sd * 0.6 + kw) * kr, hx + ux * d * sl + tx * (sd * 0.35 + kw) * kr, hy + uy * d * sl + ty * (sd * 0.35 + kw) * kr); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, _mixHex(kop, '#FFFFFF', 0.3), 1); } };
  blad(true); blad(false);
  // eiwitten: bundel helices die de laag overspannen; kanaal = twee helften met porie
  E.forEach(e => { const p = ret.punt(e.an); ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(e.an + Math.PI / 2); // lokaal: x langs de laag, y loodrecht (−y = buiten)
    const H = sl * 2 + kr * 2 + gap * 2 + kr * 2.4, hw = kr * 1.7; const licht = _mixHex(eiwitCol, '#FFFFFF', 0.3), donker = _mixHex(eiwitCol, '#1A2740', 0.3);
    const staaf = (x0, h, sch) => { ctx.save(); ctx.translate(x0, 0); ctx.rotate(sch); roundRect(ctx, -hw / 2, -h / 2, hw, h, hw / 2); shape(ctx, eiwitCol, licht, 1.2); ctx.strokeStyle = rgba(donker, 0.6); ctx.lineWidth = 1; for (let q = -h / 2 + hw * 0.6; q < h / 2 - hw * 0.4; q += hw * 0.55) { ctx.beginPath(); ctx.moveTo(-hw / 2 + 1, q); ctx.lineTo(hw / 2 - 1, q + hw * 0.3); ctx.stroke(); } ctx.restore(); };
    if (e.soort === 'kanaal') { const op = clamp(e.open, 0, 1); const sp = kr * (0.25 + 1.2 * op);
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * sp, 0); staaf(sd * hw * 0.55, H * 0.92, sd * 0.06 * (1 - op)); staaf(sd * hw * 1.65, H * 0.8, -sd * 0.08); ctx.beginPath(); ctx.ellipse(sd * hw * 1.1, -H * 0.5, hw * 1.2, hw * 0.55, 0, 0, 6.283); shape(ctx, donker, licht, 1); ctx.restore(); }
      if (op > 0.05) { ctx.save(); ctx.globalAlpha *= op; for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(0, -H * 0.3 + q * H * 0.3 + Math.sin(t * 3 + q) * kr * 0.3, kr * 0.35, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); } ctx.restore(); } }
    else { for (let k = 0; k < 4; k++) staaf((k - 1.5) * hw * 1.05, H * (0.86 + 0.08 * Math.sin(k * 2.1)), (k % 2 ? 1 : -1) * 0.12);
      ctx.beginPath(); ctx.ellipse(0, -H * 0.5, hw * 2.3, hw * 0.75, 0, 0, 6.283); shape(ctx, donker, licht, 1); ctx.beginPath(); ctx.ellipse(hw * 0.4, H * 0.48, hw * 1.6, hw * 0.6, 0, 0, 6.283); shape(ctx, donker, licht, 1); }
    ctx.restore(); });
  ctx.restore(); return ret;
}
