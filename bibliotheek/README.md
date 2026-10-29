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
| `kernChromatine`, `chromatideX` | celkern met dubbel membraan; chromatine als losse draden per chromosoomgebied die met `c` 0 → 1 condenseren tot X-chromosomen (lengtes naar baseparen, `CHROM_MB`); losse X met zusterchromatiden en centromeer. Gebruikt `dnaDraad` (sinds 28 okt 2026 in lib_bio.js) | idem |
| `nucleosoomDraad` | DNA-dubbelhelix (dnaDraad) die ± 1,65 keer om histon-schijven windt, linker-DNA ertussen, op schaal (2 nm / 11 nm) | idem |
| `onderarm` | onderarm + hand van boven van een castpersonage (huid uit `CAST`), `bruin` (zon, bruiningsgrens bij de mouw) of `rood` (verbranding) | idem |

| `baseRing`, `baseBruggen`, `nucleotideRing`, `dnaLadderHelix` (+ kleuren `DNA_BASE`) | basevorm van de DNA-reeks (staafje met puzzelrand sinds 27 okt 2026: A punt ↔ T inkeping, C nok ↔ G sleuf; bindingsplekken, waterstofbruggen; geen ringen); nucleotide met genummerde suiker; ladder die als morph een rechtsdraaiende helix wordt | Wat is DNA? 3.0 (gekeurd 25 okt 2026) |

| `hormDeeltje`, `hypofysePoort`, `manDoorsnede`, `penisDoorsnede`, `vulvaSchema`, `schaalStreep` | hormoon met vaste vorm en kleur (GnRH goud, FSH teal, LH groen, steroïden paars; `volg` = gouden ring); hypothalamus met GnRH-cellen, bloedvaatjes in het steeltje (poortaders) en voorkwab die FSH/LH maakt; mannelijke organen in mediane doorsnede op schaal (1 cm = 14 px × s) met de echte route van de zaadleider (`route`, `naam`, `P`), kringspier, zwellichamen; penis in dwarsdoorsnede (rust → vol bloed); vulva als vlak schema. Vereist hormoonVorm (lib_hormonen.js). Status: in de film, wacht op keuring | Geslachtsorganen en puberteit 2.0 |

