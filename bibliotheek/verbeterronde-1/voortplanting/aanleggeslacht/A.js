// Variant A (27 okt 2026): sinus urogenitalis kleiner en in weefselkleur (geen grijze sokkel); buizen houden bij
// kleine schaal een minimale lijndikte (± 2,6 px), zodat het als miniatuur in een tijdlijn leesbaar blijft.
// =====================================================================================
// AANLEG GESLACHTSORGANEN (inwendig), embryo week 6–7, ongedifferentieerd stadium, vooraanzicht, symmetrisch.
// Recept (Sadler, Langman's Medical Embryology h. 16, fig. 16.24–16.32; Moore, The Developing Human h. 12):
// - Gonade = genitale lijst: langgerekte richel mediaal van de oernier (mesonephros), lengte ± 3–4× de breedte,
//   hoog in de buik (ter hoogte van de onderste borst-/bovenste lendenwervels). Hier 44 × 140 px.
// - Wolff-buis (ductus mesonephricus) loopt lateraal in de oernier omlaag en mondt uit in de sinus urogenitalis.
// - Müller-buis (ductus paramesonephricus) ontstaat als instulping van het coeloomepitheel LATERAAL van de
//   Wolff-buis, opent boven met een trechter in de buikholte, loopt omlaag, kruist dan VENTRAAL (vóór) de Wolff-buis
//   naar mediaal; beide Müller-buizen versmelten in de middellijn (uterovaginaal kanaal) en raken de achterwand van
//   de sinus (Müller-heuveltje) tussen de twee Wolff-uitmondingen.
// - Man (SRY → testis, AMH, testosteron): testis ronder (± 4 × 3 cm volwassen, verhouding 1,3 : 1), zakt iets;
//   bovenste oerniertubuli + Wolff-buis → ductuli efferentes + bijbal (sterk gekronkelde buis tegen de laterale/
//   achterkant van de testis, kop boven, staart onder); rest van de Wolff-buis → zaadleider (dikke spierwand);
//   zaadblaasje = knop uit de zaadleider vlak boven de sinus (week 10); Müller-buizen verdwijnen door AMH.
// - Vrouw (geen AMH, geen testosteron): eierstok amandelvormig (± 3 × 1,5 cm volwassen, 2 : 1) met follikels;
//   bovenste Müller-deel → eileider met trechter en fimbriae; versmolten onderste deel → baarmoeder + bovenste deel
//   vagina (peervorm in de middellijn, fundus boven); Wolff-buizen verdwijnen (resten: Gartner).
// Ontwerpcoördinaten: ± 360 × 440, oorsprong in het midden; sinus onderaan in het midden.
// Bekende fouten: gonaden onderaan naast de sinus; Müller-buis mediaal van de Wolff-buis over de hele lengte;
// Müller-buizen die gescheiden in de sinus uitkomen; bijbal als losse bol; baarmoeder als driehoek los van de buizen;
// beide buizenparen tegelijk volgroeid laten (in elk geslacht verdwijnt er één).
// =====================================================================================
function aanlegGeslacht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, man = 0, vrouw = 0, hlWolff = 0, hlMuller = 0, hlGonade = 0 } = o;
  const m = ease(clamp(man, 0, 1)), v = ease(clamp(vrouw, 0, 1));
  const P = (px, py) => [x + px * s, y + py * s];
  const mix3 = (i, mm, ff) => i + (mm - i) * m + (ff - i) * v;
  const mixPts = (I, Mm, F) => I.map((p, k) => [mix3(p[0], Mm[k][0], F[k][0]), mix3(p[1], Mm[k][1], F[k][1])]);
  const COL_W = (C.purple || '#8C7BBF'), COL_M = '#D9868A', COL_G = '#C98A6A', COL_S = '#C9A08E'; // sinus in weefselkleur
  const minLw = lw => Math.max(lw, 2.6 / s); // klein (miniatuur in een tijdlijn): buizen houden ± 2,6 px
  // gonade
  const g = { cx: mix3(82, 80, 88), cy: mix3(-112, -62, -100), rx: mix3(22, 38, 24), ry: mix3(70, 50, 50), rot: mix3(0.06, 0.1, 0.32) };
  const gM = { cx: 80, cy: -62, rx: 38, ry: 50, rot: 0.1 }; // eindstand testis (voor de bijbal)
  const opT = (G, th, dr = 0) => { const lx = Math.cos(th) * (G.rx + dr), ly = Math.sin(th) * (G.ry + dr * 0.8); const c = Math.cos(G.rot), sn = Math.sin(G.rot); return [G.cx + lx * c - ly * sn, G.cy + lx * sn + ly * c]; };
  // Wolff (rechts): ongedifferentieerd / man (bijbal + zaadleider) / vrouw (= ongedifferentieerd, verdwijnt)
  const W_I = [[124, -206], [132, -150], [134, -80], [132, -10], [124, 50], [100, 105], [60, 150], [26, 184], [16, 202]];
  const W_M = [opT(gM, -1.2, 8), opT(gM, -0.6, 9), opT(gM, 0, 9), opT(gM, 0.9, 8), [124, 40], [106, 100], [62, 148], [26, 184], [16, 202]];
  const wolff = mixPts(W_I, W_M, W_I);
  // Müller (rechts): trechter boven lateraal, kruist ventraal naar mediaal
  const M_I = [[162, -202], [164, -140], [162, -70], [156, 0], [144, 55], [112, 96], [66, 132], [24, 156], [6, 166]];
  const M_F = [[116, -160], [148, -164], [170, -128], [174, -62], [156, 0], [122, 34], [88, 46], [62, 52], [44, 52]]; // eileider boogt over de eierstok
  const muller = mixPts(M_I, M_I, M_F);
  // middellijn: versmolten Müller-deel (rechterhelft) → peervormige baarmoeder + bovenste vagina
  const U_I = [[0, 156], [6, 157], [9, 161], [9, 168], [9, 175], [9, 182], [9, 188], [9, 195], [9, 202]];
  const U_F = [[0, 24], [32, 28], [52, 46], [55, 82], [44, 118], [26, 142], [18, 158], [16, 180], [16, 202]];
  const uterus = mixPts(U_I, U_I, U_F);
  const ret = { gonade: P(g.cx, g.cy), wolff: (() => { const q = bioPunt(bioDicht(wolff, 12), 0.5); return P(q[0], q[1]); })(),
    muller: (() => { const q = bioPunt(bioDicht(muller, 12), 0.5); return P(q[0], q[1]); })(), sinus: P(0, 214) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const both = (fn) => { fn(1); ctx.save(); ctx.scale(-1, 1); fn(-1); ctx.restore(); };
  const lijn = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = minLw(lw); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const buisVul = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = minLw(lw); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const rand = (pts, col, lw, al) => { ctx.strokeStyle = lighten(col, 0.4); ctx.globalAlpha *= al; ctx.lineWidth = minLw(lw) + Math.max(2.4, 1.6 / s); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.globalAlpha /= al; };

  // sinus urogenitalis (onder, midden)
  ctx.beginPath(); bioPad(ctx, [[-36, 210], [-26, 198], [0, 195], [26, 198], [36, 210], [26, 224], [0, 228], [-26, 224]], true); shape(ctx, rgba(COL_S, 0.6), lighten(COL_S, 0.3), Math.max(1.5, 1.2 / s));
  // oernier (mesonephros): vaag, verdwijnt in beide richtingen grotendeels
  const meso = 1 - 0.85 * Math.max(m, v);
  both(() => { ctx.beginPath(); ctx.ellipse(128, -98, 30, 104, 0.02, 0, 6.283); shape(ctx, rgba('#B9A6C9', 0.14 * meso), rgba('#B9A6C9', 0.3 * meso), 1.5);
    ctx.strokeStyle = rgba('#B9A6C9', 0.35 * meso); ctx.lineWidth = 2; // oerniertubuli
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 26; ctx.beginPath(); ctx.moveTo(131, yy); ctx.bezierCurveTo(118, yy - 6, 122, yy + 10, 108, yy + 6); ctx.stroke(); } });

  // gonaden
  both(() => {
    const p = Math.max(0.6, 1 + 0.7 * v); // amandel: puntiger uiteinden
    const omtrek = []; for (let k = 0; k < 40; k++) { const th = k / 40 * 6.283; const cx = Math.cos(th), sy = Math.sin(th);
      const lx = Math.sign(cx) * Math.pow(Math.abs(cx), p) * g.rx, ly = sy * g.ry; const c = Math.cos(g.rot), sn = Math.sin(g.rot); omtrek.push([g.cx + lx * c - ly * sn, g.cy + lx * sn + ly * c]); }
    if (hlGonade > 0.01) { ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.strokeStyle = rgba('#E8C2AE', 0.28 * hlGonade); ctx.lineWidth = 16; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(COL_G, 0.85), lighten(COL_G, 0.3), 2 + 1.5 * m);
    // testis: zaadstrengen (kronkelende strengen naar het rete aan de achter-bovenkant)
    if (m > 0.02) { ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip(); ctx.strokeStyle = rgba('#8E5A44', 0.55 * m); ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) { const th = 1.9 + k * 0.42; const A = opT(g, th, -4), B = opT(g, -0.9, -g.rx * 0.6); ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        ctx.bezierCurveTo(lerp(A[0], B[0], 0.3) + 6, lerp(A[1], B[1], 0.3) - 6, lerp(A[0], B[0], 0.7) - 6, lerp(A[1], B[1], 0.7) + 6, B[0], B[1]); ctx.stroke(); }
      ctx.restore(); }
    // eierstok: follikels (stipjes in de schors)
    if (v > 0.02) { for (let k = 0; k < 13; k++) { const th = hash(k * 7 + 1) * 6.283, rr = lerp(0.45, 0.78, hash(k * 7 + 2)); const q = [Math.cos(th) * g.rx * rr, Math.sin(th) * g.ry * rr];
        const c = Math.cos(g.rot), sn = Math.sin(g.rot); const fx = g.cx + q[0] * c - q[1] * sn, fy = g.cy + q[0] * sn + q[1] * c; const fr = 2.2 + 2.4 * hash(k * 7 + 3);
        ctx.beginPath(); ctx.arc(fx, fy, fr * v, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.8 * v), rgba('#E2B88E', 0.9 * v), 1); } }
  });

  // Wolff-buizen (achter de Müller-buizen)
  const wAl = 1 - 0.85 * v, wLw = 5 + 2.5 * m - 2.5 * v;
  both(() => {
    if (hlWolff > 0.01) lijn(wolff, '#BBAFE0', wLw + 14, 0.28 * hlWolff * wAl);
    rand(wolff, COL_W, wLw, wAl); buisVul(wolff, COL_W, wLw, wAl);
    if (m > 0.02) { // bijbal: band + kronkelende buis tegen de laterale kant van de testis
      const B = [], K = []; for (let i = 0; i <= 60; i++) { const th = lerp(-1.25, 0.95, i / 60); const p0 = opT(g, th, 8), p1 = opT(g, th, 9 + 5.5 * Math.sin(i * 1.9)); B.push(p0); K.push(p1); }
      ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = lighten(COL_W, 0.4); ctx.lineWidth = 17; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba(COL_W, 1); ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba('#5E4E8C', 0.9); ctx.lineWidth = 2; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // ductuli efferentes van testis naar bijbalkop
      ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { const th = -1.15 + k * 0.17; const A = opT(g, th, -6), Bq = opT(g, th, 4); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bq[0], Bq[1]); ctx.stroke(); }
      // zaadblaasje: knop uit de zaadleider vlak boven de sinus
      const q = bioPunt(bioDicht(wolff, 12), 0.88); ctx.translate(q[0], q[1]); ctx.rotate(q[2] + 2.2); const sz = m;
      ctx.beginPath(); bioPad(ctx, [[0, -4 * sz], [10 * sz, -7 * sz], [20 * sz, -4 * sz], [26 * sz, 0], [20 * sz, 5 * sz], [10 * sz, 7 * sz], [0, 4 * sz]], true); shape(ctx, rgba('#A797D4', 0.95), lighten(COL_W, 0.45), 1.5);
      ctx.restore(); }
  });

  // Müller-buizen (vóór de Wolff-buizen) + trechter/fimbriae + baarmoeder
  const mAl = 1 - 0.9 * m, mLw = 5 - 2.6 * m + 1.2 * v;
  ctx.save(); ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  both(() => {
    if (hlMuller > 0.01) lijn(muller, '#F0B8BA', mLw + 14, 0.28 * hlMuller * mAl);
    rand(muller, COL_M, mLw, mAl); buisVul(muller, COL_M, mLw, mAl);
  });
  ctx.restore();
  both((sd) => { // trechter met (bij de vrouw) fimbriae
    const p0 = muller[0], p1 = muller[1]; let ex = p0[0] - p1[0], ey = p0[1] - p1[1]; const d = Math.hypot(ex, ey); ex /= d; ey /= d;
    if (v > 0.02) { const an = Math.atan2(ey, ex) + 0.6; ex = lerp(ex, Math.cos(an), v); ey = lerp(ey, Math.sin(an), v); const dd = Math.hypot(ex, ey); ex /= dd; ey /= dd; } // trechter naar de eierstok
    const qx = -ey, qy = ex; const rw = 8 + 6 * v, bw = mLw / 2;
    ctx.save(); ctx.globalAlpha *= mAl;
    const bx = p0[0] - ex * 12, by = p0[1] - ey * 12, rx0 = p0[0] + ex * 4, ry0 = p0[1] + ey * 4;
    // fimbriae (vingers rond de rand, wiegen zacht)
    if (v > 0.02) { const nf = 9; for (let k = 0; k < nf; k++) { const f = k / (nf - 1) - 0.5; const sx = rx0 + qx * rw * f * 2, sy = ry0 + qy * rw * f * 2;
        const an = Math.atan2(ey, ex) + f * 2.4 + 0.12 * Math.sin(t * 1.3 + k * 0.9) * sd; const len = (11 + 7 * hash(k + 11)) * v;
        const mx = sx + Math.cos(an) * len * 0.55 + Math.cos(an + 1.57) * 2, my = sy + Math.sin(an) * len * 0.55 + Math.sin(an + 1.57) * 2;
        for (const [col, lw] of [[lighten(COL_M, 0.4), 5.4], [COL_M, 3.2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, sx + Math.cos(an) * len, sy + Math.sin(an) * len); ctx.stroke(); } } }
    ctx.beginPath(); ctx.moveTo(bx + qx * bw, by + qy * bw); ctx.quadraticCurveTo(p0[0] + qx * bw * 1.2, p0[1] + qy * bw * 1.2, rx0 + qx * rw, ry0 + qy * rw);
    ctx.lineTo(rx0 - qx * rw, ry0 - qy * rw); ctx.quadraticCurveTo(p0[0] - qx * bw * 1.2, p0[1] - qy * bw * 1.2, bx - qx * bw, by - qy * bw); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 1.5);
    ctx.beginPath(); ctx.ellipse(rx0, ry0, rw * 0.85, 3, Math.atan2(qy, qx), 0, 6.283); ctx.fillStyle = rgba('#5A2E36', 0.7); ctx.fill(); // opening naar de buikholte
    ctx.restore();
  });
  // versmolten middendeel: uterovaginaal kanaal → baarmoeder (peer) + bovenste vagina
  const UO = uterus.concat(uterus.slice(1).reverse().map(p => [-p[0], p[1]])).slice(0, -1);
  const full = uterus.slice().reverse().map(p => [-p[0], p[1]]).concat(uterus.slice(1));
  ctx.save(); ctx.globalAlpha *= mAl; ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  if (hlMuller > 0.01) { ctx.beginPath(); bioPad(ctx, full, false); ctx.strokeStyle = rgba('#F0B8BA', 0.28 * hlMuller); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, full, false); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 2);
  ctx.setLineDash([]);
  if (v > 0.02) { // baarmoederholte (driehoek) + baarmoederhalskanaal
    ctx.beginPath(); bioPad(ctx, [[0, lerp(150, 44, v)], [lerp(4, 30, v), lerp(152, 46, v)], [lerp(3, 10, v), lerp(160, 104, v)], [0, lerp(165, 130, v)], [lerp(-3, -10, v), lerp(160, 104, v)], [lerp(-4, -30, v), lerp(152, 46, v)]], true);
    ctx.fillStyle = rgba('#7A3A44', 0.55 * v); ctx.fill();
    ctx.strokeStyle = rgba('#7A3A44', 0.55 * v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, lerp(165, 128, v)); ctx.lineTo(0, 200); ctx.stroke(); }
  else { ctx.strokeStyle = rgba('#7A3A44', 0.45); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(0, 200); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}
