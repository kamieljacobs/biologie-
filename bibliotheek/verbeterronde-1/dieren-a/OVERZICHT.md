# Groep dieren-a: overzicht (maker, 27 okt 2026)

Werkmap-hulpmiddelen: `harness.html` + `render.js` (node render.js <poort> obj:oud,A …; repo geserveerd vanaf `/`), `<obj>/scene.js` = opstelling van de still. Elke still: groot, strook met 3 standen, klein rechtsonder; schaal = unie van de bboxes van alle versies.

| obj | soort | A | B | bewust níet |
|---|---|---|---|---|
| insecten | nieuw (`insect(ctx, soort, x, y, s, o)`; bij, kever, mier, vlinder) | zijaanzicht, poten met 2-bots-IK in driepootgang, bij-vleugels gekoppeld, korfje, vlindervleugel als projectie (boven = oogvlekken, onder = donker), 4 poten bij dagpauwoog | bovenaanzicht zoals `lhb`, zes poten gespreid, driepootgang als twee driehoeken, vleugels van boven (verkorting bij slag) | geen ElevenLabs-plaat; lengtes bij/mier/kever niet uit geopende bron |
| grutto | bestaand (lib_bio) | zomerkleed steenrood (`o.kleed`, `o.vrouw`), witte stuit, fijn gebandeerde staart, verre vleugel steekt uit, tweekleurige snavel | – | géén zwarte staartband (voorstel klopte niet voor rosse grutto); niet naar lib_dieren verhuisd |
| kipecht | bestaand (lib_bio) | 4 sikkelveren, oog met iris/pupil, `houding` lopen (head-bob) en pikken | – | niet als uitknippop naar lib_dieren |
| zeeschildpad-schildpadnest | bestaand (lib_bio) | zeshoekige middenschilden, 5 paar ribschilden, kop met schubben en snavelpunt; nest als doorsnede (zandkuil, eikamer, `o.temp`), oud via `o.boven` | – | niet naar lib_dieren |
| krokodilecht | bestaand (lib_bio) | bovenkaak als eigen vlak + neusgatbult, poten met knie en tenen, dubbele kam, `houding: 'lopen'` | – | niet samengevoegd met `krokodil` (lib_dieren); kanttekening in recept |
| wolf-huilen | bestaand | wrapper: galop/rennen → draven (geen stille terugval) | – | geen echte galop gebouwd; README-tekst moet 'galop' als alias noemen |
| hond-chihuahua | bestaand | amandeloog, bruine iris, klein gedempt lichtje (`HOND_CHI_A`, wrapper `hond`) | – | stapcyclus niet aangepast |
| jachtluipaard | bestaand | kleinere, verder uiteen liggende vlekken op onderpoten | – | galopfasen (ronde 5, goedgekeurd) niet aangeraakt |
| leeuw | bestaand | manen-onderlaag een toon lichter | – | galop: luipaardgalop op de leeuw gaf ineengezakte poten, weggelaten |
| paard | bestaand | hoeven donker hoorn | – | grazen-halsboog (goedgekeurd ronde 4) gelaten |
| ezel | bestaand | staart bovenaan smaller, kwast als eigen donker vlak (verschil klein: de oude staart had al een kwast) | – | hals niet ingekort (kop/hals goedgekeurd) |
| muilezel | bestaand | oren 20 % korter (punten boven de kruin geschaald) | – | staart al vol, niet aangeraakt |
| edelhert | bestaand | poten dikker (dikV/dikA 0,9/0,92), echte houding `burlen` (hals omhoog, snuit omhoog) | – | romp niet verlengd; bek open niet gebouwd |
| koe | bestaand | kop 15 % groter (om de kruin), verre poten warmer (verMix 0,16) | – | liggen-voorpoot en grazen-hals gelaten (goedgekeurd) |

## Ronde 1b (nagekomen, zelfde vorm: A + oud in X/Y)