Registratie en lessen van de chromosoomrecepten (status, aanroep, houdingen): `lessen_chromosomen.md`; van de DNA-basevorm: `lessen_dna.md`.
| `vorkModel`, `vork` (+ `vorkTeken`, `vorkEnzymen`, `vorkAchter`) | replicatievork als simulatie: één model met f (vorkpositie, bp) en t; helix vóór de vork draait mee, leidende streng continu, volgende streng met RNA-primer per fragment, polymerase bouwt van de vork af, primer vervangen, ligase dicht de naad; deterministisch | DNA kopiëren 2.0 (keuring 25 okt 2026) |
| `polymeraseAchter`, `polymeraseVoor` | DNA-polymerase als gevouwen kralenketen in C-vorm (variant A, ronde 3, Kamiel 29 okt 2026): DNA vrij in het kanaal, vingers (α-helix) sluiten om de nucleotide, gouden actief centrum, klem als kralenring óm het DNA; twee lagen rond het DNA; g ≈ 0,55 × DNA-breedte | idem |
| `helicaseRing`, `primase`, `ligase` | helicase als ring van zes eiwitten om één streng (voor/achter); primase en ligase via `enzymKluwen` | idem |
| `vrijNucleotide`, `d2Base`, `d2Rug`, `baseRingRNA` | vrije nucleotide (fosfaat, suiker, base); basen in de vorm van `baseRing` langs een gebogen streng (staafje als ze kleiner zijn dan 9 px); RNA-base in dezelfde puzzelvorm (U = rand van T, teal) | idem |
| `schaafwond` | schaafwond op `onderarm()` die heelt: `heel` 0 vers · 0,35 korst · 0,7 roze · 1 weg | idem |
| `cdChromosoom`, `cdChromatide`, `cdPad`, `cdEen`, `cdKluwen`, `cdKernmembraan`, `cdCel`, `cdPool`, `cdDraad`, `cdTeller` (+ `CD`, `MODEL4`) | chromosoom met armen voor mitose en meiose: zusterchromatiden met centromeer niet in het midden, kinetochoren, cohesineringen (goud-grijs), kleursegmenten na crossing-over (sinds verbeterronde 2, 28 okt 2026, palet B: standaard lichtgrijs, vaderskant donkerblauw, moederskant zandgeel, zie `CD`); losse chromatide met centromeer vóórop en slepende armen (`zwaai`); morph van chromatine naar chromatide (`cdKluwen`, `c` 0 → 1, gebruikt dnaDraad); insnoerende cel, polen met centriolen, trekdraden, uiteenvallend kernmembraan, teller model/mens. Testvel `#celdeling` | Celdeling 2.0 (26 okt 2026) |
| `huidBlok` (+ `HUIDK`) | huid in doorsnede als blok: opperhuid (hoornlaag, kiemlaag op golvende papillen, één cel volgen met `volg`), lederhuid (vaatnet met haarvatlussen, `vat` −1 nauw … 1 wijd; haarzakje met talgklier en haarspiertje, `kip` = kippenvel; zweetklier met kronkelende buis en porie, `zweet`; tast-, druklichaampje en vrije zenuwuiteinden) en onderhuids bindweefsel met vetcellen (`isoleer`); `focus` dimt de rest; geeft ankerpunten terug voor namen | Uitscheiding en evenwicht 1.1 (De huid, 26 okt 2026) |
| `armAnatomie` (+ `z9Frame`, `z9Glad`, `z9Buik`, `z9Pees`, kleuren `Z9`) | rechterarm van opzij op maat (opperarmbeen 31, ellepijp 26, spaakbeen 24 cm × s): schouderblad, biceps (twee koppen, pees op het spaakbeen vóór de elleboog), triceps (pees op het olecranon); `u`, `e` = hoeken, `c`/`ct` = spanning (korter en dikker), `huid`, `hl`, `dim`; vereenvoudigd zonder deltaspier en m. brachialis (Kamiel akkoord 26 okt 2026) | Spieren en beweging (Zenuwstelsel 9) |
| `gewrichtDoorsnede`, `botDoorsnede`, `botWeefsel` | schouder (kogelgewricht) in frontale doorsnede met kop, kom, kraakbeen, kapsel, smeer, banden (`draai`, `hl`); pijpbeen in lengtedoorsnede (rood/geel merg, compact en sponsachtig bot, beenvlies, bloedvat); botweefsel met osteonen, botcellen en kanaaltjes | idem |
| `sarcomeer`, `myofibril`, `kopStand`, `actineDetail`, `reticulum` | sarcomeer op µm-schaal (Z-lijnen, actine ± 1 µm, myosine ± 1,6 µm met kale zone, `L` 2,0–2,5 µm, `kop` = fase); myofibril met banden; één myosinekop op de actine (`hoek`, `vast`, `actX`, `chip` ATP/ADP); actine met tropomyosine en troponine (`schuif`, `ca`); sarcoplasmatisch reticulum als netwerk met calcium (`ca`, `terug`) | idem |
| `spierDwars`, `eenheidZenuw`, `emgSpoor`, `emgPaneel`, `trekGrafiek` | dwarsdoorsnede met motorische eenheden (verspreide vezels, `aan`); motorische zenuwcel die zich vertakt; oppervlakte-EMG (schematisch, deterministisch); paneel met twee kanalen en verborgen sporen; trekkingen die optellen bij hogere frequentie | idem |
| `spierspoeltje`, `oogSchema`, `kuitSchema`, `armModel`, `huidPlakker` | spierspoeltje met spiraal van de zintuigcel (`rek`, `vuur`); oog met oogspier en kuit met voet (`stand`); armmodel (twee latjes, scharnier, twee touwtjes; `knikV` = touwtje geduwd, `trekV`/`trekA`, `statief`); plakker op de huid boven spiervezels | idem |
| `laptop`, `plakker`, `draad`, `schooltas`, `veertje` | practicum-hulpjes | idem |

## Verbeterronde 1: ingebouwd op 28 okt 2026 (gekozen door Kamiel)

Kamiel koos op het keuringsblad per object (oud, A, B, C, gelijk of geen); de helpers zetten de definitieve versie klaar in `verbeterronde-1/inbouw/<groep>/<obj>/DEF.js` (met `wat.md`, `voor.png`, `na.png`, soms `bron.md`), en die staat nu in de bibliotheek. Objecten die na zijn keuze nog zijn aangepast: `verbeterronde-1/inbouw/VERANDERD.json`. Eén regel per object in `logboek/keuzes.jsonl`; patronen in `BEELDPATRONEN.md`. Oude versies: `oud/2026-10-27/`. Testvel: knoppen 'Verbeterronde 1' (`testvel.html#vr1-1` … `#vr1-7`); de dieren in `dieren/testvel.html`.

