# Stikstof — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/ecologie-2-stikstof.html` (audio in `ecologie-2-stikstof/audio/`) |
| Reeks | Wat word jij? · Ecologie en natuurbeheer (film 2; ook bij Milieukunde, id `stikstof`) |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | v10 |
| Voldoet aan | prompt v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.086 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:40 (400 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas), Micro waar een molecuul of cel het mechanisme draagt |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026, op verzoek van Kamiel: 3 scriptvarianten (A klassiek, B kleine, C grote mutatie) → blinde beoordelaar (`werk/blind/`) → script v1 → frisse feitenreview (`reviews/review_v1.md`, `bronnen.md`) → v2 → storyboard, twijfelscènes gekeurd door Kamiel (25 okt 2026) → inspreken → frisse beeldreview (`reviews/review_beeld.md`) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | heide in paars en groen met een ven; aan de rand een stal en een snelweg met ecoduct; Daan en Bas bij een paaltje met een wit kapje; hier en daar pollen gras tussen de heide |
| Hoofdstuk 1 — Van stal tot heide | s04, s05, s06, s07, q08, s09 | Schema → Micro → Schema: dwarsdoorsnede van stal tot heide; oker wolkje ammoniak uit de mestkelder, grijs wolkje stikstofoxiden van de snelweg; regenwolk (nat) en wolkjes die op de heide landen (droog); zoomcirkel: ammoniak (NH₃) valt in een waterdruppel op een blad en wordt ammonium (NH₄⁺); stikstofoxiden die eerst omgezet worden en verder doorvliegen; kaart met een stippellijn tot vijfhonderd meter en pijlen naar verre heides en de grens |
| Hoofdstuk 2 — Meten en rekenen | s10, q11, s12, s13, s14, s15 | paaltje met wit kapje en drie buisjes, een hand wisselt ze, datum op een etiket; kaartje van Nederland met honderden stipjes; één meetstation met een kast vol apparatuur; schema 'uitstoot + weer + wind → rekenmodel → depositie', met de buisjes als controle; zeshoekjes over de heide, één zeshoekje goud met '± 1400 mol N per hectare per jaar · stel'; staafje met een marge van 30 % (heel Nederland) naast een veel langer staafje van 70 % (één plek); twee kaartjes met bron en jaartal |
| Hoofdstuk 3 — De grens van de heide | s16, q17, s18, s19, s20, q21, s22 | balk met '± 1400 · stel' tegen een streep 'kritische depositiewaarde droge heide'; de som 10 kg = 10 000 g ÷ 14 g per mol ≈ 714 mol op het scherm; twee streepjes: hoogveen 500 · droge heide 714; de som '1400 ÷ 714 ≈ 2'; de som 'marge 70 % van 1400 ≈ 980 → ± 400 tot ± 2400' en de marge als vaag gebied dat de streep 714 omvat; heideveld in de tijd: struikhei en tormentil, daarna pollen pijpenstrootje, bochtige smele en braam die hoog en dicht worden; bodemprofiel waar kalk naar beneden wegspoelt; nestkast aan de bosrand, Daan en Bas kijken erin, een ei met dunne schaal naast een normaal ei, een slakkenhuisje |
| Hoofdstuk 4 — Van data naar besluit | s23, s24, q25, s26, s27 | Bas aan een veldtafel met een rapport van vijf vakjes (natuurtypen · grens · wat er al valt · wat het project erbij doet · hoe het met de natuur gaat); een stal en een fabriek als grijze schetsjes met 'project'; pijlen: ecoloog → rapport → provincie (gebouw met vlag zonder naam) → besluit; daarna een cirkeldiagram van de herkomst met jaartallen; kaartje 'per gebied verschilt het' |
| Recap | s28, s29 | het gouden zeshoekje met vier kaartjes eromheen (wolkjes van stal en snelweg · buisje en model met marge · streep van de grens met grassen erboven · rapport met pijl naar de provincie); het koolmees-ei; daarna opleidingskaartjes en drie werkplekken |

## Vragen
q02 → b; q08 → c; q11 → a; q17 → b; q21 → c; q25 → a (zie film.py).

## Begrippen
depositie, ammoniak en ammonium, stikstofoxiden, Meetnet Ammoniak in Natuurgebieden, rekenmodel en Aerius, onzekerheid, kritische depositiewaarde (KDW), vergrassing, passende beoordeling.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 162 | `window.FILMDATA` |
| 2037 | `const SCENES = {}` |
| 6948 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/ec2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> ecologie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- zie brief.md en reviews/review_beeld.md
