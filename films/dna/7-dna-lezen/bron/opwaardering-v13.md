# DNA lezen 2.0 — opwaardering naar prompt v13 (31 okt 2026)

Beeld-remake, takes behouden (brief `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`). Kamiel was er niet bij: twijfelscènes zijn gebouwd met de beste keuze en staan hieronder.

## (a) Twijfelscènes
| Scène | Gekozen | Alternatief |
|---|---|---|
| n0 opening | Dr. Kim in plaatsdelict-overall neemt het bloed van de ruit af (castpersonage, geen naam in beeld) | een anonieme figurant van de forensische opsporing (bestaat nog niet in het castboek) |
| n0 slot | de onbekende dader als lege kaart met '?' en een menigte-silhouet met vergrootglas (geen persoon getekend, de opening verraadt de achterneef niet) | Erik al in de opening laten zien |
| n14 | kleurstoffen zoals de bibliotheek-`sequencer` (ABI: T rood, A groen, C blauw, G geel), zodat 'rood, groen, blauw, geel' uit de stem klopt; de basen zelf blijven in palet B. Kan verwarren: rood = T, terwijl de base A in palet B rood is | eigen kleurstofkleuren buiten palet B (dan klopt de stem niet meer) |
| v10/n11 | nieuwe tekening bruinvis (zie Voor de bibliotheek) naast de goedgekeurde zeehond, op een strand (Macro-dag) | alleen schema met drie monsterbuisjes, zonder dieren |
| n21 | rechercheurs niet getekend; Dr. Kim (lab) neemt het wattenstaafje af bij Erik | Bilal (stagiair forensisch onderzoek) of een nieuwe figurant-rechercheur |
| n21 | achterneef = Joost, dader = Erik (zoals 1.4; LEVENSLOOP zegt ook dat Erik Joosts buurman is: beide kan) | Erik en Joost niet als familie gebruiken |
| n22v | patiënt bij gentherapie en 'somatisch' = Opa Henk (zoals 1.4); bij sikkelcelziekte geen persoon, alleen cellen | een jongere patiënt (Casgevy is vanaf 12 jaar; sikkelcelpatiënten zijn meestal jong) |
| n5 | 'eiwitten van het virus' als vier kleine kralenkluwens (`enzymKluwen` in oker) | spike-eiwitten los van het virus tekenen |

## (b) Herinspreeklijst
Geen. Alle tekst is ongewijzigd; geen castnamen in de stem. Uitspraak-wachtlijst blijft: n22v 'hemoglobienuh' (uit de brief) en de lijst in `oud/info-1.5.md`.

## (c) Vragen over inhoud
- n22v: 'Sinds het jaar 2023 is die behandeling goedgekeurd' klopt voor de VS (FDA 8 dec 2023) en het VK (nov 2023); in de EU pas in 2024. Laten zo? (geen tekstwijziging gedaan)
- n19: de stem zegt 'alleen als een rechter toestemming geeft'; de bronnen spreken van de rechter-commissaris. Het kaartje zegt 'met toestemming van een rechter' (zoals de brief vraagt).
- n9: 'een stuk of twintig plekken' op een gewone gel; in het lab is het capillaire elektroforese (staat al in het docentdeel als vereenvoudiging).

## (d) Voor de bibliotheek (getekend in `src/teken_dna7.js`, recept erboven)
- `coronaVirus` (SARS-CoV-2: envelop, ± 22 knotsvormige spikes loodrecht, RNA teal met kralen).
- `zelftest` (antigeen-sneltest, cassette met C- en T-lijn).
- `bruinvis` (Phocoena phocoena op `_zwemLijf`, geen snuit, driehoekige rugvin, optie `wonden`).
- `wattenstaafje`, `bloedDruppel`, `ruit` (kapotte ruit, nacht), `archiefKast`, `profielCode` (profiel als streepjescode), `gelBoven` (gelfoto van boven met laantjes, lengte → −log), `bloedVeld` (uitstrijkje), `sikkelCel`, `bloedBuis`, `insulineKeten`, `stappenBalk`, `enkStreng`/`dubbelStreng` (rechte strengen met `d2Base`).
- Fout gevonden: `_erfSymbool`/`sbSymbool` met `hl` zet `ctx.globalAlpha = a * hl` (absoluut), waardoor de gouden rand niet meevervaagt met de groep. Voorstel: `*=`.