Wat verder veranderde bij het inbouwen:
- **`dnaDraad` staat nu in `lib_bio.js`** (verhuisd uit `dieren/lib_micro_evo.js`, zelfde code en aanroep), samen met de hulpjes `_bioL`, `_bioCR`, `_bioGelijk`. kernChromatine, nucleosoomDraad, cdKluwen, genOpbouw, nucleosoomAcetyl en mrnaSliert hebben dus geen evolutiemap meer nodig. `lib_micro_evo.js` roept hem nog aan (nucleoide, plasmide): laad `lib_bio.js` erbij, zoals alle films al doen.
- **`bacterieEcht()`** is de nieuwe staafbacterie (variant B). Hij heet niet `bacterie()`, want `bacterie(ctx, x, y, len, rot, o)` uit `lib_micro_evo.js` (evolutiefilms) laadt later en zou hem overschrijven.
- **`CD`** (celdelingkleuren) was na ronde 1 paars (sinds ronde 2 palet B, zie hieronder): `CD.std` = `C.kernR`, vaderskant lichtpaars `#C3B8EE`, moederskant donkerpaars `#5E4C94` (variant A); `cdChromosoom`, `cdEen` en `cdKluwen` gebruiken zonder `kl` nu `CD.std`.
- Gedeeld eiwithulpje `_grKluwen` (+ `_grKluwenVorm`, `_grKluwenCache`, `_lintVorm`, `_ellips`) staat één keer in `lib_bio.js`; `_grKralen` is het kralenhulpje van transcriptiefactor.
- `dieren/lib_bio.js` is weer een volledige kopie van `lib_bio.js` (was een oude, ingekorte kopie), zodat het dierentestvel dnaDraad heeft.
- Aanroepen uit de films blijven werken: alle vervangen functies houden hun parameters en standaardwaarden; opties die niets meer doen (bv. `col` bij celluloseBundel/bacterieGroot, `winnaar` bij eierstokDoorsnede) geven geen fout. Let op: `zaadbalDoorsnede` toont nu standaard Leydigcellen (`leydig` 0,6) en `eierstokDoorsnede` heeft standaard `n` = 60.
- Vereisten van nieuwe objecten: `stamboomSymbolen` vraagt `persoon()` (lib_cast.js) en `circ()`; `synapsEcht` en `celDier` gebruiken `mitochondrion()` (lib.js); `hypofysePoort` vraagt `hormoonVorm` (lib_hormonen.js).
- Nog niet ingebouwd (wachten op Kamiel): `lacOperon`, `methylgroep`, `bladDoorsnede`, `schimmelGist`; objecten met keuze 'geen' komen in een nieuwe ronde.

