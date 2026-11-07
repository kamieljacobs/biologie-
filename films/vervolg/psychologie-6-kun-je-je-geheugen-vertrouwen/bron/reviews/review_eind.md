# Eindreview — Kun je je geheugen vertrouwen? (20 okt 2026)

Bekeken: script_v2.md, film.py (vragen, uitleg, begrippen), sections.html, 41 stills in qa/ plus extra momenten (s01:1–7, s04:4, s05:3, s08:2, s09:5/40, s11:2, s14:46/50, s15:10/13).

## MOET

1. **Logische fout in H3: dubbelblind en 'dat is onze verdachte' gaan niet samen.** De checklist zet een vinkje bij 'agent weet niet wie de verdachte is' (s09 ±40 s), maar dezelfde agent zegt daarna 'goed zo, dat is onze verdachte!'. Een agent die het niet weet, kan dat niet zeggen. Een oplettende 16-jarige ziet dit, en het ondergraaft precies de regel die je uitlegt.
   *Fix:* de bubbel en de stem worden 'Goed zo, dat dachten we al.' en de opmerking komt van de rechercheur die daarna binnenkomt: "Maar na het aanwijzen kwam de rechercheur binnen en zei: goed zo, dat dachten we al." Of maak er twee fouten van: kruisje bij 'agent weet niet wie de verdachte is' én bij 'na het aanwijzen niets zeggen'. Dan moet de stem ook zeggen "Bij Noor gingen twee dingen mis". Pas de recap (s15) en de rode draad in sections.html daarop aan.

2. **Cold open: de dief ontbreekt.** Bij "Noor ziet een jongen een fiets stelen" rijdt alleen een lege fiets met snelheidsstreepjes weg (s01 1–3 s). Het schema in het script noemde een kleine donkere figuur met capuchon. De openingsgebeurtenis is nu niet te zien.
   *Fix:* zet een klein, donker silhouet met capuchon op de wegrijdende fiets. Geen gezicht, net als de achterkant van de foto's: het gaat om een onherkenbare dader en niet om een personage, dus dat past bij de bewuste keuze. Leg die uitzondering vast in bron/info.md.

3. **Noor staat op de tafel** (s01 7–16 s). Haar voeten staan op de hoogte van het tafelblad (persoon y=700, tafel(ctx,700)) en haar hele lijf staat erboven. Het lijkt of ze op de tafel staat.
   *Fix:* zet Noor op de vloer (y≈900) vóór of naast de tafel, of maak de tafel lager dan haar heup.

4. **De staafjes bij 'gebroken glas' liegen over de schaal** (s07). hBalk krijgt v*2.2: de balk '≈ 1 op 3' is ±70 % gevuld, '1 op 7' ±30 %. Een leerling leest dan "70 % zei ja".
   *Fix:* frac = v. De volle balk is dan 100 %. Of zet een as 0–50 % onder de balken.

5. **Label achter Noors hoofd** (s12 ±7.5 s). 'VERHOOR · OPNAME' in de monitor wordt half bedekt door Noors haar.
   *Fix:* zet de persoon in monitor() lager (y + h*1.05) of kleiner (h*1.7), of zet het label onderin het scherm.

6. **Stempel over tekst in de recap** (s15 ±13 s). 'MINDER WAARD' valt over het label '100%' van de onderste meter.
   *Fix:* stempel naar (1500, 840) of onder de balk. Of zet het percentage links van de stempel.

7. **Dr. Kim ziet eruit als arts** (labjas + stethoscoop; in de cast is ze 'arts en onderzoeker'). De stem zegt ook "Dokter Kim". Een rechtspsycholoog is geen arts, en dat is precies het beroepsbeeld dat de film neerzet. Het botst ook met het kader rechtspsycholoog/forensisch psycholoog.
   *Fix:* stem: "Kim, rechtspsycholoog, bekijkt..." (geen 'dokter'). In beeld: vraag Kamiel of Kim een tweede outfit in het castboek mag krijgen (colbert, geen stethoscoop) of dat er een vaste psycholoog bij komt. Een losse overschrijving in deze film is volgens BEELDAFSPRAKEN een 'half-aangepaste variant' en mag niet.

