# Bronnen polymerase (ronde 3)

Geen nieuwe vakinhoud ten opzichte van ronde 2; dezelfde zelf geopende bronnen (zie `verbeterronde-2/dna/polymeraseachter-polymerasevoor/bron.md`):
- OpenStax Biology 2e § 14.4 (niveau A): nucleotiden aan het vrije 3'-OH, alleen 5' → 3', energie uit nucleoside-trifosfaten; 'the sliding clamp holds the DNA polymerase in place'.
- Open Oregon, *DNA Replication in Prokaryotes* (OpenStax-afgeleid): 'The sliding clamp is a ring-shaped protein that binds to the DNA'.

Beweringen → tekening
- Klem = ring om het DNA, achter het enzym ✓. Nucleotide aan het 3'-uiteinde, gouden actief centrum daar ✓.
- Inkomende nucleotide met drie fosfaten (trifosfaat) ✓ (OpenStax: 'nucleoside triphosphates').
- Variant B: palm/duim/vingers = het handmodel uit het bestaande recept (Steitz); variant A: C-vorm met DNA in het kanaal. Beide vereenvoudigingen, geen bronbewering. Maat ± 2,5 × DNA-breedte ≈ (bestaand recept).
- Vingers in A als één α-helix: bij Pol I sluit de O-helix van het vingerdomein op de nucleotide (bekend uit structuurbiologie; niet in een hier geopende bron, ≈ status, alleen vorm).

## Advies bij inbouwen (geldt los van de gekozen versie)
De 'dubbel dikke' nucleotiden kwamen uit de scène/vork, niet uit het enzym: `d2Base` met `vorm: true` tekent puzzelvormen die breder zijn
dan de afstand tussen twee basen, zodat twee gelijke basen naast elkaar één blok worden. In de nieuwe scène staat elke base als
staafje van 0,5 × de basenafstand met een spleet ertussen (`_r3Base` in scene.js). In de replicatievork van lib_bio.js zou
`hw` hooguit ± 0,3 × dx moeten zijn (nu 0,32–0,34 dx met puzzelvorm erbij). Graag beslissen of dat in de vork ook moet.
