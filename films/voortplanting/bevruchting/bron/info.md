# Bevruchting 1.0 — bronmap

Lichte remake (B16), deel 2 van de splitsing van *Van bevruchting tot baby* (`films/SPLITSING-VAN-BEVRUCHTING-TOT-BABY.md`). Geraamte: cold open, H1, H5 en H6 (tot de holle bal) van `films/voortplanting/1-precies-op-tijd/bron/script.md`. De oude film blijft online tot de drie nieuwe films (De cyclus, Bevruchting, Zwanger) zijn goedgekeurd; inpassen in `HOOFDSTUKKEN`, jaarplanner, Les 2 en de oefentoets gebeurt in de chat 'Inpassen'.

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/bevruchting/index.html (audio in `audio/`, 23 mp3's) |
| Reeks / nummer | Voortplanting · film 4 (na Celdeling, Geslachtsorganen en puberteit, De cyclus; daarna Zwanger) |
| Doelgroep / niveau | havo + vwo; vwo-blok s16–s19 (zona pellucida, acrosoom(reactie), verandering onderweg = capacitatie zonder naam, vraag q18) |
| Versie / datum | 1.0 · 7 november 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (lichte remake, B15-uitzondering `lichte-remake`); termenregel uit het splitsingsplan (8 nieuwe namen, zie `remake-2026-11/termen.md`) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea, flow https://elevenlabs.io/app/flows/mnROqHZF95qwmzUswcSA; ids in `stem/gen.json`; ± 5.360 credits spraak + ± 309 transcriptie |
| Duur | 337 s gesproken (basis 298, vwo 39). Speeltijd: vwo 6:53 · havo 6:01 · havo met Vragen uit 5:05. `duur: 7` voor HOOFDSTUKKEN |
| Beeldstijl | Part C: Micro (eicel, zaadcel, bevruchting van dichtbij, klieving, holle bal), Schema (familielijn, vrouwelijke organen vooraanzicht, eileider in doorsnede, tijdbalk, sets chromosomen, recap). Herkomst chromosomen palet B: moeder zandgeel, vader donkerblauw. Geen castnamen in stem of beeld |
| Audio-opslag | 23 losse mp3's, gemasterd op −16 LUFS / −1,5 dBTP (loudnorm); ruwe takes buiten de repo; s14 na de opname ingekort (bronnen.md) |
| Herkomst | Fase 1 in `remake-2026-11/` (script_v1, termen, twijfelscènes T1–T4 met keyframes, tekenproef `teken/`). Kamiel koos 7 nov 2026 bij alle vier het voorstel: geen naam voor de holle bal; capacitatie alleen uitgelegd; vraag over de vruchtbare dagen met 'seks'; nieuwe tekeningen zoals voorgesteld. Reviewopmerkingen bij de oude film in Firebase: geen |

## Opbouw (vwo)

| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01 | oma (zwanger) · moeder · jij; balk 'stil, jarenlang'; zoomcirkel: honderden zaadcellen rond de eicel, één bereikt het membraan; puzzel |
| Titel | s02 | eicel met zaadcellen |
| 1 Twee heel verschillende cellen | s03–s08, q07 | eicel en zaadcel in ware verhouding (20 koppen); ongelijke deling met poollichaampje; voorraad; bouw zaadcel; zwerm vs één eicel |
| 2 De tocht | s09–s14, q13 | vrouwOrganenVoor met zwerm langs het pad, ampulla goud, kruis in de baarmoeder; teller 200 miljoen → een paar honderd; tijdbalk eicel/zaadcellen; vruchtbare dagen |
| 3 Er komt er maar één binnen | s15–s22, q18 (vwo) | bvMantel: follikelcellen, mantel, acrosoom open, tunneltje, versmelten, kern naar binnen, mantel verandert (teal); vwo: namen + inzet 'net vrij / na de tocht'; sets chromosomen 2 vs 3; tweede poollichaampje, 23 + 23, zygote |
| 4 Van één cel naar een holle bal | s23–s27, q25 | eileiderDoorsnede met trilharen, zygote schuift naar links (baarmoeder) en klieft 1 → 16 (zoomcirkel); rij 1–16 met gestippelde zygote; holle bal (blastocyste) kruipt half uit de zona, slijmvlies; verwijzing Zwanger |
| Recap | s28 | vier panelen |
| Eindkaart | s29 | drie kernzinnen |

## Vragen

| Id | Niv. | Vraag | Juist |
|---|---|---|---|
| q07 | basis | Waarom is weinig cytoplasma handig voor een zaadcel? | b licht en snel; cytoplasma komt van de eicel |
| q13 | basis | Seks drie dagen vóór de eisprong: kan de eicel bevrucht worden? | b ja, zaadcellen wachten dagen |
| q18 | vwo | Zaadcel zonder de verandering onderweg: welke stap gaat mis? | c de acrosoomreactie |
| q25 | basis | 16 cellen: hoe groot vergeleken met de zygote? | b ongeveer even groot |

Vragen uit: de speler knipt de vraagzinnen in s06, s12, s17, s24; vraagtekens in beeld alleen bij Vragen aan (`vragenUit()` in scenes_bv.js). Gecontroleerd 7 nov 2026: tijdlijn havo/vwo × aan/uit zonder JS-fouten, spelerfix/antwoordtekst/kortantwoord/antwoordletter/microteken `--check` in orde.

## Begrippen
10 termen in `film.py`: eicel, zaadcel, poollichaampje, bevruchting, zygote, klievingsdeling, embryo; vwo: zona pellucida, acrosoom, acrosoomreactie. Flipkaarten via `scripts/flipkaarten.py`. Oefeningen in `../oefenen.json`: volgorde 'Van zaadlozing tot holle bal', uitleg 'Waarom er maar één binnenkomt', uitleg 'Meer cellen, niet groter' (opnieuw geschreven uit de oude volgorde-bevruchting; schema-eicel van de oude film niet overgenomen, want die noemt corticale korrels).

## Waar wat zit (`src/scenes_bv.js`, 7 nov 2026)

| Regel | Inhoud |
|---|---|
| 1–62 | kleuren, hulpen: `vragenUit`, `eiKaal`, `micro2`, `pill`, `setChip`, `kernMet`, `voorraad`, `zwerm`, `vbPad` (pad door vrouwOrganenVoor), `tijdbalk`, `familie`, `eicelZwerm` |
| 64 | title · s01 67 · s03 80 · s04 88 · s05 100 · s06 111 · s08 115 · s09 124 · s10 133 · s11–s14 143–145 · s15 148 · s16 155 · s17 166 · s19 171 · s20 174 · s21 180 · s22 185 · s23 197 · s24 208 · s26 212 · s27 219 · s28 228 |

Nieuwe tekeningen in `src/teken_bv.js` (kandidaten voor `bibliotheek/lib_bio.js`, recept bovenin): `bvMantel(ctx, x, y, R, {sp, dicht, ux, kern, krans})` en `bvKlieving(ctx, x, y, r, n, {pool, spook, kern})`. Bibliotheek via `src/lib_bio_deel.js` (uittreksel, `bouw/bio_deel.py`).

## Hoe je de film aanpast

- **Bouwen:** kopieer `bron/` naar een werkmap buiten de repo, zet `audio/` (uit de film) en `stem/woordtijden/` als `words/` ernaast, en draai `bash bouw.sh` → `film/index.html`. Daarna in de repo: teller, flipkaarten, oefenen, licentie_noot, spelerfix, antwoordtekst, kortantwoord, antwoordletter, microteken, tabel_mobiel (wijzigingen buiten deze film niet meecommitten).
- **Beeld:** scène in `src/scenes_bv.js`; cues met `q.on('woord', n)` / `q.at('woord', n)`. Stills: `python3 bouw/stills.py . <uit> s15:12` of `contact`.
- **Tekst:** wijzig `segments.json` (display en voice) en `script_v2.md`, spreek alleen die alinea in (Roos, eleven_v4, één take), master (loudnorm I=-16, TP=-1,5), woordtijden met `bouw/silalign.py`, bouw opnieuw.
- **Vragen en begrippen:** `film.py`; opties in `segments.json`.

## Aandachtspunten
- Gezichten blijven heel; geen hoofdkijkje in deze film.
- De zonareactie is een model (teal golf); corticale korrels en calcium bewust weggelaten (termenregel).
- Vruchtbaar venster: eindigt bij de eisprong (s14 ingekort, zie bronnen.md).
- Overlap met Celdeling x01/x02 (extra uitdaging: de eicel die al bij oma klaarlag): hier alleen als cold open en slot, zonder getallen.
