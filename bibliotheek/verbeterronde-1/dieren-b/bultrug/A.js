// ===================================================================================
// BULTRUG (Megaptera novaeangliae), aanpassing op ZW_DEF.bultrug (zelfde aanroep). Recept: ± 15 m; borstvinnen tot
// 1/3 van de lengte met knobbels op de voorrand; knobbels op kop; keelgroeven; kleine rugvin op een bult; horizontale
// staartvin. Slag op en neer, traag (0,2–0,3 Hz). Aanpassing: grotere op-en-neer-uitslag van het staartstuk en een
// zichtbare zwaai van de lange borstvinnen, zodat de zwembeweging op stills te zien is.
// ===================================================================================
(function () { const d = ZW_DEF.bultrug; d.slag.A = [[0, 0.01], [0.3, 0.0], [0.6, 0.01], [0.8, 0.045], [1, 0.11]]; d.slag.vinPitch = 0.6;
  d.vinAnim.borst = (R, o) => ({ rho: (o.rho || 0) + 0.22 * Math.sin(ZwPop.TAU * (R.ph * 0.5) + 0.6) }); d._p = null; })();
