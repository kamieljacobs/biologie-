# Miljoenen varianten — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/bioinformatica-2-miljoenen-varianten.html` (audio in `bioinformatica-2-miljoenen-varianten/audio/`) |
| Reeks | Wat word jij? · Bio-informatica (film 2 van 4) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 25 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.273 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:52 (352 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema met cast; reeksobject scherm met code / sequenties |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; 3 scriptvarianten + blinde beoordelaar (werk/) → v1 → frisse bronnenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel (nieuwe ouders Anouk en Milan, zittende pose) → frisse beeldreview (reviews/review_beeld.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01 | spreekkamer met een tafel; een dichte dossiermap en een kindertekening (huis, zon); ernaast een stamboomschema: vierkant (vader), rondje (moeder), daaronder een ingekleurd rondje (meisje, 4 jaar); daarboven een scherm met een lijst die snel naar beneden rolt |
| Hoofdstuk 1 — Van sequencer naar variantenlijst | s03, s04, q05, s06 | Sam en Dr. Kim achter een scherm; drie buisjes bloed met labels kind, vader, moeder; een machine waaruit korte stukjes DNA stromen; die schuiven op hun plek langs een lange streep 'referentiegenoom'; editorvenster met vier regels: chromosoom, plek, letter in de referentie, letter bij het kind; teller |
| Hoofdstuk 2 — Filteren | s07, s08, s09, q10, s11, s12 | trechter naast het scherm, met per filter een getal dat zakt: ruim 4 miljoen → zo'n 10 000 → een paar honderd → een handvol; codon met een ander aminozuur en een stopcodon (uit Mutaties); databank als kast met telpoppetjes; stamboomschema met een gekleurd streepje bij het meisje en niet bij de ouders |
| Hoofdstuk 3 — Een variant met onbekende betekenis | s13, s14, q15, s16, s17 | schaal met vijf vakjes van groen 'onschuldig' tot koraal 'ziekmakend'; het streepje landt in het middelste, grijze vak; Sam en Kim bij het scherm; dan de spreekkamer, rustig, later: Dr. Kim tegenover de twee ouders, de dossiermap tussen hen, de hand van de moeder op die van de vader; daarna een wereldkaart met drie stipjes 'zelfde gen'; een kalender 'over een paar jaar' |
| Hoofdstuk 4 — Veelvoorkomende ziekten: GWAS en risicoscores | s18, s19, q20, s21, s22, q23, s24 | Sam en Kim op de gang; twee groepen telpoppetjes, met en zonder hartziekte; één plek in het DNA met een letter die in de ene groep iets vaker voorkomt; grafiek met stipjes langs de chromosomen en een grenslijn; een plek naast een gen met een pijltje 'buurman'; een balk van veel kleine blokjes; wereldkaart met de herkomst van de deelnemers |
| Recap | s25, s26 | de trechter met het ene streepje onderaan; het grijze vak met een kalender; ernaast de balk van kleine blokjes; daarna opleidingskaartjes en drie werkplekken |

## Vragen
q05 → b; q10 → c; q15 → b; q20 → c; q23 → a (zie film.py).

## Begrippen
variant, referentiegenoom, algoritme, databank, de novo, variant met onbekende betekenis, GWAS (genoombrede associatiestudie), polygene risicoscore.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 162 | `window.FILMDATA` |
| 2032 | `const SCENES = {}` |
| 4726 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bi2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> bioinformatica`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Kind nooit in beeld (dossier, tekening, stamboom)
- Ouders Anouk en Milan alleen in H3 aan tafel met Dr. Kim; Sam niet bij het gesprek
- GWAS-grafiek schematisch, geen echte data
- Luisteren: s18 genoombrede, s17 volgde
