# Inspreken Evolutie v2 (helperbrief)

Werkmap per film: `/root/hw/e<N>/` (al klaar: `segments.json`, `script_v2.md`). Engine: `/root/hw/engine/`.

Per film:
1. `mcp__ElevenLabs__creative_create_flow` met naam `Evolutie v2 · film <N> · stem` (film 1 heeft al flow `0jYQkEDLOgztb2FiITqI`; s01 is al opgenomen → overslaan).
2. Voor elk segment met `"kind": "speech"` in segments.json, in volgorde: precies één `mcp__ElevenLabs__creative_generate_speech` met
   `flow_id` = die flow, `voice_id` = `7qdUFMklKPaaAVMsBTBt` (Roos), `model_id` = `eleven_v4`, `generations_count` = 1, `prompt` = het veld `voice` van dat segment, letterlijk (niet `display`, niets toevoegen of veranderen).
   **Nooit een generatie herhalen** (kost credits). Mislukt er één (has_failures), noteer het en ga door; niet opnieuw proberen.
3. Je mag meerdere generaties kort na elkaar starten; poll daarna met `creative_get_flow_run_status` (flow_id + session_ids, tot all_completed) en haal per generatie de `full_res_url` op met `creative_get_generations` (max 4 ids per call). De URL is 2 uur geldig.
4. Download: `curl -sS -o /root/hw/e<N>/raw/<sid>.mp3 '<url>'` en kopieer naar `audio/<sid>.mp3` (`mkdir -p raw audio words stem`).
5. Na alle downloads: `cd /root/hw && python3 engine/silalign.py e<N>` (schrijft `words/<sid>.json`). Controleer dat elk speech-segment een mp3 en words-bestand heeft en dat geen mp3 korter is dan 1 s.
6. Schrijf `e<N>/stem/sessions.json` = `{"flow": "<flow_id>", "<sid>": ["<session_id>", "<generation_id>", <credits>], …}` en `e<N>/stem/gen.json` = `{"<sid>": {"generation_id": "…", "dur": <seconden, ffprobe>}, …}`.

Niet aan andere bestanden komen, niets pushen of publiceren. Rapport: per film aantal segmenten, totale duur, totale credits, en eventuele mislukte segmenten.
