# Eindreview Voeding 7 · Supplementen en superfoods

Geordend op ernst. Regelnummers verwijzen naar scenes.js.

## Hoog

1. **s21/s22 (recap): tekst valt buiten beeld en Noor zit verstopt.** De eerste tag in s21 ('misschien ook zonder tabletten niet verkouden', ±870 px breed, gecentreerd op x=1550) loopt tot x≈1985 en wordt rechts afgesneden (zie qa/s21_026.46). Door `noorX: 1180` staat Noor achter de tafel met haar gezicht achter het goji-doosje. Het donkere paneel (1220–1880 × 120–600/640) valt ook over het detoxthee-pak.
   *Voorstel:* laat Noor op haar standaardplek staan (`keuken(ctx, t)`, dus noorX 1600) en zet het paneel bóven de tafel en de hoofden: `ctx.fillRect(980, 110, 900, 340)`. Zet de tags op x=1430 en y = 170/245/320/395, en kort de eerste in tot 'ook zonder tablet misschien niet verkouden'. Doe in s22 hetzelfde met 5 tags op y = 165/230/295/360/425 (tags zijn 56 px hoog, dus 65 px tussenruimte is genoeg). Controleer daarna alle tags met `ctx.measureText`: x ± w/2 moet binnen 40–1880 blijven.

2. **Titel (title): het vraagteken staat over de titeltekst.** `vraagteken(ctx, 1250, 330, …)` valt precies op "superfoods" (sheet_0, titeltegel) en het deksel van de pot (1450, 560, schaal 1.4, bovenkant y≈350) raakt de titelregel.
   *Voorstel:* `potje(ctx, 1500, 700, 1.2)`, `schijf(ctx, 1720, 360, 110)` en `vraagteken(ctx, 1300, 620, …)`, zodat alles rechts van en onder de titel staat. Check de breedte van de titeltekst in de engine.

3. **s20 (vwo, meta-analyse): de forest plot suggereert "geen effect" en heeft geen as.** De samenvattende ruit loopt van X−60 tot precies X (de nullijn). Een vwo-leerling die forest plots kent, leest dat als "betrouwbaarheidsinterval raakt de nullijn, dus niet significant". Dat is het tegendeel van wat er net is gezegd ("het effect is echt"). Er staat ook niet bij wat links en rechts betekenen.
   *Voorstel:* ruit van X−55 tot X−15 (`moveTo(X-55,730) … lineTo(X-15,730)`, midden X−35), zodat hij duidelijk links van de lijn ligt. Zet onder de as: `regel(ctx,'← korter',X-20,790,1,C.text2,22,'right',700); regel(ctx,'langer →',X+20,790,1,C.text2,22,'left',700); regel(ctx,'geen verschil',X,250,1,C.text2,20,'center',600)`. Dan schuift 'weegt zwaarder…' naar y=850.

4. **s13 (loting): de groepen zijn 13 tegen 7.** `hash(i*7) < 0.5` geeft ongelijke groepen (qa/s13_026.16). Dat ondermijnt de boodschap "eerlijk verdeeld door loting", en de controlegroep ziet er half zo groot uit.
   *Voorstel:* een gelijke verdeling met een willekeurige volgorde: `const order=[...Array(20).keys()].sort((a,b)=>hash(a*7)-hash(b*7)); const grp = order.indexOf(i) < 10 ? 0 : 1; const idx = order.indexOf(i) % 10;`. Gebruik een raster van 5×2 per groep: `tx=(grp?1260:240)+(idx%5)*90`, `ty=300+Math.floor(idx/5)*90`.

5. **s05 (foliumzuur-tijdlijn): 'zwanger? test' staat te laat en de as heeft geen eenheid.** De test staat op +6 weken na de bevruchting (8 weken zwangerschapsduur). De meeste vrouwen weten het rond 2–4 weken na de bevruchting, ongeveer tegelijk met het sluiten van de neurale buis (dag 26–28). Het beeld overdrijft dus het gat tussen sluiten en weten. De leerling ziet ook niet dat de stippen weken na de bevruchting zijn.
   *Voorstel:* in `mk` wordt `[6,'zwanger? test','weet']` → `[4.5,'vaak pas: zwanger?','weet']` (vlak na 'ruggetje sluit' op 4). Zet de labels om en om boven en onder, zodat ze niet botsen. Zet onder de lijn `regel(ctx,'weken na de bevruchting',X+Wl/2,Y+160,…,C.text2,22,'center',600)`.

## Middel

6. **s16: 'bij zoveel mensen geen toeval' is te stellig.** Gesproken wordt "Bij zoveel mensen is dat niet waarschijnlijk". Methodologisch kun je toeval nooit uitsluiten, en de tag spreekt de stem tegen.
   *Voorstel:* `tag(ctx, 'bij zoveel mensen: toeval onwaarschijnlijk', 960, 840, …)`.

