# Vertering — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/3-vertering/index.html` (audio in `audio/`: 14 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 3 (32A Organismen, derde bullet: verklaren hoe samenwerking van organen leidt tot een functionerend orgaanstelsel — het spijsverteringsstelsel) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengd vmbo-t / havo / vwo. Basislijn op vmbo-t; één extra blok voor havo/vwo (s16: enzymen, chemische verandering). Schakelaar **Basis / Havo/vwo** (`?niveau=basis`) |
| Versie / datum | 1.0 · 13 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `UokirpHtX0Vd05HmYwHA` (generatie-id's in `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 14 takes woord voor woord gelijk aan het script |
| Duur | audio 307 s; speeltijd Havo/vwo ± 6:10, Basis ± 5:35 |
| Beeldstijl | Part C, vlak. Rode draad: een hap appel met pit op een **routekaart** van het spijsverteringskanaal (`ROUTE`/`tractMap`: één buis van mond tot anus met maag, lever + gal, alvleesklier, dunne en dikke darm; de hap reist via `routePt(u)`); Micro-look voor de cel, de mond, de darmwand met darmvlokken en de enzymschaartjes; de keuken uit film 1 voor de cold open. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per segment, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v5 + Part D; script na drie reviews (`reviews/`); zonder checkpoint gebouwd (Kamiel: "kun je verder") |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | het script (bron van alles); `script_v1.md` de versie vóór de reviews; `reviews/` de drie reviews |
| `stem/segmenten_stem-invoer.json` | per segment de schermtekst (`display`) en de letterlijke stem-invoer (`voice`) |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` | woordtijden per take (Scribe) · generatie-id, duur en (tijdelijke) url per take |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/lib.js`, `src/helpers1.js`, `src/helpers2.js` | Part C-bibliotheek; hulpjes uit film 1 (keuken, cellen) en film 2 (lichaam, organen) |
| `src/scenes3.js` | routekaart (`ROUTE`, `tractMap`, `tractLabels`, `hap`), mond, maag, darmvlokken (`villi`), estafette, enzymschaartjes, en één scènefunctie per segment; `build.py` plakt lib + helpers + scènes tot `src/scenes.js` |
| `src/player.js`, `src/page.html` | speler (meta "film 3", hoofdstuk-subtitels in `mini`) en paginasjabloon met checkvragen, begrippen en docentdeel |
| `bouw/make_segments.py` | `script_v2.md` → `segments.json` (lege regel = nieuwe take; respellings in `subs`) |
| `bouw/build_data.py` | segments + woordtijden + vragen → `filmdata.json` |
| `bouw/build.py`, `bouw/cuecheck.py`, `bouw/shots.py`, `bouw/fetch.py` | bouwen · cue-controle · stills en contactsheet · takes en woordtijden ophalen uit een ElevenLabs-statusbestand |

**Werkmap opzetten:** kopieer `src/`, `bouw/*.py` en `script_v2.md` naar een werkmap buiten de repo; zet `stem/segmenten_stem-invoer.json` daar als `segments.json` en `stem/woordtijden/` als `words/`; `python3 build_data.py && python3 build.py` geeft `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Keuken | appel eten, pit doorgeslikt; "een dag later": appel weg, wc met de pit; vraag |
| q02 | Cold open | vraag | waarom de appel wel en de pit niet? |
| s03 | Titel | Schema | titel met routekaart en reizende hap |
| s04 | H1 Klein maken | Routekaart → Micro | de buis met sap-organen; cel + appel (kan niets), voedingsstoffen-chips, "zitten vast"; klein maken → afbreken; water en vitamines |
| s05 | H1 | Micro → Schema | grote mond met tanden en speeksel; slokdarm op de kaart; poppetje op zijn kop |
| q06 | H1 | vraag | op je kop slikken: komt het in je maag? |
| s07 | H2 Afbreken en opnemen | Schema | slokdarm met knijpende spieren achter de hap; maag kneedt, maagsap, bacteriën dood, klok 2–4 uur, papje naar de dunne darm |
| s08 | H2 | Routekaart | dunne darm 6 m; drie sappen (alvleesklier, gal, darmwand) als druppels; vet → druppels; "enzymen"; voedingsstoffen los; vraag |
| q09 | H2 | vraag | hoe komen de voedingsstoffen bij je cellen? |
| s10 | H2 | Micro | darmwand met darmvlokken en bloedvaten, stippen gaan erdoor; 30 m²; inzet cel "verbranden of bouwen" |
| s11 | H2 | Micro | de pit: sap ketst af; te groot voor de darmwand; reist verder |
| s12 | H3 Wat overblijft, en samen | Routekaart | dikke darm 1,5 m; water terug; bacteriën; ontlasting; klok 1–2 dagen; anus met pit |
| s13 | H3 | Schema | estafette van zes haltes met stokje; alvleesklier doorgestreept; vraag |
| q14 | H3 | vraag | alvleesklier stopt: wat gebeurt er? |
| s15 | H3 | Schema | estafette zonder alvleesklier; voedingsstoffen blijven vastzitten; "orgaanstelsel" |
| s16 | H3, havo/vwo | Micro | enzymschaartjes knippen kralenkettingen (speeksel, maagsap, alvleesklier), gal alleen druppels; chemische verandering vs kauwen |
| s17 | Samenvatting | Routekaart | haltes met taak, hap reist mee, drie stappen, estafette, de pit |
| s18 | Eindkaart | Schema | Probeer het zelf: broodproef, teken de reis, rondleiding; vraag over gal; blijft 12 s staan |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Waarom verdwijnt de appel wel en de pit niet? | pit te klein · appel in de maag verbrand · appel klein gemaakt en opgenomen in het bloed, de pit niet | c |
| q06 | Op je kop slikken: komt het eten in je maag? | ja, spieren in de slokdarm duwen · nee, eten valt naar beneden · alleen met water | a |
| q09 | Hoe komen de voedingsstoffen bij je cellen? | vanuit de maag · door de darmwand het bloed in · buisjes vanuit de darm | b |
| q14 | De alvleesklier stopt. Wat gebeurt er? | niets · dunne darm maakt extra sap · de meeste voedingsstoffen komen niet los, niet in je bloed | c |

## Begrippen

verteren, voedingsstoffen, verteringssap, enzym, darmwand/darmvlokken, opnemen, ontlasting, estafette · havo/vwo: chemische verandering. `GLOSSARY` op regel 811.

## Docentdeel

Doelgroep (bullet 3: verklaren), tabel per deel, zes misconcepties, pauzemomenten (orgaan "uitzetten", broodproef), getallen (2–4 u, 6 m, 1,5 m, 30 m² Helander & Fändriks 2014, 1–2 dagen), vereenvoudigingen (vet via lymfe; darmsap/galblaas/twaalfvingerige darm/endeldarm/peristaltiek niet bij naam; uitvalproef alvleesklier), leerdoelen met dekking. Checkvragen: 1 opnemen (mk), 2 drie stappen, 3 estafette uitleggen, 4 de pit, 5 broodproef/enzymen (havo/vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst: regel 65–147; checkvragen vanaf 95, docentdeel vanaf 111.
- `window.FILMDATA`: regel 148.
- Tekenbibliotheek vanaf regel 150; film 1-hulpjes vanaf 344; film 2 vanaf 489; film 3: `ROUTE` 620, `tractMap` 627, `tractLabels` 643, `hap` 648, `villi` 657, `estafette` 665.
- Scènes: `const SCENES` regel 674; `s01` 676, `s03` 687, `s04` 691, `s05` 705, `s07` 716, `s08` 732, `s10` 743, `s11` 754, `s12` 760, `s13` 772, `s15` 779, `s16` 787, `s17` 796, `s18` 803.
- Begrippen: `GLOSSARY` regel 811. Speler vanaf regel 823; `drawChapterCard()` 870.

## Zo pas je deze film aan

1. **De routekaart**: `ROUTE` (punten van de buis), `ST` (route-parameter van de haltes), `tractMap` (tekening per orgaan) en `tractLabels` (labelplekken) in `src/scenes3.js`.
2. **Een halte of taak in de estafette**: `EST`.
3. **Eén segment opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe-woordtijden; `audio/sNN.mp3` (−16 LUFS) en `words`/`dur` vervangen; bij andere tekst `bouw/cuecheck.py`.
4. **Vraag aanpassen**: `q`, `options`, `correct`, `explain` in het `q..`-segment (of `bouw/build_data.py`).
5. **Basis of havo/vwo**: `level` van een segment; checkvragen `class="q vwo-only"`, begrippen `vwo:true`.
6. **Eindkaart**: tekst in `s18`; duur via `HOLD`.

## Uitspraak

Geen uitspraaktest vooraf (afspraak 13-10-2026). Respelling: "wc" → "wee-cee". **Wachtlijst voor de batchtest:** alvleesklier (s08, s13, s15, s16), darmvlokken (s10), enzym/enzymen (s08, s16), zetmeel (s16), gal (s08, s16), ontlasting (s12), estafette (s13–s17), anus (s04, s12), chemische (s16).

## Aandachtspunten

- 13-10 (16:50): s04 opnieuw ingesproken na vraag van Kamiel ("in een appel zit weinig eiwit en vet"): "In een appel zit vooral suiker. In kaas zit eiwit en vet. Allemaal zitten ze vast in het eten." Beeld: kaas naast de appel in s04, kaasblokje in de maag (s07) bij "eiwitten".

- De routekaart is een schema, niet een anatomische tekening; de dunne darm is als golf getekend, de dikke darm als lus eromheen.
- "Het bloed in" geldt in de film voor alle voedingsstoffen; vet gaat grotendeels via de lymfe (docentdeel).
- Het poppetje op zijn kop is het `human`-poppetje 180° gedraaid.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). In `tractLabels()` staan 'alvleesklier' en 'dikke darm' nu onder het orgaan (overlapten elkaar).

## Wijziging 16 okt 2026
Geen havo/vwo meer in beeld of tekst (Kamiel): niveauknop **Basis / Uitdaging**, het extra blok heet "uitdaging" (canvaslabel, hoofdstukmenu, begrippen, transcript, checkvraag 5, docentdeel). De gesproken zin "Voor havo en vwo gaan we nog een stap verder." wordt door de speler weggeknipt (`vwoCuts`) en staat niet in het transcript. Interne sleutels (`level: vwo`, `data-v="havovwo"`) zijn ongewijzigd.
