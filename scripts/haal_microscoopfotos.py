#!/usr/bin/env python3
"""Haalt microscoopfoto's van de Berkshire Community College Bioscience Image Library (CC0).

Leest tools/virtuele-microscoop/fotos/bronnen.txt: per regel een pagina van
https://blogs.berkshirecc.edu/bccoer/, eventueel gevolgd door ' | <filter>' (regex op
sectie + bijschrift). Van elke foto op die pagina haalt het script het Flickr-origineel,
verkleint het tot maximaal MAX_BREEDTE px breed, slaat het op in fotos/berkshire/ en
voegt het toe aan fotos/catalogus.json met naam, sectie, vergroting, resolutie en bron.
De licentie wordt per foto van de Flickr-pagina gelezen; alleen CC0/PD, CC BY en CC BY-SA
worden opgehaald, de rest wordt overgeslagen en in het log gemeld.
Foto's die al in de catalogus staan (zelfde Flickr-link) worden overgeslagen.

Draait in GitHub Actions (.github/workflows/microscoopfotos.yml), omdat Claude's eigen
omgeving Flickr niet kan bereiken.
"""
import html, io, json, os, re, sys, time, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MAP = ROOT / "tools/virtuele-microscoop/fotos"
DOEL = MAP / "berkshire"
CATALOGUS = MAP / "catalogus.json"
BRONNEN = MAP / "bronnen.txt"
MAX_BREEDTE = 2560
UA = {"User-Agent": "Mozilla/5.0 (biologie-bij-kamiel; microscoopfotos)"}
USER = "146824358@N03"
TIJDBUDGET = float(os.environ.get("MAX_MINUTEN", "80")) * 60  # stop netjes vóór de Actions-timeout; de volgende run gaat verder


def get(url, binair=False, pogingen=3):
    for i in range(pogingen):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                data = r.read()
                return data if binair else data.decode("utf-8", "replace")
        except Exception as e:  # noqa
            print(f"  ! {url}: {e} (poging {i+1})")
            time.sleep(3 * (i + 1))
    return None


def schoon(t):
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


def slug(t):
    t = t.lower().replace("×", "x")
    t = re.sub(r"[^a-z0-9]+", "-", t)
    return t.strip("-")[:90]


def fotos_op_pagina(url):
    """Geeft (sectie, bijschrift, flickr_id) in volgorde van de pagina."""
    pagina = get(url)
    if not pagina:
        return []
    m = re.search(r'<div class="entry-content[^"]*">(.*)</article>', pagina, re.S)
    inhoud = m.group(1) if m else pagina
    tokens = re.finditer(
        r'<h[1-6][^>]*>(.*?)</h[1-6]>|<strong>(.*?)</strong>'
        r'|<a [^>]*href="https?://(?:www\.)?flickr\.com/photos/' + re.escape(USER) + r'/(\d+)[^"]*"[^>]*>(.*?)</a>',
        inhoud, re.S)
    sectie, uit, gezien = "", [], set()
    for t in tokens:
        if t.group(1) is not None or t.group(2) is not None:
            kop = schoon(t.group(1) or t.group(2) or "").rstrip(":").strip()
            if kop and not re.search(r"\d+\s*x$", kop):
                sectie = kop
            continue
        fid, bijschrift = t.group(3), schoon(t.group(4))
        bijschrift = re.sub(r"^[a-z]\.\s*", "", bijschrift)
        if not bijschrift or fid in gezien:
            continue
        gezien.add(fid)
        uit.append((sectie, bijschrift, fid))
    return uit


def origineel(fid):
    for maat in ("o", "6k", "5k", "4k", "3k", "k"):
        p = get(f"https://www.flickr.com/photos/{USER}/{fid}/sizes/{maat}/")
        if not p:
            continue
        m = re.search(r'https://live\.staticflickr\.com/\d+/' + fid + r'_[0-9a-f]+_(?:o|6k|5k|4k|3k|k)\.(?:jpg|png)', p)
        if m:
            titel = re.search(r"<title>(.*?)</title>", p, re.S)
            titel = schoon(titel.group(1)).split("|")[0].strip() if titel else ""
            return m.group(0), titel
    return None, None


