# Kenmerken per variant (aanvulling op MAKER.md, 27 okt 2026)

Kamiel wil patronen leren herkennen in wat goede animaties/tekeningen zijn. Schrijf daarom per object ook `<obj>/kenmerken.json`, met voor élke optie (ook 'oud' als die in de stills staat) de kenmerken uit deze vaste lijst — precies één waarde per as:

```
{"oud": {...}, "A": {...}, "B": {...}}
```
- `detail`: weinig | midden | veel
- `vorm`: schematisch | semi | realistisch
- `vulling`: vlak | verloop | arcering
- `contour`: geen | dun | dik
- `kleur`: gedempt | accent (gedempt met één opvallende kleur) | verzadigd
- `diepte`: plat | schaduw (licht/schaduw voor volume) | doorsnede-3d (blokje/uitsnede)
- `textuur`: geen | rustig | druk
- `context`: los | in-omgeving (in weefsel/cel/landschap) | met-schaal (naast bekend object of persoon)
- `beweging`: geen | idle (ademen, wiebelen) | standen (vaste toestanden) | proces (laat een biologisch proces zien)
- `opbouw`: in-een-keer | in-stappen (onderdelen verschijnen na elkaar mogelijk)

- `referentie`: geen | elevenlabs (gebouwd naar een ElevenLabs-plaat) | bron (naar een figuur uit een geopende bron)

Plus één vrij veld `vondst`: in ≤ 12 woorden wat deze aanpak bijzonder maakt (bv. 'cristae als doorlopende zigzag in plaats van losse vingers').

Wees eerlijk: beschrijf wat er echt staat, niet wat je bedoelde.
