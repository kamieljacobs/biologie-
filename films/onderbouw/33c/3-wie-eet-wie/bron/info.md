# Wie eet wie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/33c/3-wie-eet-wie/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, kerndoel 33C (ecosystemen), film 3. Bullet 2: *verbanden leggen tussen kringlopen, voedselketens, voedselwebben en hun onderlinge samenhang in een ecosysteem* (SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s13: wolf → vos → grondbroeders). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `nPnwM77hjwKV70hsIPTQ` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`), één transcriptie per take; alle 12 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 186 s; speeltijd Uitdaging ± 4:10, Basis ± 3:55 (met vragen); zonder vragen ± 3:10 |
| Credits | TTS 2754; Scribe: de tool meldde 0 |
| Beeldstijl | Part C. **Macro-nacht** voor het bos (`bos({jong})`: lagen bomen, jonge boompjes verdwijnen met `jong` 0..1) met Daan bij het bord 'Hier leven wolven'. **Schema** voor keten (`knoop` met icoon), web, kringloop, tijdlijn (Opa Henk als jager), uitdaging en samenvatting. Dieren via één generieke `viervoeter` (wolf grijs, ree en edelhert bruin, wild zwijn, vos) plus `muis`, `uil`, `raaf`, `aaskever`, `worm`, `pissebed3`, `schimmel`, `bacterie`. Kleuren: plant/producent groen, consumenten oker, reducenten teal, mineralen oker stipjes, focus goud; pijlen van voedsel naar eter. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; reeksmodus zonder checkpoint, 20 okt 2026; script v1 → review (drie passes, `reviews/review.md`) → v2 (+ vraag over de bladeren voor de lengte) |

## Bronbestanden in deze map

Zelfde indeling als film 2 (`../2-wie-woont-waar/bron/info.md`): `brief.md`, `docentdeel.md`, `begrippen.json`, `uitspraak.md`, `index_entry.json`, `script_v1.md`/`script_v2.md`/`script.md`, `reviews/`, `stem/` (segmenten met stem-invoer, woordtijden, generaties, tts), `filmdata.json`, `src/` (config, vragen, `scenes3.js` en de gedeelde onderdelen), `bouw/`.

**Werkmap opzetten:** zoals in film 2, met filmmap `f3` en `scenes3.js`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-nacht bos | Daan loopt naar het bord 'Hier leven wolven'; wolf verschijnt en verdwijnt (stippelcirkel met ?); 'wat gebeurt er met het bos?' |
| s02 | Titel | Schema | titel met wolf, ree en kruiden |
| s03 | H1 Een voedselketen | Macro-nacht | wolf sluipt naar het ree, ree eet kruiden; namen; ? |
| q04 | H1 | vraag | waar begint de rij? |
| s05 | H1 | Schema | zon → kruiden (producent, groen) → ree → wolf (consumenten, oker); pijlen van voedsel naar eter; kaartje edelhert is groter; haak 'niemand eet de wolf' |
| s06 | H2 Een web, en een kringloop | Schema | voedselweb van 9 knopen groeit draad voor draad; pijlen goud bij 'voedselweb'; draad ree → wolf valt weg |
| s07 | H2 | Macro-nacht bos | vallende bladeren, 'een paar jaar later: geen dikke laag', ? |
| q08 | H2 | vraag | waar blijven de dode bladeren? |
| s09 | H2 | Macro-nacht bosbodem → Schema | pissebedden, wormen, schimmels, bacteriën; dood dier met raaf en aaskevers; kringloop dode resten → reducenten → mineralen → plant → ree |
| s10 | H3 Zonder wolf | Macro-nacht | wolf verdwijnt, jonge boompjes omcirkeld, ? |
| q11 | H3 | vraag | wat gebeurt er met de jonge boompjes? |
| s12 | H3 | Macro-nacht → Schema | steeds meer reeën en herten, jonge boompjes verdwijnen; tijdlijn (ruim 150 jaar geleden · mensen jagen · nu); web trilt, haak |
| s13 | H3, uitdaging | Schema | wolf → vos (jaagt weg), meer vossen, grondbroeders; stippelboog 'de wolf helpt de vogels' |
| s14 | Samenvatting | Macro-nacht → Schema | meer reeën, minder jonge bomen; drie kaarten keten, web, kringloop; haak |
| s15 | Eindkaart | Schema | Probeer het zelf: bladproef, webkaartjes, haal er één weg; open vraag (sloot: reiger, kikker, mug); 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | Wolf → ree → … Waar begint zo'n voedselketen? | bij een plant · bij het kleinste dier · bij het grootste dier | a |
| q08 | Waar blijven al die dode bladeren? | vanzelf aarde · kleine diertjes, schimmels en bacteriën breken ze af · de wind blaast ze weg | b |
| q11 | De wolf verdwijnt. Wat gebeurt er met de jonge boompjes? | meer · minder · niets | b |
| eindkaart | Reiger → kikker → muggenlarve: wat gebeurt er met de muggen als de reigers verdwijnen? | open | — |

## Begrippen

producent, consument, voedselketen, voedselweb, reducent, kringloop · uitdaging: grondbroeders. `GLOSSARY` op regel 1097.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`.

- Paginatekst: regel 66–152; checkvragen vanaf 96, docentdeel vanaf 110, footer 152. `window.FILMDATA`: 153.
- `persoon` (lib_cast) 696. Film-eigen tekeningen: `bos` 914, `viervoeter` 931, `wolf` 938, `ree` 942, `hert` 947, `knoop` 968.
- `const SCENES` 972: `s01` 974, `s02` 984, `s03` 988, `s05` 996, `s06` 1012, `s07` 1025, `s09` 1030, `s10` 1047, `s12` 1052, `s13` 1070, `s14` 1080, `s15` 1088. `GLOSSARY` 1097, speler vanaf 1107.

## Hoe je de film aanpast

Zoals in film 2: tekst in `script_v2.md` → `maak_segmenten.py` → alleen die alinea opnieuw inspreken (Roos, eleven_v4) en transcriberen (één Scribe-node per take) → `haal_audio.py`, `woordtijden.py` → `bouw.py`, `cuecheck.py`. Beeld in `src/scenes3.js` (cues via `q.at('woord', n)`; 'meer' komt in s13 twee keer voor, daarom `q.at('meer',2)`).

## Aandachtspunten

- **Vakinhoud:** het effect 'wolf → minder vraat → meer jonge bomen' is in Nederland nog niet aangetoond; docentdeel noemt dat. Jaartal van de laatste wolf bewust vermeden (bronnen lopen uiteen).
- **Uitspraak:** wachtlijst in `uitspraak.md`.
- **Eindreview:** door de bouwer op contactbladen en speeltest (geen JS-fouten); geen aparte frisse helper beschikbaar. Verwerkt: label 'kruiden en jonge boompjes' viel over het ree; kaartje 'edelhert is groter' overlapte 'consumenten'; webknopen werden te klein (28 px) en zijn nu op volle grootte.
- **Overlap:** geen trofische niveaus, piramides of Yellowstone (staan in *Alles gaat rond* en *Plek genoeg?*).
