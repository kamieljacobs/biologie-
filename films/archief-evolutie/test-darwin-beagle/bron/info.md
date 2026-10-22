# Testfilm Darwin en de Beagle

- **Bestand:** `films/archief-evolutie/test-darwin-beagle.html`, bestanden in `films/archief-evolutie/test-darwin-beagle/`
- **Wat:** test (21 okt 2026) van ElevenLabs-beeld gecombineerd met animatie door Claude. Eén pagina met twee versies: A = stills + 2 videoclips, B = alleen stills. `#B` in de link opent versie B.
- **Status:** test, voorlopig op de site onder Evolutie (Kamiel 21 okt 2026: "voor nu even"). Geen vragen aan/uit, geen snelheid, geen begrippen: het is geen FILMDATA-film.
- **Niveau:** havo/vwo, 1 minuut.
- **Stem:** Roos, eleven_v4, één take (zie script.md).
- **Beeld:** 6 stills gpt-image-2.5-sunburst (1280×720, 190 credits per stuk): beagle, darwin, galapagos, gould, grondvink, zangervink. Clips: `clip-beagle.mp4` (Veo 3.1 Fast, 8 s, 7.272 credits, geluid eruit gehaald), `clip-vink.mp4` (Kling 2.5 Turbo, 5 s, 2.121 credits). ElevenLabs-flow: https://elevenlabs.io/app/flows/KytnTgueOrXZHJfwXDPP
- **Kosten:** A 11.412 credits, B 2.019 credits.

## Waar wat zit
- Scènes: array `scenes` in het script (start/eind in seconden, beeld, zoom `kb` van→naar, chips `ov` en lijnen `svg` met `data-in` = tijd waarop ze verschijnen).
- Stamboomscène: functie `treeSVG()`; vinkenkopjes: `finchHead()`.
- Versie A/B: `setVersion()`; in A nemen de clips de beweging van scène 1 en 7 over (`clip.rate` = afspeelsnelheid).

## Aanpassen
- Tekst van een label: zoek de tekst in `scenes` en pas hem aan; tijd via `data-in`.
- Nieuwe stem: vervang `voice.mp3` en schuif de `start`/`end`- en `data-in`-tijden mee.
