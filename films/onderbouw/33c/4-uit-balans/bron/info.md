# Uit balans — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/33c/4-uit-balans/index.html` (audio in `audio/`: 10 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, kerndoel 33C (ecosystemen), film 4. Bullet 3: *beschrijven van kringlopen en verstoringen daarvan*; bullet 4: *beschrijven van het dynamisch evenwicht in een ecosysteem en successie* (SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s11: den met kegels die pas na een brand opengaan). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `eu3WpmK12UwZJn3H76QN` (`stem/tts.json`, `stem/generaties.json`; audio opgehaald via de bron-URL in het Scribe-resultaat met `bouw/haal_audio_scribe.py`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`), één transcriptie per take; alle 10 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 171 s; speeltijd Uitdaging ± 3:55, Basis ± 3:40 (met vragen); zonder vragen ± 2:55. Iets onder de 4 minuten van Part D |
| Credits | TTS 2509; Scribe: de tool meldde 0 |
| Beeldstijl | Part C. **Macro-nacht**: één stuk bos dat in stadia getekend wordt (`stukBos({stad 0..6, brand 0..1, stammen})`: as en zwarte stammen → grassen met bloemetjes → struiken en berken → eiken), met `vlammen` en een `jaarTeller` (gouden kaartje rechtsboven). **Schema**: grafiek muizen (oker) en uilen (grijs) met gouden band 'evenwicht', kleine kringloop, vier verstoringskaarten, tijdlijn van vier panelen 'successie', dennenkegel (`kegel(open)`), samenvattingsgrafiek 'hoeveel bos'. Personages: Noor (winter-/zomeroutfit) en Opa Henk. Kleuren: planten groen, brand koraal, mineralen oker, regen teal, focus goud. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; reeksmodus zonder checkpoint, 20 okt 2026; script v1 → review (drie passes, `reviews/review.md`) → v2 |

## Bronbestanden in deze map

Zelfde indeling als film 2 (`../2-wie-woont-waar/bron/info.md`), met `src/scenes4.js`. **Werkmap opzetten:** zoals in film 2, met filmmap `f4`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-nacht | het bos brandt, daarna zwarte stammen; Noor en Opa Henk; ? |
| q02 | Cold open | vraag | komt hier ooit weer bos? |
| s03 | Titel | Schema | titel; paneel met het bos dat teruggroeit |
| s04 | H1 Een bos in evenwicht | Macro-nacht | 'ja, vanzelf, maar het duurt lang'; jaarteller 'vóór de brand'; eikels, muizen, uilen; ? |
| q05 | H1 | vraag | wat gebeurt er het jaar daarna met de muizen? |
| s06 | H1 | Schema | grafiek muizen en uilen schommelen, gouden band 'evenwicht', 'dynamisch evenwicht · het beweegt steeds'; kleine kringloop |
| s07 | H2 De verstoring | Macro-nacht → Schema | brand, 'verstoring', muizen vluchten, as; mineralen (oker) spoelen weg met de regen; vier kaarten brand, storm, overstroming, kappen |
| s08 | H3 Stap voor stap terug | Macro-nacht | '1 jaar later', Noor en Opa Henk; ? |
| q09 | H3 | vraag | welke planten groeien er als eerste? |
| s10 | H3 | Macro-nacht → Schema | zaadjes waaien aan; jaarteller 1 → ± 5 → ± 20 → 50 tot 100 jaar; pioniers, struiken en berken, eiken en beuken; tijdlijn 'successie' met haak |
| s11 | H3, uitdaging | Schema | den; dennenkegel met hars; vlammen, 'hitte: de hars smelt'; kegel opent, zaadjes vallen op kale grond |
| s12 | Samenvatting | Macro-nacht → Schema | het bos groeit terug; grafiek 'hoeveel bos': evenwicht, brand, successie |
| s13 | Eindkaart | Schema | Probeer het zelf: kale plek, tijdmachine, muizengrafiek; open vraag (storm); 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Komt hier ooit weer bos? | nee, blijft kaal · ja, alleen als mensen planten · ja, vanzelf, maar dat duurt lang | c |
| q05 | Wat gebeurt er het jaar na een mastjaar met het aantal muizen? | steeds meer · weer minder · alle muizen dood | b |
| q09 | Een jaar na de brand: welke planten groeien er als eerste? | grote eiken · grassen en snelle kruiden · nog niets | b |
| eindkaart | Een storm blaast tien grote bomen om. Wat groeit er de eerste jaren, en waarom juist daar? | open | — |

## Begrippen

dynamisch evenwicht, verstoring, pioniers, successie, kringloop · uitdaging: brand als begin. `GLOSSARY` op regel 1053.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`.

- Paginatekst: regel 66–152; checkvragen vanaf 96, docentdeel vanaf 110, footer 152. `window.FILMDATA`: 153. `persoon` 696.
- Film-eigen tekeningen: `eik` 916, `stukBos` 921, `vlammen` 936, `eikel` 943, `kegel` 944.
- `const SCENES` 949: `s01` 951, `s03` 958, `s04` 962, `s06` 970, `s07` 988, `s08` 1006, `s10` 1011, `s11` 1027, `s12` 1034, `s13` 1044. `GLOSSARY` 1053, speler vanaf 1062.

## Hoe je de film aanpast

Zoals in film 2. Het stadium van het bos in s10 volgt de woorden 'Grassen', 'struiken', 'verdwijnen.' en 'eiken' (`st = lerp(...)`); de jaarteller wisselt op dezelfde woorden.

## Aandachtspunten

- **Vakinhoud:** de muizen/uilen-grafiek is een schets (geen meting); docentdeel zegt dat. Eik is maar matig schaduwtolerant: film zegt 'kunnen als jong boompje ook in de schaduw groeien'.
- **Lengte:** ± 3:55 met vragen, iets korter dan 4 minuten.
- **Uitspraak:** wachtlijst in `uitspraak.md`.
- **Eindreview:** door de bouwer op contactbladen en speeltest (geen JS-fouten); geen aparte frisse helper beschikbaar. Verwerkt: vlammen verdwenen te vroeg, label 'evenwicht' botste met 'muizen', label bij de kegel lag over de kegel, een boom erbij in de uitdaging.
- **Overlap:** geen primaire/secundaire successie, veerkracht of omslagpunt (bovenbouw).
