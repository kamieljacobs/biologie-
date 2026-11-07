// ===================================================================================
// PAKICETUS (± 50 Mj), aanpassing op ZW_DEF.pakicetus (zelfde aanroep). Recept (Thewissen e.a. 2001): landdier zo groot
// als een wolf, lange slanke poten, LANGE KRACHTIGE STAART, lange smalle snuit, ogen dicht bij elkaar HOOG OP DE KOP
// (oogkassen bovenop de schedel, zoals bij een krokodil). Aanpassing: oog hoger (tegen de bovenrand van de kop, met een
// lichte wenkbrauwboog), staart aan de basis dikker en geleidelijker smaller, zodat hij minder op een hond lijkt.
// ===================================================================================
(function () { const d = ZW_DEF.pakicetus, D = d.data;
  D.punten.oog = [D.punten.oog[0] + 4, 15.5];
  D.prof = D.prof.map(([s, a, b]) => { if (s < 270) return [s, a, b]; const u = Math.min(1, (s - 270) / 145), f = 1 + 0.75 * Math.sin(Math.PI * Math.min(1, u * 1.15)) ; return [s, a * f, b * f]; });
  d._p = null;
  const oud = d.binnen; d.binnen = function (ctx, B) { oud.call(this, ctx, B); const oe = ZwPop.pt(B, ...this.data.punten.oog); ctx.strokeStyle = this.pal.donker; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(oe[0], oe[1] + 1, 6, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); };
})();
