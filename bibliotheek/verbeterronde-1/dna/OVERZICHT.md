# Groep dna · varianten (maker, 27 okt 2026)

Per map: A.js (en B.js), X/Y(/Z).png (1280×720, blind), sleutel.json, recept.md, bron.md, kenmerken.json, scene.js (de testscène; render met `harness.html?obj=<map>&v=oud|A|B`, script `run.sh <map> <versies>`). Ruwe renders met versienaam staan buiten deze map in `../dna_raw/`.

| Object | Soort | A | B | Bewust niet gedaan |
|---|---|---|---|---|
| kernchromatine | bestaand, hoog | 1/3 draadlengte, 1,5× dikker, zacht terugsturen (geen knikken), windingen pas laat, X pas vanaf c = 0,75; dnaDraad meeverhuisd naar lib_bio (zelfde code, hulpjes `_bioCR`, `_bioGelijk`, `_bioL`) | territoriumvlakken + profase-worm, pas vanaf c = 0,6 splitsen in X | lib_micro_evo.js niet aangepast; territoria-bron niet kunnen openen (captcha) |
| chromatidex | bestaand, middel | windingen loodrecht op de echte middellijn, binnen de arm, niet in de toppen | — | niet samengevoegd met cdChromosoom (dat is het voorstel bij cd*) |
| nucleosoomdraad | bestaand, middel | nieuwe opties `los` (afwikkelen, ook per nucleosoom als array/functie) en `compact` (zigzag-stapel) | — | geen echte 30-nm-solenoïde; bron voor afwikkelen nog te openen |
| basering-basebruggen-nucleotidering | bestaand, middel | label 4' binnen de ring; `basePath()` met dnalib-aanroep uit dezelfde puzzelcode; `DNA_BASE.sport(s)` | — | testvel.html en lessen_dna.md (112/72-som) niet aangepast: repo niet wijzigen, wel nodig bij inbouwen |
| dnaladderhelix | bestaand, hoog | ruggen als dezelfde paarse band als vork/d2Rug (0,2·R), basen in helix brede staafjes in basetint met naad | kralen-ruggengraat (fosfaat + suiker), puzzelbasen blijven in de helix (verkort) | geen modus 'draad' (dnaDraad blijft apart) |
| vork | bestaand, middel | helicase 1,8 bp vóór de vork óp de helixstreng (`hOff`), primase verder van de streng, preset `vork.st({breedte, hoogte, g, f})` | — | standaard `lead` niet veranderd (oude aanroepen geven hetzelfde beeld behalve de helicase); DNA-tekenwerk niet samengevoegd met dnaLadderHelix |
| polymeraseachter-polymerasevoor | bestaand, hoog | komvormige hand: palm onder de matrijs, duim links, drie vingers die over de nucleotide krullen; klem als dikke ring om het DNA | zelfde hand opgebouwd uit eiwitkralen, klem als ring van zes lobben | geen exonuclease/proofreading-domein |
| helicasering-primase-ligase | bestaand, hoog | helicase = zes lobben op een ringband (40° schuin, streng door het gat); primase met teal RNA-primer; ligase als hoefijzer over de naad | helicase als segment-donut met groot gat; primase als kralenketen; ligase als ring die om het DNA sluit (Pascal 2004) | `ligase` tekent nog in één laag (geen achter/voor) |
| vrijnucleotide-d2base-baseringrna | bestaand, hoog | RNA-tinten gelijkmatig (A echte lichte teal), kleine staafjes ≥ 3 px met rand | idem kleuren + trifosfaat dat als pyrofosfaat afbreekt (`pp`), mini-puzzelranden tot 3 px | C1 in de prompt niet aangepast (voorstel: 'RNA teal' in C1) |
| cdchromosoom-cdchromatide-cdeen-cdkluwen | bestaand, hoog | standaard paars (`CD.std`), herkomst licht/donker paars i.p.v. teal/oker; kluwen begint als lange losse draad (64 punten) | idem kleuren, chromatide als gevuld lint met insnoering bij het centromeer | cdKluwen niet letterlijk via kernChromatine (eigen draad, zelfde stijlregels) |
| cdcel-cdpool-cdkernmembraan-cddraad | bestaand, middel | dubbele membraanlijn (C.er) met kier, organellen op 35 % langs de rand (geclipt), trekdraad als bundel (`n`, standaard 3) | — | geen membraanBoog-fosfolipiden (te druk bij deze schaal) |
| mrnaSliert | nieuw | doorlopende dunne teal draad, stekels/puzzelbasen aan één kant, gouden codonboogjes, cap, poly-A, afbraak | kralenketting per nucleotide, codons door tussenruimte, kralen laten los bij afbraak | geen splicing; cap/poly-A-bron (§ 15.4) niet geopend |
| ribosoomEcht | nieuw | gladde subeenheden met uitsnede E-P-A, tunnel, vouwende keten, ER-stand (gebogen membraan), `polysoom()` | korrelige subeenheden (rRNA : eiwit = 2 : 1) | geen tRNA's in de plekken (combineer met trnaKlaverblad); stap-animatie = x per codon verschuiven |
| rnaPolymerase | nieuw | enzym achter het DNA, lokale bel ± 14 bp tussen twee helixen (dnaLadderHelix), 8-bp hybride, mRNA naar buiten; standen bind/open/lees/los | halfdoorzichtig enzym als kralenkluwen vóór het DNA | geen sigmafactor/transcriptiefactoren; promotor/terminator niet gemarkeerd |
| trnaKlaverblad | nieuw | stammen als ladders met gekleurde baseparen, lussen als kralen, morph klaverblad ↔ L, anticodon in puzzelvorm, aminozuur laden | gevuld teal silhouet (blad ↔ geknikte buis) | geen ElevenLabs-referentie gemaakt (bronnen volstonden) |

