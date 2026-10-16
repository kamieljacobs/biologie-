/* Thema licht/donker voor tools · Biologie bij Kamiel
   Leest en bewaart dezelfde voorkeur ('thema') als de site. Laad dit script in de <head>.
   Een knop met data-thema-knop wisselt het thema. */
(function(){
  var r=document.documentElement;
  function zet(t){r.setAttribute('data-theme',t==='light'?'light':'dark');}
  try{zet(localStorage.getItem('thema'));}catch(e){zet('dark');}
  var zon='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var maan='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  function teken(k){var licht=r.getAttribute('data-theme')==='light';k.innerHTML=licht?maan:zon;k.setAttribute('aria-label',licht?'Donkere weergave':'Lichte weergave');k.title=k.getAttribute('aria-label');}
  window.wisselThema=function(){
    var t=r.getAttribute('data-theme')==='light'?'dark':'light';zet(t);
    try{localStorage.setItem('thema',t);}catch(e){}
    document.querySelectorAll('[data-thema-knop]').forEach(teken);
    document.dispatchEvent(new CustomEvent('themawissel',{detail:t}));
  };
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('[data-thema-knop]').forEach(function(k){teken(k);k.addEventListener('click',window.wisselThema);});
  });
})();
