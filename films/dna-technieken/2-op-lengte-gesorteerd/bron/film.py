import json
O = json.load(open('oud_page.json', encoding='utf-8'))
film = {
 "slug": "2-op-lengte-gesorteerd",
 "hoofdstuk": "dna", "hoofdstukNaam": "DNA",
 "title": "Op lengte gesorteerd",
 "sub": "gel-elektroforese",
 "puzzle": "Alle banden van de verdachte passen bij het spoor. Hoe lees je zo’n gelfoto af, en kun je hem vertrouwen?",
 "meta": "dna-technieken 2/2",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · DNA-technieken · film 2 van 2 · vorige: <a href=\"../1-op-maat-gekopieerd/index.html\">Op maat gekopieerd (PCR)</a> · <a href=\"../../../tools/dna-profielen/index.html\">naar het practicum DNA-profielen vergelijken</a>",
 "lead": "Hoe een gel DNA op lengte sorteert, hoe je met de marker een band afleest en het allel uitrekent, en hoe je profielen vergelijkt en controleert. Met dezelfde gel, kit en getallen als het practicum DNA-profielen vergelijken.",
 "endHaak": "Lees nu je eigen gel af in het practicum.",
 "minis": {
  "Hoofdstuk 1": "Waarom komen korte stukken verder dan lange?",
  "Hoofdstuk 2": "Hoe lang is deze band, en welk allel is het?",
  "Hoofdstuk 3": "Past het spoor bij een verdachte?",
  "Hoofdstuk 4": "Kun je deze gel vertrouwen?",
  "Samenvatting — Kort gezegd": "Wat moet je onthouden?"
 },
 "footer": "Stem: Roos (ElevenLabs), één doorlopende take uit versie 1.0, per zin geknipt (niet opnieuw ingesproken). Script, animatie en speler: Kamiel met Claude. Gelmodel, kit, profielen en kansen: gelijk aan het practicum DNA-profielen vergelijken (fictieve profielen). Tekeningen: gedeelde bibliotheek (gelbak, micropipet, PCR-buisje, DNA-draad) en castboek (figuranten). Stijl: Part C van de filmprompt (v13). Model: vereenvoudigd en niet op schaal. Versie 2.0 · 31 oktober 2026.",
 "heleVraag": [],
 "questions": {},
 "glossary": [{"t": html_t, "d": d} for html_t, d in O['terms']]
}
rows = ''.join(f'  <div class="q"><p><b>{n}.</b> {q}</p><details><summary>Antwoord</summary><p>{a}</p></details></div>\n' for n, q, a in O['rows'])
film['sections'] = f'''<section><h2>Checkvragen</h2>
  <p class="meta">antwoorden ingeklapt · zelfde kit en getallen als het practicum</p>
{rows}</section>
<section><h2>Voor de docent</h2>
  <p>De film hoort bij de stap Gelfoto van het practicum <a href="../../../tools/dna-profielen/index.html">DNA-profielen vergelijken</a> en volgt op <a href="../1-op-maat-gekopieerd/index.html">Op maat gekopieerd (PCR)</a>. Hij gebruikt dezelfde kit, marker en getallen: vijf loci, lengte = flank + 4 × n, een marker van 50 bp en een allelladder. De gelfoto heeft dezelfde banen (M50, Eig, Sp, A, B, C, PC, NC, AL), profielen en bandposities als in het practicum.</p>
  <h3>Zo gebruik je de film</h3><ul>{O['zo'].replace('Toetsen: spatie = afspelen/pauze, pijltjes = 5 seconden terug/vooruit, C = ondertitels, F = volledig scherm.', 'De toetsen staan onder de speler (Toetsen).')}</ul>
  <h3>Leerdoelen</h3><ol>{O['lead']}</ol>
  <h3>Hoe de film het uitlegt</h3>
  <table><thead><tr><th>Hoofdstuk</th><th>Look</th><th>Kernbeeld</th></tr></thead><tbody>
  <tr><td>Opening</td><td>Schema</td><td>Doorlopende zoom van het gel-documentatiekastje (Noor ernaast) naar de gelfoto van het practicum; één baan, één band.</td></tr>
  <tr><td>1 Hoe de gel werkt</td><td>Schema + Micro</td><td>Zoomcirkel naar het agarose-netwerk; putje in doorsnede met micropipet en zware laadbuffer; dna-stuk met min-tekens tussen min- en pluspool; gelbak uit de bibliotheek (min boven, zoals de foto); kort glipt, lang haakt; drie lengtes in één baan; kopieën worden één band; 1 % tegen 4 %; ongekleurde gel en blauw licht.</td></tr>
  <tr><td>2 Lengte aflezen</td><td>Schema</td><td>Marker, spoor en allelladder uitvergroot; lijn naar de marker; ± 140 bp; afstanden tussen markerbanden; lengtegebieden per STR op dezelfde schaal; STR-stuk met flanken en 13 × TCTA; 140 − 88 = 52, 52 : 4 = 13.</td></tr>
  <tr><td>3 Profielen vergelijken</td><td>Schema</td><td>Chromosoom 8 van vader en moeder; één of twee banden; amelogenine; lijnen door de banden van het spoor; B valt af (TPOX 80 bp), A past; toeval in een menigte; kansladder met de allelfrequenties van het practicum.</td></tr>
  <tr><td>4 Controles en rare banden</td><td>Schema</td><td>Negatieve controle (buisje met water, primer-dimeren, tijdelijk besmet), positieve controle (bekend profiel, tijdelijk leeg); stotterband 172/168 bp met een uitgelust herhalingsblok; mengsel bij D3S1358 met de eigenaar.</td></tr>
  </tbody></table>
  <h3>Getallen</h3><ul>
  <li>Kit (gelijk aan het practicum): TPOX 36 + 4n (68–84 bp), amelogenine X 106 / Y 112 bp, D8S1179 88 + 4n (128–152), vWA 108 + 4n (164–184), D3S1358 140 + 4n (196–212).</li>
  <li>Kansladder: TPOX 1 op 16, + D8S1179 1 op 120, + vWA 1 op 2 700, + D3S1358 1 op 20 000: uitgerekend met de allelfrequenties van het practicum (2pq of p²), afgerond. ‘Meer dan 20 STR’s: kleiner dan 1 op een miljard’ is een voorzichtige ondergrens.</li>
  <li>Stotterband: één herhaling (4 bp) korter, ± 10 % van de sterke band. Primer-dimeer ± 46 bp.</li></ul>
  <h3>Vereenvoudigingen</h3><ul>
  <li>Forensische labs scheiden STR’s met capillaire elektroforese en fluorescente primers, niet in agarose; het principe (sorteren op lengte, vergelijken met een ladder) is hetzelfde.</li>
  <li>De afstand in de gel is getekend als lineair met de logaritme van de lengte (zoals in het practicum). Agarose en dna zijn sterk vergroot en niet op schaal.</li>
  <li>Verdachten en eigenaar zijn figuranten uit het castboek, zonder naam.</li></ul>
</section>
'''
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
