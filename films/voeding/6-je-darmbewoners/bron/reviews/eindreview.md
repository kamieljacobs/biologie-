# Eindreview — Je darmbewoners (Voeding 6/6)

Frisse-ogen review van de definitieve versie: `script_v2.md`, `film.json`, `scenes.js`, `storyboard.md`, de drie eerdere reviews, `curriculum_input.md`, de contactsheets `sheet2_0.jpg` t/m `sheet2_5.jpg` en eigen stills uit `film/standalone.html` (playwright, `window.__still`). Regelnummers verwijzen naar `scenes.js` tenzij anders vermeld. Ernst: **blokkerend** (niet publiceren), **moet** (vóór publicatie), **mag** (volgende versie).

Eerst het goede nieuws: de vier echte fouten uit de expertreview van v1 (cellulose, methaan, "sommige kunnen niet tegen zuurstof", opzet Van Nood) zijn in v2 allemaal correct opgelost. Alle zes `correct`-indices in `film.json` kloppen met het script. De vwo-blokken zijn schoon afgebakend en havo-mode slaat ze over zonder gat. De eindkaart die op `sheet2_5.jpg` nog aan twee kanten was afgesneden, is in de huidige build (qa3) al gerepareerd.

Wat ik wél vond, zit vooral in de beeldregie: vijf triggerwoorden in `scenes.js` matchen een eerder woord dan bedoeld (`q.at` zoekt een substring, hoofdletterongevoelig), waardoor labels te vroeg verschijnen of nooit; één grafiek spreekt de tekst tegen; en de paardzin heeft geen beeld.

---

## 1. Vakinhoudelijke juistheid

Geen blokkerende fouten. Gecontroleerd tegen Sender/Fuchs/Milo 2016, Tomlin 1991, Sahakian 2010, McNeil 1984, Donohoe 2011, Van Nood 2013 (NEJM 368:407), Palleja 2018, Allen 2013 (PLACIDE), Sudo 2004, Valles-Colomer 2019.

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| moet | s21 (script r. 96), s24 (r. 105), eindkaart r. 119, bord s08 (r. 44) | De film definieert *vastgesteld* als "meerdere onderzoeken met een controlegroep wijzen dezelfde kant op" en sluit af met "zonder controlegroep geen plek op het bord". Maar de eerste twee bordregels (40 biljoen bacteriën zonder zuurstof; vezels → gassen en korte vetzuren) zijn tellingen en metingen zonder controlegroep, en staan tóch bij vastgesteld. De film spreekt zijn eigen as tegen; een oplettende vwo-leerling ziet dat. | Zonder heropname: eindkaart r. 119 → `Bewijsbord: vastgesteld · waarschijnlijk · hypothese; "het werkt" alleen met een controlegroep.` Met heropname van s21 (één zin): `Vastgesteld: het is meerdere keren gemeten, of meerdere onderzoeken met een controlegroep wijzen dezelfde kant op.` en s24 laatste zin: `Terug naar de hoofdlijn: of iets werkt, komt zonder controlegroep niet op het bord.` Glossary-item "vastgesteld / waarschijnlijk / hypothese" in film.json r. 97 gelijktrekken. |
| moet | film.json glossary + docentdeel (r. 115, tabel examenvragen) | Het CE 2018-I noemt de bacterie *Clostridium difficile* (oude naam); de film zegt alleen *Clostridioides*. Een leerling die het examen oefent, herkent de naam niet als dezelfde. | Glossary-item toevoegen: `{"t": "Clostridioides difficile", "d": "De ziekmaker uit de film. In oudere teksten en in het examen van 2018 heet hij nog Clostridium difficile; het is dezelfde bacterie. Vormt sporen en maakt gifstoffen (toxinen)."}` Ook in de docentdeel-tabel bij 2018-I vr 35–40 "(daar: Clostridium difficile)". |
| mag | s22 (script r. 100) | "Darmbacteriën maken stoffen die via het bloed en de zenuwen de hersenen kunnen bereiken." Stoffen reizen via het bloed; via de zenuwen (nervus vagus) gaan signalen, geen stoffen. | `Darmbacteriën maken stoffen die via het bloed de hersenen kunnen bereiken, en ze prikkelen zenuwen die naar de hersenen lopen.` |
| mag | s12 (script r. 60) | "Daar wordt cellulose wél grotendeels afgebroken" — bij het paard is de celluloseverteerbaarheid ongeveer 40–60 %; "een groot deel" is veiliger dan "grotendeels". En de fermentatie zit bij het paard vooral in de blinde darm + dikke darm (CE 2026-II zegt letterlijk "blinde darm en dikke darm"). | `Een paard heeft dezelfde opzet als jij, maar met een reusachtige blinde darm en dikke darm vol bacteriën. Daar wordt een groot deel van de cellulose wél afgebroken; zo leeft een paard op gras.` |
| mag | s17 (script r. 81), glossary "spore" | "Het antibioticum komt daar niet doorheen" is een versimpeling: een spore is vooral stofwisselingsinactief, dus het antibioticum heeft er geen aangrijpingspunt. Voor havo prima; staat niet in het docentdeel. | Docentdeel, bij C. difficile: "sporen zijn stofwisselingsinactief; antibiotica die de celwandopbouw of eiwitsynthese remmen, grijpen er niet op aan". |
| mag | s19 (script r. 91) | "Een probioticum is een drankje met levende bacteriën" — ook capsules en zuivel; als definitie te smal. | `Een probioticum is bijvoorbeeld een drankje met levende bacteriën.` |
| mag | q16 optie a | "hij leeft van de dode bacteriën die de kuur achterlaat" is als afleider niet volledig onjuist (C. difficile is proteolytisch). Didactisch werkt hij, maar zet in het docentdeel dat het hoofdmechanisme concurrentie is en dat a hooguit een bijdrage is. | Eén zin in "Nuances die de film weglaat". |

