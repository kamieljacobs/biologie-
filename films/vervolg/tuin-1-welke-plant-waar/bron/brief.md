# Filmbrief — Welke plant waar? Determineren, vermeerderen en standplaats

| Veld | |
|---|---|
| TOPIC | het vak van de hovenier en kweker: een plant herkennen met een determineersleutel (steeds een keuze tussen twee tegengestelde kenmerken), hem vermeerderen (zaaien = geslachtelijk, nakomelingen verschillen; stekken en scheuren = ongeslachtelijk, klonen; auxine laat een stek wortelen) en hem op de juiste plek zetten (zuurgraad, licht, vocht; bij een hoge pH zit ijzer vast in de grond en wordt het jonge blad geel tussen de nerven), samengebracht in een beplantingsplan |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Tuin- en landschapsinrichting, film 1; mbo · hbo · wo) |
| NIVEAU | havo en vwo, één versie, havo-taal; geen rekenstuk |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak (± 850–1000 woorden) |
| USE | beide; ook extra film bij havo 4 § 2.1, Nectar 20.1 en 20.5 (dekkingsgaten) |
| SERIES | `werk/REEKSBRIEF-voorstel.md` (er is nog geen `REEKS-tuin.md`) |
| CENTRAL PUZZLE | Waarom gaat een rododendron dood in een kalkrijke tuin? (startvraag uit vervolg.html, door Kamiel gehouden) |
| DAILY-LIFE HOOK | De rododendron van Opa Henk krijgt geel blad. Hovenier Jeroen (voorstel) komt kijken, met stagiair Lotte (16). |
| LEAVE OUT | hoe auxine strekking en buigen regelt (*Hoe een plant groeit*), mitose en waarom klonen gelijk zijn op chromosoomniveau (*Celdeling*; één zin terug), lading van klei en uitspoeling (*Wat zit er in de bodem?*), tolerantiegebied en optimumkromme uitgebreid (*Waar past een soort?*; één zin terug, het woord 'beperkende factor' mag), opname door wortelharen (*Transport in planten*), inheems/uitheems en bijen (film 2b), weefselkweek en enten (alleen eventueel één zin), echte merknamen van tuincentra of producten |
| VOICE | Roos, eleven_v4 |
| CHECKPOINT | twijfelscènes op een blad voor Kamiel (regels.json V1) |
| NOTES | Opbouw goedgekeurd door Kamiel (planning 31 okt 2026, beslissing 3): H1 Welke plant is dit? Determineren met een sleutel · H2 Eén plant, honderd planten: zaaien, stekken en scheuren · H3 Juiste plant, juiste plek: zuurgraad, licht en vocht · H4 Het beplantingsplan. Standplaatsdeel kort (toegepaste Ecologie 2). Bouwt op *Hoe een plant groeit*, *Transport in planten*, *Waar past een soort?*, *Wat zit er in de bodem?*, *Celdeling*. |

## Overlap (grep, 31 okt 2026)
- *Hoe een plant groeit* (Transport 7): meristemen, auxine uit de top, strekking, fototropie/gravitropie, gevoeligheidscurven. → Hier alleen: auxine uit de top laat een stek aan de onderkant wortelen (nieuw: wortelvorming, staat daar niet). Eén terugverwijzing.
- *Celdeling* (Voortplanting): ongeslachtelijk = mitose = klonen; aardbei-uitlopers, gist, bladluis; voor- en nadelen (ziekte treft alle klonen, variatie bij geslachtelijk). → Niet opnieuw uitleggen; één zin terug. Nieuw hier: stekken en scheuren als vak, en waarom een kweker dáárom kloont (zaad van een cultivar geeft andere planten).
- *Geslachtelijk en ongeslachtelijk* (onderbouw 32b): aardbei, 'een stekje groeit uit tot een nieuwe plant', kloon. → Bovenbouwfilm gaat dieper (auxine, waarom zaad van een cultivar niet gelijk uitvalt).
- *Waar past een soort?* (Ecologie 2 v2): abiotische factoren (ook pH), tolerantiegebied, optimum, beperkende factor, indicatorsoort. → Rododendron als toepassing; 'beperkende factor' met terugverwijzing; geen optimumkromme opnieuw opbouwen.
- *Wat zit er in de bodem?* (Landbouw 2, gedeeld met Tuin): zand/klei, ionen, lading, fosfaat reageert met ijzer/calcium. Reeksbrief Landbouw: 'zuurgraad en standplaats zijn het hoofdthema van *Welke plant waar?*'. → IJzer dat bij hoge pH vastzit is nieuw; parallel met fosfaat in één zin mag.
- Determineren: komt op de site niet voor (grep 'determin' in alle scripts: 0 treffers in die betekenis).

