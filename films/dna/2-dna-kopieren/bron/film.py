import json
film = {
 "slug": "2-dna-kopieren",
 "hoofdstuk": "dna",
 "hoofdstukNaam": "DNA",
 "title": "DNA kopiëren",
 "sub": "twee uit één",
 "puzzle": "Bij een schaafwond maakt je huid heel veel nieuwe cellen. Hoe krijgt elke cel een complete kopie van twee meter DNA, bijna zonder fouten, in een paar uur?",
 "meta": "dna 2/8",
 "version": "2.0 · oktober 2026",
 "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks DNA · film 2 van 8 · vorige: <a href=\"1-wat-is-dna.html\">Wat is DNA?</a> · volgende: <a href=\"3-van-dna-naar-eiwit.html\">Van DNA naar eiwit</a>",
 "lead": "Noor heeft een schaafwond op haar arm. Een week later is hij dicht: haar huid heeft heel veel nieuwe cellen gemaakt, en elke cel kreeg zijn eigen kopie van het DNA. In deze film zie je het kopiëren echt gebeuren: helicase opent de dubbele ketting, vrije nucleotiden botsen tegen de open streng, en DNA-polymerase koppelt alleen de nucleotide die past. Voor vwo: semiconservatief (Meselson en Stahl), de richting 5' → 3', primers en de replicatievork met de leidende en de volgende streng.",
 "endHaak": "Hoe leest een cel haar DNA? Dat zie je in de volgende film.",
 "minis": {
  "Hoofdstuk 1 — Wanneer en waarom": "Wanneer kopieert een cel haar DNA, en waarom?",
  "Hoofdstuk 2 — Eén streng is genoeg": "Hoe kan één streng genoeg zijn voor een nieuwe?",
  "Hoofdstuk 3 — Twee uit één": "Hoe is twee meter DNA in een paar uur gekopieerd?",
  "Hoofdstuk 4 — Richting en halfnieuw": "Wat zit er in de nieuwe moleculen, en in welke richting wordt gebouwd?",
  "Samenvatting — Terug naar de schaafwond": "Hoe kreeg elke huidcel een complete kopie?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Noor uit het castboek. Tekeningen: gedeelde bibliotheek (huid, celkern, chromatine, DNA rond eiwitten, basen in ringvorm, replicatievork). Stijl: Part C van de filmprompt (v10). Versie 2.0 · oktober 2026.",
 "heleVraag": ["s04", "s12", "s17", "s23"],
 "questions": {
  "q05": {"q": "In welke fase kopieert de cel haar DNA?", "correct": 1,
          "explain": "Vóór de deling, in de S-fase (synthese). Als de cel begint te delen, bestaat elk chromosoom al uit twee identieke chromatiden."},
  "q13": {"q": "Op de oude streng staan de basen A T G C. Welke basen komen er op de nieuwe streng tegenover te staan?", "correct": 1,
          "explain": "Tegenover A komt T, tegenover T komt A, tegenover G komt C en tegenover C komt G: T A C G. De nieuwe streng is de partner, geen kopie van dezelfde letters. U zit alleen in RNA."},
  "q18": {"q": "Vijftig nucleotiden per seconde, en toch is de cel klaar in een paar uur. Hoe kan dat?", "correct": 1,
          "explain": "Het kopiëren begint op tienduizenden startpunten in het DNA tegelijk. De cel kopieert alles, ook de stukken die ze niet gebruikt."},
  "q24": {"q": "Na één keer kopiëren op lichte stikstof sorteer je het DNA op gewicht. Wat zie je?", "correct": 2,
          "explain": "Alles is even zwaar, precies tussen zwaar en licht in: elk molecuul heeft één oude, zware streng en één nieuwe, lichte (semiconservatief)."}
 },
 "glossary": [
  {"t": "celcyclus", "d": "De opeenvolging van fasen die een cel doorloopt tussen twee delingen."},
  {"t": "S-fase", "d": "Fase van de celcyclus waarin het DNA wordt gekopieerd (S = synthese)."},
  {"t": "M-fase", "d": "Fase waarin de cel deelt en de kopieën van de chromosomen over de dochtercellen worden verdeeld."},
  {"t": "DNA-replicatie", "d": "Het kopiëren van al het DNA vóór de celdeling (ook: DNA-verdubbeling)."},
  {"t": "vrije nucleotiden", "d": "Losse DNA-bouwstenen (A, T, C, G) in het kernplasma, waaruit de nieuwe strengen worden gebouwd."},
  {"t": "helicase", "d": "Enzym dat de twee strengen van het DNA uit elkaar trekt."},
  {"t": "DNA-polymerase", "d": "Enzym dat langs een oude streng schuift en elke passende nucleotide vastkoppelt aan de vorige."},
  {"t": "telomeer", "d": "Niet-coderend, herhaald DNA aan de uiteinden van een chromosoom; beschermt de uiteinden."},
  {"t": "mutatie", "d": "Verandering in de nucleotidevolgorde van het DNA, bijvoorbeeld een kopieerfout die blijft staan."},
  {"t": "semiconservatief", "d": "Elk nieuw DNA-molecuul bestaat uit één oude en één nieuwe streng.", "vwo": True},
  {"t": "5'-uiteinde en 3'-uiteinde", "d": "De twee uiteinden van een DNA-streng. DNA-polymerase plakt nieuwe nucleotiden altijd aan het 3'-uiteinde: de nieuwe streng groeit van 5' naar 3'.", "vwo": True},
  {"t": "primer", "d": "Kort startstukje van RNA waaraan DNA-polymerase kan beginnen; gemaakt door het enzym primase.", "vwo": True},
  {"t": "replicatievork", "d": "De plek waar de twee strengen uit elkaar gaan en de nieuwe strengen worden gebouwd.", "vwo": True},
  {"t": "leidende streng", "d": "Nieuwe streng die continu, met de vork mee, wordt gebouwd.", "vwo": True},
  {"t": "volgende streng", "d": "Nieuwe streng die in korte stukken van de vork af wordt gebouwd (Okazaki-fragmenten); ligase plakt de stukken aan elkaar.", "vwo": True},
  {"t": "Okazaki-fragmenten", "d": "Korte stukken nieuw DNA op de volgende streng, elk begonnen met een eigen primer.", "vwo": True},
  {"t": "RNA-polymerase", "d": "Enzym dat één gen overschrijft naar RNA (transcriptie).", "vwo": True},
  {"t": "reverse transcriptase", "d": "Enzym van sommige virussen dat met RNA als voorbeeld DNA maakt.", "vwo": True},
  {"t": "DNA-repair-enzymen", "d": "Enzymen die verkeerd ingebouwde nucleotiden opsporen en vervangen.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
