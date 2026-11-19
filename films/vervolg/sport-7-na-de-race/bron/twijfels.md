# Twijfels — sp7 Na de race (script_v2 ronde 2, 19 nov 2026, reeksmodus)

Elke twijfel met Twijfel, Waarom en **Besluit (reeksmodus)**: Claude heeft zelf beslist en noemt wat Kamiel bij de review anders kan kiezen.

## t0 Ronde 2: het blinde oordeel is leidend
- **Twijfel:** de echte blinde beoordelaar (claude-fable-5-2) gaf Y (= variant A, klassiek) 46, X (= C, casus) 45 en Z (= B) 45, en noemde de winst **nipt**. Hij adviseert een combinatie met X als geraamte.
- **Waarom:** het verschil is één punt en zit in dingen die in X met een paar zinnen te herstellen zijn. Wat Y mist (de vorm draagt het concept niet), is niet te herstellen.
- **Besluit (reeksmodus):** het advies gevolgd. Het geraamte is X, met overnames 1–5 en alle reparaties. De combinatie is niet opnieuw langs de beoordelaar geweest (geen agent in deze sessie): de vierde kolom staat nog open. Afwijking van het advies: 'alleen een tijd' staat na het antwoord van de doelenvraag, niet ervoor, omdat de zin ervoor het antwoord zou voorzeggen. **Kamiel kan:** toch variant A kiezen (`werk/script_A.md`, nipt de hoogste score).

## t1 (vervallen in ronde 2) B15 en feitenreview niet blind
- **Twijfel:** de beoordelaar en de feitenreviewer zijn de maker zelf.
- **Waarom:** in deze sessie was geen agent-tool beschikbaar, en `claude -p --model fable` en `--model sonnet` gaven twee keer een authenticatiefout. B15 stap 3 schrijft dan voor: 'B15 niet blind' melden.
- **Besluit (reeksmodus):** zelf gescoord met de vaste criteria: C 47 · A 44 · B 44, duidelijk. De log staat op `beoordelaar_model: "niet-blind"`, `beslist_door: "claude-reeksmodus"`. Telt niet mee voor de winkansen van de dobbelsteen (de hoofdsessie kan `nipt: true` of uitsluiten overwegen). **Kamiel kan:** de hoofdsessie een blinde beoordelaar laten draaien op `werk/blind/` (de varianten staan klaar onder X/Y/Z, sleutel in `werk/sleutel.json`), en een frisse feitenreview op script_v2.

## t2 Casus (grote mutatie) en P1
- **Twijfel:** casus staat niet in `concept_vormen`.
- **Waarom:** P1 vraagt een vorm die het concept naspeelt. Hier is het concept het verloop van één emotie in de tijd (bijsturen), en de casus met de paarse meter laat precies dat zien: omhoog, zakken, weer omhoog bij het samen appen, zakken bij het plan.
- **Besluit:** niet opnieuw geloot; de winnaar is de casus. **Kamiel kan:** variant A (klassiek, `werk/script_A.md`) kiezen als de tijdlijn te traag aanvoelt.

## t3 Kross alleen toegeschreven, boek niet geopend
- **Twijfel:** de film noemt Kross en Shift, maar het boek zelf is niet gelezen.
- **Waarom:** de brief zegt: alleen onderzoek noemen dat je zelf hebt geopend. Daarom schrijft de film Kross alleen beweringen toe die op de uitgeverspagina en in twee interviews en samenvattingen staan (B1–B3): emoties zijn informatie, zintuigen als gereedschap, en vermijden mag als het niet chronisch is. Elk onderzoek dat de film noemt, is zelf geopend en komt van anderen (Bratman, Lyubomirsky, Nils & Rimé). Geen van die onderzoeken wordt als 'onderzoek van Kross' gebracht.
- **Besluit:** zo houden. **Kamiel kan:** met het boek in de hand nagaan of de toegeschreven zinnen kloppen (bewering 2, 6, 7, 11).

## t4 'Je wordt alleen teleurgesteld over iets wat je belangrijk vindt'
- **Twijfel:** 'alleen' is stellig (bewering 4, ≈).
- **Waarom:** de zin volgt uit de appraisaltheorie, maar geen geopende bron zegt het zo letterlijk.
- **Besluit:** houden, omdat de zin het hart is van 'informatie'. **Kamiel kan:** de zin verzachten tot 'Teleurstelling komt meestal bij iets wat je belangrijk vindt'.

## t5 Co-ruminatie en het geslacht van de zwemmer
- **Twijfel:** de zwemmer is een jongen, maar de nadelen van co-ruminatie bleken vooral bij meisjes (Rose 2007).
- **Waarom:** het verhaal laat de meter na het appen oplopen. Dat steunt op Nils & Rimé (alleen meeleven gaf direct iets meer onrust), niet op Rose. De stem zegt eerlijk 'vooral bij meisjes'.
- **Besluit:** zo houden.

