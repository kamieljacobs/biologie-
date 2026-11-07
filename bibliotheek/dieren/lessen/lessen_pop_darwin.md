# Lessen: Darwin-dieren als uitknippop (grote nandoe, negenbandgordeldier, reuzenschildpad; 24 okt 2026)

Voor Evolutie v2 film 9 *De reis van Darwin*: e9s10 (gordeldier loopt in beeld), e9s13 (nandoe stapt door de steppe), e9s18 (zadelschild tilt zijn nek op naast een koepelschild).

Bestanden: `films/evolutie/storyboards-v2/src/pop_darwin.js` (ook achteraan in `bibliotheek/dieren/lib_dieren.js`; kopie in `pop/darwin/`), testvel `src/tv_darwin.js` (`TV_darwin`; kopie in `bibliotheek/dieren/testvellen/`), renders `pop/darwin/testvel/*.webp` en `pop/darwin/keyframes/*.webp`. Platen `referentie/dieren/darwin/{nandoe,gordeldier,schildpad}.webp`, scripts `referentie/dieren/darwin/werk/` (`overtrek.py` + `overtrek_cfg.py` → blok `DARWIN_OVERTREK` bovenin pop_darwin.js; `raster.py` = rasteruitsnede om punten af te lezen; `kwant.py` = palet controleren; `meet.js` = rek per fase en glijden van de steunvoet).

Laden: na `teken_evo9.js` (staat in `ref9/laadlijst.txt`). Testvel: `python3 render.py <laadlijst>,pop_darwin,tv_darwin TV_darwin` met nandoe.png, gordeldier.png en schildpad.png naast render.html (alleen voor de overlay).

## Aanroep (zelfde naam, schaal en anker als de oude tekening)
| functie | houdingen | opties |
|---|---|---|
| `x9nandoe(ctx, x, y, s, o)` | `staan` (standaard), `lopen` | `t` (fase, mag doorlopen > 1), `vooruit: true` (x = startpunt; steunvoet staat stil in de wereld, het dier schuift S·t op), `kijk`, `a`, `skelet` |
| `x9gordeldier(ctx, x, y, s, o)` | `staan`, `lopen` | idem |
| `x9schildpad(ctx, vorm, x, y, s, o)` | `vorm` = `'zadel'` / `'koepel'` | `nek` −1 (omlaag, grazen) … 0 (half, plaathouding) … 1 (omhoog); zonder `nek`: zadel = 1 (zoals het goedgekeurde storyboard), koepel = 0 |

sb9 gebruikt nu `{ houding: 'lopen', t }` bij e9s10 (gordeldier en zoomcirkel) en e9s13 (nandoe). Voor de animatie: e9s10 en e9s13 `t` laten lopen met `vooruit: true`; e9s18 `nek` van 0 naar 1 (6 tussenstanden staan op het testvel `schild_nek`).

## Maten (bron wint)
| dier | maat | bron | plaat |
|---|---|---|---|
| grote nandoe | hoogte 1,5 m (kruin), 15–30 kg, drie tenen | Smithsonian NZP | plaat 322 px = 150 cm |
| | tibiotarsus 30,2 cm (gemiddelde n = 3: 301,8 mm) | Anais SIIEPE UFPel 2018 (CB_01851) | ±31 cm ✓ |
| | tibiotarsus = 0,39–0,46 × heuphoogte; staplengte 0,8–1,2 × heuphoogte; duty stappen ±0,55–0,7 (mens-achtig) | Alexander 2004 (*J. Anat.*, PMC1571302) | → heup 77 cm (0,39) |
| | tarsometatarsus 36 cm, dijbeen 17 cm, teen 12 cm | uit de plaat (geen bron gevonden) | |
| negenbandgordeldier | kop-romp 38–58 cm, staart 26–53 cm, schildhoogte 15–25 cm | Wikipedia; Brazos Bend SP (kop-romp 38–43, staart 36–41) | kop-romp 43 cm ✓, **staart op plaat ±17 cm → 36 cm** |
| | lateraal stappen (de meeste viervoeters; alleen het reuzengordeldier loopt diagonaal); 'sjokt' langzaam | Hildebrand 1980; Wikipedia; klimstudie *Dasypus* (Redalyc 2019: lateraal en diagonaal) | plaat: fasen niet consistent |
| reuzenschildpad zadel | schild ±80 cm (Española max ±75 cm, mannetjes groter, Pinta iets groter); voorrand opgetild, langere en dunnere nek en poten | Wikipedia Hood Island giant tortoise; SDZG-factsheet; techno-science | ✓ |
| | langere nek (gecorrigeerd voor schildlengte) dan koepels; nek omhoog bij hoog voedsel en rangordegevecht | Chiari e.a. 2017 (*Sci Rep* 7:15787); Fritts 1984 (*Biol J Linn Soc*) | plaat fig. 4: kop ±1,35 × schildlengte hoog — plausibel, geen getal gevonden |
| koepelschild | schild 110 cm (figuur incl. kop ±1,46 m); zwaarder, kortere nek | SDZG; Chiari 2017 (koepels tot 327 kg) | ✓ |

