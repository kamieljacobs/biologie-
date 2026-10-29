# Diffusie en osmose — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/diffusie-osmose/index.html (audio in films/cellen/diffusie-osmose/audio/) |
| Reeks / nummer | Cel, film 1 van 3 ("Biologie bij Kamiel · reeks Cel · film 1 van 3"); film 2 = Celorganellen |
| Doelgroep / niveau | havo + vwo met gelabelde vwo-blokken (Havo/Vwo-schakelaar; standaard Vwo). Vwo-blokken: gefaciliteerde diffusie (H4) en natrium-kaliumpomp (H6). Iso-/hypo-/hypertonisch staat op verzoek van Kamiel in het havo-deel |
| Versie / datum | Versie 2.0 · 29 oktober 2026 (beeld-remake op prompt v13, takes behouden; zie "Versie 2.0" onderaan). Eerder: 1.2 · 16 oktober 2026 (in `oud/index-1.2.html`), 1.1 · 12 oktober 2026 |
| Voldoet aan | prompt v13 (29 okt 2026, beeld-remake, takes behouden) |
| Prompt | v13 |
| Stem / model | Roos (ElevenLabs, model eleven_v4, voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment; woordtijden met Scribe (eleven_scribe_v1) |
| Duur | 10:02 gesproken (som van 24 mp3's: 602 s; vwo-blokken 50 s). Speeltijd met kaarten en vragen (versie 1.2): Vwo 12:47, Havo 11:47, Vwo zonder vragen 9:55. `script.md` heeft de begintijden per segment. `data-duur="9"` op de tellerscript-tag is de oude gesproken duur in minuten (alleen voor de kijkcijferteller; bijwerken met `scripts/teller.py` als dat gewenst is) |
| Beeldstijl | Part C-stijlkaart: Micro (#121A26, zonder korrel), Schema (#1A2740), Macro (bootje op zee). Sinds 2.0 getekend met de beeldbank (`membraanBoog`, `celRond`, `plantencel`, `rodeBloedcel`, `bloedvat`, `longblaasje`, `wortelHaren`, `eiwitVouw`) en eigen moleculen (`src/scenes_mol.js`). Kleurbetekenis: goud = kleurstof (focus), teal = water (H₂O) en zuurstof, koraal = ATP/energie, groen = conclusie/celwand en K⁺, grijs = CO₂, oker = glucose/mineralen/Na⁺, grijsblauw = Cl⁻, paars alleen de vwo-balk. Canvas 1920×1080, ondertitels onder CAPTION_Y = 900 |
| Audio-opslag | 24 losse mp3's in audio/ (s01, s04, s05, s06, s08, s09, s11, s12, s14, s15, s17, s18, s20, s21, s22, s23, s25, s27, s28, s29, s31, s32, s33, s35), gemasterd op −16 LUFS / −1,5 dBTP (ffmpeg loudnorm, twee passes, lineair) |
| Herkomst | Eerste versie ("Alles beweegt") door Kamiels broer, naar ontwerp van Kamiel Jacobs. Deze remake in Part C: Claude met Kamiel (12 okt 2026), met dezelfde bouwstraat als Celorganellen. Op verzoek van Kamiel (16 okt 2026) staat de broer voorlopig niet in de credits; ze werken samen |

## Echte bronbestanden (in deze map)

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, [VWO-START]/[VWO-END] en [VRAAG]. Lege regels = grens tussen takes. `script_v1.md` = vóór de reviews |
| `script.md` | Gesproken tekst per segment met begintijd, duur, mp3 en afwijkende stem-invoer; vragen met juiste antwoord |
| `stem/segmenten_stem-invoer.json` | Per segment `display` (scherm) en `voice` (letterlijke stem-invoer met respellings) |
| `stem/uitspraaklijst.md` | Respellings en waarom; ElevenLabs-model en flows |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe) |
| `stem/uitspraaktest.mp3` | A/B-test van de risicowoorden |
| `src/lib.js` | Part C-tokens en reeksbibliotheek (gedeeld met Celorganellen) |
| `src/lib_cast.js` | Kopie van `personages/lib_cast.js` (29 okt 2026) |
| `src/lib_bio.js`, `src/lib_bio_deel.js` | Kopie van `bibliotheek/lib_bio.js` (29 okt 2026) en het uittreksel dat in de film staat (`bouw/bio_deel.py`, zie 'Hoe je de film aanpast') |
| `src/voeding_deel.js` | `V`, `hexagon`, `bead` uit `films/voeding/1-wat-zit-er-in-je-eten/bron/src/lib_voeding.js` (nodig voor de beeldbank) |
| `src/scenes_lib.js` | Helpers voor deze film: deterministische deeltjessimulatie `sim()`, pijlen, drukmeter, thermometer, bekerglas, pill, kaart, ATP-molecuul, membraanboog-rekenhulp `mY`/`mA` |
| `src/scenes_mol.js` | Nieuw in 2.0: moleculen (`h2o`, `waterField`, `kleurstof`, `ionMol` met watermantel, `glucoseMol`, `o2`, `co2`, `mineraalIon`), membraan via de beeldbank (`memH`, `memV`), `dragerEiwit`, `pompEiwit`, `bloedcelOsmose`, `fosfolipideGroot`; recept als commentaar boven elke functie |
| `src/scenes.js` | Eén scènefunctie per segment |
| `oud/` | Versie 1.2: `index-1.2.html`, `src-1.2/`, `info-1.2.md` |
| `storyboard-remake.md`, `opwaardering-v13.md`, `bronnen.md` | Storyboard van de remake, lijsten voor Kamiel, bronnenlogboek |
| `src/player.js` | Speler (tijdlijn, vragen, Havo/Vwo, Leerling/Klas, ondertitels) |
| `src/page.html` | Sjabloon met kop, checkvragen, docentdeel, begrippen; placeholders `/*FILMDATA*/ /*LIB*/ /*SCENES*/ /*PLAYER*/ /*NAV*/` |
| `bouw/*.py`, `bouw/checkcues.js` | Bouwstraat, stills, tests; `checkcues.js` controleert dat elk `q.at('woord',n)` in de take bestaat |
| `reviews/` | Scriptreviews (vakexpert, didactiek + taal, curriculum) en de beeldreview met wat ermee gedaan is |

## Opbouw (Vwo; Havo tussen haakjes waar anders)

| Begin | Hoofdstuk | Look | Kernbeeld |
|---|---|---|---|
| 0:00 | Cold open | Schema → zoomcirkel Micro | Druppel kleurstof in stil water; wolk, uiteindelijk egaal; doorgestreepte lepel |
| 0:28 | Titel (5 s) | Micro | "Diffusie en osmose — Alles beweegt" met wolk deeltjes |
| 0:33 | H1 Alles beweegt | Micro | Gesimuleerde willekeurige beweging; één deeltje met spoor; stoten van watermoleculen; koud naast warm |
| 1:06 | H2 Van veel naar weinig | Micro + grafiek | 150 deeltjes links; tellers; pijldikte naar rechts/terug evenredig met het aantal aan elke kant; live grafiek; evenwicht |
| 2:25 | H3 Wat maakt het sneller? | Schema | Vier factoren; 2× afstand → 4× tijd; longblaasje met haarvat, O₂ in, CO₂ uit |
| 3:39 | H4 Het celmembraan (+ vwo-blok) | Micro | Dubbele laag; bouw: fosfolipide (kop hydrofiel, staarten hydrofoob) en gebogen dubbellaag; O₂/CO₂ erdoor; Na⁺ (lading + watermantel) en glucose kaatsen terug; waterkanaal; eigen doorgang glucose; vwo: kanaal- en dragereiwit |
| 6:01 (5:15) | H5 Osmose | Schema, Micro | Opstelling; 'zout trekt' doorgestreept, 'minder water' = de oorzaak, maar het water stroomt als geheel; porie-close-up met terugkaatsend gehydrateerd zout dat het water een duw geeft, lagere druk in de opening, drukmeters in een strook bovenin, stroom; kaarten osmose / in je boek / op een toets onderin; U-buis; deeltjes tellen (NaCl 2, glucose 1); plantencel (ruimte bij plasmolyse gevuld met zout water); komkommer; rode bloedcel; iso/hypo/hyper; infuus |
| 10:25 (9:38) | H6 Actief transport (+ vwo-blok) | Schema, Micro | Passief transport samengevat; wortelhaarcel; pomp met ATP-molecuul (fosfaat springt eraf); lekken via kanaal als ATP op is; vwo: Na/K-pomp in drie stappen (3 Na⁺ binden binnen + ATP → ADP + P; omklappen, Na⁺ los buiten; 2 K⁺ binden buiten, terugklappen, K⁺ los binnen), voorraad aan beide kanten telt zichtbaar op |
| 11:29 (10:28) | Recap | Schema, Macro | Vijf panelen; bootje op zee |
| 12:38 (11:38) | Eindkaart (9 s) | Schema | Drie kernzinnen; versie 1.2 · 16 oktober 2026 |

## Vragen (juiste antwoord vet)

| Id | Niv. | Vraag | Opties |
|---|---|---|---|
| q02 | basis | Niemand heeft geroerd. Hoe komt de kleurstof dan overal? | elkaar wegduwen · naar de lege plek · **kriskras bewegen** |
| q07 | basis | Evenveel links en rechts: wat doen de deeltjes? | stilstaan · **doorbewegen, evenveel heen als terug** · verzamelen in het midden |
| q10 | basis | Cel twee keer zo dik: hoe lang tot zuurstof het midden bereikt? | 2× · **≈ 4×** · even lang |
| q13 | basis | Welke stof komt het makkelijkst door het membraan? | **zuurstof** · natriumion · glucose |
| q16 | vwo | Kost gefaciliteerde diffusie ATP? | ja · **nee** |
| q19 | basis | Zuiver water / zout water: wat doet het water? (uitleg: naar de hoogste concentratie opgeloste deeltjes) | naar links · **naar rechts** · niets |
| q24 | basis | Komkommer met zout: waar komt het water vandaan? | **uit de cellen** · uit de lucht · zout smelt |
| q26 | basis | Rode bloedcel in zuiver water? | krimpt · **zwelt en barst** · niets |
| q30 | basis | Wortelhaarcel neemt mineralen op tegen het verschil in. Hoe? | diffusie · osmose · **pomp in het membraan** |
| q34 | basis | Waarom geen zeewater drinken? | **cellen verliezen water** · te veel water · bacteriën |

## Begrippen
deeltjesbeweging, diffusie, concentratie, concentratieverschil (concentratiegradiënt), evenwicht, longblaasje, celmembraan, fosfolipide, hydrofiel / hydrofoob, selectief doorlatend (selectief permeabel), semipermeabel, osmose, osmotische waarde, plasmolyse, turgor, hemolyse, isotonisch, hypotonisch, hypertonisch, passief transport, actief transport, ATP; vwo: kanaaleiwit, dragereiwit, gefaciliteerde diffusie, natrium-kaliumpomp.

## Docentdeel
Op de pagina zelf: tabel "Hoe de film het uitlegt", de natuurkundige uitleg van osmose (Kramer & Myers 2013), misconcepties, pauzemomenten, getallen met bron of berekening, vereenvoudigingen, leerdoelen en dekking, practicumsuggesties. Zes checkvragen in examenstijl (vier basis, twee vwo).

## Waar wat in de HTML zit (`index.html`, versie 2.0)

| Regel | Inhoud |
|---|---|
| 74 | Sitebalk: "Biologie bij Kamiel" en "← Terug naar Cellen" |
| 99 | Checkvragen |
| 117 | Docentdeel |
| 169 | Footer met credits en versie (2.0 · 29 oktober 2026) |
| 170 | `window.FILMDATA` (segmenten, woordtijden, vragen, antwoorden) |
| 171 | Part C-tokens (`const C`) en reeksbibliotheek (lib.js) |
| 374 | Castboek `lib_cast.js` |
| 1201 | `voeding_deel.js` (`V`, `hexagon`, `bead`) |
| 1237 | Uittreksel beeldbank (`lib_bio_deel.js`): `membraanBoog` 1342, `plantencel` 1908, `longblaasje` 2060, `wortelHaren` 2103 (ook `celRond`, `rodeBloedcel`, `bloedvat`, `eiwitVouw`) |
| 2173 | Filmhelpers (scenes_lib.js): `sim()` 2173, `atp()` 2230, `circ()` 2247 |
| 2249 | Moleculen en eiwitten (scenes_mol.js): `h2o` 2258, `ionMol` 2285, `memH` 2318, `dragerEiwit` 2345, `pompEiwit` 2352, `bloedcelOsmose` 2365 |
| 2430 | `const SCENES`; s01 2432, s04 2457, s05 2488, s06 2503, s08 2515, s09 2525, s11 2549, s12 2583, s14 2621, s15 2649, s17 2666, s18 2678, s20 2692, s21 2713 (porie), s22 2752, s23 2783, s25 2820, s27 2830, s28 2844, s29 2866, s31 2883, s32 2901, s33 2939, s35 2980 |
| 3000 | Begrippenlijst (`GLOSSARY`) |
| 3099 | Titelkaart (`drawTitle`, wolk van kleurstof- en watermoleculen); eindkaart `drawEnd` 3113 |

Pas nooit `index.html` direct aan: wijzig de bron in `src/` en bouw opnieuw.

## Hoe je de film aanpast

**Werkmap opzetten** (buiten de repo): kopieer `bron/src/`, `bron/bouw/*`, `bron/script_v2.md` naar een werkmap (sinds 1.2 bouwen `src/` en `bouw/` exact de live `index.html`; speler en pagina zijn weer gelijk); `stem/segmenten_stem-invoer.json` → `segments.json`; `stem/woordtijden/` → `words/`; mp3's uit `../audio/` → `master/` en `film/audio/`. Daarna `python3 build_data.py && python3 build.py && node checkcues.js`. Resultaat: `film/index.html` (site) en `film/standalone.html` (zonder sitebalk).

**Bouwen sinds 2.0:** `bouw/build.py` plakt het scèneblok uit `lib_cast.js`, `voeding_deel.js`, `lib_bio_deel.js`, `scenes_lib.js`, `scenes_mol.js`, `scenes.js`. Nieuwe beeldbankfunctie nodig: kopieer `bibliotheek/lib_bio.js` naar `src/lib_bio.js` en maak het uittreksel opnieuw: `python3 bio_deel.py src/lib_bio.js src/lib_bio_deel.js src/lib.js src/lib_cast.js src/voeding_deel.js src/scenes_lib.js src/scenes_mol.js src/scenes.js src/player.js -- BIO membraanBoog celRond plantencel rodeBloedcel bloedvat eiwitVouw longblaasje wortelHaren _kkHelix _kkPad` (+ de nieuwe naam). Op de site zetten zonder de nabewerkingen kwijt te raken: `python3 bouw/splice.py <live index.html> <uit>` (vervangt alleen het scèneblok, de titelwolk en de versieregels), daarna de vaste scripts. Contactbladen: `python3 contact2.py <uit> 4 [s21,s23]` en `python3 klein.py 1100 '<uit>/sheet_*.png'`; vragen uit nalopen: `python3 bouw/vragenuit.py` (met de repo geserveerd op poort 8766).

**Beeld wijzigen:** pas de scène in `src/scenes.js` aan (cue-woorden via `q.at('woord', n)`; n telt alle woorden die het woord bevatten, dus "Glucose" vindt ook "glucose,"). Controleer met `python3 shots.py uit s21:20 s21:30`, `python3 contact2.py uit 4 [s12,s21]` (contactbladen per segment) en `node checkcues.js`. Speler en telefoon (390 px): `python3 test_v12.py` met `python3 -m http.server 8765` in de werkmap.

**Tekst wijzigen:** pas `script_v2.md` aan → `python3 make_segments.py` → zet in `segments.json` `s03` op `kind: title` en `s36` op `kind: card` → spreek alleen de gewijzigde segmenten opnieuw in (Roos, eleven_v4, één take, invoer uit `voice`) → Scribe-woordtijden naar `words/sNN.json` → mastering (`loudnorm=I=-16:TP=-1.5:LRA=11`, twee passes, `linear=true`) → `build_data.py` → `build.py` → `checkcues.js`. Let op: het aantal woorden in `display` moet gelijk zijn aan het aantal woorden in de transcriptie (gekoppelde woorden met streepje tellen als één).

**Vragen wijzigen:** `answers` en `questions_text` in `bouw/build_data.py`; opties staan in `script_v2.md` achter [VRAAG].

**Op de site zetten:** `film/index.html` → `films/cellen/diffusie-osmose/index.html`, mp3's → `audio/`, en de gewijzigde bron mee in dezelfde commit.

## Aandachtspunten
- Uitspraak van de risicowoorden is door Kamiel goedgekeurd (12 okt 2026, zie `stem/risicowoorden.mp3`).
- De diffusiesimulatie is vooraf berekend (vaste seed) en dus bij elke weergave en bij terugspoelen identiek. H2 loopt door in s06 en s08 (simulatietijd = speeltijd sinds "dwaalt" + 8 s voor de vraag).
- Fonts komen van Google Fonts (zoals de rest van de site); zonder internet valt de film terug op systeemletters.
- Geen MP4-export.
- Rendertijd per frame bij 4× vertraagde CPU: max ± 6 ms per scène (s25), speler gemiddeld 16,7 ms.

## Versie 1.1 (review)
- Opnieuw ingesproken (Roos, eleven_v4, één take, flow OjSx1NJI3a7cn7PXOtMf): s05 ("rechts leger", "net zo vaak naar links als naar rechts"), s21 ("hoogste concentratie opgeloste deeltjes"), s22 ("even hard terug als het water dat door osmose naar rechts wil"), s31 ("een eiwit in het membraan", zodat havo geen onbekend begrip "dragereiwit" krijgt; cue in `SCENES.s31` is nu 'eiwit').
- Beeld: celwand-label bij plasmolyse "stevig, blijft staan", pas bij turgor "duwt terug"; koud/warm-panelen al bij "Hoe warmer"; paneel 1 in s09 bij "sneller bewegen"; pill "de tellers schommelen" in s08; passief transport langer in beeld (s29) en in havo zonder "gefaciliteerde diffusie"; nier als boon; kaarten in s21 dekkend (`card` in scenes_lib.js zonder transparantie).
- Docent/pagina: practicum met kleurstof in agar (convectie vs diffusie), uitleg q02 met nuance over stroming, begrippen osmose/osmotische waarde/passief/actief transport aangepast, begrip osmotische druk toegevoegd, taalfout checkvraag 1a.
- Niet aangepast: kleur van de celkern (paars), afbreekpunten van ondertitels, kleine overlappen in s01, s06, s11, s15 en s28 (zie review_v2.md).

## Wachtlijst opnieuw inspreken (afgerond in versie 1.2)

De aanvullingen van 15-10-2026 (fosfolipiden in s12, conclusiezin in s14, deeltjes tellen in s22) zijn op 16-10-2026 ingesproken, samen met de correcties in s20 en s21. Risicowoorden (stem-invoer): fosfolipiden `fosfo-lipiden` (/liˈpidə/), hydrofiel `hiedro-fiel` (/ɦidroːˈfil/), hydrofoob `hiedro-foob` (/ɦidroːˈfoːp/), chloride zoals geschreven (verwacht /xloːˈridə/; alternatief `chlo-riede`). Ze staan op `films/WACHTLIJST.md` onder "Ingesproken, uitspraak nog beluisteren".

## Wijziging 15 okt 2026 (beeld, op verzoek van Kamiel)
- Osmose-opstelling (s18) en stromende opstelling (s20): watermoleculen gaan nu zichtbaar door het membraan (functie `oversteek()` vóór `const SCENES`). In s18 even veel naar links als naar rechts; in s20 meer naar rechts (14) dan naar links (5), terwijl het niveau rechts stijgt. In s20 staat nu ook water (`waterField`) in beide compartimenten.
- Alleen beeld: direct aangepast in `index.html` én in `bron/src/scenes.js` (zelfde code). Let op: `bron/src/player.js` en `page.html` lopen achter op de live speler (snelheid, vragen aan/uit, vwo-knippen); bouw je opnieuw vanuit de bron, neem dan eerst de speler en pagina uit `index.html` over.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'veel kleurstof', 'flinterdunne wand', 'zuurstof', 'klein en lost op in vet', 'eigen doorgang', 'kanaaleiwit', 'dragereiwit', 'alleen een doorgang', 'semipermeabel membraan', 'celmembraan', 'celwand', 'pomp', 'natrium-kaliumpomp'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.

## Versie 1.2 (16 oktober 2026): uitgeversniveau

Aanleiding: redactiereview (blokkerende en belangrijke punten B1–B4, K1–K9). Kamiel stuurt de film mee met een open sollicitatie bij een educatieve uitgever.

**Opnieuw ingesproken** (Roos, voice_id 7qdUFMklKPaaAVMsBTBt, eleven_v4, één take per segment, flow Nd0XpevjWZ9i6oE977T1; woordtijden Scribe eleven_scribe_v1 in dezelfde flow; mastering loudnorm I=−16, TP=−1,5, LRA=11, twee passes, linear=true):
- **s20**: "Rechts is wel iets minder water. Maar dat verschil is veel te klein voor zo'n sterke stroom." → "Dat klopt: dat kleine verschil in water is de oorzaak. Maar het water gaat niet molecuul voor molecuul naar rechts. Het stroomt door het gaatje, als één geheel. Kijk maar hoe dat komt." (B1: het verschil is de drijvende kracht; de film laat het mechanisme zien, niet een tegenstelling met het boek.)
- **s21**: "Bij dat terugkaatsen nemen ze water mee" → "Bij dat terugkaatsen geven ze het water om hen heen een duw, weg van het gaatje." (B2: impuls, geen transport van water door zout.)
- **s12**: bouw van het membraan (fosfolipiden, kop hydrofiel, staarten hydrofoob, laag vet in het midden).
- **s14**: conclusiezin vetoplosbaar zelf erdoor, wateroplosbaar en ionen via een eiwit.
- **s22**: "Hoe meer opgeloste deeltjes" → "Hoe hoger de concentratie opgeloste deeltjes", plus deeltjes tellen (NaCl → 2 deeltjes, glucose 1).

**Tekst**: q19-uitleg "hoogste concentratie opgeloste deeltjes" (build_data.py); docentdeel osmose: het kleine verschil is de drijvende kracht (van 't Hoff), Kramer & Myers bestrijden het mechanisme; misconcepties aangevuld (lege ruimte bij plasmolyse, moleculen tellen); begrippen fosfolipide, hydrofiel/hydrofoob, aangevulde uitleg bij osmotische waarde, plasmolyse en ATP.

**Beeld** (BEELDAFSPRAKEN):
- Geen korrel meer op de Micro-achtergrond (`bg()` in lib.js).
- Alle membranen gebogen: `bilayerH`/`bilayerV`/`channelH` volgen een cirkelboog (R 4500 px horizontaal, 1300 px in de porie-close-up), eiwitten draaien mee (`opMem`); recap-panelen met `boogH`/`boogV`.
- s06: richtingspijlen verdwijnen vóór de grafiek verschijnt (geen overlap meer).
- s12: close-up van één fosfolipide met namen "kop: hydrofiel" en "staarten: hydrofoob", daarna gebogen dubbellaag van fosfolipiden met water aan beide kanten en "midden: een laag vet".
- s14: conclusie als twee kaarten (lost op in vet → zelf erdoor; lost op in water / ion → eiwit nodig).
- s20: "rechts is minder water" niet meer doorgestreept maar bevestigd ("klopt: … de oorzaak"), dan brede stroom als één geheel.
- s21: drukmeters in een effen strook bovenin, buiten het deeltjesveld; geen wijslijnen meer, maar een gekleurde ring op de meetplek (teal links, goud in de opening aan de zoute kant) in dezelfde kleur als de meter; kaarten osmose / in je boek / op een toets onderin en nooit over de drukmeters; rietje-pill verdwijnt vóór de kaarten; pill "en duwt het water weg van het gaatje".
- s22: tweede deel met twee bekers: 1 mol NaCl valt uiteen in Na⁺ en Cl⁻ (2 mol deeltjes) tegenover 1 mol glucose (1 mol deeltjes).
- s23: bij plasmolyse is de ruimte tussen celwand en membraan gevuld met de buitenoplossing (zout + water), naam "zout water", celwand "stevig, laat alles door"; pills naar rechts zodat ze de cel niet raken.
- s15, s17, s31, s32, recap: ATP als molecuul (adenine, ribose, drie fosfaatgroepen; bij gebruik springt de laatste eraf: ATP → ADP + P).
- s32: natrium-kaliumpomp in drie benoemde stappen met volgbare ionen en een voorraad Na⁺ buiten en K⁺ binnen die zichtbaar groeit.
- Labels: `metaText()` minimaal 26 px op het 1920-canvas (leesbaarder op de telefoon).

**Pagina**: docenttabellen in een eigen scrollkader (`.tabelkader`), geen horizontale scroll meer op 390 px; hint "draai je telefoon" al zichtbaar op smalle schermen; footer en eindkaart: versie 1.2 · 16 oktober 2026, eerste versie door Kamiels broer naar ontwerp van Kamiel Jacobs. (De naam van de broer staat nergens in de repo bevestigd; daarom "Kamiels broer".)

**Bouwstraat**: `src/player.js` en `src/page.html` lopen weer gelijk met de live film (teruggehaald uit index.html 1.1 vóór de wijzigingen); `bouw/contact2.py` (contactbladen) en `bouw/test_v12.py` (speler, havo/vwo, vragen, zoeken, 390 px) toegevoegd.

**Niet aangepast** (KLEIN uit de review): afbreekpunten van ondertitels, "even zout als je bloed" (s28; tekst vraagt nieuwe opname), H⁺-pomp-bijzin bij wortelhaar, "Voor vwo" in s15/s32 (speler knipt het weg), titel van de film, Google Fonts lokaal (bewust zo gelaten, zoals de rest van de site).

- 16 okt 2026: credits voor de broer op eindkaart en in footer weer weggehaald op verzoek van Kamiel (voorlopig; ze werken samen).

## Wijziging 22 okt 2026: castpersonage in het bootje (beeld)

Kamiel (20 okt 2026): geen grijze plaatsvervanger-poppetjes meer. In s33 (Recap, 'Je zit in een bootje op zee en je hebt dorst') zat het grijze `human()`-figuurtje in de boot. Nu zit **Noor** ('jij' in de bovenbouw, ROLLEN.md) in de boot, outfit `zomer`, van de heupen omhoog boven de rand (alles onder de rand weggeknipt). Uitdrukking volgt de stem: neutraal → `moe` bij 'dorst' → `bezorgd` bij 'zeewater' → `denkt` bij 'denk je'. Het bootje is opnieuw getekend (roeiboot met planken, verre rand, riem, deint en kantelt licht mee), met een warme zon rechtsboven (dorst) en golfjes vóór de boot. Audio, timing, tekst en ondertitels ongewijzigd.

- `bron/src/lib_cast.js` = kopie van `personages/lib_cast.js` (22 okt 2026); `bouw/build.py` zet hem vóór scenes_lib.js in het scèneblok.
- `bron/src/scenes_lib.js`: `circ()` toegevoegd (lib_cast.js gebruikt hem). `human()` staat er nog maar wordt niet meer gebruikt.
- `index.html`: alleen het scèneblok (lib_cast + scenes_lib + scenes) vervangen; nabewerkingen (spelerfix, flipkaarten, oefenen, teller, licentie) zijn blijven staan. Let op: `filmdata.json` staat niet in de bronmap, dus 'opnieuw bouwen' vraagt eerst de werkmap uit 'Hoe je de film aanpast'.


## Versie 2.0 (29 oktober 2026): beeld-remake op prompt v13, takes behouden

Brief: `films/OPWAARDEREN-CELLEN.md`. Stem, script, takes, woordtijden, cue-woorden, vragen, hoofdstukken, docentdeel, begrippen en oefeningen ongewijzigd; 0 credits. Alleen het scèneblok, de titelwolk en de versieregels in `index.html` zijn vervangen (`bouw/splice.py`), dus de nabewerkingen van de site zijn gebleven. Oude versie: `oud/index-1.2.html` (online tot Kamiel 2.0 goedkeurt; terugzetten = dat bestand terugkopiëren). Storyboard: `storyboard-remake.md`; lijsten voor Kamiel: `opwaardering-v13.md`; bronnenlogboek: `bronnen.md` (nieuw).

Per scène:
- Overal: moleculen herkenbaar (water = geknikt H₂O, kleurstof = twee zesringen in goud, Na⁺ klein oker met +, Cl⁻ groter grijsblauw met −, in water met watermantel; glucose = zesring met O en zijtak; mineralen oker). Membranen = `membraanBoog` uit de beeldbank (fosfolipiden, gebogen); eiwitten als kralenketen. Minder paars: vwo-pillen en 'zie je terug bij zenuwimpulsen' goud/wit, K⁺ groen. Labels minimaal 26 px. Paars alleen nog de vwo-balk.
- s01: zoomcirkel toont kleurstof- en watermoleculen ('ingezoomd: moleculen').
- s04–s08: zelfde `sim()`; deeltjes zijn kleurstofmoleculen die meedraaien, water als H₂O; het gevolgde deeltje is wit met gouden rand; botsende watermoleculen.
- s09: oppervlak als klein en groot stuk dubbellaag; cellen als `celRond` (zonder organellen).
- s11: longblaasjes = `longblaasje` (trosje met haarvatennet); zoomcirkel op de blaasjeswand met een haarvat (`bloedvat`, rode bloedcellen één voor één); O₂ in, CO₂ uit.
- s12: doorlopende zoom van een volle `celRond` naar het membraan; dubbellaag groot als `membraanBoog`; Na⁺ met watermantel kaatst terug.
- s14: kanaaleiwit (waterkanaal, kralen) en dragereiwit (kralen, klapt om) verschijnen rustig in het membraan; conclusiekaarten met de nieuwe moleculen.
- s15/s17 (vwo): kanaaleiwit met water in één rij; `dragerEiwit` klapt om (open buiten → glucose → open binnen).
- s18/s20: membraan in de bak = gebogen dubbellaag met drie waterkanalen; water steekt over als H₂O; zout als Na⁺/Cl⁻; bij 'stroomt' gaat het water in een rij door elk kanaal.
- s21 (kern): het gaatje is een waterkanaal in de dubbellaag; Na⁺/Cl⁻ met watermantel botsen en kaatsen terug en duwen H₂O weg; bij 'druk' wordt de zone in de opening aan de zoute kant zichtbaar leger aan watermoleculen; drukmeters, kaarten en volgorde als 1.2.
- s22: U-buis met een klein stukje dubbellaag; zout als Na⁺/Cl⁻; deeltjes tellen met losse ionen.
- s23/s25: plantencel = `plantencel` (plasmolyse 0 → 1 → 0, buitenoplossing tussen wand en membraan); turgorpijlen; komkommercellen als vier `plantencel`-en.
- s25/s27/s28/s35: rode bloedcel = `rodeBloedcel` (ingedeukte schijf); zwellen = bol, krimpen = gekarteld, hemolyse = leeg membraan terwijl de inhoud wegstroomt (`bloedcelOsmose`).
- s29: wortelhaarcel = `wortelHaren` met zoom; mineralen veel in de haarcel, weinig in de bodem.
- s31/s32: pomp = `pompEiwit` (kralenhelices + gevouwen ATP-domein binnen) in `membraanBoog`; Na/K-pomp met de stappen van 1.2.
- s33: panelen met mini-dubbellaag en de nieuwe moleculen; zon vlak zonder gloed.
- Titelkaart: wolk van kleurstof- en watermoleculen.

Getest: contactvellen van alle 24 scènes (elke 4 s) zelf bekeken, daarna gericht s05, s11, s22, s23, s29 opnieuw; geen JS-fouten; `checkcues.js` 0 fout; speler (havo 701 s / vwo 761 s, vragen uit 584 s, zoeken, q19 beantwoorden), telefoon 390 px zonder horizontaal scrollen; elke vraag met `?vragen=uit` (5 s ervoor tot 3 s erna: geen vraag- of antwoordtekst in beeld); vaste scripts (spelerfix, antwoordtekst, kortantwoord, antwoordletter met --check), flipkaarten, licentie_noot, teller.
