# Overerving via het X-chromosoom — bronmap

Lichte remake (28 okt 2026) van *Overerving via X-chromosomen en mitochondriën*. De oude film staat in `oud/` (html, `info-v1.md`, `script-v1.md`), de voorbereiding (fase 1, keuringsblad) in `remake-2026-10/`.

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html (audio in `5-overerving-via-x-chromosomen-en-mitochondrien/audio/`) |
| Reeks / nummer | Erfelijkheid · film 5 van 6 (§ 3.4) |
| Doelgroep / niveau | havo en vwo bovenbouw; hoofdstuk 5 (mitochondriaal DNA), vraag q31 en checkvraag 5 alleen vwo |
| Versie / datum | 2.0 · 28 okt 2026 (lichte remake) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (30 takes); flow `GdHrddvvf18QZtimpz9y`; s08 eerst door het ElevenLabs-filter geweigerd, tekst herschreven (zoon/dochter) en één keer opnieuw |
| Credits | 6 205 (30 takes + de geweigerde s08-take van 152, gedeeltelijk terugbetaald); per take in `stem/gen.json` |
| Duur | vwo ± 8:20 (498 s met kaarten en vragen; 421 s spraak) · havo ± 7:00 (418 s; 356 s spraak) · Vragen uit: vwo 428 s, havo 366 s; `duur: 8` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro (kamer met gezin De Wit, opa aan de aardbeien), Micro zonder korrel (netvlies in zoomcirkel, mitochondrion), Schema (geslachtschromosomen, kegelkrommen, kruisingsschema, stamboom, simulatie) |
| Audio-opslag | 30 losse mp3's (`../audio/sNN.mp3`, loudnorm −16 LUFS / −1 dBTP), woordtijden `stem/woordtijden/` (silalign, lokaal) |
| Herkomst | keuringsblad fase 1 (t1–t4 en script, alle goedgekeurd door Kamiel, 28 okt 2026), opmerkingen erf5 (allel-uitspraak, uitspraaktest 28 okt), eigen beeldreview fase 2 |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s02 | haak · Macro | opa (moederskant, `opabos`) sorteert aardbeien met Jens; rechts van een schuivende lijn hoe hij het ziet (kleurmodel deuteranoop); 1 op 12 mannen tegenover 1 op 200 vrouwen |
| 1. Jongen of meisje? | s04–s08 | mechanisme · Schema | XX en XY, eicel altijd X, zaadcel X of Y, kans op een jongen ½ (SRY als metaregel); q07; vrouw XX + man XY → zoon (X van moeder, Y van vader) en dochter |
| 2. De X en kleurzien | s09–s12 | bouw en functie · Schema → zoomcirkel → Micro | X groot (± 1000 genen), Y klein; opa met ring om het oog, zoomcirkel netvlies met kegeltjes en staafjes; rood- en groen-gen naast elkaar op de X; kegelkrommen, de rode schuift naar de groene |
| 3. Notatie en kruisingsschema | s13–s20 | erfelijkheid en kans · Schema | Xᴬ / Xᵃ / Y zonder letter; vijf genotypen; draagster × normale man (stamboom), q17; kruisingsschema (vader boven, moeder links); simulatie van 200 kinderen: ½ van de zonen, ¼ van alle kinderen |
| 4. Waarom vooral mannen? | s21–s27 | erfelijkheid en kans · Schema | één allel tegenover twee; vader geeft zijn X aan elke dochter, nooit aan een zoon; q24; stamboom De Wit: opa XᵃY → Marieke zeker draagster → Sara, Levi, Jens (zonen kans ½); hemofilie bij Victoria; X-chromosomaal dominant |
| 5. Mitochondriaal DNA (vwo) | s28–s33 | mechanisme · Micro en Schema | cel → mitochondrion met DNA-ringetjes (37 genen); eicel ± 100 000 mitochondriën, zaadcel hooguit ± 100 die worden afgebroken; q31; vader → geen kind, moeder → alle kinderen, ernst verschilt; X-chromosomaal naast mitochondriaal; moederlijn in de fotolijstjes |
| Recap | s34–s36 | E · Macro | terug naar opa en de aardbeien; eindkaart met drie regels |

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q07 | Van wie krijgt een jongen zijn X-chromosoom? | a van zijn vader · b van zijn moeder · c de ene keer van zijn vader, de andere keer van zijn moeder | b |
| q17 | Een draagster (XᴬXᵃ) en een man die normaal ziet (XᴬY) krijgen een zoon. Hoe groot is de kans dat hij kleurenblind is? | a een kwart · b de helft · c nul, want de vader ziet normaal | b |
| q24 | Opa is kleurenblind (XᵃY). Oma heeft geen allel a. Is hun dochter draagster? | a nee, want ze ziet zelf normaal · b misschien: de kans is een half · c ja, zeker | c |
| q31 (vwo) | Een man heeft een aandoening door een fout in zijn mitochondriaal DNA. Wie van zijn kinderen krijgt die aandoening? | a geen van zijn kinderen · b alleen zijn zonen · c al zijn kinderen | a |

