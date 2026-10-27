# DNA kopiëren — bronmap

Versie 2.0 is een lichte remake (prompt v10 B16) in de FILMDATA-straat, zoals Chromosomen 2.0 (26 okt 2026). De oude versie (DNA-bouwstraat `films/dna/_bouw/`, prompt v5, 12 okt 2026) staat in `oud/` (`2-dna-kopieren-v2.0.html`, `info-v2.0.md`, `script-v2.0.md`) en blijft daar tot Kamiel de nieuwe goedkeurt.

| Veld | Waarde |
|---|---|
| Bestand | films/dna/2-dna-kopieren.html (audio in `2-dna-kopieren/audio/`) |
| Reeks / nummer | DNA · film 2 van 8 |
| Doelgroep / niveau | havo + vwo; hoofdstuk 4 is een vwo-blok (Havo/Vwo-schakelaar, `?niveau=havo`) |
| Versie / datum | 2.1 · 27 okt 2026 |
| Prompt | v10 |
| Voldoet aan | prompt v13 (27 okt 2026), alleen de basevorm opgewaardeerd (B14); overige v11–v13-punten niet nagelopen |
| Herkomst | lichte remake (B16), keuring twijfelscènes 25 okt 2026 (`../../../verbeterbladen/remake-2026-10/besluiten.md`: alle voorstellen, T4 = alternatief, basen in de ringvorm van DNA 1); fase 1 in `remake-2026-10/` |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (24 takes, 6.583 credits); flow `iDUu8zKxPqYHfp5p5N4J`; blinde transcriptie van de risicotakes (741 credits): `stem/blind.md` |
| Duur | spraak 431 s (basis 282 s); speeltijd met vragen en kaarten ± 8:30 vwo, ± 6:00 havo; `duur: 9` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro (kamer met Noor), Micro zonder korrel (huid, kern, DNA, vork), Schema (klok, Meselson-Stahl, vraagkaarten, polymerasen); zoomcirkel van arm naar huid, harde cut naar Schema-kaarten |
| Audio-opslag | 24 losse mp3's (`../audio/sNN.mp3`), woordtijden `stem/woordtijden/` |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Opening | s01 | haak · Macro → zoomcirkel → Micro | Noors onderarm met schaafwond die heelt (dag 0 → 7), zoomcirkel naar de basale laag, 2 m DNA naast Noor |
| 1 Wanneer en waarom | s03–s06 | proces in de tijd · Micro → cut naar Schema | cel die zonder kopiëren maar de helft zou geven; celcyclusklok (G1/S/G2/M, zoals Celdeling); één chromatide wordt een X |
| 2 Eén streng is genoeg | s07–s14 | mechanisme · Micro | doorlopende zoom kern → chromatine → DNA rond eiwitten → helix → ladder met ringbasen; helicase opent een bubbel met twee vorken; één gevolgde nucleotide die niet past (G) en een die past (A); polymerase sluit en koppelt; de echte vork in havo zonder namen; pastest A T G C met waterstofbruggen |
| 3 Twee uit één | s15–s21 | proces in de tijd · Micro + Schema | twee moleculen (oud donker + nieuw licht) → twee chromatiden; genoom als lint met kalender (1,9 jaar); startpuntsimulatie met samenvloeiende bubbels; telomeer met veter; één fout op een miljard als stippenveld |
| 4 Richting en halfnieuw (vwo) | s22–s28 | mechanisme + onderzoek · Micro + Schema | half oud/half nieuw; Meselson en Stahl (kolf, buizen met banden); 5'→3' en primer in de polymerase-close-up; de vork als één simulatie in vijf momenten (primers, leidende streng, volgende streng, Okazaki, ligase); DNA- en RNA-polymerase naast elkaar, reverse transcriptase als één zin; repair-enzym |
| Samenvatting | s29 | Macro → zoomcirkel | Noors genezen arm; per stap een fragment van de simulaties in de zoomcirkel |

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q05 | In welke fase kopieert de cel haar DNA? | M-fase · S-fase · na de deling | b |
| q13 | Oude streng A T G C: wat komt er tegenover? | ATGC · TACG · UACG | b |
| q18 | 50 per seconde en toch een paar uur: hoe? | sneller · veel startpunten · alleen genen | b |
| q24 (vwo) | Na één ronde lichte stikstof: wat zie je? | alleen zwaar · alleen licht · alles tussenin · half zwaar, half licht | c |

