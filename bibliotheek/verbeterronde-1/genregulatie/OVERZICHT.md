# Groep genregulatie: overzicht (27 okt 2026)

Alle acht objecten zijn nieuw. Er zijn telkens twee varianten (X/Y = A/B, de verdeling staat in sleutel.json). De bronbestanden staan in `src/`. `python3 src/bouw.py` plakt de gedeelde hulpjes erin en schrijft dan `<obj>/A.js` en `<obj>/B.js`. Renderen gaat met `./run.sh <obj> A,B`, met `render.html` en `<obj>/still.js`.

**Gedeeld hulpje (één keer in lib_bio.js plakken):** `_grKluwen`, een eiwitkluwen binnen een omtrek. Dat is een kralenketen met α-helixstukken, met pasvorm en `fold` 0..1. De kopieën in de bestanden zijn gelijk. Ook gedeeld en per bestand gelijk: `_tfSteroid/_tfDNA/_tfPolymerase/TF_KLEUR`, `methylCH3/_mgSlot`, `_lacSuiker/_lacMRNA/_lacMouw`, `CODE_B/CODE_AA/_cdRNA`. Plak er maar één versie van.

**Plaatshouders:** RNA-polymerase en de herstelenzymen zijn hier `enzymKluwen`. Dicer, RISC en de repressor zijn `_grKluwen`. Een andere helper maakt rnaPolymerase, mrnaSliert, ribosoomEcht en trnaKlaverblad; die zijn hier niet getekend.

| obj | A | B | bewust níet |
|---|---|---|---|
| codonTabel | rooster 4×4, basen als RNA-tegels, leespad rij → kolom → regel als gouden banen | codonzon (ringen 1e/2e/3e base, aminozuur op boog), leespad van binnen naar buiten | geen volledige aminozuurnamen (optie `namen`); BiNaS-drieletters |
| genOpbouw | balk op dunne DNA-lijn; splicing = intronen knippen en wegzakken, exonen schuiven aaneen; genstrip met blokjes | gebieden als mouwen om een helix (dnaDraad); splicing met lasso-lussen; genstrip op helix | geen echte lengteverhouding exon/intron ('niet op schaal'); geen spliceosoom getekend |
| transcriptiefactor | monomeerkluwen met uitsparing en gouden herkenningshelix in de groef; activatiestaart naar de polymerase; remmer houdt de polymerase weg; oestradiol in een holte | dimeer: twee helften vormen pas op het DNA een klem (zoals de oestrogeenreceptor), met koppelvlak | geen enhancer/DNA-buiging; polymerase = plaatshouder |
| nucleosoomAcetyl | bouwt op nucleosoomDraad (3D-schijven): twee groepen schuiven uiteen, staarten strekken met groene acetylgroepen, promotor komt vrij | vooraanzicht: zigzagvezel valt open tot kralensnoer, de +-ladingen op de staarten verdwijnen door acetylering | nucleosoomDraad zelf niet aangepast (nieuwe functie ernaast) |
| methylgroep | basenniveau: CpG's in de puzzelladder, CH3 als kogelmodelletje (koraal) op elke C, deling met oude/nieuwe streng en aanvullen | genniveau: knopjes op de helix-promotor, het gen licht alleen op als de factor landt, deling als twee dochterhelices | slotje alleen als optie (`slot`), niet standaard |
| lacOperon | rij op een helix (lacI, promotor, operator, Z/Y/A op lengte), repressor als paar kluwens die met allolactose wegkantelt, polymerase loopt, één mRNA | V-vormige tetrameer klemt O1 en O3, de promotor zit in de DNA-lus; lus gaat open met lactose | geen CAP/cAMP; lengtes lacY/lacA bij benadering |
| rnaInterferentie | overzicht in één beeld: Dicer knipt dsRNA, RISC laadt de gids, bindt het mRNA, knip, afbraak | close-up van Argonaute (twee lobben) met 21 puzzelbasen; mRNA-basen paren, knip tussen nt 10–11, passagier gaat weg | B toont Dicer en lang dsRNA niet (zit in A); geen miRNA-haarspeld |
| uvSchade | basenniveau: twee T's kantelen naar elkaar met koraal klem, rail bolt op; enzym knipt aan twee kanten, stuk gaat weg, aanvullen (lichte streng), ligaseflits | helixniveau: helix knikt als V, klem scant over de helix, stuk enkelstreng zweeft weg, gat gevuld | weggeknipt stuk korter dan 24–32 nt ('schematisch'); geen fotolyase |