Bij Vragen uit knipt de speler ook een openend 'Wat denk je?' in de vraagalinea's s16, s23 en s30 (aanpassing in `src/player.js`, functie `vraagCuts`); de context ('Ze krijgen een zoon.') blijft staan. Gecontroleerd met stills rond elke vraag (5 s ervoor tot 5 s erna).

## Begrippen
geslachtschromosomen, X-chromosomaal, draagster, kegeltjes, rood-groenkleurenblindheid, hemofilie, X-chromosomaal dominant, mitochondriaal DNA (vwo). Notatie Xᴬ / Xᵃ (allel als superscript bij de X, geen letter bij de Y), gelijk aan de rest van de reeks.

## Docentdeel
`sections.html`: vijf checkvragen (5 alleen vwo), tabel 'Hoe de film het uitlegt', kleurcode, misvattingen, vereenvoudigingen (kleurmodel, 8 % × 8 %, pseudoautosomale stukken, X-inactivatie, Victoria, vaderlijk mtDNA), niveaus, bronnen.

## Waar wat in de HTML zit
Regelnummers in `../../5-overerving-via-x-chromosomen-en-mitochondrien.html` (versie 2.0):
- r. 99 begrippen (`#glossary`), r. 109 docentdeel, r. 140 `window.FILMDATA` (segmenten, woordtijden, vragen).
- r. 2037 `const SCENES`; daarna de engine-bibliotheken (lib_bio, lib_micro_evo, teken_chr1).
- r. 11001 eigen tekenhulpen (`teken_erf5.js`): `XK` (kleuren: vader teal, moeder oker, kegeltjes S/M/L), r. 11008 `genoTekst` en `G()` (genotype met superscript), r. 11026 `geslStaaf`, r. 11046 `aardbeienBak`, r. 11056 `kleurModelDeutan` (Viénot, Brettel & Mollon 1999), r. 11071 `netvliesKegels`, r. 11098 `kegelKrommen`, r. 11114 `mtRingen`, r. 11123 `symbool` (stamboom), r. 11136 `telPop`.
- r. 11149 `scenes_erf5.js`: `OOG` (plek van het oog van opa in s10), r. 11177 `kruisSchemaX`, r. 11234 `moederlijn`, r. 11240 `Object.assign(SCENES, …)` met één functie per alinea (s01 r. 11245, s10 r. 11289, s19 r. 11335, s25 r. 11359, s28 r. 11379, s32 r. 11393, s35 r. 11414).
- r. 11425 speler (`const DATA`).

