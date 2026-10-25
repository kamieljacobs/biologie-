# Foutenlogboek (sinds 23 okt 2026)

Kamiel (23 okt 2026): houd een lijst bij van alle opmerkingen, aanpassingen en fouten, ook die Claude zelf vindt, en analyseer af en toe of er patronen zijn. Een patroon mag eerder de nieuwe prompt in dan een losse opmerking.

`fouten.jsonl`: één regel per fout, JSON met deze velden:
- `datum` (JJJJ-MM-DD), `reeks`, `film` (bv. "evo2-8"), `scene` (id of null)
- `gevonden_door`: `kamiel` | `review` (frisse reviewer) | `beoordelaar` (blinde beoordelaar van de scriptvarianten, B15) | `zelf` (Claude tijdens het werk) | `leerling` (feedbackknop)
- `soort` (vaste lijst): `vakinhoud` · `te-stellig` · `teleologie` · `vragen-uit` · `vraagkaart-te-raden` · `consistentie-reeks` · `niveau-havo-vwo` · `tekening-verhouding` · `tekening-anatomie` · `tekening-overlap` · `cast-personage` · `uitspraak` · `taal-zin` · `lengte` · `brief-haak` · `techniek-bouw` · `misconceptie-niet-bevraagd` · `verhaal-logica`
- `ontstaan_bij`: stap waar de fout erin kwam: `brief` · `onderzoek` · `script` · `tekenen` · `keyframe` · `audio` · `bouw`
- `gemist_bij`: stap die hem had moeten vangen: `bronnencheck` · `zelfreview-script` · `testvel` · `contactblad` · `consistentiecheck` · `qa-vragen-uit` · `uitspraakcheck` · `niet-van-toepassing`
- `wat`: één zin over de fout · `aanpassing`: wat er is veranderd · `algemeen`: true als Kamiel 'geldt voor alle films' aanvinkte

De tekst (`wat`, en bij Kamiel zijn opmerking letterlijk in `opmerking`) is de bron; de labels zijn Claudes codering achteraf en mogen bij een analyse worden herzien of uitgebreid (Kamiel deelt niets zelf in, hij schrijft losse opmerkingen). Nieuwe soort nodig? Voeg hem aan de lijst toe en hercodeer oude regels waar dat past.

Analyse in twee stappen (Kamiel 23 okt 2026): (1) tellen met de bestaande labels, zodat trends over tijd zichtbaar zijn: `python3 scripts/foutenpatronen.py` (patroon = ≥3× dezelfde soort of dezelfde gemiste stap in ≥2 films). Draaien na elke keuringsronde en vóór elke nieuwe promptversie; (2) alle tekst opnieuw lezen zonder labels (thematische analyse: open coderen, bundelen tot thema's, tellen) om soorten te vinden waar nog geen label voor is. Patronen uit beide stappen gaan als voorstel naar `films/WERKWIJZE-LESSEN.md`.
Bijhouden: na elke review, keuring, feedbackronde en bij elke fout die Claude zelf vindt en herstelt (ook in testvellen).

## Mutatielogboek (prompt v10, B15; sinds 25 okt 2026)

`mutaties.jsonl`: één regel per scriptvariant die de blinde beoordelaar zag. Velden: `datum`, `reeks`, `film`, `variant` (A klassiek / B klein / C groot), `blindlabel` (X/Y/Z), `soort` (`klassiek` | `klein` | `groot`), `vertelvorm` (sleutel uit `films/mutatiepool.json`), `mutaties` (kleine mutaties uit de pool), `score`, `max`, `won`, `marge` (winnaar: voorsprong op nummer twee; verliezer: achterstand), `beslist_door` (`beoordelaar` | `combinatie` | `kamiel`), `beoordelaar_model`, `bron` (pad naar het oordeel), bij de winnaar `reden`.

Bijhouden direct na elk blind oordeel (prompt B4). `scripts/dobbelsteen.py` trekt de mutaties voor de volgende film met deze winkansen (`--toon` geeft de tabel). De zwaktes die de beoordelaar bij de winnaar noemt, gaan als regels met `gevonden_door: beoordelaar` in `fouten.jsonl`, zodat `foutenpatronen.py` ze meetelt.
