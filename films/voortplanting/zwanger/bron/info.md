# Zwanger 1.0 — bronmap

Lichte remake (B16), deel 3 van de splitsing van *Van bevruchting tot baby* (`films/SPLITSING-VAN-BEVRUCHTING-TOT-BABY.md`). Geraamte: s30 (innesteling) t/m s33, H7 en H9 van `films/voortplanting/1-precies-op-tijd/bron/script.md`, aangevuld met wat het boek behandelt (vruchtvliezen en vruchtwater, weken-tijdlijn, fasen van de bevalling, borstvoeding). Concept, termenlijst en de vijf twijfelscènes met Kamiels keuzes: `remake-2026-11/concept.md` (commit 45c0468).

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/zwanger/index.html (audio in `audio/`, 41 mp3's) |
| Reeks / nummer | Voortplanting · film 5 (na Celdeling, Geslachtsorganen en puberteit, De cyclus, Bevruchting; daarna Anticonceptie, soa's en voortplantingstechniek) |
| Doelgroep / niveau | havo + vwo; vwo-blokken s16 (transport door het laagje), s22–s24 met vraag q23, s42 (prolactine) |
| Versie / datum | 1.0 · 7 november 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (lichte remake, B15-uitzondering `lichte-remake`); termenregel uit het splitsingsplan (12 nieuwe namen + prolactine vwo, Kamiels keuze 5) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea, flow https://elevenlabs.io/app/flows/nswLNdlrbsVWBMWnc5Hn; ids in `stem/gen.json`, stem-invoer in `stem/segmenten_stem-invoer.json`; ± 6.830 credits spraak, geen transcriptie |
| Duur | 447 s gesproken (basis 402, vwo 45). Speeltijd: vwo 8:45 · havo 7:45 · vwo met Vragen uit 7:34 · havo met Vragen uit 6:52. `duur: 9` voor HOOFDSTUKKEN |
| Beeldstijl | Part C: Micro (innesteling), Schema (geel lichaam, hCG, test, placenta en vlok, tijdlijn, buikdoorsnede op schaal, bevalling in doorsnede, lus, melkkliertje), Macro (de vrouw met kalender, zwanger, met de baby). Hormoonkleuren als Les 2: progesteron paars, LH goud, hCG oker; nieuw: oxytocine roze, prolactine lichtblauw. Navelstreng: kleur volgt zuurstof. Geen castnamen in stem of beeld |
| Audio-opslag | 41 losse mp3's, gemasterd op −16 LUFS / −1,5 dBTP (loudnorm), mono 96 kbit/s; ruwe takes buiten de repo |
| Herkomst | Fase 1 in `remake-2026-11/concept.md`. Kamiel koos 7 nov 2026: (1) 40 zwangerschapsweken vanaf de laatste menstruatie met 'bevruchting ≈ week 2'; (2) vier stadia op ware verhouding naast een liniaal in de buikdoorsnede; (3) bevalling alleen in doorsnede; (4) borstvoeding gekleed onder een doek, prolactine als vwo-blok; (5) alle 12 termen. Reviewopmerkingen bij de oude film in Firebase: geen |

## Opbouw (vwo)

| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01 | vrouw (outfit `zwanger`, niets te zien) bij de kalender; zoomcirkel naast het lichaam naar de baarmoederwand met het ingenestelde embryo; puzzel |
| Titel | s02 | vruchtzak met kind (`zwZak`) |
| 1 Een bericht aan het gele lichaam | s03–s09, q10, s11 | holle bal komt aan en nestelt in; geel lichaam → progesteron → slijmvlies; kader 'als er geen signaal kwam'; hCG van het embryo via het bloed; LH en hCG op dezelfde receptor; zwangerschapstest; grafiek hCG in bloed en urine per dag |
| 2 Dichtbij, maar gescheiden | s12–s17, q18, s19–s22, q23, s24 | baarmoeder ± 3 maanden; placenta in doorsnede, navelstreng in zuurstofkleuren; vlok vergroot met stofstromen; vwo: vier transportvormen; alcohol; afweercellen moeder; grafiek progesteron per maand; vwo: antistof in een blaasje |
| 3 Van embryo tot foetus | s25–s31 | vruchtzak in zoomcirkel naast de vrouw; vruchtwater; tijdlijn 0–40 weken; buikdoorsnede op schaal met cm-liniaal bij week 6, 10, 20, 40 en kleine tijdlijn embryo/foetus; pasgeborene op 50 cm |
| 4 Een lus die zichzelf versterkt | s32–s38, q39, s40 | bevalling in doorsnede (`zwGeboorte`), rekzintuigen, hypofyse in zoomcirkel, oxytocine; lus in vier stappen; ontsluiting met de hals van onderaf (`zwHals`); uitdrijving; nageboorte |
| 5 Melk op bestelling | s41–s44 | progesteronmeter, melkkliertje (`zwMelkklier`); vwo prolactine; moeder met baby onder een doek, zoomcirkel naast de borst |
| Recap | s45–s46 | drie panelen (hCG, druk, zuigen); baby met zoomcirkel naar haar eierstokje |
| Eindkaart | s47 | drie kernzinnen |

## Vragen

| Id | Niv. | Vraag | Juist |
|---|---|---|---|
| q10 | basis | Test vier dagen na de bevruchting negatief: zeker niet zwanger? (oud q34) | b nee, hCG pas na de innesteling |
| q18 | basis | Bloed mengt niet: kan alcohol bij het kind komen? | c ja, klein molecuul |
| q23 | vwo | Hoe komen antistoffen bij het kind? | a opgenomen en doorgegeven, kost energie |
| q39 | basis | Hoe komt de lus van de weeën tot een einde? | b de rek valt weg na de geboorte |

Vragen uit: de speler knipt de vraagzinnen in s09, s17, s22, s38; vraagtekens in beeld alleen bij Vragen aan (`vt()` in scenes_zw.js). De antwoordalinea's (s11, s19, s24, s40) leunen niet op de vraag; 'Nee.' en 'Ja.' vooraan vallen bij Vragen uit weg (kortantwoord.py).

## Begrippen
15 termen in `film.py` (12 basis + positieve terugkoppeling, embryo; vwo: prolactine). Oefeningen in `../oefenen.json`: uitleg 'Waarom het embryo hCG maakt' (uit de oude film, zonder 'trofoblast'), volgorde 'Van eerste wee tot nageboorte', uitleg 'Dichtbij, maar gescheiden'.

## Waar wat zit
Regelnummers in `src/scenes_zw.js` (7 nov 2026): `fadeIO` 7 · `pill` 8 · `micro2` 10 · `meta2` 11 · `vt` 12 · `hlabel` 13 · `BW` 16 · `wandMetEmbryo` 17 · `GL` 24 · `VL` 25 · title 28 · s01 31 · s03 43 · s04 49 · s05 56 · s06 66 · s07 79 · s08 87 · s09 96 · s11 100 · s12 112 · s13 119 · s14 124 · s15 131 · s16 138 · s17 145 · s19 149 · s20 155 · s21 161 · s22 169 · s24 172 · s25 183 · s26 188 · s27 194 · s28 196 · s29 202 · s30 207 · s31 212 · s32 219 · s33 225 · s34 232 · s35 236 · s36 241 · s37 245 · s38 250 · s40 252 · s41 258 · s42 264 · s43 269 · s44 277 · s45 282 · s46 290 · `tijdlijn` 298 · `tijdlijnKlein` 306 · `stadium` 313 · `lus` 318 · `meterZ` 325 · `setChipZ` 326 · `moederBaby` 329 · `persoonKlein` 337.

Eigen tekeningen in `src/teken_zw.js` (kandidaten voor `bibliotheek/lib_bio.js`, recept bij elke functie): `zwKind` (ongeboren kind, hoofdverhouding per week), `zwZak` (vruchtzak met vliezen en vruchtwater), `zwGeboorte` (bevalling in doorsnede: hals opent, vliezen, uitdrijving, placenta laat los), `zwHals` (ontsluiting van onderaf met cm-liniaal), `zwMelkklier` (melkblaasjes, spiertjes, afvoerbuisjes, toeschieten); plus `castBuik` en `castFoetus` (compatibel met `buikKijkje`/`vrouwOrganenVoor`; `castFoetus` tekent nu `zwKind`). Bibliotheek via `src/lib_bio_deel.js` (uittreksel, `bouw/bio_deel.py`).

## Hoe je de film aanpast

- **Bouwen:** vanuit de repo-root `bash films/voortplanting/zwanger/bron/bouw.sh` (werkmap /tmp/zwanger-bouw, audio via een koppeling) → `index.html`. Daarna in de repo: teller, flipkaarten, oefenen, licentie_noot, spelerfix, antwoordtekst, kortantwoord, antwoordletter, microteken, tabel_mobiel (wijzigingen buiten deze film niet meecommitten).
- **Beeld:** scène in `src/scenes_zw.js`; cues met `q.on('woord', n)` / `q.at('woord', n)` (woorden uit de ondertitel). Stills: `python3 /tmp/zwanger-bouw/eng/stills.py /tmp/zwanger-bouw <uit> s29:6` of `contact`; contactblad met `bouw/sheet.py`.
- **Tekst:** wijzig `script_v2.md` en `segments.json` (display en voice), spreek alleen die alinea in (Roos, eleven_v4, één take), master (loudnorm I=-16, TP=-1,5), woordtijden met `bouw/silalign.py` (map met `raw/<id>.mp3` en `segments.json`), bouw opnieuw.
- **Vragen en begrippen:** `film.py`; opties in `segments.json`.

## Aandachtspunten
- Gezichten blijven heel: hersenen, baarmoeder en melkklier altijd in een zoomcirkel náást het lichaam.
- Bevalling alleen in doorsnede; geen geboorte van buitenaf (Kamiels keuze 3).
- Weken = zwangerschapsweken vanaf de laatste menstruatie (40); embryologieboeken tellen vaak 38 vanaf de bevruchting (docentdeel).
- 'Antistoffen in de test binden hCG' is een vereenvoudiging zonder testtechniek (bronnenlogboek, bewering 9).
- De holle bal heet in de stem niet 'blastocyste' (zoals in Bevruchting).
