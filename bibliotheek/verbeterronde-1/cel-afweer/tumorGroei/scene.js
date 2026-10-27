function scene(ctx) {
  tumorGroei(ctx, 380, 470, 1.15, { g: 0.85, apoptose: 0.55 });
  // standen: één gemuteerde cel · kluwen · apoptose klaar
  tumorGroei(ctx, 1010, 160, 0.4, { g: 0.03 });
  tumorGroei(ctx, 1010, 330, 0.4, { g: 0.5 });
  tumorGroei(ctx, 1010, 500, 0.4, { g: 0, apoptose: 1 });
  tumorGroei(ctx, 1170, 650, 0.2, { g: 0.6 });
}
