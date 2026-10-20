# Vaccins, allergie en bloedgroepen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/afweer/4-vaccins-allergie-en-bloedgroepen.html (audio in films/afweer/4-vaccins-allergie-en-bloedgroepen/audio/) |
| Reeks / nummer | Bescherming en afweer, film 4 van 4, slotfilm (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*); koppeling met de tool `tools/bloedgroepenlab.html` |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s16 (IgE) en s22–s23 (resusantagonisme, anti-D-injectie). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow zOFT3hqvc7LAgfwdQgn6; nodes in `stem/takes.json`) |
| Duur | spraak 9:11 (vwo) / 7:42 (havo). Speeltijd met kaarten en vragen: vwo ≈ 11 min, havo ≈ 10 min |
| Beeldstijl | Part C: Macro (GGD-prikpost met Noor en een verpleegkundige, grasveld met stuifmeel), Schema (vaccinsoorten, kloon en geheugencellen, schema actief/passief × natuurlijk/kunstmatig, grafiek eerste en tweede prik, groepsimmuniteit met poppetjes, serumgrafiek, terugblik op de reeks), Micro (allergie met plasmacel en mestcel, histamine en haarvat, eilandje van Langerhans, rode bloedcellen met A, B en D, klonteren, bloedgroepbepaling, moeder en kind bij resusantagonisme). Kleuren in `scenes.js` gelijk aan het Bloedgroepenlab: A `KA #5B9BEA` (blauw), B `KB #D9A21E` (geel/oker), D `KD #2DB585` (groen); anti-A/anti-B/anti-D in dezelfde kleur als hun antigeen; stuifmeel `POL`, rode bloedcel `RBC` |
| Audio-opslag | 21 losse mp3's in audio/ (s01 … s26), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js`; figuren uit film 1 (`mestcel`, `haarvat`), film 2 (`virus`, `bCel`, `antistof`) en film 3 (`lCel`, `tCel`, `pil`) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks) en **`uitspraak_film.json`** (alleen deze film: losse bloedgroepletters A, B, AB, O, D, ABO, antihistaminica, tetanus, Bloedgroepenlab) |
| `reviews/` | Expert (immunoloog/bloedbank), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `a4/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `uitspraak_film.json` (uit `bouw/`), `words/` (= `stem/woordtijden/`) en `film/4-vaccins-allergie-en-bloedgroepen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py a4 script_v2.md && (cd a4 && python3 film.py) && python3 engine/build_data.py a4 && python3 engine/build.py a4` → `a4/film/4-vaccins-allergie-en-bloedgroepen.html`. `make_segments.py` leest `uitspraak_film.json` uit de werkmap als die er staat.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Noor krijgt een prik bij de GGD-prikpost; kaartje 'tweede prik over een half jaar'; vraag q02 |
| Titel | Micro | Rode bloedcellen met antigenen, antistoffen en een spuit |
| H1 Oefenen zonder ziek te worden (s04–s10) | I · Schema | Virus met antigenen en geheugencel; vijf soorten vaccin (verzwakt, gedood, stukje, onschadelijk gif, mRNA); cel maakt het viruseiwit, recept afgebroken, niet in je DNA; kloon van B- en T-cellen met geheugencellen; actieve immunisatie; schema actief/passief × natuurlijk/kunstmatig; grafiek eerste en tweede prik (primaire en secundaire reactie); groepsimmuniteit (16 × 7 poppetjes, 95 %, baby's); wond en tetanus-serum; vraag q09; serumgrafiek (afbraak in weken); moeder → baby via placenta en moedermelk; schema compleet |
| H2 Alarm om niets (s11–s16) | I · Macro + Micro | Grasveld met stuifmeel, iemand met hooikoorts; vraag q12; schaal te zwak – normaal – te sterk; allergeen, plasmacel, antistoffen op mestcel; volgend contact: stuifmeel bindt, histamine, haarvat wijder en lekt; antihistaminicum; eilandje in de alvleesklier aangevallen door T-killercellen (diabetes type 1). Vwo s16: IgE met de steel op de mestcel, allergeen verbindt twee IgE |
| H3 Vormpjes op je bloed (s17–s23) | I · Micro | Bloedgroep A, B, AB, O met antistoffen in het plasma; transfusie B → A: klonteren en kapot; bloedgroepbepaling met anti-A- en anti-B-serum; vraag q19; O-cel zonder antigenen, O-plasma met anti-A en anti-B, zak met alleen rode bloedcellen; antigeen D, anti-A/B heb je al, anti-D pas na contact; O resusnegatief en AB resuspositief. Vwo s22–s23: moeder en kind 1 en 2, anti-D door de placenta, afbraak; anti-D-injectie met tijdlijn, markeren en opruimen |
| Recap en slot (s24–s26) | Macro + Schema | Noor bij de tweede prik met de antwoordketen; vier panelen: splinter, waterpokken, griep, vaccin; eigen tegenover vreemd; Bloedgroepenlab |
| Eindkaart (s27) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom is één prik niet genoeg? | b je afweer heeft de eerste prik onthouden, en reageert nu sterker (onthulling in s06 en recap) |
| q09 | basis | Hoe lang beschermen kant-en-klare antistoffen (serum)? | a een paar weken: daarna zijn de antistoffen afgebroken |
| q12 | basis | Wat zegt hooikoorts over iemands afweer? | c die reageert te sterk, op iets onschuldigs |
| q19 | basis | Waarom mag iemand met A wel bloed van O, maar niet van B? | b op rode bloedcellen van O zit geen A en geen B |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord bee/aa/cee/bee") staat wél in de audio van s06, s10, s13 en s20.

Checkvragen (statisch in de pagina): 1 Twee prikken of één injectie (tabel) · 2 Een huidpriktest · 3 Bloed voor de spoedeisende hulp (bloedgroepbepaling) · 4 Drie zwangerschappen (resusantagonisme, vwo).

Begrippen: vaccin, actieve en passieve immunisatie, groepsimmuniteit, allergie, auto-immuunziekte, bloedgroepen, resusfactor, agglutinatie, universele donor; vwo: resusantagonisme, IgE.

## Waar wat in de HTML zit (regelnummers in `4-vaccins-allergie-en-bloedgroepen.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Afweer" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–156 | Checkvragen (100–121), Voor de docent (122–156) |
| 157 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 158–379 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 380–950 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 951–1201 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1202–1349 | `scenes.js`: hulpstukken van deze film |
| 1350–1563 | `SCENES`: title 1351 · s01 1356 · s04 1359 · s05 1374 · s06 1386 · s07 1396 · s08 1408 · s10 1415 · s11 1429 · s13 1436 · s14 1454 · s15 1466 · s16 1477 · s17 1485 · s18 1493 · s20 1509 · s21 1517 · s22 1525 · s23 1534 · s24 1543 · s25 1548 · s26 1553 |
| 1564–1731 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Eindkaart:** de drie regels onder `## Eindkaart` in `script_v2.md` (niet ingesproken); houd ze kort (± 85 tekens), anders lopen ze buiten de kaart.
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'ziek' vindt eerst 'ziekteverwekker' en een losse 'A' vindt elk woord met een a — gebruik daarom woorden als 'antigeen', 'allebei', 'beide').
- **Figuren:** `rbcAg(ctx, x, y, r, 'A'|'B'|'AB'|'O', {rh, kapot, ag})` (rode bloedcel met antigenen), `antiY(ctx, x, y, schaal, hoek, 'A'|'B'|'D', alpha)` (armen wijzen bij hoek 0 omhoog), `spuit`, `stuifmeel`, `prikpost(ctx, t, {prik, kaart})`, `poppetje`, `immuunTabel(ctx, x, y, cellen, alpha)`, `prikCurve`, `serumCurve`, `moederKind(ctx, x, y, s, t, {antiD, kapot, label})`, plus `mestcel`, `haarvat`, `lCel`, `tCel`, `bCel`, `virus`, `antistof`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral de losse letters (aa, bee, oo, dee), reezus, anti-dee-injectie, em-erenaa, ie-gee-ee en antie-histamienieka. Een blinde controle was in deze sessie niet mogelijk.
- De losse bloedgroepletters staan bewust in een film-eigen lijst (`uitspraak_film.json`), zodat bijvoorbeeld "vitamine A" in andere reeksen niet verandert.
- Getallen en kleuren volgen het Bloedgroepenlab.
- Eindreview: 12 punten; 11 verwerkt zonder nieuwe opname (zie `reviews/eind.md`). Niet apart aangepakt: het algemene advies over in- en uitfaden van tags op dezelfde plek.