## Trekking mutaties (`python3 scripts/dobbelsteen.py --zaad tu1-plant`, 31 okt 2026)
- Variant A: klassiek, volgt het plan.
- Variant B: kleine mutaties: **perspectief** en **camerabeweging**. Perspectief: de kijker ís de hovenier ('Je bent hovenier. Een klant belt …'); Jeroen is de collega die meekijkt, Lotte de stagiair. Camerabeweging: één doorlopende camera van bovenaanzicht (de tuin als plattegrond = het latere beplantingsplan) naar beneden, in het blad, in de grond, en aan het eind weer omhoog naar de plattegrond.
- Variant C: grote mutatie **raadsel** (de film begint met een vraag die pas aan het eind sluit). P1-toets: een raadsel staat in de lijst 'vormen eromheen', maar hier kan het het concept naspelen: **het raadsel wordt opgelost met een sleutel**, dus de vorm ís determineren (steeds kiezen tussen twee: ligt het aan de plant of aan de plek?). Het raadsel: twee keer precies dezelfde plant (de moederplant op de kwekerij en een stek ervan bij Opa Henk, een kloon) – de één bloeit, de ander gaat dood. Omdat ze dezelfde genen hebben, kan het alleen aan de plek liggen. Dat dwingt vermeerderen (kloon) én standplaats in één puzzel; de film sluit pas in H4 met het antwoord en het plan. Geen herloting.
- Proefregels uit `films/logboek/regels.json`: P1 (zie C), P2 (elke misconceptie een vraag; Jeroen een eigen beurt; het woord 'hovenier' valt), V1 (alleen twijfelscènes naar Kamiel).

## Leerdoelen (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen hoe je een plant op naam brengt met een determineersleutel (steeds kiezen tussen twee tegengestelde kenmerken, tot je bij een naam uitkomt), ook zonder bloem;
2. uitleggen waarom zaailingen van een gekweekte plant van elkaar en van de ouder verschillen (geslachtelijk) en waarom een kweker daarom stekt of scheurt;
3. uitleggen dat stekken en scheuren ongeslachtelijke vermeerdering is en klonen oplevert;
4. uitleggen waarom een stek aan de onderkant wortelt (auxine uit de top en de jonge bladeren gaat naar beneden) en waarom je hem vochtig houdt;
5. uitleggen waarom een rododendron in kalkrijke grond geel blad krijgt: bij een hoge pH zit het ijzer vast in de grond, en zonder ijzer maakt het blad te weinig bladgroen;
6. de standplaats van een plant beschrijven (zuurgraad, licht, vocht) en uitleggen dat een factor buiten de grenzen (de beperkende factor) niet wordt opgelost door een andere factor te verbeteren;
7. uitleggen wat een beplantingsplan is en waarom een hovenier eerst de plek meet en dan de plant kiest.

## Misconcepties
1. Een plant herken je aan de bloem; zonder bloem kan het niet → H1.
2. Zaad van een mooie plant geeft precies dezelfde plant → H2.
3. Wortels van een stek groeien uit het blad / het blad is overbodig → H2.
4. Geel blad = te weinig voeding in de grond, dus meer mest of ijzer helpt → H3.
5. Meer licht of meer water helpt een plant die op een andere factor tekortschiet → H3.
6. Je maakt de grond gewoon passend voor de plant; de plek aanpassen is altijd beter dan een andere plant kiezen → H4.

## Te beslissen door Kamiel (twijfelblad)
- Lotte als stagiair in Wat word jij? (ze is 'jij' in de onderbouw).
- Nieuw personage Hovenier Jeroen.
- Opa Henk in een derde groene film.
- Namen in de stem (zoals de andere vervolgfilms) of rollen.
- Zelfgemaakte mini-sleutel (vier struiken) in plaats van een echte Heukels-sleutel.
