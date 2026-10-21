import json
film = {
 "slug": "tandheelkunde-4-een-tand-door-bot", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een tand door bot", "sub": "hoe een beugel werkt",
 "puzzle": "Hoe kan een beugel een tand door bot verplaatsen?",
 "meta": "tandheelkunde · orthodontie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tandheelkunde en mondzorg",
 "lead": "Noors hoektand schuift met een beugel een paar millimeter op, door hard kaakbot. Een tand hangt met het wortelvlies in het bot, en bot is levend weefsel: aan de drukkant breken cellen het bot af, aan de trekkant bouwen ze nieuw bot op. Harder duwen gaat niet sneller, want dan sterft een stukje wortelvlies af. Na de beugel willen tanden terug; een draadje houdt ze op hun plek. En waarom zijn zoveel kaken te klein? Vooral door ons zachte eten.",
 "endHaak": "welke andere delen van je lichaam passen zich aan aan hoe je ze belast?",
 "minis": {"Hoofdstuk 1": "Hoe zit een tand vast?", "Hoofdstuk 2": "Wat gebeurt er aan de drukkant en de trekkant?", "Hoofdstuk 3": "Waarom een draadje na de beugel?", "Hoofdstuk 4": "Waarom zijn zoveel kaken te klein?", "Recap": "Wie verplaatste Noors tand eigenlijk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Tandarts Wouter en Mondhygiënist Ilse (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe kan een tand met een beugel door hard kaakbot bewegen?", "correct": 2, "explain": "Het bot wordt aan de drukkant afgebroken en aan de trekkant opgebouwd; de tand schuift met zijn hele bed mee."},
  "q09": {"q": "Kan de beugel niet gewoon harder duwen?", "correct": 1, "explain": "Nee: bij te veel druk krijgt het wortelvlies geen bloed meer, sterft een stukje af, en staat de tand stil tot dat is opgeruimd."},
  "q13": {"q": "Waarom is bij zoveel moderne mensen de kaak te klein voor hun tanden?", "correct": 0, "explain": "Ons eten is zacht; een kaak groeit minder als een kind weinig en zacht hoeft te kauwen. Dat ging te snel voor evolutie; erfelijkheid speelt ook mee."}
 },
 "glossary": [
  {"t": "wortelvlies", "d": "Laag van stevige vezels in de smalle spleet tussen wortel en kaakbot; hangt de tand op en vangt kauwkrachten op."},
  {"t": "botafbrekers", "d": "Cellen die bot oplossen (osteoclasten); aan de drukkant van een tand met een beugel."},
  {"t": "botopbouwers", "d": "Cellen die nieuw bot maken (osteoblasten); aan de trekkant van een tand met een beugel."},
  {"t": "drukkant", "d": "Kant waar de tand naartoe wordt geduwd; het wortelvlies wordt samengeknepen en het bot afgebroken."},
  {"t": "trekkant", "d": "Kant waar de tand vandaan beweegt; de vezels worden uitgerekt en er wordt nieuw bot neergelegd."},
  {"t": "botombouw", "d": "Het voortdurend afbreken en opbouwen van bot, waardoor bot zich aanpast aan hoe het belast wordt."},
  {"t": "retentiedraad", "d": "Dun draadje aan de binnenkant van de tanden dat ze na de beugel op hun plek houdt, vaak jarenlang."},
  {"t": "orthodontist", "d": "Tandarts die zich na de studie vier jaar specialiseert in de stand van tanden en kaken; een van de twee erkende tandheelkundige specialismen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
