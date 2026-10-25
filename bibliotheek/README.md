# Gedeelde tekenbibliotheek (`lib_bio.js`)

**Dieren** (uitknippoppen, goedgekeurd 23 okt 2026): zie `dieren/README.md` (`dieren/lib_dieren.js`, testvel `dieren/testvel.html`).

Tekenrecepten volgens prompt uitlegfilms v8, C9: elk object is eerst opgezocht (verhoudingen, bron), het recept staat als commentaar boven de functie, met de bekende fouten. Goedgekeurde objecten worden alleen nog hergebruikt.

- **Gebruik in een film:** kopieer `lib_bio.js` naar `bron/src/` en plak hem na `lib_cast.js` in de pagina (in `bouw/build.py` bij `/*LIBSERIES*/`). Vereist uit lib.js: `C`, `rgba`, `lighten`, `hash`, `clamp`, `lerp`, `ease`, `shape`, `roundRect`, `text`; de molecuulfuncties ook `V`, `hexagon`, `bead`, `wander` (lib_voeding.js) en `nucleus`/`mitochondrion` (lib.js).
- **Testvel:** `testvel.html` (niet gelinkt, noindex) tekent alle objecten naast elkaar. Nieuwe objecten eerst hier samen bekijken (C9).
- **Bijwerken:** pas het bestand hier aan en kopieer het naar de films die het gebruiken; noteer de wijziging in hun `bron/info.md`.

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
| `huidDoorsnede` | dunne huid in doorsnede: hoornlaag, korrellaag, stekelcellaag, basale laag met delende cel en pigmentcellen (uitlopers, melaninekapjes; `mel` 0 = albinisme … 1,6 = na zon), golvende basaalmembraan, lederhuid met haarvatlussen; `um` = breedte in micrometer | Chromosomen v2 (ter keuring 25 okt 2026) |
| `kernChromatine`, `chromatideX` | celkern met dubbel membraan; chromatine als losse draden per chromosoomgebied die met `c` 0 → 1 condenseren tot X-chromosomen (lengtes naar baseparen, `CHROM_MB`); losse X met zusterchromatiden en centromeer. Vereist `dnaDraad` (lib_micro_evo.js) | idem |
| `nucleosoomDraad` | DNA-dubbelhelix (dnaDraad) die ± 1,65 keer om histon-schijven windt, linker-DNA ertussen, op schaal (2 nm / 11 nm) | idem |
| `onderarm` | onderarm + hand van boven van een castpersonage (huid uit `CAST`), `bruin` (zon, bruiningsgrens bij de mouw) of `rood` (verbranding) | idem |
