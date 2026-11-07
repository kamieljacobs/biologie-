# Review script_v1 — Brein en computer (20 okt 2026)

## Pass 1 — Vakexpert (computationele neurowetenschap en ML)

1. **MOET** H4, "In het jaar 2012 dronk een verlamde vrouw ...": het drinken gebeurde op 12 april 2011. In 2012 is het artikel verschenen (Hochberg e.a., *Nature*, 16 mei 2012). Nieuw: "In het jaar 2011 dronk een verlamde vrouw zo zelf koffie. Dat had ze bijna vijftien jaar niet gekund." "Bijna vijftien jaar" klopt: in het artikel staat "14 years and 11 months after her stroke". Bronnen: https://www.npr.org/transcripts/153015273 , https://ecor.mgh.harvard.edu/content/files/SAC/HochbergNature2012_11076.pdf
2. **MOET** H4, "een chipje dat ongeveer honderd cellen meet": het chipje heeft 96 elektroden. Het aantal cellen dat het meet is niet gelijk aan het aantal elektroden. In de decoders zaten 13 tot 50 kanalen. Nieuw: "zit een chipje met bijna honderd meetpuntjes. Die meten tientallen cellen tegelijk." Bron: Hochberg 2012 (pdf hierboven), https://historyofinformation.com/detail.php?id=3198
3. **MOET** H3, "duizenden keren zoveel": dit is honderden keren te laag. Llama 3 405B is getraind op ongeveer 16.000 H100-chips van elk 700 W. Dat is ongeveer 11 MW voor de chips alleen, ongeveer 500.000 keer 20 W. Nieuw: "Een groot AI-model wordt getraind op duizenden computerchips tegelijk. Samen gebruiken die honderdduizenden keren zoveel stroom." Bronnen: https://mlops.substack.com/p/scaling-and-reliability-challenges , https://www.thefpsreview.com/2022/03/22/nvidia-announces-hopper-architecture-and-h100-gpu-tsmc-n4-process-hbm3-memory-pcie-gen5-and-700-watt-tdp-sxm/
4. **MOET** H3, "minder dan een gewone lamp": een gewone ledlamp gebruikt 5 tot 10 W, dus minder dan je hersenen. De 20 W zelf klopt (https://hypertextbook.com/facts/2001/JacquelineLing.shtml). Nieuw: "ongeveer twintig watt, minder dan een laptop".
5. **MOET** H1, McCulloch en Pitts: in het model van 1943 telt elk prikkelend signaal even zwaar mee (+1). Eén actief remmend signaal blokkeert alles (absoluut veto). Gewichten als +2 en –3 kwamen pas later. Nieuw: "In het jaar 1943 maakten Warren McCulloch en Walter Pitts hier een rekensom van: optellen, vergelijken met een drempel, een één of een nul. Latere versies gaven elk signaal een gewicht: plus voor prikkelend, min voor remmend." Bron: https://bnaskrecki.faculty.wmi.amu.edu.pl/nnets/_build/html/part1_origins/ch01_mcculloch_pitts.html , https://papers.baulab.info/papers/McCullochPitts-1943.pdf
6. **MOET** H2, "In het jaar 1958 bouwde Frank Rosenblatt": in 1957–1958 was het een simulatie op een IBM 704, met in 1958 het artikel in *Psychological Review*. De machine (Mark I) werd in 1959 gebouwd. Nieuw: "In het jaar 1958 beschreef Frank Rosenblatt een netwerk dat dat zelf deed". Bron: https://en.wikipedia.org/wiki/Perceptron
7. **MOET** H2, leerregel, "Bij de volgende fout de andere kant op": de richting hangt af van het soort fout. De ene fout na de andere betekent niet om en om. Ook veranderen alleen de verbindingen van de hokjes die aan stonden (Δw = α(d−y)·x). Nieuw: "Zegt het kruis bij een rondje, dan worden de verbindingen van de zwarte hokjes iets zwakker. Zegt het rondje bij een kruis, dan worden ze iets sterker." Bron: https://en.wikipedia.org/wiki/Perceptron
8. **MOET** H3, de vraag kind tegen netwerk is niet eerlijk. Een kind begint niet bij nul: het heeft jaren rondgekeken, en het brein heeft een aangeboren bouw. Een voorgetraind netwerk leert een nieuw dier ook uit een paar voorbeelden. Laat "vanaf nul" in de vraag staan en voeg toe aan de uitleg: "Eerlijk is eerlijk: een kind begint niet bij nul. Het heeft al jaren rondgekeken. Een netwerk dat al veel geleerd heeft, leert een nieuw dier ook sneller." Maak ook het getal per dier eerlijk: ImageNet heeft ongeveer 1,2 miljoen foto's voor 1000 soorten dingen, dus ongeveer 1000 per soort. Nieuw: "Een bekend netwerk voor plaatjes leerde duizend soorten dingen van ruim een miljoen foto's met een label: zo'n duizend foto's per soort." Bron: https://viso.ai/deep-learning/imagenet/
9. **KAN** H3, "de laatste op hele katten": de lagen worden geleerd en niet ingebouwd. Hogere lagen reageren op onderdelen en grotere vormen. Nieuw: "De eerste lagen reageren op randjes, de volgende op vormen en onderdelen, zoals oren. Niemand heeft dat ingeprogrammeerd: het ontstaat tijdens het leren." De inspiratie door Hubel en Wiesel klopt, via de neocognitron van Fukushima (1980): https://arxiv.org/pdf/2001.07092
10. **KAN** H3, "in de hersenschors" → "in de visuele schors". Klopt verder.
11. **KAN** H4, "duizenden keren per seconde": Neuropixels meet 30.000 keer per seconde. Het kan dus precieser: "dertigduizend keer per seconde". De naald heeft 960 meetpunten, waarvan er 384 tegelijk meten, en meet honderden neuronen. "Honderden" klopt dus. Bronnen: https://www.neuropixels.org/probe1-0 , https://discovery-pp.ucl.ac.uk/10042638/7/Neuropixels_Nature_Accepted_Version_2017-09-25.pdf
12. **KAN** H4, "met gewichten, net als in hoofdstuk twee": BrainGate gebruikte een Kalmanfilter. Dat is lineair, met gewichten, maar het wordt niet getraind met de foutregel van het perceptron. Nieuw: "met gewichten, net als in een kunstmatig netwerk".
13. Klopt: duizenden synapsen per neuron (in de schors ongeveer 7000; https://bionumbers.hms.harvard.edu/bionumber.aspx?id=112055), alles of niets, en backpropagation. Dat de hersenen iets vergelijkbaars doen, is nog onbewezen (Lillicrap e.a. 2020, https://www.Gwern.net/doc/ai/nn/2020-lillicrap.pdf). Ook "bijna vijftien jaar" klopt, en "vanaf de nek verlamd" (tetraplegie na een herseninfarct in de hersenstam).
14. **KAN** Cold open, "Niemand heeft die foto's ooit gelabeld" botst met "gelabelde foto's" in H3. Nieuw: "Daan heeft die foto's nooit een naam gegeven."

## Pass 2 — Didactiek

1. **MOET** Vraag 2: optie (b) verklapt de som ("de som is twee"), dus de rekenvraag rekent niet meer. Nieuw: (a) ja: er komen meer prikkelende dan remmende signalen binnen · (b) ja: de som is vijf · (c) nee: de som blijft onder de drempel · (d) half: het geeft een kleiner pulsje. De som zelf klopt: 2+2+1−3 = 2 < 3.
2. **MOET** H2: "verbindingen die naar kruis wezen" is niet uitgelegd. Zeg vóór de vraag hoe de uitgang werkt: "De uitgang telt op. Boven de drempel zegt hij kruis, eronder rondje." Optie (b) wordt dan: "de verbindingen van de zwarte hokjes worden een beetje zwakker".
3. **KAN** H1, "Erboven … Eronder": zeg ook wat er op de drempel gebeurt (bij McCulloch en Pitts: ≥). "Komt de som op de drempel of erboven: een één."
4. **KAN** H3 telt vier verschillen (voorbeelden, energie, fout, pulsjes), maar het "derde verschil" wordt gevolgd door nog een vierde. Recap en leerdoel 4 zeggen "drie". Noem het pulsje "Een vierde verschil" of laat het weg. Recap: "veel meer voorbeelden en energie nodig" → "vanaf nul veel meer voorbeelden".
5. **KAN** Cold open: optie (b) is veel langer en genuanceerder dan de andere twee, en verraadt zo het antwoord. Maak de opties even lang: (a) ja: het is een nagebouwd brein · (b) deels: het leende ideeën, maar leert anders · (c) nee: het heeft niets met hersenen te maken.
6. **KAN** H2, "het herkent ook een kruis dat het nog nooit zag": bij 9 hokjes zijn er maar weinig kruisen. Toon een kruis met één verschoven hokje, en zeg dat.
7. **KAN** H4, "Dokter Kim": in het Nederlands is "dokter" een arts. Nieuw: "Onderzoeker Kim".
8. **KAN** Recap, studies: noem ook de master Cognitive Neuroscience en de bachelors biomedische wetenschappen en informatica.

## Pass 3 — Taal

1. **MOET** "Erboven: een één. Eronder: een nul." "Een één" leest de stem als "een een". Nieuw: "Erboven is de uitkomst één. Eronder is de uitkomst nul."
2. **KAN** "Twee plus twee plus één is vijf. Min drie is twee." → "Vijf min drie is twee."
3. **KAN** "Het leende een paar ideeën" (een programma leent niet) → "De makers leenden een paar ideeën van de hersenen". Ook in de recap: "Het leende …" → "Het gebruikt …".
4. **KAN** De zin in H3 met 20 woorden splitsen: "De computer rekent precies uit hoeveel elk gewicht aan de fout bijdroeg. Dat gaat terug door alle lagen."
5. **KAN** "Neurowetenschappers gebruiken allebei de kanten." → "Neurowetenschappers werken aan beide kanten."
6. **KAN** "De meeste kunstmatige netwerken geven alleen getallen door." → "De meeste netwerken geven gewoon getallen door, zonder precieze timing."
7. **KAN** H4, de zin met de muis en de bocht splitsen: "Het programma zoekt welke cel wanneer vuurt. En welke cellen samen actief zijn als de muis een bocht neemt."

## Pass 4 — Uitspraak (eleven_v4)

nl.wiktionary was niet bereikbaar (toestemming verlopen). De IPA hieronder komt uit bekende woordenboekgegevens, zonder link: markeer alles als wachtlijst.

1. **MOET** "AI-model" (H3): risico op Engels "ee-ai". Stem-invoer: "aa-ie-model". "AI" zelf staat alleen in de koppen, niet in de gesproken tekst.
2. **KAN** McCulloch: Engels /məˈkʌlək/ (klemtoon op "kul"). Eerst schrijven zoals het er staat. Als de stem er een Nederlandse g van maakt ("mak-kul-log"), dan "Mek-kullek". Op de wachtlijst.
3. Pitts, Warren, Walter, Frank: zoals geschreven.
4. **KAN** Rosenblatt: /ˈroʊzənblæt/. Een Nederlandse lezing "Roozenblat" is acceptabel; zoals geschreven.
5. **KAN** perceptron: geen woordenboekbron, twijfelachtig. In het Nederlands per-sep-TRON of PER-sep-tron, maar nooit met een k-klank. Zoals geschreven; op de wachtlijst.
6. neuraal: /nøːˈraːl/, neu-RAAL. Zoals geschreven.
7. **KAN** Hubel: Engels /ˈhjuːbəl/. Het risico is een Nederlandse u ("Huubel"). Als dat gebeurt: "Hjoebel". Wiesel: /ˈviːzəl/ of Engels "WIE-zel". Een Nederlandse lezing "Wiezel" is prima; zoals geschreven.
8. synapsen (si-NAP-sen), axon (AK-son), neuron (NEU-ron), watt, pulsje: zoals geschreven.
9. "Python" en "dendrieten" komen niet in de gesproken tekst voor.
10. Jaartallen: "in het jaar 1943/1958/2011" staat al goed volgens de uitspraaklijst.
