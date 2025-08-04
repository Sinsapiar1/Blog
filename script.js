// Clase para el efecto "magic line" en el menú de navegación
class MagicLine {
  constructor(menu) {
    this.menu = menu;
    if (!this.menu) {
      return;
    }
    
    // Añadir clase al menú
    this.menu.classList.add('has-magic-line');
    
    // Crear el elemento "magic line"
    this.line = document.createElement('li');
    this.line.classList.add('magic-line');
    this.menu.appendChild(this.line);
    
    // Actualizar la posición inicial
    this.update();
    
    // Listener para actualizar en cambio de tamaño de ventana
    window.addEventListener('resize', this.update.bind(this));
  }
  
  update() {
    // Obtener el elemento activo
    const activeItem = this.menu.querySelector('.active');
    if (!activeItem) {
      return;
    }
    
    // Actualizar la posición y el color de la línea mágica
    this.line.style.transform = `translateY(${activeItem.offsetTop || 0}px)`;
    this.line.style.height = `${activeItem.offsetHeight || 0}px`;
    this.line.style.backgroundColor = window.getComputedStyle(activeItem).getPropertyValue('background-color');
  }
}

// Función legacy removida - ahora usamos el sistema híbrido

// Sistema híbrido de Instagram - Detectar si embeds cargan o mostrar fallback
function initInstagramSystem() {
  console.log('🔍 Inicializando sistema híbrido de Instagram...');
  
  const embedContainers = document.querySelectorAll('.embed-container');
  let embedsLoaded = 0;
  let totalEmbeds = embedContainers.length;
  
  // Función para mostrar las cards de fallback
  function showFallbackCard(container) {
    const blockquote = container.querySelector('.instagram-media');
    const fallbackCard = container.querySelector('.fallback-card');
    
    if (blockquote && fallbackCard) {
      console.log('📱 Mostrando card de fallback para:', container.dataset.postId);
      blockquote.style.display = 'none';
      fallbackCard.style.display = 'block';
    }
  }
  
  // Función para verificar si un embed se ha cargado correctamente
  function checkEmbedLoaded(container) {
    const blockquote = container.querySelector('.instagram-media');
    if (!blockquote) return false;
    
    // Verificar si Instagram ha procesado el embed
    const iframe = blockquote.querySelector('iframe');
    const processedContent = blockquote.querySelector('.instagram-media-rendered');
    
    // Si tiene iframe o contenido procesado, está cargado
    if (iframe || processedContent || blockquote.offsetHeight > 100) {
      console.log('✅ Embed cargado correctamente:', container.dataset.postId);
      return true;
    }
    
    return false;
  }
  
  // Verificar cada embed después de intentos de carga
  function checkAllEmbeds() {
    let embedsSuccessful = 0;
    
    embedContainers.forEach(container => {
      if (checkEmbedLoaded(container)) {
        embedsSuccessful++;
      } else {
        showFallbackCard(container);
      }
    });
    
    console.log(`📊 Estado: ${embedsSuccessful}/${totalEmbeds} embeds cargados`);
    
    if (embedsSuccessful === 0) {
      console.log('⚠️ Ningún embed cargó - Mostrando todas las cards de fallback');
    } else if (embedsSuccessful < totalEmbeds) {
      console.log('⚠️ Algunos embeds fallaron - Sistema híbrido activo');
    } else {
      console.log('🎉 Todos los embeds cargaron correctamente!');
    }
  }
  
  // Intentar procesar embeds de Instagram inmediatamente
  if (window.instgrm && window.instgrm.Embeds) {
    console.log('📸 Script de Instagram detectado - Procesando embeds...');
    try {
      window.instgrm.Embeds.process();
    } catch (error) {
      console.log('❌ Error procesando embeds:', error);
    }
  }
  
  // Verificar después de 3 segundos
  setTimeout(() => {
    console.log('⏱️ Primera verificación (3s)...');
    checkAllEmbeds();
  }, 3000);
  
  // Verificación final después de 8 segundos
  setTimeout(() => {
    console.log('⏱️ Verificación final (8s)...');
    checkAllEmbeds();
  }, 8000);
  
  // También verificar cuando el script de Instagram se carga
  const embedScript = document.querySelector('script[src*="instagram.com/embed.js"]');
  if (embedScript) {
    embedScript.addEventListener('load', () => {
      console.log('📜 Script de Instagram cargado - Reintentando...');
      setTimeout(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          try {
            window.instgrm.Embeds.process();
            setTimeout(checkAllEmbeds, 2000);
          } catch (error) {
            console.log('❌ Error en reintento:', error);
          }
        }
      }, 1000);
    });
  }
}

