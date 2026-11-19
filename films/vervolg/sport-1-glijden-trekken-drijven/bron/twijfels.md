# Twijfels — sport-1 Glijden, trekken, drijven (script_v2 definitief, ronde 3, 19 nov 2026)

Reeksmodus: Claude beslist zelf (regels.json V1); elke twijfel met wat Kamiel bij de review anders kan kiezen.

| # | Twijfel | Besluit (reeksmodus) | Kamiel kan anders kiezen |
|---|---|---|---|
| t1 | B15: blind ronde 1 Y nipt (48–46–43); ronde 2 combinatie duidelijk (54) | Combinatie = definitief script_v2 | Toch X (kijker-beslist) |
| t2 | Vermogensvraag H1 | Zonder krachttraining of termijn: 'Stel dat hij tien procent meer vermogen levert' | Terug naar 'hoeveel meer vermogen voor tien procent sneller' |
| t3 | Zwemmer in het water en meetbaan tekenen | Cast-API (`zwemmer()`), meetbaan als nieuwe tekening met testvel | Meetbaan alleen als foto-achtig kaartje |
| t4 | M6 (elke slag een ander principe) | Alleen stelling + beeld ('techniek verschilt, principe gelijk'); afleider d is nu 'aangeboren gevoel' omdat 'elke slag werkt anders' ook waar is (feitenreview M4) | Eigen vraag over het principe (± 40 woorden schrappen) |
| t5 | H2-vraag | Over weerstand (hoofd omhoog = schuiner = ± 5–10 % meer, sleepproef), niet meer over zakkende benen (feitenreview M2) | Terug naar 'benen', als hypothese |
| t6 | Opleidingszin | Zwembonddiploma's + CIOS/ALO/Sportkunde + Bewegingswetenschappen VU/Groningen | Vaste reekszin als de hoofdsessie die vastlegt; ALO-bron toevoegen |
| t7 | Gender zwemtrainer | De stem gebruikt geen hij/zij voor de trainer | Wat de casthelper kiest |
| t9 | Klembord als rode draad | Trainer schrijft na elk hoofdstuk één woord, label 'VOORBEELD', geen tijden | Weglaten (dan valt de rode draad terug op de zwemmer alleen) |
| t10 | Vraag 4 heeft vier opties | Houden: a en c dekken M4, d 'aangeboren gevoel' (weerlegd door 'dat kun je trainen') | Drie opties |
| t11 | Startvraag 'meer' houding dan kracht | Cold open en recap zeggen 'vaak meer', met als redenen: houding kost geen extra energie, en zwemmers waren met even veel energie ruim een vijfde sneller (feitenreview M1) | Eindkaartje '10 % minder weerstand ≈ 3 % sneller' erbij (model) |
| t12 | catch → stem `ketsj` | IPA /kætʃ/; filmlijst `uitspraak_film.json` | 'catch' zoals geschreven als de proef goed klinkt |
| t8 | Bewegingswetenschapper in beeld | Figurant zonder naam (castboekstijl), geen echt persoon | Bestaand castpersonage |

## t1 B15
- Ronde 1 (blind, claude-fable-5-2): Y 48 · X 46 · Z 43, nipt; advies combinatie. Ronde 2 (`werk/blind/oordeel_blind2.md`): combinatie 54, duidelijk. Het eerste zelfoordeel telt niet. Kamiel kan nog 'toch X' kiezen (`werk/script_v2_zelfoordeel.md`).

## t2 Vermogensvraag in H1
- **Twijfel:** de omgekeerde vraag (10 % vermogen → hoeveel sneller) uit X, zonder 'met krachttraining in een paar maanden'.
- **Waarom:** de beoordelaar vond die vraag de beste en de krachttrainingsbewering het terrein van film 3. 1,1³ ≈ 1,33 staat alleen in beeld.
- **Besluit:** zo gedaan; de recap zegt 'Kracht blijft nodig'.

## t3 Nieuwe tekeningen
- **Twijfel:** de film vraagt om Sam in het water in vier slagen, stroomlijn, dolfijnslag, keerpunt (salto), drijven en schuin liggen; een meetbaan (stang met plaatjes onder water); het kamertje met de onderwatervideo; een bewegingswetenschapper als figurant.
- **Waarom:** de cast-API (`zwemmer`, `opStartblok`) wordt nu door de casthelper gemaakt; drijven/schuin liggen (rotatie van het hele lichaam) en het keerpunt (salto) staan mogelijk niet in die API.
- **Besluit:** het lichaam draaien met `ctx.rotate` rond het zwaartepunt voor drijven en schuin liggen. Keerpunt: alleen de afzet van de muur in stroomlijn tonen (geen salto) als de API die niet heeft. Klembord: de trainer houdt het in vooraanzicht vast; het woord verschijnt als tekst erop. Meetbaan eerst op een testvel (C10.4).

## t4 M6
- Feitenreview M4: 'dat verschilt per slag: elke slag werkt anders' is feitelijk ook waar (schoolslag haalt veel voortstuwing uit de benen). Daarom geen M6-afleider meer; M6 staat als stelling ('De techniek verschilt per slag, maar het principe is hetzelfde') met beeld. Afleider d is nu 'aangeboren gevoel: dat kun je niet leren', weerlegd door 'dat kun je trainen'. P2 dus niet volledig voor M6: Kamiel kan een eigen vraag willen.

## t5 H2-vraag
- Feitenreview M2: tijdens het zwemmen geeft het drijfmoment netto een beenheffend effect (Psycharakis & Yanai 2018) en bij hoge snelheid beïnvloedt het de lichaamshoek niet (Kjendlie 2004). Wat wel gemeten is: hoofd omhoog geeft 4–11 % meer passieve weerstand (Cortesi & Gatta 2015). De vraag gaat daarom over de weerstand; 'lig je stil, dan zakken je benen' blijft als stilligmodel.

## t6 Opleidingszin
- **Twijfel:** CIOS (mbo) en ALO (hbo) alleen uit een beroepengids (C).
- **Besluit:** houden met 'vaak' en 'bijvoorbeeld'. Steekproef: één ALO- en één CIOS-site openen.

## t7–t8
- De stem noemt de trainer alleen als 'de zwemtrainer' of 'de trainer'; de bewegingswetenschapper is een naamloze figurant aan de laptop.
