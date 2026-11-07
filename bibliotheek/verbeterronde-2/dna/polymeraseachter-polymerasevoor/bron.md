# Bronnen (zelf geopend, 28 okt 2026)

- OpenStax Biology 2e § 14.4 *DNA Replication in Prokaryotes* (https://openstax.org/books/biology-2e/pages/14-4-dna-replication-in-prokaryotes), niveau A: 'DNA pol III is the enzyme required for DNA synthesis'; 'requires a free 3'-OH group to which it can add nucleotides'; 'able to add nucleotides only in the 5' to 3' direction'; 'A protein called the sliding clamp holds the DNA polymerase in place'; energie uit 'nucleoside triphosphates'.
- Open Oregon, *DNA Replication in Prokaryotes* (OpenStax-afgeleid, CC BY; https://openoregon.pressbooks.pub/mhccmajorsbio/chapter/dna-replication-in-prokaryotes/), niveau A/B: 'The sliding clamp is a ring-shaped protein that binds to the DNA and holds the polymerase in place'; 'DNA polymerase III starts adding nucleotides to the 3′-OH (sugar) end of the primer'.
- Bestaand recept in lib_bio.js (ronde 1, Steitz-handmodel: palm, vingers, duim) en BEELDAFSPRAKEN (eiwit = kralenketen die vouwt).

## Beweringen → tekening
- Klem = ring om het DNA, achter het enzym ✓ (2 bronnen, waarvan 1 A).
- Nieuwe nucleotide aan het 3'-uiteinde, gouden actief centrum daar ✓.
- Maat ± 2,5 × DNA-breedte: niet in deze bronnen; overgenomen uit het bestaande recept (Pol III-kern/Klenow ± 5–6 nm). Status ≈.
- Bewust weggelaten: duim, onderkaak en exonucleasedomein (rust boven volledigheid, Kamiel ronde 1).

## Let op bij inbouwen
- `primerStuk` (lib_bio.js, ± r. 6953) roept alleen polymeraseVoor aan. Beide varianten tekenen dan zelf ook de achterlaag (lijst `_polAchterLijst` onthoudt of polymeraseAchter op dezelfde plek al getekend is).
- De scène is gelijk aan ronde 1, met twee correcties: de inkomende nucleotide wijst met zijn base naar de matrijs (was weg van het DNA) en is de complementaire base; de grote uitsnede iets kleiner (g 200).
