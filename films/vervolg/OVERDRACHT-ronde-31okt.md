# Overdracht — Wat word jij? · vier films in productie (Voeding 3 en 4, Tuin 2, Milieukunde 2)

Scripts (v2, blind beoordeeld, feitenreview verwerkt, bronnenlogboek) staan in `films/vervolg/voedingsleer-3-de-dietist-in-het-ziekenhuis/bron/`, `voedingsleer-3-een-burger-zonder-koe/bron/`, `tuin-2-welke-plant-waar/bron/`, `milieukunde-2-pfas-ddt-en-microplastic/bron/` (let op: de slugnummers kloppen nog niet met de volgorde in vervolg.html; kies bij het in de repo zetten de definitieve slug). Twijfels per film in `bron/twijfels.md`. Planning: `PLANNING-milieu-tuin-voeding.md`. Gezondheid 2 en 3 staan online (31 okt 2026, status nog bekijken).

## Keuring Kamiel ronde 2 (31 okt 2026, 13:28) — https://claude.ai/artifact/37hA97qYcbRzSAspuQZKkW (db-collectie `keuring`)
Alles volgens voorstel, behalve **a1: geen personagenamen in de stem, volgens prompt v13 B4** (voor deze vier films en de Wat word jij?-films daarna; in de stem 'de stagiair', 'de diëtist', 'de levensmiddelentechnoloog', 'de hovenier', 'de milieukundige', 'de buurman'; namen mogen in beeld). Gezondheid 2 en 3 waren al met namen ingesproken en blijven zo tenzij Kamiel anders vraagt.
- a2 één ElevenLabs-castvel met Levensmiddelentechnoloog Lars, Hovenier Jeroen en Milieukundige Iris (Thijs donkere hoodie, niet als Daan); pas na keuring in lib_cast.js/ROLLEN/LEVENSLOOP.
- a3 zes decors: ziekenhuiskamer (vd3), proeffabriek met extruder (vd4), tuin van Opa Henk met nieuw terras + stekkas (tu1), Joosts tuin met kippenren + plas met zeearendnest (mk1); ziekenhuisgang en kantoor omgevingsdienst op navy.
- Ziekenhuis: Hanneke in het ziekenhuis; Mevrouw Jansen (heupbreuk) + Erik naamloos, sonde in zoomcirkel naast het gezicht; titel H3 → 'minder zout, soms minder kalium, en eiwit dat ineens anders moet' (ook in vervolg.html); ketonen alleen docentdeel, bedrustonderzoek houden met '12 OUDEREN'.
- Burger: startvraag op de site → 'Stel: een erwtenburger heeft evenveel eiwit als een hamburger. Is hij dan net zo goed?'; stem 'maag', beeld 'PENS'; pan-koekje houden als wat Noor ziet; ontwerpblad alleen aan het eind van elk hoofdstuk en in de recap. Kweekvleesstand vlak voor inspreken nog eens nagaan.
- Plant: kloondraad Opa Henk houden; zelfgemaakte mini-sleutel akkoord. aeresmbo.nl vóór de opname nog openen.
- PFAS: startvraag op de site → 'In de eieren van Joosts eigen kippen zit PFAS. Hoe weet je of dat te veel is?'; H2-titel → 'Bioaccumulatie: ophopen in vet of eiwit'; microplastic 'niet aangetoond', nooit 'veilig'; Iris bij de omgevingsdienst, Dordrecht niet noemen; rekenvoorbeeld met STEL houden.

**Volgende stap (nieuwe chat):** namen uit de stem halen in de vier script_v2.md (script blijft verder gelijk), vervolg.html bijwerken (titels/startvragen hierboven), castvel en decors maken en laten keuren waar nodig, dan per film inspreken (Roos, eleven_v4, hooguit 2 takes tegelijk) → bouwen (brief zoals `/home/claude/hw/BRIEF-gz-productie.md`, opnieuw te maken in de nieuwe sessie) → frisse beeldreview → repo. Daarna nog de twee films die nog geen script hebben: Tuin *Natuur in de stad* en Milieukunde *Van wieg tot graf* (zelfde straat: varianten → blinde beoordelaar via de hoofdsessie, want helpers hebben geen Agent-tool → feitenreview → v2 → twijfelblad).

## Stand (31 okt 2026, avond): vier films online
| Film | Slug | Stem (flow · credits) | Review |
|---|---|---|---|
| Voeding 3 · Een burger zonder koe | `voedingsleer-3-een-burger-zonder-koe` | lBotTcinBcU647jcbWzi · 5323 | 8 MOET verwerkt |
| Voeding 4 · Eten als behandeling (ziekenhuis) | `voedingsleer-4-de-dietist-in-het-ziekenhuis` | uJrvlk3VwYgk8tTlOxvK · 5187 | 11 MOET verwerkt |
| Tuin 1 · Welke plant waar? | `tuin-1-welke-plant-waar` | w7yQ37qSxsHwEpomtFru · 4993 | 11 MOET verwerkt |
| Milieukunde 1 · PFAS, DDT en microplastic | `milieukunde-1-pfas-ddt-en-microplastic` | ANfVc6v4RAKbfZBm3WQ8 · 5330 | 12 MOET verwerkt |

- Namen uit de stem (script v2.1); castvel `personages/vellen/vel-nl-2.webp` goedgekeurd → `lars`, `jeroen`, `iris`, Thijs outfit `stage` in lib_cast/ROLLEN/LEVENSLOOP. Decors (flow RVqu1vLFRgY3QXwS4WcU, ± 2150 credits met castvel): ziekenhuis, proeffabriek, tuin, buurtuin (in `bron/src/decor_*.js`).
- Oude bronmappen met de verkeerde slugnummers zijn verplaatst naar de definitieve slugs; B15-logregels in `mutaties.jsonl` wijzen naar de nieuwe hrefs.
- Burger staat ook als extra film bij thema Voeding (`HOOFDSTUKKEN.extra.films`, `vervolg: 'voedingsleer'`).
- Uitspraakwachtlijst (in `bron/uitspraak.md`): B-twaalf, ee-uu (EU), Dee-dee-tee/Dee-dee-ee, Pee-ef-oo-aa, Pee-fos, Er-ie-vee-em: Kamiel luistert in de reviewstand.

**Nog open:** filmmedaillons (volgend vel), `jaarplanner-dekking.json` (Tuin 1: havo 4 § 2.1, Nectar 20.1/20.5; Burger: havo 4 § 7.7; als laatste stap na `git pull`), Kamiels review van de vier films, keuring van de nieuwe tekeningen (planten Tuin 1; zeearend, poelslak, voorn, snoek PFAS), kweekvleesstand nagaan (Burger), aeresmbo.nl nog openen (Tuin). Daarna de twee films zonder script: Tuin *Natuur in de stad* en Milieukunde *Van wieg tot graf*. Werkmap van deze ronde (`/home/claude/hw`, met `inrepo.sh`, `register.py`, `scripts_na.sh`, briefs) bestaat alleen in deze sessie.
