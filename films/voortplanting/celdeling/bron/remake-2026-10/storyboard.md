# Celdeling · storyboard lichte remake (fase 1, 25 okt 2026)

Bij `script_v2.md` (deze map). Per scène: id · cue-woord(en) · look · wat je ziet en hoe het beweegt (C8) · bibliotheek · nieuw. Keyframes in `keyframes/` (k = kernscène van het moeilijke proces, t = twijfelscène). Nieuwe tekeningen staan als objecten in `teken/teken_celdeling.js` (kandidaat voor `bibliotheek/lib_bio.js`), keyframepagina `teken/kf.html` (laadt lib.js, lib_voeding.js, lib_cast.js, lib_anatomie.js, lib_micro_evo.js en lib_bio.js uit dezelfde map; werkmap `/home/claude/werk/celdeling/kf/`), renderen met `teken/render.py`.

## Rode draad in beeld (nieuw)
- **Eén modelcel, 2n = 4**, de hele film door: lang paar en kort paar. Kleuren als in Chromosomen 2.1: **vaderskant teal (`C.teal`), moederskant oker (`C.oker`)**; de oude film had blauw/roze.
- **Ons paar** = het lange paar, met een dunne gouden rand (focus, C5) zodra de stem het noemt. Het is steeds hetzélfde chromosoom: van draad (s11) → dubbele draad (s09/s13) → X-vorm → metafase → anafase (één chromatide per pool) → dochtercel; in deel 2 weer: paar tegen elkaar → crossing-over → meiose I → meiose II → vier geslachtscellen, en in H6 naast elkaar.
- **Morph, geen wissel**: condenseren met `kernChromatine` (gekeurd), splitsen en slepen met de nieuwe `cdChromosoom` (zusters schuiven uiteen, centromeer gaat vóórop, armen slepen in een V). Insnoeren met `cdCel({insnoer})`.
- **DNA-grafiek loopt mee** (type C: tijd): rechtsboven een klein p-diagram dat met de cel meetekent in s09, s17, s20, s24, s25; geen losse grafiekdia meer.
- **Teller** linksboven bij tellingen: '4 chromosomen · 8 chromatiden' (model) naast '46 · 92' (mens).

## Scènes

