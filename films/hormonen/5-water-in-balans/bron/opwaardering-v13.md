# Opwaardering naar prompt v13 — Water in balans (Hormonen 5), 28 okt 2026

Zonder keuring (regeling `films/OPWAARDEREN-REGELING.md`). Versie 1.0 → 1.1. Oude versie: `bron/oud/5-water-in-balans-v1.0.html`.

## (a) Herinspreeklijst

Niets nodig. Geen uitgesproken namen van castpersonages, geen feitelijke fout (zie `bronnen.md`). De gesproken vwo-aankondiging in s15 is geknipt in de bestaande take (0 credits).

| Alinea | Reden | Credits |
|---|---|---|
| — | — | 0 |

## (b) Vragen aan Kamiel (nieuwe aanpak of inhoud; niet zelf gedaan)

1. **Seriekleuren hormonen** (zelfde vraag als bij Stress): zenuwen paars, water/glucose/cortisol teal; Part C zegt 'zenuwsignalen teal' en 'minder paars'. Voor de hele reeks omzetten of laten?
2. **Nefron in Schema-buizen.** Het uitgerolde nefron, de verzamelbuis en de lis van Henle zijn rechte buizen met rechte wanden (s05–s10, s15). C4 staat een schematische buis toe, maar een getekend nefron (kapsel als kommetje, kronkelend buisje, haarvaten eromheen) met echte wandcellen zou rijker zijn. Dat is een nieuwe tekening per scène: wil je dat?
3. **Docentdeel kangoeroerat.** De film zegt 'extra lange lis van Henle'. Volgens de Open University (B7 in `bronnen.md`) is er geen duidelijk verband tussen de werkelijke lislengte en de urineconcentratie; een relatief dik niermerg verklaart het beter. Voorstel: één zin in het docentdeel (de film zelf klopt als schoolmodel).
4. **Bloed in de glomerulus is erg klein** (s05): rode bloedcellen en het eiwit zijn op een telefoon nauwelijks te zien. Een zoomcirkel op de glomerulus bij 'Bloedcellen en grote eiwitten passen er niet door' zou helpen (nieuwe opzet, dus eerst vragen).
5. **Twee beweringen nog zonder geopende bron** (`bronnen.md` nr. 5 en 9): 'in de nierader zit het minste ureum' en 'het afvoerende vaatje is nauwer'. Standaardleerstof; bij de volgende ronde een bron openen.

Voor de bibliotheek (niet zelf in `bibliotheek/` gezet): `eiwitKlein` (een klein eiwit als kralenketen in een kluwen, voor plasma-eiwitten die te groot zijn voor het filter) en `celVB` (kubische epitheelcel als superellips met dubbel membraan) staan in `src/scenes.js` en zijn bruikbaar voor andere films.

## (c) Wat veranderde

- s15: 'Voor vwo gaan we hier nog een stap verder.' uit de take geknipt (woordtijden −2,94 s).
- s01: Noor (castboek) in plaats van een zelfgetekende jongen; fles op ware grootte op haar schoot; urinebeker in een eigen paneel.
- s04: realistisch lichaam (`lib_anatomie.js`) met nieren, urineleiders, blaas en lever op hun plek; nier uit de beeldbank (`nierBijnier`) met namen ernaast; takentags overlappen de nier niet meer. Titel: dezelfde nier.
- s05: rode bloedcellen als ingedeukte schijfjes, groot eiwit als kralenketen.
- s15: cel van de verzamelbuis met kern en gebogen zijden; blaasjes versmelten echt met het membraan.
- Geen korrel buiten cellen; doelwitcellen zonder gloed.
- Getest: contactvel van de gewijzigde scènes bekeken; alle vragen met `?vragen=uit` afgespeeld (vwo en havo); spelerfix, antwoordtekst, kortantwoord, antwoordletter `--check` in orde; geen JS-fouten.
