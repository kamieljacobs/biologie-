# De eerste verdediging — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/afweer/1-de-eerste-verdediging.html (audio in films/afweer/1-de-eerste-verdediging/audio/) |
| Reeks / nummer | Bescherming en afweer, film 1 van 4 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blok gelabeld: s12 (dendritische cellen, antigeenpresentatie, lymfeknoop). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow pK7aJG7i94E8UIDBLy2L; nodes in `stem/takes.json`); s13 opnieuw opgenomen na de eindreview |
| Duur | spraak 5:54 (vwo) / 5:19 (havo). Speeltijd met kaarten en vragen: vwo ≈ 8 min, havo ≈ 7 min |
| Beeldstijl | Part C: Macro (tuin met Noor, zoom op de vinger), Schema (huid in doorsnede, lichaam met barrières, thermometer, koortsgrafiek met hypothalamus-thermostaat), Micro (fagocytose, vormpjes, dendritische cel en lymfeknoop, haarvat met mestcel en neutrofielen). Kleuren in `scenes.js`: ziekteverwekkers `#E07A5F`, eigen flora `#7FC48F`, witte bloedcellen `#D8DCE2`, histamine `#C9A35C`, vocht `#5BA4C9`, bloed `#B5574A` (constante `BLD`) |
| Audio-opslag | 12 losse mp3's in audio/ (s01 … s17), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (algemene helpers) |

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
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (immunoloog/huisarts), didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `a1/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-de-eerste-verdediging/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py a1 script_v2.md && (cd a1 && python3 film.py) && python3 engine/build_data.py a1 && python3 engine/build.py a1` → `a1/film/1-de-eerste-verdediging.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Noor in de tuin; zoomcirkel op de vinger: splinter eruit, de volgende dag rood en dik; vraag q02 |
| Titel | Micro | Fagocyt met schijnvoetjes en bacteriën |
| H1 Muren en grachten (s04–s07) | B · Schema | Huid in doorsnede (hoornlaag schilfert af, H⁺ op de huid); lichaam met slijm en trilharen, lysozym, maag met zoutzuur, eigen (groene) bacteriën; vraag q06; antibiotica: flora verdwijnt, schadelijke bacteriën vermeerderen, schimmels |
| H2 Alles opeten (s08–s12) | B + D · Micro | Splinter door de huid; macrofaag met schijnvoetjes, blaasje en lysosomen; vraag q10; jouw cel met jouw vormpjes tegenover bacteriën met gedeelde vormpjes. Vwo s12: dendritische cel met antigenen reist naar een lymfeknoop met T-helpercellen |
| H3 Rood, warm, dik (s13) | D · Micro | Haarvat dat wijder en lekker wordt; mestcel met histamine; vocht; neutrofielen kruipen het weefsel in; pus; rode bloedcellen blijven in het vat |
| H4 De thermostaat omhoog (s14–s16) | D · Schema | Thermometer; vraag q15; grafiek instelling en lichaamstemperatuur; hypothalamus als thermostaatwijzer |
| Recap (s17) | Macro | Noor in de tuin met de antwoordketen |
| Eindkaart (s18) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom wordt de plek rood, warm en dik? | a je lichaam doet het zelf: vaatjes worden wijder en lekken vocht (onthulling in s13 en recap) |
| q06 | basis | Waarom krijgen sommige mensen diarree na een antibioticakuur? | b ook de nuttige darmbacteriën gaan dood |
| q10 | basis | Kan een fagocyt een nieuwe bacterie meteen opeten? | b ja, hij herkent kenmerken die veel bacteriën hebben |
| q15 | basis | Waardoor krijg je koorts? | b je hersenen zetten je thermostaat hoger |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/bee") staat wél in de audio van s07, s11, s13 en s16.

Checkvragen (statisch in de pagina): 1 Barrières en flora · 2 Een ontstoken knie (tabel) · 3 Koorts (tabel) · 4 Dendritische cellen (experiment, vwo).

Begrippen: ziekteverwekker, barrière, lysozym, bacterieflora, fagocyt, fagocytose, aspecifieke afweer, ontstekingsreactie, histamine, pus, koorts; vwo: antigeenpresentatie.

## Waar wat in de HTML zit (regelnummers in `1-de-eerste-verdediging.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Afweer" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–149 | Checkvragen (100–117), Voor de docent (118–149) |
| 150 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 151–372 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 373–943 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 944–1194 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1195–1231 | `scenes.js`: hulpstukken van deze film |
| 1232–1339 | `SCENES`: title 1233 · s01 1236 · s04 1250 · s05 1263 · s07 1266 · s08 1271 · s09 1282 · s11 1283 · s12 1291 · s13 1301 · s14 1316 · s16 1318 · s17 1331 |
| 1340–1507 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'Witte' vindt later ook 'eiwitten').
- **Figuren:** `bacterie(ctx, x, y, schaal, hoek, alpha, kapot, kleur)`, `fagocyt(ctx, x, y, r, t, {arm, tx, ty, kern: 'rond'|'lobben'})`, `mestcel`, `haarvat(ctx, x0, x1, y, wijdte, t, {lek})`, `huidDoorsnede`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral faagosiet, histaminuh, liezoziem en "een en veertig". Een blinde controle was in deze sessie niet mogelijk.
- In `scenes.js` heet de bloedkleur `BLD`, omdat `BLOED` al in `lib_voeding.js` bestaat.
- Eindreview: 15 punten, verwerkt met één nieuwe opname (s13) (zie `reviews/eindreview.md`).
