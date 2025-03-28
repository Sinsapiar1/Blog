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
  
  // Inicializar MagicLine cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la línea mágica para el menú
    window.magicLine = new MagicLine(document.querySelector('.menu'));
    
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
  });
  // Modal para "Próximamente"
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones "Ver más"
    const verMasButtons = document.querySelectorAll('.btn-small');
    const modal = document.getElementById('comingSoonModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Añadir evento a los botones "Ver más"
    verMasButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Solo mostrar el modal si el enlace tiene href="#"
        if (this.getAttribute('href') === '#' || this.getAttribute('href') === 'galeria.html') {
          e.preventDefault(); // Prevenir navegación
          modal.style.display = 'block';
        }
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
  });