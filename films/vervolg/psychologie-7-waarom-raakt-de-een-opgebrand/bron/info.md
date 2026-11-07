# Waarom raakt de één opgebrand? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-7-waarom-raakt-de-een-opgebrand.html` (audio in `psychologie-7-waarom-raakt-de-een-opgebrand/audio/`) |
| Reeks | Wat word jij? · Psychologie (gezondheids- en arbeidspsychologie) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2.1) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea (flow in `stem/sessions.json`), 6.650 + 2.214 (heropname s10, s13, s15) credits |
| Duur | spraak 7:20 (440 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Part C · Schema, met cast (Noor en Daan, Dr. Kim als stressonderzoeker, Henk als werknemer met burn-out; Dr. Kim en Henk ook als jury in de Trier-test) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026, op verzoek van Kamiel als verdieping die verdergaat waar Stress (Hormonen 4) stopt (eerder stond dit onderwerp als 'schrappen'); script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) → v2.1 |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | rooster van de toetsweek; Noor (volle batterij) en Daan (lege batterij, maan en 03:00) |
| H1 Het zit in je beoordeling | s04, q05, s06 | schrik → adrenaline → cortisol; twee beoordelingsvragen (Lazarus) en hulpbronnen; bedreiging tegenover uitdaging; drie kooien (Weiss): wieltje, schokjes; staafjes maagzweertjes; piepje; Daan met planning |
| H2 Stress meten | s07 | Dr. Kim; vragenlijst met schaal; speekselbuisje en dagcurve; haarlok met drie maanden; Trier-test (Daan aan de lessenaar, jury); drie methoden gecombineerd |
| H3 Wat langdurige stress met je lijf doet | s08, q09, s10 | gehemelte met wondje, kalenderkaarten; genezingsbalken; 11 stippen; virus en staafjes verkoudheid; pieken (gezond tegenover steeds aan) en gewichtjes (allostatische belasting) |
| H4 Van stress naar burn-out | s11, q12, s13 | Henk met papierstapel; drie kenmerken; WHO; venndiagram burn-out/depressie; wat helpt; trap 'stap voor stap' |
| H5 Wat doet een psycholoog hier? | s14 | weegschaal werkeisen/hulpbronnen; Henk krijgt grip, half jaar later halve dagen; gezondheidspsycholoog |
| Recap | s15 | Noor en Daan; niet zijn schuld; één toetsweek is nog geen burn-out; planning en hulp; hulpkaart (mentor, vertrouwenspersoon, huisarts); studieroute |

## Vragen
q02 → b; q05 → b; q09 → c; q12 → b (zie film.py).

## Begrippen
beoordeling, bedreiging en uitdaging, hulpbronnen, grip, voorspelbaarheid, cortisol-dagritme, haarcortisol, Trier-stresstest, allostatische belasting, burn-out, werkeisen en hulpbronnen, arbeidspsycholoog, gezondheidspsycholoog.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100–109 | Checkvragen |
| 110–141 | Voor de docent (met 'Let op vooraf') |
| 142 | `window.FILMDATA` |
| 1503 | `const SCENES = {}` |
| 1504–1546 | vraagKaartje, weegschaal2, vakKaart, stapRij, checkRij, hBalk (uit eerdere films) en eigen tekeningen (batterij, rooster, maanWekker, rat, kooi, luidspreker, dagcurve, haarlok, mond, kalenderKaart, neusDruppel, virus, gewichtjes, pieken, venn, trap, lessenaar, speeksel, bureauStapel) |
| 1547–1643 | `Object.assign(SCENES, { title, s01 … s15 })` |

## Hoe je de film aanpast
Zoals bij Kun je je geheugen vertrouwen? (zie die info.md), met werkmap `hw/st` en scènes `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat st/extra.js st/scenes_st.js; } > st/scenes.js`.

## Aandachtspunten
- De filmtitel op de titelkaart is ingekort tot 'Waarom raakt de één opgebrand?' (de lange vraag past niet op één regel); de ondertitel begint met '… en de ander niet?'.
- Toon: Daan mag niet als 'eigen schuld' overkomen; de film noemt hulpbronnen (tijd, hulp, rust thuis) en zegt in de recap 'Dat is niet zijn schuld'.
- Burn-out is in de film niet gekoppeld aan 'hoge cortisol' (geen eenduidig patroon).
- KAN-punten uit de eindreview die niet zijn verwerkt (zouden nieuwe audio vragen): optie (a) in de openingsvraag ('Daan leert minder hard') wordt niet expliciet weerlegd; 'dezelfde weegschaal als Lazarus' in H5 is een vereenvoudiging (het werkeisen-hulpbronnenmodel is een eigen model).
- Na de opname waren de audiobestanden eerst naar sessie-id genoemd; ze zijn hernoemd naar s01 … s15.
- Woordtijden via silalign; bij s01, s10, s11, s13 en s14 vielen enkele leestekens niet op een stilte.

## Wijziging 20 okt 2026 (v2.1, na de eindreview)
Eindreview (5 MOET) verwerkt: recap opnieuw ingesproken (één toetsweek is nog geen burn-out; zo raakt de één opgebrand; niet Daans schuld), s10 ('andere onderzoeken vonden hetzelfde') en s13 ('is vaak eerder terug') opnieuw ingesproken; hulpkaart in de recap pas na het wegfaden van de chips; kaart 'half jaar later' past; label Dr. Kim en piek-label vrij; Daan-label 'uitgeput'; 'hart sneller' ook bij bedreiging; wieltje met spaken; staafjes eerder.