Verder gecontroleerd en juist: 40 biljoen ≈ 4·10¹³ ≈ aantal lichaamscellen; ≈ 200 g; 1,5 m; zuurstofgradiënt vanaf de wand; pH licht zuur tot neutraal; H₂ + CO₂ door bacteriën, CH₄ door archaea bij ≈ 1 op de 3; 0,5–1,5 L winden; geur door zwavelverbindingen; 5–10 % energie uit korteketenvetzuren; boterzuur als brandstof colonocyten; kiemvrije muizen dunnere darmwand; vitamine K kleine bijdrage; cellulose bij de mens grotendeels niet vergist; dragerschap ≈ 1 op 10; herstel grotendeels in weken, sommige soorten maanden; Van Nood: loting, allen vancomycine, 81 % vs 31 %, interimstop; probiotica: Cochrane bescheiden effect, PLACIDE geen effect → "waarschijnlijk" is eerlijk; obesitas: muis ja, mens verband → hypothese; darm-hersen-as: verband ≠ oorzaak, dieet als confounder; ontlasting ≈ ⅓ van de vaste stof bacteriën, bruin door omgezet bilirubine.

## 2. Aansluiting CE-syllabus; geen letterlijke CE-vragen

Geen enkele filmvraag of checkvraag kopieert een CE-vraag. q06 (open schaaltje) deelt de kennis met 2018-I vr 40 maar niet de zes-optietabel; q16 deelt de redenering met 2018-I vr 36 maar is een voorspel-meerkeuze met een resistentie-afleider; q10 ligt het dichtst bij 2026-II vr 43 (proces × gas) maar met andere context en afleiders. Checkvragen 1–5 zijn eigen vragen in examenstijl. Het docentdeel verwijst naar CE-vragen alleen met nummer, niet met tekst. In orde.

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| moet | eindkaart r. 119, glossary | Het CE-woord **waterresorptie** komt nergens voor (drie CE-vragen scoren erop; de curriculumreview zette dit op "hoog"). De narratie zegt steeds "water terugnemen", wat goed is, maar de leerling moet het examenwoord herkennen. Kan zonder heropname. | Eindkaart r. 118: `... diarree = water niet terug (minder waterresorptie).` Glossary toevoegen: `{"t": "waterresorptie", "d": "Het terugnemen van water door de darmwand, vooral in de dikke darm. Diarree: er blijft meer water in de darm dan er wordt geresorbeerd. Examenwoord."}` |
| mag | s17 (script r. 83) | "gifstoffen" zonder het CE-woord **toxine**; **peristaltiek** als tweede diarreeroute (2022-II vr 17) ontbreekt; **cellulase** (2018-II vr 41) ontbreekt. | Bij heropname van s17: `maakt de ziekmaker gifstoffen, toxinen.` Zonder heropname: alle drie in de glossary en het docentdeel (toxine staat al in het docentdeel). |
| mag | checkvraag 3 uitspraak 3 (film.json r. 115) | "Vezels zijn voedsel voor gunstige darmbacteriën en geven die een voordeel ten opzichte van ziekmakers" wordt als *juist* gescoord, maar de film zegt dit nergens (de brug vezels → selectievoordeel uit curriculumreview punt 4 is niet overgenomen). De leerling moet het afleiden uit H2 + H3; dat kan, maar het is een transfervraag, geen controlevraag. | Of één zin in s21 na "Op het bord: waarschijnlijk." → `Wat wél helpt, is eten voor de gunstige soorten: vezels. Wie veel vezels eet, geeft ze een voorsprong in de concurrentie.` Of in het antwoordmodel vermelden: "(toepassing van H2 en H3; niet letterlijk in de film)". |
| mag | docentdeel | "Vwo-examens zijn voor deze film niet nagelopen" staat er eerlijk. Laat dat zo, maar voeg de zoekwoorden voor de Examenatlas toe (darmbacteriën, microbioom, Clostridium, fecale, methaan, kiemvrij) zodat Kamiel het later kan aanvullen. | Eén regel. |

