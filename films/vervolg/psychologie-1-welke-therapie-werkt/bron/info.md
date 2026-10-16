# Welke therapie werkt? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/vervolg/psychologie-1-welke-therapie-werkt.html (audio in films/vervolg/psychologie-1-welke-therapie-werkt/audio/) |
| Plek op de site | Wat word jij? (`vervolg.html`) → Psychologie → theoretische basis, onderwerp 6 "Therapievormen en wat werkt"; terugknop naar `vervolg.html#psychologie` |
| Niveau | één niveau: vwo (oriëntatie op de wo-studie psychologie); `alleen: "vwo"` verbergt de havo/vwo-schakelaar |
| Versie / datum | 2.0 · 16 oktober 2026 (verdiept; 1.0 dezelfde dag; 16 okt: s04 en s17 opnieuw ingesproken voor ACT) |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow rMBhkqo4RzKdUANupuEg; respellings in `uitspraak.md` en `uitspraak_film.json` |
| Duur | spraak 13:54; speeltijd met kaarten en vragen ± 17 min (`duur: 17` in `films/vervolg/films.json`) |
| Beeldstijl | Part C: Schema; ik-perspectief in de spreekkamer (bureau + notitieboek 'jij · psycholoog') |
| Personages | Opa Henk (cliënt, somber), Lotte (bang voor spinnen), Sam (nare herinneringen na fietsongeluk) uit het castboek |
| Audio-opslag | 14 losse mp3's in audio/ (s01, s04, s05, s07, s08, s10, s11, s13, s14, s16, s17, s19, s20, s21) |
| Woordtijden | lokaal met `bouw/silalign.py` (stiltes + leestekens); steekproef s01 tegen Scribe: afwijking ≤ 0,2 s; s04 en s17 (16 okt) uit Scribe (`method: scribe`) |
| Herkomst | Bouwstraat van Gedrag 12 (engine `src/` + `bouw/`), werkmap `hw/th1`; gemaakt met Claude op verzoek van Kamiel, 16 okt 2026 |

## Opbouw (v2.0)
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Spreekkamer, jij als psycholoog, Henk vraagt welke therapie het best werkt; grafiekje 'veel beter na drie maanden' → vraag 1 |
| H1 Tien manieren om te helpen | s04 | Antwoord b; elf therapiekaarten |
| H2 Werkt het? | s05, q06, s07, s08, q09, s10 | Vanzelf beter, placebo-effect, loting, effectgrootte, meta-analyse, wachtlijst vs gewone zorg (vraag 2); valkuilen: dubbelblind (pil vs nep-pil vs therapie), uitval (intention-to-treat), selectieve publicatie antidepressiva (vraag 3: 51% vs 94%), publicatiebias therapie (55 onderzoeken, kwart weg, 0,52 → 0,39), voorkeur van de onderzoeker (Dr. Kim + ACT-kaart) |
| H3 Een cirkel doorbreken | s11, q12, s13 | Henk: cirkel gedachte–gedrag–gevoel; CGT doorbreekt op twee plekken; agenda (gedragsactivatie); COBRA; Lotte: angstcurve bij wegrennen (vraag 4); vermijdingspieken; angstladder; verwachting vs uitkomst; oude en nieuwe herinnering, terugkeer |
| H4 Wat verandert er in je brein? | s14, q15, s16 | Hersenen zijaanzicht (amygdala, prefrontale schors, remmen); scans voor/na; synaps met serotonine en SSRI (vraag 5: uren vs weken); 'serotoninetekort' doorgestreept (Moncrieff 2022); werken vs hoe werken; nieuwe verbindingen (hypothese); therapie en medicatie langs andere weg |
| H5 Wat werkt waarvoor? | s17, q18, s19, s20 | Lotte (ladder), Sam (EMDR ≈ CGT), Henk (depressie-vormen, medicatie); vraag 6; gemeenschappelijke factoren; band–resultaat; bewijsbord per klacht; meten; 41 vs 17 van de 100; terugval; zorgtrap NL; therapeuteffecten 5% |
| Recap | s21 | Henk + vier vinkjes; route naar GZ-psycholoog; psychiater; hulpkaart |
| Eindkaart | s22 | vier regels |

