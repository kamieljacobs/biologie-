function still(ctx){ // groot: leespad voor AUG compleet; rechts drie standen van het pad (UGG); klein rechtsonder
  const groot = 440 / 770; codonTabel(ctx, 40, 140, groot * (770/770) , { codon: 'AUG', pad: 1 });
  [0.34, 0.67, 1].forEach((p, i) => codonTabel(ctx, 880, 30 + i * 200, 175 / 770, { codon: 'UGG', pad: p }));
  codonTabel(ctx, 1170, 630, 80 / 770, { codon: 'UGG', pad: 1 }); }
