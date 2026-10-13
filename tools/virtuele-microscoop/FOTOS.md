# Virtuele microscoop — echte preparaatfoto's (plan, 12–13 oktober 2026)

Kamiel wil de getekende preparaten combineren met echte foto's. Plan: bij 100× en 400× een knop **Echte foto** die de echte opname toont, met dezelfde aanwijsopdrachten (celwand, celkern, celmembraan, bladgroenkorrel) op de foto, en een bronregel eronder plus een kopje *Bronnen* onderaan de tool.

## Catalogus (sinds 13 oktober 2026)

Alle ontvangen foto's staan in `fotos/`, gekoppeld aan hun beschrijving in **`fotos/catalogus.json`** (titel, originele titel, organisme, doorsnede, vergroting, beschrijving, aanwijsbare structuren met `punt`, bron/licentie/bronregel, gebruik, status). Overzichtspagina: `fotos/index.html`. Nieuwe foto: bestand in `fotos/` + een item in de catalogus, in dezelfde commit. De catalogus is de basis voor de latere microscopietool.

**Automatisch ophalen:** `fotos/bronnen.txt` bevat pagina's van de Berkshire-bibliotheek. Bij elke push van dat bestand haalt GitHub Actions (`.github/workflows/microscoopfotos.yml` → `scripts/haal_microscoopfotos.py`) alle foto's van die pagina's op als Flickr-origineel (verkleind tot max. 2560 px breed), zet ze in `fotos/berkshire/` en voegt ze aan de catalogus toe met naam, sectie, vergroting, resolutie en bronregel (status `nieuw`). Log van de laatste run: `fotos/ophaallog.txt`. Een pagina erbij = één regel in `bronnen.txt`.

## Eisen aan foto's

- Minstens 2000 px breed, liever het Flickr-**Original** (3000–6000 px): de tool zoomt tot 400×. De 768 px-plaatjes van de blog zijn alleen goed als klein illustratieplaatje, niet voor de microscoop of als filmachtergrond (1920 px).
- Licentie: CC0 / publiek domein, CC BY of CC BY-SA. Geen NC of ND.
- Claude kan Flickr, Wikimedia, Unsplash en blogs.berkshirecc.edu **niet** downloaden (netwerk geblokkeerd): Kamiel downloadt het Original en stuurt het bestand in de chat, met de Flickr-link erbij.

## Bron 1: Berkshire Community College Bioscience Image Library (CC0, bevestigd)

Blog: https://blogs.berkshirecc.edu/bccoer/ ("A Public Domain Open Educational Resource"); Flickr: https://www.flickr.com/people/146824358@N03/ ("The resources are licensed under Creative Commons 0"). Bronregel: *Foto: Berkshire Community College Bioscience Image Library, publiek domein (CC0)*.

| Preparaat | Foto | Link |
|---|---|---|
| Uienvlies | Living cells of onion epidermis, 300× | https://www.flickr.com/photos/146824358@N03/34062338020 |
| Wangcellen (vervanger: plat epitheel mens, whole mount) | Simple Squamous Epithelium: Whole Mount (Human), 100× | https://www.flickr.com/photos/146824358@N03/40823230315/ |
| idem | 200× | https://www.flickr.com/photos/146824358@N03/41722161021/ |
| idem | 400× | https://www.flickr.com/photos/146824358@N03/41722161301/ |
| Waterpest | niet in deze collectie (alleen wortel/stengel van Elodea) | — |

Al ontvangen (12 okt, 768 × 433 px, alleen voor later): *Gymnosperm Root: Vascular Cylinder in Pinus, 100×*, https://www.flickr.com/photos/146824358@N03/36096074562/ — dwarsdoorsnede wortel van een den; past bij 32A-film 2 "Van cel tot lichaam". Bronregel: *Foto: Gymnosperm Root: Vascular Cylinder in Pinus, 100×, Berkshire Community College Bioscience Image Library, publiek domein (CC0)*.

## Bron 2: Wikimedia Commons (licentie per foto nog controleren op de bestandspagina onder "Licensing")

- Wangcellen: File:Human_Cheek_Cells_(Methylene_Blue_Stain).jpg · File:Nucleus_in_human_cheek_cells.jpg
- Waterpest: File:Elodea_chloroplasts_1_400×.png · File:Elodea_chloroplasts_100×.png · File:Elodea_cells_under_microscope.jpg
- Uienvlies: File:Iodine_stained_onion_cells.jpg · File:Onion_epidermis.jpg

## Niet bruikbaar (NC)

Elodea-foto's van Melissa Ha (LibreTexts / ASCCC OERI, CC BY-NC) en de Elodea-video van Science and Plants for Schools (CC BY-NC-SA).

## Alternatief

Eigen foto's door de schoolmicroscoop (telefoon tegen het oculair), bij 100× en 400×: geen licentievragen en precies wat leerlingen zelf zien.
