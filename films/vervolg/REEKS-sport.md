# Reeksbrief — Wat word jij? · Sport en topsport (eerste reeks: zwemmen) · 19 nov 2026

Gedeelde brief voor de zeven films. Elke film krijgt daarnaast een eigen `bron/brief.md`. Leidend: `films/PROMPT_v13.md`, `films/logboek/regels.json`, `films/BEELDAFSPRAKEN.md`, `films/WERKWIJZE-LESSEN.md`, `films/vervolg/BOUWEN.md`, `films/BRONNEN.md`. Stand: `OVERDRACHT-sport.md`.

Aanleiding (Kamiel 18 nov 2026): een leerling die op hoog niveau zwemt. Kamiel wil films over techniek, topsportmindset, waarom een zwemmer elk trainingsonderdeel doet, wat het oplevert en wat er gebeurt als je het weglaat, trainen op één doel tegenover de wisselwerking tussen doelen, en het effect van andere sporten ernaast; plus het werk van Ethan Kross (*Chatter*, *Shift*). Kamiel 19 nov 2026: 'begin maar met maken, zo zelfstandig mogelijk' = **reeksmodus**: Claude maakt de keuzes zelf, logt ze, en Kamiel reviewt achteraf.

| Veld | |
|---|---|
| SERIES NAME | Wat word jij? · Sport en topsport |
| GEBIED | `sport` in `vervolg.html` (richting Voeding en gezondheid: eten, bewegen, preventie), niveau mbo · hbo · wo |
| FILMS | 1 Glijden, trekken, drijven (`sport-1-glijden-trekken-drijven`, `hw/sp1`) · 2 Waarom al die rustige meters? (`sport-2-waarom-al-die-rustige-meters`, `hw/sp2`) · 3 Sterk op het droge (`sport-3-sterk-op-het-droge`, `hw/sp3`) · 4 Eén doel of alles tegelijk? (`sport-4-een-doel-of-alles-tegelijk`, `hw/sp4`) · 5 Ook nog hardlopen? (`sport-5-ook-nog-hardlopen`, `hw/sp5`) · 6 De stem in je hoofd (`sport-6-de-stem-in-je-hoofd`, `hw/sp6`) · 7 Na de race (`sport-7-na-de-race`, `hw/sp7`) |
| AUDIENCE + NIVEAU | havo/vwo bovenbouw, oriëntatie op studie; één niveau. Mag boven het boekniveau gaan. Ook herkenbaar voor een leerling die zelf (top)sport doet: echte trainingstermen, geen kinderachtige voorbeelden. |
| LENGTH | richtwaarde ± 6–7 min spraak (± 850–950 woorden; `scriptcheck.py` meldt boven 900) |
| VOICE | Roos, eleven_v4, één take per alinea. Geen personagenamen in de stem: 'de zwemmer', 'de trainer', 'de sportpsycholoog'. |
| LOOK | Schema met cast. Zwembad als decor (bovenaanzicht van banen, zijaanzicht onder water). Micro alleen waar het mechanisme het vraagt (spiervezel, mitochondrium in film 2). |
| PLAYER | FILMDATA-straat (`films/vervolg/BOUWEN.md`), speler met snelheid en Vragen aan/uit |

## Kritische check (Claude, 19 nov 2026, reeksmodus)

Uit de zes blokken van het gesprek (lichaam in het water, techniek, trainingsonderdelen, samenhang, andere sporten, mindset) blijven zeven films over:

- **Geschrapt: Energiesystemen in het zwembad.** Alles op adem doet fosfaataccu, gisting en aeroob al volledig. Film 2 verwijst ernaar (één zin) en koppelt de systemen aan trainingszones.
- **Samengevoegd: natuurkunde + techniek** (film 1). Techniek per slag als losse film voegt weinig biologie toe; de principes (weerstand kleiner, water vastpakken) gelden voor alle vier de slagen.
- **Geschrapt als eigen film: Topsport en school.** Te weinig biologie; het deel over volhouden en steun staat in film 7, de praktijk hoort bij stap 2.
- **Chatter en Shift** (Kamiel 19 nov 2026): film 6 = Chatter (innerlijke stem, wedstrijdspanning, afstand nemen), film 7 = Shift (emoties bijsturen, tegenvallers) plus doelen en motivatie.
- Grens met **Trainen** (Fysiotherapie 3): supercompensatie, duur- en krachttraining in het algemeen, specificiteit en omkeerbaarheid staan daar. Films 2 en 4 herhalen dat hooguit in één zin.
- Grens met **Emotieregulatie** (Gedrag 5): herwaarderen tegenover onderdrukken, eerst de adem, co-regulatie. Films 6 en 7 herhalen dat hooguit in één zin en zetten Kross' eigen onderzoek centraal (afstand nemen met taal, chatter, de gereedschapskist van Shift).

## Cast en rode draad (keuzes Claude, ter keuring)

