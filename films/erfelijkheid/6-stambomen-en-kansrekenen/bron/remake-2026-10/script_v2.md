# Stambomen en kansrekenen — script v2 (Erfelijkheid 6 van 6, lichte remake)

Lichte remake volgens prompt v13 B16, fase 1 (28 okt 2026). Geraamte: `bron/script.md` (oude film, 15 alinea's, één take, 4:05): het stappenplan (1 dominant/recessief, 2 autosoom/X, 3 genotypen, 4 kans), de ⅔-simulatie, product- en somregel, 'toeval heeft geen geheugen', de berekening ⅔ × ½ × ½ = ⅙ en de dragerschapstest blijven. Gebouwd in de FILMDATA-straat zoals Chromosomen 2.1 (één alinea = één take = één scènefunctie). Niveau: havo en vwo, één niveau zonder vwo-blokken (zoals film 1): stambomen en kansen staan in beide syllabi (havo en vwo M7.1, 'bepalen aan de hand van stambomen of kruisingsschema's wat de kans is op een bepaald genotype'). Stem: Roos (`7qdUFMklKPaaAVMsBTBt`), eleven_v4, één take per alinea, stem-invoer volgens `films/uitspraak.json` plus de filmregels uit Chromosomen (`uitspraak_film.json`: AA → 'grote A grote A' enz.); nieuwe risicowoorden in `uitspraak.md`.

Puzzel (opening): een vrouw van vierendertig wil een kind; haar broer heeft taaislijmziekte, zij en haar ouders niet. Draagt zij het allel bij zich, en hoe groot is de kans dat haar kind de ziekte krijgt? De recap beantwoordt beide (⅔ en ⅙, en wat een dragerschapstest verandert).

Aansluiting:
- **Chromosomen 2.1** (film 1): allel, A/a als notatie, dominant/recessief, homo-/heterozygoot, genotype/fenotype; slotzin van film 1 'het allel a zat al generaties verborgen, steeds naast een A' is precies het recessieve patroon hier. Vader teal / moeder oker alleen waar allelen van een ouder komen (simulatie); in de stambomen geldt de gewone stamboomnotatie.
- **Film 2 (monohybride kruisingen)**: het kruisingsschema Aa × Aa (¼ AA, ½ Aa, ¼ aa) wordt hier bekend verondersteld en als echte trekkingen getoond.
- **Film 5 (X-chromosomen)**: stap 2 laat alleen het X-recessieve criterium zien (in beeld 'meer in film 5'); notatie Xᴬ/Xᵃ zoals in de oefening `stamboom-hypothese`.
- **Oefeningen van deze film** (`oefenen.json`): zelfde symbolen, 'ziek/gezond', A en a, 'bij een dominante aandoening is A het allel voor ziek', 'soms is het antwoord: niet te bepalen'. De familie is die van `puzzel-sanne-tom` (personen 1–6), zonder de ouders van de partner (twijfel T2).

Namen: de vrouw is het castpersonage Sanne en de klinisch geneticus is Dr. Kim; de stem noemt geen namen (bovenbouwafspraak 27 okt 2026) en er staan geen naamlabels in beeld.

Tekens: `=` ongewijzigd · `~` aangepast (waarom, in de regel met `>` eronder) · `+` nieuw · `−` geschrapt. Regels met `>` en `[VRAAG]` worden niet gesproken; 'Antwoord x.' is alleen de sleutel voor `scriptcheck.py`.

---

## Cold open [Macro: spreekkamer]

~ (s01) Een vrouw van vierendertig wil graag een kind. Haar broer heeft taaislijmziekte. Haar ouders hebben het niet, en zij zelf ook niet. Draagt zij het allel toch bij zich? En hoe groot is de kans dat haar kind de ziekte krijgt?
> ~ oud p01: 'Veel mensen denken dat de kans een half is. In deze film ontdek je dat het twee derde is.' − : dat gaf het antwoord op de ⅔-vraag al in de eerste tien seconden (WERKWIJZE-LESSEN: de zin vóór een vraag mag het antwoord niet weggeven). Opa's en oma's − (in de nieuwe stamboom zijn de ouders generatie I). + spreekkamer met de klinisch geneticus: herkenbaar menselijk moment dat het concept draagt (BEELDAFSPRAKEN), licht en respectvol. Geen namen (B4). Zie twijfel T1.

