# Geschiedenis van de biologie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/extra/geschiedenis-van-de-biologie.html (audio in films/extra/geschiedenis-van-de-biologie/audio/) |
| Reeks | Nieuwsgierig? (hoofdstuk `extra`, buiten het PTA) · geschiedenis van de biologie |
| Niveau | havo · vwo, één niveau (`alleen: "havo · vwo"`, geen vwo-blokken; de Havo/Vwo-knop is verborgen) |
| Versie / datum | 1.1 · 22 oktober 2026 (1.0 · 20 oktober 2026) |
| Prompt | onbekend · gemaakt 22 okt |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow rgmUuvSL6zMsLmaQnt6F; stem-invoer met respellings in `segments.json` (veld `voice`) en `stem/voice.json`; film-eigen regels in `uitspraak_film.json` |
| Duur | spraak 12:19 (23 takes); speeltijd 13:51 met vragen (zonder wachten), 12:16 met Vragen uit; `duur` 14 in HOOFDSTUKKEN |
| Beeldstijl | Part C: Schema (tijdlijn, mensen en samenleving) |
| Personages | Noor (castboek) in de cold open en als 'de mens' op de ladder, in het primatenpaneel en in het voedselweb; onderzoekers als vlakke castboekfiguren met tijdskenmerk en attribuut (geen portretten), toegevoegd aan `CAST` in `scenes_lib.js` (`hist()`), sinds v1.1 ook Gosling, Wilkins, Florey, Chain en Heatley; anonieme mensen uit het verleden in dezelfde stijl met kleding uit hun tijd (`rs1–3` Royal Society met pruik en bef, `arts1–3` Weense artsen, `vader19`/`moeder19`/`kind19`/`helpster19`/`oude19` in s16); mensen van nu uit het castboek: Teun (`kind`) in s28, twee baby's (`baby`) als tweeling in s26 |
| Audio-opslag | 23 losse mp3's in audio/ (s01, s04–s07, s09–s13, s15–s18, s20–s26, s28, s29), loudnorm −15 LUFS |
| Herkomst | Hoofdengine (straat van Ecologie 4 / hormonen, `hw/engine`), werkmap `hw/gs1`; gebouwd met Claude op verzoek van Kamiel (video over de geschiedenis van de biologie) |

## Rode draad
1. **Methode**: hoe kom je achter iets nieuws, als bijna iedereen iets anders gelooft? Zelf kijken, meten, laten nadoen (Hooke doet Van Leeuwenhoek na; Vesalius, Harvey, Snow, Pasteur).
2. **Mensbeeld en samenleving**: van de top van de ladder (Aristoteles) via de primaten (Linnaeus) en de stamboom (Darwin) naar een plek in het voedselweb (Carson): de mens is geen middelpunt. Tegelijk steeds meer macht over leven (hygiëne, antibiotica, DDT, CRISPR).
3. **Eerlijke kanttekeningen**: Ibn al-Nafis, Wallace, Mendel, Heatley, Franklin/Gosling (erkenning); Linnaeus' indeling, sociaal-darwinisme en eugenetica (misbruik); embryo's veranderen (ethiek).

