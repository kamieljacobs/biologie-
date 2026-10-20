/* Zelf aan de slag: oefeningen onder een film (Biologie bij Kamiel).
   Leest de oefeningen uit een JSON-bestand naast de film (pad in data-oefenen op de scripttag, relatief aan de pagina)
   en zet onder de begrippen (na #glossary) een blok 'Zelf aan de slag' met deze soorten oefeningen:
     volgorde  – stappen van een proces in de goede volgorde zetten (slepen met muis/touch of knoppen ↑/↓)
     schema    – namen op een eigen lijntekening slepen (of tik-tik: naam kiezen, dan vakje)
     uitleg    – 'Leg het uit': eigen tekst, kernbegrippen tellen (stam-matching), checklist, modeluitleg
     indelen   – kaartjes naar twee tot vier groepen slepen (of tik-tik)
     pijlen    – voorspel per grootheid: neemt toe, neemt af of blijft gelijk (een keten van oorzaak en gevolg)
     grafiek   – een eigen lijntekening van een grafiek aflezen: getal invullen of een keuze maken
     stamboom  – eerst aantonen (bv. recessief), dan per persoon alle mogelijke genotypen aanzetten en controleren of het kan
     puzzel    – stap voor stap invullen met controle (genotypen, kansen, getallen); de volgende stap verschijnt na een goede
   Alles gebeurt in de browser; de tekst van de leerling blijft alleen lokaal (localStorage), er wordt niets verstuurd.
   Oefeningen met "vwo": true zijn in de havo-stand (body.havo) verborgen, net als .term.vwo.
   Ingeladen door scripts/oefenen.py op elke film waar een oefenen.json bij hoort. */
