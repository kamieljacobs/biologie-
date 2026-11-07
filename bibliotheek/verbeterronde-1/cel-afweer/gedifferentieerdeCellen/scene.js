function scene(ctx) {
  gedifferentieerdeCellen(ctx, 380, 360, 1.05, { genen: 1, d: 1 });
  // standen: nog niet gespecialiseerd (genen uit) · halverwege · één type licht op
  gedifferentieerdeCellen(ctx, 1010, 150, 0.4, { genen: 0, d: 0 });
  gedifferentieerdeCellen(ctx, 1010, 400, 0.4, { genen: 1, d: 0.5, licht: 'lever' });
  gedifferentieerdeCellen(ctx, 1150, 615, 0.27, { genen: 1, d: 1 });
}