Terugkerend beeld: de tijdlijn bovenin (niet-lineair: oudheid samengedrukt, 1500–2030 lineair; goud = deel van dit hoofdstuk, gouden stip = huidig jaar).

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Noor aan de microscoop, zoomcirkel druppel slootwater; Londen (Royal Society, figuren met pruik) en Delft (lakenhandelaar), brief vliegt naar Londen; lenzen geheim. q02 (antwoord in H1) |
| H1 Kijk zelf | s04–s07, q08, s09 | Royal Society probeert, kruis; Hooke 1677 met microscoop en druppel, vink; Delft ✓ Londen ✓ + haak 'wat jij ziet…'; boekenstapel. Aristoteles + inktvis + ladder; Galenus + aap + varken, lever → organen; Vesalius met anatomisch boek (skelet), boek Galenus met kruisen, onderkaak mens/hond; Harvey + hart + som. Antwoord: balken 5 l / 300 l, bloedsomloop (longen/lichaam, stromende deeltjes), zoomcirkel haarvaten Malpighi, Ibn al-Nafis met tulband |
| H2 Een wereld in een druppel | s10–s12 | Hooke + microscoop + kurk (zoomcirkel); Van Leeuwenhoek met lensje, bacteriën, zaadcellen, rode bloedcellen; Linnaeus met Linnaea, kaart 'Homo sapiens', ladder → mens springt in het paneel 'primaten', citaat Gmelin-brief; vier neutrale figuren met vooroordeelkaartjes (inhoud bewust onleesbaar), 'geen waarneming, maar vooroordeel' |
| H3 Waar komen we vandaan? | s13, q14, s15–s17 | Beagle over golven; Darwin, vinken met snavelvariatie (selectie, jongen); Wallace met vlinder, brief, '1858 samen voorgelezen', boek 1859; ladder → stamboom met gouden takje 'mens'. Sociaal-darwinisme (citaat doorgestreept, 'passen'), Galton 1883, panelen VS en nazi-Duitsland, tweedeling natuur / hoe we omgaan. Mendel, erwtenplanten, erwten 3 : 1, A/a, 1866 → 1900 Hugo de Vries |
| H4 Onzichtbare vijanden | s18, q19, s20–s23 | stankwolken (miasma), Semmelweis, twee afdelingen met sterftebalken (± 10 % / ± 3 %); snijtafel → hand met kiemen → kraambed, wasbak chloorkalk, balk 10 → 2 %; artsen geloven hem niet. Snow: kaart met doden rond de pomp, hendel weg, grafiekje 'nam al af'. Pasteur: zwanenhalsfles (stof in de bocht, kantelen → troebel), spuit 1885, Jenner 1796. Fleming: petrischaal met schimmel en heldere kring, Oxford-team (medailles Florey en Chain, Heatley zonder) |
| H5 Leven veranderen | s24–s26, q27, s28 | Franklin + Gosling + foto 51 (kruis), foto naar collega (Wilkins) en Watson, helix, Crick, medailles, Franklin gedimd → erkenning. Vliegtuigje met DDT, Carson met Silent Spring, keten water–plankton–vis–roofvogel met oplopende stipjes, ei met dunne schaal, 1972; voedselweb met de mens middenin. Charpentier en Doudna, DNA-streng met schaar, patiënt (alleen bloedcellen) vs embryo (alle cellen, tweeling); antwoord met drie generaties |
| Recap | s29 | hele tijdlijn; Vesalius, Harvey, Snow, Pasteur met attribuut; ladder → stamboom → voedselweb; erkenning (Ibn al-Nafis, Wallace, Franklin) en misbruik (Galton) |
| Eindkaart | s30 | drie regels + haak 'welke ontdekking veranderde volgens jou het meest, en waarom?' |

## Vragen
- q02: wat deed de Royal Society met de brief? a geloofden hem op zijn woord · **b probeerden het zelf na te doen** · c lachten hem uit
- q08: hoeveel bloed pompt het hart per uur (Harvey)? a ± 1 liter · **b veel meer bloed dan er in je hele lichaam zit** · c bijna niets (kachel)
- q14: waarom publiceerde Darwin ineens? **a een andere onderzoeker stuurde hetzelfde idee** · b fossiel aap-mens · c toestemming kerk
- q19: verschil tussen de afdelingen in Wenen? **a artsen kwamen van het onderzoek aan lijken** · b slechtere lucht · c ziekste vrouwen
- q27: verschil CRISPR bij patiënt en embryo? **a bij een embryo erven alle latere generaties de verandering** · b werkt niet bij embryo · c geen verschil

## Begrippen
replicatie (herhalen), ladder van de natuur, bloedsomloop, cel, tweedelige naam, primaten, natuurlijke selectie, sociaal-darwinisme, eugenetica, spontane generatie, kraamvrouwenkoorts, antibioticum, resistentie, dubbele helix, ophoping in de voedselketen, CRISPR-Cas9, kiembaan — zie `film.json` → glossary.

