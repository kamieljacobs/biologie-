# Stamcellen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/stamcellen.html (audio in films/cellen/stamcellen/audio/) |
| Reeks / nummer | Cellen, losse film (Kamiel 14 okt 2026: "ik wil algemene celdifferentiatie en stamcellen als losse video", met een emergente eigenschap). Sluit aan op Van molecuul tot biosfeer (differentiatie kort) en Celdeling (mitose) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s09 (promotor, transcriptiefactoren, RNA-polymerase, methylering, histonen: epigenetica) en s20 (toti-, pluri-, multi-, unipotent; Yamanaka, iPS-cel, Gurdon). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.1 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; eindreview verwerkt; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow CiG3slI2g101iKV2bsAG "Stamcellen — voice-over"; nodes in `stem/takes.json`) |
| Duur | spraak 8:04 (vwo) / 6:17 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9 min, havo ≈ 7,5 min |
| Beeldstijl | Part C: Macro (knie met schaafwond die geneest, hart met litteken), Micro (bevruchte eicel die deelt; zenuwcel, spiercel, alvleeskliercel, huidcel met dezelfde chromosomen en genen als lampjes; rode bloedcel zonder kern; opperhuid met kiemlaag waarin stamcellen delen en cellen omhoog schuiven, verhoornen en afschilferen; beenmerg; darmvlok; blastocyst met binnenste celmassa; kweekschaal; hartspiercellen die los en samen kloppen), Schema (vwo: DNA met promotor, transcriptiefactoren, RNA-polymerase, methylgroepen, histonen; leukemie, infuus, donor- en patiëntcel met herkenningseiwitten, patiënt met donor-DNA in het bloed; ethiek; potentie-ladder; Yamanaka-panel). Kleuren in `scenes.js`: `SPIER`, `ZENUW`, `HUIDC`, `STAM`, `ALV`, `ROOD`, `WIT`, `HOORN`, `LEUK` |
| Audio-opslag | 17 losse mp3's in audio/ (s01 … s21), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en `lib_hormonen.js` (`person`, `circ`) en `lib_voeding.js` (`darmvlok`); helpers `tag`, `regel`, `kruis`, `vink` uit Van molecuul tot biosfeer; alle figuren nieuw getekend |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks), **`uitspraak_film.json`** (alleen deze film: emergente, iPS-cel, ivf, Gurdon) en `wachtlijst.md` |
| `reviews/` | Expert (cel- en ontwikkelingsbiologie), curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` (alles verwerkt zonder nieuwe opname) |

**Werkmap opzetten:** maak `d1/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `uitspraak_film.json` (uit `bouw/`), `words/` (= `stem/woordtijden/`) en `film/stamcellen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py d1 script_v2.md && (cd d1 && python3 film.py) && python3 engine/build_data.py d1 && python3 engine/build.py d1` → `d1/film/stamcellen.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | D · Macro | Schaafwond op de knie die geneest; hart met een infarct dat een litteken wordt; vraag q02 (antwoord in s11 en de recap) |
| Titel | Micro | Stamcel met pijlen naar zenuwcel, spiercel, huidcel, rode bloedcel en alvleeskliercel |
| H1 Zelfde DNA, andere cel (s04–s09) | D · Micro | Bevruchte eicel deelt (mitose); ± 30 biljoen cellen, > 200 soorten; vier celsoorten met dezelfde chromosomen; rode bloedcel zonder kern; genen als lampjes, insuline-gen aan in de alvleeskliercel en uit in de huidcel; differentiatie; vraag q07; antwoord b; zenuwcel deelt niet, hartspiercel bijna niet. Vwo s09: promotor, transcriptiefactoren, RNA-polymerase (gen aan) tegenover methylgroepen en histonen (gen uit); markeringen blijven na de deling (epigenetica) |
| H2 Cellen die nog kunnen kiezen (s10–s13) | D · Micro | Opperhuid met kiemlaag: stamcel deelt, één blijft stamcel, de andere schuift omhoog, verhoornt en schilfert af; ± 4 weken; antwoord a (geen hartstamcellen gevonden, ± 1 % per jaar); bevruchte eicel: groot en deelt; beenmerg (± 2 miljoen rode bloedcellen per seconde), darmvlok (3–5 dagen); volwassen stamcel = eigen weefsel; blastocyst met binnenste celmassa, kweek: embryonale stamcellen |
| H3 Stamcellen als medicijn (s14–s20) | I · Schema | Leukemie in het beenmerg, chemo; infuus met donorstamcellen; donor moet passen (herkenningseiwitten), anders afstoting; bloed met donor-DNA en bloedgroep; vraag q16, antwoord c; huidcel teruggezet tot geïnduceerde stamcel → hartspiercellen; hartspiercellen in een schaal: los in eigen tempo, samen in één ritme (weefsel, emergente eigenschap); ethiek: restembryo's van ivf, geen afstoting, tumorrisico. Vwo s20: potentie-ladder, Yamanaka (2006 muis, 2007 mens), iPS-cel, Nobelprijs 2012 met Gurdon |
| Recap (s21) | Schema | Knie en hart; vier celsoorten met dezelfde chromosomen en andere genen aan; kiemlaag tegenover hart zonder stamcellen; antwoord a |
| Eindkaart (s22) | Schema | Vier kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom herstelt je huid wel, en je hartspier bijna niet? | a in je huid zitten cellen die zich blijven delen, in je hartspier niet (onthulling in s11 en s21) |
| q07 | basis | Zenuwcel en spiercel van jou: wat is het verschil in hun DNA? | b geen verschil: alleen andere genen staan aan (afleider c: 'in de spiercel zijn de genen die hij niet nodig heeft eruit geknipt') |
| q16 | basis | Kun je met bloedstamcellen ook een beschadigd hart herstellen? | c nee: ze kunnen alleen de celsoorten van het bloed maken |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat wél in de audio van s08, s11, s17 en s21.

Checkvragen (statisch in de pagina): 1 Zelfde genen, ander werk (genexpressie in vier celtypen, kiemlaag, schaafwond tegenover brandwond) · 2 Bloed van haar broer (beenmergtransplantatie: bloedgroep, DNA-profielen, eicellen) · 3 Terug naar het begin (Yamanaka-factoren, methylering van de Oct4-promotor, potentie; vwo).

Begrippen: differentiatie, gedifferentieerde cel, stamcel, kiemlaag, volwassen stamcel, embryonale stamcel, stamceltransplantatie, afstoting, geïnduceerde stamcel (iPS-cel), weefsel, emergente eigenschap, transcriptiefactor (vwo), epigenetica (vwo), toti-/pluri-/multi-/unipotent (vwo).

## Waar wat in de HTML zit (regelnummers in `stamcellen.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Cellen" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–168 | Checkvragen (100–133), Voor de docent (134–168) |
| 169 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 170–391 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 392–962 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 963–1213 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1214–1271 | `scenes.js`: hulpstukken van deze film |
| 1272–1424 | `SCENES`: title 1273 · s01 1276 · s04 1283 · s05 1294 · s06 1302 · s08 1306 · s09 1315 · s10 1331 · s11 1339 · s12 1348 · s13 1357 · s14 1364 · s15 1377 · s17 1379 · s18 1389 · s19 1397 · s20 1405 · s21 1417 |
| 1425–1592 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'stamcel' vindt ook 'Bloedstamcellen' en 'spiercel' ook 'hartspiercel'). Controleer met `cuecheck.py`/`cuewhere.py` uit de werkmap.
- **Figuren:** `opperhuid(ctx, x, y, w, h, t, {a, beweeg, schilfer})` (kiemlaag met stamcellen, cellen schuiven omhoog en schilferen af), `stamcel`, `lampjes(ctx, x, y, aan[], kleur, a, hl)` (genen aan/uit), `chromRij`, `hart(ctx, x, y, s, a, t, dood, litteken)`, `knie`, `bot` (beenmerg, met `inhoud`-callback), `blastocyst`, `schaal`, `infuus`, `dnaStreng`, `tf`, `histon`, `methyl`, `spiercel`, `zenuwcel`, `huidcel`, `alvcel`, `rodeBC`, `witteBC`, `plaatje`, `leukcel`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md` en de wachtlijst (o.a. Yamanaka, Geurdun, totipotent, ie-pee-es-cel, ee-mer-gente). Een blinde luistercontrole was in deze sessie niet mogelijk.
- Embryowet: de film zegt alleen dat onderzoekers restembryo's van ivf gebruiken en dat de regels streng zijn. Een wetsvoorstel om embryo's speciaal voor onderzoek te mogen kweken is in behandeling geweest; controleer de stand bij elke herziening.
- Klinische proeven met iPS-cellen ontwikkelen zich snel ("nog maar in een paar proeven bij patiënten"); controleer bij elke herziening.
- Eindreview (`reviews/eind.md`): alle punten in beeld, vragen en begrippen verwerkt. Optionele tekstwijzigingen met nieuwe opname staan op de wachtlijst: s09 "levercel" i.p.v. "huidcel" (vwo), s14 "de bloedgroep van de donor", s19 "in principe niet afgestoten" en het tumorrisico ook bij embryonale stamcellen.
- Chromosomen staan als enkele chromatiden in beeld (cellen die niet delen); de rode bloedcel heeft geen kern.

## Wachtlijst opnieuw inspreken

Aanvulling na vergelijking met Gewoon Uitgelegd (15-10-2026). Tekst staat als `[nieuw]` in `script.md`; zet hem ook in `script_v2.md` en volg "Tekst van een alinea" (make_segments.py met `uitspraak_film.json`, alleen s19 opnieuw, Scribe + `align.py`, normaliseren, bouwen).

- **H3, s19** — onderscheid biologisch argument (feiten: embryonale stamcellen kunnen elke celsoort worden, volwassen niet) en ethisch argument (normen en waarden: een embryo is het begin van een mens), aan het eind van de ethiekalinea. Opnieuw: `audio/s19.mp3` + `stem/woordtijden/s19.json`; ± 15 s langer, s20 en verder schuiven op. Cues ('verloren', 'ivf', 'streng', 'Geïnduceerde', 'afgestoten', 'tumoren', 'proeven') vallen allemaal vóór de nieuwe tekst. Neem meteen de open punten uit de eindreview mee ("in principe niet afgestoten", tumorrisico ook bij embryonale stamcellen).
- **Beeld nodig**: twee kaartjes naast elkaar: "biologisch argument — feiten" (embryonale stamcel → elke celsoort, volwassen stamcel → eigen weefsel) en "ethisch argument — normen en waarden" (embryo = begin van een mens); eventueel `tag`/`regel` uit de bestaande helpers.
- **Risicowoorden (uitspraaktest)**:
  - ethisch — /ˈeː.tis/ (Wiktionary via kaikki.org): lange ee, "th" als t. Als geschreven; alternatief `eetisch` als de TTS "et-hisch" zegt.
  - biologisch, argument, normen en waarden — gewone woorden; als geschreven.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'klompje cellen binnenin'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.

Wijziging 15 okt 2026 (2): speler: bij Vragen uit vallen nu ook losse antwoordzinnen weg die niet direct na een vraag komen ("Terug naar de knie en het hart. Antwoord aa." in s11, "Het antwoord was dus aa." in de recap), via `losAntwCuts()` (in alle films van de hoofdengine).
