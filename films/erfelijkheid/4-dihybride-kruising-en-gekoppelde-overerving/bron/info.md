# Dihybride kruising en gekoppelde overerving — bronmap

Versie 2.0 is een lichte remake in de FILMDATA-straat (28 okt 2026), na Kamiels review van de oude film (`../../../verbeterbladen/erfelijkheid-2026-10/opmerkingen.json`, sleutel erf4) en zijn keuring van script en twijfelscènes in fase 1 (`remake-2026-10/`). De oude versie (één doorlopende take, eigen engine, 12 okt 2026) staat in `oud/` (`4-dihybride-kruising-en-gekoppelde-overerving-v1.html`, `script-v1.md`, `info-v1.md`, `oefenen-v1.json`).

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html (audio in `4-dihybride-kruising-en-gekoppelde-overerving/audio/`) |
| Reeks / nummer | Erfelijkheid · film 4 van 6 |
| Doelgroep / niveau | havo en vwo bovenbouw; vwo-blokken: hoofdstuk 2, 4, 5 en de recapzin s36 |
| Versie / datum | 2.0 · 28 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (32 takes, geen herkansingen); flow `BoM0xdy9b0irXSLoumNl`, 6886 credits |
| Duur | havo ± 4:55 (293 s; 257 s met Vragen uit), vwo ± 9:25 (563 s; 491 s met Vragen uit); 485 s spraak, waarvan 247 s basis. `duur: 9` in HOOFDSTUKKEN (havo 5) |
| Beeldstijl | Part C: Macro (moestuin, decor hergebruikt uit Landbouw 2, Opa Henk zonder naam), Micro (celkern, meiose, chromatiden), Schema (allelchips, chromosoomparen, kruisingsschema's, simulatie) |
| Audio-opslag | 32 losse mp3's (`../audio/sNN.mp3`, loudnorm −16 LUFS / −1 dBTP), woordtijden `stem/woordtijden/` (silalign, lokaal), generation-id's en credits in `stem/gen.json` en `stem/sessions.json` |
| Herkomst | opmerkingen Kamiel (erf4), fase 1 (`remake-2026-10/`: script_v2, storyboard, keyframes, twijfelscènes T1–T4, bronnen, uitspraak); Kamiel keurde script en T2–T4 goed, bij T1 (havo/vwo-verdeling) is het voorstel uitgevoerd: verdeling volgens de syllabi 2026 |

## Opbouw
| Hoofdstuk | Segmenten | Niveau · look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s02 | basis · Macro | Opa Henk opent erwtenpeulen in de moestuin; zoomcirkel met geel-rond, groen-gerimpeld en de nieuwe combinaties (puzzel) |
| Titel | s03 | — | erwtjes met gameetletters |
| 1. Twee genen, twee chromosoomparen | s04–s11 (vraag q08) | basis · Schema/Micro | letters G/g, R/r; P GGRR × ggrr → F1 GgRr; twee paren in de kern (teal = van de ene ouder, oker = van de andere); meiose I met twee liggingen; simulatie van 400 cellen: vier soorten gameten, elk ± ¼; antwoord op de puzzel |
| 2. Het kruisingsschema met twee genen | s12–s17 (vraag q13) | vwo · Schema | zelfbestuiving, 4 × 4-schema, 9 : 3 : 3 : 1, Mendels tellingen 315/101/108/32, productregel ¾ × ¾, terugkruising 1 : 1 : 1 : 1 |
| 3. Gekoppelde genen | s18–s24 (vraag q21) | basis · Schema | fruitvlieg grijs/zwart (G/g) en normale/stompe vleugels (V/v) op één chromosoom; twee soorten gameten; ligging aflezen aan de ouders (GV/gv tegenover Gv/gV); vergelijking met de erwt |
| 4. Kruisingsschema's met gekoppelde genen | s25–s30 (vraag q29) | vwo · Schema | terugkruising 1 : 1 naast 1 : 1 : 1 : 1; F2 als 2 × 2-schema (3 : 1) in plaats van 9 : 3 : 3 : 1; productregel per gen werkt niet; Gv/gV × gv/gv. Model zonder crossing-over (staat in beeld) |
| 5. Crossing-over | s31–s34 | vwo · Micro/Schema | echte terugkruising: veel oude, weinig nieuwe combinaties (zonder getallen); crossing-over tussen chromatiden van homologe chromosomen in meiose I; één cel geeft twee oude en twee nieuwe gameten; gametenkolom met grote en kleine kans |
| Recap + vooruitblik | s35–s37 | basis (s36 vwo) · Macro | terug naar de peul; vier gameten tegenover twee; volgende film: een gen op het X-chromosoom |

Bewust weggelaten (Kamiel): recombinatiepercentage, genkaart en afstand tussen genen. Crossing-over alleen kwalitatief (syllabus vwo).

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q08 | Gg en Rr op verschillende chromosomen: hoeveel soorten gameten? | twee · vier · zestien | vier (b) |
| q13 (vwo) | Beide ouders vier soorten gameten: hoeveel vakjes? | vier · acht · zestien | zestien (c) |
| q21 | G naast V, g naast v, chromosoom in zijn geheel naar een gameet: hoeveel soorten gameten? | vier · één · twee | twee (c) |
| q29 (vwo) | Gv/gV × gv/gv zonder crossing-over: welke nakomelingen? | grijs-normaal en zwart-stomp · grijs-stomp en zwart-normaal · alle vier, even vaak | b |

Precieze opties: `film.py` en `segments.json`. Vragen uit: de speler knipt in s07 [2,8–6,88 s], s12 [8,11–11,76], s20 [4,8–8,92] en s28 [8,01–11,31]; de alinea's s09, s14, s22 en s30 beginnen met een eigen uitlegzin. Gecontroleerd door af te spelen met `?vragen=uit` rond elke vraagplek (`bouw/vu.py`, contactvel `review_fris/vu.webp`). Na het inbouwen nog `antwoordtekst.py --check`, `kortantwoord.py --check` en `antwoordletter.py --check` (hoofdsessie).

## Begrippen
dihybride kruising (vwo), onafhankelijke overerving, gekoppelde genen, 9 : 3 : 3 : 1 (vwo), productregel (vwo), crossing-over (vwo), recombinant (vwo) (`film.py`, `glossary`; vwo-begrippen verborgen in de havo-stand). 'Recombinatiepercentage' en 'genkaart' zijn eruit.

## Docentdeel
In `sections.html`: 6 checkvragen (4–6 vwo), hoe de film het uitlegt, misvattingen, getallen en bronnen (Mendel 1866; Morgan via OpenStax), keuzes en vereenvoudigingen (niveauverdeling volgens de syllabi, model zonder crossing-over in hoofdstuk 4, fruitvliegmannetjes zonder crossing-over, één uitwisseling per cel, letters als de Kruisingtrainer), plaats in de reeks, lessuggesties. Alle beweringen met bronnen: `bronnen.md` (13 bronnen, 28 beweringen: 20 ✓ · 8 ≈).

## Oefenen
`../oefenen.json` is herschreven (oude versie `oud/oefenen-v1.json`): `puzzel-gameten` (basis, nieuw), `volgorde-dihybride-schema` (vwo), `uitleg-9331` (vwo), `schema-crossing-over` (vwo, letters G/V zoals de film), `volgorde-crossing-over` (vwo, nieuw, zonder percentage), `uitleg-gekoppeld` (vwo, zonder 17 % en recombinatiepercentage). Weg: `uitleg-genkaart` en `volgorde-recombinatiepercentage`. `scripts/oefenen.py` draait de hoofdsessie.

## Waar wat in de HTML zit
Regelnummers in `../../4-dihybride-kruising-en-gekoppelde-overerving.html` (versie 2.0, vóór de repo-scripts van de hoofdsessie; die schuiven ze een paar regels op):
- r. 99 begrippen (`#glossary`), r. 110 docentdeel, r. 147 `window.FILMDATA` (segmenten, woordtijden, vragen).
- r. 10514 eigen tekeningen uit `src/nieuw_erf4.js`: `erwt`, `peul`, `erwtenplant`, r. 10579 `fruitvlieg`, `staafGenen`, `paarGenen`, `gameetCel`, r. 10648 `kruisSchema`, `gameetChip`.
- r. 10661 `E4_DECOR` (moestuin als base64-webp).
- r. 10669 hulpjes uit `src/scenes_erf4.js` (`e4Schema`, `e4Tuin`, `e4Meta`, `e4Chip`, `e4Paren`, `e4MetaCel`, r. 10706 `e4Sim`, `e4Schema16`, `e4VliegSchema`).
- r. 10726 `Object.assign(SCENES, …)`: `title` r. 10728, één functie per alinea (s01 r. 10732, s04 r. 10750, s12 r. 10787, s18 r. 10815, s25 r. 10851, s31 r. 10877, s35 r. 10914).
- r. 10934 speler (`const DATA = window.FILMDATA`).

## Zo pas je deze film aan
Werkmap buiten de repo (bv. `hw/erf4`) met de bestanden uit deze bronmap: `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `script_opname.md`, `src/nieuw_erf4.js`, `src/decor_erf4.js`, `src/scenes_erf4.js` (`teken_erf4.js` = nieuw + decor), audio als `audio/`, woordtijden als `words/`; engine = `src/` (lib.js, lib_bio.js, lib_cast.js, player.js, page.html, fonts.css, scenes_kop.js) + `bouw/` als `engbouw/`. Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + teken + scenes, dan `film.py`, `build_data.py`, `build.py`); stills met `bouw/stills.py`, cue-controle met `bouw/cuecheck.py`, Vragen uit met `bouw/vu.py`, duur met `bouw/dur.py`, inpakken met `bouw/pak_erf4.py`. Daarna in de repo: `spelerfix`, `antwoordtekst`, `kortantwoord`, `antwoordletter`, `flipkaarten`, `teller`, `licentie_noot`, `oefenen`, `reviewlijst`, `nieuwste_films`.
- Beeld wijzigen: alleen in `scenes_erf4.js` met dezelfde cue-woorden. `q.on`/`q.at` zoeken op een stukje van het genormaliseerde woord: cue niet op 'zo' (zit in heterozygoot) en let op 'Eén' ≠ 'één'. Genotypen nooit via `metaText` (die zet alles in hoofdletters), maar via `text`/`e4Tekst`.
- Tekst wijzigen = die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py` met `uitspraak_subs.json` + `uitspraak_film.json`), woordtijden met `silalign.py`.
- Kleuren: herkomst teal (ene ouder) / oker (andere ouder), gen goud, zoals Chromosomen 2.2.

