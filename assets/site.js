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

  var hayObservador = 'IntersectionObserver' in window;
  var mueve = hayObservador && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (mueve) { raiz.classList.add('vivo'); }
  var SALIDA = 'cubic-bezier(.23, 1, .32, 1)';
  var VAIVEN = 'cubic-bezier(.77, 0, .175, 1)';
  function lista$(sel, base) { return Array.prototype.slice.call((base || document).querySelectorAll(sel)); }

  if (abrir && menu) {
    lista$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('abierto');
        abrir.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) {
        menu.classList.remove('abierto');
        abrir.setAttribute('aria-expanded', 'false');
        abrir.focus();
      }
    });
  }

  /* La etiqueta: se imprime por rubro y viaja con la lectura. */
  var etiqueta = document.querySelector('.etiqueta');
  if (etiqueta) {
    var boton = etiqueta.querySelector('.etiqueta__boton');
    var lista = etiqueta.querySelector('.retiro');
    var imprenta = document.querySelector('.imprenta');
    var salida = document.querySelector('.imprenta__salida');
    var barra = document.querySelector('.barra');
    var etapas = lista$('.etapa');
    var botones = lista$('.imprenta__cabezal button');
    var escritorio = window.matchMedia('(min-width: 961px)');
    var esp = raiz.lang !== 'en';
    var alPasar = false;
    var actual = 0;
    var vieja = null;

    lista.hidden = true;
    boton.setAttribute('aria-expanded', 'false');

    function retirar(mostrar) {
      lista.hidden = !mostrar;
      etiqueta.classList.toggle('retirado', mostrar);
      boton.setAttribute('aria-expanded', String(mostrar));
      /* Con la lista abierta puede no caber en la ventana: se sube para que se lea el final. */
      var cabe = window.innerHeight - imprenta.offsetHeight - 16;
      imprenta.style.top = mostrar && escritorio.matches && cabe < barra.offsetHeight + 12 ? cabe + 'px' : '';
    }

    var RUBROS = [
      { n: 'Gulf Coast Foods', es: 'Yogur griego 32 oz, caja x6', en: 'Greek yogurt 32 oz, case of 6', l: 'GC-26-1014', s: 'YOG-032', p: '4-B', d: 14,
        c: [['Brickell Bistro Group', 14], ['Coral Gables Catering', 12], ['Key Biscayne Hotel & Suites', 16], ['Little Havana Market', 10]] },
      { n: 'Atlantic Hardware Supply', es: 'Tornillo 1/2", caja x100', en: 'Screw 1/2", box of 100', l: 'AH-26-0731', s: 'TOR-012', p: '7-A', d: null,
        c: [['Doral Tool & Supply', 20], ['Hialeah Builders', 15], ['Kendall Contractors', 12], ['Medley Ironworks', 5]] },
      { n: 'Biscayne Fragrance Co.', es: 'Perfume 100 ml, caja x12', en: 'Perfume 100 ml, case of 12', l: 'BF-26-0418', s: 'PER-100', p: '2-C', d: 1095,
        c: [['Aventura Beauty', 18], ['Sunset Perfumes', 14], ['Wynwood Cosmetics', 11], ['Coral Way Boutique', 9]] },
      { n: 'Palmetto Auto Parts', es: 'Filtro de aceite, caja x24', en: 'Oil filter, case of 24', l: 'PA-26-2207', s: 'FIL-204', p: '9-D', d: null,
        c: [['Flagler Auto Service', 22], ['Westchester Garage', 13], ['Opa-locka Fleet', 10], ['Miami Lakes Motors', 7]] }
    ];
    var parrafo = etapas[0].querySelector('p');
    var titulo = etapas[2].querySelector('h3');
    var conVence = { p: parrafo.textContent, t: titulo.textContent };
    var sinVence = esp
      ? { p: 'Cada una se registra con su lote, contra el documento del proveedor. Si faltan cajas, la diferencia queda anotada.', t: 'Sale primero el lote más antiguo.' }
      : { p: "Each one is logged with its lot, against the supplier's document. If cases are missing, the difference is on record.", t: 'The oldest lot ships first.' };

    function fecha(dias) {
      if (dias === null) { return esp ? 'No aplica' : 'N/A'; }
      var v = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + dias);
      return esp ? v.getDate() + ' ' + mesesEs[v.getMonth()] + ' ' + v.getFullYear() : mesesEn[v.getMonth()] + ' ' + v.getDate() + ', ' + v.getFullYear();
    }
    function barras(codigo) {
      var semilla = 7, x = 0, html = '';
      for (var i = 0; i < codigo.length; i++) { semilla = (semilla * 31 + codigo.charCodeAt(i)) % 9973; }
      while (x < 142) {
        semilla = (semilla * 137 + 59) % 9973;
        var ancho = 1 + semilla % 3;
        html += '<rect x="' + x + '" width="' + ancho + '" height="60"/>';
        x += ancho + 1 + (semilla >> 3) % 3;
      }
      return html;
    }
    function escribir(r) {
      etiqueta.querySelector('.etiqueta__arriba span').textContent = r.n;
      etiqueta.querySelector('.etiqueta__producto').textContent = r[esp ? 'es' : 'en'];
      etiqueta.querySelector('.etiqueta__lote').textContent = r.l;
      etiqueta.querySelector('.etiqueta__codigo').textContent = r.l;
      etiqueta.querySelector('[data-vence]').textContent = fecha(r.d);
      lista$('.etiqueta__dato', etiqueta)[1].textContent = r.s;
      var codigo = etiqueta.querySelector('svg');
      codigo.innerHTML = barras(r.l);
      codigo.setAttribute('aria-label', (esp ? 'Código de barras del lote ' : 'Barcode for lot ') + r.l);
      var ul = lista.querySelector('ul');
      ul.textContent = '';
      r.c.forEach(function (c) {
        var li = document.createElement('li'), a = document.createElement('span'), b = document.createElement('span');
        a.textContent = c[0]; b.textContent = c[1];
        li.appendChild(a); li.appendChild(b); ul.appendChild(li);
      });
      [etiqueta.querySelector('[data-timbre="1"]'), etapas[1].querySelector('.timbre')].forEach(function (t) {
        t.firstChild.nodeValue = (esp ? 'PASILLO ' : 'AISLE ') + r.p;
        t.querySelector('small').textContent = (esp ? 'AISLE ' : 'PASILLO ') + r.p;
      });
      var textos = r.d === null ? sinVence : conVence;
      parrafo.textContent = textos.p;
      titulo.textContent = textos.t;
    }
    function escanear(espera) {
      if (!mueve) { return; }
      var codigo = etiqueta.querySelector('svg');
      var luz = document.createElement('i');
      luz.className = 'laser';
      luz.style.cssText = 'top:' + codigo.offsetTop + 'px;left:' + codigo.offsetLeft + 'px;height:' + codigo.offsetHeight + 'px';
      etiqueta.appendChild(luz);
      var pasada = luz.animate([
        { transform: 'translateX(0)', opacity: 0 },
        { opacity: 1, offset: 0.08 },
        { opacity: 1, offset: 0.92 },
        { transform: 'translateX(' + codigo.offsetWidth + 'px)', opacity: 0 }
      ], { duration: 540, delay: espera, easing: 'ease-in-out', fill: 'both' });
      pasada.onfinish = function () { luz.remove(); };
    }
    function imprimir(i) {
      if (i === actual) { return; }
      actual = i;
      lista$('.laser', etiqueta).forEach(function (l) { l.remove(); });
      botones.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      if (vieja) { vieja.remove(); vieja = null; }
      if (!mueve) { escribir(RUBROS[i]); return; }
      var hoja = etiqueta.cloneNode(true);
      hoja.setAttribute('aria-hidden', 'true');
      hoja.removeAttribute('aria-label');
      hoja.classList.add('etiqueta--vieja');
      hoja.style.width = etiqueta.offsetWidth + 'px';
      salida.appendChild(hoja);
      vieja = hoja;
      hoja.animate(
        [{ transform: 'translateY(0) rotate(1.6deg)', opacity: 1 }, { transform: 'translate(10px, 54px) rotate(6deg)', opacity: 0 }],
        { duration: 260, easing: SALIDA, fill: 'forwards' }
      ).onfinish = function () { hoja.remove(); if (vieja === hoja) { vieja = null; } };
      escribir(RUBROS[i]);
      etiqueta.getAnimations().forEach(function (a) { a.cancel(); });
      etiqueta.animate([
        { transform: 'translateY(-102%) rotate(0deg)', easing: 'steps(20, end)', offset: 0 },
        { transform: 'translateY(0) rotate(0deg)', easing: SALIDA, offset: 0.82 },
        {}
      ], { duration: 760 });
      escanear(800);
    }

    /* Una sola vuelta por los rubros mientras nadie toca nada. */
    var ciclo = null, pasos = 0, quieto = false;
    function pausar() { clearTimeout(ciclo); ciclo = null; }
    function parar() { quieto = true; pausar(); }
    function seguir() {
      pasos++;
      imprimir((actual + 1) % RUBROS.length);
      if (pasos < RUBROS.length) { ciclo = setTimeout(seguir, 3400); } else { ciclo = null; }
    }
    if (mueve) {
      escanear(1250);
      if (escritorio.matches) {
        ciclo = setTimeout(seguir, 3800);
        window.addEventListener('scroll', function fuera() {
          if (window.scrollY > 240) { parar(); window.removeEventListener('scroll', fuera); }
        }, { passive: true });
      } else {
        /* En el celular la etiqueta queda bajo la primera pantalla: el ciclo corre sólo mientras se ve. */
        new IntersectionObserver(function (avisos) {
          if (!avisos[avisos.length - 1].isIntersecting) { pausar(); return; }
          if (!quieto && !ciclo && pasos < RUBROS.length) { ciclo = setTimeout(seguir, 2000); }
        }, { rootMargin: '-15% 0px -45% 0px' }).observe(imprenta);
      }
      /* Al deslizar con el dedo sobre la etiqueta no se cuenta como detenerla; tocar un rubro sí. */
      imprenta.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') { parar(); } });
      imprenta.addEventListener('focusin', parar);
      document.addEventListener('visibilitychange', function () { if (document.hidden) { parar(); } });
    }
    botones.forEach(function (b, i) { b.addEventListener('click', function () { parar(); imprimir(i); }); });
    boton.addEventListener('click', function () { parar(); alPasar = false; retirar(lista.hidden); });

    /* Un sello cae de golpe, por eso va con una clase y no atado al scroll. */
    if (etapas.length && hayObservador) {
      document.querySelector('.portada__rejilla--viaje').classList.add('viaje--vivo');
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

  /* Índice de la página: la marca sigue a la sección que se está leyendo. */
  var indice = document.querySelector('.indice');
  if (indice && hayObservador) {
    var fila = indice.querySelector('.indice__fila');
    var marca = indice.querySelector('.indice__marca');
    var enlaces = lista$('a', indice);
    var destinos = enlaces.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var marcar = function () {
      var linea = window.innerHeight * 0.4, activo = -1;
      destinos.forEach(function (d, i) { if (d && d.getBoundingClientRect().top < linea) { activo = i; } });
      enlaces.forEach(function (a, i) {
        if (i === activo) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
      });
      if (activo < 0) { marca.style.opacity = 0; return; }
      var a = enlaces[activo];
      marca.style.opacity = 1;
      marca.style.transform = 'translateX(' + a.offsetLeft + 'px) scaleX(' + a.offsetWidth + ')';
      if (fila.scrollWidth > fila.clientWidth) { fila.scrollTo({ left: a.offsetLeft - 32, behavior: mueve ? 'smooth' : 'auto' }); }
    };
    var espia = new IntersectionObserver(marcar, { rootMargin: '-40% 0px -60% 0px' });
    destinos.forEach(function (d) { if (d) { espia.observe(d); } });
    window.addEventListener('resize', marcar, { passive: true });
    marcar();
  }

  /* Lo que llega al leerlo: sellos, cifras que corren y capturas que se descubren. */
  function contar(el) {
    var partes = el.textContent.match(/^([^\d]*)([\d,.]*\d)(.*)$/);
    if (!partes) { return; }
    var valor = parseFloat(partes[2].replace(/,/g, ''));
    var decimales = (partes[2].split('.')[1] || '').length;
    var inicio = null, duracion = 950;
    function cuadro(t) {
      if (inicio === null) { inicio = t; }
      var p = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - p, 4);
      el.textContent = partes[1] + (valor * suave).toLocaleString('en-US', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) + partes[3];
      if (p < 1) { requestAnimationFrame(cuadro); }
    }
    requestAnimationFrame(cuadro);
  }
  if (mueve) {
    var llegan = new IntersectionObserver(function (avisos) {
      avisos.forEach(function (aviso) {
        if (!aviso.isIntersecting) { return; }
        aviso.target.classList.add('llego');
        llegan.unobserve(aviso.target);
        lista$('.medicion__valor, b', aviso.target).forEach(function (b) {
          if (aviso.target.matches('.medicion tbody tr, .caso__datos > div')) { contar(b); }
        });
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    lista$('.libro__fila, .parada, .pasos li, .ruta li, .precio, .plan__cifra, .medicion tbody tr, .caso__datos > div, .pt-gerencia .captura').forEach(function (e) { llegan.observe(e); });
  }

  /* Las pantallas de la app: la nueva entra barriendo a la anterior. */
  var tour = document.querySelector('[data-pantallas]');
  if (tour) {
    var marco = tour.querySelector('.captura-marco');
    var pestanas = lista$('.recorre__pestanas button', tour);
    var pie = tour.querySelector('.recorre__texto');
    var base = tour.getAttribute('data-pantallas');
    var turno = 0, posicion = 0, cargadas = false;
    var tamanos = marco.querySelector('img').getAttribute('sizes');
    /* El marco fija el tamaño de la imagen: alcanza con declarar el ancho mayor. */
    function fuentes(img, b) {
      var ruta = base + b.getAttribute('data-img');
      img.sizes = tamanos;
      img.srcset = ruta + '-900.jpg 900w, ' + ruta + '.jpg 2000w';
      img.src = ruta + '.jpg';
    }
    tour.querySelector('.recorre__pestanas').addEventListener('pointerenter', function () {
      if (cargadas) { return; }
      cargadas = true;
      pestanas.forEach(function (b) { fuentes(new Image(), b); });
    });
    pestanas.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (i === posicion) { return; }
        var hacia = i > posicion ? 1 : -1;
        posicion = i;
        pestanas.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        pie.textContent = b.getAttribute('data-pie');
        var propio = ++turno;
        var img = new Image();
        img.className = 'captura';
        img.alt = b.getAttribute('data-alt');
        fuentes(img, b);
        (img.decode ? img.decode() : Promise.resolve()).catch(function () {}).then(function () {
          if (propio !== turno) { return; }
          var previas = lista$('img', marco);
          marco.appendChild(img);
          var quitar = function () { previas.forEach(function (p) { p.remove(); }); };
          if (!mueve) { quitar(); return; }
          img.animate(
            [{ clipPath: hacia > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
            { duration: 300, easing: VAIVEN }
          ).onfinish = quitar;
        });
      });
    });
  }

  /* Videos: la imagen de YouTube carga primero; el reproductor, sólo al pulsar. */
  var videos = document.querySelector('[data-videos]');
  if (videos) {
    var escenario = videos.querySelector('.video');
    var cartel = escenario.querySelector('.video__poster');
    var filas = lista$('.videos__lista button', videos);
    var activa = filas[0];
    function idVideo() { return activa.getAttribute('data-' + raiz.lang); }
    function mostrar(conMovimiento) {
      var marcoVideo = escenario.querySelector('iframe');
      if (marcoVideo) { marcoVideo.remove(); }
      cartel.hidden = false;
      cartel.style.display = '';
      var img = cartel.querySelector('img');
      img.src = 'https://img.youtube.com/vi/' + idVideo() + '/hqdefault.jpg';
      cartel.setAttribute('aria-label', cartel.querySelector('.video__play').textContent + ': ' + activa.querySelector('b').textContent);
      filas.forEach(function (f) { f.setAttribute('aria-current', String(f === activa)); });
      if (conMovimiento && mueve) {
        cartel.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 240, easing: SALIDA });
      }
    }
    filas.forEach(function (f) { f.addEventListener('click', function () { if (f !== activa) { activa = f; mostrar(true); } }); });
    cartel.addEventListener('click', function () {
      var marcoVideo = document.createElement('iframe');
      marcoVideo.src = 'https://www.youtube-nocookie.com/embed/' + idVideo() + '?rel=0&autoplay=1&hl=' + raiz.lang;
      marcoVideo.title = 'PivetTrack';
      marcoVideo.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      cartel.style.display = 'none';
      escenario.appendChild(marcoVideo);
    });
    document.addEventListener('idioma', function () { mostrar(false); });
    mostrar(false);
  }
})();
