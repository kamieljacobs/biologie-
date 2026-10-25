# Vaste rollen voor de films

Kamiel (22 okt 2026): zelfde rol = zelfde personage, met een naam, zodat de kijker mensen herkent. Families staan in `lib_cast.js` (`CAST_FAMILIE`) en op de castboekpagina **Families**. Geen personage in een rol zetten die botst met zijn vaste achtergrond (een verpleegkundige is geen dader, een 29-jarige is geen moeder van een 16-jarige).

## Familie van Noor (voor alles met familie, erfelijkheid, generaties)

| Rol | Personage |
|---|---|
| jij (bovenbouw, als er familie in beeld komt) | **Noor** (16) |
| broertje | **Teun** (`kind`, 6) |
| moeder | **Linda** (44); outfit `zwanger` = 16 jaar geleden, zwanger van Noor |
| vader | **Rachid** (47) |
| opa en oma (kant moeder) | **Opa Henk** (71) en **Oma Ria** (69); Ria outfit `vroeger` = jong, zwanger van Linda |
| opa en oma (kant vader) | **Opa Ahmed** (74) en **Oma Malika** (71) |
| tante (zus van moeder) | **Tante Petra** (41) |

## Andere vaste rollen

| Rol | Personage |
|---|---|
| jij in de onderbouwreeks (32A en verder) | **Lotte**, de hele reeks door |
| patiënt (oudere man) | **Opa Henk** |
| arts, klinisch geneticus, onderzoeker | **Dr. Kim** |
| docent | **Mevrouw Visser** |
| eeneiige tweeling | **Daan** en **Thijs** |
| broer en zus (leeftijdgenoten) | **Yasmin** en **Bilal** |
| zwangere vrouw (los van Noors familie), cliënte bij de verloskundige | **Esra** |
| verdachte, voorbijganger, anoniem iemand uit een onderzoek | **Erik** (figurant) |
| verre familie, buurman | **Joost** (figurant) |
| boer, veehouder | **Veehouder Gerrit** |
| stagiair forensisch onderzoek (Wat word jij? · Forensisch onderzoek) | **Bilal** (outfit `plaatsdelict`: witte overall met capuchon, mondkapje, nitrilhandschoenen; in het lab `practicum`); Dr. Kim als forensisch arts / DNA-deskundige (ook `plaatsdelict`), Erik als verdachte |
| buurvrouw (oudere vrouw, los van Noors familie) | **Mevrouw Jansen** (`buurvrouw`, 72; garderobe `thuis`, `buiten`) — eerst in Forensisch onderzoek 3 |
| forensisch entomoloog | **Lieke** (`lieke`; garderobe `lab`, `plaatsdelict`), alleen in haar eigen vak |
| vakmensen | Jesse (verpleegkundige), Femke (fysiotherapeut), Ravi (apotheker), Mirjam (verloskundige), Mila (dierenarts), Wouter (tandarts), Ilse (mondhygiënist): alleen in hun eigen vak |
| kinderen van ± 10 jaar (basisschool, bv. de HPV-prik) | **Fleur** en **Ruben** (22 okt 2026, nog te keuren) |
| baby, ongeboren kind | `baby` (geen naam) |
| gezin met een kind met albinisme (erfelijkheid, recessief; figuranten, in de film zonder naam) | **gezin De Wit** (`CAST_GEZIN_WIT`, 25 okt 2026, ter keuring): Dennis en Marieke (Aa), Sara (13), **Levi** (10, albinisme), Jens (7), grootouders Opa Frank, Oma Lucia, Opa Wim, Oma Anja; garderobe `licht` = variant met lichte huid |

Handdruk: pose `handdruk` met `o.hand` (grijppunt) en `o.schud` (0..1), of de functie `handdruk(ctx, idL, idR, xm, voet, h, {t, schud, …})` die twee personages zo neerzet dat de handen sluiten (25 okt 2026).

Telpoppetjes in een telling (100 mensen, 1 op 3) blijven eenvoudige pictogrammen.

Nieuwe rol nodig? Eerst kijken of een bestaand personage hem logisch kan spelen; anders een nieuw personage in `lib_cast.js` (met naam en rol) en hier bijschrijven.

## Nieuwe caststijl (25 okt 2026)

Castvel in de nieuwe, rijkere stijl met contourlijnen: `personages/vellen/vel-nl-1.webp` (Noor, Sam, Lotte, Daan, Yasmin, Bilal, Dr. Kim, Mevrouw Visser; gpt-image-2, één variant, ElevenLabs-flow https://elevenlabs.io/app/flows/ImNDqEpSOwU8N1ciplpA). Nog te keuren door Kamiel; daarna in code zoals de proef met Maya (`personages/en/proef-maya.html`). Let bij de keuring op Bilal: hij oogt op het vel ouder dan 17.
