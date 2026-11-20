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
- **Inspreken KLAAR (19 nov 2026, 21:xx)**: alle 109 takes (7 films, ± 5,7 min per film), Roos eleven_v4, 1 take per alinea, gedownload, `silalign` gedraaid. Per film in `bron/stem/`: `sessions.json`, `gen.json` (generation/session-id, duur), `takes.tsv` (film, flow, sid, generation, session) en `woordtijden/`. Flows: sp1 sPrLquj9w9L1wrigBgSu · sp2 4NOwrFXbrKd0DHkKFXC7 · sp3 BN0keaqNkdbgyQAd2rYP · sp4 vRFBFbwK8A18fGc00nAQ · sp5 GDT5wKNKiQ8SwXLSRCtg · sp6 zORSOBMSBrQc7udArG4N · sp7 7gVtGjI7XVfVXbpT60oa. Audio opnieuw ophalen (niet opnieuw genereren): creative_get_flow_run_status met flow + session-ids uit takes.tsv geeft verse ondertekende URL's.
- (oud) Inspreken: eerst alleen sp6 s01 en s03 gegenereerd (flow `zORSOBMSBrQc7udArG4N`; s01 generation HfOnKfL3f9ftUVHz9Jo2 / session nDOpd4dhhNDWzcE84Dk7, s03 8OEz542Xuz1kubNptnh9 / M8St3wIqayxi3RYAte2E): niet opnieuw genereren, ophalen met creative_get_flow_run_status. Helpers kregen geen toestemming voor ElevenLabs-aanroepen; inspreken in de hoofdsessie of na Kamiels toestemming. Brief: `/home/claude/hw/BRIEF-inspreken.md` (staat hieronder samengevat): make_segments → per alinea één generate_speech (Roos 7qdUFMklKPaaAVMsBTBt, eleven_v4, 1 take) → status → curl naar raw/ en audio/ → silalign → stem/sessions.json + gen.json.
- Volgende: inspreken (7 films, ± 110 takes), engine = bronmap mariene-biologie-3, bouwen volgens BOUWEN.md (scenes_sp<N>.js/teken_sp<N>.js uit storyboard.md), beeldreview, pak.py, vervolg.html (planobject → [titel, href]), films.json met datum, scripts, REVIEW = nog bekijken, LEVENSLOOP.

## Bouwen (19 nov 2026, avond)
- Zeven bouwers parallel, één per film, met de vaste brief `/home/claude/hw/BRIEF-bouwen.md` (werkmap buiten de repo; engine = bronmap mariene-biologie-3 + actuele `personages/lib_cast.js`). Brief: storyboard volgen, alleen cast, contactsheets nakijken, niets pushen. Gaat de sessie verloren: werkmap opnieuw opzetten volgens BOUWEN.md, audio opnieuw ophalen via `bron/stem/takes.tsv` (zie hierboven), en de brief opnieuw maken uit deze regels.

## Stand 19 nov 2026, laat: ALLE 7 FILMS OP DE SITE
- Gebouwd door zeven bouwers (brief `/home/claude/hw/BRIEF-bouwen.md`), contactsheets door de hoofdsessie nagekeken, in de repo gezet met maakinfo + pak, `vervolg.html` (planobjecten → `[titel, href]`), `films.json` (datum 2026-11-19), scripts, LEVENSLOOP. REVIEW = nog bekijken (staat niet in REVIEW).
- Bekende zwakke plekken (voor Kamiels review): sp1 s12 zakkende elleboog subtiel, s19 Sam klein in overzicht 0–15 m; sp2 s18 oorlel simpel, s01 lege band onder de kant; sp3 —; sp4 s06 druk en klein startblok, s16 Sam alleen hoofd boven dekbed; sp5 s11 geen hand-op-scheenbeen-pose, duik = gedraaide stroomlijn; sp6 s11 kleine zwemmer van boven, s17 stap op blok stijf, s20 duik; sp7 s01 zwemmer klein, s14 'afstand' alleen leunen.
- Cast die ontbrak en film-eigen is opgelost (kandidaat voor castboek): zwemkleding voor Bilal, Daan, Noor, Teun, Jens; zwemmer van boven; duik; plank/elastiek; krachttrainer; Sam pyjama/bed; trainingsjack; armen over elkaar; hand op schouder; hometrainer-fietser.
- `scripts/volgende.py` liep vast op planobjecten in `basis` (dicts): gerepareerd (`isinstance(b, list)`).
- Filmmedaillons klaar (20 nov 2026): vel-15, flow 3r9c6na8QELLeb9Be9Vf, vak 8–18 reserves (startblok, stopwatch, badmuts, dolfijn, lactaatstrip, hart en longen, baanlijn, handen met water, medaille, fluitje, klembord). Nog te doen: uitspraak-wachtlijsten in de volgende batchtest, luisterpagina.