| Functie | Groep | Gekozen | Wat er veranderde | Bestand |
|---|---|---|---|---|
| `gedifferentieerdeCellen` | cel-afweer | variant B + aangepast | Nu één van boven (ingedeukte schijf, bleek midden) en één los ernaast van opzij (plat), zonder overlap. | lib_bio.js |
| `lipideNanodeeltje` | cel-afweer | variant B + aangepast | Het bolletje uit B is rustiger gemaakt: 9 omgekeerde micellen i.p.v. 26, 4 cholesterolstaafjes i.p.v. 10, één mRNA-streng die langs de micellen slingert. | lib_bio.js |
| `membraanReceptor` | cel-afweer | variant C + aangepast | Rustiger gemaakt (Kamiel: 'balans tussen details en helderheid'): kralen verder uit elkaar (2,4–2,6 r i.p.v. 1,9 r), membraanhelices golven zachter, de β-propeller zonder spaken. | lib_bio.js |
| `stamcelDeling` | cel-afweer | variant B | ongewijzigd overgenomen | lib_bio.js |
| `tumorGroei` | cel-afweer | variant A + aangepast | Fout ronde 1 ('basaalmembraan niet zichtbaar doorbroken') hersteld: bij g > 0,75 een duidelijke opening in het basaalmembraan waar de kluwen doorheen groeit. | lib_bio.js |
| `witteBloedcellen` | cel-afweer | variant B + aangepast | Golgi beter geplaatst (Kamiel: 'niet altijd goed geplaatst'): in de macrofaag stond hij los in het cytoplasma onder de kern; nu direct in de inham van de boonvormige kern, bolle kant naar de kern. | lib_bio.js |
| `bacterieEcht`, `bacterieCel`, `bacterieGroot` | cel-molecuul | variant B | nieuwe basisfunctie bacterieEcht() (EM-achtig); bacterieCel en bacterieGroot zijn er nu omhulsels van. Heet bacterieEcht omdat bacterie() uit lib_micro_evo.js anders botst. | lib_bio.js |
| `celluloseBundel` | cel-molecuul | variant A + aangepast | Aangepast (Kamiels wens): (1) het groene vak om de vezel is weg; in het echt zit er geen omhulsel om. | lib_bio.js |
| `celRond` | cel-molecuul | variant A | ongewijzigd overgenomen | lib_bio.js |
| `eiwitVouw` | cel-molecuul | variant B | ongewijzigd overgenomen | lib_bio.js |
| `enzymKluwen` | cel-molecuul | variant C | ongewijzigd overgenomen | lib_bio.js |
| `gonokok`, `chlamydiaCel`, `spirocheet` | cel-molecuul | variant A | ongewijzigd overgenomen | lib_bio.js |
| `hormDeeltje` | cel-molecuul | variant C | ongewijzigd overgenomen | lib_bio.js |
| `kopStand`, `actineDetail`, `reticulum` | cel-molecuul | variant B + aangepast | Aangepast (Kamiels combinatie): de actine is nu de dubbele bolletjesstreng van A (`_spA_actine` uit A: twee strengen G-actine die om elkaar draaien, achterste bolletjes donkerder), zowel in actineDetail als in kopStand. | lib_bio.js |
| `membraanBoog` | cel-molecuul | variant A | ongewijzigd overgenomen | lib_bio.js |
| `tHelperCel`, `hivVirus` | cel-molecuul | variant A + aangepast | Aangepast: het T-celmembraan is een dubbellaag (twee lijnen) vanaf r ≥ 50; op klein formaat blijft het één lijn. | lib_bio.js |
| `vetcel` | cel-molecuul | variant A | ongewijzigd overgenomen | lib_bio.js |
| `zenuwcel` | cel-molecuul | variant A | ongewijzigd overgenomen | lib_bio.js |
| `blaasjeVersmelt` | cel-nieuw | variant C | ongewijzigd overgenomen | lib_bio.js |
| `celDier` | cel-nieuw | variant C | ongewijzigd overgenomen | lib_bio.js |
| `chloroplastEcht` | cel-nieuw | variant B | ongewijzigd overgenomen | lib_bio.js |
| `golgiStapel` | cel-nieuw | variant A | ongewijzigd overgenomen | lib_bio.js |
| `kernEnvelopPorie` | cel-nieuw | variant A + aangepast | Enige aanpassing: optie `tusKleur` (kleur van de ruimte tussen de kernmembranen) uit C overgenomen, omdat celDier (C) en de aansluiting op het ruw ER die nodig hebben. | lib_bio.js |
| `mitochondrionEcht` | cel-nieuw | variant B | ongewijzigd overgenomen | lib_bio.js |
| `plantencel` | cel-nieuw | variant A + aangepast | Aangepast: plasmodesmata. | lib_bio.js |
| `ruwER` | cel-nieuw | variant C | ongewijzigd overgenomen | lib_bio.js |
| `ezel` | dieren-a | huidige versie (gelijk) + aangepast | Fout hersteld: de staart was over de hele lengte dik en donker. | dieren/lib_dieren.js |
| `grutto` | dieren-a | variant C + aangepast | Nu: twee taps toelopende loopbenen onder de staart (de verre poot donkerder) met drie korte tenen net achter de staartpunt. | lib_bio.js |
| `insectZij`, `insectBoven`, `insect` | dieren-a | variant C | ongewijzigd overgenomen | dieren/lib_dieren.js |
| `koe7` | dieren-a | variant C | ongewijzigd overgenomen | dieren/lib_dieren.js |
| `krokodilEcht` | dieren-a | huidige versie (gelijk) + aangepast | Alles vóór het oog is in de lengte samengedrukt (×0,38); de kop is nu ± 15 % van de lengte. | lib_bio.js |
| `leeuw` | dieren-a | variant A | ongewijzigd overgenomen | dieren/lib_dieren.js |
| `muilezel` | dieren-a | huidige versie (gelijk) + aangepast | Het lange haar begint al bij de kruis (geen losse ezelstaart met kwast), wordt naar onderen ± 3× zo breed, valt iets verder (tot ± de hak) en heeft een rafelige punt. | dieren/lib_dieren.js |
| `zeeschildpad`, `schildpadNest` | dieren-a | variant A | ongewijzigd overgenomen | lib_bio.js |
| `basilosaurus` | dieren-b | huidige versie (gelijk) + aangepast | Het pootje uit C (dij, knie, onderbeen, voet, 3 teentjes) zit nu op de huidige versie. | dieren/lib_dieren.js |
| `bultrug (staartvin)` | dieren-b | huidige versie (gelijk) + aangepast | Nu is er een horizontale staartvin, van opzij verkort: twee puntige lobben met een gekartelde achterrand (Oceanic Society; NOAA/Coastal Review; NRCM). | dieren/lib_dieren.js |
| `hagedis` | dieren-b | huidige versie (gelijk) + aangepast | De tenen waaieren uit (vijf, met klauwtjes), het lijf ligt ± 4 mm lager en de voeten staan iets verder opzij. | dieren/lib_dieren.js |
| `nijlpaard` | dieren-b | huidige versie (gelijk) + aangepast | Nu zijn er vier korte ronde nagels in een lichte hoorntint met een donkere naad, de achterste half verscholen. | dieren/lib_dieren.js |
| `zaadkraker` | dieren-b | variant A + aangepast | Nu krijgt alleen een soort met `poot.vork = true` de vorkvoet (hier de zaadkraker); de rest tekent precies als voorheen (gecontroleerd: merel-render identiek). | dieren/lib_dieren.js |
| `cdAnafaseCel` | dna | oude versie + aangepast | Toegevoegd: alleen `cdAnafaseCel` (uit C), want de gemelde fout 'geen echte anafase' is bevestigd: zusterchromatiden gaan uit elkaar en worden naar tegenovergestelde polen getrokken, in een V/Y-vorm (Wikipedia 'Anaphase'; Digital Histology 'Mitosis overview 7'). | lib_bio.js |
| `CD`, `cdPad`, `cdChromatide`, `cdChromosoom`, `cdEen`, `cdKluwen` | dna | variant A | ongewijzigd overgenomen | lib_bio.js |
| `chromatideX` | dna | variant A | ongewijzigd overgenomen | lib_bio.js |
| `helicaseRing`, `primase`, `ligase` | dna | variant C | ongewijzigd overgenomen | lib_bio.js |
| `dnaDraad`, `kernChromatine` | dna | variant A + aangepast | Aangepast: de interfasedraad van elk chromosoom is nu even lang als zijn aantal baseparen (CHROM_MB): chr 1 is ± 3× zo lang als chr 21. | lib_bio.js |
| `mrnaSliert` | dna | variant C + aangepast | Aangepast: de kronkelhoogte is begrensd op 12 % van de lengte (was 16 %). | lib_bio.js |
| `nucleosoomDraad` | dna | variant C | ongewijzigd overgenomen | lib_bio.js |
| `ribosoomEcht`, `polysoom` | dna | variant A + aangepast | Aangepast: de kralenketen vouwt buiten de tunnel tot een compacte kluwen (eerst ± 3 kralen recht uit de tunnel). | lib_bio.js |
| `rnaPolymerase` | dna | variant A + aangepast | Simpeler gemaakt (Kamiels opmerking): de klep rechtsboven is weg, de onderkaak is smaller en het hele enzym is 20 % minder hoog. | lib_bio.js |
| `trnaKlaverblad` | dna | variant A + aangepast | Aangepast: het klaverblad is geen kruis met vier gelijke armen meer. | lib_bio.js |
| `vorkEnzymen`, `vorkAchter` | dna | oude versie + aangepast | Aangepast: alleen de plek van de helicase. | lib_bio.js |
| `codonTabel` | genregulatie | variant A | ongewijzigd overgenomen | lib_bio.js |
| `genOpbouw` | genregulatie | variant A + aangepast | De blokken (promotor, exonen, intronen, terminator) zijn nu dicht gevuld, zodat de spiraal alleen tussen de blokken en aan de uiteinden te zien is; tussen de gebieden een kleine kier (1,6 % van w) waar de helix doorloopt. | lib_bio.js |
| `nucleosoomAcetyl` | genregulatie | variant B + aangepast | Rustiger: het DNA om de histonkern is een gladde band (helix alleen in het linker-DNA), staarten met 4 kralen i.p.v. 6, acetylgroep als één groen bolletje (C=O en CH3 niet apart). | lib_bio.js |
| `rnaInterferentie` | genregulatie | variant C | ongewijzigd overgenomen | lib_bio.js |
| `transcriptiefactor` | genregulatie | variant B | ongewijzigd overgenomen | lib_bio.js |
| `uvSchade` | genregulatie | variant C | ongewijzigd overgenomen | lib_bio.js |
| `bioreactor` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `crisprCas9` | lab | huidige versie (gelijk) | ongewijzigd overgenomen | lib_bio.js |
| `gelElektroforese` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `injectiespuit` | lab | variant B + aangepast | Kamiels opmerking ('wel erg druk, hand zit er erg dicht op, huid en hand heel dicht bij elkaar'): in de functie de vetkwabjes van 14 naar 7 en de spiervezellijnen van 7 naar 4, allebei zachter. | lib_bio.js |
| `insulinePen` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `micropipet` | lab | huidige versie (gelijk) | ongewijzigd overgenomen | lib_bio.js |
| `microscoop` | lab | variant A | ongewijzigd overgenomen | lib_bio.js |
| `pcrBuisje` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `petrischaal` | lab | variant B | ongewijzigd overgenomen | lib_bio.js |
| `plasmideKnipPlak` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `primerStuk` | lab | variant B | ongewijzigd overgenomen | lib_bio.js |
| `restrictieEnzym` | lab | variant B + aangepast | Fout hersteld (3 bronnen, zie lab/restrictieEnzym/bron.md): de knip stond één base te vroeg (C/GAATTC, overhang GAAT); nu G↓AATTC met overhang AATT/TTAA (iSite 10 → 11). | lib_bio.js |
| `sequencer` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `thermocycler` | lab | variant C | ongewijzigd overgenomen | lib_bio.js |
| `bloemDoorsnede` | organen-plant | variant A + aangepast | Aangepast (gemelde fout, twee bronnen): de bij had drie poten en één paar vleugels zichtbaar; nu zes poten aan het borststuk (drie aan de verre kant gedempt) en twee paar vleugels (grote voorvleugel, kleinere achtervleugel apart). | lib_bio.js |
| `hartDoorsnedeFase`, `hartDoorsnede` | organen-plant | variant A + aangepast | De AV-kleppen hadden geen herkenbare klepslippen; nu echte slippen met peesdraden aan de vrije rand (Elsevier Anatomy 'Right atrioventricular valve', anatomyzone 'tricuspid valve'). | lib_bio.js |
| `longblaasje` | organen-plant | variant A | ongewijzigd overgenomen | lib_bio.js |
| `nefron` | organen-plant | variant C + aangepast | (1) gemelde fout 'tweede kronkelende deel is een glad boogje': het distale deel kronkelt nu echt, eerst bij de lis en dan vlak bij de eigen glomerulus, en loopt daarna als verbindingsstukje naar de verzamelbuis | lib_bio.js |
| `stamboomSymbolen` | organen-plant | variant B | ongewijzigd overgenomen | lib_bio.js |
| `synapsEcht` | organen-plant | variant A | ongewijzigd overgenomen | lib_bio.js |
| `wortelHaren` | organen-plant | variant A | ongewijzigd overgenomen | lib_bio.js |
| `blastocyste` | voortplanting | variant A | ongewijzigd overgenomen | lib_bio.js |
| `eicelEcht` | voortplanting | variant B | ongewijzigd overgenomen | lib_bio.js |
| `eierstokDoorsnede` | voortplanting | variant B | ongewijzigd overgenomen | lib_bio.js |
| `zaadbalDoorsnede` | voortplanting | huidige versie (gelijk) + aangepast | Ongeveer 45 % van de profielen is nu ovaal en willekeurig gedraaid. | lib_bio.js |
| `zaadcelEcht` | voortplanting | oude versie + aangepast | Aangepast: de kap bedekt nu alleen de voorste ± 60 % van de kop (MeSH/DeCS + Wikipedia 'Acrosome'), zodat de lichte kern erachter zichtbaar is. | lib_bio.js |
| `armAnatomie` | weefsel-organen | variant A | ongewijzigd overgenomen | lib_bio.js |
| `darmwand` | weefsel-organen | variant A | ongewijzigd overgenomen | lib_bio.js |
| `huidDoorsnede` | weefsel-organen | huidige versie (gelijk) + aangepast | Nu: basale laag donkerder met hogere kern (kubisch tot cilindrisch), korrellaag lichter met iets grotere donkere korrels (plat). | lib_bio.js |
| `hypofysePoort` | weefsel-organen | variant A | ongewijzigd overgenomen | lib_bio.js |
| `nierBijnier` | weefsel-organen | variant A + aangepast | Nu verzadigd geel met een donkere rand, ze faden in/uit aan de uiteinden, en het nierbekken kleurt mee bij o.urine. | lib_bio.js |
| `spierDwars`, `spierspoeltje` | weefsel-organen | variant C | ongewijzigd overgenomen | lib_bio.js |
| `spierVezel`, `spierBundel` | weefsel-organen | oude versie + aangepast | Aangepast (gemelde fout 'stand samentrekken ontbreekt', twee bronnen): nieuwe optie o.c 0..1 op spierVezel en spierBundel: de vezel wordt ± 15 % korter, de sarcomeren korter; de donkere A-band blijft even breed, de lichte I-band wordt smaller. | lib_bio.js |
| `vetweefsel` | weefsel-organen | oude versie + aangepast | Aangepast (gemelde fout, twee bronnen): het haarvat liep dwars over de vetcellen; nu loopt één doorlopend vat over de grenzen tussen de cellen (in het bindweefsel). | lib_bio.js |

