/* Idioma, menú del celular y la etiqueta de lote de la portada. */
(function () {
  var raiz = document.documentElement;

  function guardar(idioma) {
    try { localStorage.setItem('homeLang', idioma); } catch (e) { /* sin almacenamiento: el idioma dura esta página */ }
  }

  function aplicarTitulo() {
    var t = document.body.getAttribute('data-titulo-' + raiz.lang);
    if (t) document.title = t;
  }

  /* Las páginas que arman su contenido con su propio script manejan su botón #languageToggle. */
  document.querySelectorAll('[data-cambiar-idioma]').forEach(function (boton) {
    boton.addEventListener('click', function () {
      raiz.lang = raiz.lang === 'en' ? 'es' : 'en';
      guardar(raiz.lang);
      aplicarTitulo();
      document.dispatchEvent(new Event('idioma'));
    });
  });
  aplicarTitulo();

  var abrir = document.querySelector('.abrir-menu');
  var menu = document.querySelector('.menu');
  if (abrir && menu) {
    abrir.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      abrir.setAttribute('aria-expanded', String(abierto));
    });
  }

  /* El vencimiento de la etiqueta de ejemplo siempre queda a dos semanas de hoy. */
  var hoy = new Date();
  var vence = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 14);
  var mesesEs = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var mesesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  document.querySelectorAll('[data-vence="es"]').forEach(function (el) {
    el.textContent = vence.getDate() + ' ' + mesesEs[vence.getMonth()] + ' ' + vence.getFullYear();
  });
  document.querySelectorAll('[data-vence="en"]').forEach(function (el) {
    el.textContent = mesesEn[vence.getMonth()] + ' ' + vence.getDate() + ', ' + vence.getFullYear();
  });

  var etiqueta = document.querySelector('.etiqueta');
  if (etiqueta) {
    var boton = etiqueta.querySelector('.etiqueta__boton');
    var lista = etiqueta.querySelector('.retiro');
    lista.hidden = true;
    boton.setAttribute('aria-expanded', 'false');
    var escritorio = window.matchMedia('(min-width: 961px)');
    function retirar(mostrar) {
      lista.hidden = !mostrar;
      etiqueta.classList.toggle('retirado', mostrar);
      boton.setAttribute('aria-expanded', String(mostrar));
      /* Con la lista abierta la etiqueta puede no caber en la ventana: se sube para que se lea el final. */
      var sobra = window.innerHeight - etiqueta.offsetHeight - 24;
      etiqueta.style.top = mostrar && escritorio.matches && sobra < 16 ? sobra + 'px' : '';
    }
    var alPasar = false;
    boton.addEventListener('click', function () { alPasar = false; retirar(lista.hidden); });

    /* El lote que viaja: un sello cae de golpe, por eso va con una clase y no atado al scroll. */
    var etapas = Array.prototype.slice.call(document.querySelectorAll('.etapa'));
    if (etapas.length && 'IntersectionObserver' in window) {
      etiqueta.parentNode.classList.add('viaje--vivo');
      /* Se recalculan todas: un salto largo (Inicio, Fin) cruza etapas sin avisar por cada una. */
      var observador = new IntersectionObserver(function () {
        var linea = window.innerHeight * 0.62;
        etapas.forEach(function (etapa, i) {
          var puesta = etapa.getBoundingClientRect().top < linea;
          etapa.querySelector('.timbre').classList.toggle('puesto', puesta);
          var sello = etiqueta.querySelector('[data-timbre="' + i + '"]');
          if (sello) { sello.classList.toggle('puesto', puesta); }
          if (i === etapas.length - 1 && escritorio.matches) {
            if (puesta && lista.hidden) { alPasar = true; retirar(true); }
            if (!puesta && alPasar) { alPasar = false; retirar(false); }
          }
        });
      }, { rootMargin: '0px 0px -38% 0px' });
      etapas.concat([document.querySelector('.portada__texto'), document.querySelector('.viaje')]).forEach(function (e) { observador.observe(e); });
    }
  }
  /* Videos: la imagen de YouTube carga primero; el reproductor, sólo al pulsar. */
  var videos = document.querySelector('[data-videos]');
  if (videos) {
    var escenario = videos.querySelector('.video');
    var cartel = escenario.querySelector('.video__poster');
    var filas = Array.prototype.slice.call(videos.querySelectorAll('.videos__lista button'));
    var activa = filas[0];
    function idVideo() { return activa.getAttribute('data-' + raiz.lang); }
    function mostrar() {
      var marco = escenario.querySelector('iframe');
      if (marco) { marco.remove(); }
      cartel.hidden = false;
      cartel.style.display = '';
      cartel.querySelector('img').src = 'https://img.youtube.com/vi/' + idVideo() + '/hqdefault.jpg';
      filas.forEach(function (f) { f.setAttribute('aria-current', String(f === activa)); });
    }
    filas.forEach(function (f) { f.addEventListener('click', function () { activa = f; mostrar(); }); });
    cartel.addEventListener('click', function () {
      var marco = document.createElement('iframe');
      marco.src = 'https://www.youtube-nocookie.com/embed/' + idVideo() + '?rel=0&autoplay=1&hl=' + raiz.lang;
      marco.title = 'PivetTrack';
      marco.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      cartel.style.display = 'none';
      escenario.appendChild(marco);
    });
    document.addEventListener('idioma', mostrar);
    mostrar();
  }
})();
