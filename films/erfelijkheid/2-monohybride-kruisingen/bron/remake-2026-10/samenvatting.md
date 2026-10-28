# Samenvatting fase 1 · Monohybride kruisingen (lichte remake, 28 okt 2026)

- **Beter voor de les:** vóór de F2 legt de film nu stap voor stap uit wat P, F1 en F2 zijn en dát (en hoe) de F1 onderling gekruist wordt. De erwtenbloem bestuift zichzelf (meeldraden en stamper in de kiel), Mendel kruist de P met de hand (meeldraden weg, ander stuifmeel op de stamper), en daarna laat hij de F1 zichzelf bestuiven. Bij dieren kruis je twee F1-muizen met elkaar, broer met zus, met één zin over inteelt. Een generatieladder P → F1 → F2 groeit mee en blijft staan tot de vraag (kernscène k1).
- **Rode draad met film 1:** de film begint en eindigt bij het gezin uit Chromosomen 2.1 (ouders Aa, kind aa; 'hoe groot is die kans?'). In de recap: kans ¼ per kind, en drie kinderen AA, Aa, aa laten zien dat een schema kansen geeft, geen aantallen.
- **Gelijk aan film 1:** kruisingsschema met vader/stuifmeel boven (teal) en moeder/eicellen links (oker), zoals de vooruitblik van Chromosomen 2.1 (de oude film 2 had het omgekeerd); notatie A/a; 'allel', 'fenotype', 'homozygoot' met dezelfde betekenis. De helpers van films 3–6 zou ik dezelfde indeling laten gebruiken.
- **Vakfouten uit de oude film eruit:** 'zo ontstaan vier gameten' na de meiose in een meeldraad (bij een erwt eerst sporen; `!`, meteen aangepast met twee A-bronnen) en 'één op één bij een terugkruising' (alleen als de paarse plant Aa is). Nieuw uitgelegd: de titel ('monohybride kruising').
- **Vragen:** drie, zoals de oude film en Chromosomen 2.1, alle met 'Wat denk je?' en drie opties met misvattingen; antwoorden c, b, a. De vraag 'vier nakomelingen: precies 3 : 1?' (ja/nee, te raden) is nu 'hoeveel van de vier bloeien wit?'. Situatie van elke vraag in de alinea ervoor, zodat alles klopt met Vragen uit; geen korte antwoorden meer ('Niet per se.', 'Aa.').
- **Niveau:** havo en vwo, één niveau (syllabus M7.1 spec. 4: monohybride kruisingen in beide; dihybride en gekoppeld alleen vwo → film 4). Geen vwo-blokken.
- **Scènes:** 32 (27 gesproken alinea's, 3 vragen, titel, eindkaart; plus 6 hoofdstukkaarten).
- **Gesproken duur (schatting, 2,4 woord per seconde):** 852 woorden ≈ 5:55 spraak; met titel, hoofdstukkaarten, vragen en pauzes ± 6:50–7:00 (havo = vwo). Oud: 4:31 (spraak 3:49). `scriptcheck.py` (zonder de commentaarregels): 888 woorden, alle hoofdstukken onder ± 230, cold open 46, geen meldingen over vraagopties.
- **Opnieuw ingesproken:** alles, 27 alinea's + 3 vraagzinnen = **30 takes** (eleven_v4, één take per alinea; ± 6 min × 700 ≈ **4.200 credits**).
- **Nieuw te tekenen** (ronde 1 als code in `tekeningen/nieuw_erf2.js`, keyframes met `tekeningen/kf.html` + `render.py`; die draaien in `/home/claude/hw/erf2/kf/` met kopieën van lib.js, kop.js (regels 1–32 van de engine-scenes), lib_voeding.js, lib_cast.js, lib_bio.js, lib_micro_evo.js, lib_dieren.js en teken_chr1.js zonder de dubbele `_dk`): `erwtBloem`, `erwtenplant`, `plantje`, `labmuis` (kleurvariant van de gekeurde muizenpop), `generatieLadder` + `zelfLus`, `meioseAa`, `kruisSchema`, `f2Veld`. Hergebruikt: kamer, gezin, allelChip, staafAllel, chromatide1, termKaart, misvatting (teken_chr1.js), gezin De Wit (lib_cast.js), muizenpop (lib_dieren.js), Mendel als historische figuur (Geschiedenis van de biologie). Geen referentieplaat gemaakt (0 credits); voor de erwtenbloem is er één voorgesteld als alternatief in T2 (± 190 credits).
- **Keyframes:** 11 (5 twijfelscènes, 6 kernscènes). **Twijfelscènes:** 6 (opening gezin · tekening erwt en zelfbestuiving · Mendel bij de handkruising · muizen en inteelt · recap met drie kinderen · 'terugkruising' of 'testkruising').
- **Bronnen:** 29 beweringen, 18 bronnen: 20 ✓, 9 ≈; één `!` uit de oude film meteen aangepast.
- **Bestaande oefeningen** (`2-monohybride-kruisingen/oefenen.json`: Mendels proef, stappenplan, twee puzzels, drie uitlegopdrachten) passen nog; na de bouw alleen 'volgorde-mendel' nalopen op de nieuwe stap 'F1 zichzelf laten bestuiven'.

## Opmerkingen van Kamiel

| Id | Plek (oud) | Opmerking | Verwerkt in |
|---|---|---|---|
| -P52tYimczZuV-BIkQJ6 | 1:05 'In de F2 kwam wit terug' | Eerst uitleggen wat F1 en F2 zijn; leerlingen bedenken niet zelf dat je de kinderen weer met elkaar kruist, zeker bij dieren niet (inteelt) | Script s03 (zelfbestuiving), s05 (handkruising P), s06 (P en F1 met herkomst), s08 (F1 onderling, zelfbestuiving), s09 (F2 benoemd vóór de uitkomst), s10 (muizen broer × zus, inteelt); generatieladder k1; twijfel T2, T3, T4 |
| -P52twO_f_UxdxqYw4zB | 2:22 'Voor aa moet de ene gameet een a hebben, en de andere óók.' | 'gameet' klonk Engels, moet Nederlands; 'óók' gewoon 'ook' schrijven | Script s19 ('het stuifmeel … en de eicel ook', geen 'óók'); 'gameet/gameten' met de uitkomst van de test van 28 okt (ga-MEET / ga-MEE-ten, centrale regels) in s14, s15, s23; uitspraak.md |
| -P52uA6vAQkJcKapQ4o9 | 3:35 | allel: klemtoon verkeerd | Hele film opnieuw ingesproken met eleven_v4; 'allel/allelen' met de gewone spelling (uitspraaktest 28 okt, goedgekeurd); uitspraak.md, blind transcriberen na de opname |

## Keuzes zonder twijfelscène
- Drie vragen, niet één per hoofdstuk (zoals Kamiel in film 1 koos); kandidaat voor een extra vraag in hoofdstuk 1 staat in `script_v2.md` onder Keuzes.
- 'Gregor Mendel' wordt genoemd (historische persoon; B4 geldt voor castpersonages). De castpersonages van het gezin worden niet genoemd.
- De zin 'Dat stappenplan gebruik je in de rest van deze reeks steeds opnieuw' is weg (klopt niet voor stambomen in film 6).
- De oude puzzel 2 in de cold open is weg; hij komt in hoofdstuk 6, waar hij wordt opgelost.
- Paars: de bloem houdt haar echte kleur (lila-paars met donkere vleugels); de UI gebruikt paars alleen voor DNA/erfelijkheid (BEELDAFSPRAKEN 'minder paars', 28 okt).
- Erwten: `uitspraak.json` heeft alleen een regel voor 'erwt', niet voor 'erwten' en de samenstellingen; film-eigen regels toegevoegd in uitspraak.md (voorstel om ze centraal te zetten).
