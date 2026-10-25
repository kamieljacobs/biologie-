/* Kopbalk op de telefoon (Kamiel 25 okt 2026: 'op de telefoon zie je delen maar half').
   Op een smal scherm (≤ 700 px) schuift de vaste kopbalk (header.bar) weg zodra je naar
   beneden scrollt en komt hij terug als je omhoog scrollt, zodat hij niet een kwart van
   het scherm afdekt. De opmaak (klasse .weg) staat in de pagina zelf.
   Meegeladen door js/teller.js; doet niets op pagina's zonder header.bar. */
(function () {
  'use strict';
  if (window.__kopbalk) return;
  window.__kopbalk = true;

  function start() {
    var bar = document.querySelector('header.bar');
    if (!bar || !window.matchMedia) return;
    var smal = window.matchMedia('(max-width:700px)');
    var vorige = window.scrollY || 0, weg = false, wacht = false;

    function zet(w) {
      if (w === weg) return;
      weg = w;
      bar.classList.toggle('weg', w);
      document.documentElement.classList.toggle('kop-weg', w);
      try { window.dispatchEvent(new Event('kopbalk')); } catch (e) {}
    }
    function open() {
      // niet wegschuiven terwijl het uitklapmenu open is of er iets in de balk focus heeft
      return !!bar.querySelector('details[open]') || bar.contains(document.activeElement) && document.activeElement !== document.body;
    }
    function kijk() {
      wacht = false;
      var y = Math.max(0, window.scrollY || 0), d = y - vorige;
      if (!smal.matches) { zet(false); vorige = y; return; }
      if (y < bar.offsetHeight + 20) zet(false);
      else if (d > 6 && !open()) zet(true);
      else if (d < -6) zet(false);
      if (Math.abs(d) > 6 || y < 5) vorige = y;
    }
    window.addEventListener('scroll', function () {
      if (!wacht) { wacht = true; requestAnimationFrame(kijk); }
    }, { passive: true });
    // terug naar boven via een link of hash-route: balk meteen weer tonen
    window.addEventListener('hashchange', function () { zet(false); vorige = window.scrollY || 0; });
    bar.addEventListener('focusin', function () { zet(false); });
    if (smal.addEventListener) smal.addEventListener('change', function () { zet(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