// Inicializar MagicLine cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Ocultar loader cuando la página esté cargada
  window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 500);
  });
  
  // Inicializar AOS (Animate On Scroll) - CONFIGURACIÓN UNIVERSAL
  AOS.init({
    duration: 600, // Animación más rápida
    easing: 'ease-out',
    once: true,
    offset: 50, // Offset bajo para que active pronto en TODOS los dispositivos
    delay: 0,
    disable: false, // NUNCA desactivar - funciona en todos lados
    startEvent: 'DOMContentLoaded',
    throttleDelay: 99,
    debounceDelay: 50
  });
  
  // FORZAR VISIBILIDAD UNIVERSAL - Para todos los dispositivos
  setTimeout(() => {
    const projectCards = document.querySelectorAll('.project-card[data-aos]');
    const projectsSection = document.querySelector('.projects');
    
    // Asegurar que las cards siempre sean visibles
    projectCards.forEach((card, index) => {
      // Forzar visibilidad inicial
      card.style.opacity = '1';
      card.style.visibility = 'visible';
      card.style.display = 'block';
      
      // Si AOS no ha activado la animación, forzarla
      if (!card.classList.contains('aos-animate')) {
        setTimeout(() => {
          card.classList.add('aos-animate');
        }, index * 100); // Animación escalonada
      }
    });
    
    if (projectsSection) {
      projectsSection.style.opacity = '1';
      projectsSection.style.visibility = 'visible';
    }
    
    console.log('🎯 Visibilidad universal aplicada a', projectCards.length, 'cards');
  }, 300);
  
  // Menú hamburguesa mejorado
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  // Función para asegurar que los botones sean visibles
  function ensureButtonsVisible() {
    const menuToggle = document.getElementById('menuToggle');
    const themeToggle = document.getElementById('themeToggle');
    
    if (window.innerWidth <= 992) {
      if (menuToggle) {
        menuToggle.style.display = 'flex';
        menuToggle.style.zIndex = '1003';
        menuToggle.style.position = 'fixed';
        menuToggle.style.top = '15px';
        menuToggle.style.left = '15px';
      }
      
      if (themeToggle) {
        themeToggle.style.display = 'block';
        themeToggle.style.zIndex = '1003';
        themeToggle.style.position = 'fixed';
        themeToggle.style.top = '15px';
        themeToggle.style.right = '15px';
      }
    } else {
      // En desktop, mostrar botón de tema pero ocultar menú
      if (menuToggle) {
        menuToggle.style.display = 'none';
      }
      if (themeToggle) {
        themeToggle.style.display = 'block';
        themeToggle.style.zIndex = '1001';
        themeToggle.style.position = 'fixed';
        themeToggle.style.top = '20px';
        themeToggle.style.right = '20px';
      }
    }
  }
  
  // Ejecutar al cargar y al cambiar tamaño de ventana
  ensureButtonsVisible();
  window.addEventListener('resize', ensureButtonsVisible);
  
  // Asegurar visibilidad después de las animaciones
  setTimeout(ensureButtonsVisible, 100);
  setTimeout(ensureButtonsVisible, 500);
  setTimeout(ensureButtonsVisible, 1000);
  setTimeout(ensureButtonsVisible, 2000);
  
  // Menú hamburguesa
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Cerrar menú al hacer clic en un enlace (móviles)
  const menuLinks = document.querySelectorAll('.menu-item a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });
  
  // Cerrar menú al hacer clic fuera del sidebar
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
  
  // Cerrar menú con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
  
  // Asegurar que los botones estén visibles después de las animaciones
  setTimeout(ensureButtonsVisible, 1000);
  setTimeout(ensureButtonsVisible, 2000);
  
  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
      if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
  }
  }
  
  // Scroll indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    
    scrollIndicator.style.transform = `scaleX(${scrolled})`;
  });
  
  // Custom cursor
  const customCursor = document.getElementById('customCursor');
  let cursorVisible = false;
  
  // Solo activar en desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      if (!cursorVisible) {
        customCursor.style.opacity = '1';
        cursorVisible = true;
      }
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    });
    
    // Efecto hover en enlaces y botones
    const hoverElements = document.querySelectorAll('a, button, .btn, .btn-small');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });
    
    // Ocultar cursor cuando sale de la ventana
    document.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
      cursorVisible = false;
    });
  } else {
    customCursor.style.display = 'none';
  }
  
  // Partículas de fondo
  const particlesBg = document.getElementById('particlesBg');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesBg.appendChild(particle);
  }
  
  // Efecto parallax
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // Efecto parallax en mouse move para la imagen destacada
  const featuredImage = document.querySelector('.featured-image');
  if (featuredImage) {
    featuredImage.addEventListener('mousemove', (e) => {
      const rect = featuredImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / centerX * 10;
      const moveY = (y - centerY) / centerY * 10;
      
      const img = featuredImage.querySelector('img');
      img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });
    
    featuredImage.addEventListener('mouseleave', () => {
      const img = featuredImage.querySelector('img');
      img.style.transform = 'scale(1.1) translate(0, 0)';
    });
  }
  
  // Animación de texto gradiente
  const gradientTexts = document.querySelectorAll('h1, h2');
  gradientTexts.forEach(text => {
    text.addEventListener('mouseenter', () => {
      text.style.backgroundSize = '200% 200%';
      text.style.animation = 'gradientShift 3s ease infinite';
    });
    
    text.addEventListener('mouseleave', () => {
      text.style.animation = 'none';
    });
  });
  
  // Inicializar la línea mágica para el menú
  window.magicLine = new MagicLine(document.querySelector('.menu'));
  
  // Instagram cards - Sistema simplificado
  // Las cards de Instagram ahora funcionan con imágenes locales y enlaces directos
  // No necesitamos código adicional ya que son elementos HTML estáticos
  
  // Añadir eventos de clic a los elementos del menú
  const menuItems = document.querySelectorAll('.menu-item a');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Si no estamos navegando a otra página, prevenir el comportamiento predeterminado
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      
      // Remover la clase 'active' del elemento actualmente activo
      const activeItem = document.querySelector('.menu-item.active');
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      
      // Añadir la clase 'active' al elemento clickeado
      this.parentNode.classList.add('active');
      
      // Actualizar la línea mágica
      window.magicLine.update();
    });
  });
  
  // Validación del formulario de contacto (si existe)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación básica
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (name && email && subject && message) {
        // Aquí normalmente enviarías los datos al servidor
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
        this.reset();
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });
  }
  
  // Inicializar filtros de galería (si existen)
  const filterButtons = document.querySelectorAll('.gallery-filter button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Quitar clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Modal para "Próximamente"
  const allButtons = document.querySelectorAll('.btn-small, .btn.coming-soon');
  const modal = document.getElementById('comingSoonModal');
  const closeBtn = document.querySelector('.close-modal');
  
  // Añadir evento a todos los botones
  allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Si es un enlace externo con target="_blank" diferente al del almacén, dejarlo funcionar normalmente
      if (this.hasAttribute('target') && this.getAttribute('target') === '_blank' && this.id !== 'almacen-btn') {
        return; // Permite que el enlace funcione normalmente
      }
      
      // Prevenir navegación para los demás
      e.preventDefault();
      
      // Personalizar el mensaje según el botón
      const modalTitle = document.querySelector('#comingSoonModal h3');
      const modalText = document.querySelector('#comingSoonModal p');
      const modalDate = document.querySelector('.modal-date');
      
      // Si es el botón del Control de Almacén
      if (this.id === 'almacen-btn') {
        modalTitle.textContent = 'Información importante';
        modalText.textContent = 'Para una mejor visualización de esta página, coloca tu celular en horizontal o ábrelo desde un PC.';
        modalDate.style.display = 'none'; // Ocultar la fecha estimada
        
        // Añadir botones mejorados al modal
        const btnContainer = document.createElement('div');
        btnContainer.className = 'modal-buttons';
        
        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Continuar al proyecto';
        continueBtn.className = 'modal-btn modal-btn-primary';
        continueBtn.onclick = function() {
          window.open("https://sinsapiar1.github.io/Almacen/", "_blank");
          modal.style.display = 'none';
        };
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.className = 'modal-btn modal-btn-secondary';
        cancelBtn.onclick = function() {
          modal.style.display = 'none';
        };
        
        btnContainer.appendChild(continueBtn);
        btnContainer.appendChild(cancelBtn);
        
        // Eliminar botones anteriores si existieran
        const oldBtnContainer = document.querySelector('.modal-buttons');
        if (oldBtnContainer) {
          oldBtnContainer.remove();
        }
        
        modalDate.parentNode.insertBefore(btnContainer, modalDate.nextSibling);
      } 
      // Si es el botón de leer la historia completa
      else if (this.classList.contains('coming-soon')) {
        modalTitle.textContent = 'Artículo en preparación';
        modalText.textContent = 'Estamos preparando un relato detallado de esta aventura. ¡Vuelve pronto para leer la historia completa!';
        modalDate.style.display = 'block';
        modalDate.textContent = 'Publicación estimada: Mayo 2025';
        
        // Eliminar botones anteriores si existieran
        const oldBtnContainer = document.querySelector('.modal-buttons');
        if (oldBtnContainer) {
          oldBtnContainer.remove();
        }
      }
      // Para los otros botones, mostrar el mensaje estándar
      else {
        modalTitle.textContent = 'Proyecto en desarrollo';
        modalText.textContent = 'Estamos trabajando arduamente para completar esta sección. ¡Vuelve pronto para ver los avances!';
        modalDate.style.display = 'block';
        modalDate.textContent = 'Lanzamiento estimado: Junio 2025';
        
        // Eliminar botones anteriores si existieran
        const oldBtnContainer = document.querySelector('.modal-buttons');
        if (oldBtnContainer) {
          oldBtnContainer.remove();
        }
      }
      
      // Mostrar el modal
      modal.style.display = 'block';
    });
  });
  
  // Cerrar modal al hacer clic en X
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Inicializar sistema de Instagram
  initInstagramSystem();
});

  // También inicializar cuando la página esté completamente cargada
  window.addEventListener('load', () => {
    // Reintento final después de que todo esté cargado
    setTimeout(() => {
      console.log('🔄 Reintento final después de load completo...');
      initInstagramSystem();
    }, 2000);
  });