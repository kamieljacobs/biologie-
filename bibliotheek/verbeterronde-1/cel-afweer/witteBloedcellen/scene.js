function scene(ctx) {
  // groot: macrofaag die een bacterie insluit
  witteBloedcellen(ctx, 330, 360, 190, { soort: 'macrofaag', eet: 0.35, t: 0 });
  // standen fagocytose (klein): begin · ingesloten · lysosomen versmelten
  witteBloedcellen(ctx, 790, 120, 62, { soort: 'macrofaag', eet: 0.05 });
  witteBloedcellen(ctx, 960, 120, 62, { soort: 'macrofaag', eet: 0.7 });
  witteBloedcellen(ctx, 1130, 120, 62, { soort: 'macrofaag', eet: 1 });
  // de set, op echte verhouding t.o.v. de macrofaag
  witteBloedcellen(ctx, 790, 330, 120, { soort: 'neutrofiel' });
  witteBloedcellen(ctx, 950, 330, 120, { soort: 'bcel' });
  witteBloedcellen(ctx, 1120, 330, 120, { soort: 'plasmacel', vrij: 0.5 });
  witteBloedcellen(ctx, 860, 520, 120, { soort: 'mestcel', vrij: 0.6 });
  tHelperCel(ctx, 1030, 520, 120 * 0.42);
  witteBloedcellen(ctx, 1190, 640, 40, { soort: 'macrofaag' });
}
