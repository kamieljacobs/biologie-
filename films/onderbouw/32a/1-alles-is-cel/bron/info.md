# Alles is cel — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/1-alles-is-cel/index.html` (audio in `audio/` ernaast: 15 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 1 (32A Organismen, eerste bullet) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengd vmbo-t / havo / vwo. Basislijn op vmbo-t-niveau; één extra blok voor havo/vwo (s07, paarse balk "havo/vwo"). Schakelaar **Basis / Havo/vwo** (standaard Havo/vwo; `?niveau=basis`) |
| Versie / datum | 1.0 · 12 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment (generations_count 1) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 15 takes woord voor woord gelijk aan het script |
| Duur | audio 278 s; speeltijd Havo/vwo 6:07, Basis 5:36 (met 4 hoofdstukkaarten van 3,5 s en 4 vragen van 8 + 6 s) |
| Beeldstijl | Part C, vlak, zoals Celorganellen en Diffusie: Schema (#1A2740) voor keuken, organismen en samenvatting; Micro (#121A26 met grain) voor cellen. Sla en keuken zijn eigen vlakke tekeningen (natuurlijke bladvormen), goedgekeurd als stijlframe op 12-10-2026 na vijf versies (zie `stijlframes/` en `bouw/frames.html`) |
| Audio-opslag | losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | gemaakt met uitlegfilm-prompt v5 + Part D; script na drie reviews (`reviews/`) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | het goedgekeurde script (bron van alles); `script_v1.md` de versie vóór de reviews |
| `stem/segmenten_stem-invoer.json` | per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`) |
| `stem/woordtijden/sNN.json` | woordtijden per take (Scribe) |
| `stem/uitspraaktest.mp3` | de uitspraaktest (goedgekeurd 12-10) |
| `src/lib.js` | Part C-tekenbibliotheek (gelijk aan die van Celorganellen) |
| `src/scenes.js` | hulpjes (sla, keuken, cellen, wangcellen) en één scènefunctie per gesproken segment |
| `src/player.js` | speler: tijdlijn, vragen, Basis/Havo-vwo, Leerling/Klas, ondertitels |
| `src/page.html` | paginasjabloon met checkvragen, begrippen en docentdeel |
| `bouw/make_segments.py` | `script_v2.md` → `segments.json` (lege regel = nieuwe take) |
| `bouw/build_data.py` | segments + woordtijden + vragen → `filmdata.json` |
| `bouw/build.py` | sjabloon + data + js → `film/index.html` met sitebalk |
| `bouw/shots.py` | stills per segment en contactsheet (Playwright; pas het pad `D` aan) |
| `bouw/frames.html`, `stijlframes/` | stijlframes en de checkpointpagina |

**Werkmap opzetten:** kopieer `src/`, `bouw/*.py` en `script_v2.md` naar een werkmap buiten de repo; zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`; kopieer `../audio/*.mp3` naar `film/audio/`. Daarna `python3 build_data.py && python3 build.py`, en `film/index.html` + `film/audio/` terug naar de filmmap.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema, keuken | krop sla komt binnen (stevig), zon trekt over het raam ("een dag later"), krop zakt in (slap), gaat in een bak koud water, "1 uur later" weer stevig; pil "waar is dat water gebleven?" |
| q02 | Cold open | vraag | waar is het water gebleven? |
| s03 | Titel | Micro | titel "Alles is cel" met plantencel |
| s04 | H1 Alles is cel | Schema | sla + zoomcirkel op bladweefsel; kat, eik en jij met elk een zoomcirkel; "kleinste bouwsteen"; "≈ 30 000 miljard cellen"; microscoop |
| s05 | H1 | Micro | wangcellen onder de microscoop (methyleenblauw), dan één schematische wangcel: celmembraan (met stoffen die wel/niet door gaan), cytoplasma, onderdelen |
| s06 | H1 | Micro | celkern (bouwtekening, regelt), rijtje celmembraan · cytoplasma · celkern |
| s07 | H1, havo/vwo | Schema | plat rondje op papier tegenover bolletje, blokje en tegeltje; "model"; wat je niet ziet; "vereenvoudigd · niet op schaal" |
| s08 | H1 | Micro | wangcel, "energie?" |
| q09 | H1 | vraag | waar haalt een wangcel zijn energie vandaan? |
| s10 | H2 De energiecentrale | Micro | bloedvat met voedingsstoffen (oker) en zuurstof (teal) de cel in; mitochondriën; één groot mitochondrium verbrandt, energie (koraal) komt vrij; spiercel vol mitochondriën; microscoop doorgestreept |
| s11 | H2 | Schema | vier begrippen op een rij; sla met zon "maakt zijn eigen voedsel"; "mitochondriën nodig?" |
| q12 | H2 | vraag | heeft een plantencel mitochondriën nodig? |
| s13 | H3 Wat een plant extra heeft | Schema → Micro | sla + zoomcirkel; plantencel zonder extra's met celmembraan, cytoplasma, celkern, mitochondriën; drie lege plekken "extra" |
| s14 | H3 | Micro | celwand (water gaat erdoor), bladgroenkorrels, licht, eigen voedsel |
| s15 | H3 | Micro | vacuole groeit, opgeloste suikers, water erin; inzet slappe sla; "wat gebeurt er in de cellen?" |
| q16 | H3 | vraag | wat gebeurt er in de cellen van het blad? |
| s17 | H3 | Micro → Schema | vacuole krimpt (water eruit), inzet sla wordt slap; vacuole groeit weer, sla stevig; pijlen "strak tegen de celwand"; doorsnede fietsband (binnenband = vacuole, buitenband = celwand); uitzoomen naar stevig blad met weefsel |
| s18 | Samenvatting | Schema | dierlijke cel en plantencel op één grondlijn, twee rijen begrippen, "celwand of bladgroenkorrels? → plantencel"; slappe krop wordt in koud water weer stevig |
| s19 | Eindkaart | Schema | Probeer het zelf: uienvlies, wangcellen, waterpest + vraag; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Waar is het water gebleven? | plakt aan de buitenkant · sla groeit er een stukje van · het is het blad in gegaan | c |
| q09 | Waar haalt een wangcel zijn energie vandaan? | uit voedingsstoffen, die de cel verbrandt · uit de celkern · uit licht | a |
| q12 | Heeft een plantencel dan nog mitochondriën nodig? | nee · ja, ook een plant moet voedsel verbranden · alleen in de wortels | b |
| q16 | Wat gebeurt er in de cellen van het blad? | de cellen gaan dood · de celwanden scheuren · de vacuole in elke cel verliest water | c |

## Begrippen

cel, celmembraan, cytoplasma, celkern, mitochondrium · celwand, bladgroenkorrel, vacuole · havo/vwo: model. Staan in `GLOSSARY` (index.html regel 680).

## Docentdeel

Op de pagina: doelgroep en niveaus, tabel per deel, zes misconcepties, pauzemomenten, getal 30 000 miljard (Sender, Fuchs & Milo 2016; Bianconi e.a. 2013), vereenvoudigingen, leerdoelen met dekking, practicumsuggesties. Vijf checkvragen (de vijfde alleen havo/vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst (kop, checkvragen, docentdeel, footer): regel 63–146; checkvragen vanaf regel 95, docentdeel vanaf regel 111.
- `window.FILMDATA`: regel 147. Per segment `id`, `kind` (speech/question), `level` (basis/vwo; vwo = havo/vwo-blok), `chapter`, bij speech `audio`, `dur`, `words` ({t,s,e}); bij vragen `q`, `options`, `correct`, `explain`.
- Tekenbibliotheek (Part C): direct na regel 147.
- Scènes: `const SCENES` regel 489; `s01` 491, `s03` 510, `s04` 515, `s05` 532, `s06` 546, `s07` 553, `s08` 569, `s10` 571, `s11` 595, `s13` 602, `s14` 617, `s15` 627, `s17` 635, `s18` 661, `s19` 672. Hulpjes (sla `stevigeKrop`/`slappeKrop`/`krop`, keuken `windowView`/`counter`/`bowl`, cellen `animalCell`/`plantCellV`, `wangcel`/`microField`, `tissue`, `cat`, `oak`, `microscope`, `inset`) staan erboven.
- Begrippen: `GLOSSARY` regel 680.
- Speler: vanaf regel 691; `buildTimeline()` 705, `drawChapterCard()` 739 (hoofdstuk-subtitels in `mini`), `drawQuestion()` 744. Hoofdstukkaart 3,5 s; vraag 8 s denktijd + 6 s uitleg; geen kaart voor Cold open, Titel en Eindkaart (`NO_CARD`).

## Zo pas je deze film aan

1. **Tekst in beeld** (labels, pillen): zoek de string in de scènefunctie (`s14(` enz.).
2. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`. Woordtijden met Scribe (in ElevenLabs: transcriptie met de spraak-node als bron). Vervang `audio/sNN.mp3` (master −16 LUFS) en zet nieuwe `words` en `dur` in FILMDATA, of draai `build_data.py`. Controleer daarna dat elke `q.at('woord')` in die scène nog het bedoelde woord vindt: `q.at` zoekt op *deel* van een woord ("Om" vindt ook "zoomen"); de cuecheck in de bouwsessie zette per scène alle cues met gevonden woord en tijd onder elkaar.
3. **Ondertitel corrigeren zonder nieuwe opname**: pas `words[].t` aan, tijden laten staan.
4. **Vraag aanpassen**: `q`, `options`, `correct`, `explain` in het `q..`-segment (of in `bouw/build_data.py`).
5. **Basis of havo/vwo**: `level` van een segment op `basis` of `vwo`. Checkvragen met `class="q vwo-only"` en begrippen met `vwo:true` verdwijnen in Basis.
6. **Eindkaart langer of korter**: `HOLD` in `bouw/build_data.py` (nu 12 s); de speler loopt na het einde van de audio door op de klok.

## Uitspraak (goedgekeurd 12-10-2026)

"dertigduizend" als stem-invoer "dertig-duizend"; vacuole (alleen enkelvoud: het meervoud "vacuolen" is niet goedgekeurd), cytoplasma, celmembraan zoals geschreven.

## Aandachtspunten

- Tool bij de film nog niet gekozen (voorstellen: Celbouwer, Slalab, virtuele microscoop).
- De overgang stevig ↔ slap is een snelle overvloeier tussen twee tekeningen, geen echte vervorming.
- Lettertypen komen van Google Fonts (zoals bij Celorganellen); offline vallen ze terug op Georgia/system-ui.
- Tabellen in het docentdeel scrollen horizontaal op een telefoon (`table{display:block;overflow-x:auto}`); Celorganellen heeft dat nog niet.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Verplaatst (nu `naamBij`): wangcellen (onder het microscoopbeeld), celkern, model, zuurstof, mitochondrium, bladgroenkorrel, vacuole (ook 'wordt kleiner/groter'), opgeloste stoffen, celwand ('houdt tegen').