## Wat er veranderde, per scène
- titel: glasscherf met drie druppels bloed en het profiel als streepjescode (was: Schema met pictogrammen).
- n0: nachtgevel met kapotte ruit, Dr. Kim neemt bloed af; databank met zes profielen, geen match; archiefkast; twee vragen in beeld.
- n3: uitstrijkje (rode cellen zonder kern, witte met kern) zonder korrel; PCR-buisje; inzet replicatie met polymerase uit de bibliotheek; `thermocycler` met drie temperatuurkaartjes; Taq-bacterie; verdubbelen tot > 1 miljard.
- v4: neusmonster in PCR-buisje en coronavirus.
- n5: `primerStuk` op virus vs. mens; buisjes met/zonder virus; zelftest tegenover PCR met annotatiehaak 'gevoeliger'.
- n6 (vwo): reverse transcriptase bouwt DNA op het virus-RNA; primerkeuze virus ✓ / mens ✗.
- n8: chromosoompaar met plek; dubbele streng waarop de GATA-blokken oplichten met de stem; drie mensen met verschillende aantallen; vader 8×, moeder 11×.
- n9: gel-apparaat; ingezoomd in de gelmazen met minladingen (kort sneller); banden; twintig laantjes → DNA-profiel als streepjescode.
- v10: bruinvis met bijtwonden en grijze zeehond op het strand, drie genummerde monsterplekken.
- n11: drie kaarten (dichte wond met zeehondcel, open wond, huid); gel met controle en verwachte hoogte.
- n12 (vwo): STR, één of twee banden; kans < 1 op een miljard; Daan en Thijs met hetzelfde profiel.
- n14: stopnucleotide stopt de keten; kopieën van alle lengtes; `sequencer` met TACG; 13 jaar/3 miljard tegenover NGS en puzzelstukjes.
- v15: Esra met zoomcirkel op DNA-stukjes in het bloed.
- n16: genoomkaart 1–22 met stukjes naar 2, 7, 21; placenta, 1 op 10; tellen, te veel van 21; buisje bloed tegenover naald.
- n17 (vwo): referentie en eigen DNA met variant; de meeste varianten doen niets; lezen tegenover betekenis.
- n19: databank ✗; stamboomsite en buisjes van miljoenen mensen; SNP-chip; opnieuw lezen; kaartjes Amerika/Nederland (NL: alleen bij ernstige misdrijven, met toestemming van een rechter).
- v20: stamboom met overgrootouders, dader (?) en achterneef (Joost).
- n21: Noor, ouders, grootouders (castpersonages) en overgrootouders met ½ ¼ ⅛; achterneven en ± 3 %; gedeelde stukken; stamboom naar beneden tot Erik; wattenstaafje; match.
- n22: stappenbalk; alvleeskliercel met mRNA; gen met introns en splicing; reverse transcriptase → cDNA; plasmide knippen, restrictie-enzym, plakkerige uiteinden; ligase; bacteriën met/zonder plasmide, voedingsbodem, insuline; CRISPR; sikkelcellen → ronde cellen.
- n22v (vwo): Cas9 met gids-RNA (zoeken, PAM, knip), reparatie uit/nieuw; gentherapie (virus als vervoermiddel, cellen eruit en terug); stamcellen, schakelaar, foetaal hemoglobine, 2023; somatisch tegenover kiembaan.
- n22c: lezen, vergelijken, veranderen; mag dat, wie beslist.
- n23 (vwo): STR vs SNP; SNP-chip; lang gelijk stuk; vier generaties waarin crossing-over het stuk korter maakt.
- n25: vier kaarten (buisje, gel, kleuren, stamboom).
- n26: Noor met haar familie; vragen voor aflevering 8.
