// ===================================================================================
// MEREL (Turdus merula), aanpassing op VogelZang. Recept: 23,5–29 cm, man zwart met oranjegele snavel en oogring,
// poten donkerbruin met drie voortenen en een achterteen; staart in rust iets korter dan de romp. Vlucht: beide
// vleugels slaan, het lijf golft mee (zie _vzTeken). Zelfde aanroep merel(ctx, x, y, s, o).
// ===================================================================================
(function () { const VZ = VogelZang, oud = VZ.DEFS.merel; VZ.DEFS.merel = function (o) { const d = oud(o); d.staart.L = 90; return d; }; })();
merel = function (ctx, x, y, s = 1, o = {}) { return _vzTeken('merel', ctx, x, y, s, o); };
