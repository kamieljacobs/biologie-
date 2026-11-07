# Uitscheiding en evenwicht — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/gaswisseling/3-uitscheiding-en-evenwicht.html (audio in films/gaswisseling/3-uitscheiding-en-evenwicht/audio/) |
| Reeks / nummer | Gaswisseling en uitscheiding, film 3 van 3 (slotfilm; seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*). Nefron en ADH zitten in Hormonen 5 (Water in balans) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s11 (evenwicht CO₂/H₂CO₃/HCO₃⁻, nierbuisje) en s15–s17 (vraag q16 tegenstroom, meestroom, peritoneale dialyse). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.1 · 26 oktober 2026 (gerichte ronde: nieuw hoofdstuk 3 *De huid*); 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus) |
| Prompt | onbekend · gemaakt 14 okt (gerichte ronde 26 okt 2026: alleen hoofdstuk 3 *De huid* is gemaakt volgens prompt v10; de rest van de film is niet opgewaardeerd) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow kGlmzmyfNKdrKMpO2D4s; nodes in `stem/takes.json`) |
| Duur | spraak 10:29 (vwo) / 8:51 (havo), waarvan hoofdstuk 3 *De huid* 2:18. Speeltijd met kaarten en vragen: vwo ≈ 12 min, havo ≈ 10 min |
| Beeldstijl | Part C: Macro (dialyseafdeling met Ruud), Schema (lichaam met uitscheidingsorganen, levercel, meters, pH-schaal, regelkring, filter, vlies met concentratiebalken, concentratieprofielen, buikholte), Micro (cellen met eiwitten en afweercel). Kleuren in `scenes.js`: bloed `#B5574A` (constante `BLD`), dialysevloeistof `#5BA4C9`, ureum `#C9A35C`, glucose `#7FC48F`, natrium `#AFC0D0`, kalium `#D98CC0`, waterstofcarbonaat `#9A8FB8`, H⁺ `#E0B64A` |
| Audio-opslag | 15 losse mp3's in audio/ (s01 … s21), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (algemene helpers) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (nefroloog), didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `g3/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/3-uitscheiding-en-evenwicht/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py g3 script_v2.md && (cd g3 && python3 film.py) && python3 engine/build_data.py g3 && python3 engine/build.py g3` → `g3/film/3-uitscheiding-en-evenwicht.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Ruud in een stoel naast de dialysemachine; zak dialysevloeistof; inzoom op het vlies (bloed links, vloeistof rechts) met ureum en glucose; vraag q02 |
| Titel | Schema | Twee nieren, ureumdeeltjes, weegschaal |
| H1 Wat moet eruit? (s04–s06) | B · Schema | Lichaam met darm (ontlasting), longen, huid, lever (galkleurstof) en nieren; vraag q05; levercel: aminozuur → stikstofgroep eraf → ammoniak (giftig) → ureum → bloed → nieren |
| H2 Alles binnen grenzen (s07–s11) | B + D · Schema | Cel in weefselvloeistof met vijf meters (homeostase); pH-schaal met 7,35–7,45 en 7,0 = neutraal; zuurbronnen, H⁺, buffers; s08 cel zonder insuline, zure stoffen in het bloed, vraag q09; regelkring pH (chemoreceptoren, ademcentrum, ademspieren, minteken); longen snel, nieren langzaam; Ruud. Vwo s11: evenwicht met pijl naar rechts/links, cel van een nierbuisje (H⁺ naar voorurine, HCO₃⁻ naar bloed) |
| H3 De huid (h01–h08, nieuw 26 okt 2026) | B + D · Macro, Schema | Noor (castboek, zijaanzicht, rennen) in een park: rood en zweet; koude dag: bleek, zoomcirkel op de onderarm met kippenvel. Huid in doorsnede (`huidBlok`, nieuw bibliotheekobject) met doorlopende zoom naar de opperhuid: hoornlaag, kiemlaag, één goud omrande cel die omhoog schuift. Lederhuid-onderdelen één voor één, onderhuids bindweefsel met vet, functies van de huid; vraag hq04; vergrote zweetdruppel die verdampt (warmte uit de huid) en een druppel die eraf druipt. Regelkring temperatuur (kringSchema) met de huid ernaast: warm (vaten wijder, zweet) en koud (vaten nauwer, kippenvel, vacht tegenover mensenhuid, vet isoleert, rillen). Brug: huid een beetje uitscheiding, ureum via de nieren; nieren op dezelfde plek als in s12 |
| H4 Als de nieren stoppen (s12–s20) | I · Schema + Micro | Nierfalen (meter < 15 %, ophoping); arm met shunt, slangen naar en van de filter; doorsnede met holle vezels; vlies met poriën; concentratiebalken per stof (ureum, glucose, natrium, kalium, waterstofcarbonaat) met diffusierichting en het 'gewoon water'-scenario; drinkbeperking; ultrafiltratie. Vwo: vraag q16, concentratieprofielen tegenstroom en meestroom, kieuwen, peritoneale dialyse met osmose. Transplantatie: vraag q19; jouw cel naast donorcellen met eiwitten, afweercel, familie, afweerremmers |
| Recap (s21) | Macro | Terug bij Ruud; de antwoordketen als vier labels |
| Eindkaart (s22) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom zit er wel glucose, maar geen ureum in de dialysevloeistof? | a zo gaat ureum het bloed uit, maar glucose niet (onthulling in s13 en recap) |
| q05 | basis | Welk orgaan maakt ureum? | b de lever |
| q09 | basis | Hoe ademt iemand met sterk verzuurd bloed? | a sneller en dieper |
| q16 | vwo | Dezelfde kant op of tegen elkaar in? | b tegen elkaar in (tegenstroom) |
| hq04 | basis | Zweet koelt je af. Hoe? | a het zweet verdampt, en dat kost warmte |
| q19 | basis | Wie is meestal de beste levende donor? | b een broer of zus |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/bee") staat wél in de audio van s06, s10, s13, s17 en s20.

