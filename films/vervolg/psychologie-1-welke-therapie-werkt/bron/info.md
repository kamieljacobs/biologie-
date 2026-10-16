# Welke therapie werkt? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/vervolg/psychologie-1-welke-therapie-werkt.html (audio in films/vervolg/psychologie-1-welke-therapie-werkt/audio/) |
| Plek op de site | Wat word jij? (`vervolg.html`) → Psychologie → theoretische basis, onderwerp 6 "Therapievormen en wat werkt"; terugknop naar `vervolg.html#psychologie` |
| Niveau | één niveau: vwo (oriëntatie op de wo-studie psychologie); `alleen: "vwo"` verbergt de havo/vwo-schakelaar |
| Versie / datum | 1.0 · 16 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow rMBhkqo4RzKdUANupuEg; respellings in `uitspraak.md` en `uitspraak_film.json` |
| Duur | spraak 7:06; speeltijd met kaarten en vragen ± 9 min (`duur: 9` in `films/vervolg/films.json`) |
| Beeldstijl | Part C: Schema; ik-perspectief in de spreekkamer (bureau + notitieboek 'jij · psycholoog') |
| Personages | Opa Henk (cliënt, somber), Lotte (bang voor spinnen), Sam (nare herinneringen na fietsongeluk) uit het castboek |
| Audio-opslag | 7 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11) |
| Woordtijden | lokaal met `bouw/silalign.py` (stiltes + leestekens); steekproef s01 tegen Scribe: afwijking ≤ 0,2 s |
| Herkomst | Bouwstraat van Gedrag 12 (engine `src/` + `bouw/`), werkmap `hw/th1`; gemaakt met Claude op verzoek van Kamiel, 16 okt 2026 |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Spreekkamer, jij als psycholoog, Henk vraagt welke therapie het best werkt; grafiekje 'veel beter na drie maanden therapie' → vraag 1 |
| H1 Tien manieren om te helpen | s04 | Antwoord b + verwijzing naar H2; elf kaarten (CGT, exposure, EMDR, medicatie, ACT, interpersoonlijk, psychodynamisch, schematherapie, systeemtherapie, online zelfhulp, vaktherapie), elk met 'richt zich op' |
| H2 Werkt het? | s05, q06, s07 | Vanzelf beter + placebo-effect; loting (RCT); twee verdelingen → effectgrootte = verschil ÷ spreiding; meter 0,2/0,5/0,8; forest plot → meta-analyse; wachtlijst vs gewone zorg → vraag 2; balken 0,95 vs 0,6 |
| H3 Wat werkt waarvoor? | s08, q09, s10 | Lotte: exposure-trapje (foto, pot, hand); Sam: EMDR ≈ traumagerichte CGT; Henk: depressie-vormen onderling gelijk, ACT minder onderzocht, medicatie; vraag 3; gemeenschappelijke factoren; spreidingsdiagram band–resultaat (r ≈ 0,28, matig, 'of andersom?'); bewijsbord per klacht; meten tijdens de behandeling |
| Recap | s11 | Henk + vier vinkjes; route master → psycholoog → werkervaring → GZ-opleiding → GZ-psycholoog; psychiater = arts; hulpkaart (mentor, huisarts) |
| Eindkaart | s12 | drie regels |

## Vragen
- q02: heeft de therapie gewerkt? a ja · **b dat weet je pas als je vergelijkt** · c nee
- q06: tegen welke groep lijkt een therapie het sterkst? **a wachtlijst** · b gewone zorg · c maakt niet uit
- q09: mogelijke verklaring voor 'even goed'? **a iets wat ze gemeen hebben** · b dan werkt elke therapie voor elke klacht (misconceptie, weerlegd in s10) · c de duur

## Begrippen
CGT, exposure, EMDR, ACT, interpersoonlijke therapie, psychodynamische therapie, schematherapie, systeemtherapie, placebo-effect, gerandomiseerd onderzoek (RCT), wachtlijstgroep, effectgrootte, meta-analyse, therapeutische relatie, GZ-psycholoog — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 4 checkvragen (controlegroep, wachtlijst vs gewone zorg, gemeenschappelijke factoren + samenhang/oorzaak, exposure), hoe de film het uitlegt, bewijstabel met bronnen en bewijsniveau, vereenvoudigingen, lessuggesties.