## Titel
= Stambomen en kansrekenen

## Hoofdstuk 1 — De taal van een stamboom [Schema]
> Hoofdstukkaart: 'Hoe lees je een familie op papier?'

~ (s02) Eerst de taal van een stamboom. Een vierkant is een man, een rondje een vrouw. Een ingekleurd symbool: die persoon heeft de eigenschap. Een lijn tussen twee symbolen is een paar. Daaronder hangen hun kinderen aan één lijn, van oud naar jong. Elke generatie staat op één hoogte en krijgt een Romeins cijfer.
> ~ oud p02 (in beeld tekent de klinisch geneticus de stamboom op het bord: brug vanuit de spreekkamer); + 'aan één lijn' en 'elke generatie staat op één hoogte': Kamiels opmerking -P535j8XWq3hvI0iuuVC (stamboom niet goed uitgelijnd) als regel die de kijker ook zelf leert toepassen; de tekening volgt het recept in `tekeningen/nieuw_erf6.js` (twijfel T5).

~ (s03) Dit is de stamboom van de vrouw. Bovenaan, generatie één: haar ouders. Daaronder, generatie twee: haar twee broers, zijzelf en haar partner. Alleen haar jongste broer is ingekleurd. Onderaan, generatie drie: het kind dat ze willen.
> ~ oud p02b: opa's en oma's weg, twee broers (zoals oefening `puzzel-sanne-tom`, personen 3 en 4), partner en het gewenste kind erbij. 'Sanne' → 'de vrouw' (B4).

## Hoofdstuk 2 — Stap 1: dominant of recessief? [Schema]
> Hoofdstukkaart: 'Kan een eigenschap een generatie overslaan?'

~ (s04) Stap één: dominant of recessief. Zoek twee ouders zonder de eigenschap, met een kind dat hem wél heeft. Dan droegen die ouders het allel verborgen bij zich. De eigenschap is dus recessief. Zo is het bij taaislijmziekte. Zie je juist twee ouders mét de eigenschap en een kind zonder, dan is hij dominant.
> ~ oud p03; + 'Zo is het bij taaislijmziekte' (meteen toegepast op de familie van de vrouw). 'moeten … gedragen' → 'droegen' (spreektaal). Geen vraagzinnen buiten de vraagkaarten (B11, zoals DNA 1): 'Zie je …? Dan is hij dominant.' → één stellende zin.

~ (s05) Een dominante ziekte, zoals de ziekte van Huntington, ziet er in een stamboom anders uit. Het allel voor de ziekte noteer je dan met een hoofdletter: A. Eén A is genoeg om ziek te worden. Daarom heeft wie de ziekte heeft, bijna altijd een ouder met de ziekte.
> ~ oud p03b 'Iedereen die de aandoening heeft, heeft een ouder met de aandoening' → 'bijna altijd' (stelligheid: nieuwe mutatie, B4 MedlinePlus; docentdeel). + 'A = allel voor de ziekte' (zelfde afspraak als oefening `stamboom-hypothese`). De zin 'slaat geen generatie over' verhuist naar s07, ná de vraag. Zie twijfel T3 (Huntington begint meestal pas na je dertigste).

+ (q06) Deze man heeft de ziekte van Huntington niet, maar zijn vader wel. Kan zijn kind de ziekte krijgen? Wat denk je?
[VRAAG] (a) Ja: een dominante ziekte kan een generatie overslaan · (b) Nee: hij heeft geen A om door te geven · (c) Alleen als zijn kind een zoon is
Antwoord b.
> + nieuwe voorspelvraag op Kamiels opmerking -P535x4l4J6IH2vOvugo ('het kan toch overslaan als er toevallig geen gameet met het dominante allel wordt doorgegeven?'; antwoord: nee, en leerlingen denken dit ook). Optie a is precies die misvatting (B4: één optie = bekende misvatting). Opties ongeveer even lang; de zin vóór de vraag noemt 'A' maar niet 'doorgeven'. Hoofdstuk 2 had geen vraag (B4).

