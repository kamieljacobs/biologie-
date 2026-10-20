/* Zelf aan de slag: oefeningen onder een film (Biologie bij Kamiel).
   Leest de oefeningen uit een JSON-bestand naast de film (pad in data-oefenen op de scripttag, relatief aan de pagina)
   en zet onder de begrippen (na #glossary) een blok 'Zelf aan de slag' met deze soorten oefeningen:
     volgorde  – stappen van een proces in de goede volgorde zetten (slepen met muis/touch of knoppen ↑/↓)
     schema    – namen op een eigen lijntekening slepen (of tik-tik: naam kiezen, dan vakje)
     uitleg    – 'Leg het uit': eigen tekst, kernbegrippen tellen (stam-matching), checklist, modeluitleg
     indelen   – kaartjes naar twee tot vier groepen slepen (of tik-tik)
     pijlen    – voorspel per grootheid: neemt toe, neemt af of blijft gelijk (een keten van oorzaak en gevolg)
     grafiek   – een eigen lijntekening van een grafiek aflezen: getal invullen of een keuze maken
     stamboom  – modus bewijs (conclusie + bewijs aanklikken), reeks (kleine stambomen) of hypothese (hypothesen toetsen met genotypen)
     puzzel    – stap voor stap invullen met controle (genotypen, kansen, getallen); de volgende stap verschijnt na een goede
   Alles gebeurt in de browser; de tekst van de leerling blijft alleen lokaal (localStorage), er wordt niets verstuurd.
   Werksessies (sessie/): zonder data-oefenen start er niets vanzelf, maar staat window.BKOefenen klaar (blok, kaart, bouw).
   Na elke controle stuurt een oefening het event 'oe-resultaat' (bubbles) met {id, soort, items:[{label, gekozen, juist, goed}],
   goed, totaal, klaar, tekst?}; de sessiepagina stuurt dat door naar de docent. Op een gewone filmpagina luistert niemand.
   Oefeningen met "vwo": true zijn in de havo-stand (body.havo) verborgen, net als .term.vwo.
   Ingeladen door scripts/oefenen.py op elke film waar een oefenen.json bij hoort. */
