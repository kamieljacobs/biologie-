# Verbeterronde 2: genregulatie (28 okt 2026)

Beide objecten zijn nieuw en hebben nog geen versie in de bibliotheek. Kamiel zag in ronde 1 geen duidelijke winnaar ('gelijk').
Per object zijn er drie stills, X/Y/Z: de ronde-1-winnaar (variant C, blinde winnaar ronde 3, als `R1.js`), A en B. Welke still welke versie is, staat in `sleutel.json`.
Renderen kan met een eigen testpagina die lib.js (Voeding 1), lib_bio.js en daarna de variant laadt. Die testpagina staat niet in de repo.

| obj | ronde-1-winnaar | A | B | bewust níet |
|---|---|---|---|---|
| lacOperon | C, met **alleen de fout hersteld**: de repressor ligt nu óp de operator (`ry` naar het DNA). Bevestigd met Pierce § 12.8 en BioNumbers 102084. | Platte leerboekstrook: het DNA is een platte ladder met gekleurde vakken (promotor goud, operator koraal, genen groen, lacI grijsblauw). De repressor is een koraal kralenketen die met twee 'koppen' in de ladder op de operator grijpt. De polymerase is een grijsblauwe kralenketen. Het mRNA is een eigen eenvoudige sliert. | De echte helix (dnaDraad) met de gebieden als balkjes eronder. Het eiwit omklemt het DNA: eerst de achterkant, dan de helix, dan de voorste lip. Met allolactose zwaait de lip weg en gaat de repressor los. | Geen CAP/cAMP en geen lus tussen O1 en O3. Geen mrnaSliert met basen en codons, want dat was te druk. De lengtes van lacY en lacA zijn bij benadering. |
| methylgroep | C ongewijzigd (paarse puzzelladder in een gouden vak, factor als lint). Alleen het gedeelde hulpje is weggelaten, omdat het al in lib_bio staat. | Alleen de CG's tellen: 11 bp. De CG-paren zijn rechte staafjes met een letter (C teal, G groen); de A–T-paren zijn grijze sporten zonder letter. CH3 is een koraal kopje. De promotor is een dunne gouden haak, en het DNA loopt door in een groen genblok. Het onderhoudsenzym is een kleine kralenketen. | Ingezoomd op één CG: 4 bp met de puzzelrand, maar in vier niet-paarse tinten. Op elke C zit een groot CH3-kogelmodel. Bij de deling geeft een gouden flits aan waar de nieuwe CH3 komt. | Geen slotje-metafoor (`o.slot` wordt genegeerd) en geen zwaar kader. Paars alleen in de rails. |

Let op bij het inbouwen:
- `tools/docent/dna-3/beeldbank.js` heeft een eigen kopie van `lacOperon` en `methylgroep` (de ronde-1-versie). Werk die bij na Kamiels keuze.
- A en B van lacOperon gebruiken `_grKralen`, en methylgroep B gebruikt ook `basePuzzelPad`. Beide staan al in lib_bio.js. De hulpjes `_lacSuiker`/`_lacSliert` en `MG2`/`_mgCH3` staan per bestand; plak er één versie van.
