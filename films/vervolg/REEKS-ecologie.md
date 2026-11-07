# Reeksbrief — Wat word jij? · Ecologie en natuurbeheer (25 okt 2026)

Gedeelde brief voor de drie films. Elke film krijgt daarnaast een eigen `bron/brief.md`. Leidend: `films/PROMPT_v10.md`, `films/BEELDAFSPRAKEN.md`, `films/WERKWIJZE-LESSEN.md`, `films/vervolg/BOUWEN.md`, `films/BRONNEN.md`. Stand: `OVERDRACHT-ecologie.md`.

Planning goedgekeurd door Kamiel (25 okt 2026): drie films in plaats van vier, cast Daan + nieuwe ecoloog. De rest van deze brief is opgesteld door Claude; wat Kamiel moet beslissen komt op het twijfelblad.

| Veld | |
|---|---|
| SERIES NAME | Wat word jij? · Ecologie en natuurbeheer |
| FILMS | 1 Tellen in het veld: hoe ecologen populaties meten (`ecologie-1-tellen-in-het-veld`, werkmap `ec1`) · 2 Stikstof: hoe een voedingsstof een probleem werd (`ecologie-2-stikstof`, `ec2`; gedeelde film met Milieukunde, id `stikstof`) · 3 Een plan voor de natuur: van doel tot herstel (`ecologie-3-een-plan-voor-de-natuur`, `ec3`, id `natuurplan`) |
| AUDIENCE + NIVEAU | havo/vwo bovenbouw, oriëntatie op studie (mbo · hbo · wo); één niveau, geen vwo-blokken. Eén rekenstukje per film mag, met de som op het scherm. |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak per film (± 850–1000 woorden) |
| VOICE | Roos, eleven_v4, één take per alinea |
| LOOK | Schema met cast, zoals de andere vervolgfilms. Micro alleen waar een molecuul of cel het mechanisme draagt (eDNA in film 1, ammoniak/ammonium in film 2). |
| PLAYER | FILMDATA-straat (`films/vervolg/BOUWEN.md`), speler met snelheid en Vragen aan/uit |

## Volgorde = het echte werk
Meten (film 1) → een oorzaak begrijpen en doorrekenen (film 2) → ingrijpen en nagaan of het werkt (film 3).

## Cast en rode draad
- **Daan** (15) loopt snuffelstage bij een natuurbeheerder (fictieve terreinbeherende organisatie, géén echte naam als werkgever). In alle drie de films de stagiair; outfit veldkleding als die er komt (`veld`), anders gewoon.
- **Ecoloog** (nieuw personage, naam en uiterlijk eerst als voorstel op het twijfelblad; werknaam **Ecoloog Bas**, ± 45, veldjas, laarzen, verrekijker): Daans begeleider, alleen in dit vak. Pas na Kamiels akkoord in `lib_cast.js`, `ROLLEN.md` en `LEVENSLOOP.md`.
- **Eén gebied door de hele reeks** (fictief, Veluwe-achtig): heide met een ven, een bos, een snelweg met ecoduct aan de rand, en een landbouwenclave met een maisakker die natuur wordt. Film 1 telt er (wolf, en vrijwilligers die vlinders tellen), film 2 meet de stikstof op de heide, film 3 maakt het plan voor de akker.
- Geen echte boer, minister of politicus in beeld. Een veehouder of ambtenaar zonder naam mag als figurant in castboekstijl.

## Beeldafspraken voor deze reeks
- Wolf: zoals in *Plek genoeg?*; geen prooi die gedood wordt, geen bloed. Een kadaver hooguit als nette tekening op afstand.
- Kaarten van het gebied in Schema-look (geen echte topografie nodig), met de vaste onderdelen: heide, ven, bos, snelweg + ecoduct, akker, stal.
- Grafieken met eerlijke assen; een trend krijgt zijn onzekerheid (marge) in beeld.

## Seriekleuren (Part C)
- **groen**: plant, heide, gras, gewas.
- **oker**: bodem, mest, en ammoniak/ammonium (stikstof uit mest) in film 2; ook voedsel zoals overal.
- **teal**: water (ven, regen, grondwater).
- **koraal**: 'let op' (te veel, achteruitgang, overschrijding).
- **paars**: alleen DNA (eDNA en DNA uit poep in film 1).
- **goud**: focus.

## Gedeelde begrippen (één definitie in de hele reeks)
- **populatie**: alle individuen van één soort in één gebied (zelfde woorden als *Plek genoeg?*).
- **monitoring**: steeds op dezelfde manier herhaald meten, zodat je een verandering kunt zien.
- **trend**: de richting waarin een aantal over meerdere jaren gaat, met een marge van onzekerheid.
- **depositie**: stikstof die uit de lucht op de bodem en planten neerkomt.
- **kritische depositiewaarde (KDW)**: de hoeveelheid stikstofdepositie waarboven een natuurtype op den duur achteruitgaat.
- **natuurdoel / doelsoort**: het type natuur of de soort waarvoor een gebied beheerd wordt.

## Grenzen tussen de films (en met bestaande films)
- *Plek genoeg?* (Ecologie 1): de wolf komt terug, populatiegroei en draagkracht. Film 1 legt niet opnieuw groei uit maar hoe je telt.
- *Alles gaat rond*: stikstofkringloop (fixatie, ammonificatie, nitrificatie, denitrificatie), successie (Kootwijkerzand). Film 2 en 3 hooguit één zin terugverwijzing.
- *Eén aarde* H2: stikstofdepositie verdringt zonnedauw (70 %-raster). Film 2 werkt het mechanisme en het meten uit, herhaalt het beeld niet.
- *Ingrijpen of laten gaan?* H3: heide groeit dicht, grazers, maaien en afvoeren, ecoduct. Film 3 noemt dat hooguit kort.
- *Binnen de grenzen* H2–H3: drie niveaus van biodiversiteit, Living Planet, rode lijst. Film 3 niet opnieuw.
- *Evolutie 5 Toeval en uitwisseling*: drift, flessenhals, genenstroom. Film 3 verwijst terug (één zin).
- *Toeval of echt?* (Biomedisch 4, gedeeld): significantie. Film 1 legt geen statistiek uit, alleen 'een trend heeft een marge'.
- Film 2 gaat over een politiek gevoelig dossier: beschrijvend en evenwichtig, geen standpunt over beleid of partijen; de ecoloog levert data en een oordeel over de natuur, de keuze is aan het bestuur.

## Feiten die de reviewer altijd tegen een bron legt
Alle getallen (aantallen wolven in Nederland en de bron daarvan, KDW's per natuurtype, depositie in Nederland, aandeel landbouw/verkeer/industrie/buitenland, kosten), alle 'altijd/nooit/alleen'-zinnen, wat wettelijk geregeld is (Natura 2000, vergunningen), namen en eisen van opleidingen (dichtbij Nijmegen eerst), en wat organisaties als BIJ12, RIVM, CBS/NEM, Wageningen Environmental Research werkelijk doen.

## Recap en opleidingen
Elke recap noemt kort waar je dit werk kunt leren en wat je dan doet (mbo natuur en groen, hbo bos- en natuurbeheer, wo biologie of bos- en natuurbeheer; dicht bij huis eerst: Radboud, HAN, Wageningen, Velp). Feiten opzoeken, jaartal erbij. Eén vaste reekszin, in alle drie gelijk, door de feitenreview vastgesteld.
