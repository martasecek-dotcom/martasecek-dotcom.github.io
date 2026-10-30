/* ==========================================================
   Přepínač jazyka CS/EN (čistý JavaScript, bez knihoven).
   Pořadí volby: ?lang= v adrese → uložená volba → jazyk prohlížeče.
   Volba se ukládá jen lokálně v prohlížeči (localStorage),
   žádná data se nikam neodesílají.
   ========================================================== */
(function () {
  var root = document.documentElement;

  // Zjistí počáteční jazyk
  function initial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'cs' || q === 'en') return q;
    try {
      var s = localStorage.getItem('lang');
      if (s === 'cs' || s === 'en') return s;
    } catch (e) { /* úložiště nemusí být dostupné */ }
    var nav = (navigator.language || 'en').toLowerCase();
    return (nav.indexOf('cs') === 0 || nav.indexOf('sk') === 0) ? 'cs' : 'en';
  }

  // Nastaví jazyk: atribut na <html>, stav tlačítek, titulek stránky
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === l ? 'true' : 'false');
    });
    var t = document.documentElement.getAttribute('data-title-' + l);
    if (t) document.title = t;
    try { localStorage.setItem('lang', l); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-set')); });
    });
    setLang(initial());
  });
})();
