# Verbeterronde 2 van de beeldbank: brief voor de makers (28 okt 2026)

Kamiel (biologiedocent) bouwt animatiefilms met een gedeelde tekenbibliotheek, de beeldbank (`bibliotheek/lib_bio.js`, `bibliotheek/dieren/lib_*.js`). In ronde 1 koos hij per object een versie; deze objecten keurde hij af of vroeg hij opnieuw. Jij maakt nieuwe varianten. **Je wijzigt niets in de bibliotheek of in films, en maakt geen git-commits.**

Repo: `/root/biologie-` (ook `/home/claude/biologie-`). Niet opnieuw clonen.

## Wat Kamiel in ronde 1 leerde ons (belangrijk)
- Hij kiest **helderheid boven volledigheid**. Zijn woorden: 'te druk', 'het mag simpeler', 'minimalistisch en simpel, want DNA is al moeilijk genoeg voor de leerlingen', 'de organellen leiden af'. Hij koos elf keer de oude, eenvoudigere versie boven een rijkere variant. Een leerling van 15 moet in twee seconden zien waar het om gaat.
- **Minder paars, meer contrast** (zie onderaan `films/BEELDAFSPRAKEN.md`): paars alleen waar het iets betekent; onderdelen die je uit elkaar moet houden krijgen duidelijk verschillende tinten (rood/koraal, groen, blauw/teal, oker), ook verschillend in lichtheid (rood-groen-kleurenblindheid).
- Biologie moet kloppen met **niveau A-bronnen** die je zelf opent (`films/BRONNEN.md`). Kamiel bij zetmeel: 'het moet eerst écht kloppen met een A-bron en dan vormen we vanuit daar een goede animatie.' Bij de antistof: 'kijk eens of je materialen van andere lesmethoden kunt pakken': kijk hoe leerboeken/OpenStax/BiNaS-achtige schema's het tekenen en neem die eenvoud over (niet kopiëren).
- Eiwitten: Kamiel koos de **kralenketen** (keten die vouwt) voor alle eiwitten, niet het lintmodel en niet een vlakke vlek.

## Lezen (gericht)
`films/BEELDAFSPRAKEN.md` (bindend), `films/PROMPT_v13.md` Part C (C1, C2, C9, C10; zoek op '### C'), `bibliotheek/README.md`, `bibliotheek/verbeterronde-1/MAKER.md` (werkwijze stills, X/Y/Z, sleutel.json, renderen: volg die, maar met werkmap hieronder), per object de ronde-1-map `bibliotheek/verbeterronde-1/<groep>/<obj>/` (recept.md, bron.md, de oude A/B/C, en wat er mis was) en het receptcommentaar in de bibliotheek.

## Werkmap en oplevering
`bibliotheek/verbeterronde-2/<groep>/<obj>/` met per object: `A.js` en `B.js` (twee échte verschillende eenvoudige aanpakken; volledige functies met receptcommentaar, zelfde naam en aanroep als nu zodat films blijven werken), `X.png`/`Y.png`/`Z.png` (1280×720; één ervan is de huidige versie uit de bibliotheek, als die bestaat), `sleutel.json`, `recept.md` (bijgewerkt, eenvoud voorop), `bron.md` (zelf geopende bronnen), `kenmerken.json` (zie `bibliotheek/verbeterronde-1/KENMERKEN.md`). Per groep `OVERZICHT.md`. Kijk zelf naar elke still (Read de png) voordat je hem oplevert: is hij rustig, klopt hij, zie je in twee seconden waar het om gaat?

Eindbericht ≤ 200 woorden: per object wat A en B zijn, welke bronnen, en vragen voor Kamiel.
