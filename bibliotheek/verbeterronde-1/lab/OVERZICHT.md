# Groep lab — overzicht (alle 14 objecten nieuw; X/Y = A/B, zie sleutel.json)

| object | status | A | B | bewust níet |
|---|---|---|---|---|
| pcrBuisje | nieuw | zijaanzicht lijntekening, dop klapt om scharnier, volume → niveau | driekwart 3D (ellipsen), strip van 8 in een rek, drie vlakke tinten | geen thermocyclerblok of vloeistofanimatie bij openen |
| injectiespuit | nieuw | lijntekening zijaanzicht, standen vol/druppel/leeg | volume in drie tinten + doorsnede bovenarm met prik en depot | geen hand die de spuit vasthoudt (alleen hand ernaast als maat) |
| thermocycler | nieuw | apparaat in schuine projectie, deksel open/dicht, display + lampje | gekoppeld schema: apparaat + profiel met lopende stip + strengen + kopieënteller | geen echte buisjes met vloeistof in het blok bij A (alleen dopjes) |
| plasmideKnipPlak | nieuw | ringaanzicht: open, gen zakt in, ligase, terug in bacterie | ladder met puzzelbasen op de knipplek + meelopend overzichtsringetje | plasmideRing uit lib_micro_evo niet aangeroepen (eigen ring, zodat het zonder lib_evo werkt) |
| gelElektroforese | nieuw | bovenaanzicht schema met elektroden, belletjes, front en banden | 3D-bak met deksel en kabels + aparte gelfoto-stand | geen pipet die de putjes vult (zie micropipet B) |
| micropipet | nieuw | lijntekening zijaanzicht met drie knopstanden, druppel | drie-tinten pipet in een hand, in buisje of boven gelputje | de hand in B is een eenvoudige vuist, geen castboek-hand (castboek heeft geen grijphand) |
| bioreactor | nieuw | opengewerkte tank met alle onderdelen, roeren en oogsten, naast Bilal | productieketen in drie panelen met vouwend eiwit in de bacterie | pro-insuline knippen niet getekend (in het recept genoemd als vereenvoudiging) |
| primerStuk | nieuw | primer los → vastritsen op de matrijs | gebonden primer + polymerase die nucleotiden toevoegt | geen helixvorm (vlakke ladder zoals de DNA-reeks) |
| sequencer | nieuw | Sanger-schema: kopieën → capillair → chromatogram | NGS-apparaat met scherm vol reads op een referentie, variant goud | geen persoon voor de maat bij het apparaat |
| crisprCas9 | nieuw | Cas9 als kralenketting in twee lobben, vijf stappen | zelfde stappen, eiwit als lint (cartoon) in doorschijnende lobben | geen schaar; reparatie alleen als kleur op de naad, niet base voor base |
| restrictieEnzym | nieuw | dimeer als kralenketting, glijden → klemmen → zigzag-knip → los | zelfde stappen als lintmodel met oppervlak | geen tweede knip in plasmide (zie plasmideKnipPlak) |
| insulinePen | nieuw | zijaanzicht met dop op/af, dosis, indrukken | pen loodrecht op buik met doorsnede huid/vet/spier en depot | geen castpersonage met buik (alleen doorsnede) |
| petrischaal | nieuw | bovenaanzicht: kolonies groeien, gazon met zones | driekwart met agarlaag en deksel dat opengaat | geen meetlat bij de zone |
| microscoop | nieuw | lijntekening zijaanzicht, tafel op/neer, lamp aan/uit | drie-tinten realistisch + beeldcirkel scherp/wazig | personage buigt niet naar het oculair (castboek heeft geen voorover-pose) |

Algemeen: s = px per mm (apparaten) of px per 0,1 nm (Cas9, EcoRI); schaalcontext met `onderarm` of `persoon` uit lib_cast. Testpagina `harness.html`, renderen met `./run.sh <obj>`. Maten met ≈ in bron.md zijn niet uit een geopende bron.

## Ronde 2: C = winnaar + herstel (C.js, C.png; zelfde uitsnede)

| object | C |
|---|---|
| pcrBuisje | A + buitendiameter 7,1 mm / hoogte 20,75 mm (Greiner), mix ≤ 50 µl (alleen in de punt) |
| injectiespuit | B ongewijzigd; schaalspuit + hand verplaatst zodat ze de weefselblokken niet overlappen |
| thermocycler | B + schuin apparaat uit A met deksel open, blok 12 × 8 en strip buisjes; dikkere strengen; profiel opgeschoven |
| plasmideKnipPlak | A + EcoRI en ligase als lint-eiwit (_grKluwen), grotere AATT/TTAA, vergrootcirkel met puzzelbasen en goud omrande overhang |
| gelElektroforese | 3D horizontale bak uit B voor de stappen van A (start, gelopen, gekleurd in UV-kastje), duidelijker laadfront, bak 1 px/mm naast hand 10 px/cm (± 1,3 × hand) |
| micropipet | B + gevuld reactiebuisje met scharnierdop; vingers iets ronder |
| bioreactor | A + keten uit B (o.keten): vergrootcirkel op een bacterie met plasmide, mRNA, ribosoom en vouwende keten, kolom en flesje |
| primerStuk | B + polymerase als lint-eiwit (_grKluwen) in plaats van de bibliotheek-blob; 5′-label van de matrijs vrij |
| sequencer | A + grotere laser/detector + NGS-paneel (o.soort 'ngs') met benoemde variantbase; apparaat op tafel naast Kim op dezelfde schaal |
| crisprCas9 | B in _grKluwen-lint: twee lobben achter het DNA + PAM-domein als brug ervoor (klem); gids-RNA met 20 RNA-basen gepaard op de doelstreng in de R-lus; R-lus sluit na reparatie |
| restrictieEnzym | B in _grKluwen-lint: helften achter het DNA, armen ervoor (klem na herkenning); verder uiteenwijken zodat AATT/TTAA zichtbaar zijn |
| insulinePen | B + dosis 0 → 12 met uitschuivende doseerknop, indrukken telt terug naar 0; cijfer rechtop |
| petrischaal | A + o.aanzicht 'schuin' uit B (wand, agar 4 mm), deksel recht opgetild in plaats van zwevend |
| microscoop | B + lichtweg (teal) lamp → condensor → preparaat → objectief → oculair; condensor kort en grijs |

Eiwitten (Cas9, EcoRI, ligase, polymerase in primerStuk) gebruiken het gedeelde lintmodel `_grKluwen` (kopie van genregulatie/src/_kluwen2.js in elk C.js; in lib_bio.js maar één keer plakken). `demo.js` kent nu ook v = 'C'.