+ (s07) Een dominante eigenschap slaat geen generatie over. Wie de ziekte niet heeft, is aa. Hij heeft geen A, dus hij kan ook geen A doorgeven. Zijn vader was Aa, en gaf hem toevallig de a. Krijgt geen enkel kind van een zieke ouder de A, dan is het allel uit die tak van de familie verdwenen. Bij de kleinkinderen komt het niet meer terug.
> + Kamiels opmerking -P535x4l4J6IH2vOvugo, expliciet: wie de eigenschap niet heeft is aa en kan A niet doorgeven; geen enkel kind A → weg uit die tak, komt bij kleinkinderen niet terug. Begint met een eigen stelling, leunt niet op de vraag (B9: werkt ook met Vragen uit). In beeld de tak van de gezonde zoon met goud omlijnde aa's (keyframe `t3`). Nuance volledige penetrantie, laat begin en nieuwe mutatie: docentdeel (Kamiel: 'mag in het docentdeel').

+ (s08) Bij een recessieve eigenschap kan dat wél: twee dragers kunnen een kind krijgen dat hem wel heeft. Een eigenschap die een generatie overslaat, is dus recessief.
> + de oude misvatting uit het docentdeel ('een eigenschap die een generatie overslaat, is dominant') nu in de film zelf, met de goede regel als slot (B4 misvattingen). Sluit aan op de slotzin van Chromosomen 2.1 ('zat al generaties verborgen').

## Hoofdstuk 3 — Stap 2 en 3: waar ligt het gen, en wie heeft wat? [Schema]
> Hoofdstukkaart: 'Welk genotype heeft iedereen in de stamboom?'

~ (s09) Stap twee: autosoom of X-chromosoom. Bij een recessieve eigenschap op de X heeft een dochter met de eigenschap altijd een vader met de eigenschap. Hij geeft haar immers zijn enige X. Zie je een dochter met de eigenschap en een vader zonder, dan ligt het gen op een autosoom.
> ~ oud p04 ('aangedane' → 'met de eigenschap': zelfde woorden als s02 en de oefeningen 'ziek/gezond'; 'autosomaal' → 'ligt het gen op een autosoom': het begrip autosoom uit film 1).

+ (s10) In de familie van de vrouw is alleen een zoon ziek. Dan kun je het uit de stamboom niet zeker zeggen. Van taaislijmziekte is bekend: het gen ligt op chromosoom zeven, een autosoom.
> + de oude film paste stap 2 toe op een familie waarin het criterium niets bewijst (alleen een zieke zoon). Nu eerlijk: 'niet te bepalen' (zoals de oefening `stamboom-reeks`) + het gen ligt bekend op chromosoom 7 (B6, B7). Zie twijfel T4.

~ (s11) Stap drie: vul de genotypen in. Begin bij wie de eigenschap heeft. Bij een recessieve eigenschap is dat aa. Werk dan terug. Een kind met aa kreeg van elke ouder een a. Die ouders zijn gezond, dus allebei Aa. Iemand met Aa heeft de ziekte niet, maar draagt het allel wel bij zich: een drager.
> ~ oud p05 eerste helft; + het begrip drager (stond in de begrippenlijst, werd in de oude film niet uitgelegd voordat het in de vraag stond).

~ (s12) Van een gezond persoon weet je vaak alleen dat er minstens één A is. Dat noteer je als A_. Zo staan de vrouw en haar oudste broer nu in de stamboom: A_.
> ~ oud p05 tweede helft; + toegepast op de stamboom. Notatie A_: twijfel T5.

## Hoofdstuk 4 — Twee derde, niet een half [Schema, simulatie]
> Hoofdstukkaart: 'Hoe groot is de kans dat zij drager is?'

