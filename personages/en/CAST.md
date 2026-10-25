# Cast voor de Engelse films (Unboxing Biology)

Voorstel 25 okt 2026, **nog te keuren door Kamiel**. Hoort bij `films/PROMPT_EN_v1.md` (Part E). Een eigen cast, los van de Nederlandse (`personages/lib_cast.js`, `ROLLEN.md`): Engelse films gebruiken alleen deze personages, Nederlandse films alleen de Nederlandse.

Werkwijze (Kamiel 25 okt 2026: 'deze keer eerst met een ElevenLabs-still'):

1. **Castvel als still** in ElevenLabs: alle personages van een groep naast elkaar in vooraanzicht, in de filmstijl (vlak, navy, gedempte kleuren, eenvoudig gezicht). Dit is een ontwerpplaat om van te leren (prompt C10.3), nooit beeld in een film.
2. Kamiel keurt het vel: per personage goed, of wat anders moet. Een afgekeurd personage krijgt een eigen kleine still, niet het hele vel opnieuw.
3. Pas daarna wordt het personage in code getekend, in `personages/en/lib_cast_en.js` met dezelfde functie en opties als `lib_cast.js` (`persoon(ctx, id, x, y, h, {uit, pose, kijk, zij, gang, t})`, gangen, garderobe), en naast de still op een testvel gelegd (C10.4).
4. Goedgekeurd → in het castboek (`personages/en/index.html`) en de rol hieronder op 'vast'.

Vellen en ElevenLabs-flow: zie onderaan.

## Kerngroep (vel 1)

| id | Naam | Leeftijd | Rol in de films | Uiterlijk (voorstel) |
|---|---|---|---|---|
| `maya` | **Maya** | 16 | 'you': nieuwsgierig, stelt de vragen; de rode draad | Zwart-Brits, krullen in een hoge puff, mosterdgele trui, jeans, witte sneakers |
| `theo` | **Theo** | 16 | doet de proefjes, sportief, probeert alles uit | wit-Brits, kort rossig haar, sproeten, groene hoodie |
| `priya` | **Priya** | 17 | scherp, wil geneeskunde studeren; ziet het verband | Brits-Indiaas, lange donkere vlecht, navy vest over wit shirt |
| `kenji` | **Kenji** | 15 | rustig, denkt na, houdt van getallen en grafieken | Japans-Brits, steil zwart haar, bril, gestreept T-shirt |
| `ribeiro` | **Dr Ana Ribeiro** | 42 | arts en onderzoeker: lab, spreekkamer, uitleg van onderzoek | Braziliaans-Portugees, donker golvend haar tot de schouders, witte labjas over petrolblauw |
| `mensah` | **Mr Mensah** | 39 | biologiedocent, vraagt eerst wat jij denkt | Ghanees-Brits, kort haar en korte baard, bril, tealkleurige trui |

## Familie van Maya (vel 2, later)

Voor erfelijkheid, generaties en alles met familie. Een gemengde familie maakt variatie in uiterlijk binnen één stamboom zichtbaar.

| id | Naam | Leeftijd | Rol |
|---|---|---|---|
| `grace` | **Grace** | 45 | moeder van Maya en Eli · dochter van Grandpa Emeka en Grandma Ngozi; outfit `pregnant` = 16 jaar geleden |
| `tom` | **Tom** | 48 | vader van Maya en Eli · zoon van Grandpa Arthur en Grandma Jean |
| `eli` | **Eli** | 6 | broertje van Maya (kinderverhoudingen) |
| `arthur` | **Grandpa Arthur** | 72 | opa (vaderskant), tuiniert; ook 'de patiënt' |
| `jean` | **Grandma Jean** | 70 | oma (vaderskant) |
| `emeka` | **Grandpa Emeka** | 74 | opa (moederskant) |
| `ngozi` | **Grandma Ngozi** | 71 | oma (moederskant) |
| `clare` | **Aunt Clare** | 42 | zus van Tom |
| `baby` | baby | 0 | pasgeboren / ongeboren, geen naam |

## Overige rollen (vel 3, alleen als een film ze nodig heeft)

| id | Naam | Rol |
|---|---|---|
| `hiro` | **Hiro** (15) | eeneiige tweelingbroer van Kenji: zelfde DNA, ander shirt |
| `sofia` | **Sofia** (29) | zwanger van haar eerste kind, los van Maya's familie |
| `ruby`, `omar` | **Ruby** en **Omar** (10) | kinderen op de basisschool (bv. een vaccinatie) |
| `mark` | **Mark** (38, figurant) | voorbijganger, verdachte, iemand uit een onderzoek |
| `pete` | **Pete** (55, figurant) | buurman, verre familie, iemand uit een onderzoek |
| vakmensen | naam + beroep, bv. *Nurse Jordan*, *Vet Hannah*, *Farmer Dave* | alleen in hun eigen vak; nieuw vakmens = eerst een kleine still |

Telpoppetjes in een telling (100 mensen, 1 op 3) blijven eenvoudige pictogrammen, zoals in de Nederlandse films.

## Regels (gelijk aan de Nederlandse cast)

- Zelfde rol = zelfde personage, zodat de kijker mensen herkent. Niemand in een rol die botst met zijn vaste achtergrond.
- Nooit een stereotype: herkomst bepaalt nooit de rol (wie de patiënt, de verdachte of de expert is), en elk personage heeft een eigen karakter.
- Stijl: Part C van de prompt (vlak, geen omlijning, één schaduwtint, geen verloop of gloed, eenvoudig gezicht zonder oogwit, huidskleur en zachte ronde vormen, echte verhoudingen; lopen en rennen met de gangmotor van het castboek).

## Vellen

| Vel | Inhoud | Model | Status |
|---|---|---|---|
| 1 | kerngroep, `personages/en/vellen/vel-1.webp` | gpt-image-2, één variant (±185 credits), flow https://elevenlabs.io/app/flows/ImNDqEpSOwU8N1ciplpA | gemaakt 25 okt 2026, nog te keuren |

Opgevallen bij vel 1 (voor de code-versie): de still heeft dunne donkere contourlijnen en een klein oogwit, de filmstijl niet (Part C: geen omlijning, geen oogwit) — die neemt de code-versie niet over; verhoudingen, kapsels, kleding en kleuren wel.
