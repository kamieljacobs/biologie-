# Twijfels — sport-3 Sterk op het droge (script_v2 definitief, ronde 3, 19 nov 2026)

Reeksmodus: Claude beslist zelf; Kamiel kan bij de review anders kiezen. Elk punt: Twijfel · Waarom · Besluit (reeksmodus) · Kamiel kan anders kiezen.

| # | Twijfel | Besluit | Andere keuze |
|---|---|---|---|
| t1 | Blind oordeel wijkt af van het zelfoordeel | Blind oordeel leidend: geraamte A; frisse feitenreview gedaan (ronde 3) | — |
| t2 | Outfit van Sam in de krachtzaal | `zomer` (t-shirt); `kracht` als de casthelper een korte broek kan maken | Nieuwe sportoutfit |
| t3 | Krachtzaal als nieuw decor | Krachtzaal naast het bad, raam op het bad | Alleen navy-schema |
| t4 | Poses die de cast misschien niet kan | Testvel: plank, staande buitenrotatie met elastiek, sprong | Andere oefeningen |
| t5 | 'In een vijfentwintigmeterbad meer dan de helft' | Houden, met de definitie van start en keerpunt op het kaartje | Weglaten |
| t6 | Achttienduizend per week | 'Gemiddeld zo'n' (review K2) | 'Duizenden keren per week' |
| t7 | Opleidingszin | Eigen slotzin | Vaste reekszin |
| t8 | Femke als sportfysiotherapeut | Femke, `werk` | Nieuw personage |
| t9 | Botten | Niet in deze film (film 5) | Eén zin |
| t10 | Gedachte-experiment met twee baangenoten | Label VOORBEELD, geen uitslag, geen pijn bij één van beiden | Geen tweede zwemmer |
| t11 | Krachttrainer heeft geen castpersonage | Nieuw beroepspersonage `krachttrainer` (zonder naam) | De zwemtrainer zegt de zin |
| t12 | Vraag over schouderpijn (M5) | Houden als verwijsvraag, geen diagnose | Alleen een zin, geen vraag |
| t13 | Salto bij het keerpunt kan `zwemmer()` niet | Bouwer tekent de salto met de skeletopties; anders alleen de afzet | Keerpunt als stil beeld |

---

## t1 Blind oordeel, en de feitenreview
- **Twijfel:** het zelfoordeel koos variant B (seizoenstest, 45–43–41). De echte blinde beoordelaar (claude-fable-5-2) koos duidelijk variant A (Y 48, X 44, Z 44): alleen A beantwoordt de startvraag (leerdoel 2), en A is nergens stelliger dan het bewijs. B had een rekenfout in de behandeling ('een paar procent = halve seconde').
- **Waarom:** B15 maakt het blinde oordeel leidend. De vorige script_v2 (op B gebouwd) staat in `werk/script_v2_zelfoordeel.md`.
- **Besluit (reeksmodus):** geraamte A, met de overnames uit X (keerpunt, plank naast het onderwaterbeeld, de fysiotherapeut met het elastiek) en Z (gedachte-experiment in H4). Ronde 3: een frisse reviewer (sonnet, `reviews/review_v2.md`) vond 5 MOET en 10 KAN; alle MOET en alle KAN zijn verwerkt (zie `bronnen.md`, Aanpassingen). Een tweede blinde ronde is er voor deze film niet geweest (`oordeel_blind2.md` bestaat niet), dus geen combinatieregel in `mutaties.jsonl`.
- **Kamiel kan anders kiezen:** toch variant B (seizoenstest) of C (wedstrijd).

## t2 Sams outfit in de krachtzaal
- **Twijfel:** Sam heeft `school`, `zomer` en `zwem`, geen sportoutfit.
- **Waarom:** een zwembroek in de krachtzaal klopt niet; `zomer` komt in de buurt.
- **Besluit:** `zomer`; een outfit `kracht` (t-shirt `zomer`, korte broek, sportschoenen) als de casthelper die snel kan maken.
- **Kamiel kan anders kiezen:** een echte sportoutfit laten maken.

## t3 Krachtzaal als decor
- **Twijfel:** het decor bestaat nog niet.
- **Waarom:** de cold open, H1 (de krachttrainer), H2 (plank), H3 (elastiek) en de recap spelen zich daar echt af; de grafieken en de keten staan op navy.
- **Besluit:** nieuw decor via de brand kit 'filmdecor', één variant: rek met gewichten, springmat, elastiek aan het rek, raam met zicht op het bad.
- **Kamiel kan anders kiezen:** zonder decor.

## t4 Poses
- **Twijfel:** plank op ellebogen en tenen (zijaanzicht), staand de arm naar buiten draaien tegen een elastiek (elleboog tegen de zij, 90°), sprong vanuit stand. `persoon()` heeft daar geen vaste pose voor; de API heeft wel skeletopties (`been1`, `been2`, `voorover`, `vrij`).
- **Waarom:** een fout getekende plank of schoudertest valt een zwemmer meteen op. De buikligging uit de vorige versie is vervallen (staand is makkelijker en dezelfde spieren).
- **Besluit:** testvel met de drie poses vóór de bouw (C10.4).
- **Kamiel kan anders kiezen:** andere oefeningen.

## t5 'In een vijfentwintigmeterbad meer dan de helft'
- **Twijfel:** één dataset (EK korte baan 2019, vrouwen).
- **Waarom:** zonder die zin is optie (b) 'ongeveer de helft' voor een korte-baanzwemmer juist; de vraag noemt daarom het vijftigmeterbad.
- **Besluit:** houden.
- **Kamiel kan anders kiezen:** weglaten.

