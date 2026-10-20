# Je darmbewoners — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/6-je-darmbewoners.html (audio in films/voeding/6-je-darmbewoners/audio/) |
| Reeks / nummer | Voeding, film 6 van 6 (slot van de reeks) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s14 (korteketenvetzuren, boterzuur, kiemvrije muizen, obligaat anaeroob), s22–s24 met vraag q23 (darm-hersen-as, verband ≠ oorzaak). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, één variant per take. Opgenomen via de ElevenLabs-flow van film 5 (`tf9JO2aShKlk9GTxgiVk`): nieuwe nodes aanmaken gaf een protocolfout, daarom zijn de TTS/STT-nodes van film 5 hergebruikt en hun prompts overschreven (zie `stem/takes.json` → `nodes`, en de aantekening in de bronmap van film 5) |
| Duur | spraak 11:41 (vwo) / 9:57 (havo). Speeltijd met kaarten en zes vragen: vwo ≈ 13 min, havo ≈ 11 min |
| Beeldstijl | Part C: Micro (#121A26) voor de bacteriën aan de darmwand, de gisting en de korte vetzuren; Schema (navy #1A2740) voor de dikke darm als buis, de populatiegrafiek, het Amsterdamse onderzoek, de probioticum-stippen, het bewijsbord en de recap; Macro (#1E2E4A) voor de man in bed; UI-laag vast; canvas 1920×1080. Filmkleuren: `BAC1` = C.teal, `BAC2` #8FA0B5, `BAC3` #7FC48F (bacteriesoorten), `ZIEK` = C.koraal (Clostridioides difficile), `GAS` #C9D3DF, `KVZ` = C.goud (korte vetzuren), `AB` = C.paars (antibioticum), `WAND` #B9A2C9, `SLIJM` #8FD0E8 |
| Audio-opslag | 19 losse mp3's in audio/ (s01 … s26), −15 LUFS via loudnorm-meting + gain, limiter 0,84, fade-in 20 ms, mono 44,1 kHz 96 kb/s (8,1 MB); niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat in `bouw/` (dezelfde als film 1–5); `lib_voeding.js` ongewijzigd, de darmhelpers staan in `scenes.js` zelf; `player.js` kreeg één aanpassing (eindkaart met vijf regels: `y0`/`st` kleiner) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews. Na de opname zijn alleen de eindkaart en optie c van q23 nog gewijzigd (eindreview); de gesproken tekst is ongewijzigd |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display`, `voice` en `vmap`; eindkaart en q23 bijgewerkt |
| `film.py` → `film.json` | Titel, lead, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML). `film.py` is de bron; `python3 film.py` maakt `film.json` |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `brief.md` | Filmbrief (type, puzzel, misconcepties, leerdoelen, bewust weggelaten, werkwijze) |
| `checkpoint.html` | De checkpointpagina (zelfcheck) zoals die vóór het opnemen is gemaakt, met Kamiels antwoorden verwerkt (niet inkorten; puzzel A; paard in beeld met nuance) |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden, uitkomst van de blinde controle en de wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/voice.json` | ElevenLabs-flow, node, sessie en generatie per take; de stem-invoer per take |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `contact.py`, `phone.py`, `perf.py`, `fake_words.py`, `checkpoint.py` |
| `reviews/` | Expert (microbioomonderzoeker), didactiek + taal, curriculum (havo-CE 2018–2026), en de eindreview (fresh-eyes, na de bouw; onderaan staat wat verwerkt is en wat een keuze voor Kamiel is) |

**Werkmap opzetten:** maak een map `f6/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/6-je-darmbewoners/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f6 script_v2.md && python3 engine/build_data.py f6 && python3 engine/build.py f6` → `f6/film/6-je-darmbewoners.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | H · Macro | Man van zeventig in bed; tijdlijn kuur → diarree → kuur → diarree → donor → beter; vraag q02 |
| Titel | Micro | Zwerm bacteriën |
| H1 Wie woont daar? | B · Schema + Micro | Dunne darm → dikke darm (≈ 1,5 m); wat overblijft: water, vezels, eiwitresten, slijm; water terug (pijlen uit de wand); "geen eigen enzymen"; 40 000 000 000 000; microbioom aan de wand en in het slijm; vraag q06 (open schaaltje in de stoof) → zuurstof via het bloed naar de wand, dieper bijna niets; nabootsen: geen zuurstof, 37 °C, licht zuur; mutualisme-schema; bewijsbord verschijnt met "40 biljoen bacteriën zonder zuurstof" |
| H2 Wat ze voor je doen | A · Micro | Vezels, schaar van bacterie-enzymen; cellulose blijft grotendeels heel; bord bonen; vraag q10 → gisting: energie, CO₂ en H₂, archaea → CH₄ bij 1 op de 3; ½–1½ L per dag; korte vetzuren naast het vetzuur uit film 3 → brandstof voor de wand, 5–10 %; vitamine K; het paard (kleine dikke darm rechts: reusachtig, cellulose wél afgebroken, bij ons klein maar nuttig); lactose → water vast → diarree. Vwo s14: azijnzuur/propionzuur/boterzuur, kiemvrije muis naast gewone muis, obligaat anaeroob |
| H3 Als het misgaat | D/H · Schema + Micro | Pil boven de zwerm; populatiegrafiek (drie soorten, kuurband, herstel; de ziekmaker laag tot "in kleine aantallen"); vraag q16 → twee stappen; spore-paneel; resistentie ≠ uitgroei; gifstoffen → ontstoken wand → diarree; nieuwe kuur, sporen blijven; donor → slangetje → Amsterdams onderzoek met loting (8 van de 10 tegenover 3 van de 10, vroegtijdig gestopt); bewijsbord: vastgesteld / waarschijnlijk; probioticum-stippen (vraag q20) → controlegroep en loting; bewijsbord met definities; overgewicht als hypothese. Vwo s22–s24: darm-hersen-as (darm ↔ hersenen, muizen), vraag q23 → verband ≠ oorzaak (a/b-pijlen, broodje als confounder) |
| Recap | Schema + Macro | Antwoord b bij de man; dat het werkt: vastgesteld, waarom: waarschijnlijk; het broodje: vezels vergist, water terug, ontlasting bruin, ⅓ bacteriën; lijnenkaart van film 2 (geknipt · opgenomen · langs de lever · opgegeten door je darmbewoners) |
| Eindkaart | Schema | Vijf kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Na een antibioticakuur krijgt een man steeds opnieuw diarree. Hij krijgt ontlasting van een gezonde donor in zijn darm, en geneest. Waarom werkt dat? | b de donorbacteriën nemen de plek en het voedsel in de darm weer in (onthulling in H3 en recap) |
| q06 | basis | Een leerling doet ontlasting op een voedingsbodem in een open schaaltje, in een stoof van 37 °C. Er groeit bijna niets. Hoe komt dat? | b er komt te veel zuurstof bij |
| q10 | basis | Iemand eet een bord bonen. Een paar uur later: winden. Hoe halen de darmbacteriën energie uit de suikers van die bonen? | b door gisting, zonder zuurstof |
| q16 | basis | Na een antibioticakuur groeit juist de ziekmaker Clostridioides difficile enorm uit, terwijl hij er daarvoor ook al zat. Waardoor? | b de andere soorten zijn weg, dus hij heeft geen concurrentie meer |
| q20 | basis | Honderd mensen nemen een probioticum tijdens een antibioticakuur; zeventig krijgen geen diarree. "Bewezen", zegt de reclame. Wat ontbreekt er? | a een groep die dezelfde kuur krijgt, zonder het drankje |
| q23 | vwo | Mensen met een depressie hebben vaak een ander microbioom. Wat mag je daaruit concluderen? | c alleen dat de twee samengaan, niet wat de oorzaak is |

