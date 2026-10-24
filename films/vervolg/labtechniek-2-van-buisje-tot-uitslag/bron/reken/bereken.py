"""lt2 — Van buisje tot uitslag: rekenwerk nagerekend (verdunningsreeks, druppel, ijklijn, Ct)."""
import math
print('== Verdunningsreeks 1 op 10 ==')
v_st, v_w = 10, 90                     # microliter
f = (v_st + v_w) / v_st
print('10 µl in 90 µl water: totaal', v_st + v_w, 'µl, verdunningsfactor', f)
for k in range(1, 5): print(' stap', k, ': totaal', int(f ** k), 'keer verdund')
print('== Druppel van 10 µl (bol) ==')
V = 10e-9                               # m^3 (10 µl = 10 mm^3)
d = (6 * V / math.pi) ** (1 / 3) * 1000
print(' diameter %.2f mm' % d)
print('== Pipetfout ISO 8655 (P20 bij 10 µl): systematisch ±0,2 µl = ±2 %, toevallig CV ≤ 1 % ==')
# fout in stap 1 werkt door: als stap 1 2 % te weinig standaard levert, zijn alle volgende buisjes 2 % te laag
c = 1.0; e = [0.98, 1, 1, 1]
for i, x in enumerate(e): c *= x; print(' na stap', i + 1, 'relatief %.3f' % c)
print('== Verdubbelen en tien keer ==')
print(' log2(10) = %.3f cycli; 2^3 = 8; 2^3,32 = %.2f' % (math.log2(10), 2 ** 3.32))
print('== Ijklijn (100 % efficiëntie, helling −3,32) ==')
top_ct, top_n = 17.0, 1e6               # standaard 1: 10^6 kopieën per putje -> Ct 17 (gekozen, realistisch)
slope = -1 / math.log10(2)
for k in range(5):
    n = top_n / 10 ** k; print(' standaard %d: %8.0f kopieën  Ct %.1f' % (k + 1, n, top_ct + slope * (math.log10(n) - 6)))
ct_opa = 25.0
n_opa = 10 ** (6 + (ct_opa - top_ct) / slope)
print(' Opa Henk Ct 25 -> %.0f kopieën per putje (≈ vierduizend)' % n_opa)
print(' efficiëntie bij helling −3,32: %.1f %%' % ((10 ** (-1 / slope) - 1) * 100))
print('== Doorvoer cobas 8800 (Roche): 1056 tests per 8 uur ==')
print(' per uur %.0f' % (1056 / 8))
print('== Ct-verschil door 3 % minder kopieën ==')
print(' %.3f cycli (te klein om op een controlekaart te zien)' % math.log2(1 / 0.97))
