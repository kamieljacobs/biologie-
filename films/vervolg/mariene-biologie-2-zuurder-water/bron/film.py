import json
film = {
 "slug": "mariene-biologie-2-zuurder-water", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Zuurder water", "sub": "oceaanverzuring en de eerste schelp",
 "puzzle": "De zee neemt ruim een kwart van onze CO₂ op. Waarom is dat slecht nieuws voor een oester?",
 "meta": "mariene biologie · oceaanverzuring", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Mariene biologie",
 "lead": "Sam loopt snuffelstage in het lab met aquaria van een instituut voor zeeonderzoek aan de Noordzee. De mariene bioloog legt een dossier voor hem neer: in een oesterkwekerij in Oregon gingen rond 2007 ineens de larven dood. Blad voor blad zie je hoe CO₂ in zeewater koolzuur en H⁺ geeft, waarom zeewater basisch blijft maar toch 26 % meer H⁺ krijgt, hoe H⁺ het carbonaat wegpakt dat een oester nodig heeft voor haar schelp, waarom juist de larven het eerst sterven, en waarom de stempel 'oorzaak' pas mag na een proef met een controlegroep. Tot slot: wat het betekent dat de zee een koolstofput is.",
 "endHaak": "welke andere kalkbouwer in de Noordzee zou jij willen onderzoeken?",
 "minis": {"Hoofdstuk 1": "Wat doet CO₂ met zeewater?", "Hoofdstuk 2": "Waarom wordt bouwen moeilijker?", "Hoofdstuk 3": "Wanneer mag de stempel erop?", "Hoofdstuk 4": "Wat kost het dat de zee CO₂ opneemt?", "Recap": "Slecht nieuws voor een oester?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam (stagiair) en de mariene bioloog (castboek). De casus is de kwekerij uit Barton e.a. 2012 (Oregon); de proef komt uit Kurihara e.a. 2007 (Japan), met Timmins-Schiffman e.a. 2013, Ries e.a. 2009, Kroeker e.a. 2013 en Gazeau e.a. 2007 (Yerseke). Getallen: IPCC, EEA, NOAA, WHOI en Global Carbon Budget 2025. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q05": {"q": "De pH van open zee zakte van ongeveer 8,2 naar 8,1. Is zeewater dan zuur?", "correct": 0, "explain": "Zuur is alles onder pH 7. Zeewater zit rond 8,1 en is dus basisch. 'Zuurder' betekent hier: minder basisch. Het blijft basisch, ook als de pH verder daalt."},
  "q07": {"q": "Eén hele stap omlaag op de pH-schaal is tien keer zoveel H⁺. Hoeveel meer H⁺ geeft een stapje van 0,1?", "correct": 2, "explain": "De pH-schaal telt in stappen van tien. Een stapje van 0,1 is 10 tot de macht 0,1 ≈ 1,26 keer zoveel H⁺: ongeveer 26 % meer, dus ruim een kwart. Een daling die klein lijkt, is dat niet."},
  "q10": {"q": "Een oester bouwt haar schelp van kalk uit calcium en carbonaat uit het zeewater. Wat doet de extra H⁺ met dat bouwen?", "correct": 1, "explain": "H⁺ hecht zich aan carbonaat en maakt er bicarbonaat van. Dat is geen bouwsteen meer voor kalk. Calcium blijft er genoeg; het tekort zit in het carbonaat. Volwassen schelpen lossen in de meeste proeven pas bij heel veel CO₂ echt op."},
  "q13": {"q": "In de kwekerij stierven vooral de larven. Waarom juist zij?", "correct": 0, "explain": "Een oesterlarve bouwt haar eerste schelp in een paar uur, al op haar eerste dag, en die moet binnen twee dagen af zijn om te kunnen eten. Dat kost veel energie. Onderzoekers denken dat er in zuurder water te weinig overblijft om te zwemmen en voedsel te vangen."},
  "q16": {"q": "De sterfte en het CO₂-rijke diepe water kwamen samen voor. Mag je nu de stempel 'oorzaak' zetten?", "correct": 1, "explain": "Samen voorkomen is geen bewijs: in dat diepe water kan ook iets anders zitten. Pas een proef waarin je alleen de CO₂ verandert en de rest gelijk houdt (met een controlegroep), laat zien of CO₂ zelf het effect geeft."},
  "q21": {"q": "Hoe meer CO₂ de zee opneemt, hoe zuurder het water. Krijgen alle kalkbouwers het even zwaar?", "correct": 2, "explain": "In een proef met achttien soorten bouwden er tien minder kalk, maar krabben en kreeften juist meer. In Yerseke was de mossel veel gevoeliger dan de oester. Larven van weekdieren horen bij de gevoeligste. Eén soort zegt niet alles."}
 },
 "glossary": [
  {"t": "mariene biologie", "d": "Het vak dat het leven in zee onderzoekt: soorten, populaties en hoe ze reageren op veranderingen in het water, op zee, op het wad en in het lab."},
  {"t": "pH", "d": "Maat voor hoe zuur water is; lager = zuurder. Onder 7 is zuur, 7 is neutraal, boven 7 is basisch. Eén hele stap omlaag is tien keer zoveel H⁺."},
  {"t": "oceaanverzuring", "d": "De daling van de pH van zeewater doordat de zee CO₂ uit de lucht opneemt. Sinds ± 1750 van ± 8,2 naar ± 8,1 in open zee: het water blijft basisch, maar wordt minder basisch."},
  {"t": "koolzuur", "d": "Wat CO₂ en water samen vormen. Koolzuur laat H⁺ los."},
  {"t": "H⁺", "d": "Het deeltje dat water zuurder maakt. Hoe meer H⁺, hoe lager de pH. Een pH die 0,1 lager is, betekent ± 26 % meer H⁺."},
  {"t": "carbonaat", "d": "Bouwstof die samen met calcium kalk vormt. H⁺ hecht zich aan carbonaat en maakt er bicarbonaat van; dat is geen bouwsteen meer voor kalk."},
  {"t": "kalk (calciumcarbonaat)", "d": "Waar schelpen en koraal van gemaakt zijn: calcium en carbonaat uit het zeewater, vastgezet tot een harde laag."},
  {"t": "controlegroep", "d": "De groep zonder de factor die je onderzoekt, verder precies gelijk (zie Onderzoek doen). Hier: larven in gewoon zeewater (pH 8,2) naast larven in water met veel extra CO₂ (pH 7,4)."},
  {"t": "koolstofput", "d": "Een plek die meer koolstof opneemt dan afgeeft. De oceaan haalt elk jaar ruim een kwart van onze CO₂-uitstoot uit de lucht; de prijs is zuurder water."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
