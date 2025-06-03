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
   FUNCIONES PARA GENERAR PDF
   ==================================== */

/**
 * Descarga el CV en formato PDF
 */
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    generatePDFContent(doc);
    
    // Descargar el archivo
    doc.save('Jose_Enrique_Gudino_CV.pdf');
    showNotification('CV descargado exitosamente');
}

/**
 * Abre el diálogo de impresión del PDF
 */
function printPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    generatePDFContent(doc);
    
    // Abrir en una nueva ventana para imprimir
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl);
    
    printWindow.onload = function() {
        printWindow.print();
    };
    
    showNotification('Abriendo ventana de impresión...');
}

/**
 * Genera el contenido del PDF con el formato del CV
 * @param {jsPDF} doc - Instancia de jsPDF
 */
function generatePDFContent(doc) {
    const margin = 20;
    let yPosition = margin;
    
    // Configurar fuentes y colores
    doc.setFontSize(24);
    doc.setTextColor(139, 69, 19); // Color café
    doc.setFont(undefined, 'bold');
    
    // Encabezado
    doc.text('JOSE ENRIQUE GUDIÑO', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(16);
    doc.setFont(undefined, 'normal');
    doc.text('Desarrollador de Software Full-Stack', margin, yPosition);
    yPosition += 15;
    
    // Información de contacto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('📞 (+52) 686 460 2677', margin, yPosition);
    yPosition += 6;
    doc.text('📧 catrin0110001@gmail.com', margin, yPosition);
    yPosition += 6;
    doc.text('📍 Mexicali, B.C.', margin, yPosition);
    yPosition += 15;
    
    // Disponibilidad
    doc.setFontSize(14);
    doc.setTextColor(255, 127, 0);
    doc.setFont(undefined, 'bold');
    doc.text('🚀 DISPONIBLE PARA PROYECTOS INMEDIATOS', margin, yPosition);
    yPosition += 15;
    
    // Stack Tecnológico
    doc.setFontSize(16);
    doc.setTextColor(139, 69, 19);
    doc.text('STACK TECNOLÓGICO', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    const techStack = 'Java • JavaScript • C# • Python • PHP • SQL • Unity • HTML/CSS';
    doc.text(techStack, margin, yPosition);
    yPosition += 15;
    
    // Experiencia Profesional
    doc.setFontSize(16);
    doc.setTextColor(139, 69, 19);
    doc.setFont(undefined, 'bold');
    doc.text('EXPERIENCIA PROFESIONAL', margin, yPosition);
    yPosition += 10;
    
    // Experiencia 1
    doc.setFontSize(12);
    doc.setTextColor(210, 105, 30);
    doc.setFont(undefined, 'bold');
    doc.text('Administrador de Base de Datos y Sitio Web', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(139, 69, 19);
    doc.setFont(undefined, 'normal');
    doc.text('Facultad de Ciencias Administrativas, UABC – Mexicali, B.C.', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'italic');
    doc.text('Febrero 2025 – Actualidad', margin, yPosition);
    yPosition += 8;
    
    doc.setFont(undefined, 'normal');
    const duties1 = [
        '• Gestión integral de la base de datos académica y administrativa',
        '• Desarrollo de sistema web para registro y control de información',
        '• Coordinación con personal administrativo para digitalizar procesos internos'
    ];
    
    duties1.forEach(duty => {
        doc.text(duty, margin + 5, yPosition);
        yPosition += 5;
    });
    yPosition += 8;
    
    // Verificar si necesitamos nueva página
    if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
    }
    
    // Experiencia 2
    doc.setTextColor(210, 105, 30);
    doc.setFont(undefined, 'bold');
    doc.text('Becario en Oficina de Posgrado', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(139, 69, 19);
    doc.setFont(undefined, 'normal');
    doc.text('UABC – Mexicali, B.C.', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'italic');
    doc.text('Enero 2024 – Mayo 2024', margin, yPosition);
    yPosition += 8;
    
    doc.setFont(undefined, 'normal');
    const duties2 = [
        '• Migración de registros desde hojas de cálculo a bases de datos SQL',
        '• Desarrollo de una interfaz gráfica para CRUD de datos',
        '• Optimización del acceso a la información mediante estructura relacional'
    ];
    
    duties2.forEach(duty => {
        doc.text(duty, margin + 5, yPosition);
        yPosition += 5;
    });
    yPosition += 8;
    
    // Experiencia 3
    doc.setTextColor(210, 105, 30);
    doc.setFont(undefined, 'bold');
    doc.text('Desarrollador Web y Diseñador de Base de Datos', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(139, 69, 19);
    doc.setFont(undefined, 'normal');
    doc.text('Casa Gudiño – Mexicali, B.C.', margin, yPosition);
    yPosition += 6;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'italic');
    doc.text('Junio 2020 – Diciembre 2020', margin, yPosition);
    yPosition += 8;
    
    doc.setFont(undefined, 'normal');
    const duties3 = [
        '• Diseño e implementación de una base de datos personalizada',
        '• Desarrollo de un sitio web empresarial desde cero',
        '• Comunicación directa con el cliente para análisis de requerimientos'
    ];
    
    duties3.forEach(duty => {
        doc.text(duty, margin + 5, yPosition);
        yPosition += 5;
    });
    yPosition += 15;
    
    // Verificar si necesitamos nueva página para las habilidades
    if (yPosition > 220) {
        doc.addPage();
        yPosition = margin;
    }
    
    // Habilidades Técnicas
    doc.setFontSize(16);
    doc.setTextColor(139, 69, 19);
    doc.setFont(undefined, 'bold');
    doc.text('HABILIDADES TÉCNICAS', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    const skills = [
        'Frontend: HTML5, CSS3, JavaScript, interfaces responsivas',
        'Backend: Java, PHP, Python, C#, arquitecturas escalables',
        'Bases de Datos: SQL, diseño relacional, optimización',
        'Redes: Configuración de servidores, conectividad, comandos de red',
        'Desarrollo de Juegos: Unity, Godot (6+ proyectos completados)',
        'Metodologías: Autodidacta, enfoque en soluciones escalables'
    ];
    
    skills.forEach(skill => {
        doc.text(`• ${skill}`, margin, yPosition);
        yPosition += 6;
    });
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('GitHub: github.com/Catrin101', margin, doc.internal.pageSize.height - 10);
}

/* ====================================
   FUNCIONES PARA MANEJO DE MODALES
   ==================================== */

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