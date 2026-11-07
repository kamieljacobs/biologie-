# Monohybride kruisingen — script v2 (Erfelijkheid 2 van 6, lichte remake)

Lichte remake volgens prompt v13 B16, fase 1 (28 okt 2026). Geraamte: `bron/script.md` (oude film, één take, oud model, gereconstrueerd 12 okt 2026): Mendels proef, meiose → gameten, kruisingsschema, productregel, de vraag 'vier nakomelingen', het stappenplan en de terugkruising blijven. Gebouwd in de FILMDATA-straat zoals Chromosomen 2.1 (één alinea = één take = één scènefunctie). Niveau: **havo en vwo, één niveau** (geen vwo-blokken): monohybride kruisingen, kansen op genotype en fenotype en dominant/recessief staan in beide syllabi (M7.1 specificatie 4; vwo voegt alleen dihybride kruisingen en gekoppelde genen toe, die horen in film 4). Stem: Roos (`7qdUFMklKPaaAVMsBTBt`), eleven_v4, één take per alinea; stem-invoer = `films/uitspraak.json` + de film-eigen regels van Chromosomen (`uitspraak_film.json`: A/a → 'grote A'/'kleine a') + `uitspraak.md` in deze map.

Puzzel: twee ouders met Aa hebben een kind met albinisme (gezin uit film 1). Hoe groot is die kans? Bij mensen kun je dat niet uitproberen; Mendel deed het met erwten. Tweede puzzel (hoofdstuk 6): hoe zie je of een paarse plant een a draagt?

Aansluiting en gelijke notatie in de reeks:
- **Chromosomen 2.1** eindigt met 'Hoe groot de kans op aa is, reken je uit in de volgende film, met het kruisingsschema' en een leeg schema met de vader **boven (teal)** en de moeder **links (oker)**. Deze film begint daar en houdt die indeling aan (de oude film 2 had het omgekeerd). Bij een plant die zichzelf bestuift: boven = stuifmeel (teal), links = eicellen (oker).
- Notatie als film 1: A dominant, a recessief, genotypen AA, Aa, aa; 'homozygoot', 'heterozygoot', 'fenotype = wat je kunt waarnemen', 'allel = versie van een gen'. Verhoudingen: 'drie op één' in de lopende tekst, 'drie staat tot één' als definitie (zoals de oude film).
- Gezin De Wit (genotypen liggen vast: ouders Aa, Sara AA, Levi aa, Jens Aa) in de opening en de recap, zonder namen (B4).

Tekens: `=` ongewijzigd · `~` aangepast (waarom) · `+` nieuw · `−` geschrapt. Woordtelling per alinea in `storyboard.json`. Opmerkingen van Kamiel staan met hun id bij de wijziging.

---

## Cold open [Macro]

+ (s01) Twee ouders zonder albinisme, en toch een kind met albinisme. Je weet al hoe dat kan: allebei dragen ze een verborgen allel a.
<!-- + nieuw: opening met het gezin uit Chromosomen 2.1 (sluit aan op de laatste zin van film 1). Zie twijfel T1. Het oude PUZZEL 1 'twee paarse ouders, witte nakomelingen' komt nu in hoofdstuk 2 als de echte proef. -->

~ (s02) Maar hoe groot is de kans daarop? Bij mensen kun je dat niet uitproberen. Gregor Mendel kon het wel, met erwten.
<!-- ~ oud p01 'Mendel kweekte erwtenplanten … Hoe kan dat? … Hoe kom je erachter welke allelen erin zitten, zonder DNA-test?' → één puzzel in de cold open (kans), de tweede pas in hoofdstuk 6 waar hij wordt opgelost; zo blijft de cold open onder 20 s. 'Gregor Mendel' als historische persoon mag bij naam (B4 geldt voor castpersonages). -->

## Titel
= Monohybride kruisingen

## Hoofdstuk 1 — Van P naar F1 [Macro → Schema]

+ (s03) Een erwtenbloem bestuift zichzelf. Meeldraden en stamper zitten samen ingesloten in de kiel. Het stuifmeel komt zo op de eigen stamper, nog voordat de bloem opengaat.
<!-- + nieuw (opmerking -P52tYimczZuV-BIkQJ6): wie niet weet dat een erwt zichzelf bestuift, begrijpt later niet hoe Mendel 'de F1 met elkaar kruiste'. Mendel 1866 § 2 ('dicht opeengepakt in de kiel'; stempel bestoven vóór de bloem opengaat), OpenStax. Nieuwe tekening: erwtenplant + vlinderbloem (twijfel T2). -->