| obj | soort | A | bewust níet |
|---|---|---|---|
| leeuw-galop | bestaand (nieuwe map; `leeuw/` ongemoeid) | eigen gedraaide galop: luipaardgalop met lengtes × 1,5 (schofthoogte), pas × 1,3, duty factor 0,3, rugbuiging 60 % | manen niet aangepast (dat zit in `leeuw/`) |
| tijger | bestaand | eigen galop: lengtes × 1,25, pas × 1,1, duty factor 0,3, rugbuiging 65 % | strepen op de onderpoten |
| hond-teckel | bestaand | kortere pas (18 cm), voet hoger, meer buiging pols/hak in de zwaai, iets meer rol | verschil met oud is klein; vier fasen in de strook |
| hond-mops | bestaand | meer buiging en lift in de zwaai, meer rol/deinen | verschil met oud is klein (pop klemt de standen) |
| zeehond | bestaand | ronder/hoger voorhoofd, donkere voorflipper; volledige kopie van ZeehondPop als `ZeehondPopA` | rupsen/zwemmen ongewijzigd |
| muis | bestaand | houding 'knabbelen' (en 'rechtop' met o.t): 6 standen, kop knikt, pootjes naar de bek, zaadje | rechtop-met-voedsel niet uit een geopende bron bevestigd |

## Ronde 2 (na OORDEEL.json)

- **paard**: X en Y waren gelijk omdat `_hoefDef` de hoefteken-functie (`TENEN`) aan het oorspronkelijke definitieobject bindt; een kopie met een andere `HOEF` tekende dus nog de oude hoef. A.js bindt `TENEN` nu opnieuw; X/Y opnieuw gerenderd, zelfde sleutel. **Zelfde valkuil bij edelhert A**: `dikV`/`dikA` werken via `POOT`, dat `_hoefDef` al vooraf berekent; in edelhert A zijn de poten dus níet dikker geworden (alleen 'burlen' is echt). Herstel = `POOT: _hoefPoot(H/160, dikV, dikA, {mc:{c:'#8F684F'}, vp:…})` opnieuw zetten; niet gedaan omdat het oordeel er al lag.
- **C gemaakt** (C.js + C.png, zelfde uitsnede):
  - koe: winnaar A + snuit die naar de neus toe niet meeschaalt (slank), oor een toon lichter, hoornstompje als eigen deel boven de kruin.
  - insecten: winnaar B (bovenaanzicht) + zijaanzicht van A ingebouwd: driepootgang van boven zichtbaar (zwaaipoten vaag, steunpoten met voetstip), stuifmeelkorfje groot met rand (standaard `o.stuifmeel` 0,8), dagpauwoog 'rust' = vleugels dicht van opzij met donkere onderkant en vier looppoten, 'zonnen' = open van boven, `o.zij` voor elk insect.
  - grutto: winnaar A + taps toelopende tweekleurige snavel (Cornell + Wikipedia).
  - ezel: winnaar A + staart opnieuw opgebouwd, dun in lijfkleur met korte donkere kwast (Britannica, IUCN GISD, UNH Extension).
  - krokodilecht: winnaar A + gespreide poten bij liggen/kruipen (elleboog op buikhoogte, lijf op de grond), high walk half rechtop, staart van opzij hoger (Reilly & Blob 2003; Iijima e.a. 2021).
- **Geen C**:
  - muilezel: 'staart vol, paardachtig' rust alleen op The Donkey Sanctuary (twee pagina's van dezelfde organisatie, en alleen voor de hinny = NL muilezel). Geen tweede onafhankelijke bron gevonden → voorstel aan Kamiel, geen C. Die bron bevestigt wel kortere, paardachtige oren (A).
  - wolf-huilen: een echte galop met zweeffase vraagt een nieuwe gangtabel in WolfPop met een fasebron; niet gelukt in deze ronde. De pose die A bij 'galop' toont is een **draf**: noem hem zo (README: 'galop' = alias van draven, geen eigen gang).


Let op bij plakken: de pop-varianten bouwen een eigen pop (`HOEF_PAARD_A`, `KAT_LEEUW_A`, …) uit de bestaande definitie en vervangen alleen de wrapperfunctie; ze muteren de gedeelde tabellen niet. `insect` gebruikt `var INSECT_SOORT` (A en B hebben elk hun eigen tabel).
