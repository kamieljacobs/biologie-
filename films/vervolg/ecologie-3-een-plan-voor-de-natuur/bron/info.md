# Een plan voor de natuur — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/ecologie-3-een-plan-voor-de-natuur.html` (audio in `ecologie-3-een-plan-voor-de-natuur/audio/`) |
| Reeks | Wat word jij? · Ecologie en natuurbeheer |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | v10 |
| Voldoet aan | prompt v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.513 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:09 (369 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas), Micro waar een molecuul of cel het mechanisme draagt |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026, op verzoek van Kamiel: 3 scriptvarianten (A klassiek, B kleine, C grote mutatie) → blinde beoordelaar (`werk/blind/`) → script v1 → frisse feitenreview (`reviews/review_v1.md`, `bronnen.md`) → v2 → storyboard, twijfelscènes gekeurd door Kamiel (25 okt 2026) → inspreken → frisse beeldreview (`reviews/review_beeld.md`) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | de rand van de maisakker naast de paarse heide; Daan met een schep in een kuil, de kuilwand als doorsnede: een donkere band bovenin, licht geel zand eronder; Ecoloog Bas met een duimstok aan de rand; aan de rand van de akker een graafmachine |
| Hoofdstuk 1 — Welke natuur wil je? | s04, s05, s06, s07, q08, s09 | Bas vouwt een kaart open; de heide krijgt een gouden rand met het label 'Natura 2000'; inzet: Europa met stippen van ruim 160 gebieden in Nederland; kaartje 'instandhoudingsdoel: droge heide · uitbreiding oppervlakte · verbetering kwaliteit'; een tapuit op een paaltje met kaal zand en konijnenholen; daarna drie lagen: Europa (regels), Rijk (gebied en doelen), provincie (beheerplan, kaart met de akker), met Bas ernaast als adviseur |
| Hoofdstuk 2 — Van akker naar natuur | s10, s11, s12, s13, q14, s15, s16, s17 | de kuilwand als doorsnede met een donkere bovenlaag (label 'bouwvoor · twintig tot veertig centimeter') op licht zand; fosfaatbolletjes (oker) vooral in de bouwvoor; een spaarpot met het label 'fosfaat'; twee vierkantjes naast elkaar: arme grond met heideplantjes, rijke grond met hoog gras dat eroverheen groeit; kaartje 'Wassen e.a. 2005 · onderzochte natte graslanden en moerassen in NL/België: 7 van de 10 bedreigde soorten op fosfaatarme plekken'; drie wegen als pijlen: maaien (10 kg fosfor per jaar), uitmijnen (40 kg fosfor per jaar, oogstwagen), afgraven (graafmachine); de som op het scherm; daarna de Reijerscamp als kaartje 'echt gebeurd · Wolfheze, rand van de Veluwe · 2006' met een dun laagje heidegrond |
| Hoofdstuk 3 — Kleine, losse populaties | s18, s19, q20, s21 | Nederland als lappendeken: veel kleine heideveldjes tussen akkers en wegen; één veldje wordt leeg (populatie sterft uit door pech), een veldje dicht bij een groot gebied krijgt nieuwe stipjes binnen, een ver veldje niet; daarna twee kaartjes naast elkaar: Reijerscamp (los, ver van grote heide) en Drenthe (direct naast een grote heide), met loopkevers; ecoduct als klein icoon met verwijzing |
| Hoofdstuk 4 — Werkt het? Meten en bijsturen | s22, s23, q24, s25, s26 | Daan zet een vierkant uit met touw en vier piketten; een lijstje vult zich met soortnamen en percentages; een tijdbalk met elk jaar dezelfde vierkanten; daarna drie proefvakken van de Reijerscamp na zes jaar als bedekkingsbalken met marge: niets gedaan (bijna alles groen), alleen afgegraven (ongeveer een kwart), afgegraven met heidegrond (ruim de helft); label 'gemeten na zes jaar'; daarna een kringloop doel → maatregel → meten → bijsturen, met een schaap, een zakje zaad en een gezaagd berkje |
| Recap | s27, s28 | de akker in drie stappen naast elkaar: mais, kaal zand met een laagje heidegrond, jonge heide met een tapuit op een paaltje; daaronder de vier woorden doel · bodem · verbinding · meten; daarna opleidingskaartjes en werkplekken |

## Vragen
q02 → c; q08 → a; q14 → b; q20 → a; q24 → b (zie film.py).

## Begrippen
natuurdoel / doelsoort, Natura 2000, habitattype, instandhoudingsdoel, bouwvoor, verschralen, uitmijnen, populatie, monitoring en vegetatieopname, adaptief beheer.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 116 | Voor de docent |
| 167 | `window.FILMDATA` |
| 2042 | `const SCENES = {}` |
| 5077 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/ec3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> ecologie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- zie brief.md en reviews/review_beeld.md
