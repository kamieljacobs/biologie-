# Groep organen-plant — overzicht (8 nieuwe objecten, elk A + B; X/Y = A/B volgens sleutel.json)

| obj | soort | A | B | bewust níet |
|---|---|---|---|---|
| hartDoorsnede | nieuw | anatomisch naar referentieplaat: boezems als dunne kapjes, kamers één snijvlak met vezellijnen, papilspieren + peesdraden, bloed als stroomdeeltjes, cyclus boezems→kamers | rustig schema: gladde holtes, gelijkmatige wanden, open pijlen alleen door een open klep, samentrekkende holte goud omrand | geen geleidingssysteem (sinusknoop) en kransvaten; geen 'ware' 3D |
| longblaasje | nieuw | trosje blaasjes aan bronchiool met haarvatennet (blauw→rood), rode bloedcellen op schaal, O2/CO2-deeltjes, ademen | één blaasje in doorsnede in een micro-venster op schaal (2,3 eenh./µm): buurblaasjes, haarvaten in doorsnede en in de lengte, type II-cel, stofcel, schaalstreep 50 µm | geen zoom van A naar B in één functie; surfactant niet getekend |
| nefron | nieuw | anatomisch naar referentieplaat: kronkelbuizen, lis in het merg, distaal terug bij de glomerulus, verzamelbuis, peritubulaire haarvaten + vasa recta; filtratie, stroom (glucose verdwijnt na proximaal), terugresorptie | schema met één meelopend bloedvat (rood→blauw), open pijlen voor filtratie/terugresorptie/water (ADH) en een kleine nier (nierBijnier) met gouden kader | geen juxtaglomerulair apparaat/renine; geen osmolariteitsgradiënt |
| synapsEcht | nieuw | één synaps groot (Micro): knop met mitochondriën, Ca2+-kanalen, blaasjes die Ω-vormig versmelten, receptoren als ionkanalen met Na+, transporters, SSRI-blokje; alles op één fase-tijdlijn | context eerst: axon (myeline) vertakt op doorntjes van een dendriet + zoomcirkel met vereenvoudigde werking, zelfde fasen | geen acetylcholinesterase-variant; vergroot, niet op schaal (spleet) |
| wortelHaren | nieuw | hele wortelstelsel (penwortel + zijwortels, groei 0→1) met haren alleen achter de punt + zoom op één haarcel tussen bodemkorrels met water | wortelpunt op celniveau: mutsje, delingszone, strekkingszone, haarzone met vaatbundel; haren hogerop langer, water haar→schors→vat→omhoog | endodermis/Caspary-bandje alleen als rand, niet uitgewerkt |
| bloemDoorsnede | nieuw | natuurgetrouw naar referentieplaat (bloesem, stamper opengesneden), bij op ± ware verhouding, stuifmeel, stuifmeelbuis | klassieke 'halve bloem' (alle delen als snijvlak) met nectarklieren, vliegroute, stuifmeel dat overspringt, buis en bevruchting in stappen | geen dubbele bevruchting; geen onderstandig vruchtbeginsel |
| bladDoorsnede | nieuw | platte micro-doorsnede, elke cel apart, luchtholte boven elk huidmondje, CO2/O2/water als moleculen, huidmondjes open/dicht | blokje (doorsnede-3D): snijvlak + bovenkant + onderkant schuin met huidmondjes van onderen, open pijlen voor gassen | geen bundelschede-detail; onderkant in B is een benadering |
| stamboomSymbolen | nieuw | zuivere standaardnotatie, generaties tekenen in, Romeinse cijfers + nummers, oplichten (goud), proband-pijl | symbolen als portretlijstjes met castpersonages (familie van Noor), vorm blijft notatie; onder ± 20 px vallen gezichten weg | carrier volgens 2022 (gedeeld vlak) niet gebruikt: stip (gangbaar in NL) |

Opmerkingen voor wie inbouwt:
- A en B van hartDoorsnede definiëren beide `hartDoorsnedeFase`; A en B van stamboomSymbolen beide `STAMBOOM_NOOR` (kies één variant).
- B van stamboomSymbolen heeft `persoon` (lib_cast.js) + `circ` (cast_hulp/lib_anatomie) nodig; B van nefron gebruikt `nierBijnier` uit lib_bio.js; A van synapsEcht `mitochondrion` uit lib.js.
- Referentieplaten (3, elk 1 variant, ± 190 credits): flow https://elevenlabs.io/app/flows/z8S55bDe10w36LB1wQUz → hart, nefron, bloem.
- Open punten in bron.md (status ? of ≈): wand LV ± 3× RV, afferent wijder dan efferent, SSRI-mechanisme, huidmondjes vooral onderaan, maten wortelhaar, bij/bloem-verhouding: elk nog een tweede (niveau A-)bron nodig.

## Ronde 2 — C-varianten (C.js + C.png, zelfde uitsnede; X/Y-sleutels ongewijzigd)

| obj | C = winnaar + | bewust níet |
|---|---|---|
| hartDoorsnede | A + onderste holle ader langs de buitenkant de rechterboezem in; AV-kleppen als echte klepslippen met peesdraden aan de vrije rand; grotere halvemaankleppen; rustige holtes (geen streepjes); open stroompijlen alleen door open kleppen (uit B); rechter longaders weg (verborgen in vooraanzicht) | geen deeltjes meer in de stills (optie `stroom` blijft) |
| nefron | B + kronkelend eerste en tweede deel (uit A), twee zijtakken aan de verzamelbuis, vat langs de verzamelbuis; filtratie als deeltjes uit een kluwen i.p.v. witte pijlen; bloedvat om het eerste deel heen | geen zigzag-haarvatennet |
| bladDoorsnede | B + groter, ondieper blok (meer snijvlak), duidelijke cuticula, volledige sluitcellen (met bladgroen) rond een zichtbaar open spleet met luchtholte; CO2 (grijs, O=C=O) en O2 (teal, O=O) als moleculen; nerven op de bovenkant | onderkant blijft een benadering |
| longblaasje | B + trosje uit A als overzicht met zoomlijnen; wand als haarlijn, tussenschotten ± capillair dik, 10 buurblaasjes + tweede ring; weefsel donker zodat alleen de dunne wanden opvallen | geen surfactant |
| bloemDoorsnede | A + bij uit de gedeelde insectenset (6 poten, 2 paar vleugels, korfjes) op ± ware maat; zes opgeruimde meeldraden met zichtbare aanhechting; kelk teruggeslagen onder de kroon; stuifmeelbuis tot in een zaadbeginsel dat oplicht | C.js vereist `insect()` (dieren-a/insecten/A.js) |

Testpagina: `test.html?obj=…&v=C` (bloem met `&extra=../dieren-a/insecten/A.js`). Scène-aanpassing alleen in standen: hart big `stroom:0` (pijlen), bloem big `buis:1`.
