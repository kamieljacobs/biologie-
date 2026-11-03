# Reeksbrief — Wat word jij? · Mariene biologie (3 nov 2026)

Gedeelde brief voor de drie films. Elke film krijgt daarnaast een eigen `bron/brief.md`. Leidend: `films/PROMPT_v13.md`, `films/logboek/regels.json` (P1, P2, V1), `films/BEELDAFSPRAKEN.md`, `films/WERKWIJZE-LESSEN.md`, `films/vervolg/BOUWEN.md`, `films/BRONNEN.md`. Stand: `OVERDRACHT-marien.md`.

Planning goedgekeurd door Kamiel (3 nov 2026): drie films, Sam als stagiair, de Mariene bioloog als begeleider (castvel goedgekeurd, geen naam). De rest van deze brief is opgesteld door Claude; wat Kamiel moet beslissen komt op het twijfelblad.

| Veld | |
|---|---|
| SERIES NAME | Wat word jij? · Mariene biologie |
| FILMS | 1 Hoeveel vis mag eruit? (`mariene-biologie-1-hoeveel-vis-mag-eruit`, werkmap `hw/mb1`) · 2 Zuurder water (`mariene-biologie-2-zuurder-water`, `hw/mb2`) · 3 Een zee vol voedsel: de Waddenzee (`mariene-biologie-3-een-zee-vol-voedsel`, `hw/mb3`) |
| AUDIENCE + NIVEAU | havo/vwo bovenbouw, oriëntatie op studie (hbo · wo); één niveau, geen vwo-blokken. 'Wat word jij?' is extra stof voor gemotiveerde leerlingen en mag boven het boekniveau gaan. Eén rekenstukje per film mag, met de som op het scherm. |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak per film (± 850–950 woorden; `scriptcheck.py` meldt boven 900) |
| VOICE | Roos, eleven_v4, één take per alinea. **Geen personagenamen in de stem** (prompt v13 B4, Kamiel 31 okt 2026): 'de stagiair', 'de mariene bioloog'. Ook de mariene bioloog heeft geen naam, ook niet in beeld (Kamiel 3 nov 2026). Sam mag in beeld zonder naamlabel (geen naamlabels, B4). |
| LOOK | Schema met cast, zoals de andere vervolgfilms. Micro alleen waar een molecuul het mechanisme draagt (CO₂, H⁺ en carbonaat in film 2). Decors als ElevenLabs-still (edit met een bestaand decor als stijlreferentie): onderzoeksschip (dek met vangst), lab met aquaria, wad bij laag water. |
| PLAYER | FILMDATA-straat (`films/vervolg/BOUWEN.md`), speler met snelheid en Vragen aan/uit |

## Volgorde = het echte werk
Meten en tellen aan een populatie die je oogst (film 1) → een verandering in het water zelf en een proef die oorzaak en gevolg scheidt (film 2) → het hele ecosysteem en een afweging tussen gebruikers (film 3).

## Cast en rode draad
- **Sam** (16, 'sportief, doet proefjes') loopt snuffelstage bij een (fictief) instituut voor zeeonderzoek aan de kust; géén echte naam als werkgever (geen WMR, NIOZ of Rijkswaterstaat als werkgever in beeld; als bron van getallen mogen ze wel op een metakaartje). In het lab outfit `practicum`. Aan boord en op het wad: twijfelpunt (voorstel op het twijfelblad, nog niet in `lib_cast.js`).
- **De mariene bioloog** (`marien`, ± 40, garderobe `boord` aan boord én op het wad, `lab` in het lab): Sams begeleider, in alle drie de films. Ze heeft een eigen beurt met eigen tekst in elke film (P2) en het beroep wordt uitgesproken ('mariene bioloog').
- Een **visser** of **mosselkweker** mag als figurant: Veehouder Gerrit is boer, dus niet hem; gebruik Joost (figurant) of Erik (figurant), naamloos in de stem. Geen echte visser, bestuurder of politicus.
- **Eén kust door de hele reeks**: het instituut ligt aan de Noordzee, het schip vaart vanuit een haven (fictief), het wad ligt aan de andere kant van een eiland. Film 1 aan boord en in het lab (otolieten), film 2 in het lab met aquaria, film 3 op het wad bij laag water.

