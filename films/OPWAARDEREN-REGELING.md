# Opwaardering thema Regeling naar prompt v13 (nacht 28–29 okt 2026)

Kamiel: 'ga maar zelfstandig beginnen' (28 okt 2026, 23:08), hij slaapt. Dit is een B14-opwaardering **zonder keuring** (lees `films/PROMPT_v13.md` § 14 helemaal, en Part C: C1, C2, C9, C10). Lees ook `CLAUDE.md` in de repo (bronmap, bronnenlogboek, speler, scripts) en `films/BEELDAFSPRAKEN.md` (bindend, ook de nieuwe afspraken van 28 okt: minder paars, DNA-palet B, eiwitten als kralenketen, kleur volgt zuurstof). Voorbeeld van een geslaagde opwaardering: `films/dna/3-van-dna-naar-eiwit/bron/info.md` (regels Versie, Prompt, Voldoet aan, Wijzigingen).

## Films (huidige stand: gemaakt 4–16 okt, prompt v2–v5, geen promptstempel)
- Zenuwstelsel 1 Eén seconde, 2 Het kabelnetwerk, 3 De spleet, 4 Knoeien met de spleet, 5 Het hoofdkantoor, 6 Leren en onthouden, 7 Slaap, 8 Zintuigen (`films/zenuwstelsel/`)
- Hormonen 1 Post voor iedereen, 2 Suiker in balans, 3 De baas van de klieren, 4 Stress, 5 Water in balans (`films/hormonen/`)
- Niet: Zenuwstelsel 9 (staat al op v10; alleen promptstempel naar v13 als je bij de laatste ronde tijd hebt, niet nodig).

## Wat je doet per film
1. **Triage eerst, alleen tekst** (§ 14 'Batches, cheap first'): info.md, script.md en grep in de scènebron op bekende problemen. Bouw de film uit `bron/` (zie `films/BRONMAPPEN.md`; uitpakken met `scripts/filmbron.py` als er geen bron is).
2. **Alleen wijzigingen die volgen uit regels die Kamiel al gaf**: grijze poppetjes → castpersonages (`personages/lib_cast.js`, `personages/ROLLEN.md`, `personages/LEVENSLOOP.md`); geen namen van castpersonages in stem of beeld (bovenbouw): een uitgesproken naam NIET opnieuw inspreken, maar noteren (zie 5); lichaam/organen via `personages/lib_anatomie.js` op hun echte plek, realistische maten; membranen gebogen, cellen rond, niets buiten het celmembraan; geen korrel/spikkels buiten cellen; Part C-kleuren en minder paars; eiwitten als kralenketen, mRNA dun en sliertig; objecten uit de nieuwe beeldbank (`bibliotheek/lib_bio.js`, zie `bibliotheek/README.md` en `bibliotheek/testvel.html`) waar de film nu een eigen, zwakkere tekening heeft (zenuwcel, synaps, hersenen, hypofysePoort, nierBijnier, bloedvat, membraan, receptor enz.). Kopieer daarvoor de actuele lib_bio.js naar de bronmap van de film. Alles wat nieuw is (andere aanpak van een scène, inhoudswijziging, nieuwe tekenstijl): NIET doen, noteren als vraag.
3. **Stem blijft**: script, vragen, timings en speler blijven; beeld past zich aan de bestaande take aan (§ 14 'What stays'). Geen ElevenLabs-opnames vannacht (Kamiel moet herinspreken eerst goedkeuren).
4. **Vakinhoud**: maak `bron/bronnen.md` volgens `films/BRONNEN.md` (zelf geopende bronnen, ≥2 onafhankelijk, ≥1 niveau A). Een fout met zo'n onderbouwing los je op in het beeld of door te knippen in de bestaande take; lukt dat niet zonder nieuwe opname, noteer hem.
5. **Afronden** (§ 14): versie ophogen, `| Prompt | v13 |` en 'Voldoet aan: prompt v13 (datum, zonder keuring)' met wat bewust niet, één regel per gewijzigde scène onder Wijzigingen, oude versie in `bron/oud/`. De datum in index.html blijft staan (opwaardering). Draai `scripts/spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` (met --check), `flipkaarten.py`, `licentie_noot.py`, `teller.py`. Speel elke vraag af met `?vragen=uit`. Maak één contactvel van alleen de gewijzigde scènes en kijk er zelf naar (Read de png).
6. **Lijsten voor Kamiel** (niet zelf doen): schrijf per film in `films/<map>/<film>/bron/opwaardering-v13.md`: (a) herinspreeklijst (alinea, reden, geschatte credits), (b) vragen over nieuwe aanpak/inhoud, (c) wat je veranderde.
7. **Niet aanraken**: index.html (Claude zet REVIEW zelf), andere films, bibliotheek/*.js (nieuw object nodig? Teken het in de bronmap van de film en noteer het voor de bibliotheek).
8. **Commit en push per film** zodra die af en getest is: `git add` alleen de bestanden van jouw film, boodschap 'Regeling: <film> opgewaardeerd naar prompt v13 (zonder keuring)', eindigend met
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01TZndM14WXefN1kPp1JWVam
Daarna `git fetch origin main && git rebase --autostash origin/main && git push origin HEAD:main`; bij weigering wachten en opnieuw (andere helpers pushen tegelijk). Nooit force.

Eindbericht ≤ 200 woorden: per film wat veranderde, wat getest is, en de herinspreek- en vragenlijst in één regel per punt.
