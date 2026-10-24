import json
film = {
 "slug": "biomedisch-3-van-lab-tot-patient", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van lab tot patiënt", "sub": "hoe een nieuw medicijn of vaccin getest wordt",
 "puzzle": "Waarom duurt het meestal meer dan tien jaar voordat een nieuw medicijn bij de apotheek ligt?",
 "meta": "biomedische wetenschappen · geneesmiddelenonderzoek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biomedische wetenschappen",
 "lead": "Opa Henk doet mee aan een onderzoek naar een nieuw medicijn tegen hartfalen. De stof werd meer dan tien jaar geleden in een lab gemaakt. Daarna volgden proeven op cellen en met dieren, onder strenge regels en met de drie V's, en drie fasen met mensen. In fase 3 vergelijk je eerlijk: loten, een placebo en dubbelblind. Pas dan beoordelen het EMA en het CBG het middel, en ook daarna blijven artsen en patiënten bijwerkingen melden.",
 "endHaak": "zou jij meedoen aan een geneesmiddelenonderzoek, en wat zou je eerst willen weten?",
 "minis": {"Hoofdstuk 1": "Wat zijn de drie V's?", "Hoofdstuk 2": "Wat onderzoek je in fase 1, 2 en 3?", "Hoofdstuk 3": "Waarom loten, een placebo en dubbelblind?", "Hoofdstuk 4": "Hoe ontdek je een zeldzame bijwerking?", "Recap": "Waar werkt een biomedisch wetenschapper?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Dr. Kim en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom duurt het meestal zo lang voordat een nieuw medicijn bij de apotheek ligt?", "correct": 1, "explain": "Elke stap, van lab en dierproef tot fase 1, 2 en 3, moet laten zien dat de stof veilig is en werkt, en na elke stap vallen er stoffen af. De beoordeling zelf duurt ruim een jaar."},
  "q05": {"q": "Een onderzoeker geeft ratten na een ingreep pijnstilling en stopt de proef bij een dier dat te ziek wordt. Welke V is dat?", "correct": 2, "explain": "Verfijnen: minder lijden per dier. Verminderen = minder dieren; vervangen = een proef zonder dieren."},
  "q09": {"q": "Waarom mag ook de onderzoeker niet weten welke pil Henk krijgt?", "correct": 0, "explain": "Wie het weet, vraagt, meet en noteert onbewust anders. Daarom weten patiënt en onderzoeker het allebei niet: dubbelblind."},
  "q12": {"q": "Een bijwerking komt bij één op de honderdduizend mensen voor. Hoe ontdek je die?", "correct": 1, "explain": "In fase 3 doen maar een paar duizend mensen mee. Na de toelating melden artsen en patiënten bijwerkingen, bij Lareb; die zoekt naar patronen en geeft signalen door aan het CBG."}
 },
 "glossary": [
  {"t": "geneesmiddelenonderzoek", "d": "De weg van een nieuwe stof: lab (cellen), dierproeven, fase 1, 2 en 3 met mensen, toelating en bewaking."},
  {"t": "drie V's", "d": "Vervangen (proef zonder dieren), verminderen (minder dieren) en verfijnen (minder lijden per dier); verplicht bij elke dierproef."},
  {"t": "Centrale Commissie Dierproeven (CCD)", "d": "Geeft in Nederland de vergunning voor een dierproef, na advies van een dierexperimentencommissie die doel en ongerief afweegt."},
  {"t": "medisch-ethische commissie", "d": "Keurt een onderzoek met mensen vooraf goed; deelnemers krijgen uitleg, tekenen zelf en mogen altijd stoppen."},
  {"t": "fase 1, 2 en 3", "d": "Fase 1: kleine groep, vaak gezond, veiligheid. Fase 2: een paar honderd patiënten, werkt het en welke dosis. Fase 3: honderden tot duizenden patiënten, werkzaamheid en bijwerkingen."},
  {"t": "placebo", "d": "Een nep-pil die er precies hetzelfde uitziet als het echte middel."},
  {"t": "dubbelblind", "d": "Deelnemer én onderzoeker weten niet wie wat krijgt; pas aan het eind gaat de code open."},
  {"t": "loten (randomiseren)", "d": "Toeval verdeelt de deelnemers over de groepen, zodat die gemiddeld gelijk zijn."},
  {"t": "EMA, CBG en Lareb", "d": "EMA: Europees Geneesmiddelenbureau, beoordeelt nieuwe middelen met experts uit alle EU-landen. CBG: het Nederlandse College ter Beoordeling van Geneesmiddelen. Lareb: hier meld je bijwerkingen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
