# Frisse review — b1 · Signalen in de cel: van receptor tot respons (24 okt 2026)

Gelezen: script_v2.md, brief.md, sections.html, film.json, scenes_b1.js, teken_b1.js, words/ (woordtijden), qa/ + qa2/, 63 extra stills in `scratchpad/rev_b1/` en `rev_b1b/`. Vergeleken met films/hormonen/1-post-voor-iedereen (bron/script.md), dna/5-mutaties en dna/6-genen-aan-en-uit.

Samenvatting: de inhoud is sterk. Getallen kloppen met de bronnen: 10⁸ (Lodish 8e §15.5, voor de lever), 'perhaps thousands of cAMP' (Lodish §15.1), Ras ± 19 % (Prior 2020), IRIS 83,3 % na 10 jaar, Roskoski 2024 80/69, Radboud nf 100, bachelor 3 jaar. De uitleg van cAMP en kinase is correct. De afspraken over de kralenketting (eiwitten) en over ATP (base + suiker + drie P, de laatste springt eraf) zijn goed uitgevoerd. Alle MOET-punten gaan over beeld en vragen **geen nieuwe audio**.

## MOET

1. **MOET · titelkaart (s03 / `title`)** — De titeltekst "Signalen in de cel" loopt over het membraan met de receptor (de 'l' van 'cel' valt over de lipidekoppen, zie qa/s03_002.50). *Voorstel:* laat het membraan pas rechts van de tekst beginnen (bv. `membraan(..., 1250, 1750)`, receptor op x ≈ 1500). Alleen beeld.

2. **MOET · H2 s05, 35,7–50 s ('Zo zet het ene kinase het volgende aan … miljoenen glucosemoleculen')** — De cascade staat in beeld als 1 → 4 → 16 met twee keer het label **'× 4'**. De stem zegt 'elke stap zet veel moleculen aan … miljoenen', en het docentdeel noemt ± 10⁴ alleen al tot cAMP (± 10⁸ in totaal). Met ×4 per stap kom je nooit aan miljoenen, en een leerling neemt het getal over. *Voorstel:* haal de getallen weg of schrijf 'veel meer' / '× honderden', en maak de rijen duidelijk breder per stap. Bron: Lodish 8e §15.5. Alleen beeld.

3. **MOET · H2 s05, 38,1 s ('tot het laatste enzym glycogeen afbreekt tot glucose')** — In s05 staat geen glycogeen. Er verschijnen alleen rijen glucose-zeshoeken, uit het niets. Dit valt onder 'wat de stem noemt is getekend' en 'processen echt laten gebeuren'. *Voorstel:* zet onderaan de `glycogeenKeten` uit s01 neer, en laat het laatste enzym (glycogeenfosforylase, liefst een andere kleur kluwen dan de kinasen) er glucoseringen van afknippen. Alleen beeld.

4. **MOET · H2 s05, ± 29–35 s** — Het label 'ATP wordt ADP' (1220, 520) valt over/tegen het metalabel 'TWEEDE BOODSCHAPPER' van cAMP (zie rev_b1/s05_031.00). Het ATP-molecuul ligt bovendien tussen de cAMP-moleculen, waardoor het lijkt alsof die erbij horen. *Voorstel:* zet de ATP → ADP-stap met label rechts naast de kinase (bv. ATP op 1380, 600, label eronder), los van de cAMP-wolk. Alleen beeld.

5. **MOET · H3/H4 s09 (vanaf 7,6 s), s10, s12 (eerste deel)** — De gaten in het membraan voor de groeifactorreceptoren (`gaten: [300, 380]`) passen niet bij de plek van de receptoren (eerst 260/440, daarna 300/400). Er zit een open **gat in het celmembraan** tussen en naast de receptoren, en het stuk door het membraan is een losse kralendraad zonder lipiden eromheen (zie rev_b1b/s09_010.00 en s09_014.00). Het lijkt alsof de cel daar openstaat. *Voorstel:* een gat per receptor dat met de receptor meeschuift (gaten op x1 en x2), smal genoeg dat de lipiden tegen de helix aan sluiten. Alleen beeld.

