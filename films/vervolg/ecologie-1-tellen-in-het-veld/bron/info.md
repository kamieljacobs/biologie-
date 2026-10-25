# Tellen in het veld — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/ecologie-1-tellen-in-het-veld.html` (audio in `ecologie-1-tellen-in-het-veld/audio/`) |
| Reeks | Wat word jij? · Ecologie en natuurbeheer |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | v10 |
| Voldoet aan | prompt v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.382 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:55 (355 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas), Micro waar een molecuul of cel het mechanisme draagt |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026, op verzoek van Kamiel: 3 scriptvarianten (A klassiek, B kleine, C grote mutatie) → blinde beoordelaar (`werk/blind/`) → script v1 → frisse feitenreview (`reviews/review_v1.md`, `bronnen.md`) → v2 → storyboard, twijfelscènes gekeurd door Kamiel (25 okt 2026) → inspreken → frisse beeldreview (`reviews/review_beeld.md`) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | vroege ochtend aan de rand van het reeksgebied; Daan met een rugzak, Bas met verrekijker; in het zand een pootafdruk; een wildcamera aan een boom; op de kaart van het gebied een vraagteken boven het bos |
| Hoofdstuk 1 — Vangen, merken, terugvangen | s04, s05, s06, q07, s08 | heide met paarse bloei; Daan met een vlindernetje; een heideblauwtje in de hand van Bas, stift, een klein nummer op de onderkant van de vleugel; teller '40 gemerkt'; twee dagen later een tweede vangst van 30 met 6 gemerkt (goud omrand); de verhouding 6 van 30 = 1/5 als staafje; de som op het scherm: aantal ≈ 40 × 30 ÷ 6 = 200 |
| Hoofdstuk 2 — Elke week dezelfde route | s09, s10, s11, q12, s13 | een vrijwilliger met een klembord loopt een vaste route langs de bosrand; de route verdeeld in stukken van vijftig meter; om haar heen een doorzichtige doos: vijf meter breed, vijf meter vooruit; een zonnetje en een klok; turfjes per stuk; kaartje 'Netwerk Ecologische Monitoring · CBS'; daarna een proefvlak van tien bij tien meter met eitjes op een plant ('voorbeeld'); tot slot de lijn van de vlinderindex van het CBS met '1992 = 100' en een band eromheen |
| Hoofdstuk 3 — Sporen in plaats van dieren | s14, s15, q16, s17, s18 | Schema → Micro: wildcamera-beeld 's nachts met twee wolven, label 'hoeveel tegelijk · welpen'; dan Daan met handschoenen en een buisje bij een keutel op het zandpad (nette tekening, geel nummerbordje ernaast); zoomcirkel in paars: cellen uit de darmwand met DNA, een rij herhalingen op een paar plekken (zoals in DNA lezen); terug: acht buisjes, zeven profielen als streepjescodes en één grijs buisje 'geen profiel', drie verschillende patronen (A, B, C) in drie tinten paars; daarna een jonge wolf die met een stippellijn door het land zwerft en één keutel achterlaat; Daan met een fles water bij het ven, kaartje 'wel of niet hier'; tot slot een kaartje van een Roemeens berggebied met '≈ 70 (49–89)' |
| Hoofdstuk 4 — Van telling naar trend | s19, q20, s21, s22 | avond in de keet; Daan en Bas achter de laptop; een staafje '2024: 101' en '2025: 131' met het label 'met DNA aangetoond · BIJ12'; daarna de kaart van Nederland met veertien roedelstippen, zeven op de Veluwe ('naar schatting'); dan de vlinderindex: de laagste stand in 2024 en de lijn over ruim dertig jaar met een band eromheen, label 'marge' |
| Recap | s23, s24 | zonsondergang boven de heide; Daan schrijft in zijn notitieboek; drie kaartjes: vlinder met nummer, route met doos, keutel met streepjescode; daarna opleidingskaartjes en werkplekken (terreinbeheerder, provincie, onderzoeksinstituut) |

## Vragen
q02 → c; q07 → b; q12 → a; q16 → c; q20 → b (zie film.py).

## Begrippen
populatie, vangen, merken en terugvangen, transect, proefvlak, index, monitoring, DNA-profiel, omgevings-DNA (eDNA), trend.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 162 | `window.FILMDATA` |
| 2037 | `const SCENES = {}` |
| 5454 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/ec1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> ecologie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- zie brief.md en reviews/review_beeld.md
