// WOLF (WolfPop) — variant A: 'galop' (en 'rennen') vallen niet meer stil terug op staan maar gaan expliciet naar de
// snelste gang die de pop heeft (draven, met zweeffase); de README moet 'galop' dan als alias noemen, niet als eigen gang.
// Een echte galop (gedraaide galop, 4 tellen) bouwen = nieuwe tabel in WolfPop met fasebron; niet in deze ronde.
function wolf(ctx, x, y, s, o = {}) { const h = { grazen: 'snuffelen', vechten: 'staan', galop: 'draven', rennen: 'draven', draf: 'draven' }[o.houding] || o.houding || 'staan';
  return WolfPop.teken(ctx, x, y, s, Object.assign({}, o, { houding: h })); }
