# Kleuren van de DNA-basen en de ruggengraat (voorstel, 28 okt 2026)

Kamiel: 'ik vind de paarse kleur sowieso niet zo mooi; maak meer gebruik van andere kleuren' + BEELDAFSPRAKEN 'minder paars, meer contrast'.
Stills: `X.png`, `Y.png`, `Z.png` = huidig / A / B in willekeurige volgorde (`sleutel.json`), met alleen het palet verschillend
(bibliotheekfuncties ongewijzigd): vier basen + U, een stuk ladder, een stuk helix, een chromosoompaar (cdChromosoom met CD.vader / CD.moeder)
en klein een chromosoom in de standaardkleur. `<L>-deuteranopie.png` en `<L>-protanopie.png` = dezelfde stills zoals iemand met
rood-groen-kleurenblindheid ze ziet (Machado-2009-simulatie, volle sterkte). Code: `paletA.js`, `paletB.js` (Object.assign op DNA_BASE, D2, RNA_BASE, _cdRNA, CD).

| | A | T | C | G | U (RNA) | ruggengraat | chromosoom std / vader / moeder |
|---|---|---|---|---|---|---|---|
| huidig | #C9BEEB | #9F90D4 | #6C5BA8 | #4F3F86 | (teal-reeks) | paars #8C7BBF | lila / lichtpaars / donkerpaars |
| **A** 'lichtheidstrap' | groen #6DBA7F | koraal #CF5F45 | zandgeel #F0D58A | blauw #3A67A0 | licht koraal #F09A84 | lila #A99BDB (DNA = paars, C1) | lila / lichtblauw / koraal |
| **B** 'paren als families' | koraalrood #D8604A | zandgeel #F2CF7A | lichtblauw #86C3E8 | donkerblauw #34609A | perzik #F5B98A | lichtgrijs #97A3B6 | lichtgrijs / donkerblauw / zandgeel |

Kleinste kleurverschil (ΔE, CIELAB) tussen twee basen, gewoon / deuteranopie / protanopie: huidig 12 / 12 / 12 (alle tinten paars, alleen lichtheid) · A 43 / 23 / 19 · B 40 / 27 / 38.
In A blijven A (groen) en T (koraal) bij kleurenblindheid vooral door lichtheid uit elkaar (69 tegen 54); in B is ook de tint veilig (warm geel/rood tegen koel blauw).
Letters donker op A, T, C en licht op G (contrast ≥ 4,5 : 1).

Keuzes om aan Kamiel voor te leggen:
- A houdt de ruggengraat paars (C1: paars = DNA) en zet alle kleur in de basen; B laat paars helemaal los voor DNA (grijze ruggengraat) en maakt de paren tot families (A–T warm, C–G koel). B wijkt af van C1 en zou in de prompt moeten.
- RNA: in beide paletten dezelfde tinten als DNA voor A, C, G; U een eigen lichte tint in de familie van T; de RNA-ruggengraat blijft teal.
- Oude/nieuwe streng bij replicatie (D2.oud / D2.nieuw): A paars / lichtlila, B grijs / bijna wit.

Bron: Wong B. (2011) Points of view: Color blindness. *Nature Methods* 8:441 (pdf via https://nature.berkeley.edu/garbelottoat/wp-content/uploads/nmeth.1618.pdf-WT.pdf), niveau A: 'colors will be easier to distinguish when they vary in lightness and saturation as well as hue'; 'any color with components of red and green can cause trouble'; tot 8 % van de mannen heeft rood-groen-kleurenblindheid.
