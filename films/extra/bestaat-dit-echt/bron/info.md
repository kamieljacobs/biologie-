# Bestaat dit echt? — film 1 van Bijzondere dieren (in de maak)

Status (22 okt 2026): script v1 en storyboard klaar, wacht op Kamiels storyboardkeuring.
- Storyboardblad (keuring per scène, opgeslagen in de db van de artifact, collectie `keuring`): https://claude.ai/artifact/Ua59AB6bSaWhYEdeL93W6r
- Script: `script_v1.md` (lagen [B] beginner, [M] basis, [G] gevorderd; bij elk dier een internetbewering: klopt, overdreven of verzonnen).
- Dierenbibliotheek volgens prompt v8 C9: `src/teken_bd1.js` + `src/teken_bd1b.js` (beerdiertje, axolotl, bidsprinkhaankreeft, pistoolgarnaal, octopus, vogelbekdier, molrat, kwal + poliep, bombardeerkever, liervogel). Gebruikt `zacht()` uit `films/vervolg/diergeneeskunde-1-hond-koe-paard/bron/src/teken_dg0.js`.
- Keyframes: `src/sb.js` (object `SB`), tekenen met `bouw/render.py` (verwacht de film-engine in `../engine` zoals in films/vervolg/BOUWEN.md).
- Bronnen per dier: Jönsson 2008, Neves 2020, Boothby 2017, Tanaka 2022 (beerdiertje); Godwin 2013, Kragl 2009, Otsuki 2025 (axolotl); Patek 2004, Zack 2009, Weaver 2012, Thoen 2014 (bidsprinkhaankreeft); Versluis 2000, Lohse 2001 (pistoolgarnaal); Gutnick 2020, Ramirez & Oakley 2015, Stubbs & Stubbs 2016 (octopus); Manger & Pettigrew 1996, Zhou 2021 (vogelbekdier); Ruby 2018, Park 2017, Tian 2013 (molrat); Pascual-Torner 2022 (kwal); Arndt 2015, Sugiura & Sato 2018 (bombardeerkever); Dalziell 2021 (liervogel).
- Volgende stap na de keuring: script v2 → inspreken (Roos, eleven_v4) → bouwen in de FILMDATA-straat; speler met drie niveaus (beginner/basis/gevorderd).
