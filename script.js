/* ========================================
   🍎 MODERN PORTFOLIO - JAVASCRIPT
   Autor: Raul Pivet
   Versión: 2.3
   ======================================== */

// ========================================
// 🎯 LOADER
// ========================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 600);
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
  initStoryModal();
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

  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
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

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 &&
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  updateActiveMenuItem();
}

function updateActiveMenuItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu-item').forEach(item => {
    const href = item.querySelector('a').getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ========================================
// ✨ ANIMACIONES — AOS se inicia UNA sola vez aquí
// ========================================
function initAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
  }
  initParallaxImages();
  initCardHoverEffects();
}

// Función helper para que las páginas que renderizan contenido dinámico
// puedan refrescar AOS sin re-inicializarlo
function refreshAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

function initParallaxImages() {
  document.querySelectorAll('.featured-image').forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const moveX = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const moveY = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      const img = container.querySelector('img');
      if (img) img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    });
    container.addEventListener('mouseleave', () => {
      const img = container.querySelector('img');
      if (img) img.style.transform = 'scale(1.05) translate(0, 0)';
    });
  });
}

function initCardHoverEffects() {
  document.querySelectorAll('.project-card, .fallback-card').forEach(card => {
    card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-8px)'; });
    card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
  });
}

// ========================================
// 📖 MODAL REVISTA — Historia Chichén Itzá
// ========================================
function initStoryModal() {
  const modal    = document.getElementById('storyModal');
  const openBtn  = document.getElementById('openStoryBtn');
  const closeBtn = document.getElementById('closeStoryBtn');
  const overlay  = document.getElementById('storyOverlay');

  if (!modal || !openBtn) return;

  function openStory() {
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function closeStory() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.style.display = 'none';
      const body = modal.querySelector('.story-body');
      if (body) body.scrollTop = 0;
    }, 480);
  }

  openBtn.addEventListener('click', openStory);
  closeBtn?.addEventListener('click', closeStory);
  overlay?.addEventListener('click', closeStory);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeStory();
  });
}

// ========================================
// 📸 INSTAGRAM SYSTEM
// ========================================
function initInstagram() {
  const embedContainers = document.querySelectorAll('.embed-container');
  if (embedContainers.length === 0) return;

  embedContainers.forEach(container => {
    const postId = container.dataset.postId;
    if (!postId) return;
    const postUrl = `https://www.instagram.com/p/${postId}/`;
    fetch(`https://www.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.thumbnail_url) {
          const imgEl = container.querySelector('.fallback-card .insta-image img');
          if (imgEl) imgEl.src = data.thumbnail_url;
        }
      })
      .catch(() => loadThumbnailViaCDN(container, postId));
  });

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
    return !!(iframe || blockquote.offsetHeight > 100);
  }

  function checkAllEmbeds() {
    embedContainers.forEach(container => {
      if (!checkEmbedLoaded(container)) showFallbackCard(container);
    });
  }

  if (window.instgrm?.Embeds) {
    try { window.instgrm.Embeds.process(); } catch (e) {}
  }

  setTimeout(checkAllEmbeds, 3000);
  setTimeout(checkAllEmbeds, 8000);
}

function loadThumbnailViaCDN(container, postId) {
  const imgEl = container.querySelector('.fallback-card .insta-image img');
  if (!imgEl) return;
  const thumbnailUrl = `https://www.instagram.com/p/${postId}/media/?size=l`;
  const testImg = new Image();
  testImg.onload = () => { imgEl.src = thumbnailUrl; };
  testImg.src = thumbnailUrl;
}

// ========================================
// 🎭 MODAL GENÉRICO (proyectos)
// ========================================
function initModals() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.close-modal');
  const allButtons = document.querySelectorAll('.btn-small, .btn.coming-soon');

  allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.hasAttribute('target') && this.getAttribute('target') === '_blank' && this.id !== 'almacen-btn') return;
      e.preventDefault();
      openModal(this);
    });
  });

  closeBtn?.addEventListener('click', () => closeModal());
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });

  function openModal(button) {
    const modalTitle = modal.querySelector('h3');
    const modalText  = modal.querySelector('p');
    const modalDate  = modal.querySelector('.modal-date');
    const oldBtns    = modal.querySelector('.modal-buttons');
    if (oldBtns) oldBtns.remove();

    if (button.id === 'almacen-btn') {
      modalTitle.textContent = 'Información importante';
      modalText.textContent  = 'Para una mejor visualización, coloca tu dispositivo en horizontal o ábrelo desde un PC.';
      modalDate.style.display = 'none';

      const btnContainer  = document.createElement('div');
      btnContainer.className = 'modal-buttons';

      const continueBtn = document.createElement('button');
      continueBtn.textContent = 'Continuar al proyecto';
      continueBtn.className   = 'modal-btn modal-btn-primary';
      continueBtn.onclick     = () => { window.open('https://sinsapiar1.github.io/Almacen/', '_blank'); closeModal(); };

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.className   = 'modal-btn modal-btn-secondary';
      cancelBtn.onclick     = closeModal;

      btnContainer.appendChild(continueBtn);
      btnContainer.appendChild(cancelBtn);
      modalDate.parentNode.insertBefore(btnContainer, modalDate.nextSibling);

    } else if (button.classList.contains('coming-soon')) {
      modalTitle.textContent  = 'Documentación en preparación';
      modalText.textContent   = 'Estoy preparando la documentación técnica detallada de este proyecto.';
      modalDate.style.display = 'block';
      modalDate.textContent   = 'Disponible próximamente — 2026';
    } else {
      modalTitle.textContent  = 'Proyecto en desarrollo';
      modalText.textContent   = 'Estoy trabajando en esta sección. ¡Vuelve pronto para ver los avances!';
      modalDate.style.display = 'block';
      modalDate.textContent   = 'Disponible próximamente — 2026';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
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
    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name && email && emailOk && subject && message) {
      alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
      this.reset();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  });
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
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ========================================
// 🎨 UTILIDADES
// ========================================
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

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
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('✅ Portfolio cargado — v2.3');
