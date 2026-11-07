# Thema Cellen: beeld-remake en opwaardering (29 okt 2026)

Kamiel (29 okt 2026): 'zullen we voor cellen de reeks remaken' → koos **beeld opnieuw, takes houden** (zoals de DNA 1/2-remakes: animaties naar het niveau van de beeldbank en prompt v13; script en ElevenLabs-takes blijven, herinspreken alleen waar het moet en pas na zijn OK). Hij ging akkoord met deze verdeling:

| Film | Wat | Map |
|---|---|---|
| Celorganellen | beeld-remake | `films/cellen/celorganellen/` (`index.html`) |
| Diffusie en osmose | beeld-remake | `films/cellen/diffusie-osmose/` (`index.html`) |
| Van molecuul tot biosfeer | beeld-remake | `films/cellen/van-molecuul-tot-biosfeer.html` + map |
| Stamcellen | beeld-remake | `films/cellen/stamcellen.html` + map |
| Wat groeit er op je boterham? | lichte opwaardering v10 → v13 (B14, zonder keuring) | `films/cellen/microben.html` + map |
| Onderzoek doen in de biologie | **niet aanraken** (Kamiel: 'daar heb ik nog specifieke ideeën over') | — |

Celdeling hoort nu bij Voortplanting en valt hier buiten.

## Lees eerst
`CLAUDE.md` (bronmap, bronnenlogboek, speler, scripts), `films/PROMPT_v13.md` § 13, § 14 en Part C (C1, C2, C4, C8, C9, C10), `films/BEELDAFSPRAKEN.md` (bindend), `films/logboek/regels.json` (proef- en vaste regels), `bibliotheek/README.md`, de `bron/info.md` en `bron/script.md` van je film. Voorbeelden van een geslaagde beeld-remake: `films/dna/1-wat-is-dna/bron/info.md`, `films/dna/2-dna-kopieren/bron/info.md` en `films/voortplanting/celdeling/bron/info.md`. Lees geen hele film-HTML; werk in `bron/src/` en zoek met grep.

