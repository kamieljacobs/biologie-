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
    /* H3 Lichtreactie: met de energie van de elektronen ATP; een hulpmolecuul neemt de elektronen en H⁺ op.
       Blijft staan t/m het eind van H3 (zin 29–31: de lichtreactie gebruikt licht en water, levert O₂, ATP en NADPH,H⁺). */
    '3:3h'(g, lt, { a, W, S }) {
      kaart(g, a, 'Energie uit licht vastleggen');
      const x = KX + 90, y0 = KY + 250;
      const a1 = a * vis(lt, W('energie')), a2 = a * vis(lt, W('ATP')), a3 = a * vis(lt, W('hulpmolecuul'));
      if (a1 > 0.01) { for (let k = 0; k < 3; k++) { g.screen(); D.mol(g, 'el', x + 10 + k * 26, y0 - 12, 0, { s: 1.8, alpha: a1 }); } regel(g, 'de elektronen kregen energie uit licht', y0, a1, { x: x + 110 }); }
      if (a2 > 0.01) { g.screen(); D.mol(g, 'atp', x + 36, y0 + 88, 0, { s: 1.7, alpha: a2 }); regel(g, 'met die energie maakt de chloroplast ATP', y0 + 100, a2, { x: x + 110 }); }
      if (a3 > 0.01) { g.screen(); D.mol(g, 'nadh', x + 36, y0 + 188, 0, { s: 1.8, alpha: a3 }); regel(g, 'een hulpmolecuul neemt de elektronen en H⁺ op', y0 + 200, a3, { x: x + 110 }); }
      const b1 = a * vis(lt, S(29, 'licht')), b2 = a * vis(lt, S(30, 'levert')), b3 = a * vis(lt, S(31, 'energie'));
      if (b1 > 0.01) { CM.card(g, x - 20, y0 + 250, 1340, 3, { alpha: b1 * 0.6 }); g.text('lichtreactie', x, y0 + 310, { size: 44, w: 600, color: C.ink, alpha: b1 }); regel(g, 'in: licht en water', y0 + 310, b1, { x: x + 330, color: C.ink2 }); }
      if (b2 > 0.01) regel(g, 'uit: O₂, ATP en NADPH,H⁺ (het beladen hulpmolecuul)', y0 + 365, b2, { x: x + 330, color: C.ink2 });
      if (b3 > 0.01) regel(g, 'de energie uit licht zit nu in ATP en NADPH,H⁺', y0 + 420, b3, { x: x + 330, color: C.amberInk || C.amber });
    },

    /* H4 Calvincyclus in hoofdlijnen: CO₂ vastleggen (koolstofassimilatie), met ATP en H-atomen uit de lichtreactie stap voor stap
       glucose; 6 CO₂ per glucose. Blijft staan t/m het eind van H4 (vraag licht uit; antwoord zin 20–24). */
    '4:4h'(g, lt, { a, W, S }) {
      kaart(g, a, 'De calvincyclus in het kort');
      const x = KX + 60, y0 = KY + 260, dy = 74, sz = 36;
      const r = [
        [W('CO₂'), 'co2', 'CO₂ wordt vastgelegd in een organische stof'],
        [W('koolstofassimilatie'), null, '= koolstofassimilatie'],
        [W('ATP'), 'atp', 'energie uit ATP'],
        [W('H-atomen'), 'h', 'H-atomen van NADPH,H⁺ (uit de lichtreactie)'],
        [W('glucose'), 'glc', 'stap voor stap ontstaat glucose'],
        [W('zes'), 'co2', '6 CO₂ → 1 glucose (6 C)'],
      ];
      const wcol = 780;
      r.forEach(([t0, m, s], k) => { const ak = a * vis(lt, t0); if (ak <= 0.01) return; const y = y0 + k * dy;
        if (m === 'h') { for (let j = 0; j < 3; j++) { g.screen(); D.mol(g, 'h', x + 12 + j * 22, y - 12, 0, { s: 1.7, alpha: ak }); } }
        else if (m) { g.screen(); D.mol(g, m, x + 46, y - 12, 0, { s: m === 'atp' ? 1.3 : 1.5, alpha: ak }); }
        regel(g, s, y, ak, { x: x + 120, size: sz, w: k === 1 ? 600 : 500, color: k === 1 ? C.amberInk || C.amber : C.ink }); });
      // rechts: na de vraag (licht uit)
      const xr = KX + 940, c1 = a * vis(lt, S(21, 'gebruikt')), c2 = a * vis(lt, S(22, 'Die')), c3 = a * vis(lt, S(24, 'donker'));
      if (c1 > 0.01) { g.text('licht uit?', xr, y0, { size: 46, w: 600, color: C.ink, alpha: c1 });
        regel(g, 'de calvincyclus gebruikt', y0 + dy, c1, { x: xr, size: 36, color: C.ink2 }); regel(g, 'geen licht, wel ATP en NADPH,H⁺', y0 + dy + 48, c1, { x: xr, size: 36, color: C.ink2 }); }
      if (c2 > 0.01) { regel(g, 'die komen uit de lichtreactie;', y0 + 2 * dy + 70, c2, { x: xr, size: 36, color: C.ink2 }); regel(g, 'de voorraad is klein', y0 + 2 * dy + 118, c2, { x: xr, size: 36, color: C.ink2 }); }
      if (c3 > 0.01) P.tag(g, 'in het donker stopt hij', xr, y0 + 4 * dy + 90, { size: 40, w: 600, alpha: c3 });
    },
  };
})();