Geen bron gevonden voor de absolute neklengte en de maximale kophoogte van een zadelrug (Gerlach 1999 meet het voor de Seychellen-schildpadden: maximale kophoogte verschilt amper tussen zadel en koepel, zadels tillen vooral de voorkant van het lichaam op via langere poten). Daarom: nek omhoog volgt de plaat, en het zadelschild kantelt bij nek omhoog 6° (voorkant op) zoals op fig. 4.

## Wat anders was dan bij de wolf en de vogels
1. **Romp/schild/kop zijn één overgetrokken stuk** (zoals tijger/huiskat ronde 3): bij een nandoe en een gordeldier beweegt de romp nauwelijks (alleen bob en 1° kantelen), dus geen zachte huid nodig. De poten zijn buizen met IK, de nek van de schildpad een Bézier-buis tussen nekwortel (onder de schildrand) en kop-aanzet; de kop is het overgetrokken kopvlak dat draait om de aanzet.
2. **Nandoe: dijbeen en knie zitten in de veren.** Het dijbeen draait mee met de voet (protractie), maar als het onderbeen dan te kort is draait de knie naar de voet toe (zoeken over ±60° op 'rek' en een kleine straf voor afwijken). Hak naar achter (IK-teken −1). Afzet: de teen blijft op de grond terwijl de kogel opkomt (teenhoek begrensd op de grond); zonder die grens stak de teen bij afzetten onder de grond (keyframe e9s13 ronde 1).
3. **Nandoe-stap**: S = 92 cm per cyclus (staplengte 46 cm = 0,6 × heup; 0,8 × heup gaf rek 1,22 bij het neerzetten), duty 0,62, bob 1,4 cm (hoog midden in de steunfase), kop iets mee. De plaat toont langere passen: de plaatpoot is in verhouding langer dan de bronpoot; bron wint.
4. **Gordeldier**: korte poten (dij 4,9, scheen 4,5, voet 3 cm; arm 4,4, onderarm 4 cm), laterale volgorde AN 0 · VN 0,25 · AF 0,5 · VF 0,75, duty 0,68, S = 13 cm; de schouder schuift 0,3 × de voetafstand mee (anders rek > 1 bij het reiken). Poten veel dikker dan de eerste versie: dunne poten maakten er een hond van.
5. **Staart gordeldier** procedureel (Bézier, 16 ringen, punt sleept bijna over de grond), achter alles getekend; de plaat had hem te kort (17 cm).
6. **Schildpad**: poten volgen het schild met een gewicht dat naar de voet tot 0 gaat (voeten blijven staan, bovenkant kantelt mee); de keel is een lichte band aan de onderkant van de nek (40–100% van de halve breedte; een bredere band liet de nek uit twee delen bestaan).

## Wat de platen goed/fout hadden
- **nandoe.webp**: vlakke rij zeer bruikbaar (3 tonen + licht, veerpunten), staande figuur valt exact op de pop. Loopfasen 2–4 geven een goed beeld van passeren (teen hangt, hak hoog) en afzet; de stap is langer dan de bron toelaat.
- **gordeldier.webp**: kop en schild goed; staart te kort; schild in de vlakke rij heeft honderden lichte vlekjes (overgetrokken werd dat 'camouflage') → alleen de banden en de onderrand overgetrokken, de schildplaatjes als rustige puntjesrijen getekend. De vier fasen verschillen nauwelijks en zijn geen consistente cyclus.
- **schildpad.webp**: vier figuren op dezelfde schaal en grondlijn; zadel half/omhoog/omlaag zijn bruikbaar als eindstanden voor de nek. Schild en kop vallen 1:1 op de plaat.

## Algemene regels (nieuw)
- **Overtrekker met `basisKlassen`**: voor een schild dat over huid ligt alleen de schildtonen als basisvorm nemen (anders wordt de nek onderdeel van het schild). Staat in `overtrek.py`.
- **Lichte vlekjes op een pantser/schild niet overtrekken**: filter op breedte en hoogte (vlekken < 1,6 cm breed en boven de onderrand weg) en teken een rustig patroon zelf.
- **Een teen of klauw mag nooit onder de grond**: begrens de teenhoek op de grondlijn (`asin(-y/teenlengte)`), ook in de afzet.
- **Rek-script vóór kijken** (`meet.js`): rek per poot per fase en glijden van de steunvoet (400 tijdstippen) — vond in één ronde de te ver reikende gordeldierpoten.

## Nog zwak
- **Nandoe**: de vleugel is een vast deel van de romp (geen wiegen bij het lopen); de verre poot is een donkere kopie in hetzelfde spoor. Dijbeenhoek is gezocht, niet uit een bron.
- **Gordeldier**: de ringstaart is wat stijf en recht; poten zijn buizen (geen schubbenrand op de dij); oren en kop bewegen niet. De zoomcirkel in e9s10 is op s = 6 nog erg klein om de pas te zien.
- **Schildpad**: nek omhoog volgt de plaat (geen getal voor kophoogte); de nekrimpels zijn een eenvoudige lijnenreeks; schildpad loopt niet (niet gevraagd). Koepel heeft alleen nek-standen, geen eigen omlaag-plaat (geschat).
- Overgang staan ↔ lopen bestaat niet als menging (harde wissel); voor e9s10/e9s13 begint het dier al lopend.
