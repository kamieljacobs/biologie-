import json
film = {
 "slug": "stamcellen", "hoofdstuk": "cellen", "hoofdstukNaam": "Cellen",
 "title": "Stamcellen", "sub": "Hoe één cel honderden soorten cellen wordt",
 "puzzle": "Een schaafwond op je knie is na twee weken bijna weg. Een stuk hartspier dat na een infarct afsterft, groeit niet terug. Waarom herstelt je huid wel, en je hartspier bijna niet?",
 "meta": "cellen · differentiatie en stamcellen", "version": "2.1 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · Cellen",
 "lead": "Al je lichaamscellen hebben (op een paar uitzonderingen na) hetzelfde DNA. Ze verschillen doordat er in elke celsoort andere genen aan staan: differentiatie. Gespecialiseerde cellen delen zich vaak niet meer. Stamcellen zijn nog niet gespecialiseerd, blijven zich delen en maken nieuwe cellen: in de kiemlaag van je huid, in het beenmerg en in de darm. Volwassen stamcellen maken alleen de celsoorten van hun eigen weefsel; embryonale stamcellen kunnen elke celsoort worden. Toepassingen: stamceltransplantatie bij leukemie en geïnduceerde stamcellen.",
 "endHaak": "welke genen staan er aan, en kan deze cel zich nog delen?",
 "minis": {"Hoofdstuk 1 — Zelfde DNA, andere cel": "Hoe kunnen cellen met hetzelfde DNA zo verschillen?", "Hoofdstuk 2 — Cellen die nog kunnen kiezen": "Wat is een stamcel, en waar zitten ze?", "Hoofdstuk 3 — Stamcellen als medicijn": "Wat kun je met stamcellen, en waar liggen de grenzen?", "Recap": "Waarom herstelt je huid wel, en je hartspier bijna niet?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 2.1 · 30 oktober 2026 (beeld-remake op prompt v13, open punten).",
 "questions": {
  "q02": {"q": "Waarom herstelt je huid wel, en je hartspier bijna niet?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 2."},
  "q07": {"q": "Een zenuwcel uit je hersenen en een spiercel uit je been, van jou. Wat is het verschil in hun DNA?", "correct": 1, "explain": "Hetzelfde DNA: in elke celsoort staan alleen andere genen aan."},
  "q16": {"q": "Kun je met bloedstamcellen ook een beschadigd hart herstellen?", "correct": 2, "explain": "Bloedstamcellen zijn volwassen stamcellen: ze maken alleen de celsoorten van het bloed. Snel genoeg delen ze wel, maar ze kunnen geen hartspier maken."}
 },
 "glossary": [
  {"t": "differentiatie", "d": "Een cel krijgt een eigen bouw en taak doordat er andere genen aan staan; het DNA blijft hetzelfde."},
  {"t": "gedifferentieerde cel", "d": "Gespecialiseerde cel, zoals een zenuwcel of spiercel; deelt zich vaak niet of nauwelijks meer."},
  {"t": "stamcel", "d": "Ongespecialiseerde cel die zich blijft delen; bij een deling blijft er gemiddeld één stamcel over, de andere cel differentieert."},
  {"t": "kiemlaag", "d": "Onderste laag van de opperhuid, met stamcellen; de cellen schuiven omhoog, verhoornen, sterven af en schilferen af."},
  {"t": "volwassen stamcel", "d": "Stamcel in een weefsel (beenmerg, huid, darm); maakt alleen de celsoorten van dat weefsel."},
  {"t": "embryonale stamcel", "d": "Stamcel gekweekt uit de binnenste celmassa van een embryo van ± 5 dagen; kan elke celsoort van het lichaam worden."},
  {"t": "stamceltransplantatie", "d": "Een patiënt krijgt bloedstamcellen van een passende donor, bijvoorbeeld bij leukemie; daarna heeft het bloed het DNA van de donor."},
  {"t": "afstoting", "d": "Het afweersysteem ruimt lichaamsvreemde cellen op; een donor moet daarom bijna dezelfde herkenningseiwitten hebben."},
  {"t": "geïnduceerde stamcel (iPS-cel)", "d": "Gewone lichaamscel die in het lab is teruggezet tot een stamcel die bijna elke celsoort kan worden."},
  {"t": "weefsel", "d": "Groep gelijke cellen met dezelfde taak."},
  {"t": "emergente eigenschap", "d": "Eigenschap van het geheel die de losse delen niet hebben, zoals hartspiercellen die samen in één ritme kloppen."},
  {"t": "transcriptiefactor (vwo)", "d": "Eiwit dat aan de promotor van een gen bindt en zo bepaalt of RNA-polymerase het gen kan overschrijven."},
  {"t": "epigenetica (vwo)", "d": "Chemische markeringen op het DNA en de histonen (bijvoorbeeld methylgroepen) die genen langdurig aan of uit zetten, ook na een deling."},
  {"t": "toti-, pluri-, multi-, unipotent (vwo)", "d": "Hoeveel een cel nog kan worden: alles inclusief placenta · elke celsoort van het lichaam · een paar celsoorten van het eigen weefsel · één celsoort."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
