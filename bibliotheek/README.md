# Gedeelde tekenbibliotheek (`lib_bio.js`)

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
