// ===================================================================================
// DOLFIJN (tuimelaar, Tursiops truncatus), aanpassing op ZW_DEF.dolfijn (zelfde aanroep dolfijn(ctx, x, y, s, o)).
// Recept: korte snuit en ronde meloen, sikkelvormige rugvin halverwege, korte borstvinnen; staartvin HORIZONTAAL.
// Zwemslag op en neer: staartvin-amplitude top-top ± 0,21 L (Rohr & Fish 2004), staartvin kantelt met ± 90° fase
// (Fish 1993). Aanpassing: slag in de staartsteel iets groter en de staartvin kantelt sterker, zodat bij de slag het
// vlak van de staartvin even breder in beeld komt (op-neer i.p.v. links-rechts zoals een vis).
// ===================================================================================
(function () { const d = ZW_DEF.dolfijn; d.slag.A = [[0, 0.012], [0.3, 0.0], [0.55, 0.005], [0.78, 0.036], [1, 0.09]]; d.slag.vinPitch = 0.95;
  d.extraVin = (Ls) => ({ fluke: _zwFluke(0.13 * Ls, 0.045 * Ls, Ls) }); d._p = null; })();