# Toegestaan: CC0 / publiek domein, CC BY, CC BY-SA. Alles anders wordt overgeslagen.
LICENTIES = [
    (r"creativecommons\.org/publicdomain/zero", "CC0 (publiek domein)"),
    (r"creativecommons\.org/publicdomain/mark", "Public Domain Mark"),
    (r"creativecommons\.org/licenses/by-sa/", "CC BY-SA"),
    (r"creativecommons\.org/licenses/by/", "CC BY"),
    (r"creativecommons\.org/licenses/by-nc", "CC BY-NC (niet toegestaan)"),
    (r"creativecommons\.org/licenses/by-nd", "CC BY-ND (niet toegestaan)"),
]
TOEGESTAAN = {"CC0 (publiek domein)", "Public Domain Mark", "CC BY-SA", "CC BY"}


def licentie(fid):
    """Leest de licentie van de Flickr-fotopagina zelf (niet van de collectiebeschrijving)."""
    p = get(f"https://www.flickr.com/photos/{USER}/{fid}/")
    if not p:
        return "onbekend (pagina niet geladen)"
    for patroon, naam in LICENTIES:
        if re.search(patroon, p):
            return naam
    m = re.search(r'"license"\s*:\s*"?(\d+)', p)  # Flickr-licentiecodes: 9 = CC0, 4 = BY, 5 = BY-SA, 7 = no known restrictions
    codes = {"9": "CC0 (publiek domein)", "4": "CC BY", "5": "CC BY-SA", "7": "Public Domain Mark"}
    if m and m.group(1) in codes:
        return codes[m.group(1)]
    if re.search(r"All rights reserved", p, re.I):
        return "Alle rechten voorbehouden (niet toegestaan)"
    return "onbekend"


