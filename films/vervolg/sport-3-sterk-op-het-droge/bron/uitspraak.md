# Uitspraak — Sterk op het droge (script_v2 definitief)
Model eleven_v4, stem Roos, één take per alinea. Centrale regels uit `films/uitspraak.json` (geen daarvan raakt deze film). Nog niet beluisterd; alles op de wachtlijst. 'Squat' is bewust uit de stem gehouden ('met een zwaardere stang door de knieën').

IPA: nl.wiktionary.org was in deze sessie niet bereikbaar (niet op de toegestane lijst). Wel geraadpleegd: en.wiktionary (kiwix-kopie) voor *explosief* /ˌɛks.ploːˈzif/. De overige IPA volgt de vaste Nederlandse klemtoonregels (-iteit, -eut, -iek, -ie dragen de klemtoon) en moet bij de batchtest bevestigd worden.

| Woord | Alinea | IPA (klemtoon) | Stem-invoer | Status |
|---|---|---|---|---|
| explosiviteit | s08 | /ˌɛks.ploː.zi.viˈtɛit/ (-TEIT) | zoals geschreven | wachtlijst |
| fysiotherapeut | s15, s17, s21 | /ˌfi.zi.joː.teː.rɑˈpœyt/ (-PEUT) | zoals geschreven | wachtlijst |
| Fysiotherapie | s22 | /ˌfi.zi.joː.teː.rɑˈpi/ (-PIE) | zoals geschreven | wachtlijst |
| sportfysiotherapeut | s22 | klemtoon op SPORT, bijklemtoon -PEUT | zoals geschreven; komt het eruit als één brij: 'sport-fysiotherapeut' | wachtlijst |
| elastiek | s15 | /eː.lɑsˈtik/ (-TIEK) | zoals geschreven | wachtlijst |
| binnendraaiers / buitendraaiers | alleen op de vraagkaart q13 en de eindkaart, niet gesproken | /ˈbɪ.nə(n).draː.jərs/ | — | n.v.t. |
| Sportkunde | s22 | /ˈspɔrt.kʏn.də/ (SPORT) | zoals geschreven | wachtlijst |
| Bewegingswetenschappen / bewegingswetenschappers | s20, s21, s22 | /bəˈʋeː.ɣɪŋs.ʋeː.tən.sxɑ.pə(n)/ (-WEE-) | zoals geschreven | wachtlijst |
| vijftigmeterbad / vijfentwintigmeterbad | s03, s05 | VIJF-tig-MEE-ter-bad | zoals geschreven (voluit, geen cijfers) | wachtlijst |
| achttienduizend | s12 | /ˌɑx.tinˈdœy.zənt/ | zoals geschreven | wachtlijst |
| keerpunt / keerpunten | s01, s03 | /ˈkeːr.pʏnt/ | zoals geschreven | wachtlijst |
| sportarts | s15 (vraag) | /ˈspɔrt.ɑrts/ | zoals geschreven | wachtlijst |
| procent ('twee procent', 'één tot drie procent', 'één procent') | s11, s20 | /proːˈsɛnt/ | zoals geschreven | wachtlijst |
| krachttrainer | s08, s21 | /ˈkrɑx.treː.nər/ (KRACHT; 'trainer' als in het Nederlands) | zoals geschreven | wachtlijst |
| hbo (in 'hbo-opleiding', 'op het hbo') | s22 | /ɦaː.beːˈoː/ | zoals geschreven; klinkt het als één woord: 'haa-bee-oo' | wachtlijst |
| gedachte-experiment | s18 | /ɣəˈdɑx.tə.ɛk.speː.riˌmɛnt/ | zoals geschreven | wachtlijst |
| stroomlijn | s11 | /ˈstroːm.lɛin/ | zoals geschreven | wachtlijst |
| Britse | s05 | /ˈbrɪt.sə/ | zoals geschreven | wachtlijst |

Ronde 2: 'schouderblad' komt niet meer in de stem; 'wo' wordt niet uitgesproken (alleen op het kaartje).
| enquête | s12 | /ɑŋˈkɛː.tə/ (-KÊ-) | zoals geschreven | wachtlijst |
| Amerikaanse | s12 | /aː.meː.riˈkaːn.sə/ | zoals geschreven | wachtlijst |
| tegenwicht | s08 | /ˈteː.ɣə(n).ʋɪxt/ | zoals geschreven | wachtlijst |
| trainingsgroep | s11 | /ˈtreː.nɪŋs.ɣrup/ | zoals geschreven | wachtlijst |

Ronde 3: film-eigen vervangregels staan in `uitspraak_film.json` (gelezen door `engine/make_segments.py`): vijftigmeterbad → vijftig-meterbad, vijfentwintigmeterbad → vijfentwintig-meterbad, Sportfysiotherapeut/Sportfysiotherapie → Sport-fysiotherapeut/Sport-fysiotherapie (koppelteken alleen om het lange woord in delen te lezen). Antwoordletters via de reekslijst (aa, bé, cee). Stem-invoer per alinea: `voice.md` (gecontroleerd in `segments.json`, veld `voice`). 'vóór' in s03 is 'voor' geworden (accent kan de TTS van slag brengen, vgl. 'té'). 'hbo' zoals geschreven: geen afgekeurde invoer in UITSPRAAK.md en eerder in Fysiotherapie 4 zo ingesproken.
