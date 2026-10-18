/* Zelf aan de slag: oefeningen onder een film (Biologie bij Kamiel).
   Leest de oefeningen uit een JSON-bestand naast de film (pad in data-oefenen op de scripttag, relatief aan de pagina)
   en zet onder de begrippen (na #glossary) een blok 'Zelf aan de slag' met drie soorten oefeningen:
     volgorde  – stappen van een proces in de goede volgorde zetten (slepen met muis/touch of knoppen ↑/↓)
     schema    – namen op een eigen lijntekening slepen (of tik-tik: naam kiezen, dan vakje)
     uitleg    – 'Leg het uit': eigen tekst, kernbegrippen tellen (stam-matching), checklist, modeluitleg
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
    /* smal: vakjes als genummerde lijst onder de tekening */
    '.oe-schema.smal .oe-teken svg .nrbol{display:inline}' +
    '.oe-schema.smal .oe-vakken{display:grid;gap:8px}' +
    '.oe-schema.smal .oe-vak{position:static;transform:none;width:auto!important;min-height:46px;padding:6px 10px}' +
    '.oe-schema.smal .oe-vak .oe-nr{font-size:14px;min-width:22px;height:22px;border:1.5px solid var(--oe-goud);border-radius:50%;display:grid;place-items:center}' +
    /* leg het uit */
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
    uitleg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>'
  };
  var SOORTNAAM = { volgorde: 'Zet in de goede volgorde', schema: 'Sleep de namen op het schema', uitleg: 'Leg het uit' };
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
  var SLEUTEL = 'bk-oefenen:' + location.pathname.replace(/\/index\.html$/, '/') + ':';

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
    var stappen = o.stappen.map(function (s, i) { return { i: i, tekst: s.tekst, uitleg: s.uitleg || '', groep: s.groep }; });
    // stappen met dezelfde 'groep' mogen onderling wisselen (bv. twee beginsituaties)
    function plekken(i) { var g = stappen[i].groep; if (!g) return [i]; return stappen.filter(function (s) { return s.groep === g; }).map(function (s) { return s.i; }); }
    doos.appendChild(el('p', 'oe-hulp', 'Sleep een stap aan het puntjesgreepje (op de telefoon) of de hele regel, of gebruik de pijltjes.'));
    var lijst = el('ol', 'oe-stappen'); lijst.setAttribute('aria-label', 'Stappen');
    doos.appendChild(lijst);
    var knoppen = el('div', 'oe-knoppen', '<button type="button" class="oe-knop goud" data-a="check">Controleer</button><button type="button" class="oe-knop" data-a="opnieuw">Opnieuw</button>');
    var melding = el('p', 'oe-melding'); melding.setAttribute('aria-live', 'polite');
    knoppen.appendChild(melding); doos.appendChild(knoppen);

    function rijen() { return Array.prototype.slice.call(lijst.children); }
    function wisUitslag() {
      melding.textContent = ''; melding.className = 'oe-melding';
      rijen().forEach(function (li) { li.classList.remove('goed', 'fout'); var u = li.querySelector('.oe-uitleg'); if (u) u.remove(); });
    }
    function knopjes() {
      var r = rijen();
      r.forEach(function (li, k) {
        var op = li.querySelector('[data-a="op"]'), neer = li.querySelector('[data-a="neer"]');
        op.disabled = k === 0; neer.disabled = k === r.length - 1;
        op.setAttribute('aria-label', 'Stap ' + (k + 1) + ' omhoog'); neer.setAttribute('aria-label', 'Stap ' + (k + 1) + ' omlaag');
      });
    }
    function vul(volgorde) {
      lijst.innerHTML = '';
      volgorde.forEach(function (s) {
        var li = el('li', 'oe-stap');
        li.dataset.i = s.i;
        li.innerHTML = '<span class="oe-greep" title="Sleep">' + GREEP + '<b></b></span><span class="oe-tk">' + esc(s.tekst) + '</span>' +
          '<span class="oe-pijlen"><button type="button" class="oe-mini" data-a="op">↑</button><button type="button" class="oe-mini" data-a="neer">↓</button></span>';
        sleepbaar(li, function (e) { return !!e.target.closest('.oe-greep'); }, {
          // uitleg pas bij loslaten wissen, anders krimpt de lijst onder de vinger
          beweeg: function (x, y) {
            var r = rijen().filter(function (n) { return n !== li; });
            var voor = null;
            for (var k = 0; k < r.length; k++) { var b = r[k].getBoundingClientRect(); if (y < b.top + b.height / 2) { voor = r[k]; break; } }
            if (li.nextSibling !== voor) lijst.insertBefore(li, voor);
          },
          los: function () { wisUitslag(); knopjes(); }
        });
        lijst.appendChild(li);
      });
      knopjes();
    }
    function begin() {
      var v;
      do { v = schud(stappen.slice()); } while (stappen.length > 1 && v.every(function (s, k) { return plekken(s.i).indexOf(k) >= 0; }));
      vul(v); wisUitslag();
    }
    lijst.addEventListener('click', function (e) {
      var b = e.target.closest('button.oe-mini'); if (!b || b.disabled) return;
      var li = b.closest('li'); wisUitslag();
      if (b.dataset.a === 'op' && li.previousElementSibling) lijst.insertBefore(li, li.previousElementSibling);
      else if (b.dataset.a === 'neer' && li.nextElementSibling) lijst.insertBefore(li.nextElementSibling, li);
      knopjes();
      var zelfde = li.querySelector('[data-a="' + b.dataset.a + '"]');
      (zelfde.disabled ? li.querySelector('.oe-mini:not(:disabled)') : zelfde).focus();
    });
    knoppen.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'opnieuw') return begin();
      wisUitslag();
      var goed = 0, r = rijen();
      r.forEach(function (li, k) {
        var i = +li.dataset.i, pl = plekken(i), ok = pl.indexOf(k) >= 0; if (ok) goed++;
        li.classList.add(ok ? 'goed' : 'fout');
        var u = el('div', 'oe-uitleg', (ok ? '<em>Goed.</em> ' : '<em>Hoort op plek ' + pl.map(function (n) { return n + 1; }).join(' of ') + '.</em> ') + esc(stappen[i].uitleg));
        li.appendChild(u);
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
    var g = document.getElementById('glossary');
    if (!g || document.querySelector('.oe-blok')) return;
    var sectie = g.closest('section') || g.parentNode;
    var kopBegrippen = sectie.querySelector('h2');
    var blok = document.createElement(sectie.tagName === 'SECTION' ? 'section' : 'div');
    blok.className = (sectie.className ? sectie.className + ' ' : '') + 'oe-blok';
    blok.id = 'oefenen';
    var kop = kopBegrippen ? kopBegrippen.cloneNode(false) : document.createElement('h2');
    kop.removeAttribute('id'); kop.textContent = 'Zelf aan de slag';
    blok.appendChild(kop);
    blok.appendChild(el('p', 'oe-lead', esc(data.intro || 'Oefen met wat je in de film zag. Kies een opdracht om hem te openen. Je antwoorden blijven op je eigen apparaat.')));
    var lijst = el('div', 'oe-lijstje'); blok.appendChild(lijst);
    sectie.parentNode.insertBefore(blok, sectie.nextSibling);
    // inhoudsopgave bovenaan (als de film er een heeft)
    var toc = document.querySelector('nav.toc a[href="#begrippen"]');
    if (toc && !document.querySelector('nav.toc a[href="#oefenen"]')) { var a = document.createElement('a'); a.href = '#oefenen'; a.textContent = 'Zelf aan de slag'; toc.parentNode.insertBefore(a, toc.nextSibling); }

    var eerste = true;
    (data.oefeningen || []).forEach(function (o, k) {
      if (!o.id) o.id = 'o' + (k + 1);
      var kaart = el('details', 'oe-kaart' + (o.vwo ? ' vwo' : ''));
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
        } catch (err) { doos.appendChild(el('p', 'oe-hulp', 'Deze oefening kon niet worden geladen.')); if (window.console) console.error(err); }
      }
      kaart.addEventListener('toggle', function () { if (kaart.open) bouw(); });
      if (eerste && !o.vwo) { kaart.open = true; bouw(); eerste = false; }
    });

    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    thema(blok);
    // vanuit de filmlijst (knop 'Oefenen', link naar #oefenen): meteen naar het blok
    if (location.hash === '#oefenen') setTimeout(function () { blok.scrollIntoView({ block: 'start' }); }, 60);
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
      (function probeer() { if (document.getElementById('glossary') || n > 40) return plaats(data); n++; setTimeout(probeer, 150); })();
    }).catch(function (e) { if (window.console) console.warn('Oefeningen niet geladen:', e); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
