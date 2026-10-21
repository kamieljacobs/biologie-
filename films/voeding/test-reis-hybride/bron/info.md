# Test: De reis door je buik met stills als opener

- **Bestand:** `films/voeding/test-reis-hybride.html` (noindex; sinds 21 okt 2026 in de Voeding-lijst als "versie 3, met stills"). Kopie van `2-de-reis-door-je-buik.html` van 21 okt 2026 met één toevoeging; audio komt uit `2-de-reis-door-je-buik/audio/`.
- **Wat:** Kamiel wilde stills uit ElevenLabs combineren met de bestaande animatie (21 okt 2026, keuze: stills als opener, eerst als testpagina).
- **Beeld:** 9 stills (gpt-image-2.5-sunburst, 190 credits per stuk, 1.713 totaal) in `test-reis-hybride/stills/`. ElevenLabs-flow: https://elevenlabs.io/app/flows/UmwcmFbMmTl4G82I4uaG
- **Waar het zit:** blok `// ===== Stills uit ElevenLabs als opener` vlak boven `function render()`:
  - `OPENER` = per alinea het beeld, `hold` (seconden) of `tot` (woord waarop de animatie het overneemt), focus `f` en zoom `z`, kop.
  - `VRAAGBEELD` = gedimde still achter elke vraagkaart; titel en eindkaart krijgen het broodje (via `window.__bgImg` in `bg()`).
- **Overnemen in de echte film:** kopieer dat blok en de drie regels in `bg()` en `render()` (zoek op `__bgImg` en `opener(ctx,it,t)`), en zet de stills in `2-de-reis-door-je-buik/stills/`.
