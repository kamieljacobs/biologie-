import json
film = {
 "slug": "tandheelkunde-2-van-glazuur-tot-zenuw", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van glazuur tot zenuw", "sub": "een gaatje bij de tandarts",
 "puzzle": "Waarom doet een gaatje pas pijn als het al diep is?",
 "meta": "tandheelkunde · diagnose en behandeling", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tandheelkunde en mondzorg",
 "lead": "Lotte voelt een steek bij een hap ijs, maar het gaatje zat er al een jaar. In glazuur zitten geen zenuwen; pas als een gaatje in het tandbeen komt, kan een prikkel via de vochtige kanaaltjes de zenuw in de pulpa bereiken. Tandarts Wouter zoekt gaatjes met spiegel en röntgenfoto, en boort pas als het moet: een beginnende ontkalking kan nog herstellen. Raakt de pulpa ontstoken, dan doet de zwelling in de harde tand veel pijn, en volgt een wortelkanaalbehandeling.",
 "endHaak": "wanneer was jouw laatste controle, en wat zag de tandarts op de foto?",
 "minis": {"Hoofdstuk 1": "Waarom voelt glazuur niets?", "Hoofdstuk 2": "Waarom boort de tandarts niet meteen?", "Hoofdstuk 3": "Hoe gaat een vulling?", "Hoofdstuk 4": "Waarom doet een ontstoken pulpa zo'n pijn?", "Recap": "Waarom voelde Lotte het gaatje zo laat?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Tandarts Wouter en Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lottes gaatje deed een jaar geleden nog geen pijn. Waarom niet?", "correct": 1, "explain": "In het glazuur zitten geen zenuwen. Pas als het gaatje in het tandbeen komt, kan een prikkel via de kanaaltjes de zenuw bereiken."},
  "q09": {"q": "Wouter ziet een donker vlekje dat alleen in het glazuur zit. Wat doet hij?", "correct": 2, "explain": "Afwachten met fluoride, goed poetsen (ook tussen de kiezen) en later een nieuwe foto: een beginnende ontkalking kan nog herstellen, en elke vulling maakt het gat op den duur groter."},
  "q13": {"q": "Waarom doet een ontsteking in de pulpa zoveel pijn?", "correct": 0, "explain": "De pulpa zit opgesloten in harde tand. De zwelling kan nergens heen en drukt op de zenuw."}
 },
 "glossary": [
  {"t": "glazuur", "d": "Buitenste laag van de tand: bijna helemaal mineraal, zonder cellen en zenuwen; het hardste materiaal in je lichaam."},
  {"t": "tandbeen", "d": "Laag onder het glazuur (dentine), zachter, vol piepkleine kanaaltjes met vocht."},
  {"t": "pulpa", "d": "Zacht weefsel midden in de tand met bloedvaatjes en een zenuw."},
  {"t": "wortelvlies", "d": "Dun vlies van stevige vezels dat de wortel in het kaakbot vasthoudt."},
  {"t": "röntgenfoto", "d": "Foto met röntgenstraling; glazuur en tandbeen houden de straling tegen en blijven licht, een gaatje is een donkere plek."},
  {"t": "ontkalking", "d": "Glazuur dat calcium en fosfaat verliest door zuur; in het begin een wit plekje dat nog kan herstellen."},
  {"t": "vulling", "d": "Kunststof in de kleur van de tand die een gat opvult; in laagjes aangebracht en met blauw licht uitgehard."},
  {"t": "pulpitis", "d": "Ontsteking van de pulpa; de zwelling in de harde tand drukt op de zenuw en geeft een kloppende pijn."},
  {"t": "wortelkanaalbehandeling", "d": "Behandeling waarbij de pulpa wordt verwijderd en de kanaaltjes in de wortel worden schoongemaakt en gevuld."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