6. **MOET · H3 s09, 35,4 s ('Na korte tijd zet Ras zichzelf weer uit')** — De tag 'Ras zet zichzelf weer uit' verschijnt, maar de schakelaar blijft op groen **'aan'** staan en de kinasen blijven aan (rev_b1/s09_036.50). Het beeld zegt het tegendeel van de zin. *Voorstel:* laat bij 'uit' de schakelaar omklappen naar 'uit' en de gloed van de drie kinasen wegzakken. Alleen beeld.

7. **MOET · H4 s13, 0–4 s ('Bij Opa Henk is het een ander eiwit.')** — Het beeld is ruim 4 s leeg, alleen het metalabel 'IN DE BLOEDCELLEN VAN OPA HENK' staat er (rev_b1/s13_000.10). Dit gaat tegen de regel 'beeld staat er op t = 0'. *Voorstel:* zet chromosoom 9 en 22 er meteen neer (de uitwisseling start bij 'uitgewisseld'), of begin met een klein portret van Opa Henk / het tabletje. Alleen beeld.

8. **MOET · H4 s13, 4–12 s (chromosomen en fusiegen)** — Drie fouten in de translocatie:
   (a) De kleuren zijn omgedraaid. Chromosoom 9 is teal en 22 koraal, maar in de fusiebalk is BCR blauw (`SB.bcr`) en ABL koraal (`SB.abl`). De kijker leest daardoor het blauwe deel als 'van 9', terwijl BCR op 22 ligt en ABL op 9.
   (b) Na de uitwisseling wordt chromosoom 22 in de tekening **langer** (180 → 210). Het Philadelphia-chromosoom is juist het **verkorte** chromosoom 22.
   (c) Chromosoom 22 is in werkelijkheid ruim twee keer zo klein als 9 (± 51 tegen ± 138 Mb). Getekend is dat ± 1,6×.
   *Voorstel:* geef de fusiebalk de kleuren van zijn herkomst (BCR = kleur van 22 links, ABL = kleur van 9 rechts). Laat 22 een groot stuk afgeven en een klein stuk krijgen, zodat het zichtbaar korter wordt, en pas de maten aan. Bron: NCI 'How Imatinib Transformed Leukemia Treatment'; Nowell & Hungerford / Rowley 1973 (t(9;22), der(22) = Ph). Alleen beeld.

## KAN

9. **KAN · cold open s01, ± 26–30 s** — 'Toch maakt één molecuul adrenaline **binnen in de cel** heel veel glucose vrij' kun je lezen als 'een adrenalinemolecuul dat binnen in de cel zit'. Dat is precies de misconceptie die q02 toetst. *Voorstel:* 'Toch maakt één molecuul adrenaline dat buiten blijft, binnen in de cel heel veel glucose vrij.' **Nieuwe audio** (s01).

10. **KAN · H4 s12, 11 s + tag in beeld** — 'zo'n vastzittend gaspedaal: een proto-oncogen'. In *Mutaties* is een proto-oncogen het gewone gen dat de deling aanzet; pas door een mutatie wordt het een vastzittend gaspedaal. De definitie schuift hier dus een beetje. *Voorstel:* beeldtag 'proto-oncogen met mutatie = vastzittend gaspedaal' (alleen beeld). Eventueel in de stem 'een proto-oncogen met een mutatie' (**nieuwe audio** s12).

