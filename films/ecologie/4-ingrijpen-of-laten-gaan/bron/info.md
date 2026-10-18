# Ingrijpen of laten gaan? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/ecologie/4-ingrijpen-of-laten-gaan.html (audio in films/ecologie/4-ingrijpen-of-laten-gaan/audio/) |
| Reeks | Ecologie (hoofdstuk `ecologie`; mens en milieu: havo Biologie voor jou thema 7 Ecologie en milieu, vwo Nectar 4.1 H8/H9), film 4 |
| Niveau | havo + vwo; vwo-blok s22 (twee omslagpunten, hysterese, Wolderwijd 1991) |
| Versie / datum | 1.0 · 18 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow cQgwtIoKfrnDD13R4F85; respellings Hoeksche → Hoekse, hysterese → histereeze (zie `uitspraak.md`, `uitspraak_film.json`) |
| Duur | spraak 8:20 (vwo) / 7:45 (havo); speeltijd met kaarten en vragen ± 9 min |
| Beeldstijl | Part C: Schema |
| Personages | Opa Henk en Noor (castboek) |
| Audio-opslag | 19 losse mp3's in audio/ (s01, s04–s10, s12–s19, s21–s23) |
| Herkomst | Hoofdengine, werkmap `hw/ec4`; gebouwd met Claude op verzoek van Kamiel (Ecologie film 4, plaagbestrijding en natuurbeheer) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Opa Henk en Noor in de moestuin, tuinbonen met zwarte luizen (zoomcirkel), doosje lieveheersbeestjes; biologische bestrijding; kas 'Nederland · vanaf 1996' met Aziatisch lieveheersbeestje, staafjes luizen per dag. q02 (antwoord in H1) |
| H1 Een gedekte tafel | s04–s07 | Ontsnapping uit de kas, 2002 Nijmegen, raster 'nu vaak het gewoonst'; akker van boven (monocultuur) met groeiende luizen, vijanden zonder nectar/schuilplek, groeicurve; spuitkop; resistentie in drie panelen (goud = erfelijk resistent), 'wennen' doorgestreept; coloradokever; vijanden sterven mee, grafiek luizen vs vijanden na spuiten; ophoping als keten (verwijzing film 3) |
| H2 Een vijand inzetten | s08–s14 | Kas met sluipwespen en witte vlieg; blad met larve: ei, wesplarve, larve wordt zwart; ± 100% tomaat/paprika/komkommer; Aziatisch lieveheersbeestje: eet ook eitjes en larven, overleeft buiten, exoot-definitie, Azië → Europa; tweestippelig neemt af, doosje van opa Henk; rietpad 1935 (q11); kevers buiten bereik, Australië met verspreiding, giftig voor varaan/buidelmarter/slang, drie redenen; geïntegreerde bestrijding in drie stappen met schadegrens; bloemrand, Hoeksche Waard, strokenteelt |
| H3 Natuur beheren | s15–s19, q20, s21, s22 (vwo) | Heide groeit dicht, schapen en rund, te veel grazers; maaien en afvoeren, bloemen van arme grond; twee gebieden gescheiden door een weg, ecoduct; vogelkers die weer uitloopt; twee voedselwebben (stabiel), herstelcurven (veerkracht); Veluwemeer van helder naar troebel met grafiek fosfaat/helderheid; twee terugkoppelingslussen; fosfaatmeter (hier ging het mis / pas hier weer helder); tijdlijn 1970 – maatregelen – 1995; vwo: gevouwen curve met twee omslagpunten, Wolderwijd-stip |
| Recap | s23 | Vier panelen: plaag en spuiten, vijand van ver weg, natuur beheren, omslagpunt |
| Eindkaart | s24 | drie regels |

## Vragen
- q02: Aziatisch lieveheersbeestje na 1996? a bleef in de kassen · b verdween weer · **c werd een van de gewoonste lieveheersbeestjes buiten**
- q11: rietpadden in Australië? **a aten weinig kevers en werden zelf een plaag** · b roeiden de kevers uit · c stierven door het droge klimaat
- q20: fosfaat terug tot vlak voor de omslag? a meteen weer helder · **b blijft troebel** · c helder zonder waterplanten

