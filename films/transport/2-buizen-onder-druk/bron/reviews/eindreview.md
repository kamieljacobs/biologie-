# Eindreview "Buizen onder druk" (transport 2/6)

Slug `2-buizen-onder-druk` · gesproken tekst 404 s (basis 365 s, vwo-blok 39 s) · 13 audiofragmenten, genormaliseerd naar -15 LUFS.

## Wat ik controleerde
- Woordtijden (silalign): alle 13 alinea's hebben hetzelfde aantal woorden als de display-tekst. s15 (later aangeleverd) is ook uitgelijnd.
- Cue-woorden: met een script heb ik elke `q.on`/`q.at` opgezocht in words/*.json (woord, n, tijd). Er zijn geen niet-gevonden cues.
- Contactsheets met 5 frames per alinea (sheet0–6), plus gerichte stills (sheetB, sheetC, sheetH): havo-weergave rond het vwo-blok (s12 einde → s14), beide vragen in de reveal-fase, de eindkaart, de titel en de hoofdstukkaarten.
- Stijl: alleen bg-looks, geen gradiënten of schaduw. Rood in twee tinten (zuurstofrijk/zuurstofarm), teal voor water en zuurstof, oker voor glucose, goud als focus, paars alleen via de vwo-markering. Geen tekst kleiner dan 24 px, niets onder y = 900, niets buiten beeld.
- Vragen: het antwoord wordt nergens getoond voordat het gezegd wordt. In de cold open komen de kleuren en de drukmeter pas in H3. In s10 staan de drie opties neutraal op de route, en "antwoord b" verschijnt pas in s12 op "Antwoord".

## Wat ik verbeterde (2 rondes)
1. Gezochte cues verschoven die een deelwoord vroeg vonden: 'ver' → 'ligt' (anders "over"), 'cellen' → n=2 (anders "bloedcellen"), 'slag' → n=2 ("slagader"), 'bloed' → 'zelf' (anders "bloeddrukmeter"), 'Spieren' → n=3 (s14, anders "spieren." in zin 2), 'Aders' → n=2 (s16, anders "Slagaders").
2. Naamconflict `BLOED` met een engine-constante hernoemd (`BLKL`). Daardoor laadde de film niet.
3. s04: het label "bloed · HOGE DRUK" viel links buiten beeld. Ik heb het naar rechtsonder verplaatst.
4. s05: "µm" werd door metaText in hoofdletters "MM". Nu staat er "micrometer".
5. s08: de legenda van de drukgrafiek overlapte met de curve. Ik heb hem boven de as gezet. "polsslag" verdwijnt nu als "de golf: 0,1 seconde" verschijnt.
6. Recap (s16): het paneel was leeg aan het begin van de tweede helft en de zon stond achter het paneel. Er staat nu een kop "waarom viel ze flauw?" en de zon is weg.
7. Eindkaart: de haak herhaalde de laatste regel letterlijk. Hij sluit nu de puzzel af: "flauwvallen: te weinig bloed terug naar het hart".
8. vwo s13: de tag "1000 × zo groot → 1000 × zo langzaam" stond over de rechthoek en over "niet op schaal". Hij heeft nu een eigen plek.

## Inhoud per scène (kort)
- Cold open: rij leerlingen, een klok voor "een half uur", de klasgenoot wordt bleek, valt opzij, docent legt haar benen op een rugzak.
- H1: vertakkende slagaderboom naar vier organen; pulserende slagaderdoorsnede met labels per wandlaag; kleine slagaders nauwer/wijder met meer/minder bloed in een orgaan; overgang kleinste slagader → haarvat met bloedcellen in een rij; uitwisseling (zuurstof, glucose, afval); haarvatennet; samenkomende aders; slagader tegen ader in doorsnede; been met kleppen; lus met druppel via de longader; "blauwe" ader + zoom; poortaderroute darm → poortader → lever → leverader.
- H2: drukcurve in de aorta, synchroon met het hart (systole/diastole-banden, 120/80); bloeddrukmeter met manchetcurve tegen de slagaderdruk en een slagader die opengaat; polsgolf tegen druppel; route-band met de druppel en een drukgrafiek die meetekent, longen gestippeld; tuinslang, waaier van haarvaten, 1000-blokjesraster, rivier → meer, uitwisseling met vocht (vooruitwijzing film 4). Vwo: gelijke-oppervlakte-rechthoeken, windketel met een rekbare wand die per fase gesimuleerd wordt en twee stroomgrafieken.
- H3: been met spierpomp (kuitspier knijpt, kleppen open en dicht, bloed schuift stapsgewijs omhoog; bij "Zakt het terug" zakt het bloed en klappen de kleppen dicht); staande persoon met bloed in de benen, een huidvat dat wijder wordt, een hartmeter en vernauwende slagaders, een oorzaak-gevolgketen, een drukmeter bij het hoofd die zakt; liggen en benen omhoog; tenen bewegen.

## Open punten
- De tuinslangstraal (s12) is een eenvoudige deeltjesparabool. Hij is functioneel, maar kan mooier.
- In de cold open is het vallen een rotatie van de figuur om de voeten (geen echte ineenzakanimatie). Op stills ziet het er goed uit. Kijk het bij afspelen even na op vloeiendheid.
- In de vwo-windketel volgt de beweging van de deeltjes in de aorta een vereenvoudigd model (van stotend naar gemiddeld over de lengte). De rek van de wand is kwalitatief.
- De bronmap (bron/info.md, script.md) en de opname in index.html (HOOFDSTUKKEN.transport.films, FILMKUNST) moeten nog gebeuren bij het plaatsen op de site. Dat zat niet in deze bouwopdracht.
- Uitspraak (wachtlijst, niet beluisterd): "systole", "diastole", "windketelwerking", "poortader", "honderdtwintig over tachtig".
