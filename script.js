/* ====================================
   FUNCIONES PARA MANEJO DE MODALES
   ==================================== */

/**
 * Abre un modal específico por su ID
 * @param {string} modalId - ID del modal a abrir
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
}

/**
 * Cierra un modal específico por su ID
 * @param {string} modalId - ID del modal a cerrar
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
}

/**
 * Cierra todos los modales abiertos
 */
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

/* ====================================
   EVENT LISTENERS
   ==================================== */

// Event listener para cerrar modal al hacer click fuera de él
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Event listener para cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Event listener que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de José Enrique Gudiño cargada correctamente');
    
    // Inicializar cualquier funcionalidad adicional aquí
    initializeAnimations();
    initializeTechTags();
});

/* ====================================
   FUNCIONES DE INICIALIZACIÓN
   ==================================== */

/**
 * Inicializa las animaciones de la página
 */
function initializeAnimations() {
    // Observador para animaciones cuando los elementos entran en vista
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que se pueden animar
    const animatableElements = document.querySelectorAll('.advantage, .tech-tag');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Inicializa la funcionalidad interactiva de las etiquetas tecnológicas
 */
function initializeTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Efecto de click en las etiquetas
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Log para debugging (opcional)
            console.log(`Tecnología seleccionada: ${this.textContent}`);
        });
    });
}

/* ====================================
   FUNCIONES UTILITARIAS
   ==================================== */

/**
 * Función para copiar texto al portapapeles
 * @param {string} text - Texto a copiar
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
    });
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 */
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d2691e;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(210, 105, 30, 0.3);
        z-index: 9999;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Función para smooth scroll hacia un elemento
 * @param {string} elementId - ID del elemento hacia el que hacer scroll
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ====================================
   FUNCIONES PARA FUTURAS EXPANSIONES
   ====================================
   Aquí puedes agregar:
   - Funciones para cargar datos dinámicamente
   - Integraciones con APIs externas
   - Validación de formularios
   - Funciones de filtrado/búsqueda
   - Efectos de scroll personalizados
   - Lazy loading de imágenes
   - Funciones de análisis/tracking
   - Integración con redes sociales
   - Gestión de temas (dark/light mode)
   - Funciones de localización/idiomas
   ==================================== */

/**
 * Ejemplo de función para cargar contenido dinámicamente
 * @param {string} endpoint - URL del endpoint
 * @param {Function} callback - Función callback para manejar la respuesta
 */
function loadDynamicContent(endpoint, callback) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (callback && typeof callback === 'function') {
                callback(data);
            }
        })
        .catch(error => {
            console.error('Error cargando contenido dinámico:', error);
        });
}

/**
 * Ejemplo de función para toggle de tema oscuro
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Ejemplo de función para inicializar el tema guardado
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
    }
}