## Begrippen
plaag, monocultuur, biodiversiteit, bestrijdingsmiddel, resistentie, natuurlijke vijand, biologische bestrijding, sluipwesp, exoot, inheemse soort, geïntegreerde bestrijding, strokenteelt, begrazing, maaien en afvoeren, ecoduct, stabiliteit, veerkracht, omslagpunt, positieve terugkoppeling, hysterese (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 6 checkvragen (resistentie en monocultuur, opleving na spuiten, exoot en specialist, heide en grasland, Veluwemeer, vwo: twee omslagpunten), hoe de film het uitlegt, achtergrond met bronnen (Brown e.a. 2008 BioControl; Entomologische Berichten 2017; Roy e.a. 2012; Alyokhin e.a. 2008; CBS 2022; Cane toads in Australia; Vroege Vogels Hoeksche Waard; RIZA 1999 Stabiliteit van de Veluwerandmeren; Scheffer e.a.), leerdoelen, lessuggesties.

## Waar wat in de HTML zit (films/ecologie/4-ingrijpen-of-laten-gaan.html)
- regel 70: sitebalk (← Terug naar Ecologie, naar index.html#ecologie)
- regel 101: checkvragen en docentdeel (uit `sections.html`)
- regel 161: `window.FILMDATA`
- regel 1274: `persoon()` uit lib_cast.js (Opa Henk, Noor)
- regel 1470 e.v.: eigen tekeningen: `luis()` 1470, `lieveheer()` 1475 (soort 'twee' of 'azie'), `sluipwesp()` 1488, `tuinboon()` 1517, `rietpad()` 1534, `kas()` 1566, `assen()` 1575, `australie()` 1580, `meer()` 1584 (troebel 0–1), `web()` 1602
- regel 1608: `const SCENES` (title, s01 1612, s04 1634, s05 1643, s06 1657, s07 1674, s08 1687, s09 1698, s10 1711, s12 1717, s13 1727, s14 1735, s15 1746, s16 1762, s17 1777, s18 1791, s19 1799, s21 1809, s22 1819, s23 1833)
- regel 1847 e.v.: speler (snelheid, Vragen aan/uit)

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/ec4` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/4-ingrijpen-of-laten-gaan/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py ec4 script_v2.md` → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take) → Scribe (connect_from = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py ec4` → `engine/build.py ec4` → `bash pack.sh ec4 4-ingrijpen-of-laten-gaan ecologie`.
- beeld: alleen `scenes.js` → `engine/build.py ec4` → pack. Let op deelwoord-cues: 'Een' (s01) vond eerst 'een moestuin' → `('lieveheersbeestje', 2)`; 'meer' (s01) n = 2; 'Eerst' (s04) vond 'eerste' → 'vraag'; in s22 'helder' n = 3 en 'troebel' n = 4 voor het Wolderwijd.

## Aandachtspunten
- Uitspraakwachtlijst: Hoeksche Waard (Hoekse), hysterese (histereeze), Hawaï, Aziatisch, exoot, coloradokever, rietpadden, varanen, buidelmarters, brasems, kranswieren, Wolderwijd, Eén aarde.
- Niet herhaald uit andere films: successie en de Amerikaanse vogelkers (Alles gaat rond), pcb-accumulatie (Plek genoeg); ophoping alleen als verwijzing naar film 3 Eén aarde. Eutrofiëring zelf wordt niet uitgelegd.
- Getallen zijn afgerond ('ongeveer'); de grafieken zijn schematisch, de echte getallen staan in het docentdeel.
- `data-duur` op de tellerscript ontbreekt tot de film in `HOOFDSTUKKEN.ecologie.films` staat; daarna `python3 scripts/teller.py` draaien.

## Wijzigingen
- 1.0 (18 okt 2026): eerste versie. Script na eigen review (zie `reviews/review_v1.md`); beeld na drie rondes contactsheets.
