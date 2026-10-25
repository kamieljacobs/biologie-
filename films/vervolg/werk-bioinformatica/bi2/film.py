import json
film = {
 "slug": "bioinformatica-2-welke-variant-maakt-ziek", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een miljoen varianten", "sub": "welke maakt ziek?",
 "puzzle": "Een meisje van vier leerde laat lopen en praat nog bijna niet. In haar DNA zitten miljoenen verschillen. Hoe vind je de ene die verklaart waarom?",
 "meta": "bio-informatica · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Bio-informatica",
 "lead": "Sam loopt een dag mee met Dr. Kim, klinisch geneticus. Het DNA van een meisje van vier en haar ouders is gelezen; een computer legt de stukjes tegen het referentiegenoom en vindt ruim vier miljoen varianten. Dat is normaal: de meeste doen niets. Een algoritme filtert: verandert de variant het eiwit, is hij zeldzaam in een databank, past hij bij de familie? Zo blijft er één nieuwe variant over, de novo. Maar het gen is weinig onderzocht: een variant met onbekende betekenis, geen diagnose. Bij veelvoorkomende ziekten zoek je met een GWAS naar heel veel kleine effecten, met een veel strengere grens, en tel je ze op tot een polygene risicoscore: een kans, geen diagnose.",
 "endHaak": "hoe weet je van welke patiënt een bacterie komt?",
 "minis": {"Hoofdstuk 1": "Is iemand met miljoenen varianten ziek?",
           "Hoofdstuk 2": "Hoe maak je van ruim vier miljoen varianten er een paar?",
           "Hoofdstuk 3": "Wat zeg je als de laatste variant een onbekende betekenis heeft?",
           "Hoofdstuk 4": "Waarom is 0,05 te soepel als je een miljoen keer test?",
           "Recap": "Hoe vind je de ene variant?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam en Dr. Kim (castboek); de ouders zijn figuranten zonder naam. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "De lijst van het meisje is ruim vier miljoen regels lang. 'Is ze daarom ziek?' vraagt Sam. Wat denk je?", "correct": 1,
          "explain": "Ieder mens verschilt op vier tot vijf miljoen plekken van het referentiegenoom, en de meeste varianten doen niets. Een variant is een verschil, geen fout."},
  "q10": {"q": "Vader en moeder zijn gezond. Hoeveel eiwitvarianten heeft het meisje die geen van haar ouders heeft?", "correct": 2,
          "explain": "Elk kind heeft tientallen nieuwe veranderingen die ontstonden in de zaadcel of de eicel. In de eiwitcode zijn het er meestal één of twee: de-novovarianten."},
  "q15": {"q": "De laatste variant heeft een onbekende betekenis. 'Is dit het nu?' vraagt de vader. Wat vertelt Dr. Kim?", "correct": 1,
          "explain": "Overblijven is geen bewijs: een variant met onbekende betekenis is geen diagnose. Je kiest er geen behandeling op. Maar het is ook niet 'er is niets': we weten het nog niet."},
  "q20": {"q": "Je test een miljoen plekken, maar geen enkele plek doet iets. Hoeveel treffers krijg je met de grens 0,05 door toeval?", "correct": 2,
          "explain": "0,05 × 1 000 000 = 50 000. Daarom gebruikt een GWAS een veel strengere grens: 0,05 gedeeld door een miljoen."},
  "q23": {"q": "Hoe goed werkt een polygene risicoscore bij iemand met Afrikaanse voorouders?", "correct": 0,
          "explain": "De meeste deelnemers aan GWAS hebben Europese voorouders. De gemeten plek is vaak de buurman van de oorzaak, en welke buren samen overerven verschilt per afkomst. Daardoor voorspelt de score minder goed."}
 },
 "glossary": [
  {"t": "variant", "d": "Een plek waar iemands DNA afwijkt van het referentiegenoom. Ieder mens heeft er vier tot vijf miljoen; de meeste doen niets. Een variant is een verschil, geen fout."},
  {"t": "referentiegenoom", "d": "Een afgesproken voorbeeldgenoom waarmee je iemands DNA vergelijkt."},
  {"t": "algoritme", "d": "Een vast stappenplan dat een computer uitvoert, zoals de filters die van miljoenen varianten er een paar overhouden."},
  {"t": "databank", "d": "Een openbare verzameling van sequenties met wat erover bekend is, waarin iedereen kan zoeken. Hier: het DNA van honderdduizenden mensen, om te zien hoe vaak een variant voorkomt."},
  {"t": "de novo", "d": "Een nieuwe variant die bij geen van de ouders voorkomt. Hij ontstond in de zaadcel of de eicel en zit daardoor in elke cel van het kind."},
  {"t": "variant met onbekende betekenis", "d": "Een variant waarvan het lab nog niet weet of hij onschuldig of ziekmakend is (het middelste van vijf klassen). Ouders horen dan: een onduidelijke uitslag. Het is geen diagnose."},
  {"t": "GWAS (genoombrede associatiestudie)", "d": "Onderzoek waarin je bij duizenden mensen met en zonder een ziekte ongeveer een miljoen plekken in het DNA tegelijk vergelijkt. Omdat je zo vaak test, geldt een veel strengere grens dan 0,05."},
  {"t": "polygene risicoscore", "d": "Optelsom van heel veel kleine effecten van varianten. Vergelijkt iemands aanleg met die van anderen: een kans, geen diagnose. Werkt minder goed bij mensen met andere voorouders dan de onderzochte groep."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
