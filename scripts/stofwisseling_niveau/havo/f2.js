/* havo.js — havo-kaarten bij de nieuwe havo-alinea's (18 okt 2026). Getekend door de speler (NV.over) over het
   gedimde beeld, alleen in de havo-stand. lt = tijd sinds het begin van de havo-alinea; W('woord') = begin van dat
   woord in de havo-alinea; S(n, 'woord') = begin van een woord uit basiszin n (voor kaarten die blijven staan). */
window.HAVO = (function () {
  'use strict';
  const E = window.ENG, C = E.C, D = window.D2, P = window.P2, CM = window.COMMON;
  const KX = 230, KY = 130, KW = 1460, KH = 720;
  const vis = (lt, t0) => E.ep(lt, t0 - 0.15, 0.45);
  function kaart(g, a, titel) {
    CM.card(g, KX, KY, KW, KH, { alpha: a });
    g.text('IN HET KORT', KX + 60, KY + 74, { size: 28, f: 'mono', w: 500, color: C.grain, ls: 4, alpha: a });
    D.rich(g, titel, KX + 60, KY + 150, { size: 64, f: 'serif', color: C.ink, alpha: a });
  }
  function regel(g, s, y, a, o = {}) { D.rich(g, s, o.x || KX + 60, y, { size: o.size || 42, w: o.w || 500, color: o.color || C.ink, alpha: a }); }
  function hdots(g, x, y, n, a, sp = 26) { for (let k = 0; k < n; k++) { g.screen(); D.mol(g, 'h', x + k * sp, y, 0, { s: 1.6, alpha: a }); } }

  return {
    /* H3 Gisting: zonder zuurstof gaat de glycolyse door; pyrodruivenzuur → melkzuur (0 ATP); netto 2 ATP per glucose */
    '3:3h'(g, lt, { a, W }) {
      kaart(g, a, 'Zonder zuurstof');
      g.pill('zonder zuurstof', KX + KW - 60, KY + 90, { align: 'right', size: 38, alpha: a * vis(lt, W('zuurstof')), fill: '#4A3F22' });
      const a1 = a * vis(lt, W('glycolyse')), a2 = a * vis(lt, W('melkzuur')), a3 = a * vis(lt, W('stap')), a4 = a * vis(lt, W('netto'));
      const y = KY + 380;
      const e1 = P.eq(g, [{ m: 'glc', s: 1.8 }, 'glucose', '>', { m: 'pyr', s: 1.9 }, '2 pyrodruivenzuur'], KX + 90, y, { size: 46, gap: 16, arrow: 130, alpha: a1 });
      g.text('glycolyse', e1.pos[2], y - 70, { size: 38, w: 600, align: 'center', color: C.ink2, alpha: a1 });
      const e2 = P.eq(g, ['>', { m: 'lac', s: 1.9 }, '2 melkzuur'], e1.x1 + 20, y, { size: 46, gap: 16, arrow: 130, alpha: a2 });
      g.text('enzym', e2.pos[0], y - 70, { size: 38, w: 600, align: 'center', color: C.ink2, alpha: a2 });
      g.text('geen ATP', e2.pos[0], y + 70, { size: 38, align: 'center', color: C.muted, alpha: a3 });
      if (a4 > 0.01) { P.tag(g, 'netto 2 ATP per glucose', e1.pos[2], y + 90, { align: 'center', size: 44, w: 600, color: C.atpInk, icon: 'atp', alpha: a4 }); }
      regel(g, 'Melkzuur maken levert zelf niets op, maar zo kan de glycolyse doorgaan.', KY + KH - 70, a4, { size: 36, color: C.ink2 });
    },

    /* H4: in de matrix wordt pyrodruivenzuur verder afgebroken; CO₂ komt vrij; H-atomen naar het binnenmembraan.
       Blijft staan tot het eind van H4 (alle zes C in CO₂; via bloed naar de longen). */
    '4:4h'(g, lt, { a, W, S }) {
      kaart(g, a, 'In de matrix');
      const cx = KX + 400, cy = KY + 420;
      P.mito(g, cx, cy, 300, 175, { alpha: a, hl: { matrix: lt > W('matrix') - 0.2 && lt < W('Daarbij') } });
      g.text('matrix', cx, cy + 12, { size: 40, w: 600, align: 'center', color: C.ink, alpha: a * vis(lt, W('matrix')), halo: 8, haloColor: '#5A4E36' });
      // pyrodruivenzuur gaat erin en valt uiteen
      const tIn = W('pyrodruivenzuur'), tBr = W('stap'), tCo = W('komt'), tH = W('H-atomen');
      const pin = E.ep(lt, tIn - 0.2, 1.0), br = E.ep(lt, tBr, 1.2);
      if (br < 0.98) { g.screen(); D.mol(g, 'pyr', E.lerp(cx - 420, cx - 80, pin), cy - 60, 0, { s: 2.0, alpha: a * E.c01((lt - tIn + 0.4) / 0.3) * (1 - br) }); }
      // CO₂ vliegt naar buiten
      for (let k = 0; k < 3; k++) { const p = E.ep(lt, tCo + k * 0.25, 1.4); if (p > 0.01) { g.screen(); D.mol(g, 'co2', E.lerp(cx - 60 + k * 50, cx - 140 + k * 120, p), E.lerp(cy - 40, cy - 150, p), k, { s: 1.8, alpha: a }); } }
      // H-atomen naar het binnenmembraan (onderrand)
      const ph = E.ep(lt, tH, 1.3);
      if (lt > tH - 0.3) for (let k = 0; k < 4; k++) { g.screen(); D.mol(g, 'h', E.lerp(cx - 40 + k * 26, cx - 150 + k * 90, ph), E.lerp(cy + 10, cy + 128, ph), 0, { s: 1.7, alpha: a * E.c01((lt - tH + 0.3) / 0.3) }); }
      const xR = KX + 770;
      regel(g, 'pyrodruivenzuur wordt stap voor', KY + 290, a * vis(lt, tBr), { x: xR });
      regel(g, 'stap verder afgebroken', KY + 345, a * vis(lt, tBr), { x: xR });
      const aC = a * vis(lt, tCo); if (aC > 0.01) { g.screen(); D.mol(g, 'co2', xR + 26, KY + 425, 0, { s: 1.6, alpha: aC }); regel(g, 'CO₂ komt vrij', KY + 440, aC, { x: xR + 70 }); }
      const aH = a * vis(lt, tH); if (aH > 0.01) { hdots(g, xR + 14, KY + 515, 3, aH, 22); regel(g, 'H-atomen → binnenmembraan', KY + 530, aH, { x: xR + 90 }); }
      // na de havo-alinea (basiszinnen 17 en 18)
      const a6 = a * vis(lt, S(17, 'zes')); if (a6 > 0.01) regel(g, 'alle 6 C-atomen van glucose → CO₂', KY + 625, a6, { x: xR, w: 600 });
      const aL = a * vis(lt, S(18, 'bloed')); if (aL > 0.01) regel(g, 'CO₂ → bloed → longen → uitademen', KY + 680, aL, { x: xR, size: 38, color: C.ink2 });
    },

    /* H6 begin: in het binnenmembraan komt de energie uit de H-atomen vrij → veel ATP; aan het eind is O₂ nodig */
    '6:6h'(g, lt, { a, W }) {
      kaart(g, a, 'In het binnenmembraan');
      const y0 = KY + 300, xI = KX + 90;
      const a1 = a * vis(lt, W('H-atomen')), a2 = a * vis(lt, W('ATP')), a3 = a * vis(lt, W('zuurstof'));
      hdots(g, xI + 10, y0 - 12, 4, a1, 26); regel(g, 'H-atomen uit de afbraak van glucose', y0, a1, { x: xI + 130 });
      g.arrow(xI + 50, y0 + 30, xI + 50, y0 + 110, { lw: 4, head: 16, color: C.ink2, alpha: a1 });
      regel(g, 'de energie komt vrij in het binnenmembraan', y0 + 150, a1, { x: xI + 130, color: C.ink2 });
      if (a2 > 0.01) { g.screen(); D.mol(g, 'atp', xI + 50, y0 + 238, 0, { s: 1.9, alpha: a2 }); regel(g, 'daarmee maakt het mitochondrium heel veel ATP', y0 + 250, a2, { x: xI + 130 }); }
      if (a3 > 0.01) { g.screen(); D.mol(g, 'o2', xI + 50, y0 + 338, 0, { s: 2.0, alpha: a3 }); regel(g, 'aan het eind is zuurstof (O₂) nodig', y0 + 350, a3, { x: xI + 130 }); }
    },

    /* H6 na het antwoord: zuurstof neemt de H-atomen op → water. Blijft staan t/m basiszin 6 (C in CO₂ komt uit glucose). */
    '6:6i'(g, lt, { a, W, S }) {
      kaart(g, a, 'Zuurstof wordt water');
      const y = KY + 330;
      const a1 = a * vis(lt, W('Zuurstof')), a2 = a * vis(lt, W('H-atomen')), a3 = a * vis(lt, W('water'));
      const e = P.eq(g, [{ m: 'o2', s: 2.0 }, 'O₂', '+', { m: 'h', s: 2.2 }, 'H-atomen', '>', { m: 'h2o', s: 2.2 }, 'water'], KX + 100, y, { size: 48, gap: 18, arrow: 130, alphas: [a1, a1, a2, a2, a2, a3, a3, a3].map((x) => (a > 0 ? x / a : 0)), alpha: a });
      const a4 = a * vis(lt, S(5, 'wordt')); if (a4 > 0.01) regel(g, 'De zuurstof die je cellen gebruiken, wordt water.', y + 140, a4);
      const a5 = a * vis(lt, S(6, 'C-atomen'));
      if (a5 > 0.01) { const e2 = P.eq(g, [{ m: 'glc', s: 1.6 }, 'C uit glucose', '>', { m: 'co2', s: 1.6 }, 'CO₂ dat je uitademt'], KX + 100, y + 260, { size: 42, gap: 16, arrow: 110, alpha: a5 }); }
    },
  };
})();
