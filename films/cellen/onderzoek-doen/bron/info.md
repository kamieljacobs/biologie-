# Onderzoek doen in de biologie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/onderzoek-doen/index.html (audio in `audio/s01.mp3` … `s45.mp3`, plus `b01.mp3` … `b09.mp3` voor hoofdstuk 5) |
| Reeks / nummer | Losse film (onderzoeksvaardigheden), rij Cellen nr. 1 |
| Doelgroep / niveau | havo 4 + vwo 4 (basis); de verdieping (statistiek, Mendel/Fisher, patiënt-controle/cohort, wetenschap als systeem) staat in de extra film *Kun je onderzoek vertrouwen?* (`films/extra/kun-je-onderzoek-vertrouwen.html`) |
| Versie / datum | 2.1 · 31 okt 2026 (nieuw hoofdstuk 5 Betrouwbaar en valide; 2.0 = lichte remake van dezelfde dag; oude versie 1 in `bron/oud/`, blijft daar tot Kamiel 2.x goedkeurt) |
| Prompt | v13 |
| Voldoet aan | prompt v13 |
| Stem / model | Roos (voice_id 7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea; flow https://elevenlabs.io/app/flows/Ca19d7HWSbKzrpYiWdsg (2.0: ±9.989 credits; 2.1: 9 takes b01–b09, 2.085 credits). Opnamelijst in `stem/gen.json`, `stem/sessions.json`, `stem/map.tsv` |
| Duur | 15:28 (vwo-stand, met vraagkaarten; 13:15 met Vragen uit); gesproken tekst ± 805 s |
| Beeldstijl | Part C Schema-look (±80 %) + een daglichtdecor (`dagDecor`, binnenplaats in Berlijn) voor het paard Hans (Kamiel 31 okt 2026: overdag in plaats van nacht); doorlopend onderzoeksbord met 8 schriftblaadjes; CASUS-kaart (klein, oker, linksboven) tegenover BEGRIP-kaart (groot, gouden haak): de casus is voorbeeld, het begrip is de les |
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
| 5:10 | 4 Meten en meetfouten | Toevallige vs systematische fout, steekproef, betrouwbaar, nauwkeurig |
| 6:34 | 5 Betrouwbaar en valide (nieuw in 2.1) | Twee vragen bij elk onderzoek (examen: zwak punt/verbetering koppelen); betrouwbaar = toeval (meer, herhalen, vast werkplan, spreiding); herhaalbaar → reproduceerbaar; valide = klopt je conclusie, drie vragen (meet je wat je wilt weten · Okselfris havo 2022; komt het door jouw variabele · controlegroep, positieve controle; geldt het buiten je proef · sla, buiten, muis → mens); vaker meten ≠ meer valide; Van Helmonts wilg als toepassing (s24–s25) |
| 9:25 | 6 Van resultaat naar conclusie | Grafiek kiezen, spreiding (Grants: snavels), resultaten kiemproef (41 tegen 38), conclusie en discussie |
| 11:15 | 7 Samen of oorzaak? | Experiment vs observationeel, correlatie, causaliteit, omgekeerde causaliteit, verstorende variabele; roken en longkanker (Engeland ±1950) |
| 12:52 | 8 Eerlijk onderzoek | Henrietta Lacks (alleen naam + kweekfles), informed consent, drie V's, te weinig proefdieren, fraude |
| 14:39 | Recap | Onderzoeksbord compleet: betrouwbaar? valide? |
| 15:19 | Eindkaart | |

## Vragen (antwoord)
q02 b (lichaamstaal; antwoord in H3) · q09 a · q15 c (controlegroep) · q21 b (systematische fout) · q29 c (spreiding groter dan verschil) · q35 a (rust en regelmaat) · q42 b (te weinig dieren). Volledige tekst en opties: `script.md`.

## Begrippen
31 begrippen in `bouw/film.py` (`glossary`; in 2.1 nieuw: herhaalbaar, reproduceerbaar; betrouwbaar en valide uitgebreid): o.a. onderzoekscyclus, hypothese, verwachting, falsifieerbaar, (on)afhankelijke en constante variabele, controlegroep, randomiseren, blind/dubbelblind, placebo, toevallige/systematische fout, steekproef, betrouwbaar, nauwkeurig, valide, spreiding, conclusie, discussie, correlatie, causaliteit, omgekeerde causaliteit, verstorende variabele, informed consent, drie V's, fraude.

## Docentdeel
In `bouw/sections.html`: 5 checkvragen (zout en waterkers, betrouwbaar of valide, Semmelweis opnieuw, welke grafiek, hypothese verworpen), docentdeel (hoe de film het uitlegt, met in 2.1 het blok 'Betrouwbaar of valide? Zo komt het op het examen' met zeven examenvoorbeelden, misvattingen, vereenvoudigingen), bronnen. Oefeningen in `../oefenen.json` (5; de chi-kwadraatpuzzel is naar de extra film verhuisd).

## Waar wat in de HTML zit (index.html)
- r. 74 sitebalk · r. 103 begrippen · r. 105 checkvragen · r. 124 voor de docent · r. 171 bronnen
- r. 9415 `casusKaart` (begin van `onderzoek_lib.js`) · r. 9583 `vraagVak` (tekenhulpjes hoofdstuk 5) · r. 9638 `SCENES` (de scènes s01–s45 en b01–b09, uit `bouw/scenes.js`; b01 op r. 9732) · r. 9918 `DATA` · r. 9999 `drawEnd` (eindkaart)

## Hoe je de film aanpast
Werkmap buiten de repo, bv. `hw/onderzoek/`: kopieer `bron/bouw/engine/` naar `engine/` en `bron/bouw/*` naar `dev_basis/`, plus `audio/` naar `dev_basis/film/audio/` en de woordtijden (opnieuw met `engine/silalign.py` uit de mp3's als ze ontbreken).
- Beeld: `scenes.js` (per segment `SCENES.sNN(ctx, t, q)` en voor hoofdstuk 5 `SCENES.bNN`, cues met `q.on('woord', n)`; let op: `q.on` zoekt op een deel van het woord, dus 'betrouwbaar' vindt ook 'betrouwbaarder'), gedeelde objecten in `engine/onderzoek_lib.js`; de tekenhulpjes van hoofdstuk 5 (vraagVak, valRij, bvChips, zaadWortel, klokje, thermometer, wattenPotje, kropSla, klasVak, buitenVak, meterBalk, examenBlad) staan bovenin `scenes.js`.
- Tekst/vragen/begrippen: `film.py` en `sections.html`; ondertitels/stem: `segments.json` (`display` / `voice`).
- Bouwen: `python3 ../engine/build_data.py . && python3 ../engine/build.py .` in `dev_basis/`; contactvel met `engine/stills.py dev_basis <uit> contact` en `engine/vel.py <uit> <prefix>`.
- Daarna de verplichte scripts uit CLAUDE.md (spelerfix, antwoordtekst, kortantwoord, antwoordletter, microteken, flipkaarten, tabel_mobiel, licentie_noot, teller, nieuwste_films, reviewlijst, controle).
- Nieuwe tekst inspreken: alleen het gewijzigde segment, één take, met de respellings uit `films/uitspraak.json` en `bouw/uitspraak_film.json`.
- Niet opnieuw `make_segments.py` draaien zonder de vaste ids b01–b09 en de knip van s24 over te nemen (zie `bouw/script.md`). De woordtijden van s24 zijn die van de 2.0-take min 4,02 s.

## Aandachtspunten
- Geen portretten van echte personen (Kamiel akkoord 30 okt 2026): casuskaart met plaats en jaar + opstelling of object.
- Het paard staat overdag op een binnenplaats (keuzeblad twijfelscènes 31 okt 2026); de vraagsteller is een silhouet met hoed, geen echte persoon. Tags en casuskaart krijgen op daglicht een donkere ondergrond (`window._dag`).
- Antwoordletters zijn gespreid; bij Vragen uit knipt de speler de vraagzin.
- Bronnen en controle van de vakinhoud: `bronnen.md`; reviews: `reviews/`.

## Wijzigingen
- **2.1 · 31 okt 2026** (Kamiel: 'het begrip betrouwbaarheid en validiteit mag nog uitgebreider'; tekst goedgekeurd in `hoofdstuk-betrouwbaar-valide.md`, met zijn correctie 'niet meer valide' in alinea 8): nieuw hoofdstuk 5 *Betrouwbaar en valide* (alinea's b01–b09, nieuw ingesproken, 2.085 credits), daarna Van Helmont (s24, s25) als toepassing. s24 begint nu bij 'In de zeventiende eeuw': de eerste zin 'En valide betekent: je meet echt wat je wilt weten.' is weggeknipt op de woordtijden (audio vanaf 4,02 s, geen nieuwe opname). Oude H5–H7 zijn H6–H8; hoofdstukkaarten, eindkaart en recap ongewijzigd. Beeld: begripkaarten BETROUWBAAR en VALIDE, drie validiteitsvragen als vakken die één voor één vollopen, kiemproef als rode draad, Okselfris (havo 2022) met wattenschijfjes in potjes, positieve controle als extra bakje, tuinkers → sla/buiten en muis → mens, meterbalken (betrouwbaar ↑, valide =). s24/s25 kregen de chips betrouwbaar?/valide? (s25: kruisje bij 'één boom' en bij 'de lucht'). Begrippen herhaalbaar en reproduceerbaar erbij; docentdeel met examenvoorbeelden; bronnen B54–B65 en beweringen 60–71 in `bronnen.md`. Ook hersteld: de uitleg bij vraag q02 verwees naar hoofdstuk 2, het antwoord staat in hoofdstuk 3; de docenttabel nummerde de hoofdstukken vanaf 0. Vragen uit: dezelfde knippen als in 2.0 (getest). Luisterfragmenten: `stem/onderzoek-h5-NN-luister.mp3`, `stem/onderzoek-s24-knip-luister.mp3`. Reviewstatus: nog bekijken.