## 3. Didactiek en vragen

Structuur klopt: cold open (22 s) → q02 → titel → H1 met q06 vóór de uitleg → H2 met q10 vóór de gistinguitleg → H3 met q16 vóór de twee stappen en q20 vóór de controlegroep → recap die de puzzel op het bord zet. Elk hoofdstuk heeft een mini-vraag (film.json `minis`). Misconcepties 1–7 uit script r. 12 worden alle benoemd en ontkracht.

Vragen: alle zes hebben precies één juist antwoord en de `correct`-indices kloppen (q02→1=b, q06→1=b, q10→1=b, q16→1=b, q20→0=a, q23→2=c). Optielengtes zijn redelijk gebalanceerd (q02: 10/12/8 woorden; q16: 9/10/9; q20: 8/8/9).

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| mag | q10 | Het juiste antwoord ("gisting, zonder zuurstof") volgt direct uit s07 (30 s eerder: "bijna geen zuurstof"). Het is een consolidatievraag, geen voorspelvraag; de pedagogiekreview wilde dit, dus bewust. Afleider c (alvleesklier) toetst wél misconceptie 4. Laten staan. | — |
| mag | q23 | Optie c is de "voorzichtige" optie; leerlingen die het patroon kennen kiezen die zonder na te denken. Sterker zou zijn: c = "dat de twee samengaan; welke kant het op werkt, weet je niet". | Optie c: `alleen dat de twee samengaan, niet wat de oorzaak is` |
| mag | q02 explain (film.json r. 25) | "Onthoud je keuze" — prima. Maar de speler toont `chosen` pas bij reveal; controleer dat q02 géén goed/fout-feedback geeft (puzzelvraag). Op de stills staat alleen "DENK NA…", dus dat lijkt goed. | — |
| mag | lengte | Basis ≈ 10,6 min (1490 basiswoorden + 5 vraagsegmenten), vwo ≈ 12,5 min. Boven het doel van ≈ 10 min, vooral door s17 (60 s) en s18 (57 s). Niet blokkerend. | Volgende versie: s17 inkorten (de zin "Resistentie is iets anders…" kan naar de q16-explain). |

## 4. Taal en consistentie

