# Eindreview "Brein en computer" (frisse blik)

Ik heb alle 57 stills bekeken, de perceptron-simulatie zelf nagerekend (P_START, P_DATA, leerregel en drempel uit scenes_n2.js) en film.py en sections.html gelezen.

## MOET

1. **s04 ±20 s: de balk in het cellichaam laat het neuron vuren met de getallen van de vraag.** De ingangen +2, +2, +1, −3 tellen op tot 2, maar `neuronSom` krijgt `som: 6` en `drempel: 4`. De balk wordt dus helemaal goud en het pulsje loopt over het axon. Dat spreekt de tekst tegen en suggereert vlak vóór q06 het foute antwoord a. Fix: gebruik in s04 andere getallen (bijv. +2, +2, +1, −1, som 4) of laat de som echt uitkomen op 2, onder de drempel. De rekenvraag hoort pas in s05 te komen.

2. **s05 ±12–22 s: het uitkomstbolletje verraadt het antwoord, en is eerst ook fout.** Bij "dan is de uitkomst één" staat er een **1** naast de ingangen +2, +2, +1, −3, en dat is fout. Bij "Eronder is de uitkomst nul" staat er **0**, en dat is precies het antwoord op q06, vóór de vraag. Fix: laat in deze zinnen een losse som zien (bijv. "som 4 ≥ 3 → 1" en "som 1 < 3 → 0") en voeg de vraaggetallen pas toe bij "Probeer het zelf".

3. **s08/s10/q09: "zwarte hokjes" maar in beeld zijn de actieve hokjes wit.** Script, vraag q09 (optie b) en uitleg zeggen "zwart hokje stuurt een signaal". Op het scherm zijn de aan-hokjes juist lichtgrijs/wit op een donkere achtergrond. Fix: zet in de tekst "witte hokjes" (of "gekleurde hokjes"), of kleur de aan-hokjes donker op een lichte rooster-achtergrond.

4. **s10 ±10–16 s: de training laat geen leren zien.** Met P_START en P_DATA maakt het netwerk precies **één** fout, bij plaatje 2, en daarna nooit meer. De foutengrafiek gaat dus van 1 naar 0. Dat past niet bij "na tientallen plaatjes maakt het netwerk bijna geen fouten meer". Fix: kies andere startgewichten. Een zoekrun gaf bijv. `[-0.25,0.45,0.25,-0.1,-0.35,-0.25,0.15,0.4,-0.15]`: fouten bij plaatje 1, 2, 15 en 28, plaatje 2 blijft "kruis bij een rondje", en daarna nul fouten.

5. **s10 ±23 s: "nooit gezien" klopt niet.** KRUIS2 (`101010100`) zit in de trainingsset, als plaatje 17 en 25. Fix: test met een patroon dat er niet in zit, bijv. `101010110` (kruis waarvan het laatste hokje één plek is verschoven). Met de nieuwe startgewichten uit punt 4 wordt dat ook "kruis".

6. **s10 ±15 s: een "rondje" dat eruitziet als een plus.** Door de ruis (één hokje omgeklapt) krijg je plaatjes als `010111010`, een duidelijk +-teken, met het label "rondje". Een leerling ziet daar een kruis. Fix: laat de ruis het middelste hokje niet omklappen bij een rondje, of klap alleen hoekhokjes om.

7. **s16: de muis loopt door de muren, en het doolhof is niet op te lossen.** Het pad (`pad` in `doolhof`) gaat door alle drie de verticale muren. Bovendien sluiten de muur op x=0,5 (y 0,2–0,7) en de muur op 0,5–0,75 bij y=0,2 het linkerdeel af van de kaas. Fix: verkort de muur op x=0,5 tot y 0,2–0,55 en leg het pad door de openingen (onderlangs bij de muur op 0,25, onderlangs bij die op 0,5 en onderlangs bij die op 0,75).