## Vragen
- q02: heeft de therapie gewerkt? **b dat weet je pas als je vergelijkt**
- q06: tegen welke groep lijkt een therapie het sterkst? **a wachtlijst**
- q09: welk deel van de gepubliceerde artikelen over antidepressiva was positief? **b bijna allemaal** (a 'ook de helft' = misconceptie)
- q12: Lotte rent weg; wat gebeurt er op lange termijn met haar angst? **a blijft of wordt groter** (c 'kleiner, want wegrennen werkt' = misconceptie)
- q15: SSRI werkt in uren op serotonine; wanneer verbetert de stemming? **b na een paar weken** (a 'binnen uren' = misconceptie)
- q18: mogelijke verklaring voor 'even goed'? **a iets wat ze gemeen hebben** (b 'dus werkt alles voor alles' = misconceptie, weerlegd in s19)

## Begrippen
CGT, exposure, EMDR, ACT, interpersoonlijke therapie, psychodynamische therapie, schematherapie, systeemtherapie, placebo-effect, gerandomiseerd onderzoek (RCT), wachtlijstgroep, effectgrootte, meta-analyse, dubbelblind, publicatiebias, gedragsactivatie, vermijding, uitdoving, amygdala, prefrontale schors, SSRI, stapsgewijze zorg, therapeutische relatie, GZ-psycholoog — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 8 checkvragen (v2.0: + dubbelblind/intention-to-treat, publicatiebias, vermijding en uitdoving, serotonine) (controlegroep, wachtlijst vs gewone zorg, gemeenschappelijke factoren + samenhang/oorzaak, exposure), hoe de film het uitlegt, bewijstabel met bronnen en bewijsniveau, vereenvoudigingen, lessuggesties.

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
- Turner e.a. 2008 (NEJM): ±51% van de bij de FDA ingediende antidepressiva-onderzoeken positief, ±94% in de literatuur.
- Driessen e.a. 2015 (PLoS One): 55 NIH-onderzoeken, bijna een kwart ongepubliceerd, effect ±25% lager.
- Munder e.a. 2013: allegiance r ≈ 0,26 (30 meta-analyses).
- Richards e.a. 2016 (COBRA): gedragsactivatie door beginnende hulpverleners niet slechter dan CGT (440 volwassenen, 12 mnd).
- Craske e.a. 2014 (inhibitory learning); Milad & Quirk (vmPFC remt amygdala); Straube e.a. 2006 (minder activatie na CGT bij spinnenfobie).
- Moncrieff e.a. 2022: geen consistent bewijs voor serotoninetekort als oorzaak; PET-studie Knudsen-groep: synapsdichtheid stijgt over weken (hypothese).
- Cuijpers e.a. 2021: respons 41% vs 17% (gewone zorg).
- Richtlijn depressie 2024: stepped/matched care, 50–80% terugval binnen 5–10 jaar.
- Johns e.a. 2019: therapeuteffecten ±5%.
- Beroepsroute: master psychologie → GZ-opleiding (2 jaar) → GZ-psycholoog (BIG); psychiater = arts.

## Waar wat in de HTML zit (films/vervolg/psychologie-1-welke-therapie-werkt.html, v2.0)
- regel 70: sitebalk (← Terug naar Wat word jij? → `../../vervolg.html#psychologie`)
- regel 101: checkvragen en docentdeel (uit `sections.html`)
- regel 167: `window.FILMDATA`
- regel 1570: `const SCENES` (title, s01, s04, s05, s07, s17, s19, s21 uit `src/scenes_own.js`)
- regel 1709: `angstLadder()`; 1719 `brein()`; 1729 `synaps()`
- regel 1743: `Object.assign(SCENES, {…})` met de v2.0-scènes s08, s10, s11, s13, s14, s16, s20 (uit `src/scenes_v3.js`)
- regel 1866 e.v.: speler

