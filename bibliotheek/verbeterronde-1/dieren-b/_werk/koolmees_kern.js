// ===================================================================================
// KOOLMEES (Parus major), aanpassing op VogelZang. Recept: 12,5–14 cm; blauwzwarte kop met witte wang, gele borst met
// zwarte streep, groene rug, witte vleugelstreep; staart kort en blauwgrijs met WITTE BUITENVEREN (van opzij een witte
// rand langs de onderkant), geen witte staartpunt. Vlucht met beide vleugels en lijfgolf (_vzTeken), voeten als vork.
// Bekende fouten: staart te lang en wit aan het eind.
// ===================================================================================
(function () { const VZ = VogelZang, oud = VZ.DEFS.koolmees; VZ.DEFS.koolmees = function (o) { const d = oud(o);
  d.staart.L = 84; d.staart.wit = null; d.staart.rand = '#E6E8EA'; d.staart.lw = 1.4; return d; }; })();
koolmees = function (ctx, x, y, s = 1, o = {}) { return _vzTeken('koolmees', ctx, x, y, s, o); };
