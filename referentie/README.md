# Referentiemap (sinds 23 okt 2026)

Referentiebeelden om tekeningen voor de films naar te maken (prompt C7/C9). Nooit zelf in een film: de films tekenen alles vlak in Part C-stijl.

- `dieren/` — anatomische referentieplaten, gemaakt met ElevenLabs (gpt-image-2.5-sunburst, één variant per plaat, ±190 credits; flow https://elevenlabs.io/app/flows/3WeEwvHPP8DeFGIqhFPY), zijaanzicht op lichtgrijze achtergrond zodat de omtrek uit te meten of uit te knippen is. Kamiel 23 okt 2026: "met elevenlabs referentie laten maken en daarvan leren hoe de anatomie is van de dieren".
- Let op: een AI-beeld kan zelf anatomische fouten hebben (aantal tenen, gewrichten, verhoudingen). Kruis maten altijd met een tekstbron (schofthoogte, lengte) voordat je overneemt.
- Kamiel of zijn broer kan ook echte foto's toevoegen; die gaan vóór de AI-platen.

## Dier als uitknippop (23 okt 2026, proef wolf)
Ronde 3 (omtrek overtrekken + kleur uit pixels) werkte niet: naden bij schouder/heup, vlekkerige kleur, één houding. Nieuwe aanpak per dier, drie ElevenLabs-platen (±190 credits per stuk, 1 variant):
- **modelblad** (`wolf-modelblad.webp`): zelfde dier 6× op dezelfde schaal, strikt zijaanzicht (staan, stap-contact, stap-passeer, draf, zitten, liggen) → gewrichtspunten, botlengtes, houdingen als bothoeken;
- **uitknipvel** (`wolf-uitknipvel.webp`): het dier in vlakke stijl (3 tonen) → vorm en kleurverdeling (alleen de samengestelde figuur is nuttig);
- **loopcyclus** (`wolf-loopcyclus.webp`): stap in 8 fasen + extra houdingen (huilen, draf, snuffelen).
Botlengtes altijd kruiscontroleren met tekstbronnen (de platen maakten de onderarm te lang). Code en recept: `films/evolutie/storyboards-v2/pop/wolf/` (`wolf_pop.js`, `lessen_pop.md`).