11. **KAN · consistentie met Post voor iedereen (s15, regel [nieuw] van 15-10)** — Het PvI-script laat in de vwo-alinea nu al 'eerste boodschapper', 'G-eiwit' en 'tweede boodschapper: cAMP' horen. b1 brengt deze begrippen als nieuw (plan.json 'nieuw': 'PvI stopt bij de receptor') en noemt het G-eiwit niet. Na de heropname van PvI krijgt de leerling dus eerst het G-eiwit te horen en daarna een film waarin het 'weg' is. *Voorstel:* zet in het docentdeel bij Plaats/Vereenvoudigingen 'PvI noemt al G-eiwit en cAMP; deze film werkt dat uit'. Of zeg in s05 'De receptor zet via een G-eiwit een enzym aan' (**nieuwe audio** s05). Check ook of de PvI-heropname er al is: de gepubliceerde PvI-html bevat cAMP nog niet in de woordtijden.

12. **KAN · docentdeel, misconceptie 3 tegenover PvI** — PvI s15 zegt 'dat effect is ook snel weer voorbij, als het hormoon loslaat'. b1 corrigeert juist 'een signaal stopt vanzelf als het hormoon weg is'. Dat spreekt elkaar niet tegen, maar een docent kan het zo lezen. *Voorstel:* één zin in Vereenvoudigingen: 'PvI: snel voorbij als het hormoon loslaat; deze film laat zien waaróm: cAMP wordt steeds afgebroken en fosfaatgroepen worden eraf gehaald.' Alleen docentdeel.

13. **KAN · H1 s04, 23–33 s** — 'hun receptor zit in de cel … Samen werken ze in de kern'. Er staat geen receptor in het cytoplasma: het steroïd gaat alleen naar de kern, en pas daar staat een groene kluwen (rev_b1b/s04_026.00). *Voorstel:* een kleine receptor-kluwen in het cytoplasma die het steroïd bindt en samen met het steroïd de kern in gaat. Alleen beeld.

14. **KAN · H1 s04, vanaf 23 s** — Het label 'steroïdhormoon' (links uitgelijnd op x = 1560) loopt over de rechterrand van het paneel. *Voorstel:* centreer het label boven het hormoon, binnen het paneel. Alleen beeld.

15. **KAN · H2 s05, 35,7 s** — De drie rijen in de cascade zijn allemaal dezelfde kinase-kluwen. Het docentdeel zegt terecht dat de laatste stap glycogeenfosforylase is, dus geen kinase. Combineer dit met punt 3: de laatste rij een andere kleur met het label 'enzym dat glycogeen afbreekt'. Alleen beeld.

16. **KAN · H2 s08, 0–12 s** — 'Een enzym breekt cAMP voortdurend af' / 'andere enzymen halen de fosfaatgroepen … af'. Het cAMP vervaagt tot niets (de regel 'moleculen niet als stipjes laten verdwijnen'), en de 'andere enzymen' (fosfatasen) zijn niet getekend: de P's zweven gewoon weg. *Voorstel:* cAMP gaat open tot een rechte AMP-vorm die wegdrijft; een tweede kleine kluwen (fosfatase) loopt langs de eiwitten en haalt de P eraf. Alleen beeld.

17. **KAN · H3 s09, 25,8 s ('Het laatste kinase gaat de kern in')** — Het derde kinase blijft staan. Er komt alleen een pijl, en in de kern verschijnt een groene kluwen (de transcriptiefactor). De zin zie je dus niet gebeuren. *Voorstel:* laat het derde kinase (met P) door een kernporie naar binnen schuiven en de transcriptiefactor aanzetten. Alleen beeld.

18. **KAN · H3 s09, 31,6–35 s ('de cel deelt')** — De delende cel staat als inzetje in een kader óver de kern van dezelfde cel. Dat leest als 'in de kern deelt iets'. *Voorstel:* zoom uit naar een hele cel die deelt, of zet het kader los naast de route met een kopje 'de cel deelt'. Alleen beeld.

19. **KAN · H4 s13, 20–31 s** — Het tabletje staat (schaal 2,4) even groot naast het kinase-molecuul, en dat suggereert dat ze ongeveer even groot zijn. *Voorstel:* het tabletje klein in een hoek met een vergrootglas- of 'zoom'-overgang naar het molecuul, of het tabletje weglaten zodra de remmer in beeld is. Alleen beeld.

