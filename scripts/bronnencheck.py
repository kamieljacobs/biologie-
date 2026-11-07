#!/usr/bin/env python3
"""Overzicht van de bronnenlogboeken (bron/bronnen.md) per film.

Werkwijze en format: films/BRONNEN.md.

    python3 scripts/bronnencheck.py          # overzicht in de terminal
    python3 scripts/bronnencheck.py --md     # schrijft films/BRONNEN-OVERZICHT.md
    python3 scripts/bronnencheck.py --film films/onderbouw/33c/1-hoe-vindt-een-haai-zijn-prooi
"""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILMS = ROOT / "films"
STATUSSEN = ["✓", "≈", "!", "?"]
SLA_OVER = {"archief-evolutie", "benchmark", "uitspraak-luisterpagina", "logboek"}


def films_met_bronmap():
    """Alle films (mappen met bron/info.md), zonder archief en testmappen."""
    uit = []
    for info in sorted(FILMS.glob("**/bron/info.md")):
        film = info.parent.parent
        rel = film.relative_to(FILMS)
        if rel.parts and rel.parts[0] in SLA_OVER:
            continue
        uit.append(film)
    return uit


def tabellen(tekst):
    """Geeft per kop (## ...) de rijen van de eerste tabel eronder."""
    blokken, kop, rijen = {}, None, []
    for regel in tekst.splitlines():
        if regel.startswith("## "):
            if kop is not None:
                blokken[kop] = rijen
            kop, rijen = regel[3:].strip().lower(), []
        elif regel.startswith("|") and kop is not None:
            cellen = [c.strip() for c in regel.strip().strip("|").split("|")]
            if all(set(c) <= set("-: ") for c in cellen):
                continue
            rijen.append(cellen)
    if kop is not None:
        blokken[kop] = rijen
    return blokken


def lees_logboek(pad):
    blokken = tabellen(pad.read_text(encoding="utf-8"))
    bronnen = {}
    for rij in blokken.get("bronnen", [])[1:]:
        if len(rij) >= 2 and re.fullmatch(r"B\d+", rij[0]):
            bronnen[rij[0]] = rij[1].upper()
    beweringen = []
    for rij in blokken.get("beweringen", [])[1:]:
        if len(rij) < 5:
            continue
        nrs = re.findall(r"B\d+", rij[3])
        beweringen.append({"nr": rij[0], "waar": rij[1], "tekst": rij[2],
                           "bronnen": nrs, "status": rij[4].strip()})
    steekproef = [r for r in blokken.get("menselijke controle", [])[1:]
                  if len(r) >= 4 and r[2] and r[3]]
    return bronnen, beweringen, steekproef


def controleer(film):
    pad = film / "bron" / "bronnen.md"
    res = {"film": film.relative_to(ROOT).as_posix(), "logboek": pad.exists(),
           "telling": {s: 0 for s in STATUSSEN}, "meldingen": [], "steekproef": 0}
    if not pad.exists():
        return res
    bronnen, beweringen, steekproef = lees_logboek(pad)
    res["steekproef"] = len(steekproef)
    if not beweringen:
        res["meldingen"].append("geen beweringen gevonden")
    for b in beweringen:
        st = b["status"]
        if st not in STATUSSEN:
            res["meldingen"].append(f"bewering {b['nr']}: onbekende status '{st}'")
            continue
        res["telling"][st] += 1
        onbekend = [n for n in b["bronnen"] if n not in bronnen]
        if onbekend:
            res["meldingen"].append(f"bewering {b['nr']}: bron {', '.join(onbekend)} staat niet in de bronnenlijst")
        if st == "✓":
            if len(set(b["bronnen"])) < 2:
                # één bron mag alleen als het de oorsprong is (register/dataset)
                res["meldingen"].append(f"bewering {b['nr']}: ✓ met één bron (alleen goed als het de oorsprong is)")
            if not any(bronnen.get(n) == "A" for n in b["bronnen"]):
                res["meldingen"].append(f"bewering {b['nr']}: ✓ zonder bron van niveau A")
    if res["telling"]["!"]:
        res["meldingen"].append(f"{res['telling']['!']} bewering(en) met ! : film of docentdeel aanpassen")
    if res["telling"]["?"]:
        res["meldingen"].append(f"{res['telling']['?']} bewering(en) nog niet nagegaan")
    if not steekproef:
        res["meldingen"].append("nog geen menselijke steekproef")
    return res


def stand(r):
    if not r["logboek"]:
        return "geen logboek"
    t = r["telling"]
    if t["!"] or t["?"]:
        return "in controle"
    if not r["steekproef"]:
        return "wacht op steekproef"
    return "gecontroleerd"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--md", action="store_true", help="schrijf films/BRONNEN-OVERZICHT.md")
    ap.add_argument("--film", help="alleen deze filmmap")
    args = ap.parse_args()

    films = [ROOT / args.film] if args.film else films_met_bronmap()
    res = [controleer(f) for f in films]
    met = [r for r in res if r["logboek"]]
    tot = {s: sum(r["telling"][s] for r in met) for s in STATUSSEN}
    standen = {}
    for r in res:
        standen[stand(r)] = standen.get(stand(r), 0) + 1

    regels = []
    for r in met:
        t = r["telling"]
        regels.append(f"{r['film']}: {stand(r)} · " + " · ".join(f"{t[s]} {s}" for s in STATUSSEN))
        for m in r["meldingen"]:
            regels.append(f"    - {m}")
    regels.append("")
    regels.append(f"{len(res)} films · " + " · ".join(f"{n} {k}" for k, n in sorted(standen.items())))
    regels.append("Beweringen totaal: " + " · ".join(f"{tot[s]} {s}" for s in STATUSSEN))
    print("\n".join(regels))

    if args.md:
        uit = ["# Overzicht bronnencontrole", "",
               "Gemaakt met `python3 scripts/bronnencheck.py --md`. Werkwijze: `films/BRONNEN.md`.", "",
               "| Stand | Aantal films |", "|---|---|"]
        uit += [f"| {k} | {n} |" for k, n in sorted(standen.items())]
        uit += ["", "| Film | Stand | ✓ | ≈ | ! | ? | Steekproef |", "|---|---|---|---|---|---|---|"]
        for r in met:
            t = r["telling"]
            uit.append(f"| `{r['film']}` | {stand(r)} | {t['✓']} | {t['≈']} | {t['!']} | {t['?']} | {r['steekproef']} |")
        uit += ["", f"Beweringen totaal: " + " · ".join(f"{tot[s]} {s}" for s in STATUSSEN), ""]
        (FILMS / "BRONNEN-OVERZICHT.md").write_text("\n".join(uit), encoding="utf-8")
        print("\nGeschreven: films/BRONNEN-OVERZICHT.md")


if __name__ == "__main__":
    sys.exit(main())
