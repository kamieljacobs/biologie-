# Brief fase B: keuring verwerken, inspreken, bouwen (prompt v10)

Kamiel heeft de twijfelscènes gekeurd (25 okt 2026). Jij maakt één film af tot een gebouwde film met echte stem. Niets in de repo zetten, niet pushen, niets publiceren: dat doet de hoofdsessie.

## Lees eerst
- `/home/claude/biologie-/films/vervolg/BOUWEN.md` (vooral 'Inspreken' en 'Bouwen en kijken'), je eigen `brief.md`, `storyboard.md`, `script_opname.md`, `segments.json`, `bouw.sh`.
- `films/BEELDAFSPRAKEN.md`, Part C van `films/PROMPT_v10.md` en `films/PROMPT_v10_C10_tekenkwaliteit.md` voor wat je aan beeld verandert.
- De keuring voor jouw film staat hieronder in je opdracht (de hoofdsessie heeft het blad al gelezen).

## 1. Keuring verwerken (vóór het inspreken)
Pas scènes en tekeningen aan volgens de keuring in je opdracht. `script_opname.md`/`segments.json` zijn al bijgewerkt door de hoofdsessie waar de tekst veranderde; verander zelf geen gesproken tekst. Leg in `brief.md` onder een kop 'Keuring Kamiel (25 okt 2026)' per punt vast wat je deed.

## 2. Inspreken
- ElevenLabs-tools laden met ToolSearch (`creative_create_flow`, `creative_generate_speech`, `creative_get_flow_run_status`, `creative_get_generations` of wat nodig is om de audio-URL te krijgen).
- Eén flow per film (`creative_create_flow`, naam '<slug> stem'). Per gesproken alinea (soort `speech` in segments.json) precies één `creative_generate_speech`: voice_id `7qdUFMklKPaaAVMsBTBt` (Roos), model `eleven_v4`, generations_count 1, tekst = veld `voice`. Nooit een generatie herhalen of opnieuw starten: elke aanroep kost credits. Wordt er een geweigerd of moet je wachten (limiet op gelijktijdige opnames, er spreken drie films tegelijk in), wacht dan en poll; start hooguit 2 tegelijk.
- Download elke take met curl naar `<d>/raw/<sid>.mp3`, zet de definitieve in `<d>/audio/<sid>.mp3`, lijn uit met `engine/silalign.py` zoals BOUWEN.md zegt (woordtijden in `<d>/words/`, vervangen de nepwoorden), en schrijf `<d>/stem/sessions.json` en `<d>/stem/gen.json` in de vorm van `/home/claude/biologie-/films/vervolg/biotechnologie-2-enzymen-op-maat/bron/stem/`. Noteer de totale credits.
- Luister niet zelf; controleer wel dat elke take ongeveer zo lang is als de tekst (± 2,4 woorden/s). Een take die duidelijk afwijkt (afgebroken, veel te lang): meld hem, niet opnieuw genereren.

## 3. Bouwen en nakijken
`bash <d>/bouw.sh` (zonder fakewords), dan contactsheets van de hele film (`engine/stills.py` + `engine/sheet.py`, bestandsnamen met `_<d>` in de scratchpad). Herstel timing (cues op echte woordtijden), overlap, tekst buiten beeld, lege schermen. `engine/cuecheck.py` schoon.

## Eindbericht (≤ 10 regels)
Duur, credits, flow-id, wat je uit de keuring verwerkte, open punten.