~ (q13) Haar ouders zijn allebei Aa. De vrouw zelf is gezond. Hoe groot is de kans dat zij drager is? Wat denk je?
[VRAAG] (a) een derde · (b) een half · (c) twee derde
Antwoord c.
> ~ oud p06 (open vraag met aftelklok) → meerkeuze met de misvatting ½ als optie (B4); zelfde vraag als stap 3 van de oefening `puzzel-sanne-tom`.

~ (s14) We simuleren driehonderd kinderen van twee dragers. Elk kind krijgt van elke ouder één allel, A of a. Ongeveer een kwart is AA, de helft Aa en een kwart aa. Maar we weten iets over de vrouw: ze is gezond. Dus halen we de zieke kinderen weg. Van de kinderen die overblijven, is ongeveer twee derde drager. De kans is dus twee derde, niet een half.
> ~ oud p07: 'Laten we het tellen.' − (leunde op de vraag, B9); + 'Elk kind krijgt van elke ouder één allel' (de trekking is zichtbaar: allel van vader teal, van moeder oker, zoals film 1). Echte trekkingen met vaste seed: 81 AA, 162 Aa, 57 aa; 162 van 243 gezonde kinderen = 0,667 (keyframe `k2`). 'geen een half' → 'niet een half'.

− (s15) geschrapt na de woordtelling (988 > ± 900): de kern ('we weten iets … dus halen we de zieke kinderen weg') staat al in s14; 'voorwaardelijke kans' gaat uit de begrippenlijst (zie samenvatting).

## Hoofdstuk 5 — Twee rekenregels [Schema]
> Hoofdstukkaart: 'Wanneer vermenigvuldig je, en wanneer tel je op?'

~ (s16) De productregel: moeten twee dingen allebei gebeuren, en hangen ze niet van elkaar af, dan vermenigvuldig je de kansen. De kans dat twee dragers eerst een ziek kind krijgen en daarna nog een, is een kwart keer een kwart: een zestiende.
> ~ oud p08 eerste helft; 'onafhankelijke dingen' → 'hangen ze niet van elkaar af' (spreektaal). 'één zestiende' → 'een zestiende'.

~ (s17) De somregel: mag het ene óf het andere gebeuren, en kunnen ze niet tegelijk, dan tel je de kansen op. Een kind van twee dragers is gezond als het AA is of Aa: een kwart plus een half is drie kwart.
> ~ oud p08 tweede helft, eigen alinea (één take per beeld).

+ (q18) Twee dragers hebben al een kind met taaislijmziekte. Hoe groot is de kans dat hun volgende kind het ook krijgt? Wat denk je?
[VRAAG] (a) kleiner dan een kwart · (b) een kwart · (c) groter dan een kwart
Antwoord b.
> + voorspelvraag op de misvatting die de oude film alleen benoemde ('na een ziek kind is de kans kleiner', docentdeel). Ook de omgekeerde misvatting (c) als optie.

~ (s19) Elk kind is een nieuwe trekking. Ook na een ziek kind is de kans voor het volgende kind een kwart. Toeval heeft geen geheugen.
> ~ oud p09 ('Let op:' − ; 'Heeft een paar al een ziek kind' → ingekort, de situatie staat nu in de vraag en wordt in de eerste zin opnieuw genoemd zodat het ook zonder vraag werkt).

## Hoofdstuk 6 — Terug naar de spreekkamer [Schema → Macro]
> Hoofdstukkaart: 'Hoe groot is de kans dat haar kind de ziekte krijgt?'

~ (s20) Terug naar de vrouw. Haar partner heeft zich laten testen. Hij is drager: Aa.
> ~ oud p10 'Tom is drager' → de partner is getest (waarom hij drager is, staat er nu bij). Zie twijfel T2.

~ (q21) Hoe groot is de kans dat hun kind taaislijmziekte krijgt? Wat denk je?
[VRAAG] (a) een zesde · (b) een achtste · (c) een kwart
Antwoord a.
> ~ oud p10 open vraag → meerkeuze: een kwart = 'de vrouw is zeker drager', een achtste = 'drager met kans een half' (de misvatting uit de opening), een zesde = goed.