## Zo pas je deze film aan
Werkmap buiten de repo (bv. `hw/erf5/w` met de engine in `hw/erf5/eng`): zet de bestanden uit deze bronmap terug (`segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `script_opname.md`, `make_segments.py`, `src/teken_erf5.js`, `src/scenes_erf5.js`, audio als `audio/`, woordtijden als `words/`); engine = `src/` + `bouw/` (`src/scenes_kop.js` = engine-kop, waarvan `bouw.sh` de regels 1–32 gebruikt). Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + `lib_micro_evo.js` + `teken_chr1.js` + `teken_erf5.js` + `scenes_erf5.js`, dan `film.py`, `build_data.py`, `build.py`); stills met `bouw/stills.py <map> qa contact` of `id:t`, contactvel met `bouw/sheet.py`; in de repo zetten met `bouw/pak_repo.py` (paden bovenin aanpassen). Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `antwoordletter`, `flipkaarten`, `teller`, `licentie_noot`, `oefenen`, `reviewlijst`, `nieuwste_films` draaien.
- Beeld wijzigen: alleen in `scenes_erf5.js` of `teken_erf5.js`. `q.at` zoekt op een stukje van een genormaliseerd woord (Xᴬ wordt 'x'): nooit cuen op een genotype of op 'a'.
- Tekst wijzigen = die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py`, die eerst `uitspraak_film.json` en dan de centrale lijst toepast), loudnorm, woordtijden met `silalign.py`.
- Kleurmodel: `kleurModelDeutan` rekent per frame op de pixels van een rechthoek (s01, s11); houd die rechthoek klein.

## Kandidaten voor de bibliotheek
Voor `bibliotheek/lib_bio.js` (eerst op het testvel): `genoTekst` + `G()` (genotype X/Y met allel als superscript, moeder/vader-kleur), `geslStaaf` (X- of Y-chromosoom met allelband), `kleurModelDeutan` (deuteranoop-simulatie, bron B26), `netvliesKegels` (netvlies met kegeltjes S/M/L en staafjes), `kegelKrommen` (gevoeligheidskrommen, met `schuif` voor de afwijkende kegel), `mtRingen` (mtDNA-ringetjes in een mitochondrion), `symbool` (stamboomsymbool met ziek/draagster-stip, gelijk aan Stambomen), `aardbei`/`aardbeienBak`, `telPop` (klein poppetje voor simulaties).

## Aandachtspunten
- Eigen beeldreview fase 2 (contactvellen per hoofdstuk, 28 okt 2026). MOET hersteld: metatekst overal ≥ 28 px; s08 pijlen en labels 'van moeder / van vader' kruisten het kader; s10 ring op het oog van opa en labels kegeltjes/staafjes overlapten de zoomcirkel; s11 chromosomen verdwijnen nu na 'Werkt' i.p.v. te krimpen over de krommen; s13 chromosomen neutraal grijs (minder paars); s16 kindlijnen pas bij 'zoon'; s19 leeg raster van het kruisingsschema vanaf t = 0; s25 kinderen verder uit elkaar, kader 'XᴬXᵃ of …' kleiner; s28 labels 'eigen DNA' en '37 genen' rechtsboven, ringetjes groter; s30 label 'fout in het mitochondriaal DNA' niet meer door de lijnen; s33 moederlijn groter.
- KAN open: s05 zaadcellen blijven klein naast de eicel (niet op schaal, label staat erbij); s25 genotype van Marieke staat dicht bij haar symbool; in s10 valt achter het label 'kegeltjes' een lamp uit de kamer.
- Rood-groenkleurenblindheid is vereenvoudigd tot één mechanisme (zie docentdeel).
- Uitspraak: genotypen zonder komma ingesproken; wachtlijst in `uitspraak.md`.
- `oefenen.json` (naast de film) aangepast aan het nieuwe script: notatie Xᴬ/Xᵃ (typen als XA/Xa) i.p.v. Xᴺ/Xⁿ, zaadcel 'hooguit zo'n honderd' mitochondriën, de twee mitochondriën-opdrachten (`indelen-x-of-mito`, `uitleg-moederlijn`) alleen vwo. Geen namen.

## Wijzigingen
- 28 okt 2026 — Versie 2.0 (lichte remake): nieuw script volgens het keuringsblad (t1–t4, alle goedgekeurd): opa van De Wit (moederskant) is kleurenblind, Marieke draagster, mitochondriën als vwo-blok, nieuwe titel *Overerving via het X-chromosoom*; notatie Xᴬ/Xᵃ als in de reeks; nieuwe stem (eleven_v4, 30 takes), herbouw in de FILMDATA-straat (engine Chromosomen 2.2) met snelheid en Vragen aan/uit, donker standaard, sitebalk, vervolglink naar Stambomen en kansrekenen; kleurmodel naar Viénot e.a. 1999; bronnenlogboek bijgewerkt (B20 vwo-syllabus 2026, B26 kleurmodel). De oude film staat in `oud/`.
