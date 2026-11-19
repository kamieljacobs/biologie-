# Overdracht · Wat word jij? · Sport en topsport

Stand 19 nov 2026. Lees ook `REEKS-sport.md`, `films/vervolg/BOUWEN.md`, `films/PROMPT_v13.md`, `films/logboek/regels.json` en `films/BEELDAFSPRAKEN.md`.

## Besloten
- Kamiel 18 nov 2026: nieuw vakgebied Sport op 'Wat word jij?', eerste reeks zwemmen (aanleiding: een leerling die op hoog niveau zwemt). 19 nov 2026: films over Kross' *Chatter* en *Shift* erbij; 'begin maar met maken, zo zelfstandig mogelijk' (reeksmodus).
- Gebied `sport` staat in `vervolg.html` (richting voeding) met zeven geplande films (komt nog) en twee schrapvoorstellen (zichtbaar met `?k=1`). Kritische check en cast: `REEKS-sport.md`.

## Volgende stappen
1. Cast: outfit `zwem` en zwemhoudingen voor Sam; castvellen + code voor `zwemtrainer` en `sportpsycholoog` (ter keuring, reeksmodus).
2. Per film: script met B15 (dobbelsteen, scriptcheck, blinde beoordelaar), `bronnen.md`, twijfels zelf beslissen en loggen.
3. Inspreken, bouwen, beeldreview, in de repo (films.json met datum, vervolg.html, scripts), REVIEW = nog bekijken.
4. Medaillon (`img/kunst/iconen/vervolg/sport.webp`, `VICOON`) en achtergrondplaat (`img/themakunst/vervolg/sport.webp`, `VPLAAT`): zwembad met startblok en één biologisch element, als edit met een bestaande plaat als stijlreferentie.
5. LEVENSLOOP: Sam (zwemmer), zwemtrainer, sportpsycholoog.

## Stand (19 nov 2026, avond)
- **Scripts definitief** (script_v2.md in elke bronmap `films/vervolg/sport-<N>-…/bron/`): B15 met echte blinde beoordelaar (claude-fable-5-2, `werk/blind/oordeel_blind.md`; bij combinaties ronde 2 `oordeel_blind2.md`), frisse feitenreview (sonnet, `reviews/review_v2.md`), alle MOET verwerkt. Logregels samengevoegd in `films/logboek/mutaties.jsonl` en `fouten.jsonl`. Zelfoordelen van de makers staan als `werk/blind/oordeel.md` (niet meegeteld).
- Per film ook: `bronnen.md`, `twijfels.md` (besluiten reeksmodus), `storyboard.md`, `uitspraak.md` (wachtlijst), `uitspraak_film.json` (film-eigen stem-invoer voor make_segments), `voice.md`, `segments.json`.
- **Cast** in code (ter keuring): `zwemtrainer`, `sportpsycholoog`, Sam outfit `zwem` + `zwemmer()` (crawl, rug, school, vlinder, stroomlijn, onderwater, startblok). Testvel `personages/vellen/testvel-sport-code.webp`, API in `bron/../` `personages/API-sport.md`. Nog zwak: armen in zijwaartse recovery, geen rolbeweging/ademhaling; nog nodig volgens storyboards: krachttrainer (of terugval), keerpunt-salto, plank, elastiekoefening, Sam rennend/loopoutfit, Sam in bed, kinderen ± 10 in zwemkleding. Geen ElevenLabs-castvellen gemaakt (code eerst).
- **Medaillon en plaat** op de site (`img/kunst/iconen/vervolg/sport.webp`, `img/themakunst/vervolg/sport.webp`; flow LftjXdi14vC7X2x0wbb9).
- **Inspreken**: alleen sp6 s01 en s03 gegenereerd (flow `zORSOBMSBrQc7udArG4N`; s01 generation HfOnKfL3f9ftUVHz9Jo2 / session nDOpd4dhhNDWzcE84Dk7, s03 8OEz542Xuz1kubNptnh9 / M8St3wIqayxi3RYAte2E): niet opnieuw genereren, ophalen met creative_get_flow_run_status. Helpers kregen geen toestemming voor ElevenLabs-aanroepen; inspreken in de hoofdsessie of na Kamiels toestemming. Brief: `/home/claude/hw/BRIEF-inspreken.md` (staat hieronder samengevat): make_segments → per alinea één generate_speech (Roos 7qdUFMklKPaaAVMsBTBt, eleven_v4, 1 take) → status → curl naar raw/ en audio/ → silalign → stem/sessions.json + gen.json.
- Volgende: inspreken (7 films, ± 110 takes), engine = bronmap mariene-biologie-3, bouwen volgens BOUWEN.md (scenes_sp<N>.js/teken_sp<N>.js uit storyboard.md), beeldreview, pak.py, vervolg.html (planobject → [titel, href]), films.json met datum, scripts, REVIEW = nog bekijken, LEVENSLOOP.
