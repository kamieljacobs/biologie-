# Hoe zeker is een match? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/forensisch-2-hoe-zeker-is-een-match.html` (audio in `forensisch-2-hoe-zeker-is-een-match/audio/`) |
| Reeks | Wat word jij? · Forensisch onderzoek (film 2 van 3) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) · docentdeel: bronnen bijgewerkt (25 okt 2026) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.344 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:56 (356 s); met vragen en kaarten ± 7 min |
| Prompt | v10 (met de aanvullingen van 25 okt 2026: twijfelscènes) |
| Beeldstijl | Schema met cast (Bilal stagiair forensisch onderzoek, Dr. Kim; plaatsdelict-outfit), Micro bij moleculen |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_beeld.md, frisse beeldreview na de bouw) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Bilal in de kantine met zijn telefoon; krantenkop 'DNA op mes: verdachte (34) was het'; ernaast het mes in een bewijszak en een dossierkaart met Erik |
| Hoofdstuk 1 — Twee hypothesen | s04, s05, s06, q07 | DNA-lab; Dr. Kim en Bilal aan het scherm met het deelprofiel (rij STR-vakjes, drie grijs 'geen uitslag', amelogenine 'man'); label 'grootste donor: past bij Erik'; ernaast een balans met twee schalen: links 'hypothese 1: DNA van Erik', rechts 'hypothese 2: DNA van een onbekende man'; onder elke schaal verschijnt een kans |
| Hoofdstuk 2 — Bewijskracht | s08, s09, s10, s11, q12 | kaart van Nederland; '± 9 miljoen mannen'; zoom naar 90 telpoppetjes (mannen), één is Erik; de som 9.000.000 ÷ 100.000 = 90; dan de breuk 'bijna 1 ÷ 1 op 100.000 = 100.000'; de balans slaat ver door naar hypothese 1; onder de balans de verbale schaal van het NFI als liniaal met zes vakken |
| Hoofdstuk 3 — Hoe kwam het daar? | s13, s14, s15, q16, s17, s18 | teller '23 STR's · kleiner dan 1 op 1 miljard'; Erik vertelt aan tafel; stripstrook: Erik en Joost (de bewoner) bij een fiets, een handdruk, Joost snijdt brood met het mes; dan het lab: Bilal en Dr. Kim schudden handen naast een klok op twee minuten, Bilal pakt een schoon mes; zes messen met stippen in hun kleuren; naast de eerste balans verschijnt een tweede, kleinere: 'hoe kwam het daar?' |
| Hoofdstuk 4 — Drie mensen op één mes | s19, s20, q21, s22 | piekenpatroon van één STR met vijf pieken van ongelijke hoogte; Bilal kleurt ze in drie kleuren met namen (Joost, onbekend, Erik); Eriks twee lage pieken lichten op; een raster met alle paren die uit vijf allelen passen; dan een generiek nagetekend scherm van DNAStatistX met piekhoogtes, 'donoren: 3' en een LR; een derde balans 'tweede spoor' |
| Recap | s23, s24 | Bilal streept de krantenkop door en schrijft eronder wat het rapport wél zegt; drie balansen naast elkaar (heft, bron: ver door · heft, activiteit: een klein beetje · tweede spoor: een klein beetje); daarna Bilal in het lab en vier opleidingskaartjes |

## Vragen
q02 → c; q07 → a; q12 → b; q16 → c; q21 → a (zie film.py).

## Begrippen
spoor, DNA-profiel, twee hypothesen, matchkans (toevallige-matchkans), likelihood ratio (bewijskracht), denkfout van de aanklager, bronvraag en activiteitvraag, overdracht, mengprofiel.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 156 | `window.FILMDATA` |
| 1923 | `const SCENES = {}` |
| 2350 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fo2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> forensisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Wachtlijstwoorden niet blind getranscribeerd (upload geblokkeerd); Kamiel luistert in de batch
- Bij Vragen uit haalt scripts/antwoordtekst.py de antwoordlabels weg

Voldoet aan: prompt v10 (25 okt 2026). Werkwijze: 3 scriptvarianten met blinde beoordelaar (`werk/`, winnaar en reden in `brief.md`), frisse feitenreview (`reviews/review_v1.md`), twijfelscènes gekeurd door Kamiel, frisse beeldreview na de bouw (`reviews/review_beeld.md`). Getallen met bronnen: `getallen.md`. Bouwen: `bouw/bouw.sh` in een werkmap volgens `films/vervolg/BOUWEN.md` (lib_bio.js zit in `src/`).
