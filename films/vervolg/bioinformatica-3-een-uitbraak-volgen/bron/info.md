# Stambomen uit DNA — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/bioinformatica-3-een-uitbraak-volgen.html` (audio in `bioinformatica-3-een-uitbraak-volgen/audio/`) |
| Reeks | Wat word jij? · Bio-informatica (film 3 van 4) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 25 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.571 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:15 (375 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast + Micro (coronavirus); reeksobject scherm met code / sequenties |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; 3 scriptvarianten + blinde beoordelaar (werk/) → v1 → frisse bronnenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel → frisse beeldreview (reviews/review_beeld.md); s30 opnieuw ingesproken (bron precies volgen) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01 | drie ziekenhuisiconen naast elkaar zonder namen, label 'drie ziekenhuizen in Brabant', kaartje 'maart 2020'; eronder één raster van telpoppetjes in zorgblauw, niet per ziekenhuis verdeeld; één voor één kleuren er poppetjes koraal; teller loopt op tot 96 |
| Hoofdstuk 1 — Van monster naar sequentie | s03, s04, s05, s06, s07, q08, s09 | Sam en Dr. Kim aan een bureau met twee schermen; wattenstaafje in een buisje; Micro: een virusdeeltje met een sliertige RNA-streng; RNA wordt DNA; stukjes die in veelvoud worden gekopieerd |
| Hoofdstuk 2 — Zelf een stamboom bouwen | s10, s11, s12, s13, q14, s15, s16 | kaartje 'bedacht voorbeeld' linksboven, zichtbaar zolang A–E in beeld zijn (ook in H3 en H4); plattegrond zonder stadsnamen met echte mensjes (cast en figuranten): ziekenhuis 1 met verpleegkundigen A (Jesse) en C op één afdeling en patiënt E zittend in gewone kleding, ziekenhuis 2 met zorgmedewerker B, D (Joost) buiten de ziekenhuizen; monsters als hoofdletter in een gekleurd rondje boven het hoofd; ernaast een tabel met verschillen die zich vult |
| Hoofdstuk 3 — Hoe zeker is die boom? | s17, s18, s19, s20, s21, q22, s23 | Sam kijkt naar de boom van H2; rechts de regels van C en E met twee gouden letters; een letter die even flikkert en de boom die meewiebelt |
| Hoofdstuk 4 — Wie besmette wie, en waar houdt dat op? | s24, s25, q26, s27, s28, s29, s30, s31, q32, s33 | kaartje 'bedacht voorbeeld'; plattegrond zonder stadsnamen; A in ziekenhuis 1 en B in ziekenhuis 2 krijgen dezelfde kleur; bij A 'positief: dag 1', bij B 'positief: dag 3'; een vraagteken tussen hen |
| Recap | s34, s35 | de echte casus met de drie groepen; ernaast de bedachte boom met de getallen bij de takken en het kaartje 'bedacht voorbeeld'; lijst met gesprekken; dan twee opleidingskaartjes, drie werkplekken en een kaartje 'RIVM · elke week' |

## Vragen
q08 → b; q14 → a; q22 → c; q26 → a; q32 → b (zie film.py).

## Begrippen
sequentie, referentiegenoom, uitlijnen, mutatie, algoritme, stamboom (fylogenetische boom), herbemonsteren (bootstrap), verwantschap en richting.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 164 | `window.FILMDATA` |
| 2034 | `const SCENES = {}` |
| 4713 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bi3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> bioinformatica`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Echte casus (Sikkema e.a. 2020) zonder stads- of ziekenhuisnamen; bedacht voorbeeld met vast label
- Geen schuld: drie gelijkwaardige mogelijkheden in s28
- Steungetallen = eigen berekening (werk/bootstrap_sim.py)
- Luisteren: s10 bé, s15 C-E, s19 bootstrappen