Vragen uit: de vraagalinea's s04, s12, s17 en s23 vallen helemaal weg (vlag `heleVraag` in film.py → filmdata; speler slaat ze over). De alinea's na een vraag (s06, s14, s19, s25) zeggen het antwoord opnieuw in eigen woorden, zonder antwoordletter. Gecontroleerd met `?vragen=uit` (havo en vwo): 0 vraagkaarten, geen vraagzin over; `spelerfix`, `antwoordtekst`, `kortantwoord` --check in orde.

## Begrippen
celcyclus, S-fase, M-fase, DNA-replicatie, vrije nucleotiden, helicase, DNA-polymerase, telomeer, mutatie; vwo: semiconservatief, 5'- en 3'-uiteinde, primer, replicatievork, leidende streng, volgende streng, Okazaki-fragmenten, RNA-polymerase, reverse transcriptase, DNA-repair-enzymen (`film.py`, `glossary`).

## Docentdeel
In `sections.html`: 5 checkvragen (2 vwo), hoe de film het uitlegt (met misvattingen), bespreekmomenten, getallen met bronnen, keuzes en vereenvoudigingen, plaats in de reeks. Alle beweringen met bronnen: `bronnen.md`.

## Waar wat in de HTML zit
Regelnummers in `../../2-dna-kopieren.html` (versie 2.0):
- r. 104 begrippen (`#glossary`), r. 114 docentdeel.
- r. 155 `window.FILMDATA` (segmenten, woordtijden, vragen).
- r. 2037 `const SCENES = {}`, daarna lib_bio.js (incl. `baseRing` en de DNA 2-objecten) en lib_micro_evo.js; r. 4707 `vorkModel` (DNA 2-deel van lib_bio.js); r. 5574 `Object.assign(SCENES, …)`: één functie per alinea (scenes_dna2.js).
- r. 5842 `GLOSSARY`, daarna de speler.

## Zo pas je deze film aan
Werkmap buiten de repo: kopieer `bron/` erheen, zet `src/*` en `bouw/*` samen in `eng/` en de mp3's in `film/audio/` (de bouw verwacht `film/` met `film.py`, `sections.html`, `segments.json`, `uitspraak_film.json`, `script_bouw.md`, `teken_dna2.js`, `scenes_dna2.js`, `words/`). Bouwen: `bouw.sh` (zet `scenes.js` = kop + lib_bio + lib_micro_evo + teken + scenes, dan `film.py`, `build_data.py`, `build.py`); stills met `bouw/stills.py <map> qa contact`. Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `tabel_mobiel`, `flipkaarten`, `teller`, `licentie_noot`, `oefenen`, `reviewlijst`.
- Beeld wijzigen: alleen in `scenes_dna2.js` (cue-woorden: q.at zoekt een stukje van een woord). Gedeelde tekeningen (vork, polymerase, basen) staan in `bibliotheek/lib_bio.js` (testvel `#repl`, `#dna`).
- Tekst wijzigen = die alinea opnieuw inspreken (één take; stem-invoer met `make_segments.py` uit `script_bouw.md` + `uitspraak_film.json`), woordtijden met `silalign.py`, blind transcriberen alleen die alinea.
- De speler (`src/player.js`) is die van Chromosomen 2.0 met twee kleine aanvullingen (zoek 'DNA2'): `heleVraag` (hele vraagalinea weg bij Vragen uit) en een compactere vraagkaart bij vier opties.

