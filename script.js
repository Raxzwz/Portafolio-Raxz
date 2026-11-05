document.documentElement.classList.add('js');

// Logos: intenta cargar assets/logos/<nombre>.(png|webp|jpg|svg); si no existe, muestra la inicial.
(function () {
  var exts = ['png', 'webp', 'jpg', 'svg'];
  document.querySelectorAll('.logo[data-logo]').forEach(function (box) {
    var name = box.dataset.logo;
    box.textContent = box.dataset.initial || name[0].toUpperCase();
    var i = 0;
    (function tryNext() {
      if (i >= exts.length) return;
      var img = new Image();
      img.alt = 'Logo de ' + name;
      img.onload = function () { box.textContent = ''; box.appendChild(img); };
      img.onerror = function () { i++; tryNext(); };
      img.src = 'assets/logos/' + name + '.' + exts[i];
    })();
  });
})();

// Menú móvil
var burger = document.getElementById('burger');
var menu = document.getElementById('menu');
burger.addEventListener('click', function () {
  var open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
});

// Borde del nav al hacer scroll
var nav = document.getElementById('nav');
addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });

// Animaciones de entrada
var els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el); });
} else { els.forEach(function (el) { el.classList.add('in'); }); }

// Pasos del proceso (tabs)
(function () {
  var tabs = document.querySelectorAll('.step-tabs [role=tab]');
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { var n = (i + d + tabs.length) % tabs.length; show(n); tabs[n].focus(); }
    });
  });
  function show(n) {
    tabs.forEach(function (t, i) {
      t.setAttribute('aria-selected', i === n); t.tabIndex = i === n ? 0 : -1;
      document.getElementById('sp' + i).hidden = i !== n;
    });
  }
})();

// Reseñas: agrega objetos aquí y la sección aparece sola. Usa solo reseñas reales.
// Ejemplo: { text: 'Gran trabajo.', name: 'Nombre', role: 'Owner · Servidor' }
var REVIEWS = [];
(function () {
  if (!REVIEWS.length) return;
  var wrap = document.getElementById('reviews');
  REVIEWS.forEach(function (r) {
    var a = document.createElement('article'); a.className = 'card review reveal in';
    var p = document.createElement('p'); p.textContent = '“' + r.text + '”';
    var s = document.createElement('small'); s.textContent = r.name + ' · ' + r.role;
    a.appendChild(p); a.appendChild(s); wrap.appendChild(a);
  });
  document.getElementById('resenas').hidden = false;
})();

// Modal de propuesta
(function () {
  var dlg = document.getElementById('prop');
  document.getElementById('openProp').addEventListener('click', function () {
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  document.getElementById('pCopy').addEventListener('click', function () {
    var f = document.getElementById('propForm'), msg = document.getElementById('pMsg');
    if (!f.reportValidity()) return;
    var txt = 'Hola Raxzwz, te escribo por mi servidor.\nServidor: ' + pName.value +
      '\nModalidad: ' + pMode.value + '\nNecesito: ' + pNeed.value;
    function ok() { msg.textContent = 'Propuesta copiada. Compártela por SpigotMC o GitHub.'; }
    function fallback() { pNeed.select(); msg.textContent = 'No se pudo copiar automáticamente.'; }
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
  });
})();

// Animaciones on/off (se recuerda en el navegador)
(function () {
  var btn = document.getElementById('animToggle'), root = document.documentElement;
  function set(on) {
    root.classList.toggle('noanim', !on);
    btn.setAttribute('aria-pressed', on);
    btn.textContent = on ? 'Animaciones activadas' : 'Animaciones desactivadas';
    try { localStorage.setItem('anim', on ? '1' : '0'); } catch (e) {}
  }
  var saved = null; try { saved = localStorage.getItem('anim'); } catch (e) {}
  if (saved === '0') set(false);
  btn.addEventListener('click', function () { set(root.classList.contains('noanim')); });
})();