Checkvragen (statisch in de pagina): 1 Uitscheiding en ureum (tabel lever/nier) · 2 Een dialysefilter (tabel) · 3 Twee keer zuur bloed (tabel; d–e vwo) · 4 Tegenstroom en buikvliesdialyse (vwo) · 5 Warm en koud (huid, nieuw 26 okt 2026).

Begrippen: uitscheiding, ureum, ammoniak, galkleurstof, inwendig milieu, homeostase, pH, buffer, opperhuid, lederhuid, onderhuids bindweefsel, temperatuurregeling, nierfalen, hemodialyse, ultrafiltratie, afstoting; vwo: tegenstroom, peritoneale dialyse.

## Waar wat in de HTML zit (regelnummers in `3-uitscheiding-en-evenwicht.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Gaswisseling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–160 | Checkvragen (101–127), Voor de docent (128–160) |
| 161 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 162–383 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 384–954 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 955–1205 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1206–1264 | `scenes.js`: hulpstukken van deze film |
| 1265–1429 | `SCENES`: title 1266 · s01 1271 · s04 1282 · s06 1293 · s07 1306 · s08 1321 · s10 1325 · s11 1336 · s12 1346 · s13 1363 · s14 1376 · s15 1385 · s17 1389 · s18 1404 · s20 1406 · s21 1415 |
| 1430–1597 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'gal' vindt ook 'galkleurstof', en 'Kleine' in s12 vindt eerst 'kleine poriën').
- **De concentratiebalken (s13):** `concRij(ctx, x, y, naam, bloed, vloeistof, richting, kleur, …)`; richting 1 = naar de vloeistof, −1 = naar het bloed, 0 = '='.
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral dialyse (respelling `dialieze`), peritoneale, homeostase en shunt. Een blinde controle was in deze sessie niet mogelijk.
- In `scenes.js` heet de bloedkleur `BLD`, omdat `BLOED` al in `lib_voeding.js` bestaat.
- Eindreview: 15 punten, verwerkt zonder nieuwe opnames (zie `reviews/eindreview.md`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'darm', 'shunt', 'holle vezel met bloed', 'dialysevloeistof', 'buikvlies als vlies'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.


## Wijziging 19–20 okt 2026: opnieuw ingesproken na de uitspraaktest

Alinea's opnieuw opgenomen: s12, s13, s14, s17, s21. Alleen de stem-invoer van de geteste woorden is veranderd; de gesproken tekst, ondertitels en beelden zijn gelijk gebleven.

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Status |
|---|---|---|---|
| dialyse | `dialieze` | `dialyse` | goedgekeurd (uitspraaktest 19 okt 2026) |
| peritoneale | `peritonee-aale` | `peritoneale` | goedgekeurd (uitspraaktest 19 okt 2026) |
| hemodialyse, dialysevloeistof | `heemodialieze, dialiezevloeistof` | `heemodialyse, dialysevloeistof` | goedgekeurd (uitspraaktest 19 okt 2026) |

- Stem Roos (`7qdUFMklKPaaAVMsBTBt`), model eleven_v4, één generatie per alinea, op de bestaande flow; nieuwe generatie-id's in `stem/gen.json` (met `vorige_generation_id`).
- mp3 genormaliseerd zoals de andere takes (loudnorm −15 LUFS, −1,5 dBTP, mono 44,1 kHz 96 kb/s) in `audio/`.
- Woordtijden: Scribe (eleven_scribe_v1) + `bouw/align.py` op de ondertitelwoorden; `stem/woordtijden/sNN.json` en `window.FILMDATA` in de HTML zijn alleen voor deze alinea's bijgewerkt (woorden en `dur`). De film is niet opnieuw gebouwd: de speler in de HTML is ongewijzigd gebleven.
- `bron/segments.json` (`voice`) en `bouw/uitspraak_subs.json` volgen de nieuwe keuzes (oude respellings eruit, EPO → `Epo`), zodat een nieuwe build dezelfde uitspraak geeft.
- Duurverschil per alinea < 1 s; filmduur in `index.html` ongewijzigd.
- Credits: TTS 2915; Scribe meldde 0 credits.


## Gerichte ronde 26 okt 2026: nieuw hoofdstuk 3 *De huid*

Opdracht van Kamiel (B16, gericht): een hoofdstuk over de huid voor havo § 12.5 (Biologie voor jou), alleen dit hoofdstuk met de aansluiting ervoor en erna; de rest van de film blijft staan en is niet opgewaardeerd naar prompt v10 (blijft op de lijst voor een latere opwaardering of remake). Brief: `bron/BRIEF-huid.md`.

- **Plek:** na *Alles binnen grenzen* (homeostase en de pH-regelkring), vóór het nierdeel, dat nu hoofdstuk 4 heet. Aansluiting: h01 begint bij 'temperatuur' uit het lijstje van s07; h08 eindigt met 'Ureum gaat vooral via je nieren. En wat als die het niet meer doen?' en zet de nieren op dezelfde plek als s12. Vraag q02 (uitleg) en het docentdeel verwijzen nu naar hoofdstuk 4. Zonder heropname van bestaande alinea's.
- **Script:** `script_v3.md` (= v2 + hoofdstuk 3). Een hoofdstukkop met `{id:h}` krijgt eigen nummers (h01…, hq04) in `bouw/make_segments.py`, zodat s12–s22 hun nummer en audio houden.
- **Twijfelblad** (https://claude.ai/artifact/LGwY2iJsZKtjFj5KLVfqyu, db-collectie `besluit`): Noor in plaats van Sam met een kleine verschuiving van haar huidtint voor rood en bleek (goed), de nieuwe bibliotheektekening `huidBlok` (goed), de vraag over zweet (goed), vacht en rillen in h07 (Kamiel: 'mag dubbel', dus rillen blijft), plek in de film (geen reactie; voorstel aangehouden).
- **Stem:** Roos, eleven_v4, één take per alinea in flow kGlmzmyfNKdrKMpO2D4s (nodes en generatie-id's in `stem/takes.json` en `stem/gen.json`), ± 2.050 credits. mp3 genormaliseerd zoals de andere takes. Woordtijden lokaal met `bouw/silalign.py` (stiltes aan leestekens; geen credits): uploaden voor Scribe gaat niet via de proxy. Snijpunten gecontroleerd met silencedetect (h03 vóór 'Maar hoe?', h05 na 'Antwoord aa.'). Een blinde controle van de uitspraak was daardoor niet mogelijk; geen nieuwe risicowoorden (hypothalamus staat al op de lijst).
- **Beeld:** `src/scenes_huid.js` (hulpstukken + `Object.assign(SCENES, {h01…h08})`) en `src/lib_cast.js` (kopie 26 okt 2026, voor Noor van opzij). Nieuw bibliotheekobject `huidBlok` met recept bovenin `scenes_huid.js`, ook in `bibliotheek/lib_bio.js`.
- **Bronnen:** `bron/bronnen.md` (alleen hoofdstuk 3; zes zinnen vóór de opname aangepast op grond van de bronnen).
- **Inbouwen:** de site-HTML is niet opnieuw gebouwd, omdat de speler daarin latere fixes heeft die niet in `src/player.js` staan. In de HTML zijn alleen vervangen: `window.FILMDATA` (bestaande segmenten gecontroleerd gelijk), `GLOSSARY`, de checkvragen en het docentdeel (zelfde tekstvervangingen als in `film.py`), en vóór `const GLOSSARY` zijn `lib_cast.js` en `scenes_huid.js` ingevoegd. Daarna spelerfix, antwoordtekst, kortantwoord, antwoordletter (alle `--check` in orde), teller, reviewlijst, sessie_begrippen. Vragen uit gecontroleerd: hq04 valt weg, h03 knipt vóór 'Maar hoe? Wat denk je?', h05 begint bij 'Zweet koelt je af'.
- **Nieuwe regelnummers** in `3-uitscheiding-en-evenwicht.html`: sitebalk 74 · checkvragen 106 · docent 136 · FILMDATA 180 · scenes.js 1235 (SCENES 1293) · lib_cast.js 1458 · hoofdstuk De huid 2262 (`huidBlok` vanaf 2280, scènes h01–h08 vanaf 2406) · GLOSSARY 2519 · speler vanaf 2521.
- **Review:** status 'nog bekijken'.
- **Frisse beeldreview** (aparte helper, 26 okt 2026): warm en koud waren aan de huid nauwelijks te onderscheiden → vaten bij warmte veel wijder (×2,3) en de opperhuid roder, bij kou smaller en bleker; haarspiertje dikker en lichter bij kippenvel; afdruipende druppel glijdt nu over het oppervlak het beeld uit (zakte eerst door de huid); labels 'kiemlaag', 'tast' en 'bloedvaten wijder/nauwer' verplaatst. Bewust niet gedaan: 'Antwoord aa.' in de ondertitel blijft zoals in de rest van de film (huisstijl van deze film).
