/* Flipkaarten bij de begrippen onder een film (Biologie bij Kamiel).
   Zoekt #glossary .term (begrip in <b>, uitleg in <p>) en zet er een knop 'Oefen met flipkaarten' boven.
   Alleen zichtbare begrippen doen mee (in de havo-stand zijn vwo-begrippen verborgen).
   Ingeladen door scripts/flipkaarten.py op elke film met een begrippenlijst. */
(function () {
  'use strict';
  var CSS = '' +
    '.fk-knop{display:inline-flex;align-items:center;gap:8px;margin:0 0 14px;padding:9px 16px;border-radius:999px;border:1px solid #E0B64A;background:transparent;color:inherit;font:600 15px/1 "Source Sans 3",system-ui,sans-serif;cursor:pointer}' +
    '.fk-knop:hover{background:rgba(224,182,74,.14)}' +
    '.fk-knop svg{width:18px;height:18px}' +
    '.fk-scherm{position:fixed;inset:0;z-index:9999;background:rgba(8,12,20,.82);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Source Sans 3",system-ui,sans-serif;color:#EEF2F7}' +
    '.fk-doos{width:min(640px,100%);display:flex;flex-direction:column;gap:14px}' +
    '.fk-kop{display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap}' +
    '.fk-kop b{font:700 20px/1.2 Fraunces,Georgia,serif}' +
    '.fk-teller{font:500 12px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;color:#9AA8BA;text-transform:uppercase}' +
    '.fk-dicht{border:1px solid rgba(143,160,181,.4);background:none;color:#EEF2F7;border-radius:999px;width:36px;height:36px;font-size:18px;cursor:pointer}' +
    '.fk-balk{height:4px;border-radius:4px;background:rgba(143,160,181,.25);overflow:hidden}.fk-balk i{display:block;height:100%;background:#E0B64A;width:0;transition:width .3s}' +
    '.fk-kaart{perspective:1200px;cursor:pointer;height:min(340px,52vh)}' +
    '.fk-binnen{position:relative;width:100%;height:100%;transition:transform .45s;transform-style:preserve-3d}' +
    '.fk-kaart.om .fk-binnen{transform:rotateY(180deg)}' +
    '.fk-kant{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px;border:1px solid rgba(143,160,181,.35);background:#1C2A42;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;text-align:center;overflow:auto}' +
    '.fk-kant.achter{transform:rotateY(180deg);background:#22314D}' +
    '.fk-kant .lbl{position:absolute;top:14px;left:18px;font:500 11px/1 "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:#E0B64A}' +
    '.fk-kant .woord{font:700 clamp(26px,5vw,38px)/1.15 Fraunces,Georgia,serif}' +
    '.fk-kant .uitleg{font-size:clamp(17px,2.6vw,21px);line-height:1.45;color:#D7DEE8}' +
    '.fk-kant .tip{position:absolute;bottom:12px;font-size:13px;color:#9AA8BA}' +
    '.fk-knoppen{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}' +
    '.fk-knoppen button{font:600 15px/1 "Source Sans 3",system-ui,sans-serif;padding:11px 18px;border-radius:999px;border:1px solid rgba(143,160,181,.45);background:transparent;color:#EEF2F7;cursor:pointer}' +
    '.fk-knoppen .ja{background:#7FC48F;border-color:#7FC48F;color:#0E1A12}' +
    '.fk-knoppen .nee{background:#E8876C;border-color:#E8876C;color:#1E0E08}' +
    '.fk-knoppen .goud{background:#E0B64A;border-color:#E0B64A;color:#1A1405}' +
    '.fk-opties{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;font-size:14px;color:#B9C4D3}' +
    '.fk-opties label{display:inline-flex;gap:6px;align-items:center;cursor:pointer}' +
    '.fk-eind{text-align:center;padding:26px;border-radius:16px;border:1px solid rgba(143,160,181,.35);background:#1C2A42}' +
    '.fk-eind .groot{font:700 34px/1.1 Fraunces,Georgia,serif;margin-bottom:6px}' +
    '.fk-hulp{text-align:center;font-size:12.5px;color:#7F8DA0}';

  function termen() {
    var g = document.getElementById('glossary'); if (!g) return [];
    var uit = [];
    g.querySelectorAll('.term').forEach(function (t) {
      if (t.offsetParent === null) return;
      var b = t.querySelector('b'), p = t.querySelector('p');
      if (!b || !p) return;
      uit.push({ w: b.textContent.trim(), d: p.textContent.trim() });
    });
    return uit;
  }
  function schud(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function open() {
    var alle = termen(); if (!alle.length) return;
    var st = { stapel: alle.slice(), i: 0, goed: [], fout: [], om: false, omgekeerd: false, schudden: false };
    var el = document.createElement('div'); el.className = 'fk-scherm'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Flipkaarten');
    document.body.appendChild(el);
    var oudOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    function sluit() { el.remove(); document.body.style.overflow = oudOverflow; document.removeEventListener('keydown', toets); }
    function teken() {
      var n = st.stapel.length;
      if (st.i >= n) {
        var weg = st.fout.length;
        el.innerHTML = '<div class="fk-doos"><div class="fk-kop"><b>Klaar!</b><button class="fk-dicht" aria-label="Sluiten">×</button></div>' +
          '<div class="fk-eind"><div class="groot">' + st.goed.length + ' van ' + n + '</div><div>' + (weg ? weg + ' ' + (weg === 1 ? 'begrip' : 'begrippen') + ' nog oefenen' : 'Alles gekend. Knap!') + '</div></div>' +
          '<div class="fk-knoppen">' + (weg ? '<button class="goud" data-a="fout">Oefen de ' + weg + ' gemiste</button>' : '') + '<button data-a="opnieuw">Alles opnieuw</button><button data-a="dicht">Sluiten</button></div></div>';
        return;
      }
      var k = st.stapel[st.i], voor = st.omgekeerd ? k.d : k.w, achter = st.omgekeerd ? k.w : k.d;
      el.innerHTML = '<div class="fk-doos">' +
        '<div class="fk-kop"><b>Flipkaarten</b><span class="fk-teller">' + (st.i + 1) + ' / ' + n + ' · ' + st.goed.length + ' gekend</span><button class="fk-dicht" aria-label="Sluiten">×</button></div>' +
        '<div class="fk-balk"><i style="width:' + Math.round(100 * st.i / n) + '%"></i></div>' +
        '<div class="fk-kaart' + (st.om ? ' om' : '') + '" tabindex="0" aria-live="polite"><div class="fk-binnen">' +
        '<div class="fk-kant voor"><span class="lbl">' + (st.omgekeerd ? 'uitleg' : 'begrip') + '</span><div class="' + (st.omgekeerd ? 'uitleg' : 'woord') + '">' + esc(voor) + '</div><span class="tip">tik om om te draaien</span></div>' +
        '<div class="fk-kant achter"><span class="lbl">' + (st.omgekeerd ? 'begrip' : 'uitleg') + '</span><div class="' + (st.omgekeerd ? 'woord' : 'uitleg') + '">' + esc(achter) + '</div></div>' +
        '</div></div>' +
        '<div class="fk-knoppen">' + (st.om
          ? '<button class="nee" data-a="nee">Nog oefenen</button><button class="ja" data-a="ja">Wist ik</button>'
          : '<button data-a="terug"' + (st.i ? '' : ' disabled style="opacity:.4"') + '>← Vorige</button><button class="goud" data-a="draai">Draai om</button>') + '</div>' +
        '<div class="fk-opties"><label><input type="checkbox" data-o="omgekeerd"' + (st.omgekeerd ? ' checked' : '') + '> uitleg eerst</label><label><input type="checkbox" data-o="schudden"' + (st.schudden ? ' checked' : '') + '> schudden</label></div>' +
        '<div class="fk-hulp">spatie = omdraaien · → wist ik · ← nog oefenen · Esc = sluiten</div></div>';
    }
    function start(lijst) { st.stapel = st.schudden ? schud(lijst.slice()) : lijst.slice(); st.i = 0; st.goed = []; st.fout = []; st.om = false; teken(); }
    function antwoord(goed) { var k = st.stapel[st.i]; (goed ? st.goed : st.fout).push(k); st.i++; st.om = false; teken(); }
    el.addEventListener('click', function (e) {
      if (e.target === el) return sluit();
      var a = e.target.closest('[data-a]'), o = e.target.closest('[data-o]');
      if (o) { st[o.dataset.o] = o.checked; if (o.dataset.o === 'schudden') start(alle); else teken(); return; }
      if (e.target.closest('.fk-dicht')) return sluit();
      if (e.target.closest('.fk-kaart')) { st.om = !st.om; return teken(); }
      if (!a) return;
      var x = a.dataset.a;
      if (x === 'draai') { st.om = true; teken(); }
      else if (x === 'ja') antwoord(true);
      else if (x === 'nee') antwoord(false);
      else if (x === 'terug' && st.i > 0) { st.i--; st.om = false; var w = st.stapel[st.i]; st.goed = st.goed.filter(function (y) { return y !== w; }); st.fout = st.fout.filter(function (y) { return y !== w; }); teken(); }
      else if (x === 'fout') start(st.fout);
      else if (x === 'opnieuw') start(alle);
      else if (x === 'dicht') sluit();
    });
    function toets(e) {
      if (e.key === 'Escape') { e.preventDefault(); return sluit(); }
      if (st.i >= st.stapel.length) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); st.om = !st.om; teken(); }
      else if (e.key === 'ArrowRight' && st.om) { e.preventDefault(); antwoord(true); }
      else if (e.key === 'ArrowLeft' && st.om) { e.preventDefault(); antwoord(false); }
      e.stopPropagation();
    }
    document.addEventListener('keydown', toets, true);
    var oudSluit = sluit; sluit = function () { document.removeEventListener('keydown', toets, true); oudSluit(); };
    teken();
  }

  function plaats() {
    var g = document.getElementById('glossary');
    if (!g || document.querySelector('.fk-knop')) return !!g;
    if (!g.querySelector('.term')) return false;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var k = document.createElement('button'); k.type = 'button'; k.className = 'fk-knop';
    k.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>Oefen met flipkaarten';
    k.addEventListener('click', open);
    g.parentNode.insertBefore(k, g);
    return true;
  }
  function probeer(n) { if (plaats() || n > 40) return; setTimeout(function () { probeer(n + 1); }, 150); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { probeer(0); }); else probeer(0);
})();