7. **s07: het kruis staat bij een bewering die klopt.** `kruis(ctx, 260, 590, …)` naast 'sporter: eet meestal ook meer' leest als "dat klopt niet". Juist die zin is de (juiste) weerlegging. 'weinig buiten' krijgt geen kruis, dus het is ook nog inconsequent.
   *Voorstel:* laat het kruis weg en schrijf beide tags als antwoord op de afleider: 'sporter? eet meer, dus ook meer B12' en 'weinig buiten? extra vitamine D, geen B12'. Of zet het kruis bij allebei, maar dan bij een los label 'sporter' of 'weinig buiten' links van de tag.

8. **s10: druppels door het label 'nieren', en de B6-tag komt te laat.** De urine-druppels vallen van y 520 naar 780 recht door het label op (1400, 640) (qa/s10_031.89). De B6-tag hangt aan 'zenuwschade' (32,3 s), terwijl de alinea op 33,8 s eindigt. Hij staat dus ±1,5 s in beeld en ontbreekt op de still.
   *Voorstel:* label `regel(ctx,'nieren',1180,450,…,'right')` links naast de nieren. Laat de druppels lopen van `lerp(600,780,u)`. Hang de B6-tag aan `q.on('wateroplosbaar',1)` (27,2 s).

9. **s01: '1000 mg vitamine C, elke ochtend' staat maar ±1,5 s in beeld.** De tag gaat aan op 'Duizend' (4,4 s) en uit op 'jaren' (6,3 s), en wordt daarna vervangen door het citaat op dezelfde plek. Juist de dosis is later nodig (recap: "bij deze hoeveelheid", H2-vraag).
   *Voorstel:* `tag('1000 mg vitamine C, elke ochtend', 960, 300, …, q.on('Duizend',1)*(1-q.on('bewijs',1)))` en het citaat op y=380. Laat beide staan tot 'bewijs'. Schuif het vraagteken naar y=470.

10. **s17 (bewijsbord): een item dat niet wordt uitgesproken verschijnt tegelijk met B12.** 'vitamine C: verkoudheid iets korter' komt in VASTGESTELD op de cue 'B12', terwijl de stem alleen B12 noemt. Twee items tegelijk, waarvan één ongenoemd, trekt de aandacht weg van de uitgesproken claim. Naast "vitamine C voorkomt verkoudheid: weerlegd" lijkt het bovendien tegenstrijdig zonder uitleg.
   *Voorstel:* laat het item verschijnen op `q.on('voorkomt',1)` met de tekst 'vitamine C: verkoudheid ± halve dag korter (vraag H3)'. Dan ziet de leerling het contrast precies wanneer "weerlegd" voor vitamine C valt. Zet in WEERLEGD 'vitamine C voorkomt verkoudheid' om naar '…verkoudheid (gewone bevolking)'. Dat sluit aan op het docentdeel (wel effect bij zware inspanning) en op de sporters in de klas.

## Laag

11. **sections.html, docentdeel: de toon van de recap en de achtergrond botsen, en de recap-beschrijving klopt niet.** De film zegt over opa's 1000 mg: "Bij deze hoeveelheid kan het weinig kwaad". Het docentdeel noemt "vanaf ± 1 g diarree; bij mannen mogelijk meer nierstenen", en opa is een man op precies 1 g. Een oplettende docent ziet dat als tegenspraak.
    *Voorstel (geen nieuwe opname nodig):* voeg aan het vitamine C-bolletje toe: "Opa's 1000 mg per dag is voor de meeste mensen onschuldig; de film zegt daarom 'weinig kwaad', niet 'geen kwaad'. Wie nierstenen heeft gehad, kan beter overleggen met de huisarts." Pas ook de tabelregel Recap aan: 'twee vragen bij jezelf (nodig? hoeveel?) en drie bij een claim (vergeleken met wat? hoeveel effect? wie betaalde?)'. Er staan nu "drie vragen", terwijl in s22 vijf tags staan.

12. **sections.html, checkvraag 1c en vwo-checkvraag 4: kleine aanscherpingen.**
    - 1c, antwoordmodel: "opgenomen in de dunne darm" wordt "opgenomen in het laatste deel van de dunne darm (met hulp van intrinsieke factor uit de maag)". Dan is helder waarom wat in de dikke darm ontstaat te laat komt. Puntverdeling blijft gelijk.
    - Checkvraag 4 gebruikt de echte 2,8 % en 3,3 %, de film rondt af op "3 → 3,5 op de 100". Voeg in het docentdeel bij het ATBC-bolletje toe: "Laat leerlingen na checkvraag 4a zien dat de film met 3 en 3,5 rondt; het relatieve verschil (18 %) is gelijk, het absolute verschil is 0,5 procentpunt." Zo lijkt het geen fout.

Gecontroleerd en in orde: puntverdeling 7/7/7/7. `correct`-indexen in film.py (q02=1, q06=2, q09=0, q15=1, q19=2) kloppen met de opties in script_v2.md, en de segment-id's komen overeen met segments.json. ATBC-berekeningen in checkvraag 4. Alle cues vinden hun woord (cuecheck: 0 fouten).