## Hoe je de film aanpast
Werkmap: kopieer `bron/` naar een werkmap `hw/th1` met `src/*` + `bouw/*` als engine (`hw/engine/`), `stem/woordtijden/` → `th1/words/`, `../audio/` → `th1/audio/` én `th1/raw/` (silalign leest `raw/`). Dan:
- tekst: `script_v3.md` aanpassen → `python3 engine/make_segments.py th1 script_v3.md` (let op: make_segments nummert opnieuw; voeg je een alinea in, hernoem dan audio en woordtijden zoals in v2.0 met `v3map`) → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take, stem-invoer uit `segments.json` → `voice`) → mp3 in `raw/` en `audio/` → `python3 engine/silalign.py th1 <sid>` → `python3 film.py` → `python3 engine/build_data.py th1` → `python3 engine/build.py th1` → kopieer `th1/film/psychologie-1-welke-therapie-werkt.html` naar `films/vervolg/` en vervang de terugknop `../../index.html#vervolg` door `../../vervolg.html#psychologie`.
- beeld: `src/scenes_own.js` of `src/scenes_v3.js` aanpassen → `cat helpers_gd12.js scenes_own.js scenes_v3.js > scenes.js` → `build.py` → kopiëren als hierboven.
- Cue-woorden: `q.on(woord, n)` telt het n-de woord dat het woord bevat (deelwoord!). Let op: 'zulke' staat in s17 twee keer (n = 2), 'helpt' in s19 twee keer, 'groot' in s05 vier keer, 'valkuil' in s08 twee keer, 'remt' en 'uitdoving' in s14 twee keer, 'idee' en 'overzicht' in s16 twee keer, 'tien' in s20 drie keer.
- Na het kopiëren: `python3 scripts/teller.py` en `python3 scripts/licentie_noot.py`.

## Aandachtspunten
- Uitspraakwachtlijst: zie `uitspraak.md` (CGT, EMDR, exposure, GZ-psycholoog, getallen met komma). Blinde transcriptie kon niet (upload geblokkeerd); Kamiel luistert in de batchronde.
- Ondertitels tonen 'Antwoord aa.' / 'Antwoord bee.' zoals in de andere films van deze straat (de speler herkent die zinnen om antwoorden over te slaan als vragen uit staan).
- Gevoelig onderwerp: personages neutraal, hulpkaart aan het eind (mentor, huisarts).
- De film staat niet in `HOOFDSTUKKEN` van `index.html` (geen hoofdstuk); de duur voor de teller staat in `films/vervolg/films.json`, dat `scripts/sitedata.py` meeleest.
- Geen loudness-normalisatie gedaan; de zeven takes komen uit één stem en model.

## Wijzigingen
- 16 okt 2026: ACT → 'Act' (Kamiel: moet klinken als het Engelse woord 'act'; in zijn test klonk stem-invoer "Act" goed, niet 'ekt'). Regel in `uitspraak_film.json` aangepast; alleen s04 en s17 opnieuw ingesproken (Roos, eleven_v4, één take, nodes 5IdJYoGU0lNHtNWCPDO2 en fPzK1rVzkIRzj5Zq4kQP), Scribe-controle hoort 'Act'; woordtijden uit Scribe; geen normalisatie (zoals de andere fragmenten, ±-30 LUFS). Speler ongewijzigd (alleen FILMDATA verschilt).
- 2.0 (16 okt 2026): verdiept op verzoek van Kamiel ('écht diepgaand', ± 15 min mag): valkuilen in onderzoek (H2), nieuw H3 Een cirkel doorbreken, nieuw H4 Wat verandert er in je brein?, in H5 'niet iedereen knapt op', zorg in stappen en therapeuteffecten; vier extra vragen; acht nieuwe takes (s08 v1.0 opnieuw als s17 met korter Lotte-stuk); script na review door een aparte agent (`reviews/review_v3.md`).
- 1.0 (16 okt 2026): eerste versie. Script na review door een aparte agent (klinisch psycholoog + methodoloog, pedagogie, taal; `reviews/review_v1.md`), beeld na een frisse-ogen-controle van de contactbladen (overlap opening, overgang s07, kaarten 'bij depressie' zonder EMDR, rij systeemtherapie, 'sterk onderbouwd').
