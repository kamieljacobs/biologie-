# Verbeterronde 2: organen-plant (28 okt 2026)

Nieuw object zonder versie in de bibliotheek. Kamiel: 'gelijk'. X/Y/Z zijn de ronde-1-winnaar (C, ongewijzigd, `R1.js`), A en B; zie `sleutel.json`.

| obj | ronde-1-winnaar | A | B | bewust níet |
|---|---|---|---|---|
| bladDoorsnede | C: een ondiep 3D-blokje. Fout uit ronde 1: geen duidelijke open spleet en CO2/O2 niet te onderscheiden. | Platte doorsnede, alleen het snijvlak, rustig met weinig bladgroenkorrels. Eén groot huidmondje met twee sluitcellen vol bladgroen en een duidelijke open spleet, met een luchtholte erboven. Open/dicht = sluitcellen bollen op en wijken uit elkaar. CO2 (grijs, O–C–O) gaat met een grijze pijl naar binnen, O2 (teal, O=O) met een teal pijl naar buiten. | Het blad als rustige strook met de lagen als banden. Een gouden loep zoomt in op één huidmondje, en de gaswisseling gebeurt in de loep. Op klein formaat (s < 0,2) valt de loep weg. | Geen waterdamp in beeld (het moet eenvoudig blijven) en geen bovenvlak of 3D-blok. De opties `damp`/`co2`/`trek`/`hiStoma` uit de film zitten er niet in. |

Let op: `films/transport/6-transport-in-planten/bron/src/scenes.js` heeft een eigen `bladDoorsnede` met andere opties (`damp`, `co2`, `trek`, `hiStoma`, `hiNerf`, `suiker`). Als die film lib_bio.js laadt ná zijn scenes.js, overschrijft de bibliotheekversie de zijne. Controleer de laadvolgorde voordat je hem inbouwt.