(function () {
  'use strict';
  var SCRIPT = document.currentScript;
  var PAD = SCRIPT && SCRIPT.getAttribute('data-oefenen');
  var SESSIE = false; // true in een werksessie: de docent ziet de antwoorden

  var CSS = '' +
    '.oe-blok{--oe-kaart:#1C2A42;--oe-kaart2:#22314D;--oe-rand:rgba(143,160,181,.35);--oe-tekst:#EEF2F7;--oe-zacht:#A9B5C6;--oe-goud:#E0B64A;--oe-goud-ink:#1A1405;--oe-goed:#7FC48F;--oe-fout:#E8876C;--oe-lijn:#C3CEDC;--oe-vwo:#A392D6;--oe-veld:#121A26;' +
      'font-family:"Source Sans 3",system-ui,sans-serif}' +
    '.oe-blok .oe-lijstje,.oe-blok .oe-zweef{color:var(--oe-tekst)}' +
    '.oe-blok.oe-licht{--oe-kaart:#FFFFFF;--oe-kaart2:#F4F0E6;--oe-rand:rgba(40,52,72,.22);--oe-tekst:#1B2433;--oe-zacht:#545F70;--oe-goud:#9A6E0C;--oe-goud-ink:#FFFFFF;--oe-goed:#2C7A43;--oe-fout:#B1432A;--oe-lijn:#3A4658;--oe-vwo:#6A55A8;--oe-veld:#FBFAF6}' +
    '.oe-blok *,.oe-zweef,.oe-zweef *{box-sizing:border-box}' +
    '.oe-lead{color:var(--oe-zacht);margin:0 0 14px;font-size:16px;max-width:68ch}' +
    '.oe-lijstje{display:grid;gap:12px}' +
    '.oe-kaart{background:var(--oe-kaart);border:1px solid var(--oe-rand);border-radius:16px;padding:0;margin:0;overflow:hidden}' +
    '.oe-kaart[open]{border-color:rgba(224,182,74,.55)}' +
    '.oe-kaart>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 18px;min-height:56px;font-weight:400}' +
    '.oe-kaart>summary::-webkit-details-marker{display:none}' +
    '.oe-kaart>summary:focus-visible{outline:2px solid var(--oe-goud);outline-offset:-2px;border-radius:16px}' +
    '.oe-ico{flex:none;width:34px;height:34px;border-radius:50%;border:1px solid var(--oe-goud);color:var(--oe-goud);display:grid;place-items:center}' +
    '.oe-ico svg{width:18px;height:18px}' +
    '.oe-sumtekst{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}' +
    '.oe-soort{font:500 11px/1.2 "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--oe-goud)}' +
    '.oe-titel{font:700 19px/1.25 Fraunces,Georgia,serif;color:var(--oe-tekst)}' +
    '.oe-pijl{flex:none;color:var(--oe-zacht);transition:transform .2s}.oe-kaart[open] .oe-pijl{transform:rotate(90deg)}' +
    '.oe-vwo{font:500 11px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;color:var(--oe-vwo);border:1px solid var(--oe-vwo);border-radius:6px;padding:2px 6px;margin-left:8px;vertical-align:2px;text-transform:none}' +
    'body.havo .oe-kaart.vwo{display:none}' +
    '.oe-inhoud{padding:0 18px 18px}' +
    '.oe-opdracht{margin:0 0 12px;color:var(--oe-tekst);max-width:70ch}' +
    '.oe-hulp{font-size:13.5px;color:var(--oe-zacht);margin:0 0 12px}' +
    '.oe-knoppen{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}' +
    '.oe-knop{font:600 15px/1 "Source Sans 3",system-ui,sans-serif;padding:11px 18px;min-height:44px;border-radius:999px;border:1px solid var(--oe-rand);background:transparent;color:var(--oe-tekst);cursor:pointer}' +
    '.oe-knop:hover{border-color:var(--oe-goud)}' +
    '.oe-knop.goud{background:var(--oe-goud);border-color:var(--oe-goud);color:var(--oe-goud-ink)}' +
    '.oe-knop:focus-visible,.oe-mini:focus-visible,.oe-chip:focus-visible,.oe-vak:focus-visible{outline:2px solid var(--oe-goud);outline-offset:2px}' +
    '.oe-melding{font-weight:600;margin:0}.oe-melding.goed{color:var(--oe-goed)}.oe-melding.half{color:var(--oe-goud)}' +
    /* volgorde */
    '.oe-stappen{list-style:none;margin:0;padding:0;display:grid;gap:8px;counter-reset:oe}' +
    '.oe-stap{counter-increment:oe;display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:8px;background:var(--oe-kaart2);border:1px solid var(--oe-rand);border-radius:12px;padding:8px 8px 8px 4px;touch-action:pan-y;user-select:none;-webkit-user-select:none;cursor:grab}' +
    '.oe-stap .oe-greep{align-self:stretch;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px;touch-action:none;cursor:grab;color:var(--oe-zacht);border-radius:8px;min-height:44px}' +
    '.oe-stap .oe-greep b{font:500 12px/1 "IBM Plex Mono",monospace;color:var(--oe-goud)}' +
    '.oe-stap .oe-greep b::before{content:counter(oe)}' +
    '.oe-stap .oe-greep svg{width:16px;height:16px}' +
    '.oe-stap .oe-tk{line-height:1.4}' +
    '.oe-stap .oe-pijlen{display:flex;flex-direction:column;gap:4px}' +
    '.oe-mini{width:40px;height:34px;border-radius:8px;border:1px solid var(--oe-rand);background:transparent;color:var(--oe-tekst);cursor:pointer;font-size:15px;line-height:1;padding:0}' +
    '.oe-mini:disabled{opacity:.3;cursor:default}' +
    '.oe-stap.sleept{opacity:.35;border-style:dashed}' +
    '.oe-stap.goed{border-color:var(--oe-goed);box-shadow:inset 4px 0 0 var(--oe-goed)}' +
    '.oe-stap.fout{border-color:var(--oe-fout);box-shadow:inset 4px 0 0 var(--oe-fout)}' +
    '.oe-stap .oe-uitleg{grid-column:2/4;font-size:14.5px;color:var(--oe-zacht);line-height:1.45;margin:2px 0 2px}' +
    '.oe-stap .oe-uitleg em{font-style:normal;font-weight:600}.oe-stap.goed .oe-uitleg em{color:var(--oe-goed)}.oe-stap.fout .oe-uitleg em{color:var(--oe-fout)}' +
    '.oe-zweef{position:fixed;z-index:9998;pointer-events:none;box-shadow:0 12px 30px rgba(0,0,0,.35);opacity:.95;margin:0}' +
    /* schema */
    '.oe-schema{display:grid;gap:14px}' +
    '.oe-teken{position:relative;width:100%;max-width:760px;margin:0 auto;background:var(--oe-veld);border:1px solid var(--oe-rand);border-radius:12px}' +
    '.oe-teken svg{display:block;width:100%;height:auto;fill:none;stroke:var(--oe-lijn);stroke-linecap:round;stroke-linejoin:round}' +
    '.oe-teken svg .acc{stroke:var(--oe-goud)}.oe-teken svg .vul{fill:var(--oe-lijn);stroke:none}.oe-teken svg .vulacc{fill:var(--oe-goud);stroke:none}.oe-teken svg .zacht{opacity:.45}' +
    '.oe-teken svg text{fill:var(--oe-zacht);stroke:none;font:500 15px "IBM Plex Mono",monospace;letter-spacing:.06em}' +
    '.oe-teken svg .wijs{stroke:var(--oe-zacht);stroke-width:1.2;stroke-dasharray:4 4}' +
    '.oe-teken svg .wijspunt{fill:var(--oe-goud);stroke:none}' +
    '.oe-teken svg .nrbol{display:none}.oe-teken svg .nrbol circle{fill:var(--oe-kaart2);stroke:var(--oe-goud);stroke-width:2}.oe-teken svg .nrbol text{fill:var(--oe-goud);font:700 22px "IBM Plex Mono",monospace;text-anchor:middle;dominant-baseline:central}' +
    '.oe-vakken{list-style:none;margin:0;padding:0}' +
    '.oe-vak{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;min-height:38px;padding:4px 6px;border-radius:10px;border:1.5px dashed var(--oe-zacht);background:var(--oe-kaart);font-size:14.5px;line-height:1.15;cursor:pointer}' +
    '.oe-vak .oe-nr{flex:none;font:600 12px/1 "IBM Plex Mono",monospace;color:var(--oe-goud);min-width:14px;text-align:center}' +
    '.oe-vak .oe-plek{flex:1;min-width:0;display:flex;align-items:center;min-height:28px}' +
    '.oe-vak .oe-leeg{color:var(--oe-zacht);font-size:13px;font-style:italic;opacity:.8}' +
    '.oe-vak.over,.oe-vak.wacht{border-color:var(--oe-goud);border-style:solid;background:var(--oe-kaart2)}' +
    '.oe-vak.goed{border:2px solid var(--oe-goed)}.oe-vak.fout{border:2px solid var(--oe-fout)}' +
    '.oe-bak{display:flex;flex-wrap:wrap;gap:8px;min-height:50px;padding:10px;border-radius:12px;border:1px dashed var(--oe-rand);align-items:center}' +
    '.oe-bak.over{border-color:var(--oe-goud)}' +
    '.oe-bak .oe-leeg{color:var(--oe-zacht);font-size:14px}' +
    '.oe-chip{font:600 15px/1.15 "Source Sans 3",system-ui,sans-serif;padding:9px 14px;min-height:40px;border-radius:999px;border:1px solid var(--oe-goud);background:var(--oe-kaart2);color:var(--oe-tekst);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;text-align:left}' +
    '.oe-vak .oe-chip{padding:6px 10px;min-height:30px;font-size:14px;overflow-wrap:normal;word-break:normal;hyphens:manual;-webkit-hyphens:manual}' +
    '.oe-chip[aria-pressed="true"]{background:var(--oe-goud);color:var(--oe-goud-ink)}' +
    '.oe-chip.sleept{opacity:.35}' +
    '.oe-terug{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:6px;font-size:14.5px;color:var(--oe-zacht)}' +
    '.oe-terug li b{color:var(--oe-tekst)}.oe-terug li.goed b::before{content:"✓ ";color:var(--oe-goed)}.oe-terug li.fout b::before{content:"✗ ";color:var(--oe-fout)}' +
    /* indelen */
    '.oe-bakken{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin-top:12px}' +
    '.oe-indeel{display:flex;flex-direction:column;gap:8px;min-height:130px;padding:10px;border-radius:12px;border:1.5px dashed var(--oe-zacht);background:var(--oe-kaart);cursor:pointer;min-width:0}' +
    '.oe-indeel h4{margin:0;font:500 12px/1.3 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--oe-goud)}' +
    '.oe-bakuitleg{margin:-4px 0 0;font-size:13.5px;color:var(--oe-zacht);line-height:1.35}' +
    '.oe-inbak{display:flex;flex-direction:column;gap:6px;flex:1}' +
    '.oe-indeel.over,.oe-indeel.wacht{border-color:var(--oe-goud);border-style:solid;background:var(--oe-kaart2)}' +
    '.oe-chip.goed{border-color:var(--oe-goed);box-shadow:inset 4px 0 0 var(--oe-goed)}.oe-chip.fout{border-color:var(--oe-fout);box-shadow:inset 4px 0 0 var(--oe-fout)}' +
    /* pijlen */
    '.oe-situatie{margin:0 0 12px;padding:10px 14px;border-radius:10px;background:var(--oe-kaart2);border-left:4px solid var(--oe-goud);font-weight:600;color:var(--oe-tekst)}' +
    '.oe-pijlrijen{list-style:none;margin:0;padding:0;display:grid;gap:8px;counter-reset:pr}' +
    '.oe-pijlrij{counter-increment:pr;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:center;padding:8px 10px 8px 12px;border-radius:12px;border:1px solid var(--oe-rand);background:var(--oe-kaart2)}' +
    '.oe-pijlnaam::before{content:counter(pr) ". ";font:600 12px "IBM Plex Mono",monospace;color:var(--oe-goud)}' +
    '.oe-pijlknop{display:flex;gap:4px}' +
    '.oe-pk{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 10px;border-radius:999px;border:1px solid var(--oe-rand);background:transparent;color:var(--oe-tekst);cursor:pointer;font:600 14px/1 "Source Sans 3",system-ui,sans-serif}' +
    '.oe-pk b{font-size:18px;line-height:1}' +
    '.oe-pk[aria-pressed="true"]{background:var(--oe-goud);border-color:var(--oe-goud);color:var(--oe-goud-ink)}' +
    '.oe-pk:focus-visible,.oe-keuze:focus-visible,.oe-in:focus-visible{outline:2px solid var(--oe-goud);outline-offset:2px}' +
    '.oe-pijlrij.goed{border-color:var(--oe-goed);box-shadow:inset 4px 0 0 var(--oe-goed)}.oe-pijlrij.fout{border-color:var(--oe-fout);box-shadow:inset 4px 0 0 var(--oe-fout)}' +
    '.oe-pijlrij .oe-uitleg,.oe-vraag .oe-uitleg{grid-column:1/-1;font-size:14.5px;color:var(--oe-zacht);line-height:1.45}' +
    '.oe-pijlrij .oe-uitleg em,.oe-vraag .oe-uitleg em{font-style:normal;font-weight:600}' +
    '.oe-pijlrij.goed .oe-uitleg em,.oe-vraag.goed .oe-uitleg em{color:var(--oe-goed)}.oe-pijlrij.fout .oe-uitleg em,.oe-vraag.fout .oe-uitleg em{color:var(--oe-fout)}' +
    '@media (max-width:560px){.oe-pijlrij{grid-template-columns:1fr}.oe-pk span{display:none}.oe-pk{min-width:52px;justify-content:center}}' +
    /* grafiek en puzzel */
    '.oe-vragen{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px;counter-reset:vr}' +
    '.oe-vraag{counter-increment:vr;display:grid;gap:8px;padding:10px 12px;border-radius:12px;border:1px solid var(--oe-rand);background:var(--oe-kaart2)}' +
    '.oe-vraag.goed{border-color:var(--oe-goed);box-shadow:inset 4px 0 0 var(--oe-goed)}.oe-vraag.fout{border-color:var(--oe-fout);box-shadow:inset 4px 0 0 var(--oe-fout)}' +
    '.oe-vraagtekst{margin:0;color:var(--oe-tekst);line-height:1.45}.oe-vraagtekst::before{content:counter(vr) ". ";font:600 12px "IBM Plex Mono",monospace;color:var(--oe-goud)}' +
    '.oe-invulrij{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center}' +
    '.oe-invul{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}' +
    '.oe-invullabel{color:var(--oe-zacht);font-size:14.5px}.oe-eenheid{color:var(--oe-zacht);font-size:14.5px}' +
    '.oe-in{font:600 16px/1.2 "IBM Plex Mono",monospace;color:var(--oe-tekst);background:var(--oe-veld);border:1px solid var(--oe-rand);border-radius:8px;padding:8px 10px;min-height:40px;max-width:100%}' +
    'select.oe-in{font-family:"Source Sans 3",system-ui,sans-serif}' +
    '.oe-in:disabled{opacity:.85}.oe-invul.fout .oe-in{border-color:var(--oe-fout);box-shadow:0 0 0 1px var(--oe-fout)}' +
    '.oe-keuze{font:600 15px/1.2 "Source Sans 3",system-ui,sans-serif;padding:8px 14px;min-height:40px;border-radius:999px;border:1px solid var(--oe-rand);background:transparent;color:var(--oe-tekst);cursor:pointer;text-align:left}' +
    '.oe-keuze[aria-pressed="true"]{background:var(--oe-goud);border-color:var(--oe-goud);color:var(--oe-goud-ink)}' +
    '.oe-stapknoppen{display:flex;gap:8px;flex-wrap:wrap}.oe-tip{margin:0;font-size:14.5px;color:var(--oe-goud)}' +
    '.oe-puzzel .oe-vraag:not(.goed):not(.fout){border-color:rgba(224,182,74,.55)}' +
    /* stamboom */
    '.oe-stamteken svg .pers[data-nr]{cursor:pointer;outline:none}.oe-stamteken svg .halo{display:none;fill:none;stroke:var(--oe-goud);stroke-width:3}' +
    '.oe-stamteken svg .pers[aria-pressed="true"] .halo{display:inline}.oe-stamteken svg .pers:focus-visible .halo{display:inline;stroke-dasharray:4 3}' +
    '.oe-stamteken svg .pers.markeer .halo{display:inline;stroke:var(--oe-goed)}' +
    '.oe-stamitem{display:grid;gap:8px;padding:12px 0;border-top:1px solid var(--oe-rand)}.oe-stamitem:first-child{border-top:0}' +
    '.oe-stamkop{margin:0;font:500 12px/1.3 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--oe-goud)}' +
    '.oe-stamitem .oe-teken{margin:0}' +
    '.oe-legenda{display:flex;align-items:center;gap:6px 8px;flex-wrap:wrap;font-size:13.5px;color:var(--oe-zacht);margin:6px 0 0}' +
    '.oe-legenda span{display:inline-block;width:13px;height:13px;border:2px solid var(--oe-lijn);margin-left:8px}.oe-legenda .oe-lg-v{border-radius:50%}.oe-legenda .oe-lg-z{background:var(--oe-lijn)}' +
    '.oe-bewijs .oe-klikhulp{margin:0}.oe-vraag .oe-uitleg em{font-style:normal;font-weight:600}' +
    '.oe-hyps .oe-keuze.af{opacity:.6;text-decoration:line-through}.oe-hst{font-weight:600;margin-left:4px}' +
    '.oe-gt{position:absolute;transform:translate(-50%,-50%);list-style:none}' +
    '.oe-gt label{display:flex;align-items:center;gap:6px}.oe-gtnr{display:none;color:var(--oe-zacht);font-size:14.5px;min-width:6.5em}' +
    '.oe-gt .oe-in{min-height:34px;padding:4px 6px;font:600 15px/1 "IBM Plex Mono",monospace;border-radius:8px}' +
    '.oe-gt.goed .oe-in{border-color:var(--oe-goed);box-shadow:0 0 0 1px var(--oe-goed)}.oe-gt.fout .oe-in{border-color:var(--oe-fout);box-shadow:0 0 0 1px var(--oe-fout)}' +
    '.oe-terug li.half b::before{content:"~ ";color:var(--oe-goud)}' +
    '.oe-stamboom.smal .oe-vakken{display:grid;gap:8px;margin-top:10px}.oe-stamboom.smal .oe-gt{position:static;transform:none}.oe-stamboom.smal .oe-gtnr{display:inline}' +
    /* smal: vakjes als genummerde lijst onder de tekening */
    '.oe-schema.smal .oe-teken svg .nrbol{display:inline}' +
    '.oe-schema.smal .oe-vakken{display:grid;gap:8px}' +
    '.oe-schema.smal .oe-vak{position:static;transform:none;width:auto!important;min-height:46px;padding:6px 10px}' +
    '.oe-schema.smal .oe-vak .oe-nr{font-size:14px;min-width:22px;height:22px;border:1.5px solid var(--oe-goud);border-radius:50%;display:grid;place-items:center}' +
    /* leg het uit */
    '.oe-vgrid{display:grid;grid-template-columns:1fr 1.15fr;gap:16px;align-items:start}' +
    '.oe-vkol h4{margin:0 0 8px;font:500 12px/1.2 "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--oe-goud)}' +
    '.oe-vbak{flex-direction:column;align-items:stretch;min-height:120px}' +
    '.oe-kaartje{border-radius:10px;width:100%;line-height:1.35;font-weight:500;font-size:15px;padding:9px 12px;white-space:normal}' +
    '.oe-sloten{list-style:none;margin:0;padding:0;display:grid;gap:8px}' +
    '.oe-slot{display:grid;grid-template-columns:28px 1fr;align-items:center;gap:8px;min-height:52px;padding:6px 8px;border-radius:12px;border:1.5px dashed var(--oe-zacht);background:var(--oe-kaart);cursor:pointer}' +
    '.oe-slot .oe-nr{width:24px;height:24px;border:1.5px solid var(--oe-goud);border-radius:50%;display:grid;place-items:center;font:600 13px/1 "IBM Plex Mono",monospace;color:var(--oe-goud)}' +
    '.oe-slot .oe-plek{min-width:0}.oe-slot .oe-leeg{color:var(--oe-zacht);font-size:13px;font-style:italic;opacity:.8}' +
    '.oe-slot.over,.oe-slot.wacht{border-color:var(--oe-goud);border-style:solid;background:var(--oe-kaart2)}' +
    '.oe-slot.goed{border:2px solid var(--oe-goed)}.oe-slot.fout{border:2px solid var(--oe-fout)}' +
    '.oe-slot .oe-uitleg{grid-column:2;font-size:14px;color:var(--oe-zacht);line-height:1.45}' +
    '.oe-slot .oe-uitleg em{font-style:normal;font-weight:600}.oe-slot.goed .oe-uitleg em{color:var(--oe-goed)}.oe-slot.fout .oe-uitleg em{color:var(--oe-fout)}' +
    '@media (max-width:700px){.oe-vgrid{grid-template-columns:1fr}}' +
    '.oe-veld{width:100%;min-height:150px;resize:vertical;font:17px/1.5 "Source Sans 3",system-ui,sans-serif;color:var(--oe-tekst);background:var(--oe-veld);border:1px solid var(--oe-rand);border-radius:12px;padding:12px 14px}' +
    '.oe-veld:focus{outline:2px solid var(--oe-goud);outline-offset:1px}' +
    '.oe-teller{font:500 12px/1 "IBM Plex Mono",monospace;color:var(--oe-zacht);letter-spacing:.06em}' +
    '.oe-uitkomst{margin-top:16px;display:grid;gap:14px}' +
    '.oe-uitkomst h4{margin:0 0 8px;font:500 12px/1.2 "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--oe-goud)}' +
    '.oe-begrippen{display:flex;flex-wrap:wrap;gap:8px}' +
    '.oe-begrip{font-size:15px;padding:6px 12px;border-radius:999px;border:1px solid var(--oe-rand);color:var(--oe-zacht)}' +
    '.oe-begrip.ja{border-color:var(--oe-goed);color:var(--oe-goed);font-weight:600}' +
    '.oe-begrip.ja::before{content:"✓ "}.oe-begrip.nee{opacity:.75}' +
    '.oe-check{list-style:none;margin:0;padding:0;display:grid;gap:6px}' +
    '.oe-check label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;line-height:1.4}' +
    '.oe-check input{width:20px;height:20px;margin:1px 0 0;accent-color:var(--oe-goud);flex:none}' +
    '.oe-model{background:var(--oe-kaart2);border-left:4px solid var(--oe-goud);border-radius:10px;padding:12px 16px;line-height:1.55}' +
    '.oe-model p{margin:0;max-width:none}.oe-model p+p{margin-top:8px}' +
    '.oe-privacy{font-size:12.5px;color:var(--oe-zacht);margin:8px 0 0}' +
    '@media (max-width:560px){.oe-kaart>summary{padding:12px 14px}.oe-inhoud{padding:0 12px 14px}.oe-stap{grid-template-columns:30px 1fr auto;font-size:16px}.oe-titel{font-size:17.5px}}';

  var ICOON = {
    volgorde: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 5l1-1v4M3.5 11h2l-2 3h2M3.5 17h2l-1 1 1 1h-2"/></svg>',
    schema: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="13" r="6"/><path d="M14 9l4-4h3"/><circle cx="9" cy="13" r="1.5"/></svg>',
    uitleg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    indelen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11h7v9H3zM14 11h7v9h-7z"/><path d="M8 3h8v4H8z"/><path d="M10 7l-3 4M14 7l3 4"/></svg>',
    pijlen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 20V5M3.5 8.5L7 5l3.5 3.5"/><path d="M17 4v15M13.5 15.5L17 19l3.5-3.5"/></svg>',
    grafiek: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M7 16c3-1 4-9 7-9s3 5 5 6"/><path d="M14 7v13" stroke-dasharray="2 2.5"/></svg>',
    stamboom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><circle cx="18" cy="6" r="3"/><path d="M9 6h6M12 6v6M7 12h10M7 12v4M17 12v4"/><rect x="4" y="16" width="6" height="5" rx="1"/><circle cx="17" cy="18.5" r="2.5"/></svg>',
    puzzel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/></svg>'
  };
  var SOORTNAAM = { volgorde: 'Zet in de goede volgorde', schema: 'Sleep de namen op het schema', uitleg: 'Leg het uit', indelen: 'Deel in', pijlen: 'Voorspel met pijlen', grafiek: 'Lees de grafiek', puzzel: 'Puzzel stap voor stap', stamboom: 'Vul de stamboom in' };
  var GREEP = '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="4" r="1.3"/><circle cx="11" cy="4" r="1.3"/><circle cx="5" cy="8" r="1.3"/><circle cx="11" cy="8" r="1.3"/><circle cx="5" cy="12" r="1.3"/><circle cx="11" cy="12" r="1.3"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function schud(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function opslag(sleutel, waarde) {
    try {
      if (waarde === undefined) return JSON.parse(localStorage.getItem(sleutel) || 'null');
      if (waarde === null) localStorage.removeItem(sleutel); else localStorage.setItem(sleutel, JSON.stringify(waarde));
    } catch (e) { return null; }
  }
  // in een werksessie heet de controleknop 'Lever in en controleer': dan ziet de docent het antwoord
  function ctrl() { return SESSIE ? 'Lever in en controleer' : 'Controleer'; }
  // resultaat van een controle doorgeven (werksessie); items = [{label, gekozen, juist, goed}]
  function rapport(doos, o, items, extra) {
    var goed = items.filter(function (x) { return x.goed; }).length;
    var d = { id: o.id, soort: o.soort, items: items, goed: goed, totaal: items.length, klaar: goed === items.length };
    if (extra) Object.keys(extra).forEach(function (k) { d[k] = extra[k]; });
    try { doos.dispatchEvent(new CustomEvent('oe-resultaat', { bubbles: true, detail: d })); } catch (e) { /* oude browser */ }
  }
  // sleutel per film (via het pad van oefenen.json), zodat de filmpagina en de losse oefenpagina dezelfde antwoorden delen
  var SLEUTEL = 'bk-oefenen:' + (function () { try { return new URL(PAD, location.href).pathname; } catch (e) { return location.pathname; } })() + ':';

  /* ---------- slepen met pointer events (muis, pen en touch) ---------- */
  // opties: { start(e) -> bool, beweeg(x,y), los(x,y,gesleept) }
  function sleepbaar(knoop, greepTest, op) {
    knoop.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      if (e.target.closest('button.oe-mini')) return;
      if (e.pointerType === 'touch' && greepTest && !greepTest(e)) return;
      var sx = e.clientX, sy = e.clientY, bezig = false, zweef = null, dx = 0, dy = 0, id = e.pointerId;
      function beweeg(ev) {
        if (ev.pointerId !== id) return;
        if (!bezig) {
          if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
          bezig = true;
          var r = knoop.getBoundingClientRect(); dx = sx - r.left; dy = sy - r.top;
          zweef = knoop.cloneNode(true); zweef.classList.add('oe-zweef'); zweef.removeAttribute('id');
          zweef.style.width = r.width + 'px'; zweef.style.height = r.height + 'px';
          var blok = knoop.closest('.oe-blok'); (blok || document.body).appendChild(zweef);
          knoop.classList.add('sleept');
          op.start && op.start();
        }
        ev.preventDefault();
        zweef.style.left = (ev.clientX - dx) + 'px'; zweef.style.top = (ev.clientY - dy) + 'px';
        op.beweeg && op.beweeg(ev.clientX, ev.clientY);
      }
      function klaar(ev) {
        if (ev.pointerId !== id) return;
        document.removeEventListener('pointermove', beweeg, { passive: false });
        document.removeEventListener('pointerup', klaar); document.removeEventListener('pointercancel', klaar);
        if (!bezig) return;
        zweef.remove(); knoop.classList.remove('sleept');
        knoop.dataset.netGesleept = '1'; setTimeout(function () { delete knoop.dataset.netGesleept; }, 50);
        op.los && op.los(ev.clientX, ev.clientY, ev.type === 'pointerup');
      }
      document.addEventListener('pointermove', beweeg, { passive: false });
      document.addEventListener('pointerup', klaar); document.addEventListener('pointercancel', klaar);
    });
  }

  /* ---------- volgorde ---------- */
  function bouwVolgorde(o, doos) {
    // lege genummerde plekken; de stappen staan geschud in een bak en sleep/tik je op hun plek
    var stappen = o.stappen.map(function (s, i) { return { i: i, tekst: s.tekst, uitleg: s.uitleg || '', groep: s.groep }; });
    // stappen met dezelfde 'groep' mogen onderling wisselen (bv. twee beginsituaties)
    function plekken(i) { var g = stappen[i].groep; if (!g) return [i]; return stappen.filter(function (s) { return s.groep === g; }).map(function (s) { return s.i; }); }
    doos.appendChild(el('p', 'oe-hulp', 'Sleep elke stap naar de goede plek. Of tik eerst op een stap en dan op een plek. Tik op een stap in een plek om hem terug te zetten.'));
    var veld = el('div', 'oe-vgrid');
    var links = el('div', 'oe-vkol', '<h4>Stappen</h4>'), rechts = el('div', 'oe-vkol', '<h4>Volgorde</h4>');
    var bak = el('div', 'oe-bak oe-vbak'); bak.setAttribute('aria-label', 'Stappen');
    var sloten = el('ol', 'oe-sloten'); sloten.setAttribute('aria-label', 'Volgorde');
    links.appendChild(bak); rechts.appendChild(sloten); veld.appendChild(links); veld.appendChild(rechts); doos.appendChild(veld);
    stappen.forEach(function (st, k) {
      var li = el('li', 'oe-slot'); li.dataset.k = k; li.tabIndex = 0; li.setAttribute('role', 'button');
      li.innerHTML = '<span class="oe-nr">' + (k + 1) + '</span><span class="oe-plek"></span>';
      sloten.appendChild(li);
    });
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">' + ctrl() + '</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite');
    knoppen.appendChild(melding); doos.appendChild(knoppen);
    var gekozen = null;

    function slots() { return Array.prototype.slice.call(sloten.children); }
    function wisUitslag() {
      melding.textContent = ''; melding.className = 'oe-melding';
      slots().forEach(function (v) { v.classList.remove('goed', 'fout'); var u = v.querySelector('.oe-uitleg'); if (u) u.remove(); });
    }
    function leegCheck() {
      slots().forEach(function (v) {
        var plek = v.querySelector('.oe-plek'), c = plek.querySelector('.oe-chip');
        if (!c) { if (!plek.querySelector('.oe-leeg')) plek.innerHTML = '<span class="oe-leeg">sleep hier stap ' + (+v.dataset.k + 1) + '</span>'; v.setAttribute('aria-label', 'Plek ' + (+v.dataset.k + 1) + ', leeg'); }
        else { var l = plek.querySelector('.oe-leeg'); if (l) l.remove(); v.setAttribute('aria-label', 'Plek ' + (+v.dataset.k + 1) + ': ' + c.textContent); }
      });
      var over = bak.querySelector('.oe-chip'), leeg = bak.querySelector('.oe-leeg');
      if (!over && !leeg) bak.appendChild(el('span', 'oe-leeg', 'Alle stappen staan op een plek.'));
      if (over && leeg) leeg.remove();
    }
    function kies(c) {
      if (gekozen) gekozen.setAttribute('aria-pressed', 'false');
      gekozen = c && c !== gekozen ? c : null;
      if (gekozen) gekozen.setAttribute('aria-pressed', 'true');
      slots().forEach(function (v) { v.classList.toggle('wacht', !!gekozen); });
    }
    function zetIn(c, slot) {
      wisUitslag();
      if (slot) {
        var plek = slot.querySelector('.oe-plek'), al = plek.querySelector('.oe-chip');
        if (al && al !== c) { var van = c.parentNode; if (van.classList.contains('oe-plek')) van.appendChild(al); else bak.appendChild(al); }
        plek.appendChild(c);
      } else bak.appendChild(c);
      kies(null); leegCheck();
    }
    function maakKaartje(st) {
      var c = el('button', 'oe-chip oe-kaartje'); c.type = 'button'; c.textContent = st.tekst; c.dataset.i = st.i; c.setAttribute('aria-pressed', 'false');
      var overSlot = null;
      sleepbaar(c, null, {
        start: function () { kies(null); wisUitslag(); },
        beweeg: function (x, y) {
          var doel = document.elementFromPoint(x, y), slot = doel && doel.closest('.oe-slot');
          if (slot && slot.parentNode !== sloten) slot = null;
          if (overSlot !== slot) { if (overSlot) overSlot.classList.remove('over'); overSlot = slot; if (slot) slot.classList.add('over'); }
          bak.classList.toggle('over', !!(doel && doel.closest('.oe-bak') === bak));
        },
        los: function (x, y, echt) {
          if (overSlot) overSlot.classList.remove('over'); bak.classList.remove('over');
          if (!echt) { overSlot = null; return; }
          var doel = document.elementFromPoint(x, y), slot = doel && doel.closest('.oe-slot');
          if (slot && slot.parentNode === sloten) zetIn(c, slot);
          else if (doel && doel.closest('.oe-bak') === bak) zetIn(c, null);
          overSlot = null;
        }
      });
      c.addEventListener('click', function (e) {
        e.stopPropagation();
        if (c.dataset.netGesleept) return;
        if (c.closest('.oe-slot') && !gekozen) { zetIn(c, null); c.focus(); return; }
        if (gekozen && gekozen !== c && c.closest('.oe-slot')) { zetIn(gekozen, c.closest('.oe-slot')); return; }
        kies(c);
      });
      return c;
    }
    sloten.addEventListener('click', function (e) {
      var slot = e.target.closest('.oe-slot'); if (!slot || !gekozen) return;
      var g = gekozen; zetIn(g, slot); g.focus();
    });
    sloten.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('oe-slot') && gekozen) { e.preventDefault(); var g = gekozen; zetIn(g, e.target); g.focus(); }
    });
    function begin() {
      kies(null); bak.innerHTML = ''; slots().forEach(function (v) { v.querySelector('.oe-plek').innerHTML = ''; });
      var v;
      do { v = schud(stappen.slice()); } while (stappen.length > 1 && v.every(function (s, k) { return plekken(s.i).indexOf(k) >= 0; }));
      v.forEach(function (st) { bak.appendChild(maakKaartje(st)); });
      wisUitslag(); leegCheck();
    }
    knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'opnieuw') return begin();
      wisUitslag(); kies(null);
      var r = slots(), leeg = r.filter(function (v) { return !v.querySelector('.oe-chip'); }).length;
      if (leeg) { melding.textContent = 'Zet eerst alle stappen op een plek (nog ' + leeg + ' leeg).'; melding.className = 'oe-melding half'; return; }
      var goed = 0, uit = [];
      r.forEach(function (slot, k) {
        var i = +slot.querySelector('.oe-chip').dataset.i, pl = plekken(i), ok = pl.indexOf(k) >= 0; if (ok) goed++;
        uit[i] = { label: stappen[i].tekst, gekozen: 'plek ' + (k + 1), juist: 'plek ' + pl.map(function (n) { return n + 1; }).join(' of '), goed: ok };
        slot.classList.add(ok ? 'goed' : 'fout');
        slot.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Hoort op plek ' + pl.map(function (n) { return n + 1; }).join(' of ') + '.</em> ') + esc(stappen[i].uitleg)));
      });
      rapport(doos, o, uit);
      if (goed === r.length) { melding.textContent = 'Helemaal goed! Lees de uitleg bij elke stap nog eens.'; melding.className = 'oe-melding goed'; }
      else { melding.textContent = goed + ' van ' + r.length + ' op de goede plek. Lees de uitleg, verschuif en controleer opnieuw.'; melding.className = 'oe-melding half'; }
    });
    begin();
  }

  /* ---------- schema ---------- */
  function bouwSchema(o, doos) {
    var W = o.breed || 640, H = o.hoog || 400, VB = o.vakbreed || 150;
    var vakjes = o.vakjes.map(function (v, k) { return { k: k, naam: v.naam, x: v.x, y: v.y, punt: v.punt, uitleg: v.uitleg || '' }; });
    var namen = vakjes.map(function (v) { return v.naam; }).concat(o.afleiders || []);
    var wrap = el('div', 'oe-schema');
    doos.appendChild(el('p', 'oe-hulp', 'Sleep een naam naar het goede vakje. Of tik eerst op een naam en dan op een vakje. Tik op een naam in een vakje om hem terug te zetten.'));
    var wijs = vakjes.map(function (v) {
      return '<line class="wijs" x1="' + v.x + '" y1="' + v.y + '" x2="' + v.punt[0] + '" y2="' + v.punt[1] + '"/>' +
        '<circle class="wijspunt" cx="' + v.punt[0] + '" cy="' + v.punt[1] + '" r="4.5"/>';
    }).join('');
    var bollen = vakjes.map(function (v) {
      return '<g class="nrbol"><circle cx="' + v.x + '" cy="' + v.y + '" r="19"/><text x="' + v.x + '" y="' + (v.y + 1) + '">' + (v.k + 1) + '</text></g>';
    }).join('');
    var teken = el('div', 'oe-teken');
    teken.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || o.titel) + '">' + o.svg + wijs + bollen + '</svg>';
    var vakkenLijst = el('ul', 'oe-vakken');
    vakjes.forEach(function (v) {
      var li = el('li', 'oe-vak');
      li.dataset.k = v.k; li.tabIndex = 0; li.setAttribute('role', 'button');
      li.setAttribute('aria-label', 'Vakje ' + (v.k + 1));
      li.style.left = (100 * v.x / W) + '%'; li.style.top = (100 * v.y / H) + '%'; li.style.minWidth = (100 * VB / W) + '%';
      li.innerHTML = '<span class="oe-nr">' + (v.k + 1) + '</span><span class="oe-plek"><span class="oe-leeg">sleep hier</span></span>';
      vakkenLijst.appendChild(li);
    });
    teken.appendChild(vakkenLijst);
    wrap.appendChild(teken);
    var bak = el('div', 'oe-bak'); bak.setAttribute('aria-label', 'Namen');
    wrap.appendChild(bak);
    doos.appendChild(wrap);
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">' + ctrl() + '</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite');
    knoppen.appendChild(melding); doos.appendChild(knoppen);
    var terug = el('ul', 'oe-terug'); doos.appendChild(terug);
    var gekozen = null;

    // smal scherm: vakjes als genummerde lijst onder de tekening
    function maat() { var b = wrap.getBoundingClientRect().width; if (b) wrap.classList.toggle('smal', b < 600); }
    if (window.ResizeObserver) new ResizeObserver(maat).observe(wrap); else window.addEventListener('resize', maat);
    maat();
    // in de smalle stand de lijst onder de tekening zetten
    function plaatsLijst() {
      var smal = wrap.classList.contains('smal');
      if (smal && vakkenLijst.parentNode !== wrap) wrap.insertBefore(vakkenLijst, bak);
      if (!smal && vakkenLijst.parentNode !== teken) teken.appendChild(vakkenLijst);
    }
    new MutationObserver(plaatsLijst).observe(wrap, { attributes: true, attributeFilter: ['class'] });
    plaatsLijst();

    function vakken() { return Array.prototype.slice.call(vakkenLijst.children); }
    function wisUitslag() {
      melding.textContent = ''; melding.className = 'oe-melding'; terug.innerHTML = '';
      vakken().forEach(function (v) { v.classList.remove('goed', 'fout'); });
    }
    function leegCheck() {
      vakken().forEach(function (v) {
        var plek = v.querySelector('.oe-plek');
        if (!plek.querySelector('.oe-chip')) { if (!plek.querySelector('.oe-leeg')) plek.innerHTML = '<span class="oe-leeg">sleep hier</span>'; v.setAttribute('aria-label', 'Vakje ' + (+v.dataset.k + 1) + ', leeg'); }
        else { var l = plek.querySelector('.oe-leeg'); if (l) l.remove(); v.setAttribute('aria-label', 'Vakje ' + (+v.dataset.k + 1) + ': ' + plek.querySelector('.oe-chip').textContent); }
      });
      var over = bak.querySelector('.oe-chip');
      var leeg = bak.querySelector('.oe-leeg');
      if (!over && !leeg) bak.appendChild(el('span', 'oe-leeg', 'Alle namen staan op het schema.'));
      if (over && leeg) leeg.remove();
    }
    function kies(chip) {
      if (gekozen) gekozen.setAttribute('aria-pressed', 'false');
      gekozen = chip && chip !== gekozen ? chip : null;
      if (gekozen) gekozen.setAttribute('aria-pressed', 'true');
      vakken().forEach(function (v) { v.classList.toggle('wacht', !!gekozen); });
    }
    function zetIn(chip, vak) {
      wisUitslag();
      if (vak) {
        var plek = vak.querySelector('.oe-plek'), al = plek.querySelector('.oe-chip');
        if (al && al !== chip) { var van = chip.parentNode; if (van.classList.contains('oe-plek')) van.appendChild(al); else bak.appendChild(al); }
        plek.appendChild(chip);
      } else bak.appendChild(chip);
      kies(null); leegCheck();
    }
    function maakChip(naam) {
      var c = el('button', 'oe-chip'); c.type = 'button'; c.textContent = naam; c.dataset.naam = naam; c.setAttribute('aria-pressed', 'false');
      var overVak = null;
      sleepbaar(c, null, {
        start: function () { kies(null); wisUitslag(); },
        beweeg: function (x, y) {
          var doel = document.elementFromPoint(x, y), vak = doel && doel.closest('.oe-vak');
          if (vak && vak.parentNode !== vakkenLijst) vak = null;
          if (overVak !== vak) { if (overVak) overVak.classList.remove('over'); overVak = vak; if (vak) vak.classList.add('over'); }
          bak.classList.toggle('over', !!(doel && doel.closest('.oe-bak') === bak));
        },
        los: function (x, y, echt) {
          if (overVak) overVak.classList.remove('over'); bak.classList.remove('over');
          if (!echt) { overVak = null; return; }
          var doel = document.elementFromPoint(x, y), vak = doel && doel.closest('.oe-vak');
          if (vak && vak.parentNode === vakkenLijst) zetIn(c, vak);
          else if (doel && doel.closest('.oe-bak') === bak) zetIn(c, null);
          overVak = null;
        }
      });
      c.addEventListener('click', function (e) {
        e.stopPropagation();
        if (c.dataset.netGesleept) return;
        if (c.closest('.oe-vak') && !gekozen) { zetIn(c, null); c.focus(); return; }
        if (gekozen && gekozen !== c && c.closest('.oe-vak')) { var vak = c.closest('.oe-vak'); zetIn(gekozen, vak); return; }
        kies(c);
      });
      return c;
    }
    vakkenLijst.addEventListener('click', function (e) {
      var vak = e.target.closest('.oe-vak'); if (!vak || !gekozen) return;
      var g = gekozen; zetIn(g, vak); g.focus();
    });
    vakkenLijst.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('oe-vak') && gekozen) { e.preventDefault(); var g = gekozen; zetIn(g, e.target); g.focus(); }
    });
    function begin() {
      kies(null); bak.innerHTML = ''; vakken().forEach(function (v) { v.querySelector('.oe-plek').innerHTML = ''; });
      schud(namen.slice()).forEach(function (n) { bak.appendChild(maakChip(n)); });
      wisUitslag(); leegCheck();
    }
    knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'opnieuw') return begin();
      wisUitslag(); kies(null);
      var goed = 0, uit = [];
      vakken().forEach(function (vak) {
        var v = vakjes[+vak.dataset.k], chip = vak.querySelector('.oe-chip'), ok = !!chip && chip.dataset.naam === v.naam;
        if (ok) goed++;
        uit[v.k] = { label: 'Vakje ' + (v.k + 1), gekozen: chip ? chip.dataset.naam : '(leeg)', juist: v.naam, goed: ok };
        vak.classList.add(ok ? 'goed' : 'fout');
        var li = el('li', ok ? 'goed' : 'fout', '<b>' + (v.k + 1) + '. ' + esc(v.naam) + '</b>' + (ok ? '' : (chip ? ' (jij: ' + esc(chip.dataset.naam) + ')' : ' (leeg)')) + (v.uitleg ? ' — ' + esc(v.uitleg) : ''));
        terug.appendChild(li);
      });
      rapport(doos, o, uit);
      if (goed === vakjes.length) { melding.textContent = 'Alles goed!'; melding.className = 'oe-melding goed'; }
      else { melding.textContent = goed + ' van ' + vakjes.length + ' goed. Verbeter de rode vakjes en controleer opnieuw.'; melding.className = 'oe-melding half'; }
    });
    begin();
  }

  /* ---------- leg het uit ---------- */
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function stam(w) {
    if (w.length <= 4) return w;
    var uit = ['heden', 'ingen', 'ische', 'isch', 'ing', 'tjes', 'jes', 'ere', 'en', 'es', 'er', 'e', 's', 't', 'n'];
    for (var i = 0; i < uit.length; i++) {
      var u = uit[i];
      if (w.length - u.length >= 4 && w.slice(-u.length) === u) return w.slice(0, -u.length);
    }
    return w;
  }
  function woordPast(token, woord) {
    if (woord.length <= 3) return token === woord || token === woord + 's' || token === woord + 'en';
    var st = stam(woord);
    if (token.indexOf(st) === 0) return true;
    return st.length >= 6 && token.indexOf(st) > 0; // samenstelling: celmembraan, waterkanaal
  }
  function bevat(tokens, variant) {
    var w = norm(variant).split(' ').filter(Boolean); if (!w.length) return false;
    for (var i = 0; i + w.length <= tokens.length; i++) {
      var ok = true;
      for (var j = 0; j < w.length; j++) if (!woordPast(tokens[i + j], w[j])) { ok = false; break; }
      if (ok) return true;
    }
    return false;
  }
  function bouwUitleg(o, doos) {
    var sl = SLEUTEL + o.id;
    var bewaard = opslag(sl) || {};
    var veld = el('textarea', 'oe-veld'); veld.rows = 6; veld.placeholder = 'Schrijf je uitleg hier, in je eigen woorden…';
    veld.setAttribute('aria-label', 'Jouw uitleg'); veld.value = bewaard.tekst || '';
    doos.appendChild(veld);
    var teller = el('div', 'oe-teller'); doos.appendChild(teller);
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="bekijk">' + (SESSIE ? 'Lever in en bekijk' : 'Bekijk je uitleg') + '</button><button type="button" class="oe-knop" data-a="model">Toon modeluitleg</button><button type="button" class="oe-knop" data-a="wis">Wis</button>');
    doos.appendChild(knoppen);
    doos.appendChild(el('p', 'oe-privacy', SESSIE ? 'Dit is een werksessie: je docent ziet wat je schrijft (in de bespreking zonder je naam).' : 'Je tekst blijft alleen op dit apparaat bewaard en wordt nergens naartoe gestuurd.'));
    var uitkomst = el('div', 'oe-uitkomst'); uitkomst.hidden = true; doos.appendChild(uitkomst);
    var model = el('div', 'oe-uitkomst'); model.hidden = true;
    model.innerHTML = '<div><h4>Modeluitleg</h4><div class="oe-model">' + (Array.isArray(o.model) ? o.model : [o.model]).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div>';
    doos.appendChild(model);

    function telWoorden() { var n = norm(veld.value).split(' ').filter(Boolean).length; teller.textContent = n + (n === 1 ? ' woord' : ' woorden'); }
    function bewaar() { bewaard.tekst = veld.value; opslag(sl, bewaard.tekst || (bewaard.vink && bewaard.vink.some(Boolean)) ? bewaard : null); }
    var wachtRapport = null;
    function begripRes() {
      var tokens = norm(veld.value).split(' ').filter(Boolean);
      return o.begrippen.map(function (b) { var vars = [b.naam].concat(b.varianten || []); return { naam: b.naam, ja: vars.some(function (v) { return bevat(tokens, v); }) }; });
    }
    function stuur(concept) {
      if (!SESSIE) return;
      rapport(doos, o, begripRes().map(function (r) { return { label: r.naam, gekozen: r.ja ? 'gebruikt' : 'niet gebruikt', juist: 'gebruikt', goed: r.ja }; }), { tekst: veld.value, klaar: !!veld.value.trim(), concept: !!concept });
    }
    veld.addEventListener('input', function () { telWoorden(); bewaar(); clearTimeout(wachtRapport); wachtRapport = setTimeout(function () { stuur(true); }, 2500); });
    telWoorden();

    function bekijk() {
      var tokens = norm(veld.value).split(' ').filter(Boolean);
      var res = o.begrippen.map(function (b) {
        var vars = [b.naam].concat(b.varianten || []);
        return { naam: b.naam, ja: vars.some(function (v) { return bevat(tokens, v); }) };
      });
      var n = res.filter(function (r) { return r.ja; }).length;
      var vink = bewaard.vink || [];
      uitkomst.innerHTML = '<div><h4>Kernbegrippen in je uitleg · ' + n + ' van ' + res.length + '</h4><div class="oe-begrippen">' +
        res.map(function (r) { return '<span class="oe-begrip ' + (r.ja ? 'ja' : 'nee') + '">' + esc(r.naam) + '</span>'; }).join('') + '</div>' +
        (n < res.length ? '<p class="oe-hulp" style="margin:8px 0 0">Grijs = niet gevonden. Misschien gebruik je een ander woord; kijk of je uitleg ook zonder dat begrip klopt.</p>' : '') + '</div>' +
        '<div><h4>Zit dit in je uitleg? Vink zelf af</h4><ul class="oe-check">' +
        o.checklist.map(function (c, k) { return '<li><label><input type="checkbox" data-k="' + k + '"' + (vink[k] ? ' checked' : '') + '> <span>' + esc(c) + '</span></label></li>'; }).join('') + '</ul></div>';
      uitkomst.hidden = false;
    }
    uitkomst.addEventListener('change', function (e) {
      var c = e.target.closest('input[data-k]'); if (!c) return;
      bewaard.vink = bewaard.vink || []; bewaard.vink[+c.dataset.k] = c.checked; bewaar();
    });
    knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'bekijk') { bekijk(); clearTimeout(wachtRapport); stuur(false); if (!veld.value.trim()) uitkomst.insertAdjacentHTML('afterbegin', '<p class="oe-melding half">Schrijf eerst je eigen uitleg; dan kun je hem vergelijken.</p>'); }
      else if (a.dataset.a === 'model') { model.hidden = !model.hidden; a.textContent = model.hidden ? 'Toon modeluitleg' : 'Verberg modeluitleg'; }
      else if (a.dataset.a === 'wis') { veld.value = ''; bewaard = {}; opslag(sl, null); telWoorden(); uitkomst.hidden = true; uitkomst.innerHTML = ''; veld.focus(); }
    });
  }

  /* ---------- gedeeld voor de nieuwe soorten ---------- */
  function knoppenRij(doos, extra) {
    var k = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">' + ctrl() + '</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>' + (extra || ''));
    var m = el('p', 'oe-melding'); m.setAttribute('aria-live', 'polite'); k.appendChild(m); doos.appendChild(k);
    return { knoppen: k, melding: m };
  }
  function meld(m, tekst, soort) { m.textContent = tekst; m.className = 'oe-melding' + (soort ? ' ' + soort : ''); }
  // getal uit invoer: komma of punt, breuk 3/4, procentteken mag erachter
  function leesGetal(s) {
    s = String(s || '').trim().toLowerCase().replace(/\s*op\s*/, '/').replace(/\s+/g, '').replace(',', '.');
    if (!s) return NaN;
    if (/%$/.test(s)) { var pr = leesGetal(s.slice(0, -1)); return pr / 100; }
    var b = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (b) return +b[1] / +b[2];
    return /^-?\d*\.?\d+$/.test(s) ? +s : NaN;
  }
  function toonGetal(x) { return String(Math.round(x * 1000) / 1000).replace('.', ','); }
  function getalGoed(invoer, v) {
    var x = leesGetal(invoer); if (isNaN(x)) return false;
    return Math.abs(x - v.antwoord) <= (v.marge || 0) + 1e-9;
  }

  /* ---------- indelen ---------- */
  function bouwIndelen(o, doos) {
    var bakken = o.bakken.map(function (b) { return typeof b === 'string' ? { naam: b } : b; });
    var kaartjes = o.kaartjes.map(function (c, i) {
      var b = typeof c.bak === 'number' ? c.bak : bakken.map(function (x) { return x.naam; }).indexOf(c.bak);
      return { i: i, tekst: c.tekst, bak: b, uitleg: c.uitleg || '' };
    });
    doos.appendChild(el('p', 'oe-hulp', 'Sleep elk kaartje naar de goede groep. Of tik eerst op een kaartje en dan op een groep. Tik op een kaartje in een groep om het terug te zetten.'));
    var pool = el('div', 'oe-bak'); pool.setAttribute('aria-label', 'Kaartjes');
    doos.appendChild(pool);
    var raster = el('div', 'oe-bakken'); doos.appendChild(raster);
    bakken.forEach(function (b, k) {
      var g = el('div', 'oe-indeel'); g.dataset.b = k; g.tabIndex = 0; g.setAttribute('role', 'button'); g.setAttribute('aria-label', 'Groep ' + b.naam);
      g.innerHTML = '<h4>' + esc(b.naam) + '</h4>' + (b.uitleg ? '<p class="oe-bakuitleg">' + esc(b.uitleg) + '</p>' : '') + '<div class="oe-inbak"></div>';
      raster.appendChild(g);
    });
    var kr = knoppenRij(doos), melding = kr.melding;
    var terug = el('ul', 'oe-terug'); doos.appendChild(terug);
    var gekozen = null;
    function groepen() { return Array.prototype.slice.call(raster.children); }
    function wis() { meld(melding, ''); terug.innerHTML = ''; doos.querySelectorAll('.oe-chip').forEach(function (c) { c.classList.remove('goed', 'fout'); }); }
    function leegCheck() {
      var over = pool.querySelector('.oe-chip'), leeg = pool.querySelector('.oe-leeg');
      if (!over && !leeg) pool.appendChild(el('span', 'oe-leeg', 'Alle kaartjes zijn ingedeeld.'));
      if (over && leeg) leeg.remove();
    }
    function kies(c) {
      if (gekozen) gekozen.setAttribute('aria-pressed', 'false');
      gekozen = c && c !== gekozen ? c : null;
      if (gekozen) gekozen.setAttribute('aria-pressed', 'true');
      groepen().forEach(function (g) { g.classList.toggle('wacht', !!gekozen); });
    }
    function zetIn(c, g) { wis(); (g ? g.querySelector('.oe-inbak') : pool).appendChild(c); kies(null); leegCheck(); }
    function maak(k) {
      var c = el('button', 'oe-chip oe-kaartje'); c.type = 'button'; c.textContent = k.tekst; c.dataset.i = k.i; c.setAttribute('aria-pressed', 'false');
      var over = null;
      sleepbaar(c, null, {
        start: function () { kies(null); wis(); },
        beweeg: function (x, y) {
          var d = document.elementFromPoint(x, y), g = d && d.closest('.oe-indeel');
          if (g && g.parentNode !== raster) g = null;
          if (over !== g) { if (over) over.classList.remove('over'); over = g; if (g) g.classList.add('over'); }
          pool.classList.toggle('over', !!(d && d.closest('.oe-bak') === pool));
        },
        los: function (x, y, echt) {
          if (over) over.classList.remove('over'); pool.classList.remove('over');
          var d = echt && document.elementFromPoint(x, y), g = d && d.closest('.oe-indeel');
          if (g && g.parentNode === raster) zetIn(c, g); else if (d && d.closest('.oe-bak') === pool) zetIn(c, null);
          over = null;
        }
      });
      c.addEventListener('click', function (e) {
        e.stopPropagation(); if (c.dataset.netGesleept) return;
        if (c.closest('.oe-indeel') && !gekozen) { zetIn(c, null); c.focus(); return; }
        if (gekozen && gekozen !== c && c.closest('.oe-indeel')) { zetIn(gekozen, c.closest('.oe-indeel')); return; }
        kies(c);
      });
      return c;
    }
    raster.addEventListener('click', function (e) { var g = e.target.closest('.oe-indeel'); if (!g || !gekozen) return; var c = gekozen; zetIn(c, g); c.focus(); });
    raster.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('oe-indeel') && gekozen) { e.preventDefault(); var c = gekozen; zetIn(c, e.target); c.focus(); } });
    function begin() { kies(null); pool.innerHTML = ''; groepen().forEach(function (g) { g.querySelector('.oe-inbak').innerHTML = ''; }); schud(kaartjes.slice()).forEach(function (k) { pool.appendChild(maak(k)); }); wis(); leegCheck(); }
    kr.knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'opnieuw') return begin();
      wis(); kies(null);
      var los = pool.querySelectorAll('.oe-chip').length;
      if (los) return meld(melding, 'Deel eerst alle kaartjes in (nog ' + los + ' over).', 'half');
      var goed = 0;
      groepen().forEach(function (g) {
        g.querySelectorAll('.oe-chip').forEach(function (c) {
          var k = kaartjes[+c.dataset.i], ok = k.bak === +g.dataset.b; if (ok) goed++;
          c.classList.add(ok ? 'goed' : 'fout');
        });
      });
      rapport(doos, o, kaartjes.map(function (k) {
        var c = doos.querySelector('.oe-chip[data-i="' + k.i + '"]'), g = c && c.closest('[data-b]');
        return { label: k.tekst, gekozen: g ? bakken[+g.dataset.b].naam : '(leeg)', juist: bakken[k.bak].naam, goed: c.classList.contains('goed') };
      }));
      kaartjes.forEach(function (k) {
        var c = doos.querySelector('.oe-chip[data-i="' + k.i + '"]'), ok = c.classList.contains('goed');
        terug.appendChild(el('li', ok ? 'goed' : 'fout', '<b>' + esc(k.tekst) + '</b> → ' + esc(bakken[k.bak].naam) + (k.uitleg ? '. ' + esc(k.uitleg) : '')));
      });
      if (goed === kaartjes.length) meld(melding, 'Alles goed ingedeeld!', 'goed');
      else meld(melding, goed + ' van ' + kaartjes.length + ' goed. Lees de uitleg, verschuif de rode kaartjes en controleer opnieuw.', 'half');
    });
    begin();
  }

  /* ---------- voorspel met pijlen ---------- */
  var PIJLKEUZE = [['+', '↑', 'neemt toe'], ['-', '↓', 'neemt af'], ['=', '=', 'blijft gelijk']];
  function bouwPijlen(o, doos) {
    doos.appendChild(el('p', 'oe-hulp', 'Kies bij elke regel: neemt toe, neemt af of blijft gelijk. Werk van boven naar beneden: elke regel volgt uit de vorige.'));
    if (o.situatie) doos.appendChild(el('p', 'oe-situatie', esc(o.situatie)));
    var lijst = el('ol', 'oe-pijlrijen'); doos.appendChild(lijst);
    o.rijen.forEach(function (r, k) {
      var li = el('li', 'oe-pijlrij'); li.dataset.k = k;
      li.innerHTML = '<span class="oe-pijlnaam">' + esc(r.naam) + '</span><span class="oe-pijlknop" role="group" aria-label="' + esc(r.naam) + '">' +
        PIJLKEUZE.map(function (p) { return '<button type="button" class="oe-pk" data-w="' + p[0] + '" aria-pressed="false" title="' + p[2] + '"><b aria-hidden="true">' + p[1] + '</b><span>' + p[2] + '</span></button>'; }).join('') + '</span>';
      lijst.appendChild(li);
    });
    var kr = knoppenRij(doos), melding = kr.melding;
    function rijen() { return Array.prototype.slice.call(lijst.children); }
    function wis() { meld(melding, ''); rijen().forEach(function (li) { li.classList.remove('goed', 'fout'); var u = li.querySelector('.oe-uitleg'); if (u) u.remove(); }); }
    lijst.addEventListener('click', function (e) {
      var b = e.target.closest('.oe-pk'); if (!b) return;
      wis();
      b.parentNode.querySelectorAll('.oe-pk').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
    kr.knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      wis();
      if (a.dataset.a === 'opnieuw') { lijst.querySelectorAll('.oe-pk').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); return; }
      var open = rijen().filter(function (li) { return !li.querySelector('.oe-pk[aria-pressed="true"]'); }).length;
      if (open) return meld(melding, 'Kies eerst bij elke regel een pijl (nog ' + open + ' open).', 'half');
      var goed = 0, uit = [];
      rijen().forEach(function (li) {
        var r = o.rijen[+li.dataset.k], w = li.querySelector('.oe-pk[aria-pressed="true"]').dataset.w, ok = w === r.antwoord; if (ok) goed++;
        var juist = PIJLKEUZE.filter(function (p) { return p[0] === r.antwoord; })[0], jij = PIJLKEUZE.filter(function (p) { return p[0] === w; })[0];
        uit.push({ label: r.naam, gekozen: jij[1] + ' ' + jij[2], juist: juist[1] + ' ' + juist[2], goed: ok });
        li.classList.add(ok ? 'goed' : 'fout');
        li.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Juist is ' + juist[1] + ' ' + juist[2] + '.</em> ') + esc(r.uitleg || '')));
      });
      rapport(doos, o, uit);
      if (goed === o.rijen.length) meld(melding, 'Alles goed voorspeld!', 'goed');
      else meld(melding, goed + ' van ' + o.rijen.length + ' goed. Volg de keten nog eens en controleer opnieuw.', 'half');
    });
  }

  /* ---------- invulvelden (grafiek en puzzel) ---------- */
  function maakVeld(v, naam) {
    var w = el('span', 'oe-invul');
    if (v.label) w.appendChild(el('span', 'oe-invullabel', esc(v.label)));
    var inp;
    if (v.opties) {
      inp = el('select', 'oe-in'); inp.innerHTML = '<option value="">kies…</option>' + v.opties.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('');
    } else {
      inp = el('input', 'oe-in'); inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false; inp.setAttribute('autocapitalize', 'off');
      if (typeof v.antwoord === 'number') inp.inputMode = 'decimal';
      inp.style.width = (v.breed || (typeof v.antwoord === 'number' ? 6 : 7)) + 'em';
    }
    inp.setAttribute('aria-label', v.label || naam || 'antwoord');
    w.appendChild(inp);
    if (v.eenheid) w.appendChild(el('span', 'oe-eenheid', esc(v.eenheid)));
    w._v = v; w._in = inp;
    return w;
  }
  function veldGoed(w) {
    var v = w._v, x = w._in.value;
    if (typeof v.antwoord === 'number') return getalGoed(x, v);
    var lijst = Array.isArray(v.antwoord) ? v.antwoord : [v.antwoord];
    var n = function (s) { s = String(s).replace(/\s+/g, '').replace(/[×x]/g, '×'); return v.hoofdletters ? s : s.toLowerCase(); };
    return lijst.some(function (a) { return n(a) === n(x); });
  }
  function veldAntwoord(v) {
    if (typeof v.antwoord === 'number') return toonGetal(v.antwoord) + (v.eenheid ? ' ' + v.eenheid : '');
    return Array.isArray(v.antwoord) ? v.antwoord[0] : v.antwoord;
  }
  function tekening(o, doos) {
    if (!o.svg) return;
    var t = el('div', 'oe-teken');
    t.innerHTML = '<svg viewBox="0 0 ' + (o.breed || 640) + ' ' + (o.hoog || 400) + '" role="img" aria-label="' + esc(o.alt || o.titel) + '">' + o.svg + '</svg>';
    doos.appendChild(t);
  }

  /* ---------- grafiek lezen ---------- */
  function bouwGrafiek(o, doos) {
    tekening(o, doos);
    var lijst = el('ol', 'oe-vragen'); doos.appendChild(lijst);
    o.vragen.forEach(function (q, k) {
      var li = el('li', 'oe-vraag'); li.dataset.k = k;
      li.appendChild(el('p', 'oe-vraagtekst', esc(q.vraag)));
      var rij = el('div', 'oe-invulrij');
      if (q.keuzes) {
        rij.classList.add('oe-keuzes');
        q.keuzes.forEach(function (c, j) { var b = el('button', 'oe-keuze', esc(c)); b.type = 'button'; b.dataset.j = j; b.setAttribute('aria-pressed', 'false'); rij.appendChild(b); });
      } else rij.appendChild(maakVeld(q, 'antwoord'));
      li.appendChild(rij); lijst.appendChild(li);
    });
    var kr = knoppenRij(doos), melding = kr.melding;
    function vragen() { return Array.prototype.slice.call(lijst.children); }
    function wis() { meld(melding, ''); vragen().forEach(function (li) { li.classList.remove('goed', 'fout'); var u = li.querySelector('.oe-uitleg'); if (u) u.remove(); }); }
    lijst.addEventListener('click', function (e) { var b = e.target.closest('.oe-keuze'); if (!b) return; wis(); b.parentNode.querySelectorAll('.oe-keuze').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); });
    lijst.addEventListener('input', wis);
    lijst.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.classList.contains('oe-in')) { e.preventDefault(); kr.knoppen.querySelector('[data-a="check"]').click(); } });
    kr.knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      wis();
      if (a.dataset.a === 'opnieuw') { lijst.querySelectorAll('.oe-in').forEach(function (x) { x.value = ''; }); lijst.querySelectorAll('.oe-keuze').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); return; }
      var goed = 0, uit = [];
      vragen().forEach(function (li) {
        var q = o.vragen[+li.dataset.k], ok, juist, jij;
        if (q.keuzes) { var g = li.querySelector('.oe-keuze[aria-pressed="true"]'); ok = !!g && +g.dataset.j === q.antwoord; juist = q.keuzes[q.antwoord]; jij = g ? q.keuzes[+g.dataset.j] : '(leeg)'; }
        else { var w = li.querySelector('.oe-invul'); ok = veldGoed(w); juist = veldAntwoord(q); jij = w._in.value.trim() || '(leeg)'; }
        if (ok) goed++;
        uit.push({ label: q.vraag, gekozen: jij, juist: juist, goed: ok });
        li.classList.add(ok ? 'goed' : 'fout');
        li.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Antwoord: ' + esc(juist) + (q.marge ? ' (± ' + toonGetal(q.marge) + ')' : '') + '.</em> ') + esc(q.uitleg || '')));
      });
      rapport(doos, o, uit);
      if (goed === o.vragen.length) meld(melding, 'Alles goed afgelezen!', 'goed');
      else meld(melding, goed + ' van ' + o.vragen.length + ' goed. Kijk nog eens naar de grafiek bij de rode vragen.', 'half');
    });
  }

  /* ---------- puzzel met invullen (stap voor stap) ---------- */
  function bouwPuzzel(o, doos) {
    tekening(o, doos);
    doos.appendChild(el('p', 'oe-hulp', 'Werk stap voor stap. Na een goede stap verschijnt de volgende. Lukt het niet, dan kun je het antwoord laten zien.'));
    var lijst = el('ol', 'oe-vragen oe-puzzel'); doos.appendChild(lijst);
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite');
    var onder = el('div', 'oe-knoppen', '<button type="button" class="oe-knop" data-a="opnieuw">Opnieuw beginnen</button>'); onder.appendChild(melding); doos.appendChild(onder);
    var stand = [], aantal = o.stappen.reduce(function (n, s) { return n + s.velden.length; }, 0);
    function noteer(k, velden, getoond) {
      if (stand[k] && stand[k].vast) return;
      var s = o.stappen[k];
      stand[k] = velden.map(function (w) { var v = w._v; return { label: s.vraag + (v.label ? ' · ' + v.label : ''), gekozen: getoond ? (w._in.value.trim() ? w._in.value.trim() + ' (daarna antwoord bekeken)' : '(antwoord bekeken)') : (w._in.value.trim() || '(leeg)'), juist: veldAntwoord(v), goed: !getoond && veldGoed(w) }; });
      if (getoond || stand[k].every(function (x) { return x.goed; })) stand[k].vast = true;
      var items = []; stand.forEach(function (r) { if (r) items = items.concat(r); });
      rapport(doos, o, items, { totaal: aantal, klaar: stand.length === o.stappen.length && stand.every(function (r) { return r && r.vast; }) });
    }
    function toonStap(k) {
      if (k >= o.stappen.length) { meld(melding, 'Puzzel opgelost!', 'goed'); return; }
      var s = o.stappen[k], li = el('li', 'oe-vraag'); li.dataset.k = k;
      li.appendChild(el('p', 'oe-vraagtekst', esc(s.vraag)));
      var rij = el('div', 'oe-invulrij'); s.velden.forEach(function (v) { rij.appendChild(maakVeld(v)); }); li.appendChild(rij);
      var kn = el('div', 'oe-stapknoppen', '<button type="button" class="oe-knop goud" data-a="stap">' + ctrl() + '</button><button type="button" class="oe-knop" data-a="toon" hidden>Laat het antwoord zien</button>');
      li.appendChild(kn); lijst.appendChild(li);
      var fout = 0;
      function klaar(getoond) {
        li.classList.remove('fout'); li.classList.add('goed');
        rij.querySelectorAll('.oe-invul').forEach(function (w) { w.classList.remove('fout'); });
        var tipEl = li.querySelector('.oe-tip'); if (tipEl) tipEl.remove(); meld(melding, '');
        rij.querySelectorAll('.oe-in').forEach(function (x) { x.disabled = true; });
        kn.remove();
        li.appendChild(el('div', 'oe-uitleg', '<em>' + (getoond ? 'Zo zit het.' : 'Goed.') + '</em> ' + esc(s.uitleg || '')));
        toonStap(k + 1);
      }
      kn.addEventListener('click', function (e) {
        var a = e.target.closest('[data-a]'); if (!a) return;
        if (a.dataset.a === 'toon') {
          noteer(k, Array.prototype.slice.call(rij.querySelectorAll('.oe-invul')), true);
          rij.querySelectorAll('.oe-invul').forEach(function (w) { var v = w._v; w._in.value = typeof v.antwoord === 'number' ? toonGetal(v.antwoord) : (Array.isArray(v.antwoord) ? v.antwoord[0] : v.antwoord); });
          return klaar(true);
        }
        var velden = Array.prototype.slice.call(rij.querySelectorAll('.oe-invul'));
        if (velden.some(function (w) { return !w._in.value.trim(); })) { meld(melding, 'Vul eerst alle vakjes van deze stap in.', 'half'); return; }
        meld(melding, '');
        var ok = velden.every(veldGoed);
        noteer(k, velden, false);
        velden.forEach(function (w) { w.classList.toggle('fout', !veldGoed(w)); });
        if (ok) { velden.forEach(function (w) { w.classList.remove('fout'); }); return klaar(false); }
        fout++; li.classList.add('fout');
        var h = li.querySelector('.oe-tip'); if (!h) { h = el('p', 'oe-tip'); li.insertBefore(h, kn); }
        h.textContent = s.tip && fout === 1 ? 'Tip: ' + s.tip : 'Nog niet goed. Kijk naar de rode vakjes.';
        kn.querySelector('[data-a="toon"]').hidden = false;
      });
      rij.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.classList.contains('oe-in')) { e.preventDefault(); kn.querySelector('[data-a="stap"]').click(); } });
      rij.addEventListener('input', function (e) { var w = e.target.closest('.oe-invul'); if (w) w.classList.remove('fout'); });
    }
    onder.addEventListener('click', function (e) { if (e.target.closest('[data-a="opnieuw"]')) { lijst.innerHTML = ''; meld(melding, ''); stand = []; toonStap(0); } });
    toonStap(0);
  }

  /* ---------- stamboom ----------
     modus 'bewijs'    : één stamboom met vragen (dominant/recessief, autosomaal/X); leerling kiest de conclusie en klikt de personen die het bewijzen
     modus 'reeks'     : meerdere kleine stambomen (items), elk met één vraag
     modus 'hypothese' : leerling kiest een hypothese (AD, AR, XD, XR), vult genotypen in en verklaart hypothesen ongeldig
     personen: {nr, sekse 'm'|'v', ziek, x, gen, ouders:[nr,nr]?}; optioneel paren [[nr,nr]] en vraagkind {ouders:[nr,nr], x}.
     De pagina rekent zelf uit welke erfgangen passen en of een gekozen groep personen iets bewijst. */
  var ERFNAAM = { AD: 'autosomaal dominant', AR: 'autosomaal recessief', XD: 'X-chromosomaal dominant', XR: 'X-chromosomaal recessief' };
  function gtOpties(erf, sekse) { return erf[0] === 'X' && sekse === 'm' ? ['A', 'a'] : ['AA', 'Aa', 'aa']; }
  function gtTekst(erf, g) {
    if (erf[0] !== 'X') return g;
    var x = function (c) { return 'X' + (c === 'A' ? 'ᴬ' : 'ᵃ'); };
    return g.length === 1 ? x(g) + 'Y' : x(g[0]) + x(g[1]);
  }
  function isZiek(erf, g) { var heeft = g.indexOf('A') >= 0; return erf[1] === 'D' ? heeft : !heeft; }
  function paar(a, b) { return [a, b].sort().join(''); }
  function kindKan(erf, gv, gm, gk, sekse) {
    var i, j;
    if (erf[0] === 'X') {
      if (sekse === 'm') return gk.length === 1 && gm.indexOf(gk) >= 0;
      for (j = 0; j < gm.length; j++) if (paar(gv, gm[j]) === gk) return true;
      return false;
    }
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) if (paar(gv[i], gm[j]) === gk) return true;
    return false;
  }
  // deelstamboom: alleen personen in 'kies' (alle als null); een ouder buiten de keuze wordt een vrije persoon
  function maakNet(P, kies) {
    var in_ = function (nr) { return !kies || kies.indexOf(nr) >= 0; };
    var net = [], idx = {}, sekse = {};
    P.forEach(function (p) { sekse[p.nr] = p.sekse; });
    P.forEach(function (p) { if (in_(p.nr)) { idx[p.nr] = net.length; net.push({ nr: p.nr, sekse: p.sekse, ziek: p.ziek, ouders: null }); } });
    P.forEach(function (p) {
      if (!in_(p.nr) || !p.ouders) return;
      var o = p.ouders.filter(in_); if (!o.length) return;
      var paren = p.ouders.map(function (nr) {
        if (in_(nr)) return idx[nr];
        var key = 'vrij-' + nr; if (idx[key] == null) { idx[key] = net.length; net.push({ nr: key, sekse: sekse[nr], ziek: null, ouders: null }); }
        return idx[key];
      });
      net[idx[p.nr]].ouders = paren;
    });
    // volgorde: ouders voor kinderen
    var orde = [], gehad = {};
    while (orde.length < net.length) {
      var voor = orde.length;
      net.forEach(function (q, i) { if (gehad[i]) return; if (!q.ouders || q.ouders.every(function (k) { return gehad[k]; })) { gehad[i] = 1; orde.push(i); } });
      if (orde.length === voor) break;
    }
    return { net: net, orde: orde };
  }
  function past(erf, N, vast) { // bestaat er een invulling? vast: {index: genotype}
    var g = new Array(N.net.length);
    function zoek(k) {
      if (k === N.orde.length) return true;
      var i = N.orde[k], q = N.net[i];
      var opties = vast && vast[i] ? [vast[i]] : gtOpties(erf, q.sekse);
      for (var t = 0; t < opties.length; t++) {
        var x = opties[t];
        if (q.ziek !== null && q.ziek !== undefined && isZiek(erf, x) !== !!q.ziek) continue;
        if (q.ouders) {
          var a = N.net[q.ouders[0]], v = a.sekse === 'm' ? q.ouders[0] : q.ouders[1], m = v === q.ouders[0] ? q.ouders[1] : q.ouders[0];
          if (!kindKan(erf, g[v], g[m], x, q.sekse)) continue;
        }
        g[i] = x; if (zoek(k + 1)) return true;
      }
      return false;
    }
    return zoek(0);
  }
  function welke(erfs, P, kies) { var N = maakNet(P, kies); return erfs.filter(function (e) { return past(e, N); }); }

  // tekening
  function tekenStamboom(st, opt) {
    opt = opt || {};
    var P = st.personen, dy = opt.dy || 130, top = 40;
    var Y = function (gen) { return top + (gen - 1) * dy; };
    var pos = {}; P.forEach(function (p) { pos[p.nr] = p; });
    var maxX = 0, maxG = 1; P.forEach(function (p) { maxX = Math.max(maxX, p.x); maxG = Math.max(maxG, p.gen); });
    if (st.vraagkind) maxG = Math.max(maxG, pos[st.vraagkind.ouders[0]].gen + 1);
    var W = st.breed || maxX + 70, H = st.hoog || Y(maxG) + (opt.extra || 60);
    var s = [], gezinnen = {};
    P.forEach(function (p) { if (p.ouders) { var k = p.ouders.slice().sort().join('|'); (gezinnen[k] = gezinnen[k] || { ouders: p.ouders, kids: [] }).kids.push(p); } });
    (st.paren || []).forEach(function (pr) { var k = pr.slice().sort().join('|'); gezinnen[k] = gezinnen[k] || { ouders: pr, kids: [] }; });
    if (st.vraagkind) { var kk = st.vraagkind.ouders.slice().sort().join('|'); gezinnen[kk] = gezinnen[kk] || { ouders: st.vraagkind.ouders, kids: [] }; gezinnen[kk].vraag = st.vraagkind; }
    Object.keys(gezinnen).forEach(function (k) {
      var gz = gezinnen[k], a = pos[gz.ouders[0]], b = pos[gz.ouders[1]], l = a.x < b.x ? a : b, r = l === a ? b : a, y = Y(l.gen);
      s.push('<line x1="' + (l.x + 19) + '" y1="' + y + '" x2="' + (r.x - 19) + '" y2="' + y + '" stroke-width="2"/>');
      var kx = gz.kids.map(function (c) { return c.x; }); if (gz.vraag) kx.push(gz.vraag.x);
      if (!kx.length) return;
      var mid = (l.x + r.x) / 2, bar = y + dy * (opt.bar || 0.5);
      s.push('<line x1="' + mid + '" y1="' + y + '" x2="' + mid + '" y2="' + bar + '" stroke-width="2"/>');
      var x0 = Math.min.apply(null, kx.concat(mid)), x1 = Math.max.apply(null, kx.concat(mid));
      if (x1 > x0) s.push('<line x1="' + x0 + '" y1="' + bar + '" x2="' + x1 + '" y2="' + bar + '" stroke-width="2"/>');
      kx.forEach(function (x) { s.push('<line x1="' + x + '" y1="' + bar + '" x2="' + x + '" y2="' + (Y(l.gen + 1) - 19) + '" stroke-width="2"/>'); });
      if (gz.vraag) { var yv = Y(l.gen + 1), xv = gz.vraag.x; s.push('<path d="M' + xv + ' ' + (yv - 19) + ' L' + (xv + 19) + ' ' + yv + ' L' + xv + ' ' + (yv + 19) + ' L' + (xv - 19) + ' ' + yv + ' Z" stroke-width="2.5" stroke-dasharray="4 4"/><text x="' + xv + '" y="' + (yv + 6) + '" text-anchor="middle" style="font-size:16px">?</text>'); }
    });
    P.forEach(function (p) {
      var x = p.x, y = Y(p.gen), vul = p.ziek ? ' class="vul"' : '';
      var sym = p.sekse === 'm' ? '<rect x="' + (x - 18) + '" y="' + (y - 18) + '" width="36" height="36" rx="3" stroke-width="2.5"' + vul + '/>' : '<circle cx="' + x + '" cy="' + y + '" r="19" stroke-width="2.5"' + vul + '/>';
      if (p.ziek) sym += p.sekse === 'm' ? '<rect x="' + (x - 18) + '" y="' + (y - 18) + '" width="36" height="36" rx="3" stroke-width="2.5"/>' : '<circle cx="' + x + '" cy="' + y + '" r="19" stroke-width="2.5"/>';
      var halo = p.sekse === 'm' ? '<rect class="halo" x="' + (x - 25) + '" y="' + (y - 25) + '" width="50" height="50" rx="6"/>' : '<circle class="halo" cx="' + x + '" cy="' + y + '" r="26"/>';
      var klik = opt.klik ? ' class="pers" data-nr="' + esc(p.nr) + '" tabindex="0" role="button" aria-pressed="false" aria-label="Persoon ' + esc(p.nr) + (p.ziek ? ', ziek' : ', gezond') + '"' : ' class="pers"';
      s.push('<g' + klik + '>' + halo + '<rect x="' + (x - 30) + '" y="' + (y - 30) + '" width="60" height="60" fill="transparent" stroke="none"/>' + sym + '<text x="' + x + '" y="' + (y + 40) + '" text-anchor="middle" style="font-size:14px">' + esc(p.naam || p.nr) + '</text></g>');
    });
    var t = el('div', 'oe-teken oe-stamteken');
    if (opt.smal) t.style.maxWidth = opt.smal + 'px';
    t.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Stamboom">' + s.join('') + '</svg>';
    t._W = W; t._H = H; t._Y = Y;
    return t;
  }
  function opsom(nrs) { return nrs.length === 1 ? 'persoon ' + nrs[0] : 'personen ' + nrs.slice(0, -1).join(', ') + ' en ' + nrs[nrs.length - 1]; }
  function legenda() { return el('p', 'oe-legenda', '<span class="oe-lg-m"></span> man <span class="oe-lg-v"></span> vrouw <span class="oe-lg-z"></span> ziek'); }
  function kiesbaar(teken, opNa) {
    var svg = teken.querySelector('svg');
    function zet(g) { g.setAttribute('aria-pressed', g.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); if (opNa) opNa(); }
    svg.addEventListener('click', function (e) { var g = e.target.closest('.pers[data-nr]'); if (g && !teken.classList.contains('dicht')) zet(g); });
    svg.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.pers[data-nr]')) { e.preventDefault(); zet(e.target); } });
    return {
      gekozen: function () { return Array.prototype.slice.call(svg.querySelectorAll('.pers[aria-pressed="true"]')).map(function (g) { return g.dataset.nr; }); },
      wis: function () { svg.querySelectorAll('.pers[data-nr]').forEach(function (g) { g.setAttribute('aria-pressed', 'false'); }); },
      markeer: function (nrs) { svg.querySelectorAll('.pers[data-nr]').forEach(function (g) { g.classList.toggle('markeer', nrs.indexOf(g.dataset.nr) >= 0); }); }
    };
  }
  var VRAAGTYPE = {
    dom: { vraag: 'Is de aandoening dominant of recessief?', keuzes: [['dominant', ['AD', 'XD']], ['recessief', ['AR', 'XR']], ['niet te bepalen', null]] },
    xa: { vraag: 'Ligt het gen op een autosoom of op het X-chromosoom?', keuzes: [['autosomaal', ['AD', 'AR']], ['X-chromosomaal', ['XD', 'XR']], ['niet te bepalen', null]] }
  };
  // één vraag bij een stamboom: conclusie kiezen + bewijs aanklikken
  function bewijsVraag(doos, P, q, kiezer, klaar) {
    var T = VRAAGTYPE[q.type], binnen = q.binnen || ['AD', 'AR', 'XD', 'XR'];
    var keuzes = q.zonderOnbepaald ? T.keuzes.slice(0, 2) : T.keuzes;
    var passend = welke(binnen, P, null);
    var juist = -1; keuzes.forEach(function (k, i) { if (k[1] && passend.every(function (e) { return k[1].indexOf(e) >= 0; })) juist = i; });
    if (juist < 0) juist = keuzes.length - 1;
    var li = el('div', 'oe-vraag oe-bewijs');
    li.appendChild(el('p', 'oe-vraagtekst', esc(q.vraag || T.vraag)));
    var rij = el('div', 'oe-invulrij oe-keuzes');
    keuzes.forEach(function (k, i) { var b = el('button', 'oe-keuze', esc(k[0])); b.type = 'button'; b.dataset.j = i; b.setAttribute('aria-pressed', 'false'); rij.appendChild(b); });
    li.appendChild(rij);
    li.appendChild(el('p', 'oe-hulp oe-klikhulp', 'Klik in de stamboom de personen aan die je conclusie bewijzen. Klik nog eens om iemand weg te halen.'));
    var kn = el('div', 'oe-stapknoppen', '<button type="button" class="oe-knop goud" data-a="check">' + ctrl() + '</button><button type="button" class="oe-knop" data-a="wis">Wis aangeklikte personen</button>');
    li.appendChild(kn);
    var uit = el('div', 'oe-uitleg'); uit.hidden = true; li.appendChild(uit);
    doos.appendChild(li);
    var keuze = -1;
    rij.addEventListener('click', function (e) { var b = e.target.closest('.oe-keuze'); if (!b || li.classList.contains('goed')) return; keuze = +b.dataset.j; rij.querySelectorAll('.oe-keuze').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); uit.hidden = true; li.classList.remove('fout'); });
    function zeg(st, html) { uit.innerHTML = html; uit.hidden = false; li.classList.remove('goed', 'fout'); if (st) li.classList.add(st); }
    function bewijst(kies, set) { if (!kies.length) return false; var w = welke(binnen, P, kies); return w.every(function (e) { return set.indexOf(e) >= 0; }); }
    kn.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'wis') { kiezer.wis(); kiezer.markeer([]); uit.hidden = true; return; }
      kiezer.markeer([]);
      if (keuze < 0) return zeg('fout', '<em>Kies eerst een conclusie.</em>');
      var k = keuzes[keuze], kies = kiezer.gekozen();
      if (keuze !== juist) {
        if (!keuzes[juist][1]) return zeg('fout', '<em>Dat is hier niet te bewijzen.</em> Deze stamboom past bij ' + esc(passend.map(function (e) { return ERFNAAM[e]; }).join(', ')) + '. Zoek je bewijs nog eens kritisch na.');
        if (!k[1]) return zeg('fout', '<em>Het is wél te bepalen.</em> ' + esc(q.tip || 'Zoek een gezin waarin het kind iets laat zien wat de ouders niet hebben.'));
        return zeg('fout', '<em>Dat klopt niet.</em> ' + esc(q.tip || 'Kijk naar ouders en hun kinderen.'));
      }
      if (!k[1]) { zeg('goed', '<em>Klopt.</em> ' + esc(q.uitleg || '')); kn.remove(); rij.querySelectorAll('.oe-keuze').forEach(function (x) { x.disabled = true; }); if (klaar) klaar(); return; }
      if (!kies.length) return zeg('fout', '<em>De conclusie klopt.</em> Klik nu in de stamboom de personen aan die het bewijzen.');
      if (!bewijst(kies, k[1])) {
        var alt = welke(binnen, P, kies).filter(function (e) { return k[1].indexOf(e) < 0; });
        return zeg('fout', '<em>De conclusie klopt, maar deze personen bewijzen het nog niet.</em> Bij ' + esc(opsom(kies)) + ' kan het ook ' + esc(alt.map(function (e) { return ERFNAAM[e]; }).join(' of ')) + ' zijn.');
      }
      var minder = kies.length > 1 && kies.some(function (nr) { return bewijst(kies.filter(function (x) { return x !== nr; }), k[1]); });
      zeg('goed', '<em>Klopt, en ' + esc(opsom(kies)) + (kies.length === 1 ? ' bewijst' : ' bewijzen') + ' het.</em> ' + esc(q.uitleg || '') + (minder ? ' (Het kan ook met minder personen.)' : ''));
      kiezer.markeer(kies); kn.remove(); rij.querySelectorAll('.oe-keuze').forEach(function (x) { x.disabled = true; });
      if (klaar) klaar();
    });
    return li;
  }
  function bouwStamboom(o, doos) {
    if (o.modus === 'reeks') return bouwStamReeks(o, doos);
    if (o.modus === 'hypothese') return bouwStamHyp(o, doos);
    var teken = tekenStamboom(o, { klik: true });
    doos.appendChild(teken); doos.appendChild(legenda());
    var kiezer = kiesbaar(teken);
    var lijst = el('div', 'oe-vragen'); doos.appendChild(lijst);
    var melding = el('p', 'oe-melding'); doos.appendChild(melding);
    var k = 0;
    (function volgende() {
      if (k >= o.vragen.length) { meld(melding, 'Alles bewezen!', 'goed'); return; }
      kiezer.wis(); kiezer.markeer([]);
      bewijsVraag(lijst, o.personen, o.vragen[k++], kiezer, volgende);
    })();
  }
  function bouwStamReeks(o, doos) {
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite');
    var goed = 0;
    o.items.forEach(function (it, n) {
      var blok = el('div', 'oe-stamitem');
      blok.appendChild(el('h4', 'oe-stamkop', 'Stamboom ' + (n + 1) + (it.bekend ? ' · ' + esc(it.bekend) : '')));
      var teken = tekenStamboom(it, { klik: true, dy: 110, extra: 55, smal: 420 });
      blok.appendChild(teken);
      var kiezer = kiesbaar(teken);
      bewijsVraag(blok, it.personen, it, kiezer, function () { goed++; meld(melding, goed + ' van ' + o.items.length + ' stambomen goed' + (goed === o.items.length ? '. Knap gedaan!' : '.'), goed === o.items.length ? 'goed' : 'half'); });
      doos.appendChild(blok);
    });
    doos.appendChild(legenda());
    doos.appendChild(melding);
  }
  function bouwStamHyp(o, doos) {
    var P = o.personen, erfs = o.erfgangen || ['AD', 'AR', 'XD', 'XR'];
    var N = maakNet(P, null), idx = {}; N.net.forEach(function (q, i) { idx[q.nr] = i; });
    var echt = erfs.filter(function (e) { return past(e, N); });
    var status = {}, invul = {}, hyp = null;
    var kies = el('div', 'oe-invulrij oe-keuzes oe-hyps');
    erfs.forEach(function (e) { var b = el('button', 'oe-keuze', esc(ERFNAAM[e]) + '<span class="oe-hst"></span>'); b.type = 'button'; b.dataset.e = e; b.setAttribute('aria-pressed', 'false'); kies.appendChild(b); });
    doos.appendChild(el('p', 'oe-opdracht', '<b>Kies een hypothese om te toetsen:</b>'));
    doos.appendChild(kies);
    var teken = tekenStamboom(o, { klik: false, dy: 150, extra: 90, bar: 0.66 });
    var wrap = el('div', 'oe-schema oe-stamboom'); wrap.appendChild(teken); doos.appendChild(wrap); doos.appendChild(legenda());
    var lijst = el('ul', 'oe-vakken'); teken.appendChild(lijst);
    P.forEach(function (p) {
      var li = el('li', 'oe-gt'); li.dataset.nr = p.nr;
      li.style.left = (100 * p.x / teken._W) + '%'; li.style.top = (100 * (teken._Y(p.gen) + 62) / teken._H) + '%';
      li.innerHTML = '<label><span class="oe-gtnr">Persoon ' + esc(p.nr) + '</span><select class="oe-in" disabled aria-label="Genotype van persoon ' + esc(p.nr) + '"><option value="">?</option></select></label>';
      lijst.appendChild(li);
    });
    var maat = function () { var b = wrap.getBoundingClientRect().width; if (b) wrap.classList.toggle('smal', b < 560); var sm = wrap.classList.contains('smal'); if (sm && lijst.parentNode !== wrap) wrap.appendChild(lijst); if (!sm && lijst.parentNode !== teken) teken.appendChild(lijst); };
    if (window.ResizeObserver) new ResizeObserver(maat).observe(wrap); maat();
    var kn = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Controleer mijn invulling</button><button type="button" class="oe-knop" data-a="kanniet">Deze hypothese kan niet</button>');
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite'); kn.appendChild(melding); doos.appendChild(kn);
    var terug = el('ul', 'oe-terug'); doos.appendChild(terug);
    var eind = el('p', 'oe-melding'); doos.appendChild(eind);
    function items() { return Array.prototype.slice.call(lijst.children); }
    function bewaarInvul() { if (!hyp) return; invul[hyp] = {}; items().forEach(function (li) { invul[hyp][li.dataset.nr] = li.querySelector('select').value; }); }
    function wis() { meld(melding, ''); terug.innerHTML = ''; items().forEach(function (li) { li.classList.remove('goed', 'fout', 'half'); }); }
    function toonStatus() {
      kies.querySelectorAll('.oe-keuze').forEach(function (b) { var s = status[b.dataset.e]; b.querySelector('.oe-hst').textContent = s === 'kan' ? ' ✓ kan' : s === 'niet' ? ' ✗ valt af' : ''; b.classList.toggle('af', s === 'niet'); });
      var open = erfs.filter(function (e) { return !status[e]; });
      if (!open.length) meld(eind, 'Klaar! Deze stamboom past alleen bij: ' + echt.map(function (e) { return ERFNAAM[e]; }).join(' en ') + '.', 'goed');
      else meld(eind, (erfs.length - open.length) + ' van ' + erfs.length + ' hypothesen getoetst.', '');
    }
    kies.addEventListener('click', function (e) {
      var b = e.target.closest('.oe-keuze'); if (!b) return;
      bewaarInvul(); wis(); hyp = b.dataset.e;
      kies.querySelectorAll('.oe-keuze').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      items().forEach(function (li) {
        var p = P.filter(function (q) { return q.nr === li.dataset.nr; })[0], sel = li.querySelector('select'), oud = (invul[hyp] || {})[p.nr] || '';
        sel.innerHTML = '<option value="">?</option>' + gtOpties(hyp, p.sekse).map(function (g) { return '<option value="' + g + '"' + (g === oud ? ' selected' : '') + '>' + gtTekst(hyp, g) + '</option>'; }).join('');
        sel.disabled = status[hyp] === 'niet';
      });
    });
    lijst.addEventListener('change', wis);
    function waarom(nr) { var p = P.filter(function (q) { return q.nr === nr; })[0]; return 'persoon ' + nr + ' is ' + (p.ziek ? 'ziek' : 'gezond') + ', dat past niet bij dit genotype bij ' + ERFNAAM[hyp] + '.'; }
    kn.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      wis();
      if (!hyp) return meld(melding, 'Kies eerst een hypothese.', 'half');
      if (a.dataset.a === 'kanniet') {
        if (echt.indexOf(hyp) >= 0) return meld(melding, 'Deze hypothese kan wél. Probeer een invulling te vinden waarbij alles klopt.', 'half');
        // zoek een gezin (ouders + één kind) dat het al onmogelijk maakt
        var gezin = null;
        P.some(function (p) { if (!p.ouders) return false; var sub = p.ouders.concat([p.nr]); if (!past(hyp, maakNet(P, sub))) { gezin = sub; return true; } return false; });
        status[hyp] = 'niet'; toonStatus(); items().forEach(function (li) { li.querySelector('select').disabled = true; });
        meld(melding, 'Klopt, ' + ERFNAAM[hyp] + ' valt af.', 'goed');
        terug.appendChild(el('li', 'goed', gezin ? '<b>Waar loopt het vast?</b> Bij ' + esc(opsom(gezin)) + ': met ' + esc(ERFNAAM[hyp]) + ' kan persoon ' + esc(gezin[2]) + ' (' + (P.filter(function (q) { return q.nr === gezin[2]; })[0].ziek ? 'ziek' : 'gezond') + ') geen kind zijn van deze ouders.' : '<b>Waar loopt het vast?</b> Geen enkele invulling past bij de hele stamboom.'));
        return;
      }
      var g = {}, leeg = 0, fout = 0;
      items().forEach(function (li) { var v = li.querySelector('select').value; if (v) g[li.dataset.nr] = v; else leeg++; });
      items().forEach(function (li) {
        var nr = li.dataset.nr, v = g[nr]; if (!v) return;
        var p = P.filter(function (q) { return q.nr === nr; })[0], tekst = null;
        if (isZiek(hyp, v) !== !!p.ziek) tekst = waarom(nr);
        else if (p.ouders && g[p.ouders[0]] && g[p.ouders[1]]) {
          var va = P.filter(function (q) { return q.nr === p.ouders[0]; })[0].sekse === 'm' ? p.ouders[0] : p.ouders[1], mo = va === p.ouders[0] ? p.ouders[1] : p.ouders[0];
          if (!kindKan(hyp, g[va], g[mo], v, p.sekse)) tekst = gtTekst(hyp, v) + ' kan niet uit ' + gtTekst(hyp, g[va]) + ' × ' + gtTekst(hyp, g[mo]) + ' (persoon ' + va + ' en ' + mo + ').';
        }
        if (tekst) { fout++; li.classList.add('fout'); terug.appendChild(el('li', 'fout', '<b>Persoon ' + esc(nr) + '</b> ' + esc(tekst))); } else li.classList.add('goed');
      });
      if (fout) return meld(melding, 'Zo kan het niet. Pas de rode personen aan, of besluit dat de hypothese niet kan.', 'half');
      if (leeg) return meld(melding, 'Tot nu toe klopt het. Nog ' + leeg + ' personen leeg.', 'half');
      status[hyp] = 'kan'; toonStatus();
      meld(melding, 'Alles klopt: ' + ERFNAAM[hyp] + ' kan bij deze stamboom.', 'goed');
    });
    toonStatus();
  }

  /* ---------- opbouw ---------- */
  function thema(blok) {
    // licht of donker: kijk naar de achtergrond van de pagina
    var kleur = 'rgb(0,0,0)';
    [document.body, document.documentElement].some(function (n) { var c = getComputedStyle(n).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) { kleur = c; return true; } return false; });
    var m = kleur.match(/\d+(\.\d+)?/g) || [0, 0, 0];
    var lum = 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2];
    blok.classList.toggle('oe-licht', lum > 140);
  }

  function zorgCss() {
    if (document.getElementById('oe-css')) return;
    var st = document.createElement('style'); st.id = 'oe-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  function bouwEen(o, doos) {
    try {
      if (o.soort === 'volgorde') bouwVolgorde(o, doos);
      else if (o.soort === 'schema') bouwSchema(o, doos);
      else if (o.soort === 'uitleg') bouwUitleg(o, doos);
      else if (o.soort === 'indelen') bouwIndelen(o, doos);
      else if (o.soort === 'pijlen') bouwPijlen(o, doos);
      else if (o.soort === 'grafiek') bouwGrafiek(o, doos);
      else if (o.soort === 'puzzel') bouwPuzzel(o, doos);
      else if (o.soort === 'stamboom') bouwStamboom(o, doos);
    } catch (err) { doos.appendChild(el('p', 'oe-hulp', 'Deze oefening kon niet worden geladen.')); if (window.console) console.error(err); }
  }

  // één uitklapkaart; de oefening wordt pas gebouwd bij het openen
  function maakKaart(o) {
    var kaart = el('details', 'oe-kaart' + (o.vwo ? ' vwo' : '')); kaart.id = 'oe-' + o.id;
    var soort = SOORTNAAM[o.soort] || '';
    kaart.innerHTML = '<summary><span class="oe-ico">' + (ICOON[o.soort] || '') + '</span><span class="oe-sumtekst"><span class="oe-soort">' + esc(soort) + (o.vwo ? '<span class="oe-vwo">vwo</span>' : '') + '</span><span class="oe-titel">' + esc(o.titel) + '</span></span><span class="oe-pijl" aria-hidden="true">›</span></summary>';
    var doos = el('div', 'oe-inhoud');
    if (o.opdracht) doos.appendChild(el('p', 'oe-opdracht', esc(o.opdracht)));
    kaart.appendChild(doos);
    var gebouwd = false;
    function bouw() { if (gebouwd) return; gebouwd = true; bouwEen(o, doos); }
    kaart.addEventListener('toggle', function () { if (kaart.open) bouw(); });
    return { kaart: kaart, doos: doos, bouw: bouw };
  }

  function plaats(data) {
    if (document.querySelector('.oe-blok')) return;
    var hier = document.getElementById('oefen-hier'); // losse oefenpagina (oefenen.html)
    var g = document.getElementById('glossary');
    if (!hier && !g) return;
    var sectie = hier ? null : (g.closest('section') || g.parentNode);
    var kopBegrippen = sectie && sectie.querySelector('h2');
    var blok = document.createElement(sectie && sectie.tagName === 'SECTION' ? 'section' : 'div');
    blok.className = (sectie && sectie.className ? sectie.className + ' ' : '') + 'oe-blok';
    blok.id = 'oefenen';
    if (!hier) {
      var kop = kopBegrippen ? kopBegrippen.cloneNode(false) : document.createElement('h2');
      kop.removeAttribute('id'); kop.textContent = 'Zelf aan de slag';
      blok.appendChild(kop);
    }
    blok.appendChild(el('p', 'oe-lead', esc(data.intro || 'Oefen met wat je in de film zag. Kies een opdracht om hem te openen. Je antwoorden blijven op je eigen apparaat.')));
    var lijst = el('div', 'oe-lijstje'); blok.appendChild(lijst);
    if (hier) hier.appendChild(blok); else sectie.parentNode.insertBefore(blok, sectie.nextSibling);
    // toetsen in de oefeningen (typen, spatie, pijltjes) niet doorgeven aan de filmspeler
    ['keydown', 'keyup', 'keypress'].forEach(function (t) { blok.addEventListener(t, function (e) { e.stopPropagation(); }); });
    // inhoudsopgave bovenaan (als de film er een heeft)
    var toc = document.querySelector('nav.toc a[href="#begrippen"]');
    if (toc && !document.querySelector('nav.toc a[href="#oefenen"]')) { var a = document.createElement('a'); a.href = '#oefenen'; a.textContent = 'Zelf aan de slag'; toc.parentNode.insertBefore(a, toc.nextSibling); }

    var eerste = true;
    // link naar één oefening: #oe-<id> (of #<id> op de losse oefenpagina)
    var h = decodeURIComponent((location.hash || '').slice(1)), doel = null;
    (data.oefeningen || []).forEach(function (o, k) { var id = o.id || ('o' + (k + 1)); if (h === id || h === 'oe-' + id) doel = id; });
    (data.oefeningen || []).forEach(function (o, k) {
      if (!o.id) o.id = 'o' + (k + 1);
      var m = maakKaart(o);
      lijst.appendChild(m.kaart);
      if (doel ? doel === o.id : (eerste && !o.vwo)) { m.kaart.open = true; m.bouw(); eerste = false; }
    });

    zorgCss();
    thema(blok);
    // vanuit de filmlijst (knop 'Oefenen', link naar #oefenen): meteen naar het blok
    if (doel) setTimeout(function () { var k = document.getElementById('oe-' + doel); if (k) k.scrollIntoView({ block: 'start' }); }, 60);
    else if (location.hash === '#oefenen') setTimeout(function () { blok.scrollIntoView({ block: 'start' }); }, 60);
    volgThema(blok);
  }

  function volgThema(blok) {
    try {
      new MutationObserver(function () { thema(blok); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-thema', 'class'] });
      if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); (mq.addEventListener ? mq.addEventListener('change', function () { thema(blok); }) : mq.addListener(function () { thema(blok); })); }
    } catch (e) { /* geen thema-volger */ }
  }

  function start() {
    var url;
    try { url = new URL(PAD, location.href).href; } catch (e) { return; }
    fetch(url, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
      var n = 0;
      (function probeer() { if (document.getElementById('oefen-hier') || document.getElementById('glossary') || n > 40) return plaats(data); n++; setTimeout(probeer, 150); })();
    }).catch(function (e) { if (window.console) console.warn('Oefeningen niet geladen:', e); });
  }
  if (PAD) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start(); }

  // voor werksessies (sessie/index.html en sessie/docent.html)
  window.BKOefenen = {
    // leeg blok met de juiste stijl en licht/donker; opties: {sessie: true, sleutel: 'bk-sessie:<code>:'}
    blok: function (houder, opties) {
      opties = opties || {};
      if (opties.sessie) SESSIE = true;
      if (opties.sleutel) SLEUTEL = opties.sleutel;
      zorgCss();
      var b = el('div', 'oe-blok'); houder.appendChild(b);
      ['keydown', 'keyup', 'keypress'].forEach(function (t) { b.addEventListener(t, function (e) { e.stopPropagation(); }); });
      thema(b); volgThema(b);
      return b;
    },
    kaart: maakKaart,
    bouw: bouwEen,
    soortnaam: SOORTNAAM
  };
})();
