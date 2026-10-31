# DNA lezen — bronnenlogboek (eerste versie)

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 2.0 (beeld-remake, 31 okt 2026; tekst = versie 1.5) |
| Eerste ronde | Claude, 31 okt 2026: 14 beweringen, 8 bronnen zelf geopend |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | 5 ✓ · 6 ≈ · 0 ! · 3 ? |

## Bronnen

Alle bronnen op 31 okt 2026 zelf geopend. Niet bereikbaar vanuit deze sessie: pmc.ncbi.nlm.nih.gov (browsercontrole), isogg.org en pns.nl/nipt (allowlist).

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | B | University of Minnesota, *Clinical Veterinary Diagnostic Laboratory*, Module 4.4 'Denaturation, annealing and primer extension' (open leerboek) | https://open.lib.umn.edu/cvdl/chapter/module-4-4-denaturation-annealing-and-primer-extension/ |
| B2 | A | NHGRI (genome.gov), *Human Genome Project FAQ* | https://www.genome.gov/Pages/Education/Smithsonian_Exhibition/Human_Genome_Project_FAQ.pdf |
| B3 | A | Openbaar Ministerie, 'Genealogische DNA-databanken' (onderwerppagina) | https://www.om.nl/onderwerpen/d/dna-onderzoek/genealogische-dna-databanken |
| B4 | A | Openbaar Ministerie, 'Vraag en antwoord pilot genealogische DNA-databanken', 28 okt 2026 | https://www.om.nl/documenten/2026/10/28/vraag-en-antwoord-pilot-genealogische-dna-databanken |
| B5 | A | Rechtspraak, Rechtbank Limburg, 'Rechter-commissaris stemt in met gebruik private DNA-databanken in 2 cold cases', okt 2023 | https://www.rechtspraak.nl/organisatie-en-contact/organisatie/rechtbanken/rechtbank-limburg/nieuws/2023/10/rechter-commissaris-stemt-in-met-gebruik-private-dna-databanken-in-2-cold-cases |
| B6 | A | RIVM, *Informatiekaart prenatale screening* (maart 2025) | https://www.pns.nl/sites/default/files/2025-03/RIVM%20Informatiekaart%20prenatale%20screening%20DEF%20%28maart%202025%29.pdf |
| B7 | B | STAT News, 'FDA approves Casgevy, CRISPR-based medicine for sickle cell disease', 8 dec 2023 | https://statnews.com/2023/12/08/fda-approves-casgevy-crispr-based-medicine-for-treatment-of-sickle-cell-disease/ |
| B8 | A | Leopold, M.F. e.a. (2015). Exposing the grey seal as a major predator of harbour porpoises. *Proc. R. Soc. B* 282: 20142429 (samenvatting via MarineInfo) | https://marineinfo.org/id/publication/243772 |

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | n3 | PCR: verhitten (bijna honderd graden) → strengen los; afkoelen → primers binden; opwarmen tot zo'n zeventig graden → polymerase bouwt | B1 | ≈ | B1: 95 °C, 55–65 °C, ± 70 °C; tweede bron (OpenStax) niet bereikbaar; staat ook in versie 1.5 docentdeel |
| 2 | n3 | hittebestendige polymerase uit een bacterie uit hete bronnen | B1 | ≈ | B1: Taq uit *Thermus aquaticus*, 'heat-tolerant bacterium'; tweede bron nog zoeken |
| 3 | n3 | elke cyclus verdubbelt; na dertig cycli meer dan een miljard | B1 | ✓ | B1 'roughly double'; 2³⁰ ≈ 1,07 · 10⁹ is rekenwerk |
| 4 | n14 | het eerste menselijke genoom kostte dertien jaar en zo'n drie miljard dollar | B2 | ✓ | 1990–2003; geschat ± 3 miljard dollar, NIH-kosten 2,7 miljard (1991-dollars); één A-bron, cijfers zijn ook rekenwerk uit de jaartallen |
| 5 | n16 | stukjes DNA uit de placenta in het bloed van de moeder; screening, geen zekerheid; zekerheid pas met een test van de foetus zelf | B6 | ≈ | B6: placenta-DNA 'bijna altijd' gelijk aan dat van het kind; vervolgonderzoek (vlokkentest, vruchtwaterpunctie) voor zekerheid. Tweede bron: pns.nl niet bereikbaar |
| 6 | n16 | ongeveer één op de tien stukjes is van het kind | — | ? | staat in docentdeel 1.5 (foetale fractie ± 10 %); niet opnieuw nagegaan |
| 7 | n19 | in Nederland mag de politie via stamboomsites zoeken, alleen bij heel ernstige misdrijven en met toestemming van een rechter | B3, B4, B5 | ✓ | B3/B4: 'ernstige strafzaken', pilot OM en NFI; B5: de rechter-commissaris gaf per zaak toestemming. Kaartje in beeld volgt dit |
| 8 | n19 | in Amerika mag de politie zo zoeken | — | ? | staat in docentdeel 1.5 (GEDmatch/FamilyTreeDNA, opt-in); niet opnieuw nagegaan |
| 9 | n21 | achterneven delen zo'n drie procent van hun DNA | — | ≈ | rekenwerk: gedeelde overgrootouders → gemiddeld 1/32 = 3,125 %; bron (ISOGG) niet bereikbaar |
| 10 | n22v | sikkelcelziekte: stamcellen uit het beenmerg, met CRISPR aangepast; goedgekeurd sinds 2023 | B7 | ≈ | B7: FDA-goedkeuring 8 dec 2023, eerste CRISPR-medicijn; werking (BCL11A, foetaal hemoglobine) staat in docentdeel 1.5; EU pas 2024 (vraag aan Kamiel) |
| 11 | v10, n11 | grijze zeehonden bijten bruinvissen; zeehond-DNA in bijtwonden | B8 | ≈ | toegeschreven aan het CvTE-examen havo 2019-II (geparafraseerd); B8 noemt grijze-zeehond-DNA in bijtwonden van drie bruinvissen |
| 12 | n9 | DNA is negatief geladen, loopt naar de pluspool; korte stukken verder | — | ✓ | recept `gelElektroforese` in de bibliotheek (OpenStax 17.1); examenstof |
| 13 | n12 | alle twintig plekken gelijk: kans kleiner dan één op een miljard | — | ? | docentdeel 1.5; niet opnieuw nagegaan |
| 14 | n14 | gekleurde stopnucleotiden, kopieën van alle lengtes, laatste base lezen | — | ✓ | recept `sequencer` in de bibliotheek (Sanger); Sanger 1977 in docentdeel |

## Aanpassingen (was → nu → bronnen)
- Docentdeel, regel genetische modificatie: 'ligase en de precieze knipplaatsen zijn weggelaten' → beschrijving van de vijf stappen zoals in de film (de film noemt sinds 1.2 ligase en plakkerige uiteinden). Geen inhoudelijke bewering veranderd.

## Menselijke controle
Nog niet gedaan.