## Verbeterronde 2: ingebouwd op 28 okt 2026 (gekozen door Kamiel)

Kamiel koos op het keuringsblad van ronde 2 (`verbeterronde-2/keuringsblad/`); besluiten in `verbeterronde-2/uitslag/BESLUITEN.md`, varianten en stills per object in `verbeterronde-2/<groep>/<obj>/`. Objecten die na zijn keuze nog zijn aangepast: `verbeterronde-2/uitslag/VERANDERD.json` (met voor/na). Eén regel per object in `logboek/keuzes.jsonl` (ronde `beeldbank-2`). Oude versies (stand vlak vóór deze ronde): `oud/2026-10-28/`. Testvel: knoppen 'Verbeterronde 2' (`testvel.html#vr2-1` DNA in palet B, `#vr2-2` blad · echo · embryo · schimmel · lac-operon, `#vr2-3` eiwitten).

- **DNA-kleuren: palet B** voor alle DNA in de bibliotheek (`DNA_BASE`, `D2`, `RNA_BASE`, `_cdRNA`, `CD`): ruggengraat grijs, A koraalrood `#D8604A`, T zandgeel `#F2CF7A`, C lichtblauw `#86C3E8`, G donkerblauw `#34609A`. RNA dezelfde basekleuren (U = kleur van T), RNA-ruggengraat blijft teal. Chromosomen standaard lichtgrijs, vader donkerblauw, moeder zandgeel. Ook functies met een eigen paarse DNA-tint volgen nu het palet: `dnaDraad` (standaard `DNA_BASE.rugR`/`rug`), `chromatideX`, `kernChromatine` (de kern zelf blijft paars), `nucleosoomDraad`, `cdAnafaseCel`, nucleoïde en plasmide in `bacterieEcht`, bacteriechromosoom in `plasmideKnipPlak`, nieuwe streng in `uvSchade`, strengen in `thermocycler` en `pcrBuisje`. Afspraak ook in `films/PROMPT_v13.md` (Part C) en `films/BEELDAFSPRAKEN.md`.
- **Eiwitten als kralenketen** (15 objecten, Kamiel: alle 'goed zo'): gedeelde hulpjes `KK_R`, `_kkKluwen`, `_kkHex`, `_kkPad`, `_kkHelix` staan één keer direct na `_grKralen`. `primerStuk` tekent zijn polymerase zelf (`_psPolAchter`, `_psPolVoor`, `_psDeel`, `_psKlem`) tot polymeraseAchter/-Voor in ronde 3 opnieuw zijn ontworpen.
- **Nieuw**: `bladDoorsnede` (A), `schimmelGist` (ronde-1-winnaar, zonder dwarswanden bij Rhizopus; staat in lib_bio.js, niet in lib_dieren.js), `lacOperon` (B, repressor óp de operator; vraagt `dnaDraad` en `_grKralen`).
- Aanroepen uit films en tools blijven werken (zelfde namen, parameters en standaardwaarden). `vrijNucleotide` heeft nu standaard drie fosfaten (`tri`, `pp` = pyrofosfaat laat los); `baseRing` negeert `plekA`/`bindA` (geen bindingsstippen meer); `echoBeeld` en `embryoEcht` geven ankerpunten terug; `_echoKorrel` is weg.
- Eigen kopieën buiten de bibliotheek (niet bijgewerkt): `tools/docent/dna-3/beeldbank.js` en de film Transport 6.
- Nog niet ingebouwd (ronde 3): `polymeraseAchter`/`-Voor`, `methylgroep`, kralenketens voor rnaPolymerase, myosinekop, kernporiën, CD4 en gp120/gp41, amylopectine, waterdamp bij het blad, bronnen voor het embryo.

