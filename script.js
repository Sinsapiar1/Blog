/* ========================================
   🍎 MODERN PORTFOLIO - JAVASCRIPT
   Autor: Raul Pivet
   Versión: 2.0 - Apple Style
   ======================================== */

// ========================================
// 🎯 LOADER
// ========================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }
});

// ========================================
// 📜 DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollIndicator();
  initMenu();
  initAnimations();
  initInstagram();
  initModals();
  initForms();
  initSmoothScroll();
});

// ========================================
// 🎨 THEME SYSTEM
// ========================================
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle?.querySelector('i');
  
  if (!themeToggle) return;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  // Toggle tema
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
    
    // Animación suave
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  });

  function updateThemeIcon(theme, icon) {
    if (!icon) return;
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

// ========================================
// 📊 SCROLL INDICATOR
// ========================================
function initScrollIndicator() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (!scrollIndicator) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) : 0;
    
    scrollIndicator.style.transform = `scaleX(${scrolled})`;
  }, { passive: true });
}

// ========================================
// 🍔 MENU SYSTEM
// ========================================
function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const menuLinks = document.querySelectorAll('.menu-item a');
  
  if (!menuToggle || !sidebar) return;

  // Toggle menú
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace (móvil)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Cerrar menú al hacer clic fuera (móvil)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && 
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Actualizar item activo
  updateActiveMenuItem();
}

function updateActiveMenuItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    const href = link.getAttribute('href');
    
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ========================================
// ✨ ANIMACIONES
// ========================================
function initAnimations() {
  // AOS Configuration
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      disable: false
    });
    
    // Refresh AOS después de cargar imágenes
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }

  // Parallax en imágenes destacadas
  initParallaxImages();
  
  // Smooth hover en cards
  initCardHoverEffects();
}

function initParallaxImages() {
  const featuredImages = document.querySelectorAll('.featured-image');
  
  featuredImages.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / centerX * 8;
      const moveY = (y - centerY) / centerY * 8;
      
      const img = container.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    container.addEventListener('mouseleave', () => {
      const img = container.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.05) translate(0, 0)';
      }
    });
  });
}

function initCardHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .fallback-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ========================================
// 📸 INSTAGRAM SYSTEM
// ========================================
function initInstagram() {
  console.log('🔍 Inicializando sistema de Instagram...');
  
  const embedContainers = document.querySelectorAll('.embed-container');
  if (embedContainers.length === 0) return;
  
  let embedsLoaded = 0;
  const totalEmbeds = embedContainers.length;
  
  function showFallbackCard(container) {
    const blockquote = container.querySelector('.instagram-media');
    const fallbackCard = container.querySelector('.fallback-card');
    
    if (blockquote && fallbackCard) {
      console.log('📱 Mostrando card de fallback:', container.dataset.postId);
      blockquote.style.display = 'none';
      fallbackCard.style.display = 'block';
    }
  }
  
  function checkEmbedLoaded(container) {
    const blockquote = container.querySelector('.instagram-media');
    if (!blockquote) return false;
    
    const iframe = blockquote.querySelector('iframe');
    const processedContent = blockquote.querySelector('.instagram-media-rendered');
    
    if (iframe || processedContent || blockquote.offsetHeight > 100) {
      console.log('✅ Embed cargado:', container.dataset.postId);
      return true;
    }
    
    return false;
  }
  
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
  }
  
  // Procesar embeds
  if (window.instgrm && window.instgrm.Embeds) {
    console.log('📸 Procesando embeds de Instagram...');
    try {
      window.instgrm.Embeds.process();
    } catch (error) {
      console.log('❌ Error procesando embeds:', error);
    }
  }
  
  // Verificaciones programadas
  setTimeout(() => checkAllEmbeds(), 3000);
  setTimeout(() => checkAllEmbeds(), 8000);
}

