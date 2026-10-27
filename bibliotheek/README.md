# Gedeelde tekenbibliotheek (`lib_bio.js`)

**Dieren** (uitknippoppen, goedgekeurd 23 okt 2026): zie `dieren/README.md` (`dieren/lib_dieren.js`, testvel `dieren/testvel.html`).

Tekenrecepten volgens prompt uitlegfilms v8, C9: elk object is eerst opgezocht (verhoudingen, bron), het recept staat als commentaar boven de functie, met de bekende fouten. Goedgekeurde objecten worden alleen nog hergebruikt.

- **Gebruik in een film:** kopieer `lib_bio.js` naar `bron/src/` en plak hem na `lib_cast.js` in de pagina (in `bouw/build.py` bij `/*LIBSERIES*/`). Vereist uit lib.js: `C`, `rgba`, `lighten`, `hash`, `clamp`, `lerp`, `ease`, `shape`, `roundRect`, `text`; de molecuulfuncties ook `V`, `hexagon`, `bead`, `wander` (lib_voeding.js) en `nucleus`/`mitochondrion` (lib.js).
- **Testvel:** `testvel.html` (niet gelinkt, noindex) tekent alle objecten naast elkaar. Nieuwe objecten eerst hier samen bekijken (C9).
- **Bijwerken:** pas het bestand hier aan en kopieer het naar de films die het gebruiken; noteer de wijziging in hun `bron/info.md`.
- **Oude versies altijd bewaren** (Kamiel 27 okt 2026: 'voor als de nieuwe slechter zijn'): vóór een verbeterronde gaat een kopie van de bibliotheken en de stills naar `oud/<datum>/` (eerste: `oud/2026-10-27/`, zie LEESMIJ daar). Een object terugzetten = de functie uit die kopie terugplakken.
- **Verbeterronde** (Kamiel 27 okt 2026): per object varianten A/B (twee echt verschillende aanpakken), een blinde beoordelaar die oud, A en B als X/Y/Z ziet zonder te weten welke welke is, combineren als de winnaar nipt wint, en daarna kiest Kamiel zelf tussen alle opties (keuringsblad); pas zijn keuze gaat de bibliotheek in.

| Functie | Wat | Eerst gebruikt |
|---|---|---|
| `hoofdHersenen` | hoofd in mediane doorsnede met grote/kleine hersenen, hersenbalk, thalamus, hersenstam, hypothalamus, hypofyse in het Turkse zadel | Geslachtsorganen en puberteit 1.1 |
| `bloedvat`, `rodeBloedcel` | bloedvat met stroom, rode bloedcellen (ingedeukte schijf) en meestromende deeltjes; haarvat met cellen één voor één | idem |
| `zenuwcel` | cellichaam met kern, vertakte dendrieten, één axon met synapsknopjes, optioneel een impuls | idem |
| `vetcel`, `vetweefsel` | vetcel met grote vetdruppel en kern tegen de rand; weefsel als Voronoi-cellen met haarvat | idem, Wat zit er in je eten? 1.1 |
| `zaadcelEcht` | kop met acrosoom, middenstuk, staart ± 10× de kop, golf van kop naar staart | Geslachtsorganen en puberteit 1.1 |
| `eicelEcht`, `follikel`, `eierstokDoorsnede` | eicel met zona en stralenkrans; follikelrijping tot Graafse follikel; eierstok met schors, merg, eisprong, geel lichaam | idem |
| `baarmoederwand` | spierlaag, basale en functionele laag met klieren en spiraalslagaders; afstoten bij de menstruatie | idem |
| `zetmeelSpiraal`, `celluloseBundel` | amylose als spiraal (afwikkelen, losse glucose); cellulose als evenwijdige ketens met waterstofbruggen | Wat zit er in je eten? 1.1 |
| `eiwitVouw` | kralenketen die vouwt tot helices + haarspeld (≥ 44 kralen voor de hele vorm) | idem |
| `membraanBoog`, `celRond` | fosfolipide-dubbellaag langs een boog met eiwit; ronde cel met kern en mitochondriën | idem |
| `grutto` | rosse grutto in vlucht met echte vleugelslag | idem |
| `spierVezel`, `spierBundel` | skeletspiervezel met dwarsstrepen en kernen aan de rand | idem |
| `leverVoor` | lever in vooraanzicht met galblaas | idem |
| `darmwand`, `enzymKluwen` | darmwand in lagen met peristaltiek; enzym met actieve plek | idem |
| `echoBeeld` | echo van ± 20 weken in de waaiervorm: profiel, schedel, wervelkolom, armpje, kloppend hart (oplichten per deel) | Sekse, gender en diversiteit 1.1 |
| `embryoEcht` | embryo van ± 6 weken (Carnegie 15–17): kieuwbogen, oog, hartbult, arm- en beenknop, somieten, staartje, aanleg geslachtsklier | idem |
| `zaadbalDoorsnede` | zaadbal met kapsel, tussenschotten, zaadbuisjes (wand met zaadcellen in wording, staartjes) en Leydigcellen | idem |
| `nierBijnier` | nier met schors, piramides, bekken, vaten en urineleider; bijnier als kapje met schors en merg | idem |
| `kipEcht`, `zeeschildpad`, `schildpadNest`, `krokodilEcht` | leghen, onechte karetschildpad (bovenaanzicht) met nest, nijlkrokodil (zijaanzicht) | idem |