| Functie | Groep | Gekozen | Wat er veranderde | Bestand |
|---|---|---|---|---|
| `dnaLadderHelix` (+ `_dhPuzzel`) | dna | variant B | voorkant vol met puzzelrand en letter, achterkant vage schaduw; groeven 1 : 2 | lib_bio.js |
| `baseRing`, `baseBruggen`, `nucleotideRing` | dna | variant B | base na een schuine knik naast C2', geen stippen, bruggen als gouden puntjes (`DNA_BASE.plek` breder verdeeld) | lib_bio.js |
| `vrijNucleotide`, `d2Base`, `baseRingRNA` | dna | variant B | drie fosfaten (Kamiel: 'drie'), kleine basen als staafje met voeg, RNA-basen in DNA-kleuren | lib_bio.js |
| kleuren (palet B) | dna | variant B + aangepast | U = kleur van T; ook de eigen paarse DNA-tinten in andere functies naar het palet (zie hierboven) | lib_bio.js |
| `bladDoorsnede` | organen-plant | variant A | nieuw | lib_bio.js |
| `echoBeeld` | voortplanting | variant A | echoweefsel, rustige vlekking; geeft ankers {hart, hoofd, arm} | lib_bio.js |
| `embryoEcht` | voortplanting | variant A | doorschijnend, hersenblaasjes, hartbult, navelstreng; geeft ankers terug | lib_bio.js |
| `schimmelGist` | dieren-b | ronde-1-winnaar + aangepast | nieuw; geen dwarswanden in de Rhizopus-draden (bevestigde fout) | lib_bio.js |
| `lacOperon` | genregulatie | variant B | nieuw; helix door de klem, repressor op de operator | lib_bio.js |
| `zetmeelSpiraal`, `antistofY` | cel-molecuul, cel-afweer | huidige versie | ongewijzigd | lib_bio.js |
| `helicaseRing`, `primase`, `ligase`, `enzymKluwen`, `membraanBoog`, `membraanReceptor` (+ `_mrIntern`), `nucleosoomDraad`, `nucleosoomAcetyl`, `crisprCas9`, `plasmideKnipPlak`, `restrictieEnzym`, `rnaInterferentie`, `uvSchade`, `primerStuk` | eiwitten | kralenketen | eiwitten als gevouwen kralenketen in dezelfde omtrek; aanroepen ongewijzigd (vork() volgt via helicaseRing/primase/ligase) | lib_bio.js |

