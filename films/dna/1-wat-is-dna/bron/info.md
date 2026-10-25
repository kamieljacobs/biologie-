# Wat is DNA? — bronmap

Versie 3.0 is een lichte remake (prompt v10 B16) in de FILMDATA-straat, net als Chromosomen 2.0. De oude versie (DNA-bouwstraat `films/dna/_bouw/`, prompt v5, 12 okt 2026) staat in `oud/` (`1-wat-is-dna-v2.html`, `info-v2.md`, `script-v2.md`). Fase 1 (script, storyboard, twijfelscènes, keyframes): `remake-2026-10/`.

| Veld | Waarde |
|---|---|
| Bestand | films/dna/1-wat-is-dna.html (audio in `1-wat-is-dna/audio/`) |
| Reeks / nummer | DNA · film 1 van 8 |
| Doelgroep / niveau | havo + vwo; hoofdstuk 4 is een vwo-blok (`level: 'vwo'`, zonder gesproken aankondiging) |
| Versie / datum | 3.0 · 26 okt 2026 |
| Prompt | v10 |
| Voldoet aan | prompt v10 (26 okt 2026) |
| Herkomst | lichte remake (B16), keuring twijfelscènes 25 okt 2026 (`films/verbeterbladen/remake-2026-10/besluiten.md`: alles voorstel; t3 pastest met de ringvorm; ringvorm = basevorm van de hele DNA-reeks) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (23 takes, 6.232 credits), flow `VGNJ3RXscK3DCTEmFN6B`; stem-invoer letterlijk in `stem/invoer.md` |
| Duur | spraak ± 7:25 (445 s; basis 334 s); met hoofdstukkaarten en vragen ± 9 min (`duur: 9` in HOOFDSTUKKEN) |
| Beeldstijl | Part C: Macro (practicumlokaal met Noor), Micro zonder korrel (wangcel, kern, DNA, basen), Schema (schaal, letters, coderend DNA); zoomcirkels bij de stappen in schaal |
| Audio-opslag | 23 losse mp3's (`../audio/sNN.mp3`, −16 LUFS), woordtijden `stem/woordtijden/` (silalign, lokaal) |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s02 | haak · Macro → Micro | Noor doet het DNA-practicum (zout water, afwasmiddel, alcohol: witte draadjes); zoomcirkel naar de wangcellen; twee puzzelkaarten |
| 1. Van wang tot molecuul | s04–s07 (q06) | B · Micro + Schema | doorlopende zoom uitstrijkje → wangcel → kern (`kernChromatine`, 46 gebieden lichten op); chromosoom 1 uitgerold; 2 m naast Noor; tennisbal (meer dan 10 km); zoomcirkel DNA rond eiwitten (`nucleosoomDraad`) die opvouwt |
| 2. De bouwsteen en de ladder | s08–s15 (q13) | B + A · Micro | helix ontwindt tot ladder (`dnaLadderHelix`); nucleotide uit elkaar (`nucleotideRing`); groot/klein (ringvorm); **pastest** tegenover A: G te breed, C plekken passen niet, T past met twee bruggen; ladder draait tot helix met kleine/grote groef; partners op de gegeven streng; P en N in de nucleotide, plantje met fosfaat en nitraat |
| 3. Van volgorde tot gen tot genoom | s16–s21 (q19) | B · Schema (+ Micro) | lettertegels jij/Noor met verschillen; teller 3,1 miljard en twee sets; gen → genoom in één schema; 100 blokjes (< 2 % coderend, regelend, verschillend); cel met kern, mitochondriën, bladgroenkorrel, bacterie met plasmiden |
| 4. Richting, bruggen en verpakking · vwo | s22–s27 (q25) | B + A · Micro | genummerde suiker, 5'/3', antiparallel; waterstofbruggen, smelten bij ± 95 °C en weer paren; AT-rijk opent eerder (simulatie); histonen, nucleosoom, chromatine en condensatie tot staafjes |
| Samenvatting | s28 | Macro → Micro | terug naar het buisje en in stappen terug door de zoom; vooruitblik DNA 2 |

## Vragen
| Segment | Vraag | Juist |
|---|---|---|
| q06 | Hoe lang zijn alle 46 chromosomen van één cel achter elkaar? | c, ongeveer twee meter |
| q13 | Welke basen staan tegenover A T T G C? | b, T A A C G |
| q19 | Welk deel van je DNA codeert echt voor eiwitten? | c, minder dan twee procent |
| q25 · vwo | Welk stukje laat bij verwarmen het eerst los? | b, het stuk met veel A en T |

Vragen uit: de speler laat s05 en s18 helemaal weg en knipt in s12 en s24 vanaf de vraagzin. De alinea na elke vraag begint met een hele zin, dus geen kort antwoord dat blijft hangen. Gecontroleerd met `?vragen=uit` (lijst met knippunten), `antwoordtekst.py --check` en `kortantwoord.py --check`.