| `zaadbalWeefsel` | zaadbal in doorsnede: ronde zaadbuisjes met Sertolicellen en alle stadia van zaadcelvorming, Leydigcellen bij een haarvat; testosteron en inhibine als deeltjes | Van bevruchting tot baby 2.5 |
| `tHelperCel`, `hivVirus` | T-helpercel met grote kern en CD4-receptoren; hiv met envelop, gp120-spikes, kegelvormige capside met RNA, versmelten met het membraan | idem |
| `bacterieCel` | staafbacterie met celwand, membraan, DNA-lus en ribosomen; antibiotica laten de wand openbreken | idem |
| `aanlegGeslacht` | aanleg van de geslachtsorganen (week 6–7): gonaden, buizen van Wolff en Müller; vloeiende overgang naar man of vrouw | idem |
| `eileiderLangs` | eileider in lengtedoorsnede: trechter met franjes, geplooid slijmvlies, trilharen die naar de baarmoeder slaan; ontsteking en litteken | idem |
| `zwangerschapstest` | teststaafje met lontje, venster, test- en controlestreep; natte front loopt mee | idem |
| `placentaDoorsnede`, `vlokVergroot` | placenta met navelstreng, vlokbomen, meren van moederbloed en spiraalslagaders; één vlok vergroot met de dunne laag tussen moeder- en kindbloed | idem |
| `eileiderDoorsnede` | tweede eileider-variant (lengtedoorsnede op een as, geeft `lumen(u)` terug): smal bij de baarmoeder, wijd naar de trechter met franjes; geplooid slijmvlies met trilharen; ontsteking en littekens die het lumen dichtknijpen | Anticonceptie, soa's en voortplantingstechniek 1.1 |
| `gonokok`, `chlamydiaCel`, `spirocheet`, `bacterieGroot` | gonorroe als diplokok, chlamydia in een lichaamscel, syfilis als spirocheet; `bacterieGroot` = staafbacterie met celwand, ribosomen, DNA-lus en plasmide (lijkt op `bacterieCel`) | idem |
| `blastocyste` | blastocyste dag 5: platte buitenlaag (trofoblast), binnenste celmassa aan één kant, holte; `gat` = cellen weggenomen (PGT) | idem |
| `huidDoorsnede` | dunne huid in doorsnede: hoornlaag, korrellaag, stekelcellaag, basale laag met delende cel en pigmentcellen (uitlopers, melaninekapjes; `mel` 0 = albinisme … 1,6 = na zon), golvende basaalmembraan, lederhuid met haarvatlussen; `um` = breedte in micrometer | Chromosomen v2 (gekeurd 25 okt 2026) |
| `kernChromatine`, `chromatideX` | celkern met dubbel membraan; chromatine als losse draden per chromosoomgebied die met `c` 0 → 1 condenseren tot X-chromosomen (lengtes naar baseparen, `CHROM_MB`); losse X met zusterchromatiden en centromeer. Vereist `dnaDraad` (lib_micro_evo.js) | idem |
| `nucleosoomDraad` | DNA-dubbelhelix (dnaDraad) die ± 1,65 keer om histon-schijven windt, linker-DNA ertussen, op schaal (2 nm / 11 nm) | idem |
| `onderarm` | onderarm + hand van boven van een castpersonage (huid uit `CAST`), `bruin` (zon, bruiningsgrens bij de mouw) of `rood` (verbranding) | idem |

