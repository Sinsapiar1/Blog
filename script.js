// Script simple y funcional
document.addEventListener('DOMContentLoaded', function() {
  console.log('Iniciando script...');

  // Ocultar loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1000);
  }

  // Menú hamburguesa
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      menuToggle.classList.toggle('active');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
    // estado inicial accesible
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Cerrar menú al hacer clic en enlaces
  const menuLinks = document.querySelectorAll('.menu-item a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992 && sidebar && menuToggle) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });

  // Botón de tema
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    if (themeIcon) {
      themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (themeIcon) {
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    });
  }

  // Mostrar/ocultar botones según pantalla
  function updateButtons() {
    if (window.innerWidth <= 992) {
      if (menuToggle) {
        menuToggle.style.display = 'flex';
        menuToggle.style.zIndex = '1003';
      }
      if (themeToggle) {
        themeToggle.style.display = 'block';
        themeToggle.style.zIndex = '1003';
      }
    } else {
      if (menuToggle) menuToggle.style.display = 'none';
      if (themeToggle) {
        themeToggle.style.display = 'block';
        themeToggle.style.zIndex = '1001';
      }
    }
  }
  
  updateButtons();
  window.addEventListener('resize', updateButtons);
  
  // Asegurar que los botones estén visibles después de las animaciones
  setTimeout(updateButtons, 100);
  setTimeout(updateButtons, 500);

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Scroll indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollIndicator.style.width = scrolled + '%';
    });
  }

  // Back to top
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

  // Download CV
  const downloadCVBtn = document.getElementById('downloadCV');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Función de descarga en desarrollo.');
    });
  }

  // Project filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        projectCards.forEach(card => {
          if (filter === 'todos' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Gallery filters
  const galleryFilterButtons = document.querySelectorAll('.gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryFilterButtons.length > 0 && galleryItems.length > 0) {
    galleryFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
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

  // Modal "Próximamente"
  const comingSoonButtons = document.querySelectorAll('.coming-soon');
  const comingSoonModal = document.getElementById('comingSoonModal');
  if (comingSoonButtons.length > 0 && comingSoonModal) {
    const closeBtn = comingSoonModal.querySelector('.close-modal');
    const closeModal = () => {
      comingSoonModal.style.display = 'none';
      document.body.style.overflow = '';
    };
    comingSoonButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        comingSoonModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
      if (e.target === comingSoonModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Generar partículas de fondo (si hay contenedor y no reduce motion)
  const particlesContainer = document.getElementById('particlesBg');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (particlesContainer && !prefersReduced) {
    const particlesCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particlesCount; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = Math.random() * 3 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.opacity = String(0.3 + Math.random() * 0.5);
      p.style.animationDuration = `${12 + Math.random() * 12}s`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      p.style.filter = `blur(${Math.random() * 1.5}px)`;
      particlesContainer.appendChild(p);
    }
  }

  // Cursor personalizado con seguimiento
  const customCursor = document.getElementById('customCursor');
  if (customCursor && !prefersReduced) {
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      customCursor.style.display = 'none';
    } else {
      const animate = () => {
        cursorX += (targetX - cursorX) * 0.2;
        cursorY += (targetY - cursorY) * 0.2;
        customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animate);
      };
      animate();

      window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      });

      document.querySelectorAll('a, button, .btn, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
      });
    }
  }

  // Efecto parallax suave en imagen destacada
  const parallaxEl = document.querySelector('.parallax-element');
  if (parallaxEl && !prefersReduced) {
    window.addEventListener('scroll', () => {
      const rect = parallaxEl.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.02;
      parallaxEl.style.transform = `translateY(${offset}px) scale(1.05)`;
    }, { passive: true });
  }

  // Tilt 3D en tarjetas de proyecto
  const tiltCards = document.querySelectorAll('.project-card');
  if (tiltCards.length && !prefersReduced) {
    tiltCards.forEach(card => {
      let rect;
      const reset = () => {
        card.style.transform = '';
      };
      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      });
      card.addEventListener('mousemove', (e) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -6;
        const ry = ((x / rect.width) - 0.5) * 6;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', reset);
    });
  }

  console.log('Script cargado correctamente');
});