~ (s04) Mendel begon met raszuivere planten: generatie na generatie alleen paars, of alleen wit. Zulke planten zijn homozygoot. De paarse is AA, de witte aa.
<!-- ~ oud p02 + p02b samengevoegd; 'die al generaties lang alleen paarse, of alleen witte nakomelingen gaven' → 'generatie na generatie' (dezelfde betekenis, korter). Het woord 'oudergeneratie' verhuist naar s06, waar P/F1 samen worden uitgelegd. -->

+ (s05) Hij kruiste ze met de hand. Uit een jonge paarse bloem haalde hij de meeldraden weg. Daarna bracht hij stuifmeel van een witte bloem op de stamper.
<!-- + nieuw: laat zien dat de P-kruising een échte kruising is (en de F1 → F2-stap juist niet met de hand hoefde). Mendel 1866 § 2: knop geopend, kiel weg, meeldraden met een pincet eruit, stempel bestoven met vreemd stuifmeel. Geen kwastje (staat niet bij Mendel). Mendel in beeld als historische figuur (twijfel T3). -->

~ (s06) Die ouders heten de P-generatie, van het Latijnse woord voor ouders. Hun nakomelingen heten de F1, van het woord voor kinderen. Alle F1-planten bloeiden paars.
<!-- ~ oud p02 'Dat is de oudergeneratie: P … Die eerste generatie heet F1' → met de herkomst van de letters (opmerking -P52tYimczZuV-BIkQJ6: 'eerst uitleggen wat F1 en F2 zijn'); OpenStax: filial = son or daughter. De generatieladder (k1) begint hier en groeit mee tot s09. -->

~ (s07) Elke F1-plant kreeg een A van de ene ouder en een a van de andere. Ze zijn dus allemaal Aa, en paars: A is dominant. Je let hier op één eigenschap, de bloemkleur. Dat heet een monohybride kruising.
<!-- ~ oud p02b, + definitie van de titel: de oude film noemde 'monohybride' nergens (syllabus M7.1 deelconcept 'monohybride kruising'). -->

## Hoofdstuk 2 — De F2 [Schema → Macro → Schema]

+ (s08) Dan de stap die het verschil maakt: Mendel kruiste de F1-planten met elkaar. Bij erwten is dat makkelijk. Hij liet ze zichzelf bestuiven: stuifmeel en eicel komen allebei van een plant met Aa.
<!-- + nieuw, de kern van opmerking -P52tYimczZuV-BIkQJ6: dát de F1 onderling gekruist wordt, en hoe (Mendel 1866 § 9 'zelfbevruchting van de hybriden'; OpenStax 'He allowed the F1 plants to self-fertilize'). In beeld: zelfbestuivingslus op de rij F1 van de generatieladder. -->

+ (s09) Hun nakomelingen zijn de tweede generatie: de F2. Dus: P zijn de ouders, F1 hun kinderen, en F2 de kinderen van de F1.
<!-- + nieuw: F2 wordt benoemd vóórdat de film zegt wat er in de F2 gebeurt (oud p04 begon met 'In de F2 kwam wit terug' zonder uitleg). De ladder staat compleet, de rij F2 nog met een vraagteken. -->

+ (s10) Bij dieren gaat dat niet: een muis bevrucht zichzelf niet. Dan kruis je twee F1-muizen met elkaar, broer met zus. Een fokker vermijdt zulke inteelt. Maar in een proef weet je zo zeker: beide ouders zijn Aa.
<!-- + nieuw, het tweede deel van opmerking -P52tYimczZuV-BIkQJ6 ('zeker bij dieren gaan ze daar niet van uit (inteelt)'). Het voorbeeld is zwarte × witte (albino) labmuizen: hetzelfde gen als in film 1 (tyrosinase, MGI Tyr c, recessief). Inteelt benoemd, zodat het gevoel 'broer en zus mag toch niet?' een plek krijgt (Silver, Mouse Genetics § 3.2; CGN/WUR). Twijfel T4. -->

~ (q11) Wat denk je? Hoe zien de nakomelingen van twee F1-planten eruit, de F2?
[VRAAG] (a) Allemaal paars, net als de F1 · (b) Allemaal lichtpaars: een mengkleur · (c) Vooral paars, maar ook een deel wit
Antwoord c.
<!-- ~ oud p03 'Wat verwacht je als je twee planten uit de F1 met elkaar kruist?' (open, aftelklok) → 'Wat denk je?' met drie opties (B4, zoals Chromosomen 2.1). (a) en (c) zijn bekende misvattingen (dominant 'wint' voorgoed; mengerfelijkheid). Opties even lang; alleen de vraag staat op de kaart, s08–s09 zeggen het antwoord niet. -->