**Open punten in de bronnen (staan ook in bron.md):** OpenStax § 15.1 en § 14.6 waren niet te openen (allowlist). Daardoor rust codonTabel op één bron. Onderhoudsmethylering, de intronlasso en de herkenningshelix van TF's in het algemeen hebben nog een tweede bron nodig. De lengtes van lacY en lacA zijn niet uit een bron gehaald. Ik heb geen referentieplaten gemaakt.

## Ronde 2 (na OORDEEL.json): C-varianten

Voor elk object staat er een `C.js` en een `C.png` naast de andere varianten, met dezelfde uitsnede en `still.js`. Brongedeelten staan in `src/<obj>_C.js` en worden gebouwd met `python3 src/bouw.py`.

**Nieuw `_grKluwen` (`src/_kluwen2.js`, één keer in lib_bio.js plakken; het vervangt dat van ronde 1).** Het hulpje heeft dezelfde aanroep als in ronde 1 (`r`, `sc`, `col`, `seed`, `rot`, `bbox`, `fold`, `key`, `hl`) en geeft nog steeds de punten van de hartlijn terug.
- De keten is één doorlopende gladde buis: een dikke lijn met een lichte rand.
- Er zijn 1–3 α-helices. Elke helix is een spiraaltje van hooguit ±10 r lang, met een lichte voorkant en een donkere achterkant.
- Er zijn 2–4 β-strengen. Die staan als brede pijlen in antiparallelle paren (een plaat).
- Lussen en bochten verbinden de rijen. Het geheel blijft binnen de pasvormomtrek. Er zijn geen losse kralen meer.
- `fold` werkt nog: de gestrekte buis vouwt, en helices en pijlen verschijnen aan het eind van het vouwen.

| obj | winnaar | C = |
|---|---|---|
| methylgroep | A (basenladder) | A + gouden promotorvak om het stuk DNA. De factor ketst nog steeds af bij methylering; hij is nu een gevouwen lint in plaats van een plaatshouder-blob. |
| nucleosoomAcetyl | B (vooraanzicht, ladingen) | B + de histonkern als licht gekantelde schijf: een bovenvlak met vier histonen en een zijkant met nog vier als bulten (acht in totaal). Het DNA loopt vóór en achter de schijf langs. De staarten zijn buisjes in plaats van kralen en de factor is een lint. |
| rnaInterferentie | A (overzicht) | A + de dsRNA-stukjes met puzzelbasen (A–U, G–C). Die zijn verkort tot 6 bp per stukje; het echte stukje is ±21 nt. De gids ligt boven met de basen naar het mRNA, de passagier gaat naar onderen weg. De Dicer-knip is gemarkeerd en Dicer en RISC zijn linten. |
| lacOperon | A (rij) | A + de repressor als twee gevouwen linten. |
| transcriptiefactor | A (monomeer) | A + een lintkluwen. De herkenningshelix is een spiraaltje dat goud wordt zodra hij past. De activatiestaart is een buis. RNA-polymerase staat verder weg, zodat het niet meer tegen de factor plakt. |
| uvSchade | A (basenladder) | A + het herstelenzym als lint. |

**Bewust níet gedaan:**
- RNA-polymerase en het ligase/polymerase in uvSchade blijven `enzymKluwen`-plaatshouders, want een andere helper maakt die objecten.
- De dimeerstand (uit transcriptiefactor B) en de lacOperon-lus (uit B) zijn niet als vwo-stand toegevoegd; beide B-versies staan nog als B.js.
- De punten uit 'overnemen' voor codonTabel en genOpbouw (combineren: false) heb ik niet aangepakt.