## Begrippen en docentdeel
Begrippen in `film.py` (`glossary`, vwo-begrippen gemarkeerd). Docentdeel in `sections.html`: 6 checkvragen (2 vwo), hoe de film het uitlegt, misvattingen, getallen en bronnen, keuzes en vereenvoudigingen (ringvorm als model, AT laat eerder los zonder 'omdat', gen = één eiwit), plaats in de reeks, lessuggestie. Alle beweringen met bronnen: `bronnen.md`.

## Waar wat in de HTML zit
Regelnummers in `../1-wat-is-dna.html` (versie 3.0):
- r. 104 begrippen, r. 115 docentdeel; r. 156 `window.FILMDATA`.
- r. 4500 `baseRing` en de rest van de DNA-basevorm (gedeelde bibliotheek, `lib_bio.js`).
- r. 4950 eigen tekenhulpen (`lokaal`, `buisje`, `wangcellen` r. 4973, `tennisbal`, `tegel`, `plantje`, `thermo`, `stukLadder`).
- r. 5035 `Object.assign(SCENES, …)`: één functie per alinea (s04 r. 5060, s10 pastest r. 5118, s22 r. 5199).

## Zo pas je deze film aan
Werkmap buiten de repo met de bestanden uit deze bronmap: `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `src/teken_dna1.js`, `src/scenes_dna1.js`, audio als `audio/` en woordtijden als `words/`; engine = `src/` (lib, lib_cast, lib_bio, lib_micro_evo, player, page, kop.js) + `bouw/`. Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + `lib_micro_evo.js` + teken + scenes, dan `film.py`, `build_data.py`, `build.py`); stills met `bouw/stills.py <map> qa contact`; de nieuwe HTML naar `films/dna/` met het donker-standaard-regeltje. Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `tabel_mobiel`, `flipkaarten`, `teller`, `licentie_noot`, `reviewlijst` draaien.
- Tekst wijzigen = die alinea opnieuw inspreken (één take; stem-invoer uit `segments.json` na `make_segments.py script_film.md`, met de handmatige 'tee' voor de letter T uit `voice_override.json`); woordtijden met `silalign.py`.
- Gedeelde tekeningen (basevorm, kern, nucleosomen) wijzig je in `bibliotheek/lib_bio.js` (testvel `#dna`), niet hier.

## Aandachtspunten
- Blinde transcriptie (B5) van de risicotakes s09, s10, s21, s22, s26 en s27 (via raw.githubusercontent.com, zie `stem/blind.md`): alles goed. Alleen in s21 is de slotlettergreep van 'plasmiden' zacht (Scribe: 'Plasmid'); hij is verstaanbaar en niet opnieuw ingesproken, maar staat voor Kamiels oor op de wachtlijst `remake-2026-10/uitspraak.md`.
- De letter T: de centrale regel `^T$` → 'tee' vangt geen 'T,' of 'T.'; in deze film met de hand als 'tee' ingesproken (`voice_override.json`). Voorstel: de regel in `films/uitspraak.json` uitbreiden naar `^T([,.:]?)$`.
- Frisse beeldreview (C10.7): eerst een zelfreview (`review_zelf_2026-10-26.md`), daarna de frisse review (`review_fris_2026-10-26.md`, 12 MOET, 18 KAN). Alle MOET-punten zijn hersteld:
  - s04: het label 'celkern' staat rechts van de kern. De schaalbalk geeft 2 µm (de kern is ± 6 µm). Bij 'chromosoom' en 'chromosoom 1' licht een draad goud op.
  - s05, s07 en s27: schaalbalken aangepast. Bij 'opgevouwen' (s07 en s27) vouwt de kralenketting op tot een spiraal (nieuwe `kralenVouw` in `teken_dna1.js`).
  - s09, s15 en s22: de base zit aan C1′ (`nucleotideRing` v2 in `bibliotheek/lib_bio.js`). In s22 is de OH aan C3′ te zien.
  - s16 en s28: meta 'vergroot · echt ± 1 verschil op de 1000 basen'.
  - s17: het label staat boven het kader.
  - s21 is opnieuw getekend: één kern, mitochondriën en een bladgroenkorrel met ringetjes, en een bacterie met een paarse ring en drie plasmiden.
  - s26: het C–G-stuk blijft dicht. Het label 'twee/drie bruggen per paar' staat erbij en de thermometer is los van de labels.
  - Goedkope KAN-punten ook gedaan: label 'draadjes', s20 grijs in plaats van paars plus 'niet op schaal', labels s14/s23, titel zonder korrel.
  - Overige KAN-punten zijn bewust blijven staan (zie de review).

## Wijzigingen
- 26 okt 2026 — Versie 3.0: lichte remake. Nieuw script (fase 1, gekeurd 25 okt), nieuwe stem (eleven_v4), alle beelden nieuw in de FILMDATA-straat; basevorm van de DNA-reeks (ringvorm) in de gedeelde bibliotheek; opening met Noor en het DNA-practicum; pastest; opwikkelen in de basis; vier `!`-verbeteringen met bronnen (zie `bronnen.md`). De oude film staat in `oud/`.
