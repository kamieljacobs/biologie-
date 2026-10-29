# Regeling: Kamiels keuzes uitvoeren (29 okt 2026)

Kamiel vulde het keuzeblad 'Regeling: jouw keuzes' in (https://claude.ai/artifact/1AwKuLaFUeSsEF2xypEnQG, collectie `keuze`; bron `films/regeling-keuzeblad/`). Deze brief zegt per film wat je doet. Lees eerst `CLAUDE.md`, `films/OVERDRACHT-REGELING.md`, `films/BEELDAFSPRAKEN.md` (bindend), `films/PROMPT_v13.md` Part C (C1, C2, C9, C10) en § 14, en van jouw film `bron/info.md`, `bron/opwaardering-v13.md`, `bron/bronnen.md`.

Repo: `/root/biologie-` (ook `/home/claude/biologie-`). Niet opnieuw clonen.

## Keuzes van Kamiel (samengevat)
- Polymerase: versie 1 (= variant A). Doet de hoofdsessie zelf in de beeldbank.
- **Zenuwstelsel 1–6 naar de donkere beeldstijl: ja, lichte remake.**
- Inspreken: alles op 'doen' (zie per film). Sanne: Kamiel koos een nieuwe figurant, dan mag de naam blijven → **niet** inspreken.
- Reactietijd: stem aanpassen. Kleuren gelijktrekken: ja (tabel hieronder). Hormonen 2: Sanne wordt een nieuwe figurant. Stress: decor naar thuis. Linda met wijn: prima. Zenuwstelsel 4: `synapsEcht` uit de beeldbank en een hersendoorsnede voor het beloningssysteem: ja. Zintuigen: label 'rond je 40e–45e' bij oudziend. Nieuwe beeldbankobjecten: later (dus: teken wat je mist in de bronmap van de film, zoals bij de opwaardering).

## Kleuren in Zenuwstelsel en Hormonen (Kamiel 29 okt 2026: 'gelijktrekken')
Betekeniskleuren uit Part C; paars alleen voor kern, erfelijkheid, hormonen en de vwo-balk.
| Wat | Kleur |
|---|---|
| zenuwsignaal (impuls, actiepotentiaal, zenuwbaan die vuurt) | teal #5BA4C9 |
| neurotransmitter (ook dopamine, serotonine, GABA) | licht teal #9CCBE3 |
| hormoon in het algemeen (ook ADH, melatonine, thyroxine, groeihormoon) | paars #8C7BBF |
| hypofysehormonen en releasing-hormonen naast een klierhormoon | licht paars #B3A6DA (klierhormoon paars) |
| insuline | paars #8C7BBF |
| glucagon | groen #7FC48F |
| adrenaline | koraal #E07A5F |
| cortisol | oker #C9A35C |
| glucose | oker #C9A35C (vaste moleculekleur; staat het naast cortisol, dan cortisol als ruit en glucose als zeshoek) |
| water | teal (molecuul), bloed koraal, zuurstof teal |
| slaap: wakker / lichte slaap / diepe slaap / REM | goud / licht teal / teal / koraal |
Een hormoon houdt in elke film dezelfde kleur. Legenda of naam bij de eerste keer, zodat de kleur nooit de enige drager is (kleurenblindheid).

## Inspreken (ElevenLabs) — alleen wat hier staat
- Stem Roos, voice_id `7qdUFMklKPaaAVMsBTBt`. **Model = het model van de bestaande takes van jouw film** (Zenuwstelsel 1–6: `eleven_multilingual_v2`; Zenuwstelsel 7–8 en Hormonen: `eleven_v4`), zodat de stem gelijk blijft. Controleer met `creative_get_model_schema` hoe je het model kiest.
- Eén flow per film (`creative_create_flow`), per alinea precies één `creative_generate_speech` met `generations_count: 1`. **Nooit herhalen**: een mislukte of wachtende take wacht je af (`creative_get_flow_run_status`, poll_after_seconds). Andere helpers nemen tegelijk op; bij een weigering om gelijktijdigheid: wachten en dan pas de volgende alinea.
- Pas eerst de vervangregels uit `films/uitspraak.json` toe. Schrijf de stem-invoer letterlijk in `bron/stem/` (bestaand bestand aanvullen).
- Downloaden met curl naar de map met takes van de film; `scripts/silalign.py` voor woordtijden; cues in de scènes op de nieuwe take afstemmen (beeld volgt de stem).
- Houd per take de credits bij en noteer ze in `bron/info.md` (Wijzigingen) en in je eindbericht.

## Per film
**Zenuwstelsel 1–6: lichte remake naar de donkere stijl** (PROMPT_v13 B16 'lichte remake', maar met Kamiels toevoeging: *de stem blijft waar het beeld erop past*; alleen de alinea's hieronder worden opnieuw ingesproken).
- Voorbeeld van dezelfde reeks in de donkere FILMDATA-straat: `films/zenuwstelsel/9-spieren-en-beweging.html` en zijn `bron/` (speler, `lib.js`, `lib_cast.js`, `lib_anatomie.js`, `lib_bio.js`). Ook `films/dna/1-wat-is-dna/bron/` (lichte remake met `remake-2026-10/`, `segments.json`, `film.py`, `bouw.sh`). Speler altijd van `films/gedrag/5-emotieregulatie/bron/src/player.js` (zie CLAUDE.md).
- Script, vragen, opties en volgorde blijven (oud script als geraamte); alleen fouten met ≥ 2 bronnen (≥ 1 niveau A) en de inspreekpunten hieronder veranderen. De bestaande takes haal je uit de huidige film (`scripts/filmbron.py uitpakken`, `window.FILM_AUDIO`) en zet je als losse mp3 in `films/zenuwstelsel/<slug>/audio/`; woordtijden met `silalign.py`.
- Beeld helemaal nieuw in Part C (donker navy, Fraunces/Source Sans 3, betekeniskleuren hierboven), met beeldbankobjecten (`bibliotheek/lib_bio.js`, kopie in je bronmap), castpersonages (`personages/lib_cast.js`, geen namen in stem of beeld) en het realistische lichaam (`personages/lib_anatomie.js`). Eenvoud boven volledigheid: een leerling van 15 ziet in twee seconden waar het om gaat. Lees de bestaande 'Bewust niet'-punten in `bron/info.md` en `opwaardering-v13.md`: die los je nu op (bv. de lens met de ontblote PNG-man in film 1 vervalt).
- **De oude film blijft online tot Kamiel de nieuwe goedkeurt.** Lever de nieuwe versie als `films/zenuwstelsel/<slug>-nieuw.html` (zelfde mapdiepte, audio in `films/zenuwstelsel/<slug>/audio/`); de bron in `bron/` met de werkmap `bron/remake-2026-10/`. Raak `films/zenuwstelsel/<slug>.html` en `index.html` niet aan. Bij goedkeuring wisselt de hoofdsessie ze om (oude naar `bron/oud/`, datum, B15-uitzondering 'lichte-remake').
- Storyboard: maak in `bron/remake-2026-10/storyboard/` één keyframe-still per scène (png, 960×540) plus `storyboard.json` (`[{scene, still, tekst (gesproken zin), noot}]`); de hoofdsessie maakt daar één keuringsblad van.
- Afronden zoals een remake: `bron/info.md` (versie 2.0, `| Prompt | v13 |`, 'Voldoet aan: prompt v13', Herkomst 'lichte remake, keuze Kamiel 29 okt 2026', Wijzigingen per scène, regelnummers), `bron/script.md` bijwerken waar tekst veranderde, `bron/bronnen.md` aanvullen. Draai op het nieuwe bestand `spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` (alle met --check na afloop), `flipkaarten.py`, `tabel_mobiel.py`, `licentie_noot.py`, `teller.py`. Speel elke vraag af met `?vragen=uit` (5 s ervoor tot 5 s erna), kijk naar een contactvel van alle scènes (Read de png), ook op 375 px breed.
- Per film:
  - **1 Eén seconde**: inspreken q1–q6 'Voorspel.' → 'Wat denk je?' (alleen die zin? Als de vraag in één alinea zit, de hele alinea opnieuw) en a3 reactietijd: '…ongeveer tweehonderd milliseconden' aanvullen tot het klopt voor een verwachte prikkel en noemen dat het bij een onverwachte bal eerder rond een seconde is (bronnen in `bronnen.md`, bewering met `!`). Houd de nieuwe zin kort.
  - **2 Het kabelnetwerk**: q1–q5 'Voorspel.' → 'Wat denk je?'; q5 'Alleen op druk?' → 'Vooral op druk?' (en de antwoordtekst erop laten aansluiten als die 'alleen' herhaalt).
  - **3 De spleet**: geen inspreekpunten.
  - **4 Knoeien met de spleet**: a4 'binnen tien seconden na een trek' → 'binnen een paar seconden'. Synaps = `synapsEcht` uit de beeldbank; beloningssysteem als hersendoorsnede (hersenen uit de beeldbank met het beloningscircuit, VTA → nucleus accumbens → prefrontale schors, als oplichtende baan) in plaats van een wolk. Linda met wijn blijft (Kamiel: prima).
  - **5 Het hoofdkantoor**: a5 temperatuurregeling toevoegen (staat op de wachtlijst van 15 okt in de bronmap; vijf zinnen, nieuwe regelkring-scène als levend model volgens type D: sensor, normwaarde, effector, verstoring).
  - **6 Leren en onthouden**: geen inspreekpunten.

**Zenuwstelsel 7 Slaap** (opwaardering, geen remake): inspreken s01, s12, s19: 'Bilal en Sam' → 'twee vrienden'; s12 'alleen opgeruimd' → 'vooral opgeruimd als je slaapt'. Kleuren volgens de tabel (REM niet meer paars; melatonine paars). Speler, datum en de rest blijven.

**Zenuwstelsel 8 Zintuigen**: inspreken s01, s12, s20: de naam 'Noor' eruit ('een sporter' / 'je', zoals het in de zin past). Label bij oudziend: 'rond je 40e–45e' (bron NEI in `bronnen.md`). Kleuren volgens de tabel.

**Hormonen 1 Post voor iedereen**: inspreken s20 'ongeveer een tienmiljoenste gram' → 'minder dan een tienmiljoenste gram'; s15 (vwo) aanvullen met eerste/tweede boodschapper, G-eiwit en cAMP (wachtlijst in de bronmap; kort, het G-eiwit staat al in beeld; nieuwe beeldstap die cAMP laat ontstaan). Kleuren volgens de tabel.

**Hormonen 2 Suiker in balans**: Sanne wordt een **nieuwe figurant** in de caststijl (`personages/lib_cast.js`, `CAST_EXTRA`; geen bestaand castpersonage), meisje van ±16, met de insulinepen/sensor die nu in beeld is; de naam Sanne mag in stem en beeld blijven. Voeg haar toe aan `personages/LEVENSLOOP.md` (en `scripts/levensloop.py`) en, als figurant, aan `personages/ROLLEN.md`. Niet inspreken. Kleuren volgens de tabel (insuline paars, glucagon groen, glucose oker).

**Hormonen 3 De baas van de klieren** en **Hormonen 5 Water in balans**: alleen kleuren volgens de tabel.

**Hormonen 4 Stress**: cold open naar thuis 's avonds (bureau of keukentafel, lamp, schrift, raam met avond; zelfde castpersonage), in lijn met de stem. Kleuren volgens de tabel (cortisol oker, adrenaline koraal).

Voor 7, 8 en Hormonen 1–5 (geen remake): versie ophogen (x.y+1), regel onder Wijzigingen per scène, 'Voldoet aan' blijft v13. Oude versie in `bron/oud/`. B11-scripts met --check, elke gewijzigde vraag met `?vragen=uit`, contactvel van de gewijzigde scènes bekijken.

## Commit en push
Per film zodra die af en getest is: `git add` alleen jouw bestanden (nooit proefpagina's in `bibliotheek/`, die licentie_noot.py/teller.py raken; zet die terug met `git checkout -- bibliotheek`). Boodschap 'Regeling: <film> — keuzes Kamiel 29 okt verwerkt' (remake: 'Regeling: <film> lichte remake in donkere stijl (preview, oude blijft online)'), eindigend met
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01TZndM14WXefN1kPp1JWVam
Vóór de push `python3 scripts/controle.py` (moet ok zijn). Dan `git fetch origin main && git rebase --autostash origin/main && git push origin HEAD:main`; bij weigering wachten en opnieuw. Nooit force.

Eindbericht ≤ 200 woorden: wat veranderde, credits per take en totaal, wat getest is, wat open blijft.
