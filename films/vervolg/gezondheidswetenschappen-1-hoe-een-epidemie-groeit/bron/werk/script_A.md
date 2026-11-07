# Hoe een epidemie groeit en stopt — script variant A (klassiek, volgt het plan; 26 okt 2026)

Wat word jij? · Gezondheidswetenschappen (1); wo Gezondheidswetenschappen, Biomedische Wetenschappen met master Epidemiology, geneeskunde. Voice Roos (eleven_v4). Look: Schema met cast (Yasmin, 16, snuffelstage bij de afdeling infectieziektebestrijding van een GGD; Epidemioloog Farid, ± 38, nieuw personage, badge en laptop); Micro niet nodig. Seriekleuren: teal = vatbaar, koraal = besmettelijk, groen = immuun/hersteld, oker = maatregel, goud = focus. Decor: één ElevenLabs-achtergrond, het GGD-kantoor met groot scherm (cold open, slot H1, H4, recap); alle grafieken en tellingen op navy. Rode draad: de startvraag uit vervolg.html, 'Waarom groeide corona in maart 2020 zo snel, en waarom stopt een epidemie uiteindelijk?'. Bouwt voort op T-cellen en virussen, Vaccins, allergie en bloedgroepen en Plek genoeg?. Getallen alleen uit `getallen.md`. Nog niet gekeurd door Kamiel.