Checkvragen (statisch in de pagina): 1 Drie soorten, één kuur (grafiek P/Q/R) · 2 Zoetstof (sorbitol) · 3 Juist of onjuist · 4 Onderzoek opzetten (vezelrijk dieet) · 5 De panda op het bewijsbord (vwo).

Begrippen: microbioom, waterresorptie, vezels, anaerobe dissimilatie (gisting), korte vetzuren, mutualisme, antibioticum, spore, Clostridioides difficile, concurrentie om voedsel en ruimte, poeptransplantatie, controlegroep, vastgesteld / waarschijnlijk / hypothese, korteketenvetzuren (vwo), obligaat anaeroob (vwo), darm-hersen-as (vwo).

## Waar wat in de HTML zit (regelnummers in `6-je-darmbewoners.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Voeding" |
| 70–95 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 96–140 | Hoofdstukken, Begrippen, Checkvragen (101–113), Voor de docent (114–138), Transcript |
| 142 | `window.FILMDATA` — alle segmenten, woordtijden, vragen, titelkaart, eindkaart (uit `build_data.py`) |
| 144–363 | `lib.js`: Part C-tokens (144–153), helpers, `label`, `tag`, `zoomCircle`, `particleFlow`, `human` |
| 364–938 | `lib_voeding.js`: seriebibliotheek (bloed, lymfe, fiber, bead, fattyAcid, waterMol, vitamin, buisPad, kanaalKaart, broodje …) |
| 939–1327 | `scenes.js` van deze film: gedeelde scènestukken 939–945, kleuren 946–956, bacteriën `bact` 959 · `zwerm` 967 · `darmwand` 973 · `dikkeDarm` 985, `wrapN` 991, bewijsbord `VAKKEN`/`bewijsbord`/`bordKlein` 993–1004, populatiegrafiek `SOORTEN` 1009 · `ZIEK_F` 1014 · `populaties` 1015, `bedMan` 1026, `pil` 1036, `tijdlijn` 1037, `petri` 1047, `stoof` 1053, `gasbel`/`kortVetzuur`/`suikertje` 1056–1058, `muis` 1059, `groepStippen` 1060; `SCENES` 1063 met s01 1065 · s04 1075 · s05 1092 · s07 1103 · s08 1115 · s09 1130 · s11 1143 · s12 1157 · s13 1173 · s14 1182 · s15 1195 · s17 1206 · s18 1229 · s19 1254 · s21 1264 · s22 1277 · s24 1288 · s25 1303 · s26 1314 |
| 1329–1495 | `GLOSSARY` (1329) en `player.js`: afspelen, vraagkaarten, ondertitels, niveau-filter (1347: havo slaat vwo-segmenten over), vwo-markering, eindkaart met vijf regels |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, neem die take opnieuw op (zie `uitspraak.md`), transcribeer voor de woordtijden, en bouw opnieuw. Alleen een ondertitelwoord anders schrijven zonder nieuwe opname: wijzig het script en draai `make_segments.py` + `align.py` op de bestaande woordtijden.
- **Een vraag of de checkvragen:** `film.py` → `python3 film.py` → `build_data.py` + `build.py`. De antwoordopties staan in het script bij `[VRAAG]` en in `segments.json`.
- **De eindkaart:** de regels staan in `script_v2.md` onder `## Eindkaart` en in `segments.json` (`kind: card`, `lines`); maximaal ≈ 85 tekens per regel, vier of vijf regels.
- **Beeld van een scène:** `src/scenes.js`, functie `sNN(ctx, t, q)`; `q.on('woord', n, duur)` geeft 0→1 vanaf de n-de keer dat dat woord (als deel van een woord, hoofdletterongevoelig) wordt gezegd — kies dus een woord dat niet eerder als deel van een ander woord voorkomt (de eindreview vond vijf van zulke missers). Controleer met `python3 engine/stills.py f6 uit "sNN|tijd"` (losse stills) of `FIVE=1 python3 engine/stills.py f6 uit contact` (vijf per segment).
- **De populatiegrafiek:** `populaties(ctx, u, a, {ziek, herstel, uZiek})`; de soortcurves staan in `SOORTEN`, de ziekmaker in `ZIEK_F`; `uZiek` kapt de ziekmakerlijn af (s15 gebruikt 0,42).
- **Een extra vwo-blok:** in het script tussen `[VWO-START]` en `[VWO-END]`; de speler slaat die segmenten over bij Havo.
- **Kleuren / seriebibliotheek:** `src/lib_voeding.js` is gedeeld met film 1–5; verander daar niets zonder de andere films opnieuw te bouwen.