## Bronnen achter de cijfers
- Cuijpers e.a. 2024 (Epidemiology and Psychiatric Sciences): g 0,95 vs wachtlijst (141 studies), 0,63 vs gewone zorg (195 studies).
- Flückiger e.a. 2018: alliantie–uitkomst r = 0,278, 295 studies, > 30.000 cliënten.
- Cipriani e.a. 2018: 21 antidepressiva, 522 studies, 116.477 deelnemers, OR respons 1,37–2,13.
- Cuijpers e.a. 2021 (Annals of Family Medicine): therapie ≈ medicatie (RR 1,03); combinatie vs alleen therapie RR 1,35.
- Wolitzky-Taylor e.a. 2008: exposure bij specifieke fobie, 33 studies.
- Recente systematische review EMDR vs traumagerichte CGT: geen duidelijk verschil (White Rose eprint 228882).
- Cuijpers e.a. 2011 (Am J Psychiatry): interpersoonlijke therapie d = 0,63 vs controle.
- Leichsenring e.a. 2023 (World Psychiatry): psychodynamische therapie.
- Gloster e.a. 2020: ACT (20 meta-analyses).
- Carlbring e.a. 2018: begeleide online CGT ≈ face-to-face (g = 0,05).
- Giesen-Bloo e.a. 2006: schematherapie bij borderline, 88 patiënten, herstel RR 2,18.
- Von Sydow e.a. 2013, Retzlaff e.a. 2013: systeemtherapie bij kinderen en jongeren.
- Beroepsroute: master psychologie → GZ-opleiding (2 jaar) → GZ-psycholoog (BIG); psychiater = arts.

## Waar wat in de HTML zit (films/vervolg/psychologie-1-welke-therapie-werkt.html)
- regel 69: sitebalk (← Terug naar Wat word jij? → `../../vervolg.html#psychologie`; door build.py gezet op `index.html#vervolg` en daarna vervangen bij het inpakken)
- regel 100: checkvragen en docentdeel (uit `sections.html`)
- regel 141: `window.FILMDATA`
- regel 1254: `persoon()` uit lib_cast.js
- regel 1512: `KAARTEN` (de elf therapiekaarten) en `kaartIcoon()`; regel 1538 `kaart()`
- regel 1544: `const SCENES` (title, s01 … s11)
- regel 1684 e.v.: speler

## Hoe je de film aanpast
Werkmap: kopieer `bron/` naar een werkmap `hw/th1` met `src/*` + `bouw/*` als engine (`hw/engine/`), `stem/woordtijden/` → `th1/words/`, `../audio/` → `th1/audio/` én `th1/raw/` (silalign leest `raw/`). Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py th1 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take, stem-invoer uit `segments.json` → `voice`) → mp3 in `raw/` en `audio/` → `python3 engine/silalign.py th1 <sid>` → `python3 film.py` → `python3 engine/build_data.py th1` → `python3 engine/build.py th1` → kopieer `th1/film/psychologie-1-welke-therapie-werkt.html` naar `films/vervolg/` en vervang de terugknop `../../index.html#vervolg` door `../../vervolg.html#psychologie`.
- beeld: alleen `src/scenes_own.js` aanpassen → `cat helpers_gd12.js scenes_own.js > scenes.js` → `build.py` → kopiëren als hierboven.
- Cue-woorden: `q.on(woord, n)` telt het n-de woord dat het woord bevat (deelwoord!). Let op: 'zulke' staat in s08 twee keer (daarom n = 2), 'helpt' in s10 twee keer, 'groot' in s05 vier keer.
- Na het kopiëren: `python3 scripts/teller.py` en `python3 scripts/licentie_noot.py`.

## Aandachtspunten
- Uitspraakwachtlijst: zie `uitspraak.md` (CGT, EMDR, ACT als 'ekt', exposure, GZ-psycholoog, getallen met komma). Blinde transcriptie kon niet (upload geblokkeerd); Kamiel luistert in de batchronde.
- Ondertitels tonen 'Antwoord aa.' / 'Antwoord bee.' zoals in de andere films van deze straat (de speler herkent die zinnen om antwoorden over te slaan als vragen uit staan).
- Gevoelig onderwerp: personages neutraal, hulpkaart aan het eind (mentor, huisarts).
- De film staat niet in `HOOFDSTUKKEN` van `index.html` (geen hoofdstuk); de duur voor de teller staat in `films/vervolg/films.json`, dat `scripts/sitedata.py` meeleest.
- Geen loudness-normalisatie gedaan; de zeven takes komen uit één stem en model.

## Wijzigingen
- 1.0 (16 okt 2026): eerste versie. Script na review door een aparte agent (klinisch psycholoog + methodoloog, pedagogie, taal; `reviews/review_v1.md`), beeld na een frisse-ogen-controle van de contactbladen (overlap opening, overgang s07, kaarten 'bij depressie' zonder EMDR, rij systeemtherapie, 'sterk onderbouwd').
