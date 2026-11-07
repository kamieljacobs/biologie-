# Twijfels — fo4 Stille getuigen (script_v2, 31 okt 2026)

Bijgewerkt uit `twijfels-voorlopig.md` na B15 (ronde 1 nipt: B 52 · C 50 · A 48; combinatie wint ronde 2 duidelijk: 52 · 47 · 46) en na feitenreview v1 (6 MOET, 9 KAN; `reviews/review_v1.md`). Alleen wat voor script_v2 nog geldt. Alleen voorstellen; niets gegenereerd (regels.json V1). Elk punt met Twijfel en Waarom.

## Keuzes in één regel (voorstel eerst)

| # | Twijfel | Voorstel | Andere keuzes |
|---|---|---|---|
| t1 | Vierde hoofdstuk 'Wat het bewijs wel en niet zegt' | H4 houden | Geen H4, twee zinnen per hoofdstuk · H4 korter, zonder FBI |
| t2 | Plan en titels in `vervolg.html` | Titels en velden aanpassen zoals hieronder | Plan laten zoals het is · Alleen H4 toevoegen |
| t3 | Volgorde van de hoofdstukken | Stuifmeel eerst | Haar eerst (zoals het plan) |
| t4 | Ik-vorm van de stille getuigen | H1 en H2 wel, H3 niet | Nergens ik-vorm · Overal ik-vorm |
| t5 | Rapportblad dat zichzelf invult | Houden | Weglaten, alleen de verklaringskaarten |
| t6 | Tweede zaak met een overledene (kiezelwieren) | Casus houden, streng in beeld | Kiezelwieren zonder casus · Kiezelwieren als spoor op kleding in de inbraakzaak |
| t7 | Wie doet de kiezelwierentest | Kim als forensisch patholoog (NFI) | Nieuw personage patholoog · Kaartje zonder gezicht |
| t8 | Nieuw personage: palynoloog | Nieuw personage via castvel | Lieke als 'forensisch bioloog' · Kaartje zonder gezicht |
| t9 | Kim in drie rollen | Zo laten | Stagiair doet H2 zonder Kim · Andere arts in H3 |
| t10 | FBI-cijfers | Beide houden (80/9 en '9 van de 10') | Alleen 80/9 · Geen FBI |
| t11 | Kiezelwierentest: hoe stellig | Lijn van de review 2025 houden | Laten nalezen door een forensisch patholoog vóór de opname |
| t12 | Opleidingen in de recap | Zo laten (Biology Engelstalig) | Reekszin zonder 'Engelstalig' · Route geneeskunde → forensisch patholoog toevoegen |
| t13 | Decors | Twee nieuwe: achtertuin + plas | Alleen achtertuin, plas als schema · Geen decors |
| t14 | Nieuwe tekeningen | Testvel eerst, dan bouwen | Zonder testvel |
| t15 | Cold open: glaasje 'uit een andere zaak' | Zo laten | Glaasje weglaten uit de cold open |
| t16 | Gekozen uitkomsten in de zaak | Zo laten | Uitkomst neutraler ('past even goed') |

---

## t1 Vierde hoofdstuk (afwijking van het plan)
- **Twijfel:** het plan heeft drie hoofdstukken; v2 heeft een vierde, 'Wat het bewijs wel en niet zegt' (115 woorden): tegen welk verhaal weeg je het stuifmeel, de rechter beslist, FBI 2015.
- **Waarom:** de brief stond het toe als voorstel. Zonder H4 hangt de film uit drie losse technieken; beide blinde beoordelaars noemden H4 het hoofdstuk dat de rode draad legt. Het herhaalt kort film 2 (twee hypothesen), bewust als toepassing.

## t2 Voorstel voor het plan in `vervolg.html`
- **Twijfel:** voorstel om het planobject aan te passen:
  - `opbouw`: ['Forensische botanie: stuifmeel en sporen als plaatsbepaling', 'Haar onder de microscoop: mens of dier, maar niet wie', 'De kiezelwierentest bij verdrinking: wat hij wel en niet zegt', 'Wat het bewijs wel en niet zegt'];
  - `nieuw`: aanvullen met '… en wat zulke sporen wel en niet bewijzen';
  - `bouwt`: film 2 (*Hoe zeker is een match?*) toevoegen naast *Preparaat en microscoop*;
  - `later: true` en `advies: "later"` weg zodra de film af is; startvraag blijft.
- **Waarom:** de film volgt nu een andere volgorde en een vierde hoofdstuk; de titels zeggen waar het om draait (uitsluiten, niet aanwijzen). Niet aangepast: ik mocht geen bestanden buiten de bronmap wijzigen.