## t6 Cast: mentor en trainer in H6
- **Twijfel:** de reeks zet de zwemtrainer alleen in film 1, 2, 4 en 5; een mentor zit niet in de reekscast.
- **Waarom:** het plannen met mentor en trainer is het kleine stuk 'topsport naast school' (overname uit A).
- **Besluit:** de trainer staat als bekend castpersonage `zwemtrainer` kort bij het weekrooster, zonder tekst. De mentor is een bestaand docent-personage uit het castboek, naamloos (de bouwer kiest in `personages/ROLLEN.md` een rol 'docent/mentor' die niet botst). **Kamiel kan:** de mentor weglaten en alleen het rooster tonen.

## t7 Sam als zwemmer buiten het water
- **Twijfel:** de outfit `zwem` en de houdingen in het water komen in `lib_cast.js`. Deze film heeft ook nodig: Sam met handdoek om op de rand, met koptelefoon, op de bank, in bed met telefoon en in trainingsjack bij de sportpsycholoog.
- **Waarom:** of er een trainingsjack-garderobe en een liggende pose (bed) bestaan, kon ik niet nagaan zonder de castcode (BRIEF-cast is van een andere helper).
- **Besluit:** het storyboard vraagt om `zwem` + handdoek (s01–s09), `gewoon` (s06 bank, s10 bed: halfzittend tegen het kussen, geen liggende pose nodig) en een trainingsjack (s14–s20). Ontbreekt het trainingsjack, dan neemt de bouwer `gewoon`.

## t8 Fictieve tijden
- **Twijfel:** 'LIMIET 2:01,50 · TIJD 2:02,71' en de splittijden zijn verzonnen.
- **Waarom:** echte limieten verschillen per wedstrijd, leeftijd en seizoen. Een bord met een echte limiet zou nagecontroleerd moeten worden en snel verouderen. De tijden zijn realistisch voor een 16-jarige op nationaal jeugdniveau en tellen op.
- **Besluit:** geen label 'VOORBEELD' (het is duidelijk een verhaal). **Kamiel kan:** zijn leerling naar een passende tijd vragen.

## t9 Telpoppetjes in H5
- **Twijfel:** 369 zwemmers als silhouetten.
- **Waarom:** BEELDAFSPRAKEN staat telpoppetjes toe in een telling of grafiek; het gaat hier niet om personen met een verhaal.
- **Besluit:** telpoppetjes in drie groepjes.

## t10 Lengte
- **Twijfel:** na ronde 2 879 woorden; H4 heeft 202 woorden (onder de grens van 230).
- **Waarom:** vijf vragen kosten speeltijd; met de kaarten erbij komt de film rond 8 minuten.
- **Besluit:** zo houden.

## t11 Zes vragen of vijf (M4)
- **Twijfel:** de beoordelaar vond dat M4 ('hoe meer praten, hoe beter') geen eigen vraag had.
- **Waarom:** een zesde vraag bij de appscène maakt H3 vol, met twee vragen achter elkaar.
- **Besluit:** de steunvraag heeft nu de optie (b) 'allebei even goed, als je maar praat': wie M4 gelooft, kiest die. **Kamiel kan:** een aparte vraag 'Lucht dat op? Wat denk je?' bij de appjes toevoegen.

## Ronde 3 (feitenreview v2 en blind ronde 2; definitief)
- **t0 bijgewerkt:** de combinatie won blind ronde 2 **duidelijk** (54 tegen 46 · 45 · 45). Daarmee is t0 gesloten. De beoordelaar merkte op dat de kop van script_v2 de sleutel verklapte en dat hij op hetzelfde model draaide. De kop is nu schoon (de geschiedenis staat in `werk/rondegeschiedenis.md`).
- **t3 bijgewerkt:** 'Shift' staat niet meer in de stem ('Volgens hem …'); de titel staat alleen op het meta-kaartje.
- **t12 Burton geschrapt.** Twijfel: doelentraining bij zwemmers sloot mooi aan. Waarom: te stellig (één team, geen loting) en de training ging over prestatiedoelen. Besluit: geschrapt. Kamiel kan hem terugzetten in het docentdeel.
- **t13 Opleidingen alleen Amsterdam.** Twijfel: Groningen (RUG) viel weg; voor een docent in het oosten is dat misschien jammer. Waarom: er is alleen een bron voor de RUG-bachelor, niet voor een master met sportpsychologie (feitenreview M3). Besluit: Amsterdam (UvA, VU) plus 'met veel sportpsychologie erin' voor de BASP-eis. Kamiel kan een Groningse of Nijmeegse master toevoegen zodra een bron er een BASP-route voor noemt. De VSPN-eisen zijn van 2018 en vspn.nl is niet geopend.
- **t14 'Dat dempt een emotie.'** Twijfel: dit is een algemene uitspraak over afstand nemen in een film die dat aan film 6 overlaat. Waarom: de feitenreview eiste dat afstand een bron en een functie heeft (M2). Besluit: één korte zin met B27 en B2. Kamiel kan de zin schrappen als film 6 het al uitlegt.
- **t15 Vraag 2.** De stam zegt nu 'Morgen kijkt hij er wel naar', zodat 'ja, vermijden is altijd slecht' echt fout is (feitenreview K7).
- **t16 Verzonnen keerpuntvideo.** 'Op de video zijn zijn keerpunten slap' is verhaal, geen feit (bewering 23, ≈).