Havo-begrijpelijk, korte zinnen, geen anglicismen in de narratie ("Recap" als hoofdstuknaam is seriestijl). Termen consistent: "korte vetzuren" (basis) ↔ "korteketenvetzuren" (vwo, glossary beide); "de ziekmaker" na één keer voluit; "bord"/"bewijsbord"; "poeptransplantatie" ingevoerd in s18 vóór gebruik. Script ↔ segments.json ↔ ondertitels ↔ audio-woorden: identiek (gecontroleerd per regel). Glossary ↔ script: consistent. Checkvraag-antwoorden ↔ script: consistent.

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| moet | stem-invoer s11 (segments.json `voice`, woord "koolstofdioxide") | De stem-invoer is overal gelijk aan de displaytekst; er zijn géén respellings toegepast. Kamiels vaste uitspraaklijst zegt: "koolstofdioxide" invoeren als "koolstofdie-oxide". Dat is hier niet gebeurd. Ik kan niet luisteren; dit moet bij de batch-uitspraakcontrole als eerste. | Wachtlijst voor deze film (voor `bron/info.md`): koolstofdioxide (s11), Clostridioides difficile (s15, q16-kaart), archaea (s11), obligaat anaeroob (s14), propionzuur (s14), mutualisme (s08), microbioom (s05 e.v.), probioticum/probiotica (s19, s21), kiemvrije (s14, s22), zevenendertig (s05), biljoen (s04, s05, s08). |
| mag | film.json `lead` | "ze houden ziekmakers in toom door ze te beconcurreren" — "beconcurreren" is correct Nederlands maar stijf voor havo. | `…en ze houden ziekmakers klein door ze voedsel en plek af te pakken.` |
| mag | engine (standalone.html, transcript) | `.replace(/ee-er/g,'ER').replace(/dee-en-aa…` zijn restanten van film 4/5; onschadelijk hier, maar bij een woord als "ee-er" in een latere film zou het verkeerd vervangen. | Opruimen in `engine/build.py` of per film uitzetten. |

## 5. Beeld (contactsheets + eigen stills)