## t3 Volgorde: stuifmeel eerst
- **Twijfel:** het plan begint met haar; v2 met stuifmeel.
- **Waarom:** de startvraag gaat over stuifmeel en wordt zo meteen beantwoord (beoordelaar ronde 1). Alternatief: haar eerst en de startvraag veranderen.

## t4 Ik-vorm van de stille getuigen
- **Twijfel:** in H1 en H2 opent de getuige met één of twee ik-zinnen in dezelfde stem (Roos), als 'verklaring' op een typemachinekaart ('Ik ben een stuifmeelkorrel …', 'Wij zijn drie haren …'); in H3 (zaak met een overledene) geen ik-zin, alleen de kaart.
- **Waarom:** geeft de drie onderwerpen één draad en maakt de titel waar, maar is een toonkeuze; in H3 klonk het luchtig naast een overlijden. In beeld moet de kaart duidelijk maken dat het een 'verklaring' is, anders is één stem die 'ik ben een stuifmeelkorrel' zegt verwarrend.

## t5 Rapportblad dat zichzelf invult
- **Twijfel:** rechts in beeld groeit een rapportblad met één regel per getuige ('SCHOEN: PAST IETS BETER BIJ DE ACHTERTUIN', 'HAAR: MENS · KAN VAN HEM ZIJN · NAAR DNA-LAB', 'PREPARAAT (ANDERE ZAAK): ÉÉN GEWICHT, OMSTREDEN'); de recap toont het blad.
- **Waarom:** overgenomen uit variant C (sterkste vondst volgens de beoordelaar); nieuw UI-element zonder extra woorden. Bij Vragen uit vult het blad zich zonder keuze-animatie.

## t6 Gevoelig beeld: tweede zaak met een overledene (H3)
- **Twijfel:** H3 speelt in een losse zaak: een man is uit een plas gehaald. Beeld: alleen de lege plas met riet, monsterpotjes ('LONG', 'BEENMERG'), een buisje met zuur, preparaten, een longblaasje en een bot in doorsnede als losse schema's ('niet op een mens'). Nooit de man, geen silhouet, geen laken, geen brancard. De stem zegt alleen 'uit een plas is een man gehaald'.
- **Waarom:** reeksbrief (geen lichaam, geen wond) en Kamiels brief (bij verdrinking streng). De vragen werken alleen met een uitslag, dus een casus is nodig. De feitenreviewer vond de beeldafspraken in orde.

## t7 Wie doet de kiezelwierentest: forensisch patholoog (review M1)
- **Twijfel:** v1 zei 'de forensisch arts'; in Nederland doet de forensisch arts de lijkschouw en adviseert de officier, en de sectie en het microscopisch weefselonderzoek doet de forensisch patholoog van het NFI (getallen 36). v2: 'de forensisch patholoog', beeld 'FORENSISCH PATHOLOOG · NFI'. Voorstel: Kim speelt die rol.
- **Waarom:** Kim was al patholoog in Geneeskunde 4 (*Wat de patholoog ziet*) en forensisch arts in fo3; forensisch patholoog ligt daartussen. LEVENSLOOP moet de rol dan bijschrijven. Alternatief: een nieuw personage (patholoog van het NFI) of een kaartje zonder gezicht.

## t8 Nieuw personage: de palynoloog
- **Twijfel:** het castboek heeft geen palynoloog. Voorstel: een vrouw van ± 50, labjas over een groene trui, leesbril op het hoofd, preparaatdoosje; alleen in haar eigen vak (zoals Lieke de entomoloog). Eerst als ElevenLabs-castvel, dan in `lib_cast.js`, ROLLEN.md, LEVENSLOOP.md. In beeld alleen het vak ('PALYNOLOOG'), geen naam.
- **Waarom:** stuifmeel is een ander vak (biologie of aardwetenschappen) dan dat van Kim. Alternatieven: Lieke uitbreiden tot 'forensisch bioloog' (minder zuiver) of alleen een kaartje.

## t9 Kim in drie rollen
- **Twijfel:** Kim is in één film onderzoeker (haar, met de eigen beurt 'Schrijf alleen op wat het spoor laat zien'), rapporterend deskundige (H4) en forensisch patholoog (H3, andere zaak).
- **Waarom:** past bij de reeks (fo2 DNA-deskundige, fo3 forensisch arts), maar kan verwarren. Alternatief: in H2 doet de stagiair het vergelijken, Kim alleen de zin.