## Verbeterronde 3: ingebouwd op 28 okt 2026 (gekozen door Kamiel)

Kamiels besluiten in `verbeterronde-3/uitslag/BESLUITEN.md`; varianten en stills per object in `verbeterronde-3/<groep>/<obj>/` (overzicht `verbeterronde-3/OVERZICHT.md`). Objecten die na zijn keuze nog zijn aangepast: `verbeterronde-3/uitslag/VERANDERD.json` (met voor/na). Eén regel per object in `logboek/keuzes.jsonl` (ronde `beeldbank-3`). Oude versies (stand vlak vóór deze ronde): `oud/2026-10-28b/` (lib_bio.js, dieren/lib_micro_evo.js, testvel.html, README.md). Testvel: knop 'Verbeterronde 3' (`testvel.html#vr3-1`, alle objecten uit deze ronde).

- **Polymerase** (29 okt 2026): Kamiel koos variant A op het keuzeblad Regeling; ingebouwd. `primerStuk` tekent zijn eigen polymerase nog zelf (kan later naar polymeraseAchter/-Voor).
- **Navelstreng: kleur volgt zuurstof** (Kamiel): de twee navelstrengslagaders blauw (zuurstofarm, kind → placenta), de ader rood (zuurstofrijk, placenta → kind). Geldt in `embryoEcht`, in `placentaDoorsnede` (met `kleurO2: false` nu ook; standaard blijft blauwpaars `PLAC.arm` voor zuurstofarm foetaal bloed) en in de nieuwe `bioNavelstreng(c, ax, ay, bx, by, t, a, w)` (zelfde aanroep als `castNavelstreng` uit de films, die de slagaders rood tekent); `vrouwOrganenVoor` gebruikt nu `bioNavelstreng`.
- **RNA**: ruggengraat teal (`D2.rna`), basen palet B (`RNA_BASE`), ook in kleine objecten via `_rnaTikjes(ctx, pts, lw, {stap, lang, seed})`.
- **Vork**: geen puzzelvorm meer, elke base één staafje van dx/2 breed; `d2Base` kreeg `o.staafLetter` (alleen de vork gebruikt het).
- Eigen kopieën buiten de bibliotheek (niet bijgewerkt): de films (elk een kopie in `bron/src/`), `tools/docent/dna-3/beeldbank.js`, `films/evolutie/8-stambomen-lezen/bron/src/lib_micro_evo.js`.

