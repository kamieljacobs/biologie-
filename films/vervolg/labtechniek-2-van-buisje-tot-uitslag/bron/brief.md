# Filmbrief — Van buisje tot uitslag
| Veld | |
|---|---|
| TOPIC | werken in een diagnostisch lab: monsterketen, pipetteren en verdunnen, ijklijn, real-time PCR (Ct-waarde) en robots, kwaliteitscontrole (controles, controlekaart) |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Laboratoriumtechniek, film 2 van 4) |
| NIVEAU | havo + vwo, één niveau |
| LENGTH | content decides (± 5 min) |
| USE | beide |
| CENTRAL PUZZLE | Je coronatest ging naar een lab. Wat gebeurde daar in de uren tot je uitslag? |
| NOTES | Plan 24 okt 2026 (labtechniek.basis[1], was 'PCR en gel-elektroforese'). Bouwt voort op *Op maat gekopieerd* (PCR-principe, primers, verdubbelen, negatieve controle) en *Op lengte gesorteerd* (gel, positieve controle), en *Onderzoek doen* (betrouwbaarheid). Het PCR-principe wordt niet opnieuw uitgelegd; alleen wat real-time toevoegt. Reeksbrief `lab/REEKS.md`: Yasmin (stage als analist, outfit 'practicum'), Dr. Kim (outfit 'lab') vraagt aan, Opa Henk is de patiënt (etiket 'H. de Vries', zelfde naam als in lt3). Geen buisjes/centrifuge/bloedbeeld (lt3), geen kweek (lt4). |

## Leerdoelen (de leerling kan …)
1. uitleggen waarom een lab elk monster controleert bij binnenkomst (identificatie, juiste buisje, tijd en temperatuur) en dat veel labfouten al vóór het meten ontstaan
2. een verdunningsreeks van 1 op 10 uitrekenen en uitleggen hoe een pipetteerfout in de eerste stap doorwerkt in de rest van de reeks
3. uitleggen wat real-time PCR toevoegt aan PCR (licht meten na elke cyclus) en een Ct-waarde aflezen en interpreteren (lage Ct = veel uitgangsmateriaal; ± 3,3 cycli = factor 10)
4. met een ijklijn een Ct-waarde omrekenen naar een hoeveelheid
5. de functie van positieve, negatieve en interne controle beschrijven en een eenvoudige controlekaart lezen (waarschuwing bij één punt buiten 2 standaardafwijkingen; afkeuren bij twee keer achter elkaar aan dezelfde kant; de regel 'buiten 3 sd' alleen in het docentdeel)

## Misconcepties
1. labfouten ontstaan vooral in het meetapparaat → cold open, H1
2. een fout in een verdunningsreeks verdwijnt door het verdunnen, of groeit vanzelf bij elke stap → H2
3. een hogere Ct-waarde betekent meer virus ('meer cycli = meer') → H3
4. als de controles 'meestal goed' zijn, kun je een afwijking negeren / de grenzen verruimen → H4

## Rode draad
Opa Henk is ziek; Dr. Kim neemt een keel-neusswab af en vraagt een coronatest aan. Yasmin (stage als analist in het ziekenhuislab) volgt het buisje: ontvangst en barcode (H1), standaarden in een verdunningsreeks (H2), robot en real-time PCR met Opa's Ct van 25 en de ijklijn (H3), controles en de controlekaart die op de dag van Opa's run uitslaat (H4). Recap: Dr. Kim belt Opa Henk met de uitslag. Menselijk moment: Opa Henk bij Dr. Kim in de opening en aan de telefoon in de recap; het draagt het concept (achter één uitslag zit een hele keten).

## Keuzes
- Opbouw volgens het plan (4 hoofdstukken). Vier vraagkaarten: cold open (waar gaan fouten mis), H2 (pipetfout), H3 (Ct), H4 (controlekaart). Goede antwoorden c, a, b, c.
- Eén rekenvoorbeeld door de hele film: standaarden 10⁶ → 10² kopieën per putje (1 op 10), Ct 17,0 / 20,3 / 23,6 / 27,0 / 30,3 bij 100 % efficiëntie; Opa Henk Ct 25 → ± 3900 kopieën ('ongeveer vierduizend'). Nagerekend in `reken/bereken.py`. Getallen verzonnen maar realistisch (Ct's van keel-neusswabs liggen meestal tussen 20 en 35, NVMM).
- Ijklijn hoort volgens de reeksbrief bij lt2 (lt3 verwijst ernaar). De film zegt erbij dat een Ct-waarde alleen binnen dezelfde test te vergelijken is (NVMM: tot 6 Ct verschil tussen labs).
- Westgard-regels alleen eenvoudig: 1-2s = waarschuwing, 2-2s = afkeuren (de naam Westgard alleen in het docentdeel).
- Interne controle: 'bij veel testen' een menselijk gen (RNase P, CDC-test); commerciële systemen gebruiken soms een toegevoegde controle. Vereenvoudiging in het docentdeel.
- Robot: Roche cobas 8800 als voorbeeld (1056 tests per 8 uur, ± 132 per uur; eerste uitslagen na ± 3 uur), in de film 'ruim honderd tests per uur', merk niet in beeld.
- Recap noemt mbo Analist (biologisch-medisch analist, niveau 4, meestal 4 jaar) en hbo Biologie en Medisch Laboratoriumonderzoek (4 jaar; met vwo soms 3 jaar), en de werkplekken uit de reeksbrief.
