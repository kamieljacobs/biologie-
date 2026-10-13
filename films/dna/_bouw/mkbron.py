#!/usr/bin/env python3
"""Schrijf bron/info.md en bron/script.md voor DNA-film n uit de bouwdata.  python3 mkbron.py 1 2 <repo>/films/dna"""
import json, sys, os, re, html as H
from films import FILMS
HERE=os.path.dirname(os.path.abspath(__file__))
CARD,TITLE,END,CD=3.5,5,8,8
def segs_of(n):
    page=open(f'{HERE}/out/{FILMS[n]["file"]}',encoding='utf-8').read()
    d=json.loads(re.search(r'window\.FILMDATA=(\{.*?\});</script>',page,re.S).group(1)); return d,page
def timeline(segs,niv):
    items=[]; prev=None
    for s in segs:
        if niv=='havo' and s['level']=='vwo': continue
        if s['kind']=='title': items.append(('title',s,TITLE)); prev=s['chapter']; continue
        if s['kind']=='end': items.append(('end',s,END)); continue
        if s['chapter']!=prev and s['chapter']!='Opening': items.append(('card',s,CARD)); prev=s['chapter']
        items.append((s['kind'],s,s['dur'] if s['kind']=='speech' else s['adur']+CD+(6 if s.get('explain') else 2.5)))
    t=0; out=[]
    for k,s,d in items: out.append((k,s,t,d)); t+=d
    return out,t
