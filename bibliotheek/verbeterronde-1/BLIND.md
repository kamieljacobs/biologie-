# Brief: blinde beoordelaar beeldbank

Je hebt het maken niet gezien. Je krijgt per object 2 of 3 stills met neutrale labels X, Y (en Z), in willekeurige volgorde. Eén ervan kan de huidige versie zijn, maar je weet niet welke en dat doet er niet toe: je oordeelt alleen op wat je ziet. Een winnaar is pas een winnaar als hij aantoonbaar beter is. Raak niets in de repo of in de objectmappen aan behalve je eigen oordeelbestand.

Lees kort: `/home/claude/biologie-/films/BEELDAFSPRAKEN.md` en in `films/PROMPT_v13.md` Part C, vooral C1, C2, C9 en C10 (zoek op '### C'). Lees NIET `sleutel.json`, `A.js`, `B.js`, `bron.md` of `OVERZICHT.md` voordat je hebt gescoord.

Per object (map `<groep>/<obj>/`): lees `recept.md` (wat het object biologisch moet laten zien), bekijk `X.png`, `Y.png`, `Z.png` (open ze met Read; eerst heel, daarna mag je met Python/Pillow een uitsnede vergroten om details te controleren).

Scoor elke still 1–5 op: **klopt** (biologisch juist: vorm, verhouding, onderdelen, plaats) · **herkenbaar** (een leerling van 15 herkent het meteen, ook klein) · **stijl** (rustig, fijne lijnen, past bij Part C: geen korrel, geen bolletjes-eiwitten, gebogen membranen, niets buiten het membraan, realistische maten) · **beweging** (zijn de getoonde standen/animatie duidelijk en kloppend; n.v.t. als er geen beweging is) · **bruikbaar** (werkt het klein en groot, ruimte voor namen). Totaal = som.

Schrijf `<groep>/OORDEEL.json`: lijst van
`{"obj": "...", "scores": {"X": {"klopt":n,...,"totaal":n}, "Y": {...}, "Z": {...}}, "winnaar": "X|Y|Z", "marge": "duidelijk|nipt", "zwakste_plek": {"X": "...", "Y": "...", "Z": "..."}, "overnemen": "wat uit de verliezer(s) in de winnaar moet (concreet), of leeg", "combineren": true|false, "fout": "biologische fout die in alle versies zit, of leeg"}`
Nipt = je zou de nummer twee ook kunnen verdedigen (marge ≤ 1 punt of zo voelt het). Zet `combineren: true` als een combinatie van winnaar + iets uit een verliezer duidelijk beter zou zijn.

Eindbericht ≤ 10 regels: per object winnaar en marge, en de objecten waar alle versies een fout hebben.