(function () {
  'use strict';
  var SCRIPT = document.currentScript;
  var PAD = SCRIPT && SCRIPT.getAttribute('data-oefenen');
  if (!PAD) return;

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
    '.oe-vak .oe-chip{padding:6px 10px;min-height:30px;font-size:14px;max-width:100%;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}' +
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
    '.oe-gt{position:absolute;transform:translate(-50%,-50%);list-style:none;display:flex;align-items:center;gap:6px}' +
    '.oe-gtnr{display:none;color:var(--oe-zacht);font-size:14.5px;min-width:6.5em}' +
    '.oe-gtknop{display:flex;gap:3px;padding:3px;border-radius:10px;border:1.5px solid transparent;background:var(--oe-kaart)}' +
    '.oe-gk{font:600 14px/1 "IBM Plex Mono",monospace;min-width:38px;min-height:32px;padding:0 4px;border-radius:7px;border:1px solid var(--oe-rand);background:transparent;color:var(--oe-tekst);cursor:pointer}' +
    '.oe-gk[aria-pressed="true"]{background:var(--oe-goud);border-color:var(--oe-goud);color:var(--oe-goud-ink)}' +
    '.oe-gk:disabled{cursor:default;opacity:.35}.oe-gk:focus-visible{outline:2px solid var(--oe-goud);outline-offset:2px}' +
    '.oe-gtnot{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:2px;font:600 13px "IBM Plex Mono",monospace;color:var(--oe-goud);white-space:nowrap}' +
    '.oe-gt.goed .oe-gtknop{border-color:var(--oe-goed)}.oe-gt.half .oe-gtknop{border-color:var(--oe-goud)}.oe-gt.fout .oe-gtknop{border-color:var(--oe-fout)}' +
    '.oe-terug li.half b::before{content:"~ ";color:var(--oe-goud)}' +
    '.oe-stamboom.smal .oe-vakken{display:grid;gap:8px;margin-top:10px}.oe-stamboom.smal .oe-gt{position:static;transform:none}.oe-stamboom.smal .oe-gtnr{display:inline}.oe-stamboom.smal .oe-gtnot{position:static;transform:none;margin:0}' +
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
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Controleer</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
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
      var goed = 0;
      r.forEach(function (slot, k) {
        var i = +slot.querySelector('.oe-chip').dataset.i, pl = plekken(i), ok = pl.indexOf(k) >= 0; if (ok) goed++;
        slot.classList.add(ok ? 'goed' : 'fout');
        slot.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Hoort op plek ' + pl.map(function (n) { return n + 1; }).join(' of ') + '.</em> ') + esc(stappen[i].uitleg)));
      });
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
      li.style.left = (100 * v.x / W) + '%'; li.style.top = (100 * v.y / H) + '%'; li.style.width = (100 * VB / W) + '%';
      li.innerHTML = '<span class="oe-nr">' + (v.k + 1) + '</span><span class="oe-plek"><span class="oe-leeg">sleep hier</span></span>';
      vakkenLijst.appendChild(li);
    });
    teken.appendChild(vakkenLijst);
    wrap.appendChild(teken);
    var bak = el('div', 'oe-bak'); bak.setAttribute('aria-label', 'Namen');
    wrap.appendChild(bak);
    doos.appendChild(wrap);
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Controleer</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
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
      var goed = 0;
      vakken().forEach(function (vak) {
        var v = vakjes[+vak.dataset.k], chip = vak.querySelector('.oe-chip'), ok = !!chip && chip.dataset.naam === v.naam;
        if (ok) goed++;
        vak.classList.add(ok ? 'goed' : 'fout');
        var li = el('li', ok ? 'goed' : 'fout', '<b>' + (v.k + 1) + '. ' + esc(v.naam) + '</b>' + (ok ? '' : (chip ? ' (jij: ' + esc(chip.dataset.naam) + ')' : ' (leeg)')) + (v.uitleg ? ' — ' + esc(v.uitleg) : ''));
        terug.appendChild(li);
      });
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
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="bekijk">Bekijk je uitleg</button><button type="button" class="oe-knop" data-a="model">Toon modeluitleg</button><button type="button" class="oe-knop" data-a="wis">Wis</button>');
    doos.appendChild(knoppen);
    doos.appendChild(el('p', 'oe-privacy', 'Je tekst blijft alleen op dit apparaat bewaard en wordt nergens naartoe gestuurd.'));
    var uitkomst = el('div', 'oe-uitkomst'); uitkomst.hidden = true; doos.appendChild(uitkomst);
    var model = el('div', 'oe-uitkomst'); model.hidden = true;
    model.innerHTML = '<div><h4>Modeluitleg</h4><div class="oe-model">' + (Array.isArray(o.model) ? o.model : [o.model]).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div>';
    doos.appendChild(model);

    function telWoorden() { var n = norm(veld.value).split(' ').filter(Boolean).length; teller.textContent = n + (n === 1 ? ' woord' : ' woorden'); }
    function bewaar() { bewaard.tekst = veld.value; opslag(sl, bewaard.tekst || (bewaard.vink && bewaard.vink.some(Boolean)) ? bewaard : null); }
    veld.addEventListener('input', function () { telWoorden(); bewaar(); });
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
      if (a.dataset.a === 'bekijk') { bekijk(); if (!veld.value.trim()) uitkomst.insertAdjacentHTML('afterbegin', '<p class="oe-melding half">Schrijf eerst je eigen uitleg; dan kun je hem vergelijken.</p>'); }
      else if (a.dataset.a === 'model') { model.hidden = !model.hidden; a.textContent = model.hidden ? 'Toon modeluitleg' : 'Verberg modeluitleg'; }
      else if (a.dataset.a === 'wis') { veld.value = ''; bewaard = {}; opslag(sl, null); telWoorden(); uitkomst.hidden = true; uitkomst.innerHTML = ''; veld.focus(); }
    });
  }

  /* ---------- gedeeld voor de nieuwe soorten ---------- */
  function knoppenRij(doos, extra) {
    var k = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Controleer</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>' + (extra || ''));
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
      var goed = 0;
      rijen().forEach(function (li) {
        var r = o.rijen[+li.dataset.k], w = li.querySelector('.oe-pk[aria-pressed="true"]').dataset.w, ok = w === r.antwoord; if (ok) goed++;
        var juist = PIJLKEUZE.filter(function (p) { return p[0] === r.antwoord; })[0];
        li.classList.add(ok ? 'goed' : 'fout');
        li.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Juist is ' + juist[1] + ' ' + juist[2] + '.</em> ') + esc(r.uitleg || '')));
      });
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
      var goed = 0;
      vragen().forEach(function (li) {
        var q = o.vragen[+li.dataset.k], ok, juist;
        if (q.keuzes) { var g = li.querySelector('.oe-keuze[aria-pressed="true"]'); ok = !!g && +g.dataset.j === q.antwoord; juist = q.keuzes[q.antwoord]; }
        else { var w = li.querySelector('.oe-invul'); ok = veldGoed(w); juist = veldAntwoord(q); }
        if (ok) goed++;
        li.classList.add(ok ? 'goed' : 'fout');
        li.appendChild(el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Antwoord: ' + esc(juist) + (q.marge ? ' (± ' + toonGetal(q.marge) + ')' : '') + '.</em> ') + esc(q.uitleg || '')));
      });
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
    function toonStap(k) {
      if (k >= o.stappen.length) { meld(melding, 'Puzzel opgelost!', 'goed'); return; }
      var s = o.stappen[k], li = el('li', 'oe-vraag'); li.dataset.k = k;
      li.appendChild(el('p', 'oe-vraagtekst', esc(s.vraag)));
      var rij = el('div', 'oe-invulrij'); s.velden.forEach(function (v) { rij.appendChild(maakVeld(v)); }); li.appendChild(rij);
      var kn = el('div', 'oe-stapknoppen', '<button type="button" class="oe-knop goud" data-a="stap">Controleer</button><button type="button" class="oe-knop" data-a="toon" hidden>Laat het antwoord zien</button>');
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
          rij.querySelectorAll('.oe-invul').forEach(function (w) { var v = w._v; w._in.value = typeof v.antwoord === 'number' ? toonGetal(v.antwoord) : (Array.isArray(v.antwoord) ? v.antwoord[0] : v.antwoord); });
          return klaar(true);
        }
        var velden = Array.prototype.slice.call(rij.querySelectorAll('.oe-invul'));
        if (velden.some(function (w) { return !w._in.value.trim(); })) { meld(melding, 'Vul eerst alle vakjes van deze stap in.', 'half'); return; }
        meld(melding, '');
        var ok = velden.every(veldGoed);
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
    onder.addEventListener('click', function (e) { if (e.target.closest('[data-a="opnieuw"]')) { lijst.innerHTML = ''; meld(melding, ''); toonStap(0); } });
    toonStap(0);
  }

  /* ---------- stamboom: per persoon alle mogelijke genotypen aanzetten, controleren of het kan ---------- */
  // personen: {nr, naam, x, y, ziek, ouders:[nr,nr]?}; x/y = midden van de knoppenrij in de tekening.
  // erfgang 'recessief' (ziek = aa) of 'dominant' (ziek = minstens één A). Autosomaal.
  // eerst: optionele vragen {vraag, keuzes[], antwoord: index, uitleg} die goed moeten zijn voordat de genotypen opengaan.
  var GT = ['AA', 'Aa', 'aa'];
  function bouwStamboom(o, doos) {
    var W = o.breed || 640, H = o.hoog || 400, dom = o.erfgang === 'dominant';
    var P = o.personen, idx = {}; P.forEach(function (p, i) { idx[p.nr] = i; });
    function past(p, g) { var ziek = dom ? g !== 'aa' : g === 'aa'; return ziek === !!p.ziek; }
    function kind(g1, g2, g) { var z = g.split('').sort().join(''); for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) if ([g1[i], g2[j]].sort().join('') === z) return true; return false; }
    var alle = [], g = new Array(P.length);
    (function zoek(i) {
      if (i === P.length) { alle.push(g.slice()); return; }
      var p = P[i];
      GT.forEach(function (x) {
        if (!past(p, x)) return;
        if (p.ouders) { var a = idx[p.ouders[0]], b = idx[p.ouders[1]]; if (!kind(g[a], g[b], x)) return; }
        g[i] = x; zoek(i + 1);
      });
    })(0);
    var mogelijk = P.map(function (p, i) { var s = {}; alle.forEach(function (a) { s[a[i]] = 1; }); return GT.filter(function (x) { return s[x]; }); });
    function naam(i) { return P[i].naam || ('Persoon ' + P[i].nr); }
    function klein(t) { return t.replace(/^Persoon/, 'persoon'); }
    function waarom(i, x) {
      var p = P[i];
      if (!past(p, x)) return p.ziek ? (dom ? klein(naam(i)) + ' is ziek, dus heeft minstens één A.' : klein(naam(i)) + ' is ziek, dus aa.') : (dom ? klein(naam(i)) + ' is gezond, dus aa.' : klein(naam(i)) + ' is gezond, dus heeft minstens één A.');
      if (p.ouders) {
        var a = idx[p.ouders[0]], b = idx[p.ouders[1]];
        var ok = mogelijk[a].some(function (u) { return mogelijk[b].some(function (v) { return kind(u, v, x); }); });
        if (!ok) return 'dat kan niet uit de ouders (' + mogelijk[a].join(' of ') + ' × ' + mogelijk[b].join(' of ') + ') komen.';
      }
      var kids = P.map(function (q, j) { return j; }).filter(function (j) { return P[j].ouders && P[j].ouders.indexOf(p.nr) >= 0; });
      var niet = kids.filter(function (j) {
        var partner = idx[P[j].ouders[0] === p.nr ? P[j].ouders[1] : P[j].ouders[0]];
        return !mogelijk[partner].some(function (y) { return GT.some(function (z) { return past(P[j], z) && kind(x, y, z); }); });
      });
      if (niet.length) return 'dan kan ' + niet.map(function (j) { return klein(naam(j)); }).join(' en ') + ' niet ontstaan' + (niet.length === 1 && P[niet[0]].ziek && !dom ? ' (die is ziek, dus aa)' : '') + '.';
      return 'dat past niet bij de rest van de stamboom.';
    }

    var wrap = el('div', 'oe-schema oe-stamboom');
    var teken = el('div', 'oe-teken');
    teken.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || o.titel) + '">' + o.svg + '</svg>';
    var lijst = el('ul', 'oe-vakken');
    P.forEach(function (p, i) {
      var li = el('li', 'oe-gt'); li.dataset.i = i;
      li.style.left = (100 * p.x / W) + '%'; li.style.top = (100 * p.y / H) + '%';
      li.innerHTML = '<span class="oe-gtnr">' + esc(naam(i)) + '</span><span class="oe-gtknop" role="group" aria-label="Mogelijke genotypen van ' + esc(naam(i)) + '">' +
        GT.map(function (x) { return '<button type="button" class="oe-gk" data-g="' + x + '" aria-pressed="false">' + x + '</button>'; }).join('') + '</span><span class="oe-gtnot" aria-live="polite"></span>';
      lijst.appendChild(li);
    });
    teken.appendChild(lijst); wrap.appendChild(teken);

    // eerst aantonen (bijv. dominant of recessief)
    var eerst = o.eerst || [], stap = 0;
    var vooraf = el('ol', 'oe-vragen'); 
    var hulp = el('p', 'oe-hulp', 'Zet bij elke persoon álle genotypen aan die kunnen. Kunnen er twee, zet dan allebei aan. Je kunt ook eerst een paar personen doen en dan op ‘Kan dit?’ klikken.');
    doos.appendChild(wrap);
    if (eerst.length) doos.appendChild(vooraf);
    doos.appendChild(hulp);
    var k = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Kan dit?</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite'); k.appendChild(melding); doos.appendChild(k);
    var terug = el('ul', 'oe-terug'); doos.appendChild(terug);
    function open(aan) { wrap.classList.toggle('dicht', !aan); hulp.hidden = k.hidden = !aan; lijst.querySelectorAll('.oe-gk').forEach(function (b) { b.disabled = !aan; }); }
    function toonVraag() {
      if (stap >= eerst.length) { open(true); return; }
      var q = eerst[stap], li = el('li', 'oe-vraag');
      li.appendChild(el('p', 'oe-vraagtekst', esc(q.vraag)));
      var rij = el('div', 'oe-invulrij oe-keuzes');
      q.keuzes.forEach(function (c, j) { var b = el('button', 'oe-keuze', esc(c)); b.type = 'button'; b.dataset.j = j; rij.appendChild(b); });
      li.appendChild(rij); vooraf.appendChild(li);
      rij.addEventListener('click', function (e) {
        var b = e.target.closest('.oe-keuze'); if (!b || li.classList.contains('goed')) return;
        var u = li.querySelector('.oe-uitleg'); if (u) u.remove();
        rij.querySelectorAll('.oe-keuze').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        if (+b.dataset.j === q.antwoord) {
          li.classList.remove('fout'); li.classList.add('goed');
          rij.querySelectorAll('.oe-keuze').forEach(function (x) { x.disabled = true; });
          li.appendChild(el('div', 'oe-uitleg', '<em>Goed.</em> ' + esc(q.uitleg || '')));
          stap++; toonVraag();
        } else {
          li.classList.add('fout');
          li.appendChild(el('div', 'oe-uitleg', '<em>Nog niet.</em> ' + esc(q.tip || 'Kijk nog eens goed naar de stamboom.')));
        }
      });
    }
    open(!eerst.length); toonVraag();

    var maat = function () { var b = wrap.getBoundingClientRect().width; if (b) wrap.classList.toggle('smal', b < 560); var smal = wrap.classList.contains('smal'); if (smal && lijst.parentNode !== wrap) wrap.appendChild(lijst); if (!smal && lijst.parentNode !== teken) teken.appendChild(lijst); };
    if (window.ResizeObserver) new ResizeObserver(maat).observe(wrap); else window.addEventListener('resize', maat);
    maat();
    function items() { return Array.prototype.slice.call(lijst.children); }
    function gekozen(li) { return Array.prototype.slice.call(li.querySelectorAll('.oe-gk[aria-pressed="true"]')).map(function (b) { return b.dataset.g; }); }
    function notatie(li) { var c = gekozen(li); li.querySelector('.oe-gtnot').textContent = c.join() === 'AA,Aa' ? '= A_' : ''; }
    function wis() { meld(melding, ''); terug.innerHTML = ''; items().forEach(function (li) { li.classList.remove('goed', 'half', 'fout'); }); }
    lijst.addEventListener('click', function (e) {
      var b = e.target.closest('.oe-gk'); if (!b || b.disabled) return;
      wis(); b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); notatie(b.closest('.oe-gt'));
    });
    k.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      wis();
      if (a.dataset.a === 'opnieuw') { lijst.querySelectorAll('.oe-gk').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); }); items().forEach(notatie); return; }
      var leeg = 0, goed = 0, half = 0, fout = 0;
      items().forEach(function (li, i) {
        var c = gekozen(li), m = mogelijk[i], st, tekst;
        if (!c.length) { leeg++; return; }
        var kanNiet = c.filter(function (x) { return m.indexOf(x) < 0; });
        var mist = m.filter(function (x) { return c.indexOf(x) < 0; });
        if (kanNiet.length) { st = 'fout'; fout++; tekst = kanNiet.join(' en ') + ' kan niet: ' + waarom(i, kanNiet[0]); }
        else if (mist.length) { st = 'half'; half++; tekst = c.join(' of ') + ' kan, maar ' + mist.join(' en ') + ' kan ook. Zet ' + (mist.length === 1 ? 'die' : 'die') + ' er ook bij.'; }
        else { st = 'goed'; goed++; tekst = m.length > 1 ? m.join(' of ') + ': klopt, meer weet je niet' + (m.join() === 'AA,Aa' ? ' (genoteerd als A_).' : '.') : m[0] + ': klopt, dat is zeker.'; }
        li.classList.add(st);
        terug.appendChild(el('li', st, '<b>' + esc(naam(i)) + '</b> ' + esc(tekst)));
      });
      if (!leeg && goed === P.length) meld(melding, 'Klopt helemaal: bij iedereen staan precies de genotypen die kunnen!', 'goed');
      else if (fout) meld(melding, 'Dit kan nog niet. Kijk naar de rode personen.', 'half');
      else meld(melding, 'Wat je hebt aangezet kan.' + (half ? ' Bij ' + half + (half === 1 ? ' persoon' : ' personen') + ' kan er nog meer.' : '') + (leeg ? ' Nog ' + leeg + ' leeg.' : ''), 'half');
    });
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
      var kaart = el('details', 'oe-kaart' + (o.vwo ? ' vwo' : '')); kaart.id = 'oe-' + o.id;
      var soort = SOORTNAAM[o.soort] || '';
      kaart.innerHTML = '<summary><span class="oe-ico">' + (ICOON[o.soort] || '') + '</span><span class="oe-sumtekst"><span class="oe-soort">' + esc(soort) + (o.vwo ? '<span class="oe-vwo">vwo</span>' : '') + '</span><span class="oe-titel">' + esc(o.titel) + '</span></span><span class="oe-pijl" aria-hidden="true">›</span></summary>';
      var doos = el('div', 'oe-inhoud');
      if (o.opdracht) doos.appendChild(el('p', 'oe-opdracht', esc(o.opdracht)));
      kaart.appendChild(doos);
      lijst.appendChild(kaart);
      var gebouwd = false;
      function bouw() {
        if (gebouwd) return; gebouwd = true;
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
      kaart.addEventListener('toggle', function () { if (kaart.open) bouw(); });
      if (doel ? doel === o.id : (eerste && !o.vwo)) { kaart.open = true; bouw(); eerste = false; }
    });

    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    thema(blok);
    // vanuit de filmlijst (knop 'Oefenen', link naar #oefenen): meteen naar het blok
    if (doel) setTimeout(function () { var k = document.getElementById('oe-' + doel); if (k) k.scrollIntoView({ block: 'start' }); }, 60);
    else if (location.hash === '#oefenen') setTimeout(function () { blok.scrollIntoView({ block: 'start' }); }, 60);
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