## Aandachtspunten
- Uitspraak: helicase, primase, ligase, nucleotiden, telomeer, antiparallel op de wachtlijst `uitspraak.md` (blind correct teruggekomen; klemtoon voor Kamiels oor).
- Okazaki-fragmenten en enzymen zijn niet op schaal ('schematisch · fragmenten korter dan echt').
- Frisse beeldreview: `review_fris_2026-10-26.md` (12 MOET, 19 KAN). Alle MOET-punten hersteld op 26 okt 2026 (zie Wijzigingen); van de KAN-punten 1, 3, 7, 11, 12, 14, 15, 16, 17, 18a, 18d en 19 ook. Open gelaten: KAN 2 (lege cel s03), 4 (groeven helix s07), 5 (enzymvormen), 6 (dichte basen), 8 (primers in de havo-versie van s11), 13 (streepjes bovenaan chromatiden), 18b/c.
- **Vraag aan Kamiel (KAN 9):** s14 zegt 'maar het spiegelbeeld: de partner'. Complementair is geen spiegelbeeld (de letters worden niet gespiegeld). Voorstel: 'maar de aanvulling: de partner' (één kleine take opnieuw). Nu ongewijzigd.
- **Vraag aan Kamiel (KAN 10):** RNA (U, primer, mRNA) is teal, terwijl prompt C1 'DNA en RNA paars' vastlegt. Binnen deze film helpt het onderscheid (primer ≠ DNA). Kiezen en dan vastleggen in de bibliotheek (`RNA_BASE`, `D2.rna`). Nu ongewijzigd.

## Wijzigingen
- 27 okt 2026 — 2.1: basen als staafje met puzzelrand in plaats van de ringvorm (besluit Kamiel: overal simpele nucleotiden, dezelfde vorm als DNA 3–8). Alleen de tekeningen in `src/lib_bio.js` en `src/teken_dna2.js` (baseRing, baseBruggen, d2Base, baseRingRNA; vaste lengte `DNA_BASE.len`) en één regel in `scenes_dna2.js` (s14) veranderd; scènes met basen: s07, s08, s10, s11, s12, s14, s16, s21, s26–s29. Gesproken tekst ongewijzigd. Pagina: 'basen in ringvorm' → 'als staafje met puzzelrand'. `bouw.sh` hersteld: teken_dna2.js niet meer los erbij (zit al in lib_bio.js; los gaf een dubbele const). In de gepubliceerde HTML alleen het SCENES-blok en die zin vervangen.
- 26 okt 2026 — 2.0, herstel na frisse review: oud/nieuw-kleurcode vanaf het origineel (s07, s15, s22, s29 met labels oud/nieuw); s26 opnieuw (open matrijs, polymerase kan niet beginnen, primase legt de primer aan de 5'-kant); s10 vingers sluiten zichtbaar + flits bij 'koppelt vast'; s11 richtingspijlen op de oude strengen; s28 echte reparatie (koraal G eruit, A erin); s01/s29 kader 'vergroot' met ring op Noors eigen arm; schaalbalken s07/s08 herrekend; letters rechtop (d2Base); s25 legenda op bandhoogte; s19 genen groen, startpunten gedimd, niet-coderend gestippeld; labels van de rand; s27 ligaselabel boven de ligase, vertrekkende polymerase gedimd, naden zichtbaar. Bibliotheek (DNA 2-deel): d2Base letter rechtop, polymerase-vingers ruimer, ligase groter, `lagA`, zichtbare naden.
- 26 okt 2026 — Versie 2.0: lichte remake. Nieuw script (vakfouten hersteld: 'het enzym zoekt niets uit', 'foutloos', 'duizenden' startpunten, ACGT-vraag; basisbeeld met beide strengen dezelfde kant op), nieuwe stem (eleven_v4), FILMDATA-straat, replicatievork als simulatie, basen in de ringvorm van de DNA-reeks, Noor met schaafwond, bronnenlogboek, nieuwe bibliotheekobjecten (vork, polymerase, helicase, primase, ligase, vrije nucleotide, baseRingRNA, schaafwond).
