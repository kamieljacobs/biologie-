# Bacteriën als fabriek — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biotechnologie-1-bacterien-als-fabriek.html` (audio in `biotechnologie-1-bacterien-als-fabriek/audio/`) |
| Reeks | Wat word jij? · Biotechnologie en life sciences (film 1) |
| Niveau | havo + vwo (één niveau) |
| Prompt | v10 |
| Versie | 1.0 · 25 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.526 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:07 (367 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast (Sam stagiair, Merel procestechnoloog), Micro in zoomcirkels |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; drie scriptvarianten + blinde beoordelaar (werk/blind) → v1 → frisse feitenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel → inspreken → frisse beeldreview (reviews/review_beeld.md, 15 MOET verwerkt) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | links een vrachtwagen met kratten varkens- en runderalvleesklieren bij een slachthuis, label 'vroeger'; een weegschaal met een berg kratten tegenover één klein flesje insuline; rechts Sam in het lab met één reageerbuisje omhoog, label 'nu' |
| Hoofdstuk 1 — Van slachthuis naar gen | s04, s05, s06, s07, q08, s09 | Schema → Micro: zoom in het reageerbuisje op één bacterie met een paarse plasmidering, binnen het membraan; het gen op het plasmide licht op, ribosomen maken een keten (licht paars); terug naar Schema: tijdlijn jaren twintig – jaren zeventig – 1982 met een varkens- en een runderinsuline naast menseninsuline, verschillende kralen goud gemarkeerd (één bij het varken, drie bij het rund); daarna bacterie en gistcel naast elkaar (teal) |
| Hoofdstuk 2 — Opschalen | s10, q11, s12, s13, s14, q15, s16 | erlenmeyer van één liter op een schudtafel, golvend oppervlak met teal zuurstofpijltjes; Sam zet een vat met tien keer zoveel inhoud in, label 'tien keer zoveel = tien keer meer?'; de volgende ochtend een groeicurve die vroeg afvlakt; label 'vereenvoudigd' bij inhoud en oppervlak; daarna Merel bij een bioreactor in doorsnede (roerder, belletjes van onderen, sensoren T, pH en O₂, voedingspomp met oker suiker); stoom door het lege vat; dan de som 1 → 2 → 4 → … → 1024 op het scherm; tot slot reageerbuisje, kolf, voorkweektank, productietank op een rij |
| Hoofdstuk 3 — Zuiveren | s17, q18, s19, s20, s21 | Schema → Micro: de volle tank met troebele vloeistof, teal cellen en grijze andere eiwitten; Sam met een filter bij de tank; zoom in één E. coli met een paarse klont; centrifuge, cellen breken open, klont lost op en de keten vouwt goed (kralenketting die een kluwen wordt); enzymschaartjes (grijsblauw met goud actief centrum) knippen het middenstuk uit de lange keten, twee ketens met drie zwavelbruggen blijven over; dan een kolom van binnen met korrels, eiwitten met een andere lading blijven plakken, insuline komt op een eigen moment onderaan uit; een tweede en derde kolom met een ander label; groene meter 'ruim 99 % zuiver' |
| Hoofdstuk 4 — Fermentatie in je eten | s22, s23, s24, q25, s26 | drie vaten naast elkaar, elk met een oker product ervoor: kaas met een gistcel en paars gen, label 'stremsel'; bierglas met gistcellen en belletjes; een heel hoog vat met teal schimmeldraden en luchtbellen, label 'tot 150.000 liter', met de bioreactor uit H2 ernaast voor de maat; daarna de driedeling als drie kaartjes |
| Recap | s27, s28 | terug naar de weegschaal uit de cold open; nu staat het reageerbuisje links, met pijlen naar kolf, voorkweektank, productietank, centrifuge, kolom en een insulinepen zonder persoon; kaartje 'Nederland: ruim een kwart miljoen insulinegebruikers'; daarna opleidingskaartjes en een werkplek |

## Vragen
q02 → a; q08 → b; q11 → c; q15 → b; q18 → c; q25 → a (zie film.py).

## Begrippen
biotechnologie, genetisch gemodificeerd organisme (ggo), plasmide, bioreactor, opschalen, zuiveren, voorloper, fermentatie, gisting.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 176 | `window.FILMDATA` |
| 1981 | `const SCENES = {}` |
| 4486 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bt1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biotechnologie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Script v2 niet meer wijzigen (audio ingesproken)
- Twijfelscènes goedgekeurd door Kamiel 25 okt 2026 (blad FXJpJ1PTeq4PzvFwMjnjxi)
- Bronnenlogboek bron/bronnen.md: 46 ✓, 15 ≈
- Opleidingen in recap vooral labopleidingen (open punt)


Voldoet aan: prompt v10 (25 okt 2026).