def main():
    DOEL.mkdir(parents=True, exist_ok=True)
    cat = json.loads(CATALOGUS.read_text("utf-8"))
    def fid_van(f):
        m = re.search(r"/(\d{8,})", (f.get("bron") or {}).get("link") or "")
        return m.group(1) if m else None
    per_id = {fid_van(f): f for f in cat["fotos"] if fid_van(f)}
    ids = {f["id"] for f in cat["fotos"]}
    nieuw = 0
    start = time.time()
    op = False
    for regel in BRONNEN.read_text("utf-8").splitlines():
        regel = regel.strip()
        if not regel or regel.startswith("#"):
            continue
        url, _, filt = (s.strip() for s in regel.partition("|"))
        lijst = fotos_op_pagina(url)
        if filt:
            lijst = [x for x in lijst if re.search(filt, f"{x[0]} {x[1]}", re.I)]
        print(f"{url}: {len(lijst)} foto's")
        if op:
            break
        for sectie, bijschrift, fid in lijst:
            if time.time() - start > TIJDBUDGET:
                print(f"Tijdbudget op na {nieuw} foto's; de rest volgt in de volgende run.")
                op = True
                break
            link = f"https://www.flickr.com/photos/{USER}/{fid}/"
            bestaand = per_id.get(fid)
            if bestaand and bestaand.get("bestand"):
                if not bestaand["bron"].get("licentieGecontroleerd"):  # eerder opgehaald zonder controle
                    lic = licentie(fid)
                    bestaand["bron"]["licentie"] = lic
                    bestaand["bron"]["licentieGecontroleerd"] = time.strftime("%Y-%m-%d")
                    print(f"  = {bestaand['id']}: licentie {lic}" + ("" if lic in TOEGESTAAN else "  !! NIET TOEGESTAAN, verwijderen"))
                    time.sleep(1)
                continue
            lic = licentie(fid)
            if lic not in TOEGESTAAN:
                print(f"  - OVERGESLAGEN {fid} ({bijschrift}): licentie {lic}")
                continue
            bron_url, ftitel = origineel(fid)
            if not bron_url:
                print(f"  - geen origineel voor {fid}")
                continue
            data = get(bron_url, binair=True)
            if not data:
                continue
            img = Image.open(io.BytesIO(data)).convert("RGB")
            ob, oh = img.size
            if img.width > MAX_BREEDTE:
                img = img.resize((MAX_BREEDTE, round(img.height * MAX_BREEDTE / img.width)), Image.LANCZOS)
            vm = re.search(r"(\d+)\s*x\b", bijschrift, re.I)
            vergroting = int(vm.group(1)) if vm else None
            kern = bijschrift.split(":", 1)[1] if ":" in bijschrift else bijschrift
            kern = re.sub(r"\d+\s*x\b", "", kern, flags=re.I)
            mag = f"-{vergroting}x" if vergroting else ""
            basis = slug(f"{sectie} {kern}")[:80].strip("-") + mag
            fid_naam = basis if basis not in ids else f"{basis}-{fid[-5:]}"
            ids.add(fid_naam)
            bestand = f"berkshire/{fid_naam}.jpg"
            img.save(MAP / bestand, "JPEG", quality=88, optimize=True, progressive=True)
            titel = ftitel or bijschrift
            if bestaand:  # al beschreven item zonder foto: foto erbij zetten
                (MAP / bestand).rename(MAP / f"berkshire/{bestaand['id']}.jpg")
                bestaand["bron"]["licentie"] = lic
                bestaand["bron"]["licentieGecontroleerd"] = time.strftime("%Y-%m-%d")
                bestaand.update({"bestand": f"berkshire/{bestaand['id']}.jpg", "breedte": img.width, "hoogte": img.height,
                                 "origineleBreedte": ob, "origineleHoogte": oh,
                                 "status": "compleet" if bestaand.get("beschrijving") else "nieuw"})
                bestaand.pop("opmerking", None)
                nieuw += 1
                print(f"  + {bestaand['bestand']} (bij bestaand item)")
                time.sleep(1)
                continue
            cat["fotos"].append({
                "id": fid_naam,
                "status": "nieuw",
                "bestand": bestand,
                "breedte": img.width,
                "hoogte": img.height,
                "origineleBreedte": ob,
                "origineleHoogte": oh,
                "titel": bijschrift,
                "origineleTitel": titel,
                "sectie": sectie,
                "organisme": None,
                "doorsnede": None,
                "vergroting": vergroting,
                "beschrijving": "",
                "structuren": [],
                "bron": {
                    "collectie": "Berkshire Community College Bioscience Image Library",
                    "licentie": lic,
                    "licentieGecontroleerd": time.strftime("%Y-%m-%d"),
                    "link": link,
                    "pagina": url,
                    "bronregel": f"Foto: {titel}{', ' + str(vergroting) + '×' if vergroting and str(vergroting) + 'x' not in titel else ''}, Berkshire Community College Bioscience Image Library, {lic.replace(' (publiek domein)', '') if lic.startswith('CC0') else lic}{', publiek domein' if lic.startswith('CC0') else ''}",
                },
                "gebruik": [],
            })
            per_id[fid] = cat["fotos"][-1]
            nieuw += 1
            print(f"  + {bestand} ({img.width}×{img.height}, origineel {ob}×{oh})")
            if nieuw % 10 == 0:
                CATALOGUS.write_text(json.dumps(cat, ensure_ascii=False, indent=2) + "\n", "utf-8")
            time.sleep(1)
    CATALOGUS.write_text(json.dumps(cat, ensure_ascii=False, indent=2) + "\n", "utf-8")
    print(f"Klaar: {nieuw} nieuwe foto's. Licentie per foto gecontroleerd op de Flickr-pagina; afwijkers staan hierboven als OVERGESLAGEN.")


if __name__ == "__main__":
    sys.exit(main())
