# Voortplanting: open punten uitvoeren (29 okt 2026)

Kamiel (29 okt 2026, na de overdracht): 'ik wil gewoon stapsgewijs alles doen wat moet gebeuren'. De hoofdsessie nam daarom de keuzes hieronder, in de lijn van Regeling (`films/UITVOEREN-REGELING.md`). Lees eerst `CLAUDE.md`, `films/OVERDRACHT-VOORTPLANTING.md`, `films/BEELDAFSPRAKEN.md` (bindend), `films/PROMPT_v13.md` Part C (C1, C2, C9, C10) en § 14, en van jouw film `bron/info.md`, `bron/opwaardering-v13.md`, `bron/bronnen.md`.

Repo: `/home/claude/biologie-`. Niet opnieuw clonen.

## Keuzes (hoofdsessie, 29 okt 2026)
1. **Hormoonkleuren films 1 en 2 gelijk met Les 2** (`tools/docent/voortplanting-2`, `HK()`): FSH groen, LH goud, oestrogeen koraal, progesteron paars, testosteron teal, hCG oker. GnRH (als releasing-hormoon) licht paars #B3A6DA. Legenda of naam bij de eerste keer (kleur nooit de enige drager).
2. **Prostaat (film 2)**: orgaankleur zoals de andere organen in `personages/lib_anatomie.js`/beeldbank, niet paars. **'Geslachtelijke voortplanting' (Celdeling)**: dezelfde kleur als in Les 1 Voortplanting (`tools/docent/voortplanting-1`) voor geslachtelijk; is dat paars, dan goud.
3. **Vader/moeder**: vader teal, moeder oker (zoals de Erfelijkheid-lessen en -films), ook als tekstkleur.
4. **Celdeling v01, s21, v02, s30, s33**: chromosomen omzetten naar de beeldbank (palet B), zoals de rest van de film.
5. **Celdeling s30**: `tumorGroei` uit de beeldbank gebruiken.
6. **Anticonceptie s11** telfiguren: blijven als neutrale pictogrammen (geen gezicht/smiley, geen castpersonage nodig voor een telling). Hebben ze een gezicht: weghalen.
7. **Van bevruchting tot baby lichte remake**: nu niet (geen regel vraagt erom). Blijft een mogelijkheid.
8. **Havo-modus Van bevruchting tot baby**: nu niet (vraagt een inhoudelijke keuze per blok); later met Kamiel.
9. **GGD-zin Anticonceptie s09**: aanpassen in dezelfde opname als de naam Sam (zie Inspreken), met ≥ 2 bronnen (≥ 1 niveau A) in `bronnen.md`. Tag in beeld meeveranderen.
10. **Chlamydia en onvruchtbaarheid**: toevoegen aan het docentdeel als het met ≥ 2 bronnen (≥ 1 A, bv. RIVM) klopt; formulering voorzichtig (kans klein, vooral bij onbehandelde, herhaalde infecties).
11. **AGS-getal (Sekse)**: zoek de actuele bron (PNS/RIVM-factsheet, neonatale hielprikscreening). Rust een ander getal op ≥ 2 bronnen met ≥ 1 A: in beeld/docentdeel aanpassen; staat het in de stem, dan alleen knippen als dat kan, anders noteren. Zonder onderbouwing: laten staan, `?` in bronnen.md.
12. **'Onttrekkingsbloeding, geen echte menstruatie'**: laten staan (klopt; controleer kort met 2 bronnen in bronnen.md).
13. **Placenta neemt het over**: controleer met ≥ 2 bronnen (≥ 1 A). Pas beeld/docentdeel aan naar de onderbouwde formulering (bv. 'rond week 10–12'); zit het in de stem en klopt het niet, noteer het voor de hoofdsessie.

## Inspreken (ElevenLabs) — alleen wat hier staat
Gebruik de voorstellen uit `bron/opwaardering-v13.md` van de film:
- **Geslachtsorganen** s01 (Sam en Daan → 'Twee jongens …', zie voorstel); s11 en s32: **knippen** (0 credits), niet inspreken.
- **Anticonceptie** s01 (Lotte, dokter Kim), s07 (Sam), s09 (Sam + GGD-zin): alleen de betreffende zinnen opnieuw en inplakken.
- **Sekse** s01: alleen zin 1 ('Je tante is twintig weken zwanger, en jij mag mee naar de echo.'), check of 'Noor' later in de alinea nog voorkomt.
- **Celdeling** x01 en x02 volgens het voorstel.
- **Van bevruchting tot baby** s04: niet (optioneel, overslaan).

Regels:
- Stem Roos, voice_id `7qdUFMklKPaaAVMsBTBt`. **Model = het model van de bestaande takes van jouw film** (`bron/info.md`; bijna allemaal `eleven_v4`), zodat de klank gelijk blijft. Controleer met `creative_get_model_schema` hoe je het model kiest.
- Eén flow per film (`creative_create_flow`), per stuk precies één `creative_generate_speech` met `generations_count: 1`. **Nooit herhalen**: wacht een mislukte of wachtende take af (`creative_get_flow_run_status`, poll_after_seconds). Andere helpers nemen tegelijk op; bij een weigering om gelijktijdigheid: wachten, dan de volgende.
- Pas eerst de vervangregels uit `films/uitspraak.json` toe (en `bron/uitspraak_film.json` als die er is). Schrijf de stem-invoer letterlijk in `bron/stem/`.
- Downloaden met curl naar de map met takes van de film; `scripts/silalign.py` voor woordtijden; inplakken in de bestaande take met een korte crossfade in een stilte; cues in de scènes op de nieuwe take afstemmen. Luister-check: zet de ondertitel en de woordtijden naast elkaar; geen dubbele of afgekapte woorden.
- Credits per take bijhouden en noteren in `bron/info.md` (Wijzigingen) en in je eindbericht.
- Na het inspreken staat er geen castnaam meer in stem of ondertitel (grep op Sam, Daan, Lotte, Kim, Noor, Linda, Ria, Petra in `bron/script.md`, segments en ondertitels).

## Afronden per film
Versie ophogen (x.y+1), regel per wijziging onder Wijzigingen, 'Voldoet aan' blijft v13, oude versie in `bron/oud/`, `bron/script.md` en `bron/bronnen.md` bijwerken, `opwaardering-v13.md` aanvullen met 'Uitgevoerd 29 okt 2026'. Draai `spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` (alle met --check na afloop), `flipkaarten.py`, `licentie_noot.py`, `teller.py`. Speel elke gewijzigde vraag af met `?vragen=uit`, maak een contactvel van alleen de gewijzigde scènes en kijk ernaar (Read de png). De datum in index.html blijft (opwaardering). Raak index.html niet aan.

## Commit en push
Per film zodra die af en getest is: `git add` alleen jouw bestanden (nooit proefpagina's in `bibliotheek/`; terugzetten met `git checkout -- bibliotheek`). Boodschap 'Voortplanting: <film> — open punten 29 okt uitgevoerd', eindigend met
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01TZndLwH4UUTWvaep8Mb4qt
Vóór de push `python3 scripts/controle.py` (moet ok zijn; een opwaardering zonder nieuwe datum hoeft geen B15-regel). Dan `git fetch origin main && git rebase --autostash origin/main && git push origin HEAD:main`; bij weigering wachten en opnieuw. Nooit force.

Eindbericht ≤ 200 woorden: wat veranderde, credits per take en totaal, wat getest is, wat open blijft.
