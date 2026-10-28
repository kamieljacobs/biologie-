# Zintuigen — opwaardering naar prompt v13 (28 okt 2026, zonder keuring)

Versie 1.0 → 1.1. Stem, script, vragen, timing en speler zijn gelijk gebleven. Oude versie: `bron/oud/8-zintuigen-v1.0.html` (en `oud/scenes-v1.0.js`).

## (a) Herinspreeklijst (wacht op Kamiels akkoord)

Reden: de naam van een castpersonage wordt niet meer uitgesproken (prompt v13, B4). Roos, eleven_v4, één take per alinea, daarna Scribe en `align.py` (`info.md` → 'Hoe je de film aanpast').

| Alinea | Nu | Voorstel | Credits (schatting) |
|---|---|---|---|
| s01 (21 s) | 'Noor traint op een fel verlicht kunstgrasveld. Na de training loopt ze …' | 'Een sporter traint op een fel verlicht kunstgrasveld. Na de training loopt ze …' (rest gelijk) | ± 450 |
| s12 (39 s) | 'Terug naar Noor. Antwoord bee. … Na een minuut of tien ziet Noor weer iets …' | 'Terug naar het fietspad. Antwoord bee. … Na een minuut of tien zie je weer iets …' | ± 750 |
| s20 (41 s) | 'Waarom zag Noor op het donkere pad eerst niets …' | 'Waarom zag de sporter op het donkere pad eerst niets …' | ± 800 |

Totaal ± 2.000 credits (TTS + Scribe). Gratis deel-alternatief voor s12: 'Terug naar Noor.' wegknippen op de woordtijden (de naam later in de alinea blijft dan staan). Na het inspreken in `src/scenes.js` de cues nalopen die op een naam of op een verschoven woord hangen (s01 'fietspad', 'tijdje'; s12 'Antwoord', 'tien'; s20 'antwoord'). Zelfde soort herinspreken als de andere films van deze batch, geen nieuwe soort.

## (b) Vragen aan Kamiel (niet gedaan)

1. **Oudziend 'vanaf je veertigste'** (s10): het National Eye Institute zegt 'meestal na 45 jaar'. Meenemen bij een volgende opname ('rond je vijfenveertigste')? Zie `bronnen.md`, bewering 8.
2. **Oog en oor uit de bibliotheek?** Oog (doorsnede), oor (uitwendig, midden, binnen) en evenwichtsorgaan zijn eigen tekeningen van deze film; de bibliotheek heeft ze niet. Wil je dat ik ze als nieuwe bibliotheekobjecten laat maken (testvel + keuring), zodat andere films ze ook gebruiken?
3. **Evenwichtsorgaan** blijft vereenvoudigd (drie losse bogen, één blaasje met 'er zijn er twee'). Een echtere tekening (kanalen die op elkaar staan, ampullen) is een nieuwe tekening: na keuring?
4. **Sporter in de schermtekst**: titelkaart en vraagkaart zeggen nu 'een sporter' en 'je'. Goed zo?

## (c) Wat ik veranderde

- **Namen uit beeld**: puzzelvraag op de titelkaart, vraagkaart q02 en hoofdstukvraag Recap.
- **Castpersonages**: de sporter is Noor uit het castboek (lopend in zijaanzicht in s01, rode jas die in het donker grijs wordt); de oudziende persoon in s10 is Linda (44) met de leesbril van het castboek; het zelfgetekende hoofd in s18 is nu Noor van opzij (borstbeeld).
- **Geen korrel en geen gloed**: Micro-achtergronden zonder korrel (s11, s12, s13, s17); lichtvlek op het netvlies vlak (s04, s07, s08, s10); lichtbundels van de masten vlak.
- **Eiwit als kralenketen**: rodopsine (s13, vwo) als gevouwen kralenketen in een roze tint in plaats van een paarse vlek.
- **Labels**: s18 'stop je …' en 'duizelig' boven het hoofd, zodat ze niet over het personage vallen.
- **Techniek**: actuele `personages/lib_cast.js` en het lib_bio-uittreksel (`_kkKluwen`) in het blok `/*BIBLIOTHEEK-UITTREKSEL*/`, ingebouwd met `bouw/inbouw.py` zonder de film opnieuw te bouwen; volledige kopie van `bibliotheek/lib_bio.js` in `src/lib_bio.js`.

Getest: stills van alle gewijzigde scènes (s01 drie momenten van het lopen, s04, s07, s10 twee momenten, s11, s12, s13 twee, s17, s18 vier, s20, titel) bekeken; geen paginafouten; Vragen uit: geen vraagitems, randen rond q02, q06, q09 en q16 bekeken; `spelerfix.py --check`, `antwoordtekst.py --check`, `kortantwoord.py --check`, `antwoordletter.py --check` in orde; `flipkaarten.py`, `licentie_noot.py`, `teller.py` gedraaid.