## Beeldafspraken voor deze reeks
- Vis: schol (platvis) als hoofdsoort van film 1 (staat ook op het castvel). Echte vorm en verhoudingen; een schol heeft beide ogen aan de bovenkant. Een gehoorsteentje (otoliet) is klein: een paar millimeter; groot alleen in een zoomcirkel of onder de binoculair, met jaarringen.
- Geen gedode dieren in close-up, geen bloed. Vangst op de sorteerband als nette tekening. Een vis meten op de meetplank mag.
- Oesterlarven zijn ± 0,1–0,3 mm: alleen in een zoomcirkel of onder de microscoop. Koraal alleen als ver voorbeeld, het zwaartepunt is de oester (Nederland: Japanse oester en platte oester).
- Wad: kokkel, nonnetje, wadpier (met hoopjes), mossel(bank), kanoet; vogels in castboekstijl/bibliotheekstijl, echte verhoudingen (kanoet ± 25 cm).
- Grafieken met eerlijke assen; een schatting krijgt haar onzekerheid (marge) in beeld.
- Gezichten blijven heel: organen of schelpdetails in een zoomcirkel naast het lichaam (BEELDAFSPRAKEN).

## Seriekleuren (Part C)
- **teal**: zeewater.
- **groen**: algen, plankton, wier (producenten).
- **oker**: kalk, schelp, voedsel; ook vis als biomassa en vangst.
- **paars**: CO₂ en de zuurdeeltjes (H⁺) in film 2; elders niet.
- **koraal**: 'let op' (overbevissing, te zuur, tekort aan voedsel).
- **goud**: focus, de duurzame vangst, het advies.

## Gedeelde begrippen (één definitie in de hele reeks)
- **populatie**: alle individuen van één soort in één gebied (zelfde woorden als *Plek genoeg?*).
- **draagkracht**: het grootste aantal individuen dat een gebied op den duur kan onderhouden.
- **duurzame vangst**: zoveel vangen dat de populatie het elk jaar weer aangroeit, zodat je dat ook volgend jaar kunt vangen.
- **quotum**: de hoeveelheid vis die vissers van een soort per jaar mogen vangen.
- **pH**: maat voor hoe zuur water is; lager = zuurder.
- **oceaanverzuring**: de daling van de pH van zeewater doordat de zee CO₂ uit de lucht opneemt.
- **voedselweb**: alle voedselrelaties in een ecosysteem samen.
- **filteraar**: een dier dat voedsel (algen) uit het water zeeft, zoals een mossel of kokkel.

## Grenzen tussen de films (en met bestaande films)
- *Plek genoeg?* (Ecologie): groeisnelheid, draagkracht, de S-curve. Film 1 bouwt erop voort met één zin terugverwijzing en zet het nieuwe centraal: de groei (aanwas) is het grootst rond de helft van de draagkracht, en daar haal je de meeste vis duurzaam uit.
- *Alles gaat rond* (Ecologie): koolstofkringloop, energiestroom en biomassa per trofisch niveau. Film 2 en 3 hooguit één zin terugverwijzing; film 2 zet de zee als koolstofput erin, film 3 de piramide van het wad.
- *Onderzoek doen* (Cellen): variabelen, controlegroep, herhalen. Film 2 gebruikt het zonder het opnieuw uit te leggen (één zin).
- *Binnen de grenzen* (Ecologie): planetaire grenzen. Oceaanverzuring hooguit één zin.
- Film 3 gaat over een gevoelig dossier (mosselkweek, schelpdiervisserij, vogels): beschrijvend en evenwichtig, geen standpunt over beleid of sectoren; de bioloog levert data en een oordeel over de natuur, de keuze is aan het bestuur. Film 1 idem voor visserij en quota.
- Geen verwijzing naar tools of andere onderdelen van de site, en zeker niet in de stem (geen 'Probeer het zelf').

## Feiten die de reviewer altijd tegen een bron legt
Alle getallen (aandeel CO₂ dat de oceaan opneemt, pH-daling sinds 1750, pH-waarden in proeven met oesterlarven, aanwas en MSY-redenering, schol in de Noordzee en de bron daarvan, voedsel van kanoet en scholekster, oppervlakte Waddenzee, mosselkweek en -zaadvisserij), alle 'altijd/nooit/alleen'-zinnen, wat wettelijk of Europees geregeld is (TAC/quota, ICES-advies, Natura 2000 in de Waddenzee, de kokkelvisserij), en namen en eisen van opleidingen (dicht bij huis eerst: Radboud, HAN, Wageningen; daarnaast waar mariene biologie echt zit: Groningen, Wageningen, hbo Van Hall Larenstein Leeuwarden/Velp, HZ Vlissingen). Bronniveaus en de regel ≥ 2 bronnen, ≥ 1 niveau A: `films/BRONNEN.md`.

## Recap en opleidingen
Elke recap noemt kort waar je dit werk kunt leren en wat je dan doet. Eén vaste reekszin, in alle drie gelijk, door de feitenreview vastgesteld (voorstel: wo biologie met mariene vakken in Groningen of Wageningen; hbo bijvoorbeeld kust- en zeemanagement of aquatische ecotechnologie; feiten opzoeken, jaartal erbij).