- **De zwemmer: Sam** (16, 'sportief, doet proefjes'; 1,79 m). Zwemt bij een zwemvereniging op hoog niveau (regionale/nationale wedstrijden, geen olympisch verhaal). Nieuwe outfit `zwem` (zwembroek, badmuts, zwembril op het voorhoofd of op de ogen) en nieuwe houdingen in het water (`personages/lib_cast.js`). Geen naam in de stem. Sam is in andere vakken stagiair; hier is hij zichzelf, de sporter.
- **De zwemtrainer** (nieuw beroepspersonage, `zwemtrainer`, ± 45, geen naam): trainingspak, fluitje, stopwatch, klembord. In film 1, 2, 4 en 5. Castvel via ElevenLabs (edit met een bestaand castvel als stijlreferentie), daarna in code.
- **De sportpsycholoog** (nieuw beroepspersonage, `sportpsycholoog`, ± 35, geen naam): film 6 en 7.
- **Femke** (fysiotherapeut, bestaand): film 3 (zwemmersschouder, droogtraining).
- Figuranten: andere zwemmers in de baan als castfiguranten (Bilal, Daan) of gewone silhouetten in een groep (telpoppetjes alleen in groepen).
- **Eén zwembad door de hele reeks**: 50-meterbad met startblokken, banen, keerpuntmuur, tribune; krachtzaal ernaast (film 3); kamer van de sportpsycholoog (film 6, 7).

## Beeldafspraken voor deze reeks
- Een zwemmer in het water is horizontaal: zijaanzicht onder de waterlijn (stroomlijn, catch, onderwaterfase) en bovenaanzicht van de baan (afstanden, tempo). Echte verhoudingen en echte bewegingen: hoge elleboog bij de catch, de hand ongeveer onder de schouder, benen recht achter het lichaam in de stroomlijn.
- Water = teal; weerstand = koraal (pijlen tegen de bewegingsrichting in); voortstuwing = goud.
- Grafieken met eerlijke assen; modellen (supercompensatie, interferentie) als model benoemd.
- Mindsetfilms: geen 'hersenen in een bubbel' boven het hoofd; het brein in een zoomcirkel náást het hoofd (BEELDAFSPRAKEN), gedachten als tekstwolkjes.

## Seriekleuren (Part C)
- **teal**: water, rust, herstel. · **goud**: voortstuwing, focus, het doel. · **koraal**: weerstand, 'let op', blessure. · **groen**: aanpassing/groei (aerobe basis). · **paars**: hoofd en gedachten (film 6, 7). · **oker**: kracht, droogtraining, energie.

## Gedeelde begrippen (één definitie in de hele reeks)
- **weerstand**: de kracht van het water tegen je bewegingsrichting in.
- **voortstuwing**: de kracht die je vooruit brengt doordat je water naar achteren duwt.
- **trainingszone**: een intensiteit van trainen (van rustig tot maximaal) met een eigen doel.
- **aerobe basis**: hoe goed je lichaam langdurig energie met zuurstof kan leveren.
- **interferentie-effect**: als je kracht en duur tegelijk traint, valt de winst op één doel (meestal de kracht, vooral explosieve kracht) kleiner uit; de conditie groeit gewoon door (feitenreview sp4, 19 nov 2026: niet 'elkaars').
- **periodiseren**: een seizoen opdelen in blokken met elk een eigen doel.
- **taperen**: de laatste weken voor een belangrijke wedstrijd minder trainen, zodat je fris en op je best bent.
- **overtraining**: langdurig minder presteren doordat belasting en herstel niet in balans zijn.
- **chatter** (Kross): de innerlijke stem die gaat malen, piekeren en zichzelf verwijten.
- **afstand nemen** (self-distancing): naar je eigen situatie kijken alsof je er buiten staat.

## Feiten die de reviewer altijd tegen een bron legt
- Dichtheid water ≈ 1000 kg/m³, lucht ≈ 1,2 kg/m³ (± 800×); weerstand ∝ v².
- Onderwaterfase na start en keerpunt: maximaal 15 m (World Aquatics-reglement), niet bij schoolslag (daar één armslag en één dolfijnslag).
- Trainingszones en lactaatwaarden: altijd als 'ongeveer' en met de kanttekening dat clubs verschillende indelingen gebruiken.
- Interferentie-effect: het bewijs is genuanceerd (vooral bij explosieve kracht en bij lopen); geen absolute uitspraken.
- Kross: distanced self-talk (Kross e.a. 2014, *J. Pers. Soc. Psychol.*), EEG-studie Moser e.a. 2017, Chatter (2021), Shift (2025). Elk onderzoek alleen noemen als de bron zelf geopend is (BRONNEN.md).
- Vroege specialisatie: consensusverklaringen (bv. AMSSM 2019, IOC 2015); vergelijkbare formulering met nuance.

## Grenzen
- Geen medisch advies aan de kijker (blessure → naar een fysiotherapeut of sportarts).
- Geen diëten, gewichtsdoelen of lichaamsvet-percentages voor jonge sporters (veiligheid); voeding in film 4 alleen als 'genoeg eten en drinken om te herstellen'.
- Geen echte topzwemmers of clubs bij naam als personage; een record of onderzoek mag als bron op een metakaartje.
- Geen verwijzing naar tools of andere onderdelen van de site in de stem.
