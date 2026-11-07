# Eindreview "Weefselvloeistof en lymfe" (transport 4/6)

Slug `4-weefselvloeistof-en-lymfe`. Gesproken tekst 366 s vwo, 300 s havo. Met titel, kaarten, vragen en eindkaart is dat ongeveer 7:30 voor vwo en 6:10 voor havo.

## Wat ik controleerde
- Elke `q.on`/`q.at` heb ik met een script nagerekend tegen `filmdata.json`. Er ontbreekt geen cue-woord. Bij woorden die vaker voorkomen staat de n goed: `plasma`#2 in s07 (#1 is "plasma-eiwitten"), `lymfevaten`#2 en `lymfeknopen`#2 in s10, `bovenste`#2 in s11, `kleppen`#2 in s14.
- Ik heb drie rondes contactsheets bekeken (5 frames per alinea, vwo) en losse havo-stills rond het vwo-blok (s14 → kaart H3 → s19) en de vragen.
- Bij elke vraag komt het antwoord pas in beeld nadat de stem het zegt. De vraag in H1 (s05) staat vóór de uitleg over rode bloedcellen. Het antwoord op q02 verschijnt pas in s20, op "antwoord".
- Kleuren: plasma en weefselvloeistof zijn TR.plasma, lymfe is TR.lymfe, bloed is TR.rijk/TR.arm (rood dat langs het haarvat donkerder wordt), en goud markeert wat in focus is. De paarse tags staan alleen in het vwo-blok.
- Er staat geen tekst onder y = 900 en niets buiten beeld. Alle tekst is minstens 24 px.

## Wat ik verbeterde (ronde 1–3)
- De titelscène is nu een ingelijst venster rechts. Eerst liep het haarvat dwars door de puzzeltekst.
- De labels "begin/eind" stonden ten onrechte in de ondertitelzone (y > 900) en staan nu op y ≤ 818.
- s01: de inzoom op de schoenen was onduidelijk en is vervangen door een inzet met de enkel van opzij die opzwelt. Het label "putje" schoof ik naar links, zodat het niet in de vinger staat.
- s04/s09/s10/s20: labels liepen buiten beeld of over cellen ("plasma-eiwitten", "lymfevat", de legenda van de pijlen). Ik heb ze verplaatst of ingekort.
- s07: de tekens ≠ en ≈ volgden de verkeerde cue en staan nu op "geen" en "plasma"#2.
- s10/s11: `druppel()` kreeg een kleur die geen hexkleur was (`lighten()` geeft rgb() terug), waardoor die druppels een ongeldige kleur kregen. Dat is opgelost. Het label "linkersleutelbeen" was te lang en liep buiten beeld.
- s16: het vraagteken stond over het onderschrift van de zoomcirkel en staat nu rechtsboven.
- s18: het kind is kleiner getekend, zodat het label vrij blijft.
- s22: de wandelaar liep het beeld uit en loopt nu binnen x 220–780.

## Wat nog open staat
- Het lymfestelsel (s10–s12) is een schets met een paar knopen. Er is geen rechter lymfestam en geen cisterna chyli. Dat staat in de docenttekst.
- s14 (spierpomp): de stoot omhoog is te zien, maar subtiel. Een tweede, zichtbaarder druppel per stoot kan nog.
- s21: de bakjes voor de drie oorzaken staan op schaal 0,55. De labels zijn leesbaar, de pijpdruppels zijn klein.
- TTS-wachtlijst voor deze film (testen in de batch): "oedeem" (ingevoerd als "eudeem"), "resorptie", "lymfe" en "lymfeknopen", "koolstofdie-oxide". Het staat niet in deze bouwmap welke voice-invoer s12, s14 en s18–s22 hebben gekregen; zie `missing.json`.
- De bronmap (`bron/info.md`, `bron/script.md`) voor de site-repo is nog niet gemaakt. Dat hoort bij de stap die de film op de site zet.
