# Bronnen restrictieEnzym

Zelf geopend (WebFetch, 27 okt 2026):
- [A] OpenStax Biology 2e § 17.1 Biotechnology — https://openstax.org/books/biology-2e/pages/17-1-biotechnology
- [C, wegwijzer] Wikipedia, EcoRI — https://en.wikipedia.org/wiki/EcoRI

Beweringen over vorm en verhouding:
- Herkent vaste volgorde, knipt verspringend → plakkerige uiteinden (OpenStax) ✓ (A).
- G↓AATTC, homodimeer ± 31 kDa, 5′-overhang AATT (Wikipedia, C) ≈ — tweede bron niveau A nodig.
- Glijden langs DNA: ≈ (niet in geopende bron).

Geen ElevenLabs-referentieplaat gemaakt.

## Aanvulling (27 okt 2026, tweede zoekronde)
Zelf geopend:
- [A] RCSB PDB 1ERI, 'X-ray structure of the DNA-EcoRI endonuclease-DNA recognition complex' — https://rcsb.org/structure/1ERI
- [A] Lodish e.a., Molecular Cell Biology 8e, fig. 6-11 (onderschrift) — https://digfir-published.macmillanusa.com/lodish8e/asset/img_ch6/lodish8e_fig06_11.html
- [B] MIT HST.160, 'Restriction Enzymes' — https://web.mit.edu/hst.160/www/quiz/RestrictionEndonucleases.htm
- [B] S.M. Carr, Memorial University, 'Cleavage of DNA at an EcoRI restriction site' — https://mun.ca/biology/scarr/EcoRI_recognition.html
Niet bereikbaar: NEB-productpagina EcoRI en de NEB-lijst met herkenningsplekken (client_error).

Beweringen, nieuwe status:
- Herkenningsplek GAATTC, palindroom: 1ERI (DNA 5′-TCGCGAATTCGCG-3′ met GAATTC in het midden) + MIT + Carr → ✓ (≥ 2 bronnen, ≥ 1 niveau A).
- Knip tussen G en A op beide strengen: MIT ('GA- en AG-overgangen') + Carr → ≈ (twee bronnen van niveau B, geen A met de exacte positie; Lodish noemt alleen 'verspringend').
- Verspringende knip, plakkerig uiteinde van 4 nt: Lodish fig. 6-11 + OpenStax 17.1 → ✓.
- Overhang 5′-AATT: Carr (B) + Wikipedia (C, wegwijzer) → ≈ (nog geen niveau A met de exacte basen).
- Homodimeer (C2-symmetrie), 276 aminozuren per keten: 1ERI → ✓ voor het dimeer (niveau A; tweede bron: Wikipedia, C). De '± 31 kDa' in het recept klopt met 276 aa × ± 110 Da ≈ 30 kDa.

## Ronde 2 (C)
B in _grKluwen-lint: helften achter het DNA, armen ervoor (klem na herkenning); verder uiteenwijken zodat AATT/TTAA zichtbaar zijn. Onderbouwing: RCSB 1ERI (homodimeer), Lodish fig. 6-11, MIT, Carr. Niets toegevoegd dat niet in de genoemde bronnen staat; wat ≈ is, staat hierboven als ≈.

## Inbouw (28 okt 2026, keuze B)
Zelf geopend (WebFetch):
- Wikipedia, EcoRI — https://en.wikipedia.org/wiki/EcoRI : G↓AATTC, 5′-overhang AATT; elke subeenheid heeft een lus/arm die om het DNA slaat.
- Wikipedia, Restriction site — https://en.wikipedia.org/wiki/Restriction_site : knip tussen G en A op beide strengen.
- iGEM TU Darmstadt 2012, EcoRI — https://2012.igem.org/Team:TU_Darmstadt/Materials/EcoRI : bovenstreng tussen G en eerste A, 5′-overhang AATT.
- Kim e.a. 1986, Science (abstract via Scilit) — https://www.scilit.net/publications/2e8fe69a4b9d78fe0c183d702f4387c7 : elke subeenheid heeft een 'arm' die om het DNA slaat.
Herstel: (1) knipplek stond één base te vroeg (C|GAATTC, overhang GAAT) → G↓AATTC (3 bronnen); (2) klem: armen vóór het DNA langs na herkenning (2 bronnen).
