# Knoeien met de synaps — bronmap

| Veld | Waarde |
|---|---|
| Bestand | **preview** films/zenuwstelsel/4-knoeien-met-de-spleet-nieuw.html (lichte remake 2.0); de oude 1.1 blijft online als films/zenuwstelsel/4-knoeien-met-de-spleet.html tot Kamiel de nieuwe goedkeurt (dan wisselt de hoofdsessie ze om: oude naar bron/oud/, datum, B15-uitzondering 'lichte-remake') |
| Reeks / nummer | Zenuwstelsel, film 4 |
| Doelgroep / niveau | 5 vwo, één niveau (`alleen: 'vwo'`, geen havo/vwo-schakelaar) |
| Versie / datum | **2.0 · 29 oktober 2026** — lichte remake in de donkere Part C-stijl; 1.1 · 28 okt 2026; 1.0 · 4 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026). Bewust niet: geen B15-varianten (lichte remake); de receptoren zijn een eenvoudig ionkanaal, ook de adenosinereceptor (eigenlijk een G-eiwitgekoppelde receptor; vermeld bij Vereenvoudigingen); personages in de oude caststijl (nieuwe caststijl met contourlijnen nog niet goedgekeurd) |
| Herkomst | lichte remake, keuze Kamiel 29 okt 2026 (keuzeblad 'Regeling: jouw keuzes'; brief films/UITVOEREN-REGELING.md): synaps = synapsEcht uit de beeldbank, beloningssysteem als hersendoorsnede, Linda met wijn blijft, a4 'binnen een paar seconden' |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2). 12 alinea's zijn de oude takes van 4 okt 2026 (geknipt/herschikt), s15 (was a4) is nieuw ingesproken op 29 okt 2026 (883 credits). Invoer: bron/stem/invoer.md |
| Duur | gesproken 5:09 (309 s); speler met vragen aan 6:41, met vragen uit 4:40 |
| Beeldstijl | Part C donker: Micro (#121A26, korrel alleen in cellen) voor synaps en receptoren, Schema (#1A2740) voor de thuisscènes; Fraunces / Source Sans 3 / IBM Plex Mono. Kleuren volgens de tabel Zenuwstelsel/Hormonen (29 okt 2026): zenuwsignaal teal #5BA4C9, neurotransmitter (ook adenosine, GABA, glutamaat, serotonine, dopamine) licht teal #9CCBE3; cafeïne koffiebruin #B98A5E (zelfde basisvorm als adenosine), lichaamsvreemde stof (nicotine, alcohol) lichtgrijs #D8DDE6, levodopa = grondstof oker #C9A35C, SSRI-blokkade koraal (zoals in synapsEcht) |
| Audio-opslag | 13 losse mp3's in films/zenuwstelsel/4-knoeien-met-de-spleet/audio/ (s01 … s19), FILMDATA-straat |
| Bouwstraat | FILMDATA zoals Zenuwstelsel 9: bron/remake-2026-10/ (src/, bouw/, film/, prep_audio.py, bouw.sh, afmaken.sh), speler = films/gedrag/5-emotieregulatie/bron/src/player.js |

## Opbouw (2.0)

| Begin (vragen aan) | Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|---|
| 0:00 | Cold open | s01 | Linda (castboek) thuis: 's ochtends staand met koffie, 's avonds op de bank met een glas wijn op de armleuning; zoomcirkel van beide hoofden naar dezelfde synaps |
| 0:17 | Titel | s02 | synapsZ4 rechts, in een rustige cyclus |
| 0:22 | 1 Vier plekken | s03, q04, s05 | stof in het bloed → synaps; vier gouden ringen + nummers op synapsZ4 (afgifte, receptor, opruimen, aanmaak met grondstof die neurotransmitter wordt); zoomcirkel op de receptor: agonist opent het kanaal, antagonist past en blokkeert; de ingreepkaart bouwt op |
| 1:24 | 2 Koffie | s06, q07, s08 | klok 08:00→22:00 + slaapdrukbalk met adenosine + Linda (moe/blij/moe); ronde zenuwcel met vier receptoren: adenosine remt, cafeïne bezet ze, adenosine wacht, cafeïne afgebroken → de dip |
| 2:22 | 3 Wijn | s09, s10, q11, s12 | twee ronde cellen: GABA-receptor (Cl⁻, rem) gaat verder open, glutamaatreceptor (Na⁺, gas) minder; meters; netwerk dat trager vuurt; schakeling remcel → zenuwcel voor gedrag → 'praten en doen' (rem op de rem) |
| 3:35 | 4 Medicijnen | s13, q14, s15 | ingreepkaart rechts vult zich; nicotine op de acetylcholinereceptor; SSRI blokkeert de transporter; zeker/minder zeker + tijdlijn uur tegen weken; Parkinson-cellen sterven af; dopamine botst op de bloed-hersenbarrière, levodopa gaat erdoor en wordt in het eindknopje dopamine |
| 4:53 | 5 Gewenning en verslaving | s16, q17, s18 | ronde cel + signaalmeter: receptoren gaan de cel in (gewenning), stof weg (ontwenning); hoofd in doorsnede (beeldbank hoofdHersenen) met de beloningsbaan ventraal tegmentum → nucleus accumbens → prefrontale schors; eten en gezelschap (Noor, Daan); effect- en verlangenmeter |
| 6:05 | Samenvatting | s19 | synaps met vier nummers en de volle ingreepkaart |
| 6:32 | Eindkaart | s20 | drie kernzinnen + volgende film |

Met vragen uit: hoofdstukken op 0:22, 1:00, 1:34, 2:21, 3:16, 4:04, eindkaart 4:31.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 (q04) | H1 Vier plekken | Op hoeveel plekken in een synaps kan een stof ingrijpen? | A. Op één plek: de receptor / B. Op twee plekken: afgifte en receptor / C. Op meer dan twee plekken | C | A | basis (5 vwo) |
| V2 (q07) | H2 Koffie | Hoe maakt cafeïne je wakker? | A. Cafeïne geeft je cellen energie / B. Cafeïne blokkeert een stof die je slaperig maakt / C. Cafeïne laat je hart direct sneller kloppen | B | A | basis (5 vwo) |
| V3 (q11) | H3 Wijn | Alcohol remt je hersenen. Waarom word je na één glas eerst juist losser en spraakzamer? | A. Een beetje alcohol werkt opwekkend / B. Eerst worden de cellen geremd die jou afremmen / C. Omdat je het verwacht | B | A | basis (5 vwo) |
| V4 (q14) | H4 Medicijnen | Een SSRI remt de heropname van serotonine. Wat gebeurt er dan in de spleet? | A. Er komt meer serotonine bij / B. De serotonine blijft langer in de spleet hangen / C. De receptoren worden gevoeliger | B | A | basis (5 vwo) |
| V5 (q17) | H5 Gewenning en verslaving | Een zenuwcel krijgt wekenlang veel meer signaal dan normaal. Wat doet die cel? | A. Niets, hij vuurt gewoon vaker / B. Hij maakt minder receptoren, zodat het signaal weer normaal wordt / C. Hij raakt beschadigd | B | A | basis (5 vwo) |

In 2.0 zijn de vragen dezelfde; de gesproken vraagzin eindigt nu op “Wat denk je?” en het gesproken “Het goede antwoord is …” is weggeknipt (de vraagkaart van de speler toont het antwoord met uitleg).

### Checkvragen op de pagina

1. Teken de synaps en geef de vier plekken aan waar een stof kan ingrijpen. Zet cafeïne, nicotine, een SSRI en levodopa op de juiste plek.  
   *Antwoord:* 1 afgifte, 2 receptor, 3 opruimen, 4 aanmaak. Cafeïne en nicotine op de receptor (antagonist en agonist), SSRI bij het opruimen (heropname), levodopa bij de aanmaak.
2. Leg het verschil uit tussen een agonist en een antagonist. Welke van de twee is cafeïne, en op welke receptor? Verklaar daarmee de 'cafeïne-dip'.  
   *Antwoord:* Agonist: past en zet aan; antagonist: past maar blokkeert. Cafeïne is een antagonist op de adenosinereceptor. Adenosine hoopt zich intussen op; als de cafeïne is afgebroken, bindt alle adenosine tegelijk: plotselinge vermoeidheid.
3. Alcohol maakt het hele zenuwstelsel trager, maar na één glas worden mensen vaak juist spraakzamer. Verklaar beide met de begrippen remmend en exciterend.  
   *Antwoord:* Alcohol versterkt remmende (GABA) en verzwakt exciterende (glutamaat) synapsen. De cellen die ons gedrag afremmen zijn als eerste gevoelig; als die worden geremd, valt de rem weg (losser). Bij meer alcohol wordt ook de rest geremd (traag).
4. Een leerling zegt: 'Een SSRI maakt meer serotonine, en depressie is een serotoninetekort.' Wat klopt er wel en wat niet?  
   *Antwoord:* Een SSRI maakt geen extra serotonine; het remt de heropname, zodat de stof langer in de spleet blijft. Dat is de werking van het middel. Waardoor depressie ontstaat is niet volledig bekend en niet simpelweg een tekort aan één stof; het effect komt pas na weken, dus er verandert meer dan de hoeveelheid stof in de spleet.
5. Iemand drinkt elke dag vier koppen koffie en stopt er ineens mee. Voorspel wat er de eerste dagen gebeurt en verklaar dat met receptoren.  
   *Antwoord:* Door de dagelijkse blokkade heeft de cel meer adenosinereceptoren gemaakt (gewenning). Zonder cafeïne bindt adenosine nu op extra veel receptoren: sterke vermoeidheid en hoofdpijn (ontwenning), tot de cel het aantal receptoren weer heeft bijgesteld.

## Begrippen

- **psychoactieve stof** — stof die via het zenuwstelsel je waarneming, stemming of gedrag verandert.
- **agonist** — stof die in een receptor past en hem aanzet, zoals de echte neurotransmitter.
- **antagonist** — stof die in een receptor past maar hem niet aanzet; blokkeert de echte neurotransmitter.
- **heropnameremmer** — stof die het terugpompen van neurotransmitter in het eindknopje remt, zodat de stof langer in de spleet blijft.
- **adenosine** — stof die zich tijdens het waken ophoopt in de hersenen en zenuwcellen remt (slaapdruk).
- **cafeïne** — antagonist op de adenosinereceptor; verbergt vermoeidheid.
- **GABA** — de belangrijkste remmende neurotransmitter in de hersenen.
- **glutamaat** — de belangrijkste exciterende neurotransmitter in de hersenen.
- **alcohol (ethanol)** — versterkt de werking van GABA en remt die van glutamaat; het netwerk wordt trager.
- **nicotine** — agonist op (nicotinerge) acetylcholinereceptoren; laat ook dopamine vrijkomen.
- **serotonine** — neurotransmitter die onder andere bij stemming, slaap en eetlust een rol speelt.
- **SSRI** — antidepressivum dat de heropname van serotonine remt (selectieve serotonine-heropnameremmer).
- **dopamine** — neurotransmitter die onder andere bij beweging en beloning een rol speelt.
- **levodopa (L-dopa)** — grondstof voor dopamine; komt, anders dan dopamine, wel de hersenen in; medicijn bij de ziekte van Parkinson.
- **ziekte van Parkinson** — aandoening waarbij zenuwcellen afsterven die dopamine maken; leidt tot bewegingsproblemen.
- **tolerantie (gewenning)** — afname van het effect van een stof bij herhaald gebruik, doordat de cel receptoren weghaalt of minder gevoelig maakt.
- **ontwenning** — klachten na het stoppen met een stof, doordat de aangepaste cel nu te weinig signaal krijgt.
- **beloningssysteem** — hersengebieden waar dopamine vrijkomt bij iets dat goed was; stuurt herhalen aan.
- **verslaving** — toestand waarin het verlangen naar een stof of gedrag voor het effect uit gaat, door aanpassing van synapsen en het beloningssysteem.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 4 laat zien dat elke psychoactieve stof op een van vier plekken in de synaps ingrijpt. De rode draad is de ingreepkaart; de ingang is koffie en wijn. Niveau: 5 vwo, CE-stof. De toon is mechanistisch en zonder oordeel.

**Vooraf: gevoelige thema's**

In elke klas zitten leerlingen die zelf, of via iemand thuis, met medicijnen, drank of drugs te maken hebben. Suggestie om de les te openen: zeg dat de film over werking gaat, niet over mensen, en dat niemand iets hoeft te delen. Bij antidepressiva zegt de film wat bekend is (heropname geremd; effect na weken) en dat waardoor een depressie ontstaat niet volledig bekend is en niet één tekort is. "Hoe een middel werkt is iets anders dan waardoor een aandoening ontstaat" is een zin om bij te blijven. De slotzin over verslaving ("geen zwakke wil, maar een aangepaste synaps") is bedoeld om schaamte weg te nemen, niet om risico te bagatelliseren. Hulp en informatie: huisarts, [Trimbos-instituut](https://www.trimbos.nl), [drugsinfo.nl](https://www.drugsinfo.nl).

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 Vier plekken: een stof "geeft energie"
- 2 Koffie: cafeïne is een energiebron
- 3 Wijn: alcohol is opwekkend
- 4 Medicijnen: meer stof in de spleet = beter
- 5 Gewenning en verslaving: verslaving is alleen een kwestie van wil

**De feiten en getallen**

| Feit | Waarde | Bron | In de film |
|---|---|---|---|
| cafeïne | blokkeert de bindingsplaats van adenosine (antagonist); halfwaardetijd 3–7 uur; piek na 1–2 uur; 50–175 mg per kop | [Caffeine (Wikipedia)](https://en.wikipedia.org/wiki/Caffeine) | "na een paar uur"; "na een kwartier wakker" is de eerste merkbare werking |
| adenosine | hoopt zich op tijdens waken, daalt in de slaap (slaapdruk) | [Adenosine (Wikipedia)](https://en.wikipedia.org/wiki/Adenosine) | slaapdrukbalk 8:00–22:00 |
| alcohol | versterkt GABA op de GABA-A-receptor; beïnvloedt ook glutamaat; afbraak 15–18 mg/dl per uur | [Alcohol (drug) (Wikipedia)](https://en.wikipedia.org/wiki/Alcohol_(drug)) | "meer rem, minder gas"; de "rem op de rem" is het gangbare model voor disinhibitie |
| nicotine | agonist op nicotinerge acetylcholinereceptoren; dopamine-afgifte; in de hersenen binnen 10–20 s; halfwaardetijd ≈ 2 uur | [Nicotine (Wikipedia)](https://en.wikipedia.org/wiki/Nicotine) | "binnen tien seconden" |
| SSRI | remt de serotoninetransporter; effect pas na weken; geen consistent bewijs dat depressie door verlaagde serotonine komt | [SSRI (Wikipedia)](https://en.wikipedia.org/wiki/Selective_serotonin_reuptake_inhibitor) | "pas na weken"; "niet simpelweg een tekort aan één stof" |
| Parkinson en levodopa | verlies van dopamine-producerende neuronen in de substantia nigra; levodopa is de directe voorloper van dopamine | [Parkinson's disease (Wikipedia)](https://en.wikipedia.org/wiki/Parkinson%27s_disease), [L-DOPA (Wikipedia)](https://en.wikipedia.org/wiki/L-DOPA) | dat dopamine de bloed-hersenbarrière niet passeert is een handboekfeit (niet op deze pagina's gevonden) |
| tolerantie | voortdurende binding desensitiseert receptoren; ook minder receptoren; tolerantie is niet hetzelfde als verslaving | [Drug tolerance (Wikipedia)](https://en.wikipedia.org/wiki/Drug_tolerance) | signaalmeter; "er is nog iets" |

**Vereenvoudigingen**

De signaalmeter in hoofdstuk 5 is een model: signaal = stof × receptoren, teruggeregeld naar "normaal". Het beloningssysteem is als één gebied getekend (in werkelijkheid een keten, onder andere ventraal tegmentum en nucleus accumbens). Cafeïne werkt ook op andere plekken (bijvoorbeeld hartslag via adrenaline), maar het wakker-effect loopt via adenosine. Alcohol beïnvloedt meer systemen dan GABA en glutamaat. De dip na koffie is een vereenvoudiging van ophoping plus afbraak.

**Leerdoelen**

Vier aangrijpingspunten (V1, C1) · agonist en antagonist (V2, C2) · cafeïne en alcohol (V2, V3, C2, C3) · heropnameremming en het onderscheid middel/aandoening (V4, C4) · levodopa en aanmaak (C4) · tolerantie, ontwenning, verslaving (V5, C5).

## Techniek: waar zit wat (2.0)

Werkmap om te bouwen: kopieer bron/remake-2026-10/ naar /home/claude/werk/zen4/ (src/ → eng/ samen met bouw/*.py; film/ → film/; raw/ = de mp3's uit ../audio), dan `bash bouw.sh` en `bash afmaken.sh` (zet het resultaat in de repo en draait spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, tabel_mobiel, licentie_noot, teller; een nieuw bestand eerst `git add`, anders slaat licentie_noot het over).

- `film/segments.json` — 20 segmenten (speech/question/title/card); `film/maak_segments.py` maakt hem uit `disp_oud.json` (prep_audio.py) en `a4_voice.txt`.
- `film/words/<id>.json` — woordtijden (oude ElevenLabs-tijden herschikt; s15 silalign).
- `film/film.py` — titel, vragen met uitleg (`questions`), begrippen, footer, `audiomap` (audio staat in de map van de oude film).
- `film/sections.html` — checkvragen en docentdeel op de pagina.
- `film/synaps_z4.js` — `synapsZ4` = synapsEcht uit bibliotheek/lib_bio.js met drie kleuropties (nt, imp, trans).
- `film/teken_z4.js` — hulpjes: `Z4` (kleuren) r. 3, `mol` r. 18 (molecuulvormpjes nt/ado/cafe/alc/grond/blok), `celBoog` r. 35 (ronde cel met dubbellaag), `receptor` r. 54 (ionkanaal met bindingsplek), `ingreepkaart` r. 70, `PLEKPOS`/`plekRing` r. 87, `aanmaak` r. 94, `cel`/`axon` r. 100, `meter` r. 112, decor (raam, tafel, kopje ± 10 cm, wijnglas ± 20 cm, bank met zithoogte 45 cm, lamp) r. 120–145, `ochtend`/`avond` r. 146/154 (Linda, 1 cm = s px), `pil`, `bord`, `BELONING` + `beloningsbaan` r. 170, `balkMeter` r. 179.
- `film/scenes_z4.js` — één functie per alinea: title r. 7, s01 r. 10, s03 r. 22, s05 r. 29, s06 r. 52, s08 r. 54, s09 r. 83, s10 r. 101, s12 r. 103, s13 r. 129, s15 r. 134, s16 r. 188, s18 r. 194, s19 r. 230. Cues via `q.on(woord, n, duur)` / `q.at(woord, n)`; let op: `q.at` zoekt op 'woord zit erin' (bv. 'Er' vindt ook 'Terug'), kies dus een uniek woord.
- `storyboard/` — 24 keyframes (960×540) + storyboard.json voor het keuringsblad.

## Zo pas je deze film aan

1. **Beeld**: pas de scènefunctie in scenes_z4.js aan (cues op dezelfde woorden), bouw, bekijk stills met `python3 bouw/stills.py film /tmp/x s05:16 …`.
2. **Eén alinea opnieuw inspreken**: model eleven_multilingual_v2, stem Roos, uitspraakregels uit films/uitspraak.json; mp3 naar raw/<id>.mp3 en ../audio/<id>.mp3, `display` in segments.json bijwerken, woordtijden met `SIL_DB=-26 SIL_MIN=8 python3 bouw/silalign.py film <id>`, cues nalopen.
3. **Vraag**: opties in segments.json (`options`), vraag/juist/uitleg in film.py (`questions`).
4. Na elke bouw: `bash afmaken.sh`, Vragen uit afspelen rond elke vraag (test/vragenuit.py in de werkmap, zie Wijzigingen).

## Aandachtspunten

- Gevoelig onderwerp: het docentdeel houdt het blok 'Vooraf: gevoelige thema's'; de SSRI-passage doet geen oorzaakclaim over depressie.
- Nieuwe tekeningen nog niet in de beeldbank (Kamiel: 'nieuwe beeldbankobjecten: later'): `receptor` (eenvoudig ionkanaal met bindingsplek, agonist/antagonist), `mol` (adenosine/cafeïne met dezelfde basisvorm, ethanol, grondstof), `beloningsbaan` op hoofdHersenen, decor thuis (kopje, wijnglas, bank, lamp, raam), en de kleuropties van synapsZ4. Kandidaten voor lib_bio.js.
- Castpersonages zonder naam in stem of beeld: Linda (cold open, koffie, wijn), Noor en Daan (gezelschap, s18).

## Wijzigingen
- **2.0 · 29 okt 2026 — lichte remake in de donkere stijl (preview naast de oude film)**, keuze Kamiel 29 okt 2026. Script, vragen en volgorde gelijk; stem blijft behalve s15.
  - *Alle scènes:* nieuw beeld in Part C (donker navy, Fraunces/Source Sans 3), FILMDATA-speler met snelheid en Vragen aan/uit; alle membranen gebogen, cellen rond; geen korrel buiten cellen; kleuren volgens de tabel (neurotransmitter licht teal, zenuwsignaal teal, niet meer paars).
  - *s01 (cold open):* twee kamers thuis (ochtend/avond) met Linda, realistische maten; zoomcirkel naar synapsZ4 i.p.v. de oude lens.
  - *s03/s05 (Vier plekken):* synapsZ4 uit de beeldbank (keuze Kamiel) i.p.v. de eigen synaps; vier plekken als gouden ringen met nummers; agonist/antagonist in een zoomcirkel op de receptor; ingreepkaart als vast UI-element.
  - *s06/s08 (Koffie):* klok, slaapdrukbalk en Linda; ronde cel met receptoren; cafeïne heeft dezelfde basisvorm als adenosine ('lijkt op').
  - *s09–s12 (Wijn):* GABA- en glutamaatreceptor in twee ronde cellen met meters; netwerk dat trager vuurt; schakeling voor 'rem op de rem'.
  - *s13/s15 (Medicijnen):* **nieuwe opname** (883 credits): 'binnen tien seconden' → 'binnen een paar seconden' (bewering 16, keuze Kamiel), taalfout 'Dopamine zelf kom je niet' → 'komt niet'; SSRI met de beeldbank-blokkade; tijdlijn uur tegen weken; bloed-hersenbarrière met levodopa als grondstof.
  - *s16/s18 (Gewenning en verslaving):* receptoren gaan zichtbaar de cel in (gewenning); beloningssysteem als hersendoorsnede (beeldbank `hoofdHersenen`) met de baan ventraal tegmentum → nucleus accumbens → prefrontale schors i.p.v. een wolk (keuze Kamiel); eten en gezelschap met Noor en Daan.
  - *s19/s20:* samenvatting met de volle ingreepkaart; eindkaart met drie kernzinnen.
  - *Audio:* 'Het goede antwoord is X.' aan het begin van a1, a2, a3, a5 weggeknipt (de vraagkaart toont het antwoord); 'Wat denk je?' achteraan de vraagzinnen, zodat bij Vragen uit niets van de vraag overblijft.
  - *Pagina:* docentdeel met A-bronnen i.p.v. Wikipedia; begrip 'bloed-hersenbarrière' erbij; beloningssysteem als keten beschreven.
  - *Getest:* contactvel van alle scènes (ook na correcties), elke vraag afgespeeld met `?vragen=uit` (5 s ervoor tot 5 s erna: alleen de contextzin blijft, geen vraag of antwoord), 375 en 360 px (geen horizontale scroll), geen fouten in de console, B11-scripts met --check.

## Geschiedenis versie 1.x (oude film, nog online als 4-knoeien-met-de-spleet.html)
- **1.1 · 28 okt 2026** — opwaardering prompt v13 (B14, zonder keuring; Regeling-batch). Geen nieuwe opname. Details en open vragen: `opwaardering-v13.md`; vakinhoud: `bronnen.md`.
  - *s00 (cold open):* de twee grijze poppetjes (rond hoofd, blokvormig lijf) vervangen door castpersonage Linda (moeder van Noor, volwassen; geen naam in beeld of stem): 's ochtends staand achter de tafel (uitdrukking `moe`, bij 'wakker' `blij`), 's avonds zittend op de bank (`neutraal`, bij 'losser' `lacht`). lib_cast.js afgeschermd in de film (`window.CASTSVG`, het castbeeld wordt bij het laden als `<image>` in de SVG gezet; ids `w-eyes1`/`w-eyes1o`/`w-p2a`/`w-p2b`). Ook in de gedimde wereld onder de samenvatting.
  - *s00:* realistische maten (tafel 75 cm = 284 px): kopje ±10 cm (was ±24 cm), wijnglas ±20 cm (was ±42 cm, zweefde in de lucht) en staat nu op de armleuning.
  - *s00 (lens), a1–a4 (synaps), a5 (gewenning):* het membraan van de volgende cel aan de kant van de spleet is gebogen in plaats van een rechte lijn.
  - *Speler (ondertitels):* bij Vragen uit flitste na de sprong nog ±0,15 s de ondertitel ‘Het goede antwoord is B.’; `renderCaption` laat bij Vragen uit de frasen ‘Het goede antwoord is …’ en ‘Wat denk je?’ weg (prompt v8, B9).
  - *Credits:* versie 1.1; dode link `reeks.html` → `../../index.html#regeling`.
  - *Let op:* de regelnummers in ‘Techniek: waar zit wat in de HTML’ gelden voor 1.0; in 1.1 staan er vóór `window.FILM_AUDIO` twee scripts bij (lib_cast afgeschermd, ±830 regels, en de castopbouw), dus alles vanaf r. 442 schuift ±845 regels op. Zoek op functienaam.
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s (duur van de `card`-stukken in `SEGS`).

### Wijziging 16 okt 2026
Titel op verzoek van Kamiel: "Knoeien met de synaps" (was "Knoeien met de spleet") in `<title>`, kop, titelkaart en `FILM.plan.title`; ook in de eindkaart van film 3, `index.html`, `pta-route.html` en de verwijzing in Slaap. Bestandsnaam blijft `4-knoeien-met-de-spleet.html` (links en kijkcijfers). De gesproken zin "ze knoeien met de spleet uit de vorige film" (s00, 0:11) gaat over de synapsspleet en is niet opnieuw ingesproken.

### Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