## t10 FBI-cijfers in een Nederlandse oriëntatiefilm
- **Twijfel:** 'In een onderzoek van de FBI pasten tachtig haren onder de microscoop. Met DNA bleken er negen toch van iemand anders' (Houck & Budowle 2002, toegeschreven, ≈; kaart '1996–2000 · 80 MATCHES') en 'In 2015 gaf de FBI toe dat in minstens negen van de tien nagekeken getuigenissen over haren fouten zaten' (FBI zelf + Innocence Project, ✓).
- **Waarom:** het sterkste argument voor 'wat het bewijs niet zegt', maar Amerikaans en een echte instantie bij een fout (WERKWIJZE-LESSEN: echte namen alleen als ze iets toevoegen; hier wel).

## t11 Kiezelwierentest: hoe stellig de film is
- **Twijfel:** de film zegt: longen alleen zeggen niet genoeg, ook een leeg beenmerg zegt weinig ('ontbreken ze soms'), ook vinden is niet zeker (zwemmen), een betrouwbare grens is er niet, een overzicht uit 2025 noemt de bewijswaarde onzeker, deskundigen zijn het oneens (sommige landen bijna niet, Japan juist veel artsen), en 'dat past bij verdrinking'.
- **Waarom:** volgt de recentste systematische review (Tyr 2025) en Yukawa 2012, nagelopen door de feitenreviewer. Er zijn ook studies die de test betrouwbaar noemen (Bortolotti 2011: geen vals-positieven in 45 controles; site niet meer te openen). 'Ontbreken ze soms' rust op één humane review en één dierstudie (getallen 24). Een forensisch patholoog zou dit kunnen nalezen.

## t12 Opleidingen
- **Twijfel:** recap: hbo Forensisch Onderzoek (Enschede/Amsterdam, vier jaar, beperkt aantal plaatsen), Engelstalige bachelor Biology in Nijmegen → master Forensic Science (Amsterdam), werk bij NFI of politie. Niet opgenomen: de route geneeskunde → forensisch patholoog (review K8; niet zelf geopend), en dat palynologen vaak uit biologie of aardwetenschappen komen.
- **Waarom:** feitelijk juist (getallen 31–34); 'Engelstalig' is nieuw t.o.v. de reekszin van fo1–fo3. De pathologieroute past na t7, maar moet eerst met bronnen worden opgezocht.

## t13 Decors
- **Twijfel:** twee nieuwe ElevenLabs-decors: de achtertuin van het huis uit fo1 met kapot achterraam en bloeiende struik (cold open, H1), en een lege plas met riet (H3). Het bureau en het lab bestaan al (fo1–fo3).
- **Waarom:** BEELDAFSPRAKEN: decor alleen waar de scène echt speelt. ± 240 credits per decor, één variant. De plas moet leeg en rustig zijn (geen lichaam, geen afzetting met brancard).

## t14 Nieuwe tekeningen (testvel)
- **Twijfel:** nieuw voor de bibliotheek: haar in lengte- en dwarsdoorsnede (schubjes, schors, merg; mens smal/onderbroken, hond breed), haarwortel groeiend vs uitgevallen (knotsje), drie stuifmeelkorrels (gras: één porie; berk: drie poriën; een insectenstuifmeelkorrel, stekelig of plakkerig), hommel bij een struik, schoenzool met laagjes, staafdiagram met vier staven, kiezelwier (schaaltje met gaatjespatroon), longblaasje met scheurtje, bot in doorsnede met beenmerg (los schema), monsterpotjes, typemachinekaart 'VERKLARING', rapportblad.
- **Waarom:** C10: eerst op `bibliotheek/testvel.html`; stuifmeelvormen en kiezelwier moeten herkenbaar en correct zijn (naar B10 en B18, niet verzonnen).

## t15 Cold open: drie getuigen, één uit een andere zaak
- **Twijfel:** het preparaat hoort bij een andere zaak dan schoen en haar; de stem zegt 'en, uit een andere zaak, een glaasje uit het lab', het zakje heeft het label 'PREPARAAT · ANDERE ZAAK'. Cold open daardoor 47 woorden (grens 48).
- **Waarom:** anders lijkt het preparaat bij de inbraak te horen (beoordelaar ronde 2). Alternatief: het glaasje weglaten uit de cold open.

## t16 Gekozen uitkomsten en afleidingen in de zaak
- **Twijfel:** verzonnen casuskeuzes: vier dagen tot de inbeslagname; 'zo'n struik staat alleen in de achtertuin'; het mengsel 'lijkt meer op de achtertuin dan op zijn eigen straat' en 'past iets beter bij de achtertuin'; het tweede haar is eruit getrokken (getallen 9, ≈); in H3 vindt de patholoog wel kiezelwieren van dezelfde soorten als in de plas.
- **Waarom:** de casus moet een uitkomst hebben om te laten zien hoe je rapporteert; de uitkomsten zijn bewust zwak ('opvallend, maar zwak', 'iets beter'). Geen gemeten getallen.
