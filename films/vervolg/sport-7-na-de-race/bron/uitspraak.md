# Uitspraak — Na de race (wachtlijst)
Model eleven_v4, stem Roos, één take per alinea. De centrale regels uit `films/uitspraak.json` gelden (o.a. a./b./c. → aa./bé./cee.). Nog niet beluisterd; alles op de wachtlijst (batchtest door Kamiel).

Opzoeken (19 nov 2026): nl.wiktionary.org was vanuit deze sessie niet bereikbaar en zoeken leverde geen woordenboekpagina's op. Daarom staat de IPA hieronder als **voorstel van Claude** op basis van de gewone Nederlandse uitspraakregels en de Engelse naam; bij elk woord staat 'onzeker' zolang een tweede bron ontbreekt.

| Woord | Alinea's | IPA (voorstel) | Stem-invoer | Waarom risico | Status |
|---|---|---|---|---|---|
| Ethan Kross | s03 | /ˈiːθən ˈkrɔs/ (Engels) | Ethan Kross | Engelse naam; de TTS kan 'Etan' of 'Kros' met lange o zeggen | wachtlijst, onzeker |
| Shift (boektitel) | s03 | /ʃɪft/ | Shift | Engels woord in Nederlandse zin | wachtlijst |
| co-ruminatie | s10 | /ˌkoː.ry.miˈnaː.(t)si/ | ko-ruminatie | voorbeeld 'co-regulatie → ko-regulatie' (Emotieregulatie); 'tie' moet 'sie' klinken (regel transcriptiefactor, 18 okt). Komt 'tie' er hard uit, dan 'ko-ruminaatsie' | wachtlijst |
| nét (nadruk) | s20 | /nɛt/ | net | regel 'té' → 'te' (16 okt): een accent maakt van de e een 'ee' | wachtlijst |
| én (nadruk) | s21 | /ɛn/ | en | idem: niet 'een' | wachtlijst |
| dolfijnslagen | s14, s16, s20 | /dɔlˈfɛinˌslaː.ɣə(n)/ | zoals geschreven | samenstelling, klemtoon op 'fijn' | wachtlijst |
| splittijden | s14 | /ˈsplɪt.tɛi.də(n)/ | zoals geschreven | dubbele t; mag niet 'splitijden' met de klemtoon verkeerd worden | wachtlijst |
| limiet | s01, s14, s16, s20 | /liˈmit/ | zoals geschreven | klemtoon op de tweede lettergreep | wachtlijst |
| prestatiedoel | s14 | prestatie: /prɛsˈtaː.(t)si/ | zoals geschreven | 'tie' als 'sie' | wachtlijst |
| praktijksportpsycholoog | s22 | /prɑkˈtɛik.spɔrt.psi.xoːˈloːx/ | zoals geschreven | lange samenstelling; 'ps' aan het begin van psycholoog | wachtlijst |
| bewegingswetenschappen | s22 | /bəˈʋeː.ɣɪŋs.ʋeː.tə(n).sxɑ.pə(n)/ | zoals geschreven | lang woord | wachtlijst |
| zevenentwintig | s16 | /ˈzeː.və.nən.tʋɪn.təx/ | zoals geschreven | getal | wachtlijst |
| Antwoord a/b/c | s05, s09, s13, s16, s19 | — | centrale regels (aa. / bé. / cee.) | regel 'B' als Nederlandse letter (21 okt) | centrale regel |

Alleen in beeld (niet in de stem): 'Sport and Performance Psychology', 'VSPN', namen van onderzoekers op meta-kaartjes.

## Ronde 2 (19 nov 2026)
- Nieuw in de stem: 'De week erna' en 'traint met sporters' (geen risico). 'de meter' staat niet meer in de stem (beoordelaar: in een zwemfilm luisterrisico).
- Blijven op de wachtlijst: Ethan Kross, Shift, co-ruminatie, nét, én, dolfijnslagen (nu ook s16 in de stem), splittijden, limiet, prestatiedoel, praktijksportpsycholoog, bewegingswetenschappen, zevenentwintig.

## Ronde 3 (definitief)
- De film-eigen vervangregels staan in `uitspraak_film.json` (gecontroleerd met `engine/make_segments.py sp7 script_v2.md`; het veld `voice` in `segments.json` klopt): co-ruminatie → ko-ruminatie (s10), nét → net (s20), én → en (s21). De antwoordletters a./b./c. → aa./bé./cee. komen uit de reekslijst.
- 'Shift' staat niet meer in de stem (vervalt van de wachtlijst).
- Nieuw in de stem: 'driehonderdzeventig' (s17), 'ingestort', 'video' (s14): zonder risico, alleen geluisterd.
- Blijven op de wachtlijst: Ethan Kross (s03), ko-ruminatie, dolfijnslagen (s16, s20), splittijden (s14), limiet, prestatiedoel, praktijksportpsycholoog en bewegingswetenschappen (s22).
- IPA: nl.wiktionary was ook in ronde 3 niet bereikbaar; de voorstellen hierboven blijven 'onzeker' tot de batchtest.