| Functie | Groep | Gekozen | Wat er veranderde | Bestand |
|---|---|---|---|---|
| `methylgroep` (+ `_mgCH3`, `_mgDuo`, `MG2`) | genregulatie | ronde-2-winnaar (W) + aangepast | nieuw in de bibliotheek; basen palet B, CH3 groen (was koraal), transcriptiefactor grijs | lib_bio.js |
| `rnaPolymerase`, `kopStand`, `kernEnvelopPorie`, `tHelperCel`, `hivVirus` | eiwitten | kralenketen | eiwitten als kralenketen (DEF.js); aanroepen en ankers gelijk; RNA in tHelperCel/hivVirus teal | lib_bio.js |
| `zetmeelSpiraal` (+ `_zetmeelVertakt`) | cel-molecuul | DEF | optie `vertakt` (amylopectine, α-1,6 om de 26), `takN`; zonder optie de oude amylose | lib_bio.js |
| `bladDoorsnede` (+ `_bladH2O`) | organen-plant | DEF | optie `water` (waterdamp naar buiten), anker `water` | lib_bio.js |
| `embryoEcht` | voortplanting | DEF + aangepast | bronnen nagelopen, somieten niet in de nek; navelstreng: slagaders blauw, ader rood | lib_bio.js |
| `placentaDoorsnede`, `bioNavelstreng` (nieuw), `vrouwOrganenVoor` | voortplanting | aanpassing | navelstreng volgt zuurstof, ook bij `kleurO2: false` | lib_bio.js |
| `vorkTeken`, `d2Base` | dna | aanpassing | gelijke staafjes met spleet, letters in het staafje | lib_bio.js |
| `lipideNanodeeltje` (`_LN.rna`, `_lnMRNA`) | cel-afweer | aanpassing | mRNA teal met basen in palet B (was lila) | lib_bio.js |
| `nucleoide` | dieren | aanpassing | standaard grijs (palet B), was paars | dieren/lib_micro_evo.js |
