# Wat zit er in je eten? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/1-wat-zit-er-in-je-eten.html (audio in films/voeding/1-wat-zit-er-in-je-eten/audio/) |
| Reeks / nummer | Voeding, film 1 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; één vwo-blok (ADI) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 12 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea |
| Duur | spraak 9:18 (vwo) / 8:12 (havo). Speeltijd met kaarten en vragen: vwo ≈ 11:15, havo ≈ 9:55 |
| Beeldstijl | Part C: Schema (navy #1A2740) met zoomcirkel naar Micro (#121A26 met korrel); UI-laag vast; canvas 1920×1080, ondertitels boven y = 900 of in een band onder het beeld op smalle schermen |
| Audio-opslag | 24 losse mp3's in audio/ (s01 … s31), −16 LUFS, piek < −1 dBTP; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 (geen Google Fonts nodig) |
| Herkomst | gebouwd op 12 oktober 2026 met de bouwstraat in `bouw/` (afgeleid van Celorganellen) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per alinea met duur, audiobestand en stem-invoer waar die afwijkt |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer) en `vmap` (welk ondertitelwoord bij welk stemwoord hoort) |
| `film.json` | Titel, hoofdstukvragen, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML) |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden en de vervangingsregels voor de stem-invoer |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/uitspraaktest.mp3` | ElevenLabs-node en -sessie per take (flow "Voeding film 1"); uitspraaktest |
| `src/` | `scenes.js` (deze film), `lib.js` (Part C-tokens en UI-laag), `lib_voeding.js` (seriebibliotheek), `player.js`, `page.html` (sjabloon), `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `phone.py`, `perf.py`, `fake_words.py` |
| `reviews/` | Expert, didactiek + taal, curriculum, en de eindreview |

