# Inspreken — Hoe weet een cel wat hij moet worden?

Werkmap: /home/claude/werk/dif/film. Segmenten: film/segments.json (alleen `kind: "speech"`). s01 is al ingesproken (raw/s01.mp3).

Per alinea precies één take:
- ElevenLabs `creative_generate_speech` (laad via ToolSearch: `select:mcp__ElevenLabs__creative_generate_speech,mcp__ElevenLabs__creative_get_flow_run_status`), met
  `flow_id` = `CxO7VI8KRQyLblQnjhrQ`, `voice_id` = `7qdUFMklKPaaAVMsBTBt` (Roos), `model_id` = `eleven_v4`, `generations_count` = 1, `prompt` = het veld `voice` van het segment, precies zoals het is.
- **Nooit opnieuw genereren** (elke aanroep kost credits). Mislukt er één of blijft hij hangen: noteer het en ga door; niet opnieuw proberen.
- Je mag een paar alinea's na elkaar starten en dan pollen met `creative_get_flow_run_status` (wacht `poll_after_seconds`). Houd hooguit 4 tegelijk open; wordt een start geweigerd door een limiet, wacht dan tot er een klaar is en start die alinea dan (een geweigerde start heeft niets gekost).
- Is hij klaar: `curl -sS -o raw/<sid>.mp3 "<content_url>"` (in /home/claude/werk/dif/film), controleer met ffprobe dat de duur > 0 is.
- Schrijf per take een regel naar `film/stem/gen_<jouw letter>.jsonl`: `{"sid":..., "generation_id":..., "session_id":..., "dur":...}`.

Als al jouw takes binnen zijn:
1. Loudness: voor elke take `ffmpeg -y -v error -i raw/<sid>.mp3 -af loudnorm=I=-16:TP=-1:LRA=11 -ar 44100 -b:a 128k audio/<sid>.mp3`.
2. Woordtijden: `cd /home/claude/werk/dif && python3 eng/silalign.py film <sid> <sid> ...` (jouw sid's).
3. Eindbericht ≤ 6 regels: aantal takes, totale duur, en sid's die mislukten of opvallend kort/lang zijn (duur vs. aantal woorden: Roos spreekt ± 2,4 woorden per seconde).
