# Werkbrief: podcastafleveringen thema Cellen (20 nov 2026)

Lees eerst: `podcasts/PODCASTS.md` (concept, spreekstijl, begripsblok), `podcasts/cellen/PLAN.md` (welke aflevering welke stof), en het voorbeeld `podcasts/voortplanting/bevruchting/script.md` (vorm en toon).

## Per aflevering

1. **Bron**: `films/cellen/<film>/bron/script.md` (vertelling), `bronnen.md` (gecontroleerde feiten), `uitspraak.md`, `info.md` (vwo-blokken). Alleen feiten uit de film of met een eigen bronregel; elke nieuwe vergelijking op schaal narekenen en de berekening bovenin het script zetten.
2. **Script** in `podcasts/cellen/<id>/script.md`, zelfde opbouw als de pilot:
   - kopregels `## <nr> · <titel> (± <min>)`, vwo-hoofdstuk eindigt op `· vwo`; nrs `0` (opening), `1`, `2`, `3`, eventueel `3b`/`4`, en de afsluiting als laatste;
   - tussen de eerste en tweede `---` alleen de hoofdstukken (daarna: stem-invoer-notities, begripsblokken-tabel, aantallen);
   - `[STILTE 3]` na een korte begripsvraag, `[STILTE 4]` na de grote denkvraag van het hoofdstuk en na de 'leg het hardop uit'-opdracht;
   - ± 1.100–1.400 woorden, 8–11 min; hooguit 3 nieuwe begrippen per hoofdstuk; begripsblok (ding → naam → anders gezegd → korte denkvraag); 'Hier is het belangrijke punt' hooguit één keer per hoofdstuk; structuur hardop; minstens één misvatting hardop; geen 'kijk/zie je'; geen castnamen; afsluiting: terug naar startvraag, drie dingen om te onthouden, hardop-uitlegopdracht, verwijzing naar de film;
   - tweede aflevering van een gesplitste film: na de opening ± 20 s terugblik op de eerste.
3. `python3 podcasts/maak_segmenten.py podcasts/cellen/<id>` → `segmenten.json` (past de uitspraakregels toe). Lees de afwijkende stem-invoer na; nieuwe risicowoorden: zoek de uitspraak (IPA) op en kies de stem-invoer, en zet ze op de wachtlijst `podcasts/cellen/<id>/uitspraak.md`.
4. **Inspreken**: per segment `creative_generate_speech` met `voice_id` `vjeU1L5RIGPyrwuboFwz` (Remko), `model_id` `eleven_v4`, `generations_count` 1, `flow_id` `cOEno8gxse8pGyFvDe22`, `prompt` = veld `stem`. Hooguit 3 tegelijk lopend. **Nooit opnieuw genereren om te 'herproberen'** (kost dubbel); bij een fout: melden. Zet elk `generation_id` in `segmenten.json`.
5. **Ophalen**: `creative_get_generations` (max 4 ids per keer) → `curl -sS -o /home/claude/podcast-ruw/<id>/<segment-id>.mp3 '<full_res_url>'`. Controleer de duur met ffprobe (een take die veel korter is dan de tekst doet vermoeden = melden).
6. **Bouwen**: `python3 podcasts/bouw.py podcasts/cellen/<id> /home/claude/podcast-ruw/<id>` (intro, overgangen, stiltes, loudnorm; schrijft `audio/` en duur in `segmenten.json`).
7. `info.md` naar het voorbeeld `podcasts/voortplanting/bevruchting/info.md`.
8. **Niet** committen of pushen, **niet** `podcasts/afleveringen.json` aanpassen: dat doet de hoofdsessie aan het eind.

## Ids en films

| id | aflevering | film |
|---|---|---|
| wat-is-leven | 1 Wat is leven? | van-molecuul-tot-biosfeer |
| fabriek-1 | 2 De fabriek: bouwtekening en werkvloer | celorganellen (H1–H3) |
| fabriek-2 | 3 De fabriek: energie, opruimen en grenzen | celorganellen (H4–H7) |
| boterham | 4 Wat groeit er op je boterham? | microben (H1–H3) |
| virussen | 5 Virussen, en wie leeft waarvan? | microben (H4–H5) |
| diffusie | 6 Alles beweegt: diffusie | diffusie-osmose (H1–H3) |
| osmose | 7 De grens: osmose en actief transport | diffusie-osmose (H4–H6) |
| stamcellen | 8 Stamcellen | stamcellen |
| onderzoek-1 | 9 Onderzoek doen: van vraag naar eerlijke proef | onderzoek-doen (H1–H3) |
| onderzoek-2 | 10 Onderzoek doen: kun je de uitkomst vertrouwen? | onderzoek-doen (H4–H8) |
| herhaal | 11 Herhaalaflevering Cellen | alle (hoofdsessie) |