| `baseRing`, `baseBruggen`, `nucleotideRing`, `dnaLadderHelix` (+ kleuren `DNA_BASE`) | basevorm van de DNA-reeks (staafje met puzzelrand sinds 27 okt 2026: A punt ↔ T inkeping, C nok ↔ G sleuf; bindingsplekken, waterstofbruggen; geen ringen); nucleotide met genummerde suiker; ladder die als morph een rechtsdraaiende helix wordt | Wat is DNA? 3.0 (gekeurd 25 okt 2026) |

| `hormDeeltje`, `hypofysePoort`, `manDoorsnede`, `penisDoorsnede`, `vulvaSchema`, `schaalStreep` | hormoon met vaste vorm en kleur (GnRH goud, FSH teal, LH groen, steroïden paars; `volg` = gouden ring); hypothalamus met GnRH-cellen, bloedvaatjes in het steeltje (poortaders) en voorkwab die FSH/LH maakt; mannelijke organen in mediane doorsnede op schaal (1 cm = 14 px × s) met de echte route van de zaadleider (`route`, `naam`, `P`), kringspier, zwellichamen; penis in dwarsdoorsnede (rust → vol bloed); vulva als vlak schema. Vereist hormoonVorm (lib_hormonen.js). Status: in de film, wacht op keuring | Geslachtsorganen en puberteit 2.0 |

