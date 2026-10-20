# In de spreekkamer — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-5-in-de-spreekkamer.html` (audio in `psychologie-5-in-de-spreekkamer/audio/`) |
| Reeks | Wat word jij? · Psychologie (klinisch) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2.1) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea (flow in `stem/sessions.json`), 5.654 + 830 (heropname s14) credits |
| Duur | spraak 6:19 (379 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C · Schema, met cast (Sam als cliënt; jij als psycholoog in ik-perspectief: bureau en notitieboek, spreekkamer uit Welke therapie werkt?) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026 (Kamiel akkoord: intake i.p.v. werkrelatie, geen overlap met stap 2 'Een dag uit het werk'); script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | spreekkamer, Sam (16) vraagt om geheimhouding (tekstballon) |
| H1 Luisteren, samenvatten, doorvragen | s04, q05, s06 | 'eerst: luisteren'; drie vraagkaartjes (VERWIJT?, STUREND, OPEN); samenvatting in een ballon van 'jij'; doorvragen van vaag naar concreet |
| H2 De intake | s07 | KLACHT → HULPVRAAG; vijf intakevragen (veiligheid uitgelicht); vragenlijst; toestemming per leeftijd, 16+ uitgelicht |
| H3 Geheim, tenzij | s08 | dossier met slot; wet en beroepscode (vier basisprincipes alleen in beeld); weegschaal zwijgen/beschermen; drie voorwaarden; 'jij' tegen Sam |
| H4 Als het thuis niet veilig is | s09, q10, s11 | Sam vertelt (alleen tekstballon); meldcode in vijf stappen; drie meldgronden → Veilig Thuis; 112 bij direct gevaar; kaart 'Kinderen zijn nooit schuldig aan geweld thuis' |
| H5 Een classificatie stellen | s12, q13, s14 | DSM-boek; negen kenmerken met twee kernvakjes; drempels; Sam 4 van 9; balk licht–zwaar met grens; twee hulpverleners; kappaschaal 0–1 |
| Recap | s15 | Sam; vier taken van het vak; opleidingsroute; hulpkaart (Kindertelefoon, Veilig Thuis, 113, 112) |

## Vragen
q02 → b; q05 → c; q10 → b; q13 → b (zie film.py).

## Begrippen
open vraag, gesloten vraag, sturende vraag, samenvatten, intake, hulpvraag, beroepsgeheim, conflict van plichten, meldcode, Veilig Thuis, DSM, kernsymptoom.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100–109 | Checkvragen |
| 110–137 | Voor de docent (met 'Let op vooraf') |
| 138 | `window.FILMDATA` |
| 1499 | `const SCENES = {}` |
| 1500–1545 | kamer, bureau (therapiefilm), vraagKaartje, checkRij, hBalk en eigen tekeningen (spreek, jijZegt, samZegt, vakKaart, dossier, weegschaal2, stapRij, boekDSM, DSM_KENMERKEN, kenmerkLijst, licht2zwaar, kappaSchaal, hulpkaart) |
| 1546–1641 | `Object.assign(SCENES, { title, s01 … s15 })` |

## Hoe je de film aanpast
Zoals bij Kun je je geheugen vertrouwen? (zie die info.md), met werkmap `hw/sk` en scènes `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat sk/extra.js sk/scenes_sk.js; } > sk/scenes.js`. Let op: `KENMERKEN` bestaat al in de gedeelde helpers, daarom heet de lijst hier `DSM_KENMERKEN`.

## Aandachtspunten
- Gevoelig onderwerp: geweld thuis staat alleen als tekstballon van Sam in beeld; de hulpkaart (Kindertelefoon 0800-0432, Veilig Thuis 0800-2000, 113 / 0800-0113, 112) staat in de recap en de nummers ook op de eindkaart. Controleer de nummers en openingstijden jaarlijks.
- De stem zegt 'Het antwoord is …' (andere films: 'Antwoord …'), zoals de taalreview voorstelde.
- De samenvatting van 'jij' voegt 'daarom mis je de eerste uren' toe; bewust (Sam kan verbeteren), staat als KAN in de eindreview.
- Woordtijden via silalign; bij enkele alinea's vielen niet alle leestekens op een stilte.

## Wijziging 20 okt 2026 (v2.1, na de eindreview)
Eindreview (`reviews/review_eind.md`, 4 MOET) verwerkt: s14 opnieuw ingesproken ('Vier kenmerken is geen lichte depressie. Volgens deze criteria is het geen depressieve stoornis.'; jaartal van de veldproeven weg, die liepen 2010–2011 en verschenen in 2013); eindkaart 'overleg eerst, bij direct gevaar 112' plus een regel met hulpnummers; hulpkaart groter; labels in de cold open vrij van raam en plant.
