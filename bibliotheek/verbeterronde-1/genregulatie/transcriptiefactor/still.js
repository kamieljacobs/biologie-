function still(ctx){ // groot: activator gebonden met polymerase op DNA; rechts: los → half → remmer met hormoon; klein rechtsonder
  transcriptiefactor(ctx, 380, 440, 1.25, { dna: true, gebonden: 1, soort: 'activator', polymerase: 1 });
  transcriptiefactor(ctx, 1010, 160, 0.45, { dna: true, gebonden: 0, soort: 'neutraal', hormoon: 0 });
  transcriptiefactor(ctx, 1010, 360, 0.45, { dna: true, gebonden: 0.5, soort: 'neutraal', hormoon: 1 });
  transcriptiefactor(ctx, 1010, 555, 0.45, { dna: true, gebonden: 1, soort: 'remmer', polymerase: 1 });
  transcriptiefactor(ctx, 1195, 680, 0.28, { dna: true, gebonden: 1, soort: 'activator', polymerase: 1 }); }
