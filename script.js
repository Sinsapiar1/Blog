// Script principal - Versión simplificada y funcional
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inicializando aplicación...');

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  if (loader) {
    // Ocultar loader después de 1 segundo
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1000);
  }

  // ===== SCROLL INDICATOR =====
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollIndicator.style.width = scrolled + '%';
    });
  }

  // ===== CUSTOM CURSOR =====
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    });

    // Efecto hover
    const hoverElements = document.querySelectorAll('a, button, .btn, .menu-toggle, .theme-toggle');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
      });
    });
  }

  // ===== PARTICLES BACKGROUND =====
  const particlesBg = document.getElementById('particlesBg');
  if (particlesBg) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particlesBg.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 5000);
    }

    // Crear partículas iniciales
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 200);
    }

    // Crear partículas continuamente
    setInterval(createParticle, 3000);
  }

  // ===== MENU TOGGLE =====
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  // Función para mostrar/ocultar botones según el tamaño de pantalla
  function updateButtonVisibility() {
    if (window.innerWidth <= 992) {
      if (menuToggle) menuToggle.style.display = 'flex';
      if (themeToggle) themeToggle.style.display = 'block';
    } else {
      if (menuToggle) menuToggle.style.display = 'none';
      if (themeToggle) themeToggle.style.display = 'block';
    }
  }

  // Ejecutar al cargar y al cambiar tamaño de ventana
  updateButtonVisibility();
  window.addEventListener('resize', updateButtonVisibility);

  // Menú hamburguesa
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
      if (window.innerWidth <= 992 && sidebar && menuToggle) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Cerrar menú al hacer clic fuera del sidebar
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // ===== THEME TOGGLE =====
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

  // ===== MAGIC LINE =====
  const menu = document.querySelector('.menu');
  if (menu) {
    class MagicLine {
      constructor(menu) {
        this.menu = menu;
        this.menu.classList.add('has-magic-line');
        
        this.line = document.createElement('li');
        this.line.classList.add('magic-line');
        this.menu.appendChild(this.line);
        
        this.update();
        window.addEventListener('resize', this.update.bind(this));
      }
      
      update() {
        const activeItem = this.menu.querySelector('.active');
        if (!activeItem) return;
        
        this.line.style.transform = `translateY(${activeItem.offsetTop || 0}px)`;
        this.line.style.height = `${activeItem.offsetHeight || 0}px`;
        this.line.style.backgroundColor = window.getComputedStyle(activeItem).getPropertyValue('background-color');
      }
    }
    
    new MagicLine(menu);
  }

  // ===== AOS INITIALIZATION =====
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== DOWNLOAD CV BUTTON =====
  const downloadCVBtn = document.getElementById('downloadCV');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Función de descarga en desarrollo. Por ahora puedes copiar el enlace de esta página para compartir tu CV.');
    });
  }

  // ===== PROJECT FILTERS =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Actualizar botones activos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filtrar proyectos
        projectCards.forEach(card => {
          if (filter === 'todos' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== GALLERY FILTERS =====
  const galleryFilterButtons = document.querySelectorAll('.gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryFilterButtons.length > 0 && galleryItems.length > 0) {
    galleryFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Quitar clase active de todos los botones
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        galleryItems.forEach((item, index) => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            // Reiniciar animación AOS
            setTimeout(() => {
              item.classList.add('aos-animate');
            }, index * 50);
          } else {
            item.classList.remove('aos-animate');
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===== INSTAGRAM SYSTEM =====
  function initInstagramSystem() {
    const embedContainers = document.querySelectorAll('.embed-container');
    
    function showFallbackCard(container) {
      const blockquote = container.querySelector('.instagram-media');
      const fallbackCard = container.querySelector('.fallback-card');
      
      if (blockquote && fallbackCard) {
        blockquote.style.display = 'none';
        fallbackCard.style.display = 'block';
      }
    }
    
    function checkEmbedLoaded(container) {
      const blockquote = container.querySelector('.instagram-media');
      if (!blockquote) return false;
      
      const iframe = blockquote.querySelector('iframe');
      const processedContent = blockquote.querySelector('.instagram-media-rendered');
      
      return iframe || processedContent || blockquote.offsetHeight > 100;
    }
    
    function checkAllEmbeds() {
      embedContainers.forEach(container => {
        if (!checkEmbedLoaded(container)) {
          showFallbackCard(container);
        }
      });
    }
    
    // Verificar embeds después de un tiempo
    setTimeout(checkAllEmbeds, 3000);
    setTimeout(checkAllEmbeds, 5000);
  }
  
  initInstagramSystem();

  console.log('✅ Aplicación inicializada correctamente');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
  console.error('Error en la aplicación:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Promesa rechazada:', e.reason);
});