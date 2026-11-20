# Eén doel of alles tegelijk? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/sport-4-een-doel-of-alles-tegelijk.html` (audio in `sport-4-een-doel-of-alles-tegelijk/audio/`) |
| Reeks | Wat word jij? · Sport en topsport (zwemmen) |
| Niveau | havo/vwo bovenbouw (één niveau) |
| Versie | 1.0 · 19 november 2026 (script v2) |
| Prompt | v13 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea (flow in `stem/sessions.json`) |
| Duur | spraak 5:43 (343 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema met cast (Part C, prompt v13), navy |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 19 nov 2026 (reeksmodus); B15: drie scriptvarianten, blinde beoordelaar claude-fable-5-2 (werk/blind*), → script_v2 → feitenreview(s) in reviews/; bronnenlogboek bronnen.md |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01 | badrand van het 50-meterbad; de zwemmer met badmuts, bril op het voorhoofd; de trainer met klembord; drie wenskaartjes: '100 M SNELLER' (goud), 'STERKER VAN HET BLOK' (oker), '400 M VOLHOUDEN' (groen); puzzelkaart 'ALLES TEGELIJK?' |
| Hoofdstuk 1 — Je wordt goed in wat je traint | s03 | het klembord groot in beeld met drie lege balken (goud, oker, groen); de trainer tikt erop; daarna op het klembord een grafiek 'WEEK 1–10' met twee panelen KRACHT (oker) en CONDITIE (groen), lijnen van twee groepen: 'ALLEEN KRACHT' en 'ALLEEN DUUR'; kaartje 'HICKSON 1980'; kaart 'SPECIFIEK' |
| Hoofdstuk 2 — Doelen die botsen, en doelen die helpen | s04, q05, s06, s07, q08, s09 | zelfde grafiek op het klembord; lijnen van de derde groep 'KRACHT + DUUR' tekenen zich tot week 7, de krachtlijn van de krachtgroep gestippeld ernaast; tijdens de vraag stopt de grafiek bij week 7 met een vraagteken; na het antwoord vlakt de okerlijn af en zakt in week 9 en 10, de groene lijn stijgt door; kaart 'INTERFERENTIE-EFFECT'; daarna drie staven 'MAXIMALE KRACHT', 'SPIERMASSA', 'EXPLOSIEVE KRACHT' (alleen de laatste lager, koraal randje); klokjes 'IN ÉÉN TRAINING' en 'UREN ERTUSSEN' (label 'LIJKT'); meta 'SCHUMANN E.A. 2021'; dan de baan in bovenaanzicht: de zwemmer zwemt '8 × 50 M', stopwatch-tegels; na de sprintvraag twee rijtjes tijden 'MET AEROBE BASIS' en 'ZONDER' (label 'VOORBEELD'); meta 'TOMLIN & WENGER 2001' |
| Hoofdstuk 3 — Het seizoen in blokken, en afbouwen | s10, q11, s12, s13, q14, s15 | tafel aan de badrand; de trainer met een leeg jaarplan (52 lege weekvakjes; geen schema dat een optie voorzegt); na het antwoord het jaarplan in bovenaanzicht als een rij baden, één bad per week; in elk blok licht één baan fel op (eerst groen BASIS, dan oker KRACHT, dan goud SNELHEID) en lopen de andere gedimd door ('ONDERHOUD'); kaart 'PERIODISEREN'; aan het eind een wedstrijdvlag 'TOERNOOI'; vóór de tapervraag: meterteller per week zakt in de laatste drie weken, tempometer blijft hoog; na het antwoord: tijd zakt, kaart 'TAPEREN'; 99 stipjes, 91 goud; '± 2 %'; '100 M: ± 1 SECONDE'; meta 'MUJIKA E.A. 2002 · SYDNEY 2000'; kaartje 'PERIODISEREN' |
| Hoofdstuk 4 — Herstel hoort bij de training | s16, s17, q18, s19 | het klembord krijgt een vierde balk 'HERSTEL' (teal); de zwemmer thuis in bed (pyjama), wekker '05:30'; bord met eten en een bidon; kalenderweek met één teal dag; tijdens de vraag het scorebord met een trage tijd (koraal) en wolkjes 'SLECHT GESLAPEN', 'GEEN ZIN'; na het antwoord een balans 'BELASTING' (oker) en 'HERSTEL' (teal) met extra gewichtjes 'SCHOOL', 'WEINIG SLAAP', 'TE WEINIG ETEN'; kaart 'OVERTRAINING'; de trainer met een logboekje: 'TIJDEN' en 'HOE VOEL JE JE?'; meta 'MEEUSEN E.A. 2013 · WALSH E.A. 2021'; na het antwoord kort een arts naast de trainer |
| Recap | s20, s21 | het klembord met de vier balken wordt het jaarplan met blokken en de afbouw; de zwemmer fris op het startblok; vier kaartjes: 'HELPEN: AEROBE BASIS → HERSTEL', 'BOTSEN: VOORAL EXPLOSIEVE KRACHT', 'BLOKKEN + AFBOUWEN', 'HERSTEL HOORT ERBIJ'; opleidingen: 'TRAINER-COACH · NOC*NSF' · 'HBO · SPORTKUNDE · BV. NIJMEGEN' · 'WO · BEWEGINGSWETENSCHAPPEN · VU AMSTERDAM · GRONINGEN' (meta '2026') |

## Vragen
q05 → b; q08 → c; q11 → a; q14 → c; q18 → b (zie film.py).

## Begrippen
specifiek trainen, interferentie-effect, explosieve kracht, aerobe basis, periodiseren, taperen, herstel, overtraining, inspanningsfysioloog.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 161 | `window.FILMDATA` |
| 2251 | `const SCENES = {}` |
| 2602 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/sp4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> sport`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Nieuwe sportcast ter keuring (zwemtrainer, sportpsycholoog, Sam zwem)
- Figuranten in zwemkleding als film-eigen garderobe in teken_sp4.js
