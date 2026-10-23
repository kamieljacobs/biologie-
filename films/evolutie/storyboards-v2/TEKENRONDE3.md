# Tekenronde 3 — tekenen naar referentie (23 okt 2026)

Kamiel na ronde 2 (beeldbank): "de meeste zijn een stuk beter, bij sommige zijn de verhoudingen niet zo goed". Per dier: wolf "nog niet goed, gebruik referentiemateriaal, wel al beter dan hij was"; ezel "beter maar nog niet goed genoeg, gebruik referenties"; jachtluipaard "verhouding borst niet goed, deze echt helemaal opnieuw maken"; leeuw "best goed"; paard "beter". En: "met elevenlabs referentie laten maken en daarvan leren hoe de anatomie is van de dieren en dat jij ze dan vormt met de tool die je nu ook gebruikt".

## Nieuw: referentieplaten
`/home/claude/evo2/referentie/*.webp` (1024×576, realistische zijaanzichten op lichtgrijze achtergrond, zelfde schaal per plaat): wolf (staan/lopen/zitten), honden (herder, teckel, mops, chihuahua op schaal), paard-muilezel-ezel (op schaal), katachtigen (leeuw, tijger, jachtluipaard, huiskat lopend, op schaal), edelhert-koe-nijlpaard-chimpansee, zangvogels (grondvink op tak, merel op grond, koolmees op tak en aan stam, vliegende grondvink), haai-dolfijn-bultrug-krokodil-hagedis, pauw-pauwin-reiger. Bekijk ze met Read.

## Werkwijze (verplicht)
1. **Meten in de referentie.** Knip het dier uit (achtergrond is egaal lichtgrijs ≈ #C8CACB–#D0D2D3: drempel op kleurverschil met de achtergrondkleur uit een hoek, morfologisch sluiten, grootste component per dier) met Python/PIL (+numpy; installeer opencv-python-headless met `pip install --break-system-packages` als je contouren wilt). Leid af: omtrek (contour), lengte/hoogte, borstdiepte, plaats van elleboog/knie/hak/kogel, kop- en nekverhouding, staartlengte. Schrijf de maten (als fracties van de schofthoogte) in je lessen-bestand.
2. **De omtrek gebruiken.** Je mag de vereenvoudigde contour (bv. 60–120 punten, genormaliseerd naar het anker van je functie: midden onder het dier, kop naar rechts) direct als lichaamsvorm overnemen in de staande houding, en de skeletmaten (botlengtes, hoeken) ijken op de referentie. Voor andere houdingen: de skeletversie, maar met dezelfde verhoudingen; controleer de lopende houding tegen de lopende dieren in de referentie.
3. **Vlak tekenen in de Part C-stijl**: 2–3 tinten per vacht (rug, flank, buik), de tekening/vlekken/strepen van de referentie vereenvoudigd, randlijn in een lichtere tint, echt oog (dierOog), geen verloop/gloed/schaduw. De referentie mag nooit zelf in beeld komen (geen raster in films).
4. **Kruiscontrole**: een AI-beeld kan zelf fouten hebben (aantal tenen, rare gewrichten). Kruis maten met je tekstbronnen uit ronde 1–2; bij twijfel wint de tekstbron.
5. **Controle**: zet op een testvel per dier jouw tekening náást (of als dunne lijn over) de uitgeknipte referentiecontour op dezelfde schaal, en een vel met alle houdingen. Bekijk ingezoomd. Pas aan tot de omtrek klopt.
6. Behoud functienamen en aanroepvorm (zie TEKENRONDE.md). Werk in je eigen bestand van ronde 2 verder.

## Oplevering
Bijgewerkt bestand, testvel(len) met overlay, en in je lessen-bestand een nieuw blok 'Ronde 3 — tekenen naar referentie': wat de referentie veranderde (welke verhoudingen fout zaten), en of het overnemen van de contour werkt. Meld in ≤10 regels.