fmt=lambda x:f'{int(x//60)}:{int(x%60):02d}'
PP='- 12 okt 2026 (later) — nieuwe mensfiguur in opening en samenvatting: met huidskleur, zachte ronde vormen, vriendelijk gezicht (personReal in dnalib); speler: denktijd per vraag instelbaar.'
CC='- 2.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma/dubbele punt, nooit midden in “van 3′ naar 5′”; opnieuw gebouwd, beeld en audio ongewijzigd.'
VWO={7:"vwo-blokken na hoofdstuk 1 (reverse transcriptase, primerkeuze), hoofdstuk 2 (STR, toevalskans), hoofdstuk 3 (referentiegenoom en variant) en hoofdstuk 4 (SNP's, gedeelde stukken en crossing-over)",6:'vwo-blokken na hoofdstuk 2 (activator, repressor, enhancer), hoofdstuk 3 (totipotent, pluripotent, multipotent) en hoofdstuk 4 (methylering, histonen, X-inactivatie en de lapjeskat)',5:'vwo-blokken in hoofdstuk 2 (leesraam, promotor/intron), hoofdstuk 4 (chromosoommutatie; proto-oncogen, tumorsuppressorgen, p53) en de samenvatting (evolutie)',4:'vwo-blokken in hoofdstuk 1 (anticodon, laadenzymen, ribosomaal RNA), hoofdstuk 3 (coderende streng en matrijsstreng) en de samenvatting (gen zonder introns)',1:'hoofdstuk 4 is een vwo-blok',2:'hoofdstuk 4 is een vwo-blok',3:'vwo-blokken aan het eind van hoofdstuk 2 (promotor, leesrichting, splicing) en hoofdstuk 3 (anticodon, wiebelbase, met een eigen vraag)'}
VERSIE={7:'1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (cold case: bloedspoor en stamboomsite); stem eleven_v3 zonder uitspraaktest vooraf',6:'1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (eeneiige tweeling); stem eleven_v3 zonder uitspraaktest vooraf',5:'1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5); opening = puzzel B (zonnebrand); stem eleven_v3 zonder uitspraaktest vooraf',4:'1.1 · 12 oktober 2026 — opnieuw ingesproken met eleven_v3 (Nederlandse aminozuren); 1.0 eerste versie, Part C (prompt v5); opening = puzzel A (insuline uit een bacterie); oefenaflevering met CE-vragen',1:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',2:'2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd',3:'1.0 · 12 oktober 2026 — eerste versie, direct in Part C (prompt v5); opening = puzzel A (mRNA-vaccin)'}
_W12=PP+'\n'+CC+'\n- 2.0 · 12 okt 2026 — nieuwe Part C-look op de speler van Celorganellen (vraag wordt ingesproken; toetsen ↑ ↓ A B C Enter; lettertypen ingebed). Inhoudelijke correcties bij het hertekenen: {}\n- 1.1 / 1.0 · 8–9 okt 2026 — eerste versie, stijl “Papier en inkt”.'
WIJZ={7:"- 1.0 · 13 okt 2026 — eerste versie (reeksmodus). Script nagekeken door een vakinhoudelijke review (o.a. rode bloedcellen zonder kern, drie PCR-temperaturen, reverse transcriptase vóór de primers, niet-coderend DNA, twee STR-versies, PCR-stap in het bruinvisantwoord, drie miljard dollar, NIPT zonder lengtefiltering en als screening, Nederland vs VS bij stamboomsites, restrictie-enzym/plasmide/genetisch gemodificeerd, CRISPR bij sikkelcelziekte) en een didactiek/taal-review (o.a. nieuwe NIPT-checkvraag, opening verraadt de achterneef niet, kortere opties bij V4, lettervolgorde A, B, C, B, slotzinnen 'Terug naar het bloedspoor' / 'Terug naar de zaak'). Beelden nagekeken op stijlframes (frames7.js) en contactsheets vwo en havo; na de bouw de strengscheiding in h1a (li 2) gecorrigeerd (ladder begon te dicht op elkaar) en de derde slotregel ingekort.",6:'- 1.0 · 13 okt 2026 — eerste versie (reeksmodus). Script nagekeken door een vakinhoudelijke review (15 punten, o.a. stamceldeling vlak na de deling nog gelijk, lapjeskat met allelen oranje/zwart en lapjeskater XXY, slotjes ook door de cel zelf, structuurgenen erbij, X-inactivatie) en een didactiek/taal-review (15 punten, o.a. V1 zonder genoom/genotype als afleiders, hormoonvraag met promotor/polymerase als afleiders, rattenvraag met moeders aten gewoon in de stam, kookboekmetafoor, slotje niet voorgoed). Beelden nagekeken op stijlframes en contactsheets vwo en havo.',5:'- 1.0 · 13 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten, o.a. stille mutatie in de Wilson-vraag, variatie voor havo, leesraamdefinitie, asbest eruit) en een didactiek/taal-review (15 punten, o.a. afleiders V1/V2/V4, NF2-vraag naar de pagina, genoommutatie naar hoofdstuk 4). Beelden nagekeken op contactsheets vwo en havo.',4:'- 1.1 · 12 okt 2026 — tRNA-kringloop (h1b) opnieuw: één tRNA gaat zichtbaar de kring rond (pakt valine, klikt op G-U-G, valine gaat naar de keten, het tRNA vertrekt leeg met een gestippeld leeg haakje); “vaste combinatie” anticodon C A C → valine plus een rijtje anticodon → aminozuur (h1b li 5–6), met een nieuwe gesproken zin in n5 (“Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine.”); tRNA overal dezelfde opname; anticodon en codon grijpen nu precies in elkaar (`trnaY()`).; alle 20 takes opnieuw ingesproken met eleven_v3 en Nederlandse uitspraak van de aminozuren (na 9 uitspraakrondes met Kamiel); woordtijden opnieuw berekend; spraak nu ≈ 505 s (vwo).\n- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (13 punten, o.a. stopcodon telt mee in het mRNA; A G U als tweede mogelijkheid) en een didactiek/taal-review (15 punten, o.a. "Antwoord C." vooraf, hergebruik van tRNA als werktuig). Beelden nagekeken op contactsheets vwo en havo.',1:_W12.format('schaalbalken bij de kern kloppen nu met 6 µm; 2 %-balk op schaal; bacterie verkleind.'),2:_W12.format('de replicatiesimulatie opent de ladder nu echt (de oude versie liet hem dichtritsen); de nieuwe streng in het vwo-blok groeit van 5′ naar 3′ van rechts naar links, met de primer aan het 5′-uiteinde; primer als RNA (teal).'),
 3:PP+'\n- 1.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma.\n- 1.0.2 · 12 okt 2026 — tRNA’s sluiten nu precies op het codon aan (anticodonbasen grijpen in de codonbasen; eerst hingen ze iets te hoog of schoven ze erin). Helper `trnaY()` in `src/dnalib.js`.\n- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten verwerkt); beelden nagekeken door een tweede, onafhankelijke review (ribosoom volgt de tRNA\'s, losgelaten mRNA houdt zijn basen, labels vrij van elkaar, 3′/5′ bij het anticodon). Dezelfde dag: n17 opnieuw ingesproken, de wiebelbase is de derde base van het codon (niet van het anticodon).'}
AANDACHT={7:"""- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3, één take per alinea, spellingen uit de uitspraaklijst (deeënaa, er-en-aa, pee cee er, zjel, praimer(s), krisper, snip(s), es-tee-er(rs), siekwensen/gesiekwenst, rivurs transcriptase, nipt). Take q4 is opnieuw gegenereerd (de eerste bleef in 'generating' hangen). Wachtlijst hieronder voor de verzameltest.
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| DNA-profiel | n0 | 0:09.4 |
| databank | n0 | 0:11.5 |
| DNA | n3 | 0:05.2 |
| PCR | n3 | 0:13.1 |
| polymerase | n3 | 0:20.3 |
| waterstofbruggen | n3 | 0:30.2 |
| primers | n3 | 0:37.1 |
| hittebestendige | n3 | 0:45.2 |
| PCR | q4 | 0:01.3 |
| PCR | n5 | 0:00.8 |
| primers | n5 | 0:05.4 |
| nucleotiden | n5 | 0:08.6 |
| DNA | n6 | 0:04.7 |
| reverse | n6 | 0:11.2 |
| PCR | n6 | 0:18.2 |
| primers | n6 | 0:19.5 |
| DNA | n8 | 0:00.7 |
| PCR | n9 | 0:00.0 |
| gelelektroforese | n9 | 0:05.8 |
| DNA | n9 | 0:08.1 |
| gel | n9 | 0:12.5 |
| Bruinvissen | q10 | 0:00.0 |
| zeehond-DNA | q10 | 0:13.2 |
| PCR | n11 | 0:12.3 |
| primers | n11 | 0:13.3 |
| zeehond-DNA | n11 | 0:14.6 |
| gel | n11 | 0:16.8 |
| STR | n12 | 0:04.9 |
| DNA | n14 | 0:06.8 |
| sequencen | n14 | 0:08.6 |
| polymerase | n14 | 0:13.4 |
| nucleotiden | n14 | 0:18.4 |
| genoom | n14 | 0:43.3 |
| NIPT | q15 | 0:00.3 |
| DNA | q15 | 0:01.7 |
| foetus | q15 | 0:02.6 |
| gesequencet | n16 | 0:02.2 |
| genoom | n16 | 0:05.2 |
| placenta | n16 | 0:14.3 |
| DNA | n16 | 0:16.3 |
| foetus | n16 | 0:27.3 |
| trisomie | n16 | 0:29.5 |
| referentiegenoom | n17 | 0:05.4 |
| DNA | n17 | 0:10.3 |
| variant | n17 | 0:12.7 |
| databank | n19 | 0:05.9 |
| DNA | n19 | 0:12.2 |
| stamboomsite | n19 | 0:13.0 |
| stamboomsite | q20 | 0:00.3 |
| achterneef | q20 | 0:01.7 |
| DNA | n21 | 0:02.1 |
| Achterneven | n21 | 0:10.1 |
| DNA | n22 | 0:01.8 |
| insulinegen | n22 | 0:09.3 |
| restrictie-enzym | n22 | 0:12.2 |
| plasmide | n22 | 0:14.5 |
| genetisch | n22 | 0:20.9 |
| CRISPR | n22 | 0:25.9 |
| sikkelcelziekte | n22 | 0:35.4 |
| stamboomsite | n23 | 0:03.4 |
| STR's | n23 | 0:04.9 |
| SNP's | n23 | 0:06.2 |
| crossing-over | n23 | 0:20.2 |
| PCR | n25 | 0:03.4 |
| primers | n25 | 0:04.4 |
| gel | n25 | 0:09.8 |
| sequencen | n25 | 0:17.4 |
| stopnucleotiden | n25 | 0:19.3 |
| DNA | n25 | 0:27.9 |
| DNA | n26 | 0:00.2 |

- Puzzels: gekozen A (cold case: bloedspoor op een kapotte ruit, profiel niet in de databank, jaren later een achterneef op een stamboomsite; rode draad door alle vier de hoofdstukken, Golden State Killer 2018 als voorbeeld zonder naam). Afgevallen: B (de coronatest als rode draad: nu V1 en het vwo-blok van hoofdstuk 1), C (de NIPT als rode draad: nu V3 en de brug naar aflevering 8).
- CE-vragen geparafraseerd en naar drie keuzes omgezet (havo 2025-II coronatest, havo 2019-II bruinvissen en NIPT; op de pagina havo 2021-II eDNA); V4 (achterneef) is zelf gemaakt; antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- Vereenvoudigingen: PCR met één getekende primer per streng en drie temperaturen; DNA-profiel als "twintig plekken" op een gewone gel (in werkelijkheid capillaire elektroforese); sequencen als Sanger (stopnucleotiden); NIPT zonder lengtefiltering, celvrij DNA uit de placenta, screening en geen diagnose; stamboomsite: honderdduizenden SNP's, Nederland alleen de eigen databank (zie docentdeel).
- Getallen: 2^30 ≈ 1,07 miljard; Human Genome Project 1990–2003, ≈ 3 miljard dollar; een genoom in een dag (2024–2025); achterneven delen gemiddeld 3,125 %; toevalskans profiel < 1 op een miljard; foetale fractie ≈ 10 %.
- Lengte: spraak vwo ≈ 10:50, havo ≈ 8:55. Kandidaten om in te korten: n14 (geschiedenis van het genoom), n22 (knippen en plakken) en n19 (Nederland/VS).
- Nieuwe bibliotheekobjecten (scenes7.js): chromo, tube, drop, strand, primer, gel, barcode, repeats, folder, database, window_, personIcon, scissors, plasmid, bacterium, pedigree, thermometer; SEQCOL (kleuren voor stopnucleotiden); PERSON_LOOK (huidskleur 2) voor de verdachte.
- Denktijd 12 s bij V2 en V4 (`think`).""",6:"""- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3, één take per alinea, spellingen uit de uitspraaklijst plus nieuwe respellings op basis van de standaard Nederlandse klemtoon (IPA): eustradiol, keratienuh/albumienuh/hemoglobienuh (-ine als /inə/), aapoptoze, metielgroep/metielering, acetielgroepen, em-er-en-aa (mRNA), er-en-aa-polymerase, iks (X-chromosoom). Wachtlijst hieronder voor de verzameltest.
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| DNA | n0 | 0:15.0 |
| DNA | n5 | 0:01.4 |
| genexpressie | n5 | 0:11.8 |
| mRNA | n5 | 0:15.3 |
| huidkeratine | n5 | 0:27.8 |
| albumine | n5 | 0:35.7 |
| beekprik | n6 | 0:02.1 |
| genotype | n6 | 0:14.8 |
| genexpressie | n6 | 0:16.9 |
| promotor | n8 | 0:03.2 |
| DNA | n8 | 0:04.6 |
| RNA-polymerase | n8 | 0:07.6 |
| transcriptiefactor | n8 | 0:13.7 |
| keratine | n8 | 0:28.3 |
| albumine | n8 | 0:29.5 |
| structuurgenen | n8 | 0:30.8 |
| transcriptiefactoren | n8 | 0:38.3 |
| regulatorgenen | n8 | 0:40.5 |
| oestradiol | q9 | 0:00.5 |
| Oestradiol | n10 | 0:01.1 |
| receptor | n10 | 0:03.8 |
| transcriptiefactor | n10 | 0:06.7 |
| regelgebied | n10 | 0:09.3 |
| RNA-polymerase | n10 | 0:11.2 |
| mRNA | n10 | 0:15.6 |
| DNA | n10 | 0:21.6 |
| transcriptiefactoren | n11 | 0:04.5 |
| activator | n11 | 0:06.6 |
| repressor | n11 | 0:10.0 |
| oestradiol | n11 | 0:14.3 |
| receptor | n11 | 0:15.6 |
| enhancer | n11 | 0:19.0 |
| DNA | n11 | 0:20.5 |
| stamcellen | n13 | 0:07.6 |
| embryonale | n13 | 0:10.0 |
| beenmerg | n13 | 0:12.7 |
| stamcel | n13 | 0:16.1 |
| celdifferentiatie | n13 | 0:23.9 |
| stamcellen | q14 | 0:00.8 |
| Differentiatie | n15 | 0:01.0 |
| genexpressie | n15 | 0:02.6 |
| DNA | n15 | 0:04.9 |
| hemoglobine | n15 | 0:12.5 |
| apoptose | n15 | 0:25.1 |
| regulatorgenen | n15 | 0:44.1 |
| stamcel | n15 | 0:47.4 |
| stamcel | n16 | 0:03.6 |
| totipotent | n16 | 0:08.8 |
| placenta | n16 | 0:12.0 |
| Embryonale | n16 | 0:13.0 |
| stamcellen | n16 | 0:14.2 |
| pluripotent | n16 | 0:15.2 |
| beenmerg | n16 | 0:21.2 |
| multipotent | n16 | 0:22.1 |
| gedifferentieerd | n16 | 0:27.1 |
| DNA | n18 | 0:01.7 |
| genexpressie | n18 | 0:03.3 |
| methylgroep | n18 | 0:13.9 |
| promotor | n18 | 0:16.1 |
| transcriptiefactor | n18 | 0:19.8 |
| epigenetische | n18 | 0:39.4 |
| differentiatie | n19 | 0:02.4 |
| DNA | n19 | 0:36.9 |
| Epigenetica | n19 | 0:39.5 |
| genexpressie | q20 | 0:06.0 |
| alvleesklier | q20 | 0:07.0 |
| methylering | n22 | 0:04.0 |
| DNA | n22 | 0:08.2 |
| histonen | n22 | 0:09.5 |
| acetylgroepen | n22 | 0:13.2 |
| lapjeskat | n22 | 0:26.1 |
| X-chromosomen | n22 | 0:28.6 |
| X | n22 | 0:37.3 |
| X-chromosoom | n22 | 0:38.8 |
| lapjeskatten | n22 | 1:00.2 |
| DNA | n24 | 0:01.3 |
| genexpressie | n24 | 0:06.4 |
| Transcriptiefactoren | n24 | 0:07.6 |
| differentiatie | n24 | 0:16.3 |
| epigenetica | n24 | 0:24.2 |
| DNA | n25 | 0:02.1 |

- Puzzels: gekozen A (eeneiige tweeling, rode draad door de hele film). Afgevallen: B (beekprik-metamorfose: nu kort in h1c als voorbeeld, CE havo 2026-I), C (stamceltherapie/iPS: nu kort in h3b).
- CE-vragen geparafraseerd en naar drie keuzes omgezet (havo 2022-I v12 en v26, 2024-I v27, 2025-I v15; op de pagina 2026-I v11, 2024-I v8); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- Vereenvoudigingen: één transcriptiefactor op de promotor (initiatiecomplex en enhancers weggelaten, enhancer alleen in het vwo-blok); 'slotje' = DNA-methylering bij de promotor; rattenvraag: mechanisme in de zaadcellen nog onderwerp van onderzoek; XIST niet genoemd (zie docentdeel).
- Lengte: spraak vwo ≈ 10:30, havo ≈ 8:20. Kandidaten om in te korten: h3b (lab/iPS-zin), h4b (laatste zin, definitie epigenetica) en h4v (histonen).
- Nieuwe bibliotheekobjecten (scenes6.js): lock, methyl, tf, geneRow, geneStrip, skinCell, liverCell, nerveCell, redCell, stemCell, egg, lamprey, rat, cat, hand, cig, heartMark; twee vaste figuren TWIN_A (groen shirt, hardloopster) en TWIN_B (grijs shirt, rookt).
- Denktijd 12 s bij V4 (`think`).""",5:"""- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3 en de spellingen uit de uitspraaklijst; nieuwe woorden staan op de wachtlijst hieronder voor een latere verzameltest over meerdere films. Ronde 1 van de test (18 zinnen, `uitspraaktest_afl5_ronde1.mp3`) is wel gemaakt maar niet beoordeeld.
- Uitspraak-wachtlijst (tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| vijfenzeventigduizend | n0 | 0:17.3 |
| DNA | n0 | 0:24.1 |
| DNA | n3 | 0:20.4 |
| UV | n3 | 0:26.1 |
| UV-licht | q4 | 0:00.0 |
| DNA | q4 | 0:01.9 |
| UV-licht | n5 | 0:01.2 |
| T's | n5 | 0:10.0 |
| DNA | n5 | 0:32.4 |
| UV | n6 | 0:00.5 |
| Röntgenstraling | n6 | 0:01.9 |
| radioactieve | n6 | 0:03.3 |
| DNA | n6 | 0:05.3 |
| mutagene | n6 | 0:17.8 |
| substitutie | n8 | 0:10.4 |
| insertie | n8 | 0:13.9 |
| deletie | n8 | 0:17.0 |
| DNA | n8 | 0:19.7 |
| mRNA | n8 | 0:22.4 |
| substitutie | q9 | 0:00.3 |
| mRNA | q9 | 0:04.6 |
| valine | n10 | 0:03.4 |
| glutaminezuur | n10 | 0:17.3 |
| tryptofaan | n10 | 0:27.8 |
| mRNA | n11 | 0:19.7 |
| deletie | n11 | 0:21.3 |
| leesraam | n12 | 0:09.7 |
| leesraamverschuiving | n12 | 0:14.0 |
| promotor | n12 | 0:20.1 |
| mRNA | n12 | 0:21.9 |
| intron | n12 | 0:24.2 |
| glutamine | n14 | 0:15.0 |
| histidine | n14 | 0:16.3 |
| DNA | n16 | 0:02.4 |
| mRNA | n16 | 0:04.6 |
| Histidine | n16 | 0:11.1 |
| glutamine | n16 | 0:24.5 |
| meiose | n19 | 0:02.7 |
| Down | n19 | 0:11.5 |
| 21 | n19 | 0:13.5 |
| genoommutatie | n19 | 0:15.4 |
| chromosoommutatie | n20 | 0:12.3 |
| tumor | n24 | 0:26.8 |
| proto-oncogenen | n25 | 0:05.4 |
| tumorsuppressorgenen | n25 | 0:18.3 |
| tumorsuppressorgen | n25 | 0:25.2 |
| p53 | n25 | 0:27.3 |
| UV | n27 | 0:01.4 |
| DNA | n29 | 0:02.0 |

- CE-vragen geparafraseerd (havo 2019-II v2, 2025-II v5; op de pagina 2024-II v45, 2022-II v32, 2019-II v31); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- UV-schade is vereenvoudigd tot 'basen aan elkaar, meestal twee T\'s' en 'soms een verkeerde base'; vervellen tot 'cellen die zichzelf opruimen' (zie docentdeel).
- Lengte: spraak vwo ≈ 10:25, havo ≈ 8:30; langer dan afl. 4. Kandidaten om in te korten: h3c (vier niveaus) en het p53-blok (h4v).
- Nieuwe bibliotheekobjecten (scenes5.js): beachBg, sun, uvRay, dimerMark, chromo, cellS, liver, chick, egg, hen, geneBar, pedal. Gedeelde helpers (codonTable, tileRow, bracket, aaBead, macroBg, CODE) zijn op 13 okt van scenes4.js naar dnalib.js verhuisd.
- Denktijd 12 s bij V2 en V3 (`think`).""",4:"""- Uitspraak (rondes 1–9 met Kamiel, 12 okt): opgenomen met ElevenLabs **eleven_v3** (niet multilingual_v2: die gaf de uitgang '-ine' Frans of als 'valinuu'). Aminozuren in de stem-invoer: vaaline, meetioonine, leussine, histiedine, seerine, aalaanine, feenyl-alanine; cysteïne zoals geschreven. De uitgang moet klinken als in 'verwenne' (/vaːˈli.nə/). Afgekeurd: 'valie-nuh'-spellingen (rondes 1–7), 'valienuh' zonder streepje. Verder 'codon tabel' los, losse codons met streepjes, DNA als 'deeënaa', tRNA als 'tee-er-en-aa'.
- tRNA klonk in eleven_v3 elke keer anders. Kamiel koos uitspraak nr 2 (n5 ≈ 0:07,6); `splice_trna.py` plakt precies die opname over alle andere 13 keer (n5, n6, n23; grenzen via DTW, meervouden houden hun eigen s). Originelen in `afl4/v3/pre_splice/`, tijdkaart in `afl4/v3/splice.json`. Neem je n5, n6 of n23 opnieuw op, draai daarna `splice_trna.py` opnieuw.
- n5 kreeg op 12 okt een extra zin (Kamiel: anticodon ↔ aminozuur ook zeggen): "Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine." Los opgenomen (eleven_v3, `afl4/v3/insert/`) en ingevoegd door `insert_n5.py`, ná `splice_trna.py`. Volgorde: `splice_trna.py` → `insert_n5.py` → `make_words4v3.py` → kopieer naar `data/afl4_audio/` → `build.py 4`.
- CE-vragen geparafraseerd (havo 2025-I v39, 2024-II v18; 2022-II v32 als checkvraag); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien. Bij 2024-II is U G U → A G U ook één base; de film benoemt dat.
- Denktijd 12 s bij de twee terugredeneervragen (`think` in het vraagsegment).
- Codontabel als 4 × 4-raster (34 px, net onder het Part C-minimum); vorm in BiNaS niet gecontroleerd.
- Nieuwe bibliotheekobjecten: insulinepen, fabriekstank, bacterie, insuline, codontabel, tRNA-kringloop, mensfiguur personReal.""",1:'- Stem-invoer van film 1 is gereconstrueerd volgens de uitspraaklijst; de letterlijke invoer van 8 oktober is niet bewaard.',2:'- Uitspraak van helicase, primase, ligase en Okazaki (takes n7, n17) is nog niet door Kamiel beoordeeld.',
 3:"""- Uitspraak in context nog door Kamiel te beluisteren: tRNA als “tee-er-en-aa” (n12 ≈ 0:40, n15 ≈ 0:03, n17 ≈ 0:18, n23 ≈ 0:18), TATA-box als “taata-box” (n10 ≈ 0:13), exons als “eksons” (n10 ≈ 0:34), 3′/5′ als “drie-accent/vijf-accent” (n10 ≈ 0:19, n15 ≈ 0:08). Tijden zijn binnen de take.
- Wiebelbase = derde base van het codon (n17 op 12 okt opnieuw ingesproken; de eerste versie zei per abuis “van het anticodon”). Het beeld markeert de derde codonbase in goud, met het anticodon 3′→5′ eronder.
- “Daar bindt RNA-polymerase” bij de TATA-box is vereenvoudigd (transcriptiefactoren); zie docentdeel.
- De kegelslakvraag is geparafraseerd naar CvTE havo 2021-I; de bron staat op de vraagkaart (`source` in het vraagsegment, rechtsboven in Meta).
- Het mRNA-vaccin wordt alleen in de opening, vraag 5 en de samenvatting gebruikt; claims: niet in de kern, wordt geen DNA, wordt afgebroken."""}
def main(n,dest):
    F=FILMS[n]; d,page=segs_of(n); segs=d['segments']; S=json.load(open(f'{HERE}/data/afl{n}_script.json')); stem=json.load(open(f'{HERE}/data/afl{n}_stem.json'))
    tv,TV=timeline(segs,'vwo'); th,TH=timeline(segs,'havo')
    startv={ (k,s['id']):t for k,s,t,_ in tv}; starth={ (k,s['id']):t for k,s,t,_ in th}
    lines=page.split('\n'); ln=lambda pat: next((i+1 for i,l in enumerate(lines) if pat in l),'?')
    slug=F['file'][:-5]; b=os.path.join(dest,slug,'bron'); os.makedirs(b,exist_ok=True)
    spoken=sum(s.get('dur',0)-0.6 if s['kind']=='speech' else s.get('adur',0)-0.3 for s in segs if s['kind'] in('speech','question'))
    look={r[0]:r for r in []}
    rows=re.findall(r'<tr><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td></tr>',F['teacher_how'])
    chs=[]; [chs.append(s['chapter']) for s in segs if s['chapter'] not in chs and s['chapter']!='Einde']
    I=[]
    I.append(f"# {F['film']['title']} — bronmap\n")
    I.append('| Veld | Waarde |\n|---|---|')
    I+= [f"| Bestand | films/dna/{F['file']} (één zelfstandig bestand; audio en lettertypen ingebed) |",
         f"| Reeks / nummer | DNA, film {n} van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |",
         f"| Doelgroep / niveau | havo + vwo; {VWO[n]} (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |",
         f"| Versie / datum | {VERSIE[n]} |",
         f"| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model {stem.get('model','eleven_multilingual_v2')}); één take per alinea of vraag |",
         f"| Duur | gesproken {fmt(spoken)}; speeltijd (zonder wachten bij vragen) vwo {fmt(TV)}, havo {fmt(TH)} |",
         "| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |",
         "| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |",
         "| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–6, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |\n"]
    I.append('## Opbouw\nBegintijden in de speler (hoofdstukkaart), vwo en havo.\n')
    I.append('| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |\n|---|---|---|---|---|---|')
    for ci,ch in enumerate(chs):
        ss=[s for s in segs if s['chapter']==ch and s['kind'] in('speech','question')]
        kv=[t for k,s,t,_ in tv if s['chapter']==ch]; kh=[t for k,s,t,_ in th if s['chapter']==ch]
        m=re.match(r'Hoofdstuk (\d+)',ch); key=m.group(1)+' ' if m else ch.split(' ')[0]
        rr=[x for x in rows if re.sub('<.*?>','',x[0]).startswith(key)] or [['','','','','']]
        r=['',' + '.join(dict.fromkeys(x[1] for x in rr)),' + '.join(dict.fromkeys(x[2] for x in rr)),' / '.join(x[3] for x in rr),'']
        I.append(f"| {fmt(min(kv)) if kv else '—'} | {fmt(min(kh)) if kh else '—'} | {ch} | {', '.join(s['id'] for s in ss)} | {re.sub('<.*?>','',r[1])} · {r[2]} | {r[3]} |")
    I.append('\n## Voorspelvragen\nDe vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.\n')
    I.append('| Segment | Niveau | Vraag | Opties (juist vet) |\n|---|---|---|---|')
    for s in segs:
        if s['kind']=='question': I.append(f"| {s['id']} | {s['level']} | {s['q']} | "+' · '.join(('**'+o+'**') if i==s['correct'] else o for i,o in enumerate(s['options']))+' |')
    I.append('\n## Begrippen\n'+'\n'.join(f"- {g[0]}{' *vwo*' if g[2]=='v' else ''} — {g[1]}" for g in S['GLOSSARY']))
    I.append('\n## Checkvragen\n'+'\n'.join(f"- ({'vwo' if lv=='v' else 'basis'}) {q} — *{a}*" for lv in ('b','v') for q,a in S['CHECKS'][lv]))
    I.append('\n## Getallen\n| Getal | In de film | Bron |\n|---|---|---|\n'+'\n'.join(f'| {a} | {b_} | {c} |' for a,b_,c in S['NUMBERS']))
    I.append(f"""
## Techniek: waar zit wat in de HTML
Regelnummers in {F['file']} (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel {ln('window.FILMDATA=')}. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel {ln('// ===== Part C tokens')}; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel {ln('// ===== DNA series library')}.
- **Scènes**: regel {ln('const SCENES={};')}; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel {ln('const GLOSSARY=')}. **Speler**: regel {ln('// ===== DNA series player')} (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl{n}_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py {n} ../{F['file']}`.
2. **Beeld**: pas `src/scenes{n}.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py {n}` → `out/{F['file']}`. Controleer met `node grab.js <pad>/out/{slug}.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl{n}_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl{n}_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl{n}_stem.json` (respellings volgens de uitspraaklijst), Roos, {stem.get('model','eleven_multilingual_v2')}, één take. Vervang `data/afl{n}_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl{n}_words.json`, en pas de tekst aan in `data/afl{n}_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/{F['file']}` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
{AANDACHT[n]}

## Wijzigingen
{WIJZ[n]}
""")
    open(f'{b}/info.md','w',encoding='utf-8').write('\n'.join(I))
    # script.md
    Sx=[f"# {F['film']['title']} — script\n",f"Stem: Roos, {stem.get('model','eleven_multilingual_v2')} · stem-invoer: {stem['bron']}. Tijden: begin in de speler (vwo / havo). Audio: `FILMDATA.segments[<id>].audio`.\n"]
    for s in segs:
        if s['kind'] not in ('speech','question'): continue
        kv=startv.get(('speech' if s['kind']=='speech' else 'question',s['id'])); kh=starth.get(('speech' if s['kind']=='speech' else 'question',s['id']))
        txt=' '.join(w['t'] for w in s['words']); voice=stem['stem'].get(s['id'],'').replace('\n',' ')
        Sx.append(f"## {s['id']} · {s['chapter']} · {s['level']}{' · vraag' if s['kind']=='question' else ''}\n*begin {fmt(kv) if kv is not None else '—'} / {fmt(kh) if kh is not None else '—'} · {s.get('dur',s.get('adur')):.1f} s*\n\n{txt}\n")
        if voice and re.sub(r'\W','',voice.lower())!=re.sub(r'\W','',txt.lower()): Sx.append(f"> stem-invoer: {voice}\n")
    open(f'{b}/script.md','w',encoding='utf-8').write('\n'.join(Sx))
    print('bron',slug,'ok')
if __name__=='__main__':
    dest=sys.argv[-1]
    for a in sys.argv[1:-1]: main(int(a),dest)
