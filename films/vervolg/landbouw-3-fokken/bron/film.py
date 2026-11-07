import json
film = {
 "slug": "landbouw-3-fokken", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Fokken: selecteren, inteelt en de fokwaarde", "sub": "jij kiest de ouders",
 "puzzle": "Hoe kan een koe nu twee keer zoveel melk geven als in 1970?",
 "meta": "landbouw en dierhouderij · fokken en erfelijkheid", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Landbouw en dierhouderij",
 "lead": "Rond 1970 gaf een koe ruim vierduizend kilo melk per jaar, nu bijna tienduizend. Yasmin loopt stage op een melkveebedrijf, en jij bent de fokker: jij kiest de ouders. Melk hangt niet af van één gen, maar van heel veel genen én van voer en verzorging. Daarom schatten fokkers de erfelijke aanleg van een dier met een fokwaarde: vroeger pas na jaren wachten op dochters, nu binnen een paar weken met een DNA-test bij het kalf. Maar wie steeds dezelfde topstier kiest, maakt het ras één familie: dan komen verborgen recessieve allelen vaker dubbel voor.",
 "endHaak": "welke eigenschap zou jij in een ras willen bewaren, ook al levert hij nu geen extra melk op?",
 "minis": {"Hoofdstuk 1": "Wat doe je als je kunstmatig selecteert?", "Hoofdstuk 2": "Waarom geven de dochters van een topkoe minder melk dan zij?", "Hoofdstuk 3": "Hoe schat je de fokwaarde van een kalf zonder te wachten?", "Hoofdstuk 4": "Waarom mislukt vaker een dracht als je steeds dezelfde stier kiest?", "Recap": "Hoeveel van de extra melk komt door fokken?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Opa Henk, Bilal en Veehouder Gerrit (castboek). Decor: ElevenLabs (stal van het melkveebedrijf). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een koe geeft nu ruim twee keer zoveel melk als rond 1970. Hoeveel van die extra melk komt door fokken?", "correct": 2, "explain": "Ongeveer de helft. Twee dingen veranderden tegelijk: beter voer en verzorging, én beter fokken. Die verdeling komt uit schattingen uit het buitenland."},
  "q09": {"q": "Jij kiest de koeien met de meeste melk als moeder. Later zet je hun dochters op een rij, van weinig naar veel melk. Hoe ziet jouw rij eruit?", "correct": 1, "explain": "Een vloeiende reeks: er is geen 'melkgen' zoals bij de erwten van Mendel. Melk hangt af van heel veel genen, meestal met een klein effect, en van de omgeving."},
  "q12": {"q": "Jouw topkoe geeft de meeste melk. Hoeveel melk geven haar dochters?", "correct": 2, "explain": "Meestal minder dan zij, maar meer dan gemiddeld. Een moeder geeft gemiddeld de helft van haar erfelijke aanleg door, welke helft is toeval, en haar melk kwam deels door goed voer; dat erft niet."},
  "q16": {"q": "Je zoekt een stier voor je koeien. Een stier geeft toch geen melk? Welke stier kies jij?", "correct": 0, "explain": "De stier van wie de dochters veel melk geven. Een stier geeft zelf geen melk, maar draagt wel genen voor melk; vroeger zag je zijn fokwaarde pas aan zijn dochters, na zo'n vijf jaar."},
  "q20": {"q": "Een paar haren uit de staart van een stierkalfje gaan in een buisje naar het lab. Wat gebeurt daar met het DNA van het kalf?", "correct": 2, "explain": "Het DNA wordt gelezen en vergeleken met het DNA van de referentiegroep, niet veranderd: geen genetische modificatie. Een DNA-chip leest tienduizenden merkers."},
  "q25": {"q": "Na een paar generaties krijgen de kleindochters van jouw topstier kalveren van zijn kleinzonen. Nu mislukt vaker een dracht. Hoe kan dat?", "correct": 1, "explain": "Inteelt: een kalf krijgt vaker van vader én moeder hetzelfde allel. Een schadelijk recessief allel dat er al was, komt zo vaker dubbel voor. Inteelt maakt geen nieuwe allelen."}
 },
 "glossary": [
  {"t": "kunstmatige selectie", "d": "De mens kiest welke dieren ouders worden; zo verschuift een ras generatie na generatie de kant op die de fokker wil."},
  {"t": "kunstmatige inseminatie", "d": "Een inseminator brengt het sperma van een stier met een rietje in de koe; de stier hoeft niet zelf te dekken. Het sperma kan worden ingevroren, en één keer afnemen is genoeg voor honderden koeien."},
  {"t": "erfelijkheidsgraad", "d": "Welk deel van de verschillen tussen dieren in een groep door verschillen in genen komt (van 0 tot 1). Voor melk ongeveer een derde tot de helft, voor vruchtbaarheid vaak minder dan een tiende. Het zegt niets over de melk van één koe."},
  {"t": "fokwaarde", "d": "Een schatting van de erfelijke aanleg van een dier; een ouder geeft daarvan gemiddeld de helft door. Fokkers schatten hem uit familie, nakomelingen of DNA."},
  {"t": "merker (DNA-merker)", "d": "Een vast plekje in het DNA dat een DNA-chip afleest. Meestal geen gen voor melk, maar een wegwijzer: hij ligt dicht bij stukjes DNA die wél iets doen."},
  {"t": "referentiegroep", "d": "Duizenden stieren van wie het DNA én de melk van hun dochters bekend zijn; daarmee wordt het DNA van een kalf vergeleken."},
  {"t": "genomische selectie", "d": "Fokdieren kiezen op een fokwaarde uit hun DNA: de merkers van een kalf worden vergeleken met de referentiegroep. Het DNA wordt alleen gelezen, niet veranderd. In Nederland sinds 2010."},
  {"t": "inteelt", "d": "Familie die jongen krijgt met familie. Een jong krijgt dan vaker van vader én moeder hetzelfde allel (homozygoot), zodat verborgen recessieve allelen vaker dubbel voorkomen. Inteelt maakt geen nieuwe allelen."},
  {"t": "drager", "d": "Een dier met één kopie van een schadelijk recessief allel. Het is zelf gezond, maar kan het allel doorgeven."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
