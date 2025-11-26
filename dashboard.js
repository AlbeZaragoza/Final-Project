// Dashboard JavaScript

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Newsletter form handler
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Mostrar notificación de éxito
    showSuccessNotification('¡Gracias por suscribirte!', `Te enviaremos contenido exclusivo a: ${email}`);
    
    // Limpiar formulario
    this.reset();
    
    // Guardar suscripción
    savePreference('subscribed', 'true');
    savePreference('user_email', email);
    
    // Redirigir a la página principal
    setTimeout(() => {
        window.location.href = 'main.html';
    }, 2500);
});

// Función para mostrar notificaciones de éxito
function showSuccessNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animación de números al hacer scroll
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number, .stat-big');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Solo animar si es un número
                if (!isNaN(parseFloat(finalValue))) {
                    animateValue(target, 0, parseFloat(finalValue), 1500);
                    observer.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = formatNumber(end);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Animación de entrada para las cards
function animateCards() {
    const cards = document.querySelectorAll('.feature-card, .quick-card, .trending-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Efecto de typing en el título (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Contador de visitantes simulado
function updateVisitorCount() {
    const badge = document.querySelector('.hero-badge span');
    if (badge) {
        const baseCount = 2500;
        const randomAdd = Math.floor(Math.random() * 50);
        const total = baseCount + randomAdd;
        badge.textContent = `Más de ${total.toLocaleString()} cinéfilos activos`;
    }
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Crear notificación personalizada
    const notification = document.createElement('div');
    notification.className = 'easter-egg-notification';
    notification.innerHTML = `
        <i class="fas fa-trophy"></i>
        <div>
            <h3>¡Código secreto activado!</h3>
            <p>Eres un verdadero cinéfilo</p>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Agregar animación rainbow
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .easter-egg-notification {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b35 0%, #e85a28 100%);
            color: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 10000;
            animation: slideIn 0.5s;
        }
        .easter-egg-notification i {
            font-size: 48px;
        }
        .easter-egg-notification h3 {
            margin: 0;
            font-size: 24px;
        }
        .easter-egg-notification p {
            margin: 4px 0 0 0;
            opacity: 0.9;
        }
        @keyframes slideIn {
            from { transform: translate(-50%, -50%) scale(0); }
            to { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        notification.remove();
    }, 5000);
}

// Tracking de clicks (simulado)
function trackClick(element, action) {
    console.log(`Click tracked: ${action} on ${element}`);
    // Aquí podrías integrar Google Analytics o similar
}

// Agregar tracking a botones principales
document.querySelectorAll('.btn-primary, .btn-hero, .btn-cta-large').forEach(btn => {
    btn.addEventListener('click', function() {
        trackClick(this.textContent, 'CTA Click');
    });
});

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('%cCineClub Dashboard', 'font-size: 16px; color: #ff6b35; font-weight: bold;');
    
    // Iniciar animaciones
    animateNumbers();
    animateCards();
    updateVisitorCount();
    initScrollReveal();
    initParallax();
    
    // Iniciar cursor personalizado (solo en desktop)
    if (window.innerWidth > 1024) {
        initCustomCursor();
    }
    
    // Actualizar contador cada 30 segundos
    setInterval(updateVisitorCount, 30000);
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido a CineClub!', 'font-size: 20px; color: #ff6b35; font-weight: bold;');
    console.log('%cSi eres desarrollador, únete a nuestro equipo!', 'font-size: 14px; color: #666;');
    
    // Agregar efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Mostrar mensaje de bienvenida si es primera visita
    if (visitCount === 1) {
        setTimeout(() => {
            showFirstVisitMessage();
        }, 2000);
    }
});

function showFirstVisitMessage() {
    const message = document.createElement('div');
    message.className = 'first-visit-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-hand-sparkles"></i>
            <h3>¡Bienvenido a CineClub!</h3>
            <p>Explora las mejores películas de todos los tiempos</p>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 500);
    }, 4000);
}

// Detectar si el usuario está inactivo
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Mostrar notificación después de 2 minutos de inactividad
        showInactivityNotification();
    }, 120000); // 2 minutos
}

function showInactivityNotification() {
    const notification = document.createElement('div');
    notification.className = 'inactivity-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-clock"></i>
            <div>
                <h3>¿Sigues ahí?</h3>
                <p>¿Te gustaría explorar el Top 100 ahora?</p>
            </div>
            <div class="notification-actions">
                <button onclick="this.closest('.inactivity-notification').remove()" class="btn-dismiss">
                    Más tarde
                </button>
                <button onclick="window.location.href='main.html'" class="btn-accept">
                    Sí, vamos
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Resetear timer con cualquier actividad
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

resetInactivityTimer();

// Guardar preferencias en localStorage
function savePreference(key, value) {
    localStorage.setItem(`cineclub_${key}`, value);
}

function getPreference(key) {
    return localStorage.getItem(`cineclub_${key}`);
}

// Registrar visita
if (!getPreference('first_visit')) {
    savePreference('first_visit', new Date().toISOString());
    console.log('¡Primera visita registrada! 🎉');
} else {
    console.log('¡Bienvenido de vuelta! 👋');
}

// Incrementar contador de visitas
const visitCount = parseInt(getPreference('visit_count') || '0') + 1;
savePreference('visit_count', visitCount.toString());
console.log(`Visita número: ${visitCount}`);

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .quick-card, .trending-item, .why-content, .cta-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// Parallax effect para elementos
function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Cursor personalizado (opcional, premium effect)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Agregar efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .quick-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// Modal de suscripción
const modal = document.getElementById('subscribeModal');
const subscribeBtns = document.querySelectorAll('.subscribe-btn, .btn-subscribe, .cta-primary, .cta-secondary');
const closeModal = document.querySelector('.modal-close');

function openSubscribeModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSubscribeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Abrir modal al hacer click en botones de suscripción
subscribeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.onclick) { // Solo si no tiene otro onclick definido
            e.preventDefault();
            openSubscribeModal();
        }
    });
});

// Cerrar modal
if (closeModal) {
    closeModal.addEventListener('click', closeSubscribeModal);
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeSubscribeModal();
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSubscribeModal();
    }
});

// Manejar formulario del modal
const modalForm = document.getElementById('modalSubscribeForm');
if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Guardar en localStorage
        savePreference('user_name', name);
        savePreference('user_email', email);
        savePreference('subscribed', 'true');
        
        // Cerrar modal
        closeSubscribeModal();
        
        // Mostrar notificación de bienvenida
        showWelcomeNotification(name, email);
        
        // Redirigir a la página principal
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 3000);
    });
}

// Función para mostrar notificación de bienvenida
function showWelcomeNotification(name, email) {
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="welcome-icon">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="welcome-text">
                <h3>¡Bienvenido a CineClub, ${name}!</h3>
                <p>Te enviaremos contenido exclusivo a: ${email}</p>
                <div class="welcome-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Botón de ayuda
const helpButton = document.getElementById('helpButton');
const helpTooltip = document.getElementById('helpTooltip');

if (helpButton && helpTooltip) {
    helpButton.addEventListener('click', function(e) {
        e.stopPropagation();
        helpTooltip.classList.toggle('active');
    });
    
    // Cerrar tooltip al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!helpTooltip.contains(e.target) && e.target !== helpButton) {
            helpTooltip.classList.remove('active');
        }
    });
}

// Mostrar modal automáticamente después de 30 segundos (solo primera visita)
if (visitCount === 1 && !getPreference('subscribed')) {
    setTimeout(() => {
        openSubscribeModal();
    }, 30000);
}

// Mostrar modal al intentar salir de la página (exit intent)
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 0 && !exitIntentShown && !getPreference('subscribed')) {
        exitIntentShown = true;
        openSubscribeModal();
    }
});

// Base de datos de películas (Top 20 para demo)
const moviesDatabase = [
    { rank: 1, title: "Ciudadano Kane", year: 1941, director: "Orson Welles", decade: "1940" },
    { rank: 2, title: "Casablanca", year: 1942, director: "Michael Curtiz", decade: "1940" },
    { rank: 3, title: "El Padrino", year: 1972, director: "Francis Ford Coppola", decade: "1970" },
    { rank: 4, title: "Vértigo", year: 1958, director: "Alfred Hitchcock", decade: "1950" },
    { rank: 5, title: "8½", year: 1963, director: "Federico Fellini", decade: "1960" },
    { rank: 6, title: "Cantando Bajo la Lluvia", year: 1952, director: "Gene Kelly", decade: "1950" },
    { rank: 7, title: "Lawrence de Arabia", year: 1962, director: "David Lean", decade: "1960" },
    { rank: 8, title: "El Padrino II", year: 1974, director: "Francis Ford Coppola", decade: "1970" },
    { rank: 9, title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", decade: "1990" },
    { rank: 10, title: "Apocalipsis Now", year: 1979, director: "Francis Ford Coppola", decade: "1970" },
    { rank: 11, title: "Psicosis", year: 1960, director: "Alfred Hitchcock", decade: "1960" },
    { rank: 12, title: "La Dolce Vita", year: 1960, director: "Federico Fellini", decade: "1960" },
    { rank: 13, title: "Los Siete Samuráis", year: 1954, director: "Akira Kurosawa", decade: "1950" },
    { rank: 14, title: "2001: Odisea del Espacio", year: 1968, director: "Stanley Kubrick", decade: "1960" },
    { rank: 15, title: "Taxi Driver", year: 1976, director: "Martin Scorsese", decade: "1970" },
    { rank: 16, title: "La Ventana Indiscreta", year: 1954, director: "Alfred Hitchcock", decade: "1950" },
    { rank: 17, title: "Rashomon", year: 1950, director: "Akira Kurosawa", decade: "1950" },
    { rank: 18, title: "El Resplandor", year: 1980, director: "Stanley Kubrick", decade: "1980" },
    { rank: 19, title: "Toro Salvaje", year: 1980, director: "Martin Scorsese", decade: "1980" },
    { rank: 20, title: "Con la Muerte en los Talones", year: 1959, director: "Alfred Hitchcock", decade: "1950" }
];

// Modal de búsqueda
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const decadeFilter = document.getElementById('decadeFilter');
const directorFilter = document.getElementById('directorFilter');

function openSearchModal() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 300);
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    searchInput.value = '';
    decadeFilter.value = '';
    directorFilter.value = '';
    searchResults.innerHTML = '<p class="search-placeholder">Escribe para buscar películas...</p>';
}

// Función de búsqueda
function searchMovies() {
    const query = searchInput.value.toLowerCase();
    const decade = decadeFilter.value;
    const director = directorFilter.value;
    
    let results = moviesDatabase;
    
    // Filtrar por búsqueda de texto
    if (query) {
        results = results.filter(movie => 
            movie.title.toLowerCase().includes(query) ||
            movie.director.toLowerCase().includes(query) ||
            movie.year.toString().includes(query)
        );
    }
    
    // Filtrar por década
    if (decade) {
        results = results.filter(movie => movie.decade === decade);
    }
    
    // Filtrar por director
    if (director) {
        results = results.filter(movie => 
            movie.director.toLowerCase().includes(director)
        );
    }
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-placeholder">No se encontraron resultados 😕</p>';
        return;
    }
    
    const html = results.map(movie => `
        <div class="search-result-item" onclick="goToMovie(${movie.rank})">
            <div class="search-result-title">
                <span class="search-result-rank">#${movie.rank}</span>
                ${movie.title}
            </div>
            <div class="search-result-meta">
                ${movie.year} · ${movie.director}
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = html;
}

function goToMovie(rank) {
    window.location.href = `main.html#top10`;
    closeSearchModal();
}

// Event listeners para búsqueda
if (searchInput) {
    searchInput.addEventListener('input', searchMovies);
}

if (decadeFilter) {
    decadeFilter.addEventListener('change', searchMovies);
}

if (directorFilter) {
    directorFilter.addEventListener('change', searchMovies);
}

// Atajo de teclado para abrir búsqueda (Ctrl/Cmd + K)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});
