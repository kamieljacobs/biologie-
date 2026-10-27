// LEEUW (KatPop) — variant A: manen een toon lichter in de onderlaag (manenM #8A5C2B → #9E6E36, manenD #5A3D24 → #74502C),
// zodat de schouder bij het lopen niet in één donkere zaagtandvlek verdwijnt en de manen ook klein als manen lezen.
// Galop is in deze ronde NIET toegevoegd: de luipaardgalop één-op-één op de leeuw gezet gaf ineengezakte poten
// (de GALOP-tabel is op luipaardmaten geijkt); dat vraagt een eigen galoptabel met fasebron.
var KAT_LEEUW_A = KatPop.maak(Object.assign({}, KAT_LEEUW2_DEF, { PAL: Object.assign({}, KAT_LEEUW2_DEF.PAL, { manenM: '#9E6E36', manenD: '#74502C' }) }));
function leeuw(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT_LEEUW_A, x, y, s * 220 / 120, o); }
