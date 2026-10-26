# Brief inspreekhelper — Gezondheidswetenschappen (26 okt 2026)

Je spreekt één film in met ElevenLabs. Werkmap: `/home/claude/hw/<d>` (`gz1`). Lees eerst de sectie 'Inspreken' van `/home/claude/hw/BOUWEN.md`.

## Wat je doet
1. Laad de ElevenLabs-tools met ToolSearch in één keer: `select:mcp__ElevenLabs__creative_create_flow,mcp__ElevenLabs__creative_generate_speech,mcp__ElevenLabs__creative_get_flow_run_status,mcp__ElevenLabs__creative_get_generations`.
2. Maak één flow: naam `Gezondheid gz1 · stem` (`creative_create_flow`).
3. Lees `<d>/segments.json`. Voor elk segment met `kind == "speech"` (en alleen die) precies één `creative_generate_speech` op die flow: voice_id `7qdUFMklKPaaAVMsBTBt`, model_id `eleven_v4`, generations_count 1, tekst = het veld `voice` van dat segment (niet `display`). **Nooit een segment opnieuw genereren**, ook niet bij een fout of time-out: wacht met `creative_get_flow_run_status` (wacht `poll_after_seconds`) tot het klaar is. Een geweigerde of wachtende take (limiet op gelijktijdige opnames) wacht je af; daarna pas de volgende starten. Hooguit 3 tegelijk.
4. Download elke take met curl naar `<d>/raw/<sid>.mp3` (de audio-URL staat in de run-status of in `creative_get_generations`; downloaden gaat via storage.googleapis.com en werkt). Controleer met `ffprobe` dat elk bestand een duur heeft.
5. Maak `<d>/audio/<sid>.mp3` = genormaliseerd: `ffmpeg -y -i raw/<sid>.mp3 -af loudnorm=I=-16:TP=-1:LRA=11 -ar 44100 -b:a 128k audio/<sid>.mp3`.
6. Woordtijden: `cd /home/claude/hw && python3 engine/silalign.py <d>` (schrijft `<d>/words/<sid>.json`). Meldt hij een probleem, noteer het; probeer niets anders.
7. Schrijf `<d>/stem/sessions.json` = `{"flow": "<flow_id>", "voice": "7qdUFMklKPaaAVMsBTBt", "model": "eleven_v4", "<sid>": ["<generation_id>", "<session_id>", <credits>], …}` en `<d>/stem/gen.json` = `{"<sid>": {"generation_id", "session_id", "dur"}}` (dur in seconden uit ffprobe). Zie als voorbeeld `/home/claude/biologie-/films/vervolg/ecologie-1-tellen-in-het-veld/bron/stem/`.

## Niet doen
Geen andere stemmen of modellen, geen tweede take, geen uitspraaktest, niets publiceren of pushen, niets in de repo wijzigen.

## Lever
Antwoord met alleen: flow-id, aantal takes, totale duur (mm:ss), totaal credits, en eventuele problemen (segment-id + wat).
