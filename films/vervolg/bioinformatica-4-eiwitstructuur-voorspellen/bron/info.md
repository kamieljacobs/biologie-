# Van letters naar vorm — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/bioinformatica-4-eiwitstructuur-voorspellen.html` (audio in `bioinformatica-4-eiwitstructuur-voorspellen/audio/`) |
| Reeks | Wat word jij? · Bio-informatica (film 4 van 4) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 25 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.516 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:02 (362 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast + Micro (eiwitmodel uit echte coördinaten PDB 5DFR); reeksobject scherm met code / sequenties |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; 3 scriptvarianten + blinde beoordelaar (werk/) → v1 → frisse bronnenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel (eiwit uit PDB 5DFR) → frisse beeldreview (reviews/review_beeld.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01 | afdeling; Dr. Kim houdt zelf een envelop met een zegel vast; Dr. Kim geeft Sam een briefje met ± 30 letters; Sam kijkt van het briefje naar de envelop |
| Hoofdstuk 1 — Wat staat er op het spel? | s03, s04, q05, s06 | Micro → Schema: kralenketting die vouwt tot een kluwen met een holte; kaartjes 'Alles versneld' en 'Antistoffen op maat'; daarna hetzelfde eiwit twee keer: keurig gevouwen met een stofje in de holte, en als slappe keten waar het stofje langs glijdt |
| Hoofdstuk 2 — Wat zit er in de envelop? | s07, s08, q09, s10 | terugblik in het lab: kristalplaatje, een kalender waarvan de maanden omslaan; röntgenbundel → stippen → kluwen; ernaast een vriezer en 'cryo-EM: bevroren, zonder kristal · scherp sinds ± 2013'; '1958 · myoglobine'; twee balken PDB ± 250 000 vs > 200 000 000 bekende eiwitten (niet op schaal); daarna Sams scherm: zijn eerste idee, een teller die vormen afloopt, 3¹⁰⁰ ≈ 5 × 10⁴⁷ en een heelal-klokje dat veel te kort is, label 'vereenvoudigd' |
| Hoofdstuk 3 — De voorspelling maken | s11, q12, s13, s14, s15 | Sam plakt de letters in AlphaFold; een balk 'zoekt verwante eiwitten'; uitlijning van zes regels, twee gouden kolommen die samen veranderen; Micro: de twee kralen tegen elkaar; daarna terugblik 'zo leerde het': een stapel kaarten (volgorde + gemeten vorm), gok → vergelijk → bijstellen, teller '> 100 000'; tot slot een scorebord 'CASP · blind · beste team · moeilijke eiwitten' met jaren: 2016 < 40 (alleen in beeld), 2018 ± 60, 2020 ± 90, streep 'zo goed als meten'; naamkaartje 'Google DeepMind' (geen logo); naamkaartjes Hassabis, Jumper, Baker zonder portret |
| Hoofdstuk 4 — De envelop gaat open | s16, q17, s18, s19 | Sams voorspelling, gekleurd per stuk (blauw zeker → oranje onzeker); de envelop gaat open, de gemeten vorm schuift eroverheen; het blauwe deel valt bijna precies samen, de holte klopt; één oranje lus ligt anders; daarna hetzelfde enzym open en dicht met label 'echt eiwit beweegt'; Dr. Kim wijst naar de lus; tot slot databank-kaart '± 200 miljoen voorspellingen · gratis' |
| Recap | s20, s21 | briefje met letters → Sams gekleurde voorspelling → open envelop met de meting eroverheen; drie kaartjes: 'niet alles uitproberen', 'leren van voorbeelden', 'hints uit uitlijnen'; opleidingskaartjes en drie werkplekken |

## Vragen
q05 → b; q09 → a; q12 → c; q17 → a (zie film.py).

## Begrippen
eiwitstructuur, sequentie, databank, uitlijnen, röntgenkristallografie, cryo-elektronenmicroscopie, AlphaFold, CASP, betrouwbaarheid per stuk.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 162 | `window.FILMDATA` |
| 2032 | `const SCENES = {}` |
| 4858 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bi4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> bioinformatica`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Eiwit = PDB 5DFR (DHFR van E. coli), coördinaten in bron/werk/pdb/
- Afloop van de envelop is een voorbeeld (label)
- Echte personen alleen als naamkaartje, geen portret, geen logo
- s18: tweede a eruit geknipt (raw/s18_oud.mp3)
