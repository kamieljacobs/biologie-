# Celorganellen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/celorganellen/index.html (audio in films/cellen/celorganellen/audio/) |
| Reeks / nummer | Cel, film 2 van 3 ("Biologie bij Kamiel · reeks Cel · film 2 van 3") |
| Doelgroep / niveau | havo + vwo met gelabelde vwo-blokken (Havo/Vwo-schakelaar; standaard Vwo) |
| Versie / datum | Versie 1.2 · 11 oktober 2026 (footer). 1.0 eerste versie; 1.1 "vesikel" → "blaasje" (s09, s11, s22 opnieuw ingesproken), Terug- en Hoofdpagina-knop; 1.2 H2 DNA als dubbele helix met RNA-werkkopie, H4 CO₂ komt vrij; 1.3 (12 okt 2026) na de onafhankelijke review, zie `reviews/review_v2.md` |
| Stem / model | Roos (ElevenLabs, model eleven_v4) |
| Duur | 10:52 (som van de 18 mp3's: 652,3 s). Speeltijd met titel-, hoofdstuk- en eindkaarten en vragen: Vwo 13:30, Havo 10:58 (versie 1.3: Vwo 13:41, Havo 11:07; zie `script.md` voor actuele begintijden) |
| Beeldstijl | Part C-stijlkaart: Micro (donkere celwereld #121A26), Schema (navy #1A2740), één keer Macro (lichaam in de cold open); vaste UI-laag (paarse vwo-balk links, meta linksboven, ondertitels onder CAPTION_Y = 900). Canvas 1920×1080 |
| Audio-opslag | 18 losse mp3's in audio/ (s01, s04, s05, s07, s09, s11, s13, s14, s16, s17, s18, s20, s21, s22, s23, s25, s26, s27), één per gesproken segment; niet in de HTML ingebed |
| Bronbestanden | Echte bronnen uit de bouwsessie staan in deze map (zie hieronder); de rest van dit bestand is op 2026-10-12 gereconstrueerd uit de HTML en daarna aangevuld |

## Echte bronbestanden (in deze map)

Deze film is niet met `filmbron.py` gemaakt maar met een eigen bouwstraat. Pas hem bij voorkeur zo aan, niet via uitpakken/inpakken:

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Het definitieve script met leerdoelen, misconcepties en [VWO-START]/[VWO-END]-markeringen (bron voor alles). `script_v1.md` = versie vóór de reviews |
| `stem/segmenten_stem-invoer.json` | Per segment de schermtekst (`display`) én de letterlijke stem-invoer (`voice`, met respellings: ER → "ee-er", DNA → "dee-en-aa") |
| `stem/woordtijden/sNN.json` | Woordtijden per take (ElevenLabs Scribe) |
| `stem/uitspraaktest.mp3`, `stem/risicowoorden.md` | Uitspraaktest-clip en risicowoorden met tijdstempels per take |
| `src/lib.js` | Part C-tokens en tekenbibliotheek (cel, kern, mitochondrium, golgi, ER, labels, zoomcirkel, bord) |
| `src/scenes.js` | Eén scènefunctie per segment (`s01` … `s27`) |
| `src/player.js` | Speler: tijdlijn, vragen, Havo/Vwo, Leerling/Klas, ondertitels |
| `src/page.html` | Pagina-sjabloon: kop, begrippen, checkvragen, docentdeel; placeholders `/*FILMDATA*/`, `/*LIB*/`, `/*SCENES*/`, `/*PLAYER*/`, `/*NAV*/` |
| `bouw/make_segments.py` | script_v2.md → segments.json (+ stem-invoer) |
| `bouw/build_data.py` | segments.json + woordtijden + vragen/antwoorden → filmdata.json |
| `bouw/build.py` | sjabloon + data + js → `film/index.html` (site, met navigatie) en `film/standalone.html` |
| `bouw/shots.py`, `contact.py`, `test_play.py`, `test_mobile.py` | Stills per segment/tijd, contactsheets, speler- en telefoontest (Playwright) |
| `reviews/` | De vier reviewpasses (expert, didactiek + taal, curriculum) en de beeldreview |

**Werkmap opzetten:** kopieer `bron/src`, `bron/bouw/*.py`, `bron/script_v2.md` naar een werkmap; zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`; zet de mp3's uit `../audio/` in `master/` en `film/audio/`. Daarna: `python3 build_data.py && python3 build.py`.

**Tekst wijzigen:** pas `script_v2.md` aan → `make_segments.py` (zet daarna in segments.json `s03` op `kind: title` en `s28` op `kind: card`) → alleen gewijzigde segmenten opnieuw inspreken (Roos, eleven_v4, één take, stem-invoer uit `voice`) → woordtijden met Scribe → mastering −16 LUFS → `build_data.py` → `build.py` → controleer met het cue-script in `info.md` (stap 2 hieronder) dat elke `q.at('woord')` nog bestaat.

## Opbouw
Begintijden in de stand Vwo (tussen haakjes Havo waar anders). Type en look zoals in de docenttabel op de pagina.

| Begin | Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|---|
| 0:00 | Cold open | I/B toepassing · Schema → Macro-lichaam → zoomcirkel Micro | Alvleesklier; één kliercel die blaasjes naar buiten brengt |
| 0:36 | Titel (5 s) | — · Micro | "Celorganellen — Een fabriek die leeft" met bewegende cel |
| 0:41 | H1 Wat moet één cel allemaal kunnen? | B · Schema | Bacterie (één ruimte) naast eukaryote cel; bord met zes levenskenmerken |
| 1:38 | H1b Een cel van dichtbij | B · Micro | Cel kantelt kort tot "blokje"; membraan, cytoplasma, organellen |
| 2:32 | H2 De bouwtekening: de kern | B · Micro | Kern met losse chromatinedraden; zoomcirkel: DNA als dubbele helix met basenparen; RNA-werkkopie (teal, enkele streng) wordt afgelezen en gaat door een kernporie naar buiten; DNA blijft binnen; bij replicatie splitst de helix in twee |
| 3:46 | H3 De werkvloer: ribosomen, ER en golgisysteem (+ vwo-blok) | B/C · Micro | Blaasjestransport ER → golgi → membraan; vwo: één enzym gevolgd, adreslabel, exo-/endocytose |
| 6:36 (5:06) | H4 De krachtcentrale: het mitochondrium (+ vwo-blok) | B · Micro → Schema | Glucosebrokstukken en zuurstof in, ATP en koolstofdioxide uit; cristae met oppervlakbalk; vwo: hartspiercel vs vetcel |
| 8:34 (6:34) | H5 Opruimen en in evenwicht blijven: lysosomen en vacuolen | B/D · Micro | Lysosoom versmelt met afvalblaasje; pH-balk; vacuole en turgor |
| 9:48 (7:48) | H6 De grens en het skelet: celmembraan en cytoskelet (+ vwo-blok) | B/D · Micro | Selectief membraan, ontvanger-eiwit; timelapse; vwo: motoreiwit op rails |
| 10:53 (8:35) | H7 Plantencel en dierlijke cel (+ vwo-blok) | B · Schema | Vergelijking op één grondlijn; wand als zeef; nachtscenario; vwo: grana |
| 12:40 (10:08) | Recap | — · Schema | Zes levenskenmerken + route ribosoom → buiten; "een fabriek die leeft" |
| 13:21 (10:49) | Eindkaart (9 s) | — · Schema | Drie kernzinnen |

## Vragen
Acht voorspelvragen (zeven basis, één vwo). De stem eindigt het voorafgaande segment met "Wat denk je?"; de vraag zelf staat alleen op het scherm (8 s denktijd + 6 s onthulling). Juiste antwoord vet.

| Plek | Niv. | Vraag | Opties |
|---|---|---|---|
| Cold open, 0:22 (q02) | basis | Hoe krijgt één cel dat voor elkaar? | a de enzymen lekken gewoon de cel uit · b de cel maakt ze in één ruimte en pompt ze naar buiten · **c de cel heeft er een route van aparte onderdelen voor** |
| H1b, 2:18 (q06) | basis | Deze cel maakt heel veel eiwitten. Welk onderdeel heeft hij daarvoor het hardst nodig? | a veel mitochondriën · **b de bouwtekeningen in de kern** · c een dikke celwand |
| H2, 3:32 (q08) | basis | Een rode bloedcel heeft geen kern. Na vier maanden is hij versleten. Waarom? | **a zonder bouwtekening kan hij versleten eiwitten niet vervangen** · b hij krijgt geen voedsel meer · c hij wordt te groot |
| H3, 4:52 (q10) | basis | Een alvleeskliercel heeft veel meer ruw ER dan een huidcel. Hoe komt dat? | a hij is groter · **b hij maakt veel meer eiwitten voor buiten de cel** · c hij deelt vaker |
| H3-vwo, 6:15 (q12) | vwo | Twee eiwitten verlaten het golgisysteem: één voor buiten de cel, één voor de opruimdienst. Wat bepaalt waar elk heen gaat? | a hun grootte · **b het adreslabel dat het golgisysteem erop zette** · c toeval: ze drijven weg |
| H4, 7:14 (q15) | basis | Wat gebeurt er als de cristae er niet waren? | a niets, verbranden gaat net zo goed · **b de cel maakt minder ATP** · c het mitochondrium wordt groter |
| H5, 9:07 (q19) | basis | Wat gebeurt er als er een enzym uit een lysosoom lekt? | a het breekt de hele cel af · **b weinig: in het cytoplasma is het niet zuur genoeg** · c de cel maakt meteen een nieuw lysosoom |
| H7, 11:55 (q24) | basis | Heeft een plantencel ook mitochondriën? | a nee, chloroplasten doen dat werk · **b ja, elke plantencel verbrandt glucose, dag en nacht** · c alleen cellen zonder chloroplasten, zoals in de wortel |

Checkvragen (examenstijl, statische HTML onder "Checkvragen"): 1 Organellen en celfunctie (2 p) · 2 Plantencel en dierlijke cel (2 p) · 3 Kern en levenskenmerken (2 p) · 4 Eiwitroute (vwo, 3 p) · 5 Bouw en functie (vwo, 3 p). Antwoorden met puntverdeling staan ingeklapt op de pagina.

## Begrippen
Uit `GLOSSARY` (vwo-termen gemarkeerd met *vwo*).

- levenskenmerken — Wat levende wezens doen: stoffen omzetten, groeien, zich voortplanten, bewegen, reageren op de omgeving, zichzelf in evenwicht houden.
- prokaryoot — Cel zonder kern en zonder membraanorganellen, met losse ribosomen, zoals een bacterie.
- eukaryoot — Cel met een kern en organellen, zoals je eigen cellen en plantencellen.
- organel — Onderdeel van de cel met een eigen bouw en eigen taken.
- celmembraan — Dun vlies om de cel dat sommige stoffen doorlaat en andere niet, en signalen van buiten opvangt.
- cytoplasma — De stroperige vulling van de cel binnen het membraan, waarin de organellen liggen.
- celkern (kern) — Grootste losse organel; bevat het DNA. Omgeven door een dubbel kernmembraan met kernporiën.
- kernmembraan — Dubbel membraan om de kern.
- kernporiën *vwo* — Openingen in het kernmembraan waardoor werkkopieën van het DNA de kern uit gaan.
- DNA — Bouwtekening van bijna elk eiwit dat de cel maakt; blijft in de kern.
- ribosoom — Klein deeltje dat eiwitten maakt; los in het cytoplasma of op het ruw ER.
- endoplasmatisch reticulum (ER) — Netwerk van membranen. Ruw ER heeft ribosomen; eiwitten voor buiten de cel worden erin gevouwen en gecontroleerd.
- golgisysteem — Stapel platte zakjes die eiwitten bewerkt, sorteert en in blaasjes verpakt.
- blaasje — Klein membraanblaasje dat stoffen vervoert in de cel (vakterm: vesikel).
- exocytose *vwo* — Een blaasje versmelt met het celmembraan en de inhoud komt buiten de cel.
- endocytose *vwo* — Een stuk celmembraan stulpt in en haalt iets de cel binnen.
- mitochondrium (mv. mitochondriën) — Organel waar de verbranding van glucose met zuurstof wordt afgemaakt: er ontstaat ATP en er komt koolstofdioxide vrij; binnenmembraan geplooid tot cristae.
- cristae — Plooien van het binnenmembraan van een mitochondrium; vergroten het oppervlak voor de eiwitten die ATP maken.
- ATP — Energiedrager van de cel.
- stofwisseling — Alle omzettingen van stoffen in de cel: opbouw (assimilatie) en afbraak (dissimilatie).
- lysosoom — Blaasje vol afbraakenzymen; binnenin zuur. Breekt afval af tot bouwstenen die de cel opnieuw gebruikt.
- homeostase — Zichzelf in evenwicht houden.
- vacuole — Holte vol water in een plantencel; bouwt druk op tegen de celwand en houdt de plant stevig.
- celwand — Stevige laag cellulose buiten het celmembraan van een plantencel; werkt als zeef.
- chloroplast (bladgroenkorrel) — Groen organel waar fotosynthese plaatsvindt: met lichtenergie wordt uit water en koolstofdioxide glucose gemaakt.
- grana *vwo* — Stapels schijfjes in een chloroplast met de eiwitten die licht vangen.
- cytoskelet (celskelet) — Netwerk van eiwitdraden in de cel: geeft vorm en werkt als rails voor transport; sommige cellen bewegen ermee.
- motoreiwit *vwo* — Eiwit dat met een blaasje over een draad van het cytoskelet loopt.
- ontvanger-eiwit (receptor) — Eiwit in het membraan waarop een hormoon of ander signaal past.

## Docentdeel
Sectie "Voor de docent" (statische HTML): tabel "Hoe de film het uitlegt" (hoofdstuk · type · look · kernbeeld, zie Opbouw); zes misconcepties (cel is plat; organellen staan stil; chloroplasten vervangen mitochondriën; celwand vervangt celmembraan; de kern bestuurt de cel; je hebt organellen nodig om te leven); pauzemomenten (acht voorspelvragen, Klas-modus wacht op "verder"; extra pauzes bij de oppervlakbalk H4 en de wand-als-zeef H7); vereenvoudigingen (plat getekend; "brokstukken van glucose" = pyruvaat; adreslabel = sorteersignalen zoals mannose-6-fosfaat; "chloroplast maakt glucose"; timelapse gestileerd); leerdoelen 0–8 met dekking; practicumsuggesties (ui-cellen, waterpest, aardappelstaafjes, EM-foto's vergelijken).

Getallen in de film (overgenomen):

| Getal | Waarde | Bron | Afronding |
|---|---|---|---|
| Verteringssap alvleesklier | ruim 1 L/dag (1–1,5 L; ~10–20 g enzym-eiwit) | Guyton & Hall, Textbook of Medical Physiology 14e ed., h. 65 | ja |
| Grootte alvleeskliercel | 10–15 µm → "ongeveer een honderdste millimeter" | Ross & Pawlina, Histology 8e ed., h. 18 | ja |
| Eukaryote cel vs bacterie | 10× in lengte/breedte (10–30 µm vs 1–2 µm); ~1000× in volume | Alberts e.a., Molecular Biology of the Cell 7e ed., h. 1 | orde van grootte |
| Ribosomen per cel | miljoenen (10⁶–10⁷) | Alberts 7e ed., h. 6 | ja |
| Oppervlak binnenmembraan / buitenmembraan | ≈ 5× in een levercel (32 % vs 7 % van alle celmembraan); hartspier hoger | Alberts 7e ed., h. 12, tabel 12-2 | ja, celtype genoemd |
| Mitochondriën | hartspiercel ~1/3 van celvolume, duizenden; huidcel/fibroblast orde 10²–10³ | Alberts 7e ed., h. 14; Barth e.a., J Mol Cell Cardiol 1992 | ja |
| Rode bloedcel | levensduur ~120 dagen (4 maanden); geen kern, ribosomen of mitochondriën bij rijpe zoogdiercel | Guyton & Hall 14e ed., h. 33 | ja |
| pH lysosoom / cytoplasma | ≈ 4,5–5 / ≈ 7,2 | Alberts 7e ed., h. 13; Mindell, Annu Rev Physiol 2012 | ja |

## Techniek: waar zit wat in de HTML
Regelnummers verwijzen naar film.src.html (= index.html; er zijn geen blobs, dus de regels zijn gelijk).

- **Alle filmdata**: regel 157, `window.FILMDATA = {segments, chapters}`. Elk segment heeft `id` (s01, q02 …), `kind` (`speech` / `question` / `title` / `card`), `level` (`basis` / `vwo`), `chapter` (exacte hoofdstuknaam, stuurt de hoofdstukkaarten). Speech-segmenten hebben `audio` (pad naar mp3), `dur` (s) en `words` (`{t, s, e}` per woord, tijd in s vanaf het begin van dat mp3-bestand). Vragen hebben `q`, `options`, `correct` (index 0-based), `explain`.
- **Ondertitels en transcript**: worden gegenereerd uit `words` (`chunks()`/`drawCaption()` ± regel 852–863; transcript in `init()` ± regel 909). Er is dus geen aparte ondertiteltekst. Beide vervangen nog `ee-er` → ER en `dee-en-aa` → DNA, maar de huidige woorddata bevat al "ER" en "DNA".
- **Scènes**: regel 352–732, object `SCENES` met één functie per speech-id (`s01(ctx,t,q,st)` … `s27`). `t` = seconden in het segment; `q.at('woord', n)` = begintijd van het n-de woord dat 'woord' bevat (zoeken zonder hoofdletters/leestekens); `q.on(...)` = ramp 0..1. Beeldwissels hangen dus aan woorden, niet aan vaste tijden. Tekenbibliotheek (cel, kern, mitochondrium, golgi, ER, ...) regel 158–350; kleurtokens `C` regel 159.
- **Bord met levenskenmerken**: `board()` regel 341; de zes lampjes gaan aan op woordcues in `buildTimeline()` (regel 793: `s09 'opbouwkant'`, `s09 'Groeien'`, `s07 'voortplanten'`, `s21 'Bewegen'`, `s21 'Reageren'`, `s20 'homeostase'`). In `render()` (regel 813) staat de lijst segmenten zonder bord.
- **Begrippen**: `GLOSSARY` regel 735–764.
- **Speler**: regel 765–915. `buildTimeline()` (regel 780) zet de segmenten achter elkaar: hoofdstukkaart 3,5 s (`CARD_DUR`) bij elke nieuwe `chapter`, titel 5 s, eindkaart 9 s, vraag 8 s (`COUNTDOWN`) + 6 s (`REVEAL`); vwo-segmenten vallen weg in de stand Havo. Er is één `<audio id="narration">`; bij elk speech-item wordt `audio.src = seg.audio` gezet en loopt het item tot `seg.dur`. URL-parameters `?niveau=havo` en `?modus=klas`; Leerling/Klas en "vragen automatisch verder" in de bediening.
- **Pagina-tekst** (kop, checkvragen, docentdeel, footer) is statische HTML in regel 63–155.

## Zo pas je deze film aan
1. **Tekst op het scherm** (labels, kaarten, haken): zoek de string in de scènefunctie van het betreffende segment (bijv. `s16(` voor de cristae-scène) en pas hem daar aan; hoofdstuk-subtitels staan in `drawChapterCard()` (`mini`), titelkaart in `drawTitle()`, eindkaart in segment `s28.lines`.
2. **Eén alinea opnieuw inspreken**: vervang alleen `audio/sNN.mp3` en zet in FILMDATA bij dat segment nieuwe `words` (met tijden uit de nieuwe take) en `dur`. Elk segment is een eigen take, dus de andere segmenten blijven ongemoeid. Controleer daarna in de scènefunctie of elke `q.at('woord')` nog een woord vindt; een ontbrekend woord geeft `Infinity` en het beeld verschijnt dan stil niet (geen foutmelding). Let ook op de bordcues in `buildTimeline()`.
3. **Ondertitel corrigeren zonder nieuwe opname**: pas het woord in `words[].t` aan (tijden laten staan). Let op dat `q.at()` op dezelfde woorden zoekt.
4. **Vraag aanpassen**: wijzig `q`, `options`, `correct`, `explain` van het `q..`-segment. De gesproken aanloop ("Wat denk je?") zit in het voorafgaande speech-segment.
5. **Havo/vwo-indeling wijzigen**: zet `level` van een segment op `basis` of `vwo`; de hoofdstuklijst en de vwo-markering volgen vanzelf. Checkvragen met `class="q vwo-only"` en begrippen met `vwo:true` worden in Havo verborgen.
6. **Nieuw segment toevoegen**: nieuw object in `segments` (op de juiste plek), nieuwe mp3 in audio/, en een functie met dezelfde id in `SCENES`; zonder functie toont de speler alleen de Schema-achtergrond.

## Aandachtspunten
- Volgt Part C en de v3/v4-opzet (Havo/Vwo, Leerling/Klas, voorspelvragen, typekolom). Het enige gemengde: lettertypen komen van Google Fonts (extern) in plaats van ingebed; offline of bij een blokkade vallen ze terug op Georgia/system-ui.
- H2 en H4 zijn op 11 oktober 's avonds herzien (zie versie 1.2); de regelnummers hierboven kunnen daardoor iets verschoven zijn.
- De voorspelvragen worden niet ingesproken (alleen "Wat denk je?" aan het eind van de alinea); de leerling moet de vraag zelf lezen.
- `chunks()` en de transcriptopbouw bevatten nog respelling-vervangingen (`ee-er`, `dee-en-aa`) die in de huidige data niet voorkomen; onschuldig, maar wijst erop dat de stem-invoer andere spelling had dan de ondertitels. De echte stem-invoer staat in `stem/segmenten_stem-invoer.json`.
- De audio staat als losse bestanden naast index.html (de andere films van de site zijn vaak één bestand met ingebedde audio); de map audio/ moet dus altijd mee gekopieerd worden.
- Op de site-index staat deze film als nummer 2 van de cellen-rij, met "Onderzoek doen in de biologie" als nummer 1; in de reeks Cel is film 1 bedoeld als Diffusie, osmose en membraantransport.

## Versie 1.3 (review)
- Opnieuw ingesproken (Roos, eleven_v4, één take, nieuwe flow pugAiMuwBeN2wn4hgU9z): s04 (bacterie "zonder kern en zonder organellen met een membraan"; "in deze film gebruiken we er zes"), s05 (vraag q06 nu "Waar begint het maken van elk eiwit?"), s07 ("de kern bestuurt de cel: dat klopt, maar niet met bevelen"), s09 (groeien: "eiwitten die de cel zelf houdt"), s11 (golgisysteem sorteert op labels), s14 ("een mitochondrium heeft twee membranen" nu in de basis), s17 (cue nu 'binnenste'; vetcel-zin eenduidig), s20 (vacuole "blaas met een membraan, gevuld met celvocht"), s23 (celwand-zeef "water en opgeloste stoffen").
- In de nieuwe takes is DNA ingevoerd als "deeënaa" (vaste voorkeur sinds 12 okt 2026; oudere takes hebben "dee-en-aa") en koolstofdioxide als "koolstofdie-oxide".
- Beeld: kaart kern groen en positief ("klopt, maar niet met bevelen"), lager zodat hij het DNA-label niet bedekt; mitochondrium-label "hier wordt ATP gemaakt"; s17 wijslijnen buiten-/binnenmembraan; vacuole-labels aangepast.
- Pagina: kernporiën niet meer vwo-only, antwoord checkvraag 2 (ATP wordt gemaakt), misconceptie 5 en dekkingstabel (leerdoel 8 basis), footer 1.3.
- `bouw/checkcues.js` toegevoegd (uit Diffusie).
- Open: kleinere overlappen en afgesneden labels (s01, s04, s11, s14, s16, s18, s20, s21, s23), werkkopie in beeld bij s09, plantje s20 begint slap (zie review_v2.md).