**Werkmap opzetten:** maak een map `f1/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-wat-zit-er-in-je-eten/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f1 script_v2.md && python3 engine/build_data.py f1 && python3 engine/build.py f1` → `f1/film/1-wat-zit-er-in-je-eten.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | I · Schema | Vleeseter en vegan, allebei 60 g eiwit; advies aan de vegan; vraag q02 |
| Titel | Schema | Titel, puzzel, broodje kaas en glas melk |
| H1 Wat zit er in een broodje kaas? | B · Schema + zoomcirkel Micro | Moleculenmengsel; bord met zes groepen; rij met vier taken; vraag q08 |
| H2 Branden en bewaren | A/B · Micro + Schema | Zetmeel geknipt tot glucose; 17 tegen 37 kJ; atoomtelling (verdieping); glycogeen + water tegen vet (≈ 9×); melketiket; vraag q13 |
| H3 Eiwit: twintig bouwstenen | B/E · Micro + Schema | Kralensnoer, twintig soorten, negen essentieel; eiwit dat niet af kan; aminozuren in het bloed; graan + peulvrucht; vraag q19 |
| H4 Vezels en het etiket | A · Schema-buis + Schema | Peristaltiek met en zonder vezels; ingrediëntenlijst met E-nummers; vwo: ADI-rekensom en vraag q28 |
| Recap | Schema | Twee leerlingen met rijen essentiële aminozuren; maaltijd met vier taken; vooruitblik film 2 |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom moet de vegan extra op eiwit letten? | b (onthulling verwijst naar H3 en de recap) |
| q08 | basis | Uit welke voedingsstof haalt je lichaam de bouwstenen voor nieuw eiwit? | b eiwitten |
| q13 | basis | Trekvogel: brandstof als vet of als glycogeen? | b vet |
| q19 | basis | Eén essentieel aminozuur is op. Wat gebeurt er? | b eiwit kan niet af |
| q24 | basis | Een maand bijna geen vezels? | b trager |
| q28 | vwo | Kind van 20 kg: na hoeveel blikjes aan de ADI? | b vier |

Checkvragen (statisch in de pagina): 1 Volkoren en vezels · 2 Brood met hummus · 3 Beer in winterslaap · 4 Het beperkende aminozuur (vwo) · 5 Zoetstof in siroop (vwo).

## Techniek: waar zit wat in de HTML

Regelnummers in `1-wat-zit-er-in-je-eten.html` (er zijn geen blobs; de audio staat ernaast).

- Regel 101–154: checkvragen en docentdeel (statische HTML uit `film.json` → `sections`).
- Regel 156: `window.FILMDATA` met `segments` (speech: `words` {t,s,e}, `audio`, `dur`; question: `q`, `options`, `correct`, `explain`), `chapters` en `film` (titel, minis, meta, versie).
- Daarna `lib.js` (Part C-tokens `C`, `label`, `haak`, `zoomCircle`, …) en vanaf regel 377 `lib_voeding.js` (zeshoek/suikerketen, `bead`/`proteinChain`, `triglyceride`, `broodje`, `etiket`, `groepenBord`, `takenRij`, `darmBuis`).
- Regel 613–965: scènes. `SCENES.sNN(ctx, t, q)`; beeldwissels via `q.on('woord', n)` / `q.at('woord', n)` op woorden uit de take.
- Regel 966: `GLOSSARY`.
- Regel 968 e.v.: speler. `buildTimeline()` regel 981 (kaarten 3,5 s, titel 5 s, eindkaart 9 s, vraag 8 + 6 s), `render()` regel 1003, ondertitels `chunks()`/`drawCaption()` regel 1051–1056, toetsenbord in `init()`, testhaak `__still()` regel 1126.

## Zo pas je deze film aan

1. **Tekst in beeld:** zoek de string in `src/scenes.js` bij de juiste `sNN` en bouw opnieuw (`build.py`).
2. **Eén alinea opnieuw inspreken:** pas de alinea aan in `script_v2.md` → `make_segments.py` → neem alleen die alinea op (Roos, eleven_v4, één take, tekst = `voice` uit `segments.json`) → transcribeer met Scribe → `align.py f1 <status.json>` → mastering (zie hieronder) → `build_data.py` → `build.py`. Controleer daarna dat elk `q.on('…')`-woord in die scène nog voorkomt (het controlescript in de bouwsessie staat onder Aandachtspunten).
3. **Mastering per take:** `I=$(ffmpeg -i raw.mp3 -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness" | tail -1 | awk '{print $2}')`, versterking = −15 − I dB, dan `-af "volume=…dB,alimiter=limit=0.84:level=false,afade=t=in:d=0.02" -ar 44100 -ac 1 -b:a 96k`.
4. **Vraag aanpassen:** `film.json` → `questions`; opties staan in `script_v2.md` op de `[VRAAG]`-regel.
5. **Havo/vwo:** zet de markeringen in `script_v2.md`; de speler, hoofdstuklijst en vwo-balk volgen vanzelf.

## Aandachtspunten

- Kamiel kon de uitspraaktest niet beluisteren; ADI ("aa-dee-ie"), quinoa ("kienwa") en E-nummer ("ee-nummer") zijn keuzes van Claude. Na beluisteren eventueel s22, s26, s27, s29 opnieuw.
- s21 (aminozuren in het bloed) is vereenvoudigd: het lichaam breekt ook eigen eiwit af; daarom "een stijging meteen na de maaltijd". Zo vraagt ook het examen het (havo 2025-I vr 24).
- ADI staat als vwo-blok, zoals in de specificatie; mogelijk ook havo-schoolexamenstof.
- Cue-controle: elk `q.on/q.at`-woord in `scenes.js` moet voorkomen in de woorden van zijn segment (op 12 okt: 0 problemen). Frametijd bij 4× CPU-vertraging: mediaan ≤ 3 ms, p95 ≤ 8 ms.
- Versiegeschiedenis: 1.0 (12 okt 2026) — na eindreview: s14 "bijna negen keer", s15 "Lichaamsvet wordt pas een probleem", s22 "Plantaardig voedsel bevat alle negen" en "vlees, zuivel, ei" opnieuw ingesproken; H4 hernoemd tot "Vezels en het etiket"; voorraadbakjes heten "vrije aminozuren in je cellen".