## t6 Achttienduizend per week
- **Twijfel:** het getal komt van Amerikaanse universiteitszwemmers.
- **Waarom:** 'op hoog niveau … al gauw' dekt het; de tweede bron ligt hoger.
- **Besluit:** houden.
- **Kamiel kan anders kiezen:** 'al gauw tienduizenden keren per week'.

## t7 Opleidingszin
- **Twijfel:** geen vaste reekszin en geen `opleidingen`-blok voor `sport` in `vervolg.html`.
- **Waarom:** deze film toont trainer en fysiotherapeut; gecontroleerd: VU en RUG (Bewegingswetenschappen), HAN Sportkunde, hbo-master Sportfysiotherapie.
- **Besluit:** eigen slotzin.
- **Kamiel kan anders kiezen:** één vaste reekszin voor alle zeven films.

## t8 Femke als sportfysiotherapeut
- **Twijfel / Waarom:** de reeksbrief kiest Femke; bestaande vakpersonages eerst.
- **Besluit:** Femke, `werk`; LEVENSLOOP: 'sportfysiotherapeut van de zwemmer (Sport 3)'.
- **Kamiel kan anders kiezen:** een nieuwe sportfysiotherapeut.

## t9 Botten
- **Besluit:** niet in deze film (film 5: 'sterkere spieren en botten').

## t10 Gedachte-experiment met twee baangenoten
- **Twijfel:** een verzonnen race kan meer beloven dan het bewijs.
- **Waarom:** de blinde beoordelaar adviseerde dit als H4, maar zonder scorebord, zonder uitslag en zonder blessure. Daarom staat bij de finish alleen '1–3 %?' en 'VOORBEELD · GEEN ECHTE UITSLAG', en stelt de film de M1-vraag vóór de finish.
- **Besluit:** Sam en figurant Daan (`zwem`), naamloos, neutraal.
- **Kamiel kan anders kiezen:** de vraag zonder tweede zwemmer.

## t11 Krachttrainer
- **Twijfel:** de blinde beoordelaar wil dat de krachttrainer een gezicht en een zin krijgt; er is geen castpersonage.
- **Waarom:** in de zwemsport is een krachttrainer vaak iemand anders dan de zwemtrainer; geen bestaand personage past (castboek gecontroleerd).
- **Besluit:** nieuw beroepspersonage `krachttrainer` (± 30, sportkleding, zonder naam), als castvel-edit zoals de zwemtrainer, voor alleen H1 en de recap. Lukt dat niet vóór de bouw, dan zegt de zwemtrainer de zin in de krachtzaal en wordt 'zegt de krachttrainer' 'zegt de trainer'; dat beslist de bouwer vóór het inspreken.
- **Kamiel kan anders kiezen:** altijd de zwemtrainer.

## t12 Vraag over schouderpijn (M5)
- **Twijfel:** raakt aan medisch advies.
- **Waarom:** de reeksbrief staat 'blessure → naar een fysiotherapeut of sportarts' toe; de vraag test de misvatting 'pijn hoort erbij' en geeft geen diagnose of oefening.
- **Besluit:** houden.
- **Kamiel kan anders kiezen:** alleen als zin.

## t13 Salto bij het keerpunt
- **Twijfel:** `zwemmer()` heeft geen keerpunt-salto (API-sport.md: slagen, stroomlijn, startblok).
- **Waarom:** het muurcontact met gebogen knieën en de afzet in de stroomlijn zijn het belangrijkste; de salto zelf is snel.
- **Besluit:** de bouwer tekent de salto met de skeletopties (`voorover`, `been1/2`, `vrij`) en laat het testvel zien; lukt het niet, dan begint het beeld bij de voeten tegen de muur.
- **Kamiel kan anders kiezen:** keerpunt als stil beeld.

## t14 Schoudervraag na de feitenreview
- **Twijfel:** de review (M2) vond dat 'nee, de binnendraaiers winnen het' te stellig was en dat een afleider deels waar was.
- **Waarom:** de bronnen spreken elkaar tegen (één studie met 20 jongens tegenover tegengestelde metingen); een vraagkaart mag geen optie hebben die ook goed is.
- **Besluit (reeksmodus):** 'Wat gebeurt er bij veel zwemmers met de spieren rond de schouder?' met (a) 'de grote binnendraaiers worden vaak het sterkst' tegenover duidelijk foute afleiders ('precies even sterk', 'te weinig werk'); het antwoord zegt 'onderzoek spreekt elkaar hierover wel tegen'.
- **Kamiel kan anders kiezen:** de vraag schrappen en het als zin vertellen (scheelt ± 25 woorden).

## t15 'In het water de belasting slecht precies opvoeren'
- **Twijfel:** de startvraag ('water weegt bijna niets') nodigt uit tot 'in water kun je niet zwaar trainen'; dat is te stellig (weerstandszwemmen bestaat, water geeft tegenwicht dat met je snelheid groeit).
- **Besluit:** het antwoord gaat nu over doseren: in de krachtzaal kies je zelf hoe zwaar en voer je het stap voor stap op; 'juist daarom' is uit de recap.
- **Kamiel kan anders kiezen:** weerstandszwemmen (parachute, elastiek in het bad) noemen als tussenvorm (± 15 woorden).
