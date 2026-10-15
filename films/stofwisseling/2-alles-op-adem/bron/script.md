# Alles op adem — script

Bron: gereconstrueerd uit de ondertitels/scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.chapters[i].phrases` (ondertitelfrasen) en `.sentences` (zinnen met woordtijden). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst, letterlijk.

Tijden: `[m:ss.s]` is de begintijd van de ondertitelfrase op de **filmklok** (alle hoofdstukken achter elkaar, zoals de tijdbalk van de speler). In de HTML staan de tijden **per hoofdstuk** (0 = begin van dat hoofdstuk-mp3); trek de begintijd van het hoofdstuk eraf. Elke hoofdstuk-mp3 bevat ook de stiltes (kaart, vraag, pauze, eindkaart): de audio is de klok.

Een "take" is een doorlopend stuk stem binnen het hoofdstuk-mp3 (`segments[].kind = "narr"`, veld `take`). Zinnen met `verdieping: true` zijn gemarkeerd met *(verdieping)*.


## 0. Opening (cold open)

Audio: blob 006.mp3 (`audio/ch_0.mp3` in `window.__AUDIO`) · 0:00–0:23 (23,8 s volgens ffprobe; `dur` in FILM 23,730 s)  
Niveau: 6 vwo

**Take 0a** · 0:00.8–0:17.7 (hoofdstuk 0,80–17,73 s)

[0:00.8] Op de honderd meter ren je zo hard als je kunt.  
[0:04.1] Probeer dat tempo maar eens een hele ronde vol te houden.  
[0:07.3] Dat lukt niemand, ook een topsprinter niet.  
[0:09.9] Rustig joggen kun je wel een uur.  
[0:12.1] Dezelfde benen, dezelfde loopster.  
[0:14.5] Waarom houd je het ene zo kort vol, en het andere zo lang?

> Titelkaart (0:18.9, 4,0 s, stil)

> Beeld (uit de scènecommentaar, regel 2490): H0 Cold open — de baan: sprinten (snelheidsmeter), het tempo zakt in, dezelfde loopster jogt (klok versneld tot 60 min). Snelheidsprofiel: model met gemeten orde van grootte (topsnelheid scholier ongeveer 30 km/h); zo gelabeld.


## 1. H1 De fosfaataccu

Audio: blob 007.mp3 (`audio/ch_1.mp3` in `window.__AUDIO`) · 0:23–1:58 (94,8 s volgens ffprobe; `dur` in FILM 94,765 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "De fosfaataccu"

**Take 1a** · 0:26.7–0:50.3 (hoofdstuk 3,00–26,54 s)

[0:26.7] Waar draait je spier op als hij trekt?  
[0:29.3] In elke spiervezel trekken  
[0:31.1] myosinemoleculen aan actinefilamenten.  
[0:33.8] Die beweging draait op ATP.  
[0:36.4] ATP is de belangrijkste chemische energiebron in een cel.  
[0:41.6] Bij elke slag splitst een myosinekop  
[0:43.8] één ATP in ADP en fosfaat.  
[0:47.3] Met die energie komt de kop klaar voor de volgende slag.

> Vraag (0:50.9, stil segment van 11,5 s; bedenktijd 30,64–38,64 s, onthulling 39,72 s in het hoofdstuk): Hoe lang kun je sprinten op de ATP die al in je spier zit?  
> Opties: A. Ongeveer twee seconden. · B. Ongeveer tien seconden. · C. Ongeveer een minuut.  
> Juist: A · verleidelijk (mis): C

**Take 1b** · 1:03.0–1:20.2 (hoofdstuk 39,24–56,48 s)

[1:02.9] Antwoord A: ongeveer twee seconden.  
[1:05.6] ATP is dus geen grote energievoorraad.  
[1:08.9] Je spier maakt het steeds opnieuw, uit ADP en fosfaat.  
[1:13.4] Daardoor raakt je ATP in het echt nooit op.  
[1:16.9] Maar opnieuw maken kost energie. Waar komt die vandaan?

**Take 1c** · 1:21.1–1:57.7 (hoofdstuk 57,33–93,97 s)

[1:21.0] ATP aanvullen gaat het snelst  
[1:23.2] met creatinefosfaat, kortweg CP.  
[1:26.3] CP geeft zijn fosfaat aan ADP. Zo ontstaat weer ATP.  
[1:31.5] ATP en CP samen in een spier heten de fosfaataccu.  
[1:36.8] De fosfaataccu heeft geen zuurstof nodig:  
[1:39.4] hij werkt anaeroob.  
[1:41.8] Ook van CP heeft je spier maar een kleine voorraad.  
[1:45.0] Na zo'n tien seconden sprinten is meer dan de helft op.  
[1:48.0] En hoe minder CP,  
[1:49.5] hoe minder ATP de fosfaataccu per seconde levert.  
[1:53.1] Tegelijk maakt je spier vanaf de start  
[1:55.0] ook ATP met energie uit glucose.

> Beeld (uit de scènecommentaar, regel 2580): H1 De fosfaataccu — inzoomen van de loopster naar de spiervezel en de eiwitdraden; ATP splitst bij een myosinekop; de ATP-voorraad is klein (± 2 s, berekend) maar wordt steeds aangevuld; CP + ADP → creatine + ATP; fosfaataccu; bij een sprint loopt CP snel terug (model, gemeten orde van grootte).


## 2. H2 Glycolyse

Audio: blob 008.mp3 (`audio/ch_2.mp3` in `window.__AUDIO`) · 1:58–3:32 (94,1 s volgens ffprobe; `dur` in FILM 94,105 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Glycolyse"

**Take 2a** · 2:01.5–2:25.1 (hoofdstuk 3,00–26,61 s)

[2:01.4] Hoe maakt je spier ATP met de energie uit glucose?  
[2:05.1] Glucose komt uit je bloed, of uit glycogeen:  
[2:07.7] je voorraad glucose in je spier.  
[2:09.8] In het grondplasma breekt een reeks enzymen glucose af.  
[2:13.2] Dat is de glycolyse.  
[2:15.7] Glucose heeft zes C-atomen.  
[2:18.0] Halverwege wordt het molecuul in tweeën gedeeld.  
[2:20.7] Aan het eind heb je twee moleculen pyrodruivenzuur,  
[2:23.4] elk met drie C-atomen.

**Take 2b** · 2:26.8–2:36.6 (hoofdstuk 28,26–38,13 s)

[2:26.7] Eerst kost de glycolyse twee ATP.  
[2:29.9] Daarna levert ze er vier op.  
[2:31.9] Netto levert de glycolyse dus  
[2:33.7] twee ATP per molecuul glucose op.

**Take 2c** · 2:38.7–2:54.3 (hoofdstuk 40,19–55,78 s)

[2:38.6] Bij één stap gaan er ook H-atomen af.  
[2:41.7] Een co-enzym, een klein hulpmolecuul, neemt ze op: NAD⁺.  
[2:46.4] Met de H-atomen erop heet het NADH,H⁺.  
[2:51.3] Per glucose gebeurt dat twee keer: één keer per helft.

**Take 2d** · 2:55.1–2:59.6 (hoofdstuk 56,63–61,13 s)

[2:55.1] Kijk rechts: de NAD⁺ in deze cel.  
[2:58.3] Daar is maar weinig van.

> Vraag (3:00.2, stil segment van 11,5 s; bedenktijd 65,23–73,23 s, onthulling 74,32 s in het hoofdstuk): Alle NAD⁺ is omgezet in NADH,H⁺. Wat doet de glycolyse dan?  
> Opties: A. Die gaat langzamer door. · B. Die stopt. · C. Die gaat gewoon door.  
> Juist: B · verleidelijk (mis): C

**Take 2e** · 3:12.3–3:31.8 (hoofdstuk 73,83–93,31 s)

[3:12.3] Antwoord B: de glycolyse stopt.  
[3:14.7] Zonder NAD⁺ kunnen de H-atomen bij die stap nergens heen.  
[3:19.3] Dan stopt de glycolyse, en komt er geen ATP meer bij.  
[3:23.1] De glycolyse loopt dus alleen door  
[3:25.0] als NADH,H⁺ zijn H-atomen weer afgeeft.  
[3:29.1] Waar dat gebeurt, hangt vooral af van zuurstof.

> Beeld (uit de scènecommentaar, regel 2803): H2 Glycolyse — eerst één glucose in detail (6 C → twee helften van 3 C → 2 pyrodruivenzuur; −2/+4 ATP), dan een tweede glucose: van elke helft gaan H-atomen af naar NAD⁺ (→ NADH,H⁺). Daarna de populatie in het grondplasma (GlySim): de voorraad NAD⁺ raakt op en de glycolyse stopt. Tijdens de vraag staat de simulatie stil (niets voorzeggen); na de onthulling worden de laatste NAD⁺ opgebruikt, dan een vergrootglas op een vastgelopen enzymcluster en de vraag waar de H-atomen heen kunnen.


## 3. H3 Gisting

Audio: blob 009.mp3 (`audio/ch_3.mp3` in `window.__AUDIO`) · 3:32–4:52 (79,7 s volgens ffprobe; `dur` in FILM 79,686 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Gisting"

**Take 3a** · 3:35.6–3:39.2 (hoofdstuk 3,00–6,62 s)

[3:35.6] Stel: er is geen zuurstof.  
[3:37.3] Staat de glycolyse dan voorgoed stil?

> Vraag (3:39.8, stil segment van 11,5 s; bedenktijd 10,72–18,72 s, onthulling 19,75 s in het hoofdstuk): Een enzym zet pyrodruivenzuur om in melkzuur. Wat levert die stap op?  
> Opties: A. Extra ATP. · B. Niets: melkzuur is afval. · C. NAD⁺ voor de glycolyse.  
> Juist: C · verleidelijk (mis): A

**Take 3b** · 3:51.9–4:27.8 (hoofdstuk 19,32–55,17 s)

[3:51.9] Antwoord C.  
[3:53.0] Het enzym zet de H-atomen van NADH,H⁺ op pyrodruivenzuur.  
[3:58.4] Zo ontstaat melkzuur,  
[4:00.0] en komt NAD⁺ weer beschikbaar voor de glycolyse.  
[4:04.6] De stap naar melkzuur levert zelf geen ATP op.  
[4:08.0] Maar de glycolyse kan weer door,  
[4:09.6] en die levert netto twee ATP per glucose.  
[4:13.1] Zonder zuurstof maak je dus wél ATP,  
[4:16.0] alleen weinig per glucose.  
[4:17.9] Dit heet gisting. Er komt geen zuurstof aan te pas:  
[4:20.7] gisting is anaeroob.  
[4:23.6] Bij gisting wordt pyrodruivenzuur omgezet in melkzuur,  
[4:26.8] of in ethanol.

**Take 3c** · 4:28.6–4:36.6 (hoofdstuk 56,02–63,96 s)

[4:28.6] Gistcellen maken ethanol, oftewel alcohol,  
[4:31.2] en daarbij ontstaat ook CO₂.  
[4:34.1] Door dat CO₂ rijst brooddeeg.

**Take 3d** · 4:37.4–4:50.5 (hoofdstuk 64,81–77,89 s)

[4:37.4] Bij snelle gisting  
[4:38.4] hopen melkzuur en H⁺ zich op in je spier.  
[4:41.4] De pH in de spiervezel daalt.  
[4:43.8] En uit de vorige film weet je:  
[4:45.3] enzymen zijn gevoelig voor de pH.  
[4:47.7] Die lagere pH draagt bij aan vermoeidheid.

> Beeld (uit de scènecommentaar, regel 3044): H3 Gisting — dezelfde cel zonder zuurstof: de glycolyse staat stil (alle NAD⁺ beladen). Een nieuw enzym zet de H-atomen van NADH,H⁺ op pyrodruivenzuur: melkzuur ontstaat en NAD⁺ komt terug, de glycolyse loopt weer (netto 2 ATP per glucose). Daarna: melkzuur of ethanol (gist, brooddeeg) en de pH-daling in de spier (model; gemeten bereik 7,1 → 6,6).


## 4. H4 Van glucose naar CO₂

Audio: blob 010.mp3 (`audio/ch_4.mp3` in `window.__AUDIO`) · 4:52–6:27 (95,2 s volgens ffprobe; `dur` in FILM 95,190 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Van glucose naar CO₂"

**Take 4a** · 4:55.3–4:57.8 (hoofdstuk 3,00–5,49 s)

[4:55.2] Bij elke uitademing blaas je CO₂ uit.

> Vraag (4:58.4, stil segment van 11,5 s; bedenktijd 9,59–17,59 s, onthulling 18,63 s in het hoofdstuk): Waar ontstaat het CO₂ dat je uitademt?  
> Opties: A. In je longen. · B. In je mitochondriën. · C. In het grondplasma.  
> Juist: B · verleidelijk (mis): A

**Take 4b** · 5:10.5–5:29.3 (hoofdstuk 18,19–36,99 s)

[5:10.4] Antwoord B. Bij melkzuurgisting ontstaat geen CO₂.  
[5:14.0] Met genoeg zuurstof gaat pyrodruivenzuur  
[5:16.3] vooral een andere kant op:  
[5:17.8] het mitochondrium in.  
[5:19.5] Deze route heeft wél zuurstof nodig: hij is aeroob.  
[5:22.8] Een mitochondrium heeft een  
[5:24.3] buitenmembraan en een binnenmembraan.  
[5:26.6] De ruimte binnen het binnenmembraan heet de matrix.

**Take 4c** · 5:30.9–5:50.0 (hoofdstuk 38,64–57,72 s)

[5:30.9] In de matrix splitsen enzymen CO₂ af van pyrodruivenzuur.  
[5:35.5] Dat heet decarboxyleren.  
[5:38.6] Wat overblijft, wordt vastgemaakt aan een co-enzym: coA.  
[5:42.7] Samen heet dat acetyl-coA.  
[5:46.4] Ook hierbij neemt NAD⁺ H-atomen op.

**Take 4d** · 5:50.9–6:15.2 (hoofdstuk 58,57–82,87 s)

[5:50.8] Acetyl-coA gaat de citroenzuurcyclus in:  
[5:53.4] een kringloop van enzymreacties.  
[5:56.6] Per ronde komen er twee C-atomen vrij als CO₂.  
[6:00.3] Daarbij nemen NAD⁺ en een tweede co-enzym,  
[6:03.8] FAD, H-atomen op.  
[6:06.1] Zo ontstaan NADH,H⁺ en FADH₂.  
[6:10.6] Uit één glucose ontstaan twee acetyl-coA,  
[6:13.3] dus de kringloop draait twee rondes.

**Take 4e** · 6:16.0–6:26.7 (hoofdstuk 83,72–94,39 s)

[6:16.0] Zo komen alle zes de C-atomen van  
[6:18.4] glucose uiteindelijk in CO₂ terecht.  
[6:22.7] Het CO₂ gaat via je bloed naar je longen,  
[6:25.2] en je ademt het uit.

> Beeld (uit de scènecommentaar, regel 3214): H4 Van glucose naar CO₂ — waar komt het CO₂ vandaan dat je uitademt? Met zuurstof gaat pyrodruivenzuur vooral het mitochondrium in (buitenmembraan, binnenmembraan, matrix); een klein deel wordt in het grondplasma melkzuur (geen CO₂). In de matrix: decarboxyleren (CO₂ eraf), coA erop → acetyl-coA (NAD⁺ → NADH,H⁺), citroenzuurcyclus (per ronde 2 CO₂, 3 NADH,H⁺, 1 FADH₂, 1 ATP; 2 rondes per glucose). De producten vliegen naar hun rij in de telling; C-atomen tellen: 6 C → 6 CO₂. Slot: CO₂ via bloed en longen naar buiten (loopster).


## 5. H5 De elektronentransportketen

Audio: blob 011.mp3 (`audio/ch_5.mp3` in `window.__AUDIO`) · 6:27–8:05 (98,1 s volgens ffprobe; `dur` in FILM 98,031 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "De elektronentransportketen"

**Take 5a** · 6:30.5–6:38.4 (hoofdstuk 3,00–10,88 s)

[6:30.4] Waar is de energie van glucose nu gebleven?  
[6:33.0] Die zit vooral in de beladen co-enzymen: NADH,H⁺ en FADH₂.

**Take 5b** · 6:39.2–7:18.3 (hoofdstuk 11,73–50,79 s)

[6:39.2] Een H-atoom bestaat uit een H⁺ en een elektron.  
[6:42.6] NADH,H⁺ geeft zijn elektronen af aan  
[6:46.2] een eiwitcomplex in het binnenmembraan.  
[6:48.7] De H⁺ komen los in de matrix,  
[6:51.0] en wat overblijft is weer NAD⁺.  
[6:54.1] Vanaf daar gaan de elektronen stap voor  
[6:56.0] stap van eiwitcomplex naar eiwitcomplex.  
[6:59.2] Die reeks eiwitcomplexen heet de elektronentransportketen.  
[7:03.9] Bij elke stap geven de elektronen een deel  
[7:06.2] van hun energie af aan een eiwitcomplex.  
[7:09.0] Met die energie pompen de eiwitcomplexen  
[7:11.2] H⁺ door het binnenmembraan.  
[7:14.1] FADH₂ geeft zijn elektronen wat verderop in de keten af.

**Take 5c** · 7:19.1–7:31.5 (hoofdstuk 51,64–64,03 s)

[7:19.1] Kijk naar de teller:  
[7:20.0] tussen de membranen steeds meer H⁺, in de matrix minder.  
[7:25.7] In hetzelfde membraan zit ook ATP-synthetase:  
[7:29.0] het eiwit dat ATP maakt.

> Vraag (7:32.1, stil segment van 11,5 s; bedenktijd 68,13–76,13 s, onthulling 77,34 s in het hoofdstuk): Hoe levert die ophoping van H⁺ ATP op?  
> Opties: A. H⁺ stromen terug door ATP-synthetase. · B. Elektronen gaan door ATP-synthetase. · C. Zuurstof bindt aan ATP-synthetase.  
> Juist: A · verleidelijk (mis): B

**Take 5d** · 7:44.2–7:58.7 (hoofdstuk 76,73–91,21 s)

[7:44.2] Antwoord A.  
[7:45.6] De H⁺ stromen terug naar de kant met weinig H⁺,  
[7:48.9] vooral door ATP-synthetase.  
[7:51.4] Daarbij draait een deel van het eiwit rond.  
[7:53.8] Zo koppelt ATP-synthetase ADP en fosfaat tot ATP.

**Take 5e** · 8:00.5–8:04.7 (hoofdstuk 93,06–97,23 s)

[8:00.5] Het binnenmembraan is sterk geplooid:  
[8:02.6] zo is er plaats voor heel veel ketens.

> Beeld (uit de scènecommentaar, regel 3431): H5 De elektronentransportketen — binnenmembraan met eiwitcomplexen; elektronen uit NADH,H⁺ en FADH₂ gaan stap voor stap door de keten; de complexen pompen H⁺ naar de ruimte tussen de membranen (H⁺ hopen op: ATP-synthetase doet pas mee na de onthulling); daarna stromen H⁺ terug door ATP-synthetase → ATP. Inzetten: beladen co-enzymen, H-atoom = H⁺ + elektron, energietrap, draaiende rotor (verdieping), geplooid binnenmembraan. Simulatie: EtcSim (sim2.js), tekening ETC2 (etc2.js).


## 6. H6 Zuurstof
> **Opnieuw inspreken (15-10-2026)**: [nieuw]-regels toegevoegd (aanvulling na vergelijking met Gewoon Uitgelegd). Tijden kloppen pas weer na de nieuwe opname.

Audio: blob 012.mp3 (`audio/ch_6.mp3` in `window.__AUDIO`) · 8:05–9:54 (108,6 s volgens ffprobe; `dur` in FILM 108,560 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Zuurstof"

**Take 6a** · 8:08.5–8:12.4 (hoofdstuk 3,00–6,90 s)

[8:08.5] Aan het eind van de keten gaan  
[8:10.6] de elektronen naar zuurstof, O₂.

> Vraag (8:13.0, stil segment van 11,5 s; bedenktijd 11,00–19,00 s, onthulling 20,06 s in het hoofdstuk): Waar komen de O-atomen terecht van de zuurstof die je cellen gebruiken?  
> Opties: A. In CO₂. · B. In ATP. · C. In H₂O.  
> Juist: C · verleidelijk (mis): A

**Take 6b** · 8:25.1–8:46.7 (hoofdstuk 19,60–41,20 s)

[8:25.1] Antwoord C: in water.  
[8:27.2] O₂ neemt de elektronen als laatste op:  
[8:29.6] het is de laatste elektronenacceptor.  
[8:33.2] H⁺, elektronen en O₂ vormen samen water.  
[8:37.2] De zuurstof die je cellen gebruiken, wordt dus water.  
[8:41.2] De C-atomen in het CO₂ dat je uitademt,  
[8:44.2] komen uit je brandstof, zoals glucose.

**Take 6c** · 8:47.6–9:01.7 (hoofdstuk 42,05–56,23 s)

[8:47.5] Deze vorming van veel ATP met behulp  
[8:50.1] van O₂ heet oxidatieve fosforylering.  
[8:54.4] Fosforylering betekent: fosfaat aan ADP koppelen.  
[8:58.4] Oxidatief, omdat de elektronen  
[9:00.1] uiteindelijk naar zuurstof gaan.
[nieuw] Dat woord komt uit de scheikunde: de dissimilatie is een redoxreactie.  
[nieuw] Onderweg staat glucose H-atomen af aan NAD⁺ en FAD, en daarmee ook elektronen.  
[nieuw] Wie elektronen afstaat, wordt geoxideerd. Glucose is hier de reductor.  
[nieuw] Zuurstof neemt die elektronen aan het eind van de keten op, en wordt gereduceerd tot water.  
[nieuw] Zuurstof is de oxidator.

**Take 6d** · 9:02.6–9:12.8 (hoofdstuk 57,08–67,29 s)

[9:02.5] Ook NADH,H⁺ uit de glycolyse  
[9:05.9] geeft zijn elektronen aan de keten,  
[9:07.8] via een omweg.  
[9:09.2] Zo komt NAD⁺ weer vrij, en kan de glycolyse door.

**Take 6e** · 9:13.6–9:36.1 (hoofdstuk 68,14–90,59 s)

[9:13.6] En als er geen zuurstof is?  
[9:15.5] Dan kunnen de elektronen nergens heen,  
[9:17.4] en loopt de hele keten vast.  
[9:20.1] De eiwitcomplexen pompen geen H⁺ meer.  
[9:23.0] Het H⁺-verschil verdwijnt, en ATP-synthetase staat stil.  
[9:27.8] In de matrix komt geen NAD⁺ meer vrij,  
[9:30.2] dus ook de citroenzuurcyclus stopt.  
[9:32.7] Dan blijven de fosfaataccu en  
[9:34.3] de glycolyse met gisting over.

**Take 6f** · 9:36.9–9:53.3 (hoofdstuk 91,44–107,76 s)

[9:36.9] Met zuurstof levert één glucose veel meer ATP op.  
[9:40.6] Niet twee, maar ongeveer dertig.  
[9:44.0] De afbraak van glucose met zuurstof tot  
[9:46.1] CO₂ en water heet aerobe dissimilatie.  
[nieuw] Netto: één glucose plus zes zuurstof wordt zes koolstofdioxide plus zes water.  
> Stem-invoer van deze [nieuw]-zin: Netto: één glucose plus zes zuurstof wordt zes koolstofdie-oxide plus zes water. In beeld: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O (zie wachtlijst in info.md).  
[9:50.9] Waarom sprint je dan niet gewoon aeroob?

> Beeld (uit de scènecommentaar, regel 3610): H6 Zuurstof — aan het eind van de keten neemt O₂ de elektronen op (laatste elektronenacceptor) en vormt met H⁺ water; oxidatieve fosforylering; NADH,H⁺ uit de glycolyse via een omweg; zonder O₂ loopt de keten vast en valt alles stil; 2 tegen ± 30 ATP per glucose; aerobe dissimilatie. Simulatie: EtcSim (sim2.js), tekening ETC2 (etc2.js) met een camera (inzoomen op het eind van de keten, uitzoomen naar het grondplasma).


## 7. H7 Sprinten of joggen

Audio: blob 013.mp3 (`audio/ch_7.mp3` in `window.__AUDIO`) · 9:54–11:48 (114,3 s volgens ffprobe; `dur` in FILM 114,218 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Sprinten of joggen"

**Take 7a** · 9:57.1–10:00.5 (hoofdstuk 3,00–6,45 s)

[9:57.0] Je spieren vullen hun ATP op drie manieren tegelijk aan.

> Vraag (10:01.1, stil segment van 11,5 s; bedenktijd 10,55–18,55 s, onthulling 19,59 s in het hoofdstuk): Waarom houd je sprinttempo geen hele ronde vol?  
> Opties: A. Je mitochondriën leveren te weinig ATP per seconde. · B. Je ATP raakt op. · C. Je spieren krijgen dan geen zuurstof.  
> Juist: A · verleidelijk (mis): C

**Take 7b** · 10:13.2–10:52.2 (hoofdstuk 19,15–58,14 s)

[10:13.2] Antwoord A.  
[10:14.4] Bij een sprint gebruik je per seconde veel  
[10:16.9] meer ATP dan je mitochondriën kunnen maken.  
[10:20.0] Hoeveel ATP je hooguit aeroob maakt,  
[10:22.5] hangt vooral af van je zuurstofaanvoer.  
[10:24.9] Je spieren krijgen dus wél zuurstof,  
[10:26.8] alleen te weinig voor zoveel ATP.  
[10:29.4] Het tekort komt vanaf de start uit CP en uit gisting.  
[10:33.9] Eerst levert CP het meest.  
[10:35.7] Na zo'n tien seconden is je CP  
[10:37.7] al voor meer dan de helft op.  
[10:39.5] Daarna komt het tekort vooral uit gisting.  
[10:41.7] Die levert per seconde minder ATP dan CP.  
[10:45.4] Dus zak je in tempo.  
[10:48.1] Ondertussen daalt de pH in je spieren,  
[10:50.0] en ook dat draagt bij aan vermoeidheid.

**Take 7c** · 10:53.1–11:05.9 (hoofdstuk 58,99–71,80 s)

[10:53.0] De glycolyse maakt dan meer pyrodruivenzuur  
[10:55.7] dan je mitochondriën verwerken.  
[10:57.6] Wat overblijft, wordt melkzuur:  
[10:59.4] gisting, terwijl er wél zuurstof is.  
[11:01.3] Een sprint is dus niet alleen anaeroob:  
[11:03.5] je mitochondriën werken vanaf de start mee.

**Take 7d** · 11:07.9–11:15.3 (hoofdstuk 73,85–81,27 s)

[11:07.9] Hoe langer een wedstrijd duurt,  
[11:09.3] hoe groter het aerobe deel.  
[11:11.2] Op de achthonderd meter komt nog  
[11:12.9] ongeveer een derde uit CP en gisting.

**Take 7e** · 11:17.4–11:33.1 (hoofdstuk 83,32–99,08 s)

[11:17.3] Bij joggen gebruik je per seconde veel minder ATP.  
[11:21.0] Je mitochondriën komen pas na  
[11:22.7] een paar minuten helemaal op gang.  
[11:24.6] In die tijd springen CP en gisting even bij.  
[11:27.8] Joggen is dus ook niet alleen aeroob.  
[11:31.1] Daarna kan bijna alles aeroob.

**Take 7f** · 11:34.0–11:46.5 (hoofdstuk 99,93–112,42 s)

[11:33.9] Er ontstaat nog wel wat melkzuur,  
[11:35.6] maar dat wordt grotendeels weer verbrand.  
[11:38.0] Dan levert elke glucose ongeveer vijftien  
[11:40.7] keer zoveel ATP op als bij gisting.  
[11:43.7] Daardoor gaat je voorraad glycogeen veel langer mee.

> Beeld (uit de scènecommentaar, regel 3874): H7 Sprinten of joggen — rekenmodel (models2.js): een vat ATP met drie kranen (CP, gisting, aerobe dissimilatie) en een afvoer (spierwerk). De gestapelde grafiek komt uit het model. Sprint: 60 s modeltijd; joggen: 5 min modeltijd. Meters (tempo, pH) volgen hetzelfde model. Inzetten links: te veel pyrodruivenzuur → melkzuur (gisting mét zuurstof), melkzuur wordt elders verbrand, 15 glucose tegen 1 glucose voor ± 30 ATP, glycogeen. Staven: Spencer & Gastin 2001.


## 8. H8 Terug naar de baan

Audio: blob 014.mp3 (`audio/ch_8.mp3` in `window.__AUDIO`) · 11:48–12:55 (67,7 s volgens ffprobe; `dur` in FILM 67,695 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Terug naar de baan"

**Take 8a** · 11:51.3–11:57.2 (hoofdstuk 3,00–8,96 s)

[11:51.2] Dus: waarom houd je een sprint maar kort vol,  
[11:53.6] en joggen wel een uur?  
[11:55.1] Zeg het eerst zelf, in één zin.

> Pauze (11:57.2, 5,0 s, stil): de kijker zegt het antwoord eerst zelf

**Take 8b** · 12:02.2–12:27.8 (hoofdstuk 13,96–39,47 s)

[12:02.2] Bij een sprint heb je per seconde meer ATP  
[12:04.8] nodig dan je mitochondriën kunnen maken.  
[12:07.6] Het tekort komt eerst vooral uit de fosfaataccu,  
[12:10.2] maar je CP raakt snel op.  
[12:12.2] Gisting levert per seconde minder, dus je zakt in tempo.  
[12:15.9] Bij joggen houden je mitochondriën  
[12:17.6] het na een paar minuten bij.  
[12:19.5] Elke glucose levert dan veel meer ATP op,  
[12:22.7] dus je glycogeen gaat lang mee.  
[12:24.9] Daarom kun je wel een uur joggen, en maar kort sprinten.

**Take 8c** · 12:29.8–12:48.2 (hoofdstuk 41,52–59,90 s)

[12:29.8] Anaeroob werken de fosfaataccu,  
[12:31.8] en de glycolyse met gisting:  
[12:33.6] die levert netto twee ATP per glucose.  
[12:37.1] Aeroob volgen acetyl-coA,  
[12:39.0] de citroenzuurcyclus en de elektronentransportketen.  
[12:42.1] Met O₂ als laatste elektronenacceptor levert  
[12:45.2] dat ongeveer dertig ATP per glucose op.

> Eindkaart (12:49.2, 6,0 s, stil)

> Beeld (uit de scènecommentaar, regel 4146): H8 Terug naar de baan — de vraag van het begin; eerst zelf formuleren (5 s pauze); sprint en joggen naast elkaar met de drie kranen uit H7 (zelfde rekenmodel, models2.js); overzichtsschema anaeroob/aeroob; eindkaart.


---
Controle: 9 hoofdstukken = 9 audiofragmenten. Som `dur` in FILM 776,0 s (12:55); som audio (ffprobe) 776,3 s (12:56). Het verschil (≈ 0,33 s) is mp3-opvulling aan het eind van elk bestand.
