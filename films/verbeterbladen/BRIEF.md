# Brief: verbeterblad voor één film (feedback + opwaarderen naar de nieuwste prompt)

Je werkt voor Kamiel (biologiedocent, site in /home/claude/biologie-, lees eerst CLAUDE.md daar, vooral 'Elke nieuwe of aangepaste film krijgt een bronmap', 'Speler', 'Gedeelde tekenbibliotheek en opwaarderen', 'Personages', 'Lessen uit opmerkingen').
Kamiel heeft de film bekeken en opmerkingen gezet (zie het reviewbestand). Zijn werkafspraak (24 okt 2026): pak je een film aan voor feedback, loop hem dan in dezelfde ronde na tegen de nieuwste promptversie (v10), zodat hij nooit half verbeterd blijft. Jij maakt het VERBETERBLAD: de lijst voorstellen die Kamiel goedkeurt vóór er iets gebouwd wordt.

## Bronnen voor 'de nieuwste prompt' (de volledige v10-tekst is nu niet bereikbaar)
- films/PROMPT_v6.md (basis; Part B = script/stem, Part C = beeld)
- films/WERKWIJZE-LESSEN.md ('Verwerkt in prompt': v10 = C10 Tekenkwaliteit; kandidaatlessen erboven)
- films/BEELDAFSPRAKEN.md (algemene beeldfeedback van Kamiel; gaat voor)
- CLAUDE.md: B9/B11 (Vragen uit: niets van vraag of antwoord blijft over in geluid, ondertitels of beeld), B14 (laag voor laag verbeteren), C9 (bibliotheek/lib_bio.js), personages (castpersonages, lib_cast.js, lib_anatomie.js), donker standaard, flipkaarten/oefenen-afspraken
- films/logboek/README.md en fouten.jsonl (terugkerende soorten fouten)
- een voorbeeld van een eerder verbeterblad staat beschreven in films/voortplanting/2-geslachtsorganen-puberteit/bron/info.md onderaan ('Opwaardering naar prompt v8')

## Werkwijze
1. Lees de bronmap van de film (bron/info.md, script.md e.d.). Lees geen hele film-HTML; grep.
2. Maak stills op lage resolutie (960x540, webp q60) van elk reviewmoment en van een handvol representatieve scènes (bijv. één per hoofdstuk). Speel de film af met Playwright in /home/claude/biologie- (python, chromium in /opt/pw-browsers of standaard). Zoek in de film hoe je naar een globale tijd springt (bv. seekGlobal(t) of de tijdlijn in __TIMELINE__/TL). Bekijk elk reviewmoment ook met ?vragen=uit (5 s ervoor tot 5 s erna) als het om vraagresten gaat: zoek de echte oorzaak (welke code/tekst/audio), niet alleen het symptoom.
3. Loop de film na tegen de bronnen hierboven. Kritisch maar zuinig: alleen voorstellen die echt iets toevoegen; noem per voorstel het promptpunt (bv. 'C10 beeld = ondertitel', 'B9/B11 Vragen uit', 'BEELDAFSPRAKEN: …').
4. Uitspraak hoort NIET in jouw voorstellen per woord: dat loopt via een aparte uitspraaktest (zesenveertig, haploïd, DNA, ATP, Post voor iedereen, allel, genotype). Wel: noem welke alinea's opnieuw ingesproken moeten worden zodra de uitspraak gekozen is (één regel per alinea met de woorden erin), en of de film per alinea opnieuw ingesproken kan worden of één doorlopende take heeft.
5. Geef een eerlijk totaaladvies over de aanpak: klein herstel in de bestaande film, laag voor laag opwaarderen, of herbouwen in de huidige bouwstraat (films/vervolg/BOUWEN.md / FILMDATA). Met een grove inschatting van werk en ElevenLabs-credits.

## Niet doen
Niets in de repo wijzigen, niets committen, geen ElevenLabs-generaties, geen nieuwe artifacts.

## Uitvoer
Schrijf naar <uitmap>/voorstellen.json:
{"film": "...", "titel": "...", "promptversie_nu": "...", "advies": {"aanpak": "klein herstel|opwaarderen|herbouwen", "waarom": "2-4 zinnen", "werk": "...", "credits": "..."},
 "herinspreken": [{"alinea": "p05 of s04", "woorden": ["..."], "tijd": "1:28"}],
 "voorstellen": [{"id": "<kort>-1", "tijd": "m:ss of null", "bron": "review <firebase-id> | prompt v10 <punt> | eigen", "soort": "beeld|tekst|vragen uit|techniek|didactiek", "probleem": "1-2 zinnen, concreet wat je zag", "voorstel": "1-3 zinnen, wat er komt", "omvang": "klein|middel|groot", "still": "bestandsnaam of null"}]}
Stills in <uitmap>/stills/. Schrijf in gewoon Nederlands, zonder jargon dat Kamiel niet kent. Elk reviewpunt van Kamiel moet in een voorstel terugkomen (verwijs met zijn firebase-id), behalve de pure uitspraakpunten (die gaan in 'herinspreken').
Je eindbericht: alleen het pad van voorstellen.json en in 3 regels de belangrijkste conclusie.
