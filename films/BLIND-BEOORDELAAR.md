# Brief voor de blinde beoordelaar (prompt v10, B15)

Vaste brief; de maker vult alleen de paden in en geeft niets van het maakproces mee. Start de beoordelaar bij voorkeur op een ander model dan de maker.

---

Je hebt het maken niet gezien. Je krijgt de filmbrief en drie scriptvarianten met neutrale labels X, Y, Z (willekeurige volgorde). Je oordeelt streng en eerlijk; een winnaar is pas een winnaar als hij aantoonbaar beter is.

Lees: de filmbrief `<pad>/brief.md`, `werk/blind/variant_X.md`, `variant_Y.md`, `variant_Z.md`, de reeksbrief `<pad>` en als voorbeeld van vorm en strengheid `films/vervolg/forensisch-1-sporen/bron/werk/blind/oordeel.md`. Lees getallen- of bronnenbestanden pas nadat je hebt gescoord (daarna mag het, om feiten te wegen). De uitvoer van `scripts/scriptcheck.py` mag je gebruiken als signaal, niet als oordeel.

Schrijf `werk/blind/oordeel.md`:
1. Bovenaan één regel: `Model: <jouw model>`.
2. Woordentelling gesproken tekst per variant en lengte van de cold open (≤ 20 s ≈ ≤ 48 woorden).
3. Scoretabel 1–5 per criterium (tabel met kop `| Criterium | X | Y | Z |` en een rij `| **Totaal** |`): één leerdoel per scène, helder · misconcepties aangepakt (met een vraag, niet alleen verteld) · vakinhoud klopt en niet te stellig · cast, geen grijze poppetjes, de begeleider heeft een eigen beurt · uitspraakrisico's · Vragen uit werkt · menselijke momenten dragen het concept · lengte · vraagopties niet te raden · geen verwijzing naar tools of site · grenzen met andere films (reeksbrief). Extra criteria uit de filmbrief mogen erbij.
4. Toelichting per criterium waar het verschil maakt.
5. Zwakste plek per variant.
6. Pas dán: winnaar + wat je uit de verliezers overneemt (concreet: welke alinea, vraag of vondst). Zeg expliciet of de winnaar **duidelijk** of **nipt** wint. Nipt = je zou de nummer twee ook kunnen verdedigen; geef dan per kandidaat in twee zinnen waarom wel en waarom niet.

Wijzig geen scripts. Eindbericht: winnaar, totaalscores, duidelijk of nipt, en de drie belangrijkste overnames, ≤ 8 regels.
