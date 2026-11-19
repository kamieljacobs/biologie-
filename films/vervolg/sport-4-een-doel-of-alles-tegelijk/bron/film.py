import json
film = {
 "slug": "sport-4-een-doel-of-alles-tegelijk", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Eén doel of alles tegelijk?", "sub": "trainen voor een heel seizoen",
 "puzzle": "Je wilt sneller, sterker én langer kunnen zwemmen. Kun je dat allemaal tegelijk trainen?",
 "meta": "sport en topsport · trainingsleer", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Aan het begin van het seizoen wil de zwemmer drie dingen tegelijk: sneller op de 100 meter, sterker van het startblok en langer volhouden op de 400. De zwemtrainer laat op zijn klembord een oude proef zien (Hickson, 1980): wie alleen kracht traint, wordt sterker, wie alleen duur traint, fitter. En wie allebei doet? Je ziet waar doelen botsen (het interferentie-effect, vooral bij explosieve kracht), waar ze elkaar helpen (een aerobe basis bij het herstel tussen snelle herhalingen), hoe een trainer een seizoen in blokken plant en afbouwt naar het toernooi, en waarom herstel een vast onderdeel van het plan is.",
 "endHaak": "welk hoofddoel zou jij je eerste blok geven, en wat houd je op peil?",
 "minis": {"Hoofdstuk 1 — Je wordt goed in wat je traint": "Wordt een krachtgroep ook fitter?",
           "Hoofdstuk 2 — Doelen die botsen, en doelen die helpen": "Wat gebeurt er als je kracht en duur samen traint?",
           "Hoofdstuk 3 — Het seizoen in blokken, en afbouwen": "Waarom train je minder vlak voor een toernooi?",
           "Hoofdstuk 4 — Herstel hoort bij de training": "Wanneer word je eigenlijk sterker?",
           "Recap": "Kun je alles tegelijk trainen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: de zwemmer (castboek, outfit zwem), de zwemtrainer, een sportarts en een inspanningsfysioloog (figurant, castboek); geen namen in beeld. Decor: het zwembad van de reeks. Getallen uit o.a. Hickson 1980, Schumann e.a. 2021, Tomlin &amp; Wenger 2001, Mujika e.a. 2002, Meeusen e.a. 2013 en Walsh e.a. 2021 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q05": {"q": "Een derde groep deed het krachtprogramma én het duurprogramma. Zeven weken lang werd ze net zo snel sterker als de krachtgroep. Wat gebeurt er de laatste drie weken met haar kracht?", "correct": 1,
          "explain": "Na week zeven stopt de kracht met stijgen, en in week 9 en 10 zakt hij zelfs wat. De conditie groeit gewoon door. Dit heet het interferentie-effect: train je twee doelen tegelijk, dan valt de winst op één ervan kleiner uit; hier de kracht (Hickson 1980)."},
  "q08": {"q": "De trainer laat acht keer vijftig meter zwemmen, snel, met korte rust. Wat heeft een sprinter dan aan rustige meters?", "correct": 2,
          "explain": "Met een goede aerobe basis herstelt een sprinter sneller tussen de herhalingen: zijn spieren vullen in de korte rust hun energievoorraad vaak sneller weer aan, dus hij zakt minder in tijd. Zijn topsnelheid op één sprint wordt er niet hoger van."},
  "q11": {"q": "Dan het hele seizoen. Hoe plant een trainer dat volgens de trainingsleer?", "correct": 0,
          "explain": "In blokken van een paar weken, elk met een eigen hoofddoel (periodiseren). Wat geen hoofddoel is, blijft met minder training op peil. Welke verdeling het best werkt, is nog niet met proeven vastgesteld."},
  "q14": {"q": "Drie weken voor het belangrijkste toernooi zwemt de zwemmer veel minder meters, maar wel in wedstrijdtempo. Wat gebeurt er met zijn tijd?", "correct": 2,
          "explain": "Zijn tijd wordt korter: hij zwemt sneller. Dit heet taperen; het idee is dat de vermoeidheid sneller zakt dan de fitheid. Bij de Spelen van Sydney (2000) waren 91 van de 99 races sneller dan drie weken eerder, gemiddeld ruim 2 % (daarin zit ook de spanning van de Spelen)."},
  "q18": {"q": "Na weken zwaar trainen zwemt de zwemmer steeds trager. Hij slaapt slecht en heeft nergens zin in. Wat is verstandig?", "correct": 1,
          "explain": "Minder trainen en het bespreken met de trainer en een sportarts. Extra trainen maakt het erger, en na één week rust meteen terug naar het oude niveau is te snel: herstel van overtraining kan weken tot maanden duren. De klachten kunnen ook andere oorzaken hebben; daarom kijkt een arts mee."}
 },
 "glossary": [
  {"t": "specifiek trainen", "d": "Je lichaam past zich aan aan precies wat je traint: krachttraining maakt je vooral sterker, duurtraining vooral fitter."},
  {"t": "interferentie-effect", "d": "Train je twee doelen tegelijk, dan valt de winst op één ervan kleiner uit; meestal de kracht, vooral explosieve kracht. De conditie groeit gewoon door."},
  {"t": "explosieve kracht", "d": "Kracht die je in heel korte tijd levert, zoals bij een sprong of de afzet van het startblok."},
  {"t": "aerobe basis", "d": "Hoe goed je lichaam langdurig energie met zuurstof kan leveren. Een goede aerobe basis helpt je herstellen tussen snelle herhalingen."},
  {"t": "periodiseren", "d": "Het seizoen opdelen in blokken van een paar weken, elk met een eigen hoofddoel; de andere doelen blijven met minder training op peil."},
  {"t": "taperen", "d": "De laatste weken vóór de belangrijkste wedstrijd (meestal twee tot vier) veel minder meters zwemmen, wel in wedstrijdtempo, zodat je fris en op je best bent."},
  {"t": "herstel", "d": "De uren en dagen na een training waarin je lichaam zich aanpast; slaap, genoeg eten en drinken en rustdagen horen erbij en staan in het plan."},
  {"t": "overtraining", "d": "Langdurig minder presteren doordat belasting en herstel niet in balans zijn. Ook school, weinig slaap en te weinig eten tellen als belasting."},
  {"t": "inspanningsfysioloog", "d": "Onderzoeker die meet hoe het lichaam reageert op training en inspanning, bijvoorbeeld met proeven zoals die van Hickson. Opleiding: Bewegingswetenschappen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