8. **s04 alle stills: het axon-uiteinde lijkt een pijl die naar het cellichaam wijst.** De vertakking aan het eind is getekend als "<". Kijkers lezen dat als een signaal dat terug naar het cellichaam loopt. Fix: teken eindknopjes (kleine bolletjes) aan 2–3 korte takjes.

9. **Checkvraag 1 versus begrippen en eindkaart.** Het antwoord rekent "som = drempel → vuurt". De begrippenlijst ("drempel: waarde *waarboven* …"), de eindkaart en s04 ("komt de som *boven* een drempel") zeggen alleen "boven". Een leerling die de begrippen volgt, antwoordt "nee" en krijgt dan geen punt. Fix: verander de getallen (bijv. +3, +1, −1 bij drempel 2: som 3) of zet overal "op of boven de drempel". Het tweede deel ("valt −2 weg") klopt wel.

10. **s20 ±17 s / recap: "verwerkt fouten op een andere manier" is te stellig.** In s15 heet het nog "of je hersenen iets vergelijkbaars doen, weet nog niemand". Fix: zeg in de recap "en het rekent fouten precies terug; of je hersenen dat doen, weet niemand". Op de kaart: "fout precies terugrekenen".

11. **s04: het label "synapsen / duizenden per neuron" staat ver linksonder, los van de synapsen** (de stipjes bij het cellichaam). Dat gaat tegen de beeldafspraak dat een naam direct bij het onderdeel staat. Fix: zet het label naast de stipjes, bijv. links van het cellichaam ter hoogte van de +2.

## KAN

12. s04: in de ingangsbolletjes lopen de dendrieten door de cijfers (+1, −3). Laat de lijn stoppen aan de rand van het bolletje.
13. s08 ±26 s: dunne verbindingslijntjes lopen over de witte hokjes heen. Laat ze vanaf de rand van het rooster beginnen.
14. q13 optie b "honderden": de film zegt ±1000 per soort. Maak het "honderden tot duizenden", zodat het antwoord niet lager uitkomt dan de uitleg.
15. s12 ±7 s: het label "netwerk / leert vanaf nul" staat al in beeld vóór het netwerk zelf. Laat het label tegelijk met het netwerk komen.
16. s16 ±26 s: "ONDERZOEKER" raakt de jas van Dr. Kim. Schuif het label ±30 px naar links.
17. s17/s19: er staat geen beker bij de robotarm, terwijl het over koffie drinken gaat (de look-regel noemt wel "robotarm met beker"). Voeg een beker toe in de grijper.
18. s15 ±9 s: de kaart "groot AI-model trainen" is bij de zin nog bijna onzichtbaar. Laat hem eerder infaden en vul de regel aan tot "honderdduizenden keren zoveel stroom".
19. s20 ±5 s: bij "het gebruikt…" staat alleen de telefoon in beeld. Laat de kaart "gebruikt" iets eerder komen.
20. s21 ±17 s: de pijl naar de master komt alleen uit "natuurkunde". Laat hem uit een accolade onder alle vijf studies komen.
21. Begrippen: "foutterugrekening" en "brein-computerinterface" worden in de film nooit zo genoemd. Laat de stem ze één keer noemen, of laat ze in de lijst aansluiten bij de woorden uit de film ("fout terugsturen", "chip die een robotarm stuurt").
22. Docentdeel, lessuggestie "drie rondes met de getallen uit de film": de gewichten staan nergens in beeld. Zet de startgewichten in het docentdeel.
23. s07 ±22 s: in de ondertitel staat "goed." alleen op de tweede regel. Breek de zin eerder af.

Gecontroleerd en in orde: rekenvraag (2+2+1−3 = 2 < 3), leerregel en drempel zoals in de code, McCulloch & Pitts 1943, Rosenblatt 1958, ImageNet (±1000 per soort, ±1,2 mln), 20 W, honderdduizenden keren (±16.000 × 700 W), Neuropixels 30 kHz, BrainGate 2011 (96 elektroden, beroerte in 1996), de antwoorden op q02/q06/q09/q13/q18 en de checkvragen 2–4.