## Beeld-remake (vier films)
1. **Stem en script blijven.** Takes, woordtijden, vragen, hoofdstukken, docentdeel, begrippen en oefeningen blijven. Het beeld past zich aan de take aan (zelfde cue-woorden en duur). Een zin weghalen = knippen op de woordtijden (gratis). Nooit ElevenLabs gebruiken.
2. **Storyboard eerst, kort** (`bron/storyboard-remake.md`): per scène één regel: wat er nu staat, wat het wordt, welke beeldbankobjecten, en of het een *twijfelscène* is (een echt andere aanpak of een keuze die van Kamiel is). Twijfelscènes niet laten liggen: kies de beste optie, bouw die, en zet hem op de twijfellijst (zie 6). Kamiel is er niet bij; wacht nergens op.
3. **Opnieuw tekenen op beeldbankniveau.** Kopieer de actuele `bibliotheek/lib_bio.js` (en waar nodig `personages/lib_cast.js`, `personages/lib_anatomie.js`, `bibliotheek/dieren/lib_dieren.js`) naar `bron/src/` en gebruik de objecten in plaats van de eigen, zwakkere tekeningen. Voor de celfilms vooral: `celDier`, `plantencel`, `kernEnvelopPorie`, `mitochondrionEcht`, `chloroplastEcht`, `golgiStapel`, `ruwER`, `blaasjeVersmelt`, `membraanBoog`, `celRond`, `eiwitVouw` (kralenketen), `enzymKluwen`, `mrnaSliert`, `ribosoomEcht`, `polysoom`, `rnaPolymerase`, `dnaDraad`/`dnaLadderHelix` (palet B: A rood, T geel, C lichtblauw, G donkerblauw, ruggengraat grijs), `membraanReceptor`, `gedifferentieerdeCellen`, `stamcelDeling`, `huidDoorsnede`, `blastocyste`, `bacterieEcht`/`bacterieCel`, `rodeBloedcel`, `zenuwcel`, `spierVezel`, `vetcel`, `schimmelGist`, `microscoop`, `petrischaal`. Kijk op `bibliotheek/testvel.html` (render met Playwright) welke er zijn en hoe ze eruitzien. Objecten met meerdere versies in `bibliotheek/verbeterronde-*/`: wat in `lib_bio.js` staat is Kamiels keuze.
4. **Bindende regels**: rustig en minimalistisch (Kamiel 28 okt: 'te druk', 'DNA is al moeilijk genoeg'); minder paars, contrast rood/groen/blauw; geen korrel buiten cellen, binnen een cel weinig rustige textuur; membranen gebogen, cellen rond, niets steekt buiten het celmembraan (behalve wat de cel echt verlaat); eiwitten als kralenketen, mRNA dun en sliertig; namen direct bij het onderdeel (geen wijslijnen), niet over het gezicht of andere labels; mensen zijn castpersonages met gezicht (geen grijze poppetjes), castnamen niet in beeld (bovenbouw), gezicht blijft heel (hersenen/organen in een zoomcirkel naast het hoofd); organen op hun echte plek en objecten op realistische maat; C8 beweging (rustige celbeweging, vloeiende vormovergangen, doorlopende zooms waar het helpt, één molecuul volgen, schaal voelbaar). Proef- en vaste regels uit `regels.json` toepassen.
5. **Nieuw object nodig?** Teken het in de bronmap van de film (recept als commentaar erboven, C9) en noteer het in `bron/opwaardering-v13.md` onder 'Voor de bibliotheek'. Niet in `bibliotheek/` zelf schrijven.
6. **Lijsten voor Kamiel** in `bron/opwaardering-v13.md`: (a) twijfelscènes (scène, wat je koos, het alternatief), (b) herinspreeklijst (alinea, reden: uitgesproken castnaam, feitelijke fout die niet te knippen is, afgekeurde uitspraak; geschatte credits; niet opnemen), (c) vragen over inhoud, (d) wat er veranderde, één regel per scène.
7. **Vakinhoud**: `bron/bronnen.md` volgens `films/BRONNEN.md` (zelf geopende bronnen, ≥2 onafhankelijk, ≥1 niveau A). Een onderbouwde `!` los je op in beeld of door te knippen; anders op de vragenlijst.
8. **Oude versie bewaren**: kopieer de huidige film-HTML vóór je bouwt naar `bron/oud/` (bv. `bron/oud/index-1.5.html`). Versie wordt **2.0**; in info.md `| Prompt | v13 |`, 'Voldoet aan: prompt v13 (29 okt 2026, beeld-remake, takes behouden)' en een kop 'Versie 2.0' met wat er veranderde. Waar-wat-in-de-HTML-zit bijwerken.
9. **Kijk zelf** (C10): bouw de film, maak contactvellen van **alle** scènes (getegeld, lage resolutie, bv. met de `stills.py` van de bouwstraat of Playwright en `seekGlobal(t)`), Read de png's en verbeter tot het klopt: labels leesbaar en vrij, niets buiten het membraan, beeld volgt de stem. Daarna één ronde met verse ogen op de vellen voor je afrondt.

## Opwaardering (Wat groeit er op je boterham?)
Volg `films/OPWAARDEREN-VOORTPLANTING.md` § 'Wat je doet per film' (B14 zonder keuring, alleen de delta v10 → v13 en de beeldafspraken van na 26 okt: minder paars, beeldbank 28 okt, castnamen niet in beeld/stem, schimmel/bacterie uit de beeldbank waar die beter is). Versie 1.1. Contactvel alleen van gewijzigde scènes.

## Afronden (alle films)
- Draai na het bouwen: `scripts/spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py` (elk ook `--check`), `flipkaarten.py`, `licentie_noot.py`, `teller.py`, `promptversie.py`. Speel elke vraag af met `?vragen=uit` (5 s ervoor tot 5 s erna). Controleer `?review=1` en de Havo/Vwo-schakelaar.
- **Niet aanraken**: `index.html` (datum, REVIEW: doet de hoofdsessie), andere films, `bibliotheek/`, `personages/`, `films/logboek/b15_uitzonderingen.jsonl` (doet de hoofdsessie). Wijzigingen van licentie_noot.py/teller.py buiten je film niet meecommitten.
- **Commit en push per film**: `git add` alleen de bestanden van jouw film. Boodschap 'Cellen: <film> 2.0, beeld-remake op prompt v13 (takes behouden)' (opwaardering: '… opgewaardeerd naar prompt v13 (zonder keuring)'), eindigend met
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Dan `git fetch origin main && git rebase --autostash origin/main && git push origin HEAD:main`; bij weigering even wachten en opnieuw (andere helpers pushen tegelijk). Nooit force. `scripts/controle.py` mag falen op de B15-poort zolang de datum in index.html nog niet is aangepast; andere fouten eerst oplossen.
- Eindbericht ≤ 200 woorden: wat veranderde, wat getest is, twijfelscènes, herinspreeklijst en vragen in één regel per punt.
