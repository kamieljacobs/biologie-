# Wij hebben de natuur nodig — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/33c/5-wij-hebben-de-natuur-nodig/index.html` (audio in `audio/`: 10 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, kerndoel 33C (ecosystemen), film 5 (laatste film van 33C). Bullet 5: *analyseren van de menselijke afhankelijkheid van ecosystemen* (SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s11: biodiversiteit). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `q5kc3NlQ6MwdxAKoJq8Q` (`stem/tts.json`, `stem/generaties.json`; audio opgehaald via de bron-URL in het Scribe-resultaat met `bouw/haal_audio_scribe.py`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`), één transcriptie per take; alle 10 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 186 s; speeltijd Uitdaging ± 4:10, Basis ± 3:50 (met vragen); zonder vragen ± 3:10 |
| Credits | TTS 2741; Scribe: de tool meldde 0 |
| Beeldstijl | Part C. **Macro-dag** (een ecosysteem 'in werking', zoals 32A film 9): schoolplein, boomgaard in bloei en met appels (`appelboom({bloesem, appels, n})`), close-up van twee bloesems met een bij die stuifmeel meeneemt, stad met en zonder bomen, akker met trekker en gif, tuin met bloemen, wild hoekje en bijenhotel. **Schema**: levende grond met graan en wormen, bestuivers (bij, hommel, zweefvlieg), vier gewassen (driekwart), duin in doorsnede (rivierwater zakt door zand, bacteriën, schoon water, golven), vijf kaarten ecosysteemdiensten, keten gif → minder bijen → minder bestuiving → minder oogst, uitdaging met vijf bestuivers en een koud voorjaar, samenvatting met de lunch. Personages: Lotte (zomer), Dr. Kim (handbestuiving), Noor. Kleuren: water teal, voedsel oker, bestuiving goud, gif koraal, planten groen. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; reeksmodus zonder checkpoint, 20 okt 2026; script v1 → review (drie passes, `reviews/review.md`) → v2 (+ zin over het graan in de levende grond) |

## Bronbestanden in deze map

Zelfde indeling als film 2 (`../2-wie-woont-waar/bron/info.md`), met `src/scenes5.js`. **Werkmap opzetten:** zoals in film 2, met filmmap `f5`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag schoolplein | Lotte legt appel, broodje en flesje kraanwater op een bank; 'wat deed de natuur gratis?' |
| q02 | Cold open | vraag | wat heeft de natuur gratis gedaan? |
| s03 | Titel | Schema | titel, lunch, bij |
| s04 | H1 Een bij in je lunch | Schema → Macro-dag → close-up | levende grond met graan en wormen; boomgaard in bloei, bij vliegt aan; bij brengt stuifmeel van bloem naar bloem; 'bestuiving'; 'wordt een appel'; ? |
| q05 | H1 | vraag | wat gebeurt er in een boomgaard zonder bijen? |
| s06 | H1 | Macro-dag → Schema | weinig appels; Dr. Kim met kwastje ('een streek in China', 'traag en duur'); bij, hommel, zweefvlieg 'gratis'; vier gewassen, driekwart |
| s07 | H2 Water, lucht en koelte | Schema → Macro-dag → Schema | duin in doorsnede: rivierwater, zand = filter, bacteriën, schoon water; duinen houden de zee tegen; stad: zuurstof, schaduw, 'heet' / 'koeler'; vijf kaarten ecosysteemdiensten |
| s08 | H3 Zuinig zijn | Macro-dag akker | trekker spuit 'gif tegen luizen', bijen vliegen; ? |
| q09 | H3 | vraag | wat kan er dan ook gebeuren? |
| s10 | H3 | Schema → Macro-dag tuin | keten gif → minder bijen → minder bestuiving → minder oogst; haak; Noor: bloemen zaaien, wild hoekje, bijenhotel |
| s11 | H3, uitdaging | Schema | vijf bestuivers; koud voorjaar: honingbij en zandbij gedimd; 'de hommels vliegen nog'; biodiversiteit |
| s12 | Samenvatting | Schema → Macro-dag | de lunch met vier diensten, 'ecosysteemdiensten'; boomgaard met appels, Lotte; haak 'wij zijn afhankelijk van ecosystemen' |
| s13 | Eindkaart | Schema | Probeer het zelf: bestuiverstelling, zandfilter, koele plek; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Wat daarvan heeft de natuur gratis voor Lotte gedaan? | alleen de appel · appel en brood, niet het water · alles, ook het water | c |
| q05 | Wat gebeurt er in een boomgaard zonder bijen? | net zoveel appels · veel minder appels · grotere appels | b |
| q09 | Een boer spuit gif tegen luizen. Wat kan er dan ook gebeuren? | alleen luizen dood · ook bijen gewond of dood · bijen sterker | b |
| eindkaart | Noem drie dingen die je vandaag gebruikte en die de natuur gratis deed. Welk ecosysteem deed het werk? | open | — |

## Begrippen

bestuiving, bestuivers, ecosysteemdiensten, afhankelijk · uitdaging: biodiversiteit. `GLOSSARY` op regel 1058.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`.

- Paginatekst: regel 66–154; checkvragen vanaf 96, docentdeel vanaf 110, footer 154. `window.FILMDATA`: 155. `persoon` 698.
- Film-eigen tekeningen: `dagLand` 915, `bij` 917 (ook `hommel`, `zweefvlieg`, `bloesem`, `appel`), `appelboom` 925, `bijenhotel` 932, `thermo5` 1054.
- `const SCENES` 935: `s01` 937, `s03` 944, `s04` 948, `s06` 964, `s07` 980, `s08` 1007, `s10` 1015, `s11` 1030, `s12` 1039, `s13` 1048. `GLOSSARY` 1058, speler vanaf 1066.

## Hoe je de film aanpast

Zoals in film 2. Let op cue-woorden die vaker voorkomen: in s07 is 'water,' het zesde 'water'-woord (`q.at('water,',6)`), in s10 is 'Wij' het vierde woord met 'wij' (`q.at('Wij',4)`).

## Aandachtspunten

- **Vakinhoud:** handbestuiving in China staat in de verleden tijd en zonder oorzaak in de stem; docentdeel nuanceert. 'Driekwart' gaat over de belangrijkste gewassen (Klein e.a. 2007).
- **Uitspraak:** wachtlijst in `uitspraak.md`.
- **Eindreview:** door de bouwer op contactbladen en speeltest (geen JS-fouten); geen aparte frisse helper beschikbaar. Verwerkt: kop 'ecosysteemdiensten' verscheen pas na de eerste kaartjes; slotzin in de samenvatting was onleesbaar (donker op licht) en is nu een pil; de schaal-meta botste met de tekst over driekwart.
- **Overlap:** biologische bestrijding (32A film 9) en voetafdruk/klimaat (*Eén aarde*) bewust weggelaten.