~ (s22) Drie dingen moeten allemaal gebeuren. De vrouw moet drager zijn: twee derde. Zij moet dan een a doorgeven: een half. En haar partner ook: een half. Dus vermenigvuldig je: twee derde keer een half keer een half is een zesde.
> ~ oud p11 ('Daarvoor moet …' → 'Drie dingen moeten allemaal gebeuren': leunt niet op de vraag, B9). 'één zesde' → 'een zesde'.

~ (s23) Met zulke berekeningen werkt een klinisch geneticus. Met een dragerschapstest kan de vrouw laten onderzoeken of ze echt drager is. Is ze drager, dan is de kans voor haar kind een kwart. Is ze het niet, dan krijgt haar kind de ziekte niet.
> ~ oud p12 'erfelijkheidsadviseur' → 'klinisch geneticus' (de rol van Dr. Kim in het castboek; de NCFS verwijst ook naar de klinisch geneticus, B9). 'een kwart, of nul' → twee hele zinnen (zelfde inhoud, duidelijker). Nuance: een negatieve test zoekt naar de variant uit de familie; docentdeel (bewering 22).

## Samenvatting — Het stappenplan [Schema → Macro]

~ (s24) Samengevat. Stap één: dominant of recessief. Een dominante eigenschap slaat geen generatie over: wie hem niet heeft, kan hem niet doorgeven. Stap twee: autosoom of X-chromosoom. Stap drie: vul de genotypen in, terug vanaf wie de eigenschap heeft. Stap vier: reken. Vermenigvuldig wat allemaal moet gebeuren, tel op wat elkaar uitsluit, en haal weg wat je al weet. Zo is de vrouw met kans twee derde drager, en krijgt haar kind de ziekte met kans een zesde.
> ~ oud p13; + de regel uit s07 (Kamiels opmerking) als vast stuk van stap 1; + het antwoord op de puzzel. Recap apart nagelezen tegen de begrippenlijst (WERKWIJZE-LESSEN): drager, A_, productregel, somregel, autosoom gelijk aan de definities.

## Eindkaart
~ Recessief: twee ouders zonder de eigenschap, een kind mét. Dominant: slaat geen generatie over, want wie hem niet heeft, is aa.
~ Werk terug: een kind met aa kreeg van elke ouder een a. Een gezond kind van twee dragers is met kans ⅔ drager.
~ En → vermenigvuldigen (productregel). Óf → optellen (somregel). Elk kind is een nieuwe trekking.

---

## Stem-invoer (alleen waar die afwijkt van de ondertitel)

Centrale lijst `films/uitspraak.json` wordt automatisch toegepast (o.a. X-chromosoom → iks-chromosoom, X → iks, gameet/gameten → ga-MEET/ga-MEE-ten; allel en allelen gewoon, uitspraaktest 28 okt). Filmregels zoals Chromosomen (`uitspraak_film.json`): AA → 'grote A grote A', Aa → 'grote A kleine a', aa → 'kleine a kleine a', A → 'grote A', a → 'kleine a'. Extra regel voor deze film: `A_` → 'grote A streepje'. Breuken staan al als woorden in de tekst. Cue nooit op 'aa' (zit in 'maar', 'staat'; les uit Chromosomen).

| Alinea | Stem-invoer (afwijkend deel) |
|---|---|
| s05 | 'noteer je dan met een hoofdletter: grote A. Eén grote A is genoeg' · 'Huntington' gewoon (wachtlijst) |
| q06 | 'Nee: hij heeft geen grote A om door te geven' (optie op de kaart, niet gesproken; de vraagzin zelf heeft geen letter) |
| s07 | 'is kleine a kleine a. Hij heeft geen grote A, dus hij kan ook geen grote A doorgeven. Zijn vader was grote A kleine a, en gaf hem toevallig de kleine a. … de grote A …' |
| s09 | 'Stap twee: autosoom of iks-chromosoom', 'op de iks', 'zijn enige iks' |
| s10 | 'het iks-chromosoom' |
| s11 | 'is dat kleine a kleine a', 'Een kind met kleine a kleine a kreeg van elke ouder een kleine a', 'allebei grote A kleine a', 'Iemand met grote A kleine a' |
| s12 | 'minstens één grote A', 'Dat noteer je als grote A streepje', 'nu in de stamboom: grote A streepje' |
| q13 | 'allebei grote A kleine a' |
| s14 | 'één allel, grote A of kleine a. Ongeveer een kwart is grote A grote A, de helft grote A kleine a en een kwart kleine a kleine a' |
| s17 | 'als het grote A grote A is of grote A kleine a' |
| s20 | 'Hij is drager: grote A kleine a.' |
| s22 | 'een kleine a doorgeven' |
| s24 | 'iks-chromosoom' |