Gemeenschappelijk: geen JS-fouten in de console bij alle 37 renders; geen referentieplaten gemaakt (0 credits).

## Ronde 2 · variant C (27 okt 2026)

C = winnaar uit OORDEEL.json + herstel; `C.js` en `C.png` (zelfde uitsnede) per map. Eiwitten in het lintmodel `_grKluwen` (kopie in `_eiwitlint.js`, met `_lintVorm` = punt-in-veelhoek als vorm; eenmaal in lib_bio.js plakken, gelijk aan genregulatie/src/_kluwen2.js).

| Object | Winnaar | C = |
|---|---|---|
| basering | A | A + label 4' even groot als 1'–5' |
| chromatidex | A | ongewijzigd A. De kruising bij het centromeer is de metafase-X (zusters vast bij het centromeer, armen wijken); 'twee parallelle zusters' vraagt een andere stand, niet een fout — geen bron geopend die het anders zegt, dus niet veranderd |
| nucleosoomdraad | A | A + histonen als gevouwen lint op de schijf + N-terminale staarten over de windingen (Luger 1997) |
| dnaladderhelix | A | A + puzzelbasen met letters in de helix bij dx ≥ 60 (uit B) + lichtere, smallere rug (uit v2). **Niet linksdraaiend**: zie hieronder |
| vork | A | A met de C-eiwitten (helicasering, polymerase, primase, ligase als lint) |
| polymerase | A | komvormige hand van A met silhouet + per subdomein een lint (duim/vingers met de rijen in de lengte); achterwand rustig vlak |
| helicase/primase/ligase | B + A | zes lint-subeenheden op een schuin gezette ring (A) met donker gat (B); primase lint + RNA-primer; ligase hoefijzer-lint over de naad (A) |
| vrijnucleotide | oud + B | oude tinten en d2Base, plus trifosfaat → pyrofosfaat uit B (drijft niet meer uit beeld); 2 bronnen |
| kernchromatine | A + B | A + draadlengte naar baseparen, minder dicht, nucleolus met donkere kern, grotere poriën |
| cdchromosoom | A + oud | A + condensatiereeks draad → zichtbare dubbele helix → chromatide (oud) + sterker licht/donker paars |
| cdcel | A | A zonder korreldots + `cdAnafaseCel()`: echte anafase (scene gebruikt hem in het rechterbovenpaneel als hij bestaat) |
| mrnaSliert | A | A + echte kronkels (richting = som van sinussen, hoogte begrensd), duidelijker cap en poly-A |
| ribosoomEcht | A | A + keten die buiten de tunnel tot een lint vouwt (groeit met het aantal aminozuren; polysoom toont de reeks) |
| rnaPolymerase | A | A + lint-enzym (achterkant donker lint, niet in de bel; kaak en klep lint) + hybride als RNA-puzzelbasen met gouden paren |
| trnaKlaverblad | A | A + lussen als doorlopende streng met basen, aminozuur met zijgroep, in de L-vorm iets dikkere armen |

**Draairichting dnaLadderHelix (punt 3).** De beoordelaar vergist zich. In de code is een punt van streng 1 (x0 + i·dx, y0 − R·cos t) met diepte sin t (vóór als sin t ≥ 0) en t = 2π·i/10. Met y omhoog en z naar de kijker is dat (x, R cos t, R sin t) met x stijgend in t: een rechtsdraaiende helix (cyclische verwisseling van de standaard (cos t, sin t, c·t)). Bij een horizontale as lopen de voorste delen dan van linksboven naar rechtsonder (\\); de regel 'voorlangs linksonder → rechtsboven (/)' geldt voor een verticale as — draai het beeld 90° en het klopt. Groeven zijn ongelijk (tweede streng 140° achter: 140° tegen 220°); niet versterkt om het rustig te houden. Berekening ook in dnaladderhelix/bron.md.
