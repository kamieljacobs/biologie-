# Filmbrief — Toeval of echt?
| Veld | |
|---|---|
| TOPIC | spreiding, steekproefgrootte, p-waarde en foutbalken; zelf een t-toets doen |
| AUDIENCE | vwo bovenbouw, oriëntatie op studie (Wat word jij? · Biomedische wetenschappen en Bio-informatica (gedeelde film)) |
| NIVEAU | vwo, één niveau |
| LENGTH | content decides (± 5 min) |
| USE | beide |
| CENTRAL PUZZLE | De nieuwe meststof gaf gemiddeld 3 cm langere planten. Is dat echt, of toeval? |
| NOTES | Plan 24 okt 2026 (biomedisch.basis[3], id 'statistiek'): samengevoegd uit 'Onderzoek doen: proefopzet en statistiek' (Biomedisch) en 'Data en statistiek in de biologie' (Bio-informatica). Bouwt voort op Onderzoek doen (p-waarde bij Mendel, 0,05, significant, p-hacking, te weinig proefdieren) en Beroemde psychologie-experimenten (replicatie). Geen placebo, blinderen of fasen: die staan in de parallelle film over medicijnen testen. |

## Leerdoelen (de leerling kan …)
1. uitleggen waarom een verschil tussen twee gemiddelden pas iets zegt samen met de spreiding (standaardafwijking)
2. uitleggen hoe het aantal metingen de standaardfout bepaalt (standaardafwijking gedeeld door √n) en waarom onderzoekers vooraf uitrekenen hoeveel metingen ze nodig hebben
3. de p-waarde correct omschrijven (hoe vaak je een minstens zo groot verschil krijgt als de nulhypothese klopt) en twee misvattingen herkennen: p is niet de kans dat de nulhypothese waar is, en p zegt niet hoe groot het effect is
4. foutbalken lezen (standaardafwijking, standaardfout of betrouwbaarheidsinterval) en een t-toets uitvoeren in een spreadsheet of met een paar regels code

## Misconcepties
1. een gemiddeld verschil is vanzelf echt → cold open, H1
2. meer metingen helpen evenredig → H2
3. p = de kans dat de nulhypothese waar is / dat het toeval is → H3
4. overlappende foutbalken = niet significant → H3
5. significant = groot effect → H3

## Rode draad
Opa Henk zweert bij zijn nieuwe meststof; Noor test het met twintig tomatenplantjes, door het toeval verdeeld over 'met' en 'zonder'. Eén dataset (10 + 10 lengtes) door de hele film, nagerekend in `reken/bereken.py`. Daan rekent mee in H4 (spreadsheet en Python), Dr. Kim staat bij de opleidingen in de recap. Menselijk moment: opa en kleindochter bij de tomaten, aan het begin en in de recap; het draagt het concept (een stellige bewering van opa wordt eerlijk getest).

## Keuzes
- Opbouw volgens het plan: spreiding, steekproefgrootte, p-waarde en foutbalken, zelf rekenen.
- p-waarde eerst via husselen van de stickers (permutatietoets), aansluitend op de simulatie bij Mendel in Onderzoek doen; daarna de t-toets in H4 (p = 0,036 tegen ≈ 0,04, 'bijna hetzelfde').
- Getallen zijn verzonnen maar realistisch; alles nagerekend met Python/scipy (t-toets, exacte permutatietoets, betrouwbaarheidsintervallen, power).
- Overlap met de film over medicijnen testen vermeden: geen placebo, blinderen of fasen.
- Recap noemt beide opleidingen: Biomedische wetenschappen (wo, 3 jaar + master) en Bio-informatica (hbo, 4 jaar; masters aan de universiteit), met meervoudig toetsen bij 20 000 genen als brug.
- Laatste hoofdstuk kort: alleen een spreadsheet met T.TEST en een codevenster van vier regels.
