"""Nagerekend voor lt4 (Antibioticaresistentie: kweken, testen en selectie).

1. De verdunningsreeks en de kolonietelling uit hoofdstuk 2.
2. De telling op de antibioticumplaat uit hoofdstuk 4 (mutantfrequentie).
3. Verdubbelingstijd: van één cel naar een zichtbare kolonie in een nacht.
4. De MIC-reeks (verdubbelingsstappen) uit hoofdstuk 3.
"""

print('--- 1. verdunningsreeks (H2) ---')
# monster: 1 ml in 9 ml zout = 1 op 10 per buisje
reeks = [10 ** -(i + 1) for i in range(6)]
print('buisjes:', ['1e%d' % round(__import__('math').log10(f)) for f in reeks])
# uitgeplaat volume
V = 0.1          # ml per plaat
f = 1e-5         # de plaat die telbaar is
n = 68           # getelde kolonies
per_ml = n / V / f
print(f'{n} kolonies op de 1e-5-plaat, {V} ml uitgeplaat -> {per_ml:.3g} kve/ml')
print('  afgerond in de film: bijna 70 miljoen per milliliter (6,8 x 10^7)')
# controle: wat zou je op de buur-platen zien?
for ff in (1e-4, 1e-5, 1e-6):
    print(f'  verwacht bij 1e{round(__import__("math").log10(ff))}: {per_ml * ff * V:.0f} kolonies',
          '(telbaar 30-300)' if 30 <= per_ml * ff * V <= 300 else '(buiten 30-300)')

print('\n--- 2. mutanten op de antibioticumplaat (H4) ---')
N = 1e9          # uitgeplate cellen (dichte cultuur, geconcentreerd en uitgeplaat)
kol = 7          # kolonies op de plaat met antibioticum
print(f'{kol} kolonies uit {N:.0g} cellen -> {kol / N:.1e} per cel')
print(f'  = 1 op {N / kol:.3g} cellen; in de film: "zeven kolonies uit een miljard cellen"')
print('  orde 10^-8 tot 10^-9 per cel, past bij een mutatie in een gen (10^-6..10^-9 per gen per deling)')
print(f'  zonder antibioticum zouden diezelfde {N:.0g} cellen een gesloten waas geven: niet te tellen')

print('\n--- 3. van één cel naar een kolonie ---')
for td in (20, 30, 40):
    import math
    n18 = 2 ** (18 * 60 / td)
    print(f'verdubbelingstijd {td} min, 18 uur -> 2^{18*60/td:.0f} = {n18:.1e} cellen')
print('  een zichtbare kolonie is ongeveer 1e8-1e9 cellen (0,5-2 mm):')
print('  dat haal je bij 20-40 min verdubbeling binnen een nacht (18 uur)')
# hoeveel verdubbelingen voor 1e8?
import math
print(f'  1e8 cellen = {math.log2(1e8):.1f} verdubbelingen; bij 30 min = {math.log2(1e8)*0.5:.1f} uur')

print('\n--- 4. MIC-reeks (H3) ---')
mic = [0.016 * 2 ** i for i in range(9)]
print('verdubbelingsstappen (mg/L):', ', '.join(f'{m:g}' for m in mic))
print('voorbeeld in de film: groei tot en met 0,25; eerste heldere buisje 0,5 -> MIC = 0,5 mg/L')