## Docentdeel en bronnen
In `sections.html`: 5 checkvragen (replicatie, Harvey, Semmelweis als vergelijkend onderzoek, sociaal-darwinisme, kiembaan), hoe de film het uitlegt, achtergrond met alle jaartallen en getallen, bronnenlijst, leerdoelen, lessuggesties. Gecontroleerd met (20 okt 2026):
- Van Leeuwenhoek: lensonleeuwenhoek.net (1677, to confirm his observations); micro.magnet.fsu.edu (microscopen, 1680 Royal Society)
- Harvey: Stanford History 13 reading (De motu cordis); Galenus: bertie.ccsu.edu (Galen's physiological system), Britannica; Ibn al-Nafis: Wikipedia
- Vesalius: Wikipedia De humani corporis fabrica; Aristoteles: TheCollector; Hooke: Springer Nature Communities (why cells)
- Linnaeus: Wikipedia Carl Linnaeus en 10th edition Systema Naturae
- Darwin/Wallace: Wikipedia Wallace; Cambridge University Library Darwin timeline; 1860 Oxford debate (Wikipedia)
- Galton: Embryo Project (ASU); eugenetica VS: The New Atlantis 'Sterile thinking'
- Mendel, Semmelweis, Broad Street, spontane generatie, penicilline, Silent Spring: Wikipedia; Pasteur: Institut Pasteur (final years 1877–1887)
- Fleming-citaat 1945: VUMC Lacy lab; Photo 51: PBS NOVA; eierschalen: JSTOR Daily
- CRISPR: nobelprize.org persbericht 2020; He Jiankui: NPR (dec 2019); Casgevy: Scientific American (nov 2023)
- Niet geopend (permissie verlopen): nobelprize.org-lezing Fleming (pdf); citaat via VUMC.

## Uitspraak
Zie `uitspraak.md`. Film-eigen stem-invoer: Hooke → Hoek, CRISPR → krisper, erwten → erten, 51 → eenenvijftig. Blind gecontroleerd (Scribe op de losse audio, niet aan de tekst gekoppeld): s09, s15, s22, s26 — alle namen goed terug. Overige namen op de wachtlijst voor Kamiels luisterronde.

## Waar wat in de HTML zit (regelnummers uit `film.src.html`, `python3 scripts/filmbron.py uitpakken`)
- regel 70: sitebalk (← Terug naar Nieuwsgierig?, naar index.html#extra)
- regel 101: checkvragen en docentdeel (uit `sections.html`)
- regel 183: licentievermelding (`data-licentie`)
- regel 184: `window.FILMDATA`
- regel 1500: `tijdlijn()` (TL, `tlx()`, MARK = de markeringen); regel 1513: `viaOff()`/`fig()` (figuren dimmen via een eigen canvas); regel 1542: `NAMEN`; regel 1544: `geleerde()` (castfiguur + pruik, plooikraag, tulband, toga, strik + naam en jaar)
- regel 1557 e.v.: objecten (`microscoop`, `lensje`, `druppelInhoud`, `brief`, `ladder`, `kaak`, `hart`, `kurk`, `schip`, `vink`, `stamboom`, `erwtenplant`, `pomp`, `zwanenhals`, `petrischaal`, `foto51`, `helix`, `voedselweb`, …); regel 1642 e.v.: `skelet`, `openBoek`, `groepje`, `stank`, `balk`, `kaartSnow`, `oxfordTeam`
- regel 1669: `const SCENES` (title, s01 1673, s04 1688, s05 1696, s06 1706, s07 1715, s09 1720, s10 1734, s11 1742, s12 1753, s13 1760, s15 1769, s16 1781, s17 1792, s18 1802, s20 1811, s21 1820, s22 1827, s23 1834, s24 1842, s25 1852, s26 1860, s28 1866, s29 1873)
- regel 1887 e.v.: speler (snelheid, Vragen aan/uit, spelerfix 20 okt: knipmarge, demping, CARD_DUR 1,3 s)
- regel 2070: oefeningen (`data-oefenen`, data in `geschiedenis-van-de-biologie/oefenen.json`)

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/gs1` (`scenes_lib.js` + `scenes_main.js` → `scenes.js`; `words/` = `stem/woordtijden/`; `film/geschiedenis-van-de-biologie/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*` (zelfde als `hw/engine`).
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py gs1 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `fetch_flow.py` → `engine/align.py` → `python3 film.py` → `engine/build_data.py gs1` → `engine/build.py gs1` → `bash pack.sh gs1 geschiedenis-van-de-biologie extra` → `python3 scripts/spelerfix.py films/extra/geschiedenis-van-de-biologie.html` en de scripts uit CLAUDE.md.
- beeld: `scenes_lib.js` of `scenes_main.js` → `cat scenes_lib.js scenes_main.js > scenes.js` → `python3 cuecheck.py gs1` → `engine/build.py gs1` → pack.
- Deelwoord-cues (q.on vindt het n-de woord dat de tekst bevat): s05 'duizend' n = 2 (eerst 'tweeduizend'); s06 'hond' n = 2 ('honderden'), 'les' n = 2 ('alles'); s09 'pomp' n = 2 ('pompt'); s21 'water' n = 2 ('waterpomp'), 'uitbraak' n = 1 = "De uitbraak nam toen al af"; s22 'Leven' n = 2 ('bleven'); s28 'cel' n = 5 (bloedcellen, cellen, eicellen, zaadcellen); s29 'zelf' n = 2 ('dezelfde'), 'weten' n = 2 ('wetenschap'); s18 'artsen' n = 2.

## Aandachtspunten
- Feiten en getallen zijn afgerond ('ongeveer', '±'); het Linnaeus-citaat is vereenvoudigd (brief aan Gmelin, 1747); de 'ladder' is een vereenvoudiging van Aristoteles' rangorde.
- Linnaeus' karaktertrekken per groep worden bewust niet getoond of uitgesproken.
- Niet herhaald als hoofdthema: evolutie (Evolutie-reeks), kruisingen (Erfelijkheid), DNA-replicatie en CRISPR-techniek (DNA 2 en 7), ophoping (Ecologie 3). Alleen het historische verhaal en de gevolgen.
- Credits ElevenLabs: TTS 10.607 credits (23 takes), Scribe woordtijden 0 credits (gekoppeld), blinde controle 792 credits (4 alinea's).

## Wijzigingen
- 1.0 (20 okt 2026): eerste versie. Script v1 → twee reviews (`reviews/review_v1.md`) → v2; beeld na twee rondes contactsheets.
- 1.1 (22 okt 2026): geen grijze poppetjes meer (BEELDAFSPRAKEN, Personages). Alleen beeld; audio, timing, tekst en ondertitels ongewijzigd. Castboek in `src/lib_cast.js` bijgewerkt naar de actuele `personages/lib_cast.js`; het scèneblok in de HTML is exact vervangen (lib_cast + scenes_lib + scenes_main), nabewerkingen bleven staan.
  - s01/s04: de geleerden van de Royal Society = drie figuren met lange pruik, jas en witte bef (`royalSociety()`); in s04 kijken ze bezorgd/schouderophalend als het niet lukt.
  - s11, s05/s15/s29 (ladder), s25/s29 (voedselweb): 'de mens' = Noor i.p.v. een goud poppetje.
  - s12 (Linnaeus' indeling van de mens): bewust **geen mensfiguren** (risico op stereotypen). In plaats daarvan Linnaeus wijzend naar vier vergeelde kaarten uit *Systema Naturae* ('Homo sapiens' + werelddeel, karaktertrekken als onleesbare rode krabbels); bij 'geen waarneming, maar vooroordeel' worden de kaarten gedimd en komt er een stempel ACHTERHAALD overheen.
  - s16 (sociaal-darwinisme): links een gewoon arm gezin uit de 19e eeuw (vader, moeder, kind; eenvoudige nette kleding, neutrale gezichten, geen karikatuur), rechts een helpster die een oudere man ondersteunt; ze verdwijnen als 'Bij Darwin gaat het om passen' verschijnt. Aan het eind (hoe we met elkaar omgaan) dezelfde helpster en oude man, blij.
  - s20: de artsen die Semmelweis niet geloofden = drie Weense artsen (geklede jas, strikje, baard), afwijzend (handen op de heup, schouders, wijzen).
  - s23: Oxford-team Florey (jasje), Chain (labjas, snor, krullen), Heatley (labjas); medailles bij Florey en Chain, kruis bij Heatley.
  - s24: Gosling naast Franklin (links, jasje), de collega (Wilkins) met bril; medailles op één hoogte boven de hoofden.
  - s26: de tweeling = twee baby's uit het castboek in een paarse gloed; s28: 'kind' = Teun.

