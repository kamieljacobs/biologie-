# Eindreview beeld en tekst: Van pil tot plek en weer terug (20 okt 2026)

Frisse review van de gebouwde film: de contactsheet (alle segmenten op 25/60/92 %) plus losse tijden (s04:12, s10:33–34, s11:12–15, s13:2/17.6, s05:24), script_v2, film.json en sections.html.

## MOET

1. **s10 (H3), ±14–19 s, fase 'bloeddrukpil tegenover paracetamol': de rode curve loopt dwars door het label.** `naamBij(ctx, 'bloeddrukpil', 'halfwaardetijd ± 36 uur', G.X(17), G.Y(84), …)` staat precies op de lijn `100·0.5^(x/36)`. Bij x = 17 ligt de curve op y ≈ 72, net onder de naam, en de regel 'HALFWAARDETIJD ± 36 UUR' wordt doorsneden. Reparatie: zet het label boven de curve, bijvoorbeeld `G.X(17), G.Y(98)`, of `G.X(12), G.Y(100)` met align 'left'. Controleer daarna dat het niet over de chip 'de hele dag boven de grens' valt (G.Y(45)).

Verder geen harde fouten in beeld of tekst. De vakinhoud klopt: halveringsstappen 100–50–25 bij 0–2–4 uur, de beugel 'halfwaardetijd' tussen t = 3 en t = 5 op de batemancurve (verhouding 0,503), de stabiele spiegel na 4–5 × 1,5 dag ≈ een week, en grapefruit/simvastatine ± 3,6× (Lilja 2004 klopt met de bron).

## KAN

- **s13 (Recap), vanaf 'Verpleegkundigen' (±8,5 s): een medicijnkar met het label 'verpleegkundige'.** De naam van een beroep staat op een voorwerp. Liever het label 'medicijnkar' met als subregel 'verpleegkundige geeft medicijnen', of een castpersonage naast de kar (er is geen verpleegkundige in de cast; Dr. Kim in outfit 'gewoon' kan niet, want zij is arts).
- **Continuïteit met *Achter de balie*.** Hier heeft Henk één bloeddrukpil (amlodipine, docentdeel) en paracetamol in zijn pillendoos. In film 3 heeft hij vijf middelen: plastablet, ACE-remmer, bètablokker, cholesterolverlager en maagbeschermer. Daar staat geen amlodipine tussen. De gesproken tekst kan niet meer veranderen. Zet in het docentdeel van film 3 (of hier) een zin als: "In *Achter de balie* gebruikt Henk later meer middelen, omdat hij intussen hartfalen heeft." Of maak in film 3 van de bètablokker in de schermlijst 'bloeddrukpil'. Dat is wel medisch minder logisch bij hartfalen.
- **s04, overgang naar 'Antwoord b' (±7,5 s):** het silhouet van de maag uit de volgende fase is al vaag te zien achter de twee pillen. Het stoort niet, maar het kan schoner als de maag pas na 'binnenkomen' infadet.
- **Vraagkaart q02:** het goede antwoord (b) is ook de langste optie. q06 (c) en q09 (a) zijn dat niet, dus de spreiding is goed. Wil je het nog evenwichtiger maken, dan kan (c) langer: "pijn moet je vaker bestrijden dan een hoge bloeddruk, die merk je niet".
- **Docentdeel, tabel 'Halfwaardetijd paracetamol':** "tot vier keer per dag (zelfzorg max. 3 g per 24 uur)". Vier keer 1000 mg is meer dan 3 g. Schrijf erbij "bij 500 mg-tabletten 1–2 per keer" om verwarring te voorkomen.

## Goed

- Het membraan in H1 is een gebogen dubbellaag (rond), met 'in de darmcel' en 'darmholte' aan de goede kant. Namen staan direct bij de onderdelen en er zijn geen wijslijnen.
- Alleen castpersonages: Noor, Opa Henk en Apotheker Ravi (s13). De footer noemt precies die drie.
- De timing van de cues is netjes: de pil valt uiteen op 'maag', de route langs de lever met 'nog 5' van de 100, de tong met 'lever niet langs', en de zaagtand met de beugel '4 tot 5 halfwaardetijden'.
- De goede antwoorden van de vraagkaarten kloppen met het script (b, c, a) en staan op verschillende letters.
- Checkvragen, glossary en bronnen zijn correct. De rekensom in checkvraag 3 (80 → 40 → 20 mg) klopt.
