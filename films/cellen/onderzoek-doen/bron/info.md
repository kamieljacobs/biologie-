# Onderzoek doen in de biologie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/onderzoek-doen/index.html (audio in `audio/s01.mp3` … `s45.mp3`) |
| Reeks / nummer | Losse film (onderzoeksvaardigheden), rij Cellen nr. 1 |
| Doelgroep / niveau | havo 4 + vwo 4 (basis); de verdieping (statistiek, Mendel/Fisher, patiënt-controle/cohort, wetenschap als systeem) staat in de extra film *Kun je onderzoek vertrouwen?* (`films/extra/kun-je-onderzoek-vertrouwen.html`) |
| Versie / datum | 2.0 · 31 okt 2026 (lichte remake; oude versie 1 in `bron/oud/`, blijft daar tot Kamiel 2.0 goedkeurt) |
| Prompt | v13 |
| Voldoet aan | prompt v13 |
| Stem / model | Roos (voice_id 7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea; flow https://elevenlabs.io/app/flows/Ca19d7HWSbKzrpYiWdsg (±9.989 credits). Opnamelijst in `stem/gen.json` en `stem/sessions.json` |
| Duur | 13:17 (vwo-stand, met vraagkaarten); gesproken tekst 664,5 s |
| Beeldstijl | Part C Schema-look (±80 %) + Macro-nacht voor het paard Hans; doorlopend onderzoeksbord met 8 schriftblaadjes; CASUS-kaart (klein, oker, linksboven) tegenover BEGRIP-kaart (groot, gouden haak): de casus is voorbeeld, het begrip is de les |
| Audio-opslag | losse mp3 per segment in `audio/`; woordtijden lokaal met silalign |
| Herkomst | Remake van versie 1 (Labjournaal-look, vwo 5–6, 21 min). Kamiel 30 okt 2026: het te diepgaande deel als extra film los, de casus mag niet boven de inhoud gaan, ethiek blijft in de basis, geen portretten van echte personen |

## Opbouw

| Begin | Hoofdstuk | Kern |
|---|---|---|
| 0:00 | Cold open | Het paard Hans (Berlijn 1904) tikt sommen; vraag q02 (antwoord in H3) |
| 0:27 | Titel | |
| 0:32 | 1 De onderzoekscyclus | De cyclus in acht stappen; de kiemproef met tuinkers (Yasmin, niet bij naam) loopt als rode draad over het onderzoeksbord |
| 1:06 | 2 Van vraag naar verwachting | Onderzoeksvraag, hypothese, verwachting, falsifieerbaar; Semmelweis (Wenen 1847) als voorbeeld |
| 3:06 | 3 Een eerlijke proef | Onafhankelijke/afhankelijke/constante variabele, controlegroep, randomiseren, blind en dubbelblind; Pfungst en Hans; placebo |
| 5:10 | 4 Meten en meetfouten | Toevallige vs systematische fout, steekproef, betrouwbaar, nauwkeurig, valide; Van Helmonts wilg |
| 7:13 | 5 Van resultaat naar conclusie | Grafiek kiezen, spreiding (Grants: snavels), resultaten kiemproef (41 tegen 38), conclusie en discussie |
| 9:03 | 6 Samen of oorzaak? | Experiment vs observationeel, correlatie, causaliteit, omgekeerde causaliteit, verstorende variabele; roken en longkanker (Engeland ±1950) |
| 10:40 | 7 Eerlijk onderzoek | Henrietta Lacks (alleen naam + kweekfles), informed consent, drie V's, te weinig proefdieren, fraude |
| 12:27 | Recap | Onderzoeksbord compleet: betrouwbaar? valide? |
| 13:07 | Eindkaart | |

## Vragen (antwoord)
q02 b (lichaamstaal) · q09 a · q15 c (controlegroep) · q21 b (systematische fout) · q29 c (spreiding groter dan verschil) · q35 a (rust en regelmaat) · q42 b (te weinig dieren). Volledige tekst en opties: `script.md`.

## Begrippen
29 begrippen in `bouw/film.py` (`glossary`): o.a. onderzoekscyclus, hypothese, verwachting, falsifieerbaar, (on)afhankelijke en constante variabele, controlegroep, randomiseren, blind/dubbelblind, placebo, toevallige/systematische fout, steekproef, betrouwbaar, nauwkeurig, valide, spreiding, conclusie, discussie, correlatie, causaliteit, omgekeerde causaliteit, verstorende variabele, informed consent, drie V's, fraude.

## Docentdeel
In `bouw/sections.html`: 5 checkvragen (zout en waterkers, betrouwbaar of valide, Semmelweis opnieuw, welke grafiek, hypothese verworpen), docentdeel (hoe de film het uitlegt, misvattingen, vereenvoudigingen), bronnen. Oefeningen in `../oefenen.json` (5; de chi-kwadraatpuzzel is naar de extra film verhuisd).

## Waar wat in de HTML zit (index.html)
- r. 69 sitebalk · r. 98 begrippen · r. 100 checkvragen · r. 119 voor de docent · r. 152 bronnen
- r. 9396 `casusKaart` (begin van `onderzoek_lib.js`) · r. 9548 `SCENES` (de scènes s01–s45, uit `bouw/scenes.js`) · r. 9740 `DATA` · r. 9803 `drawEnd` (eindkaart)

## Hoe je de film aanpast
Werkmap buiten de repo, bv. `hw/onderzoek/`: kopieer `bron/bouw/engine/` naar `engine/` en `bron/bouw/*` naar `dev_basis/`, plus `audio/` naar `dev_basis/film/audio/` en de woordtijden (opnieuw met `engine/silalign.py` uit de mp3's als ze ontbreken).
- Beeld: `scenes.js` (per segment `SCENES.sNN(ctx, t, q)`, cues met `q.on('woord', n)`), gedeelde objecten in `engine/onderzoek_lib.js`.
- Tekst/vragen/begrippen: `film.py` en `sections.html`; ondertitels/stem: `segments.json` (`display` / `voice`).
- Bouwen: `python3 ../engine/build_data.py . && python3 ../engine/build.py .` in `dev_basis/`; contactvel met `engine/stills.py dev_basis <uit> contact` en `engine/vel.py <uit> <prefix>`.
- Daarna de verplichte scripts uit CLAUDE.md (spelerfix, antwoordtekst, kortantwoord, antwoordletter, microteken, flipkaarten, tabel_mobiel, licentie_noot, teller, nieuwste_films, reviewlijst, controle).
- Nieuwe tekst inspreken: alleen het gewijzigde segment, één take, met de respellings uit `films/uitspraak.json` en `bouw/uitspraak_film.json`.

## Aandachtspunten
- Geen portretten van echte personen (Kamiel akkoord 30 okt 2026): casuskaart met plaats en jaar + opstelling of object.
- Het paard is een Macro-nachtscène met silhouetten (vraagsteller met hoed), geen echte persoon.
- Antwoordletters zijn gespreid; bij Vragen uit knipt de speler de vraagzin.
- Bronnen en controle van de vakinhoud: `bronnen.md`; reviews: `reviews/`.