8. **Lang leeg beeld aan het begin van H2** (s05 0–±12 s). Bij "In het jaar 1974 ... Proefpersonen keken naar filmpjes van auto's die botsten" staat alleen 'LOFTUS & PALMER · 1974' in beeld (s05_003, s05_008.90). Het filmscherm verschijnt pas later.
   *Fix:* laat scherm() met de botsende auto's op 'onderzoek' of 'Proefpersonen' verschijnen, en zet twee naamkaartjes 'Elizabeth Loftus' / 'John Palmer' in beeld bij de eerste zin.

## KAN

9. **Openingsvraag scherper beantwoorden.** De recap zegt "eerste zekerheid zegt veel, als het eerlijk ging", maar zegt nooit wat dat voor Noor betekent. Een leerling blijft zitten met de vraag: heeft ze nou gelijk of niet?
   *Fix:* "Haar eerste 'ik weet het zeker' is een goed teken: ze heeft waarschijnlijk gelijk. Maar zeker weten doe je het niet. En alles wat ze ná 'goed zo' zegt, is minder waard."
10. **Recapmeter '90%' is onduidelijk en heeft geen bron.** Het is niet duidelijk of 90 % Noors zekerheid is of de kans dat ze gelijk heeft. Noor zei zelf "ik weet het zeker".
    *Fix:* laat het getal weg, of noem de meter 'zekerheid' (geen percentage). Het groene label 'eerlijk' ook weg, als je punt 1 met twee fouten oplost.
11. **Vraagkaart q10 mist het voorbehoud.** De stem zegt "Stel dat een confrontatie eerlijk was", de kaart niet. Zonder dat voorbehoud wordt (c) verdedigbaar.
    *Fix:* q10.q = "Stel dat de confrontatie eerlijk was. Wanneer is de zekerheid het beste teken dat ze gelijk heeft?"
12. **Lost in the mall: label te stellig.** Op het scherm staat '≈ 1 op 4 herinnert het zich'. De stem zegt "iets van, of zelfs veel", en vaak waren het stukjes.
    *Fix:* '≈ 1 op 4: (deels) herinnerd'.
13. **Het woord 'dubbelblind'** staat in de begrippen, maar wordt niet uitgesproken.
    *Fix:* "De agent die de foto's laat zien, weet zelf niet wie de verdachte is. Dat heet dubbelblind." Of haal het weg uit de begrippen.
14. **Fietsenrek is een warboel van overlappende wielen** (s01). Er staan vijf fietsen op 96 px afstand, met wielen die door elkaar lopen.
    *Fix:* drie fietsen met meer ruimte ertussen, of fietsen schuin gezet.
15. **Foto 4 in de rij is slecht leesbaar** (donker cijfer op een donkere, gemarkeerde kaart; s01, s11_029). In s11 schuift kaart 4 bij 'KEER 2' ook half over 3 en 5.
    *Fix:* gemarkeerde kaart met een goudrand en een licht vlak, en dezelfde maat en plek als de rest.
16. **s04 ±10 s: bij "een filmpje dat ergens is opgeslagen"** staat alleen 'hoe werkt je geheugen?' in beeld. De doorgestreepte filmrol uit het schema komt pas later of is niet te zien.
    *Fix:* laat de filmrol al op 'denken' verschijnen.
17. **'goed zo'-bubbels zonder spreker** (s09, s11, s15). Er is geen agent in beeld, dus de bubbel zweeft. Dat mag, want de cast heeft geen agent, maar geef de bubbel dan een staartje naar de rand van het beeld en zet er 'agent:' voor.

## Wetenschap: verder in orde
De getallen (Loftus & Palmer 16/50, 7/50, 6/50; ±66 vs ±55 km/u in sections; Loftus & Pickrell 6/24; Innocence Project ±69 %), de voorzichtige formulering van reconsolidatie, de twee verklaringen bij Loftus & Palmer, de regels van Wells e.a. 2020, het studioverhoor onder 12 jaar en het onderscheid met de forensisch psycholoog kloppen allemaal. Antwoorden en uitleg van de vier vragen sluiten aan op de stem.
