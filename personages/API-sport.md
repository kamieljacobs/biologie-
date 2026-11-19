# API voor de filmbouwers · Sport en topsport (19 nov 2026, ter keuring)

Alles staat in `personages/lib_cast.js` (kopieer de actuele versie naar `bron/src/` van je film). Testvel: `/home/claude/hw/cast/testvel-sport.png`.

## Nieuwe personages

| id | wie | garderobe | let op |
|---|---|---|---|
| `sam` + outfit `zwem` | de zwemmer (16) | `zwem` | jammer, rode badmuts, zwembril, blote voeten |
| `zwemtrainer` | zwemtrainer, ± 45, geen naam | `bad` (standaard) | trainingsjack, fluitje + stopwatch aan een koord, klembord in de andere hand (vanzelf) |
| `sportpsycholoog` | sportpsycholoog, ± 35, geen naam | `gewoon` (standaard) | rustige kleding, dun brilletje |

Geen namen in beeld of stem: 'de zwemmer', 'de trainer', 'de sportpsycholoog'.

## Staand en lopend (zoals altijd)

```js
persoon(ctx, 'sam', x, y, h, { outfit: 'zwem', uit: 'blij' });               // vooraanzicht, bril op de badmuts
persoon(ctx, 'sam', x, y, h, { outfit: 'zwem', bril: 'ogen' });              // bril op de ogen
persoon(ctx, 'sam', x, y, h, { outfit: 'zwem', zij: true, gang: 'loop', t, vooruit: true }); // langs het bad lopen
persoon(ctx, 'zwemtrainer', x, y, h, { pose: 'wijs', uit: 'praat', t });      // klembord zit in de linkerhand
persoon(ctx, 'zwemtrainer', x, y, h, { zij: true, kijk: -1, uit: 'praat', t });
persoon(ctx, 'sportpsycholoog', x, y, h, { zij: true, pose: 'zit', stoel: true, tafel: T, uit: 'praat', t });
```

## In het water: `zwemmer()`

```js
const r = zwemmer(ctx, 'sam', x, y, lengte, { slag: 'crawl', t, kijk: 1 });
```

- `(x, y)` = heupgewricht. `lengte` = staande lengte in px, zelfde getal als `h` bij `persoon()` (dus Sam is in het water net zo groot als op de kant).
- `slag`: `'crawl'`, `'rug'`, `'school'`, `'vlinder'`, `'stroomlijn'`, `'onderwater'` (stroomlijn + dolfijnslag), `'startblok'`.
- Tijd: `t` (s) of `fase` (0..1). Eén cyclus duurt `1 / ZWEM[slag].f` s (crawl 0,8 Hz, rug 0,75, school 0,85, vlinder 0,8, onderwater 2,0). Sneller of trager: `tempo`.
  Fase 0 = instrek van de dichtbije hand (schoolslag: glijden; armen 0,15–0,5, adem rond 0,45, beenslag 0,55–0,78).
- `kijk: 1` zwemt naar rechts, `-1` naar links. `a` = doorzichtigheid (niet gebruiken voor 'achter water': BEELDAFSPRAKEN, nooit halfdoorzichtige mensen).
- `bril: 'muts'` zet de bril op de badmuts (standaard in het water: op de ogen). `outfit` standaard `'zwem'`.
- **Vooruitgaan doet de functie niet**: schuif x zelf op (bv. crawl ± 1,7 m/s → `x = x0 + v * t` met v in px/s = 1,7 × lengte / 1,79).
- Teruggegeven (in jouw coördinaten): `hoofd`, `handR` (dichtbij), `handL` (ver), `heup`, `schouder`, `voet`, `rug` (punt midden op de rug), `borst`, `fase`, `pitch`.

### Waterlijn (tekent de film zelf)
- Crawl, vlinder, school: leg de waterlijn op ± `r.rug.y` (de rug ligt aan het oppervlak). Praktisch: `y = waterlijn + 0,12 × lengte` voor de heup.
- Rugslag: de borst en het gezicht liggen boven; `y = waterlijn + 0,07 × lengte`.
- Stroomlijn en onderwater: onder water, bv. `y = waterlijn + 0,4 × lengte` of dieper.
- Teken het water als vlak **vóór** het lichaam alleen voor het deel onder de waterlijn als je dat wilt (tint), nooit de zwemmer zelf doorzichtig maken. Kies je een watervlak over het lichaam, hou het licht en zonder alfa op de persoon.

### Startblok
```js
const s = zwemmer(ctx, 'sam', xRand, yBlok, lengte, { slag: 'startblok', kijk: 1 });
// s.wig = { x, y, h }: teken daar de wig van het blok (h standaard 0,3 × kopmaat; eigen hoogte met o.wig)
```
`(x, y)` = voorrand en bovenkant van het blok; de tenen van de voorste voet komen net over de rand. Het blok tekent de film.

## Voorbeelden
```js
// crawl van links naar rechts door beeld, waterlijn op 540
const L = 260, x = 200 + 1.7 * (L / 1.79) * t;
zwemmer(ctx, 'sam', x, 540 + 0.12 * L, L, { slag: 'crawl', t });
// catch met hoge elleboog stilzetten voor een uitleg
const r = zwemmer(ctx, 'sam', 900, 600, 600, { slag: 'crawl', fase: 0.26 });  // r.handR = de hand diep onder de elleboog
// voortstuwing (goud) en weerstand (koraal) aan de zwemmer hangen
eigenPijl(ctx, r.handR.x, r.handR.y, r.handR.x - 80, r.handR.y, '#E0B64A');     // pijlfunctie van je eigen engine: hand duwt water naar achteren
```

Handige fasen (crawl): 0 instrek · 0,12 strekken · 0,26 catch (hoge elleboog) · 0,4 trekfase onder de borst · 0,52 duwfase · 0,62 uitkomen bij de dij · 0,8 recovery (elleboog hoog). Rug: 0 instrek · 0,32 trekfase (elleboog ± 90°) · 0,55 bij de dij · 0,78 arm recht omhoog. Vlinder: 0 instrek · 0,25 catch · 0,55 duwfase + adem · 0,83 recovery (arm verkort, wijst naar de kijker).

## Valkuilen
- Alleen zijaanzicht. Of de hand de middellijn kruist, zie je alleen van boven of van voren: daarvoor bestaat nog geen tekening (bovenaanzicht van de baan = film zelf, eenvoudige vorm).
- Geen lichaamsrol bij crawl/rug: het lichaam blijft plat in het zijaanzicht; de adem (hoofd opzij) bij crawl wordt niet getekend.
- Zijwaartse armen (vlinderrecovery, rugslagtrekfase) zijn verkort getekend; dat is projectie, geen kortere arm.
- `zwemmer()` zet zelf `ctx.save/restore`; roep hem niet aan binnen een eigen `scale(-1, 1)`: gebruik `kijk`.
- De dichtbije arm ligt altijd over het hoofd (hij is dichter bij de kijker); de verre arm achter de romp.
- Nieuwe opties in `persoon(..., { zij: true })` die `zwemmer()` gebruikt en die je ook los kunt gebruiken: `vrij` (niet op de grond), `been1`/`been2` = `{ th, kn, an }` in rad, `armK`/`armVerK` (verkorting), `armNaHoofd`, `voorover` (rad), `knik` (hoofd voorover, rad).
- Bestaande personages met `bril-dun` (palynoloog, Milan, de sportpsycholoog) krijgen nu ook in zijaanzicht een bril.
- Castvellen van trainer en sportpsycholoog zijn er nog niet: als Kamiel het vel later goedkeurt en het wijkt af, past de code zich aan (kleuren in `CAST`).
