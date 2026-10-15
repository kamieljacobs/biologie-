# Van cel tot lichaam — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/2-van-cel-tot-lichaam/index.html` (audio in `audio/` ernaast: 14 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 2 (32A Organismen, tweede bullet: bouw van orgaanstelsels, organen en weefsels, dier én plant) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengd vmbo-t / havo / vwo. Basislijn op vmbo-t-niveau; één extra blok voor havo/vwo (s16, paarse balk "havo/vwo", gespecialiseerde cellen). Schakelaar **Basis / Havo/vwo** (standaard Havo/vwo; `?niveau=basis`) |
| Versie / datum | 1.0 · 13 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment (generations_count 1), flow `UokirpHtX0Vd05HmYwHA` (generatie-id's in `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 14 takes woord voor woord gelijk aan het script |
| Duur | audio 345 s (speler-`dur` incl. 0,45 s staart; eindkaart 12 s); speeltijd Havo/vwo ± 6:50, Basis ± 6:05 (met 4 hoofdstukkaarten van 3,5 s en 4 vragen van 8 + 6 s) |
| Beeldstijl | Part C, vlak, zoals film 1: Schema (#1A2740) voor gymzaal, lichaam en trap; Micro (#121A26 met grain) voor cellen, bloedvat en bladdoorsnede; Macro-lucht (#1E2E4A) met grondlaag voor de tuin. Stijlframes `stijlframes/frame_trap.png` en `frame_lichaam.png` (goedgekeurd op het checkpoint van 13-10); beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | gemaakt met uitlegfilm-prompt v5 + Part D; script na drie reviews (`reviews/`); checkpoint-artifact zie `STATUS.md` |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | het script (bron van alles); `script_v1.md` de versie vóór de reviews |
| `stem/segmenten_stem-invoer.json` | per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`) |
| `stem/woordtijden/sNN.json` | woordtijden per take (Scribe) · `stem/generaties.json` generatie-id, duur en (tijdelijke) url per take · `stem/uitspraaktest.mp3` |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/lib.js` | Part C-tekenbibliotheek (gelijk aan film 1) |
| `src/helpers1.js` | hulpjes uit film 1 (sla, keuken, cellen, wangcellen, `tissue`) |
| `src/scenes2.js` | nieuwe tekeningen voor film 2 en één scènefunctie per gesproken segment; `build.py` plakt helpers1 + scenes2 tot `src/scenes.js` |
| `src/player.js`, `src/page.html` | speler (meta "film 2", hoofdstuk-subtitels in `mini`) en paginasjabloon met checkvragen, begrippen en docentdeel |
| `bouw/make_segments.py` | `script_v2.md` → `segments.json` (lege regel = nieuwe take; respellings in `subs`) |
| `bouw/build_data.py` | segments + woordtijden + vragen → `filmdata.json` (antwoorden en uitleg per vraag, `HOLD`) |
| `bouw/build.py` | sjabloon + data + js → `film/index.html` met sitebalk |
| `bouw/cuecheck.py` | controleert of elk `q.at('woord',n)` in scenes2.js op het bedoelde woord valt |
| `bouw/shots.py` | stills per segment en contactsheet (Playwright; pas het pad `D` aan) |
| `bouw/frames.html`, `make_checkpoint.py`, `checkpoint_template.html` | stijlframes en de checkpointpagina |

**Werkmap opzetten:** kopieer `src/`, `bouw/*.py` en `script_v2.md` naar een werkmap buiten de repo; zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`; `python3 build_data.py && python3 build.py` geeft `film/index.html`; de audio komt in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema, gymzaal | rennend poppetje (wandrek, basket), beenspieren omcirkeld, hart klopt, ademwolkjes; pil "waarom doet de rest van je lichaam mee?" |
| q02 | Cold open | vraag | waarom doet de rest van je lichaam mee? |
| s03 | Titel | Schema | titel met lichaam-schema (organen) |
| s04 | H1 Van cel naar orgaan | Schema → Micro | poppetje "≈ 30 000 miljard cellen", hoop cellen wordt geordend; één spiercel (wordt korter), "kan bijna niets"; rijen spiercellen, pijlen "samen kracht zetten"; "weefsel = …" |
| s05 | H1 | Schema | vijf weefseltegels (spier, zenuw, bot, bind, dek) met taak; dim "die namen hoef je niet te onthouden"; "elk weefsel bestaat uit cellen, eigen taak" |
| s06 | H1 | Schema | poppetje met zoomlijnen naar de kuitspier: spierweefsel, zenuwweefsel, bloedvaten, bindweefsel; "orgaan = …", "taak: korter worden"; rij hart, long, maag, huid, bot; groot bot "zit daar nog leven in?" |
| q07 | H1 | vraag | zit er leven in een bot? |
| s08 | H2 Van orgaan naar lichaam | Schema → Micro | bot met botcellen, breuk groeit dicht; lichaam: spijsvertering, ademhaling, bloedvaten lichten op met taak; bloedvat met cellen "is bloed ook een weefsel?" |
| q09 | H2 | vraag | is bloed ook een weefsel? |
| s10 | H2 | Micro → Schema | bloedvat "vol cellen, zwemmen in vocht"; lichaam: zenuw, skelet, spier, uitscheiding, afweer, hormoon, voortplanting lichten op; "tien orgaanstelsels" |
| s11 | H2 | Schema | lichaam met alle stelsels, stippellijn "organisme: jij"; gymles: inzet spiercel met mitochondriën; zuurstof (teal) en voedingsstoffen (oker) stromen van longen en darmen naar de beenspieren; "je orgaanstelsels werken samen" |
| s12 | H3 Ook een plant | Macro, tuin | krop sla met wortels in de grond; "heeft een plant ook organen?" |
| q13 | H3 | vraag | heeft een plant ook organen? |
| s14 | H3 | Macro, tuin | bloeiende slaplant: wortels, stengel, bladeren, bloem met taak; stippelcirkel wortelstelsel |
| s15 | H3 | Macro → Micro | zoomcirkel op één blad; bladdoorsnede: opperhuid (boven en onder), bladmoes met bladgroenkorrels, vaatbundel; "een blad is een orgaan" |
| s16 | H3, havo/vwo | Micro | spiercel, zenuwcel, rode bloedcel (geen kern, past door een dun vat); "dezelfde bouwtekening", "gespecialiseerd"; bladmoescel tegenover wortelcel |
| s17 | Samenvatting | Schema | trap van vijf treden met tekeningen (mens); dezelfde trap voor de sla; gymles-afsluiting |
| s18 | Eindkaart | Schema | Probeer het zelf: sorteeropdracht mens en plant, verwijzing Celbouwer en microscoop, vraag; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Je sprint. Waarom doet de rest van je lichaam mee? | de rest doet niets · je beenspieren krijgen hulp van de rest · je hart is ook een spier, beweegt vanzelf mee | b |
| q07 | Een bot is hard. Zit daar nog leven in? | nee, dood materiaal · ja, levende cellen · alleen de buitenkant | b |
| q09 | Bloed stroomt. Is bloed ook een weefsel? | nee, een vloeistof · ja, vol cellen met dezelfde taak · nee, een orgaan | b |
| q13 | Heeft een plant ook organen? | nee · ja: wortel, stengel, blad en bloem · alleen de bloem | b |

## Begrippen

weefsel, orgaan, orgaanstelsel, organisme, spierweefsel, bindweefsel, dekweefsel, opperhuid/bladmoes/vaatbundel · havo/vwo: gespecialiseerd. Staan in `GLOSSARY` (index.html regel 772).

## Docentdeel

Op de pagina: doelgroep en niveaus, tabel per deel, zes misconcepties, pauzemomenten, getallen (30 000 miljard; tien stelsels uit het kerndoel), vereenvoudigingen (definities, weefselindeling per methode, skelet en spierstelsel apart, bladmoes/vaatbundel), leerdoelen met dekking. Checkvragen: 1 weefsel (mk), 2 volgorde, 3 blad als orgaan, 4 bot en bloed, 5 gespecialiseerde cellen (havo/vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst (kop, checkvragen, docentdeel, footer): regel 65–146; checkvragen vanaf regel 95, docentdeel vanaf regel 111.
- `window.FILMDATA`: regel 147. Per segment `id`, `kind`, `level` (basis/vwo), `chapter`, bij speech `audio`, `dur`, `words` ({t,s,e}); bij vragen `q`, `options`, `correct`, `explain`.
- Tekenbibliotheek (Part C): vanaf regel 149; hulpjes film 1 vanaf regel 343; nieuwe tekeningen film 2 vanaf regel 488 (`bodyOrgans` 522, `SYS` 551, `calf` 565, `tissueTile` 574, `slaPlant` 588, `leafCross` 596, `trap` 605).
- Scènes: `const SCENES` regel 615; `s01` 617, `s03` 629, `s04` 634, `s05` 650, `s06` 657, `s08` 676, `s10` 691, `s11` 700, `s12` 715, `s14` 717, `s15` 729, `s16` 739, `s17` 757, `s18` 764.
- Begrippen: `GLOSSARY` regel 772.
- Speler: vanaf regel 784; `buildTimeline()` 797, `drawChapterCard()` 831 (hoofdstuk-subtitels in `mini`), `drawQuestion()` 836. Hoofdstukkaart 3,5 s; vraag 8 s denktijd + 6 s uitleg; geen kaart voor Cold open, Titel en Eindkaart (`NO_CARD`).

## Zo pas je deze film aan

1. **Tekst in beeld** (labels, pillen): zoek de string in de scènefunctie (`s08(` enz.) in `index.html` of in `src/scenes2.js` en bouw opnieuw.
2. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`. Woordtijden met Scribe (transcriptie met de spraak-node als bron). Vervang `audio/sNN.mp3` (master −16 LUFS) en zet nieuwe `words` en `dur` in `FILMDATA` (of in `stem/woordtijden/` en bouw opnieuw). Scènes gebruiken woord-cues (`q.at`), dus bij dezelfde tekst blijft het beeld kloppen; bij een andere tekst `bouw/cuecheck.py` draaien.
3. **Ondertitel corrigeren zonder nieuwe opname**: pas `words[].t` aan, tijden laten staan.
4. **Vraag aanpassen**: `q`, `options`, `correct`, `explain` in het `q..`-segment (of in `bouw/build_data.py`).
5. **Basis of havo/vwo**: `level` van een segment op `basis` of `vwo`. Checkvragen met `class="q vwo-only"` en begrippen met `vwo:true` verdwijnen in Basis.
6. **Een stelsel anders tekenen of labelen**: `bodyOrgans` (tekening per sleutel) en `SYS` (naam, aanwijspunt, labelplek, taak) in `src/scenes2.js`.
7. **Eindkaart langer of korter**: `HOLD` in `bouw/build_data.py` (nu 12 s).

## Uitspraak

Geen uitspraaktest vooraf (afspraak 13-10-2026: lastige woorden op de wachtlijst, later in één batch testen). Stem-invoer: "dertig-duizend", "koolstofdie-oxide" (goedgekeurd bij film 1 en Diffusie). **Wachtlijst voor de batchtest:** bindweefsel, dekweefsel, kuitspier, vaatbundels, bladmoes, opperhuid, uitscheidingsstelsel, voortplantingsstelsel, gespecialiseerd, mitochondriën (s11).

## Aandachtspunten

- De slaplant in H3 is een bloeiende sla (stengel en bloem), zodat alle vier de organen te zien zijn; de krop uit film 1 staat in s12.
- Het lichaam-schema is vlak en niet op schaal (nieren achter de darm, lymfeklieren als stippen); het is de basis voor film 2b.
- Lettertypen komen van Google Fonts; offline vallen ze terug op Georgia/system-ui.
- Eindkaart verwijst naar Celbouwer en de virtuele microscoop; een Lichaamsbouwer-tool komt bij film 2b.

## Wachtlijst opnieuw inspreken

Aanvulling na vergelijking met Gewoon Uitgelegd (15-10-2026). Tekst staat als `[nieuw]` in `script.md`; zet hem ook in `script_v2.md` en volg "Zo pas je deze film aan" stap 2 (Roos, eleven_v4, één take, Scribe, −16 LUFS, nieuwe `words` en `dur`, `bouw/cuecheck.py`).

- **H1, s04** — tussencelstof (stof tussen de cellen, door de cellen gemaakt; bot hard, kraakbeen stevig en buigzaam), na "Dit is spierweefsel." Opnieuw: `audio/s04.mp3` + `stem/woordtijden/s04.json`; ± 10 s langer, s05 en verder schuiven op. Cues ('spierweefsel', 'kracht', 'miljoenen' enz.) blijven kloppen.
- **Beeld nodig**: na het spierweefsel een korte inzet bot (cellen in harde grondstof) en kraakbeen (cellen in lichte, buigzame grondstof), label "tussencelstof" op de ruimte tussen de cellen. Begrip "tussencelstof" toevoegen aan `GLOSSARY` en aan de docenttabel.
- **Risicowoorden (uitspraaktest)**:
  - tussencelstof — geen IPA gevonden (samenstelling tussen + cel + stof); risico dat de TTS "tussence-lstof" knipt. Stem-invoer `tussen-celstof`.
  - kraakbeen — Wiktionary geeft afbreking kraak-been (alleen geluidsbestand, geen IPA); als geschreven.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Verplaatst: labelposities ademhalingsstelsel en bloedvatenstelsel in `SYS`; 'ademt sneller' en 'hart' (andere kant); nu `naamBij`: spierweefsel, botcellen, bladeren, opperhuid, bladmoes (twee regels links van de doorsnede), vaatbundel (onder de nerf).