| id | cue | look | wat je ziet en hoe het beweegt | bibliotheek | nieuw |
|---|---|---|---|---|---|
| s01 | 'één cel' → 'tientallen biljoenen' → 'twee meter' | Macro → Micro | bevruchte eicel deelt 2→4→8 (morph); doorlopende zoom uit naar Noor; bij 'twee meter' zoomcirkel naar een kern, DNA rolt uit naast Noor (schaal voelbaar, C8) | `eicelEcht`, `persoon('noor')`, `kernChromatine`, `dnaDraad` | — |
| q02 | vraagkaart | Schema | standaard | speler | — |
| s03 | titel | Schema | titel + delende modelcel | `cdCel` | — |
| s04 | 'groeien' / 'schaafwond' / 'Onderin je huid' / 'beenmerg' | Micro | Noors onderarm (Chromosomen) → zoomcirkel huid → basale laag met cel in deling; bovenaan schilferen dode cellen af; bij 'beenmerg' eigen paneel met rode bloedcellen, teller 2 000 000/s | `onderarm`, `huidDoorsnede` (deling), `rodeBloedcel` | — |
| s05 | 'eencellige' / 'diffusie' / 'deelt in tweeën' | Micro | eencellige (pantoffeldiertje-achtig, met kern) deelt; daarna groeiende cel met O₂-deeltjes die het midden te laat bereiken (simulatie uit Diffusie), cel snoert in | `cdCel`, deeltjes | eencellige met kern (eenvoudig) |
| s06 | 'celcyclus' / 'interfase' / 'mitose' / 'cytokinese' / 'een dag' / 'een uur' | Schema-ring + Micro | ring met de cel in het midden die meegroeit; wijzer loopt rond (klok, type C); boog mitose ≈ 1/24 van de ring | `cycleRing` (oude film, opnieuw getekend in Part C) | — |
| q07 | vraagkaart | Schema | — | — | — |
| s08 | 'interfase' | Schema-ring | interfase-boog licht op | idem | — |
| s09 | 'S-fase' / 'dubbele draad' | Micro | in de kern verdubbelt één teal draad (morph: draad splijt tot twee naast elkaar); p-grafiek tekent p → 2p | `kernChromatine` (c = 0), `dnaDraad` | — |
| s10 vwo | 'controlepunten' | Schema-ring | drie lampjes op de ring (eind G1, G2→M, metafase) gaan van oranje naar groen | `cycleRing` | — |
| s11 | 'chromatine' / 'zesenveertig' / 'vader' / 'moeder' / 'homologe' | Micro | kern met 46 territoria (paars), twee draden lichten op in teal en oker | `kernChromatine` (`kleuren`) | — |
| s12 | 'autosomen' / 'XX' / 'XY' | Schema | mini-karyogram uit Chromosomen (alleen de paren 22, X, Y uitgelicht), 3 s | karyogramindeling uit `teken_chr1.js` | — |
| s13 | 'rolt … op' / 'chromatiden' / 'centromeer' / 'X-vorm' / 'twee soorten twee' | Micro | **k1**: dezelfde draden condenseren (c 0 → 1); daarna het lange paar groot: twee X-vormen; bij 'twee soorten twee' haak onder het paar ('paar = 2 chromosomen') en haak onder één X ('1 chromosoom = 2 chromatiden') | `kernChromatine`, `chromatideX` → `cdChromosoom` | `cdChromosoom` |
| q14 | vraagkaart met de modelcel | Schema | — | — | — |
| s15 | 'centromeren' / 'modelcel' / 'zesenveertig' | Micro | centromeren tellen met gouden stip 1–4; teller 4 · 8 naast 46 · 92 | `cdChromosoom` | — |
| s16 | 'één paar' / 'Profase' / 'trekdraden' / 'kernmembraan' / 'Metafase' / 'equatorvlak' | Micro | **k2**: één doorlopende scène: kernmembraan valt in blaasjes uiteen (morph), polen schuiven naar de uiteinden, draden groeien en haken aan, chromosomen schommelen naar het midden (ease, kleine overshoot, C8) | `kernChromatine` (membraan → 0), `cdCel`, `cdPool`, `cdDraad` | `cdCel`, `cdPool`, `cdDraad` |
| e01 extra | 'eiwitplaatjes' / 'spanning' / 'dezelfde pool' / 'wachtsignaal' / 'cohesine' / 'gif' | Micro | ingezoomd op ons lange chromosoom (doorlopende zoom vanuit k2); kinetochoren; centromeer rekt bij spanning; foute verbinding laat los; los kinetochoor knippert koraal; okerringen worden doorgeknipt | `cdChromosoom` (`kin`, `ringen`) | trekdraad als rijtje eiwitblokjes (uit oude `fibres`, opnieuw) |
| e03 extra | 'wachtsignaal' / 'korter' | Micro | alle kinetochoren los → overzichtscel met koraal lampjes; trekdraad breekt blokje voor blokje af bij het kinetochoor | idem | — |
| s17 | 'Anafase' / 'Kijk naar ons paar' / 'tweeënnegentig' / 'Telofase' / 'cytokinese' / 'celplaat' | Micro | **k3**: centromeren splitsen, chromatiden gaan met het centromeer vóórop naar de polen, armen slepen (V); ons paar houdt de gouden rand: één teal chromatide links, één rechts, idem oker; teller 92; kernmembraan vormt zich, chromosomen ontrollen; cel snoert in (morph); bij 'celplaat' klein paneel plantencel met groeiende celplaat | `cdChromosoom` (`uiteen`, `dxL/R`, `zwaai`), `cdCel` (`insnoer`), `cellWall` | plantencel-paneel (eenvoudig) |
| q18 | vraagkaart | Schema | — | — | — |
| s19 | 'zesenveertig' | Micro | twee dochtercellen, elk met teal + oker van elk paar | idem | — |
| s20 | 'p' / 'twee p' / 'weer p' / 'genetisch gelijk' | Schema | p-grafiek groot, de modelcel loopt als icoontje langs de lijn | grafiek (nieuw in Part C) | — |
| v01 | 'klonen' / 'eencellige' / 'Gist' / 'uitlopers' / 'bladluis' / 'meiose' | Macro/Schema | ouder → klonen in goud; vier panelen die één voor één opbouwen: eencellige, gist met knop, aardbeiplant met uitloper (vast aan de plant, C10.6), bladluis met jong; laatste zin: overgang naar deel 2 | oude `vpEencellige`, `vpKnop`, `vpAardbei`, `vpLuis` (nalopen tegen C10.6: bladluis zes poten, drie lichaamsdelen) | gist zonder poliep |
| kaart H5 | 'Deel 2 · Meiose' | Schema | **t1**: hoofdstukkaart met 'deel 2' en 'deel 1 ✓' | speler | deelkop in hoofdstukmenu |
| s21 | 'zaadcel' / 'tweeënnegentig' / 'diploïd' / 'haploïd' | Schema | zaadcel en eicel met elk 4 chromosomen → zygote met 8 (koraal = fout); dan juist: elk 2 → 4 | `zaadcelEcht`, `eicelEcht` | — |
| s22 | 'teelballen' / 'eierstokken' / 'reductiedeling' / 'één keer gekopieerd' | Macro → Micro | Rachid en Linda met kijkje in de buik (zoals 1.4), zoomcirkel naar een cel in de teelbal | `kijkjeRepro` (oude film), `persoon`, `testes`, `anRepro` | — |
| s23 | 'lange paar' / 'tegen elkaar' / 'crossing-over' / 'Kijk' / 'minstens één keer' / 'als paren' / 'uit elkaar' | Micro | **k4**: de twee homologen schuiven tegen elkaar (vier chromatiden), de twee binnenste kruisen (chiasma, gouden ring), stukken wisselen van kleur (morph langs de chromatide); daarna liggen de paren als paren in het equatorvlak en gaan uit elkaar | `cdChromatide`, `cdChromosoom` (`segsL/R`) | crossing-over-morph |
| q23 | vraagkaart | Schema | — | — | — |
| s24 | 'drieëntwintig' / 'meiose twee' / 'vier zaadcellen' / 'scheef' / 'één grote eicel' | Micro | twee cellen met elk 1 lang + 1 kort chromosoom (X-vorm, gemengd); meiose II splitst chromatiden; vier zaadcellen; daarnaast eicellijn: grote eicel + kleine poollichaampjes | `cdChromosoom`, `zaadcelEcht`, `eicelEcht` | poollichaampje (klein cdCel) |
| x01 extra | 'Linda' / 'oma Ria' / 'eierstokken' / 'stopten' / 'zevenentwintig' | Macro/Schema | **t2**: tijdlijn: Ria zwanger (outfit `vroeger`) → Linda 27 → Noor 16; balk 'meiose I staat stil' | `persoon('ria','linda','noor')`, `eicelEcht` | — |
| xq extra | vraagkaart | Schema | — | — | — |
| x02 extra | 'poollichaampje' / 'meiose twee' / 'zaadcel' / 'cohesine' / 'slijten' | Micro | oöcyt maakt meiose I af (poollichaampje), stopt in metafase II; okerringen langs ons paar worden dunner | `eicelEcht`, `cdChromosoom` (`ringen`) | — |
| s25 | 'p' / 'twee p' / 'half p' | Schema | p-grafiek van de meiose naast die van de mitose | grafiek | — |
| s26 | 'toeval' / 'acht miljoen' / 'mengeling' / 'n en n' | Schema | twee paren met 4 mogelijke verdelingen (2² in het model), teller springt naar 2²³ ≈ 8 388 608; zaadcel + eicel → 2n | `cdChromosoom` | — |
| v02 | 'twee ouders' / 'zygote' / 'verschillen' / 'ziekte' / 'variatie' | Macro | Rachid en Linda, Noor en Teun ernaast (elk andere mix van teal/oker-staafjes); dan vergelijkingsbalk ongeslachtelijk/geslachtelijk met een ziekte die gelijke klonen allemaal treft en een paar varianten laat staan | `persoon`, CAST_FAMILIE | — |
| s27 | 'naast elkaar' | Schema | **k5**: drie metafasen met hetzelfde lange paar (eindversie: in de mitose alle vier de chromosomen) | `cdChromosoom` | — |
| q28 | vraagkaart | Schema | — | — | — |
| s29 | 'Mitose:' / 'Meiose:' / 'niet gewoon twee keer' | Schema | vergelijkingstabel bouwt op naast de panelen | — | — |
| s30 vwo | 'remmen' / 'tumor' / 'non-disjunctie' / 'vierentwintig' | Schema/Micro | rem-lampjes op de ring; cellen stapelen; anafase I met ons paar dat niet uit elkaar gaat (beide naar links) | `cdChromosoom` | — |
| s32 vwo | 'zevenenveertig' / 'eenentwintig' | Schema | teller 47; drie staafjes chr 21 | — | — |
| s33 | 'vraag van het begin' / 'interfase' / 'mitose' / 'meiose' | Schema | vier panelen die met de stem oplichten (bestaande opbouw) | — | — |
| q34 / s35 | 'huidcel' / 'zaadcel' | Micro | huidcel (paars, niet koraal) naast zaadcel met teller 46 / 23 | `huidDoorsnede`, `zaadcelEcht` | — |
| s36 | eindkaart | Schema | drie zinnen met annotatiehaak | speler | — |

**Aantal scènes:** 33 gesproken alinea's + 10 vraagkaarten + titel + eindkaart + 7 hoofdstukkaarten. Keyframes: 5 kernscènes (k1–k5), 2 twijfelscènes (t1, t2).
**Speler:** overnemen van `films/gedrag/5-emotieregulatie/bron/src/player.js` (actueel), uitgebreid met het niveau `extra` (okerbalk) uit `../src/player.js` van deze film, en een deelkop in het hoofdstukmenu.
