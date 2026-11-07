// ===================================================================================
// AMBULOCETUS (± 48 Mj), aanpassing op ZW_DEF.ambulocetus (zelfde aanroep). Recept (Thewissen & Fish 1997): ± 3 m,
// laag lijf op korte poten, kleine voorvoeten, zeer grote achtervoeten; lange snuit (smaller dan bij een krokodil),
// ogen hoog; een ZOOGDIER: kleine oorschelp, geen schubben. Zwom als een otter: peddelen met de achtervoeten + golf in
// de staart; de voorpoten worden bij het zwemmen tegen het lijf gehouden (geen roer). Aanpassing: voorpoten in
// 'zwemmen' naar achteren tegen de buik, snuit ± 20 % slanker, klein oor achter het oog.
// ===================================================================================
(function () { const d = ZW_DEF.ambulocetus, D = d.data;
  d.peddel.voor = [150, 172, 178, 182]; d.peddel.voorZwaai = 1;
  D.prof = D.prof.map(([s, a, b]) => s < 62 ? [s, a * (0.8 + 0.2 * s / 62), b * (0.8 + 0.2 * s / 62)] : [s, a, b]);
  D.punten.oor = [D.punten.oog[0] + 30, D.punten.oog[1] + 6]; d._p = null;
  d.naLijf = function (ctx, B) { const q = this.data.punten.oor, p = ZwPop.pt(B, q[0], q[1]), F = ZwPop.frame(B, q[0]), a = Math.atan2(-F.t[1], -F.t[0]);
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(a); ZwPop.pad(ctx, ZwPop.glad([[3, 3], [1, -4], [-3, -8], [-6, -4], [-5, 3]], 3)); ctx.fillStyle = this.pal.rug; ctx.fill();
    ZwPop.pad(ctx, ZwPop.glad([[1, 1], [0, -3], [-3, -6], [-4, -3], [-3, 1]], 3)); ctx.fillStyle = '#8C7F6C'; ctx.fill(); ctx.restore(); };
})();
