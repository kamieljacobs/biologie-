# DNA lezen — bronmap

Versie 2.0 is een beeld-remake op prompt v13 (brief `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`): stem, takes, woordtijden en tekst zijn die van versie 1.5 (inclusief de opnieuw ingesproken n19 van 31 okt 2026); alleen het beeld en de engine zijn nieuw. De film staat nu in de FILMDATA-straat van DNA 1 en 2 (zelfde speler, Part C-bibliotheek, basen als staafje met puzzelrand in palet B). De oude versie staat in `oud/` (`7-dna-lezen-1.5.html`, `info-1.5.md`, `filmdata-1.5-zonder-audio.json`, `audio-1.4/`).

| Veld | Waarde |
|---|---|
| Bestand | films/dna/7-dna-lezen.html (audio als losse mp3's in `7-dna-lezen/audio/`) |
| Reeks / nummer | DNA, film 7 van 8 |
| Doelgroep / niveau | havo + vwo; vwo-blokken n6 (reverse transcriptase, primerkeuze), n12 (STR, toevalskans, tweeling), n17 (referentiegenoom en variant), n22v (CRISPR-Cas9, gentherapie, somatisch/kiembaan) en n23 (SNP's, crossing-over) (`level: 'vwo'`); de speler knipt 'Voor vwo gaan we hier nog een stap verder.' weg |
| Versie / datum | 2.0 · 31 oktober 2026 (beeld-remake, takes behouden); eerdere versies: zie `oud/info-1.5.md` |
| Prompt | v13 |
| Voldoet aan | prompt v13 (31 okt 2026, beeld-remake, takes behouden) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), eleven_v3, één take per alinea of vraag; n19 laatste zin eleven_v4 (31 okt 2026, `stem/herinspreken_20261031.json`) |
| Duur | spraak vwo 815 s (basis 608 s); speeltijd met kaarten en vragen vwo ± 14,7 min, havo ± 11,4 min; met Vragen uit vwo ± 12,9 min, havo ± 9,6 min. `duur` in HOOFDSTUKKEN: 15 (stond op 13; zet de hoofdsessie) |
| Beeldstijl | Part C: Macro-nacht alleen in de opening (de ruit), Micro zonder korrel voor het bloed, verder Schema (#1A2740). Palet B voor DNA/RNA; kleurstoffen bij het sequencen zoals `sequencer()` (T rood, A groen, C blauw, G geel) |
| Audio-opslag | 23 mp3's (`../audio/<id>.mp3`), uit de base64 van versie 1.5 gehaald; woordtijden `stem/woordtijden/<id>.json` (n5, n11, n21 opnieuw uitgelijnd door `scripts/antwoordletter.py`) |

## Opbouw
| Hoofdstuk | Segmenten | Look | Kernbeeld (versie 2.0) |
|---|---|---|---|
| Opening | n0 | Macro → Schema | nacht, kapotte ruit, Dr. Kim (plaatsdelict) neemt het bloed af met een wattenstaafje; profiel langs de databank (geen match); archiefkast; 'niet uit de databank / niet van de dader zelf'; twee vragen |
| 1 Vermeerderen | n3, v4 + q4, n5, n6 (vwo) | Micro + Schema | uitstrijkje (rode cellen zonder kern, witte met kern); PCR-buisje; inzet DNA-verdubbeling; `thermocycler` met drie standen (95/55/72 °C) en kaartjes; Taq uit een bacterie uit hete bronnen; verdubbelen tot > 1 miljard; coronavirus (nieuw) en neusmonster; `primerStuk` past op virus, niet op mens; buisjes met/zonder virus; zelftest (nieuw) tegenover PCR; reverse transcriptase bouwt DNA op virus-RNA |
| 2 Sorteren | n8, n9, v10 + q10, n11, n12 (vwo) | Schema (+ Macro-dag strand) | chromosoompaar, GATA-blokken lichten op met de stem; 8× van vader, 11× van moeder; gel-apparaat, ingezoomd in de mazen (kort sneller), banden, twintig laantjes → streepjescode; bruinvis (nieuw) met bijtwonden en grijze zeehond (`zeehond`); drie monsters, gel met controle; STR met één of twee banden; Daan en Thijs met hetzelfde profiel |
| 3 Lezen | n14, v15 + q15, n16, n17 (vwo) | Schema | stopnucleotide met kleur stopt de keten; kopieën van alle lengtes; `sequencer` (Sanger) met de vier kleuren; 13 jaar en 3 miljard dollar tegenover NGS en puzzelstukjes; Esra met DNA-stukjes in het bloed; genoomkaart 1–22, tellen, te veel van 21; buisje bloed tegenover naald; referentie en variant |
| 4 Vinden | n19, v20 + q20, n21, n22, n22v (vwo), n22c, n23 (vwo) | Schema | databank ✗, stamboomsite, SNP-chip, Amerika/Nederland-kaartjes; stamboom met dader (?) en achterneef (Joost); ½ ¼ ⅛ met Noors familie; gedeelde stukken; stamboom naar beneden tot Erik; Dr. Kim neemt wangslijm af; match. Genetische modificatie met stappenbalk (alvleeskliercel en mRNA, `genOpbouw` met splicing, reverse transcriptase → cDNA, `plasmideKnipPlak` + `restrictieEnzym`, ligase, bacteriën, petrischaal, insuline), `crisprCas9`, sikkelcellen; vwo: Cas9 en gids-RNA, reparatie uit/nieuw, gentherapie met Opa Henk, stamcellen, somatisch/kiembaan |
| Samenvatting | n25, n26 | Schema | vier kaarten kopiëren · sorteren · lezen · vinden; Noor met haar familie, vooruitblik op aflevering 8 |

## Vragen
Elke vraag is nu een gesproken vraagalinea (`vN`, `heleVraag`, dezelfde take als de oude `qN`) plus een vraagkaart `qN` zonder audio. Denktijd 8 s, bij q10 en q20 12 s (`think`, kleine aanpassing in `src/player.js`).

| Kaart | Vraag | Juist |
|---|---|---|
| q4 | coronatest: wat toont de PCR aan? | a, een bepaalde nucleotidenvolgorde van het virus |
| q10 | bruinvis: waar verwacht je zeehond-DNA? | b, alleen in de dichte wond |
| q15 | NIPT: waaraan ziet het lab van welk chromosoom een stukje komt? | c, aan de nucleotidenvolgorde |
| q20 | achterneef: wat hebben dader en achterneef gemeen? | b, een klein deel van hun DNA |

Vragen uit (getest met `qa_vragen.py`): v4/v10/v15/v20 en de kaarten vallen weg; 'Antwoord A./B./C.' aan het begin van n5, n11, n16, n21 wordt geknipt; 'Voor vwo gaan we hier nog een stap verder.' in n6, n12, n17, n23 altijd. Geen antwoordtekst in beeld.

## Begrippen en docentdeel
Begrippen (17, waarvan 6 vwo) en checkvragen/docentdeel zijn overgenomen uit versie 1.5 (`film.py` → `oud/glossary.json` in de werkmap, `sections.html`). Eén regel in het docentdeel bijgewerkt (genetische modificatie: ligase en de knipplaatsen staan nu wél in de film). De kleurlegenda boven de begrippen (oude paarse basen) is weg.

## Waar wat in de HTML zit
Regelnummers in `../7-dna-lezen.html` (versie 2.0):
- r. 106 checkvragen, r. 107 docentdeel; r. 150 `window.FILMDATA` (segmenten, woordtijden, `bounds` uit 1.5 bewaard).
- scèneblok: eerst `lib_dieren.js` (bruinvis bouwt op `_zwemLijf`, zeehond), dan `lib_bio.js` (r. 8700), dan de eigen tekenhulpen (r. 18002: `enkStreng`, `dubbelStreng`, `bloedDruppel`, `wattenstaafje`, `ruit`, `profielCode`, `archiefKast`, `bloedVeld`, `coronaVirus` r. 18094, `zelftest`, `bruinvis` r. 18116, `gelBoven`, `chromStaaf`, `stappenBalk`, `insulineKeten`, `sikkelCel`, `bloedBuis`, `wt`) en de scènes (r. 18173; n0 r. 18200, n3 r. 18230, n8 r. 18320, n14 r. 18416, n19 r. 18500, n22 r. 18576, n22v r. 18612, n25 r. 18640).
- r. 18657 `GLOSSARY` en de speler.

## Zo pas je deze film aan
Werkmap buiten de repo: kopieer `bron/*` erheen, `src/*` naar `bouw/`, `../audio` naar `audio/`, maak de link `7-dna-lezen/audio -> ../audio` en zet `stem/woordtijden/*` in `words/`. Bouwen: `bash bouw.sh` (scenes.js = lib_dieren + kop + lib_bio + lib_micro_evo + teken_dna7 + scenes_dna7; dan `film.py`, `build_data.py`, `build.py`). Stills: `python3 bouw/stills.py . qa contact` (`IDS=n3,n5 FR=0.2,0.5,0.8` voor een deel), `python3 bouw/sheet.py qa qa.png 6`; losse tekeningen proberen met `testvel.py`. Daarna de HTML naar `films/dna/` met het donker-standaard-regeltje direct na `<meta charset>`, en in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `antwoordletter`, `flipkaarten`, `tabel_mobiel`, `oefenen`, `licentie_noot`, `teller` draaien.
- Beeld van één alinea: de functie met die id in `src/scenes_dna7.js`. Cue-woorden met `q.at(woord, n)` (zoekt een stukje van een woord!) of `wt(id, woord, n)` (exact woord; gebruik dat voor korte woorden als 'G', 'Die', 'Stap').
- Tekst wijzigen = die alinea opnieuw inspreken (één take, uitspraaklijst) en de woordtijden in `stem/woordtijden/<id>.json` vervangen; `segments.json` `display` aanpassen.
- `segments.json` is eenmalig gemaakt met `maak_segments.py` uit de FILMDATA van 1.5; niet opnieuw draaien (dan gaan de antwoordletter-tijden van n5, n11, n21 verloren).

## Aandachtspunten
- Twijfelscènes, herinspreeklijst, vragen en de lijst per scène: `opwaardering-v13.md`. Storyboard: `storyboard-remake.md`. Bronnen: `bronnen.md`.
- Uitspraak-wachtlijst blijft staan (zie `oud/info-1.5.md`), plus n22v 'hemoglobienuh' uit de brief.
- `sbSymbool` met `hl` zet `globalAlpha` absoluut (bibliotheekfout): geef in een vervagende groep altijd `a` mee.

## Wijzigingen
- 31 okt 2026 — 2.0: beeld-remake op prompt v13, takes behouden. Alle scènes opnieuw getekend in de FILMDATA-straat (zie `opwaardering-v13.md`, één regel per scène); audio als losse mp3's (HTML 13,3 → 2,8 MB); vragen als gesproken vraagalinea + kaart; denktijd per vraag in de speler. Eén docentregel bijgewerkt. Oude versie in `oud/`.
