// MEMBRAAN — variant A, verbeterronde 2 eiwitten (28 okt 2026): de eiwitten in het membraan als kralenketen. Zelfde
// fosfolipiden, boog, golving, plaats en grootte van de eiwitten en zelfde aanroep als variant A; alleen de staafjes met
// streepjes en de vlakke kapjes zijn vervangen door één doorlopende kralenketen: elke α-helix is een kolom kralen in een
// golf (3,6 per winding, voor licht, achter donker), verbonden door korte lussen buiten en binnen.
// Recept (C9; OpenStax Biology 2e 5.1): dubbele laag fosfolipiden langs een boog (een cel is rond); kop (rond)
// + twee staarten ± 2× de kopdiameter, staarten naar binnen, in vetkleur. Membraan 5–10 nm dik. Vloeibaar
// mozaïek: de lipiden schuiven los langs elkaar (o.t: koppen wiebelen zijwaarts, de laag golft licht).
// Een transmembraaneiwit is één keten die de laag een paar keer oversteekt: elke oversteek is een α-helix (± 20
// aminozuren), lussen steken aan beide kanten uit. Een kanaaleiwit heeft een porie in het midden die open/dicht gaat.
// eiwitten: lijst hoeken (oud) of objecten {an, soort: 'eiwit'|'kanaal', open 0..1}.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten; eiwit als gladde pil of lint; kanaal zonder porie.
// Aanroep zoals voorheen: membraanBoog(ctx, cx, cy, R, a0, a1, {a, s, kop, staart, eiwitten, eiwitCol, t, golf}).
// Geeft terug: {eiwit: [[x, y, an], ...], punt(an)}. Vereist _kkHelix/_kkPad (eiwitten/_hulp.js).
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
    // α-helix als kralen (verbeterronde 2): van boven (−y, buiten) naar onder of omgekeerd; ends = [boven, onder] in lokale maat
    const kb = Math.max(hw * 0.34, 2.2), kst = hw < 12 ? 1.6 : 0.95, helix = (x0, h, sch, omlaag, fase) => { const c2 = Math.cos(sch), s2 = Math.sin(sch), P = (yy) => [x0 - yy * s2, yy * c2];
      const A = P(-h / 2), B = P(h / 2); _kkHelix(ctx, omlaag ? A : B, omlaag ? B : A, kb, eiwitCol, { fase, amp: 0.55, stap: kst }); return [A, B]; };
    const lus = (p, q, buiten) => { const m = [(p[0] + q[0]) / 2, (buiten ? Math.min(p[1], q[1]) : Math.max(p[1], q[1])) + (buiten ? -1 : 1) * hw * 0.9]; _kkPad(ctx, [p, m, q], kb, eiwitCol, { stap: 2.1 }); };
    if (e.soort === 'kanaal') { const op = clamp(e.open, 0, 1); const sp = kr * (0.25 + 1.2 * op);
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * sp, 0);
        const h1 = helix(sd * hw * 0.55, H * 0.92, sd * 0.06 * (1 - op), true, 0), h2 = helix(sd * hw * 1.65, H * 0.8, -sd * 0.08, false, 2);
        lus(h1[1], h2[1], false); lus(h2[0], [h2[0][0] + sd * hw * 1.2, h2[0][1] - hw * 0.6], true); _kkPad(ctx, [[h1[0][0] - sd * hw * 0.5, h1[0][1] - hw * 1.1], h1[0]], kb, eiwitCol, { stap: 2.1 }); ctx.restore(); }
      if (op > 0.05) { ctx.save(); ctx.globalAlpha *= op; for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(0, -H * 0.3 + q * H * 0.3 + Math.sin(t * 3 + q) * kr * 0.3, kr * 0.35, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); } ctx.restore(); } }
    else { const E4 = []; for (let k = 0; k < 4; k++) E4.push(helix((k - 1.5) * hw * 1.05, H * (0.86 + 0.08 * Math.sin(k * 2.1)), (k % 2 ? 1 : -1) * 0.12, k % 2 === 0, k * 1.3));
      for (let k = 0; k < 3; k++) lus(k % 2 === 0 ? E4[k][1] : E4[k][0], k % 2 === 0 ? E4[k + 1][1] : E4[k + 1][0], k % 2 === 1);
      _kkPad(ctx, [[E4[0][0][0] - hw * 0.9, E4[0][0][1] - hw * 1.2], [E4[0][0][0] - hw * 0.2, E4[0][0][1] - hw * 0.9], E4[0][0]], kb, eiwitCol, { stap: 2.1 }); // N-staart buiten
      _kkPad(ctx, [E4[3][0], [E4[3][0][0] + hw * 0.5, E4[3][0][1] - hw * 1.0], [E4[3][0][0] + hw * 1.3, E4[3][0][1] - hw * 0.9]], kb, eiwitCol, { stap: 2.1 }); }
    ctx.restore(); });
  ctx.restore(); return ret;
}