Dit is het zwakste punt van deze versie. `q.at(w, n)` zoekt hoofdletterongevoelig naar het n-de woord dat `w` *bevat*; vijf triggers raken daardoor een verkeerd woord.

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| **blokkerend** | s04, r. 141 + r. 151–152 | `enz = q.on('enzymen')` matcht de eerste "enzymen" in "plantenstoffen die je eigen **enzymen** niet kunnen knippen" (≈ 14 s), niet "maakt zelf geen enzymen" (≈ 27 s). Gevolg: (1) de tag "geen eigen enzymen" staat 12 s te vroeg in beeld, bij de vezelzin (still s04_016); (2) de pijlen + label "WATER TERUG" worden met `wt * (1 - enz)` weggedrukt en verschijnen **nooit** (still s04_026: narratie "Hij neemt water terug, dat zag je in film twee" bij een leeg scherm). | r. 141: `enz = q.on('enzymen', 2, 0.8)`. Daarmee werkt r. 151 vanzelf. |
| moet | s07, r. 169 + r. 177–178 | `na = q.on('na')` matcht "**na**ar" in "Zuurstof komt via het bloed naar de darmwand" (≈ 16 s). De groene tag "nabootsen: geen zuurstof · 37 °C · licht zuur tot neutraal" staat vanaf 16 s in beeld terwijl de narratie nog de zuurstofgradiënt uitlegt (stills s07_016.75 en s07_018), en de tag "zuurstof is giftig…" verdwijnt daardoor na 3 s. | r. 169: `na = q.on('bootst', 1, 1.0)` (uit "bootst de darm na"). |
| moet | s15, r. 258–260 + r. 79 | Tijdens "Bij ongeveer één op de tien gezonde mensen zit die er, in **kleine aantallen**, zonder last" staat de rode ziekmakerlijn al op het maximum (u = 0,95, still s15_038). Het beeld spreekt de tekst tegen en verklapt de uitgroei vóór de vraag. In s17 wordt de uitgroei al getoond (u van 0,42 → 0,7). | In `populaties` een optie `uZiek` toevoegen: `const uz = Math.min(u, o.uZiek ?? 1)` en de ziekmakerreeks tekenen tot `uz` in plaats van `u`. In s15 r. 260: `populaties(ctx, u, kijk, { t, ziek: cl, herstel: 1, uZiek: 0.42 })`. |
| moet | s15/s17, r. 87 (legenda in `populaties`) | De legenda staat op `lx = x + w - 300`, `ly = y - h + 30 + i*36` (1400–1700, 370–480): precies waar de herstelde lijnen en hun eindstippen lopen. Op s15_035/046 en s17_055 lopen de groene en rode lijn dwars door "vezelafbrekers" en "de ziekmaker". | r. 87: `const lx = x + ab[1] * w + 30, ly = y - h + 30 + i * 36;` (legenda in de lege ruimte direct rechts van de kuurband, waar de lijnen laag zitten). |
| moet | s12, r. 222–233 | De paardzin (script r. 60, ≈ 10 s: "Een paard heeft dezelfde opzet als jij…") heeft geen beeld; het scherm toont nog "vitamine K · EEN KLEIN DEEL NEEM JE OP" (still s12_038). | Toevoegen in s12: `const pa = q.on('paard', 1, 1.0), gras = q.on('gras', 1, 0.8);` en `vit * (1 - pa)` op de vitamineregel; dan `tag(ctx, 'paard: reusachtige dikke darm vol bacteriën', 1400, 560, BAC3, pa * (1 - gras)); tag(ctx, 'cellulose wél grotendeels afgebroken', 1400, 560, BAC3, gras);`. Eventueel een eenvoudige buis met bacteriën (hergebruik `dikkeDarm` op schaal 0,5 rechts). |
| moet | s04, r. 149 + r. 152–153 | Label "WAT OVERBLIJFT" (690, 660) loopt door het linkerbeen van de dikke darm (still s04_026). Tags "geen eigen enzymen" en "wat nog geknipt wordt, doen bacteriën" op x = 1340 lopen door het rechterbeen van de buis (r. 51: buis tot x ≈ 1250 + straal). | r. 149: y = 600 en x = 560 (`'left'`), of de buispunten in `dikkeDarm` r. 51 korter maken (`y + 140 * s` in plaats van `y + 200 * s`). r. 152–153: x = 1500. |
| mag | s18, r. 291 | `acht = q.on('acht')` matcht "ge**bracht**" (≈ 8 s). "8 van de 10 genezen" staat daardoor al in beeld zodra de kolom verschijnt (still s18_028.70, narratie "De andere groep: een korte kuur…"), 5 s vóór "ruim acht van de tien". | `acht = q.on('ruim', 1, 1.0)`. |
| mag | s24, r. 350 | `a = q.on('a')` matcht "**A**ntwoord" (0 s), `b = q.on('b')` matcht "ver**b**and" (≈ 1,5 s): beide pijlen staan er vanaf het begin, niet bij "Het kan a zijn, het kan b zijn" (still s24_002). | `a = q.on('kan', 1, 0.6), b = q.on('kan', 2, 0.6)`. |
| mag | s17, r. 268 | `twee = q.on('Twee')` matcht "**Twee** stappen" (≈ 1 s) in plaats van "Twee: zonder concurrentie" (≈ 6 s): tag 2 en de grafiek springen tegelijk met tag 1. | `twee = q.on('Twee', 2, 0.8)`. |
| mag | s17, r. 284–287 | Bij "Een nieuwe antibioticakuur doodt de actieve bacteriën" stijgt de rode lijn ongestoord door en er is geen tweede kuurband (still s17_058). | Tweede band: `ab: [0.2, 0.4]` → extra band tekenen op [0.72, 0.8] en de ziekmaker in `ZIEK_F` tussen 0.72–0.8 laten dippen naar 0,5 en daarna weer stijgen. Tag r. 287 van y = 820 naar y = 880 (staat nu op de as). |
| mag | s05, r. 165 | Het open deksel van het petrischaaltje (1480+230, 400−120) raakt het label "microbioom · ALLE MICRO-ORGANISMEN SAMEN" en de zwerm loopt door "OPEN SCHAALTJE" (still s05_021). | Petrischaal naar (1560, 440) en zwerm in s05 beperken tot x ≤ 1150 zodra `kw2 > 0`. |
| mag | q-kaarten | Prima leesbaar; vwo-kaart q23 heeft de paarse balk + "VWO". |

Gecontroleerd en in orde: titelkaart, hoofdstukkaarten, s08 mutualisme-schema, s09 vezels/schaar, s11 gassen + archaea, s13 water/diarree, s14 muizen, s18 donor → slang → onderzoek, s19/s21 stippengroepen, s21 bewijsbord met definities (wrapt netjes), s22/s24 darm–hersenen, s25 man + inzet, s26 reis van het broodje (lijnenkaart uit film 2), s27 eindkaart (huidige build: niets afgesneden, vierde regel fade-in).

## 6. Vwo-blokken