// ========================================
// 🎭 MODALS
// ========================================
function initModals() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.close-modal');
  const allButtons = document.querySelectorAll('.btn-small, .btn.coming-soon');
  
  // Abrir modal
  allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Enlaces externos - dejar funcionar normalmente
      if (this.hasAttribute('target') && 
          this.getAttribute('target') === '_blank' && 
          this.id !== 'almacen-btn') {
        return;
      }
      
      e.preventDefault();
      openModal(this);
    });
  });
  
  // Cerrar modal
  closeBtn?.addEventListener('click', () => closeModal());
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // ESC para cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  function openModal(button) {
    const modalTitle = modal.querySelector('h3');
    const modalText = modal.querySelector('p');
    const modalDate = modal.querySelector('.modal-date');
    
    // Limpiar botones anteriores
    const oldBtnContainer = modal.querySelector('.modal-buttons');
    if (oldBtnContainer) oldBtnContainer.remove();
    
    // Configurar contenido según botón
    if (button.id === 'almacen-btn') {
      configureAlmacenModal(modalTitle, modalText, modalDate, modal);
    } else if (button.classList.contains('coming-soon')) {
      configureComingSoonModal(modalTitle, modalText, modalDate);
    } else {
      configureDefaultModal(modalTitle, modalText, modalDate);
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function configureAlmacenModal(title, text, date, modal) {
    title.textContent = 'Información importante';
    text.textContent = 'Para una mejor visualización, coloca tu dispositivo en horizontal o ábrelo desde un PC.';
    date.style.display = 'none';
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'modal-buttons';
    
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continuar al proyecto';
    continueBtn.className = 'modal-btn modal-btn-primary';
    continueBtn.onclick = () => {
      window.open("https://sinsapiar1.github.io/Almacen/", "_blank");
      closeModal();
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.className = 'modal-btn modal-btn-secondary';
    cancelBtn.onclick = closeModal;
    
    btnContainer.appendChild(continueBtn);
    btnContainer.appendChild(cancelBtn);
    date.parentNode.insertBefore(btnContainer, date.nextSibling);
  }

  function configureComingSoonModal(title, text, date) {
    title.textContent = 'Artículo en preparación';
    text.textContent = 'Estamos preparando un relato detallado de esta aventura. ¡Vuelve pronto!';
    date.style.display = 'block';
    date.textContent = 'Publicación estimada: Mayo 2025';
  }

  function configureDefaultModal(title, text, date) {
    title.textContent = 'Proyecto en desarrollo';
    text.textContent = 'Estamos trabajando en esta sección. ¡Vuelve pronto para ver los avances!';
    date.style.display = 'block';
    date.textContent = 'Lanzamiento estimado: Junio 2025';
  }
}

// ========================================
// 📝 FORMS
// ========================================
function initForms() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    
    if (validateForm(name, email, subject, message)) {
      // Aquí enviarías los datos al servidor
      showSuccessMessage();
      this.reset();
    } else {
      showErrorMessage('Por favor, completa todos los campos correctamente.');
    }
  });

  function validateForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return name && 
           email && 
           emailRegex.test(email) && 
           subject && 
           message;
  }

  function showSuccessMessage() {
    alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
  }

  function showErrorMessage(message) {
    alert(message);
  }
}

// ========================================
// 🔄 SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// 🎨 UTILIDADES
// ========================================

// Debounce para optimizar eventos
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

// Detectar modo oscuro del sistema
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Listener para cambios en el tema del sistema
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.body.setAttribute('data-theme', newTheme);
    }
  });
}

// ========================================
// 🚀 PERFORMANCE
// ========================================

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Preload para fuentes críticas
const criticalFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'SF Pro Display',
  'SF Pro Text'
];

// Log de inicialización
console.log('✅ Portfolio moderno cargado correctamente');
console.log('🎨 Tema actual:', document.body.getAttribute('data-theme'));
console.log('📱 Viewport:', `${window.innerWidth}x${window.innerHeight}`);