"""Graaddagen voor film fo3 (Hoe lang al dood?).
Bron ontwikkelduur: Grassberger & Reiter (2001), Forensic Sci Int 120:32-36,
Lucilia sericata, per stadium T(theta) = a*exp(-tau*theta) + T0 (uren),
parameters zoals weergegeven in arXiv:0904.0376 tabel 1. Drempel 8 graden (zelfde bron).
"""
import math
STADIA = [  # naam, a (h), tau (1/C), T0 (h)
    ("ei", 1.28e2, 0.10, 3.74),
    ("larve 1", 1.00e3, 0.20, 8.32),
    ("larve 2", 1.10e3, 0.19, 10.73),
    ("larve 3 (eten)", 2.34e3, 0.22, 24.99),
]
DREMPEL = 8.0

def duur(theta):
    return sum(a*math.exp(-tau*theta)+t0 for _, a, tau, t0 in STADIA)

print("Ei tot einde eten larve 3, Lucilia sericata (Grassberger & Reiter 2001):")
for th in (16, 18, 20, 22, 25):
    h = duur(th)
    gd = h/24*(th-DREMPEL)
    print(f"  {th} C: {h:6.1f} uur = {h/24:4.1f} dagen; graaddagen boven {DREMPEL:.0f} C = {gd:5.1f}")

# Rekenvoorbeeld in de film (afgerond model): 70 graaddagen boven 8 graden nodig
NODIG = 70
print("\nRekenvoorbeeld film (model, afgerond): nodig =", NODIG, "graaddagen boven 8 graden")
# Variant 1: constant 20 graden in de kamer
per_dag = 20-DREMPEL
print(f"  constant 20 C: {per_dag:.0f} graaddagen per dag -> {NODIG/per_dag:.2f} dagen")
# Variant 2: constant 15 graden
per_dag = 15-DREMPEL
print(f"  constant 15 C: {per_dag:.0f} graaddagen per dag -> {NODIG/per_dag:.2f} dagen")
# Variant 3 (terugrekenen): larven gevonden op dag 0; dagtemperaturen terug in de tijd
# eerst 4 dagen 14 C (verwarming uit, laatste dagen), daarvoor 20 C
reeks = [14, 14, 14, 14] + [20]*10   # van vondst terug in de tijd
som, dagen = 0, 0.0
for t in reeks:
    bij = t-DREMPEL
    if som+bij >= NODIG:
        dagen += (NODIG-som)/bij
        som = NODIG
        break
    som += bij; dagen += 1
print(f"  terugrekenen 4 dagen 14 C, daarvoor 20 C: {dagen:.2f} dagen (som {som})")
print("  check: 4*6 =", 4*6, "; rest", NODIG-24, "/12 =", (NODIG-24)/12)

print("\nGekozen getallen voor de scripts (model: 70 graaddagen boven 8 graden):")
for t in (22, 20, 15, 14):
    print(f"  {t} graden: {t-8} graaddagen per dag -> {70/(t-8):.2f} dagen")
# variant C: terugrekenen; laatste 2 dagen 15 graden, daarvoor 22
som = 2*(15-8); rest = 70-som
print(f"  C: laatste 2 dagen 15 graden = {som}; rest {rest} bij 22 graden = {rest/14:.1f} dagen; totaal {2+rest/14:.1f} dagen")
# Afkoel-vuistregel, alleen ter illustratie: 37 -> 31 graden
print("  vuistregel 1 graad per uur na plateau: 37->31 = 6 uur + plateau (variabel)")

print("\n=== script v2 (na review_v1) ===")
print("Modelwaarde graaddagen per temperatuur (G&R 2001, drempel 8; data alleen >= 15 C gemeten):")
for th in (14, 15, 16, 20, 22):
    h = duur(th); print(f"  {th} C: {h/24:4.1f} dagen, {h/24*(th-8):5.1f} graaddagen")
NODIG = 80
print(f"Film v2: {NODIG} graaddagen ('vereenvoudigd model')")
print(f"  15 C: 7 per dag -> {NODIG/7:.1f} dagen (model zelf: {duur(15)/24:.1f}) -> 'ruim elf'")
print(f"  22 C: 14 per dag -> {NODIG/14:.1f} dagen (model zelf: {duur(22)/24:.1f}) -> 'bijna zes'")
print(f"  afleider 'zeven graden warmer = zeven dagen minder': {NODIG/7-7:.1f} -> 'ruim vier'")
print("  venster: ondergrens ~11 dagen (larven, met marge), bovengrens 14 dagen (laatst gezien)")
