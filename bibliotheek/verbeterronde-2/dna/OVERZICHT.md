# Groep dna · verbeterronde 2 (maker, 28 okt 2026)

Per map: `A.js`, `B.js` (volledige functies met receptcommentaar, zelfde naam en aanroep), `X/Y/Z.png` (1280×720, blind; één = huidige bibliotheek),
`sleutel.json`, `recept.md`, `bron.md`, `kenmerken.json`, `scene.js`. Renderen: `bash run.sh <map> oud A+<mee> B+<mee>` (harness.html laadt
lib.js, lib_voeding, lib_cast, lib_micro_evo, lib_bio, dan `kleuren/palet<V>.js`, dan de 'mee'-objecten in dezelfde versie, dan het object).
**In de stills hoort palet A bij variant A en palet B bij variant B** (Kamiel wilde de kleuren in samenhang zien); de basen in helix, polymerase en
vrije nucleotide gebruiken de baseRing/d2Base van dezelfde variant. Het losse kleurenvel (`kleuren/`) laat alleen het palet verschillen.

| Object | A | B | Bewust niet gedaan |
|---|---|---|---|
| dnaladderhelix | vlakke band als ruggengraat, smalle tweekleurige sporten met naad, letters op de voorste sporten, achterkant 62 % gedimd; fase 120° → groeven 1 : 2 | voorkant vol met puzzelrand en letter, achterkant (rug én sporten) als vage schaduw 22 %; zelfde 120° | geen fosfaat/suiker-kralen, geen bruggen of stippen in de helix |
| polymeraseachter-polymerasevoor | twee delen: donkere palm (kralenserpentine) áchter het DNA + lichte vingerketen ervoor; klem = ring van 14 kralen | het enzym als kralenketting langs de omtrek, alleen een waas als vulling, DNA blijft volledig zichtbaar; vingerketen; zelfde klem | geen duim, onderkaak, exonuclease; Voor tekent zelf de achterlaag als Achter ontbreekt (primerStuk) |
| basering-basebruggen-nucleotidering | fosfaat–suiker–base op een rij, base wijst van de ring af na een duidelijk streepje; bruggen doorgetrokken goud, open stippen alleen ongebonden | base hangt na een schuine knik naast C2' (zoals in de ladder); geen stippen, bruggen als gouden puntjes; geen steeltje | testvel.html/lessen_dna.md niet aangepast; `dir` wordt in A genegeerd |
| vrijnucleotide-d2base-baseringrna | één fosfaat (zoals in de streng), geen randen; kleine basen egale staafjes, puzzel pas vanaf 14 px | drie fosfaatkralen (dNTP) met optie `pp` (pyrofosfaat laat los); puzzel pas vanaf 18 px, kleine staafjes met 1 px voeg | geen aparte RNA-tintenreeks meer: RNA verschilt door de teal ruggengraat |
| kleuren (palet) | 'lichtheidstrap': A groen, T koraal, C zandgeel, G blauw, ruggengraat lila | 'paren als families': A koraalrood, T zandgeel, C lichtblauw, G donkerblauw, ruggengraat grijs | C1 (DNA paars) niet aangepast in de prompt: wacht op Kamiels keuze |

Scènes gelijk aan ronde 1, behalve: polymerase (inkomende nucleotide wijst naar de matrijs en is complementair; grote uitsnede g 200, puzzelbasen pas vanaf dx 30),
basering (grote nucleotide iets naar links), vrijnucleotide (strengen op drie filmgroottes, ook `pp`), kleuren (nieuw).
Geen JS-fouten in de console bij alle 15 renders; geen referentieplaten gemaakt (0 credits).