**Leerdoelen** (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen wat het reproductiegetal R is, het verschil met R₀, en van welke drie dingen R afhangt (contacten, kans op besmetting per contact, hoe lang iemand besmettelijk is);
2. uitleggen waarom een uitbraak met R boven 1 exponentieel groeit en met R onder 1 uitdooft, en wat een verdubbeltijd is;
3. uitleggen wat 'de curve afvlakken' betekent (piek lager en later, zodat de zorg het aankan);
4. de drempel voor groepsimmuniteit uitrekenen met 1 − 1/R₀ en uitleggen waarom die voor mazelen veel hoger ligt;
5. uitleggen waarom een epidemie ook zonder maatregelen stopt (vatbaren raken op) en waarom ze doorschiet;
6. beschrijven hoe een epidemioloog met een eenvoudig model (vatbaar, besmettelijk, hersteld) het effect van een maatregel doorrekent, en wat een model wel en niet kan.

**Misconcepties**
1. Een epidemie groeit gelijkmatig (elke dag evenveel erbij) → vraag cold open.
2. R is een vaste eigenschap van een virus → vraag H1.
3. Een epidemie stopt pas als iedereen ziek is geweest → tweede vraag H3.
4. Groepsimmuniteit betekent dat iedereen immuun moet zijn → eerste vraag H3.
5. 'De curve afvlakken' betekent dat er minder mensen ziek worden → vraag H2.
6. Een model voorspelt precies wat er gaat gebeuren → vraag H4.

---

## Cold open [Schema: GGD-kantoor (ElevenLabs-decor); Yasmin met stagebadge naast Farid voor het grote scherm; op het scherm stapelen meldingskaartjes zich op, steeds sneller, meta 'SCHETS · GEEN ECHTE DATA'; puzzelkaart 'WAAROM ZO SNEL? · WAAROM STOPT HET?']
Yasmin loopt snuffelstage bij de GGD. Haar begeleider Farid is epidemioloog. Hij laat haar maart tweeduizendtwintig terugzien. Waarom groeide corona toen zo snel? En waarom stopt een epidemie uiteindelijk? Eerst dit: hoe groeide het aantal besmettingen? Wat denk je?
[VRAAG] (a) elke dag ongeveer evenveel nieuwe besmettingen erbij · (b) steeds sneller: elke paar dagen keer twee · (c) eerst snel, daarna vanzelf steeds trager

## Titel
Hoe een epidemie groeit en stopt
(tweede regel, klein: rekenen aan een uitbraak)

## Hoofdstuk 1 — Het reproductiegetal R: hoeveel mensen steekt één zieke aan? [Schema: navy; één koraal telpoppetje in het midden, pijlen naar telpoppetjes eromheen, label 'R = GEMIDDELD AANTAL DAT ÉÉN ZIEKE BESMET'; meta 'R₀ · NOG NIEMAND IMMUUN, GEEN MAATREGELEN'; drie staafjes naast elkaar: 'GRIEP · BEGIN SEIZOEN ± 1,3' · 'CORONA 2020 · ± 2 À 3' · 'MAZELEN · VAAK 12–18 GENOEMD' (staaf mazelen loopt uit het vak, meta 'SCHATTINGEN'); dan drie oker knoppen 'CONTACTEN' · 'KANS PER CONTACT' · 'DAGEN BESMETTELIJK' met de som 'R ≈ c × β × D', meta 'REKENVOORBEELD · VEREENVOUDIGD': 5 × 10 = 50 contacten, 50 × 1/20 = 2,5; menselijk moment: Yasmin loopt haar eigen dag langs (bus, klas, training), bij elke plek lichten telpoppetjes om haar heen op, de knop CONTACTEN draait mee; na de vraag een tijdlijn 'MAART 2020' met oker vlaggetjes '12 MAART · THUISBLIJVEN BIJ KLACHTEN, THUISWERKEN' en '16 MAART · SCHOLEN EN HORECA DICHT' (bron RIVM), de knop CONTACTEN zakt, R-meter zakt naar ± 1, meta 'SCHATTING RIVM'; slot in het GGD-kantoor (decor): Farid wijst op het scherm, een R-lijn met een grijs gestippeld laatste stuk 'NOG ONZEKER · ± 14 DAGEN']
Antwoord b. Er kwam niet elke dag evenveel bij: het werd elke paar dagen keer twee. Dat begint bij één getal, zegt Farid.

Epidemiologie is het vak dat onderzoekt hoe vaak een ziekte voorkomt in een bevolking, bij wie, en waardoor. Het belangrijkste getal is het reproductiegetal R: hoeveel mensen één zieke gemiddeld aansteekt. Aan het begin, als nog niemand beschermd is, heet het R-nul. Bij corona ongeveer twee à drie. Bij griep, aan het begin van het seizoen, zo'n één komma drie. Bij mazelen wordt vaak twaalf tot achttien genoemd.

R hangt af van drie dingen. Hoeveel contacten iemand heeft. De kans op besmetting per contact. En hoeveel dagen iemand besmettelijk is. Stel: je bent vijf dagen besmettelijk en ziet elke dag tien mensen. Met een kans van één op twintig per contact steek je er twee en een half aan.

Yasmin telt haar dag: bus, klas, training. Al gauw tientallen mensen.

Eind maart zat R volgens het RIVM rond de één. Hoe kan dat? Wat denk je?
[VRAAG] (a) het virus werd vanzelf minder besmettelijk · (b) bijna iedereen had het toen al gehad · (c) mensen hadden minder contact met elkaar

Antwoord c. Half maart kwamen maatregelen: thuiswerken, scholen en horeca dicht. Zo ging de knop contacten omlaag. R hangt dus niet alleen af van het virus, maar ook van hoe wij met elkaar omgaan.

Het RIVM rekent R terug uit hoeveel mensen ziek worden, legt Farid uit. Hoe hoog R vandaag is, weet je pas na twee weken.

## Hoofdstuk 2 — Exponentiële groei en de curve afvlakken [Schema: navy; besmettingsketen van telpoppetjes: 1 koraal → 2 à 3 → elk weer 2 à 3, generaties naast elkaar met een klokje 'GENERATIETIJD ± 4 À 5 DAGEN'; ernaast een grafiek die zichzelf tekent: oker stippellijn 'ELKE DAG EVENVEEL ERBIJ' tegen koraal curve 'KEER TWEE', getallen 10 · 20 · 40 · 80, meta 'REKENVOORBEELD'; label 'VERDUBBELTIJD · MAART 2020 ± 5 À 6 DAGEN (SCHATTING RIVM)'; terugverwijskaartje 'Plek genoeg?' met kleine J-curve; dan dezelfde keten met R onder 1: elke generatie kleiner, meta 'UITDOVEN'; dan staafdiagram 'IC-BEDDEN NL': lijn '± 1150 NORMAAL', lijn '± 2400 OPGESCHAALD · 5 APRIL 2020', staaf '± 1424 CORONAPATIËNTEN OP DE IC · 7 APRIL 2020', meta 'BRON: VWS, LCPS'; geen ic-beelden; na de vraag twee modelcurves over elkaar: hoge smalle koraal piek boven de lijn 'WAT DE ZORG AANKAN', lage brede piek eronder die later valt, meta 'MODEL'; pijl 'LAGER' en pijl 'LATER']
Terug naar begin maart. Wie besmet raakt, geeft het virus gemiddeld na een dag of vier, vijf door. Eén zieke steekt er twee à drie aan. Die steken er elk weer twee à drie aan. Er komt dus geen vast aantal bij: elke stap wordt het aantal keer twee à drie. Dat heet exponentiële groei.

Volgens het RIVM verdubbelde het aantal besmettingen toen ongeveer elke vijf à zes dagen. Die tijd heet de verdubbeltijd. Dezelfde J-curve zag je bij een populatie in Plek genoeg?.

Zakt R onder de één, dan werkt het andersom. Elke groep zieken steekt minder mensen aan dan er zelf ziek waren. De uitbraak dooft langzaam uit.

Waarom was die snelheid een probleem? Normaal heeft Nederland zo'n elfhonderdvijftig ic-bedden. Begin april tweeduizendtwintig lagen er op het drukste moment ruim veertienhonderd coronapatiënten op de ic. Ziekenhuizen bouwden in allerijl bij, tot zo'n vierentwintighonderd bedden.

Epidemiologen spreken dan over de curve afvlakken. Wat betekent dat? Wat denk je?
[VRAAG] (a) dat niet iedereen tegelijk ziek wordt · (b) dat er in totaal veel minder zieken komen · (c) dat de uitbraak daarna meteen ophoudt

Antwoord a. Afvlakken betekent: de piek komt lager en later. Er is niet minder zorg nodig, maar niet allemaal tegelijk. Zo kan de zorg de zieken aan. Dat er in totaal minder mensen ziek worden, kan erbij komen. Maar dat is niet de kern.

## Hoofdstuk 3 — Groepsimmuniteit: welk deel moet immuun zijn? [Schema: navy; raster van 30 telpoppetjes (teal = vatbaar); één koraal zieke met drie pijlen; vraagkaart; na het antwoord kleuren twee van elke drie poppetjes groen (immuun), van de drie pijlen raakt er gemiddeld nog één een teal poppetje; som groot in beeld: 'drempel = 1 − 1/R₀ = 1 − 1/3 = 2/3 ≈ 67 %'; tweede regel 'MAZELEN · R₀ 12–18 → ± 95 %', terugverwijskaartje 'Vaccins, allergie en bloedgroepen'; meta 'VUISTREGEL · GELIJKMATIGE MENGING'; groepje teal poppetjes dicht bij elkaar, meta 'GROEP MET WEINIG VACCINATIE'; dan modelcurve zonder maatregelen: balk 'AANDEEL VATBAAR' loopt leeg, R-meter zakt onder 1 bij de piek, label 'DREMPEL 67 %'; de curve loopt na de piek door, gearceerd stuk 'DOORSCHIETEN', eindteller 'IN HET MODEL ± 94 % BESMET', meta 'MODEL · R₀ = 3 · GEEN VOORSPELLING']
Wanneer kan een virus zich niet meer uitbreiden? Als één zieke gemiddeld minder dan één ander aansteekt. Dat lukt als genoeg mensen immuun zijn. Stel dat R-nul drie is. Welk deel van de bevolking moet dan immuun zijn? Wat denk je?
[VRAAG] (a) iedereen, anders blijft het virus rondgaan · (b) ongeveer twee op de drie mensen · (c) ongeveer één op de drie mensen

Antwoord b. Ongeveer twee op de drie. Een zieke zou er drie aansteken. Is twee derde immuun, dan steekt hij er gemiddeld nog maar één aan. De som: één min één gedeeld door R-nul. Eén min een derde is twee derde, zevenenzestig procent. Niet iedereen hoeft dus immuun te zijn. Wie het niet is, is dan ook beschermd. Dat heet groepsimmuniteit.

Bij mazelen kom je zo op ongeveer vijfennegentig procent. Het is wel een vuistregel: in het echt gaan mensen niet willekeurig met elkaar om. Mazelen kan terugkomen in groepen waar weinig mensen gevaccineerd zijn.

Stel nu: niemand neemt maatregelen en er is geen vaccin. Wanneer stopt de uitbraak? Wat denk je?
[VRAAG] (a) als het virus vanzelf zwakker wordt · (b) pas als iedereen het gehad heeft · (c) als er te weinig vatbare mensen over zijn

Antwoord c. De uitbraak stopt als er te weinig vatbare mensen over zijn. Elke zieke ontmoet steeds meer mensen die het al gehad hebben. Daardoor zakt R vanzelf onder de één. Maar dan zijn er nog veel mensen besmettelijk, en die steken nog anderen aan: de epidemie schiet door. In een eenvoudig model met R-nul drie raakt uiteindelijk ruim negen op de tien mensen besmet. Dat is een model, geen voorspelling voor corona.

## Hoofdstuk 4 — Maatregelen doorrekenen met een eenvoudig model [Schema: GGD-kantoor (decor); Farid achter zijn laptop, Yasmin ernaast, het model groot op het scherm: drie bakjes 'VATBAAR' (teal) → 'BESMETTELIJK' (koraal) → 'HERSTELD' (groen) met stromende stipjes; boven de eerste pijl de drie oker knoppen uit H1; meta 'SIR-MODEL · KERMACK EN MCKENDRICK, 1927'; menselijk moment: Yasmin mag zelf de knop CONTACTEN halveren; de koraal curve op het scherm zakt en schuift naar rechts (spoor van de oude curve blijft dun zichtbaar), labels 'LAGER' en 'LATER', meta 'MODEL'; na de vraag een kaartje 'AANNAME IC-LIGDUUR' dat van '± 10 DAGEN' naar '± 3 WEKEN' springt, meta 'MAART 2020 · RIVM'; slot: Farid opent een lijst nieuwe meldingen naast het model]
Zo'n model bouwt Farid op zijn laptop. Drie bakjes: vatbaar, besmettelijk en hersteld. Elke dag stroomt een deel van de vatbare mensen naar besmettelijk, en een deel van de besmettelijke mensen naar hersteld. Hoe snel de eerste stroom gaat, hangt af van de knoppen uit hoofdstuk één. Het idee is bijna honderd jaar oud.

Een maatregel verandert een knop. Yasmin halveert de knop contacten. De piek op het scherm zakt en schuift naar rechts: de afgevlakte curve. Zo rekenden modelleurs van het RIVM in tweeduizendtwintig maatregelen door.

Het model laat een lagere piek zien. Wat zegt dat over wat er echt gaat gebeuren? Wat denk je?
[VRAAG] (a) wat er gebeurt als de aannames kloppen · (b) precies hoeveel mensen er straks ziek worden · (c) weinig, want een model is maar een gok

Antwoord a. Een model voorspelt niet wat er gaat gebeuren. Het laat zien wat er zou kunnen gebeuren als de aannames kloppen. Zo kun je maatregelen naast elkaar leggen. Kloppen de aannames niet, dan klopt de uitkomst ook niet. In maart tweeduizendtwintig moesten de modelleurs hun model telkens bijstellen. Patiënten bleven bijvoorbeeld veel langer op de ic dan eerst gedacht.

Daarom kijkt Farid elke dag naar de nieuwe meldingen, zegt hij. Die vertellen of het model nog klopt.

## Recap [GGD-kantoor (decor, doorlopend uit H4); Yasmin en Farid voor het scherm; de puzzelkaart uit de cold open met twee antwoorden: 'R ≈ 2 À 3 → KEER TWEE, ELKE PAAR DAGEN' en 'R < 1 → MINDER CONTACT OF TE WEINIG VATBAREN'; opleidingen: 'WO · BIOMEDISCHE WETENSCHAPPEN + MASTER EPIDEMIOLOGY (ENGELSTALIG) · NIJMEGEN' en 'WO · GEZONDHEIDSWETENSCHAPPEN · ENSCHEDE · AMSTERDAM · MAASTRICHT', meta '2026'; werk: 'GGD · RIVM']
Corona groeide in maart tweeduizendtwintig zo snel omdat één zieke er twee à drie aanstak. Dan wordt het elke paar dagen keer twee. Een epidemie stopt als R onder de één zakt: door minder contacten, of omdat er te weinig vatbare mensen over zijn. Dat laatste gebeurt laat, en dan schiet de epidemie nog door.

In Nijmegen kun je na bijvoorbeeld Biomedische Wetenschappen de master epidemiologie doen. Gezondheidswetenschappen studeer je bijvoorbeeld in Enschede, Amsterdam of Maastricht. Daarna werk je bijvoorbeeld als epidemioloog bij een GGD of het RIVM.

## Eindkaart
Het reproductiegetal R is het gemiddelde aantal mensen dat één besmettelijk persoon besmet; R₀ geldt als nog niemand immuun is en niemand maatregelen neemt.
R hangt af van contacten, de kans op besmetting per contact en hoe lang iemand besmettelijk is: dus ook van gedrag.
R boven 1: exponentiële groei, elke verdubbeltijd twee keer zoveel. R onder 1: de uitbraak dooft uit.
De curve afvlakken: de piek lager en later, zodat de zorg het aankan.
Groepsimmuniteit: vanaf ongeveer 1 − 1/R₀ immuun dooft een uitbraak uit; ook wie niet immuun is, is dan beschermd.
Een model rekent door wat er kan gebeuren als de aannames kloppen; het voorspelt niet precies.

---

## Keuzes
- **Opbouw**: H1–H4 precies volgens het goedgekeurde plan; geen bijzondere vertelvorm. De drie knoppen uit H1 (contacten, kans, dagen) zijn de rode draad: ze komen terug bij de maatregelen (H1-vraag) en als knoppen van het model (H4).
- **Zes vragen, zes misconcepties (P2)**: antwoordletters b, c, a, b, c, a (elk twee keer, nooit drie op rij). De cold-openvraag toetst misconceptie 1 en wordt aan het begin van H1 beantwoord; de uitleg van exponentiële groei volgt in H2.
- **Farid (P2)**: eigen beurten: R terugrekenen en 'pas na een week of twee zeker' (slot H1), het model bouwen en de meldingen naast het model leggen (H4). 'Epidemioloog' valt in de cold open en de recap, 'epidemiologie' wordt gedefinieerd in H1 (reeksdefinitie). Alles in indirecte rede.
- **Menselijke momenten**: Yasmin loopt haar eigen dag langs (contacten, H1); Yasmin halveert zelf de knop in het model (H4).
- **Getallen** (allemaal uit getallen.md): 1, 2, 3, 4, 5, 6, 7, 8, 9 (≈, RIVM), 10, 11 (≈, RIVM), 12, 13, 14 (≈), 15, 16, 17, 18, 19 (≈, 'in het model'), 20 (namen en jaartal alleen in beeld), 21, 22, 24 (≈), 26, 27 (≈). Het rekenvoorbeeld 5 × 10 × 1/20 en 10-20-40-80 zijn eigen rekenvoorbeelden, in beeld als zodanig gelabeld. '± 94 %' is eigen SIR-berekening uit getallen.md (bewering 19), gesproken als 'ruim negen op de tien … in een eenvoudig model'.
- **Toon**: maatregelen alleen als feit met datum (12 en 16 maart) en als knop in het model; geen oordeel. Ic alleen als staafdiagram met capaciteit en bezetting, geen beelden en geen sterfte.
- **Lengte**: 967 gesproken woorden volgens scriptcheck (cold open 39 · H1 227 · H2 203 · H3 226 · H4 184 · recap 88), ± 7 min; binnen de 850–1000 van de brief. Melding 'totaal > 900' blijft daardoor staan.
- **Decor**: GGD-kantoor alleen onder cold open, slot H1, H4 en recap; H2 en H3 (grafieken, tellingen) op navy.

## Twijfels
- **Ic-getallen in H2** (≈ 45 woorden): zakelijk en waar, maar Kamiel moet beslissen of ze in de film mogen (brief: 'echte getallen maart 2020 ja'). Zonder deze alinea is het afvlakken abstracter; met de alinea valt H2 net op ± 205 woorden.
- **'Eind maart … rond de één'**: getallen.md (bewering 11) draagt 'na de maatregelen van half maart zakte R tot rond de 1' en B5 (25 maart) 'op en nabij de 1'; 'eind maart' leunt op B5. Alternatief: 'Na half maart zakte R volgens het RIVM tot rond de één.'
- **'Hoe kan R zo snel zakken?'**: de maatregelen worden pas in het antwoord genoemd, zodat de zin vóór de vraag (c) niet verraadt; toch kan een leerling die maart 2020 kent het raden. De misconceptie (a) blijft wel aantrekkelijk.
- **Farid kijkt elke dag naar de meldingen**: niet letterlijk in getallen.md; past bij surveillance (bewering 24, ≈). Voorzichtiger: 'Daarom legt Farid de nieuwe meldingen naast het model.'
- **'Yasmin halveert de knop'**: in het SIR-model met R₀ = 3 geeft halveren R ≈ 1,5: lagere en latere piek (klopt), maar de exacte curve wordt in de bouw uit het model gerekend, niet getekend.
- **Risicowoorden (uitspraak)**: R-nul, reproductiegetal, epidemioloog (e-pie-dee-mie-jo-LOOG), epidemiologie, exponentiële (ex-poo-nen-SJEE-le), verdubbeltijd, groepsimmuniteit, ic (ie-SEE), RIVM (er-ie-vee-EM), GGD (staat op de lijst), elfhonderdvijftig, veertienhonderd, vierentwintighonderd, tweeduizendtwintig, één komma drie, Biomedische Wetenschappen, Enschede (EN-sche-dee), Maastricht, Farid (fa-RIED), Yasmin. Kermack en McKendrick alleen in beeld.