## Aandachtspunten

- De takes zijn opgenomen op de hergebruikte nodes van de film-5-flow; de prompts van die nodes dragen nu de film-6-tekst. De generatie-id's van film 5 staan nog in de `takes.json` van film 5, dus die audio blijft terugvindbaar.
- `koolstofdioxide` (s11) is zonder de "koolstofdie-oxide"-respelling opgenomen; de blinde Scribe-controle hoorde het goed, maar beluisteren en vergelijken met film 5.
- Speelduur vwo ≈ 13 min, de langste van de reeks; Kamiel koos bij het checkpoint bewust voor niet inkorten. Mocht dat later toch: s17 (60 s) en s18 (57 s) zijn de kandidaten (de zin over resistentie kan naar de q16-uitleg).
- Niet-verwerkte eindreviewpunten (vragen heropname): s22 "via het bloed en de zenuwen" → "via het bloed … en prikkelen zenuwen"; s19 "een drankje" → "bijvoorbeeld een drankje"; s17 "gifstoffen, toxinen". Staan in `reviews/eindreview.md` onderaan.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: mutualisme (tussen de pijlen), poeptransplantatie (boven het bed). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

- **Vaste personages i.p.v. kale poppetjes**: de man van zeventig in bed (s01, s18, s25; `bedMan` regel 1311) is nu **Opa Henk** (71), liggend met zijn hoofd op een kussen en zijn lijf onder de deken (`liggend()` uit `cast_hulp.js`; bezorgd gezicht als hij ziek is, blij als hij beter is); s08 (mens en bacteriën, mutualisme, regel 1399): **Noor** die naar de bacteriën wijst; s18 (gezonde donor, regel 1513): **Sam** (groene hoodie). 'VOORBIJ DE MAAG' staat nu onder het slangetje, niet meer over Henks hoofd.
- Bewust **niet** vervangen: de kleine pictogrammen in s18 (rij van 10 bij 'loting' en de 2 × 10 patiënten 'genezen / niet genezen', groen/koraal). Dat zijn telpoppetjes in een grafiek, geen personages.
- Onthoud-kaart (s13) nagekeken: klopt.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/6-je-darmbewoners.html films/voeding/6-je-darmbewoners/bron [--filmdata <filmdata.json> --nieuw sNN]` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; niet volledig herbouwen met build.py, de HTML heeft latere spelerwijzigingen die niet in `src/player.js` staan). Scènesblok: regel 947–1612 (`const SCENES` op 1347).