20. **KAN · H4 s13, 34–41 s (overlevingsbalken)** — De twee balken vergelijken 'na vijf jaar' met 'na tien jaar', en dat is geen eerlijke vergelijking (de tekst staat er klein bij). *Voorstel:* zet de tijd in de labels groter, of voeg bij 'met het tabletje' ook de 5-jaarswaarde toe (IRIS ± 89 % na 5 jaar; Druker 2006 NEJM). Alleen beeld. De getallen zelf kloppen: Hochhaus 2017 NEJM 83,3 %; interferon/hydroxyurea-tijdperk mediaan ± 5 jaar.

21. **KAN · film.json `lead`** — 'een tabletje dat precies één kinase remt' is te stellig: imatinib remt ook KIT en PDGFR. *Voorstel:* 'dat vooral één kinase remt' of 'dat het kapotte kinase remt'. Alleen tekst op de pagina.

22. **KAN · vraag q07** — Het woord 'fosfaatgroepen' staat alleen in het goede antwoord (c). *Voorstel:* zet in optie a een vakterm, bv. 'de kinasen raken hun fosfaatgroepen vanzelf kwijt…', of in b 'het cAMP blijft aan de kinase vastzitten, tot…'. Houd de lengte gelijk. Geen audio (de opties worden niet ingesproken; het juiste antwoord blijft c).

23. **KAN · docentdeel, Getallen** — Zet bij 10⁸ 'in de lever (in spier hooguit ± 240×, Lodish §15.5)', zodat het getal niet als algemeen geldend wordt overgenomen. Alleen docentdeel.

24. **KAN · werkbestanden** — `uitspraak.md` zegt 'audio nog niet gedownload, alles op de wachtlijst', en `bouw_b1.sh` zegt 's08 is nog niet ingesproken'. Allebei kloppen niet meer (audio/ en words/s08 bestaan). De uitspraak van cAMP, ATP, Ras en myeloïde is dus nog niet beluisterd. *Voorstel:* luistercheck doen en de notities bijwerken. Geen audio, tenzij de check iets vindt.

## Gecontroleerd en in orde
- Versterking: Lodish 8e §15.5: '10⁸ amplification of the epinephrine signal' (lever, glycogenolyse → glucose). 'Miljoenen' is voorzichtig maar correct. 'Duizenden cAMP per receptor': Lodish §15.1 'perhaps thousands of cAMP molecules'.
- cAMP/kinase-uitleg: ATP → cAMP door een enzym aan de binnenkant van het membraan; kinase zet de laatste fosfaatgroep van ATP op een eiwit (ATP → ADP, getekend volgens BEELDAFSPRAKEN); uitzetten door afbraak van cAMP en het verwijderen van fosfaat. Allemaal correct.
- Ras ± 1 op 5: Prior, Hood & Hartley 2020 Cancer Res 80:2969 (19 % van de patiënten). Telpoppetjes 4/20 kloppen.
- CML: t(9;22), BCR-ABL, kinase die altijd aan staat, imatinib in de ATP-pocket (Schindler 2000). Correct. Toon licht en hoopvol, passend.
- Opleiding: bachelor BMW 3 jaar wo (Radboud, Leiden), Radboud nf 100 (studiekeuze123), master 2 jaar. Correct.
- Kralenketting: receptor7, RTK, kinasen, Ras en enzym zijn allemaal kralenketting/kluwen, geen bolletjes. ATP en cAMP hebben een eigen herkenbare structuur.
- Cast: Opa Henk (patiënt), Noor (kleindochter), Dr. Kim (onderzoeker, labjas) volgens ROLLEN.md; geen grijze poppetjes. Metalabels zonder eenheden. Antwoordtags in de vorm 'antwoord x: inhoud'. Juiste antwoorden b / c / a, opties ongeveer even lang.
