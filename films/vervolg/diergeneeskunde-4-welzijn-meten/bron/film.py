import json
film = {
 "slug": "diergeneeskunde-4-welzijn-meten", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welzijn meten", "sub": "hoe gaat het met dit dier?",
 "puzzle": "Een varken bijt in de staart van een ander. Wat zegt dat over hoe het met hem gaat?",
 "meta": "diergeneeskunde · dierhouderij · dierenwelzijn", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Diergeneeskunde",
 "lead": "Een varken bijt in de staart van een ander. Dat is geen agressief varken, maar een alarmsignaal: varkens willen wroeten en kauwen, en vinden ze daarvoor niets, dan richten ze het op elkaar. Welzijn ging lang over de vijf vrijheden; nu kijken onderzoekers ook naar hoe een dier zich voelt. Je meet het met stereotiep gedrag, cortisol en metingen aan het dier zelf, zoals kreupelheid en vluchtafstand. En dierenarts en veehouder verbeteren het samen, met een gezondheidsplan.",
 "endHaak": "aan welk signaal zou jij zien dat het met je eigen huisdier niet goed gaat?",
 "minis": {"Hoofdstuk 1": "Wat is welzijn?", "Hoofdstuk 2": "Welke signalen kun je meten?", "Hoofdstuk 3": "Kijk je naar de stal of naar het dier?", "Hoofdstuk 4": "Wat doen dierenarts en veehouder samen?", "Recap": "Wat was het bijtende varken?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dierenarts Mila en Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een varken bijt in de staart van een ander. Wat zegt staartbijten vooral?", "correct": 2, "explain": "Dat er iets mis is in hoe de varkens worden gehouden: zonder iets om op te wroeten en kauwen richten ze dat gedrag op elkaar."},
  "q09": {"q": "Mila vergelijkt een nieuwe en een oude stal. Waar kijkt ze vooral naar?", "correct": 1, "explain": "Naar de dieren zelf: kreupelheid, huid en hakken, lichaamsconditie en hoe ze op een mens reageren. Een mooie stal zegt nog niet hoe het dier zich voelt."}
 },
 "glossary": [
  {"t": "dierenwelzijn", "d": "Hoe het met een dier gaat, lichamelijk en in hoe het zich voelt; niet alleen de afwezigheid van honger, pijn en angst."},
  {"t": "vijf vrijheden", "d": "Vrij van honger en dorst, van ongemak, van pijn en ziekte, van angst en stress, en vrij om natuurlijk gedrag te vertonen."},
  {"t": "vijf domeinen", "d": "Model waarin voeding, omgeving, gezondheid en gedrag samen de mentale toestand van een dier bepalen, met ook positieve ervaringen."},
  {"t": "staartbijten", "d": "Varkens die in elkaars staart bijten; een signaal van een tekort in de omgeving, zoals niets om op te wroeten, weinig ruimte of slechte lucht."},
  {"t": "stereotiep gedrag", "d": "Steeds precies hetzelfde gedrag zonder duidelijk doel, zoals kribbebijten bij paarden of tongrollen bij kalveren; vaak een teken van een langdurig tekort."},
  {"t": "cortisol", "d": "Stresshormoon dat je bij dieren kunt meten in speeksel, mest en haar; stijgt ook bij opwinding en inspanning, dus nooit het enige signaal."},
  {"t": "diergerichte meting", "d": "Meting aan het dier zelf, zoals kreupelheid, wonden, lichaamsconditie en vluchtafstand, in plaats van aan de stal."},
  {"t": "couperen", "d": "Een stuk van de staart van biggen verwijderen om staartbijten te voorkomen; volgens EU-regels niet als vaste gewoonte toegestaan."},
  {"t": "bedrijfsgezondheidsplan", "d": "Plan dat dierenarts en veehouder samen maken en geregeld bijwerken, met afspraken over gezondheid en welzijn op het bedrijf."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