s14, s22, q23, s24 hebben `level: "vwo"`, een paarse balk links en "VWO" in de kop (stills). Beide blokken openen met "Voor vwo …" en sluiten met "Terug naar de hoofdlijn: …". In havo-stand (`state.niveau === 'havo'`) worden ze overgeslagen; de overgangen zijn dan s13 → s15 ("Onthoud dat… meer water in de darm dan de darm terugneemt." → "Terug naar de man met de longontsteking.") en s21 → s25 ("…bij mensen alleen een verband." → "Terug naar de man."). Geen gat, geen verwijzing naar vwo-inhoud in de basis. Spore staat in de basis (s17), zoals geëist. In orde.

| Ernst | Locatie | Wat | Fix |
|---|---|---|---|
| mag | s14 (script r. 69) | "De meeste darmbacteriën zijn dat; daarom mislukte het open schaaltje" herhaalt s07 bijna letterlijk; het vwo-blok voegt hier alleen de term toe. Prima als verdieping, maar de zin kan korter. | `Obligaat anaeroob heet dat: zuurstof is giftig. Daarom mislukte het open schaaltje.` |

---

## Oordeel

**Publiceerbaar: nee, nog niet — maar dichtbij.** Inhoud, vragen, taal en vwo-afbakening zijn in orde; wat tegenhoudt zit in `scenes.js` en kost geen heropname.

Minimaal vóór publicatie:
1. **s04 r. 141**: `q.on('enzymen', 2, 0.8)` — anders ontbreekt "WATER TERUG" volledig en staat "geen eigen enzymen" 12 s te vroeg (blokkerend).
2. **s07 r. 169**: `q.on('bootst')` — nabootsen-tag 10 s te vroeg.
3. **s15 r. 260 + populaties**: ziekmakerlijn clippen op u = 0,42 tijdens "in kleine aantallen".
4. **populaties r. 87**: legenda naast de kuurband zetten (lijnen lopen nu door de tekst).
5. **s12**: beeld bij de paardzin.
6. **s04 r. 149, 152–153**: "WAT OVERBLIJFT" en de twee tags uit de buis halen.
7. **Eindkaart r. 118–119 + glossary** (geen heropname): "(minder waterresorptie)" toevoegen; "het werkt" alleen met een controlegroep; glossary-items *Clostridioides/Clostridium difficile* en *waterresorptie*.
8. **Uitspraak**: "koolstofdioxide" in s11 is zonder de vaste respelling ingesproken; op de wachtlijst zetten en bij de batchcontrole als eerste beluisteren.

Daarna opnieuw contactsheets maken van s04, s07, s12, s15, s17 en s18 en de bronmap (`bron/info.md`, `bron/script.md` met uitspraakwachtlijst en model eleven_v4) in dezelfde commit aanmaken.

---

## Verwerking (14 okt 2026, zonder heropname)

Verwerkt: alle blokkerende en 'moet'-punten — s04 `enzymen` n=2, "WATER TERUG" nu als pijlen uit het rechterbeen, "WAT OVERBLIJFT" en de tags uit de buis; s07 trigger `bootst`; `populaties` met `uZiek` (ziekmaker blijft laag tot "in kleine aantallen") en de legenda onder de as; s12 beeld bij het paard (kleine dikke darm, drie tags); s17 `Twee` n=2 en de twee tags naar boven; s18 `ruim`; s24 `kan` 1/2; eindkaart in vijf regels met "waterresorptie" en "'het werkt' alleen met een controlegroep" (speler: vijf regels passen); begrippen *waterresorptie* en *Clostridioides difficile* (met *Clostridium*), definitie vastgesteld (telling óf effect met controlegroep), darm-hersen-as (stoffen via bloed, prikkeling van zenuwen); q23 optie c "…, niet wat de oorzaak is"; lead zonder "beconcurreren"; docentdeel: Clostridium-naam, checkvraag 3 als toepassing, spore-nuance, q16 optie a, bewijsbord-nuance, paard 40–60 %, Examenatlas-zoekwoorden. Koolstofdioxide op de wachtlijst (`uitspraak.md`); de blinde controle hoorde het woord in s11 wél goed.

Niet verwerkt (vragen heropname of zijn keuzes voor Kamiel): s22 "via het bloed en de zenuwen", s12 "grotendeels" bij het paard (nuance staat in het docentdeel), s19 definitie probioticum, s17 "toxinen" in de narratie, s14 kortere zin, s17 tweede kuurband in de grafiek, s05 petrischaal iets lager, inkorten van s17/s18 (Kamiel: niet inkorten).
