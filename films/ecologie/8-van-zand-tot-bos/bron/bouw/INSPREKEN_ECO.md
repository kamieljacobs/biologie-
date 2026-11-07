# Inspreken Ecologie v2 (helperbrief)

Werkmap per film: `/root/hwe/e<N>/` (N = 1–8; al klaar: `segments.json`, `script_v2.md`). Engine: `/root/hwe/engine/`.

De stem-invoer staat al op het script: veld `voice` in `segments.json` (Kamiels vaste uitspraakregels uit `films/uitspraak.json` + film-eigen regels uit `uitspraak_film.json`, jaartallen als "het jaar 1988"). Niets aan de tekst veranderen.

Per film:
1. `mcp__ElevenLabs__creative_create_flow` met naam `Ecologie v2 · film <N> · stem`.
2. Voor elk segment met `"kind": "speech"` in segments.json, in volgorde: precies één `mcp__ElevenLabs__creative_generate_speech` met
   `flow_id` = die flow, `voice_id` = `7qdUFMklKPaaAVMsBTBt` (Roos), `model_id` = `eleven_v4`, `generations_count` = 1, `prompt` = het veld `voice` van dat segment, letterlijk (niet `display`, niets toevoegen of veranderen).
   **Nooit een generatie herhalen** (kost credits). Mislukt er één (has_failures), noteer het en ga door; niet opnieuw proberen.
3. Je mag meerdere generaties kort na elkaar starten; poll daarna met `creative_get_flow_run_status` (flow_id + session_ids, tot all_completed) en haal per generatie de `full_res_url` op met `creative_get_generations` (max 4 ids per call). De URL is 2 uur geldig.
4. Download: `curl -sS -o /root/hwe/e<N>/raw/<sid>.mp3 '<url>'` en kopieer naar `audio/<sid>.mp3` (`mkdir -p raw audio words stem`).
5. Na alle downloads: `cd /root/hwe && python3 engine/silalign.py e<N>` (schrijft `words/<sid>.json`). Controleer dat elk speech-segment een mp3 en words-bestand heeft en dat geen mp3 korter is dan 1 s.
6. Schrijf `e<N>/stem/sessions.json` = `{"flow": "<flow_id>", "<sid>": ["<session_id>", "<generation_id>", <credits>], …}` en `e<N>/stem/gen.json` = `{"<sid>": {"generation_id": "…", "dur": <seconden, ffprobe>}, …}`.

Omvang (speech-segmenten · woorden in `voice`): 1: 45 · 1733 — 2: 41 · 1481 — 3: 42 · 1590 — 4: 37 · 1203 — 5: 39 · 1406 — 6: 34 · 1227 — 7: 50 · 1645 — 8: 33 · 1066. Totaal 321 alinea's, 11 351 woorden.

Alleen in `/root/hwe/e<N>/` schrijven; niet aan andere bestanden komen, niets in `/root/biologie-`, niets pushen of publiceren. Rapport: per film aantal segmenten, totale duur, totale credits, en eventuele mislukte segmenten.