~ (s12) In de F2 kwam wit terug. Mendel telde zevenhonderdvijf paarse en tweehonderdvierentwintig witte planten. Dat is ongeveer drie op één. Het allel a was in de F1 dus niet verdwenen. Het zat verborgen.
<!-- ~ oud p04; 'Het allel voor wit' → 'Het allel a' (letter is nu bekend). Eerste zin is geen kort antwoord en leunt niet op de vraag (B9: klopt ook met Vragen uit). 705 : 224 = proef 3 van Mendel (bloem- en zaadhuidkleur), Mendel 1866 § 5. -->

## Hoofdstuk 3 — Waarom drie op één? [Micro → Schema]

~ (s13) Die drie op één kun je verklaren. Neem een F1-plant met Aa. Op het ene chromosoom van het paar ligt A, op het andere a.
<!-- ~ oud p05 'Hoe werkt dat? Kijk in een meeldraad van een plant uit de F1' → geen vraagzin zonder kaart (B11, zoals chr-5 in film 1). De meeldraad als decor vervalt: de echte meiose in de helmknop maakt eerst sporen en dan pas stuifmeelkorrels met een zaadcel; dat is hier niet nodig (zie s14). -->

~ (s14) Bij het maken van geslachtscellen, de meiose, gaan de twee chromosomen van een paar uit elkaar. Elke geslachtscel krijgt er één, dus één allel. Zo'n geslachtscel heet een gameet.
<!-- ~ oud p05 'Bij de meiose gaan de chromosomen van het paar eerst uit elkaar. Daarna ook de chromatiden. Zo ontstaan vier gameten' → zonder de chromatiden en zonder 'vier gameten' (bij planten ontstaan na de meiose eerst sporen; 'vier gameten' klopte voor een erwt niet). In beeld wel vier cellen, 'vereenvoudigd'. 'Gameet' wordt hier gedefinieerd (begrippenlijst). Uitspraak: ga-MEET (opmerking -P52twO_f_UxdxqYw4zB, uitspraaktest 28 okt). -->

~ (s15) De helft van de gameten krijgt A, de andere helft a. De kans op elk is dus een half. Dat geldt voor het stuifmeel, en ook voor de eicellen.
<!-- ~ oud p05 'Twee met A, twee met a. De kans op elk is dus een half. In de eicellen van de andere plant gebeurt precies hetzelfde.' → bij zelfbestuiving is het dezelfde plant. -->

~ (s16) Nu het kruisingsschema. Boven zet je de gameten van de ene ouder, links die van de andere. Elk vakje is één mogelijke bevruchting.
<!-- ~ oud p06 'Links staan de gameten van de ene ouder, boven …' → boven/links omgedraaid, gelijk aan de vooruitblik van Chromosomen 2.1 (vader boven teal, moeder links oker). -->

~ (s17) A met A geeft AA. A met a geeft Aa, en a met A ook. a met a geeft aa.
<!-- ~ oud 'En zo verder.' → de vier vakjes uitgesproken; het tweede Aa-vakje is precies wat de 2 in 1 : 2 : 1 verklaart. Stem-invoer via de film-eigen regels: 'grote A met grote A geeft grote A grote A' (Kamiel akkoord 25 okt, Chromosomen). -->

= (s18) Drie van de vier vakjes hebben minstens één A: paars. Eén vakje is aa: wit. De genotypen verhouden zich als één staat tot twee staat tot één. De fenotypen als drie staat tot één.

## Hoofdstuk 4 — Kansen, geen aantallen [Schema]

~ (s19) Elk vakje heeft een kans van een kwart. Voor aa moet het stuifmeel een a hebben, en de eicel ook. Een half keer een half is een kwart. Dat heet de productregel: kansen die allebei moeten gebeuren, vermenigvuldig je.
<!-- ~ oud p07 'Waarom is de kans op wit een kwart?' → geen vraagzin zonder kaart; 'de ene gameet … en de andere óók' → 'het stuifmeel … en de eicel ook' (opmerking -P52twO_f_UxdxqYw4zB: 'óók' gewoon 'ook' schrijven; 'gameet' klonk Engels — hier is het woord niet meer nodig). -->

+ (s20) Stel: je zaait vier zaden uit één F1-plant.
<!-- + de situatie van de vraag staat in een eigen zin vóór de vraag, zodat de uitleg in s22 ook klopt als de vraagalinea wegvalt (Vragen uit, B9). -->

~ (q21) Wat denk je? Hoeveel van die vier planten bloeien wit?
[VRAAG] (a) Precies één: een kwart van vier · (b) Nul, één, twee of meer: dat verschilt · (c) Geen: wit is recessief, dus het blijft weg
Antwoord b.
<!-- ~ oud p08 'Zijn dat er precies drie paars en één wit?' (ja/nee, raadbaar: 'niet per se' is een typisch goed antwoord) → drie opties; (a) en (c) zijn misvattingen. -->

