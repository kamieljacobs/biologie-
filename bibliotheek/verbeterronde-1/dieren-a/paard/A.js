// PAARD (uitknippop, HoefPop) — variant A: hoeven in donker hoorn in plaats van blauwgrijs (lazen als schoentjes).
// Bron: hoefwand van een donker been is donker hoorn (zwart-bruin); lichte hoeven horen alleen bij witte sokken.
// Grazen (halsboog) bewust ongewijzigd: door Kamiel goedgekeurd in ronde 4 ('grazen zoals de plaat').
// Let op: _hoefDef bindt TENEN (die de hoef tekent) aan het oorspronkelijke definitieobject; een kopie met een andere
// HOEF moet TENEN opnieuw binden, anders blijft de oude hoefkleur staan (fout in de eerste render van ronde 1).
var HOEF_PAARD_A_DEF = Object.assign({}, HOEF_PAARD_DEF, { HOEF: Object.assign({}, HOEF_PAARD_DEF.HOEF, { kleur: '#3A2E24', kroon: '#1D1A18' }) });
HOEF_PAARD_A_DEF.TENEN = (ctx, k, pal, BOT) => _hoefTeken(ctx, k, pal, BOT, HOEF_PAARD_A_DEF);
var HOEF_PAARD_A = HoefPop.maak(HOEF_PAARD_A_DEF);
function paard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_PAARD_A, x, y, s, o); }