## Aandachtspunten
- Beeldreview: `review_fris_2026-10-28.md` (contactvellen in `review_fris/`). Alle MOET-punten hersteld; KAN open: kleine vliegjes in de schemavakjes (s26/s30), chiasma in s32 niet als echte kruising getekend, 4 × 4-raster klein op de telefoon (s14), letters G/V niet op de linkerchromosomen in s33. De review is door de bouwer zelf gedaan; een onafhankelijke blik (Kamiel in de reviewstand) is nog nodig.
- Geen blinde transcriptie van de takes gedaan (geen Scribe van hele films); de risicowoorden staan in `uitspraak.md` voor Kamiels luisterbeurt.
- In hoofdstuk 5 is de dubbel heterozygote ouder van de terugkruising bewust een vrouwtje: bij fruitvliegmannetjes treedt geen crossing-over op.
- De productregel staat alleen in vwo (havo-syllabus kent geen dihybride kruising).

## Kandidaten voor de bibliotheek
Nu alleen in `src/nieuw_erf4.js` (niet in `bibliotheek/`, volgens de brief):
- `erwt` (geel/groen, rond/gerimpeld), `peul` (open, met erwten), `erwtenplant`.
- `fruitvlieg` (grijs/zwart, normale/stompe vleugels).
- `staafGenen` / `paarGenen` (chromosoom of homoloog paar met genbanden en allelletters, herkomstkleur).
- `gameetCel` en `gameetChip` (gameet met inhoud, chip met allelcombinatie).
- `kruisSchema` (n × m-raster met kop, zij en celfunctie), past bij de Kruisingtrainer en Erfelijkheid 2.

## Wijzigingen
- 28 okt 2026 — Versie 2.0: lichte remake op prompt v13. Nieuw script (fase 1, goedgekeurd), gekoppelde overerving uitgelegd met kruisingsschema's (gameten van een gekoppeld paar, terugkruising, F2, vergelijking met onafhankelijke overerving); recombinatiepercentage, genkaart en afstand tussen genen eruit; crossing-over kwalitatief; havo/vwo-verdeling volgens de syllabi; 'erwten' als 'erten', 'gameten' als 'ga-MEE-ten'; nieuwe stem (32 takes), Opa Henk in de moestuin, nieuwe tekeningen, huidige speler (snelheid, Vragen aan/uit), donker standaard, bronnenlogboek, oefeningen herschreven. De oude film staat in `oud/`.
