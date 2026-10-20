# Eén aarde — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/ecologie/3-een-aarde.html (audio in films/ecologie/3-een-aarde/audio/) |
| Reeks | Ecologie (hoofdstuk `ecologie`), film 3 — mens en milieu: havo Biologie voor jou thema 7 Ecologie en milieu (slot), vwo Nectar 4.1 H9 Systeem aarde en de mens. Sluit aan op *Plek genoeg?* en *Alles gaat rond* |
| Niveau | havo + vwo; één vwo-blok: s07 (methaanvorming in de pens). Verder zien havo en vwo dezelfde film |
| Versie / datum | 1.0 · 18 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow 3ZltUu2iBX1XFf38j3pC; respellings in `uitspraak_film.json` (CO₂ → cee-oo-twee, pcb's → pee-cee-bees, PFAS → pee-fas, decimalen uitgeschreven, Thorizon → Toraizon, ITER → Iter, Qatar → Katar, gesmolten-zoutreactor); ADI en 'neguntig' via de globale lijst. Zie `uitspraak.md` (wachtlijst) |
| Duur | spraak 10:54 (vwo) / 10:26 (havo); speeltijd met kaarten en vragen ± 12 min (vwo) / ± 11,5 min (havo) / ± 10,5 min (havo, vragen uit) |
| Beeldstijl | Part C: Schema; eigen tekeningen (aarde, moleculen CO₂/CH₄/H₂O, koe, kerncentrale, zeewaterkas, orka, enz.) bovenin `src/scenes.js` |
| Personages | Daan (castboek, rode draad: voetafdruktest en ADI-som), Noor (s11, 'ons' bij PFAS) |
| Audio-opslag | 21 losse mp3's in audio/ (s01, s04–s12, s14, s15, s17–s25) |
| Verbruik | 21 TTS-generaties, samen 9.815 credits; 21 Scribe-transcripties (0 credits); geen herhalingen |
| Herkomst | Hoofdengine, werkmap `hw/ec3`; gebouwd met Claude op verzoek van Kamiel (18 okt 2026), met het toekomsthoofdstuk (4) op zijn aanvullende verzoek |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Daan doet een online voetafdruktest op zijn laptop; vraag: hoeveel aardes als iedereen leefde als een gemiddelde Nederlander? |
| H1 Hoeveel aardes? | s04, s05, s06, s07 (vwo), s08 | Aardebollen (NL bijna 3, wereld bijna 2); wat de voetafdruk meet; balk ruim helft CO₂ / kwart voedsel. Broeikaseffect (zonlicht, warmtestraling, broeikasgassen in de lucht, −18 °C, ozonlaag doorgestreept). Bronnen CO₂ en methaan; 280 → 420 ppm; +1 °C wereld, +2 °C NL. Vwo: pens met micro-organismen, H₂ + CO₂ → methaan, uitgeboerd, voeradditief. Leefgebieden schuiven (noord, bergop, bijeneter); rupsenpiek en koolmezen uit de pas |
| H2 Te veel, en het blijft | s09, s10, s11, s12, q13, s14 | Akker → beek: algenbloei, dode algen, bacteriën, O₂-meter, dode vissen; kader over levende algen. Stikstofdepositie op heide, zonnedauw verdrongen; 70 %-raster. Vetweefsel met gifstippen; plankton → vis → zeehond → orka; orka's bij Schotland; PFAS via voedsel en drinkwater. ADI-definitie en som met Daan en appels |
| H3 Wat helpt echt? | s15, q16, s17, s18, s19 | Drie keuzekaarten; gras → koe → vlees met ± 10 %; balken per kilo en per jaar. Energie, zon/wind, vliegen, voedselverspilling; jij/overheden/bedrijven; definitie duurzaam. Daan doet de test opnieuw |
| H4 Wat kan de techniek? | s20, s21, s22, s23, s24 | Kerncentrale en IPCC-balken; Borssele en plan 4 nieuwe; Flamanville (17 jaar, 4× zo duur); afvalvat. Vier panelen nieuwe reactoren met stempel 'nog experimenteel'. Kernfusie: kernen smelten samen, NIF-balken, ITER-tijdlijn. Zeewaterkas (Sahara Forest Project), Grote Groene Muur (4 %), bomen uit stronken (Niger). CO₂-afvangmachine vs wereldwijde uitstoot; wat al werkt |
| Recap | s25 | Zes panelen |
| Eindkaart | s26 | vier regels |

## Vragen
- q02 (cold open): hoeveel aardes? a ongeveer één · b ongeveer anderhalf · **c bijna drie**
- q13 (H2): ADI 0,02 mg/kg, Daan 50 kg, appel 0,1 mg: a 1 appel · **b 10 appels** · c 100 appels
- q16 (H3): welke keuze scheelt het meest? **a de helft minder vlees en zuivel** · b nooit meer een plastic tasje · c laders altijd uit het stopcontact

## Begrippen
ecologische voetafdruk, broeikaseffect, klimaatverandering, eutrofiëring (vermesting), stikstofdepositie, persistent, accumulatie, ADI, duurzaam, kernsplijting · kernfusie, methaanvormende micro-organismen (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 6 checkvragen (broeikaseffect, eutrofiëring, accumulatie, ADI, duurzaam en innovatie, vwo: methaan uit de pens), hoe de film het uitlegt, achtergrond met alle getallen en bronnen (Global Footprint Network, IPCC AR5/AR6, KNMI, RIVM, CBS, Desforges 2018, HWDT, Poore & Nemecek 2018, Voedingscentrum, Rijksoverheid, POWER Magazine, World Nuclear News, NRG PALLAS, NL Times, Europese Commissie/MYRRHA, Uppsala Universiteit, LLNL/NIF, UK Government/JET, Physics World/ITER, EUROfusion-roadmap, Nature Middle East, HortiDaily, UNCCD, World Vision, Climeworks/Heimildin, Global Carbon Project), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/ecologie/3-een-aarde.html)
- regel 70: sitebalk (← Terug naar Ecologie)
- regel 101: checkvragen en docentdeel (uit `sections.html`)
- regel 164: footer met licentie; regel 165: `window.FILMDATA`
- regel 1278: `persoon()` uit lib_cast.js (Daan, Noor)
- regel 1475: `aarde()` / 1480 `aardes()`; 1481 `molCO2()` (ook `molCH4`, `molH2O`); 1486 `koe()`; 1496 `laptop()`; 1499 `kerncentrale()`; 1500 `vat()`; 1501 `kas()`; 1510 `tokamak()`
- regel 1515: `const SCENES` (title 1516, s01 1519, s04 1530, s05 1543, s06 1553, s07 1566, s08 1574, s09 1586, s10 1600, s11 1614, s12 1625, s14 1634, s15 1642, s17 1646, s18 1653, s19 1663, s20 1669, s21 1679, s22 1687, s23 1696, s24 1707, s25 1714)
- regel 1727 e.v.: speler (snelheid, Vragen aan/uit, havo/vwo-knop)
- regel 1908: flipkaarten

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/ec3` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/3-een-aarde/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py ec3 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take; stem-invoer = `voice` in `segments.json`) → Scribe (connect_from = de TTS-node) → `python3 fetch_flow.py ec3 3-een-aarde <status-bestanden>` → `engine/align.py ec3 stem/status_timing.json` → `python3 film.py` → `engine/build_data.py ec3` → `engine/build.py ec3` → `bash pack.sh ec3 3-een-aarde ecologie` → in de repo `scripts/licentie_noot.py`, `scripts/teller.py`, `scripts/flipkaarten.py`.
- beeld: alleen `scenes.js` → `engine/build.py ec3` → pack. Cues op woorden: `q.on('woord', n)`; let op deelwoorden ('methaan' vindt eerst 'Methaanvormende', 'duur' vindt 'levensduur', 'honderd' vindt 'honderdduizenden'). Controle: `python3 cuecheck.py ec3`.
- getallen in H4 verouderen snel (SMR's, Thorizon, ITER, kerncentrales in Nederland): controleer bij een nieuwe versie de bronnen in het docentdeel.

## Aandachtspunten
- Uitspraakwachtlijst (`uitspraak.md`): CO₂, pcb's, PFAS, decimalen, Sahara Forest Project; thorium, Thorizon, ITER (Iter), Qatar en Niger (Nieger) zijn goedgekeurd.
- Herhaalt geen hoofdthema van *Plek genoeg?* (eutrofiëring in de beek, zonnedauw, pcb's bij zeehonden) en *Alles gaat rond* (koolstofkringloop): korte verwijzing, nieuwe voorbeelden (orka's, PFAS, stikstofdepositie in cijfers).
- De ADI-som gebruikt gekozen getallen ('Stel'); echte residuen zijn meestal veel lager (staat in de film).
- Voetafdruk 'bijna drie aardes' volgt de Dutch Overshoot Day 2025 (5 mei); de landenfactsheet met data 2022 zegt ± 4. Uitleg in het docentdeel.
- Lengte ± 11–12 min door hoofdstuk 4; Kamiel vroeg ± 9–10 min. Inkorten kan in s21 of s23.
- Toon: geen 'moeten'; s18 zegt expliciet dat niet alles bij de leerling ligt.
- `data-duur` op de tellerscript-tag verschijnt pas als de film in `HOOFDSTUKKEN` staat en `scripts/teller.py` opnieuw draait.

## Wijzigingen
- 1.0 (18 okt 2026): eerste versie. Script na eigen review (zie `reviews/review_v1.md`), hoofdstuk 4 (innovatie) toegevoegd op verzoek van Kamiel, beeld-QA verwerkt; checkpoint in `checkpoint.html`.

## Wijziging 20 okt 2026

Uitspraak na de uitspraaktest van 18/19 okt: stem-invoer toorium → thorium, Ieter → Iter, Niezjèr → Nieger (centrale lijst); de regels voor thorium en Niger zijn uit `uitspraak_film.json` gehaald, ITER → Iter staat er nu in. Alinea's s21, s22 en s23 opnieuw ingesproken (Roos, eleven_v4, 1 take per alinea, flow 3ZltUu2iBX1XFf38j3pC; 2.049 credits TTS + Scribe voor de woordtijden). Alleen de mp3's in `audio/` en de woordtijden van die alinea's in `window.FILMDATA` zijn vervangen; beeld, speler en de rest van de film ongewijzigd. Spraak 10:54 → 10:53.