## Begrippen (wijzigingen t.o.v. de oude film)
- `=` stamboom, drager, A_, autosomaal (→ 'autosoom: een van de chromosomen 1–22, niet X of Y'; zelfde woord als film 1), productregel, somregel.
- `~` drager — 'Iemand met Aa bij een recessieve eigenschap: heeft de eigenschap zelf niet, maar kan het allel a doorgeven.'
- `+` generatie — 'Alle personen die in een stamboom op één hoogte staan; genummerd met Romeinse cijfers (I, II, III).'
- `−` voorwaardelijke kans — werd niet gesproken en staat niet in de syllabus; de uitleg zit nu in s15 zonder het woord. (Kamiel kan hem terugzetten; zie samenvatting.)

## Checkvragen (oud: geen; nieuw 5, één niveau)
1. In een stamboom krijgen twee ouders zonder de eigenschap een dochter met de eigenschap. Is de eigenschap dominant of recessief, en ligt het gen op een autosoom of op het X-chromosoom? Leg uit. — *Recessief: de ouders droegen het allel verborgen bij zich. Autosomaal: bij X-recessief zou de vader van een dochter met de eigenschap zelf de eigenschap hebben.*
2. Een vrouw heeft de ziekte van Huntington niet; haar moeder wel. Een leerling zegt: 'Haar kind kan het nog krijgen, want het kan een generatie overslaan.' Klopt dat? — *Nee (bij volledige penetrantie): de vrouw is aa en heeft geen A om door te geven.*
3. Twee dragers van een recessieve ziekte hebben een gezonde zoon. Wat is de kans dat hij drager is? — *⅔.*
4. Twee dragers krijgen drie kinderen. Wat is de kans dat ze alle drie gezond zijn? — *¾ × ¾ × ¾ = 27/64 ≈ 0,42 (productregel).*
5. De zoon uit vraag 3 krijgt een kind met een vrouw die drager is. Wat is de kans dat het kind de ziekte heeft? — *⅔ × ½ × ½ = ⅙.*

## Dekkingstabel
| Leerdoel (de leerling kan …) | Niveau | Hoofdstuk | Vraag |
|---|---|---|---|
| de symbolen en de opbouw van een stamboom lezen (man/vrouw, ingekleurd, paar, kinderen, generaties) | havo + vwo | 1 | checkvraag 1 (gebruik) |
| uit een stamboom afleiden of een eigenschap dominant of recessief is | havo + vwo | 2 | q06, checkvraag 1 |
| uitleggen waarom een dominante eigenschap geen generatie overslaat | havo + vwo | 2 | q06, checkvraag 2 |
| uit een stamboom afleiden of een gen op een autosoom of op het X-chromosoom ligt, of dat het niet te bepalen is | havo + vwo | 3 | checkvraag 1 |
| genotypen invullen (aa, Aa, A_) door terug te werken | havo + vwo | 3 | q13 (voorbereiding), checkvraag 3 |
| de kans berekenen dat een gezond kind van twee dragers drager is (⅔) | havo + vwo | 4 | q13, checkvraag 3 |
| de productregel en de somregel toepassen; elk kind is een nieuwe trekking | havo + vwo | 5, 6 | q18, q21, checkvraag 4 en 5 |

Gesproken: zie telling in `storyboard.json` (± 760 woorden, ± 5:15 bij 2,4 woord per seconde).