## Wachtlijst opnieuw inspreken

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet hem bij het opnemen ook in `script_v2.md`).

- **H3 Vormpjes op je bloed · s20** (basis): voor plasma is AB de universele donor (geen anti-A en geen anti-B in het plasma), tegenover O voor rode bloedcellen; O resusnegatief staat al in s21. Take s20 opnieuw (≈ +9 s), Roos, eleven_v4, één take; `make_segments.py` met `uitspraak_film.json` in de werkmap (dan wordt AB vanzelf `aa-bee`, A `aa`, B `bee`); Scribe + `align.py`; mp3 genormaliseerd in `audio/`. De cues in s20 (`bee`, `plasma`, `rode`, `ontvanger`, `bloedbank`, `universele`) staan vóór de nieuwe zinnen en blijven kloppen; let op dat `q.on('universele', 1)` de eerste keer blijft (de nieuwe zin bevat een tweede "universele"). Vul in de eindkaart of het docentdeel eventueel "AB geeft plasma aan iedereen" aan (eindkaart max ± 85 tekens per regel).
- **Beeld nodig**: na de zak met rode bloedcellen een tweede zak "plasma" van AB, zonder anti-A en anti-B (lege plasma-ruimte, label "AB: universele donor voor plasma"), naast de O-zak met label "O: universele donor voor rode bloedcellen". Gebruik `rbcAg`/`antiY` en de kleuren KA/KB.
- **Risicowoorden (uitspraaktest)**: geen nieuwe. AB, A, B en "universele donor" komen al in de film voor (AB via `uitspraak_film.json` als `aa-bee`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'IgE'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe deze woorden moeten klinken. Opnieuw ingesproken: **s04, s14, s16, s17, s21, s22, s23, s25** (alleen deze alinea's; de rest van de audio is ongewijzigd). Stem-invoer = de oude invoer van die alinea met alleen deze woorden vervangen (inhoud gelijk):

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Alinea's |
|---|---|---|---|
| mRNA-vaccin | `em-erenaa-vaccin` | `mRNA-vaccin` | s04 |
| histamine | `histaminuh` | `histamine` | s14, s16 |
| IgE | `ie-gee-ee` | `IgE` | s16 |
| AB (bloedgroep) | `aa-bee` | `A B` | s17, s21 |
| resus… | `reezus…` | `resus…` | s21, s22, s23 |
| ABO | `aa-bee-oo` | `A B O` | s21 |
| fagocyt(en) | `faagosieten` | `fagocyt / fagocyten` | s25 |

Roos (7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea (flow zOFT3hqvc7LAgfwdQgn6; nieuwe nodes in `stem/takes.json`, generatie-id's en duur in `stem/gen.json` met `heropname: uitspraaktest 19 okt 2026`). TTS-credits: 3446; Scribe-woordtijden (eleven_scribe_v1) per take, op de ondertitelwoorden uitgelijnd met `align.py` (alle takes ratio 1,0, geen verschillen); ruwe transcripten in `stem/status_timing_uitspraak_19okt.json`. In de HTML zijn alleen de woordtijden en `dur` van deze segmenten in `window.FILMDATA` vervangen (speler, beeld en cues ongewijzigd; de ondertitels waren al goed). `segments.json` (voice + vmap) en de duren in `script.md` zijn bijgewerkt. Bij opnieuw bouwen: de nieuwe invoer staat in `segments.json`; `bouw/uitspraak_subs.json` heeft de oude respellings voor deze woorden niet meer.

Let op: getest was alleen "AB" (bloedgroep) → `A B`. "ABO" is naar analogie `A B O` geworden (s21). De losse letters (`aa`, `bee`, `oo`, `dee`) en `antie-histamienieka` zijn niet getest en ongewijzigd; s18 en s20 (alleen losse letters) zijn daarom niet opnieuw ingesproken. s25 (fagocyten) is extra meegenomen omdat fagocyten in de test is goedgekeurd. `bouw/uitspraak_film.json` en `bouw/uitspraak_subs.json` zijn hierop aangepast.

## Versie 1.1 · 20 oktober 2026 (beeld na feedback Kamiel)

Alleen beeld. Audio, script, vraagteksten en cues in de woordtijden zijn ongewijzigd. Overgenomen uit film 1: `antigeen(nx, ny)`, `bacterie` (antigenen rondom), `tCel` (receptor in vaste vorm; hier met kleur en draaiing erbij), `wissel`, `naamBij` en geen korrels op de achtergrond (`grainCanvas` 1×1). Castboek `lib_cast.js` staat in `src/` en is toegevoegd aan /*LIBSERIES*/ in `bouw/build.py`. Ingebouwd met de vervangmethode uit de brief, zonder herbouw.

Nieuwe helpers: `opp()` (vormpje met de basis óp een oppervlak, punt langs de normaal), `rbcPunten()`/`rbcAg()` (A, B en D loodrecht rondom de rode bloedcel; `kapot` = membraan scheurt en de inhoud lekt weg), `bindY()` (een antistof die met zijn bindplaats precies op de punt van een antigeen zit), `ySteel()` (IgE met de steel op de mestcel), `brugY()`/`bruggen()` (anti-A/anti-B als brug tussen twee cellen = agglutinatie), `virus()` (antigenen op steeltjes, RNA binnenin), `moederBuik()` (Dr. Kim zwanger, met een kijkje in de buik: baarmoeder, placenta, baby uit het castboek), `bloedzak()`, `mrna()`, `ribosoom()`, `eiwitKeten()`.

| Scène | Wat er veranderde |
|---|---|
| s01, s24 | Grijze poppetjes vervangen: Dr. Kim (labjas) geeft Noor de prik in de bovenarm; Noor kijkt bij 'Waarom' bedenkelijk, in s24 blij bij 'jarenlang'. Prikpost gespiegeld (Kim links, tafel met spullen) |
| s04 | Virus met antigenen loodrecht rondom; de geheugencel met passende receptor komt in beeld en het virus schuift ernaartoe. mRNA-deel: een ribosoom loopt over de mRNA-slier, de eiwitketen komt eruit en vouwt op, daarna verschijnen de viruseiwitten één voor één loodrecht op het celmembraan; het recept valt in stukjes uiteen; de kern met chromatine licht op bij 'DNA'. Vijf vaccinsoorten: stukje = antigenen op steeltjes, gif = zeshoekjes. Tekstbalken via `wissel` |
| s05 | Klonale selectie: vijf B-cellen met verschillende receptoren, de passende (vorm 0) licht op en deelt tot een kloon, twee worden geheugencel ★; hetzelfde bij T-cellen. Antigeen uit het vaccin bovenaan |
| s06 | Grafiek gelijk; ernaast geheugencellen: eerst 3, na de tweede prik 9. Tekstbalken via `wissel` (overlap opgeheven) |
| s07 | Telpoppetjes blijven (beeldafspraak: pictogrammen in een telling mogen). Bij 95 % ketsen virusjes af op de beschermde buren. Tekstbalken via `wissel` |
| s08 | Bilal (sport) met de wond aan zijn been; inzoomcirkel met tetanusbacteriën (antigenen rondom); de serum-antistoffen binden met hun bindplaats óp de antigenen |
| s10 | Grafiek gelijk; 'geen B-cel, geen geheugencel' als doorgestreepte geheugencel. Moeder → baby: Dr. Kim zwanger (kijkje in de buik), antistoffen gaan via de placenta naar de baby |
| s11 | Lotte (zomer) in plaats van grijze persoon; ze niest bij 'niezen' (kijkt bezorgd, druppeltjes); bloeiende grassen; tekstbalken via `wissel` |
| s13 | Schaal als kleurbalk; de stip schuift eerst naar 'te zwak' en dan naar 'te sterk'. Stuifmeel komt bij de B-cel, die wordt plasmacel; de antistoffen vliegen naar de mestcel en gaan er met hun steel op vastzitten. Vijf tekstbalken via `wissel` |
| s14 | IgE met de steel op de mestcel; stuifmeel komt aan en verbindt telkens twee armen; namen mestcel en histamine erbij |
| s15 | Uitgeschakelde afweercellen (grijs) vervagen; drie T-killercellen met receptor naar de cellen trekken naar het eilandje, gloeien en de cellen vallen uiteen. Tekstbalken via `wissel` |
| s16 | IgE met de steel precies op het membraan (`ySteel`); het allergeen zakt tussen twee IgE en verbindt hun armen |
| s17 | Antigenen A/B loodrecht rondom (nieuwe `rbcAg`); antistoffen in het plasma bewegen zacht |
| s18 | Transfusie B → A: de cellen schuiven samen en anti-B vormt bruggen tussen antigenen van twee cellen (echte agglutinatie); bij 'kapot' scheuren de cellen. Bloedgroepbepaling: druppel serum valt in elk putje; in anti-A klonteren de cellen tot drie klontjes met bruggen, in anti-B blijven ze los. Bij 'wel' een vinkje bij donor O |
| s20 | Antistoffen van de ontvanger zweven rond de O-cel zonder te binden; bloedzak 'O · rode bloedcellen' in plaats van een rood blok. Tekstbalken via `wissel` |
| s21 | Alleen de nieuwe `rbcAg` (D loodrecht rondom) en zachte beweging |
| s22 | Twee keer Dr. Kim zwanger (kijkje in de buik) i.p.v. ovalen. Eerste kind: inzoom 'bloed van de moeder' waarin bij de bevalling D-positieve cellen binnenkomen, daarna anti-D en een geheugencel. Volgend kind: inzoom op de placenta (moeder | kind); anti-D gaat erdoor, bindt op D en de cellen van het kind scheuren |
| s23 | Anti-D bindt met de bindplaats op de D-antigenen van de cellen van het kind; de fagocyt neemt de gemarkeerde cellen één voor één op. Tekstbalken via `wissel` |
| s25 | Vaccinpaneel met Noor; bacterie en virus met antigenen rondom; T-cel met receptor |
| s26 | Virus met antigenen loodrecht; tekstbalken via `wissel` |

Bewust gelaten: de grafieken in s06 en s10 en het schema actief/passief (die zijn al duidelijk), de telpoppetjes in s07, de opbouw van s17 en s21 (alleen nieuwe cellen), de titelkaart. `lCel` (eigen cellen met MHC) is ongewijzigd; die stukjes stonden al loodrecht. Gecontroleerd met stills van alle scènes (geen JS-fouten, geen overlappende tekstbalken).
