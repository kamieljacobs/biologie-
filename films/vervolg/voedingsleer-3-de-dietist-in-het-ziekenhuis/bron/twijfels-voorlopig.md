# Twijfels (voorlopig) — vd3 Eten als behandeling: de diëtist in het ziekenhuis (31 okt 2026)

Vóór de blinde beoordelaar. Alleen punten waar ik echt aan twijfel (regels.json V1). Niets gegenereerd.

## t1 Eiwit vóór dialyse: 'minder' of 'niet meer dan nodig'
- **Twijfel:** de planning (en de oude startvraag) zegt 'vóór dialyse minder eiwit'. De Nederlandse richtlijn (NHG/NIV 2018; NfN/NIV 2020) adviseert bij een nierfunctie onder 30 een *normale* hoeveelheid (0,8 g/kg) en raadt strengere beperking af; de Amerikaanse KDOQI (2020) gaat wel lager (0,55–0,6). Nederlanders eten gemiddeld ± 1,0 g/kg.
- **Waarom:** alle drie de varianten zeggen 'niet méér eiwit dan je lichaam nodig heeft; dat is minder dan de meeste mensen eten', en 'tijdens dialyse juist meer (1–1,2)'. Dat klopt met beide richtlijnen en houdt het contrast. Een leerling of collega die 'eiwitarm dieet bij nierziekte' kent, kan dit als afwijking zien; het docentdeel noemt de twee richtlijnen. Getallen.md 24–25.

## t2 Hanneke in het ziekenhuis
- **Twijfel:** Hanneke is goedgekeurd als diëtist met een eigen praktijk (vd1, vd2). Hier werkt ze in het ziekenhuis.
- **Waarom:** diëtisten werken in beide (LEVENSLOOP: 'alleen in haar eigen vak' blijft gewaarborgd). Eén zin kan het verklaren ('Hanneke werkt twee dagen in het ziekenhuis'), maar geen bron dat dat gebruikelijk is. Alternatief: een nieuwe ziekenhuisdiëtist (afgeraden: meer cast, minder herkenning). Voorstel: Hanneke houden.

## t3 Patiënten
- **Twijfel:** A en B: **Mevrouw Jansen** (72, buurvrouw) als ondervoede patiënt (A gebroken heup na een val, B longontsteking) en **Erik** (38, figurant) als nierpatiënt. C: alleen Erik, met beide problemen, en hij draagt de hele film.
- **Waarom:** Mevrouw Jansen past (ouderen grootste risicogroep; 'los van Noors familie'); zij heeft al een eigen verhaal (vlinderteller, Forensisch 3) en een ziekte is een nieuwe stap in haar levensloop. Erik is in LEVENSLOOP 'blijft figurant, geen rol met een verhaal'; in C wordt hij de hoofdpatiënt van een hele film (naamloos in stem en beeld). Ruud uit *Uitscheiding en evenwicht* is geen castpersonage (oude `person()`), dus niet bruikbaar. Alternatief voor C: een nieuwe figurant-patiënt. Fysiotherapeut Femke kort in A (H4) als teamlid.

## t4 Nieuwe outfits en decor (alleen voorstel)
- **Twijfel:** nodig zijn een outfit `ziekenhuis` (ziekenhuishemd, eventueel vest) voor Mevrouw Jansen en/of Erik, en een ziekenhuisdecor: ziekenhuiskamer (bed, raam, tafeltje) en in B ook een ziekenhuiskeuken met dienbladenkar; A en B ook een ziekenhuisgang met kar.
- **Waarom:** er is al een ziekenhuisbed in code (`henkInBed` in Verpleegkunde 1, `films/vervolg/verpleegkunde-1-bel-je-de-arts/bron/src/scenes.js` r. 169) dat te veralgemenen is naar een bed met een ander castpersonage (let op maten: in Fysiotherapie 2 gaf een vaste bedlengte rare verhoudingen, WERKWIJZE-LESSEN). Eén ElevenLabs-decor 'ziekenhuiskamer' (recraft-v4.1, één variant, ± 240 credits) zou volstaan; de gang/keuken alleen als B wint. Niets gegenereerd.

## t5 Lichaam en sonde in beeld (gevoelig)
- **Twijfel:** H2 toont een castpersonage met `lib_anatomie.js` (lever, beenspieren) en spiereiwit dat 'verdwijnt'; H4 een neussonde.
- **Waarom:** geen magere lichamen als schok, geen close-up van het inbrengen; de sonde schematisch in een zoomcirkel náást het gezicht (BEELDAFSPRAKEN: niets over het gezicht), het dienblad ernaast. Spierverlies als 'iets dunner been' in doorsnede, niet als uitgemergeld lichaam. Kamiel: is een sonde in beeld acceptabel, of liever alleen een flesje en de trap met treden?

## t6 Hoe stellig over spierafbraak
- **Twijfel:** 'een groot deel van die glucose komt uit spiereiwit' en 'vet helpt mee, maar spaart de spieren niet'. In de eerste dagen draagt ook glycerol (uit vet) bij; later sparen ketonen spier. Glycogeen 'na ± 1 dag bijna op' rust op één B-bron (LITFL) plus de A-bron over vasten (Owen & Cahill 1967) zonder dat getal.
- **Waarom:** de kern (zonder eten → spierafbraak voor glucose) is ✓ (getallen.md 10). B en C noemen ketonen in één bijzin, A niet. Een frisse vakreview moet de formulering nalopen; PMC en PubMed (Cahill 2006, een A-bron met het glycogeengetal) waren niet te openen.

## t7 Bedrustonderzoek: toegeschreven, één bron
- **Twijfel:** 'gezonde ouderen verloren in tien dagen bedrust bijna een kilo spier uit hun benen' (Kortebein 2007) heb ik alleen in het nieuwsbericht van de eigen universiteit gezien (B12), niet in de JAMA-samenvatting zelf.
- **Waarom:** toegeschreven bewering → ≈. Steun uit B13 (A, Maastricht: 5 dagen gips, dijspier −3,5 %) en B14. Kan de frisse feitenreview de JAMA-letter openen, dan ✓; anders vervangen door het Maastrichtse onderzoek ('na vijf dagen met een been in het gips was de dijspier van jonge mannen al kleiner').

## t8 Lengte H3
- **Twijfel:** H3 draagt twee leerdoelen (stoffen bij nierfalen + eiwit vóór/tijdens dialyse) en is in A en B langer dan de scriptcheck-grens (± 250–270 woorden).
- **Waarom:** Kamiels opbouw zet beide in H3. Alternatief: eiwit en dialyse als eigen hoofdstuk (vijf hoofdstukken) of de stoffen korter (fosfaat alleen in beeld).

## t9 Variant C: eiwit drie keer bijgesteld
- **Twijfel:** in C zet Hanneke in H2 'meer eiwit dan gezond' (ondervoeding), draait dat in H3 terug naar 'niet meer dan nodig' (nieren) en zet het bij de dialyse weer omhoog. Bij een ondervoede nierpatiënt vóór dialyse zou een diëtist dat vermoedelijk meteen samen afwegen (ESPEN: 0,6–0,8 g/kg bij CNS zonder dialyse in het ziekenhuis).
- **Waarom:** didactisch sterk (eiwitadvies is een afweging, geen vaste regel), maar het laat Hanneke een 'fout' maken die een vakexpert opvalt. Als C wint: H2 aanpassen tot 'genoeg eiwit en vooral genoeg energie'.