Registratie en lessen van de chromosoomrecepten (status, aanroep, houdingen): `lessen_chromosomen.md`; van de DNA-basevorm: `lessen_dna.md`.
| `vorkModel`, `vork` (+ `vorkTeken`, `vorkEnzymen`, `vorkAchter`) | replicatievork als simulatie: één model met f (vorkpositie, bp) en t; helix vóór de vork draait mee, leidende streng continu, volgende streng met RNA-primer per fragment, polymerase bouwt van de vork af, primer vervangen, ligase dicht de naad; deterministisch | DNA kopiëren 2.0 (keuring 25 okt 2026) |
| `polymeraseAchter`, `polymeraseVoor` | DNA-polymerase als 'rechterhand' (handpalm, duim, vingers die sluiten, klem om het DNA), actief centrum goud; twee lagen rond het DNA | idem |
| `helicaseRing`, `primase`, `ligase` | helicase als ring van zes eiwitten om één streng (voor/achter); primase en ligase via `enzymKluwen` | idem |
| `vrijNucleotide`, `d2Base`, `d2Rug`, `baseRingRNA` | vrije nucleotide (fosfaat, suiker, base); basen in de vorm van `baseRing` langs een gebogen streng (staafje als ze kleiner zijn dan 9 px); RNA-base in dezelfde puzzelvorm (U = rand van T, teal) | idem |
| `schaafwond` | schaafwond op `onderarm()` die heelt: `heel` 0 vers · 0,35 korst · 0,7 roze · 1 weg | idem |
| `cdChromosoom`, `cdChromatide`, `cdPad`, `cdEen`, `cdKluwen`, `cdKernmembraan`, `cdCel`, `cdPool`, `cdDraad`, `cdTeller` (+ `CD`, `MODEL4`) | chromosoom met armen voor mitose en meiose: zusterchromatiden met centromeer niet in het midden, kinetochoren, cohesineringen (goud-grijs), kleursegmenten na crossing-over (vaderskant teal, moederskant oker); losse chromatide met centromeer vóórop en slepende armen (`zwaai`); morph van chromatine naar chromatide (`cdKluwen`, `c` 0 → 1, vraagt dnaDraad); insnoerende cel, polen met centriolen, trekdraden, uiteenvallend kernmembraan, teller model/mens. Testvel `#celdeling` | Celdeling 2.0 (26 okt 2026) |
| `huidBlok` (+ `HUIDK`) | huid in doorsnede als blok: opperhuid (hoornlaag, kiemlaag op golvende papillen, één cel volgen met `volg`), lederhuid (vaatnet met haarvatlussen, `vat` −1 nauw … 1 wijd; haarzakje met talgklier en haarspiertje, `kip` = kippenvel; zweetklier met kronkelende buis en porie, `zweet`; tast-, druklichaampje en vrije zenuwuiteinden) en onderhuids bindweefsel met vetcellen (`isoleer`); `focus` dimt de rest; geeft ankerpunten terug voor namen | Uitscheiding en evenwicht 1.1 (De huid, 26 okt 2026) |
| `armAnatomie` (+ `z9Frame`, `z9Glad`, `z9Buik`, `z9Pees`, kleuren `Z9`) | rechterarm van opzij op maat (opperarmbeen 31, ellepijp 26, spaakbeen 24 cm × s): schouderblad, biceps (twee koppen, pees op het spaakbeen vóór de elleboog), triceps (pees op het olecranon); `u`, `e` = hoeken, `c`/`ct` = spanning (korter en dikker), `huid`, `hl`, `dim`; vereenvoudigd zonder deltaspier en m. brachialis (Kamiel akkoord 26 okt 2026) | Spieren en beweging (Zenuwstelsel 9) |
| `gewrichtDoorsnede`, `botDoorsnede`, `botWeefsel` | schouder (kogelgewricht) in frontale doorsnede met kop, kom, kraakbeen, kapsel, smeer, banden (`draai`, `hl`); pijpbeen in lengtedoorsnede (rood/geel merg, compact en sponsachtig bot, beenvlies, bloedvat); botweefsel met osteonen, botcellen en kanaaltjes | idem |
| `sarcomeer`, `myofibril`, `kopStand`, `actineDetail`, `reticulum` | sarcomeer op µm-schaal (Z-lijnen, actine ± 1 µm, myosine ± 1,6 µm met kale zone, `L` 2,0–2,5 µm, `kop` = fase); myofibril met banden; één myosinekop op de actine (`hoek`, `vast`, `actX`, `chip` ATP/ADP); actine met tropomyosine en troponine (`schuif`, `ca`); sarcoplasmatisch reticulum als netwerk met calcium (`ca`, `terug`) | idem |
| `spierDwars`, `eenheidZenuw`, `emgSpoor`, `emgPaneel`, `trekGrafiek` | dwarsdoorsnede met motorische eenheden (verspreide vezels, `aan`); motorische zenuwcel die zich vertakt; oppervlakte-EMG (schematisch, deterministisch); paneel met twee kanalen en verborgen sporen; trekkingen die optellen bij hogere frequentie | idem |
| `spierspoeltje`, `oogSchema`, `kuitSchema`, `armModel`, `huidPlakker` | spierspoeltje met spiraal van de zintuigcel (`rek`, `vuur`); oog met oogspier en kuit met voet (`stand`); armmodel (twee latjes, scharnier, twee touwtjes; `knikV` = touwtje geduwd, `trekV`/`trekA`, `statief`); plakker op de huid boven spiervezels | idem |
| `laptop`, `plakker`, `draad`, `schooltas`, `veertje` | practicum-hulpjes | idem |