~ (s22) Elke bevruchting is toeval. Bij vier zaden kan het best twee paars en twee wit zijn. Pas bij heel veel nakomelingen kom je dicht bij drie op één. Het schema geeft dus kansen, geen aantallen. De vier vakjes zijn geen vier kinderen.
<!-- ~ oud p09 zonder 'Niet per se.' (kort antwoord dat bij Vragen uit blijft hangen). Simulatie van 400 bevruchtingen blijft (vaste startwaarde). -->

## Hoofdstuk 5 — Stappenplan [Schema]

= (s23) Zo los je elke kruisingsvraag op, in vier stappen. Eén: schrijf de genotypen van de ouders op. Twee: bepaal welke gameten elke ouder kan maken. Drie: zet ze in een kruisingsschema. Vier: lees de verhoudingen af, eerst van de genotypen, dan van de fenotypen.
<!-- = oud p09b zonder de laatste zin ('Dat stappenplan gebruik je in de rest van deze reeks steeds opnieuw.'): klopt niet voor elke film (stambomen in film 6) en kost 4 s. Cue voor kaart 4 op het tweede 'Vier' (oude cuefout, info.md). -->

## Hoofdstuk 6 — De terugkruising [Schema]

~ (s24) Dan de tweede vraag. Deze paarse plant kan AA zijn, of Aa. Van buiten zie je dat niet. De truc: kruis hem met een witte plant, aa. Zo'n kruising met een homozygoot recessieve plant heet een terugkruising.
<!-- ~ oud p10; 'Dat heet een terugkruising' → met de definitie erin (zoals de begrippenlijst). Zie twijfel T6 (terugkruising of testkruising). -->

~ (s25) De witte plant geeft altijd een a door. Dus bepaalt het allel uit de paarse plant de kleur van elk kind. Stel: de helft van de nakomelingen bloeit paars, de helft wit.
<!-- ~ oud p10 + p11: de uitkomst ('de helft paars, de helft wit') staat nu vóór de vraagalinea, zodat s27 ook klopt met Vragen uit. -->

~ (q26) Wat denk je? Welk genotype had de paarse plant?
[VRAAG] (a) Aa · (b) AA · (c) Dat kun je hieruit niet afleiden
Antwoord a.

~ (s27) Was de paarse plant AA, dan kreeg elk kind een A: allemaal paars. Hij was dus Aa: de helft van de kinderen kreeg een a. Eén op één. En zie je ook maar één witte nakomeling, dan weet je het zeker: de paarse ouder had een a.
<!-- ~ oud p12 'Aa.' (kort antwoord) weg; redenering eerst, dan de conclusie (B9). -->

## Recap [Macro]

+ (s28) Terug naar het gezin. Twee ouders met Aa: precies zoals de F1 van Mendel. Bij elk kind is de kans op aa een kwart, steeds opnieuw.
<!-- + nieuw: beantwoordt de puzzel uit de cold open. -->

+ (s29) Dit gezin heeft drie kinderen: AA, Aa en aa. Dat is geen drie op één. Bij zo weinig kinderen wijkt het vaak af.
<!-- + nieuw: 'kansen, geen aantallen' op het gezin dat de leerling kent (genotypen vast, LEVENSLOOP). Twijfel T5. -->

~ (s30) Samengevat. Elke ouder geeft per gen één allel door, elk met een kans van een half. Het kruisingsschema zet alle combinaties op een rij. Twee keer Aa geeft drie op één. Aa met aa geeft één op één. In de volgende film zie je dat het niet altijd drie op één is.
<!-- ~ oud p13; 'één op één bij een terugkruising' → 'Aa met aa geeft één op één' (oude aandachtspunt: 1 : 1 klopt alleen als de paarse plant Aa is); 'helemaal niet altijd' → 'niet altijd'. -->

## Eindkaart
P = ouders, F1 = hun kinderen, F2 = de kinderen van de F1 (bij erwten: zelfbestuiving; bij dieren: broer × zus).
Aa × Aa geeft 1 AA : 2 Aa : 1 aa, dus 3 paars : 1 wit; elke gameet krijgt één allel, kans ½.
Terugkruising met aa: alles dominant → AA; ook maar één recessieve nakomeling → Aa.

## Keuzes
- Drie vragen, zoals de oude film en Chromosomen 2.1; hoofdstuk 1, 3 en 5 hebben geen eigen voorspelvraag (bewust: B4 vraagt er één per hoofdstuk, maar Kamiel koos in film 1 voor geen extra vragen). Een kandidaat staat klaar: 'Welke kleur krijgen de F1-planten?' (allemaal paars · half paars, half wit · allemaal lichtpaars).
- Verwijderd: 'Dat stappenplan gebruik je in de rest van deze reeks steeds opnieuw.' en de puzzelkaart 'PUZZEL 2' in de cold open.
